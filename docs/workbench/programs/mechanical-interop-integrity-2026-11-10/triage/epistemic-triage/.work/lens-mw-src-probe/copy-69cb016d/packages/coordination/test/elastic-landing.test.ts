import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  runElasticLanding, runLandingQueue, fifoLanding, restackFirst, elasticLanes, laneIntent, oracleLoadBounds, canonicalJson, digest, PAUSE_STEPS,
} from "../dist/index.js";
import type { ElasticEpisode, ElasticObservation, ElasticState, Intent, Policy } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../../../qa/integration/python-consumer/fixtures/landing-queue-elastic-seed7.json");
// The lane scenarios below script one step or a few steps and expect no gate-driven lane interruption; under the finalised gateDraws stream seed 7 interrupts a lane in them, so they run at seed 0 (MechanicalWorkflows-qmb3x).
const SCENARIO_SEED = 0;
const base = { seed: 7, candidates: 4, lanes: 1, maxLanes: 3, steps: 30 };

type ElasticPolicy = Policy<ElasticObservation, Intent, number>;

/** A scripted policy: each step it proposes whatever `script` returns for the observed step number. */
function scripted(id: string, script: (observation: ElasticObservation) => Intent[]): ElasticPolicy {
  return { id, revision: "t-1", propose(observation, memory) { return { intents: script(observation), memory: memory + 1, trace: [] }; } };
}

function workIntent(policyId: string, observation: ElasticObservation, candidate: string, effect: "land" | "restack"): Intent {
  return {
    intentId: `${policyId}:${effect}:${candidate}`, policyId, target: { kind: "candidate", uri: `cand:${candidate}` }, expectedRevision: observation.basis.revision,
    effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [],
    writeScopes: effect === "land" ? ["main"] : [`cand:${candidate}`], readScopes: effect === "land" ? [] : ["main"],
  };
}

/** The step of the last landing, or 0 when some candidate never landed. */
function completionStep(episode: ElasticEpisode): number {
  const landings = episode.final.events.filter(event => event.kind === "landed");
  return landings.length === episode.final.candidates.length ? landings.at(-1)!.step : 0;
}

test("the baselines stay byte-identical: fifoLanding and restackFirst seed-7 episodes keep the final hashes recorded when the splitmix32 gateDraws finaliser landed (MechanicalWorkflows-qmb3x)", () => {
  assert.equal(runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: fifoLanding }).finalHash, "sha256:46dc70b82f1215b88375b9d5f32b5c67bcd0f95606e0928767fc65b86d221c5c");
  assert.equal(runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: restackFirst }).finalHash, "sha256:618ac15a3852a99de105e3c54aea5f65f3a784960d903e1f22d046f3552936c3");
});

test("a fixed-lane policy on one lane lands the same candidates in the same order as the plain runner, with lane ids on its events and no lane changes", () => {
  const plain = runLandingQueue({ seed: 7, candidates: 4, lanes: 1, steps: 12, policy: restackFirst });
  const elastic = runElasticLanding({ seed: 7, candidates: 4, lanes: 1, maxLanes: 1, steps: 12, policy: restackFirst });
  assert.deepEqual(elastic.final.landed, plain.final.landed);
  assert.deepEqual(elastic.final.events.map(event => [event.step, event.kind, event.candidate]), plain.final.events.map(event => [event.step, event.kind, event.candidate]));
  for (const event of elastic.final.events) { assert.equal(event.lane, "l1"); assert.ok(event.reason.length > 0); }
  assert.equal(elastic.final.lanes.length, 1);
  assert.equal(elastic.mode, "fixture");
  assert.equal(elastic.schema, "mw.landing-queue.elastic.fixture.v1");
});

