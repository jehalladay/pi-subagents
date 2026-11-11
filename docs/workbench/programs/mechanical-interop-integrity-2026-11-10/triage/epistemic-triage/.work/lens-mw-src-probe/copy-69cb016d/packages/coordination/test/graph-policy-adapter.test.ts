// MechanicalWorkflows-93ze (GPC-EAT-R013): every adapter-produced candidate Intent carries
// expectedRevision equal to the pinned Basis.revision and a target.uri that round-trips
// exactly to the GraphDataIR source id; reconcile rejects a stale one with INTENT_BASIS_STALE;
// per-entity revisions are the literal "unknown" until an identity model exists, and a
// fabricated per-entity revision is refused.
// MechanicalWorkflows-m6nl (GPC-EAT-R003 A3): every adapter Intent carries authority undefined or
// "propose-only", and the adapter module exports no execute/apply/run function (static export-name
// assertion over the module source, the runtime namespace and the adapter object).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as adapterModule from "../dist/graph-policy-adapter.js";
import { graphPolicyAdapter, reconcile } from "../dist/index.js";
import type { Basis, Budget, GraphActionSpec, GraphDataNode } from "../dist/index.js";

const basis: Basis = { workspaceId: "ws", revision: "r1" };
const budget: Budget = { compute: 3, workers: 3, queue: 3, latencyMs: 100 };
const nodes: GraphDataNode[] = [
  { sourceId: "agent:worker-1", kind: "agent" },
  { sourceId: "task:restack-c1", kind: "task" },
  { sourceId: "resource:lane-1", kind: "resource" },
  { sourceId: "artifact:candidate-c1", kind: "artifact" },
  { sourceId: "capability:land", kind: "capability" },
];

const adapter = () => graphPolicyAdapter({
  basis, policyId: "gp-adapter",
  graph: { nodes },
  action: (sourceId: string) => ({
    effect: "assignment.propose",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [`gp:score:${sourceId}`],
    writeScopes: [`assignment:${sourceId}`],
    readScopes: [],
  }),
});

test("toIntent/fromIntent round-trips exactly for every node of the fixture graph, at the pinned basis revision", () => {
  const a = adapter();
  for (const node of nodes) {
    const intent = a.toIntent(node.sourceId);
    assert.equal(intent.target.uri, node.sourceId, node.sourceId);
    assert.equal(intent.expectedRevision, basis.revision, node.sourceId);
    assert.notEqual(intent.authority, "authorized-effect");
    assert.equal(a.fromIntent(intent), node.sourceId, node.sourceId);
  }
});

test("an intent built against r1 and reconciled against r2 is rejected with INTENT_BASIS_STALE, never admitted", () => {
  const a = adapter();
  const intent = a.toIntent("task:restack-c1");
  const resolution = reconcile({ basis: { workspaceId: "ws", revision: "r2" }, budget, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }] });
  assert.equal(resolution.admitted.length, 0);
  assert.equal(resolution.rejected.length, 1);
  assert.equal(resolution.rejected[0]!.code, "INTENT_BASIS_STALE");
  const fresh = reconcile({ basis, budget, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }] });
  assert.equal(fresh.admitted.length, 1);
});

test("the sidecar records the literal unknown for every agent, resource and artifact entity revision", () => {
  const a = adapter();
  const sidecar = a.sidecar();
  for (const node of nodes) {
    assert.equal(sidecar.entityRevisions[node.sourceId], "unknown", node.sourceId);
  }
  assert.equal(sidecar.basis.revision, basis.revision);
});

test("a fabricated per-entity revision is refused: no identity model exists yet", () => {
  assert.throws(() => graphPolicyAdapter({
    basis, policyId: "gp-adapter",
    graph: { nodes: [{ sourceId: "agent:worker-1", kind: "agent", revision: "r9" } as unknown as GraphDataNode] },
    action: () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: [] }),
  }), /GRAPH_ENTITY_REVISION_UNSUPPORTED/);
});

