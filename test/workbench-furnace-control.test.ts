/**
 * wb-69g.3 (W16-D/VC-4): the Furnace native control adapter executes only permitted workbench.control/v1 decisions
 * through the vendored @furnace/sdk control verbs. No live furnace binary, Pi tool or network: the SDK seam is a fake, or
 * the real vendored client whose process transport (Furnace.invoke) is replaced by a spy before anything can spawn.
 */
import { readFileSync } from "node:fs";
import {
  BinaryUnavailableError,
  type CallOptions,
  clientOperations,
  Furnace,
  FurnaceCommandError,
  MalformedOutputError,
  ProcessFailedError,
  RequestTimeoutError,
  UnexpectedResponseKindError,
} from "@furnace/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  type ControlDecision,
  decideControl,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
  type RequestedControlReceipt,
  settle,
} from "../src/workbench/control.js";
import {
  executeFurnaceControl,
  FURNACE_CONTROL_VERBS,
  type FurnaceControlClient,
  type FurnaceControlDeps,
  FurnaceControlRefusal,
  type FurnaceControlRefusalCode,
} from "../src/workbench/furnace-control.js";
import { FurnaceObserver, type FurnaceObserverClient } from "../src/workbench/furnace-observer.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";

const WS = "/tmp/external-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const REQUESTED_AT = "2026-10-15T07:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const SETTLED_AT = "2026-10-15T07:00:03Z";
/** Furnace writes nanosecond, offset-qualified instants. */
const STATE_SINCE = "2026-10-15T07:00:02.719135054+00:00";
const TIMEOUT_MS = 5_000;
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };
/** What an Attempt record names (FRN-ATM-019): the Attempt lifecycle-owns its proven process. */
const PROCESS: NativeRef = { provider: "furnace", type: "process", id: "frn-atm-a1:pid-4242", scope: WS };

interface Edge { from: NativeRef; to: NativeRef; kind: RelationKind; provenance: { source: string; observedAt?: string; nativeConfirmationRef?: string } }

