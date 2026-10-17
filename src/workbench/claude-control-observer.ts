/**
 * claude-control-observer.ts (wb-hqa): the two production statements the Claude observer path makes for workflow_control,
 * in one SDK-free module driven by the observer's control hooks (claude-transcript.ts createClaudeObserver, second argument).
 *
 * 1. Ownership (onInit, D1.1): when the system/init frame of one agent() call's own query arrives, the session -> agent-call
 *    ownership edge the decision core requires (control.ts confirmedOwnership) is stated with provenance source
 *    claude-agent-sdk and nativeConfirmationRef = the SDK's own session_id, and from nothing else (owner ruling R1 of
 *    wb-a2g.12; wb-69g.8 F1: source ownership from the SDK session or declare the adapter unreachable, never fake it). The
 *    edge records only that THIS process received, on the query it launched for call `${task.id}:${call.index}`, a
 *    system/init frame reporting that session id: same-process authorization evidence, nothing authenticated, no security
 *    boundary. A stream without system/init binds no ownership (Q2), an identity that is not exact text is withheld and
 *    never repaired (U2), and the `to` end is the key production gives the call before init, stated without an extra
 *    ingest (Q1: a measured, tolerated dangling child).
 * 2. The result phase (onTerminal, D1.3): an acknowledged interrupt is settled only from the observer's report of the
 *    call's own terminal, through settleClaudeInterrupt (never from the acknowledgement), and the minted result is recorded
 *    through the same recorder the in-call path uses (control-tool.ts recordControlReceipt), so the event id, kind, evidence
 *    refs and the audit FIFO cannot drift. The landed mapping stands (ruling R2): a real interrupt's terminal reads failed and
 *    settles unknown; only the call's own cancelled terminal settles cancelled; nothing ever reads completed.
 *
 * The retention (D1.2) holds ACKNOWLEDGED executions awaiting their terminal, separately from the host's live-query maps:
 * onQueryDone (which deletes those maps in src/index.ts) fires in the query's own finally, BEFORE spawnAgent fires onSettled,
 * which is when the observer publishes the terminal, so a settle keyed on the live maps would always miss. Bounded: at most
 * MAX_PENDING_CLAUDE_SETTLES pending executions (a retain past the bound is refused, never evicting a live entry), at most
 * MAX_REMEMBERED_CLAUDE_TERMINALS remembered terminals (FIFO) for the acknowledge/terminal race, and a TTL sweep on every
 * mutation (the forge precedent is forge-control-retention.ts). A refused settle (stale-observation, foreign-observation,
 * result-consumed, unvetted-execution, capacity, or anything else) mints nothing, never retries, never throws into the SDK
 * message loop, and leaves exactly one workflow_log line on the owning task through the existing label layout (Q3): the
 * audit truthfully ends at acknowledged and the reconcile hint remains the operator's path. The tool reply is never amended.
 */
import type { ClaudeNativeObservation } from "../workflow/progress.js";
import { updateWorkflowProgressBatch, type WorkflowTask } from "../workflow/task.js";
import {
  type ClaudeControlExecution,
  ClaudeControlRefusal,
  type ClaudeControlRefusalCode,
  type ClaudeObservedTerminal,
  settleClaudeInterrupt,
} from "./claude-control.js";
import type { ClaudeCallIdentity } from "./claude-host.js";
import { recordControlReceipt } from "./control-tool.js";
import type { NativeRef, ObservationProjection, ObservationScope } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

/** Acknowledged executions awaiting a terminal, across every call; a retain past this bound is refused, never evicting one. */
export const MAX_PENDING_CLAUDE_SETTLES = 64;
/** Terminals remembered for the acknowledge/terminal race, oldest forgotten first. */
export const MAX_REMEMBERED_CLAUDE_TERMINALS = 64;
/** Lifetime bound on a pending execution and on a remembered terminal. */
export const CLAUDE_CONTROL_RETENTION_TTL_MS = 15 * 60_000;

/** Control hooks the Claude observer fires after the display emit of the same frame; they never throw. */
export interface ClaudeObserverControlHooks {
  /** The system/init frame of one call's query, and only that frame, with the SDK's own session_id. */
  onInit(call: ClaudeCallIdentity, sessionId: string): void;
  /** The call's terminal, after its publish and before the observer forgets the call. */
  onTerminal(call: ClaudeCallIdentity, observation: Pick<ClaudeNativeObservation, "provider" | "sessionId" | "freshness" | "terminal">): void;
}
/**
 * What retain established: pending (awaiting the terminal), not-acknowledged (uncertain executions are never settleable),
 * capacity (the bound refused it), settled (a remembered terminal settled it at once) or refused (a remembered terminal
 * could not settle it, which is diagnosed).
 */
