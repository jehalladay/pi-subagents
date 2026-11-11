import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  evaluate, labelEvaluation, evaluationBytes, fixedBaseline, fixedChecked, fixedConfiguration, composedConfiguration, externalConfiguration,
  seedParitySelector, runArtifactRecovery, restartFromScratch, resumeFromSnapshot, digest, canonicalJson, fifoLanding, restackFirst, gateDraws,
  oracleLandedOrder, oracleCompactionOutcome, oracleColonyOutcome, oracleRecovery, oracleQuorum,
} from "../dist/index.js";
import type { EvaluationInput, EvaluationReport, EvaluationConfiguration, EvaluationScenario, EvaluationBudget, PolicySet, LandingObservation, PolicyContext } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const pinnedPath = join(here, "../../../qa/integration/python-consumer/fixtures/evaluation-holdout-split.json");

const scenario: EvaluationScenario = {
  landing: { candidates: 6, lanes: 1, steps: 14 }, compactionTasks: 8, colony: { workers: 6, compute: 18, steps: 10 },
  recovery: { work: 8, steps: 14 }, quorum: { candidates: 4, reviewers: 3, steps: 12, budget: 20, gate: "authoritative" },
};
const budget: EvaluationBudget = { steps: 14, units: 200 };
const trainSeeds = [1, 2, 3, 4];
const holdOut = [5, 6, 7, 8, 9, 10, 11, 12];
const restackConfig = fixedConfiguration("restack-only", "1", { ...fixedBaseline.policies, landing: restackFirst });
const fifoConfig = fixedConfiguration("fifo-only", "1", { ...fixedBaseline.policies, landing: fifoLanding });

const input = (over: Partial<EvaluationInput> = {}): EvaluationInput => ({
  entries: [{ configuration: restackConfig, budget }, { configuration: fifoConfig, budget }],
  scenario, partition: { train: trainSeeds, holdOut }, bootstrap: { seed: 11, resamples: 200 }, ...over,
});

const refusal = (fn: () => unknown, code: string): void => assert.throws(fn, (error: unknown) => error instanceof Error && error.message.startsWith(code + ":"));
const block = (report: EvaluationReport, config: string, env: string) => report.configurations.find(c => c.id === config)!.environments.find(e => e.environment === env)!;
const compare = (report: EvaluationReport, versus: string, env: string) => report.comparisons.find(c => c.versus === versus && c.environment === env)!;

test("unequal budgets across configurations are refused", () => {
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget }, { configuration: fifoConfig, budget: { steps: 14, units: 201 } }] })), "EVALUATION_BUDGET_UNEQUAL");
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget }, { configuration: fifoConfig, budget: { steps: 13, units: 200 } }] })), "EVALUATION_BUDGET_UNEQUAL");
});

test("an infinite bootstrap resample count is refused as an invalid bootstrap on the evaluate path", () => {
  // Infinity is not an integer and is not below one, so only the integer clause refuses it as EVALUATION_BOOTSTRAP_INVALID; a floor-equality rewrite admits it and the interval loop never terminates.
  refusal(() => evaluate(input({ bootstrap: { seed: 1, resamples: Infinity } })), "EVALUATION_BOOTSTRAP_INVALID");
});

