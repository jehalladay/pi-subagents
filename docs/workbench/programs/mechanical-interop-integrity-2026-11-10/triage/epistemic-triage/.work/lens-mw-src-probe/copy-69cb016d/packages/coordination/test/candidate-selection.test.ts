import test from "node:test";
import assert from "node:assert/strict";
import {
  compareOnHeldout,
  retainInLineage,
  EMPTY_LINEAGE,
  type SelectionInput,
  type MetricSet,
} from "../dist/index.js";

const metrics = (over: Partial<MetricSet>): MetricSet => ({ score: 1, computeBudget: 10, tailRisk: 0.1, stability: 1, ...over });
const base = (over: Partial<SelectionInput>): SelectionInput => ({
  candidateId: "cand-1",
  parentId: "parent-1",
  declaredParentId: "parent-1",
  rewrites: ["rw-1"],
  regimes: [
    { regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({ score: 2 }), parent: metrics({}) },
    { regime: "bursty", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({}), parent: metrics({}) },
  ],
  tolerances: { computeBudget: 0, tailRisk: 0, stability: 0 },
  ...over,
});

test("a candidate beating its parent on one heldout regime with no guard regression is selected, and promotion is not performed", () => {
  const r = compareOnHeldout(base({}));
  assert.equal(r.decision, "selected");
  assert.deepEqual([...r.scoreWins], ["steady"]);
  assert.equal(r.promotion, "not-performed");
  assert.deepEqual(r.refusals, []);
  assert.ok(Object.isFrozen(r));
});

test("zero or several rewrites refuse: a candidate carries exactly one", () => {
  const none = compareOnHeldout(base({ rewrites: [] }));
  assert.equal(none.decision, "rejected");
  assert.ok(none.refusals.some((x) => x.code === "SELECTION_NO_REWRITE"));
  const many = compareOnHeldout(base({ rewrites: ["rw-1", "rw-2"] }));
  assert.equal(many.decision, "rejected");
  assert.ok(many.refusals.some((x) => x.code === "SELECTION_MULTIPLE_REWRITES"));
});

test("a non-heldout regime or training-shared seeds refuse that regime", () => {
  const notHeld = compareOnHeldout(base({ regimes: [{ regime: "train", heldout: false, seedsDisjointFromTraining: true, candidate: metrics({ score: 9 }), parent: metrics({}) }] }));
  assert.equal(notHeld.decision, "rejected");
  assert.ok(notHeld.refusals.some((x) => x.code === "SELECTION_REGIME_NOT_HELDOUT"));
  const shared = compareOnHeldout(base({ regimes: [{ regime: "leaky", heldout: true, seedsDisjointFromTraining: false, candidate: metrics({ score: 9 }), parent: metrics({}) }] }));
  assert.ok(shared.refusals.some((x) => x.code === "SELECTION_REGIME_NOT_HELDOUT"));
});

test("a guard-axis regression beyond tolerance rejects and names regime, axis and both values", () => {
  const r = compareOnHeldout(base({ regimes: [
    { regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({ score: 3, tailRisk: 0.5 }), parent: metrics({}) },
  ] }));
  assert.equal(r.decision, "rejected");
  assert.equal(r.guardRegressions.length, 1);
  const g = r.guardRegressions[0]!;
  assert.equal(g.regime, "steady");
  assert.equal(g.axis, "tailRisk");
  assert.equal(g.candidate, 0.5);
  assert.equal(g.parent, 0.1);
});

test("a regression inside a declared tolerance is accepted", () => {
  const r = compareOnHeldout(base({
    regimes: [{ regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({ score: 3, computeBudget: 10.5 }), parent: metrics({}) }],
    tolerances: { computeBudget: 0.1, tailRisk: 0, stability: 0 },
  }));
  assert.equal(r.decision, "selected");
  assert.deepEqual(r.guardRegressions, []);
});

test("no score win on any regime rejects even with clean guards", () => {
  const r = compareOnHeldout(base({ regimes: [{ regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({}), parent: metrics({}) }] }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual([...r.scoreWins], []);
});

test("empty regimes, nonfinite metrics, a negative tolerance and a parent mismatch refuse", () => {
  const empty = compareOnHeldout(base({ regimes: [] }));
  assert.ok(empty.refusals.some((x) => x.code === "SELECTION_REGIMES_EMPTY"));
  const nf = compareOnHeldout(base({ regimes: [{ regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({ score: Number.NaN }), parent: metrics({}) }] }));
  assert.ok(nf.refusals.some((x) => x.code === "SELECTION_METRIC_NONFINITE"));
  // hvxt ruling F5 (ihuj): a finite negative tolerance has its own code; NaN or infinite tolerance keeps NONFINITE.
  const tol = compareOnHeldout(base({ tolerances: { computeBudget: -1, tailRisk: 0, stability: 0 } }));
  assert.ok(tol.refusals.some((x) => x.code === "SELECTION_TOLERANCE_NEGATIVE"));
  assert.ok(!tol.refusals.some((x) => x.code === "SELECTION_METRIC_NONFINITE"));
  const nanTol = compareOnHeldout(base({ tolerances: { computeBudget: Number.NaN, tailRisk: 0, stability: 0 } }));
  assert.ok(nanTol.refusals.some((x) => x.code === "SELECTION_METRIC_NONFINITE"));
  assert.ok(!nanTol.refusals.some((x) => x.code === "SELECTION_TOLERANCE_NEGATIVE"));
  const mis = compareOnHeldout(base({ declaredParentId: "parent-2" }));
  assert.ok(mis.refusals.some((x) => x.code === "SELECTION_PARENT_MISMATCH"));
  assert.equal(mis.decision, "rejected");
});

// Absent-key laws (yoms, lo6k.2 lead F1/F4): validation covers the declared axes, never only the keys an input carries.
// Inputs are cast because the exported types make every key required; only JSON-fed or plain-JS callers can omit one.
const without = <T extends object>(obj: T, key: string): T => {
  const copy = { ...obj } as Record<string, unknown>;
  delete copy[key];
  return copy as T;
};
const steady = (over: { candidate?: MetricSet; parent?: MetricSet }) => ({
  regime: "steady",
  heldout: true,
  seedsDisjointFromTraining: true,
  candidate: over.candidate ?? metrics({ score: 2 }),
  parent: over.parent ?? metrics({}),
});

test("L6 control: every key present with stability 0.5 vs 1 still rejects on the stability axis (hvxt Q1: lower stability is the regression)", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.5 }) })], tolerances: { computeBudget: 0, tailRisk: 0, stability: 0 } }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual(r.guardRegressions.map((g) => g.axis), ["stability"]);
  assert.deepEqual(r.refusals, []);
});

