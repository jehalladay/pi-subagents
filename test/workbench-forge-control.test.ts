/**
 * wb-69g.9 (W16-D3/VC-2): the Forge native control adapter executes only permitted workbench.control/v1 cancel decisions
 * through an injected seam typed against the measured vendored @forge/sdk 0.1.0 surface. Measured:
 * - OperationClient.cancel(operationId): Promise<CancelReceipt> (dist/operation.d.ts:77) writes exactly one
 *   operation.cancel {operation_id} frame (dist/operation.js:38, :108) and decodes Forge's answer (dist/cancellation.js:49-67);
 * - a CancelReceipt never establishes a cancellation (cancellationEstablished: false, dist/cancellation.d.ts:43), and its
 *   operationId is the caller's own value, not Forge's echo (dist/cancellation.d.ts:38-39, cancellation.js:66);
 * - only the operation's own terminal frame can establish one: terminal_disposition "cancelled-established"
 *   (dist/event_delivery_policy.d.ts:47-49), reaching a caller as an OperationEnd (dist/operation_stream.d.ts:100-106);
 * - the one-shot CLI fallback states cancel unsupported and its cancel(): never refuses (dist/fallback.d.ts:106, fallback.js:76).
 *
 * Spec pinned:
 * - docs/workbench/02 WB-040: "Control actions have native preconditions, permission checks, prompts/confirmations and acknowledgements."
 * - docs/workbench/08:56: "Required outcomes: reconciliation/uncertainty/conflict; no duplicate effects, no invented PASS, no implicit mass cancellation."
 * - docs/workbench/15 W16: "Pi catalog/inspect/observe/control tools | compact bounded result and ACL"
 * - docs/workbench/10:77: "Cancel controls unavailable for observers without lifecycle authority."
 *
 * No live forge binary, Pi tool, child process or network: the seam is a fake built from the SDK's own decoder, or the real
 * vendored OperationClient over a stub connection whose request is a spy.
 */
import { readFileSync } from "node:fs";
import {
  type CancelReceipt,
  CapabilityMap,
  CLI_ONESHOT_CAPABILITIES,
  decodeCancelResponse,
  type JsonValue as ForgeJsonValue,
  MalformedFrame,
  negotiatedCapabilityMap,
  OneShotCliConnection,
  OperationClient,
  type OperationEnd,
  type ServerConnection,
  ServerError,
  TransportClosed,
  UnsupportedCapability,
} from "@forge/sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { acknowledge, type ControlDecision, decideControl, NATIVE_CONTROL_ACTIONS, type NativeControlRequest, settle } from "../src/workbench/control.js";
import {
  executeForgeControl,
  FORGE_CANCEL_DECLARATION,
  FORGE_CONTROL_VERBS,
  type ForgeCancelOperations,
  type ForgeCancelSurface,
  type ForgeCapabilitySource,
  type ForgeControlDeps,
  type ForgeControlExecution,
  ForgeControlRefusal,
  type ForgeControlRefusalCode,
  settleForgeControl,
} from "../src/workbench/forge-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";

const WS = "/tmp/forge-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const REQUESTED_AT = "2026-10-15T07:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const SETTLED_AT = "2026-10-15T07:00:03Z";
const TIMEOUT_MS = 5_000;
/** A uuid4 hex: the id the Forge operations service allocates. */
const OP_ID = "3f2a9c1e7b4d4e0f9a8b7c6d5e4f3a2b";
const OTHER_OP_ID = "5f2a9c1e7b4d4e0f9a8b7c6d5e4f3a2b";
const OPERATION: NativeRef = { provider: "forge", type: "operation", id: OP_ID, scope: WS };
const STEP: NativeRef = { provider: "forge", type: "step", id: `${OP_ID}:lint`, scope: WS };
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u200b\u202a-\u202e\u2066-\u2069]/;
const cp = (code: number): string => String.fromCodePoint(code);
const ZWSP = cp(0x200b);
const ESC = cp(0x1b);

interface Edge { from: NativeRef; to: NativeRef; kind: RelationKind; provenance: { source: string; observedAt?: string; nativeConfirmationRef?: string } }

function observe(refs: readonly NativeRef[], edges: readonly Edge[], scope: ObservationScope = SCOPE): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of refs) {
    projection.refresh({ source, scope, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "sdk-operation", statusText: "active", statusTone: "active" } });
  }
  for (const edge of edges) projection.relate({ scope, ...edge });
  return projection;
}
/** A producer-stated, natively confirmed ownership edge (the W13-G convention the sibling adapters seed by hand). */
const owns = (from: NativeRef, to: NativeRef, nativeConfirmationRef = `forge-operation-started:${OP_ID}`): Edge =>
  ({ from, to, kind: "ownership", provenance: { source: from.provider, observedAt: AT, nativeConfirmationRef } });
const forge = (target: NativeRef = OPERATION): ObservationProjection => observe([target, STEP], [owns(target, STEP)]);

function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["observe:forge.operation", "control:forge.cancel"],
    target: { ...OPERATION }, action: "cancel", params: { confirmed: true }, invocationId: "inv-forge-cancel-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decide = (overrides: Partial<NativeControlRequest> = {}, projection: ObservationProjection = forge()): ControlDecision =>
  decideControl(request(overrides), { projection, now: () => DECIDED_AT });
function permit(overrides: Partial<NativeControlRequest> = {}, projection?: ObservationProjection): ControlDecision & { decision: "permitted" } {
  const decision = decide(overrides, projection);
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}

type Payload = { readonly [key: string]: ForgeJsonValue };
/** Forge's answer to a live cancel: four keys, no establishment (operation_manager.request_cancel). */
const ACCEPTED_ANSWER = (id: string = OP_ID): Payload =>
  ({ operation_id: id, cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false });
/** Forge's refusal answer: nothing recorded, nothing attempted (operation_manager.terminal_cancel_answer / request_cancel). */
const REFUSED_ANSWER = (acceptance: string, id: string = OP_ID): Payload =>
  ({ operation_id: id, cancel_intent: "NOT_REQUESTED", cancel_acceptance: acceptance, cancellation_established: false, establishment: "NOT_ATTEMPTED" });

const supportedMap = (): CapabilityMap => negotiatedCapabilityMap("app_server", new Map([["gate.status", true], ["operation.cancel", true]]));
/** A seam whose cancel answers through the vendored decoder, exactly as OperationClient.cancel does. */
function fakeSeam(answer: (operationId: string) => Payload = ACCEPTED_ANSWER, capabilities: CapabilityMap | null = supportedMap()) {
  const cancel = vi.fn(async (operationId: string): Promise<CancelReceipt> => decodeCancelResponse(operationId, answer(operationId)));
  return { operations: { cancel }, connection: { capabilities }, cancel };
}
/** A seam over an arbitrary cancel implementation, under a map that states operation.cancel supported. */
const seamOf = (cancel: (operationId: string) => Promise<CancelReceipt>): { operations: ForgeCancelOperations; connection: ForgeCapabilitySource } =>
  ({ operations: { cancel }, connection: { capabilities: supportedMap() } });
function clock(...ticks: string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}
const deps = (seam: { operations: ForgeCancelOperations; connection: ForgeCapabilitySource }, overrides: Partial<ForgeControlDeps> = {}): ForgeControlDeps =>
  ({ operations: seam.operations, connection: seam.connection, workspaceRoot: WS, now: clock(ACKED_AT), timeoutMs: TIMEOUT_MS, ...overrides });

/** Records every trap a proxied object sees, so "never touched" is measured rather than assumed. */
function untouchable<T extends object>(target: T): { proxy: T; touched: string[] } {
  const touched: string[] = [];
  const note = (key: string | symbol): void => { touched.push(String(key)); };
  const proxy = new Proxy(target, {
    get: (object, key) => { note(key); return Reflect.get(object, key, object); },
    has: (object, key) => { note(key); return Reflect.has(object, key); },
    getOwnPropertyDescriptor: (object, key) => { note(key); return Reflect.getOwnPropertyDescriptor(object, key); },
    ownKeys: object => { note("ownKeys"); return Reflect.ownKeys(object); },
    getPrototypeOf: object => { note("getPrototypeOf"); return Reflect.getPrototypeOf(object); },
  });
  return { proxy, touched };
}

