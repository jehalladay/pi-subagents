import test from "node:test";
import assert from "node:assert/strict";
import { reconcile, digest, canonicalJson } from "../dist/index.js";
import type { Basis, Budget, Intent, Policy, PolicyContext, Proposal, ResourceClaim, Resolution } from "../dist/index.js";

const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 10, workers: 2, queue: 4, latencyMs: 1000 };
const zero: ResourceClaim = { compute: 0, workers: 0, queue: 0, latencyMs: 0 };
const DIMENSION_NAMES = ["compute", "workers", "queue", "latencyMs"] as const;
const context: PolicyContext = {
  episodeId: "episode:demo", actorId: "worker:1", observationDigest: digest({ queue: [] }),
  budget, authority: "propose-only", policyRevision: "policy-rev-1", seed: 7,
};
function intent(overrides: Partial<Intent> & { intentId: string }): Intent {
  return {
    policyId: "fifo", target: { kind: "candidate", uri: "cand:a" }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 10 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [],
    ...overrides,
  };
}
function proposal(...intents: Intent[]): Proposal<Intent, null> { return { intents, memory: null, trace: [] }; }
function codes(r: Resolution): string[] { return r.rejected.map(x => `${x.intent.intentId}:${x.code}`).sort(); }

test("a policy is a pure synchronous transducer: same observation, memory and context give byte-identical proposals and no effect surface", () => {
  const counter: Policy<{ ready: readonly string[] }, Intent, { seen: number }> = {
    id: "fifo", revision: "policy-rev-1",
    propose(observation, memory, ctx) {
      const first = observation.ready[0];
      const intents = first === undefined ? [] : [intent({ intentId: `${ctx.episodeId}:${first}`, target: { kind: "candidate", uri: first } })];
      return { intents, memory: { seen: memory.seen + 1 }, trace: [{ kind: "proposed", policyId: "fifo", detail: first ?? "nothing-ready" }] };
    },
  };
  const a = counter.propose({ ready: ["cand:a", "cand:b"] }, { seen: 0 }, context);
  const b = counter.propose({ ready: ["cand:a", "cand:b"] }, { seen: 0 }, context);
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(a.memory.seen, 1);
  assert.equal(digest(a), digest(b));
  // The port carries no service, callback or promise: the propose signature is the whole effect surface.
  assert.equal(typeof counter.propose, "function");
  assert.equal(counter.propose.length, 3);
});

test("canonical JSON sorts keys at every depth and the digest is sha256 of those bytes", () => {
  assert.equal(canonicalJson({ b: 1, a: { d: [3, { z: 1, y: 2 }], c: null } }), '{"a":{"c":null,"d":[3,{"y":2,"z":1}]},"b":1}');
  assert.match(digest({ a: 1 }), /^sha256:[0-9a-f]{64}$/);
  assert.equal(digest({ a: 1, b: 2 }), digest({ b: 2, a: 1 }));
  assert.notEqual(digest({ a: 1 }), digest({ a: 2 }));
});