test("lane.allocate is admitted only through reconcile: it claims compute, adds a lane that works from the next step, and the event records step and reason", () => {
  const policy = scripted("grow", observation => observation.step === 1 ? [laneIntent("grow", observation, { effect: "lane.allocate", reason: "backlog" })] : []);
  const episode = runElasticLanding({ ...base, steps: 3, policy });
  const first = episode.steps[0]!;
  assert.equal(first.resolution.admitted.length, 1);
  assert.deepEqual(first.resolution.budgetUsed, { compute: 1, workers: 0, queue: 1, latencyMs: 1 });
  assert.equal(first.activeLanes, 1, "an allocated lane does not work in the step that allocates it");
  assert.equal(episode.steps[1]!.activeLanes, 2);
  const allocated = episode.final.events.filter(event => event.kind === "lane-allocated");
  assert.deepEqual(allocated.map(event => [event.step, event.lane, event.reason]), [[1, "l2", "backlog"]]);
  // A budget with no compute left rejects the allocation instead of applying it: maxLanes 0 headroom for the claim.
  const starved = runElasticLanding({ ...base, maxLanes: 1, steps: 1, policy: scripted("grow", observation => [laneIntent("grow", observation, { effect: "lane.allocate", reason: "x" }), workIntent("grow", observation, "c1", "restack"), workIntent("grow", observation, "c2", "restack")]) });
  assert.ok(starved.steps[0]!.resolution.rejected.some(rejection => rejection.code === "INTENT_BUDGET_EXCEEDED"));
});

test("allocating past maxLanes is refused with LANE_CAP_REACHED, names the step, and leaves the lane count unchanged", () => {
  const policy = scripted("greedy", observation => [laneIntent("greedy", observation, { effect: "lane.allocate", reason: "more" })]);
  const episode = runElasticLanding({ ...base, lanes: 1, maxLanes: 2, steps: 3, policy });
  assert.equal(episode.final.lanes.length, 2);
  const refused = episode.final.events.filter(event => event.kind === "refused");
  assert.equal(refused.length, 2);
  assert.match(refused[0]!.reason, /^LANE_CAP_REACHED: .*2/);
  assert.deepEqual(refused.map(event => event.step), [2, 3]);
});

test("lane.pause takes the lane out for PAUSE_STEPS steps, shrinks the worker budget (work is rejected with INTENT_BUDGET_EXCEEDED while no lane is active), then resumes it with an event", () => {
  assert.equal(PAUSE_STEPS, 2);
  const policy = scripted("pauser", observation => observation.step === 1
    ? [laneIntent("pauser", observation, { effect: "lane.pause", lane: "l1", reason: "drain" })]
    : [workIntent("pauser", observation, "c1", "land")]);
  const episode = runElasticLanding({ ...base, steps: 6, policy });
  assert.deepEqual(episode.steps.map(step => step.activeLanes), [1, 0, 0, 1, 1, 1]);
  for (const index of [1, 2]) {
    const step = episode.steps[index]!;
    assert.deepEqual(step.resolution.rejected.map(rejection => rejection.code), ["INTENT_BUDGET_EXCEEDED"]);
  }
  const lane = episode.final.events.filter(event => event.lane === "l1" && event.kind.startsWith("lane-"));
  assert.deepEqual(lane.map(event => [event.step, event.kind, event.reason]), [[1, "lane-paused", "drain"], [4, "lane-resumed", "pause elapsed"]]);
  assert.ok(episode.final.landed.includes("c1") || episode.final.events.some(event => event.kind === "gate-failed"), "the resumed lane worked again");
});

test("two lane effects on one lane in one step interfere: the resolver refuses both with INTENT_WRITE_CONFLICT and nothing changes", () => {
  const policy = scripted("clash", observation => observation.step === 1 ? [
    laneIntent("clash", observation, { effect: "lane.pause", lane: "l1", reason: "a" }),
    laneIntent("clash", observation, { effect: "lane.reserve", lane: "l1", candidate: "c2", reason: "b" }),
  ] : []);
  const episode = runElasticLanding({ ...base, steps: 1, policy });
  assert.deepEqual(episode.steps[0]!.resolution.rejected.map(rejection => rejection.code), ["INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"]);
  assert.equal(episode.final.lanes[0]!.status, "active");
  assert.equal(episode.final.lanes[0]!.reservedFor, null);
});

