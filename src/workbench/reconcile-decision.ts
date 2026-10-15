/**
 * reconcile-decision.ts — pure decision core of workflow_reconcile.
 *
 * Mirrors control.ts: synchronous, side-effect free, first match wins, deny
 * reasons are fixed text that never echo caller input, and authorization rules
 * that need no journal read run first so an observer learns nothing about a
 * task's positions. It decides; the tool shell is the only thing that reads a
 * journal file, performs the evidence read through the registry, or appends a
 * minted row.
 */

import { createHash } from "node:crypto";
import type { WorkflowJournalEntry } from "../workflow/journal.js";
import type { WorkflowRunStatus } from "../workflow/progress.js";
import {
  type AcknowledgeRecord,
  type DuplicateRisk,
  type EffectDetermination,
  type EvidenceBinding,
  type EvidenceReceipt,
  entryDigestOf,
  indexReconciliations,
  isReconcileRecord,
  type NoEvidenceReason,
  type OverrideRecord,
  producerOf,
  RECONCILE_ACK_POLICY,
  RECONCILE_CONTRACT_VERSION,
  RECONCILE_EVIDENCE_READS,
  RECONCILE_OVERRIDE_POLICY,
  reconcileGrant,
} from "../workflow/reconcile.js";
import {
  CAPABILITY_MAX_DEPTH,
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityErrorCategory,
  type JsonValue,
  validatedCapabilityJson,
} from "./capability-registry.js";
import { identityDigest } from "./identity.js";
import { nativeEvidence, nativeRefOf } from "./native-evidence.js";
import type { NativeRef } from "./observation.js";
import { stripUnsafeText } from "./redaction.js";

export type ReconcileDenyPolicy =
  | "unknown-permission-data"
  | "observer-only"
  | "malformed-request"
  | "cross-scope"
  | "task-active"
  | "nothing-to-reconcile"
  | "unknown-producer"
  | "missing-exact-grant"
  | "unbound-decision"
  | "conflicting-decisions"
  | "no-evidence-receipt"
  | "evidence-task-mismatch"
  | "evidence-producer-mismatch"
  | "evidence-identity-mismatch"
  | "effect-confirmed-without-evidence"
  | "no-evidence-reason"
  | "resolved-value-invalid"
  | "operator-confirmation"
  | "duplicate-risk-unaccepted"
  | "journal-unwritable";

export interface ReconcileRequest {
  action: "inspect" | "evidence" | "acknowledge" | "override";
  taskId: string;
  position?: number;
  grants: readonly string[] | undefined;
  /** Host-bound operator scope; never taken from tool params. */
  scope: { workspace: string; principal: string };
  sessionId: string;
  principal: { id: string; role?: string };
  /** Raw tool params, read only through own-property checks. */
  params: unknown;
}

export interface ReconcileDeps {
  task:
    | {
        status: WorkflowRunStatus;
        observationScope?: { sessionId: string; workspace: string; principal: string };
        journalPath?: string;
      }
    | undefined;
  entries: readonly WorkflowJournalEntry[];
  receipts: readonly EvidenceReceipt[];
  currentEffectClass: (capabilityId: string) => CapabilityDescriptor["effectClass"] | undefined;
  now: () => string;
}

export interface ReconcileRosterPosition {
  position: number;
  capabilityId: string;
  effectClass: string;
  producer: string;
  key: string;
  entryDigest: string;
  recordedNativeRefs: readonly NativeRef[];
  state: "pending" | "acknowledged" | "override-live" | "override-spent" | "superseded" | "effect-absent-refused";
  decisions: { acknowledged: number; overridesLive: number; overridesSpent: number };
  evidenceReads: readonly string[];
  next: string;
}

export interface ReconcileRoster {
  taskId: string;
  status: WorkflowRunStatus;
  positions: readonly ReconcileRosterPosition[];
}