test("L1 a tolerances object that omits a guard axis refuses and names the axis, never a silent pass", () => {
  for (const axis of ["computeBudget", "tailRisk", "stability"]) {
    const tolerances = without({ computeBudget: 0, tailRisk: 0, stability: 0 }, axis);
    const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 5, computeBudget: 50, tailRisk: 0.9 }) })], tolerances }));
    assert.equal(r.decision, "rejected", axis);
    const refusal = r.refusals.find((x) => x.code === "SELECTION_METRIC_NONFINITE");
    assert.ok(refusal, axis);
    assert.ok(refusal.detail.includes(axis), `${axis}: ${refusal.detail}`);
  }
});

test("L2 a candidate metric set that omits a guard axis refuses and names the regime and the key", () => {
  for (const axis of ["computeBudget", "tailRisk", "stability"]) {
    const r = compareOnHeldout(base({ regimes: [steady({ candidate: without(metrics({ score: 2 }), axis) })] }));
    assert.equal(r.decision, "rejected", axis);
    assert.deepEqual(r.guardRegressions, [], axis);
    const refusal = r.refusals.find((x) => x.code === "SELECTION_METRIC_NONFINITE");
    assert.ok(refusal, axis);
    assert.ok(refusal.detail.includes("steady") && refusal.detail.includes(axis), `${axis}: ${refusal.detail}`);
  }
});

test("L3 a parent metric set that omits a guard axis refuses and names the regime and the key", () => {
  for (const axis of ["computeBudget", "tailRisk", "stability"]) {
    const r = compareOnHeldout(base({ regimes: [steady({ parent: without(metrics({}), axis) })] }));
    assert.equal(r.decision, "rejected", axis);
    const refusal = r.refusals.find((x) => x.code === "SELECTION_METRIC_NONFINITE");
    assert.ok(refusal, axis);
    assert.ok(refusal.detail.includes("steady") && refusal.detail.includes(axis), `${axis}: ${refusal.detail}`);
  }
});

test("L4 a candidate or parent metric set that omits score refuses", () => {
  const noCandidateScore = compareOnHeldout(base({ regimes: [steady({ candidate: without(metrics({ score: 2 }), "score") })] }));
  assert.equal(noCandidateScore.decision, "rejected");
  const c = noCandidateScore.refusals.find((x) => x.code === "SELECTION_METRIC_NONFINITE");
  assert.ok(c && c.detail.includes("score"), JSON.stringify(noCandidateScore.refusals));
  const noParentScore = compareOnHeldout(base({ regimes: [steady({ parent: without(metrics({}), "score") })] }));
  assert.equal(noParentScore.decision, "rejected");
  const p = noParentScore.refusals.find((x) => x.code === "SELECTION_METRIC_NONFINITE");
  assert.ok(p && p.detail.includes("score"), JSON.stringify(noParentScore.refusals));
});

test("L5 an absent tolerances object yields a refusal record, never a TypeError", () => {
  const input = without(base({}), "tolerances") as SelectionInput;
  let r: ReturnType<typeof compareOnHeldout> | undefined;
  assert.doesNotThrow(() => {
    r = compareOnHeldout(input);
  });
  assert.ok(r);
  assert.equal(r.decision, "rejected");
  assert.equal(r.schema, "mw.candidate-selection.v0");
  assert.ok(r.refusals.some((x) => x.code === "SELECTION_METRIC_NONFINITE" && x.detail.includes("tolerances")), JSON.stringify(r.refusals));
});

test("c4zv a JSON null tolerances object yields a refusal record, never a TypeError", () => {
  const input = { ...base({}), tolerances: null } as unknown as SelectionInput;
  let r: ReturnType<typeof compareOnHeldout> | undefined;
  assert.doesNotThrow(() => {
    r = compareOnHeldout(input);
  });
  assert.ok(r);
  assert.equal(r.decision, "rejected");
  assert.ok(r.refusals.some((x) => x.code === "SELECTION_METRIC_NONFINITE" && x.detail.includes("tolerances")), JSON.stringify(r.refusals));
});

