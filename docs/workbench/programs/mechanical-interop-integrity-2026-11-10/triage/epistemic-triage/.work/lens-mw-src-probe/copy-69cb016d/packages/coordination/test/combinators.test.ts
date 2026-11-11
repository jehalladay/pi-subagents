import test from "node:test";
import assert from "node:assert/strict";
import { sequential, parallel, guarded, alternative, inhibit, repeated, initialRepeatedMemory, reconcile, canonicalJson, digest } from "../dist/index.js";
import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal, Guard, Selector, SequentialObservation, RepeatedSpec, RepeatedMemory } from "../dist/index.js";

interface Queue { readonly ready: readonly string[]; readonly head: string }
const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const observation: Queue = { ready: ["cand:a", "cand:b"], head: "head-1" };
const context: PolicyContext = {
  episodeId: "episode:demo", actorId: "worker:1", observationDigest: digest(observation),
  budget, authority: "propose-only", policyRevision: "composed-1", seed: 3,
};
function land(policyId: string, uri: string, writeScopes: readonly string[] = ["main"]): Intent {
  return {
    intentId: `${policyId}:${uri}`, policyId, target: { kind: "candidate", uri }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes, readScopes: [],
  };
}
/** A payload-only policy: proposes one landing for the n-th ready candidate and counts evaluations in memory. */
function picker(id: string, index: number, writeScopes?: readonly string[]): Policy<Queue, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose(o, memory) {
      const uri = o.ready[index];
      return { intents: uri === undefined ? [] : [land(id, uri, writeScopes)], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: uri ?? "none" }] };
    },
  };
}
const ids = (p: Proposal<Intent, unknown>) => p.intents.map(i => i.intentId);
const kinds = (p: Proposal<Intent, unknown>) => p.trace.map(t => t.kind);

test("sequential: Q observes P's validated pure output under the same basis; intents and traces concatenate in order and memories pair up", () => {
  const p = picker("p", 0);
  const q: Policy<SequentialObservation<Queue, Intent, number>, Intent, number> = {
    id: "q", revision: "q-rev",
    propose(o, memory) {
      // Q sees P's proposal, not P's effects: it proposes the next candidate after the one P picked.
      const taken = new Set(o.prior.intents.map(i => i.target.uri));
      const next = o.observation.ready.find(uri => !taken.has(uri));
      return { intents: next === undefined ? [] : [land("q", next, ["docs"])], memory: memory + 10, trace: [{ kind: "proposed", policyId: "q", detail: `after ${[...taken].join(",")}` }] };
    },
  };
  const composed = sequential(p, q);
  const out = composed.propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "q:cand:b"]);
  assert.deepEqual(out.memory, [1, 10]);
  assert.deepEqual(kinds(out), ["proposed", "proposed", "sequential"]);
  assert.equal(composed.id, "p;q");
  assert.match(composed.revision, /p-rev/);
  assert.match(composed.revision, /q-rev/);
});

test("sequential is associative over the intents payload for payload-only policies (equivalence stated over outputs, not effects)", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]), r = picker("r", 0, ["qa"]);
  // "Payload-only" means the lifted policy reads the shared base observation through any depth of sequential wrapping
  // and ignores every prior; that is the condition under which the algebra promises associativity.
  const baseOf = (o: unknown): Queue => {
    let current: unknown = o;
    while (typeof current === "object" && current !== null && "prior" in current && "observation" in current) current = (current as { observation: unknown }).observation;
    return current as Queue;
  };
  const lift = <M>(policy: Policy<Queue, Intent, M>): Policy<SequentialObservation<unknown, Intent, unknown>, Intent, M> =>
    ({ id: policy.id, revision: policy.revision, propose: (o, m, c) => policy.propose(baseOf(o), m, c) });
  const left = sequential(sequential(p, lift(q)), lift(r)).propose(observation, [[0, 0], 0], context);
  const right = sequential(p, lift(sequential(lift(q), lift(r)))).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(left), ids(right));
  assert.deepEqual(ids(left), ["p:cand:a", "q:cand:b", "r:cand:a"]);
});

test("parallel: both policies are evaluated independently on the same observation; the combinator collects and never reconciles, so the conflict is still visible to reconcile", () => {
  const p = picker("p", 0), q = picker("q", 0);
  const out = parallel(p, q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["p:cand:a", "q:cand:a"]);
  assert.deepEqual(out.memory, [1, 1]);
  assert.deepEqual(kinds(out), ["proposed", "proposed", "parallel"]);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [out] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => x.code), ["INTENT_WRITE_CONFLICT", "INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts, [{ scope: "main", intentIds: ["p:cand:a", "q:cand:a"] }]);
});

