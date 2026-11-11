import type { Basis, Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { reconcile, type Resolution } from "./resolver.js";
import { gateDraws } from "./landing-queue.js";

/**
 * The quorum-evidence fixture environment (collective-adaptation M1, MWCOL-003 quorum acquisition): several
 * candidate patches with a hidden true quality, several reviewers whose votes share a seeded noise term (so a
 * majority of correlated votes is not independent evidence), priced evidence charged against a compute budget, and
 * a native gate that stays authoritative: a `commit` is admissible only for a candidate that carries a receipt from
 * the world's independent gate draw. Labelled `fixture`; no file, process, network or QuorumCLI is touched, and no
 * fixture result stands for a native PASS.
 */

export type QuorumGate = "authoritative" | "ablated";
export type QuorumDecision = "committed" | "abstained";
export type QuorumTest = "pass" | "fail" | "flaky";
export type QuorumEventKind = "inspected" | "tested" | "receipt" | "challenged" | "committed" | "abstained" | "refused";

export interface QuorumEvent {
  readonly step: number;
  readonly kind: QuorumEventKind;
  readonly candidate: string | null;
  readonly detail: string;
}

/** World truth for one candidate. `quality`, `votes`, `correlated` and `flake` are hidden from every policy observation. */
export interface QuorumCandidate {
  readonly id: string;
  readonly quality: "good" | "bad";
  readonly votes: readonly ("approve" | "reject")[];
  /** The shared noise term fired: every reviewer approved whatever the quality. */
  readonly correlated: boolean;
  readonly flake: boolean;
  readonly revealed: boolean;
  /** Set only by a challenge. */
  readonly unanimous: boolean | null;
  readonly tested: QuorumTest | null;
  readonly receipt: boolean;
  readonly decision: QuorumDecision | null;
}

export interface QuorumRefusal {
  readonly candidate: string | null;
  readonly code: string;
}

export interface QuorumEvidenceState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly gate: QuorumGate;
  readonly step: number;
  readonly budget: number;
  readonly spent: number;
  readonly reviewers: number;
  readonly penalty: number;
  readonly falsePositives: number;
  readonly uncalibrated: number;
  readonly lastRefusals: readonly QuorumRefusal[];
  readonly candidates: readonly QuorumCandidate[];
  readonly events: readonly QuorumEvent[];
}

export interface QuorumCandidateView {
  readonly id: string;
  readonly revealed: boolean;
  /** Approving votes, known only after an inspect. */
  readonly approvals: number | null;
  readonly unanimous: boolean | null;
  readonly tested: QuorumTest | null;
  readonly receipt: boolean;
  readonly decision: QuorumDecision | null;
}

/** What a quorum policy observes: evidence it has paid for, never the hidden quality, votes or flake. */
export interface QuorumObservation {
  readonly step: number;
  readonly basis: Basis;
  readonly remaining: number;
  readonly reviewers: number;
  readonly lastRefusals: readonly QuorumRefusal[];
  readonly candidates: readonly QuorumCandidateView[];
}

export interface QuorumStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly QuorumEvent[];
  readonly stateHash: string;
}

export interface QuorumEvidenceEpisode {
  readonly schema: "mw.quorum-evidence.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly gate: QuorumGate;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly QuorumStep[];
  readonly final: QuorumEvidenceState;
  /** The state hash before step 0 (the freshly built initial state). */
  readonly initialHash: string;
  readonly finalHash: string;
}

export interface QuorumEvidenceRun {
  readonly seed: number;
  readonly candidates: number;
  readonly reviewers: number;
  readonly steps: number;
  /** Total compute the episode may spend on evidence. */
  readonly budget: number;
  /** `authoritative` refuses a commit without a receipt; `ablated` removes that check to expose the false positive it prevents. */
  readonly gate: QuorumGate;
  readonly policy: Policy<QuorumObservation, Intent, number>;
}

const WORKSPACE = "fixture:quorum-evidence";
/** The refusal code for an intent aimed at an already decided candidate (the runner's vocabulary; the reference oracles import it rather than respell it — MechanicalWorkflows-mexr). */
export const DECIDED_CODE = "CANDIDATE_ALREADY_DECIDED";
const COST = { inspect: 1, test: 3, challenge: 2, commit: 0, abstain: 0 } as const;
const FALSE_POSITIVE_PENALTY = 10;
const UNCALIBRATED_PENALTY = 2;

