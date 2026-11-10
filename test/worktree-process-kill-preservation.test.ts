/**
 * worktree-process-kill-preservation.test.ts - wb-7wkb (MNI-2026-11-09 P01), EAT-R215 "Acquire process-death
 * preservation evidence" of docs/workbench/programs/mechanical-native-interoperability-2026-11-09/requirements/
 * ATOMIC-REQUIREMENTS.md at pi-subagents master 18b016b2 (the program pages are master-only). Its acceptance criteria:
 *   1. "Assert an isolated child process is killed after creating tracked and untracked edits and after an independently
 *      controlled partial Git preservation step; before/after snapshots include file bytes, HEAD, index and recovery path."
 *   2. "Assert a separate process opens the retained worktree and compares exact bytes/refs; if native evidence cannot
 *      establish retention, the test reports unknown/blocked and no successful-preservation claim."
 *   3. "Assert the same harness proves its detector by planting a destructive-cleanup mutant and observing a failure."
 *
 * The trial. A child Node process (CHILD below, run with --experimental-strip-types) imports the REAL src/worktree.ts,
 * creates a worktree of a real scratch repo with createWorktree, writes the agent's tracked edit (README.md) and
 * untracked file (work.txt) into it, and runs the REAL cleanupWorktree through a pi.exec that runs real git. When the
 * cleanup reaches the git step a row parks at, that call never runs: the child prints PARKED and waits, so every step
 * before it ran for real and none after it did. While the child is parked a separate verifier process (VERIFIER below)
 * takes the before snapshot; the test then SIGKILLs the child, and a fresh verifier process runs the REAL
 * pruneWorktrees on the repo (the crash-recovery prune a later Pi runs at dispose) and takes the after snapshot. Once
 * that restart verifier process has exited, a third verifier process, with no prune, takes the later snapshot. A
 * snapshot holds: whether the kept path exists, its README.md and work.txt bytes, HEAD, the index paths (the path column
 * of git ls-files --stage), git status --porcelain, whether the repo's worktree list registers the path (the recovery
 * path), every pi-agent-* branch with its commit, and the README.md and work.txt bytes of the kept HEAD's tree.
 * judgeRetention reads a pair, the before snapshot and one taken after the kill: retained (the second snapshot holds the
 * agent's exact bytes at a registered path and equals the before snapshot), changed (the bytes held but the second
 * snapshot differs), lost (the path is gone or unregistered, or a byte differs) or unknown (a verifier could not read a
 * snapshot).
 *
 * PINNED READER SET, each by its own case, and nothing wider:
 *  - KILL-ROWS: for each KILL_ROWS row (the child parked at git status, add, commit, branch or worktree remove, the five
 *    git steps cleanupWorktree runs when the agent changed files, in that order), the before snapshot holds the agent's
 *    exact tracked and untracked bytes, the row's HEAD (the base commit, or a new commit whose tree holds both files),
 *    the row's status lines, index paths and pi-agent-* branches, at a registered path; the child's exit is the SIGKILL;
 *    and the after snapshot (read after the restart prune) and the later snapshot (read by a separate process after the
 *    restart verifier process exited) each equal the before snapshot, and judgeRetention reads retained on both pairs.
 *  - FULL-RUN: with no park the child's cleanup completes, returns the preserved variant naming the pi-agent-<id>
 *    branch, logs exactly the git steps KILL_ROWS parks at, in KILL_ROWS order (the anchor KILL-SHAPE reads), and
 *    leaves the branch's tree holding both files' exact bytes (git show output compared untrimmed) and no registered
 *    worktree at the path, read once the child exited by a verifier with no prune and again by one after a restart prune.
 *  - KILL-SHAPE: KILL_ROWS and MUTANT_ROWS are the frozen lists below, and KILL_ROWS's steps are the steps FULL-RUN
 *    observes the product run (an anchor outside this file's literals).
 *  - MUTANT-ROWS: the detector proof. A child that, at the commit park, first runs a destructive cleanup (the real git
 *    worktree remove --force of the kept path, or a git reset --hard plus git clean -fd inside it) is killed the same
 *    way, and judgeRetention reads lost.
 *  - LATER-READ: the detector proof of the later snapshot. A restart verifier that, after its prune, sets a 0 ms timer
 *    running the real git worktree remove --force of the kept path still writes an after snapshot equal to the before
 *    snapshot (judgeRetention reads retained on that pair), and the later snapshot finds the path gone (lost).
 *  - JUDGE-ROWS: a verifier run against a repo that no longer exists yields an unreadable snapshot, and judgeRetention
 *    reads unknown, never retained, when either snapshot of a pair is unreadable; on the planted snapshots of that case it
 *    reads retained for an equal pair holding the agent's bytes, changed when only HEAD differs, and lost when the path
 *    is gone, is unregistered, or one file's bytes differ.
 *  - ROSTER: the tests this file registers are exactly the ROSTER titles, in order, each in run mode and none marked to
 *    fail, the ROSTER case registered last; and the leading ids of their titles, each once in order, are exactly the ids
 *    that open the bullets of this PINNED READER SET, read from this file's own source (an anchor outside its literals).
 * NOT CLAIMED by this file: a change made after a row's later snapshot (by a process the restart left running, for
 * example); a kill inside a running git process (each park holds the call before git starts, so no index.lock or partly
 * written object is planted), power loss, a kill of a Pi session or of an AgentManager run, the preservation-failure
 * variant (test/worktree.test.ts and test/worktree-preservation-*.test.ts pin it), cleanup with no changes, and any
 * other step, path, cwd or git state than the rows'.
 * RESIDUAL: none claimed.
 */
