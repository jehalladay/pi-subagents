import test from "node:test";
import assert from "node:assert/strict";
import {
  advanceCreditRung,
  classifyCreditEvidence,
  CREDIT_RUNGS,
  type RungWitness,
} from "../dist/index.js";

const passing = (rung: string): RungWitness => ({ rung, method: "exact-table-parity", ok: true });

test("the hierarchy is the six exact-to-causal rungs in order", () => {
  assert.deepEqual([...CREDIT_RUNGS], [
    "exact-enumeration",
    "one-step-reinforce",
    "multi-step-actor-return",
    "heldout-critic",
    "factorized-interaction-critic",
    "controlled-artifact-intervention",
  ]);
});

test("an advance to the immediate next rung with a passing witness for the rung being left succeeds", () => {
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [passing("exact-enumeration")]);
  assert.equal(r.kind, "advanced");
  if (r.kind === "advanced") { assert.equal(r.from, "exact-enumeration"); assert.equal(r.to, "one-step-reinforce"); }
});

test("skipping a rung is refused and names the rung skipped over", () => {
  const r = advanceCreditRung("one-step-reinforce", "heldout-critic", [passing("one-step-reinforce")]);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") {
    assert.equal(r.code, "CREDIT_RUNG_SKIPPED");
    assert.ok(r.detail.includes("multi-step-actor-return"));
  }
});

test("same-rung and downward moves are not advances; unknown rungs refuse", () => {
  const same = advanceCreditRung("heldout-critic", "heldout-critic", [passing("heldout-critic")]);
  assert.equal(same.kind, "refused");
  if (same.kind === "refused") assert.equal(same.code, "CREDIT_NOT_AN_ADVANCE");
  const down = advanceCreditRung("heldout-critic", "one-step-reinforce", [passing("heldout-critic")]);
  assert.equal(down.kind, "refused");
  if (down.kind === "refused") assert.equal(down.code, "CREDIT_NOT_AN_ADVANCE");
  const unknown = advanceCreditRung("exact-enumeration", "ppo", [passing("exact-enumeration")]);
  assert.equal(unknown.kind, "refused");
  if (unknown.kind === "refused") assert.equal(unknown.code, "CREDIT_RUNG_UNKNOWN");
});

test("a missing or failing witness for the rung being left refuses the advance", () => {
  const missing = advanceCreditRung("exact-enumeration", "one-step-reinforce", [passing("one-step-reinforce")]);
  assert.equal(missing.kind, "refused");
  if (missing.kind === "refused") assert.equal(missing.code, "CREDIT_WITNESS_MISSING");
  const failed = advanceCreditRung("exact-enumeration", "one-step-reinforce", [{ rung: "exact-enumeration", method: "exact-table-parity", ok: false }]);
  assert.equal(failed.kind, "refused");
  if (failed.kind === "refused") assert.equal(failed.code, "CREDIT_WITNESS_FAILED");
});

test("an rnn-bptt witness refuses: unsupported in the M0/M1 policy actor contract", () => {
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [passing("exact-enumeration"), { rung: "exact-enumeration", method: "rnn-bptt", ok: true }]);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "CREDIT_BPTT_UNSUPPORTED");
});

test("intervention and counterfactual evidence classify as causal", () => {
  const i = classifyCreditEvidence({ kind: "intervention" });
  assert.equal(i.kind, "causal");
  if (i.kind === "causal") assert.equal(i.basis, "intervention");
  const c = classifyCreditEvidence({ kind: "counterfactual" });
  assert.equal(c.kind, "causal");
});

test("lineage is dependency evidence, never causal proof", () => {
  const r = classifyCreditEvidence({ kind: "lineage" });
  assert.equal(r.kind, "dependency-evidence");
  if (r.kind === "dependency-evidence") assert.equal(r.code, "CREDIT_LINEAGE_NOT_CAUSAL");
});

