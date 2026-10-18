/**
 * wb-gbu (row 524 F7): the makeScratch family's startup janitor and the scratch-root leak census, row by row.
 *
 * Spec lines pinned (bead brief):
 *  - "a leak-census row pins 'no scratch child under the root is older than 24 h at suite start' as a WARNING-class
 *    report row (never a hard red on shared hosts)"
 *  - "a janitor arm: the makeScratch family sweeps > 24 h siblings it OWNS at startup, mtime-guarded, children-only,
 *    root never removed, and never while another live process has a cwd inside"
 *  - "mutants per branch (skip-mtime-guard, sweep-non-owned, remove-root, hard-red-on-warning)"
 *  - owner addendum: "every test and every mutant battery in this cut that exercises sweep/janitor behavior MUST run
 *    against a PRIVATE per-test TMPDIR root created and owned by the test (never the real session root)"
 * The file pins itself to a private scratch root at module scope (isolateScratchRoot, before anything allocates), so its
 * own startup janitor and exit sweep never reach the host's roots; against a helper without that primitive it fails to
 * load instead. The janitor rows then run sweepStaleScratch over a private layout (scratch parent, session root,
 * manifest directory) built inside one makeScratch directory per row. A dead owner is a pid no process can hold (above
 * Linux pid_max); a live one is a real sleeping child. The census row at the top reads the HOST's session root, which
 * nothing in this file sweeps, and only ever reports.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { existsSync, lstatSync, mkdirSync, readdirSync, utimesSync, writeFileSync } from "node:fs";
import { dirname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { encodeCwd } from "../src/output-file.js";
import {
  installScratchLeakGuard,
  isolateScratchRoot,
  makeScratch,
  removeScratch,
  SCRATCH_STALE_MS,
  type ScratchJanitorReport,
  type ScratchLeakCensus,
  scratchLeakCensus,
  scratchLeakWarning,
  scratchManifestDir,
  sessionScratchRoot,
  sweepStaleScratch,
} from "./helpers/scratch.js";

installScratchLeakGuard();
/** Before anything allocates: every sweep this file runs stays inside a private root it created (owner addendum). */
const isolation = isolateScratchRoot();

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UID = process.getuid?.() ?? 0;
const HOUR_MS = 60 * 60 * 1000;
/** Past the stale window by an hour. */
const AGED_MS = 25 * HOUR_MS;
/** No Linux process can hold this pid (pid_max is at most 2^22), so its manifest's owner is dead. */
const DEAD_PID = 2_147_483_646;

describe("wb-gbu leak census at suite start (WARNING-class report row)", () => {
  let census: ScratchLeakCensus;
  beforeAll(() => {
    census = scratchLeakCensus({ sessionRoot: isolation.hostRoot });
  });

  it("no scratch child under the host's session root is older than 24 h at suite start: any that is, is reported as a warning and never fails the row; the census only reads that root", async ({ annotate }) => {
    const warning = scratchLeakWarning(census);
    if (warning !== undefined) await annotate(warning.message, warning.level);
    // The row's whole contract: a warning exactly when the census holds a stale child, and the row passes either way.
    expect(warning === undefined).toBe(census.stale.length === 0);
    expect(census.root).toBe(isolation.hostRoot);
    expect(census.stale.every((child) => child.ageMs > SCRATCH_STALE_MS)).toBe(true);
  });

  it("this file runs against the private root it created at module scope (owner addendum): TMPDIR, the session root, the manifest directory and every row's layout live inside it, never in the host's roots", () => {
    expect(process.env.TMPDIR).toBe(isolation.dir);
    expect(dirname(isolation.dir)).toBe(isolation.hostTmp);
    expect(isolation.hostRoot).toBe(join(isolation.hostTmp, `pi-subagents-${UID}`));
    expect(sessionScratchRoot()).toBe(join(isolation.dir, `pi-subagents-${UID}`));
    expect(scratchManifestDir()).toBe(join(isolation.dir, `pi-subagents-${UID}-scratch-manifests`));
    expect(layout().parent.startsWith(`${isolation.dir}${sep}`)).toBe(true);
    expect(isolateScratchRoot()).toBe(isolation);
  });
});

interface Layout {
  parent: string;
  root: string;
  manifests: string;
}

interface Planted {
  dir: string;
  session: string;
}

const children: ChildProcess[] = [];
const rows: string[] = [];

afterEach(async () => {
  for (const child of children.splice(0)) {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
      await exited(child);
    }
  }
  removeScratch(...rows.splice(0));
});

