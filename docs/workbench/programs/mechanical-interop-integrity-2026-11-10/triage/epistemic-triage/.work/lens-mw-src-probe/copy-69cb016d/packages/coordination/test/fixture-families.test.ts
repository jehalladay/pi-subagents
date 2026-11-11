// MechanicalWorkflows-yx4x (GPC-EAT-R011): three ADDITIVE fixture families — a heterogeneous
// landing queue with non-uniform resource claims, a heterogeneous DAG assignment (>=2 agents,
// >=3 dependent tasks) and a temporal-shift landing variant — each exporting mw.episode.v1 in
// mode "fixture", while the six existing environment literals and their tests stay unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  runHeterogeneousLanding, heterogeneousRestackFirst, runDagAssignment, dagMatchingPolicy,
  toEpisode, labelEpisodeMode, episodeBytes, digest,
} from "../dist/index.js";
import type { Episode, EpisodeEnvironment } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtureDir = join(here, "../../../qa/integration/python-consumer/fixtures");

test("the heterogeneous landing fixture carries non-uniform claims; reconcile rejects the over-budget tail and admits the in-budget prefix", () => {
  const episode = runHeterogeneousLanding({ seed: 7, candidates: 4, lanes: 2, steps: 12, policy: heterogeneousRestackFirst });
  assert.equal(episode.schema, "mw.landing-queue-heterogeneous.fixture.v1");
  assert.equal(episode.mode, "fixture");
  const uniform = JSON.stringify({ compute: 1, workers: 1, queue: 1, latencyMs: 1 });
  const distinct = episode.final.candidates.filter(candidate => JSON.stringify(candidate.claim) !== uniform);
  assert.ok(distinct.length >= 2, `at least 2 candidates differ from the uniform claim (got ${distinct.length})`);
  const rejections = episode.steps.flatMap(step => step.resolution.rejected);
  assert.ok(rejections.some(rejection => rejection.code === "INTENT_BUDGET_EXCEEDED"), "the over-budget tail is rejected");
  const budgeted = episode.steps.find(step => step.resolution.rejected.some(r => r.code === "INTENT_BUDGET_EXCEEDED") && step.resolution.admitted.length > 0);
  assert.ok(budgeted !== undefined, "some step admits the in-budget prefix while rejecting the tail");
  assert.deepEqual(runHeterogeneousLanding({ seed: 7, candidates: 4, lanes: 2, steps: 12, policy: heterogeneousRestackFirst }), episode, "seeded and deterministic");
});