export type ReconcileDecision =
  | { readonly decision: "denied"; readonly category: CapabilityErrorCategory; readonly reason: string; readonly policy: ReconcileDenyPolicy }
  | { readonly decision: "inspect"; readonly roster: ReconcileRoster }
  | {
      readonly decision: "evidence";
      readonly read: { producer: string; capabilityId: string; input: JsonValue; position: number; recordedNativeRefs: readonly NativeRef[] };
    }
  | { readonly decision: "acknowledge"; readonly entry: WorkflowJournalEntry; readonly alreadyRecorded: boolean }
  | { readonly decision: "override"; readonly entry: WorkflowJournalEntry; readonly alreadyRecorded: boolean; readonly warning: string };

/** What an evidence reply teaches, fixed text (docs/workbench/08: evidence semantics). */
export const EVIDENCE_GUIDANCE: readonly string[] = Object.freeze([
  "A failed or unavailable read is not evidence of absence.",
  "Forge gate.status evidence is state-level: it binds only through a matching source basis.",
  "Furnace state words are quoted verbatim; a returned record proves the Run exists, not that it succeeded.",
]);

const SCOPE_TEXT = "Workflow unavailable in this local operator/session/workspace scope.";
const GRANT = /^[a-z][a-z0-9.-]*:[a-z][a-z0-9.-]*$/;
const TASK_ID = /^wf_[a-z0-9-]{6,}$/;
const RECEIPT_ID = /^rcp_[0-9a-f]{32}$/;
const ACK_ID = /^ack_[0-9a-f]{32}$/;
const DETERMINATIONS: ReadonlySet<string> = new Set(["effect-confirmed", "effect-absent", "indeterminate"]);
const NO_EVIDENCE_REASONS: ReadonlySet<string> = new Set(["no-read-capability", "producer-unavailable"]);
const MAX_RECEIPT_CITATIONS = 8;
const MAX_RESOLVED_VALUE_BYTES = 32 * 1024;
const MAX_POSITION = 999;

function deny(policy: ReconcileDenyPolicy, category: CapabilityErrorCategory, reason: string): ReconcileDecision {
  return Object.freeze({ decision: "denied", category, reason, policy });
}

function plainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function instant(value: unknown): value is string {
  return typeof value === "string" && value.length <= 64 && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
}

function cleanText(value: unknown, maxBytes = 256): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value) <= maxBytes && stripUnsafeText(value) === value;
}

function cleanReason(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "" && Buffer.byteLength(value, "utf8") <= 512 && stripUnsafeText(value) === value;
}

/** The workbench.capabilityGrants grammar; any unknown entry means deny (docs/workbench/12). */
function grantList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const grants: unknown[] = Array.from(value);
  return grants.every((grant): grant is string => typeof grant === "string" && GRANT.test(grant)) ? grants : undefined;
}

/** Own data property only: an inherited value never confirms and a getter is never invoked. */
function ownValue(params: Record<string, unknown>, name: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(params, name);
  return descriptor !== undefined && "value" in descriptor ? descriptor.value : undefined;
}

/** The node rows a resume would refuse at: a journaled non-read effect, or a read under a changed contract. */
function refusingRowAt(
  entries: readonly WorkflowJournalEntry[],
  position: number,
  currentEffectClass: ReconcileDeps["currentEffectClass"],
): WorkflowJournalEntry | undefined {
  const row = entries.find((entry) => entry.kind === "node" && entry.index === position);
  if (row === undefined || row.capabilityId === undefined) return undefined;
  if (row.effectClass !== undefined && row.effectClass !== "read") return row;
  if (row.effectClass === "read") {
    const current = currentEffectClass(row.capabilityId);
    if (current !== undefined && current !== "read") return row;
  }
  return undefined;
}

function refMatches(ref: NativeRef, recorded: readonly NativeRef[]): boolean {
  return recorded.some((candidate) => candidate.provider === ref.provider && candidate.id === ref.id);
}

