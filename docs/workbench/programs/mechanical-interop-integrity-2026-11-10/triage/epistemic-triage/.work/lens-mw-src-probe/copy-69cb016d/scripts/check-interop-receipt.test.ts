import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { INTEROP_RECEIPT_SCHEMA, judgeInteropReceipt, writeInteropReceipt } from "./check-interop-receipt.ts";

// MechanicalWorkflows-loexn.1 (EAT-R001 and EAT-R035): the per-cut receipt validator of the Pi native interoperability program.
// Every fixture below is an inline object, so a pass here is an L1 validator result and never a native PASS. The only ids that look
// native are the two real ids copied from the baseline gate that this cut records in its own receipt directory.
const checker = resolve(import.meta.dirname, "check-interop-receipt.ts");
const SHA_A = "7f3809fd8d6f20d22b9b4b81b6dfdb917bcc3c73";
const SHA_B = "b085c34ed01cb71ce0d600ac98ade7ee18e832f0";
const OP = "op-6a4f12c627b04da99ee469cb6078f905";
const CMD = "cmd_47457b608f5e";

type Json = Record<string, unknown>;
function cut(overrides: Json = {}): Json {
  return {
    schema: "mw.pi-interop-receipt.v1",
    kind: "cut",
    program: "mechanical-pi-native-interop-2026-11-09",
    packet: "M01",
    scope: "exact-tested-cut",
    status: "fail",
    evidence_tier: "L1",
    mechanical_sha: SHA_A,
    pi_sha: SHA_B,
    candidate_source_commit: null,
    candidate_source_tree: null,
    forge_manifest_sha256: null,
    descriptor_sha256: null,
    mechanical_tarball_sha256: null,
    pi_definition_digest: null,
    pi_invocation_id: null,
    claude_session_id: null,
    forge_operation_id: null,
    native_gate_verdict: "not-run",
    mechanical_outcome: "absent",
    effect_disposition: "not-started",
    commands: [{ argv: ["node", "--version"], exit: 0, output_path: "out/node.txt" }],
    negative_controls: [],
    mutants: [],
    performance: { measured: false, reason: "not-run" },
    limitations: ["no independent consumer was run"],
    ...overrides,
  };
}
function baseline(overrides: Json = {}): Json {
  return cut({
    kind: "baseline",
    packet: "M00-A",
    status: "pass",
    native_gate_verdict: "PASS",
    forge_operation_id: OP,
    baseline: {
      node_version: "v24.20.0",
      sdk_version: null,
      sdk_resolution: "not-installed in the implementing checkout",
      gates: [
        { scope: "root", command_id: CMD, operation_id: OP, verdict: "PASS" },
        { scope: "packages/development", command_id: "cmd_0aa1f2b3c4d5", operation_id: "op-1b2c3d4e5f60718293a4b5c6d7e8f901", verdict: "PASS" },
      ],
    },
    ...overrides,
  });
}
const judge = (value: unknown, expect?: { headSha?: string }) => judgeInteropReceipt(value, expect);
const codes = (value: unknown, expect?: { headSha?: string }) => [...new Set(judge(value, expect).refusals.map(r => r.code))].sort();
const subjects = (value: unknown, code: string, expect?: { headSha?: string }) => judge(value, expect).refusals.filter(r => r.code === code).map(r => r.subject).sort();

test("the schema constant and a complete honest not-run cut receipt judge ok", () => {
  assert.equal(INTEROP_RECEIPT_SCHEMA, "mw.pi-interop-receipt.v1");
  assert.deepEqual(judge(cut()), { ok: true, refusals: [] });
});

test("a complete baseline receipt with measured gates judges ok", () => {
  assert.deepEqual(judge(baseline()), { ok: true, refusals: [] });
});

