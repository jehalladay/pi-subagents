// MechanicalWorkflows-nymi (APO-EAT-R009): the mw.policy-graph.v1 validator rejects cycles made
// only of instantaneous edges (GRAPH_INSTANTANEOUS_CYCLE) and delayed cycles lacking a declared
// bounded memory (GRAPH_DELAYED_CYCLE_UNBOUNDED); a bounded delayed cycle validates. The
// compiler refuses any manifest with delayed edges (GRAPH_UNSUPPORTED_EDGE) until a typed
// delayed-edge operator exists in combinators.ts.
import test from "node:test";
import assert from "node:assert/strict";
import { validatePolicyGraph, compilePolicyGraph } from "../dist/index.js";
import type { PolicyGraphManifest, PolicyGraphEdge } from "../dist/index.js";

const node = (id: string, kind = "pure-transform") => ({ id, kind });
const edge = (from: string, to: string, over: Partial<PolicyGraphEdge> = {}): PolicyGraphEdge => ({
  from, to, temporal: "instant", ...over,
});
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

test("an acyclic instantaneous manifest validates and compiles to a plan naming its evaluation order", () => {
  const value = manifest();
  assert.deepEqual(validatePolicyGraph(value), { ok: true });
  const plan = compilePolicyGraph(value);
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.deepEqual(plan.order, ["a", "b", "c"]);
});

test("a 2-node cycle of instantaneous edges is GRAPH_INSTANTANEOUS_CYCLE naming the cycle", () => {
  const value = manifest({ edges: [edge("a", "b"), edge("b", "a"), edge("b", "c")] });
  const outcome = validatePolicyGraph(value);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_INSTANTANEOUS_CYCLE");
  assert.equal(outcome.detail, "cycle of instantaneous edges: a -> b -> a");
});

test("a delayed cycle without a declared bounded memory is GRAPH_DELAYED_CYCLE_UNBOUNDED", () => {
  const value = manifest({ edges: [edge("a", "b"), edge("b", "a", { temporal: "delayed" }), edge("b", "c")] });
  const outcome = validatePolicyGraph(value);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_DELAYED_CYCLE_UNBOUNDED");
});

test("a delayed cycle with an explicit bounded memory validates, and the bound must be a positive integer", () => {
  const bounded = manifest({ edges: [edge("a", "b"), edge("b", "a", { temporal: "delayed", memory: { boundedSteps: 4 } }), edge("b", "c")] });
  assert.deepEqual(validatePolicyGraph(bounded), { ok: true });
  const zero = manifest({ edges: [edge("a", "b"), edge("b", "a", { temporal: "delayed", memory: { boundedSteps: 0 } }), edge("b", "c")] });
  const outcome = validatePolicyGraph(zero);
  assert.equal(outcome.ok === false && outcome.code, "GRAPH_DELAYED_CYCLE_UNBOUNDED");
});

test("the compiler refuses any manifest carrying a delayed edge with GRAPH_UNSUPPORTED_EDGE until the typed operator exists", () => {
  const bounded = manifest({ edges: [edge("a", "b"), edge("b", "a", { temporal: "delayed", memory: { boundedSteps: 4 } }), edge("b", "c")] });
  assert.deepEqual(validatePolicyGraph(bounded), { ok: true });
  const plan = compilePolicyGraph(bounded);
  assert.equal(plan.ok, false);
  if (plan.ok) return;
  assert.equal(plan.code, "GRAPH_UNSUPPORTED_EDGE");
  assert.match(plan.detail, /delayed/);
});

test("structural breakage is GRAPH_MANIFEST_MALFORMED naming the defect", () => {
  const cases: [Partial<PolicyGraphManifest>, RegExp][] = [
    [{ schema: "other.v1" as never }, /schema/],
    [{ nodes: [] }, /nodes/],
    [{ nodes: [node("a"), node("a"), node("c")] }, /duplicate/],
    [{ edges: [edge("a", "ghost")] }, /ghost/],
    [{ graphId: " " }, /graphId/],
  ];
  for (const [over, pattern] of cases) {
    const outcome = validatePolicyGraph(manifest(over));
    assert.equal(outcome.ok, false, JSON.stringify(over));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
    assert.match(outcome.detail, pattern);
  }
});

test("the compiler refuses a manifest the validator refuses, never compiling an invalid graph", () => {
  const cyclic = manifest({ edges: [edge("a", "b"), edge("b", "a"), edge("b", "c")] });
  const plan = compilePolicyGraph(cyclic);
  assert.equal(plan.ok, false);
  if (plan.ok) return;
  assert.equal(plan.code, "GRAPH_INSTANTANEOUS_CYCLE");
});

// MechanicalWorkflows-1jww: ten laws of the landed nymi guard that survived mutation, pinned test-only.
const unbounded = (steps: number) => manifest({
  edges: [
    edge("a", "b", { temporal: "delayed", memory: { boundedSteps: steps } }),
    edge("b", "a", { temporal: "delayed", memory: { boundedSteps: steps } }),
    edge("b", "c"),
  ],
});

