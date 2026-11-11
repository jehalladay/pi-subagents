import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateEpisodes, mixedEvaluationBytes, runLandingQueue, fifoLanding, restackFirst, toEpisode, digest, canonicalJson } from "../dist/index.js";
import type { Episode, EpisodeEvaluationEntry, EpisodeEvaluationInput, EvaluationBudget, MixedEvaluationReport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const pinnedPath = join(fixtureDir, "evaluation-mixed-mode.json");

const budget: EvaluationBudget = { steps: 12, units: 200 };
const pin = { agent: "agent-a", version: "1.0.0", seed: 7 };
const hashOf = (name: string): string => digest({ name });
const replayEpisode = JSON.parse(readFileSync(join(fixtureDir, "episode-replay-native-receipts.json"), "utf8")) as Episode;

const fixtureEpisodes = (policy: typeof fifoLanding, seeds: readonly number[], steps = 14): Episode[] =>
  seeds.map(seed => toEpisode(runLandingQueue({ seed, candidates: 6, lanes: 1, steps, policy })));
// A live-labelled episode in this suite is a test construct: the harness trusts the episode's own mode and certifies nothing either way.
const asLive = (episode: Episode, tag: string): Episode => ({ ...episode, mode: "live", episodeId: `live:${tag}:${episode.episodeId}` });

function entry(id: string, policy: typeof fifoLanding, over: Partial<EpisodeEvaluationEntry> = {}): EpisodeEvaluationEntry {
  // The reference runs the full 14 steps, the other configuration stops at 9: only the 12-step shared budget separates them.
  const fixtures = fixtureEpisodes(policy, [1, 2, 3], policy === fifoLanding ? 14 : 9);
  return {
    kind: "episodes", configuration: { id, revision: "1", configHash: hashOf(id) }, pin, budget,
    episodes: [
      ...fixtures.map(episode => ({ mode: "fixture", episode })),
      { mode: "replay", episode: replayEpisode },
      { mode: "live", episode: asLive(fixtures[0]!, id) },
      { mode: "live", episode: asLive(fixtures[1]!, id) },
    ],
    ...over,
  };
}

const input = (over: Partial<EpisodeEvaluationInput> = {}): EpisodeEvaluationInput => ({ entries: [entry("fifo", fifoLanding), entry("restack", restackFirst)], ...over });
const refusal = (fn: () => unknown, code: string): void => assert.throws(fn, (error: unknown) => error instanceof Error && error.message.startsWith(code + ":"));

test("a report labelled mw.evaluation.v1 carries the mode of every number and never certifies", () => {
  const report = evaluateEpisodes(input());
  assert.equal(report.schema, "mw.evaluation.v1");
  assert.deepEqual(report.modes, ["fixture", "replay", "live"]);
  assert.equal(report.certified, false);
  for (const batch of report.batches) {
    assert.deepEqual(batch.modes.map(block => [block.mode, block.n]), [["fixture", 3], ["replay", 1], ["live", 2]]);
    for (const block of batch.modes) assert.equal(block.certified, false, `${batch.id} ${block.mode} must not certify`);
    assert.deepEqual(batch.families, ["landing-queue", "native-replay"]);
  }
  for (const row of report.comparisons) assert.equal(row.certified, false);
  assert.equal(report.comparisons.length, 3, "one comparison per mode against the reference");
});

test("a fixture-derived episode labelled live or replay is refused, as is any label outside the closed enum", () => {
  const fixtures = fixtureEpisodes(fifoLanding, [1]);
  const withLabel = (mode: string, episode: Episode) => input({ entries: [entry("fifo", fifoLanding, { episodes: [{ mode, episode }] })] });
  refusal(() => evaluateEpisodes(withLabel("live", fixtures[0]!)), "EVALUATION_MODE_UPGRADE_FORBIDDEN");
  refusal(() => evaluateEpisodes(withLabel("replay", fixtures[0]!)), "EVALUATION_MODE_UPGRADE_FORBIDDEN");
  refusal(() => evaluateEpisodes(withLabel("live", replayEpisode)), "EVALUATION_MODE_UPGRADE_FORBIDDEN");
  refusal(() => evaluateEpisodes(withLabel("live-verified", asLive(fixtures[0]!, "x"))), "EVALUATION_MODE_UPGRADE_FORBIDDEN");
  const lowered = evaluateEpisodes(withLabel("fixture", asLive(fixtures[0]!, "x")));
  assert.deepEqual(lowered.batches[0]!.modes.map(block => block.mode), ["fixture"], "lowering a label is allowed and the number then carries the lower label");
});

test("only batches that match on task family, mode set, budget and agent/version/seed pin are compared", () => {
  const mismatch = (over: Partial<EpisodeEvaluationEntry>, field: string): void => {
    assert.throws(
      () => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding), entry("restack", restackFirst, over)] })),
      (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_BATCH_UNMATCHED:") && error.message.includes(field),
    );
  };
  mismatch({ budget: { steps: 14, units: 201 } }, "budget");
  mismatch({ pin: { ...pin, agent: "agent-b" } }, "agent/version/seed pin");
  mismatch({ pin: { ...pin, version: "1.0.1" } }, "agent/version/seed pin");
  mismatch({ pin: { ...pin, seed: 8 } }, "agent/version/seed pin");
  const only = entry("restack", restackFirst).episodes.filter(labelled => labelled.mode === "fixture");
  mismatch({ episodes: only }, "task family");
  const noLive = entry("restack", restackFirst).episodes.filter(labelled => labelled.mode !== "live");
  mismatch({ episodes: noLive }, "mode set");
});

