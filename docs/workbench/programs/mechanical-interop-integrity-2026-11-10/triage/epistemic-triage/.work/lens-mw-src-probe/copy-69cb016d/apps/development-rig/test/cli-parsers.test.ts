import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const cli = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/cli.js");

// Each refusal is a thrown Error that cli.ts main() maps to stderr {status:"refused", reason} and exit 2.
// Asserting the reason's leading token exactly (not a substring of the whole stderr, and never an
// alternation) means a mutant that drops one guard cannot be satisfied by a neighbouring refusal.
function refusal(args: readonly string[]): { status: number | null; token: string; reason: string; stdout: string } {
  const p = spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });
  const body = JSON.parse(p.stderr.trim().split("\n").at(-1) ?? "{}") as { status?: string; reason?: string };
  assert.equal(body.status, "refused", p.stderr);
  const reason = body.reason ?? "";
  return { status: p.status, token: reason.split(":")[0] ?? "", reason, stdout: p.stdout };
}
function assertRefused(args: readonly string[], token: string, mention?: string): void {
  const r = refusal(args);
  assert.equal(r.status, 2, r.reason);
  assert.equal(r.token, token, r.reason);
  assert.equal(r.stdout, "");
  if (mention !== undefined) assert.ok(r.reason.includes(mention), r.reason);
}

test("--live-verify without --workspace refuses MISSING_WORKSPACE with empty stdout", () => {
  assertRefused(["--live-verify"], "MISSING_WORKSPACE");
});
test("--live-verify rejects an unknown flag as UNKNOWN_ARGUMENT naming the flag", () => {
  assertRefused(["--live-verify", "--bogus"], "UNKNOWN_ARGUMENT", "--bogus");
  assertRefused(["--live-verify", "--allow-writes"], "UNKNOWN_ARGUMENT", "--allow-writes");
});
test("--live-verify refuses a flag with no value or a value that starts with -- as INVALID_ARGUMENT", () => {
  assertRefused(["--live-verify", "--workspace"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-verify", "--workspace", "--forge-bin"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-verify", "--workspace", "/nonexistent/pkg", "--forge-bin"], "INVALID_ARGUMENT", "--forge-bin");
});
test("--live-verify with a nonexistent workspace passes the parser and refuses with the basis fault", () => {
  const r = refusal(["--live-verify", "--workspace", "/nonexistent/pkg"]);
  assert.equal(r.status, 2, r.reason);
  assert.equal(r.token, "FORGE_PACKAGE_ROOT_REQUIRED", r.reason);
  assert.equal(r.stdout, "");
});

test("--live-develop refuses a flag with no value or a -- value as INVALID_ARGUMENT", () => {
  assertRefused(["--live-develop", "--allow-writes", "--workspace"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-develop", "--allow-writes", "--workspace", "--task", "x"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-develop", "--allow-writes", "--workspace", "/missing", "--task"], "INVALID_ARGUMENT", "--task");
});
test("--live-select refuses a flag with no value or a -- value as INVALID_ARGUMENT", () => {
  assertRefused(["--live-select", "--allow-writes", "--workspace"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-select", "--allow-writes", "--workspace", "--task", "x"], "INVALID_ARGUMENT", "--workspace");
  assertRefused(["--live-select", "--allow-writes", "--workspace", "/missing", "--task"], "INVALID_ARGUMENT", "--task");
});
test("--live-develop rejects an unknown flag as UNKNOWN_ARGUMENT before any other check", () => {
  assertRefused(["--live-develop", "--allow-writes", "--workspace", "/missing", "--task", "x", "--bogus"], "UNKNOWN_ARGUMENT", "--bogus");
});
test("--beads-directory without --bead refuses BEADS_DIRECTORY_REQUIRES_ISSUE on its own token", () => {
  assertRefused(
    ["--live-develop", "--allow-writes", "--workspace", "/missing", "--task", "x", "--beads-directory", "/d"],
    "BEADS_DIRECTORY_REQUIRES_ISSUE",
  );
});
test("--claim-bead without --bead refuses CLAIM_BEAD_REQUIRES_ISSUE on its own token, with writes allowed", () => {
  assertRefused(
    ["--live-develop", "--allow-writes", "--workspace", "/missing", "--task", "x", "--claim-bead"],
    "CLAIM_BEAD_REQUIRES_ISSUE",
  );
});