test("parallel is commutative over the set of intents, and reconcile admits the same set in either order when scopes are disjoint", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const pq = parallel(p, q).propose(observation, [0, 0], context);
  const qp = parallel(q, p).propose(observation, [0, 0], context);
  assert.deepEqual([...ids(pq)].sort(), [...ids(qp)].sort());
  assert.notDeepEqual(ids(pq), ids(qp));
  const a = reconcile({ basis, budget, protectedScopes: [], proposals: [pq] }).admitted.map(i => i.intentId).sort();
  const b = reconcile({ basis, budget, protectedScopes: [], proposals: [qp] }).admitted.map(i => i.intentId).sort();
  assert.deepEqual(a, b);
  assert.deepEqual(a, ["p:cand:a", "q:cand:b"]);
});

test("guarded: Q is evaluated only when the declared guard accepts P's proposal; a rejected guard leaves Q's memory untouched and is traced with the guard's id and revision", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const onlyWhenPProposes: Guard<Intent, number> = { id: "p-proposed", revision: "guard-1", accept: proposal => proposal.intents.length > 0 };
  const accepted = guarded(p, onlyWhenPProposes, q).propose(observation, [0, 0], context);
  assert.deepEqual(ids(accepted), ["p:cand:a", "q:cand:b"]);
  assert.deepEqual(accepted.memory, [1, 1]);
  assert.deepEqual(kinds(accepted), ["proposed", "guard-accepted", "proposed"]);
  const empty: Queue = { ready: [], head: "head-1" };
  const rejected = guarded(p, onlyWhenPProposes, q).propose(empty, [0, 0], context);
  assert.deepEqual(ids(rejected), []);
  assert.deepEqual(rejected.memory, [1, 0]);
  assert.deepEqual(kinds(rejected), ["proposed", "guard-rejected"]);
  assert.equal(rejected.trace[1]!.detail, "p-proposed@guard-1");
});

test("alternative: exactly one policy runs, chosen by a declared versioned selector whose choice is logged; the unselected memory is unchanged", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const byHead: Selector<Queue> = { id: "by-head", revision: "sel-2", select: (o, ctx) => (o.head === "head-1" && ctx.seed % 2 === 1 ? "right" : "left") };
  const out = alternative(p, q, byHead).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["q:cand:b"]);
  assert.deepEqual(out.memory, [0, 1]);
  assert.deepEqual(kinds(out), ["alternative-selected", "proposed"]);
  assert.equal(out.trace[0]!.detail, "right by by-head@sel-2");
  const left = alternative(p, q, byHead).propose(observation, [0, 0], { ...context, seed: 4 });
  assert.deepEqual(ids(left), ["p:cand:a"]);
  assert.deepEqual(left.memory, [1, 0]);
});

test("inhibit: an evidence-backed inhibition from P suppresses Q's intents on the named write scope, is traced, and never adds admissibility; an inhibition without evidence is ignored", () => {
  const q = parallel(picker("q", 0), picker("q2", 1, ["docs"]));
  const inhibitMain = (evidence: readonly string[]): Policy<Queue, Intent, number> => ({
    id: "veto", revision: "veto-rev",
    propose: (_o, memory) => ({
      intents: [{ intentId: "veto:main", policyId: "veto", target: { kind: "scope", uri: "main" }, expectedRevision: basis.revision, effect: "inhibit",
        claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: evidence, writeScopes: [], readScopes: ["main"] }],
      memory: memory + 1, trace: [],
    }),
  });
  const suppressed = inhibit(inhibitMain(["forge:gate:red-1"]), q).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(suppressed), ["q2:cand:b"]);
  assert.deepEqual(suppressed.memory, [1, [1, 1]]);
  assert.deepEqual(kinds(suppressed), ["proposed", "proposed", "parallel", "inhibited"]);
  assert.equal(suppressed.trace[3]!.detail, "q:cand:a on main by veto:main (forge:gate:red-1)");
  const ignored = inhibit(inhibitMain([]), q).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(ignored), ["q:cand:a", "q2:cand:b"]);
  assert.equal(ignored.trace.at(-1)!.kind, "inhibition-ignored");
  assert.equal(ignored.trace.at(-1)!.detail, "veto:main on main carries no evidence");
  // Inhibition only removes: a protected-scope write that survives is still refused by the resolver.
  const r = reconcile({ basis, budget, protectedScopes: ["docs"], proposals: [suppressed] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(r.rejected.map(x => x.code), ["INTENT_SCOPE_PROTECTED"]);
});

test("composed policies are pure: repeating a composed evaluation gives byte-identical proposals", () => {
  const composed = parallel(sequential(picker("p", 0), { id: "noop", revision: "n", propose: (_o, m: number) => ({ intents: [], memory: m, trace: [] }) }), picker("r", 1, ["qa"]));
  const a = composed.propose(observation, [[0, 0], 0], context);
  const b = composed.propose(observation, [[0, 0], 0], context);
  assert.equal(canonicalJson(a), canonicalJson(b));
});

