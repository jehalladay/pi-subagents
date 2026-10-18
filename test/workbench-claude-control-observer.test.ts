/**
 * wb-hqa (T1): the production Claude observer path states the session -> agent-call ownership edge the decision core
 * requires from the SDK's own system/init session_id, and settles an acknowledged interrupt from the observer's report of
 * the call's own terminal through settleClaudeInterrupt, recording the result phase through the same recorder the in-call
 * path uses. Hermetic: no SDK, no host, no network. The projection, the decision core, the adapter and the registered
 * tool's constructor are real; the seam is a fake (test/workbench-claude-control.test.ts fakeSeam shape); the clocks are
 * injected. Throwing tripwires prove the new module never loads the Claude Agent SDK or the Claude host.
 *
 * Rows U1-U10 and C1 of docs/workbench/receipts/wb-hqa.md. W19 wording: the edge records only that THIS process received,
 * on the query it launched for one call, a system/init frame reporting a session id; nothing here is a security claim.
 */
import { readFileSync } from "node:fs";
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import {
  type ClaudeControlExecution,
  type ClaudeInterruptSeam,
  type ClaudeObservedTerminal,
  executeClaudeControl,
} from "../src/workbench/claude-control.js";
import {
  CLAUDE_CONTROL_RETENTION_TTL_MS,
  type ClaudeControlRetention,
  type ClaudeObserverControlHooks,
  claudeSessionOwnership,
  createClaudeControlObserver,
  createClaudeControlRetention,
  MAX_PENDING_CLAUDE_SETTLES,
  MAX_REMEMBERED_CLAUDE_TERMINALS,
} from "../src/workbench/claude-control-observer.js";
import { acknowledge, type ControlDecision, decideControl, type NativeControlRequest, settle } from "../src/workbench/control.js";
import * as controlTool from "../src/workbench/control-tool.js";
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
/** The workflow task id: minted before any SDK call, it is the host's invocationId and the retention key's first half. */
const INV = "wf_hqa0000001";
const SESSION_ID = "sess-1";
const AT = "2026-10-17T06:00:00Z";
const INIT_AT = "2026-10-17T06:59:59Z";
const LATER_AT = "2026-10-17T07:00:30Z";
const NOW = "2026-10-17T07:00:00Z";
const ACKED_AT = "2026-10-17T07:00:02Z";
const OBSERVED_AT = "2026-10-17T07:00:05Z";
const SETTLED_AT = "2026-10-17T07:00:06Z";
const GRANT = "control:claude-agent-sdk.interrupt";
const POLICY = "exact-grant+confirmed-owner+operator-confirmed";
const ACK_REF = "claude-agent-sdk:interrupt_receipt_v1:still_queued=0";
const TIMEOUT_MS = 5_000;
const OUTCOMES = { succeeded: "unknown", failed: "unknown", cancelled: "cancelled", observation_lost: "unknown" } as const;
type Terminal = keyof typeof OUTCOMES;
const ctx = { cwd: WS, sessionManager: { getSessionId: () => "s1" } } as unknown as ExtensionContext;
const cp = (code: number): string => String.fromCodePoint(code);

const sessionRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
const callRef = (invocationId: string, index: number): NativeRef => ({ provider: "pi-workflow", type: "agent-call", id: `${invocationId}:${index}` });
/** The host's call identity as every hook receives it (claude-host.ts ClaudeCallIdentity, structurally). */
const call = (index: number): { agentId: string; index: number; label: string } => ({ agentId: `wf-agent-${index}`, index, label: `agent-${index}` });
/** The projection's node key (observation.ts keyOf), spelled the same way so an edge end can be named without a node. */
const keyOf = (scope: ObservationScope, ref: NativeRef): string => JSON.stringify([scope.workspace, scope.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
function clock(...ticks: string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}
/** Ingests the session node the production way: kind claude.stream, the task id as the trace's invocationId (src/index.ts emitObservation). */
function ingestSession(projection: ObservationProjection, sessionId: string, index = 0, invocationId = INV, sequence = 1): void {
  projection.ingest({
    projectionEventId: `${invocationId}:claude.stream:${sequence}`,
    source: sessionRef(sessionId), scope: SCOPE, sourceSequence: sequence, observedAt: AT, kind: "claude.stream",
    node: { presentation: { title: `agent-${index}`, type: "agent", statusText: "observed-running", statusTone: "active" } },
    trace: { invocationId },
  });
}
function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [GRANT, "workbench:observe"],
    target: sessionRef(SESSION_ID), action: "interrupt", params: { confirmed: true }, invocationId: "call-1", requestedAt: NOW, ...overrides,
  };
}
function permit(projection: ObservationProjection, overrides: Partial<NativeControlRequest> = {}): ControlDecision & { decision: "permitted" } {
  const decision = decideControl(request(overrides), { projection, now: () => NOW });
  if (decision.decision !== "permitted") throw new Error(`expected a permit, got ${JSON.stringify(decision)}`);
  return decision;
}
/** The injected seam: one interrupt(), answering the SDK's empty receipt unless told otherwise. */
function fakeSeam(answer: () => unknown = () => ({ still_queued: [] })): { seam: ClaudeInterruptSeam; interrupt: ReturnType<typeof vi.fn> } {
  const interrupt = vi.fn(async (): Promise<unknown> => answer());
  return { seam: { interrupt }, interrupt };
}
/** An acknowledged (or, with a throwing answer, uncertain) execution for the call at `index`, as the production leg obtains it. */
async function execution(projection: ObservationProjection, options: { index?: number; now?: () => string; answer?: () => unknown; callId?: string } = {}): Promise<ClaudeControlExecution> {
  return executeClaudeControl(permit(projection, { invocationId: options.callId ?? "call-1" }), {
    seam: fakeSeam(options.answer).seam, call: { invocationId: INV, index: options.index ?? 0, sessionId: SESSION_ID }, now: options.now ?? (() => ACKED_AT), timeoutMs: TIMEOUT_MS,
  });
}
/** What the observer reports for the call at `index` (createClaudeObserver onSettled), with the host clock reading. */
function observed(terminal: Terminal | undefined, options: { index?: number; sessionId?: string | undefined; freshness?: "current" | "unknown"; observedAt?: string } = {}): ClaudeObservedTerminal {
  const sessionId = "sessionId" in options ? options.sessionId : SESSION_ID;
  return {
    call: { invocationId: INV, index: options.index ?? 0 },
    observation: { provider: "claude-agent-sdk", ...(sessionId !== undefined ? { sessionId } : {}), freshness: options.freshness ?? "current", ...(terminal === undefined ? {} : { terminal }) },
    observedAt: options.observedAt ?? OBSERVED_AT,
  };
}
const phases = (task: WorkflowTask): string[] => (task.controlAudit?.receipts ?? []).map(receipt => receipt.phase);
const resultEvents = (projection: ObservationProjection, sessionId = SESSION_ID) =>
  projection.events({ scope: SCOPE, limit: 100, ref: sessionRef(sessionId) }).events.filter(event => event.kind === "control.result");
/** A projection whose relate refuses every statement, as a saturated or failing projection would. */
class RefusingProjection extends ObservationProjection {
  override relate(): void {
    throw new Error("relate refused");
  }
}

type Reply = { ok: boolean; invoked: boolean; status: string; control?: Record<string, unknown>; error?: { code: string } };
interface Harness {
  readonly projection: ObservationProjection;
  readonly task: WorkflowTask;
  readonly tasks: Map<string, WorkflowTask>;
  readonly retention: ClaudeControlRetention;
  readonly hooks: ReturnType<typeof createClaudeControlObserver>;
  readonly interrupt: ReturnType<typeof vi.fn>;
  readonly executions: ClaudeControlExecution[];
  readonly outcomes: string[];
  /** The registered tool by its production constructor over this harness's projection and tasks, with the production leg shape. */
  run(callId: string, sessionId?: string): Promise<Reply>;
}
/**
 * The production composition, hermetic: the real tool over a leg that mirrors src/index.ts (executeClaudeControl, then
 * claudeControlRetention.retain), the control observer's hooks over the same projection and retention.
 */
