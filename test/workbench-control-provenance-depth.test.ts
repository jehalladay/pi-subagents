/**
 * wb-pjj (W16-L/VC-7): structural vetting stays behind provenance as defense in depth, pinned with the REAL decision core and
 * no module mock. Every decision here is one decideControl really minted (permits and denials) or a forgery built from one.
 *
 * - Provenance runs through the real predicate: a minted permit executes, while a forgery the core never minted is refused
 *   with the fixed provenance text before structural vetting can speak, whether the forgery is malformed or structurally exact.
 * - Structural vetting is unreachable through executeFurnaceControl for any minted value (every permit the core mints is deeply
 *   frozen and exact), so it is the pure exported vetFurnaceControlDecision, driven directly: it passes every permit the core
 *   mints, keeps a real denial's typed reason, refuses one forgery per structural check with the structural text, and passes a
 *   structurally exact forgery, because it vouches for shape and never for provenance.
 * - One parse-aware census line pins the composition no behaviour can reach: permitted() asks the core's own predicate first
 *   and then hands the decision to vetFurnaceControlDecision.
 */
import { readFileSync } from "node:fs";
import type { CallOptions } from "@furnace/sdk";
import ts from "typescript";
import { describe, expect, it, vi } from "vitest";
import { acknowledge, type ControlDecision, decideControl, type NativeControlRequest, type RequestedControlReceipt } from "../src/workbench/control.js";
import * as furnace from "../src/workbench/furnace-control.js";
import { executeFurnaceControl, type FurnaceControlClient, FurnaceControlRefusal } from "../src/workbench/furnace-control.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

/** The structural refusal text furnace-control.ts already used before provenance existed. */
const STRUCTURAL_TEXT = "Furnace control executes only a permitted workbench.control/v1 decision minted by the control core.";
const UNMINTED_TEXT = "decision was not minted by the decision core";
const DENIED_TEXT = "Furnace control refuses a denied decision; no native verb was issued.";

const WS = "/tmp/provenance-depth-ws";
const SCOPE: ObservationScope = { workspace: WS, principal: "operator" };
const AT = "2026-10-15T06:00:00Z";
const DECIDED_AT = "2026-10-15T07:00:01Z";
const ACKED_AT = "2026-10-15T07:00:02Z";
const STATE_SINCE = "2026-10-15T07:00:02.719135054+00:00";
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-r1", scope: WS };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-a1", scope: WS };

type Permit = ControlDecision & { decision: "permitted" };
type Table = readonly (readonly [string, unknown])[];

function projection(): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) {
    projection.refresh({ source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
      node: { title: `${source.provider} ${source.type} ${source.id}`, type: "workflow", statusText: "active", statusTone: "active" } });
  }
  projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: "frn-req-attempts-1" } });
  return projection;
}
function request(overrides: Partial<NativeControlRequest> = {}): NativeControlRequest {
  return { scope: { ...SCOPE }, principal: { id: SCOPE.principal }, grants: ["control:furnace.stop"], target: { ...RUN }, action: "stop",
    params: { confirmed: true }, invocationId: "inv-depth-1", requestedAt: AT, ...overrides };
}
/** A real decision: decideControl over a real projection, nothing stubbed. */
const decide = (overrides: Partial<NativeControlRequest> = {}): ControlDecision => decideControl(request(overrides), { projection: projection(), now: () => DECIDED_AT });
function permit(overrides: Partial<NativeControlRequest> = {}): Permit {
  const decision = decide(overrides);
  if (decision.decision !== "permitted") throw new Error(`expected a permitted decision, got ${JSON.stringify(decision)}`);
  return decision;
}
/** One request per deny policy of the core's ladder; each mints a real denial. */
const DENIALS: readonly Partial<NativeControlRequest>[] = [
  { grants: undefined }, { grants: ["observe:furnace.run.inspect"] }, { invocationId: "" }, { action: "start", grants: ["control:furnace.start"] },
  { grants: ["control:furnace.pause"] }, { target: { ...RUN, id: "frn-run-unseen" } }, { target: { ...ATTEMPT } }, { params: {} },
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
 * wrong. The accessor's getter throws, so reading it instead of its own data descriptor fails as a raw error, not a refusal.
 */
function malformedForgeries(genuine: Permit): Table {
  const { receipt } = genuine;
  const forged = (patch: Record<string, unknown>): unknown => deepFreeze({ decision: "permitted", receipt: { ...structuredClone(receipt), ...patch } });
  const thawed = (key: "scope" | "principal" | "target"): unknown => Object.freeze({ decision: "permitted", receipt: Object.freeze({ ...receipt, [key]: { ...receipt[key] } }) });
  const accessor = Object.freeze(Object.defineProperty({ decision: "permitted" }, "receipt", { enumerable: true, get: (): never => { throw new Error("the receipt accessor was invoked"); } }));
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
    ["the core's own acknowledged phase", Object.freeze({ decision: "permitted", receipt: acknowledge(receipt, { acknowledgedAt: ACKED_AT, nativeAckRef: "run_stop:ack" }) })],
    ["a forged later phase", forged({ phase: "acknowledged" })],
    ["another permit policy", forged({ policy: "exact-grant" })],
    ["a provider that is not a string but names an admitted one", forged({ target: { ...receipt.target, provider: ["furnace"] } })],
    ["an action that is not a string", forged({ action: ["stop"] })],
    ["a provider the core admits no action for", forged({ target: { ...receipt.target, provider: "hyperunix" }, grant: "control:hyperunix.stop" })],
    ["an inherited provider name", forged({ target: { ...receipt.target, provider: "toString" }, grant: "control:toString.stop" })],
    ["an action the core does not admit for the provider", forged({ action: "pause", grant: "control:furnace.pause" })],
    ["a non-canonical grant", forged({ grant: "furnace:stop" })],
    ["a request id that is not a string but spells a valid one", forged({ requestId: [receipt.requestId] })],
    ["a flag-shaped request id", forged({ requestId: "--force" })],
  ];
}