test("a bootstrap seed outside the uint32 domain gateDraws consumes is refused, so distinct declared seeds can no longer resample one stream", () => {
  // 11.5 and 11 + 2^32 both reduce to seed 11 under gateDraws (ToInt32 then >>> 0); -3 is not a seed at all.
  for (const seed of [11.5, -3, 2 ** 32 + 11, 2 ** 32, Number.MAX_SAFE_INTEGER]) {
    assert.throws(() => evaluate(input({ bootstrap: { seed, resamples: 200 } })), (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_BOOTSTRAP_INVALID:") && error.message.includes(`${seed} seed`));
  }
  // gateDraws finalises the seed (gateStreamStart) and remaps a zero state to 1, so 0x61c88647 (finalised state 0) starts exactly where 0x6f2a7a53 (finalised state 1) starts: the only admitted pair of distinct seeds that resample one stream.
  assert.throws(() => evaluate(input({ bootstrap: { seed: 0x61c88647, resamples: 200 } })), (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_BOOTSTRAP_INVALID:") && error.message.includes("1640531527 seed"));
  assert.equal(evaluate(input({ bootstrap: { seed: 0x6f2a7a53, resamples: 200 } })).bootstrap.seed, 0x6f2a7a53);
  // The fixture seed and the uint32 boundaries stay admitted and are recorded verbatim.
  for (const seed of [11, 0, 2 ** 32 - 1]) assert.equal(evaluate(input({ bootstrap: { seed, resamples: 200 } })).bootstrap.seed, seed);
  // Since the finaliser, the retired pre-finaliser alias 0x9e3779b9 is an ordinary seed: only ZERO_STATE_SEED is refused, and the admitted seed is recorded verbatim.
  assert.equal(evaluate(input({ bootstrap: { seed: 0x9e3779b9, resamples: 200 } })).bootstrap.seed, 0x9e3779b9);
});

test("a budget that is not a positive integer pair, an empty entry list and duplicate configuration ids are refused", () => {
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 0, units: 200 } }, { configuration: fifoConfig, budget: { steps: 0, units: 200 } }] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 14, units: 1.5 } }] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluate(input({ entries: [] })), "EVALUATION_NO_CONFIGURATIONS");
  refusal(() => evaluate(input({ bootstrap: { seed: 1, resamples: 0 } })), "EVALUATION_BOOTSTRAP_INVALID");
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget }, { configuration: restackConfig, budget }] })), "EVALUATION_DUPLICATE_CONFIGURATION");
});

test("a fractional step budget is refused as an invalid budget on the evaluate path and its integral neighbour is admitted", () => {
  // 14.5 exceeds 1, so only the integer clause refuses it; the lower bound alone would admit it (Math.min(14, 14.5) runs 14 steps).
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 14.5, units: 200 } }] })), "EVALUATION_BUDGET_INVALID");
  // 13.5 sits between 1 and the 14-step scenario cap, so a clause that refuses fractions only above the cap would admit it.
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 13.5, units: 200 } }] })), "EVALUATION_BUDGET_INVALID");
  const integral = evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 15, units: 200 } }] }));
  assert.deepEqual(integral.budget, { steps: 15, units: 200 }, "the integral neighbour of the refused fraction is admitted");
});

test("an infinite step budget or an infinite unit budget is refused as an invalid budget on the evaluate path", () => {
  // Infinity is whole under Math.floor(x) === x and exceeds 1, so only Number.isInteger refuses it; a rewrite would pass it on to digest() and surface CANONICAL_JSON_UNSUPPORTED_VALUE instead.
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: Infinity, units: 200 } }] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 14, units: Infinity } }] })), "EVALUATION_BUDGET_INVALID");
});

