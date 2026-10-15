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
 * Widenings are reported, never patched here: the one measured widening (a JSON
 * own "__proto__" key permitted by capability_invoke) is pinned as the known
 * widening of follow-up bead wb-8i1, whose fix flips the cell in its own commit.
 * Fixture providers only; no src change.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
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
  { name: "prototype-key input", id: OPEN, grants: [`invoke:${OPEN}`], input: protoKey, oracle: { permitted: false, category: "validation" }, knownWidening: { "claude-tool": "wb-8i1" } },
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

beforeAll(async () => {
  for (const row of ROWS) {
    oracles.set(row.name, await oracle(row));
    for (const surface of SURFACES) {
      if (row.skip?.surfaces.includes(surface)) continue;
      outcomes.set(key(row, surface), await RUNNERS[surface](row));
    }
  }
});
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
  it("has no cell where a surface permits and the oracle refuses, beyond the recorded known widening", () => {
    const widenings = ROWS.flatMap(row => ranSurfaces(row).filter(surface => outcomes.get(key(row, surface))?.permitted && !oracles.get(row.name)?.permitted).map(surface => `${row.name} on ${surface}`));
    // Spelled out, so a new knownWidening entry can never silently absorb a new widening.
    expect(KNOWN_WIDENINGS).toEqual([{ cell: "prototype-key input on claude-tool", bead: "wb-8i1" }]);
    expect(widenings).toEqual(KNOWN_WIDENINGS.map(widening => widening.cell));
  });
  it("pins the known widening wb-8i1: capability_invoke permits a JSON own __proto__ key that the oracle and both node hosts refuse", async () => {
    // wb-8i1 flips this test to the oracle's refusal and deletes the row's knownWidening entry in the same commit.
    const row = ROWS.find(candidate => candidate.name === "prototype-key input")!;
    const refusal = { permitted: false, category: "validation", message: `Prototype pollution key at invoke(${OPEN}) input.__proto__.` };
    expect(oracles.get(row.name)).toMatchObject(refusal);
    expect(outcomes.get(key(row, "claude-node"))).toMatchObject(refusal);
    expect(outcomes.get(key(row, "detached-node"))).toMatchObject(refusal);
    // The production channel carries the key: JSON text naming "__proto__" parses to an OWN data property.
    const wire = JSON.stringify({ capabilityId: OPEN, capabilityVersion: "1.0.0", input: row.input() });
    expect(wire).toBe(`{"capabilityId":"${OPEN}","capabilityVersion":"1.0.0","input":{"value":"x","__proto__":{"grants":["fixture:write"]}}}`);
    // By reference (the matrix cell) and after the JSON round trip alike, the tool permits; zod's record parse drops
    // the key, so the provider receives the stripped object and the planted grant never becomes authority.
    const { registry, recorded } = fixture();
    const client = await toolClient(registry, row.grants, ALL_FIXTURE_IDS, new AbortController().signal);
    const overWire = await callInvoke(client, JSON.parse(wire) as Record<string, unknown>);
    const byReference = outcomes.get(key(row, "claude-tool"))!;
    expect(byReference.permitted).toBe(true);
    expect(overWire.kind).toBe("returned");
    for (const received of [byReference.recorded, recorded]) {
      expect(received).toHaveLength(1);
      expect(JSON.stringify(received[0].input)).toBe('{"value":"x"}');
      expect([...received[0].context.grants]).toEqual([`invoke:${OPEN}`]);
    }
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
