/** wb-69g.1 (W16-A): the pure workflow_control decision and its requested -> acknowledged -> result receipt. No TTY, provider or network. */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  CONTROL_CONTRACT_VERSION,
  CONTROL_PERMIT_POLICY,
  type ControlDecision,
  type ControlDenyPolicy,
  type ControlOutcome,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
  type NativeControlRequest,
  type RequestedControlReceipt,
  type ResultControlReceipt,
  settle,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Relation, type RelationKind } from "../src/workbench/observation.js";

const SCOPE: ObservationScope = { workspace: "/tmp/external-ws", principal: "tester" };
const AT = "2026-10-15T06:00:00Z";
const REQUESTED_AT = "2026-10-15T07:00:00Z";
const NOW = "2026-10-15T07:00:01Z";
const GRANT = "control:furnace.stop";
const OWNERSHIP_REF = "req-attempts";
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: SCOPE.workspace };
const READER: NativeRef = { provider: "pi-workflow", type: "agent-call", id: "inv-reader:0" };

interface Edge { from: NativeRef; to: NativeRef; kind: RelationKind; provenance: Relation["provenance"] }

function observe(scope: ObservationScope, refs: readonly NativeRef[], edges: readonly Edge[]): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of refs) {
    projection.refresh({ source, scope, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  for (const edge of edges) projection.relate({ scope, ...edge });
  return projection;
}
/** The edge FurnaceObserver.projectionTopology states (wb-752.1): Run -> Attempt, furnace-sourced, confirmed by the Attempt page request id. */
const owns = (from: NativeRef, to: NativeRef, nativeConfirmationRef = OWNERSHIP_REF): Edge =>
  ({ from, to, kind: "ownership", provenance: { source: from.provider, observedAt: AT, nativeConfirmationRef } });
const furnace = (scope: ObservationScope = SCOPE): ObservationProjection => observe(scope, [RUN, ATTEMPT], [owns(RUN, ATTEMPT)]);

function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["observe:furnace.run.inspect", GRANT],
    target: { ...RUN }, action: "stop", params: { confirmed: true }, invocationId: "inv-control-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decide = (overrides: Partial<NativeControlRequest> = {}, projection: ObservationProjection = furnace()): ControlDecision =>
  decideControl(request(overrides), { projection, now: () => NOW });
const denied = (policy: ControlDenyPolicy, category: "authorization" | "validation", reason: string) => ({ decision: "denied", category, reason, policy });
function permitted(decision: ControlDecision): RequestedControlReceipt {
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision.receipt;
}
function validationFailure(fn: () => unknown): void {
  let failure: unknown;
  try { fn(); } catch (error) { failure = error; }
  expect(failure).toBeInstanceOf(CapabilityError);
  expect((failure as CapabilityError).category).toBe("validation");
}
const ACK = { acknowledgedAt: "2026-10-15T07:00:02Z", nativeAckRef: "frn-req-stop-1" };
const DONE = { outcome: "completed" as ControlOutcome, nativeResultRef: "frn-req-status-2", settledAt: "2026-10-15T07:00:09Z" };
const NO_OWNER = denied("no-confirmed-ownership", "authorization", "no confirmed lifecycle ownership");

afterEach(() => { vi.restoreAllMocks(); });

describe("decideControl deny rules (first match wins; every rule refuses on its own)", () => {
  it("rule 1: unknown permission data (undefined, non-array, non-string entries, wildcards) is an authorization denial", () => {
    const sparse: string[] = [];
    sparse[1] = GRANT;
    const unknown: unknown[] = [undefined, null, GRANT, { 0: GRANT, length: 1 }, [42], [GRANT, 42], [GRANT, null], ["control:*"], ["control:furnace.*"],
      ["*"], [GRANT, "control:*"], [""], [" control:furnace.stop"], ["CONTROL:FURNACE.STOP"], [`${GRANT}\n`], sparse];
    for (const grants of unknown) {
      expect(decide({ grants: grants as readonly string[] })).toStrictEqual(denied("unknown-permission-data", "authorization", "unknown permission data"));
    }
    expect(Object.isFrozen(decide({ grants: undefined }))).toBe(true);
  });

  it("rule 2: observer-only grants cannot control under any action spelling, and nothing is read before refusing", () => {
    const projection = furnace();
    const query = vi.spyOn(projection, "query");
    const relations = vi.spyOn(projection, "relations");
    const observers: readonly (readonly string[])[] = [["observe:furnace.run.inspect"], ["workbench:observe"], [],
      ["discover:furnace.run.inspect", "inspect:furnace.run.inspect", "observe:furnace.run.inspect"]];
    for (const grants of observers) {
      for (const action of ["stop", "STOP", "terminate", "__proto__", "constructor", "toString"]) {
        expect(decide({ grants, action }, projection)).toStrictEqual(denied("observer-only", "authorization", "observer-only"));
      }
    }
    expect(query).not.toHaveBeenCalled();
    expect(relations).not.toHaveBeenCalled();
  });

  it("malformed envelope: every field copied into the audit receipt is bounded clean text and requestedAt is a zoned instant", () => {
    const malformed: Partial<NativeControlRequest>[] = [
      { target: { ...RUN, id: "frn-run-r1\u001b[31m" } }, { target: { ...RUN, provider: "" } }, { target: { ...RUN, scope: "\u202e/tmp/external-ws" } },
      { target: undefined as unknown as NativeRef }, { invocationId: "" }, { invocationId: "   " }, { invocationId: "x".repeat(257) },
      { principal: { id: "" } }, { principal: { id: SCOPE.principal, role: "operator\n" } }, { scope: { workspace: SCOPE.workspace, principal: "" } },
      { scope: { workspace: "/tmp/\u0007ws", principal: SCOPE.principal } }, { requestedAt: "2026-10-15T07:00:00" }, { requestedAt: "yesterday" },
      { requestedAt: "2026-13-45T99:00:00Z" }, { requestedAt: 1_792_000_000_000 as unknown as string },
    ];
    for (const overrides of malformed) {
      expect(decide(overrides)).toStrictEqual(denied("malformed-request", "validation", "malformed control request"));
    }
  });

  it("rule 3: only the frozen per-provider allowlist resolves an action (exact, case-sensitive, no prototype lookups)", () => {
    const grants = ["control:furnace.stop", "control:forge.cancel", "control:claude-agent-sdk.interrupt", "control:hyperunix.stop"];
    const unknownActions: [string, unknown][] = [
      ["furnace", "STOP"], ["furnace", "Stop"], ["furnace", "stop "], ["furnace", "terminate"], ["furnace", "kill"], ["furnace", "delete"],
      ["furnace", "pause"], ["furnace", "__proto__"], ["furnace", "constructor"], ["furnace", "hasOwnProperty"], ["furnace", 7],
      ["forge", "stop"], ["forge", "interrupt"], ["claude-agent-sdk", "stop"], ["claude-agent-sdk", "cancel"],
      ["hyperunix", "stop"], ["hyperunix", "cancel"], ["__proto__", "stop"], ["constructor", "stop"], ["toString", "stop"],
    ];
    for (const [provider, action] of unknownActions) {
      expect(decide({ grants, target: { ...RUN, provider }, action: action as string })).toStrictEqual(denied("unknown-action", "validation", "unknown action"));
    }
  });

  it("rule 3: a polluted Object.prototype cannot manufacture a provider verb", () => {
    const query: NativeRef = { provider: "hyperunix", type: "query", id: "hx-q1" };
    const page: NativeRef = { provider: "hyperunix", type: "page", id: "hx-q1:p1" };
    const projection = observe(SCOPE, [query, page], [owns(query, page, "hx-req-1")]);
    const proto = Object.prototype as Record<string, unknown>;
    // Every other precondition holds, so only the own-property allowlist lookup stands between this and a permit.
    const decision = (() => {
      proto.hyperunix = ["stop"];
      try { return decide({ grants: ["control:hyperunix.stop"], target: query, action: "stop" }, projection); } finally { Reflect.deleteProperty(proto, "hyperunix"); }
    })();
    expect(Object.hasOwn(Object.prototype, "hyperunix")).toBe(false);
    expect(decision).toStrictEqual(denied("unknown-action", "validation", "unknown action"));
  });

  it("rule 4: the exact grant control:<provider>.<action> is required verbatim", () => {
    const near: readonly (readonly string[])[] = [["control:furnace.pause"], ["control:furnace"], ["control:furnace.stopped"], ["control:furnace.stop.all"],
      ["control:forge.cancel"], ["control:claude-agent-sdk.interrupt"], ["invoke:furnace.run.inspect", "control:hyperunix.stop"]];
    for (const grants of near) {
      expect(decide({ grants })).toStrictEqual(denied("missing-exact-grant", "authorization", "missing exact grant control:furnace.stop"));
    }
    const operation: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
    expect(decide({ grants: [GRANT], target: operation, action: "cancel" }))
      .toStrictEqual(denied("missing-exact-grant", "authorization", "missing exact grant control:forge.cancel"));
  });

  it("rule 5: a target in another workspace or principal is an authorization failure even with a valid control grant", () => {
    const crossScope = denied("cross-scope", "authorization", "cross-scope");
    expect(decide({}, furnace({ workspace: "/tmp/other-ws", principal: SCOPE.principal }))).toStrictEqual(crossScope);
    expect(decide({}, furnace({ workspace: SCOPE.workspace, principal: "other-operator" }))).toStrictEqual(crossScope);
    // The requester must be the scope principal the host bound; otherwise the target is another principal's.
    expect(decide({ principal: { id: "intruder" } })).toStrictEqual(crossScope);
    // Unobserved and foreign targets deny alike, so the decision is no cross-scope existence oracle.
    expect(decide({ target: { ...RUN, id: "frn-run-unseen" } })).toStrictEqual(crossScope);
    expect(decide({ target: { provider: RUN.provider, type: RUN.type, id: RUN.id } })).toStrictEqual(crossScope);
  });

  it("rule 5: re-checks the observed node's scope and native identity instead of trusting the query", () => {
    const projection = furnace();
    const observed = projection.query({ scope: SCOPE, ref: RUN, limit: 1 });
    const node = observed.nodes[0];
    const query = vi.spyOn(projection, "query");
    for (const forged of [{ ...node, scope: { workspace: "/tmp/other-ws", principal: SCOPE.principal } }, { ...node, scope: { ...SCOPE, principal: "other-operator" } },
      { ...node, nativeRef: { ...ATTEMPT } }, { ...node, nativeRef: { provider: RUN.provider, type: RUN.type, id: RUN.id } }]) {
      query.mockReturnValueOnce({ ...observed, nodes: [forged] });
      expect(decide({}, projection)).toStrictEqual(denied("cross-scope", "authorization", "cross-scope"));
    }
    query.mockReturnValueOnce(observed);
    expect(decide({}, projection).decision).toBe("permitted");
  });

  it("rule 6: causation, grouping, dependency and hypothesis never confer lifecycle ownership, and the owned child holds no owner rights", () => {
    const other = (kind: RelationKind): Edge => ({ from: RUN, to: ATTEMPT, kind, provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: OWNERSHIP_REF } });
    const sharedChild = observe(SCOPE, [READER, RUN, ATTEMPT], [
      { from: READER, to: RUN, kind: "causation", provenance: { source: "pi-workflow", observedAt: AT, nativeConfirmationRef: "toolu-1" } },
      { from: READER, to: RUN, kind: "grouping", provenance: { source: "pi-workflow", observedAt: AT } },
      ...(["causation", "grouping", "dependency", "hypothesis"] as const).map(other),
    ]);
    expect(decide({}, sharedChild)).toStrictEqual(NO_OWNER);
    expect(decide({}, observe(SCOPE, [RUN], []))).toStrictEqual(NO_OWNER);
    // Child cancellation goes through its owner's native rights (WB-010): the Attempt is owned, not an owner.
    expect(decide({ target: { ...ATTEMPT } })).toStrictEqual(NO_OWNER);
  });

  it("rule 6: re-checks the ownership provenance instead of trusting the relation kind", () => {
    const projection = furnace();
    const from = projection.query({ scope: SCOPE, ref: RUN, limit: 1 }).nodes[0].key;
    const statement = (overrides: Partial<Relation> = {}, provenance: Partial<Relation["provenance"]> = {}): Relation =>
      ({ from, to: "attempt-key", kind: "ownership", ...overrides, provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: OWNERSHIP_REF, ...provenance } });
    const relations = vi.spyOn(projection, "relations");
    for (const forged of [statement({}, { source: "pi-workflow" }), statement({}, { source: "FURNACE" }), statement({}, { nativeConfirmationRef: "" }),
      statement({}, { nativeConfirmationRef: "   " }), statement({}, { nativeConfirmationRef: undefined }), statement({}, { nativeConfirmationRef: "req\u001b]0;x\u0007" }),
      statement({ from: "elsewhere" }), statement({ kind: "causation" })]) {
      relations.mockReturnValueOnce([forged]);
      expect(decide({}, projection)).toStrictEqual(NO_OWNER);
    }
    relations.mockReturnValueOnce([statement({ kind: "grouping" }), statement()]);
    expect(permitted(decide({}, projection)).ownershipConfirmationRef).toBe(OWNERSHIP_REF);
  });

  it("rule 7: destructive actions need params.confirmed === true as an own data property, and a getter is never invoked", () => {
    const getter = vi.fn(() => true);
    const accessor = Object.defineProperty({}, "confirmed", { enumerable: true, get: getter });
    const inherited: unknown = Object.create({ confirmed: true });
    const unconfirmed: unknown[] = [undefined, null, true, "confirmed", 1, [true], {}, { confirmed: false }, { confirmed: "true" }, { confirmed: 1 },
      { confirmed: [true] }, { confirmed: { value: true } }, accessor, inherited];
    for (const params of unconfirmed) {
      expect(decide({ params: params as JsonValue })).toStrictEqual(denied("operator-confirmation", "validation", "operator confirmation required"));
    }
    expect(getter).not.toHaveBeenCalled();
    expect([...DESTRUCTIVE_CONTROL_ACTIONS]).toStrictEqual(["stop", "cancel", "interrupt", "kill", "delete"]);
    expect(Object.isFrozen(DESTRUCTIVE_CONTROL_ACTIONS)).toBe(true);
    // Every allowlisted native verb is destructive, so none can be permitted without operator confirmation.
    for (const actions of Object.values(NATIVE_CONTROL_ACTIONS)) for (const action of actions) expect(DESTRUCTIVE_CONTROL_ACTIONS).toContain(action);
  });

  it("first match wins: repairing one violation at a time walks the rules in order to a permit", () => {
    let overrides: Partial<NativeControlRequest> = { grants: ["control:*"], invocationId: "", action: "terminate", params: {} };
    let projection = furnace({ workspace: "/tmp/other-ws", principal: SCOPE.principal });
    const causalOnly = observe(SCOPE, [RUN, ATTEMPT], [{ from: RUN, to: ATTEMPT, kind: "causation", provenance: { source: "furnace", observedAt: AT } }]);
    const walk: [ControlDenyPolicy, () => void][] = [
      ["unknown-permission-data", () => { overrides = { ...overrides, grants: ["observe:furnace.run.inspect"] }; }],
      ["observer-only", () => { overrides = { ...overrides, grants: ["control:furnace.pause"] }; }],
      ["malformed-request", () => { overrides = { ...overrides, invocationId: "inv-control-1" }; }],
      ["unknown-action", () => { overrides = { ...overrides, action: "stop" }; }],
      ["missing-exact-grant", () => { overrides = { ...overrides, grants: [GRANT] }; }],
      ["cross-scope", () => { projection = causalOnly; }],
      ["no-confirmed-ownership", () => { projection = furnace(); }],
      ["operator-confirmation", () => { overrides = { ...overrides, params: { confirmed: true } }; }],
    ];
    for (const [policy, repair] of walk) {
      const decision = decide(overrides, projection);
      expect(decision.decision === "denied" ? decision.policy : decision.decision).toBe(policy);
      repair();
    }
    expect(decide(overrides, projection).decision).toBe("permitted");
  });
});

