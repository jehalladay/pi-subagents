/**
 * wb-0kg.6 (W16-J/VC-7): the local-detached control adapter executes only permitted workbench.control/v1 decisions
 * through the injected connectDetachedWorkflow cancel/shutdown verbs. No socket, process, TTY or network: the client
 * is a fake, and the projection is seeded by hand with the W13-G reader convention (wb-0kg.5).
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  CONTROL_CONTRACT_VERSION,
  type ControlDenyPolicy,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import {
  DETACHED_CONTROL_RECONCILE,
  DETACHED_CONTROL_VERBS,
  type DetachedControlClient,
  type DetachedControlExecution,
  type DetachedControlInput,
  type DetachedControlVerb,
  executeDetachedControl,
} from "../src/workbench/detached-control.js";
import { type connectDetachedWorkflow, type DetachedCommand, decodeDetachedCommand } from "../src/workbench/hosts/local-detached.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation, type RelationKind } from "../src/workbench/observation.js";
import { redactWorkbenchText } from "../src/workbench/redaction.js";

const OWNER = "local-os:uid:1000";
const SCOPE: ObservationScope = { workspace: "/tmp/detached-ws", principal: OWNER };
const AT = "2026-10-15T11:00:00Z";
const REQUESTED_AT = "2026-10-15T11:40:00Z";
const NOW = "2026-10-15T11:40:01Z";
const ACKED = "2026-10-15T11:40:02Z";
const SETTLED = "2026-10-15T11:40:03Z";
const HOST = "0123456789abcdef0123456789abcdef0123456789abcdef";
const PID = 4242;
const INVOCATION: NativeRef = { provider: "local-detached", type: "invocation", id: "inv-detached-1" };
const HOST_PROCESS: NativeRef = { provider: "local-detached", type: "host-process", id: `${HOST}:${PID}` };
/** The reader's ownership confirmation: local-detached:<hostInstanceId>:<pid>:<owner.id>. */
const CONFIRMATION = `local-detached:${HOST}:${PID}:${OWNER}`;
/** Native refs are built from the projected invocation and the receipt's host instance. */
const REF = `local-detached:${INVOCATION.id}:${HOST}`;
const GRANTS = ["observe:local-detached.invocation", "control:local-detached.cancel", "control:local-detached.shutdown"];

interface Edge { from: NativeRef; to: NativeRef; kind: RelationKind; provenance: Relation["provenance"] }

function observe(scope: ObservationScope, refs: readonly NativeRef[], edges: readonly Edge[]): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of refs) {
    projection.refresh({ source, scope, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "running", statusTone: "active" } });
  }
  for (const edge of edges) projection.relate({ scope, ...edge });
  return projection;
}
/** The edge the W13-G reader states: invocation -> host-process, local-detached-sourced, confirmed by host instance, pid and owner. */
const owns = (from: NativeRef, to: NativeRef, nativeConfirmationRef = CONFIRMATION): Edge =>
  ({ from, to, kind: "ownership", provenance: { source: from.provider, observedAt: AT, nativeConfirmationRef } });
const detached = (scope: ObservationScope = SCOPE): ObservationProjection => observe(scope, [INVOCATION, HOST_PROCESS], [owns(INVOCATION, HOST_PROCESS)]);

function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: OWNER, role: "local-operator" }, grants: [...GRANTS], target: { ...INVOCATION }, action: "cancel",
    params: { confirmed: true }, invocationId: "inv-control-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}

type Answer = (reason: string) => unknown;
const CANCEL_PENDING: Answer = async () => ({ accepted: true, terminalConfirmed: false });
const SHUTDOWN_CLEAN: Answer = async () => ({ accepted: true, unresolvedEffects: false });
/** A fake connectDetachedWorkflow handle. inspect and execute exist, as on the real handle, and must never be called. */
function host(answers: { cancel?: Answer; shutdown?: Answer } = {}) {
  const calls = {
    cancel: vi.fn((reason: string): unknown => (answers.cancel ?? CANCEL_PENDING)(reason)),
    shutdown: vi.fn((reason: string): unknown => (answers.shutdown ?? SHUTDOWN_CLEAN)(reason)),
    inspect: vi.fn((): unknown => { throw new Error("the adapter must never poll"); }),
    execute: vi.fn((): unknown => { throw new Error("the adapter must never execute"); }),
  };
  const client = calls as unknown as DetachedControlClient;
  const connect = vi.fn((_invocationId: string): DetachedControlClient => client);
  return { ...calls, client, connect, total: () => Object.values(calls).reduce((sum, spy) => sum + spy.mock.calls.length, 0) };
}
type Host = ReturnType<typeof host>;
const rejecting = (error: unknown): Answer => async () => { throw error; };

function run(overrides: Partial<NativeControlRequest> = {}, fake: Host = host(), projection: ObservationProjection = detached(),
  now: () => string = () => NOW): Promise<DetachedControlExecution> {
  return executeDetachedControl({ request: request(overrides), deps: { projection }, connect: fake.connect, now });
}
function phased(): () => string {
  return vi.fn<() => string>().mockReturnValueOnce(NOW).mockReturnValueOnce(ACKED).mockReturnValueOnce(SETTLED);
}
function expectStatus<S extends DetachedControlExecution["status"]>(execution: DetachedControlExecution, status: S): Extract<DetachedControlExecution, { status: S }> {
  if (execution.status !== status) throw new Error(`expected ${status}, got ${JSON.stringify(execution)}`);
  return execution as Extract<DetachedControlExecution, { status: S }>;
}
/** Every object the adapter returns is frozen, nested parts included. */
function expectDeepFrozen(value: unknown): void {
  if (typeof value !== "object" || value === null) return;
  expect(Object.isFrozen(value)).toBe(true);
  for (const child of Object.values(value)) expectDeepFrozen(child);
}

afterEach(() => { vi.restoreAllMocks(); });