test("a partition seed outside the uint32 domain gateDraws consumes is refused, so a wrapped or negative hold-out seed cannot replay a training stream behind a disjoint partition hash", () => {
  // 2^32 + 1 and -(2^32) + 1 both reduce to stream seed 1 under gateDraws (ToInt32 then >>> 0); 1.5 and -3 are not seeds at all.
  for (const seed of [2 ** 32 + 1, -(2 ** 32) + 1, 1.5, -3, 2 ** 32, Number.MAX_SAFE_INTEGER]) {
    assert.throws(() => evaluate(input({ partition: { train: [1], holdOut: [seed] } })), (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_PARTITION_INVALID:") && error.message.includes(`${seed} hold-out seed`));
    assert.throws(() => evaluate(input({ partition: { train: [seed], holdOut: [5] } })), (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_PARTITION_INVALID:") && error.message.includes(`${seed} training seed`));
  }
  // The uint32 boundaries stay admitted.
  for (const seed of [0, 2 ** 32 - 1]) assert.deepEqual(evaluate(input({ partition: { train: [1], holdOut: [seed] } })).partition.holdOut, [seed]);
});

test("two partition seeds that start one gateDraws stream are an overlap even though their declared values differ", () => {
  // 0x61c88647 finalises to the zero state, which gateDraws remaps to 1: exactly where 0x6f2a7a53 (finalised state 1) starts, so the pair replays one stream.
  assert.equal(gateDraws(0x61c88647)(), gateDraws(0x6f2a7a53)(), "the pair really starts one gateDraws stream");
  refusal(() => evaluate(input({ partition: { train: [0x61c88647], holdOut: [0x6f2a7a53] } })), "EVALUATION_PARTITION_OVERLAP");
  refusal(() => evaluate(input({ partition: { train: [0x6f2a7a53], holdOut: [0x61c88647] } })), "EVALUATION_PARTITION_OVERLAP");
  // The refusal holds the exact full message with the single aliased hold-out seed: a two-seed list is unreachable in the uint32 domain (only the 0x61c88647/0x6f2a7a53 zero-state pair collides, and placing both in one set trips the within-set guard first), so the single-seed equality is the whole reachable pin and a dropped, reshaped or reordered seed list fails it.
  const overlap = (error: unknown, message: string) => error instanceof RangeError && error.message === message;
  assert.throws(() => evaluate(input({ partition: { train: [0x61c88647], holdOut: [0x6f2a7a53] } })), (error: unknown) => overlap(error, "EVALUATION_PARTITION_OVERLAP: seeds 1865054803 start a training seed's gateDraws stream"));
  assert.throws(() => evaluate(input({ partition: { train: [0x6f2a7a53], holdOut: [0x61c88647] } })), (error: unknown) => overlap(error, "EVALUATION_PARTITION_OVERLAP: seeds 1640531527 start a training seed's gateDraws stream"));
  // The neighbours of the colliding pair draw distinct streams and stay admitted.
  assert.deepEqual(evaluate(input({ partition: { train: [0x6f2a7a52], holdOut: [0x6f2a7a53] } })).partition.holdOut, [0x6f2a7a53]);
});

test("two seeds of one partition set that start one gateDraws stream are refused, so a single stream cannot be double-weighted in the metrics", () => {
  // 0x61c88647 and 0x6f2a7a53 start one gateDraws stream, so declaring both in one set would weight that stream twice after the declared-value dedupe.
  const pair = [0x61c88647, 0x6f2a7a53];
  const aliased = (error: unknown, role: string) => error instanceof Error && error.message.startsWith("EVALUATION_PARTITION_INVALID:") && error.message.includes(`${role} seeds`) && error.message.includes(`${pair[0]},${pair[1]}`);
  assert.throws(() => evaluate(input({ partition: { train: pair, holdOut: [5] } })), (error: unknown) => aliased(error, "training"));
  assert.throws(() => evaluate(input({ partition: { train: [1], holdOut: pair } })), (error: unknown) => aliased(error, "hold-out"));
  assert.throws(() => evaluate(input({ partition: { train: [pair[1]!, pair[0]!], holdOut: [5] } })), (error: unknown) => aliased(error, "training"));
  // The colliding pair is refused when an ordinary seed sorts below it, so the check compares every earlier seed of the set and not only the head.
  assert.throws(() => evaluate(input({ partition: { train: [1, pair[0]!, pair[1]!], holdOut: [5] } })), (error: unknown) => aliased(error, "training"));
  assert.throws(() => evaluate(input({ partition: { train: [1], holdOut: [5, pair[0]!, pair[1]!] } })), (error: unknown) => aliased(error, "hold-out"));
  // The pair is also refused when it is the lowest two seeds under an ordinary seed above it and when two ordinary seeds sort below it, so the check covers the whole sorted set and not a head or tail window.
  assert.throws(() => evaluate(input({ partition: { train: [pair[0]!, pair[1]!, 0xffffffff], holdOut: [5] } })), (error: unknown) => aliased(error, "training"));
  assert.throws(() => evaluate(input({ partition: { train: [1, 2, pair[0]!, pair[1]!], holdOut: [5] } })), (error: unknown) => aliased(error, "training"));
  // The hold-out side is the scored one (evaluate() scores only hold-out seeds), so it carries the same whole-set windows: the pair as the lowest two under an ordinary seed above it and under two ordinary seeds below it.
  assert.throws(() => evaluate(input({ partition: { train: [1], holdOut: [pair[0]!, pair[1]!, 0xffffffff] } })), (error: unknown) => aliased(error, "hold-out"));
  assert.throws(() => evaluate(input({ partition: { train: [3], holdOut: [1, 2, pair[0]!, pair[1]!] } })), (error: unknown) => aliased(error, "hold-out"));
  // The refusal is a RangeError with the exact full message, so a plain Error or a reworded refusal under the same code and role fails (the predicate above reads only a prefix and substrings).
  const exact = (error: unknown, message: string) => error instanceof RangeError && error.message === message;
  assert.throws(() => evaluate(input({ partition: { train: pair, holdOut: [5] } })), (error: unknown) => exact(error, "EVALUATION_PARTITION_INVALID: 1640531527,1865054803 training seeds start one gateDraws stream"));
  assert.throws(() => evaluate(input({ partition: { train: [1], holdOut: pair } })), (error: unknown) => exact(error, "EVALUATION_PARTITION_INVALID: 1640531527,1865054803 hold-out seeds start one gateDraws stream"));
  // The pair split across the two sets stays the cross-set overlap, and a repeated identical value is still silently de-duplicated.
  refusal(() => evaluate(input({ partition: { train: [pair[0]!], holdOut: [pair[1]!] } })), "EVALUATION_PARTITION_OVERLAP");
  assert.deepEqual(evaluate(input({ partition: { train: [1], holdOut: [pair[0]!, pair[0]!] } })).partition.holdOut, [pair[0]]);
  // One member of the pair next to an ordinary seed draws distinct streams and stays admitted.
  assert.deepEqual(evaluate(input({ partition: { train: [1, pair[1]!], holdOut: [5, 6] } })).partition.train, [1, pair[1]]);
});

test("hold-out seeds never overlap training seeds, and the partition hash is in the report", () => {
  refusal(() => evaluate(input({ partition: { train: [1, 2, 5], holdOut } })), "EVALUATION_PARTITION_OVERLAP");
  // The declared-value overlap refusal names every shared seed, comma-joined and ascending, in the exact wording, so the seed list and the guard itself are witnessed and not only the code prefix.
  assert.throws(() => evaluate(input({ partition: { train: [1, 2, 5, 6], holdOut } })), (error: unknown) => error instanceof RangeError && error.message === "EVALUATION_PARTITION_OVERLAP: seeds 5,6 are in both the training and the hold-out set");
  // Three shared seeds that are neither the hold-out head (5,6,7) nor the training tail (8,10,20) pin the list as the full ascending intersection, so a capped, hold-out-head or training-tail list fails.
  assert.throws(() => evaluate(input({ partition: { train: [1, 6, 8, 10, 20], holdOut } })), (error: unknown) => error instanceof RangeError && error.message === "EVALUATION_PARTITION_OVERLAP: seeds 6,8,10 are in both the training and the hold-out set");
  // A single shared seed is the commonest declared overlap; only the exact wording tells the declared guard from the stream-key guard that would otherwise refuse it under the same code with the alias wording.
  assert.throws(() => evaluate(input({ partition: { train: [1, 12], holdOut } })), (error: unknown) => error instanceof RangeError && error.message === "EVALUATION_PARTITION_OVERLAP: seeds 12 are in both the training and the hold-out set");
  // Four shared seeds, the last of them past the three-seed window, pin the list as the full intersection and not a capped prefix.
  assert.throws(() => evaluate(input({ partition: { train: [1, 2, 6, 7, 8, 12], holdOut } })), (error: unknown) => error instanceof RangeError && error.message === "EVALUATION_PARTITION_OVERLAP: seeds 6,7,8,12 are in both the training and the hold-out set");
  // A gapped hold-out with a training seed strictly between two shared seeds pins the list as the hold-out members found in training, so a training run of that many seeds from the first shared seed (which would say 5,6) fails.
  assert.throws(() => evaluate(input({ partition: { train: [5, 6, 7], holdOut: [5, 7, 9] } })), (error: unknown) => error instanceof RangeError && error.message === "EVALUATION_PARTITION_OVERLAP: seeds 5,7 are in both the training and the hold-out set");
  // A training seed strictly inside the hold-out span that is not a member of it is admitted, so a span test in place of membership (which would refuse it as seeds 6) fails.
  assert.deepEqual(evaluate(input({ partition: { train: [6], holdOut: [5, 7] } })).partition.train, [6]);
  refusal(() => evaluate(input({ partition: { train: trainSeeds, holdOut: [] } })), "EVALUATION_HOLDOUT_EMPTY");
  const report = evaluate(input());
  assert.deepEqual(report.partition.train, trainSeeds);
  assert.deepEqual(report.partition.holdOut, holdOut);
  assert.equal(report.partition.hash, digest({ train: trainSeeds, holdOut }));
  assert.equal(evaluate(input({ partition: { train: [4, 3, 2, 1], holdOut: [...holdOut].reverse() } })).partition.hash, report.partition.hash, "the hash covers the sets, not their order");
  assert.notEqual(evaluate(input({ partition: { train: trainSeeds, holdOut: holdOut.slice(0, 6) } })).partition.hash, report.partition.hash);
  for (const config of report.configurations) for (const env of config.environments) assert.deepEqual(env.seeds, holdOut, "only hold-out seeds are evaluated");
});

test("fifoLanding shows the merge-bottleneck completion deficit against restackFirst on held-out seeds, with a confidence interval", () => {
  const report = evaluate(input());
  const row = compare(report, "fifo-only", "landing-queue");
  assert.equal(row.reference, "restack-only");
  assert.ok(row.deltaMicro < 0, `fifo should land fewer: ${row.deltaMicro}`);
  assert.ok(row.ciHighMicro < 0 && row.ciLowMicro <= row.deltaMicro, "the interval sits wholly below zero");
  assert.equal(row.deficit, row.deltaMicro);
  assert.equal("uplift" in row, false);
  const fifo = block(report, "fifo-only", "landing-queue");
  const restack = block(report, "restack-only", "landing-queue");
  assert.ok(restack.validatedCompletion.meanMicro > fifo.validatedCompletion.meanMicro);
  assert.ok(fifo.validatedCompletion.ciLowMicro <= fifo.validatedCompletion.meanMicro && fifo.validatedCompletion.meanMicro <= fifo.validatedCompletion.ciHighMicro);
  assert.equal(compare(report, "restack-only", "landing-queue") === undefined, true, "the reference is never compared with itself");
});

test("a single-seed evaluation emits neither uplift nor deficit and says why", () => {
  const report = evaluate(input({ partition: { train: trainSeeds, holdOut: [5] } }));
  const row = compare(report, "fifo-only", "landing-queue");
  assert.equal("uplift" in row, false);
  assert.equal("deficit" in row, false);
  assert.equal(row.upliftWithheld, "SINGLE_SEED");
  assert.equal(row.n, 1);
  for (const comparison of report.comparisons) { assert.equal("uplift" in comparison, false); assert.equal(comparison.upliftWithheld, "SINGLE_SEED"); }
});

test("an interval that contains zero emits no uplift", () => {
  const twin = fixedConfiguration("restack-twin", "1", restackConfig.policies);
  const report = evaluate(input({ entries: [{ configuration: restackConfig, budget }, { configuration: twin, budget }] }));
  for (const comparison of report.comparisons) {
    assert.equal(comparison.deltaMicro, 0);
    assert.equal("uplift" in comparison, false);
    assert.equal("deficit" in comparison, false);
    assert.equal(comparison.upliftWithheld, "INTERVAL_CONTAINS_ZERO");
  }
});

test("an uplift appears for a real positive effect and carries the signed delta", () => {
  const report = evaluate(input({ entries: [{ configuration: fifoConfig, budget }, { configuration: restackConfig, budget }] }));
  const row = compare(report, "restack-only", "landing-queue");
  assert.ok(row.deltaMicro > 0 && row.ciLowMicro > 0);
  assert.equal(row.uplift, row.deltaMicro);
  assert.equal("deficit" in row, false);
  assert.equal("upliftWithheld" in row, false);
});

test("the composition-selected configuration is built from the exported alternative combinator and a declared selector, and the selection is traced", () => {
  const selector = seedParitySelector<LandingObservation>();
  const composed = composedConfiguration("parity-composition", "1", fixedBaseline, fixedChecked, selector);
  assert.equal(composed.kind, "composition");
  assert.deepEqual(composed.provenance, { kind: "composition", combinator: "alternative", selector: { id: "seed-parity", revision: "1" }, parts: [fixedBaseline.configHash, fixedChecked.configHash] });
  const landing = composed.policies.landing;
  assert.equal(landing.id, "fifo-landing+restack-first");
  assert.equal(landing.revision, "fifo-landing@fixture-1;restack-first@fixture-1;seed-parity@1");
  const observation: LandingObservation = { basis: { workspaceId: "w", revision: "head-1" }, head: "head-1", lanes: 1, ready: [{ id: "c1", base: "head-0", arrival: 0 }] };
  const context = (seed: number): PolicyContext => ({ episodeId: "e", actorId: "a", observationDigest: "d", budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, authority: "propose-only", policyRevision: "r", seed });
  const even = landing.propose(observation, 0, context(2));
  const odd = landing.propose(observation, 0, context(3));
  assert.equal(even.trace[0]!.kind, "alternative-selected");
  assert.equal(even.trace[0]!.detail, "left by seed-parity@1");
  assert.equal(odd.trace[0]!.detail, "right by seed-parity@1");
  assert.equal(even.intents.length, 0, "fifo has no candidate on the head");
  assert.equal(odd.intents[0]!.effect, "restack");
  assert.equal(typeof even.memory, "number");
  assert.notEqual(composed.configHash, fixedChecked.configHash);
  const report = evaluate(input({ entries: [{ configuration: fixedBaseline, budget }, { configuration: composed, budget }, { configuration: fixedChecked, budget }] }));
  const row = report.configurations.find(c => c.id === "parity-composition")!;
  assert.equal(row.kind, "composition");
  assert.deepEqual(row.provenance, composed.provenance);
  const share = (id: string) => block(report, id, "landing-queue").validatedCompletion.meanMicro;
  assert.ok(share("parity-composition") >= share("fixed-baseline") && share("parity-composition") <= share("fixed-checked"), "the mixture lies between its parts");
});

test("an external configuration is identified only by its hash and policy id@revision, and a malformed hash is refused", () => {
  refusal(() => externalConfiguration({ id: "learned-x", revision: "7", configHash: "not-a-hash", policies: fixedChecked.policies }), "EVALUATION_CONFIG_HASH_INVALID");
  refusal(() => externalConfiguration({ id: "learned-x", revision: "7", configHash: "sha256:" + "A".repeat(64), policies: fixedChecked.policies }), "EVALUATION_CONFIG_HASH_INVALID");
  const hash = "sha256:" + "ab".repeat(32);
  const external = externalConfiguration({ id: "learned-x", revision: "7", configHash: hash, policies: fixedChecked.policies });
  const report = evaluate(input({ entries: [{ configuration: fixedBaseline, budget }, { configuration: external, budget }] }));
  const row = report.configurations.find(c => c.id === "learned-x")!;
  assert.equal(row.kind, "external");
  assert.equal(row.configHash, hash);
  assert.deepEqual(row.policies, { landing: "restack-first@fixture-1", compaction: "provenance-checked@fixture-1", colony: "receipt-checked@fixture-1", recovery: "resume-from-snapshot@fixture-1", quorum: "independent-test-first@fixture-1" });
  assert.equal(JSON.stringify(report).includes("propose"), false, "no policy body reaches the report");
});

test("the continuity arm carries a failed attempt's artifact into a later episode whose worker consumes it, and measures treatment minus control", () => {
  const report = evaluate(input({ entries: [{ configuration: fixedBaseline, budget }, { configuration: fixedChecked, budget }] }));
  const resume = report.continuity.find(c => c.configuration === "fixed-checked")!;
  const restart = report.continuity.find(c => c.configuration === "fixed-baseline")!;
  assert.equal(resume.seeds.length, holdOut.length);
  for (const row of resume.seeds) {
    assert.equal(row.carriedFrom, "a1");
    assert.notEqual(row.laterSeed, row.seed, "the later episode is a different seed");
    assert.ok(holdOut.includes(row.laterSeed));
    assert.equal(row.consumedBy, "a2");
    assert.match(row.artifactDigest, /^sha256:[0-9a-f]{64}$/);
    assert.ok(row.treatmentMinusControlSteps < 0, "keeping the artifact finishes sooner");
    assert.equal(row.treatmentSteps - row.controlSteps, row.treatmentMinusControlSteps);
  }
  assert.equal(resume.consumed, holdOut.length);
  assert.ok(resume.meanTreatmentMinusControlStepsMicro < 0);
  for (const row of restart.seeds) { assert.equal(row.consumedBy, "none"); assert.equal(row.treatmentMinusControlSteps, 0); }
  assert.equal(restart.consumed, 0);
  assert.deepEqual(resume.seeds.map(row => row.laterSeed), [...holdOut.slice(1), holdOut[0]]);
});

test("s14.5: the later episode inherits the earlier episode's artifact, and a single hold-out seed continues into seed + 1", () => {
  const report = evaluate(input({ entries: [{ configuration: fixedChecked, budget }], partition: { train: trainSeeds, holdOut: [7] } }));
  const row = report.continuity[0]!.seeds[0]!;
  assert.equal(row.laterSeed, 8);
  assert.equal(row.consumedBy, "a2");
  const earlier = runArtifactRecovery({ work: scenario.recovery.work, steps: 1, seed: 7, arm: "treatment", policy: restartFromScratch });
  assert.equal(row.artifactDigest, earlier.final.artifact!.digest);
  const later = runArtifactRecovery({ work: scenario.recovery.work, steps: 14, seed: 8, arm: "treatment", policy: resumeFromSnapshot, inheritedArtifact: { ...earlier.final.artifact!, originEpisode: "fixture:artifact-recovery:7" } });
  assert.equal(later.final.completedAtStep, row.treatmentSteps);
});

test("every report is labelled fixture and a relabel is refused", () => {
  const report = evaluate(input());
  assert.equal(report.mode, "fixture");
  assert.equal(report.schema, "mw.evaluation.fixture.v1");
  assert.equal(labelEvaluation(report, "fixture"), report);
  for (const mode of ["replay", "live", "live-verified", ""]) {
    assert.throws(() => labelEvaluation(report, mode), (error: unknown) => error instanceof Error && error.message.startsWith("EPISODE_MODE_UPGRADE_FORBIDDEN:"));
  }
});

test("metrics agree with the independent per-environment oracles", () => {
  const seeds = [5, 6, 7];
  const report = evaluate(input({ entries: [{ configuration: fixedChecked, budget }], partition: { train: [1], holdOut: seeds } }));
  const mean = (values: readonly number[]) => Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const landing = seeds.map(seed => oracleLandedOrder({ seed, candidates: 6, steps: 14, policy: "restack-first" }).length / 6 * 1e6);
  assert.equal(block(report, "fixed-checked", "landing-queue").validatedCompletion.meanMicro, mean(landing.map(Math.round)));
  const compaction = seeds.map(seed => { const o = oracleCompactionOutcome({ seed, tasks: 8, policy: "provenance-checked" }); return { done: o.statuses.filter(s => s === "succeeded" || s === "rediscovered").length / 8 * 1e6, redisc: o.statuses.filter(s => s === "rediscovered").length / 8 * 1e6 }; });
  assert.equal(block(report, "fixed-checked", "compaction-inheritance").validatedCompletion.meanMicro, mean(compaction.map(c => Math.round(c.done))));
  assert.equal(block(report, "fixed-checked", "compaction-inheritance").metrics.rediscoveryRate, mean(compaction.map(c => Math.round(c.redisc))));
  const colony = seeds.map(seed => oracleColonyOutcome({ seed, workers: 6, compute: 18, steps: 10, policy: "receipt-checked" }));
  assert.equal(block(report, "fixed-checked", "colony-resilience").metrics.wrongSignalPropagation, mean(colony.map(c => Math.round(c.unsafeEffects / 6 * 1e6))));
  const recovery = seeds.map(seed => oracleRecovery({ seed, work: 8, policy: "resume-from-snapshot", arm: "treatment" }).steps);
  const control = seeds.map(seed => oracleRecovery({ seed, work: 8, policy: "resume-from-snapshot", arm: "control" }).steps);
  assert.equal(block(report, "fixed-checked", "artifact-recovery").metrics.artifactMarginalEffectSteps, mean(recovery.map((steps, index) => (steps - control[index]!) * 1e6)));
  const quorum = seeds.map(seed => oracleQuorum({ seed, candidates: 4, reviewers: 3, steps: 12, budget: 20, gate: "authoritative", policy: "independent-test-first" }));
  assert.equal(block(report, "fixed-checked", "quorum-evidence").metrics.falsePositiveRate, mean(quorum.map(q => Math.round(q.falsePositives / 4 * 1e6))));
});

/** The independent exact-rational form of the correlation-adjusted calibration: 1 - mean |adjusted confidence - outcome| over commits, integers over 2 R^2. */
function oracleCalibrationMicro(seed: number, reviewers: number): number | null {
  const o = oracleQuorum({ seed, candidates: 4, reviewers, steps: 12, budget: 20, gate: "authoritative", policy: "independent-test-first" });
  if (o.commitEvidence.length === 0) return null;
  const denominator = 2 * reviewers * reviewers;
  let errorNumerator = 0;
  for (const c of o.commitEvidence) {
    const effective = c.correlated ? 1 : reviewers;
    const lean = (2 * c.approvals - reviewers) * effective;
    errorNumerator += c.good ? reviewers * reviewers - lean : reviewers * reviewers + lean;
  }
  return Math.round((1 - errorNumerator / (denominator * o.commitEvidence.length)) * 1e6);
}

test("correlation-adjusted calibration agrees with the per-seed oracle and is reported for quorum-evidence only", () => {
  const seeds = [5, 6, 7, 8, 9, 10, 11, 12];
  const report = evaluate(input({ entries: [{ configuration: fixedChecked, budget }], partition: { train: [1], holdOut: seeds } }));
  const known = seeds.map(seed => oracleCalibrationMicro(seed, 3)).filter((v): v is number => v !== null);
  assert.ok(known.length > 0);
  const expected = Math.round(known.reduce((a, b) => a + b, 0) / known.length);
  const metric = block(report, "fixed-checked", "quorum-evidence").metrics.correlationAdjustedCalibration;
  assert.equal(metric, expected);
  assert.ok(typeof metric === "number" && metric >= 0 && metric <= 1e6);
  for (const environment of report.configurations[0]!.environments.filter(e => e.environment !== "quorum-evidence")) {
    assert.equal("correlationAdjustedCalibration" in environment.metrics, false, environment.environment);
  }
});

test("correlation-adjusted calibration is the unknown literal when no seed commits anything", () => {
  const idle = { id: "idle", revision: "1", propose: (_observation: unknown, memory: number) => ({ intents: [], memory, trace: [] }) };
  const configuration = fixedConfiguration("idle-quorum", "1", { ...fixedBaseline.policies, quorum: idle as never });
  const report = evaluate(input({ entries: [{ configuration, budget }] }));
  assert.equal(block(report, "idle-quorum", "quorum-evidence").metrics.correlationAdjustedCalibration, "unknown");
});

test("a configuration that spends beyond the shared unit budget is flagged and its completion is not counted", () => {
  const tight = evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 14, units: 1 } }, { configuration: fifoConfig, budget: { steps: 14, units: 1 } }] }));
  const landing = block(tight, "restack-only", "landing-queue");
  assert.equal(landing.overBudget, holdOut.length);
  assert.equal(landing.validatedCompletion.meanMicro, 0);
  assert.equal(block(evaluate(input()), "restack-only", "landing-queue").overBudget, 0);
});

