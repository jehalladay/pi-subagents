// MechanicalWorkflows-dfud (TW-EAT-R006): the landing-queue and evidence-quorum reference oracles
// evaluate ANY policy implementing the policy interface, not only the baseline pair, while the
// oracle keeps its own world model and consults the policy only through its public propose.
// Baseline verdicts are pinned unchanged against the existing oracles.
import test from "node:test";
import assert from "node:assert/strict";
import {
  oracleLandedOrderFor, landingPolicyRule, fifoRule, restackFirstRule, oracleLandedOrder, runLandingQueue, fifoLanding, restackFirst,
  oracleQuorumFor, quorumPolicyRule, majorityVoteRule, independentTestFirstRule, oracleQuorum, runQuorumEvidence, majorityVote, independentTestFirst,
} from "../dist/index.js";
import type { Policy, Intent, LandingObservation, QuorumObservation, LandingOracleRun, QuorumOracleRun } from "../dist/index.js";

const seeds = [1, 2, 3, 5, 7, 11, 13, 17];

/** A scripted non-baseline landing policy: land the on-head candidate that arrived LAST; never restack. */
const youngestFirst: Policy<LandingObservation, Intent, number> = {
  id: "youngest-first", revision: "scripted-1",
  propose(observation, memory) {
    const onHead = [...observation.ready].filter(c => c.base === observation.head).sort((a, b) => b.arrival - a.arrival)[0];
    const intents: Intent[] = onHead === undefined ? [] : [{
      intentId: `youngest-first:land:${onHead.id}`, policyId: "youngest-first", target: { kind: "candidate", uri: `cand:${onHead.id}` },
      expectedRevision: observation.basis.revision, effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [],
    }];
    return { intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: "youngest-first", detail: onHead?.id ?? "none" }] };
  },
};

/** A scripted non-baseline quorum policy: inspect, then test anything with a majority, commit only with a receipt, else abstain. */
const inspectThenTest: Policy<QuorumObservation, Intent, number> = {
  id: "inspect-then-test", revision: "scripted-1",
  propose(observation, memory) {
    const target = observation.candidates.find(c => c.decision === null);
    let effect: "inspect" | "test" | "commit" | "abstain" | null = null;
    if (target !== undefined) {
      if (observation.lastRefusals.some(r => r.candidate === target.id)) effect = "abstain";
      else if (!target.revealed) effect = "inspect";
      else if ((target.approvals ?? 0) * 2 <= observation.reviewers) effect = "abstain";
      else if (target.tested === null) effect = "test";
      else effect = target.tested === "pass" && target.receipt ? "commit" : "abstain";
    }
    const intents: Intent[] = target === undefined || effect === null ? [] : [{
      intentId: `inspect-then-test:${effect}:${target.id}`, policyId: "inspect-then-test", target: { kind: "candidate", uri: `cand:${target.id}` },
      expectedRevision: observation.basis.revision, effect, claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [effect === "commit" ? `commit:${target.id}` : `cand:${target.id}`], readScopes: [],
    }];
    return { intents, memory: memory + 1, trace: [] };
  },
};

test("the landing oracle produces a verdict for a scripted non-baseline policy and agrees with the runner's landed order", () => {
  for (const seed of seeds) {
    const run: LandingOracleRun = { seed, candidates: 4, steps: 12, lanes: 1 };
    const verdict = oracleLandedOrderFor(run, landingPolicyRule(youngestFirst, run));
    assert.ok(Array.isArray(verdict));
    const episode = runLandingQueue({ seed, candidates: 4, lanes: 1, steps: 12, policy: youngestFirst });
    assert.deepEqual(verdict, episode.final.landed, `seed ${seed}: two independent derivations agree`);
  }
});

test("landing baseline verdicts are unchanged: the fifo and restack-first rules and the policy-driven rules all equal oracleLandedOrder", () => {
  for (const seed of seeds) for (const steps of [6, 12]) {
    const run: LandingOracleRun = { seed, candidates: 4, steps };
    assert.deepEqual(oracleLandedOrderFor(run, fifoRule), oracleLandedOrder({ seed, candidates: 4, steps, policy: "fifo" }), `fifo ${seed}/${steps}`);
    assert.deepEqual(oracleLandedOrderFor(run, restackFirstRule), oracleLandedOrder({ seed, candidates: 4, steps, policy: "restack-first" }), `restack ${seed}/${steps}`);
    assert.deepEqual(oracleLandedOrderFor(run, landingPolicyRule(fifoLanding, run)), oracleLandedOrder({ seed, candidates: 4, steps, policy: "fifo" }), `fifo policy ${seed}/${steps}`);
    assert.deepEqual(oracleLandedOrderFor(run, landingPolicyRule(restackFirst, run)), oracleLandedOrder({ seed, candidates: 4, steps, policy: "restack-first" }), `restack policy ${seed}/${steps}`);
  }
});

