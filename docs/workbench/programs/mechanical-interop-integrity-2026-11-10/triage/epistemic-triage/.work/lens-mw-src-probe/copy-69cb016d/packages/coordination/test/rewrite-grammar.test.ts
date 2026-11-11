import test from "node:test";
import assert from "node:assert/strict";
import {
  V1_GRAMMAR,
  V1_RULE_KINDS,
  validateRuleAgainstGrammar,
  sealMutationRecord,
  MEMORY_MIGRATION_STRATEGIES,
  type RewriteRule,
  type MutationRecord,
} from "../dist/index.js";

const node = (id: string, kind: string) => ({ id, kind });
const rule = (kind: string, left: ReturnType<typeof node>[], iface: string[], right: ReturnType<typeof node>[], edges?: { left?: { from: string; to: string; temporal: "instant" | "delayed" }[]; right?: { from: string; to: string; temporal: "instant" | "delayed" }[] }): RewriteRule => ({
  ruleId: `r-${kind}`,
  kind: kind as RewriteRule["kind"],
  left: { nodes: left, edges: edges?.left ?? [] },
  interface: iface,
  right: { nodes: right, edges: edges?.right ?? [] },
});

test("the grammar names exactly the seven v1 rule kinds", () => {
  assert.deepEqual(Object.keys(V1_GRAMMAR).sort(), [...V1_RULE_KINDS].sort());
  const unknown = validateRuleAgainstGrammar(rule("inline-expand", [], [], []));
  assert.equal(unknown.ok, false);
  assert.ok(unknown.refusals.some((r) => r.code === "GRAMMAR_RULE_KIND_UNKNOWN"));
});

