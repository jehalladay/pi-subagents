// MechanicalWorkflows-mexr (ny4a ruling): the reference oracles speak the runner's refusal
// vocabulary and model the resolver's write-scope interference, so a code-reading policy gets
// the same verdict from oracle and runner (reference-oracles.ts L100 parity doc), a conflicted
// multi-intent proposal is refused like the runner refuses it, and a clean survivor still lands.
import test from "node:test";
import assert from "node:assert/strict";
import {
  DECIDED_CODE, oracleLandedOrderFor, landingPolicyRule, oracleQuorumFor, quorumPolicyRule,
  runLandingQueue, runQuorumEvidence,
} from "../dist/index.js";
import type { Policy, Intent, LandingObservation, QuorumObservation, LandingOracleRun, QuorumOracleRun } from "../dist/index.js";

const seeds = [1, 2, 3, 5, 7, 11, 13, 17];

const quorumIntent = (observation: QuorumObservation, effect: "inspect" | "abstain", id: string, tag: string): Intent => ({
  intentId: `parity:${effect}:${id}:${tag}`, policyId: "parity", target: { kind: "candidate", uri: `cand:${id}` },
  expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
  evidenceRefs: [], writeScopes: [`cand:${id}`], readScopes: [],
});

test("F2 parity: a code-reading policy keyed on the runner's decided-refusal code gets the same verdict from oracle and runner", () => {
  const codeReading: Policy<QuorumObservation, Intent, number> = {
    id: "code-reading", revision: "scripted-1",
    propose(observation, memory) {
      // Hammers c1 until the refusal vocabulary says it is already decided; ONLY the runner's
      // exact code moves it on, so a divergent oracle spelling changes the whole verdict.
      const moved = observation.lastRefusals.some(r => r.candidate === "c1" && r.code === "CANDIDATE_ALREADY_DECIDED");
      const target = moved ? observation.candidates.find(c => c.decision === null) : observation.candidates.find(c => c.id === "c1" ) ?? null;
      const intents: Intent[] = target === undefined || target === null ? [] : [quorumIntent(observation, "abstain", target.id, "solo")];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  for (const seed of seeds) {
    const run: QuorumOracleRun = { seed, candidates: 4, reviewers: 3, steps: 12, budget: 12, gate: "authoritative" };
    const verdict = oracleQuorumFor(run, quorumPolicyRule(codeReading, run));
    const episode = runQuorumEvidence({ seed, candidates: 4, reviewers: 3, steps: 12, budget: 12, gate: "authoritative", policy: codeReading });
    const runnerAbstained = episode.final.candidates.flatMap(c => c.decision === "abstained" ? [c.id] : []);
    const runnerCommitted = episode.final.candidates.flatMap(c => c.decision === "committed" ? [c.id] : []);
    assert.deepEqual(verdict.abstained, runnerAbstained, `seed ${seed}: abstained parity`);
    assert.deepEqual(verdict.committed, runnerCommitted, `seed ${seed}: committed parity`);
    assert.equal(verdict.falsePositives, episode.final.falsePositives, `seed ${seed}: falsePositives parity`);
    assert.equal(verdict.penalty, episode.final.penalty, `seed ${seed}: penalty parity`);
  }
});

test("F2 vocabulary: the oracle's decided-refusal code IS the runner's exported DECIDED_CODE", () => {
  assert.equal(DECIDED_CODE, "CANDIDATE_ALREADY_DECIDED");
  const run: QuorumOracleRun = { seed: 3, candidates: 2, reviewers: 3, steps: 4, budget: 8, gate: "ablated" };
  const codes: string[] = [];
  let step = 0;
  const probing = (observation: QuorumObservation) => {
    for (const refusal of observation.lastRefusals) codes.push(String(refusal.code));
    step += 1;
    if (step === 1) return { effect: "abstain" as const, id: "c1" };
    if (step === 2) return { effect: "abstain" as const, id: "c1" }; // decided target
    return { effect: "abstain" as const, id: "c2" };
  };
  oracleQuorumFor(run, probing);
  assert.ok(codes.includes(DECIDED_CODE), JSON.stringify(codes));
  assert.ok(!codes.includes("QUORUM_ALREADY_DECIDED"), JSON.stringify(codes));
});

test("F3 landing: a two-intent proposal writing main is refused whole by oracle and runner alike; nothing lands", () => {
  const doubleLander: Policy<LandingObservation, Intent, number> = {
    id: "double-lander", revision: "scripted-1",
    propose(observation, memory) {
      const onHead = observation.ready.filter(c => c.base === observation.head).slice(0, 2);
      const intents: Intent[] = onHead.map(c => ({
        intentId: `double-lander:land:${c.id}`, policyId: "double-lander", target: { kind: "candidate", uri: `cand:${c.id}` },
        expectedRevision: observation.basis.revision, effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
        evidenceRefs: [], writeScopes: ["main"], readScopes: [],
      }));
      return { intents: intents.length === 2 ? intents : [], memory: memory + 1, trace: [] };
    },
  };
  for (const seed of seeds) for (const lanes of [1, 2]) {
    const run: LandingOracleRun = { seed, candidates: 4, steps: 12, lanes };
    const verdict = oracleLandedOrderFor(run, landingPolicyRule(doubleLander, run));
    const episode = runLandingQueue({ seed, candidates: 4, lanes, steps: 12, policy: doubleLander });
    assert.deepEqual(episode.final.landed, [], `seed ${seed} lanes ${lanes}: the runner refuses the conflicted proposal whole`);
    const rejectedCodes = episode.steps.flatMap(s => s.resolution.rejected.map(r => String(r.code)));
    assert.ok(rejectedCodes.includes("INTENT_WRITE_CONFLICT"), `seed ${seed} lanes ${lanes}: ${JSON.stringify(rejectedCodes.slice(0, 4))}`);
    assert.deepEqual(verdict, [], `seed ${seed} lanes ${lanes}: the oracle refuses it whole too`);
  }
});

test("F3 quorum: a fully conflicted proposal surfaces INTENT_WRITE_CONFLICT in the oracle's lastRefusals and changes nothing, like the runner", () => {
  const oracleSeen: string[] = [];
  const runnerSeen: string[] = [];
  const doubleInspect = (seen: string[]): Policy<QuorumObservation, Intent, number> => ({
    id: "double-inspect", revision: "scripted-1",
    propose(observation, memory) {
      for (const refusal of observation.lastRefusals) seen.push(String(refusal.code));
      const intents: Intent[] = memory > 0 ? [] : [quorumIntent(observation, "inspect", "c1", "a"), quorumIntent(observation, "inspect", "c1", "b")];
      return { intents, memory: memory + 1, trace: [] };
    },
  });
  const run: QuorumOracleRun = { seed: 5, candidates: 3, reviewers: 3, steps: 3, budget: 9, gate: "authoritative" };
  const verdict = oracleQuorumFor(run, quorumPolicyRule(doubleInspect(oracleSeen), run));
  const episode = runQuorumEvidence({ seed: 5, candidates: 3, reviewers: 3, steps: 3, budget: 9, gate: "authoritative", policy: doubleInspect(runnerSeen) });
  assert.deepEqual(oracleSeen.filter(c => c === "INTENT_WRITE_CONFLICT").length, 2, `oracle surfaced both rows: ${JSON.stringify(oracleSeen)}`);
  assert.deepEqual(runnerSeen.filter(c => c === "INTENT_WRITE_CONFLICT").length, 2, `runner surfaced both rows: ${JSON.stringify(runnerSeen)}`);
  assert.equal(verdict.spent, 0, "a refused proposal spends nothing in the oracle");
  assert.equal(episode.final.spent, 0, "a refused proposal spends nothing in the runner");
});

test("F3 survivors: with two conflicted intents and one clean one, oracle and runner both admit only the survivor", () => {
  const mixed: Policy<QuorumObservation, Intent, number> = {
    id: "mixed", revision: "scripted-1",
    propose(observation, memory) {
      const intents: Intent[] = memory > 0 ? [] : [quorumIntent(observation, "inspect", "c1", "a"), quorumIntent(observation, "inspect", "c1", "b"), quorumIntent(observation, "inspect", "c2", "clean")];
      return { intents, memory: memory + 1, trace: [] };
    },
  };
  const run: QuorumOracleRun = { seed: 7, candidates: 3, reviewers: 3, steps: 2, budget: 9, gate: "authoritative" };
  const oracleProbe: boolean[] = [];
  const probingMixed: Policy<QuorumObservation, Intent, number> = { ...mixed, propose(observation, memory) { if (observation.step > 0) oracleProbe.push(observation.candidates.some(c => c.id === "c2" && c.revealed)); return mixed.propose(observation, memory, undefined as never); } };
  oracleQuorumFor(run, quorumPolicyRule(probingMixed, run));
  const episode = runQuorumEvidence({ seed: 7, candidates: 3, reviewers: 3, steps: 2, budget: 9, gate: "authoritative", policy: mixed });
  assert.deepEqual(oracleProbe, [true], "oracle admitted the clean survivor: c2 is revealed at step 1");
  const runnerRevealed = episode.final.candidates.find(c => c.id === "c2");
  assert.equal(runnerRevealed?.revealed, true, "runner admitted the clean survivor");
  const c1 = episode.final.candidates.find(c => c.id === "c1");
  assert.equal(c1?.revealed, false, "runner rejected both conflicted c1 inspects");
});
