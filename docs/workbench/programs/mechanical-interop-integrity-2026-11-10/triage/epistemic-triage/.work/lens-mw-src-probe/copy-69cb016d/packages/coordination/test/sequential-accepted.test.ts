import test from "node:test";
import assert from "node:assert/strict";
import { sequentialAccepted, reconcile, digest } from "../dist/index.js";
import type { AcceptedSequentialObservation, Basis, Budget, Intent, Policy, PolicyContext, Proposal } from "../dist/index.js";

/** TW combinator law tw-sequential-composition-condition (MechanicalWorkflows-32ad.4), implemented once with
 * the CAC-WC post-establishes-pre condition (uyaz.4): in P ;! Q the successor's input follows from P's ACCEPTED
 * output on the same pinned basis. The validator reconciles P's proposal against the pinned basis, budget and
 * protected scopes before Q runs, so Q observes only admitted intents plus the resolution; a stale, protected,
 * conflicting or over-budget P intent never reaches Q and is traced as sequential-rejected. The exported
 * sequential() is unchanged and still performs no acceptance. */

interface Queue { readonly ready: readonly string[]; readonly head: string }
const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const observation: Queue = { ready: ["cand:a", "cand:b", "cand:c"], head: "head-1" };
const context: PolicyContext = {
  episodeId: "episode:seq", actorId: "worker:1", observationDigest: digest(observation),
  budget, authority: "propose-only", policyRevision: "law-1", seed: 11,
};
function intent(policyId: string, uri: string, over: Partial<Intent> = {}): Intent {
  return {
    intentId: `${policyId}:${uri}`, policyId, target: { kind: "candidate", uri }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: ["ev:" + uri], writeScopes: ["scope:" + uri], readScopes: [], ...over,
  };
}
function fixed(id: string, intents: readonly Intent[]): Policy<Queue, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory) => ({ intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: String(intents.length) }] }) };
}
/** Q echoes what it was handed: one intent per accepted prior intent, so the test can read Q's input. */
function echo(id: string): Policy<AcceptedSequentialObservation<Queue, Intent, number>, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose(o, memory) {
      const seen = o.prior.intents.map(i => i.intentId);
      return { intents: o.prior.intents.map(i => intent(id, "after:" + i.target.uri)), memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: `saw ${seen.join(",")}; rejected ${o.resolution.rejected.length}` }] };
    },
  };
}
const acceptance = { basis, budget, protectedScopes: ["protected:x"] };
const ids = (p: Proposal<Intent, unknown>) => p.intents.map(i => i.intentId);

test("Q observes only P's accepted output: an admitted intent reaches Q, a stale one does not, and the stale one is traced as sequential-rejected", () => {
  const p = fixed("p", [intent("p", "cand:a"), intent("p", "cand:b", { expectedRevision: "head-0" })]);
  const out = sequentialAccepted(p, echo("q"), acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "q:after:cand:a"]);
  const rejected = out.trace.filter(t => t.kind === "sequential-rejected");
  assert.equal(rejected.length, 1);
  assert.ok(rejected[0]!.detail.includes("p:cand:b") && rejected[0]!.detail.includes("INTENT_BASIS_STALE"));
  assert.ok(out.trace.some(t => t.kind === "proposed" && t.detail === "saw p:cand:a; rejected 1"));
});

test("a protected-scope or conflicting P intent is rejected before Q sees it", () => {
  const p = fixed("p", [intent("p", "cand:a", { writeScopes: ["protected:x"] }), intent("p", "cand:b", { writeScopes: ["main"] }), intent("p", "cand:c", { writeScopes: ["main"] })]);
  const out = sequentialAccepted(p, echo("q"), acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), []);
  const codes = out.trace.filter(t => t.kind === "sequential-rejected").map(t => t.detail.replace(/^.* /, ""));
  assert.deepEqual(codes.sort(), ["INTENT_SCOPE_PROTECTED", "INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"]);
});

test("acceptance happens on the same pinned basis the policies run on: a mismatched acceptance basis rejects every P intent as stale and Q runs over nothing", () => {
  const p = fixed("p", [intent("p", "cand:a"), intent("p", "cand:b")]);
  const other = { basis: { workspaceId: "demo", revision: "head-9" }, budget, protectedScopes: [] as readonly string[] };
  const out = sequentialAccepted(p, echo("q"), other).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), []);
  assert.equal(out.trace.filter(t => t.kind === "sequential-rejected").length, 2);
  assert.ok(out.trace.some(t => t.kind === "proposed" && t.detail === "saw ; rejected 2"));
});

test("accepted intents pass through byte-identical and Q's memory and trace follow P's as in sequential", () => {
  const a = intent("p", "cand:a");
  const p = fixed("p", [a]);
  const out = sequentialAccepted(p, echo("q"), acceptance).propose(observation, [3, 7], context);
  assert.deepEqual(out.intents[0], a);
  assert.deepEqual(out.memory, [4, 8]);
  const kinds = out.trace.map(t => t.kind);
  assert.deepEqual(kinds, ["proposed", "sequential-accepted", "proposed", "sequential"]);
  assert.equal(out.trace[1]!.detail, "p accepted 1 of 1 for q");
});

