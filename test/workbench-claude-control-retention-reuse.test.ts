/**
 * wb-hqa.1 (ruling R479, FORGET-ON-INIT): the retention key `${task.id}:${call.index}` is reused by a later ATTEMPT of one
 * agent() call (a runtime retry re-runs the loop with the same index and agentId, so the new query carries a NEW session id
 * under the same key) and by a later TURN of it (a resume fires onSettled with previous.call: same key, same session id).
 * Before this bead a terminal remembered from the earlier attempt or turn made retain() of the later attempt's acknowledged
 * interrupt refuse at once (foreign-observation after a retry, stale-observation after a resume) and DROP it, so that
 * attempt's own later terminal settled nothing and no result phase was minted. The ruled remedy: onInit for a key forgets
 * that key's remembered terminal, because a new system/init on the key is a new query. Hermetic, as
 * test/workbench-claude-control-observer.test.ts: the projection, the decision core, the adapter and the registered tool's
 * constructor are real; the seam is a fake; the clocks are injected; the leg mirrors src/index.ts (executeClaudeControl bound
 * to the session id the init frame bound to the call, then claudeControlRetention.retain).
 *
 * Rows R1-R3 of docs/workbench/receipts/wb-hqa.1.md. W19 wording: the rows record what this process observed on queries it
 * launched for one call; nothing here is a security claim.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import { type ClaudeControlExecution, executeClaudeControl } from "../src/workbench/claude-control.js";
import {
  type ClaudeControlRetention,
  type ClaudeRetainOutcome,
  createClaudeControlObserver,
  createClaudeControlRetention,
} from "../src/workbench/claude-control-observer.js";
import type { ControlDecision } from "../src/workbench/control.js";
import { type ControlExecutionSummary, createWorkflowControlTool, type WorkflowControlDeps } from "../src/workbench/control-tool.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";

// Isolation tripwires (the standing marker rule: a factory that ONLY throws). The suite cannot load if the control
// observer, or anything it imports, ever loads the Claude Agent SDK or the Claude host.
vi.mock("@anthropic-ai/claude-agent-sdk", () => {
  throw new Error("tripwire: the Claude control observer must never load the Claude Agent SDK");
});
vi.mock("../src/workbench/claude-host.js", () => {
  throw new Error("tripwire: the Claude control observer must never load the Claude host");
});

const WS = "/tmp/claude-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
/** The workflow task id: minted once before any SDK call, it is the retention key's first half for EVERY attempt of the call. */
const INV = "wf_hqa1000001";
/** Attempt 1 (and, on a resume, the resumed turn) runs on this session; a retry's attempt 2 runs on a new one. */
const S1 = "sess-attempt-1";
const S2 = "sess-attempt-2";
const INGEST_AT = "2026-10-17T06:00:00Z";
const INIT_1_AT = "2026-10-17T07:00:00Z";
/** Attempt 1's terminal, remembered for the key; it predates the later attempt's acknowledgement. */
const TERMINAL_1_AT = "2026-10-17T07:00:10Z";
const INIT_2_AT = "2026-10-17T07:00:20Z";
const REQUESTED_AT = "2026-10-17T07:00:29Z";
const ACKED_AT = "2026-10-17T07:00:30Z";
/** The later attempt's own terminal: after its acknowledgement, so the adapter's stale-observation rule admits it. */
const TERMINAL_2_AT = "2026-10-17T07:00:40Z";
const SETTLED_AT = "2026-10-17T07:00:41Z";
const GRANT = "control:claude-agent-sdk.interrupt";
const ACK_REF = "claude-agent-sdk:interrupt_receipt_v1:still_queued=0";
const TIMEOUT_MS = 5_000;
const ctx = { cwd: WS, sessionManager: { getSessionId: () => "s1" } } as unknown as ExtensionContext;

const sessionRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
/** The host's call identity as every hook receives it (claude-host.ts ClaudeCallIdentity, structurally). */
const call = (index: number): { agentId: string; index: number; label: string } => ({ agentId: `wf-agent-${index}`, index, label: `agent-${index}` });
const phases = (task: WorkflowTask): string[] => (task.controlAudit?.receipts ?? []).map(receipt => receipt.phase);
const resultEvents = (projection: ObservationProjection, sessionId: string) =>
  projection.events({ scope: SCOPE, limit: 100, ref: sessionRef(sessionId) }).events.filter(event => event.kind === "control.result");
