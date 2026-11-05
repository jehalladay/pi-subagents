/**
 * W06/W16-I/VC-2 (wb-6hb.4): cross-surface capability authorization parity.
 *
 * docs/workbench/06 "Conformance tests": the same capability reached from a
 * workflow node() and from a curated tool invocation uses identical
 * authorization and input contracts. Three surfaces reach
 * CapabilityRegistry.dispatch:
 *   claude-node   script node() -> runWorkflow -> createClaudeWorkflowHost.callNode
 *   detached-node script node() -> runWorkflow -> createDetachedWorkflowHost.callNode
 *   claude-tool   the curated capability_invoke MCP tool
 * The direct registry.invoke call with the same context is the oracle. A
 * surface may only NARROW the oracle's decision (docs/06 finite allowlist per
 * surface); a surface permitting what the oracle refuses is a widening defect.
 * Widenings are reported, never patched here. The one measured widening (a JSON
 * own "__proto__" key permitted by capability_invoke) was fixed by follow-up bead
 * wb-8i1; its cell is now plain P1 parity and the known-widening list is empty.
 * Fixture providers only; no src change.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, beforeAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner } from "vitest";
import { CapabilityError, CapabilityRegistry, type InvocationContext, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { createDetachedWorkflowHost, type DetachedHostRequest } from "../src/workbench/hosts/local-detached.js";
import { runWorkflow, type WorkflowHost, type WorkflowNodeRequest } from "../src/workflow/runtime.js";

const HEAD = 'export const meta = { name: "surface-parity", description: "cross-surface parity" };\n';
const WORKSPACE = "/fixture/parity-workspace";
const INVOCATION = "parity-invocation";
const CLAUDE_PRINCIPAL = { id: "host-principal", role: "host-role" } as const;
const OPERATOR = { id: "local-os:uid:4242", role: "local-operator" } as const;

const OPEN = "fixture.parity-open";
const READ = "fixture.parity-read";
const WRITE = "fixture.parity-write";
const LOOSE = "fixture.parity-loose";
const MISSING = "fixture.parity-missing";
const STRICT_SCHEMA = { type: "object", properties: { value: { type: "string" } }, required: ["value"], additionalProperties: false };
const LOOSE_SCHEMA = { type: "object", properties: { value: { type: "string" } }, required: ["value"] };

type SurfaceName = "claude-node" | "detached-node" | "claude-tool";
const SURFACES: readonly SurfaceName[] = ["claude-node", "detached-node", "claude-tool"];

interface Recorded {
  id: string;
  input: JsonValue;
  context: InvocationContext;
}
interface Outcome {
  permitted: boolean;
  category?: string;
  message?: string;
  value?: unknown;
  recorded: Recorded[];
}

/** One registry of fixture providers that record exactly what reaches them. */
function fixture() {
  const recorded: Recorded[] = [];
  const registry = new CapabilityRegistry();
  const add = (id: string, effectClass: "read" | "write", permissions: string[], inputSchema: Record<string, unknown>) =>
    registry.register({
      descriptor: { id, version: "1.0.0", description: "parity fixture", inputSchema, effectClass, permissions, supportedModes: ["invoke"] },
      async invoke(input, context) {
        recorded.push({ id, input, context });
        return { id, echoed: input };
      },
    });
  add(OPEN, "read", [], STRICT_SCHEMA);
  add(READ, "read", ["fixture:read"], STRICT_SCHEMA);
  add(WRITE, "write", ["fixture:write"], STRICT_SCHEMA);
  add(LOOSE, "read", [], LOOSE_SCHEMA);
  return { registry, recorded };
}

function toOutcome(error: unknown, recorded: Recorded[]): Outcome {
  if (error instanceof CapabilityError) return { permitted: false, category: error.category, message: error.message, recorded };
  throw error;
}

interface Row {
  name: string;
  id: string;
  grants: readonly string[];
  /** Host-level input, handed to the oracle and to the tool as-is. */
  input: () => unknown;
  /**
   * The same input as a script expression inside node(). Rows without one drive each node host's callNode
   * directly: the pre-cancelled row (the host receives an already-aborted node signal) and the accessor-bearing
   * and prototype-key rows. A script CAN express both of those inputs, but the runtime refuses them at the
   * workflow VM boundary before any host sees them (pinned under C3 below), so callNode is the only way to reach
   * the host's registry decision for them.
   */
  expr?: string;
  /** Cells this row cannot reach on a surface's production channel, with the reason; every skip is censused below. */
  skip?: { surfaces: readonly SurfaceName[]; reason: string };
  preCancelled?: boolean;
  /** Tool allowlist; defaults to every fixture id plus the missing id. */
  allowed?: readonly string[];
  /** Expected oracle decision and the per-surface expectation. */
  oracle: { permitted: boolean; category?: string };
  /** Where a surface-local gate decides, the message is its own; elsewhere it is the registry's. */
  narrowing?: Partial<Record<SurfaceName, { category: string }>>;
  /**
   * A measured WIDENING (the surface permits what the oracle refuses), reported as a finding and never patched
   * here: surface -> the follow-up bead that fixes it. The cell asserts the current behaviour (permits) and guards
   * that the oracle still refuses; the fix's own commit deletes the entry, and the cell falls back to plain P1
   * parity (owner ruling: a known widening is pinned without .skip or .fails).
   */
  knownWidening?: Partial<Record<SurfaceName, string>>;
  /** Surfaces whose refusal text is surface-local although the category is the registry's. */
  localText?: readonly SurfaceName[];
}

const ALL_FIXTURE_IDS = [OPEN, READ, WRITE, LOOSE, MISSING];
const deep = (levels: number): unknown => {
  let value: unknown = { value: "x" };
  for (let i = 0; i < levels; i++) value = { value: "x", next: value };
  return value;
};
const accessor = (): unknown => {
  const input: Record<string, unknown> = {};
  Object.defineProperty(input, "value", { enumerable: true, get: () => "x" });
  return input;
};
const protoKey = (): unknown => JSON.parse('{"value":"x","__proto__":{"grants":["fixture:write"]}}');
/** C4: the reason is measured under "skipped cells" below, not asserted. */
const ACCESSOR_SKIP = {
  surfaces: ["claude-tool"],
  reason:
    "the tool's production channel is JSON and JSON cannot carry an accessor; the in-memory test transport hands the object over by reference and the tool's zod parse evaluates the getter, so a by-reference cell would measure the harness, not the surface",
} as const;

const ROWS: readonly Row[] = [
  { name: "unknown capability id", id: MISSING, grants: [`invoke:${MISSING}`], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: false, category: "unavailable" }, localText: ["claude-tool"] },
  { name: "invoke grant absent", id: OPEN, grants: [], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: false, category: "authorization" }, localText: ["claude-tool"] },
  { name: "producer permission absent", id: READ, grants: [`invoke:${READ}`], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: false, category: "authorization" } },
  { name: "discover and inspect grants never confer invoke", id: OPEN, grants: [`discover:${OPEN}`, `inspect:${OPEN}`], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: false, category: "authorization" }, localText: ["claude-tool"] },
  { name: "discover grant never confers a producer permission", id: READ, grants: [`discover:${READ}`, `invoke:${READ}`], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: false, category: "authorization" } },
  {
    name: "producer permission present without invoke grant (recorded narrowing)",
    id: READ, grants: ["fixture:read"], input: () => ({ value: "x" }), expr: '{ value: "x" }',
    oracle: { permitted: true }, narrowing: { "claude-tool": { category: "authorization" } }, localText: ["claude-tool"],
  },
  { name: "exposure allowlist miss (tool surface only)", id: READ, grants: [`invoke:${READ}`, "fixture:read"], input: () => ({ value: "x" }), expr: '{ value: "x" }', allowed: [OPEN], oracle: { permitted: true }, narrowing: { "claude-tool": { category: "authorization" } }, localText: ["claude-tool"] },
  { name: "schema-invalid input", id: OPEN, grants: [`invoke:${OPEN}`], input: () => ({ value: 123 }), expr: "{ value: 123 }", oracle: { permitted: false, category: "validation" } },
  { name: "missing required field", id: OPEN, grants: [`invoke:${OPEN}`], input: () => ({}), expr: "{}", oracle: { permitted: false, category: "validation" } },
  { name: "unknown field under a strict schema", id: OPEN, grants: [`invoke:${OPEN}`], input: () => ({ value: "x", extra: 1 }), expr: '{ value: "x", extra: 1 }', oracle: { permitted: false, category: "validation" } },
  { name: "oversized input", id: OPEN, grants: [`invoke:${OPEN}`], input: () => ({ value: "x".repeat(300_000) }), expr: '{ value: "x".repeat(300000) }', oracle: { permitted: false, category: "validation" }, localText: ["claude-node", "detached-node", "claude-tool"] },
  { name: "over-deep input", id: OPEN, grants: [`invoke:${OPEN}`], input: () => deep(100), expr: '(() => { let v = { value: "x" }; for (let i = 0; i < 100; i++) v = { value: "x", next: v }; return v; })()', oracle: { permitted: false, category: "validation" }, localText: ["claude-node", "detached-node", "claude-tool"] },
  { name: "accessor-bearing input", id: OPEN, grants: [`invoke:${OPEN}`], input: accessor, skip: ACCESSOR_SKIP, oracle: { permitted: false, category: "validation" } },
  { name: "prototype-key input", id: OPEN, grants: [`invoke:${OPEN}`], input: protoKey, oracle: { permitted: false, category: "validation" } },
  { name: "pre-cancelled signal", id: READ, grants: [`invoke:${READ}`, "fixture:read"], input: () => ({ value: "x" }), preCancelled: true, oracle: { permitted: false, category: "transport" }, localText: ["claude-tool"] },
  { name: "happy path: read with producer permission", id: READ, grants: [`invoke:${READ}`, "fixture:read"], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: true } },
  { name: "happy path: permission-free read", id: OPEN, grants: [`invoke:${OPEN}`], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: true } },
  { name: "happy path: write with producer permission", id: WRITE, grants: [`invoke:${WRITE}`, "fixture:write"], input: () => ({ value: "x" }), expr: '{ value: "x" }', oracle: { permitted: true } },
];

