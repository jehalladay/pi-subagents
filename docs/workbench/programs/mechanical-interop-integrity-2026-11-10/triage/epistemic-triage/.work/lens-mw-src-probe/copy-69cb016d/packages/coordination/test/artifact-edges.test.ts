import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  UNKNOWN,
  classifyEpisodeEdges,
  persistAll,
  projectCollectiveEvents,
  restartFromScratch,
  resumeFromSnapshot,
  runArtifactRecovery,
  runCompactionInheritance,
  toEpisode,
} from "../dist/index.js";
import type { Episode, EpisodeArtifact, EpisodeAttempt, EpisodeConsumption } from "../dist/index.js";

const recovery = (arm: "treatment" | "control"): Episode =>
  toEpisode(runArtifactRecovery({ seed: 7, work: 6, steps: 12, policy: resumeFromSnapshot, arm }));

const consumedOf = (episode: Episode): readonly EpisodeConsumption[] => {
  assert.notEqual(episode.artifacts.consumed, UNKNOWN);
  return episode.artifacts.consumed as readonly EpisodeConsumption[];
};

test("a consumed artifact classifies as a lineage edge carrying the consuming attempt, the artifact and its digest byte-identical", () => {
  const episode = recovery("treatment");
  const [use] = consumedOf(episode);
  assert.ok(use, "the treatment arm's successor consumes the producer's artifact");
  const edges = classifyEpisodeEdges(episode);
  const consumed = edges.lineage.filter(edge => edge.kind === "consumed");
  assert.deepEqual(consumed, [{ class: "lineage", kind: "consumed", artifactId: use.artifactId, digest: use.digest, by: use.attempt }]);
  assert.equal(edges.unknown.length, 0);
});

test("a created artifact classifies as a lineage edge carrying its producer and digest", () => {
  const episode = recovery("treatment");
  const edges = classifyEpisodeEdges(episode);
  const created = edges.lineage.filter(edge => edge.kind === "created");
  assert.deepEqual(created, [{ class: "lineage", kind: "created", artifactId: "artifact-a1", digest: consumedOf(episode)[0]!.digest, by: "a1" }]);
  assert.deepEqual(edges.lineage.map(edge => edge.kind), ["created", "consumed"]);
});

test("causal edges come only from the recorded intervention: consumption count never changes them and no causal edge names an artifact", () => {
  const treatment = classifyEpisodeEdges(recovery("treatment"));
  const control = classifyEpisodeEdges(recovery("control"));
  assert.equal(treatment.lineage.filter(edge => edge.kind === "consumed").length, 1);
  assert.equal(control.lineage.filter(edge => edge.kind === "consumed").length, 0);
  assert.deepEqual(treatment.causal, [{ class: "causal", kind: "intervention", controlId: UNKNOWN, treatmentId: "treatment:artifact-kept" }]);
  assert.deepEqual(control.causal, [{ class: "causal", kind: "intervention", controlId: "control:artifact-removed", treatmentId: UNKNOWN }]);
  for (const edge of [...treatment.causal, ...control.causal]) {
    assert.equal("artifactId" in edge, false);
    assert.equal("digest" in edge, false);
  }
  const unarmed: Episode = { ...recovery("treatment"), arms: { controlId: UNKNOWN, treatmentId: UNKNOWN } };
  const none = classifyEpisodeEdges(unarmed);
  assert.deepEqual(none.causal, []);
  assert.deepEqual(none.lineage, treatment.lineage);
});

test("temporal order and attempt outcome never promote consumption: a later consuming attempt that completed classifies exactly as one that crashed", () => {
  const episode = recovery("treatment");
  const attempts = episode.attempts as readonly EpisodeAttempt[];
  assert.deepEqual(attempts.map(attempt => [attempt.id, attempt.parent, attempt.outcome]), [["a1", UNKNOWN, "crashed"], ["a2", "a1", "completed"]]);
  const crashedSuccessor: Episode = { ...episode, attempts: attempts.map(attempt => attempt.id === "a2" ? { ...attempt, outcome: "crashed" } : attempt) };
  assert.deepEqual(classifyEpisodeEdges(crashedSuccessor), classifyEpisodeEdges(episode));
  assert.ok(classifyEpisodeEdges(episode).lineage.every(edge => edge.class === "lineage"));
});