test("lane.reserve holds a lane for one candidate: its work runs there, another candidate's work is refused with LANE_UNAVAILABLE and never draws a gate verdict", () => {
  const policy = scripted("holder", observation => observation.step === 1
    ? [laneIntent("holder", observation, { effect: "lane.reserve", lane: "l1", candidate: "c2", reason: "hold" })]
    : observation.step === 2 ? [workIntent("holder", observation, "c3", "land")] : [workIntent("holder", observation, "c2", "land")]);
  const episode = runElasticLanding({ ...base, steps: 3, policy });
  assert.equal(episode.final.lanes[0]!.reservedFor, "c2");
  const second = episode.steps[1]!.events;
  assert.deepEqual(second.map(event => [event.kind, event.candidate]), [["refused", "c3"]]);
  assert.match(second[0]!.reason, /^LANE_UNAVAILABLE: no usable lane for c3/);
  const third = episode.steps[2]!.events;
  assert.equal(third.length, 1);
  assert.equal(third[0]!.candidate, "c2");
  assert.equal(third[0]!.lane, "l1");
  assert.deepEqual(episode.final.events.filter(event => event.kind === "lane-reserved").map(event => [event.step, event.lane, event.candidate, event.reason]), [[1, "l1", "c2", "hold"]]);
});

test("lane.route sends one candidate's work to the named lane for that step only; a route to a lane that does not exist is refused with LANE_UNKNOWN", () => {
  const routed = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 2, steps: 1, policy: scripted("router", observation => [
    laneIntent("router", observation, { effect: "lane.route", lane: "l2", candidate: "c1", reason: "spread" }),
    workIntent("router", observation, "c1", "land"),
  ]) });
  const events = routed.steps[0]!.events;
  assert.deepEqual(events.map(event => event.kind).filter(kind => kind.startsWith("lane-")), ["lane-routed"]);
  const landing = events.find(event => event.kind === "landed" || event.kind === "gate-failed")!;
  assert.equal(landing.lane, "l2");
  assert.equal(events.find(event => event.kind === "lane-routed")!.reason, "spread");
  const unknown = runElasticLanding({ ...base, seed: SCENARIO_SEED, steps: 1, policy: scripted("router", observation => [laneIntent("router", observation, { effect: "lane.route", lane: "l9", candidate: "c1", reason: "x" })]) });
  assert.match(unknown.steps[0]!.events[0]!.reason, /^LANE_UNKNOWN: lane l9 does not exist/);
  const noCandidate = runElasticLanding({ ...base, seed: SCENARIO_SEED, steps: 1, policy: scripted("holder", observation => [laneIntent("holder", observation, { effect: "lane.reserve", lane: "l1", candidate: "c9", reason: "x" })]) });
  assert.match(noCandidate.steps[0]!.events[0]!.reason, /^LANE_UNKNOWN: candidate c9 does not exist/);
});

test("a route cannot override the lane's other holders: a route onto a lane another candidate already used this step is refused, and a route onto a lane reserved for another candidate is refused", () => {
  const shared = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 2, steps: 1, policy: scripted("router", observation => [
    laneIntent("router", observation, { effect: "lane.route", lane: "l1", candidate: "c2", reason: "b" }),
    workIntent("router", observation, "c1", "restack"), workIntent("router", observation, "c2", "restack"),
  ]) });
  const outcomes = shared.steps[0]!.events.filter(event => event.kind === "restacked" || event.kind === "refused");
  assert.deepEqual(outcomes.map(event => [event.kind, event.candidate, event.lane]), [["restacked", "c1", "l1"], ["refused", "c2", "l1"]]);
  assert.match(outcomes[1]!.reason, /^LANE_UNAVAILABLE: no usable lane for c2 \(routed to l1\)/);
  const held = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 1, steps: 2, policy: scripted("router", observation => observation.step === 1
    ? [laneIntent("router", observation, { effect: "lane.reserve", lane: "l1", candidate: "c2", reason: "hold" })]
    : [laneIntent("router", observation, { effect: "lane.route", lane: "l1", candidate: "c3", reason: "steal" }), workIntent("router", observation, "c3", "restack")]) });
  const refused = held.steps[1]!.events.filter(event => event.kind === "refused");
  assert.equal(refused.length, 1);
  assert.match(refused[0]!.reason, /^LANE_UNAVAILABLE: no usable lane for c3 \(routed to l1\)/);
  assert.equal(held.final.candidates.find(candidate => candidate.id === "c3")!.base, "head-0");
});

