import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { R4_PREFLIGHT_ROWS, R4_PREFLIGHT_SCHEMA, judgeR4Preflight } from "./check-mw-r4-preflight.ts";

// MechanicalWorkflows-eor0c.2 (EAT-R056, EAT-R057 receipt half): the MW-R4 preflight-record validator. The record is produced by the
// MW-R4 run (L2); this file pins the L0 grammar only. Every fixture is an inline object, so a pass here is a validator result and never
// a native PASS, and no fixture asserts that any prerequisite is satisfied.
const checker = resolve(import.meta.dirname, "check-mw-r4-preflight.ts");
const MEASURED = "already measured at 97e18068";
const RECEIPT = { ref: "forge:operation:op-0123456789abcdef0123456789abcdef", observed_utc: "2026-11-07T10:00:00Z" };
const EXPECTED_ROWS = [
  "mw_r0_packed_artifact_confirm_gate", "mw_r1_installed_facade", "mw_r2_callback_wiring", "mw_r3_abort_effect_identity",
  "pi_function_dispatch", "pi_worktree_preservation_repair", "pi_detached_grants_repair", "environment_capabilities",
];

type Json = Record<string, unknown>;
function record(overrides: Json = {}, rowOverrides: Record<string, Json> = {}): Json {
  const rows: Json = {};
  EXPECTED_ROWS.forEach((key, index) => { rows[key] = { status: index % 2 === 0 ? "not landed" : "not run" }; });
  for (const [key, value] of Object.entries(rowOverrides)) rows[key] = value;
  return {
    schema: "mw.r4-preflight.v1",
    program: "pi-workbench-interoperability-audit-2026-11-06",
    declared_utc: "2026-11-07T09:00:00Z",
    pins: { mw: "b4c3d32592f7a62c1588960d9439aea7193354a2", pi: "0".repeat(40) },
    rows,
    ...overrides,
  };
}
const receipted = (): Json => ({ status: "receipt", receipt: { ...RECEIPT } });
function allReceipted(overrides: Json = {}): Json {
  const rows: Record<string, Json> = {};
  for (const key of EXPECTED_ROWS) rows[key] = receipted();
  return record(overrides, rows);
}
const judge = (value: unknown) => judgeR4Preflight(value);
const codes = (value: unknown) => [...new Set(judge(value).refusals.map(r => r.code))].sort();
const subjectsOf = (value: unknown, code: string) => judge(value).refusals.filter(r => r.code === code).map(r => r.subject).sort();
function withoutRow(value: Json, key: string): Json {
  const copy = structuredClone(value) as Json;
  delete (copy.rows as Json)[key];
  return copy;
}

test("the closed row set names the eight prerequisites in requirement order", () => {
  assert.deepEqual([...R4_PREFLIGHT_ROWS], EXPECTED_ROWS);
  assert.equal(R4_PREFLIGHT_SCHEMA, "mw.r4-preflight.v1");
});

test("a complete honest record with every row not landed or not run and no marker judges ok", () => {
  assert.deepEqual(judge(record()), { ok: true, refusals: [] });
});

test("a record with every row receipted and the marker set judges ok", () => {
  assert.deepEqual(judge(allReceipted({ joint_run: { marker: true } })), { ok: true, refusals: [] });
});

test("a record that is not an object, or lacks a grammar field, names R4_PREFLIGHT_FIELD_MISSING", () => {
  assert.deepEqual(codes("text"), ["R4_PREFLIGHT_FIELD_MISSING"]);
  assert.deepEqual(codes(null), ["R4_PREFLIGHT_FIELD_MISSING"]);
  for (const [path, mutate] of [
    ["schema", (r: Json) => { delete r.schema; }],
    ["program", (r: Json) => { r.program = "  "; }],
    ["declared_utc", (r: Json) => { r.declared_utc = "yesterday"; }],
    ["pins.mw", (r: Json) => { delete (r.pins as Json).mw; }],
    ["pins.pi", (r: Json) => { (r.pins as Json).pi = ""; }],
    ["rows", (r: Json) => { delete r.rows; }],
  ] as const) {
    const copy = record();
    mutate(copy);
    assert.ok(subjectsOf(copy, "R4_PREFLIGHT_FIELD_MISSING").includes(path), `${path} must be named`);
  }
  assert.ok(subjectsOf(record({ schema: "mw.r4-preflight.v2" }), "R4_PREFLIGHT_FIELD_MISSING").includes("schema"));
});

test("each of the eight rows removed names R4_PREFLIGHT_ROW_MISSING with that key as the subject", () => {
  for (const key of EXPECTED_ROWS) {
    const verdict = judge(withoutRow(record(), key));
    assert.equal(verdict.ok, false, key);
    assert.deepEqual(subjectsOf(withoutRow(record(), key), "R4_PREFLIGHT_ROW_MISSING"), [key]);
  }
});

test("an unknown ninth row key is refused as R4_PREFLIGHT_ROW_MISSING naming the unknown key", () => {
  const verdict = record({}, { extra_prerequisite: { status: "not run" } });
  assert.deepEqual(subjectsOf(verdict, "R4_PREFLIGHT_ROW_MISSING"), ["extra_prerequisite"]);
  assert.equal(judge(verdict).ok, false);
});