/**
 * Mint one evidence receipt from a performed (or refused) producer read. The
 * binding is computed against the journaled row's own references: a receipt
 * that names a matching native identity is journal-recorded, one that names
 * none asserts nothing (operator-asserted, as does any read against a row
 * that recorded no references), and a mismatched identity is unbound.
 */
export function mintEvidenceReceipt(input: {
  taskId: string;
  position: number;
  producer: string;
  capabilityId: string;
  input: JsonValue;
  requestedAt: string;
  observedAt: string;
  result?: JsonValue;
  failure?: CapabilityErrorCategory;
  recordedNativeRefs: readonly NativeRef[];
}): EvidenceReceipt {
  const inputDigest = identityDigest("reconcile-evidence-input", input.input);
  const resultDigest = input.result !== undefined ? identityDigest("reconcile-evidence-result", input.result) : undefined;
  const evidence = input.result !== undefined ? nativeEvidence(input.capabilityId, input.result) : {};
  const nativeRef = nativeRefOf(evidence);
  const binding: EvidenceBinding =
    nativeRef === undefined || input.recordedNativeRefs.length === 0
      ? "operator-asserted"
      : refMatches(nativeRef, input.recordedNativeRefs)
        ? "journal-recorded"
        : "unbound";
  const identity = [RECONCILE_CONTRACT_VERSION, input.taskId, input.position, input.capabilityId, inputDigest, resultDigest ?? null, input.observedAt];
  const receiptId = `rcp_${createHash("sha256").update(JSON.stringify(identity)).digest("hex").slice(0, 32)}`;
  return Object.freeze({
    receiptId,
    taskId: input.taskId,
    position: input.position,
    producer: input.producer,
    capabilityId: input.capabilityId,
    inputDigest,
    ...(resultDigest !== undefined ? { resultDigest } : {}),
    requestedAt: input.requestedAt,
    observedAt: input.observedAt,
    outcome: input.failure ?? "returned",
    ...(nativeRef !== undefined ? { nativeRef } : {}),
    ...(evidence.domainStatus !== undefined ? { domainStatus: stripUnsafeText(evidence.domainStatus).slice(0, 256) } : {}),
    evidenceRefs: Object.freeze([...(evidence.evidenceRefs ?? [])]),
    ...(evidence.sourceBasis !== undefined ? { sourceBasis: evidence.sourceBasis } : {}),
    binding,
  });
}

interface BoundDecisions {
  readonly acks: readonly WorkflowJournalEntry[];
  readonly latestAck: AcknowledgeRecord | undefined;
  readonly overridesLive: number;
  readonly overridesSpent: number;
  readonly spentCitesLatest: boolean;
}

function boundDecisionsAt(entries: readonly WorkflowJournalEntry[], row: WorkflowJournalEntry): BoundDecisions {
  const bucket = indexReconciliations(entries).get(row.index);
  const digest = entryDigestOf(row);
  const acks = (bucket?.acks ?? []).filter((candidate) => candidate.reconcile.entry.entryDigest === digest);
  const overrides = (bucket?.overrides ?? []).filter((candidate) => candidate.reconcile.entry.entryDigest === digest);
  const spent = bucket?.spent ?? new Set<string>();
  const latestAck = acks.length > 0 ? acks[acks.length - 1]?.reconcile : undefined;
  const liveIds = new Set<string>();
  for (const candidate of overrides) {
    if (candidate.reconcile.consumed === undefined && !spent.has(candidate.reconcile.overrideId)) liveIds.add(candidate.reconcile.overrideId);
  }
  const spentCitesLatest =
    latestAck !== undefined &&
    overrides.some(
      (candidate) =>
        candidate.reconcile.acknowledgementId === latestAck.acknowledgementId &&
        (candidate.reconcile.consumed !== undefined || spent.has(candidate.reconcile.overrideId)),
    );
  return { acks, latestAck, overridesLive: liveIds.size, overridesSpent: spent.size, spentCitesLatest };
}

