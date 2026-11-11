import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runLandingQueue, fifoLanding, restackFirst, oracleLandedOrder, oracleLandedOrderFor, landingPolicyRule, stateHash, labelEpisode, gateDraws, gateStreamStart, digest, canonicalJson } from "../dist/index.js";
import type { Intent, LandingObservation, LandingQueueEpisode, LandingQueueState, Policy } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(here, "../../../qa/integration/python-consumer/fixtures/landing-queue-seed7.json");
const base = { candidates: 4, lanes: 1, steps: 12 };

test("the fixture is deterministic: one seed gives byte-identical episodes, event histories and final hashes; another seed or an extra candidate changes the hash", () => {
  const a = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  const b = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.finalHash, stateHash(a.final));
  assert.match(a.finalHash, /^sha256:[0-9a-f]{64}$/);
  assert.notEqual(runLandingQueue({ ...base, seed: 8, policy: restackFirst }).finalHash, a.finalHash);
  assert.notEqual(runLandingQueue({ ...base, candidates: 5, seed: 7, policy: restackFirst }).finalHash, a.finalHash);
  assert.equal(a.mode, "fixture");
  assert.equal(a.schema, "mw.landing-queue.fixture.v1");
});

test("fifoLanding reproduces the merge bottleneck: after the first landing every other candidate's base is stale, so it proposes nothing more and at most one candidate lands", () => {
  const episode = runLandingQueue({ ...base, seed: 7, policy: fifoLanding });
  assert.ok(episode.final.landed.length <= 1, `landed ${episode.final.landed.length}`);
  const landedAt = episode.steps.findIndex(step => step.events.some(event => event.kind === "landed"));
  assert.ok(landedAt >= 0, "seed 7 never passed a gate within the step budget");
  for (const step of episode.steps.slice(landedAt + 1)) assert.deepEqual(step.proposed, [], `step ${step.step} proposed after the bottleneck`);
  assert.deepEqual(episode.final.landed, oracleLandedOrder({ ...base, seed: 7, policy: "fifo" }));
});

test("restackFirst restacks a stale candidate before proposing a landing, lands every candidate within the step budget, and agrees with the independent oracle on the landed order", () => {
  const episode = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  assert.equal(episode.final.landed.length, base.candidates);
  assert.deepEqual(episode.final.landed, oracleLandedOrder({ ...base, seed: 7, policy: "restack-first" }));
  const kinds = episode.steps.flatMap(step => step.events.map(event => event.kind));
  assert.ok(kinds.includes("restacked"));
  // Every landing is preceded in its own step by a proposal for that candidate and an admitted intent.
  for (const step of episode.steps) {
    for (const event of step.events.filter(e => e.kind === "landed")) {
      assert.ok(step.proposed.some(id => id.endsWith(`:${event.candidate}`)), `landing of ${event.candidate} without a proposal at step ${step.step}`);
      assert.ok(step.resolution.admitted.some(intent => intent.target.uri === `cand:${event.candidate}`));
    }
  }
});

test("one lane means one landing per step: a second landing intent in the same step is refused by the resolver, never silently committed, and the history records the refusal", () => {
  // A policy that greedily proposes every ready-on-head candidate at once.
  const greedy = { id: "greedy", revision: "g-1", propose: (observation: Parameters<typeof fifoLanding.propose>[0], memory: number) => ({
    intents: observation.ready.filter(c => c.base === observation.head).map(c => ({
      intentId: `greedy:${c.id}`, policyId: "greedy", target: { kind: "candidate", uri: `cand:${c.id}` }, expectedRevision: observation.basis.revision,
      effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [],
    })), memory: memory + 1, trace: [] }) };
  const episode = runLandingQueue({ ...base, seed: 7, steps: 1, policy: greedy });
  const first = episode.steps[0]!;
  assert.equal(first.proposed.length, base.candidates);
  assert.equal(first.resolution.admitted.length, 0, "parallel writers of main must all be refused");
  assert.equal(first.resolution.rejected.filter(r => r.code === "INTENT_WRITE_CONFLICT").length, base.candidates);
  assert.deepEqual(first.resolution.conflicts.map(c => c.scope), ["main"]);
  assert.ok(first.events.some(event => event.kind === "refused" && /INTENT_WRITE_CONFLICT/.test(event.detail)));
  assert.deepEqual(episode.final.landed, []);
  // MWCOL-002 history completeness: every rejected intent reaches the history once, and each names the candidate it refused.
  const refused = first.events.filter(event => event.kind === "refused");
  assert.equal(refused.length, base.candidates);
  assert.deepEqual(refused.map(event => event.candidate).sort(), ["c1", "c2", "c3", "c4"]);
});

test("a fixture episode is labelled fixture and refuses any relabelling with EPISODE_MODE_UPGRADE_FORBIDDEN", () => {
  const episode = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  assert.equal(labelEpisode(episode, "fixture").mode, "fixture");
  for (const mode of ["live", "replay", "live-verified"]) {
    assert.throws(() => labelEpisode(episode, mode), new RegExp(`EPISODE_MODE_UPGRADE_FORBIDDEN: .*${mode}`));
  }
  // The label check is an allowlist: a label nobody listed ("verified", the empty string) is refused as well.
  for (const mode of ["verified", "Fixture", ""]) {
    assert.throws(() => labelEpisode(episode, mode), /EPISODE_MODE_UPGRADE_FORBIDDEN/, `label ${JSON.stringify(mode)}`);
  }
});

