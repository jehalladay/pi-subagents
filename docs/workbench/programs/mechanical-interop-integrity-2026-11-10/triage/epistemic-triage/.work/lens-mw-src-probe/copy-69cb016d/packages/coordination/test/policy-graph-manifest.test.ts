// MechanicalWorkflows-3l61.1.1 (APO-003, re-derived at head from the 3l61.1 reference diff): the
// mw.policy-graph.v1 validator checks node kinds, typed ports and implementation references.
// Evidence grade FIXTURE throughout: these tests exercise the local validator over synthetic
// manifests; no native grade is claimed and nothing here asserts that a real manifest is secure or
// that a registry exists at runtime. Duplicate node ids keep their landed GRAPH_MANIFEST_MALFORMED
// code (pinned by policy-graph.test.ts), and hostile member shapes keep returning typed refusals.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { validatePolicyGraph, compilePolicyGraph, POLICY_GRAPH_NODE_KINDS } from "../dist/index.js";
import type { PolicyGraphManifest, PolicyGraphEdge, PolicyGraphNode, PolicyGraphPort } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));

const node = (id: string, kind = "pure-transform", ports?: readonly PolicyGraphPort[]): PolicyGraphNode => (ports === undefined ? { id, kind } : { id, kind, ports });
const port = (id: string, schemaRef = "schema:a", temporal: "instant" | "delayed" = "instant"): PolicyGraphPort => ({ id, schemaRef, temporal });
const edge = (from: string, to: string, over: Partial<PolicyGraphEdge> = {}): PolicyGraphEdge => ({ from, to, temporal: "instant", ...over });
const manifest = (over: Partial<PolicyGraphManifest> = {}): PolicyGraphManifest => ({
  schema: "mw.policy-graph.v1",
  graphId: "graph:fixture",
  revision: "r1",
  parentRevision: "unknown",
  exactBasisPolicy: "whole-basis",
  requiredContracts: [],
  implementationRefs: [],
  nodes: [node("a", "observation"), node("b"), node("c", "output")],
  edges: [edge("a", "b"), edge("b", "c")],
  ...over,
});
const hostile = (over: Record<string, unknown>): PolicyGraphManifest => ({ ...manifest(), ...over }) as unknown as PolicyGraphManifest;
const refusal = (value: PolicyGraphManifest, registry?: ReadonlySet<string>) => {
  const outcome = validatePolicyGraph(value, registry === undefined ? {} : { implementationRegistry: registry });
  assert.equal(outcome.ok, false);
  if (outcome.ok) throw new Error("unreachable");
  return outcome;
};

test("A1 the node-kind tuple holds exactly the nine APO kinds in order", () => {
  assert.deepEqual([...POLICY_GRAPH_NODE_KINDS], ["observation", "pure-transform", "numeric-policy", "deterministic-policy", "conditional-selector", "guard-inhibitor", "bounded-option", "composition", "output"]);
});

test("A1 every one of the nine kinds validates", () => {
  for (const kind of POLICY_GRAPH_NODE_KINDS) assert.deepEqual(validatePolicyGraph(manifest({ nodes: [node("only", kind)], edges: [] })), { ok: true }, kind);
});

test("A1 a node whose kind lies outside the tuple is GRAPH_NODE_KIND_UNKNOWN naming the node id and the kind", () => {
  const outcome = refusal(manifest({ nodes: [node("a", "observation"), node("b", "teleporter"), node("c", "output")] }));
  assert.equal(outcome.code, "GRAPH_NODE_KIND_UNKNOWN");
  assert.match(outcome.detail, /node b has unknown kind teleporter/);
});

test("A1 the kind check is case-sensitive and exact", () => {
  assert.equal(refusal(manifest({ nodes: [node("a", "Observation")], edges: [] })).code, "GRAPH_NODE_KIND_UNKNOWN");
  assert.equal(refusal(manifest({ nodes: [node("a", "output ")], edges: [] })).code, "GRAPH_NODE_KIND_UNKNOWN");
});

test("A2 a duplicate node id keeps its landed GRAPH_MANIFEST_MALFORMED code and names the id", () => {
  const outcome = refusal(manifest({ nodes: [node("a", "observation"), node("a"), node("c", "output")] }));
  assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
  assert.match(outcome.detail, /duplicate node id a/);
});