test("an explicit unknown lineage source is reported as unknown, never as an empty list of edges", () => {
  const episode = recovery("treatment");
  const noConsumed: Episode = { ...episode, artifacts: { created: episode.artifacts.created, consumed: UNKNOWN } };
  const edges = classifyEpisodeEdges(noConsumed);
  assert.deepEqual(edges.unknown, ["consumed"]);
  assert.deepEqual(edges.lineage.map(edge => edge.kind), ["created"]);
  const noneKnown: Episode = { ...episode, artifacts: { created: UNKNOWN, consumed: UNKNOWN } };
  const blank = classifyEpisodeEdges(noneKnown);
  assert.deepEqual(blank.unknown, ["created", "consumed"]);
  assert.deepEqual(blank.lineage, []);
  assert.equal(blank.causal.length, 1);
  const empty: Episode = { ...episode, artifacts: { created: [], consumed: [] } };
  assert.deepEqual(classifyEpisodeEdges(empty).unknown, []);
});

test("classification is pure: identical episodes classify deep-equal and the episode is not mutated", () => {
  const episode = recovery("treatment");
  const before = JSON.stringify(episode);
  const once = classifyEpisodeEdges(episode);
  const twice = classifyEpisodeEdges(episode);
  assert.deepEqual(once, twice);
  assert.equal(JSON.stringify(episode), before);
});

test("the collective-event projection never turns a consumption into a causal parent: parents are earlier events on the same subject only", () => {
  const episode = recovery("treatment");
  const [use] = consumedOf(episode);
  const events = projectCollectiveEvents(episode);
  const forbidden = new Set([use!.artifactId, use!.digest]);
  const seen = new Map<string, string>();
  for (const event of events) {
    for (const parent of event.causal_parents) {
      assert.equal(forbidden.has(parent), false, `consumption ${parent} leaked into causal_parents`);
      assert.equal(seen.get(parent), event.subject.uri, "a causal parent is an earlier event on the same subject");
    }
    assert.equal(event.authority, "observation-only");
    seen.set(event.event_id, event.subject.uri);
  }
  const firstSuccessorEvent = events.find(event => event.subject.uri.endsWith(`/${use!.attempt}`));
  assert.ok(firstSuccessorEvent);
  assert.deepEqual(firstSuccessorEvent.causal_parents, [], "consuming the producer's artifact creates no causal parent from the producer's events");
});

const createdOf = (episode: Episode): readonly EpisodeArtifact[] => {
  assert.notEqual(episode.artifacts.created, UNKNOWN);
  return episode.artifacts.created as readonly EpisodeArtifact[];
};

test("a created artifact no consumption names stays a lineage edge: the restarting treatment arm keeps its one created edge and reports no consumed edge", () => {
  for (const [label, episode] of [
    ["restartFromScratch", toEpisode(runArtifactRecovery({ seed: 7, work: 6, steps: 12, policy: restartFromScratch, arm: "treatment" }))],
    ["resumeFromSnapshot over a corrupt artifact", toEpisode(runArtifactRecovery({ seed: 7, work: 6, steps: 12, policy: resumeFromSnapshot, arm: "treatment", corruptArtifact: true }))],
  ] as const) {
    assert.deepEqual(consumedOf(episode), [], `${label}: nothing consumed the artifact`);
    const [produced] = createdOf(episode);
    assert.ok(produced, `${label}: the crashed first attempt still created its artifact`);
    const edges = classifyEpisodeEdges(episode);
    assert.deepEqual(edges.lineage, [{ class: "lineage", kind: "created", artifactId: "artifact-a1", digest: produced.digest, by: "a1" }], label);
    assert.deepEqual(edges.unknown, [], label);
  }
});