export type ClaudeRetainOutcome = "pending" | "not-acknowledged" | "capacity" | "settled" | "refused";
export interface ClaudeControlRetention {
  /** Deposits an acknowledged execution; `at` is the retention clock in milliseconds (the host's Date.now() by default). */
  retain(execution: ClaudeControlExecution, at?: number): ClaudeRetainOutcome;
  /** Settles every pending execution of `key` (`${invocationId}:${index}`) from one observed terminal, then remembers it. */
  settle(key: string, observed: ClaudeObservedTerminal, scope: ObservationScope, at?: number): { settled: number; refused: number };
  /** Honest teardown: nothing pending, nothing remembered, so nothing is attributed after the tasks are gone. */
  dispose(): void;
  /** Pending executions across every call. */
  size(): number;
}
export interface ClaudeControlRetentionDeps {
  readonly projection: ObservationProjection;
  readonly tasks: ReadonlyMap<string, WorkflowTask>;
  /** Host clock for the settled phase. */
  readonly now: () => string;
}
export interface ClaudeControlObserverDeps {
  /** The workflow task id: the host's invocationId, the trace every ingested node carries, and the retention key's first half. */
  readonly invocationId: string;
  /** The run's observer scope, the one every node of the run is ingested under. */
  readonly scope: ObservationScope;
  readonly projection: ObservationProjection;
  /** Host clock for the edge's observedAt and the terminal's observedAt (one clock domain with the leg's acknowledgedAt). */
  readonly now: () => string;
  readonly retention: ClaudeControlRetention;
}

const PROVIDER = "claude-agent-sdk";
const SESSION = "session";
const CALL_PROVIDER = "pi-workflow";
const AGENT_CALL = "agent-call";
const IDENTITY_BYTES = 256;
/** The bound the one diagnostic line is displayed under (the label layout src/index.ts already uses for run text). */
const DIAGNOSTIC_CHARS = 120;
type DiagnosticCode = ClaudeControlRefusalCode | "capacity" | "unexpected";

/**
 * Bounded identity text the one shared helper leaves unchanged in its "text" layout (claude-control.ts exact): used
 * verbatim, never repaired. The named layout is admission, not display.
 */
function exact(value: string): boolean {
  return value !== "" && value.trim() === value && Buffer.byteLength(value) <= IDENTITY_BYTES && sanitizeWorkbenchText(value, IDENTITY_BYTES, "text") === value;
}

/**
 * Pure: the relate input for one call's session, or undefined when an identity (the session id, the invocation id or the
 * agent-call id built from it) is not exact (withheld, never repaired). The `to` end is the same key src/index.ts gives the
 * call before init, Pi's own identity under Pi's own provider.
 */
export function claudeSessionOwnership(input: { scope: ObservationScope; invocationId: string; index: number; sessionId: string; observedAt: string }):
  | { scope: ObservationScope; from: NativeRef; to: NativeRef; kind: "ownership"; provenance: { source: "claude-agent-sdk"; observedAt: string; nativeConfirmationRef: string } }
  | undefined {
  const callId = `${input.invocationId}:${input.index}`;
  if (!exact(input.sessionId) || !exact(input.invocationId) || !exact(callId)) return undefined;
  return {
    scope: { workspace: input.scope.workspace, principal: input.scope.principal },
    from: { provider: PROVIDER, type: SESSION, id: input.sessionId },
    to: { provider: CALL_PROVIDER, type: AGENT_CALL, id: callId },
    kind: "ownership",
    provenance: { source: PROVIDER, observedAt: input.observedAt, nativeConfirmationRef: input.sessionId },
  };
}

/** The one diagnostic line of a refused settle, on the owning task, through the label layout; no projection event is written. */
function diagnose(tasks: ReadonlyMap<string, WorkflowTask>, execution: ClaudeControlExecution, code: DiagnosticCode): void {
  const task = tasks.get(execution.call.invocationId);
  if (task === undefined) return;
  updateWorkflowProgressBatch(task, [{
    type: "workflow_log",
    message: sanitizeWorkbenchText(`workflow_control ${execution.requested.requestId}: result not established (${code})`, DIAGNOSTIC_CHARS, "label"),
  }]);
}

interface PendingSettle { readonly execution: ClaudeControlExecution; readonly at: number }
interface RememberedTerminal { readonly observed: ClaudeObservedTerminal; readonly scope: ObservationScope; readonly at: number }
const keyOf = (call: { readonly invocationId: string; readonly index: number }): string => `${call.invocationId}:${call.index}`;

