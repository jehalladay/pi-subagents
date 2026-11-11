// MechanicalWorkflows-l92h (GPC-EAT-R012): multi-task assignment comes from a capacity-aware
// deterministic matching resolver or from a documented joint/autoregressive sampler that records
// the joint log probability; independent per-pair argmax is never the mechanism, and every arm
// names its mechanism. reconcile stays the authority: the matching assignment is admitted in full
// where the per-pair argmax assignment (the negative control, built only here) is rejected.
import test from "node:test";
import assert from "node:assert/strict";
import { matchingAssignment, jointSamplerAssignment, assignmentArm, ASSIGNMENT_MECHANISMS, reconcile, gateDraws } from "../dist/index.js";
import type { AssignmentInput, AssignmentArm, Intent, Budget } from "../dist/index.js";

const basis = { workspaceId: "fixture:assignment", revision: "head-3" };
const capacity: Budget = { compute: 2, workers: 1, queue: 2, latencyMs: 10 };
const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 5 };
const budget: Budget = { compute: 4, workers: 2, queue: 4, latencyMs: 20 };

/** Seeded instance: every task prefers agent A, so per-pair argmax piles four tasks onto one one-worker agent. */
const instance: AssignmentInput = {
  basis, policyId: "assignment-under-test", budget,
  agents: [{ agentId: "A", capacity }, { agentId: "B", capacity }],
  tasks: ["t1", "t2", "t3", "t4"].map(taskId => ({ taskId, claim, effect: "run" })),
  score: (agentId, taskId) => (agentId === "A" ? 1 : 0) + Number(taskId.slice(1)) / 100,
};

/** The forbidden mechanism, built only as the negative control: each task to its argmax agent, capacity ignored. */
function perPairArgmax(input: AssignmentInput): Intent[] {
  return input.tasks.map(task => {
    const best = [...input.agents].sort((a, b) => input.score(b.agentId, task.taskId) - input.score(a.agentId, task.taskId))[0]!;
    return {
      intentId: `${input.policyId}:argmax:${input.basis.revision}:${task.taskId}->${best.agentId}`, policyId: input.policyId,
      target: { kind: "task", uri: task.taskId }, expectedRevision: input.basis.revision, effect: task.effect, claim: task.claim,
      evidenceRefs: [], writeScopes: [`task:${task.taskId}`], readScopes: [`agent:${best.agentId}`],
    };
  });
}

const admit = (intents: readonly Intent[]) => reconcile({ basis, budget, protectedScopes: [], proposals: [{ intents, memory: 0, trace: [] }] });

test("the matching resolver's assignment is admitted in full by reconcile while per-pair argmax is rejected on at least one intent", () => {
  const matched = matchingAssignment(instance);
  assert.equal(matched.mechanism, "matching");
  assert.ok(matched.pairs.length >= 2, "both agents receive work");
  assert.equal(new Set(matched.pairs.map(pair => pair.agentId)).size, 2, "capacity-aware: one one-worker agent cannot take everything");
  const resolution = admit(matched.intents);
  assert.equal(resolution.rejected.length, 0, JSON.stringify(resolution.rejected.map(r => r.code)));
  assert.equal(resolution.admitted.length, matched.intents.length);
  assert.ok(resolution.rejected.every(r => r.code !== "INTENT_BUDGET_EXCEEDED" && r.code !== "INTENT_WRITE_CONFLICT"));
  assert.deepEqual([...matched.pairs].map(p => p.taskId).concat(matched.unassigned).sort(), ["t1", "t2", "t3", "t4"], "every task is either assigned or named unassigned");
  const control = admit(perPairArgmax(instance));
  assert.ok(control.rejected.some(r => r.code === "INTENT_BUDGET_EXCEEDED"), "negative control: argmax exceeds the shared budget");
  assert.equal(matched.logProb, "unknown", "a deterministic matcher records no behavior probability");
});