/** A control policy proposing one evidence-backed intent per (effect, target kind, uri) triple; used to pin what counts as an inhibition. */
function control(
  id: string,
  specs: readonly { readonly effect: string; readonly kind: string; readonly uri: string; readonly evidence?: readonly string[]; readonly readScopes?: readonly string[] }[],
): Policy<Queue, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose: (_o, memory) => ({
      intents: specs.map(spec => ({
        intentId: `${id}:${spec.effect}:${spec.kind}:${spec.uri}`, policyId: id, target: { kind: spec.kind, uri: spec.uri }, expectedRevision: basis.revision, effect: spec.effect,
        claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: spec.evidence ?? ["forge:gate:red-1"], writeScopes: [], readScopes: spec.readScopes ?? [spec.uri],
      })),
      memory: memory + 1, trace: [],
    }),
  };
}

test("inhibit: an intent with effect 'inhibit' but a non-scope target kind is not an inhibition; it is forwarded and Q's writes on that uri survive", () => {
  const out = inhibit(control("veto", [{ effect: "inhibit", kind: "candidate", uri: "main" }]), picker("q", 0)).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["veto:inhibit:candidate:main", "q:cand:a"]);
  assert.deepEqual(kinds(out), ["proposed"]);
});

test("inhibit: an intent on a scope target with an effect other than 'inhibit' is not an inhibition; it is forwarded and Q's writes on that scope survive", () => {
  const out = inhibit(control("veto", [{ effect: "land", kind: "scope", uri: "main" }]), picker("q", 0)).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["veto:land:scope:main", "q:cand:a"]);
  assert.deepEqual(kinds(out), ["proposed"]);
});

test("inhibit: every evidence-backed inhibition from P applies, not only the first; each removal is traced in order", () => {
  const q = parallel(picker("q", 0), picker("q2", 1, ["docs"]));
  const out = inhibit(control("veto", [{ effect: "inhibit", kind: "scope", uri: "main" }, { effect: "inhibit", kind: "scope", uri: "docs" }]), q).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(out), []);
  const inhibited = out.trace.filter(event => event.kind === "inhibited");
  assert.deepEqual(inhibited.map(event => event.detail), [
    "q:cand:a on main by veto:inhibit:scope:main (forge:gate:red-1)",
    "q2:cand:b on docs by veto:inhibit:scope:docs (forge:gate:red-1)",
  ]);
});

test("guarded: the composite revision names P, the declared guard and Q, so a different guard revision is a different composite revision", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const guard = (revision: string): Guard<Intent, number> => ({ id: "p-proposed", revision, accept: () => true });
  assert.equal(guarded(p, guard("guard-1"), q).revision, "p@p-rev;p-proposed@guard-1;q@q-rev");
  assert.notEqual(guarded(p, guard("guard-1"), q).revision, guarded(p, guard("guard-2"), q).revision);
});

test("alternative: the composite revision names P, Q and the declared selector, so a different selector revision is a different composite revision", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const selector = (revision: string): Selector<Queue> => ({ id: "by-head", revision, select: () => "left" });
  assert.equal(alternative(p, q, selector("sel-2")).revision, "p@p-rev;q@q-rev;by-head@sel-2");
  assert.notEqual(alternative(p, q, selector("sel-2")).revision, alternative(p, q, selector("sel-3")).revision);
});

test("guarded: the trace names the guard by id@revision when it accepts, exactly as when it rejects", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  const guard: Guard<Intent, number> = { id: "p-proposed", revision: "guard-1", accept: () => true };
  const accepted = guarded(p, guard, q).propose(observation, [0, 0], context);
  const decision = accepted.trace.find(event => event.kind === "guard-accepted");
  assert.equal(decision!.detail, "p-proposed@guard-1");
  assert.equal(decision!.policyId, "p>q");
});

test("inhibit: an intent on a non-'candidate', non-'scope' target kind with effect 'inhibit' is not an inhibition; it is forwarded and Q's main write survives", () => {
  const out = inhibit(control("veto", [{ effect: "inhibit", kind: "repo", uri: "main" }]), picker("q", 0)).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["veto:inhibit:repo:main", "q:cand:a"]);
  assert.deepEqual(kinds(out), ["proposed"]);
});

test("inhibit: a scope intent with an effect other than 'inhibit' or 'land' (here 'promote') is not an inhibition; it is forwarded and Q's main write survives", () => {
  const out = inhibit(control("veto", [{ effect: "promote", kind: "scope", uri: "main" }]), picker("q", 0)).propose(observation, [0, 0], context);
  assert.deepEqual(ids(out), ["veto:promote:scope:main", "q:cand:a"]);
  assert.deepEqual(kinds(out), ["proposed"]);
});

test("inhibit: the inhibited scope is the inhibition's target uri, not its first read scope; a main inhibition that reads docs removes main writes and keeps docs writes", () => {
  const q = parallel(picker("q", 0), picker("q2", 1, ["docs"]));
  const out = inhibit(control("veto", [{ effect: "inhibit", kind: "scope", uri: "main", readScopes: ["docs"] }]), q).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(out), ["q2:cand:b"]);
  const inhibited = out.trace.filter(event => event.kind === "inhibited");
  assert.deepEqual(inhibited.map(event => event.detail), ["q:cand:a on main by veto:inhibit:scope:main (forge:gate:red-1)"]);
});

