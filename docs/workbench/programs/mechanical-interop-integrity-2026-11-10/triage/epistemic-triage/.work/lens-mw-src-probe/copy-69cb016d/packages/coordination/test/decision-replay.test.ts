import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  recordDecisions, replayDecisions, episodeBytes, labelEpisodeMode, canonicalJson, digest,
  restackFirst, provenanceChecked, receiptChecked, resumeFromSnapshot, independentTestFirst,
} from "../dist/index.js";
import type { DecisionTape, DecisionRecording, Episode } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");
const readFixture = (name: string): string => readFileSync(join(fixtureDir, name), "utf8");

/** One row per environment: the recording that reproduces its committed seed fixture, the committed episode beside it. */
const rows: readonly { readonly name: string; readonly recording: DecisionRecording; readonly source: string; readonly exported: string }[] = [
  { name: "landing-queue", recording: { environment: "landing-queue", run: { seed: 7, candidates: 4, lanes: 1, steps: 12 }, policy: restackFirst }, source: "landing-queue-seed7.json", exported: "episode-landing-queue-seed7.json" },
  { name: "compaction-inheritance", recording: { environment: "compaction-inheritance", run: { seed: 7, tasks: 8 }, policy: provenanceChecked }, source: "compaction-inheritance-seed7.json", exported: "episode-compaction-inheritance-seed7.json" },
  { name: "colony-resilience", recording: { environment: "colony-resilience", run: { seed: 29, workers: 4, compute: 4, steps: 16 }, policy: receiptChecked }, source: "colony-resilience-seed29.json", exported: "episode-colony-resilience-seed29.json" },
  { name: "artifact-recovery", recording: { environment: "artifact-recovery", run: { seed: 7, work: 10, steps: 14, arm: "treatment" }, policy: resumeFromSnapshot }, source: "artifact-recovery-seed7.json", exported: "episode-artifact-recovery-seed7.json" },
  { name: "quorum-evidence", recording: { environment: "quorum-evidence", run: { seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "authoritative" }, policy: independentTestFirst }, source: "quorum-evidence-independent-seed7.json", exported: "episode-quorum-evidence-independent-seed7.json" },
];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const landing = (): DecisionTape => recordDecisions(rows[0]!.recording);

test("every committed seed fixture re-executes from its recorded intent sequence with identical checkpoints, replay-labelled", () => {
  for (const row of rows) {
    const tape = recordDecisions(row.recording);
    const source = JSON.parse(readFixture(row.source)) as { readonly steps: readonly { readonly proposed: readonly string[]; readonly stateHash: string }[]; readonly finalHash: string };
    const committed = JSON.parse(readFixture(row.exported)) as Episode;
    assert.deepEqual(tape.steps.map(step => step.intents.map(intent => intent.intentId)), source.steps.map(step => step.proposed), `${row.name}: recorded intent sequence`);
    assert.deepEqual(tape.steps.map(step => step.stateHash), source.steps.map(step => step.stateHash), `${row.name}: recorded state hashes`);
    const result = replayDecisions(row.name as DecisionTape["environment"], tape);
    assert.equal(result.divergence, null, row.name);
    assert.equal(result.mode, "replay");
    assert.deepEqual(result.episode.checkpoints, committed.checkpoints, `${row.name}: checkpoints equal the committed fixture`);
    assert.equal(result.episode.checkpoints.at(-1), source.finalHash);
    assert.equal(result.episode.mode, "replay");
    assert.equal(result.episode.verifier.label, "replay");
    assert.equal(result.episode.verifier.receiptDigest, digest(tape));
    assert.equal(result.episode.environment, row.name);
    assert.ok(result.episode.episodeId.startsWith("replay:"), result.episode.episodeId);
    assert.deepEqual(result.episode.decisions.map(d => d.proposed), source.steps.map(step => step.proposed));
  }
});

