import test from "node:test";
import assert from "node:assert/strict";
import { inhibit, parallel, reconcile, digest } from "../dist/index.js";
import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal } from "../dist/index.js";

/** TW combinator law tw-inhibition-composition-condition (MechanicalWorkflows-32ad.2): P -| Q removes Q's
 * proposals on an evidence-backed write scope and does nothing else. It consumes the inhibition itself, never
 * mutates a survivor, never grants or removes admissibility, never exempts anything from the resolver's native
 * requirements (protected scopes, authority, budget), keys on write scope only and governs Q, not P. */

interface Queue { readonly ready: readonly string[]; readonly head: string }
const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const observation: Queue = { ready: ["cand:a", "cand:b", "cand:c"], head: "head-1" };
const context: PolicyContext = {
  episodeId: "episode:inhibit", actorId: "worker:1", observationDigest: digest(observation),
  budget, authority: "propose-only", policyRevision: "law-1", seed: 5,
};

function land(policyId: string, uri: string, writeScopes: readonly string[], readScopes: readonly string[] = []): Intent {
  return {
    intentId: `${policyId}:${uri}`, policyId, target: { kind: "candidate", uri }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: ["ev:" + uri], writeScopes, readScopes,
  };
}
function fixed(id: string, intents: readonly Intent[]): Policy<Queue, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory) => ({ intents, memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: String(intents.length) }] }) };
}
function veto(scope: string, evidence: readonly string[], extra: readonly Intent[] = []): Policy<Queue, Intent, number> {
  const inhibition: Intent = {
    intentId: `veto:${scope}`, policyId: "veto", target: { kind: "scope", uri: scope }, expectedRevision: basis.revision, effect: "inhibit",
    claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: evidence, writeScopes: [], readScopes: [scope],
  };
  return fixed("veto", [inhibition, ...extra]);
}
const ids = (p: Proposal<Intent, unknown>) => p.intents.map(i => i.intentId);
const inhibitedEvents = (p: Proposal<Intent, unknown>) => p.trace.filter(t => t.kind === "inhibited");

