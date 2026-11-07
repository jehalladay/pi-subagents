/**
 * worktree-preservation-failure-e2e.test.ts — EAT-R003 (wb-5ik5; program mechanical-workflows-interop-2026-11-04,
 * ATOMIC-REQUIREMENTS.md@0b25e14e): "Drive the real agent settlement path with preservation failure; assert returned
 * record/observation identifies retained path and failure rather than displaying that the agent changed nothing." Its
 * named mutant: "Drop the typed recovery variant at the caller projection."
 *
 * The first block drives the real stack, as in worktree-isolation-e2e.test.ts: a real git repo, a real pi-mono session,
 * the real extension and the real createWorktree/cleanupWorktree, on a faux model pinned `live: false`. Nothing injects
 * the failure. The child's own bash command edits a tracked file, adds an untracked one and leaves a stale index.lock in
 * its worktree's git directory, so the preservation's `git add -A` fails with git's own message, which spans lines. The
 * second block calls preservationFailureNote directly.
 *
 * Claimed here, each by its rows, and nothing wider (cut #3, the enumerate form of the R-B650 claim set):
 *  - E2E-R003 (a foreground Agent call with worktree isolation from the parent session's own cwd at the repo root): the
 *    record, read through the manager handle by the Agent result's agent id, holds exactly the failed variant with the
 *    kept path and, as its diagnostic, what `git add -A` writes to stderr in the kept worktree, trimmed, which names
 *    index.lock and spans lines; the kept directory holds the child's exact bytes; no pi-agent-* branch exists; and
 *    the Agent result ends with the child's reply followed by the exact note for that diagnostic and the kept path,
 *    with no repo, and does not contain "Changes saved to branch".
 *  - NOTE-ESCAPES, NOTE-EMPTY-REPO, NOTE-NO-REPO and the 24 NOTE-<value>-<witness> rows (WITNESSES planted in the
 *    diagnostic, the path and the repo in turn): the exact note text for each planted input.
 * NOT CLAIMED by this suite: other inputs to preservationFailureNote; other cwds, statuses or failures through the
 * real extension; what the Agent result shows before the child's reply.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Context } from "@earendil-works/pi-ai";
import { fauxToolCall } from "@earendil-works/pi-ai";
import { afterEach, describe, expect, it, vi } from "vitest";
import { preservationFailureNote } from "../src/agent-manager.js";
import type { AgentRecord } from "../src/types.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
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

/**
 * What `git add -A` writes to stderr, trimmed, in `worktreePath` while the stale index.lock is still there: the failure
 * the preservation's own `git add -A` met.
 */
function addFailure(worktreePath: string): string {
  try {
    execFileSync("git", ["add", "-A"], { cwd: worktreePath, encoding: "utf-8", stdio: "pipe" });
  } catch (err) {
    return String((err as { stderr?: string }).stderr ?? "").trim();
  }
  throw new Error(`git add -A succeeded in ${worktreePath}: the index.lock is gone`);
}