/** The oracle: registry.invoke called directly with the host-bound context a surface would build. */
async function oracle(row: Row): Promise<Outcome> {
  const { registry, recorded } = fixture();
  const controller = new AbortController();
  if (row.preCancelled) controller.abort();
  try {
    const value = await registry.invoke(row.id, row.input(), { grants: [...row.grants], signal: controller.signal, invocationId: INVOCATION, principal: CLAUDE_PRINCIPAL, workspace: WORKSPACE, callId: "1" });
    return { permitted: true, value, recorded };
  } catch (error) {
    return toOutcome(error, recorded);
  }
}

/** Drives a node host either through a script (when the row can express its input) or through callNode directly. */
async function viaNodeHost(host: WorkflowHost, row: Row, recorded: Recorded[]): Promise<Outcome> {
  if (row.expr !== undefined && !row.preCancelled) {
    const result = await runWorkflow({ script: `${HEAD}return await node(${JSON.stringify(row.id)}, ${row.expr});`, host });
    if (result.status === "completed") return { permitted: true, value: result.value, recorded };
    if (!result.capabilityError) throw new Error(`Run failed without a typed capability diagnostic: ${result.error}`);
    return { permitted: false, category: result.capabilityError.category, message: result.capabilityError.message, recorded };
  }
  const controller = new AbortController();
  if (row.preCancelled) controller.abort();
  const request: WorkflowNodeRequest = { callId: 1, index: 0, capabilityId: row.id, input: row.input(), label: row.id, signal: controller.signal };
  try {
    return { permitted: true, value: await host.callNode!(request), recorded };
  } catch (error) {
    return toOutcome(error, recorded);
  }
}

async function claudeNode(row: Row): Promise<Outcome> {
  const { registry, recorded } = fixture();
  const host = createClaudeWorkflowHost({ cwd: WORKSPACE, capabilities: registry, grants: [...row.grants], principal: CLAUDE_PRINCIPAL, invocationId: INVOCATION });
  return viaNodeHost(host, row, recorded);
}

function detachedRequest(row: Pick<Row, "grants">, overrides: Partial<DetachedHostRequest> = {}): DetachedHostRequest {
  return { backend: "deterministic", cwd: WORKSPACE, invocationId: INVOCATION, providers: [], grants: [...row.grants], ...overrides };
}

async function detachedNode(row: Row): Promise<Outcome> {
  const { registry, recorded } = fixture();
  const host = createDetachedWorkflowHost({ request: detachedRequest(row), registry, principal: OPERATOR, signal: new AbortController().signal, beforeDispatch: () => {} });
  return viaNodeHost(host, row, recorded);
}

const closers: Array<() => Promise<void>> = [];

async function toolClient(registry: CapabilityRegistry, grants: readonly string[], allowed: readonly string[], signal: AbortSignal) {
  const server = createCuratedTools({ registry, allowedCapabilities: allowed, grants, principal: CLAUDE_PRINCIPAL, workspace: WORKSPACE, invocationId: INVOCATION, signal });
  const client = new Client({ name: "parity-fixture", version: "1.0.0" });
  const [clientSide, serverSide] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverSide);
  await client.connect(clientSide);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return client;
}

async function callInvoke(client: Client, args: Record<string, unknown>) {
  const result = await client.callTool({ name: "capability_invoke", arguments: args });
  const text = (result.content as Array<{ type: string; text: string }>)[0].text;
  return JSON.parse(text) as { kind: string; category?: string; diagnostic?: string; value?: unknown };
}

async function claudeTool(row: Row): Promise<Outcome> {
  const { registry, recorded } = fixture();
  const controller = new AbortController();
  if (row.preCancelled) controller.abort();
  const client = await toolClient(registry, row.grants, row.allowed ?? ALL_FIXTURE_IDS, controller.signal);
  const payload = await callInvoke(client, { capabilityId: row.id, capabilityVersion: "1.0.0", input: row.input() });
  if (payload.kind === "returned") return { permitted: true, value: payload.value, recorded };
  return { permitted: false, category: payload.category, message: payload.diagnostic, recorded };
}

const RUNNERS: Record<SurfaceName, (row: Row) => Promise<Outcome>> = { "claude-node": claudeNode, "detached-node": detachedNode, "claude-tool": claudeTool };

const oracles = new Map<string, Outcome>();
const outcomes = new Map<string, Outcome>();
const key = (row: Row, surface: SurfaceName) => `${row.name}::${surface}`;

/**
 * R673 (wb-csne): the explicit budget of this file's suite hook, file-local so no other suite's budget moves (the wb-hk9l
 * PACKAGE_COPY_ROW_BUDGET_MS pattern). The hook drives every matrix cell before the first row runs - the oracle and each surface
 * for all 18 rows, through two workflow VMs and an in-memory MCP pair per tool cell - so its wall is set by host
 * contention, not by parity logic. Inside vitest's default 10000 ms hookTimeout it timed out at three land-prep try-1 runs
 * (landings 224, 226 and 229: cmd_3998447f30df, cmd_a2eadbb3348c, cmd_9204c30d7a56), each time skipping all 101 rows and
 * cascading into the docs06 census, whose AC2 bullet 1/guard half pins two rows of this file. The budget is above the
 * owner floor of 20000 ms and more than 2 x the worst wall of record (WORST_MEASURED_HOOK_WALL_MS). Exceeding it is a real
 * red: withinHookBudget fails the hook with an AssertionError naming this constant, never vitest's bare hook timeout.
 */
const PARITY_SUITE_HOOK_BUDGET_MS = 60_000;
/**
 * The worst wall of record of the suite hook, a lower bound: 11813 ms, the landing 224 try-1 file wall at the 10000 ms
 * kill (cmd_3998447f30df; landings 226 and 229 read 10008 and 10260 ms, and the delivery-gate sightings behind register
 * entry 21, wb-4ap.19 cmd_023706418b55 and wb-drd cmd_b771fcf71b20, read 10170 ms and a red at :244), so the hook itself
 * ran at least 10000 ms there.
 * Uncensored walls measured 2026-10-21 for wb-csne under a 600000 ms ceiling at load1 158-270: 2126-2807 ms file-alone
 * over 6 sequential runs, 2799-4186 ms 8-way, 4719-6302 ms 16-way and 4060-6532 ms 32-way; timed by withinHookBudget at
 * load1 323-347: 2313-2927 ms over 4 sequential runs and 2872-3958 ms 16-way.
 */
const WORST_MEASURED_HOOK_WALL_MS = 11_813;
/** vitest's own timer for the suite hook: a backstop past the budget, so the budget's named AssertionError always fires first. */
const PARITY_SUITE_HOOK_BACKSTOP_MS = 2 * PARITY_SUITE_HOOK_BUDGET_MS;
const PARITY_SUITE_HOOK = "the capability-surface-parity suite hook";

interface HookReading {
  readonly hook: string;
  readonly budgetMs: number;
  readonly wallMs: number;
  readonly outcome: "settled" | "overrun";
}
/** One reading per guarded hook run, appended by withinHookBudget before it judges the run: the evidence a hook ran under its budget. */
const HOOK_READINGS: HookReading[] = [];

/**
 * Runs a hook body under its file-local budget (R673). The body races a timer of budgetMs; an overrun - a body that
 * finishes late, or one still running when the timer fires - fails the hook with an AssertionError naming the budget and
 * its value. A body's own error propagates unchanged.
 */
async function withinHookBudget(hook: string, budget: string, budgetMs: number, body: () => void | Promise<void>): Promise<void> {
  const started = performance.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const overrun = new Promise<"overrun">(resolve => {
    timer = setTimeout(() => resolve("overrun"), budgetMs);
  });
  try {
    const outcome = await Promise.race([Promise.resolve().then(body).then(() => "settled" as const), overrun]);
    const wallMs = Math.round(performance.now() - started);
    HOOK_READINGS.push({ hook, budgetMs, wallMs, outcome });
    const still = outcome === "overrun" ? " and was still running" : "";
    expect(outcome === "settled" && wallMs <= budgetMs, `${hook} ran ${wallMs} ms${still}, past its file-local budget ${budget} = ${budgetMs} ms (R673)`).toBe(true);
  } finally {
    clearTimeout(timer);
  }
}

beforeAll(async () => {
  // R673 (wb-csne): the landed body runs inside withinHookBudget; its lines are kept byte-identical (no edits to landed lines), one level shallower than the callback they now sit in.
  await withinHookBudget(PARITY_SUITE_HOOK, "PARITY_SUITE_HOOK_BUDGET_MS", PARITY_SUITE_HOOK_BUDGET_MS, async () => {
  for (const row of ROWS) {
    oracles.set(row.name, await oracle(row));
    for (const surface of SURFACES) {
      if (row.skip?.surfaces.includes(surface)) continue;
      outcomes.set(key(row, surface), await RUNNERS[surface](row));
    }
  }
});
}, PARITY_SUITE_HOOK_BACKSTOP_MS);
afterAll(async () => {
  for (const close of closers.splice(0)) await close();
});

const ranSurfaces = (row: Row) => SURFACES.filter(surface => !row.skip?.surfaces.includes(surface));
/** Every known widening as `<row> on <surface>`, with the bead that fixes it. */
const KNOWN_WIDENINGS = ROWS.flatMap(row =>
  SURFACES.flatMap(surface => {
    const bead = row.knownWidening?.[surface];
    return bead === undefined ? [] : [{ cell: `${row.name} on ${surface}`, bead }];
  }),
);

describe("the registry oracle matches the recorded expectation", () => {
  it.each(ROWS.map(row => [row.name, row] as const))("%s", (_name, row) => {
    const expected = row.oracle;
    const actual = oracles.get(row.name)!;
    expect(actual.permitted).toBe(expected.permitted);
    if (!expected.permitted) expect(actual.category).toBe(expected.category);
  });
});