test("steps are capped by the shared budget and the all-success and all-fail groups are reported", () => {
  const capped = evaluate(input({ entries: [{ configuration: restackConfig, budget: { steps: 2, units: 200 } }] }));
  const landing = block(capped, "restack-only", "landing-queue");
  assert.ok(landing.p95Steps <= 2);
  assert.equal(landing.groups.allSuccess, 0, "two steps cannot land six candidates");
  assert.ok(landing.validatedCompletion.meanMicro < block(evaluate(input()), "restack-only", "landing-queue").validatedCompletion.meanMicro);
  const full = evaluate(input());
  for (const config of full.configurations) for (const env of config.environments) {
    assert.equal(env.groups.allSuccess + env.groups.allFail + env.groups.mixed, holdOut.length);
    assert.ok(env.p95Steps >= 1 && env.p95Steps <= budget.steps);
    assert.equal(Number.isInteger(env.costMicro) && Number.isInteger(env.completionPerSpendMicro), true);
  }
});

test("the report is deterministic, digest-pinned over its own content, integer-only and byte-identical to the committed fixture", () => {
  const report = evaluate(input());
  const again = evaluate(input());
  assert.equal(evaluationBytes(report), evaluationBytes(again));
  const { reportDigest, ...body } = report;
  assert.equal(reportDigest, digest(body));
  assert.notEqual(evaluate(input({ bootstrap: { seed: 12, resamples: 200 } })).reportDigest, reportDigest);
  assert.notEqual(evaluate(input({ partition: { train: trainSeeds, holdOut: holdOut.slice(1) } })).reportDigest, reportDigest);
  const walk = (value: unknown): void => {
    if (typeof value === "number") assert.ok(Number.isInteger(value), `non-integer ${value}`);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value !== null && typeof value === "object") Object.values(value).forEach(walk);
    else assert.notEqual(value, null);
  };
  walk(report);
  assert.equal(evaluationBytes(report), canonicalJson(report) + "\n");
  assert.equal(readFileSync(pinnedPath, "utf8"), evaluationBytes(pinnedReport()));
});

function pinnedReport(): EvaluationReport {
  return evaluate({
    entries: [{ configuration: fixedBaseline, budget }, { configuration: fixedChecked, budget }],
    scenario, partition: { train: trainSeeds, holdOut }, bootstrap: { seed: 11, resamples: 200 },
  });
}

test("bootstrap draws come from the declared seed only", () => {
  const draw = gateDraws(11);
  assert.equal(typeof draw(), "number");
  const a = evaluate(input({ bootstrap: { seed: 11, resamples: 200 } }));
  const b = evaluate(input({ bootstrap: { seed: 11, resamples: 200 } }));
  assert.deepEqual(a.comparisons, b.comparisons);
});

export type { EvaluationConfiguration, PolicySet };