function harness(options: { observerNow?: () => string; retentionNow?: () => string; legNow?: () => string; answer?: () => unknown; projection?: ObservationProjection } = {}): Harness {
  const projection = options.projection ?? new ObservationProjection();
  const task = createWorkflowTask({ id: INV, script: "" });
  const tasks = new Map<string, WorkflowTask>([[INV, task]]);
  const retention = createClaudeControlRetention({ projection, tasks, now: options.retentionNow ?? (() => SETTLED_AT) });
  const hooks = createClaudeControlObserver({ invocationId: INV, scope: SCOPE, projection, now: options.observerNow ?? clock(INIT_AT, OBSERVED_AT), retention });
  const fake = fakeSeam(options.answer);
  const executions: ClaudeControlExecution[] = [];
  const outcomes: string[] = [];
  const leg = async (decision: ControlDecision): Promise<ControlExecutionSummary> => {
    const next = await executeClaudeControl(decision, {
      seam: fake.seam, call: { invocationId: INV, index: 0, sessionId: SESSION_ID }, now: options.legNow ?? (() => ACKED_AT), timeoutMs: TIMEOUT_MS,
    });
    executions.push(next);
    outcomes.push(retention.retain(next));
    return { receipt: next.receipt, status: next.status };
  };
  const deps: WorkflowControlDeps = {
    grants: () => [GRANT, "workbench:observe"], observerScope: () => ({ ...SCOPE }), localPrincipal: () => SCOPE.principal, sessionIdOf: () => "s1",
    projection, tasks, now: () => NOW, executors: { "claude-agent-sdk": leg },
  };
  const tool = createWorkflowControlTool(deps);
  return {
    projection, task, tasks, retention, hooks, interrupt: fake.interrupt, executions, outcomes,
    async run(callId, sessionId = SESSION_ID) {
      const result = await tool.execute(callId, { target: sessionRef(sessionId), action: "interrupt", confirmed: true } as never, undefined, undefined, ctx as never);
      const text = result.content[0]?.type === "text" ? result.content[0].text : "";
      return JSON.parse(text) as Reply;
    },
  };
}
/** A harness whose session is observed and owned the production way: ingest, then the init hook. */
function owned(options: Parameters<typeof harness>[0] = {}): Harness {
  const h = harness(options);
  ingestSession(h.projection, SESSION_ID);
  h.hooks.onInit(call(0), SESSION_ID);
  return h;
}

describe("wb-hqa U1-U3: the ownership statement at system/init", () => {
  it("U1 ownership stated at init flips admission: before onInit the core denies no-confirmed-ownership; after it exactly one session-sourced edge exists and the permit carries the init session id", () => {
    const h = harness({ observerNow: () => INIT_AT });
    ingestSession(h.projection, SESSION_ID);
    const before = decideControl(request(), { projection: h.projection, now: () => NOW });
    expect(before).toMatchObject({ decision: "denied", policy: "no-confirmed-ownership", category: "authorization" });
    h.hooks.onInit(call(0), SESSION_ID);
    const sessionKey = keyOf(SCOPE, sessionRef(SESSION_ID));
    expect(h.projection.relations({ scope: SCOPE, from: sessionKey })).toStrictEqual([{
      from: sessionKey, to: keyOf(SCOPE, callRef(INV, 0)), kind: "ownership",
      provenance: { source: "claude-agent-sdk", observedAt: INIT_AT, nativeConfirmationRef: SESSION_ID },
    }]);
    const after = decideControl(request(), { projection: h.projection, now: () => NOW });
    expect(after.decision).toBe("permitted");
    if (after.decision !== "permitted") throw new Error("expected a permit");
    expect(after.receipt.ownershipConfirmationRef).toBe(SESSION_ID);
    expect(after.receipt.policy).toBe(POLICY);
    expect(after.receipt.target).toEqual(sessionRef(SESSION_ID));
    expect(h.hooks.diagnostics()).toEqual({ ownershipStated: 1, ownershipWithheld: 0, ownershipRefused: 0 });
    // Pure: the relation the hook stated is exactly claudeSessionOwnership's for the same identities.
    expect(claudeSessionOwnership({ scope: SCOPE, invocationId: INV, index: 0, sessionId: SESSION_ID, observedAt: INIT_AT })).toStrictEqual({
      scope: { ...SCOPE }, from: sessionRef(SESSION_ID), to: callRef(INV, 0), kind: "ownership",
      provenance: { source: "claude-agent-sdk", observedAt: INIT_AT, nativeConfirmationRef: SESSION_ID },
    });
  });

  it("U2 withheld, never repaired: a blank, padded, escape-bearing, bidi, oversize or credential-shaped id, or one whose session node is not observed, states no edge and never throws; a refusing relate is counted and returns", () => {
    const hostile = ["", "   ", ` ${SESSION_ID}`, `${SESSION_ID} `, `sess${cp(0x1b)}[0m1`, `sess${cp(0x202e)}1`, `sess${cp(0x200b)}1`, "x".repeat(300), "sk-ant-api03-qqsecretqq", "inv api_key=qqsecretqq"];
    for (const id of hostile) {
      expect(claudeSessionOwnership({ scope: SCOPE, invocationId: INV, index: 0, sessionId: id, observedAt: INIT_AT }), JSON.stringify(id)).toBeUndefined();
      expect(claudeSessionOwnership({ scope: SCOPE, invocationId: id, index: 0, sessionId: SESSION_ID, observedAt: INIT_AT }), JSON.stringify(id)).toBeUndefined();
    }
    const h = owned();
    for (const id of hostile) h.hooks.onInit(call(0), id);
    // Exact, but no session node of that id was ever observed in scope: withheld as well.
    h.hooks.onInit(call(0), "sess-unobserved");
    expect(h.projection.relations({ scope: SCOPE })).toHaveLength(1);
    expect(h.hooks.diagnostics()).toEqual({ ownershipStated: 1, ownershipWithheld: hostile.length + 1, ownershipRefused: 0 });
    expect(JSON.stringify(h.projection.relations({ scope: SCOPE }))).not.toContain("qqsecretqq");
    const refusing = harness({ projection: new RefusingProjection(), observerNow: () => INIT_AT });
    ingestSession(refusing.projection, SESSION_ID);
    expect(() => refusing.hooks.onInit(call(0), SESSION_ID)).not.toThrow();
    expect(refusing.hooks.diagnostics()).toEqual({ ownershipStated: 0, ownershipWithheld: 0, ownershipRefused: 1 });
    expect(refusing.projection.relations({ scope: SCOPE })).toEqual([]);
  });

  it("U3 idempotent across a resumed init; a new session is a new owner: the same id twice is one edge with the first observedAt, a different exact id is a second edge from the new session key", () => {
    const h = harness({ observerNow: clock(INIT_AT, LATER_AT) });
    ingestSession(h.projection, SESSION_ID);
    h.hooks.onInit(call(0), SESSION_ID);
    h.hooks.onInit(call(0), SESSION_ID);
    const sessionKey = keyOf(SCOPE, sessionRef(SESSION_ID));
    const edges = h.projection.relations({ scope: SCOPE, from: sessionKey });
    expect(edges).toHaveLength(1);
    expect(edges[0]?.provenance.observedAt).toBe(INIT_AT);
    expect(h.projection.relations({ scope: SCOPE })).toHaveLength(1);
    ingestSession(h.projection, "sess-2", 0, INV, 2);
    h.hooks.onInit(call(0), "sess-2");
    expect(h.projection.relations({ scope: SCOPE })).toHaveLength(2);
    expect(h.projection.relations({ scope: SCOPE, from: keyOf(SCOPE, sessionRef("sess-2")) })).toStrictEqual([{
      from: keyOf(SCOPE, sessionRef("sess-2")), to: keyOf(SCOPE, callRef(INV, 0)), kind: "ownership",
      provenance: { source: "claude-agent-sdk", observedAt: LATER_AT, nativeConfirmationRef: "sess-2" },
    }]);
    expect(h.hooks.diagnostics()).toEqual({ ownershipStated: 3, ownershipWithheld: 0, ownershipRefused: 0 });
  });
});

