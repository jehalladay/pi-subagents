/**
 * worktree-preservation-settlement.test.ts — wb-5ik5 (EAT-R003; program mechanical-workflows-interop-2026-11-04,
 * ATOMIC-REQUIREMENTS.md@0b25e14e): the three AgentManager paths that store a worktree cleanup result, each driven to a
 * failed preservation, in each of four cwd modes.
 *
 * Real git, the real AgentManager and the real createWorktree/cleanupWorktree, with no module mock. A resolved run goes
 * through the real runAgent and a real pi-mono child session on a faux model: the child's own bash command edits a
 * tracked file, adds an untracked one and leaves a stale index.lock in its worktree's git directory, so the
 * preservation's `git add -A` fails with git's own message, which spans lines. The rejected run makes the same edits
 * from the caller's onSessionCreated callback, which then throws, so runAgent rejects before the child's first turn. The
 * stop lands while the worktree is being created. The planted rows answer one cleanup git call with PLANTED_STDERR
 * instead of running it.
 *
 * The cwd modes (MODES): a caller-supplied cwd at the repo root, a caller-supplied cwd in the repo's pkg subdirectory,
 * the parent session's own cwd at the repo root and the parent session's own cwd in pkg. In both pkg modes the
 * worktree's workPath is its pkg directory, not its root. The child works in workPath for a caller-supplied cwd and at
 * the worktree's root for the parent session's own.
 *
 * Claimed here, each by its rows in each of the four modes, and nothing wider (cut #3, the enumerate form of the R-B650
 * claim set):
 *  - ST-RESOLVED-completed, -steered, -aborted, -error, -stopped: the run settles with that status (error carries
 *    FATAL); the record holds exactly { hasChanges: true, preservationFailed: true, path: <the worktree's root>,
 *    diagnostic: <what `git add -A` writes to stderr in the kept worktree, trimmed> }, and that diagnostic spans lines;
 *    the kept directory holds the child's exact bytes; no pi-agent-* branch exists; and the record's result is exactly
 *    the run's reply (CHILD_MARKER for completed and steered, empty for the other three) followed by expectedNote for
 *    that diagnostic and the kept path, with the caller-supplied cwd as the repo, or no repo for the parent session's
 *    own cwd.
 *  - ST-RESOLVED-PLANTED: a completed run whose `git add -A` is answered with PLANTED_STDERR: the record holds exactly
 *    the failed variant with PLANTED_STDERR trimmed as its diagnostic, and the result is CHILD_MARKER followed by
 *    expectedNote for that diagnostic, the kept path and the same repo.
 *  - ST-REJECTED (the stale index.lock) and ST-REJECTED-PLANTED (`git add -A` answered with PLANTED_STDERR): status
 *    error with the thrown message as the error; the record holds exactly the failed variant, with the diagnostic as in
 *    the matching resolved row; the kept directory holds the exact bytes; no pi-agent-* branch exists; the record's
 *    result is undefined.
 *  - ST-STOP: a stop that lands while the worktree is being created, with `git status --porcelain` answered with
 *    PLANTED_STDERR: status stopped; the record holds exactly the failed variant with PLANTED_STDERR trimmed; the
 *    directory is kept; no pi-agent-* branch exists; the record's result is undefined.
 * expectedNote is built here from sanitizeWorkbenchText's label layout, never from preservationFailureNote.
 * RESIDUALS (named, each with its pinned quiet row; each row reds once a note appears there): R-REJECTED-NOTE, a
 * rejected run's result carries no note about the kept worktree: ST-REJECTED, ST-REJECTED-PLANTED. R-STOP-NOTE, a stop
 * during worktree creation leaves no note: ST-STOP.
 * NOT CLAIMED by this suite: other statuses, cwd modes, failed steps and failure texts; a clean or preserved result on
 * these paths; what src/index.ts shows from the record.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import {
  type AssistantMessage,
  type FauxResponseStep,
  fauxAssistantMessage,
  fauxText,
  fauxToolCall,
  type Message,
  type Model,
} from "@earendil-works/pi-ai";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AgentManager } from "../src/agent-manager.js";
import { getGraceTurns, setGraceTurns } from "../src/agent-runner.js";
import { registerAgents } from "../src/agent-types.js";
import type { AgentRecord } from "../src/types.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import { fauxModelBackend } from "./helpers/faux-model-backend.js";
import { registerFauxProvider } from "./helpers/pi-ai.js";
import { installScratchLeakGuard, makeScratch, removeAllScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

/** The options `AgentManager.spawn` takes (the interface itself is not exported). */
type SpawnOptions = Parameters<AgentManager["spawn"]>[4];