test("acceptance is a filter on Q's input, never admissibility for the host: a budget-rejected P intent is dropped here, yet the composed output still meets reconcile on its own", () => {
  const p = fixed("p", [intent("p", "cand:a", { claim: { compute: 1000, workers: 1, queue: 1, latencyMs: 1 } }), intent("p", "cand:b")]);
  const out = sequentialAccepted(p, echo("q"), acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:b", "q:after:cand:b"]);
  assert.ok(out.trace.some(t => t.kind === "sequential-rejected" && t.detail.includes("INTENT_BUDGET_EXCEEDED")));
});

test("the validator is pure: repeating the evaluation yields byte-identical proposals and ids/revisions compose from both parts", () => {
  const p = fixed("p", [intent("p", "cand:a")]);
  const composed = sequentialAccepted(p, echo("q"), acceptance);
  assert.equal(composed.id, "p;!q");
  assert.equal(composed.revision, "p@p-rev;q@q-rev");
  const first = composed.propose(observation, [0, 0], context);
  const second = composed.propose(observation, [0, 0], context);
  assert.deepEqual(first, second);
});

/** MechanicalWorkflows-owox: pins for twelve one-clause refactors of sequentialAccepted that survived the six tests above. */
type AcceptedObservation = AcceptedSequentialObservation<Queue, Intent, number>;
/** P that proposes one intent per ready candidate, so two evaluations on two observations differ. */
function perReady(id: string): Policy<Queue, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (o, memory) => ({ intents: o.ready.map(uri => intent(id, uri)), memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: String(o.ready.length) }] }) };
}
/** Q that proposes a fixed batch whatever it was handed. */
function fixedQ(id: string, intents: readonly Intent[]): Policy<AcceptedObservation, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory) => ({ intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: String(intents.length) }] }) };
}
/** Q that discloses the prior memory and prior trace kinds it was handed. */
function recorder(id: string): Policy<AcceptedObservation, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose: (o, memory) => ({ intents: [], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: `prior memory ${o.prior.memory}; prior trace ${o.prior.trace.map(t => `${t.kind}:${t.policyId}`).join(",")}` }] }),
  };
}

test("owox M01: acceptance runs against the acceptance budget, not the context budget: compute 1 admits exactly one of two compute-1 intents although the context budget holds both", () => {
  const p = fixed("p", [intent("p", "cand:a"), intent("p", "cand:b")]);
  const tight = { basis, budget: { ...budget, compute: 1 }, protectedScopes: [] as readonly string[] };
  assert.ok(context.budget.compute > tight.budget.compute);
  const out = sequentialAccepted(p, echo("q"), tight).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "q:after:cand:a"]);
  const rejected = out.trace.filter(t => t.kind === "sequential-rejected");
  assert.equal(rejected.length, 1);
  assert.ok(rejected[0]!.detail.includes("p:cand:b") && rejected[0]!.detail.includes("INTENT_BUDGET_EXCEEDED"));
});

test("owox M11: Q's own output is never filtered by the acceptance basis: a stale Q intent stays in the composed output and reconcile alone rejects it", () => {
  const p = fixed("p", [intent("p", "cand:a")]);
  const q = fixedQ("q", [intent("q", "cand:late", { expectedRevision: "head-0" })]);
  const out = sequentialAccepted(p, q, acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "q:cand:late"]);
  const resolved = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(resolved.admitted.map(i => i.intentId), ["p:cand:a"]);
  assert.deepEqual(resolved.rejected.map(r => `${r.intent.intentId} ${r.code}`), ["q:cand:late INTENT_BASIS_STALE"]);
});

test("owox M12: nothing is memoized on the composed policy: one composed policy evaluated on two observations reflects the second observation", () => {
  const composed = sequentialAccepted(perReady("p"), echo("q"), acceptance);
  const first = composed.propose({ ready: ["cand:a"], head: "head-1" }, [0, 0], context);
  const second = composed.propose({ ready: ["cand:b"], head: "head-1" }, [0, 0], context);
  assert.deepEqual(ids(first), ["p:cand:a", "q:after:cand:a"]);
  assert.deepEqual(ids(second), ["p:cand:b", "q:after:cand:b"]);
  assert.ok(second.trace.some(t => t.kind === "proposed" && t.detail === "saw p:cand:b; rejected 0"));
});

test("owox M02: admitted order is P's disclosed order, both in the composed output and in what Q is handed", () => {
  const out = sequentialAccepted(fixed("p", [intent("p", "cand:a"), intent("p", "cand:b")]), echo("q"), acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "p:cand:b", "q:after:cand:a", "q:after:cand:b"]);
  assert.ok(out.trace.some(t => t.kind === "proposed" && t.detail === "saw p:cand:a,p:cand:b; rejected 0"));
});

test("owox M09 and M10: Q receives P's output memory and P's trace as its prior, never its own input memory or an empty trace", () => {
  const out = sequentialAccepted(fixed("p", [intent("p", "cand:a")]), recorder("q"), acceptance).propose(observation, [3, 7], context);
  assert.deepEqual(out.memory, [4, 8]);
  assert.ok(out.trace.some(t => t.kind === "proposed" && t.policyId === "q" && t.detail === "prior memory 4; prior trace proposed:p"));
});

test("owox M03 to M08: the composed trace names every mark under the composed id, counts admitted of proposed, and orders acceptance before rejections before Q's trace", () => {
  const p = fixed("p", [intent("p", "cand:a"), intent("p", "cand:b", { expectedRevision: "head-0" })]);
  const out = sequentialAccepted(p, echo("q"), acceptance).propose(observation, [0, 0], context);
  assert.deepEqual(out.trace.map(t => `${t.kind}@${t.policyId}`), [
    "proposed@p", "sequential-accepted@p;!q", "sequential-rejected@p;!q", "proposed@q", "sequential@p;!q",
  ]);
  assert.equal(out.trace[1]!.detail, "p accepted 1 of 2 for q");
  assert.equal(out.trace[2]!.detail, "p:cand:b INTENT_BASIS_STALE");
  assert.equal(out.trace[4]!.detail, "p then q over accepted output");
});
