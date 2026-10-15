/**
 * reconcile.ts — the operator's recorded answer to a journaled effect.
 *
 * A resume that meets a journaled non-read node refuses to proceed: the
 * previous run already performed (or may have performed) an effect, and the
 * Workbench cannot prove what the world looks like now. This module is the
 * record of the only authority that can settle that question — a local
 * operator who inspected the producer's own native state and wrote down what
 * they found.
 *
 * Three invariants carry the design:
 *
 *   - **Decisions bind to bytes.** An acknowledgement or override names the
 *     exact journal row it settles, by digest over the fields that decide
 *     what the node did. Edit the script, change the call, or point the
 *     decision at another row and it silently stops binding — the resume
 *     refuses again instead of honouring a decision made about other work.
 *   - **The settlement is never producer-shaped.** An acknowledged position
 *     hands the script an acknowledgement envelope, not a forged capability
 *     result, so a script that destructures the producer's shape fails
 *     visibly rather than trusting data no producer returned. Operator data
 *     rides only under its own name (`resolvedValue`), nested in the
 *     envelope.
 *   - **An override is spent, not kept.** One recorded override authorizes at
 *     most one re-run. The resume that reads it writes the consumed copy back
 *     before executing anything, so a second resume — or a prompt-injected
 *     repeat of the same authorization — finds it already gone.
 *
 * Everything here is pure: journal rows in, records and admissions out. The
 * runtime applies admissions (runtime.ts), the decision core authorizes new
 * records (workbench/reconcile-decision.ts), and the tool shell is the only
 * writer (workbench/reconcile-tool.ts).
 */

import { createHash } from "node:crypto";
import {
  CAPABILITY_MAX_DEPTH,
  CapabilityError,
  type CapabilityErrorCategory,
  type JsonValue,
  validatedCapabilityJson,
} from "../workbench/capability-registry.js";
import type { NativeRef } from "../workbench/observation.js";
import { stripUnsafeText } from "../workbench/redaction.js";
import type { WorkflowJournalEntry } from "./journal.js";

/** Version pin every record carries; a future shape change is a new version, never a reinterpretation. */
export const RECONCILE_CONTRACT_VERSION = "workbench.reconcile/v1";
/** Contract of the envelope an acknowledged position returns to the script. */
export const ACKNOWLEDGEMENT_VALUE_CONTRACT = "workbench.reconcile.acknowledgement/v1";
/** The checks an acknowledgement passed, named on the record so an auditor need not reconstruct them. */
export const RECONCILE_ACK_POLICY = "exact-grant+same-scope+bound-entry+producer-evidence+operator-attested";
/** The checks an override passed. */
export const RECONCILE_OVERRIDE_POLICY =
  "exact-grant+same-scope+bound-acknowledgement+operator-confirmed+duplicate-risk-accepted";

/**
 * Producers an operator may reconcile, and the ONLY reads that count as their
 * evidence. Grants are minted from these own keys and never from journal
 * text, so a journal line cannot name itself a new authority
 * (NATIVE_CONTROL_ACTIONS precedent in workbench/control.ts).
 */
export const RECONCILE_EVIDENCE_READS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  furnace: Object.freeze(["furnace.run.inspect"]),
  forge: Object.freeze(["forge.gate.status"]),
  hyperunix: Object.freeze(["hyperunix.find"]),
  reactivefiber: Object.freeze(["reactivefiber.render.preview"]),
});

export type EffectDetermination = "effect-confirmed" | "effect-absent" | "indeterminate";
export type EvidenceClass = "producer-confirmed" | "operator-asserted";
export type EvidenceBinding = "journal-recorded" | "operator-asserted" | "unbound";
export type DuplicateRisk = "none" | "possible-duplicate" | "known-duplicate";
export type NoEvidenceReason = "no-read-capability" | "producer-unavailable";
export type ConsumedOutcome = "spent-at-resume-start" | "re-run-ok" | "re-run-failed";