async function refused(pending: Promise<unknown>, refusal: ForgeControlRefusalCode, category: string): Promise<ForgeControlRefusal> {
  let failure: unknown;
  try { await pending; } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(ForgeControlRefusal);
  expect(failure).toBeInstanceOf(CapabilityError);
  expect(failure).toMatchObject({ refusal, category });
  return failure as ForgeControlRefusal;
}
function refusedNow(run: () => unknown, refusal: ForgeControlRefusalCode, category: string): ForgeControlRefusal {
  let failure: unknown;
  try { run(); } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(ForgeControlRefusal);
  expect(failure).toMatchObject({ refusal, category });
  return failure as ForgeControlRefusal;
}
async function acknowledged(): Promise<ForgeControlExecution> {
  const execution = await executeForgeControl(permit(), deps(fakeSeam()));
  expect(execution.status).toBe("acknowledged");
  return execution;
}
const terminal = (result: ForgeJsonValue): OperationEnd<ForgeJsonValue> => ({ terminality: "forge_terminal", result });
const CANCELLED = (): OperationEnd<ForgeJsonValue> => terminal({ operation_id: OP_ID, terminal_disposition: "cancelled-established" });

afterEach(() => { vi.restoreAllMocks(); });

describe("measured surface: the one native verb is the vendored OperationClient.cancel, cited line for line", () => {
  it("pins the verb table: exactly operation -> cancel writing operation.cancel {operation_id}, deep-frozen and admitted by the core's forge row", () => {
    expect(FORGE_CONTROL_VERBS).toStrictEqual({ operation: { cancel: { method: "operation.cancel", call: "OperationClient.cancel", param: "operation_id", facade: "cancel" } } });
    expect(Object.isFrozen(FORGE_CONTROL_VERBS)).toBe(true);
    for (const [type, verbs] of Object.entries(FORGE_CONTROL_VERBS)) {
      expect(type).toBe("operation");
      expect(Object.isFrozen(verbs)).toBe(true);
      for (const [action, verb] of Object.entries(verbs)) {
        expect(Object.isFrozen(verb)).toBe(true);
        expect(NATIVE_CONTROL_ACTIONS.forge).toContain(action);
      }
    }
    expect(NATIVE_CONTROL_ACTIONS.forge).toStrictEqual(["cancel"]);
  });

  it("quotes the vendored files it cites, line for line, at the pinned @forge/sdk 0.1.0", () => {
    const sdk = (path: string): string[] => readFileSync(new URL(`../node_modules/@forge/sdk/${path}`, import.meta.url), "utf8").split("\n");
    expect(JSON.parse(sdk("package.json").join("\n")).version).toBe("0.1.0");
    expect(sdk("dist/operation.d.ts")[76].trim()).toBe("cancel(operationId: string): Promise<CancelReceipt>;");
    expect(sdk("dist/operation.js")[37].trim()).toBe('const CANCEL_METHOD = "operation.cancel";');
    expect(sdk("dist/operation.js")[107].trim()).toBe("const raw = await this.#connection.request(CANCEL_METHOD, { operation_id: operationId });");
    expect(sdk("dist/cancellation.d.ts")[42].trim()).toBe("readonly cancellationEstablished: false;");
    expect(sdk("dist/fallback.d.ts")[105].trim()).toBe("cancel(): never;");
    expect(sdk("dist/fallback.js")[75].trim()).toBe("cancel: CapabilityState.UNSUPPORTED,");
    expect(sdk("dist/event_delivery_policy.d.ts")[48].trim()).toBe('export declare const CANCELLATION_DISPOSITION: "cancelled-established";');
    expect(FORGE_CANCEL_DECLARATION).toBe("@forge/sdk@0.1.0 dist/operation.d.ts:77 OperationClient.cancel(operationId: string): Promise<CancelReceipt>"
      + " writes one operation.cancel {operation_id} frame (dist/operation.js:38, :108)");
  });

  it("drives the real vendored client: exactly one operation.cancel frame naming the target's operation_id, decoded by the SDK", async () => {
    const request = vi.fn(async (_method: string, _params: ForgeJsonValue): Promise<ForgeJsonValue> => ACCEPTED_ANSWER());
    const connection = { operations: { handleFor: () => undefined }, request } as unknown as ServerConnection;
    const operations = OperationClient.over(connection);
    const execution = await executeForgeControl(permit(), deps({ operations, connection: { capabilities: supportedMap() } }));
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0]).toStrictEqual(["operation.cancel", { operation_id: OP_ID }]);
    expect(execution).toMatchObject({ verb: "operation.cancel", status: "acknowledged", receipt: { phase: "acknowledged" } });
  });
});