test("replay and live blocks come only from episodes of that source mode, and the budget decides within-budget", () => {
  const report = evaluateEpisodes(input());
  const fifo = report.batches[0]!;
  const live = fifo.modes.find(block => block.mode === "live")!;
  const liveRefs = fifo.episodes.filter(ref => ref.mode === "live");
  assert.equal(liveRefs.length, live.n);
  assert.ok(liveRefs.every(ref => ref.episodeId.startsWith("live:")));
  const tight = evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 1, units: 200 } }), entry("restack", restackFirst, { budget: { steps: 1, units: 200 } })] }));
  assert.ok(tight.batches[0]!.modes.every(block => block.withinBudgetMicro < 1_000_000), "a 1-step budget leaves episodes over budget");
  const within = (batch: number, mode: string) => report.batches[batch]!.modes.find(block => block.mode === mode)!.withinBudgetMicro;
  assert.deepEqual([within(0, "fixture"), within(0, "replay"), within(0, "live")], [0, 1_000_000, 0], "the 14-step episodes overrun the 12-step budget");
  assert.deepEqual([within(1, "fixture"), within(1, "replay"), within(1, "live")], [1_000_000, 1_000_000, 1_000_000]);
  const deltas = Object.fromEntries(report.comparisons.map(row => [row.mode, [row.deltaWithinBudgetMicro, row.deltaMeanStepsMicro]]));
  assert.deepEqual(deltas, { fixture: [1_000_000, -5_000_000], replay: [0, 0], live: [1_000_000, -5_000_000] });
});

test("invalid inputs are refused with their own codes", () => {
  refusal(() => evaluateEpisodes({ entries: [] }), "EVALUATION_NO_CONFIGURATIONS");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding), entry("fifo", restackFirst)] })), "EVALUATION_DUPLICATE_CONFIGURATION");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 0, units: 200 } })] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { configuration: { id: "fifo", revision: "1", configHash: "nope" } })] })), "EVALUATION_CONFIG_HASH_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { pin: { agent: "", version: "1", seed: 1 } })] })), "EVALUATION_PIN_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { pin: { agent: "a", version: "1", seed: 1.5 } })] })), "EVALUATION_PIN_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { episodes: [] })] })), "EVALUATION_EPISODES_EMPTY");
  const bad = { ...fixtureEpisodes(fifoLanding, [1])[0]!, schema: "mw.episode.v2" } as unknown as Episode;
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { episodes: [{ mode: "fixture", episode: bad }] })] })), "EVALUATION_EPISODE_INVALID");
});

test("the report is deterministic, digest-pinned over its own content, integer-only and byte-identical to the committed mixed-mode fixture", () => {
  const report = evaluateEpisodes(input());
  assert.equal(mixedEvaluationBytes(report), mixedEvaluationBytes(evaluateEpisodes(input())));
  const { reportDigest, ...body } = report;
  assert.equal(reportDigest, digest(body));
  assert.equal(mixedEvaluationBytes(report), canonicalJson(report) + "\n");
  assert.equal(readFileSync(pinnedPath, "utf8"), mixedEvaluationBytes(report as MixedEvaluationReport));
});

const fixtureOnly = (seeds: readonly number[], over: Partial<EpisodeEvaluationEntry> = {}): EpisodeEvaluationEntry =>
  entry("fifo", fifoLanding, { episodes: fixtureEpisodes(fifoLanding, seeds).map(episode => ({ mode: "fixture", episode })), ...over });
const verdicts = (report: MixedEvaluationReport): number[] => report.batches[0]!.episodes.map(ref => ref.withinBudget);

