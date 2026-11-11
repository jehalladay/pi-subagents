// MechanicalWorkflows-btlg (GPC-EAT-R010): an additive per-graph-family evaluator — new function,
// evaluateEpisodes unchanged — reporting per-family blocks with regret against a supplied
// exact-oracle arm ("unknown" when none is supplied, never 0), constraint-violation and
// invalid-proposal counts, verified throughput and p95 wall-clock cost from an injected clock,
// certified false everywhere.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluateGraphFamilies, evaluateEpisodes, toEpisode, digest,
  runLandingQueue, restackFirst, fifoLanding,
  runQuorumEvidence, independentTestFirst, majorityVote,
} from "../dist/index.js";
import type { Episode, GraphFamilyArm } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));

const landing = (policy: typeof restackFirst): Episode => toEpisode(runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy }));
const quorum = (policy: typeof independentTestFirst): Episode => toEpisode(runQuorumEvidence({ seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "authoritative", policy }));

const oracleArm: GraphFamilyArm = { armId: "exact-oracle", episodes: [landing(restackFirst), quorum(independentTestFirst)], wallClockMicro: [1_000, 9_000] };
const learnedArm: GraphFamilyArm = { armId: "learned", episodes: [landing(fifoLanding), quorum(majorityVote)], wallClockMicro: [2_000, 11_000] };

test("episodes from two families yield one sorted block per family; every arm row carries regret, violations, invalidProposals, throughput and p95 cost with certified false", () => {
  const report = evaluateGraphFamilies({ arms: [oracleArm, learnedArm], oracleArmId: "exact-oracle" });
  assert.equal(report.schema, "mw.graph-family-evaluation.v1");
  assert.equal(report.certified, false);
  assert.equal(report.oracleArm, "exact-oracle");
  assert.deepEqual(report.families.map(block => block.family), ["landing-queue", "quorum-evidence"], "one block per family, sorted");
  for (const block of report.families) {
    assert.equal(block.certified, false, block.family);
    assert.deepEqual(block.arms.map(arm => arm.armId), ["exact-oracle", "learned"], block.family);
    for (const arm of block.arms) {
      assert.equal(arm.certified, false, `${block.family}/${arm.armId}`);
      assert.equal(arm.n, 1);
      assert.equal(typeof arm.regretMicro, "number");
      assert.ok(Number.isInteger(arm.constraintViolations) && arm.constraintViolations >= 0);
      assert.ok(Number.isInteger(arm.invalidProposals) && arm.invalidProposals >= 0);
      assert.ok(arm.throughputMicro > 0, "fixtures admit intents, so throughput is positive");
      assert.ok(arm.p95WallClockMicro > 0);
    }
  }
  assert.equal(digest({ ...report, reportDigest: undefined }) !== "", true);
  assert.equal(evaluateGraphFamilies({ arms: [oracleArm, learnedArm], oracleArmId: "exact-oracle" }).reportDigest, report.reportDigest, "pure: same input, same digest");
});

test("with no oracle arm every regret field is the literal unknown (never 0); with one the oracle's own regret is 0 in every family", () => {
  const without = evaluateGraphFamilies({ arms: [oracleArm, learnedArm] });
  assert.equal(without.oracleArm, "unknown");
  for (const block of without.families) for (const arm of block.arms) assert.equal(arm.regretMicro, "unknown", `${block.family}/${arm.armId}`);
  const withOracle = evaluateGraphFamilies({ arms: [oracleArm, learnedArm], oracleArmId: "exact-oracle" });
  for (const block of withOracle.families) {
    const oracle = block.arms.find(arm => arm.armId === "exact-oracle")!;
    assert.equal(oracle.regretMicro, 0, block.family);
    const learned = block.arms.find(arm => arm.armId === "learned")!;
    assert.equal(learned.regretMicro, learned.meanStepsMicro - oracle.meanStepsMicro, block.family);
  }
});

