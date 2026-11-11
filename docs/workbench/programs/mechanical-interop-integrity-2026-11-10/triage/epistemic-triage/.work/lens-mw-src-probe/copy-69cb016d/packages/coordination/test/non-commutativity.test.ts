import test from "node:test";
import assert from "node:assert/strict";
import { sequential, parallel, reconcile, canonicalJson, digest } from "../dist/index.js";
import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal, SequentialObservation } from "../dist/index.js";

/**
 * TW-EAT-R009: the positive side of the algebra's order claims. `06-coordination-policy-algebra.md` states that
 * equivalence laws hold over the intents payload of payload-only policies and "never over effects"; the existing
 * restraint-side tests show where order does not matter. These tests show where it does, on one chosen pair:
 * two claimers that each take the first ready candidate the other has not already taken. That pair is effectful in the
 * algebra's sense (each reads the other's proposal), so P;Q and Q;P assign candidates to policies differently.
 */
interface Queue { readonly ready: readonly string[]; readonly head: string }
type ClaimerObservation = Queue | SequentialObservation<Queue, Intent, number>;

const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const observation: Queue = { ready: ["cand:a", "cand:b"], head: "head-1" };
const context: PolicyContext = {
  episodeId: "episode:demo", actorId: "worker:1", observationDigest: digest(observation),
  budget, authority: "propose-only", policyRevision: "composed-1", seed: 3,
};

function land(policyId: string, uri: string, scope: string): Intent {
  return {
    intentId: `${policyId}:${uri}`, policyId, target: { kind: "candidate", uri }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: [scope], readScopes: [],
  };
}

/** Takes the first ready candidate that no earlier policy in the sequence has proposed; disjoint write scope per policy. */
function claimer(id: string, scope: string): Policy<ClaimerObservation, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose(o, memory) {
      const base = "prior" in o ? o.observation : o;
      const taken = new Set("prior" in o ? o.prior.intents.map(i => i.target.uri) : []);
      const uri = base.ready.find(candidate => !taken.has(candidate));
      return { intents: uri === undefined ? [] : [land(id, uri, scope)], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: uri ?? "none" }] };
    },
  };
}

/** Pins the observation type to Queue so the second policy is checked against SequentialObservation<Queue, ...>. */
const seq = (p: Policy<ClaimerObservation, Intent, number>, q: Policy<ClaimerObservation, Intent, number>) => sequential<Queue, Intent, number, number>(p, q);
const x = claimer("x", "docs");
const y = claimer("y", "qa");
const ids = (p: Proposal<Intent, unknown>) => p.intents.map(i => i.intentId);
/** The candidate each policy ended up with: the observable assignment, independent of intent order. */
const assignment = (intents: readonly Intent[]) => Object.fromEntries(intents.map(i => [i.policyId, i.target.uri]).sort());
const admittedBy = (proposal: Proposal<Intent, unknown>) => reconcile({ basis, budget, protectedScopes: [], proposals: [proposal] });

test("non-commutativity: P;Q and Q;P over the chosen effectful pair produce different proposals, assignments, admitted sets and digests", () => {
  const xy = seq(x, y).propose(observation, [0, 0], context);
  const yx = seq(y, x).propose(observation, [0, 0], context);
  assert.deepEqual(ids(xy), ["x:cand:a", "y:cand:b"]);
  assert.deepEqual(ids(yx), ["y:cand:a", "x:cand:b"]);
  assert.notDeepEqual(assignment(xy.intents), assignment(yx.intents));
  assert.deepEqual(assignment(xy.intents), { x: "cand:a", y: "cand:b" });
  assert.deepEqual(assignment(yx.intents), { x: "cand:b", y: "cand:a" });
  assert.notEqual(digest(xy), digest(yx));
  const admittedXy = admittedBy(xy), admittedYx = admittedBy(yx);
  assert.deepEqual(admittedXy.rejected, []);
  assert.deepEqual(admittedYx.rejected, []);
  // Same size, same scopes, disjoint writes: only the assignment of candidates to policies distinguishes the two orders.
  assert.equal(admittedXy.admitted.length, admittedYx.admitted.length);
  assert.notDeepEqual([...admittedXy.admitted.map(i => i.intentId)].sort(), [...admittedYx.admitted.map(i => i.intentId)].sort());
  assert.deepEqual(assignment(admittedXy.admitted), { x: "cand:a", y: "cand:b" });
  assert.deepEqual(assignment(admittedYx.admitted), { x: "cand:b", y: "cand:a" });
});

test("non-commutativity: the composed policies are themselves distinguishable by id and revision", () => {
  const xy = seq(x, y), yx = seq(y, x);
  assert.equal(xy.id, "x;y");
  assert.equal(yx.id, "y;x");
  assert.notEqual(xy.id, yx.id);
  assert.notEqual(xy.revision, yx.revision);
});

test("non-commutativity: no API output flags the two orderings as equivalent, commutative or interchangeable", () => {
  const outputs = [
    seq(x, y).propose(observation, [0, 0], context),
    seq(y, x).propose(observation, [0, 0], context),
  ];
  const surfaces = [
    ...outputs.map(canonicalJson),
    ...outputs.map(o => canonicalJson(admittedBy(o))),
    canonicalJson([seq(x, y).id, seq(x, y).revision, seq(y, x).id, seq(y, x).revision]),
  ];
  for (const surface of surfaces) assert.doesNotMatch(surface, /commut|equivalen|interchangeab/i);
  for (const output of outputs) for (const event of output.trace) assert.doesNotMatch(`${event.kind} ${event.detail}`, /commut|equivalen|interchangeab/i);
});

test("negative control: the same comparators do find equivalence for parallel over the pair, so the sequential difference is not a blind comparator", () => {
  const xy = parallel(x, y).propose(observation, [0, 0], context);
  const yx = parallel(y, x).propose(observation, [0, 0], context);
  assert.deepEqual(assignment(xy.intents), assignment(yx.intents));
  assert.deepEqual([...admittedBy(xy).admitted.map(i => i.intentId)].sort(), [...admittedBy(yx).admitted.map(i => i.intentId)].sort());
  assert.notEqual(digest(xy), digest(yx), "intent order and trace order still differ, so a digest alone never claims commutativity");
});
