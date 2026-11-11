import test from "node:test";
import assert from "node:assert/strict";
import { develop } from "../dist/index.js";
import type { Candidate, DevelopmentOutcome, DevelopmentRequest, DevelopmentServices, EvidenceRef, SubjectBasis } from "../dist/index.js";

const request: DevelopmentRequest = { task: "Fix parser", workspaceId: "demo", baseRevision: "base-1" };
const basis: SubjectBasis = { workspaceId: "demo", revision: "base-1" };
const candidateBasis: SubjectBasis = { workspaceId: "demo", revision: "candidate-1" };
const ref: EvidenceRef = { system: "fixture", kind: "synthetic-gate", id: "fixture-gate-1" };

function services(overrides: Partial<DevelopmentServices> = {}, seen: string[] = []): DevelopmentServices {
  return {
    async discover() { seen.push("discover"); return { basis, coverage: "complete", files: ["src/parser.ts"] }; },
    async compileContext() { seen.push("context"); return { basis, text: "demo" }; },
    async implement() { seen.push("implement"); return { basis: candidateBasis, parentBasis: basis }; },
    async verify() { seen.push("verify"); return { basis: candidateBasis, verdict: "passed", evidence: ref }; },
    ...overrides,
  };
}
/** Narrow an outcome to one kind after asserting it; keeps the test typed without `any`. */
function outcomeOf<K extends DevelopmentOutcome["kind"]>(out: DevelopmentOutcome, kind: K): Extract<DevelopmentOutcome, { kind: K }> {
  assert.equal(out.kind, kind);
  return out as Extract<DevelopmentOutcome, { kind: K }>;
}

test("verified result requires complete discovery and evidence-bound matching basis", async () => {
  const seen: string[] = [];
  const out = outcomeOf(await develop(services({}, seen), request), "verified_candidate");
  assert.deepEqual(seen, ["discover", "context", "implement", "verify"]);
  assert.deepEqual(out.verification.evidence, ref);
});

test("incomplete discovery never starts implementation", async () => {
  const seen: string[] = [];
  const out = await develop(services({
    async discover() { seen.push("discover"); return { basis, coverage: "partial", files: [] }; },
  }, seen), request);
  assert.equal(out.kind, "needs_evidence");
  assert.deepEqual(seen, ["discover"]);
});

test("invalid input refuses before side effects", async () => {
  const seen: string[] = [];
  await assert.rejects(() => develop(services({}, seen), { ...request, task: "" }), /INVALID_DEVELOPMENT_REQUEST/);
  assert.deepEqual(seen, []);
});

test("stale compiled context never reaches implementation", async () => {
  const seen: string[] = [];
  const out = outcomeOf(await develop(services({
    async compileContext() { seen.push("context"); return { basis: { ...basis, revision: "stale" }, text: "oops" }; },
  }, seen), request), "indeterminate");
  assert.equal(out.reason, "CONTEXT_BASIS_MISMATCH");
  assert.deepEqual(seen, ["discover", "context"]);
});

test("changed candidate basis is permitted, but gate must verify that candidate", async () => {
  const out = outcomeOf(await develop(services({
    async verify() { return { basis, verdict: "passed", evidence: ref }; },
  }), request), "indeterminate");
  assert.equal(out.reason, "VERIFICATION_BASIS_MISMATCH");
});

test("a negative domain verdict is not transport failure or success", async () => {
  const out = await develop(services({
    async verify() { return { basis: candidateBasis, verdict: "failed", evidence: ref }; },
  }), request);
  assert.equal(out.kind, "verification_failed");
});

test("partial/unknown and unproven PASS never become verified", async () => {
  for (const verdict of ["partial", "unknown", "passed"] as const) {
    const out = await develop(services({
      async verify() {
        return { basis: candidateBasis, verdict, ...(verdict === "passed" ? {} : { evidence: ref }) };
      },
    }), request);
    assert.equal(out.kind, "indeterminate");
  }
});

test("candidate revision equal to parent cannot be verified", async () => {
  const seen: string[] = [];
  const out = outcomeOf(await develop(services({
    async implement() { seen.push("implement"); return { basis, parentBasis: basis }; },
    async verify() { seen.push("verify"); return { basis, verdict: "passed", evidence: ref }; },
  }), request), "indeterminate");
  assert.equal(out.reason, "CANDIDATE_BASIS_MISMATCH");
  assert.deepEqual(seen, ["implement"]);
});

