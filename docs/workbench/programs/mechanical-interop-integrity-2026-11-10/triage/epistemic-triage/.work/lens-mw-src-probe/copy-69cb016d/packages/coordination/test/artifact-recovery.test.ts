import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runArtifactRecovery, restartFromScratch, resumeFromSnapshot, oracleRecovery, recoveryStateHash, labelRecoveryEpisode, artifactProvenance, canonicalJson, digest } from "../dist/index.js";
import type { RecoveryObservation, RecoveryEpisode, RecoveryState, Intent } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../../../qa/integration/python-consumer/fixtures/artifact-recovery-seed7.json");
const base = { seed: 7, work: 10, steps: 14 };

test("the producer crashes at the seeded step and leaves its partial artifact: kept in the treatment arm, recorded then removed in the control arm", () => {
  const treatment = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  const control = runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot });
  const crash = treatment.final.crashStep;
  assert.ok(crash >= 3 && crash <= base.work - 1, `crash step ${crash}`);
  assert.equal(control.final.crashStep, crash, "the crash step depends on the seed, not on the arm");
  const producer = treatment.final.attempts[0]!;
  assert.deepEqual({ id: producer.id, parent: producer.parent, outcome: producer.outcome, progress: producer.progress }, { id: "a1", parent: null, outcome: "crashed", progress: crash - 1 });
  const crashed = treatment.final.events.filter(event => event.kind === "crashed");
  assert.equal(crashed.length, 1);
  assert.equal(crashed[0]!.attempt, "a1");
  assert.match(crashed[0]!.detail, new RegExp(`step ${crash}\\b`));
  assert.equal(treatment.final.artifact?.progress, crash - 1);
  assert.equal(treatment.final.artifact?.producer, "a1");
  assert.ok(treatment.final.events.some(event => event.kind === "artifact-created"));
  assert.equal(control.final.artifact, null);
  assert.ok(control.final.events.some(event => event.kind === "artifact-created"));
  assert.ok(control.final.events.some(event => event.kind === "artifact-removed"));
  assert.ok(!treatment.final.events.some(event => event.kind === "artifact-removed"));
});

test("the intervention is recorded as a control or treatment id, drawn from the seed unless forced, and the forced id is the one recorded", () => {
  const forced = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.deepEqual(forced.intervention, { arm: "treatment", id: "treatment:artifact-kept" });
  assert.deepEqual(runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot }).intervention, { arm: "control", id: "control:artifact-removed" });
  const arms = new Set<string>();
  for (let seed = 1; seed <= 12; seed += 1) {
    const episode = runArtifactRecovery({ seed, work: 10, steps: 14, policy: resumeFromSnapshot });
    arms.add(episode.intervention.arm);
    assert.equal(episode.intervention.arm, oracleRecovery({ seed, work: 10, policy: "resume-from-snapshot" }).arm);
    assert.equal(episode.final.intervention.id, episode.intervention.id);
  }
  assert.deepEqual([...arms].sort(), ["control", "treatment"], "twelve seeds never exercised both arms");
});

test("resumeFromSnapshot completes in fewer steps with the artifact (treatment) than without it (control), and the independent oracle agrees on both", () => {
  const treatment = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  const control = runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot });
  assert.ok(treatment.final.completedAtStep !== null && control.final.completedAtStep !== null);
  assert.ok(treatment.final.completedAtStep! < control.final.completedAtStep!, `${treatment.final.completedAtStep} vs ${control.final.completedAtStep}`);
  const oracleTreatment = oracleRecovery({ seed: 7, work: 10, arm: "treatment", policy: "resume-from-snapshot" });
  const oracleControl = oracleRecovery({ seed: 7, work: 10, arm: "control", policy: "resume-from-snapshot" });
  assert.equal(treatment.final.completedAtStep, oracleTreatment.steps);
  assert.equal(control.final.completedAtStep, oracleControl.steps);
  assert.equal(treatment.final.crashStep, oracleTreatment.crashStep);
  assert.equal(treatment.final.attempts[1]!.outcome, "completed");
  assert.ok(control.final.events.some(event => event.kind === "artifact-unavailable" && /absent/.test(event.detail)));
});