describe("A8: the admitted local-detached row of the landed core", () => {
  it("pins NATIVE_CONTROL_ACTIONS to four frozen provider rows and makes shutdown destructive", () => {
    expect(Object.entries(NATIVE_CONTROL_ACTIONS)).toStrictEqual([["furnace", ["stop"]], ["claude-agent-sdk", ["interrupt"]], ["forge", ["cancel"]],
      ["local-detached", ["cancel", "shutdown"]]]);
    expect(Object.isFrozen(NATIVE_CONTROL_ACTIONS)).toBe(true);
    for (const actions of Object.values(NATIVE_CONTROL_ACTIONS)) expect(Object.isFrozen(actions)).toBe(true);
    expect(() => (NATIVE_CONTROL_ACTIONS["local-detached"] as string[]).push("execute")).toThrow(TypeError);
    expect(DESTRUCTIVE_CONTROL_ACTIONS).toContain("shutdown");
    expect(DESTRUCTIVE_CONTROL_ACTIONS).toContain("cancel");
    expect(Object.isFrozen(DESTRUCTIVE_CONTROL_ACTIONS)).toBe(true);
  });

  it("admits each verb only under its own canonical control:local-detached.<verb> grant", () => {
    const decide = (overrides: Partial<NativeControlRequest>) => decideControl(request(overrides), { projection: detached(), now: () => NOW });
    for (const verb of ["cancel", "shutdown"]) {
      expect(decide({ action: verb, grants: [`control:local-detached.${verb}`] })).toMatchObject({ decision: "permitted", receipt: { grant: `control:local-detached.${verb}`, action: verb } });
      const other = verb === "cancel" ? "shutdown" : "cancel";
      for (const grants of [[`control:local-detached.${other}`], ["control:local-detached"], [`control:local-detached.${verb}.all`], [`control:detached.${verb}`]]) {
        expect(decide({ action: verb, grants })).toStrictEqual({ decision: "denied", category: "authorization", reason: `missing exact grant control:local-detached.${verb}`, policy: "missing-exact-grant" });
      }
    }
  });
});

describe("A1: exactly the DetachedCommand control verbs", () => {
  it("handles exactly the core row, each verb a reason-carrying member of the DetachedCommand union", () => {
    expect(Object.keys(DETACHED_CONTROL_VERBS)).toStrictEqual([...NATIVE_CONTROL_ACTIONS["local-detached"]]);
    expect(Object.isFrozen(DETACHED_CONTROL_VERBS)).toBe(true);
    expectTypeOf<DetachedControlVerb>().toEqualTypeOf<Extract<DetachedCommand, { reason: string }>["command"]>();
    expectTypeOf<DetachedControlVerb>().toEqualTypeOf<"cancel" | "shutdown">();
    expectTypeOf<DetachedControlClient>().toEqualTypeOf<Pick<ReturnType<typeof connectDetachedWorkflow>, "cancel" | "shutdown">>();
    // The host's own decoder admits each verb with a bounded operator reason and refuses it without one.
    for (const verb of NATIVE_CONTROL_ACTIONS["local-detached"]) {
      expect(decodeDetachedCommand({ command: verb, invocationId: INVOCATION.id, reason: "operator" })).toStrictEqual({ command: verb, invocationId: INVOCATION.id, reason: "operator" });
      expect(() => decodeDetachedCommand({ command: verb, invocationId: INVOCATION.id })).toThrow();
    }
  });

  it("denies every other action as unknown-action in the core, and no client method is reached", async () => {
    const unknown = ["hello", "inspect", "execute", "stop", "interrupt", "kill", "delete", "terminate", "retry", "restart", "CANCEL", "Shutdown", "cancel ",
      "__proto__", "constructor", "toString", "hasOwnProperty"];
    for (const action of unknown) {
      const fake = host();
      expect(await run({ action }, fake)).toStrictEqual({ status: "denied", clientCalls: 0,
        decision: { decision: "denied", category: "validation", reason: "unknown action", policy: "unknown-action" } });
      expect(fake.total()).toBe(0);
    }
  });

  it("a permitted verb calls exactly its own client method once, and never inspect or execute", async () => {
    const cancel = host();
    expectStatus(await run({ action: "cancel" }, cancel), "settled");
    expect([cancel.cancel.mock.calls.length, cancel.shutdown.mock.calls.length, cancel.inspect.mock.calls.length, cancel.execute.mock.calls.length]).toStrictEqual([1, 0, 0, 0]);
    const shutdown = host();
    expectStatus(await run({ action: "shutdown" }, shutdown), "settled");
    expect([shutdown.cancel.mock.calls.length, shutdown.shutdown.mock.calls.length, shutdown.inspect.mock.calls.length, shutdown.execute.mock.calls.length]).toStrictEqual([0, 1, 0, 0]);
  });
});

describe("A2: a denied decision is the core's typed denial and never opens the socket", () => {
  it("returns the core's own frozen denial for every policy, with zero client calls", async () => {
    const causalOnly = observe(SCOPE, [INVOCATION, HOST_PROCESS],
      [{ from: INVOCATION, to: HOST_PROCESS, kind: "causation", provenance: { source: "local-detached", observedAt: AT, nativeConfirmationRef: CONFIRMATION } }]);
    const cases: [ControlDenyPolicy, Partial<NativeControlRequest>, ObservationProjection][] = [
      ["unknown-permission-data", { grants: undefined }, detached()],
      ["unknown-permission-data", { grants: ["control:*"] }, detached()],
      ["observer-only", { grants: ["observe:local-detached.invocation"] }, detached()],
      ["malformed-request", { invocationId: "" }, detached()],
      ["malformed-request", { target: { ...INVOCATION, id: "inv-detached-1\u001b[2J" } }, detached()],
      ["unknown-action", { action: "execute" }, detached()],
      ["missing-exact-grant", { grants: ["control:local-detached.shutdown"] }, detached()],
      ["missing-exact-grant", { action: "shutdown", grants: ["control:local-detached.cancel"] }, detached()],
      ["cross-scope", {}, detached({ workspace: SCOPE.workspace, principal: "local-os:uid:1001" })],
      ["cross-scope", { principal: { id: "intruder" } }, detached()],
      ["cross-scope", { target: { ...INVOCATION, id: "inv-unseen" } }, detached()],
      ["no-confirmed-ownership", {}, causalOnly],
      ["operator-confirmation", { params: {} }, detached()],
      ["operator-confirmation", { params: { confirmed: "true" } }, detached()],
      ["operator-confirmation", { action: "shutdown", params: { reason: "dispose the host" } }, detached()],
    ];
    for (const [policy, overrides, projection] of cases) {
      const fake = host();
      const expected = decideControl(request(overrides), { projection, now: () => NOW });
      expect(expected).toMatchObject({ decision: "denied", policy });
      const execution = await executeDetachedControl({ request: request(overrides), deps: { projection }, connect: fake.connect, now: () => NOW });
      expect(execution).toStrictEqual({ status: "denied", decision: expected, clientCalls: 0 });
      expectDeepFrozen(execution);
      expect(fake.total()).toBe(0);
    }
  });

  it("confirmation comes from the core and is never minted: no getter, inherited or truthy value confirms either verb", async () => {
    const getter = vi.fn(() => true);
    for (const action of ["cancel", "shutdown"]) {
      const unconfirmed: unknown[] = [undefined, null, true, [true], { confirmed: 1 }, { confirmed: [true] },
        Object.defineProperty({}, "confirmed", { enumerable: true, get: getter }), Object.create({ confirmed: true })];
      for (const params of unconfirmed) {
        const fake = host();
        const execution = await run({ action, params: params as NativeControlRequest["params"] }, fake);
        expect(execution).toStrictEqual({ status: "denied", clientCalls: 0,
          decision: { decision: "denied", category: "validation", reason: "operator confirmation required", policy: "operator-confirmation" } });
        expect(fake.total()).toBe(0);
      }
    }
    expect(getter).not.toHaveBeenCalled();
  });
});

