/**
 * The executed synthetic vertical cut (GPC-EAT-R009, MechanicalWorkflows-trys). One pure function
 * runs the two pinned tiny instances — the seed-7 landing queue (4 candidates, 1 lane, 12-step cap)
 * and the seed-7 five-task/two-agent DAG (8-step cap) — under four arms {exact-oracle, fifo,
 * gp-scorer, restack} and reports every GPC-EAT-R010 metric per graph family through
 * `evaluateGraphFamilies`, extended ADDITIVELY with `mode: "fixture"` and a provenance block.
 * Nothing here is a promotion claim: `certified` is the literal false everywhere and the mode is
 * the literal "fixture" (no arm is ever labelled live).
 *
 * The regret definition and instance sizes are fixed BEFORE the run (C034): each arm's episode is
 * the run at the MINIMAL step count at which that arm completes the family's work (all candidates
 * landed; all tasks completed), capped at `stepsCap` (a non-completing arm carries the cap), and
 * regretMicro is meanStepsMicro(arm) - meanStepsMicro(exact-oracle) as evaluateGraphFamilies
 * defines it. The exact-oracle arm is exact by enumeration: the landing oracle searches the FULL
 * two-action script space (land-first-on-head / restack-first-stale; candidate identity within a
 * class is irrelevant because bases are equal within a class), smallest step count first, and the
 * DAG oracle searches all 120 task-priority orders greedily packed by capacity-aware matching —
 * at this instance the found minimum equals the ceil(5 tasks / 2 workers) = 3 lower bound, a
 * per-instance exactness certificate asserted by the tests. The learned arm is the configured
 * graph-policy host (GPC-EAT-R006 scaffold) over deterministic graph-feature clients with pinned
 * weights; the wall-clock cost is the pinned deterministic injection steps * 1000 micro (no clock
 * is read: purity). Synthetic only — this report makes no live claim.
 */
import type { Intent, Policy, PolicyContext } from "./contracts.js";
import { evaluateGraphFamilies, type GraphFamilyArm, type GraphFamilyBlock } from "./graph-family-evaluation.js";
import { runLandingQueue, fifoLanding, restackFirst, type LandingObservation, type LandingQueueEpisode, type LandingCandidate } from "./landing-queue.js";
import { runDagAssignment, type DagObservation, type DagEpisode } from "./fixture-families.js";
import { matchingAssignment } from "./assignment.js";
import { graphPolicyHost, type GraphPolicyHostConfiguration } from "./graph-policy-host.js";
import { toEpisode, type Episode, type Maybe } from "./episode.js";
import { canonicalJson, digest } from "./canonical.js";

export interface VerticalCutInstances {
  readonly landing: { readonly seed: number; readonly candidates: number; readonly lanes: number; readonly stepsCap: number };
  readonly dag: { readonly seed: number; readonly stepsCap: number };
}

/** The pinned tiny instances: the committed seed-7 landing queue and the five-task DAG. */
export const VERTICAL_CUT_INSTANCES: VerticalCutInstances = {
  landing: { seed: 7, candidates: 4, lanes: 1, stepsCap: 12 },
  dag: { seed: 7, stepsCap: 8 },
};

/** The canonical arm list, sorted; the report's blocks carry exactly these rows. */
export const VERTICAL_CUT_ARMS: readonly string[] = ["exact-oracle", "fifo", "gp-scorer", "restack"];

/** Fixed before the run (C034): what regret means here, in one sentence the report embeds. */
export const VERTICAL_CUT_REGRET_DEFINITION =
  "regretMicro = meanStepsMicro(arm) - meanStepsMicro(exact-oracle) per family, where each arm's episode runs the minimal step count at which that arm completes the family's work (all candidates landed; all tasks completed), capped at stepsCap; a non-completing arm carries stepsCap steps.";

export const WALL_CLOCK_MICRO_PER_STEP = 1000;
const DAG_TASK_IDS: readonly string[] = ["t1", "t2", "t3", "t4", "t5"];

export interface VerticalCutOracleWitness {
  readonly landing: { readonly steps: number; readonly script: string };
  readonly dag: { readonly steps: number; readonly priority: readonly string[] };
}

export interface VerticalCutLearnedArm {
  readonly mechanism: "graph-policy-host";
  readonly landing: GraphPolicyHostConfiguration;
  readonly dag: GraphPolicyHostConfiguration;
}

export interface VerticalCutProvenance {
  readonly instances: VerticalCutInstances;
  readonly regretDefinition: string;
  readonly wallClockMicroPerStep: number;
  readonly arms: readonly string[];
  readonly oracle: VerticalCutOracleWitness;
  readonly learnedArm: VerticalCutLearnedArm;
}

