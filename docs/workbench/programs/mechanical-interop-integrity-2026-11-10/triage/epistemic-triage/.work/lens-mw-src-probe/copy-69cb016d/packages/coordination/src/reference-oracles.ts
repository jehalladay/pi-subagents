/**
 * Policy-agnostic reference oracles (TW-EAT-R006, MechanicalWorkflows-dfud). The landing-queue and
 * evidence-quorum reference oracles used for acceptance C1 accepted only the baseline policy
 * pair, hard-coded as strings. Here each oracle keeps its OWN world model (seeded draws, candidate
 * bases, reviewer votes, costs, gate refusals) and consults the policy under evaluation only
 * through a decision RULE: a pure function of the oracle's view of the world. The two baseline
 * rules reproduce `oracleLandedOrder` / `oracleQuorum` verdict-for-verdict (pinned by test), and
 * `landingPolicyRule` / `quorumPolicyRule` turn ANY Policy<O, Intent, number> into a rule by
 * presenting it the same observation shape the fixture runner presents and reading its intents
 * through the resolver's own interference rule: write-scope conflicts refuse the touching intents
 * with INTENT_WRITE_CONFLICT exactly as the runner does, and the first surviving intent is the
 * choice — nothing else of the policy is read, so oracle independence is preserved (mexr).
 * World constants mirror landing-queue.ts / quorum-evidence.ts; drift is caught by the regression pins.
 */
import type { Basis, Intent, Policy } from "./contracts.js";
import { gateDraws } from "./landing-queue.js";
import type { LandingCandidate, LandingObservation } from "./landing-queue.js";
import { DECIDED_CODE } from "./quorum-evidence.js";
import type { QuorumGate, QuorumObservation, QuorumOracle } from "./quorum-evidence.js";

// ---------------------------------------------------------------- landing queue

export interface LandingOracleView {
  readonly head: string;
  readonly waiting: readonly LandingCandidate[];
}

export type LandingOracleChoice = { readonly kind: "land" | "restack"; readonly id: string } | { readonly kind: "skip" };
export type LandingOracleRule = (view: LandingOracleView) => LandingOracleChoice;

export interface LandingOracleRun {
  readonly seed: number;
  readonly candidates: number;
  readonly steps: number;
  readonly lanes?: number | undefined;
}

const LANDING_WORKSPACE = "fixture:landing-queue";
const INITIAL_HEAD = "head-0";
const gatePasses = (draw: number): boolean => draw % 4 !== 0;
const candidateOf = (intent: Intent): string | null =>
  intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:") ? intent.target.uri.slice("cand:".length) : null;

/** One row the oracle surfaces for a write-conflicted intent, in the runner's vocabulary. */
export interface OracleConflictRefusal { readonly candidate: string | null; readonly code: "INTENT_WRITE_CONFLICT" }

/** Resolver-mirroring interference over one proposal: a scope with at least one writer and two or more touching intents conflicts every touching intent (resolver.ts semantics). */
function conflictedIntentIds(intents: readonly Intent[]): ReadonlySet<string> {
  const scopeOrder: string[] = [];
  for (const intent of intents) for (const scope of [...intent.writeScopes, ...intent.readScopes]) if (!scopeOrder.includes(scope)) scopeOrder.push(scope);
  const conflicted = new Set<string>();
  for (const scope of scopeOrder) {
    const writers = intents.filter(intent => intent.writeScopes.includes(scope));
    const touching = intents.filter(intent => intent.writeScopes.includes(scope) || intent.readScopes.includes(scope));
    if (writers.length === 0 || touching.length < 2) continue;
    for (const intent of touching) conflicted.add(intent.intentId);
  }
  return conflicted;
}

const conflictRowsOf = (intents: readonly Intent[], conflicted: ReadonlySet<string>): OracleConflictRefusal[] =>
  intents.filter(intent => conflicted.has(intent.intentId)).map(intent => ({ candidate: candidateOf(intent), code: "INTENT_WRITE_CONFLICT" as const }));