test("restartFromScratch ignores the artifact and pays the full cost in both arms, matching the oracle", () => {
  for (const arm of ["treatment", "control"] as const) {
    const episode = runArtifactRecovery({ ...base, arm, policy: restartFromScratch });
    assert.equal(episode.final.completedAtStep, base.work, arm);
    assert.equal(oracleRecovery({ seed: 7, work: base.work, arm, policy: "restart-from-scratch" }).steps, base.work);
    assert.deepEqual(episode.final.attempts[1]!.consumed, []);
    assert.ok(!episode.final.events.some(event => event.kind === "artifact-consumed"));
  }
});

test("attempt lineage links the successor to the producer, and the consumption event and the successor name the artifact digest", () => {
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  const [producer, successor] = episode.final.attempts;
  assert.equal(successor!.id, "a2");
  assert.equal(successor!.parent, producer!.id);
  const artifact = episode.final.artifact!;
  assert.equal(artifact.digest, artifactProvenance({ id: artifact.id, producer: artifact.producer, progress: artifact.progress }));
  assert.deepEqual(successor!.consumed, [{ artifactId: artifact.id, digest: artifact.digest }]);
  const consumed = episode.final.events.filter(event => event.kind === "artifact-consumed");
  assert.equal(consumed.length, 1);
  assert.equal(consumed[0]!.attempt, "a2");
  assert.ok(consumed[0]!.detail.includes(artifact.digest));
  const created = episode.final.events.find(event => event.kind === "artifact-created")!;
  assert.ok(created.detail.includes(artifact.digest));
});

test("an artifact whose provenance digest does not match is never consumed: the policy records artifact-unavailable and restarts, and the environment refuses a trusting policy with an artifact-refused event", () => {
  const policyRun = runArtifactRecovery({ ...base, arm: "treatment", corruptArtifact: true, policy: resumeFromSnapshot });
  assert.equal(policyRun.final.completedAtStep, base.work);
  assert.ok(policyRun.final.events.some(event => event.kind === "artifact-unavailable" && /digest-mismatch/.test(event.detail)));
  assert.deepEqual(policyRun.final.attempts[1]!.consumed, []);
  assert.equal(oracleRecovery({ seed: 7, work: base.work, arm: "treatment", corruptArtifact: true, policy: "resume-from-snapshot" }).steps, base.work);
  // A policy that consumes without checking: the environment is the authority and refuses.
  const trusting = { id: "trusting-resume", revision: "t-1", propose: (observation: RecoveryObservation, memory: number) => ({
    intents: observation.completed ? [] : [intentFor(observation, memory === 0 ? "consume-artifact" : "work")], memory: memory + 1, trace: [] }) };
  const refused = runArtifactRecovery({ ...base, arm: "treatment", corruptArtifact: true, policy: trusting });
  assert.ok(refused.final.events.some(event => event.kind === "artifact-refused" && /digest/.test(event.detail)));
  assert.deepEqual(refused.final.attempts[1]!.consumed, []);
  assert.equal(refused.final.completedAtStep, base.work + 1, "the refused consumption still costs its step");
  // With no artifact at all the environment refuses a consumption the same way.
  const absent = runArtifactRecovery({ ...base, arm: "control", policy: trusting });
  assert.ok(absent.final.events.some(event => event.kind === "artifact-refused" && /no artifact/.test(event.detail)));
});

function intentFor(observation: RecoveryObservation, effect: string): Intent {
  return {
    intentId: `trusting-resume:${effect}:${observation.basis.revision}`, policyId: "trusting-resume", target: { kind: "attempt", uri: `attempt:${observation.attemptId}` },
    expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`attempt:${observation.attemptId}`], readScopes: [],
  };
}

