/**
 * wb-pjj (W16-L/VC-7): decision-core provenance for the control adapters. decideControl registers every permitted decision it
 * mints in a module-private WeakSet and isCoreMintedDecision() answers by identity against it, so a structurally exact
 * look-alike -- a copy, a JSON round-trip such as a decision replayed from the audit or the journal, a re-wrapped receipt or
 * a hand-built permit -- never reaches a native verb. Structural vetting stays behind provenance as defense in depth
 * (pinned separately in test/workbench-control-provenance-depth.test.ts, where provenance is bypassed on purpose).
 *
 * The adapter half is table-driven: every control adapter that takes a caller-held decision is one ProvenanceSubject, and the
 * same look-alike battery runs against each. No live binary, SDK process or network: every seam is a counting fake.
 */
import { readFileSync } from "node:fs";
import type { CallOptions } from "@furnace/sdk";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import * as control from "../src/workbench/control.js";
import {
  acknowledge,
  type ControlDecision,
  decideControl,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

/** The fixed provenance refusal text the bead specifies; every adapter refuses an unminted decision with exactly this. */
const UNMINTED_TEXT = "decision was not minted by the decision core";

const WS = "/tmp/provenance-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const REQUESTED_AT = "2026-10-15T07:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const SETTLED_AT = "2026-10-15T07:00:03Z";
const STATE_SINCE = "2026-10-15T07:00:02.719135054+00:00";
const TIMEOUT_MS = 5_000;
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };

type Permit = ControlDecision & { decision: "permitted" };

/** The predicate under test, through the module namespace so its absence is an assertion failure, not a link error. */
function minted(value: unknown): boolean {
  expect(control.isCoreMintedDecision, "src/workbench/control.ts exports isCoreMintedDecision").toBeTypeOf("function");
  return control.isCoreMintedDecision(value);
}

function furnaceProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "frn-req-attempts-1" } });
  return projection;
}
function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { id: SCOPE.principal, role: "local-operator" }, grants: ["observe:furnace.run.inspect", "control:furnace.stop"],
    target: { ...RUN }, action: "stop", params: { confirmed: true }, invocationId: "inv-provenance-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decide = (overrides: Partial<NativeControlRequest> = {}): ControlDecision =>
  decideControl(request(overrides), { projection: furnaceProjection(), now: () => DECIDED_AT });
function furnacePermit(overrides: Partial<NativeControlRequest> = {}): Permit {
  const decision = decide(overrides);
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}

/** Freezes every nested object, so the structural vetting the adapters keep cannot tell the copy from the original. */
function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    for (const key of Reflect.ownKeys(value)) deepFreeze(Reflect.get(value, key));
    Object.freeze(value);
  }
  return value;
}
const jsonRoundTrip = (value: unknown): unknown => JSON.parse(JSON.stringify(value));

/**
 * Every structurally exact look-alike of a genuine, unspent permit. Before provenance each of these passed the adapters'
 * structural vetting (frozen shape, exact fields, canonical grant), so it executed a native verb.
 */
function lookAlikes(genuine: Permit): readonly (readonly [string, unknown])[] {
  return [
    ["deep-frozen structural copy", deepFreeze(structuredClone(genuine))],
    ["deep-frozen JSON round-trip (a decision replayed from the audit or the journal)", deepFreeze(jsonRoundTrip(genuine))],
    ["hand-built permit carrying the genuine field values", deepFreeze({ decision: "permitted", receipt: { ...genuine.receipt, scope: { ...genuine.receipt.scope },
      principal: { ...genuine.receipt.principal }, target: { ...genuine.receipt.target } } })],
    ["frozen re-wrap of the genuine, unspent receipt", Object.freeze({ decision: "permitted", receipt: genuine.receipt })],
    ["forwarding proxy over the genuine permit", new Proxy(genuine, {})],
  ];
}