test("conflicting parallel intents on one write scope are both refused as INTENT_WRITE_CONFLICT and listed as one conflict; neither is admitted", () => {
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(intent({ intentId: "a" })), proposal(intent({ intentId: "b", policyId: "lru", target: { kind: "candidate", uri: "cand:b" } }))] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(codes(r), ["a:INTENT_WRITE_CONFLICT", "b:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts, [{ scope: "main", intentIds: ["a", "b"] }]);
  assert.deepEqual(r.budgetUsed, zero);
});

test("a write that interferes with another intent's read scope is a conflict for both; disjoint scopes are both admitted", () => {
  const writer = intent({ intentId: "w", writeScopes: ["docs"] });
  const reader = intent({ intentId: "r", writeScopes: [], readScopes: ["docs"], target: { kind: "candidate", uri: "cand:r" } });
  const other = intent({ intentId: "o", writeScopes: ["qa"], target: { kind: "candidate", uri: "cand:o" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(writer, reader, other)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["o"]);
  assert.deepEqual(codes(r), ["r:INTENT_WRITE_CONFLICT", "w:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts, [{ scope: "docs", intentIds: ["w", "r"] }]);
  assert.deepEqual(r.budgetUsed, other.claim);
});

test("a stale expected revision is INTENT_BASIS_STALE and a protected write scope is INTENT_SCOPE_PROTECTED; the detail names the basis or scope", () => {
  const stale = intent({ intentId: "s", expectedRevision: "head-0" });
  const protectedIntent = intent({ intentId: "p", writeScopes: ["global:release"], target: { kind: "candidate", uri: "cand:p" } });
  const r = reconcile({ basis, budget, protectedScopes: ["global:release"], proposals: [proposal(stale, protectedIntent)] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(codes(r), ["p:INTENT_SCOPE_PROTECTED", "s:INTENT_BASIS_STALE"]);
  assert.match(r.rejected.find(x => x.intent.intentId === "s")!.detail, /head-0.*head-1|head-1.*head-0/);
  assert.match(r.rejected.find(x => x.intent.intentId === "p")!.detail, /global:release/);
  assert.deepEqual(r.conflicts, []);
});

test("budget is cumulative in disclosed order: the intent that crosses any cap is INTENT_BUDGET_EXCEEDED and later cheaper intents may still be admitted", () => {
  const first = intent({ intentId: "1", claim: { compute: 6, workers: 1, queue: 1, latencyMs: 10 }, writeScopes: ["a"] });
  const second = intent({ intentId: "2", claim: { compute: 6, workers: 1, queue: 1, latencyMs: 10 }, writeScopes: ["b"], target: { kind: "candidate", uri: "cand:2" } });
  const third = intent({ intentId: "3", claim: { compute: 2, workers: 1, queue: 1, latencyMs: 10 }, writeScopes: ["c"], target: { kind: "candidate", uri: "cand:3" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(first), proposal(second), proposal(third)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["1", "3"]);
  assert.deepEqual(codes(r), ["2:INTENT_BUDGET_EXCEEDED"]);
  assert.match(r.rejected[0]!.detail, /compute/);
  assert.deepEqual(r.budgetUsed, { compute: 8, workers: 2, queue: 2, latencyMs: 20 });
});

test("a repeated intent id is INTENT_DUPLICATE for the later copy and an intent claiming effect authority is INTENT_AUTHORITY_EXCEEDED", () => {
  const dup = intent({ intentId: "d" });
  const authority = intent({ intentId: "x", writeScopes: ["other"], target: { kind: "candidate", uri: "cand:x" }, effect: "land", evidenceRefs: [], authority: "authorized-effect" } as Partial<Intent> & { intentId: string });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(dup, { ...dup }), proposal(authority)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["d"]);
  assert.deepEqual(codes(r), ["d:INTENT_DUPLICATE", "x:INTENT_AUTHORITY_EXCEEDED"]);
});

test("INTENT_CLAIM_INVALID refuses a NaN, negative or infinite claim dimension before conflict and budget checks and keeps budgetUsed finite (GPC/APO-EAT-R001, APO-025)", () => {
  const bad: readonly [string, ResourceClaim][] = [
    ["nan", { compute: Number.NaN, workers: 1, queue: 1, latencyMs: 10 }],
    ["negative", { compute: 1, workers: -5, queue: 1, latencyMs: 10 }],
    ["neg-infinity", { compute: 1, workers: 1, queue: 1, latencyMs: Number.NEGATIVE_INFINITY }],
    ["pos-infinity", { compute: 1, workers: 1, queue: Number.POSITIVE_INFINITY, latencyMs: 10 }],
  ];
  for (const [name, claim] of bad) {
    const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(intent({ intentId: name, claim }))] });
    assert.deepEqual(r.admitted, [], name);
    assert.equal(r.rejected[0]!.code, "INTENT_CLAIM_INVALID", name);
    assert.equal(r.rejected.length, 1, name);
    assert.equal(DIMENSION_NAMES.every(d => Number.isFinite(r.budgetUsed[d])), true, name);
    assert.deepEqual(r.budgetUsed, zero, name);
    assert.deepEqual(r.conflicts, [], name);
  }
  const detail = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(intent({ intentId: "d", claim: { compute: 1, workers: -5, queue: 1, latencyMs: 10 } }))] }).rejected[0]!.detail;
  assert.match(detail, /workers/);
});

test("an invalid claim never poisons its valid neighbours: no INTENT_WRITE_CONFLICT with a shared scope, no budget accounting, and zero or boundary claims keep current semantics", () => {
  const invalid = intent({ intentId: "bad", claim: { compute: Number.NaN, workers: 1, queue: 1, latencyMs: 10 } });
  const sameScope = intent({ intentId: "ok", target: { kind: "candidate", uri: "cand:ok" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(invalid), proposal(sameScope)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["ok"]);
  assert.deepEqual(codes(r), ["bad:INTENT_CLAIM_INVALID"]);
  assert.deepEqual(r.conflicts, []);
  assert.deepEqual(r.budgetUsed, sameScope.claim);
  const edge = intent({ intentId: "zero", claim: zero, writeScopes: ["z"], target: { kind: "candidate", uri: "cand:z" } });
  const atCap = intent({ intentId: "cap", claim: { ...budget }, writeScopes: ["c"], target: { kind: "candidate", uri: "cand:c" } });
  assert.deepEqual(reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(edge)] }).admitted.map(i => i.intentId), ["zero"]);
  assert.deepEqual(reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(atCap)] }).budgetUsed, budget);
});

