import { strict as assert } from "node:assert";
import { test } from "node:test";
import { ADVERSARIAL_ROWS, admitAgainstCurrentRevisions, bindDecisionWitnesses, classifyAbsence, decidePromotion, digest, judgeCorpus, planInvalidation, projectLaneView, recordRuntimePlan, validateEvidenceChain, validateLogProb, validateRewriteBoundary } from "../dist/index.js";
import type { CaseOutcome, EvidenceRecord, PolicyGraphManifest } from "../dist/index.js";

/** Collects every refusal code a validator produced, including a thrown CODE: message, so an admitted input shows as []. */
function observe(run: () => unknown): string[] {
  try {
    const out = run() as Record<string, unknown>;
    const codes: string[] = [];
    const walk = (value: unknown): void => {
      if (Array.isArray(value)) { for (const member of value) walk(member); return; }
      if (value !== null && typeof value === "object") {
        for (const [key, member] of Object.entries(value as Record<string, unknown>)) {
          if ((key === "code" || key === "reason") && typeof member === "string" && /^[A-Z][A-Z0-9_]+$/.test(member)) codes.push(member);
          walk(member);
        }
      }
    };
    walk(out);
    return codes;
  } catch (error) {
    const match = /([A-Z][A-Z0-9_]{5,})/.exec(error instanceof Error ? error.message : String(error));
    return match ? [match[1]!] : ["THREW_WITHOUT_CODE"];
  }
}

const graph: PolicyGraphManifest = { schema: "mw.policy-graph.v1", graphId: "g1", revision: "r7", parentRevision: "r6", exactBasisPolicy: "p:base", requiredContracts: ["c:budget"], implementationRefs: ["impl:a"], nodes: [{ id: "a", kind: "observation" }, { id: "p", kind: "deterministic-policy" }], edges: [{ from: "a", to: "p", temporal: "instant" }] };
const chain = (overrides: Partial<Record<"p1" | "a1" | "r1" | "v1", Partial<EvidenceRecord>>> = {}): EvidenceRecord[] => [
  { recordId: "p1", phase: "proposal", authority: "policy", mode: "fixture", subject: "intent:1", digest: "sha256:p1", basedOn: [], ...overrides.p1 },
  { recordId: "a1", phase: "admission", authority: "reconcile", mode: "fixture", subject: "intent:1", digest: "sha256:a1", basedOn: ["p1"], ...overrides.a1 },
  { recordId: "r1", phase: "receipt", authority: "native", mode: "fixture", subject: "intent:1", digest: "sha256:r1", basedOn: ["a1"], ...overrides.r1 },
  { recordId: "v1", phase: "verification", authority: "verifier", mode: "fixture", subject: "intent:1", digest: "sha256:v1", basedOn: ["r1"], verdict: "indeterminate", ...overrides.v1 },
];