// jr6j laws (lo6k.2 post-landing mutation survivors V1 V3 V4 V5 V6 V7 V8 V9 V10 V11): each pins behavior the landed tree already has.
const NONFINITE = "SELECTION_METRIC_NONFINITE";

test("jr6j-L1 a computeBudget regression beyond tolerance 0 rejects and names the computeBudget axis", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 11 }) })] }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [["steady", "computeBudget", 11, 10]]);
});

test("jr6j-L2 each guard axis reads its own tolerance, never a neighbour's", () => {
  const worseTail = steady({ candidate: metrics({ score: 2, tailRisk: 0.5 }) });
  const budgetOnly = compareOnHeldout(base({ regimes: [worseTail], tolerances: { computeBudget: 0.5, tailRisk: 0, stability: 0 } }));
  assert.equal(budgetOnly.decision, "rejected");
  assert.deepEqual(budgetOnly.guardRegressions.map((g) => g.axis), ["tailRisk"]);
  const worseBudget = steady({ candidate: metrics({ score: 2, computeBudget: 11 }) });
  const tailOnly = compareOnHeldout(base({ regimes: [worseBudget], tolerances: { computeBudget: 0, tailRisk: 0.5, stability: 0.5 } }));
  assert.equal(tailOnly.decision, "rejected");
  assert.deepEqual(tailOnly.guardRegressions.map((g) => g.axis), ["computeBudget"]);
  const worseStability = steady({ candidate: metrics({ score: 2, stability: 0.5 }) });
  const stabilityZero = compareOnHeldout(base({ regimes: [worseStability], tolerances: { computeBudget: 0.5, tailRisk: 0.5, stability: 0 } }));
  assert.deepEqual(stabilityZero.guardRegressions.map((g) => g.axis), ["stability"]);
  // A worsening inside ONE axis's own tolerance stays accepted while every neighbour's tolerance is 0.
  const tailInside = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, tailRisk: 0.14 }) })], tolerances: { computeBudget: 0, tailRisk: 0.5, stability: 0 } }));
  assert.equal(tailInside.decision, "selected");
  assert.deepEqual(tailInside.guardRegressions, []);
  const stabilityInside = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.6 }) })], tolerances: { computeBudget: 0, tailRisk: 0, stability: 0.5 } }));
  assert.equal(stabilityInside.decision, "selected");
  assert.deepEqual(stabilityInside.guardRegressions, []);
  const budgetInside = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 14 }) })], tolerances: { computeBudget: 0.5, tailRisk: 0, stability: 0 } }));
  assert.equal(budgetInside.decision, "selected");
  assert.deepEqual(budgetInside.guardRegressions, []);
});

test("jr6j-L3 an Infinity or NaN tolerance on any guard axis refuses with the nonfinite code", () => {
  for (const bad of [Number.POSITIVE_INFINITY, Number.NaN]) {
    for (const axis of ["computeBudget", "tailRisk", "stability"]) {
      const tolerances = { computeBudget: 0, tailRisk: 0, stability: 0, [axis]: bad };
      const r = compareOnHeldout(base({ tolerances }));
      assert.equal(r.decision, "rejected", `${axis} ${bad}`);
      const refusal = r.refusals.find((x) => x.code === NONFINITE);
      assert.ok(refusal, `${axis} ${bad}`);
      assert.ok(refusal.detail.includes(axis), `${axis} ${bad}: ${refusal.detail}`);
    }
  }
});

test("jr6j-L4 a NaN parent metric refuses with the nonfinite code, names the parent side and rejects", () => {
  for (const axis of ["score", "computeBudget", "tailRisk", "stability"]) {
    const r = compareOnHeldout(base({ regimes: [steady({ parent: metrics({ [axis]: Number.NaN }) })] }));
    assert.equal(r.decision, "rejected", axis);
    const refusal = r.refusals.find((x) => x.code === NONFINITE);
    assert.ok(refusal, axis);
    assert.ok(refusal.detail.includes(`parent.${axis}`), `${axis}: ${refusal.detail}`);
  }
});

test("jr6j-L5 an Infinity metric on either side refuses with the nonfinite code, Infinity is not finite", () => {
  for (const side of ["candidate", "parent"] as const) {
    for (const inf of [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      const r = compareOnHeldout(base({ regimes: [steady({ [side]: metrics({ score: inf }) })] }));
      assert.equal(r.decision, "rejected", `${side} ${inf}`);
      const refusal = r.refusals.find((x) => x.code === NONFINITE);
      assert.ok(refusal, `${side} ${inf}`);
      assert.ok(refusal.detail.includes(`${side}.score`), `${side} ${inf}: ${refusal.detail}`);
      assert.deepEqual([...r.scoreWins], [], `${side} ${inf}`);
    }
  }
});

test("jr6j-L6 a second, distinct evaluation with the same candidateId refuses as a lineage duplicate and leaves the archive unchanged", () => {
  const first = compareOnHeldout(base({}));
  const again = compareOnHeldout(base({ rewrites: [] }));
  assert.notEqual(first, again);
  assert.equal(first.candidateId, again.candidateId);
  const once = retainInLineage(EMPTY_LINEAGE, first);
  assert.equal(once.kind, "retained");
  if (once.kind !== "retained") return;
  const twice = retainInLineage(once.lineage, again);
  assert.equal(twice.kind, "refused");
  if (twice.kind === "refused") {
    assert.equal(twice.code, "SELECTION_LINEAGE_DUPLICATE");
    assert.ok(twice.detail.includes("cand-1"), twice.detail);
  }
  assert.equal(once.lineage.records.length, 1);
  assert.equal(once.lineage.records[0], first);
});

test("jr6j-L7 a lone non-heldout regime rejects with no score wins and the not-heldout code", () => {
  for (const shape of [{ heldout: false, seedsDisjointFromTraining: true }, { heldout: true, seedsDisjointFromTraining: false }]) {
    const r = compareOnHeldout(base({ regimes: [{ ...steady({ candidate: metrics({ score: 9 }) }), ...shape }] }));
    assert.equal(r.decision, "rejected");
    assert.deepEqual([...r.scoreWins], []);
    assert.deepEqual([...r.guardRegressions], []);
    assert.deepEqual(r.refusals.map((x) => x.code), ["SELECTION_REGIME_NOT_HELDOUT"]);
  }
});

test("jr6j-L8 a lone nonfinite regime rejects with no score wins and no guard regressions beside the nonfinite refusal", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 9, computeBudget: 99, tailRisk: Number.NaN }) })] }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual([...r.scoreWins], []);
  assert.deepEqual([...r.guardRegressions], []);
  assert.deepEqual(r.refusals.map((x) => x.code), [NONFINITE]);
});