test("A3 a duplicate port id inside one node is GRAPH_PORT_ID_DUPLICATE naming the node and the port", () => {
  const outcome = refusal(manifest({ nodes: [node("a", "observation", [port("out"), port("out")]), node("b"), node("c", "output")] }));
  assert.equal(outcome.code, "GRAPH_PORT_ID_DUPLICATE");
  assert.match(outcome.detail, /node a declares port out more than once/);
});

test("A3 the same port id on two different nodes is allowed", () => {
  const value = manifest({ nodes: [node("a", "observation", [port("p")]), node("b", "pure-transform", [port("p")]), node("c", "output")], edges: [edge("a", "b", { fromPort: "p", toPort: "p" }), edge("b", "c")] });
  assert.deepEqual(validatePolicyGraph(value), { ok: true });
});

test("A3 an edge naming a port its source or target node does not declare is GRAPH_PORT_UNRESOLVED naming the port", () => {
  const nodes = [node("a", "observation", [port("out")]), node("b", "pure-transform", [port("in")]), node("c", "output")];
  const missingSource = refusal(manifest({ nodes, edges: [edge("a", "b", { fromPort: "ghost", toPort: "in" }), edge("b", "c")] }));
  assert.equal(missingSource.code, "GRAPH_PORT_UNRESOLVED");
  assert.match(missingSource.detail, /port ghost that node a does not declare/);
  const missingTarget = refusal(manifest({ nodes, edges: [edge("a", "b", { fromPort: "out", toPort: "phantom" }), edge("b", "c")] }));
  assert.equal(missingTarget.code, "GRAPH_PORT_UNRESOLVED");
  assert.match(missingTarget.detail, /port phantom that node b does not declare/);
  const noPortsAtAll = refusal(manifest({ edges: [edge("a", "b", { fromPort: "out" }), edge("b", "c")] }));
  assert.equal(noPortsAtAll.code, "GRAPH_PORT_UNRESOLVED");
});

test("A3 an edge joining ports with a different schemaRef or temporal is GRAPH_PORT_SCHEMA_INCOMPATIBLE naming both sides", () => {
  const withPorts = (target: PolicyGraphPort) => manifest({
    nodes: [node("a", "observation", [port("out", "schema:a", "instant")]), node("b", "pure-transform", [target]), node("c", "output")],
    edges: [edge("a", "b", { fromPort: "out", toPort: target.id }), edge("b", "c")],
  });
  const schemaClash = refusal(withPorts(port("in", "schema:other", "instant")));
  assert.equal(schemaClash.code, "GRAPH_PORT_SCHEMA_INCOMPATIBLE");
  assert.match(schemaClash.detail, /schema:a\/instant to schema:other\/instant/);
  const temporalClash = refusal(withPorts(port("in", "schema:a", "delayed")));
  assert.equal(temporalClash.code, "GRAPH_PORT_SCHEMA_INCOMPATIBLE");
  assert.match(temporalClash.detail, /schema:a\/instant to schema:a\/delayed/);
  assert.deepEqual(validatePolicyGraph(withPorts(port("in", "schema:a", "instant"))), { ok: true });
});

test("A3 an edge naming only one port resolves that port and skips the compatibility join", () => {
  const value = manifest({ nodes: [node("a", "observation", [port("out")]), node("b"), node("c", "output")], edges: [edge("a", "b", { fromPort: "out" }), edge("b", "c")] });
  assert.deepEqual(validatePolicyGraph(value), { ok: true });
});

test("A3 hostile port shapes are GRAPH_MANIFEST_MALFORMED and never throw", () => {
  const malformed = (ports: unknown) => {
    const outcome = refusal(hostile({ nodes: [{ id: "a", kind: "observation", ports }] }));
    assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
    assert.match(outcome.detail, /port/);
  };
  malformed("abc");
  malformed({ length: 1 });
  malformed([null]);
  malformed(["p"]);
  malformed([{ id: 1, schemaRef: "s", temporal: "instant" }]);
  malformed([{ id: "p", schemaRef: 2, temporal: "instant" }]);
  malformed([{ id: "p", schemaRef: "s", temporal: "sometimes" }]);
  const badEdgePort = refusal(hostile({ edges: [{ from: "a", to: "b", temporal: "instant", fromPort: 3 }] }));
  assert.equal(badEdgePort.code, "GRAPH_MANIFEST_MALFORMED");
  assert.match(badEdgePort.detail, /fromPort/);
  const badToPort = refusal(hostile({ edges: [{ from: "a", to: "b", temporal: "instant", toPort: {} }] }));
  assert.equal(badToPort.code, "GRAPH_MANIFEST_MALFORMED");
  assert.match(badToPort.detail, /toPort/);
});

