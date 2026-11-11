/**
 * Failure-handling matrix remainder (APO program, 04 "Failure handling"): source inconsistency -> quarantine;
 * rewrite migration failure -> leave the old graph active; native crash -> consult the native receipt or the write's
 * idempotency before any retry. The sibling rows are gated elsewhere (evaluator unavailability -> deterministic
 * fallback, APO-EAT-R010; basis or checkpoint mismatch -> refusal, APO-EAT-R011; insufficient evidence -> unknown,
 * APO-EAT-R006). `judgeSourceConsistency` quarantines a source that reports two different contents for one revision
 * and makes its reads unknown while quarantined. `resolveMigrationFailure` keeps the active alias exactly where it was
 * and leaves the candidate inactive. `decideRetryAfterCrash` is the retry table: an acknowledged receipt means the
 * write landed and is not retried; a pending receipt holds; a failed receipt retries; an unknown receipt retries only
 * when the write is idempotent and otherwise demands the receipt first — a blind retry has no row; a receipt whose status
 * lies outside those three is malformed and returns the CRASH_RETRY_RECEIPT_STATUS_INVALID refusal record. Pure records:
 * nothing here quarantines, swaps or retries anything.
 */
import type { NativeReceipt } from "./durability.js";
import { UNKNOWN } from "./episode.js";
import type { Maybe } from "./episode.js";
import type { GraphAlias } from "./rewrite-inheritance.js";

export interface SourceSample {
  readonly revision: string;
  readonly digest: string;
}

export interface SourceConflict {
  readonly revision: string;
  /** Distinct digests observed at one revision, sorted. */
  readonly digests: readonly string[];
}

export interface SourceConsistencyVerdict {
  readonly schema: "mw.source-consistency.v0";
  readonly sourceId: string;
  readonly action: "none" | "quarantine";
  readonly conflicts: readonly SourceConflict[];
  /** What a read of this source returns while this verdict stands: observed content, or unknown when quarantined or unobserved. */
  readonly reads: Maybe<"observed">;
}

export function judgeSourceConsistency(sourceId: string, samples: readonly SourceSample[]): SourceConsistencyVerdict {
  const byRevision = new Map<string, Set<string>>();
  for (const sample of samples) byRevision.set(sample.revision, new Set([...(byRevision.get(sample.revision) ?? []), sample.digest]));
  const conflicts: SourceConflict[] = [...byRevision]
    .filter(([, digests]) => digests.size > 1)
    .map(([revision, digests]) => ({ revision, digests: [...digests].sort() }))
    .sort((a, b) => (a.revision < b.revision ? -1 : a.revision > b.revision ? 1 : 0));
  if (conflicts.length > 0) return { schema: "mw.source-consistency.v0", sourceId, action: "quarantine", conflicts, reads: UNKNOWN };
  return { schema: "mw.source-consistency.v0", sourceId, action: "none", conflicts, reads: samples.length === 0 ? UNKNOWN : "observed" };
}

export interface MigrationAttempt {
  readonly candidateRevision: string;
  readonly failure: string;
}

export interface MigrationFailureResolution {
  readonly schema: "mw.migration-failure.v0";
  /** The alias that stays active: the one that was active before the attempt, unchanged. */
  readonly active: GraphAlias;
  readonly candidateRevision: string;
  readonly disposition: "left-inactive";
  readonly failure: string;
}

export function resolveMigrationFailure(active: GraphAlias, attempt: MigrationAttempt): MigrationFailureResolution {
  return { schema: "mw.migration-failure.v0", active: { graphId: active.graphId, revision: active.revision }, candidateRevision: attempt.candidateRevision, disposition: "left-inactive", failure: attempt.failure };
}

export type CrashRetryAction = "do-not-retry" | "retry" | "hold-pending" | "consult-receipt";
export type CrashRetryReason = "receipt-acknowledged" | "receipt-pending" | "receipt-failed" | "write-idempotent" | "receipt-unknown";

export interface CrashRetryInput {
  readonly writeId: string;
  /** The native receipt as last known, or unknown when it has not been consulted. */
  readonly receipt: Maybe<NativeReceipt>;
  readonly idempotent: boolean;
}

export interface CrashRetryDecision {
  readonly schema: "mw.crash-retry.v0";
  readonly writeId: string;
  readonly action: CrashRetryAction;
  readonly reason: CrashRetryReason;
}

export type CrashRetryRefusalCode = "CRASH_RETRY_RECEIPT_STATUS_INVALID";

/** A consulted receipt whose status lies outside acknowledged|pending|failed is a malformed receipt, never a retry row; idempotency does not rescue it. */
export interface CrashRetryRefusal {
  readonly schema: "mw.crash-retry.v0";
  readonly writeId: string;
  readonly action: "refuse";
  readonly code: CrashRetryRefusalCode;
}

export function decideRetryAfterCrash(input: CrashRetryInput): CrashRetryDecision | CrashRetryRefusal {
  const base = { schema: "mw.crash-retry.v0" as const, writeId: input.writeId };
  if (input.receipt === UNKNOWN) {
    return input.idempotent ? { ...base, action: "retry", reason: "write-idempotent" } : { ...base, action: "consult-receipt", reason: "receipt-unknown" };
  }
  switch (input.receipt.status) {
    case "acknowledged": return { ...base, action: "do-not-retry", reason: "receipt-acknowledged" };
    case "pending": return { ...base, action: "hold-pending", reason: "receipt-pending" };
    case "failed": return { ...base, action: "retry", reason: "receipt-failed" };
    default: return { ...base, action: "refuse", code: "CRASH_RETRY_RECEIPT_STATUS_INVALID" };
  }
}