test("the existing rejection precedence stands: a stale or protected intent with an invalid claim keeps its earlier code", () => {
  const stale = intent({ intentId: "s", expectedRevision: "head-0", claim: { compute: Number.NaN, workers: 1, queue: 1, latencyMs: 10 } });
  const guarded = intent({ intentId: "p", writeScopes: ["global:release"], target: { kind: "candidate", uri: "cand:p" }, claim: { compute: -1, workers: 1, queue: 1, latencyMs: 10 } });
  const r = reconcile({ basis, budget, protectedScopes: ["global:release"], proposals: [proposal(stale, guarded)] });
  assert.deepEqual(codes(r), ["p:INTENT_SCOPE_PROTECTED", "s:INTENT_BASIS_STALE"]);
});

test("a resolution carries the exact basis it judged against, and the empty batch admits and rejects nothing", () => {
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [] });
  assert.deepEqual(r, { basis, budget, admitted: [], rejected: [], conflicts: [], budgetUsed: zero });
});

test("canonical JSON refuses a value JSON cannot carry with CANONICAL_JSON_UNSUPPORTED_VALUE instead of silently dropping it, and drops undefined members", () => {
  assert.throws(() => canonicalJson({ run: () => 1 }), /CANONICAL_JSON_UNSUPPORTED_VALUE: function/);
  assert.throws(() => digest({ id: Symbol("x") }), /CANONICAL_JSON_UNSUPPORTED_VALUE: symbol/);
  assert.throws(() => canonicalJson(10n), /CANONICAL_JSON_UNSUPPORTED_VALUE: bigint/);
  assert.equal(canonicalJson({ a: undefined, b: 1 }), '{"b":1}');
});