describe("intake: only a permitted decision minted by decideControl reaches the seam; observers stay zero-control", () => {
  it("refuses every denied decision with the core's category and policy, and neither the seam nor the dependencies are touched", async () => {
    // A Forge-stated grouping edge carries a confirmation reference too, but only an ownership edge confirms lifecycle ownership.
    const grouping: Edge = { ...owns(OPERATION, STEP), kind: "grouping" };
    const cases: [Partial<NativeControlRequest>, ObservationProjection?][] = [
      [{ grants: undefined }],
      [{ grants: ["observe:forge.operation", "inspect:forge.gate.status"] }],
      [{ grants: ["forge:cancel"] }],
      [{ grants: ["control:forge.stop"] }],
      [{ action: "stop", grants: ["control:forge.stop"] }],
      [{ action: "kill", grants: ["control:forge.kill"] }],
      [{ invocationId: "" }],
      [{ target: { ...OPERATION, id: OTHER_OP_ID } }],
      [{ principal: { id: "intruder" } }],
      [{}, observe([OPERATION], [])],
      [{}, observe([OPERATION, STEP], [grouping])],
      [{ params: {} }],
      [{ params: { confirmed: "true" } }],
    ];
    const policies = new Set<string>();
    for (const [overrides, projection] of cases) {
      const decision = decide(overrides, projection);
      if (decision.decision !== "denied") throw new Error(`expected a denied decision for ${JSON.stringify(overrides)}`);
      policies.add(decision.policy);
      const fake = fakeSeam();
      const seen = untouchable(deps(fake));
      const failure = await refused(executeForgeControl(decision, seen.proxy), "denied-decision", decision.category);
      expect(failure.policy).toBe(decision.policy);
      expect(failure.message).not.toContain(OP_ID);
      expect(seen.touched).toStrictEqual([]);
      expect(fake.cancel).not.toHaveBeenCalled();
    }
    expect(policies).toStrictEqual(new Set(["unknown-permission-data", "observer-only", "missing-exact-grant", "unknown-action", "malformed-request",
      "cross-scope", "no-confirmed-ownership", "operator-confirmation"]));
  });

  it("an observer-only principal is zero-control: refused as observer-only before any projection read, and the seam is never touched", async () => {
    const projection = forge();
    const query = vi.spyOn(projection, "query");
    const relations = vi.spyOn(projection, "relations");
    const decision = decide({ grants: ["observe:forge.operation", "inspect:forge.gate.status", "discover:forge.gate.status"] }, projection);
    expect(decision).toMatchObject({ decision: "denied", policy: "observer-only", category: "authorization" });
    expect(query).not.toHaveBeenCalled();
    expect(relations).not.toHaveBeenCalled();
    const fake = fakeSeam();
    const operations = untouchable(fake.operations);
    const connection = untouchable(fake.connection);
    const failure = await refused(executeForgeControl(decision, deps({ operations: operations.proxy, connection: connection.proxy })), "denied-decision", "authorization");
    expect(failure.policy).toBe("observer-only");
    expect(operations.touched).toStrictEqual([]);
    expect(connection.touched).toStrictEqual([]);
    expect(fake.cancel).not.toHaveBeenCalled();
  });

  it("refuses a raw request, an unfrozen copy, a phase-advanced, forged or accessor-bearing look-alike as unvetted before the seam", async () => {
    const genuine = permit();
    const { receipt } = genuine;
    const fake = fakeSeam();
    const advanced = acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: `forge-operation:${OP_ID}:operation.cancel:CANCEL_REQUESTED:ACCEPTED` });
    let invoked = false;
    const accessor = Object.freeze(Object.defineProperty({ decision: "permitted" }, "receipt", { enumerable: true, get: () => { invoked = true; return receipt; } }));
    const forged = (fields: Record<string, unknown>): ControlDecision => Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt, ...fields }) }) as ControlDecision;
    const lookalikes: unknown[] = [
      request(), { ...genuine }, Object.freeze({ decision: "permitted", receipt: { ...receipt } }), Object.freeze({ decision: "permitted", receipt: advanced }),
      forged({ contractVersion: "workbench.control/v2" }), forged({ grant: "control:forge.*" }), forged({ requestId: "ctl_short" }),
      forged({ action: "kill", grant: "control:forge.kill" }), forged({ policy: "anything-goes" }), forged({ target: { ...receipt.target } }),
      accessor, undefined, null, "permitted",
    ];
    for (const lookalike of lookalikes) await refused(executeForgeControl(lookalike as ControlDecision, deps(fake)), "unvetted-decision", "validation");
    expect(invoked).toBe(false);
    expect(fake.cancel).not.toHaveBeenCalled();
  });

  it("refuses a permitted decision with no measured Forge verb: another provider's permit, another Forge target type, a polluted prototype", async () => {
    const fake = fakeSeam();
    const run: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
    const attempt: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };
    const furnace = permit({ grants: ["control:furnace.stop"], target: run, action: "stop" }, observe([run, attempt], [owns(run, attempt, "frn-req-attempts-1")]));
    await refused(executeForgeControl(furnace, deps(fake)), "unsupported-verb", "validation");
    const gate: NativeRef = { provider: "forge", type: "gate-status", id: "workspace", scope: WS };
    const gateDecision = permit({ target: gate }, observe([gate, STEP], [owns(gate, STEP)]));
    await refused(executeForgeControl(gateDecision, deps(fake)), "unsupported-verb", "validation");
    const proto = Object.prototype as Record<string, unknown>;
    try {
      proto["gate-status"] = FORGE_CONTROL_VERBS.operation;
      await refused(executeForgeControl(gateDecision, deps(fake)), "unsupported-verb", "validation");
    } finally { Reflect.deleteProperty(proto, "gate-status"); }
    expect(Object.hasOwn(Object.prototype, "gate-status")).toBe(false);
    // Any other provider row admitting cancel (wb-0kg.6 admits local-detached cancel) is not Forge's to execute, even on an
    // operation-typed node: the provider decides the adapter, never the verb's spelling.
    for (const provider of Object.keys(NATIVE_CONTROL_ACTIONS).filter(name => name !== "forge" && NATIVE_CONTROL_ACTIONS[name].includes("cancel"))) {
      const foreign: NativeRef = { provider, type: "operation", id: OP_ID, scope: WS };
      const decision = permit({ grants: [`control:${provider}.cancel`], target: foreign }, observe([foreign, STEP], [owns(foreign, STEP)]));
      await refused(executeForgeControl(decision, deps(fake)), "unsupported-verb", "validation");
    }
    expect(fake.cancel).not.toHaveBeenCalled();
  });

  it("refuses a non-native operation id and a decision outside the workspace the seam serves; an unscoped operation as the Pi host projects it executes", async () => {
    const fake = fakeSeam();
    for (const id of ["-rf", "op 1", "op/1", "op\\1", ".hidden", `a${"b".repeat(128)}`]) {
      const target: NativeRef = { ...OPERATION, id };
      await refused(executeForgeControl(permit({ target }, forge(target)), deps(fake)), "invalid-target", "validation");
    }
    // A zero-width id (wb-69g.9 U2) is refused UPSTREAM of the adapter: since wb-952 the core's cleanText denies it, and the
    // owner-filed wb-0br will refuse it earlier still, at projection ingest. The exact upstream refusal is not pinned, only
    // that it never reaches the seam: whatever decision comes back is refused here too.
    const zeroWidth: NativeRef = { ...OPERATION, id: `op${ZWSP}1` };
    let upstream: ControlDecision | undefined;
    try {
      upstream = decide({ target: zeroWidth }, forge(zeroWidth));
    } catch {
      upstream = undefined;
    }
    if (upstream !== undefined) await expect(executeForgeControl(upstream, deps(fake))).rejects.toBeInstanceOf(ForgeControlRefusal);
    await refused(executeForgeControl(permit(), deps(fake, { workspaceRoot: "/tmp/other-ws" })), "foreign-workspace", "authorization");
    const elsewhere: NativeRef = { ...OPERATION, scope: "/tmp/other-ws" };
    await refused(executeForgeControl(permit({ target: elsewhere }, forge(elsewhere)), deps(fake)), "foreign-workspace", "authorization");
    // src/index.ts projects a native SDK workflow node as { provider, type: "operation", id } with no scope: the decision's own
    // workspace is then the one bound, so a connection serving another workspace is still refused.
    const unscoped: NativeRef = { provider: "forge", type: "operation", id: OP_ID };
    await refused(executeForgeControl(permit({ target: unscoped }, forge(unscoped)), deps(fake, { workspaceRoot: "/tmp/other-ws" })), "foreign-workspace", "authorization");
    expect(fake.cancel).not.toHaveBeenCalled();
    await expect(executeForgeControl(permit({ target: unscoped }, forge(unscoped)), deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.cancel).toHaveBeenCalledTimes(1);
    expect(fake.cancel).toHaveBeenCalledWith(OP_ID);
  });

  it("executes a permit once: re-executing it, also concurrently, is refused and Forge sees one cancel", async () => {
    const fake = fakeSeam();
    const decision = permit();
    const [first, second] = await Promise.allSettled([executeForgeControl(decision, deps(fake)), executeForgeControl(decision, deps(fake))]);
    expect(first).toMatchObject({ status: "fulfilled", value: { status: "acknowledged" } });
    await refused(second.status === "rejected" ? Promise.reject(second.reason) : Promise.resolve(second.value), "permit-consumed", "validation");
    await refused(executeForgeControl(decision, deps(fake)), "permit-consumed", "validation");
    expect(fake.cancel).toHaveBeenCalledTimes(1);
    // A fresh decision for the same logical invocation is a new permit carrying the same core request id.
    const again = permit();
    expect(again.receipt.requestId).toBe(decision.receipt.requestId);
    await expect(executeForgeControl(again, deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.cancel).toHaveBeenCalledTimes(2);
  });

  it("refuses invalid dependencies before the seam", async () => {
    const fake = fakeSeam();
    const invalid: Partial<ForgeControlDeps>[] = [
      { timeoutMs: 0 }, { timeoutMs: -1 }, { timeoutMs: 1.5 }, { timeoutMs: Number.NaN }, { timeoutMs: 2 ** 31 }, { timeoutMs: "5000" as unknown as number },
      { workspaceRoot: "" }, { workspaceRoot: 7 as unknown as string }, { now: "now" as unknown as () => string },
      { operations: undefined as unknown as ForgeCancelOperations }, { operations: "client" as unknown as ForgeCancelOperations },
      { connection: undefined as unknown as ForgeCapabilitySource }, { connection: null as unknown as ForgeCapabilitySource },
      { signal: { aborted: false } as unknown as AbortSignal },
    ];
    for (const overrides of invalid) await refused(executeForgeControl(permit(), deps(fake, overrides)), "invalid-deps", "validation");
    await refused(executeForgeControl(permit(), undefined as unknown as ForgeControlDeps), "invalid-deps", "validation");
    expect(fake.cancel).not.toHaveBeenCalled();
  });

  it("a wait cancelled before issuing is refused and does not spend the permit", async () => {
    const fake = fakeSeam();
    const decision = permit();
    const cancelled = new AbortController();
    cancelled.abort();
    await refused(executeForgeControl(decision, deps(fake, { signal: cancelled.signal })), "aborted-before-issue", "transport");
    expect(fake.cancel).not.toHaveBeenCalled();
    await expect(executeForgeControl(decision, deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.cancel).toHaveBeenCalledTimes(1);
  });
});

describe("no native cancel: the typed capability-unavailable refusal quotes the measured surface, never a shell-out or a minted verb", () => {
  it("refuses the vendored one-shot CLI fallback, whose map states cancel unsupported, without calling its cancel or launching anything", async () => {
    const oneShot = new OneShotCliConnection(process.execPath);
    oneShot.start();
    expect(oneShot.capabilities).toBe(CLI_ONESHOT_CAPABILITIES);
    const cancel = vi.spyOn(oneShot, "cancel");
    const invoke = vi.spyOn(oneShot, "invoke");
    const decision = permit();
    const failure = await refused(executeForgeControl(decision, deps({ operations: oneShot, connection: oneShot })), "capability-unavailable", "unavailable");
    expect(failure.surface).toStrictEqual({ declaration: FORGE_CANCEL_DECLARATION, seamMethod: "present", mode: "cli_oneshot", state: "unknown", facadeState: "unsupported" });
    expect(Object.isFrozen(failure.surface)).toBe(true);
    expect(cancel).not.toHaveBeenCalled();
    expect(invoke).not.toHaveBeenCalled();
    // Nothing was sent, so the permit is unspent and reaches a seam that does speak operation.cancel.
    const fake = fakeSeam();
    await expect(executeForgeControl(decision, deps(fake))).resolves.toMatchObject({ status: "acknowledged" });
    expect(fake.cancel).toHaveBeenCalledTimes(1);
  });

  it("refuses an app server whose map states operation.cancel unavailable or never enumerated it, and a connection with no readable statement", async () => {
    const unreadable = Object.freeze({ mode: "app_server", stateOf: () => "maybe" }) as unknown as CapabilityMap;
    const throwing = Object.freeze({ mode: "app_server", stateOf: () => { throw new Error("boom"); } }) as unknown as CapabilityMap;
    const cases: [ForgeCapabilitySource, Omit<ForgeCancelSurface, "declaration" | "seamMethod">][] = [
      [{ capabilities: negotiatedCapabilityMap("app_server", new Map([["operation.cancel", false]])) }, { mode: "app_server", state: "unsupported", facadeState: "unknown" }],
      [{ capabilities: negotiatedCapabilityMap("app_server", new Map([["gate.status", true]])) }, { mode: "app_server", state: "unknown", facadeState: "unknown" }],
      [{ capabilities: negotiatedCapabilityMap("custom", null) }, { mode: "custom", state: "unknown", facadeState: "unknown" }],
      [{ capabilities: negotiatedCapabilityMap("app_server", new Map([["operation.cancel", true], ["cancel", false]])) }, { mode: "app_server", state: "supported", facadeState: "unsupported" }],
      [{ capabilities: null }, { mode: null, state: "no-capability-map", facadeState: "no-capability-map" }],
      [{ get capabilities(): CapabilityMap | null { throw new Error("handshake"); } }, { mode: null, state: "unreadable", facadeState: "unreadable" }],
      [{ capabilities: unreadable }, { mode: "app_server", state: "unreadable", facadeState: "unreadable" }],
      [{ capabilities: throwing }, { mode: "app_server", state: "unreadable", facadeState: "unreadable" }],
    ];
    for (const [connection, surface] of cases) {
      const fake = fakeSeam();
      const failure = await refused(executeForgeControl(permit(), deps({ operations: fake.operations, connection })), "capability-unavailable", "unavailable");
      expect(failure.surface).toStrictEqual({ declaration: FORGE_CANCEL_DECLARATION, seamMethod: "present", ...surface });
      expect(fake.cancel).not.toHaveBeenCalled();
    }
  });

  it("refuses a seam that carries no native cancel method, even when the map states operation.cancel supported", async () => {
    for (const operations of [{}, { cancel: "operation.cancel" }, { cancel: null }]) {
      const failure = await refused(executeForgeControl(permit(), deps({ operations: operations as unknown as ForgeCancelOperations, connection: { capabilities: supportedMap() } })),
        "capability-unavailable", "unavailable");
      expect(failure.surface).toStrictEqual({ declaration: FORGE_CANCEL_DECLARATION, seamMethod: "absent", mode: "app_server", state: "supported", facadeState: "unknown" });
    }
  });

  it("a facade refusing at call time (FORGE_UNSUPPORTED_CAPABILITY: nothing sent) is the same typed refusal after one attempt, and the permit stays spent", async () => {
    for (const synchronous of [true, false]) {
      const cancel = vi.fn((_operationId: string): Promise<CancelReceipt> => {
        const refusal = new UnsupportedCapability("cancel", "cli_oneshot");
        if (synchronous) throw refusal;
        return Promise.reject(refusal);
      });
      const decision = permit();
      const failure = await refused(executeForgeControl(decision, deps(seamOf(cancel))), "capability-unavailable", "unavailable");
      expect(failure.surface).toStrictEqual({ declaration: FORGE_CANCEL_DECLARATION, seamMethod: "refused", mode: "app_server", state: "supported", facadeState: "unknown" });
      expect(cancel).toHaveBeenCalledTimes(1);
      await refused(executeForgeControl(decision, deps(seamOf(cancel))), "permit-consumed", "validation");
      expect(cancel).toHaveBeenCalledTimes(1);
    }
  });

  it("the capability refusal is frozen, bounded and routed through the sanitizers, and its text never echoes caller or producer strings", async () => {
    const hostile = new CapabilityMap("\u001b[31mapp_server\u202e Bearer TOPSECRET" as unknown as "app_server", { "operation.cancel": "unsupported" });
    const fake = fakeSeam();
    const failure = await refused(executeForgeControl(permit(), deps({ operations: fake.operations, connection: { capabilities: hostile } })), "capability-unavailable", "unavailable");
    expect(failure.surface).toStrictEqual({ declaration: FORGE_CANCEL_DECLARATION, seamMethod: "present", mode: "app_server [REDACTED]", state: "unsupported", facadeState: "unknown" });
    const text = JSON.stringify({ message: failure.message, surface: failure.surface });
    expect(text).not.toMatch(/TOPSECRET/);
    expect(text).not.toContain(OP_ID);
    for (const value of [failure.message, ...Object.values(failure.surface ?? {})]) if (typeof value === "string") expect(value).not.toMatch(UNSAFE);
    expect(Buffer.byteLength(text)).toBeLessThan(1024);
    expect(fake.cancel).not.toHaveBeenCalled();
  });
});

describe("acknowledged echoes Forge's own answer; an acknowledgement is never a cancellation", () => {
  it("ACCEPTED with Forge's operation_id echo is acknowledged through the core, with a reference derived from that echo, and never settled", async () => {
    const fake = fakeSeam();
    const decision = permit();
    const execution = await executeForgeControl(decision, deps(fake));
    const expected = acknowledge(decision.receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: `forge-operation:${OP_ID}:operation.cancel:CANCEL_REQUESTED:ACCEPTED` });
    expect(execution).toStrictEqual({ verb: "operation.cancel", status: "acknowledged", requested: decision.receipt, receipt: expected, acknowledged: expected,
      echo: { operationId: OP_ID, cancelIntent: "CANCEL_REQUESTED", cancelAcceptance: "ACCEPTED" } });
    expect(Object.isFrozen(execution)).toBe(true);
    expect(Object.isFrozen(execution.echo)).toBe(true);
    // Three facts and no outcome: transport success is never domain verification.
    expect(execution.result).toBeUndefined();
    expect(JSON.stringify(execution)).not.toMatch(/"outcome"|cancelled|completed/);
    expect(fake.cancel).toHaveBeenCalledTimes(1);
    expect(fake.cancel).toHaveBeenCalledWith(OP_ID);
  });

  it("never acknowledges from the SDK's caller-copied operationId: a missing, foreign or inconsistent echo parks as unattributable", async () => {
    const decoded = (): CancelReceipt => decodeCancelResponse(OP_ID, ACCEPTED_ANSWER());
    const handBuilt = (fields: Record<string, unknown>): CancelReceipt => ({ ...decoded(), ...fields }) as CancelReceipt;
    const answers: (() => unknown)[] = [
      () => decodeCancelResponse(OP_ID, { cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false }),
      () => decodeCancelResponse(OP_ID, ACCEPTED_ANSWER(OTHER_OP_ID)),
      () => decodeCancelResponse(OTHER_OP_ID, ACCEPTED_ANSWER()),
      () => handBuilt({ raw: { ...ACCEPTED_ANSWER(), cancel_acceptance: "REFUSED_NOT_FOUND" } }),
      () => handBuilt({ raw: { ...ACCEPTED_ANSWER(), cancel_intent: "NOT_REQUESTED" } }),
      () => handBuilt({ cancellationEstablished: true }),
      () => handBuilt({ raw: { ...ACCEPTED_ANSWER(), cancellation_established: true } }),
      () => handBuilt({ cancelAcceptance: "MAYBE", raw: { ...ACCEPTED_ANSWER(), cancel_acceptance: "MAYBE" } }),
      () => handBuilt({ raw: null }),
      () => handBuilt({ raw: [ACCEPTED_ANSWER()] }),
      () => Object.create(decoded()),
      () => undefined,
      () => "ACCEPTED",
    ];
    for (const answer of answers) {
      const cancel = vi.fn(async (): Promise<CancelReceipt> => answer() as CancelReceipt);
      const decision = permit();
      const execution = await executeForgeControl(decision, deps(seamOf(cancel)));
      expect(execution).toMatchObject({ status: "uncertain", requested: decision.receipt, receipt: decision.receipt, uncertainty: { reason: "unattributable-answer" } });
      expect(execution.acknowledged).toBeUndefined();
      expect(cancel).toHaveBeenCalledTimes(1);
    }
    let invoked = false;
    const accessor = Object.defineProperty({ ...decoded() }, "cancelAcceptance", { enumerable: true, get: () => { invoked = true; return "ACCEPTED"; } });
    const execution = await executeForgeControl(permit(), deps(seamOf(async () => accessor)));
    expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "unattributable-answer" } });
    expect(invoked).toBe(false);
  });

  it("parks contradictory axes as uncertain instead of choosing one: the vendored decoder admits any roster pair", async () => {
    for (const [intent, acceptance] of [["CANCEL_REQUESTED", "REFUSED_NOT_CANCELLABLE"], ["NOT_REQUESTED", "ACCEPTED"], ["CANCEL_REQUESTED", "REFUSED_ALREADY_TERMINAL"]]) {
      const fake = fakeSeam(() => ({ operation_id: OP_ID, cancel_intent: intent, cancel_acceptance: acceptance, cancellation_established: false }));
      const decision = permit();
      const execution = await executeForgeControl(decision, deps(fake));
      expect(execution).toStrictEqual({ verb: "operation.cancel", status: "uncertain", requested: decision.receipt, receipt: decision.receipt,
        echo: { operationId: OP_ID, cancelIntent: intent, cancelAcceptance: acceptance }, uncertainty: { reason: "contradictory-answer" } });
    }
  });

  it("parks rather than throws when the core refuses to mint the acknowledged phase after the frame was sent", async () => {
    const fake = fakeSeam();
    const decision = permit();
    const execution = await executeForgeControl(decision, deps(fake, { now: () => "2026-10-15T07:00:02" }));
    expect(execution).toMatchObject({ status: "uncertain", receipt: decision.receipt, uncertainty: { reason: "receipt-refused" }, echo: { cancelAcceptance: "ACCEPTED" } });
    expect(execution.acknowledged).toBeUndefined();
    expect(fake.cancel).toHaveBeenCalledTimes(1);
  });
});

