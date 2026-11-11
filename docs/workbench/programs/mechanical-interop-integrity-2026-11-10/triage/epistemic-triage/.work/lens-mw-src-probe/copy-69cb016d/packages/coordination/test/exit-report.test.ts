import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exportExitReport, exitReportBytes, labelExitReport, UNKNOWN, digest, canonicalJson } from "../dist/index.js";
import type { ExitReportInputs, EvaluationReport } from "../dist/index.js";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, "../../../qa/integration/python-consumer/fixtures");
const evaluation = JSON.parse(readFileSync(join(fixtures, "evaluation-holdout-split.json"), "utf8")) as EvaluationReport;
const pinnedPath = join(fixtures, "exit-report-fixture-only.json");

const COMMIT = "6fbc5eaf8a84371d2252551c86752a07c5e53b7f";
const NO_COMMIT_RISK = "no commit provenance backs a fixture-only record: the commit is unknown";
const full: ExitReportInputs = {
  commit: COMMIT,
  scenarios: [{ id: "evaluation-holdout-split", seeds: [5, 6, 7, 8, 9, 10, 11, 12] }, { id: "quorum-evidence-independent", seeds: [7] }],
  models: [{ role: "policy-reference", model: "fixed-checked@1", checkpoint: "sha256:" + "a".repeat(64) }, { role: "policy-baseline", model: "fixed-baseline@1" }],
  nativeRevisions: [
    { system: "forge", revision: "0.9.1", receiptIds: ["op-2e8f09939583468fb22e23161f3c18f3", "cmd_29e90f7edf38"] },
    { system: "rf", receiptIds: [] },
  ],
  evidence: [
    { claim: "checked policy beats baseline", expected: "uplift above zero on aggregate", observed: "uplift above zero on aggregate", mode: "fixture", receiptIds: ["fixture-1"] },
    { claim: "native Forge gate", expected: "verdict PASS", mode: "live", receiptIds: ["op-2e8f09939583468fb22e23161f3c18f3"] },
  ],
  evaluation,
  failedCases: [{ id: "landing-queue/5", environment: "landing-queue", seed: 5, reason: "fifo-landing missed the deadline" }],
  profiler: [{ name: "evaluate.wallMicro", valueMicro: 1234000 }],
  residualRisks: ["no live HyperUnix witness", "single bootstrap seed"],
  liveWitness: { available: true, reference: "op-2e8f09939583468fb22e23161f3c18f3" },
  authorityCheck: { available: true },
};

const refusal = (fn: () => unknown, code: string): void => assert.throws(fn, (error: unknown) => error instanceof Error && error.message.startsWith(code + ":"));

test("an empty input reports every template field as the unknown literal and is marked incomplete", () => {
  const report = exportExitReport({});
  assert.equal(report.schema, "mw.exit-report.v1");
  for (const field of ["mode", "commit", "scenarios", "models", "nativeRevisions", "evidence", "evaluation", "failedCases", "profiler", "residualRisks", "liveWitness", "authorityCheck"] as const) {
    assert.equal(report[field], UNKNOWN, field);
  }
  assert.equal(report.milestone.status, "incomplete");
  assert.deepEqual(report.milestone.reasons, ["AUTHORITY_CHECK_UNAVAILABLE", "EVIDENCE_UNKNOWN", "LIVE_WITNESS_UNAVAILABLE", "MODE_NOT_LIVE"]);
});

test("profiler data is the unknown literal when absent and is carried in integer micro-units when given", () => {
  assert.equal(exportExitReport({ ...full, profiler: undefined }).profiler, UNKNOWN);
  assert.deepEqual(exportExitReport(full).profiler, [{ name: "evaluate.wallMicro", valueMicro: 1234000 }]);
  assert.deepEqual(exportExitReport({ ...full, profiler: [] }).profiler, []);
});

test("absent member values inside a given section are the unknown literal, never omitted or null", () => {
  const report = exportExitReport(full);
  assert.deepEqual(report.models, [
    { role: "policy-reference", model: "fixed-checked@1", checkpoint: "sha256:" + "a".repeat(64) },
    { role: "policy-baseline", model: "fixed-baseline@1", checkpoint: UNKNOWN },
  ]);
  assert.equal((report.nativeRevisions as readonly { revision: string }[])[1]!.revision, UNKNOWN);
  assert.equal((report.evidence as readonly { observed: string }[])[1]!.observed, UNKNOWN);
  assert.equal((report.failedCases as readonly { receiptId: string }[])[0]!.receiptId, UNKNOWN);
  assert.equal((report.liveWitness as { available: boolean; reference: string }).reference, "op-2e8f09939583468fb22e23161f3c18f3");
  assert.equal((report.authorityCheck as { reference: string }).reference, UNKNOWN);
});