test("the DAG fixture has >=2 agents and >=3 dependent tasks; dependencies gate the ready set and the episode converts to mw.episode.v1 fixture mode", () => {
  const episode = runDagAssignment({ seed: 7, steps: 10, policy: dagMatchingPolicy });
  assert.equal(episode.schema, "mw.dag-assignment.fixture.v1");
  assert.ok(episode.final.agents.length >= 2);
  const dependent = episode.final.tasks.filter(task => task.dependsOn.length > 0);
  assert.ok(dependent.length >= 3, `at least 3 dependent tasks (got ${dependent.length})`);
  for (const step of episode.steps) {
    for (const assigned of step.assigned) {
      const task = episode.final.tasks.find(candidate => candidate.taskId === assigned.taskId)!;
      assert.ok(task.dependsOn.every(dependency => step.completedBefore.includes(dependency)), `${assigned.taskId} ran only after its dependencies`);
    }
  }
  const converted = toEpisode(episode);
  assert.equal(converted.schema, "mw.episode.v1");
  assert.equal(converted.mode, "fixture");
  assert.equal(converted.environment, "dag-assignment");
  assert.throws(() => labelEpisodeMode(converted, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  assert.throws(() => labelEpisodeMode(converted, "replay"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
});

test("the temporal-shift variant moves arrivals mid-episode by seed, changes the landed order against the unshifted run, and exports fixture mode", () => {
  // Seed 8: under the finalised gateDraws stream seed 7 lands the same order with and without the shift, so the shift is pinned at the next seed where it changes the outcome.
  const base = runHeterogeneousLanding({ seed: 8, candidates: 4, lanes: 2, steps: 12, policy: heterogeneousRestackFirst });
  const shifted = runHeterogeneousLanding({ seed: 8, candidates: 4, lanes: 2, steps: 12, policy: heterogeneousRestackFirst, temporalShift: { atStep: 4, arrivals: 2 } });
  assert.equal(shifted.schema, "mw.landing-queue-heterogeneous.fixture.v1");
  assert.equal(shifted.temporalShift === undefined, false, "the shift is recorded on the episode");
  assert.notDeepEqual(shifted.final.landed, base.final.landed, "the shift changes the outcome");
  const episode = toEpisode(shifted);
  assert.equal(episode.environment, "landing-queue-temporal");
  assert.equal(episode.mode, "fixture");
  assert.throws(() => labelEpisodeMode(episode, "live"), /EPISODE_MODE_UPGRADE_FORBIDDEN/);
  const hetero = toEpisode(base);
  assert.equal(hetero.environment, "landing-queue-heterogeneous");
});

test("malformed runs refuse with FIXTURE_RUN_INVALID naming the parameters", () => {
  assert.throws(() => runHeterogeneousLanding({ seed: -1, candidates: 4, lanes: 1, steps: 12, policy: heterogeneousRestackFirst }), /FIXTURE_RUN_INVALID/);
  assert.throws(() => runHeterogeneousLanding({ seed: 7, candidates: 1, lanes: 1, steps: 12, policy: heterogeneousRestackFirst }), /FIXTURE_RUN_INVALID/);
  assert.throws(() => runHeterogeneousLanding({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: heterogeneousRestackFirst, temporalShift: { atStep: 0, arrivals: 2 } }), /FIXTURE_RUN_INVALID/);
  assert.throws(() => runDagAssignment({ seed: 7, steps: 0, policy: dagMatchingPolicy }), /FIXTURE_RUN_INVALID/);
});

test("regression: EpisodeEnvironment keeps all six existing literals and every pinned python-consumer fixture re-hashes to its committed digest", () => {
  const existing: EpisodeEnvironment[] = ["landing-queue", "compaction-inheritance", "colony-resilience", "artifact-recovery", "quorum-evidence", "native-replay"];
  for (const literal of existing) {
    const pin: EpisodeEnvironment = literal;
    assert.equal(typeof pin, "string");
  }
  const episodeFiles = readdirSync(fixtureDir).filter(name => name.startsWith("episode-"));
  assert.ok(episodeFiles.length >= 6);
  for (const name of episodeFiles) {
    const raw = readFileSync(join(fixtureDir, name), "utf8");
    const parsed = JSON.parse(raw) as Episode;
    assert.equal(raw, episodeBytes(parsed), `${name}: committed bytes are canonical and unchanged`);
  }
  const sources = ["landing-queue.ts", "quorum-evidence.ts", "compaction-inheritance.ts", "colony-resilience.ts", "artifact-recovery.ts", "elastic-landing.ts"];
  for (const source of sources) {
    const text = readFileSync(join(here, `../src/${source}`), "utf8");
    assert.equal(text.includes("fixture-families"), false, `${source} is untouched by the new families`);
  }
  assert.ok(digest({ probe: true }).startsWith("sha256:"));
});

// MechanicalWorkflows-8841: four laws the landed yx4x tree satisfied but no row pinned.
test("DAG law: on every step the claims assigned to each agent fit that agent's capacity on every dimension", () => {
  const episode = runDagAssignment({ seed: 7, steps: 10, policy: dagMatchingPolicy });
  const dimensions = ["compute", "workers", "queue", "latencyMs"] as const;
  let assignments = 0;
  for (const step of episode.steps) {
    for (const agent of episode.final.agents) {
      const mine = step.assigned.filter(pair => pair.agentId === agent.agentId);
      assignments += mine.length;
      for (const dimension of dimensions) {
        const used = mine.reduce((sum, pair) => sum + episode.final.tasks.find(task => task.taskId === pair.taskId)!.claim[dimension], 0);
        assert.ok(used <= agent.capacity[dimension], `step ${step.step}: agent ${agent.agentId} ${dimension} use ${used} exceeds capacity ${agent.capacity[dimension]}`);
      }
    }
  }
  assert.ok(assignments >= 5, `the capacity check is not vacuous (got ${assignments} assignments)`);
});

test("DAG law: the episode drains all five tasks through their dependents, so the dependency witness is not vacuous", () => {
  const episode = runDagAssignment({ seed: 7, steps: 10, policy: dagMatchingPolicy });
  assert.deepEqual([...episode.final.completed].sort(), ["t1", "t2", "t3", "t4", "t5"], "every task completes");
  const dependentIds = new Set(episode.final.tasks.filter(task => task.dependsOn.length > 0).map(task => task.taskId));
  const assignedDependents = episode.steps.flatMap(step => step.assigned).filter(pair => dependentIds.has(pair.taskId));
  assert.ok(assignedDependents.length >= 3, `at least 3 dependent assignments ran (got ${assignedDependents.length})`);
});

test("temporal shift law: exactly 'arrivals' arrived events, all at step atStep", () => {
  const shifted = runHeterogeneousLanding({ seed: 7, candidates: 4, lanes: 2, steps: 12, policy: heterogeneousRestackFirst, temporalShift: { atStep: 4, arrivals: 2 } });
  const arrived = shifted.final.events.filter(event => event.kind === "arrived");
  assert.equal(arrived.length, 2, "exactly the declared arrivals");
  assert.ok(arrived.every(event => event.step === 4), `every arrival lands at step 4 (got ${arrived.map(event => event.step).join(",")})`);
  assert.equal(shifted.final.candidates.length, 6, "four initial candidates plus two arrivals");
});

test("temporal shift law: a zero-arrival shift refuses with FIXTURE_RUN_INVALID naming the arrivals", () => {
  assert.throws(
    () => runHeterogeneousLanding({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: heterogeneousRestackFirst, temporalShift: { atStep: 4, arrivals: 0 } }),
    /FIXTURE_RUN_INVALID: temporal shift atStep 4, arrivals 0/,
  );
});
