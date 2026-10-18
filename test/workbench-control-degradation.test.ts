/**
 * wb-cax.17 (W22-M): docs/workbench/17 "Error and degradation policy" -- "Expired control credentials -> deny action;
 * preserving observation if allowed." Conformance over the LANDED decision core (src/workbench/control.ts) and the
 * capability registry. Expiry and revocation are injected only by mutating the grant list the fixture host re-reads on
 * every decision; the fixture SDK seam records every native verb it is asked to run, so "never reached" is a count.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import {
  acknowledge,
  type ControlDecision,
  decideControl,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlReceipt,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { stripUnsafeText } from "../src/workbench/redaction.js";

const SCOPE: ObservationScope = { workspace: "/tmp/external-ws", principal: "tester" };
const AT = "2026-10-15T06:00:00Z";
const NOW = "2026-10-15T07:00:01Z";
const STOP = "control:furnace.stop";
const OBSERVE = "observe:furnace.run.inspect";
const INSPECT_CAPABILITY = "furnace.run-inspect";
const INSPECT = `inspect:${INSPECT_CAPABILITY}`;
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: SCOPE.workspace };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: SCOPE.workspace };

function observed(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "req-attempts" } });
  return projection;
}

/** The fixture SDK seam: it records every native verb it is asked to run and answers none of them by itself. */
function sdkSeam() {
  const verbs: { verb: string; target: NativeRef }[] = [];
  return { verbs, run: (verb: string, target: NativeRef): void => { verbs.push({ verb, target }); } };
}

interface HostOutcome {
  readonly decision: ControlDecision;
  readonly receipts: readonly NativeControlReceipt[];
}

/**
 * A fixture host over the landed core. It re-reads the live grant list for every decision (the session grants are a
 * mutable array standing for settings that can change mid-session) and reaches the SDK seam only behind a permit that
 * was re-decided against the CURRENT grants immediately before dispatch.
 */
function fixtureHost(projection: ObservationProjection, session: { grants: string[] }, sdk: ReturnType<typeof sdkSeam>) {
  const decide = (overrides: Partial<NativeControlRequest> = {}): ControlDecision => decideControl({
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: [...session.grants], target: { ...RUN }, action: "stop",
    params: { confirmed: true }, invocationId: "inv-expiry-1", requestedAt: "2026-10-15T07:00:00Z", ...overrides,
  }, { projection, now: () => NOW });
  return {
    decide,
    control(overrides: Partial<NativeControlRequest> = {}, betweenDecisionAndDispatch: () => void = () => {}): HostOutcome {
      const first = decide(overrides);
      if (first.decision !== "permitted") return { decision: first, receipts: [] };
      betweenDecisionAndDispatch();
      const current = decide(overrides);
      if (current.decision !== "permitted") return { decision: current, receipts: [first.receipt] };
      sdk.run(overrides.action ?? "stop", overrides.target ?? RUN);
      const acknowledged = acknowledge(current.receipt, { acknowledgedAt: "2026-10-15T07:00:02Z", nativeAckRef: "frn-req-stop-1" });
      const result = settle(acknowledged, { outcome: "completed", nativeResultRef: "frn-req-status-2", settledAt: "2026-10-15T07:00:09Z" });
      return { decision: current, receipts: [current.receipt, acknowledged, result] };
    },
  };
}

const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202A-\u202E\u2066-\u2069]/;
function deniedReason(decision: ControlDecision): string {
  if (decision.decision !== "denied") throw new Error(`expected a denial, got ${JSON.stringify(decision)}`);
  return decision.reason;
}

afterEach(() => { vi.restoreAllMocks(); });