test("native receipt ids and revisions are retained verbatim and in the given order", () => {
  const report = exportExitReport(full);
  assert.deepEqual(report.nativeRevisions, [
    { system: "forge", revision: "0.9.1", receiptIds: ["op-2e8f09939583468fb22e23161f3c18f3", "cmd_29e90f7edf38"] },
    { system: "rf", revision: UNKNOWN, receiptIds: [] },
  ]);
  assert.deepEqual((report.evidence as readonly { receiptIds: readonly string[] }[])[1]!.receiptIds, ["op-2e8f09939583468fb22e23161f3c18f3"]);
});

test("mode labels are copied verbatim and the report mode is the lowest label present: a fixture never rides into a live report", () => {
  assert.equal(exportExitReport(full).mode, "fixture");
  const liveOnly = exportExitReport({ evidence: [{ claim: "c", expected: "e", observed: "o", mode: "live", receiptIds: ["r"] }] });
  assert.equal(liveOnly.mode, "live");
  assert.deepEqual((liveOnly.evidence as readonly { mode: string }[]).map(row => row.mode), ["live"]);
  const replayAndLive = exportExitReport({ evidence: [
    { claim: "a", expected: "e", observed: "o", mode: "live", receiptIds: [] },
    { claim: "b", expected: "e", observed: "o", mode: "replay", receiptIds: [] },
  ] });
  assert.equal(replayAndLive.mode, "replay");
  const withFixtureEvaluation = exportExitReport({ evidence: [{ claim: "a", expected: "e", observed: "o", mode: "live", receiptIds: [] }], evaluation });
  assert.equal(withFixtureEvaluation.mode, "fixture", "an embedded fixture evaluation lowers the report to fixture");
  refusal(() => exportExitReport({ evidence: [{ claim: "a", expected: "e", observed: "o", mode: "real", receiptIds: [] }] }), "EXIT_REPORT_MODE_INVALID");
  refusal(() => exportExitReport({ evaluation: { ...evaluation, mode: "live" as never, reportDigest: evaluation.reportDigest } }), "EXIT_REPORT_EVALUATION_DIGEST_MISMATCH");
});

test("labelExitReport refuses every label but the one the evidence supports", () => {
  const report = exportExitReport(full);
  assert.equal(labelExitReport(report, "fixture"), report);
  refusal(() => labelExitReport(report, "live"), "EXIT_REPORT_MODE_UPGRADE_FORBIDDEN");
  refusal(() => labelExitReport(report, "replay"), "EXIT_REPORT_MODE_UPGRADE_FORBIDDEN");
  refusal(() => labelExitReport(exportExitReport({}), "fixture"), "EXIT_REPORT_MODE_UPGRADE_FORBIDDEN");
  refusal(() => labelExitReport(report, "real"), "EXIT_REPORT_MODE_INVALID");
});

test("a milestone is complete only with a live witness, an authority check, known evidence and a live report mode", () => {
  const live: ExitReportInputs = { ...full, evidence: [{ claim: "c", expected: "e", observed: "o", mode: "live", receiptIds: ["r"] }], evaluation: undefined };
  const complete = exportExitReport(live);
  assert.deepEqual(complete.milestone, { status: "complete", reasons: [] });
  assert.deepEqual(exportExitReport({ ...live, liveWitness: { available: false } }).milestone, { status: "incomplete", reasons: ["LIVE_WITNESS_UNAVAILABLE"] });
  assert.deepEqual(exportExitReport({ ...live, authorityCheck: { available: false } }).milestone, { status: "incomplete", reasons: ["AUTHORITY_CHECK_UNAVAILABLE"] });
  assert.deepEqual(exportExitReport({ ...live, liveWitness: undefined, authorityCheck: undefined }).milestone.reasons, ["AUTHORITY_CHECK_UNAVAILABLE", "LIVE_WITNESS_UNAVAILABLE"]);
  // A claimed live witness cannot rescue a report whose evidence is only a fixture.
  assert.deepEqual(exportExitReport(full).milestone, { status: "incomplete", reasons: ["MODE_NOT_LIVE"] });
});