test("inhibit: an evidence-less inhibition is skipped, not terminal; a later evidence-backed inhibition still applies, and the ignored line precedes the inhibited line", () => {
  const q = parallel(picker("q", 0), picker("q2", 1, ["docs"]));
  const out = inhibit(
    control("veto", [{ effect: "inhibit", kind: "scope", uri: "docs", evidence: [] }, { effect: "inhibit", kind: "scope", uri: "main" }]),
    q,
  ).propose(observation, [0, [0, 0]], context);
  assert.deepEqual(ids(out), ["q2:cand:b"]);
  assert.deepEqual(kinds(out), ["proposed", "proposed", "parallel", "inhibition-ignored", "inhibited"]);
  assert.equal(out.trace[3]!.detail, "veto:inhibit:scope:docs on docs carries no evidence");
  assert.equal(out.trace[4]!.detail, "q:cand:a on main by veto:inhibit:scope:main (forge:gate:red-1)");
});

test("parallel: the composite revision names P and then Q, so a different Q revision is a different composite revision", () => {
  const p = picker("p", 0), q = picker("q", 1, ["docs"]);
  assert.equal(parallel(p, q).revision, "p@p-rev;q@q-rev");
  const otherQ: Policy<Queue, Intent, number> = { ...q, revision: "q-rev-2" };
  assert.notEqual(parallel(p, q).revision, parallel(p, otherQ).revision);
});

test("inhibit: the composite revision names the control policy and then Q, so a different Q revision is a different composite revision", () => {
  const veto = control("veto", []), q = picker("q", 0);
  assert.equal(inhibit(veto, q).revision, "veto@veto-rev;q@q-rev");
  const otherQ: Policy<Queue, Intent, number> = { ...q, revision: "q-rev-2" };
  assert.notEqual(inhibit(veto, q).revision, inhibit(veto, otherQ).revision);
});

test("sequential: the composite revision names P and then Q in order", () => {
  const p = picker("p", 0);
  const q: Policy<SequentialObservation<Queue, Intent, number>, Intent, number> = { id: "q", revision: "q-rev", propose: (_o, memory) => ({ intents: [], memory, trace: [] }) };
  assert.equal(sequential(p, q).revision, "p@p-rev;q@q-rev");
});

/** A policy that records the seed it was handed in its trace detail, so a combinator that perturbs the seed is observable. */
function seedRecorder<O>(id: string): Policy<O, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory, ctx) => ({ intents: [], memory, trace: [{ kind: "seed", policyId: id, detail: String(ctx.seed) }] }) };
}

test("sequential: Q is handed the common context unchanged, so its seed equals the seed P was given", () => {
  const out = sequential(picker("p", 0), seedRecorder<SequentialObservation<Queue, Intent, number>>("rec")).propose(observation, [0, 0], context);
  assert.equal(out.trace.find(event => event.kind === "seed")!.detail, "3");
});

test("parallel: Q is handed the common context unchanged, so its seed equals the seed P was given", () => {
  const out = parallel(picker("p", 0), seedRecorder<Queue>("rec")).propose(observation, [0, 0], context);
  assert.equal(out.trace.find(event => event.kind === "seed")!.detail, "3");
});

/** Every policy a combinator evaluates sees the seed the composite was given, not only Q of sequential and parallel (pins S1-S4). */
const seeds = (p: Proposal<Intent, unknown>) => p.trace.filter(event => event.kind === "seed").map(event => event.detail);

test("sequential: P and Q are both handed the common context unchanged, so both record the seed the composite was given", () => {
  const out = sequential(seedRecorder<Queue>("p-rec"), seedRecorder<SequentialObservation<Queue, Intent, number>>("q-rec")).propose(observation, [0, 0], context);
  assert.deepEqual(seeds(out), ["3", "3"]);
});

test("parallel: P and Q are both handed the common context unchanged, so both record the seed the composite was given", () => {
  const out = parallel(seedRecorder<Queue>("p-rec"), seedRecorder<Queue>("q-rec")).propose(observation, [0, 0], context);
  assert.deepEqual(seeds(out), ["3", "3"]);
});

test("guarded: P and, when the guard accepts, Q are both handed the common context unchanged", () => {
  const accept: Guard<Intent, number> = { id: "g", revision: "g-rev", accept: () => true };
  const out = guarded(seedRecorder<Queue>("p-rec"), accept, seedRecorder<Queue>("q-rec")).propose(observation, [0, 0], context);
  assert.deepEqual(seeds(out), ["3", "3"]);
});

test("inhibit: the control policy and the subject are both handed the common context unchanged", () => {
  const out = inhibit(seedRecorder<Queue>("p-rec"), seedRecorder<Queue>("q-rec")).propose(observation, [0, 0], context);
  assert.deepEqual(seeds(out), ["3", "3"]);
});