test("jr6j-L9 the selection record's scoreWins, guardRegressions and refusals arrays are frozen", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 3, tailRisk: 0.5 }) })], rewrites: [] }));
  assert.ok(r.scoreWins.length > 0 && r.guardRegressions.length > 0 && r.refusals.length > 0);
  assert.ok(Object.isFrozen(r.scoreWins));
  assert.ok(Object.isFrozen(r.guardRegressions));
  assert.ok(Object.isFrozen(r.refusals));
  assert.throws(() => (r.scoreWins as string[]).push("x"), TypeError);
  assert.throws(() => (r.refusals as unknown[]).push({}), TypeError);
});

test("jr6j-L10 the retained lineage object itself is frozen, not only its records array", () => {
  const retained = retainInLineage(EMPTY_LINEAGE, compareOnHeldout(base({})));
  assert.equal(retained.kind, "retained");
  if (retained.kind !== "retained") return;
  assert.ok(Object.isFrozen(retained.lineage));
  assert.ok(Object.isFrozen(EMPTY_LINEAGE));
  assert.throws(() => {
    (retained.lineage as { records: unknown }).records = [];
  }, TypeError);
});

test("rejected evaluations are retained in lineage exactly like selected ones", () => {
  const selected = compareOnHeldout(base({}));
  const rejected = compareOnHeldout(base({ candidateId: "cand-2", rewrites: [] }));
  const first = retainInLineage(EMPTY_LINEAGE, selected);
  assert.equal(first.kind, "retained");
  if (first.kind !== "retained") return;
  const second = retainInLineage(first.lineage, rejected);
  assert.equal(second.kind, "retained");
  if (second.kind !== "retained") return;
  assert.equal(second.lineage.records.length, 2);
  assert.deepEqual(second.lineage.records.map((r) => [r.candidateId, r.decision]), [["cand-1", "selected"], ["cand-2", "rejected"]]);
  assert.ok(Object.isFrozen(second.lineage.records));
});

test("lineage is append-only: re-recording a candidate id refuses rather than overwrites", () => {
  const record = compareOnHeldout(base({}));
  const once = retainInLineage(EMPTY_LINEAGE, record);
  assert.equal(once.kind, "retained");
  if (once.kind !== "retained") return;
  const twice = retainInLineage(once.lineage, record);
  assert.equal(twice.kind, "refused");
  if (twice.kind === "refused") assert.equal(twice.code, "SELECTION_LINEAGE_DUPLICATE");
  assert.equal(once.lineage.records.length, 1);
});

// ihuj laws (hvxt seat ruling Q1, Q2, F5): declared guard-axis directions, nonnegative guard metrics, negative-tolerance code.
const ZERO_TOL = { computeBudget: 0, tailRisk: 0, stability: 0 };

test("ihuj-W2 a higher stability is an improvement: stability 5 vs 1 under tolerance 0 is selected with no regression", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 5 }) })], tolerances: ZERO_TOL }));
  assert.equal(r.decision, "selected");
  assert.deepEqual(r.guardRegressions, []);
  assert.deepEqual(r.refusals, []);
});

test("ihuj-W2b a lower stability is the regression: stability 0.5 vs 1 under tolerance 0 rejects and names regime, axis and both values", () => {
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.5 }) })], tolerances: ZERO_TOL }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [["steady", "stability", 0.5, 1]]);
  assert.deepEqual(r.refusals, []);
});

test("ihuj-W12 stability tolerance is a signed relative worsening: 0.6 vs 1 passes under 0.5, 0.4 vs 1 rejects, equal passes under 0", () => {
  const within = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.6 }) })], tolerances: { ...ZERO_TOL, stability: 0.5 } }));
  assert.equal(within.decision, "selected");
  assert.deepEqual(within.guardRegressions, []);
  const beyond = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.4 }) })], tolerances: { ...ZERO_TOL, stability: 0.5 } }));
  assert.equal(beyond.decision, "rejected");
  assert.deepEqual(beyond.guardRegressions.map((g) => g.axis), ["stability"]);
  const equal = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 1 }) })], tolerances: ZERO_TOL }));
  assert.equal(equal.decision, "selected");
});

