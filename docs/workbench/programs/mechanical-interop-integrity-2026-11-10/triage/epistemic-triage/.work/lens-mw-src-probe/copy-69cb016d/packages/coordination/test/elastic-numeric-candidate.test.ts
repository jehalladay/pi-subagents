import test from "node:test";
import assert from "node:assert/strict";
import {
  projectNumericObservation,
  numericCandidateActionSpec,
  parseElasticAction,
  NUMERIC_FEATURES,
  ELASTIC_ACTIONS,
  type FeatureEvidenceMap,
  type LandingObservation,
} from "../dist/index.js";

const evidence = (over: Partial<Record<string, { status: "observed" | "stale" | "absent"; raw: number; cap: number }>>): FeatureEvidenceMap => ({
  readyCount: { status: "observed", raw: 3, cap: 10 },
  staleCount: { status: "observed", raw: 2, cap: 10 },
  availableCapacity: { status: "observed", raw: 1, cap: 4 },
  recentRetryPressure: { status: "observed", raw: 5, cap: 5 },
  ...over,
});

const observation: LandingObservation = {
  basis: { workspaceId: "ws-1", revision: "rev-42" },
  head: "rev-42",
  lanes: 2,
  ready: [{ id: "cand-a", base: "rev-42", arrival: 1 }],
};

test("the projection normalizes the four declared features by their explicit caps", () => {
  const r = projectNumericObservation(evidence({}));
  assert.equal(r.kind, "projected");
  if (r.kind !== "projected") return;
  assert.deepEqual([...r.projection.features], [...NUMERIC_FEATURES]);
  assert.deepEqual([...r.projection.values], [0.3, 0.2, 0.25, 1]);
  assert.ok(Object.isFrozen(r.projection));
});

test("eligible support is pre-declared from the projection: full board allows all three, no capacity drops request-lane, no stale drops prioritize-restack", () => {
  const all = projectNumericObservation(evidence({}));
  assert.equal(all.kind, "projected");
  if (all.kind === "projected") assert.deepEqual([...all.projection.eligibleSupport], ["hold", "request-lane", "prioritize-restack"]);
  const noCap = projectNumericObservation(evidence({ availableCapacity: { status: "observed", raw: 0, cap: 4 } }));
  assert.equal(noCap.kind, "projected");
  if (noCap.kind === "projected") assert.deepEqual([...noCap.projection.eligibleSupport], ["hold", "prioritize-restack"]);
  const noStale = projectNumericObservation(evidence({ staleCount: { status: "observed", raw: 0, cap: 10 } }));
  assert.equal(noStale.kind, "projected");
  if (noStale.kind === "projected") assert.deepEqual([...noStale.projection.eligibleSupport], ["hold", "request-lane"]);
  assert.deepEqual([...ELASTIC_ACTIONS], ["hold", "request-lane", "prioritize-restack"]);
});

test("a missing feature, non-observed evidence, an inferred cap and a nonfinite raw each refuse", () => {
  const { readyCount: _dropped, ...rest } = evidence({});
  const missing = projectNumericObservation(rest);
  assert.equal(missing.kind, "refused");
  if (missing.kind === "refused") assert.equal(missing.code, "CANDIDATE_FEATURE_MISSING");
  const stale = projectNumericObservation(evidence({ staleCount: { status: "stale", raw: 2, cap: 10 } }));
  assert.equal(stale.kind, "refused");
  if (stale.kind === "refused") assert.equal(stale.code, "CANDIDATE_EVIDENCE_NOT_OBSERVED");
  const badCap = projectNumericObservation(evidence({ readyCount: { status: "observed", raw: 3, cap: 0 } }));
  assert.equal(badCap.kind, "refused");
  if (badCap.kind === "refused") assert.equal(badCap.code, "CANDIDATE_CAP_INVALID");
  const nf = projectNumericObservation(evidence({ recentRetryPressure: { status: "observed", raw: Number.NaN, cap: 5 } }));
  assert.equal(nf.kind, "refused");
  if (nf.kind === "refused") assert.equal(nf.code, "CANDIDATE_VALUE_NONFINITE");
});

test("the adapter mapping carries the exact expectedRevision via the observation basis and an explicit claim", () => {
  const projected = projectNumericObservation(evidence({}));
  assert.equal(projected.kind, "projected");
  if (projected.kind !== "projected") return;
  const lane = numericCandidateActionSpec(observation, projected.projection, "request-lane");
  assert.equal(lane.kind, "spec");
  if (lane.kind !== "spec") return;
  assert.equal(lane.note, "proposal-not-allocation");
  assert.equal(lane.spec.effect, "lane.allocate");
  assert.deepEqual(lane.spec.claim, { compute: 1, workers: 0, queue: 1, latencyMs: 1 });
  assert.deepEqual([...lane.spec.writeScopes], ["lane:new"]);
  const restack = numericCandidateActionSpec(observation, projected.projection, "prioritize-restack");
  assert.equal(restack.kind, "spec");
  if (restack.kind === "spec") assert.ok(restack.spec.target.uri.includes("cand-a"));
  const hold = numericCandidateActionSpec(observation, projected.projection, "hold");
  assert.equal(hold.kind, "spec");
  if (hold.kind === "spec") { assert.deepEqual([...hold.spec.writeScopes], []); assert.equal(hold.spec.claim.compute, 0); }
});