import { type ChildProcess, execFileSync, spawn, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch, trackScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

vi.setConfig({ testTimeout: 60_000 });

const AGENT_ID = "kill-trial";
const BRANCH = `pi-agent-${AGENT_ID}`;
const BASE_BYTES = "# Test repo\n";
const TRACKED_BYTES = "# Test repo\nedited by the agent before the kill\n";
const UNTRACKED_BYTES = "agent output kept across the kill\n";
const NODE_FLAGS = ["--disable-warning=ExperimentalWarning", "--experimental-strip-types", "--input-type=module", "-e"];

/** The child: the real createWorktree and cleanupWorktree over real git, parked at plan.park (null: never). */
const CHILD = `
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { cleanupWorktree, createWorktree } from "./src/worktree.ts";
const plan = JSON.parse(process.env.PRESERVE_KILL_PLAN);
const say = line => process.stdout.write(line + "\\n");
const stepOf = args => (args[0] === "worktree" ? "worktree " + args[1] : args[0]);
const real = (cmd, args, options) => new Promise(resolve => {
  execFile(cmd, args, { cwd: options.cwd, timeout: options.timeout }, (error, stdout, stderr) => {
    resolve({ stdout: String(stdout), stderr: String(stderr), code: error ? (typeof error.code === "number" ? error.code : 1) : 0, killed: Boolean(error && error.killed) });
  });
});
let kept;
const pi = {
  async exec(cmd, args, options) {
    if (kept === undefined) return real(cmd, args, options);
    const step = stepOf(args);
    say("STEP " + JSON.stringify(step));
    if (step !== plan.park) return real(cmd, args, options);
    if (plan.mutant === "remove") await real("git", ["worktree", "remove", "--force", kept.path], { cwd: plan.repo, timeout: 10000 });
    if (plan.mutant === "wipe") {
      await real("git", ["reset", "--hard"], { cwd: kept.path, timeout: 10000 });
      await real("git", ["clean", "-fd"], { cwd: kept.path, timeout: 10000 });
    }
    say("PARKED " + JSON.stringify(step));
    setInterval(() => {}, 1 << 30);
    return new Promise(() => {});
  },
};
const worktree = await createWorktree(pi, plan.repo, plan.agentId);
if (worktree === undefined) { say("NO-WORKTREE"); process.exit(3); }
say("CREATED " + JSON.stringify({ path: worktree.path, baseSha: worktree.baseSha }));
writeFileSync(join(worktree.path, "README.md"), plan.tracked);
writeFileSync(join(worktree.path, "work.txt"), plan.untracked);
kept = worktree;
const result = await cleanupWorktree(pi, plan.repo, worktree, "process kill trial");
say("RESULT " + JSON.stringify(result));
`;

/** The verifier: a separate process that optionally runs the real crash-recovery prune, then reads one snapshot. */
const VERIFIER = `
import { execFile, execFileSync } from "node:child_process";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
import { pruneWorktrees } from "./src/worktree.ts";
const plan = JSON.parse(process.env.PRESERVE_VERIFY_PLAN);
const git = (cwd, ...args) => execFileSync("git", args, { cwd, stdio: ["ignore", "pipe", "pipe"], timeout: 10000 }).toString();
const lines = text => text.split("\\n").filter(line => line.length > 0);
const shown = (file) => { try { return git(plan.path, "show", "HEAD:" + file); } catch { return null; } };
if (plan.restart) {
  const pi = { exec: (cmd, args, options) => new Promise(resolve => {
    execFile(cmd, args, { cwd: options.cwd, timeout: options.timeout }, (error, stdout, stderr) => {
      resolve({ stdout: String(stdout), stderr: String(stderr), code: error ? (typeof error.code === "number" ? error.code : 1) : 0, killed: Boolean(error && error.killed) });
    });
  }) };
  await pruneWorktrees(pi, plan.repo);
  // LATER-READ's plant: a removal of the kept path that runs only after this process has written its snapshot.
  if (plan.deferRemove) setTimeout(() => { execFile("git", ["worktree", "remove", "--force", plan.path], { cwd: plan.repo, timeout: 10000 }, () => {}); }, 0);
}
const exists = existsSync(plan.path);
const spellings = exists ? [plan.path, realpathSync(plan.path)] : [plan.path];
const registered = lines(git(plan.repo, "worktree", "list", "--porcelain")).some(line => spellings.some(spelling => line === "worktree " + spelling));
const branches = lines(git(plan.repo, "for-each-ref", "--format=%(refname:short) %(objectname)", "refs/heads/pi-agent-*"));
const read = file => (existsSync(join(plan.path, file)) ? readFileSync(join(plan.path, file), "utf8") : null);
process.stdout.write(JSON.stringify({
  exists, registered, branches,
  tracked: exists ? read("README.md") : null,
  untracked: exists ? read("work.txt") : null,
  head: exists ? git(plan.path, "rev-parse", "HEAD").trim() : null,
  index: exists ? lines(git(plan.path, "ls-files", "--stage")).map(line => line.split("\\t")[1]) : null,
  status: exists ? lines(git(plan.path, "status", "--porcelain")) : null,
  committed: exists ? { tracked: shown("README.md"), untracked: shown("work.txt") } : null,
}));
`;

interface Snapshot {
  exists: boolean;
  registered: boolean;
  branches: string[];
  tracked: string | null;
  untracked: string | null;
  head: string | null;
  index: string[] | null;
  status: string[] | null;
  committed: { tracked: string | null; untracked: string | null } | null;
}
type Reading = { kind: "read"; snapshot: Snapshot } | { kind: "unreadable"; detail: string };
type Verdict = "retained" | "changed" | "lost" | "unknown";

/** The pair's verdict: only a readable pair whose after side holds the agent's bytes at a registered path, unchanged, is retained. */
function judgeRetention(before: Reading, after: Reading): Verdict {
  if (before.kind !== "read" || after.kind !== "read") return "unknown";
  const kept = after.snapshot;
  if (!kept.exists || !kept.registered || kept.tracked !== TRACKED_BYTES || kept.untracked !== UNTRACKED_BYTES) return "lost";
  return isDeepStrictEqual(kept, before.snapshot) ? "retained" : "changed";
}

/** One kill row: the git step the child parks at and the partial state that step leaves. */
interface KillRow {
  id: string;
  park: string;
  /** "base": HEAD is still the commit the worktree was made from; "moved": the cleanup's commit ran. */
  head: "base" | "moved";
  status: string[];
  index: string[];
  branched: boolean;
}

const KILL_ROWS: readonly KillRow[] = [
  { id: "K1", park: "status", head: "base", status: [" M README.md", "?? work.txt"], index: ["README.md"], branched: false },
  { id: "K2", park: "add", head: "base", status: [" M README.md", "?? work.txt"], index: ["README.md"], branched: false },
  { id: "K3", park: "commit", head: "base", status: ["M  README.md", "A  work.txt"], index: ["README.md", "work.txt"], branched: false },
  { id: "K4", park: "branch", head: "moved", status: [], index: ["README.md", "work.txt"], branched: false },
  { id: "K5", park: "worktree remove", head: "moved", status: [], index: ["README.md", "work.txt"], branched: true },
];

/** The detector proof: a destructive cleanup the child runs at the commit park before it waits. */
const MUTANT_ROWS = [
  { id: "M-REMOVE", park: "commit", mutant: "remove" },
  { id: "M-WIPE", park: "commit", mutant: "wipe" },
] as const;

/** The ids that open this header's PINNED READER SET bullets, in order, read from this file's own source text. */
function headerIds(): string[] {
  const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const ids: string[] = [];
  for (const line of text.slice(0, text.indexOf("*/")).split("\n")) {
    const bullet = /^ \* {2}- ([A-Z][A-Z0-9-]*(?:(?:, | and )[A-Z][A-Z0-9-]*)*):/.exec(line);
    if (bullet) ids.push(...bullet[1].split(/, | and /));
  }
  return ids;
}

/** A registered title's leading id: its first token, without the quotes it.each puts around a $id. */
function titleId(name: string): string {
  return /^'?([A-Z][A-Z0-9-]*)/.exec(name)?.[1] ?? name;
}

/** Every test this file registers, in registration order (the ROSTER case reads vitest's task tree against it). */
const ROSTER = [
  "KILL-ROWS 'K1' parked at git 'status': exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process",
  "KILL-ROWS 'K2' parked at git 'add': exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process",
  "KILL-ROWS 'K3' parked at git 'commit': exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process",
  "KILL-ROWS 'K4' parked at git 'branch': exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process",
  "KILL-ROWS 'K5' parked at git 'worktree remove': exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process",
  "FULL-RUN with no park the cleanup completes, its branch's tree holds both files' exact bytes, and it logs exactly the KILL_ROWS steps in order",
  "KILL-SHAPE the kill and mutant tables are frozen, and the kill steps are the steps the full run observes",
  "MUTANT-ROWS 'M-REMOVE': a destructive cleanup at the 'commit' park is read as lost",
  "MUTANT-ROWS 'M-WIPE': a destructive cleanup at the 'commit' park is read as lost",
  "LATER-READ a removal the restart verifier defers past its own snapshot reads retained in that snapshot and lost in the later one",
  "JUDGE-ROWS an unreadable snapshot is read as unknown, never retained, and each planted pair gets its verdict",
  "ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail",
] as const;

function git(cwd: string, ...args: string[]): string {
  return gitBytes(cwd, ...args).trim();
}

/** git's stdout exactly as written, untrimmed (FULL-RUN compares blob bytes through it). */
function gitBytes(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, { cwd, stdio: "pipe", timeout: 10_000 }).toString();
}

