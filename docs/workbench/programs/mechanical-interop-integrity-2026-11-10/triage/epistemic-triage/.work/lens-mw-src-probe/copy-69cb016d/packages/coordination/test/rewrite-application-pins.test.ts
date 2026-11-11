import { strict as assert } from "node:assert";
import { test } from "node:test";
import { checkRewriteApplication, deriveRewriteCandidate } from "../dist/index.js";
import type { PolicyGraphEdge, PolicyGraphManifest, PolicyGraphNode, RewriteRule, RuleMatch } from "../dist/index.js";

// Pins for the eight actionable survivors of the 3l61.6 mutation census (bead e8b0). Landed source is unchanged: every
// test here is green on it and red under the named mutant.

const host = (nodes: PolicyGraphNode[], edges: PolicyGraphEdge[]): PolicyGraphManifest => ({
  schema: "mw.policy-graph.v1",
  graphId: "g1",
  revision: "r7",
  parentRevision: "r6",
  exactBasisPolicy: "p:base",
  requiredContracts: ["c:budget"],
  implementationRefs: ["impl:a"],
  nodes,
  edges,
});
const n = (id: string, kind = "deterministic-policy"): PolicyGraphNode => ({ id, kind });
const e = (from: string, to: string, temporal: "instant" | "delayed" = "instant"): PolicyGraphEdge => ({ from, to, temporal });
const codes = (check: { refusals: readonly { code: string }[] }): string[] => check.refusals.map(r => r.code).sort();

test("M8 mixed identification: one preserved and one deleted rule node on one host node is refused, whichever order they come in", () => {
  const one = host([n("p")], []);
  const keepX: RewriteRule = { ruleId: "rule:mixed", kind: "factor-duplicate", left: { nodes: [n("x"), n("y")], edges: [] }, interface: ["x"], right: { nodes: [n("x")], edges: [] } };
  const out = checkRewriteApplication(one, keepX, { nodes: { x: "p", y: "p" }, fresh: {} });
  assert.deepEqual(codes(out), ["REWRITE_IDENTIFICATION_VIOLATED"]);
  assert.equal(out.refusals[0]!.subject, "p");
  const keepY: RewriteRule = { ...keepX, interface: ["y"], right: { nodes: [n("y")], edges: [] } };
  assert.deepEqual(codes(checkRewriteApplication(one, keepY, { nodes: { x: "p", y: "p" }, fresh: {} })), ["REWRITE_IDENTIFICATION_VIOLATED"]);
});

test("M6 the DPO identification condition is not judged on a partial match: a shared image beside an incomplete or dangling-target match reads only the match codes", () => {
  const one = host([n("p")], []);
  const twoDeleted: RewriteRule = { ruleId: "rule:partial", kind: "factor-duplicate", left: { nodes: [n("x"), n("y"), n("z")], edges: [] }, interface: [], right: { nodes: [], edges: [] } };
  assert.deepEqual(codes(checkRewriteApplication(one, twoDeleted, { nodes: { x: "p", y: "p" }, fresh: {} })), ["REWRITE_MATCH_INCOMPLETE"]);
  assert.deepEqual(codes(checkRewriteApplication(one, twoDeleted, { nodes: { x: "p", y: "p", z: "zz" }, fresh: {} })), ["REWRITE_MATCH_TARGET_MISSING"]);
});

test("M32 the typed match reads the edge temporal: an instant rule edge over a delayed host edge between the same nodes is refused with an :instant subject, and a derived delayed edge keeps :delayed in its change id", () => {
  const delayedHost = host([n("a", "observation"), n("b", "pure-transform")], [e("a", "b", "delayed")]);
  const instantRule: RewriteRule = { ruleId: "rule:instant", kind: "specialize", left: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [e("x", "y")] }, interface: ["x", "y"], right: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [] } };
  const out = checkRewriteApplication(delayedHost, instantRule, { nodes: { x: "a", y: "b" }, fresh: {} });
  assert.deepEqual(codes(out), ["REWRITE_MATCH_EDGE_MISSING"]);
  assert.ok(out.refusals[0]!.subject.endsWith(":instant"), out.refusals[0]!.subject);
  assert.equal(out.refusals[0]!.subject, "a->b:instant");
  const delayedRule: RewriteRule = { ...instantRule, ruleId: "rule:delayed", left: { ...instantRule.left, edges: [e("x", "y", "delayed")] } };
  const matched = deriveRewriteCandidate(delayedHost, delayedRule, { nodes: { x: "a", y: "b" }, fresh: {} }, "r8");
  assert.equal(matched.kind, "candidate");
  if (matched.kind !== "candidate") return;
  assert.deepEqual(matched.changes.map(c => `${c.op} ${c.kind} ${c.id}`), ["remove edge a->b:delayed"]);
  const insert: RewriteRule = { ruleId: "rule:insert", kind: "insert-delayed-edge", left: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [] }, interface: ["x", "y"], right: { nodes: [n("x", "observation"), n("y", "pure-transform")], edges: [e("x", "y", "delayed")] } };
  const added = deriveRewriteCandidate(host([n("a", "observation"), n("b", "pure-transform")], []), insert, { nodes: { x: "a", y: "b" }, fresh: {} }, "r8");
  assert.equal(added.kind, "candidate");
  if (added.kind !== "candidate") return;
  assert.deepEqual(added.changes.map(c => `${c.op} ${c.kind} ${c.id}`), ["add edge a->b:delayed"]);
});