/** A private scratch parent, session root and manifest directory, shaped like tmpdir()'s, inside one row's scratch. */
function layout(): Layout {
  const row = makeScratch("gbu-janitor-");
  rows.push(row);
  const parent = join(row, "tmp");
  const root = join(parent, `pi-subagents-${UID}`);
  const manifests = `${root}-scratch-manifests`;
  mkdirSync(root, { recursive: true });
  mkdirSync(manifests, { recursive: true });
  return { parent, root, manifests };
}

/** A scratch dir under the layout's parent and the session tree sessionTaskDir would make for it, each holding a file. */
function plant(at: Layout, name: string): Planted {
  const dir = join(at.parent, name);
  mkdirSync(dir);
  writeFileSync(join(dir, "work.txt"), "work\n");
  const session = join(at.root, encodeCwd(dir));
  mkdirSync(join(session, "s1", "tasks"), { recursive: true });
  writeFileSync(join(session, "s1", "tasks", "agent.output"), "{}\n");
  return { dir, session };
}

/** A session manifest owned by `pid`, in the helper's on-disk form: one JSON line per allocated dir. */
function manifest(at: Layout, pid: number, dirs: readonly string[]): string {
  const path = join(at.manifests, `${pid}-${randomUUID()}.jsonl`);
  writeFileSync(path, dirs.map((dir) => `${JSON.stringify({ dir, real: dir })}\n`).join(""));
  return path;
}

/** Set the mtime (and atime) of each path and everything under it `ms` into the past. */
function age(ms: number, ...paths: string[]): void {
  const seconds = (Date.now() - ms) / 1000;
  const walk = (path: string): void => {
    const info = lstatSync(path);
    if (info.isSymbolicLink()) return;
    if (info.isDirectory()) for (const name of readdirSync(path)) walk(join(path, name));
    utimesSync(path, seconds, seconds);
  };
  for (const path of paths) walk(path);
}

function janitor(at: Layout, extra: { liveCwds?: () => string[] | undefined } = {}): ScratchJanitorReport {
  return sweepStaleScratch({ scratchParent: at.parent, sessionRoot: at.root, manifestDir: at.manifests, now: Date.now(), ...extra });
}

function present(paths: readonly string[]): boolean[] {
  return paths.map((path) => existsSync(path));
}

function sleeper(cwd: string): Promise<ChildProcess> {
  const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], { cwd, stdio: "ignore" });
  children.push(child);
  return new Promise((resolve, reject) => {
    child.once("spawn", () => resolve(child));
    child.once("error", reject);
  });
}

function exited(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => child.once("exit", () => resolve()));
}

describe("wb-gbu janitor: sweeps what a dead run owned once it is stale", () => {
  it("sweeps a dead run's scratch dir and its session tree once both are older than 24 h, then the run's manifest; both roots and the manifest directory stay", () => {
    const at = layout();
    const leak = plant(at, "gbu-dead-Aa1Bb2");
    const owner = manifest(at, DEAD_PID, [leak.dir]);
    age(AGED_MS, leak.dir, leak.session, owner);
    const report = janitor(at);
    expect([...report.swept].sort()).toEqual([leak.dir, leak.session].sort());
    expect(report.kept).toEqual([]);
    expect(report.manifests).toEqual([owner]);
    expect(present([leak.dir, leak.session, owner])).toEqual([false, false, false]);
    expect(present([at.parent, at.root, at.manifests])).toEqual([true, true, true]);
  });

  it("sweeps the session trees of directories nested under the dead run's scratch dir too", () => {
    const at = layout();
    const leak = plant(at, "gbu-nest-Cc3Dd4");
    const nested = join(at.root, encodeCwd(join(leak.dir, "nested")));
    mkdirSync(join(nested, "s2"), { recursive: true });
    const owner = manifest(at, DEAD_PID, [leak.dir]);
    age(AGED_MS, leak.dir, leak.session, nested, owner);
    const report = janitor(at);
    expect([...report.swept].sort()).toEqual([leak.dir, leak.session, nested].sort());
    expect(present([leak.dir, leak.session, nested, owner])).toEqual([false, false, false, false]);
  });
});

