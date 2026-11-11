import test from "node:test";
import assert from "node:assert/strict";
import { repairRejectedCandidate } from "../dist/index.js";
import type { Candidate, RepairOutcome, RepairServices, ReviewResult, SubjectBasis, VerificationResult } from "../dist/index.js";
const base: SubjectBasis = { workspaceId: "repo", revision: "base" };
const rejected: Candidate = { parentBasis: base, basis: { workspaceId: "repo", revision: "candidate" } };
const repair: Candidate = { parentBasis: rejected.basis, basis: { workspaceId: "repo", revision: "repaired" } };
const review: ReviewResult = { basis: rejected.basis, verdict: "rejected", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "review-1" } };
const approved: ReviewResult = { basis: repair.basis, verdict: "approved", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "review-2" } };
const passed: VerificationResult = { basis: repair.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "op-2" } };
function args(actions: string[] = [], patch: Partial<RepairServices> = {}): RepairServices {
 return {
  rejectedCandidate: rejected, rejectedReview: review,
  produceRepair: async () => { actions.push("repair"); return repair; },
  reReview: async () => { actions.push("review"); return approved; },
  verify: async () => { actions.push("verify"); return passed; },
  ...patch,
 };
}
function outcomeOf<K extends RepairOutcome["kind"]>(out: RepairOutcome, kind: K): Extract<RepairOutcome, { kind: K }> {
 assert.equal(out.kind, kind);
 return out as Extract<RepairOutcome, { kind: K }>;
}
test("explicit repair candidate is re-reviewed then verified at its own basis", async () => {
 const seen: string[] = []; const out = outcomeOf(await repairRejectedCandidate(args(seen)), "repaired_candidate");
 assert.equal(out.candidate.basis.revision, "repaired");
 assert.deepEqual(seen, ["repair", "review", "verify"]);
});
test("an unestablished or approved original review cannot initiate repair", async () => {
 const originals: ReviewResult[] = [{ ...review, verdict: "unknown" }, { ...review, verdict: "approved" }, { basis: review.basis, verdict: "rejected" }];
 for (const old of originals) {
  let called = 0; const out = await repairRejectedCandidate(args([], { rejectedReview: old, produceRepair: async () => { called++; return repair; } }));
  assert.equal(out.kind, "indeterminate"); assert.equal(called, 0);
 }
});
test("repair cannot reuse original revision or switch workspace", async () => {
 const candidates: Candidate[] = [{ parentBasis: rejected.basis, basis: rejected.basis }, { parentBasis: rejected.basis, basis: { workspaceId: "other", revision: "repaired" } }];
 for (const candidate of candidates) {
  let reviews = 0; const out = await repairRejectedCandidate(args([], { produceRepair: async () => candidate, reReview: async () => { reviews++; return approved; } }));
  assert.equal(out.kind, "indeterminate"); assert.equal(reviews, 0);
 }
});
test("negative re-review never reaches Forge or loops repair", async () => {
 let checks = 0, repairs = 0; const out = await repairRejectedCandidate(args([], { produceRepair: async () => { repairs++; return repair; }, reReview: async () => ({ ...approved, verdict: "rejected" }), verify: async () => { checks++; return passed; } }));
 assert.equal(out.kind, "review_rejected"); assert.equal(repairs, 1); assert.equal(checks, 0);
});
test("uncertain repair effect propagates rather than silently retrying", async () => {
 let attempts = 0; const err = Error("agent exited after files changed");
 await assert.rejects(() => repairRejectedCandidate(args([], { produceRepair: async () => { attempts++; throw err; } })), (e: unknown) => e === err);
 assert.equal(attempts, 1);
});
test("a missing second review ref never verifies repaired candidate", async () => {
 let gates = 0; const out = await repairRejectedCandidate(args([], { reReview: async () => ({ basis: repair.basis, verdict: "approved" }), verify: async () => { gates++; return passed; } }));
 assert.equal(out.kind, "indeterminate"); assert.equal(gates, 0);
});
test("Forge PASS on stale repair basis remains indeterminate", async () => {
 const out = await repairRejectedCandidate(args([], { verify: async () => ({ ...passed, basis: rejected.basis }) }));
 assert.equal(out.kind, "indeterminate");
});
test("a repair whose parentBasis is not the rejected candidate basis is indeterminate before re-review or verify", async () => {
 // Everything except parentBasis is valid, so only the parent-lineage check can refuse these.
 const wrongParents: SubjectBasis[] = [base, { workspaceId: "repo", revision: "elsewhere" }, { workspaceId: "other", revision: rejected.basis.revision }];
 const evidence = { system: "claude-agent-sdk", kind: "repair-session", id: "repair-1" };
 for (const parentBasis of wrongParents) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { produceRepair: async () => { seen.push("repair"); return { ...repair, parentBasis, evidence }; } })), "indeterminate");
  assert.equal(out.reason, "REPAIR_BASIS_MISMATCH");
  assert.deepEqual(out.evidence, evidence);
  assert.deepEqual(seen, ["repair"]);
 }
});

