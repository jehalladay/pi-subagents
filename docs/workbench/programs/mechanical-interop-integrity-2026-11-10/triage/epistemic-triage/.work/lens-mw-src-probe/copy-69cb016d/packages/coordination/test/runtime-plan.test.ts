import { strict as assert } from "node:assert";
import { test } from "node:test";
import { compilePolicyGraph, planInvalidation, recordRuntimePlan } from "../dist/index.js";
import type { GraphMutation, PolicyGraphManifest, RewriteChange } from "../dist/index.js";

const manifest: PolicyGraphManifest = {
  schema: "mw.policy-graph.v1", graphId: "g-1", revision: "g-1@4", parentRevision: "g-1@3", exactBasisPolicy: "fifo",
  requiredContracts: ["contract:budget-cap"], implementationRefs: ["impl:fifo"],
  nodes: [{ id: "n-fifo", kind: "deterministic-policy" }, { id: "n-guard", kind: "guard-inhibitor" }, { id: "n-sink", kind: "deterministic-policy" }],
  edges: [{ from: "n-fifo", to: "n-guard", temporal: "instant" }, { from: "n-guard", to: "n-sink", temporal: "instant" }],
};
const change = (kind: RewriteChange["kind"], id: string, op: RewriteChange["op"] = "modify"): RewriteChange => ({ kind, id, op });
function mutation(changes: readonly RewriteChange[], overrides: Partial<GraphMutation> = {}): GraphMutation {
  return { graphId: "g-1", candidateId: "cand-1", parentRevision: "g-1@4", changes, requiredCertificates: ["contract:budget-cap"], ...overrides };
}
function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("a runtime plan record carries the compiled order and names the structural dependencies it was compiled from", () => {
  const record = recordRuntimePlan(manifest);
  assert.equal(record.ok, true);
  if (!record.ok) return;
  const plan = record.plan;
  assert.equal(plan.schema, "mw.runtime-plan.v0");
  assert.equal(plan.graphId, "g-1");
  assert.equal(plan.revision, "g-1@4");
  const compiled = compilePolicyGraph(manifest);
  assert.deepEqual(plan.order, compiled.ok ? compiled.order : []);
  assert.deepEqual(plan.dependsOn, { nodes: ["n-fifo", "n-guard", "n-sink"], edges: ["n-fifo->n-guard", "n-guard->n-sink"] });
});

test("a graph that does not compile yields no runtime plan, with the compiler's own refusal", () => {
  const cyclic: PolicyGraphManifest = { ...manifest, edges: [...manifest.edges, { from: "n-sink", to: "n-fifo", temporal: "instant" }] };
  const record = recordRuntimePlan(cyclic);
  assert.equal(record.ok, false);
  if (record.ok) return;
  assert.equal(record.code, "RUNTIME_PLAN_UNCOMPILABLE");
  assert.match(record.detail, /GRAPH_INSTANTANEOUS_CYCLE/);
});

test("a structural mutation of the plan's graph revision invalidates the plan and names what it touched", () => {
  const record = recordRuntimePlan(manifest);
  assert.ok(record.ok);
  if (!record.ok) return;
  const removed = planInvalidation(record.plan, mutation([change("node", "n-guard", "remove")]));
  assert.deepEqual(removed, { invalidated: true, reason: "STRUCTURE_TOUCHED", touched: ["node:n-guard"] });
  const edge = planInvalidation(record.plan, mutation([change("edge", "n-fifo->n-sink", "add")]));
  assert.deepEqual(edge, { invalidated: true, reason: "STRUCTURE_TOUCHED", touched: ["edge:n-fifo->n-sink"] });
  const added = planInvalidation(record.plan, mutation([change("node", "n-new", "add")]));
  assert.equal(added.invalidated, true, "a new node changes the order the plan was compiled into");
});

test("a port change counts through the node it belongs to", () => {
  const record = recordRuntimePlan(manifest);
  if (!record.ok) throw new Error("fixture");
  const port = planInvalidation(record.plan, mutation([change("port", "n-guard.in")]));
  assert.deepEqual(port, { invalidated: true, reason: "STRUCTURE_TOUCHED", touched: ["port:n-guard.in"] });
  const foreign = planInvalidation(record.plan, mutation([change("port", "n-elsewhere.in")]));
  assert.equal(foreign.invalidated, true, "a port of a node the plan does not know still changes the graph the plan was compiled from");
});

test("dependency negative controls: another graph, another revision, or a certificate-only change leave the plan valid", () => {
  const record = recordRuntimePlan(manifest);
  if (!record.ok) throw new Error("fixture");
  assert.deepEqual(planInvalidation(record.plan, mutation([change("node", "n-guard", "remove")], { graphId: "g-2" })), { invalidated: false, reason: "GRAPH_MISMATCH", touched: [] });
  assert.deepEqual(planInvalidation(record.plan, mutation([change("node", "n-guard", "remove")], { parentRevision: "g-1@5" })), { invalidated: false, reason: "REVISION_MISMATCH", touched: [] });
  assert.deepEqual(planInvalidation(record.plan, mutation([change("contract", "contract:budget-cap"), change("verifier", "verifier:x")])), { invalidated: false, reason: "NO_STRUCTURAL_DEPENDENCY_TOUCHED", touched: [] });
  assert.deepEqual(planInvalidation(record.plan, mutation([])), { invalidated: false, reason: "NO_STRUCTURAL_DEPENDENCY_TOUCHED", touched: [] });
});