test("the embedded evaluation keeps its digest, partition hash and every comparison interval", () => {
  const report = exportExitReport(full);
  const summary = report.evaluation as { reportDigest: string; partitionHash: string; mode: string; comparisons: readonly unknown[]; configurations: readonly { id: string }[] };
  assert.equal(summary.reportDigest, evaluation.reportDigest);
  assert.equal(summary.partitionHash, evaluation.partition.hash);
  assert.equal(summary.mode, "fixture");
  assert.deepEqual(summary.comparisons, evaluation.comparisons);
  assert.deepEqual(summary.configurations.map(c => c.id), evaluation.configurations.map(c => c.id));
  const tampered = { ...evaluation, comparisons: evaluation.comparisons.map((row, index) => (index === 0 ? { ...row, deltaMicro: row.deltaMicro + 1 } : row)) };
  refusal(() => exportExitReport({ ...full, evaluation: tampered }), "EXIT_REPORT_EVALUATION_DIGEST_MISMATCH");
});

test("a non-integer number anywhere in the inputs is refused with its path; booleans and strings pass", () => {
  refusal(() => exportExitReport({ ...full, profiler: [{ name: "p", valueMicro: 1.5 }] }), "EXIT_REPORT_NON_INTEGER");
  refusal(() => exportExitReport({ ...full, scenarios: [{ id: "s", seeds: [1, Number.NaN] }] }), "EXIT_REPORT_NON_INTEGER");
  assert.throws(() => exportExitReport({ ...full, profiler: [{ name: "p", valueMicro: 0.25 }] }), /profiler\[0\]\.valueMicro/);
});

test("a commit that is not a 40 hex sha and a duplicate scenario id are refused", () => {
  refusal(() => exportExitReport({ commit: "6fbc5ea" }), "EXIT_REPORT_COMMIT_INVALID");
  refusal(() => exportExitReport({ commit: COMMIT.toUpperCase() }), "EXIT_REPORT_COMMIT_INVALID");
  refusal(() => exportExitReport({ scenarios: [{ id: "a", seeds: [1] }, { id: "a", seeds: [2] }] }), "EXIT_REPORT_DUPLICATE_SCENARIO");
});

test("the commit must be exactly 40 lowercase hex characters: class, both length bounds, both anchors, uppercase, whitespace, empty and trailing newline are refused with the exact interpolated message", () => {
  const hex39 = COMMIT.slice(0, 39);
  for (const bad of [`${hex39}g`, `${COMMIT}0`, `${COMMIT}00`, `0${COMMIT}`, hex39, COMMIT.toUpperCase(), ` ${COMMIT}`, "", `${COMMIT}\n`]) {
    refusal(() => exportExitReport({ commit: bad }), "EXIT_REPORT_COMMIT_INVALID");
    assert.throws(
      () => exportExitReport({ commit: bad }),
      (error: unknown) => error instanceof RangeError && error.message === `EXIT_REPORT_COMMIT_INVALID: ${bad} is not a 40 hex sha`,
      JSON.stringify(bad),
    );
  }
  assert.equal(exportExitReport({ commit: COMMIT }).commit, COMMIT);
});

const exactRangeError = (fn: () => unknown, message: string): void =>
  assert.throws(fn, (error: unknown) => error instanceof RangeError && error.message === message, message);

test("a mode outside fixture, replay and live is a RangeError with the full message, from an evidence row and from labelling", () => {
  const bad = { claim: "c", expected: "e", mode: "bogus" as unknown as "live", receiptIds: ["r"] };
  exactRangeError(() => exportExitReport({ evidence: [bad] }), 'EXIT_REPORT_MODE_INVALID: evidence "c" mode bogus is not fixture, replay or live');
  exactRangeError(() => labelExitReport(exportExitReport({}), "bogus"), "EXIT_REPORT_MODE_INVALID: label mode bogus is not fixture, replay or live");
  const bogusEvaluation = { ...evaluation, mode: "bogus" as unknown as "fixture" };
  const bogusBody = Object.fromEntries(Object.entries(bogusEvaluation).filter(([name]) => name !== "reportDigest"));
  exactRangeError(() => exportExitReport({ evaluation: { ...bogusEvaluation, reportDigest: digest(bogusBody) } }), "EXIT_REPORT_MODE_INVALID: evaluation mode bogus is not fixture, replay or live");
});