test("canonical JSON refuses NaN and both infinities instead of rendering them as null, so no two values share one digest", () => {
  assert.throws(() => canonicalJson(Number.NaN), /CANONICAL_JSON_UNSUPPORTED_VALUE: number NaN/);
  assert.throws(() => canonicalJson({ score: Number.POSITIVE_INFINITY }), /CANONICAL_JSON_UNSUPPORTED_VALUE: number Infinity/);
  assert.throws(() => digest([1, Number.NEGATIVE_INFINITY]), /CANONICAL_JSON_UNSUPPORTED_VALUE: number -Infinity/);
  assert.equal(canonicalJson({ score: null }), '{"score":null}');
  assert.equal(canonicalJson([0, -1.5, 1e21]), "[0,-1.5,1e+21]");
});

test("canonical JSON refuses non-plain objects instead of collapsing each to {}, and still accepts plain and null-prototype objects", () => {
  assert.throws(() => canonicalJson(new Date(0)), /CANONICAL_JSON_UNSUPPORTED_VALUE: object Date/);
  assert.throws(() => digest({ seen: new Map([["a", 1]]) }), /CANONICAL_JSON_UNSUPPORTED_VALUE: object Map/);
  assert.throws(() => canonicalJson([new Set([1, 2])]), /CANONICAL_JSON_UNSUPPORTED_VALUE: object Set/);
  class Probe {
    readonly hidden = 1;
  }
  assert.throws(() => canonicalJson(new Probe()), /CANONICAL_JSON_UNSUPPORTED_VALUE: object Probe/);
  const bare = Object.create(null) as Record<string, unknown>;
  bare.b = 2;
  bare.a = 1;
  assert.equal(canonicalJson(bare), '{"a":1,"b":2}');
  assert.equal(canonicalJson({}), "{}");
});

test("every canonical JSON refusal is a TypeError, not a bare Error, and a prototype without a constructor name reports non-plain", () => {
  const isTypeError = (pattern: RegExp) => (error: unknown) => error instanceof TypeError && pattern.test(error.message);
  assert.throws(() => canonicalJson(Number.NaN), isTypeError(/^CANONICAL_JSON_UNSUPPORTED_VALUE: number NaN$/));
  assert.throws(() => canonicalJson(new Date(0)), isTypeError(/^CANONICAL_JSON_UNSUPPORTED_VALUE: object Date$/));
  assert.throws(() => canonicalJson(10n), isTypeError(/^CANONICAL_JSON_UNSUPPORTED_VALUE: bigint$/));
  // The prototype chain below carries no constructor, and an anonymous class instance carries an empty constructor name: both fall back to "non-plain".
  const noConstructor: unknown = Object.create(Object.create(null) as object);
  assert.throws(() => canonicalJson(noConstructor), isTypeError(/^CANONICAL_JSON_UNSUPPORTED_VALUE: object non-plain$/));
  assert.throws(() => canonicalJson(new (class {})()), isTypeError(/^CANONICAL_JSON_UNSUPPORTED_VALUE: object non-plain$/));
});

test("distinct lossy values no longer share a digest: they are refused, never hashed", () => {
  const lossy: unknown[] = [Number.NaN, Number.POSITIVE_INFINITY, new Date(0), new Date(1), new Map(), new Set()];
  for (const value of lossy) assert.throws(() => digest(value), /CANONICAL_JSON_UNSUPPORTED_VALUE/);
});