test("a blank revision is GRAPH_MANIFEST_MALFORMED naming the revision", () => {
  for (const revision of ["", "  "]) {
    const outcome = validatePolicyGraph(manifest({ revision }));
    assert.equal(outcome.ok, false, JSON.stringify(revision));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
    assert.match(outcome.detail, /revision/);
  }
});

test("a node with a blank id or a blank kind is GRAPH_MANIFEST_MALFORMED reporting blank", () => {
  const cases: Partial<PolicyGraphManifest>[] = [
    { nodes: [node("a"), node("b"), node("c"), { id: "", kind: "pure-transform" }] },
    { nodes: [node("a"), node("b"), node("c", "")] },
  ];
  for (const over of cases) {
    const outcome = validatePolicyGraph(manifest(over));
    assert.equal(outcome.ok, false, JSON.stringify(over));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
    assert.match(outcome.detail, /blank/);
  }
});

test("an edge temporal outside the closed enum is GRAPH_MANIFEST_MALFORMED naming temporal", () => {
  const outcome = validatePolicyGraph(manifest({ edges: [edge("a", "b", { temporal: "eventually" as never })] }));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
  assert.match(outcome.detail, /temporal/);
});

test("a delayed cycle bound must be a positive integer: 1.5, NaN and Infinity are unbounded, 1 validates", () => {
  for (const steps of [1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    const outcome = validatePolicyGraph(unbounded(steps));
    assert.equal(outcome.ok, false, String(steps));
    if (outcome.ok) continue;
    assert.equal(outcome.code, "GRAPH_DELAYED_CYCLE_UNBOUNDED", String(steps));
  }
  assert.deepEqual(validatePolicyGraph(unbounded(1)), { ok: true });
});

test("the instantaneous cycle detail names exactly the cycle and never the tail leading into it", () => {
  const value = manifest({
    nodes: [node("pre"), node("a"), node("b"), node("c")],
    edges: [edge("pre", "a"), edge("a", "b"), edge("b", "a")],
  });
  const outcome = validatePolicyGraph(value);
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_INSTANTANEOUS_CYCLE");
  assert.equal(outcome.detail, "cycle of instantaneous edges: a -> b -> a");
  assert.doesNotMatch(outcome.detail, /pre/);
});

test("an instantaneous self-loop is GRAPH_INSTANTANEOUS_CYCLE", () => {
  const outcome = validatePolicyGraph(manifest({ edges: [edge("a", "b"), edge("b", "b")] }));
  assert.equal(outcome.ok, false);
  if (outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_INSTANTANEOUS_CYCLE");
  assert.equal(outcome.detail, "cycle of instantaneous edges: b -> b");
});

test("the compiler orders nodes topologically, not by declaration order", () => {
  const value = manifest({ nodes: [node("c", "output"), node("b"), node("a", "observation")], edges: [edge("a", "b"), edge("b", "c")] });
  const plan = compilePolicyGraph(value);
  assert.equal(plan.ok, true);
  if (!plan.ok) return;
  assert.deepEqual(plan.order, ["a", "b", "c"]);
});

test("an acyclic delayed edge without memory validates yet compiles to GRAPH_UNSUPPORTED_EDGE", () => {
  const value = manifest({ edges: [edge("a", "b", { temporal: "delayed" }), edge("b", "c")] });
  assert.deepEqual(validatePolicyGraph(value), { ok: true });
  const plan = compilePolicyGraph(value);
  assert.equal(plan.ok, false);
  if (plan.ok) return;
  assert.equal(plan.code, "GRAPH_UNSUPPORTED_EDGE");
  assert.match(plan.detail, /a -> b/);
});

test("the compiler forwards the validator's code instead of relabelling it", () => {
  const empty = compilePolicyGraph(manifest({ nodes: [] }));
  assert.equal(empty.ok, false);
  if (!empty.ok) assert.equal(empty.code, "GRAPH_MANIFEST_MALFORMED");
  const open = compilePolicyGraph(manifest({ edges: [edge("a", "b"), edge("b", "a", { temporal: "delayed" }), edge("b", "c")] }));
  assert.equal(open.ok, false);
  if (!open.ok) assert.equal(open.code, "GRAPH_DELAYED_CYCLE_UNBOUNDED");
});

test("an edge from an unknown node refuses naming it, never throwing", () => {
  let outcome: ReturnType<typeof validatePolicyGraph> | undefined;
  assert.doesNotThrow(() => { outcome = validatePolicyGraph(manifest({ edges: [edge("ghost", "a")] })); });
  assert.equal(outcome?.ok, false);
  if (outcome === undefined || outcome.ok) return;
  assert.equal(outcome.code, "GRAPH_MANIFEST_MALFORMED");
  assert.match(outcome.detail, /ghost/);
});