const H = host([n("a", "observation"), n("p"), n("b", "pure-transform"), n("s", "guard-inhibitor")], [e("a", "p"), e("p", "b"), e("s", "p")]);
const retire: RewriteRule = {
  ruleId: "rule:retire",
  kind: "retire-policy",
  left: { nodes: [n("u", "observation"), n("x"), n("v", "pure-transform"), n("w", "guard-inhibitor")], edges: [e("u", "x"), e("x", "v"), e("w", "x")] },
  interface: ["u", "v", "w"],
  right: { nodes: [n("u", "observation"), n("v", "pure-transform"), n("w", "guard-inhibitor")], edges: [] },
};
const retireMatch: RuleMatch = { nodes: { u: "a", x: "p", v: "b", w: "s" }, fresh: {} };

test("M18 a derive over a failed check is refused even when the manifest it would build validates: a retyped interface node carries the interface code and no manifest", () => {
  const retyped: RewriteRule = { ...retire, right: { nodes: [n("u", "observation"), n("v", "pure-transform"), n("w", "deterministic-policy")], edges: [] } };
  const out = deriveRewriteCandidate(H, retyped, retireMatch, "r8");
  assert.equal(out.kind, "refused");
  assert.deepEqual(codes(out.check), ["REWRITE_INTERFACE_RETYPED"]);
  assert.equal(out.check.ok, false);
  assert.equal(Object.hasOwn(out, "manifest"), false);
});

test("M14 two added nodes given one fresh id refuse the second as a collision; distinct fresh ids are admitted", () => {
  const twoGuards: RewriteRule = { ruleId: "rule:two", kind: "add-guard", left: { nodes: [n("x")], edges: [] }, interface: ["x"], right: { nodes: [n("x"), n("g", "guard-inhibitor"), n("h", "pure-transform")], edges: [e("x", "g"), e("x", "h")] } };
  const clash = checkRewriteApplication(H, twoGuards, { nodes: { x: "p" }, fresh: { g: "f1", h: "f1" } });
  assert.deepEqual(codes(clash), ["REWRITE_FRESH_ID_COLLISION"]);
  assert.equal(clash.refusals[0]!.subject, "f1");
  assert.deepEqual(clash.added, ["f1"]);
  const distinct = checkRewriteApplication(H, twoGuards, { nodes: { x: "p" }, fresh: { g: "f1", h: "f2" } });
  assert.deepEqual(distinct.refusals, []);
  assert.deepEqual(distinct.added, ["f1", "f2"]);
});

test("M16 an interface node present in R and absent from L is a refusal, never a throw", () => {
  const notInLeft: RewriteRule = { ...retire, interface: ["u", "v", "w", "q"], right: { nodes: [...retire.right.nodes, n("q")], edges: [] } };
  let out: ReturnType<typeof checkRewriteApplication>;
  try {
    out = checkRewriteApplication(H, notInLeft, retireMatch);
  } catch (error) {
    return assert.fail(`a K node absent from L must be refused, not thrown: ${String(error)}`);
  }
  assert.deepEqual(codes(out), ["REWRITE_INTERFACE_UNPRESERVED"]);
  assert.equal(out.refusals[0]!.subject, "q");
});

test("M24 the derived manifest carries each added node's declared kind", () => {
  const twoKinds: RewriteRule = { ruleId: "rule:kinds", kind: "add-guard", left: { nodes: [n("x")], edges: [] }, interface: ["x"], right: { nodes: [n("x"), n("g", "guard-inhibitor"), n("h", "pure-transform")], edges: [e("x", "g"), e("x", "h")] } };
  const out = deriveRewriteCandidate(H, twoKinds, { nodes: { x: "p" }, fresh: { g: "f1", h: "f2" } }, "r8");
  assert.equal(out.kind, "candidate");
  if (out.kind !== "candidate") return;
  assert.deepEqual(out.manifest.nodes.filter(x => x.id === "f1" || x.id === "f2").sort((l, r) => l.id.localeCompare(r.id)), [{ id: "f1", kind: "guard-inhibitor" }, { id: "f2", kind: "pure-transform" }]);
});

