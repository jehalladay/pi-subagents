import test from "node:test";
import assert from "node:assert/strict";
import { reviewCandidate } from "../dist/index.js";
import type { Candidate, CandidateReviewServices, DevelopmentRequest, ReviewResult, ReviewedOutcome, SubjectBasis, VerificationResult } from "../dist/index.js";

const basis: SubjectBasis = { workspaceId: "repo", revision: "base" };
const proposed: Candidate = { parentBasis: basis, basis: { workspaceId: "repo", revision: "candidate" } };
const pass: VerificationResult = { basis: proposed.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-1" } };
function callbacks(changes: Partial<CandidateReviewServices> = {}, seen: string[] = []): CandidateReviewServices {
 return {
  plan: async () => { seen.push("plan"); return { basis, task: "Fix parser", candidates: [proposed] }; },
  choose: async plan => { seen.push("choose"); const first = plan.candidates[0]; if (!first) throw Error("empty plan"); return first; },
  review: async () => { seen.push("review"); return { basis: proposed.basis, verdict: "approved", evidence: { system: "reviewer", kind: "review", id: "rev-1" } }; },
  verify: async () => { seen.push("verify"); return pass; },
  ...changes,
 };
}
function outcomeOf<K extends ReviewedOutcome["kind"]>(out: ReviewedOutcome, kind: K): Extract<ReviewedOutcome, { kind: K }> {
 assert.equal(out.kind, kind);
 return out as Extract<ReviewedOutcome, { kind: K }>;
}
const request: DevelopmentRequest = { task: "Fix parser", workspaceId: "repo", baseRevision: "base" };
test("one planned candidate gets attributable approval then native verification", async () => {
 const seen: string[] = []; const out = outcomeOf(await reviewCandidate(callbacks({}, seen), request), "reviewed_candidate");
 assert.equal(out.candidate.basis.revision, "candidate");
 assert.deepEqual(seen, ["plan", "choose", "review", "verify"]);
});
test("rejected review cannot reach verification", async () => {
 let verifies = 0; const out = await reviewCandidate(callbacks({ review: async () => ({ basis: proposed.basis, verdict: "rejected", evidence: { system: "reviewer", kind: "review", id: "rev-2" } }), verify: async () => { verifies++; return pass; } }), request);
 assert.equal(out.kind, "review_rejected"); assert.equal(verifies, 0);
});
test("review basis mismatch or missing evidence cannot count as approval", async () => {
 const reviews: ReviewResult[] = [{ basis, verdict: "approved", evidence: { system: "reviewer", kind: "review", id: "r" } }, { basis: proposed.basis, verdict: "approved" }];
 for (const v of reviews) {
  let verifies = 0; const out = await reviewCandidate(callbacks({ review: async () => v, verify: async () => { verifies++; return pass; } }), request);
  assert.equal(out.kind, "indeterminate"); assert.equal(verifies, 0);
 }
});
test("empty candidate list never calls chooser/reviewer", async () => {
 let calls = 0; const out = await reviewCandidate(callbacks({ plan: async () => ({ basis, task: "Fix parser", candidates: [] }), choose: async () => { calls++; return proposed; }, review: async () => { calls++; throw Error("unexpected"); } }), request);
 assert.equal(out.kind, "needs_candidates"); assert.equal(calls, 0);
});
test("unplanned candidate selection cannot be verified", async () => {
 let reviews = 0; const rogue: Candidate = { parentBasis: basis, basis: { workspaceId: "repo", revision: "rogue" } };
 const out = await reviewCandidate(callbacks({ choose: async () => rogue, review: async () => { reviews++; throw Error("unexpected"); } }), request);
 assert.equal(out.kind, "indeterminate"); assert.equal(reviews, 0);
});
test("reviewer callback errors remain transport uncertainty, not rejection", async () => {
 const error = Error("review stream lost");
 await assert.rejects(() => reviewCandidate(callbacks({ review: async () => { throw error; } }), request), (e: unknown) => e === error);
});
test("failed verification after approval stays a domain failure", async () => {
 const out = await reviewCandidate(callbacks({ verify: async () => ({ ...pass, verdict: "failed" }) }), request);
 assert.equal(out.kind, "verification_failed");
});
test("unknown review never promotes candidate or calls Forge", async () => {
 let gates = 0; const out = await reviewCandidate(callbacks({ review: async () => ({ basis: proposed.basis, verdict: "unknown", evidence: { system: "reviewer", kind: "review", id: "r" } }), verify: async () => { gates++; return pass; } }), request);
 assert.equal(out.kind, "indeterminate"); assert.equal(gates, 0);
});
test("stale plan basis refuses candidate selection", async () => {
 let selected = 0; const out = await reviewCandidate(callbacks({ plan: async () => ({ basis: { workspaceId: "repo", revision: "stale" }, task: "Fix parser", candidates: [proposed] }), choose: async () => { selected++; return proposed; } }), request);
 assert.equal(out.kind, "indeterminate"); assert.equal(selected, 0);
});
test("verification of a stale revision or another workspace is never accepted for an approved candidate", async () => {
 const stale: readonly [string, SubjectBasis][] = [
  ["stale revision (the base the candidate was cut from)", basis],
  ["wrong workspace at the candidate revision", { workspaceId: "other-repo", revision: "candidate" }],
 ];
 for (const [label, wrong] of stale) for (const verdict of ["passed", "failed"] as const) {
  const evidence = { system: "forge", kind: "operation", id: "op-stale" };
  const seen: string[] = [];
  const out = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { seen.push("verify"); return { basis: wrong, verdict, evidence }; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "VERIFICATION_BASIS_MISMATCH", label + " / " + verdict);
  assert.deepEqual(out.evidence, evidence, label + " / " + verdict);
  assert.deepEqual(seen, ["plan", "choose", "review", "verify"], label + " / " + verdict);
 }
});

const reviewEvidence = { system: "reviewer", kind: "review", id: "rev-9" };
const forgeEvidence = { system: "forge", kind: "operation", id: "op-9" };
test("a plan whose basis or task drifted from the request is PLAN_BASIS_MISMATCH and never reaches the chooser", async () => {
 const plans: readonly [string, Awaited<ReturnType<CandidateReviewServices["plan"]>>][] = [
  ["stale revision", { basis: { workspaceId: "repo", revision: "stale" }, task: "Fix parser", candidates: [proposed] }],
  ["other workspace", { basis: { workspaceId: "other-repo", revision: "base" }, task: "Fix parser", candidates: [proposed] }],
  ["same basis, another task", { basis, task: "Fix lexer", candidates: [proposed] }],
  ["stale basis and no candidates (basis check precedes the empty check)", { basis: { workspaceId: "repo", revision: "stale" }, task: "Fix parser", candidates: [] }],
 ];
 for (const [label, plan] of plans) {
  const seen: string[] = [];
  const out = outcomeOf(await reviewCandidate(callbacks({ plan: async () => { seen.push("plan"); return plan; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "PLAN_BASIS_MISMATCH", label);
  assert.equal(out.evidence, undefined, label);
  assert.deepEqual(seen, ["plan"], label);
 }
});
test("a matching plan with no candidates is needs_candidates with reason NO_PLANNED_CANDIDATES after the plan call alone", async () => {
 const seen: string[] = [];
 const out = outcomeOf(await reviewCandidate(callbacks({ plan: async () => { seen.push("plan"); return { basis, task: "Fix parser", candidates: [] }; } }, seen), request), "needs_candidates");
 assert.equal(out.reason, "NO_PLANNED_CANDIDATES");
 assert.deepEqual(seen, ["plan"]);
});
test("a review at another basis or without referenced evidence is REVIEW_EVIDENCE_UNESTABLISHED, carrying only the evidence it was given", async () => {
 const reviews: readonly [string, ReviewResult, boolean][] = [
  ["approved at the base revision", { basis, verdict: "approved", evidence: reviewEvidence }, true],
  ["approved at the candidate with no evidence", { basis: proposed.basis, verdict: "approved" }, false],
  ["approved at the candidate with a blank evidence id", { basis: proposed.basis, verdict: "approved", evidence: { system: "reviewer", kind: "review", id: "  " } }, true],
  ["approved at the candidate with a blank evidence kind", { basis: proposed.basis, verdict: "approved", evidence: { system: "reviewer", kind: " ", id: "rev-kind" } }, true],
  ["approved at the candidate with a blank evidence system", { basis: proposed.basis, verdict: "approved", evidence: { system: "", kind: "review", id: "rev-system" } }, true],
  ["rejected at the wrong workspace", { basis: { workspaceId: "other-repo", revision: "candidate" }, verdict: "rejected", evidence: reviewEvidence }, true],
 ];
 for (const [label, review, carries] of reviews) {
  const seen: string[] = [];
  const out = outcomeOf(await reviewCandidate(callbacks({ review: async () => { seen.push("review"); return review; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "REVIEW_EVIDENCE_UNESTABLISHED", label);
  if (carries) assert.deepEqual(out.evidence, review.evidence, label); else assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, ["plan", "choose", "review"], label);
 }
});
test("an evidenced review whose verdict is neither approved nor rejected is REVIEW_UNKNOWN with its evidence and never verifies", async () => {
 for (const verdict of ["unknown", "approve"] as const) {
  const seen: string[] = [];
  const review: ReviewResult = { basis: proposed.basis, verdict: verdict as ReviewResult["verdict"], evidence: reviewEvidence, reason: "REVIEWER_TIMEOUT" };
  const out = outcomeOf(await reviewCandidate(callbacks({ review: async () => { seen.push("review"); return review; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "REVIEW_UNKNOWN", verdict);
  assert.deepEqual(out.evidence, reviewEvidence, verdict);
  assert.deepEqual(seen, ["plan", "choose", "review"], verdict);
 }
});
test("a verification at the candidate basis that neither passes with referenced evidence nor fails is VERIFICATION_UNESTABLISHED", async () => {
 const verifications: readonly [string, VerificationResult, boolean][] = [
  ["unknown verdict with evidence", { basis: proposed.basis, verdict: "unknown", evidence: forgeEvidence }, true],
  ["passed without evidence", { basis: proposed.basis, verdict: "passed" }, false],
  ["passed with a blank evidence system", { basis: proposed.basis, verdict: "passed", evidence: { system: "", kind: "operation", id: "op-blank" } }, true],
  ["passed with a blank evidence kind", { basis: proposed.basis, verdict: "passed", evidence: { system: "forge", kind: "", id: "op-kind" } }, true],
  ["passed with a blank evidence id", { basis: proposed.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: " " } }, true],
  ["foreign verdict string", { basis: proposed.basis, verdict: "pass" as VerificationResult["verdict"], evidence: forgeEvidence }, true],
 ];
 for (const [label, verification, carries] of verifications) {
  const seen: string[] = [];
  const out = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { seen.push("verify"); return verification; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "VERIFICATION_UNESTABLISHED", label);
  if (carries) assert.deepEqual(out.evidence, verification.evidence, label); else assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, ["plan", "choose", "review", "verify"], label);
 }
});

test("a request field that is blank or not a string is INVALID_REVIEW_REQUEST naming the field, before the planner runs", async () => {
 const bad: ReadonlyArray<readonly [string, DevelopmentRequest]> = [
  ["task", { ...request, task: "  " }],
  ["workspaceId", { ...request, workspaceId: "" }],
  ["baseRevision", { ...request, baseRevision: "\n" }],
  ["task", { ...request, task: 42 as unknown as string }],
 ];
 for (const [name, req] of bad) {
  const seen: string[] = [];
  await assert.rejects(() => reviewCandidate(callbacks({}, seen), req), (e: unknown) => e instanceof TypeError && e.message === "INVALID_REVIEW_REQUEST: " + name, name);
  assert.deepEqual(seen, [], name);
 }
});

test("a chosen candidate outside the plan or the request basis is CANDIDATE_NOT_IN_PLAN with no evidence, reviewed and verified by nobody", async () => {
 const stale: SubjectBasis = { workspaceId: "repo", revision: "stale" };
 const otherWorkspace: Candidate = { parentBasis: basis, basis: { workspaceId: "other-repo", revision: "candidate" } };
 const staleParent: Candidate = { parentBasis: stale, basis: proposed.basis };
 const atBase: Candidate = { parentBasis: basis, basis: basis };
 const cases: ReadonlyArray<readonly [string, readonly Candidate[], Candidate]> = [
  ["cut from a stale parent yet listed and chosen as listed", [staleParent], staleParent],
  ["in another workspace yet listed and chosen as listed", [otherWorkspace], otherWorkspace],
  ["at the base revision yet listed and chosen as listed", [atBase], atBase],
  ["proposed basis listed only under a stale parent while the chooser returns proposed", [staleParent], proposed],
 ];
 for (const [label, candidates, chosen] of cases) {
  const seen: string[] = [];
  const out = outcomeOf(await reviewCandidate(callbacks({ plan: async () => { seen.push("plan"); return { basis, task: "Fix parser", candidates }; }, choose: async () => { seen.push("choose"); return chosen; } }, seen), request), "indeterminate");
  assert.equal(out.reason, "CANDIDATE_NOT_IN_PLAN", label);
  assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, ["plan", "choose"], label);
 }
});

test("a chosen candidate whose parent is the base revision of another workspace is CANDIDATE_NOT_IN_PLAN with no evidence, reviewed and verified by nobody", async () => {
 const foreignParent: Candidate = { parentBasis: { workspaceId: "other-repo", revision: basis.revision }, basis: proposed.basis };
 const seen: string[] = [];
 const out = await reviewCandidate(callbacks({ plan: async () => { seen.push("plan"); return { basis, task: "Fix parser", candidates: [foreignParent] }; }, choose: async () => { seen.push("choose"); return foreignParent; } }, seen), request);
 assert.deepEqual(out, { kind: "indeterminate", reason: "CANDIDATE_NOT_IN_PLAN" }, "review: parent at the base revision of another workspace");
 assert.deepEqual(seen, ["plan", "choose"], "review: calls");
});

test("an approval or a passed verification whose evidence field is not a string is UNESTABLISHED carrying that evidence, never a thrown TypeError", async () => {
 const odd: readonly [string, unknown][] = [["a numeric id", 7], ["a missing id", undefined]];
 for (const [label, id] of odd) {
  const reviewed: ReviewResult = { basis: proposed.basis, verdict: "approved", evidence: { system: "reviewer", kind: "review", id: id as string } };
  const reviewSeen: string[] = [];
  const r = outcomeOf(await reviewCandidate(callbacks({ review: async () => { reviewSeen.push("review"); return reviewed; } }, reviewSeen), request), "indeterminate");
  assert.equal(r.reason, "REVIEW_EVIDENCE_UNESTABLISHED", "review: " + label);
  assert.deepEqual(r.evidence, reviewed.evidence, "review: " + label);
  assert.deepEqual(reviewSeen, ["plan", "choose", "review"], "review calls: " + label);
  const verified: VerificationResult = { basis: proposed.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: id as string } };
  const verifySeen: string[] = [];
  const v = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { verifySeen.push("verify"); return verified; } }, verifySeen), request), "indeterminate");
  assert.equal(v.reason, "VERIFICATION_UNESTABLISHED", "verify: " + label);
  assert.deepEqual(v.evidence, verified.evidence, "verify: " + label);
  assert.deepEqual(verifySeen, ["plan", "choose", "review", "verify"], "verify calls: " + label);
 }
});

test("an approval or a passed verification whose evidence system or kind is not a string is UNESTABLISHED carrying that evidence, never a thrown TypeError", async () => {
 const odd: readonly [string, "system" | "kind", unknown][] = [["a numeric system", "system", 7], ["a missing kind", "kind", undefined]];
 for (const [label, field, value] of odd) {
  const reviewed: ReviewResult = { basis: proposed.basis, verdict: "approved", evidence: { system: "reviewer", kind: "review", id: "rev-1", [field]: value } as unknown as NonNullable<ReviewResult["evidence"]> };
  const reviewSeen: string[] = [];
  const r = outcomeOf(await reviewCandidate(callbacks({ review: async () => { reviewSeen.push("review"); return reviewed; } }, reviewSeen), request), "indeterminate");
  assert.equal(r.reason, "REVIEW_EVIDENCE_UNESTABLISHED", "review: " + label);
  assert.deepEqual(r.evidence, reviewed.evidence, "review: " + label);
  assert.deepEqual(reviewSeen, ["plan", "choose", "review"], "review calls: " + label);
  const verified: VerificationResult = { basis: proposed.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-1", [field]: value } as unknown as NonNullable<VerificationResult["evidence"]> };
  const verifySeen: string[] = [];
  const v = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { verifySeen.push("verify"); return verified; } }, verifySeen), request), "indeterminate");
  assert.equal(v.reason, "VERIFICATION_UNESTABLISHED", "verify: " + label);
  assert.deepEqual(v.evidence, verified.evidence, "verify: " + label);
  assert.deepEqual(verifySeen, ["plan", "choose", "review", "verify"], "verify calls: " + label);
 }
});
test("a null evidence from the reviewer or the verifier answers UNESTABLISHED with no evidence key and never a thrown TypeError", async () => {
 const reviewed = { basis: proposed.basis, verdict: "approved", evidence: null } as unknown as ReviewResult;
 const reviewSeen: string[] = [];
 const r = outcomeOf(await reviewCandidate(callbacks({ review: async () => { reviewSeen.push("review"); return reviewed; } }, reviewSeen), request), "indeterminate");
 assert.equal(r.reason, "REVIEW_EVIDENCE_UNESTABLISHED");
 assert.equal("evidence" in r, false);
 assert.deepEqual(reviewSeen, ["plan", "choose", "review"]);
 const verified = { basis: proposed.basis, verdict: "passed", evidence: null } as unknown as VerificationResult;
 const verifySeen: string[] = [];
 const v = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { verifySeen.push("verify"); return verified; } }, verifySeen), request), "indeterminate");
 assert.equal(v.reason, "VERIFICATION_UNESTABLISHED");
 assert.equal("evidence" in v, false);
 assert.deepEqual(verifySeen, ["plan", "choose", "review", "verify"]);
});
test("a null verification evidence at a foreign basis answers VERIFICATION_BASIS_MISMATCH with no evidence key", async () => {
 const verified = { basis, verdict: "passed", evidence: null } as unknown as VerificationResult;
 const seen: string[] = [];
 const out = outcomeOf(await reviewCandidate(callbacks({ verify: async () => { seen.push("verify"); return verified; } }, seen), request), "indeterminate");
 assert.equal(out.reason, "VERIFICATION_BASIS_MISMATCH");
 assert.equal("evidence" in out, false);
 assert.deepEqual(seen, ["plan", "choose", "review", "verify"]);
});
