// MechanicalWorkflows-l34h (APO nymi follow-up): validatePolicyGraph and compilePolicyGraph return
// a typed GRAPH_MANIFEST_MALFORMED outcome naming the offending member for a manifest whose member
// shapes violate the declared type (missing nodes, numeric graphId, non-array edges, non-object
// nodes or edges), and decide a very deep acyclic or cyclic instantaneous chain without
// overflowing the call stack. None of these inputs may throw.
import test from "node:test";
import assert from "node:assert/strict";
import { validatePolicyGraph, compilePolicyGraph } from "../dist/index.js";
import type { PolicyGraphManifest, PolicyGraphEdge } from "../dist/index.js";

const node = (id: string, kind = "pure-transform") => ({ id, kind });
const edge = (from: string, to: string, over: Partial<PolicyGraphEdge> = {}): PolicyGraphEdge => ({
  from, to, temporal: "instant", ...over,
});
const base = (): Record<string, unknown> => ({
  schema: "mw.policy-graph.v1",
  graphId: "graph:fixture",
  revision: "r1",
  parentRevision: "unknown",
  exactBasisPolicy: "whole-basis",
  requiredContracts: [],
  implementationRefs: [],
  nodes: [node("a", "observation"), node("b"), node("c", "output")],
  edges: [edge("a", "b"), edge("b", "c")],
});
const hostile = (over: Record<string, unknown>): PolicyGraphManifest => ({ ...base(), ...over }) as unknown as PolicyGraphManifest;
const without = (member: string): PolicyGraphManifest => {
  const value = base();
  delete value[member];
  return value as unknown as PolicyGraphManifest;
};

function assertMalformed(value: unknown, member: string): void {
  const manifest = value as PolicyGraphManifest;
  const validated = validatePolicyGraph(manifest);
  assert.equal(validated.ok, false);
  if (validated.ok) return;
  assert.equal(validated.code, "GRAPH_MANIFEST_MALFORMED");
  assert.ok(validated.detail.includes(member), `detail names ${member}: ${validated.detail}`);
  const compiled = compilePolicyGraph(manifest);
  assert.equal(compiled.ok, false);
  if (compiled.ok) return;
  assert.equal(compiled.code, "GRAPH_MANIFEST_MALFORMED");
  assert.ok(compiled.detail.includes(member), `compile detail names ${member}: ${compiled.detail}`);
}

test("a manifest without a nodes member is GRAPH_MANIFEST_MALFORMED naming nodes, never a TypeError", () => {
  assertMalformed(without("nodes"), "nodes");
});

test("a manifest without an edges member is GRAPH_MANIFEST_MALFORMED naming edges", () => {
  assertMalformed(without("edges"), "edges");
});

test("a numeric graphId is GRAPH_MANIFEST_MALFORMED naming graphId", () => {
  assertMalformed(hostile({ graphId: 42 }), "graphId");
});

test("a non-string revision is GRAPH_MANIFEST_MALFORMED naming revision", () => {
  assertMalformed(hostile({ revision: null }), "revision");
});

test("nodes and edges that are not arrays are GRAPH_MANIFEST_MALFORMED naming the member", () => {
  assertMalformed(hostile({ nodes: "abc" }), "nodes");
  assertMalformed(hostile({ nodes: { length: 3 } }), "nodes");
  assertMalformed(hostile({ edges: { a: "b" } }), "edges");
  assertMalformed(hostile({ edges: "ab" }), "edges");
});

test("a null, array or primitive manifest is GRAPH_MANIFEST_MALFORMED", () => {
  for (const value of [null, undefined, 7, "graph", [], true]) assertMalformed(value, "manifest");
});

test("a node that is not an object or whose id or kind is not a string is GRAPH_MANIFEST_MALFORMED", () => {
  assertMalformed(hostile({ nodes: [null] }), "node");
  assertMalformed(hostile({ nodes: ["a"] }), "node");
  assertMalformed(hostile({ nodes: [{ id: 1, kind: "x" }] }), "node");
  assertMalformed(hostile({ nodes: [{ id: "a", kind: 2 }] }), "node");
});

test("an edge that is not an object or whose from or to is not a string is GRAPH_MANIFEST_MALFORMED", () => {
  assertMalformed(hostile({ edges: [null] }), "edge");
  assertMalformed(hostile({ edges: ["a"] }), "edge");
  assertMalformed(hostile({ edges: [{ from: 1, to: "b", temporal: "instant" }] }), "edge");
  assertMalformed(hostile({ edges: [{ from: "a", to: {}, temporal: "instant" }] }), "edge");
});

test("a 20000-node acyclic instantaneous chain validates and a closed 20000-node ring refuses by code, never overflowing the stack", () => {
  const count = 20000;
  const nodes = Array.from({ length: count }, (_, index) => node(`n${index}`));
  const chain = Array.from({ length: count - 1 }, (_, index) => edge(`n${index}`, `n${index + 1}`));
  assert.deepEqual(validatePolicyGraph(hostile({ nodes, edges: chain })), { ok: true });
  const ring = [...chain, edge(`n${count - 1}`, "n0")];
  const outcome = validatePolicyGraph(hostile({ nodes, edges: ring }));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_INSTANTANEOUS_CYCLE");
});

test("the iterative cycle search keeps reporting the cycle path in order", () => {
  const outcome = validatePolicyGraph(hostile({ edges: [edge("a", "b"), edge("b", "c"), edge("c", "b")] }));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_INSTANTANEOUS_CYCLE");
  assert.equal(outcome.detail, "cycle of instantaneous edges: b -> c -> b");
});

// MechanicalWorkflows-7ie8 (l34h follow-up): the edge-shape refusal has its own exact detail, distinct from the
// unknown-node detail that also contains the word "edge", and the cycle search roots over every declared node.
const EDGE_SHAPE_DETAIL = "edge is not an object with string from and to";

test("7ie8 G1: a non-string edge from or to refuses with the exact edge-shape detail on validate and compile, never the unknown-node detail", () => {
  for (const bad of [{ from: 1, to: "b", temporal: "instant" }, { from: "a", to: {}, temporal: "instant" }]) {
    const manifest = hostile({ edges: [bad] });
    const validated = validatePolicyGraph(manifest);
    assert.deepEqual(validated, { ok: false, code: "GRAPH_MANIFEST_MALFORMED", detail: EDGE_SHAPE_DETAIL });
    const compiled = compilePolicyGraph(manifest);
    assert.deepEqual(compiled, { ok: false, code: "GRAPH_MANIFEST_MALFORMED", detail: EDGE_SHAPE_DETAIL });
  }
});

test("7ie8 G2: an instantaneous cycle with no edge from the first declared node is found, naming the cycle path", () => {
  const manifest = hostile({ nodes: [node("a", "observation"), node("b"), node("c", "output")], edges: [edge("b", "c"), edge("c", "b")] });
  const expected = { ok: false, code: "GRAPH_INSTANTANEOUS_CYCLE", detail: "cycle of instantaneous edges: b -> c -> b" };
  assert.deepEqual(validatePolicyGraph(manifest), expected);
  assert.deepEqual(compilePolicyGraph(manifest), expected);
});
