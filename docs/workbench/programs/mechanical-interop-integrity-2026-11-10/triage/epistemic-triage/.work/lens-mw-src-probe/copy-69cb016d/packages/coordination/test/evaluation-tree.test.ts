import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluate, canonicalJson, digest, fixedBaseline, fixedChecked, fixedConfiguration, composedConfiguration, externalConfiguration,
  treeConfiguration, seedParitySelector,
} from "../dist/index.js";
import type { CompositionTree, EvaluationConfiguration, EvaluationScenario, EvaluationBudget, LandingObservation, PolicyContext, TreeGuard } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const pinnedPath = join(here, "../../../qa/integration/python-consumer/fixtures/evaluation-composition-tree.json");

const scenario: EvaluationScenario = {
  landing: { candidates: 6, lanes: 1, steps: 14 }, compactionTasks: 8, colony: { workers: 6, compute: 18, steps: 10 },
  recovery: { work: 8, steps: 14 }, quorum: { candidates: 4, reviewers: 3, steps: 12, budget: 20, gate: "authoritative" },
};
const budget: EvaluationBudget = { steps: 14, units: 200 };
const partition = { train: [1, 2, 3, 4], holdOut: [5, 6, 7, 8, 9, 10, 11, 12] };

const refusal = (fn: () => unknown, code: string): void => assert.throws(fn, (error: unknown) => error instanceof Error && error.constructor === RangeError && error.message.startsWith(code + ":"));
const leaf = (configuration: EvaluationConfiguration): CompositionTree => ({ op: "policy", configuration });
const base = leaf(fixedBaseline);
const checked = leaf(fixedChecked);
const parity = seedParitySelector<LandingObservation>();
const acceptAll: TreeGuard = { id: "accept-all", revision: "1", accept: () => true };
const rejectAll: TreeGuard = { id: "reject-all", revision: "1", accept: () => false };
const context = (seed: number): PolicyContext => ({ episodeId: "e", actorId: "a", observationDigest: "d", budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, authority: "propose-only", policyRevision: "r", seed });
const observation: LandingObservation = { basis: { workspaceId: "w", revision: "head-1" }, head: "head-1", lanes: 1, ready: [{ id: "c1", base: "head-0", arrival: 0 }] };

const nested: CompositionTree = {
  op: "guarded", first: base, guard: acceptAll,
  then: { op: "alternative", left: { op: "sequential", first: base, then: checked }, right: { op: "inhibit", control: checked, subject: { op: "parallel", left: base, right: checked } }, selector: parity },
};

test("a nested tree over every operator builds a composition configuration the harness evaluates", () => {
  const tree = treeConfiguration("evolved-1", "1", nested);
  assert.equal(tree.kind, "composition");
  assert.equal(tree.id, "evolved-1");
  const report = evaluate({ entries: [{ configuration: fixedBaseline, budget }, { configuration: tree, budget }], scenario, partition, bootstrap: { seed: 11, resamples: 50 } });
  const row = report.configurations.find(c => c.id === "evolved-1")!;
  assert.equal(row.kind, "composition");
  assert.equal(row.configHash, tree.configHash);
  assert.deepEqual(row.provenance, tree.provenance);
  assert.equal(row.environments.length, 5);
  assert.equal(JSON.stringify(report).includes("propose"), false, "no policy body reaches the report");
});

test("configHash is the digest of the canonical tree and the provenance records that tree", () => {
  const tree = treeConfiguration("evolved-1", "1", nested);
  assert.equal(tree.provenance.kind, "composition");
  assert.equal(tree.provenance.combinator, "tree");
  const recorded = tree.provenance.combinator === "tree" ? tree.provenance.tree : null;
  assert.deepEqual(recorded, {
    op: "guarded", guard: { id: "accept-all", revision: "1" }, references: [],
    first: { op: "policy", configHash: fixedBaseline.configHash },
    then: {
      op: "alternative", selector: { id: "seed-parity", revision: "1" }, references: [],
      left: { op: "sequential", first: { op: "policy", configHash: fixedBaseline.configHash }, then: { op: "policy", configHash: fixedChecked.configHash } },
      right: { op: "inhibit", references: [], control: { op: "policy", configHash: fixedChecked.configHash }, subject: { op: "parallel", left: { op: "policy", configHash: fixedBaseline.configHash }, right: { op: "policy", configHash: fixedChecked.configHash } } },
    },
  });
  assert.equal(tree.configHash, digest({ id: "evolved-1", revision: "1", kind: "composition", tree: recorded }));
  assert.equal(treeConfiguration("evolved-1", "1", nested).configHash, tree.configHash, "the hash is deterministic");
});