describe("expired control credentials -> deny action (docs/workbench/17 bullet 6)", () => {
  it("a grant revoked after the request decision but before dispatch yields a typed denial and the SDK seam is never reached", () => {
    const session = { grants: [OBSERVE, STOP] };
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), session, sdk);
    const outcome = host.control({}, () => { session.grants = [OBSERVE]; });
    expect(outcome.decision).toStrictEqual({ decision: "denied", category: "authorization", policy: "observer-only", reason: "observer-only" });
    expect(sdk.verbs).toHaveLength(0);
    // No acknowledged or result phase exists anywhere: only the already-minted `requested` receipt survives.
    expect(outcome.receipts.map(receipt => receipt.phase)).toStrictEqual(["requested"]);
    expect(JSON.stringify(outcome)).not.toMatch(/nativeAckRef|nativeResultRef|acknowledgedAt|settledAt|"outcome"/);
  });

  it("revoking only the one verb while other control grants remain names the exact missing grant and reaches no SDK verb", () => {
    const session = { grants: [OBSERVE, STOP, "control:forge.cancel"] };
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), session, sdk);
    const outcome = host.control({}, () => { session.grants = [OBSERVE, "control:forge.cancel"]; });
    expect(outcome.decision).toStrictEqual({ decision: "denied", category: "authorization", policy: "missing-exact-grant", reason: `missing exact grant ${STOP}` });
    expect(sdk.verbs).toHaveLength(0);
    expect(outcome.receipts.map(receipt => receipt.phase)).toStrictEqual(["requested"]);
  });

  it("a grant that is already absent at decision time is refused deny-by-default and never produces a receipt or an SDK call", () => {
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), { grants: [OBSERVE] }, sdk);
    for (const grants of [[OBSERVE, "control:furnace.pause"], [OBSERVE, "control:furnace.stopped"], [OBSERVE, "control:furnace.stop.all"], [OBSERVE, "control:forge.cancel"]]) {
      const outcome = fixtureHost(observed(), { grants }, sdk).control();
      expect(outcome.decision).toStrictEqual({ decision: "denied", category: "authorization", policy: "missing-exact-grant", reason: `missing exact grant ${STOP}` });
      expect(outcome.receipts).toStrictEqual([]);
    }
    expect(host.control().receipts).toStrictEqual([]);
    expect(sdk.verbs).toHaveLength(0);
  });

  it("a grant spelled with an expiry decoration is unknown permission data and denies the WHOLE list, never a partial permit", () => {
    const sdk = sdkSeam();
    for (const decorated of [`${STOP}@2026-10-15T06:59:59Z`, `${STOP}:expired`, `${STOP};exp=1`, `${STOP} (expired)`, `${STOP}\u001b[0m`]) {
      const outcome = fixtureHost(observed(), { grants: [OBSERVE, STOP, decorated] }, sdk).control();
      expect(outcome.decision).toStrictEqual({ decision: "denied", category: "authorization", policy: "unknown-permission-data", reason: "unknown permission data" });
      expect(outcome.receipts).toStrictEqual([]);
    }
    expect(sdk.verbs).toHaveLength(0);
  });

  it("a control grant expiring mid-session never rewrites a receipt already minted, and a later request is denied", () => {
    const session = { grants: [OBSERVE, STOP] };
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), session, sdk);
    const first = host.control({ invocationId: "inv-before-expiry" });
    expect(first.receipts.map(receipt => receipt.phase)).toStrictEqual(["requested", "acknowledged", "result"]);
    expect(sdk.verbs).toHaveLength(1);
    const snapshot = JSON.stringify(first.receipts);
    session.grants = [OBSERVE];
    const second = host.control({ invocationId: "inv-after-expiry" });
    expect(second.decision.decision).toBe("denied");
    expect(second.receipts).toStrictEqual([]);
    expect(sdk.verbs).toHaveLength(1);
    expect(JSON.stringify(first.receipts)).toBe(snapshot);
  });
});

describe("denial text is sanitized and never echoes the caller", () => {
  it("adversarial ANSI, bidi and control characters in provider, action, target and invocation never reach a denial reason", () => {
    const sdk = sdkSeam();
    const hostile = ["\u001b[31mred\u001b[0m", "\u001b]0;title\u0007", "\u202Eevil", "line\nbreak", "nul\u0000", "\u009b31m", "control:furnace.stop\u0007"];
    for (const text of hostile) {
      const host = fixtureHost(observed(), { grants: [OBSERVE] }, sdk);
      const overrides: Partial<NativeControlRequest>[] = [
        { action: text }, { target: { ...RUN, provider: text } }, { target: { ...RUN, id: text } }, { invocationId: text },
        { principal: { id: text } }, { scope: { workspace: text, principal: SCOPE.principal } },
      ];
      for (const override of overrides) {
        const reason = deniedReason(host.decide(override));
        expect(UNSAFE.test(reason)).toBe(false);
        expect(stripUnsafeText(reason)).toBe(reason);
        expect(reason).not.toContain(text);
      }
      // The same hostile text under a full control grant (expired grant list elsewhere) still cannot reach a reason.
      const granted = fixtureHost(observed(), { grants: [OBSERVE, STOP] }, sdk);
      for (const override of overrides) {
        const outcome = granted.decide(override);
        if (outcome.decision === "denied") {
          expect(UNSAFE.test(outcome.reason)).toBe(false);
          expect(outcome.reason).not.toContain(text);
        }
      }
    }
    expect(sdk.verbs).toHaveLength(0);
  });

  it("the exact-grant refusal only ever names an allowlisted constant grant, whatever the hostile provider or action spelling", () => {
    const grantable = Object.entries(NATIVE_CONTROL_ACTIONS).flatMap(([provider, actions]) => actions.map(action => `control:${provider}.${action}`));
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), { grants: [OBSERVE, "control:hyperunix.stop"] }, sdk);
    for (const provider of ["furnace", "forge", "claude-agent-sdk"]) {
      for (const action of NATIVE_CONTROL_ACTIONS[provider]) {
        const reason = deniedReason(host.decide({ target: { ...RUN, provider }, action }));
        expect(reason.startsWith("missing exact grant ")).toBe(true);
        expect(grantable).toContain(reason.slice("missing exact grant ".length));
      }
    }
    for (const [provider, action] of [["__proto__", "stop"], ["furnace", "__proto__"], ["furnace", "stop\u001b[2J"], ["constructor", "constructor"]] as const) {
      const reason = deniedReason(host.decide({ target: { ...RUN, provider }, action }));
      expect(reason).toBe("unknown action");
    }
    expect(sdk.verbs).toHaveLength(0);
  });

  it("minting no reconcile:* permission: no decision, denial or receipt in a revoked session carries a reconcile grant", () => {
    const session = { grants: [OBSERVE, STOP] };
    const sdk = sdkSeam();
    const host = fixtureHost(observed(), session, sdk);
    const permitted = host.control();
    session.grants = [OBSERVE];
    const denied = host.control({ invocationId: "inv-revoked" });
    expect(JSON.stringify([permitted, denied])).not.toMatch(/reconcile/);
    expect(permitted.receipts.map(receipt => receipt.grant)).toStrictEqual([STOP, STOP, STOP]);
    // A reconcile grant is not a control grant, so it can never stand in for an expired one.
    const reconcile = fixtureHost(observed(), { grants: [OBSERVE, "reconcile:furnace.stop", "reconcile:workflow"] }, sdk);
    expect(reconcile.decide()).toStrictEqual({ decision: "denied", category: "authorization", policy: "observer-only", reason: "observer-only" });
    expect(sdk.verbs).toHaveLength(1);
  });
});

