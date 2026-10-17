/**
 * control-tool.ts — workflow_control, the Pi tool over the pure control decision core and the four adapter legs
 * (wb-cra; docs/workbench/11 § "Designer and operator": "workflow_control(ref,action,params?): explicit native
 * action after permission/preconditions; returns requested/acknowledged/result distinct").
 *
 * The shell owns exactly three impurities and nothing else: it re-reads the operator's grants, principal, workspace
 * and session from host context on EVERY call (the decision is made at dispatch time and never cached across the
 * permission boundary), it asks the decision core against the session's own projection, and it hands the one minted
 * permit to the one executor wired for the target's provider. Authority comes only from host-bound context: grants,
 * principal, workspace and session are never read from tool params. Params carry data — target addressing, the
 * action word and the operator's explicit destructive confirmation — and the confirmed flag is carried from the
 * operator, never minted here.
 *
 * Dialect (ruling F3, carried from wb-syh): exactly one dialect reaches the model. The envelope is
 * workbench.tool-reply/v1; the decision core's reply body is folded under `control` member by member, and the core's
 * workbench.control/v1 contract string never appears in the text the model reads. Phases stay distinct in that body
 * (requested / acknowledged / result blocks), and completion stays "not-asserted": a result receipt is the
 * producer's own report, read back through observation, never this tool's completion claim.
 *
 * The minted decision object crosses to the executor unaltered: adapters refuse every copy, replay or look-alike
 * through isCoreMintedDecision, so this shell never rebuilds, clones or re-freezes what the core returned.
 */
import { defineTool, type ExtensionContext } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import type { WorkflowTask } from "../workflow/task.js";
import { CapabilityError, type JsonValue } from "./capability-registry.js";
import { type ControlDecision, decideControl, type NativeControlReceipt, type NativeControlRequest } from "./control.js";
import { buildControlReply } from "./control-reply.js";
import type { ObservationProjection, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText } from "./redaction.js";
import { TOOL_REPLY_CONTRACT_VERSION } from "./tool-replies.js";

/** What an adapter leg answers with: the most advanced receipt it holds and its own one-word status. */
export interface ControlExecutionSummary {
  readonly receipt: NativeControlReceipt;
  readonly status: string;
}

/** One wired adapter leg. It receives the exact minted decision and the host-assembled request, never params. */
export type ControlExecutor = (
  decision: ControlDecision,
  request: NativeControlRequest,
  signal?: AbortSignal,
) => Promise<ControlExecutionSummary>;

export interface WorkflowControlDeps {
  grants(ctx: ExtensionContext): readonly string[];
  observerScope(ctx: ExtensionContext): ObservationScope;
  localPrincipal(ctx: ExtensionContext): string;
  sessionIdOf(ctx: ExtensionContext): string;
  /** The session's own projection: the one the decision core reads for existence and confirmed ownership. */
  projection: ObservationProjection;
  /** The session's workflow tasks, so a receipt lands in the control audit of the task that owns the target. */
  tasks: ReadonlyMap<string, WorkflowTask>;
  now(): string;
  /** Adapter legs keyed by target provider; looked up as an own property only. */
  executors: Readonly<Record<string, ControlExecutor>>;
}

/** Typed host-boundary refusals, beside the decision core's own deny policies. */
export type ControlHostErrorCode = "no-executor" | "executor-failed";

/** Byte budget handed to the control reply builder; the envelope wrapper stays well under the tool-reply default. */
const CONTROL_REPLY_BYTES = 4096;
/** Receipts a task's control audit holds before the oldest is dropped (FIFO). */
const MAX_AUDIT_RECEIPTS = 64;
const STATUS_CHARS = 64;
const REASON_CHARS = 512;

function textResult(text: string) {
  return { content: [{ type: "text" as const, text }], details: undefined };
}

