/**
 * wb-pjj (W16-L/VC-7): decision-core provenance for the control adapters. decideControl registers every permitted decision it
 * mints in a module-private WeakSet and isCoreMintedDecision() answers by identity against it, so a structurally exact
 * look-alike -- a copy, a JSON round-trip such as a decision replayed from the audit or the journal, a re-wrapped receipt or
 * a hand-built permit -- never reaches a native verb. Structural vetting stays behind provenance as defense in depth,
 * pinned separately in test/workbench-control-provenance-depth.test.ts with the real core and no module mock: the pure
 * exported vetFurnaceControlDecision is driven with decisions decideControl minted and forgeries built from them, and one
 * parse-aware census line pins that the adapter asks the core's predicate before it.
 *
 * The adapter half is table-driven: every control adapter that takes a caller-held decision is one ProvenanceSubject, and the
 * same look-alike battery runs against each. No live binary, SDK process or network: every seam is a counting fake.
 */
import { readFileSync } from "node:fs";
import { type CancelReceipt, type CapabilityMap, decodeCancelResponse, negotiatedCapabilityMap } from "@forge/sdk";
import type { CallOptions } from "@furnace/sdk";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { ClaudeControlRefusal, type ClaudeInterruptSeam, executeClaudeControl } from "../src/workbench/claude-control.js";
import * as control from "../src/workbench/control.js";
import {
  acknowledge,
  type ControlDecision,
  decideControl,
  type NativeControlRequest,
  settle,
} from "../src/workbench/control.js";
import { executeForgeControl, ForgeControlRefusal } from "../src/workbench/forge-control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

/** The fixed provenance refusal text the bead specifies; every adapter refuses an unminted decision with exactly this. */
const UNMINTED_TEXT = "decision was not minted by the decision core";
/** The fixed text of the forge adapter's denied-decision refusal: a caller-held denial contributes nothing to it, not even its reason (wb-n9z F2). */
const FORGE_DENIED_TEXT = "Forge control refuses a denied decision; nothing was sent.";

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
const SESSION_ID = "8f14e45f-ceea-467f-a8d5-2b1c3e6f0a9d";
const SESSION: NativeRef = { provider: "claude-agent-sdk", type: "session", id: SESSION_ID };
const SUBAGENT: NativeRef = { provider: "claude-agent-sdk", type: "subagent", id: `${SESSION_ID}:sub-1` };

/** The forge adapter's own workspace and native operation: a uuid4 hex, the id the Forge operations service allocates. */
const FORGE_WS = "/tmp/provenance-forge-ws";
const FORGE_SCOPE: ObservationScope = { workspace: FORGE_WS, principal: "operator" };
const OP_ID = "3f2a9c1e7b4d4e0f9a8b7c6d5e4f3a2b";
const FOREIGN_OP_ID = "5f2a9c1e7b4d4e0f9a8b7c6d5e4f3a2b";
const OPERATION: NativeRef = { provider: "forge", type: "operation", id: OP_ID, scope: FORGE_WS };
const STEP: NativeRef = { provider: "forge", type: "step", id: `${OP_ID}:lint`, scope: FORGE_WS };

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

function forgeProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [OPERATION, STEP]) {
    projection.refresh({ source, scope: FORGE_SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "sdk-operation", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: FORGE_SCOPE, from: OPERATION, to: STEP, kind: "ownership", provenance: { source: "forge", observedAt: AT, nativeConfirmationRef: `forge-operation-started:${OP_ID}` } });
  return projection;
}
function forgeRequest(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return {
    scope: { ...FORGE_SCOPE }, principal: { id: FORGE_SCOPE.principal, role: "local-operator" }, grants: ["observe:forge.operation", "control:forge.cancel"],
    target: { ...OPERATION }, action: "cancel", params: { confirmed: true }, invocationId: "inv-provenance-forge-1", requestedAt: REQUESTED_AT, ...overrides,
  };
}
const decideForge = (overrides: Partial<NativeControlRequest> = {}): ControlDecision =>
  decideControl(forgeRequest(overrides), { projection: forgeProjection(), now: () => DECIDED_AT });