test("an unknown source id refuses toIntent and a foreign intent refuses fromIntent, both by name", () => {
  const a = adapter();
  assert.throws(() => a.toIntent("task:ghost"), /GRAPH_SOURCE_UNKNOWN/);
  const foreign = { ...a.toIntent("task:restack-c1"), target: { kind: "artifact" as const, uri: "task:ghost" } };
  assert.throws(() => a.fromIntent(foreign), /GRAPH_SOURCE_UNKNOWN/);
});

test("a malformed graph is refused: blank or duplicate source ids and kinds outside the closed enum", () => {
  const make = (ns: GraphDataNode[]) => () => graphPolicyAdapter({ basis, policyId: "gp", graph: { nodes: ns }, action: () => ({ effect: "x", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: [] }) });
  assert.throws(make([]), /GRAPH_DATA_INVALID/);
  assert.throws(make([{ sourceId: " ", kind: "agent" }]), /GRAPH_DATA_INVALID/);
  assert.throws(make([{ sourceId: "a", kind: "agent" }, { sourceId: "a", kind: "task" }]), /GRAPH_DATA_INVALID/);
  assert.throws(make([{ sourceId: "a", kind: "mystery" as never }]), /GRAPH_DATA_INVALID/);
});

const VERBS: ReadonlySet<string> = new Set(["execute", "executes", "executed", "apply", "applies", "applied", "run", "runs"]);
const wordsOf = (name: string): string[] => name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_$]+/g, " ").toLowerCase().split(/\s+/).filter(Boolean);
const verbNames = (names: readonly string[]): string[] => names.filter(name => wordsOf(name).some(word => VERBS.has(word)));

/** Every name a module source exports: declarations, `export { a, b as c }` lists, and re-exports. */
function exportedNames(source: string): string[] {
  const names: string[] = [];
  for (const m of source.matchAll(/^export\s+(?:declare\s+)?(?:async\s+)?(?:abstract\s+)?(?:function\*?|const|let|var|class|interface|type|enum|namespace|module)\s+([A-Za-z0-9_$]+)/gm)) names.push(m[1]!);
  for (const m of source.matchAll(/^export\s*(?:type\s*)?\{([^}]*)\}/gm)) {
    for (const part of m[1]!.split(",")) {
      const alias = part.trim().split(/\s+as\s+/).pop()!.trim();
      if (alias.length > 0) names.push(alias);
    }
  }
  for (const m of source.matchAll(/^export\s+\*\s+as\s+([A-Za-z0-9_$]+)/gm)) names.push(m[1]!);
  return names;
}

const adapterSource = readFileSync(join(import.meta.dirname, "../src/graph-policy-adapter.ts"), "utf8");

test("A3: every adapter-produced Intent carries authority undefined or propose-only, never an effect authority", () => {
  const a = adapter();
  for (const node of nodes) {
    const intent = a.toIntent(node.sourceId);
    assert.ok(intent.authority === undefined || intent.authority === "propose-only", `${node.sourceId}: ${String(intent.authority)}`);
  }
});

test("A3: the adapter module exports exactly graphPolicyAdapter at runtime, and no execute/apply/run name", () => {
  assert.deepEqual(Object.keys(adapterModule), ["graphPolicyAdapter"]);
  assert.deepEqual(verbNames(Object.keys(adapterModule)), []);
  assert.equal(typeof adapterModule.graphPolicyAdapter, "function");
});

test("A3: the built adapter exposes only the Intent builder, its inverse and the sidecar view, no execute/apply/run member", () => {
  const members = Object.keys(adapter()).sort();
  assert.deepEqual(members, ["fromIntent", "sidecar", "toIntent"]);
  assert.deepEqual(verbNames(members), []);
});

test("A3 static export-name assertion: the module source exports graphPolicyAdapter plus types, and no execute/apply/run name", () => {
  const names = exportedNames(adapterSource);
  assert.ok(names.includes("graphPolicyAdapter"), "the Intent builder is exported");
  assert.deepEqual(verbNames(names), []);
  assert.deepEqual(names.filter(name => /^[a-z]/.test(name)), ["graphPolicyAdapter"], "the only value-style export is the Intent builder");
});