test("replay claiming unseen counterfactual effects refuses; observed replay stays dependency evidence", () => {
  const unseen = classifyCreditEvidence({ kind: "replay", claimsUnseenCounterfactual: true });
  assert.equal(unseen.kind, "refused");
  if (unseen.kind === "refused") assert.equal(unseen.code, "CREDIT_REPLAY_NO_COUNTERFACTUAL");
  const seen = classifyCreditEvidence({ kind: "replay" });
  assert.equal(seen.kind, "dependency-evidence");
  const junk = classifyCreditEvidence({ kind: "vibes" });
  assert.equal(junk.kind, "refused");
  if (junk.kind === "refused") assert.equal(junk.code, "CREDIT_EVIDENCE_UNKNOWN");
});

test("an unknown SOURCE rung refuses CREDIT_RUNG_UNKNOWN and the detail names it", () => {
  const r = advanceCreditRung("ppo", "exact-enumeration", [passing("ppo")]);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") {
    assert.equal(r.code, "CREDIT_RUNG_UNKNOWN");
    assert.ok(r.detail.includes("ppo"));
  }
});

test("an rnn-bptt witness on a rung other than the one being left still refuses CREDIT_BPTT_UNSUPPORTED", () => {
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [
    passing("exact-enumeration"),
    { rung: "heldout-critic", method: "rnn-bptt", ok: true },
  ]);
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "CREDIT_BPTT_UNSUPPORTED");
});

test("the advanced record carries the witness for the rung being left, not another listed witness", () => {
  const left = passing("exact-enumeration");
  const other = passing("one-step-reinforce");
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [left, other]);
  assert.equal(r.kind, "advanced");
  if (r.kind === "advanced") {
    assert.equal(r.witness.rung, "exact-enumeration");
    assert.deepEqual(r.witness, left);
  }
});

test("counterfactual evidence classifies as causal with basis counterfactual", () => {
  const c = classifyCreditEvidence({ kind: "counterfactual" });
  assert.equal(c.kind, "causal");
  if (c.kind === "causal") assert.equal(c.basis, "counterfactual");
});

test("an observed replay stays dependency evidence with CREDIT_LINEAGE_NOT_CAUSAL and a detail naming replay", () => {
  const seen = classifyCreditEvidence({ kind: "replay" });
  assert.equal(seen.kind, "dependency-evidence");
  if (seen.kind === "dependency-evidence") {
    assert.equal(seen.code, "CREDIT_LINEAGE_NOT_CAUSAL");
    assert.ok(seen.detail.includes("replay"));
  }
});

test("CREDIT_RUNGS is frozen: it reports frozen and a push through a cast throws in strict mode", () => {
  assert.equal(Object.isFrozen(CREDIT_RUNGS), true);
  assert.throws(() => (CREDIT_RUNGS as string[]).push("ppo"), TypeError);
  assert.equal(CREDIT_RUNGS.length, 6);
});

const failing = (rung: string): RungWitness => ({ rung, method: "exact-table-parity", ok: false });

test("any failing witness for the rung being left refuses CREDIT_WITNESS_FAILED in either list order, with a counted detail (p43y pezm Q1, W3 W3b)", () => {
  const from = "exact-enumeration";
  const to = "one-step-reinforce";
  const passingFirst = advanceCreditRung(from, to, [passing(from), failing(from)]);
  const failingFirst = advanceCreditRung(from, to, [failing(from), passing(from)]);
  for (const r of [passingFirst, failingFirst]) {
    assert.equal(r.kind, "refused");
    if (r.kind === "refused") {
      assert.equal(r.code, "CREDIT_WITNESS_FAILED");
      assert.equal(r.detail, "1 of 2 witnesses for exact-enumeration failed; a failing rung is not left upward");
    }
  }
  const allFail = advanceCreditRung(from, to, [failing(from), failing(from), failing(from)]);
  assert.equal(allFail.kind, "refused");
  if (allFail.kind === "refused") assert.equal(allFail.detail, "3 of 3 witnesses for exact-enumeration failed; a failing rung is not left upward");
  const lone = advanceCreditRung(from, to, [failing(from)]);
  assert.equal(lone.kind, "refused");
  if (lone.kind === "refused") assert.equal(lone.detail, "1 of 1 witnesses for exact-enumeration failed; a failing rung is not left upward");
});