/** A real repo with one commit; makeScratch tracks it for the leak guard. */
function initRepo(): string {
  const dir = makeScratch("wt-kill-");
  git(dir, "init", "-q");
  git(dir, "config", "user.email", "operator@example.invalid");
  git(dir, "config", "user.name", "Test Operator");
  writeFileSync(join(dir, "README.md"), BASE_BYTES);
  git(dir, "add", "README.md");
  git(dir, "commit", "-q", "-m", "baseline");
  return dir;
}

interface ChildRun {
  child: ChildProcess;
  steps: string[];
  /** Resolves with the payload of the first stdout line that starts with `tag `; rejects if the child exits first. */
  line(tag: string): Promise<string>;
  exit: Promise<{ code: number | null; signal: NodeJS.Signals | null; stderr: string }>;
}

const children: ChildProcess[] = [];
const scratch: string[] = [];
afterEach(() => {
  for (const child of children.splice(0)) if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
  removeScratch(...scratch.splice(0));
});

function startChild(plan: { repo: string; park: string | null; mutant: "none" | "remove" | "wipe" }): ChildRun {
  const env = { ...process.env, PRESERVE_KILL_PLAN: JSON.stringify({ ...plan, agentId: AGENT_ID, tracked: TRACKED_BYTES, untracked: UNTRACKED_BYTES }) };
  const child = spawn(process.execPath, [...NODE_FLAGS, CHILD], { cwd: process.cwd(), env, stdio: ["ignore", "pipe", "pipe"] });
  children.push(child);
  const seen: string[] = [];
  const steps: string[] = [];
  const waiters: Array<{ tag: string; resolve(payload: string): void; reject(error: Error): void }> = [];
  let buffered = "";
  let stderr = "";
  let exited = false;
  child.stderr?.on("data", chunk => {
    stderr += String(chunk);
  });
  const offer = () => {
    for (const waiter of [...waiters]) {
      const hit = seen.find(entry => entry.startsWith(`${waiter.tag} `));
      if (hit !== undefined) {
        waiters.splice(waiters.indexOf(waiter), 1);
        waiter.resolve(hit.slice(waiter.tag.length + 1));
      } else if (exited) {
        waiters.splice(waiters.indexOf(waiter), 1);
        waiter.reject(new Error(`child exited before ${waiter.tag}; stdout ${JSON.stringify(seen)}; stderr ${stderr}`));
      }
    }
  };
  child.stdout?.on("data", chunk => {
    buffered += String(chunk);
    const parts = buffered.split("\n");
    buffered = parts.pop() ?? "";
    for (const part of parts) {
      seen.push(part);
      if (part.startsWith("STEP ")) steps.push(JSON.parse(part.slice(5)) as string);
    }
    offer();
  });
  const exit = new Promise<{ code: number | null; signal: NodeJS.Signals | null; stderr: string }>(resolve => {
    child.on("close", (code, signal) => {
      exited = true;
      offer();
      resolve({ code, signal, stderr });
    });
  });
  return {
    child,
    steps,
    exit,
    line: tag =>
      new Promise<string>((resolve, reject) => {
        waiters.push({ tag, resolve, reject });
        offer();
      }),
  };
}

