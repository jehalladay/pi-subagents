/**
 * Additive fixture families (GPC-EAT-R011, MechanicalWorkflows-yx4x): a heterogeneous landing
 * queue whose candidates carry non-uniform resource claims (the uniform {1,1,1,1} world lives
 * unchanged in landing-queue.ts), its temporal-shift variant (seeded mid-episode arrivals,
 * recorded on the episode and exported under its own environment literal), and a heterogeneous
 * DAG assignment (two agents, five tasks, three of them dependent) whose per-step assignment
 * comes from the capacity-aware matchingAssignment — never per-pair argmax. Everything is mode
 * "fixture"; the six existing environment literals, their modules and their committed fixtures
 * are untouched.
 */
import type { Budget, Intent, Policy, ResourceClaim } from "./contracts.js";
import { digest } from "./canonical.js";
import { reconcile, type Resolution } from "./resolver.js";
import { gateDraws } from "./landing-queue.js";
import { matchingAssignment } from "./assignment.js";

// ------------------------------------------------- heterogeneous landing (+ temporal shift)

export interface HeteroCandidate {
  readonly id: string;
  readonly base: string;
  readonly arrival: number;
  readonly claim: ResourceClaim;
}

export interface HeteroEvent {
  readonly step: number;
  readonly kind: "landed" | "gate-failed" | "restacked" | "refused" | "arrived";
  readonly candidate: string | null;
  readonly detail: string;
}

export interface HeteroState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly head: string;
  readonly lanes: number;
  readonly candidates: readonly HeteroCandidate[];
  readonly landed: readonly string[];
  readonly events: readonly HeteroEvent[];
}

export interface HeteroObservation {
  readonly basis: { readonly workspaceId: string; readonly revision: string };
  readonly head: string;
  readonly lanes: number;
  readonly ready: readonly HeteroCandidate[];
}

export interface HeteroStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly HeteroEvent[];
  readonly stateHash: string;
}

export interface TemporalShift {
  readonly atStep: number;
  readonly arrivals: number;
}

export interface HeteroRun {
  readonly seed: number;
  readonly candidates: number;
  readonly lanes: number;
  readonly steps: number;
  readonly policy: Policy<HeteroObservation, Intent, number>;
  /** Present = the temporal-shift variant: `arrivals` fresh candidates arrive at `atStep`. */
  readonly temporalShift?: TemporalShift | undefined;
}

export interface HeteroEpisode {
  readonly schema: "mw.landing-queue-heterogeneous.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly temporalShift?: TemporalShift | undefined;
  readonly steps: readonly HeteroStep[];
  readonly final: HeteroState;
  readonly initialHash: string;
  readonly finalHash: string;
}

const WORKSPACE = "fixture:landing-queue-heterogeneous";
const INITIAL_HEAD = "head-0";
const gatePasses = (draw: number): boolean => draw % 4 !== 0;

/** Deterministic non-uniform claim per candidate index; indices 0 and 3k stay uniform so both shapes exist. */
function heteroClaim(index: number): ResourceClaim {
  if (index % 3 === 0) return { compute: 1, workers: 1, queue: 1, latencyMs: 1 };
  return { compute: 1 + (index % 3), workers: 1, queue: 1, latencyMs: 1 + ((index * 2) % 5) };
}

function heteroCandidate(index: number, base: string, arrival: number): HeteroCandidate {
  return { id: `c${index + 1}`, base, arrival, claim: heteroClaim(index) };
}

function heteroStateHash(state: HeteroState): string {
  return digest(state);
}

function observe(state: HeteroState): HeteroObservation {
  const landed = new Set(state.landed);
  return {
    basis: { workspaceId: WORKSPACE, revision: state.head }, head: state.head, lanes: state.lanes,
    ready: state.candidates.filter(candidate => !landed.has(candidate.id)),
  };
}

const candidateOf = (intent: Intent): string | null =>
  intent.target.kind === "candidate" && intent.target.uri.startsWith("cand:") ? intent.target.uri.slice("cand:".length) : null;