describe("observation is preserved while control is denied (\"preserving observation if allowed\")", () => {
  it("projection reads keep answering during and after a control denial, and the denial mutates nothing", () => {
    const projection = observed();
    const session = { grants: [OBSERVE, STOP] };
    const sdk = sdkSeam();
    const host = fixtureHost(projection, session, sdk);
    const read = () => JSON.stringify({ nodes: projection.query({ scope: SCOPE, limit: 100 }).nodes, relations: projection.relations({ scope: SCOPE }), stats: projection.stats() });
    const before = read();
    expect(JSON.parse(before).nodes).toHaveLength(2);
    const outcome = host.control({}, () => { session.grants = [OBSERVE]; });
    expect(outcome.decision.decision).toBe("denied");
    expect(read()).toBe(before);
    expect(projection.query({ scope: SCOPE, ref: { ...RUN }, limit: 1 }).nodes).toHaveLength(1);
    expect(sdk.verbs).toHaveLength(0);
  });

  it("registry inspect keeps serving under the observer grant after the control grant expires, while control invocation stays refused", async () => {
    const registry = new CapabilityRegistry();
    const inspected: JsonValue[] = [];
    registry.register({
      descriptor: { id: INSPECT_CAPABILITY, version: "1.0.0", description: "inspect a furnace run", inputSchema: { type: "object" }, effectClass: "read",
        permissions: [], supportedModes: ["inspect"] },
      invoke: async () => { throw new Error("invoke must not be reached"); },
      inspect: async (ref) => { inspected.push(ref); return { status: "active" }; },
    });
    const session = { grants: [OBSERVE, INSPECT, STOP] };
    const context = () => ({ grants: [...session.grants], signal: new AbortController().signal });
    await expect(registry.inspect(INSPECT_CAPABILITY, { id: RUN.id }, context())).resolves.toStrictEqual({ status: "active" });
    session.grants = session.grants.filter(grant => grant !== STOP);
    // During and after the control expiry the inspect read still answers.
    await expect(registry.inspect(INSPECT_CAPABILITY, { id: RUN.id }, context())).resolves.toStrictEqual({ status: "active" });
    expect(inspected).toHaveLength(2);
    // Losing the inspect grant is a typed authorization error that does not depend on the control grant.
    session.grants = [OBSERVE, STOP];
    const failure = await registry.inspect(INSPECT_CAPABILITY, { id: RUN.id }, context()).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(CapabilityError);
    expect((failure as CapabilityError).category).toBe("authorization");
    expect(inspected).toHaveLength(2);
  });

  it("a registry control-gated invocation refuses with a typed authorization error once the grant expires and never starts the provider", async () => {
    const registry = new CapabilityRegistry();
    const sdk = sdkSeam();
    registry.register({
      descriptor: { id: "furnace.run-stop", version: "1.0.0", description: "stop a furnace run", inputSchema: { type: "object" }, effectClass: "external",
        permissions: [], supportedModes: ["invoke"] },
      invoke: async () => { sdk.run("stop", RUN); return { ok: true }; },
    });
    const controller = new AbortController();
    const failure = await registry.invoke("furnace.run-stop", {}, { grants: [OBSERVE, INSPECT], signal: controller.signal }).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(CapabilityError);
    expect((failure as CapabilityError).category).toBe("authorization");
    expect((failure as CapabilityError).message).toBe("Permission denied for capability furnace.run-stop (invoke).");
    expect(sdk.verbs).toHaveLength(0);
  });
});
