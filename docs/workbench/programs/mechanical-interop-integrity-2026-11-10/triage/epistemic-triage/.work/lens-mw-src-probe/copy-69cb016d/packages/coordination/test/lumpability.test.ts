import test from "node:test";
import assert from "node:assert/strict";
import {
  refinePartition,
  checkLumpability,
  certifyAbstraction,
  type FiniteKernel,
  type Partition,
} from "../dist/index.js";

/**
 * Two-lane toy kernel: s1 and s2 behave identically (mass 0.5 to each of {busy, free} on "tick"
 * with label "ok"), s3 differs (mass 1 to busy). The mandatory observation partition lumps all
 * three; refinement must split s3 out and keep s1,s2 together.
 */
const kernel: FiniteKernel = {
  states: ["s1", "s2", "s3", "busy", "free"],
  transitions: [
    { from: "s1", input: "tick", label: "ok", to: "busy", mass: 0.5 },
    { from: "s1", input: "tick", label: "ok", to: "free", mass: 0.5 },
    { from: "s2", input: "tick", label: "ok", to: "busy", mass: 0.5 },
    { from: "s2", input: "tick", label: "ok", to: "free", mass: 0.5 },
    { from: "s3", input: "tick", label: "ok", to: "busy", mass: 1 },
  ],
};
const observation: Partition = [["s1", "s2", "s3"], ["busy"], ["free"]];

test("refinement splits differing states until stable and keeps equivalent states lumped", () => {
  const r = refinePartition(kernel, observation);
  assert.equal(r.ok, true);
  const blocks = r.stable.map((b) => [...b].sort().join(",")).sort();
  assert.deepEqual(blocks, ["busy", "free", "s1,s2", "s3"]);
  assert.ok(r.iterations >= 2);
});

test("the stable refinement passes the strong controlled lumpability check; the raw observation partition fails it", () => {
  const stable = refinePartition(kernel, observation).stable;
  assert.equal(checkLumpability(kernel, stable).ok, true);
  const raw = checkLumpability(kernel, observation);
  assert.equal(raw.ok, false);
  assert.ok(raw.refusals.some((x) => x.code === "LUMP_BLOCK_UNEQUAL_MASS"));
});

test("two equal-mass states split when their masses go to different successor blocks", () => {
  const k2: FiniteKernel = {
    states: ["a", "b", "x", "y"],
    transitions: [
      { from: "a", input: "u", label: "ok", to: "x", mass: 1 },
      { from: "b", input: "u", label: "ok", to: "y", mass: 1 },
    ],
  };
  const r = refinePartition(k2, [["a", "b"], ["x"], ["y"]]);
  assert.equal(r.ok, true);
  const blocks = r.stable.map((blk) => [...blk].sort().join(",")).sort();
  assert.deepEqual(blocks, ["a", "b", "x", "y"]);
});


test("states with equal structure but unequal masses split, and their lump fails the exact check", () => {
  const k3: FiniteKernel = {
    states: ["t1", "t2", "x", "y"],
    transitions: [
      { from: "t1", input: "u", label: "ok", to: "x", mass: 0.5 },
      { from: "t1", input: "u", label: "ok", to: "y", mass: 0.5 },
      { from: "t2", input: "u", label: "ok", to: "x", mass: 0.3 },
      { from: "t2", input: "u", label: "ok", to: "y", mass: 0.7 },
    ],
  };
  const r = refinePartition(k3, [["t1", "t2"], ["x"], ["y"]]);
  assert.equal(r.ok, true);
  const blocks = r.stable.map((blk) => [...blk].sort().join(",")).sort();
  assert.deepEqual(blocks, ["t1", "t2", "x", "y"]);
  const lumped = checkLumpability(k3, [["t1", "t2"], ["x"], ["y"]]);
  assert.equal(lumped.ok, false);
  assert.ok(lumped.refusals.some((xr) => xr.code === "LUMP_BLOCK_UNEQUAL_MASS"));
});

test("an uncovered state, an unknown state and an invalid mass refuse by name", () => {
  const uncovered = refinePartition(kernel, [["s1", "s2"], ["busy"], ["free"]]);
  assert.equal(uncovered.ok, false);
  assert.ok(uncovered.refusals.some((x) => x.code === "LUMP_PARTITION_NOT_COVERING" && x.subject === "s3"));
  const unknown = refinePartition(kernel, [...observation, ["ghost"]]);
  assert.ok(unknown.refusals.some((x) => x.code === "LUMP_STATE_UNKNOWN" && x.subject === "ghost"));
  const badMass = refinePartition({ states: ["a"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass: Number.NaN }] }, [["a"]]);
  assert.ok(badMass.refusals.some((x) => x.code === "LUMP_MASS_INVALID"));
});