function observe(refs: readonly NativeRef[], edges: readonly Edge[], scope: ObservationScope = SCOPE): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of refs) {
    projection.refresh({ source, scope, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  for (const edge of edges) projection.relate({ scope, ...edge });
  return projection;
}
/** A producer-stated, natively confirmed ownership edge, as FurnaceObserver.projectionTopology states Run -> Attempt. */
const owns = (from: NativeRef, to: NativeRef, nativeConfirmationRef = "frn-req-attempts-1"): Edge =>
  ({ from, to, kind: "ownership", provenance: { source: from.provider, observedAt: AT, nativeConfirmationRef } });
const furnace = (): ObservationProjection => observe([RUN, ATTEMPT, PROCESS], [owns(RUN, ATTEMPT), owns(ATTEMPT, PROCESS, "frn-req-attempt-inspect-1")]);

function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["observe:furnace.run.inspect", "control:furnace.stop"],
    target: { ...RUN }, action: "stop", params: { confirmed: true }, invocationId: "inv-control-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decide = (overrides: Partial<NativeControlRequest> = {}, projection: ObservationProjection = furnace()): ControlDecision =>
  decideControl(request(overrides), { projection, now: () => DECIDED_AT });
function permit(overrides: Partial<NativeControlRequest> = {}, projection?: ObservationProjection): ControlDecision & { decision: "permitted" } {
  const decision = decide(overrides, projection);
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}

const runDto = (id: string, state: string) => ({ run_id: id, beads_run_id: "bd-r1", workspace: WS, state, mode: "ephemeral_wisp", furnace_version: "0.1.0",
  created_at: AT, updated_at: STATE_SINCE, state_since: STATE_SINCE, executor: "runner", max_parallel: 1 });
const attemptDto = (id: string) => ({ attempt_id: id, run_id: RUN.id, work_id: "bd-work-a", ordinal: 1, executor: "runner", state: "running", created_at: AT, started_at: AT });
const SETTLED_STATE: Readonly<Record<string, string>> = { run_pause: "paused", run_stop: "stopped", run_resume: "active" };
/** Furnace's success envelope for one control verb: it echoes the caller's --request-id verbatim (FRN-CLI-041). */
function answerFor(kind: string, id: string, call: CallOptions | undefined): unknown {
  return { protocolVersion: 1, kind, requestId: call?.requestId ?? "frn-req-4242-1", exit: { code: 0, signal: null }, stderr: "",
    data: kind === "attempt_stop" ? attemptDto(id) : runDto(id, SETTLED_STATE[kind]) };
}

/** Every verb the vendored client exposes beside the four control verbs is a spy that must never be called. */
function fakeClient() {
  const answering = (kind: string) => vi.fn(async (id: string, ...rest: unknown[]): Promise<unknown> => answerFor(kind, id, rest.at(-1) as CallOptions | undefined));
  const runs = { pause: answering("run_pause"), stop: answering("run_stop"), resume: answering("run_resume"), start: vi.fn(), adopt: vi.fn(), unlock: vi.fn(),
    status: vi.fn(), inspect: vi.fn(), list: vi.fn() };
  const attempts = { stop: answering("attempt_stop"), clear: vi.fn(), list: vi.fn(), inspect: vi.fn() };
  const work = { retry: vi.fn(), inspect: vi.fn() };
  const spies = [...Object.values(runs), ...Object.values(attempts), ...Object.values(work)];
  return { client: { runs, attempts, work } as unknown as FurnaceControlClient, runs, attempts, work,
    calls: (): number => spies.reduce((total, spy) => total + spy.mock.calls.length, 0) };
}
type Fake = ReturnType<typeof fakeClient>;
function clock(...ticks: string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}
const deps = (fake: { client: FurnaceControlClient }, overrides: Partial<FurnaceControlDeps> = {}): FurnaceControlDeps =>
  ({ client: fake.client, workspaceRoot: WS, now: clock(ACKED_AT, SETTLED_AT), timeoutMs: TIMEOUT_MS, ...overrides });

async function refused(pending: Promise<unknown>, refusal: FurnaceControlRefusalCode, category: string): Promise<FurnaceControlRefusal> {
  let failure: unknown;
  try { await pending; } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(FurnaceControlRefusal);
  expect(failure).toBeInstanceOf(CapabilityError);
  expect(failure).toMatchObject({ refusal, category });
  return failure as FurnaceControlRefusal;
}
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/;

afterEach(() => { vi.restoreAllMocks(); });

describe("intake: only a permitted decision minted by decideControl reaches the SDK seam", () => {
  it("refuses every denied decision with a typed error carrying the core's category and policy, and the seam records zero calls", async () => {
    const cases: [Partial<NativeControlRequest>, ObservationProjection?][] = [
      [{ grants: undefined }],
      [{ grants: ["observe:furnace.run.inspect"] }],
      [{ grants: ["control:furnace.pause"] }],
      [{ grants: ["furnace:stop"] }],
      [{ action: "start", grants: ["control:furnace.start"] }],
      [{ invocationId: "" }],
      [{ target: { ...RUN, id: "frn-run-unseen" } }],
      [{ principal: { id: "intruder" } }],
      [{}, observe([RUN], [])],
      [{ params: {} }],
      [{ params: { confirmed: "true" } }],
    ];
    const fake = fakeClient();
    const policies = new Set<string>();
    for (const [overrides, projection] of cases) {
      const decision = decide(overrides, projection);
      if (decision.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      policies.add(decision.policy);
      const error = await refused(executeFurnaceControl(decision, deps(fake)), "denied-decision", decision.category);
      expect(error.policy).toBe(decision.policy);
      expect(error.message).not.toContain(decision.reason);
    }
    expect([...policies].sort()).toStrictEqual(["cross-scope", "malformed-request", "missing-exact-grant", "no-confirmed-ownership", "observer-only",
      "operator-confirmation", "unknown-action", "unknown-permission-data"]);
    expect(fake.calls()).toBe(0);
  });

  it("refuses a raw request, a look-alike, a phase-advanced or a forged receipt as unvetted, before the seam and without reading accessors", async () => {
    const fake = fakeClient();
    const genuine = permit();
    const { receipt } = genuine;
    const forged = (patch: Record<string, unknown>): unknown => Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt, ...patch }) });
    const getter = vi.fn(() => "permitted");
    const unvetted: unknown[] = [
      request(), { ...request(), decision: "permitted" }, undefined, null, "permitted", 42, [], [genuine], Object.freeze([genuine]),
      { decision: "permitted" }, Object.freeze({ decision: "permitted" }), { ...genuine }, Object.freeze({ decision: "permitted", receipt: { ...receipt } }),
      Object.freeze(Object.defineProperty({ receipt }, "decision", { enumerable: true, get: getter })),
      Object.freeze({ decision: "permitted", receipt: acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: "run_stop:ack" }) }),
      Object.freeze({ decision: "permitted", receipt: settle(acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: "run_stop:ack" }),
        { outcome: "completed", nativeResultRef: "furnace-run:x", settledAt: SETTLED_AT }) }),
      forged({ phase: "acknowledged" }), forged({ contractVersion: "workbench.control/v0" }), forged({ policy: "exact-grant" }),
      // The superseded furnace:<verb> spelling and any grant that is not the canonical control:furnace.<action>.
      forged({ grant: "furnace:stop" }), forged({ grant: "control:furnace.pause" }), forged({ grant: "control:furnace" }),
      // Forging a verb the landed core does not admit cannot widen the executable set, whatever grant it carries.
      forged({ action: "pause", grant: "control:furnace.pause" }), forged({ action: "resume", grant: "control:furnace.resume" }),
      forged({ action: "start", grant: "control:furnace.start" }), forged({ action: "retry", grant: "control:furnace.retry" }),
      forged({ action: "__proto__", grant: "control:furnace.__proto__" }),
      forged({ target: Object.freeze({ ...receipt.target, provider: "hyperunix" }), grant: "control:hyperunix.stop" }),
      // An inherited name never resolves a provider's allowlist.
      forged({ target: Object.freeze({ ...receipt.target, provider: "toString" }), grant: "control:toString.stop" }),
      forged({ target: Object.freeze({ ...receipt.target, provider: "polluted" }), grant: "control:polluted.stop" }),
      forged({ target: { ...receipt.target } }), forged({ scope: { ...receipt.scope } }), forged({ principal: { ...receipt.principal } }),
      forged({ requestId: "ctl_short" }), forged({ requestId: "--force" }), forged({ requestId: undefined }),
    ];
    const proto = Object.prototype as Record<string, unknown>;
    try {
      // A polluted Object.prototype cannot manufacture a provider the core admits a verb for.
      proto.polluted = ["stop"];
      for (const value of unvetted) {
        const error = await refused(executeFurnaceControl(value as ControlDecision, deps(fake)), "unvetted-decision", "validation");
        expect(error.message).not.toMatch(UNSAFE);
      }
    } finally { Reflect.deleteProperty(proto, "polluted"); }
    expect(Object.hasOwn(Object.prototype, "polluted")).toBe(false);
    expect(getter).not.toHaveBeenCalled();
    expect(fake.calls()).toBe(0);
    // No refusal above touched the genuine permit, which still executes exactly once.
    await expect(executeFurnaceControl(genuine, deps(fake))).resolves.toMatchObject({ status: "settled" });
    expect(fake.calls()).toBe(1);
  });

  it("executes a permit once: re-executing it or re-wrapping its receipt is refused, also when submitted concurrently", async () => {
    const fake = fakeClient();
    const decision = permit();
    await executeFurnaceControl(decision, deps(fake));
    await refused(executeFurnaceControl(decision, deps(fake)), "permit-consumed", "validation");
    await refused(executeFurnaceControl(Object.freeze({ decision: "permitted", receipt: decision.receipt }), deps(fake)), "permit-consumed", "validation");
    expect(fake.runs.stop).toHaveBeenCalledTimes(1);
    const twice = permit();
    const settled = await Promise.allSettled([executeFurnaceControl(twice, deps(fake)), executeFurnaceControl(twice, deps(fake))]);
    expect(settled.map(outcome => outcome.status)).toStrictEqual(["fulfilled", "rejected"]);
    expect(settled[1]).toMatchObject({ reason: { refusal: "permit-consumed" } });
    expect(fake.runs.stop).toHaveBeenCalledTimes(2);
    expect(fake.calls()).toBe(2);
  });

  it("a refusal before issuing never spends the permit; a permit spent on an uncertain outcome stays spent", async () => {
    const fake = fakeClient();
    const decision = permit();
    await refused(executeFurnaceControl(decision, deps(fake, { timeoutMs: 0 })), "invalid-deps", "validation");
    await refused(executeFurnaceControl(decision, deps(fake, { workspaceRoot: "/tmp/other-ws" })), "foreign-workspace", "authorization");
    const cancelled = new AbortController();
    cancelled.abort();
    await refused(executeFurnaceControl(decision, deps(fake, { signal: cancelled.signal })), "aborted-before-issue", "transport");
    expect(fake.calls()).toBe(0);
    fake.runs.stop.mockRejectedValueOnce(new Error("lost"));
    await expect(executeFurnaceControl(decision, deps(fake))).resolves.toMatchObject({ status: "uncertain" });
    await refused(executeFurnaceControl(decision, deps(fake)), "permit-consumed", "validation");
    expect(fake.calls()).toBe(1);
  });
});