describe("A3: requested -> acknowledged -> result echo the host's answer verbatim", () => {
  it("cancel accepted with terminalConfirmed true settles cancelled through three distinct frozen receipts", async () => {
    const fake = host({ cancel: async () => ({ accepted: true, terminalConfirmed: true }) });
    const now = phased();
    const execution = expectStatus(await run({}, fake, detached(), now), "settled");
    const { requested, acknowledged, result } = execution;
    expect(requested).toMatchObject({ contractVersion: CONTROL_CONTRACT_VERSION, phase: "requested", grant: "control:local-detached.cancel", action: "cancel",
      target: INVOCATION, ownershipConfirmationRef: CONFIRMATION, decidedAt: NOW });
    for (const key of ["acknowledgedAt", "nativeAckRef", "outcome", "nativeResultRef", "settledAt"]) expect(requested).not.toHaveProperty(key);
    expect(acknowledged).toStrictEqual({ ...requested, phase: "acknowledged", acknowledgedAt: ACKED, nativeAckRef: `${REF}:cancel:accepted` });
    expect(result).toStrictEqual({ ...acknowledged, phase: "result", outcome: "cancelled", nativeResultRef: `${REF}:cancel:terminalConfirmed=true`, settledAt: SETTLED });
    expect(execution.receipt).toBe(result);
    expect(execution).toMatchObject({ verb: "cancel", echo: { accepted: true, terminalConfirmed: true }, clientCalls: 1 });
    expect(new Set([requested.phase, acknowledged.phase, result.phase]).size).toBe(3);
    expectDeepFrozen(execution);
    expect(now).toHaveBeenCalledTimes(3);
    expect(fake.cancel).toHaveBeenCalledTimes(1);
  });

  it("cancel accepted without terminal confirmation settles unknown, never cancelled, and is never polled or retried", async () => {
    const fake = host({ cancel: CANCEL_PENDING });
    const execution = expectStatus(await run({}, fake), "settled");
    expect(execution.result).toMatchObject({ phase: "result", outcome: "unknown", nativeResultRef: `${REF}:cancel:terminalConfirmed=false` });
    expect(execution.acknowledged.nativeAckRef).toBe(`${REF}:cancel:accepted`);
    expect(execution.echo).toStrictEqual({ accepted: true, terminalConfirmed: false });
    expect(fake.total()).toBe(1);
  });

  it("cancel the host did not accept stays requested with outcome failed, even when the host already reports a terminal cancellation", async () => {
    for (const terminalConfirmed of [false, true]) {
      const fake = host({ cancel: async () => ({ accepted: false, terminalConfirmed }) });
      const now = vi.fn(() => NOW);
      const execution = expectStatus(await run({}, fake, detached(), now), "not-accepted");
      expect(execution).toMatchObject({ verb: "cancel", outcome: "failed", echo: { accepted: false, terminalConfirmed }, clientCalls: 1 });
      expect(execution.receipt).toBe(execution.requested);
      expect(execution.receipt.phase).toBe("requested");
      expect(execution).not.toHaveProperty("acknowledged");
      expect(execution).not.toHaveProperty("result");
      expect(now).toHaveBeenCalledTimes(1);
      expectDeepFrozen(execution);
      expect(fake.total()).toBe(1);
    }
  });

  it("shutdown settles completed without unresolved effects and unknown with them, the flag carried in nativeResultRef", async () => {
    const clean = expectStatus(await run({ action: "shutdown" }, host({ shutdown: SHUTDOWN_CLEAN }), detached(), phased()), "settled");
    expect(clean.acknowledged).toMatchObject({ phase: "acknowledged", acknowledgedAt: ACKED, nativeAckRef: `${REF}:shutdown:accepted` });
    expect(clean.result).toMatchObject({ phase: "result", outcome: "completed", nativeResultRef: `${REF}:shutdown:unresolvedEffects=false`, settledAt: SETTLED });
    expect(clean.echo).toStrictEqual({ accepted: true, unresolvedEffects: false });
    const dirty = expectStatus(await run({ action: "shutdown" }, host({ shutdown: async () => ({ accepted: true, unresolvedEffects: true }) })), "settled");
    expect(dirty.result).toMatchObject({ outcome: "unknown", nativeResultRef: `${REF}:shutdown:unresolvedEffects=true` });
    expect(dirty.echo).toStrictEqual({ accepted: true, unresolvedEffects: true });
    const refused = expectStatus(await run({ action: "shutdown" }, host({ shutdown: async () => ({ accepted: false, unresolvedEffects: true }) })), "not-accepted");
    expect(refused).toMatchObject({ verb: "shutdown", outcome: "failed", receipt: { phase: "requested" } });
  });

  it("builds every native ref from the projected invocation and the receipt, never from caller text", async () => {
    const caller = { invocationId: "inv-caller-text-7", principal: { id: OWNER, role: "caller-role-text" }, requestedAt: "2026-10-15T13:40:00+02:00" };
    const execution = expectStatus(await run(caller, host({ cancel: async () => ({ accepted: true, terminalConfirmed: true }) })), "settled");
    for (const ref of [execution.acknowledged.nativeAckRef, execution.result.nativeResultRef]) {
      expect(ref.startsWith(`local-detached:${INVOCATION.id}:${HOST}:cancel:`)).toBe(true);
      for (const text of ["inv-caller-text-7", "caller-role-text", "13:40", OWNER, String(PID)]) expect(ref).not.toContain(text);
    }
  });

  it("an answer that does not state acceptance as an own boolean is uncertain and never acknowledged; a getter is never invoked", async () => {
    const getter = vi.fn(() => true);
    const answers: unknown[] = [undefined, null, "accepted", 1, [true], {}, { accepted: "true" }, { accepted: 1 }, { accepted: null },
      { terminalConfirmed: true }, Object.defineProperty({}, "accepted", { enumerable: true, get: getter }), Object.create({ accepted: true, terminalConfirmed: true })];
    for (const answer of answers) {
      const fake = host({ cancel: async () => answer });
      const now = vi.fn(() => NOW);
      const execution = expectStatus(await run({}, fake, detached(), now), "uncertain");
      expect(execution).toMatchObject({ verb: "cancel", outcome: "unknown", uncertainty: "unattributable-answer", reconcileHint: DETACHED_CONTROL_RECONCILE, clientCalls: 1 });
      expect(execution.receipt).toBe(execution.requested);
      expect(execution).not.toHaveProperty("acknowledged");
      expect(now).toHaveBeenCalledTimes(1);
      expect(fake.total()).toBe(1);
    }
    expect(getter).not.toHaveBeenCalled();
  });

  it("accepted with the settling field unreported is acknowledged and never settled", async () => {
    const unreported: [DetachedControlVerb, unknown][] = [["cancel", { accepted: true }], ["cancel", { accepted: true, terminalConfirmed: "true" }],
      ["shutdown", { accepted: true }], ["shutdown", { accepted: true, unresolvedEffects: 0 }], ["shutdown", { accepted: true, terminalConfirmed: false }]];
    for (const [action, answer] of unreported) {
      const execution = expectStatus(await run({ action }, host({ [action]: async () => answer })), "uncertain");
      expect(execution).toMatchObject({ verb: action, outcome: "unknown", uncertainty: "unreported-result", echo: { accepted: true },
        acknowledged: { phase: "acknowledged", nativeAckRef: `${REF}:${action}:accepted` } });
      expect(execution.receipt).toBe(execution.acknowledged);
      expect(execution).not.toHaveProperty("result");
    }
  });

  it("an unzoned host clock after the call parks the execution as uncertain instead of throwing", async () => {
    const ackRefused = expectStatus(await run({}, host({ cancel: async () => ({ accepted: true, terminalConfirmed: true }) }), detached(),
      vi.fn<() => string>().mockReturnValueOnce(NOW).mockReturnValue("2026-10-15 11:40")), "uncertain");
    expect(ackRefused).toMatchObject({ uncertainty: "receipt-refused", echo: { accepted: true, terminalConfirmed: true }, receipt: { phase: "requested" } });
    expect(ackRefused).not.toHaveProperty("acknowledged");
    const settleRefused = expectStatus(await run({}, host({ cancel: async () => ({ accepted: true, terminalConfirmed: true }) }), detached(),
      vi.fn<() => string>().mockReturnValueOnce(NOW).mockReturnValueOnce(ACKED).mockReturnValue("later")), "uncertain");
    expect(settleRefused).toMatchObject({ uncertainty: "receipt-refused", receipt: { phase: "acknowledged", acknowledgedAt: ACKED } });
    expect(settleRefused).not.toHaveProperty("result");
    const throwing = expectStatus(await run({}, host(), detached(), vi.fn<() => string>().mockReturnValueOnce(NOW).mockImplementation(() => { throw new Error("clock gone"); })), "uncertain");
    expect(throwing).toMatchObject({ uncertainty: "receipt-refused", receipt: { phase: "requested" } });
  });
});