/** The journaled node row a decision binds to, mirrored field by field plus the digest that proves it. */
export interface RecordedEffectBinding {
  readonly index: number;
  readonly key: string;
  readonly ok: boolean;
  readonly capabilityId: string;
  readonly effectClass: string;
  readonly basis?: string;
  readonly entryDigest: string;
}

/**
 * One producer read performed for a reconciliation, recorded as evidence. A
 * receipt is a reference to what the operator saw, never a result cache: the
 * producer's state word is quoted verbatim and a failed read is an outcome,
 * not evidence of absence.
 */
export interface EvidenceReceipt {
  readonly receiptId: string;
  readonly taskId: string;
  readonly position: number;
  readonly producer: string;
  readonly capabilityId: string;
  readonly inputDigest: string;
  readonly resultDigest?: string;
  readonly requestedAt: string;
  readonly observedAt: string;
  readonly outcome: "returned" | CapabilityErrorCategory;
  readonly nativeRef?: NativeRef;
  readonly domainStatus?: string;
  readonly evidenceRefs: readonly string[];
  readonly sourceBasis?: string;
  readonly binding: EvidenceBinding;
}

interface ReconcileRecordCore {
  readonly contractVersion: typeof RECONCILE_CONTRACT_VERSION;
  readonly taskId: string;
  readonly entry: RecordedEffectBinding;
  readonly scope: { readonly workspace: string; readonly principal: string };
  readonly operator: { readonly principal: string; readonly role?: string };
  readonly grant: string;
  readonly recordedAt: string;
  readonly reason: string;
}

export interface AcknowledgeRecord extends ReconcileRecordCore {
  readonly decision: "acknowledge";
  readonly acknowledgementId: string;
  readonly policy: typeof RECONCILE_ACK_POLICY;
  readonly determination: EffectDetermination;
  readonly evidenceClass: EvidenceClass;
  readonly evidence: readonly EvidenceReceipt[];
  readonly noEvidenceReason?: NoEvidenceReason;
  readonly settlement: "envelope" | "none";
  readonly resolvedValue?: JsonValue;
  /** Present ONLY on the copy the applying resume writes back (markApplied). */
  readonly applied?: { readonly at: string; readonly basis?: string };
}

export interface OverrideRecord extends ReconcileRecordCore {
  readonly decision: "override";
  readonly overrideId: string;
  readonly policy: typeof RECONCILE_OVERRIDE_POLICY;
  readonly acknowledgementId: string;
  readonly duplicateRisk: DuplicateRisk;
  readonly confirmation: {
    readonly confirmed: true;
    readonly position: number;
    readonly capabilityId: string;
    readonly acceptDuplicateRisk: boolean;
  };
  /** Present ONLY on consumed copies (markConsumed); its existence spends the authorization. */
  readonly consumed?: { readonly at: string; readonly outcome: ConsumedOutcome; readonly byRunId?: string };
}

export type ReconcileRecord = AcknowledgeRecord | OverrideRecord;

/** A journal row carrying an acknowledgement. */
export interface AcknowledgeRow extends WorkflowJournalEntry {
  readonly kind: "acknowledge";
  readonly reconcile: AcknowledgeRecord;
}
/** A journal row carrying an override (live, or a consumed copy). */
export interface OverrideRow extends WorkflowJournalEntry {
  readonly kind: "override";
  readonly reconcile: OverrideRecord;
}

/** Every decision recorded at one node position, in file order. */
export interface PositionDecisions {
  readonly acks: readonly AcknowledgeRow[];
  readonly overrides: readonly OverrideRow[];
  /** overrideIds with any consumed copy anywhere at this position. */
  readonly spent: ReadonlySet<string>;
}

/** What the resume runtime does at a refusing position, decided purely from the records. */
export type ReconcileAdmission =
  | { kind: "refuse"; reason?: string }
  | { kind: "acknowledged"; acknowledgement: AcknowledgeRow }
  | { kind: "override"; override: OverrideRow };