describe("closed verb allowlist pinned to the vendored @furnace/sdk argv contract", () => {
  it("is exactly run pause/stop/resume and attempt stop, each a verbatim vendored clientOperations row, deep-frozen", () => {
    const rows = Object.entries(FURNACE_CONTROL_VERBS).flatMap(([type, verbs]) => Object.entries(verbs).map(([action, verb]) => ({ type, action, verb })));
    expect(rows.map(({ type, action, verb }) => `${type}.${action} -> ${verb.command}`))
      .toStrictEqual(["run.pause -> run pause", "run.stop -> run stop", "run.resume -> run resume", "attempt.stop -> attempt stop"]);
    for (const { verb } of rows) {
      expect(clientOperations).toContainEqual({ command: verb.command, builder: verb.builder, operation: verb.operation, kind: verb.kind });
    }
    expect(rows.map(({ verb }) => [verb.operation, verb.kind, verb.echoes, verb.settles])).toStrictEqual([
      ["Runs.pause", "run_pause", "run_id", "paused"], ["Runs.stop", "run_stop", "run_id", "stopped"], ["Runs.resume", "run_resume", "run_id", "active"],
      // attempt stop delivers one graceful signal; the ending is the child's, so its answer never settles a result.
      ["Attempts.stop", "attempt_stop", "attempt_id", undefined],
    ]);
    expect(Object.isFrozen(FURNACE_CONTROL_VERBS)).toBe(true);
    for (const { verb } of rows) expect(Object.isFrozen(verb)).toBe(true);
    for (const verbs of Object.values(FURNACE_CONTROL_VERBS)) expect(Object.isFrozen(verbs)).toBe(true);
    expect(() => { (FURNACE_CONTROL_VERBS as Record<string, unknown>).work = {}; }).toThrow(TypeError);
    expect(() => { (FURNACE_CONTROL_VERBS.run as Record<string, unknown>).start = FURNACE_CONTROL_VERBS.run.stop; }).toThrow(TypeError);
    // Every other vendored operation, including Run establishment, adoption, retry, unlock and clear, is unreachable.
    const forwarded = new Set<string>(rows.map(({ verb }) => verb.command));
    expect(clientOperations.filter(operation => forwarded.has(operation.command)).map(operation => operation.command).sort())
      .toStrictEqual(["attempt stop", "run pause", "run resume", "run stop"]);
    for (const command of ["run start", "run adopt", "work retry", "run unlock", "attempt clear", "logs --follow"]) expect(forwarded.has(command)).toBe(false);
  });

  it("drives the real vendored client: one transport call with the measured argv and the receipt's request id, never --continue or --force", async () => {
    const furnaceClient = new Furnace({ binary: "/nonexistent/furnace-never-spawned", cwd: WS, timeoutMs: TIMEOUT_MS });
    const invoke = vi.spyOn(furnaceClient, "invoke").mockImplementation(async (kind: string, args: string[], call?: CallOptions) =>
      answerFor(kind, args.at(-2) ?? "", call) as never);
    const run = permit();
    const stopped = await executeFurnaceControl(run, { client: furnaceClient, workspaceRoot: WS, now: clock(ACKED_AT, SETTLED_AT), timeoutMs: TIMEOUT_MS });
    const runCall = { requestId: run.receipt.requestId, timeoutMs: TIMEOUT_MS };
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(invoke).toHaveBeenCalledWith("run_stop", ["-C", WS, "--request-id", run.receipt.requestId, "run", "stop", RUN.id, "--json"], runCall);
    expect(stopped).toMatchObject({ verb: "run stop", status: "settled", result: { outcome: "completed" } });
    const attempt = permit({ target: { ...ATTEMPT } });
    const signalled = await executeFurnaceControl(attempt, { client: furnaceClient, workspaceRoot: WS, now: clock(ACKED_AT), timeoutMs: TIMEOUT_MS });
    expect(invoke).toHaveBeenCalledTimes(2);
    expect(invoke).toHaveBeenLastCalledWith("attempt_stop", ["-C", WS, "--request-id", attempt.receipt.requestId, "attempt", "stop", ATTEMPT.id, "--json"],
      { requestId: attempt.receipt.requestId, timeoutMs: TIMEOUT_MS });
    expect(signalled).toMatchObject({ verb: "attempt stop", status: "acknowledged" });
    for (const [, args] of invoke.mock.calls) for (const flag of ["--continue", "--watch", "--force", "--yes"]) expect(args).not.toContain(flag);
  });

  it("executes exactly the table verbs the landed core admits; a table verb the core does not admit is denied before the seam", async () => {
    const expected: Record<string, (fake: Fake) => [ReturnType<typeof vi.fn>, unknown[]]> = {
      "run pause": fake => [fake.runs.pause, [RUN.id]],
      "run stop": fake => [fake.runs.stop, [RUN.id]],
      "run resume": fake => [fake.runs.resume, [RUN.id, { continue: false }]],
      "attempt stop": fake => [fake.attempts.stop, [ATTEMPT.id]],
    };
    let executed = 0;
    for (const [type, verbs] of Object.entries(FURNACE_CONTROL_VERBS)) {
      for (const [action, verb] of Object.entries(verbs)) {
        const fake = fakeClient();
        const decision = decide({ target: { ...(type === "run" ? RUN : ATTEMPT) }, action, grants: [`control:furnace.${action}`] });
        if (NATIVE_CONTROL_ACTIONS.furnace.includes(action)) {
          if (decision.decision !== "permitted") throw new Error(`the core admits ${action} but denied it: ${JSON.stringify(decision)}`);
          const execution = await executeFurnaceControl(decision, deps(fake));
          const [method, args] = expected[verb.command](fake);
          expect(execution.verb).toBe(verb.command);
          expect(method).toHaveBeenCalledTimes(1);
          expect(method).toHaveBeenCalledWith(...args, { requestId: decision.receipt.requestId, timeoutMs: TIMEOUT_MS });
          expect(fake.calls()).toBe(1);
          executed++;
        } else {
          expect(decision).toMatchObject({ decision: "denied", policy: "unknown-action" });
          await refused(executeFurnaceControl(decision, deps(fake)), "denied-decision", "validation");
          expect(fake.calls()).toBe(0);
        }
      }
    }
    // The landed core admits only stop today: run stop and attempt stop execute; run pause and run resume stay core-gated.
    expect(executed).toBe(2);
    expect([...NATIVE_CONTROL_ACTIONS.furnace]).toStrictEqual(["stop"]);
  });

  it("never forwards a guessed or unlisted verb, for any principal or target", async () => {
    const fake = fakeClient();
    const guesses = ["start", "retry", "adopt", "unlock", "clear", "kill", "terminate", "cancel", "interrupt", "STOP", "Stop", "__proto__", "constructor",
      "toString", "pause", "resume"];
    for (const action of guesses) {
      for (const target of [RUN, ATTEMPT]) {
        for (const grants of [[`control:furnace.${action.toLowerCase()}`], ["observe:furnace.run.inspect"], ["control:furnace.stop"]]) {
          const decision = decide({ target: { ...target }, action, grants });
          expect(decision.decision).toBe("denied");
          await refused(executeFurnaceControl(decision, deps(fake)), "denied-decision", decision.decision === "denied" ? decision.category : "");
        }
      }
    }
    expect(fake.calls()).toBe(0);
  });

  it("refuses a permitted decision for which no measured Furnace verb exists, even under a polluted Object.prototype", async () => {
    const fake = fakeClient();
    const work: NativeRef = { provider: "furnace", type: "work", id: "bd-work-a", scope: WS };
    const child: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-w1", scope: WS };
    const decision = permit({ target: { ...work } }, observe([work, child], [owns(work, child, "frn-req-work-inspect-1")]));
    await refused(executeFurnaceControl(decision, deps(fake)), "unsupported-verb", "validation");
    const proto = Object.prototype as Record<string, unknown>;
    try {
      proto.work = FURNACE_CONTROL_VERBS.run;
      await refused(executeFurnaceControl(decision, deps(fake)), "unsupported-verb", "validation");
    } finally { Reflect.deleteProperty(proto, "work"); }
    expect(Object.hasOwn(Object.prototype, "work")).toBe(false);
    // A genuine permit for another provider is not Furnace's to execute.
    const operation: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
    const step: NativeRef = { provider: "forge", type: "step", id: "op-1:lint" };
    const forge = permit({ grants: ["control:forge.cancel"], target: operation, action: "cancel" }, observe([operation, step], [owns(operation, step, "forge-op-1")]));
    await refused(executeFurnaceControl(forge, deps(fake)), "unsupported-verb", "validation");
    expect(fake.calls()).toBe(0);
  });

  it("refuses a flag-shaped or non-native target id, and a target outside the workspace the client is bound to", async () => {
    const fake = fakeClient();
    for (const id of ["--state-dir=/tmp/elsewhere", "-C", "frn run r1", "frn-run-r1/../r2", "x".repeat(129)]) {
      const target: NativeRef = { ...RUN, id };
      const decision = permit({ target }, observe([target, ATTEMPT], [owns(target, ATTEMPT)]));
      await refused(executeFurnaceControl(decision, deps(fake)), "invalid-target", "validation");
    }
    await refused(executeFurnaceControl(permit(), deps(fake, { workspaceRoot: "/tmp/other-ws" })), "foreign-workspace", "authorization");
    const unscoped: NativeRef = { provider: "furnace", type: "run", id: RUN.id };
    const decision = permit({ target: unscoped }, observe([unscoped, ATTEMPT], [owns(unscoped, ATTEMPT)]));
    await refused(executeFurnaceControl(decision, deps(fake)), "foreign-workspace", "authorization");
    const elsewhere: ObservationScope = { workspace: "/tmp/other-ws", principal: SCOPE.principal };
    const foreign: NativeRef = { ...RUN, scope: elsewhere.workspace };
    const foreignAttempt: NativeRef = { ...ATTEMPT, scope: elsewhere.workspace };
    const remote = permit({ scope: { ...elsewhere }, target: foreign }, observe([foreign, foreignAttempt], [owns(foreign, foreignAttempt)], elsewhere));
    await refused(executeFurnaceControl(remote, deps(fake)), "foreign-workspace", "authorization");
    // A Run scoped to the client's workspace but observed for a principal the host bound to another workspace.
    const crossBound = permit({ scope: { ...elsewhere } }, observe([RUN, ATTEMPT], [owns(RUN, ATTEMPT)], elsewhere));
    expect(crossBound.receipt.target.scope).toBe(WS);
    await refused(executeFurnaceControl(crossBound, deps(fake)), "foreign-workspace", "authorization");
    expect(fake.calls()).toBe(0);
  });
});