describe("A4: a refusal before acceptance stays requested; a transport failure is uncertain and never retried", () => {
  it("a host or client refusal before acceptance returns a typed sanitized refusal and never acknowledges", async () => {
    const refusals: [unknown, "authorization" | "validation", string][] = [
      [new Error("Detached authorization: Invocation cancel grant denied."), "authorization", "Invocation cancel grant denied."],
      [new Error("Detached authorization: Invocation ACL mismatch."), "authorization", "Invocation ACL mismatch."],
      [new Error("Detached validation: Unsupported detached command; retry and arbitrary invocation payloads are forbidden."), "validation",
        "Unsupported detached command; retry and arbitrary invocation payloads are forbidden."],
      [new Error("Authorization: socket must be owned by uid 1000 with exact private permissions: /tmp/root/inv-detached-1/host.sock."), "authorization",
        "Authorization: socket must be owned by uid 1000 with exact private permissions: /tmp/root/inv-detached-1/host.sock."],
      [new Error("Authorization: unsafe detached directory ancestor."), "authorization", "Authorization: unsafe detached directory ancestor."],
      [Object.assign(new Error("connect EACCES /tmp/root/inv-detached-1/host.sock"), { code: "EACCES" }), "authorization", "connect EACCES /tmp/root/inv-detached-1/host.sock"],
      [new Error("Invalid invocation ID (no paths or shell syntax)."), "validation", "Invalid invocation ID (no paths or shell syntax)."],
      [new Error("Control requires a bounded operator reason."), "validation", "Control requires a bounded operator reason."],
      [new Error("Detached Unix socket path exceeds Linux socket path bound; use a shorter private root."), "validation",
        "Detached Unix socket path exceeds Linux socket path bound; use a shorter private root."],
      [new Error("Detached directory must be a canonical absolute path."), "validation", "Detached directory must be a canonical absolute path."],
    ];
    for (const [error, category, diagnostic] of refusals) {
      for (const action of ["cancel", "shutdown"] as const) {
        const fake = host({ [action]: rejecting(error) });
        const now = vi.fn(() => NOW);
        const execution = expectStatus(await run({ action }, fake, detached(), now), "refused");
        expect(execution).toStrictEqual({ status: "refused", verb: action, receipt: execution.requested, requested: execution.requested,
          refusal: { category, diagnostic }, clientCalls: 1 });
        expect(execution.receipt.phase).toBe("requested");
        expect(now).toHaveBeenCalledTimes(1);
        expectDeepFrozen(execution);
        expect(fake.total()).toBe(1);
      }
    }
  });

  it("a transport failure, a post-dispatch frame error or an unknown host category is uncertain at phase requested, with the reconcile guidance", async () => {
    const failures: unknown[] = [
      new Error("Detached transport timeout; effects may be unresolved."), new Error("Detached host disconnected before reply."),
      Object.assign(new Error("connect ECONNREFUSED /tmp/root/inv-detached-1/host.sock"), { code: "ECONNREFUSED" }),
      Object.assign(new Error("ENOENT: no such file or directory, lstat '/tmp/root/inv-detached-1/host.sock'"), { code: "ENOENT" }),
      new Error("Invalid detached frame length."), new Error("Detached frame is not UTF-8."), new Error("Detached frame buffer exceeds bound."),
      new Error("Malformed detached response."), new Error("Expected JSON object."), new Error("Detached transport: host went away"),
      new Error("Detached uncertain-effect: interpreter state lost"), new Error("Detached unavailable: shutting down"), new Error(""),
      "plain string rejection", { message: 42 }, undefined,
    ];
    for (const failure of failures) {
      const fake = host({ cancel: rejecting(failure) });
      const now = vi.fn(() => NOW);
      const execution = expectStatus(await run({}, fake, detached(), now), "uncertain");
      expect(execution).toMatchObject({ verb: "cancel", outcome: "unknown", uncertainty: "transport-failure", reconcileHint: DETACHED_CONTROL_RECONCILE, clientCalls: 1 });
      expect(execution.receipt).toBe(execution.requested);
      expect(execution.receipt.phase).toBe("requested");
      expect(execution).not.toHaveProperty("acknowledged");
      expect(typeof execution.diagnostic).toBe("string");
      expect(now).toHaveBeenCalledTimes(1);
      expectDeepFrozen(execution);
      expect(fake.total()).toBe(1);
    }
    expect(DETACHED_CONTROL_RECONCILE).toMatch(/Never automatically retry/);
    expect(DETACHED_CONTROL_RECONCILE).toMatch(/reconcile/);
  });

  it("a client that throws synchronously counts as a call whose effect is unknown, for either verb", async () => {
    for (const action of ["cancel", "shutdown"] as const) {
      const fake = host({ [action]: (): unknown => { throw new Error("Detached host disconnected before reply."); } });
      const execution = expectStatus(await run({ action }, fake), "uncertain");
      expect(execution).toMatchObject({ verb: action, uncertainty: "transport-failure", receipt: { phase: "requested" }, clientCalls: 1 });
      expect(fake.total()).toBe(1);
    }
  });
});