test("the injected clock is the only wall-clock source: changing it moves p95WallClockMicro and nothing else", () => {
  const fast = evaluateGraphFamilies({ arms: [oracleArm, learnedArm], oracleArmId: "exact-oracle" });
  const slow = evaluateGraphFamilies({ arms: [oracleArm, { ...learnedArm, wallClockMicro: [2_000_000, 11_000_000] }], oracleArmId: "exact-oracle" });
  for (const [a, b] of fast.families.map((block, index) => [block, slow.families[index]!] as const)) {
    const fastLearned = a.arms.find(arm => arm.armId === "learned")!;
    const slowLearned = b.arms.find(arm => arm.armId === "learned")!;
    assert.notEqual(fastLearned.p95WallClockMicro, slowLearned.p95WallClockMicro, a.family);
    assert.deepEqual({ ...fastLearned, p95WallClockMicro: 0 }, { ...slowLearned, p95WallClockMicro: 0 }, `${a.family}: every other metric unchanged`);
  }
});

test("malformed inputs refuse with GRAPH_EVALUATION_INVALID naming the defect", () => {
  const cases: [string, () => unknown, RegExp][] = [
    ["no arms", () => evaluateGraphFamilies({ arms: [] }), /no arms/],
    ["duplicate arm ids", () => evaluateGraphFamilies({ arms: [oracleArm, { ...learnedArm, armId: "exact-oracle" }] }), /duplicate/],
    ["blank arm id", () => evaluateGraphFamilies({ arms: [{ ...oracleArm, armId: "  " }] }), /blank/],
    ["empty episodes", () => evaluateGraphFamilies({ arms: [{ ...oracleArm, episodes: [], wallClockMicro: [] }] }), /no episode/],
    ["clock length mismatch", () => evaluateGraphFamilies({ arms: [{ ...oracleArm, wallClockMicro: [1] }] }), /wall-clock/],
    ["negative clock", () => evaluateGraphFamilies({ arms: [{ ...oracleArm, wallClockMicro: [-1, 2] }] }), /non-finite or negative/],
    ["oracle names no arm", () => evaluateGraphFamilies({ arms: [oracleArm], oracleArmId: "ghost" }), /oracle arm ghost/],
    ["foreign schema", () => evaluateGraphFamilies({ arms: [{ armId: "x", episodes: [{ ...oracleArm.episodes[0]!, schema: "other" as never }], wallClockMicro: [1] }] }), /schema/],
  ];
  for (const [label, run, pattern] of cases) {
    assert.throws(run, (error: Error) => error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && pattern.test(error.message), label);
  }
});

test("constraint and invalid rejections are counted by code class, exactly", () => {
  const source = landing(restackFirst);
  const rejected = (intentId: string, code: string) => ({ intentId, code });
  const doctored: Episode = {
    ...source,
    decisions: [
      { ...source.decisions[0]!, eligibility: { admitted: [...source.decisions[0]!.eligibility.admitted], rejected: [rejected("r1", "INTENT_BUDGET_EXCEEDED"), rejected("r2", "INTENT_WRITE_CONFLICT"), rejected("r3", "INTENT_BASIS_STALE")] } },
      { ...source.decisions[1]!, eligibility: { admitted: [...source.decisions[1]!.eligibility.admitted], rejected: [rejected("r4", "INTENT_SCOPE_PROTECTED"), rejected("r5", "INTENT_DUPLICATE")] } },
    ],
  };
  const report = evaluateGraphFamilies({ arms: [{ armId: "noisy", episodes: [doctored], wallClockMicro: [5_000] }] });
  const arm = report.families[0]!.arms[0]!;
  assert.equal(arm.constraintViolations, 3, "INTENT_BUDGET_EXCEEDED + INTENT_WRITE_CONFLICT + INTENT_SCOPE_PROTECTED");
  assert.equal(arm.invalidProposals, 2, "INTENT_BASIS_STALE + INTENT_DUPLICATE");
});