describe("isCoreMintedDecision: identity against the core's module-private registry", () => {
  it("answers true for exactly the permitted decision object decideControl returned, and every permit is minted on its own", () => {
    const first = furnacePermit();
    const second = furnacePermit();
    expect(minted(first)).toBe(true);
    expect(minted(second)).toBe(true);
    // One request decided twice mints two permits; both are provenance-bearing and neither stands in for the other.
    expect(second).not.toBe(first);
    expect(second.receipt.requestId).toBe(first.receipt.requestId);
    // A distinct intentional request mints its own permit under its own request id.
    const third = furnacePermit({ invocationId: "inv-provenance-2" });
    expect(minted(third)).toBe(true);
    expect(third.receipt.requestId).not.toBe(first.receipt.requestId);
  });

  it("never registers a denial: only permits are minted, whatever the deny policy", () => {
    const denials: Partial<NativeControlRequest>[] = [
      { grants: undefined }, { grants: ["observe:furnace.run.inspect"] }, { invocationId: "" }, { action: "start", grants: ["control:furnace.start"] },
      { grants: ["control:furnace.pause"] }, { target: { ...RUN, id: "frn-run-unseen" } }, { target: { ...ATTEMPT } }, { params: {} },
    ];
    const policies = new Set<string>();
    for (const overrides of denials) {
      const decision = decide(overrides);
      if (decision.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      policies.add(decision.policy);
      expect(minted(decision)).toBe(false);
    }
    expect(policies.size).toBe(denials.length);
  });

  it("refuses every copy: structural, JSON and structuredClone copies, re-wraps, inheritors, proxies and later receipt phases", () => {
    const genuine = furnacePermit();
    const { receipt } = genuine;
    const acknowledged = acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: "run_stop:ack" });
    const settled = settle(acknowledged, { outcome: "completed", nativeResultRef: "furnace-run:frn-run-r1:stopped", settledAt: SETTLED_AT });
    const copies: unknown[] = [
      ...lookAlikes(genuine).map(([, value]) => value),
      { ...genuine }, Object.freeze({ ...genuine }), jsonRoundTrip(genuine), structuredClone(genuine), Object.create(genuine), Object.freeze(Object.create(genuine)),
      receipt, Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt }) }), Object.freeze({ decision: "permitted", receipt: acknowledged }),
      Object.freeze({ decision: "permitted", receipt: settled }), acknowledged, settled, [genuine], Object.freeze([genuine]),
    ];
    for (const copy of copies) expect(minted(copy)).toBe(false);
    for (const primitive of [undefined, null, true, 0, 42n, "permitted", Symbol("permit")]) expect(minted(primitive)).toBe(false);
    // Asking about a look-alike never promotes it, and never demotes the genuine permit.
    for (const copy of copies) expect(minted(copy)).toBe(false);
    expect(minted(genuine)).toBe(true);
  });

  it("reads nothing from the value it is asked about: no proxy trap runs, and a revoked proxy answers false without throwing", () => {
    const genuine = furnacePermit();
    const trap = vi.fn();
    const traps: ProxyHandler<Permit> = {
      get: (...args) => { trap("get"); return Reflect.get(...args); },
      getOwnPropertyDescriptor: (...args) => { trap("getOwnPropertyDescriptor"); return Reflect.getOwnPropertyDescriptor(...args); },
      getPrototypeOf: (...args) => { trap("getPrototypeOf"); return Reflect.getPrototypeOf(...args); },
      has: (...args) => { trap("has"); return Reflect.has(...args); },
      isExtensible: (...args) => { trap("isExtensible"); return Reflect.isExtensible(...args); },
      ownKeys: (...args) => { trap("ownKeys"); return Reflect.ownKeys(...args); },
    };
    expect(minted(new Proxy(genuine, traps))).toBe(false);
    const revocable = Proxy.revocable(genuine, traps);
    revocable.revoke();
    expect(minted(revocable.proxy)).toBe(false);
    expect(trap).not.toHaveBeenCalled();
  });

  it("leaves no trace on the decision: no added key, symbol or serialized field, and the permit stays deeply frozen", () => {
    const genuine = furnacePermit();
    const twin = deepFreeze(jsonRoundTrip(genuine));
    expect(minted(genuine)).toBe(true);
    expect(minted(twin)).toBe(false);
    expect(Reflect.ownKeys(genuine)).toStrictEqual(["decision", "receipt"]);
    for (const object of [genuine, genuine.receipt, genuine.receipt.scope, genuine.receipt.principal, genuine.receipt.target]) {
      expect(Object.getOwnPropertySymbols(object)).toStrictEqual([]);
      expect(Object.isFrozen(object)).toBe(true);
    }
    expect(Reflect.ownKeys(genuine.receipt)).toStrictEqual(Reflect.ownKeys((twin as Permit).receipt));
    // Provenance is not data: the genuine permit and its look-alike serialize identically and compare structurally equal.
    expect(JSON.stringify(genuine)).toBe(JSON.stringify(twin));
    expect(twin).toStrictEqual(genuine);
  });

  it("cannot leak by construction: one module-private const WeakSet<ControlDecision>, filled in one place, read in one place", () => {
    const source = readFileSync(new URL("../src/workbench/control.ts", import.meta.url), "utf8");
    const registries = [...source.matchAll(/^const (\w+) = new WeakSet<ControlDecision>\(\);$/gm)].map(match => match[1]);
    expect(registries, "exactly one module-level WeakSet<ControlDecision> registry").toHaveLength(1);
    const [registry] = registries;
    // A WeakSet holds no strong reference, so a dropped decision stays collectable; nothing else in the module may retain one.
    expect(source).not.toMatch(/\bnew\s+(?:Set|Map|WeakMap|WeakRef|FinalizationRegistry|Array)\b/);
    expect([...source.matchAll(new RegExp(`\\b${registry}\\b`, "g"))]).toHaveLength(3);
    expect([...source.matchAll(new RegExp(`\\b${registry}\\.(\\w+)\\(`, "g"))].map(match => match[1]).sort()).toStrictEqual(["add", "has"]);
    expect(source).not.toMatch(new RegExp(`export[^\\n]*\\b${registry}\\b`));
    // The module namespace exposes the predicate, never the registry itself.
    expect(control.isCoreMintedDecision).toBeTypeOf("function");
    expect(Object.values(control).filter(value => value instanceof WeakSet)).toStrictEqual([]);
    expect(control.CONTROL_UNMINTED_REASON).toBe(UNMINTED_TEXT);
  });
});