test("created edges keep the episode's recorded order and an unknown consumed source is reported beside them: the compaction-inheritance episode", () => {
  const episode = toEpisode(runCompactionInheritance({ seed: 7, tasks: 8, policy: persistAll }));
  const created = createdOf(episode);
  assert.equal(created.length, 8);
  const edges = classifyEpisodeEdges(episode);
  assert.deepEqual(edges.lineage.map(edge => edge.artifactId), created.map(artifact => artifact.id));
  assert.deepEqual(edges.lineage, created.map(artifact => ({ class: "lineage", kind: "created", artifactId: artifact.id, digest: artifact.digest, by: artifact.producer })));
  assert.deepEqual(edges.unknown, ["consumed"]);
});

test("an unknown created source keeps every recorded consumed edge and reports only created as unknown", () => {
  const episode = recovery("treatment");
  const [use] = consumedOf(episode);
  assert.ok(use);
  const edges = classifyEpisodeEdges({ ...episode, artifacts: { created: UNKNOWN, consumed: [use] } });
  assert.deepEqual(edges.unknown, ["created"]);
  assert.deepEqual(edges.lineage, [{ class: "lineage", kind: "consumed", artifactId: use.artifactId, digest: use.digest, by: use.attempt }]);
});

test("consumed edges keep the recorded order and every consumption, including a second consumption of one artifact", () => {
  const episode = recovery("treatment");
  const consumed: readonly EpisodeConsumption[] = [
    { attempt: "a3", artifactId: "artifact-b", digest: "sha256:bbbb" },
    { attempt: "a2", artifactId: "artifact-a1", digest: "sha256:aaaa" },
    { attempt: "a4", artifactId: "artifact-a1", digest: "sha256:aaaa" },
  ];
  const edges = classifyEpisodeEdges({ ...episode, artifacts: { created: [], consumed } });
  assert.deepEqual(edges.lineage, consumed.map(use => ({ class: "lineage", kind: "consumed", artifactId: use.artifactId, digest: use.digest, by: use.attempt })));
  assert.deepEqual(edges.unknown, []);
});

test("a consumption of an artifact the episode never lists as created stays a lineage edge", () => {
  const episode = recovery("treatment");
  const orphan: EpisodeConsumption = { attempt: "a2", artifactId: "artifact-elsewhere", digest: "sha256:cccc" };
  const edges = classifyEpisodeEdges({ ...episode, artifacts: { created: createdOf(episode), consumed: [orphan] } });
  assert.deepEqual(edges.lineage.map(edge => [edge.kind, edge.artifactId]), [["created", "artifact-a1"], ["consumed", "artifact-elsewhere"]]);
  assert.equal(edges.lineage[1]!.digest, "sha256:cccc");
  assert.equal(edges.lineage[1]!.by, "a2");
});

test("each edge carries the digest it was recorded with: a consumer digest that differs from the producer's stays as recorded", () => {
  const episode = recovery("treatment");
  const [produced] = createdOf(episode);
  assert.ok(produced);
  const use: EpisodeConsumption = { attempt: "a2", artifactId: produced.id, digest: "sha256:not-the-producers" };
  assert.notEqual(use.digest, produced.digest);
  const edges = classifyEpisodeEdges({ ...episode, artifacts: { created: [produced], consumed: [use] } });
  assert.deepEqual(edges.lineage.map(edge => [edge.kind, edge.digest, edge.by]), [["created", produced.digest, "a1"], ["consumed", "sha256:not-the-producers", "a2"]]);
});

test("an episode that records both arms yields exactly one causal edge carrying both ids", () => {
  const episode = recovery("treatment");
  const both: Episode = { ...episode, arms: { controlId: "control:artifact-removed", treatmentId: "treatment:artifact-kept" } };
  assert.deepEqual(classifyEpisodeEdges(both).causal, [{ class: "causal", kind: "intervention", controlId: "control:artifact-removed", treatmentId: "treatment:artifact-kept" }]);
});