/** Pins C1-C2: the whole common context reaches every evaluated policy, and alternative's selected policy too. */
function contextRecorder<O>(id: string): Policy<O, Intent, number> {
  return { id, revision: `${id}-rev`, propose: (_o, memory, ctx) => ({ intents: [], memory, trace: [{ kind: "context", policyId: id, detail: canonicalJson(ctx) }] }) };
}
const contexts = (p: Proposal<Intent, unknown>) => p.trace.filter(event => event.kind === "context").map(event => event.detail);

test("C1: sequential, parallel, guarded and inhibit hand every evaluated policy the whole common context, not only its seed", () => {
  const whole = canonicalJson(context);
  const accept: Guard<Intent, number> = { id: "g", revision: "g-rev", accept: () => true };
  assert.deepEqual(contexts(sequential(contextRecorder<Queue>("p"), contextRecorder<SequentialObservation<Queue, Intent, number>>("q")).propose(observation, [0, 0], context)), [whole, whole]);
  assert.deepEqual(contexts(parallel(contextRecorder<Queue>("p"), contextRecorder<Queue>("q")).propose(observation, [0, 0], context)), [whole, whole]);
  assert.deepEqual(contexts(guarded(contextRecorder<Queue>("p"), accept, contextRecorder<Queue>("q")).propose(observation, [0, 0], context)), [whole, whole]);
  assert.deepEqual(contexts(inhibit(contextRecorder<Queue>("p"), contextRecorder<Queue>("q")).propose(observation, [0, 0], context)), [whole, whole]);
});

test("C2: alternative hands the selected policy the common context unchanged, whichever side the selector picks", () => {
  const whole = canonicalJson(context);
  const pick = (side: "left" | "right"): Selector<Queue> => ({ id: "fixed", revision: side, select: () => side });
  assert.deepEqual(contexts(alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), pick("left")).propose(observation, [0, 0], context)), [whole]);
  assert.deepEqual(contexts(alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), pick("right")).propose(observation, [0, 0], context)), [whole]);
});

test("C3: alternative hands the selector the whole common context unchanged, whichever side it picks", () => {
  const whole = canonicalJson(context);
  const received: string[] = [];
  const recording = (side: "left" | "right"): Selector<Queue> => ({ id: "recording", revision: side, select: (_o, ctx) => { received.push(canonicalJson(ctx)); return side; } });
  alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), recording("left")).propose(observation, [0, 0], context);
  alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), recording("right")).propose(observation, [0, 0], context);
  assert.deepEqual(received, [whole, whole]);
});

test("R1: alternative hands the selector the observation unchanged, whichever side it picks", () => {
  const seen = canonicalJson(observation);
  const received: string[] = [];
  const recording = (side: "left" | "right"): Selector<Queue> => ({ id: "recording", revision: side, select: (o) => { received.push(canonicalJson(o)); return side; } });
  alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), recording("left")).propose(observation, [0, 0], context);
  alternative(contextRecorder<Queue>("p"), contextRecorder<Queue>("q"), recording("right")).propose(observation, [0, 0], context);
  assert.deepEqual(received, [seen, seen]);
});

/** A counting option: proposes one landing per repeat, tagged with its repeat number, and remembers how many repeats ran. */
function counter(id: string): Policy<Queue, Intent, number> {
  return {
    id, revision: `${id}-rev`,
    propose(o, memory) {
      const n = memory + 1;
      return { intents: [land(id, `${o.ready[0] ?? "none"}#${n}`)], memory: n, trace: [{ kind: "repeat", policyId: id, detail: String(n) }] };
    },
  };
}
const reachedThree = (proposal: Proposal<Intent, number>) => proposal.memory >= 3;
function spec(overrides: Partial<RepeatedSpec<Queue, Intent, number>> = {}): RepeatedSpec<Queue, Intent, number> {
  return {
    id: "loop", revision: "loop-1", maxSteps: 5, hold: 0,
    initiate: o => o.ready.length > 0,
    terminate: reachedThree,
    ...overrides,
  };
}
const idle: Queue = { ready: [], head: "head-1" };

/** Drives a repeated policy for `count` evaluations on one observation, threading memory; returns every proposal. */
function drive(policy: Policy<Queue, Intent, RepeatedMemory<number>>, o: Queue, memory: RepeatedMemory<number>, count: number): Proposal<Intent, RepeatedMemory<number>>[] {
  const out: Proposal<Intent, RepeatedMemory<number>>[] = [];
  let m = memory;
  for (let i = 0; i < count; i += 1) { const p = policy.propose(o, m, context); out.push(p); m = p.memory; }
  return out;
}

test("repeated: a false initiation gate proposes nothing, returns the memory object unchanged and traces repeated-not-initiated", () => {
  const memory = initialRepeatedMemory(0);
  const out = repeated(counter("c"), spec()).propose(idle, memory, context);
  assert.deepEqual(ids(out), []);
  assert.equal(out.memory, memory);
  assert.deepEqual(kinds(out), ["repeated-not-initiated"]);
  assert.equal(out.trace[0]!.detail, "loop@loop-1");
});