test("pin rfl s1: an intent both stale and protected is named INTENT_BASIS_STALE (documented check order)", () => {
  const both = intent({ intentId: "sp", expectedRevision: "head-0", writeScopes: ["global:release"] });
  const r = reconcile({ basis, budget, protectedScopes: ["global:release"], proposals: [proposal(both)] });
  assert.deepEqual(codes(r), ["sp:INTENT_BASIS_STALE"]);
});
test("pin rfl s2: two readers of one scope with no writer do not conflict and are both admitted", () => {
  const r1 = intent({ intentId: "r1", writeScopes: [], readScopes: ["docs"] });
  const r2 = intent({ intentId: "r2", writeScopes: [], readScopes: ["docs"], target: { kind: "candidate", uri: "cand:r2" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(r1, r2)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["r1", "r2"]);
  assert.deepEqual(r.conflicts, []);
});
test("pin rfl s3: an intent conflicting on two scopes is rejected exactly once and each scope is one conflict", () => {
  const a = intent({ intentId: "a", writeScopes: ["main", "docs"] });
  const b = intent({ intentId: "b", writeScopes: ["main", "docs"], target: { kind: "candidate", uri: "cand:b" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(a, b)] });
  assert.deepEqual(codes(r), ["a:INTENT_WRITE_CONFLICT", "b:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts, [{ scope: "main", intentIds: ["a", "b"] }, { scope: "docs", intentIds: ["a", "b"] }]);
});
test("pin rfl s4: crossing only the workers, queue or latencyMs cap is INTENT_BUDGET_EXCEEDED", () => {
  for (const claim of [{ compute: 0, workers: 3, queue: 0, latencyMs: 0 }, { compute: 0, workers: 0, queue: 5, latencyMs: 0 }, { compute: 0, workers: 0, queue: 0, latencyMs: 1001 }]) {
    const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(intent({ intentId: "big", claim }))] });
    assert.deepEqual(codes(r), ["big:INTENT_BUDGET_EXCEEDED"]);
  }
});
test("pin rfl s5: a later copy of an id whose first copy was rejected as stale is INTENT_DUPLICATE", () => {
  const first = intent({ intentId: "z", expectedRevision: "head-0" });
  const again = intent({ intentId: "z", writeScopes: ["other"] });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(first), proposal(again)] });
  assert.deepEqual(codes(r), ["z:INTENT_BASIS_STALE", "z:INTENT_DUPLICATE"]);
});

// GPC-EAT-R002 (MechanicalWorkflows-hb9n): reconcile is an accept/reject-only authority. It never substitutes,
// rewrites or invents an intent, so no GP integration may depend on a substitution verdict.
test("GPC-EAT-R002: a resolution exposes exactly admitted, basis, budget, budgetUsed, conflicts and rejected, so no substitution verdict exists", () => {
  const empty = reconcile({ basis, budget, protectedScopes: [], proposals: [] });
  assert.deepEqual(Object.keys(empty).sort(), ["admitted", "basis", "budget", "budgetUsed", "conflicts", "rejected"]);
  const mixed = reconcile({
    basis, budget, protectedScopes: ["protected"],
    proposals: [
      proposal(intent({ intentId: "ok", writeScopes: ["ok-scope"] }), intent({ intentId: "stale", expectedRevision: "head-0", writeScopes: ["s"] })),
      proposal(intent({ intentId: "guard", writeScopes: ["protected"] }), intent({ intentId: "ok", writeScopes: ["dup"] })),
    ],
  });
  assert.deepEqual(Object.keys(mixed).sort(), ["admitted", "basis", "budget", "budgetUsed", "conflicts", "rejected"]);
});

test("GPC-EAT-R002: every admitted intent is a proposed intent unchanged, and each proposed copy is admitted or rejected exactly once", () => {
  const a = intent({ intentId: "a", writeScopes: ["wa"] });
  const b = intent({ intentId: "b", writeScopes: ["wb"], claim: { compute: 2, workers: 1, queue: 1, latencyMs: 20 } });
  const c = intent({ intentId: "c", expectedRevision: "head-0", writeScopes: ["wc"] });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(a, b), proposal(c)] });
  assert.deepEqual(r.admitted.map(x => x.intentId), ["a", "b"]);
  for (const admitted of r.admitted) assert.ok([a, b, c].includes(admitted), `${admitted.intentId} must be the proposed object, not a rewrite`);
  assert.deepEqual(r.rejected.map(x => x.intent), [c]);
  assert.ok(r.rejected.every(x => [a, b, c].includes(x.intent)));
  assert.deepEqual([...r.admitted, ...r.rejected.map(x => x.intent)].map(x => x.intentId).sort(), ["a", "b", "c"]);
});