test("an unknown selected action fails to decode, and a decoded choice outside the pre-declared support refuses", () => {
  const projected = projectNumericObservation(evidence({ availableCapacity: { status: "observed", raw: 0, cap: 4 } }));
  assert.equal(projected.kind, "projected");
  if (projected.kind !== "projected") return;
  const unknown = parseElasticAction("scale-out");
  assert.equal(unknown.kind, "refused");
  if (unknown.kind === "refused") assert.equal(unknown.code, "CANDIDATE_ACTION_UNKNOWN");
  const parsed = parseElasticAction("request-lane");
  assert.equal(parsed.kind, "action");
  if (parsed.kind === "action") assert.equal(parsed.action, "request-lane");
  const ineligible = numericCandidateActionSpec(observation, projected.projection, "request-lane");
  assert.equal(ineligible.kind, "refused");
  if (ineligible.kind === "refused") assert.equal(ineligible.code, "CANDIDATE_ACTION_INELIGIBLE");
});

test("a finite negative raw refuses CANDIDATE_VALUE_NEGATIVE while NaN and Infinity stay CANDIDATE_VALUE_NONFINITE (6xno W3)", () => {
  const negative = projectNumericObservation(evidence({ readyCount: { status: "observed", raw: -1, cap: 10 } }));
  assert.equal(negative.kind, "refused");
  if (negative.kind === "refused") {
    assert.equal(negative.code, "CANDIDATE_VALUE_NEGATIVE");
    assert.ok(negative.detail.includes("readyCount"));
    assert.ok(negative.detail.includes("-1"));
  }
  const nan = projectNumericObservation(evidence({ readyCount: { status: "observed", raw: Number.NaN, cap: 10 } }));
  assert.equal(nan.kind, "refused");
  if (nan.kind === "refused") {
    assert.equal(nan.code, "CANDIDATE_VALUE_NONFINITE");
    assert.ok(nan.detail.includes("readyCount"));
    assert.ok(nan.detail.includes("is not a finite number"));
  }
  const inf = projectNumericObservation(evidence({ staleCount: { status: "observed", raw: Number.POSITIVE_INFINITY, cap: 10 } }));
  assert.equal(inf.kind, "refused");
  if (inf.kind === "refused") assert.equal(inf.code, "CANDIDATE_VALUE_NONFINITE");
  const negInf = projectNumericObservation(evidence({ staleCount: { status: "observed", raw: Number.NEGATIVE_INFINITY, cap: 10 } }));
  assert.equal(negInf.kind, "refused");
  if (negInf.kind === "refused") assert.equal(negInf.code, "CANDIDATE_VALUE_NONFINITE");
  const zero = projectNumericObservation(evidence({ readyCount: { status: "observed", raw: 0, cap: 10 } }));
  assert.equal(zero.kind, "projected");
});

test("normalization saturates at 1: a raw above its cap projects exactly 1 (6xno W4)", () => {
  const r = projectNumericObservation(evidence({ readyCount: { status: "observed", raw: 30, cap: 10 } }));
  assert.equal(r.kind, "projected");
  if (r.kind !== "projected") return;
  assert.equal(r.projection.values[0], 1);
  assert.ok(r.projection.values.every((v) => v >= 0 && v <= 1));
});

test("prioritize-restack with an empty ready queue refuses CANDIDATE_RESTACK_TARGET_MISSING, and stale with ready [] stays a valid observation (6xno W1)", () => {
  const projected = projectNumericObservation(evidence({}));
  assert.equal(projected.kind, "projected");
  if (projected.kind !== "projected") return;
  assert.ok(projected.projection.eligibleSupport.includes("prioritize-restack"));
  const emptyReady: LandingObservation = { ...observation, ready: [] };
  const restack = numericCandidateActionSpec(emptyReady, projected.projection, "prioritize-restack");
  assert.equal(restack.kind, "refused");
  if (restack.kind === "refused") assert.equal(restack.code, "CANDIDATE_RESTACK_TARGET_MISSING");
  const hold = numericCandidateActionSpec(emptyReady, projected.projection, "hold");
  assert.equal(hold.kind, "spec");
  const lane = numericCandidateActionSpec(emptyReady, projected.projection, "request-lane");
  assert.equal(lane.kind, "spec");
});