test("A3 control: the static scan flags an execute, apply or run export in every export syntax", () => {
  assert.deepEqual(verbNames(exportedNames("export function applyIntent() {}\nexport const run = 1;")), ["applyIntent", "run"]);
  assert.deepEqual(verbNames(exportedNames("export async function executeEffect() {}")), ["executeEffect"]);
  assert.deepEqual(verbNames(exportedNames("export { toIntent as runIntent, fromIntent };")), ["runIntent"]);
  assert.deepEqual(verbNames(exportedNames("export class EffectRunner {}\nexport type RunResult = string;")), ["RunResult"]);
  assert.deepEqual(verbNames(exportedNames("export function graphPolicyAdapter() {}\nexport interface GraphPolicyAdapter {}")), []);
});

// MechanicalWorkflows-lbpw (GPC-EAT-R003 A3, test-only successor to m6nl): three laws the m6nl rows left unpinned.
test("A3: an action callback that returns spec-supplied authority never reaches the Intent: toIntent forwards no effect authority", () => {
  const hostile = graphPolicyAdapter({
    basis, policyId: "gp-adapter",
    graph: { nodes },
    action: (sourceId: string) => ({
      effect: "assignment.propose",
      claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
      evidenceRefs: [`gp:score:${sourceId}`],
      writeScopes: [`assignment:${sourceId}`],
      readScopes: [],
      authority: "authorized-effect",
    } as unknown as GraphActionSpec),
  });
  for (const node of nodes) {
    const intent = hostile.toIntent(node.sourceId);
    assert.ok(intent.authority === undefined || intent.authority === "propose-only", `${node.sourceId}: ${String(intent.authority)}`);
  }
});

test("A3: no execute/apply/run member is reachable on the adapter by any lookup, including inherited and non-enumerable ones", () => {
  const built = adapter() as unknown as Record<string, unknown>;
  for (const verb of VERBS) assert.equal(typeof built[verb], "undefined", verb);
  const reachable: string[] = [];
  for (const key in built) reachable.push(key);
  for (let proto: object | null = built; proto !== null; proto = Object.getPrototypeOf(proto) as object | null) {
    if (proto === Object.prototype) break;
    reachable.push(...Object.getOwnPropertyNames(proto));
  }
  assert.deepEqual(verbNames(reachable), []);
});

test("A3 control: the static export scan flags a namespace, module or abstract class export carrying an execute/apply/run name", () => {
  assert.deepEqual(exportedNames("export namespace RunNs {}"), ["RunNs"]);
  assert.deepEqual(verbNames(exportedNames("export namespace Apply { export type Result = string; }")), ["Apply"]);
  assert.deepEqual(verbNames(exportedNames("export declare module ExecuteBox {}")), ["ExecuteBox"]);
  assert.deepEqual(verbNames(exportedNames("export abstract class RunnerBase {}")), []);
  assert.deepEqual(verbNames(exportedNames("export abstract class Run {}")), ["Run"]);
});
// MechanicalWorkflows-iof8 (test-only follow-up to 93ze): five laws the landed guard left unpinned.
const spec = () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: [] });
const build = (ns: GraphDataNode[]) => graphPolicyAdapter({ basis, policyId: "gp", graph: { nodes: ns }, action: spec });

test("iof8 P1: a mixed-case source id round-trips byte-exact: target.uri and fromIntent never case-fold it", () => {
  const a = build([{ sourceId: "Agent:Worker-1", kind: "agent" }]);
  const intent = a.toIntent("Agent:Worker-1");
  assert.equal(intent.target.uri, "Agent:Worker-1");
  assert.equal(a.fromIntent(intent), "Agent:Worker-1");
  assert.throws(() => a.toIntent("agent:worker-1"), /GRAPH_SOURCE_UNKNOWN/);
});

test("iof8 P2: a padded non-blank source id is accepted and round-trips byte-exact, never trimmed", () => {
  const a = build([{ sourceId: " task:pad ", kind: "task" }]);
  const intent = a.toIntent(" task:pad ");
  assert.equal(intent.target.uri, " task:pad ");
  assert.equal(a.fromIntent(intent), " task:pad ");
  assert.throws(() => a.toIntent("task:pad"), /GRAPH_SOURCE_UNKNOWN/);
  assert.deepEqual(Object.keys(a.sidecar().entityRevisions), [" task:pad "]);
});