test("a non-integer number is a RangeError whose message names its full path and value", () => {
  exactRangeError(
    () => exportExitReport({ ...full, profiler: [{ name: "p", valueMicro: 1.5 }] }),
    "EXIT_REPORT_NON_INTEGER: inputs.profiler[0].valueMicro is 1.5; the report carries integers and micro-units only",
  );
  exactRangeError(
    () => exportExitReport({ scenarios: [{ id: "s", seeds: [1, Number.NaN] }] }),
    "EXIT_REPORT_NON_INTEGER: inputs.scenarios[0].seeds[1] is NaN; the report carries integers and micro-units only",
  );
});

test("an evaluation that does not hash to its own reportDigest is a RangeError that names that digest", () => {
  const tampered = { ...evaluation, comparisons: evaluation.comparisons.map((row, index) => (index === 0 ? { ...row, deltaMicro: row.deltaMicro + 1 } : row)) };
  exactRangeError(
    () => exportExitReport({ evaluation: tampered }),
    `EXIT_REPORT_EVALUATION_DIGEST_MISMATCH: the evaluation report does not hash to its own reportDigest ${evaluation.reportDigest}`,
  );
});

test("a duplicate scenario id is a RangeError listing each repeated id once, in first-repeat order", () => {
  exactRangeError(() => exportExitReport({ scenarios: [{ id: "a", seeds: [1] }, { id: "a", seeds: [2] }] }), "EXIT_REPORT_DUPLICATE_SCENARIO: a");
  const ids = ["a", "b", "a", "b", "a", "c"];
  exactRangeError(() => exportExitReport({ scenarios: ids.map(id => ({ id, seeds: [1] })) }), "EXIT_REPORT_DUPLICATE_SCENARIO: a,b");
  exactRangeError(() => exportExitReport({ scenarios: ["a", "b", "b", "a"].map(id => ({ id, seeds: [1] })) }), "EXIT_REPORT_DUPLICATE_SCENARIO: b,a");
});

test("the report is pure, deterministic and digest-pinned over its own content; inputs are not mutated", () => {
  const before = canonicalJson(full);
  const report = exportExitReport(full);
  assert.equal(canonicalJson(full), before);
  assert.equal(exitReportBytes(report), exitReportBytes(exportExitReport(full)));
  const { reportDigest, ...body } = report;
  assert.equal(reportDigest, digest(body));
  assert.notEqual(exportExitReport({ ...full, residualRisks: ["different"] }).reportDigest, reportDigest);
  assert.equal(exitReportBytes(report), canonicalJson(report) + "\n");
  const walk = (value: unknown): void => {
    if (typeof value === "number") assert.ok(Number.isInteger(value), `non-integer ${value}`);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value !== null && typeof value === "object") Object.values(value).forEach(walk);
    else assert.notEqual(value, null);
  };
  walk(report);
});

test("the committed fixture is byte-identical to the report the generator exports for the fixture-only inputs", () => {
  assert.equal(readFileSync(pinnedPath, "utf8"), exitReportBytes(exportExitReport(pinnedInputs())));
});

test("the committed fixture-only record declares no commit because no evidence was gathered at any commit", () => {
  const pinned = JSON.parse(readFileSync(pinnedPath, "utf8")) as { mode: string; commit: string; residualRisks: readonly string[] };
  assert.equal(pinned.mode, "fixture");
  assert.equal(pinned.commit, UNKNOWN);
  assert.ok(pinned.residualRisks.includes(NO_COMMIT_RISK));
  assert.equal(pinnedInputs().commit, undefined);
});

function pinnedInputs(): ExitReportInputs {
  return {
    scenarios: [{ id: "evaluation-holdout-split", seeds: evaluation.partition.holdOut }],
    models: [{ role: "policy-reference", model: "fixed-baseline@1" }, { role: "policy-candidate", model: "fixed-checked@1" }],
    nativeRevisions: [{ system: "forge", revision: "unpinned", receiptIds: [] }],
    evidence: [{ claim: "fixed-checked completes more validated work than fixed-baseline on aggregate", expected: "aggregate uplift whose interval excludes zero", observed: "see evaluation.comparisons", mode: "fixture", receiptIds: [evaluation.reportDigest] }],
    evaluation,
    failedCases: [],
    profiler: undefined,
    residualRisks: ["fixture-only evidence: no live witness", "no native receipt backs this report", NO_COMMIT_RISK],
    liveWitness: { available: false },
    authorityCheck: { available: false },
  };
}