test("unknown scope coverage refuses before downstream effects", async () => {
  const seen: string[] = [];
  const out = outcomeOf(await develop(services({
    async discover() { seen.push("discover"); return { basis, coverage: "unknown", files: [] }; },
  }, seen), request), "needs_evidence");
  assert.equal(out.reason, "SCOPE_INCOMPLETE");
  assert.deepEqual(seen, ["discover"]);
});
test("discovery basis mismatch on workspace identity refuses before context", async () => {
  const seen: string[] = [];
  const out = outcomeOf(await develop(services({
    async discover() { seen.push("discover"); return { basis: { ...basis, workspaceId: "other" }, coverage: "complete", files: [] }; },
  }, seen), request), "indeterminate");
  assert.equal(out.reason, "DISCOVERY_BASIS_MISMATCH");
  assert.deepEqual(seen, ["discover"]);
});
test("candidate parent mismatch and mismatched workspace refuse verification", async () => {
  const invalids: Candidate[] = [
    { parentBasis: { ...basis, revision: "stale" }, basis: candidateBasis },
    { parentBasis: basis, basis: { ...candidateBasis, workspaceId: "other" } },
  ];
  for (const invalid of invalids) {
    const seen: string[] = [];
    const out = outcomeOf(await develop(services({
      async implement() { seen.push("implement"); return invalid; },
      async verify() { seen.push("verify"); throw Error("must not run"); },
    }), request), "indeterminate");
    assert.equal(out.reason, "CANDIDATE_BASIS_MISMATCH");
    assert.deepEqual(seen, ["implement"]);
  }
});
test("callback rejection propagates; it is not a domain verification failure", async () => {
  const failure = Error("transport interrupted after gate dispatch");
  await assert.rejects(() => develop(services({ async verify() { throw failure; } }), request), (error: unknown) => error === failure);
});
test("invalid workspace and base revision refuse before any service callback", async () => {
  const invalidRequests: DevelopmentRequest[] = [{ ...request, workspaceId: "  " }, { ...request, baseRevision: "  " }];
  for (const invalid of invalidRequests) {
    const seen: string[] = [];
    await assert.rejects(() => develop(services({}, seen), invalid), /INVALID_DEVELOPMENT_REQUEST/);
    assert.deepEqual(seen, []);
  }
});

// MechanicalWorkflows-tbe: a passed verdict establishes a verified candidate only
// when the evidence reference names its producer, kind and id with nonblank strings.
const malformedRefs: ReadonlyArray<readonly [string, EvidenceRef | undefined]> = [
  ["missing evidence", undefined],
  ["empty kind", { system: "forge", kind: "", id: "op-1" }],
  ["whitespace-only kind", { system: "forge", kind: "  ", id: "op-1" }],
  ["whitespace-only id", { system: "forge", kind: "operation", id: " " }],
  ["whitespace-only system", { system: "\t", kind: "operation", id: "op-1" }],
  ["empty system", { system: "", kind: "operation", id: "op-1" }],
];
for (const [label, evidence] of malformedRefs) {
  test(`passed verification with ${label} never yields verified_candidate`, async () => {
    const out = outcomeOf(await develop(services({
      async verify() {
        return { basis: candidateBasis, verdict: "passed", ...(evidence ? { evidence } : {}) };
      },
    }), request), "indeterminate");
    assert.equal(out.reason, "VERIFICATION_EVIDENCE_MISSING");
  });
}

test("passed verification with fully populated evidence still yields verified_candidate", async () => {
  const good: EvidenceRef = { system: "forge", kind: "operation", id: "op-1" };
  const out = outcomeOf(await develop(services({
    async verify() { return { basis: candidateBasis, verdict: "passed", evidence: good }; },
  }), request), "verified_candidate");
  assert.deepEqual(out.verification.evidence, good);
});

