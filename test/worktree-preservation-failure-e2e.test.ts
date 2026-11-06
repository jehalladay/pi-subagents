/**
 * worktree-preservation-failure-e2e.test.ts — EAT-R003 (wb-5ik5; program mechanical-workflows-interop-2026-11-04,
 * ATOMIC-REQUIREMENTS.md@0b25e14e): "Drive the real agent settlement path with preservation failure; assert returned
 * record/observation identifies retained path and failure rather than displaying that the agent changed nothing." Its
 * named mutant: "Drop the typed recovery variant at the caller projection."
 *
 * The real stack, as in worktree-isolation-e2e.test.ts: a real git repo, a real pi-mono session, the real extension and
 * the real createWorktree/cleanupWorktree, on a faux model pinned `live: false`. Nothing injects the failure. The child's
 * own bash command edits a tracked file, adds an untracked one and leaves a stale index.lock in its worktree's git
 * directory, which is what a git process that crashed mid-write leaves behind: `git status` still reads the tree, and the
 * preservation's `git add` cannot take the index lock and fails with git's own message.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Context } from "@earendil-works/pi-ai";
import { fauxToolCall } from "@earendil-works/pi-ai";
import { afterEach, describe, expect, it, vi } from "vitest";
import { preservationFailureNote } from "../src/agent-manager.js";
import type { AgentRecord } from "../src/types.js";
import { agentCall, agentToolResults, type PrintModeRun, routeBySession, runPrintMode } from "./helpers/print-mode-runner.js";
import { installScratchLeakGuard, makeScratch, removeAllScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

vi.setConfig({ testTimeout: 30_000 });

const CHILD_PROMPT = "Edit the files.";
/** Emitted by the child once its bash command has run. */
const CHILD_MARKER = "CHILD-EDITED-ITS-TREE";
const TRACKED_BYTES = "# Test repo\nedited by the agent\n";
const UNTRACKED_BYTES = "agent output\n";
/** The child's one command, run by the REAL bash tool in whatever cwd the child was given (its worktree). */
const CHILD_COMMAND = [
  "printf '# Test repo\\nedited by the agent\\n' > README.md",
  "printf 'agent output\\n' > work.txt",
  'touch "$(git rev-parse --git-dir)/index.lock"',
].join(" && ");

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, stdio: "pipe", timeout: 10_000 }).toString().trim();
}

/** A real repo with one commit — `git worktree add` needs a HEAD to branch from. */
function initGitRepo(): string {
  const dir = makeScratch("wt-preserve-e2e-");
  git(dir, "init");
  git(dir, "config", "user.email", "test@test.com");
  git(dir, "config", "user.name", "Test");
  writeFileSync(join(dir, "README.md"), "# Test repo");
  git(dir, "add", "README.md");
  git(dir, "commit", "-m", "initial");
  return dir;
}

/** The id the foreground Agent tool result's details carry, which the manager handle resolves to the settled record. */
function spawnedAgentId(run: PrintModeRun): string | undefined {
  for (const message of run.parentSession.messages) {
    if (message.role !== "toolResult" || (message as { toolName?: string }).toolName !== "Agent") continue;
    const id = (message as { details?: { agentId?: unknown } }).details?.agentId;
    if (typeof id === "string") return id;
  }
  return undefined;
}

function ranBash(context: Context): boolean {
  return context.messages.some((m) => m.role === "toolResult" && (m as { toolName?: string }).toolName === "bash");
}

const respond = routeBySession({
  // Foreground, so the child's settled result comes back inline as the Agent tool result.
  parentInitial: agentCall({ run_in_background: false, description: "worktree work", prompt: CHILD_PROMPT, isolation: "worktree" }),
  parentFinal: "Delegated.",
  subagent: (context) => (ranBash(context) ? CHILD_MARKER : fauxToolCall("bash", { command: CHILD_COMMAND })),
});

/** Every worktree git has registered for `repo` besides the main checkout, as `git worktree list` prints them. */
function linkedWorktrees(repo: string): string[] {
  return git(repo, "worktree", "list", "--porcelain")
    .split("\n")
    .filter((line) => line.startsWith("worktree "))
    .map((line) => line.slice("worktree ".length))
    .slice(1);
}

describe("worktree preservation failure through the real agent settlement path (EAT-R003)", () => {
  let run: PrintModeRun | undefined;
  const repos: string[] = [];

  afterEach(async () => {
    await run?.dispose();
    run = undefined;
    // A kept worktree is the test's to remove, found through git even when an assertion failed before it was tracked.
    for (const repo of repos.splice(0)) for (const path of linkedWorktrees(repo)) trackScratch(path);
    removeAllScratch();
  });

  it("keeps the edited worktree, and the record and the Agent result name the kept path and git's failure", async () => {
    const repo = initGitRepo();
    repos.push(repo);

    run = await runPrintMode({ prompt: "Delegate the work.", cwd: repo, respond, live: false });

    const result = agentToolResults(run.parentSession).join("\n");
    expect(result).toContain(CHILD_MARKER);

    const id = spawnedAgentId(run);
    expect(id).toBeTruthy();
    const child = run.manager?.getRecord(id!) as AgentRecord | undefined;
    expect(child?.worktree).toBeDefined();
    const kept = trackScratch(child!.worktree!.path);

    // The record carries the typed variant: the kept path is the recovery path, and the diagnostic is git's own text.
    expect(child!.worktreeResult).toEqual({
      hasChanges: true,
      preservationFailed: true,
      path: kept,
      diagnostic: expect.stringContaining("index.lock"),
    });

    // The agent's exact bytes are still at that path, and no preservation branch claims them.
    expect(readFileSync(join(kept, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
    expect(readFileSync(join(kept, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
    expect(git(repo, "branch", "--list", "pi-agent-*")).toBe("");

    // What the parent was shown: the failure and the kept path, never a saved branch and never silence.
    expect(result).toContain("Worktree preservation failed");
    expect(result).toContain(kept);
    expect(result).toContain("index.lock");
    expect(result).not.toContain("Changes saved to branch");
  });
});

describe("the preservation-failure note is a sanitized display path (EAT-R003 caller projection)", () => {
  it("routes the diagnostic, the kept path and the repo through the single-line label layout", () => {
    // git's stderr and a path are producer text: an escape sequence or a control in either must never reach the
    // reader, and the reader still gets the words around it.
    const ESC = String.fromCodePoint(0x1b);
    const BEL = String.fromCodePoint(0x07);
    const note = preservationFailureNote(
      { hasChanges: true, preservationFailed: true, path: `/tmp/kept${ESC}[2Jtree`, diagnostic: `fatal: ${ESC}[31mboom${ESC}[0m\nsecond${BEL} line` },
      `/repo${ESC}]0;title${BEL}`,
    );

    expect(note).toBe(
      "\n\n---\nWorktree preservation failed: fatal: boom second line\n" +
        "Nothing was saved to a branch. The agent's work is kept in its worktree at `/tmp/kept tree` (a worktree of `/repo`); recover it from there.",
    );
  });

  it("names no repo when the worktree belongs to the parent session's own", () => {
    const note = preservationFailureNote({ hasChanges: true, preservationFailed: true, path: "/tmp/kept", diagnostic: "fatal: boom" }, undefined);

    expect(note).toBe(
      "\n\n---\nWorktree preservation failed: fatal: boom\n" +
        "Nothing was saved to a branch. The agent's work is kept in its worktree at `/tmp/kept`; recover it from there.",
    );
  });
});
