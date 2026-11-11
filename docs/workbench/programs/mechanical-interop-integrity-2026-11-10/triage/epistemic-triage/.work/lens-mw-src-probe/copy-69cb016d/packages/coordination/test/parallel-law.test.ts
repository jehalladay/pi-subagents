import test from "node:test";
import assert from "node:assert/strict";
import { parallel, reconcile, digest } from "../dist/index.js";
import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal } from "../dist/index.js";

/** TW combinator law tw-parallel-composition-condition (MechanicalWorkflows-32ad.2 sibling, bead 32ad.3):
 * P || Q collects both proposals and reconciles nothing, so the composite checks live in `reconcile`:
 * shared writes fail the composition with a named Conflict rejecting every party, and each branch's
 * source version is judged independently against the pinned basis. Budget contention is pinned by
 * TW-EAT-R008's suite. The unknown-dynamic-effects check is doc-only at HEAD, so this suite pins the
 * BOUNDARY: parallel effect resolution is claimed only for budget and scope interference, and the
 * resolver's rejection vocabulary is exactly the six pinned codes - nothing here claims an
 * unknown-effect check exists. */

interface Queue { readonly ready: readonly string[]; readonly head: string }
const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const observation: Queue = { ready: ["cand:a", "cand:b"], head: "head-1" };
const context: PolicyContext = {
  episodeId: "episode:parallel", actorId: "worker:1", observationDigest: digest(observation),
  budget, authority: "propose-only", policyRevision: "law-1", seed: 9,
};

function intent(policyId: string, uri: string, over: Partial<Intent> = {}): Intent {
  return {
    intentId: `${policyId}:${uri}`, policyId, target: { kind: "candidate", uri }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: ["ev:" + uri], writeScopes: ["scope:" + uri], readScopes: [],
    ...over,
  };
}
function fixed(id: string, intents: readonly Intent[]): Policy<Queue, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory) => ({ intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: String(intents.length) }] }) };
}

test("shared writes are a composite failure: reconcile rejects every party with INTENT_WRITE_CONFLICT and one named Conflict carrying both ids", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["main"] })]);
  const q = fixed("q", [intent("q", "cand:b", { writeScopes: ["main"] })]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => [x.intent.intentId, x.code]), [["p:cand:a", "INTENT_WRITE_CONFLICT"], ["q:cand:b", "INTENT_WRITE_CONFLICT"]]);
  assert.deepEqual(r.conflicts, [{ scope: "main", intentIds: ["p:cand:a", "q:cand:b"] }]);
});

test("a write against the other branch's read of the same scope is the same composite failure", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["main"] })]);
  const q = fixed("q", [intent("q", "cand:b", { writeScopes: ["docs"], readScopes: ["main"] })]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual([...r.rejected.map(x => x.code)], ["INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts.map(c => c.scope), ["main"]);
});

test("source versions are judged per branch: a stale branch is INTENT_BASIS_STALE while the fresh branch is admitted untouched", () => {
  const p = fixed("p", [intent("p", "cand:a", { expectedRevision: "head-0" })]);
  const q = fixed("q", [intent("q", "cand:b")]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["q:cand:b"]);
  assert.deepEqual(r.rejected.map(x => [x.intent.intentId, x.code]), [["p:cand:a", "INTENT_BASIS_STALE"]]);
  assert.deepEqual(r.conflicts, []);
});

test("both branches stale against a moved basis fail independently with two stale rejections, not a conflict", () => {
  const moved: Basis = { workspaceId: "demo", revision: "head-2" };
  const p = fixed("p", [intent("p", "cand:a")]);
  const q = fixed("q", [intent("q", "cand:b")]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis: moved, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => x.code), ["INTENT_BASIS_STALE", "INTENT_BASIS_STALE"]);
  assert.deepEqual(r.conflicts, []);
});