test("ihuj-W2c computeBudget and tailRisk stay lower-is-better: a decrease is selected, an increase rejects", () => {
  const better = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 5, tailRisk: 0.05 }) })], tolerances: ZERO_TOL }));
  assert.equal(better.decision, "selected");
  assert.deepEqual(better.guardRegressions, []);
  const worse = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 10.5, tailRisk: 0.2 }) })], tolerances: ZERO_TOL }));
  assert.equal(worse.decision, "rejected");
  assert.deepEqual(worse.guardRegressions.map((g) => g.axis), ["computeBudget", "tailRisk"]);
});

test("ihuj-W17 a zero parent on a lower-is-better axis admits no increase at any relative tolerance, and is a rejection not a refusal", () => {
  const huge = { computeBudget: 1000, tailRisk: 1000, stability: 1000 };
  for (const axis of ["computeBudget", "tailRisk"] as const) {
    const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, [axis]: 0.001 }), parent: metrics({ [axis]: 0 }) })], tolerances: huge }));
    assert.equal(r.decision, "rejected", axis);
    assert.deepEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [["steady", axis, 0.001, 0]], axis);
    assert.deepEqual(r.refusals, [], axis);
    const flat = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, [axis]: 0 }), parent: metrics({ [axis]: 0 }) })], tolerances: ZERO_TOL }));
    assert.equal(flat.decision, "selected", axis);
  }
  const zeroStability = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0 }), parent: metrics({ stability: 0 }) })], tolerances: ZERO_TOL }));
  assert.equal(zeroStability.decision, "selected");
});

test("ihuj-W18 a negative finite guard metric on either side refuses with SELECTION_METRIC_NEGATIVE naming regime, axis and value", () => {
  for (const side of ["candidate", "parent"] as const) {
    for (const axis of ["computeBudget", "tailRisk", "stability"]) {
      const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2 }), parent: metrics({}), [side]: metrics({ score: 2, [axis]: -1 }) })] }));
      const label = `${side}.${axis}`;
      assert.equal(r.decision, "rejected", label);
      assert.deepEqual(r.refusals.map((x) => x.code), ["SELECTION_METRIC_NEGATIVE"], label);
      const detail = r.refusals[0]!.detail;
      assert.ok(detail.includes("steady") && detail.includes(`${side}.${axis}`) && detail.includes("-1"), `${label}: ${detail}`);
      assert.deepEqual([...r.scoreWins], [], label);
      assert.deepEqual([...r.guardRegressions], [], label);
    }
  }
});

test("ihuj-W18b a negative score stays legal, a lone negative guard metric does not leak into the nonfinite code, and both refusals coexist", () => {
  const negScore = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: -1 }), parent: metrics({ score: -2 }) })] }));
  assert.equal(negScore.decision, "selected");
  assert.deepEqual(negScore.refusals, []);
  const both = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, tailRisk: Number.NaN, stability: -3 }) })] }));
  assert.deepEqual(both.refusals.map((x) => x.code).sort(), ["SELECTION_METRIC_NEGATIVE", "SELECTION_METRIC_NONFINITE"]);
  const negZero = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: -0 }), parent: metrics({ computeBudget: 0 }) })], tolerances: ZERO_TOL }));
  assert.equal(negZero.decision, "selected");
  assert.deepEqual(negZero.refusals, []);
});

test("ihuj-F5 a finite negative tolerance refuses with SELECTION_TOLERANCE_NEGATIVE naming axis and value; NaN or infinite keeps the nonfinite code", () => {
  for (const axis of ["computeBudget", "tailRisk", "stability"]) {
    const r = compareOnHeldout(base({ tolerances: { ...ZERO_TOL, [axis]: -0.25 } }));
    assert.equal(r.decision, "rejected", axis);
    assert.deepEqual(r.refusals.map((x) => x.code), ["SELECTION_TOLERANCE_NEGATIVE"], axis);
    const detail = r.refusals[0]!.detail;
    assert.ok(detail.includes(axis) && detail.includes("-0.25"), `${axis}: ${detail}`);
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
      const nf = compareOnHeldout(base({ tolerances: { ...ZERO_TOL, [axis]: bad } }));
      assert.deepEqual(nf.refusals.map((x) => x.code), ["SELECTION_METRIC_NONFINITE"], `${axis} ${bad}`);
    }
  }
});

// ivg7a laws (hvxt seat ruling, IEEE-754 boundary follow-on of ihuj): the comparison is IEEE-754 double arithmetic evaluated as written.
test("ivg7a-D1 computeBudget 1.1 vs parent 1 under tolerance 0.1 is REJECTED: 1.1 - 1 = 0.10000000000000009 exceeds 0.1 * 1 under double arithmetic", () => {
  // The decimal-exact boundary rounds up by the hvxt ruling: no epsilon, no exact-rational comparison.
  assert.ok(1.1 - 1 > 0.1 * 1);
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 1.1 }), parent: metrics({ computeBudget: 1 }) })], tolerances: { computeBudget: 0.1, tailRisk: 0, stability: 0 } }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [["steady", "computeBudget", 1.1, 1]]);
  assert.deepEqual(r.refusals, []);
});