test("the committed cross-language fixture equals the regenerated seed-7 episode byte for byte, and its final hash is the digest of its final state", () => {
  const committed = readFileSync(fixturePath, "utf8");
  const regenerated = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  assert.equal(committed.trimEnd(), canonicalJson(regenerated));
  const parsed = JSON.parse(committed) as LandingQueueEpisode;
  assert.equal(parsed.finalHash, digest(parsed.final as LandingQueueState));
});

function intentFor(policyId: string, observation: LandingObservation, candidate: string, over: Partial<Intent>): Intent {
  return {
    intentId: `${policyId}:${candidate}`, policyId, target: { kind: "candidate", uri: `cand:${candidate}` }, expectedRevision: observation.basis.revision,
    effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [`cand:${candidate}`], readScopes: [], ...over,
  };
}

test("the harness threads each policy's memory into its next step: a memoryful policy observes 0, 1, 2 across three steps (MWCOL-001)", () => {
  const seen: number[] = [];
  const counting: Policy<LandingObservation, Intent, number> = {
    id: "counting", revision: "t-1",
    propose(_observation, memory) { seen.push(memory); return { intents: [], memory: memory + 1, trace: [] }; },
  };
  runLandingQueue({ ...base, seed: 7, steps: 3, policy: counting });
  assert.deepEqual(seen, [0, 1, 2]);
});

test("an admitted effect that is neither land nor restack is refused in the history, names its candidate, and changes neither the head nor any base nor the landed list", () => {
  const merger: Policy<LandingObservation, Intent, number> = {
    id: "merger", revision: "t-1",
    propose(observation, memory) { return { intents: [intentFor("merger", observation, "c1", { effect: "merge" })], memory, trace: [] }; },
  };
  const episode = runLandingQueue({ ...base, seed: 7, steps: 1, policy: merger });
  const only = episode.steps[0]!;
  assert.equal(only.resolution.admitted.length, 1, "the resolver admits the intent; the environment is what refuses the effect");
  assert.deepEqual(only.events.map(event => [event.kind, event.candidate]), [["refused", "c1"]]);
  assert.match(only.events[0]!.detail, /effect merge is not a landing-queue effect/);
  assert.deepEqual(episode.final.landed, []);
  assert.equal(episode.final.head, "head-0");
});

test("only candidate-kind targets map to landing candidates: a scope-kind target whose uri says cand:c1 neither lands nor restacks it and spends no gate draw", () => {
  const impostor: Policy<LandingObservation, Intent, number> = {
    id: "impostor", revision: "t-1",
    propose(observation, memory) { return { intents: [intentFor("impostor", observation, "c1", { target: { kind: "scope", uri: "cand:c1" } })], memory, trace: [] }; },
  };
  const episode = runLandingQueue({ ...base, seed: 7, steps: 2, policy: impostor });
  assert.equal(episode.steps[0]!.resolution.admitted.length, 1);
  assert.deepEqual(episode.steps.map(step => step.events), [[], []]);
  assert.deepEqual(episode.final.landed, []);
  assert.deepEqual(episode.final.candidates.map(candidate => candidate.base), ["head-0", "head-0", "head-0", "head-0"]);
});

test("the independent oracle agrees with the harness on every seed, step budget and policy, and the sweep includes gate failures, so an oracle that ignores the gate or spends no step on a restack disagrees somewhere", () => {
  let gateFailures = 0;
  let restacks = 0;
  for (const [policy, label] of [[fifoLanding, "fifo"], [restackFirst, "restack-first"]] as const) {
    for (let seed = 1; seed <= 24; seed += 1) {
      for (let steps = 1; steps <= 10; steps += 1) {
        const episode = runLandingQueue({ ...base, seed, steps, policy });
        gateFailures += episode.final.events.filter(event => event.kind === "gate-failed").length;
        restacks += episode.final.events.filter(event => event.kind === "restacked").length;
        assert.deepEqual(episode.final.landed, oracleLandedOrder({ ...base, seed, steps, policy: label }), `${label} seed ${seed} steps ${steps}`);
      }
    }
  }
  assert.ok(gateFailures > 0, "the sweep never drew a red gate verdict");
  assert.ok(restacks > 0, "the sweep never restacked");
});

test("a restack spends its whole step: with one lane the first landing of restack-first happens no earlier than the step after the first restack's step", () => {
  const episode = runLandingQueue({ ...base, seed: 7, policy: restackFirst });
  for (const step of episode.steps) {
    const kinds = step.events.map(event => event.kind);
    assert.ok(!(kinds.includes("restacked") && (kinds.includes("landed") || kinds.includes("gate-failed"))), `step ${step.step} restacked and landed together`);
  }
});

