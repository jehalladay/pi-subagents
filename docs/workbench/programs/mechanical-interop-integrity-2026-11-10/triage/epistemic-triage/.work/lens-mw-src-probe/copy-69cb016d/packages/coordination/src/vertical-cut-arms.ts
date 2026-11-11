/**
 * The vertical-cut ARM REGISTRY (MechanicalWorkflows-rev1.1, the remainder of GPC-EAT-R009). ADDITIVE: the
 * four-arm `runVerticalCut` report stays byte-identical; this module names every comparison arm the program
 * lists, gives each a mechanism from a closed enum (GPC-EAT-R012) and a one-sentence definition that the report
 * embeds in provenance, and runs the BUILT arms on the two pinned families through the unchanged `reconcile`
 * (a cumulative-budget filter, not a matcher) into `mw.graph-family-evaluation.v1` blocks.
 *
 * Built here as pure fixture policies: `greedy` and `static-role`. Present only as explicit refusals:
 * `graph-feature-mlp`, `micropolicy-scorer`, `gp-relational-scorer`, `gp-to-mp-composition` (mechanism
 * "unbuilt"); requesting one throws VERTICAL_CUT_ARM_UNBUILT naming the arm, never a zero, a placeholder or a
 * copied row. Evidence grade is FIXTURE throughout: `mode` is the literal "fixture" and `certified` the literal
 * false. The report orders no arm above another and makes no claim about a learned scorer; every regret is a
 * measurement against the exact-oracle arm under the definition fixed before the run.
 */
import type { Intent, Policy, PolicyContext } from "./contracts.js";
import { evaluateGraphFamilies, type GraphFamilyArm, type GraphFamilyBlock } from "./graph-family-evaluation.js";
import { fifoLanding, restackFirst, type LandingObservation, type LandingQueueEpisode } from "./landing-queue.js";
import type { DagObservation, DagEpisode } from "./fixture-families.js";
import { matchingAssignment } from "./assignment.js";
import { graphPolicyHost } from "./graph-policy-host.js";
import { toEpisode, type Episode, type Maybe } from "./episode.js";
import { canonicalJson, digest } from "./canonical.js";
import {
  VERTICAL_CUT_INSTANCES, VERTICAL_CUT_REGRET_DEFINITION, WALL_CLOCK_MICRO_PER_STEP,
  validateVerticalCutInstances, searchLandingOracle, searchDagOracle, landingEpisodeFor, dagEpisodeFor,
  landIntent, restackIntent, landingGpClient, dagGpClient, dagFifoPolicy, dagHeaviestPolicy,
  type VerticalCutInstances, type VerticalCutLearnedArm, type VerticalCutOracleWitness,
} from "./vertical-cut.js";

/** The closed mechanism enum: every arm names exactly one, and anything else is refused (GPC-EAT-R012). */
export const VERTICAL_CUT_ARM_MECHANISMS = ["exact-enumeration", "fixture-policy", "graph-policy-host", "micropolicy-adapter", "unbuilt"] as const;
export type VerticalCutArmMechanism = (typeof VERTICAL_CUT_ARM_MECHANISMS)[number];

export interface VerticalCutArmRow {
  readonly armId: string;
  readonly mechanism: VerticalCutArmMechanism;
  /** One sentence the report embeds in provenance; a changed sentence changes the report digest. */
  readonly definition: string;
}

