/**
 * wb-69g.8 (W16-D2/VC-1): the Claude Agent SDK native control adapter executes only permitted workbench.control/v1
 * interrupt decisions through an injected per-call seam over the vendored SDK's Query.interrupt() (sdk.d.ts:2882), and
 * settles a result only from the call's terminal as the observer reports it. No live SDK, claude-live tier, Pi tool or
 * network: the seam is a fake, the projection is seeded by hand (W13-G convention), and throwing tripwires prove the
 * adapter never loads the Claude Agent SDK or the Claude host.
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import * as claudeControl from "../src/workbench/claude-control.js";
import {
  CLAUDE_CONTROL_RECONCILE,
  CLAUDE_CONTROL_VERBS,
  CLAUDE_INTERRUPT_NO_RECEIPT,
  CLAUDE_INTERRUPT_OUTCOMES,
  type ClaudeControlCall,
  type ClaudeControlDeps,
  type ClaudeControlExecution,
  ClaudeControlRefusal,
  type ClaudeControlRefusalCode,
  type ClaudeInterruptSeam,
  type ClaudeObservedTerminal,
  executeClaudeControl,
  settleClaudeInterrupt,
} from "../src/workbench/claude-control.js";
import {
  acknowledge,
  type ControlDecision,
  type ControlDenyPolicy,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
  type RequestedControlReceipt,
  settle,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import type { ClaudeNativeObservation } from "../src/workflow/progress.js";

// Isolation tripwires (BOUNDARY 10:23:58Z standing marker rule: a factory that ONLY throws). The suite cannot load if the
// adapter, or anything it imports, ever loads the Claude Agent SDK or the Claude host.
vi.mock("@anthropic-ai/claude-agent-sdk", () => {
  throw new Error("tripwire: the Claude control adapter must never load the Claude Agent SDK");
});
vi.mock("../src/workbench/claude-host.js", () => {
  throw new Error("tripwire: the Claude control adapter must never load the Claude host");
});

const WS = "/tmp/claude-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const REQUESTED_AT = "2026-10-15T07:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const OBSERVED_AT = "2026-10-15T07:00:05Z";
const SETTLED_AT = "2026-10-15T07:00:06Z";
const TIMEOUT_MS = 5_000;
const SESSION_ID = "8f14e45f-ceea-467f-a8d5-2b1c3e6f0a9d";
const SESSION: NativeRef = { provider: "claude-agent-sdk", type: "session", id: SESSION_ID };
const SUBAGENT: NativeRef = { provider: "claude-agent-sdk", type: "subagent", id: `${SESSION_ID}:sub-1` };
/** The workflow agent() call whose live query serves SESSION: the host's invocation id, call index and SDK session id. */
const CALL: ClaudeControlCall = { invocationId: "inv-workflow-1", index: 2, sessionId: SESSION_ID };
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/;
const AUDIT = ["contractVersion", "requestId", "scope", "principal", "grant", "policy", "target", "action", "invocationId", "ownershipConfirmationRef",
  "requestedAt", "decidedAt"] as const;

interface Edge { from: NativeRef; to: NativeRef; kind: RelationKind; provenance: { source: string; observedAt?: string; nativeConfirmationRef?: string } }

function observe(refs: readonly NativeRef[], edges: readonly Edge[], scope: ObservationScope = SCOPE): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of refs) {
    projection.refresh({ source, scope, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "agent", statusText: "observed-running", statusTone: "active" } });
  }
  for (const edge of edges) projection.relate({ scope, ...edge });
  return projection;
}
/** A producer-stated, natively confirmed ownership edge FROM the target, the statement decideControl requires. */
const owns = (from: NativeRef, to: NativeRef, nativeConfirmationRef = SESSION_ID): Edge =>
  ({ from, to, kind: "ownership", provenance: { source: from.provider, observedAt: AT, nativeConfirmationRef } });
const claude = (): ObservationProjection => observe([SESSION, SUBAGENT], [owns(SESSION, SUBAGENT)]);

function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" },
    grants: ["observe:claude-agent-sdk.session.inspect", "control:claude-agent-sdk.interrupt"], target: { ...SESSION }, action: "interrupt",
    params: { confirmed: true }, invocationId: "inv-control-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decide = (overrides: Partial<NativeControlRequest> = {}, projection: ObservationProjection = claude()): ControlDecision =>
  decideControl(request(overrides), { projection, now: () => DECIDED_AT });
function permit(overrides: Partial<NativeControlRequest> = {}, projection?: ObservationProjection): ControlDecision & { decision: "permitted" } {
  const decision = decide(overrides, projection);
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}

/** The injected seam plus every other method a retained SDK Query carries: none of them may ever be called. */
function fakeSeam(answer: () => unknown = () => undefined) {
  const interrupt = vi.fn(async (..._args: unknown[]): Promise<unknown> => answer());
  const others = { return: vi.fn(), throw: vi.fn(), close: vi.fn(), abort: vi.fn(), cancel: vi.fn(), setPermissionMode: vi.fn(), setModel: vi.fn(),
    stopTask: vi.fn() };
  const seam = { interrupt, ...others };
  const spies = [interrupt, ...Object.values(others)];
  return { seam: seam as ClaudeInterruptSeam, interrupt, others, calls: (): number => spies.reduce((total, spy) => total + spy.mock.calls.length, 0) };
}
function clock(...ticks: string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}
const deps = (fake: { seam: ClaudeInterruptSeam }, overrides: Partial<ClaudeControlDeps> = {}): ClaudeControlDeps =>
  ({ seam: fake.seam, call: { ...CALL }, now: clock(ACKED_AT), timeoutMs: TIMEOUT_MS, ...overrides });
const SETTLE = { now: () => SETTLED_AT };

/** What the observer emits for CALL (claude-transcript.ts createClaudeObserver), with the host's arrival time. */
function observed(terminal: ClaudeNativeObservation["terminal"], patch: Partial<ClaudeNativeObservation> = {}, observedAt = OBSERVED_AT): ClaudeObservedTerminal {
  const observation: ClaudeNativeObservation = { provider: "claude-agent-sdk", sessionId: SESSION_ID, lastMessageId: "msg-9", observedMessages: 7,
    assistantCharacters: 42, tools: [], toolsTruncated: false, freshness: "current", ...(terminal === undefined ? {} : { terminal }), ...patch };
  return { call: { invocationId: CALL.invocationId, index: CALL.index }, observation, observedAt };
}

/** A proxy every read of which throws, as a revoked proxy's does. */
function revoked(): object {
  const { proxy, revoke } = Proxy.revocable({}, {});
  revoke();
  return proxy;
}
/** A frozen-looking record whose property reads throw: a trapping proxy over a frozen target. */
function trapping(target: object): object {
  return new Proxy(Object.freeze(target), { getOwnPropertyDescriptor: () => { throw new Error("TOPSECRET trap"); } });
}

async function refused(pending: Promise<unknown>, refusal: ClaudeControlRefusalCode, category: string): Promise<ClaudeControlRefusal> {
  let failure: unknown;
  try { await pending; } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(ClaudeControlRefusal);
  expect(failure).toBeInstanceOf(CapabilityError);
  expect(failure).toMatchObject({ refusal, category });
  expect((failure as Error).message).not.toMatch(UNSAFE);
  return failure as ClaudeControlRefusal;
}
function refusedNow(fn: () => unknown, refusal: ClaudeControlRefusalCode, category: string): ClaudeControlRefusal {
  let failure: unknown;
  try { fn(); } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(ClaudeControlRefusal);
  expect(failure).toMatchObject({ refusal, category });
  return failure as ClaudeControlRefusal;
}
async function acknowledgedExecution(answer: () => unknown = () => ({ still_queued: [] })): Promise<ClaudeControlExecution> {
  const execution = await executeClaudeControl(permit(), deps(fakeSeam(answer)));
  if (execution.status !== "acknowledged") throw new Error(`expected an acknowledged execution, got ${JSON.stringify(execution)}`);
  return execution;
}

afterEach(() => { vi.restoreAllMocks(); });