test("the inhibition is consumed: no inhibit effect reaches the output or the resolver", () => {
  const q = fixed("q", [land("q", "cand:a", ["main"]), land("q", "cand:b", ["docs"])]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.ok(out.intents.every(intent => intent.effect !== "inhibit"));
  assert.deepEqual(ids(out), ["q:cand:b"]);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.ok([...r.admitted, ...r.rejected.map(x => x.intent)].every(intent => intent.effect !== "inhibit"));
});

test("survivors pass through byte-identical: inhibition cannot relax scopes, claims, evidence or authority", () => {
  const survivor = land("q", "cand:b", ["docs"], ["main"]);
  const q = fixed("q", [land("q", "cand:a", ["main"]), survivor]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.deepEqual(out.intents, [survivor]);
});

test("inhibition adds no admissibility: the resolver over the inhibited proposal equals the resolver over Q minus the suppressed intents", () => {
  const qIntents = [land("q", "cand:a", ["main"]), land("q", "cand:b", ["docs"]), land("q", "cand:c", ["qa"])];
  const q = fixed("q", qIntents);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  const byHand: Proposal<Intent, unknown> = { intents: qIntents.filter(i => !i.writeScopes.includes("main")), memory: 0, trace: [] };
  const viaInhibit = reconcile({ basis, budget, protectedScopes: ["qa"], proposals: [out] });
  const viaHand = reconcile({ basis, budget, protectedScopes: ["qa"], proposals: [byHand] });
  assert.deepEqual(viaInhibit.admitted.map(i => i.intentId), viaHand.admitted.map(i => i.intentId));
  assert.deepEqual(viaInhibit.rejected.map(x => [x.intent.intentId, x.code]), viaHand.rejected.map(x => [x.intent.intentId, x.code]));
  assert.deepEqual(viaInhibit.budgetUsed, viaHand.budgetUsed);
});

test("native requirements stay untouched: an inhibition on a protected scope exempts nothing and a surviving protected write is still refused", () => {
  const q = fixed("q", [land("q", "cand:a", ["main"]), land("q", "cand:b", ["docs"])]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  const r = reconcile({ basis, budget, protectedScopes: ["main", "docs"], proposals: [out] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => [x.intent.intentId, x.code]), [["q:cand:b", "INTENT_SCOPE_PROTECTED"]]);
});

test("suppression keys on write scope only: an intent that merely reads the inhibited scope survives", () => {
  const reader = land("q", "cand:b", ["qa"], ["main"]);
  const q = fixed("q", [land("q", "cand:a", ["main"]), reader]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["q:cand:b"]);
  assert.equal(inhibitedEvents(out).length, 1);
});

test("an evidence-backed inhibition that matches nothing changes nothing and records no suppression", () => {
  const q = fixed("q", [land("q", "cand:a", ["main"]), land("q", "cand:b", ["docs"])]);
  const out = inhibit(veto("nowhere", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["q:cand:a", "q:cand:b"]);
  assert.equal(inhibitedEvents(out).length, 0);
});

test("inhibition governs Q, not P: the controller's own non-inhibition proposals pass through even on the inhibited scope", () => {
  const own = land("veto", "cand:c", ["main"]);
  const q = fixed("q", [land("q", "cand:a", ["main"])]);
  const out = inhibit(veto("main", ["forge:gate:red-7"], [own]), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["veto:cand:c"]);
  assert.deepEqual(out.intents[0], own);
});

test("every suppression is traced once, naming the suppressed intent, the scope, the inhibitor and its evidence", () => {
  const q = parallel(fixed("q", [land("q", "cand:a", ["main"])]), fixed("q2", [land("q2", "cand:b", ["main", "docs"])]));
  const out = inhibit(veto("main", ["forge:gate:red-7", "sim:T1"]), q).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(out), []);
  const events = inhibitedEvents(out);
  assert.equal(events.length, 2);
  assert.deepEqual(events.map(e => e.detail), [
    "q:cand:a on main by veto:main (forge:gate:red-7,sim:T1)",
    "q2:cand:b on main by veto:main (forge:gate:red-7,sim:T1)",
  ]);
});

test("suppression keys on the exact write scope: near-miss scopes that merely contain or extend the inhibited scope survive (MechanicalWorkflows-l5vs)", () => {
  const q = fixed("q", [
    land("q", "cand:a", ["main"]), land("q", "cand:b", ["main-docs"]), land("q", "cand:c", ["domain"]),
    land("q", "cand:d", ["mainline"]), land("q", "cand:e", ["ma"]),
  ]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["q:cand:b", "q:cand:c", "q:cand:d", "q:cand:e"]);
  assert.deepEqual(inhibitedEvents(out).map(e => e.detail), ["q:cand:a on main by veto:main (forge:gate:red-7)"]);
});

test("every inhibited event carries the composite policyId of the inhibition, not the suppressed intent's policy, and keeps its detail (MechanicalWorkflows-l5vs)", () => {
  const q = fixed("q", [land("q", "cand:a", ["main"]), land("q", "cand:b", ["main"])]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  const events = inhibitedEvents(out);
  assert.equal(events.length, 2);
  assert.deepEqual(events.map(e => e.policyId), ["veto-|q", "veto-|q"]);
  assert.deepEqual(events.map(e => e.detail), [
    "q:cand:a on main by veto:main (forge:gate:red-7)",
    "q:cand:b on main by veto:main (forge:gate:red-7)",
  ]);
});

test("an evidence-less inhibition is ignored and its inhibition-ignored event carries the composite policyId (MechanicalWorkflows-l5vs)", () => {
  const q = fixed("q", [land("q", "cand:a", ["main"])]);
  const out = inhibit(veto("main", []), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["q:cand:a"]);
  const ignored = out.trace.filter(t => t.kind === "inhibition-ignored");
  assert.equal(ignored.length, 1);
  assert.equal(ignored[0]!.policyId, "veto-|q");
  assert.equal(ignored[0]!.detail, "veto:main on main carries no evidence");
});

test("the traced scope is the matched scope, not the suppressed intent's first write scope (MechanicalWorkflows-l5vs)", () => {
  const q = fixed("q", [land("q", "cand:a", ["docs", "main"])]);
  const out = inhibit(veto("main", ["forge:gate:red-7"]), q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), []);
  assert.deepEqual(inhibitedEvents(out).map(e => e.detail), ["q:cand:a on main by veto:main (forge:gate:red-7)"]);
});

test("trace order: P's own trace precedes Q's, then the inhibition events, as an exact kind and detail sequence (MechanicalWorkflows-l5vs)", () => {
  const p = veto("main", ["forge:gate:red-7"]);
  const traced: Policy<Queue, Intent, number> = {
    ...p,
    propose: (o, memory, c) => {
      const base = p.propose(o, memory, c);
      return { ...base, trace: [...base.trace, { kind: "note", policyId: "veto", detail: "p-detail" }] };
    },
  };
  const q: Policy<Queue, Intent, number> = {
    id: "q", revision: "q-rev",
    propose: (_o, memory) => ({ intents: [land("q", "cand:a", ["main"])], memory: memory + 1, trace: [{ kind: "note", policyId: "q", detail: "q-detail" }] }),
  };
  const out = inhibit(traced, q).propose(observation, [0, 0], context);
  assert.deepEqual(out.trace.map(t => [t.kind, t.detail]), [
    ["proposed", "1"],
    ["note", "p-detail"],
    ["note", "q-detail"],
    ["inhibited", "q:cand:a on main by veto:main (forge:gate:red-7)"],
  ]);
});
