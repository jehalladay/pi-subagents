// MechanicalWorkflows-j4fa (GPC-EAT-R007): the sampler's pre-sampling legal support S is a field
// distinct from the resolver's admitted mask A, and the behavior log probability is the sampler's
// ORIGINAL log p_S(chosen) or the literal "unknown"; a probability renormalized over A is refused
// with SIDECAR_LOGPROB_NOT_ORIGINAL. The deterministic two-way Selector path still exports "unknown".
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { sampleSupportedDecision, validateSampledDecision, sampledDecisionToSidecar, validateCoordinationDecision, toEpisode, exportEpisodeForTraining } from "../dist/index.js";
import type { SampledDecision, CoordinationDecision, EnvironmentEpisode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");

const S = ["restack", "pause", "land", "drop"];
const weights = { restack: 3, pause: 2, land: 1, drop: 0.5 };
const A = ["restack", "land"];

test("a seeded stochastic selector records support S distinct from admitted A and the original log p_S(chosen)", () => {
  for (const seed of [1, 7, 42, 99]) {
    const record = sampleSupportedDecision({ seed, support: S, weights, admitted: A });
    assert.deepEqual(record.support, S, "support is the pre-sampling legal set, not the admitted mask");
    assert.deepEqual(record.admitted, A);
    assert.notDeepEqual(record.support, record.admitted);
    assert.ok(S.includes(record.chosen));
    const total = Object.values(weights).reduce((acc, w) => acc + w, 0);
    const expected = Math.log(weights[record.chosen as keyof typeof weights] / total);
    assert.ok(typeof record.behaviorLogProb === "number");
    assert.ok(Math.abs(record.behaviorLogProb - expected) < 1e-9, `seed ${seed}`);
    assert.deepEqual(validateSampledDecision(record), { ok: true });
  }
});

test("the same seed draws the same choice; different seeds reach more than one choice", () => {
  const a = sampleSupportedDecision({ seed: 5, support: S, weights, admitted: A });
  assert.deepEqual(sampleSupportedDecision({ seed: 5, support: S, weights, admitted: A }), a);
  const chosen = new Set<string>();
  for (let seed = 0; seed < 200; seed += 1) chosen.add(sampleSupportedDecision({ seed, support: S, weights, admitted: A }).chosen);
  assert.ok(chosen.size > 1);
});

test("a log probability renormalized over the admitted set is refused with SIDECAR_LOGPROB_NOT_ORIGINAL", () => {
  const record = sampleSupportedDecision({ seed: 7, support: S, weights, admitted: S.concat() });
  const admitted = ["restack", "land"];
  const chosen = "restack";
  const pAdmitted = weights.restack / (weights.restack + weights.land);
  const forged: SampledDecision = { ...record, admitted, chosen, behaviorLogProb: Math.log(pAdmitted) };
  const verdict = validateSampledDecision(forged);
  assert.equal(verdict.ok, false);
  if (!verdict.ok) assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
  const zero = validateSampledDecision({ ...record, behaviorLogProb: 0 });
  assert.equal(zero.ok === false && zero.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", "a fabricated 0 is not the original probability");
});

test("the logProb tolerance is 1e-9: a small dropped mass, a 1e-6 drift and a 2e-9 drift are refused, a 5e-10 and a 1e-12 float wobble are accepted", () => {
  // c3nr: a small-mask row sits only ln(0.95) = -0.0513 from a fabricated 0, so any tolerance above 0.0513 admits it.
  const small: SampledDecision = { support: ["a", "b"], admitted: ["a"], chosen: "a", probabilities: { a: 0.95, b: 0.05 }, behaviorLogProb: 0 };
  const smallVerdict = validateSampledDecision(small);
  assert.equal(smallVerdict.ok === false && smallVerdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
  const original = Math.log(0.95);
  const drift = validateSampledDecision({ ...small, behaviorLogProb: original + 1e-6 });
  assert.equal(drift.ok === false && drift.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", "a drift of 1e-6 is outside the 1e-9 tolerance");
  assert.deepEqual(validateSampledDecision({ ...small, behaviorLogProb: original }), { ok: true });
  assert.deepEqual(validateSampledDecision({ ...small, behaviorLogProb: original + 1e-12 }), { ok: true }, "float wobble inside the tolerance is accepted");
  // ar6b: the 1e-6 and 1e-12 rows above leave every tolerance in [1e-12, 1e-6) green; a factor-of-two window around 1e-9 closes it.
  const twice = validateSampledDecision({ ...small, behaviorLogProb: original + 2e-9 });
  assert.equal(twice.ok === false && twice.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", "a drift of 2e-9 is outside the 1e-9 tolerance");
  assert.deepEqual(validateSampledDecision({ ...small, behaviorLogProb: original + 5e-10 }), { ok: true }, "a wobble of 5e-10 is inside the 1e-9 tolerance");
  // 2rk0: the window has a lower side too; a logProb below the original by more than the tolerance is refused, so a one-sided comparison that drops the absolute value dies here.
  const below = validateSampledDecision({ ...small, behaviorLogProb: original - 2e-9 });
  assert.equal(below.ok, false, "a value 2e-9 below the original is outside the 1e-9 tolerance");
  if (!below.ok) {
    assert.equal(below.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
    assert.ok(below.detail.includes(String(original)), "the refusal detail names the original log p_S");
  }
  assert.deepEqual(validateSampledDecision({ ...small, behaviorLogProb: original - 5e-10 }), { ok: true }, "a wobble of 5e-10 below the original is inside the tolerance");
});

// MechanicalWorkflows-o8kb (2rk0 follow-up, test-only): the 2rk0 row pins the refusal detail to the sampler's original log p_S for the
// below side only. Each above-original refusal names the same original, so a per-side split with a distinct above-side message dies here.
test("o8kb every above-original SIDECAR_LOGPROB_NOT_ORIGINAL refusal names the sampler's original log p_S in its detail", () => {
  const small: SampledDecision = { support: ["a", "b"], admitted: ["a"], chosen: "a", probabilities: { a: 0.95, b: 0.05 }, behaviorLogProb: 0 };
  const original = Math.log(0.95);
  const rows: [string, number][] = [["a fabricated 0 (small mask)", 0], ["a drift of +1e-6", original + 1e-6], ["a drift of +2e-9", original + 2e-9]];
  for (const [label, behaviorLogProb] of rows) {
    const verdict = validateSampledDecision({ ...small, behaviorLogProb });
    assert.equal(verdict.ok, false, label);
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", label);
    assert.ok(verdict.detail.includes(String(original)), `${label}: the refusal detail names the original log p_S ${original}`);
  }
});

// MechanicalWorkflows-5dbd (o8kb follow-up, test-only): the o8kb row names the original for the small-mask points (drift 0.0513 at most);
// the two far-above refusals of the renormalized-over-admitted row (drift 0.4855) and the fabricated 0 on that record (drift 1.1787)
// assert the code alone. A per-distance split that drops the original from the detail once the drift passes 0.06 dies here.
test("5dbd the far-above SIDECAR_LOGPROB_NOT_ORIGINAL refusals (renormalized over admitted, fabricated 0) name the sampler's original log p_S in their detail", () => {
  const record = sampleSupportedDecision({ seed: 7, support: S, weights, admitted: S.concat() });
  const probabilities = record.probabilities as Record<string, number>;
  assert.equal(typeof probabilities, "object", "the seeded weighted record carries its probabilities");
  const chosen = "restack";
  const original = Math.log(probabilities[chosen]!);
  const renormalized = Math.log(weights.restack / (weights.restack + weights.land));
  const rows: [string, SampledDecision, number][] = [
    ["renormalized over the admitted set", { ...record, admitted: ["restack", "land"], chosen, behaviorLogProb: renormalized }, renormalized],
    ["a fabricated 0 on the seed-7 record", { ...record, behaviorLogProb: 0 }, 0],
  ];
  for (const [label, forged, claimed] of rows) {
    const recordOriginal = Math.log(probabilities[forged.chosen]!);
    assert.ok(Math.abs(claimed - recordOriginal) > 0.06, `${label}: drift ${Math.abs(claimed - recordOriginal)} sits far above the small-mask points`);
    const verdict = validateSampledDecision(forged);
    assert.equal(verdict.ok, false, label);
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", label);
    assert.ok(verdict.detail.includes(String(recordOriginal)), `${label}: the refusal detail names the original log p_S ${recordOriginal}`);
  }
  // the builder surfaces the same detail through its thrown message
  const forgedRenormalized: SampledDecision = { ...record, admitted: ["restack", "land"], chosen, behaviorLogProb: renormalized };
  const base = { decisionId: "d:7", intentId: "i:7", vocabulary: S.concat(["forbidden"]), observationDigest: "sha256:" + "a".repeat(64), policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) }, rngStreamId: "xorshift32:7" };
  assert.throws(() => sampledDecisionToSidecar(base, forgedRenormalized), (error: unknown) => error instanceof Error && error.message.includes(String(original)), "the builder's thrown message names the original log p_S");
});

// MechanicalWorkflows-ye0c (5dbd follow-up, test-only): the o8kb row names the sampler's original log p_S for the above-original points and the
// 2rk0 point sits 2e-9 below it; no row asserts the detail for a claim far BELOW the original. A detail that drops the original only once the
// claim sits more than 0.06 under it passes every landed row. A wrong-id log p is the realistic below-side forgery.
test("ye0c the far-below SIDECAR_LOGPROB_NOT_ORIGINAL refusals (seed-7 record at original - 1.5, small mask at original - 0.75) name the sampler's original log p_S in their detail", () => {
  const record = sampleSupportedDecision({ seed: 7, support: S, weights, admitted: S.concat() });
  const probabilities = record.probabilities as Record<string, number>;
  assert.equal(typeof probabilities, "object", "the seeded weighted record carries its probabilities");
  const seedOriginal = Math.log(probabilities[record.chosen]!);
  const small: SampledDecision = { support: ["a", "b"], admitted: ["a"], chosen: "a", probabilities: { a: 0.95, b: 0.05 }, behaviorLogProb: 0 };
  const smallOriginal = Math.log(0.95);
  const rows: [string, SampledDecision, number][] = [
    ["the seed-7 record at original - 1.5", { ...record, behaviorLogProb: seedOriginal - 1.5 }, seedOriginal],
    ["the small mask at original - 0.75", { ...small, behaviorLogProb: smallOriginal - 0.75 }, smallOriginal],
  ];
  for (const [label, forged, original] of rows) {
    assert.ok(typeof forged.behaviorLogProb === "number" && original - forged.behaviorLogProb > 0.06, `${label}: the claim sits far below the original`);
    const verdict = validateSampledDecision(forged);
    assert.equal(verdict.ok, false, label);
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", label);
    assert.ok(verdict.detail.includes(String(original)), `${label}: the refusal detail names the original log p_S ${original}`);
  }
});

// The builder joins the validator verdict with a colon and a space (T17 pins the same join for the coordination-check throw); the 5dbd row asserts
// the builder's SIDECAR_LOGPROB_NOT_ORIGINAL throw by includes alone, so a different separator passes it.
test("ye0c the sidecar builder's thrown message for a refused log probability equals exactly the verdict code, a colon, a space and the verdict detail", () => {
  const record = sampleSupportedDecision({ seed: 7, support: S, weights, admitted: S.concat() });
  const forged: SampledDecision = { ...record, admitted: ["restack", "land"], chosen: "restack", behaviorLogProb: Math.log(weights.restack / (weights.restack + weights.land)) };
  const verdict = validateSampledDecision(forged);
  assert.equal(verdict.ok, false);
  if (verdict.ok) return;
  assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
  const base = { decisionId: "d:7", intentId: "i:7", vocabulary: S.concat(["forbidden"]), observationDigest: "sha256:" + "a".repeat(64), policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) }, rngStreamId: "xorshift32:7" };
  assert.throws(() => sampledDecisionToSidecar(base, forged), (error: unknown) => error instanceof Error && error.message === `${verdict.code}: ${verdict.detail}`, "the builder's thrown message is code, colon, space, detail");
});

test("a record with no recorded probabilities carries the literal unknown, never 0 or null", () => {
  const record = sampleSupportedDecision({ seed: 3, support: S, admitted: A });
  assert.equal(record.behaviorLogProb, "unknown");
  assert.equal(record.probabilities, "unknown");
  assert.deepEqual(validateSampledDecision(record), { ok: true });
  for (const bad of [0, null as unknown as number]) {
    const verdict = validateSampledDecision({ ...record, behaviorLogProb: bad });
    assert.equal(verdict.ok, false, String(bad));
    if (!verdict.ok) assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
  }
  const numeric = validateSampledDecision({ ...record, behaviorLogProb: -1.2 });
  assert.equal(numeric.ok, false);
  if (!numeric.ok) assert.match(numeric.detail, /no probabilities/, "a number with nothing to verify it against is named as such");
});

test("a malformed record is refused with SIDECAR_SAMPLED_MALFORMED", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const bad: Array<[Partial<SampledDecision>, RegExp]> = [
    [{ support: [] }, /support/],
    [{ admitted: ["restack", "ghost"] }, /admitted/],
    [{ chosen: "ghost" }, /chosen/],
    [{ support: ["restack", "restack", "pause"] }, /duplicate/],
    [{ support: ["restack", " ", "pause"], admitted: ["restack"], chosen: "restack" }, /blank/],
    [{ admitted: ["restack", "restack"] }, /duplicate admitted/],
    [{ probabilities: { restack: -0.5, pause: 1, land: 0.25, drop: 0.25 } }, /probability for/],
    [{ probabilities: { restack: Number.NaN, pause: 0.5, land: 0.25, drop: 0.25 } }, /probability for/],
    [{ probabilities: { restack: 0.4, pause: 0.3, land: 0.1, drop: 0.05 } }, /sum/],
  ];
  for (const [over, pattern] of bad) {
    const verdict = validateSampledDecision({ ...ok, ...over });
    assert.equal(verdict.ok, false, JSON.stringify(over));
    if (!verdict.ok) { assert.equal(verdict.code, "SIDECAR_SAMPLED_MALFORMED"); assert.match(verdict.detail, pattern); }
  }
  assert.throws(() => sampleSupportedDecision({ seed: -1, support: S, admitted: A }), /SIDECAR_SAMPLED_MALFORMED/);
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: S, weights: { ...weights, drop: -1 }, admitted: A }), /SIDECAR_SAMPLED_MALFORMED/);
  // c3nr: each sampler refusal has its own row, so no one clause can lapse unseen.
  assert.throws(() => sampleSupportedDecision({ seed: 1.5, support: S, admitted: A }), /SIDECAR_SAMPLED_MALFORMED/, "a fractional seed would alias seed 1");
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: S, admitted: ["ghost"] }), /SIDECAR_SAMPLED_MALFORMED/, "admitted outside the support");
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", " "], admitted: ["a"] }), /SIDECAR_SAMPLED_MALFORMED/, "blank support id");
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], weights: { a: Infinity, b: 1 }, admitted: ["a"] }), /SIDECAR_SAMPLED_MALFORMED/, "an infinite weight is not finite");
});