test("iof8 P3: the accepted kind set is exactly the five landed kinds; near-miss sixth kinds refuse GRAPH_DATA_INVALID", () => {
  for (const kind of ["agent", "task", "resource", "artifact", "capability"] as const) {
    assert.doesNotThrow(() => build([{ sourceId: `${kind}:x`, kind }]), kind);
  }
  for (const kind of ["workflow", "Agent", "agents", ""]) {
    assert.throws(() => build([{ sourceId: "n:x", kind: kind as never }]), /GRAPH_DATA_INVALID/, kind);
  }
});

test("iof8 P4: the sidecar records the full pinned basis, workspace id and revision, by deep equality", () => {
  const sidecar = adapter().sidecar();
  assert.equal(sidecar.schema, "mw.graph-policy-sidecar.v1");
  assert.deepEqual(sidecar.basis, basis);
  assert.equal(sidecar.basis.workspaceId, "ws");
});

test("iof8 P5: every present per-entity revision key refuses GRAPH_ENTITY_REVISION_UNSUPPORTED, including empty-string and null", () => {
  for (const revision of ["r9", "", null, 0, undefined]) {
    assert.throws(
      () => build([{ sourceId: "agent:worker-1", kind: "agent", revision } as unknown as GraphDataNode]),
      /GRAPH_ENTITY_REVISION_UNSUPPORTED/,
      String(revision),
    );
  }
});

// MechanicalWorkflows-syf5 (test-only follow-up to iof8): four laws no adapter test reads from a built Intent, so reconcile's
// duplicate, protected-scope and budget guards never saw an adapter-produced one (N1 to N4 mutant shapes).
const unit = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
const proposalOf = (intents: ReturnType<ReturnType<typeof adapter>["toIntent"]>[]) => [{ intents, memory: null, trace: [] }];

test("syf5 W1: two distinct source ids get distinct intent ids, and one reconcile batch admits both without INTENT_DUPLICATE", () => {
  const a = adapter();
  const first = a.toIntent("agent:worker-1");
  const second = a.toIntent("task:restack-c1");
  assert.notEqual(first.intentId, second.intentId);
  assert.ok(first.intentId.endsWith("agent:worker-1"), first.intentId);
  assert.ok(second.intentId.endsWith("task:restack-c1"), second.intentId);
  const resolution = reconcile({ basis, budget, protectedScopes: [], proposals: proposalOf([first, second]) });
  assert.deepEqual(resolution.rejected.map(r => r.code), []);
  assert.deepEqual(resolution.admitted.map(i => i.intentId), [first.intentId, second.intentId]);
});

test("syf5 W2: toIntent forwards the action's write scopes, so a protected scope refuses its intent by name and spares the others", () => {
  const a = adapter();
  const guarded = a.toIntent("task:restack-c1");
  const other = a.toIntent("agent:worker-1");
  assert.deepEqual(guarded.writeScopes, ["assignment:task:restack-c1"]);
  assert.deepEqual(other.writeScopes, ["assignment:agent:worker-1"]);
  const resolution = reconcile({ basis, budget, protectedScopes: ["assignment:task:restack-c1"], proposals: proposalOf([guarded, other]) });
  assert.deepEqual(resolution.rejected.map(r => [r.intent.intentId, r.code]), [[guarded.intentId, "INTENT_SCOPE_PROTECTED"]]);
  assert.deepEqual(resolution.admitted.map(i => i.intentId), [other.intentId]);
});

