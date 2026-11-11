import { strict as assert } from "node:assert";
import { test } from "node:test";
import { V1_RULE_KINDS, checkRewriteApplication, deriveRewriteCandidate, validatePolicyGraph, validateRewriteBoundary } from "../dist/index.js";
import type { PolicyGraphEdge, PolicyGraphManifest, PolicyGraphNode, RewriteRule, RuleMatch } from "../dist/index.js";

const host = (nodes: PolicyGraphNode[], edges: PolicyGraphEdge[], extra: Partial<PolicyGraphManifest> = {}): PolicyGraphManifest => ({
  schema: "mw.policy-graph.v1",
  graphId: "g1",
  revision: "r7",
  parentRevision: "r6",
  exactBasisPolicy: "p:base",
  requiredContracts: ["c:budget"],
  implementationRefs: ["impl:a"],
  nodes,
  edges,
  ...extra,
});
const n = (id: string, kind = "deterministic-policy"): PolicyGraphNode => ({ id, kind });
const e = (from: string, to: string, temporal: "instant" | "delayed" = "instant"): PolicyGraphEdge => ({ from, to, temporal });
const edgeKey = (edge: PolicyGraphEdge): string => `${edge.from}->${edge.to}:${edge.temporal}`;
const codes = (check: { refusals: readonly { code: string }[] }): string[] => check.refusals.map(r => r.code).sort();

/** The host: a -> p -> b, with a side node s -> p. */
const H = host([n("a", "observation"), n("p"), n("b", "pure-transform"), n("s", "guard-inhibitor")], [e("a", "p"), e("p", "b"), e("s", "p")]);

/** retire-policy: delete x and its incident edges, keep its neighbours. */
const retire: RewriteRule = {
  ruleId: "rule:retire",
  kind: "retire-policy",
  left: { nodes: [n("u", "observation"), n("x"), n("v", "pure-transform"), n("w", "guard-inhibitor")], edges: [e("u", "x"), e("x", "v"), e("w", "x")] },
  interface: ["u", "v", "w"],
  right: { nodes: [n("u", "observation"), n("v", "pure-transform"), n("w", "guard-inhibitor")], edges: [] },
};
const retireMatch: RuleMatch = { nodes: { u: "a", x: "p", v: "b", w: "s" }, fresh: {} };

/** add-guard: keep x, add a versioned guard g fed by x. */
const addGuard: RewriteRule = {
  ruleId: "rule:guard",
  kind: "add-guard",
  left: { nodes: [n("x")], edges: [] },
  interface: ["x"],
  right: { nodes: [n("x"), n("g", "guard-inhibitor")], edges: [e("x", "g")] },
};

test("the v1 fragment names seven typed rule kinds and nothing else; an unknown kind is refused before any matching", () => {
  assert.deepEqual([...V1_RULE_KINDS], ["specialize", "factor-duplicate", "substitute-numerical", "add-guard", "split-coarsen-view", "insert-delayed-edge", "retire-policy"]);
  assert.ok(Object.isFrozen(V1_RULE_KINDS));
  const out = checkRewriteApplication(H, { ...retire, kind: "rename" as unknown as RewriteRule["kind"] }, retireMatch);
  assert.equal(out.ok, false);
  assert.deepEqual(codes(out), ["REWRITE_RULE_KIND_UNKNOWN"]);
});

test("a complete typed match of retire-policy deletes the policy and its three matched edges, preserves the interface by host id, and derives a manifest that validates", () => {
  const check = checkRewriteApplication(H, retire, retireMatch);
  assert.equal(check.schema, "mw.rewrite-application.v0");
  assert.deepEqual(check.refusals, []);
  assert.equal(check.ok, true);
  assert.deepEqual(check.deleted, ["p"]);
  assert.deepEqual([...check.preserved].sort(), ["a", "b", "s"]);
  assert.deepEqual(check.added, []);
  const derived = deriveRewriteCandidate(H, retire, retireMatch, "r8");
  assert.equal(derived.kind, "candidate");
  if (derived.kind !== "candidate") return;
  assert.deepEqual(derived.manifest.nodes.map(x => x.id).sort(), ["a", "b", "s"]);
  assert.deepEqual(derived.manifest.edges, []);
  assert.equal(derived.manifest.revision, "r8");
  assert.equal(derived.manifest.parentRevision, "r7");
  assert.deepEqual(derived.manifest.requiredContracts, H.requiredContracts);
  assert.equal(validatePolicyGraph(derived.manifest).ok, true);
  assert.deepEqual(derived.changes.map(c => `${c.op} ${c.kind} ${c.id}`).sort(), ["remove edge a->p:instant", "remove edge p->b:instant", "remove edge s->p:instant", "remove node p"]);
});