test("the coordination sidecar built from a sample carries support S and the original logProb", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const base = { decisionId: "d:11", intentId: "i:11", vocabulary: S.concat(["forbidden"]), observationDigest: "sha256:" + "a".repeat(64), policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) }, rngStreamId: "xorshift32:11" };
  const sidecar: CoordinationDecision = sampledDecisionToSidecar(base, record);
  assert.deepEqual(sidecar.support, S);
  assert.equal(sidecar.sampled.id, record.chosen);
  assert.equal(sidecar.sampled.logProb, record.behaviorLogProb);
  assert.deepEqual(validateCoordinationDecision(sidecar), { ok: true });
  // c3nr: the builder refuses a renormalized record with the logProb code instead of emitting a valid-looking sidecar.
  const sampled = sampleSupportedDecision({ seed: 7, support: S, weights, admitted: S.concat() });
  const forged: SampledDecision = { ...sampled, admitted: A, chosen: "restack", behaviorLogProb: Math.log(weights.restack / (weights.restack + weights.land)) };
  assert.throws(() => sampledDecisionToSidecar(base, forged), /SIDECAR_LOGPROB_NOT_ORIGINAL/);
});

test("the deterministic two-way Selector path still exports logProb unknown (no fabricated probability)", () => {
  const source = JSON.parse(readFileSync(join(fixtureDir, "landing-queue-seed7.json"), "utf8")) as EnvironmentEpisode;
  const exported = exportEpisodeForTraining(toEpisode(source));
  assert.ok(exported.steps.length > 0);
  for (const step of exported.steps) assert.equal(step.logProb, "unknown");
});