test("gateDraws is a public, deterministic xorshift source: one seed gives one sequence of unsigned 32-bit integers, other seeds give other sequences, and both seed 0 and the zero-state seed 0x61c88647 still produce non-zero draws", () => {
  const take = (seed: number, n: number): number[] => { const draw = gateDraws(seed); return Array.from({ length: n }, () => draw()); };
  assert.deepEqual(take(7, 8), take(7, 8));
  assert.notDeepEqual(take(7, 8), take(8, 8));
  for (const value of take(7, 64)) assert.ok(Number.isInteger(value) && value >= 0 && value <= 0xffffffff, `draw ${value}`);
  assert.ok(take(0, 8).some(value => value !== 0));
  // 0x61c88647 is the one seed whose finalised state is 0 (the splitmix32 finaliser maps it to 0): only the `|| 1` zero-state guard keeps xorshift32 off its absorbing zero state. It starts where 0x6f2a7a53, the seed whose finalised state is 1, starts.
  assert.equal(gateStreamStart(0x61c88647), 1);
  assert.equal(gateStreamStart(0x6f2a7a53), 1);
  assert.deepEqual(take(0x61c88647, 8), take(0x6f2a7a53, 8));
  assert.ok(take(0x61c88647, 8).every(value => value !== 0), "the zero-state seed must not collapse to an all-zero sequence");
  // The finaliser is a bijection on uint32: apart from that one pair, distinct seeds start distinct streams.
  const starts = new Set(Array.from({ length: 4096 }, (_, seed) => gateStreamStart(seed)));
  assert.equal(starts.size, 4096);
  // Every start is an unsigned 32-bit integer in 1..0xffffffff (the zero state is remapped to 1), so the export never returns the int32 view of a start with bit 31 set.
  for (const start of starts) assert.ok(Number.isInteger(start) && start >= 1 && start <= 0xffffffff, `start ${start}`);
  // Cross-language pin: seed 0 starts at 2462723854 (bit 31 set), the value the python mirror records in qa/integration/python-consumer/test_elastic_landing_fixture.py, so both languages pin one start.
  assert.equal(gateStreamStart(0), 2462723854);
  // The environment consumes exactly this sequence: the first draw of seed 7 decides the first landing.
  const first = gateDraws(7)();
  const episode = runLandingQueue({ ...base, seed: 7, steps: 1, policy: fifoLanding });
  assert.equal(episode.steps[0]!.events[0]!.kind, first % 4 !== 0 ? "landed" : "gate-failed");
});

test("gateDraws mixes the whole seed: the first draws of seeds 0..7 land in at least three distinct deciles instead of clustering on one value", () => {
  const firsts = Array.from({ length: 8 }, (_, seed) => gateDraws(seed)() / 4294967296);
  const deciles = new Set(firsts.map(u => Math.floor(u * 10)));
  assert.ok(deciles.size >= 3, `first draws of seeds 0..7 sit in ${deciles.size} decile(s): ${firsts.map(u => u.toFixed(3)).join(" ")}`);
});

test("lanes sets the per-step admission budget: two disjoint restacks are both admitted with two lanes and the second is refused for budget with one lane", () => {
  const twoRestacks: Policy<LandingObservation, Intent, number> = {
    id: "two-restacks", revision: "t-1",
    propose(observation, memory) { return { intents: ["c2", "c3"].map(id => intentFor("two-restacks", observation, id, { effect: "restack" })), memory, trace: [] }; },
  };
  const wide = runLandingQueue({ ...base, lanes: 2, seed: 7, steps: 1, policy: twoRestacks }).steps[0]!;
  assert.deepEqual(wide.resolution.admitted.map(intent => intent.intentId), ["two-restacks:c2", "two-restacks:c3"]);
  assert.deepEqual(wide.resolution.rejected, []);
  const narrow = runLandingQueue({ ...base, lanes: 1, seed: 7, steps: 1, policy: twoRestacks }).steps[0]!;
  assert.deepEqual(narrow.resolution.admitted.map(intent => intent.intentId), ["two-restacks:c2"]);
  assert.deepEqual(narrow.resolution.rejected.map(rejection => rejection.code), ["INTENT_BUDGET_EXCEEDED"]);
});

test("a restack rebases onto the head as moved by an earlier landing in the same step: land c1 then restack c2 with two lanes leaves c2 based on head-1, not on the step-start head", () => {
  assert.notEqual(gateDraws(1)() % 4, 0, "seed 1's first gate draw must pass (gateDraws finalises the seed, so seed 7's first draw is a red verdict) for this scenario");
  const landThenRestack: Policy<LandingObservation, Intent, number> = {
    id: "land-then-restack", revision: "t-1",
    propose(observation, memory) {
      return { intents: [
        intentFor("land-then-restack", observation, "c1", { effect: "land", writeScopes: ["main"] }),
        intentFor("land-then-restack", observation, "c2", { effect: "restack" }),
      ], memory, trace: [] };
    },
  };
  const episode = runLandingQueue({ ...base, lanes: 2, seed: 1, steps: 1, policy: landThenRestack });
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.equal(episode.final.head, "head-1");
  assert.equal(episode.final.candidates.find(candidate => candidate.id === "c2")!.base, "head-1");
  assert.deepEqual(episode.final.candidates.filter(candidate => candidate.id !== "c2").map(candidate => candidate.base), ["head-0", "head-0", "head-0"]);
});

function alwaysLand(candidate: string, effect: "land" | "restack" = "land"): Policy<LandingObservation, Intent, number> {
  const id = `always-${effect}-${candidate}`;
  return { id, revision: "t-1", propose(observation, memory) { return { intents: [intentFor(id, observation, candidate, { effect, writeScopes: effect === "land" ? ["main"] : [`cand:${candidate}`] })], memory: memory + 1, trace: [] }; } };
}

test("a land intent for a candidate outside the ready set is refused and draws nothing: always-land-c99 lands nothing, records a refusal naming c99 each step, and never reports a gate verdict (MWPLOA-1)", () => {
  for (const seed of [1, 2, 3, 4]) {
    const episode = runLandingQueue({ candidates: 2, lanes: 1, seed, steps: 6, policy: alwaysLand("c99") });
    assert.deepEqual(episode.final.landed, [], `seed ${seed}`);
    assert.equal(episode.final.head, "head-0", `seed ${seed}`);
    const kinds = episode.steps.flatMap(step => step.events.map(event => [event.kind, event.candidate]));
    assert.deepEqual(kinds, Array.from({ length: 6 }, () => ["refused", "c99"]), `seed ${seed}`);
    for (const step of episode.steps) assert.match(step.events[0]!.detail, /c99 is not in the ready set/);
  }
});