test("DPO dangling condition: deleting a node whose host edge the rule did not match is refused and names the edge", () => {
  const partial: RewriteRule = { ...retire, left: { nodes: retire.left.nodes, edges: [e("u", "x"), e("x", "v")] } };
  const check = checkRewriteApplication(H, partial, retireMatch);
  assert.equal(check.ok, false);
  assert.deepEqual(codes(check), ["REWRITE_DANGLING_EDGE"]);
  assert.equal(check.refusals[0]!.subject, "s->p:instant");
  assert.equal(deriveRewriteCandidate(H, partial, retireMatch, "r8").kind, "refused");
});

test("DPO identification condition: two rule nodes may share a host node only when both are preserved", () => {
  const twoDeleted: RewriteRule = { ruleId: "rule:merge", kind: "factor-duplicate", left: { nodes: [n("x"), n("y")], edges: [] }, interface: [], right: { nodes: [], edges: [] } };
  const identified = checkRewriteApplication(host([n("p")], []), twoDeleted, { nodes: { x: "p", y: "p" }, fresh: {} });
  assert.deepEqual(codes(identified), ["REWRITE_IDENTIFICATION_VIOLATED"]);
  assert.equal(identified.refusals[0]!.subject, "p");
  const bothKept: RewriteRule = { ...twoDeleted, interface: ["x", "y"], right: { nodes: [n("x"), n("y")], edges: [] } };
  assert.equal(checkRewriteApplication(host([n("p")], []), bothKept, { nodes: { x: "p", y: "p" }, fresh: {} }).ok, true);
});

test("the match is typed and total: a missing image, an absent host node, a kind mismatch or an unmatched rule edge each refuse; the DPO conditions are not judged on a partial match", () => {
  assert.deepEqual(codes(checkRewriteApplication(H, retire, { nodes: { u: "a", x: "p", v: "b" }, fresh: {} })), ["REWRITE_MATCH_INCOMPLETE"]);
  assert.deepEqual(codes(checkRewriteApplication(H, retire, { nodes: { ...retireMatch.nodes, w: "zz" }, fresh: {} })), ["REWRITE_MATCH_TARGET_MISSING"]);
  const retyped: RewriteRule = { ...retire, left: { nodes: [n("u", "observation"), n("x", "guard-inhibitor"), n("v", "pure-transform"), n("w", "guard-inhibitor")], edges: retire.left.edges } };
  const mismatch = checkRewriteApplication(H, retyped, retireMatch);
  assert.deepEqual(codes(mismatch), ["REWRITE_MATCH_KIND_MISMATCH"]);
  assert.equal(mismatch.refusals[0]!.subject, "p");
  const extraEdge: RewriteRule = { ...retire, left: { nodes: retire.left.nodes, edges: [...retire.left.edges, e("u", "v")] } };
  assert.deepEqual(codes(checkRewriteApplication(H, extraEdge, retireMatch)), ["REWRITE_MATCH_EDGE_MISSING"]);
});

test("the interface K is preserved and keeps its types: a K node absent from L or R, or retyped in R, is refused", () => {
  const dropped: RewriteRule = { ...retire, right: { nodes: [n("u", "observation"), n("v", "pure-transform")], edges: [] } };
  assert.deepEqual(codes(checkRewriteApplication(H, dropped, retireMatch)), ["REWRITE_INTERFACE_UNPRESERVED"]);
  const retyped: RewriteRule = { ...retire, right: { nodes: [n("u", "observation"), n("v", "pure-transform"), n("w", "deterministic-policy")], edges: [] } };
  assert.deepEqual(codes(checkRewriteApplication(H, retyped, retireMatch)), ["REWRITE_INTERFACE_RETYPED"]);
  const notInLeft: RewriteRule = { ...retire, interface: ["u", "v", "w", "q"] };
  assert.deepEqual(codes(checkRewriteApplication(H, notInLeft, retireMatch)), ["REWRITE_INTERFACE_UNPRESERVED"]);
});