test("finite weights whose plain sum overflows still yield a valid sample with the exact original log p_S, never a non-finite record", () => {
  for (const big of [1e308, Number.MAX_VALUE]) {
    const record = sampleSupportedDecision({ seed: 7, support: ["a", "b"], admitted: ["a"], weights: { a: big, b: big } });
    assert.deepEqual(record.probabilities, { a: 0.5, b: 0.5 });
    assert.ok(typeof record.behaviorLogProb === "number" && Number.isFinite(record.behaviorLogProb), `weight ${big}`);
    assert.ok(Math.abs(record.behaviorLogProb - Math.log(0.5)) < 1e-12);
    assert.deepEqual(validateSampledDecision(record), { ok: true });
  }
  const skewed = sampleSupportedDecision({ seed: 3, support: ["a", "b"], admitted: ["a", "b"], weights: { a: 3e307, b: 1e307 } });
  const skew = skewed.probabilities as Record<string, number>;
  assert.ok(Math.abs(skew.a! - 0.75) < 1e-12 && Math.abs(skew.b! - 0.25) < 1e-12);
  assert.deepEqual(validateSampledDecision(skewed), { ok: true });
});

test("all-zero weights are refused with SIDECAR_SAMPLED_MALFORMED", () => {
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], admitted: ["a"], weights: { a: 0, b: 0 } }), /SIDECAR_SAMPLED_MALFORMED/);
});

// MechanicalWorkflows-jsdv (j4fa follow-up, beyond c3nr): seven laws the landed tests left unpinned.
test("each structural refusal carries its own exact detail, so no one clause can lapse behind another that matches the same pattern", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const malformed = (detail: string) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail });
  // jsdv ES: with an empty support AND an empty admitted list the next refusal would read "chosen ... is outside the support".
  assert.deepEqual(validateSampledDecision({ ...ok, support: [], admitted: [], chosen: "restack" }), malformed("empty support"));
  // jsdv AL: a string is not a list; without the guard the string's characters read as admitted ids.
  assert.deepEqual(validateSampledDecision({ ...ok, admitted: "restack" as unknown as string[] }), malformed("admitted is not a list"));
  // jsdv PN: a null (or non-object) probabilities field is a typed refusal, never a TypeError out of the validator.
  for (const bad of [null, "restack", 7]) {
    let verdict: ReturnType<typeof validateSampledDecision> | undefined;
    assert.doesNotThrow(() => { verdict = validateSampledDecision({ ...ok, probabilities: bad as unknown as SampledDecision["probabilities"] }); }, String(bad));
    assert.deepEqual(verdict, malformed("probabilities is neither a map nor the literal unknown"), String(bad));
  }
});

test("a NaN or infinite behaviorLogProb beside a probabilities map is refused as not finite, not as a mere mismatch", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  assert.ok(ok.probabilities !== "unknown");
  for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    const verdict = validateSampledDecision({ ...ok, behaviorLogProb: bad });
    assert.equal(verdict.ok, false, String(bad));
    if (!verdict.ok) {
      assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL");
      assert.match(verdict.detail, /neither a finite number/, String(bad));
    }
  }
});

test("an unweighted draw is uniform over the support: 200 consecutive seeds reach every id evenly, and a golden vector pins the seed-to-choice map", () => {
  const counts: Record<string, number> = {};
  for (let seed = 0; seed < 200; seed += 1) {
    const record = sampleSupportedDecision({ seed, support: S, admitted: A });
    assert.equal(record.probabilities, "unknown");
    counts[record.chosen] = (counts[record.chosen] ?? 0) + 1;
  }
  for (const id of S) assert.ok((counts[id] ?? 0) >= 30 && (counts[id] ?? 0) <= 70, `${id} drawn ${counts[id] ?? 0} of 200 times`);
  const seeds = [0, 1, 2, 3, 4, 5, 6, 7];
  // Golden vectors: xorshift32 over the splitmix32-finalised seed (gateStreamStart) after 16 warm-up draws. A 15-draw warm-up or a different draw order moves them.
  assert.deepEqual(seeds.map(seed => sampleSupportedDecision({ seed, support: S, admitted: A }).chosen),
    ["restack", "land", "drop", "restack", "restack", "pause", "restack", "pause"]);
  assert.deepEqual(seeds.map(seed => sampleSupportedDecision({ seed, support: S, weights, admitted: A }).chosen),
    ["restack", "pause", "land", "restack", "restack", "restack", "restack", "restack"]);
});

test("a weighted draw follows the weights: heavier ids are chosen more often across 200 seeds", () => {
  const counts: Record<string, number> = {};
  for (let seed = 0; seed < 200; seed += 1) {
    const chosen = sampleSupportedDecision({ seed, support: S, weights, admitted: A }).chosen;
    counts[chosen] = (counts[chosen] ?? 0) + 1;
  }
  assert.ok(counts.restack! > counts.pause! && counts.pause! > counts.land! && counts.land! > counts.drop! && counts.drop! > 0, JSON.stringify(counts));
});

