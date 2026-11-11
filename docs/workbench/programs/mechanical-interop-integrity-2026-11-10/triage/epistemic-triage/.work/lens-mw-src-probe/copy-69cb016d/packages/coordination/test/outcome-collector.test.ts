import test from "node:test";
import assert from "node:assert/strict";
import {
  collectTrainingOutcome,
  REWARD_CLASSES,
  type CollectorRun,
  type CollectedDecision,
  type ObservedOutcome,
  type RewardDeclaration,
  type IndependentBaseline,
} from "../dist/index.js";

const run: CollectorRun = { collectorId: "col-1", boundary: { kind: "process", trusted: true, declaredBy: "host-sandbox" } };
const decision = (over: Partial<CollectedDecision>): CollectedDecision => ({ decisionId: "dec-1", decidedTick: 10, eligibilityWindowTicks: 5, eligibilityAssessed: true, ...over });
const outcome = (over: Partial<ObservedOutcome>): ObservedOutcome => ({ observedTick: 12, admitted: false, fixtureOnly: false, ...over });
const reward = (over: Partial<RewardDeclaration>): RewardDeclaration => ({ rewardClass: "coordination-post-rejection", value: 2, ...over });
const baseline = (over: Partial<IndependentBaseline>): IndependentBaseline => ({ value: 0.5, dependsOnSampledAction: false, ...over });

test("a rejected decision books post-rejection coordination reward with an independent baseline", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({}), reward({}), baseline({}));
  assert.equal(r.kind, "example");
  if (r.kind !== "example") return;
  assert.equal(r.example.decisionId, "dec-1");
  assert.equal(r.example.rewardClass, "coordination-post-rejection");
  assert.equal(r.example.value, 2);
  assert.equal(r.example.advantage, 1.5);
  assert.equal(r.example.mode, "native");
  assert.deepEqual(r.example.eligibility, { windowTicks: 5, latencyTicks: 2 });
  assert.deepEqual([...REWARD_CLASSES], ["coordination-post-rejection", "native-executed"]);
  assert.ok(Object.isFrozen(REWARD_CLASSES));
  assert.equal(r.example.schema, "mw.training-outcome.v0");
});

test("the zone law runs first: no boundary, untrusted, inferred or undeclared refuses collection", () => {
  const none = collectTrainingOutcome({ collectorId: "c" }, decision({}), outcome({}), reward({}), baseline({}));
  assert.equal(none.kind, "refused");
  if (none.kind === "refused") assert.equal(none.code, "TRUST_COLLECTOR_UNSANDBOXED");
  const inferred = collectTrainingOutcome({ collectorId: "c", boundary: { kind: "process", trusted: true, declaredBy: "host", inferred: true } }, decision({}), outcome({}), reward({}), baseline({}));
  assert.equal(inferred.kind, "refused");
  if (inferred.kind === "refused") assert.equal(inferred.code, "TRUST_COLLECTOR_BOUNDARY_INFERRED");
});

test("an unassessed decision is never collected", () => {
  const r = collectTrainingOutcome(run, decision({ eligibilityAssessed: false }), outcome({}), reward({}), baseline({}));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_ELIGIBILITY_UNASSESSED");
});

test("an outcome outside the eligibility window, or observed before the decision, refuses", () => {
  const late = collectTrainingOutcome(run, decision({}), outcome({ observedTick: 16 }), reward({}), baseline({}));
  assert.equal(late.kind, "refused");
  if (late.kind === "refused") assert.equal(late.code, "COLLECTOR_ELIGIBILITY_EXPIRED");
  const before = collectTrainingOutcome(run, decision({}), outcome({ observedTick: 9 }), reward({}), baseline({}));
  assert.equal(before.kind, "refused");
  if (before.kind === "refused") assert.equal(before.code, "COLLECTOR_ELIGIBILITY_INVALID");
  const edge = collectTrainingOutcome(run, decision({}), outcome({ observedTick: 15 }), reward({}), baseline({}));
  assert.equal(edge.kind, "example");
});

test("an action-dependent baseline is refused, not corrected", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({}), reward({}), baseline({ dependsOnSampledAction: true }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_BASELINE_ACTION_DEPENDENT");
});