const reviewRef = { system: "claude-agent-sdk", kind: "review-session", id: "review-9" };
const forgeRef = { system: "forge", kind: "operation", id: "op-9" };
test("an original review that is not an evidenced rejection at the candidate basis is REJECTED_REVIEW_UNESTABLISHED before any repair effect", async () => {
 const originals: readonly [string, ReviewResult][] = [
  ["unknown verdict", { ...review, verdict: "unknown" }],
  ["approved verdict", { ...review, verdict: "approved" }],
  ["rejection without evidence", { basis: review.basis, verdict: "rejected" }],
  ["rejection with a blank evidence system", { basis: review.basis, verdict: "rejected", evidence: { system: "", kind: "review-session", id: "review-1" } }],
  ["rejection recorded at the base revision", { ...review, basis: base }],
 ];
 for (const [label, old] of originals) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { rejectedReview: old })), "indeterminate");
  assert.equal(out.reason, "REJECTED_REVIEW_UNESTABLISHED", label);
  assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, [], label);
 }
});
test("a re-review at another basis or without referenced evidence is REPAIR_REVIEW_UNESTABLISHED, carrying only the evidence it was given, and never verifies", async () => {
 const rereviews: readonly [string, ReviewResult, boolean][] = [
  ["approved at the rejected candidate's basis", { basis: rejected.basis, verdict: "approved", evidence: reviewRef }, true],
  ["approved at the repair with no evidence", { basis: repair.basis, verdict: "approved" }, false],
  ["rejected at the repair with a blank evidence id (evidence check precedes the rejected branch)", { basis: repair.basis, verdict: "rejected", evidence: { system: "claude-agent-sdk", kind: "review-session", id: " " } }, true],
 ];
 for (const [label, rereview, carries] of rereviews) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { reReview: async () => { seen.push("review"); return rereview; } })), "indeterminate");
  assert.equal(out.reason, "REPAIR_REVIEW_UNESTABLISHED", label);
  if (carries) assert.deepEqual(out.evidence, rereview.evidence, label); else assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, ["repair", "review"], label);
 }
});
test("an evidenced re-review whose verdict is neither approved nor rejected is REPAIR_REVIEW_UNKNOWN with its evidence and never verifies", async () => {
 for (const verdict of ["unknown", "approve"] as const) {
  const seen: string[] = [];
  const rereview: ReviewResult = { basis: repair.basis, verdict: verdict as ReviewResult["verdict"], evidence: reviewRef, reason: "REVIEWER_TIMEOUT" };
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { reReview: async () => { seen.push("review"); return rereview; } })), "indeterminate");
  assert.equal(out.reason, "REPAIR_REVIEW_UNKNOWN", verdict);
  assert.deepEqual(out.evidence, reviewRef, verdict);
  assert.deepEqual(seen, ["repair", "review"], verdict);
 }
});
test("a verification of another basis after an approved re-review is REPAIR_GATE_BASIS_MISMATCH whatever its verdict, carrying its evidence", async () => {
 const wrongBases: readonly [string, SubjectBasis][] = [
  ["the rejected candidate's basis", rejected.basis],
  ["the base revision", base],
  ["another workspace at the repaired revision", { workspaceId: "other", revision: repair.basis.revision }],
 ];
 for (const [label, basis] of wrongBases) for (const verdict of ["passed", "failed", "unknown"] as const) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { verify: async () => { seen.push("verify"); return { basis, verdict, evidence: forgeRef }; } })), "indeterminate");
  assert.equal(out.reason, "REPAIR_GATE_BASIS_MISMATCH", label + " / " + verdict);
  assert.deepEqual(out.evidence, forgeRef, label + " / " + verdict);
  assert.deepEqual(seen, ["repair", "review", "verify"], label + " / " + verdict);
 }
});
test("a verification at the repaired basis that neither passes with referenced evidence nor fails is REPAIR_GATE_UNESTABLISHED", async () => {
 const verifications: readonly [string, VerificationResult, boolean][] = [
  ["unknown verdict with evidence", { basis: repair.basis, verdict: "unknown", evidence: forgeRef }, true],
  ["partial verdict with evidence", { basis: repair.basis, verdict: "partial", evidence: forgeRef }, true],
  ["passed without evidence", { basis: repair.basis, verdict: "passed" }, false],
  ["passed with a blank evidence id", { basis: repair.basis, verdict: "passed", evidence: { system: "forge", kind: "operation", id: "" } }, true],
 ];
 for (const [label, verification, carries] of verifications) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, { verify: async () => { seen.push("verify"); return verification; } })), "indeterminate");
  assert.equal(out.reason, "REPAIR_GATE_UNESTABLISHED", label);
  if (carries) assert.deepEqual(out.evidence, verification.evidence, label); else assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, ["repair", "review", "verify"], label);
 }
});

