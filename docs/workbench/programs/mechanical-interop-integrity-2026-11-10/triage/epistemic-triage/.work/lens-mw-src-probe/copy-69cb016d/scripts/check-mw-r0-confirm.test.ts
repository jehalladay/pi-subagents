import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { judgeCutReceipt } from "./check-cut-receipt.ts";
import { R0_CONFIRM_SCHEMA, R0_FIXTURE_IDS, R0_FIXTURE_TIER_LABEL, judgeR0Confirm } from "./check-mw-r0-confirm.ts";

// MechanicalWorkflows-254je.2 (EAT-R011 L1, EAT-R003 L0 validator leg). The MW-R0 pack-confirm report linter judges one JSON
// report: it refuses "completed-source" as a PASS receipt, requires commit, commands, packed digest, test counts and negative
// controls before the gate reads measured, leaves the gate pending while pack or tests have not run, and labels a fixture PASS
// exactly "L2 installed consumer / producer unverified". Every record below is an inline object, so a result here is an L0/L1
// validator result and never a native PASS of the confirm gate itself (MW-R0-PACK-CONFIRM stays with the work package).
const checker = resolve(import.meta.dirname, "check-mw-r0-confirm.ts");
const SOURCE = "7b7b564ad115a95452f609ec8f83c71a953674ec";
const DECLARED = "2026-11-07T09:00:00Z";
const FORGE_OP = "op-0123456789abcdef0123456789abcdef";
const FIXTURE_OP = "op-file-driven";