test("native-executed reward requires an admitted decision with an acknowledged receipt", () => {
  const ok = collectTrainingOutcome(run, decision({}), outcome({ admitted: true, nativeStatus: "acknowledged" }), reward({ rewardClass: "native-executed", value: 3 }), baseline({}));
  assert.equal(ok.kind, "example");
  if (ok.kind === "example") assert.equal(ok.example.mode, "native");
  const unexecuted = collectTrainingOutcome(run, decision({}), outcome({ admitted: true, nativeStatus: "pending" }), reward({ rewardClass: "native-executed" }), baseline({}));
  assert.equal(unexecuted.kind, "refused");
  if (unexecuted.kind === "refused") assert.equal(unexecuted.code, "COLLECTOR_REWARD_CLASS_MIXED");
  const rejected = collectTrainingOutcome(run, decision({}), outcome({ admitted: false }), reward({ rewardClass: "native-executed" }), baseline({}));
  assert.equal(rejected.kind, "refused");
});

test("a fixture-only outcome is never booked as native: synthetic outcome is not a live PASS", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({ admitted: true, nativeStatus: "acknowledged", fixtureOnly: true }), reward({ rewardClass: "native-executed" }), baseline({}));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_FIXTURE_AS_NATIVE");
  const coordFixture = collectTrainingOutcome(run, decision({}), outcome({ fixtureOnly: true }), reward({}), baseline({}));
  assert.equal(coordFixture.kind, "example");
  if (coordFixture.kind === "example") assert.equal(coordFixture.example.mode, "fixture");
});

test("an admitted or executed outcome cannot be booked as post-rejection coordination reward", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({ admitted: true, nativeStatus: "acknowledged" }), reward({}), baseline({}));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_REWARD_CLASS_MIXED");
});

test("unknown reward classes and nonfinite values refuse", () => {
  const unknown = collectTrainingOutcome(run, decision({}), outcome({}), reward({ rewardClass: "shaped-bonus" }), baseline({}));
  assert.equal(unknown.kind, "refused");
  if (unknown.kind === "refused") assert.equal(unknown.code, "COLLECTOR_REWARD_CLASS_UNKNOWN");
  const nf = collectTrainingOutcome(run, decision({}), outcome({}), reward({ value: Number.NaN }), baseline({}));
  assert.equal(nf.kind, "refused");
  if (nf.kind === "refused") assert.equal(nf.code, "COLLECTOR_VALUE_NONFINITE");
  const badWindow = collectTrainingOutcome(run, decision({ eligibilityWindowTicks: -1 }), outcome({}), reward({}), baseline({}));
  assert.equal(badWindow.kind, "refused");
  if (badWindow.kind === "refused") assert.equal(badWindow.code, "COLLECTOR_ELIGIBILITY_INVALID");
});

test("a nonfinite baseline value refuses even when the reward value is finite", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({}), reward({}), baseline({ value: Number.NaN }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_VALUE_NONFINITE");
});

test("a nonfinite decidedTick, observedTick or eligibility window refuses as an invalid eligibility", () => {
  const cases: ReadonlyArray<readonly [string, CollectedDecision, ObservedOutcome]> = [
    ["decidedTick", decision({ decidedTick: Number.NaN }), outcome({})],
    ["observedTick", decision({}), outcome({ observedTick: Number.NaN })],
    ["eligibilityWindowTicks", decision({ eligibilityWindowTicks: Number.NaN }), outcome({})],
  ];
  for (const [label, d, o] of cases) {
    const r = collectTrainingOutcome(run, d, o, reward({}), baseline({}));
    assert.equal(r.kind, "refused", label);
    if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_ELIGIBILITY_INVALID", label);
  }
});

test("a native-executed reward on an unadmitted outcome refuses as mixed even with an acknowledged receipt status", () => {
  const r = collectTrainingOutcome(run, decision({}), outcome({ admitted: false, nativeStatus: "acknowledged" }), reward({ rewardClass: "native-executed" }), baseline({}));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "COLLECTOR_REWARD_CLASS_MIXED");
});