test("pausing a lane that is already paused is refused with LANE_UNAVAILABLE and does not extend the pause", () => {
  const policy = scripted("pauser", observation => observation.step <= 2 ? [laneIntent("pauser", observation, { effect: "lane.pause", lane: "l1", reason: "again" })] : []);
  const episode = runElasticLanding({ ...base, lanes: 1, maxLanes: 1, steps: 5, policy });
  const refused = episode.final.events.filter(event => event.kind === "refused");
  assert.deepEqual(refused.map(event => event.step), [2]);
  assert.match(refused[0]!.reason, /^LANE_UNAVAILABLE: lane l1 is already paused/);
  assert.deepEqual(episode.final.events.filter(event => event.kind === "lane-resumed").map(event => event.step), [4]);
});

test("seeded interruptions are reproducible, carry step and reason, and never take the last active lane", () => {
  const a = runElasticLanding({ ...base, seed: 3, lanes: 2, steps: 40, policy: restackFirst });
  const b = runElasticLanding({ ...base, seed: 3, lanes: 2, steps: 40, policy: restackFirst });
  assert.equal(canonicalJson(a), canonicalJson(b));
  let interrupted = 0;
  for (let seed = 0; seed < 40; seed += 1) {
    const episode = runElasticLanding({ ...base, seed, lanes: 2, steps: 40, policy: restackFirst });
    for (const step of episode.steps) assert.ok(step.activeLanes >= 1, `seed ${seed} step ${step.step} lost every lane`);
    for (const event of episode.final.events.filter(candidate => candidate.kind === "lane-interrupted")) {
      interrupted += 1;
      assert.equal(event.reason, "seeded interruption");
      assert.match(event.lane ?? "", /^l\d+$/);
    }
  }
  assert.ok(interrupted > 0, "no seed in 0..39 interrupted a lane");
  // One lane is never interrupted: the only lane is the last active one.
  const single = runElasticLanding({ ...base, lanes: 1, maxLanes: 1, steps: 40, policy: restackFirst });
  assert.equal(single.final.events.filter(event => event.kind === "lane-interrupted").length, 0);
});

test("property: for every seed 0..39 the elastic policy lands every candidate within the serial bound (no starvation) and the queue never exceeds the candidate count", () => {
  for (let seed = 0; seed < 40; seed += 1) {
    const bounds = oracleLoadBounds({ seed, candidates: base.candidates });
    const episode = runElasticLanding({ ...base, seed, steps: bounds.serialSteps, policy: elasticLanes });
    assert.equal(episode.load.feasible, true, `seed ${seed}`);
    assert.deepEqual(episode.load.starved, [], `seed ${seed} starved ${episode.load.starved.join(",")}`);
    assert.equal(episode.load.policyFailure, false);
    assert.ok(episode.load.maxQueue <= base.candidates, `seed ${seed} queue ${episode.load.maxQueue}`);
    for (const step of episode.steps) assert.ok(step.queueLength <= base.candidates);
    assert.equal(episode.steps[0]!.queueLength, base.candidates, "the queue starts as every candidate");
    assert.equal(episode.final.landed.length, base.candidates);
    const completedAt = completionStep(episode);
    for (const step of episode.steps) assert.equal(step.queueLength, base.candidates - episode.final.events.filter(event => event.kind === "landed" && event.step < step.step).length, `seed ${seed} step ${step.step} queue length`);
    assert.ok(completedAt >= bounds.idealSteps, `seed ${seed} finished in ${completedAt}, below the ideal ${bounds.idealSteps}`);
  }
});