test("the matching resolver is deterministic and never exceeds any agent's capacity", () => {
  const a = matchingAssignment(instance);
  const b = matchingAssignment(instance);
  assert.deepEqual(a, b);
  for (const agent of instance.agents) {
    const load = a.pairs.filter(pair => pair.agentId === agent.agentId).length;
    assert.ok(load <= agent.capacity.workers, `${agent.agentId} carries ${load} tasks for ${agent.capacity.workers} worker(s)`);
  }
});

test("the joint sampler records a logProb equal to the sum of its step log-probs (within 1e-9), replays identically on the same seed, and its assignment is admitted in full", () => {
  const first = jointSamplerAssignment({ ...instance, seed: 7 });
  const again = jointSamplerAssignment({ ...instance, seed: 7 });
  assert.equal(first.mechanism, "joint-sampler");
  assert.deepEqual(first, again, "same seed, same assignment and probabilities");
  assert.notEqual(first.steps, "unknown");
  if (first.steps === "unknown" || first.logProb === "unknown") assert.fail("the joint sampler records its steps and joint logProb");
  const sum = first.steps.reduce((acc, step) => acc + step.logProb, 0);
  assert.ok(Math.abs(sum - first.logProb) <= 1e-9, `${sum} vs ${first.logProb}`);
  assert.ok(first.steps.every(step => step.logProb <= 0 && Number.isFinite(step.logProb)));
  // Each step log-prob is the log-softmax of the recorded eligible scores at that step.
  for (const step of first.steps) {
    const scores = step.eligible.map(agentId => instance.score(agentId, step.taskId));
    const max = Math.max(...scores);
    const z = scores.reduce((acc, s) => acc + Math.exp(s - max), 0);
    const chosen = instance.score(step.agentId, step.taskId);
    assert.ok(Math.abs(step.logProb - (chosen - max - Math.log(z))) <= 1e-9, step.taskId);
  }
  assert.equal(admit(first.intents).rejected.length, 0, "capacity-feasible by construction");
  // Seed 4 is the first seed whose first finalised draw (u = 0.9244 > 0.731) selects B at step one (pinned from the deterministic PRNG): the other
  // branch of the path is reachable and its recorded probability is the complementary softmax term.
  const flipped = jointSamplerAssignment({ ...instance, seed: 4 });
  assert.equal(flipped.pairs[0]!.agentId, "B");
  assert.notEqual(flipped.logProb, first.logProb, "a different path records a different joint probability");
  const pB = 1 / (Math.exp(1) + 1);
  if (flipped.logProb === "unknown") assert.fail("sampler records logProb");
  assert.ok(Math.abs(flipped.logProb - Math.log(pB)) <= 1e-9, "step one chose B with the complementary softmax probability; step two was forced (log 1 = 0)");
});

test("every arm descriptor names a mechanism in {matching, joint-sampler}; per-pair-argmax is refused with ASSIGNMENT_MECHANISM_FORBIDDEN", () => {
  assert.deepEqual([...ASSIGNMENT_MECHANISMS].sort(), ["joint-sampler", "matching"]);
  const arms: AssignmentArm[] = [
    assignmentArm({ armId: "matching-v1", mechanism: "matching", revision: "1" }),
    assignmentArm({ armId: "sampler-v1", mechanism: "joint-sampler", revision: "1" }),
  ];
  for (const arm of arms) assert.ok(ASSIGNMENT_MECHANISMS.has(arm.mechanism) && arm.mechanism !== ("per-pair-argmax" as string));
  assert.throws(() => assignmentArm({ armId: "argmax", mechanism: "per-pair-argmax" as never, revision: "1" }), /ASSIGNMENT_MECHANISM_FORBIDDEN/);
  assert.throws(() => assignmentArm({ armId: " ", mechanism: "matching", revision: "1" }), /ASSIGNMENT_INPUT_INVALID/);
});