describe("intake: only a permitted interrupt decision minted by decideControl reaches the seam (A2)", () => {
  it("refuses every denied decision with a typed error carrying the core's category and policy; the seam records zero calls", async () => {
    const cases: [Partial<NativeControlRequest>, ObservationProjection?][] = [
      [{ grants: undefined }],
      [{ grants: ["observe:claude-agent-sdk.session.inspect"] }],
      [{ grants: ["claude-agent-sdk:interrupt"] }],
      // A revoked control:claude-agent-sdk.interrupt grant: another control grant survives, the exact one is gone.
      [{ grants: ["observe:claude-agent-sdk.session.inspect", "control:furnace.stop"] }],
      [{ action: "stop", grants: ["control:claude-agent-sdk.stop"] }],
      [{ invocationId: "" }],
      [{ target: { ...SESSION, id: "sess-unseen" } }],
      [{ principal: { id: "intruder" } }],
      [{}, observe([SESSION, SUBAGENT], [])],
      // interrupt is destructive (control.ts DESTRUCTIVE_CONTROL_ACTIONS): explicit operator confirmation or nothing.
      [{ params: {} }],
      [{ params: { confirmed: "true" } }],
      [{ params: undefined }],
    ];
    const fake = fakeSeam();
    const policies = new Set<string>();
    for (const [overrides, projection] of cases) {
      const decision = decide(overrides, projection);
      if (decision.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      policies.add(decision.policy);
      const error = await refused(executeClaudeControl(decision, deps(fake)), "denied-decision", decision.category);
      expect(error.policy).toBe(decision.policy);
      expect(error.message).not.toContain(decision.reason);
    }
    expect([...policies].sort()).toStrictEqual(["cross-scope", "malformed-request", "missing-exact-grant", "no-confirmed-ownership", "observer-only",
      "operator-confirmation", "unknown-action", "unknown-permission-data"]);
    expect(fake.calls()).toBe(0);
  });

  it("refuses a raw request, look-alikes, phase-advanced or forged receipts as unvetted, before the seam and without reading accessors", async () => {
    const fake = fakeSeam();
    const genuine = permit();
    const { receipt } = genuine;
    const forged = (patch: Record<string, unknown>): unknown => Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt, ...patch }) });
    const getter = vi.fn(() => "permitted");
    const acked = acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: CLAUDE_INTERRUPT_NO_RECEIPT });
    const unvetted: unknown[] = [
      request(), { ...request(), decision: "permitted" }, undefined, null, "permitted", 42, [], [genuine], Object.freeze([genuine]),
      { decision: "permitted" }, Object.freeze({ decision: "permitted" }), { ...genuine }, Object.freeze({ decision: "permitted", receipt: { ...receipt } }),
      Object.freeze(Object.defineProperty({ receipt }, "decision", { enumerable: true, get: getter })),
      Object.freeze({ decision: "permitted", receipt: acked }),
      Object.freeze({ decision: "permitted", receipt: settle(acked, { outcome: "cancelled", nativeResultRef: "claude-agent-sdk:session:x:cancelled", settledAt: SETTLED_AT }) }),
      forged({ phase: "acknowledged" }), forged({ contractVersion: "workbench.control/v0" }), forged({ policy: "exact-grant" }),
      forged({ grant: "claude-agent-sdk:interrupt" }), forged({ grant: "control:claude-agent-sdk.stop" }), forged({ grant: "control:claude-agent-sdk" }),
      // Forging a verb the landed core does not admit cannot widen the executable set, whatever grant it carries.
      forged({ action: "steer", grant: "control:claude-agent-sdk.steer" }), forged({ action: "stop", grant: "control:claude-agent-sdk.stop" }),
      forged({ action: "setPermissionMode", grant: "control:claude-agent-sdk.setPermissionMode" }),
      forged({ action: "__proto__", grant: "control:claude-agent-sdk.__proto__" }),
      forged({ target: Object.freeze({ ...receipt.target, provider: "furnace" }), grant: "control:furnace.interrupt" }),
      // An inherited name never resolves a provider's allowlist, and a polluted prototype cannot manufacture one.
      forged({ target: Object.freeze({ ...receipt.target, provider: "toString" }), grant: "control:toString.interrupt" }),
      forged({ target: Object.freeze({ ...receipt.target, provider: "polluted" }), grant: "control:polluted.interrupt" }),
      forged({ target: { ...receipt.target } }), forged({ scope: { ...receipt.scope } }), forged({ principal: { ...receipt.principal } }),
      forged({ requestId: "ctl_short" }), forged({ requestId: "--force" }), forged({ requestId: undefined }),
      // A decision whose reads throw is no decision the core minted, and never a raw exception.
      revoked(), trapping({ decision: "permitted", receipt }), Object.freeze({ decision: "permitted", receipt: revoked() }),
    ];
    const proto = Object.prototype as Record<string, unknown>;
    try {
      proto.polluted = ["interrupt"];
      for (const value of unvetted) await refused(executeClaudeControl(value as ControlDecision, deps(fake)), "unvetted-decision", "validation");
    } finally { Reflect.deleteProperty(proto, "polluted"); }
    expect(Object.hasOwn(Object.prototype, "polluted")).toBe(false);
    expect(getter).not.toHaveBeenCalled();
    expect(fake.calls()).toBe(0);
    // No refusal above touched the genuine permit, which still executes exactly once.
    await expect(executeClaudeControl(genuine, deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.calls()).toBe(1);
  });

  it("executes a permit once: re-executing it or re-wrapping its receipt is refused, also when submitted concurrently", async () => {
    const fake = fakeSeam();
    const decision = permit();
    await executeClaudeControl(decision, deps(fake));
    await refused(executeClaudeControl(decision, deps(fake)), "permit-consumed", "validation");
    await refused(executeClaudeControl(Object.freeze({ decision: "permitted", receipt: decision.receipt }), deps(fake)), "permit-consumed", "validation");
    expect(fake.interrupt).toHaveBeenCalledTimes(1);
    const twice = permit();
    const settled = await Promise.allSettled([executeClaudeControl(twice, deps(fake)), executeClaudeControl(twice, deps(fake))]);
    expect(settled.map(outcome => outcome.status)).toStrictEqual(["fulfilled", "rejected"]);
    expect(settled[1]).toMatchObject({ reason: { refusal: "permit-consumed" } });
    expect(fake.interrupt).toHaveBeenCalledTimes(2);
    expect(fake.calls()).toBe(2);
  });

  it("a refusal before issuing never spends the permit; a permit spent on an uncertain outcome stays spent", async () => {
    const fake = fakeSeam();
    const decision = permit();
    await refused(executeClaudeControl(decision, deps(fake, { timeoutMs: 0 })), "invalid-deps", "validation");
    await refused(executeClaudeControl(decision, deps(fake, { call: { invocationId: CALL.invocationId, index: CALL.index } })), "unbound-session", "unavailable");
    const cancelled = new AbortController();
    cancelled.abort();
    await refused(executeClaudeControl(decision, deps(fake, { signal: cancelled.signal })), "aborted-before-issue", "transport");
    expect(fake.calls()).toBe(0);
    fake.interrupt.mockRejectedValueOnce(new Error("lost"));
    await expect(executeClaudeControl(decision, deps(fake))).resolves.toMatchObject({ status: "uncertain" });
    await refused(executeClaudeControl(decision, deps(fake)), "permit-consumed", "validation");
    expect(fake.calls()).toBe(1);
  });
});