test("regression: evaluateEpisodes is unchanged — mixed families still refuse with EVALUATION_BATCH_UNMATCHED and the evaluation module never imports this one", () => {
  const pin = { agent: "qa", version: "1", seed: 7 };
  const budget = { steps: 40, units: 60 };
  const a = { kind: "episodes" as const, configuration: { id: "a", revision: "1", configHash: digest({ id: "a" }) }, pin, budget, episodes: [{ mode: "fixture", episode: landing(restackFirst) }] };
  const b = { kind: "episodes" as const, configuration: { id: "b", revision: "1", configHash: digest({ id: "b" }) }, pin, budget, episodes: [{ mode: "fixture", episode: quorum(independentTestFirst) }] };
  assert.throws(() => evaluateEpisodes({ entries: [a, b] }), /EVALUATION_BATCH_UNMATCHED/);
  const evaluationSource = readFileSync(join(here, "../src/evaluation.ts"), "utf8");
  assert.equal(evaluationSource.includes("graph-family-evaluation"), false, "evaluation.ts stays untouched");
  assert.equal(evaluationSource.includes("GRAPH_EVALUATION_INVALID"), false);
});

// MechanicalWorkflows-2fbz: twelve evaluator laws that the fixtures above never exercise (every arm runs 12 and 30 steps,
// one episode per family, sorted input, only a negative clock). Each probe below uses shaped episodes so the law is observable.
const shaped = (source: Episode, steps: number): Episode => ({ ...source, cost: { ...source.cost, steps } });
const admitting = (source: Episode, steps: number, admitted: readonly string[]): Episode =>
  shaped({ ...source, decisions: [{ ...source.decisions[0]!, eligibility: { admitted, rejected: [] } }] }, steps);

test("regret is arm mean minus oracle mean with its sign: a slower arm is positive, a faster arm negative, the oracle zero (2fbz L11)", () => {
  const base = landing(restackFirst);
  const report = evaluateGraphFamilies({
    arms: [
      { armId: "oracle", episodes: [shaped(base, 10)], wallClockMicro: [1] },
      { armId: "slow", episodes: [shaped(base, 14)], wallClockMicro: [1] },
      { armId: "fast", episodes: [shaped(base, 7)], wallClockMicro: [1] },
    ],
    oracleArmId: "oracle",
  });
  const rows = new Map(report.families[0]!.arms.map(arm => [arm.armId, arm]));
  assert.equal(rows.get("oracle")!.regretMicro, 0);
  assert.equal(rows.get("slow")!.regretMicro, 4_000_000, "14 steps against a 10 step oracle");
  assert.equal(rows.get("fast")!.regretMicro, -3_000_000, "7 steps against a 10 step oracle");
  assert.equal(rows.get("slow")!.meanStepsMicro, 14_000_000);
});

test("regret stays the literal unknown in a family the supplied oracle arm does not cover, and is a number where it does (2fbz L4)", () => {
  const base = landing(restackFirst);
  const other = quorum(independentTestFirst);
  const report = evaluateGraphFamilies({
    arms: [
      { armId: "oracle", episodes: [shaped(base, 10)], wallClockMicro: [1] },
      { armId: "learned", episodes: [shaped(base, 13), shaped(other, 25)], wallClockMicro: [1, 1] },
    ],
    oracleArmId: "oracle",
  });
  const learnedIn = (family: string) => report.families.find(block => block.family === family)!.arms.find(arm => arm.armId === "learned")!;
  assert.equal(learnedIn("landing-queue").regretMicro, 3_000_000);
  assert.equal(learnedIn("quorum-evidence").regretMicro, "unknown", "no oracle episode in this family: never a fabricated number");
});

test("p95 is the nearest-rank 95th of the sorted costs, never the max or an input-order pick, and n counts the arm's episodes (2fbz L1 L2 L10)", () => {
  const base = landing(restackFirst);
  const costs = Array.from({ length: 20 }, (_, index) => (((index * 7) % 20) + 1) * 1_000);
  assert.notDeepEqual(costs, [...costs].sort((a, b) => a - b), "the injected costs arrive unsorted");
  const report = evaluateGraphFamilies({ arms: [{ armId: "many", episodes: Array.from({ length: 20 }, () => base), wallClockMicro: costs }] });
  const arm = report.families[0]!.arms[0]!;
  assert.equal(arm.n, 20);
  assert.equal(arm.p95WallClockMicro, 19_000, "ceil(0.95 * 20) = rank 19 of 1000..20000");
});

