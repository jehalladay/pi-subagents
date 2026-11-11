import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { developLive } from "../dist/live-development.js";
import { cleanGitBasis } from "../dist/live-gate.js";
import type { ConnectForge } from "../dist/live-gate.js";

// MechanicalWorkflows-869cl.2 (PIWBA MW-R8, EAT-R115, listing robustness; slot 07-implement): MW's own host census is Git-only
// (live-development.ts trackedFiles = git ls-files -z; live-gate.ts cleanGitBasis = git status --porcelain=v1 --untracked-files=all).
// Git lists a symlink as ONE row and never descends it, so a symlinked node_modules, a symlink cycle, a dangling symlink and a
// directory named like a file cannot crash, hang or multiply the census. Nothing pinned that; these arms do. The fixture builds the
// hazards for real and the arms fail against a readdir-recursive census mutant (the Node recursive walker follows symlinked
// directories). They assert nothing about any historical ratio of repositories a reader once failed on.
function git(root: string, ...args: string[]): string {
  const p = spawnSync("git", ["-C", root, ...args], { encoding: "utf8" });
  assert.equal(p.status, 0, p.stderr);
  return p.stdout.trim();
}

const HAZARD_PATHS = ["node_modules", "dir/up", "dangling"] as const;
const DIRECTORY_AS_FILE = "src/dir-as-file.ts";
const TRACKED_REGULAR = ["forge.toml", "main.ts", `${DIRECTORY_AS_FILE}/inner.txt`, "dir/real.ts"];

async function withHazardRepo<T>(commitHazards: boolean, fn: (root: string) => Promise<T>): Promise<T> {
  const root = mkdtempSync(join(tmpdir(), "mechanical-listing-"));
  const outside = mkdtempSync(join(tmpdir(), "mechanical-listing-outside-"));
  try {
    git(root, "init", "-q");
    git(root, "config", "user.name", "Test Developer");
    git(root, "config", "user.email", "test@example.invalid");
    writeFileSync(join(root, "forge.toml"), '[package]\nname = "fixture"\ntype = "code"\nversion = "0.1.0"\n');
    writeFileSync(join(root, "main.ts"), "export const value = 1;\n");
    mkdirSync(join(root, "dir"));
    writeFileSync(join(root, "dir", "real.ts"), "export const real = 1;\n");
    // A directory whose name looks like a file: opening it as a file raises EISDIR.
    mkdirSync(join(root, DIRECTORY_AS_FILE), { recursive: true });
    writeFileSync(join(root, DIRECTORY_AS_FILE, "inner.txt"), "inner\n");
    git(root, "add", "forge.toml", "main.ts", "dir/real.ts", DIRECTORY_AS_FILE);
    git(root, "commit", "-qm", "base");
    // Outside tree the symlinked node_modules points at: its files must never appear in the census.
    mkdirSync(join(outside, "pkg"), { recursive: true });
    writeFileSync(join(outside, "pkg", "index.js"), "module.exports = 1;\n");
    writeFileSync(join(outside, "pkg", "index.ts"), "export const x = 1;\n");
    symlinkSync(outside, join(root, "node_modules"), "dir");
    symlinkSync("..", join(root, "dir", "up"), "dir"); // 2-hop cycle: dir/up/dir/up/...
    symlinkSync("does-not-exist", join(root, "dangling")); // dangling
    if (commitHazards) {
      git(root, "add", ...HAZARD_PATHS);
      git(root, "commit", "-qm", "hazards");
    }
    return await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
  }
}

function porcelainPaths(root: string): string[] {
  return git(root, "status", "--porcelain=v1", "--untracked-files=all").split("\n").filter(Boolean).map(row => row.slice(3));
}
function occurrences(list: readonly string[], path: string): number { return list.filter(entry => entry === path).length; }
function beneathAHazard(path: string): boolean { return HAZARD_PATHS.some(hazard => path.startsWith(hazard + "/")); }

function frame(commit: string): Record<string, unknown> {
  return {
    operation_id: "op-" + commit.slice(0, 8),
    terminal_fact: "completed",
    status: "success",
    forge_result: { status: "success", envelope: { disposition: "SUCCEEDED", gated_commit: commit }, data: { gate_verdict: "PASS", gate_passed: true } },
  };
}
function forgeConnection(root: string): ConnectForge {
  return () => ({
    async initialize() { return "compatible"; },
    async request(_method, _request) { return frame(git(root, "rev-parse", "HEAD")); },
    async close() { /* nothing to release */ },
  });
}

test("the dirty-tree census names each symlink hazard exactly once and no path beneath one, and cleanGitBasis refuses it with WORKSPACE_NOT_CLEAN (869cl.2 slot 07-implement)", { timeout: 30_000 }, () => withHazardRepo(false, async root => {
  const rows = porcelainPaths(root);
  for (const hazard of HAZARD_PATHS) assert.equal(occurrences(rows, hazard), 1, `${hazard} must be one untracked row: ${JSON.stringify(rows)}`);
  assert.deepEqual(rows.filter(beneathAHazard), [], "no row may sit beneath a symlink");
  assert.equal(rows.length, HAZARD_PATHS.length, `only the hazards are untracked: ${JSON.stringify(rows)}`);
  await assert.rejects(() => cleanGitBasis(root), /WORKSPACE_NOT_CLEAN/);
}));

test("after the hazards are committed cleanGitBasis resolves clean without opening a directory as a file (869cl.2 slot 07-implement)", { timeout: 30_000 }, () => withHazardRepo(true, async root => {
  const basis = await cleanGitBasis(root);
  assert.equal(basis.clean, true);
  assert.equal(basis.commit, git(root, "rev-parse", "HEAD"));
}));

test("the live discovery census lists every symlink once, every tracked regular file, nothing beneath a symlink, and completes (869cl.2 slot 07-implement)", { timeout: 30_000 }, () => withHazardRepo(true, async root => {
  let census: string[] | null = null;
  const result = await developLive(root, "Check the census", {
    agent: async (cwd, prompt) => {
      assert.equal(cwd, root);
      const lines = prompt.split("\n");
      const header = lines.indexOf("Tracked file census (first 400):");
      assert.ok(header >= 0, "the census header must reach the agent prompt");
      const after = lines.slice(header + 1);
      const end = after.indexOf("");
      census = (end < 0 ? after : after.slice(0, end)).slice(0, 400);
      writeFileSync(join(root, "main.ts"), "export const value = 2;\n");
      git(root, "add", "main.ts");
      git(root, "commit", "-qm", "implementation");
      return { sessionId: "session-869cl2", summary: "Census checked", turns: 1, costUsd: 0 };
    },
    connectForge: forgeConnection(root),
  });
  assert.equal(result.discovery, "git-tracked-files");
  assert.ok(census !== null, "the injected agent must have seen the census");
  const seen: string[] = census;
  for (const hazard of HAZARD_PATHS) assert.equal(occurrences(seen, hazard), 1, `${hazard} must appear exactly once: ${JSON.stringify(seen)}`);
  for (const path of TRACKED_REGULAR) assert.equal(occurrences(seen, path), 1, `${path} must appear exactly once`);
  assert.deepEqual(seen.filter(beneathAHazard), [], "no census entry may sit beneath a symlink");
  assert.equal(new Set(seen).size, seen.length, "no census entry may repeat");
  assert.equal(seen.length, HAZARD_PATHS.length + TRACKED_REGULAR.length, `census size is exactly the tracked entries: ${JSON.stringify(seen)}`);
}));