test("A4 a supplied registry refuses an implementation ref it lacks, naming the ref", () => {
  const value = manifest({ implementationRefs: ["impl:known", "impl:missing"] });
  const outcome = refusal(value, new Set(["impl:known"]));
  assert.equal(outcome.code, "GRAPH_IMPLEMENTATION_UNRESOLVED");
  assert.match(outcome.detail, /implementation ref impl:missing is absent from the supplied registry/);
  assert.deepEqual(validatePolicyGraph(value, { implementationRegistry: new Set(["impl:known", "impl:missing"]) }), { ok: true });
});

test("A4 an empty registry refuses every ref and a non-array implementationRefs is malformed once a registry is supplied", () => {
  assert.equal(refusal(manifest({ implementationRefs: ["impl:x"] }), new Set<string>()).code, "GRAPH_IMPLEMENTATION_UNRESOLVED");
  const outcome = validatePolicyGraph(hostile({ implementationRefs: "impl:x" }), { implementationRegistry: new Set(["impl:x"]) });
  assert.equal(outcome.ok, false);
  if (!outcome.ok) assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
});

test("A4 the policy-graph module never loads or executes an implementation ref", () => {
  const source = readFileSync(join(here, "../src/policy-graph.ts"), "utf8");
  for (const forbidden of ["import(", "require(", "new Function", "eval("]) assert.equal(source.includes(forbidden), false, forbidden);
});

test("A5 a well-formed manifest using all nine kinds, ports and resolved refs validates and compiles", () => {
  const nodes = POLICY_GRAPH_NODE_KINDS.map((kind, index) => node(`n${index}`, kind, [port("in"), port("out")]));
  const edges = nodes.slice(1).map((_, index) => edge(`n${index}`, `n${index + 1}`, { fromPort: "out", toPort: "in" }));
  const value = manifest({ nodes, edges, implementationRefs: ["impl:one", "impl:two"] });
  const registry = new Set(["impl:one", "impl:two", "impl:spare"]);
  assert.deepEqual(validatePolicyGraph(value, { implementationRegistry: registry }), { ok: true });
  const plan = compilePolicyGraph(value, { implementationRegistry: registry });
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.deepEqual(plan.order, nodes.map(entry => entry.id));
});

test("A5 with no options argument arbitrary implementation refs validate exactly as before", () => {
  const value = manifest({ implementationRefs: ["anything at all", ""] });
  assert.deepEqual(validatePolicyGraph(value), { ok: true });
  assert.deepEqual(validatePolicyGraph(value, {}), { ok: true });
  assert.deepEqual(validatePolicyGraph(value, { implementationRegistry: undefined }), { ok: true });
});

test("A5 the landed refusal codes stay unchanged for cycle, malformed and unbounded-delay manifests", () => {
  assert.equal(refusal(manifest({ edges: [edge("a", "b"), edge("b", "a"), edge("b", "c")] })).code, "GRAPH_INSTANTANEOUS_CYCLE");
  assert.equal(refusal(manifest({ graphId: " " })).code, "GRAPH_MANIFEST_MALFORMED");
  assert.equal(refusal(manifest({ edges: [edge("a", "b"), edge("b", "c"), edge("c", "a", { temporal: "delayed" })] })).code, "GRAPH_DELAYED_CYCLE_UNBOUNDED");
});

test("A5 compilePolicyGraph forwards the new refusal codes and the registry unchanged", () => {
  const unknownKind = compilePolicyGraph(manifest({ nodes: [node("a", "observation"), node("b", "nope"), node("c", "output")] }));
  assert.equal(unknownKind.ok, false);
  if (!unknownKind.ok) assert.equal(unknownKind.code, "GRAPH_NODE_KIND_UNKNOWN");
  const unresolved = compilePolicyGraph(manifest({ implementationRefs: ["impl:x"] }), { implementationRegistry: new Set<string>() });
  assert.equal(unresolved.ok, false);
  if (!unresolved.ok) assert.equal(unresolved.code, "GRAPH_IMPLEMENTATION_UNRESOLVED");
  assert.equal(compilePolicyGraph(manifest({ implementationRefs: ["impl:x"] })).ok, true);
});
