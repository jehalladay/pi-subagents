import test from "node:test";
import assert from "node:assert/strict";
import {
  CANONICAL_BASELINES,
  runBaselineComparison,
  type ExperimentArm,
} from "../dist/index.js";

const arm = (baseline: string, primaryMetric: number, extra?: Partial<ExperimentArm>): ExperimentArm => ({
  baseline,
  eventStreamId: "stream-7",
  trainSeeds: [],
  evaluationSeeds: ["s1", "s2"],
  primaryMetric,
  costs: { trainingSearch: 1, promotion: 0.5 },
  ...extra,
});

const fullArms = (): ExperimentArm[] => CANONICAL_BASELINES.map((name, i) =>
  name === "learned-residual" || name === "structurally-specialized-parent-child"
    ? arm(name, 10 - i, { trainSeeds: ["t1", "t2"] })
    : arm(name, 10 - i),
);

test("the canonical list is pinned to the eight doc baselines and the full report ranks them", () => {
  assert.equal(CANONICAL_BASELINES.length, 8);
  assert.ok(CANONICAL_BASELINES.includes("fixed-fifo") && CANONICAL_BASELINES.includes("structurally-specialized-parent-child"));
  assert.ok(Object.isFrozen(CANONICAL_BASELINES));
  const report = runBaselineComparison(fullArms());
  assert.equal(report.ok, true);
  assert.equal(report.streamId, "stream-7");
  assert.equal(report.ranking.length, 8);
  assert.equal(report.ranking[0]!.baseline, "fixed-fifo");
  assert.ok(report.ranking.every((r, i, a) => i === 0 || a[i - 1]!.primaryMetric >= r.primaryMetric));
  assert.ok(Object.isFrozen(report) && Object.isFrozen(report.ranking) && Object.isFrozen(report.ranking[0]!));
  assert.equal(report.ranking[0]!.costs.trainingSearch, 1);
});

test("negative: a missing canonical baseline refuses by name", () => {
  const arms = fullArms().filter((a) => a.baseline !== "exact-small-oracle");
  const report = runBaselineComparison(arms);
  assert.equal(report.ok, false);
  assert.ok(report.refusals.some((r) => r.code === "EXPERIMENT_BASELINE_MISSING" && r.detail.includes("exact-small-oracle")));
});

test("negative: an unknown baseline and a duplicated baseline refuse", () => {
  const unknown = runBaselineComparison([...fullArms(), arm("hand-tuned-magic", 1)]);
  assert.ok(unknown.refusals.some((r) => r.code === "EXPERIMENT_BASELINE_UNKNOWN"));
  const dup = runBaselineComparison([...fullArms(), arm("fixed-fifo", 2)]);
  assert.ok(dup.refusals.some((r) => r.code === "EXPERIMENT_BASELINE_DUPLICATE"));
});

test("negative: arms on mixed event streams refuse: the comparison is matched", () => {
  const arms = fullArms();
  const mixed = [...arms.slice(0, 7), { ...arms[7]!, eventStreamId: "stream-8" }];
  const report = runBaselineComparison(mixed);
  assert.ok(report.refusals.some((r) => r.code === "EXPERIMENT_STREAM_MISMATCHED"));
});

test("negative: a trained arm evaluating on its own training seeds refuses: heldout means disjoint", () => {
  const arms = fullArms().map((a) =>
    a.baseline === "structurally-specialized-parent-child" ? { ...a, trainSeeds: ["s1", "t2"] } : a,
  );
  const report = runBaselineComparison(arms);
  assert.equal(report.ok, false);
  assert.ok(report.refusals.some((r) => r.code === "EXPERIMENT_SEED_OVERLAP" && r.detail.includes("structurally-specialized-parent-child")));
});

test("negative: a nonfinite metric and a negative or nonfinite cost refuse", () => {
  const badMetric = runBaselineComparison(fullArms().map((a) => (a.baseline === "fixed-fifo" ? { ...a, primaryMetric: Number.NaN } : a)));
  assert.ok(badMetric.refusals.some((r) => r.code === "EXPERIMENT_METRIC_NONFINITE"));
  const badCost = runBaselineComparison(fullArms().map((a) => (a.baseline === "restack-first" ? { ...a, costs: { trainingSearch: -1, promotion: 0 } } : a)));
  assert.ok(badCost.refusals.some((r) => r.code === "EXPERIMENT_COST_INVALID"));
});

