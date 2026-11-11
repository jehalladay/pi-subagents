import test from "node:test";
import assert from "node:assert/strict";
import { reconcile } from "../dist/index.js";
import type { Basis, Budget, Intent, Proposal, Resolution } from "../dist/index.js";

/**
 * APO-EAT-R002 (bead 4r3f): the two-claim exclusive-lane toy, pinned.
 *
 * Two independent policies each claim the one exclusive lane with probability p1 and p2. A lone claim is
 * admitted; a simultaneous pair is refused for both parties as INTENT_WRITE_CONFLICT with one Conflict, so the
 * expected admitted count is J(p1, p2) = p1(1-p2) + p2(1-p1) = p1 + p2 - 2 p1 p2. This is the toy algebra only:
 * independence is constructed by the caller here, and the numbers are never production uplift.
 */

const basis: Basis = { workspaceId: "toy", revision: "head-1" };
const claim = { compute: 1, workers: 1, queue: 1, latencyMs: 10 };
// Headroom for at least two simultaneous claims in every dimension, so a refusal can only come from the lane.
const budget: Budget = { compute: 4, workers: 4, queue: 4, latencyMs: 40 };
const GRID = [0, 0.25, 0.5, 0.75, 1] as const;

function laneIntent(policyId: string): Intent {
  return {
    intentId: `${policyId}:claim-lane`, policyId, target: { kind: "lane", uri: "lane:exclusive" },
    expectedRevision: basis.revision, effect: "claim-lane", claim,
    evidenceRefs: [], writeScopes: ["lane:exclusive"], readScopes: [],
  };
}
function resolve(claimed: readonly [boolean, boolean]): Resolution {
  const policies = ["p1", "p2"] as const;
  const proposals: Proposal<Intent, null>[] = policies.flatMap((id, index) => claimed[index] ? [{ intents: [laneIntent(id)], memory: null, trace: [] }] : []);
  return reconcile({ basis, budget, protectedScopes: [], proposals });
}
// reconcile is pure, so each of the four joint outcomes is resolved once and reused only where a loop revisits it.
const OUTCOMES: readonly (readonly [boolean, boolean])[] = [[false, false], [true, false], [false, true], [true, true]];
const resolved = new Map<string, Resolution>(OUTCOMES.map(outcome => [outcome.join(), resolve(outcome)]));
function admittedCount(claimed: readonly [boolean, boolean]): number { return resolved.get(claimed.join())!.admitted.length; }

/** Exact expected admitted count by enumerating the four joint outcomes with product weights. */
function J(p1: number, p2: number): number {
  let total = 0;
  for (const outcome of OUTCOMES) total += (outcome[0] ? p1 : 1 - p1) * (outcome[1] ? p2 : 1 - p2) * admittedCount(outcome);
  return total;
}

test("a lone claim is admitted and the simultaneous pair is refused for both with one Conflict, on the same basis revision", () => {
  for (const lone of [[true, false], [false, true]] as const) {
    const r = resolved.get(lone.join())!;
    assert.equal(r.admitted.length, 1);
    assert.equal(r.rejected.length, 0);
    assert.deepEqual(r.conflicts, []);
    assert.equal(r.admitted[0]!.expectedRevision, basis.revision);
    assert.equal(r.admitted[0]!.authority ?? "propose-only", "propose-only");
  }
  const pair = resolved.get([true, true].join())!;
  assert.deepEqual(pair.admitted, []);
  assert.deepEqual(pair.rejected.map(x => `${x.intent.intentId}:${x.code}`), ["p1:claim-lane:INTENT_WRITE_CONFLICT", "p2:claim-lane:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(pair.conflicts, [{ scope: "lane:exclusive", intentIds: ["p1:claim-lane", "p2:claim-lane"] }]);
  assert.equal(resolved.get([false, false].join())!.admitted.length, 0);
});

test("every intent uses expectedRevision equal to the basis, writes exactly one lane scope, and the budget fits two claims so only the lane can refuse", () => {
  for (const policyId of ["p1", "p2"]) {
    const intent = laneIntent(policyId);
    assert.equal(intent.expectedRevision, basis.revision);
    assert.deepEqual(intent.writeScopes, ["lane:exclusive"]);
    assert.deepEqual(intent.readScopes, []);
  }
  for (const dimension of ["compute", "workers", "queue", "latencyMs"] as const) assert.ok(budget[dimension] >= 2 * claim[dimension], `headroom for two claims in ${dimension}`);
  for (const r of resolved.values()) assert.ok(r.rejected.every(x => x.code === "INTENT_WRITE_CONFLICT"), "no rejection other than the lane conflict");
});

test("the expected admitted count equals p1+p2-2*p1*p2 exactly on the grid and its p1-derivative is 1-2*p2 by finite difference", () => {
  for (const p1 of GRID) for (const p2 of GRID) assert.equal(J(p1, p2), p1 + p2 - 2 * p1 * p2, `J(${p1}, ${p2})`);
  // J is affine in p1, so a step of 0.25 is exact in binary floating point and the difference quotient is exact.
  const h = 0.25;
  for (const p1 of [0, 0.25, 0.5, 0.75] as const) for (const p2 of GRID) assert.equal((J(p1 + h, p2) - J(p1, p2)) / h, 1 - 2 * p2, `dJ/dp1 at (${p1}, ${p2})`);
});

/** xorshift32 over a mixed seed, returning uniform draws in [0, 1). */
function stream(seed: number): () => number {
  let state = (Math.imul(seed >>> 0, 2654435761) ^ 0x9e3779b9) >>> 0 || 1;
  return () => {
    state ^= state << 13; state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5; state >>>= 0;
    return state / 4294967296;
  };
}

test("a seeded Monte Carlo estimate with N=20000 and distinct per-policy seeds agrees with J within three standard errors (exact when J is 0 or 1)", () => {
  const N = 20000;
  const seeds = { p1: 1101, p2: 2202 };
  assert.notEqual(seeds.p1, seeds.p2);
  for (const p1 of GRID) for (const p2 of GRID) {
    const draw1 = stream(seeds.p1 + Math.round(p1 * 100));
    const draw2 = stream(seeds.p2 + Math.round(p2 * 100));
    let admitted = 0;
    for (let trial = 0; trial < N; trial++) admitted += admittedCount([draw1() < p1, draw2() < p2]);
    const mean = admitted / N;
    const j = p1 + p2 - 2 * p1 * p2;
    if (j === 0 || j === 1) assert.equal(mean, j, `degenerate J at (${p1}, ${p2})`);
    else assert.ok(Math.abs(mean - j) <= 3 * Math.sqrt(j * (1 - j) / N), `MC ${mean} vs J ${j} at (${p1}, ${p2})`);
  }
});