export interface VerticalCutReport {
  readonly schema: "mw.graph-family-evaluation.v1";
  readonly mode: "fixture";
  readonly certified: false;
  readonly oracleArm: Maybe<string>;
  readonly families: readonly GraphFamilyBlock[];
  readonly provenance: VerticalCutProvenance;
  readonly reportDigest: string;
}

const fail = (detail: string): never => { throw new RangeError(`VERTICAL_CUT_INVALID: ${detail}`); };
const positiveInt = (value: number, name: string): void => {
  if (!Number.isInteger(value) || value < 1) fail(`${name} must be a positive integer, got ${String(value)}`);
};

export function landIntent(policyId: string, observation: LandingObservation, candidate: LandingCandidate): Intent {
  return {
    intentId: `${policyId}:land:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` },
    expectedRevision: observation.basis.revision, effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [], writeScopes: ["main"], readScopes: [],
  };
}

export function restackIntent(policyId: string, observation: LandingObservation, candidate: LandingCandidate): Intent {
  return {
    intentId: `${policyId}:restack:${candidate.id}`, policyId, target: { kind: "candidate", uri: `cand:${candidate.id}` },
    expectedRevision: observation.basis.revision, effect: "restack", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 },
    evidenceRefs: [], writeScopes: [`cand:${candidate.id}`], readScopes: ["main"],
  };
}

/** A two-action landing script: character i decides step i (0 = land first on-head, 1 = restack first stale), infeasible actions fall through. */
function scriptedLanding(script: string): Policy<LandingObservation, Intent, number> {
  const id = "exact-oracle-landing";
  return {
    id, revision: "fixture-1",
    propose(observation, memory) {
      const bit = script[memory] ?? "0";
      const onHead = observation.ready.find(candidate => candidate.base === observation.head);
      const stale = observation.ready.find(candidate => candidate.base !== observation.head);
      const chosen = bit === "1"
        ? (stale !== undefined ? restackIntent(id, observation, stale) : onHead !== undefined ? landIntent(id, observation, onHead) : undefined)
        : (onHead !== undefined ? landIntent(id, observation, onHead) : undefined);
      return { intents: chosen === undefined ? [] : [chosen], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: chosen === undefined ? "nothing feasible" : chosen.intentId }] };
    },
  };
}

const landingDone = (episode: LandingQueueEpisode, candidates: number): boolean => episode.final.landed.length === candidates;
const dagDone = (episode: DagEpisode): boolean => episode.final.completed.length === episode.final.tasks.length;

/** Exhaustive landing oracle: smallest step count first, then smallest script value; exact over the full two-action space. */
export function searchLandingOracle(instance: VerticalCutInstances["landing"]): { episode: LandingQueueEpisode; steps: number; script: string } {
  for (let steps = 1; steps <= instance.stepsCap; steps += 1) {
    for (let value = 0; value < 2 ** steps; value += 1) {
      const script = value.toString(2).padStart(steps, "0");
      const episode = runLandingQueue({ seed: instance.seed, candidates: instance.candidates, lanes: instance.lanes, steps, policy: scriptedLanding(script) });
      if (landingDone(episode, instance.candidates)) return { episode, steps, script };
    }
  }
  return fail(`no landing script completes ${instance.candidates} candidates within stepsCap ${instance.stepsCap}`);
}

/** Capacity-aware greedy packing by a fixed task-priority order, as a DAG policy. */
function dagPriorityPolicy(id: string, priority: readonly string[]): Policy<DagObservation, Intent, number> {
  return {
    id, revision: "fixture-1",
    propose(observation, memory, context: PolicyContext) {
      if (observation.ready.length === 0) return { intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: "nothing ready" }] };
      const assignment = matchingAssignment({
        basis: { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision }, policyId: id,
        agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
        tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
        score: (_agentId, taskId) => priority.length - priority.indexOf(taskId),
        budget: context.budget,
      });
      return { intents: [...assignment.intents], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: assignment.pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing" }] };
    },
  };
}

function permutations(values: readonly string[]): string[][] {
  if (values.length <= 1) return [[...values]];
  return values.flatMap((value, index) => permutations([...values.slice(0, index), ...values.slice(index + 1)]).map(rest => [value, ...rest]));
}

