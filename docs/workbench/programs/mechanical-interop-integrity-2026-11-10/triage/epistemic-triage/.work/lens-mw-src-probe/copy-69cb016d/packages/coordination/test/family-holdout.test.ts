// MechanicalWorkflows-5ci8 (TW-EAT-R007): family-level hold-out for the evaluation harness.
// A harness configured with held-out families evaluates ONLY episodes of those families, and
// requesting training/selection input drawn from a held-out family is refused by name.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { digest, evaluateHeldOutFamilies, drawTrainingFamily, familyHoldOut, runLandingQueue,
  fifoLanding, restackFirst, toEpisode, trainingEpisodes } from "../dist/index.js";
import type { Episode, EpisodeEvaluationEntry, EpisodeEvaluationInput, EvaluationBudget, LabelledEpisode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const budget: EvaluationBudget = { steps: 60, units: 2000 };
const pin = { agent: "agent-a", version: "1.0.0", seed: 7 };
const hashOf = (name: string): string => digest({ name });
const quorum = JSON.parse(readFileSync(join(fixtureDir, "episode-quorum-evidence-independent-seed7.json"), "utf8")) as Episode;
const recovery = JSON.parse(readFileSync(join(fixtureDir, "episode-artifact-recovery-seed7.json"), "utf8")) as Episode;

const landing = (policy: typeof fifoLanding, seeds: readonly number[]): Episode[] =>
  seeds.map(seed => toEpisode(runLandingQueue({ seed, candidates: 6, lanes: 1, steps: 14, policy })));
const labelled = (policy: typeof fifoLanding): LabelledEpisode[] => [
  ...landing(policy, [1, 2]).map(episode => ({ mode: "fixture", episode })),
  { mode: "fixture", episode: quorum },
];
const entry = (id: string, policy: typeof fifoLanding, episodes: LabelledEpisode[] = labelled(policy)): EpisodeEvaluationEntry =>
  ({ kind: "episodes", configuration: { id, revision: "1", configHash: hashOf(id) }, pin, budget, episodes });
const input = (): EpisodeEvaluationInput => ({ entries: [entry("fifo", fifoLanding), entry("restack", restackFirst)] });
const refusal = (fn: () => unknown, code: string): void => assert.throws(fn, (error: unknown) => error instanceof Error && error.message.startsWith(code + ":"));

test("a harness configured with a held-out family evaluates only episodes of that family", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  const report = evaluateHeldOutFamilies(holdOut, input());
  assert.equal(report.schema, "mw.evaluation.v1");
  for (const batch of report.batches) {
    assert.deepEqual(batch.families, ["quorum-evidence"], batch.id);
    for (const ref of batch.episodes) assert.equal(ref.family, "quorum-evidence", batch.id);
  }
});

test("requesting training/selection input drawn from a held-out family is refused by name", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  refusal(() => drawTrainingFamily(holdOut, labelled(fifoLanding), "quorum-evidence"), "EVALUATION_FAMILY_HELD_OUT");
});

test("training selection excludes every held-out family and a permitted draw returns only its family", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  const episodes = labelled(fifoLanding);
  const training = trainingEpisodes(holdOut, episodes);
  assert.ok(training.length > 0);
  for (const row of training) assert.notEqual(row.episode.task.family, "quorum-evidence");
  const drawn = drawTrainingFamily(holdOut, episodes, "landing-queue");
  assert.ok(drawn.length > 0);
  for (const row of drawn) assert.equal(row.episode.task.family, "landing-queue");
});

test("a hold-out that leaves an entry with no matching episodes refuses by name, never evaluating an empty batch", () => {
  const holdOut = familyHoldOut(["artifact-recovery"]);
  refusal(() => evaluateHeldOutFamilies(holdOut, input()), "EVALUATION_HOLDOUT_EMPTY");
});

test("an empty, blank or duplicated hold-out list is refused as invalid", () => {
  refusal(() => familyHoldOut([]), "EVALUATION_HOLDOUT_INVALID");
  refusal(() => familyHoldOut([" "]), "EVALUATION_HOLDOUT_INVALID");
  refusal(() => familyHoldOut(["quorum-evidence", "quorum-evidence"]), "EVALUATION_HOLDOUT_INVALID");
});

// MechanicalWorkflows-9zoh: seven laws of family-holdout.ts the five tests above left unpinned.
const familiesOf = (rows: readonly LabelledEpisode[]): string[] => rows.map(row => row.episode.task.family);
const threeFamilies = (): LabelledEpisode[] => [...labelled(fifoLanding), { mode: "fixture", episode: recovery }];

test("9zoh S1: the declared hold-out list is a sorted copy, whatever order the caller names the families in", () => {
  assert.deepEqual(familyHoldOut(["b-fam", "a-fam"]).heldOut, ["a-fam", "b-fam"]);
  assert.deepEqual(familyHoldOut(["quorum-evidence", "artifact-recovery"]).heldOut, ["artifact-recovery", "quorum-evidence"]);
});