test("policies are pure: the same observation and memory give the same proposal without touching the input, and the whole episode replays byte for byte", () => {
  const observation: RecoveryObservation = deepFreeze({
    basis: { workspaceId: "fixture:artifact-recovery", revision: "a2@0" }, attemptId: "a2", parent: "a1", progress: 0, work: 10, completed: false, consumed: false,
    artifact: { id: "artifact-a1", producer: "a1", progress: 4, digest: artifactProvenance({ id: "artifact-a1", producer: "a1", progress: 4 }) },
  });
  const context = { episodeId: "e", actorId: "x", observationDigest: digest(observation), budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1000 }, authority: "propose-only" as const, policyRevision: "r", seed: 1 };
  for (const policy of [restartFromScratch, resumeFromSnapshot]) {
    assert.equal(canonicalJson(policy.propose(observation, 0, context)), canonicalJson(policy.propose(observation, 0, context)));
  }
  assert.equal(resumeFromSnapshot.propose(observation, 0, context).intents[0]!.effect, "consume-artifact");
  assert.equal(restartFromScratch.propose(observation, 0, context).intents[0]!.effect, "work");
  const a = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  const b = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.finalHash, recoveryStateHash(a.final));
  assert.match(a.finalHash, /^sha256:[0-9a-f]{64}$/);
  assert.notEqual(runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot }).finalHash, a.finalHash);
  assert.notEqual(runArtifactRecovery({ ...base, seed: 8, arm: "treatment", policy: resumeFromSnapshot }).finalHash, a.finalHash);
  assert.equal(a.mode, "fixture");
  assert.equal(a.schema, "mw.artifact-recovery.fixture.v1");
});

test("once the successor has completed, a policy proposes nothing and the episode stays completed", () => {
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  const done = episode.final.completedAtStep!;
  assert.ok(done < base.steps);
  for (const step of episode.steps.slice(done)) assert.deepEqual(step.proposed, [], `step ${step.step} proposed after completion`);
  assert.equal(episode.final.events.filter(event => event.kind === "completed").length, 1);
});

test("a run that cannot be an artifact-recovery episode is refused with ARTIFACT_RECOVERY_INVALID_RUN", () => {
  for (const bad of [{ work: 3 }, { work: 10.5 }, { steps: -1 }, { steps: 1.5 }, { seed: 1.5 }]) {
    assert.throws(() => runArtifactRecovery({ ...base, ...bad, policy: resumeFromSnapshot }), /ARTIFACT_RECOVERY_INVALID_RUN/);
  }
});