describe("wb-gbu janitor guards (one row per mutant branch)", () => {
  it("mtime guard (kills skip-mtime-guard): keeps a dead run's entry while it, or anything inside it, changed within 24 h, and keeps its manifest", () => {
    const at = layout();
    const young = plant(at, "gbu-young-Ee5Ff6");
    const inner = plant(at, "gbu-inner-Gg7Hh8");
    const owner = manifest(at, DEAD_PID, [young.dir, inner.dir]);
    age(AGED_MS, inner.dir, inner.session, owner);
    writeFileSync(join(inner.dir, "work.txt"), "touched within the window\n");
    const report = janitor(at);
    expect(report.swept).toEqual([]);
    expect(report.kept).toEqual([
      { path: young.dir, reason: "fresh" },
      { path: inner.dir, reason: "fresh" },
    ]);
    expect(report.manifests).toEqual([]);
    expect(present([young.dir, young.session, inner.dir, inner.session, owner])).toEqual([true, true, true, true, true]);
  });

  it("ownership (kills sweep-non-owned): never sweeps a stale child no dead run's manifest lists, nor a live run's stale entries, nor this process's own", async () => {
    const at = layout();
    const foreign = plant(at, "gbu-foreign-Ii9Jj0");
    const live = plant(at, "gbu-live-Kk1Ll2");
    const mine = plant(at, "gbu-mine-Mm3Nn4");
    const running = await sleeper(ROOT);
    const liveOwner = manifest(at, running.pid ?? 0, [live.dir]);
    const ownManifest = manifest(at, process.pid, [mine.dir]);
    age(AGED_MS, foreign.dir, foreign.session, live.dir, live.session, mine.dir, mine.session, liveOwner, ownManifest);
    const report = janitor(at);
    expect(report).toEqual({ swept: [], kept: [], manifests: [] });
    expect(present([foreign.dir, foreign.session, live.dir, live.session, mine.dir, mine.session, liveOwner, ownManifest])).toEqual([true, true, true, true, true, true, true, true]);
  });

  it("children only, root never removed (kills remove-root): a manifest naming either root, the manifest directory, the parent, or a path outside or below the parent removes nothing", () => {
    const at = layout();
    const outside = join(dirname(at.parent), "outside-Oo5Pp6");
    const below = join(at.parent, "nest", "gbu-below-Qq7Rr8");
    mkdirSync(outside);
    mkdirSync(below, { recursive: true });
    const owner = manifest(at, DEAD_PID, [at.root, at.manifests, at.parent, outside, below, join(at.parent, ".."), join(at.parent, "gbu-x", "..")]);
    age(AGED_MS, at.parent, outside, owner);
    const report = janitor(at);
    expect(report.swept).toEqual([]);
    expect(present([at.parent, at.root, at.manifests, outside, below])).toEqual([true, true, true, true, true]);
  });

  it("root never removed (kills remove-root): sweeping the last owned child leaves the session root in place, empty", () => {
    const at = layout();
    const leak = plant(at, "gbu-last-Ss9Tt0");
    const owner = manifest(at, DEAD_PID, [leak.dir]);
    age(AGED_MS, at.parent, owner);
    janitor(at);
    expect(existsSync(at.root)).toBe(true);
    expect(readdirSync(at.root)).toEqual([]);
    expect(existsSync(at.parent)).toBe(true);
  });

  it("live cwd (kills skip-cwd-guard): never sweeps an entry while a live process has its cwd inside it, and sweeps it once that process is gone", async () => {
    const at = layout();
    const leak = plant(at, "gbu-cwd-Uu1Vv2");
    const inside = join(leak.dir, "sub");
    mkdirSync(inside);
    const owner = manifest(at, DEAD_PID, [leak.dir]);
    age(AGED_MS, leak.dir, leak.session, owner);
    const resident = await sleeper(inside);
    const held = janitor(at);
    expect(held.swept).toEqual([]);
    expect(held.kept).toEqual([{ path: leak.dir, reason: "live-cwd" }]);
    resident.kill("SIGKILL");
    await exited(resident);
    const freed = janitor(at);
    expect([...freed.swept].sort()).toEqual([leak.dir, leak.session].sort());
    expect(present([leak.dir, leak.session, owner])).toEqual([false, false, false]);
  });

  it("live owner (kills sweep-non-owned): an entry a live run's manifest also lists is never swept, whatever the dead manifest says", async () => {
    const at = layout();
    const shared = plant(at, "gbu-shared-Ab1Cd2");
    const running = await sleeper(ROOT);
    const deadOwner = manifest(at, DEAD_PID, [shared.dir]);
    const liveOwner = manifest(at, running.pid ?? 0, [shared.dir]);
    age(AGED_MS, shared.dir, shared.session, deadOwner, liveOwner);
    const report = janitor(at);
    expect(report).toEqual({ swept: [], kept: [{ path: shared.dir, reason: "live-owner" }], manifests: [] });
    expect(present([shared.dir, shared.session, deadOwner, liveOwner])).toEqual([true, true, true, true]);
  });

  it("live cwd unknown (fail-safe): when no process table can be read, nothing is swept", () => {
    const at = layout();
    const leak = plant(at, "gbu-blind-Ww3Xx4");
    const owner = manifest(at, DEAD_PID, [leak.dir]);
    age(AGED_MS, leak.dir, leak.session, owner);
    const report = janitor(at, { liveCwds: () => undefined });
    expect(report.swept).toEqual([]);
    expect(report.kept).toEqual([{ path: leak.dir, reason: "cwd-unknown" }]);
    expect(present([leak.dir, leak.session, owner])).toEqual([true, true, true]);
  });

  it("a malformed manifest line is skipped, the well-formed lines around it still count", () => {
    const at = layout();
    const leak = plant(at, "gbu-torn-Yy5Zz6");
    const owner = join(at.manifests, `${DEAD_PID}-${randomUUID()}.jsonl`);
    writeFileSync(owner, `not json\n${JSON.stringify({ dir: leak.dir, real: leak.dir })}\n{"dir": 7}\n{"dir":"${leak.dir}`);
    age(AGED_MS, leak.dir, leak.session, owner);
    const report = janitor(at);
    expect([...report.swept].sort()).toEqual([leak.dir, leak.session].sort());
  });
});