test("only witnesses for the rung being left count: a failing witness for another rung never blocks the advance (p43y pezm Q1)", () => {
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [failing("heldout-critic"), passing("exact-enumeration")]);
  assert.equal(r.kind, "advanced");
  const split = advanceCreditRung("exact-enumeration", "one-step-reinforce", [passing("exact-enumeration"), failing("one-step-reinforce"), failing("exact-enumeration")]);
  assert.equal(split.kind, "refused");
  if (split.kind === "refused") assert.equal(split.detail, "1 of 2 witnesses for exact-enumeration failed; a failing rung is not left upward");
});

test("two passing witnesses for the same rung advance and the record names the first listed passing one (p43y pezm Q1 point 2)", () => {
  const first: RungWitness = { rung: "exact-enumeration", method: "exact-table-parity", ok: true };
  const second: RungWitness = { rung: "exact-enumeration", method: "second-method", ok: true };
  const r = advanceCreditRung("exact-enumeration", "one-step-reinforce", [first, second]);
  assert.equal(r.kind, "advanced");
  if (r.kind === "advanced") {
    assert.equal(r.witness, first);
    assert.equal(r.witness.method, "exact-table-parity");
  }
  const reversed = advanceCreditRung("exact-enumeration", "one-step-reinforce", [second, first]);
  assert.equal(reversed.kind, "advanced");
  if (reversed.kind === "advanced") assert.equal(reversed.witness, second);
});

test("a witness for another rung listed first never becomes the advanced record: the first witness for the rung being left does, in either list order (7ere, yn4y V4B)", () => {
  const left: RungWitness = { rung: "exact-enumeration", method: "exact-table-parity", ok: true };
  const other: RungWitness = { rung: "one-step-reinforce", method: "other-rung-method", ok: true };
  const otherFirst = advanceCreditRung("exact-enumeration", "one-step-reinforce", [other, left]);
  assert.equal(otherFirst.kind, "advanced");
  if (otherFirst.kind === "advanced") {
    assert.equal(otherFirst.witness, left);
    assert.equal(otherFirst.witness.rung, "exact-enumeration");
  }
  const leftFirst = advanceCreditRung("exact-enumeration", "one-step-reinforce", [left, other]);
  assert.equal(leftFirst.kind, "advanced");
  if (leftFirst.kind === "advanced") assert.equal(leftFirst.witness, left);
  const second: RungWitness = { rung: "exact-enumeration", method: "second-method", ok: true };
  const mixed = advanceCreditRung("exact-enumeration", "one-step-reinforce", [other, second, left]);
  assert.equal(mixed.kind, "advanced");
  if (mixed.kind === "advanced") assert.equal(mixed.witness, second);
});

test("the advanced record names a passing witness for the rung being left whatever else is listed: a third-rung witness first, a higher-rung advance with two from-rung witnesses, and a failing other-rung witness first (64pf, 7ere G01 G02 G03)", () => {
  const left = passing("exact-enumeration");
  const third = passing("heldout-critic");
  const g01 = advanceCreditRung("exact-enumeration", "one-step-reinforce", [third, left]);
  assert.equal(g01.kind, "advanced");
  if (g01.kind === "advanced") {
    assert.equal(g01.witness, left);
    assert.equal(g01.witness.rung, "exact-enumeration");
  }
  const a = passing("one-step-reinforce");
  const b: RungWitness = { rung: "one-step-reinforce", method: "second-method", ok: true };
  const g02 = advanceCreditRung("one-step-reinforce", "multi-step-actor-return", [a, b]);
  assert.equal(g02.kind, "advanced");
  if (g02.kind === "advanced") {
    assert.equal(g02.witness, a);
    assert.equal(g02.witness.method, "exact-table-parity");
  }
  const g03 = advanceCreditRung("exact-enumeration", "one-step-reinforce", [failing("heldout-critic"), left]);
  assert.equal(g03.kind, "advanced");
  if (g03.kind === "advanced") {
    assert.equal(g03.witness, left);
    assert.equal(g03.witness.rung, "exact-enumeration");
    assert.equal(g03.witness.ok, true);
  }
});
