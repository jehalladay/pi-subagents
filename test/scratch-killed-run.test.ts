/**
 * wb-gbu (row 524 F7): a run that dies before its removeScratch / afterEach leaks its scratch directory under tmpdir()
 * and the session tree `sessionTaskDir` made for it under the product scratch root `<tmpdir>/pi-subagents-<uid>`.
 * These rows reproduce that with a REAL child process: the child loads the real helper (Node's type stripping, with a
 * resolve hook that maps the helper's ".js" specifiers to their ".ts" sources), allocates one scratch directory and its
 * session tree, reports both, and is then killed, stopped by a signal, or left to exit. The child's TMPDIR is a scratch
 * directory of this suite's own, so every root it touches is private to the row and removed with it.
 *
 * Spec lines pinned (bead brief):
 *  - "the helper registers each allocated dir in a per-process session manifest and sweeps its OWN manifest entries on
 *    process exit (best-effort exit/SIGTERM/SIGINT handlers; never another process's dirs)"
 *  - "a janitor arm: the makeScratch family sweeps > 24 h siblings it OWNS at startup, mtime-guarded, children-only,
 *    root never removed"
 *  - "Red-first: simulate a killed run (child process writing a scratch dir then SIGKILL) and show the leak without the
 *    cure, the self-sweep/janitor with it"
 * Only the helper's existing API is used here, so the same rows run against the uncured helper and go red on behaviour.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, lstatSync, readdirSync, utimesSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER_URL = pathToFileURL(join(ROOT, "test", "helpers", "scratch.ts")).href;
const OUTPUT_URL = pathToFileURL(join(ROOT, "src", "output-file.ts")).href;
const UID = process.getuid?.() ?? 0;
/** Older than the helper's 24 h stale window by an hour. */
const AGED_MS = 25 * 60 * 60 * 1000;
/** How long a child gets to report, and to exit once told to (a loaded host is slow, never this slow). */
const CHILD_WAIT_MS = 20_000;

/** The child program. argv: helper URL, output-file URL, mode ("wait" keeps it alive, "exit" calls process.exit(0),
 * "return" falls off the end). It prints one JSON line naming its pid, its scratch dir and that dir's session trees. */
const CHILD = `
import { registerHooks } from "node:module";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (/^\\.\\.?\\//.test(specifier) && specifier.endsWith(".js") && context.parentURL?.endsWith(".ts")) {
      const source = new URL(specifier.slice(0, -3) + ".ts", context.parentURL);
      if (existsSync(fileURLToPath(source))) return nextResolve(source.href, context);
    }
    return nextResolve(specifier, context);
  },
});
const [helperUrl, outputUrl, mode] = process.argv.slice(1);
const scratch = await import(helperUrl);
const output = await import(outputUrl);
const dir = scratch.makeScratch("gbu-child-");
output.sessionTaskDir(dir, "s1");
process.stdout.write(JSON.stringify({ pid: process.pid, dir, sessions: scratch.sessionScratchFor(dir) }) + "\\n");
if (mode === "wait") setInterval(() => {}, 1000);
else if (mode === "exit") process.exit(0);
`;

type Mode = "wait" | "exit" | "return";

interface ChildReport {
  pid: number;
  dir: string;
  sessions: string[];
}

interface Running {
  child: ChildProcess;
  report: ChildReport;
}

interface Exit {
  code: number | null;
  signal: NodeJS.Signals | null;
}

const spawned = new Set<ChildProcess>();
const scratchDirs: string[] = [];

afterEach(async () => {
  for (const child of spawned) {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
      await exited(child);
    }
  }
  spawned.clear();
  removeScratch(...scratchDirs.splice(0));
});

/** A private TMPDIR for one row's children, removed with the row. */
function childTmp(prefix: string): string {
  const dir = makeScratch(prefix);
  scratchDirs.push(dir);
  return dir;
}

/** The environment a child runs with: this process's, minus vitest's worker variables, with TMPDIR pointed at `tmp`. */
function childEnv(tmp: string): NodeJS.ProcessEnv {
  return { ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("VITEST"))), TMPDIR: tmp };
}

function startChild(tmp: string, mode: Mode): Promise<Running> {
  const child = spawn(process.execPath, ["--disable-warning=ExperimentalWarning", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "--input-type=module", "-e", CHILD, HELPER_URL, OUTPUT_URL, mode], {
    cwd: ROOT,
    env: childEnv(tmp),
    stdio: ["ignore", "pipe", "pipe"],
  });
  spawned.add(child);
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => reject(new Error(`child reported nothing within ${CHILD_WAIT_MS} ms; stderr: ${stderr}`)), CHILD_WAIT_MS);
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });
    child.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
      const end = stdout.indexOf("\n");
      if (end < 0) return;
      clearTimeout(timer);
      resolve({ child, report: JSON.parse(stdout.slice(0, end)) as ChildReport });
    });
    child.once("exit", () => {
      if (!stdout.includes("\n")) {
        clearTimeout(timer);
        reject(new Error(`child exited before reporting; stderr: ${stderr}`));
      }
    });
  });
}

