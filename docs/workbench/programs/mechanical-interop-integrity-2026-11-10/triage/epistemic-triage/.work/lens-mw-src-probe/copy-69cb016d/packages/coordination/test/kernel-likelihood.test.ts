import { strict as assert } from "node:assert";
import { test } from "node:test";
import { diracLogProb, inhibitLogProb, parallelLogProb, selectorLogProb, sequentialLogProb, sharedSampleLogProb, validateLogProb } from "../dist/index.js";
import type { IndependenceWitness, Intent, Policy, PolicyContext, Proposal } from "../dist/index.js";

const context: PolicyContext = { episodeId: "ep", actorId: "a", observationDigest: "sha256:o", budget: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, authority: "propose-only", policyRevision: "r", seed: 3 };
function intent(id: string): Intent {
  return { intentId: id, policyId: "det", target: { kind: "candidate", uri: `cand:${id}` }, expectedRevision: "rev", effect: "land", claim: { compute: 1, workers: 1, queue: 1, latencyMs: 1 }, evidenceRefs: [], writeScopes: ["main"], readScopes: [] };
}
const deterministic: Policy<{ n: number }, Intent, number> = { id: "det", revision: "r1", propose(observation, memory) { return { intents: [intent(`i${observation.n}`)], memory: memory + observation.n, trace: [{ kind: "ran", policyId: "det", detail: "" }] }; } };
const witness: IndependenceWitness = { declaredBy: "caller:test", basis: "disjoint-scopes:main|queue", reason: "the two policies read and write disjoint scopes under one pinned basis" };
const close = (a: number, b: number): boolean => Math.abs(a - b) <= 1e-12;

test("a deterministic policy proposes Dirac mass: its own proposal has log-probability 0 and any other proposal is impossible", () => {
  const own: Proposal<Intent, number> = deterministic.propose({ n: 2 }, 5, context);
  assert.equal(diracLogProb(deterministic, { n: 2 }, 5, context, own), 0);
  const other: Proposal<Intent, number> = { ...own, memory: 8 };
  assert.equal(diracLogProb(deterministic, { n: 2 }, 5, context, other), -Infinity);
  const otherIntent: Proposal<Intent, number> = { ...own, intents: [intent("i9")] };
  assert.equal(diracLogProb(deterministic, { n: 2 }, 5, context, otherIntent), -Infinity);
  assert.equal(Math.exp(diracLogProb(deterministic, { n: 2 }, 5, context, own)), 1);
});

test("sequential sampling follows the chain rule: log pi(a,b|o) = log pi_P(a|o) + log pi_Q(b|o,a)", () => {
  for (const [p, q] of [[0.5, 0.4], [1, 0.25], [0.125, 0.125], [0.9, 1]] as const) {
    assert.ok(close(Math.exp(sequentialLogProb(Math.log(p), Math.log(q))), p * q), `${p} x ${q}`);
  }
  assert.equal(sequentialLogProb(Math.log(0.5), -Infinity), -Infinity);
  assert.equal(sequentialLogProb(0, 0), 0);
});

test("a parallel product needs an honest, caller-constructed independence witness; none is ever assumed", () => {
  assert.ok(close(Math.exp(parallelLogProb(Math.log(0.5), Math.log(0.4), witness)), 0.2));
  assert.throws(() => parallelLogProb(Math.log(0.5), Math.log(0.4), undefined as unknown as IndependenceWitness), /KERNEL_INDEPENDENCE_UNWITNESSED/);
  assert.throws(() => parallelLogProb(Math.log(0.5), Math.log(0.4), { ...witness, declaredBy: "" }), /KERNEL_INDEPENDENCE_UNWITNESSED/);
  assert.throws(() => parallelLogProb(Math.log(0.5), Math.log(0.4), { ...witness, basis: "" }), /KERNEL_INDEPENDENCE_UNWITNESSED/);
  assert.throws(() => parallelLogProb(Math.log(0.5), Math.log(0.4), { ...witness, reason: "assumed" }), /KERNEL_INDEPENDENCE_UNWITNESSED/);
});

test("a selector contributes its own conditional likelihood to the branch it chose", () => {
  assert.ok(close(Math.exp(selectorLogProb(Math.log(0.5), Math.log(0.4))), 0.2));
  assert.equal(selectorLogProb(0, Math.log(0.4)), Math.log(0.4), "a deterministic selector adds nothing");
  assert.equal(selectorLogProb(-Infinity, 0), -Infinity, "a branch the selector never chooses is impossible");
});

test("inhibition is deterministic post-sample suppression and a shared sample is copied, not resampled: neither changes the likelihood", () => {
  for (const lp of [0, Math.log(0.3), -Infinity]) {
    assert.equal(inhibitLogProb(lp), lp);
    assert.equal(sharedSampleLogProb(lp, 1), lp);
    assert.equal(sharedSampleLogProb(lp, 7), lp, "seven consumers of one sample do not multiply its probability");
  }
  assert.throws(() => sharedSampleLogProb(Math.log(0.3), 0), /KERNEL_SHARED_COPIES_INVALID/);
});

test("a log-probability is a finite number at most 0, or minus infinity for the impossible; anything else is refused", () => {
  for (const ok of [0, -0, -1e-9, Math.log(0.5), -Infinity]) assert.equal(validateLogProb(ok, "x"), ok);
  for (const bad of [Number.NaN, 0.1, Infinity, 1]) assert.throws(() => validateLogProb(bad, "x"), /KERNEL_LOGPROB_INVALID/);
  assert.throws(() => sequentialLogProb(0.1, 0), /KERNEL_LOGPROB_INVALID/);
  assert.throws(() => parallelLogProb(0, Number.NaN, witness), /KERNEL_LOGPROB_INVALID/);
  assert.throws(() => selectorLogProb(Infinity, 0), /KERNEL_LOGPROB_INVALID/);
});