describe("Forge's refusals are echoed verbatim and the receipt stays requested", () => {
  it("REFUSED_ALREADY_TERMINAL, REFUSED_NOT_CANCELLABLE and REFUSED_NOT_FOUND are not-accepted with Forge's axes echoed, never acknowledged or settled", async () => {
    for (const acceptance of ["REFUSED_ALREADY_TERMINAL", "REFUSED_NOT_CANCELLABLE", "REFUSED_NOT_FOUND"]) {
      const fake = fakeSeam(() => REFUSED_ANSWER(acceptance));
      const decision = permit();
      const execution = await executeForgeControl(decision, deps(fake));
      expect(execution).toStrictEqual({ verb: "operation.cancel", status: "not-accepted", requested: decision.receipt, receipt: decision.receipt,
        echo: { operationId: OP_ID, cancelIntent: "NOT_REQUESTED", cancelAcceptance: acceptance, establishment: "NOT_ATTEMPTED" } });
      expect(fake.cancel).toHaveBeenCalledTimes(1);
    }
  });

  it("Forge's pre-effect refusal frames operation_not_found and invalid_params are not-accepted with the server code echoed, never the message or data", async () => {
    for (const serverCode of ["operation_not_found", "invalid_params"]) {
      const cancel = vi.fn(async (): Promise<CancelReceipt> => {
        throw new ServerError(serverCode, "this server holds no operation 'x' Bearer abc.def", { operation_id: OP_ID, reason: "sk-ant-api03-secret" });
      });
      const decision = permit();
      const execution = await executeForgeControl(decision, deps(seamOf(cancel)));
      expect(execution).toStrictEqual({ verb: "operation.cancel", status: "not-accepted", requested: decision.receipt, receipt: decision.receipt, echo: { serverCode } });
      expect(JSON.stringify(execution)).not.toMatch(/holds no operation|Bearer|sk-ant/);
      expect(cancel).toHaveBeenCalledTimes(1);
    }
  });
});

