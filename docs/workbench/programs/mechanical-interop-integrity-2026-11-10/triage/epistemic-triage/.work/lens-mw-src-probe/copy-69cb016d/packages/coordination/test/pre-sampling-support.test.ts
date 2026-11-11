// MechanicalWorkflows-hnqv.1 (GPC claim adapter-enumerates-pre-sampling-support-exports-graphdatair).
// Evidence grade FIXTURE: no assertion here earns a native grade. A1: the enumerated support is
// finite, typed and a subset of the handed vocabulary, every member legal under the capacity and
// permission inputs supplied at proposal time. A2: the result can populate
// DecisionReceipt.support, and absent inputs keep the literal "unknown". A3: the export is
// bounded and role-aware with source ids that round-trip through graphPolicyAdapter. A4: a
// post-admission mask offered as support is refused, and an unknown node kind fails closed.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  enumeratePreSamplingSupport, exportRoleAwareGraph, withPreSamplingSupport,
  buildDecisionReceipts, validateDecisionReceipt, exportEpisodeForTraining, graphPolicyAdapter,
} from "../dist/index.js";
import type { Episode, GraphDataNode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const episode = JSON.parse(readFileSync(join(here, "../../../qa/integration/python-consumer/fixtures/episode-landing-queue-seed7.json"), "utf8")) as Episode;

const nodes: GraphDataNode[] = [
  { sourceId: "agent:worker-1", kind: "agent" },
  { sourceId: "agent:worker-2", kind: "agent" },
  { sourceId: "task:restack-c1", kind: "task" },
  { sourceId: "resource:lane-1", kind: "resource" },
  { sourceId: "artifact:candidate-c1", kind: "artifact" },
  { sourceId: "capability:land", kind: "capability" },
];
const inputs = {
  graph: { nodes },
  capacity: { "agent:worker-1": 2, "agent:worker-2": 0, "task:restack-c1": 1, "resource:lane-1": 3, "artifact:candidate-c1": 1, "capability:land": 1 },
  permitted: { "agent:worker-1": true, "agent:worker-2": true, "task:restack-c1": true, "resource:lane-1": false, "artifact:candidate-c1": true, "capability:land": true },
};
const support = (over: Record<string, unknown> = {}) => enumeratePreSamplingSupport({ ...inputs, ...over } as never);
const action = () => ({ effect: "assignment.propose", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [], readScopes: [] });

test("A1: the support keeps exactly the vocabulary members with positive capacity and permission, in vocabulary order", () => {
  const result = support();
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.support, ["agent:worker-1", "task:restack-c1", "artifact:candidate-c1", "capability:land"]);
  assert.ok(result.support.every(id => nodes.some(node => node.sourceId === id)), "a subset of the handed vocabulary");
  assert.ok(!result.support.includes("agent:worker-2"), "zero capacity is not legal");
  assert.ok(!result.support.includes("resource:lane-1"), "a denied permission is not legal");
});

test("A1: an id the capacity or permission input omits is never legal, and a malformed capacity is refused by name", () => {
  const sparse = support({ capacity: { "agent:worker-1": 1 }, permitted: { "agent:worker-1": true, "task:restack-c1": true } });
  assert.deepEqual(sparse.ok && sparse.support, ["agent:worker-1"]);
  for (const bad of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(() => support({ capacity: { ...inputs.capacity, "agent:worker-1": bad } }), /PRE_SAMPLING_CAPACITY_INVALID/, String(bad));
  }
  assert.throws(() => support({ capacity: { ...inputs.capacity, "agent:ghost": 1 } }), /PRE_SAMPLING_SOURCE_UNKNOWN/);
  assert.throws(() => support({ permitted: { ...inputs.permitted, "task:ghost": true } }), /PRE_SAMPLING_SOURCE_UNKNOWN/);
});

test("A1: nothing legal is a stated empty result, never an invented support", () => {
  const none = support({ permitted: {} });
  assert.equal(none.ok, false);
  assert.equal(none.ok ? "" : none.code, "PRE_SAMPLING_SUPPORT_EMPTY");
});

test("A2: the result populates DecisionReceipt.support and the receipt still validates", () => {
  const [base] = buildDecisionReceipts(episode);
  assert.equal(base!.support, "unknown");
  const filled = withPreSamplingSupport(base!, support());
  assert.deepEqual(filled.support, ["agent:worker-1", "task:restack-c1", "artifact:candidate-c1", "capability:land"]);
  assert.deepEqual(validateDecisionReceipt(filled), { ok: true });
  assert.equal(base!.support, "unknown", "the input receipt is never mutated");
});