interface ControlEnvelope {
  readonly ok: boolean;
  readonly invoked: boolean;
  readonly status: string;
  readonly control: { readonly [key: string]: JsonValue };
  readonly truncated?: boolean;
  readonly error?: { readonly code: string; readonly category: string; readonly message: string };
}

/**
 * The reply builder's body, folded member by member (ruling F3): its own contract string, kind marker and truncated flag
 * are dialect, not content — the envelope names the one contract and carries truncation once.
 */
function folded(control: { readonly [key: string]: JsonValue }): { readonly [key: string]: JsonValue } {
  const { contractVersion: _contract, kind: _kind, truncated: _truncated, ...members } = control;
  return members;
}

/** The one dialect: tool-reply/v1 around the folded control body, sanitized as a whole. */
function reply(body: ControlEnvelope) {
  return textResult(sanitizeWorkbenchJsonText({
    contract: TOOL_REPLY_CONTRACT_VERSION,
    tool: "workflow_control",
    ok: body.ok,
    invoked: body.invoked,
    status: body.status,
    completion: "not-asserted",
    control: folded(body.control),
    ...(body.truncated !== undefined ? { truncated: body.truncated } : {}),
    ...(body.error !== undefined ? { error: body.error } : {}),
  }));
}

/**
 * Records one receipt phase where the operator reads it back: as an observation event of the TARGET in the session
 * projection (evidence refs name the receipt and the producer's own ack/result refs; the event carries no presentation,
 * so the target keeps the producer's last reading and, having been acted on, reads stale until a producer re-read
 * confirms it), and in the control audit of the task that owns the target, when one does. The receipt object itself is
 * the core's or the adapter's, never one this shell composed.
 */
function record(deps: WorkflowControlDeps, receipt: NativeControlReceipt, scope: ObservationScope): void {
  const target = { provider: receipt.target.provider, type: receipt.target.type, id: receipt.target.id, ...(receipt.target.scope !== undefined ? { scope: receipt.target.scope } : {}) };
  const node = deps.projection.query({ scope, ref: target, limit: 1 }).nodes[0];
  const evidenceRefs = [`control-receipt:${receipt.requestId}`];
  let observedAt = receipt.decidedAt;
  if (receipt.phase !== "requested") { evidenceRefs.push(`native-ack:${receipt.nativeAckRef}`); observedAt = receipt.acknowledgedAt; }
  if (receipt.phase === "result") { evidenceRefs.push(`native-result:${receipt.nativeResultRef}`); observedAt = receipt.settledAt; }
  deps.projection.ingest({
    projectionEventId: `control:${receipt.requestId}:${receipt.phase}`,
    source: target, scope, observedAt, kind: `control.${receipt.phase}`, evidenceRefs,
    ...(node?.invocationId !== undefined ? { trace: { invocationId: node.invocationId } } : {}),
  });
  const task = node?.invocationId !== undefined ? deps.tasks.get(node.invocationId) : undefined;
  if (task === undefined) return;
  const audit = task.controlAudit ?? { receipts: [] };
  audit.receipts.push(receipt);
  if (audit.receipts.length > MAX_AUDIT_RECEIPTS) audit.receipts.splice(0, audit.receipts.length - MAX_AUDIT_RECEIPTS);
  task.controlAudit = audit;
}