describe("A5: observers and non-owners never control", () => {
  it("C1 (owner ruling 18:18Z): the handle comes from the wiring's connect(invocationId) factory, called only after admission with the target id", async () => {
    // decide-then-act: no denial and no adapter precondition refusal ever builds a handle, so nothing can bind a connection first.
    const preconditions: Partial<NativeControlRequest>[] = [{ action: "inspect" }, { params: {} }, { params: { confirmed: true, reason: 42 } },
      { grants: ["observe:local-detached.invocation"] }, { principal: { id: "someone-else", role: "local-operator" } }];
    for (const overrides of preconditions) {
      const fake = host();
      expect((await run(overrides, fake)).clientCalls).toBe(0);
      expect(fake.connect).not.toHaveBeenCalled();
    }
    const lookalike: NativeRef = { provider: "forge", type: "invocation", id: INVOCATION.id };
    const forgeOwned = observe(SCOPE, [lookalike, HOST_PROCESS], [owns(lookalike, HOST_PROCESS)]);
    const other = host();
    expect((await run({ target: lookalike, grants: ["control:forge.cancel"] }, other, forgeOwned)).clientCalls).toBe(0);
    expect(other.connect).not.toHaveBeenCalled();
    for (const action of ["cancel", "shutdown"] as const) {
      const fake = host();
      expectStatus(await run({ action }, fake), "settled");
      expect(fake.connect.mock.calls).toStrictEqual([[INVOCATION.id]]);
      expect(fake.total()).toBe(1);
    }
  });

  it("C1: a factory that throws, or returns a handle without cancel and shutdown, is a refusal before any verb is called", async () => {
    const half = { cancel: vi.fn() } as unknown as DetachedControlClient;
    const factories: DetachedControlInput["connect"][] = [
      () => { throw new Error("connect exploded Bearer sk-ant-api03-SECRETPART0123456789"); },
      () => undefined as unknown as DetachedControlClient,
      () => half,
    ];
    for (const connect of factories) {
      const execution = expectStatus(await executeDetachedControl({ request: request(), deps: { projection: detached() }, connect, now: () => NOW }), "refused");
      expect(execution).toMatchObject({ clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested" } });
      expect(JSON.stringify(execution)).not.toContain("SECRETPART");
    }
    expect(half.cancel).not.toHaveBeenCalled();
  });

  it("observe:/inspect:/discover:-only grants are denied observer-only before any projection read or client call", async () => {
    const projection = detached();
    const query = vi.spyOn(projection, "query");
    const relations = vi.spyOn(projection, "relations");
    const observers = [["observe:local-detached.invocation"], ["inspect:local-detached.invocation"], ["discover:local-detached.invocation"],
      ["observe:local-detached.invocation", "inspect:local-detached.invocation", "discover:local-detached.invocation"], []];
    for (const grants of observers) {
      for (const action of ["cancel", "shutdown", "inspect", "kill"]) {
        const fake = host();
        expect(await run({ grants, action }, fake, projection)).toStrictEqual({ status: "denied", clientCalls: 0,
          decision: { decision: "denied", category: "authorization", reason: "observer-only", policy: "observer-only" } });
        expect(fake.total()).toBe(0);
      }
    }
    expect(query).not.toHaveBeenCalled();
    expect(relations).not.toHaveBeenCalled();
  });

  it("causation, grouping, dependency and hypothesis never confer ownership, and the owned host process holds no owner rights", async () => {
    const statement = (kind: RelationKind): Edge => ({ from: INVOCATION, to: HOST_PROCESS, kind, provenance: { source: "local-detached", observedAt: AT, nativeConfirmationRef: CONFIRMATION } });
    const sharedOnly = observe(SCOPE, [INVOCATION, HOST_PROCESS], (["causation", "grouping", "dependency", "hypothesis"] as const).map(statement));
    const noOwner = { status: "denied", clientCalls: 0, decision: { decision: "denied", category: "authorization", reason: "no confirmed lifecycle ownership", policy: "no-confirmed-ownership" } };
    for (const action of ["cancel", "shutdown"]) {
      const fake = host();
      expect(await run({ action }, fake, sharedOnly)).toStrictEqual(noOwner);
      expect(await run({ action, target: { ...HOST_PROCESS } }, fake)).toStrictEqual(noOwner);
      expect(fake.total()).toBe(0);
    }
  });
});

describe("adapter preconditions: a permit the detached host cannot carry is refused before any client call", () => {
  it("a decision the core permits for another provider never reaches the detached client", async () => {
    const run1: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };
    const attempt: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: SCOPE.workspace };
    const projection = observe(SCOPE, [run1, attempt], [owns(run1, attempt, "req-attempts")]);
    const fake = host();
    const execution = expectStatus(await run({ target: run1, action: "stop", grants: ["control:furnace.stop"] }, fake, projection), "refused");
    expect(execution).toMatchObject({ clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested", target: run1 } });
    expect(execution).not.toHaveProperty("verb");
    // Even a forge-sourced node shaped like a detached invocation, under forge's own cancel verb and a detached-looking
    // confirmation, is another producer's target: the provider, not the shape, selects the detached host.
    const lookalike: NativeRef = { provider: "forge", type: "invocation", id: INVOCATION.id };
    const forgeOwned = observe(SCOPE, [lookalike, HOST_PROCESS], [owns(lookalike, HOST_PROCESS)]);
    const permitted = decideControl(request({ target: lookalike, grants: ["control:forge.cancel"] }), { projection: forgeOwned, now: () => NOW });
    expect(permitted).toMatchObject({ decision: "permitted", receipt: { grant: "control:forge.cancel", ownershipConfirmationRef: CONFIRMATION } });
    const forged = expectStatus(await run({ target: lookalike, grants: ["control:forge.cancel"] }, fake, forgeOwned), "refused");
    expect(forged).toMatchObject({ clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested", target: lookalike } });
    expect(forged).not.toHaveProperty("verb");
    expect(fake.total()).toBe(0);
  });

  it("only a local-detached invocation whose id the host grammar admits is a detached target", async () => {
    const hostOwner = observe(SCOPE, [INVOCATION, HOST_PROCESS], [owns(HOST_PROCESS, INVOCATION)]);
    const colon: NativeRef = { ...INVOCATION, id: "inv:detached" };
    const traversal: NativeRef = { ...INVOCATION, id: "../inv-detached-1" };
    const scoped: NativeRef = { ...INVOCATION, scope: SCOPE.workspace };
    const cases: [NativeRef, ObservationProjection][] = [[HOST_PROCESS, hostOwner], [colon, observe(SCOPE, [colon, HOST_PROCESS], [owns(colon, HOST_PROCESS)])],
      [traversal, observe(SCOPE, [traversal, HOST_PROCESS], [owns(traversal, HOST_PROCESS)])], [scoped, observe(SCOPE, [scoped, HOST_PROCESS], [owns(scoped, HOST_PROCESS)])]];
    for (const [target, projection] of cases) {
      expect(decideControl(request({ target }), { projection, now: () => NOW }).decision).toBe("permitted");
      const fake = host();
      const execution = expectStatus(await run({ target }, fake, projection), "refused");
      expect(execution).toMatchObject({ verb: "cancel", clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested" } });
      expect(fake.total()).toBe(0);
    }
  });

  it("an ownership confirmation outside the reader's convention names no host instance and is refused", async () => {
    const malformed = ["req-attempts", `local-detached:${HOST}:${PID}`, `local-detached:${HOST}:${PID}:`, `local-detached:${HOST}:0:${OWNER}`,
      `local-detached:${HOST.toUpperCase()}:${PID}:${OWNER}`, `local-detached:${HOST}0:${PID}:${OWNER}`, `local-detached:${HOST}:-1:${OWNER}`,
      `local-detached:${HOST}:${PID}x:${OWNER}`, `furnace:${HOST}:${PID}:${OWNER}`];
    for (const nativeConfirmationRef of malformed) {
      const projection = observe(SCOPE, [INVOCATION, HOST_PROCESS], [owns(INVOCATION, HOST_PROCESS, nativeConfirmationRef)]);
      expect(decideControl(request(), { projection, now: () => NOW }).decision).toBe("permitted");
      const fake = host();
      const execution = expectStatus(await run({}, fake, projection), "refused");
      expect(execution).toMatchObject({ clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested", ownershipConfirmationRef: nativeConfirmationRef } });
      expect(fake.total()).toBe(0);
    }
  });

  it("a malformed call from the host wiring throws a validation CapabilityError before deciding or calling anything", async () => {
    const fake = host();
    const projection = detached();
    const query = vi.spyOn(projection, "query");
    const now = vi.fn(() => NOW);
    const good: DetachedControlInput = { request: request(), deps: { projection }, connect: fake.connect, now };
    const broken: unknown[] = [undefined, null, {}, { ...good, request: undefined }, { ...good, deps: undefined }, { ...good, deps: {} },
      { ...good, deps: { projection: { query: () => ({ nodes: [] }) } } }, { ...good, connect: undefined }, { ...good, connect: fake.client },
      { ...good, connect: "x" }, { ...good, client: fake.client, connect: undefined }, { ...good, now: undefined }, { ...good, now: NOW }];
    for (const input of broken) {
      let failure: unknown;
      try { await executeDetachedControl(input as DetachedControlInput); } catch (error) { failure = error; }
      expect(failure).toBeInstanceOf(CapabilityError);
      expect((failure as CapabilityError).category).toBe("validation");
    }
    expect(query).not.toHaveBeenCalled();
    expect(now).not.toHaveBeenCalled();
    expect(fake.total()).toBe(0);
    // An unzoned host clock at decision time is the core's validation failure, raised before any client call.
    let unzoned: unknown;
    try { await executeDetachedControl({ ...good, now: () => "2026-10-15 11:40" }); } catch (error) { unzoned = error; }
    expect(unzoned).toBeInstanceOf(CapabilityError);
    expect((unzoned as CapabilityError).category).toBe("validation");
    expect(fake.total()).toBe(0);
  });
});

describe("A6: never kills by pid and never reaches the host module at runtime", () => {
  it("imports only pure workbench modules, the detached host only as erased types, and names no process, socket or launch API", () => {
    const source = readFileSync(new URL("../src/workbench/detached-control.ts", import.meta.url), "utf8");
    // Static imports, re-exports and side-effect imports all name their module in a string literal.
    const imports = new Set([...source.matchAll(/^(?:import|export)\s[^;]*?\sfrom\s+["']([^"']+)["']/gm), ...source.matchAll(/^import\s+["']([^"']+)["']/gm)]
      .map(match => match[1]));
    expect([...imports].sort()).toStrictEqual(["./capability-registry.js", "./control.js", "./hosts/local-detached.js", "./observation.js", "./redaction.js"]);
    // The host module spawns and connects; it is reachable from here only as types, which compilation erases.
    expect(source).toMatch(/^import type \{[^}]*\} from "\.\/hosts\/local-detached\.js";$/m);
    expect(source).toMatch(/^import type \{[^}]*\} from "\.\/observation\.js";$/m);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const forbidden of [/child_process/, /node:net/, /\bprocess\./, /\.kill\b/, /\bspawn\b/, /createConnection/, /launchDetachedWorkflow/, /connectDetachedWorkflow\s*\(/,
      /socketPath/, /\.inspect\s*\(/, /\.execute\s*\(/]) {
      expect(code).not.toMatch(forbidden);
    }
  });

  it("reads the projection only through the core and never mutates it", async () => {
    const projection = detached();
    const mutators = ["ingest", "refresh", "markStale", "disconnect", "reconnect", "relate"] as const;
    const spies = mutators.map(name => vi.spyOn(projection, name));
    expectStatus(await run({}, host({ cancel: async () => ({ accepted: true, terminalConfirmed: true }) }), projection), "settled");
    expectStatus(await run({ action: "shutdown" }, host(), projection), "settled");
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
  });
});

describe("A7: reasons, diagnostics and echoed host text route through the shared sanitizers", () => {
  const SECRET = "sk-ant-api03-SECRETPART0123456789";
  const adversarial = `\u001b[31mplease\u001b[0m stop\u200b now \u202eevil\u202c\u0007 Bearer sk-ant-api03-SECRET\u200bPART0123456789 then ${SECRET.slice(0, 20)}\u00ad${SECRET.slice(20)}\u2066 tail\u001b]0;title\u0007`;

  it("an adversarial operator reason never reaches a receipt, and the client frame carries only its sanitized, bounded form", async () => {
    for (const action of ["cancel", "shutdown"] as const) {
      const fake = host();
      const execution = expectStatus(await run({ action, params: { confirmed: true, reason: adversarial } }, fake), "settled");
      const sent = (action === "cancel" ? fake.cancel : fake.shutdown).mock.calls[0][0];
      expect(decodeDetachedCommand({ command: action, invocationId: INVOCATION.id, reason: sent })).toStrictEqual({ command: action, invocationId: INVOCATION.id, reason: sent });
      expect(sent).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/);
      expect(sent).not.toMatch(/\p{Default_Ignorable_Code_Point}/u);
      expect(sent).not.toContain("SECRETPART");
      expect(sent).not.toContain("0123456789");
      expect(sent).toContain("[REDACTED]");
      expect(sent).toContain("please stop now");
      expect(sent.startsWith(`${CONTROL_CONTRACT_VERSION} ${execution.requested.requestId}: `)).toBe(true);
      const json = JSON.stringify(execution);
      for (const text of ["please", "evil", "SECRET", "REDACTED", "title", "\\u001b", "\\u200b"]) expect(json).not.toContain(text);
    }
  });

  it("whitespace controls separate a credential from its scheme instead of being deleted, through params.reason and both diagnostic paths", async () => {
    // Gate mutant G3 (stripUnsafeText(value) with no replacement) deletes LF/TAB/VT/CR first and glues "x" to "sk-ant-", defeating the word-boundary redactor.
    const TAIL = "SECRETPART0123456789";
    const GLUE = ["token: x\nsk-ant-api03-", "see\nghp_", "auth\nBearer ", "Bearer\ttok", "Basic\vtok", "Authorization: Bearer\ntok", "x\rsk-ant-api03-"]
      .map(prefix => `${prefix}${TAIL}`);
    for (const glued of GLUE) {
      const fake = host();
      expectStatus(await run({ params: { confirmed: true, reason: glued } }, fake), "settled");
      const sent = fake.cancel.mock.calls[0][0];
      expect(sent).not.toContain(TAIL);
      expect(sent).toContain("[REDACTED]");
      const refused = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached authorization: ${glued}`)) })), "refused");
      expect(refused.refusal.diagnostic).not.toContain(TAIL);
      expect(refused.refusal.diagnostic).toContain("[REDACTED]");
      const lost = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached host disconnected before reply. ${glued}`)) })), "uncertain");
      expect(lost.diagnostic ?? "").not.toContain(TAIL);
      expect(lost.diagnostic ?? "").toContain("[REDACTED]");
    }
  });

  it("an absent or blank reason sends the fixed attributable reason; a non-string or accessor reason is refused before any client call", async () => {
    for (const params of [{ confirmed: true }, { confirmed: true, reason: "" }, { confirmed: true, reason: "   " }, { confirmed: true, reason: "\u001b[2J\u200b\u0007" },
      Object.assign(Object.create({ reason: "inherited text" }), { confirmed: true })]) {
      const fake = host();
      const execution = expectStatus(await run({ params }, fake), "settled");
      expect(fake.cancel.mock.calls).toStrictEqual([[`${CONTROL_CONTRACT_VERSION} ${execution.requested.requestId}`]]);
    }
    const getter = vi.fn(() => "from a getter");
    for (const reason of [42, true, null, ["text"], { text: "x" }]) {
      const fake = host();
      const execution = expectStatus(await run({ params: { confirmed: true, reason } }, fake), "refused");
      expect(execution).toMatchObject({ clientCalls: 0, refusal: { category: "validation" }, receipt: { phase: "requested" } });
      expect(fake.total()).toBe(0);
    }
    const accessor = Object.defineProperty({ confirmed: true }, "reason", { enumerable: true, get: getter });
    const fake = host();
    expect(expectStatus(await run({ params: accessor }, fake), "refused")).toMatchObject({ clientCalls: 0, refusal: { category: "validation" } });
    expect(fake.total()).toBe(0);
    expect(getter).not.toHaveBeenCalled();
  });

  it("bounds a long reason so the frame stays inside the host's 512-character reason bound", async () => {
    for (const reason of ["x".repeat(20_000), `${"word ".repeat(3000)}Bearer ${SECRET}`, "\u{1f600}".repeat(1000)]) {
      const fake = host();
      expectStatus(await run({ params: { confirmed: true, reason } }, fake), "settled");
      const sent = fake.cancel.mock.calls[0][0];
      expect(sent.length).toBeLessThanOrEqual(512);
      expect(decodeDetachedCommand({ command: "cancel", invocationId: INVOCATION.id, reason: sent }).command).toBe("cancel");
      expect(sent).not.toMatch(/[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/);
    }
  });

  it("host diagnostics in refusals and transport failures are redacted and stripped before they reach the execution", async () => {
    const hostText = `\u001b[2Jdenied\u200b for Bearer sk-ant-api03-HOST\u200bSECRET99 \u202eoverride\u0007 password=hunter2`;
    const refused = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached authorization: ${hostText}`)) })), "refused");
    const lost = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached host disconnected before reply. ${hostText}`)) })), "uncertain");
    for (const diagnostic of [refused.refusal.diagnostic, lost.diagnostic ?? ""]) {
      expect(diagnostic).toContain("denied");
      expect(diagnostic).toContain("[REDACTED]");
      for (const text of ["HOSTSECRET", "HOST", "hunter2", "\u001b", "\u200b", "\u202e", "\u0007"]) expect(diagnostic).not.toContain(text);
      expect(diagnostic.length).toBeLessThanOrEqual(300);
    }
  });

  /**
   * Respin U2 (gate-3 08:27Z, collapsed-readings class): on the landing merge the delivered local pre-pass spaced every
   * default-ignorable before the redactor, so an in-token zero-width or control split the credential. The measured leaking
   * classes of the trunk separator corpus run through every REAL output path of executeDetachedControl: the client frame
   * (which the host decoder must admit), the reason the host's controlAudit stores from it (local-detached.ts:650 applies
   * redactWorkbenchText to the decoded reason), the host-refusal, client-refusal, EACCES and transport diagnostics, and each whole execution (receipts included).
   */
  it("U2: the corpus's in-token glue classes (S4, K1, Z1, X1, I1-I8) never reach the frame, the host audit, a diagnostic or an execution", async () => {
    const unit = (code: number): string => String.fromCodePoint(code);
    const ZWSP = unit(0x200b);
    const IGNORABLES = [0xad, 0x2061, 0x180e, 0x34f, 0xfe0f, 0x200e, 0xe0041, 0x61c];
    const probes: readonly (readonly [id: string, raw: string, secret: string])[] = [
      ["S4 ZWSP inside the scheme", `token: Bear${ZWSP}er abc123`, "abc123"],
      ["K1 BEL inside password", `pass${unit(0x07)}word=hunter2`, "hunter2"],
      ["Z1 ZWSP after the prefix", `sk-ant-${ZWSP}ZEROWIDTHSECRET`, "ZEROWIDTHSECRET"],
      ["X1 ZWSP before and inside the scheme", `x${ZWSP}Bea${ZWSP}rer MIXONESECRET`, "MIXONESECRET"],
      ...IGNORABLES.map((code, index) => [`I${index + 1} U+${code.toString(16).toUpperCase()} inside a key`, `sk-ant-aaaa${unit(code)}TAILIGNORABLE${index + 1}`,
        `TAILIGNORABLE${index + 1}`] as const),
    ];
    const UNSAFE = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;
    const failures: string[] = [];
    let checked = 0;
    for (const [id, raw, secret] of probes) {
      const fake = host();
      const settled = expectStatus(await run({ params: { confirmed: true, reason: raw } }, fake), "settled");
      const frame = fake.cancel.mock.calls[0][0];
      expect(decodeDetachedCommand({ command: "cancel", invocationId: INVOCATION.id, reason: frame }), `${id}: the host decoder admits the frame`)
        .toStrictEqual({ command: "cancel", invocationId: INVOCATION.id, reason: frame });
      if (!frame.includes("[REDACTED]")) failures.push(`${id}: frame carries no [REDACTED] marker`);
      const shown: [path: string, text: string][] = [["frame", frame], ["host audit", redactWorkbenchText(frame)], ["settled execution", JSON.stringify(settled)]];
      const errors: [path: string, error: Error][] = [
        ["host refusal", new Error(`Detached authorization: ${raw}`)],
        ["client refusal", new Error(`Authorization: ${raw}`)],
        ["EACCES", Object.assign(new Error(`connect EACCES ${raw}`), { code: "EACCES" })],
        ["transport", new Error(`Detached host disconnected before reply. ${raw}`)],
      ];
      for (const [path, error] of errors) {
        const execution = await run({}, host({ cancel: rejecting(error) }));
        const diagnostic = execution.status === "refused" ? execution.refusal.diagnostic : execution.status === "uncertain" ? execution.diagnostic ?? "" : "";
        expect(execution.status, `${id}: ${path} path`).toBe(path === "transport" ? "uncertain" : "refused");
        if (!diagnostic.includes("[REDACTED]")) failures.push(`${id}: ${path} carries no [REDACTED] marker`);
        shown.push([path, diagnostic], [`${path} execution`, JSON.stringify(execution)]);
      }
      for (const [path, text] of shown) {
        checked += 1;
        if (text.includes(secret)) failures.push(`${id}: ${path} leaked`);
        if (UNSAFE.test(text)) failures.push(`${id}: ${path} kept an unsafe code point`);
      }
    }
    expect(probes).toHaveLength(12);
    expect(checked).toBe(12 * 11);
    expect(failures).toStrictEqual([]);
  });

  it("U1: the frame and every diagnostic render through the helper's label layout: one line, gaps one space, runs collapsed, ends trimmed", async () => {
    // An escape sequence and a control between words, a whitespace run and a line break: only the label layout renders all
    // four as single spaces on one line (text glues the first two, terminal glues the escape, lines keeps the LF).
    const raw = `  stop${String.fromCodePoint(0x1b)}[0mnow${String.fromCodePoint(0x07)}then   twice${String.fromCodePoint(0x0a)}lines  `;
    const shown = "stop now then twice lines";
    const fake = host();
    const execution = expectStatus(await run({ params: { confirmed: true, reason: raw } }, fake), "settled");
    expect(fake.cancel.mock.calls).toStrictEqual([[`${CONTROL_CONTRACT_VERSION} ${execution.requested.requestId}: ${shown}`]]);
    const refused = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached authorization: ${raw}`)) })), "refused");
    expect(refused.refusal.diagnostic).toBe(shown);
    const lost = expectStatus(await run({}, host({ cancel: rejecting(new Error(`Detached host disconnected before reply. ${raw}`)) })), "uncertain");
    expect(lost.diagnostic).toBe(`Detached host disconnected before reply. ${shown}`);
  });
});
