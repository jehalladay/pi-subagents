/**
 * wb-gbu (row 524 F7): a run that dies before its removeScratch / afterEach leaks its scratch directory under tmpdir()
 * and the session tree `sessionTaskDir` made for it under the product scratch root `<tmpdir>/pi-subagents-<uid>`.
 * These rows reproduce that with a REAL child process: the child loads the real helper (Node's type stripping, with a
 * resolve hook that maps the helper's ".js" specifiers to their ".ts" sources), allocates one scratch directory and its
 * session tree, reports both, and is then killed, stopped by a signal, or left to exit. The child's TMPDIR is a scratch
 * directory of this suite's own, so every root it touches is private to the row and removed with it.
 *
 * Owner addendum (bound at 07cc484, gate-blocking): every row here exercises the sweeps, so this file first pins ITSELF to
 * a private scratch root (isolateScratchRoot at module scope, before anything allocates): its own makeScratch
 * directories, startup janitor and exit sweep live inside a directory it created, never in the host's session root.
 * Against a helper without that primitive the file fails to load instead of sweeping the host. The last describe proves
 * the isolation on a real child: sentinels planted OUTSIDE the child's private root survive its janitor and its exit
 * sweep, while the same child run without isolation reaches them (the control), so the owned-key filter alone is shown
 * not to be enough.
 *
 * Spec lines pinned (bead brief):
 *  - "the helper registers each allocated dir in a per-process session manifest and sweeps its OWN manifest entries on
 *    process exit (best-effort exit/SIGTERM/SIGINT handlers; never another process's dirs)"
 *  - "a janitor arm: the makeScratch family sweeps > 24 h siblings it OWNS at startup, mtime-guarded, children-only,
 *    root never removed"
 *  - "Red-first: simulate a killed run (child process writing a scratch dir then SIGKILL) and show the leak without the
 *    cure, the self-sweep/janitor with it"
 *  - owner addendum: "every test and every mutant battery in this cut that exercises sweep/janitor behavior MUST run
 *    against a PRIVATE per-test TMPDIR root created and owned by the test (never the real session root), with a
 *    red-first row proving the isolation (a sentinel child planted OUTSIDE the private root must survive every mutant
 *    run, M4 included)"
 */