/** One host clock reading per call, the last one repeated. */
function clock(ticks: readonly string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}
/** Ingests the session node the production way: kind claude.stream, the task id as the trace's invocationId (src/index.ts emitObservation). */
function ingestSession(projection: ObservationProjection, sessionId: string, index: number, sequence: number): void {
  projection.ingest({
    projectionEventId: `${INV}:claude.stream:${sequence}`,
    source: sessionRef(sessionId), scope: SCOPE, sourceSequence: sequence, observedAt: INGEST_AT, kind: "claude.stream",
    node: { presentation: { title: `agent-${index}`, type: "agent", statusText: "observed-running", statusTone: "active" } },
    trace: { invocationId: INV },
  });
}

type Reply = { ok: boolean; invoked: boolean; status: string; control?: Record<string, unknown>; error?: { code: string } };
interface Harness {
  readonly projection: ObservationProjection;
  readonly task: WorkflowTask;
  readonly retention: ClaudeControlRetention;
  readonly hooks: ReturnType<typeof createClaudeControlObserver>;
  readonly interrupt: ReturnType<typeof vi.fn>;
  readonly executions: ClaudeControlExecution[];
  readonly outcomes: ClaudeRetainOutcome[];
  /** One attempt's system/init on call 0, the production way: the session node is ingested, the live query binds the session id, then onInit. */
  init(sessionId: string, sequence: number): void;
  /** The observer's report of call 0's terminal (createClaudeObserver onSettled -> onTerminal). */
  terminal(sessionId: string, terminal: "succeeded" | "failed"): void;
  /** The registered tool by its production constructor over this harness's projection and tasks, with the production leg shape. */
  run(callId: string, sessionId: string): Promise<Reply>;
}
/**
 * The production composition, hermetic: the real tool over a leg that mirrors src/index.ts (the live query resolved by the
 * session id the init frame bound, executeClaudeControl, then claudeControlRetention.retain), the control observer's hooks
 * over the same projection and retention. `observerTicks` are the observer clock's readings, one per hook call.
 */
function harness(observerTicks: readonly string[] = [INIT_1_AT, TERMINAL_1_AT, INIT_2_AT, TERMINAL_2_AT]): Harness {
  const projection = new ObservationProjection();
  const task = createWorkflowTask({ id: INV, script: "" });
  const tasks = new Map<string, WorkflowTask>([[INV, task]]);
  const retention = createClaudeControlRetention({ projection, tasks, now: () => SETTLED_AT });
  const hooks = createClaudeControlObserver({ invocationId: INV, scope: SCOPE, projection, now: clock(observerTicks), retention });
  const interrupt = vi.fn(async (): Promise<unknown> => ({ still_queued: [] }));
  const executions: ClaudeControlExecution[] = [];
  const outcomes: ClaudeRetainOutcome[] = [];
  /** What src/index.ts binds on the init frame (liveClaudeQueries[key].sessionId): the session the leg serves for call 0. */
  let liveSessionId: string | undefined;
  const leg = async (decision: ControlDecision): Promise<ControlExecutionSummary> => {
    const next = await executeClaudeControl(decision, {
      seam: { interrupt }, call: { invocationId: INV, index: 0, ...(liveSessionId !== undefined ? { sessionId: liveSessionId } : {}) }, now: () => ACKED_AT, timeoutMs: TIMEOUT_MS,
    });
    executions.push(next);
    outcomes.push(retention.retain(next));
    return { receipt: next.receipt, status: next.status };
  };
  const deps: WorkflowControlDeps = {
    grants: () => [GRANT, "workbench:observe"], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection, tasks, now: () => REQUESTED_AT, executors: { "claude-agent-sdk": leg },
  };
  const tool = createWorkflowControlTool(deps);
  return {
    projection, task, retention, hooks, interrupt, executions, outcomes,
    init(sessionId, sequence) {
      ingestSession(projection, sessionId, 0, sequence);
      liveSessionId = sessionId;
      hooks.onInit(call(0), sessionId);
    },
    terminal(sessionId, terminal) {
      hooks.onTerminal(call(0), { provider: "claude-agent-sdk", sessionId, freshness: "current", terminal });
    },
    async run(callId, sessionId) {
      const result = await tool.execute(callId, { target: sessionRef(sessionId), action: "interrupt", confirmed: true } as never, undefined, undefined, ctx as never);
      const text = result.content[0]?.type === "text" ? result.content[0].text : "";
      return JSON.parse(text) as Reply;
    },
  };
}
/** The one result receipt of the task's audit, after requested and acknowledged. */
function resultReceipt(task: WorkflowTask): { readonly outcome: string; readonly ownershipConfirmationRef: string; readonly acknowledgedAt: string; readonly nativeResultRef: string } {
  const receipt = task.controlAudit?.receipts[2];
  if (receipt === undefined || receipt.phase !== "result") throw new Error(`expected a result receipt third, got ${JSON.stringify(phases(task))}`);
  return receipt;
}

