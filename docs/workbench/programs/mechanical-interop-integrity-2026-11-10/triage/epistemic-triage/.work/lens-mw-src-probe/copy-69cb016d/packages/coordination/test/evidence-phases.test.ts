import { strict as assert } from "node:assert";
import { test } from "node:test";
import { validateEvidenceChain } from "../dist/index.js";
import type { EvidenceRecord } from "../dist/index.js";

function record(overrides: Partial<EvidenceRecord> & Pick<EvidenceRecord, "recordId" | "phase">): EvidenceRecord {
  const authority = { proposal: "policy", admission: "reconcile", receipt: "native", verification: "verifier", learning: "collector" } as const;
  return { authority: authority[overrides.phase], mode: "live", subject: "cand:7", digest: `sha256:${overrides.recordId}`, basedOn: [], ...overrides };
}
const chain: EvidenceRecord[] = [
  record({ recordId: "p1", phase: "proposal" }),
  record({ recordId: "a1", phase: "admission", basedOn: ["p1"] }),
  record({ recordId: "r1", phase: "receipt", basedOn: ["a1"] }),
  record({ recordId: "v1", phase: "verification", basedOn: ["r1"], verdict: "passed" }),
  record({ recordId: "l1", phase: "learning", basedOn: ["v1"] }),
];
const swap = (id: string, patch: Partial<EvidenceRecord>): EvidenceRecord[] => chain.map(r => (r.recordId === id ? { ...r, ...patch } : r));

function stringLeaves(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const member of value) stringLeaves(member, out);
  else if (value !== null && typeof value === "object") for (const member of Object.values(value as Record<string, unknown>)) stringLeaves(member, out);
  return out;
}

test("a live chain of five separate records, each from its own authority and citing its predecessor, validates", () => {
  const result = validateEvidenceChain(chain);
  assert.equal(result.schema, "mw.evidence-chain.v0");
  assert.equal(result.subject, "cand:7");
  assert.equal(result.ok, true);
  assert.deepEqual(result.refusals, []);
  assert.deepEqual(result.phases, { proposal: ["p1"], admission: ["a1"], receipt: ["r1"], verification: ["v1"], learning: ["l1"] });
});

test("each phase has its own authority: a receipt a policy wrote, or an admission a verifier wrote, is refused", () => {
  const result = validateEvidenceChain(swap("r1", { authority: "policy" }).map(r => (r.recordId === "a1" ? { ...r, authority: "verifier" as const } : r)));
  assert.equal(result.ok, false);
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_AUTHORITY_MISMATCH", "a1"], ["EVIDENCE_AUTHORITY_MISMATCH", "r1"]]);
  assert.match(result.refusals[1]!.detail, /receipt .*native/);
});

