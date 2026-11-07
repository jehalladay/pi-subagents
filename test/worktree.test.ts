import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installScratchLeakGuard, makeScratch, removeAllScratch, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

import {
  cleanupWorktree,
  createWorktree,
  isWorktreeIsolationEnabled,
  pruneWorktrees,
  setWorktreeIsolationEnabled,
  type WorktreeInfo,
} from "../src/worktree.js";
import { nonRepoScratch } from "./helpers/non-repo-scratch.js";

/**
 * Minimal stand-in for pi.exec(): runs the command for real, and — like the
 * host's implementation — REPORTS failure in the result instead of rejecting.
 * The source has to read `code`/`killed` rather than rely on a throw, so a stub
 * that threw would hide the branch that matters.
 */
function mockPi(): ExtensionAPI {
  return {
    exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
      try {
        const stdout = execFileSync(command, args, {
          cwd: options?.cwd,
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "pipe"],
          timeout: options?.timeout,
        });
        return { stdout, stderr: "", code: 0, killed: false };
      } catch (err: any) {
        return { stdout: err.stdout ?? "", stderr: err.stderr ?? "", code: err.status ?? 1, killed: false };
      }
    },
  } as unknown as ExtensionAPI;
}

/**
 * A pi whose exec answers one git subcommand with a canned failure result and
 * runs everything else for real. `match` sees the argv git is called with.
 */
function failingPi(match: (args: string[]) => boolean, failure: { code: number; killed: boolean }): ExtensionAPI {
  const real = mockPi();
  return {
    exec: vi.fn(async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
      if (match(args)) return { stdout: "", stderr: "boom", ...failure };
      return real.exec(command, args, options);
    }),
  } as unknown as ExtensionAPI;
}

/**
 * Helper: create a temporary git repo with an initial commit.
 */
function initGitRepo(): string {
  const dir = makeScratch("pi-wt-test-");
  execFileSync("git", ["init"], { cwd: dir, stdio: "pipe" });
  execFileSync("git", ["config", "user.email", "test@test.com"], { cwd: dir, stdio: "pipe" });
  execFileSync("git", ["config", "user.name", "Test"], { cwd: dir, stdio: "pipe" });
  writeFileSync(join(dir, "README.md"), "# Test repo");
  execFileSync("git", ["add", "README.md"], { cwd: dir, stdio: "pipe" });
  execFileSync("git", ["commit", "-m", "initial"], { cwd: dir, stdio: "pipe" });
  return dir;
}