test("the sidecar builder runs the coordination-decision check on its own output: a malformed base digest or vocabulary is refused", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const base = { decisionId: "d:11", intentId: "i:11", vocabulary: S.concat(["forbidden"]), observationDigest: "sha256:" + "a".repeat(64), policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) }, rngStreamId: "xorshift32:11" };
  assert.throws(() => sampledDecisionToSidecar({ ...base, observationDigest: "not-a-digest" }, record), /DECISION_SIDECAR_MALFORMED: observation digest is not a sha256 digest/);
  assert.throws(() => sampledDecisionToSidecar({ ...base, vocabulary: ["restack"] }, record), /DECISION_SIDECAR_MALFORMED: support entry pause is outside the vocabulary/);
});

// MechanicalWorkflows-48tk (ye0c follow-up, test-only): the ye0c builder-message row pins the code-colon-space-detail join for the renormalized-forgery
// refusal only. The builder has two more validator-verdict throws (SIDECAR_SAMPLED_MALFORMED, and the non-finite and no-probabilities SIDECAR_LOGPROB_NOT_ORIGINAL
// refusals) and one coordination-check throw, each pinned so far by an unanchored regex. These rows anchor each throw's whole message.
const builderBase = { decisionId: "d:48", intentId: "i:48", vocabulary: S.concat(["forbidden"]), observationDigest: "sha256:" + "a".repeat(64), policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) }, rngStreamId: "xorshift32:48" };

test("48tk the sidecar builder's thrown message for every malformed sampled record equals exactly the verdict code, a colon, a space and the verdict detail", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const overs: Array<Partial<SampledDecision>> = [
    { support: [] },
    { admitted: ["restack", "ghost"] },
    { chosen: "ghost" },
    { support: ["restack", "restack", "pause"] },
    { support: ["restack", " ", "pause"], admitted: ["restack"], chosen: "restack" },
    { admitted: ["restack", "restack"] },
    { probabilities: { restack: -0.5, pause: 1, land: 0.25, drop: 0.25 } },
    { probabilities: { restack: Number.NaN, pause: 0.5, land: 0.25, drop: 0.25 } },
    { probabilities: { restack: 0.4, pause: 0.3, land: 0.1, drop: 0.05 } },
  ];
  assert.equal(overs.length, 9);
  for (const over of overs) {
    const forged: SampledDecision = { ...ok, ...over };
    const verdict = validateSampledDecision(forged);
    assert.equal(verdict.ok, false, JSON.stringify(over));
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_SAMPLED_MALFORMED", JSON.stringify(over));
    assert.throws(() => sampledDecisionToSidecar(builderBase, forged), (error: unknown) => error instanceof Error && error.message === `${verdict.code}: ${verdict.detail}`, JSON.stringify(over));
  }
});

test("48tk the sidecar builder's thrown message for a non-finite and a no-probabilities log probability equals exactly the verdict code, a colon, a space and the verdict detail", () => {
  const weighted = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const unweighted = sampleSupportedDecision({ seed: 3, support: S, admitted: A });
  assert.equal(unweighted.probabilities, "unknown");
  const rows: SampledDecision[] = [
    { ...weighted, behaviorLogProb: Number.NaN },
    { ...weighted, behaviorLogProb: Number.POSITIVE_INFINITY },
    { ...weighted, behaviorLogProb: Number.NEGATIVE_INFINITY },
    { ...unweighted, behaviorLogProb: -1.2 },
  ];
  assert.equal(rows.length, 4);
  for (const forged of rows) {
    const verdict = validateSampledDecision(forged);
    assert.equal(verdict.ok, false, String(forged.behaviorLogProb));
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_LOGPROB_NOT_ORIGINAL", String(forged.behaviorLogProb));
    assert.ok(!verdict.detail.includes("differs from"), `${forged.behaviorLogProb}: the refusal is the non-finite or no-probabilities clause, not the mismatch clause`);
    assert.throws(() => sampledDecisionToSidecar(builderBase, forged), (error: unknown) => error instanceof Error && error.message === `${verdict.code}: ${verdict.detail}`, String(forged.behaviorLogProb));
  }
});

test("48tk the sidecar builder's coordination-check throw equals exactly the check code, a colon, a space and the check detail, with no prefix", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  const overs = [{ observationDigest: "not-a-digest" }, { vocabulary: ["restack"] }];
  assert.equal(overs.length, 2);
  for (const over of overs) {
    const check = validateCoordinationDecision({ ...built, ...over } as CoordinationDecision);
    assert.equal(check.ok, false, JSON.stringify(over));
    if (check.ok) continue;
    assert.throws(() => sampledDecisionToSidecar({ ...builderBase, ...over }, record), (error: unknown) => error instanceof Error && error.message === `${check.code}: ${check.detail}`, JSON.stringify(over));
  }
});

// MechanicalWorkflows-h68r (48tk follow-up, test-only): T20 and T21 send 10 of the 12 non-mismatch validator details through the builder and T22 sends 2 of the
// 8 coordination-check details the builder can reach from its base. These rows send the remaining validator details (admitted not a list; probabilities neither
// a map nor the literal unknown) and the remaining six check details (policy digest, blank decision or intent id, empty or blank-entry vocabulary, duplicate
// vocabulary entries, blank rng stream id, blank readSet entry) through the same two throw sites, each anchored to the whole message.

test("h68r X1 the sidecar builder's thrown message for an admitted field that is not a list and a probabilities field that is neither a map nor unknown is exactly the code, a colon, a space and the validator detail", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const overs = [{ admitted: "restack" }, { probabilities: null }, { probabilities: "restack" }, { probabilities: 7 }] as unknown as Array<Partial<SampledDecision>>;
  assert.equal(overs.length, 4);
  for (const over of overs) {
    const forged = { ...ok, ...over } as SampledDecision;
    const verdict = validateSampledDecision(forged);
    assert.equal(verdict.ok, false, JSON.stringify(over));
    if (verdict.ok) continue;
    assert.equal(verdict.code, "SIDECAR_SAMPLED_MALFORMED", JSON.stringify(over));
    assert.throws(() => sampledDecisionToSidecar(builderBase, forged), (error: unknown) => error instanceof Error && error.message === `${verdict.code}: ${verdict.detail}`, JSON.stringify(over));
  }
});

test("h68r X2 the sidecar builder's coordination-check throw for a malformed policy digest and a blank decision or intent id is exactly the check code, a colon, a space and the check detail", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  const overs: Array<Record<string, unknown>> = [
    { policy: { programDigest: "not-a-digest", checkpointDigest: "sha256:" + "c".repeat(64) } },
    { policy: { programDigest: "sha256:" + "b".repeat(64), checkpointDigest: "sha256:" + "C".repeat(64) } },
    { decisionId: " " },
    { intentId: "" },
  ];
  assert.equal(overs.length, 4);
  for (const over of overs) {
    const check = validateCoordinationDecision({ ...built, ...over } as CoordinationDecision);
    assert.equal(check.ok, false, JSON.stringify(over));
    if (check.ok) continue;
    assert.throws(() => sampledDecisionToSidecar({ ...builderBase, ...over } as typeof builderBase, record), (error: unknown) => error instanceof Error && error.message === `${check.code}: ${check.detail}`, JSON.stringify(over));
  }
});