/** The structural vetting under test, through the module namespace so its absence is an assertion failure, not a link error. */
function vet(value: unknown): RequestedControlReceipt {
  expect(furnace.vetFurnaceControlDecision, "src/workbench/furnace-control.ts exports vetFurnaceControlDecision").toBeTypeOf("function");
  return furnace.vetFurnaceControlDecision(value);
}
function vetRefusal(value: unknown): unknown {
  expect(furnace.vetFurnaceControlDecision, "src/workbench/furnace-control.ts exports vetFurnaceControlDecision").toBeTypeOf("function");
  try {
    furnace.vetFurnaceControlDecision(value);
  } catch (error) {
    return error;
  }
  return undefined;
}
/** Executes through the public entry point against fresh counting fakes; `calls` counts every native verb the seam was asked for. */
async function attempt(decision: unknown): Promise<{ readonly error?: unknown; readonly calls: number }> {
  const stop = vi.fn(async (id: string, call?: CallOptions): Promise<unknown> => ({ protocolVersion: 1, kind: "run_stop", requestId: call?.requestId,
    exit: { code: 0, signal: null }, stderr: "", data: { run_id: id, state: "stopped", state_since: STATE_SINCE } }));
  const idle = vi.fn();
  const client = { runs: { pause: idle, stop, resume: idle }, attempts: { stop: idle } } as unknown as FurnaceControlClient;
  const calls = (): number => stop.mock.calls.length + idle.mock.calls.length;
  try {
    await executeFurnaceControl(decision as ControlDecision, { client, workspaceRoot: WS, now: () => ACKED_AT, timeoutMs: 5_000 });
    return { calls: calls() };
  } catch (error) {
    return { error, calls: calls() };
  }
}
function expectRefused(result: { readonly error?: unknown; readonly calls: number }, label: string, message: string): void {
  expect(result.error, `${label} must be refused`).toBeInstanceOf(FurnaceControlRefusal);
  expect(result.error, label).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
  expect((result.error as Error).message, label).toBe(message);
  expect((result.error as { policy?: unknown }).policy, label).toBeUndefined();
  expect(result.calls, `${label} issued a native verb`).toBe(0);
}

describe("provenance through the real core: a decision the core did not mint never reaches structural vetting", () => {
  it("a minted permit executes; every structurally exact forgery of it is refused with the fixed provenance text first", async () => {
    const genuine = permit();
    for (const [label, forgery] of exactForgeries(genuine)) expectRefused(await attempt(forgery), label, UNMINTED_TEXT);
    // The refusals spent nothing: the permit decideControl returned still executes, exactly once.
    const executed = await attempt(genuine);
    expect(executed.error).toBeUndefined();
    expect(executed.calls).toBe(1);
  });

  it("refuses every malformed forgery with the provenance text, never the structural one: provenance is asked first", async () => {
    // Never executed, so no forgery below re-wraps a receipt this adapter already issued (that one stays permit-consumed).
    const genuine = permit({ invocationId: "inv-depth-malformed" });
    for (const [label, forgery] of malformedForgeries(genuine)) expectRefused(await attempt(forgery), label, UNMINTED_TEXT);
  });
});

