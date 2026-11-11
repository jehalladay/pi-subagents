import test from "node:test";
import assert from "node:assert/strict";
import { reconcile, alternative, sequential, inhibit, treeConfiguration, fixedBaseline, fixedChecked, seedParitySelector, digest } from "../dist/index.js";
import type { Basis, Budget, CompositionTree, Intent, Policy, PolicyContext, Proposal, SequentialObservation, Selector, TreeGuard } from "../dist/index.js";

// CACWC-EAT-R007: no selection policy, learned or declared, may bypass MW's protected-scope refusal in reconcile or the
// protected-reference refusal in CompositionTree canonicalization. This claims MW-level non-bypass only: an external
// per-effect admission gate stays unwitnessed here.

const basis: Basis = { workspaceId: "demo", revision: "head-1" };
const budget: Budget = { compute: 100, workers: 10, queue: 10, latencyMs: 10_000 };
const PROTECTED = "global:release";
const context: PolicyContext = {
  episodeId: "episode:demo", actorId: "worker:1", observationDigest: digest({ ready: [] }),
  budget, authority: "propose-only", policyRevision: "policy-rev-1", seed: 3,
};
function intent(intentId: string, writeScopes: readonly string[], readScopes: readonly string[] = []): Intent {
  return {
    intentId, policyId: "p", target: { kind: "candidate", uri: `cand:${intentId}` }, expectedRevision: basis.revision, effect: "land",
    claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes, readScopes,
  };
}
function proposal(...intents: Intent[]): Proposal<Intent, null> { return { intents, memory: null, trace: [] }; }
function permutations<T>(items: readonly T[]): T[][] {
  if (items.length <= 1) return [[...items]];
  return items.flatMap((item, index) => permutations([...items.slice(0, index), ...items.slice(index + 1)]).map(rest => [item, ...rest]));
}

// The protected scope sits first, last, alone and among others; "ok" writes nothing protected.
const writers = [
  intent("w-only", [PROTECTED]),
  intent("w-last", ["qa", "docs", PROTECTED]),
  intent("w-first", [PROTECTED, "qa-2"]),
  intent("w-read-too", [PROTECTED], [PROTECTED]),
];
const reader = intent("r-only", ["lane"], [PROTECTED]);
const ok = intent("ok", ["lane-2"]);

test("reconcile refuses every intent that writes a protected scope with INTENT_SCOPE_PROTECTED for every proposal order and every grouping", () => {
  const everything = [...writers, reader, ok];
  const outcomes = new Set<string>();
  for (const order of permutations(everything)) {
    for (const grouping of ["one-proposal", "one-proposal-per-intent"] as const) {
      const proposals = grouping === "one-proposal" ? [proposal(...order)] : order.map(entry => proposal(entry));
      const r = reconcile({ basis, budget, protectedScopes: [PROTECTED], proposals });
      assert.deepEqual(r.rejected.map(x => `${x.intent.intentId}:${x.code}`).sort(), writers.map(w => `${w.intentId}:INTENT_SCOPE_PROTECTED`).sort(), `order ${order.map(o => o.intentId).join(",")}`);
      assert.deepEqual(r.admitted.map(x => x.intentId).sort(), ["ok", "r-only"], "a protected scope that is only read does not refuse the reader");
      assert.deepEqual(r.conflicts, [], "a refused writer never reaches conflict detection, so it cannot drag a bystander into a conflict");
      for (const rejection of r.rejected) assert.match(rejection.detail, /global:release/);
      outcomes.add(JSON.stringify([r.admitted.map(x => x.intentId).sort(), r.rejected.map(x => x.intent.intentId).sort()]));
    }
  }
  assert.equal(outcomes.size, 1, "the admitted and refused sets are independent of the disclosed order");
});

test("a protected write is refused before the conflict and budget stages: it never shows up as INTENT_WRITE_CONFLICT or INTENT_BUDGET_EXCEEDED", () => {
  const rival = intent("rival", ["lane-3"], [PROTECTED]);
  const greedy: Intent = { ...intent("greedy", [PROTECTED, "lane-3"]), claim: { compute: 1000, workers: 1, queue: 1, latencyMs: 1 } };
  const r = reconcile({ basis, budget, protectedScopes: [PROTECTED], proposals: [proposal(greedy, rival)] });
  assert.deepEqual(r.rejected.map(x => `${x.intent.intentId}:${x.code}`), ["greedy:INTENT_SCOPE_PROTECTED"]);
  assert.deepEqual(r.admitted.map(x => x.intentId), ["rival"]);
  assert.deepEqual(r.conflicts, []);
});