test("added nodes need fresh host ids that collide with nothing; add-guard derives a validating manifest whose changes the rewrite boundary accepts", () => {
  const match: RuleMatch = { nodes: { x: "p" }, fresh: { g: "g1" } };
  const derived = deriveRewriteCandidate(H, addGuard, match, "r8");
  assert.equal(derived.kind, "candidate");
  if (derived.kind !== "candidate") return;
  assert.deepEqual(derived.check.added, ["g1"]);
  assert.deepEqual(derived.manifest.nodes.map(x => x.id).sort(), ["a", "b", "g1", "p", "s"]);
  assert.deepEqual(derived.manifest.edges.map(edgeKey).sort(), ["a->p:instant", "p->b:instant", "p->g1:instant", "s->p:instant"]);
  assert.equal(validatePolicyGraph(derived.manifest).ok, true);
  const boundary = validateRewriteBoundary({ candidateId: "cand:guard", parentRevision: H.revision, changes: derived.changes, requiredCertificates: H.requiredContracts }, H);
  assert.equal(boundary.ok, true);
  assert.deepEqual(boundary.writable, ["edge:p->g1:instant", "node:g1"]);
  assert.deepEqual(codes(checkRewriteApplication(H, addGuard, { nodes: { x: "p" }, fresh: {} })), ["REWRITE_FRESH_ID_MISSING"]);
  assert.deepEqual(codes(checkRewriteApplication(H, addGuard, { nodes: { x: "p" }, fresh: { g: "a" } })), ["REWRITE_FRESH_ID_COLLISION"]);
});

test("an L edge between two preserved nodes that R does not keep is deleted; one that R keeps survives once", () => {
  const dropEdge: RewriteRule = { ruleId: "rule:drop", kind: "specialize", left: { nodes: [n("x", "observation"), n("y")], edges: [e("x", "y")] }, interface: ["x", "y"], right: { nodes: [n("x", "observation"), n("y")], edges: [] } };
  const dropped = deriveRewriteCandidate(H, dropEdge, { nodes: { x: "a", y: "p" }, fresh: {} }, "r8");
  assert.equal(dropped.kind, "candidate");
  if (dropped.kind !== "candidate") return;
  assert.deepEqual(dropped.manifest.edges.map(edgeKey).sort(), ["p->b:instant", "s->p:instant"]);
  assert.deepEqual(dropped.changes.map(c => `${c.op} ${c.kind} ${c.id}`), ["remove edge a->p:instant"]);
  const keepEdge: RewriteRule = { ...dropEdge, right: { ...dropEdge.right, edges: [e("x", "y")] } };
  const kept = deriveRewriteCandidate(H, keepEdge, { nodes: { x: "a", y: "p" }, fresh: {} }, "r8");
  assert.equal(kept.kind, "candidate");
  if (kept.kind !== "candidate") return;
  assert.deepEqual(kept.manifest.edges.map(edgeKey).sort(), H.edges.map(edgeKey).sort());
  assert.deepEqual(kept.changes, []);
});

test("a derived manifest that the graph validator refuses is a refused rewrite carrying the graph code: a delayed edge closing a cycle without bounded memory", () => {
  const delayedBack: RewriteRule = {
    ruleId: "rule:delay",
    kind: "insert-delayed-edge",
    left: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [] },
    interface: ["x", "y"],
    right: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [e("y", "x", "delayed")] },
  };
  const match: RuleMatch = { nodes: { x: "a", y: "b" }, fresh: {} };
  const unbounded = deriveRewriteCandidate(H, delayedBack, match, "r8");
  assert.equal(unbounded.kind, "refused");
  if (unbounded.kind !== "refused") return;
  assert.deepEqual(codes(unbounded.check), ["REWRITE_RESULT_INVALID"]);
  assert.match(unbounded.check.refusals[0]!.detail, /GRAPH_DELAYED_CYCLE_UNBOUNDED/);
  const bounded: RewriteRule = { ...delayedBack, right: { ...delayedBack.right, edges: [{ ...e("y", "x", "delayed"), memory: { boundedSteps: 2 } }] } };
  const ok = deriveRewriteCandidate(H, bounded, match, "r8");
  assert.equal(ok.kind, "candidate");
  if (ok.kind !== "candidate") return;
  assert.equal(ok.manifest.edges.find(edge => edge.temporal === "delayed")?.memory?.boundedSteps, 2);
});