const label = (value: string) => sanitizeWorkbenchText(value, WORKBENCH_TEXT_LIMIT, "label");
/** The exact note for a diagnostic and a kept path with no repo, built from the label layout, never from preservationFailureNote. */
function expectedNote(diagnostic: string, kept: string): string {
  return `\n\n---\nWorktree preservation failed: ${label(diagnostic)}\n` +
    `Nothing was saved to a branch. The agent's work is kept in its worktree at \`${label(kept)}\`; recover it from there.`;
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

  it("E2E-R003: keeps the edited worktree; the record holds the failed variant, and the Agent result ends with the reply and the exact note", async () => {
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
    expect(existsSync(kept)).toBe(true);

    // The record carries the typed variant: the kept path is the recovery path, and the diagnostic is git's own text,
    // the stderr `git add -A` gives in the kept worktree, which names index.lock and spans lines.
    const diagnostic = addFailure(kept);
    expect(diagnostic).toContain("index.lock");
    expect(diagnostic).toContain("\n");
    expect(child!.worktreeResult).toEqual({ hasChanges: true, preservationFailed: true, path: kept, diagnostic });

    // The agent's exact bytes are still at that path, and no preservation branch claims them.
    expect(readFileSync(join(kept, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
    expect(readFileSync(join(kept, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
    expect(git(repo, "branch", "--list", "pi-agent-*")).toBe("");

    // What the parent was shown: the failure and the kept path, never a saved branch and never silence. The
    // worktree came from the parent session's own cwd, so the note names no repo after the kept path.
    expect(result).toContain("Worktree preservation failed");
    expect(result).toContain(kept);
    expect(result).toContain("index.lock");
    expect(result).not.toContain("Changes saved to branch");
    expect(result).toContain(`kept in its worktree at \`${kept}\`; recover it from there.`);
    expect(result).not.toContain("(a worktree of");
    // The whole tail: the child's reply, then the note for the stored diagnostic and the kept path, and nothing after.
    expect(result.endsWith(`\n\n${CHILD_MARKER}${expectedNote(diagnostic, kept)}`)).toBe(true);
  });
});

describe("preservationFailureNote renders the diagnostic, the kept path and the repo with sanitizeWorkbenchText's label layout", () => {
  const ESC = String.fromCodePoint(0x1b);
  const BEL = String.fromCodePoint(0x07);

  it("NOTE-ESCAPES: renders this case's escape sequences, BEL and line break as the label layout does", () => {
    const note = preservationFailureNote(
      { hasChanges: true, preservationFailed: true, path: `/tmp/kept${ESC}[2Jtree`, diagnostic: `fatal: ${ESC}[31mboom${ESC}[0m\nsecond${BEL} line` },
      `/repo${ESC}]0;title${BEL}`,
    );

    expect(note).toBe(
      "\n\n---\nWorktree preservation failed: fatal: boom second line\n" +
        "Nothing was saved to a branch. The agent's work is kept in its worktree at `/tmp/kept tree` (a worktree of `/repo`); recover it from there.",
    );
  });

  it("NOTE-EMPTY-REPO: names the repo whenever one is passed, an empty one included", () => {
    const note = preservationFailureNote({ hasChanges: true, preservationFailed: true, path: "/tmp/kept", diagnostic: "fatal: boom" }, "");

    expect(note).toBe(
      "\n\n---\nWorktree preservation failed: fatal: boom\n" +
        "Nothing was saved to a branch. The agent's work is kept in its worktree at `/tmp/kept` (a worktree of ``); recover it from there.",
    );
  });

  it("NOTE-NO-REPO: leaves the repo out when called without one", () => {
    const note = preservationFailureNote({ hasChanges: true, preservationFailed: true, path: "/tmp/kept", diagnostic: "fatal: boom" }, undefined);

    expect(note).toBe(
      "\n\n---\nWorktree preservation failed: fatal: boom\n" +
        "Nothing was saved to a branch. The agent's work is kept in its worktree at `/tmp/kept`; recover it from there.",
    );
  });

  /** The note's exact text for a diagnostic, a kept path and an optional repo, each already rendered. */
  const noteText = (diagnostic: string, path: string, repo: string | undefined) =>
    `\n\n---\nWorktree preservation failed: ${diagnostic}\n` +
    `Nothing was saved to a branch. The agent's work is kept in its worktree at \`${path}\`${repo === undefined ? "" : ` (a worktree of \`${repo}\`)`}; recover it from there.`;

  // Each witness is planted in one value at a time; the other two stay plain. The expected renderings are the label
  // layout's for these inputs: an escape sequence (escape), a line break (line-break) or a BEL (bel) between two words
  // becomes one space, a zero-width space vanishes (zero-width-space), padding and a run of spaces collapse to one space
  // and the ends are trimmed (padding), an obviously fake bearer credential becomes [REDACTED] (credential), also when an
  // escape sequence glues it to the word before (glued-credential), and 2100 characters keep their first 1980 and the
  // truncation marker (long; WORKBENCH_TEXT_LIMIT is 2000).
  const WITNESSES: ReadonlyArray<readonly [string, string, string]> = [
    ["escape", `a${ESC}[0mb`, "a b"],
    ["line-break", "a\nb", "a b"],
    ["bel", `a${BEL}b`, "a b"],
    ["zero-width-space", `a${String.fromCodePoint(0x200b)}b`, "ab"],
    ["padding", "  a   b  ", "a b"],
    ["credential", "x Bearer FAKE-TOKEN-FOR-TESTS", "x [REDACTED]"],
    ["glued-credential", `x${ESC}[0mBearer FAKE-TOKEN-FOR-TESTS`, "x [REDACTED]"],
    ["long", "x".repeat(2100), `${"x".repeat(1980)} [truncated]`],
  ];
  const PLAIN = { diagnostic: "fatal: boom", path: "/tmp/kept", repo: "/repo" } as const;
  const CASES = (["diagnostic", "path", "repo"] as const).flatMap((slot) =>
    WITNESSES.map(([witness, planted, rendered]) => [slot, witness, planted, rendered] as const),
  );

  it.each(CASES)("NOTE-%s-%s: the note for that planted value", (slot, _witness, planted, rendered) => {
    const value = (name: keyof typeof PLAIN) => (name === slot ? planted : PLAIN[name]);
    const shown = (name: keyof typeof PLAIN) => (name === slot ? rendered : PLAIN[name]);

    const note = preservationFailureNote({ hasChanges: true, preservationFailed: true, path: value("path"), diagnostic: value("diagnostic") }, value("repo"));

    expect(note).toBe(noteText(shown("diagnostic"), shown("path"), shown("repo")));
  });
});