describe("phases requested -> acknowledged -> result with native echo; transport success is never domain verification", () => {
  it("run stop: the verb's own envelope acknowledges and the Run record echoing stopped settles, minted by the core's acknowledge/settle", async () => {
    const fake = fakeClient();
    const decision = permit();
    const requested: RequestedControlReceipt = decision.receipt;
    const execution = await executeFurnaceControl(decision, deps(fake));
    expect(fake.runs.stop).toHaveBeenCalledTimes(1);
    expect(fake.runs.stop).toHaveBeenCalledWith(RUN.id, { requestId: requested.requestId, timeoutMs: TIMEOUT_MS });
    const nativeAckRef = `run_stop:${requested.requestId}`;
    const nativeResultRef = `furnace-run:${RUN.id}:stopped@${STATE_SINCE}`;
    const acknowledged = acknowledge(requested, { acknowledgedAt: ACKED_AT, nativeAckRef });
    const result = settle(acknowledged, { outcome: "completed", nativeResultRef, settledAt: SETTLED_AT });
    expect(execution).toStrictEqual({ verb: "run stop", status: "settled", requested, acknowledged, result, receipt: result,
      echo: { kind: "run_stop", requestId: requested.requestId, id: RUN.id, state: "stopped" } });
    expect(execution.requested).toBe(requested);
    expect(execution.receipt).toBe(execution.result);
    expect([execution.requested.phase, execution.acknowledged?.phase, execution.result?.phase]).toStrictEqual(["requested", "acknowledged", "result"]);
    for (const value of [execution, execution.echo, execution.acknowledged, execution.result]) expect(Object.isFrozen(value)).toBe(true);
    expect(execution).not.toHaveProperty("uncertainty");
  });

  it("attempt stop: Furnace delivered one graceful signal, so the receipt stays acknowledged and never claims the Attempt ended", async () => {
    const fake = fakeClient();
    const decision = permit({ target: { ...ATTEMPT } });
    const execution = await executeFurnaceControl(decision, deps(fake));
    expect(fake.attempts.stop).toHaveBeenCalledTimes(1);
    expect(fake.attempts.stop).toHaveBeenCalledWith(ATTEMPT.id, { requestId: decision.receipt.requestId, timeoutMs: TIMEOUT_MS });
    const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: `attempt_stop:${decision.receipt.requestId}` });
    expect(execution).toStrictEqual({ verb: "attempt stop", status: "acknowledged", requested: decision.receipt, acknowledged, receipt: acknowledged,
      echo: { kind: "attempt_stop", requestId: decision.receipt.requestId, id: ATTEMPT.id, state: "running" } });
    expect(execution).not.toHaveProperty("result");
    // Even an answer that already reads terminal is the record before the ending, never the Attempt's outcome.
    fake.attempts.stop.mockImplementationOnce(async (id: string, ...rest: unknown[]) =>
      ({ ...(answerFor("attempt_stop", id, rest.at(-1) as CallOptions | undefined) as object), data: { ...attemptDto(id), state: "cancelled", outcome: "cancelled" } }));
    await expect(executeFurnaceControl(permit({ target: { ...ATTEMPT } }), deps(fake))).resolves.toMatchObject({ status: "acknowledged", receipt: { phase: "acknowledged" } });
    expect(fake.calls()).toBe(2);
  });

  it("parks an answer that is transport success without the native echo: never acknowledged without the request echo, never settled without the terminal echo", async () => {
    const rid = (decision: ControlDecision & { decision: "permitted" }) => decision.receipt.requestId;
    const envelope = (requestId: string, patch: Record<string, unknown> = {}, data: Record<string, unknown> = {}): unknown =>
      ({ protocolVersion: 1, kind: "run_stop", requestId, exit: { code: 0, signal: null }, stderr: "", data: { ...runDto(RUN.id, "stopped"), ...data }, ...patch });
    const cases: [(requestId: string) => unknown, string, "requested" | "acknowledged"][] = [
      [() => undefined, "unattributable-answer", "requested"],
      [() => null, "unattributable-answer", "requested"],
      [() => ({}), "unattributable-answer", "requested"],
      [() => "stopped", "unattributable-answer", "requested"],
      [() => ({ exit: { code: 0, signal: null } }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { kind: "run_status" }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { kind: "run_pause" }), "unattributable-answer", "requested"],
      [() => envelope("frn-req-4242-1"), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { requestId: undefined }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { data: null }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { data: [runDto(RUN.id, "stopped")] }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, { data: "stopped" }), "unattributable-answer", "requested"],
      [requestId => envelope(requestId, {}, { run_id: "frn-run-other" }), "no-target-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { run_id: undefined }), "no-target-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state: "active" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state: "paused" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state: "STOPPED" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state: undefined }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state_since: undefined }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state_since: "2026-10-15T07:00:02" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state_since: "later" }), "no-terminal-echo", "acknowledged"],
      // Date.parse accepts these, but they are not Furnace's RFC 3339 instants, so they never reach a native result reference.
      [requestId => envelope(requestId, {}, { state_since: "api_key=TOPSECRET 2026-10-15 07:00:02+00:00" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state_since: "Thu, 15 Oct 2026 07:00:02 GMT+00:00" }), "no-terminal-echo", "acknowledged"],
      [requestId => envelope(requestId, {}, { state_since: "2026-13-45T07:00:02Z" }), "no-terminal-echo", "acknowledged"],
    ];
    for (const [answer, reason, phase] of cases) {
      const fake = fakeClient();
      const decision = permit();
      fake.runs.stop.mockResolvedValueOnce(answer(rid(decision)));
      const execution = await executeFurnaceControl(decision, deps(fake));
      expect(execution).toMatchObject({ verb: "run stop", status: "uncertain", uncertainty: { reason }, receipt: { phase } });
      expect(execution).not.toHaveProperty("result");
      expect(execution.requested).toBe(decision.receipt);
      if (phase === "requested") expect(execution).not.toHaveProperty("acknowledged");
      else expect(execution.receipt).toBe(execution.acknowledged);
      expect(JSON.stringify(execution)).not.toContain("TOPSECRET");
      expect(fake.calls()).toBe(1);
    }
  });

  it("parks rather than throws when the core refuses to mint a later phase after the verb was issued", async () => {
    for (const now of [clock("soon"), clock(ACKED_AT, "2026-10-15T07:00:03"), () => { throw new Error("clock gone"); }]) {
      const fake = fakeClient();
      const execution = await executeFurnaceControl(permit(), deps(fake, { now }));
      expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "receipt-refused" } });
      expect(execution).not.toHaveProperty("result");
      expect(fake.calls()).toBe(1);
    }
    const fake = fakeClient();
    const late = await executeFurnaceControl(permit(), deps(fake, { now: clock(ACKED_AT, "2026-10-15T07:00:03") }));
    expect(late.receipt).toBe(late.acknowledged);
    expect(late.acknowledged).toMatchObject({ acknowledgedAt: ACKED_AT });
  });
});