export interface ReconcileAdmissionInput {
  readonly recorded: WorkflowJournalEntry;
  readonly index: number;
  readonly currentKey: string;
  readonly currentCapabilityId: string;
}

/** Reconcile provenance a progress node row carries for the views (progress.ts). */
export type NodeReconcileProvenance =
  | {
      state: "pending";
      position: number;
      capabilityId: string;
      effectClass: string;
      producer: string;
      key: string;
      entryDigest: string;
      nativeRefs?: NativeRef[];
      decisions: { acknowledged: number; overridesLive: number; overridesSpent: number };
    }
  | {
      state: "acknowledged";
      acknowledgementId: string;
      principal: string;
      recordedAt: string;
      determination: EffectDetermination;
      evidenceClass: EvidenceClass;
    }
  | {
      state: "overridden";
      overrideId: string;
      principal: string;
      recordedAt: string;
      duplicateRisk: DuplicateRisk;
      outcome: "re-run-ok" | "re-run-failed";
    };

const TASK_ID = /^wf_[a-z0-9-]{6,}$/;
const ACK_ID = /^ack_[0-9a-f]{32}$/;
const OVERRIDE_ID = /^ovr_[0-9a-f]{32}$/;
const RECEIPT_ID = /^rcp_[0-9a-f]{32}$/;
const ENTRY_DIGEST = /^sha256:[0-9a-f]{64}$/;
const GRANT = /^reconcile:[a-z][a-z0-9]*\.(?:acknowledge|override)$/;
const DETERMINATIONS: ReadonlySet<string> = new Set(["effect-confirmed", "effect-absent", "indeterminate"]);
const BINDINGS: ReadonlySet<string> = new Set(["journal-recorded", "operator-asserted", "unbound"]);
const DUPLICATE_RISKS: ReadonlySet<string> = new Set(["none", "possible-duplicate", "known-duplicate"]);
const NO_EVIDENCE_REASONS: ReadonlySet<string> = new Set(["no-read-capability", "producer-unavailable"]);
const CONSUMED_OUTCOMES: ReadonlySet<string> = new Set(["spent-at-resume-start", "re-run-ok", "re-run-failed"]);
const RECEIPT_OUTCOMES: ReadonlySet<string> = new Set([
  "returned",
  "validation",
  "authorization",
  "unavailable",
  "transport",
  "uncertain-effect",
]);
const MAX_EVIDENCE_RECEIPTS = 8;
const MAX_RESOLVED_VALUE_BYTES = 32 * 1024;

/**
 * Digest of the fields that bind a decision to one journaled effect: position,
 * key, outcome, capability, effect class and basis. Display and reference
 * fields (`text`, `nativeRefs`) deliberately do not bind, so a reference added
 * by a later record pass can never unbind a decision already made.
 */
export function entryDigestOf(entry: WorkflowJournalEntry): string {
  const canonical = JSON.stringify([
    "workbench.reconcile.entry/v1",
    entry.index,
    entry.key,
    entry.ok,
    entry.capabilityId ?? null,
    entry.effectClass ?? null,
    entry.basis ?? null,
  ]);
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

/** First `.`/`-` segment of a capability id — the producer that owns the effect. */
export function producerOf(capabilityId: string): string {
  const match = /^[^.-]+/.exec(capabilityId);
  return match === null ? "" : match[0];
}

/**
 * Mint the exact grant literal a decision requires. Only producers with a
 * declared evidence read exist as grant targets; anything else — including
 * prototype keys smuggled through journal text — is refused.
 */
export function reconcileGrant(producer: string, decision: "acknowledge" | "override"): string {
  if (!Object.hasOwn(RECONCILE_EVIDENCE_READS, producer)) {
    throw new CapabilityError(
      "validation",
      `No reconcile grants exist for producer "${stripUnsafeText(producer).slice(0, 64)}": only producers with a declared evidence read can be reconciled.`,
    );
  }
  return `reconcile:${producer}.${decision}`;
}

function plainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** The control.ts rule: a bounded ISO instant that names its zone. */
function instant(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 64 &&
    /(?:Z|[+-]\d\d:\d\d)$/.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}

/** 1..512 bytes of operator prose with no terminal escapes or bidi marks. */
function cleanReason(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    Buffer.byteLength(value, "utf8") >= 1 &&
    Buffer.byteLength(value, "utf8") <= 512 &&
    stripUnsafeText(value) === value
  );
}