test("h68r X3 the sidecar builder's coordination-check throw for an empty or duplicated vocabulary, a blank rng stream id and a blank readSet entry is exactly the check code, a colon, a space and the check detail", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  const pairs: Array<[Record<string, unknown>, Record<string, unknown>]> = [
    [{ vocabulary: [] }, { vocabulary: [] }],
    [{ vocabulary: S.concat(["restack"]) }, { vocabulary: S.concat(["restack"]) }],
    [{ rngStreamId: " " }, { rng: { streamId: " " } }],
    [{ readSet: ["scope:x", " "] }, { readSet: ["scope:x", " "] }],
  ];
  assert.equal(pairs.length, 4);
  for (const [baseOver, sidecarOver] of pairs) {
    const check = validateCoordinationDecision({ ...built, ...sidecarOver } as CoordinationDecision);
    assert.equal(check.ok, false, JSON.stringify(sidecarOver));
    if (check.ok) continue;
    assert.throws(() => sampledDecisionToSidecar({ ...builderBase, ...baseOver } as typeof builderBase, record), (error: unknown) => error instanceof Error && error.message === `${check.code}: ${check.detail}`, JSON.stringify(baseOver));
  }
});

// MechanicalWorkflows-l70p (h68r follow-up, test-only): T23..T25 send 13 validator details and 8 check details through the builder, yet the builder body copies
// or repairs base and record fields that reach a detail no row sends. These rows pin the nullish admitted and undefined probabilities validator details, six
// check details at inputs the landed rows never send (blank vocabulary entry, upper-case program and observation digests, empty ids, empty rng stream id and
// readSet entry) with the literal detail, and the verbatim copy of padded ids and base fields into the sidecar.

test("l70p Y1 the sidecar builder's thrown message for a null or undefined admitted field and an undefined probabilities field is exactly the code, a colon, a space and the literal validator detail", () => {
  const ok = sampleSupportedDecision({ seed: 1, support: S, weights, admitted: A });
  const rows: Array<[Partial<Record<keyof SampledDecision, unknown>>, string]> = [
    [{ admitted: null }, "admitted is not a list"],
    [{ admitted: undefined }, "admitted is not a list"],
    [{ probabilities: undefined }, "probabilities is neither a map nor the literal unknown"],
  ];
  assert.equal(rows.length, 3);
  for (const [over, detail] of rows) {
    const forged = { ...ok, ...over } as unknown as SampledDecision;
    const verdict = validateSampledDecision(forged);
    assert.deepEqual(verdict, { ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail }, JSON.stringify(over));
    assert.throws(() => sampledDecisionToSidecar(builderBase, forged), (error: unknown) => error instanceof Error && error.message === `SIDECAR_SAMPLED_MALFORMED: ${detail}`, JSON.stringify(over));
  }
});

test("l70p Y2 the sidecar builder's coordination-check throw for a blank vocabulary entry, upper-case program and observation digests, an empty decision id, an empty rng stream id and an empty readSet entry carries the literal check detail", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  const rows: Array<[Record<string, unknown>, Record<string, unknown>, string]> = [
    [{ vocabulary: S.concat([" "]) }, { vocabulary: S.concat([" "]) }, "empty or blank-entry vocabulary"],
    [{ policy: { programDigest: "sha256:" + "B".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) } }, { policy: { programDigest: "sha256:" + "B".repeat(64), checkpointDigest: "sha256:" + "c".repeat(64) } }, "policy program/checkpoint digest is not a sha256 digest"],
    [{ observationDigest: "sha256:" + "A".repeat(64) }, { observationDigest: "sha256:" + "A".repeat(64) }, "observation digest is not a sha256 digest"],
    [{ decisionId: "" }, { decisionId: "" }, "blank decision or intent id"],
    [{ rngStreamId: "" }, { rng: { streamId: "" } }, "blank rng stream id"],
    [{ readSet: ["scope:x", ""] }, { readSet: ["scope:x", ""] }, "blank readSet entry"],
  ];
  assert.equal(rows.length, 6);
  for (const [baseOver, sidecarOver, detail] of rows) {
    const check = validateCoordinationDecision({ ...built, ...sidecarOver } as CoordinationDecision);
    assert.deepEqual(check, { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail }, JSON.stringify(baseOver));
    assert.throws(() => sampledDecisionToSidecar({ ...builderBase, ...baseOver } as typeof builderBase, record), (error: unknown) => error instanceof Error && error.message === `DECISION_SIDECAR_MALFORMED: ${detail}`, JSON.stringify(baseOver));
  }
});

test("l70p Y3 the sidecar builder copies padded decision and intent ids and every base field into the sidecar verbatim", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar({ ...builderBase, decisionId: " d:48 ", intentId: " i:48 " }, record);
  assert.deepEqual(validateCoordinationDecision(built), { ok: true });
  assert.equal(built.decisionId, " d:48 ");
  assert.equal(built.intentId, " i:48 ");
  assert.deepEqual(built.vocabulary, builderBase.vocabulary);
  assert.deepEqual(built.policy, builderBase.policy);
  assert.equal(built.observationDigest, builderBase.observationDigest);
  assert.equal(built.rng.streamId, builderBase.rngStreamId);
  assert.deepEqual(built.readSet, []);
});

// MechanicalWorkflows-hlsq (l70p follow-up, test-only): the l70p Y3 row pins the padded decision and intent ids and unpadded base fields. The builder also
// copies a padded rng stream id, vocabulary entry and readSet entry, refuses (never trims) a padded observation digest, and hands back fresh vocabulary and
// support arrays. Each row below fails alone against its own named trim or alias form.

test("hlsq X01 the sidecar builder copies a padded rng stream id into the sidecar verbatim", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar({ ...builderBase, rngStreamId: " xorshift32:48 " }, record);
  assert.deepEqual(validateCoordinationDecision(built), { ok: true });
  assert.equal(built.rng.streamId, " xorshift32:48 ");
});

test("hlsq X02 the sidecar builder refuses a padded observation digest with the digest detail instead of trimming it into a valid one", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const padded = " sha256:" + "a".repeat(64) + " ";
  assert.deepEqual(validateCoordinationDecision({ ...sampledDecisionToSidecar(builderBase, record), observationDigest: padded }), { ok: false, code: "DECISION_SIDECAR_MALFORMED", detail: "observation digest is not a sha256 digest" });
  assert.throws(() => sampledDecisionToSidecar({ ...builderBase, observationDigest: padded }, record), (error: unknown) => error instanceof Error && error.message === "DECISION_SIDECAR_MALFORMED: observation digest is not a sha256 digest");
});

test("hlsq X03 the sidecar builder copies a padded vocabulary entry into the sidecar verbatim", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const vocabulary = S.concat([" forbidden "]);
  const built: CoordinationDecision = sampledDecisionToSidecar({ ...builderBase, vocabulary }, record);
  assert.deepEqual(validateCoordinationDecision(built), { ok: true });
  assert.deepEqual(built.vocabulary, vocabulary);
  assert.equal(built.vocabulary[S.length], " forbidden ");
});

test("hlsq X04 the sidecar builder copies a padded readSet entry into the sidecar verbatim", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar({ ...builderBase, readSet: [" scope:x "] }, record);
  assert.deepEqual(validateCoordinationDecision(built), { ok: true });
  assert.deepEqual(built.readSet, [" scope:x "]);
});

test("hlsq X05 the sidecar builder hands back a vocabulary array that equals the base array and is not the base array", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  assert.deepEqual(built.vocabulary, builderBase.vocabulary);
  assert.notStrictEqual(built.vocabulary, builderBase.vocabulary);
});

