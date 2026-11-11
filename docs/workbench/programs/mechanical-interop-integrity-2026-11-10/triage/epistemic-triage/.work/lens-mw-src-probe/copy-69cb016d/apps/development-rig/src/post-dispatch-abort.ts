/**
 * Typed uncertainty for a host abort observed AFTER the first provider side effect.
 * An abort acknowledgement is never a rollback: nothing here reverts, cleans or retries, and the
 * result names exactly what the host can still see (Git ref, worktree, session, Forge operation).
 */

/** Where the host abort landed relative to the single-writer sequence agent edit -> commit -> Forge gate. */
export type PostDispatchAbortPhase = "during-agent-edits" | "committed-not-gated" | "after-forge-dispatch";

export interface PostDispatchUncertainty {
  readonly marker: "UNCERTAIN_AFTER_ABORT";
  readonly phase: PostDispatchAbortPhase;
  /** Always "not-attempted": the host neither rolled back nor cleaned anything. */
  readonly rollback: "not-attempted";
  readonly worktree: string;
  readonly gitRef: {
    readonly baseCommit: string;
    /** null when HEAD could not be read after the abort. */
    readonly headCommit: string | null;
  };
  /** Native agent session id when the agent or the SDK reported one; null otherwise (never fabricated). */
  readonly sessionId: string | null;
  /** Forge operation id when a gate observation named one; null when no gate was dispatched or none was named. */
  readonly forgeOperationId: string | null;
  readonly forgeDispatched: boolean;
  /** HEAD moved past the base: the commit exists and was NOT gated unless forgeDispatched. */
  readonly committed: boolean;
  readonly committedNotGated: boolean;
  /** True only when the host saw the signal already aborted at the moment the agent returned: the agent ran to completion although the abort was already requested. An abort whose arrival the host cannot order before the agent's return is never labelled ignored. */
  readonly agentIgnoredAbort: boolean;
  /** Paths still listed by `git status --porcelain`; null when status was unreadable. The bytes remain on disk. */
  readonly dirtyPaths: readonly string[] | null;
  /** No second agent run or Forge dispatch may happen before an explicit reconciliation. */
  readonly reconciliationRequired: true;
}

export class DevelopmentAbortedAfterDispatchError extends Error {
  readonly uncertainty: PostDispatchUncertainty;
  constructor(uncertainty: PostDispatchUncertainty) {
    const u = uncertainty;
    super([
      "DEVELOPMENT_ABORTED_AFTER_DISPATCH: outcome UNCERTAIN, no rollback attempted",
      "phase=" + u.phase,
      "worktree=" + u.worktree,
      "base=" + u.gitRef.baseCommit,
      "head=" + (u.gitRef.headCommit ?? "unreadable"),
      "session=" + (u.sessionId ?? "unavailable"),
      "forge_operation=" + (u.forgeOperationId ?? "none"),
      "committed_not_gated=" + String(u.committedNotGated),
      "agent_ignored_abort=" + String(u.agentIgnoredAbort),
      "dirty_paths=" + (u.dirtyPaths === null ? "unreadable" : String(u.dirtyPaths.length)),
      "reconciliation required before any agent re-run or Forge dispatch",
    ].join("; "));
    this.name = "DevelopmentAbortedAfterDispatchError";
    this.uncertainty = uncertainty;
  }
}

export interface AbortObservation {
  readonly worktree: string;
  readonly baseCommit: string;
  readonly sessionId: string | null;
  readonly forgeOperationId: string | null;
  readonly forgeDispatched: boolean;
  readonly agentReturned: boolean;
  /** The host signal was already aborted when the agent returned control; false when the abort arrived later or the agent never returned. */
  readonly abortSeenAtAgentReturn: boolean;
}

/** Reads one Git command's stdout in the worktree, or null when it fails; supplied by the one host module that runs Git. */
export type GitText = (root: string, ...args: string[]) => Promise<string | null>;

/** The session id a thrown error carries, if any; anything but a nonblank string is unavailable. */
export function sessionIdOf(source: unknown): string | null {
  const id = typeof source === "object" && source !== null ? (source as {sessionId?: unknown}).sessionId : undefined;
  return typeof id === "string" && id.trim().length > 0 ? id : null;
}

/** Read-only inspection of what the abort left behind; it never cleans, resets or checks anything out. */
export async function describePostDispatchAbort(observed: AbortObservation, gitText: GitText): Promise<DevelopmentAbortedAfterDispatchError> {
  const [headText, statusText] = await Promise.all([
    gitText(observed.worktree, "rev-parse", "--verify", "HEAD"),
    gitText(observed.worktree, "status", "--porcelain=v1", "--untracked-files=all"),
  ]);
  const head = headText === null ? null : headText.trim() || null;
  const dirtyPaths = statusText === null ? null
    : statusText.split("\n").filter(line => line.length > 3).map(line => line.slice(3));
  const committed = head !== null && head !== observed.baseCommit;
  const phase: PostDispatchAbortPhase = observed.forgeDispatched ? "after-forge-dispatch"
    : committed ? "committed-not-gated" : "during-agent-edits";
  return new DevelopmentAbortedAfterDispatchError({
    marker: "UNCERTAIN_AFTER_ABORT",
    phase,
    rollback: "not-attempted",
    worktree: observed.worktree,
    gitRef: { baseCommit: observed.baseCommit, headCommit: head },
    sessionId: observed.sessionId,
    forgeOperationId: observed.forgeOperationId,
    forgeDispatched: observed.forgeDispatched,
    committed,
    committedNotGated: committed && !observed.forgeDispatched,
    agentIgnoredAbort: observed.agentReturned && observed.abortSeenAtAgentReturn,
    dirtyPaths,
    reconciliationRequired: true,
  });
}