test("a partial verdict at the candidate basis is VERIFICATION_PARTIAL and any other non-pass, non-fail verdict is VERIFICATION_UNKNOWN, each carrying evidence only when given", async () => {
  type Verdict = Parameters<DevelopmentServices["verify"]>[0] extends Candidate ? Awaited<ReturnType<DevelopmentServices["verify"]>>["verdict"] : never;
  const cases: ReadonlyArray<readonly [string, Verdict, EvidenceRef | undefined, string]> = [
    ["partial with evidence", "partial", ref, "VERIFICATION_PARTIAL"],
    ["partial without evidence", "partial", undefined, "VERIFICATION_PARTIAL"],
    ["unknown with evidence", "unknown", ref, "VERIFICATION_UNKNOWN"],
    ["unknown without evidence", "unknown", undefined, "VERIFICATION_UNKNOWN"],
    ["foreign verdict string", "pass" as Verdict, ref, "VERIFICATION_UNKNOWN"],
  ];
  for (const [label, verdict, evidence, reason] of cases) {
    const seen: string[] = [];
    const out = outcomeOf(await develop(services({
      async verify() { seen.push("verify"); return { basis: candidateBasis, verdict, ...(evidence ? { evidence } : {}) }; },
    }, seen), request), "indeterminate");
    assert.equal(out.reason, reason, label);
    if (evidence) assert.deepEqual(out.evidence, evidence, label); else assert.equal("evidence" in out, false, label);
    assert.deepEqual(seen, ["discover", "context", "implement", "verify"], label);
  }
});

test("a candidate whose parent is the base revision of another workspace is CANDIDATE_BASIS_MISMATCH before verification", async () => {
  const seen: string[] = [];
  const out = await develop(services({
    async implement() { seen.push("implement"); return { parentBasis: { ...basis, workspaceId: "other" }, basis: candidateBasis }; },
    async verify() { seen.push("verify"); return { basis: candidateBasis, verdict: "passed", evidence: ref }; },
  }), request);
  assert.deepEqual(out, { kind: "indeterminate", reason: "CANDIDATE_BASIS_MISMATCH" }, "develop: parent at the base revision of another workspace");
  assert.deepEqual(seen, ["implement"], "develop: calls");
});

test("a verification at a foreign basis is VERIFICATION_BASIS_MISMATCH carrying exactly its evidence, and no evidence key when it has none", async () => {
  const carried = outcomeOf(await develop(services({ async verify() { return { basis, verdict: "passed", evidence: ref }; } }), request), "indeterminate");
  assert.equal(carried.reason, "VERIFICATION_BASIS_MISMATCH");
  assert.deepEqual(carried.evidence, ref);
  for (const [label, evidence] of [["absent evidence", undefined], ["null evidence", null]] as const) {
    const out = outcomeOf(await develop(services({ async verify() { return { basis, verdict: "passed", evidence } as never; } }), request), "indeterminate");
    assert.equal(out.reason, "VERIFICATION_BASIS_MISMATCH", label);
    assert.equal("evidence" in out, false, label);
  }
});

test("a compiled context at a stale basis is CONTEXT_BASIS_MISMATCH carrying exactly its evidence, and no evidence key when it has none", async () => {
  const stale = { ...basis, revision: "stale" };
  const carried = outcomeOf(await develop(services({ async compileContext() { return { basis: stale, text: "oops", evidence: ref }; } }), request), "indeterminate");
  assert.equal(carried.reason, "CONTEXT_BASIS_MISMATCH");
  assert.deepEqual(carried.evidence, ref);
  for (const [label, evidence] of [["absent evidence", undefined], ["null evidence", null]] as const) {
    const out = outcomeOf(await develop(services({ async compileContext() { return { basis: stale, text: "oops", evidence } as never; } }), request), "indeterminate");
    assert.equal(out.reason, "CONTEXT_BASIS_MISMATCH", label);
    assert.equal("evidence" in out, false, label);
  }
});

test("a discovery at a foreign basis is DISCOVERY_BASIS_MISMATCH carrying exactly its evidence, and no evidence key when it has none", async () => {
  const foreign = { ...basis, workspaceId: "other" };
  const seen: string[] = [];
  const carried = outcomeOf(await develop(services({
    async discover() { seen.push("discover"); return { basis: foreign, coverage: "complete", files: [], evidence: ref }; },
  }, seen), request), "indeterminate");
  assert.equal(carried.reason, "DISCOVERY_BASIS_MISMATCH");
  assert.deepEqual(carried.evidence, ref);
  assert.deepEqual(seen, ["discover"]);
  for (const [label, evidence] of [["absent evidence", undefined], ["null evidence", null]] as const) {
    const calls: string[] = [];
    const out = outcomeOf(await develop(services({
      async discover() { calls.push("discover"); return { basis: foreign, coverage: "complete", files: [], evidence } as never; },
    }, calls), request), "indeterminate");
    assert.equal(out.reason, "DISCOVERY_BASIS_MISMATCH", label);
    assert.equal("evidence" in out, false, label);
    assert.deepEqual(calls, ["discover"], label);
  }
});