test("throughput is admitted intents per step in micro units, averaged over the arm's episodes (2fbz L3)", () => {
  const base = landing(restackFirst);
  const single = evaluateGraphFamilies({ arms: [{ armId: "a", episodes: [admitting(base, 7, ["x", "y", "z"])], wallClockMicro: [1] }] });
  assert.equal(single.families[0]!.arms[0]!.throughputMicro, 428_571, "round(3 * 1e6 / 7)");
  const pair = evaluateGraphFamilies({ arms: [{ armId: "a", episodes: [admitting(base, 7, ["x", "y", "z"]), admitting(base, 4, ["p", "q", "r", "s", "t"])], wallClockMicro: [1, 1] }] });
  assert.equal(pair.families[0]!.arms[0]!.throughputMicro, 839_286, "mean of 428571 and 1250000");
});

test("a rejection code outside both documented classes counts as an invalid proposal, whatever its spelling (2fbz L5)", () => {
  const source = landing(restackFirst);
  const doctored: Episode = {
    ...source,
    decisions: [{ ...source.decisions[0]!, eligibility: { admitted: [], rejected: [{ intentId: "u1", code: "TOTALLY_FOREIGN" }, { intentId: "u2", code: "lowercase-code" }, { intentId: "u3", code: "INTENT_NEVER_HEARD_OF" }] } }],
  };
  const arm = evaluateGraphFamilies({ arms: [{ armId: "a", episodes: [doctored], wallClockMicro: [1] }] }).families[0]!.arms[0]!;
  assert.equal(arm.invalidProposals, 3);
  assert.equal(arm.constraintViolations, 0);
});

test("an injected cost of NaN, Infinity or -Infinity refuses, and a cost of 0 is accepted (2fbz L6 L12)", () => {
  for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(
      () => evaluateGraphFamilies({ arms: [{ ...oracleArm, wallClockMicro: [bad, 2] }] }),
      (error: Error) => error.message.startsWith("GRAPH_EVALUATION_INVALID: ") && /non-finite or negative/.test(error.message),
      String(bad),
    );
  }
  const zero = evaluateGraphFamilies({ arms: [{ ...oracleArm, wallClockMicro: [0, 0] }] });
  for (const block of zero.families) assert.equal(block.arms[0]!.p95WallClockMicro, 0, block.family);
});

test("family blocks and arm rows come back sorted when the input arrives out of order (2fbz L7 L8)", () => {
  const base = landing(restackFirst);
  const other = quorum(independentTestFirst);
  const report = evaluateGraphFamilies({
    arms: [
      { armId: "zeta", episodes: [other, base], wallClockMicro: [1, 1] },
      { armId: "alpha", episodes: [other, base], wallClockMicro: [1, 1] },
    ],
  });
  assert.deepEqual(report.families.map(block => block.family), ["landing-queue", "quorum-evidence"]);
  for (const block of report.families) assert.deepEqual(block.arms.map(arm => arm.armId), ["alpha", "zeta"], block.family);
});

test("reportDigest covers the family blocks: it equals the digest of the body and moves when one metric moves (2fbz L9)", () => {
  const first = evaluateGraphFamilies({ arms: [oracleArm, learnedArm], oracleArmId: "exact-oracle" });
  const { reportDigest, ...body } = first;
  assert.equal(reportDigest, digest(body), "digest binds schema, oracle arm, families and certified");
  const moved = evaluateGraphFamilies({ arms: [oracleArm, { ...learnedArm, wallClockMicro: [2_000, 11_001] }], oracleArmId: "exact-oracle" });
  assert.notEqual(moved.reportDigest, first.reportDigest, "a one-unit change in one family's p95 changes the digest");
});