test("gf13 F1: the canonical list equals the eight program-doc names verbatim in source order", () => {
  assert.deepEqual([...CANONICAL_BASELINES], [
    "fixed-fifo",
    "restack-first",
    "installed-elastic-lane-heuristic",
    "exact-small-oracle",
    "greedy-compatible-subset-selector",
    "parameter-tuned-deterministic-rule",
    "learned-residual",
    "structurally-specialized-parent-child",
  ]);
});

test("gf13 F2: an Infinity metric, a nonfinite training cost and a negative promotion cost each refuse by code", () => {
  const infMetric = runBaselineComparison(fullArms().map((a) => (a.baseline === "fixed-fifo" ? { ...a, primaryMetric: Number.POSITIVE_INFINITY } : a)));
  assert.equal(infMetric.ok, false);
  assert.ok(infMetric.refusals.some((r) => r.code === "EXPERIMENT_METRIC_NONFINITE" && r.detail.includes("fixed-fifo")));
  const nanTraining = runBaselineComparison(fullArms().map((a) => (a.baseline === "restack-first" ? { ...a, costs: { trainingSearch: Number.NaN, promotion: 0.5 } } : a)));
  assert.ok(nanTraining.refusals.some((r) => r.code === "EXPERIMENT_COST_INVALID" && r.detail.includes("restack-first")));
  const infTraining = runBaselineComparison(fullArms().map((a) => (a.baseline === "restack-first" ? { ...a, costs: { trainingSearch: Number.POSITIVE_INFINITY, promotion: 0.5 } } : a)));
  assert.ok(infTraining.refusals.some((r) => r.code === "EXPERIMENT_COST_INVALID"));
  const negPromotion = runBaselineComparison(fullArms().map((a) => (a.baseline === "exact-small-oracle" ? { ...a, costs: { trainingSearch: 1, promotion: -0.5 } } : a)));
  assert.equal(negPromotion.ok, false);
  assert.ok(negPromotion.refusals.some((r) => r.code === "EXPERIMENT_COST_INVALID" && r.detail.includes("exact-small-oracle")));
});

test("gf13 F3: unknown refusals name the baseline and skip dedupe; refusal reports carry the schema literal and frozen rows", () => {
  const unknown = runBaselineComparison([...fullArms(), arm("hand-tuned-magic", 1)]);
  assert.ok(unknown.refusals.some((r) => r.code === "EXPERIMENT_BASELINE_UNKNOWN" && r.detail.includes("hand-tuned-magic")));
  const twice = runBaselineComparison([...fullArms(), arm("hand-tuned-magic", 1), arm("hand-tuned-magic", 2)]);
  assert.equal(twice.refusals.filter((r) => r.code === "EXPERIMENT_BASELINE_UNKNOWN").length, 2);
  assert.equal(twice.refusals.some((r) => r.code === "EXPERIMENT_BASELINE_DUPLICATE"), false);
  assert.equal(unknown.schema, "mw.baseline-experiment.v0");
  assert.equal(runBaselineComparison(fullArms()).schema, "mw.baseline-experiment.v0");
  assert.ok(Object.isFrozen(unknown) && Object.isFrozen(unknown.refusals) && Object.isFrozen(unknown.ranking));
  assert.ok(unknown.refusals.length > 0 && unknown.refusals.every((r) => Object.isFrozen(r)));
});

test("gf13 F4: ties rank by baseline name, ranked metrics equal the inputs, and ranked costs are frozen and carry promotion", () => {
  const tied = runBaselineComparison(CANONICAL_BASELINES.map((name) => arm(name, 5)));
  assert.equal(tied.ok, true);
  assert.deepEqual(tied.ranking.map((r) => r.baseline), [...CANONICAL_BASELINES].sort((a, b) => a.localeCompare(b)));
  const report = runBaselineComparison(fullArms());
  assert.deepEqual(report.ranking.map((r) => r.primaryMetric), [10, 9, 8, 7, 6, 5, 4, 3]);
  assert.ok(report.ranking.every((r) => Object.isFrozen(r.costs)));
  assert.equal(report.ranking[0]!.costs.promotion, 0.5);
});
