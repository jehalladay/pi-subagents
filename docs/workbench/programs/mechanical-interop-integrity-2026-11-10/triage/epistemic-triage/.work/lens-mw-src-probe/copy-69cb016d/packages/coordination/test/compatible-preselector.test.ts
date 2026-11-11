import test from "node:test";
import assert from "node:assert/strict";
import {
  preselectCompatibleSubset,
  assertPreselectionOnlyNarrows,
  witnessPreselectionEquivalence,
  reconcile,
  type Intent,
  type ResolverInput,
} from "../dist/index.js";

const claim = (compute: number) => ({ compute, workers: 1, queue: 0, latencyMs: 0 });
const intent = (intentId: string, over: Partial<Intent>): Intent => ({
  intentId,
  policyId: "pol-1",
  target: { kind: "lane", uri: "mw://lane/1" },
  expectedRevision: "rev-9",
  effect: "advance",
  claim: claim(1),
  evidenceRefs: [],
  writeScopes: [`scope/${intentId}`],
  readScopes: [],
  ...over,
});

/** Conflict corpus: clean admits, a duplicate, an authority breach, a stale basis, a protected write, a write-write conflict pair, a write-read conflict pair and a budget crosser. */
const corpus = (): ResolverInput => ({
  basis: { workspaceId: "ws-1", revision: "rev-9" },
  budget: { compute: 10, workers: 10, queue: 10, latencyMs: 10 },
  protectedScopes: ["scope/protected"],
  proposals: [
    {
      intents: [
        intent("ok-1", {}),
        intent("dup", { expectedRevision: "rev-8" }),
        intent("dup", { expectedRevision: "rev-8" }),
        intent("escalate", { authority: "authorized-effect" }),
        intent("stale", { expectedRevision: "rev-8" }),
        intent("guarded", { writeScopes: ["scope/protected"] }),
        intent("w1", { writeScopes: ["scope/shared"] }),
        intent("w2", { writeScopes: ["scope/shared"] }),
        intent("w3", { writeScopes: ["scope/journal"] }),
        intent("r3", { writeScopes: [], readScopes: ["scope/journal"] }),
        intent("pricey", { claim: claim(100) }),
        intent("ok-2", {}),
      ],
      memory: null,
      trace: [],
    },
  ],
});

test("on the conflict corpus, reconcile admits identical sets with and without the preselector", () => {
  const input = corpus();
  const without = reconcile(input).admitted.map((x) => x.intentId);
  const pre = preselectCompatibleSubset(input);
  const withPre = reconcile(pre.input).admitted.map((x) => x.intentId);
  assert.deepEqual(without, ["ok-1", "ok-2"]);
  assert.deepEqual(withPre, without);
  const witness = witnessPreselectionEquivalence(input);
  assert.equal(witness.identical, true);
  assert.deepEqual(witness.refusals, []);
});

test("the preselector drops every rejected intent with its reconcile code and keeps disclosed order", () => {
  const pre = preselectCompatibleSubset(corpus());
  const droppedIds = pre.dropped.map((d) => d.intentId).sort();
  assert.deepEqual(droppedIds, ["dup", "dup", "escalate", "guarded", "pricey", "r3", "stale", "w1", "w2", "w3"]);
  const conflictDrop = pre.dropped.find((d) => d.intentId === "w1");
  assert.equal(conflictDrop!.reason, "INTENT_WRITE_CONFLICT");
  const kept = pre.input.proposals.flatMap((p) => p.intents.map((x) => x.intentId));
  assert.deepEqual(kept, ["ok-1", "ok-2"]);
  const narrowing = assertPreselectionOnlyNarrows(corpus(), pre.input);
  assert.equal(narrowing.ok, true);
});

test("all parties of a conflict are dropped together: rescuing one would bypass a rejection", () => {
  const input = corpus();
  const pre = preselectCompatibleSubset(input);
  const kept = new Set(pre.input.proposals.flatMap((p) => p.intents.map((x) => x.intentId)));
  assert.equal(kept.has("w1"), false);
  assert.equal(kept.has("w2"), false);
  assert.equal(kept.has("w3"), false);
  assert.equal(kept.has("r3"), false);
  const rescued = {
    ...pre.input,
    proposals: [{ intents: [...pre.input.proposals[0]!.intents, intent("w1", { writeScopes: ["scope/shared"] })], memory: null, trace: [] }],
  };
  const grown = reconcile(rescued).admitted.map((x) => x.intentId);
  assert.deepEqual(grown, ["ok-1", "ok-2", "w1"]);
  const witness = witnessPreselectionEquivalence(input);
  assert.equal(witness.identical, true);
});