describe("closed verb allowlist imported from the landed core and cited to the vendored SDK (A1)", () => {
  it("executes exactly NATIVE_CONTROL_ACTIONS['claude-agent-sdk'] (today ['interrupt']): frozen, destructive, never a second spelling", () => {
    expect(CLAUDE_CONTROL_VERBS).toStrictEqual([...NATIVE_CONTROL_ACTIONS["claude-agent-sdk"]]);
    expect(CLAUDE_CONTROL_VERBS).toStrictEqual(["interrupt"]);
    expect(Object.isFrozen(CLAUDE_CONTROL_VERBS)).toBe(true);
    expect(() => { (CLAUDE_CONTROL_VERBS as string[]).push("steer"); }).toThrow(TypeError);
    for (const verb of CLAUDE_CONTROL_VERBS) expect(DESTRUCTIVE_CONTROL_ACTIONS).toContain(verb);
  });

  it("each executable verb is a zero-argument Query control request of the vendored SDK 0.3.300 (sdk.d.ts:2882) with its receipt (:4668-4678)", () => {
    const sdk = new URL("../node_modules/@anthropic-ai/claude-agent-sdk/", import.meta.url);
    expect(JSON.parse(readFileSync(new URL("package.json", sdk), "utf8")).version).toBe("0.3.300");
    // The vendored declaration file uses CRLF line endings.
    const lines = readFileSync(new URL("sdk.d.ts", sdk), "utf8").split(/\r?\n/);
    const lineOf = (text: string): number => lines.indexOf(text) + 1;
    const start = lineOf("export declare interface Query extends AsyncGenerator<SDKMessage, void> {");
    const end = lines.indexOf("}", start) + 1;
    expect(start).toBe(2868);
    expect(end).toBeGreaterThan(start);
    for (const verb of CLAUDE_CONTROL_VERBS) {
      const line = lines.findIndex((text, index) => index >= start && index < end && text.startsWith(`    ${verb}(`)) + 1;
      expect(lines[line - 1]).toBe(`    ${verb}(): Promise<SDKControlInterruptResponse | undefined>;`);
      expect(line).toBe(2882);
    }
    expect(lineOf("export declare type SDKControlInterruptResponse = {")).toBe(4668);
    expect(lines[4671]).toBe("    still_queued: string[];");
    expect(lines[4677]).toBe("    cancelled?: string[];");
  });

  it("never forwards a guessed or unlisted verb, for any principal or target", async () => {
    const fake = fakeSeam();
    const guesses = ["stop", "cancel", "kill", "abort", "close", "return", "throw", "steer", "setPermissionMode", "setModel", "stopTask", "Interrupt",
      "INTERRUPT", "__proto__", "constructor", "toString"];
    for (const action of guesses) {
      for (const target of [SESSION, SUBAGENT]) {
        for (const grants of [[`control:claude-agent-sdk.${action.toLowerCase()}`], ["observe:claude-agent-sdk.session.inspect"], ["control:claude-agent-sdk.interrupt"]]) {
          const decision = decide({ target: { ...target }, action, grants });
          expect(decision.decision).toBe("denied");
          await refused(executeClaudeControl(decision, deps(fake)), "denied-decision", decision.decision === "denied" ? decision.category : "");
        }
      }
    }
    expect(fake.calls()).toBe(0);
  });

  it("refuses a genuine permit it has no seam binding for: another producer's verb or a target that is not the SDK session", async () => {
    const fake = fakeSeam();
    const run: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
    const attempt: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };
    const furnace = permit({ grants: ["control:furnace.stop"], target: run, action: "stop" }, observe([run, attempt], [owns(run, attempt, "frn-req-1")]));
    await refused(executeClaudeControl(furnace, deps(fake)), "unsupported-verb", "validation");
    const operation: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
    const step: NativeRef = { provider: "forge", type: "step", id: "op-1:lint" };
    const forge = permit({ grants: ["control:forge.cancel"], target: operation, action: "cancel" }, observe([operation, step], [owns(operation, step, "forge-op-1")]));
    await refused(executeClaudeControl(forge, deps(fake)), "unsupported-verb", "validation");
    // The core admits interrupt on any claude-agent-sdk node it sees owned; Query.interrupt() acts on the session's query only.
    const tool: NativeRef = { provider: "claude-agent-sdk", type: "tool-use", id: "toolu_01" };
    for (const target of [SUBAGENT, tool]) {
      const child: NativeRef = { provider: "claude-agent-sdk", type: "subagent", id: `${target.id}:child` };
      const decision = permit({ target }, observe([target, child], [owns(target, child, target.id)]));
      await refused(executeClaudeControl(decision, deps(fake, { call: { ...CALL, sessionId: target.id } })), "unsupported-target", "validation");
    }
    // A polluted Object.prototype cannot bind a seam method to another producer's verb.
    const polluted = vi.fn(async (): Promise<unknown> => undefined);
    const proto = Object.prototype as Record<string, unknown>;
    try {
      proto.stop = polluted;
      await refused(executeClaudeControl(permit({ grants: ["control:furnace.stop"], target: run, action: "stop" },
        observe([run, attempt], [owns(run, attempt, "frn-req-1")])), deps(fake)), "unsupported-verb", "validation");
    } finally { Reflect.deleteProperty(proto, "stop"); }
    expect(Object.hasOwn(Object.prototype, "stop")).toBe(false);
    expect(polluted).not.toHaveBeenCalled();
    expect(fake.calls()).toBe(0);
  });
});

describe("the seam is the control channel of exactly one call's live query (owner constraint 1)", () => {
  it("calls interrupt() exactly once, as a method of the injected seam and with no argument, and nothing else the query carries", async () => {
    const fake = fakeSeam();
    const execution = await executeClaudeControl(permit(), deps(fake));
    expect(execution.status).toBe("acknowledged");
    expect(fake.interrupt).toHaveBeenCalledTimes(1);
    // No argument: the request never carries cancel_queued (sdk.d.ts:4656), so queued commands survive and are reported.
    expect(fake.interrupt.mock.calls[0]).toStrictEqual([]);
    expect(fake.interrupt.mock.contexts[0]).toBe(fake.seam);
    for (const other of Object.values(fake.others)) expect(other).not.toHaveBeenCalled();
    // A retained query whose interrupt() reads its own state through `this`, as the SDK's does, is handed over unchanged.
    class RetainedQuery {
      interrupts = 0;
      async interrupt(): Promise<unknown> {
        this.interrupts++;
        return { still_queued: [] };
      }
    }
    const query = new RetainedQuery();
    await expect(executeClaudeControl(permit({ invocationId: "inv-control-2" }), deps({ seam: query }))).resolves.toMatchObject({ status: "acknowledged" });
    expect(query.interrupts).toBe(1);
  });

  it("refuses before the seam when the call is not bound to the target session: an unknown session id or another session", async () => {
    const fake = fakeSeam();
    await refused(executeClaudeControl(permit(), deps(fake, { call: { invocationId: CALL.invocationId, index: CALL.index } })), "unbound-session", "unavailable");
    await refused(executeClaudeControl(permit(), deps(fake, { call: { ...CALL, sessionId: "0b1c2d3e-0000-4000-8000-000000000000" } })), "foreign-session",
      "authorization");
    expect(fake.calls()).toBe(0);
  });

  it("refuses invalid dependencies and a malformed call identity before the seam", async () => {
    const fake = fakeSeam();
    const invalid: Partial<ClaudeControlDeps>[] = [
      { timeoutMs: 0 }, { timeoutMs: -1 }, { timeoutMs: 1.5 }, { timeoutMs: Number.NaN }, { timeoutMs: 2 ** 31 }, { timeoutMs: "5000" as unknown as number },
      { now: "now" as unknown as () => string }, { seam: {} as ClaudeInterruptSeam }, { seam: undefined as unknown as ClaudeInterruptSeam },
      { seam: { interrupt: "interrupt" } as unknown as ClaudeInterruptSeam }, { signal: { aborted: false } as unknown as AbortSignal },
      { call: undefined as unknown as ClaudeControlCall }, { call: { ...CALL, invocationId: "" } }, { call: { ...CALL, invocationId: "inv\u001b[31m" } },
      { call: { ...CALL, invocationId: "x".repeat(257) } }, { call: { ...CALL, index: -1 } }, { call: { ...CALL, index: 1.5 } },
      { call: { ...CALL, index: "2" as unknown as number } }, { call: { ...CALL, sessionId: `${SESSION_ID}\u202e` } }, { call: { ...CALL, sessionId: "" } },
      { call: revoked() as ClaudeControlCall }, { call: trapping({ ...CALL }) as ClaudeControlCall },
    ];
    for (const overrides of invalid) await refused(executeClaudeControl(permit(), deps(fake, overrides)), "invalid-deps", "validation");
    await refused(executeClaudeControl(permit(), undefined as unknown as ClaudeControlDeps), "invalid-deps", "validation");
    expect(fake.calls()).toBe(0);
  });
});