/** The corpus: every row of APO-024 attacked through the real validators. */
function corpus(): CaseOutcome[] {
  const plan = recordRuntimePlan(graph);
  const witnesses = bindDecisionWitnesses({ decisionId: "d:1", readSet: ["rf"], observation: { digest: digest({ x: 1 }), content: { x: 1 } }, sources: [{ source: "rf", revision: "rf@1" }] });
  return [
    { caseId: "bad-ref-1", row: "bad-evidence-reference", validator: "validateEvidenceChain", expected: "EVIDENCE_CITATION_UNKNOWN", observed: observe(() => validateEvidenceChain(chain({ a1: { basedOn: ["ghost"] } }))) },
    { caseId: "bad-ref-2", row: "bad-evidence-reference", validator: "validateEvidenceChain", expected: "EVIDENCE_AUTHORITY_MISMATCH", observed: observe(() => validateEvidenceChain(chain({ a1: { authority: "policy" } }))) },
    { caseId: "incompatible-1", row: "incompatible-evidence", validator: "validateEvidenceChain", expected: "EVIDENCE_MODE_UPGRADE", observed: observe(() => validateEvidenceChain(chain({ a1: { mode: "live" } }))) },
    { caseId: "incompatible-2", row: "incompatible-evidence", validator: "validateEvidenceChain", expected: "EVIDENCE_SUBJECT_MISMATCH", observed: observe(() => validateEvidenceChain(chain({ r1: { subject: "intent:2" } }))) },
    { caseId: "missing-1", row: "missing-evidence", validator: "validateEvidenceChain", expected: "EVIDENCE_VERDICT_MISSING", observed: observe(() => validateEvidenceChain(chain().map(r => (r.recordId === "v1" ? (({ verdict: _dropped, ...rest }) => rest)(r) : r)))) },
    { caseId: "missing-2", row: "missing-evidence", validator: "decidePromotion", expected: "PROMOTION_GUARANTEE_MISSING", observed: observe(() => decidePromotion({ candidateId: "c", candidateHash: "h", requiredGuarantees: ["g1"], proofs: [] })) },
    { caseId: "unknown-1", row: "unknown-evidence", validator: "classifyAbsence", expected: "ABSENCE_WITNESS_MISSING", observed: observe(() => classifyAbsence({ queryId: "q", domains: ["lanes"], generation: "gen:1", matches: 0 })) },
    { caseId: "unknown-2", row: "unknown-evidence", validator: "admitAgainstCurrentRevisions", expected: "WITNESS_CURRENT_UNKNOWN", observed: observe(() => admitAgainstCurrentRevisions(witnesses, [])) },
    { caseId: "nonfinite-1", row: "nonfinite-number", validator: "validateLogProb", expected: "KERNEL_LOGPROB_INVALID", observed: observe(() => validateLogProb(Number.NaN, "p")) },
    { caseId: "nonfinite-2", row: "nonfinite-number", validator: "validateLogProb", expected: "KERNEL_LOGPROB_INVALID", observed: observe(() => validateLogProb(Number.POSITIVE_INFINITY, "p")) },
    { caseId: "nonfinite-3", row: "nonfinite-number", validator: "projectLaneView", expected: "LANE_VIEW_DISTRIBUTION_INVALID", observed: observe(() => projectLaneView({ laneId: "l", revision: "r", occupancy: "busy", release: { kind: "learned", source: "mp", distribution: [{ atOrBefore: "t", mass: Number.NaN }] } }, "planning")) },
    { caseId: "stale-graph-1", row: "stale-graph", validator: "validateRewriteBoundary", expected: "REWRITE_PARENT_MISMATCH", observed: observe(() => validateRewriteBoundary({ candidateId: "c", parentRevision: "r6", changes: [], requiredCertificates: ["c:budget"] }, graph)) },
    { caseId: "stale-graph-2", row: "stale-graph", validator: "planInvalidation", expected: "REVISION_MISMATCH", observed: plan.ok ? observe(() => planInvalidation(plan.plan, { candidateId: "c", parentRevision: "r5", changes: [{ kind: "node", id: "p", op: "modify" }], requiredCertificates: ["c:budget"], graphId: "g1" })) : ["PLAN_NOT_RECORDED"] },
    { caseId: "stale-ckpt-1", row: "stale-checkpoint", validator: "decidePromotion", expected: "PROMOTION_GUARANTEE_PROOF_STALE", observed: observe(() => decidePromotion({ candidateId: "c", candidateHash: "h2", requiredGuarantees: ["g1"], proofs: [{ guaranteeId: "g1", status: "proven", proofRef: "proof:1", provedAgainst: "h1" }] })) },
    { caseId: "stale-ckpt-2", row: "stale-checkpoint", validator: "admitAgainstCurrentRevisions", expected: "WITNESS_STALE", observed: observe(() => admitAgainstCurrentRevisions(witnesses, [{ source: "rf", revision: "rf@2" }])) },
  ];
}

test("the seven adversarial rows are the matrix and the table is frozen", () => {
  assert.deepEqual([...ADVERSARIAL_ROWS], ["bad-evidence-reference", "incompatible-evidence", "missing-evidence", "unknown-evidence", "nonfinite-number", "stale-graph", "stale-checkpoint"]);
  assert.ok(Object.isFrozen(ADVERSARIAL_ROWS));
});

test("acceptance: the corpus drives the real validators and every case is refused with the expected code; every row is covered at least twice", () => {
  const outcomes = corpus();
  const judged = judgeCorpus(outcomes);
  assert.equal(judged.schema, "mw.adversarial-corpus.v0");
  assert.deepEqual(judged.failures.map(f => [f.caseId, f.verdict, f.observed]), []);
  assert.deepEqual(judged.refusals, []);
  assert.equal(judged.ok, true);
  assert.equal(judged.total, outcomes.length);
  assert.equal(judged.passed, outcomes.length);
  for (const row of ADVERSARIAL_ROWS) assert.ok(judged.coverage[row] >= 2, `${row}: ${judged.coverage[row]}`);
});

test("the corpus is honest about admission: the same validators admit the well-formed twins, so the refusals come from the attacks and not from the harness", () => {
  assert.deepEqual(observe(() => validateEvidenceChain(chain())), []);
  assert.deepEqual(observe(() => validateRewriteBoundary({ candidateId: "c", parentRevision: "r7", changes: [{ kind: "node", id: "p", op: "modify" }], requiredCertificates: ["c:budget"] }, graph)), []);
  assert.deepEqual(observe(() => validateLogProb(-0.5, "p")), []);
  assert.deepEqual(observe(() => decidePromotion({ candidateId: "c", candidateHash: "h1", requiredGuarantees: ["g1"], proofs: [{ guaranteeId: "g1", status: "proven", proofRef: "proof:1", provedAgainst: "h1" }] })), []);
});