test("repairRejectedCandidate: an original review or a re-review in another workspace at the right revision, an original rejection whose evidence kind is blank, and a repair at a blank or whitespace-only revision are indeterminate by reason before the next effect", async () => {
 const otherWorkspace = "other-repo";
 const follow = (seen: string[]): Partial<RepairServices> => ({
  reReview: async (c: Candidate) => { seen.push("review"); return { basis: c.basis, verdict: "approved", evidence: reviewRef }; },
  verify: async (c: Candidate) => { seen.push("verify"); return { basis: c.basis, verdict: "passed", evidence: forgeRef }; },
 });
 const cases: readonly [string, (seen: string[]) => Partial<RepairServices>, string, readonly string[]][] = [
  ["original rejection recorded in another workspace at the candidate revision", () => ({ rejectedReview: { ...review, basis: { workspaceId: otherWorkspace, revision: rejected.basis.revision } } }), "REJECTED_REVIEW_UNESTABLISHED", []],
  ["original rejection whose evidence kind is blank", () => ({ rejectedReview: { ...review, evidence: { system: "claude-agent-sdk", kind: "", id: "review-1" } } }), "REJECTED_REVIEW_UNESTABLISHED", []],
  ["repair at a blank revision", seen => ({ ...follow(seen), produceRepair: async () => { seen.push("repair"); return { parentBasis: rejected.basis, basis: { workspaceId: "repo", revision: "" } }; } }), "REPAIR_BASIS_MISMATCH", ["repair"]],
  ["repair at a whitespace-only revision", seen => ({ ...follow(seen), produceRepair: async () => { seen.push("repair"); return { parentBasis: rejected.basis, basis: { workspaceId: "repo", revision: " \t" } }; } }), "REPAIR_BASIS_MISMATCH", ["repair"]],
  ["approved re-review in another workspace at the repaired revision", seen => ({ ...follow(seen), reReview: async () => { seen.push("review"); return { basis: { workspaceId: otherWorkspace, revision: repair.basis.revision }, verdict: "approved", evidence: reviewRef }; } }), "REPAIR_REVIEW_UNESTABLISHED", ["repair", "review"]],
 ];
 for (const [label, patch, reason, calls] of cases) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, patch(seen))), "indeterminate");
  assert.equal(out.reason, reason, label);
  if (reason === "REPAIR_REVIEW_UNESTABLISHED") assert.deepEqual(out.evidence, reviewRef, label); else assert.equal("evidence" in out, false, label);
  assert.deepEqual(seen, calls, label);
 }
});
test("each repairRejectedCandidate evidence check refuses its own blank field: an original rejection with a blank evidence id, and an approved re-review or a passed verification whose evidence has a blank system or kind, are indeterminate by reason before the next effect", async () => {
 const reviewRef = approved.evidence!, forgeRef = passed.evidence!;
 const cases: readonly [string, (seen: string[]) => Partial<RepairServices>, string, readonly string[], unknown][] = [
  ["original rejection whose evidence id is blank", () => ({ rejectedReview: { ...review, evidence: { system: "claude-agent-sdk", kind: "review-session", id: "" } } }), "REJECTED_REVIEW_UNESTABLISHED", [], undefined],
  ["approved re-review whose evidence system is blank", seen => ({ reReview: async () => { seen.push("review"); return { basis: repair.basis, verdict: "approved", evidence: { ...reviewRef, system: "" } }; } }), "REPAIR_REVIEW_UNESTABLISHED", ["repair", "review"], { ...reviewRef, system: "" }],
  ["approved re-review whose evidence kind is blank", seen => ({ reReview: async () => { seen.push("review"); return { basis: repair.basis, verdict: "approved", evidence: { ...reviewRef, kind: "" } }; } }), "REPAIR_REVIEW_UNESTABLISHED", ["repair", "review"], { ...reviewRef, kind: "" }],
  ["passed verification whose evidence system is blank", seen => ({ verify: async () => { seen.push("verify"); return { basis: repair.basis, verdict: "passed", evidence: { ...forgeRef, system: "" } }; } }), "REPAIR_GATE_UNESTABLISHED", ["repair", "review", "verify"], { ...forgeRef, system: "" }],
  ["passed verification whose evidence kind is blank", seen => ({ verify: async () => { seen.push("verify"); return { basis: repair.basis, verdict: "passed", evidence: { ...forgeRef, kind: "" } }; } }), "REPAIR_GATE_UNESTABLISHED", ["repair", "review", "verify"], { ...forgeRef, kind: "" }],
 ];
 for (const [label, patch, reason, calls, evidence] of cases) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, patch(seen))), "indeterminate");
  assert.equal(out.reason, reason, label);
  if (evidence === undefined) assert.equal("evidence" in out, false, label); else assert.deepEqual(out.evidence, evidence, label);
  assert.deepEqual(seen, calls, label);
 }
});
test("repairRejectedCandidate treats a whitespace-only evidence field as blank: an original rejection with a whitespace-only id or system is indeterminate before any effect, and a passed verification with a whitespace-only id or kind is indeterminate carrying that evidence", async () => {
 const forgeRef = passed.evidence!;
 const cases: readonly [string, (seen: string[]) => Partial<RepairServices>, string, readonly string[], unknown][] = [
  ["original rejection whose evidence id is whitespace-only", () => ({ rejectedReview: { ...review, evidence: { system: "claude-agent-sdk", kind: "review-session", id: " \t" } } }), "REJECTED_REVIEW_UNESTABLISHED", [], undefined],
  ["original rejection whose evidence system is whitespace-only", () => ({ rejectedReview: { ...review, evidence: { system: "  ", kind: "review-session", id: "review-1" } } }), "REJECTED_REVIEW_UNESTABLISHED", [], undefined],
  ["passed verification whose evidence id is whitespace-only", seen => ({ verify: async () => { seen.push("verify"); return { basis: repair.basis, verdict: "passed", evidence: { ...forgeRef, id: " \t" } }; } }), "REPAIR_GATE_UNESTABLISHED", ["repair", "review", "verify"], { ...forgeRef, id: " \t" }],
  ["passed verification whose evidence kind is whitespace-only", seen => ({ verify: async () => { seen.push("verify"); return { basis: repair.basis, verdict: "passed", evidence: { ...forgeRef, kind: "  " } }; } }), "REPAIR_GATE_UNESTABLISHED", ["repair", "review", "verify"], { ...forgeRef, kind: "  " }],
 ];
 for (const [label, patch, reason, calls, evidence] of cases) {
  const seen: string[] = [];
  const out = outcomeOf(await repairRejectedCandidate(args(seen, patch(seen))), "indeterminate");
  assert.equal(out.reason, reason, label);
  if (evidence === undefined) assert.equal("evidence" in out, false, label); else assert.deepEqual(out.evidence, evidence, label);
  assert.deepEqual(seen, calls, label);
 }
});
test("a failed verification at the repaired basis after an approved re-review is verification_failed carrying the repaired candidate, the approved re-review and that verification", async () => {
 const seen: string[] = [];
 const failedRun: VerificationResult = { basis: repair.basis, verdict: "failed", evidence: { system: "forge", kind: "operation", id: "op-fail" } };
 const out = outcomeOf(await repairRejectedCandidate(args(seen, { verify: async () => { seen.push("verify"); return failedRun; } })), "verification_failed");
 assert.deepEqual(out.candidate, repair);
 assert.deepEqual(out.review, approved);
 assert.deepEqual(out.verification, failedRun);
 assert.deepEqual(seen, ["repair", "review", "verify"]);
});
test("a repaired candidate outcome carries the approved re-review and the passed verification, never the original rejected review", async () => {
 const out = outcomeOf(await repairRejectedCandidate(args()), "repaired_candidate");
 assert.deepEqual(out.review, approved);
 assert.deepEqual(out.verification, passed);
});

test("a rejected re-review at the repaired basis is review_rejected carrying the repaired candidate and that re-review, and never verifies", async () => {
 const seen: string[] = [];
 const rejectedAgain: ReviewResult = { basis: repair.basis, verdict: "rejected", evidence: { system: "claude-agent-sdk", kind: "review-session", id: "review-3" } };
 const out = outcomeOf(await repairRejectedCandidate(args(seen, { reReview: async () => { seen.push("review"); return rejectedAgain; } })), "review_rejected");
 assert.deepEqual(out.candidate, repair);
 assert.deepEqual(out.review, rejectedAgain);
 assert.deepEqual(seen, ["repair", "review"]);
});
