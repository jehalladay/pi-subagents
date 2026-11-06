/**
 * worktree-preservation-settlement.test.ts — wb-5ik5 (EAT-R003; program mechanical-workflows-interop-2026-11-04,
 * ATOMIC-REQUIREMENTS.md@0b25e14e): the three AgentManager paths that store a worktree cleanup result, each driven to
 * a preservation failure, once with a caller-supplied cwd and once in the parent session's own cwd. The cases pin the
 * result each path stores on the record and the text it leaves in the record's result.
 *
 * Real git, the real AgentManager and the real createWorktree/cleanupWorktree, with no module mock. A resolved run
 * goes through the real runAgent and a real pi-mono child session on a faux model: the child's own bash command edits a
 * tracked file, adds an untracked one and leaves a stale index.lock in its worktree's git directory, so the
 * preservation fails with git's own message, which names index.lock. The five resolved runs settle with each status the
 * resolved path can give a record: completed, steered, aborted, error and stopped. The rejected run makes the same
 * edits from the caller's onSessionCreated callback, which then throws, so runAgent rejects before the child's first
 * turn. The stop lands while the worktree is being created, and the pi given to the manager answers `git status` with
 * a failure.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
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
/** The child's one command, run by the REAL bash tool in the cwd the child was given (its worktree). */
const CHILD_COMMAND = [
  "printf '# Test repo\\nedited by the agent\\n' > README.md",
  "printf 'agent output\\n' > work.txt",
  'touch "$(git rev-parse --git-dir)/index.lock"',
].join(" && ");
/** A provider error pi does not retry: not one of its transient-error patterns. */
const FATAL = "invalid request: provider rejected the prompt";

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf-8", stdio: "pipe", timeout: 10_000 }).trim();
}

/** A real repo with one commit — `git worktree add` needs a HEAD to branch from. */
function initGitRepo(): string {
  const dir = makeScratch("wt-settle-repo-");
  git(dir, "init");
  git(dir, "config", "user.email", "test@test.com");
  git(dir, "config", "user.name", "Test");
  writeFileSync(join(dir, "README.md"), "# Test repo");
  git(dir, "add", "README.md");
  git(dir, "commit", "-m", "initial");
  return dir;
}

/**
 * A pi whose exec runs git for real and, like the host's, reports a failure in the result instead of rejecting.
 * `fails` picks the calls answered with a canned failure whose stderr is "boom" instead.
 */