test("the judge fails a case that was admitted or refused for another reason, and refuses a corpus that leaves a row uncovered, repeats a case id or names an unknown row", () => {
  const good = corpus();
  const admitted = judgeCorpus([...good, { caseId: "x-admitted", row: "stale-graph", validator: "v", expected: "ANY", observed: [] }]);
  assert.equal(admitted.ok, false);
  assert.deepEqual(admitted.failures.map(f => [f.caseId, f.verdict]), [["x-admitted", "admitted"]]);
  const otherwise = judgeCorpus([...good, { caseId: "x-other", row: "stale-graph", validator: "v", expected: "WANTED", observed: ["SOMETHING_ELSE"] }]);
  assert.deepEqual(otherwise.failures.map(f => f.verdict), ["refused-otherwise"]);
  const uncovered = judgeCorpus(good.filter(c => c.row !== "nonfinite-number"));
  assert.deepEqual(uncovered.refusals.map(r => [r.code, r.subject]), [["CORPUS_ROW_UNCOVERED", "nonfinite-number"]]);
  assert.equal(uncovered.ok, false);
  const duplicate = judgeCorpus([...good, good[0]!]);
  assert.deepEqual(duplicate.refusals.map(r => [r.code, r.subject]), [["CORPUS_CASE_DUPLICATE", good[0]!.caseId]]);
  const unknownRow = judgeCorpus([...good, { ...good[0]!, caseId: "x-row", row: "typo-row" as never }]);
  assert.deepEqual(unknownRow.refusals.map(r => r.code), ["CORPUS_ROW_UNKNOWN"]);
  assert.equal(unknownRow.total, good.length, "an unknown-row case is not counted");
});

test("pinned judge laws (xvam): passed counts the refused-as-expected cases, a judged case keeps the observed list it was given, every row's absence is refused alone, and one case per row is refused as undercovered (tga5 Q2)", () => {
  const good = corpus();
  const admitted = judgeCorpus([...good, { caseId: "x-admitted", row: "stale-graph", validator: "v", expected: "ANY", observed: [] }]);
  assert.equal(admitted.total, good.length + 1);
  assert.equal(admitted.passed, good.length, "passed is the refused-as-expected count, so one failing case leaves passed one short of total");
  const otherwise = judgeCorpus([...good, { caseId: "x-other", row: "stale-graph", validator: "v", expected: "WANTED", observed: ["SOMETHING_ELSE"] }]);
  assert.deepEqual(otherwise.failures[0]!.observed, ["SOMETHING_ELSE"], "a judged case carries the observed list it was given");
  for (const row of ADVERSARIAL_ROWS) {
    const without = judgeCorpus(good.filter(c => c.row !== row));
    assert.deepEqual(without.refusals.map(r => [r.code, r.subject]), [["CORPUS_ROW_UNCOVERED", row]], `${row}: absence refused alone`);
    assert.equal(without.coverage[row], 0, `${row}: coverage zero`);
  }
  const onePerRow = ADVERSARIAL_ROWS.map(row => good.find(c => c.row === row)!);
  const single = judgeCorpus(onePerRow);
  assert.equal(single.ok, false, "one case per row no longer suffices: the T2 law is every row covered at least twice (tga5 Q2)");
  assert.deepEqual(single.refusals.map(r => [r.code, r.subject]), ADVERSARIAL_ROWS.map(row => ["CORPUS_ROW_UNDERCOVERED", row]));
  assert.deepEqual(Object.values(single.coverage), ADVERSARIAL_ROWS.map(() => 1));
});

test("tga5 Q1: a repeated case id is refused CORPUS_CASE_DUPLICATE and then skipped, so total, coverage and cases[] count distinct cases only", () => {
  const good = corpus();
  const repeat = { ...good[0]!, observed: [] as string[] };
  const duplicate = judgeCorpus([...good, repeat]);
  assert.deepEqual(duplicate.refusals.map(r => [r.code, r.subject]), [["CORPUS_CASE_DUPLICATE", good[0]!.caseId]], "the refusal is still present");
  assert.equal(duplicate.total, good.length, "total counts distinct cases");
  assert.equal(duplicate.cases.length, good.length, "the repeat is absent from cases[]");
  assert.equal(duplicate.cases.filter(c => c.caseId === good[0]!.caseId).length, 1);
  assert.equal(duplicate.coverage[good[0]!.row], judgeCorpus(good).coverage[good[0]!.row], "coverage excludes the repeat");
  assert.deepEqual(duplicate.failures, [], "the skipped repeat is never judged, so its empty observed list cannot fail the corpus");
  assert.equal(duplicate.ok, false);
});

