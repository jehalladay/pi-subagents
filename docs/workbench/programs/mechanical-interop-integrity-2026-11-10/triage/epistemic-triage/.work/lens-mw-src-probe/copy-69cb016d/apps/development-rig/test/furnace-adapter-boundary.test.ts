import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { executeProcessContext } from "../dist/furnace-process-executor.js";
import type { ProcessExecutorReceipt, ProcessExecutorServices } from "../dist/furnace-process-executor.js";
import type { GateObservation } from "../dist/live-gate.js";

// MW-R6 boundary laws for the Furnace adapter (bead MechanicalWorkflows-euide.1, EAT-R098(a),
// EAT-R097(b) riding leg, EAT-R099 L1 fixture leg). Furnace owns Run/Work/Attempt state; this rig
// only decodes the ExecutionContext Furnace hands it and writes a receipt.
//   1. census: no mirrored Run/Work/Attempt state machine in the Furnace adapter sources;
//   2. edge census: Forge adapter and Furnace adapter stay separate modules, joined only by the
//      pinned composition edges, and no package manifest couples the two SDKs;
//   3. fixture: a fail-arm receipt keeps its four axes distinct with no cross-writes.
// The axis names bind to the receipt shape at this HEAD (executorVerdict, forge, development,
// furnace). The docs proposal names the carriers domainOutcome and executionStatus; an adopt-time
// rename re-derives the AXES table below and nothing else. The mutant fixtures are labelled
// fixture evidence and never count as native PASS.

const here = dirname(fileURLToPath(import.meta.url));
const rigSrc = join(here, "..", "src");
const repoRoot = join(here, "..", "..", "..");

const FURNACE_MODULES = ["furnace-app.ts", "furnace-app-wiring.ts", "furnace-gate.ts", "furnace-process-executor.ts"] as const;

function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").split("\n").map(line => line.replace(/(^|\s)\/\/.*$/, "$1")).join("\n");
}
function readSource(name: string): string { return stripComments(readFileSync(join(rigSrc, name), "utf8")); }