function cleanBoundedText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length <= maxLength && stripUnsafeText(value) === value;
}

function isNativeRefValue(value: unknown): value is NativeRef {
  if (!plainObject(value)) return false;
  return (
    typeof value.provider === "string" &&
    typeof value.type === "string" &&
    typeof value.id === "string" &&
    (value.scope === undefined || typeof value.scope === "string")
  );
}

function isEvidenceReceipt(value: unknown): value is EvidenceReceipt {
  if (!plainObject(value)) return false;
  if (typeof value.receiptId !== "string" || !RECEIPT_ID.test(value.receiptId)) return false;
  if (typeof value.taskId !== "string" || !TASK_ID.test(value.taskId)) return false;
  if (!Number.isInteger(value.position) || (value.position as number) < 0) return false;
  if (typeof value.producer !== "string" || !Object.hasOwn(RECONCILE_EVIDENCE_READS, value.producer)) return false;
  const reads = RECONCILE_EVIDENCE_READS[value.producer];
  if (typeof value.capabilityId !== "string" || reads === undefined || !reads.includes(value.capabilityId)) {
    return false;
  }
  if (typeof value.inputDigest !== "string" || value.inputDigest === "") return false;
  if (value.resultDigest !== undefined && (typeof value.resultDigest !== "string" || value.resultDigest === "")) {
    return false;
  }
  if (!instant(value.requestedAt) || !instant(value.observedAt)) return false;
  if (typeof value.outcome !== "string" || !RECEIPT_OUTCOMES.has(value.outcome)) return false;
  if (value.nativeRef !== undefined && !isNativeRefValue(value.nativeRef)) return false;
  if (value.domainStatus !== undefined && !cleanBoundedText(value.domainStatus, 256)) return false;
  if (!Array.isArray(value.evidenceRefs) || !value.evidenceRefs.every((ref) => typeof ref === "string")) return false;
  if (value.sourceBasis !== undefined && typeof value.sourceBasis !== "string") return false;
  return typeof value.binding === "string" && BINDINGS.has(value.binding);
}

function isRecordedEffectBinding(value: unknown): value is RecordedEffectBinding {
  if (!plainObject(value)) return false;
  return (
    Number.isInteger(value.index) &&
    (value.index as number) >= 0 &&
    typeof value.key === "string" &&
    typeof value.ok === "boolean" &&
    typeof value.capabilityId === "string" &&
    value.capabilityId !== "" &&
    typeof value.effectClass === "string" &&
    value.effectClass !== "" &&
    (value.basis === undefined || typeof value.basis === "string") &&
    typeof value.entryDigest === "string" &&
    ENTRY_DIGEST.test(value.entryDigest)
  );
}

function hasValidCore(value: Record<string, unknown>, decision: "acknowledge" | "override"): boolean {
  if (value.contractVersion !== RECONCILE_CONTRACT_VERSION) return false;
  if (typeof value.taskId !== "string" || !TASK_ID.test(value.taskId)) return false;
  if (!isRecordedEffectBinding(value.entry)) return false;
  if (!plainObject(value.scope) || typeof value.scope.workspace !== "string" || typeof value.scope.principal !== "string") {
    return false;
  }
  if (
    !plainObject(value.operator) ||
    typeof value.operator.principal !== "string" ||
    (value.operator.role !== undefined && typeof value.operator.role !== "string")
  ) {
    return false;
  }
  if (typeof value.grant !== "string" || !GRANT.test(value.grant) || !value.grant.endsWith(`.${decision}`)) {
    return false;
  }
  return instant(value.recordedAt) && cleanReason(value.reason);
}