function realPi(fails: (args: string[]) => boolean = () => false): ExtensionAPI {
  return {
    exec: async (command: string, args: string[], options?: { cwd?: string; timeout?: number }) => {
      if (fails(args)) return { stdout: "", stderr: "boom", code: 1, killed: false };
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

/** What the child's bash command does, done by the test inside `worktreePath`. */
function editAndLock(worktreePath: string): void {
  writeFileSync(join(worktreePath, "README.md"), TRACKED_BYTES);
  writeFileSync(join(worktreePath, "work.txt"), UNTRACKED_BYTES);
  writeFileSync(join(resolve(worktreePath, git(worktreePath, "rev-parse", "--git-dir")), "index.lock"), "");
}

/** How each resolved run is driven to the status it settles with. */
interface ResolvedRun {
  status: AgentRecord["status"];
  turn: FauxResponseStep;
  /** Spawn options for the run; `stop` aborts it through the manager. */
  options: (stop: () => void) => Partial<SpawnOptions>;
  graceTurns?: number;
}
const RESOLVED_RUNS: readonly ResolvedRun[] = [
  { status: "completed", turn: bashThenMarker, options: () => ({}) },
  // The turn limit is reached after the bash turn: the child is steered to wrap up and answers.
  { status: "steered", turn: bashThenMarker, options: () => ({ maxTurns: 1 }) },
  // One grace turn past the limit, and the child is still calling bash: the run aborts and resolves.
  { status: "aborted", turn: bashForever, options: () => ({ maxTurns: 1 }), graceTurns: 1 },
  { status: "error", turn: bashThenError, options: () => ({}) },
  // The caller stops the run once its bash call has ended; the run resolves with the stop kept.
  {
    status: "stopped",
    turn: bashThenMarker,
    options: (stop) => ({ onToolActivity: (activity) => { if (activity.type === "end" && activity.toolName === "bash") stop(); } }),
  },
];

/** The two cwds a spawn can create its worktree from: a caller-supplied one, or the parent session's own. */
const CWD_MODES = ["a caller-supplied cwd", "the parent session's own cwd"] as const;
type CwdMode = (typeof CWD_MODES)[number];

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

  /** A repo to create the worktree from, and the spawn's context and cwd option for `mode`. */
  function setUp(mode: CwdMode): { repo: string; ctx: ExtensionContext; cwd: Partial<SpawnOptions> } {
    const repo = initGitRepo();
    repos.push(repo);
    return mode === "a caller-supplied cwd"
      ? { repo, ctx: parentContext(makeScratch("wt-settle-parent-"), faux.getModel()), cwd: { cwd: repo } }
      : { repo, ctx: parentContext(repo, faux.getModel()), cwd: {} };
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

  /**
   * The record's failed variant, the kept directory and no pi-agent-* branch in `repo`. Returns the kept path.
   * `diagnostic` gives the exact text expected from the kept path.
   */
  function expectKeptWorktree(record: AgentRecord, repo: string, diagnostic: (kept: string) => string): string {
    expect(record.worktree).toBeDefined();
    const kept = trackScratch(record.worktree!.path);
    expect(existsSync(kept)).toBe(true);
    const expected = diagnostic(kept);
    expect(expected).not.toBe("");
    expect(record.worktreeResult).toEqual({ hasChanges: true, preservationFailed: true, path: kept, diagnostic: expected });
    expect(git(repo, "branch", "--list", "pi-agent-*")).toBe("");
    return kept;
  }

  /** The note's last sentence: the kept path, then the repo for a caller-supplied cwd and nothing for the parent's own. */
  function noteTail(kept: string, mode: CwdMode, repo: string): string {
    const repoNote = mode === "a caller-supplied cwd" ? ` (a worktree of \`${repo}\`)` : "";
    return `kept in its worktree at \`${kept}\`${repoNote}; recover it from there.`;
  }

  describe.each(CWD_MODES)("with %s", (mode) => {
    it.each(RESOLVED_RUNS)("a run that resolves as $status: the record holds the failed variant and the result ends with the note", async (run) => {
      const { repo, ctx, cwd } = setUp(mode);
      if (run.graceTurns !== undefined) setGraceTurns(run.graceTurns);
      faux.setResponses(Array.from({ length: 12 }, () => run.turn));
      const id = spawn(realPi(), ctx, (current) => ({ ...cwd, ...run.options(() => manager!.abort(current())) }));

      const record = await settledRecord(id);

      expect(record.status).toBe(run.status);
      if (run.status === "error") expect(record.error).toContain(FATAL);
      const kept = expectKeptWorktree(record, repo, addFailure);
      expect(readFileSync(join(kept, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
      expect(readFileSync(join(kept, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
      // Appended once, at the end of the result.
      expect(record.result?.split("\n\n---\nWorktree preservation failed: ")).toHaveLength(2);
      expect(record.result).toContain("index.lock");
      const tail = noteTail(kept, mode, repo);
      expect(record.result?.slice(-tail.length)).toBe(tail);
      if (mode === "the parent session's own cwd") expect(record.result).not.toContain("(a worktree of");
    });

    it("a rejected run: the record holds the failed variant as cleanup returned it, and no result text is set", async () => {
      const { repo, ctx, cwd } = setUp(mode);
      const id = spawn(realPi(), ctx, (current) => ({
        ...cwd,
        onSessionCreated: () => {
          editAndLock(manager!.getRecord(current())!.worktree!.workPath);
          throw new Error("the run rejected after editing its worktree");
        },
      }));

      const record = await settledRecord(id);

      expect(record.status).toBe("error");
      expect(record.error).toBe("the run rejected after editing its worktree");
      const kept = expectKeptWorktree(record, repo, addFailure);
      expect(readFileSync(join(kept, "README.md"), "utf-8")).toBe(TRACKED_BYTES);
      expect(readFileSync(join(kept, "work.txt"), "utf-8")).toBe(UNTRACKED_BYTES);
      expect(record.result).toBeUndefined();
    });

    it("a stop that lands while the worktree is being created: the record holds the failed variant cleanup returned", async () => {
      const { repo, ctx, cwd } = setUp(mode);
      const id = spawn(realPi((args) => args[0] === "status"), ctx, () => cwd);
      expect(manager!.abort(id)).toBe(true);

      await manager!.awaitStartup(id);
      const record = manager!.getRecord(id)!;

      expect(record.status).toBe("stopped");
      expectKeptWorktree(record, repo, () => "boom");
      expect(record.result).toBeUndefined();
    });
  });
});