test("hlsq X06 the sidecar builder hands back a support array that equals the record support and is not the record array", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  assert.deepEqual(built.support, record.support);
  assert.notStrictEqual(built.support, record.support);
});

// MechanicalWorkflows-hp5l (hlsq follow-up, test-only): the landed rows never read the seven literal fields the sidecar builder writes (mode, graphId, actorId,
// nodeId, prestate, nativeOutcomeRef, feedback), never compare the sampler's support and admitted copies by reference, and match every sampler refusal by code
// alone. Each row below fails alone against its own named dist mutant (Y01..Y13 of the run109-06 c5 lead).

test("hp5l Y01 the sidecar builder stamps mode fixture, never live or replay", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  const built: CoordinationDecision = sampledDecisionToSidecar(builderBase, record);
  assert.strictEqual(built.mode, "fixture");
});

test("hp5l Y02 the sidecar builder writes the literal unknown as graphId", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.strictEqual(sampledDecisionToSidecar(builderBase, record).graphId, "unknown");
});

test("hp5l Y03 the sidecar builder writes the literal unknown as actorId", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.strictEqual(sampledDecisionToSidecar(builderBase, record).actorId, "unknown");
});

test("hp5l Y04 the sidecar builder writes the literal unknown as nodeId", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.strictEqual(sampledDecisionToSidecar(builderBase, record).nodeId, "unknown");
});

test("hp5l Y05 the sidecar builder writes a prestate whose memoryRevision is the literal unknown", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.deepEqual(sampledDecisionToSidecar(builderBase, record).prestate, { memoryRevision: "unknown" });
});

test("hp5l Y06 the sidecar builder writes the literal unknown as nativeOutcomeRef", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.strictEqual(sampledDecisionToSidecar(builderBase, record).nativeOutcomeRef, "unknown");
});

test("hp5l Y07 the sidecar builder writes feedback whose status and reward are both the literal unknown", () => {
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted: A });
  assert.deepEqual(sampledDecisionToSidecar(builderBase, record).feedback, { status: "unknown", reward: "unknown" });
});

test("hp5l Y08 the sampler hands back a support array that equals the input support and is not the caller's array", () => {
  const support = S.concat();
  const record = sampleSupportedDecision({ seed: 11, support, weights, admitted: A });
  assert.deepEqual(record.support, support);
  assert.notStrictEqual(record.support, support);
});

test("hp5l Y09 the sampler hands back an admitted array that equals the input admitted list and is not the caller's array", () => {
  const admitted = A.concat();
  const record = sampleSupportedDecision({ seed: 11, support: S, weights, admitted });
  assert.deepEqual(record.admitted, admitted);
  assert.notStrictEqual(record.admitted, admitted);
});

const messageIs = (expected: string) => (error: unknown): boolean => error instanceof Error && error.message === expected;

test("hp5l Y10 the sampler refuses a negative and a fractional seed with the whole seed message", () => {
  const whole = "SIDECAR_SAMPLED_MALFORMED: seed must be a non-negative integer";
  assert.throws(() => sampleSupportedDecision({ seed: -1, support: S, admitted: A }), messageIs(whole));
  assert.throws(() => sampleSupportedDecision({ seed: 1.5, support: S, admitted: A }), messageIs(whole));
});

test("hp5l Y11 the sampler refuses an admitted entry outside the support and a blank support entry with the whole structural message", () => {
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: S, admitted: ["ghost"] }), messageIs("SIDECAR_SAMPLED_MALFORMED: admitted entry ghost is outside the support"));
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", " "], admitted: ["a"] }), messageIs("SIDECAR_SAMPLED_MALFORMED: blank support entry"));
});

test("hp5l Y12 the sampler refuses a negative, an infinite and a missing weight with the whole weight message", () => {
  const whole = "SIDECAR_SAMPLED_MALFORMED: every support id needs a finite non-negative weight";
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], weights: { a: -1, b: 1 }, admitted: ["a"] }), messageIs(whole));
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], weights: { a: Infinity, b: 1 }, admitted: ["a"] }), messageIs(whole));
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], weights: { a: 1 }, admitted: ["a"] }), messageIs(whole));
});

test("hp5l Y13 the sampler refuses all-zero weights with the whole zero-sum message", () => {
  assert.throws(() => sampleSupportedDecision({ seed: 1, support: ["a", "b"], weights: { a: 0, b: 0 }, admitted: ["a"] }), messageIs("SIDECAR_SAMPLED_MALFORMED: weights sum to zero"));
});

// MechanicalWorkflows-5xq3: the probability-sum tolerance (1e-6, src L63) carries a factor-of-two window on both
// sides, the twin of the logProb TOLERANCE window above. The detail interpolates the validator's own left-to-right
// sum over support order, so each expected message is computed the same way and never hand-spelled.
const sumRecord = (b: number): SampledDecision => ({ support: ["a", "b"], admitted: ["a"], chosen: "a", probabilities: { a: 0.5, b }, behaviorLogProb: "unknown" });
const sumRefusal = (b: number) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probabilities sum to ${0.5 + b}, not 1` });

test("5xq3 P1 a probability map summing to 1.0001 is refused with the whole sum detail", () => {
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.5001)), sumRefusal(0.5001));
});

test("5xq3 P2 a probability map summing to 1.0000001 validates", () => {
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.5000001)), { ok: true });
});

test("5xq3 P3 the sum tolerance window holds on both sides: 2e-6 off refused, 5e-7 off accepted, excess and deficit alike", () => {
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.500002)), sumRefusal(0.500002));
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.5000005)), { ok: true });
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.499998)), sumRefusal(0.499998));
  assert.deepStrictEqual(validateSampledDecision(sumRecord(0.4999995)), { ok: true });
});

// MechanicalWorkflows-3b4v: the refusal detail interpolates the validator's left-to-right sum over SUPPORT order, so a
// three-entry map whose float sum depends on the order pins the accumulation. 0.1 + 0.2 + 0.3 is 0.6000000000000001
// while 0.3 + 0.2 + 0.1 is 0.6; every two-entry sum above is order-insensitive in IEEE arithmetic.
test("3b4v Y01 the refused sum detail accumulates left to right over support order, not key order or reversed order", () => {
  assert.notStrictEqual(0.1 + 0.2 + 0.3, 0.3 + 0.2 + 0.1);
  const probabilities = { a: 0.1, b: 0.2, c: 0.3 };
  const malformed = (sum: number) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probabilities sum to ${sum}, not 1` });
  assert.deepStrictEqual(validateSampledDecision({ support: ["a", "b", "c"], admitted: ["a"], chosen: "a", probabilities, behaviorLogProb: "unknown" }), malformed(0.1 + 0.2 + 0.3));
  assert.deepStrictEqual(validateSampledDecision({ support: ["c", "b", "a"], admitted: ["a"], chosen: "a", probabilities, behaviorLogProb: "unknown" }), malformed(0.3 + 0.2 + 0.1));
});