test("a fixture episode is labelled fixture and refuses any relabelling with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.equal(labelRecoveryEpisode(episode, "fixture").mode, "fixture");
  for (const mode of ["live", "replay", "live-verified"]) {
    assert.throws(() => labelRecoveryEpisode(episode, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*${mode}`));
  }
});

test("the committed cross-language fixture equals the regenerated seed-7 treatment episode byte for byte, and its final hash is the digest of its final state", () => {
  const committed = readFileSync(fixturePath, "utf8");
  const regenerated = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.equal(committed.trimEnd(), canonicalJson(regenerated));
  const parsed = JSON.parse(committed) as RecoveryEpisode;
  assert.equal(parsed.finalHash, digest(parsed.final as RecoveryState));
});

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    for (const member of Object.values(value as Record<string, unknown>)) deepFreeze(member);
    Object.freeze(value);
  }
  return value;
}

// Survivor pins (bead MechanicalWorkflows-4g4): each case below kills exactly one mutant of artifact-recovery.ts that the cases above let through.

/** A scripted policy: step N (memory N) proposes the effect at index N, with an optional expected-revision override. */
function scripted(effects: readonly string[], expectedRevision?: string) {
  return {
    id: "trusting-resume", revision: "t-1",
    propose: (observation: RecoveryObservation, memory: number) => {
      const intent = intentFor(observation, effects[memory] ?? "work");
      return { intents: observation.completed ? [] : [expectedRevision === undefined ? intent : { ...intent, expectedRevision }], memory: memory + 1, trace: [] };
    },
  };
}

test("pin: the seed alone picks the arm through a fixed mapping, asserted as literal ids with no oracle (seed 7 draws control, seed 1 draws treatment)", () => {
  const ids = (seed: number) => runArtifactRecovery({ seed, work: 10, steps: 1, policy: resumeFromSnapshot }).intervention;
  assert.deepEqual(ids(7), { arm: "control", id: "control:artifact-removed" });
  assert.deepEqual(ids(1), { arm: "treatment", id: "treatment:artifact-kept" });
  assert.equal(runArtifactRecovery({ seed: 7, work: 10, steps: 1, policy: resumeFromSnapshot }).final.artifact, null, "an unforced control seed leaves no artifact");
  assert.notEqual(runArtifactRecovery({ seed: 1, work: 10, steps: 1, policy: resumeFromSnapshot }).final.artifact, null, "an unforced treatment seed keeps the artifact");
});

test("pin: restartFromScratch proposes nothing after completion, exactly as resumeFromSnapshot does", () => {
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: restartFromScratch });
  const done = episode.final.completedAtStep!;
  assert.equal(done, base.work);
  assert.ok(done < base.steps);
  for (const step of episode.steps.slice(done)) assert.deepEqual(step.proposed, [], `step ${step.step} proposed after completion`);
  assert.equal(episode.final.events.filter(event => event.kind === "worked").length, base.work, "no work event after the completion step");
  assert.equal(episode.final.attempts[1]!.progress, base.work);
});

test("pin: artifact-unavailable is recorded exactly once per episode, in the absent case and in the digest-mismatch case, not at every restart step", () => {
  const absent = runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot });
  assert.deepEqual(absent.final.events.filter(event => event.kind === "artifact-unavailable").map(event => event.detail), ["artifact-unavailable:absent"]);
  const mismatch = runArtifactRecovery({ ...base, arm: "treatment", corruptArtifact: true, policy: resumeFromSnapshot });
  assert.deepEqual(mismatch.final.events.filter(event => event.kind === "artifact-unavailable").map(event => event.detail), ["artifact-unavailable:digest-mismatch"]);
});

test("pin: an intent the resolver rejects reaches the event record as a refused event led by the rejection code", () => {
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: scripted(["work"], "a2@999") });
  assert.deepEqual(episode.final.events.filter(event => event.kind === "refused"), [
    { step: 1, kind: "refused", attempt: "a2", detail: "INTENT_BASIS_STALE: intent expected revision a2@999, basis is a2@0" },
  ]);
  assert.equal(episode.steps[0]!.resolution.rejected.length, 1);
  assert.equal(episode.final.attempts[1]!.progress, 0, "a rejected intent changes nothing");
});

test("pin: consuming the artifact after the successor already worked sets the successor's progress to the artifact's progress rather than adding to it", () => {
  const episode = runArtifactRecovery({ ...base, steps: 2, arm: "treatment", policy: scripted(["work", "consume-artifact"]) });
  const artifact = episode.final.artifact!;
  assert.ok(artifact.progress >= 2, `artifact progress ${artifact.progress}`);
  assert.equal(episode.final.events.filter(event => event.kind === "worked").length, 1);
  assert.equal(episode.final.events.filter(event => event.kind === "artifact-consumed").length, 1);
  assert.equal(episode.final.attempts[1]!.progress, artifact.progress, "set to the snapshot, not 1 + snapshot");
});

test("pin: consuming a snapshot that is behind the successor regresses the successor to the snapshot's progress (set, neither max nor refuse)", () => {
  const probe = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: scripted(["work"]) });
  const snapshot = probe.final.artifact!.progress;
  const workSteps = snapshot + 2;
  const episode = runArtifactRecovery({ ...base, steps: workSteps + 1, arm: "treatment", policy: scripted([...Array.from({ length: workSteps }, () => "work"), "consume-artifact"]) });
  assert.equal(episode.final.events.filter(event => event.kind === "worked").length, workSteps);
  const consumed = episode.final.events.filter(event => event.kind === "artifact-consumed");
  assert.equal(consumed.length, 1);
  assert.equal(consumed[0]!.step, workSteps + 1);
  assert.equal(episode.final.events.filter(event => event.kind === "artifact-refused").length, 0, "a snapshot behind the successor is not refused");
  assert.ok(workSteps > snapshot, "the successor was ahead of the snapshot");
  assert.equal(episode.final.attempts[1]!.progress, snapshot, "progress regresses to the snapshot, not max(successor, snapshot)");
  assert.deepEqual(episode.final.attempts[1]!.consumed, [{ artifactId: episode.final.artifact!.id, digest: episode.final.artifact!.digest }]);
});

test("pin: within one step the refused events for rejected intents precede the events of the admitted intents", () => {
  const twoIntents = {
    id: "trusting-resume", revision: "t-1",
    propose: (observation: RecoveryObservation, memory: number) => {
      const valid = intentFor(observation, "work");
      const stale = { ...intentFor(observation, "work"), intentId: "trusting-resume:work:stale", expectedRevision: "a2@999", writeScopes: ["attempt:stale-scope"] };
      return { intents: observation.completed || memory > 0 ? [] : [valid, stale], memory: memory + 1, trace: [] };
    },
  };
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: twoIntents });
  const step = episode.steps[0]!;
  assert.equal(step.resolution.rejected.length, 1, "one stale intent rejected");
  assert.equal(step.resolution.admitted.length, 1, "one valid intent admitted");
  const stepEvents = episode.final.events.filter(event => event.step === 1);
  const refusedAt = stepEvents.findIndex(event => event.kind === "refused");
  const workedAt = stepEvents.findIndex(event => event.kind === "worked");
  assert.ok(refusedAt >= 0 && workedAt >= 0, "both events present");
  assert.ok(refusedAt < workedAt, `refused event (${refusedAt}) precedes worked event (${workedAt})`);
  assert.match(stepEvents[refusedAt]!.detail, /^INTENT_BASIS_STALE: /);
});

test("pin: an effect outside the recovery vocabulary is refused with an event naming it, and changes nothing", () => {
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: scripted(["sleep"]) });
  assert.deepEqual(episode.final.events.filter(event => event.kind === "refused"), [
    { step: 1, kind: "refused", attempt: "a2", detail: "effect sleep is not an artifact-recovery effect" },
  ]);
  assert.equal(episode.final.attempts[1]!.progress, 0);
  assert.equal(episode.final.step, 1);
});

test("c9 pin: refused events follow the resolver's rejection order within a step (two stale intents and one admitted intent)", () => {
  const ordered = {
    id: "trusting-resume", revision: "t-1",
    propose: (observation: RecoveryObservation, memory: number) => {
      const valid = intentFor(observation, "work");
      const first = { ...intentFor(observation, "work"), intentId: "trusting-resume:work:stale-1", expectedRevision: "a2@998", writeScopes: ["attempt:stale-1"] };
      const second = { ...intentFor(observation, "work"), intentId: "trusting-resume:work:stale-2", expectedRevision: "a2@999", writeScopes: ["attempt:stale-2"] };
      return { intents: observation.completed || memory > 0 ? [] : [first, second, valid], memory: memory + 1, trace: [] };
    },
  };
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: ordered });
  assert.deepEqual(episode.steps[0]!.resolution.rejected.map(rejection => rejection.intent.intentId), ["trusting-resume:work:stale-1", "trusting-resume:work:stale-2"]);
  assert.deepEqual(episode.final.events.filter(event => event.step === 1).map(event => `${event.kind} ${event.detail}`), [
    "refused INTENT_BASIS_STALE: intent expected revision a2@998, basis is a2@0",
    "refused INTENT_BASIS_STALE: intent expected revision a2@999, basis is a2@0",
    "worked a2 at 1 of 10",
  ]);
});

test("c9 pin: a restart step records artifact-unavailable before its worked event", () => {
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "control", policy: resumeFromSnapshot });
  assert.deepEqual(episode.final.events.filter(event => event.step === 1).map(event => event.kind), ["artifact-unavailable", "worked"]);
});

test("c6 pin R1: refused events keep the resolver's rejection order when that order is not the sorted order (a2@999 proposed before a2@998)", () => {
  const unsorted = {
    id: "trusting-resume", revision: "t-1",
    propose: (observation: RecoveryObservation, memory: number) => {
      const valid = intentFor(observation, "work");
      const later = { ...intentFor(observation, "work"), intentId: "trusting-resume:work:stale-b", expectedRevision: "a2@999", writeScopes: ["attempt:stale-b"] };
      const earlier = { ...intentFor(observation, "work"), intentId: "trusting-resume:work:stale-a", expectedRevision: "a2@998", writeScopes: ["attempt:stale-a"] };
      return { intents: observation.completed || memory > 0 ? [] : [later, earlier, valid], memory: memory + 1, trace: [] };
    },
  };
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "treatment", policy: unsorted });
  assert.deepEqual(episode.steps[0]!.resolution.rejected.map(rejection => rejection.intent.intentId), ["trusting-resume:work:stale-b", "trusting-resume:work:stale-a"]);
  assert.deepEqual(episode.final.events.filter(event => event.step === 1).map(event => `${event.kind} ${event.detail}`), [
    "refused INTENT_BASIS_STALE: intent expected revision a2@999, basis is a2@0",
    "refused INTENT_BASIS_STALE: intent expected revision a2@998, basis is a2@0",
    "worked a2 at 1 of 10",
  ]);
});

test("c6 pin R2: a restart step's artifact-unavailable and worked events are whole records: step 1, the successor attempt and their details", () => {
  const episode = runArtifactRecovery({ ...base, steps: 1, arm: "control", policy: resumeFromSnapshot });
  assert.deepEqual(episode.final.events.filter(event => event.step === 1), [
    { step: 1, kind: "artifact-unavailable", attempt: "a2", detail: "artifact-unavailable:absent" },
    { step: 1, kind: "worked", attempt: "a2", detail: "a2 at 1 of 10" },
  ]);
});

function leftBehind(seed: number) {
  const earlier = runArtifactRecovery({ seed, work: 10, steps: 1, arm: "treatment", policy: restartFromScratch });
  return { ...earlier.final.artifact!, originEpisode: `fixture:artifact-recovery:${seed}` };
}

test("s14.5: an injected artifact from another episode is what the successor consumes: its id and digest are named in the consumed list and the oracle agrees on the steps", () => {
  const inherited = leftBehind(3);
  const own = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.notEqual(inherited.digest, own.final.artifact!.digest, "the two episodes leave different artifacts");
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot, inheritedArtifact: inherited });
  const successor = episode.final.attempts[1]!;
  assert.deepEqual(successor.consumed, [{ artifactId: inherited.id, digest: inherited.digest }]);
  assert.equal(episode.final.artifact?.digest, inherited.digest);
  assert.ok(episode.final.events.some(event => event.kind === "artifact-created" && event.detail.includes("inherited from fixture:artifact-recovery:3") && event.detail.includes(inherited.digest)));
  const oracle = oracleRecovery({ ...base, policy: "resume-from-snapshot", arm: "treatment", inheritedArtifact: inherited });
  assert.equal(episode.final.completedAtStep, oracle.steps);
  assert.equal(oracle.steps, 1 + (base.work - inherited.progress));
});

test("s14.5: a digest that does not match the injected artifact's content is refused with ARTIFACT_INHERITED_DIGEST_MISMATCH by the environment and the oracle, before any step", () => {
  const forged = { ...leftBehind(3), progress: 9 };
  const mismatch = (error: unknown) => error instanceof RangeError && error.message.startsWith("ARTIFACT_INHERITED_DIGEST_MISMATCH:") && error.message.includes(forged.originEpisode) && error.message.includes(forged.digest);
  assert.throws(() => runArtifactRecovery({ ...base, steps: 0, arm: "treatment", policy: resumeFromSnapshot, inheritedArtifact: forged }), mismatch);
  assert.throws(() => oracleRecovery({ ...base, policy: "resume-from-snapshot", inheritedArtifact: forged }), mismatch);
});

test("s14.5: the episode lineage records inheritedFrom only when an artifact was injected", () => {
  const inherited = leftBehind(3);
  const episode = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot, inheritedArtifact: inherited });
  const lineage = { episode: "fixture:artifact-recovery:3", artifactId: inherited.id, digest: inherited.digest };
  assert.deepEqual(episode.inheritedFrom, lineage);
  assert.deepEqual(episode.final.inheritedFrom, lineage);
  const plain = runArtifactRecovery({ ...base, arm: "treatment", policy: resumeFromSnapshot });
  assert.equal("inheritedFrom" in plain, false);
  assert.equal("inheritedFrom" in plain.final, false);
});

test("s14.5: the control arm removes the injected artifact like its own, and restart-from-scratch ignores it", () => {
  const inherited = leftBehind(3);
  const control = runArtifactRecovery({ ...base, arm: "control", policy: resumeFromSnapshot, inheritedArtifact: inherited });
  assert.equal(control.final.artifact, null);
  assert.ok(control.final.events.some(event => event.kind === "artifact-removed" && event.detail.startsWith(`${inherited.id} removed`)));
  assert.equal(control.final.completedAtStep, oracleRecovery({ ...base, policy: "resume-from-snapshot", arm: "control", inheritedArtifact: inherited }).steps);
  const restart = runArtifactRecovery({ ...base, arm: "treatment", policy: restartFromScratch, inheritedArtifact: inherited });
  assert.deepEqual(restart.final.attempts[1]!.consumed, []);
  assert.equal(restart.final.completedAtStep, base.work);
});