export function createClaudeControlRetention(deps: ClaudeControlRetentionDeps): ClaudeControlRetention {
  const pending = new Map<string, PendingSettle[]>();
  const terminals = new Map<string, RememberedTerminal>();
  function sweep(at: number): void {
    for (const [key, entries] of pending) {
      const live = entries.filter(entry => at - entry.at < CLAUDE_CONTROL_RETENTION_TTL_MS);
      if (live.length === 0) pending.delete(key);
      else if (live.length !== entries.length) pending.set(key, live);
    }
    for (const [key, entry] of terminals) if (at - entry.at >= CLAUDE_CONTROL_RETENTION_TTL_MS) terminals.delete(key);
  }
  function pendingCount(): number {
    let count = 0;
    for (const entries of pending.values()) count += entries.length;
    return count;
  }
  /** One settle attempt: a minted result is recorded where the operator reads it back; a refusal is diagnosed; nothing retries. */
  function attempt(execution: ClaudeControlExecution, observed: ClaudeObservedTerminal, scope: ObservationScope): boolean {
    try {
      const next = settleClaudeInterrupt(execution, observed, { now: deps.now });
      if (next.result === undefined) throw new Error("settled without a result receipt");
      recordControlReceipt({ projection: deps.projection, tasks: deps.tasks }, next.result, scope);
      return true;
    } catch (error) {
      diagnose(deps.tasks, execution, error instanceof ClaudeControlRefusal ? error.refusal : "unexpected");
      return false;
    }
  }
  return {
    retain(execution, at = Date.now()) {
      sweep(at);
      if (execution.status !== "acknowledged") return "not-acknowledged";
      const key = keyOf(execution.call);
      const remembered = terminals.get(key);
      // The terminal arrived after the acknowledgement but before the leg resumed: settle at once, or refuse stale-observation.
      if (remembered !== undefined) return attempt(execution, remembered.observed, remembered.scope) ? "settled" : "refused";
      if (pendingCount() >= MAX_PENDING_CLAUDE_SETTLES) {
        diagnose(deps.tasks, execution, "capacity");
        return "capacity";
      }
      const entries = pending.get(key) ?? [];
      entries.push({ execution, at });
      pending.set(key, entries);
      return "pending";
    },
    settle(key, observed, scope, at = Date.now()) {
      sweep(at);
      const entries = pending.get(key) ?? [];
      pending.delete(key);
      let settled = 0;
      let refused = 0;
      for (const entry of entries) {
        if (attempt(entry.execution, observed, scope)) settled += 1;
        else refused += 1;
      }
      terminals.delete(key);
      terminals.set(key, { observed, scope, at });
      if (terminals.size > MAX_REMEMBERED_CLAUDE_TERMINALS) {
        const oldest = terminals.keys().next();
        if (!oldest.done) terminals.delete(oldest.value);
      }
      return { settled, refused };
    },
    dispose() {
      pending.clear();
      terminals.clear();
    },
    size() {
      return pendingCount();
    },
  };
}

/**
 * The production control hooks for one run: the ownership statement at system/init and the settle at the call's terminal.
 * Every projection call is wrapped; nothing propagates into the SDK message loop or into onSettled.
 */
export function createClaudeControlObserver(deps: ClaudeControlObserverDeps): ClaudeObserverControlHooks & {
  diagnostics(): Readonly<{ ownershipStated: number; ownershipWithheld: number; ownershipRefused: number }>;
} {
  const counts = { ownershipStated: 0, ownershipWithheld: 0, ownershipRefused: 0 };
  return {
    onInit(call, sessionId) {
      try {
        const relation = claudeSessionOwnership({ scope: deps.scope, invocationId: deps.invocationId, index: call.index, sessionId, observedAt: deps.now() });
        if (relation === undefined) {
          counts.ownershipWithheld += 1;
          return;
        }
        // The same read decideControl makes: the session node must be observed in scope before anything is stated of it.
        const node = deps.projection.query({ scope: deps.scope, ref: relation.from, limit: 1 }).nodes[0];
        if (node === undefined || node.nativeRef.id !== sessionId) {
          counts.ownershipWithheld += 1;
          return;
        }
        // Idempotent by edge id: a resumed call's second init re-states the same edge as a no-op, the first observedAt kept.
        deps.projection.relate(relation);
        counts.ownershipStated += 1;
      } catch {
        counts.ownershipRefused += 1;
      }
    },
    onTerminal(call, observation) {
      try {
        const observedAt = deps.now();
        deps.retention.settle(keyOf({ invocationId: deps.invocationId, index: call.index }), { call: { invocationId: deps.invocationId, index: call.index }, observation, observedAt }, deps.scope);
      } catch {
        // A refusal is diagnosed inside the retention; nothing reaches the stream.
      }
    },
    diagnostics() {
      return { ...counts };
    },
  };
}