test("malformed assignment inputs refuse with ASSIGNMENT_INPUT_INVALID naming the defect", () => {
  const cases: [string, AssignmentInput, RegExp][] = [
    ["no agents", { ...instance, agents: [] }, /agents/],
    ["no tasks", { ...instance, tasks: [] }, /tasks/],
    ["duplicate task", { ...instance, tasks: [...instance.tasks, instance.tasks[0]!] }, /duplicate/],
    ["duplicate agent", { ...instance, agents: [...instance.agents, instance.agents[0]!] }, /duplicate/],
    ["non-finite score", { ...instance, score: () => Number.NaN }, /score/],
    ["negative claim", { ...instance, tasks: [{ taskId: "t1", claim: { ...claim, compute: -1 }, effect: "run" }] }, /claim/],
  ];
  for (const [label, input, pattern] of cases) {
    assert.throws(() => matchingAssignment(input), (error: Error) => error.message.startsWith("ASSIGNMENT_INPUT_INVALID: ") && pattern.test(error.message), label);
    assert.throws(() => jointSamplerAssignment({ ...input, seed: 1 }), /ASSIGNMENT_INPUT_INVALID/, label);
  }
});

// MechanicalWorkflows-i0co: the shared-budget, unassigned-coverage and per-agent-capacity laws of the two mechanisms,
// pinned on a second instance whose shared budget is TIGHTER than the sum of the agent capacities. The loose instance
// above never lets the shared budget decide, so a mechanism that ignores it passed every row.
const tightBudget: Budget = { compute: 4, workers: 1, queue: 4, latencyMs: 20 };
const tight: AssignmentInput = { ...instance, budget: tightBudget };
const admitUnder = (intents: readonly Intent[], under: Budget) => reconcile({ basis, budget: under, protectedScopes: [], proposals: [{ intents, memory: 0, trace: [] }] });
const allTasks = ["t1", "t2", "t3", "t4"];
const covered = (result: { pairs: readonly { taskId: string }[]; unassigned: readonly string[] }) => result.pairs.map(p => p.taskId).concat(result.unassigned).sort();
const seeds64 = Array.from({ length: 64 }, (_, seed) => seed);

test("under a shared budget tighter than the agent capacities the matching resolver proposes only what reconcile admits in full and names every leftover task unassigned", () => {
  const matched = matchingAssignment(tight);
  assert.deepEqual(matched.pairs, [{ taskId: "t4", agentId: "A" }], "one worker of shared budget buys exactly the highest-scored pair");
  assert.deepEqual(matched.unassigned, ["t1", "t2", "t3"]);
  assert.deepEqual(covered(matched), allTasks);
  const resolution = admitUnder(matched.intents, tightBudget);
  assert.equal(resolution.rejected.length, 0, JSON.stringify(resolution.rejected.map(r => r.code)));
  assert.equal(resolution.admitted.length, matched.intents.length);
  assert.ok(resolution.rejected.every(r => r.code !== "INTENT_BUDGET_EXCEEDED"));
});

test("under a shared budget tighter than the agent capacities the joint sampler proposes only what reconcile admits in full, on seed 7 and across 64 seeds", () => {
  const lead = jointSamplerAssignment({ ...tight, seed: 7 });
  assert.deepEqual(lead.pairs, [{ taskId: "t1", agentId: "A" }]);
  assert.deepEqual(lead.unassigned, ["t2", "t3", "t4"]);
  for (const seed of seeds64) {
    const sampled = jointSamplerAssignment({ ...tight, seed });
    assert.ok(sampled.pairs.length <= tightBudget.workers, `seed ${seed} proposed ${sampled.pairs.length} pairs for ${tightBudget.workers} shared worker`);
    const resolution = admitUnder(sampled.intents, tightBudget);
    assert.equal(resolution.rejected.length, 0, `seed ${seed}: ${JSON.stringify(resolution.rejected.map(r => r.code))}`);
    assert.equal(resolution.admitted.length, sampled.intents.length, `seed ${seed}`);
    assert.deepEqual(covered(sampled), allTasks, `seed ${seed}: every task is assigned or named unassigned`);
  }
});