describe("P1: identical registry decision across surfaces", () => {
  const cells = ROWS.flatMap(row => ranSurfaces(row).map(surface => [row.name, surface, row] as const));
  it.each(cells)("%s on %s", (_name, surface, row) => {
    const out = outcomes.get(key(row, surface))!;
    const base = oracles.get(row.name)!;
    const narrowed = row.narrowing?.[surface];
    if (narrowed) {
      // A surface-local gate refused what the registry would permit.
      expect(base.permitted).toBe(true);
      expect(out.permitted).toBe(false);
      expect(out.category).toBe(narrowed.category);
      return;
    }
    const widening = row.knownWidening?.[surface];
    if (widening) {
      // The known widening, reported as a finding: the oracle still refuses with the recorded category...
      expect(base).toMatchObject({ permitted: false, category: row.oracle.category });
      // ...and the surface currently permits. The fix turns this red and deletes the knownWidening entry.
      expect(out.permitted, `known widening, fixed by ${widening}`).toBe(true);
      return;
    }
    expect(out.permitted).toBe(base.permitted);
    // Each surface also equals the recorded expectation, so a registry regression that moves the oracle and every
    // surface together (M3) is red on each of the three surfaces, not only on the oracle row.
    expect(out.permitted).toBe(row.oracle.permitted);
    if (base.permitted) {
      expect(out.value).toEqual(base.value);
      return;
    }
    expect(out.category).toBe(base.category);
    expect(out.category).toBe(row.oracle.category);
    // Where the registry itself decided, the refusal text is the registry's, verbatim.
    if (!row.localText?.includes(surface)) expect(out.message).toBe(base.message);
  });

  it("registry-decided authorization and unavailable refusals are verbatim on every surface", () => {
    const decided = ROWS.filter(row => row.name === "producer permission absent" || row.name === "discover grant never confers a producer permission" || row.name === "schema-invalid input");
    expect(decided).toHaveLength(3);
    for (const row of decided) {
      const texts = ranSurfaces(row).map(surface => outcomes.get(key(row, surface))?.message);
      expect(new Set([...texts, oracles.get(row.name)?.message]).size).toBe(1);
    }
    expect(oracles.get("producer permission absent")?.message).toBe(`Permission denied for capability ${READ} (invoke).`);
    expect(oracles.get("schema-invalid input")?.message).toBe(`Invalid input schema for capability ${OPEN}.`);
    expect(oracles.get("unknown capability id")?.message).toBe(`Unknown or unavailable capability: ${MISSING}.`);
  });
});

describe("P2: surface allowlists only narrow", () => {
  it("has no cell where a surface permits and the oracle refuses, and records no known widening", () => {
    const widenings = ROWS.flatMap(row => ranSurfaces(row).filter(surface => outcomes.get(key(row, surface))?.permitted && !oracles.get(row.name)?.permitted).map(surface => `${row.name} on ${surface}`));
    // Spelled out and empty since wb-8i1 landed the refusal: any future knownWidening entry or measured widening is red.
    expect(KNOWN_WIDENINGS).toEqual([]);
    expect(widenings).toEqual([]);
  });
  it("pins the wb-8i1 refusal: capability_invoke refuses a JSON own __proto__ key exactly like the oracle and both node hosts", async () => {
    const row = ROWS.find(candidate => candidate.name === "prototype-key input")!;
    const refusal = { permitted: false, category: "validation", message: `Prototype pollution key at invoke(${OPEN}) input.__proto__.` };
    expect(oracles.get(row.name)).toMatchObject(refusal);
    expect(outcomes.get(key(row, "claude-node"))).toMatchObject(refusal);
    expect(outcomes.get(key(row, "detached-node"))).toMatchObject(refusal);
    // The production channel carries the key: JSON text naming "__proto__" parses to an OWN data property.
    const wire = JSON.stringify({ capabilityId: OPEN, capabilityVersion: "1.0.0", input: row.input() });
    expect(wire).toBe(`{"capabilityId":"${OPEN}","capabilityVersion":"1.0.0","input":{"value":"x","__proto__":{"grants":["fixture:write"]}}}`);
    // By reference (the matrix cell) and after the JSON round trip alike, the tool refuses with the registry text and
    // the provider is never reached, so the planted grant never becomes authority.
    const { registry, recorded } = fixture();
    const client = await toolClient(registry, row.grants, ALL_FIXTURE_IDS, new AbortController().signal);
    const overWire = await callInvoke(client, JSON.parse(wire) as Record<string, unknown>);
    expect(outcomes.get(key(row, "claude-tool"))).toMatchObject(refusal);
    expect(overWire).toEqual({ kind: "rejected", category: "validation", diagnostic: refusal.message });
    expect(outcomes.get(key(row, "claude-tool"))?.recorded).toHaveLength(0);
    expect(recorded).toHaveLength(0);
  });
  it("pins the matrix row set by name, so deleting any one row (and its oracle test and P1 cells) is red", () => {
    expect(ROWS.map(row => row.name)).toEqual([
      "unknown capability id",
      "invoke grant absent",
      "producer permission absent",
      "discover and inspect grants never confer invoke",
      "discover grant never confers a producer permission",
      "producer permission present without invoke grant (recorded narrowing)",
      "exposure allowlist miss (tool surface only)",
      "schema-invalid input",
      "missing required field",
      "unknown field under a strict schema",
      "oversized input",
      "over-deep input",
      "accessor-bearing input",
      "prototype-key input",
      "pre-cancelled signal",
      "happy path: read with producer permission",
      "happy path: permission-free read",
      "happy path: write with producer permission",
    ]);
  });
  it("pins the measured narrowing: the tool alone requires invoke:<id> even when producer permissions are held", () => {
    const row = ROWS.find(candidate => candidate.name.startsWith("producer permission present without invoke grant"))!;
    expect(oracles.get(row.name)?.permitted).toBe(true);
    expect(outcomes.get(key(row, "claude-node"))?.permitted).toBe(true);
    expect(outcomes.get(key(row, "detached-node"))?.permitted).toBe(true);
    expect(outcomes.get(key(row, "claude-tool"))).toMatchObject({ permitted: false, category: "authorization", message: "Claude capability permission denied." });
    expect(outcomes.get(key(row, "claude-tool"))?.recorded).toHaveLength(0);
  });
  it("refuses an exposure allowlist miss on the tool surface with category authorization", () => {
    const row = ROWS.find(candidate => candidate.name.startsWith("exposure allowlist miss"))!;
    expect(oracles.get(row.name)?.permitted).toBe(true);
    expect(outcomes.get(key(row, "claude-tool"))).toMatchObject({ permitted: false, category: "authorization", message: "Capability is not exposed to this Claude role." });
    expect(outcomes.get(key(row, "claude-tool"))?.recorded).toHaveLength(0);
  });
  it("narrows on the detached host through its reviewed local manifest and never widens the registry", async () => {
    const row = ROWS.find(candidate => candidate.name === "happy path: read with producer permission")!;
    const { registry, recorded } = fixture();
    const request = detachedRequest(row, { localProvider: { kind: "trusted-local", version: "1.0.0", modulePath: `${WORKSPACE}/provider.mjs`, digest: `sha256:${"a".repeat(64)}`, capabilities: [OPEN] } });
    const host = createDetachedWorkflowHost({ request, registry, principal: OPERATOR, signal: new AbortController().signal, beforeDispatch: () => {} });
    const refused = await viaNodeHost(host, row, recorded);
    expect(oracles.get(row.name)?.permitted).toBe(true);
    expect(refused).toMatchObject({ permitted: false, category: "authorization", message: "Capability absent from trusted local provider manifest." });
    expect(recorded).toHaveLength(0);
  });
  it("never lets a refused surface reach the provider", () => {
    for (const row of ROWS) {
      for (const surface of ranSurfaces(row)) {
        const out = outcomes.get(key(row, surface))!;
        if (!out.permitted) expect(out.recorded, `${row.name} on ${surface}`).toHaveLength(0);
      }
    }
  });
});

describe("P3: authority is host-bound on every surface", () => {
  const FORGED = { principal: { id: "admin", role: "root" }, workspace: "/foreign", grants: ["*", "fixture:write"], invocationId: "forged-invocation", scope: "all" };
  const GRANTS = [`invoke:${LOOSE}`];

  async function plantedRun(surface: SurfaceName): Promise<Outcome> {
    const input = { value: "x", ...FORGED };
    const row: Row = { name: "planted", id: LOOSE, grants: GRANTS, input: () => input, expr: JSON.stringify(input), oracle: { permitted: true } };
    if (surface !== "claude-tool") return RUNNERS[surface](row);
    const { registry, recorded } = fixture();
    const client = await toolClient(registry, GRANTS, ALL_FIXTURE_IDS, new AbortController().signal);
    // Authority fields planted at the tool-argument level as well as inside input.
    const payload = await callInvoke(client, { capabilityId: LOOSE, capabilityVersion: "1.0.0", input, ...FORGED });
    expect(payload.kind).toBe("returned");
    return { permitted: true, recorded };
  }

  const EXPECTED: Record<SurfaceName, { principal: { id: string; role?: string }; callId: string | undefined }> = {
    "claude-node": { principal: CLAUDE_PRINCIPAL, callId: undefined },
    "detached-node": { principal: OPERATOR, callId: undefined },
    "claude-tool": { principal: CLAUDE_PRINCIPAL, callId: `${INVOCATION}:mcp:1` },
  };

  it.each(SURFACES)("%s: provider context carries host principal, workspace, invocationId and grants, never the planted values", async surface => {
    const out = await plantedRun(surface);
    expect(out.permitted).toBe(true);
    expect(out.recorded).toHaveLength(1);
    const { input, context } = out.recorded[0];
    // The planted fields are inert data inside a permissive schema; they never become authority.
    expect(input).toMatchObject({ value: "x", invocationId: "forged-invocation" });
    expect(context.principal).toEqual(EXPECTED[surface].principal);
    expect(context.workspace).toBe(WORKSPACE);
    expect(context.invocationId).toBe(INVOCATION);
    expect([...context.grants]).toEqual(GRANTS);
    expect(JSON.stringify(context)).not.toContain("forged-invocation");
    expect(JSON.stringify(context)).not.toContain("/foreign");
    expect(JSON.stringify(context)).not.toContain("admin");
    if (EXPECTED[surface].callId) expect(context.callId).toBe(EXPECTED[surface].callId);
  });

  it.each(SURFACES)("%s: planted authority under a strict schema is refused with the oracle's category and never reaches the provider", async surface => {
    const input = { value: "x", ...FORGED };
    const row: Row = { name: "planted-strict", id: OPEN, grants: [`invoke:${OPEN}`], input: () => input, expr: JSON.stringify(input), oracle: { permitted: false, category: "validation" } };
    const base = await oracle(row);
    const out = await RUNNERS[surface](row);
    expect(base).toMatchObject({ permitted: false, category: "validation" });
    expect(out).toMatchObject({ permitted: false, category: "validation" });
    expect(out.message).toBe(base.message);
    expect(out.recorded).toHaveLength(0);
  });

  it.each(["principal", "grants", "workspace", "invocationId"])("a script cannot pass %s through node() options on either node host", async option => {
    // The host-bound context is built outside the script; node() options accept only label and phase.
    for (const surface of ["claude-node", "detached-node"] as const) {
      const { registry, recorded } = fixture();
      const grants = [`invoke:${LOOSE}`];
      const host = surface === "claude-node"
        ? createClaudeWorkflowHost({ cwd: WORKSPACE, capabilities: registry, grants, principal: CLAUDE_PRINCIPAL, invocationId: INVOCATION })
        : createDetachedWorkflowHost({ request: detachedRequest({ grants }), registry, principal: OPERATOR, signal: new AbortController().signal, beforeDispatch: () => {} });
      const result = await runWorkflow({ script: `${HEAD}return await node(${JSON.stringify(LOOSE)}, { value: "x" }, { ${option}: "forged" });`, host });
      expect(result.status, surface).toBe("failed");
      expect(result.capabilityError?.category, surface).toBe("validation");
      expect(recorded, surface).toHaveLength(0);
    }
  });

  it.each(SURFACES)("%s: the provider receives a frozen copy of the host grants, not the host array", async surface => {
    const hostGrants = [`invoke:${LOOSE}`];
    const input = { value: "x" };
    const row: Row = { name: "frozen", id: LOOSE, grants: hostGrants, input: () => input, expr: JSON.stringify(input), oracle: { permitted: true } };
    const out = await RUNNERS[surface](row);
    expect(out.permitted).toBe(true);
    const { context } = out.recorded[0];
    expect(Object.isFrozen(context.grants)).toBe(true);
    expect(context.grants).not.toBe(hostGrants);
    expect([...context.grants]).toEqual(hostGrants);
    hostGrants.push("fixture:write");
    expect([...context.grants]).toEqual([`invoke:${LOOSE}`]);
  });
});