test("a row status outside receipt, not landed and not run is refused as R4_PREFLIGHT_ROW_STATUS_UNSTATED", () => {
  for (const status of ["measured", "landed", "done", "", "Not Landed", "receipt "]) {
    const value = record({}, { mw_r1_installed_facade: { status } });
    assert.ok(subjectsOf(value, "R4_PREFLIGHT_ROW_STATUS_UNSTATED").includes("mw_r1_installed_facade"), `status ${JSON.stringify(status)}`);
  }
  const missing = record({}, { mw_r1_installed_facade: {} });
  assert.deepEqual(subjectsOf(missing, "R4_PREFLIGHT_ROW_STATUS_UNSTATED"), ["mw_r1_installed_facade"]);
});

test("status receipt without a non-blank ref and a UTC observed_utc is refused as R4_PREFLIGHT_ROW_STATUS_UNSTATED", () => {
  for (const receipt of [undefined, {}, { ref: "x" }, { observed_utc: RECEIPT.observed_utc }, { ref: " ", observed_utc: RECEIPT.observed_utc }, { ref: "x", observed_utc: "later" }]) {
    const row: Json = { status: "receipt" };
    if (receipt !== undefined) row.receipt = receipt;
    assert.deepEqual(subjectsOf(record({}, { pi_function_dispatch: row }), "R4_PREFLIGHT_ROW_STATUS_UNSTATED"), ["pi_function_dispatch"], JSON.stringify(receipt));
  }
});

test("the word measured on a row without a receipt is refused, and the same note on a receipt row is not", () => {
  const bare = record({}, { mw_r2_callback_wiring: { status: "not landed", note: MEASURED } });
  assert.deepEqual(subjectsOf(bare, "R4_PREFLIGHT_MEASURED_WITHOUT_RECEIPT"), ["mw_r2_callback_wiring"]);
  assert.equal(judge(bare).ok, false);
  const backed = record({}, { mw_r2_callback_wiring: { ...receipted(), note: MEASURED } });
  assert.deepEqual(judge(backed), { ok: true, refusals: [] });
  const nested = record({}, { mw_r2_callback_wiring: { status: "not run", detail: { lines: ["a concrete, measured figure"] } } });
  assert.deepEqual(subjectsOf(nested, "R4_PREFLIGHT_MEASURED_WITHOUT_RECEIPT"), ["mw_r2_callback_wiring"]);
  const upper = record({}, { mw_r2_callback_wiring: { status: "not run", note: "MEASURED" } });
  assert.deepEqual(subjectsOf(upper, "R4_PREFLIGHT_MEASURED_WITHOUT_RECEIPT"), ["mw_r2_callback_wiring"]);
});

test("a longer word that merely contains the stem is not the refused phrase", () => {
  const near = record({}, { mw_r2_callback_wiring: { status: "not run", note: "no measurement taken; unmeasured; measuring deferred" } });
  assert.deepEqual(judge(near), { ok: true, refusals: [] });
});