test("the hash separates structure, child order, guard and selector revision, and reference sets; reference order does not matter", () => {
  const hashOf = (tree: CompositionTree) => treeConfiguration("t", "1", tree).configHash;
  const left: CompositionTree = { op: "sequential", first: base, then: checked };
  const right: CompositionTree = { op: "sequential", first: checked, then: base };
  assert.notEqual(hashOf(left), hashOf(right));
  assert.notEqual(hashOf(left), hashOf({ op: "parallel", left: base, right: checked }));
  assert.notEqual(hashOf({ op: "guarded", first: base, guard: acceptAll, then: checked }), hashOf({ op: "guarded", first: base, guard: { ...acceptAll, revision: "2" }, then: checked }));
  assert.notEqual(hashOf({ op: "alternative", left: base, right: checked, selector: parity }), hashOf({ op: "alternative", left: base, right: checked, selector: { ...parity, revision: "2" } }));
  const refs = (references: string[]): CompositionTree => ({ op: "alternative", left: base, right: checked, selector: parity, references });
  assert.notEqual(hashOf(refs([])), hashOf(refs(["scope:worker:1"])));
  assert.equal(hashOf(refs(["scope:b", "scope:a", "scope:a"])), hashOf(refs(["scope:a", "scope:b"])));
  assert.notEqual(treeConfiguration("t", "1", left).configHash, treeConfiguration("t", "2", left).configHash);
});

test("an alternative tree behaves exactly like composedConfiguration over the same two configurations and selector", () => {
  const tree = treeConfiguration("parity-tree", "1", { op: "alternative", left: base, right: checked, selector: parity });
  const composed = composedConfiguration("parity-composition", "1", fixedBaseline, fixedChecked, parity);
  for (const key of ["landing", "compaction", "colony", "recovery", "quorum"] as const) {
    assert.equal(tree.policies[key].id, composed.policies[key].id);
    assert.equal(tree.policies[key].revision, composed.policies[key].revision);
  }
  const report = evaluate({ entries: [{ configuration: tree, budget }, { configuration: composed, budget }], scenario, partition, bootstrap: { seed: 11, resamples: 50 } });
  assert.deepEqual(report.configurations[0]!.environments, report.configurations[1]!.environments);
  const even = tree.policies.landing.propose(observation, 0, context(2));
  const odd = tree.policies.landing.propose(observation, 0, context(3));
  assert.equal(even.trace[0]!.detail, "left by seed-parity@1");
  assert.equal(odd.trace[0]!.detail, "right by seed-parity@1");
  assert.equal(typeof even.memory, "number");
});

test("each operator keeps its algebra semantics inside a tree", () => {
  const traceOf = (tree: CompositionTree) => treeConfiguration("t", "1", tree).policies.landing.propose(observation, 0, context(2)).trace.map(line => line.kind);
  assert.ok(traceOf({ op: "sequential", first: base, then: checked }).includes("sequential"));
  assert.ok(traceOf({ op: "parallel", left: base, right: checked }).includes("parallel"));
  assert.ok(traceOf({ op: "guarded", first: base, guard: acceptAll, then: checked }).includes("guard-accepted"));
  assert.ok(traceOf({ op: "guarded", first: base, guard: rejectAll, then: checked }).includes("guard-rejected"));
  const rejected = treeConfiguration("t", "1", { op: "guarded", first: base, guard: rejectAll, then: checked }).policies.landing.propose(observation, 0, context(2));
  assert.equal(rejected.intents.length, 0, "a rejected guard never runs the second policy, so the restack never appears");
  const accepted = treeConfiguration("t", "1", { op: "guarded", first: base, guard: acceptAll, then: checked }).policies.landing.propose(observation, 0, context(2));
  assert.equal(accepted.intents[0]!.effect, "restack");
  const inhibited = treeConfiguration("t", "1", { op: "inhibit", control: base, subject: checked }).policies.landing.propose(observation, 0, context(2));
  assert.equal(inhibited.intents[0]!.effect, "restack", "an inhibition without evidence removes nothing");
});