test("a handed eligibleSupport that disagrees with the projection's own values refuses CANDIDATE_SUPPORT_INCONSISTENT naming both sets (6xno W2)", () => {
  const honest = projectNumericObservation(evidence({ staleCount: { status: "observed", raw: 0, cap: 10 }, availableCapacity: { status: "observed", raw: 0, cap: 4 } }));
  assert.equal(honest.kind, "projected");
  if (honest.kind !== "projected") return;
  assert.deepEqual([...honest.projection.eligibleSupport], ["hold"]);
  const forgedUp = { ...honest.projection, eligibleSupport: ["hold", "request-lane", "prioritize-restack"] as const };
  const up = numericCandidateActionSpec(observation, forgedUp, "prioritize-restack");
  assert.equal(up.kind, "refused");
  if (up.kind === "refused") {
    assert.equal(up.code, "CANDIDATE_SUPPORT_INCONSISTENT");
    assert.ok(up.detail.includes("hold, request-lane, prioritize-restack"));
    assert.ok(up.detail.includes("{hold}"));
  }
  const full = projectNumericObservation(evidence({}));
  assert.equal(full.kind, "projected");
  if (full.kind !== "projected") return;
  const forgedDown = { ...full.projection, eligibleSupport: ["hold"] as const };
  const down = numericCandidateActionSpec(observation, forgedDown, "hold");
  assert.equal(down.kind, "refused");
  if (down.kind === "refused") assert.equal(down.code, "CANDIDATE_SUPPORT_INCONSISTENT");
  const reordered = { ...full.projection, eligibleSupport: ["prioritize-restack", "request-lane", "hold"] as const };
  const re = numericCandidateActionSpec(observation, reordered, "hold");
  assert.equal(re.kind, "spec");
});

test("a handed eligibleSupport with a duplicate or out-of-vocabulary entry, or a same-size different set, refuses CANDIDATE_SUPPORT_INCONSISTENT (6xno W2 length conjunct and element-wise compare)", () => {
  const full = projectNumericObservation(evidence({}));
  assert.equal(full.kind, "projected");
  if (full.kind !== "projected") return;
  const duplicate = numericCandidateActionSpec(observation, { ...full.projection, eligibleSupport: ["hold", "hold", "request-lane", "prioritize-restack"] as never }, "hold");
  assert.equal(duplicate.kind, "refused");
  if (duplicate.kind === "refused") assert.equal(duplicate.code, "CANDIDATE_SUPPORT_INCONSISTENT");
  const outOfVocabulary = numericCandidateActionSpec(observation, { ...full.projection, eligibleSupport: ["hold", "request-lane", "prioritize-restack", "scale-out"] as never }, "hold");
  assert.equal(outOfVocabulary.kind, "refused");
  if (outOfVocabulary.kind === "refused") assert.equal(outOfVocabulary.code, "CANDIDATE_SUPPORT_INCONSISTENT");
  const noCap = projectNumericObservation(evidence({ availableCapacity: { status: "observed", raw: 0, cap: 4 } }));
  assert.equal(noCap.kind, "projected");
  if (noCap.kind !== "projected") return;
  const swapped = numericCandidateActionSpec(observation, { ...noCap.projection, eligibleSupport: ["hold", "request-lane"] as never }, "hold");
  assert.equal(swapped.kind, "refused");
  if (swapped.kind === "refused") {
    assert.equal(swapped.code, "CANDIDATE_SUPPORT_INCONSISTENT");
    assert.ok(swapped.detail.includes("{hold, request-lane}"));
    assert.ok(swapped.detail.includes("{hold, prioritize-restack}"));
  }
});

test("a handed projection whose values.length differs from NUMERIC_FEATURES.length refuses CANDIDATE_PROJECTION_MALFORMED naming both lengths, before any support derivation (6xno G03)", () => {
  const honest = projectNumericObservation(evidence({}));
  assert.equal(honest.kind, "projected");
  if (honest.kind !== "projected") return;
  assert.equal(honest.projection.values.length, NUMERIC_FEATURES.length);
  for (const values of [[0.3], [], [0.3, 0.2, 0.25], [0.3, 0.2, 0.25, 1, 0.5]]) {
    const malformed = numericCandidateActionSpec(observation, { ...honest.projection, values, eligibleSupport: ["hold"] as never }, "hold");
    assert.equal(malformed.kind, "refused");
    if (malformed.kind === "refused") {
      assert.equal(malformed.code, "CANDIDATE_PROJECTION_MALFORMED");
      assert.ok(malformed.detail.includes(`values.length ${String(values.length)}`), malformed.detail);
      assert.ok(malformed.detail.includes(`NUMERIC_FEATURES.length ${String(NUMERIC_FEATURES.length)}`), malformed.detail);
    }
  }
  // the length check wins over a support disagreement: a short array with a forged support is malformed, not inconsistent
  const forged = numericCandidateActionSpec(observation, { ...honest.projection, values: [0.3], eligibleSupport: ["hold", "request-lane", "prioritize-restack"] as never }, "request-lane");
  assert.equal(forged.kind, "refused");
  if (forged.kind === "refused") assert.equal(forged.code, "CANDIDATE_PROJECTION_MALFORMED");
  // full-length behaviour is unchanged
  const ok = numericCandidateActionSpec(observation, honest.projection, "request-lane");
  assert.equal(ok.kind, "spec");
});
