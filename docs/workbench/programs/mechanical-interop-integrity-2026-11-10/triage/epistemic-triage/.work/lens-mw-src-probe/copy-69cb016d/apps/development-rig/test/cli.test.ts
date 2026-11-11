import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const cli = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/cli.js");

test("fixture invocation is visibly synthetic", () => {
  const p = spawnSync(process.execPath, [cli, "--fixture", "--task", "Check parser"], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  const data = JSON.parse(p.stdout);
  assert.equal(data.mode, "fixture");
  assert.equal(data.evidenceAuthority, "none");
  assert.equal(data.result.verification.evidence.system, "fixture");
});

test("live invocation fails closed instead of silently using fixture", () => {
  const p = spawnSync(process.execPath, [cli, "--task", "Check parser"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /LIVE_DEVELOPMENT_NOT_IMPLEMENTED/);
  assert.equal(p.stdout, "");
});

test("missing task and unknown flags refuse without claiming success", () => {
  for (const args of [["--fixture"], ["--fixture", "--task", "x", "--unknown"]]) {
    const p = spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
    assert.equal(p.status, 2);
    assert.equal(p.stdout, "");
  }
});

test("a non-Error throw from the dispatcher surfaces as the UNKNOWN_ERROR refusal on stderr and exit 2 (MechanicalWorkflows-q24)", () => {
  // Preload makes the first argv read inside main()'s try block throw a bare string, the one input class that reaches the fallback literal.
  const preload = 'process.argv = new Proxy(process.argv, { get(target, key, receiver) { if (key === "2") { throw "non-error-value"; } return Reflect.get(target, key, receiver); } });';
  const p = spawnSync(process.execPath, [
    "--import", `data:text/javascript,${encodeURIComponent(preload)}`, cli, "--fixture", "--task", "Check parser",
  ], { encoding: "utf8" });
  assert.equal(p.status, 2, p.stderr);
  assert.equal(p.stdout, "");
  assert.deepEqual(JSON.parse(p.stderr.trim()), { status: "refused", reason: "UNKNOWN_ERROR" });
});
test("an Error throw keeps its own message as the refusal reason instead of the UNKNOWN_ERROR fallback (MechanicalWorkflows-q24)", () => {
  const p = spawnSync(process.execPath, [cli, "--fixture"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  const envelope = JSON.parse(p.stderr.trim());
  assert.equal(envelope.status, "refused");
  assert.match(envelope.reason, /^MISSING_TASK/);
  assert.notEqual(envelope.reason, "UNKNOWN_ERROR");
});

test("live development refuses source writes without explicit CLI opt-in", () => {
  const p = spawnSync(process.execPath, [
    cli, "--live-develop", "--workspace", "/some/path", "--task", "Change parser",
  ], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /WRITE_OPT_IN_REQUIRED/);
  assert.equal(p.stdout, "");
});

test("live development missing task refuses before loading agent or Forge SDK", () => {
  const p = spawnSync(process.execPath, [
    cli, "--live-develop", "--allow-writes", "--workspace", "/some/path",
  ], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /MISSING_ARGUMENT/);
  assert.equal(p.stdout, "");
});

test("Beads task intake requires explicit write opt-in before any Beads read", () => {
  const p = spawnSync(process.execPath, [cli, "--live-develop", "--workspace", "/missing", "--bead", "MW-123"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /WRITE_OPT_IN_REQUIRED/);
  assert.doesNotMatch(p.stderr, /ENOENT|BEADS_QUERY/);
});
test("Beads issue and free-form task are mutually exclusive", () => {
  const p = spawnSync(process.execPath, [cli, "--live-develop", "--workspace", "/missing", "--bead", "MW-123", "--task", "Do work", "--allow-writes"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /MUTUALLY_EXCLUSIVE_TASK/);
});
test("Beads task intake refuses nonexistent workspace before any agent or Forge effect", () => {
  const p = spawnSync(process.execPath, [cli, "--live-develop", "--workspace", "/no-such-forge-package", "--bead", "not-a-real-issue", "--allow-writes"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /ENOENT|FORGE_PACKAGE_ROOT_REQUIRED/);
  assert.equal(p.stdout, "");
});

test("RF mode requires explicit model before reading any workspace",()=>{
 const p=spawnSync(process.execPath,[cli,"--live-develop","--workspace","/missing","--task","Do work","--allow-writes","--context-mode","rf"],{encoding:"utf8"});
 assert.equal(p.status,2);assert.match(p.stderr,/RF_MODEL_REQUIRED/);
});
test("invalid RF context mode refuses before any model invocation",()=>{
 const p=spawnSync(process.execPath,[cli,"--live-develop","--workspace","/missing","--task","Do work","--allow-writes","--context-mode","simulated"],{encoding:"utf8"});
 assert.equal(p.status,2);assert.match(p.stderr,/INVALID_CONTEXT_MODE/);
});

test("claim-bead flag requires bead issue and allow-writes before claim",()=>{
 for(const args of [
  ["--live-develop","--workspace","/missing","--task","x","--claim-bead","--allow-writes"],
  ["--live-develop","--workspace","/missing","--bead","MW-1","--claim-bead"],
 ]){
  const p=spawnSync(process.execPath,[cli,...args],{encoding:"utf8"});
  assert.equal(p.status,2);assert.match(p.stderr,/CLAIM_BEAD_REQUIRES_ISSUE|WRITE_OPT_IN_REQUIRED/);
 }
});

test("review mode is opt-in and requires source-write opt-in",()=>{
 const p=spawnSync(process.execPath,[cli,"--live-develop","--workspace","/missing","--task","x","--review"],{encoding:"utf8"});
 assert.equal(p.status,2);assert.match(p.stderr,/WRITE_OPT_IN_REQUIRED/);
});

test("live selection refuses without the source-write opt-in before loading any SDK", () => {
  const p = spawnSync(process.execPath, [cli, "--live-select", "--workspace", "/nonexistent/pkg", "--task", "Add x"], { encoding: "utf8" });
  assert.equal(p.status, 2);
  assert.match(p.stderr, /WRITE_OPT_IN_REQUIRED/);
});
test("live selection validates the candidate count and arguments before any workspace effect", () => {
  for (const [count, reason] of [["0", "SELECTION_REQUEST_INVALID"], ["9", "SELECTION_REQUEST_INVALID"], ["two", "SELECTION_REQUEST_INVALID"]] as const) {
    const p = spawnSync(process.execPath, [cli, "--live-select", "--allow-writes", "--workspace", "/nonexistent/pkg", "--task", "Add x", "--candidates", count], { encoding: "utf8" });
    assert.equal(p.status, 2, p.stderr);
    assert.match(p.stderr, new RegExp(reason));
  }
  const unknown = spawnSync(process.execPath, [cli, "--live-select", "--allow-writes", "--workspace", "/nonexistent/pkg", "--task", "Add x", "--bogus"], { encoding: "utf8" });
  assert.equal(unknown.status, 2); assert.match(unknown.stderr, /UNKNOWN_ARGUMENT/);
  const missing = spawnSync(process.execPath, [cli, "--live-select", "--allow-writes", "--workspace", "/nonexistent/pkg"], { encoding: "utf8" });
  assert.equal(missing.status, 2); assert.match(missing.stderr, /MISSING_ARGUMENT/);
});
test("live selection with a missing workspace refuses as a basis fault, never as a verified result", () => {
  const p = spawnSync(process.execPath, [cli, "--live-select", "--allow-writes", "--workspace", "/nonexistent/pkg", "--task", "Add x", "--candidates", "2"], { encoding: "utf8" });
  assert.equal(p.status, 2, p.stderr);
  assert.match(p.stderr, /FORGE_PACKAGE_ROOT_REQUIRED/);
  assert.equal(p.stdout, "");
});
test("live selection accepts --integrate only alongside the write opt-in and keeps validating before any effect", () => {
  const p = spawnSync(process.execPath, [cli, "--live-select", "--integrate", "--workspace", "/nonexistent/pkg", "--task", "Add x"], { encoding: "utf8" });
  assert.equal(p.status, 2); assert.match(p.stderr, /WRITE_OPT_IN_REQUIRED/);
  const q = spawnSync(process.execPath, [cli, "--live-select", "--integrate", "--allow-writes", "--workspace", "/nonexistent/pkg", "--task", "Add x"], { encoding: "utf8" });
  assert.equal(q.status, 2); assert.match(q.stderr, /FORGE_PACKAGE_ROOT_REQUIRED/);
});

test("the fixture verification names itself as fixture-only so it never reads as a real Forge gate (MechanicalWorkflows-09ib.1)", () => {
  const p = spawnSync(process.execPath, [cli, "--fixture", "--task", "Check parser"], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  const { result } = JSON.parse(p.stdout);
  assert.equal(result.verification.diagnostic, "FIXTURE ONLY: no Forge gate executed");
  assert.notEqual(result.verification.evidence.system, "forge");
});