test("an unknown operator, a missing or malformed child, a non-fixed leaf, a malformed guard or selector and a runaway depth are refused with CONFIG_TREE_INVALID", () => {
  const build = (tree: unknown) => () => treeConfiguration("t", "1", tree as CompositionTree);
  refusal(build({ op: "loop", first: base }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "repeated", option: base }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "sequential", first: base }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "parallel", left: base, right: undefined }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "parallel", left: base, right: 7 }), "CONFIG_TREE_INVALID");
  refusal(build(null), "CONFIG_TREE_INVALID");
  refusal(build("policy"), "CONFIG_TREE_INVALID");
  refusal(build({ op: "policy" }), "CONFIG_TREE_INVALID");
  const external = externalConfiguration({ id: "learned", revision: "1", configHash: "sha256:" + "ab".repeat(32), policies: fixedChecked.policies });
  refusal(build(leaf(external)), "CONFIG_TREE_INVALID");
  refusal(build(leaf(treeConfiguration("inner", "1", { op: "parallel", left: base, right: checked }))), "CONFIG_TREE_INVALID");
  refusal(build({ op: "guarded", first: base, guard: { id: "g", revision: "1" }, then: checked }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "guarded", first: base, guard: { id: "", revision: "1", accept: () => true }, then: checked }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "alternative", left: base, right: checked, selector: { id: "s", revision: "1" } }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "alternative", left: base, right: checked, selector: parity, references: "scope:a" }), "CONFIG_TREE_INVALID");
  refusal(build({ op: "alternative", left: base, right: checked, selector: parity, references: [""] }), "CONFIG_TREE_INVALID");
  refusal(() => treeConfiguration("", "1", base), "CONFIG_TREE_INVALID");
  const cycle: { op: string; first: unknown; then: unknown } = { op: "sequential", first: base, then: base };
  cycle.then = cycle;
  refusal(build(cycle), "CONFIG_TREE_INVALID");
  let deep: CompositionTree = base;
  for (let level = 0; level < 20; level += 1) deep = { op: "sequential", first: deep, then: base };
  refusal(build(deep), "CONFIG_TREE_INVALID");
  let ok: CompositionTree = base;
  for (let level = 0; level < 8; level += 1) ok = { op: "parallel", left: ok, right: base };
  assert.equal(treeConfiguration("deep-but-bounded", "1", ok).kind, "composition");
});

test("the nesting bound sits exactly at sixteen: a deepest leaf at depth 16 builds and a deepest leaf at depth 17 is refused naming the bound", () => {
  const wrap = (levels: number): CompositionTree => {
    let tree: CompositionTree = base;
    for (let level = 0; level < levels; level += 1) tree = { op: "sequential", first: tree, then: base };
    return tree;
  };
  assert.equal(treeConfiguration("edge-16", "1", wrap(16)).kind, "composition", "the deepest leaf sits at depth 16, which the bound admits");
  assert.throws(() => treeConfiguration("edge-17", "1", wrap(17)), (error: unknown) => error instanceof RangeError && /^CONFIG_TREE_INVALID: tree(\.first){17} nests deeper than 16 levels$/.test(error.message));
});

test("a fixed leaf whose policy set lacks any one of the five policy keys is refused at build time naming that key", () => {
  for (const key of ["landing", "compaction", "colony", "recovery", "quorum"] as const) {
    const rest: Record<string, unknown> = { ...fixedBaseline.policies };
    delete rest[key];
    const partial = { ...fixedBaseline, policies: rest } as unknown as EvaluationConfiguration;
    assert.throws(() => treeConfiguration("t", "1", leaf(partial)), (error: unknown) => error instanceof RangeError && error.message === `CONFIG_TREE_INVALID: tree leaf configuration lacks a ${key} policy`);
  }
});