// MechanicalWorkflows-qhsg: three more laws of the same structuralDefect loop (src L57-63) that the 5xq3 and 3b4v rows
// leave unpinned. The per-entry refusal names the offending support id (never support[0]); with two bad entries the
// FIRST in support order is named; the sum detail accumulates left to right over a support longer than three entries.
const qhsgRecord = (support: string[], probabilities: Record<string, number>): SampledDecision => ({ support, admitted: [support[0] as string], chosen: support[0] as string, probabilities, behaviorLogProb: "unknown" });
const qhsgBadEntry = (id: string) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probability for ${id} is not a finite non-negative number` });

test("qhsg Q01 the per-entry probability refusal names the offending support id, not support[0]", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: -0.5 })), qhsgBadEntry("b"));
});

test("qhsg Q02 with two bad entries the first in support order is named, in either support order", () => {
  const probabilities = { a: 0.2, b: Number.NaN, c: -1 };
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], probabilities)), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["c", "b", "a"], probabilities)), qhsgBadEntry("c"));
});

test("qhsg Q03 the refused sum detail accumulates left to right over a four-entry support, in support order", () => {
  assert.notStrictEqual(0.1 + 0.2 + 0.3 + 0.6, 0.6 + 0.3 + 0.2 + 0.1);
  const probabilities = { a: 0.1, b: 0.2, c: 0.3, d: 0.6 };
  const malformed = (sum: number) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probabilities sum to ${sum}, not 1` });
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c", "d"], probabilities)), malformed(0.1 + 0.2 + 0.3 + 0.6));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["d", "c", "b", "a"], probabilities)), malformed(0.6 + 0.3 + 0.2 + 0.1));
});

// MechanicalWorkflows-cels: two more laws of the same structuralDefect loop (src L57-63) that the qhsg rows leave unpinned.
// A support id absent from the probabilities map is refused naming that id (a missing probability never counts as 0), and
// the refused sum detail accumulates left to right in support order at every support length from three to six, not only
// the four entries Q03 feeds.
test("cels C01 a support id missing from the probabilities map is refused naming that id and never counts as 0", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 1 })), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["b", "a"], { a: 1 })), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], { a: 0.5, c: 0.5 })), qhsgBadEntry("b"));
  // positive control: the same support with the missing id supplied as an explicit 0 is accepted.
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: 0 })), { ok: true });
});