/** Sorted by armId. The four "unbuilt" rows are targets, not results. */
export const VERTICAL_CUT_ARM_REGISTRY: readonly VerticalCutArmRow[] = [
  { armId: "exact-oracle", mechanism: "exact-enumeration", definition: "Exact by enumeration: the landing oracle searches the full two-action script space and the DAG oracle searches all 120 task-priority orders, smallest step count first; it is the regret reference." },
  { armId: "fifo", mechanism: "fixture-policy", definition: "Landing: lands the oldest candidate already based on the head and proposes nothing otherwise. DAG: packs ready tasks in ready order through capacity-aware matching." },
  { armId: "gp-relational-scorer", mechanism: "unbuilt", definition: "Target arm: a relational graph-policy scorer; no scorer is built here, so requesting it is refused." },
  { armId: "gp-scorer", mechanism: "graph-policy-host", definition: "The configured graph-policy host over a deterministic graph-feature client with pinned weights; a scaffold with fifo-shaped fallbacks, not a trained scorer." },
  { armId: "gp-to-mp-composition", mechanism: "unbuilt", definition: "Target arm: a graph-policy scorer feeding a MicroPolicy decision stage; neither stage is built here, so requesting it is refused." },
  { armId: "graph-feature-mlp", mechanism: "unbuilt", definition: "Target arm: a graph-feature multilayer-perceptron scorer; none is built here, so requesting it is refused." },
  { armId: "greedy", mechanism: "fixture-policy", definition: "Takes the immediately available action each step. Landing: lands the oldest on-head candidate, else restacks the oldest stale one. DAG: packs the shortest-latency ready tasks first through capacity-aware matching." },
  { armId: "micropolicy-scorer", mechanism: "unbuilt", definition: "Target arm: a MicroPolicy feature-only scorer; the decision adapter translates receipts and is not a scorer, so requesting it is refused." },
  { armId: "restack", mechanism: "fixture-policy", definition: "Landing: restacks the oldest stale candidate before landing an on-head one. DAG: packs the heaviest-compute ready tasks first through capacity-aware matching." },
  { armId: "static-role", mechanism: "fixture-policy", definition: "Roles fixed in advance, independent of observed state. Landing: even steps restack the oldest stale candidate, odd steps land the oldest on-head one, an infeasible role action proposes nothing. DAG: the first agent by id takes only compute-2-or-heavier tasks, every other agent only lighter ones." },
];

export interface VerticalCutArmsRequest {
  /** Arms to evaluate; default is every built registry arm. exact-oracle is always evaluated as the regret reference. */
  readonly arms?: readonly string[] | undefined;
  readonly instances?: VerticalCutInstances | undefined;
  /** An injected registry (negative controls); default is VERTICAL_CUT_ARM_REGISTRY. */
  readonly registry?: readonly VerticalCutArmRow[] | undefined;
}

export interface VerticalCutArmsProvenance {
  readonly instances: VerticalCutInstances;
  readonly regretDefinition: string;
  readonly wallClockMicroPerStep: number;
  readonly arms: readonly string[];
  readonly armRegistry: readonly VerticalCutArmRow[];
  readonly oracle: VerticalCutOracleWitness;
  readonly learnedArm?: VerticalCutLearnedArm;
}

export interface VerticalCutArmsReport {
  readonly schema: "mw.graph-family-evaluation.v1";
  readonly mode: "fixture";
  readonly certified: false;
  readonly oracleArm: Maybe<string>;
  readonly families: readonly GraphFamilyBlock[];
  readonly provenance: VerticalCutArmsProvenance;
  readonly reportDigest: string;
}

const ORACLE = "exact-oracle";
const fail = (detail: string): never => { throw new RangeError(`VERTICAL_CUT_INVALID: ${detail}`); };

function validateRegistry(registry: readonly VerticalCutArmRow[]): void {
  const seen = new Set<string>();
  for (const row of registry) {
    if (row.armId.trim().length === 0) fail("blank arm id in the registry");
    if (seen.has(row.armId)) fail(`duplicate registry arm id ${row.armId}`);
    seen.add(row.armId);
    if (!VERTICAL_CUT_ARM_MECHANISMS.includes(row.mechanism)) fail(`arm ${row.armId} mechanism ${String(row.mechanism)} is outside the closed enum ${VERTICAL_CUT_ARM_MECHANISMS.join(",")}`);
    if (row.definition.trim().length === 0) fail(`arm ${row.armId} carries a blank definition`);
  }
}