/** One control adapter that executes a caller-held decision, driven against fresh counting fakes. */
interface ProvenanceSubject {
  readonly adapter: string;
  /** A fresh permitted decision decideControl minted for this adapter's provider. */
  permit(): Permit;
  /** Executes the decision against fresh fakes. `calls` counts every native verb the adapter's seam was asked to issue. */
  attempt(decision: unknown): Promise<{ readonly outcome: "resolved" | "rejected"; readonly error?: unknown; readonly calls: number }>;
  /** The adapter's typed refusal class (a CapabilityError). */
  readonly refusal: abstract new (...args: never[]) => CapabilityError;
  /** A native id of this adapter's target type that the projection never observed, so decideControl would deny it. */
  readonly unobservedTargetId: string;
}

function furnaceClient() {
  const answer = (kind: string) => vi.fn(async (id: string, ...rest: unknown[]): Promise<unknown> => {
    const call = rest.at(-1) as CallOptions | undefined;
    return { protocolVersion: 1, kind, requestId: call?.requestId, exit: { code: 0, signal: null }, stderr: "",
      data: { run_id: id, state: "stopped", state_since: STATE_SINCE } };
  });
  const runs = { pause: answer("run_pause"), stop: answer("run_stop"), resume: answer("run_resume") };
  const attempts = { stop: answer("attempt_stop") };
  const spies = [...Object.values(runs), ...Object.values(attempts)];
  return { client: { runs, attempts } as unknown as FurnaceControlClient, calls: (): number => spies.reduce((total, spy) => total + spy.mock.calls.length, 0) };
}
function clock(...ticks: string[]): () => string {
  let tick = 0;
  return () => ticks[Math.min(tick++, ticks.length - 1)];
}

const SUBJECTS: readonly ProvenanceSubject[] = [
  {
    adapter: "furnace (src/workbench/furnace-control.ts)",
    permit: () => furnacePermit(),
    async attempt(decision) {
      const fake = furnaceClient();
      try {
        await executeFurnaceControl(decision as ControlDecision, { client: fake.client, workspaceRoot: WS, now: clock(ACKED_AT, SETTLED_AT), timeoutMs: TIMEOUT_MS });
        return { outcome: "resolved", calls: fake.calls() };
      } catch (error) {
        return { outcome: "rejected", error, calls: fake.calls() };
      }
    },
    refusal: FurnaceControlRefusal,
    unobservedTargetId: "frn-run-foreign",
  },
];