test("syf5 W3: toIntent forwards the action's resource claim, so the cumulative budget refuses the second of two unit claims", () => {
  const a = adapter();
  const first = a.toIntent("agent:worker-1");
  const second = a.toIntent("task:restack-c1");
  assert.deepEqual(first.claim, unit);
  assert.deepEqual(second.claim, unit);
  const tight: Budget = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
  const resolution = reconcile({ basis, budget: tight, protectedScopes: [], proposals: proposalOf([first, second]) });
  assert.deepEqual(resolution.admitted.map(i => i.intentId), [first.intentId]);
  assert.deepEqual(resolution.rejected.map(r => [r.intent.intentId, r.code]), [[second.intentId, "INTENT_BUDGET_EXCEEDED"]]);
  assert.deepEqual(resolution.budgetUsed, unit);
});

test("syf5 W4: two source ids that differ only by case are two nodes: the graph builds, each round-trips to itself, and intent ids differ", () => {
  const a = build([{ sourceId: "task:Alpha", kind: "task" }, { sourceId: "task:alpha", kind: "task" }]);
  const upper = a.toIntent("task:Alpha");
  const lower = a.toIntent("task:alpha");
  assert.equal(a.fromIntent(upper), "task:Alpha");
  assert.equal(a.fromIntent(lower), "task:alpha");
  assert.notEqual(upper.intentId, lower.intentId);
  assert.deepEqual(Object.keys(a.sidecar().entityRevisions), ["task:Alpha", "task:alpha"]);
  assert.throws(() => build([{ sourceId: "task:Alpha", kind: "task" }, { sourceId: "task:Alpha", kind: "task" }]), /GRAPH_DATA_INVALID/);
});

// MechanicalWorkflows-np7p (syf5 follow-up): the four forwarding laws of toIntent that no earlier
// test read back. Each helper builds an adapter whose action varies exactly one forwarded field.
const np7pClaim = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
const specAdapter = (policyId: string, action: (sourceId: string) => GraphActionSpec) => graphPolicyAdapter({ basis, policyId, graph: { nodes }, action });

test("np7p V1: toIntent forwards the action's evidenceRefs in order, per source id", () => {
  const a = specAdapter("gp-adapter", (sourceId: string) => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: [`gp:score:${sourceId}`, "gp:basis:r1"], writeScopes: [`assignment:${sourceId}`], readScopes: [] }));
  for (const id of ["task:restack-c1", "agent:worker-1"]) {
    assert.deepEqual(a.toIntent(id).evidenceRefs, [`gp:score:${id}`, "gp:basis:r1"], id);
  }
});

test("np7p V2: forwarded readScopes make reconcile treat an adapter reader as interfering with the writer of that scope", () => {
  const readScope = "assignment:task:restack-c1";
  const a = specAdapter("gp-adapter", (sourceId: string) => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: [], writeScopes: [`assignment:${sourceId}`], readScopes: sourceId === "agent:worker-1" ? [readScope] : [] }));
  const writer = a.toIntent("task:restack-c1");
  const reader = a.toIntent("agent:worker-1");
  assert.deepEqual(reader.readScopes, [readScope]);
  assert.deepEqual(writer.readScopes, []);
  const resolution = reconcile({ basis, budget, protectedScopes: [], proposals: [{ intents: [writer, reader], memory: null, trace: [] }] });
  assert.equal(resolution.admitted.length, 0);
  assert.deepEqual(resolution.rejected.map(r => r.code), ["INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(resolution.rejected.map(r => r.intent.intentId).sort(), [reader.intentId, writer.intentId].sort());
  assert.equal(resolution.conflicts.length, 1);
  assert.equal(resolution.conflicts[0]!.scope, readScope);
});

test("np7p V3: the action's effect reaches intent.effect per source id", () => {
  const a = specAdapter("gp-adapter", (sourceId: string) => ({ effect: `lane.hold:${sourceId}`, claim: np7pClaim, evidenceRefs: [], writeScopes: [], readScopes: [] }));
  for (const node of nodes) assert.equal(a.toIntent(node.sourceId).effect, `lane.hold:${node.sourceId}`, node.sourceId);
});

test("np7p V4: the adapter's policyId is stamped on every intent and prefixes its intentId", () => {
  for (const policyId of ["gp-v", "gp"]) {
    const a = specAdapter(policyId, () => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: [], writeScopes: [], readScopes: [] }));
    for (const node of nodes) {
      const intent = a.toIntent(node.sourceId);
      assert.equal(intent.policyId, policyId, node.sourceId);
      assert.equal(intent.intentId, `${policyId}:gp:${basis.revision}:${node.sourceId}`, node.sourceId);
    }
  }
});