function validResolvedValue(value: unknown): boolean {
  if (value === undefined) return true;
  try {
    validatedCapabilityJson(value, "reconcile.resolvedValue", CAPABILITY_MAX_DEPTH, MAX_RESOLVED_VALUE_BYTES);
    return true;
  } catch {
    return false;
  }
}

function isAcknowledgeRecord(value: Record<string, unknown>): boolean {
  if (value.decision !== "acknowledge") return false;
  if (!hasValidCore(value, "acknowledge")) return false;
  if (typeof value.acknowledgementId !== "string" || !ACK_ID.test(value.acknowledgementId)) return false;
  if (value.policy !== RECONCILE_ACK_POLICY) return false;
  if (typeof value.determination !== "string" || !DETERMINATIONS.has(value.determination)) return false;
  if (!Array.isArray(value.evidence) || value.evidence.length > MAX_EVIDENCE_RECEIPTS) return false;
  if (!value.evidence.every(isEvidenceReceipt)) return false;
  const receipts = value.evidence as readonly EvidenceReceipt[];
  if (receipts.length === 0) {
    // No receipt means the operator attested without a producer read; the
    // record must say why, and it can never claim the effect was confirmed.
    if (typeof value.noEvidenceReason !== "string" || !NO_EVIDENCE_REASONS.has(value.noEvidenceReason)) return false;
    if (value.determination === "effect-confirmed") return false;
  } else if (value.noEvidenceReason !== undefined) {
    return false;
  }
  const producerConfirmed = receipts.some(
    (receipt) => receipt.outcome === "returned" && receipt.binding === "journal-recorded",
  );
  if (value.evidenceClass !== (producerConfirmed ? "producer-confirmed" : "operator-asserted")) return false;
  if (value.settlement !== "envelope" && value.settlement !== "none") return false;
  // An absent effect settles nothing: the position stays refused until an
  // explicit override authorizes the re-run.
  if (value.determination === "effect-absent" && value.settlement !== "none") return false;
  if (!validResolvedValue(value.resolvedValue)) return false;
  if (value.consumed !== undefined) return false;
  if (value.applied !== undefined) {
    if (!plainObject(value.applied) || !instant(value.applied.at)) return false;
    if (value.applied.basis !== undefined && typeof value.applied.basis !== "string") return false;
  }
  return true;
}

function isOverrideRecord(value: Record<string, unknown>): boolean {
  if (value.decision !== "override") return false;
  if (!hasValidCore(value, "override")) return false;
  if (typeof value.overrideId !== "string" || !OVERRIDE_ID.test(value.overrideId)) return false;
  if (value.policy !== RECONCILE_OVERRIDE_POLICY) return false;
  if (typeof value.acknowledgementId !== "string" || !ACK_ID.test(value.acknowledgementId)) return false;
  if (typeof value.duplicateRisk !== "string" || !DUPLICATE_RISKS.has(value.duplicateRisk)) return false;
  const confirmation = value.confirmation;
  if (!plainObject(confirmation)) return false;
  const confirmed = Object.getOwnPropertyDescriptor(confirmation, "confirmed");
  if (confirmed === undefined || !("value" in confirmed) || confirmed.value !== true) return false;
  const entry = value.entry as RecordedEffectBinding;
  if (!Number.isInteger(confirmation.position) || confirmation.position !== entry.index) return false;
  if (typeof confirmation.capabilityId !== "string" || confirmation.capabilityId !== entry.capabilityId) return false;
  if (typeof confirmation.acceptDuplicateRisk !== "boolean") return false;
  if (value.applied !== undefined) return false;
  if (value.consumed !== undefined) {
    if (!plainObject(value.consumed) || !instant(value.consumed.at)) return false;
    if (typeof value.consumed.outcome !== "string" || !CONSUMED_OUTCOMES.has(value.consumed.outcome)) return false;
    if (value.consumed.byRunId !== undefined && typeof value.consumed.byRunId !== "string") return false;
  }
  return true;
}