function rosterStateOf(decisions: BoundDecisions): ReconcileRosterPosition["state"] {
  if (decisions.overridesLive > 0) return "override-live";
  if (decisions.spentCitesLatest) return "override-spent";
  if (decisions.latestAck !== undefined && decisions.latestAck.settlement === "none") return "effect-absent-refused";
  if (decisions.latestAck !== undefined) return "acknowledged";
  if (decisions.overridesSpent > 0 || decisions.acks.length > 0) return "superseded";
  return "pending";
}

/**
 * Synchronous and side-effect free: it reads the given entries and receipts,
 * and reads the host clock only to stamp a minted record. Rules apply in
 * order; the first match wins; reasons never echo caller text. Observer-only
 * is decided before any task or journal lookup, so unknown and foreign tasks
 * answer identically.
 */
export function decideReconcile(request: ReconcileRequest, deps: ReconcileDeps): ReconcileDecision {
  const grants = grantList(request.grants);
  if (grants === undefined) return deny("unknown-permission-data", "authorization", "unknown permission data");
  const observing = request.action === "inspect" || request.action === "evidence";
  if (observing) {
    if (!grants.includes("workbench:observe")) {
      return deny("observer-only", "authorization", "Permission denied: workbench:observe grant required.");
    }
  } else if (!grants.some((grant) => grant.startsWith("reconcile:"))) {
    return deny("observer-only", "authorization", `Permission denied: a reconcile:<producer>.${request.action} grant is required.`);
  }

  if (typeof request.taskId !== "string" || !TASK_ID.test(request.taskId)) {
    return deny("malformed-request", "validation", "malformed reconcile request");
  }
  if (!cleanText(request.sessionId) || !cleanText(request.scope.workspace, 4096) || !cleanText(request.scope.principal)) {
    return deny("malformed-request", "validation", "malformed reconcile request");
  }
  const params = plainObject(request.params) ? request.params : {};
  const position = request.position;
  if (request.action !== "inspect") {
    if (!Number.isInteger(position) || position === undefined || position < 0 || position > MAX_POSITION) {
      return deny("malformed-request", "validation", "malformed reconcile request");
    }
  }
  if (request.action === "acknowledge" || request.action === "override") {
    if (!cleanReason(ownValue(params, "reason"))) return deny("malformed-request", "validation", "malformed reconcile request");
  }

  const task = deps.task;
  if (
    task === undefined ||
    task.observationScope === undefined ||
    task.observationScope.sessionId !== request.sessionId ||
    task.observationScope.workspace !== request.scope.workspace ||
    task.observationScope.principal !== request.scope.principal ||
    request.principal.id !== request.scope.principal
  ) {
    return deny("cross-scope", "authorization", SCOPE_TEXT);
  }

  if (request.action === "inspect") {
    const positions: ReconcileRosterPosition[] = [];
    for (const entry of deps.entries) {
      if (entry.kind !== "node" || entry.index === undefined) continue;
      const row = refusingRowAt(deps.entries, entry.index, deps.currentEffectClass);
      if (row === undefined || row !== entry || row.capabilityId === undefined) continue;
      const producer = producerOf(row.capabilityId);
      const decisions = boundDecisionsAt(deps.entries, row);
      positions.push(Object.freeze({
        position: row.index,
        capabilityId: row.capabilityId,
        effectClass: row.effectClass ?? "",
        producer,
        key: row.key,
        entryDigest: entryDigestOf(row),
        recordedNativeRefs: Object.freeze([...(row.nativeRefs ?? [])]),
        state: rosterStateOf(decisions),
        decisions: Object.freeze({ acknowledged: decisions.acks.length, overridesLive: decisions.overridesLive, overridesSpent: decisions.overridesSpent }),
        evidenceReads: RECONCILE_EVIDENCE_READS[producer] ?? Object.freeze([]),
        next: `workflow_reconcile {"taskId":"${request.taskId}","action":"evidence","position":${row.index}}`,
      }));
    }
    return Object.freeze({ decision: "inspect", roster: Object.freeze({ taskId: request.taskId, status: task.status, positions: Object.freeze(positions) }) });
  }

  if (!observing && (task.status === "running" || task.status === "paused")) {
    return deny("task-active", "validation", "the workflow is still active; reconcile applies to a settled run's journal");
  }

  const row = position === undefined ? undefined : refusingRowAt(deps.entries, position, deps.currentEffectClass);
  if (row === undefined || row.capabilityId === undefined || position === undefined) {
    return deny("nothing-to-reconcile", "validation", `Nothing to reconcile at position ${position ?? 0}.`);
  }
  const producer = producerOf(row.capabilityId);

  if (request.action === "evidence") {
    const evidenceParams = ownValue(params, "evidence");
    if (!plainObject(evidenceParams)) return deny("malformed-request", "validation", "malformed reconcile request");
    const capabilityId = evidenceParams.capabilityId;
    const reads = Object.hasOwn(RECONCILE_EVIDENCE_READS, producer) ? RECONCILE_EVIDENCE_READS[producer] : undefined;
    if (typeof capabilityId !== "string" || reads === undefined || !reads.includes(capabilityId) || deps.currentEffectClass(capabilityId) !== "read") {
      return deny("malformed-request", "validation", "malformed reconcile request");
    }
    let input: JsonValue;
    try {
      input = validatedCapabilityJson(evidenceParams.input ?? null, "reconcile evidence input");
    } catch {
      return deny("malformed-request", "validation", "malformed reconcile request");
    }
    return Object.freeze({
      decision: "evidence",
      read: Object.freeze({ producer, capabilityId, input, position, recordedNativeRefs: Object.freeze([...(row.nativeRefs ?? [])]) }),
    });
  }

  if (!Object.hasOwn(RECONCILE_EVIDENCE_READS, producer)) {
    return deny("unknown-producer", "validation", "the journaled producer declares no reconcile evidence read, so no operator authority exists for it");
  }
  const grant = reconcileGrant(producer, request.action);
  if (!grants.includes(grant)) {
    return deny("missing-exact-grant", "authorization", `Permission denied: ${grant} grant required.`);
  }

  const decidedAt = deps.now();
  if (!instant(decidedAt)) throw new CapabilityError("validation", "Reconcile decisions require a timezone-qualified host clock.");
  const reason = ownValue(params, "reason") as string;
  const decisions = boundDecisionsAt(deps.entries, row);
  const entryBinding = Object.freeze({
    index: row.index,
    key: row.key,
    ok: row.ok,
    capabilityId: row.capabilityId,
    effectClass: row.effectClass ?? "",
    ...(row.basis !== undefined ? { basis: row.basis } : {}),
    entryDigest: entryDigestOf(row),
  });

  if (request.action === "acknowledge") {
    const determination = ownValue(params, "determination");
    if (typeof determination !== "string" || !DETERMINATIONS.has(determination)) {
      return deny("malformed-request", "validation", "malformed reconcile request");
    }
    const receiptIds = ownValue(params, "receiptIds") ?? [];
    if (!Array.isArray(receiptIds) || receiptIds.length > MAX_RECEIPT_CITATIONS ||
      !receiptIds.every((id): id is string => typeof id === "string" && RECEIPT_ID.test(id))) {
      return deny("malformed-request", "validation", "malformed reconcile request");
    }
    const cited: EvidenceReceipt[] = [];
    for (const receiptId of receiptIds) {
      const receipt = deps.receipts.find((candidate) => candidate.receiptId === receiptId);
      if (receipt === undefined) return deny("no-evidence-receipt", "validation", "a cited evidence receipt does not exist in this session");
      if (receipt.taskId !== request.taskId || receipt.position !== position) {
        return deny("evidence-task-mismatch", "validation", "a cited evidence receipt belongs to another task or position");
      }
      if (receipt.producer !== producer) {
        return deny("evidence-producer-mismatch", "validation", "a cited evidence receipt was read from another producer");
      }
      if ((row.nativeRefs?.length ?? 0) > 0 && receipt.binding === "unbound") {
        return deny("evidence-identity-mismatch", "validation", "a cited evidence receipt names a native identity the journal did not record");
      }
      cited.push(receipt);
    }
    if (determination === "effect-confirmed" && !cited.some((receipt) => receipt.outcome === "returned")) {
      return deny("effect-confirmed-without-evidence", "validation", "effect-confirmed requires at least one returned producer read");
    }
    const noEvidenceReason = ownValue(params, "noEvidenceReason");
    if (cited.length === 0 && (typeof noEvidenceReason !== "string" || !NO_EVIDENCE_REASONS.has(noEvidenceReason))) {
      return deny("no-evidence-reason", "validation", "an acknowledgement without evidence must say why no producer read exists");
    }
    const resolvedValue = ownValue(params, "resolvedValue");
    if (resolvedValue !== undefined) {
      try {
        validatedCapabilityJson(resolvedValue, "reconcile resolvedValue", CAPABILITY_MAX_DEPTH, MAX_RESOLVED_VALUE_BYTES);
      } catch {
        return deny("resolved-value-invalid", "validation", "the resolved value exceeds the reconcile size or shape bounds");
      }
    }
    const producerConfirmed = cited.some((receipt) => receipt.outcome === "returned" && receipt.binding === "journal-recorded");
    const resolvedValueDigest = resolvedValue !== undefined ? identityDigest("reconcile-resolved-value", resolvedValue) : null;
    const acknowledgementId = `ack_${createHash("sha256")
      .update(JSON.stringify([RECONCILE_CONTRACT_VERSION, request.taskId, entryBinding.entryDigest, determination, request.principal.id, [...receiptIds].sort(), resolvedValueDigest]))
      .digest("hex")
      .slice(0, 32)}`;
    const record: AcknowledgeRecord = Object.freeze({
      contractVersion: RECONCILE_CONTRACT_VERSION,
      decision: "acknowledge",
      acknowledgementId,
      policy: RECONCILE_ACK_POLICY,
      taskId: request.taskId,
      entry: entryBinding,
      scope: Object.freeze({ workspace: request.scope.workspace, principal: request.scope.principal }),
      operator: Object.freeze({ principal: request.principal.id, ...(request.principal.role !== undefined ? { role: request.principal.role } : {}) }),
      grant,
      recordedAt: decidedAt,
      reason,
      determination: determination as EffectDetermination,
      evidenceClass: producerConfirmed ? "producer-confirmed" : "operator-asserted",
      evidence: Object.freeze([...cited]),
      ...(cited.length === 0 ? { noEvidenceReason: noEvidenceReason as NoEvidenceReason } : {}),
      settlement: determination === "effect-absent" ? "none" : "envelope",
      ...(resolvedValue !== undefined ? { resolvedValue: resolvedValue as JsonValue } : {}),
    });
    if (!isReconcileRecord(record)) throw new CapabilityError("validation", "Minted acknowledgement failed its own record contract.");
    const entry: WorkflowJournalEntry = {
      index: row.index, key: row.key, ok: true, kind: "acknowledge",
      capabilityId: row.capabilityId, ...(row.effectClass !== undefined ? { effectClass: row.effectClass } : {}),
      ...(row.basis !== undefined ? { basis: row.basis } : {}), reconcile: record,
    };
    const alreadyRecorded = deps.entries.some(
      (candidate) => candidate.kind === "acknowledge" && candidate.reconcile?.decision === "acknowledge" && candidate.reconcile.acknowledgementId === acknowledgementId,
    );
    return Object.freeze({ decision: "acknowledge", entry, alreadyRecorded });
  }

  // Override: cite the latest bound acknowledgement, confirm, accept the risk.
  const citedAckId = ownValue(params, "acknowledgementId");
  if (typeof citedAckId !== "string" || !ACK_ID.test(citedAckId)) {
    return deny("malformed-request", "validation", "malformed reconcile request");
  }
  if (decisions.latestAck === undefined) {
    return deny("unbound-decision", "validation", "no acknowledgement binds to this position; acknowledge before overriding");
  }
  if (decisions.latestAck.acknowledgementId !== citedAckId) {
    return deny("conflicting-decisions", "validation", "the cited acknowledgement is not the latest bound acknowledgement at this position");
  }
  const confirmed = ownValue(params, "confirmed");
  const confirmPosition = ownValue(params, "confirmPosition");
  const confirmCapabilityId = ownValue(params, "confirmCapabilityId");
  if (confirmed !== true || confirmPosition !== position || confirmCapabilityId !== row.capabilityId) {
    return deny("operator-confirmation", "validation", "Operator confirmation required: confirmed:true, confirmPosition and confirmCapabilityId must restate the position being re-run.");
  }
  const duplicateRisk: DuplicateRisk =
    decisions.latestAck.determination === "effect-confirmed"
      ? "known-duplicate"
      : decisions.latestAck.determination === "effect-absent" && decisions.latestAck.evidenceClass === "producer-confirmed"
        ? "none"
        : "possible-duplicate";
  const acceptDuplicateRisk = ownValue(params, "acceptDuplicateRisk") === true;
  if (duplicateRisk !== "none" && !acceptDuplicateRisk) {
    return deny("duplicate-risk-unaccepted", "validation", "Duplicate risk must be accepted explicitly: this re-run may create a second native effect.");
  }
  const overrideId = `ovr_${createHash("sha256")
    .update(JSON.stringify([RECONCILE_CONTRACT_VERSION, request.taskId, entryBinding.entryDigest, citedAckId, request.principal.id]))
    .digest("hex")
    .slice(0, 32)}`;
  const record: OverrideRecord = Object.freeze({
    contractVersion: RECONCILE_CONTRACT_VERSION,
    decision: "override",
    overrideId,
    policy: RECONCILE_OVERRIDE_POLICY,
    taskId: request.taskId,
    entry: entryBinding,
    scope: Object.freeze({ workspace: request.scope.workspace, principal: request.scope.principal }),
    operator: Object.freeze({ principal: request.principal.id, ...(request.principal.role !== undefined ? { role: request.principal.role } : {}) }),
    grant,
    recordedAt: decidedAt,
    reason,
    acknowledgementId: citedAckId,
    duplicateRisk,
    confirmation: Object.freeze({ confirmed: true, position, capabilityId: row.capabilityId, acceptDuplicateRisk }),
  });
  if (!isReconcileRecord(record)) throw new CapabilityError("validation", "Minted override failed its own record contract.");
  const entry: WorkflowJournalEntry = {
    index: row.index, key: row.key, ok: true, kind: "override",
    capabilityId: row.capabilityId, ...(row.effectClass !== undefined ? { effectClass: row.effectClass } : {}),
    ...(row.basis !== undefined ? { basis: row.basis } : {}), reconcile: record,
  };
  const alreadyRecorded = deps.entries.some(
    (candidate) => candidate.kind === "override" && candidate.reconcile?.decision === "override" && candidate.reconcile.overrideId === overrideId,
  );
  const warning = `The next resume re-executes node(${row.capabilityId}) at position ${position} live, once. The Workbench cannot prove the earlier effect did not happen (${duplicateRisk}). This authorization is spent by the next resume that reads this journal, whether or not it reaches the position.`;
  return Object.freeze({ decision: "override", entry, alreadyRecorded, warning });
}
