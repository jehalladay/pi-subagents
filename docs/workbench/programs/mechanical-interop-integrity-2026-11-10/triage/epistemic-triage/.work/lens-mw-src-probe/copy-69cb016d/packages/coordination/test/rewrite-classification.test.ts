import { strict as assert } from "node:assert";
import { test } from "node:test";
import { REWRITE_CLASS_GATES, classifyRewrite, decidePromotion, gatePromotionByClass } from "../dist/index.js";
import type { GuaranteeProof, PromotionCandidate, RewriteClassificationInput } from "../dist/index.js";

const exactInput = (overrides: Partial<RewriteClassificationInput> = {}): RewriteClassificationInput => ({
  candidateId: "cand:exact-1",
  declaredClass: "exact-refactor",
  changes: [
    { kind: "node", id: "n7", op: "modify" },
    { kind: "edge", id: "e3", op: "modify" },
  ],
  stochasticTargets: [],
  equivalence: { kind: "trace", basis: "replay:fixture-set-12@rev9", independentSampling: false },
  ...overrides,
});

const unwitnessedInput = (): RewriteClassificationInput => { const { equivalence: _dropped, ...rest } = exactInput(); return rest; };

const behaviorInput = (overrides: Partial<RewriteClassificationInput> = {}): RewriteClassificationInput => ({
  candidateId: "cand:adapt-1",
  declaredClass: "behavior-changing",
  changes: [{ kind: "node", id: "n7", op: "modify" }, { kind: "contract", id: "c2", op: "modify" }],
  stochasticTargets: ["n7"],
  ...overrides,
});

const proofsFor = (gates: readonly string[], hash: string, omit: string[] = []): GuaranteeProof[] =>
  gates.filter(g => !omit.includes(g)).map(g => ({ guaranteeId: g, status: "proven" as const, proofRef: `proof:${g}`, provedAgainst: hash }));

const promotionCandidate = (overrides: Partial<PromotionCandidate> = {}): PromotionCandidate => ({
  candidateId: "cand:exact-1",
  candidateHash: "h1",
  requiredGuarantees: ["no-protected-scope-widening"],
  proofs: [{ guaranteeId: "no-protected-scope-widening", status: "proven", proofRef: "proof:scope", provedAgainst: "h1" }],
  ...overrides,
});

const codes = (refusals: readonly { code: string }[]): string[] => refusals.map(r => r.code).sort();

test("the two classes carry distinct gate sets: an exact refactor proves equivalence and its complete dependency footprint; a behavior change proves authority, resource and evidence contracts and comparative fitness; the sets share nothing", () => {
  assert.deepEqual([...REWRITE_CLASS_GATES["exact-refactor"]], ["gate:equivalence-proof", "gate:dependency-footprint"]);
  assert.deepEqual([...REWRITE_CLASS_GATES["behavior-changing"]], ["gate:authority-contract", "gate:resource-contract", "gate:evidence-contract", "gate:comparative-fitness"]);
  const shared = REWRITE_CLASS_GATES["exact-refactor"].filter(g => REWRITE_CLASS_GATES["behavior-changing"].includes(g));
  assert.deepEqual(shared, []);
  assert.ok(Object.isFrozen(REWRITE_CLASS_GATES));
});

test("a declared exact refactor with a trace or contract equivalence witness classifies exact and requires exactly the exact gates", () => {
  const trace = classifyRewrite(exactInput());
  assert.equal(trace.schema, "mw.rewrite-classification.v0");
  assert.equal(trace.candidateId, "cand:exact-1");
  assert.deepEqual(trace.refusals, []);
  assert.equal(trace.class, "exact-refactor");
  assert.deepEqual([...trace.requiredGates], [...REWRITE_CLASS_GATES["exact-refactor"]]);
  const contract = classifyRewrite(exactInput({ equivalence: { kind: "contract", basis: "contract:c2@rev9", independentSampling: false } }));
  assert.equal(contract.class, "exact-refactor");
});