describe("wb-hqa.1 R1-R2: a later attempt or turn of one call settles its own terminal (forget-on-init, R479)", () => {
  it("R1 retry (same task.id and call.index, a NEW session): attempt 1's remembered terminal is forgotten at attempt 2's system/init, so attempt 2's acknowledged interrupt parks pending instead of being refused foreign-observation, and attempt 2's own terminal settles exactly one result phase", async () => {
    const h = harness();
    // Attempt 1: init on S1, then the call ends on its own (no interrupt was requested on it): its terminal is remembered for the key.
    h.init(S1, 1);
    h.terminal(S1, "succeeded");
    expect(h.retention.size()).toBe(0);
    // Attempt 2 (runtime.ts retry branch: the same index and agentId, a new query, a new session id) on the SAME key.
    h.init(S2, 2);
    expect(h.projection.relations({ scope: SCOPE })).toHaveLength(2);
    // The operator interrupts attempt 2; the leg acknowledges it after attempt 1's terminal was observed.
    const reply = await h.run("call-retry", S2);
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    expect(reply.control?.phase).toBe("acknowledged");
    expect(h.interrupt).toHaveBeenCalledTimes(1);
    const requestId = h.executions[0]?.requested.requestId ?? "";
    expect(requestId).toMatch(/^ctl_[0-9a-f]{32}$/);
    // Red before the remedy: outcomes ["refused"] with one diagnostic line naming foreign-observation (attempt 1's terminal names S1).
    expect({ outcomes: h.outcomes, logs: h.task.logs }).toEqual({ outcomes: ["pending"], logs: [] });
    expect(h.retention.size()).toBe(1);
    expect(phases(h.task)).toEqual(["requested", "acknowledged"]);
    // Attempt 2's OWN terminal (observed after its acknowledgement) settles the one pending execution: one result phase.
    h.terminal(S2, "failed");
    expect(phases(h.task)).toEqual(["requested", "acknowledged", "result"]);
    const result = resultReceipt(h.task);
    expect(result.outcome).toBe("unknown");
    expect(result.ownershipConfirmationRef).toBe(S2);
    expect(result.acknowledgedAt).toBe(ACKED_AT);
    expect(result.nativeResultRef).toBe(`claude-agent-sdk:session:${S2}:failed@${TERMINAL_2_AT}`);
    const events = resultEvents(h.projection, S2);
    expect(events).toHaveLength(1);
    expect(events[0]?.evidenceRefs).toEqual([`control-receipt:${requestId}`, `native-ack:${ACK_REF}`, `native-result:claude-agent-sdk:session:${S2}:failed@${TERMINAL_2_AT}`]);
    expect(events[0]?.observedAt).toBe(SETTLED_AT);
    expect(events[0]?.trace?.invocationId).toBe(INV);
    // Nothing is attributed to attempt 1's session, nothing stays pending, no line is written, and a repeat mints nothing more.
    expect(resultEvents(h.projection, S1)).toEqual([]);
    expect(h.retention.size()).toBe(0);
    expect(h.task.logs).toEqual([]);
    h.terminal(S2, "failed");
    expect(resultEvents(h.projection, S2)).toHaveLength(1);
    expect(phases(h.task)).toHaveLength(3);
  });

  it("R2 resume (same session, same key): turn 1's remembered terminal is forgotten at the resumed turn's system/init (the ownership edge re-stated as a no-op), so the turn's acknowledged interrupt parks pending instead of being refused stale-observation, and the turn's own terminal settles exactly one result phase", async () => {
    const h = harness();
    // Turn 1: init, then the turn ends on its own: its terminal is remembered for the key.
    h.init(S1, 1);
    h.terminal(S1, "succeeded");
    expect(h.retention.size()).toBe(0);
    // Turn 2 (claude-host.ts resumeAgent: previous.call, the same session id): the resumed query's own system/init.
    h.init(S1, 2);
    expect(h.projection.relations({ scope: SCOPE })).toHaveLength(1);
    expect(h.hooks.diagnostics()).toEqual({ ownershipStated: 2, ownershipWithheld: 0, ownershipRefused: 0 });
    // The operator interrupts the resumed turn; acknowledged after turn 1's terminal was observed.
    const reply = await h.run("call-resume", S1);
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    expect(h.interrupt).toHaveBeenCalledTimes(1);
    const requestId = h.executions[0]?.requested.requestId ?? "";
    // Red before the remedy: outcomes ["refused"] with one diagnostic line naming stale-observation (turn 1's terminal predates the acknowledgement).
    expect({ outcomes: h.outcomes, logs: h.task.logs }).toEqual({ outcomes: ["pending"], logs: [] });
    expect(h.retention.size()).toBe(1);
    expect(phases(h.task)).toEqual(["requested", "acknowledged"]);
    // The resumed turn's OWN terminal settles the one pending execution: one result phase.
    h.terminal(S1, "failed");
    expect(phases(h.task)).toEqual(["requested", "acknowledged", "result"]);
    const result = resultReceipt(h.task);
    expect(result.outcome).toBe("unknown");
    expect(result.ownershipConfirmationRef).toBe(S1);
    expect(result.nativeResultRef).toBe(`claude-agent-sdk:session:${S1}:failed@${TERMINAL_2_AT}`);
    const events = resultEvents(h.projection, S1);
    expect(events).toHaveLength(1);
    expect(events[0]?.evidenceRefs).toEqual([`control-receipt:${requestId}`, `native-ack:${ACK_REF}`, `native-result:claude-agent-sdk:session:${S1}:failed@${TERMINAL_2_AT}`]);
    expect(h.retention.size()).toBe(0);
    expect(h.task.logs).toEqual([]);
  });
});