type Json = Record<string, unknown>;
function cutReceipt(overrides: Json = {}): Json {
  return {
    schema: "mw.cut-receipt.v1",
    cut: { program: "pi-workbench-interoperability-audit-2026-11-06", requirement_ids: ["EAT-R011"], source_commit: SOURCE, declared_utc: DECLARED },
    commits: { mw: SOURCE },
    versions: { node: "v24.20.0", forge: "forge 1.0.0", package: "0.1.0" },
    environment: { commands: ["npm pack --workspace @mechanical/workflows-development"] },
    scope: { files: ["scripts/check-mw-r0-confirm.ts"] },
    native_refs: [],
    git: { base: SOURCE, commit: SOURCE, tree: "5683167ac690a3c28be2cccc5ac094bcf5e89af1" },
    digests: { source: "a".repeat(64) },
    status: { domain: "not-judged", transport: "not-run", gate: "not-run" },
    negative_controls: ["mutant per refusal literal"],
    deviations: [],
    unknowns: ["pack and file-driven test not run at this cut"],
    simulated: [],
    ...overrides,
  };
}
function nativeReceipt(overrides: Json = {}): Json {
  return cutReceipt({
    native_refs: [{ system: "forge", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T09:30:00Z" }],
    status: { domain: "verified_candidate", transport: "completed", gate: { system: "forge", kind: "operation", id: FORGE_OP, verdict: "PASS" } },
    ...overrides,
  });
}
const PACK = { command: "npm pack --workspace @mechanical/workflows-development", tarball_sha256: `sha256:${"b".repeat(64)}`, tarball_bytes: 4096, package_version: "0.1.0" };
const TESTS = { command: "node --test apps/development-rig/test/entrypoint-descriptor-file.test.ts", declared: 3, passed: 3, failed: 0, verdict: "passed", harness: "native" };
function confirm(overrides: Json = {}): Json {
  return { schema: R0_CONFIRM_SCHEMA, receipt: cutReceipt(), pack: "not-run", tests: "not-run", closure: {}, ...overrides };
}
function measured(overrides: Json = {}): Json {
  return confirm({ receipt: nativeReceipt(), pack: { ...PACK }, tests: { ...TESTS }, ...overrides });
}
const codes = (record: unknown) => [...new Set(judgeR0Confirm(record).refusals.map(r => r.code))].sort();

test("the schema, the fixture id denylist and the tier label are the closed literals the bead names", () => {
  assert.equal(R0_CONFIRM_SCHEMA, "mw.r0-pack-confirm.v1");
  assert.deepEqual([...R0_FIXTURE_IDS], ["op-file-driven"]);
  assert.equal(R0_FIXTURE_TIER_LABEL, "L2 installed consumer / producer unverified");
});

test("a well-formed measured record reads gate measured, ok, no tier label", () => {
  assert.deepEqual(judgeR0Confirm(measured()), { ok: true, gate: "measured", tier: null, refusals: [] });
});

test("a pack that has not run leaves the gate pending: ok stays true and no refusal is raised", () => {
  const verdict = judgeR0Confirm(confirm({ pack: "not-run", tests: { ...TESTS } }));
  assert.deepEqual(verdict, { ok: true, gate: "pending", tier: null, refusals: [] });
});

test("tests that have not run, or that report failures, leave the gate pending", () => {
  assert.deepEqual(judgeR0Confirm(confirm({ pack: { ...PACK }, tests: "not-run" })), { ok: true, gate: "pending", tier: null, refusals: [] });
  const failing = judgeR0Confirm(measured({ tests: { ...TESTS, passed: 2, failed: 1, verdict: "failed" } }));
  assert.deepEqual(failing, { ok: true, gate: "pending", tier: null, refusals: [] });
  const contradictory = judgeR0Confirm(measured({ tests: { ...TESTS, passed: 2, failed: 1 } }));
  assert.equal(contradictory.gate, "pending", "failed > 0 holds the gate pending even if the verdict field says passed");
});

test("R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS refuses completed-source offered as a PASS receipt", () => {
  const viaClosure = judgeR0Confirm(measured({ closure: { completion: "completed-source" } }));
  assert.equal(viaClosure.ok, false);
  assert.equal(viaClosure.gate, "refused");
  assert.deepEqual(codes(measured({ closure: { completion: "completed-source" } })), ["R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS"]);
  assert.ok(viaClosure.refusals.some(r => r.subject === "closure.completion" && /completed-source/.test(r.detail)));
  const viaStatus = nativeReceipt();
  (viaStatus.status as Json).completion = " Completed-Source ";
  assert.deepEqual(codes(measured({ receipt: viaStatus })), ["R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS"]);
  assert.ok(judgeR0Confirm(measured({ receipt: viaStatus })).refusals.some(r => r.subject === "receipt.status.completion"));
});

test("completed-source with no pass claim stays an honest pending label, not a refusal", () => {
  const verdict = judgeR0Confirm(confirm({ closure: { completion: "completed-source" } }));
  assert.deepEqual(verdict, { ok: true, gate: "pending", tier: null, refusals: [] });
});

test("a fixture harness forces the exact tier label whatever the record claims", () => {
  const fixture = judgeR0Confirm(measured({ tests: { ...TESTS, harness: "fixture" } }));
  assert.equal(fixture.ok, true);
  assert.equal(fixture.gate, "measured");
  assert.equal(fixture.tier, "L2 installed consumer / producer unverified");
  const claimed = judgeR0Confirm(measured({ tests: { ...TESTS, harness: "fixture" }, closure: { tier: "L2 installed consumer" } }));
  assert.equal(claimed.tier, R0_FIXTURE_TIER_LABEL, "a softer claimed tier does not replace the label");
});

test("R0_CONFIRM_TIER_OVERCLAIM refuses an L3/L4 or native/joint closure flag on a fixture-driven or unmeasured run", () => {
  const fixtureL3 = judgeR0Confirm(measured({ tests: { ...TESTS, harness: "fixture" }, closure: { tier: "L3 native" } }));
  assert.equal(fixtureL3.ok, false);
  assert.equal(fixtureL3.gate, "refused");
  assert.equal(fixtureL3.tier, R0_FIXTURE_TIER_LABEL);
  assert.deepEqual(codes(measured({ tests: { ...TESTS, harness: "fixture" }, closure: { tier: "L3 native" } })), ["R0_CONFIRM_TIER_OVERCLAIM"]);
  assert.ok(fixtureL3.refusals.some(r => r.subject === "closure.tier" && /L3 native/.test(r.detail)));
  assert.deepEqual(codes(confirm({ closure: { tier: "L4 joint acceptance" } })), ["R0_CONFIRM_TIER_OVERCLAIM"]);
  assert.deepEqual(codes(confirm({ pack: { ...PACK }, tests: "not-run", closure: { tier: "native acceptance" } })), ["R0_CONFIRM_TIER_OVERCLAIM"]);
  assert.equal(judgeR0Confirm(measured({ closure: { tier: "L2 installed consumer" } })).ok, true, "an L2 claim on a measured native run is not an overclaim");
});

test("R0_CONFIRM_FIXTURE_ID_AS_NATIVE refuses op-file-driven as a native ref even when simulated[] omits it", () => {
  const record = measured({ receipt: nativeReceipt({ native_refs: [
    { system: "forge", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T09:30:00Z" },
    { system: "forge", kind: "operation", id: FIXTURE_OP, observed_utc: "2026-11-07T09:31:00Z" },
  ] }) });
  assert.deepEqual((record.receipt as Json).simulated, []);
  // The cut-receipt grammar alone passes this record: only the R0 denylist clause refuses it.
  assert.deepEqual(judgeCutReceipt(record.receipt, {}), { ok: true, refusals: [] });
  const verdict = judgeR0Confirm(record);
  assert.deepEqual(codes(record), ["R0_CONFIRM_FIXTURE_ID_AS_NATIVE"]);
  assert.equal(verdict.gate, "refused");
  assert.ok(verdict.refusals.some(r => r.subject === "receipt.native_refs[1]" && /op-file-driven/.test(r.detail)));
});

test("R0_CONFIRM_FIXTURE_ID_AS_NATIVE also reads the tests.evidence id, as an object or a list", () => {
  const asObject = measured({ tests: { ...TESTS, evidence: { system: "forge", kind: "operation", id: FIXTURE_OP } } });
  assert.deepEqual(codes(asObject), ["R0_CONFIRM_FIXTURE_ID_AS_NATIVE"]);
  assert.ok(judgeR0Confirm(asObject).refusals.some(r => r.subject === "tests.evidence"));
  const asList = measured({ tests: { ...TESTS, evidence: [{ system: "forge", kind: "operation", id: FORGE_OP }, { system: "forge", kind: "operation", id: FIXTURE_OP }] } });
  assert.ok(judgeR0Confirm(asList).refusals.some(r => r.subject === "tests.evidence[1]"));
  const clean = measured({ tests: { ...TESTS, evidence: { system: "forge", kind: "operation", id: FORGE_OP } } });
  assert.equal(judgeR0Confirm(clean).ok, true);
});

test("a fixture id keeps the tier label even on a refused record", () => {
  const record = measured({ receipt: nativeReceipt({ native_refs: [
    { system: "forge", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T09:30:00Z" },
    { system: "forge", kind: "operation", id: FIXTURE_OP, observed_utc: "2026-11-07T09:31:00Z" },
  ] }) });
  assert.equal(judgeR0Confirm(record).tier, R0_FIXTURE_TIER_LABEL);
});

test("R0_CONFIRM_RECEIPT_REFUSED forwards each nested cut-receipt refusal with its CUT_RECEIPT_ code", () => {
  const broken = cutReceipt();
  delete (broken.git as Json).commit;
  const verdict = judgeR0Confirm(confirm({ receipt: broken }));
  assert.equal(verdict.ok, false);
  assert.equal(verdict.gate, "refused");
  assert.deepEqual(codes(confirm({ receipt: broken })), ["R0_CONFIRM_RECEIPT_REFUSED"]);
  assert.ok(verdict.refusals.some(r => r.subject === "receipt.git.commit" && /^CUT_RECEIPT_FIELD_MISSING:/.test(r.detail)));
  const unstated = judgeR0Confirm(confirm({ receipt: cutReceipt({ status: { domain: "not-judged", transport: "not-run", gate: "passed" } }) }));
  assert.ok(unstated.refusals.some(r => r.code === "R0_CONFIRM_RECEIPT_REFUSED" && /CUT_RECEIPT_GATE_UNSTATED/.test(r.detail)));
});

test("R0_CONFIRM_FIELD_MISSING requires negative controls before the gate may read measured", () => {
  const verdict = judgeR0Confirm(measured({ receipt: nativeReceipt({ negative_controls: [] }) }));
  assert.equal(verdict.ok, false);
  assert.equal(verdict.gate, "refused");
  assert.ok(verdict.refusals.some(r => r.code === "R0_CONFIRM_FIELD_MISSING" && r.subject === "receipt.negative_controls"));
  const pending = judgeR0Confirm(confirm({ receipt: cutReceipt({ negative_controls: [] }) }));
  assert.equal(pending.gate, "pending", "a run that has not happened owes no negative controls yet");
});

test("R0_CONFIRM_FIELD_MISSING names each malformed pack, tests and top-level field as its subject", () => {
  const subjects = (record: unknown) => judgeR0Confirm(record).refusals.filter(r => r.code === "R0_CONFIRM_FIELD_MISSING").map(r => r.subject).sort();
  assert.deepEqual(subjects(measured({ pack: { ...PACK, tarball_sha256: "b".repeat(64) } })), ["pack.tarball_sha256"]);
  assert.deepEqual(subjects(measured({ pack: { ...PACK, tarball_bytes: 0 } })), ["pack.tarball_bytes"]);
  assert.deepEqual(subjects(measured({ pack: { command: "", package_version: " ", tarball_sha256: PACK.tarball_sha256, tarball_bytes: 1 } })), ["pack.command", "pack.package_version"]);
  assert.deepEqual(subjects(measured({ tests: { ...TESTS, declared: -1, passed: 1.5 } })), ["tests.declared", "tests.passed"]);
  assert.deepEqual(subjects(measured({ tests: { ...TESTS, verdict: "green", harness: "native-ish" } })), ["tests.harness", "tests.verdict"]);
  assert.deepEqual(subjects(measured({ pack: "ran" })), ["pack"]);
  assert.deepEqual(subjects(measured({ tests: undefined })), ["tests"]);
  assert.deepEqual(subjects(measured({ receipt: "x" })), ["receipt"]);
  assert.deepEqual(subjects(measured({ schema: "mw.cut-receipt.v1" })), ["schema"]);
  assert.deepEqual(judgeR0Confirm([]).refusals.map(r => [r.code, r.subject]), [["R0_CONFIRM_FIELD_MISSING", "(record)"]]);
  assert.equal(judgeR0Confirm(null).gate, "refused");
});

function fixtureRoot<T>(files: Record<string, string>, fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-r0-confirm-"));
  try {
    for (const [path, content] of Object.entries(files)) {
      mkdirSync(resolve(join(root, path), ".."), { recursive: true });
      writeFileSync(join(root, path), content);
    }
    return fn(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}
function cli(root: string, ...files: string[]) {
  return spawnSync(process.execPath, [checker, "--root", root, ...files], { cwd: root, encoding: "utf8" });
}
const EVIDENCE = "qa/integration/evidence";

test("CLI with no confirm reports prints no r0 pack confirms, exits 0 and never prints PASS", () => fixtureRoot({
  [`${EVIDENCE}/other.json`]: JSON.stringify({ schema: "mw.cut-receipt.v1" }),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 0, p.stderr);
  assert.equal(p.stdout.trim(), "no r0 pack confirms");
  assert.doesNotMatch(p.stdout + p.stderr, /pass/i);
}));

test("CLI scans the evidence directory for its own schema, exits 0 on pending and measured, and prints the gate and tier", () => fixtureRoot({
  [`${EVIDENCE}/a-pending.json`]: JSON.stringify(confirm()),
  [`${EVIDENCE}/b-fixture.json`]: JSON.stringify(measured({ tests: { ...TESTS, harness: "fixture" } })),
  [`${EVIDENCE}/c-measured.json`]: JSON.stringify(measured()),
  [`${EVIDENCE}/z-other.json`]: JSON.stringify({ schema: "mw.other.v1", status: "PASS" }),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 0, p.stderr);
  assert.deepEqual(p.stdout.trim().split("\n"), [
    `${EVIDENCE}/a-pending.json: no refusals (gate pending)`,
    `${EVIDENCE}/b-fixture.json: no refusals (gate measured; tier ${R0_FIXTURE_TIER_LABEL})`,
    `${EVIDENCE}/c-measured.json: no refusals (gate measured)`,
  ]);
  assert.doesNotMatch(p.stdout, /pass/i);
}));

test("CLI exits 2 and prints each refusal literal with subject and detail when a scanned report is refused", () => fixtureRoot({
  [`${EVIDENCE}/bad.json`]: JSON.stringify(measured({ closure: { completion: "completed-source" } })),
  [`${EVIDENCE}/good.json`]: JSON.stringify(confirm()),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 2);
  assert.match(p.stdout, new RegExp(`${EVIDENCE}/bad\\.json: refused \\(1\\)`));
  assert.match(p.stdout, new RegExp(`${EVIDENCE}/good\\.json: no refusals \\(gate pending\\)`));
  assert.match(p.stderr, /R0_CONFIRM_COMPLETED_SOURCE_NOT_PASS: closure\.completion /);
  assert.doesNotMatch(p.stdout, /pass/i);
}));

test("CLI with explicit FILE arguments judges those files, including a non-report, invalid JSON and a missing file, as refused", () => fixtureRoot({
  "mine/ok.json": JSON.stringify(confirm()),
  "mine/wrong.json": JSON.stringify({ schema: "mw.other.v1" }),
  "mine/broken.json": "{ not json",
}, root => {
  const ok = cli(root, "mine/ok.json");
  assert.equal(ok.status, 0, ok.stderr);
  assert.equal(ok.stdout.trim(), "mine/ok.json: no refusals (gate pending)");
  const wrong = cli(root, "mine/wrong.json");
  assert.equal(wrong.status, 2);
  assert.match(wrong.stderr, /R0_CONFIRM_FIELD_MISSING: schema /);
  const broken = cli(root, "mine/broken.json");
  assert.equal(broken.status, 2);
  assert.match(broken.stderr, /R0_CONFIRM_FIELD_MISSING: \(record\) .*not valid JSON/);
  const missing = cli(root, "mine/absent.json");
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /R0_CONFIRM_FIELD_MISSING: \(record\) .*unreadable/);
}));