/** The fifo baseline as a rule: land the first candidate on head, never restack. */
export const fifoRule: LandingOracleRule = view => {
  const onHead = view.waiting.find(candidate => candidate.base === view.head);
  return onHead === undefined ? { kind: "skip" } : { kind: "land", id: onHead.id };
};

/** The restack-first baseline as a rule: rebase the first stale candidate, else land the first on head. */
export const restackFirstRule: LandingOracleRule = view => {
  const stale = view.waiting.find(candidate => candidate.base !== view.head);
  if (stale !== undefined) return { kind: "restack", id: stale.id };
  const onHead = view.waiting.find(candidate => candidate.base === view.head);
  return onHead === undefined ? { kind: "skip" } : { kind: "land", id: onHead.id };
};

/** Independent landing-queue world: bases, head and the seeded gate; the rule only chooses. */
export function oracleLandedOrderFor(run: LandingOracleRun, rule: LandingOracleRule): string[] {
  if (!Number.isInteger(run.seed) || run.seed < 0 || !Number.isInteger(run.candidates) || run.candidates < 1 || !Number.isInteger(run.steps) || run.steps < 0) {
    throw new RangeError(`ORACLE_RUN_INVALID: seed ${run.seed}, candidates ${run.candidates}, steps ${run.steps}`);
  }
  const draw = gateDraws(run.seed);
  const candidates: LandingCandidate[] = Array.from({ length: run.candidates }, (_, index) => ({ id: `c${index + 1}`, base: INITIAL_HEAD, arrival: index }));
  const landed: string[] = [];
  let head = INITIAL_HEAD;
  for (let step = 0; step < run.steps; step += 1) {
    const waiting = candidates.filter(candidate => !landed.includes(candidate.id));
    const choice = rule({ head, waiting });
    if (choice.kind === "skip") continue;
    const index = candidates.findIndex(candidate => candidate.id === choice.id && !landed.includes(candidate.id));
    if (index < 0) continue; // a choice outside the waiting set is a refused intent: no world change, no draw
    if (choice.kind === "restack") { candidates[index] = { ...candidates[index]!, base: head }; continue; }
    if (gatePasses(draw())) { landed.push(choice.id); head = `head-${landed.length}`; }
  }
  return landed;
}

