import type { Basis, Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { reconcile, type Resolution } from "./resolver.js";

/**
 * The landing-queue fixture environment (collective-adaptation M0/M1, MWCOL-003): a seeded, deterministic
 * simulation of candidates waiting to land on a moving head behind an independent gate. It is labelled `fixture`
 * and nothing can relabel it. No file, process, network or product is touched: the gate verdict is a seeded
 * pseudo-random draw, the head is a counter, and every transition is a pure function of the previous state.
 */

export interface LandingCandidate {
  readonly id: string;
  /** The head revision the candidate was last based on; a landing on another head makes it stale. */
  readonly base: string;
  readonly arrival: number;
}

export type LandingEventKind = "landed" | "gate-failed" | "restacked" | "refused";

export interface LandingEvent {
  readonly step: number;
  readonly kind: LandingEventKind;
  readonly candidate: string | null;
  readonly detail: string;
}

export interface LandingQueueState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly head: string;
  readonly lanes: number;
  readonly candidates: readonly LandingCandidate[];
  readonly landed: readonly string[];
  readonly events: readonly LandingEvent[];
}

/** What a landing policy observes: the pinned basis, the head, the lane count and the unlanded candidates in arrival order. */
export interface LandingObservation {
  readonly basis: Basis;
  readonly head: string;
  readonly lanes: number;
  readonly ready: readonly LandingCandidate[];
}

export interface LandingStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly LandingEvent[];
  readonly stateHash: string;
}

export interface LandingQueueEpisode {
  readonly schema: "mw.landing-queue.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly LandingStep[];
  readonly final: LandingQueueState;
  /** The state hash before step 0 (the freshly built initial state). */
  readonly initialHash: string;
  readonly finalHash: string;
}

export interface LandingQueueRun {
  readonly seed: number;
  readonly candidates: number;
  readonly lanes: number;
  readonly steps: number;
  readonly policy: Policy<LandingObservation, Intent, number>;
}

const WORKSPACE = "fixture:landing-queue";
const INITIAL_HEAD = "head-0";

/**
 * The state gateDraws starts a seed's xorshift32 stream from: the seed run through a splitmix32 finaliser (add the golden-ratio increment 0x9e3779b9, then the murmur3 fmix32 rounds 16/0x85ebca6b/13/0xc2b2ae35/16), with the zero state remapped to 1.
 * The finaliser is a bijection on uint32, so the first draw of every seed is a well-mixed function of the whole seed (seeds 0..7 no longer open on one decile), and distinct seeds start distinct streams except for the two whose finalised state is 0 or 1.
 */
export function gateStreamStart(seed: number): number {
  let z = (seed + 0x9e3779b9) >>> 0;
  z = Math.imul(z ^ (z >>> 16), 0x85ebca6b) >>> 0;
  z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35) >>> 0;
  z = (z ^ (z >>> 16)) >>> 0;
  return z || 1;
}

/** xorshift32 over the finalised seed (gateStreamStart): the fixture's only randomness, drawn once per admitted landing attempt. */
export function gateDraws(seed: number): () => number {
  let x = gateStreamStart(seed);
  return () => {
    x ^= x << 13; x >>>= 0;
    x ^= x >>> 17;
    x ^= x << 5; x >>>= 0;
    return x;
  };
}

/** Three of four draws pass the fixture gate; the fourth is a red verdict the policy did not choose. */
function gatePasses(draw: number): boolean {
  return draw % 4 !== 0;
}

function initialState(seed: number, candidates: number, lanes: number): LandingQueueState {
  return {
    mode: "fixture", seed, step: 0, head: INITIAL_HEAD, lanes,
    candidates: Array.from({ length: candidates }, (_, index) => ({ id: `c${index + 1}`, base: INITIAL_HEAD, arrival: index })),
    landed: [], events: [],
  };
}

function observe(state: LandingQueueState): LandingObservation {
  const landed = new Set(state.landed);
  return {
    basis: { workspaceId: WORKSPACE, revision: state.head }, head: state.head, lanes: state.lanes,
    ready: state.candidates.filter(candidate => !landed.has(candidate.id)),
  };
}

function candidateOf(intent: Intent): string | null {
  return intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:") ? intent.target.uri.slice("cand:".length) : null;
}

function landIntent(policyId: string, observation: LandingObservation, candidate: LandingCandidate): Intent {
  return {
    intentId: `${policyId}:land:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` },
    expectedRevision: observation.basis.revision, effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [], writeScopes: ["main"], readScopes: [],
  };
}

function restackIntent(policyId: string, observation: LandingObservation, candidate: LandingCandidate): Intent {
  return {
    intentId: `${policyId}:restack:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` },
    expectedRevision: observation.basis.revision, effect: "restack", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [], writeScopes: [`cand:${candidate.id}`], readScopes: ["main"],
  };
}

/** Lands the oldest candidate whose base is the head; proposes nothing when none is, so a moving head starves it. */
export const fifoLanding: Policy<LandingObservation, Intent, number> = {
  id: "fifo-landing", revision: "fixture-1",
  propose(observation, memory) {
    const next = observation.ready.find(candidate => candidate.base === observation.head);
    return {
      intents: next === undefined ? [] : [landIntent("fifo-landing", observation, next)], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "fifo-landing", detail: next === undefined ? "no candidate on head" : `land ${next.id}` }],
    };
  },
};