test("the compute-unit bound decides within-budget even while the steps fit", () => {
  // Seed 7 spends 2 compute units and seed 1 spends 1 over 14 steps each: a 1-unit budget admits only the second although 20 steps fit both.
  const report = evaluateEpisodes({ entries: [fixtureOnly([7, 1], { budget: { steps: 20, units: 1 } })] });
  assert.deepEqual(report.batches[0]!.episodes.map(ref => ref.compute), [2, 1]);
  assert.deepEqual(verdicts(report), [0, 1]);
});

test("the step bound is inclusive: an episode using exactly budget.steps steps stays within budget", () => {
  const exact = evaluateEpisodes({ entries: [fixtureOnly([1, 2, 3], { budget: { steps: 14, units: 200 } })] });
  assert.deepEqual(exact.batches[0]!.episodes.map(ref => ref.steps), [14, 14, 14]);
  assert.deepEqual(verdicts(exact), [1, 1, 1]);
  const short = evaluateEpisodes({ entries: [fixtureOnly([1, 2, 3], { budget: { steps: 13, units: 200 } })] });
  assert.deepEqual(verdicts(short), [0, 0, 0], "one step below the usage tips every episode over budget");
});

test("task families are listed sorted, so a batch that lists the native-replay episode first still matches its reference", () => {
  const reference = entry("fifo", fifoLanding);
  const replayFirst = entry("restack", restackFirst, { episodes: [...entry("restack", restackFirst).episodes].sort((a, b) => (a.mode === "replay" ? -1 : 0) - (b.mode === "replay" ? -1 : 0)) });
  assert.equal(replayFirst.episodes[0]!.mode, "replay", "the construct really lists native-replay before landing-queue");
  const report = evaluateEpisodes({ entries: [reference, replayFirst] });
  assert.deepEqual(report.batches[1]!.families, ["landing-queue", "native-replay"]);
  assert.deepEqual(report.batches[0]!.families, report.batches[1]!.families);
  assert.equal(report.comparisons.length, 3, "the replay-first batch is compared, not refused as an unmatched task family");
});

test("an empty pinned version is refused", () => {
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { pin: { agent: "a", version: "", seed: 1 } })] })), "EVALUATION_PIN_INVALID");
});

test("a negative pinned seed is refused and seed 0 is admitted", () => {
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { pin: { agent: "a", version: "1", seed: -1 } })] })), "EVALUATION_PIN_INVALID");
  const zero = evaluateEpisodes({ entries: [entry("fifo", fifoLanding, { pin: { agent: "a", version: "1", seed: 0 } })] });
  assert.equal(zero.batches[0]!.pin.seed, 0);
});

test("an infinite pin seed is refused as an invalid pin on the episodes path", () => {
  // Infinity is not an integer and is not below zero, so only the integer clause refuses it as EVALUATION_PIN_INVALID; a floor-equality rewrite admits it and meets the report digest first (CANONICAL_JSON_UNSUPPORTED_VALUE).
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { pin: { agent: "a", version: "1", seed: Infinity } })] })), "EVALUATION_PIN_INVALID");
});

test("a zero-unit budget is refused as an invalid budget", () => {
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12, units: 0 } })] })), "EVALUATION_BUDGET_INVALID");
});

test("a fractional step budget or a fractional unit budget is refused as an invalid budget", () => {
  // Both fractions exceed 1, so only the integer clause refuses them; the lower bound alone would admit 12.5 steps and 200.5 units.
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12.5, units: 200 } })] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12, units: 200.5 } })] })), "EVALUATION_BUDGET_INVALID");
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12, units: 1.5 } })] })), "EVALUATION_BUDGET_INVALID");
  const integral = evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12, units: 200 } })] }));
  assert.deepEqual(integral.batches[0]!.budget, { steps: 12, units: 200 }, "the integral neighbour of each refused fraction is admitted");
});

test("an infinite step budget is refused as an invalid budget on the episodes path", () => {
  // Infinity is whole under Math.floor(x) === x and exceeds 1, so only Number.isInteger refuses it; a rewrite would pass it on to reportDigest and surface CANONICAL_JSON_UNSUPPORTED_VALUE instead.
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: Infinity, units: 200 } })] })), "EVALUATION_BUDGET_INVALID");
});

test("an infinite unit budget is refused as an invalid budget on the episodes path", () => {
  // Infinity is whole under Math.floor(x) === x and exceeds 1, so only Number.isInteger on the units clause refuses it; a floor-equality rewrite of that clause admits it and meets the report digest first (CANONICAL_JSON_UNSUPPORTED_VALUE).
  refusal(() => evaluateEpisodes(input({ entries: [entry("fifo", fifoLanding, { budget: { steps: 12, units: Infinity } })] })), "EVALUATION_BUDGET_INVALID");
});