describe("wb-hqa.1 R3: forget-on-init is bounded to the key's remembered terminal (negative control, green before and after)", () => {
  it("R3 an init on another index leaves the key's remembered terminal in place, so U6's remembered branch still refuses stale-observation at retain; an init on the key leaves a PENDING execution of the key alone", async () => {
    // (a) Per key: call 1's system/init forgets nothing of call 0.
    const sibling = harness();
    sibling.init(S1, 1);
    sibling.terminal(S1, "succeeded");
    ingestSession(sibling.projection, "sess-sibling", 1, 2);
    sibling.hooks.onInit(call(1), "sess-sibling");
    expect(sibling.projection.relations({ scope: SCOPE })).toHaveLength(2);
    const reply = await sibling.run("call-sibling", S1);
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
    const requestId = sibling.executions[0]?.requested.requestId ?? "";
    expect(sibling.outcomes).toEqual(["refused"]);
    expect(sibling.task.logs).toEqual([`workflow_control ${requestId}: result not established (stale-observation)`]);
    expect(sibling.retention.size()).toBe(0);
    expect(phases(sibling.task)).toEqual(["requested", "acknowledged"]);
    expect(resultEvents(sibling.projection, S1)).toEqual([]);
    // (b) The pending map is never touched by an init: a pending execution of the key survives one and settles from the next terminal.
    const parked = harness([INIT_1_AT, INIT_2_AT, TERMINAL_2_AT]);
    parked.init(S1, 1);
    await parked.run("call-parked", S1);
    expect(parked.outcomes).toEqual(["pending"]);
    parked.hooks.onInit(call(0), S1);
    expect(parked.retention.size()).toBe(1);
    expect(parked.task.logs).toEqual([]);
    parked.terminal(S1, "failed");
    expect(phases(parked.task)).toEqual(["requested", "acknowledged", "result"]);
    expect(resultEvents(parked.projection, S1)).toHaveLength(1);
    expect(parked.retention.size()).toBe(0);
    expect(parked.task.logs).toEqual([]);
  });
});
