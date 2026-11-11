import { strict as assert } from "node:assert";
import { test } from "node:test";
import { REWRITE_CLASS_GATES, classifyRewrite, decidePromotion, gatePromotionByClass } from "../dist/index.js";
import type { PromotionCandidate, RewriteClassificationInput } from "../dist/index.js";

// Pins for behaviour the landed 3l61.7 source already has (follow-up bead mebq): inner gate-array freezes, gating input
// purity, the stochastic-copy scope (add, remove, modify of a node; never an edge or contract), and the record wording.

const exactInput = (overrides: Partial<RewriteClassificationInput> = {}): RewriteClassificationInput => ({
  candidateId: "cand:pin-1",
  declaredClass: "exact-refactor",
  changes: [{ kind: "node", id: "n7", op: "modify" }],
  stochasticTargets: [],
  equivalence: { kind: "trace", basis: "replay:pins@rev1", independentSampling: false },
  ...overrides,
});

const unwitnessedInput = (): RewriteClassificationInput => { const { equivalence: _dropped, ...rest } = exactInput(); return rest; };

const behaviorInput = (): RewriteClassificationInput => ({
  candidateId: "cand:pin-1",
  declaredClass: "behavior-changing",
  changes: [{ kind: "node", id: "n7", op: "modify" }],
  stochasticTargets: [],
});

const candidateFor = (requiredGuarantees: readonly string[]): PromotionCandidate => ({
  candidateId: "cand:pin-1",
  candidateHash: "h1",
  requiredGuarantees,
  proofs: [],
});

const codes = (refusals: readonly { code: string }[]): string[] => refusals.map(r => r.code).sort();

test("both inner gate arrays are frozen, so a consumer push on a returned requiredGates throws and the module-wide gate set cannot change", () => {
  assert.ok(Object.isFrozen(REWRITE_CLASS_GATES["exact-refactor"]), "exact-refactor gate array");
  assert.ok(Object.isFrozen(REWRITE_CLASS_GATES["behavior-changing"]), "behavior-changing gate array");
  const exact = classifyRewrite(exactInput());
  assert.equal(exact.class, "exact-refactor");
  assert.throws(() => (exact.requiredGates as string[]).push("gate:injected"), TypeError);
  const behavior = classifyRewrite(behaviorInput());
  assert.equal(behavior.class, "behavior-changing");
  assert.throws(() => (behavior.requiredGates as string[]).push("gate:injected"), TypeError);
  assert.deepEqual([...REWRITE_CLASS_GATES["exact-refactor"]], ["gate:equivalence-proof", "gate:dependency-footprint"]);
  assert.deepEqual([...REWRITE_CLASS_GATES["behavior-changing"]], ["gate:authority-contract", "gate:resource-contract", "gate:evidence-contract", "gate:comparative-fitness"]);
});

test("gating never mutates the caller's requiredGuarantees: the original array keeps its length and members, and a frozen caller array gates without throwing", () => {
  const exact = classifyRewrite(exactInput());
  const original: string[] = ["no-protected-scope-widening"];
  const gated = gatePromotionByClass(exact, candidateFor(original));
  assert.equal(gated.kind, "gated");
  if (gated.kind !== "gated") return;
  assert.equal(original.length, 1, "caller array length unchanged");
  assert.deepEqual(original, ["no-protected-scope-widening"]);
  assert.notEqual(gated.candidate.requiredGuarantees, original, "the gated candidate carries a copy, not the caller's array");
  assert.equal(gated.candidate.requiredGuarantees.length, 3);

  const frozen = Object.freeze(["no-protected-scope-widening"]);
  const gatedFrozen = gatePromotionByClass(exact, candidateFor(frozen));
  assert.equal(gatedFrozen.kind, "gated");
  if (gatedFrozen.kind !== "gated") return;
  assert.deepEqual([...gatedFrozen.candidate.requiredGuarantees], ["no-protected-scope-widening", "gate:equivalence-proof", "gate:dependency-footprint"]);
  assert.equal(frozen.length, 1);
  assert.equal(decidePromotion(gatedFrozen.candidate).decision, "refuse", "gates with no proof still refuse promotion");
});