test("invalidation is about the plan, not the certificate: the same certificate-only mutation that leaves the plan valid still names no structural dependency", () => {
  const record = recordRuntimePlan(manifest);
  if (!record.ok) throw new Error("fixture");
  const mixed = planInvalidation(record.plan, mutation([change("contract", "contract:budget-cap"), change("edge", "n-guard->n-sink", "remove")]));
  assert.deepEqual(mixed, { invalidated: true, reason: "STRUCTURE_TOUCHED", touched: ["edge:n-guard->n-sink"] });
});

test("recording and invalidation are deterministic, pure and mint no identifier", () => {
  const before = JSON.stringify(manifest);
  const first = recordRuntimePlan(manifest);
  const second = recordRuntimePlan({ ...manifest, nodes: [...manifest.nodes].reverse(), edges: [...manifest.edges].reverse() });
  assert.equal(JSON.stringify(manifest), before);
  if (!first.ok || !second.ok) throw new Error("fixture");
  assert.deepEqual(first.plan.dependsOn, second.plan.dependsOn);
  const known = new Set([...stringLeaves(manifest), first.plan.schema, "->"]);
  for (const node of first.plan.dependsOn.nodes) assert.ok(known.has(node));
  for (const edge of first.plan.dependsOn.edges) for (const part of edge.split("->")) assert.ok(known.has(part), `minted ${part}`);
  const m = mutation([change("node", "n-sink", "modify"), change("node", "n-fifo", "modify")]);
  assert.equal(JSON.stringify(planInvalidation(first.plan, m)), JSON.stringify(planInvalidation(first.plan, { ...m, changes: [...m.changes].reverse() })));
});

test("an authority-only mutation of the plan's own graph revision leaves the plan valid (authority is a negative control, not structure)", () => {
  const record = recordRuntimePlan(manifest);
  if (!record.ok) throw new Error("fixture");
  assert.deepEqual(planInvalidation(record.plan, mutation([change("authority", "authority:budget-owner")])), { invalidated: false, reason: "NO_STRUCTURAL_DEPENDENCY_TOUCHED", touched: [] });
});

test("graph mismatch outranks revision mismatch: a mutation of another graph at another revision reports GRAPH_MISMATCH", () => {
  const record = recordRuntimePlan(manifest);
  if (!record.ok) throw new Error("fixture");
  const both = planInvalidation(record.plan, mutation([change("node", "n-guard", "remove")], { graphId: "g-2", parentRevision: "g-2@9" }));
  assert.deepEqual(both, { invalidated: false, reason: "GRAPH_MISMATCH", touched: [] });
});

test("an uncompilable graph carries the compiler's full detail, not only its code", () => {
  const cyclic: PolicyGraphManifest = { ...manifest, edges: [...manifest.edges, { from: "n-sink", to: "n-fifo", temporal: "instant" }] };
  const record = recordRuntimePlan(cyclic);
  assert.equal(record.ok, false);
  if (record.ok) return;
  assert.match(record.detail, /^GRAPH_INSTANTANEOUS_CYCLE: cycle of instantaneous edges: /);
  for (const id of ["n-fifo", "n-guard", "n-sink"]) assert.ok(record.detail.includes(id), `detail names ${id}`);
});

test("a manifest carrying the same instant edge twice lists that edge key once", () => {
  const parallel: PolicyGraphManifest = { ...manifest, edges: [...manifest.edges, { from: "n-fifo", to: "n-guard", temporal: "instant" }] };
  assert.equal(parallel.edges.length, 3);
  const record = recordRuntimePlan(parallel);
  assert.ok(record.ok);
  if (!record.ok) return;
  assert.deepEqual(record.plan.dependsOn.edges, ["n-fifo->n-guard", "n-guard->n-sink"]);
});

test("recording leaves a manifest whose nodes and edges are not id-sorted untouched", () => {
  const unsorted: PolicyGraphManifest = { ...manifest, nodes: [...manifest.nodes].reverse(), edges: [...manifest.edges].reverse() };
  const order = (m: PolicyGraphManifest) => ({ nodes: m.nodes.map(node => node.id), edges: m.edges.map(edge => `${edge.from}->${edge.to}`) });
  assert.deepEqual(order(unsorted).nodes, ["n-sink", "n-guard", "n-fifo"], "fixture is reverse-sorted");
  const before = JSON.stringify(unsorted);
  const record = recordRuntimePlan(unsorted);
  assert.ok(record.ok);
  assert.equal(JSON.stringify(unsorted), before);
  assert.deepEqual(order(unsorted).nodes, ["n-sink", "n-guard", "n-fifo"]);
  if (!record.ok) return;
  assert.deepEqual(record.plan.dependsOn.nodes, ["n-fifo", "n-guard", "n-sink"], "the record is sorted even though its input is not");
});