describe("requested -> acknowledged stay distinct: the acknowledgement echoes the SDK's own answer, never minted (A4, constraint 3)", () => {
  it("an interrupt receipt acknowledges through the core with its still_queued count, the survivors echoed through the sanitizers", async () => {
    const fake = fakeSeam(() => ({ still_queued: ["c0ffee00-0000-4000-8000-000000000001", "c0ffee00-0000-4000-8000-000000000002"] }));
    const decision = permit();
    const requested: RequestedControlReceipt = decision.receipt;
    const execution = await executeClaudeControl(decision, deps(fake));
    const acknowledged = acknowledge(requested, { acknowledgedAt: ACKED_AT, nativeAckRef: "claude-agent-sdk:interrupt_receipt_v1:still_queued=2" });
    expect(execution).toStrictEqual({ verb: "interrupt", status: "acknowledged", outcome: "unknown", call: CALL, requested, acknowledged, receipt: acknowledged,
      echo: { receipt: "interrupt_receipt_v1", stillQueued: 2, stillQueuedIds: ["c0ffee00-0000-4000-8000-000000000001", "c0ffee00-0000-4000-8000-000000000002"],
        idsTruncated: false } });
    expect(execution.requested).toBe(requested);
    expect(execution.receipt).toBe(execution.acknowledged);
    expect([execution.requested.phase, execution.acknowledged?.phase]).toStrictEqual(["requested", "acknowledged"]);
    for (const value of [execution, execution.call, execution.echo, execution.echo?.stillQueuedIds, execution.acknowledged]) expect(Object.isFrozen(value)).toBe(true);
    expect(execution).not.toHaveProperty("result");
    expect(execution).not.toHaveProperty("uncertainty");
  });

  it("an undefined resolution (older CLIs, or a host seam resolving nothing) acknowledges with the named no-receipt marker, never a fabricated uuid", async () => {
    expect(CLAUDE_INTERRUPT_NO_RECEIPT).toBe("claude-agent-sdk:interrupt:no-receipt");
    for (const [index, seam] of [fakeSeam().seam, { interrupt: async (): Promise<void> => {} }].entries()) {
      const decision = permit({ invocationId: `inv-control-void-${index}` });
      const execution = await executeClaudeControl(decision, deps({ seam }));
      const acknowledged = acknowledge(decision.receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: CLAUDE_INTERRUPT_NO_RECEIPT });
      expect(execution).toStrictEqual({ verb: "interrupt", status: "acknowledged", outcome: "unknown", call: CALL, requested: decision.receipt, acknowledged,
        receipt: acknowledged, echo: { receipt: "none" } });
      expect(JSON.stringify(execution.echo)).not.toMatch(/[0-9a-f]{8}-/);
    }
  });

  it("echoes a cancelled list it never asked for by count, never hides it", async () => {
    const execution = await acknowledgedExecution(() => ({ still_queued: [], cancelled: ["c0ffee00-0000-4000-8000-00000000000a"] }));
    expect(execution.acknowledged?.nativeAckRef).toBe("claude-agent-sdk:interrupt_receipt_v1:still_queued=0:cancelled=1");
    expect(execution.echo).toStrictEqual({ receipt: "interrupt_receipt_v1", stillQueued: 0, stillQueuedIds: [], idsTruncated: false, cancelled: 1 });
  });

  it("parks an answer outside the SDK's declared shape as unattributable: never acknowledged, never settled, accessors never read", async () => {
    const getter = vi.fn(() => []);
    const sparse: string[] = [];
    sparse[1] = "c0ffee00-0000-4000-8000-000000000001";
    const answers: unknown[] = [
      null, {}, [], "ok", 42, true, Symbol("ack"), { still_queued: "c0ffee00" }, { still_queued: [1] }, { still_queued: ["a", 2] }, { still_queued: sparse },
      { still_queued: ["a"], cancelled: "b" }, { still_queued: ["a"], cancelled: [3] }, { cancelled: ["a"] },
      { still_queued: new Array(1025).fill("a") },
      Object.defineProperty({}, "still_queued", { enumerable: true, get: getter }), Object.create({ still_queued: [] }),
      // An answer whose reads throw is unattributable, never an exception after interrupt() was issued. (Resolving a
      // revoked proxy itself rejects the seam's promise, a seam failure covered with the rejections below.)
      trapping({ still_queued: [] }), { still_queued: revoked() },
    ];
    for (const answer of answers) {
      const fake = fakeSeam(() => answer);
      const decision = permit();
      const execution = await executeClaudeControl(decision, deps(fake));
      expect(execution).toStrictEqual({ verb: "interrupt", status: "uncertain", outcome: "unknown", call: CALL, requested: decision.receipt, receipt: decision.receipt,
        uncertainty: { reason: "unattributable-answer" }, reconcileHint: CLAUDE_CONTROL_RECONCILE });
      expect(fake.calls()).toBe(1);
      refusedNow(() => settleClaudeInterrupt(execution, observed("cancelled"), SETTLE), "unvetted-execution", "validation");
    }
    expect(getter).not.toHaveBeenCalled();
  });

  it("parks rather than throws when the core refuses to mint the acknowledged phase after interrupt() was issued", async () => {
    for (const now of [clock("soon"), clock("2026-10-15T07:00:02"), () => { throw new Error("clock gone"); }]) {
      const fake = fakeSeam(() => ({ still_queued: [] }));
      const decision = permit();
      const execution = await executeClaudeControl(decision, deps(fake, { now }));
      expect(execution).toMatchObject({ status: "uncertain", outcome: "unknown", receipt: { phase: "requested" }, uncertainty: { reason: "receipt-refused" },
        echo: { receipt: "interrupt_receipt_v1", stillQueued: 0 } });
      expect(execution).not.toHaveProperty("acknowledged");
      expect(fake.calls()).toBe(1);
    }
  });
});

describe("transport success is never domain verification: a result exists only from the call's observed terminal (A5, constraint 3)", () => {
  it("a resolved interrupt never settles by itself: the execution stays acknowledged with outcome unknown and no result phase", async () => {
    for (const answer of [() => undefined, () => ({ still_queued: [] }), () => ({ still_queued: ["c0ffee00-0000-4000-8000-000000000001"] })]) {
      const execution = await acknowledgedExecution(answer);
      expect(execution).toMatchObject({ status: "acknowledged", outcome: "unknown", receipt: { phase: "acknowledged" } });
      expect(execution).not.toHaveProperty("result");
      expect(JSON.stringify(execution)).not.toMatch(/"(?:completed|cancelled|failed)"/);
    }
  });

  it("settles through the core's settle from the observer's terminal for this call; only the call's own cancellation settles cancelled", async () => {
    expect(CLAUDE_INTERRUPT_OUTCOMES).toStrictEqual({ succeeded: "unknown", failed: "unknown", cancelled: "cancelled", observation_lost: "unknown" });
    expect(Object.isFrozen(CLAUDE_INTERRUPT_OUTCOMES)).toBe(true);
    for (const terminal of ["succeeded", "failed", "cancelled", "observation_lost"] as const) {
      const execution = await acknowledgedExecution();
      const { acknowledged } = execution;
      if (!acknowledged) throw new Error("expected an acknowledged receipt");
      const settled = settleClaudeInterrupt(execution, observed(terminal), SETTLE);
      const result = settle(acknowledged, { outcome: CLAUDE_INTERRUPT_OUTCOMES[terminal], nativeResultRef: `claude-agent-sdk:session:${SESSION_ID}:${terminal}@${OBSERVED_AT}`,
        settledAt: SETTLED_AT });
      expect(settled).toStrictEqual({ verb: "interrupt", status: "settled", outcome: CLAUDE_INTERRUPT_OUTCOMES[terminal], call: CALL, requested: execution.requested,
        acknowledged, result, receipt: result, echo: execution.echo, observed: { terminal, freshness: "current", observedAt: OBSERVED_AT } });
      expect(settled.receipt).toBe(settled.result);
      expect([settled.requested.phase, settled.acknowledged?.phase, settled.result?.phase]).toStrictEqual(["requested", "acknowledged", "result"]);
      for (const value of [settled, settled.observed, settled.result]) expect(Object.isFrozen(value)).toBe(true);
      // The acknowledged execution is never rewritten: a new execution carries the result.
      expect(execution).toMatchObject({ status: "acknowledged", outcome: "unknown" });
      expect(execution).not.toHaveProperty("result");
    }
  });

  it("a terminal read from a lost stream (freshness unknown) never settles a definite outcome", async () => {
    const settled = settleClaudeInterrupt(await acknowledgedExecution(), observed("cancelled", { freshness: "unknown" }), SETTLE);
    expect(settled).toMatchObject({ status: "settled", outcome: "unknown", result: { outcome: "unknown" }, observed: { terminal: "cancelled", freshness: "unknown" } });
  });

  it("refuses to settle without this call's terminal: still running, another call or session, a foreign provider, an observation older than the acknowledgement", async () => {
    const execution = await acknowledgedExecution();
    const inputs: [unknown, ClaudeControlRefusalCode, string][] = [
      [observed(undefined), "no-terminal", "unavailable"],
      [{ ...observed("cancelled"), call: { invocationId: CALL.invocationId, index: CALL.index + 1 } }, "foreign-observation", "validation"],
      [{ ...observed("cancelled"), call: { invocationId: "inv-workflow-2", index: CALL.index } }, "foreign-observation", "validation"],
      [observed("cancelled", { sessionId: "0b1c2d3e-0000-4000-8000-000000000000" }), "foreign-observation", "validation"],
      [observed("cancelled", { sessionId: undefined }), "foreign-observation", "validation"],
      [observed("cancelled", { provider: "pi-workflow" as "claude-agent-sdk" }), "foreign-observation", "validation"],
      [observed("cancelled", {}, "2026-10-15T07:00:01Z"), "stale-observation", "validation"],
      [observed("cancelled", {}, "later"), "invalid-observation", "validation"],
      [observed("cancelled", {}, "api_key=TOPSECRET 2026-10-15 07:00:05+00:00"), "invalid-observation", "validation"],
      [observed("interrupted" as "cancelled"), "invalid-observation", "validation"],
      [observed("cancelled", { freshness: "stale" as "current" }), "invalid-observation", "validation"],
      [{ call: { invocationId: CALL.invocationId, index: CALL.index }, observedAt: OBSERVED_AT }, "invalid-observation", "validation"],
      [{ observation: observed("cancelled").observation, observedAt: OBSERVED_AT }, "invalid-observation", "validation"],
      [undefined, "invalid-observation", "validation"],
      [revoked(), "invalid-observation", "validation"],
      [{ ...observed("cancelled"), observation: revoked() }, "invalid-observation", "validation"],
      [{ ...observed("cancelled"), observation: trapping({ ...observed("cancelled").observation }) }, "invalid-observation", "validation"],
    ];
    for (const [input, refusal, category] of inputs) {
      const error = refusedNow(() => settleClaudeInterrupt(execution, input as ClaudeObservedTerminal, SETTLE), refusal, category);
      expect(error.message).not.toContain("TOPSECRET");
    }
    // No refusal consumed the acknowledged execution; the genuine terminal still settles it once.
    expect(settleClaudeInterrupt(execution, observed("cancelled"), SETTLE)).toMatchObject({ status: "settled", outcome: "cancelled" });
  });

  it("settles once, and only an execution this adapter acknowledged", async () => {
    const execution = await acknowledgedExecution();
    settleClaudeInterrupt(execution, observed("cancelled"), SETTLE);
    refusedNow(() => settleClaudeInterrupt(execution, observed("failed"), SETTLE), "result-consumed", "validation");
    const uncertain = await executeClaudeControl(permit(), deps(fakeSeam(() => { throw new Error("lost"); })));
    const other = await acknowledgedExecution();
    const settled = settleClaudeInterrupt(other, observed("succeeded"), SETTLE);
    for (const value of [uncertain, settled, { ...execution }, Object.freeze({ ...execution }), undefined, null, "acknowledged"]) {
      refusedNow(() => settleClaudeInterrupt(value as ClaudeControlExecution, observed("cancelled"), SETTLE), value === settled ? "result-consumed" : "unvetted-execution",
        "validation");
    }
  });

  it("a settle whose clock the core refuses mints nothing and leaves the execution settleable", async () => {
    const execution = await acknowledgedExecution();
    for (const now of [() => "soon", () => "2026-10-15T07:00:06", () => { throw new Error("clock gone"); }]) {
      refusedNow(() => settleClaudeInterrupt(execution, observed("cancelled"), { now }), "receipt-refused", "validation");
    }
    refusedNow(() => settleClaudeInterrupt(execution, observed("cancelled"), undefined as unknown as typeof SETTLE), "invalid-deps", "validation");
    expect(settleClaudeInterrupt(execution, observed("cancelled"), SETTLE)).toMatchObject({ status: "settled", result: { settledAt: SETTLED_AT } });
  });
});