test("a divergent tape yields REPLAY_DECISION_DIVERGED naming the first diverging step, not a later one", () => {
  const tape = clone(landing());
  const target = tape.steps.findIndex(step => step.intents.length > 0 && step.step >= 3);
  assert.ok(target >= 0);
  const intents = tape.steps[target]!.intents;
  const mutated = { ...tape, steps: tape.steps.map((step, index) => index === target ? { ...step, intents: [] } : index > target + 1 ? { ...step, stateHash: "sha256:" + "0".repeat(64) } : step) } as DecisionTape;
  assert.ok(intents.length > 0);
  const result = replayDecisions("landing-queue", mutated);
  assert.equal(result.divergence?.code, "REPLAY_DECISION_DIVERGED");
  assert.equal(result.divergence?.step, tape.steps[target]!.step);
  assert.match(result.divergence?.detail ?? "", new RegExp(`step ${tape.steps[target]!.step}\\b`));
  assert.equal(result.episode.mode, "replay");
  assert.equal(result.episode.verifier.verdict, `diverged@${tape.steps[target]!.step}`);
});

test("a recorded state hash that disagrees names the step and the checkpoint field; recorded admitted ids that disagree name the admitted field", () => {
  const tape = clone(landing());
  const bad = { ...tape, steps: tape.steps.map((step, index) => index === 4 ? { ...step, stateHash: "sha256:" + "1".repeat(64) } : step) } as DecisionTape;
  const hash = replayDecisions("landing-queue", bad).divergence;
  assert.equal(hash?.code, "REPLAY_DECISION_DIVERGED");
  assert.equal(hash?.step, tape.steps[4]!.step);
  assert.equal(hash?.field, "checkpoint");
  const admitted = { ...tape, steps: tape.steps.map((step, index) => index === 2 ? { ...step, admitted: [...step.admitted, "ghost"] } : step) } as DecisionTape;
  const ids = replayDecisions("landing-queue", admitted).divergence;
  assert.equal(ids?.step, tape.steps[2]!.step);
  assert.equal(ids?.field, "admitted");
  const observed = { ...tape, steps: tape.steps.map((step, index) => index === 1 ? { ...step, observationDigest: "sha256:" + "2".repeat(64) } : step) } as DecisionTape;
  assert.equal(replayDecisions("landing-queue", observed).divergence?.field, "observation");
  const first = { ...tape, steps: tape.steps.map((step, index) => index === 0 ? { ...step, observationDigest: "sha256:" + "3".repeat(64) } : step) } as DecisionTape;
  assert.deepEqual([replayDecisions("landing-queue", first).divergence?.step, replayDecisions("landing-queue", first).divergence?.field], [tape.steps[0]!.step, "observation"]);
});

test("a tape that stops before the run does diverges at the first missing step with field length", () => {
  const tape = clone(landing());
  const short = { ...tape, steps: tape.steps.slice(0, 5) } as DecisionTape;
  const result = replayDecisions("landing-queue", short);
  assert.equal(result.divergence?.code, "REPLAY_DECISION_DIVERGED");
  assert.equal(result.divergence?.field, "length");
  assert.equal(result.divergence?.step, 6);
});

test("an unsupported tape fails closed with REPLAY_DECISION_TAPE_UNSUPPORTED", () => {
  const tape = clone(landing());
  const refused = (value: unknown, environment: string = "landing-queue"): void =>
    assert.throws(() => replayDecisions(environment as DecisionTape["environment"], value as DecisionTape), /^Error: REPLAY_DECISION_TAPE_UNSUPPORTED: /);
  refused({ ...tape, schema: "mw.decision-tape.v2" });
  refused({ ...tape, environment: "nowhere" }, "nowhere");
  refused(tape, "quorum-evidence");
  refused({ ...tape, run: { seed: 7 } });
  refused({ ...tape, run: { ...tape.run, extra: 1 } });
  refused({ ...tape, run: { ...tape.run, steps: 1.5 } });
  refused({ ...tape, steps: "none" });
  refused({ ...tape, steps: [{ step: 1 }] });
  refused(null);
  refused({ ...clone(recordDecisions(rows[3]!.recording)), run: { seed: 7, work: 10, steps: 14, arm: "sideways" } }, "artifact-recovery");
  refused({ ...clone(recordDecisions(rows[4]!.recording)), run: { seed: 7, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate: "open" } }, "quorum-evidence");
});