test("the narrowing guard refuses an added intent, a reorder, and touched basis, budget or scopes", () => {
  const input = corpus();
  const pre = preselectCompatibleSubset(input);
  const added = assertPreselectionOnlyNarrows(input, { ...pre.input, proposals: [{ intents: [...pre.input.proposals[0]!.intents, intent("smuggled", {})], memory: null, trace: [] }] });
  assert.ok(added.refusals.some((r) => r.code === "PRESELECT_INTENT_ADDED"));
  const reordered = assertPreselectionOnlyNarrows(input, { ...pre.input, proposals: [{ intents: [...pre.input.proposals[0]!.intents].reverse(), memory: null, trace: [] }] });
  assert.ok(reordered.refusals.some((r) => r.code === "PRESELECT_ORDER_CHANGED"));
  const basis = assertPreselectionOnlyNarrows(input, { ...pre.input, basis: { workspaceId: "ws-1", revision: "rev-10" } });
  assert.ok(basis.refusals.some((r) => r.code === "PRESELECT_BASIS_TOUCHED"));
  const budget = assertPreselectionOnlyNarrows(input, { ...pre.input, budget: { compute: 999, workers: 10, queue: 10, latencyMs: 10 } });
  assert.ok(budget.refusals.some((r) => r.code === "PRESELECT_BUDGET_TOUCHED"));
  const scopes = assertPreselectionOnlyNarrows(input, { ...pre.input, protectedScopes: [] });
  assert.ok(scopes.refusals.some((r) => r.code === "PRESELECT_SCOPES_TOUCHED"));
});

test("a no-conflict batch passes through unchanged", () => {
  const input: ResolverInput = { ...corpus(), proposals: [{ intents: [intent("a", {}), intent("b", {})], memory: null, trace: [] }] };
  const pre = preselectCompatibleSubset(input);
  assert.deepEqual(pre.dropped, []);
  assert.deepEqual(pre.input.proposals[0]!.intents.map((x) => x.intentId), ["a", "b"]);
  const witness = witnessPreselectionEquivalence(input);
  assert.equal(witness.identical, true);
  assert.deepEqual(witness.withoutPreselector, ["a", "b"]);
});

test("a buggy preselector that rescues a conflict party is named PRESELECT_ADMISSION_CHANGED", () => {
  const input = corpus();
  const rescuing = (original: ResolverInput) => {
    const honest = preselectCompatibleSubset(original);
    return {
      ...honest,
      input: { ...honest.input, proposals: [{ intents: [...honest.input.proposals[0]!.intents, intent("w1", { writeScopes: ["scope/shared"] })], memory: null, trace: [] }] },
    };
  };
  const witness = witnessPreselectionEquivalence(input, rescuing);
  assert.equal(witness.identical, false);
  assert.ok(witness.refusals.some((r) => r.code === "PRESELECT_ADMISSION_CHANGED"));
  assert.deepEqual([...witness.withPreselector], ["ok-1", "ok-2", "w1"]);
});

test("the equivalence witness names an admitted delta as PRESELECT_ADMISSION_CHANGED", () => {
  const input = corpus();
  const without = reconcile(input).admitted.map((x) => x.intentId);
  const tampered = { ...preselectCompatibleSubset(input).input, protectedScopes: input.protectedScopes, proposals: [{ intents: [intent("w1", { writeScopes: ["scope/shared"] })], memory: null, trace: [] }] };
  const tamperedAdmits = reconcile(tampered).admitted.map((x) => x.intentId);
  assert.notDeepEqual(tamperedAdmits, without);
  const honest = witnessPreselectionEquivalence(input);
  assert.equal(honest.identical, true);
  assert.deepEqual(honest.withPreselector, honest.withoutPreselector);
});

test("a budget-touching preselector is refused through the equivalence witness with PRESELECT_BUDGET_TOUCHED", () => {
  const input = corpus();
  const touching = (original: ResolverInput) => {
    const honest = preselectCompatibleSubset(original);
    return { ...honest, input: { ...honest.input, budget: { compute: 999, workers: 10, queue: 10, latencyMs: 10 } } };
  };
  const witness = witnessPreselectionEquivalence(input, touching);
  assert.equal(witness.identical, false);
  assert.deepEqual(witness.refusals.map((r) => r.code), ["PRESELECT_BUDGET_TOUCHED"]);
});

test("the preselection, the narrowing check and the witness carry their schema tags", () => {
  const input = corpus();
  const pre = preselectCompatibleSubset(input);
  assert.equal(pre.schema, "mw.compatible-preselection.v0");
  assert.equal(assertPreselectionOnlyNarrows(input, pre.input).schema, "mw.preselect-narrowing.v0");
  assert.equal(witnessPreselectionEquivalence(input).schema, "mw.preselect-equivalence.v0");
});