function heteroIntent(policyId: string, observation: HeteroObservation, candidate: HeteroCandidate, effect: "land" | "restack"): Intent {
  return {
    intentId: `${policyId}:${effect}:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` },
    expectedRevision: observation.basis.revision, effect, claim: candidate.claim,
    // Parallel landings are this family's point: each land writes its own candidate ref (the head
    // advance is the environment's effect), so the shared budget — not a "main" write conflict — is
    // what prunes the proposal set. Restack reads main and rewrites only its candidate.
    evidenceRefs: [], writeScopes: [`cand:${candidate.id}`], readScopes: effect === "restack" ? ["main"] : [],
  };
}

/** Restack the first stale candidate; otherwise propose LAND for EVERY on-head candidate (the budget decides the prefix). */
export const heterogeneousRestackFirst: Policy<HeteroObservation, Intent, number> = {
  id: "hetero-restack-first", revision: "fixture-1",
  propose(observation, memory) {
    const stale = observation.ready.find(candidate => candidate.base !== observation.head);
    const onHead = observation.ready.filter(candidate => candidate.base === observation.head);
    const intents = stale !== undefined
      ? [heteroIntent("hetero-restack-first", observation, stale, "restack")]
      : onHead.map(candidate => heteroIntent("hetero-restack-first", observation, candidate, "land"));
    return {
      intents, memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "hetero-restack-first", detail: stale !== undefined ? `restack ${stale.id}` : onHead.length === 0 ? "nothing ready" : `land ${onHead.map(c => c.id).join(",")}` }],
    };
  },
};

function heteroBudget(state: HeteroState): Budget {
  return { compute: state.lanes + 1, workers: state.lanes, queue: state.candidates.length + 4, latencyMs: 6 };
}

/** Run the heterogeneous landing fixture; with temporalShift present, fresh candidates arrive mid-episode. */
export function runHeterogeneousLanding(run: HeteroRun): HeteroEpisode {
  if (run.candidates < 2 || run.lanes < 1 || run.steps < 1 || !Number.isInteger(run.seed) || run.seed < 0) {
    throw new RangeError(`FIXTURE_RUN_INVALID: seed ${run.seed}, candidates ${run.candidates}, lanes ${run.lanes}, steps ${run.steps}`);
  }
  if (run.temporalShift !== undefined && (run.temporalShift.atStep < 1 || run.temporalShift.arrivals < 1)) {
    throw new RangeError(`FIXTURE_RUN_INVALID: temporal shift atStep ${run.temporalShift.atStep}, arrivals ${run.temporalShift.arrivals}`);
  }
  const draw = gateDraws(run.seed);
  let state: HeteroState = {
    mode: "fixture", seed: run.seed, step: 0, head: INITIAL_HEAD, lanes: run.lanes,
    candidates: Array.from({ length: run.candidates }, (_, index) => heteroCandidate(index, INITIAL_HEAD, index)),
    landed: [], events: [],
  };
  const initialHash = heteroStateHash(state);
  let memory = 0;
  const steps: HeteroStep[] = [];
  for (let index = 0; index < run.steps; index += 1) {
    if (run.temporalShift !== undefined && state.step === run.temporalShift.atStep) {
      const born = Array.from({ length: run.temporalShift.arrivals }, (_, extra) => heteroCandidate(state.candidates.length + extra, state.head, state.step));
      const arrivalEvents: HeteroEvent[] = born.map(candidate => ({ step: state.step, kind: "arrived", candidate: candidate.id, detail: `${candidate.id} arrived at step ${state.step} based on ${state.head}` }));
      state = { ...state, candidates: [...state.candidates, ...born], events: [...state.events, ...arrivalEvents] };
    }
    const observation = observe(state);
    const observationDigest = digest(observation);
    const budget = heteroBudget(state);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:landing-queue-heterogeneous:${run.seed}`, actorId: run.policy.id, observationDigest, budget,
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget, protectedScopes: [], proposals: [proposal] });
    const step = state.step + 1;
    const events: HeteroEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", candidate: candidateOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` }));
    let head = state.head;
    let candidates = state.candidates;
    const landed = [...state.landed];
    for (const intent of resolution.admitted) {
      const id = candidateOf(intent);
      if (id === null) continue;
      if (intent.effect === "restack") {
        candidates = candidates.map(candidate => candidate.id === id ? { ...candidate, base: head } : candidate);
        events.push({ step, kind: "restacked", candidate: id, detail: `${id} rebased onto ${head}` });
      } else if (intent.effect === "land") {
        if (gatePasses(draw())) {
          landed.push(id);
          head = `head-${landed.length}`;
          events.push({ step, kind: "landed", candidate: id, detail: `${id} landed; head is now ${head}` });
        } else {
          events.push({ step, kind: "gate-failed", candidate: id, detail: `${id} failed the gate on ${head}` });
        }
      }
    }
    state = { ...state, step, head, candidates, landed, events: [...state.events, ...events] };
    steps.push({ step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events, stateHash: heteroStateHash(state) });
  }
  const base = { schema: "mw.landing-queue-heterogeneous.fixture.v1" as const, mode: "fixture" as const, seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: heteroStateHash(state) };
  return run.temporalShift === undefined ? base : { ...base, temporalShift: run.temporalShift };
}