test("the quorum oracle produces a verdict for a scripted non-baseline policy and the structural invariants hold", () => {
  for (const seed of seeds) for (const gate of ["authoritative", "ablated"] as const) {
    const run: QuorumOracleRun = { seed, candidates: 6, reviewers: 5, steps: 30, budget: 24, gate };
    const verdict = oracleQuorumFor(run, quorumPolicyRule(inspectThenTest, run));
    assert.equal(verdict.quality.length, 6);
    assert.ok(verdict.spent <= 24 && verdict.spent >= 0, `seed ${seed} ${gate}: spent within budget`);
    assert.equal(new Set([...verdict.committed, ...verdict.abstained]).size, verdict.committed.length + verdict.abstained.length, "no candidate both committed and abstained");
    if (gate === "authoritative") assert.equal(verdict.falsePositives, 0, "with the authoritative gate a receipt-only committer never commits a bad patch");
    assert.equal(verdict.commitEvidence.length, verdict.committed.length);
  }
});

test("quorum baseline verdicts are unchanged: majority-vote and independent-test-first rules, closed-form and policy-driven, all equal oracleQuorum", () => {
  for (const seed of seeds) for (const gate of ["authoritative", "ablated"] as const) for (const budget of [12, 24]) {
    const run: QuorumOracleRun = { seed, candidates: 6, reviewers: 5, steps: 30, budget, gate };
    const label = `${seed}/${gate}/${budget}`;
    assert.deepEqual(oracleQuorumFor(run, majorityVoteRule), oracleQuorum({ ...run, policy: "majority-vote" }), `majority ${label}`);
    assert.deepEqual(oracleQuorumFor(run, independentTestFirstRule), oracleQuorum({ ...run, policy: "independent-test-first" }), `itf ${label}`);
    assert.deepEqual(oracleQuorumFor(run, quorumPolicyRule(majorityVote, run)), oracleQuorum({ ...run, policy: "majority-vote" }), `majority policy ${label}`);
    assert.deepEqual(oracleQuorumFor(run, quorumPolicyRule(independentTestFirst, run)), oracleQuorum({ ...run, policy: "independent-test-first" }), `itf policy ${label}`);
  }
});

test("oracle independence: only propose is consulted — policy metadata and trace never move a verdict, and a stale or foreign intent is a refused choice", () => {
  const run: LandingOracleRun = { seed: 7, candidates: 4, steps: 12 };
  const renamed: Policy<LandingObservation, Intent, number> = { ...restackFirst, id: "someone-else", revision: "99", propose: (o, m, c) => ({ ...restackFirst.propose(o, m, c), trace: [] }) };
  assert.deepEqual(oracleLandedOrderFor(run, landingPolicyRule(renamed, run)), oracleLandedOrder({ seed: 7, candidates: 4, steps: 12, policy: "restack-first" }));
  const stale: Policy<LandingObservation, Intent, number> = { ...fifoLanding, propose: (o, m, c) => { const p = fifoLanding.propose(o, m, c); return { ...p, intents: p.intents.map(i => ({ ...i, expectedRevision: "head-stale" })) }; } };
  assert.deepEqual(oracleLandedOrderFor(run, landingPolicyRule(stale, run)), [], "a stale expectedRevision is refused every step: nothing lands");
  const foreign: Policy<LandingObservation, Intent, number> = { ...fifoLanding, propose: (o, m, c) => { const p = fifoLanding.propose(o, m, c); return { ...p, intents: p.intents.map(i => ({ ...i, target: { kind: "artifact", uri: "elsewhere" } })) }; } };
  assert.deepEqual(oracleLandedOrderFor(run, landingPolicyRule(foreign, run)), [], "an intent that names no candidate is skipped");
  assert.throws(() => oracleLandedOrderFor({ seed: -1, candidates: 4, steps: 1 }, fifoRule), /ORACLE_RUN_INVALID/);
  assert.throws(() => oracleQuorumFor({ seed: 1, candidates: 0, reviewers: 5, steps: 1, budget: 1, gate: "ablated" }, majorityVoteRule), /ORACLE_RUN_INVALID/);
});