/** Full-shape guard: every field typed, instants zoned, reason clean, ids and digests shaped. */
export function isReconcileRecord(value: unknown): value is ReconcileRecord {
  if (!plainObject(value)) return false;
  if (value.decision === "acknowledge") return isAcknowledgeRecord(value);
  if (value.decision === "override") return isOverrideRecord(value);
  return false;
}

function isAcknowledgeRow(entry: WorkflowJournalEntry): entry is AcknowledgeRow {
  return (
    entry.kind === "acknowledge" &&
    entry.reconcile !== undefined &&
    isReconcileRecord(entry.reconcile) &&
    entry.reconcile.decision === "acknowledge" &&
    entry.reconcile.entry.index === entry.index &&
    entry.reconcile.entry.key === entry.key
  );
}

function isOverrideRow(entry: WorkflowJournalEntry): entry is OverrideRow {
  return (
    entry.kind === "override" &&
    entry.reconcile !== undefined &&
    isReconcileRecord(entry.reconcile) &&
    entry.reconcile.decision === "override" &&
    entry.reconcile.entry.index === entry.index &&
    entry.reconcile.entry.key === entry.key
  );
}

/** Group every valid decision row by node position, in file order, with the spent override ids. */
export function indexReconciliations(entries: readonly WorkflowJournalEntry[]): Map<number, PositionDecisions> {
  const positions = new Map<number, { acks: AcknowledgeRow[]; overrides: OverrideRow[]; spent: Set<string> }>();
  const at = (index: number): { acks: AcknowledgeRow[]; overrides: OverrideRow[]; spent: Set<string> } => {
    const existing = positions.get(index);
    if (existing !== undefined) return existing;
    const fresh = { acks: [], overrides: [], spent: new Set<string>() };
    positions.set(index, fresh);
    return fresh;
  };
  for (const entry of entries) {
    if (isAcknowledgeRow(entry)) {
      at(entry.index).acks.push(entry);
    } else if (isOverrideRow(entry)) {
      const bucket = at(entry.index);
      bucket.overrides.push(entry);
      if (entry.reconcile.consumed !== undefined) bucket.spent.add(entry.reconcile.overrideId);
    }
  }
  return positions;
}

/**
 * Decide what a resume does at a refusing position. Pure; first match wins.
 * The caller re-digests the recorded row itself, so a decision binds to what
 * is on disk now, never to what a record claims was there.
 */