test("the elastic policy never finishes later than the fixed one-lane baseline and is strictly earlier on at least one seed", () => {
  let strictlyEarlier = 0;
  for (let seed = 0; seed < 40; seed += 1) {
    const bounds = oracleLoadBounds({ seed, candidates: base.candidates });
    const finish = (policy: ElasticPolicy, lanes: number) => completionStep(runElasticLanding({ ...base, seed, lanes, steps: bounds.serialSteps, policy }));
    const fixed = finish(restackFirst, 1);
    const elastic = finish(elasticLanes, 1);
    assert.ok(fixed > 0 && elastic > 0, `seed ${seed} did not finish`);
    assert.ok(elastic <= fixed, `seed ${seed}: elastic ${elastic} after fixed ${fixed}`);
    if (elastic < fixed) strictlyEarlier += 1;
  }
  assert.ok(strictlyEarlier > 0);
});

test("a scenario no scheduler can finish is reported as LOAD_INFEASIBLE, not as a policy failure; a feasible scenario a policy starves is a policy failure", () => {
  const bounds = oracleLoadBounds({ seed: 7, candidates: 4 });
  assert.ok(bounds.idealSteps < bounds.serialSteps);
  const infeasible = runElasticLanding({ ...base, seed: 7, steps: bounds.idealSteps - 1, policy: elasticLanes });
  assert.equal(infeasible.load.code, "LOAD_INFEASIBLE");
  assert.equal(infeasible.load.feasible, false);
  assert.equal(infeasible.load.policyFailure, false);
  assert.equal(runElasticLanding({ ...base, seed: 7, steps: bounds.idealSteps, policy: elasticLanes }).load.feasible, true, "the boundary itself is feasible");
  assert.ok(infeasible.load.starved.length > 0);
  const feasible = runElasticLanding({ ...base, seed: 7, steps: bounds.serialSteps, policy: elasticLanes });
  assert.equal(feasible.load.code, null);
  const idle = runElasticLanding({ ...base, seed: 7, steps: bounds.serialSteps, policy: scripted("idle", () => []) });
  assert.equal(idle.load.feasible, true);
  assert.equal(idle.load.policyFailure, true);
  assert.deepEqual(idle.load.starved, ["c1", "c2", "c3", "c4"]);
});

test("the load oracle is plain arithmetic over the gate draws: one candidate needs only its attempts, and the ideal never exceeds the serial bound", () => {
  for (let seed = 0; seed < 20; seed += 1) {
    const one = oracleLoadBounds({ seed, candidates: 1 });
    assert.equal(one.idealSteps, one.serialSteps);
    for (const candidates of [2, 3, 4, 5]) {
      const bounds = oracleLoadBounds({ seed, candidates });
      assert.ok(bounds.idealSteps <= bounds.serialSteps);
      assert.equal(bounds.serialSteps - bounds.idealSteps, (candidates * (candidates - 1)) / 2 - (candidates - 1));
    }
  }
});

test("the committed elastic fixture equals the regenerated seed-7 episode byte for byte and its final hash is the digest of its final state", () => {
  const committed = readFileSync(fixturePath, "utf8");
  const bounds = oracleLoadBounds({ seed: 7, candidates: 4 });
  const regenerated = runElasticLanding({ ...base, seed: 7, steps: bounds.serialSteps, policy: elasticLanes });
  assert.equal(committed.trimEnd(), canonicalJson(regenerated));
  const parsed = JSON.parse(committed) as ElasticEpisode;
  assert.equal(parsed.finalHash, digest(parsed.final as ElasticState));
  assert.equal(parsed.mode, "fixture");
});

test("re-reserving a candidate onto a second lane releases its first lane, so another candidate's work runs on the first lane", () => {
  const episode = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 2, maxLanes: 2, steps: 3, policy: scripted("mover", observation => observation.step === 1
    ? [laneIntent("mover", observation, { effect: "lane.reserve", lane: "l1", candidate: "c2", reason: "first" })]
    : observation.step === 2 ? [laneIntent("mover", observation, { effect: "lane.reserve", lane: "l2", candidate: "c2", reason: "move" })]
    : [workIntent("mover", observation, "c3", "restack")]) });
  assert.deepEqual(episode.final.lanes.map(lane => [lane.id, lane.reservedFor]), [["l1", null], ["l2", "c2"]]);
  assert.deepEqual(episode.steps[2]!.events.map(event => [event.kind, event.candidate, event.lane]), [["restacked", "c3", "l1"]]);
});