test("the joint sampler names every task it cannot place: pairs plus unassigned cover all tasks on the default instance (the tight instance is covered by the 64-seed row above)", () => {
  const defaultRun = jointSamplerAssignment({ ...instance, seed: 7 });
  assert.deepEqual(defaultRun.unassigned, ["t3", "t4"], "two one-worker agents place two of four tasks and the rest are named");
  assert.deepEqual(covered(defaultRun), allTasks);
  for (const seed of seeds64) {
    const result = jointSamplerAssignment({ ...instance, seed });
    assert.equal(result.pairs.length, 2, `seed ${seed}`);
    assert.deepEqual(covered(result), allTasks, `seed ${seed}`);
  }
});

test("the joint sampler never loads an agent past its capacity on any of 64 seeds, independently of the exact-logProb seed row", () => {
  for (const seed of seeds64) {
    const sampled = jointSamplerAssignment({ ...instance, seed });
    for (const agent of instance.agents) {
      const load = sampled.pairs.filter(pair => pair.agentId === agent.agentId).length;
      assert.ok(load <= agent.capacity.workers, `seed ${seed}: ${agent.agentId} carries ${load} tasks for ${agent.capacity.workers} worker(s)`);
    }
  }
});

// MechanicalWorkflows-s06do: the sampler runs no warm-up. gateDraws starts its stream from the splitmix32-finalised seed
// (qmb3x), so the first draw is already a well-mixed function of the whole seed and step one of the sampler is decided by
// that first draw. The expectation below is computed independently of the sampler: draw once from gateDraws(seed) and walk
// the step-one softmax over the two eligible agents of the shared instance (A scores 1.01, B scores 0.01 for t1).
test("s06do the joint sampler's step one is decided by the first finalised gateDraws draw of the seed, with no warm-up draws before it", () => {
  const pA = Math.exp(1.01) / (Math.exp(1.01) + Math.exp(0.01));
  const seen = new Set<string>();
  for (const seed of Array.from({ length: 256 }, (_, s) => s)) {
    const u = gateDraws(seed)() / 4294967296;
    const expected = u <= pA ? "A" : "B";
    const sampled = jointSamplerAssignment({ ...instance, seed });
    if (sampled.steps === "unknown") assert.fail("the joint sampler records its steps");
    assert.equal(sampled.steps[0]!.agentId, expected, `seed ${seed}: first draw u=${u} against pA=${pA}`);
    seen.add(expected);
  }
  assert.deepEqual([...seen].sort(), ["A", "B"], "both branches of step one are reached across the 256 seeds");
});

// MechanicalWorkflows-l9g2: the x1gc/h6hc isolation law at the assignment resolvers. A post-call write to a caller's
// AssignmentTask.claim must never reach an Intent the resolver already returned (intentFor copied the claim by reference).
type MutableClaim = { -readonly [K in keyof typeof claim]: number };
const heldInstance = (heldClaim: MutableClaim, effect = "run"): AssignmentInput => ({
  basis, policyId: "assignment-isolation", budget,
  agents: [{ agentId: "A", capacity: { compute: 8, workers: 2, queue: 8, latencyMs: 40 } }],
  tasks: [{ taskId: "t1", claim: heldClaim, effect }],
  score: () => 1,
});

test("WA1 a post-call write to the claim object a task carried never reaches the Intent the matching resolver returned", () => {
  const held: MutableClaim = { compute: 1, workers: 1, queue: 1, latencyMs: 5 };
  const result = matchingAssignment(heldInstance(held));
  assert.equal(result.intents.length, 1);
  const intent = result.intents[0]!;
  const snapshot = { ...intent.claim };
  held.compute = 9;
  assert.deepEqual(intent.claim, snapshot, "the Intent keeps the call-time claim");
  assert.equal(intent.claim.compute, 1);
  assert.notStrictEqual(intent.claim, held, "the Intent does not share the caller's claim object");
});

test("WA2 a post-call write to the claim object a task carried never reaches the Intent the joint sampler returned", () => {
  const held: MutableClaim = { compute: 1, workers: 1, queue: 1, latencyMs: 5 };
  const result = jointSamplerAssignment({ ...heldInstance(held), seed: 7 });
  assert.equal(result.intents.length, 1);
  const intent = result.intents[0]!;
  const snapshot = { ...intent.claim };
  held.workers = 9;
  assert.deepEqual(intent.claim, snapshot, "the Intent keeps the call-time claim");
  assert.equal(intent.claim.workers, 1);
  assert.notStrictEqual(intent.claim, held, "the Intent does not share the caller's claim object");
});