function forgePermit(overrides: Partial<NativeControlRequest> = {}): Permit {
  const decision = decideForge(overrides);
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
  /** decideControl for this adapter's provider over its own projection, with the request fields overridden. */
  decide(overrides: Partial<NativeControlRequest>): ControlDecision;
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
/** A Claude session the projection observed owning a subagent: the producer-stated ownership statement decideControl requires. */
function claudeProjection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [SESSION, SUBAGENT]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "agent", statusText: "observed-running", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: SESSION, to: SUBAGENT, kind: "ownership", provenance: { source: "claude-agent-sdk", observedAt: AT, nativeConfirmationRef: SESSION_ID } });
  return projection;
}
const claudeDecide = (overrides: Partial<NativeControlRequest> = {}): ControlDecision =>
  decideControl(request({ grants: ["control:claude-agent-sdk.interrupt"], target: { ...SESSION }, action: "interrupt", ...overrides }),
    { projection: claudeProjection(), now: () => DECIDED_AT });
function claudePermit(): Permit {
  const decision = claudeDecide();
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}
/** The control seam of one live query: interrupt() is its only verb, and every call is counted. */
function claudeSeam() {
  const interrupt = vi.fn(async (): Promise<unknown> => ({ still_queued: [] }));
  return { seam: { interrupt } as ClaudeInterruptSeam, calls: (): number => interrupt.mock.calls.length };
}

const SUBJECTS: readonly ProvenanceSubject[] = [
  {
    adapter: "furnace (src/workbench/furnace-control.ts)",
    permit: () => furnacePermit(),
    decide: overrides => decide(overrides),
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
  {
    adapter: "claude-agent-sdk (src/workbench/claude-control.ts)",
    permit: () => claudePermit(),
    decide: overrides => claudeDecide(overrides),
    async attempt(decision) {
      const fake = claudeSeam();
      try {
        await executeClaudeControl(decision as ControlDecision, { seam: fake.seam, call: { invocationId: "inv-workflow-1", index: 0, sessionId: SESSION_ID },
          now: () => ACKED_AT, timeoutMs: TIMEOUT_MS });
        return { outcome: "resolved", calls: fake.calls() };
      } catch (error) {
        return { outcome: "rejected", error, calls: fake.calls() };
      }
    },
    refusal: ClaudeControlRefusal,
    unobservedTargetId: "0b1c2d3e-0000-4000-8000-000000000000",
  },
  {
    adapter: "forge (src/workbench/forge-control.ts)",
    permit: () => forgePermit(),
    decide: overrides => decideForge(overrides),
    async attempt(decision) {
      const cancel = vi.fn(async (operationId: string): Promise<CancelReceipt> => decodeCancelResponse(operationId,
        { operation_id: operationId, cancel_intent: "CANCEL_REQUESTED", cancel_acceptance: "ACCEPTED", cancellation_established: false }));
      const capabilities: CapabilityMap = negotiatedCapabilityMap("app_server", new Map([["gate.status", true], ["operation.cancel", true]]));
      try {
        await executeForgeControl(decision as ControlDecision, { operations: { cancel }, connection: { capabilities }, workspaceRoot: FORGE_WS, now: clock(ACKED_AT), timeoutMs: TIMEOUT_MS });
        return { outcome: "resolved", calls: cancel.mock.calls.length };
      } catch (error) {
        return { outcome: "rejected", error, calls: cancel.mock.calls.length };
      }
    },
    refusal: ForgeControlRefusal,
    unobservedTargetId: FOREIGN_OP_ID,
  },
];

/** The SUBJECTS row for one adapter, bound by its name: a reordered table can never re-point an adapter-specific case at another adapter. */
function subjectNamed(adapter: string): ProvenanceSubject {
  const rows = SUBJECTS.filter(subject => subject.adapter === adapter);
  if (rows.length !== 1) throw new Error(`expected exactly one ProvenanceSubject row for ${adapter}, found ${rows.length}`);
  return rows[0];
}

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
    expect(subject.decide({ target: { ...target } })).toMatchObject({ decision: "denied", policy: "cross-scope" });
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

/**
 * wb-n9z F1: a forged frozen denial's category is forced into the denial vocabulary. The core denies with exactly "validation" or
 * "authorization", and every adapter maps any other category a caller-held denial carries to "authorization", so an off-vocabulary
 * category never becomes the refusal's category and is echoed nowhere. One row per SUBJECTS adapter: a raw category pass-through
 * in any one adapter fails that adapter's row by name. Credential-shaped values here are obviously fake markers.
 */
const OFF_VOCABULARY_CATEGORIES: readonly unknown[] = ["sk-ant-qqsecretqq", "Authorization", "authorization ", "Validation", "validation ", "unavailable",
  "transport", "uncertain-effect", "", 7, null, undefined];

describe("every adapter forces a forged denial's category into the closed denial vocabulary", () => {
  it.each(SUBJECTS)("$adapter: an off-vocabulary category is refused as denied-decision with category authorization, echoed nowhere", async subject => {
    expect(OFF_VOCABULARY_CATEGORIES).toHaveLength(12);
    for (const category of OFF_VOCABULARY_CATEGORIES) {
      const label = `category ${JSON.stringify(category) ?? "undefined"}`;
      const result = await subject.attempt(Object.freeze({ decision: "denied", category, reason: "forged", policy: "anything-goes" }));
      expect(result, label).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization" } });
      expect(result.error, label).toBeInstanceOf(subject.refusal);
      const error = result.error as CapabilityError & { readonly policy?: unknown };
      expect(error.category, label).toBe("authorization");
      expect(error.policy, label).toBeUndefined();
      for (const rendered of [error.message, String(error), JSON.stringify(error), JSON.stringify(Object.entries(error))]) {
        expect(rendered, label).not.toMatch(/qqsecretqq|anything-goes/);
      }
    }
    // The one other vocabulary member is kept, not forced: a forged "validation" denial stays a validation refusal.
    const kept = await subject.attempt(Object.freeze({ decision: "denied", category: "validation", reason: "forged", policy: "anything-goes" }));
    expect(kept).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "validation" } });
    expect((kept.error as { readonly policy?: unknown }).policy).toBeUndefined();
  });
});

