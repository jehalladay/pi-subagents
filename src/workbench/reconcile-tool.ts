/**
 * reconcile-tool.ts — workflow_reconcile, the operator surface over the pure
 * reconcile decision core (wb-g8f part B.3).
 *
 * The shell owns exactly three impurities and nothing else: it re-reads the
 * task's journal per call, it performs the ONE authorized producer read an
 * `evidence` action permits (through the capability registry, under the
 * operator's own grants), and it appends the minted decision row. Authority
 * comes only from host-bound context — grants, principal, workspace and
 * session are never read from tool params — and every reply crosses the
 * shared JSON sanitizer. Recording a decision is never reported as resuming.
 */

import { defineTool, type ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { appendJournal, readJournal, type WorkflowJournalEntry } from "../workflow/journal.js";
import { type EvidenceReceipt, RECONCILE_CONTRACT_VERSION, RECONCILE_EVIDENCE_READS } from "../workflow/reconcile.js";
import type { WorkflowTask } from "../workflow/task.js";
import { CapabilityError, type CapabilityErrorCategory, type CapabilityRegistry, type JsonValue } from "./capability-registry.js";
import type { ObservationScope } from "./observation.js";
import { decideReconcile, EVIDENCE_GUIDANCE, mintEvidenceReceipt, type ReconcileRequest } from "./reconcile-decision.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";

const MAX_RECEIPTS_HELD = 16;
const REPLY_TEXT_LIMIT = 4096;

export interface WorkflowReconcileDeps {
  tasks: ReadonlyMap<string, WorkflowTask>;
  registryFor(cwd: string): CapabilityRegistry;
  grants(ctx: ExtensionContext): readonly string[];
  observerScope(ctx: ExtensionContext): ObservationScope;
  localPrincipal(ctx: ExtensionContext): string;
  sessionIdOf(ctx: ExtensionContext): string;
  now(): string;
}

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }], details: undefined };
}

function receiptSummary(receipt: EvidenceReceipt): { [key: string]: JsonValue } {
  return {
    receiptId: receipt.receiptId,
    position: receipt.position,
    capabilityId: receipt.capabilityId,
    outcome: receipt.outcome,
    binding: receipt.binding,
    observedAt: receipt.observedAt,
    ...(receipt.domainStatus !== undefined ? { domainStatus: receipt.domainStatus } : {}),
    ...(receipt.nativeRef !== undefined ? { nativeRef: { provider: receipt.nativeRef.provider, type: receipt.nativeRef.type, id: receipt.nativeRef.id } } : {}),
  };
}

function recordIdOf(entry: WorkflowJournalEntry): string | undefined {
  const record = entry.reconcile;
  if (record === undefined) return undefined;
  return record.decision === "acknowledge" ? record.acknowledgementId : record.overrideId;
}