test("an exact claim without a witness, or with port equality alone, is not an exact refactor", () => {
  const unwitnessed = classifyRewrite(unwitnessedInput());
  assert.equal(unwitnessed.class, "unclassified");
  assert.deepEqual(codes(unwitnessed.refusals), ["REWRITE_CLASS_EXACT_UNWITNESSED"]);
  assert.deepEqual(unwitnessed.requiredGates, []);
  const ports = classifyRewrite(exactInput({ equivalence: { kind: "port-equality", basis: "ports:n7", independentSampling: false } }));
  assert.equal(ports.class, "unclassified");
  assert.deepEqual(codes(ports.refusals), ["REWRITE_CLASS_WITNESS_INSUFFICIENT"]);
});

test("touching a stochastic node makes an exact claim depend on independent sampling: a copied random output is not an equivalence", () => {
  const copied = classifyRewrite(exactInput({ stochasticTargets: ["n7"] }));
  assert.equal(copied.class, "unclassified");
  assert.deepEqual(codes(copied.refusals), ["REWRITE_CLASS_STOCHASTIC_COPY"]);
  assert.equal(copied.refusals[0]!.subject, "n7");
  const independent = classifyRewrite(exactInput({ stochasticTargets: ["n7"], equivalence: { kind: "trace", basis: "replay:seeded@rev9", independentSampling: true } }));
  assert.equal(independent.class, "exact-refactor");
  const untouched = classifyRewrite(exactInput({ stochasticTargets: ["n9"] }));
  assert.equal(untouched.class, "exact-refactor", "a stochastic node the rewrite does not change needs no sampling witness");
});

test("an exact refactor preserves declared contracts: a contract modification or removal under an exact claim is refused, a contract addition is not a refactor either", () => {
  for (const op of ["modify", "remove", "add"] as const) {
    const out = classifyRewrite(exactInput({ changes: [{ kind: "node", id: "n7", op: "modify" }, { kind: "contract", id: "c2", op }] }));
    assert.equal(out.class, "unclassified", op);
    assert.deepEqual(codes(out.refusals), ["REWRITE_CLASS_CONTRACT_CHANGED"], op);
    assert.equal(out.refusals[0]!.subject, "c2");
  }
});

test("a declared behavior change classifies as such without an equivalence witness and requires exactly the behavior gates; an equivalence witness does not downgrade it", () => {
  const plain = classifyRewrite(behaviorInput());
  assert.equal(plain.class, "behavior-changing");
  assert.deepEqual(plain.refusals, []);
  assert.deepEqual([...plain.requiredGates], [...REWRITE_CLASS_GATES["behavior-changing"]]);
  const witnessed = classifyRewrite(behaviorInput({ equivalence: { kind: "trace", basis: "replay:x", independentSampling: true } }));
  assert.equal(witnessed.class, "behavior-changing");
  assert.deepEqual(witnessed.requiredGates, plain.requiredGates);
});

test("an unknown declared class is refused rather than defaulted", () => {
  const out = classifyRewrite(exactInput({ declaredClass: "cosmetic" as unknown as RewriteClassificationInput["declaredClass"] }));
  assert.equal(out.class, "unclassified");
  assert.deepEqual(codes(out.refusals), ["REWRITE_CLASS_UNKNOWN"]);
});