/** Exhaustive DAG oracle: all task-priority orders, smallest step count first; the tests pin the found minimum to the ceil(tasks/workers) lower bound. */
export function searchDagOracle(instance: VerticalCutInstances["dag"]): { episode: DagEpisode; steps: number; priority: readonly string[] } {
  const orders = permutations(DAG_TASK_IDS);
  for (let steps = 1; steps <= instance.stepsCap; steps += 1) {
    for (const priority of orders) {
      const episode = runDagAssignment({ seed: instance.seed, steps, policy: dagPriorityPolicy("exact-oracle-dag", priority) });
      if (dagDone(episode)) return { episode, steps, priority };
    }
  }
  return fail(`no task-priority order completes the DAG within stepsCap ${instance.stepsCap}`);
}

/** The deterministic landing graph-feature client: pinned action scores, log-softmax logProb for the chosen action. */
export function landingGpClient(observation: LandingObservation): unknown {
  const onHead = observation.ready.filter(candidate => candidate.base === observation.head);
  const stale = observation.ready.filter(candidate => candidate.base !== observation.head);
  if (observation.ready.length === 0) return { status: "abstain" };
  const actions: { intent: Intent; score: number }[] = [];
  if (onHead.length > 0) actions.push({ intent: landIntent("gp-scorer", observation, onHead[0]!), score: 1.5 * onHead.length });
  if (stale.length > 0) actions.push({ intent: restackIntent("gp-scorer", observation, stale[0]!), score: 1.0 * stale.length });
  if (actions.length === 0) return { status: "abstain" };
  const max = Math.max(...actions.map(action => action.score));
  const total = actions.reduce((sum, action) => sum + Math.exp(action.score - max), 0);
  const best = actions.reduce((lead, action) => (action.score > lead.score ? action : lead), actions[0]!);
  return { status: "proposal", intents: [best.intent], logProb: best.score - max - Math.log(total) };
}

/** The deterministic DAG graph-feature client: capacity-fit, claim weight and agent preference with pinned weights; matching packs the picks. */
export function dagGpClient(observation: DagObservation, context: PolicyContext): unknown {
  if (observation.ready.length === 0) return { status: "abstain" };
  const claims = new Map(observation.ready.map(task => [task.taskId, task.claim] as const));
  const capacities = new Map(observation.agents.map(agent => [agent.agentId, agent.capacity] as const));
  const assignment = matchingAssignment({
    basis: { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision }, policyId: "gp-scorer",
    agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
    tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
    score: (agentId, taskId) => {
      const claim = claims.get(taskId)!;
      const capacity = capacities.get(agentId)!;
      const fit = capacity.compute >= claim.compute && capacity.workers >= claim.workers ? 1 : 0;
      return 0.5 * fit + 0.3 * claim.compute + 0.2 * (agentId === "A" ? 1 : 0);
    },
    budget: context.budget,
  });
  if (assignment.intents.length === 0) return { status: "abstain" };
  return { status: "proposal", intents: assignment.intents, logProb: "unknown" };
}

/** Minimal-completing episode for one landing arm: the run at the smallest completing step count, else the run at the cap. */
export function landingEpisodeFor(policy: Policy<LandingObservation, Intent, number>, instance: VerticalCutInstances["landing"]): LandingQueueEpisode {
  for (let steps = 1; steps <= instance.stepsCap; steps += 1) {
    const episode = runLandingQueue({ seed: instance.seed, candidates: instance.candidates, lanes: instance.lanes, steps, policy });
    if (landingDone(episode, instance.candidates)) return episode;
  }
  return runLandingQueue({ seed: instance.seed, candidates: instance.candidates, lanes: instance.lanes, steps: instance.stepsCap, policy });
}

/** Minimal-completing episode for one DAG arm, same convention. */
export function dagEpisodeFor(policy: Policy<DagObservation, Intent, number>, instance: VerticalCutInstances["dag"]): DagEpisode {
  for (let steps = 1; steps <= instance.stepsCap; steps += 1) {
    const episode = runDagAssignment({ seed: instance.seed, steps, policy });
    if (dagDone(episode)) return episode;
  }
  return runDagAssignment({ seed: instance.seed, steps: instance.stepsCap, policy });
}

/** First-ready greedy packing: the DAG reading of the fifo baseline. */
export const dagFifoPolicy: Policy<DagObservation, Intent, number> = {
  id: "dag-fifo", revision: "fixture-1",
  propose(observation, memory, context: PolicyContext) {
    if (observation.ready.length === 0) return { intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-fifo", detail: "nothing ready" }] };
    const order = observation.ready.map(task => task.taskId);
    const assignment = matchingAssignment({
      basis: { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision }, policyId: "dag-fifo",
      agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
      tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
      score: (_agentId, taskId) => order.length - order.indexOf(taskId),
      budget: context.budget,
    });
    return { intents: [...assignment.intents], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-fifo", detail: assignment.pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing" }] };
  },
};