test("a land intent for an already landed candidate is refused: always-land-c1 lands c1 exactly once, agrees with the oracle's first landing, and every later step records a refusal instead of a second landing (MWPLOA-2)", () => {
  for (const seed of [1, 2, 3, 4]) {
    const episode = runLandingQueue({ candidates: 2, lanes: 1, seed, steps: 6, policy: alwaysLand("c1") });
    const landedEvents = episode.steps.flatMap(step => step.events).filter(event => event.kind === "landed");
    assert.ok(landedEvents.length <= 1, `seed ${seed} landed c1 ${landedEvents.length} times`);
    assert.deepEqual(episode.final.landed, landedEvents.map(event => event.candidate), `seed ${seed}`);
    const oracle = oracleLandedOrder({ candidates: 2, seed, steps: 6, policy: "fifo" });
    assert.deepEqual(episode.final.landed, oracle.slice(0, 1).filter(id => id === "c1"), `seed ${seed}`);
    if (landedEvents.length === 1) {
      const landedStep = episode.steps.findIndex(step => step.events.some(event => event.kind === "landed"));
      for (const step of episode.steps.slice(landedStep + 1)) {
        assert.deepEqual(step.events.map(event => [event.kind, event.candidate]), [["refused", "c1"]], `seed ${seed} step ${step.step}`);
        assert.match(step.events[0]!.detail, /c1 is not in the ready set/);
      }
      assert.equal(episode.final.head, "head-1", `seed ${seed}`);
    }
  }
});

test("a restack intent for a landed or unknown candidate is refused too and changes no base (MWPLOA-3)", () => {
  const unknown = runLandingQueue({ candidates: 2, lanes: 1, seed: 1, steps: 2, policy: alwaysLand("c99", "restack") });
  assert.deepEqual(unknown.steps.flatMap(step => step.events.map(event => [event.kind, event.candidate])), [["refused", "c99"], ["refused", "c99"]]);
  assert.deepEqual(unknown.final.candidates.map(candidate => candidate.base), ["head-0", "head-0"]);
  const landFirstThenRestack: Policy<LandingObservation, Intent, number> = {
    id: "land-then-restack-landed", revision: "t-1",
    propose(observation, memory) {
      const target = "c1";
      return { intents: [intentFor("land-then-restack-landed", observation, target, observation.ready.some(c => c.id === "c1") ? { effect: "land", writeScopes: ["main"] } : { effect: "restack", writeScopes: ["cand:c1"] })], memory: memory + 1, trace: [] };
    },
  };
  assert.notEqual(gateDraws(1)() % 4, 0, "seed 1's first gate draw must pass (gateDraws finalises the seed, so seed 7's first draw is a red verdict) for this scenario");
  const episode = runLandingQueue({ candidates: 2, lanes: 1, seed: 1, steps: 2, policy: landFirstThenRestack });
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.deepEqual(episode.steps[1]!.events.map(event => [event.kind, event.candidate]), [["refused", "c1"]]);
  assert.equal(episode.final.candidates.find(candidate => candidate.id === "c1")!.base, "head-0");
});