test("the dropped list is frozen", () => {
  assert.equal(Object.isFrozen(preselectCompatibleSubset(corpus()).dropped), true);
});

test("the preselection itself is frozen", () => {
  assert.equal(Object.isFrozen(preselectCompatibleSubset(corpus())), true);
});

test("the dropped list names every rejected intent with its own reconcile reason, in disclosed order", () => {
  const pre = preselectCompatibleSubset(corpus());
  assert.deepEqual(
    pre.dropped.map((d) => [d.intentId, d.reason]),
    [
      ["dup", "INTENT_BASIS_STALE"],
      ["dup", "INTENT_DUPLICATE"],
      ["escalate", "INTENT_AUTHORITY_EXCEEDED"],
      ["stale", "INTENT_BASIS_STALE"],
      ["guarded", "INTENT_SCOPE_PROTECTED"],
      ["w1", "INTENT_WRITE_CONFLICT"],
      ["w2", "INTENT_WRITE_CONFLICT"],
      ["w3", "INTENT_WRITE_CONFLICT"],
      ["r3", "INTENT_WRITE_CONFLICT"],
      ["pricey", "INTENT_BUDGET_EXCEEDED"],
    ],
  );
});

test("a preselector that reverses the kept intents is refused for both the admitted order and the disclosed order", () => {
  const input = corpus();
  const reversing = (original: ResolverInput) => {
    const honest = preselectCompatibleSubset(original);
    return { ...honest, input: { ...honest.input, proposals: [{ ...honest.input.proposals[0]!, intents: [...honest.input.proposals[0]!.intents].reverse() }] } };
  };
  const witness = witnessPreselectionEquivalence(input, reversing);
  assert.equal(witness.identical, false);
  const codes = witness.refusals.map((r) => r.code);
  assert.ok(codes.includes("PRESELECT_ADMISSION_CHANGED"));
  assert.ok(codes.includes("PRESELECT_ORDER_CHANGED"));
  assert.deepEqual([...witness.withPreselector], ["ok-2", "ok-1"]);
});

test("proposal memory and trace pass through the preselector unchanged", () => {
  const memory = { seen: ["ok-1"] };
  const trace = [{ kind: "note", policyId: "pol-1", detail: "kept ok-1" }];
  const base = corpus();
  const input: ResolverInput = { ...base, proposals: [{ ...base.proposals[0]!, memory, trace }] };
  const pre = preselectCompatibleSubset(input);
  assert.deepEqual(pre.input.proposals[0]!.memory, memory);
  assert.deepEqual(pre.input.proposals[0]!.trace, trace);
});

test("an added intent refuses with exactly PRESELECT_INTENT_ADDED and nothing else", () => {
  const input = corpus();
  const pre = preselectCompatibleSubset(input);
  const added = assertPreselectionOnlyNarrows(input, { ...pre.input, proposals: [{ intents: [...pre.input.proposals[0]!.intents, intent("smuggled", {})], memory: null, trace: [] }] });
  assert.deepEqual(added.refusals.map((r) => r.code), ["PRESELECT_INTENT_ADDED"]);
});

test("a second proposal is narrowed too: its rejected intent leaves pre.input and the kept ids match reconcile's admitted ids", () => {
  const base = corpus();
  const input: ResolverInput = {
    ...base,
    proposals: [
      {
        intents: [intent("ok-1", {}), intent("ok-2", {})],
        memory: null,
        trace: [],
      },
      {
        intents: [intent("ok-3", {}), intent("stale-2", { expectedRevision: "rev-8" })],
        memory: null,
        trace: [],
      },
    ],
  };
  const admitted = reconcile(input).admitted.map((x) => x.intentId);
  assert.deepEqual(admitted, ["ok-1", "ok-2", "ok-3"]);
  const pre = preselectCompatibleSubset(input);
  assert.deepEqual(pre.input.proposals[0]!.intents.map((x) => x.intentId), ["ok-1", "ok-2"]);
  assert.deepEqual(pre.input.proposals[1]!.intents.map((x) => x.intentId), ["ok-3"]);
  assert.deepEqual(pre.input.proposals.flatMap((p) => p.intents.map((x) => x.intentId)), admitted);
  assert.deepEqual(pre.dropped.map((d) => [d.intentId, d.reason]), [["stale-2", "INTENT_BASIS_STALE"]]);
  assert.equal(witnessPreselectionEquivalence(input).identical, true);
});