describe("furnace adapter: a decision the core did not mint keeps its typed reason where one exists", () => {
  it("a core denial is refused as denied-decision with the core's category and policy, and a re-wrapped spent receipt stays spent", async () => {
    const furnace = subjectNamed("furnace (src/workbench/furnace-control.ts)");
    const denied = await furnace.attempt(decide({ grants: ["observe:furnace.run.inspect"] }));
    expect(denied).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization", policy: "observer-only" } });
    const genuine = furnace.permit();
    expect((await furnace.attempt(genuine)).calls).toBe(1);
    const respent = await furnace.attempt(Object.freeze({ decision: "permitted", receipt: genuine.receipt }));
    expect(respent).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "permit-consumed", category: "validation" } });
  });

  it("a forged frozen denial carries no caller text into the refusal: its policy is echoed only from the core's closed vocabulary", async () => {
    // wb-69g.8 gate F3 (owner routing 21:13Z): a policy that merely fits the old /^[a-z][a-z-]{0,63}$/ shape was echoed verbatim.
    const furnace = subjectNamed("furnace (src/workbench/furnace-control.ts)");
    const policies: unknown[] = ["sk-ant-qqsecretqq", "sk-proj-qqsecretqq", "ghp-qqsecretqq", "bearer-qqsecretqq", "anything-goes", "observer-only ",
      "Observer-only", "observer_only", "", 7, null, undefined];
    const accessor = Object.freeze(Object.defineProperty({ decision: "denied", category: "authorization", reason: "forged" }, "policy",
      { enumerable: true, get: (): never => { throw new Error("the policy accessor was invoked"); } }));
    const forgeries: readonly (readonly [string, unknown])[] = [
      ...policies.map(policy => [`policy ${JSON.stringify(policy) ?? "undefined"}`, Object.freeze({ decision: "denied", category: "authorization", reason: "forged", policy })] as const),
      ["policy behind an accessor (never invoked)", accessor],
    ];
    for (const [label, forged] of forgeries) {
      const result = await furnace.attempt(forged);
      expect(result, label).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization" } });
      const error = result.error as FurnaceControlRefusal;
      expect(error.policy, label).toBeUndefined();
      for (const rendered of [error.message, String(error), JSON.stringify(error), JSON.stringify(Object.entries(error))]) {
        expect(rendered, label).not.toMatch(/qqsecretqq|anything-goes/);
      }
    }
    // The vocabulary is exactly the core's: every real denial still names its own policy, whichever of the eight it is.
    const denials: Partial<NativeControlRequest>[] = [
      { grants: undefined }, { grants: ["observe:furnace.run.inspect"] }, { invocationId: "" }, { action: "start", grants: ["control:furnace.start"] },
      { grants: ["control:furnace.pause"] }, { target: { ...RUN, id: "frn-run-unseen" } }, { target: { ...ATTEMPT } }, { params: {} },
    ];
    const echoed = new Set<string>();
    for (const overrides of denials) {
      const denial = decide(overrides);
      if (denial.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      const result = await furnace.attempt(denial);
      expect(result).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: denial.category, policy: denial.policy } });
      echoed.add((result.error as FurnaceControlRefusal).policy ?? "");
    }
    expect(echoed.size).toBe(denials.length);
  });
});