describe("permitted receipt and its native phases", () => {
  it("permits the confirmed owner and records principal, contract, invocation, target, grant, policy and the ownership confirmation", () => {
    const decision = decide();
    const receipt = permitted(decision);
    expect(receipt).toStrictEqual({
      contractVersion: "workbench.control/v1", phase: "requested", requestId: expect.stringMatching(/^ctl_[0-9a-f]{32}$/), scope: SCOPE,
      principal: { id: SCOPE.principal, role: "local-operator" }, grant: GRANT, policy: CONTROL_PERMIT_POLICY, target: RUN, action: "stop",
      invocationId: "inv-control-1", ownershipConfirmationRef: OWNERSHIP_REF, requestedAt: REQUESTED_AT, decidedAt: NOW,
    });
    expect(CONTROL_CONTRACT_VERSION).toBe("workbench.control/v1");
    for (const value of [decision, receipt, receipt.scope, receipt.principal, receipt.target]) expect(Object.isFrozen(value)).toBe(true);
    for (const key of ["acknowledgedAt", "nativeAckRef", "outcome", "nativeResultRef", "settledAt", "params"]) expect(receipt).not.toHaveProperty(key);
    // Each provider's single allowlisted verb permits on a target that producer confirms owning.
    const session: NativeRef = { provider: "claude-agent-sdk", type: "session", id: "sess-1" };
    const subagent: NativeRef = { provider: "claude-agent-sdk", type: "subagent", id: "sess-1:sub-1" };
    const claude = observe(SCOPE, [session, subagent], [owns(session, subagent, "sess-1")]);
    expect(permitted(decide({ grants: ["control:claude-agent-sdk.interrupt"], target: session, action: "interrupt" }, claude)))
      .toMatchObject({ grant: "control:claude-agent-sdk.interrupt", action: "interrupt", ownershipConfirmationRef: "sess-1" });
    const operation: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
    const step: NativeRef = { provider: "forge", type: "step", id: "op-1:lint" };
    expect(permitted(decide({ grants: ["control:forge.cancel"], target: operation, action: "cancel" }, observe(SCOPE, [operation, step], [owns(operation, step, "forge-op-1")]))))
      .toMatchObject({ grant: "control:forge.cancel", action: "cancel", ownershipConfirmationRef: "forge-op-1" });
  });

  it("derives one request id per logical invocation: stable across retries, distinct per invocation, principal and target", () => {
    const id = (overrides: Partial<NativeControlRequest> = {}, projection: ObservationProjection = furnace()): string => permitted(decide(overrides, projection)).requestId;
    expect(id()).toBe(id({ requestedAt: "2026-10-15T09:05:00+02:00" }));
    expect(id({ invocationId: "inv-control-2" })).not.toBe(id());
    const peer: ObservationScope = { workspace: SCOPE.workspace, principal: "operator-2" };
    expect(id({ scope: peer, principal: { id: peer.principal } }, furnace(peer))).not.toBe(id());
    const second: NativeRef = { ...RUN, id: "frn-run-r2" };
    expect(id({ target: second }, observe(SCOPE, [second, ATTEMPT], [owns(second, ATTEMPT)]))).not.toBe(id());
  });

  it("requested, acknowledged and result are three distinct, ordered, frozen receipts that each carry their own timestamp", () => {
    const requested = permitted(decide());
    const requestedJson = JSON.stringify(requested);
    expect(requestedJson).not.toContain("acknowledged");
    expect(requestedJson).not.toContain("completed");
    const acknowledged = acknowledge(requested, ACK);
    expect(JSON.stringify(acknowledged)).not.toContain("completed");
    const result = settle(acknowledged, DONE);
    expect(new Set([requested.phase, acknowledged.phase, result.phase])).toStrictEqual(new Set(["requested", "acknowledged", "result"]));
    expect(acknowledged).toStrictEqual({ ...requested, phase: "acknowledged", ...ACK });
    expect(result).toStrictEqual({ ...acknowledged, phase: "result", ...DONE });
    expect([requested.requestedAt, acknowledged.acknowledgedAt, result.settledAt]).toStrictEqual([REQUESTED_AT, ACK.acknowledgedAt, DONE.settledAt]);
    // Transitions mint new receipts; an earlier phase is never rewritten.
    expect(requested).not.toHaveProperty("nativeAckRef");
    expect(acknowledged).not.toHaveProperty("nativeResultRef");
    for (const receipt of [requested, acknowledged, result] as NativeControlReceipt[]) {
      for (const value of [receipt, receipt.scope, receipt.principal, receipt.target]) expect(Object.isFrozen(value)).toBe(true);
      expect(() => { (receipt as { phase: string }).phase = "result"; }).toThrow(TypeError);
    }
    for (const outcome of ["completed", "failed", "cancelled", "unknown"] as const) {
      expect(settle(acknowledged, { ...DONE, outcome, nativeResultRef: `res-${outcome}` })).toMatchObject({ phase: "result", outcome, nativeResultRef: `res-${outcome}` });
    }
  });

  it("refuses out-of-order transitions and missing native references with CapabilityError('validation')", () => {
    const requested = permitted(decide());
    const acknowledged = acknowledge(requested, ACK);
    const result = settle(acknowledged, DONE);
    validationFailure(() => settle(requested, DONE));
    validationFailure(() => acknowledge(acknowledged, ACK));
    validationFailure(() => acknowledge(result, ACK));
    validationFailure(() => settle(result, DONE));
    for (const nativeAckRef of ["", "   ", undefined, "ack\u001b[2J", "a".repeat(4097)]) {
      validationFailure(() => acknowledge(requested, { ...ACK, nativeAckRef: nativeAckRef as string }));
    }
    for (const nativeResultRef of ["", "   ", undefined, "res\u202e"]) {
      validationFailure(() => settle(acknowledged, { ...DONE, nativeResultRef: nativeResultRef as string }));
    }
    for (const acknowledgedAt of ["", "later", "2026-10-15T07:00:02"]) validationFailure(() => acknowledge(requested, { ...ACK, acknowledgedAt }));
    for (const settledAt of ["later", "2026-10-15T07:00:09"]) validationFailure(() => settle(acknowledged, { ...DONE, settledAt }));
    validationFailure(() => settle(acknowledged, { ...DONE, outcome: "success" as ControlOutcome }));
    validationFailure(() => acknowledge({ ...requested, contractVersion: "workbench.control/v0" } as unknown as NativeControlReceipt, ACK));
    validationFailure(() => settle({ ...acknowledged, nativeAckRef: "" } as NativeControlReceipt, DONE));
    // A requested receipt carrying acknowledgement fields is still not acknowledged: the phase alone gates settle.
    validationFailure(() => settle({ ...requested, ...ACK } as NativeControlReceipt, DONE));
    // The result phase cannot be expressed without its native result reference.
    expectTypeOf<ResultControlReceipt["nativeResultRef"]>().toEqualTypeOf<string>();
    expectTypeOf<Extract<NativeControlReceipt, { phase: "result" }>>().toEqualTypeOf<ResultControlReceipt>();
    expect([requested.phase, acknowledged.phase, result.phase]).toStrictEqual(["requested", "acknowledged", "result"]);
  });
});