test("A2: absent inputs and an empty support keep the literal unknown, never a fabricated set", () => {
  const [base] = buildDecisionReceipts(episode);
  for (const absent of [
    enumeratePreSamplingSupport({ graph: { nodes } } as never),
    enumeratePreSamplingSupport({ graph: { nodes }, capacity: inputs.capacity } as never),
    enumeratePreSamplingSupport({ graph: { nodes }, permitted: inputs.permitted } as never),
  ]) {
    assert.equal(absent.ok, false);
    assert.equal(absent.ok ? "" : absent.code, "PRE_SAMPLING_INPUT_ABSENT");
    assert.equal(withPreSamplingSupport(base!, absent).support, "unknown");
  }
  assert.equal(withPreSamplingSupport(base!, support({ permitted: {} })).support, "unknown");
});

test("A4 negative control: a post-admission mask offered as pre-sampling support is refused, never recorded", () => {
  const [base] = buildDecisionReceipts(episode);
  const mask = exportEpisodeForTraining(episode).steps[0]!.mask;
  assert.throws(() => withPreSamplingSupport(base!, mask as never), /PRE_SAMPLING_SUPPORT_POST_ADMISSION/);
  assert.throws(() => withPreSamplingSupport(base!, { ok: true, origin: "pre-sampling-enumerator", support: [...mask.admitted] } as never), /PRE_SAMPLING_OFFER_INVALID/, "a hand-built result is not an enumerator result");
  assert.throws(() => withPreSamplingSupport(base!, { ...support(), support: ["task:forged"] } as never), /PRE_SAMPLING_OFFER_INVALID/, "a copied-and-edited result is not an enumerator result");
  assert.equal(base!.support, "unknown");
});

const roleKinds = { planner: ["task", "capability"], worker: ["agent", "resource", "artifact"] } as const;

test("A3: the export keeps only the kinds the role may see, in vocabulary order, with exact source ids", () => {
  const out = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds, maxNodes: 4 });
  assert.equal(out.role, "planner");
  assert.deepEqual(out.graph.nodes, [{ sourceId: "task:restack-c1", kind: "task" }, { sourceId: "capability:land", kind: "capability" }]);
  const worker = exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds, maxNodes: 4 });
  assert.deepEqual(worker.graph.nodes.map(node => node.sourceId), ["agent:worker-1", "agent:worker-2", "resource:lane-1", "artifact:candidate-c1"]);
  assert.ok(worker.graph.nodes.every(node => Object.keys(node).sort().join() === "kind,sourceId"));
});

test("A3: the stated size bound is enforced by refusal, never by silent truncation", () => {
  assert.equal(exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds, maxNodes: 4 }).graph.nodes.length, 4);
  assert.throws(() => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds, maxNodes: 3 }), /GRAPH_EXPORT_OVER_BOUND/);
  for (const bound of [0, -1, 2.5, Number.NaN]) {
    assert.throws(() => exportRoleAwareGraph({ graph: { nodes }, role: "worker", roleKinds, maxNodes: bound }), /GRAPH_EXPORT_BOUND_INVALID/, String(bound));
  }
});

test("A3: an unknown role is refused and an exported node round-trips through graphPolicyAdapter", () => {
  assert.throws(() => exportRoleAwareGraph({ graph: { nodes }, role: "auditor", roleKinds, maxNodes: 4 }), /GRAPH_EXPORT_ROLE_UNKNOWN/);
  const out = exportRoleAwareGraph({ graph: { nodes }, role: "planner", roleKinds, maxNodes: 4 });
  const adapter = graphPolicyAdapter({ basis: { workspaceId: "ws", revision: "r1" }, policyId: "gp", graph: out.graph, action });
  for (const node of out.graph.nodes) assert.equal(adapter.fromIntent(adapter.toIntent(node.sourceId)), node.sourceId);
});

test("A4 second control: an unknown node kind, a blank or duplicate id, a per-entity revision and an unknown role kind all fail closed", () => {
  const run = (ns: unknown[], kinds: unknown = roleKinds) => () => exportRoleAwareGraph({ graph: { nodes: ns as GraphDataNode[] }, role: "planner", roleKinds: kinds as never, maxNodes: 4 });
  assert.throws(run([{ sourceId: "a", kind: "mystery" }]), /GRAPH_DATA_INVALID/);
  assert.throws(run([{ sourceId: " ", kind: "task" }]), /GRAPH_DATA_INVALID/);
  assert.throws(run([{ sourceId: "a", kind: "task" }, { sourceId: "a", kind: "agent" }]), /GRAPH_DATA_INVALID/);
  assert.throws(run([{ sourceId: "a", kind: "task", revision: "r9" }]), /GRAPH_ENTITY_REVISION_UNSUPPORTED/);
  assert.throws(run([{ sourceId: "a", kind: "task" }], { planner: ["task", "mystery"] }), /GRAPH_DATA_INVALID/);
});