/** Census scanner: the reasons a source mirrors Furnace's Run/Work/Attempt state machine. */
function stateMachineHits(source: string): string[] {
  const hits: string[] = [];
  if (/\benum\b/.test(source)) hits.push("enum declaration");
  if (/\btransition\w*/i.test(source)) hits.push("transition identifier");
  if (/\b(Run|Work|Attempt)(State|Status|Phase|Machine)\b/.test(source)) hits.push("Run/Work/Attempt state type");
  if (/switch\s*\(\s*[\w.]*(state|status|phase)\b/i.test(source)) hits.push("switch over a state variable");
  return hits;
}

interface ImportEdge { readonly target: string; readonly typeOnly: boolean }
/** Relative import edges of a source text (static, type-only and dynamic). */
function relativeEdges(source: string): ImportEdge[] {
  const edges: ImportEdge[] = [];
  for (const m of source.matchAll(/\bimport\s+(type\s+)?(?:[^"';]*?\sfrom\s+)?["'](\.[^"']+)["']/g)) edges.push({ target: m[2]!.replace(/\.js$/, ""), typeOnly: m[1] !== undefined });
  for (const m of source.matchAll(/\bimport\(\s*["'](\.[^"']+)["']\s*\)/g)) edges.push({ target: m[1]!.replace(/\.js$/, ""), typeOnly: false });
  return edges;
}
const isFurnaceTarget = (target: string): boolean => /(^|\/)furnace-[\w-]+$/.test(target);

test("census: the Furnace adapter sources carry no Run/Work/Attempt state machine", () => {
  for (const name of FURNACE_MODULES) assert.deepEqual(stateMachineHits(readSource(name)), [], `${name} mirrors Furnace state`);
});
test("census scanner is not vacuous: a mirrored Attempt state machine is detected (fixture mutant, not native evidence)", () => {
  const mutant = "enum AttemptState { Pending, Running }\nfunction transition(a: AttemptState): AttemptState { return a; }\nswitch (attempt.state) { case 1: break; }";
  assert.deepEqual(stateMachineHits(mutant), ["enum declaration", "transition identifier", "Run/Work/Attempt state type", "switch over a state variable"]);
  assert.deepEqual(stateMachineHits(stripComments("// enum transition AttemptState\nconst exitCode = 1;")), [], "comments are not code");
  assert.deepEqual(stateMachineHits(stripComments("/* enum transition */ // AttemptState\nconst x = 1;")), []);
});

test("edge census: the Forge adapter (live-gate) imports no Furnace adapter module, directly or transitively", () => {
  const seen = new Set<string>(); const queue = ["live-gate"];
  while (queue.length > 0) {
    const module = queue.shift()!;
    if (seen.has(module)) continue;
    seen.add(module);
    for (const edge of relativeEdges(readSource(module + ".ts"))) {
      assert.equal(isFurnaceTarget(edge.target), false, `${module} imports Furnace adapter ${edge.target}`);
      queue.push(edge.target.replace(/^\.\//, ""));
    }
  }
  assert.ok(seen.has("live-gate"));
});
test("edge census: Furnace adapter edges equal the pinned composition set and only the composition modules reach Forge at runtime", () => {
  const expected: Record<(typeof FURNACE_MODULES)[number], readonly string[]> = {
    "furnace-app.ts": ["./furnace-app-wiring", "./furnace-gate", "./live-gate"],
    "furnace-app-wiring.ts": ["./live-gate"],
    "furnace-gate.ts": ["./live-gate"],
    "furnace-process-executor.ts": ["./live-development", "./live-gate", "./receipt"],
  };
  const compositionRoots = new Set(["furnace-app.ts", "furnace-process-executor.ts"]);
  for (const name of FURNACE_MODULES) {
    const edges = relativeEdges(readSource(name));
    assert.deepEqual([...new Set(edges.map(e => e.target))].sort(), [...expected[name]], `${name} edge set drifted`);
    if (!compositionRoots.has(name)) assert.ok(edges.every(e => e.typeOnly), `${name} has a runtime edge; only composition roots may`);
  }
});
test("edge census: no other rig module imports a Furnace adapter module, no Furnace adapter module names the Forge SDK, and only furnace-* modules name the Furnace SDK", () => {
  const stray: string[] = [];
  for (const name of readdirSync(rigSrc).filter(n => n.endsWith(".ts") && !(FURNACE_MODULES as readonly string[]).includes(n))) {
    for (const edge of relativeEdges(readSource(name))) if (isFurnaceTarget(edge.target)) stray.push(`${name} -> ${edge.target}`);
  }
  assert.deepEqual(stray, []);
  for (const name of FURNACE_MODULES) assert.equal(/@forge\/sdk/.test(readSource(name)), false, `${name} names the Forge SDK`);
  for (const name of readdirSync(rigSrc).filter(n => n.endsWith(".ts") && !n.startsWith("furnace-"))) assert.equal(/@furnace\/sdk/.test(readSource(name)), false, `${name} names the Furnace SDK`);
});
// Manifest coupling law: the only manifest that may name both SDKs is the composition app
// (apps/development-rig, whose furnace-app.ts documents installing both @furnace/sdk and @forge/sdk
// into it); every other manifest (root, packages/*, other apps) names at most one. The matchers
// accept scoped names such as "@forge/sdk" and "@furnace/sdk" as well as unscoped forge-* and furnace-*.
const COMPOSITION_MANIFEST = "apps/development-rig/package.json";
const isForgeSdkName = (name: string): boolean => /(^|[@/])forge($|[-/])/.test(name);
const isFurnaceSdkName = (name: string): boolean => /(^|[@/])furnace($|[-/])/.test(name);
function manifestCoupling(manifest: unknown): { forge: string[]; furnace: string[] } {
  const json = manifest as Record<string, unknown>;
  const names = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].flatMap(k => Object.keys((json[k] ?? {}) as Record<string, unknown>));
  return { forge: names.filter(isForgeSdkName), furnace: names.filter(isFurnaceSdkName) };
}
const couples = (manifest: unknown): boolean => { const c = manifestCoupling(manifest); return c.forge.length > 0 && c.furnace.length > 0; };

test("edge census: no package manifest outside the composition app couples the Forge and Furnace SDKs", () => {
  const manifests: string[] = [];
  for (const top of ["apps", "packages"]) for (const dir of readdirSync(join(repoRoot, top))) {
    if (statSync(join(repoRoot, top, dir)).isDirectory() && readdirSync(join(repoRoot, top, dir)).includes("package.json")) manifests.push(`${top}/${dir}/package.json`);
  }
  manifests.push("package.json");
  assert.ok(manifests.length >= 3);
  assert.ok(manifests.includes(COMPOSITION_MANIFEST), "the exempted composition manifest must exist, else the exemption is stale");
  for (const rel of manifests) {
    if (rel === COMPOSITION_MANIFEST) continue;
    const json = JSON.parse(readFileSync(join(repoRoot, rel), "utf8")) as unknown;
    assert.equal(couples(json), false, `${rel} depends on both Forge (${manifestCoupling(json).forge}) and Furnace (${manifestCoupling(json).furnace})`);
  }
});
test("manifest coupling predicate is not vacuous: scoped SDK names are detected (fixture mutant, not native evidence)", () => {
  assert.equal(couples({ dependencies: { "@forge/sdk": "*", "@furnace/sdk": "*" } }), true, "scoped SDK pair must be rejected");
  assert.equal(couples({ dependencies: { "@forge/sdk": "*" }, devDependencies: { "@furnace/sdk": "*" } }), true, "split across dependency kinds must be rejected");
  assert.equal(couples({ peerDependencies: { "forge-sdk": "*" }, optionalDependencies: { "furnace-sdk": "*" } }), true, "unscoped pair must be rejected");
  assert.equal(couples({ dependencies: { "@forge/sdk": "*" } }), false, "a single SDK is allowed");
  assert.equal(couples({ dependencies: { "@furnace/sdk": "*" } }), false, "a single SDK is allowed");
  assert.equal(couples({ dependencies: { "unforged": "*", "refurnace": "*" } }), false, "substring matches are not SDK names");
  assert.equal(couples({}), false);
});

// Axis table: each carrier owns exactly these keys; a key owned by one axis never appears in another.
const AXES = {
  furnace: ["runId", "beadsRunId", "formula", "workId", "attemptId", "ordinal", "workspaceRoot"],
  forge: ["kind", "reason", "basis", "operationId"],
} as const;
function axisViolations(receipt: ProcessExecutorReceipt): string[] {
  const bad: string[] = [];
  const furnaceKeys = Object.keys(receipt.furnace); const forgeKeys = receipt.forge ? Object.keys(receipt.forge) : [];
  for (const k of furnaceKeys) if (!(AXES.furnace as readonly string[]).includes(k)) bad.push(`furnace.${k} is not a Furnace identity key`);
  for (const k of forgeKeys) if (!(AXES.forge as readonly string[]).includes(k)) bad.push(`forge.${k} is not a Forge evidence key`);
  if (receipt.executorVerdict !== "success" && receipt.executorVerdict !== "work_failure" && receipt.executorVerdict !== "refused") bad.push("executorVerdict is outside the closed set");
  const furnaceIds = [receipt.furnace.runId, receipt.furnace.workId, receipt.furnace.attemptId];
  if (receipt.forge?.operationId && furnaceIds.includes(receipt.forge.operationId)) bad.push("forge.operationId reuses a Furnace identity");
  if (receipt.forge && receipt.furnace.attemptId.startsWith("op-")) bad.push("furnace.attemptId carries a Forge operation id");
  if (receipt.forge && receipt.development) bad.push("one fail arm wrote both forge and development");
  return bad;
}

const basis = { commit: "a".repeat(40), tree: "b".repeat(40), clean: true as const };
const failedGate: GateObservation = { kind: "failed", reason: "FORGE_GATE_FAIL", basis, operationId: "op-" + "7".repeat(32), native: {}, binding: { commit: "descriptor", gateDefinition: "descriptor", environment: "descriptor" } };
const context = JSON.stringify({ run: { furnace_run_id: "frn-run-axes", beads_run_id: "mw-axes", formula: "mw-gate" }, work: { beads_work_id: "mw-axes.1", title: "[gate] verify", description: null, acceptance_criteria: null }, attempt: { attempt_id: "frn-atm-axes-1", ordinal: 1 }, workspace: { root: "/tmp/mw-axes" } });
const services: ProcessExecutorServices = { gate: async () => failedGate, develop: async () => { throw new Error("unexpected develop"); } };

test("fixture: a fail-arm receipt keeps executorVerdict, forge, development and furnace identity on separate axes", async () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-axes-"));
  try {
    const { exitCode, receipt } = await executeProcessContext(context, services, { receiptsDir: dir });
    assert.equal(exitCode, 1);
    assert.equal(receipt.executorVerdict, "work_failure");
    assert.equal(receipt.forge?.kind, "failed");
    assert.equal(receipt.forge?.operationId, failedGate.operationId);
    assert.equal(receipt.development, null);
    assert.deepEqual(receipt.furnace, { runId: "frn-run-axes", beadsRunId: "mw-axes", formula: "mw-gate", workId: "mw-axes.1", attemptId: "frn-atm-axes-1", ordinal: 1, workspaceRoot: "/tmp/mw-axes" });
    assert.deepEqual(axisViolations(receipt), []);
    assert.equal("forge" in receipt.furnace, false); assert.equal("executorVerdict" in (receipt.forge ?? {}), false);
    const onDisk = JSON.parse(readFileSync(join(dir, "frn-atm-axes-1.json"), "utf8")) as ProcessExecutorReceipt;
    assert.deepEqual(onDisk, JSON.parse(JSON.stringify(receipt)));
    assert.deepEqual(axisViolations(onDisk), []);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
test("fixture: the axis checker rejects cross-written mutants (fixture mutant, not native evidence)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-axes-"));
  try {
    const { receipt } = await executeProcessContext(context, services, { receiptsDir: dir });
    const forgeWroteFurnace = { ...receipt, forge: { ...receipt.forge!, attemptId: "frn-atm-axes-1" } } as unknown as ProcessExecutorReceipt;
    const furnaceWroteForge = { ...receipt, furnace: { ...receipt.furnace, operationId: failedGate.operationId } } as unknown as ProcessExecutorReceipt;
    const reusedId = { ...receipt, forge: { ...receipt.forge!, operationId: receipt.furnace.attemptId } } as ProcessExecutorReceipt;
    const bothArms = { ...receipt, development: {} } as unknown as ProcessExecutorReceipt;
    assert.deepEqual(axisViolations(forgeWroteFurnace), ["forge.attemptId is not a Forge evidence key"]);
    assert.deepEqual(axisViolations(furnaceWroteForge), ["furnace.operationId is not a Furnace identity key"]);
    assert.deepEqual(axisViolations(reusedId), ["forge.operationId reuses a Furnace identity"]);
    assert.deepEqual(axisViolations(bothArms), ["one fail arm wrote both forge and development"]);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
