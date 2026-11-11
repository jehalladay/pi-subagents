import type { Budget, Intent, Policy } from "./contracts.js";
import { digest } from "./canonical.js";
import { reconcile, type Resolution } from "./resolver.js";
import { gateDraws, type LandingCandidate, type LandingObservation } from "./landing-queue.js";

/**
 * Elastic integrator lanes for the landing-queue fixture (collective-adaptation CA-R2, 07 family 1, 05 Load row).
 *
 * The plain runner in `landing-queue.ts` keeps its lane count fixed and its committed bytes unchanged. This runner
 * adds lanes as state: a lane is active or paused, may be reserved for one candidate, and a work effect (`land`,
 * `restack`) needs one usable lane per step. Lane changes arrive only as budgeted policy intents (`lane.allocate`,
 * `lane.reserve`, `lane.pause`, `lane.route`) through `reconcile`; every lane change is an event with its step and a
 * reason. Seeded interruptions pause a lane without any policy asking. Nothing here is live: the episode is labelled
 * `fixture` and the gate verdict is the same seeded draw the plain runner uses.
 */

export type LaneEffect = "lane.allocate" | "lane.reserve" | "lane.pause" | "lane.route";

export interface ElasticLane {
  readonly id: string;
  readonly status: "active" | "paused";
  /** The step at whose start a paused lane becomes active again; null while active. */
  readonly pausedUntil: number | null;
  readonly reservedFor: string | null;
}

export type ElasticEventKind = "landed" | "gate-failed" | "restacked" | "refused" | "lane-allocated" | "lane-reserved" | "lane-paused" | "lane-routed" | "lane-interrupted" | "lane-resumed";

export interface ElasticEvent {
  readonly step: number;
  readonly kind: ElasticEventKind;
  readonly candidate: string | null;
  readonly lane: string | null;
  readonly reason: string;
}

export interface ElasticState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly head: string;
  readonly maxLanes: number;
  readonly lanes: readonly ElasticLane[];
  readonly candidates: readonly LandingCandidate[];
  readonly landed: readonly string[];
  readonly events: readonly ElasticEvent[];
}

/** What an elastic policy observes: the plain landing observation (`lanes` is the active count) plus lane state. */
export interface ElasticObservation extends LandingObservation {
  readonly step: number;
  readonly maxLanes: number;
  readonly laneStates: readonly ElasticLane[];
}

export interface ElasticStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly ElasticEvent[];
  readonly activeLanes: number;
  /** Candidates waiting to land when the step began. */
  readonly queueLength: number;
  readonly stateHash: string;
}

/** The Load-row verdict: LOAD_INFEASIBLE marks a scenario no scheduler could finish, which is not a policy failure. */
export interface ElasticLoad {
  readonly feasible: boolean;
  readonly code: "LOAD_INFEASIBLE" | null;
  readonly idealSteps: number;
  readonly serialSteps: number;
  readonly stepsGiven: number;
  readonly starved: readonly string[];
  readonly policyFailure: boolean;
  readonly maxQueue: number;
}

export interface ElasticEpisode {
  readonly schema: "mw.landing-queue.elastic.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly ElasticStep[];
  readonly final: ElasticState;
  readonly finalHash: string;
  readonly load: ElasticLoad;
}

export interface ElasticRun {
  readonly seed: number;
  readonly candidates: number;
  readonly lanes: number;
  readonly maxLanes: number;
  readonly steps: number;
  readonly policy: Policy<ElasticObservation, Intent, number>;
}

export interface LaneIntentSpec {
  readonly effect: LaneEffect;
  readonly reason: string;
  readonly lane?: string;
  readonly candidate?: string;
}

/** A paused lane is out for this many steps. */
export const PAUSE_STEPS = 2;

const WORKSPACE = "fixture:landing-queue";
const INITIAL_HEAD = "head-0";

function gatePasses(draw: number): boolean {
  return draw % 4 !== 0;
}

function interruptionDraws(seed: number): () => number {
  return gateDraws((seed ^ 0x5bd1e995) >>> 0);
}

function initialState(run: ElasticRun): ElasticState {
  return {
    mode: "fixture", seed: run.seed, step: 0, head: INITIAL_HEAD, maxLanes: run.maxLanes,
    lanes: Array.from({ length: run.lanes }, (_, index) => ({ id: `l${index + 1}`, status: "active", pausedUntil: null, reservedFor: null })),
    candidates: Array.from({ length: run.candidates }, (_, index) => ({ id: `c${index + 1}`, base: INITIAL_HEAD, arrival: index })),
    landed: [], events: [],
  };
}