test("acceptance: promotion refuses a missing class gate — the gated candidate carries the class gates as required guarantees and decidePromotion names the one without a proof", () => {
  const exact = classifyRewrite(exactInput());
  const gated = gatePromotionByClass(exact, promotionCandidate());
  assert.equal(gated.kind, "gated");
  if (gated.kind !== "gated") return;
  assert.deepEqual([...gated.candidate.requiredGuarantees], ["no-protected-scope-widening", "gate:equivalence-proof", "gate:dependency-footprint"]);
  const missingFootprint = decidePromotion({ ...gated.candidate, proofs: [...gated.candidate.proofs, ...proofsFor(exact.requiredGates, "h1", ["gate:dependency-footprint"])] });
  assert.equal(missingFootprint.decision, "refuse");
  assert.deepEqual(missingFootprint.refusals.map(r => [r.code, r.guaranteeId]), [["PROMOTION_GUARANTEE_MISSING", "gate:dependency-footprint"]]);
  const complete = decidePromotion({ ...gated.candidate, proofs: [...gated.candidate.proofs, ...proofsFor(exact.requiredGates, "h1")] });
  assert.equal(complete.decision, "promote");

  const behavior = classifyRewrite(behaviorInput());
  const gatedBehavior = gatePromotionByClass(behavior, promotionCandidate({ candidateId: "cand:adapt-1", candidateHash: "h2", proofs: [{ guaranteeId: "no-protected-scope-widening", status: "proven", proofRef: "proof:scope", provedAgainst: "h2" }] }));
  assert.equal(gatedBehavior.kind, "gated");
  if (gatedBehavior.kind !== "gated") return;
  const noFitness = decidePromotion({ ...gatedBehavior.candidate, proofs: [...gatedBehavior.candidate.proofs, ...proofsFor(behavior.requiredGates, "h2", ["gate:comparative-fitness"])] });
  assert.equal(noFitness.decision, "refuse");
  assert.deepEqual(noFitness.refusals.map(r => r.guaranteeId), ["gate:comparative-fitness"]);
  const exactProofsOnBehavior = decidePromotion({ ...gatedBehavior.candidate, proofs: [...gatedBehavior.candidate.proofs, ...proofsFor(exact.requiredGates, "h2")] });
  assert.equal(exactProofsOnBehavior.decision, "refuse", "proofs of the other class's gates do not satisfy this class");
  assert.equal(exactProofsOnBehavior.refusals.length, 4);
});

test("gating refuses an unclassified rewrite and a candidate whose id differs from the classified one; it never drops the candidate's own guarantees", () => {
  const unclassified = classifyRewrite(unwitnessedInput());
  const refused = gatePromotionByClass(unclassified, promotionCandidate());
  assert.equal(refused.kind, "refused");
  if (refused.kind !== "refused") return;
  assert.deepEqual(codes(refused.refusals), ["REWRITE_CLASS_EXACT_UNWITNESSED", "REWRITE_CLASS_UNRESOLVED"]);
  const other = gatePromotionByClass(classifyRewrite(exactInput()), promotionCandidate({ candidateId: "cand:other" }));
  assert.equal(other.kind, "refused");
  if (other.kind !== "refused") return;
  assert.deepEqual(codes(other.refusals), ["REWRITE_CLASS_CANDIDATE_MISMATCH"]);
  const gated = gatePromotionByClass(classifyRewrite(exactInput()), promotionCandidate({ requiredGuarantees: ["a", "gate:equivalence-proof"] }));
  assert.equal(gated.kind, "gated");
  if (gated.kind !== "gated") return;
  assert.deepEqual([...gated.candidate.requiredGuarantees], ["a", "gate:equivalence-proof", "gate:dependency-footprint"], "existing guarantees kept, duplicates not repeated");
});

test("the classification is a pure record: every string leaf is an input leaf, a declared code, a gate name or the schema", () => {
  const input = exactInput({ stochasticTargets: ["n7"], changes: [{ kind: "node", id: "n7", op: "modify" }, { kind: "contract", id: "c2", op: "modify" }] });
  const out = classifyRewrite(input);
  const known = new Set<string>([...stringLeaves(input), out.schema, ...out.refusals.map(r => r.code), ...Object.values(REWRITE_CLASS_GATES).flat(), "exact-refactor", "behavior-changing", "unclassified"]);
  for (const leaf of stringLeaves({ ...out, refusals: out.refusals.map(({ detail: _d, ...rest }) => rest) })) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
  for (const refusal of out.refusals) assert.ok(refusal.detail.includes(refusal.subject), refusal.detail);
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