test("property: over 64 seeded acyclic hosts, retiring any node with all its incident edges matched is accepted, leaves exactly the other nodes and the non-incident edges, validates, and passes the rewrite boundary; omitting one incident edge is always a dangling refusal", () => {
  let seed = 20261020;
  const rnd = (): number => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  const kinds = ["deterministic-policy", "guard-inhibitor", "pure-transform", "observation"];
  let dangling = 0;
  for (let round = 0; round < 64; round++) {
    const size = 3 + Math.floor(rnd() * 5);
    const nodes = Array.from({ length: size }, (_, i) => n(`h${i}`, kinds[Math.floor(rnd() * kinds.length)]!));
    const edges: PolicyGraphEdge[] = [];
    for (let i = 0; i < size; i++) for (let j = i + 1; j < size; j++) if (rnd() < 0.4) edges.push(e(`h${i}`, `h${j}`));
    const graph = host(nodes, edges, { revision: `r${round}` });
    assert.equal(validatePolicyGraph(graph).ok, true);
    const target = nodes[Math.floor(rnd() * size)]!;
    const incident = edges.filter(edge => edge.from === target.id || edge.to === target.id);
    const neighbours = [...new Set(incident.map(edge => (edge.from === target.id ? edge.to : edge.from)))];
    const local = (id: string): string => (id === target.id ? "x" : `k_${id}`);
    const rule: RewriteRule = {
      ruleId: `rule:${round}`,
      kind: "retire-policy",
      left: { nodes: [n("x", target.kind), ...neighbours.map(id => n(local(id), nodes.find(x => x.id === id)!.kind))], edges: incident.map(edge => e(local(edge.from), local(edge.to))) },
      interface: neighbours.map(local),
      right: { nodes: neighbours.map(id => n(local(id), nodes.find(x => x.id === id)!.kind)), edges: [] },
    };
    const match: RuleMatch = { nodes: Object.fromEntries([["x", target.id], ...neighbours.map(id => [local(id), id])]), fresh: {} };
    const derived = deriveRewriteCandidate(graph, rule, match, `r${round}+1`);
    assert.equal(derived.kind, "candidate", `round ${round}: ${JSON.stringify(derived.kind === "refused" ? derived.check.refusals : [])}`);
    if (derived.kind !== "candidate") return;
    assert.deepEqual(derived.manifest.nodes.map(x => x.id).sort(), nodes.map(x => x.id).filter(id => id !== target.id).sort());
    assert.deepEqual(derived.manifest.edges.map(edgeKey).sort(), edges.filter(edge => !incident.includes(edge)).map(edgeKey).sort());
    assert.equal(validatePolicyGraph(derived.manifest).ok, true);
    assert.equal(validateRewriteBoundary({ candidateId: `cand:${round}`, parentRevision: graph.revision, changes: derived.changes, requiredCertificates: graph.requiredContracts }, graph).ok, true);
    if (incident.length > 0) {
      const omit = incident[Math.floor(rnd() * incident.length)]!;
      const partial: RewriteRule = { ...rule, left: { ...rule.left, edges: rule.left.edges.filter(edge => edgeKey(edge) !== edgeKey(e(local(omit.from), local(omit.to)))) } };
      const refused = checkRewriteApplication(graph, partial, match);
      assert.equal(refused.ok, false);
      assert.ok(refused.refusals.some(r => r.code === "REWRITE_DANGLING_EDGE" && r.subject === edgeKey(omit)), `round ${round}`);
      dangling++;
    }
  }
  assert.ok(dangling >= 32, `dangling cases exercised: ${dangling}`);
});

test("the check is a pure record: every string leaf is a host id, a rule-local id, an edge key, a declared code or the schema", () => {
  const partial: RewriteRule = { ...retire, left: { nodes: retire.left.nodes, edges: [e("u", "x")] } };
  const out = checkRewriteApplication(H, partial, retireMatch);
  const known = new Set<string>([...stringLeaves(H), ...stringLeaves(partial), ...stringLeaves(retireMatch), ...Object.keys(retireMatch.nodes), ...H.edges.map(edgeKey), out.schema, ...out.refusals.map(r => r.code)]);
  for (const leaf of stringLeaves({ ...out, refusals: out.refusals.map(({ detail: _d, ...rest }) => rest) })) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
  for (const refusal of out.refusals) assert.ok(refusal.detail.includes(refusal.subject));
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
