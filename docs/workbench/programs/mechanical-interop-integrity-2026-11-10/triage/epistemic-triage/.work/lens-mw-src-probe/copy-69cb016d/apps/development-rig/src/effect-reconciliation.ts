/**
 * EAT-R045: no blind retry after a lost acknowledgement.
 * A writer or gate effect whose acknowledgement never arrived (and no abort was requested) settles as typed
 * uncertainty, and one pure decision point answers "may the effect run again?" from a cited native record only.
 * Nothing here executes an effect, rolls back, cleans or re-dispatches.
 */
import { describePostDispatchAbort, type AbortObservation, type GitText, type PostDispatchUncertainty } from "./post-dispatch-abort.js";

/** The two effect kinds a developLive run can lose an acknowledgement for. The claim effect is pinned by beads-claim.test.ts (MechanicalWorkflows-5qmm). */
export type LostAckEffect = "writer" | "gate";

/** Same native fields as the abort uncertainty; an abort-only ordering fact (agentIgnoredAbort) has no meaning here and is dropped. */
export interface LostAckUncertainty extends Omit<PostDispatchUncertainty, "marker" | "agentIgnoredAbort"> {
  readonly marker: "UNCERTAIN_AFTER_LOST_ACK";
  readonly effect: LostAckEffect;
}

export class DevelopmentLostAcknowledgementError extends Error {
  readonly uncertainty: LostAckUncertainty;
  constructor(uncertainty: LostAckUncertainty) {
    const u = uncertainty;
    super([
      "DEVELOPMENT_LOST_ACKNOWLEDGEMENT: outcome UNCERTAIN, no rollback attempted, no retry attempted",
      "effect=" + u.effect,
      "phase=" + u.phase,
      "worktree=" + u.worktree,
      "base=" + u.gitRef.baseCommit,
      "head=" + (u.gitRef.headCommit ?? "unreadable"),
      "session=" + (u.sessionId ?? "unavailable"),
      "forge_operation=" + (u.forgeOperationId ?? "none"),
      "dirty_paths=" + (u.dirtyPaths === null ? "unreadable" : String(u.dirtyPaths.length)),
      "reconciliation required before any agent re-run or Forge dispatch",
    ].join("; "));
    this.name = "DevelopmentLostAcknowledgementError";
    this.uncertainty = uncertainty;
  }
}

/** Read-only inspection of what the lost acknowledgement left behind; reuses the abort observation reader. */
export async function describeLostAcknowledgement(
  effect: LostAckEffect, observed: Omit<AbortObservation, "agentReturned" | "abortSeenAtAgentReturn">, gitText: GitText,
): Promise<DevelopmentLostAcknowledgementError> {
  const { uncertainty } = await describePostDispatchAbort({ ...observed, agentReturned: false, abortSeenAtAgentReturn: false }, gitText);
  const { agentIgnoredAbort: _ignored, marker: _marker, ...shared } = uncertainty;
  return new DevelopmentLostAcknowledgementError({ ...shared, marker: "UNCERTAIN_AFTER_LOST_ACK", effect });
}

/** True when the worktree shows an observable writer side effect (HEAD moved past the base or dirty paths) or cannot be read at all. */
export function showsWriterSideEffect(u: Pick<LostAckUncertainty, "committed" | "dirtyPaths" | "gitRef">): boolean {
  return u.committed || u.dirtyPaths === null || u.dirtyPaths.length > 0 || u.gitRef.headCommit === null;
}

export interface EvidenceRef { readonly system: "git" | "forge"; readonly kind: string; readonly id: string }

/** What a lost-ack record names about the effect; the abort uncertainty and the lost-ack uncertainty both satisfy it once the effect kind is added. */
export interface ReconcileRecord {
  readonly effect: LostAckEffect;
  readonly worktree: string;
  readonly gitRef: { readonly baseCommit: string };
  readonly forgeOperationId: string | null;
}

/** Injected read-only lookups; the function never writes through them. */
export interface ReconcileSources {
  readonly git: GitText;
  /** Authoritative Forge operation lookup; null means the source is unavailable or inconclusive. found:false carries the id of the record that proves non-occurrence. */
  readonly forgeOperation?: (operationId: string | null, subject: { readonly worktree: string; readonly commit: string }) => Promise<{ readonly found: boolean; readonly id: string } | null>;
}

export interface Reconciliation {
  readonly effect: LostAckEffect;
  readonly disposition: "occurred" | "not-occurred" | "unknown";
  /** True ONLY when disposition is not-occurred AND evidence names the native record that was consulted. */
  readonly retryPermitted: boolean;
  readonly evidence: EvidenceRef | null;
}

function decided(effect: LostAckEffect, disposition: Reconciliation["disposition"], evidence: EvidenceRef | null): Reconciliation {
  return { effect, disposition, retryPermitted: disposition === "not-occurred" && evidence !== null, evidence };
}

/**
 * Pure decision point: consults the injected native sources and returns a disposition. Unavailable or
 * inconclusive sources yield "unknown" and no permission; it never executes, retries or re-dispatches.
 */
export async function reconcileUncertainEffect(record: ReconcileRecord, sources: ReconcileSources): Promise<Reconciliation> {
  const base = record.gitRef.baseCommit;
  if (record.effect === "writer") {
    const [headText, statusText] = await Promise.all([
      sources.git(record.worktree, "rev-parse", "--verify", "HEAD"),
      sources.git(record.worktree, "status", "--porcelain=v1", "--untracked-files=all"),
    ]);
    const head = headText === null ? null : headText.trim() || null;
    if (head === null) return decided("writer", "unknown", null);
    if (head !== base) return decided("writer", "occurred", { system: "git", kind: "commit", id: head });
    if (statusText === null) return decided("writer", "unknown", null);
    if (statusText.split("\n").some(line => line.length > 3)) return decided("writer", "occurred", { system: "git", kind: "worktree-status", id: head });
    return decided("writer", "not-occurred", { system: "git", kind: "head-at-base-clean-worktree", id: head });
  }
  const lookup = sources.forgeOperation;
  if (lookup === undefined) return decided("gate", "unknown", null);
  const headText = await sources.git(record.worktree, "rev-parse", "--verify", "HEAD");
  const head = headText === null ? null : headText.trim() || null;
  if (head === null) return decided("gate", "unknown", null);
  let found: Awaited<ReturnType<NonNullable<ReconcileSources["forgeOperation"]>>>;
  try { found = await lookup(record.forgeOperationId, { worktree: record.worktree, commit: head }); }
  catch { return decided("gate", "unknown", null); }
  if (found === null || typeof found.id !== "string" || found.id.trim().length === 0) return decided("gate", "unknown", null);
  return decided("gate", found.found ? "occurred" : "not-occurred", { system: "forge", kind: "operation", id: found.id });
}