function observe(state: ElasticState): ElasticObservation {
  const landed = new Set(state.landed);
  return {
    basis: { workspaceId: WORKSPACE, revision: state.head }, head: state.head, lanes: state.lanes.filter(lane => lane.status === "active").length,
    ready: state.candidates.filter(candidate => !landed.has(candidate.id)), step: state.step + 1, maxLanes: state.maxLanes, laneStates: state.lanes,
  };
}

/** Build a lane-effect intent. Each effect claims what it costs; the scopes keep two changes to one lane in conflict. */
export function laneIntent(policyId: string, observation: LandingObservation, spec: LaneIntentSpec): Intent {
  const lane = spec.lane ?? "new";
  const uri = spec.candidate === undefined ? `lane:${lane}` : `lane:${lane}:cand:${spec.candidate}`;
  const compute = spec.effect === "lane.allocate" ? 1 : 0;
  return {
    intentId: `${policyId}:${spec.effect}:${uri}`, policyId, target: { kind: "lane", uri }, expectedRevision: observation.basis.revision, effect: spec.effect,
    claim: { compute, workers: 0, queue: 1, latencyMs: 1 }, evidenceRefs: [`reason:${spec.reason}`],
    writeScopes: [spec.effect === "lane.allocate" ? "lane:new" : `lane:${lane}`], readScopes: [],
  };
}

function workIntent(policyId: string, observation: LandingObservation, candidate: LandingCandidate, effect: "land" | "restack"): Intent {
  return {
    intentId: `${policyId}:${effect}:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` }, expectedRevision: observation.basis.revision, effect,
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [],
    writeScopes: effect === "land" ? ["main"] : [`cand:${candidate.id}`], readScopes: effect === "land" ? [] : ["main"],
  };
}

/**
 * Restacks every stale candidate the active lanes can take in parallel (disjoint scopes), then lands the oldest candidate on
 * the head; allocates one more lane when stale candidates outnumber active lanes and the ceiling allows it.
 */
export const elasticLanes: Policy<ElasticObservation, Intent, number> = {
  id: "elastic-lanes", revision: "fixture-1",
  propose(observation, memory) {
    const stale = observation.ready.filter(candidate => candidate.base !== observation.head);
    const onHead = observation.ready.find(candidate => candidate.base === observation.head);
    const intents: Intent[] = stale.slice(0, observation.lanes).map(candidate => workIntent("elastic-lanes", observation, candidate, "restack"));
    let detail = "nothing ready";
    if (stale.length > 0) {
      detail = `restack ${intents.length} of ${stale.length} stale`;
      if (stale.length > observation.lanes && observation.lanes < observation.maxLanes) {
        intents.push(laneIntent("elastic-lanes", observation, { effect: "lane.allocate", reason: `${stale.length} stale candidates exceed ${observation.lanes} active lanes` }));
        detail += "; allocate a lane";
      }
    } else if (onHead !== undefined) {
      intents.push(workIntent("elastic-lanes", observation, onHead, "land"));
      detail = `land ${onHead.id}`;
    }
    return { intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: "elastic-lanes", detail }] };
  },
};

function reasonOf(intent: Intent): string {
  const ref = intent.evidenceRefs.find(candidate => candidate.startsWith("reason:"));
  return ref === undefined ? `policy intent ${intent.intentId}` : ref.slice("reason:".length);
}

const LANE_URI = /^lane:(new|l\d+)(?::cand:(c\d+))?$/;

function budgetFor(state: ElasticState): Budget {
  return { compute: state.maxLanes, workers: state.lanes.filter(lane => lane.status === "active").length, queue: state.candidates.length, latencyMs: 1000 };
}