test("M35 every refusal code names its subject in its detail, over ids that are not substrings of the detail's other words", () => {
  const hz = host([n("zq1", "observation"), n("zq2"), n("zq3", "pure-transform"), n("zq4", "guard-inhibitor")], [e("zq1", "zq2"), e("zq2", "zq3"), e("zq4", "zq2")]);
  const base: RewriteRule = {
    ruleId: "rule:zqretire",
    kind: "retire-policy",
    left: { nodes: [n("ku7", "observation"), n("kx3"), n("kv5", "pure-transform"), n("kw2", "guard-inhibitor")], edges: [e("ku7", "kx3"), e("kx3", "kv5"), e("kw2", "kx3")] },
    interface: ["ku7", "kv5", "kw2"],
    right: { nodes: [n("ku7", "observation"), n("kv5", "pure-transform"), n("kw2", "guard-inhibitor")], edges: [] },
  };
  const m: RuleMatch = { nodes: { ku7: "zq1", kx3: "zq2", kv5: "zq3", kw2: "zq4" }, fresh: {} };
  const guard: RewriteRule = { ruleId: "rule:zqguard", kind: "add-guard", left: { nodes: [n("kx3")], edges: [] }, interface: ["kx3"], right: { nodes: [n("kx3"), n("kg4", "guard-inhibitor")], edges: [e("kx3", "kg4")] } };
  const delayed: RewriteRule = { ruleId: "rule:zqdelay", kind: "insert-delayed-edge", left: { nodes: [n("ku7", "observation"), n("kv5", "pure-transform")], edges: [] }, interface: ["ku7", "kv5"], right: { nodes: [n("ku7", "observation"), n("kv5", "pure-transform")], edges: [e("kv5", "ku7", "delayed")] } };
  const merge: RewriteRule = { ruleId: "rule:zqmerge", kind: "factor-duplicate", left: { nodes: [n("kx3"), n("ky4")], edges: [] }, interface: [], right: { nodes: [], edges: [] } };
  const refusals = [
    ...checkRewriteApplication(hz, { ...base, kind: "rename" as unknown as RewriteRule["kind"] }, m).refusals,
    ...checkRewriteApplication(hz, { ...base, right: { nodes: [n("ku7", "observation"), n("kv5", "pure-transform")], edges: [] } }, m).refusals,
    ...checkRewriteApplication(hz, { ...base, right: { nodes: [n("ku7", "observation"), n("kv5", "pure-transform"), n("kw2", "deterministic-policy")], edges: [] } }, m).refusals,
    ...checkRewriteApplication(hz, base, { nodes: { ku7: "zq1", kx3: "zq2", kv5: "zq3" }, fresh: {} }).refusals,
    ...checkRewriteApplication(hz, base, { nodes: { ...m.nodes, kw2: "zq9" }, fresh: {} }).refusals,
    ...checkRewriteApplication(hz, { ...base, left: { ...base.left, nodes: [n("ku7", "observation"), n("kx3", "guard-inhibitor"), n("kv5", "pure-transform"), n("kw2", "guard-inhibitor")] } }, m).refusals,
    ...checkRewriteApplication(hz, { ...base, left: { ...base.left, edges: [...base.left.edges, e("ku7", "kv5")] } }, m).refusals,
    ...checkRewriteApplication(hz, merge, { nodes: { kx3: "zq2", ky4: "zq2" }, fresh: {} }).refusals,
    ...checkRewriteApplication(hz, { ...base, left: { ...base.left, edges: [e("ku7", "kx3")] } }, m).refusals,
    ...checkRewriteApplication(hz, guard, { nodes: { kx3: "zq2" }, fresh: {} }).refusals,
    ...checkRewriteApplication(hz, guard, { nodes: { kx3: "zq2" }, fresh: { kg4: "zq1" } }).refusals,
  ];
  const result = deriveRewriteCandidate(hz, delayed, { nodes: { ku7: "zq1", kv5: "zq3" }, fresh: {} }, "r8");
  assert.equal(result.kind, "refused");
  refusals.push(...result.check.refusals);
  const declared = ["REWRITE_RULE_KIND_UNKNOWN", "REWRITE_INTERFACE_UNPRESERVED", "REWRITE_INTERFACE_RETYPED", "REWRITE_MATCH_INCOMPLETE", "REWRITE_MATCH_TARGET_MISSING", "REWRITE_MATCH_KIND_MISMATCH", "REWRITE_MATCH_EDGE_MISSING", "REWRITE_IDENTIFICATION_VIOLATED", "REWRITE_DANGLING_EDGE", "REWRITE_FRESH_ID_MISSING", "REWRITE_FRESH_ID_COLLISION", "REWRITE_RESULT_INVALID"];
  assert.deepEqual([...new Set(refusals.map(r => r.code))].sort(), [...declared].sort());
  for (const refusal of refusals) assert.ok(refusal.detail.includes(refusal.subject), `${refusal.code}: ${refusal.detail} lacks ${refusal.subject}`);
});