test("MechanicalWorkflows-9ek7 decision pin: a reservation outlives its candidate's landing, so once c1 lands on its reserved lane, c2's work on that lane is refused LANE_UNAVAILABLE until another lane.reserve changes the holder", () => {
  const episode = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 1, maxLanes: 1, steps: 3, policy: scripted("keeper", observation => observation.step === 1
    ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l1", candidate: "c1", reason: "hold" })]
    : observation.step === 2 ? [workIntent("keeper", observation, "c1", "land")] : [workIntent("keeper", observation, "c2", "restack")]) });
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.equal(episode.final.lanes[0]!.reservedFor, "c1");
  const third = episode.steps[2]!.events;
  assert.deepEqual(third.map(event => [event.kind, event.candidate]), [["refused", "c2"]]);
  assert.match(third[0]!.reason, /^LANE_UNAVAILABLE: no usable lane for c2/);
  const released = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 1, maxLanes: 1, steps: 4, policy: scripted("keeper", observation => observation.step === 1
    ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l1", candidate: "c1", reason: "hold" })]
    : observation.step === 2 ? [workIntent("keeper", observation, "c1", "land")]
    : observation.step === 3 ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l1", candidate: "c2", reason: "release" })]
    : [workIntent("keeper", observation, "c2", "restack")]) });
  assert.equal(released.final.lanes[0]!.reservedFor, "c2");
  assert.deepEqual(released.steps[3]!.events.map(event => [event.kind, event.candidate, event.lane]), [["restacked", "c2", "l1"]]);
});

test("the seed-7 load oracle is pinned by value in TypeScript: idealSteps 8 and serialSteps 11", () => {
  assert.deepEqual(oracleLoadBounds({ seed: 7, candidates: 4 }), { idealSteps: 8, serialSteps: 11 });
});

test("re-reserving one candidate releases only that candidate's lane: another candidate's reservation on a third lane stays in place", () => {
  const episode = runElasticLanding({ ...base, lanes: 3, maxLanes: 3, steps: 3, policy: scripted("keeper", observation => observation.step === 1
    ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l1", candidate: "c1", reason: "hold" })]
    : observation.step === 2 ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l2", candidate: "c2", reason: "first" })]
    : [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l3", candidate: "c2", reason: "move" })]) });
  assert.deepEqual(episode.final.lanes.map(lane => [lane.id, lane.reservedFor]), [["l1", "c1"], ["l2", null], ["l3", "c2"]]);
});

test("MechanicalWorkflows-ppdf decision pin: a lane.route onto a lane whose holder has landed is refused LANE_UNAVAILABLE, so the kept reservation binds routed work as well as unrouted work", () => {
  const episode = runElasticLanding({ ...base, seed: SCENARIO_SEED, lanes: 1, maxLanes: 1, steps: 3, policy: scripted("keeper", observation => observation.step === 1
    ? [laneIntent("keeper", observation, { effect: "lane.reserve", lane: "l1", candidate: "c1", reason: "hold" })]
    : observation.step === 2 ? [workIntent("keeper", observation, "c1", "land")]
    : [laneIntent("keeper", observation, { effect: "lane.route", lane: "l1", candidate: "c2", reason: "steal" }), workIntent("keeper", observation, "c2", "restack")]) });
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.equal(episode.final.lanes[0]!.reservedFor, "c1");
  const third = episode.steps[2]!.events.filter(event => event.kind !== "lane-routed");
  assert.deepEqual(third.map(event => [event.kind, event.candidate, event.lane]), [["refused", "c2", "l1"]]);
  assert.match(third[0]!.reason, /^LANE_UNAVAILABLE: no usable lane for c2 \(routed to l1\)/);
});