describe("worktree", () => {
  let repoDir: string;
  let pi: ExtensionAPI;

  beforeEach(() => {
    repoDir = initGitRepo();
    pi = mockPi();
  });

  afterEach(async () => {
    // Clean up any lingering worktrees first, then remove repo
    try { await pruneWorktrees(pi, repoDir); } catch { /* ignore */ }
    removeScratch(repoDir);
    removeAllScratch(); // worktree directories the test registered with trackScratch
  });

  describe("createWorktree", () => {
    it("creates a worktree in tmpdir", async () => {
      const wt = await createWorktree(pi, repoDir, "test-id-1");
      expect(wt).toBeDefined();
      expect(existsSync(wt!.path)).toBe(true);
      expect(wt!.branch).toBe("pi-agent-test-id-1");
      expect(wt!.baseSha).toBe(execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim());

      // Verify it's a valid worktree with the repo's files
      expect(existsSync(join(wt!.path, "README.md"))).toBe(true);

      // Cleanup
      try { execFileSync("git", ["worktree", "remove", "--force", wt!.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("returns undefined for non-git directory", async () => {
      const nonGit = nonRepoScratch("pi-wt-nongit-");
      try {
        const wt = await createWorktree(pi, nonGit.dir, "test-id-2");
        expect(wt).toBeUndefined();
      } finally {
        nonGit.dispose();
      }
    });

    it("returns undefined for git repo with no commits", async () => {
      const emptyRepo = mkdtempSync(join(tmpdir(), "pi-wt-empty-"));
      try {
        execFileSync("git", ["init"], { cwd: emptyRepo, stdio: "pipe" });
        const wt = await createWorktree(pi, emptyRepo, "no-commits");
        expect(wt).toBeUndefined();
      } finally {
        rmSync(emptyRepo, { recursive: true, force: true });
      }
    });

    it("returns undefined when `git worktree add` reports a non-zero exit", async () => {
      // pi.exec resolves with a failure code instead of throwing, so a port that
      // only caught exceptions would hand back a worktree path that isn't there.
      const wt = await createWorktree(
        failingPi(args => args[0] === "worktree" && args[1] === "add", { code: 128, killed: false }),
        repoDir,
        "add-fails",
      );
      expect(wt).toBeUndefined();
    });

    it("returns undefined when a git call is killed by its timeout", async () => {
      // A killed process reports code 0 with killed: true — the one failure
      // shape that looks like success if only the exit code is checked.
      const wt = await createWorktree(
        failingPi(args => args[0] === "rev-parse" && args[1] === "HEAD", { code: 0, killed: true }),
        repoDir,
        "timed-out",
      );
      expect(wt).toBeUndefined();
    });

    it("workPath equals path when created from the repo root", async () => {
      const wt = (await createWorktree(pi, repoDir, "root-wp"))!;
      expect(wt.workPath).toBe(wt.path);
      try { execFileSync("git", ["worktree", "remove", "--force", wt.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("workPath preserves subdirectory scoping (monorepo package cwd)", async () => {
      mkdirSync(join(repoDir, "packages", "api"), { recursive: true });
      writeFileSync(join(repoDir, "packages", "api", "index.ts"), "export {}");
      execFileSync("git", ["add", "-A"], { cwd: repoDir, stdio: "pipe" });
      execFileSync("git", ["commit", "-m", "add package"], { cwd: repoDir, stdio: "pipe" });

      const wt = (await createWorktree(pi, join(repoDir, "packages", "api"), "subdir-wp"))!;
      expect(wt).toBeDefined();
      expect(wt.workPath).toBe(join(wt.path, "packages", "api"));
      expect(existsSync(wt.workPath)).toBe(true);
      try { execFileSync("git", ["worktree", "remove", "--force", wt.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("uses unique paths for multiple worktrees", async () => {
      const wt1 = await createWorktree(pi, repoDir, "multi-1");
      const wt2 = await createWorktree(pi, repoDir, "multi-2");
      expect(wt1).toBeDefined();
      expect(wt2).toBeDefined();
      expect(wt1!.path).not.toBe(wt2!.path);

      // Cleanup
      try { execFileSync("git", ["worktree", "remove", "--force", wt1!.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
      try { execFileSync("git", ["worktree", "remove", "--force", wt2!.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("creates worktrees concurrently — the git calls do not serialize on one another", async () => {
      // The reason for the port: several isolated agents can start at once, so
      // no call may block the caller until the previous one has finished.
      const order: string[] = [];
      const tracking = {
        exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
          order.push(`start:${args[0]}`);
          const result = await pi.exec(command, args, options);
          order.push(`end:${args[0]}`);
          return result;
        },
      } as unknown as ExtensionAPI;

      const [a, b] = await Promise.all([
        createWorktree(tracking, repoDir, "par-1"),
        createWorktree(tracking, repoDir, "par-2"),
      ]);
      expect(a).toBeDefined();
      expect(b).toBeDefined();

      // Interleaving proves the two chains ran together: with blocking calls the
      // log would be strictly start/end paired.
      const interleaved = order.some((entry, i) => entry.startsWith("start:") && order[i + 1]?.startsWith("start:"));
      expect(interleaved).toBe(true);

      for (const wt of [a!, b!]) {
        try { execFileSync("git", ["worktree", "remove", "--force", wt.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
      }
    });
  });

  describe("cleanupWorktree", () => {
    it("removes worktree when no changes made", async () => {
      const wt = (await createWorktree(pi, repoDir, "clean-1"))!;
      expect(wt).toBeDefined();

      const result = await cleanupWorktree(pi, repoDir, wt, "test cleanup");
      expect(result.hasChanges).toBe(false);
      expect(result.branch).toBeUndefined();
      expect(existsSync(wt.path)).toBe(false);
    });

    it("commits changes and creates branch when changes exist", async () => {
      const wt = (await createWorktree(pi, repoDir, "dirty-1"))!;
      expect(wt).toBeDefined();

      // Make a change in the worktree
      writeFileSync(join(wt.path, "new-file.txt"), "agent wrote this");

      const result = await cleanupWorktree(pi, repoDir, wt, "added new file");
      expect(result.hasChanges).toBe(true);
      expect(result.branch).toBeDefined();
      expect(result.branch).toContain("pi-agent-dirty-1");

      // Verify the branch exists in the main repo
      const branches = execFileSync("git", ["branch", "--list", result.branch!], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim();
      expect(branches).toContain(result.branch!);

      // Verify the commit message
      const log = execFileSync("git", ["log", "--oneline", "-1", result.branch!], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim();
      expect(log).toContain("pi-agent: added new file");

      // Cleanup branch
      try { execFileSync("git", ["branch", "-D", result.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("commits changes even when a pre-commit hook rejects (--no-verify)", async () => {
      // A failing pre-commit hook in the main repo also applies to its
      // worktrees — without --no-verify it would abort the preservation commit.
      const hookPath = join(repoDir, ".git", "hooks", "pre-commit");
      writeFileSync(hookPath, "#!/bin/sh\nexit 1\n", { mode: 0o755 });

      const wt = (await createWorktree(pi, repoDir, "hooked-1"))!;
      expect(wt).toBeDefined();
      writeFileSync(join(wt.path, "hooked-file.txt"), "agent wrote this");

      const result = await cleanupWorktree(pi, repoDir, wt, "hook should not block");
      expect(result.hasChanges).toBe(true);
      expect(result.branch).toBe("pi-agent-hooked-1");

      // Cleanup branch
      try { execFileSync("git", ["branch", "-D", result.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("creates branch when worktree is clean but HEAD moved", async () => {
      const wt = (await createWorktree(pi, repoDir, "committed-1"))!;
      expect(wt).toBeDefined();

      writeFileSync(join(wt.path, "committed-file.txt"), "agent committed this");
      execFileSync("git", ["add", "committed-file.txt"], { cwd: wt.path, stdio: "pipe" });
      execFileSync("git", ["commit", "-m", "agent commit"], { cwd: wt.path, stdio: "pipe" });
      const agentCommit = execFileSync("git", ["rev-parse", "HEAD"], {
        cwd: wt.path, stdio: "pipe",
      }).toString().trim();

      const result = await cleanupWorktree(pi, repoDir, wt, "already committed");
      expect(result.hasChanges).toBe(true);
      expect(result.branch).toBeDefined();
      expect(result.branch).toBe("pi-agent-committed-1");

      const branchCommit = execFileSync("git", ["rev-parse", result.branch!], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim();
      expect(branchCommit).toBe(agentCommit);
      expect(existsSync(wt.path)).toBe(false);

      // Cleanup branch
      try { execFileSync("git", ["branch", "-D", result.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("does not force-overwrite existing branch", async () => {
      // Create first worktree, make changes, cleanup → creates branch
      const wt1 = (await createWorktree(pi, repoDir, "conflict-1"))!;
      writeFileSync(join(wt1.path, "file1.txt"), "first run");
      const result1 = await cleanupWorktree(pi, repoDir, wt1, "first");
      expect(result1.branch).toBe("pi-agent-conflict-1");

      // Create second worktree with same agent ID, make changes
      const wt2 = (await createWorktree(pi, repoDir, "conflict-1"))!;
      writeFileSync(join(wt2.path, "file2.txt"), "second run");
      const result2 = await cleanupWorktree(pi, repoDir, wt2, "second");

      // Should use a different branch name (timestamp suffix)
      expect(result2.hasChanges).toBe(true);
      expect(result2.branch).toBeDefined();
      expect(result2.branch).not.toBe("pi-agent-conflict-1");
      expect(result2.branch).toContain("pi-agent-conflict-1-");

      // Both branches should exist
      const branches = execFileSync("git", ["branch", "--list", "pi-agent-conflict-1*"], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim();
      expect(branches).toContain("pi-agent-conflict-1");
      expect(branches).toContain(result2.branch!);

      // Cleanup
      try { execFileSync("git", ["branch", "-D", result1.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
      try { execFileSync("git", ["branch", "-D", result2.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("handles already-deleted worktree gracefully", async () => {
      const wt = (await createWorktree(pi, repoDir, "gone-1"))!;
      // Manually delete the worktree directory
      rmSync(wt.path, { recursive: true, force: true });

      const result = await cleanupWorktree(pi, repoDir, wt, "already gone");
      expect(result.hasChanges).toBe(false);
    });

    it("truncates commit message at 200 chars", async () => {
      const wt = (await createWorktree(pi, repoDir, "long-msg"))!;
      writeFileSync(join(wt.path, "change.txt"), "something");
      const longDesc = "x".repeat(300);
      const result = await cleanupWorktree(pi, repoDir, wt, longDesc);
      expect(result.hasChanges).toBe(true);

      const log = execFileSync("git", ["log", "--oneline", "-1", result.branch!], {
        cwd: repoDir, stdio: "pipe",
      }).toString().trim();
      // "pi-agent: " prefix (10 chars) + 200 chars of x = 210 total max
      expect(log.length).toBeLessThanOrEqual(220); // some slack for hash prefix

      // Cleanup
      try { execFileSync("git", ["branch", "-D", result.branch!], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });

    it("falls back to pruning when `git worktree remove` fails", async () => {
      // Removal failing is not fatal — the registration is pruned instead, and
      // the caller still hears that there were no changes.
      const wt = (await createWorktree(pi, repoDir, "remove-fails"))!;
      const failing = failingPi(
        args => args[0] === "worktree" && args[1] === "remove",
        { code: 1, killed: false },
      );

      const result = await cleanupWorktree(failing, repoDir, wt, "removal fails");

      expect(result.hasChanges).toBe(false);
      expect(vi.mocked(failing.exec).mock.calls.some(([, args]) => args[0] === "worktree" && args[1] === "prune")).toBe(true);
      try { execFileSync("git", ["worktree", "remove", "--force", wt.path], { cwd: repoDir, stdio: "pipe" }); } catch { /* ignore */ }
    });
  });

  describe("pruneWorktrees", () => {
    it("does not reject on a clean repo", async () => {
      await expect(pruneWorktrees(pi, repoDir)).resolves.toBeUndefined();
    });

    it("does not reject on non-git directory", async () => {
      const nonGit = nonRepoScratch("pi-wt-nongit-");
      try {
        await expect(pruneWorktrees(pi, nonGit.dir)).resolves.toBeUndefined();
      } finally {
        nonGit.dispose();
      }
    });
  });
});

// cleanupWorktree's outer catch is where a failed preservation step lands. It
// used to remove the worktree and return `{ hasChanges: false }`, which the
// manager rendered as "the agent changed nothing": a failed commit, status or
// branch step destroyed the agent's work and nobody was told. The corrected
// contract (EAT-R001/EAT-R002; wb-5ik5, owner specification ruling M:61188)
// keeps the worktree and answers with the typed preservation-failed result:
// its path is the recovery path and its diagnostic carries git's failure text.
describe("cleanupWorktree — failure path", () => {
  let repoDir: string;
  let pi: ExtensionAPI;

  beforeEach(() => { repoDir = initGitRepo(); pi = mockPi(); });
  afterEach(async () => {
    try { await pruneWorktrees(pi, repoDir); } catch { /* ignore */ }
    removeScratch(repoDir);
    removeAllScratch(); // worktree directories the test registered with trackScratch
  });

  it("short-circuits when the worktree directory is already gone", async () => {
    // Hits the existsSync guard at the top of cleanupWorktree, not the outer
    // catch — cleanup can be called twice (settle path plus dispose), so it has
    // to be idempotent rather than throw on the second call.
    const wt = (await createWorktree(pi, repoDir, "vanished"))!;
    expect(wt).toBeDefined();
    rmSync(wt.path, { recursive: true, force: true });

    const result = await cleanupWorktree(pi, repoDir, wt, "agent that vanished");

    expect(result.hasChanges).toBe(false);
    expect(result.branch).toBeUndefined();
  });

  it("answers a git failure inside a still-present worktree with the typed preservation-failed result and keeps the worktree", async () => {
    // The outer catch. The directory exists — so the existsSync guard above
    // does not fire — but git cannot operate in it, which is what a corrupted
    // or externally-detached worktree looks like. Cleanup keeps the worktree,
    // so the agent's work stays at the recovery path, and it still resolves
    // rather than rejecting out of the manager's settle path and taking the
    // whole record down with it.
    const wt = (await createWorktree(pi, repoDir, "corrupt"))!;
    // git can no longer remove this worktree once its link is broken, so the directory is ours to remove.
    trackScratch(wt.path);
    writeFileSync(join(wt.path, "work.txt"), "agent output");
    // Break the worktree's link back to the repo.
    writeFileSync(join(wt.path, ".git"), "gitdir: /nonexistent/path/that/is/not/a/repo");

    const result = await cleanupWorktree(pi, repoDir, wt, "corrupted agent");

    expect(result.hasChanges).toBe(true);
    expect(result.preservationFailed).toBe(true);
    expect(result.path).toBe(wt.path);
    expect(existsSync(wt.path)).toBe(true);
    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe("agent output");
    expect(result.diagnostic).toContain("not a git repository");
    expect(result.branch).toBeUndefined();
  });

  it("answers a failed preservation commit with the typed preservation-failed result and keeps the worktree", async () => {
    // `git commit` failing resolves with a non-zero code rather than throwing,
    // so the outer catch is only reached if the result is inspected.
    const wt = (await createWorktree(pi, repoDir, "commit-fails"))!;
    trackScratch(wt.path); // the worktree is kept now, so the directory is the test's to remove
    writeFileSync(join(wt.path, "work.txt"), "agent output");

    const result = await cleanupWorktree(
      failingPi(args => args[0] === "commit", { code: 1, killed: false }),
      repoDir,
      wt,
      "commit fails",
    );

    expect(result.hasChanges).toBe(true);
    expect(result.preservationFailed).toBe(true);
    expect(result.path).toBe(wt.path);
    expect(existsSync(wt.path)).toBe(true);
    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe("agent output");
    expect(result.diagnostic).toContain("boom");
    expect(result.branch).toBeUndefined();
  });

  it("creates the branch BEFORE removing the worktree, so a removal failure cannot lose commits", async () => {
    // Ordering is the actual safety property. If a refactor moved
    // removeWorktree above the `git branch` call, the commits would be
    // unreachable the moment removal succeeded and branching failed.
    const wt = (await createWorktree(pi, repoDir, "ordered"))!;
    writeFileSync(join(wt.path, "work.txt"), "agent output");

    const result = await cleanupWorktree(pi, repoDir, wt, "ordered agent");

    expect(result.hasChanges).toBe(true);
    expect(result.branch).toBeDefined();
    // The branch must exist in the MAIN repo after the worktree is gone —
    // that is what makes the agent's work recoverable.
    const branches = execFileSync("git", ["branch", "--list", result.branch!], {
      cwd: repoDir, stdio: "pipe",
    }).toString();
    expect(branches).toContain(result.branch!);
    expect(existsSync(wt.path)).toBe(false);
    // And the commit is reachable from that branch.
    const files = execFileSync("git", ["ls-tree", "--name-only", result.branch!], {
      cwd: repoDir, stdio: "pipe",
    }).toString();
    expect(files).toContain("work.txt");
  });
});

// wb-5ik5 (program mechanical-workflows-interop-2026-11-04, ATOMIC-REQUIREMENTS.md@0b25e14e), EAT-R001 and EAT-R002:
// when a preservation step fails, cleanup keeps the agent's edited bytes reachable and does not answer with the clean
// result. Claimed here, each by its rows, and nothing wider (cut #3, the enumerate form of the R-B650 claim set):
//  Every PF row asserts the same set: the result is exactly { hasChanges: true, preservationFailed: true, path, diagnostic }
//  with `path` the worktree's root and the diagnostic the row names, a JSON round trip keeps it, the directory is kept
//  with the exact bytes of an edited tracked file and a new untracked one (on disk, or in the kept HEAD commit once the
//  agent's work was committed), and no pi-agent-<id>* ref exists.
//  - PF-R001-COMMIT: a failed commit (stderr "boom").
//  - PF-R001-BRANCH: both branch names refused with stderr "boom", the agent's own and then the suffixed retry, both
//    tried; the bytes are in the kept HEAD commit.
//  - PF-R002-commit, PF-R002-status, PF-R002-branch, PF-R002-add: that step answered with stderr "boom".
//  - PF-REVPARSE: `git rev-parse HEAD` failing (stderr "boom") after the agent committed its own work, so the bytes are
//    in the kept HEAD commit.
//  - PF-DIAG-1 to PF-DIAG-4: a failed commit with each of the four failures their rows plant, and the diagnostic each
//    row names.
//  - PF-M-<step>-<shape> (PF_MATRIX: every step in STEPS with every shape in SHAPES), from a worktree created in the
//    repo's pkg subdirectory, so its workPath is not its root: the diagnostic is the one the shape gives for the
//    failing call's argv, the bytes are on disk for the status, add and commit steps and in the kept HEAD commit for
//    the rev-parse and branch steps, and the planted calls are exactly the step's argv. For the branch step these are
//    the agent's own name, answered with FIRST_REFUSAL, and then the suffixed retry, whose failure is the diagnostic.
// NOT CLAIMED by this block: steps, failure shapes and failure texts other than those planted here.
describe("cleanupWorktree — preservation failure keeps the edited bytes", () => {
  let repoDir: string;
  let pi: ExtensionAPI;

  beforeEach(() => { repoDir = initGitRepo(); pi = mockPi(); });
  afterEach(async () => {
    try { await pruneWorktrees(pi, repoDir); } catch { /* ignore */ }
    removeScratch(repoDir);
    removeAllScratch(); // worktree directories the test registered with trackScratch
  });

  const TRACKED_BYTES = "# Test repo\nedited by the agent\n";
  const UNTRACKED_BYTES = "agent output\n";

  /** Edit the tracked README and add an untracked file, the two kinds of edit EAT-R001 names. */
  function editTrackedAndUntracked(path: string): void {
    writeFileSync(join(path, "README.md"), TRACKED_BYTES);
    writeFileSync(join(path, "work.txt"), UNTRACKED_BYTES);
  }

  /** The preservation refs cleanup could have made for `agentId`, as `git branch --list` prints them. */
  function preservationRefs(agentId: string): string {
    return execFileSync("git", ["branch", "--list", `pi-agent-${agentId}*`], { cwd: repoDir, encoding: "utf-8", stdio: "pipe" }).trim();
  }

  it("PF-R001-COMMIT: keeps the worktree and its exact bytes when the preservation commit fails", async () => {
    // EAT-R001: "inject commit failure ... cleanup leaves exact bytes reachable at the recovery
    // path or a verified retained ref. Assert the original worktree remains when no preservation
    // ref exists."
    const wt = (await createWorktree(pi, repoDir, "keep-commit"))!;
    trackScratch(wt.path);
    editTrackedAndUntracked(wt.path);

    const result = await cleanupWorktree(failingPi(args => args[0] === "commit", { code: 1, killed: false }), repoDir, wt, "commit fails");

    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic: "boom" });
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    expect(preservationRefs("keep-commit")).toBe("");
    expect(existsSync(wt.path)).toBe(true);
    expect(await readFile(join(wt.path, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
  });

  it("PF-R001-BRANCH: keeps the worktree and its committed bytes when every branch name is refused", async () => {
    // EAT-R001: "inject ... exhaustion of branch-name retries separately". The commit lands in
    // the detached worktree first, so its HEAD is the only thing that still reaches it.
    const wt = (await createWorktree(pi, repoDir, "keep-branch"))!;
    trackScratch(wt.path);
    editTrackedAndUntracked(wt.path);
    const refused: string[][] = [];
    const failing = failingPi(args => args[0] === "branch" && refused.push(args) > 0, { code: 1, killed: false });

    const result = await cleanupWorktree(failing, repoDir, wt, "branch fails");

    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic: "boom" });
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    // Both names were tried: the agent's own branch, then the suffixed retry.
    expect(refused.map(args => args[1])).toEqual(["pi-agent-keep-branch", expect.stringMatching(/^pi-agent-keep-branch-\d+$/)]);
    expect(preservationRefs("keep-branch")).toBe("");
    expect(existsSync(wt.path)).toBe(true);
    const show = (file: string) => execFileSync("git", ["show", `HEAD:${file}`], { cwd: wt.path, encoding: "utf-8", stdio: "pipe" });
    expect(show("README.md")).toBe(TRACKED_BYTES);
    expect(show("work.txt")).toBe(UNTRACKED_BYTES);
  });

  it.each([
    ["commit", (args: string[]) => args[0] === "commit"],
    ["status", (args: string[]) => args[0] === "status"],
    ["branch", (args: string[]) => args[0] === "branch"],
    ["add", (args: string[]) => args[0] === "add"],
  ])("PF-R002-%s: a failed step is not answered with the clean result", async (step, match) => {
    // EAT-R002: "For commit, status and branch failures, assert a typed preservation-failed
    // result with recovery path ..., never a clean/no-change outcome". Its named mutant is
    // "Return hasChanges:false from the failure branch". The add row covers the add step the
    // variant's words name (wb-5ik5 refusal #1, U3).
    const wt = (await createWorktree(pi, repoDir, `typed-${step}`))!;
    trackScratch(wt.path);
    editTrackedAndUntracked(wt.path);

    const result = await cleanupWorktree(failingPi(match, { code: 1, killed: false }), repoDir, wt, `${step} fails`);

    expect(result.hasChanges).not.toBe(false);
    expect(result.path).toBe(wt.path);
    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic: "boom" });
    expect(existsSync(wt.path)).toBe(true);
    expect(preservationRefs(`typed-${step}`)).toBe("");
    // The kept tree still holds the agent's bytes: on disk for a failed commit, status or add step, and in the
    // worktree's own HEAD commit after a failed branch step (the commit landed before the branch was refused).
    const shown = async (file: string) => step === "branch"
      ? execFileSync("git", ["show", `HEAD:${file}`], { cwd: wt.path, encoding: "utf-8", stdio: "pipe" })
      : await readFile(join(wt.path, file), "utf-8");
    expect(await shown("README.md")).toBe(TRACKED_BYTES);
    expect(await shown("work.txt")).toBe(UNTRACKED_BYTES);
    // "serialization preserves that variant": the result is plain data, and a JSON round trip keeps every field.
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
  });

  it("PF-REVPARSE: a failed `rev-parse HEAD` after the agent committed its own work is answered with the failed variant and keeps that commit", async () => {
    // The `rev-parse HEAD` step the variant's words name: the read of HEAD that runs when `git status` is empty.
    const wt = (await createWorktree(pi, repoDir, "head-read"))!;
    trackScratch(wt.path);
    editTrackedAndUntracked(wt.path);
    execFileSync("git", ["add", "-A"], { cwd: wt.path, stdio: "pipe" });
    execFileSync("git", ["commit", "-m", "agent commit"], { cwd: wt.path, stdio: "pipe" });

    const result = await cleanupWorktree(failingPi(args => args[0] === "rev-parse", { code: 1, killed: false }), repoDir, wt, "head read fails");

    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic: "boom" });
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    expect(existsSync(wt.path)).toBe(true);
    expect(preservationRefs("head-read")).toBe("");
    const show = (file: string) => execFileSync("git", ["show", `HEAD:${file}`], { cwd: wt.path, encoding: "utf-8", stdio: "pipe" });
    expect(show("README.md")).toBe(TRACKED_BYTES);
    expect(show("work.txt")).toBe(UNTRACKED_BYTES);
  });

  /** A pi whose exec answers the calls `match` picks with `failure` and runs every other call for real. */
  function failingWith(match: (args: string[]) => boolean, failure: { stderr: string; code: number; killed: boolean }): ExtensionAPI {
    const real = mockPi();
    return {
      exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) =>
        match(args) ? { stdout: "", ...failure } : real.exec(command, args, options),
    } as unknown as ExtensionAPI;
  }

  it.each([
    ["PF-DIAG-1", "stderr spanning lines, kept whole and trimmed", { stderr: "  fatal: first line\nhint: second line\n", code: 128, killed: false }, "fatal: first line\nhint: second line"],
    ["PF-DIAG-2", "no stderr and a non-zero exit, the git helper's exit-code message", { stderr: "", code: 1, killed: false }, "git commit --no-verify -m pi-agent: commit fails failed (exit 1)"],
    ["PF-DIAG-3", "stderr of only whitespace, the git helper's exit-code message", { stderr: " \n\t ", code: 1, killed: false }, "git commit --no-verify -m pi-agent: commit fails failed (exit 1)"],
    ["PF-DIAG-4", "no stderr from a killed call, the git helper's exit-code message", { stderr: "", code: 0, killed: true }, "git commit --no-verify -m pi-agent: commit fails failed (exit 0)"],
  ])("%s: the diagnostic of a failed commit with %s", async (_id, _shape, failure, diagnostic) => {
    const wt = (await createWorktree(pi, repoDir, "diagnostic"))!;
    trackScratch(wt.path);
    editTrackedAndUntracked(wt.path);

    const result = await cleanupWorktree(failingWith(args => args[0] === "commit", failure), repoDir, wt, "commit fails");

    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic });
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    expect(existsSync(wt.path)).toBe(true);
    expect(preservationRefs("diagnostic")).toBe("");
    expect(await readFile(join(wt.path, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
    expect(await readFile(join(wt.path, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
  });

  const ESC = String.fromCodePoint(0x1b);
  /** Padded, two lines, mixed case, an escape sequence, a tab, a double space and a non-ASCII letter. */
  const PLANTED_STDERR = `  Fatal: Mixed Case ${ESC}[31mred${ESC}[0m\n\tHint:  second line ${String.fromCodePoint(0xe9)}\n`;
  /** The answer to the agent's own branch name in the branch rows, so a diagnostic carrying it is told from the retry's. */
  const FIRST_REFUSAL = "fatal: the agent's own branch name is refused";

  type Plant = { kind: "result"; stderr: string; code: number; killed: boolean } | { kind: "reject"; value: unknown };
  interface Shape {
    id: string;
    plant: Plant;
    /** The diagnostic this shape gives, from the failing call's argv. */
    diagnostic: (argv: readonly string[]) => string;
  }
  const SHAPES: readonly Shape[] = [
    { id: "stderr", plant: { kind: "result", stderr: PLANTED_STDERR, code: 1, killed: false }, diagnostic: () => PLANTED_STDERR.trim() },
    { id: "no-stderr", plant: { kind: "result", stderr: "", code: 128, killed: false }, diagnostic: (argv) => `git ${argv.join(" ")} failed (exit 128)` },
    { id: "blank-stderr", plant: { kind: "result", stderr: " \n\t ", code: 1, killed: false }, diagnostic: (argv) => `git ${argv.join(" ")} failed (exit 1)` },
    { id: "killed", plant: { kind: "result", stderr: "", code: 0, killed: true }, diagnostic: (argv) => `git ${argv.join(" ")} failed (exit 0)` },
    { id: "killed-stderr", plant: { kind: "result", stderr: PLANTED_STDERR, code: 0, killed: true }, diagnostic: () => PLANTED_STDERR.trim() },
    { id: "rejects", plant: { kind: "reject", value: new Error(PLANTED_STDERR) }, diagnostic: () => PLANTED_STDERR.trim() },
    { id: "rejects-blank", plant: { kind: "reject", value: new Error(" \n ") }, diagnostic: () => "git failed without a message" },
    { id: "rejects-value", plant: { kind: "reject", value: PLANTED_STDERR }, diagnostic: () => PLANTED_STDERR.trim() },
  ];

  interface Step {
    id: string;
    /** The argv of the call cleanup makes for this step; the branch step's retry name is matched by pattern. */
    argv: readonly string[];
    /** The agent committed its own work first, so `git status` is empty and HEAD has moved. */
    committedFirst: boolean;
    /** The agent's bytes are kept in the worktree's HEAD commit rather than on disk. */
    inHead: boolean;
  }
  const DESCRIPTION = "matrix row";
  const STEPS: readonly Step[] = [
    { id: "status", argv: ["status", "--porcelain"], committedFirst: false, inHead: false },
    { id: "add", argv: ["add", "-A"], committedFirst: false, inHead: false },
    { id: "commit", argv: ["commit", "--no-verify", "-m", `pi-agent: ${DESCRIPTION}`], committedFirst: false, inHead: false },
    { id: "rev-parse", argv: ["rev-parse", "HEAD"], committedFirst: true, inHead: true },
    { id: "branch", argv: ["branch"], committedFirst: false, inHead: true },
  ];
  const PF_MATRIX = STEPS.flatMap((step) => SHAPES.map((shape) => [`PF-M-${step.id}-${shape.id}`, step, shape] as const));

  /** A pi that plants `shape` on the calls of `step` (recording each one's argv in `calls`) and runs every other call for real. */
  function plantedPi(step: Step, shape: Shape, calls: string[][]): ExtensionAPI {
    const real = mockPi();
    return {
      exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
        if (args[0] !== step.argv[0]) return real.exec(command, args, options);
        calls.push([...args]);
        if (step.id === "branch" && calls.length === 1) return { stdout: "", stderr: FIRST_REFUSAL, code: 128, killed: false };
        if (shape.plant.kind === "reject") throw shape.plant.value;
        return { stdout: "", stderr: shape.plant.stderr, code: shape.plant.code, killed: shape.plant.killed };
      },
    } as unknown as ExtensionAPI;
  }

  it.each(PF_MATRIX)("%s: the failed variant with the shape's diagnostic and the worktree root as path; the bytes kept, no ref", async (id, step, shape) => {
    const agentId = id.toLowerCase();
    mkdirSync(join(repoDir, "pkg"));
    writeFileSync(join(repoDir, "pkg", "README.md"), "# pkg\n");
    execFileSync("git", ["add", "-A"], { cwd: repoDir, stdio: "pipe" });
    execFileSync("git", ["commit", "-m", "pkg"], { cwd: repoDir, stdio: "pipe" });
    const wt = (await createWorktree(pi, join(repoDir, "pkg"), agentId))!;
    trackScratch(wt.path);
    expect(wt.workPath).toBe(join(wt.path, "pkg"));
    editTrackedAndUntracked(wt.workPath);
    if (step.committedFirst) {
      execFileSync("git", ["add", "-A"], { cwd: wt.path, stdio: "pipe" });
      execFileSync("git", ["commit", "-m", "agent commit"], { cwd: wt.path, stdio: "pipe" });
    }
    const calls: string[][] = [];

    const result = await cleanupWorktree(plantedPi(step, shape, calls), join(repoDir, "pkg"), wt, DESCRIPTION);

    expect(calls).toEqual(step.id === "branch"
      ? [["branch", `pi-agent-${agentId}`], ["branch", expect.stringMatching(new RegExp(`^pi-agent-${agentId}-\\d+$`))]]
      : [step.argv]);
    expect(result).toEqual({ hasChanges: true, preservationFailed: true, path: wt.path, diagnostic: shape.diagnostic(calls[calls.length - 1]) });
    expect(JSON.parse(JSON.stringify(result))).toEqual(result);
    expect(existsSync(wt.path)).toBe(true);
    expect(preservationRefs(agentId)).toBe("");
    const kept = async (file: string) => step.inHead
      ? execFileSync("git", ["show", `HEAD:pkg/${file}`], { cwd: wt.path, encoding: "utf-8", stdio: "pipe" })
      : await readFile(join(wt.workPath, file), "utf-8");
    expect(await kept("README.md")).toBe(TRACKED_BYTES);
    expect(await kept("work.txt")).toBe(UNTRACKED_BYTES);
  });
});

/** Every worktree git has registered for `repoDir`, as the resolved paths `git worktree list` prints. */
function registeredWorktrees(repoDir: string): string[] {
  return execFileSync("git", ["worktree", "list", "--porcelain"], { cwd: repoDir, encoding: "utf-8", stdio: "pipe" })
    .split("\n")
    .filter(line => line.startsWith("worktree "))
    .map(line => line.slice("worktree ".length));
}

/**
 * The body of "does not disable createWorktree directly", with createWorktree
 * injected so the row after that case can run these exact assertions against a
 * createWorktree that yields nothing. The case used to call the pre-async
 * signatures without awaiting them (wb-ana): it asserted on a pending Promise,
 * so it passed whatever createWorktree did, and no worktree was ever created.
 */
async function expectSwitchOffStillCreatesWorktree(create: typeof createWorktree): Promise<void> {
  const pi = mockPi();
  const repoDir = initGitRepo();
  let wt: WorktreeInfo | undefined;
  try {
    setWorktreeIsolationEnabled(false);
    expect(isWorktreeIsolationEnabled()).toBe(false);
    wt = await create(pi, repoDir, "switch-test");
    expect(wt).toBeDefined();
    // A real worktree of this repo: on disk, holding the repo's files, registered with git.
    expect(existsSync(join(wt!.path, "README.md"))).toBe(true);
    const registered = realpathSync(wt!.path);
    expect(registeredWorktrees(repoDir)).toContain(registered);

    const result = await cleanupWorktree(pi, repoDir, wt!, "switch test");
    expect(result.hasChanges).toBe(false);
    expect(existsSync(wt!.path)).toBe(false);
    expect(registeredWorktrees(repoDir)).not.toContain(registered);
  } finally {
    await pruneWorktrees(pi, repoDir);
    removeScratch(wt?.path, repoDir);
  }
}

/**
 * The project switch itself (`worktreeIsolation`, #184). Its consumers —
 * agent-manager, both tool schemas, the invocation resolver — all mock this
 * module, so without this block the real singleton is never executed and its
 * default is never exercised. That default is what every "worktree isolation
 * still behaves as before" claim rests on.
 */
describe("worktree isolation switch", () => {
  afterEach(() => setWorktreeIsolationEnabled(true));

  it("defaults to enabled", () => {
    expect(isWorktreeIsolationEnabled()).toBe(true);
  });

  it("round-trips both ways", () => {
    setWorktreeIsolationEnabled(false);
    expect(isWorktreeIsolationEnabled()).toBe(false);
    setWorktreeIsolationEnabled(true);
    expect(isWorktreeIsolationEnabled()).toBe(true);
  });

  // The switch gates callers; it deliberately does not disarm createWorktree
  // itself, so a caller that has already decided (agent-manager checks first)
  // still gets a real worktree rather than a silent no-op.
  it("does not disable createWorktree directly", async () => {
    await expectSwitchOffStillCreatesWorktree(createWorktree);
  });

  it("the case above fails when createWorktree yields no worktree", async () => {
    const disabled: typeof createWorktree = async () => undefined;
    await expect(expectSwitchOffStillCreatesWorktree(disabled)).rejects.toThrow("expected undefined to be defined");
  });
});
