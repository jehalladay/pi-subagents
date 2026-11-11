import test from "node:test";
import assert from "node:assert/strict";
import { reconcile } from "../dist/index.js";
import type { Basis, Budget, Intent, Proposal, ResourceClaim, Resolution } from "../dist/index.js";

// TW-EAT-R008 (MechanicalWorkflows-f608): two proposals that are each admissible alone must not both pass when their
// aggregate demand crosses the shared budget. The aggregate is the per-dimension SUM of admitted claims, never the max.

const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 10, workers: 2, queue: 4, latencyMs: 1000 };
const zero: ResourceClaim = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
const DIMENSIONS = ["compute", "workers", "queue", "latencyMs"] as const;
type Dimension = (typeof DIMENSIONS)[number];

function claimOf(dimension: Dimension, amount: number): ResourceClaim {
  return { ...zero, [dimension]: amount };
}
// Each intent writes its own scope, so only the budget can separate the two proposals.
function intent(id: string, claim: ResourceClaim): Intent {
  return {
    intentId: id, policyId: `policy:${id}`, target: { kind: "candidate", uri: `cand:${id}` }, expectedRevision: basis.revision,
    effect: "land", claim, evidenceRefs: [], writeScopes: [`scope:${id}`], readScopes: [],
  };
}
function proposal(...intents: Intent[]): Proposal<Intent, null> { return { intents, memory: null, trace: [] }; }
function sum(claims: readonly ResourceClaim[]): ResourceClaim {
  return claims.reduce((total, claim) => ({
    compute: total.compute + claim.compute, workers: total.workers + claim.workers,
    queue: total.queue + claim.queue, latencyMs: total.latencyMs + claim.latencyMs,
  }), zero);
}
function assertWithinBudget(r: Resolution, limit: Budget): void {
  for (const dimension of DIMENSIONS) assert.ok(r.budgetUsed[dimension] <= limit[dimension], `${dimension} used ${r.budgetUsed[dimension]} exceeds ${limit[dimension]}`);
  assert.deepEqual(r.budgetUsed, sum(r.admitted.map(i => i.claim)));
}

// Per dimension: [first amount, second amount]; each amount alone fits the cap, their sum does not.
const contention: Record<Dimension, readonly [number, number]> = { compute: [6, 6], workers: [2, 1], queue: [3, 3], latencyMs: [600, 600] };

for (const dimension of DIMENSIONS) {
  test(`budget contention on ${dimension}: two locally admissible proposals cross the shared cap together, so the later one is INTENT_BUDGET_EXCEEDED naming the sum`, () => {
    const [x, y] = contention[dimension];
    const first = intent("first", claimOf(dimension, x));
    const second = intent("second", claimOf(dimension, y));
    for (const solo of [first, second]) {
      const alone = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(solo)] });
      assert.deepEqual(alone.admitted.map(i => i.intentId), [solo.intentId]);
    }
    const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(first), proposal(second)] });
    assert.deepEqual(r.admitted.map(i => i.intentId), ["first"]);
    assert.deepEqual(r.rejected.map(x2 => `${x2.intent.intentId}:${x2.code}`), ["second:INTENT_BUDGET_EXCEEDED"]);
    assert.equal(r.rejected[0]!.detail, `${dimension} ${x}+${y} exceeds ${budget[dimension]}`);
    assert.deepEqual(r.conflicts, []);
    assert.deepEqual(r.budgetUsed, claimOf(dimension, x));
    assertWithinBudget(r, budget);
  });

  test(`budget contention on ${dimension}: the same pair is admitted in full when the shared limit covers the aggregate`, () => {
    const [x, y] = contention[dimension];
    const roomy: Budget = { ...budget, [dimension]: x + y };
    const r = reconcile({ basis, budget: roomy, protectedScopes: [], proposals: [proposal(intent("first", claimOf(dimension, x))), proposal(intent("second", claimOf(dimension, y)))] });
    assert.deepEqual(r.admitted.map(i => i.intentId), ["first", "second"]);
    assert.deepEqual(r.rejected, []);
    assert.deepEqual(r.budgetUsed, claimOf(dimension, x + y));
    assertWithinBudget(r, roomy);
  });
}

test("budget contention is resolved by disclosed proposal order with no tie-breaker: reversing the proposals flips which intent is refused, and the cap still holds", () => {
  const a = intent("a", claimOf("compute", 6));
  const b = intent("b", claimOf("compute", 6));
  const forward = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(a), proposal(b)] });
  const reversed = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(b), proposal(a)] });
  assert.deepEqual(forward.admitted.map(i => i.intentId), ["a"]);
  assert.deepEqual(reversed.admitted.map(i => i.intentId), ["b"]);
  assert.deepEqual(forward.rejected.map(r => r.intent.intentId), ["b"]);
  assert.deepEqual(reversed.rejected.map(r => r.intent.intentId), ["a"]);
  assertWithinBudget(forward, budget);
  assertWithinBudget(reversed, budget);
});

test("aggregation is the per-dimension sum, not the max: three claims whose maximum fits but whose sum crosses the cap admit only the prefix that fits", () => {
  const claims = ["x", "y", "z"].map(id => intent(id, claimOf("compute", 4)));
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: claims.map(c => proposal(c)) });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["x", "y"]);
  assert.deepEqual(r.rejected.map(x => `${x.intent.intentId}:${x.code}`), ["z:INTENT_BUDGET_EXCEEDED"]);
  assert.equal(r.rejected[0]!.detail, "compute 8+4 exceeds 10");
  assert.deepEqual(r.budgetUsed, claimOf("compute", 8));
  assertWithinBudget(r, budget);
});

test("an aggregate exactly equal to the cap is admitted: the contention check is strictly greater-than on the sum", () => {
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(intent("p", claimOf("compute", 5))), proposal(intent("q", claimOf("compute", 5)))] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["p", "q"]);
  assert.deepEqual(r.rejected, []);
  assert.deepEqual(r.budgetUsed, claimOf("compute", 10));
});

test("contention is judged per dimension independently: a pair that crosses only the workers cap names workers alone and leaves compute headroom unspent", () => {
  const first = intent("first", { compute: 1, workers: 2, queue: 0, latencyMs: 0 });
  const second = intent("second", { compute: 1, workers: 1, queue: 0, latencyMs: 0 });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(first), proposal(second)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["first"]);
  assert.equal(r.rejected[0]!.detail, "workers 2+1 exceeds 2");
  assert.deepEqual(r.budgetUsed, { compute: 1, workers: 2, queue: 0, latencyMs: 0 });
});