test("a refused land spends no gate draw, so the runner keeps agreeing with the independent oracle under a policy that alternates a refused land of c99 with a land of the first ready on-head candidate, seeds 1 to 12 and every step budget up to 8 (X1, MWPLOA-1 successor)", () => {
  // Even memory proposes the unknown c99 (refused, must draw nothing); odd memory lands the first ready candidate whose base is the head.
  const alternating: Policy<LandingObservation, Intent, number> = {
    id: "alternating-refused-land", revision: "t-1",
    propose(observation, memory) {
      const onHead = observation.ready.find(candidate => candidate.base === observation.head);
      const target = memory % 2 === 0 ? "c99" : onHead?.id;
      const intents = target === undefined ? [] : [intentFor("alternating-refused-land", observation, target, { effect: "land", writeScopes: ["main"] })];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  let refusals = 0;
  let landings = 0;
  // Every step budget from 1 to 8 counts: with the full 8 steps a retry after a stolen draw hides the theft, so only the shorter budgets expose it.
  for (let seed = 1; seed <= 12; seed += 1) {
    for (let steps = 1; steps <= 8; steps += 1) {
      const run = { seed, candidates: 3, lanes: 1, steps };
      const episode = runLandingQueue({ ...run, policy: alternating });
      const events = episode.steps.flatMap(step => step.events);
      refusals += events.filter(event => event.kind === "refused" && event.candidate === "c99").length;
      landings += events.filter(event => event.kind === "landed").length;
      assert.deepEqual(episode.final.landed, oracleLandedOrderFor(run, landingPolicyRule(alternating, run)), `seed ${seed} steps ${steps}`);
    }
  }
  assert.ok(refusals > 0, "the sweep never refused a land");
  assert.ok(landings > 0, "the sweep never landed a candidate, so no draw could be stolen from it");
});

test("the ready-set guard reads the step-local landed list: land c1 then restack c1 in one step records landed then refused, and c1's base stays head-0 instead of moving to head-1 (X2)", () => {
  assert.notEqual(gateDraws(1)() % 4, 0, "seed 1's first gate draw must pass (gateDraws finalises the seed, so seed 7's first draw is a red verdict) for this scenario");
  const landThenRestackSame: Policy<LandingObservation, Intent, number> = {
    id: "land-then-restack-same", revision: "t-1",
    propose(observation, memory) {
      return { intents: [
        intentFor("land-then-restack-same", observation, "c1", { intentId: "land-then-restack-same:land:c1", effect: "land", writeScopes: ["main"] }),
        intentFor("land-then-restack-same", observation, "c1", { intentId: "land-then-restack-same:restack:c1", effect: "restack", writeScopes: ["cand:c1"], readScopes: [] }),
      ], memory, trace: [] };
    },
  };
  const episode = runLandingQueue({ ...base, lanes: 2, seed: 1, steps: 1, policy: landThenRestackSame });
  const only = episode.steps[0]!;
  assert.equal(only.resolution.admitted.length, 2, "the resolver admits both intents; the environment's ready-set guard is what refuses the second");
  assert.deepEqual(only.events.map(event => [event.kind, event.candidate]), [["landed", "c1"], ["refused", "c1"]]);
  assert.match(only.events[1]!.detail, /c1 is not in the ready set; restack refused/);
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.equal(episode.final.head, "head-1");
  assert.equal(episode.final.candidates.find(candidate => candidate.id === "c1")!.base, "head-0");
});

test("a refused restack spends no gate draw: the runner keeps agreeing with the independent oracle under a policy that alternates a refused restack of unknown c99 with a land of the first ready on-head candidate, seeds 1 to 12 and every step budget up to 8 (G1)", () => {
  // Even memory proposes a restack of the unknown c99 (refused, must draw nothing); odd memory lands the first ready candidate whose base is the head.
  const alternating: Policy<LandingObservation, Intent, number> = {
    id: "alternating-refused-restack", revision: "t-1",
    propose(observation, memory) {
      const onHead = observation.ready.find(candidate => candidate.base === observation.head);
      const intents = memory % 2 === 0
        ? [intentFor("alternating-refused-restack", observation, "c99", { effect: "restack", writeScopes: ["cand:c99"] })]
        : onHead === undefined ? [] : [intentFor("alternating-refused-restack", observation, onHead.id, { effect: "land", writeScopes: ["main"] })];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  let refusedRestacks = 0;
  let landingsAfterRefusal = 0;
  // The short budgets matter: with the full 8 steps a retry after a stolen draw can hide the theft.
  for (let seed = 1; seed <= 12; seed += 1) {
    for (let steps = 1; steps <= 8; steps += 1) {
      const run = { seed, candidates: 3, lanes: 1, steps };
      const episode = runLandingQueue({ ...run, policy: alternating });
      const events = episode.steps.flatMap(step => step.events);
      const firstRefusal = events.findIndex(event => event.kind === "refused" && event.candidate === "c99");
      refusedRestacks += events.filter(event => event.kind === "refused" && event.candidate === "c99" && /restack refused/.test(event.detail)).length;
      if (firstRefusal >= 0) landingsAfterRefusal += events.slice(firstRefusal).filter(event => event.kind === "landed").length;
      assert.deepEqual(episode.final.landed, oracleLandedOrderFor(run, landingPolicyRule(alternating, run)), `seed ${seed} steps ${steps}`);
    }
  }
  assert.ok(refusedRestacks > 0, "the sweep never refused a restack");
  assert.ok(landingsAfterRefusal > 0, "the sweep never landed a candidate after a refusal, so no draw could be stolen from it");
});

test("a refused land of an already landed candidate spends no gate draw: the runner keeps agreeing with the oracle under a policy that lands c1, then alternates a refused land of landed c1 with a live land, seeds 1 to 12 and every step budget up to 8 (G2)", () => {
  // While c1 is ready the policy lands it; once c1 has landed, even memory re-proposes c1 (known but landed, refused, must draw nothing) and odd memory lands the first ready candidate.
  const relandThenLive: Policy<LandingObservation, Intent, number> = {
    id: "reland-then-live", revision: "t-1",
    propose(observation, memory) {
      const c1Ready = observation.ready.some(candidate => candidate.id === "c1");
      const target = c1Ready || memory % 2 === 0 ? "c1" : observation.ready[0]?.id;
      const intents = target === undefined ? [] : [intentFor("reland-then-live", observation, target, { effect: "land", writeScopes: ["main"] })];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  let refusedLanded = 0;
  let landingsAfterRefusal = 0;
  for (let seed = 1; seed <= 12; seed += 1) {
    for (let steps = 1; steps <= 8; steps += 1) {
      const run = { seed, candidates: 3, lanes: 1, steps };
      const episode = runLandingQueue({ ...run, policy: relandThenLive });
      const events = episode.steps.flatMap(step => step.events);
      const firstRefusal = events.findIndex(event => event.kind === "refused" && event.candidate === "c1");
      refusedLanded += events.filter(event => event.kind === "refused" && event.candidate === "c1" && /land refused/.test(event.detail)).length;
      if (firstRefusal >= 0) landingsAfterRefusal += events.slice(firstRefusal).filter(event => event.kind === "landed").length;
      assert.deepEqual(episode.final.landed, oracleLandedOrderFor(run, landingPolicyRule(relandThenLive, run)), `seed ${seed} steps ${steps}`);
    }
  }
  assert.ok(refusedLanded > 0, "the sweep never refused a land of a landed candidate");
  assert.ok(landingsAfterRefusal > 0, "the sweep never landed a candidate after a refusal, so no draw could be stolen from it");
});

test("the ready-set guard reads the step-local landed list for land intents too: land c1 then land c1 again in one step records landed then refused, with one landing, head-1 and no second gate draw (G3)", () => {
  assert.notEqual(gateDraws(1)() % 4, 0, "seed 1's first gate draw must pass (gateDraws finalises the seed, so seed 7's first draw is a red verdict) for this scenario");
  const landTwice: Policy<LandingObservation, Intent, number> = {
    id: "land-twice", revision: "t-1",
    propose(observation, memory) {
      return { intents: [
        intentFor("land-twice", observation, "c1", { intentId: "land-twice:first:c1", effect: "land", writeScopes: ["main"] }),
        intentFor("land-twice", observation, "c1", { intentId: "land-twice:second:c1", effect: "land", writeScopes: ["cand:c1"], readScopes: [] }),
      ], memory, trace: [] };
    },
  };
  const episode = runLandingQueue({ ...base, lanes: 2, seed: 1, steps: 1, policy: landTwice });
  const only = episode.steps[0]!;
  assert.equal(only.resolution.admitted.length, 2, "the resolver admits both intents; the environment's ready-set guard is what refuses the second");
  assert.deepEqual(only.events.map(event => [event.kind, event.candidate]), [["landed", "c1"], ["refused", "c1"]]);
  assert.match(only.events[1]!.detail, /c1 is not in the ready set; land refused/);
  assert.deepEqual(episode.final.landed, ["c1"]);
  assert.equal(episode.final.head, "head-1");
});

test("a refused restack of an already landed candidate spends no gate draw: the runner keeps agreeing with the oracle under a policy that lands c1, then alternates a refused restack of landed c1 with a live land, seeds 1 to 12 and every step budget up to 8 (N2)", () => {
  // While c1 is ready the policy lands it; once c1 has landed, even memory restacks c1 (known but landed, refused, must draw nothing) and odd memory lands the first ready candidate.
  const restackLandedThenLive: Policy<LandingObservation, Intent, number> = {
    id: "restack-landed-then-live", revision: "t-1",
    propose(observation, memory) {
      const c1Ready = observation.ready.some(candidate => candidate.id === "c1");
      const target = c1Ready || memory % 2 === 0 ? "c1" : observation.ready[0]?.id;
      const over: Partial<Intent> = target === "c1" && !c1Ready ? { effect: "restack", writeScopes: ["cand:c1"] } : { effect: "land", writeScopes: ["main"] };
      const intents = target === undefined ? [] : [intentFor("restack-landed-then-live", observation, target, over)];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  let refusedRestacks = 0;
  let landingsAfterRefusal = 0;
  // The short budgets matter: with the full 8 steps a retry after a stolen draw can hide the theft.
  for (let seed = 1; seed <= 12; seed += 1) {
    for (let steps = 1; steps <= 8; steps += 1) {
      const run = { seed, candidates: 3, lanes: 1, steps };
      const episode = runLandingQueue({ ...run, policy: restackLandedThenLive });
      const events = episode.steps.flatMap(step => step.events);
      const firstRefusal = events.findIndex(event => event.kind === "refused" && event.candidate === "c1");
      refusedRestacks += events.filter(event => event.kind === "refused" && event.candidate === "c1" && /c1 is not in the ready set; restack refused/.test(event.detail)).length;
      if (firstRefusal >= 0) landingsAfterRefusal += events.slice(firstRefusal).filter(event => event.kind === "landed").length;
      assert.deepEqual(episode.final.landed, oracleLandedOrderFor(run, landingPolicyRule(restackLandedThenLive, run)), `seed ${seed} steps ${steps}`);
    }
  }
  assert.ok(refusedRestacks > 0, "the sweep never refused a restack of a landed candidate");
  assert.ok(landingsAfterRefusal > 0, "the sweep never landed a candidate after a refusal, so no draw could be stolen from it");
});

test("the second land of c1 refused in the step that landed c1 spends no gate draw: with two lanes, land c1 twice in step 1 and land c2 in step 2, and c2's verdict is the seed's second draw, for every seed 1 to 40 whose first draw passes (N1)", () => {
  const landTwiceThenNext: Policy<LandingObservation, Intent, number> = {
    id: "land-twice-then-next", revision: "t-1",
    propose(observation, memory) {
      const intents = memory === 0
        ? [intentFor("land-twice-then-next", observation, "c1", { intentId: "land-twice-then-next:first:c1", effect: "land", writeScopes: ["main"] }),
           intentFor("land-twice-then-next", observation, "c1", { intentId: "land-twice-then-next:second:c1", effect: "land", writeScopes: ["cand:c1"], readScopes: [] })]
        : [intentFor("land-twice-then-next", observation, "c2", { effect: "land", writeScopes: ["main"] })];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  let usable = 0;
  let observable = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const draw = gateDraws(seed);
    const first = draw() % 4 !== 0;
    const second = draw() % 4 !== 0;
    const third = draw() % 4 !== 0;
    if (!first) continue;
    usable += 1;
    // A seed whose second and third draws differ is one where a stolen draw would flip c2's verdict.
    if (second !== third) observable += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 2, seed, steps: 2, policy: landTwiceThenNext });
    assert.equal(episode.steps[0]!.resolution.admitted.length, 2, `seed ${seed}: the resolver admits both step-1 intents`);
    assert.deepEqual(episode.steps[0]!.events.map(event => [event.kind, event.candidate]), [["landed", "c1"], ["refused", "c1"]], `seed ${seed}`);
    assert.deepEqual(episode.final.landed, second ? ["c1", "c2"] : ["c1"], `seed ${seed}: c2's verdict must be the second draw`);
  }
  assert.ok(usable > 0 && observable > 0, `the sweep must hold a seed whose second and third draws disagree (usable ${usable}, observable ${observable})`);
});

// Shared shape of the four refusal-draw rows (yh4y X01..X04): the first step holds a refusal, the second step lands `live`, and the live verdict must be the first live draw of the seed, i.e. the refusal spent no draw.
function refusalThenLive(id: string, refusal: (observation: LandingObservation) => Intent[], live: string, lanes: number): Policy<LandingObservation, Intent, number> {
  return {
    id, revision: "t-1",
    propose(observation, memory) {
      const intents = memory === 0 ? refusal(observation) : [intentFor(id, observation, live, { effect: "land", writeScopes: ["main"] })];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
}

function verdicts(seed: number, count: number): boolean[] {
  const draw = gateDraws(seed);
  return Array.from({ length: count }, () => gatePassesFor(draw()));
}

function gatePassesFor(value: number): boolean {
  return value % 4 !== 0;
}

test("a restack of c1 refused in the step that landed c1 spends no gate draw: with two lanes, land c1 then restack c1 in step 1 and land c2 in step 2, and c2's verdict is the seed's second draw, for every seed 1 to 40 whose first draw passes (X01)", () => {
  const id = "land-restack-same-then-next";
  const policy = refusalThenLive(id, observation => [
    intentFor(id, observation, "c1", { intentId: `${id}:land:c1`, effect: "land", writeScopes: ["main"] }),
    intentFor(id, observation, "c1", { intentId: `${id}:restack:c1`, effect: "restack", writeScopes: ["cand:c1"], readScopes: [] }),
  ], "c2", 2);
  let usable = 0;
  let observable = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const [first, second, third] = verdicts(seed, 3) as [boolean, boolean, boolean];
    if (!first) continue;
    usable += 1;
    // A seed whose second and third draws differ is one where a stolen draw would flip c2's verdict.
    if (second !== third) observable += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 2, seed, steps: 2, policy });
    assert.deepEqual(episode.steps[0]!.events.map(event => [event.kind, event.candidate]), [["landed", "c1"], ["refused", "c1"]], `seed ${seed}`);
    assert.match(episode.steps[0]!.events[1]!.detail, /c1 is not in the ready set; restack refused/, `seed ${seed}`);
    assert.deepEqual(episode.final.landed, second ? ["c1", "c2"] : ["c1"], `seed ${seed}: c2's verdict must be the second draw`);
  }
  assert.ok(usable > 0 && observable > 0, `the sweep must hold a seed whose second and third draws disagree (usable ${usable}, observable ${observable})`);
});

test("a scope-kind target whose uri says cand:c1 spends no gate draw before a live land: refuse it in step 1, land c1 in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (X02)", () => {
  const id = "scope-impostor-then-land";
  const policy = refusalThenLive(id, observation => [intentFor(id, observation, "c1", { target: { kind: "scope", uri: "cand:c1" } })], "c1", 1);
  let observable = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const [first, second] = verdicts(seed, 2) as [boolean, boolean];
    // A seed whose first and second draws differ is one where a stolen draw would flip c1's verdict.
    if (first !== second) observable += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 1, seed, steps: 2, policy });
    assert.deepEqual(episode.steps[0]!.events, [], `seed ${seed}: the impostor target produces no event`);
    assert.deepEqual(episode.final.landed, first ? ["c1"] : [], `seed ${seed}: c1's verdict must be the first draw`);
  }
  assert.ok(observable > 0, `the sweep must hold a seed whose first and second draws disagree (observable ${observable})`);
});

test("an admitted non-queue effect spends no gate draw before a live land: merge c1 in step 1, land c1 in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (X03)", () => {
  const id = "merge-then-land";
  const policy = refusalThenLive(id, observation => [intentFor(id, observation, "c1", { effect: "merge" })], "c1", 1);
  let observable = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const [first, second] = verdicts(seed, 2) as [boolean, boolean];
    if (first !== second) observable += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 1, seed, steps: 2, policy });
    assert.deepEqual(episode.steps[0]!.events.map(event => [event.kind, event.candidate]), [["refused", "c1"]], `seed ${seed}`);
    assert.match(episode.steps[0]!.events[0]!.detail, /effect merge is not a landing-queue effect/, `seed ${seed}`);
    assert.deepEqual(episode.final.landed, first ? ["c1"] : [], `seed ${seed}: c1's verdict must be the first draw`);
  }
  assert.ok(observable > 0, `the sweep must hold a seed whose first and second draws disagree (observable ${observable})`);
});