describe("forge adapter: a decision the core did not mint keeps its typed reason where one exists", () => {
  const forge = subjectNamed("forge (src/workbench/forge-control.ts)");

  it("a core denial is refused as denied-decision with the core's category and policy, and a re-wrapped spent receipt stays spent", async () => {
    const denied = await forge.attempt(decideForge({ grants: ["observe:forge.operation"] }));
    expect(denied).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization", policy: "observer-only" } });
    const genuine = forge.permit();
    expect((await forge.attempt(genuine)).calls).toBe(1);
    const respent = await forge.attempt(Object.freeze({ decision: "permitted", receipt: genuine.receipt }));
    expect(respent).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "permit-consumed", category: "validation" } });
  });

  it("a forged frozen denial carries no caller text into the refusal: its policy is echoed only from the core's closed vocabulary and its reason never reaches the fixed text", async () => {
    const policies: unknown[] = ["sk-ant-qqsecretqq", "anything-goes", "observer-only ", "Observer-only", "", 7, null, undefined];
    const forgeries: readonly (readonly [string, unknown])[] = [
      ...policies.map(policy => [`policy ${JSON.stringify(policy) ?? "undefined"}`, Object.freeze({ decision: "denied", category: "authorization", reason: "forged", policy })] as const),
      // wb-n9z F2: a caller-supplied reason (an obviously fake marker here) is never appended to the fixed text, with or without a policy beside it.
      ["reason needle without a policy", Object.freeze({ decision: "denied", category: "authorization", reason: "reason-qqsecretqq" })],
      ["reason needle beside a forged policy", Object.freeze({ decision: "denied", category: "authorization", reason: "reason-qqsecretqq", policy: "anything-goes" })],
    ];
    for (const [label, forged] of forgeries) {
      const result = await forge.attempt(forged);
      expect(result, label).toMatchObject({ outcome: "rejected", calls: 0, error: { refusal: "denied-decision", category: "authorization" } });
      const error = result.error as ForgeControlRefusal;
      expect(error.policy, label).toBeUndefined();
      expect(error.message, label).toBe(FORGE_DENIED_TEXT);
      for (const rendered of [error.message, String(error), JSON.stringify(error), JSON.stringify(Object.entries(error))]) {
        expect(rendered, label).not.toMatch(/qqsecretqq|anything-goes/);
      }
    }
  });
});