// ------------------------------------------------- heterogeneous DAG assignment

export interface DagTask {
  readonly taskId: string;
  readonly dependsOn: readonly string[];
  readonly claim: ResourceClaim;
}

export interface DagAgent {
  readonly agentId: string;
  readonly capacity: Budget;
}

export interface DagEvent {
  readonly step: number;
  readonly kind: "assigned" | "completed" | "refused";
  readonly task: string | null;
  readonly detail: string;
}

export interface DagState {
  readonly mode: "fixture";
  readonly seed: number;
  readonly step: number;
  readonly agents: readonly DagAgent[];
  readonly tasks: readonly DagTask[];
  readonly completed: readonly string[];
  readonly events: readonly DagEvent[];
}

export interface DagObservation {
  readonly basis: { readonly workspaceId: string; readonly revision: string };
  readonly agents: readonly DagAgent[];
  readonly ready: readonly DagTask[];
}

export interface DagAssigned {
  readonly taskId: string;
  readonly agentId: string;
}

export interface DagStep {
  readonly step: number;
  readonly observationDigest: string;
  readonly proposed: readonly string[];
  readonly resolution: Resolution;
  readonly events: readonly DagEvent[];
  readonly stateHash: string;
  readonly assigned: readonly DagAssigned[];
  /** Tasks already completed BEFORE this step ran: the dependency witness. */
  readonly completedBefore: readonly string[];
}

export interface DagRun {
  readonly seed: number;
  readonly steps: number;
  readonly policy: Policy<DagObservation, Intent, number>;
}

export interface DagEpisode {
  readonly schema: "mw.dag-assignment.fixture.v1";
  readonly mode: "fixture";
  readonly seed: number;
  readonly policy: { readonly id: string; readonly revision: string };
  readonly steps: readonly DagStep[];
  readonly final: DagState;
  readonly initialHash: string;
  readonly finalHash: string;
}

const DAG_WORKSPACE = "fixture:dag-assignment";
/** Two one-worker agents with distinct compute, five tasks, three dependent: t3<-t1, t4<-t1+t2, t5<-t3. */
const DAG_AGENTS: readonly DagAgent[] = [
  { agentId: "A", capacity: { compute: 2, workers: 1, queue: 2, latencyMs: 10 } },
  { agentId: "B", capacity: { compute: 1, workers: 1, queue: 2, latencyMs: 10 } },
];
const DAG_TASKS: readonly DagTask[] = [
  { taskId: "t1", dependsOn: [], claim: { compute: 1, workers: 1, queue: 1, latencyMs: 2 } },
  { taskId: "t2", dependsOn: [], claim: { compute: 2, workers: 1, queue: 1, latencyMs: 3 } },
  { taskId: "t3", dependsOn: ["t1"], claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 } },
  { taskId: "t4", dependsOn: ["t1", "t2"], claim: { compute: 2, workers: 1, queue: 1, latencyMs: 2 } },
  { taskId: "t5", dependsOn: ["t3"], claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 } },
];
const DAG_BUDGET: Budget = { compute: 3, workers: 2, queue: 4, latencyMs: 10 };