export function admitReconcile(
  input: ReconcileAdmissionInput,
  decisions: PositionDecisions | undefined,
): ReconcileAdmission {
  if (decisions === undefined || (decisions.acks.length === 0 && decisions.overrides.length === 0)) {
    return { kind: "refuse" };
  }
  const digest = entryDigestOf(input.recorded);
  const boundAcks = decisions.acks.filter((row) => row.reconcile.entry.entryDigest === digest);
  const boundOverrides = decisions.overrides.filter((row) => row.reconcile.entry.entryDigest === digest);
  if (boundAcks.length === 0 && boundOverrides.length === 0) {
    return {
      kind: "refuse",
      reason: "a recorded operator decision does not bind to this effect row; inspect the position and decide again.",
    };
  }
  const sameCall = input.currentKey === input.recorded.key && input.currentCapabilityId === input.recorded.capabilityId;
  const latestAck = boundAcks[boundAcks.length - 1];
  const liveOverride = [...boundOverrides]
    .reverse()
    .find((row) => row.reconcile.consumed === undefined && !decisions.spent.has(row.reconcile.overrideId));
  if (liveOverride !== undefined) {
    if (latestAck === undefined || liveOverride.reconcile.acknowledgementId !== latestAck.reconcile.acknowledgementId) {
      return {
        kind: "refuse",
        reason:
          "conflicting operator decisions at this position: the override cites a superseded acknowledgement; inspect and decide again.",
      };
    }
    if (!sameCall) {
      return {
        kind: "refuse",
        reason:
          "the operator override is bound to a different call than the script now runs at this position; run fresh without resumeFromRunId.",
      };
    }
    return { kind: "override", override: liveOverride };
  }
  const spentCitingLatest =
    latestAck === undefined
      ? undefined
      : [...boundOverrides]
          .reverse()
          .find(
            (row) =>
              row.reconcile.acknowledgementId === latestAck.reconcile.acknowledgementId &&
              (row.reconcile.consumed !== undefined || decisions.spent.has(row.reconcile.overrideId)),
          );
  if (spentCitingLatest !== undefined) {
    const consumedCopy = [...boundOverrides]
      .reverse()
      .find((row) => row.reconcile.overrideId === spentCitingLatest.reconcile.overrideId && row.reconcile.consumed !== undefined);
    const by = consumedCopy?.reconcile.consumed?.byRunId ?? "an earlier resume";
    return {
      kind: "refuse",
      reason: `the acknowledgement at this position was superseded by an operator override consumed by ${by}; inspect and acknowledge again.`,
    };
  }
  if (latestAck !== undefined) {
    const record = latestAck.reconcile;
    if (record.settlement === "none") {
      return {
        kind: "refuse",
        reason: `acknowledged as effect-absent by ${record.operator.principal} at ${record.recordedAt}; an explicit operator override is required before a resume may re-run this position.`,
      };
    }
    if (!sameCall) {
      return {
        kind: "refuse",
        reason:
          "the operator acknowledgement is bound to a different call than the script now runs at this position; run fresh without resumeFromRunId.",
      };
    }
    return { kind: "acknowledged", acknowledgement: latestAck };
  }
  return { kind: "refuse" };
}

function jsonNativeRef(ref: NativeRef): JsonValue {
  const row: { [key: string]: JsonValue } = { provider: ref.provider, type: ref.type, id: ref.id };
  if (ref.scope !== undefined) row.scope = ref.scope;
  return row;
}

/**
 * The envelope an acknowledged position hands the script. Never
 * producer-shaped: the producer's fields exist only inside the evidence rows,
 * and operator-supplied data only under `resolvedValue`.
 */
export function acknowledgementValue(record: AcknowledgeRecord): JsonValue {
  const nativeRefs: JsonValue[] = [];
  const seen = new Set<string>();
  for (const receipt of record.evidence) {
    const ref = receipt.nativeRef;
    if (ref === undefined) continue;
    const identity = JSON.stringify([ref.provider, ref.type, ref.id, ref.scope ?? null]);
    if (seen.has(identity)) continue;
    seen.add(identity);
    nativeRefs.push(jsonNativeRef(ref));
  }
  const evidence: JsonValue[] = record.evidence.map((receipt) => {
    const row: { [key: string]: JsonValue } = {
      receiptId: receipt.receiptId,
      capabilityId: receipt.capabilityId,
      observedAt: receipt.observedAt,
      outcome: receipt.outcome,
      evidenceRefs: [...receipt.evidenceRefs],
      binding: receipt.binding,
    };
    if (receipt.domainStatus !== undefined) row.domainStatus = receipt.domainStatus;
    if (receipt.nativeRef !== undefined) row.nativeRef = jsonNativeRef(receipt.nativeRef);
    return row;
  });
  const operator: { [key: string]: JsonValue } = { principal: record.operator.principal };
  if (record.operator.role !== undefined) operator.role = record.operator.role;
  const value: { [key: string]: JsonValue } = {
    contract: ACKNOWLEDGEMENT_VALUE_CONTRACT,
    decision: "acknowledged",
    acknowledgementId: record.acknowledgementId,
    position: record.entry.index,
    capabilityId: record.entry.capabilityId,
    effectClass: record.entry.effectClass,
    producer: producerOf(record.entry.capabilityId),
    determination: record.determination,
    evidenceClass: record.evidenceClass,
    nativeRefs,
    evidence,
    operator,
    recordedAt: record.recordedAt,
    reason: record.reason,
  };
  if (record.resolvedValue !== undefined) value.resolvedValue = record.resolvedValue;
  return value;
}