test("a basis-mismatched candidate is CANDIDATE_BASIS_MISMATCH carrying exactly its evidence, and no evidence key when it has none", async () => {
  const foreign = { ...basis, workspaceId: "other" };
  const seen: string[] = [];
  const carried = outcomeOf(await develop(services({
    async implement() { seen.push("implement"); return { basis: candidateBasis, parentBasis: foreign, evidence: ref }; },
    async verify() { seen.push("verify"); return { basis: candidateBasis, verdict: "passed", evidence: ref }; },
  }), request), "indeterminate");
  assert.equal(carried.reason, "CANDIDATE_BASIS_MISMATCH");
  assert.deepEqual(carried.evidence, ref);
  assert.deepEqual(seen, ["implement"]);
  for (const [label, evidence] of [["absent evidence", undefined], ["null evidence", null]] as const) {
    const calls: string[] = [];
    const out = outcomeOf(await develop(services({
      async implement() { calls.push("implement"); return { basis: candidateBasis, parentBasis: foreign, evidence } as never; },
      async verify() { calls.push("verify"); return { basis: candidateBasis, verdict: "passed", evidence: ref }; },
    }), request), "indeterminate");
    assert.equal(out.reason, "CANDIDATE_BASIS_MISMATCH", label);
    assert.equal("evidence" in out, false, label);
    assert.deepEqual(calls, ["implement"], label);
  }
});

test("a fix claim carried by the candidate or the agent text never converts a failed Forge verification into a verified candidate", async () => {
  const claimed = { basis: candidateBasis, parentBasis: basis, summary: "fixed: all tests pass", review: "approved", verdict: "passed" } as unknown as Candidate;
  const failed = outcomeOf(await develop(services({
    async implement() { return claimed; },
    async verify() { return { basis: candidateBasis, verdict: "failed", evidence: { system: "forge", kind: "operation", id: "op-failed-1" } }; },
  }), request), "verification_failed");
  assert.deepEqual(failed.candidate, claimed);
  assert.equal(failed.verification.verdict, "failed");
  // Negative control: the same claim-bearing candidate still verifies when the native verdict passes.
  outcomeOf(await develop(services({ async implement() { return claimed; } }), request), "verified_candidate");
});

test("a failed verification yields verification_failed even when the failed verdict carries no evidence", async () => {
  const out = outcomeOf(await develop(services({
    async verify() { return { basis: candidateBasis, verdict: "failed" }; },
  }), request), "verification_failed");
  assert.equal(out.verification.evidence, undefined);
});

test("CAC reference fields on the request leave every outcome unchanged: develop() treats CAC metadata as an optional view (CACWC-EAT-R016)", async () => {
  // A variable, not a literal, so the extra field reaches develop() as a caller would pass it without widening DevelopmentRequest.
  const withCac = { ...request, cac: { contract: "cac-capability-contract", revision: "ff9a8e1", obligations: ["effect", "evidence"] } };
  const scenarios: ReadonlyArray<readonly [string, Partial<DevelopmentServices>]> = [
    ["verified", {}],
    ["partial discovery", { async discover() { return { basis, coverage: "partial", files: [] }; } }],
    ["failed verification", { async verify() { return { basis: candidateBasis, verdict: "failed", evidence: ref }; } }],
    ["passed without evidence", { async verify() { return { basis: candidateBasis, verdict: "passed" }; } }],
  ];
  for (const [label, overrides] of scenarios) {
    const plainSeen: string[] = [];
    const cacSeen: string[] = [];
    const plain = await develop(services(overrides, plainSeen), request);
    const decorated = await develop(services(overrides, cacSeen), withCac);
    assert.deepEqual(decorated, plain, label);
    assert.deepEqual(cacSeen, plainSeen, label);
  }
});
