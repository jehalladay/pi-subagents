/**
 * Multi-task assignment mechanisms (GPC-EAT-R012, MechanicalWorkflows-l92h). Two documented
 * mechanisms, and only two: a capacity-aware DETERMINISTIC MATCHING resolver, and a JOINT
 * (autoregressive) SAMPLER that records the joint behavior log probability as the sum of its
 * per-step log-softmax terms. Independent per-pair argmax is never an assignment mechanism here:
 * it ignores capacity, so its intents collide on the shared budget. Both mechanisms only PROPOSE
 * intents — `reconcile` remains the admission authority (the matching output is feasible against
 * the shared budget by construction, so reconcile admits it in full; nothing bypasses it).
 * `assignmentArm` names a mechanism per arm from the closed set and refuses anything else.
 */
import type { Basis, Budget, Intent, ResourceClaim } from "./contracts.js";
import type { Maybe } from "./episode.js";
import { gateDraws } from "./landing-queue.js";

export type AssignmentMechanism = "matching" | "joint-sampler";
export const ASSIGNMENT_MECHANISMS: ReadonlySet<AssignmentMechanism> = new Set<AssignmentMechanism>(["matching", "joint-sampler"]);

export interface AssignmentAgent {
  readonly agentId: string;
  readonly capacity: Budget;
}

export interface AssignmentTask {
  readonly taskId: string;
  readonly claim: ResourceClaim;
  readonly effect: string;
}

/** A score for assigning `taskId` to `agentId`; any finite number, higher is better. */
export type AssignmentScore = (agentId: string, taskId: string) => number;

export interface AssignmentInput {
  readonly basis: Basis;
  readonly policyId: string;
  readonly agents: readonly AssignmentAgent[];
  readonly tasks: readonly AssignmentTask[];
  readonly score: AssignmentScore;
  /** The shared budget reconcile will apply; both mechanisms keep their proposal within it. */
  readonly budget: Budget;
}

export interface JointSamplerInput extends AssignmentInput {
  readonly seed: number;
}

export interface AssignmentPair {
  readonly taskId: string;
  readonly agentId: string;
}

export interface AssignmentStep {
  readonly taskId: string;
  readonly agentId: string;
  /** The capacity-feasible agents at this step, in input order; the softmax ran over exactly these. */
  readonly eligible: readonly string[];
  readonly logProb: number;
}

export interface Assignment {
  readonly mechanism: AssignmentMechanism;
  readonly pairs: readonly AssignmentPair[];
  /** Tasks no capacity-feasible agent could take; never silently dropped. */
  readonly unassigned: readonly string[];
  readonly intents: readonly Intent[];
  /** Joint behavior log probability (sum of step logProbs) for the sampler; "unknown" for the deterministic matcher. */
  readonly logProb: Maybe<number>;
  readonly steps: Maybe<readonly AssignmentStep[]>;
}

export interface AssignmentArm {
  readonly armId: string;
  readonly mechanism: AssignmentMechanism;
  readonly revision: string;
}

const DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;
const fail = (code: string, detail: string): never => { throw new RangeError(`${code}: ${detail}`); };
const nonblank = (value: string): boolean => value.trim().length > 0;
const fits = (remaining: Budget, claim: ResourceClaim): boolean => DIMENSIONS.every(dimension => claim[dimension] <= remaining[dimension]);
const subtract = (remaining: Budget, claim: ResourceClaim): Budget => ({
  compute: remaining.compute - claim.compute, workers: remaining.workers - claim.workers, queue: remaining.queue - claim.queue, latencyMs: remaining.latencyMs - claim.latencyMs,
});