test("a record that is not an object or has a wrong schema names INTEROP_RECEIPT_FIELD_MISSING", () => {
  assert.deepEqual(codes("text"), ["INTEROP_RECEIPT_FIELD_MISSING"]);
  assert.deepEqual(codes(null), ["INTEROP_RECEIPT_FIELD_MISSING"]);
  assert.ok(subjects(cut({ schema: "mw.pi-interop-receipt.v2" }), "INTEROP_RECEIPT_FIELD_MISSING").includes("schema"));
});

test("every template field removed names INTEROP_RECEIPT_FIELD_MISSING with that field as the subject", () => {
  const fields = ["program", "packet", "scope", "status", "evidence_tier", "candidate_source_commit", "candidate_source_tree", "forge_manifest_sha256", "descriptor_sha256", "mechanical_tarball_sha256", "pi_definition_digest", "pi_invocation_id", "claude_session_id", "forge_operation_id", "mechanical_outcome", "effect_disposition", "commands", "negative_controls", "mutants", "performance"];
  for (const field of fields) {
    const copy = cut();
    delete copy[field];
    assert.ok(subjects(copy, "INTEROP_RECEIPT_FIELD_MISSING").includes(field), field);
  }
  assert.ok(subjects(cut({ status: "maybe" }), "INTEROP_RECEIPT_FIELD_MISSING").includes("status"));
  assert.ok(subjects(cut({ evidence_tier: "L9" }), "INTEROP_RECEIPT_FIELD_MISSING").includes("evidence_tier"));
  assert.ok(subjects(cut({ effect_disposition: "done" }), "INTEROP_RECEIPT_FIELD_MISSING").includes("effect_disposition"));
});

test("a missing, blank, malformed or assumed mechanical_sha or pi_sha names INTEROP_RECEIPT_SHA_INVALID", () => {
  for (const field of ["mechanical_sha", "pi_sha"]) {
    for (const value of [undefined, "", "assumed", "7f3809fd", SHA_A.toUpperCase(), `${SHA_A}0`, 7]) {
      const copy = cut();
      if (value === undefined) delete copy[field]; else copy[field] = value;
      assert.deepEqual(subjects(copy, "INTEROP_RECEIPT_SHA_INVALID"), [field], `${field}=${String(value)}`);
    }
  }
});

test("a mechanical_sha that differs from the expected checkout head names INTEROP_RECEIPT_SHA_INVALID, and a match does not", () => {
  assert.deepEqual(subjects(cut(), "INTEROP_RECEIPT_SHA_INVALID", { headSha: SHA_B }), ["mechanical_sha"]);
  assert.deepEqual(judge(cut(), { headSha: SHA_A }), { ok: true, refusals: [] });
});

test("a missing, assumed or unlisted native_gate_verdict names INTEROP_RECEIPT_GATE_UNSTATED", () => {
  for (const value of [undefined, "", "assumed", "Assumed", "pass", "green"]) {
    const copy = cut();
    if (value === undefined) delete copy.native_gate_verdict; else copy.native_gate_verdict = value;
    assert.deepEqual(subjects(copy, "INTEROP_RECEIPT_GATE_UNSTATED"), ["native_gate_verdict"], String(value));
  }
  for (const value of ["PASS", "FAIL", "partial", "unknown", "not-run"]) assert.deepEqual(subjects(cut({ native_gate_verdict: value }), "INTEROP_RECEIPT_GATE_UNSTATED"), [], value);
});

test("status pass with a native_gate_verdict other than PASS names INTEROP_RECEIPT_GATE_UNSTATED", () => {
  for (const verdict of ["not-run", "unknown", "partial", "FAIL"]) {
    const value = cut({ status: "pass", native_gate_verdict: verdict, forge_operation_id: OP });
    assert.deepEqual(subjects(value, "INTEROP_RECEIPT_GATE_UNSTATED"), ["native_gate_verdict"], verdict);
  }
  assert.deepEqual(subjects(cut({ status: "pass", native_gate_verdict: "PASS", forge_operation_id: OP }), "INTEROP_RECEIPT_GATE_UNSTATED"), []);
});

