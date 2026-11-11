import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyRenderPressure, observeRenderWorkload, summarizeWorkload } from "../dist/rf-workload.js";
import type { PressureClass, WorkloadSample } from "../dist/rf-workload.js";

// RFCA-MWX04-R001 (MechanicalWorkflows-xyr3i). Every envelope under test/fixtures/rf-workload is either
// captured from installed rf 0.1.883 (success-attempts-1) or hand-derived (the rest); each carries a
// fixture_provenance field saying which. A fixture result never counts as a native PASS: this suite
// proves the pure observe/classify/summarize laws, not any live rf behaviour.
const here = dirname(fileURLToPath(import.meta.url));
const fixture = (name: string): Record<string, unknown> =>
  JSON.parse(readFileSync(join(here, "fixtures", "rf-workload", name), "utf8")) as Record<string, unknown>;
const diagnosticsOf = (envelope: Record<string, unknown>): unknown[] => envelope["diagnostics"] as unknown[];

test("observeRenderWorkload reads the captured success envelope verbatim: wall_ms 12253, attempts 1, no superseded rounds", () => {
  const envelope = fixture("success-attempts-1.json");
  assert.match(String(envelope["fixture_provenance"]), /never counts as a native PASS/);
  const observed = observeRenderWorkload(envelope);
  assert.equal(observed.wallMs, 12253);
  assert.equal(observed.attempts, 1);
  assert.equal(observed.retried, false);
  assert.deepEqual(observed.supersededTransactionIds, []);
  assert.equal(observed.commitSeq, 79392);
  assert.equal(observed.status, "success");
  assert.equal(observed.committed, true);
});

test("an attempts-2 envelope reports retried true and the superseded transaction id verbatim", () => {
  const observed = observeRenderWorkload(fixture("derived-attempts-2.json"));
  assert.equal(observed.attempts, 2);
  assert.equal(observed.retried, true);
  assert.deepEqual(observed.supersededTransactionIds, ["rft_hand_derived_superseded_round_1"]);
  assert.equal(observed.wallMs, 20500);
});

test("every absent field is the literal unknown, never 0 or an invented default", () => {
  const observed = observeRenderWorkload({ ok: true, result: {} });
  for (const field of ["wallMs", "attempts", "retried", "supersededTransactionIds", "commitSeq", "status", "committed"] as const)
    assert.equal(observed[field], "unknown", field);
  const bad = observeRenderWorkload({ ok: true, result: { wall_ms: -1, attempts: 0, commit_seq: 1.5, status: "", superseded_transaction_ids: [1] } });
  assert.equal(bad.wallMs, "unknown");
  assert.equal(bad.attempts, "unknown");
  assert.equal(bad.commitSeq, "unknown");
  assert.equal(bad.status, "unknown");
  assert.equal(bad.supersededTransactionIds, "unknown");
});

test("a failed envelope carries no result: its fields are unknown and it is not a committed render", () => {
  const observed = observeRenderWorkload(fixture("failure-lock-timeout.json"));
  assert.equal(observed.wallMs, "unknown");
  assert.equal(observed.attempts, "unknown");
  assert.equal(observed.committed, false);
});

test("RF_WORKLOAD_ENVELOPE_INVALID refuses a non-object envelope and an ok envelope without a result object", () => {
  for (const value of [null, undefined, "x", 3, [], { ok: true }, { ok: true, result: [] }, { ok: true, result: "s" }])
    assert.throws(() => observeRenderWorkload(value), /^Error: RF_WORKLOAD_ENVELOPE_INVALID/, JSON.stringify(value));
});

test("exit code alone never decides: the same exit 4 splits by diagnostic code into workload_pressure and currentness_conflict", () => {
  const lock = classifyRenderPressure(4, diagnosticsOf(fixture("failure-lock-timeout.json")));
  const conflict = classifyRenderPressure(4, diagnosticsOf(fixture("failure-currentness-conflict.json")));
  assert.deepEqual(lock, { pressure: "workload_pressure", code: "RF_STORAGE_LOCK_TIMEOUT" });
  assert.deepEqual(conflict, { pressure: "currentness_conflict", code: "RF_CURRENTNESS_CONFLICT" });
  // an error message that names the other class must not move the verdict: code decides, never text
  const lying = [{ code: "RF_STORAGE_LOCK_TIMEOUT", message: "RF_CURRENTNESS_CONFLICT basis moved" }];
  assert.equal(classifyRenderPressure(4, lying).pressure, "workload_pressure");
});

test("the full code vocabulary maps by code", () => {
  const expected: ReadonlyArray<readonly [number, string, PressureClass]> = [
    [4, "RF_STORAGE_LOCK_TIMEOUT", "workload_pressure"],
    [6, "RF_STORAGE_NETWORK_TIMEOUT", "workload_pressure"],
    [4, "RF_CURRENTNESS_CONFLICT", "currentness_conflict"],
    [4, "RF_PUBLICATION_HEAD_CONFLICT", "currentness_conflict"],
    [4, "RF_IDEMPOTENCY_KEY_CONFLICT", "currentness_conflict"],
    [4, "RF_GRAPH_OVERLAY_REVISION_CONFLICT", "currentness_conflict"],
    [4, "RF_CONFIG_REVISION_CONFLICT", "currentness_conflict"],
    [4, "RF_COMPONENT_REVISION_CONFLICT", "currentness_conflict"],
    [4, "RF_SESSION_REVISION_CONFLICT", "currentness_conflict"],
    [6, "RF_STORAGE_UNAVAILABLE", "storage_unavailable"],
    [6, "RF_STORAGE_LOCK_UNSUPPORTED", "storage_unavailable"],
  ];
  for (const [exit, code, pressure] of expected)
    assert.deepEqual(classifyRenderPressure(exit, [{ code }]), { pressure, code }, `${exit} ${code}`);
});