test("repeated: initiation starts a run that withholds intents while it continues, then proposes only the terminating repeat's intents and traces repeated-terminated with the repeat count", () => {
  const [first, second, third] = drive(repeated(counter("c"), spec()), observation, initialRepeatedMemory(0), 3) as [Proposal<Intent, RepeatedMemory<number>>, Proposal<Intent, RepeatedMemory<number>>, Proposal<Intent, RepeatedMemory<number>>];
  assert.deepEqual(kinds(first), ["repeated-initiated", "repeat", "repeated-continuing"]);
  assert.equal(first.trace.at(-1)!.detail, "loop@loop-1 repeat 1 of 5");
  assert.deepEqual(first.memory, { active: true, steps: 1, holdLeft: 0, latched: false, option: 1 });
  assert.deepEqual(ids(first), []);
  assert.deepEqual(kinds(second), ["repeat", "repeated-continuing"]);
  assert.deepEqual(ids(second), []);
  assert.deepEqual(ids(third), ["c:cand:a#3"]);
  assert.deepEqual(kinds(third), ["repeat", "repeated-terminated"]);
  assert.equal(third.trace.at(-1)!.detail, "loop@loop-1 after 3 repeat(s)");
  assert.deepEqual(third.memory, { active: false, steps: 0, holdLeft: 0, latched: false, option: 3 });
});

test("repeated: a run executes at most maxSteps repeats; a termination reached exactly on the last permitted repeat still terminates", () => {
  const exact = drive(repeated(counter("c"), spec({ maxSteps: 3 })), observation, initialRepeatedMemory(0), 3);
  assert.deepEqual(ids(exact[2]!), ["c:cand:a#3"]);
  assert.equal(exact.flatMap(p => p.trace).filter(e => e.kind === "repeat").length, 3);
  const short = drive(repeated(counter("c"), spec({ maxSteps: 2 })), observation, initialRepeatedMemory(0), 2);
  assert.equal(short.flatMap(p => p.trace).filter(e => e.kind === "repeat").length, 2);
  assert.deepEqual(short.flatMap(ids), []);
  assert.equal(short[1]!.trace.at(-1)!.kind, "repeated-nonquiescent");
});

test("repeated: a non-terminating option yields REPEATED_NONQUIESCENT, never proposes an effect, latches, and stays quiet while the guard stays true", () => {
  const policy = repeated(counter("c"), spec({ terminate: () => false, maxSteps: 3 }));
  const runs = drive(policy, observation, initialRepeatedMemory(0), 3);
  assert.deepEqual(runs.flatMap(ids), []);
  const last = runs[2]!;
  assert.equal(last.trace.at(-1)!.kind, "repeated-nonquiescent");
  assert.equal(last.trace.at(-1)!.detail, "REPEATED_NONQUIESCENT: loop@loop-1 ran 3 repeat(s) without terminating");
  assert.deepEqual(last.memory, { active: false, steps: 0, holdLeft: 0, latched: true, option: 3 });
  const quiet = policy.propose(observation, last.memory, context);
  assert.deepEqual(ids(quiet), []);
  assert.deepEqual(kinds(quiet), ["repeated-not-initiated"]);
  assert.equal(quiet.memory, last.memory);
  const dropped = policy.propose(idle, last.memory, context);
  assert.deepEqual(dropped.memory, { active: false, steps: 0, holdLeft: 0, latched: false, option: 3 });
  const again = drive(policy, observation, dropped.memory, 3);
  assert.equal(again[2]!.trace.at(-1)!.kind, "repeated-nonquiescent");
});

test("repeated: hysteresis keeps an active run going for hold evaluations after the guard drops, then releases it without proposing", () => {
  const policy = repeated(counter("c"), spec({ hold: 2, terminate: () => false, maxSteps: 9 }));
  const start: RepeatedMemory<number> = { active: true, steps: 1, holdLeft: 2, latched: false, option: 1 };
  const [first, second, third] = drive(policy, idle, start, 3) as [Proposal<Intent, RepeatedMemory<number>>, Proposal<Intent, RepeatedMemory<number>>, Proposal<Intent, RepeatedMemory<number>>];
  assert.deepEqual(kinds(first), ["repeated-hysteresis-held", "repeat", "repeated-continuing"]);
  assert.equal(first.trace[0]!.detail, "loop@loop-1 hold 1 left");
  assert.deepEqual(first.memory, { active: true, steps: 2, holdLeft: 1, latched: false, option: 2 });
  assert.equal(second.trace[0]!.detail, "loop@loop-1 hold 0 left");
  assert.deepEqual(ids(third), []);
  assert.deepEqual(kinds(third), ["repeated-released"]);
  assert.deepEqual(third.memory, { active: false, steps: 0, holdLeft: 0, latched: false, option: 3 });
});