test("a changed stochastic node refuses REWRITE_CLASS_STOCHASTIC_COPY under a non-independent witness whether it is added, removed or modified", () => {
  for (const op of ["add", "remove", "modify"] as const) {
    const out = classifyRewrite(exactInput({ stochasticTargets: ["n7"], changes: [{ kind: "node", id: "n7", op }] }));
    assert.equal(out.class, "unclassified", op);
    assert.deepEqual(codes(out.refusals), ["REWRITE_CLASS_STOCHASTIC_COPY"], op);
    assert.equal(out.refusals[0]!.subject, "n7", op);
  }
});

test("the stochastic-copy scope is node changes only: an edge or contract whose id equals a stochastic node id is not a sampling change", () => {
  const edge = classifyRewrite(exactInput({ stochasticTargets: ["n7"], changes: [{ kind: "edge", id: "n7", op: "modify" }] }));
  assert.equal(edge.class, "exact-refactor");
  assert.deepEqual(edge.refusals, []);
  const edgeAdded = classifyRewrite(exactInput({ stochasticTargets: ["n7"], changes: [{ kind: "edge", id: "n7", op: "add" }] }));
  assert.equal(edgeAdded.class, "exact-refactor");
  const mixed = classifyRewrite(exactInput({ stochasticTargets: ["n7"], changes: [{ kind: "edge", id: "n7", op: "remove" }, { kind: "node", id: "n9", op: "add" }] }));
  assert.equal(mixed.class, "exact-refactor", "a stochastic id on an edge plus an unrelated node add refuses nothing");
});

test("each changed stochastic node yields its own refusal, and only the stochastic ones", () => {
  const out = classifyRewrite(exactInput({
    stochasticTargets: ["n7", "n8"],
    changes: [{ kind: "node", id: "n7", op: "add" }, { kind: "node", id: "n8", op: "remove" }, { kind: "node", id: "n9", op: "modify" }, { kind: "edge", id: "n8", op: "modify" }],
  }));
  assert.deepEqual(out.refusals.map(r => [r.code, r.subject]), [["REWRITE_CLASS_STOCHASTIC_COPY", "n7"], ["REWRITE_CLASS_STOCHASTIC_COPY", "n8"]]);
});

test("the classification record carries the schema word mw.rewrite-classification.v0 on every outcome: unclassified, exact and behavior", () => {
  const unclassified = classifyRewrite(unwitnessedInput());
  assert.equal(unclassified.class, "unclassified");
  assert.equal(unclassified.schema, "mw.rewrite-classification.v0");
  const unknown = classifyRewrite(exactInput({ declaredClass: "cosmetic" as unknown as RewriteClassificationInput["declaredClass"] }));
  assert.equal(unknown.schema, "mw.rewrite-classification.v0");
  assert.equal(classifyRewrite(exactInput()).schema, "mw.rewrite-classification.v0");
  assert.equal(classifyRewrite(behaviorInput()).schema, "mw.rewrite-classification.v0");
});

test("the contract-change detail names the operation: added for add, removed for remove, modified for modify", () => {
  const wording: Record<"add" | "remove" | "modify", string> = { add: "added", remove: "removed", modify: "modified" };
  for (const op of ["add", "remove", "modify"] as const) {
    const out = classifyRewrite(exactInput({ changes: [{ kind: "contract", id: "c2", op }] }));
    assert.deepEqual(codes(out.refusals), ["REWRITE_CLASS_CONTRACT_CHANGED"], op);
    const detail = out.refusals[0]!.detail;
    assert.ok(detail.endsWith(`c2 is ${wording[op]}`), `${op}: ${detail}`);
    for (const other of Object.values(wording)) if (other !== wording[op]) assert.ok(!detail.includes(other), `${op} detail must not say ${other}: ${detail}`);
  }
});