// MechanicalWorkflows-ivmh (np7p follow-up): copy isolation. toIntent spread-copies the action's
// three forwarded arrays, so a later push onto the array the action returned must not reach an
// Intent already built. np7p V1/V2 compared contents only, which an aliasing Intent also satisfies.
test("ivmh W1: a push onto the action's evidenceRefs array after toIntent does not reach the built Intent", () => {
  const shared = ["gp:score:task:restack-c1"];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: shared, writeScopes: [], readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  shared.push("gp:late");
  assert.deepEqual(intent.evidenceRefs, ["gp:score:task:restack-c1"]);
  assert.notEqual(intent.evidenceRefs, shared);
});

test("ivmh W2: a push onto the action's readScopes array after toIntent does not reach the built Intent", () => {
  const shared = ["assignment:task:restack-c1"];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: [], writeScopes: [], readScopes: shared }));
  const intent = a.toIntent("agent:worker-1");
  shared.push("assignment:late");
  assert.deepEqual(intent.readScopes, ["assignment:task:restack-c1"]);
  assert.notEqual(intent.readScopes, shared);
});

test("ivmh W3: a push onto the action's writeScopes array after toIntent does not reach the built Intent", () => {
  const shared = ["assignment:task:restack-c1"];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: np7pClaim, evidenceRefs: [], writeScopes: shared, readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  shared.push("assignment:late");
  assert.deepEqual(intent.writeScopes, ["assignment:task:restack-c1"]);
  assert.notEqual(intent.writeScopes, shared);
});

// MechanicalWorkflows-x1gc (ivmh follow-up): claim copy and empty-array copy boundary. toIntent
// spread-copies the claim, so a later write to the claim object the action returned must not
// reach an Intent already built. ivmh W1..W3 push onto non-empty arrays only; an empty source
// array that the adapter forwards by reference slips past them.
test("x1gc WC1: a write to the action's claim object after toIntent does not reach the built Intent", () => {
  const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim, evidenceRefs: [], writeScopes: [], readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  claim.compute = 9;
  assert.deepEqual(intent.claim, { compute: 1, workers: 1, queue: 1, latencyMs: 1 });
  assert.notEqual(intent.claim, claim);
});

test("x1gc WC2: a post-build write to the action's claim does not flip reconcile to INTENT_BUDGET_EXCEEDED", () => {
  const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim, evidenceRefs: [], writeScopes: [], readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  claim.compute = 9;
  const resolution = reconcile({ basis, budget, protectedScopes: [], proposals: [{ intents: [intent], memory: null, trace: [] }] });
  assert.deepEqual(resolution.admitted.map(i => i.intentId), [intent.intentId]);
  assert.deepEqual(resolution.rejected.map(r => r.code), []);
});

test("x1gc WE1: a push onto an EMPTY evidenceRefs array the action returned does not reach the built Intent", () => {
  const shared: string[] = [];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: shared, writeScopes: [], readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  shared.push("gp:late");
  assert.deepEqual(intent.evidenceRefs, []);
  assert.notEqual(intent.evidenceRefs, shared);
});

test("x1gc WE2: a push onto an EMPTY readScopes array the action returned does not reach the built Intent", () => {
  const shared: string[] = [];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: shared }));
  const intent = a.toIntent("agent:worker-1");
  shared.push("assignment:late");
  assert.deepEqual(intent.readScopes, []);
  assert.notEqual(intent.readScopes, shared);
});

test("x1gc WE3: a push onto an EMPTY writeScopes array the action returned does not reach the built Intent", () => {
  const shared: string[] = [];
  const a = specAdapter("gp-adapter", () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: shared, readScopes: [] }));
  const intent = a.toIntent("task:restack-c1");
  shared.push("assignment:late");
  assert.deepEqual(intent.writeScopes, []);
  assert.notEqual(intent.writeScopes, shared);
});