test("tga5 Q2: a row covered exactly once is refused CORPUS_ROW_UNDERCOVERED naming the row, zero stays CORPUS_ROW_UNCOVERED, and the shipped corpus passes", () => {
  const good = corpus();
  assert.equal(judgeCorpus(good).ok, true);
  for (const row of ADVERSARIAL_ROWS) {
    const rowCases = good.filter(c => c.row === row);
    const one = judgeCorpus([...good.filter(c => c.row !== row), rowCases[0]!]);
    assert.deepEqual(one.refusals.map(r => [r.code, r.subject]), [["CORPUS_ROW_UNDERCOVERED", row]], `${row}: one case is undercovered`);
    assert.ok(one.refusals[0]!.detail.includes(row), `${row}: the detail names the row`);
    assert.equal(one.coverage[row], 1);
    assert.equal(one.ok, false);
    const two = judgeCorpus(good);
    assert.equal(two.coverage[row], rowCases.length);
    const zero = judgeCorpus(good.filter(c => c.row !== row));
    assert.deepEqual(zero.refusals.map(r => [r.code, r.subject]), [["CORPUS_ROW_UNCOVERED", row]], `${row}: zero stays uncovered`);
  }
  const boundary = judgeCorpus([...good.filter(c => c.row !== "stale-graph"), good.find(c => c.row === "stale-graph")!, { ...good.find(c => c.row === "stale-graph")!, caseId: "stale-graph-extra" }]);
  assert.deepEqual(boundary.refusals, [], "two cases is the threshold");
});

test("b8do G01: the CORPUS_ROW_UNDERCOVERED detail carries the observed count and the threshold, not only the row name", () => {
  const good = corpus();
  for (const row of ADVERSARIAL_ROWS) {
    const one = judgeCorpus([...good.filter(c => c.row !== row), good.find(c => c.row === row)!]);
    assert.equal(one.refusals.length, 1, `${row}: one refusal`);
    assert.equal(one.refusals[0]!.detail, `row ${row} has 1 adversarial case, fewer than the 2 every row must carry`, `${row}: observed count and threshold are in the detail`);
  }
});

test("b8do G02: a repeated unknown-row case id is refused CORPUS_ROW_UNKNOWN once, then CORPUS_CASE_DUPLICATE, and the repeat is skipped, never re-judged", () => {
  const good = corpus();
  const unknown = { ...good[0]!, caseId: "x-row", row: "typo-row" as never };
  const repeated = judgeCorpus([...good, unknown, unknown]);
  const baseline = judgeCorpus(good);
  assert.deepEqual(repeated.refusals.map(r => [r.code, r.subject]), [["CORPUS_ROW_UNKNOWN", "x-row"], ["CORPUS_CASE_DUPLICATE", "x-row"]]);
  assert.equal(repeated.total, baseline.total, "neither the unknown case nor its repeat is counted");
  assert.equal(repeated.cases.length, baseline.cases.length);
  assert.deepEqual(repeated.coverage, baseline.coverage);
  assert.equal(repeated.ok, false);
});

test("4icf: the CORPUS_ROW_UNKNOWN, CORPUS_CASE_DUPLICATE and zero-coverage CORPUS_ROW_UNCOVERED details name the offending row or case id verbatim", () => {
  const good = corpus();
  const unknownRow = judgeCorpus([...good, { ...good[0]!, caseId: "x-row", row: "typo-row" as never }]);
  assert.equal(unknownRow.refusals.length, 1, "one unknown-row refusal");
  assert.equal(unknownRow.refusals[0]!.detail, "case x-row attacks row typo-row, which the matrix does not have", "N01: the unknown-row detail names the case id and the row");
  const duplicate = judgeCorpus([...good, good[0]!]);
  assert.equal(duplicate.refusals.length, 1, "one duplicate refusal");
  assert.equal(duplicate.refusals[0]!.detail, `case ${good[0]!.caseId} appears more than once`, "N02: the duplicate detail names the repeated case id");
  for (const row of ADVERSARIAL_ROWS) {
    const zero = judgeCorpus(good.filter(c => c.row !== row));
    assert.equal(zero.refusals.length, 1, `${row}: one uncovered refusal`);
    assert.equal(zero.refusals[0]!.detail, `row ${row} has no adversarial case`, `N03 ${row}: the uncovered detail names the row`);
  }
});

test("the judgement is a pure record: every string leaf is an input leaf, a schema, a verdict word or a declared corpus code", () => {
  const good = corpus();
  const judged = judgeCorpus(good.filter(c => c.row !== "stale-graph"));
  const known = new Set<string>([...stringLeaves(good), judged.schema, "refused-as-expected", "refused-otherwise", "admitted", "CORPUS_ROW_UNCOVERED", "stale-graph"]);
  for (const leaf of stringLeaves({ ...judged, refusals: judged.refusals.map(({ detail: _d, ...rest }) => rest) })) assert.ok(known.has(leaf), `minted leaf: ${leaf}`);
});

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}