/** Resolve the requested arms against the registry: unknown ids and duplicates are INVALID, unbuilt arms are refused by name. */
function resolveArms(requested: readonly string[] | undefined, registry: readonly VerticalCutArmRow[]): string[] {
  const byId = new Map(registry.map(row => [row.armId, row] as const));
  const wanted = requested ?? registry.filter(row => row.mechanism !== "unbuilt").map(row => row.armId);
  if (wanted.length === 0) fail("no arms requested");
  const seen = new Set<string>();
  for (const armId of wanted) {
    if (seen.has(armId)) fail(`duplicate requested arm ${armId}`);
    seen.add(armId);
    const row = byId.get(armId);
    if (row === undefined) fail(`unknown arm ${armId}`);
    else if (row.mechanism === "unbuilt") throw new RangeError(`VERTICAL_CUT_ARM_UNBUILT: ${armId} has mechanism unbuilt and carries no policy; ${row.definition}`);
  }
  return [...new Set([ORACLE, ...wanted])].sort();
}

const nothing = (policyId: string, detail: string, memory: number) => ({ intents: [] as Intent[], memory: memory + 1, trace: [{ kind: "proposed" as const, policyId, detail }] });

/** Greedy landing: the immediately available action, landing before restacking. */
export const greedyLanding: Policy<LandingObservation, Intent, number> = {
  id: "greedy-landing", revision: "fixture-1",
  propose(observation, memory) {
    const onHead = observation.ready.find(candidate => candidate.base === observation.head);
    const stale = observation.ready.find(candidate => candidate.base !== observation.head);
    if (onHead !== undefined) return { intents: [landIntent("greedy-landing", observation, onHead)], memory: memory + 1, trace: [{ kind: "proposed", policyId: "greedy-landing", detail: `land ${onHead.id}` }] };
    if (stale !== undefined) return { intents: [restackIntent("greedy-landing", observation, stale)], memory: memory + 1, trace: [{ kind: "proposed", policyId: "greedy-landing", detail: `restack ${stale.id}` }] };
    return nothing("greedy-landing", "nothing ready", memory);
  },
};

/** Static-role landing: the step index alone picks the role (even restacks, odd lands); an infeasible role action proposes nothing. */
export const staticRoleLanding: Policy<LandingObservation, Intent, number> = {
  id: "static-role-landing", revision: "fixture-1",
  propose(observation, memory) {
    if (memory % 2 === 0) {
      const stale = observation.ready.find(candidate => candidate.base !== observation.head);
      if (stale === undefined) return nothing("static-role-landing", "restacker role: no stale candidate", memory);
      return { intents: [restackIntent("static-role-landing", observation, stale)], memory: memory + 1, trace: [{ kind: "proposed", policyId: "static-role-landing", detail: `restacker restack ${stale.id}` }] };
    }
    const onHead = observation.ready.find(candidate => candidate.base === observation.head);
    if (onHead === undefined) return nothing("static-role-landing", "lander role: no on-head candidate", memory);
    return { intents: [landIntent("static-role-landing", observation, onHead)], memory: memory + 1, trace: [{ kind: "proposed", policyId: "static-role-landing", detail: `lander land ${onHead.id}` }] };
  },
};