/**
 * One snapshot read by a separate verifier process, which spawnSync waits on until it exits; restart first runs the
 * real pruneWorktrees on the repo, and deferRemove (with restart) plants LATER-READ's removal after the prune.
 */
function snapshot(repo: string, path: string, restart: boolean, deferRemove = false): Reading {
  const env = { ...process.env, PRESERVE_VERIFY_PLAN: JSON.stringify({ repo, path, restart, deferRemove }) };
  const run = spawnSync(process.execPath, [...NODE_FLAGS, VERIFIER], { cwd: process.cwd(), env, encoding: "utf8", timeout: 30_000 });
  if (run.status !== 0) return { kind: "unreadable", detail: `verifier exit ${String(run.status)}: ${run.stderr.trim()}` };
  try {
    return { kind: "read", snapshot: JSON.parse(run.stdout) as Snapshot };
  } catch (error) {
    return { kind: "unreadable", detail: `verifier output unparseable: ${String(error)}` };
  }
}

function readOf(reading: Reading): Snapshot {
  if (reading.kind !== "read") throw new Error(`unreadable snapshot: ${reading.detail}`);
  return reading.snapshot;
}

/** Park the child at `park`, take the before snapshot, SIGKILL it, restart-prune and take the after snapshot, then the later one. */
async function killTrial(park: string, mutant: "none" | "remove" | "wipe", deferRemove = false) {
  const repo = initRepo();
  scratch.push(repo);
  const run = startChild({ repo, park, mutant });
  const created = JSON.parse(await run.line("CREATED")) as { path: string; baseSha: string };
  scratch.push(trackScratch(created.path));
  expect(await run.line("PARKED")).toBe(JSON.stringify(park));
  const before = snapshot(repo, created.path, false);
  run.child.kill("SIGKILL");
  const exit = await run.exit;
  const after = snapshot(repo, created.path, true, deferRemove);
  // A third process, started only once the restart verifier process has exited.
  const later = snapshot(repo, created.path, false);
  return { repo, created, before, after, later, exit, steps: [...run.steps] };
}