describe("wb-hqa U4-U8: the acknowledged interrupt settles from the observer's terminal, through the retention", () => {
  it("U4 settle table with the landed mapping: every terminal settles the pending execution through the core, records control.result on the session node and in the audit, and a second terminal records nothing", async () => {
    for (const terminal of ["succeeded", "failed", "cancelled", "observation_lost"] as const) {
      const h = owned();
      const reply = await h.run(`call-${terminal}`);
      expect(reply, terminal).toMatchObject({ ok: true, invoked: true, status: "acknowledged" });
      expect(h.outcomes, terminal).toEqual(["pending"]);
      expect(h.interrupt, terminal).toHaveBeenCalledTimes(1);
      expect(phases(h.task), terminal).toEqual(["requested", "acknowledged"]);
      expect(h.retention.size()).toBe(1);
      const freshness = terminal === "observation_lost" ? "unknown" : "current";
      h.hooks.onTerminal(call(0), { provider: "claude-agent-sdk", sessionId: SESSION_ID, freshness, terminal });
      const receipts = h.task.controlAudit?.receipts ?? [];
      expect(receipts.map(receipt => receipt.phase), terminal).toEqual(["requested", "acknowledged", "result"]);
      const result = receipts[2];
      if (result === undefined || result.phase !== "result") throw new Error(`${terminal}: expected a result receipt`);
      expect(new Set(receipts.map(receipt => receipt.requestId)).size).toBe(1);
      expect(result.outcome, terminal).toBe(OUTCOMES[terminal]);
      expect(result.nativeResultRef, terminal).toBe(`claude-agent-sdk:session:${SESSION_ID}:${terminal}@${OBSERVED_AT}`);
      expect(result.nativeAckRef).toBe(ACK_REF);
      expect(result.settledAt).toBe(SETTLED_AT);
      expect(result.acknowledgedAt).toBe(ACKED_AT);
      expect(result.ownershipConfirmationRef).toBe(SESSION_ID);
      // The reply the tool gave is never amended: acknowledged, completion not asserted.
      expect(reply.control?.phase).toBe("acknowledged");
      const events = resultEvents(h.projection);
      expect(events, terminal).toHaveLength(1);
      expect(events[0]?.evidenceRefs).toEqual([`control-receipt:${result.requestId}`, `native-ack:${ACK_REF}`, `native-result:${result.nativeResultRef}`]);
      expect(events[0]?.trace?.invocationId).toBe(INV);
      expect(events[0]?.observedAt).toBe(SETTLED_AT);
      expect(events[0]?.projectionEventId).toBe(`control:${result.requestId}:result`);
      expect(h.projection.query({ scope: SCOPE, ref: sessionRef(SESSION_ID), limit: 1 }).nodes[0]?.freshness).toBe("stale");
      expect(h.retention.size()).toBe(0);
      expect(h.task.logs).toEqual([]);
      h.hooks.onTerminal(call(0), { provider: "claude-agent-sdk", sessionId: SESSION_ID, freshness, terminal });
      expect(phases(h.task), terminal).toHaveLength(3);
      expect(resultEvents(h.projection), terminal).toHaveLength(1);
      expect(h.task.logs).toEqual([]);
    }
  });

  it("U5 never settles what was not acknowledged: an uncertain execution is not retained and a later terminal writes nothing; a frozen shallow copy is refused unvetted-execution with one diagnostic line and no result", async () => {
    const h = owned({ answer: () => { throw new Error("lost"); } });
    const reply = await h.run("call-u5");
    expect(reply).toMatchObject({ ok: true, invoked: true, status: "uncertain" });
    expect(h.outcomes).toEqual(["not-acknowledged"]);
    expect(h.retention.size()).toBe(0);
    h.hooks.onTerminal(call(0), { provider: "claude-agent-sdk", sessionId: SESSION_ID, freshness: "current", terminal: "cancelled" });
    expect(phases(h.task)).toEqual(["requested"]);
    expect(resultEvents(h.projection)).toEqual([]);
    expect(h.task.logs).toEqual([]);
    const copied = owned();
    const genuine = await execution(copied.projection);
    const copy = Object.freeze({ ...genuine });
    expect(copied.retention.retain(copy)).toBe("pending");
    expect(copied.retention.settle(`${INV}:0`, observed("succeeded"), SCOPE)).toEqual({ settled: 0, refused: 1 });
    expect(copied.task.logs).toEqual([`workflow_control ${genuine.requested.requestId}: result not established (unvetted-execution)`]);
    expect(phases(copied.task)).toEqual([]);
    expect(resultEvents(copied.projection)).toEqual([]);
    expect(copied.retention.size()).toBe(0);
    // The genuine execution was never consumed by the refusal of its copy: the core still settles it once.
    expect(copied.retention.retain(genuine)).toBe("settled");
    expect(phases(copied.task)).toEqual(["result"]);
  });

  it("U6 acknowledge/terminal race, both branches: a terminal remembered at T settles a retain acknowledged before T and refuses one acknowledged after T as stale-observation with one diagnostic line; nothing stays pending", async () => {
    const h = owned();
    const key = `${INV}:0`;
    expect(h.retention.settle(key, observed("failed", { observedAt: OBSERVED_AT }), SCOPE)).toEqual({ settled: 0, refused: 0 });
    const earlier = await execution(h.projection, { now: () => "2026-10-17T07:00:04Z", callId: "call-earlier" });
    const later = await execution(h.projection, { now: () => "2026-10-17T07:00:06Z", callId: "call-later" });
    expect(h.retention.retain(earlier)).toBe("settled");
    const minted = resultEvents(h.projection);
    expect(minted).toHaveLength(1);
    expect(minted[0]?.evidenceRefs).toContain(`control-receipt:${earlier.requested.requestId}`);
    expect(minted[0]?.evidenceRefs).toContain(`native-result:claude-agent-sdk:session:${SESSION_ID}:failed@${OBSERVED_AT}`);
    expect(phases(h.task)).toEqual(["result"]);
    expect(h.task.logs).toEqual([]);
    expect(h.retention.retain(later)).toBe("refused");
    expect(h.task.logs).toEqual([`workflow_control ${later.requested.requestId}: result not established (stale-observation)`]);
    expect(resultEvents(h.projection)).toHaveLength(1);
    expect(phases(h.task)).toEqual(["result"]);
    expect(h.retention.size()).toBe(0);
    expect(JSON.stringify(h.task.controlAudit)).not.toContain(later.requested.requestId);
  });

  it("U7 foreign observations: another call index leaves the pending execution alone; another or an absent session id is diagnosed foreign-observation and mints nothing", async () => {
    const h = owned();
    await h.run("call-u7");
    expect(h.outcomes).toEqual(["pending"]);
    h.hooks.onTerminal(call(1), { provider: "claude-agent-sdk", sessionId: SESSION_ID, freshness: "current", terminal: "succeeded" });
    expect(h.retention.size()).toBe(1);
    expect(phases(h.task)).toEqual(["requested", "acknowledged"]);
    expect(h.task.logs).toEqual([]);
    h.hooks.onTerminal(call(0), { provider: "claude-agent-sdk", sessionId: "sess-other", freshness: "current", terminal: "succeeded" });
    expect(h.retention.size()).toBe(0);
    expect(phases(h.task)).toEqual(["requested", "acknowledged"]);
    expect(resultEvents(h.projection)).toEqual([]);
    expect(h.task.logs).toEqual([`workflow_control ${h.executions[0]?.requested.requestId}: result not established (foreign-observation)`]);
    const absent = owned();
    await absent.run("call-u7b");
    absent.hooks.onTerminal(call(0), { provider: "claude-agent-sdk", freshness: "current", terminal: "succeeded" });
    expect(absent.retention.size()).toBe(0);
    expect(phases(absent.task)).toEqual(["requested", "acknowledged"]);
    expect(resultEvents(absent.projection)).toEqual([]);
    expect(absent.task.logs).toEqual([`workflow_control ${absent.executions[0]?.requested.requestId}: result not established (foreign-observation)`]);
  });

  it("U8 bounds and disposal: the 65th pending retain is refused capacity with one line while the first 64 still settle; TTL-expired entries are swept unsettled; remembered terminals cap at 64 FIFO; dispose empties both", async () => {
    expect(MAX_PENDING_CLAUDE_SETTLES).toBe(64);
    expect(MAX_REMEMBERED_CLAUDE_TERMINALS).toBe(64);
    expect(CLAUDE_CONTROL_RETENTION_TTL_MS).toBe(15 * 60_000);
    const h = owned();
    const key = `${INV}:0`;
    const executions: ClaudeControlExecution[] = [];
    for (let n = 0; n <= MAX_PENDING_CLAUDE_SETTLES; n++) executions.push(await execution(h.projection, { callId: `call-cap-${n}` }));
    const outcomes = executions.map(item => h.retention.retain(item, 1_000));
    expect(outcomes.slice(0, MAX_PENDING_CLAUDE_SETTLES).every(outcome => outcome === "pending")).toBe(true);
    expect(outcomes[MAX_PENDING_CLAUDE_SETTLES]).toBe("capacity");
    expect(h.retention.size()).toBe(MAX_PENDING_CLAUDE_SETTLES);
    const overflow = executions[MAX_PENDING_CLAUDE_SETTLES];
    if (overflow === undefined) throw new Error("expected 65 executions");
    expect(h.task.logs).toEqual([`workflow_control ${overflow.requested.requestId}: result not established (capacity)`]);
    expect(h.retention.settle(key, observed("succeeded"), SCOPE, 2_000)).toEqual({ settled: MAX_PENDING_CLAUDE_SETTLES, refused: 0 });
    expect(resultEvents(h.projection)).toHaveLength(MAX_PENDING_CLAUDE_SETTLES);
    expect(JSON.stringify(resultEvents(h.projection))).not.toContain(overflow.requested.requestId);
    expect(h.retention.size()).toBe(0);
    expect(h.task.logs).toHaveLength(1);
    // TTL: an entry retained at t=0 is swept at t=TTL without settling, and nothing is minted for it.
    const expired = owned();
    const stale = await execution(expired.projection, { callId: "call-ttl" });
    expect(expired.retention.retain(stale, 0)).toBe("pending");
    expect(expired.retention.settle(key, observed("succeeded"), SCOPE, CLAUDE_CONTROL_RETENTION_TTL_MS)).toEqual({ settled: 0, refused: 0 });
    expect(expired.retention.size()).toBe(0);
    expect(resultEvents(expired.projection)).toEqual([]);
    expect(phases(expired.task)).toEqual([]);
    // Remembered terminals: 65 keys remembered, the oldest forgotten, so its call's later retain stays pending while the newest settles at once.
    const remembered = owned();
    for (let index = 0; index <= MAX_REMEMBERED_CLAUDE_TERMINALS; index++) {
      remembered.retention.settle(`${INV}:${index}`, observed("succeeded", { index }), SCOPE, 1_000 + index);
    }
    const first = await execution(remembered.projection, { index: 0, callId: "call-first" });
    const last = await execution(remembered.projection, { index: MAX_REMEMBERED_CLAUDE_TERMINALS, callId: "call-last" });
    expect(remembered.retention.retain(first, 2_000)).toBe("pending");
    expect(remembered.retention.retain(last, 2_000)).toBe("settled");
    expect(remembered.retention.size()).toBe(1);
    // Disposal: nothing pending, nothing remembered, and a later terminal records nothing.
    const disposed = owned();
    const parked = await execution(disposed.projection, { callId: "call-disposed" });
    expect(disposed.retention.retain(parked)).toBe("pending");
    disposed.retention.dispose();
    expect(disposed.retention.size()).toBe(0);
    expect(disposed.retention.settle(key, observed("cancelled"), SCOPE)).toEqual({ settled: 0, refused: 0 });
    expect(resultEvents(disposed.projection)).toEqual([]);
    expect(phases(disposed.task)).toEqual([]);
    expect(disposed.task.logs).toEqual([]);
  });
});