test("a fixture-shaped or blank-but-claimed native id names INTEROP_RECEIPT_NATIVE_ID_FIXTURE", () => {
  const fixtures = ["op-0123456789abcdef0123456789abcdef", "op-00000000000000000000000000000000", "op-ffffffffffffffffffffffffffffffff", "fixture-op-1", "fake-session", "MOCK_ID", "stub:1", "example-op", "placeholder", "todo", "tbd", "", "   ", "op-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];
  for (const field of ["pi_invocation_id", "claude_session_id", "forge_operation_id"]) {
    for (const value of fixtures) {
      assert.deepEqual(subjects(cut({ [field]: value }), "INTEROP_RECEIPT_NATIVE_ID_FIXTURE"), [field], `${field}=${JSON.stringify(value)}`);
    }
    assert.deepEqual(subjects(cut({ [field]: OP }), "INTEROP_RECEIPT_NATIVE_ID_FIXTURE"), []);
    assert.deepEqual(subjects(cut({ [field]: null }), "INTEROP_RECEIPT_NATIVE_ID_FIXTURE"), []);
  }
});

test("status pass without a forge_operation_id names INTEROP_RECEIPT_NATIVE_ID_MISSING", () => {
  assert.deepEqual(subjects(cut({ status: "pass", native_gate_verdict: "PASS" }), "INTEROP_RECEIPT_NATIVE_ID_MISSING"), ["forge_operation_id"]);
  assert.deepEqual(subjects(cut({ status: "fail" }), "INTEROP_RECEIPT_NATIVE_ID_MISSING"), []);
});

test("missing, empty or blank limitations names INTEROP_RECEIPT_LIMITATIONS_MISSING", () => {
  for (const value of [undefined, [], [" "], "text", [1]]) {
    const copy = cut();
    if (value === undefined) delete copy.limitations; else copy.limitations = value;
    assert.deepEqual(subjects(copy, "INTEROP_RECEIPT_LIMITATIONS_MISSING"), ["limitations"], JSON.stringify(value));
  }
});

test("a baseline receipt missing node, the SDK resolution or a gate row names INTEROP_RECEIPT_BASELINE_INCOMPLETE", () => {
  const mutate = (change: (b: Json) => void): Json => { const v = baseline(); change(v.baseline as Json); return v; };
  assert.deepEqual(subjects(baseline({ baseline: undefined }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline"]);
  assert.deepEqual(subjects(mutate(b => { b.node_version = "assumed"; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.node_version"]);
  assert.deepEqual(subjects(mutate(b => { delete b.sdk_version; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.sdk_version"]);
  assert.deepEqual(subjects(mutate(b => { b.sdk_resolution = " "; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.sdk_resolution"]);
  assert.deepEqual(subjects(mutate(b => { b.gates = []; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.gates"]);
  assert.deepEqual(subjects(mutate(b => { (b.gates as Json[]).shift(); }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.gates"]);
  assert.deepEqual(subjects(mutate(b => { ((b.gates as Json[])[1] as Json).verdict = "assumed"; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.gates[1].verdict"]);
  assert.deepEqual(subjects(mutate(b => { ((b.gates as Json[])[1] as Json).command_id = ""; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), ["baseline.gates[1].command_id"]);
  assert.deepEqual(subjects(mutate(b => { ((b.gates as Json[])[1] as Json).operation_id = "op-0123456789abcdef0123456789abcdef"; }), "INTEROP_RECEIPT_NATIVE_ID_FIXTURE"), ["baseline.gates[1].operation_id"]);
  assert.deepEqual(subjects(mutate(b => { b.sdk_version = "0.3.300"; b.sdk_resolution = "resolved from the installed manifest"; }), "INTEROP_RECEIPT_BASELINE_INCOMPLETE"), []);
});

test("writeInteropReceipt archives a new receipt and refuses to overwrite an archived one byte for byte", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-archive-"));
  try {
    const file = writeInteropReceipt(dir, "m00-a", "baseline.json", baseline());
    assert.equal(file, join(dir, "qa/integration/pi-native-interoperability-2026-11-09/m00-a/baseline.json"));
    const before = readFileSync(file, "utf8");
    assert.throws(() => writeInteropReceipt(dir, "m00-a", "baseline.json", baseline({ limitations: ["rewritten"] })), /INTEROP_RECEIPT_ARCHIVE_EXISTS/);
    assert.equal(readFileSync(file, "utf8"), before);
    assert.throws(() => writeInteropReceipt(dir, "m00-a", "bad.json", baseline({ mechanical_sha: "assumed" })), /INTEROP_RECEIPT_SHA_INVALID/);
    assert.equal(existsSync(join(dir, "qa/integration/pi-native-interoperability-2026-11-09/m00-a/bad.json")), false);
    assert.throws(() => writeInteropReceipt(dir, "../escape", "x.json", baseline()), /INTEROP_RECEIPT_ARCHIVE_PATH/);
    assert.throws(() => writeInteropReceipt(dir, "m00-a", "../x.json", baseline()), /INTEROP_RECEIPT_ARCHIVE_PATH/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

function runCli(args: string[], script = checker) {
  return spawnSync(process.execPath, [script, ...args], { encoding: "utf8" });
}

test("the CLI exits 0 on an honest record, 2 with the code on a refused one, and never prints PASS", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-cli-"));
  try {
    const good = join(dir, "good.json");
    const bad = join(dir, "bad.json");
    writeFileSync(good, JSON.stringify(baseline()));
    writeFileSync(bad, JSON.stringify(baseline({ pi_sha: "assumed" })));
    const ok = runCli(["--root", dir, good]);
    assert.equal(ok.status, 0);
    assert.doesNotMatch(ok.stdout + ok.stderr, /PASS/);
    const refused = runCli(["--root", dir, bad]);
    assert.equal(refused.status, 2);
    assert.match(refused.stderr, /bad\.json: INTEROP_RECEIPT_SHA_INVALID: pi_sha/);
    const head = runCli(["--root", dir, "--expect-head", SHA_B, good]);
    assert.equal(head.status, 2);
    assert.match(head.stderr, /INTEROP_RECEIPT_SHA_INVALID: mechanical_sha/);
    const garbage = join(dir, "garbage.json");
    writeFileSync(garbage, "{");
    assert.equal(runCli(["--root", dir, garbage]).status, 2);
    assert.equal(runCli(["--root", dir, join(dir, "absent.json")]).status, 2);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("the CLI --base check refuses a receipt whose bytes differ from the archived ones", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-base-"));
  try {
    const git = (...args: string[]) => spawnSync("git", ["-C", dir, "-c", "user.name=t", "-c", "user.email=t@example.invalid", ...args], { encoding: "utf8" });
    assert.equal(git("init", "-q").status, 0);
    const cutDir = join(dir, "qa/integration/pi-native-interoperability-2026-11-09/m00-a");
    mkdirSync(cutDir, { recursive: true });
    const file = join(cutDir, "baseline.json");
    writeFileSync(file, JSON.stringify(baseline()));
    assert.equal(git("add", ".").status, 0);
    assert.equal(git("commit", "-q", "-m", "archive").status, 0);
    assert.equal(runCli(["--root", dir, "--base", "HEAD"]).status, 0);
    writeFileSync(file, JSON.stringify(baseline({ limitations: ["rewritten after archive"] })));
    const rewritten = runCli(["--root", dir, "--base", "HEAD"]);
    assert.equal(rewritten.status, 2);
    assert.match(rewritten.stderr, /INTEROP_RECEIPT_ARCHIVE_MODIFIED/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("the CLI scan finds only receipts under the program directory and says so when there are none", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-scan-"));
  try {
    assert.match(runCli(["--root", dir]).stdout, /no pi interop receipts/);
    const cutDir = join(dir, "qa/integration/pi-native-interoperability-2026-11-09/m00-a");
    mkdirSync(cutDir, { recursive: true });
    writeFileSync(join(cutDir, "baseline.json"), JSON.stringify(baseline()));
    writeFileSync(join(cutDir, "notes.json"), JSON.stringify({ schema: "something.else" }));
    const scan = runCli(["--root", dir]);
    assert.equal(scan.status, 0);
    assert.match(scan.stdout, /m00-a\/baseline\.json: no refusals/);
    assert.doesNotMatch(scan.stdout, /notes\.json/);
    writeFileSync(join(cutDir, "later.json"), JSON.stringify(baseline({ status: "pass", native_gate_verdict: "not-run" })));
    const refused = runCli(["--root", dir]);
    assert.equal(refused.status, 2);
    assert.match(refused.stderr, /later\.json: INTEROP_RECEIPT_GATE_UNSTATED: native_gate_verdict/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// Mutant witnesses: the same probe runs against the real script and against a copy edited by one exact replacement; it must hold for
// the original and fail for the mutant, so each guarded behaviour has a witness that bites.
function mutantScript(dir: string, from: string, to: string): string {
  const source = readFileSync(checker, "utf8");
  assert.ok(source.includes(from), `mutation anchor must exist in the script: ${from}`);
  const target = join(dir, "mutant-check-interop-receipt.ts");
  writeFileSync(target, source.replace(from, to));
  return target;
}
function probeRefusesAssumedVerdict(dir: string, script: string): boolean {
  const file = join(dir, "assumed.json");
  writeFileSync(file, JSON.stringify(baseline({ status: "fail", native_gate_verdict: "assumed" })));
  const result = runCli(["--root", dir, file], script);
  return result.status === 2 && /INTEROP_RECEIPT_GATE_UNSTATED: native_gate_verdict/.test(result.stderr);
}
function probeRefusesFixtureId(dir: string, script: string): boolean {
  const file = join(dir, "fixture.json");
  writeFileSync(file, JSON.stringify(cut({ forge_operation_id: "op-0123456789abcdef0123456789abcdef" })));
  const result = runCli(["--root", dir, file], script);
  return result.status === 2 && /INTEROP_RECEIPT_NATIVE_ID_FIXTURE: forge_operation_id/.test(result.stderr);
}
function probeRefusesPassWithoutVerdict(dir: string, script: string): boolean {
  const file = join(dir, "passnotrun.json");
  writeFileSync(file, JSON.stringify(cut({ status: "pass", native_gate_verdict: "not-run", forge_operation_id: OP })));
  const result = runCli(["--root", dir, file], script);
  return result.status === 2 && /INTEROP_RECEIPT_GATE_UNSTATED/.test(result.stderr);
}

test("mutant witness: dropping the assumed check lets an assumed verdict through and the verdict probe catches it", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-mutant-a-"));
  try {
    assert.equal(probeRefusesAssumedVerdict(dir, checker), true);
    assert.equal(probeRefusesAssumedVerdict(dir, mutantScript(dir, "!NATIVE_VERDICTS.includes(verdict)", "false")), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("mutant witness: dropping the fixture pattern lets a fixture id through and the fixture probe catches it", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-mutant-b-"));
  try {
    assert.equal(probeRefusesFixtureId(dir, checker), true);
    assert.equal(probeRefusesFixtureId(dir, mutantScript(dir, "FIXTURE_ID.test(value)", "false")), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("mutant witness: accepting pass with a not-run verdict lets it through and the pass probe catches it", () => {
  const dir = mkdtempSync(join(tmpdir(), "mw-interop-mutant-c-"));
  try {
    assert.equal(probeRefusesPassWithoutVerdict(dir, checker), true);
    assert.equal(probeRefusesPassWithoutVerdict(dir, mutantScript(dir, 'record.status === "pass" && verdict !== "PASS"', "false")), false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
