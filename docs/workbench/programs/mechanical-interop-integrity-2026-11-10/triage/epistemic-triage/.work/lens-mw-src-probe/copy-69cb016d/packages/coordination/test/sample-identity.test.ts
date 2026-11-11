import { strict as assert } from "node:assert";
import { test } from "node:test";
import { validateFanOut } from "../dist/index.js";
import type { SampledDraw } from "../dist/index.js";

function draw(overrides: Partial<SampledDraw> & Pick<SampledDraw, "consumer">): SampledDraw {
  return { decisionId: "d-1", sampleId: "s-1", seed: 41, value: "act:land", ...overrides };
}
const fanned: SampledDraw[] = [draw({ consumer: "worker-a" }), draw({ consumer: "worker-b" }), draw({ consumer: "worker-c" })];

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("one sample survives fan-out: every consumer of a decision sees the same sample identity, seed and value", () => {
  const result = validateFanOut(fanned);
  assert.equal(result.schema, "mw.fan-out-sample.v0");
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.decisions, [{ decisionId: "d-1", samples: [{ sampleId: "s-1", seed: 41, value: "act:land", consumers: ["worker-a", "worker-b", "worker-c"], resampleOf: null }] }]);
});

test("a different value under one sample identity is a reroll and is refused", () => {
  const result = validateFanOut([...fanned, draw({ consumer: "worker-d", value: "act:hold" })]);
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.decisionId, r.sampleId]), [["SAMPLE_REROLLED", "d-1", "s-1"]]);
  assert.match(result.refusals[0]!.detail, /act:hold/);
  assert.match(result.refusals[0]!.detail, /act:land/);
});

test("a second sample identity under one decision without an explicit resample forks the decision and is refused", () => {
  const result = validateFanOut([...fanned, draw({ consumer: "worker-d", sampleId: "s-2", seed: 42, value: "act:hold" })]);
  assert.deepEqual(result.refusals.map(r => [r.code, r.decisionId, r.sampleId]), [["SAMPLE_IDENTITY_FORKED", "d-1", "s-2"]]);
});

test("a resample is explicit: it names the sample it replaces and carries a new identity; reusing the old identity is refused", () => {
  const explicit = validateFanOut([...fanned, draw({ consumer: "worker-d", sampleId: "s-2", seed: 42, value: "act:hold", resampleOf: "s-1" })]);
  assert.equal(explicit.ok, true);
  assert.deepEqual(explicit.decisions[0]!.samples.map(s => [s.sampleId, s.resampleOf]), [["s-1", null], ["s-2", "s-1"]]);
  const reused = validateFanOut([...fanned, draw({ consumer: "worker-d", sampleId: "s-1", seed: 42, value: "act:hold", resampleOf: "s-1" })]);
  assert.deepEqual(reused.refusals.map(r => r.code), ["SAMPLE_REROLLED", "SAMPLE_RESAMPLE_SAME_IDENTITY"], "reusing the identity for a new value is both a reroll and a self-resample");
  const dangling = validateFanOut([...fanned, draw({ consumer: "worker-d", sampleId: "s-3", seed: 43, value: "act:hold", resampleOf: "s-9" })]);
  assert.deepEqual(dangling.refusals.map(r => r.code), ["SAMPLE_RESAMPLE_UNKNOWN_ORIGIN"]);
});

test("correlation negative fixture: samples are cached by decision instance only, so a shared identity or a shared seed across decisions is refused", () => {
  const sharedId = validateFanOut([...fanned, draw({ consumer: "worker-a", decisionId: "d-2" })]);
  assert.deepEqual(sharedId.refusals.map(r => [r.code, r.sampleId]), [["SAMPLE_SHARED_ACROSS_DECISIONS", "s-1"]]);
  const sharedSeed = validateFanOut([...fanned, draw({ consumer: "worker-a", decisionId: "d-2", sampleId: "s-7" })]);
  assert.deepEqual(sharedSeed.refusals.map(r => [r.code, r.decisionId]), [["SAMPLE_SEED_SHARED_ACROSS_DECISIONS", "d-2"]]);
  const independent = validateFanOut([...fanned, draw({ consumer: "worker-a", decisionId: "d-2", sampleId: "s-7", seed: 99, value: "act:hold" })]);
  assert.equal(independent.ok, true);
  assert.deepEqual(independent.decisions.map(d => d.decisionId), ["d-1", "d-2"]);
});