describe.each(SUBJECTS)("$adapter refuses a decision the core did not mint", subject => {
  /** The provenance refusal: typed, the unvetted-decision code, the fixed text and no echoed field; no native verb issued. */
  function expectUnminted(result: Awaited<ReturnType<ProvenanceSubject["attempt"]>>, label: string): void {
    expect(result.outcome, `${label} must be refused`).toBe("rejected");
    expect(result.error, label).toBeInstanceOf(subject.refusal);
    expect(result.error, label).toBeInstanceOf(CapabilityError);
    expect(result.error, label).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
    expect((result.error as Error).message, label).toBe(UNMINTED_TEXT);
    expect((result.error as { policy?: unknown }).policy, label).toBeUndefined();
    expect(result.calls, `${label} issued a native verb`).toBe(0);
  }

  it("refuses every structurally exact look-alike of a genuine permit with the fixed text, before any native verb", async () => {
    const genuine = subject.permit();
    for (const [label, lookAlike] of lookAlikes(genuine)) expectUnminted(await subject.attempt(lookAlike), label);
    // The refusals spent nothing: the genuine permit still executes exactly once.
    const executed = await subject.attempt(genuine);
    expect(executed.outcome).toBe("resolved");
    expect(executed.calls).toBe(1);
  });

  it("closes the two wb-69g.3 gate probes: a frozen copy of a spent receipt and a hand-assembled permit the core would deny", async () => {
    const genuine = subject.permit();
    expect((await subject.attempt(genuine)).calls).toBe(1);
    // Probe 1: the spent receipt, copied into a fresh frozen permit, once issued a second verb under the same request id.
    expectUnminted(await subject.attempt(Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...genuine.receipt }) })), "frozen copy of a spent receipt");
    // Probe 2: a permit assembled by hand for a target decideControl denies (never observed: cross-scope) once executed.
    const target = Object.freeze({ ...genuine.receipt.target, id: subject.unobservedTargetId });
    expect(decide({ target: { ...target } })).toMatchObject({ decision: "denied", policy: "cross-scope" });
    expectUnminted(await subject.attempt(Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...genuine.receipt, target }) })), "hand-assembled cross-scope permit");
  });

  it("refuses a JSON round-trip of a permitted decision exactly as the audit or the journal would hand it back", async () => {
    const genuine = subject.permit();
    expectUnminted(await subject.attempt(jsonRoundTrip(genuine)), "JSON round-trip");
    expectUnminted(await subject.attempt(jsonRoundTrip(jsonRoundTrip(genuine))), "double JSON round-trip");
  });

  it("never echoes a field of the look-alike it refuses, including a credential-shaped one", async () => {
    const genuine = subject.permit();
    const marker = "sk-ant-api03-PROVENANCEMARKER0123456789";
    const forged = deepFreeze({ decision: "permitted", receipt: { ...structuredClone(genuine.receipt), invocationId: marker, ownershipConfirmationRef: marker } });
    const result = await subject.attempt(forged);
    expectUnminted(result, "credential-carrying look-alike");
    const error = result.error as Error;
    for (const rendered of [error.message, String(error), JSON.stringify(error), JSON.stringify(Object.entries(error))]) {
      expect(rendered).not.toContain("PROVENANCEMARKER");
      expect(rendered).not.toContain(genuine.receipt.requestId);
    }
  });

  it("refuses a revoked proxy over a genuine permit with the typed provenance refusal, never a raw TypeError", async () => {
    const revocable = Proxy.revocable(subject.permit(), {});
    revocable.revoke();
    expectUnminted(await subject.attempt(revocable.proxy), "revoked proxy");
  });

  it("executes the decision decideControl returned: provenance passes it to the structural vetting it keeps", async () => {
    const executed = await subject.attempt(subject.permit());
    expect(executed.outcome).toBe("resolved");
    expect(executed.calls).toBe(1);
  });
});

describe("furnace adapter: a decision the core did not mint keeps its typed reason where one exists", () => {
  it("a core denial is refused as denied-decision with the core's category and policy, and a re-wrapped spent receipt stays spent", async () => {
    const [furnace] = SUBJECTS;
    const denied = await furnace.attempt(decide({ grants: ["observe:furnace.run.inspect"] }));
    expect(denied).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization", policy: "observer-only" } });
    const genuine = furnace.permit();
    expect((await furnace.attempt(genuine)).calls).toBe(1);
    const respent = await furnace.attempt(Object.freeze({ decision: "permitted", receipt: genuine.receipt }));
    expect(respent).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "permit-consumed", category: "validation" } });
  });
});