function validate(input: AssignmentInput): void {
  if (!nonblank(input.policyId)) fail("ASSIGNMENT_INPUT_INVALID", "blank policyId");
  if (input.agents.length === 0) fail("ASSIGNMENT_INPUT_INVALID", "no agents");
  if (input.tasks.length === 0) fail("ASSIGNMENT_INPUT_INVALID", "no tasks");
  const agentIds = input.agents.map(agent => agent.agentId);
  if (agentIds.some(id => !nonblank(id))) fail("ASSIGNMENT_INPUT_INVALID", "blank agent id");
  if (new Set(agentIds).size !== agentIds.length) fail("ASSIGNMENT_INPUT_INVALID", `duplicate agent ids ${agentIds.join(",")}`);
  const taskIds = input.tasks.map(task => task.taskId);
  if (taskIds.some(id => !nonblank(id))) fail("ASSIGNMENT_INPUT_INVALID", "blank task id");
  if (new Set(taskIds).size !== taskIds.length) fail("ASSIGNMENT_INPUT_INVALID", `duplicate task ids ${taskIds.join(",")}`);
  for (const agent of input.agents) for (const dimension of DIMENSIONS) {
    if (!Number.isFinite(agent.capacity[dimension]) || agent.capacity[dimension] < 0) fail("ASSIGNMENT_INPUT_INVALID", `agent ${agent.agentId} capacity ${dimension} is not a non-negative finite number`);
  }
  for (const task of input.tasks) {
    if (!nonblank(task.effect)) fail("ASSIGNMENT_INPUT_INVALID", `task ${task.taskId} has a blank effect`);
    for (const dimension of DIMENSIONS) {
      if (!Number.isFinite(task.claim[dimension]) || task.claim[dimension] < 0) fail("ASSIGNMENT_INPUT_INVALID", `task ${task.taskId} claim ${dimension} is not a non-negative finite number`);
    }
  }
  for (const dimension of DIMENSIONS) if (!Number.isFinite(input.budget[dimension]) || input.budget[dimension] < 0) fail("ASSIGNMENT_INPUT_INVALID", `budget ${dimension} is not a non-negative finite number`);
  for (const agent of input.agents) for (const task of input.tasks) {
    if (!Number.isFinite(input.score(agent.agentId, task.taskId))) fail("ASSIGNMENT_INPUT_INVALID", `score(${agent.agentId}, ${task.taskId}) is not finite`);
  }
}

function intentFor(input: AssignmentInput, mechanism: AssignmentMechanism, task: AssignmentTask, agentId: string): Intent {
  return {
    intentId: `${input.policyId}:${mechanism}:${input.basis.revision}:${task.taskId}->${agentId}`,
    policyId: input.policyId,
    target: { kind: "task", uri: task.taskId },
    expectedRevision: input.basis.revision,
    effect: task.effect,
    claim: { ...task.claim },
    evidenceRefs: [],
    writeScopes: [`task:${task.taskId}`],
    readScopes: [`agent:${agentId}`],
  };
}

/**
 * Capacity-aware deterministic matching: pairs sorted by score (desc), then taskId, then agentId;
 * each task is assigned at most once, only to an agent whose remaining capacity and the remaining
 * shared budget both cover its claim. Pure and replayable; records no behavior probability.
 */
export function matchingAssignment(input: AssignmentInput): Assignment {
  validate(input);
  const pairs = input.tasks.flatMap(task => input.agents.map(agent => ({ task, agent, score: input.score(agent.agentId, task.taskId) })));
  pairs.sort((a, b) => b.score - a.score || a.task.taskId.localeCompare(b.task.taskId) || a.agent.agentId.localeCompare(b.agent.agentId));
  const remaining = new Map(input.agents.map(agent => [agent.agentId, agent.capacity] as const));
  let shared: Budget = input.budget;
  const assigned = new Map<string, string>();
  for (const { task, agent } of pairs) {
    if (assigned.has(task.taskId)) continue;
    const left = remaining.get(agent.agentId)!;
    if (!fits(left, task.claim) || !fits(shared, task.claim)) continue;
    assigned.set(task.taskId, agent.agentId);
    remaining.set(agent.agentId, subtract(left, task.claim));
    shared = subtract(shared, task.claim);
  }
  const ordered = input.tasks.filter(task => assigned.has(task.taskId));
  return {
    mechanism: "matching",
    pairs: ordered.map(task => ({ taskId: task.taskId, agentId: assigned.get(task.taskId)! })),
    unassigned: input.tasks.filter(task => !assigned.has(task.taskId)).map(task => task.taskId),
    intents: ordered.map(task => intentFor(input, "matching", task, assigned.get(task.taskId)!)),
    logProb: "unknown",
    steps: "unknown",
  };
}