/**
 * The native-evidence fields an acknowledged settlement row shows, taken from
 * the FIRST bound, returned receipt — the operator's read, never this run's,
 * and never synthesized when no receipt returned.
 */
export function evidenceOfAcknowledgement(record: AcknowledgeRecord): {
  nativeId?: string;
  domainStatus?: string;
  evidenceRefs?: string[];
  sourceBasis?: string;
} {
  const receipt = record.evidence.find(
    (candidate) => candidate.outcome === "returned" && candidate.binding !== "unbound",
  );
  if (receipt === undefined) return {};
  return {
    ...(receipt.nativeRef !== undefined ? { nativeId: receipt.nativeRef.id } : {}),
    ...(receipt.domainStatus !== undefined ? { domainStatus: receipt.domainStatus } : {}),
    ...(receipt.evidenceRefs.length > 0 ? { evidenceRefs: [...receipt.evidenceRefs] } : {}),
    ...(receipt.sourceBasis !== undefined ? { sourceBasis: receipt.sourceBasis } : {}),
  };
}

/** Copy an acknowledgement row with the applied stamp; the original is untouched, the copy frozen. */
export function markApplied(row: AcknowledgeRow, mark: { at: string; basis?: string }): AcknowledgeRow {
  if (!isAcknowledgeRow(row)) {
    throw new CapabilityError("validation", "Only an acknowledgement row can be marked applied.");
  }
  const applied = Object.freeze({ at: mark.at, ...(mark.basis !== undefined ? { basis: mark.basis } : {}) });
  const reconcile = Object.freeze({ ...row.reconcile, applied });
  return { ...row, reconcile };
}

/** Copy an override row with the consumed stamp that spends it; the original is untouched, the copy frozen. */
export function markConsumed(
  row: OverrideRow,
  mark: { at: string; outcome: ConsumedOutcome; byRunId?: string },
): OverrideRow {
  if (!isOverrideRow(row)) {
    throw new CapabilityError("validation", "Only an override row can be marked consumed.");
  }
  const consumed = Object.freeze({
    at: mark.at,
    outcome: mark.outcome,
    ...(mark.byRunId !== undefined ? { byRunId: mark.byRunId } : {}),
  });
  const reconcile = Object.freeze({ ...row.reconcile, consumed });
  return { ...row, reconcile };
}

/**
 * Spend every live override — and only those — at the start of a resume. The
 * caller appends the returned consumed copies to the SOURCE journal before
 * running anything, so no second resume can re-run under the same
 * authorization, whether or not this one reaches the position.
 */
export function consumeOverridesAtResume(
  entries: readonly WorkflowJournalEntry[],
  mark: { byRunId: string; at: string },
): OverrideRow[] {
  const spentCopies: OverrideRow[] = [];
  for (const decisions of indexReconciliations(entries).values()) {
    const seen = new Set<string>();
    for (const row of decisions.overrides) {
      if (row.reconcile.consumed !== undefined) continue;
      if (decisions.spent.has(row.reconcile.overrideId) || seen.has(row.reconcile.overrideId)) continue;
      seen.add(row.reconcile.overrideId);
      spentCopies.push(markConsumed(row, { at: mark.at, outcome: "spent-at-resume-start", byRunId: mark.byRunId }));
    }
  }
  return spentCopies;
}