/** Heaviest-claim-first packing: the DAG reading of the restack baseline (unblock the big work early). */
export const dagHeaviestPolicy: Policy<DagObservation, Intent, number> = {
  id: "dag-heaviest-first", revision: "fixture-1",
  propose(observation, memory, context: PolicyContext) {
    if (observation.ready.length === 0) return { intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-heaviest-first", detail: "nothing ready" }] };
    const claims = new Map(observation.ready.map(task => [task.taskId, task.claim] as const));
    const assignment = matchingAssignment({
      basis: { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision }, policyId: "dag-heaviest-first",
      agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
      tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
      score: (_agentId, taskId) => claims.get(taskId)!.compute,
      budget: context.budget,
    });
    return { intents: [...assignment.intents], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-heaviest-first", detail: assignment.pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing" }] };
  },
};

/** The shared instance guard of the base cut and the arm runner: every refusal is VERTICAL_CUT_INVALID. */
export function validateVerticalCutInstances(instances: VerticalCutInstances): void {
  positiveInt(instances.landing.seed + 1, "landing.seed + 1"); // seed 0 is valid
  if (!Number.isInteger(instances.landing.seed) || instances.landing.seed < 0) fail(`landing.seed must be a non-negative integer, got ${String(instances.landing.seed)}`);
  if (!Number.isInteger(instances.dag.seed) || instances.dag.seed < 0) fail(`dag.seed must be a non-negative integer, got ${String(instances.dag.seed)}`);
  positiveInt(instances.landing.candidates, "landing.candidates");
  positiveInt(instances.landing.lanes, "landing.lanes");
  positiveInt(instances.landing.stepsCap, "landing.stepsCap");
  positiveInt(instances.dag.stepsCap, "dag.stepsCap");
}

/** Run the whole vertical cut from its pinned seeds. Pure: same instances, same bytes. */
export function runVerticalCut(instances: VerticalCutInstances = VERTICAL_CUT_INSTANCES): VerticalCutReport {
  validateVerticalCutInstances(instances);

  const landingOracle = searchLandingOracle(instances.landing);
  const dagOracle = searchDagOracle(instances.dag);
  const gpLanding = graphPolicyHost<LandingObservation, Intent, number>({ fallback: fifoLanding, client: landingGpClient, id: "gp-scorer" });
  const gpDag = graphPolicyHost<DagObservation, Intent, number>({ fallback: dagFifoPolicy, client: dagGpClient, id: "gp-scorer" });

  const perArm: Record<string, { landing: LandingQueueEpisode; dag: DagEpisode }> = {
    "exact-oracle": { landing: landingOracle.episode, dag: dagOracle.episode },
    fifo: { landing: landingEpisodeFor(fifoLanding, instances.landing), dag: dagEpisodeFor(dagFifoPolicy, instances.dag) },
    "gp-scorer": { landing: landingEpisodeFor(gpLanding, instances.landing), dag: dagEpisodeFor(gpDag, instances.dag) },
    restack: { landing: landingEpisodeFor(restackFirst, instances.landing), dag: dagEpisodeFor(dagHeaviestPolicy, instances.dag) },
  };

  const arms: GraphFamilyArm[] = VERTICAL_CUT_ARMS.map(armId => {
    const runs = perArm[armId]!;
    const episodes: Episode[] = [toEpisode(runs.landing), toEpisode(runs.dag)];
    return { armId, episodes, wallClockMicro: [runs.landing.steps.length * WALL_CLOCK_MICRO_PER_STEP, runs.dag.steps.length * WALL_CLOCK_MICRO_PER_STEP] };
  });

  const inner = evaluateGraphFamilies({ arms, oracleArmId: "exact-oracle" });
  const body = {
    schema: inner.schema, mode: "fixture" as const, certified: false as const,
    oracleArm: inner.oracleArm, families: inner.families,
    provenance: {
      instances, regretDefinition: VERTICAL_CUT_REGRET_DEFINITION, wallClockMicroPerStep: WALL_CLOCK_MICRO_PER_STEP,
      arms: VERTICAL_CUT_ARMS,
      oracle: { landing: { steps: landingOracle.steps, script: landingOracle.script }, dag: { steps: dagOracle.steps, priority: dagOracle.priority } },
      learnedArm: { mechanism: "graph-policy-host" as const, landing: gpLanding.configuration, dag: gpDag.configuration },
    },
  };
  return { ...body, reportDigest: digest(body) };
}

/** The exported bytes of one report: canonical JSON plus a final newline, the same byte sequence in either language. */
export function verticalCutBytes(report: VerticalCutReport): string {
  return canonicalJson(report) + "\n";
}