test("cels C02 the refused sum detail accumulates left to right in support order at every support length from three to six", () => {
  const values = [0.1, 0.2, 0.3, 0.6, 0.7, 0.5];
  const ids = ["a", "b", "c", "d", "e", "f"];
  const malformed = (sum: number) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probabilities sum to ${sum}, not 1` });
  const sumOf = (xs: number[]): number => { let total = 0; for (const x of xs) total += x; return total; };
  for (let length = 3; length <= 6; length += 1) {
    const forward = values.slice(0, length);
    const backward = [...forward].reverse();
    assert.notStrictEqual(sumOf(forward), sumOf(backward), `length ${length} must make the two accumulation orders differ`);
    const probabilities = Object.fromEntries(forward.map((value, index) => [ids[index] as string, value]));
    assert.deepStrictEqual(validateSampledDecision(qhsgRecord(ids.slice(0, length), probabilities)), malformed(sumOf(forward)), `forward support, length ${length}`);
    assert.deepStrictEqual(validateSampledDecision(qhsgRecord(ids.slice(0, length).reverse(), probabilities)), malformed(sumOf(backward)), `reversed support, length ${length}`);
  }
});

// MechanicalWorkflows-4fg7: two more laws of the same structuralDefect loop (src L57-63) that the cels rows leave unpinned.
// The per-entry check runs before the sum check, so a missing support id is named even when the present entries sum to 0.5
// (never a sum detail) and the earlier missing id is named ahead of a later negative entry; a null probability entry is
// refused by name and never read as 0.
test("4fg7 D01 a missing support id is named even when the present entries sum to 0.5, never a sum detail", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5 })), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["b", "a"], { a: 0.5 })), qhsgBadEntry("b"));
});

test("4fg7 D02 an earlier missing support id is named ahead of a later negative entry", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { b: -1 })), qhsgBadEntry("a"));
});

test("4fg7 D03 a null probability entry is refused by name and never read as 0", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: null as unknown as number })), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["b", "a"], { a: 1, b: null as unknown as number })), qhsgBadEntry("b"));
  // positive control: an explicit 0 entry is accepted, so the null refusal is not a blanket zero refusal.
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: 0 })), { ok: true });
});

// MechanicalWorkflows-8nho: three more laws of the same structuralDefect loop (src L57-63) that the 4fg7 rows leave unpinned,
// each on a three-entry support because the 4fg7 rows feed only two-entry supports. A null probability entry is named ahead
// of a later negative entry (the null twin of D02), a missing INTERIOR support id is named beside an off sum, and a null
// INTERIOR entry is never read as 0.
test("8nho E01 an earlier null probability entry is named ahead of a later negative entry", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: null as unknown as number, b: -1 })), qhsgBadEntry("a"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], { a: null as unknown as number, b: -1, c: 0.5 })), qhsgBadEntry("a"));
});

test("8nho E02 a missing INTERIOR support id is named beside an off sum, never a sum detail", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], { a: 0.25, c: 0.25 })), qhsgBadEntry("b"));
});

test("8nho E03 a null INTERIOR probability entry is refused by name and never read as 0", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], { a: 0.5, b: null as unknown as number, c: 0.5 })), qhsgBadEntry("b"));
  // positive control: an explicit 0 interior entry is accepted, so the null refusal is not a blanket zero refusal.
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b", "c"], { a: 0.5, b: 0, c: 0.5 })), { ok: true });
});

// MechanicalWorkflows-lwkd: the four orderings over {missing, null, negative} that D02 and E01 leave unpinned, so with them
// all six ordered pairs of the same structuralDefect loop (src L57-63) are pinned. The first bad entry in support order is
// named whatever its kind: a negative entry ahead of a later null or missing one, a null entry ahead of a later missing one,
// and a missing id ahead of a later null entry. F05 pins an explicit 0 at the FIRST support position beside the C01/D03/E03
// controls (last and interior). No probabilities key outside the support is fed (8pcj).
test("lwkd F01 an earlier negative probability entry is named ahead of a later null entry", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: -1, b: null as unknown as number })), qhsgBadEntry("a"));
});

test("lwkd F02 an earlier negative probability entry is named ahead of a later missing support id", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: -1 })), qhsgBadEntry("a"));
});

test("lwkd F03 an earlier null probability entry is named ahead of a later missing support id", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: null as unknown as number })), qhsgBadEntry("a"));
});

test("lwkd F04 an earlier missing support id is named ahead of a later null entry", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { b: null as unknown as number })), qhsgBadEntry("a"));
});

test("lwkd F05 an explicit 0 probability entry at the first support position is accepted", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0, b: 1 })), { ok: true });
});

// MechanicalWorkflows-4euq: the two probability-entry shapes lwkd leaves unpinned at the trust boundary. A +Infinity entry is
// refused with the per-entry detail that names the id, never the sum detail a bare Number.isNaN check would fall through to,
// and a numeric-string entry (a JSON-imported record can carry one) is refused, never coerced and admitted.
test("4euq R1 a +Infinity probability entry is refused with the per-entry detail naming it, never the sum detail", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: Infinity, b: 0 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.ok(!/sum/.test((verdict as { detail: string }).detail));
});

test("4euq R2 a numeric-string probability entry is refused naming it, never admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: "0.5" as unknown as number, b: 0.5 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

// MechanicalWorkflows-e93j: the boolean probability entry that 4euq leaves unpinned. structuralDefect (src L59-L60) demands one
// finite non-negative NUMBER per support id, so a boolean entry is refused naming the id, never coerced to 1 or 0 and admitted.
test("e93j R1 a boolean true probability entry is refused naming it, never coerced and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: true as unknown as number, b: 0 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("e93j R2 a boolean false probability entry is refused naming it, never coerced to 0 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: false as unknown as number, b: 1 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

// MechanicalWorkflows-b8si: the bigint and boxed-Number probability entries that e93j leaves unpinned. structuralDefect (src L59-L60)
// demands one finite non-negative NUMBER primitive per support id, so a bigint or a boxed Number is refused naming the id, never converted and admitted.
test("b8si R1 a bigint probability entry is refused naming it, never converted to a number and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: BigInt(1) as unknown as number, b: 0 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("b8si R2 a boxed Number probability entry is refused naming it, never unboxed and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: new Number(0.5) as unknown as number, b: 0.5 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

// MechanicalWorkflows-wfdi: the boxed String and boxed Boolean probability entries that b8si leaves unpinned. structuralDefect (src L59-L60)
// demands one finite non-negative NUMBER primitive per support id, so a boxed String or a boxed Boolean is refused naming the id, never converted and admitted.
test("wfdi R1 a boxed String probability entry is refused naming it, never converted to a number and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: new String("0.5") as unknown as number, b: 0.5 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("wfdi R2 a boxed Boolean probability entry is refused naming it, never converted and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: new Boolean(true) as unknown as number, b: 0 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

// MechanicalWorkflows-9gd1: the boxed wrappers the wfdi rows leave unpinned because both put the wrapper at support[0] and the Boolean row holds true.
// A boxed false and a boxed String at a LATER support position are refused naming that id (b), never converted to a number and admitted. Kills the
// position- and value-confined conversions at structuralDefect src L59 (boxed-false-only to 0, boxed String or Boolean past support[0] via Number()).
test("9gd1 R1 a boxed Boolean false at a later support position is refused naming it, never converted to 0 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: new Boolean(false) as unknown as number }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("9gd1 R2 a boxed String behind a valid first entry is refused naming the later id, never converted and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: new String("0.5") as unknown as number }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

// MechanicalWorkflows-ge9t: the per-entry refusal names the LATER id for the primitive and boxed non-number entries the 9gd1 rows leave unpinned.
// Every kill cell below carries a value that, once converted by a position-confined edit at structuralDefect src L59, makes the probabilities sum
// to exactly 1, so the mutant ADMITS the record while the landed code refuses it naming the offending id. Cells R1..R6 name the six witnesses; R7 closes
// the family over a three-id support so no position-confined conversion of these seven shapes survives.
const ge9tAsNumber = (value: unknown): number => value as number;

test("ge9t R1 a primitive boolean false behind a valid first entry is refused naming b, never coerced to 0 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: ge9tAsNumber(false) }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R2 a BigInt zero behind a valid first entry is refused naming b, never converted to 0 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: ge9tAsNumber(BigInt(0)) }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R3 a boxed Number behind a valid first entry is refused naming b, never unboxed and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: ge9tAsNumber(new Number(0.5)) }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R4 a numeric string behind a valid first entry is refused naming b, never coerced and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: ge9tAsNumber("0.5") }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R5 a boxed Boolean true behind a zero first entry is refused naming b, never converted to 1 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 0, b: ge9tAsNumber(new Boolean(true)) }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("b"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R6 a boxed Boolean false AT support[0] is refused naming a, never converted to 0 and admitted", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: ge9tAsNumber(new Boolean(false)), b: 1 }));
  assert.deepStrictEqual(verdict, qhsgBadEntry("a"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ge9t R7 each of eight non-number shapes at support[0], support[1] and support[2] of a three-id support is refused naming that id", () => {
  const shapes: Array<{ name: string; value: unknown; converted: number }> = [
    { name: "false", value: false, converted: 0 },
    { name: "true", value: true, converted: 1 },
    { name: "BigInt(0)", value: BigInt(0), converted: 0 },
    { name: "new Number(0.5)", value: new Number(0.5), converted: 0.5 },
    { name: "'0.5'", value: "0.5", converted: 0.5 },
    { name: "new Boolean(true)", value: new Boolean(true), converted: 1 },
    { name: "new Boolean(false)", value: new Boolean(false), converted: 0 },
    { name: "new String('0.5')", value: new String("0.5"), converted: 0.5 },
  ];
  const support = ["a", "b", "c"];
  for (const shape of shapes) {
    for (let position = 0; position < support.length; position += 1) {
      const rest = (1 - shape.converted) / 2;
      const probabilities: Record<string, number> = {};
      support.forEach((id, index) => { probabilities[id] = index === position ? ge9tAsNumber(shape.value) : rest; });
      const verdict = validateSampledDecision(qhsgRecord(support, probabilities));
      assert.deepStrictEqual(verdict, qhsgBadEntry(support[position] as string), `${shape.name} at support[${position}]`);
      assert.notDeepStrictEqual(verdict, { ok: true }, `${shape.name} at support[${position}] admitted`);
    }
  }
});

// MechanicalWorkflows-ba7o7 (8pcj refuse ruling, qhsg XR3 follow-on): a probabilities key outside record.support is a defect, never
// ignored. {a: 0.5, b: 0.5, z: 0.3} truly sums to 1.3, so summing over the support alone hid a record that contradicts its own field
// doc. The refusal names the extra key(s) sorted by code unit and sits beside the per-entry type guard, so in-support pins do not move.
const ba7oExtra = (keys: string) => ({ ok: false, code: "SIDECAR_SAMPLED_MALFORMED", detail: `probabilities names keys outside the support: ${keys}` });

test("ba7o7 X01 a probabilities key outside the support is refused naming it, though the support entries alone sum to 1", () => {
  const verdict = validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: 0.5, z: 0.3 }));
  assert.deepStrictEqual(verdict, ba7oExtra("z"));
  assert.notDeepStrictEqual(verdict, { ok: true });
});

test("ba7o7 X02 several extra keys are named sorted by code unit, whatever their insertion order", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { z: 0.1, a: 0.5, B: 0.1, b: 0.5 })), ba7oExtra("B, z"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: 0.5, z: 0, y: 0, B: 0 })), ba7oExtra("B, y, z"));
});

test("ba7o7 X03 an extra key holding 0 is still refused, so the check reads key membership and not the extra value", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: 0.5, z: 0 })), ba7oExtra("z"));
});

test("ba7o7 X04 a record whose probabilities keys equal the support is unchanged, in either key order and with a zero entry", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: 0.5 })), { ok: true });
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { b: 0.5, a: 0.5 })), { ok: true });
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 1, b: 0 })), { ok: true });
});

test("ba7o7 X05 the per-entry type refusal still comes first when a bad support entry and an extra key share a record", () => {
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, b: -0.5, z: 0.3 })), qhsgBadEntry("b"));
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], { a: 0.5, z: 0.5 })), qhsgBadEntry("b"));
});

test("ba7o7 X06 an own __proto__ key from JSON import counts as an extra key and is named", () => {
  const imported = JSON.parse('{"a":0.5,"b":0.5,"__proto__":0.3}') as Record<string, number>;
  assert.deepStrictEqual(validateSampledDecision(qhsgRecord(["a", "b"], imported)), ba7oExtra("__proto__"));
});