test("the claimed boundary is pinned: every rejection a parallel composition can receive is one of the six resolver codes, and no unknown-effect code exists", () => {
  const p = fixed("p", [
    intent("p", "cand:a", { writeScopes: ["main"] }),
    intent("p", "dup", { intentId: "same" }),
    intent("p", "stale", { intentId: "p:stale", expectedRevision: "head-0" }),
    intent("p", "hot", { intentId: "p:hot", authority: "authorized-effect" }),
  ]);
  const q = fixed("q", [
    intent("q", "cand:b", { writeScopes: ["main"] }),
    intent("q", "dup2", { intentId: "same" }),
    intent("q", "guarded", { intentId: "q:guarded", writeScopes: ["protected:x"] }),
    intent("q", "huge", { intentId: "q:huge", claim: { compute: 1000, workers: 1, queue: 1, latencyMs: 1 } }),
  ]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: ["protected:x"], proposals: [out] });
  const PINNED = ["INTENT_BASIS_STALE", "INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT", "INTENT_BUDGET_EXCEEDED", "INTENT_DUPLICATE", "INTENT_AUTHORITY_EXCEEDED"] as const;
  assert.ok(r.rejected.length >= 5);
  assert.ok(r.rejected.every(x => (PINNED as readonly string[]).includes(x.code)), "every rejection is within the pinned vocabulary");
  assert.ok(!r.rejected.some(x => /UNKNOWN|DYNAMIC|EFFECT_UNRESOLVED/.test(x.code)), "no unknown-dynamic-effect code exists at HEAD; that check is doc-only and unclaimed here");
  const codes = new Set(r.rejected.map(x => x.code));
  assert.ok(codes.has("INTENT_WRITE_CONFLICT") && codes.has("INTENT_DUPLICATE") && codes.has("INTENT_SCOPE_PROTECTED") && codes.has("INTENT_AUTHORITY_EXCEEDED"));
});

test("disjoint parallel branches aggregate budget use: budgetUsed sums both admitted branches", () => {
  const p = fixed("p", [intent("p", "cand:a", { claim: { compute: 3, workers: 2, queue: 1, latencyMs: 5 } })]);
  const q = fixed("q", [intent("q", "cand:b", { claim: { compute: 4, workers: 1, queue: 2, latencyMs: 7 } })]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.equal(r.admitted.length, 2);
  assert.deepEqual(r.budgetUsed, { compute: 7, workers: 3, queue: 3, latencyMs: 12 });
});

test("a stale branch writing the same scope as a fresh writer never joins scope interference: the fresh writer is admitted, the stale intent is rejected once as INTENT_BASIS_STALE, no Conflict", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["main"], expectedRevision: "head-0" })]);
  const q = fixed("q", [intent("q", "cand:b", { writeScopes: ["main"] })]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["q:cand:b"]);
  assert.deepEqual(r.rejected.map(x => [x.intent.intentId, x.code]), [["p:cand:a", "INTENT_BASIS_STALE"]]);
  assert.deepEqual(r.conflicts, []);
});

test("a stale branch reading a scope that a fresh branch writes never joins scope interference either: one INTENT_BASIS_STALE rejection, fresh writer admitted, no Conflict", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["docs"], readScopes: ["main"], expectedRevision: "head-0" })]);
  const q = fixed("q", [intent("q", "cand:b", { writeScopes: ["main"] })]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["q:cand:b"]);
  assert.deepEqual(r.rejected.map(x => x.code), ["INTENT_BASIS_STALE"]);
  assert.deepEqual(r.conflicts, []);
});

test("a stale writer of one scope beside two fresh readers of that scope never joins scope interference: both readers are admitted, one INTENT_BASIS_STALE rejection, no Conflict between the readers", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["main"], expectedRevision: "head-0" })]);
  const q = fixed("q", [
    intent("q", "cand:b", { writeScopes: ["docs"], readScopes: ["main"] }),
    intent("q", "cand:c", { writeScopes: ["notes"], readScopes: ["main"] }),
  ]);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["q:cand:b", "q:cand:c"]);
  assert.deepEqual(r.rejected.map(x => [x.intent.intentId, x.code]), [["p:cand:a", "INTENT_BASIS_STALE"]]);
  assert.deepEqual(r.conflicts, []);
});