describe("C3: a script can express accessor-bearing and prototype-key inputs; the runtime refuses both at the VM boundary", () => {
  const FORMS = [
    {
      name: "accessor-bearing input",
      expr: '(() => { const v = {}; Object.defineProperty(v, "value", { enumerable: true, get: () => "x" }); return v; })()',
      text: "Cannot pass an accessor or hidden property across the workflow VM boundary (at node() input.value).",
    },
    {
      name: "prototype-key input",
      expr: `JSON.parse('{"value":"x","__proto__":{"grants":["fixture:write"]}}')`,
      text: "Cannot pass a prototype pollution key across the workflow VM boundary (at node() input.__proto__).",
    },
  ] as const;
  const cells = FORMS.flatMap(form => (["claude-node", "detached-node"] as const).map(surface => [form.name, surface, form] as const));
  it.each(cells)("%s from a script on %s: refused before any host with the oracle's category", async (_name, surface, form) => {
    const row = ROWS.find(candidate => candidate.name === form.name)!;
    const out = await RUNNERS[surface]({ ...row, expr: form.expr });
    expect(oracles.get(row.name)).toMatchObject({ permitted: false, category: "validation" });
    expect(out).toMatchObject({ permitted: false, category: "validation", message: form.text });
    expect(out.recorded).toHaveLength(0);
  });
});

describe("skipped cells are named and their reason is measured", () => {
  it("the only skipped cell is the accessor-bearing input on the tool surface", () => {
    const skipped = ROWS.flatMap(row => (row.skip?.surfaces ?? []).map(surface => `${row.name} on ${surface}`));
    expect(skipped).toEqual(["accessor-bearing input on claude-tool"]);
  });
  it("C4: JSON cannot carry an accessor, while the in-memory harness hands it over by reference and the tool permits it there", async () => {
    const row = ROWS.find(candidate => candidate.name === "accessor-bearing input")!;
    // The production channel: a JSON round trip turns the accessor into a plain data property.
    const wire = JSON.parse(JSON.stringify({ input: row.input() })) as { input: object };
    expect(Object.getOwnPropertyDescriptor(wire.input, "value")).toEqual({ value: "x", writable: true, enumerable: true, configurable: true });
    // Harness-only observation, not a production surface: by reference the getter is evaluated before the registry
    // sees the input, so the skipped cell would record a permit that the production channel cannot produce.
    expect(oracles.get(row.name)).toMatchObject({ permitted: false, category: "validation" });
    const harness = await claudeTool(row);
    expect(harness.permitted).toBe(true);
    expect(JSON.stringify(harness.recorded[0]?.input)).toBe('{"value":"x"}');
  });
});

describe("P4: discoverability stays independent of invocation", () => {
  it.each(SURFACES)("%s: a discover-only grant set is refused for invocation with the oracle's category", surface => {
    const row = ROWS.find(candidate => candidate.name === "discover and inspect grants never confer invoke")!;
    const out = outcomes.get(key(row, surface))!;
    expect(out.permitted).toBe(false);
    expect(out.category).toBe("authorization");
    expect(out.recorded).toHaveLength(0);
  });
});

describe("R673 (wb-csne): the suite hook runs under its file-local budget, and an overrun is a real red naming it", () => {
  it("the suite hook ran once under PARITY_SUITE_HOOK_BUDGET_MS, settled inside the budget, never on vitest's default hookTimeout", () => {
    const suite = HOOK_READINGS.filter(reading => reading.hook === PARITY_SUITE_HOOK);
    expect(suite.map(reading => `${reading.hook}|${reading.budgetMs}|${reading.outcome}`), "the guarded suite hook's readings").toEqual([`${PARITY_SUITE_HOOK}|${PARITY_SUITE_HOOK_BUDGET_MS}|settled`]);
    expect(suite[0]?.wallMs, "the suite hook's wall").toBeLessThanOrEqual(PARITY_SUITE_HOOK_BUDGET_MS);
  });

  it("the budget clears the owner floor and twice the worst wall of record, and vitest's own timer is a backstop past it", () => {
    expect(PARITY_SUITE_HOOK_BUDGET_MS, "the owner floor").toBeGreaterThanOrEqual(20_000);
    expect(WORST_MEASURED_HOOK_WALL_MS, "the worst wall of record: 11813 ms (landing 224 try-1, cmd_3998447f30df)").toBeGreaterThanOrEqual(11_813);
    expect(PARITY_SUITE_HOOK_BUDGET_MS, "more than 2 x the worst wall of record").toBeGreaterThan(2 * WORST_MEASURED_HOOK_WALL_MS);
    expect(PARITY_SUITE_HOOK_BACKSTOP_MS, "vitest's backstop sits past the budget").toBeGreaterThan(PARITY_SUITE_HOOK_BUDGET_MS);
  });

  it("an overrun is an AssertionError naming the budget, whether the body finishes late or is still running; a body inside its budget passes", async () => {
    const late = () =>
      withinHookBudget("probe late", "PROBE_BUDGET_MS", 20, () => {
        const until = performance.now() + 60;
        while (performance.now() < until) {
          /* busy wait: a body that finishes past its budget */
        }
      });
    const hung = () => withinHookBudget("probe hung", "PROBE_BUDGET_MS", 20, () => new Promise<void>(() => undefined));
    for (const [probe, name, still] of [
      [late, "probe late", ""],
      [hung, "probe hung", " and was still running"],
    ] as const) {
      const caught: unknown = await probe().then(
        () => undefined,
        (error: unknown) => error,
      );
      expect(caught, `${name}: an overrun fails the hook`).toBeInstanceOf(Error);
      expect((caught as Error).name, `${name}: a real red, never a timing marker`).toBe("AssertionError");
      expect((caught as Error).message, `${name}: the red names the budget`).toMatch(new RegExp(`^${name} ran \\d+ ms${still}, past its file-local budget PROBE_BUDGET_MS = 20 ms \\(R673\\)`));
      expect((caught as Error).message, `${name}: never a hook timeout`).not.toContain("timed out");
    }
    await expect(withinHookBudget("probe quick", "PROBE_BUDGET_MS", 5_000, () => undefined)).resolves.toBeUndefined();
  });

  it("a hook body's own error propagates unchanged through the guard", async () => {
    const own = new TypeError("the body's own failure");
    await expect(
      withinHookBudget("probe broken", "PROBE_BUDGET_MS", 5_000, () => {
        throw own;
      }),
    ).rejects.toBe(own);
  });
});

/**
 * R687 (wb-9rto, the wb-csne F1 class): the R673 rows above pin the budget and backstop CONSTANTS; the row below binds the
 * ARGUMENT the suite hook was actually registered with. vitest 4.1.10's beforeAll(fn, timeout = hookTimeout) wraps the hook
 * in a withTimeout timer of that timeout and stamps the same value on the hook it stores, under this key;
 * TestRunner.getSuiteHooks reads the stored hooks back, so the stamp is the runner's own record of the registered argument.
 * An omitted argument reads vitest's default hookTimeout (10000 ms) there, and so does an undefined one or a wrapper that
 * drops it; a swapped, shadowed or other-valued literal argument reads its own value. Each is a red below, where the gate's
 * omission probe of the registration left 105/105 green (wb-csne gate cmd_d14ebd6c549f, F1). A literal equal to the
 * backstop registers the same timeout, so it reads green here until the budget moves.
 */
const REGISTERED_HOOK_TIMEOUT = Symbol.for("VITEST_CLEANUP_TIMEOUT");

describe("R687 (wb-9rto): the suite hook is registered with its backstop, read from vitest's own record of the registration", () => {
  it("vitest holds one file-scope beforeAll, registered with PARITY_SUITE_HOOK_BACKSTOP_MS (2 x the budget), never its default hookTimeout", ({ task }) => {
    const registered = TestRunner.getSuiteHooks(task.file).beforeAll.map((hook): unknown => Reflect.get(hook, REGISTERED_HOOK_TIMEOUT));
    expect(registered, "the timeout vitest registered for each file-scope beforeAll of this file").toEqual([PARITY_SUITE_HOOK_BACKSTOP_MS]);
    expect(PARITY_SUITE_HOOK_BACKSTOP_MS, "the backstop of record is 2 x the budget").toBe(2 * PARITY_SUITE_HOOK_BUDGET_MS);
  });
});