test("a learned projection may propose but cannot certify itself", () => {
  const stable = refinePartition(kernel, observation).stable;
  const candidate = { partition: stable, proposedBy: "learned-projection" as const, modelRevision: "mp@9d51a8c", interventionClass: "observational" };
  const self = certifyAbstraction(kernel, candidate, "learned-self-assessment");
  assert.equal(self.kind, "refused");
  if (self.kind === "refused") assert.equal(self.code, "LUMP_LEARNED_SELF_CERTIFIED");
  const exact = certifyAbstraction(kernel, candidate, "exact-refinement-check");
  assert.equal(exact.kind, "certified");
  if (exact.kind === "certified") {
    assert.equal(exact.basis, "exact-refinement-check");
    assert.equal(exact.modelRevision, "mp@9d51a8c");
    assert.equal(exact.interventionClass, "observational");
  }
});

test("a distinguishing trace rejects the candidate; a non-lumpable partition is refused by the exact check", () => {
  const stable = refinePartition(kernel, observation).stable;
  const traced = certifyAbstraction(kernel, { partition: stable, proposedBy: "exact-refinement", modelRevision: "r", interventionClass: "observational", distinguishingTrace: "tick/ok distinguishes s3 from s1" }, "exact-refinement-check");
  assert.equal(traced.kind, "refused");
  if (traced.kind === "refused") assert.equal(traced.code, "LUMP_TRACE_REFUTES");
  const lumpy = certifyAbstraction(kernel, { partition: observation, proposedBy: "exact-refinement", modelRevision: "r", interventionClass: "observational" }, "exact-refinement-check");
  assert.equal(lumpy.kind, "refused");
  if (lumpy.kind === "refused") assert.equal(lumpy.code, "LUMP_BLOCK_UNEQUAL_MASS");
});

test("a blank model revision or intervention class refuses the certificate", () => {
  const stable = refinePartition(kernel, observation).stable;
  const r = certifyAbstraction(kernel, { partition: stable, proposedBy: "exact-refinement", modelRevision: " ", interventionClass: "observational" }, "exact-refinement-check");
  assert.equal(r.kind, "refused");
  if (r.kind === "refused") assert.equal(r.code, "LUMP_CERT_MEMBER_MISSING");
});

const probeCandidate = (partition: Partition) => ({ partition, proposedBy: "exact-refinement" as const, modelRevision: "r", interventionClass: "observational" });
const twoStates: FiniteKernel = {
  states: ["a", "b"],
  transitions: [
    { from: "a", input: "u", label: "ok", to: "a", mass: 1 },
    { from: "b", input: "u", label: "ok", to: "b", mass: 1 },
  ],
};

test("a state listed in two blocks refuses with LUMP_PARTITION_OVERLAP naming the state and both block indexes", () => {
  const cert = certifyAbstraction(twoStates, probeCandidate([["a", "b"], ["b"]]), "exact-refinement-check");
  assert.equal(cert.kind, "refused");
  if (cert.kind === "refused") assert.equal(cert.code, "LUMP_PARTITION_OVERLAP");
  const r = checkLumpability(twoStates, [["a", "b"], ["b"]]);
  const overlap = r.refusals.find((x) => x.code === "LUMP_PARTITION_OVERLAP");
  assert.ok(overlap);
  assert.equal(overlap.subject, "b");
  assert.match(overlap.detail, /0/);
  assert.match(overlap.detail, /1/);
  assert.equal(refinePartition(twoStates, [["a", "b"], ["b"]]).ok, false);
});

test("an empty block refuses with LUMP_BLOCK_EMPTY and an empty block cannot overstate the quotient size", () => {
  const cert = certifyAbstraction(twoStates, probeCandidate([["a", "b"], []]), "exact-refinement-check");
  assert.equal(cert.kind, "refused");
  if (cert.kind === "refused") assert.equal(cert.code, "LUMP_BLOCK_EMPTY");
  const r = refinePartition(twoStates, [["a"], ["b"], []]);
  assert.equal(r.ok, false);
  assert.ok(r.refusals.some((x) => x.code === "LUMP_BLOCK_EMPTY" && x.subject === "block.2"));
});