test("a declared or selected policy cannot launder a protected write: every combinator over a protected-writing policy is still refused by the resolver", () => {
  interface Queue { readonly ready: readonly string[] }
  const observation: Queue = { ready: ["cand:a"] };
  const writes = (id: string, scopes: readonly string[]): Policy<Queue, Intent, number> => ({
    id, revision: `${id}-rev`,
    propose: (_o, memory) => ({ intents: [intent(`${id}:i`, scopes)], memory: memory + 1, trace: [{ kind: "proposed", policyId: id, detail: "x" }] }),
  });
  const bad = writes("bad", [PROTECTED]);
  const fine = writes("fine", ["lane"]);
  const after: Policy<SequentialObservation<Queue, Intent, number>, Intent, number> = {
    id: "after", revision: "1",
    propose: (seen, memory) => ({ intents: [intent("after:i", [PROTECTED])], memory: memory + seen.prior.intents.length, trace: [] }),
  };
  const pickBad: Selector<Queue> = { id: "pick-bad", revision: "1", select: () => "left" };
  const pickFine: Selector<Queue> = { id: "pick-fine", revision: "1", select: () => "right" };
  const learned: Selector<Queue> = { id: "learned", revision: "7", select: (_o, ctx) => (ctx.seed % 2 === 0 ? "right" : "left") };
  const composed = [
    alternative(bad, fine, pickBad),
    alternative(fine, bad, pickFine),
    alternative(bad, fine, learned),
    sequential(fine, after),
    inhibit(fine, bad),
  ];
  for (const [index, policy] of composed.entries()) {
    const out = policy.propose(observation, [0, 0] as never, context);
    const r = reconcile({ basis, budget, protectedScopes: [PROTECTED], proposals: [out as Proposal<Intent, unknown>] });
    const protectedWrites = out.intents.filter(i => i.writeScopes.includes(PROTECTED)).map(i => i.intentId);
    assert.ok(protectedWrites.length > 0, `composition ${index} did propose a protected write`);
    assert.deepEqual(r.rejected.filter(x => x.code === "INTENT_SCOPE_PROTECTED").map(x => x.intent.intentId).sort(), protectedWrites.sort(), `composition ${index}`);
    assert.ok(r.admitted.every(i => !i.writeScopes.includes(PROTECTED)), `composition ${index} admitted no protected write`);
  }
});

const leaf = (configuration: typeof fixedBaseline): CompositionTree => ({ op: "policy", configuration });
const base = leaf(fixedBaseline);
const checked = leaf(fixedChecked);
const parity = seedParitySelector<never>();
const acceptAll: TreeGuard = { id: "accept-all", revision: "1", accept: () => true };
const withRefs = (op: "guarded" | "alternative" | "inhibit", references: string[]): CompositionTree => {
  if (op === "guarded") return { op, first: base, guard: acceptAll, then: checked, references };
  if (op === "alternative") return { op, left: base, right: checked, selector: parity, references };
  return { op, control: base, subject: checked, references };
};
const refusesProtected = (fn: () => unknown): void => assert.throws(fn, (error: unknown) => error instanceof RangeError && error.message.startsWith("CONFIG_TREE_PROTECTED_SCOPE"));

test("every reference-bearing node refuses the named protected references, wherever they sit in the list and at any depth", () => {
  for (const op of ["guarded", "alternative", "inhibit"] as const) {
    for (const protectedRef of ["effect:authorize", "verifier:x"]) {
      for (const list of [[protectedRef], [protectedRef, "docs:readme"], ["docs:readme", protectedRef], ["a:1", protectedRef, "z:9"]]) {
        refusesProtected(() => treeConfiguration("t", "1", withRefs(op, list)));
        refusesProtected(() => treeConfiguration("t", "1", { op: "sequential", first: base, then: { op: "parallel", left: checked, right: withRefs(op, list) } }));
      }
    }
  }
});

test("negative control: an ordinary reference docs:readme is admitted and appears sorted and de-duplicated in CanonicalTree.references", () => {
  for (const op of ["guarded", "alternative", "inhibit"] as const) {
    const configuration = treeConfiguration("t", "1", withRefs(op, ["scope:z", "docs:readme", "scope:z", "docs:a"]));
    assert.equal(configuration.kind, "composition");
    assert.equal(configuration.provenance.kind, "composition");
    const tree = (configuration.provenance as { readonly tree: { readonly op: string; readonly references: readonly string[] } }).tree;
    assert.equal(tree.op, op);
    assert.deepEqual(tree.references, ["docs:a", "docs:readme", "scope:z"]);
  }
});