/**
 * R692 (wb-ouo3, the wb-9rto F1/F5 class): the R687 row above reads the stamp of the FILE-SCOPE beforeAll, which binds a
 * position, not what the hook guards. The gate's L2-P1 decoy (the guarded hook moved into a describe with no timeout and a
 * no-op file-scope beforeAll planted holding the backstop) left that row and every other row green, and so did a
 * describe-scoped unbudgeted beforeAll (F5, L2-P8). The rows below bind what vitest holds and what each held hook guards,
 * wherever it sits:
 * - the walk reads TestRunner.getSuiteHooks for EVERY suite of this file, never file scope alone, and the suites it reaches
 *   must be exactly the describe calls in this file's AST (an anchor outside the walk);
 * - the held-hook census lists every hook vitest holds as its suite, its registrar and the timeout vitest stamped on it.
 *   vitest 4.1.10 also keeps the stack of each beforeAll / beforeEach / aroundAll / aroundEach registration call on the
 *   hook it stores, source-mapped to this file's line and column, so the census resolves each such hook to its
 *   registration in this file's AST and names the hook that registration's callback guards (in its own code, not in a
 *   nested function) and the timeout argument as written. An afterAll / afterEach carries neither a stamp nor a site, and
 *   the census says so: cut #1 bound it by the literal list alone, so this file's cleanup afterAll replaced by the
 *   runner's own on("afterAll") beside its registration dead-coded under an if read 111/111 green (P-DEADWRAP-AFTER,
 *   measured by the respin on the cut #1 bytes) - the respin rows below bind it;
 * - the guard census lists every direct call of withinHookBudget in this file with the hook registration or case whose
 *   callback makes it, so a second guard of the suite hook (a dead-branch decoy beside a relocated body, or a copy carried
 *   by a case, a describe callback or module code) is a red, and withinHookBudget named any other way (an alias, a member,
 *   an argument, a shadowing binding) is a finding, so no call escapes the census;
 * - the work binding places every write of the matrix the rows read (oracles / outcomes, anything but a .get read) in the
 *   body the PARITY_SUITE_HOOK guard runs, so a guarded no-op body beside a matrix built outside every hook is a red.
 * Each reading is syntactic where it reads the source: a same-value literal timeout or a guard reached through a helper
 * function reads red here (fail-closed), never green.
 * The respin (wb-ouo3 refusal #1, the U1 class: every hook vitest holds, in any suite, binds to a registration that RUNS,
 * and every reading the R673 rows count is written inside withinHookBudget) adds five rows, as in the docs06 census:
 * - the executing-registration rule (in hookSource, so every row that asserts its findings reads it): every registration
 *   and describe call the AST reads is a statement of its own at file scope or in the own body of a plain inline describe
 *   callback whose own code neither returns nor throws, and every guard call of a registration is a statement of its own,
 *   the return value or the concise body of the registration callback; a dead or conditional form is a finding;
 * - the held-hook census bound to the AST: every hook vitest holds is one registration the AST reads in its suite (an
 *   afterAll / afterEach by count), each of which runs by the rule above;
 * - the readings binding: every reference to HOOK_READINGS is the push in withinHookBudget's own body or a read by an R673
 *   row, and no other declaration of the name (a shadow a row could read) exists;
 * - the runtime-handle binding: vitest is imported by name from "vitest" alone, nothing is loaded at run time, and
 *   TestRunner (the runner's own registrar and record of held hooks) is read only by the census rows' getSuiteHooks and
 *   declared nowhere else;
 * - named residual, with its pinned quiet row: run-time code built from strings and the globals that reach a module loader
 *   or vitest's worker state are beyond any reading of source syntax; this file names none of them, and the quiet row reds
 *   the moment one is written as an identifier, a member name or a string key (a name built from parts at run time - a
 *   computed key - is read as nothing: the disclosed edge of the quiet row, not claimed). The second respin (wb-ouo3
 *   refusal #2) adds global to the list: Node's alias of globalThis, through which vitest's worker and matcher state are
 *   reachable too.
 */
const SELF = fileURLToPath(import.meta.url);
const HOOK_REGISTRARS: readonly string[] = ["beforeAll", "afterAll", "beforeEach", "afterEach", "aroundAll", "aroundEach"];
/** The key vitest stamps a beforeAll's or beforeEach's registration stack under (its timeout: REGISTERED_HOOK_TIMEOUT). */
const REGISTRATION_STACK = Symbol.for("VITEST_CLEANUP_STACK_TRACE");
/** The keys vitest stamps an aroundAll's or aroundEach's resolved timeout and registration stack under. */
const AROUND_TIMEOUT = Symbol.for("VITEST_AROUND_TIMEOUT");
const AROUND_STACK = Symbol.for("VITEST_AROUND_STACK_TRACE");
const R673_SUITE = "R673 (wb-csne): the suite hook runs under its file-local budget, and an overrun is a real red naming it";

/** A hook registration in a source: a direct call of one of vitest's own named hook imports. */
interface SourceRegistration {
  readonly registrar: string;
  /** The titles of the describe calls around the registration, outermost first; "(file scope)" for none. */
  readonly chain: string;
  /** Where the registration call starts, as line:column (1-based): the site vitest's registration stack names. */
  readonly at: string;
  /** The first argument of each withinHookBudget call in the callback's own code (not a nested function), as written; "nothing" for none. */
  readonly guards: string;
  /** The timeout argument as written; "(none)" when the registration passes none and vitest applies its default hookTimeout. */
  readonly timeout: string;
}
interface HookSource {
  /** Every describe call, as its chain of titles, outermost first, in source order. */
  readonly describes: readonly string[];
  readonly registrations: readonly SourceRegistration[];
  /** Every direct call of withinHookBudget as "<first argument> | <the hook registration or case whose callback makes it>". */
  readonly guards: readonly string[];
  /** Every way withinHookBudget or a hook registrar is reached other than a direct call of the binding it must resolve to, and (R692 respin) every registration, describe call or registration guard call that might not run. */
  readonly findings: readonly string[];
  /** R692 respin (wb-ouo3 U1): every reference to a watched binding - never its file-scope declaration of record, an import specifier, a member or key name or a type position - as "<reference> | <where it runs>", and every other declaration of the name (a shadow a row could read) as "<name> declared in a <construct> | <where>". */
  readonly references: readonly string[];
}

/**
 * Reads one source through the TypeScript binder (a single-file program: no lib, no module resolution): its describe calls,
 * its hook registrations, its withinHookBudget calls with the registration or case each runs in, and its findings.
 */