/** Greedy DAG: shortest-latency ready tasks first, packed by capacity-aware matching. */
export const greedyDag: Policy<DagObservation, Intent, number> = {
  id: "dag-greedy", revision: "fixture-1",
  propose(observation, memory, context: PolicyContext) {
    if (observation.ready.length === 0) return nothing("dag-greedy", "nothing ready", memory);
    const claims = new Map(observation.ready.map(task => [task.taskId, task.claim] as const));
    const assignment = matchingAssignment({
      basis: { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision }, policyId: "dag-greedy",
      agents: observation.agents.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
      tasks: observation.ready.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })),
      score: (_agentId, taskId) => 1000 - claims.get(taskId)!.latencyMs,
      budget: context.budget,
    });
    return { intents: [...assignment.intents], memory: memory + 1, trace: [{ kind: "proposed", policyId: "dag-greedy", detail: assignment.pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing" }] };
  },
};

/** Static-role DAG: the first agent by id takes only compute-2-or-heavier tasks, every other agent only lighter ones; the shared budget is spent once. */
export const staticRoleDag: Policy<DagObservation, Intent, number> = {
  id: "dag-static-role", revision: "fixture-1",
  propose(observation, memory, context: PolicyContext) {
    const agents = [...observation.agents].sort((a, b) => a.agentId.localeCompare(b.agentId));
    const heavyAgents = agents.slice(0, 1);
    const lightAgents = agents.slice(1);
    const heavyTasks = observation.ready.filter(task => task.claim.compute >= 2);
    const lightTasks = observation.ready.filter(task => task.claim.compute < 2);
    const basis = { workspaceId: "fixture:dag-assignment", revision: observation.basis.revision };
    const asInput = (list: typeof agents, tasks: typeof heavyTasks, budget: typeof context.budget) => ({
      basis, policyId: "dag-static-role", agents: list.map(agent => ({ agentId: agent.agentId, capacity: agent.capacity })),
      tasks: tasks.map(task => ({ taskId: task.taskId, claim: task.claim, effect: "run" })), score: () => 0, budget,
    });
    const heavy = heavyAgents.length > 0 && heavyTasks.length > 0 ? matchingAssignment(asInput(heavyAgents, heavyTasks, context.budget)) : undefined;
    const spent = (heavy?.intents ?? []).reduce((sum, intent) => ({
      compute: sum.compute + intent.claim.compute, workers: sum.workers + intent.claim.workers, queue: sum.queue + intent.claim.queue, latencyMs: sum.latencyMs + intent.claim.latencyMs,
    }), { compute: 0, workers: 0, queue: 0, latencyMs: 0 });
    const left = { compute: context.budget.compute - spent.compute, workers: context.budget.workers - spent.workers, queue: context.budget.queue - spent.queue, latencyMs: context.budget.latencyMs - spent.latencyMs };
    const light = lightAgents.length > 0 && lightTasks.length > 0 ? matchingAssignment(asInput(lightAgents, lightTasks, left)) : undefined;
    const pairs = [...(heavy?.pairs ?? []), ...(light?.pairs ?? [])];
    return {
      intents: [...(heavy?.intents ?? []), ...(light?.intents ?? [])], memory: memory + 1,
      trace: [{ kind: "proposed", policyId: "dag-static-role", detail: pairs.map(pair => `${pair.taskId}->${pair.agentId}`).join(",") || "nothing" }],
    };
  },
};

interface ArmRun { readonly landing: LandingQueueEpisode; readonly dag: DagEpisode }
interface ArmBuilder { readonly mechanism: VerticalCutArmMechanism; readonly run: (instances: VerticalCutInstances) => ArmRun }

/** Which registry arms have a policy behind them; the registry may name more arms than this table builds. */
const BUILDERS: Readonly<Record<string, ArmBuilder>> = {
  fifo: { mechanism: "fixture-policy", run: instances => ({ landing: landingEpisodeFor(fifoLanding, instances.landing), dag: dagEpisodeFor(dagFifoPolicy, instances.dag) }) },
  restack: { mechanism: "fixture-policy", run: instances => ({ landing: landingEpisodeFor(restackFirst, instances.landing), dag: dagEpisodeFor(dagHeaviestPolicy, instances.dag) }) },
  greedy: { mechanism: "fixture-policy", run: instances => ({ landing: landingEpisodeFor(greedyLanding, instances.landing), dag: dagEpisodeFor(greedyDag, instances.dag) }) },
  "static-role": { mechanism: "fixture-policy", run: instances => ({ landing: landingEpisodeFor(staticRoleLanding, instances.landing), dag: dagEpisodeFor(staticRoleDag, instances.dag) }) },
};

/** Run the requested built arms (always with exact-oracle) on the two pinned families. Pure: same request, same bytes. */
export function runVerticalCutArms(request: VerticalCutArmsRequest = {}): VerticalCutArmsReport {
  const registry = request.registry ?? VERTICAL_CUT_ARM_REGISTRY;
  validateRegistry(registry);
  const armIds = resolveArms(request.arms, registry);
  const mechanismOf = new Map(registry.map(row => [row.armId, row.mechanism] as const));
  for (const armId of armIds) {
    if (armId === ORACLE || armId === "gp-scorer") continue;
    const builder = BUILDERS[armId];
    if (builder === undefined) fail(`arm ${armId} has no builder`);
    else if (builder.mechanism !== mechanismOf.get(armId)) fail(`arm ${armId} mechanism ${String(mechanismOf.get(armId))} does not match its builder mechanism ${builder.mechanism}`);
  }
  if (armIds.includes(ORACLE) && mechanismOf.get(ORACLE) !== "exact-enumeration") fail(`arm ${ORACLE} mechanism ${String(mechanismOf.get(ORACLE))} must be exact-enumeration`);
  if (armIds.includes("gp-scorer") && mechanismOf.get("gp-scorer") !== "graph-policy-host") fail(`arm gp-scorer mechanism ${String(mechanismOf.get("gp-scorer"))} must be graph-policy-host`);

  const instances = request.instances ?? VERTICAL_CUT_INSTANCES;
  validateVerticalCutInstances(instances);
  const landingOracle = searchLandingOracle(instances.landing);
  const dagOracle = searchDagOracle(instances.dag);
  const gpLanding = graphPolicyHost<LandingObservation, Intent, number>({ fallback: fifoLanding, client: landingGpClient, id: "gp-scorer" });
  const gpDag = graphPolicyHost<DagObservation, Intent, number>({ fallback: dagFifoPolicy, client: dagGpClient, id: "gp-scorer" });

  const runOf = (armId: string): ArmRun => {
    if (armId === ORACLE) return { landing: landingOracle.episode, dag: dagOracle.episode };
    if (armId === "gp-scorer") return { landing: landingEpisodeFor(gpLanding, instances.landing), dag: dagEpisodeFor(gpDag, instances.dag) };
    return BUILDERS[armId]!.run(instances);
  };
  const arms: GraphFamilyArm[] = armIds.map(armId => {
    const runs = runOf(armId);
    const episodes: Episode[] = [toEpisode(runs.landing), toEpisode(runs.dag)];
    return { armId, episodes, wallClockMicro: [runs.landing.steps.length * WALL_CLOCK_MICRO_PER_STEP, runs.dag.steps.length * WALL_CLOCK_MICRO_PER_STEP] };
  });

  const inner = evaluateGraphFamilies({ arms, oracleArmId: ORACLE });
  const body = {
    schema: inner.schema, mode: "fixture" as const, certified: false as const, oracleArm: inner.oracleArm, families: inner.families,
    provenance: {
      instances, regretDefinition: VERTICAL_CUT_REGRET_DEFINITION, wallClockMicroPerStep: WALL_CLOCK_MICRO_PER_STEP, arms: armIds,
      armRegistry: [...registry].sort((a, b) => a.armId.localeCompare(b.armId)),
      oracle: { landing: { steps: landingOracle.steps, script: landingOracle.script }, dag: { steps: dagOracle.steps, priority: dagOracle.priority } },
      ...(armIds.includes("gp-scorer") ? { learnedArm: { mechanism: "graph-policy-host" as const, landing: gpLanding.configuration, dag: gpDag.configuration } } : {}),
    },
  };
  return { ...body, reportDigest: digest(body) };
}

/** The exported bytes of one arms report: canonical JSON plus a final newline. */
export function verticalCutArmsBytes(report: VerticalCutArmsReport): string {
  return canonicalJson(report) + "\n";
}