describe("park, never retry: failure, timeout and indeterminate outcomes stay uncertain after exactly one native call", () => {
  it("parks every seam failure with a bounded native label and never echoes a native message, stdout or stderr", async () => {
    const exit = { code: 1, signal: null };
    const fields = { message: "a Run in stopped may not become stopped Bearer TOPSECRET", hint: null, details: { token: "TOPSECRET" }, responseKind: "run_stop",
      requestId: "frn-req-1-1", protocolVersion: 1, exit, stderr: "Bearer TOPSECRET" };
    const failures: [unknown, Record<string, string>][] = [
      [new FurnaceCommandError({ ...fields, code: "invalid_state_transition", retryable: false }), { kind: "command_error", code: "invalid_state_transition" }],
      [new FurnaceCommandError({ ...fields, code: "run_locked", retryable: true }), { kind: "command_error", code: "run_locked" }],
      [new FurnaceCommandError({ ...fields, code: "timeout", retryable: true }), { kind: "command_error", code: "timeout" }],
      [new RequestTimeoutError({ timeoutMs: TIMEOUT_MS, pid: 4242, exit: { code: null, signal: "SIGKILL" }, stdout: "TOPSECRET", stderr: "" }), { kind: "request_timeout" }],
      [new ProcessFailedError({ exit, stdout: "Bearer TOPSECRET", stderr: "TOPSECRET" }), { kind: "process_failed" }],
      [new MalformedOutputError({ detail: "TOPSECRET", stdout: "TOPSECRET", stderr: "", exit }), { kind: "malformed_output" }],
      [new UnexpectedResponseKindError({ expected: "run_stop", observed: "run_status", requestId: "frn-req-1-1", exit }), { kind: "unexpected_response_kind" }],
      [new BinaryUnavailableError("/opt/TOPSECRET/furnace", "ENOENT"), { kind: "binary_unavailable" }],
      [new Error("Bearer TOPSECRET"), { kind: "unknown" }],
      [new CapabilityError("transport", "TOPSECRET"), { kind: "unknown" }],
      ["TOPSECRET", { kind: "unknown" }],
      [undefined, { kind: "unknown" }],
      [Object.assign(new Error("TOPSECRET"), { kind: "command_error", code: "Bearer TOPSECRET" }), { kind: "command_error" }],
      [Object.assign(new Error("TOPSECRET"), { kind: "command\u001b[31m_error", code: "timeout" }), { kind: "unknown" }],
      [Object.assign(new Error("TOPSECRET"), { kind: "request_timeout", code: "timeout" }), { kind: "request_timeout" }],
    ];
    for (const [error, failure] of failures) {
      const fake = fakeClient();
      const decision = permit();
      fake.runs.stop.mockRejectedValueOnce(error);
      const execution = await executeFurnaceControl(decision, deps(fake));
      expect(execution).toStrictEqual({ verb: "run stop", status: "uncertain", requested: decision.receipt, receipt: decision.receipt,
        uncertainty: { reason: "seam-failure", failure } });
      expect(JSON.stringify(execution)).not.toContain("TOPSECRET");
      expect(Object.isFrozen(execution.uncertainty)).toBe(true);
      expect(fake.calls()).toBe(1);
    }
  });

  it("parks a synchronous seam throw as a seam failure after one call", async () => {
    const fake = fakeClient();
    fake.runs.stop.mockImplementationOnce(() => { throw new TypeError("TOPSECRET"); });
    const execution = await executeFurnaceControl(permit(), deps(fake));
    expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "seam-failure", failure: { kind: "unknown" } } });
    expect(fake.calls()).toBe(1);
  });

  it("stops waiting at the bound, discards the late answer and never re-issues the verb", async () => {
    const fake = fakeClient();
    let release: (value: unknown) => void = () => {};
    fake.runs.stop.mockImplementationOnce(() => new Promise(resolve => { release = resolve; }));
    const decision = permit();
    const started = Date.now();
    const execution = await executeFurnaceControl(decision, deps(fake, { timeoutMs: 25 }));
    expect(Date.now() - started).toBeLessThan(2_000);
    expect(execution).toStrictEqual({ verb: "run stop", status: "uncertain", requested: decision.receipt, receipt: decision.receipt,
      uncertainty: { reason: "wait-timeout" } });
    release(answerFor("run_stop", RUN.id, { requestId: decision.receipt.requestId }));
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(execution.status).toBe("uncertain");
    expect(fake.calls()).toBe(1);
  });

  it("an abort after the verb is issued stops only the wait, also when the seam aborts synchronously", async () => {
    for (const abortSynchronously of [false, true]) {
      const fake = fakeClient();
      const controller = new AbortController();
      fake.runs.stop.mockImplementationOnce(() => {
        if (abortSynchronously) controller.abort();
        else queueMicrotask(() => controller.abort());
        return new Promise(() => {});
      });
      const started = Date.now();
      const execution = await executeFurnaceControl(permit(), deps(fake, { signal: controller.signal }));
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS);
      expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "wait-aborted" }, receipt: { phase: "requested" } });
      expect(fake.calls()).toBe(1);
    }
  });

  it("refuses invalid dependencies before the seam", async () => {
    const fake = fakeClient();
    const missingMethod = { runs: { pause: vi.fn(), stop: vi.fn(), resume: vi.fn() }, attempts: {} } as unknown as FurnaceControlClient;
    const invalid: Partial<FurnaceControlDeps>[] = [{ timeoutMs: 0 }, { timeoutMs: -1 }, { timeoutMs: 1.5 }, { timeoutMs: Number.NaN }, { timeoutMs: 2 ** 31 },
      { timeoutMs: "5000" as unknown as number }, { workspaceRoot: "" }, { now: "now" as unknown as () => string }, { client: missingMethod },
      { client: undefined as unknown as FurnaceControlClient }, { signal: { aborted: false } as unknown as AbortSignal }];
    for (const overrides of invalid) await refused(executeFurnaceControl(permit(), deps(fake, overrides)), "invalid-deps", "validation");
    await refused(executeFurnaceControl(permit(), undefined as unknown as FurnaceControlDeps), "invalid-deps", "validation");
    expect(fake.calls()).toBe(0);
    expect(missingMethod.runs.stop).not.toHaveBeenCalled();
  });
});