describe("structural vetting (vetFurnaceControlDecision), driven with decisions the real core minted and forgeries of them", () => {
  it("passes every permit the core mints and hands back that permit's own receipt", () => {
    const overrides: readonly Partial<NativeControlRequest>[] = [
      {}, { invocationId: "inv-depth-2" }, { principal: { id: SCOPE.principal, role: "local-operator" } },
      { grants: ["observe:furnace.run.inspect", "control:furnace.stop"] }, { requestedAt: "2026-10-15T06:30:00+02:00" },
    ];
    for (const override of overrides) {
      const genuine = permit(override);
      expect(vet(genuine), JSON.stringify(override)).toBe(genuine.receipt);
    }
  });

  it("keeps a real denial's typed reason: denied-decision with the core's own category and policy, for every deny policy", () => {
    const policies = new Set<string>();
    for (const overrides of DENIALS) {
      const denial = decide(overrides);
      if (denial.decision !== "denied") throw new Error(`expected a denial for ${JSON.stringify(overrides)}`);
      policies.add(denial.policy);
      const error = vetRefusal(denial);
      expect(error, denial.policy).toBeInstanceOf(FurnaceControlRefusal);
      expect(error, denial.policy).toMatchObject({ refusal: "denied-decision", category: denial.category, policy: denial.policy });
      expect((error as Error).message, denial.policy).toBe(DENIED_TEXT);
    }
    expect(policies.size).toBe(DENIALS.length);
  });

  it("refuses one forgery per structural check with the structural text, naming no field and reading no accessor", () => {
    for (const [label, forgery] of malformedForgeries(permit())) {
      const error = vetRefusal(forgery);
      expect(error, `${label} must be refused`).toBeInstanceOf(FurnaceControlRefusal);
      expect(error, label).toMatchObject({ refusal: "unvetted-decision", category: "validation" });
      expect((error as Error).message, label).toBe(STRUCTURAL_TEXT);
      expect((error as { policy?: unknown }).policy, label).toBeUndefined();
    }
  });

  it("passes a structurally exact forgery: it vouches for shape and never for provenance, so provenance is what refuses it", async () => {
    const genuine = permit({ invocationId: "inv-depth-exact" });
    for (const [label, forgery] of exactForgeries(genuine)) {
      expect(vet(forgery), label).toStrictEqual(genuine.receipt);
      expectRefused(await attempt(forgery), label, UNMINTED_TEXT);
    }
  });
});

/** furnace-control.ts parsed by the TypeScript compiler: statements compared as printed without comments, never as raw text. */
function adapterSource(): ts.SourceFile {
  const path = new URL("../src/workbench/furnace-control.ts", import.meta.url);
  return ts.createSourceFile("furnace-control.ts", readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function printed(node: ts.Node, file: ts.SourceFile): string {
  return ts.createPrinter({ removeComments: true }).printNode(ts.EmitHint.Unspecified, node, file).replace(/\s+/g, " ").trim();
}
function declaredNames(node: ts.Node, names: string[] = []): string[] {
  if ((ts.isFunctionDeclaration(node) || ts.isVariableDeclaration(node) || ts.isParameter(node) || ts.isClassDeclaration(node)) && node.name && ts.isIdentifier(node.name)) {
    names.push(node.name.text);
  }
  ts.forEachChild(node, child => {
    declaredNames(child, names);
  });
  return names;
}

describe("the composition no behaviour can reach, by one parse-aware census line", () => {
  it("permitted() asks the core's own predicate first and then hands the decision to vetFurnaceControlDecision", () => {
    const file = adapterSource();
    const functions = file.statements.filter(ts.isFunctionDeclaration);
    const permitted = functions.filter(fn => fn.name?.text === "permitted");
    expect(permitted, "exactly one module-level permitted()").toHaveLength(1);
    expect(permitted[0].body?.statements.map(statement => printed(statement, file))).toStrictEqual([
      "if (!isCoreMintedDecision(decision)) throw unminted(decision);",
      "return vetFurnaceControlDecision(decision);",
    ]);
    // The vetting it hands on to is the exported pure function the behaviour above drives.
    const vetting = functions.filter(fn => fn.name?.text === "vetFurnaceControlDecision");
    expect(vetting, "exactly one module-level vetFurnaceControlDecision()").toHaveLength(1);
    expect(vetting[0].modifiers?.map(modifier => modifier.kind)).toContain(ts.SyntaxKind.ExportKeyword);
    // The predicate it asks is the core's own binding: a value import from ./control.js, declared nowhere in the adapter.
    const core = file.statements.filter(ts.isImportDeclaration).filter(declaration => ts.isStringLiteral(declaration.moduleSpecifier) &&
      declaration.moduleSpecifier.text === "./control.js" && declaration.importClause?.isTypeOnly !== true);
    const bindings = core.flatMap(declaration => {
      const named = declaration.importClause?.namedBindings;
      return named && ts.isNamedImports(named) ? named.elements.filter(element => !element.isTypeOnly).map(element => `${(element.propertyName ?? element.name).text} as ${element.name.text}`) : [];
    });
    expect(bindings).toContain("isCoreMintedDecision as isCoreMintedDecision");
    expect(declaredNames(file)).not.toContain("isCoreMintedDecision");
  });
});