vi.setConfig({ testTimeout: 30_000 });

/** The child's reply once its bash command has run. */
const CHILD_MARKER = "CHILD-EDITED-ITS-TREE";
const TRACKED_BYTES = "# Test repo\nedited by the agent\n";
const UNTRACKED_BYTES = "agent output\n";
/** The child's one command, run by the REAL bash tool in the cwd the child was given. */
const CHILD_COMMAND = [
  "printf '# Test repo\\nedited by the agent\\n' > README.md",
  "printf 'agent output\\n' > work.txt",
  'touch "$(git rev-parse --git-dir)/index.lock"',
].join(" && ");
/** A provider error pi does not retry: not one of its transient-error patterns. */
const FATAL = "invalid request: provider rejected the prompt";
const ESC = String.fromCodePoint(0x1b);
/** Padded, two lines, mixed case, an escape sequence, a tab, a double space and a non-ASCII letter. */
const PLANTED_STDERR = `  Fatal: Mixed Case ${ESC}[31mred${ESC}[0m\n\tHint:  second line ${String.fromCodePoint(0xe9)}\n`;

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf-8", stdio: "pipe", timeout: 10_000 }).trim();
}

/** A real repo with one commit holding README.md and pkg/README.md — `git worktree add` needs a HEAD to branch from. */
function initGitRepo(): string {
  const dir = makeScratch("wt-settle-repo-");
  git(dir, "init");
  git(dir, "config", "user.email", "test@test.com");
  git(dir, "config", "user.name", "Test");
  writeFileSync(join(dir, "README.md"), "# Test repo");
  mkdirSync(join(dir, "pkg"));
  writeFileSync(join(dir, "pkg", "README.md"), "# pkg");
  git(dir, "add", "-A");
  git(dir, "commit", "-m", "initial");
  return dir;
}

/**
 * A pi whose exec runs git for real and, like the host's, reports a failure in the result instead of rejecting.
 * `planted` picks the calls answered with a failure whose stderr is PLANTED_STDERR instead.
 */
function realPi(planted: (args: string[]) => boolean = () => false): ExtensionAPI {
  return {
    exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
      if (planted(args)) return { stdout: "", stderr: PLANTED_STDERR, code: 1, killed: false };
      try {
        const stdout = execFileSync(command, args, {
          cwd: options?.cwd,
          encoding: "utf-8",
          stdio: ["pipe", "pipe", "pipe"],
          timeout: options?.timeout,
        });
        return { stdout, stderr: "", code: 0, killed: false };
      } catch (err) {
        const failure = err as { stdout?: string; stderr?: string; status?: number };
        return { stdout: failure.stdout ?? "", stderr: failure.stderr ?? "", code: failure.status ?? 1, killed: false };
      }
    },
  } as unknown as ExtensionAPI;
}
const addPlanted = (args: string[]) => args[0] === "add";
const statusPlanted = (args: string[]) => args[0] === "status";

/** The parent context runAgent reads: its cwd, its model, and a registry whose runtime streams the faux model. */
function parentContext(cwd: string, model: Model<string>): ExtensionContext {
  const { modelRegistry, modelRuntime } = fauxModelBackend(model);
  return {
    cwd,
    model,
    modelRegistry: { ...modelRegistry, runtime: modelRuntime },
    getSystemPrompt: () => "You are the parent session.",
  } as unknown as ExtensionContext;
}

function ranBash(messages: Message[]): boolean {
  return messages.some((m) => m.role === "toolResult" && (m as { toolName?: string }).toolName === "bash");
}

const bashTurn = (): AssistantMessage =>
  fauxAssistantMessage([fauxToolCall("bash", { command: CHILD_COMMAND })], { stopReason: "toolUse" });