test("a malformed draw is refused outright: empty identities, a non-integer seed or no consumer", () => {
  assert.throws(() => validateFanOut([draw({ consumer: "" })]), /SAMPLE_DRAW_MALFORMED/);
  assert.throws(() => validateFanOut([draw({ consumer: "w", sampleId: "" })]), /SAMPLE_DRAW_MALFORMED/);
  assert.throws(() => validateFanOut([draw({ consumer: "w", seed: 0.5 })]), /SAMPLE_DRAW_MALFORMED/);
  assert.throws(() => validateFanOut([]), /SAMPLE_DRAWS_EMPTY/);
});

test("an empty decision id and an empty resample origin are each refused outright and the message names the empty field", () => {
  assert.throws(() => validateFanOut([draw({ consumer: "w", decisionId: "" })]), /SAMPLE_DRAW_MALFORMED: empty decision id/);
  assert.throws(() => validateFanOut([...fanned, draw({ consumer: "w", sampleId: "s-2", seed: 42, resampleOf: "" })]), /SAMPLE_DRAW_MALFORMED: empty resample origin/);
  assert.throws(() => validateFanOut([draw({ consumer: "w", sampleId: "" })]), /SAMPLE_DRAW_MALFORMED: empty sample id/);
  assert.throws(() => validateFanOut([draw({ consumer: "" })]), /SAMPLE_DRAW_MALFORMED: no consumer/);
});

test("canonical order on seed-clean multi-sample fixtures: values, sample identities and refusals sort regardless of draw order", () => {
  // Every sample identity carries one seed and no seed repeats across decisions, so the seed-drift verdict stays out of scope.
  const values = validateFanOut([
    draw({ consumer: "w-a", value: "act:land" }),
    draw({ consumer: "w-b", value: "act:hold" }),
    draw({ consumer: "w-c", value: "act:drop" }),
  ]);
  assert.deepEqual(values.refusals.map(r => r.code), ["SAMPLE_REROLLED"]);
  assert.match(values.refusals[0]!.detail, /carries 3 values \(act:drop, act:hold, act:land\)/, "refusal detail lists the values sorted, not in draw order");
  assert.equal(values.decisions[0]!.samples[0]!.value, "act:drop", "the recorded value is the lowest of the sorted values");

  const ids = validateFanOut([
    draw({ consumer: "w-b", sampleId: "s-3", seed: 43, resampleOf: "s-2" }),
    draw({ consumer: "w-b", sampleId: "s-2", seed: 42, resampleOf: "s-1" }),
    draw({ consumer: "w-a", sampleId: "s-1", seed: 41 }),
  ]);
  assert.equal(ids.ok, true);
  assert.deepEqual(ids.decisions[0]!.samples.map(s => [s.sampleId, s.resampleOf]), [["s-1", null], ["s-2", "s-1"], ["s-3", "s-2"]], "samples sort by identity, not draw order");

  const mixed = [
    draw({ consumer: "w-a", decisionId: "d-2", sampleId: "s-5", seed: 51, resampleOf: "s-4" }),
    draw({ consumer: "w-a", decisionId: "d-1", sampleId: "s-2", seed: 42 }),
    draw({ consumer: "w-a", decisionId: "d-1", sampleId: "s-1", seed: 41, value: "act:land" }),
    draw({ consumer: "w-b", decisionId: "d-1", sampleId: "s-1", seed: 41, value: "act:hold" }),
  ];
  // Draw-time order would read REROLLED (d-1 s-1) before FORKED (d-1 s-2); the canonical order sorts by code first.
  const expected = [
    ["SAMPLE_IDENTITY_FORKED", "d-1", "s-2"],
    ["SAMPLE_REROLLED", "d-1", "s-1"],
    ["SAMPLE_RESAMPLE_UNKNOWN_ORIGIN", "d-2", "s-5"],
  ];
  assert.deepEqual(validateFanOut(mixed).refusals.map(r => [r.code, r.decisionId, r.sampleId]), expected, "refusals sort by code, then decision, then sample");
  assert.deepEqual(validateFanOut([...mixed].reverse()).refusals.map(r => [r.code, r.decisionId, r.sampleId]), expected);
});

test("the validation is deterministic, pure and mints no identifier", () => {
  const draws = [...fanned, draw({ consumer: "worker-a", decisionId: "d-2", sampleId: "s-7", seed: 99 })];
  const before = JSON.stringify(draws);
  const forward = validateFanOut(draws);
  const backward = validateFanOut([...draws].reverse());
  assert.equal(JSON.stringify(draws), before);
  assert.equal(JSON.stringify(forward), JSON.stringify(backward));
  const known = new Set([...stringLeaves(draws), forward.schema]);
  for (const leaf of stringLeaves(forward.decisions)) assert.ok(known.has(leaf), `minted ${leaf}`);
});