test("the kernel laws are pure and deterministic: the same inputs give the same numbers and mutate nothing", () => {
  const before = JSON.stringify(witness);
  const a = parallelLogProb(Math.log(0.5), Math.log(0.4), witness);
  const b = parallelLogProb(Math.log(0.5), Math.log(0.4), witness);
  assert.equal(a, b);
  assert.equal(JSON.stringify(witness), before);
  const own = deterministic.propose({ n: 1 }, 0, context);
  assert.equal(diracLogProb(deterministic, { n: 1 }, 0, context, own), diracLogProb(deterministic, { n: 1 }, 0, context, own));
});

test("every validated argument of every kernel law is checked, not only the first one a law receives", () => {
  assert.throws(() => sequentialLogProb(0, 0.1), /KERNEL_LOGPROB_INVALID/, "the second argument of the chain rule");
  assert.throws(() => sequentialLogProb(Number.NaN, 0), /KERNEL_LOGPROB_INVALID/, "the first argument of the chain rule");
  assert.throws(() => parallelLogProb(0.1, 0, witness), /KERNEL_LOGPROB_INVALID/, "the first factor of a parallel product");
  assert.throws(() => parallelLogProb(0, 0.1, witness), /KERNEL_LOGPROB_INVALID/, "the second factor of a parallel product");
  assert.throws(() => selectorLogProb(0, 0.1), /KERNEL_LOGPROB_INVALID/, "the branch likelihood of a selector");
  assert.throws(() => selectorLogProb(0.1, 0), /KERNEL_LOGPROB_INVALID/, "the selector likelihood of a selector");
  assert.throws(() => inhibitLogProb(0.1), /KERNEL_LOGPROB_INVALID/, "inhibition validates the likelihood it passes through");
  assert.throws(() => inhibitLogProb(Number.NaN), /KERNEL_LOGPROB_INVALID/);
  assert.throws(() => sharedSampleLogProb(0.1, 1), /KERNEL_LOGPROB_INVALID/, "a shared sample validates its likelihood");
  assert.throws(() => sharedSampleLogProb(Number.NaN, 3), /KERNEL_LOGPROB_INVALID/);
});

test("every refusal word of the independence vocabulary refuses in any case and with surrounding whitespace, and an empty reason refuses", () => {
  const words = ["assumed", "assume", "assumption", "none", "n/a", "default"];
  const reasons = ["", "   ", ...words, ...words.map(word => word.toUpperCase()), "Assumed", "Assumption", "None", "N/A", "Default", "  assumed  ", "\tnone\n"];
  for (const reason of reasons) {
    assert.throws(() => parallelLogProb(Math.log(0.5), Math.log(0.4), { ...witness, reason }), /KERNEL_INDEPENDENCE_UNWITNESSED/, JSON.stringify(reason));
  }
  assert.ok(close(Math.exp(parallelLogProb(Math.log(0.5), Math.log(0.4), { ...witness, reason: "disjoint write scopes under one pinned basis" })), 0.2), "a stated reason is accepted");
});

type Memory = { readonly count: number; readonly nested: { readonly x: number; readonly y: number } };
const structured: Policy<{ n: number }, Intent, Memory> = {
  id: "structured",
  revision: "r1",
  propose(observation, memory) {
    return { intents: [intent(`s${observation.n}`)], memory: { count: memory.count + observation.n, nested: { x: 1, y: 2 } }, trace: [{ kind: "ran", policyId: "structured", detail: "a" }] };
  },
};

test("Dirac identity is canonical: the key order of memory, nested memory and intents does not matter, and the trace is not part of the identity", () => {
  const start: Memory = { count: 1, nested: { x: 0, y: 0 } };
  const own = structured.propose({ n: 2 }, start, context);
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, own), 0);
  const permutedMemory = { nested: { y: 2, x: 1 }, count: 3 } as Memory;
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, { ...own, memory: permutedMemory }), 0, "permuted memory and nested keys score as the same proposal");
  const permutedIntent = Object.fromEntries(Object.entries(own.intents[0]!).reverse()) as unknown as Intent;
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, { ...own, intents: [permutedIntent] }), 0, "permuted intent keys score as the same proposal");
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, { ...own, trace: [] }), 0, "a different trace leaves the identity unchanged");
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, { ...own, trace: [{ kind: "other", policyId: "x", detail: "b" }] }), 0, "a rewritten trace leaves the identity unchanged");
  assert.equal(diracLogProb(structured, { n: 2 }, start, context, { ...own, memory: { count: 3, nested: { x: 1, y: 9 } } }), -Infinity, "a changed nested value is still impossible");
});

test("the log-probability boundary is exact: the smallest positive double and 1e-7 refuse, and non-integer or non-finite copy counts refuse", () => {
  for (const bad of [Number.MIN_VALUE, 1e-300, 1e-7, 1e-6]) assert.throws(() => validateLogProb(bad, "x"), /KERNEL_LOGPROB_INVALID/, String(bad));
  assert.equal(validateLogProb(-Number.MIN_VALUE, "x"), -Number.MIN_VALUE);
  for (const copies of [1.5, 2.000001, 0.5, -1, 0, Number.NaN, Infinity]) assert.throws(() => sharedSampleLogProb(Math.log(0.3), copies), /KERNEL_SHARED_COPIES_INVALID/, String(copies));
  assert.equal(sharedSampleLogProb(Math.log(0.3), 2), Math.log(0.3));
});