/** One bash call, then the marker once the call's result is in the child's history. */
const bashThenMarker: FauxResponseStep = (context) =>
  ranBash(context.messages) ? fauxAssistantMessage([fauxText(CHILD_MARKER)], { stopReason: "stop" }) : bashTurn();
/** One bash call, then a final turn that fails with FATAL. */
const bashThenError: FauxResponseStep = (context) =>
  ranBash(context.messages) ? fauxAssistantMessage([], { stopReason: "error", errorMessage: FATAL }) : bashTurn();
/** A bash call on every turn, until the turn limit aborts the run. */
const bashForever: FauxResponseStep = () => bashTurn();

/** Every worktree git has registered for `repo` besides the main checkout. */
function linkedWorktrees(repo: string): string[] {
  return git(repo, "worktree", "list", "--porcelain")
    .split("\n")
    .filter((line) => line.startsWith("worktree "))
    .map((line) => line.slice("worktree ".length))
    .slice(1);
}

/**
 * What `git add -A` writes to stderr, trimmed, in `worktreePath` while the stale index.lock is still there: the
 * failure cleanup's own `git add -A` met, since `git status` reads the tree past the lock.
 */
function addFailure(worktreePath: string): string {
  try {
    execFileSync("git", ["add", "-A"], { cwd: worktreePath, encoding: "utf-8", stdio: "pipe" });
  } catch (err) {
    return String((err as { stderr?: string }).stderr ?? "").trim();
  }
  throw new Error(`git add -A succeeded in ${worktreePath}: the index.lock is gone`);
}

/** What the child's bash command does, done by the test in `cwd`. */
function editAndLock(cwd: string): void {
  writeFileSync(join(cwd, "README.md"), TRACKED_BYTES);
  writeFileSync(join(cwd, "work.txt"), UNTRACKED_BYTES);
  writeFileSync(join(resolve(cwd, git(cwd, "rev-parse", "--git-dir")), "index.lock"), "");
}

const label = (value: string) => sanitizeWorkbenchText(value, WORKBENCH_TEXT_LIMIT, "label");
/** The exact note for a failed variant's diagnostic and kept path, and the repo when one is named. */
function expectedNote(diagnostic: string, kept: string, repo: string | undefined): string {
  const repoNote = repo === undefined ? "" : ` (a worktree of \`${label(repo)}\`)`;
  return `\n\n---\nWorktree preservation failed: ${label(diagnostic)}\n` +
    `Nothing was saved to a branch. The agent's work is kept in its worktree at \`${label(kept)}\`${repoNote}; recover it from there.`;
}

/** How each resolved run is driven to the status it settles with, and the reply it leaves before the note. */
interface ResolvedRun {
  status: AgentRecord["status"];
  turn: FauxResponseStep;
  /** Spawn options for the run; `stop` aborts it through the manager. */
  options: (stop: () => void) => Partial<SpawnOptions>;
  graceTurns?: number;
  reply: string;
}
const RESOLVED_RUNS: readonly ResolvedRun[] = [
  { status: "completed", turn: bashThenMarker, options: () => ({}), reply: CHILD_MARKER },
  // The turn limit is reached after the bash turn: the child is steered to wrap up and answers.
  { status: "steered", turn: bashThenMarker, options: () => ({ maxTurns: 1 }), reply: CHILD_MARKER },
  // One grace turn past the limit, and the child is still calling bash: the run aborts and resolves.
  { status: "aborted", turn: bashForever, options: () => ({ maxTurns: 1 }), graceTurns: 1, reply: "" },
  { status: "error", turn: bashThenError, options: () => ({}), reply: "" },
  // The caller stops the run once its bash call has ended; the run resolves with the stop kept.
  {
    status: "stopped",
    turn: bashThenMarker,
    options: (stop) => ({ onToolActivity: (activity) => { if (activity.type === "end" && activity.toolName === "bash") stop(); } }),
    reply: "",
  },
];