test("GPC-EAT-R002: interfering write scopes reject every party and admit none, with no stand-in chosen between them", () => {
  const x = intent({ intentId: "x", writeScopes: ["shared", "x-only"] });
  const y = intent({ intentId: "y", policyId: "lru", writeScopes: ["shared"], target: { kind: "candidate", uri: "cand:y" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(x), proposal(y)] });
  assert.deepEqual(r.admitted, []);
  assert.deepEqual(codes(r), ["x:INTENT_WRITE_CONFLICT", "y:INTENT_WRITE_CONFLICT"]);
  assert.deepEqual(r.conflicts, [{ scope: "shared", intentIds: ["x", "y"] }]);
  assert.deepEqual(r.budgetUsed, zero);
  assert.ok(r.rejected.every(rejection => !/substitut/i.test(rejection.detail)));
});

const RESOLUTION_KEYS = ["admitted", "basis", "budget", "budgetUsed", "conflicts", "rejected"];

test("GPC-EAT-R002: a conflicting batch still resolves to exactly the six keys, so no substitution key appears beside a conflict", () => {
  const x = intent({ intentId: "x", writeScopes: ["shared"] });
  const y = intent({ intentId: "y", policyId: "lru", writeScopes: ["shared"], target: { kind: "candidate", uri: "cand:y" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(x), proposal(y)] });
  assert.equal(r.conflicts.length, 1);
  assert.deepEqual(Object.keys(r).sort(), RESOLUTION_KEYS);
});

test("GPC-EAT-R002: a write-conflict rejection carries the proposed intent object itself, never a copy", () => {
  const first = intent({ intentId: "first", writeScopes: ["shared"] });
  const second = intent({ intentId: "second", writeScopes: ["shared"], target: { kind: "candidate", uri: "cand:second" } });
  const r = reconcile({ basis, budget, protectedScopes: [], proposals: [proposal(first, second)] });
  assert.deepEqual(codes(r), ["first:INTENT_WRITE_CONFLICT", "second:INTENT_WRITE_CONFLICT"]);
  assert.ok(r.rejected.every(x => [first, second].includes(x.intent)));
});

test("GPC-EAT-R002: the duplicate, authority, protected-scope and budget rejections each carry the proposed intent object itself, never a copy", () => {
  const original = intent({ intentId: "d", writeScopes: ["wd"] });
  const copy = intent({ intentId: "d", writeScopes: ["wd2"] });
  const authority = { ...intent({ intentId: "auth", writeScopes: ["wa"] }), authority: "authorized-effect" } as Intent;
  const guarded = intent({ intentId: "guard", writeScopes: ["protected"] });
  const heavy = intent({ intentId: "heavy", writeScopes: ["wh"], claim: { compute: 11, workers: 1, queue: 1, latencyMs: 10 } });
  const proposed = [original, copy, authority, guarded, heavy];
  const r = reconcile({ basis, budget, protectedScopes: ["protected"], proposals: [proposal(original, copy), proposal(authority, guarded, heavy)] });
  assert.deepEqual(r.admitted.map(i => i.intentId), ["d"]);
  assert.deepEqual(codes(r), ["auth:INTENT_AUTHORITY_EXCEEDED", "d:INTENT_DUPLICATE", "guard:INTENT_SCOPE_PROTECTED", "heavy:INTENT_BUDGET_EXCEEDED"]);
  assert.ok(r.rejected.every(x => proposed.includes(x.intent)));
  const byCode = (code: string) => r.rejected.find(x => x.code === code)!.intent;
  assert.equal(byCode("INTENT_DUPLICATE"), copy);
  assert.equal(byCode("INTENT_AUTHORITY_EXCEEDED"), authority);
  assert.equal(byCode("INTENT_SCOPE_PROTECTED"), guarded);
  assert.equal(byCode("INTENT_BUDGET_EXCEEDED"), heavy);
});
