import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { judgeCutReceipt } from "./check-cut-receipt.ts";

// MechanicalWorkflows-fwexf.1 (EAT-R116, EAT-R169, EAT-R040 validator half). A per-cut receipt claims acceptance only through
// native evidence taken at the cut's own basis; the grammar sentence lives in docs/programs/pi-workbench-interoperability-audit-2026-11-06/
// 04-qa-feedback.md. Every fixture below is an inline object, so a pass here is an L0 validator result and never a native PASS.
const checker = resolve(import.meta.dirname, "check-cut-receipt.ts");
const SOURCE = "15d1e9a996c8e7f38baa94bf7ecbea0b498d4ed5";
const DECLARED = "2026-11-07T09:00:00Z";
const FORGE_OP = "op-0123456789abcdef0123456789abcdef";

type Json = Record<string, unknown>;
function receipt(overrides: Json = {}): Json {
  return {
    schema: "mw.cut-receipt.v1",
    cut: { program: "pi-workbench-interoperability-audit-2026-11-06", requirement_ids: ["EAT-R116"], source_commit: SOURCE, declared_utc: DECLARED },
    commits: { mw: SOURCE },
    versions: { node: "v24.20.0", forge: "forge 1.0.0", package: "0.1.0" },
    environment: { commands: ["node scripts/check-cut-receipt.ts"] },
    scope: { files: ["scripts/check-cut-receipt.ts"] },
    native_refs: [],
    git: { base: SOURCE, commit: SOURCE, tree: "5683167ac690a3c28be2cccc5ac094bcf5e89af1" },
    digests: { source: "a".repeat(64) },
    status: { domain: "not-judged", transport: "not-run", gate: "not-run" },
    negative_controls: ["mutant per refusal literal"],
    deviations: [],
    unknowns: ["no native gate ran at this cut"],
    simulated: [],
    ...overrides,
  };
}
function nativeGreen(): Json {
  return receipt({
    native_refs: [{ system: "forge", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T09:30:00Z" }],
    status: { domain: "verified_candidate", transport: "completed", gate: { system: "forge", kind: "operation", id: FORGE_OP, verdict: "PASS" } },
  });
}
function without(record: Json, path: string): Json {
  const copy = structuredClone(record) as Json;
  const keys = path.split(".");
  let at = copy as Record<string, unknown>;
  for (const key of keys.slice(0, -1)) at = at[key] as Record<string, unknown>;
  delete at[keys[keys.length - 1]!];
  return copy;
}
const judge = (record: unknown) => judgeCutReceipt(record, { cutSourceCommit: SOURCE, cutDeclaredUtc: DECLARED });
const codes = (record: unknown) => [...new Set(judge(record).refusals.map(r => r.code))].sort();

test("a not-run receipt with honest unknowns and no native refs passes", () => {
  const verdict = judge(receipt());
  assert.deepEqual(verdict, { ok: true, refusals: [] });
});

test("a receipt with a native forge operation at the cut commit passes", () => {
  const verdict = judge(nativeGreen());
  assert.deepEqual(verdict, { ok: true, refusals: [] });
});

test("CUT_RECEIPT_FIELD_MISSING names each absent or blank grammar field as its subject", () => {
  for (const path of ["cut.program", "cut.requirement_ids", "cut.source_commit", "cut.declared_utc", "commits.mw", "versions.node", "versions.forge",
    "versions.package", "environment.commands", "scope.files", "git.base", "git.commit", "git.tree", "digests.source", "status.domain",
    "status.transport", "status.gate", "native_refs", "negative_controls", "deviations", "unknowns", "simulated", "schema"]) {
    const verdict = judge(without(receipt(), path));
    assert.equal(verdict.ok, false, `${path} absent must refuse`);
    const hit = verdict.refusals.find(r => r.code === "CUT_RECEIPT_FIELD_MISSING" && r.subject === path);
    assert.ok(hit, `${path}: ${JSON.stringify(verdict.refusals)}`);
    assert.match(hit.detail, /absent or blank/);
  }
  const blank = judge(receipt({ git: { base: SOURCE, commit: SOURCE, tree: "   " } }));
  assert.ok(blank.refusals.some(r => r.code === "CUT_RECEIPT_FIELD_MISSING" && r.subject === "git.tree"));
  const wrongSchema = judge(receipt({ schema: "mw.other.v1" }));
  assert.ok(wrongSchema.refusals.some(r => r.code === "CUT_RECEIPT_FIELD_MISSING" && r.subject === "schema" && /mw\.cut-receipt\.v1/.test(r.detail)));
  assert.deepEqual(codes(null), ["CUT_RECEIPT_FIELD_MISSING"]);
  assert.deepEqual(codes([]), ["CUT_RECEIPT_FIELD_MISSING"]);
});

test("a native ref missing its observed_utc is a missing field, named by index", () => {
  const record = nativeGreen();
  record.native_refs = [{ system: "forge", kind: "operation", id: FORGE_OP }];
  const verdict = judge(record);
  assert.ok(verdict.refusals.some(r => r.code === "CUT_RECEIPT_FIELD_MISSING" && r.subject === "native_refs[0].observed_utc"));
});

test("CUT_RECEIPT_GATE_UNSTATED refuses a gate that is neither not-run nor a native forge operation with a verdict", () => {
  for (const gate of ["passed", "PASS", { system: "forge", kind: "operation", id: FORGE_OP }, { system: "forge", kind: "session", id: FORGE_OP, verdict: "PASS" },
    { system: "claude-agent-sdk", kind: "operation", id: FORGE_OP, verdict: "PASS" }, { system: "forge", kind: "operation", id: " ", verdict: "PASS" }]) {
    const record = receipt({ status: { domain: "not-judged", transport: "not-run", gate } });
    const got = codes(record);
    assert.deepEqual(got, ["CUT_RECEIPT_GATE_UNSTATED"], JSON.stringify(gate));
    assert.match(judge(record).refusals[0]!.detail, /not-run/);
  }
});

test("CUT_RECEIPT_NATIVE_REF_MISSING refuses a PASS assertion that has no forge operation in native_refs", () => {
  const domainOnly = receipt({ status: { domain: "verified_candidate", transport: "completed", gate: "not-run" } });
  assert.deepEqual(codes(domainOnly), ["CUT_RECEIPT_NATIVE_REF_MISSING"]);
  assert.match(judge(domainOnly).refusals[0]!.detail, /forge operation/);
  const passDomain = receipt({ status: { domain: "PASS", transport: "completed", gate: "not-run" } });
  assert.deepEqual(codes(passDomain), ["CUT_RECEIPT_NATIVE_REF_MISSING"]);
  const gateAbsent = nativeGreen();
  gateAbsent.native_refs = [{ system: "claude-agent-sdk", kind: "session", id: "a40f3d8a-0a0e-4d27-b3d4-930329ebfd0b", observed_utc: "2026-11-07T09:30:00Z" }];
  const verdict = judge(gateAbsent);
  assert.deepEqual(codes(gateAbsent), ["CUT_RECEIPT_NATIVE_REF_MISSING"]);
  assert.ok(verdict.refusals.some(r => r.subject === "status.gate.id" && /absent from native_refs/.test(r.detail)));
  const otherOp = nativeGreen();
  otherOp.native_refs = [{ system: "forge", kind: "operation", id: "op-ffffffffffffffffffffffffffffffff", observed_utc: "2026-11-07T09:30:00Z" }];
  assert.deepEqual(codes(otherOp), ["CUT_RECEIPT_NATIVE_REF_MISSING"]);
});

test("CUT_RECEIPT_FIXTURE_AS_NATIVE refuses a native ref that is a simulated path or a fixture system", () => {
  const simulated = nativeGreen();
  simulated.simulated = [`qa/integration/evidence/${FORGE_OP}.json`, FORGE_OP];
  const viaPath = judge(simulated);
  assert.deepEqual(codes(simulated), ["CUT_RECEIPT_FIXTURE_AS_NATIVE"]);
  assert.match(viaPath.refusals[0]!.detail, /simulated/);
  const fixtureSystem = nativeGreen();
  (fixtureSystem.native_refs as Json[]).push({ system: "fixture", kind: "operation", id: "op-fixture", observed_utc: "2026-11-07T09:31:00Z" });
  const viaSystem = judge(fixtureSystem);
  assert.deepEqual(codes(fixtureSystem), ["CUT_RECEIPT_FIXTURE_AS_NATIVE"]);
  assert.ok(viaSystem.refusals.some(r => r.subject === "native_refs[1]" && /fixture/.test(r.detail)));
  const legPath = receipt({ status: { domain: "qa/integration/evidence/fixture-run.json", transport: "completed", gate: "not-run" }, simulated: ["qa/integration/evidence/fixture-run.json"] });
  assert.deepEqual(codes(legPath), ["CUT_RECEIPT_FIXTURE_AS_NATIVE"]);
  assert.ok(judge(legPath).refusals.some(r => r.subject === "status.domain"));
});

test("a simulated id on a native ref that is not the gate operation is refused on its own", () => {
  const record = receipt({
    native_refs: [{ system: "claude-agent-sdk", kind: "session", id: "sess-simulated", observed_utc: "2026-11-07T09:30:00Z" }],
    simulated: ["qa/integration/evidence/sess-simulated.json"],
  });
  assert.deepEqual(codes(record), ["CUT_RECEIPT_FIXTURE_AS_NATIVE"]);
  assert.equal(judge(record).refusals[0]!.subject, "native_refs[0]");
});

test("a gate that says PASS with only transport and fixture evidence refuses both NATIVE_REF_MISSING and FIXTURE_AS_NATIVE", () => {
  const record = receipt({
    native_refs: [{ system: "fixture", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T09:30:00Z" }, { system: "claude-agent-sdk", kind: "session", id: "sess-1", observed_utc: "2026-11-07T09:30:00Z" }],
    status: { domain: "verified_candidate", transport: "completed", gate: { system: "forge", kind: "operation", id: FORGE_OP, verdict: "PASS" } },
  });
  assert.deepEqual(codes(record), ["CUT_RECEIPT_FIXTURE_AS_NATIVE", "CUT_RECEIPT_NATIVE_REF_MISSING"]);
});

test("CUT_RECEIPT_HISTORICAL_ONLY refuses refs that all predate the cut and a commit that is not the cut's commit", () => {
  const stale = nativeGreen();
  stale.native_refs = [{ system: "forge", kind: "operation", id: FORGE_OP, observed_utc: "2026-11-07T08:59:59Z" }];
  assert.deepEqual(codes(stale), ["CUT_RECEIPT_HISTORICAL_ONLY"]);
  assert.match(judge(stale).refusals[0]!.detail, /predates?/);
  const mixed = nativeGreen();
  (mixed.native_refs as Json[]).push({ system: "claude-agent-sdk", kind: "session", id: "old", observed_utc: "2026-10-15T00:00:00Z" });
  assert.equal(judge(mixed).ok, true, "one fresh ref keeps the set current");
  const otherCommit = nativeGreen();
  otherCommit.git = { base: SOURCE, commit: "b".repeat(40), tree: "5683167ac690a3c28be2cccc5ac094bcf5e89af1" };
  assert.deepEqual(codes(otherCommit), ["CUT_RECEIPT_HISTORICAL_ONLY"]);
  assert.ok(judge(otherCommit).refusals.some(r => r.subject === "git.commit" && /cut\.source_commit/.test(r.detail)));
  const notClaimed = receipt({ git: { base: SOURCE, commit: "b".repeat(40), tree: "5683167ac690a3c28be2cccc5ac094bcf5e89af1" } });
  assert.equal(judge(notClaimed).ok, true, "a commit mismatch only matters when acceptance is claimed");
});

test("the committed 2026-10-15 live-claude-forge-verified record re-wrapped for a cut at 15d1e9a9 refuses HISTORICAL_ONLY", () => {
  const old = JSON.parse(readFileSync(resolve(import.meta.dirname, "..", "qa/integration/evidence/2026-10-15-live-claude-forge-verified.json"), "utf8")) as {
    workflow: { candidate: { evidence: Json }; verification: { basis: { revision: string }; evidence: { id: string } } };
  };
  const forgeId = old.workflow.verification.evidence.id;
  const record = receipt({
    native_refs: [
      { ...old.workflow.candidate.evidence, observed_utc: "2026-10-15T00:00:00Z" },
      { ...old.workflow.verification.evidence, observed_utc: "2026-10-15T00:00:00Z" },
    ],
    git: { base: old.workflow.verification.basis.revision, commit: old.workflow.verification.basis.revision, tree: "c".repeat(40) },
    status: { domain: "verified_candidate", transport: "completed", gate: { system: "forge", kind: "operation", id: forgeId, verdict: "PASS" } },
  });
  assert.match(forgeId, /^op-[0-9a-f]{32}$/);
  assert.deepEqual(codes(record), ["CUT_RECEIPT_HISTORICAL_ONLY"]);
  const subjects = judge(record).refusals.map(r => r.subject).sort();
  assert.deepEqual(subjects, ["git.commit", "native_refs"]);
});

test("the cut options override the record's own cut fields", () => {
  const record = nativeGreen();
  const later = judgeCutReceipt(record, { cutSourceCommit: SOURCE, cutDeclaredUtc: "2026-11-08T00:00:00Z" });
  assert.deepEqual([...new Set(later.refusals.map(r => r.code))], ["CUT_RECEIPT_HISTORICAL_ONLY"]);
  const otherCut = judgeCutReceipt(record, { cutSourceCommit: "d".repeat(40), cutDeclaredUtc: DECLARED });
  assert.ok(otherCut.refusals.some(r => r.code === "CUT_RECEIPT_HISTORICAL_ONLY" && r.subject === "git.commit"));
  assert.equal(judgeCutReceipt(record, {}).ok, true);
});

function fixtureRoot<T>(files: Record<string, string>, fn: (root: string) => T): T {
  const root = mkdtempSync(join(tmpdir(), "mw-cut-receipt-"));
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

test("CLI with no receipts prints no cut receipts, exits 0 and never prints PASS", () => fixtureRoot({
  [`${EVIDENCE}/other.json`]: JSON.stringify({ schema: "mw.other.v1" }),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 0, p.stderr);
  assert.equal(p.stdout.trim(), "no cut receipts");
  assert.doesNotMatch(p.stdout + p.stderr, /pass/i);
}));

test("CLI with no evidence directory still prints no cut receipts and exits 0", () => fixtureRoot({ "README.md": "x" }, root => {
  const p = cli(root);
  assert.equal(p.status, 0, p.stderr);
  assert.equal(p.stdout.trim(), "no cut receipts");
}));

test("CLI scans the evidence directory, judges only mw.cut-receipt.v1 records, exits 0 on a clean one with one line per file", () => fixtureRoot({
  [`${EVIDENCE}/a-receipt.json`]: JSON.stringify(receipt()),
  [`${EVIDENCE}/z-other.json`]: JSON.stringify({ schema: "mw.other.v1", status: "PASS" }),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 0, p.stderr);
  assert.deepEqual(p.stdout.trim().split("\n"), [`${EVIDENCE}/a-receipt.json: no refusals`]);
  assert.doesNotMatch(p.stdout, /pass/i);
}));

test("CLI exits 2 and prints each refusal literal with subject and detail when a scanned receipt is refused", () => fixtureRoot({
  [`${EVIDENCE}/bad.json`]: JSON.stringify(receipt({ status: { domain: "verified_candidate", transport: "completed", gate: "passed" } })),
  [`${EVIDENCE}/good.json`]: JSON.stringify(receipt()),
}, root => {
  const p = cli(root);
  assert.equal(p.status, 2);
  assert.match(p.stdout, new RegExp(`${EVIDENCE}/bad\\.json: refused \\(\\d+\\)`));
  assert.match(p.stdout, new RegExp(`${EVIDENCE}/good\\.json: no refusals`));
  assert.match(p.stderr, /CUT_RECEIPT_GATE_UNSTATED: status\.gate /);
  assert.doesNotMatch(p.stdout, /pass\b/i);
}));

test("CLI with explicit FILE arguments judges those files, including a non-receipt and invalid JSON, as refused", () => fixtureRoot({
  "mine/ok.json": JSON.stringify(receipt()),
  "mine/wrong.json": JSON.stringify({ schema: "mw.other.v1" }),
  "mine/broken.json": "{ not json",
}, root => {
  const ok = cli(root, "mine/ok.json");
  assert.equal(ok.status, 0, ok.stderr);
  assert.equal(ok.stdout.trim(), "mine/ok.json: no refusals");
  const wrong = cli(root, "mine/wrong.json");
  assert.equal(wrong.status, 2);
  assert.match(wrong.stderr, /CUT_RECEIPT_FIELD_MISSING: schema /);
  const broken = cli(root, "mine/broken.json");
  assert.equal(broken.status, 2);
  assert.match(broken.stderr, /CUT_RECEIPT_FIELD_MISSING: \(record\) .*not valid JSON/);
  const missing = cli(root, "mine/absent.json");
  assert.equal(missing.status, 2);
  assert.match(missing.stderr, /CUT_RECEIPT_FIELD_MISSING: \(record\) .*unreadable/);
}));