/** Any landing policy as a rule: it sees the runner's observation shape and only its first candidate intent is read. */
export function landingPolicyRule(policy: Policy<LandingObservation, Intent, number>, run: LandingOracleRun): LandingOracleRule {
  let memory = 0;
  const lanes = run.lanes ?? 1;
  return view => {
    const basis: Basis = { workspaceId: LANDING_WORKSPACE, revision: view.head };
    const observation: LandingObservation = { basis, head: view.head, lanes, ready: view.waiting };
    const proposal = policy.propose(observation, memory, {
      episodeId: `oracle:landing-queue:${run.seed}`, actorId: policy.id, observationDigest: "unknown",
      budget: { compute: lanes, workers: lanes, queue: view.waiting.length, latencyMs: 1000 }, authority: "propose-only", policyRevision: policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const fresh = proposal.intents.filter(candidate => candidate.expectedRevision === view.head);
    const conflicted = conflictedIntentIds(fresh);
    const intent = fresh.find(candidate => !conflicted.has(candidate.intentId));
    if (intent === undefined) return { kind: "skip" };
    const id = candidateOf(intent);
    if (id === null || (intent.effect !== "land" && intent.effect !== "restack")) return { kind: "skip" };
    return { kind: intent.effect, id };
  };
}

// ---------------------------------------------------------------- evidence quorum

export type QuorumOracleEffect = "inspect" | "test" | "challenge" | "commit" | "abstain";
export type QuorumOracleChoice = { readonly effect: QuorumOracleEffect; readonly id: string; readonly conflicts?: readonly OracleConflictRefusal[] } | { readonly conflicts: readonly OracleConflictRefusal[] } | null;
/** Sees exactly what the runner's policies see: the QuorumObservation of the oracle's own world. */
export type QuorumOracleRule = (observation: QuorumObservation) => QuorumOracleChoice;

export interface QuorumOracleRun {
  readonly seed: number;
  readonly candidates: number;
  readonly reviewers: number;
  readonly steps: number;
  readonly budget: number;
  readonly gate: QuorumGate;
}

const QUORUM_WORKSPACE = "fixture:quorum-evidence";
const COST: Readonly<Record<QuorumOracleEffect, number>> = { inspect: 1, test: 3, challenge: 2, commit: 0, abstain: 0 };
const FALSE_POSITIVE_PENALTY = 10;
const UNCALIBRATED_PENALTY = 2;
const EFFECTS: ReadonlySet<string> = new Set(Object.keys(COST));

const firstUndecided = (observation: QuorumObservation) => observation.candidates.find(candidate => candidate.decision === null);
const wasRefused = (observation: QuorumObservation, id: string): boolean => observation.lastRefusals.some(refusal => refusal.candidate === id);

/** The majority-vote baseline as a rule. */
export const majorityVoteRule: QuorumOracleRule = observation => {
  const target = firstUndecided(observation);
  if (target === undefined) return null;
  if (wasRefused(observation, target.id)) return { effect: "abstain", id: target.id };
  if (!target.revealed) return { effect: "inspect", id: target.id };
  return { effect: (target.approvals ?? 0) * 2 > observation.reviewers ? "commit" : "abstain", id: target.id };
};

/** The independent-test-first baseline as a rule. */
export const independentTestFirstRule: QuorumOracleRule = observation => {
  const target = firstUndecided(observation);
  if (target === undefined) return null;
  if (wasRefused(observation, target.id)) return { effect: "abstain", id: target.id };
  if (target.tested === null) return { effect: "test", id: target.id };
  return { effect: target.tested === "pass" && target.receipt ? "commit" : "abstain", id: target.id };
};

interface World { readonly quality: "good" | "bad"; readonly correlated: boolean; readonly approvals: number; readonly flake: boolean }
interface Seen { revealed: boolean; tested: "" | "pass" | "fail" | "flaky"; decision: "" | "committed" | "abstained"; unanimous: boolean | null }

/** Independent evidence-quorum world (reviewer votes, costs, authoritative gate, penalties); the rule only chooses. */
export function oracleQuorumFor(run: QuorumOracleRun, rule: QuorumOracleRule): QuorumOracle {
  if (!Number.isInteger(run.seed) || run.seed < 0 || run.candidates < 1 || run.reviewers < 1 || run.steps < 0 || run.budget < 0) {
    throw new RangeError(`ORACLE_RUN_INVALID: seed ${run.seed}, candidates ${run.candidates}, reviewers ${run.reviewers}, steps ${run.steps}, budget ${run.budget}`);
  }
  const draw = gateDraws(run.seed);
  const world: World[] = [];
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
  const seen: Seen[] = world.map(() => ({ revealed: false, tested: "", decision: "", unanimous: null }));
  let remaining = run.budget;
  let penalty = 0;
  let falsePositives = 0;
  let lastRefusals: QuorumObservation["lastRefusals"] = [];
  for (let step = 0; step < run.steps; step += 1) {
    if (seen.every(s => s.decision !== "")) break;
    const observation: QuorumObservation = {
      step, basis: { workspaceId: QUORUM_WORKSPACE, revision: `quorum-${step}` }, remaining, reviewers: run.reviewers, lastRefusals,
      candidates: world.map((w, i) => {
        const s = seen[i]!;
        return { id: `c${i + 1}`, revealed: s.revealed, approvals: s.revealed ? w.approvals : null, unanimous: s.unanimous, tested: s.tested === "" ? null : s.tested, receipt: s.tested === "pass", decision: s.decision === "" ? null : s.decision };
      }),
    };
    const choice = rule(observation);
    lastRefusals = [];
    if (choice === null) continue;
    const carried: OracleConflictRefusal[] = choice.conflicts === undefined ? [] : [...choice.conflicts];
    lastRefusals = carried;
    if (!("effect" in choice)) continue;
    const at = Number(choice.id.replace(/^c/, "")) - 1;
    const s = seen[at];
    const w = world[at];
    if (s === undefined || w === undefined || !EFFECTS.has(choice.effect)) { lastRefusals = [...carried, { candidate: choice.id, code: "ORACLE_CHOICE_INVALID" }]; continue; }
    if (s.decision !== "") { lastRefusals = [...carried, { candidate: choice.id, code: DECIDED_CODE }]; continue; }
    if (choice.effect === "commit" && s.tested === "") penalty += UNCALIBRATED_PENALTY;
    const refused = COST[choice.effect] > remaining || (choice.effect === "commit" && run.gate === "authoritative" && s.tested !== "pass");
    if (refused) { lastRefusals = [...carried, { candidate: choice.id, code: choice.effect === "commit" ? "INTENT_SCOPE_PROTECTED" : "INTENT_BUDGET_EXCEEDED" }]; continue; }
    remaining -= COST[choice.effect];
    if (choice.effect === "inspect") s.revealed = true;
    else if (choice.effect === "challenge") s.unanimous = w.approvals === 0 || w.approvals === run.reviewers;
    else if (choice.effect === "test") s.tested = w.quality === "bad" ? "fail" : w.flake ? "flaky" : "pass";
    else if (choice.effect === "abstain") s.decision = "abstained";
    else { s.decision = "committed"; if (w.quality === "bad") { falsePositives += 1; penalty += FALSE_POSITIVE_PENALTY; } }
  }
  return {
    quality: world.map(w => w.quality),
    committed: seen.flatMap((s, i) => s.decision === "committed" ? [`c${i + 1}`] : []),
    abstained: seen.flatMap((s, i) => s.decision === "abstained" ? [`c${i + 1}`] : []),
    falsePositives, spent: run.budget - remaining, penalty,
    commitEvidence: seen.flatMap((s, i) => s.decision === "committed" ? [{ id: `c${i + 1}`, approvals: world[i]!.approvals, correlated: world[i]!.correlated, good: world[i]!.quality === "good" }] : []),
  };
}

/** Any quorum policy as a rule: it sees the oracle's QuorumObservation and only its first candidate intent is read. */
export function quorumPolicyRule(policy: Policy<QuorumObservation, Intent, number>, run: QuorumOracleRun): QuorumOracleRule {
  let memory = 0;
  return observation => {
    const proposal = policy.propose(observation, memory, {
      episodeId: `oracle:quorum-evidence:${run.seed}`, actorId: policy.id, observationDigest: "unknown",
      budget: { compute: observation.remaining, workers: 1, queue: observation.candidates.length, latencyMs: 1000 }, authority: "propose-only", policyRevision: policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const fresh = proposal.intents.filter(candidate => candidate.expectedRevision === observation.basis.revision);
    const conflicted = conflictedIntentIds(fresh);
    const rows = conflictRowsOf(fresh, conflicted);
    const intent = fresh.find(candidate => !conflicted.has(candidate.intentId));
    if (intent === undefined) return rows.length > 0 ? { conflicts: rows } : null;
    const id = candidateOf(intent);
    if (id === null || !EFFECTS.has(intent.effect)) return rows.length > 0 ? { conflicts: rows } : null;
    return rows.length > 0 ? { effect: intent.effect as QuorumOracleEffect, id, conflicts: rows } : { effect: intent.effect as QuorumOracleEffect, id };
  };
}