describe("allowlist and purity", () => {
  it("freezes the per-provider allowlist; an unlisted provider such as hyperunix has no permitted action at all", () => {
    expect(Object.entries(NATIVE_CONTROL_ACTIONS)).toStrictEqual([["furnace", ["stop"]], ["claude-agent-sdk", ["interrupt"]], ["forge", ["cancel"]]]);
    expect(Object.isFrozen(NATIVE_CONTROL_ACTIONS)).toBe(true);
    for (const actions of Object.values(NATIVE_CONTROL_ACTIONS)) expect(Object.isFrozen(actions)).toBe(true);
    expect(() => { (NATIVE_CONTROL_ACTIONS as Record<string, readonly string[]>).hyperunix = ["stop"]; }).toThrow(TypeError);
    expect(() => (NATIVE_CONTROL_ACTIONS.furnace as string[]).push("kill")).toThrow(TypeError);
    const query: NativeRef = { provider: "hyperunix", type: "query", id: "hx-q1" };
    const page: NativeRef = { provider: "hyperunix", type: "page", id: "hx-q1:p1" };
    const projection = observe(SCOPE, [query, page], [owns(query, page, "hx-req-1")]);
    for (const action of new Set([...Object.values(NATIVE_CONTROL_ACTIONS).flat(), ...DESTRUCTIVE_CONTROL_ACTIONS, "find"])) {
      expect(decide({ grants: [`control:hyperunix.${action}`], target: query, action }, projection)).toStrictEqual(denied("unknown-action", "validation", "unknown action"));
    }
  });

  it("is synchronous and side-effect free: projection reads only, and the host clock only stamps a permit", () => {
    const projection = furnace();
    const before = JSON.stringify({ stats: projection.stats(), topology: projection.relationRevision(), nodes: projection.query({ scope: SCOPE, limit: 100 }).nodes,
      relations: projection.relations({ scope: SCOPE }), window: projection.window({ scope: SCOPE, invocationId: "inv-control-1", offset: 0, limit: 10 }) });
    const methods = Object.getOwnPropertyNames(ObservationProjection.prototype).filter(name => name !== "constructor");
    for (const mutator of ["ingest", "refresh", "markStale", "disconnect", "reconnect", "relate"]) expect(methods).toContain(mutator);
    const surface = projection as unknown as Record<string, (...args: unknown[]) => unknown>;
    const spies = methods.map(name => [name, vi.spyOn(surface, name)] as const);
    const now = vi.fn(() => NOW);
    const decision = decideControl(request(), { projection, now });
    expect(decision).not.toBeInstanceOf(Promise);
    expect(decision.decision).toBe("permitted");
    expect(now).toHaveBeenCalledTimes(1);
    for (const overrides of [{ grants: ["observe:furnace.run.inspect"] }, { action: "terminate" }, { params: {} }, { target: { ...ATTEMPT } }]) {
      expect(decideControl(request(overrides), { projection, now }).decision).toBe("denied");
    }
    expect(now).toHaveBeenCalledTimes(1);
    expect(spies.filter(([, spy]) => spy.mock.calls.length > 0).map(([name]) => name).sort()).toStrictEqual(["query", "relations"]);
    vi.restoreAllMocks();
    expect(JSON.stringify({ stats: projection.stats(), topology: projection.relationRevision(), nodes: projection.query({ scope: SCOPE, limit: 100 }).nodes,
      relations: projection.relations({ scope: SCOPE }), window: projection.window({ scope: SCOPE, invocationId: "inv-control-1", offset: 0, limit: 10 }) })).toBe(before);
    validationFailure(() => decideControl(request(), { projection, now: () => "2026-10-15 07:00" }));
  });

  it("is provider-free by construction: no provider, SDK, TTY or network module is imported", () => {
    const source = readFileSync(new URL("../src/workbench/control.ts", import.meta.url), "utf8");
    // Static imports, re-exports and side-effect imports all name their module in a string literal.
    const imports = new Set([...source.matchAll(/^(?:import|export)\s[^;]*?\sfrom\s+["']([^"']+)["']/gm), ...source.matchAll(/^import\s+["']([^"']+)["']/gm)]
      .map(match => match[1]));
    expect([...imports].sort()).toStrictEqual(["./capability-registry.js", "./observation.js", "./redaction.js", "node:crypto"]);
    expect(source).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
  });
});