test("replay is deterministic, never alters its tape, and the replay label cannot be upgraded to live", () => {
  const tape = landing();
  const frozen = JSON.stringify(tape);
  const a = replayDecisions("landing-queue", tape);
  const b = replayDecisions("landing-queue", clone(tape));
  assert.equal(episodeBytes(a.episode), episodeBytes(b.episode));
  assert.equal(JSON.stringify(tape), frozen);
  assert.throws(() => labelEpisodeMode(a.episode, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelEpisodeMode(a.episode, "live-verified"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.equal(labelEpisodeMode(a.episode, "replay").mode, "replay");
  assert.equal(labelEpisodeMode(a.episode, "fixture").mode, "fixture");
});

test("recording twice gives byte-identical tapes and the tape is pure JSON", () => {
  for (const row of rows) {
    const one = recordDecisions(row.recording);
    assert.equal(canonicalJson(one), canonicalJson(recordDecisions(row.recording)));
    assert.equal(canonicalJson(JSON.parse(JSON.stringify(one))), canonicalJson(one));
    assert.equal(one.schema, "mw.decision-tape.v1");
  }
});

test("the committed decision tape and its replay episode are canonical and equal the regenerated bytes", () => {
  const rawTape = readFixture("decision-tape-landing-queue-seed7.json");
  const rawEpisode = readFixture("episode-decision-replay-landing-queue-seed7.json");
  const tape = JSON.parse(rawTape) as DecisionTape;
  assert.equal(rawTape, canonicalJson(tape) + "\n");
  assert.equal(rawTape, canonicalJson(landing()) + "\n");
  const result = replayDecisions("landing-queue", tape);
  assert.equal(result.divergence, null);
  assert.equal(episodeBytes(result.episode), rawEpisode);
});

test("decision-replay.ts is pure: it imports only sibling coordination modules and holds no effect surface", () => {
  const code = readFileSync(join(here, "../src/decision-replay.ts"), "utf8");
  const specifiers = [...code.matchAll(/from "([^"]+)"/g)].map(match => match[1]!);
  assert.ok(specifiers.length > 0);
  for (const specifier of specifiers) assert.match(specifier, /^\.\/[a-z-]+\.js$/, specifier);
  for (const token of ["node:", "require(", "import(", "process.", "fs.", "child_process", "Date.now", "new Date", "Math.random", "fetch(", "setTimeout", "await ", "async "]) assert.equal(code.includes(token), false, token);
});

test("a tape whose steps are content-identical but renumbered diverges on field step at the first renumbered tape step (MechanicalWorkflows-mz5s)", () => {
  const tape = clone(landing());
  assert.ok(tape.steps.length >= 4);
  const swapped = { ...tape, steps: tape.steps.map((step, index) => index === 1 ? { ...step, step: tape.steps[2]!.step } : index === 2 ? { ...step, step: tape.steps[1]!.step } : step) } as DecisionTape;
  const result = replayDecisions("landing-queue", swapped);
  assert.equal(result.divergence?.code, "REPLAY_DECISION_DIVERGED");
  assert.equal(result.divergence?.field, "step");
  assert.equal(result.divergence?.step, tape.steps[2]!.step);
  assert.match(result.divergence?.detail ?? "", /step recorded 3 but re-execution reached 2/);
  assert.equal(result.episode.verifier.verdict, `diverged@${tape.steps[2]!.step}`);
  assert.equal(replayDecisions("landing-queue", tape).divergence, null);
});

test("a tape with a step-numbering gap, or one that does not start at step 1, diverges on field step at the first mismatched tape step instead of replaying clean (mz5s)", () => {
  const tape = clone(landing());
  const gap = { ...tape, steps: tape.steps.map((step, index) => index >= 2 ? { ...step, step: step.step + 1 } : step) } as DecisionTape;
  const gapped = replayDecisions("landing-queue", gap).divergence;
  assert.equal(gapped?.field, "step");
  assert.equal(gapped?.step, tape.steps[2]!.step + 1);
  assert.match(gapped?.detail ?? "", /step recorded 4 but re-execution reached 3/);
  const shifted = { ...tape, steps: tape.steps.map(step => ({ ...step, step: step.step + 1 })) } as DecisionTape;
  const offset = replayDecisions("landing-queue", shifted).divergence;
  assert.equal(offset?.field, "step");
  assert.equal(offset?.step, 2);
  const lateObservation = { ...tape, steps: tape.steps.map((step, index) => index === 3 ? { ...step, step: step.step + 5, observationDigest: "sha256:" + "4".repeat(64) } : step) } as DecisionTape;
  assert.equal(replayDecisions("landing-queue", lateObservation).divergence?.field, "step");
});

test("a landing tape relabelled for another environment is refused as REPLAY_DECISION_TAPE_UNSUPPORTED naming both environments even though its run parameters fit landing-queue (MechanicalWorkflows-ralu)", () => {
  const tape = clone(landing());
  const others = ["quorum-evidence", "compaction-inheritance", "colony-resilience", "artifact-recovery"] as const;
  for (const label of others) {
    const relabelled = { ...tape, environment: label } as DecisionTape;
    assert.throws(
      () => replayDecisions("landing-queue", relabelled),
      new RegExp(`^Error: REPLAY_DECISION_TAPE_UNSUPPORTED: tape is for ${label}, not landing-queue$`),
      `relabelled ${label}`,
    );
  }
  assert.equal(replayDecisions("landing-queue", tape).divergence, null);
});

test("a tape without a string policy id and revision fails closed with REPLAY_DECISION_TAPE_UNSUPPORTED, never replayed and never a crash (MechanicalWorkflows-ralu)", () => {
  const tape = clone(landing());
  const policy = tape.policy;
  const cases: readonly { readonly name: string; readonly policy: unknown }[] = [
    { name: "policy null", policy: null },
    { name: "policy empty object", policy: {} },
    { name: "policy id alone", policy: { id: policy.id } },
    { name: "policy revision alone", policy: { revision: policy.revision } },
    { name: "policy id not a string", policy: { id: 1, revision: policy.revision } },
    { name: "policy revision not a string", policy: { id: policy.id, revision: 2 } },
  ];
  for (const row of cases) {
    assert.throws(
      () => replayDecisions("landing-queue", { ...tape, policy: row.policy } as DecisionTape),
      /^Error: REPLAY_DECISION_TAPE_UNSUPPORTED: tape lacks a policy id and revision$/,
      row.name,
    );
  }
  assert.equal(replayDecisions("landing-queue", { ...tape, policy: { id: policy.id, revision: policy.revision } }).divergence, null);
});

test("a tape numbered below the re-execution, whether from 0 or with a repeated step number, diverges on field step at the first mismatched tape step (MechanicalWorkflows-hp0y)", () => {
  const tape = clone(landing());
  assert.ok(tape.steps.length >= 4);
  const zeroBased = { ...tape, steps: tape.steps.map(step => ({ ...step, step: step.step - 1 })) } as DecisionTape;
  const first = replayDecisions("landing-queue", zeroBased);
  assert.equal(first.divergence?.code, "REPLAY_DECISION_DIVERGED");
  assert.equal(first.divergence?.field, "step");
  assert.equal(first.divergence?.step, 0);
  assert.match(first.divergence?.detail ?? "", /step recorded 0 but re-execution reached 1/);
  assert.equal(first.episode.verifier.verdict, "diverged@0");
  const repeated = { ...tape, steps: tape.steps.map((step, index) => index >= 2 ? { ...step, step: step.step - 1 } : step) } as DecisionTape;
  const second = replayDecisions("landing-queue", repeated);
  assert.equal(second.divergence?.field, "step");
  assert.equal(second.divergence?.step, tape.steps[2]!.step - 1);
  assert.match(second.divergence?.detail ?? "", /step recorded 2 but re-execution reached 3/);
  assert.equal(second.episode.verifier.verdict, `diverged@${tape.steps[2]!.step - 1}`);
  assert.equal(replayDecisions("landing-queue", tape).divergence, null);
});

test("a tape whose first step number is not an integer is refused as REPLAY_DECISION_TAPE_UNSUPPORTED instead of returning a step divergence (MechanicalWorkflows-hp0y)", () => {
  const tape = clone(landing());
  for (const value of [1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    const bent = { ...tape, steps: tape.steps.map((step, index) => index === 0 ? { ...step, step: value } : step) } as DecisionTape;
    assert.throws(
      () => replayDecisions("landing-queue", bent),
      /^Error: REPLAY_DECISION_TAPE_UNSUPPORTED: tape step lacks step, observationDigest, intents, admitted or stateHash$/,
      `step ${String(value)}`,
    );
  }
  assert.equal(replayDecisions("landing-queue", tape).divergence, null);
});