export function createWorkflowControlTool(deps: WorkflowControlDeps) {
  return defineTool({
    name: "workflow_control",
    label: "Control native workflow",
    description:
      "Explicit native control action (stop/interrupt/cancel/shutdown and provider-specific verbs) on an observed, owned target. Requires the exact control:<provider>.<action> grant; a destructive action also requires confirmed: true (explicit operator confirmation). Returns requested/acknowledged/result distinct and never asserts completion — the producer's own answer, read through workflow_observe, is the only completion evidence.",
    parameters: Type.Object({
      target: Type.Object({
        provider: Type.String({ minLength: 1, maxLength: 64 }),
        type: Type.String({ minLength: 1, maxLength: 64 }),
        id: Type.String({ minLength: 1, maxLength: 256 }),
        scope: Type.Optional(Type.String({ minLength: 1, maxLength: 1024 })),
      }),
      action: Type.String({ minLength: 1, maxLength: 32 }),
      confirmed: Type.Optional(Type.Boolean()),
    }),
    execute: async (id, params, signal, _onUpdate, ctx) => {
      // Impurity 1: host-bound authority, re-read on every call. Params never contribute authority.
      const scope = deps.observerScope(ctx);
      const request: NativeControlRequest = {
        scope,
        principal: { id: deps.localPrincipal(ctx), role: "local-operator" },
        grants: deps.grants(ctx),
        target: {
          provider: params.target.provider,
          type: params.target.type,
          id: params.target.id,
          ...(params.target.scope !== undefined ? { scope: params.target.scope } : {}),
        },
        action: params.action,
        // The operator's own confirmation, carried verbatim when explicitly true and never minted here.
        ...(params.confirmed === true ? { params: { confirmed: true } } : {}),
        invocationId: id,
        requestedAt: deps.now(),
      };
      // Impurity 2: the decision, against the session's own projection, at dispatch time.
      const decision = decideControl(request, { projection: deps.projection, now: deps.now });
      if (decision.decision === "denied") {
        const denial = buildControlReply(decision, { maxBytes: CONTROL_REPLY_BYTES });
        return reply({
          ok: false, invoked: false, status: "refused", control: denial.reply, truncated: denial.truncated,
          error: { code: decision.policy, category: decision.category, message: decision.reason },
        });
      }
      // The requested phase is the core's own receipt, recorded before any adapter runs, so an audit never lacks it.
      record(deps, decision.receipt, scope);
      const provider = decision.receipt.target.provider;
      // Own-property lookup, so __proto__, constructor and other unlisted names resolve no executor.
      const executor = Object.hasOwn(deps.executors, provider) ? deps.executors[provider] : undefined;
      if (executor === undefined) {
        const requested = buildControlReply(decision, { maxBytes: CONTROL_REPLY_BYTES });
        return reply({
          ok: false, invoked: false, status: "refused", control: requested.reply, truncated: requested.truncated,
          error: { code: "no-executor", category: "unavailable", message: "No control executor is wired for this provider on this host." },
        });
      }
      // Impurity 3: the ONE permitted native action, through the host's own adapter leg.
      let summary: ControlExecutionSummary;
      try {
        summary = await executor(decision, request, signal);
      } catch (error) {
        const requested = buildControlReply(decision, { maxBytes: CONTROL_REPLY_BYTES });
        // An adapter's typed refusal keeps its own category and code; anything else is a transport failure here.
        const typed = error instanceof CapabilityError ? error : undefined;
        const ownCode = typed !== undefined ? Object.getOwnPropertyDescriptor(typed, "code")?.value : undefined;
        return reply({
          ok: false, invoked: true,
          status: typed !== undefined && typed.category !== "transport" ? "refused" : "failed",
          control: requested.reply, truncated: requested.truncated,
          error: {
            code: typeof ownCode === "string" ? ownCode : typed !== undefined ? "executor-refused" : "executor-failed",
            category: typed?.category ?? "transport",
            message: sanitizeWorkbenchText(error instanceof Error ? error.message : String(error)).slice(0, REASON_CHARS),
          },
        });
      }
      // The producer's own answer, as the adapter settled it: recorded only when it moved past the requested phase.
      if (summary.receipt.phase !== "requested") record(deps, summary.receipt, scope);
      const folded = buildControlReply(summary.receipt, { maxBytes: CONTROL_REPLY_BYTES });
      return reply({
        ok: true, invoked: true,
        status: sanitizeWorkbenchText(summary.status).slice(0, STATUS_CHARS),
        control: folded.reply, truncated: folded.truncated,
      });
    },
  });
}