describe("park, never retry: failures, timeouts and unrecognized refusals stay uncertain after exactly one call", () => {
  it("parks a transport close, a malformed frame, an unrecognized server code and a foreign error with a closed label and no native text", async () => {
    const failures: [() => unknown, Record<string, string>][] = [
      [() => new TransportClosed("server exited sk-ant-api03-secret", { exitCode: 1, signal: null }, "stderr Bearer abc"), { code: "FORGE_TRANSPORT_CLOSED" }],
      [() => new MalformedFrame("{oops", "not json \u001b[2J", "not_json", "recoverable"), { code: "FORGE_MALFORMED_FRAME" }],
      [() => new ServerError("internal_error", "persist failed after the token was set", null), { code: "FORGE_SERVER_ERROR", serverCode: "internal_error" }],
      [() => new ServerError("\u001b]8;;x\u0007", "hostile", null), { code: "FORGE_SERVER_ERROR" }],
      [() => new Error("boom"), { code: "unknown" }],
      [() => ({ code: "FORGE_TRANSPORT_CLOSED\n" }), { code: "unknown" }],
    ];
    for (const [error, failure] of failures) {
      for (const synchronous of [false, true]) {
        const cancel = vi.fn((): Promise<CancelReceipt> => {
          if (synchronous) throw error();
          return Promise.reject(error());
        });
        const decision = permit();
        const execution = await executeForgeControl(decision, deps(seamOf(cancel)));
        expect(execution).toStrictEqual({ verb: "operation.cancel", status: "uncertain", requested: decision.receipt, receipt: decision.receipt,
          uncertainty: { reason: "seam-failure", failure } });
        const text = JSON.stringify(execution);
        expect(text).not.toMatch(/sk-ant|Bearer|persist failed|boom|hostile|not json/);
        expect(text).not.toMatch(UNSAFE);
        expect(cancel).toHaveBeenCalledTimes(1);
        await refused(executeForgeControl(decision, deps(seamOf(cancel))), "permit-consumed", "validation");
        expect(cancel).toHaveBeenCalledTimes(1);
      }
    }
  });

  it("stops waiting at the bound, discards a late ACCEPTED and never re-sends the cancel", async () => {
    let release: (value: CancelReceipt) => void = () => {};
    const cancel = vi.fn((): Promise<CancelReceipt> => new Promise(resolve => { release = resolve; }));
    const decision = permit();
    const started = Date.now();
    const execution = await executeForgeControl(decision, deps(seamOf(cancel), { timeoutMs: 25 }));
    expect(Date.now() - started).toBeLessThan(2_000);
    expect(execution).toStrictEqual({ verb: "operation.cancel", status: "uncertain", requested: decision.receipt, receipt: decision.receipt, uncertainty: { reason: "wait-timeout" } });
    release(decodeCancelResponse(OP_ID, ACCEPTED_ANSWER()));
    await new Promise(resolve => setTimeout(resolve, 10));
    expect(execution.status).toBe("uncertain");
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("an abort after the frame was sent stops only the wait, also when the seam aborts synchronously", async () => {
    for (const abortSynchronously of [false, true]) {
      const controller = new AbortController();
      const cancel = vi.fn((): Promise<CancelReceipt> => {
        if (abortSynchronously) controller.abort();
        else queueMicrotask(() => controller.abort());
        return new Promise(() => {});
      });
      const started = Date.now();
      const execution = await executeForgeControl(permit(), deps(seamOf(cancel), { signal: controller.signal }));
      expect(Date.now() - started).toBeLessThan(TIMEOUT_MS);
      expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "wait-aborted" }, receipt: { phase: "requested" } });
      expect(cancel).toHaveBeenCalledTimes(1);
    }
  });
});

