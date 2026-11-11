import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { verifyCli } from "../dist/live-verify-cli.js";
import { cleanGitBasis } from "../dist/live-gate.js";
import type { ConnectForge } from "../dist/live-gate.js";

function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}
async function withRepo<T>(fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-verify-cli-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Fixture");
    git(root, "config", "user.email", "fixture@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.txt"), "candidate\n");
    git(root, "add", ".");
    git(root, "commit", "-qm", "candidate");
    return await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
function connecting(response: unknown): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request() { return response; },
    async close() {},
  });
}
// Run verifyCli with an injected connection and capture exactly what it writes to stdout.
async function run(root: string, response: unknown): Promise<{ code: number; stdout: string }> {
  const chunks: string[] = [];
  const original = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((chunk: string | Uint8Array) => { chunks.push(String(chunk)); return true; }) as typeof process.stdout.write;
  try {
    const code = await verifyCli(["--workspace", root], connecting(response));
    return { code, stdout: chunks.join("") };
  } finally {
    process.stdout.write = original;
  }
}
const passFrame = (commit: string): Record<string, unknown> => ({
  operation_id: "op-verify-pass",
  terminal_fact: "completed",
  status: "success",
  forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: commit }, data: { gate_verdict: "PASS", gate_passed: true } },
});
const failFrame = (commit: string): Record<string, unknown> => ({
  operation_id: "op-verify-fail",
  terminal_fact: "failed",
  status: "error",
  forge_result: { status: "error", envelope: { disposition: "FAILED", gated_commit: commit }, data: { gate_verdict: "FAIL" } },
});

test("--live-verify exits 0 on a passed gate and writes one live-forge envelope line carrying the passed result", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { code, stdout } = await run(root, passFrame(basis.commit));
  assert.equal(code, 0);
  assert.ok(stdout.endsWith("\n") && stdout.indexOf("\n") === stdout.length - 1, "exactly one newline-terminated line");
  const body = JSON.parse(stdout) as { mode: string; result: { kind: string; reason: string; operationId: string } };
  assert.deepEqual(Object.keys(body), ["mode", "result"]);
  assert.equal(body.mode, "live-forge");
  assert.equal(body.result.kind, "passed");
  assert.equal(body.result.operationId, "op-verify-pass");
}));

test("--live-verify exits 1 on a failed gate and the envelope names kind failed", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const { code, stdout } = await run(root, failFrame(basis.commit));
  assert.equal(code, 1);
  const body = JSON.parse(stdout) as { mode: string; result: { kind: string; reason: string; operationId: string } };
  assert.equal(body.mode, "live-forge");
  assert.equal(body.result.kind, "failed");
  assert.equal(body.result.reason, "FORGE_GATE_FAIL");
  assert.equal(body.result.operationId, "op-verify-fail");
}));

test("--live-verify exits 3 on an indeterminate gate and the envelope names kind indeterminate", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  // A matching native PASS under a blank operation_id is unreadable, hence indeterminate (never success).
  const { code, stdout } = await run(root, { ...passFrame(basis.commit), operation_id: " " });
  assert.equal(code, 3);
  const body = JSON.parse(stdout) as { mode: string; result: { kind: string; reason: string } };
  assert.equal(body.mode, "live-forge");
  assert.equal(body.result.kind, "indeterminate");
  assert.equal(body.result.reason, "FORGE_RESULT_UNREADABLE");
}));

test("--live-verify keeps the three exits distinct so no leg can collapse into another", () => withRepo(async root => {
  const basis = await cleanGitBasis(root);
  const codes = [
    (await run(root, passFrame(basis.commit))).code,
    (await run(root, failFrame(basis.commit))).code,
    (await run(root, { ...passFrame(basis.commit), operation_id: "" })).code,
  ];
  assert.deepEqual(codes, [0, 1, 3]);
}));