test("a (from, input) pair whose transitions do not total mass 1 refuses with LUMP_MASS_NOT_NORMALIZED naming the pair and its total", () => {
  const heavy: FiniteKernel = { states: ["a"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass: 2 }] };
  const cert = certifyAbstraction(heavy, probeCandidate([["a"]]), "exact-refinement-check");
  assert.equal(cert.kind, "refused");
  if (cert.kind === "refused") assert.equal(cert.code, "LUMP_MASS_NOT_NORMALIZED");
  const r = checkLumpability(heavy, [["a"]]);
  const bad = r.refusals.find((x) => x.code === "LUMP_MASS_NOT_NORMALIZED");
  assert.ok(bad);
  assert.equal(bad.subject, "a|u");
  assert.match(bad.detail, /2/);
  const light: FiniteKernel = { states: ["a"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass: 0.4 }] };
  assert.ok(refinePartition(light, [["a"]]).refusals.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"));
});

test("a split pair 0.5 + 0.5 passes, a state-input pair with no transitions stays unconstrained, and an invalid mass is not double-reported as unnormalized", () => {
  const split: FiniteKernel = {
    states: ["a", "x", "y"],
    transitions: [
      { from: "a", input: "u", label: "ok", to: "x", mass: 0.5 },
      { from: "a", input: "u", label: "ok", to: "y", mass: 0.5 },
      { from: "a", input: "v", label: "ok", to: "x", mass: 1 },
    ],
  };
  assert.equal(checkLumpability(split, [["a"], ["x"], ["y"]]).ok, true);
  const noTransitions: FiniteKernel = { states: ["a", "b"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass: 1 }] };
  assert.equal(checkLumpability(noTransitions, [["a"], ["b"]]).ok, true);
  const nan: FiniteKernel = { states: ["a"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass: Number.NaN }] };
  const refusals = refinePartition(nan, [["a"]]).refusals;
  assert.ok(refusals.some((x) => x.code === "LUMP_MASS_INVALID"));
  assert.equal(refusals.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"), false);
});

const oneState = (mass: number): FiniteKernel => ({ states: ["a"], transitions: [{ from: "a", input: "u", label: "ok", to: "a", mass }] });

test("the 1e-9 normalization band refuses a total of 0.9 and names the band, and a rounding-scale 1 + 1e-12 total still passes", () => {
  const below = checkLumpability(oneState(0.9), [["a"]]);
  assert.equal(below.ok, false);
  const low = below.refusals.find((x) => x.code === "LUMP_MASS_NOT_NORMALIZED");
  assert.ok(low);
  assert.equal(low.subject, "a|u");
  assert.match(low.detail, /within 1e-9/);
  const drift = checkLumpability(oneState(1 + 1e-12), [["a"]]);
  assert.equal(drift.ok, true);
  assert.equal(drift.refusals.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"), false);
});

test("a zero or negative mass invalidates its pair like NaN does and is not double-reported as unnormalized", () => {
  const zero = refinePartition(oneState(0), [["a"]]).refusals;
  assert.ok(zero.some((x) => x.code === "LUMP_MASS_INVALID"));
  assert.equal(zero.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"), false);
  const mixed: FiniteKernel = {
    states: ["a", "b"],
    transitions: [
      { from: "a", input: "u", label: "ok", to: "a", mass: 1.5 },
      { from: "a", input: "u", label: "ok", to: "b", mass: -0.5 },
    ],
  };
  const refusals = refinePartition(mixed, [["a"], ["b"]]).refusals;
  assert.ok(refusals.some((x) => x.code === "LUMP_MASS_INVALID" && x.subject === "a->b"));
  assert.equal(refusals.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"), false);
});

test("a lone negative mass refuses LUMP_MASS_INVALID only and names the offending mass, even when the pair total misses 1", () => {
  const lone = refinePartition(oneState(-0.5), [["a"]]).refusals;
  const invalid = lone.filter((x) => x.code === "LUMP_MASS_INVALID");
  assert.equal(invalid.length, 1);
  const only = invalid[0];
  assert.ok(only);
  assert.equal(only.subject, "a->a");
  assert.match(only.detail, /-0\.5 is not a positive finite number/);
  assert.equal(lone.some((x) => x.code === "LUMP_MASS_NOT_NORMALIZED"), false);
  const nan = refinePartition(oneState(Number.NaN), [["a"]]).refusals.find((x) => x.code === "LUMP_MASS_INVALID");
  assert.ok(nan);
  assert.match(nan.detail, /NaN is not a positive finite number/);
});