describe("cleanupWorktree's kept bytes, read by separate verifier processes before a SIGKILL of the host process, after a restart prune and later (EAT-R215)", () => {
  it.each(KILL_ROWS)("KILL-ROWS $id parked at git $park: exact bytes, HEAD, index paths, status and recovery path equal before the kill, after a restart prune and in a later process", async row => {
    const trial = await killTrial(row.park, "none");
    expect(trial.exit.signal).toBe("SIGKILL");
    const before = readOf(trial.before);
    expect(before.exists).toBe(true);
    expect(before.registered).toBe(true);
    expect(before.tracked).toBe(TRACKED_BYTES);
    expect(before.untracked).toBe(UNTRACKED_BYTES);
    expect(before.status).toEqual(row.status);
    expect(before.index).toEqual(row.index);
    if (row.head === "base") {
      expect(before.head).toBe(trial.created.baseSha);
      expect(before.committed).toEqual({ tracked: BASE_BYTES, untracked: null });
    } else {
      expect(before.head).not.toBe(trial.created.baseSha);
      expect(before.committed).toEqual({ tracked: TRACKED_BYTES, untracked: UNTRACKED_BYTES });
    }
    expect(before.branches).toEqual(row.branched ? [`${BRANCH} ${before.head}`] : []);
    expect(readOf(trial.after)).toEqual(before);
    expect(readOf(trial.later)).toEqual(before);
    expect(judgeRetention(trial.before, trial.after)).toBe("retained");
    expect(judgeRetention(trial.before, trial.later)).toBe("retained");
  });

  it("FULL-RUN with no park the cleanup completes, its branch's tree holds both files' exact bytes, and it logs exactly the KILL_ROWS steps in order", async () => {
    const repo = initRepo();
    scratch.push(repo);
    const run = startChild({ repo, park: null, mutant: "none" });
    const created = JSON.parse(await run.line("CREATED")) as { path: string; baseSha: string };
    scratch.push(trackScratch(created.path));
    const result = JSON.parse(await run.line("RESULT")) as Record<string, unknown>;
    const exit = await run.exit;
    expect(exit.code).toBe(0);
    expect(result).toEqual({ hasChanges: true, branch: BRANCH, path: created.path });
    expect(run.steps).toEqual(KILL_ROWS.map(row => row.park));
    expect(gitBytes(repo, "show", `${BRANCH}:README.md`)).toBe(TRACKED_BYTES);
    expect(gitBytes(repo, "show", `${BRANCH}:work.txt`)).toBe(UNTRACKED_BYTES);
    const branches = [`${BRANCH} ${git(repo, "rev-parse", BRANCH)}`];
    const direct = readOf(snapshot(repo, created.path, false));
    expect(direct.exists).toBe(false);
    expect(direct.registered).toBe(false);
    expect(direct.branches).toEqual(branches);
    const restarted = readOf(snapshot(repo, created.path, true));
    expect(restarted.exists).toBe(false);
    expect(restarted.registered).toBe(false);
    expect(restarted.branches).toEqual(branches);
  });

  it("KILL-SHAPE the kill and mutant tables are frozen, and the kill steps are the steps the full run observes", async () => {
    expect(KILL_ROWS.map(row => `${row.id}:${row.park}`)).toEqual(["K1:status", "K2:add", "K3:commit", "K4:branch", "K5:worktree remove"]);
    expect(MUTANT_ROWS.map(row => `${row.id}:${row.park}:${row.mutant}`)).toEqual(["M-REMOVE:commit:remove", "M-WIPE:commit:wipe"]);
    const repo = initRepo();
    scratch.push(repo);
    const run = startChild({ repo, park: null, mutant: "none" });
    const created = JSON.parse(await run.line("CREATED")) as { path: string; baseSha: string };
    scratch.push(trackScratch(created.path));
    await run.line("RESULT");
    await run.exit;
    expect(KILL_ROWS.map(row => row.park)).toEqual(run.steps);
  });

  it.each(MUTANT_ROWS)("MUTANT-ROWS $id: a destructive cleanup at the $park park is read as lost", async row => {
    const trial = await killTrial(row.park, row.mutant);
    expect(trial.exit.signal).toBe("SIGKILL");
    expect(trial.after.kind).toBe("read");
    expect(judgeRetention(trial.before, trial.after)).toBe("lost");
  });

  it("LATER-READ a removal the restart verifier defers past its own snapshot reads retained in that snapshot and lost in the later one", async () => {
    const trial = await killTrial("commit", "none", true);
    expect(trial.exit.signal).toBe("SIGKILL");
    expect(readOf(trial.after)).toEqual(readOf(trial.before));
    expect(judgeRetention(trial.before, trial.after)).toBe("retained");
    expect(readOf(trial.later).exists).toBe(false);
    expect(judgeRetention(trial.before, trial.later)).toBe("lost");
  });

  it("JUDGE-ROWS an unreadable snapshot is read as unknown, never retained, and each planted pair gets its verdict", () => {
    const repo = initRepo();
    scratch.push(repo);
    const gone = join(repo, "missing-worktree");
    removeScratch(repo);
    const unreadable = snapshot(repo, gone, false);
    expect(unreadable.kind).toBe("unreadable");
    const kept: Snapshot = {
      exists: true,
      registered: true,
      branches: [],
      tracked: TRACKED_BYTES,
      untracked: UNTRACKED_BYTES,
      head: "1".repeat(40),
      index: ["README.md", "work.txt"],
      status: ["M  README.md", "A  work.txt"],
      committed: { tracked: BASE_BYTES, untracked: null },
    };
    const read = (snapshot: Snapshot): Reading => ({ kind: "read", snapshot });
    expect(judgeRetention(read(kept), read({ ...kept }))).toBe("retained");
    expect(judgeRetention(unreadable, read(kept))).toBe("unknown");
    expect(judgeRetention(read(kept), unreadable)).toBe("unknown");
    expect(judgeRetention(read(kept), read({ ...kept, head: "2".repeat(40) }))).toBe("changed");
    expect(judgeRetention(read(kept), read({ ...kept, exists: false }))).toBe("lost");
    expect(judgeRetention(read(kept), read({ ...kept, registered: false }))).toBe("lost");
    expect(judgeRetention(read(kept), read({ ...kept, tracked: BASE_BYTES }))).toBe("lost");
    expect(judgeRetention(read(kept), read({ ...kept, untracked: null }))).toBe("lost");
  });

  it("ROSTER the registered tests of this file are exactly these, in order, each run and none marked to fail", ({ task }) => {
    const registered: Array<{ name: string; mode: string; fails: boolean; self: boolean }> = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.map(entry => entry.name)).toEqual([...ROSTER]);
    expect(registered.filter(entry => entry.mode !== "run" || entry.fails).map(entry => entry.name)).toEqual([]);
    expect(registered.findIndex(entry => entry.self)).toBe(registered.length - 1);
    expect([...new Set(registered.map(entry => titleId(entry.name)))]).toEqual(headerIds());
  });
});