describe("wb-hqa U9-U10, C1: purity, the shared recorder and the five src/index.ts insertions", () => {
  it("U9 purity census: the module's imports are exactly the design's set, static only; no any, no dynamic import, no process access, no SDK, host or transcript value import, no new contract literal", () => {
    const source = readFileSync(new URL("../src/workbench/claude-control-observer.ts", import.meta.url), "utf8");
    const modules = (pattern: RegExp): string[] => [...source.matchAll(pattern)].map(match => match[1] ?? "").sort();
    expect(modules(/^import\s+(?!type\s)[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["../workflow/task.js", "./claude-control.js", "./control-tool.js", "./redaction.js"]);
    expect(modules(/^import\s+type\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["../workflow/progress.js", "./claude-host.js", "./observation.js"]);
    expect(source).not.toMatch(/^import\s+["']/m);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(source).not.toMatch(/:\s*any\b|as\s+any\b|<any>/);
    expect(source).not.toMatch(/\bprocess\./);
    expect(source).not.toMatch(/["']@anthropic-ai\/|["']\.\/claude-transcript\.js["']|workbench\.[a-z-]+\/v[0-9]/);
    expect(source).not.toMatch(/\.abort\s*\(|abortAgent|AbortController/);
    // Every display helper call names its layout; the one display line is the label layout, admission the text layout.
    const layouts = [...source.matchAll(/sanitizeWorkbenchText\([^;]*?,\s*"(text|terminal|label|lines)"\)/g)].map(match => match[1]).sort();
    expect(layouts).toEqual(["label", "text"]);
    expect(source.match(/sanitizeWorkbenchText\(/g)).toHaveLength(2);
    // The hooks interface the transcript module accepts is exported from here, type-only on that side.
    const hooks: ClaudeObserverControlHooks = { onInit: () => undefined, onTerminal: () => undefined };
    expect(typeof hooks.onInit).toBe("function");
  });

  it("U10 recorder export: recordControlReceipt is exported over Pick<WorkflowControlDeps, projection | tasks> and records a core-settled result exactly as the in-call path does; the audit is FIFO 64; a target without a node ingests the event and appends to no audit", () => {
    expect(controlTool.recordControlReceipt).toBeTypeOf("function");
    const projection = new ObservationProjection();
    ingestSession(projection, SESSION_ID);
    const relation = claudeSessionOwnership({ scope: SCOPE, invocationId: INV, index: 0, sessionId: SESSION_ID, observedAt: INIT_AT });
    if (relation === undefined) throw new Error("expected a relation");
    projection.relate(relation);
    const task = createWorkflowTask({ id: INV, script: "" });
    const tasks = new Map<string, WorkflowTask>([[INV, task]]);
    const deps: Pick<WorkflowControlDeps, "projection" | "tasks"> = { projection, tasks };
    const requested = permit(projection).receipt;
    const acknowledged = acknowledge(requested, { acknowledgedAt: ACKED_AT, nativeAckRef: ACK_REF });
    const nativeResultRef = `claude-agent-sdk:session:${SESSION_ID}:failed@${OBSERVED_AT}`;
    const result = settle(acknowledged, { outcome: "unknown", nativeResultRef, settledAt: SETTLED_AT });
    controlTool.recordControlReceipt(deps, requested, SCOPE);
    controlTool.recordControlReceipt(deps, acknowledged, SCOPE);
    controlTool.recordControlReceipt(deps, result, SCOPE);
    expect(phases(task)).toEqual(["requested", "acknowledged", "result"]);
    expect(task.controlAudit?.receipts[2]).toBe(result);
    const events = projection.events({ scope: SCOPE, limit: 100, ref: sessionRef(SESSION_ID) }).events;
    expect(events.map(event => event.kind)).toEqual(["claude.stream", "control.requested", "control.acknowledged", "control.result"]);
    const recorded = events[3];
    expect(recorded?.evidenceRefs).toEqual([`control-receipt:${requested.requestId}`, `native-ack:${ACK_REF}`, `native-result:${nativeResultRef}`]);
    expect(recorded?.observedAt).toBe(SETTLED_AT);
    expect(recorded?.trace?.invocationId).toBe(INV);
    expect(recorded?.projectionEventId).toBe(`control:${requested.requestId}:result`);
    expect(events[1]?.observedAt).toBe(NOW);
    expect(events[2]?.observedAt).toBe(ACKED_AT);
    // FIFO: 65 distinct requested receipts on a fresh task leave the newest 64 in its audit.
    const fifo = createWorkflowTask({ id: INV, script: "" });
    const receipts = Array.from({ length: 65 }, (_, n) => permit(projection, { invocationId: `call-fifo-${n}` }).receipt);
    for (const receipt of receipts) controlTool.recordControlReceipt({ projection, tasks: new Map([[INV, fifo]]) }, receipt, SCOPE);
    expect(fifo.controlAudit?.receipts).toHaveLength(64);
    expect(fifo.controlAudit?.receipts[0]).toBe(receipts[1]);
    expect(fifo.controlAudit?.receipts[63]).toBe(receipts[64]);
    expect(phases(task)).toEqual(["requested", "acknowledged", "result"]);
    // A target with no node in the projection it is recorded into: the event lands, no task is found, no audit is appended.
    const elsewhere = new ObservationProjection();
    const other = createWorkflowTask({ id: INV, script: "" });
    controlTool.recordControlReceipt({ projection: elsewhere, tasks: new Map([[INV, other]]) }, requested, SCOPE);
    expect(elsewhere.events({ scope: SCOPE, limit: 10, ref: sessionRef(SESSION_ID) }).events.map(event => event.kind)).toEqual(["control.requested"]);
    expect(elsewhere.query({ scope: SCOPE, ref: sessionRef(SESSION_ID), limit: 1 }).nodes[0]?.invocationId).toBeUndefined();
    expect(other.controlAudit).toBeUndefined();
  });

  it("C1 src/index.ts text census: the retain line sits once between the leg's adapter call and its pinned return, the observer takes the control hooks once, dispose follows workflowTasks.clear(), the tee literal is absent, no transcript or SDK import", () => {
    const index = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
    const lines = index.split("\n").map(line => line.trim());
    const retain = "claudeControlRetention.retain(execution);";
    expect(lines.filter(line => line === retain)).toHaveLength(1);
    const at = lines.indexOf(retain);
    const legStart = lines.lastIndexOf("const execution = await executeClaudeControl(decision, {", at);
    expect(legStart).toBeGreaterThan(0);
    expect(lines[at - 1]).toBe("});");
    expect(lines[at + 1]).toBe("return { receipt: execution.receipt, status: execution.status };");
    expect(lines.slice(legStart, at).filter(line => line.startsWith("return "))).toEqual([]);
    expect(index.match(/createClaudeControlObserver\(\{/g)).toHaveLength(1);
    expect(index).toMatch(/\}, createClaudeControlObserver\(\{ invocationId: task\.id, scope, projection, now: \(\) => new Date\(\)\.toISOString\(\), retention: claudeControlRetention \}\)\);/);
    expect(lines.filter(line => line === "claudeControlRetention.dispose();")).toHaveLength(1);
    expect(lines[lines.indexOf("workflowTasks.clear();") + 1]).toBe("claudeControlRetention.dispose();");
    expect(lines.filter(line => line.startsWith("const claudeControlRetention = createClaudeControlRetention({ projection, tasks: workflowTasks, now: () => new Date().toISOString() });"))).toHaveLength(1);
    expect(lines.indexOf(`const liveClaudeKey = (invocationId: string, call: ClaudeCallIdentity): string => \`\${invocationId}:\${call.index}\`;`)).toBeLessThan(lines.findIndex(line => line.startsWith("const claudeControlRetention = ")));
    expect(index.match(/^import \{ createClaudeControlObserver, createClaudeControlRetention \} from "\.\/workbench\/claude-control-observer\.js";$/m)).toHaveLength(1);
    expect(index).not.toContain("executions.set(execution.requested.requestId, execution);");
    expect(index).not.toMatch(/^import[^;]*["']\.\/workbench\/claude-transcript\.js["']/m);
    expect(index).not.toMatch(/^import[^;]*["']@anthropic-ai\/claude-agent-sdk["']/m);
    expect(index.match(/"No live Claude SDK query is retained in this process for the target session\."/g)).toHaveLength(1);
  });
});