function candidateIn(intent: Intent): string | null {
  if (intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:")) return intent.target.uri.slice("cand:".length);
  return LANE_URI.exec(intent.target.uri)?.[2] ?? null;
}

function laneIn(intent: Intent): string | null {
  const lane = LANE_URI.exec(intent.target.uri)?.[1];
  return lane === undefined || lane === "new" ? null : lane;
}

function apply(state: ElasticState, resolution: Resolution, draw: () => number, step: number, pre: readonly ElasticEvent[]): ElasticState {
  const events: ElasticEvent[] = [...pre];
  const refuse = (candidate: string | null, lane: string | null, reason: string): void => { events.push({ step, kind: "refused", candidate, lane, reason }); };
  for (const rejection of resolution.rejected) refuse(candidateIn(rejection.intent), laneIn(rejection.intent), `${rejection.code}: ${rejection.detail}`);
  let lanes = state.lanes.map(lane => ({ ...lane }));
  const find = (id: string): { -readonly [K in keyof ElasticLane]: ElasticLane[K] } | undefined => lanes.find(lane => lane.id === id);
  let head = state.head;
  let candidates = state.candidates;
  const landed = [...state.landed];
  const known = new Set(state.candidates.map(candidate => candidate.id));
  const routes = new Map<string, string>();
  const laneEffects: Intent[] = [];
  const work: Intent[] = [];
  for (const intent of resolution.admitted) {
    if (intent.effect === "lane.route") {
      const lane = laneIn(intent);
      const candidate = candidateIn(intent);
      if (lane === null || find(lane) === undefined) { refuse(candidate, lane, `LANE_UNKNOWN: lane ${lane ?? "(none)"} does not exist`); continue; }
      if (candidate === null || !known.has(candidate)) { refuse(candidate, lane, `LANE_UNKNOWN: candidate ${candidate ?? "(none)"} does not exist`); continue; }
      routes.set(candidate, lane);
      events.push({ step, kind: "lane-routed", candidate, lane, reason: reasonOf(intent) });
    } else if (intent.effect === "lane.reserve" || intent.effect === "lane.pause" || intent.effect === "lane.allocate") laneEffects.push(intent);
    else if (intent.effect === "land" || intent.effect === "restack") work.push(intent);
    else refuse(candidateIn(intent), null, `effect ${intent.effect} is not a landing-queue effect`);
  }
  const used = new Set<string>();
  for (const intent of work) {
    const id = candidateIn(intent);
    if (id === null) continue;
    const routed = routes.get(id);
    const usable = (lane: ElasticLane): boolean => lane.status === "active" && !used.has(lane.id) && (lane.reservedFor === null || lane.reservedFor === id);
    const lane = routed !== undefined
      ? lanes.find(candidate => candidate.id === routed && usable(candidate))
      : lanes.find(candidate => usable(candidate) && candidate.reservedFor === id) ?? lanes.find(candidate => usable(candidate) && candidate.reservedFor === null);
    if (lane === undefined) { refuse(id, routed ?? null, `LANE_UNAVAILABLE: no usable lane for ${id}${routed === undefined ? "" : ` (routed to ${routed})`}`); continue; }
    used.add(lane.id);
    if (intent.effect === "restack") {
      candidates = candidates.map(candidate => candidate.id === id ? { ...candidate, base: head } : candidate);
      events.push({ step, kind: "restacked", candidate: id, lane: lane.id, reason: `${id} rebased onto ${head}` });
    } else if (gatePasses(draw())) {
      landed.push(id);
      head = `head-${landed.length}`;
      events.push({ step, kind: "landed", candidate: id, lane: lane.id, reason: `${id} landed; head is now ${head}` });
    } else {
      events.push({ step, kind: "gate-failed", candidate: id, lane: lane.id, reason: `${id} failed the gate on ${head}` });
    }
  }
  for (const intent of laneEffects) {
    const reason = reasonOf(intent);
    if (intent.effect === "lane.allocate") {
      if (lanes.length >= state.maxLanes) { refuse(null, null, `LANE_CAP_REACHED: ${lanes.length} lanes already allocated of ${state.maxLanes}`); continue; }
      const id = `l${lanes.length + 1}`;
      lanes = [...lanes, { id, status: "active", pausedUntil: null, reservedFor: null }];
      events.push({ step, kind: "lane-allocated", candidate: null, lane: id, reason });
      continue;
    }
    const id = laneIn(intent);
    const lane = id === null ? undefined : find(id);
    if (id === null || lane === undefined) { refuse(candidateIn(intent), id, `LANE_UNKNOWN: lane ${id ?? "(none)"} does not exist`); continue; }
    if (intent.effect === "lane.pause") {
      if (lane.status === "paused") { refuse(null, id, `LANE_UNAVAILABLE: lane ${id} is already paused`); continue; }
      lane.status = "paused"; lane.pausedUntil = step + 1 + PAUSE_STEPS;
      events.push({ step, kind: "lane-paused", candidate: null, lane: id, reason });
    } else {
      const candidate = candidateIn(intent);
      if (candidate === null || !known.has(candidate)) { refuse(candidate, id, `LANE_UNKNOWN: candidate ${candidate ?? "(none)"} does not exist`); continue; }
      for (const other of lanes) if (other.reservedFor === candidate) other.reservedFor = null;
      lane.reservedFor = candidate;
      events.push({ step, kind: "lane-reserved", candidate, lane: id, reason });
    }
  }
  return { ...state, step, head, lanes, candidates, landed, events: [...state.events, ...events] };
}

/** Start of a step: lanes whose pause elapsed resume, then one seeded draw may interrupt an active lane (never the last one). */
function startOfStep(state: ElasticState, step: number, interruption: number): { readonly state: ElasticState; readonly events: readonly ElasticEvent[] } {
  const events: ElasticEvent[] = [];
  const lanes = state.lanes.map(lane => {
    if (lane.status === "paused" && lane.pausedUntil !== null && lane.pausedUntil <= step) {
      events.push({ step, kind: "lane-resumed", candidate: null, lane: lane.id, reason: "pause elapsed" });
      return { ...lane, status: "active" as const, pausedUntil: null };
    }
    return lane;
  });
  const active = lanes.filter(lane => lane.status === "active");
  if (interruption % 5 === 0 && active.length >= 2) {
    const target = active[(interruption >>> 3) % active.length]!;
    events.push({ step, kind: "lane-interrupted", candidate: null, lane: target.id, reason: "seeded interruption" });
    return { state: { ...state, lanes: lanes.map(lane => lane.id === target.id ? { ...lane, status: "paused" as const, pausedUntil: step + PAUSE_STEPS } : lane) }, events };
  }
  return { state: { ...state, lanes }, events };
}

export interface LoadBounds {
  /** No scheduler finishes sooner: every landing needs its own attempt step and, between landings, one restack step. */
  readonly idealSteps: number;
  /** One lane, every restack serial: a policy that always uses its lane finishes within this many steps. */
  readonly serialSteps: number;
}

/** The independent load oracle: plain arithmetic over the gate draws, no policy, resolver or lane record. */
export function oracleLoadBounds(run: { readonly seed: number; readonly candidates: number }): LoadBounds {
  const draw = gateDraws(run.seed);
  let passes = 0;
  let attempts = 0;
  while (passes < run.candidates) { attempts += 1; if (gatePasses(draw())) passes += 1; }
  const restackRounds = Math.max(0, run.candidates - 1);
  return { idealSteps: attempts + restackRounds, serialSteps: attempts + (run.candidates * (run.candidates - 1)) / 2 };
}

function stateHash(state: ElasticState): string {
  return digest(state);
}

/** Run one policy against elastic lanes for a fixed number of steps; every lane change is an event with step and reason. */
export function runElasticLanding(run: ElasticRun): ElasticEpisode {
  const draw = gateDraws(run.seed);
  const interrupt = interruptionDraws(run.seed);
  let state = initialState(run);
  let memory = 0;
  const steps: ElasticStep[] = [];
  let maxQueue = 0;
  for (let index = 0; index < run.steps; index += 1) {
    const step = state.step + 1;
    const begun = startOfStep(state, step, interrupt());
    state = begun.state;
    const observation = observe(state);
    const observationDigest = digest(observation);
    const budget = budgetFor(state);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:landing-queue-elastic:${run.seed}`, actorId: run.policy.id, observationDigest, budget,
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget, protectedScopes: [], proposals: [proposal] });
    const before = state.events.length;
    state = apply(state, resolution, draw, step, begun.events);
    maxQueue = Math.max(maxQueue, observation.ready.length);
    steps.push({
      step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events: state.events.slice(before),
      activeLanes: observation.lanes, queueLength: observation.ready.length, stateHash: stateHash(state),
    });
  }
  const bounds = oracleLoadBounds({ seed: run.seed, candidates: run.candidates });
  const starved = state.candidates.map(candidate => candidate.id).filter(id => !state.landed.includes(id));
  const feasible = run.steps >= bounds.idealSteps;
  return {
    schema: "mw.landing-queue.elastic.fixture.v1", mode: "fixture", seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, finalHash: stateHash(state),
    load: { feasible, code: feasible ? null : "LOAD_INFEASIBLE", idealSteps: bounds.idealSteps, serialSteps: bounds.serialSteps, stepsGiven: run.steps, starved, policyFailure: feasible && starved.length > 0, maxQueue },
  };
}