test("WA3 control: a post-call write to the task's effect string leaves the Intent unchanged, isolating the claim alias from the already-fresh arrays", () => {
  const held: MutableClaim = { compute: 1, workers: 1, queue: 1, latencyMs: 5 };
  const input = heldInstance(held);
  const result = matchingAssignment(input);
  const intent = result.intents[0]!;
  (input.tasks[0] as { effect: string }).effect = "late";
  assert.equal(intent.effect, "run");
  assert.deepEqual(intent.evidenceRefs, []);
  assert.deepEqual(intent.writeScopes, ["task:t1"]);
  assert.deepEqual(intent.readScopes, ["agent:A"]);
});

test("WA4 reconcile admits the returned Intent after a late over-budget write to the task's claim, because the Intent kept the call-time claim", () => {
  const held: MutableClaim = { compute: 1, workers: 1, queue: 1, latencyMs: 5 };
  const result = matchingAssignment(heldInstance(held));
  const intent = result.intents[0]!;
  held.compute = 9;
  const outcome = admit([intent]);
  assert.deepEqual(outcome.admitted.map(admitted => admitted.intentId), [intent.intentId]);
  assert.deepEqual(outcome.rejected, []);
});

// MechanicalWorkflows-7q65: WA1-WA4 pin claim ISOLATION; these rows pin call-time claim FIDELITY of the
// intentFor copy: every returned Intent carries its OWN task's claim on every dimension.
const fidelityClaims: Record<string, Budget> = {
  t1: { compute: 1, workers: 1, queue: 1, latencyMs: 5 },
  t2: { compute: 2, workers: 1, queue: 3, latencyMs: 7 },
};
const fidelityCapacity: Budget = { compute: 2, workers: 1, queue: 3, latencyMs: 10 };
const fidelityInstance: AssignmentInput = {
  basis, policyId: "assignment-fidelity", budget,
  agents: [{ agentId: "A", capacity: fidelityCapacity }, { agentId: "B", capacity: fidelityCapacity }],
  tasks: Object.entries(fidelityClaims).map(([taskId, taskClaim]) => ({ taskId, claim: { ...taskClaim }, effect: "run" })),
  score: (agentId, taskId) => (agentId === "A" ? 1 : 0) + Number(taskId.slice(1)) / 100,
};

function assertOwnClaims(intents: readonly Intent[]): void {
  assert.deepEqual(intents.map(intent => intent.target.uri).sort(), ["t1", "t2"], "both tasks were placed");
  for (const intent of intents) {
    assert.deepEqual(intent.claim, fidelityClaims[intent.target.uri], `${intent.target.uri} carries its own task's claim`);
  }
}

test("7q65 X3 matchingAssignment returns, for each placed task, an Intent whose claim equals that task's own claim on every dimension", () => {
  assertOwnClaims(matchingAssignment(fidelityInstance).intents);
});

test("7q65 X4 jointSamplerAssignment (seed 7) returns, for each placed task, an Intent whose claim equals that task's own claim on every dimension", () => {
  assertOwnClaims(jointSamplerAssignment({ ...fidelityInstance, seed: 7 }).intents);
});

test("7q65 X1 every Intent matchingAssignment returns on the shared fixture carries the call-time claim including queue and latencyMs", () => {
  const intents = matchingAssignment(instance).intents;
  assert.ok(intents.length > 0);
  for (const intent of intents) assert.deepEqual(intent.claim, claim);
});

test("7q65 X2 every Intent jointSamplerAssignment (seed 7) returns on the shared fixture carries the call-time claim including queue and latencyMs", () => {
  const intents = jointSamplerAssignment({ ...instance, seed: 7 }).intents;
  assert.ok(intents.length > 0);
  for (const intent of intents) assert.deepEqual(intent.claim, claim);
});