/** Deterministic world: per candidate quality, shared-noise flag, one flip draw per reviewer and a gate flake draw. */
function initialState(run: Pick<QuorumEvidenceRun, "seed" | "candidates" | "reviewers" | "budget" | "gate">): QuorumEvidenceState {
  const draw = gateDraws(run.seed);
  const candidates: QuorumCandidate[] = [];
  for (let index = 0; index < run.candidates; index += 1) {
    const quality = draw() % 2 === 0 ? "good" : "bad";
    const correlated = draw() % 3 === 0;
    const votes: ("approve" | "reject")[] = [];
    for (let reviewer = 0; reviewer < run.reviewers; reviewer += 1) {
      const flipped = draw() % 4 === 0;
      votes.push(correlated || (quality === "good") !== flipped ? "approve" : "reject");
    }
    const flake = draw() % 5 === 0;
    candidates.push({ id: `c${index + 1}`, quality, votes, correlated, flake, revealed: false, unanimous: null, tested: null, receipt: false, decision: null });
  }
  return {
    mode: "fixture", seed: run.seed, gate: run.gate, step: 0, budget: run.budget, spent: 0, reviewers: run.reviewers,
    penalty: 0, falsePositives: 0, uncalibrated: 0, lastRefusals: [], candidates, events: [],
  };
}

function observe(state: QuorumEvidenceState): QuorumObservation {
  return {
    step: state.step, basis: { workspaceId: WORKSPACE, revision: `quorum-${state.step}` }, remaining: state.budget - state.spent,
    reviewers: state.reviewers, lastRefusals: state.lastRefusals,
    candidates: state.candidates.map(c => ({
      id: c.id, revealed: c.revealed, approvals: c.revealed ? c.votes.filter(v => v === "approve").length : null,
      unanimous: c.unanimous, tested: c.tested, receipt: c.receipt, decision: c.decision,
    })),
  };
}

function candidateOf(intent: Intent): string | null {
  return intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:") ? intent.target.uri.slice("cand:".length) : null;
}

type QuorumEffect = keyof typeof COST;

function quorumIntent(policyId: string, observation: QuorumObservation, id: string, effect: QuorumEffect): Intent {
  const scope = effect === "commit" ? `commit:${id}` : `cand:${id}`;
  return {
    intentId: `${policyId}:${effect}:${id}`, policyId, target: { kind: "candidate", uri: `cand:${id}` },
    expectedRevision: observation.basis.revision, effect, claim: { compute: COST[effect], workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [], writeScopes: [scope], readScopes: [],
  };
}

function firstUndecided(observation: QuorumObservation): QuorumCandidateView | undefined {
  return observation.candidates.find(c => c.decision === null);
}

function wasRefused(observation: QuorumObservation, id: string): boolean {
  return observation.lastRefusals.some(refusal => refusal.candidate === id);
}

/**
 * Inspects the first undecided candidate's reviewer votes (cheap) and commits on an approving majority, abstains
 * otherwise or after any refusal. Correlated votes make its majority the same as agreement of one noise term.
 */
export const majorityVote: Policy<QuorumObservation, Intent, number> = {
  id: "majority-vote", revision: "fixture-1",
  propose(observation, memory) {
    const target = firstUndecided(observation);
    let effect: QuorumEffect | null = null;
    if (target !== undefined) {
      if (wasRefused(observation, target.id)) effect = "abstain";
      else if (!target.revealed) effect = "inspect";
      else effect = (target.approvals ?? 0) * 2 > observation.reviewers ? "commit" : "abstain";
    }
    return {
      intents: target === undefined || effect === null ? [] : [quorumIntent("majority-vote", observation, target.id, effect)], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "majority-vote", detail: target === undefined || effect === null ? "nothing undecided" : `${effect} ${target.id}` }],
    };
  },
};

/**
 * Spends budget on one independent test before any commit: commits only a candidate that passed it, abstains on a
 * failed or flaky result, and abstains (after the resolver's budget refusal) once the budget cannot pay for a test.
 */
export const independentTestFirst: Policy<QuorumObservation, Intent, number> = {
  id: "independent-test-first", revision: "fixture-1",
  propose(observation, memory) {
    const target = firstUndecided(observation);
    let effect: QuorumEffect | null = null;
    if (target !== undefined) {
      if (wasRefused(observation, target.id)) effect = "abstain";
      else if (target.tested === null) effect = "test";
      else effect = target.tested === "pass" && target.receipt ? "commit" : "abstain";
    }
    return {
      intents: target === undefined || effect === null ? [] : [quorumIntent("independent-test-first", observation, target.id, effect)], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "independent-test-first", detail: target === undefined || effect === null ? "nothing undecided" : `${effect} ${target.id}` }],
    };
  },
};

function patch(candidates: readonly QuorumCandidate[], id: string, change: Partial<QuorumCandidate>): QuorumCandidate[] {
  return candidates.map(candidate => candidate.id === id ? { ...candidate, ...change } : candidate);
}

/**
 * The world owns the price of evidence: a known effect is charged COST[effect] whatever compute the proposing policy
 * declared, and an intent aimed at a candidate that is already decided (or is decided earlier in the same batch) is
 * set aside as a refusal instead of re-deciding it, so one patch cannot be committed twice or flipped by an abstain.
 */