describe("wb-gbu leak census and its WARNING record", () => {
  it("counts the root's children and lists, oldest first, those whose own mtime is older than 24 h; a missing root reads as empty", () => {
    const at = layout();
    const now = Date.now();
    const older = join(at.root, "tmp-older-A1");
    const old = join(at.root, "tmp-old-B2");
    const young = join(at.root, "tmp-young-C3");
    for (const path of [older, old, young]) mkdirSync(path);
    age(AGED_MS + HOUR_MS, older);
    age(AGED_MS, old);
    const census = scratchLeakCensus({ sessionRoot: at.root, now });
    expect(census.root).toBe(at.root);
    expect(census.children).toBe(3);
    expect(census.stale.map((child) => child.name)).toEqual(["tmp-older-A1", "tmp-old-B2"]);
    expect(census.stale.every((child) => child.ageMs > SCRATCH_STALE_MS)).toBe(true);
    expect(scratchLeakCensus({ sessionRoot: join(at.parent, "no-such-root"), now })).toEqual({ root: join(at.parent, "no-such-root"), at: now, children: 0, stale: [] });
  });

  it("the WARNING record (kills hard-red-on-warning): stale children yield a warning-level record naming the count and the root, and never a throw; a clean census yields none", () => {
    const at = layout();
    const stale = join(at.root, "tmp-stale-D4");
    mkdirSync(stale);
    mkdirSync(join(at.root, "tmp-fresh-E5"));
    age(AGED_MS, stale);
    const census = scratchLeakCensus({ sessionRoot: at.root, now: Date.now() });
    let warning: ReturnType<typeof scratchLeakWarning>;
    expect(() => {
      warning = scratchLeakWarning(census);
    }).not.toThrow();
    expect(warning).toEqual({ level: "warning", message: expect.stringContaining(`1 of 2 children of ${at.root}`) });
    expect(scratchLeakWarning({ ...census, stale: [] })).toBeUndefined();
  });

  it("the WARNING record escapes every name and root outside printable ASCII, so a hostile directory name cannot steer the report", () => {
    const at = layout();
    const hostile = `tmp-${String.fromCodePoint(0x1b)}[31m-${String.fromCodePoint(0x202e)}-${String.fromCodePoint(0x1f600)}`;
    mkdirSync(join(at.root, hostile));
    age(AGED_MS, join(at.root, hostile));
    const warning = scratchLeakWarning(scratchLeakCensus({ sessionRoot: at.root, now: Date.now() }));
    expect(warning?.message).toContain("tmp-\\u{1b}[31m-\\u{202e}-\\u{1f600}");
    expect([...(warning?.message ?? "")].filter((char) => (char.codePointAt(0) ?? 0) < 0x20 || (char.codePointAt(0) ?? 0) > 0x7e)).toEqual([]);
  });

  it("the manifest directory is a sibling of the session root, never a child the census or the janitor could count or sweep", () => {
    expect(scratchManifestDir()).toBe(`${sessionScratchRoot()}-scratch-manifests`);
    expect(dirname(scratchManifestDir())).toBe(dirname(sessionScratchRoot()));
  });
});