test("the quorum oracle's refusal codes are visible to the next observation: ORACLE_CHOICE_INVALID for a malformed choice, CANDIDATE_ALREADY_DECIDED for a decided target", () => {
  const run: QuorumOracleRun = { seed: 3, candidates: 2, reviewers: 3, steps: 6, budget: 12, gate: "ablated" };
  const refusals: string[] = [];
  let step = 0;
  const probing = (observation: QuorumObservation) => {
    for (const refusal of observation.lastRefusals) refusals.push(String(refusal.code));
    step += 1;
    if (step === 1) return { effect: "abstain" as const, id: "c1" };          // decides c1
    if (step === 2) return { effect: "abstain" as const, id: "c1" };          // already decided -> CANDIDATE_ALREADY_DECIDED (the runner's code; mexr)
    if (step === 3) return { effect: "explode" as never, id: "c2" };          // malformed effect -> ORACLE_CHOICE_INVALID
    if (step === 4) return { effect: "abstain" as const, id: "c99" };         // unknown candidate -> ORACLE_CHOICE_INVALID
    return { effect: "abstain" as const, id: "c2" };
  };
  const verdict = oracleQuorumFor(run, probing);
  assert.ok(refusals.includes("CANDIDATE_ALREADY_DECIDED"), JSON.stringify(refusals));
  assert.ok(refusals.includes("ORACLE_CHOICE_INVALID"), JSON.stringify(refusals));
  assert.deepEqual(verdict.abstained, ["c1", "c2"], "refused choices changed nothing; both candidates end abstained");
  assert.equal(verdict.spent, 0, "abstain costs nothing and refused choices spend nothing");
});

// MechanicalWorkflows-xe5y (coordination test, test-only): pin nine reference-oracle laws that the dfud suite left unpinned.

const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
const manySeeds = Array.from({ length: 31 }, (_, index) => index + 1);
const oracleIntent = (policyId: string, uri: string, kind: "candidate" | "artifact", effect: string, expectedRevision: string, writeScopes: readonly string[] = ["main"]): Intent => ({
  intentId: `${policyId}:${effect}:${uri}`, policyId, target: { kind, uri }, expectedRevision, effect, claim, evidenceRefs: [], writeScopes, readScopes: [],
});
const landingView = (): { head: string; waiting: { id: string; base: string; arrival: number }[] } => ({
  head: "head-0", waiting: [{ id: "c1", base: "head-0", arrival: 0 }, { id: "c2", base: "head-0", arrival: 1 }],
});
/** A landing policy that proposes the given effects, in order, against the observed head. */
const landingScript = (id: string, steps: readonly { readonly uri: string; readonly effect: string; readonly scope?: string }[]): Policy<LandingObservation, Intent, number> => ({
  id, revision: "scripted-1",
  propose: (observation, memory) => ({ intents: steps.map(step => oracleIntent(id, step.uri, "candidate", step.effect, observation.basis.revision, [step.scope ?? "main"])), memory: memory + 1, trace: [] }),
});
/** A quorum policy whose single intent is built from the observation by the caller. */
const quorumScript = (id: string, build: (observation: QuorumObservation) => Intent | null): Policy<QuorumObservation, Intent, number> => ({
  id, revision: "scripted-1",
  propose: (observation, memory) => { const intent = build(observation); return { intents: intent === null ? [] : [intent], memory: memory + 1, trace: [] }; },
});
/** Wrap a quorum rule so the refusals each observation shows are recorded. */
const recordingRule = (inner: (observation: QuorumObservation) => ReturnType<typeof majorityVoteRule>, seen: string[]) => (observation: QuorumObservation) => {
  for (const refusal of observation.lastRefusals) seen.push(String(refusal.code));
  return inner(observation);
};

test("a refused landing choice equals a skip: it changes nothing and burns no gate draw, and a landed candidate cannot be chosen again", () => {
  for (const steps of [12, 16]) for (const seed of manySeeds) {
    const run: LandingOracleRun = { seed, candidates: 4, steps };
    const alternate = (second: (view: Parameters<typeof restackFirstRule>[0]) => ReturnType<typeof restackFirstRule>) => {
      let calls = 0;
      return (view: Parameters<typeof restackFirstRule>[0]) => { calls += 1; return calls % 2 === 1 ? { kind: "land" as const, id: "c99" } : second(view); };
    };
    const refused = oracleLandedOrderFor(run, alternate(restackFirstRule));
    const skipped = oracleLandedOrderFor(run, (() => { let calls = 0; return (view: Parameters<typeof restackFirstRule>[0]) => { calls += 1; return calls % 2 === 1 ? { kind: "skip" as const } : restackFirstRule(view); }; })());
    assert.deepEqual(refused, skipped, `seed ${seed} steps ${steps}: land of a candidate outside the waiting set equals skip`);
  }
  let landedOnce = 0;
  for (const seed of manySeeds) {
    const landed = oracleLandedOrderFor({ seed, candidates: 3, steps: 12 }, () => ({ kind: "land", id: "c1" }));
    assert.ok(landed.length <= 1, `seed ${seed}: always-land-c1 lands c1 at most once, got ${JSON.stringify(landed)}`);
    if (landed.length === 1) { assert.deepEqual(landed, ["c1"]); landedOnce += 1; }
  }
  assert.ok(landedOnce > 0, "the control is not vacuous: at least one seed passes the gate");
});