test("an exit-6 storage code is storage_unavailable and an unknown code is unclassified with the code preserved", () => {
  assert.equal(classifyRenderPressure(6, diagnosticsOf(fixture("failure-storage-unavailable.json"))).pressure, "storage_unavailable");
  assert.deepEqual(classifyRenderPressure(4, diagnosticsOf(fixture("failure-unknown-code.json"))),
    { pressure: "unclassified", code: "RF_SOMETHING_NEW_AND_UNKNOWN" });
  // a storage-shaped code at a non-storage exit is not promoted by its prefix alone
  assert.equal(classifyRenderPressure(7, [{ code: "RF_STORAGE_UNAVAILABLE" }]).pressure, "unclassified");
  assert.deepEqual(classifyRenderPressure(4, []), { pressure: "unclassified", code: null });
  assert.deepEqual(classifyRenderPressure(4, [{ message: "no code" }, "junk", null]), { pressure: "unclassified", code: null });
});

test("exit 0 is none, and a mixed set resolves currentness_conflict over storage over pressure", () => {
  assert.deepEqual(classifyRenderPressure(0, []), { pressure: "none", code: null });
  assert.equal(classifyRenderPressure(4, [{ code: "RF_STORAGE_LOCK_TIMEOUT" }, { code: "RF_CURRENTNESS_CONFLICT" }]).pressure, "currentness_conflict");
  assert.equal(classifyRenderPressure(6, [{ code: "RF_STORAGE_LOCK_TIMEOUT" }, { code: "RF_STORAGE_UNAVAILABLE" }]).pressure, "storage_unavailable");
});

test("RF_WORKLOAD_ENVELOPE_INVALID refuses a non-integer exit code and a non-array diagnostics list", () => {
  assert.throws(() => classifyRenderPressure(1.5, []), /^Error: RF_WORKLOAD_ENVELOPE_INVALID/);
  assert.throws(() => classifyRenderPressure(-1, []), /^Error: RF_WORKLOAD_ENVELOPE_INVALID/);
  assert.throws(() => classifyRenderPressure(4, "RF_STORAGE_LOCK_TIMEOUT" as unknown as unknown[]), /^Error: RF_WORKLOAD_ENVELOPE_INVALID/);
});

function sample(name: string, exit: number): WorkloadSample {
  const envelope = fixture(name);
  return { observation: observeRenderWorkload(envelope), pressure: classifyRenderPressure(exit, diagnosticsOf(envelope)).pressure };
}

test("summarizeWorkload folds the fixture window: throughput from wall_ms sums, retry ratio, superseded count, median, histogram", () => {
  const window = [
    sample("success-attempts-1.json", 0), sample("derived-attempts-2.json", 0),
    sample("failure-lock-timeout.json", 4), sample("failure-currentness-conflict.json", 4),
  ];
  const summary = summarizeWorkload(window);
  assert.equal(summary.samples, 4);
  assert.equal(summary.committedRenders, 2);
  // wall_ms 12253 + 20500 = 32753 ms observed; 2 committed renders / 32.753 s
  assert.equal(summary.observedWallMs, 32753);
  assert.ok(Math.abs((summary.usefulCommitsPerSecond as number) - 2 / 32.753) < 1e-12);
  // attempts known for 2 of 4 samples; 1 of them retried
  assert.equal(summary.retryRatio, 0.5);
  assert.equal(summary.supersededRounds, 1);
  assert.equal(summary.maxWallMs, 20500);
  assert.equal(summary.medianWallMs, (12253 + 20500) / 2);
  assert.deepEqual(summary.pressure, { none: 2, workload_pressure: 1, currentness_conflict: 1, storage_unavailable: 0, unclassified: 0 });
});

test("a window with no wall_ms reports unknown throughput and medians rather than zero", () => {
  const summary = summarizeWorkload([sample("failure-lock-timeout.json", 4)]);
  assert.equal(summary.usefulCommitsPerSecond, "unknown");
  assert.equal(summary.retryRatio, "unknown");
  assert.equal(summary.maxWallMs, "unknown");
  assert.equal(summary.medianWallMs, "unknown");
  assert.equal(summary.supersededRounds, 0);
  assert.equal(summary.committedRenders, 0);
});

test("median over an odd number of wall_ms picks the middle value", () => {
  const one = sample("success-attempts-1.json", 0), two = sample("derived-attempts-2.json", 0);
  assert.equal(summarizeWorkload([one, two, one]).medianWallMs, 12253);
});

test("RF_WORKLOAD_WINDOW_EMPTY refuses an empty window instead of reporting zeros", () => {
  assert.throws(() => summarizeWorkload([]), /^Error: RF_WORKLOAD_WINDOW_EMPTY/);
  assert.throws(() => summarizeWorkload(undefined as unknown as WorkloadSample[]), /^Error: RF_WORKLOAD_WINDOW_EMPTY/);
});

test("the module is pure: it imports nothing, and in particular no child_process, timers or rf-context", () => {
  const source = readFileSync(join(here, "..", "src", "rf-workload.ts"), "utf8");
  const specifiers = [...source.matchAll(/(?:^|\n)\s*(?:import|export)[^;\n]*?from\s+["']([^"']+)["']/g)].map(m => m[1]);
  assert.deepEqual(specifiers, []);
  assert.doesNotMatch(source, /child_process|node:timers|setTimeout|setInterval|Date\.now|new Date|performance\.now|rf-context|\bimport\s*\(/);
});