test("resolver rejections spend no gate draw: two writers of main in step 1 are both refused with INTENT_WRITE_CONFLICT, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (X04)", () => {
  const id = "two-writers-then-land";
  const policy = refusalThenLive(id, observation => ["c1", "c2"].map(candidate => intentFor(id, observation, candidate, { intentId: `${id}:${candidate}`, effect: "land", writeScopes: ["main"] })), "c1", 1);
  let observableSecond = 0;
  let observableThird = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const [first, second, third] = verdicts(seed, 3) as [boolean, boolean, boolean];
    // A stolen draw per rejected intent would shift c1's verdict to the second draw (one theft) or the third (two thefts).
    if (first !== second) observableSecond += 1;
    if (first !== third) observableThird += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 1, seed, steps: 2, policy });
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => rejection.code), ["INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"], `seed ${seed}`);
    assert.deepEqual(stepOne.resolution.admitted, [], `seed ${seed}`);
    assert.deepEqual(episode.final.landed, first ? ["c1"] : [], `seed ${seed}: c1's verdict must be the first draw`);
  }
  assert.ok(observableSecond > 0 && observableThird > 0, `the sweep must expose one and two stolen draws (second ${observableSecond}, third ${observableThird})`);
});

// Shared sweep of the terminal refusal-draw rows (hctf Y01..Y06): `refusal` holds the step-1 shape under test, step 2 lands c1 through refusalThenLive,
// and c1's verdict must be the seed's first draw for every seed 1..40, i.e. nothing in step 1 spent a draw.
function assertRefusalSpendsNoDraw(id: string, refusal: (observation: LandingObservation) => Intent[], inspect: (episode: LandingQueueEpisode, seed: number) => void): void {
  const policy = refusalThenLive(id, refusal, "c1", 1);
  let observable = 0;
  for (let seed = 1; seed <= 40; seed += 1) {
    const [first, second] = verdicts(seed, 2) as [boolean, boolean];
    // A seed whose first and second draws differ is one where a stolen draw would flip c1's verdict.
    if (first !== second) observable += 1;
    const episode = runLandingQueue({ candidates: 3, lanes: 1, seed, steps: 2, policy });
    inspect(episode, seed);
    assert.deepEqual(episode.final.landed, first ? ["c1"] : [], `seed ${seed}: c1's verdict must be the first draw`);
  }
  assert.ok(observable > 0, `the sweep must hold a seed whose first and second draws disagree (observable ${observable})`);
}