function dagObserve(state: DagState): DagObservation {
  const done = new Set(state.completed);
  return {
    basis: { workspaceId: DAG_WORKSPACE, revision: `dag-${state.completed.length}` },
    agents: state.agents,
    ready: state.tasks.filter(task => !done.has(task.taskId) && task.dependsOn.every(dependency => done.has(dependency))),
  };
}

const taskOf = (intent: Intent): string | null =>
  intent.target.kind === "task" ? intent.target.uri : null;

/** The DAG fixture policy: matchingAssignment over the ready set — capacity-aware, never per-pair argmax. */
export const dagMatchingPolicy: Policy<DagObservation, Intent, number> = {
  id: "dag-matching", revision: "fixture-1",
  propose(observation, memory) {
    if (observation.ready.length === 0) {
      return { intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-matching", detail: "nothing ready" }] };
    }
    const assignment = matchingAssignment({
      basis: { workspaceId: DAG_WORKSPACE, revision: observation.basis.revision }, policyId: "dag-matching",
      agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
      tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
      score: (agentId, taskId) => (agentId === "A" ? 2 : 1) + Number(taskId.slice(1)) / 10,
      budget: DAG_BUDGET,
    });
    return { intents: [...assignment.intents], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-matching", detail: `assigned ${assignment.pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing"}` }] };
  },
};

/** Run the DAG fixture: each step assigns ready tasks (dependencies gate the ready set) and admitted intents complete. */
export function runDagAssignment(run: DagRun): DagEpisode {
  if (!Number.isInteger(run.seed) || run.seed < 0 || run.steps < 1) throw new RangeError(`FIXTURE_RUN_INVALID: seed ${run.seed}, steps ${run.steps}`);
  let state: DagState = { mode: "fixture", seed: run.seed, step: 0, agents: DAG_AGENTS, tasks: DAG_TASKS, completed: [], events: [] };
  const initialHash = digest(state);
  let memory = 0;
  const steps: DagStep[] = [];
  for (let index = 0; index < run.steps; index += 1) {
    const completedBefore = [...state.completed];
    const observation = dagObserve(state);
    const observationDigest = digest(observation);
    const proposal = run.policy.propose(observation, memory, {
      episodeId: `fixture:dag-assignment:${run.seed}`, actorId: run.policy.id, observationDigest, budget: DAG_BUDGET,
      authority: "propose-only", policyRevision: run.policy.revision, seed: run.seed,
    });
    memory = proposal.memory;
    const resolution = reconcile({ basis: observation.basis, budget: DAG_BUDGET, protectedScopes: [], proposals: [proposal] });
    const step = state.step + 1;
    const events: DagEvent[] = resolution.rejected.map(rejection => ({ step, kind: "refused", task: taskOf(rejection.intent), detail: `${rejection.code}: ${rejection.detail}` }));
    const assigned: DagAssigned[] = [];
    const completed = [...state.completed];
    for (const intent of resolution.admitted) {
      const taskId = taskOf(intent);
      if (taskId === null) continue;
      const agentId = intent.readScopes[0]?.replace(/^agent:/, "") ?? "unknown";
      assigned.push({ taskId, agentId });
      completed.push(taskId);
      events.push({ step, kind: "assigned", task: taskId, detail: `${taskId} assigned to ${agentId}` });
      events.push({ step, kind: "completed", task: taskId, detail: `${taskId} completed by ${agentId}` });
    }
    state = { ...state, step, completed, events: [...state.events, ...events] };
    steps.push({ step, observationDigest, proposed: proposal.intents.map(intent => intent.intentId), resolution, events, stateHash: digest(state), assigned, completedBefore });
  }
  return { schema: "mw.dag-assignment.fixture.v1", mode: "fixture", seed: run.seed, policy: { id: run.policy.id, revision: run.policy.revision }, steps, final: state, initialHash, finalHash: digest(state) };
}