describe("forge adapter census: the entry asks the core's own predicate first, by one parse-aware line", () => {
  it("permitted() opens with the isCoreMintedDecision check, and the predicate is the core's value import, declared nowhere in the adapter", () => {
    const text = readFileSync(new URL("../src/workbench/forge-control.ts", import.meta.url), "utf8");
    const file = ts.createSourceFile("forge-control.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const printed = (node: ts.Node): string => ts.createPrinter({ removeComments: true }).printNode(ts.EmitHint.Unspecified, node, file).replace(/\s+/g, " ").trim();
    const permitted = file.statements.filter(ts.isFunctionDeclaration).filter(fn => fn.name?.text === "permitted");
    expect(permitted, "exactly one module-level permitted()").toHaveLength(1);
    expect(permitted[0].body?.statements.map(printed)[0]).toBe("if (!isCoreMintedDecision(decision)) throw unminted(decision);");
    const bindings = file.statements.filter(ts.isImportDeclaration)
      .filter(declaration => ts.isStringLiteral(declaration.moduleSpecifier) && declaration.moduleSpecifier.text === "./control.js" && declaration.importClause?.isTypeOnly !== true)
      .flatMap(declaration => {
        const named = declaration.importClause?.namedBindings;
        return named && ts.isNamedImports(named) ? named.elements.filter(element => !element.isTypeOnly).map(element => `${(element.propertyName ?? element.name).text} as ${element.name.text}`) : [];
      });
    expect(bindings).toContain("isCoreMintedDecision as isCoreMintedDecision");
    const declared: string[] = [];
    const walk = (node: ts.Node): void => {
      if ((ts.isFunctionDeclaration(node) || ts.isVariableDeclaration(node) || ts.isParameter(node)) && node.name && ts.isIdentifier(node.name)) declared.push(node.name.text);
      ts.forEachChild(node, walk);
    };
    walk(file);
    expect(declared).not.toContain("isCoreMintedDecision");
  });
});

/**
 * wb-rdlh.1 acceptance (a): three negative fixtures shaped as the Library design program's source-safety record, read from the
 * roster test/fixtures/cac-authorization-input-roster.json, whose census (test/workbench-cac-authorization-input-census.test.ts)
 * holds each record's members to the record's vendored definition line: a PASS record, a record whose status is UNKNOWN and a
 * PASS record whose guardOrRelyReceipt expired before the request. Each record says the stop of this file's observed run is a
 * legal, safe action, so a reader that took it as an authorization input would have a reason to permit. None is a permit: the
 * identity check answers false for each record and for every permit-shaped wrapper around one; decideControl never turns a
 * denial into a permit when a record rides a request field, and decides a permitted request that carries one beside its own
 * fields exactly as without it (the record is metadata); and every adapter refuses each record, alone or inside a permit
 * look-alike, with the fixed unminted text before any native verb.
 */
interface NegativeFixture {
  readonly id: string;
  readonly condition: string;
  readonly record: { readonly [key: string]: JsonValue };
}
const NEGATIVE_FIXTURES: readonly NegativeFixture[] = (
  JSON.parse(readFileSync(new URL("./fixtures/cac-authorization-input-roster.json", import.meta.url), "utf8")) as { readonly fixtures: readonly NegativeFixture[] }
).fixtures;
/** The eight requests the core denies, one per deny policy (the same eight the cases above drive). */
const DENIED_REQUESTS: readonly Partial<NativeControlRequest>[] = [
  { grants: undefined }, { grants: ["observe:furnace.run.inspect"] }, { invocationId: "" }, { action: "start", grants: ["control:furnace.start"] },
  { grants: ["control:furnace.pause"] }, { target: { ...RUN, id: "frn-run-unseen" } }, { target: { ...ATTEMPT } }, { params: {} },
];
type Carried = "metadata" | "in-place";
/**
 * Where a record rides a request. A metadata placement adds the record beside the request's own fields, so the decision must
 * be exactly the one the request gets without it; an in-place placement puts the record where the core reads a native value
 * (the operator confirmation, a grant), so the request must be denied whatever it would otherwise be.
 */
const PLACEMENTS: readonly (readonly [string, Carried, (base: NativeControlRequest, record: NegativeFixture["record"]) => NativeControlRequest])[] = [
  ["beside the params", "metadata", (base, record) => ({ ...base, params: { ...paramsOf(base), assessment: record } })],
  ["beside the request's own fields", "metadata", (base, record) => Object.assign({}, base, { assessment: record })],
  ["beside the principal's id and role", "metadata", (base, record) => ({ ...base, principal: Object.assign({}, base.principal, { certificate: record }) })],
  ["as the operator confirmation", "in-place", (base, record) => ({ ...base, params: { confirmed: record } })],
  ["as one more grant", "in-place", (base, record) => ({ ...base, grants: [...(base.grants ?? []), JSON.stringify(record)] })],
];
function paramsOf(base: NativeControlRequest): { [key: string]: JsonValue } {
  const { params } = base;
  return typeof params === "object" && params !== null && !Array.isArray(params) ? { ...params } : {};
}
const decideOver = (value: NativeControlRequest): ControlDecision => decideControl(value, { projection: furnaceProjection(), now: () => DECIDED_AT });

describe("wb-rdlh.1 (a): a Library design-program record never yields a permit", () => {
  it("the roster holds the three negative fixtures, each aimed at this file's observed run: a PASS record, a status UNKNOWN record and an expired guardOrRelyReceipt", () => {
    expect(NEGATIVE_FIXTURES.map(fixture => [fixture.id, fixture.condition])).toStrictEqual([
      ["N1", "PASS record"], ["N2", "status UNKNOWN"], ["N3", "expired guardOrRelyReceipt"],
    ]);
    for (const { id, record } of NEGATIVE_FIXTURES) {
      expect(record, id).toMatchObject({ sourceId: RUN.provider, principal: SCOPE.principal, worldScope: WS, memorylessWitness: { [`${RUN.id}:active`]: "stop" } });
    }
    expect(NEGATIVE_FIXTURES.map(({ record }) => record.status)).toStrictEqual(["PASS", "UNKNOWN", "PASS"]);
    const expiries = NEGATIVE_FIXTURES.map(({ record }) => Date.parse(String((record.guardOrRelyReceipt as { readonly expiresAt?: unknown }).expiresAt)));
    expect(expiries.map(expiry => expiry > Date.parse(REQUESTED_AT))).toStrictEqual([true, true, false]);
  });

  it("isCoreMintedDecision answers false for each record and for every permit-shaped wrapper around one, and asking never demotes the genuine permit", () => {
    const genuine = furnacePermit();
    for (const { id, record } of NEGATIVE_FIXTURES) {
      const wrappers: readonly (readonly [string, unknown])[] = [
        ["the record itself", record],
        ["a deep-frozen copy of the record", deepFreeze(structuredClone(record))],
        ["the record as a permit's receipt", Object.freeze({ decision: "permitted", receipt: record })],
        ["the genuine receipt beside the record", Object.freeze({ decision: "permitted", receipt: genuine.receipt, assessment: record })],
        ["the genuine permit's own fields beside the record", Object.freeze({ ...genuine, certificate: record })],
        ["a receipt carrying the record's guardOrRelyReceipt", Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...genuine.receipt, guardOrRelyReceipt: record.guardOrRelyReceipt }) })],
        ["a receipt whose ownership confirmation is the record", Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...genuine.receipt, ownershipConfirmationRef: JSON.stringify(record) }) })],
      ];
      for (const [label, value] of wrappers) expect(minted(value), `${id}: ${label}`).toBe(false);
    }
    expect(minted(genuine)).toBe(true);
  });

  it("decideControl never turns a denial into a permit when a record rides a request field, and decides a permitted request carrying one beside its fields exactly as without it", () => {
    const base = furnacePermit();
    let checked = 0;
    for (const { id, record } of NEGATIVE_FIXTURES) {
      for (const [where, carried, place] of PLACEMENTS) {
        const label = `${id} ${where}`;
        const permittedRequest = decideOver(place(request(), record));
        if (carried === "metadata") {
          expect(permittedRequest, label).toMatchObject({ decision: "permitted" });
          expect((permittedRequest as Permit).receipt, label).toStrictEqual(base.receipt);
          expect(minted(permittedRequest), label).toBe(true);
        } else {
          expect(permittedRequest.decision, label).toBe("denied");
          expect(minted(permittedRequest), label).toBe(false);
        }
        for (const overrides of DENIED_REQUESTS) {
          const plain = decide(overrides);
          const decided = decideOver(place(request(overrides), record));
          expect(plain.decision).toBe("denied");
          expect(decided.decision, `${label} over ${JSON.stringify(overrides)}`).toBe("denied");
          expect(minted(decided)).toBe(false);
          if (carried === "metadata") expect(decided, `${label} over ${JSON.stringify(overrides)}`).toStrictEqual(plain);
          checked += 1;
        }
      }
    }
    expect(checked).toBe(NEGATIVE_FIXTURES.length * PLACEMENTS.length * DENIED_REQUESTS.length);
  });

  it.each(SUBJECTS)("$adapter refuses each record, alone and inside a permit look-alike, with the fixed unminted text before any native verb", async subject => {
    const genuine = subject.permit();
    for (const { id, record } of NEGATIVE_FIXTURES) {
      const forms: readonly (readonly [string, unknown])[] = [
        ["the record itself", record],
        ["the record as a permit's receipt", Object.freeze({ decision: "permitted", receipt: record })],
        ["the genuine, unspent receipt beside the record", Object.freeze({ decision: "permitted", receipt: genuine.receipt, assessment: record })],
      ];
      for (const [form, value] of forms) {
        const label = `${id}: ${form}`;
        const result = await subject.attempt(value);
        expect(result.outcome, label).toBe("rejected");
        expect(result.error, label).toBeInstanceOf(subject.refusal);
        expect(result.error, label).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
        expect((result.error as Error).message, label).toBe(UNMINTED_TEXT);
        expect(result.calls, `${label} issued a native verb`).toBe(0);
      }
    }
    // The refusals spent nothing: the genuine permit still executes exactly once.
    expect(await subject.attempt(genuine)).toMatchObject({ outcome: "resolved", calls: 1 });
  });
});