/** Resolves with how the child ended; rejects if it is still running after CHILD_WAIT_MS. */
function exited(child: ChildProcess): Promise<Exit> {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve({ code: child.exitCode, signal: child.signalCode });
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`child ${child.pid} still running ${CHILD_WAIT_MS} ms after it was told to stop`)), CHILD_WAIT_MS);
    child.once("exit", (code, signal) => {
      clearTimeout(timer);
      resolve({ code, signal });
    });
  });
}

/** Set the mtime (and atime) of `path` and everything under it `ms` into the past. */
function ageTree(path: string, ms: number): void {
  const seconds = (Date.now() - ms) / 1000;
  const info = lstatSync(path);
  if (info.isSymbolicLink()) return;
  if (info.isDirectory()) for (const name of readdirSync(path)) ageTree(join(path, name), ms);
  utimesSync(path, seconds, seconds);
}

function present(paths: readonly string[]): boolean[] {
  return paths.map((path) => existsSync(path));
}

describe("wb-gbu: a run killed before its own cleanup (real child process)", () => {
  it("SIGKILL leaks the run's scratch dir and session tree; the next run's startup janitor sweeps them once older than 24 h, and both roots stay", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-killed-");
    const killed = await startChild(tmp, "wait");
    expect(killed.report.sessions).toHaveLength(1);
    killed.child.kill("SIGKILL");
    expect(await exited(killed.child)).toEqual({ code: null, signal: "SIGKILL" });
    // The leak itself: no handler runs on SIGKILL, so both paths outlive the run.
    expect(present([killed.report.dir, ...killed.report.sessions])).toEqual([true, true]);

    ageTree(tmp, AGED_MS);
    const next = await startChild(tmp, "return");
    expect(await exited(next.child)).toEqual({ code: 0, signal: null });

    expect(present([killed.report.dir, ...killed.report.sessions])).toEqual([false, false]);
    const sessionRoot = join(tmp, `pi-subagents-${UID}`);
    expect(existsSync(sessionRoot)).toBe(true);
    expect(readdirSync(sessionRoot)).toEqual([]);
    expect(readdirSync(tmp).filter((name) => name.startsWith("gbu-child-"))).toEqual([]);
  });

  it("a SIGKILLed run's scratch younger than 24 h survives the next run's startup (the janitor is mtime-guarded)", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-young-");
    const killed = await startChild(tmp, "wait");
    killed.child.kill("SIGKILL");
    await exited(killed.child);
    const next = await startChild(tmp, "return");
    expect(await exited(next.child)).toEqual({ code: 0, signal: null });
    expect(present([killed.report.dir, ...killed.report.sessions])).toEqual([true, true]);
  });

  it.each(["SIGTERM", "SIGINT"] as const)("a run stopped by %s sweeps its own scratch dir and session tree on the way out and still dies of that signal", { timeout: 60_000 }, async (signal) => {
    const tmp = childTmp("gbu-signal-");
    const run = await startChild(tmp, "wait");
    run.child.kill(signal);
    expect(await exited(run.child)).toEqual({ code: null, signal });
    expect(present([run.report.dir, ...run.report.sessions])).toEqual([false, false]);
  });

  it.each(["exit", "return"] as const)("a run that ends (%s) without removeScratch sweeps its own scratch on process exit", { timeout: 60_000 }, async (mode) => {
    const tmp = childTmp("gbu-exit-");
    const run = await startChild(tmp, mode);
    expect(await exited(run.child)).toEqual({ code: 0, signal: null });
    expect(present([run.report.dir, ...run.report.sessions])).toEqual([false, false]);
  });

  it("the exit sweep removes only its own run's scratch, never another live run's", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-two-");
    const keeper = await startChild(tmp, "wait");
    const leaver = await startChild(tmp, "wait");
    leaver.child.kill("SIGTERM");
    expect(await exited(leaver.child)).toEqual({ code: null, signal: "SIGTERM" });
    expect(present([leaver.report.dir, ...leaver.report.sessions])).toEqual([false, false]);
    expect(present([keeper.report.dir, ...keeper.report.sessions])).toEqual([true, true]);
    keeper.child.kill("SIGTERM");
    expect(await exited(keeper.child)).toEqual({ code: null, signal: "SIGTERM" });
    expect(present([keeper.report.dir, ...keeper.report.sessions])).toEqual([false, false]);
  });
});
