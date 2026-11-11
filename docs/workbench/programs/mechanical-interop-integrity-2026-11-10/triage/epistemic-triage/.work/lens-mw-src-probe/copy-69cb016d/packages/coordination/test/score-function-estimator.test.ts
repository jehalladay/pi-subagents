import test from "node:test";
import assert from "node:assert/strict";
import {
  exactTwoClaimTable,
  estimateScoreFunctionGradient,
  seededStream,
  nextUniform,
  type EstimatorInput,
} from "../dist/index.js";

const input = (over: Partial<EstimatorInput>): EstimatorInput => ({
  p1: 0.3,
  p2: 0.4,
  samples: 20000,
  streams: { policy1: seededStream(11), policy2: seededStream(29) },
  toleranceStandardErrors: 4,
  ...over,
});

test("the exact two-claim table: J = p1 + p2 - 2 p1 p2, dJ/dp1 = 1 - 2 p2, dJ/dp2 = 1 - 2 p1", () => {
  const t = exactTwoClaimTable(0.3, 0.4);
  assert.ok(!("kind" in t));
  if ("kind" in t) return;
  assert.ok(Math.abs(t.objective - 0.46) < 1e-12);
  assert.ok(Math.abs(t.dJdp1 - 0.2) < 1e-12);
  assert.ok(Math.abs(t.dJdp2 - 0.4) < 1e-12);
  const symmetric = exactTwoClaimTable(0.5, 0.5);
  if (!("kind" in symmetric)) { assert.equal(symmetric.objective, 0.5); assert.equal(symmetric.dJdp1, 0); }
});

test("boundary and out-of-range probabilities refuse: the score is undefined there", () => {
  for (const [p1, p2] of [[0, 0.4], [1, 0.4], [0.3, 1.2], [Number.NaN, 0.4]] as const) {
    const t = exactTwoClaimTable(p1, p2);
    assert.ok("kind" in t && t.kind === "refused" && t.code === "ESTIMATOR_PROBABILITY_INVALID");
    const r = estimateScoreFunctionGradient(input({ p1, p2 }));
    assert.equal(r.kind, "refused");
  }
});

test("the seeded stream is deterministic, uniform in (0,1) and never mutates its predecessor", () => {
  const s = seededStream(7);
  const a = nextUniform(s);
  const b = nextUniform(s);
  assert.equal(a.value, b.value);
  assert.equal(s.state, seededStream(7).state);
  assert.ok(a.value > 0 && a.value < 1);
  let cur = s;
  let sum = 0;
  for (let i = 0; i < 2000; i++) { const u = nextUniform(cur); cur = u.next; sum += u.value; }
  assert.ok(Math.abs(sum / 2000 - 0.5) < 0.05);
});

test("the score-function estimate agrees with the exact gradient within the stated standard errors", () => {
  const r = estimateScoreFunctionGradient(input({}));
  assert.equal(r.kind, "estimate");
  if (r.kind !== "estimate") return;
  assert.equal(r.estimate.agreesWithExact, true);
  assert.ok(r.estimate.deviationInStandardErrors.dJdp1 <= 4);
  assert.ok(r.estimate.deviationInStandardErrors.dJdp2 <= 4);
  assert.ok(Math.abs(r.estimate.estimate.objective - 0.46) < 0.02);
  assert.ok(r.estimate.standardError.dJdp1 > 0 && r.estimate.standardError.dJdp1 < 0.05);
  const symmetric = estimateScoreFunctionGradient(input({ p1: 0.5, p2: 0.5, streams: { policy1: seededStream(3), policy2: seededStream(5) } }));
  assert.equal(symmetric.kind, "estimate");
  if (symmetric.kind === "estimate") assert.equal(symmetric.estimate.agreesWithExact, true);
});

test("the estimate is deterministic under the same seeds", () => {
  const a = estimateScoreFunctionGradient(input({}));
  const b = estimateScoreFunctionGradient(input({}));
  assert.deepEqual(a, b);
});

test("a shared RNG stream between the two policies is refused: independence is caller-constructed", () => {
  const r = estimateScoreFunctionGradient(input({ streams: { policy1: seededStream(11), policy2: seededStream(11) } }));
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "ESTIMATOR_STREAMS_SHARED");
});

test("too few samples or a nonpositive tolerance refuse", () => {
  const few = estimateScoreFunctionGradient(input({ samples: 1 }));
  assert.equal(few.kind, "refused");
  if (few.kind === "refused") assert.equal(few.code, "ESTIMATOR_SAMPLES_INSUFFICIENT");
  const frac = estimateScoreFunctionGradient(input({ samples: 10.5 }));
  assert.equal(frac.kind, "refused");
  const tol = estimateScoreFunctionGradient(input({ toleranceStandardErrors: 0 }));
  assert.equal(tol.kind, "refused");
  if (tol.kind === "refused") assert.equal(tol.code, "ESTIMATOR_TOLERANCE_INVALID");
});