test("phases follow in order by citation: a verification citing the proposal, or learning citing the receipt, skips a phase", () => {
  const skipped = validateEvidenceChain(swap("v1", { basedOn: ["p1"] }).map(r => (r.recordId === "l1" ? { ...r, basedOn: ["r1"] } : r)));
  assert.deepEqual(skipped.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_PHASE_ORDER", "l1"], ["EVIDENCE_PHASE_ORDER", "v1"]]);
  assert.match(skipped.refusals[1]!.detail, /receipt/);
  const foreign = validateEvidenceChain(swap("a1", { basedOn: ["p1", "p-other"] }));
  assert.deepEqual(foreign.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_CITATION_UNKNOWN", "a1"]]);
  const dangling = validateEvidenceChain(chain.filter(r => r.recordId !== "r1"));
  assert.deepEqual(dangling.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_CITATION_UNKNOWN", "v1"]]);
});

test("never fabricate PASS: a passed verification needs a live native receipt; a fixture or replay receipt backs only failure or indeterminacy", () => {
  const fixture = validateEvidenceChain(swap("r1", { mode: "fixture" }).map(r => (r.recordId === "v1" || r.recordId === "l1" ? { ...r, mode: "fixture" as const } : r)));
  assert.deepEqual(fixture.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_PASS_FABRICATED", "v1"]]);
  const replayFailed = validateEvidenceChain(swap("r1", { mode: "replay" }).map(r => (r.recordId === "v1" ? { ...r, mode: "replay" as const, verdict: "failed" as const } : r)).map(r => (r.recordId === "l1" ? { ...r, mode: "replay" as const } : r)));
  assert.equal(replayFailed.ok, true);
  const fixtureIndeterminate = validateEvidenceChain(chain.map(r => ({ ...r, mode: "fixture" as const })).map(r => (r.recordId === "v1" ? { ...r, verdict: "indeterminate" as const } : r)));
  assert.equal(fixtureIndeterminate.ok, true);
});

test("a record's mode never exceeds the mode of what it cites: a live verification over a replay receipt is an upgrade", () => {
  const result = validateEvidenceChain(swap("r1", { mode: "replay" }).map(r => (r.recordId === "v1" ? { ...r, verdict: "failed" as const } : r)));
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_MODE_UPGRADE", "v1"]]);
  assert.match(result.refusals[0]!.detail, /replay/);
  assert.match(result.refusals[0]!.detail, /live/);
});

test("phases are separate records: a relabelled copy (same digest) or a reused record id collapses two phases, and verdicts live only in verification", () => {
  const relabelled = validateEvidenceChain(swap("r1", { digest: "sha256:p1" }));
  assert.deepEqual(relabelled.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_PHASE_COLLAPSED", "r1"]]);
  const reused = validateEvidenceChain(chain.map(r => (r.recordId === "a1" ? { ...r, recordId: "p1", basedOn: ["p1"] } : r)).map(r => (r.recordId === "r1" ? { ...r, basedOn: ["p1"] } : r)));
  assert.deepEqual(reused.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_PHASE_COLLAPSED", "p1"], ["EVIDENCE_PHASE_ORDER", "p1"]]);
  const misplaced = validateEvidenceChain(swap("p1", { verdict: "passed" }).map(r => (r.recordId === "v1" ? (({ verdict: _v, ...rest }) => rest)(r) : r)));
  assert.deepEqual(misplaced.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_VERDICT_MISSING", "v1"], ["EVIDENCE_VERDICT_OUT_OF_PHASE", "p1"]]);
});

test("the validation is deterministic, pure, mints no identifier and refuses a chain spanning two subjects", () => {
  const owned = [...chain];
  const ids = owned.map(r => r.recordId);
  assert.notDeepEqual(ids, [...ids].sort(), "the array under test must start out of record-id order, or an in-place sort would be invisible");
  const before = JSON.stringify(owned);
  const forward = validateEvidenceChain(owned);
  const backward = validateEvidenceChain([...owned].reverse());
  assert.equal(JSON.stringify(owned), before);
  assert.deepEqual(owned.map(r => r.recordId), ids);
  assert.equal(JSON.stringify(backward), JSON.stringify(forward));
  const known = new Set([...stringLeaves(chain), forward.schema]);
  for (const leaf of stringLeaves(forward.phases)) assert.ok(known.has(leaf), `minted ${leaf}`);
  const mixed = validateEvidenceChain(swap("l1", { subject: "cand:8" }));
  assert.deepEqual(mixed.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_SUBJECT_MISMATCH", "l1"]]);
  assert.throws(() => validateEvidenceChain([]), /EVIDENCE_CHAIN_EMPTY/);
});

const receipt2 = (overrides: Partial<EvidenceRecord> = {}): EvidenceRecord => record({ recordId: "r2", phase: "receipt", basedOn: ["a1"], ...overrides });
/** The base chain with a second receipt r2 ahead of r1 in the input; the verification cites both receipts. */
function twoReceipts(receiptPatch: Partial<EvidenceRecord>, verificationPatch: Partial<EvidenceRecord>, learningPatch: Partial<EvidenceRecord> = {}): EvidenceRecord[] {
  const records = [...chain];
  records.splice(2, 0, receipt2(receiptPatch));
  return records.map(r => (r.recordId === "v1" ? { ...r, basedOn: ["r1", "r2"], ...verificationPatch } : r.recordId === "l1" ? { ...r, ...learningPatch } : r));
}
const codes = (records: readonly EvidenceRecord[]): string[][] => validateEvidenceChain(records).refusals.map(r => [r.code, r.recordId]);

test("a passed verification over a replay receipt is fabricated, not merely over a fixture one", () => {
  const replay = swap("r1", { mode: "replay" }).map(r => (r.recordId === "v1" || r.recordId === "l1" ? { ...r, mode: "replay" as const } : r));
  assert.deepEqual(codes(replay), [["EVIDENCE_PASS_FABRICATED", "v1"]]);
  assert.match(validateEvidenceChain(replay).refusals[0]!.detail, /fixture or replay receipt backs only failure or indeterminacy/);
});

test("a passed verification citing a live and a fixture receipt is fabricated: every cited receipt must be live", () => {
  const mixed = twoReceipts({ mode: "fixture" }, { mode: "fixture" }, { mode: "fixture" });
  assert.deepEqual(codes(mixed), [["EVIDENCE_PASS_FABRICATED", "v1"]]);
});

test("the mode ceiling is the lowest cited mode: a failed live verification citing a live and a fixture receipt is an upgrade that names the fixture one", () => {
  const result = validateEvidenceChain(twoReceipts({ mode: "fixture" }, { verdict: "failed" }));
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_MODE_UPGRADE", "v1"]]);
  assert.match(result.refusals[0]!.detail, /cites receipt r2 of mode fixture/);
});

test("modes rank fixture below replay below live: a replay receipt over a fixture admission is an upgrade", () => {
  const result = validateEvidenceChain(swap("a1", { mode: "fixture" }).map(r => (r.recordId === "r1" || r.recordId === "l1" ? { ...r, mode: "replay" as const } : r.recordId === "v1" ? { ...r, mode: "replay" as const, verdict: "failed" as const } : r)));
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_MODE_UPGRADE", "r1"]]);
  assert.match(result.refusals[0]!.detail, /receipt r1 is replay but cites admission a1 of mode fixture/);
});

test("the chain subject is the earliest phase's, so an admission about another subject is the one refused", () => {
  const result = validateEvidenceChain(swap("a1", { subject: "cand:8" }));
  assert.equal(result.subject, "cand:7");
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_SUBJECT_MISMATCH", "a1"]]);
  assert.match(result.refusals[0]!.detail, /is about cand:8, the chain is about cand:7/);
});

test("refusals of one code order by record id, however the collapses were found: a digest collapse (a1) precedes a reused-id collapse (r1)", () => {
  const mixed: EvidenceRecord[] = [
    record({ recordId: "p1", phase: "proposal" }),
    record({ recordId: "a1", phase: "admission", basedOn: ["p1"], digest: "sha256:p1" }),
    record({ recordId: "r1", phase: "receipt", basedOn: ["a1"] }),
    record({ recordId: "r1", phase: "verification", basedOn: ["r1"], verdict: "passed", digest: "sha256:v-r1" }),
    record({ recordId: "l1", phase: "learning", basedOn: ["r1"] }),
  ];
  const result = validateEvidenceChain(mixed);
  assert.deepEqual(result.refusals.map(r => [r.code, r.recordId]), [["EVIDENCE_PHASE_COLLAPSED", "a1"], ["EVIDENCE_PHASE_COLLAPSED", "r1"], ["EVIDENCE_PHASE_ORDER", "r1"]]);
});

test("a phase holding two records lists them in record-id order whichever order they arrive in", () => {
  const forward = validateEvidenceChain(twoReceipts({}, {}));
  const reversed = validateEvidenceChain([...twoReceipts({}, {})].reverse());
  assert.equal(forward.ok, true);
  assert.deepEqual(forward.phases.receipt, ["r1", "r2"]);
  assert.deepEqual(reversed.phases.receipt, ["r1", "r2"]);
  assert.equal(JSON.stringify(reversed), JSON.stringify(forward));
});