function settle(state: QuorumEvidenceState, intents: readonly Intent[]): { readonly priced: readonly Intent[]; readonly decided: readonly Intent[] } {
  const priced: Intent[] = [];
  const decided: Intent[] = [];
  const closed = new Set(state.candidates.filter(c => c.decision !== null).map(c => c.id));
  for (const intent of intents) {
    const id = candidateOf(intent);
    if (id !== null && closed.has(id)) { decided.push(intent); continue; }
    if (id !== null && (intent.effect === "commit" || intent.effect === "abstain")) closed.add(id);
    priced.push(Object.hasOwn(COST, intent.effect) ? { ...intent, claim: { ...intent.claim, compute: COST[intent.effect as QuorumEffect] } } : intent);
  }
  return { priced, decided };
}

function apply(state: QuorumEvidenceState, proposed: readonly Intent[], resolution: Resolution, decided: readonly Intent[]): { readonly state: QuorumEvidenceState; readonly events: readonly QuorumEvent[] } {
  const step = state.step + 1;
  const events: QuorumEvent[] = [
    ...resolution.rejected.map(r => ({ step, kind: "refused" as const, candidate: candidateOf(r.intent), detail: `${r.code}: ${r.detail}` })),
    ...decided.map(intent => ({ step, kind: "refused" as const, candidate: candidateOf(intent), detail: `${DECIDED_CODE}: ${intent.effect} on ${candidateOf(intent)}, which is already decided` })),
  ];
  let candidates = state.candidates;
  let { spent, penalty, falsePositives, uncalibrated } = state;
  for (const intent of proposed) {
    const id = candidateOf(intent);
    const subject = candidates.find(c => c.id === id);
    if (intent.effect === "commit" && subject !== undefined && subject.tested === null) { uncalibrated += 1; penalty += UNCALIBRATED_PENALTY; }
  }
  for (const intent of resolution.admitted) {
    const id = candidateOf(intent);
    const subject = candidates.find(c => c.id === id);
    if (id === null || subject === undefined) continue;
    spent += intent.claim.compute;
    if (intent.effect === "inspect") {
      candidates = patch(candidates, id, { revealed: true });
      events.push({ step, kind: "inspected", candidate: id, detail: `${id} votes revealed (${subject.votes.filter(v => v === "approve").length} of ${subject.votes.length} approve)` });
    } else if (intent.effect === "challenge") {
      const unanimous = subject.votes.every(v => v === subject.votes[0]);
      candidates = patch(candidates, id, { unanimous });
      events.push({ step, kind: "challenged", candidate: id, detail: `${id} votes ${unanimous ? "unanimous" : "split"}` });
    } else if (intent.effect === "test") {
      const result: QuorumTest = subject.quality === "bad" ? "fail" : subject.flake ? "flaky" : "pass";
      candidates = patch(candidates, id, { tested: result, receipt: result === "pass" });
      events.push({ step, kind: "tested", candidate: id, detail: `${id} independent test ${result}` });
      if (result === "pass") events.push({ step, kind: "receipt", candidate: id, detail: `${id} gate receipt issued` });
    } else if (intent.effect === "commit") {
      const bad = subject.quality === "bad";
      candidates = patch(candidates, id, { decision: "committed" });
      if (bad) { falsePositives += 1; penalty += FALSE_POSITIVE_PENALTY; }
      events.push({ step, kind: "committed", candidate: id, detail: `${id} committed${bad ? "; false positive: the patch was bad" : ""}` });
    } else if (intent.effect === "abstain") {
      candidates = patch(candidates, id, { decision: "abstained" });
      events.push({ step, kind: "abstained", candidate: id, detail: `${id} abstained` });
    } else {
      events.push({ step, kind: "refused", candidate: id, detail: `effect ${intent.effect} is not a quorum-evidence effect` });
    }
  }
  const lastRefusals = [...resolution.rejected.map(r => ({ candidate: candidateOf(r.intent), code: r.code as string })), ...decided.map(intent => ({ candidate: candidateOf(intent), code: DECIDED_CODE }))];
  return { state: { ...state, step, spent, penalty, falsePositives, uncalibrated, lastRefusals, candidates, events: [...state.events, ...events] }, events };
}

export function quorumStateHash(state: QuorumEvidenceState): string {
  return digest(state);
}