test("the landing rule reads the FIRST surviving intent of a proposal only: a [land c2, land c1] proposal over disjoint write scopes lands c2", () => {
  const run: LandingOracleRun = { seed: 1, candidates: 2, steps: 4 };
  // Disjoint scopes keep the pair out of the resolver's interference rule (mexr), so the order alone decides.
  const policy = landingScript("two-intents", [{ uri: "cand:c2", effect: "land", scope: "scope-c2" }, { uri: "cand:c1", effect: "land", scope: "scope-c1" }]);
  assert.deepEqual(landingPolicyRule(policy, run)(landingView()), { kind: "land", id: "c2" });
  let landedFirst = 0;
  for (const seed of manySeeds) {
    const landed = oracleLandedOrderFor({ ...run, seed }, landingPolicyRule(policy, { ...run, seed }));
    if (landed.length > 0) { assert.equal(landed[0], "c2", `seed ${seed}: c2 lands first`); landedFirst += 1; }
  }
  assert.ok(landedFirst > 0, "at least one seed lands, so the order is observed");
});

test("a non-landing effect never lands: a hold intent on an on-head candidate is skipped by the rule and lands nothing", () => {
  const run: LandingOracleRun = { seed: 1, candidates: 2, steps: 8 };
  const hold = landingScript("holder", [{ uri: "cand:c1", effect: "hold" }]);
  assert.deepEqual(landingPolicyRule(hold, run)(landingView()), { kind: "skip" });
  for (const seed of manySeeds) assert.deepEqual(oracleLandedOrderFor({ ...run, seed }, landingPolicyRule(hold, { ...run, seed })), [], `seed ${seed}: hold lands nothing`);
  assert.deepEqual(landingPolicyRule(landingScript("restacker", [{ uri: "cand:c1", effect: "restack" }]), run)(landingView()), { kind: "restack", id: "c1" }, "a restack effect stays a restack");
});

test("the quorum rule decides nothing for a stale expectedRevision or a foreign target, and neither shows as a refusal", () => {
  const run: QuorumOracleRun = { seed: 3, candidates: 2, reviewers: 3, steps: 6, budget: 12, gate: "ablated" };
  const shapes: Record<string, (observation: QuorumObservation) => Intent> = {
    "stale expectedRevision": observation => oracleIntent("stale", "cand:c1", "candidate", "abstain", `${observation.basis.revision}-stale`),
    "artifact kind with a cand: uri": observation => oracleIntent("foreign-kind", "cand:c1", "artifact", "abstain", observation.basis.revision),
    "candidate kind without the cand: prefix": observation => oracleIntent("foreign-uri", "c1", "candidate", "abstain", observation.basis.revision),
  };
  for (const [label, build] of Object.entries(shapes)) {
    const refusals: string[] = [];
    const verdict = oracleQuorumFor(run, recordingRule(quorumPolicyRule(quorumScript("probe", build), run), refusals));
    assert.deepEqual([verdict.committed, verdict.abstained, verdict.spent, verdict.penalty], [[], [], 0, 0], `${label}: nothing is decided`);
    assert.deepEqual(refusals, [], `${label}: the intent is dropped by the rule, not refused by the world`);
  }
});

test("a commit refused by the authoritative gate surfaces INTENT_SCOPE_PROTECTED and an unaffordable test surfaces INTENT_BUDGET_EXCEEDED", () => {
  const scope: string[] = [];
  const committing = (observation: QuorumObservation) => observation.step === 0 ? { effect: "commit" as const, id: "c1" } : null;
  oracleQuorumFor({ seed: 3, candidates: 1, reviewers: 3, steps: 3, budget: 12, gate: "authoritative" }, recordingRule(committing, scope));
  assert.deepEqual(scope, ["INTENT_SCOPE_PROTECTED"], "an untested commit under the authoritative gate is protected scope");
  const budget: string[] = [];
  const testing = (observation: QuorumObservation) => observation.step === 0 ? { effect: "test" as const, id: "c1" } : null;
  oracleQuorumFor({ seed: 3, candidates: 1, reviewers: 3, steps: 3, budget: 2, gate: "authoritative" }, recordingRule(testing, budget));
  assert.deepEqual(budget, ["INTENT_BUDGET_EXCEEDED"], "a test costing 3 against a budget of 2 exceeds the budget");
});