/** The four cwds a spawn can create its worktree from. */
const MODES = [
  "a caller-supplied cwd at the repo root",
  "a caller-supplied cwd in the repo's pkg subdirectory",
  "the parent session's own cwd at the repo root",
  "the parent session's own cwd in the repo's pkg subdirectory",
] as const;
type Mode = (typeof MODES)[number];
const callerSupplied = (mode: Mode) => mode.startsWith("a caller-supplied cwd");
const inPkg = (mode: Mode) => mode.endsWith("pkg subdirectory");

describe("AgentManager paths that store a cleanup result, each driven to a preservation failure (wb-5ik5, EAT-R003)", () => {
  let faux: ReturnType<typeof registerFauxProvider>;
  let manager: AgentManager | undefined;
  const repos: string[] = [];
  let previousAgentDir: string | undefined;
  let previousHome: string | undefined;
  const defaultGraceTurns = getGraceTurns();

  beforeEach(() => {
    // Hermetic: the child session reads its agent directory (settings, extensions, sessions) from these.
    previousAgentDir = process.env.PI_CODING_AGENT_DIR;
    previousHome = process.env.HOME;
    const home = makeScratch("wt-settle-home-");
    process.env.PI_CODING_AGENT_DIR = home;
    process.env.HOME = home;
    registerAgents(new Map());
    faux = registerFauxProvider({ provider: "faux", models: [{ id: "faux-1", contextWindow: 200_000 }] });
  });

  afterEach(async () => {
    await manager?.dispose();
    manager = undefined;
    faux.unregister();
    setGraceTurns(defaultGraceTurns);
    if (previousAgentDir === undefined) delete process.env.PI_CODING_AGENT_DIR;
    else process.env.PI_CODING_AGENT_DIR = previousAgentDir;
    if (previousHome === undefined) delete process.env.HOME;
    else process.env.HOME = previousHome;
    // A kept worktree is the test's to remove, found through git even when an assertion failed before it was tracked.
    for (const repo of repos.splice(0)) for (const path of linkedWorktrees(repo)) trackScratch(path);
    removeAllScratch();
  });

  /** A repo to create the worktree from, the spawn's context and cwd option for `mode`, and the repo the note names. */
  function setUp(mode: Mode): { repo: string; ctx: ExtensionContext; cwd: Partial<SpawnOptions>; noteRepo: string | undefined } {
    const repo = initGitRepo();
    repos.push(repo);
    const from = inPkg(mode) ? join(repo, "pkg") : repo;
    return callerSupplied(mode)
      ? { repo, ctx: parentContext(makeScratch("wt-settle-parent-"), faux.getModel()), cwd: { cwd: from }, noteRepo: from }
      : { repo, ctx: parentContext(from, faux.getModel()), cwd: {}, noteRepo: undefined };
  }

  /** Spawn a background worktree agent; `options` sees the id, so a callback can reach the agent's record. */
  function spawn(pi: ExtensionAPI, ctx: ExtensionContext, options: (id: () => string) => Partial<SpawnOptions>): string {
    manager = new AgentManager();
    let id = "";
    id = manager.spawn(pi, ctx, "general-purpose", "Edit the files.", {
      description: "worktree work",
      isBackground: true,
      isolation: "worktree",
      ...options(() => id),
    });
    return id;
  }

  /** The record once the manager has settled it. */
  async function settledRecord(id: string): Promise<AgentRecord> {
    await manager!.awaitStartup(id);
    const record = manager!.getRecord(id);
    if (!record) throw new Error(`no record for ${id}`);
    await record.promise;
    return record;
  }

  /** Where the child works inside the worktree: workPath for a caller-supplied cwd, the worktree's root otherwise. */
  function childCwd(record: AgentRecord, mode: Mode): string {
    return callerSupplied(mode) ? record.worktree!.workPath : record.worktree!.path;
  }

  /**
   * The record's failed variant (exactly, with `diagnostic` from the kept path), the kept directory and no pi-agent-*
   * branch in `repo`. Returns the kept path and the diagnostic.
   */
  function expectKeptWorktree(record: AgentRecord, mode: Mode, repo: string, diagnostic: (kept: string) => string): { kept: string; expected: string } {
    expect(record.worktree).toBeDefined();
    const kept = trackScratch(record.worktree!.path);
    expect(existsSync(kept)).toBe(true);
    expect(record.worktree!.workPath).toBe(inPkg(mode) ? join(kept, "pkg") : kept);
    const expected = diagnostic(kept);
    expect(expected).not.toBe("");
    expect(record.worktreeResult).toEqual({ hasChanges: true, preservationFailed: true, path: kept, diagnostic: expected });
    expect(git(repo, "branch", "--list", "pi-agent-*")).toBe("");
    return { kept, expected };
  }

  function expectChildBytes(record: AgentRecord, mode: Mode): void {
    expect(readFileSync(join(childCwd(record, mode), "README.md"), "utf-8")).toBe(TRACKED_BYTES);
    expect(readFileSync(join(childCwd(record, mode), "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
  }

  describe.each(MODES)("with %s", (mode) => {
    it.each(RESOLVED_RUNS.map((run) => [run.status, run] as const))("ST-RESOLVED-%s: the record holds the failed variant and the result is the reply then the exact note", async (_status, run) => {
      const { repo, ctx, cwd, noteRepo } = setUp(mode);
      if (run.graceTurns !== undefined) setGraceTurns(run.graceTurns);
      faux.setResponses(Array.from({ length: 12 }, () => run.turn));
      const id = spawn(realPi(), ctx, (current) => ({ ...cwd, ...run.options(() => manager!.abort(current())) }));

      const record = await settledRecord(id);

      expect(record.status).toBe(run.status);
      if (run.status === "error") expect(record.error).toContain(FATAL);
      const { kept, expected } = expectKeptWorktree(record, mode, repo, addFailure);
      expect(expected).toContain("\n");
      expectChildBytes(record, mode);
      expect(record.result).toBe(run.reply + expectedNote(expected, kept, noteRepo));
    });

    it("ST-RESOLVED-PLANTED: a completed run whose `git add -A` fails with PLANTED_STDERR stores it trimmed, and the result is the reply then its note", async () => {
      const { repo, ctx, cwd, noteRepo } = setUp(mode);
      faux.setResponses(Array.from({ length: 12 }, () => bashThenMarker));
      const id = spawn(realPi(addPlanted), ctx, () => cwd);

      const record = await settledRecord(id);

      expect(record.status).toBe("completed");
      const { kept } = expectKeptWorktree(record, mode, repo, () => PLANTED_STDERR.trim());
      expectChildBytes(record, mode);
      expect(record.result).toBe(CHILD_MARKER + expectedNote(PLANTED_STDERR.trim(), kept, noteRepo));
    });

    it.each([
      ["ST-REJECTED", "the stale index.lock", () => realPi(), addFailure],
      ["ST-REJECTED-PLANTED", "`git add -A` answered with PLANTED_STDERR", () => realPi(addPlanted), () => PLANTED_STDERR.trim()],
    ] as const)("%s: a rejected run (%s): the record holds the failed variant as cleanup returned it, and no result text is set", async (_id, _failure, pi, diagnostic) => {
      const { repo, ctx, cwd } = setUp(mode);
      const id = spawn(pi(), ctx, (current) => ({
        ...cwd,
        onSessionCreated: () => {
          editAndLock(childCwd(manager!.getRecord(current())!, mode));
          throw new Error("the run rejected after editing its worktree");
        },
      }));

      const record = await settledRecord(id);

      expect(record.status).toBe("error");
      expect(record.error).toBe("the run rejected after editing its worktree");
      expectKeptWorktree(record, mode, repo, diagnostic);
      expectChildBytes(record, mode);
      expect(record.result).toBeUndefined();
    });

    it("ST-STOP: a stop that lands while the worktree is being created, with `git status --porcelain` failing with PLANTED_STDERR: the record holds the failed variant, and no result text is set", async () => {
      const { repo, ctx, cwd } = setUp(mode);
      const id = spawn(realPi(statusPlanted), ctx, () => cwd);
      expect(manager!.abort(id)).toBe(true);

      await manager!.awaitStartup(id);
      const record = manager!.getRecord(id)!;

      expect(record.status).toBe("stopped");
      expectKeptWorktree(record, mode, repo, () => PLANTED_STDERR.trim());
      expect(record.result).toBeUndefined();
    });
  });
});