test("specialize and factor-duplicate delete nothing and add within their shape", () => {
  const ok = validateRuleAgainstGrammar(rule("specialize", [node("a", "policy")], ["a"], [node("a", "policy"), node("s", "policy")]));
  assert.equal(ok.ok, true);
  assert.deepEqual([...ok.added], ["s"]);
  const deleting = validateRuleAgainstGrammar(rule("specialize", [node("a", "policy"), node("b", "policy")], ["a"], [node("a", "policy"), node("s", "policy")]));
  assert.equal(deleting.ok, false);
  assert.ok(deleting.refusals.some((r) => r.code === "GRAMMAR_DELETION_FORBIDDEN" && r.subject === "b"));
  const addsNothing = validateRuleAgainstGrammar(rule("specialize", [node("a", "policy")], ["a"], [node("a", "policy")]));
  assert.ok(addsNothing.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
  const factorTwo = validateRuleAgainstGrammar(rule("factor-duplicate", [node("a", "policy")], ["a"], [node("a", "policy"), node("f1", "computation"), node("f2", "computation")]));
  assert.equal(factorTwo.ok, false);
  assert.ok(factorTwo.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("substitute-numerical swaps exactly one non-interface node", () => {
  const ok = validateRuleAgainstGrammar(rule("substitute-numerical", [node("k", "view"), node("old", "policy")], ["k"], [node("k", "view"), node("new", "policy")]));
  assert.equal(ok.ok, true);
  assert.deepEqual([...ok.deleted], ["old"]);
  assert.deepEqual([...ok.added], ["new"]);
  const twoForOne = validateRuleAgainstGrammar(rule("substitute-numerical", [node("k", "view"), node("o1", "policy"), node("o2", "policy")], ["k"], [node("k", "view"), node("new", "policy")]));
  assert.equal(twoForOne.ok, false);
});

test("add-guard adds exactly one guard node, by kind", () => {
  const ok = validateRuleAgainstGrammar(rule("add-guard", [node("a", "policy")], ["a"], [node("a", "policy"), node("g", "guard")]));
  assert.equal(ok.ok, true);
  const wrongKind = validateRuleAgainstGrammar(rule("add-guard", [node("a", "policy")], ["a"], [node("a", "policy"), node("g", "policy")]));
  assert.equal(wrongKind.ok, false);
  assert.ok(wrongKind.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH"));
});

test("split-coarsen-view moves only view nodes in a split or coarsen shape", () => {
  const split = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("v", "view")], [], [node("v1", "view"), node("v2", "view")]));
  assert.equal(split.ok, true);
  const coarsen = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("v1", "view"), node("v2", "view")], [], [node("v", "view")]));
  assert.equal(coarsen.ok, true);
  const notViews = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("p", "policy")], [], [node("v1", "view"), node("v2", "view")]));
  assert.equal(notViews.ok, false);
  assert.ok(notViews.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH" && r.subject === "p"));
  const oneToOne = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("v", "view")], [], [node("w", "view")]));
  assert.ok(oneToOne.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("insert-delayed-edge adds exactly one delayed edge and changes no node", () => {
  const base = [node("a", "policy"), node("b", "policy")];
  const ok = validateRuleAgainstGrammar(rule("insert-delayed-edge", base, ["a", "b"], base, { left: [], right: [{ from: "a", to: "b", temporal: "delayed" }] }));
  assert.equal(ok.ok, true);
  const instant = validateRuleAgainstGrammar(rule("insert-delayed-edge", base, ["a", "b"], base, { left: [], right: [{ from: "a", to: "b", temporal: "instant" }] }));
  assert.equal(instant.ok, false);
  assert.ok(instant.refusals.some((r) => r.code === "GRAMMAR_EDGE_DISCIPLINE" && r.detail.includes("instantaneous cycle")));
  const removes = validateRuleAgainstGrammar(rule("insert-delayed-edge", base, ["a", "b"], base, { left: [{ from: "b", to: "a", temporal: "instant" }], right: [{ from: "a", to: "b", temporal: "delayed" }] }));
  assert.ok(removes.refusals.some((r) => r.code === "GRAMMAR_EDGE_DISCIPLINE"));
  const addsNode = validateRuleAgainstGrammar(rule("insert-delayed-edge", base, ["a", "b"], [...base, node("m", "memory")], { left: [], right: [{ from: "a", to: "b", temporal: "delayed" }] }));
  assert.ok(addsNode.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("retire-policy deletes exactly one policy node and adds nothing", () => {
  const ok = validateRuleAgainstGrammar(rule("retire-policy", [node("k", "view"), node("dead", "policy")], ["k"], [node("k", "view")]));
  assert.equal(ok.ok, true);
  const notPolicy = validateRuleAgainstGrammar(rule("retire-policy", [node("k", "policy"), node("v", "view")], ["k"], [node("k", "policy")]));
  assert.equal(notPolicy.ok, false);
  assert.ok(notPolicy.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH"));
});

const DIGEST = `sha256:${"c0ffee00".repeat(8)}`;

const fullRecord = (over: Partial<MutationRecord>): MutationRecord => ({
  parentRevision: "rev-12",
  candidateHash: DIGEST,
  ruleId: "r-specialize",
  match: { nodes: { a: "host-a" }, fresh: { s: "host-s" } },
  changedNodes: ["host-s"],
  changedPorts: ["host-s.out"],
  changedEdges: ["host-a->host-s:instant"],
  dependencies: { reads: ["lane/1"], evidence: ["ev-1"], resources: ["compute"] },
  portMapping: [{ from: "a.out", to: "s.in" }],
  checkpointMapping: { "a@7": "a@7" },
  memoryMigration: [{ nodeId: "s", strategy: "reset" }],
  requiredCertificates: ["cert-1"],
  experimentIds: ["exp-1"],
  ...over,
});

test("a complete mutation record seals deep-frozen and side-effect-free", () => {
  const sealed = sealMutationRecord(fullRecord({}));
  assert.equal(sealed.kind, "sealed");
  if (sealed.kind !== "sealed") return;
  assert.ok(Object.isFrozen(sealed.record));
  assert.ok(Object.isFrozen(sealed.record.changedNodes));
  assert.ok(Object.isFrozen(sealed.record.dependencies));
  assert.throws(() => { (sealed.record.changedNodes as string[]).push("x"); });
  assert.deepEqual([...MEMORY_MIGRATION_STRATEGIES], ["reset", "verified-partition", "unchanged-schema-identity"]);
});

test("a missing record member refuses by name; a short hash refuses", () => {
  const noDeps = sealMutationRecord({ ...fullRecord({}), dependencies: undefined as unknown as MutationRecord["dependencies"] });
  assert.equal(noDeps.kind, "refused");
  if (noDeps.kind === "refused") assert.ok(noDeps.refusals.some((r) => r.code === "REWRITE_RECORD_MEMBER_MISSING" && r.subject === "dependencies"));
  const blankRev = sealMutationRecord(fullRecord({ parentRevision: "  " }));
  assert.equal(blankRev.kind, "refused");
  const shortHash = sealMutationRecord(fullRecord({ candidateHash: "abc123" }));
  assert.equal(shortHash.kind, "refused");
  if (shortHash.kind === "refused") assert.ok(shortHash.refusals.some((r) => r.code === "REWRITE_RECORD_HASH_BLANK"));
});

test("an unnormalized port mapping and an unknown memory strategy refuse", () => {
  const dup = sealMutationRecord(fullRecord({ portMapping: [{ from: "a.out", to: "s.in" }, { from: "a.out", to: "t.in" }] }));
  assert.equal(dup.kind, "refused");
  if (dup.kind === "refused") assert.ok(dup.refusals.some((r) => r.code === "REWRITE_RECORD_PORT_MAPPING_UNNORMALIZED"));
  const unsorted = sealMutationRecord(fullRecord({ portMapping: [{ from: "b.out", to: "x.in" }, { from: "a.out", to: "s.in" }] }));
  assert.equal(unsorted.kind, "refused");
  const wire = sealMutationRecord(fullRecord({ memoryMigration: [{ nodeId: "s", strategy: "wire-index-copy" }] }));
  assert.equal(wire.kind, "refused");
  if (wire.kind === "refused") assert.ok(wire.refusals.some((r) => r.code === "REWRITE_RECORD_MEMORY_STRATEGY_UNKNOWN"));
});

test("retire-policy deletes exactly one policy node: two policy nodes and an added node both refuse", () => {
  const twoNodes = validateRuleAgainstGrammar(rule("retire-policy", [node("k", "view"), node("d1", "policy"), node("d2", "policy")], ["k"], [node("k", "view")]));
  assert.equal(twoNodes.ok, false);
  assert.ok(twoNodes.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
  const addsANode = validateRuleAgainstGrammar(rule("retire-policy", [node("k", "view"), node("dead", "policy")], ["k"], [node("k", "view"), node("extra", "policy")]));
  assert.equal(addsANode.ok, false);
  assert.ok(addsANode.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("substitute-numerical swaps one for one: one deleted for two added refuses", () => {
  const oneForTwo = validateRuleAgainstGrammar(rule("substitute-numerical", [node("k", "view"), node("old", "policy")], ["k"], [node("k", "view"), node("n1", "policy"), node("n2", "policy")]));
  assert.equal(oneForTwo.ok, false);
  assert.ok(oneForTwo.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("add-guard adds exactly one guard: two guard nodes refuse", () => {
  const twoGuards = validateRuleAgainstGrammar(rule("add-guard", [node("a", "policy")], ["a"], [node("a", "policy"), node("g1", "guard"), node("g2", "guard")]));
  assert.equal(twoGuards.ok, false);
  assert.ok(twoGuards.refusals.some((r) => r.code === "GRAMMAR_ADDITION_MISMATCH"));
});

test("sealMutationRecord leaves the caller's input unfrozen and returns a distinct record", () => {
  const input = fullRecord({});
  const sealed = sealMutationRecord(input);
  assert.equal(sealed.kind, "sealed");
  if (sealed.kind !== "sealed") return;
  assert.equal(Object.isFrozen(input), false);
  assert.equal(Object.isFrozen(input.changedNodes), false);
  assert.equal(Object.isFrozen(input.dependencies), false);
  assert.notEqual(sealed.record, input);
  assert.notEqual(sealed.record.changedNodes, input.changedNodes);
  const sealedLength = sealed.record.changedNodes.length;
  (input.changedNodes as string[]).push("later");
  assert.equal(sealed.record.changedNodes.length, sealedLength);
});

test("tt8u Q1: split-coarsen-view checks the kind on every side where an id appears, and names the side", () => {
  const reused = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("v", "view")], [], [node("v", "policy"), node("w", "view")]));
  assert.equal(reused.ok, false);
  const hit = reused.refusals.filter((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH");
  assert.equal(hit.length, 1);
  assert.equal(hit[0]!.subject, "v");
  assert.ok(hit[0]!.detail.includes("r:v is policy"), hit[0]!.detail);
  const leftBad = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("p", "policy")], [], [node("p", "view"), node("w", "view")]));
  assert.ok(leftBad.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH" && r.subject === "p" && r.detail.includes("l:p is policy")));
  const reusedViews = validateRuleAgainstGrammar(rule("split-coarsen-view", [node("v", "view")], [], [node("v", "view"), node("w", "view")]));
  assert.equal(reusedViews.ok, true);
});

test("tt8u Q2: factor-duplicate requires the single added node to be a computation", () => {
  const ok = validateRuleAgainstGrammar(rule("factor-duplicate", [node("a", "policy")], ["a"], [node("a", "policy"), node("f", "computation")]));
  assert.equal(ok.ok, true);
  const wrong = validateRuleAgainstGrammar(rule("factor-duplicate", [node("a", "policy")], ["a"], [node("a", "policy"), node("f", "policy")]));
  assert.equal(wrong.ok, false);
  assert.ok(wrong.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH" && r.subject === "f" && r.detail.includes("computation")));
});

test("tt8u Q3: substitute-numerical requires the single added node to be a policy; the deleted node may be any kind", () => {
  const swapView = validateRuleAgainstGrammar(rule("substitute-numerical", [node("k", "view"), node("old", "policy")], ["k"], [node("k", "view"), node("new", "view")]));
  assert.equal(swapView.ok, false);
  assert.ok(swapView.refusals.some((r) => r.code === "GRAMMAR_NODE_KIND_MISMATCH" && r.subject === "new" && r.detail.includes("policy")));
  const anyDeleted = validateRuleAgainstGrammar(rule("substitute-numerical", [node("k", "view"), node("old", "guard")], ["k"], [node("k", "view"), node("new", "policy")]));
  assert.equal(anyDeleted.ok, true);
});

const codes = (s: ReturnType<typeof sealMutationRecord>): string[] => (s.kind === "refused" ? s.refusals.map((r) => r.code) : []);

test("tt8u Q4: a 12-plus character candidateHash outside the sha256 digest shape refuses MALFORMED; blank and short keep BLANK", () => {
  for (const bad of ["zzzzzzzzzzzz", `sha256:${"C0FFEE00".repeat(8)}`, `sha256:${"c0ffee0".repeat(9)}`.slice(0, 70), `sha256:${"a".repeat(65)}`, ` ${DIGEST}`]) {
    const sealed = sealMutationRecord(fullRecord({ candidateHash: bad }));
    assert.equal(sealed.kind, "refused", bad);
    assert.ok(codes(sealed).includes("REWRITE_RECORD_HASH_MALFORMED"), bad);
    assert.ok(!codes(sealed).includes("REWRITE_RECORD_HASH_BLANK"), bad);
  }
  assert.ok(codes(sealMutationRecord(fullRecord({ candidateHash: "abc123" }))).includes("REWRITE_RECORD_HASH_BLANK"));
  assert.ok(codes(sealMutationRecord(fullRecord({ candidateHash: "   " }))).includes("REWRITE_RECORD_MEMBER_MISSING"));
  assert.equal(sealMutationRecord(fullRecord({ candidateHash: DIGEST })).kind, "sealed");
});

test("tt8u Q4: every required member is type-checked and the refusal names the member and the expected type", () => {
  const cases: ReadonlyArray<[string, unknown, string]> = [
    ["changedNodes", "host-s", "array"],
    ["changedPorts", { a: 1 }, "array"],
    ["changedEdges", 7, "array"],
    ["portMapping", "a.out", "array"],
    ["memoryMigration", {}, "array"],
    ["requiredCertificates", "cert-1", "array"],
    ["experimentIds", true, "array"],
    ["parentRevision", 12, "string"],
    ["ruleId", ["r"], "string"],
    ["candidateHash", 123456789012, "string"],
    ["match", "m", "object"],
    ["match", [], "object"],
    ["dependencies", ["reads"], "object"],
    ["checkpointMapping", "x", "object"],
  ];
  for (const [member, value, expected] of cases) {
    const sealed = sealMutationRecord({ ...fullRecord({}), [member]: value } as unknown as MutationRecord);
    assert.equal(sealed.kind, "refused", member);
    if (sealed.kind !== "refused") continue;
    const hit = sealed.refusals.find((r) => r.code === "REWRITE_RECORD_MEMBER_MALFORMED" && r.subject === member);
    assert.ok(hit, `${member}: ${JSON.stringify(sealed.refusals)}`);
    assert.ok(hit!.detail.includes(member) && hit!.detail.includes(expected), hit!.detail);
  }
  const badPort = sealMutationRecord({ ...fullRecord({}), portMapping: [null] } as unknown as MutationRecord);
  assert.ok(codes(badPort).includes("REWRITE_RECORD_MEMBER_MALFORMED"));
  const badMigration = sealMutationRecord({ ...fullRecord({}), memoryMigration: [7] } as unknown as MutationRecord);
  assert.ok(codes(badMigration).includes("REWRITE_RECORD_MEMBER_MALFORMED"));
});

test("tt8u Q5: a non-cloneable nested member refuses UNCLONEABLE with the clone error, and does not throw", () => {
  let sealed: ReturnType<typeof sealMutationRecord> | undefined;
  assert.doesNotThrow(() => { sealed = sealMutationRecord(fullRecord({ checkpointMapping: { "a@7": () => "x" } as unknown as MutationRecord["checkpointMapping"] })); });
  assert.equal(sealed!.kind, "refused");
  if (sealed!.kind !== "refused") return;
  const hit = sealed!.refusals.find((r) => r.code === "REWRITE_RECORD_MEMBER_UNCLONEABLE");
  assert.ok(hit);
  assert.ok(/clone/i.test(hit!.detail), hit!.detail);
});
