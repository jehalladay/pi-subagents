/**
 * Durability is CAS-only with pending receipts, and nothing silently rerolls (APO program, 03 temporal semantics:
 * a private memory proposal is not durable until an explicit acknowledged compare-and-swap; external native effect
 * state never lives in private memory as unverified truth; a retried decision identity must not reroll). State
 * advances only when a write names the revision that was read and its native receipt is acknowledged. An
 * unresolved native write leaves a pending receipt and advances nothing; its acknowledgement under the same write
 * id advances, its failure refuses and clears the pending entry, and a retry is explicit (a new write id, the same
 * value). The same decision can never commit a different value, landed or pending: that is a reroll and a
 * refusal, never a fallback or a resample (APO-EAT-R010). A write that does not advance the revision, or a second
 * write for a decision whose receipt is still pending, is refused. Pure; nothing here performs the native write
 * or mints an identifier — the receipt is whatever the native owner reported.
 */

export interface PendingReceipt {
  readonly writeId: string;
  readonly decisionId: string;
  readonly nativeRef: string;
  readonly expectedRevision: string;
  readonly valueDigest: string;
}

export interface CommittedDecision {
  readonly decisionId: string;
  readonly writeId: string;
  readonly valueDigest: string;
}

export interface DurableState<V> {
  readonly schema: "mw.durable-state.v0";
  readonly revision: string;
  readonly value: V;
  readonly pending: readonly PendingReceipt[];
  readonly committed: readonly CommittedDecision[];
}

export type NativeReceipt =
  | { readonly status: "acknowledged"; readonly nativeRef: string }
  | { readonly status: "pending"; readonly nativeRef: string }
  | { readonly status: "failed"; readonly nativeRef: string; readonly reason: string };

export interface DurableWrite<V> {
  readonly writeId: string;
  readonly decisionId: string;
  /** The revision the writer read; the swap happens only against it. */
  readonly expectedRevision: string;
  readonly nextRevision: string;
  readonly value: V;
  readonly receipt: NativeReceipt;
}

export type DurabilityRefusalCode =
  | "DURABILITY_CAS_MISMATCH"
  | "DURABILITY_REVISION_NOT_ADVANCING"
  | "DURABILITY_REROLL"
  | "DURABILITY_PENDING_UNRESOLVED"
  | "DURABILITY_RECEIPT_FAILED";

export type DurableOutcome<V> =
  | { readonly kind: "advanced"; readonly state: DurableState<V> }
  | { readonly kind: "pending"; readonly state: DurableState<V> }
  | { readonly kind: "refused"; readonly code: DurabilityRefusalCode; readonly detail: string; readonly state: DurableState<V> };

/** Canonical digest of a value: JSON with sorted keys. */
function digest(value: unknown): string {
  const canonical = (input: unknown): unknown => {
    if (Array.isArray(input)) return input.map(canonical);
    if (input !== null && typeof input === "object") return Object.fromEntries(Object.keys(input as Record<string, unknown>).sort().map(key => [key, canonical((input as Record<string, unknown>)[key])]));
    return input;
  };
  return JSON.stringify(canonical(value));
}

export function initialDurableState<V>(revision: string, value: V): DurableState<V> {
  return { schema: "mw.durable-state.v0", revision, value, pending: [], committed: [] };
}

/** Apply one write to a durable state by compare-and-swap. Pure; returns the next state or the unchanged one. */
export function commitDurable<V>(state: DurableState<V>, write: DurableWrite<V>): DurableOutcome<V> {
  const refuse = (code: DurabilityRefusalCode, detail: string, next: DurableState<V> = state): DurableOutcome<V> => ({ kind: "refused", code, detail, state: next });
  const valueDigest = digest(write.value);
  if (write.expectedRevision !== state.revision) {
    return refuse("DURABILITY_CAS_MISMATCH", `write ${write.writeId} expected revision ${write.expectedRevision}, the state is at ${state.revision}; the swap is refused, not retried against the new basis`);
  }
  if (write.nextRevision === write.expectedRevision) {
    return refuse("DURABILITY_REVISION_NOT_ADVANCING", `write ${write.writeId} names ${write.nextRevision} as both the read and the next revision; a commit advances the revision`);
  }
  const landed = state.committed.find(entry => entry.decisionId === write.decisionId);
  if (landed !== undefined && landed.valueDigest !== valueDigest) {
    return refuse("DURABILITY_REROLL", `decision ${write.decisionId} already committed one value under write ${landed.writeId}; write ${write.writeId} carries another, which is a reroll`);
  }
  const inFlight = state.pending.find(entry => entry.decisionId === write.decisionId);
  if (inFlight !== undefined) {
    if (inFlight.valueDigest !== valueDigest) {
      return refuse("DURABILITY_REROLL", `decision ${write.decisionId} has a pending write ${inFlight.writeId} with one value; write ${write.writeId} carries another, which is a reroll`);
    }
    if (inFlight.writeId !== write.writeId) {
      return refuse("DURABILITY_PENDING_UNRESOLVED", `decision ${write.decisionId} has pending write ${inFlight.writeId}; resolve its receipt before writing ${write.writeId}`);
    }
  }
  const withoutThis = state.pending.filter(entry => entry.writeId !== write.writeId);
  if (write.receipt.status === "pending") {
    const entry: PendingReceipt = { writeId: write.writeId, decisionId: write.decisionId, nativeRef: write.receipt.nativeRef, expectedRevision: write.expectedRevision, valueDigest };
    return { kind: "pending", state: { ...state, pending: [...withoutThis, entry] } };
  }
  if (write.receipt.status === "failed") {
    return refuse("DURABILITY_RECEIPT_FAILED", `write ${write.writeId}: the native owner reported ${write.receipt.nativeRef} failed (${write.receipt.reason}); state stays at ${state.revision}`, { ...state, pending: withoutThis });
  }
  const committed = landed === undefined ? [...state.committed, { decisionId: write.decisionId, writeId: write.writeId, valueDigest }] : state.committed;
  return { kind: "advanced", state: { schema: "mw.durable-state.v0", revision: write.nextRevision, value: write.value, pending: withoutThis, committed } };
}