describe("park, never retry and never abort: rejection, timeout and indeterminate answers stay uncertain after exactly one interrupt() (A3, constraints 4-5)", () => {
  it("parks every seam rejection with a bounded named category and never echoes the SDK's message", async () => {
    const refusedBySdk = (fields: Record<string, unknown>): Error => Object.assign(new Error("Bearer TOPSECRET query is not interruptible"), fields);
    const accessor = Object.defineProperty(new Error("TOPSECRET"), "errorClass", { get: () => "control_request_failed" });
    const failures: [unknown, Record<string, string>][] = [
      [refusedBySdk({ errorClass: "control_request_failed", errorCode: "not_interruptible" }), { category: "sdk-refused", code: "not_interruptible" }],
      [refusedBySdk({ errorClass: "control_request_failed" }), { category: "sdk-refused" }],
      [refusedBySdk({ errorClass: "control_request_failed", errorCode: "Bearer TOPSECRET" }), { category: "sdk-refused" }],
      [refusedBySdk({ errorClass: "control_request_failed", errorCode: "not\u001b[31m_interruptible" }), { category: "sdk-refused" }],
      [refusedBySdk({ errorClass: "Control_Request_Failed", errorCode: "not_interruptible" }), { category: "transport" }],
      // The SDK's own fixed text when the query closed before the CLI answered (sdk.mjs Jx), matched exactly, never echoed.
      [new Error("Query closed before response received"), { category: "query-closed" }],
      [new Error("Query closed before response received: TOPSECRET"), { category: "transport" }],
      [new Error("Bearer TOPSECRET"), { category: "transport" }],
      [new CapabilityError("transport", "TOPSECRET"), { category: "transport" }],
      [accessor, { category: "transport" }],
      ["TOPSECRET", { category: "transport" }],
      [undefined, { category: "transport" }],
      // A rejection whose reads throw is a transport failure, never an exception after interrupt() was issued.
      [revoked(), { category: "transport" }],
      [trapping({ errorClass: "control_request_failed", errorCode: "not_interruptible" }), { category: "transport" }],
    ];
    for (const [error, failure] of failures) {
      const fake = fakeSeam();
      const decision = permit();
      fake.interrupt.mockRejectedValueOnce(error);
      const execution = await executeClaudeControl(decision, deps(fake));
      expect(execution).toStrictEqual({ verb: "interrupt", status: "uncertain", outcome: "unknown", call: CALL, requested: decision.receipt, receipt: decision.receipt,
        uncertainty: { reason: "seam-failure", failure }, reconcileHint: CLAUDE_CONTROL_RECONCILE });
      expect(JSON.stringify(execution)).not.toContain("TOPSECRET");
      expect(Object.isFrozen(execution.uncertainty)).toBe(true);
      expect(Object.isFrozen(execution.uncertainty?.failure)).toBe(true);
      expect(fake.interrupt).toHaveBeenCalledTimes(1);
      expect(fake.calls()).toBe(1);
    }
    expect(CLAUDE_CONTROL_RECONCILE).toContain("remains uncertain and is not retried automatically");
  });

  it("parks a synchronous seam throw as a seam failure after one call", async () => {
    const fake = fakeSeam();
    fake.interrupt.mockImplementationOnce(() => { throw new TypeError("TOPSECRET"); });
    const execution = await executeClaudeControl(permit(), deps(fake));
    expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "seam-failure", failure: { category: "transport" } } });
    expect(fake.calls()).toBe(1);
  });

  it("stops waiting at the bound, discards the late answer and never re-issues interrupt()", async () => {
    const fake = fakeSeam();
    let release: (value: unknown) => void = () => {};
    fake.interrupt.mockImplementationOnce(() => new Promise(resolve => { release = resolve; }));
    const decision = permit();
    const started = Date.now();
    const execution = await executeClaudeControl(decision, deps(fake, { timeoutMs: 25 }));
    expect(Date.now() - started).toBeLessThan(2_000);
    expect(execution).toStrictEqual({ verb: "interrupt", status: "uncertain", outcome: "unknown", call: CALL, requested: decision.receipt, receipt: decision.receipt,
      uncertainty: { reason: "wait-timeout" }, reconcileHint: CLAUDE_CONTROL_RECONCILE });
    release({ still_queued: [] });
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(execution.status).toBe("uncertain");
    expect(fake.calls()).toBe(1);
  });

  it("an abort after interrupt() is issued stops only the wait, also when the seam aborts synchronously", async () => {
    for (const abortSynchronously of [false, true]) {
      const fake = fakeSeam();
      const controller = new AbortController();
      fake.interrupt.mockImplementationOnce(() => {
        if (abortSynchronously) controller.abort();
        else queueMicrotask(() => controller.abort());
        return new Promise(() => {});
      });
      const started = Date.now();
      const execution = await executeClaudeControl(permit(), deps(fake, { signal: controller.signal }));
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS);
      expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "wait-aborted" }, receipt: { phase: "requested" } });
      expect(fake.calls()).toBe(1);
    }
  });

  it("never falls back to abort, close, return or any other query method, whatever went wrong", async () => {
    const modes: ((fake: ReturnType<typeof fakeSeam>) => Partial<ClaudeControlDeps>)[] = [
      fake => { fake.interrupt.mockRejectedValueOnce(new Error("Query closed before response received")); return {}; },
      fake => { fake.interrupt.mockImplementationOnce(() => { throw new Error("sync"); }); return {}; },
      fake => { fake.interrupt.mockImplementationOnce(() => new Promise(() => {})); return { timeoutMs: 10 }; },
      fake => { fake.interrupt.mockResolvedValueOnce({ still_queued: "x" }); return {}; },
      fake => { fake.interrupt.mockResolvedValueOnce(undefined); return { now: () => "soon" }; },
    ];
    for (const mode of modes) {
      const fake = fakeSeam();
      const execution = await executeClaudeControl(permit(), deps(fake, mode(fake)));
      expect(execution.status).toBe("uncertain");
      expect(fake.interrupt).toHaveBeenCalledTimes(1);
      for (const other of Object.values(fake.others)) expect(other).not.toHaveBeenCalled();
    }
  });
});