/** Run one policy against the fixture; the gate stays authoritative unless the run says `ablated`. */
export function runQuorumEvidence(run: QuorumEvidenceRun): QuorumEvidenceEpisode {
  let state = initialState(run);
  const initialHash = quorumStateHash(state);
  let memory = 0;
  const steps: QuorumStep[] = [];
  for (let index = 0; index < run.steps; index += 1) {
    const observation = observe(state);
    const observationDigest = digest(observation);
    const budget: Budget = { compute: state.budget - state.spent, workers: 1, queue: state.candidates.length, latencyMs: 1000 };
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:quorum-evidence:${run.seed}`, actorId: run.policy.id, observationDigest, budget,
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    // The native gate stays authoritative: no receipt, no commit scope.
    const protectedScopes = state.gate === "authoritative" ? state.candidates.filter(c => !c.receipt).map(c => `commit:${c.id}`) : [];
    const settled = settle(state, proposal.intents);
    const resolution = reconcile({ basis: observation.basis, budget, protectedScopes, proposals: [{ ...proposal, intents: settled.priced }] });
    const applied = apply(state, settled.priced, resolution, settled.decided);
    state = applied.state;
    steps.push({ step: state.step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events: applied.events, stateHash: quorumStateHash(state) });
  }
  return { schema: "mw.quorum-evidence.fixture.v1", mode: "fixture", seed: run.seed, gate: run.gate, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: quorumStateHash(state) };
}

export interface QuorumOracle {
  readonly quality: readonly string[];
  readonly committed: readonly string[];
  readonly abstained: readonly string[];
  readonly falsePositives: number;
  readonly spent: number;
  readonly penalty: number;
  /** One row per committed candidate: the approving votes it drew, whether the shared noise term fired and whether it was good (the inputs of the correlation-adjusted calibration metric). */
  readonly commitEvidence: readonly { readonly id: string; readonly approvals: number; readonly correlated: boolean; readonly good: boolean }[];
}

/**
 * The independent oracle: plain loops that re-derive the world from the same seed and walk the decision rules with
 * no policy, resolver or event record, answering only the outcome counts. A harness run that disagrees is wrong.
 */
export function oracleQuorum(run: { readonly seed: number; readonly candidates: number; readonly reviewers: number; readonly steps: number; readonly budget: number; readonly gate: QuorumGate; readonly policy: "majority-vote" | "independent-test-first" }): QuorumOracle {
  const draw = gateDraws(run.seed);
  const world: { quality: string; correlated: boolean; approvals: number; flake: boolean }[] = [];
  for (let c = 0; c < run.candidates; c += 1) {
    const good = draw() % 2 === 0;
    const correlated = draw() % 3 === 0;
    let approvals = 0;
    for (let r = 0; r < run.reviewers; r += 1) {
      const flipped = draw() % 4 === 0;
      if (correlated || good !== flipped) approvals += 1;
    }
    world.push({ quality: good ? "good" : "bad", correlated, approvals, flake: draw() % 5 === 0 });
  }
  const seen = world.map(() => ({ revealed: false, tested: "", decision: "" }));
  let remaining = run.budget;
  let penalty = 0;
  let falsePositives = 0;
  let refusedLast = false;
  for (let step = 0; step < run.steps; step += 1) {
    const at = seen.findIndex(s => s.decision === "");
    if (at < 0) break;
    const s = seen[at]!;
    const w = world[at]!;
    let action: QuorumEffect;
    if (refusedLast) action = "abstain";
    else if (run.policy === "majority-vote") action = !s.revealed ? "inspect" : w.approvals * 2 > run.reviewers ? "commit" : "abstain";
    else action = s.tested === "" ? "test" : s.tested === "pass" ? "commit" : "abstain";
    if (action === "commit" && s.tested === "") penalty += UNCALIBRATED_PENALTY;
    const refused = COST[action] > remaining || (action === "commit" && run.gate === "authoritative" && s.tested !== "pass");
    refusedLast = refused;
    if (refused) continue;
    remaining -= COST[action];
    if (action === "inspect") s.revealed = true;
    else if (action === "test") s.tested = w.quality === "bad" ? "fail" : w.flake ? "flaky" : "pass";
    else if (action === "abstain") s.decision = "abstained";
    else if (action === "commit") { s.decision = "committed"; if (w.quality === "bad") { falsePositives += 1; penalty += FALSE_POSITIVE_PENALTY; } }
  }
  return {
    quality: world.map(w => w.quality),
    committed: seen.flatMap((s, i) => s.decision === "committed" ? [`c${i + 1}`] : []),
    abstained: seen.flatMap((s, i) => s.decision === "abstained" ? [`c${i + 1}`] : []),
    falsePositives, spent: run.budget - remaining, penalty,
    commitEvidence: seen.flatMap((s, i) => s.decision === "committed" ? [{ id: `c${i + 1}`, approvals: world[i]!.approvals, correlated: world[i]!.correlated, good: world[i]!.quality === "good" }] : []),
  };
}

/** A fixture episode stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelQuorumEpisode(episode: QuorumEvidenceEpisode, mode: string): QuorumEvidenceEpisode {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture episode cannot be labelled ${mode}`);
  return episode;
}