test("9zoh S2: a two-family hold-out trains on the third family, refuses both held-out draws and evaluates both families", () => {
  const holdOut = familyHoldOut(["quorum-evidence", "artifact-recovery"]);
  const episodes = threeFamilies();
  assert.deepEqual(new Set(familiesOf(episodes)), new Set(["landing-queue", "quorum-evidence", "artifact-recovery"]));
  const training = trainingEpisodes(holdOut, episodes);
  assert.equal(training.length, 2);
  assert.deepEqual([...new Set(familiesOf(training))], ["landing-queue"]);
  refusal(() => drawTrainingFamily(holdOut, episodes, "quorum-evidence"), "EVALUATION_FAMILY_HELD_OUT");
  refusal(() => drawTrainingFamily(holdOut, episodes, "artifact-recovery"), "EVALUATION_FAMILY_HELD_OUT");
  const report = evaluateHeldOutFamilies(holdOut, { entries: [entry("fifo", fifoLanding, threeFamilies())] });
  assert.deepEqual(report.batches.map(batch => batch.families), [["artifact-recovery", "quorum-evidence"]]);
  assert.deepEqual(report.batches[0]!.episodes.map(ref => ref.family).sort(), ["artifact-recovery", "quorum-evidence"]);
});

test("9zoh S3: a permitted draw returns exactly the requested family when two families stay in training", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  const episodes = threeFamilies();
  const training = trainingEpisodes(holdOut, episodes);
  assert.deepEqual([...new Set(familiesOf(training))].sort(), ["artifact-recovery", "landing-queue"]);
  const drawn = drawTrainingFamily(holdOut, episodes, "landing-queue");
  assert.equal(drawn.length, 2);
  assert.deepEqual(familiesOf(drawn), ["landing-queue", "landing-queue"]);
  assert.deepEqual(familiesOf(drawTrainingFamily(holdOut, episodes, "artifact-recovery")), ["artifact-recovery"]);
});

test("9zoh S4: an empty-string family name is refused as invalid", () => {
  refusal(() => familyHoldOut([""]), "EVALUATION_HOLDOUT_INVALID");
  refusal(() => familyHoldOut(["quorum-evidence", ""]), "EVALUATION_HOLDOUT_INVALID");
});

test("9zoh S5: hold-out matching is exact, so a strict prefix of a family name keeps the longer family in training", () => {
  const holdOut = familyHoldOut(["landing"]);
  const episodes = labelled(fifoLanding);
  assert.equal(trainingEpisodes(holdOut, episodes).length, episodes.length);
  assert.equal(drawTrainingFamily(holdOut, episodes, "landing-queue").length, 2);
  refusal(() => evaluateHeldOutFamilies(holdOut, input()), "EVALUATION_HOLDOUT_EMPTY");
});

test("9zoh S6: a duplicate family name is refused even when the two copies are not adjacent", () => {
  refusal(() => familyHoldOut(["a-fam", "b-fam", "a-fam"]), "EVALUATION_HOLDOUT_INVALID");
});

test("9zoh S7: the empty-evaluation refusal names the entry that lacks a held-out family, not an entry that has one", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  const second: EpisodeEvaluationEntry = entry("restack", restackFirst, landing(restackFirst, [1, 2]).map(episode => ({ mode: "fixture", episode })));
  assert.throws(
    () => evaluateHeldOutFamilies(holdOut, { entries: [entry("fifo", fifoLanding), second] }),
    (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_HOLDOUT_EMPTY:") && error.message.includes("restack carries no episode") && !error.message.includes("fifo"),
  );
});

// MechanicalWorkflows-rddc: three laws of family-holdout.ts the twelve tests above left unpinned (R4, R7, R9).
test("rddc R4: the empty-evaluation refusal names the failing entry even when a later entry carries a held-out family", () => {
  const holdOut = familyHoldOut(["quorum-evidence"]);
  const middle: EpisodeEvaluationEntry = entry("restack", restackFirst, landing(restackFirst, [1, 2]).map(episode => ({ mode: "fixture", episode })));
  const last = entry("third", fifoLanding);
  assert.throws(
    () => evaluateHeldOutFamilies(holdOut, { entries: [entry("fifo", fifoLanding), middle, last] }),
    (error: unknown) => error instanceof Error && error.message.startsWith("EVALUATION_HOLDOUT_EMPTY:") && error.message.includes("restack carries no episode") && !error.message.includes("fifo") && !error.message.includes("third"),
  );
});

test("rddc R7: hold-out membership is exact, so a held-out longer name never swallows a shorter family it starts with", () => {
  const holdOut = familyHoldOut(["landing-queue"]);
  const shortFamily: LabelledEpisode = { mode: "fixture", episode: { ...quorum, task: { ...quorum.task, family: "landing" } } };
  const episodes = [...labelled(fifoLanding), shortFamily];
  assert.deepEqual(new Set(familiesOf(episodes)), new Set(["landing-queue", "quorum-evidence", "landing"]));
  const training = trainingEpisodes(holdOut, episodes);
  assert.deepEqual(familiesOf(training).sort(), ["landing", "quorum-evidence"]);
  const drawn = drawTrainingFamily(holdOut, episodes, "landing");
  assert.equal(drawn.length, 1);
  assert.deepEqual(familiesOf(drawn), ["landing"]);
  refusal(() => drawTrainingFamily(holdOut, episodes, "landing-queue"), "EVALUATION_FAMILY_HELD_OUT");
});

test("rddc R9: declaring a hold-out leaves the caller's array untouched and returns a distinct sorted copy", () => {
  const names = ["b-fam", "a-fam"];
  const holdOut = familyHoldOut(names);
  assert.deepEqual(names, ["b-fam", "a-fam"]);
  assert.notEqual(holdOut.heldOut, names);
  assert.deepEqual(holdOut.heldOut, ["a-fam", "b-fam"]);
});