/**
 * Joint autoregressive sampler: tasks in input order; at each step the softmax runs over exactly
 * the capacity-feasible agents (agent remaining capacity and the shared budget both cover the
 * claim), one seeded draw selects, and the step's log-softmax term is recorded; the joint
 * logProb is their sum. Same seed, same path.
 */
export function jointSamplerAssignment(input: JointSamplerInput): Assignment {
  validate(input);
  if (!Number.isInteger(input.seed) || input.seed < 0) fail("ASSIGNMENT_INPUT_INVALID", "seed must be a non-negative integer");
  const draw = gateDraws(input.seed);
  // gateDraws finalises the seed (splitmix32) before its xorshift32 stream starts, so the first draw is already a
  // well-mixed function of the whole seed: step one consumes it directly, with no warm-up.
  const remaining = new Map(input.agents.map(agent => [agent.agentId, agent.capacity] as const));
  let shared: Budget = input.budget;
  const steps: AssignmentStep[] = [];
  const unassigned: string[] = [];
  const chosenFor = new Map<string, string>();
  for (const task of input.tasks) {
    const eligible = input.agents.filter(agent => fits(remaining.get(agent.agentId)!, task.claim) && fits(shared, task.claim)).map(agent => agent.agentId);
    if (eligible.length === 0) { unassigned.push(task.taskId); continue; }
    const scores = eligible.map(agentId => input.score(agentId, task.taskId));
    const max = Math.max(...scores);
    const weights = scores.map(score => Math.exp(score - max));
    const total = weights.reduce((acc, weight) => acc + weight, 0);
    const u = draw() / 4294967296;
    let index = 0;
    let cumulative = weights[0]! / total;
    while (u > cumulative && index < eligible.length - 1) { index += 1; cumulative += weights[index]! / total; }
    const agentId = eligible[index]!;
    steps.push({ taskId: task.taskId, agentId, eligible, logProb: scores[index]! - max - Math.log(total) });
    chosenFor.set(task.taskId, agentId);
    remaining.set(agentId, subtract(remaining.get(agentId)!, task.claim));
    shared = subtract(shared, task.claim);
  }
  const ordered = input.tasks.filter(task => chosenFor.has(task.taskId));
  return {
    mechanism: "joint-sampler",
    pairs: ordered.map(task => ({ taskId: task.taskId, agentId: chosenFor.get(task.taskId)! })),
    unassigned,
    intents: ordered.map(task => intentFor(input, "joint-sampler", task, chosenFor.get(task.taskId)!)),
    logProb: steps.reduce((acc, step) => acc + step.logProb, 0),
    steps,
  };
}

/** An arm descriptor naming its assignment mechanism from the closed set; per-pair argmax is refused by name. */
export function assignmentArm(arm: AssignmentArm): AssignmentArm {
  if (!nonblank(arm.armId) || !nonblank(arm.revision)) fail("ASSIGNMENT_INPUT_INVALID", "blank arm id or revision");
  if (!ASSIGNMENT_MECHANISMS.has(arm.mechanism)) {
    fail("ASSIGNMENT_MECHANISM_FORBIDDEN", `arm ${arm.armId} names mechanism ${String(arm.mechanism)}; only matching or joint-sampler may assign — independent per-pair argmax ignores capacity and is never an assignment mechanism`);
  }
  return { armId: arm.armId, mechanism: arm.mechanism, revision: arm.revision };
}