function hookSource(file: string, text: string, watched: readonly string[] = []): HookSource {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const host: ts.CompilerHost = {
    getSourceFile: name => (name === file ? sf : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => undefined,
    getCurrentDirectory: () => "/",
    getCanonicalFileName: name => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: name => name === file,
    readFile: name => (name === file ? text : undefined),
  };
  const checker = ts.createProgram({ rootNames: [file], options: { noLib: true, noResolve: true, types: [], target: ts.ScriptTarget.Latest, module: ts.ModuleKind.ESNext }, host }).getTypeChecker();
  const at = (node: ts.Node): string => {
    const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
    return `${line + 1}:${character + 1}`;
  };
  const declaration = (id: ts.Identifier): ts.Declaration | undefined => {
    const declarations = checker.getSymbolAtLocation(id)?.declarations ?? [];
    return declarations.length === 1 ? declarations[0] : undefined;
  };
  const viaVitest = (id: ts.Identifier): boolean => {
    const bound = declaration(id);
    if (bound === undefined || !ts.isImportSpecifier(bound) || bound.propertyName !== undefined) return false;
    const statement = bound.parent.parent.parent;
    return ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === "vitest";
  };
  const rootOf = (callee: ts.Expression): ts.Expression => (ts.isCallExpression(callee) || ts.isPropertyAccessExpression(callee) ? rootOf(callee.expression) : callee);
  /** What a call registers through vitest's own named import: a hook (its registrar), "a case" or "a describe callback"; undefined for anything else. */
  const kindOf = (call: ts.CallExpression): string | undefined => {
    const callee = call.expression;
    if (ts.isIdentifier(callee) && HOOK_REGISTRARS.includes(callee.text)) return viaVitest(callee) ? callee.text : undefined;
    if (ts.isIdentifier(callee) && callee.text === "describe") return viaVitest(callee) ? "a describe callback" : undefined;
    const root = rootOf(callee);
    return ts.isIdentifier(root) && (root.text === "it" || root.text === "test") && viaVitest(root) ? "a case" : undefined;
  };
  const titleOf = (call: ts.CallExpression): string => {
    const title = call.arguments[0];
    return title !== undefined && ts.isStringLiteralLike(title) ? title.text : `(a non-literal title at ${at(call)})`;
  };
  const chainOf = (node: ts.Node): string => {
    const titles: string[] = [];
    for (let up = node.parent; up !== undefined; up = up.parent) if (ts.isCallExpression(up) && kindOf(up) === "a describe callback") titles.unshift(titleOf(up));
    return titles.join(" > ") || "(file scope)";
  };
  /** A describe call's own chain: the describes around it, then its own title. */
  const ownChain = (call: ts.CallExpression): string => (chainOf(call) === "(file scope)" ? titleOf(call) : `${chainOf(call)} > ${titleOf(call)}`);
  const isGuardCall = (node: ts.Node): node is ts.CallExpression => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "withinHookBudget";
  const ownGuards = (callback: ts.Node | undefined): string => {
    const found: string[] = [];
    const find = (node: ts.Node): void => {
      if (isGuardCall(node)) found.push(node.arguments[0]?.getText(sf) ?? "(no argument)");
      if (!ts.isFunctionLike(node)) ts.forEachChild(node, find);
    };
    if (callback !== undefined && ts.isFunctionLike(callback)) ts.forEachChild(callback, find);
    return found.join(", ") || "nothing";
  };
  /** The hook registration or case whose callback runs a call (or any node), and whether it is that callback's own code. */
  const siteOf = (call: ts.Node): string => {
    let innermost: ts.Node | undefined;
    let child: ts.Node = call;
    for (let node = call.parent; node !== undefined; child = node, node = node.parent) {
      if (ts.isCallExpression(node) && node.arguments.some(argument => argument === child)) {
        const kind = kindOf(node);
        if (kind !== undefined) return `${kind} @ ${kind === "a describe callback" ? ownChain(node) : chainOf(node)}${innermost === child ? "" : ", in a nested function"}`;
      }
      if (innermost === undefined && ts.isFunctionLike(node)) innermost = node;
    }
    return innermost === undefined ? "module code" : `a function outside every hook and case (${at(innermost)})`;
  };
  // R692 respin (wb-ouo3 U1, the executing-registration rule, as in the docs06 census): every registration, describe call
  // and registration guard call this reader reads must RUN - whenever its suite is collected, or whenever its hook runs - or
  // it is a finding. vitest keeps no stamp and no site on an afterAll / afterEach, so the held-hook census binds such a hook
  // by count alone, and a dead-coded or conditional registration beside a hook registered some way this reader cannot read
  // (the cleanup afterAll of this file, replaced under an if beside the runner's own on("afterAll"), read 111/111 green on
  // the cut #1 bytes) would keep that count. A registration or a describe call is a statement of its own at file scope or in
  // the own body of a plain inline describe callback (a literal title, a non-async, non-generator function) whose own code
  // neither returns nor throws; a guard call is a statement of its own (under at most one await), the return value or the
  // concise body of the registration callback, whose own code neither returns before it nor throws.
  /** The return and throw statements of a function's own code (never a nested function's). */
  const exitsOf = (fn: ts.ArrowFunction | ts.FunctionExpression): ts.Statement[] => {
    const out: ts.Statement[] = [];
    const find = (node: ts.Node): void => {
      if (ts.isReturnStatement(node) || ts.isThrowStatement(node)) out.push(node);
      if (!ts.isFunctionLike(node)) ts.forEachChild(node, find);
    };
    ts.forEachChild(fn.body, find);
    return out;
  };
  const exitText = (exit: ts.Statement): string => `${ts.isReturnStatement(exit) ? "returns" : "throws"} at ${at(exit)}`;
  /** The construct a statement sits in, named by the owner of its block for a block. */
  const holderKind = (statement: ts.Node): string => ts.SyntaxKind[(ts.isBlock(statement.parent) ? statement.parent.parent : statement.parent).kind];
  const isInline = (node: ts.Node | undefined): node is ts.ArrowFunction | ts.FunctionExpression => node !== undefined && (ts.isArrowFunction(node) || ts.isFunctionExpression(node));
  const isPlain = (fn: ts.ArrowFunction | ts.FunctionExpression): boolean => !(ts.getModifiers(fn) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword) && !(ts.isFunctionExpression(fn) && fn.asteriskToken !== undefined);
  /** Why a hook registration or describe call would not run whenever its suite is collected; undefined when it would. */
  function whyNotRun(call: ts.CallExpression): string | undefined {
    const statement = call.parent;
    if (!ts.isExpressionStatement(statement) || statement.expression !== call) return `the call is not a statement of its own (it sits in a ${ts.SyntaxKind[statement.kind]})`;
    if (statement.parent === sf) return undefined;
    const callback = ts.isBlock(statement.parent) ? statement.parent.parent : undefined;
    const owner = callback?.parent;
    if (callback === undefined || owner === undefined || !ts.isCallExpression(owner) || kindOf(owner) !== "a describe callback" || !owner.arguments.some(argument => argument === callback)) return `its statement sits in a ${holderKind(statement)}, neither file scope nor a describe callback's own body`;
    const why = whyDescribeNotRun(owner);
    return why === undefined ? undefined : `its describe at ${at(owner)} does not run its callback: ${why}`;
  }
  /** Why a describe call would not run its callback as a suite of this file; undefined when it would. */
  function whyDescribeNotRun(call: ts.CallExpression): string | undefined {
    const [title, callback] = call.arguments;
    if (call.arguments.length !== 2 || title === undefined || !ts.isStringLiteralLike(title) || !isInline(callback) || !isPlain(callback)) return "it is not describe(<a literal title>, <a plain inline function>)";
    const exit = exitsOf(callback)[0];
    if (exit !== undefined) return `its callback ${exitText(exit)}`;
    return whyNotRun(call);
  }
  /** Why a withinHookBudget call in a registration's callback would not run whenever the hook runs; undefined when it would. */
  const whyGuardNotRun = (call: ts.CallExpression, callback: ts.Expression | undefined): string | undefined => {
    if (!isInline(callback)) return "the registration's callback is no inline function";
    const expression: ts.Expression = ts.isAwaitExpression(call.parent) && call.parent.expression === call ? call.parent : call;
    const holder = expression.parent;
    if (holder === callback) return undefined;
    if (!(ts.isExpressionStatement(holder) || ts.isReturnStatement(holder)) || holder.expression !== expression) return `the call is not a statement of its own (it sits in a ${ts.SyntaxKind[holder.kind]})`;
    if (holder.parent !== callback.body) return `its statement sits in a ${holderKind(holder)}, not the callback's own body`;
    const exit = exitsOf(callback).find(statement => statement !== holder);
    return exit === undefined ? undefined : `the callback ${exitText(exit)}`;
  };
  const guardCallsIn = (callback: ts.Node | undefined): ts.CallExpression[] => {
    const out: ts.CallExpression[] = [];
    const find = (node: ts.Node): void => {
      if (isGuardCall(node)) out.push(node);
      ts.forEachChild(node, find);
    };
    if (callback !== undefined) find(callback);
    return out;
  };
  /** Whether an identifier refers to a binding: never a declaration's name, an import specifier, a member or key name, or a type position. */
  const isReference = (id: ts.Identifier): boolean => {
    const parent = id.parent;
    if ((ts.isVariableDeclaration(parent) || ts.isFunctionDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent)) && parent.name === id) return false;
    if (ts.isImportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
    if ((ts.isPropertyAccessExpression(parent) || ts.isPropertyAssignment(parent)) && parent.name === id) return false;
    for (let up: ts.Node = parent; !ts.isSourceFile(up); up = up.parent) if (ts.isTypeNode(up)) return false;
    return true;
  };
  /** Where a node runs: withinHookBudget's own body, the body a guard runs, or the registration, case, describe callback or module code that holds it. */
  const placeOf = (node: ts.Node): string => {
    let child: ts.Node = node;
    for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
      if (ts.isFunctionDeclaration(up) && up.name?.text === "withinHookBudget" && up.parent === sf) return "withinHookBudget's own body";
      if (isGuardCall(up) && up.arguments[3] === child) return `the body the ${up.arguments[0]?.getText(sf) ?? "(no argument)"} guard runs`;
    }
    return siteOf(node);
  };
  /** The construct declaring a watched name anywhere but its file-scope declaration of record (a file-scope const, function or import): a shadow; undefined for none. */
  const shadowOf = (id: ts.Identifier): string | undefined => {
    const parent = id.parent;
    const named = (ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent) || ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent) || ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) && parent.name === id;
    if (!named) return undefined;
    const ofRecord = (ts.isVariableDeclaration(parent) && ts.isVariableDeclarationList(parent.parent) && ts.isVariableStatement(parent.parent.parent) && parent.parent.parent.parent === sf) || (ts.isFunctionDeclaration(parent) && parent.parent === sf);
    return ofRecord ? undefined : ts.SyntaxKind[parent.kind];
  };
  const references: string[] = [];
  const describes: string[] = [];
  const registrations: SourceRegistration[] = [];
  const guards: string[] = [];
  const findings: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const kind = kindOf(node);
      if (kind === "a describe callback") {
        describes.push(ownChain(node));
        const why = whyDescribeNotRun(node);
        if (why !== undefined) findings.push(`${at(node)}: describe does not run its callback whenever this file is collected: ${why}`);
      } else if (kind !== undefined && kind !== "a case") {
        registrations.push({ registrar: kind, chain: chainOf(node), at: at(node), guards: ownGuards(node.arguments[0]), timeout: node.arguments[1]?.getText(sf) ?? "(none)" });
        const why = whyNotRun(node);
        if (why !== undefined) findings.push(`${at(node)}: ${kind} does not run whenever its suite is collected: ${why}`);
        for (const guard of guardCallsIn(node.arguments[0])) {
          const guardWhy = whyGuardNotRun(guard, node.arguments[0]);
          if (guardWhy !== undefined) findings.push(`${at(guard)}: the withinHookBudget call guarding ${guard.arguments[0]?.getText(sf) ?? "(no argument)"} does not run whenever its ${kind} runs: ${guardWhy}`);
        }
      } else if (kind === undefined && ts.isIdentifier(node.expression) && HOOK_REGISTRARS.includes(node.expression.text)) {
        findings.push(`${at(node)}: ${node.expression.text} is called, but not through vitest's own named import`);
      }
      if (ts.isIdentifier(node.expression) && node.expression.text === "withinHookBudget") {
        const bound = declaration(node.expression);
        if (bound === undefined || !ts.isFunctionDeclaration(bound) || bound.parent !== sf) findings.push(`${at(node)}: withinHookBudget is called, but binds no file-scope function declaration`);
        guards.push(`${node.arguments[0]?.getText(sf) ?? "(no argument)"} | ${siteOf(node)}`);
      }
    } else if (ts.isIdentifier(node) && node.text === "withinHookBudget") {
      const called = ts.isCallExpression(node.parent) && node.parent.expression === node;
      const declared = ts.isFunctionDeclaration(node.parent) && node.parent.name === node;
      if (!called && !declared) findings.push(`${at(node)}: withinHookBudget is named in a ${ts.SyntaxKind[node.parent.kind]}, never called directly`);
    }
    if (ts.isIdentifier(node) && watched.includes(node.text)) {
      const shadow = shadowOf(node);
      const member = ts.isPropertyAccessExpression(node.parent) && node.parent.expression === node ? node.parent.name.text : undefined;
      if (shadow !== undefined) references.push(`${node.text} declared in a ${shadow} | ${placeOf(node)}`);
      else if (isReference(node)) references.push(`${member === undefined ? `${node.text} in a ${ts.SyntaxKind[node.parent.kind]}` : `${node.text}.${member}`} | ${placeOf(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { describes, registrations, guards, findings, references };
}

/** Every suite of a file: the file first, then each describe depth-first in collection order, as its chain of titles. */
function suitesOf(file: RunnerTestFile): { readonly chain: string; readonly suite: RunnerTestFile | RunnerTestSuite }[] {
  const out: { chain: string; suite: RunnerTestFile | RunnerTestSuite }[] = [{ chain: "(file scope)", suite: file }];
  const walk = (tasks: readonly RunnerTask[], titles: readonly string[]): void => {
    for (const child of tasks) {
      if (child.type !== "suite") continue;
      out.push({ chain: [...titles, child.name].join(" > "), suite: child });
      walk(child.tasks, [...titles, child.name]);
    }
  };
  walk(file.tasks, []);
  return out;
}

/** The line of a registration stack vitest stamped, resolved to this file's line:column; undefined when none names this file. */
const stackSite = (stamped: unknown): string | undefined => {
  const frame = (stamped instanceof Error ? (stamped.stack ?? "") : "").split("\n").find(line => line.includes(`${SELF}:`));
  const position = frame?.match(/:(\d+):(\d+)\)?$/);
  return position === undefined || position === null ? undefined : `${position[1]}:${position[2]}`;
};

/** One hook vitest holds, as the held-hook census reads it: suite | registrar | stamped timeout | what its registration guards. */
const heldLine = (chain: string, registrar: string, hook: object, registrations: readonly SourceRegistration[]): string => {
  const keys = registrar.startsWith("before") ? { timeout: REGISTERED_HOOK_TIMEOUT, stack: REGISTRATION_STACK } : registrar.startsWith("around") ? { timeout: AROUND_TIMEOUT, stack: AROUND_STACK } : undefined;
  if (keys === undefined) return `${chain} | ${registrar} | no stamp and no registration site (vitest keeps neither on it)`;
  const site = stackSite(Reflect.get(hook, keys.stack));
  const registration = registrations.find(entry => entry.at === site && entry.registrar === registrar && entry.chain === chain);
  const source = registration === undefined ? `its registration site ${site ?? "(none)"} is no ${registrar} of this suite in this file` : `registered guarding ${registration.guards}, timeout ${registration.timeout}`;
  return `${chain} | ${registrar} | stamped ${String(Reflect.get(hook, keys.timeout))} | ${source}`;
};

/**
 * The work a guard runs: every reference to the named state in a source - but its declaration and the member reads the
 * rows make - with the withinHookBudget body that holds it ("outside every guard's body" for none). The suite hook
 * exists to build the matrix the rows read inside its budget, so a guarded no-op body beside a matrix built elsewhere
 * (module code, a case, an unguarded hook, a helper) keeps the hook, its stamp and its guard call standing, and reads
 * red here.
 */
function guardedWork(file: string, text: string, names: readonly string[], reads: readonly string[]): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const bodyOf = (node: ts.Node): string => {
    let child: ts.Node = node;
    for (let up = node.parent; up !== undefined; child = up, up = up.parent) {
      if (ts.isCallExpression(up) && ts.isIdentifier(up.expression) && up.expression.text === "withinHookBudget" && up.arguments[3] === child) return `in the body the ${up.arguments[0]?.getText(sf) ?? "(no argument)"} guard runs`;
    }
    return "outside every guard's body";
  };
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && names.includes(node.text)) {
      const parent = node.parent;
      const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : undefined;
      const declared = ts.isVariableDeclaration(parent) && parent.name === node;
      if (!declared && (member === undefined || !reads.includes(member))) out.push(`${member === undefined ? `${node.text} in a ${ts.SyntaxKind[parent.kind]}` : `${node.text}.${member}`} | ${bodyOf(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/**
 * R692 respin (wb-ouo3 U1): every import from the vitest family (vitest, vitest/*, @vitest/*) as "<module> | <what it
 * binds>", and every module a source loads at run time (import(), require(), import x = require()), as written. The one
 * named import from "vitest" is the only way this file reaches vitest: a namespace import would reach any export through
 * a computed key, and vitest/suite or @vitest/runner hold the runner's own registrar and its record of held hooks.
 */
function vitestImports(file: string, text: string): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && /^(vitest(\/|$)|@vitest\/)/.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      const bound: string[] = [];
      if (clause?.name !== undefined) bound.push(`default as ${clause.name.text}`);
      const bindings = clause?.namedBindings;
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) bound.push(`* as ${bindings.name.text}`);
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) bound.push(`${element.isTypeOnly ? "type " : ""}${element.propertyName === undefined ? element.name.text : `${element.propertyName.getText(sf)} as ${element.name.text}`}`);
      }
      out.push(`${node.moduleSpecifier.text} | ${clause?.isTypeOnly === true ? "type " : ""}${bound.join(", ") || "(nothing bound)"}`);
    } else if (ts.isImportEqualsDeclaration(node) || (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require")))) {
      out.push(`${node.getText(sf)} | loaded at run time`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/**
 * R692 respin (wb-ouo3, the named residual of the U1 class): run-time code built from strings, and the globals that reach a
 * module loader or vitest's worker state, are beyond any reading of source syntax - a census reads what a file says, not
 * what a string evaluates to. This file names none of them; namedAnywhere lists every identifier, member name or
 * string-literal element key that spells one, so the quiet row below reds the moment one is written.
 */
const RUNTIME_ESCAPES: readonly string[] = ["eval", "Function", "constructor", "globalThis", "global", "process", "require", "__vitest_worker__", "getBuiltinModule", "createRequire"];
function namedAnywhere(file: string, text: string, names: readonly string[]): readonly string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    const keyed = ts.isStringLiteralLike(node) && ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
    if ((ts.isIdentifier(node) || keyed) && names.includes(node.text)) {
      const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
      out.push(`${node.text} at ${line + 1}:${character + 1}${keyed ? " (a string key)" : ""}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}
const R687_SUITE = "R687 (wb-9rto): the suite hook is registered with its backstop, read from vitest's own record of the registration";
const R692_SUITE = "R692 (wb-ouo3): the held-hook census - every suite walked through vitest's record, and what each held hook guards";
const byText = (a: string, b: string): number => a.localeCompare(b);

describe("R692 (wb-ouo3): the held-hook census - every suite walked through vitest's record, and what each held hook guards", () => {
  it("the walk reaches every suite of this file: the suites vitest collected are exactly the describe calls in this file's AST", ({ task }) => {
    const source = hookSource(SELF, readFileSync(SELF, "utf8"));
    expect(source.findings, "withinHookBudget or a hook registrar reached any way but a direct call of its own binding").toEqual([]);
    expect(
      suitesOf(task.file).map(entry => entry.chain),
      "the suites the walk reaches, file scope first",
    ).toEqual(["(file scope)", ...source.describes]);
    expect(source.describes.length, "the describe calls of this file").toBeGreaterThanOrEqual(10);
  });

  it("the held-hook census: every hook vitest holds in any suite of this file, its stamped timeout and what its registration guards, is the literal list", ({ task }) => {
    const source = hookSource(SELF, readFileSync(SELF, "utf8"));
    const census: string[] = [];
    let walked = 0;
    for (const { chain, suite } of suitesOf(task.file)) {
      walked += 1;
      for (const [registrar, listeners] of Object.entries(TestRunner.getSuiteHooks(suite))) for (const hook of listeners) census.push(heldLine(chain, registrar, hook, source.registrations));
    }
    expect(walked, "the census read vitest's record of every suite the AST holds, never file scope alone").toBe(source.describes.length + 1);
    expect(census, "suite | registrar | stamped timeout | what the registration guards, for every hook vitest holds").toEqual([
      `(file scope) | beforeAll | stamped ${PARITY_SUITE_HOOK_BACKSTOP_MS} | registered guarding PARITY_SUITE_HOOK, timeout PARITY_SUITE_HOOK_BACKSTOP_MS`,
      "(file scope) | afterAll | no stamp and no registration site (vitest keeps neither on it)",
    ]);
  });

  it("the guard census: every direct call of withinHookBudget in this file, with the registration or case whose callback makes it, is the literal list", () => {
    const source = hookSource(SELF, readFileSync(SELF, "utf8"));
    expect(source.findings, "withinHookBudget or a hook registrar reached any way but a direct call of its own binding").toEqual([]);
    expect(source.guards, "first argument | the hook registration or case that runs the call").toEqual([
      "PARITY_SUITE_HOOK | beforeAll @ (file scope)",
      `"probe late" | a case @ ${R673_SUITE}, in a nested function`,
      `"probe hung" | a case @ ${R673_SUITE}, in a nested function`,
      `"probe quick" | a case @ ${R673_SUITE}`,
      `"probe broken" | a case @ ${R673_SUITE}`,
    ]);
  });

  it("the work the guard runs: every write of the matrix the rows read sits in the body the PARITY_SUITE_HOOK guard runs, and the reader is no constant", () => {
    expect(guardedWork(SELF, readFileSync(SELF, "utf8"), ["oracles", "outcomes"], ["get"]), "every reference to oracles / outcomes but a .get read, with the guard body that holds it").toEqual([
      "oracles.set | in the body the PARITY_SUITE_HOOK guard runs",
      "outcomes.set | in the body the PARITY_SUITE_HOOK guard runs",
    ]);
    const hollow = [
      'beforeAll(() => withinHookBudget(HOOK, "B", 1, async () => undefined), BACKSTOP);',
      "for (const row of ROWS) oracles.set(row.name, row);",
      "const alias = outcomes;",
      'it("c", () => withinHookBudget(HOOK, "B", 1, () => outcomes.clear()));',
    ].join("\n");
    expect(guardedWork("hollow.ts", hollow, ["oracles", "outcomes"], ["get"])).toEqual([
      "oracles.set | outside every guard's body",
      "outcomes in a VariableDeclaration | outside every guard's body",
      "outcomes.clear | in the body the HOOK guard runs",
    ]);
  });

  it("the reader is no constant: a relocated guard, a guard outside every hook and a guard reached any other way each read as they stand", () => {
    const relocated = hookSource(
      "relocated.ts",
      [
        'import { beforeAll, describe, it } from "vitest";',
        "beforeAll(() => undefined, BACKSTOP);",
        'describe("d", () => {',
        "  beforeAll(async () => {",
        '    await withinHookBudget(HOOK, "B", 1, () => undefined);',
        "  });",
        '  it("c", () => undefined);',
        "});",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(relocated.registrations.map(entry => `${entry.registrar} @ ${entry.chain} :${entry.at} | guards ${entry.guards} | timeout ${entry.timeout}`)).toEqual([
      "beforeAll @ (file scope) :2:1 | guards nothing | timeout BACKSTOP",
      "beforeAll @ d :4:3 | guards HOOK | timeout (none)",
    ]);
    expect(relocated.guards).toEqual(["HOOK | beforeAll @ d"]);
    expect(relocated.findings).toEqual([]);
    const outside = hookSource(
      "outside.ts",
      [
        'import { beforeAll, describe, it } from "vitest";',
        "beforeAll(() => {",
        "  if (Number.NaN > 0) withinHookBudget(HOOK);",
        "}, BACKSTOP);",
        "await withinHookBudget(HOOK);",
        'describe("d", () => {',
        "  withinHookBudget(HOOK);",
        '  it("c", async () => {',
        "    await withinHookBudget(HOOK);",
        "  });",
        "});",
        "const later = () => withinHookBudget(HOOK);",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(outside.guards).toEqual([
      "HOOK | beforeAll @ (file scope)",
      "HOOK | module code",
      "HOOK | a describe callback @ d",
      "HOOK | a case @ d",
      "HOOK | a function outside every hook and case (12:15)",
    ]);
    const named = hookSource(
      "named.ts",
      [
        'import { describe } from "vitest";',
        "const run = withinHookBudget;",
        "withinHookBudget.call(undefined, HOOK);",
        "Reflect.apply(withinHookBudget, undefined, [HOOK]);",
        "{",
        "  const beforeAll = (fn: () => void): void => fn();",
        "  beforeAll(() => withinHookBudget(HOOK));",
        "}",
        'describe("d", () => {',
        "  const withinHookBudget = (): void => undefined;",
        "  withinHookBudget(HOOK);",
        "});",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(named.findings).toEqual([
      "2:13: withinHookBudget is named in a VariableDeclaration, never called directly",
      "3:1: withinHookBudget is named in a PropertyAccessExpression, never called directly",
      "4:15: withinHookBudget is named in a CallExpression, never called directly",
      "7:3: beforeAll is called, but not through vitest's own named import",
      "10:9: withinHookBudget is named in a VariableDeclaration, never called directly",
      "11:3: withinHookBudget is called, but binds no file-scope function declaration",
    ]);
    expect(named.guards).toEqual(["HOOK | a function outside every hook and case (7:13)", "HOOK | a describe callback @ d"]);
  });

  it("the executing-registration rule (U1): every registration and describe call this file's AST reads runs whenever its suite is collected, and every guard call of a registration runs whenever its hook runs", () => {
    expect(hookSource(SELF, readFileSync(SELF, "utf8")).findings, "a registration, describe call or guard call of this file that might not run, or any other finding").toEqual([]);
    const read = hookSource(
      "executing.ts",
      [
        'import { afterAll, beforeAll, describe, it } from "vitest";',
        "beforeAll(async () => {",
        '  await withinHookBudget(HOOK, "B", 1, async () => undefined);',
        "}, BACKSTOP);",
        "if (BUDGET < 0) afterAll(async () => undefined);",
        "const later = () => afterAll(async () => undefined);",
        "beforeAll(async () => {",
        '  if (BUDGET < 0) await withinHookBudget(HOOK, "B", 1, async () => undefined);',
        "}, BACKSTOP);",
        'describe("early", () => {',
        "  if (BUDGET > 0) return;",
        "  afterAll(() => undefined);",
        "});",
        'describe("d", async () => {',
        "  afterAll(() => undefined);",
        "});",
        "function withinHookBudget(): void {}",
      ].join("\n"),
    );
    expect(read.findings, "each dead, conditional or unreached registration, describe call and guard call, as it stands; the live registration and guard at :2-:3 read none").toEqual([
      "5:17: afterAll does not run whenever its suite is collected: its statement sits in a IfStatement, neither file scope nor a describe callback's own body",
      "6:21: afterAll does not run whenever its suite is collected: the call is not a statement of its own (it sits in a ArrowFunction)",
      "8:25: the withinHookBudget call guarding HOOK does not run whenever its beforeAll runs: its statement sits in a IfStatement, not the callback's own body",
      "10:1: describe does not run its callback whenever this file is collected: its callback returns at 11:19",
      "12:3: afterAll does not run whenever its suite is collected: its describe at 10:1 does not run its callback: its callback returns at 11:19",
      "14:1: describe does not run its callback whenever this file is collected: it is not describe(<a literal title>, <a plain inline function>)",
      "15:3: afterAll does not run whenever its suite is collected: its describe at 14:1 does not run its callback: it is not describe(<a literal title>, <a plain inline function>)",
    ]);
  });

  it("the held-hook census is bound to the AST (U1): every hook vitest holds in any suite of this file is one registration the AST reads in that suite, an afterAll / afterEach by count", ({ task }) => {
    const source = hookSource(SELF, readFileSync(SELF, "utf8"));
    const held: string[] = [];
    for (const { chain, suite } of suitesOf(task.file)) for (const [registrar, listeners] of Object.entries(TestRunner.getSuiteHooks(suite))) held.push(...Array.from(listeners, () => `${chain} | ${registrar}`));
    expect([...held].sort(byText), "suite | registrar for every hook vitest holds, against every registration the AST reads (each of which runs: the row above)").toEqual(source.registrations.map(entry => `${entry.chain} | ${entry.registrar}`).sort(byText));
    expect(held, "the hooks of record").toEqual(["(file scope) | beforeAll", "(file scope) | afterAll"]);
  });

  it("the readings binding (U1): every reference to HOOK_READINGS is the push in withinHookBudget's own body or a read by an R673 row, and nothing else declares the name, so no reading the R673 rows count is written outside the guard", () => {
    expect(hookSource(SELF, readFileSync(SELF, "utf8"), ["HOOK_READINGS"]).references, "every reference to HOOK_READINGS, with where it runs").toEqual([
      "HOOK_READINGS.push | withinHookBudget's own body",
      `HOOK_READINGS.filter | a case @ ${R673_SUITE}`,
    ]);
    const forged = hookSource(
      "forged.ts",
      [
        'import { afterAll, describe, it } from "vitest";',
        "HOOK_READINGS.push(FORGED);",
        'describe("d", () => {',
        "  afterAll(() => {",
        "    HOOK_READINGS.push(FORGED);",
        "  });",
        "  const alias = HOOK_READINGS;",
        '  it("c", () => withinHookBudget(HOOK, "B", 1, () => HOOK_READINGS.splice(0)));',
        '  it("r", () => {',
        "    const HOOK_READINGS = [FORGED];",
        "    return HOOK_READINGS.filter(reading => reading);",
        "  });",
        "});",
        "function withinHookBudget(): void {",
        "  HOOK_READINGS.push(READING);",
        "}",
      ].join("\n"),
      ["HOOK_READINGS"],
    );
    expect(forged.references, "a reading planted in module code or a hook, an alias, a write in a guarded body and a shadow a row reads each read as they stand").toEqual([
      "HOOK_READINGS.push | module code",
      "HOOK_READINGS.push | afterAll @ d",
      "HOOK_READINGS in a VariableDeclaration | a describe callback @ d",
      "HOOK_READINGS.splice | the body the HOOK guard runs",
      "HOOK_READINGS declared in a VariableDeclaration | a case @ d",
      "HOOK_READINGS.filter | a case @ d",
      "HOOK_READINGS.push | withinHookBudget's own body",
    ]);
  });

  it("the runtime-handle binding (U1): vitest is imported by name from \"vitest\" alone, nothing is loaded at run time, and TestRunner is read only by the R687 / R692 census rows' getSuiteHooks", () => {
    const text = readFileSync(SELF, "utf8");
    expect(vitestImports(SELF, text), "every import from the vitest family, and every module loaded at run time").toEqual(["vitest | afterAll, beforeAll, describe, expect, it, type RunnerTask, type RunnerTestFile, type RunnerTestSuite, TestRunner"]);
    expect(hookSource(SELF, text, ["TestRunner"]).references, "every run-time reference to TestRunner, with where it runs").toEqual([
      `TestRunner.getSuiteHooks | a case @ ${R687_SUITE}`,
      `TestRunner.getSuiteHooks | a case @ ${R692_SUITE}`,
      `TestRunner.getSuiteHooks | a case @ ${R692_SUITE}`,
    ]);
    const handles = [
      'import { getCurrentSuite } from "vitest/suite";',
      'import * as vitestNs from "vitest";',
      'import { afterAll as later, it, TestRunner, type RunnerTask } from "vitest";',
      'import type { Suite } from "@vitest/runner";',
      'const runner = await import("vitest");',
      "const T = TestRunner;",
      'TestRunner.getCurrentSuite().on("afterAll", () => undefined);',
      'it("c", () => TestRunner["getSuiteHooks"](task));',
      'it("d", () => {',
      "  const TestRunner = { getSuiteHooks: () => FAKE };",
      "  return TestRunner.getSuiteHooks(task);",
      "});",
    ].join("\n");
    expect(vitestImports("handles.ts", handles), "the runner's own module, a namespace import, an alias and a run-time load each read as they stand").toEqual([
      "vitest/suite | getCurrentSuite",
      "vitest | * as vitestNs",
      "vitest | afterAll as later, it, TestRunner, type RunnerTask",
      "@vitest/runner | type Suite",
      'import("vitest") | loaded at run time',
    ]);
    expect(hookSource("handles.ts", handles, ["TestRunner"]).references, "the runner reached as a value, through its own registrar and by a string key").toEqual([
      "TestRunner in a VariableDeclaration | module code",
      "TestRunner.getCurrentSuite | module code",
      "TestRunner in a ElementAccessExpression | a case @ (file scope)",
      "TestRunner declared in a VariableDeclaration | a case @ (file scope)",
      "TestRunner.getSuiteHooks | a case @ (file scope)",
    ]);
  });

  it("named residual, pinned quiet: this file names no run-time code from strings and no global that reaches a module loader or vitest's worker state, and the reader sees each spelling as written", () => {
    expect(namedAnywhere(SELF, readFileSync(SELF, "utf8"), RUNTIME_ESCAPES), "eval, Function, a constructor member, globalThis or global, process, require, vitest's worker global or a module loader, named anywhere in this file").toEqual([]);
    const escapes = ["const f = (() => 0).constructor;", "const g = globalThis.process;", 'require("vitest/suite");', 'const w = Reflect.get(globalThis, "__vitest_worker__");', 'const m = g["getBuiltinModule"];', 'const t = global[Symbol.for("$$jest-matchers-object")];'].join("\n");
    expect(namedAnywhere("escapes.ts", escapes, RUNTIME_ESCAPES), "a member name, a global, a loader call and a string key, each read as it stands").toEqual([
      "constructor at 1:21",
      "globalThis at 2:11",
      "process at 2:22",
      "require at 3:1",
      "globalThis at 4:23",
      "getBuiltinModule at 5:13 (a string key)",
      "global at 6:11",
    ]);
  });
});