export function createWorkflowReconcileTool(deps: WorkflowReconcileDeps) {
  return defineTool({
    name: "workflow_reconcile",
    label: "Reconcile journaled effect",
    description:
      "Inspect a journaled non-read node, gather the producer's own evidence through an authorized read, and record an explicit operator acknowledgement or override so a resume can proceed. Never re-executes anything itself. inspect/evidence require workbench:observe (plus the read's own permission); acknowledge/override require the exact reconcile:<producer>.acknowledge / reconcile:<producer>.override grant and explicit confirmation.",
    parameters: Type.Object({
      taskId: Type.String({ pattern: "^wf_[a-z0-9-]{6,}$" }),
      action: Type.Union([Type.Literal("inspect"), Type.Literal("evidence"), Type.Literal("acknowledge"), Type.Literal("override")]),
      position: Type.Optional(Type.Integer({ minimum: 0, maximum: 999 })),
      evidence: Type.Optional(Type.Object({ capabilityId: Type.String(), input: Type.Optional(Type.Any()) })),
      determination: Type.Optional(Type.Union([Type.Literal("effect-confirmed"), Type.Literal("effect-absent"), Type.Literal("indeterminate")])),
      receiptIds: Type.Optional(Type.Array(Type.String({ pattern: "^rcp_[0-9a-f]{32}$" }), { maxItems: 8 })),
      noEvidenceReason: Type.Optional(Type.Union([Type.Literal("no-read-capability"), Type.Literal("producer-unavailable")])),
      resolvedValue: Type.Optional(Type.Any()),
      reason: Type.Optional(Type.String({ minLength: 1, maxLength: 512 })),
      acknowledgementId: Type.Optional(Type.String({ pattern: "^ack_[0-9a-f]{32}$" })),
      confirmed: Type.Optional(Type.Boolean()),
      confirmPosition: Type.Optional(Type.Integer({ minimum: 0, maximum: 999 })),
      confirmCapabilityId: Type.Optional(Type.String()),
      acceptDuplicateRisk: Type.Optional(Type.Boolean()),
    }),
    execute: async (_id, params, signal, _onUpdate, ctx) => {
      const task = deps.tasks.get(params.taskId);
      const scope = deps.observerScope(ctx);
      const entries = task?.journalPath !== undefined ? readJournal(task.journalPath) : [];
      const receipts: readonly EvidenceReceipt[] = task?.reconcile?.receipts ?? [];
      const registry = deps.registryFor(ctx.cwd);
      const request: ReconcileRequest = {
        action: params.action,
        taskId: params.taskId,
        position: params.position,
        grants: deps.grants(ctx),
        scope: { workspace: scope.workspace, principal: scope.principal },
        sessionId: deps.sessionIdOf(ctx),
        principal: { id: deps.localPrincipal(ctx), role: "local-operator" },
        params,
      };
      const decision = decideReconcile(request, {
        task: task === undefined ? undefined : { status: task.status, observationScope: task.observationScope, journalPath: task.journalPath },
        entries,
        receipts,
        currentEffectClass: (capabilityId) => registry.effectClassOf(capabilityId),
        now: deps.now,
      });

      if (decision.decision === "denied") return textResult(sanitizeWorkbenchText(decision.reason));

      if (decision.decision === "inspect") {
        const positions = decision.roster.positions.map((position) => ({
          ...position,
          recordedNativeRefs: position.recordedNativeRefs.map((ref) => ({ provider: ref.provider, type: ref.type, id: ref.id, ...(ref.scope !== undefined ? { scope: ref.scope } : {}) })),
          evidenceReads: [...position.evidenceReads],
          ...(position.recordedNativeRefs.length === 0
            ? { note: "no native reference was recorded; locate the native object through the producer and inspect it by id" }
            : {}),
        }));
        return textResult(sanitizeWorkbenchJsonText({
          contract: RECONCILE_CONTRACT_VERSION,
          phase: "inspected",
          taskId: decision.roster.taskId,
          status: decision.roster.status,
          positions,
          receipts: receipts.map(receiptSummary),
          evidenceReads: RECONCILE_EVIDENCE_READS,
        }, REPLY_TEXT_LIMIT));
      }

      if (decision.decision === "evidence") {
        const requestedAt = deps.now();
        let result: JsonValue | undefined;
        let failure: CapabilityErrorCategory | undefined;
        try {
          result = await registry.invoke(decision.read.capabilityId, decision.read.input, {
            grants: [...deps.grants(ctx)],
            signal: signal ?? new AbortController().signal,
            invocationId: params.taskId,
            callId: `reconcile:${decision.read.position}`,
            principal: { id: deps.localPrincipal(ctx), role: "local-operator" },
            workspace: scope.workspace,
          });
        } catch (error) {
          if (error instanceof CapabilityError) {
            // The read's own authorization denial surfaces as-is; nothing is minted.
            if (error.category === "authorization") return textResult(sanitizeWorkbenchText(error.message));
            failure = error.category;
          } else {
            failure = "transport";
          }
        }
        const receipt = mintEvidenceReceipt({
          taskId: params.taskId,
          position: decision.read.position,
          producer: decision.read.producer,
          capabilityId: decision.read.capabilityId,
          input: decision.read.input,
          requestedAt,
          observedAt: deps.now(),
          ...(result !== undefined ? { result } : {}),
          ...(failure !== undefined ? { failure } : {}),
          recordedNativeRefs: decision.read.recordedNativeRefs,
        });
        if (task !== undefined) {
          task.reconcile ??= { receipts: [] };
          task.reconcile.receipts.push(receipt);
          if (task.reconcile.receipts.length > MAX_RECEIPTS_HELD) {
            task.reconcile.receipts.splice(0, task.reconcile.receipts.length - MAX_RECEIPTS_HELD);
          }
        }
        return textResult(sanitizeWorkbenchJsonText({
          contract: RECONCILE_CONTRACT_VERSION,
          phase: "evidence",
          receipt,
          guidance: [...EVIDENCE_GUIDANCE],
          ...(result !== undefined ? { snapshot: result } : {}),
        }, REPLY_TEXT_LIMIT));
      }

      // acknowledge / override: the only write, and only when it is new.
      const recordId = recordIdOf(decision.entry) ?? "";
      if (!decision.alreadyRecorded) {
        if (task?.journalPath === undefined) {
          return textResult("The workflow journal is unavailable in this session; the decision was not recorded.");
        }
        appendJournal(task.journalPath, decision.entry);
        // appendJournal is deliberately silent on failure for the runtime; a
        // decision that did not land is an authority that does not exist, so
        // the shell verifies the row before reporting it recorded.
        const written = readJournal(task.journalPath).some((entry) => recordIdOf(entry) === recordId);
        if (!written) return textResult("The workflow journal is unwritable; the decision was not recorded.");
      }
      if (decision.decision === "acknowledge") {
        const record = decision.entry.reconcile;
        const settlement = record?.decision === "acknowledge" ? record.settlement : "envelope";
        return textResult(sanitizeWorkbenchJsonText({
          contract: RECONCILE_CONTRACT_VERSION,
          phase: "recorded",
          decision: "acknowledge",
          acknowledgementId: recordId,
          settlement,
          evidenceClass: record?.decision === "acknowledge" ? record.evidenceClass : "operator-asserted",
          applied: false,
          alreadyRecorded: decision.alreadyRecorded,
          entry: decision.entry,
          resume: { tool: "SubagentWorkflow", resumeFromRunId: params.taskId },
          effect: settlement === "envelope"
            ? `position ${decision.entry.index} settles with the acknowledgement envelope, marked stale; the replayable prefix ends there`
            : `position ${decision.entry.index} stays refused until an explicit override`,
        }, REPLY_TEXT_LIMIT));
      }
      const record = decision.entry.reconcile;
      return textResult(sanitizeWorkbenchJsonText({
        contract: RECONCILE_CONTRACT_VERSION,
        phase: "recorded",
        decision: "override",
        overrideId: recordId,
        duplicateRisk: record?.decision === "override" ? record.duplicateRisk : "possible-duplicate",
        alreadyRecorded: decision.alreadyRecorded,
        entry: decision.entry,
        warning: decision.warning,
      }, REPLY_TEXT_LIMIT));
    },
  });
}