describe("observer stays zero-control; the adapter is the only control path", () => {
  it("closing the observer of a shared client performs zero control calls, and only a permitted decision then reaches one verb", async () => {
    const control = fakeClient();
    const exit = { code: 0, signal: null };
    const status = vi.fn(async () => ({ kind: "run_status", requestId: "frn-req-status-1", exit, stderr: "", data: { ...runDto(RUN.id, "active"), active: [], failed: [],
      failed_total: 0, attention: [], unreadable: [], corrupt_events: [], corrupt_events_total: 0, conflicts: [], completed: 0, total: 1 } }));
    const list = vi.fn(async () => ({ kind: "attempt_list", requestId: "frn-req-attempts-1", exit, stderr: "", data: { run_id: RUN.id, beads_run_id: "bd-r1",
      complete: true, limit: 5, returned: 1, next_cursor: null, attempts: [attemptDto(ATTEMPT.id)], unreadable: [] } }));
    const read = vi.fn(async () => ({ kind: "logs_read", requestId: "frn-req-logs-1", exit, stderr: "", data: { run_id: RUN.id, attempt_id: ATTEMPT.id,
      stream: "stdout", complete: true, limit: 512, returned: 0, next_cursor: null, lossy: false, lines: [] } }));
    // One client object carries the observer's reads and the control verbs, as the vendored Furnace client does.
    const shared = { ...control.client, runs: { ...control.client.runs, get: vi.fn(() => ({ status })) }, attempts: { ...control.client.attempts, list }, logs: { read } };
    const observer = new FurnaceObserver(shared as unknown as FurnaceObserverClient, { workspaceRoot: WS, runId: RUN.id, scope: { ...SCOPE },
      limits: { maxPolls: 2, intervalMs: 1, maxElapsedMs: 2_000, attemptLimit: 5, logBytes: 512, callTimeoutMs: 1_000 } });
    const reading = await observer.snapshot();
    const readings: unknown[] = [];
    for await (const next of observer.observe()) readings.push(next);
    observer.close();
    expect(readings.length).toBeGreaterThan(0);
    expect(status).toHaveBeenCalled();
    expect(control.calls()).toBe(0);
    // The observer's native-confirmed topology feeds the decision core; an observer-only principal still cannot control.
    const projection = new ObservationProjection();
    const topology = observer.projectionTopology(reading);
    for (const snapshot of topology.snapshots) projection.refresh(snapshot);
    for (const relation of topology.relations) projection.relate(relation);
    const client = shared as unknown as FurnaceControlClient;
    for (const action of ["stop", "pause", "resume", "kill"]) {
      const observerOnly = decideControl(request({ grants: ["observe:furnace.run.inspect"], action }), { projection, now: () => DECIDED_AT });
      await refused(executeFurnaceControl(observerOnly, deps({ client })), "denied-decision", "authorization");
    }
    expect(control.calls()).toBe(0);
    const decision = decideControl(request(), { projection, now: () => DECIDED_AT });
    expect(decision).toMatchObject({ decision: "permitted", receipt: { ownershipConfirmationRef: "frn-req-attempts-1" } });
    await expect(executeFurnaceControl(decision, deps({ client }))).resolves.toMatchObject({ status: "settled" });
    expect(control.runs.stop).toHaveBeenCalledTimes(1);
    expect(control.calls()).toBe(1);
  });

  it("is separate from observation by construction: no observer, runtime SDK, hashing or dynamic import in the adapter, no control verb in the observer", () => {
    const source = readFileSync(new URL("../src/workbench/furnace-control.ts", import.meta.url), "utf8");
    const modules = (pattern: RegExp): string[] => [...source.matchAll(pattern)].map(match => match[1]).sort();
    expect(modules(/^import\s+(?!type\s)[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["./capability-registry.js", "./control.js", "./redaction.js"]);
    expect(modules(/^import\s+type\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["@furnace/sdk"]);
    expect(source).not.toMatch(/^import\s+["']/m);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(|createHash|node:crypto|furnace-observer|decideControl\(/);
    const observerSource = readFileSync(new URL("../src/workbench/furnace-observer.ts", import.meta.url), "utf8");
    expect(observerSource).not.toMatch(/furnace-control|\.(?:pause|stop|resume)\s*\(/);
  });
});

describe("sanitizer routing and the core's retry-stable request id", () => {
  it("routes every echoed native label through the shared sanitizers", async () => {
    const hostile = "stopped\u001b[31m\u202e Bearer TOPSECRET\u0007";
    const fake = fakeClient();
    fake.runs.stop.mockImplementationOnce(async (id: string, ...rest: unknown[]) =>
      ({ ...(answerFor("run_stop", id, rest.at(-1) as CallOptions | undefined) as object), data: { ...runDto(id, hostile) } }));
    const terminal = await executeFurnaceControl(permit(), deps(fake));
    expect(terminal).toMatchObject({ status: "uncertain", uncertainty: { reason: "no-terminal-echo" }, echo: { state: "stopped [REDACTED]" } });
    fake.runs.stop.mockImplementationOnce(async () => ({ kind: "run_stop\u001b]0;pwned\u0007", requestId: "Bearer TOPSECRET\u202e",
      data: { run_id: "frn-run-r1\u2066", state: "api_key=TOPSECRET" } }));
    const unattributable = await executeFurnaceControl(permit(), deps(fake));
    expect(unattributable).toMatchObject({ status: "uncertain", uncertainty: { reason: "unattributable-answer" },
      echo: { kind: "run_stop", requestId: "[REDACTED]", id: "frn-run-r1", state: "api_key=[REDACTED]" } });
    for (const execution of [terminal, unattributable]) {
      const text = JSON.stringify(execution);
      expect(text).not.toContain("TOPSECRET");
      expect(text).not.toMatch(/\\u00(?:1b|07)|\\u202e|\\u2066/i);
      for (const value of Object.values(execution.echo ?? {})) expect(value).not.toMatch(UNSAFE);
    }
    expect(fake.calls()).toBe(2);
  });

  it("carries the core's request id to Furnace unchanged: stable across a reissue of one invocation, distinct per invocation, never recomputed", async () => {
    const fake = fakeClient();
    const first = permit();
    const reissue = permit({ requestedAt: "2026-10-15T09:05:00+02:00" });
    const other = permit({ invocationId: "inv-control-2" });
    expect(reissue.receipt.requestId).toBe(first.receipt.requestId);
    expect(other.receipt.requestId).not.toBe(first.receipt.requestId);
    for (const decision of [first, reissue, other]) {
      const execution = await executeFurnaceControl(decision, deps(fake));
      for (const phase of [execution.requested, execution.acknowledged, execution.result]) expect(phase?.requestId).toBe(decision.receipt.requestId);
      expect(execution.echo?.requestId).toBe(decision.receipt.requestId);
    }
    expect(fake.runs.stop.mock.calls.map(call => (call.at(-1) as CallOptions).requestId))
      .toStrictEqual([first.receipt.requestId, first.receipt.requestId, other.receipt.requestId]);
  });
});
