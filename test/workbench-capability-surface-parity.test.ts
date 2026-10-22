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
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterAll, beforeAll, describe, expect, it, TestRunner } from "vitest";
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