test("a fixed leaf whose policy record for any one of the five keys lacks a callable propose is refused at build time naming that key", () => {
  for (const key of ["landing", "compaction", "colony", "recovery", "quorum"] as const) {
    const declared = fixedBaseline.policies[key] as unknown as Record<string, unknown>;
    assert.equal(typeof declared.propose, "function", `the baseline ${key} policy declares a callable propose before the corruption`);
    for (const propose of [undefined, 1, null, "propose", {}]) {
      const corrupted = { ...fixedBaseline, policies: { ...fixedBaseline.policies, [key]: { ...declared, propose } } } as unknown as EvaluationConfiguration;
      assert.throws(() => treeConfiguration("t", "1", leaf(corrupted)), (error: unknown) => error instanceof RangeError && error.message === `CONFIG_TREE_INVALID: tree leaf configuration lacks a ${key} policy`, `${key} with propose ${String(propose)} is refused`);
    }
  }
});

test("a tree that references a protected effect, scope, receipt or verifier decision is refused with CONFIG_TREE_PROTECTED_SCOPE", () => {
  const withRefs = (op: "guarded" | "alternative" | "inhibit", references: string[]): CompositionTree => {
    if (op === "guarded") return { op, first: base, guard: acceptAll, then: checked, references };
    if (op === "alternative") return { op, left: base, right: checked, selector: parity, references };
    return { op, control: base, subject: checked, references };
  };
  for (const op of ["guarded", "alternative", "inhibit"] as const) {
    for (const reference of ["verifier:receipt", "verdict:accept", "receipt:abc", "protected:global", "authority:grant", "graph:protected:worker-7", "effect:verify", "effect:authorize"]) {
      refusal(() => treeConfiguration("t", "1", withRefs(op, ["scope:worker:1", reference])), "CONFIG_TREE_PROTECTED_SCOPE");
    }
    assert.equal(treeConfiguration("t", "1", withRefs(op, ["scope:worker:1", "effect:restack", "observation:queue"])).kind, "composition", "ordinary scopes and effects stay allowed");
  }
  const deepProtected: CompositionTree = { op: "sequential", first: base, then: withRefs("inhibit", ["verdict:accept"]) };
  refusal(() => treeConfiguration("t", "1", deepProtected), "CONFIG_TREE_PROTECTED_SCOPE");
});

test("the composition-tree record is byte-identical to the committed fixture the Python leg re-hashes", () => {
  const leaves = [fixedBaseline, fixedChecked].map(config => ({ id: config.id, revision: config.revision, configHash: config.configHash, policies: { landing: `${config.policies.landing.id}@${config.policies.landing.revision}`, compaction: `${config.policies.compaction.id}@${config.policies.compaction.revision}`, colony: `${config.policies.colony.id}@${config.policies.colony.revision}`, recovery: `${config.policies.recovery.id}@${config.policies.recovery.revision}`, quorum: `${config.policies.quorum.id}@${config.policies.quorum.revision}` } }));
  const tree = treeConfiguration("evolved-1", "1", nested);
  const record = { schema: "mw.evaluation.composition-tree.v1", id: tree.id, revision: tree.revision, configHash: tree.configHash, provenance: tree.provenance, leaves };
  assert.equal(readFileSync(pinnedPath, "utf8"), canonicalJson(record) + "\n");
  assert.equal(fixedConfiguration(leaves[0]!.id, leaves[0]!.revision, fixedBaseline.policies).configHash, leaves[0]!.configHash);
});

test("sequential, parallel and inhibit nodes build their parts in the declared role order, so the policy a tree hashes is the policy it evaluates", () => {
  const landingId = (tree: CompositionTree): string => treeConfiguration("roles", "1", tree).policies.landing.id;
  assert.equal(landingId({ op: "sequential", first: base, then: checked }), `${fixedBaseline.policies.landing.id};${fixedChecked.policies.landing.id}`);
  assert.equal(landingId({ op: "sequential", first: checked, then: base }), `${fixedChecked.policies.landing.id};${fixedBaseline.policies.landing.id}`);
  assert.equal(landingId({ op: "parallel", left: base, right: checked }), `${fixedBaseline.policies.landing.id}||${fixedChecked.policies.landing.id}`);
  assert.equal(landingId({ op: "parallel", left: checked, right: base }), `${fixedChecked.policies.landing.id}||${fixedBaseline.policies.landing.id}`);
  assert.equal(landingId({ op: "inhibit", control: base, subject: checked }), `${fixedBaseline.policies.landing.id}-|${fixedChecked.policies.landing.id}`);
  assert.equal(landingId({ op: "inhibit", control: checked, subject: base }), `${fixedChecked.policies.landing.id}-|${fixedBaseline.policies.landing.id}`);
});