test("a challenge costs 2 and reports unanimity for an all-approve AND an all-reject electorate, split otherwise", () => {
  const priced = oracleQuorumFor({ seed: 3, candidates: 1, reviewers: 3, steps: 2, budget: 12, gate: "ablated" }, observation => observation.step === 0 ? { effect: "challenge", id: "c1" } : null);
  assert.equal(priced.spent, 2, "challenge spends exactly 2");
  const tight: string[] = [];
  oracleQuorumFor({ seed: 3, candidates: 1, reviewers: 3, steps: 2, budget: 1, gate: "ablated" }, recordingRule(observation => observation.step === 0 ? { effect: "challenge", id: "c1" } : null, tight));
  assert.deepEqual(tight, ["INTENT_BUDGET_EXCEEDED"], "a budget of 1 cannot afford a challenge");
  const kinds = new Set<string>();
  for (const seed of manySeeds) {
    const run: QuorumOracleRun = { seed, candidates: 1, reviewers: 3, steps: 4, budget: 12, gate: "ablated" };
    let approvals: number | null = null;
    let unanimous: boolean | null = null;
    oracleQuorumFor(run, observation => {
      const c = observation.candidates[0]!;
      if (observation.step === 1) approvals = c.approvals;
      if (observation.step === 3) unanimous = c.unanimous;
      return [{ effect: "inspect" as const, id: "c1" }, { effect: "abstain" as const, id: "c99" }, { effect: "challenge" as const, id: "c1" }, null][observation.step] ?? null;
    });
    assert.notEqual(approvals, null, `seed ${seed}: approvals were revealed`);
    const all = approvals === 0 || approvals === 3;
    assert.equal(unanimous, all, `seed ${seed}: ${approvals} of 3 approve, unanimous ${all}`);
    kinds.add(approvals === 0 ? "all-reject" : approvals === 3 ? "all-approve" : "split");
  }
  assert.deepEqual([...kinds].sort(), ["all-approve", "all-reject", "split"], "the seeds exercise every electorate shape");
});

test("a challenge-using quorum policy gets the same verdict from the oracle and the runner across seeds, gates and budgets", () => {
  const challenger = quorumScript("challenger", observation => {
    const target = observation.candidates.find(c => c.decision === null);
    if (target === undefined) return null;
    let effect: string;
    if (observation.lastRefusals.some(r => r.candidate === target.id)) effect = "abstain";
    else if (!target.revealed) effect = "inspect";
    else if (target.unanimous === null) effect = "challenge";
    else effect = target.unanimous && (target.approvals ?? 0) * 2 > observation.reviewers ? "commit" : "abstain";
    return { ...oracleIntent("challenger", `cand:${target.id}`, "candidate", effect, observation.basis.revision), writeScopes: [effect === "commit" ? `commit:${target.id}` : `cand:${target.id}`] };
  });
  let challenged = 0;
  for (const seed of seeds) for (const gate of ["authoritative", "ablated"] as const) for (const budget of [3, 9, 24]) {
    const run: QuorumOracleRun = { seed, candidates: 6, reviewers: 5, steps: 30, budget, gate };
    const verdict = oracleQuorumFor(run, quorumPolicyRule(challenger, run));
    const episode = runQuorumEvidence({ ...run, policy: challenger });
    const label = `${seed}/${gate}/${budget}`;
    assert.equal(verdict.spent, episode.final.spent, `spent ${label}`);
    assert.equal(verdict.penalty, episode.final.penalty, `penalty ${label}`);
    assert.equal(verdict.falsePositives, episode.final.falsePositives, `false positives ${label}`);
    assert.deepEqual(verdict.committed, episode.final.candidates.filter(c => c.decision === "committed").map(c => c.id), `committed ${label}`);
    assert.deepEqual(verdict.abstained, episode.final.candidates.filter(c => c.decision === "abstained").map(c => c.id), `abstained ${label}`);
    if (episode.final.events.some(e => e.kind === "challenged")) challenged += 1;
  }
  assert.ok(challenged > 0, "the control is not vacuous: some episode challenges");
});