test("repeated: a repeat that terminates during a held evaluation proposes that repeat's intents and ends the run (H1)", () => {
  const policy = repeated(counter("c"), spec({ hold: 2, terminate: () => true, maxSteps: 9 }));
  const start: RepeatedMemory<number> = { active: true, steps: 1, holdLeft: 2, latched: false, option: 1 };
  const held = policy.propose(idle, start, context);
  assert.deepEqual(kinds(held), ["repeated-hysteresis-held", "repeat", "repeated-terminated"]);
  assert.equal(held.trace[0]!.detail, "loop@loop-1 hold 1 left");
  assert.deepEqual(ids(held), ["c:none#2"]);
  assert.deepEqual(held.memory, initialRepeatedMemory(2));
});

test("repeated: without hysteresis a dropped guard releases an active run at once, and a true guard refills the hold", () => {
  const zero = repeated(counter("c"), spec({ hold: 0, terminate: () => false, maxSteps: 9 }));
  const released = zero.propose(idle, { active: true, steps: 1, holdLeft: 0, latched: false, option: 1 }, context);
  assert.deepEqual(kinds(released), ["repeated-released"]);
  const refill = repeated(counter("c"), spec({ hold: 3, terminate: () => false, maxSteps: 9 }));
  const out = refill.propose(observation, { active: true, steps: 1, holdLeft: 0, latched: false, option: 1 }, context);
  assert.deepEqual(out.memory, { active: true, steps: 2, holdLeft: 3, latched: false, option: 2 });
});

test("repeated: a guard that stays true starts a fresh run after the previous one terminated", () => {
  const policy = repeated(counter("c"), spec({ terminate: p => p.memory % 2 === 0 }));
  const runs = drive(policy, observation, initialRepeatedMemory(0), 4);
  assert.deepEqual(runs.flatMap(ids), ["c:cand:a#2", "c:cand:a#4"]);
  assert.deepEqual(kinds(runs[2]!).slice(0, 1), ["repeated-initiated"]);
});

test("repeated: invalid specs are refused at construction with REPEATED_INVALID_SPEC", () => {
  for (const bad of [{ maxSteps: 0 }, { maxSteps: 1.5 }, { hold: -1 }, { hold: 0.5 }]) {
    assert.throws(() => repeated(counter("c"), spec(bad)), /REPEATED_INVALID_SPEC/);
  }
});

test("repeated: the composite names the option and the declared spec in its id and revision", () => {
  const policy = repeated(counter("c"), spec());
  assert.equal(policy.id, "c*");
  assert.equal(policy.revision, "c@c-rev;loop@loop-1");
  assert.notEqual(repeated(counter("c"), spec({ revision: "loop-2" })).revision, policy.revision);
});

test("repeated: the option and the initiation guard are handed the whole common context unchanged", () => {
  const whole = canonicalJson(context);
  const seen: string[] = [];
  const recording = spec({ terminate: () => true, initiate: (_o, ctx) => { seen.push(canonicalJson(ctx)); return true; } });
  const out = repeated(contextRecorder<Queue>("c"), recording).propose(observation, initialRepeatedMemory(0), context);
  assert.deepEqual(contexts(out), [whole]);
  assert.deepEqual(seen, [whole]);
});

test("repeated: evaluation is pure; repeating it on the same inputs gives byte-identical proposals and leaves the input memory untouched", () => {
  const memory = initialRepeatedMemory(0);
  const frozen = canonicalJson(memory);
  const a = repeated(counter("c"), spec()).propose(observation, memory, context);
  const b = repeated(counter("c"), spec()).propose(observation, memory, context);
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(canonicalJson(memory), frozen);
});

test("repeated: a nonquiescent run reaches reconcile with no intent, so nothing is admitted", () => {
  const runs = drive(repeated(counter("c"), spec({ terminate: () => false, maxSteps: 2 })), observation, initialRepeatedMemory(0), 2);
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: runs });
  assert.deepEqual(r.admitted, []);
});

test("D1 repeated: initiation arms the hysteresis hold, so a guard that drops on the evaluation after initiation is held, not released", () => {
  const policy = repeated(counter("c"), spec({ hold: 2, terminate: () => false, maxSteps: 9 }));
  const first = policy.propose(observation, initialRepeatedMemory(0), context);
  assert.deepEqual(first.memory, { active: true, steps: 1, holdLeft: 2, latched: false, option: 1 });
  const second = policy.propose(idle, first.memory, context);
  assert.deepEqual(kinds(second), ["repeated-hysteresis-held", "repeat", "repeated-continuing"]);
  assert.equal(second.trace[0]!.detail, "loop@loop-1 hold 1 left");
});