describe("isolation: the adapter loads no SDK and no host, and has no path to the runtime abort (constraints 1, 5, 6)", () => {
  it("imports only the control core, the registry error, the shared sanitizers and the observer's type; no SDK, host, abort, dynamic import or hashing", () => {
    const source = readFileSync(new URL("../src/workbench/claude-control.ts", import.meta.url), "utf8");
    const modules = (pattern: RegExp): string[] => [...source.matchAll(pattern)].map(match => match[1]).sort();
    expect(modules(/^import\s+(?!type\s)[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["./capability-registry.js", "./control.js", "./redaction.js"]);
    expect(modules(/^import\s+type\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["../workflow/progress.js"]);
    expect(source).not.toMatch(/^import\s+["']/m);
    expect(source).not.toMatch(/["']@anthropic-ai\/|claude-host|abortAgent|AbortController|\.abort\s*\(|\bimport\s*\(|\brequire\s*\(|createHash|node:crypto|decideControl\(/);
  });
});

describe("sanitizer routing, bounds and the core's audit fields (A6)", () => {
  it("echoes only survivor ids the shared sanitizers leave unchanged (strip, redact, strip), at most 16; the ack ref carries only counts", async () => {
    // Withheld, never repaired: escapes, bidi marks, credentials (also split by an escape), unbounded or flag-shaped text.
    const hostile = ["c0ffee00\u001b[31m-0001", "Bearer TOPSECRET", "\u202espoofed\u2066", "api_key=TOPSECRET", "x".repeat(500), "\u0007",
      "Bea\u001b[0mrer TOPSECRET", "sk-ant-api03-TOPSECRET", "", "-flag-shaped"];
    const ids = Array.from({ length: 20 }, (_, index) => `c0ffee00-0000-4000-8000-${String(index).padStart(12, "0")}`);
    const execution = await acknowledgedExecution(() => ({ still_queued: [...hostile, ...ids] }));
    expect(execution.acknowledged?.nativeAckRef).toBe("claude-agent-sdk:interrupt_receipt_v1:still_queued=30");
    expect(execution.echo).toStrictEqual({ receipt: "interrupt_receipt_v1", stillQueued: 30, stillQueuedIds: ids.slice(0, 16), idsTruncated: true });
    const text = JSON.stringify(execution);
    expect(text).not.toContain("TOPSECRET");
    expect(text).not.toMatch(/\\u00(?:1b|07)|\\u202e|\\u2066/i);
    expect(Buffer.byteLength(text)).toBeLessThan(8_192);
    // Exactly 16 displayable survivors are all shown and none is withheld.
    const sixteen = await acknowledgedExecution(() => ({ still_queued: ids.slice(0, 16) }));
    expect(sixteen.echo).toStrictEqual({ receipt: "interrupt_receipt_v1", stillQueued: 16, stillQueuedIds: ids.slice(0, 16), idsTruncated: false });
  });

  it("every phase keeps the core's audit fields verbatim, and the core's retry-stable request id is never recomputed", async () => {
    const first = permit();
    const reissue = permit({ requestedAt: "2026-10-15T09:05:00+02:00" });
    const other = permit({ invocationId: "inv-control-2" });
    expect(reissue.receipt.requestId).toBe(first.receipt.requestId);
    expect(other.receipt.requestId).not.toBe(first.receipt.requestId);
    for (const decision of [first, reissue, other]) {
      const execution = await executeClaudeControl(decision, deps(fakeSeam(() => ({ still_queued: [] }))));
      const settled = settleClaudeInterrupt(execution, observed("cancelled"), SETTLE);
      for (const phase of [settled.requested, settled.acknowledged, settled.result]) {
        if (!phase) throw new Error("expected every phase");
        for (const key of AUDIT) expect(phase[key]).toStrictEqual(decision.receipt[key]);
      }
      expect(settled.requested.ownershipConfirmationRef).toBe(SESSION_ID);
    }
    const parked = await executeClaudeControl(permit({ invocationId: "inv-control-3" }), deps(fakeSeam(() => { throw new Error("lost"); })));
    expect(parked.receipt).toBe(parked.requested);
  });
});

/**
 * wb-69g.8 respin (gate-1 g2-gate-r2 cmd_b475c6dd6234 on 628db43; OWNER RULING 21:13Z; push-hold released 23:48Z). Spec lines
 * pinned, quoted:
 * - BOUNDARY 21:00Z standing seat rule (F6, adopted by the owner; it names this module): "every NEW display path landing after
 *   04cd6d4 calls sanitizeWorkbenchText with a NAMED layout, or asserts a DIRECT-CALLER row that joins the SITES corpus in the
 *   SAME commit".
 * - RESPIN SPEC (i): "failureOf errorCode via sanitizeWorkbenchText(code, bound, "label")".
 * - RESPIN SPEC (ii): "exact() names its layout ("text" — admission byte-identical)".
 * - RESPIN SPEC (iii): "the denied-decision policy echo becomes a closed-vocabulary check against the 8 ControlDenyPolicy values
 *   (kills G30); RED-FIRST falsifier = a forged frozen denial with policy "sk-ant-qqsecretqq" echoed verbatim on the delivered
 *   cut, green after".
 */
/** The core's denial vocabulary (control.ts ControlDenyPolicy); the first intake test proves decideControl mints exactly these. */
const DENY_POLICIES: readonly ControlDenyPolicy[] = ["unknown-permission-data", "observer-only", "malformed-request", "unknown-action",
  "missing-exact-grant", "cross-scope", "no-confirmed-ownership", "operator-confirmation"];
const cp = (code: number): string => String.fromCodePoint(code);

/** claude-control.ts parsed by the TypeScript compiler: code compared as printed without comments, never as raw text. */
function moduleSource(): ts.SourceFile {
  const path = new URL("../src/workbench/claude-control.ts", import.meta.url);
  return ts.createSourceFile("claude-control.ts", readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function printed(node: ts.Node, file: ts.SourceFile): string {
  return ts.createPrinter({ removeComments: true }).printNode(ts.EmitHint.Unspecified, node, file).replace(/\s+/g, " ").trim();
}
function nodesOf<T extends ts.Node>(root: ts.Node, test: (node: ts.Node) => node is T, found: T[] = []): T[] {
  if (test(root)) found.push(root);
  ts.forEachChild(root, child => {
    nodesOf(child, test, found);
  });
  return found;
}
function moduleFunction(file: ts.SourceFile, name: string): ts.FunctionDeclaration {
  const declared = file.statements.filter(ts.isFunctionDeclaration).filter(fn => fn.name?.text === name);
  expect(declared, `exactly one module-level ${name}()`).toHaveLength(1);
  return declared[0];
}

describe("wb-69g.8 respin: every display path is the one helper with a named layout; a denial echoes only the core's vocabulary", () => {
  it("echoes a denied decision's policy only from the core's ControlDenyPolicy vocabulary: a forged frozen denial's policy is withheld (iii, kills G30)", async () => {
    let invoked = false;
    const accessor = Object.freeze(Object.defineProperty({ decision: "denied", category: "authorization", reason: "forged" }, "policy",
      { enumerable: true, get: () => { invoked = true; return "observer-only"; } }));
    const policies: unknown[] = ["sk-ant-qqsecretqq", "sk-proj-qqsecretqq", "anything-goes", "observer-only ", "Observer-only", "observer_only",
      "constructor", "toString", "__proto__", "", 7, null];
    const forgeries: unknown[] = [...policies.map(policy => Object.freeze({ decision: "denied", category: "authorization", reason: "forged", policy })), accessor];
    const fake = fakeSeam();
    for (const forged of forgeries) {
      const failure = await refused(executeClaudeControl(forged as ControlDecision, deps(fake)), "denied-decision", "authorization");
      expect(failure.policy).toBeUndefined();
      expect(JSON.stringify({ message: failure.message, policy: failure.policy })).not.toMatch(/qqsecretqq|anything-goes|constructor|toString|__proto__/);
    }
    expect(invoked).toBe(false);
    // The vocabulary is the core's own, so a frozen denial naming one of its policies still echoes it: structural vetting only,
    // decision provenance is wb-pjj's.
    for (const policy of DENY_POLICIES) {
      const named = Object.freeze({ decision: "denied", category: "validation", reason: "forged", policy }) as ControlDecision;
      expect((await refused(executeClaudeControl(named, deps(fake)), "denied-decision", "validation")).policy).toBe(policy);
    }
    // Every decision the core returns is frozen, so an unfrozen denial-shaped value is no denial at all: unvetted, nothing echoed.
    const unfrozen = { decision: "denied", category: "validation", reason: "forged", policy: "observer-only" } as ControlDecision;
    expect((await refused(executeClaudeControl(unfrozen, deps(fake)), "unvetted-decision", "validation")).policy).toBeUndefined();
    expect(fake.calls()).toBe(0);
  });

  it("composes no sanitizer of its own: no stripUnsafeText or redactWorkbenchText, no local unsafe-unit pattern, every helper call names its layout (i, ii)", () => {
    const file = moduleSource();
    const identifiers = nodesOf(file, ts.isIdentifier).map(node => node.text);
    expect(identifiers).not.toContain("stripUnsafeText");
    expect(identifiers).not.toContain("redactWorkbenchText");
    // The one binding taken from the shared sanitizers is the one helper.
    const redaction = file.statements.filter(ts.isImportDeclaration)
      .filter(declaration => ts.isStringLiteral(declaration.moduleSpecifier) && declaration.moduleSpecifier.text === "./redaction.js");
    expect(redaction.map(declaration => printed(declaration, file))).toStrictEqual(['import { sanitizeWorkbenchText } from "./redaction.js";']);
    // No local unsafe-unit pattern: no regular expression names a property class, a default-ignorable or a code-point escape.
    for (const literal of nodesOf(file, ts.isRegularExpressionLiteral)) expect(literal.text).not.toMatch(/\\[pP]\{|Default_Ignorable|\\u|\\x/);
    // Every helper call is (value, bound, layout) with a layout the helper declares, spelled as a literal.
    const calls = nodesOf(file, ts.isCallExpression).filter(call => ts.isIdentifier(call.expression) && call.expression.text === "sanitizeWorkbenchText");
    expect(calls.length).toBeGreaterThanOrEqual(2);
    const layout = (call: ts.CallExpression): string | undefined => {
      const named = call.arguments[2];
      return call.arguments.length === 3 && named !== undefined && ts.isStringLiteral(named) ? named.text : undefined;
    };
    for (const call of calls) expect(["text", "terminal", "label", "lines"], printed(call, file)).toContain(layout(call));
    // The identity predicate reads the text layout (admission byte-identical); the SDK's errorCode is a single-line label.
    const layoutsIn = (name: string): (string | undefined)[] => nodesOf(moduleFunction(file, name), ts.isCallExpression).filter(call => calls.includes(call)).map(layout);
    expect(layoutsIn("exact")).toStrictEqual(["text"]);
    expect(layoutsIn("failureOf")).toStrictEqual(["label"]);
  });

  it("the identity predicate keeps the text layout's admission byte-identical: what only the label layout rewrites still binds; what the helper changes never does (ii)", async () => {
    // The label layout collapses inner whitespace (a NO-BREAK SPACE included) and would refuse these; the text layout leaves them
    // unchanged. An identity of exactly the 256-byte bound is displayed whole, never truncated.
    for (const invocationId of ["inv  workflow-1", `inv${cp(0xa0)}workflow-1`, "i".repeat(256)]) {
      if (invocationId.length < 256) expect(sanitizeWorkbenchText(invocationId, 256, "label")).not.toBe(invocationId);
      expect(sanitizeWorkbenchText(invocationId, 256, "text")).toBe(invocationId);
      const execution = await executeClaudeControl(permit(), deps(fakeSeam(), { call: { ...CALL, invocationId } }));
      expect(execution).toMatchObject({ status: "acknowledged", call: { invocationId } });
    }
    // Anything the helper would change, a credential or an unsafe unit, is refused as the call's identity, never repaired.
    const fake = fakeSeam();
    for (const invocationId of ["sk-ant-api03-qqsecretqq", "inv api_key=qqsecretqq", `inv${cp(0x200b)}1`, `inv${cp(0x1b)}[0m1`, `inv${cp(0x7)}1`]) {
      const failure = await refused(executeClaudeControl(permit(), deps(fake, { call: { ...CALL, invocationId } })), "invalid-deps", "validation");
      expect(failure.message).not.toContain("qqsecretqq");
    }
    expect(fake.calls()).toBe(0);
  });

  it("shows the SDK's errorCode through the helper's label layout: a credential-shaped code reads [REDACTED], never raw (i)", async () => {
    // The whole NATIVE_LABEL grammar fits the display bound: a 64-character code is shown unchanged, a 65-character one is not a code.
    for (const [errorCode, code] of [["e".repeat(64), "e".repeat(64)], ["e".repeat(65), undefined]] as const) {
      const fake = fakeSeam();
      fake.interrupt.mockRejectedValueOnce(Object.assign(new Error("refused"), { errorClass: "control_request_failed", errorCode }));
      const execution = await executeClaudeControl(permit(), deps(fake));
      expect(execution.uncertainty).toStrictEqual({ reason: "seam-failure", failure: { category: "sdk-refused", ...(code === undefined ? {} : { code }) } });
    }
    for (const errorCode of ["ghp_qqsecretqq", "github_pat_qqsecretqq"]) {
      const fake = fakeSeam();
      fake.interrupt.mockRejectedValueOnce(Object.assign(new Error("refused"), { errorClass: "control_request_failed", errorCode }));
      const execution = await executeClaudeControl(permit(), deps(fake));
      expect(sanitizeWorkbenchText(errorCode, 64, "label")).toBe("[REDACTED]");
      expect(execution.uncertainty).toStrictEqual({ reason: "seam-failure", failure: { category: "sdk-refused", code: "[REDACTED]" } });
      expect(JSON.stringify(execution)).not.toContain("qqsecretqq");
      expect(fake.calls()).toBe(1);
    }
  });
});

/**
 * wb-69g.8 respin, PROVENANCE LINE (owner wb-pjj R1(b) ruling, bound by name onto this respin mid-cut 02:29Z; the 21:08Z
 * per-adapter recipe): "this adapter's cut ... adds the FIRST-LINE isCoreMintedDecision(decision) check in the adapter's
 * decision-accepting entry and ONE ProvenanceSubject table row (a real minted decision accepted; a structurally identical
 * non-minted forgery refused)". The row is in test/workbench-control-provenance.test.ts. With provenance first, structural
 * vetting is unreachable through executeClaudeControl for any minted value, so (the landed furnace precedent,
 * test/workbench-control-provenance-depth.test.ts) it is the pure exported vetClaudeControlDecision, driven directly with
 * decisions the real core minted and forgeries of them, and one parse-aware census line pins the composition no behaviour
 * can reach. No module mock anywhere.
 */
const UNMINTED_TEXT = "decision was not minted by the decision core";
/** The structural refusal text claude-control.ts already used before provenance existed. */
const STRUCTURAL_TEXT = "Claude control executes only a permitted workbench.control/v1 decision minted by the control core.";
const DENIED_TEXT = "Claude control refuses a denied decision; interrupt() was not called.";
type Permit = ControlDecision & { decision: "permitted" };
type Table = readonly (readonly [string, unknown])[];

/** One request per deny policy of the core's ladder; each mints a real denial. */
const DENIALS: readonly (readonly [Partial<NativeControlRequest>, ObservationProjection?])[] = [
  [{ grants: undefined }], [{ grants: ["observe:claude-agent-sdk.session.inspect"] }], [{ invocationId: "" }],
  [{ action: "stop", grants: ["control:claude-agent-sdk.stop"] }], [{ grants: ["observe:claude-agent-sdk.session.inspect", "control:furnace.stop"] }],
  [{ target: { ...SESSION, id: "sess-unseen" } }], [{}, observe([SESSION, SUBAGENT], [])], [{ params: {} }],
];
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
    Object.freeze(value);
  }
  return value;
}
/** Copies of a real permit the core never minted that are structurally exact: structural vetting alone cannot tell them apart. */
function exactForgeries(genuine: Permit): Table {
  const { receipt } = genuine;
  return [
    ["deep-frozen JSON round-trip (a decision replayed from the audit or the journal)", deepFreeze(JSON.parse(JSON.stringify(genuine)))],
    ["deep-frozen structuredClone", deepFreeze(structuredClone(genuine))],
    ["hand-built permit carrying the genuine field values", deepFreeze({ decision: "permitted", receipt: { ...receipt, scope: { ...receipt.scope },
      principal: { ...receipt.principal }, target: { ...receipt.target } } })],
    ["frozen re-wrap of the genuine, unspent receipt", Object.freeze({ decision: "permitted", receipt })],
    ["forwarding proxy over the genuine permit", new Proxy(genuine, {})],
  ];
}
/**
 * One forgery per structural check, each built from a real permit (and its real acknowledged phase) with exactly one thing
 * wrong. The accessor's getter throws, so reading it instead of its own data descriptor fails as a raw error, not a refusal;
 * the two proxies throw on every read, which the vetting refuses rather than lets escape.
 */
function malformedForgeries(genuine: Permit): Table {
  const { receipt } = genuine;
  const forged = (patch: Record<string, unknown>): unknown => deepFreeze({ decision: "permitted", receipt: { ...structuredClone(receipt), ...patch } });
  const thawed = (key: "scope" | "principal" | "target"): unknown => Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt, [key]: { ...receipt[key] } }) });
  const accessor = Object.freeze(Object.defineProperty({ decision: "permitted" }, "receipt", { enumerable: true, get: (): never => {
    throw new Error("the receipt accessor was invoked");
  } }));
  return [
    ["undefined", undefined], ["null", null], ["the verdict string alone", "permitted"], ["a number", 42],
    ["a frozen array holding the permit", Object.freeze([genuine])],
    ["an unfrozen copy of the decision", { ...genuine }],
    ["a verdict that is neither permitted nor denied", Object.freeze({ decision: "approved", receipt })],
    ["no receipt", Object.freeze({ decision: "permitted" })],
    ["the receipt behind an accessor (never invoked)", accessor],
    ["an unfrozen receipt", Object.freeze({ decision: "permitted", receipt: { ...receipt } })],
    ["an unfrozen target", thawed("target")],
    ["an unfrozen scope", thawed("scope")],
    ["an unfrozen principal", thawed("principal")],
    ["another contract version", forged({ contractVersion: "workbench.control/v0" })],
    ["the core's own acknowledged phase", Object.freeze({ decision: "permitted", receipt: acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: CLAUDE_INTERRUPT_NO_RECEIPT }) })],
    ["a forged later phase", forged({ phase: "acknowledged" })],
    ["another permit policy", forged({ policy: "exact-grant" })],
    ["a provider that is not a string but names an admitted one", forged({ target: { ...receipt.target, provider: ["claude-agent-sdk"] } })],
    ["an action that is not a string", forged({ action: ["interrupt"] })],
    ["a provider the core admits no action for", forged({ target: { ...receipt.target, provider: "hyperunix" }, grant: "control:hyperunix.interrupt" })],
    ["an inherited provider name", forged({ target: { ...receipt.target, provider: "toString" }, grant: "control:toString.interrupt" })],
    ["an action the core does not admit for the provider", forged({ action: "stop", grant: "control:claude-agent-sdk.stop" })],
    ["a non-canonical grant", forged({ grant: "claude-agent-sdk:interrupt" })],
    ["a request id that is not a string but spells a valid one", forged({ requestId: [receipt.requestId] })],
    ["a flag-shaped request id", forged({ requestId: "--force" })],
    ["a revoked proxy", revoked()],
    ["a trapping proxy over a frozen copy of the permit", trapping({ ...genuine })],
  ];
}
/** The structural vetting under test, through the module namespace so its absence is an assertion failure, not a link error. */
function vet(value: unknown): RequestedControlReceipt {
  expect(claudeControl.vetClaudeControlDecision, "src/workbench/claude-control.ts exports vetClaudeControlDecision").toBeTypeOf("function");
  return claudeControl.vetClaudeControlDecision(value);
}
function vetRefusal(value: unknown): unknown {
  expect(claudeControl.vetClaudeControlDecision, "src/workbench/claude-control.ts exports vetClaudeControlDecision").toBeTypeOf("function");
  try {
    claudeControl.vetClaudeControlDecision(value);
  } catch (error) {
    return error;
  }
  return undefined;
}

describe("wb-69g.8 respin, provenance line: a decision the core did not mint never reaches structural vetting or interrupt()", () => {
  it("a minted permit executes; every structurally exact forgery of it is refused with the core's fixed text before interrupt()", async () => {
    const fake = fakeSeam();
    const genuine = permit({ invocationId: "inv-depth-exact" });
    for (const [label, forgery] of exactForgeries(genuine)) {
      const failure = await refused(executeClaudeControl(forgery as ControlDecision, deps(fake)), "unvetted-decision", "validation");
      expect(failure.message, label).toBe(UNMINTED_TEXT);
      expect(failure.policy, label).toBeUndefined();
    }
    expect(fake.calls()).toBe(0);
    // The refusals spent nothing: the permit decideControl returned still executes, exactly once.
    await expect(executeClaudeControl(genuine, deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.calls()).toBe(1);
  });

  it("refuses every malformed forgery with the provenance text, never the structural one: provenance is asked first", async () => {
    const fake = fakeSeam();
    // Never executed, so no forgery below re-wraps a receipt this adapter already issued (that one stays permit-consumed).
    for (const [label, forgery] of malformedForgeries(permit({ invocationId: "inv-depth-malformed" }))) {
      const failure = await refused(executeClaudeControl(forgery as ControlDecision, deps(fake)), "unvetted-decision", "validation");
      expect(failure.message, label).toBe(UNMINTED_TEXT);
    }
    expect(fake.calls()).toBe(0);
  });
});

describe("structural vetting (vetClaudeControlDecision), driven with decisions the real core minted and forgeries of them", () => {
  it("passes every permit the core mints and hands back that permit's own receipt", () => {
    const overrides: readonly Partial<NativeControlRequest>[] = [
      {}, { invocationId: "inv-depth-2" }, { principal: { id: SCOPE.principal } }, { grants: ["control:claude-agent-sdk.interrupt"] },
      { requestedAt: "2026-10-15T09:00:00+02:00" },
    ];
    for (const override of overrides) {
      const genuine = permit(override);
      expect(vet(genuine), JSON.stringify(override)).toBe(genuine.receipt);
    }
  });

  it("keeps a real denial's typed reason: denied-decision with the core's own category and policy, for every deny policy", () => {
    const policies = new Set<string>();
    for (const [overrides, projection] of DENIALS) {
      const denial = decide(overrides, projection);
      if (denial.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      policies.add(denial.policy);
      const error = vetRefusal(denial);
      expect(error, denial.policy).toBeInstanceOf(ClaudeControlRefusal);
      expect(error, denial.policy).toMatchObject({ refusal: "denied-decision", category: denial.category, policy: denial.policy });
      expect((error as Error).message, denial.policy).toBe(DENIED_TEXT);
    }
    expect([...policies].sort()).toStrictEqual([...DENY_POLICIES].sort());
  });

  it("refuses one forgery per structural check with the structural text, naming no field and reading no accessor", () => {
    for (const [label, forgery] of malformedForgeries(permit())) {
      const error = vetRefusal(forgery);
      expect(error, `${label} must be refused`).toBeInstanceOf(ClaudeControlRefusal);
      expect(error, label).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
      expect((error as Error).message, label).toBe(STRUCTURAL_TEXT);
      expect((error as { policy?: unknown }).policy, label).toBeUndefined();
    }
  });

  it("passes a structurally exact forgery: it vouches for shape and never for provenance, so provenance is what refuses it", async () => {
    const fake = fakeSeam();
    const genuine = permit({ invocationId: "inv-depth-vouch" });
    for (const [label, forgery] of exactForgeries(genuine)) {
      expect(vet(forgery), label).toStrictEqual(genuine.receipt);
      const failure = await refused(executeClaudeControl(forgery as ControlDecision, deps(fake)), "unvetted-decision", "validation");
      expect(failure.message, label).toBe(UNMINTED_TEXT);
    }
    expect(fake.calls()).toBe(0);
  });
});

describe("the composition no behaviour can reach, by one parse-aware census line", () => {
  it("the entry's first statement is permitted(), which asks the core's own predicate first and then hands the decision to vetClaudeControlDecision", () => {
    const file = moduleSource();
    expect(printed(moduleFunction(file, "executeClaudeControl").body?.statements[0] ?? file, file)).toBe("const requested = permitted(decision);");
    expect(moduleFunction(file, "permitted").body?.statements.map(statement => printed(statement, file))).toStrictEqual([
      "if (!isCoreMintedDecision(decision)) throw unminted(decision);",
      "return vetClaudeControlDecision(decision);",
    ]);
    // The vetting it hands on to is the exported pure function the behaviour above drives.
    expect(moduleFunction(file, "vetClaudeControlDecision").modifiers?.map(modifier => modifier.kind)).toContain(ts.SyntaxKind.ExportKeyword);
    // The predicate it asks is the core's own binding: a value import from ./control.js, declared nowhere in the adapter.
    const core = file.statements.filter(ts.isImportDeclaration).filter(declaration => ts.isStringLiteral(declaration.moduleSpecifier) &&
      declaration.moduleSpecifier.text === "./control.js" && declaration.importClause?.isTypeOnly !== true);
    const bindings = core.flatMap(declaration => {
      const named = declaration.importClause?.namedBindings;
      return named && ts.isNamedImports(named)
        ? named.elements.filter(element => !element.isTypeOnly).map(element => `${(element.propertyName ?? element.name).text} as ${element.name.text}`)
        : [];
    });
    expect(bindings).toContain("isCoreMintedDecision as isCoreMintedDecision");
    const declared = [...nodesOf(file, ts.isFunctionDeclaration), ...nodesOf(file, ts.isVariableDeclaration)].map(node => node.name?.getText(file));
    expect(declared).not.toContain("isCoreMintedDecision");
  });
});