/** Restacks the oldest stale candidate before landing the oldest one already on the head. */
export const restackFirst: Policy<LandingObservation, Intent, number> = {
  id: "restack-first", revision: "fixture-1",
  propose(observation, memory) {
    const stale = observation.ready.find(candidate => candidate.base !== observation.head);
    const onHead = observation.ready.find(candidate => candidate.base === observation.head);
    const intents = stale !== undefined ? [restackIntent("restack-first", observation, stale)] : onHead !== undefined ? [landIntent("restack-first", observation, onHead)] : [];
    return {
      intents, memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "restack-first", detail: stale !== undefined ? `restack ${stale.id}` : onHead !== undefined ? `land ${onHead.id}` : "nothing ready" }],
    };
  },
};

function budgetFor(state: LandingQueueState): Budget {
  return { compute: state.lanes, workers: state.lanes, queue: state.candidates.length, latencyMs: 1000 };
}

function apply(state: LandingQueueState, resolution: Resolution, draw: () => number): { readonly state: LandingQueueState; readonly events: readonly LandingEvent[] } {
  const step = state.step + 1;
  const events: LandingEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", candidate: candidateOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` }));
  let head = state.head;
  let candidates = state.candidates;
  const landed = [...state.landed];
  for (const intent of resolution.admitted) {
    const id = candidateOf(intent);
    if (id === null) continue;
    // A land or restack acts only on a candidate still in the ready set (known, not landed); anything else is refused and spends no gate draw.
    if ((intent.effect === "land" || intent.effect === "restack") && (!candidates.some(candidate => candidate.id === id) || landed.includes(id))) {
      events.push({ step, kind: "refused", candidate: id, detail: `${id} is not in the ready set; ${intent.effect} refused` });
      continue;
    }
    if (intent.effect === "restack") {
      candidates = candidates.map(candidate => candidate.id === id ? { ...candidate, base: head } : candidate);
      events.push({ step, kind: "restacked", candidate: id, detail: `${id} rebased onto ${head}` });
    } else if (intent.effect === "land") {
      const verdict = draw();
      if (gatePasses(verdict)) {
        landed.push(id);
        head = `head-${landed.length}`;
        events.push({ step, kind: "landed", candidate: id, detail: `${id} landed; head is now ${head}` });
      } else {
        events.push({ step, kind: "gate-failed", candidate: id, detail: `${id} failed the gate on ${head}` });
      }
    } else {
      events.push({ step, kind: "refused", candidate: id, detail: `effect ${intent.effect} is not a landing-queue effect` });
    }
  }
  return { state: { ...state, step, head, candidates, landed, events: [...state.events, ...events] }, events };
}

/** `digest` of the whole state, events included: equal states have equal hashes whatever produced them. */
export function stateHash(state: LandingQueueState): string {
  return digest(state);
}

/** Run one policy against the fixture for a fixed number of steps; every step records what was proposed, resolved and applied. */
export function runLandingQueue(run: LandingQueueRun): LandingQueueEpisode {
  const draw = gateDraws(run.seed);
  let state = initialState(run.seed, run.candidates, run.lanes);
  const initialHash = stateHash(state);
  let memory = 0;
  const steps: LandingStep[] = [];
  for (let index = 0; index < run.steps; index += 1) {
    const observation = observe(state);
    const observationDigest = digest(observation);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:landing-queue:${run.seed}`, actorId: run.policy.id, observationDigest, budget: budgetFor(state),
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget: budgetFor(state), protectedScopes: [], proposals: [proposal] });
    const applied = apply(state, resolution, draw);
    state = applied.state;
    steps.push({ step: state.step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events: applied.events, stateHash: stateHash(state) });
  }
  return { schema: "mw.landing-queue.fixture.v1", mode: "fixture", seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: stateHash(state) };
}

/**
 * The independent oracle: plain loops over the same seed and draw sequence, no policy, resolver or event record,
 * answering only the order in which candidates land. A harness run that disagrees with it is wrong somewhere.
 */
export function oracleLandedOrder(run: { readonly seed: number; readonly candidates: number; readonly steps: number; readonly policy: "fifo" | "restack-first" }): string[] {
  const draw = gateDraws(run.seed);
  const bases = new Map<string, string>(Array.from({ length: run.candidates }, (_, index) => [`c${index + 1}`, INITIAL_HEAD]));
  const landed: string[] = [];
  let head = INITIAL_HEAD;
  for (let step = 0; step < run.steps; step += 1) {
    const waiting = [...bases.keys()].filter(id => !landed.includes(id));
    const stale = waiting.find(id => bases.get(id) !== head);
    const onHead = waiting.find(id => bases.get(id) === head);
    if (run.policy === "restack-first" && stale !== undefined) { bases.set(stale, head); continue; }
    if (onHead === undefined) continue;
    if (gatePasses(draw())) { landed.push(onHead); head = `head-${landed.length}`; }
  }
  return landed;
}

/** A fixture episode stays a fixture: any other label is a mode upgrade the program forbids (MWCOL-004). */
export function labelEpisode(episode: LandingQueueEpisode, mode: string): LandingQueueEpisode {
  if (mode !== "fixture") throw new Error(`EPISODE_MODE_UPGRADE_FORBIDDEN: a fixture episode cannot be labelled ${mode}`);
  return episode;
}