test("a budget rejection spends no gate draw before a live land: restack c2 and c3 on one lane so c3 is refused INTENT_BUDGET_EXCEEDED, land c1 in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y01)", () => {
  const id = "budget-refusal-then-land";
  assertRefusalSpendsNoDraw(id, observation => ["c2", "c3"].map(candidate => intentFor(id, observation, candidate, { effect: "restack", readScopes: [] })), (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => [rejection.code, rejection.intent.intentId]), [["INTENT_BUDGET_EXCEEDED", `${id}:c3`]], `seed ${seed}`);
    assert.deepEqual(stepOne.resolution.admitted.map(intent => intent.intentId), [`${id}:c2`], `seed ${seed}`);
  });
});

test("a stale-revision rejection spends no gate draw before a live land: a land of c1 carrying a stale expectedRevision beside an admitted restack of c2 is refused INTENT_BASIS_STALE, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y02)", () => {
  const id = "stale-refusal-then-land";
  assertRefusalSpendsNoDraw(id, observation => [
    intentFor(id, observation, "c1", { effect: "land", writeScopes: ["main"], expectedRevision: "head-stale" }),
    intentFor(id, observation, "c2", { effect: "restack", readScopes: [] }),
  ], (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => [rejection.code, rejection.intent.intentId]), [["INTENT_BASIS_STALE", `${id}:c1`]], `seed ${seed}`);
    assert.deepEqual(stepOne.resolution.admitted.map(intent => intent.intentId), [`${id}:c2`], `seed ${seed}`);
  });
});