test("D3 repeated: a run that reaches maxSteps during a hysteresis hold is REPEATED_NONQUIESCENT and latches", () => {
  const policy = repeated(counter("c"), spec({ hold: 2, maxSteps: 2, terminate: () => false }));
  const out = policy.propose(idle, { active: true, steps: 1, holdLeft: 2, latched: false, option: 1 }, context);
  assert.equal(out.trace.at(-1)!.kind, "repeated-nonquiescent");
  assert.deepEqual(ids(out), []);
  assert.deepEqual(out.memory, { active: false, steps: 0, holdLeft: 0, latched: true, option: 2 });
});

test("D4 repeated: the initiated and released trace events name the declared spec by id@revision", () => {
  const policy = repeated(counter("c"), spec({ terminate: () => false }));
  const started = policy.propose(observation, initialRepeatedMemory(0), context);
  assert.equal(started.trace[0]!.kind, "repeated-initiated");
  assert.equal(started.trace[0]!.detail, "loop@loop-1");
  const released = policy.propose(idle, started.memory, context);
  assert.deepEqual(kinds(released), ["repeated-released"]);
  assert.equal(released.trace[0]!.detail, "loop@loop-1");
});

/** CACWC-EAT-R016: CAC reference fields are an optional view; no combinator may read them or change its proposal because they exist. */
const cacView = { contract: "cac-capability-contract", revision: "ff9a8e1", obligations: ["effect", "evidence", "observer"] } as const;
function decorated<T extends object>(value: T): T & { readonly cac: typeof cacView } { return { ...value, cac: cacView }; }
const bytes = (p: Proposal<Intent, unknown>) => canonicalJson(p);

test("CAC fields on the policy objects leave all six combinators' proposals byte-identical and their composed identities unchanged", () => {
  const sequentialQ: Policy<SequentialObservation<Queue, Intent, number>, Intent, number> = {
    id: "q", revision: "q-rev",
    propose(o, memory) {
      const taken = new Set(o.prior.intents.map(i => i.target.uri));
      const next = o.observation.ready.find(uri => !taken.has(uri));
      return { intents: next === undefined ? [] : [land("q", next, ["docs"])], memory: memory + 10, trace: [{ kind: "proposed", policyId: "q", detail: "after" }] };
    },
  };
  const veto = (): Policy<Queue, Intent, number> => ({
    id: "veto", revision: "veto-rev",
    propose: (_o, memory) => ({
      intents: [{ intentId: "veto:main", policyId: "veto", target: { kind: "scope", uri: "main" }, expectedRevision: basis.revision, effect: "inhibit",
        claim: { compute: 0, workers: 0, queue: 0, latencyMs: 0 }, evidenceRefs: ["forge:gate:red-1"], writeScopes: [], readScopes: ["main"] }],
      memory: memory + 1, trace: [],
    }),
  });
  const guard: Guard<Intent, number> = { id: "p-proposed", revision: "guard-1", accept: proposal => proposal.intents.length > 0 };
  const selector: Selector<Queue> = { id: "by-head", revision: "sel-2", select: (o, ctx) => (o.head === "head-1" && ctx.seed % 2 === 1 ? "right" : "left") };
  const loop = (): RepeatedSpec<Queue, Intent, number> => spec();
  const cases: ReadonlyArray<readonly [string, (view: <T extends object>(v: T) => T) => { readonly composed: Policy<never, Intent, unknown>; readonly out: Proposal<Intent, unknown> }]> = [
    ["sequential", view => { const c = sequential(view(picker("p", 0)), view(sequentialQ)); return { composed: c as never, out: c.propose(observation, [0, 0], context) }; }],
    ["parallel", view => { const c = parallel(view(picker("p", 0)), view(picker("q", 1, ["docs"]))); return { composed: c as never, out: c.propose(observation, [0, 0], context) }; }],
    ["guarded", view => { const c = guarded(view(picker("p", 0)), view(guard), view(picker("q", 1, ["docs"]))); return { composed: c as never, out: c.propose(observation, [0, 0], context) }; }],
    ["alternative", view => { const c = alternative(view(picker("p", 0)), view(picker("q", 1, ["docs"])), view(selector)); return { composed: c as never, out: c.propose(observation, [0, 0], context) }; }],
    ["inhibit", view => { const c = inhibit(view(veto()), view(parallel(picker("q", 0), picker("q2", 1, ["docs"])))); return { composed: c as never, out: c.propose(observation, [0, [0, 0]], context) }; }],
    ["repeated", view => { const c = repeated(view(counter("c")), view(loop())); return { composed: c as never, out: c.propose(observation, initialRepeatedMemory(0), context) }; }],
  ];
  assert.equal(cases.length, 6);
  for (const [label, run] of cases) {
    const plain = run(v => v);
    const withCac = run(decorated);
    assert.equal(bytes(withCac.out), bytes(plain.out), `${label}: proposal bytes`);
    assert.equal(withCac.composed.id, plain.composed.id, `${label}: composed id`);
    assert.equal(withCac.composed.revision, plain.composed.revision, `${label}: composed revision`);
    assert.notEqual(plain.out.intents.length + plain.out.trace.length, 0, `${label}: control proposal is not vacuous`);
  }
});