test("a run marker with one required row not run is refused as R4_PREFLIGHT_RUN_MARKER_UNEARNED naming that row", () => {
  const value = allReceipted({ joint_run: { marker: true } });
  (value.rows as Json).mw_r3_abort_effect_identity = { status: "not run" };
  assert.deepEqual(subjectsOf(value, "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["mw_r3_abort_effect_identity"]);
  assert.equal(judge(value).ok, false);
  assert.deepEqual(codes(record({ joint_run: { marker: false } })), []);
  assert.deepEqual(codes(record({ joint_run: { marker: "yes" } })), []);
});

test("the EAT-R054 ruling arm makes the worktree row optional only under the exact recorded ruling", () => {
  const rows = { pi_worktree_preservation_repair: { status: "not landed" } };
  const base = (rulings?: Json) => {
    const value = allReceipted({ joint_run: { marker: true }, ...(rulings === undefined ? {} : { rulings }) });
    (value.rows as Json).pi_worktree_preservation_repair = rows.pi_worktree_preservation_repair;
    return value;
  };
  assert.deepEqual(judge(base({ eat_r054: "shared_invariant_not_prerequisite" })), { ok: true, refusals: [] });
  assert.deepEqual(subjectsOf(base(), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_worktree_preservation_repair"]);
  assert.deepEqual(subjectsOf(base({ eat_r054: "pi_worktree_repair_is_prerequisite" }), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_worktree_preservation_repair"]);
  assert.deepEqual(subjectsOf(base({ eat_r054: "Shared_Invariant_Not_Prerequisite" }), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_worktree_preservation_repair"]);
});

test("the detached arm requires the grants row unless transport.detached is exactly false", () => {
  const base = (transport?: Json) => {
    const value = allReceipted({ joint_run: { marker: true }, ...(transport === undefined ? {} : { transport }) });
    (value.rows as Json).pi_detached_grants_repair = { status: "not landed" };
    return value;
  };
  assert.deepEqual(subjectsOf(base(), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_detached_grants_repair"]);
  assert.deepEqual(subjectsOf(base({ detached: true }), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_detached_grants_repair"]);
  assert.deepEqual(subjectsOf(base({}), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_detached_grants_repair"]);
  assert.deepEqual(subjectsOf(base({ detached: "false" }), "R4_PREFLIGHT_RUN_MARKER_UNEARNED"), ["pi_detached_grants_repair"]);
  assert.deepEqual(judge(base({ detached: false })), { ok: true, refusals: [] });
});

function runCli(args: readonly string[], script = checker) {
  const result = spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

test("the CLI exits 2 with one stderr line per refusal for a refused record and 0 without a PASS token for a clean one", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-r4-preflight-"));
  try {
    const bad = join(dir, "bad.json");
    const good = join(dir, "good.json");
    writeFileSync(bad, JSON.stringify(withoutRow(record({}, { mw_r1_installed_facade: { status: "done" } }), "pi_function_dispatch")));
    writeFileSync(good, JSON.stringify(record()));
    const refused = runCli(["--root", dir, bad]);
    assert.equal(refused.status, 2);
    const lines = refused.stderr.trim().split("\n");
    assert.equal(lines.length, 2);
    assert.match(lines.join("\n"), /R4_PREFLIGHT_ROW_MISSING: pi_function_dispatch/);
    assert.match(lines.join("\n"), /R4_PREFLIGHT_ROW_STATUS_UNSTATED: mw_r1_installed_facade/);
    const clean = runCli(["--root", dir, good]);
    assert.equal(clean.status, 0);
    assert.doesNotMatch(clean.stdout + clean.stderr, /PASS/i);
    assert.equal(clean.stderr, "");
    const unreadable = runCli(["--root", dir, join(dir, "absent.json")]);
    assert.equal(unreadable.status, 2);
    writeFileSync(join(dir, "notjson.json"), "{");
    assert.equal(runCli(["--root", dir, join(dir, "notjson.json")]).status, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("the CLI scans qa/integration/evidence for its own schema only and reports nothing when none exists", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-r4-preflight-scan-"));
  try {
    assert.equal(runCli(["--root", dir]).status, 0);
    const evidence = join(dir, "qa", "integration", "evidence");
    writeFileSync(join(dir, "placeholder"), "");
    spawnSync("mkdir", ["-p", evidence]);
    writeFileSync(join(evidence, "other.json"), JSON.stringify({ schema: "something.else", rows: {} }));
    writeFileSync(join(evidence, "z.json"), JSON.stringify(withoutRow(record(), "environment_capabilities")));
    const scanned = runCli(["--root", dir]);
    assert.equal(scanned.status, 2);
    assert.match(scanned.stderr, /qa\/integration\/evidence\/z\.json: R4_PREFLIGHT_ROW_MISSING: environment_capabilities/);
    assert.doesNotMatch(scanned.stderr, /other\.json/);
    assert.doesNotMatch(scanned.stdout + scanned.stderr, /PASS/i);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// Mutant witnesses: the same behavioural probe runs against the real script and against a copy whose source has been edited by one
// exact replacement. The probe must hold for the original and fail for the mutant, so each guarded behaviour has a witness that bites.
function mutantScript(dir: string, from: string, to: string): string {
  const source = readFileSync(checker, "utf8");
  assert.ok(source.includes(from), `mutation anchor must exist in the script: ${from}`);
  const target = join(dir, "mutant-check-mw-r4-preflight.ts");
  writeFileSync(target, source.replace(from, to));
  return target;
}
function probeRefusesUnearnedMarker(dir: string, script: string): boolean {
  const file = join(dir, "marker.json");
  const value = allReceipted({ joint_run: { marker: true } });
  (value.rows as Json).mw_r3_abort_effect_identity = { status: "not run" };
  writeFileSync(file, JSON.stringify(value));
  const result = runCli(["--root", dir, file], script);
  return result.status === 2 && /R4_PREFLIGHT_RUN_MARKER_UNEARNED: mw_r3_abort_effect_identity/.test(result.stderr);
}
function probeLeavesStemAlone(dir: string, script: string): boolean {
  const file = join(dir, "stem.json");
  writeFileSync(file, JSON.stringify(record({}, { mw_r2_callback_wiring: { status: "not run", note: "no measurement taken" } })));
  return runCli(["--root", dir, file], script).status === 0;
}

test("mutant witness: inverting the required-row check lets an unearned marker through and the marker probe catches it", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-r4-preflight-mutant-a-"));
  try {
    assert.equal(probeRefusesUnearnedMarker(dir, checker), true);
    const mutant = mutantScript(dir, ".filter(key => !receipted(record, key))", ".filter(key => receipted(record, key))");
    assert.equal(probeRefusesUnearnedMarker(dir, mutant), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("mutant witness: widening the refused phrase to its stem refuses an honest note and the stem probe catches it", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-r4-preflight-mutant-b-"));
  try {
    assert.equal(probeLeavesStemAlone(dir, checker), true);
    const mutant = mutantScript(dir, "/\\bmeasured\\b/i", "/measur/i");
    assert.equal(probeLeavesStemAlone(dir, mutant), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