import { type ChildProcess, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, utimesSync, writeFileSync } from "node:fs";
import { basename, dirname, join, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { encodeCwd } from "../src/output-file.js";
import { installScratchLeakGuard, isolateScratchRoot, makeScratch, removeScratch, sessionScratchRoot } from "./helpers/scratch.js";

installScratchLeakGuard();
/** Before anything allocates: every sweep this file runs stays inside a private root it created (owner addendum). */
const isolation = isolateScratchRoot();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER_URL = pathToFileURL(join(ROOT, "test", "helpers", "scratch.ts")).href;
const OUTPUT_URL = pathToFileURL(join(ROOT, "src", "output-file.ts")).href;
const UID = process.getuid?.() ?? 0;
/** Older than the helper's 24 h stale window by an hour. */
const AGED_MS = 25 * 60 * 60 * 1000;
/** How long a child gets to report, and to exit once told to (a loaded host is slow, never this slow). */
const CHILD_WAIT_MS = 20_000;
/** No Linux process can hold this pid (pid_max is at most 2^22), so a manifest it names has a dead owner. */
const DEAD_PID = 2_147_483_646;

/** The child program. argv: helper URL, output-file URL, mode ("wait" keeps it alive, "usr2" keeps it alive until
 * SIGUSR2 makes it call process.exit(0), "exit" calls process.exit(0), "return" falls off the end), setup ("plain";
 * "isolate" calls isolateScratchRoot before anything else; "late-isolate" calls it after allocating and reports the
 * refusal). It prints one JSON line naming its pid, its scratch dir, that dir's session trees and what setup returned. */
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
const [helperUrl, outputUrl, mode, setup] = process.argv.slice(1);
const scratch = await import(helperUrl);
const output = await import(outputUrl);
const isolation = setup === "isolate" ? scratch.isolateScratchRoot() : undefined;
const dir = scratch.makeScratch("gbu-child-");
output.sessionTaskDir(dir, "s1");
let refusal;
if (setup === "late-isolate") {
  try {
    scratch.isolateScratchRoot();
  } catch (error) {
    refusal = error instanceof Error ? error.message : String(error);
  }
}
// Armed before the report, so a SIGUSR2 sent on reading it always finds the listener.
if (mode === "usr2") process.on("SIGUSR2", () => process.exit(0));
process.stdout.write(JSON.stringify({ pid: process.pid, dir, sessions: scratch.sessionScratchFor(dir), isolation, refusal }) + "\\n");
if (mode === "exit") process.exit(0);
if (mode === "wait" || mode === "usr2") setInterval(() => {}, 1000);
`;

type Mode = "wait" | "usr2" | "exit" | "return";
type Setup = "plain" | "isolate" | "late-isolate";

interface ChildIsolation {
  dir: string;
  hostTmp: string;
  hostRoot: string;
}

interface ChildReport {
  pid: number;
  dir: string;
  sessions: string[];
  isolation?: ChildIsolation;
  refusal?: string;
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

function startChild(tmp: string, mode: Mode, setup: Setup = "plain"): Promise<Running> {
  const child = spawn(process.execPath, ["--disable-warning=ExperimentalWarning", "--disable-warning=MODULE_TYPELESS_PACKAGE_JSON", "--input-type=module", "-e", CHILD, HELPER_URL, OUTPUT_URL, mode, setup], {
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

function isolationOf(report: ChildReport): ChildIsolation {
  if (report.isolation === undefined) throw new Error(`the child reported no isolation: ${JSON.stringify(report)}`);
  return report.isolation;
}

/** What a row plants in the host roots a child sees (its TMPDIR), all of it outside an isolated child's private root. */
interface HostSentinels {
  root: string;
  manifests: string;
  /** A dead run's stale scratch dir that its manifest lists: an unisolated startup janitor sweeps it. */
  listed: string;
  /** That dir's stale session tree. */
  listedTree: string;
  /** The dead run's manifest. */
  manifest: string;
  /** A host-root tree no manifest names: only an unfiltered exit sweep (mutant M4) removes it. */
  foreign: string;
}

function plantHostSentinels(tmp: string): HostSentinels {
  const root = join(tmp, `pi-subagents-${UID}`);
  const manifests = `${root}-scratch-manifests`;
  const listed = join(tmp, "gbu-sentinel-listed");
  const listedTree = join(root, encodeCwd(listed));
  const foreign = join(root, "gbu-sentinel-foreign");
  for (const dir of [listed, join(listedTree, "s1"), foreign, manifests]) mkdirSync(dir, { recursive: true });
  for (const dir of [listed, foreign]) writeFileSync(join(dir, "keep.txt"), "keep\n");
  const manifest = join(manifests, `${DEAD_PID}-${randomUUID()}.jsonl`);
  writeFileSync(manifest, `${JSON.stringify({ dir: listed, real: listed })}\n`);
  ageTree(listed, AGED_MS);
  ageTree(listedTree, AGED_MS);
  return { root, manifests, listed, listedTree, manifest, foreign };
}

/** A host-root tree keyed by `dir` in the `<key>-...` form: the exit sweep of the process that allocated `dir` removes it. */
function plantKeyedBy(root: string, dir: string): string {
  const tree = join(root, `${encodeCwd(dir)}-nested`);
  mkdirSync(tree);
  writeFileSync(join(tree, "keep.txt"), "keep\n");
  return tree;
}

describe("wb-gbu owner addendum: this file's own scratch", () => {
  it("lives under the private root this file created at module scope: TMPDIR names a fresh directory under the host's tmp, the session root is the private one, and every row's child TMPDIR is a makeScratch directory inside it", () => {
    expect(process.env.TMPDIR).toBe(isolation.dir);
    expect(dirname(isolation.dir)).toBe(isolation.hostTmp);
    expect(isolation.hostRoot).toBe(join(isolation.hostTmp, `pi-subagents-${UID}`));
    expect(sessionScratchRoot()).toBe(join(isolation.dir, `pi-subagents-${UID}`));
    expect(dirname(childTmp("gbu-pin-"))).toBe(isolation.dir);
    expect(isolateScratchRoot()).toBe(isolation);
  });
});

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

describe("wb-gbu owner addendum: an isolated run's sweeps never leave its private root (real child process)", () => {
  it.each([
    ["SIGTERM", "wait", { code: null, signal: "SIGTERM" }],
    ["SIGUSR2", "usr2", { code: 0, signal: null }],
  ] as const)("an isolated run stopped by %s: sentinels planted outside its private root (a dead run's stale listed scratch, a host tree keyed by the run's own scratch dir, a foreign host tree) survive its startup janitor and its exit sweep, and the private root goes on the way out", { timeout: 60_000 }, async (signal, mode, ending) => {
    const tmp = childTmp("gbu-iso-");
    const host = plantHostSentinels(tmp);
    const run = await startChild(tmp, mode, "isolate");
    const isolated = isolationOf(run.report);
    expect(isolated).toEqual({ dir: expect.any(String), hostTmp: tmp, hostRoot: host.root });
    expect(dirname(isolated.dir)).toBe(tmp);
    expect(dirname(run.report.dir)).toBe(isolated.dir);
    expect(run.report.sessions).toHaveLength(1);
    expect(run.report.sessions.every((session) => session.startsWith(`${join(isolated.dir, `pi-subagents-${UID}`)}${sep}`))).toBe(true);
    const ownKeyed = plantKeyedBy(host.root, run.report.dir);
    run.child.kill(signal);
    expect(await exited(run.child)).toEqual(ending);
    // First, so a mutant battery reads this verdict even where a later assertion fails: nothing outside the private root went.
    expect(present([host.listed, host.listedTree, host.manifest, host.foreign, ownKeyed]), "sentinels outside the private root").toEqual([true, true, true, true, true]);
    expect(present([run.report.dir, ...run.report.sessions, isolated.dir])).toEqual([false, false, false]);
    // The run's one host-side record, its manifest naming the private root, went with it; the dead run's stays.
    expect(readdirSync(host.manifests)).toEqual([basename(host.manifest)]);
  });

  it("control: the same run WITHOUT isolateScratchRoot reaches those sentinels (its startup janitor sweeps the dead run's listed scratch, its exit sweep the tree keyed by its own dir) and only the owned-key filter keeps the foreign tree, so the isolated rows are not vacuous", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-iso-control-");
    const host = plantHostSentinels(tmp);
    const run = await startChild(tmp, "wait");
    expect(run.report.isolation).toBeUndefined();
    expect(dirname(run.report.dir)).toBe(tmp);
    const ownKeyed = plantKeyedBy(host.root, run.report.dir);
    run.child.kill("SIGTERM");
    expect(await exited(run.child)).toEqual({ code: null, signal: "SIGTERM" });
    expect(present([host.listed, host.listedTree, host.manifest, ownKeyed])).toEqual([false, false, false, false]);
    expect(present([host.foreign])).toEqual([true]);
  });

  it("a SIGKILLed isolated run leaks only its private root, which one host manifest lists, so the next run's startup janitor sweeps it once older than 24 h", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-iso-killed-");
    const killed = await startChild(tmp, "wait", "isolate");
    const isolated = isolationOf(killed.report);
    killed.child.kill("SIGKILL");
    expect(await exited(killed.child)).toEqual({ code: null, signal: "SIGKILL" });
    const manifests = join(tmp, `pi-subagents-${UID}-scratch-manifests`);
    // Nothing of the run outside its private root but the one manifest line naming that root.
    expect(readdirSync(tmp).sort()).toEqual([basename(isolated.dir), basename(manifests)].sort());
    const listed = readdirSync(manifests).map((name) => readFileSync(join(manifests, name), "utf8").trim().split("\n").map((line) => (JSON.parse(line) as { dir: string }).dir));
    expect(listed).toEqual([[isolated.dir]]);
    ageTree(tmp, AGED_MS);
    const next = await startChild(tmp, "return");
    expect(await exited(next.child)).toEqual({ code: 0, signal: null });
    expect(present([isolated.dir, killed.report.dir])).toEqual([false, false]);
    expect(readdirSync(manifests)).toEqual([]);
  });

  it("isolateScratchRoot refuses once the process has allocated scratch: that allocation already reached the host's roots, so a late call would hide a host sweep instead of preventing it", { timeout: 60_000 }, async () => {
    const tmp = childTmp("gbu-iso-late-");
    const run = await startChild(tmp, "return", "late-isolate");
    expect(run.report.refusal).toMatch(/before this process allocates/);
    expect(await exited(run.child)).toEqual({ code: 0, signal: null });
    expect(dirname(run.report.dir)).toBe(tmp);
    expect(present([run.report.dir, ...run.report.sessions])).toEqual([false, false]);
  });
});