test("a candidate-kind target whose uri lacks the cand: prefix spends no gate draw before a live land: lane:c1 is admitted and produces no event, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y03)", () => {
  const id = "prefixless-uri-then-land";
  assertRefusalSpendsNoDraw(id, observation => [intentFor(id, observation, "c1", { target: { kind: "candidate", uri: "lane:c1" } })], (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected, [], `seed ${seed}`);
    assert.equal(stepOne.resolution.admitted.length, 1, `seed ${seed}: the resolver admits the prefixless target`);
    assert.deepEqual(stepOne.events, [], `seed ${seed}: the prefixless target produces no event`);
  });
});

test("a duplicate intent id spends no gate draw before a live land: the second of two restacks of c2 sharing one intentId is refused INTENT_DUPLICATE, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y04)", () => {
  const id = "duplicate-refusal-then-land";
  assertRefusalSpendsNoDraw(id, observation => [
    intentFor(id, observation, "c2", { intentId: `${id}:twin`, effect: "restack", readScopes: [] }),
    intentFor(id, observation, "c2", { intentId: `${id}:twin`, effect: "restack", readScopes: [] }),
  ], (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => [rejection.code, rejection.intent.intentId]), [["INTENT_DUPLICATE", `${id}:twin`]], `seed ${seed}`);
    assert.equal(stepOne.resolution.admitted.length, 1, `seed ${seed}`);
  });
});

test("an authority-exceeding intent spends no gate draw before a live land: an authorized-effect restack of c2 is refused INTENT_AUTHORITY_EXCEEDED, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y05)", () => {
  const id = "authority-refusal-then-land";
  assertRefusalSpendsNoDraw(id, observation => [intentFor(id, observation, "c2", { effect: "restack", readScopes: [], authority: "authorized-effect" })], (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => [rejection.code, rejection.intent.intentId]), [["INTENT_AUTHORITY_EXCEEDED", `${id}:c2`]], `seed ${seed}`);
    assert.deepEqual(stepOne.resolution.admitted, [], `seed ${seed}`);
  });
});

test("an invalid claim spends no gate draw before a live land: a restack of c2 claiming NaN compute is refused INTENT_CLAIM_INVALID, c1 lands in step 2, and c1's verdict is the seed's first draw, for every seed 1 to 40 (Y06)", () => {
  const id = "claim-refusal-then-land";
  assertRefusalSpendsNoDraw(id, observation => [intentFor(id, observation, "c2", { effect: "restack", readScopes: [], claim: { compute: Number.NaN, workers: 1, queue: 1, latencyMs: 1 } })], (episode, seed) => {
    const stepOne = episode.steps[0]!;
    assert.deepEqual(stepOne.resolution.rejected.map(rejection => [rejection.code, rejection.intent.intentId]), [["INTENT_CLAIM_INVALID", `${id}:c2`]], `seed ${seed}`);
    assert.deepEqual(stepOne.resolution.admitted, [], `seed ${seed}`);
  });
});