describe("result only from the operation's own terminal frame (settleForgeControl)", () => {
  it("the operation's terminal with the SDK's cancelled-established disposition settles cancelled through the core", async () => {
    const execution = await acknowledged();
    const acked = execution.acknowledged;
    if (acked === undefined) throw new Error("expected an acknowledged receipt");
    const settled = settleForgeControl(execution, terminal({ operation_id: OP_ID, terminal_disposition: "cancelled-established", status: "FAILED", answered: true }), () => SETTLED_AT);
    const expected = settle(acked, { outcome: "cancelled", nativeResultRef: `forge-operation:${OP_ID}:terminal_disposition=cancelled-established`, settledAt: SETTLED_AT });
    expect(settled).toStrictEqual({ verb: "operation.cancel", status: "settled", requested: execution.requested, acknowledged: acked, result: expected, receipt: expected,
      echo: { ...execution.echo, terminalDisposition: "cancelled-established" } });
    expect(Object.isFrozen(settled)).toBe(true);
  });

  it("any other terminal disposition settles unknown with Forge's disposition quoted: never completed, failed or cancelled", async () => {
    for (const disposition of ["operation-terminal", "cancellation-requested", "pass-fresh"]) {
      const execution = await acknowledged();
      const settled = settleForgeControl(execution, terminal({ operation_id: OP_ID, terminal_disposition: disposition }), () => SETTLED_AT);
      expect(settled).toMatchObject({ status: "settled", echo: { terminalDisposition: disposition },
        result: { phase: "result", outcome: "unknown", nativeResultRef: `forge-operation:${OP_ID}:terminal_disposition=${disposition}` } });
    }
  });

  it("a transport-terminal end, a missing or foreign echo and a malformed end park as uncertain, keep the acknowledged receipt and stay settleable", async () => {
    const execution = await acknowledged();
    let invoked = false;
    const accessor = Object.defineProperty({ operation_id: OP_ID }, "terminal_disposition", { enumerable: true, get: () => { invoked = true; return "cancelled-established"; } });
    const ends: [unknown, string, Record<string, string>?][] = [
      [{ terminality: "transport_terminal", error: new TransportClosed("gone sk-ant-x", { exitCode: null, signal: "SIGKILL" }, "") }, "transport-terminal", { code: "FORGE_TRANSPORT_CLOSED" }],
      [{ terminality: "transport_terminal", error: new Error("boom") }, "transport-terminal", { code: "unknown" }],
      [terminal({ operation_id: OP_ID }), "no-terminal-echo"],
      [terminal({ operation_id: OTHER_OP_ID, terminal_disposition: "cancelled-established" }), "no-terminal-echo"],
      [terminal({ terminal_disposition: "cancelled-established" }), "no-terminal-echo"],
      [terminal({ operation_id: OP_ID, terminal_disposition: "\u001b[31mcancelled-established" }), "no-terminal-echo"],
      [terminal({ operation_id: OP_ID, terminal_disposition: "CANCELLED_CONFIRMED" }), "no-terminal-echo"],
      [terminal(["cancelled-established"]), "no-terminal-echo"],
      [{ terminality: "forge_terminal", result: accessor }, "no-terminal-echo"],
      [{ terminality: "forge_terminal" }, "no-terminal-echo"],
      [{ terminality: "maybe", result: { operation_id: OP_ID, terminal_disposition: "cancelled-established" } }, "no-terminal-echo"],
      [undefined, "no-terminal-echo"],
    ];
    for (const [end, reason, failure] of ends) {
      const parked = settleForgeControl(execution, end as OperationEnd<ForgeJsonValue>, () => SETTLED_AT);
      expect(parked).toMatchObject({ verb: "operation.cancel", status: "uncertain", requested: execution.requested, acknowledged: execution.acknowledged,
        receipt: execution.acknowledged, uncertainty: { reason, ...(failure ? { failure } : {}) } });
      expect(parked.result).toBeUndefined();
      expect(JSON.stringify(parked)).not.toMatch(/sk-ant|boom/);
      expect(JSON.stringify(parked)).not.toMatch(UNSAFE);
    }
    expect(invoked).toBe(false);
    // None of those minted a result, so the operation's real terminal still settles the receipt.
    expect(settleForgeControl(execution, CANCELLED(), () => SETTLED_AT)).toMatchObject({ status: "settled", result: { outcome: "cancelled" } });
  });

  it("settles only an acknowledged execution this adapter returned, and only once", async () => {
    const execution = await acknowledged();
    refusedNow(() => settleForgeControl(Object.freeze({ ...execution }), CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
    const notAccepted = await executeForgeControl(permit(), deps(fakeSeam(() => REFUSED_ANSWER("REFUSED_ALREADY_TERMINAL"))));
    refusedNow(() => settleForgeControl(notAccepted, CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
    const uncertain = await executeForgeControl(permit(), deps(fakeSeam(() => ({ cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false }))));
    refusedNow(() => settleForgeControl(uncertain, CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
    refusedNow(() => settleForgeControl(undefined as unknown as ForgeControlExecution, CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
    const settled = settleForgeControl(execution, CANCELLED(), () => SETTLED_AT);
    expect(settled.status).toBe("settled");
    refusedNow(() => settleForgeControl(execution, CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
    refusedNow(() => settleForgeControl(settled, CANCELLED(), () => SETTLED_AT), "not-settleable", "validation");
  });

  it("refuses an invalid settle clock before reading the end, and parks when the core refuses to mint the result, leaving the receipt settleable", async () => {
    const execution = await acknowledged();
    refusedNow(() => settleForgeControl(execution, CANCELLED(), "now" as unknown as () => string), "invalid-deps", "validation");
    expect(settleForgeControl(execution, CANCELLED(), () => "2026-10-15T07:00:03")).toMatchObject({ status: "uncertain", receipt: execution.acknowledged,
      uncertainty: { reason: "receipt-refused" } });
    expect(settleForgeControl(execution, CANCELLED(), () => SETTLED_AT)).toMatchObject({ status: "settled", result: { outcome: "cancelled" } });
  });
});

describe("bounded, sanitized output and separation from observation", () => {
  it("routes every echoed native string through the shared sanitizers (strip, redact, strip), bounds it and never retains the raw payload", async () => {
    const hostile = { operation_id: "op\u001b[31m Bearer TOPSECRET", cancel_intent: "sk-\u200bant-api03-TOPSECRET", cancel_acceptance: "api_key=TOPSECRET\u202e",
      cancellation_established: false, establishment: "NOT_ATTEMPTED\u001b]0;pwned\u0007", detail: "password=hunter2", extra: "x".repeat(10_000) };
    const answer = async (): Promise<CancelReceipt> =>
      ({ operationId: OP_ID, cancelIntent: "CANCEL_REQUESTED", cancelAcceptance: "ACCEPTED", cancellationEstablished: false, raw: hostile });
    const execution = await executeForgeControl(permit(), deps(seamOf(answer)));
    expect(execution).toMatchObject({ status: "uncertain", uncertainty: { reason: "unattributable-answer" } });
    expect(execution.echo).toStrictEqual({ operationId: "op [REDACTED]", cancelIntent: "[REDACTED]", cancelAcceptance: "api_key=[REDACTED]", establishment: "NOT_ATTEMPTED" });
    // The one helper (wb-952; the 21:00Z display-path rule, "text" layout): whitespace separates, every other unsafe unit is
    // read both as a separator and as glue, and only then stripped, so neither a newline-glued credential nor a
    // control-split keyword escapes it. Deletion never precedes redaction.
    const glued = await executeForgeControl(permit(), deps(seamOf(async () => ({ operationId: OP_ID, cancelIntent: "CANCEL_REQUESTED", cancelAcceptance: "ACCEPTED",
      cancellationEstablished: false, raw: { operation_id: OP_ID, cancel_intent: "pass\u0007word=TOPSECRET", cancel_acceptance: "ACCEPTED",
        cancellation_established: false, establishment: "line\nsk-ant-api03-TOPSECRET" } }))));
    expect(glued.echo).toStrictEqual({ operationId: OP_ID, cancelIntent: "password=[REDACTED]", cancelAcceptance: "ACCEPTED", establishment: "line [REDACTED]" });
    const long = await executeForgeControl(permit(), deps(fakeSeam(() => ({ ...REFUSED_ANSWER("REFUSED_NOT_CANCELLABLE"), establishment: "N".repeat(10_000) }))));
    expect(long).toMatchObject({ status: "not-accepted", echo: { cancelAcceptance: "REFUSED_NOT_CANCELLABLE" } });
    for (const parked of [execution, glued, long]) {
      const text = JSON.stringify(parked);
      expect(text).not.toMatch(/TOPSECRET|hunter2|detail|xxxx|pwned/);
      expect(Buffer.byteLength(text)).toBeLessThan(4096);
      for (const value of Object.values(parked.echo ?? {})) {
        expect(value).not.toMatch(UNSAFE);
        expect(Buffer.byteLength(value)).toBeLessThanOrEqual(256);
      }
    }
  });

  it("is separate from observation and from every launcher by construction: type-only SDK import, no child process, no observer, read binding or loader", () => {
    const source = readFileSync(new URL("../src/workbench/forge-control.ts", import.meta.url), "utf8");
    const modules = (pattern: RegExp): string[] => [...source.matchAll(pattern)].map(match => match[1]).sort();
    expect(modules(/^import\s+(?!type\s)[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["./capability-registry.js", "./control.js", "./redaction.js"]);
    expect(modules(/^import\s+type\s[^;]*?\sfrom\s+["']([^"']+)["']/gm)).toStrictEqual(["@forge/sdk"]);
    expect(source).not.toMatch(/^import\s+["']/m);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(|child_process|\bspawn\b|\.invoke\s*\(|\.request\s*\(|decideControl\(|forge-observer|providers\/forge|native-modules/);
    for (const path of ["../src/workbench/forge-observer.ts", "../src/workbench/providers/forge.ts", "../src/workbench/forge-evidence.ts"]) {
      expect(readFileSync(new URL(path, import.meta.url), "utf8")).not.toMatch(/forge-control|operation\.cancel|\.cancel\s*\(/);
    }
  });
});

/**
 * wb-69g.9 respin (gate-3 g2-gate-r2 verdict; OWNER RULING F3, BOUNDARY 22:11Z). Spec lines pinned, quoted:
 * - BOUNDARY 21:00Z standing seat rule (F6), bound to this gate by name: a display path routes "through sanitizeWorkbenchText from
 *   src/workbench/redaction.ts with a NAMED layout"; "never compose stripUnsafeText/redactWorkbenchText locally and never add a
 *   local invisible-deletion regex (deletion never precedes redaction)".
 * - U1(i): "shown(v) := sanitizeWorkbenchText(v, ECHO_TEXT, "text") and DROP the local pre-pass + the stripUnsafeText import".
 * - U1(ii): "closed-vocabulary denial policy against the core's ControlDenyPolicy values ..., red-first with a forged frozen
 *   denial carrying "sk-ant-qqsecretqq" (kills G11)".
 * - U1(iii): "nativeResultRef carries the disposition only when sanitizeWorkbenchText(d, 64, "label") === d, else a fixed
 *   placeholder (withhold, never repair)"; OWNER RULING F3: "This respin KEEPS per-adapter vetting on its own surface ... never
 *   widen into control.ts".
 */

/**
 * The wb-952 17:32Z acceptance set, mirrored from test/workbench-sanitizer-corpus.test.ts at trunk 4853c40 (ACCEPTANCE_CODES,
 * BETWEEN_TOKENS, WITHIN_TOKENS and its whitespace units): 46 code points and an SGR sequence, each between two tokens (6
 * positions) and, unless it is whitespace, inside a keyword, prefix, key or token (9 positions). 696 shapes: the set the gate
 * measured leaking 512/696 through each free-text path of the delivered cut on the landing merge.
 */
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map(code => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", `${ESC}[0m`],
];
type Shape = (unit: string, secret: string) => string;
/** A unit here sits between two tokens: a separator reading exposes the credential. */
const BETWEEN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["before ghp_", (unit, secret) => `see${unit}ghp_${secret}`],
  ["before sk-ant-", (unit, secret) => `key${unit}sk-ant-${secret}`],
  ["before Bearer", (unit, secret) => `x${unit}Bearer ${secret}`],
  ["before Basic", (unit, secret) => `x${unit}Basic ${secret}`],
  ["as the space after Bearer", (unit, secret) => `Authorization: Bearer${unit}${secret}`],
  ["as the space after Basic", (unit, secret) => `Authorization: Basic${unit}${secret}`],
];
/** A unit here sits inside a keyword, prefix, key or token (and, in the mixes, between two tokens as well). */
const WITHIN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["inside Bearer", (unit, secret) => `Authorization: Bea${unit}rer ${secret}`],
  ["inside ghp_", (unit, secret) => `see gh${unit}p_${secret}`],
  ["inside a Bearer token", (unit, secret) => `Bearer SEC${unit}${secret}`],
  ["inside password", (unit, secret) => `pass${unit}word=${secret}`],
  ["before and inside Bearer", (unit, secret) => `x${unit}Bea${unit}rer ${secret}`],
  ["before and inside ghp_", (unit, secret) => `see${unit}gh${unit}p_${secret}`],
  ["inside and after Bearer", (unit, secret) => `Authorization: Bea${unit}rer${unit}${secret}`],
  ["before, inside and after Bearer", (unit, secret) => `x${unit}Bea${unit}rer${unit}${secret}`],
  ["after a key token and inside the next key name", (unit, secret) => `ghp_abc${unit}pass${unit}word=${secret}`],
];
/** The helper's whitespace units: whitespace always separates, so it never sits inside a token (12:10Z). */
const WHITESPACE_UNITS: ReadonlySet<string> = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map(cp));
interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secret: string;
}
const ACCEPTANCE: readonly Probe[] = ACCEPTANCE_UNITS.flatMap(([name, unit]) =>
  [...BETWEEN_TOKENS, ...(WHITESPACE_UNITS.has(unit) ? [] : WITHIN_TOKENS)].map(([position, shape]) => {
    const secret = `ACCEPT${name.replace(/[^A-Z0-9]/g, "")}${position.replace(/[^a-z]/g, "").slice(0, 24)}`;
    return { id: `${name} ${position}`, raw: shape(unit, secret), secret };
  }),
);
/** What a display string may never keep (the corpus's UNSAFE_DISPLAY, wb-rqd format controls included). */
const DISPLAY_UNSAFE = /[\x00-\x1f\x7f-\x9f\u{2028}\u{2029}\u{fff9}-\u{fffb}\u{13430}-\u{1343f}]|\p{Default_Ignorable_Code_Point}|[\u{d800}-\u{dfff}]/u;

type FreeTextPath = "surface.mode" | "echo.operationId" | "echo.cancelIntent" | "echo.cancelAcceptance" | "echo.establishment";
const FREE_TEXT_PATHS: readonly FreeTextPath[] = ["surface.mode", "echo.operationId", "echo.cancelIntent", "echo.cancelAcceptance", "echo.establishment"];
/**
 * One producer string through each free-text display path, as the gate drove them: the capability map's mode on a refused
 * connection; operation_id, cancel_intent and cancel_acceptance on an unattributable answer; establishment on Forge's
 * REFUSED_NOT_CANCELLABLE answer through the vendored decoder. Every permit is core-minted over one shared projection.
 */
async function displayed(raw: string, projection: ObservationProjection): Promise<Record<FreeTextPath, string | null | undefined>> {
  const capabilities = new CapabilityMap(raw as unknown as "app_server", { "operation.cancel": "unsupported" });
  const refusal = await refused(executeForgeControl(permit({}, projection), deps({ operations: fakeSeam().operations, connection: { capabilities } })),
    "capability-unavailable", "unavailable");
  const unattributable = await executeForgeControl(permit({}, projection), deps(seamOf(async () => ({ operationId: OP_ID, cancelIntent: "CANCEL_REQUESTED",
    cancelAcceptance: "ACCEPTED", cancellationEstablished: false, raw: { operation_id: raw, cancel_intent: raw, cancel_acceptance: raw, cancellation_established: false } }))));
  expect(unattributable.uncertainty?.reason).toBe("unattributable-answer");
  const notAccepted = await executeForgeControl(permit({}, projection), deps(fakeSeam(() => ({ ...REFUSED_ANSWER("REFUSED_NOT_CANCELLABLE"), establishment: raw }))));
  expect(notAccepted.status).toBe("not-accepted");
  return {
    "surface.mode": refusal.surface?.mode, "echo.operationId": unattributable.echo?.operationId, "echo.cancelIntent": unattributable.echo?.cancelIntent,
    "echo.cancelAcceptance": unattributable.echo?.cancelAcceptance, "echo.establishment": notAccepted.echo?.establishment,
  };
}

describe("wb-69g.9 respin: every display path is the one helper with a named layout; closed vocabularies; vetted-or-withheld refs", () => {
  it("the wb-952 17:32Z acceptance set (696 shapes) through each of the five free-text paths: exactly the helper's text layout, nothing leaked or unsafe kept", async () => {
    expect(ACCEPTANCE).toHaveLength(696);
    const projection = forge();
    type Tally = { leaked: number; unsafe: number; notTextLayout: number; firstLeak?: string };
    const tally = Object.fromEntries(FREE_TEXT_PATHS.map(path => [path, { leaked: 0, unsafe: 0, notTextLayout: 0 }])) as Record<FreeTextPath, Tally>;
    for (const probe of ACCEPTANCE) {
      const expected = sanitizeWorkbenchText(probe.raw, 256, "text");
      const shown = await displayed(probe.raw, projection);
      for (const path of FREE_TEXT_PATHS) {
        const text = shown[path] ?? "";
        const row = tally[path];
        if (text.includes(probe.secret)) {
          row.leaked += 1;
          row.firstLeak ??= probe.id;
        }
        if (DISPLAY_UNSAFE.test(text)) row.unsafe += 1;
        if (text !== expected) row.notTextLayout += 1;
      }
    }
    expect(tally).toStrictEqual(Object.fromEntries(FREE_TEXT_PATHS.map(path => [path, { leaked: 0, unsafe: 0, notTextLayout: 0 }])));
  }, 120_000);

  it("named falsifiers: a zero-width before ghp_, as the scheme's space and as the position-aware mix render as the helper's text layout on every free-text path", async () => {
    const projection = forge();
    const cases: readonly (readonly [raw: string, expected: string])[] = [
      [`see${ZWSP}ghp_SEESECRETQQ`, "see[REDACTED]"],
      [`Authorization: Bearer${ZWSP}SPACESECRETQQ`, "Authorization: [REDACTED]"],
      [`ghp_abc${ZWSP}pass${ZWSP}word=MIXSECRETQQ`, "[REDACTED]=[REDACTED]"],
      // A BEL glued inside the keyword vanishes in the text layout (the delivered expectation, unchanged).
      [`pass${cp(0x07)}word=BELSECRETQQ`, "password=[REDACTED]"],
    ];
    for (const [raw, expected] of cases) {
      expect(sanitizeWorkbenchText(raw, 256, "text")).toBe(expected);
      expect(await displayed(raw, projection)).toStrictEqual(Object.fromEntries(FREE_TEXT_PATHS.map(path => [path, expected])));
    }
  });

  it("a denied decision's policy is echoed only from the core's closed ControlDenyPolicy vocabulary: a forged frozen denial's policy is withheld (kills G11)", async () => {
    let invoked = false;
    const accessor = Object.freeze(Object.defineProperty({ decision: "denied", category: "authorization", reason: "forged" }, "policy",
      { enumerable: true, get: () => { invoked = true; return "observer-only"; } }));
    const policies: unknown[] = ["sk-ant-qqsecretqq", "sk-proj-qqsecretqq", "anything-goes", "observer-only ", "Observer-only", "observer_only", "", 7, null];
    const forgeries: unknown[] = [...policies.map(policy => Object.freeze({ decision: "denied", category: "authorization", reason: "forged", policy })), accessor];
    for (const forged of forgeries) {
      const fake = fakeSeam();
      const seen = untouchable(deps(fake));
      const failure = await refused(executeForgeControl(forged as ControlDecision, seen.proxy), "denied-decision", "authorization");
      expect(failure.policy).toBeUndefined();
      expect(JSON.stringify({ message: failure.message, policy: failure.policy })).not.toMatch(/qqsecretqq|anything-goes/);
      expect(seen.touched).toStrictEqual([]);
      expect(fake.cancel).not.toHaveBeenCalled();
    }
    expect(invoked).toBe(false);
    // The vocabulary is the core's own, so a frozen denial naming one of its policies still echoes it (structural vetting
    // only; decision provenance is wb-pjj's).
    const named = Object.freeze({ decision: "denied", category: "validation", reason: "forged", policy: "malformed-request" }) as ControlDecision;
    const failure = await refused(executeForgeControl(named, deps(fakeSeam())), "denied-decision", "validation");
    expect(failure.policy).toBe("malformed-request");
  });

  it("a credential-shaped terminal_disposition settles unknown with the disposition withheld from nativeResultRef, never repaired; the echo reads [REDACTED]", async () => {
    for (const disposition of ["sk-ant-api03-dispsecretqq", "sk-proj-dispsecretqq"]) {
      const settled = settleForgeControl(await acknowledged(), terminal({ operation_id: OP_ID, terminal_disposition: disposition }), () => SETTLED_AT);
      expect(settled).toMatchObject({ status: "settled", echo: { terminalDisposition: "[REDACTED]" },
        result: { phase: "result", outcome: "unknown", nativeResultRef: `forge-operation:${OP_ID}:terminal_disposition=[withheld]` } });
      expect(JSON.stringify(settled)).not.toContain("dispsecretqq");
    }
    // A plain disposition is quoted unchanged, and every reference this adapter composes is one the shared helper's label layout
    // leaves unchanged (the property the owner-filed core-side admission will require of every adapter, OWNER RULING F3).
    for (const disposition of ["cancelled-established", "operation-terminal", "sk-ant-api03-dispsecretqq"]) {
      const settled = settleForgeControl(await acknowledged(), terminal({ operation_id: OP_ID, terminal_disposition: disposition }), () => SETTLED_AT);
      const refs = [settled.acknowledged?.nativeAckRef, settled.result?.nativeResultRef];
      expect(refs.every(ref => typeof ref === "string")).toBe(true);
      for (const ref of refs) expect(sanitizeWorkbenchText(ref ?? "", 4096, "label")).toBe(ref);
    }
    // The vetting bound fits the whole grammar: a 64-character plain disposition is still quoted, never withheld.
    for (const disposition of ["operation-terminal", `a${"-b".repeat(31)}c`]) {
      expect(disposition.length).toBeLessThanOrEqual(64);
      const quoted = settleForgeControl(await acknowledged(), terminal({ operation_id: OP_ID, terminal_disposition: disposition }), () => SETTLED_AT);
      expect(quoted.result?.nativeResultRef).toBe(`forge-operation:${OP_ID}:terminal_disposition=${disposition}`);
    }
  });

  it("composes no sanitizer of its own: no stripUnsafeText or redactWorkbenchText, no local unsafe-unit pattern, and every helper call names its layout", () => {
    const source = readFileSync(new URL("../src/workbench/forge-control.ts", import.meta.url), "utf8");
    expect(source).not.toMatch(/\bstripUnsafeText\b|\bredactWorkbenchText\b/);
    expect(source).not.toMatch(/\\p\{|Default_Ignorable|\\u200b|\\x1b/i);
    const opened = source.match(/\bsanitizeWorkbenchText\(/g) ?? [];
    const named = source.match(/\bsanitizeWorkbenchText\([^()]*,\s*"(?:text|terminal|label|lines)"\)/g) ?? [];
    expect(opened.length).toBeGreaterThanOrEqual(2);
    expect(named).toHaveLength(opened.length);
  });
});