test("ivg7a-D2 stability 0.7 vs parent 1 under tolerance 0.3 is REJECTED: 1 - 0.7 = 0.30000000000000004 exceeds 0.3 * 1 under double arithmetic", () => {
  // The decimal-exact boundary rounds up by the hvxt ruling: no epsilon, no exact-rational comparison.
  assert.ok(1 - 0.7 > 0.3 * 1);
  const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, stability: 0.7 }), parent: metrics({ stability: 1 }) })], tolerances: { computeBudget: 0, tailRisk: 0, stability: 0.3 } }));
  assert.equal(r.decision, "rejected");
  assert.deepEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [["steady", "stability", 0.7, 1]]);
  assert.deepEqual(r.refusals, []);
});

const GUARD_AXES = ["computeBudget", "tailRisk", "stability"] as const;

test("6yky-W1 a +Infinity or -Infinity guard metric on either side refuses with exactly the nonfinite code, names side.axis and records no score win", () => {
  for (const side of ["candidate", "parent"] as const) {
    for (const axis of GUARD_AXES) {
      for (const inf of [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
        const label = `${side}.${axis} ${inf}`;
        const r = compareOnHeldout(base({ regimes: [steady({ [side]: metrics({ score: 2, [axis]: inf }) })] }));
        assert.equal(r.decision, "rejected", label);
        assert.deepEqual(r.refusals.map((x) => x.code), [NONFINITE], label);
        assert.ok(r.refusals[0]!.detail.includes(`${side}.${axis}`), `${label}: ${r.refusals[0]!.detail}`);
        assert.deepEqual([...r.scoreWins], [], label);
        assert.deepEqual([...r.guardRegressions], [], label);
      }
    }
  }
});

test("6yky-W2 the empty lineage's records array is frozen and refuses a push, not only the lineage object", () => {
  assert.ok(Object.isFrozen(EMPTY_LINEAGE.records));
  assert.equal(EMPTY_LINEAGE.records.length, 0);
  assert.throws(() => (EMPTY_LINEAGE.records as unknown[]).push({}), TypeError);
  assert.equal(EMPTY_LINEAGE.records.length, 0);
});

test("6yky-W3 a NaN candidate guard metric on any axis refuses with exactly the nonfinite code, names candidate.axis and records no score win", () => {
  for (const axis of GUARD_AXES) {
    const r = compareOnHeldout(base({ regimes: [steady({ candidate: metrics({ score: 2, [axis]: Number.NaN }) })] }));
    assert.equal(r.decision, "rejected", axis);
    assert.deepEqual(r.refusals.map((x) => x.code), [NONFINITE], axis);
    assert.ok(r.refusals[0]!.detail.includes(`candidate.${axis}`), `${axis}: ${r.refusals[0]!.detail}`);
    assert.deepEqual([...r.scoreWins], [], axis);
    assert.deepEqual([...r.guardRegressions], [], axis);
  }
});

test("6yky-W4 a worsening exactly equal to tolerance times parent is admitted on every guard axis (the boundary is exclusive)", () => {
  // 0.5, 10 -> 15 and 0.5 -> 0.75 are exact in binary, so worsening equals tolerance * parent with no rounding slack.
  const cases = [
    { axis: "stability", parent: 1, candidate: 0.5 },
    { axis: "computeBudget", parent: 10, candidate: 15 },
    { axis: "tailRisk", parent: 0.5, candidate: 0.75 },
  ] as const;
  for (const c of cases) {
    const r = compareOnHeldout(base({
      regimes: [steady({ candidate: metrics({ score: 2, [c.axis]: c.candidate }), parent: metrics({ [c.axis]: c.parent }) })],
      tolerances: { ...ZERO_TOL, [c.axis]: 0.5 },
    }));
    assert.equal(r.decision, "selected", c.axis);
    assert.deepEqual([...r.guardRegressions], [], c.axis);
    assert.deepEqual(r.refusals, [], c.axis);
  }
});

test("6yky-W5 a JSON null candidate or parent metric set refuses with exactly the nonfinite code naming side.score, never a TypeError", () => {
  for (const side of ["candidate", "parent"] as const) {
    const input = base({ regimes: [{ ...steady({}), [side]: null } as unknown as SelectionInput["regimes"][number]] });
    let r!: ReturnType<typeof compareOnHeldout>;
    assert.doesNotThrow(() => {
      r = compareOnHeldout(input);
    }, side);
    assert.equal(r.decision, "rejected", side);
    assert.deepEqual(r.refusals.map((x) => x.code), [NONFINITE], side);
    assert.ok(r.refusals[0]!.detail.includes(`${side}.score`), `${side}: ${r.refusals[0]!.detail}`);
    assert.deepEqual([...r.scoreWins], [], side);
  }
});

// r6xo laws (c4zv follow-up): a non-object tolerances value takes the same single missing-tolerances refusal as an absent or null one.
const MISSING_TOLERANCES = { code: NONFINITE, detail: "tolerances must be an object declaring computeBudget, tailRisk and stability; none was provided" };

test("r6xo-P1 a primitive tolerances value (0, 1, empty string, x, true, false) yields exactly the one missing-tolerances refusal as the full list", () => {
  for (const tol of [0, 1, "", "x", true, false]) {
    const r = compareOnHeldout({ ...base({}), tolerances: tol } as unknown as SelectionInput);
    assert.equal(r.decision, "rejected", JSON.stringify(tol));
    assert.deepStrictEqual([...r.refusals], [MISSING_TOLERANCES], JSON.stringify(tol));
  }
});

test("r6xo-P2 the absent and the null tolerances shapes each yield exactly the one missing-tolerances refusal as the full list", () => {
  const absent = compareOnHeldout(without(base({}), "tolerances") as SelectionInput);
  const nulled = compareOnHeldout({ ...base({}), tolerances: null } as unknown as SelectionInput);
  for (const [name, r] of [["absent", absent], ["null", nulled]] as const) {
    assert.equal(r.decision, "rejected", name);
    assert.deepStrictEqual([...r.refusals], [MISSING_TOLERANCES], name);
  }
});

test("r6xo-P3 under the missing-tolerances refusal the guard comparisons are skipped: a regressing regime records no guard regression for a null, an absent and a primitive shape", () => {
  const regressing = [steady({ candidate: metrics({ score: 2, computeBudget: 50, tailRisk: 0.9, stability: 0.1 }) })];
  const shapes: Array<[string, SelectionInput]> = [
    ["null", { ...base({ regimes: regressing }), tolerances: null } as unknown as SelectionInput],
    ["absent", without(base({ regimes: regressing }), "tolerances") as SelectionInput],
    ["primitive", { ...base({ regimes: regressing }), tolerances: 0 } as unknown as SelectionInput],
  ];
  for (const [name, input] of shapes) {
    let r!: ReturnType<typeof compareOnHeldout>;
    assert.doesNotThrow(() => {
      r = compareOnHeldout(input);
    }, name);
    assert.equal(r.decision, "rejected", name);
    assert.deepStrictEqual([...r.guardRegressions], [], name);
    assert.deepStrictEqual([...r.refusals], [MISSING_TOLERANCES], name);
  }
});

// kat9 (r6xo follow-up): the tolerances-object gate and the place of the missing-tolerances refusal, pinned at the landed behaviour.
const NO_REWRITE_REFUSAL = { code: "SELECTION_NO_REWRITE", detail: "a candidate carries exactly one proposed rewrite; this one carries none" };
const PER_AXIS_REFUSALS = ["computeBudget", "tailRisk", "stability"].map((axis) => ({ code: NONFINITE, detail: `tolerance ${axis} must be a finite number` }));

test("kat9-X1 a function, a symbol and a bigint tolerances value each yield exactly the one missing-tolerances refusal and no guard regression, never the per-axis refusals", () => {
  const regressing = [steady({ candidate: metrics({ score: 2, computeBudget: 50, tailRisk: 0.9, stability: 0.1 }) })];
  const shapes: Array<[string, unknown]> = [
    ["function", () => ({ computeBudget: 0, tailRisk: 0, stability: 0 })],
    ["symbol", Symbol("tolerances")],
    ["bigint", 1n],
  ];
  for (const [name, tol] of shapes) {
    let r!: ReturnType<typeof compareOnHeldout>;
    assert.doesNotThrow(() => {
      r = compareOnHeldout({ ...base({ regimes: regressing }), tolerances: tol } as unknown as SelectionInput);
    }, name);
    assert.equal(r.decision, "rejected", name);
    assert.deepStrictEqual([...r.refusals], [MISSING_TOLERANCES], name);
    assert.deepStrictEqual([...r.guardRegressions], [], name);
  }
});

test("kat9-X2 the missing-tolerances refusal keeps its push place after an earlier input refusal: no rewrite plus null tolerances is exactly [no-rewrite, missing-tolerances]", () => {
  const r = compareOnHeldout({ ...base({ rewrites: [] }), tolerances: null } as unknown as SelectionInput);
  assert.equal(r.decision, "rejected");
  assert.deepStrictEqual([...r.refusals], [NO_REWRITE_REFUSAL, MISSING_TOLERANCES]);
});

test("kat9-X3 an empty object and an empty array are tolerances objects: each yields exactly the three per-axis nonfinite refusals in axis order, never the missing-tolerances refusal, with no guard regression", () => {
  const regressing = [steady({ candidate: metrics({ score: 2, computeBudget: 50, tailRisk: 0.9, stability: 0.1 }) })];
  for (const [name, tol] of [["empty object", {}], ["empty array", []]] as const) {
    const r = compareOnHeldout({ ...base({ regimes: regressing }), tolerances: tol } as unknown as SelectionInput);
    assert.equal(r.decision, "rejected", name);
    assert.deepStrictEqual([...r.refusals], PER_AXIS_REFUSALS, name);
    assert.deepStrictEqual([...r.guardRegressions], [], name);
  }
});

// 090r (kat9 follow-up): the refusal-place row on both sides of the missing-tolerances push, and the null-prototype shape as a tolerances object.
test("090r-Y04 the missing-tolerances refusal sits between the parent-mismatch and the regime refusals: null tolerances, a declared parent-2 and a non-heldout regime are exactly [parent-mismatch, missing-tolerances, not-heldout]", () => {
  const r = compareOnHeldout({
    ...base({ regimes: [{ regime: "train", heldout: false, seedsDisjointFromTraining: true, candidate: metrics({ score: 9 }), parent: metrics({}) }] }),
    declaredParentId: "parent-2",
    tolerances: null,
  } as unknown as SelectionInput);
  assert.equal(r.decision, "rejected");
  assert.deepStrictEqual([...r.refusals], [
    { code: "SELECTION_PARENT_MISMATCH", detail: "evaluated against parent-1 but declared parent parent-2" },
    MISSING_TOLERANCES,
    { code: "SELECTION_REGIME_NOT_HELDOUT", detail: "regime train is not heldout with training-disjoint seeds; comparison on it proves nothing" },
  ]);
  assert.deepStrictEqual([...r.guardRegressions], []);
});

test("090r-Y03 a null-prototype tolerances object is a tolerances object: it yields no refusal and the candidate is selected", () => {
  const tolerances = Object.assign(Object.create(null), { computeBudget: 0, tailRisk: 0, stability: 0 });
  assert.equal(Object.getPrototypeOf(tolerances), null);
  const r = compareOnHeldout({ ...base({}), tolerances } as unknown as SelectionInput);
  assert.deepStrictEqual([...r.refusals], []);
  assert.equal(r.decision, "selected");
  assert.deepStrictEqual([...r.scoreWins], ["steady"]);
  assert.deepStrictEqual([...r.guardRegressions], []);
});

test("2o3x-Z1 a callable carrying four finite metrics on either regime side is not a metric set: exactly the one nonfinite refusal naming the side's score, with no score win and no guard regression", () => {
  const callable = (): MetricSet => {
    const fn = (() => undefined) as unknown as Record<string, number>;
    fn.score = 2;
    fn.computeBudget = 10;
    fn.tailRisk = 0.1;
    fn.stability = 1;
    return fn as unknown as MetricSet;
  };
  for (const side of ["candidate", "parent"] as const) {
    const regime = { regime: "steady", heldout: true, seedsDisjointFromTraining: true, candidate: metrics({}), parent: metrics({}), [side]: callable() };
    let r!: ReturnType<typeof compareOnHeldout>;
    assert.doesNotThrow(() => {
      r = compareOnHeldout(base({ regimes: [regime] }));
    }, side);
    assert.equal(r.decision, "rejected", side);
    assert.deepStrictEqual(r.refusals.map((x) => x.code), [NONFINITE], side);
    assert.ok(r.refusals[0]?.detail.includes(`${side}.score`), side);
    assert.deepStrictEqual([...r.scoreWins], [], side);
    assert.deepStrictEqual([...r.guardRegressions], [], side);
  }
});

// h4szn (090r lead follow-up): the refusal-place and null-prototype guard-read laws the 090r rows leave open.
test("h4szn-Y01 the missing-tolerances refusal follows the empty-regimes refusal: null tolerances with no regimes is exactly [regimes-empty, missing-tolerances], with no score win", () => {
  let r!: ReturnType<typeof compareOnHeldout>;
  assert.doesNotThrow(() => {
    r = compareOnHeldout({ ...base({ regimes: [] }), tolerances: null } as unknown as SelectionInput);
  });
  assert.equal(r.decision, "rejected");
  assert.deepStrictEqual([...r.refusals], [
    { code: "SELECTION_REGIMES_EMPTY", detail: "selection compares on heldout regimes; none were provided" },
    MISSING_TOLERANCES,
  ]);
  assert.deepStrictEqual([...r.scoreWins], []);
});

test("h4szn-Y02 a per-axis tolerance refusal sits between the parent-mismatch and the regime refusals: a NaN computeBudget tolerance, a declared parent-2 and a non-heldout regime are exactly [parent-mismatch, tolerance computeBudget, not-heldout]", () => {
  let r!: ReturnType<typeof compareOnHeldout>;
  assert.doesNotThrow(() => {
    r = compareOnHeldout({
      ...base({ regimes: [{ regime: "train", heldout: false, seedsDisjointFromTraining: true, candidate: metrics({ score: 9 }), parent: metrics({}) }] }),
      declaredParentId: "parent-2",
      tolerances: { computeBudget: Number.NaN, tailRisk: 0, stability: 0 },
    } as unknown as SelectionInput);
  });
  assert.equal(r.decision, "rejected");
  assert.deepStrictEqual([...r.refusals], [
    { code: "SELECTION_PARENT_MISMATCH", detail: "evaluated against parent-1 but declared parent parent-2" },
    { code: NONFINITE, detail: "tolerance computeBudget must be a finite number" },
    { code: "SELECTION_REGIME_NOT_HELDOUT", detail: "regime train is not heldout with training-disjoint seeds; comparison on it proves nothing" },
  ]);
  assert.deepStrictEqual([...r.guardRegressions], []);
});

test("h4szn-Y03 a null-prototype tolerances object is read at the guard comparison too: zero tolerances with a regressing regime record all three guard regressions and reject with no refusal", () => {
  const tolerances = Object.assign(Object.create(null), { computeBudget: 0, tailRisk: 0, stability: 0 });
  assert.equal(Object.getPrototypeOf(tolerances), null);
  let r!: ReturnType<typeof compareOnHeldout>;
  assert.doesNotThrow(() => {
    r = compareOnHeldout({ ...base({ regimes: [steady({ candidate: metrics({ score: 2, computeBudget: 50, tailRisk: 0.9, stability: 0.1 }) })] }), tolerances } as unknown as SelectionInput);
  });
  assert.deepStrictEqual([...r.refusals], []);
  assert.equal(r.decision, "rejected");
  assert.deepStrictEqual([...r.scoreWins], ["steady"]);
  assert.deepStrictEqual(r.guardRegressions.map((g) => [g.regime, g.axis, g.candidate, g.parent]), [
    ["steady", "computeBudget", 50, 10],
    ["steady", "tailRisk", 0.9, 0.1],
    ["steady", "stability", 0.1, 1],
  ]);
});
