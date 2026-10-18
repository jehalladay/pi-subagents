/**
 * scratch.ts — tracked, self-cleaning temp directories for the test suites (wb-g5o, wb-gbu).
 *
 * Why this exists: a suite that mkdtemp's a working directory under tmpdir() leaks
 * TWO things when it only removes that directory. The directory itself (when a
 * path is forgotten or an early failure skips the cleanup), and the per-session
 * scratch tree `sessionTaskDir` (src/output-file.ts) creates for it at
 * `<tmpdir>/pi-subagents-<uid>/<encodeCwd(dir)>/...`. Over many runs that drove the
 * shared /tmp tmpfs to forge's inode floor. The fix is the suites' own cleanup, and
 * this helper only ever removes paths a makeScratch call created.
 *
 * Usage in a suite:
 *   installScratchLeakGuard();                 // once, at module scope
 *   const cwd = makeScratch("my-suite-");      // instead of mkdtempSync(join(tmpdir(), ...))
 *   afterEach(() => removeScratch(cwd));       // dir AND its session tree
 * The guard runs after the suite and fails it, naming each path that survived.
 *
 * A run that dies before its cleanup (wb-gbu, row 524 F7): a SIGKILL, a crash or a killed worker skips the suite's
 * cleanup and the guard alike, so both paths outlived the run. Three backstops, none of which replaces either:
 *  - SESSION MANIFEST + EXIT SWEEP. makeScratch appends each directory it allocates to this process's manifest,
 *    `<tmpdir>/pi-subagents-<uid>-scratch-manifests/<pid>-<uuid>.jsonl` (a SIBLING of the session root, never a child
 *    of it). On the way out (process exit, or SIGTERM / SIGINT while this helper is that signal's only listener, the
 *    signal then re-raised so the process still dies of it) the process removes what it allocated, those directories'
 *    session trees and its manifest - never anything another process allocated. When another listener holds the
 *    signal, that listener owns what the signal does, and the exit hook sweeps if the process then exits. SIGKILL
 *    runs no code at all: that is what the manifest is for.
 *  - STARTUP JANITOR. A process's first makeScratch (or scratchStartup) reads the manifests of runs whose pid no
 *    longer runs, and removes an entry one lists only when it is a direct child of the scratch parent (tmpdir()) and
 *    neither root, nothing in its tree (the directory and its session trees) changed for 24 h (SCRATCH_STALE_MS, by
 *    mtime), no live run's manifest lists it, and no live process has its cwd inside it (read from /proc; where no
 *    process table can be read, nothing is swept). A manifest goes once nothing it lists remains; both roots always
 *    stay. sweepStaleScratch is the same pass with its roots and clock injected.
 *  - LEAK CENSUS. scratchLeakCensus lists the session root's children older than 24 h, and scratchLeakWarning makes a
 *    non-empty list a WARNING-class record a suite annotates and never fails on: a shared host also holds other
 *    runs' and other tools' trees, trackScratch paths (audited by the guard, never manifested) and leaks whose
 *    manifest was lost.
 * Bounded assumptions: a dead run's pid reused by a new process reads as alive, so that leak waits (never the
 * reverse); a process whose cwd this user cannot read (another user's) is not seen, and mkdtemp makes these
 * directories 0700, so only this user or root can hold a cwd inside one.
 */

import { randomUUID } from "node:crypto";
import { appendFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, readlinkSync, realpathSync, rmSync, type Stats } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, isAbsolute, join, resolve, sep } from "node:path";
import { isMainThread } from "node:worker_threads";
import { afterAll } from "vitest";
import { encodeCwd } from "../../src/output-file.js";

/** Every path this process created through `makeScratch` and has not yet removed. */
const created = new Set<string>();

/**
 * Every path `removeScratch` has removed. They stay audited until the suite's afterAll, so
 * a path RE-CREATED after removal (fire-and-forget work landing late) is still named.
 */
const removed = new Set<string>();

/** Scratch whose whole tree has not changed for this long is stale: the janitor may sweep it, the census reports it (ms). */
export const SCRATCH_STALE_MS = 24 * 60 * 60 * 1000;

const HOUR_MS = 60 * 60 * 1000;

/** The per-user session scratch root `sessionTaskDir` writes under. */
export function sessionScratchRoot(): string {
  return join(tmpdir(), `pi-subagents-${process.getuid?.() ?? 0}`);
}

/** Where the session manifests live: a SIBLING of the session root, so the census and the janitor never count or sweep it. */
export function scratchManifestDir(): string {
  return manifestDirFor(sessionScratchRoot());
}

function manifestDirFor(sessionRoot: string): string {
  return `${sessionRoot}-scratch-manifests`;
}

/**
 * Every per-session directory `sessionTaskDir` may have created for a working
 * directory OR any directory beneath it (a suite often runs the extension from a
 * `<scratch>/nested` cwd). The tree is keyed by `encodeCwd(<the cwd string the code
 * under test was handed>)`, so both the literal and the resolved spelling are matched,
 * as the exact name or as a `<name>-...` child. mkdtemp suffixes are random and
 * fixed-length, so a prefix match cannot reach another suite's scratch.
 */
export function sessionScratchFor(dir: string): string[] {
  const spellings = new Set<string>([dir]);
  try {
    spellings.add(realpathSync(dir));
  } catch {
    /* already gone — the literal spelling is all there is */
  }
  const encoded = [...spellings].map(encodeCwd);
  const root = sessionScratchRoot();
  let entries: string[] = [];
  try {
    entries = readdirSync(root);
  } catch {
    /* no session root yet — nothing was created */
  }
  return entries
    .filter(entry => encoded.some(name => entry === name || entry.startsWith(`${name}-`)))
    .map(entry => join(root, entry));
}

/**
 * A fresh scratch directory under tmpdir(), tracked so the leak guard can audit it and manifested so a run that dies
 * before its cleanup still has it swept. The process's first call runs the startup janitor (scratchStartup) first.
 */
export function makeScratch(prefix: string): string {
  scratchStartup();
  const dir = mkdtempSync(join(tmpdir(), prefix));
  created.add(dir);
  manifest(dir);
  return dir;
}

/**
 * Register a directory the code under test created itself (a worktree path, say) so the
 * leak guard audits it and `removeScratch` can remove it. Returns the path.
 */
export function trackScratch(dir: string): string {
  created.add(dir);
  return dir;
}

/** Remove a scratch directory together with the session tree created for it. Idempotent. */
export function removeScratch(...dirs: Array<string | undefined>): void {
  for (const dir of dirs) {
    if (!dir) continue;
    for (const session of sessionScratchFor(dir)) rmSync(session, { recursive: true, force: true });
    rmSync(dir, { recursive: true, force: true });
    created.delete(dir);
    removed.add(dir);
  }
}

/** Remove every scratch directory still tracked. For an `afterEach` that has no names to hand. */
export function removeAllScratch(): void {
  removeScratch(...created);
}

/**
 * The tracked paths (and their session trees) that still exist, removing each so a
 * failing run does not make the leak worse. Removed paths are audited too: a directory or
 * session tree re-created after `removeScratch` is a leak. Pure observation of paths we created.
 */
export function drainLeaks(): string[] {
  const leaked: string[] = [];
  for (const dir of new Set([...created, ...removed])) {
    for (const path of [dir, ...sessionScratchFor(dir)]) {
      if (existsSync(path)) leaked.push(path);
    }
    removeScratch(dir);
  }
  return leaked;
}

/** How long the guard waits for fire-and-forget work to land before it audits (ms). */
export const SCRATCH_SETTLE_MS = 150;

/**
 * Fail the calling suite if any directory made through `makeScratch` — or the
 * session tree created for it — survives the suite. Call once at module scope.
 * The guard settles for SCRATCH_SETTLE_MS first, so work that lands after the last
 * `removeScratch` (activation's fire-and-forget agent-dir writes) is audited, not missed.
 * `register` defaults to vitest's `afterAll`; a test injects its own to run the hook directly.
 */
export function installScratchLeakGuard(register: (hook: () => Promise<void>) => void = afterAll): void {
  register(async () => {
    await new Promise<void>(resolve => setTimeout(resolve, SCRATCH_SETTLE_MS));
    const leaked = drainLeaks();
    if (leaked.length > 0) {
      throw new Error(`scratch leaked under ${tmpdir()} (${leaked.length}):\n  ${leaked.join("\n  ")}`);
    }
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// wb-gbu: the session manifest and the exit sweep.

/** A directory this process's makeScratch allocated: both spellings its session trees may be keyed by, and their root. */
interface OwnedScratch {
  dir: string;
  real: string;
  sessionRoot: string;
}

/** Process-wide, shared by every copy of this module one process loads, so a single set of exit hooks sweeps them all. */
interface ScratchProcessState {
  owned: OwnedScratch[];
  /** This process's manifest file in each manifest directory; null where that directory cannot be written safely. */
  manifests: Map<string, string | null>;
  hooked: boolean;
  startup: ScratchJanitorReport | undefined;
}

const PROCESS_STATE: unique symbol = Symbol.for("pi-subagents.test-scratch.process-state");
type ScratchGlobal = typeof globalThis & { [PROCESS_STATE]?: ScratchProcessState };

function processState(): ScratchProcessState {
  const holder: ScratchGlobal = globalThis;
  const state: ScratchProcessState = holder[PROCESS_STATE] ?? { owned: [], manifests: new Map<string, string | null>(), hooked: false, startup: undefined };
  holder[PROCESS_STATE] = state;
  return state;
}

/** Record `dir` in this process's manifest and arm the exit sweep. Best effort: an unwritable manifest leaves the exit sweep. */
function manifest(dir: string): void {
  const state = processState();
  const sessionRoot = sessionScratchRoot();
  const entry: OwnedScratch = { dir, real: resolvedOr(dir), sessionRoot };
  state.owned.push(entry);
  armExitSweep(state);
  const file = manifestFileIn(state, manifestDirFor(sessionRoot));
  if (file === null) return;
  try {
    appendFileSync(file, `${JSON.stringify({ dir: entry.dir, real: entry.real })}\n`, { mode: 0o600 });
  } catch {
    /* the manifest is only the crash record: this process's own exit sweep still holds the entry */
  }
}

function manifestFileIn(state: ScratchProcessState, manifestDir: string): string | null {
  const known = state.manifests.get(manifestDir);
  if (known !== undefined) return known;
  let file: string | null = null;
  try {
    mkdirSync(manifestDir, { recursive: true, mode: 0o700 });
    if (ownedDirectory(manifestDir)) file = join(manifestDir, `${process.pid}-${randomUUID()}.jsonl`);
  } catch {
    /* no manifest directory to be had: the exit sweep alone covers this process */
  }
  state.manifests.set(manifestDir, file);
  return file;
}

const EXIT_SIGNALS = ["SIGTERM", "SIGINT"] as const;

function armExitSweep(state: ScratchProcessState): void {
  if (state.hooked) return;
  state.hooked = true;
  process.on("exit", () => sweepOwnScratch(state));
  // Signal events are delivered to the main thread only.
  if (!isMainThread) return;
  for (const signal of EXIT_SIGNALS) {
    const onSignal = (): void => {
      // Another listener owns what this signal does to the process; the exit hook sweeps if that listener exits.
      if (process.listenerCount(signal) !== 1) return;
      sweepOwnScratch(state);
      process.removeListener(signal, onSignal);
      // No listener is left, so the default action runs: the process still dies of this signal.
      process.kill(process.pid, signal);
    };
    process.on(signal, onSignal);
  }
}

/** Remove what this process's makeScratch allocated, the session trees keyed by it, and this process's manifests. */
function sweepOwnScratch(state: ScratchProcessState): void {
  const keysByRoot = new Map<string, Set<string>>();
  for (const entry of state.owned) {
    const keys = keysByRoot.get(entry.sessionRoot) ?? new Set<string>();
    keys.add(encodeCwd(entry.dir));
    keys.add(encodeCwd(entry.real));
    keysByRoot.set(entry.sessionRoot, keys);
  }
  for (const [sessionRoot, keys] of keysByRoot) {
    for (const name of listNames(sessionRoot)) if (keyedBy(name, keys)) removeQuietly(join(sessionRoot, name));
  }
  for (const entry of state.owned) removeQuietly(entry.dir);
  for (const file of state.manifests.values()) if (file !== null) removeQuietly(file);
}

// ---------------------------------------------------------------------------------------------------------------------
// wb-gbu: the startup janitor.

/** Why the janitor left a dead run's entry in place. */
export type ScratchKeepReason = "fresh" | "live-owner" | "live-cwd" | "cwd-unknown" | "unremovable";

/** One janitor pass. */
export interface ScratchJanitorReport {
  /** Every path it removed: dead runs' scratch directories and their session trees. */
  swept: string[];
  /** Dead runs' entries it left in place, each with why (keyed by the entry's directory). */
  kept: Array<{ path: string; reason: ScratchKeepReason }>;
  /** Dead runs' manifests it removed, nothing they list remaining. */
  manifests: string[];
}

export interface ScratchJanitorOptions {
  /** The directory makeScratch allocates in (default: the session root's parent, tmpdir()); only its direct children are swept. */
  scratchParent?: string;
  /** The session root (default: sessionScratchRoot()); its children go only as a swept entry's session trees, it never does. */
  sessionRoot?: string;
  /** The manifest directory (default: the session root's sibling, as scratchManifestDir()). */
  manifestDir?: string;
  /** The clock, ms since the epoch (default: Date.now()). */
  now?: number;
  /** The cwd of every live process this user can read, or undefined when no process table can be read (default: /proc). */
  liveCwds?: () => readonly string[] | undefined;
}

/** One line of a manifest. */
interface ScratchEntry {
  dir: string;
  real: string | undefined;
}

interface ManifestFile {
  path: string;
  pid: number;
}

const MANIFEST_NAME = /^([1-9]\d{0,9})-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jsonl$/;
const MAX_PID = 2 ** 31 - 1;

/**
 * The startup janitor, run once per process by its first makeScratch (a suite may call it to read the report): one
 * sweepStaleScratch pass over this host's roots. Returns that pass's report.
 */
export function scratchStartup(): ScratchJanitorReport {
  const state = processState();
  state.startup ??= sweepStaleScratch();
  return state.startup;
}

/**
 * Sweep what DEAD runs' manifests list, entry by entry, where every guard allows it (see the header): a direct child of
 * the scratch parent and neither root, unchanged for SCRATCH_STALE_MS, listed by no live run, holding no live cwd.
 * A manifest whose owner still runs (or is this process) is never read for sweeping.
 */
export function sweepStaleScratch(options: ScratchJanitorOptions = {}): ScratchJanitorReport {
  const sessionRoot = resolve(options.sessionRoot ?? sessionScratchRoot());
  const manifestDir = resolve(options.manifestDir ?? manifestDirFor(sessionRoot));
  const parent = resolve(options.scratchParent ?? dirname(sessionRoot));
  const since = (options.now ?? Date.now()) - SCRATCH_STALE_MS;
  const report: ScratchJanitorReport = { swept: [], kept: [], manifests: [] };
  if (!ownedDirectory(manifestDir)) return report;
  const files = manifestFiles(manifestDir);
  const dead = files.filter(file => file.pid !== process.pid && !processAlive(file.pid));
  if (dead.length === 0) return report;
  const liveOwned = lazily(() => liveEntries(files.filter(file => !dead.includes(file))));
  const cwds = lazily(() => (options.liveCwds ?? liveProcessCwds)());
  const rootNames = lazily(() => listNames(sessionRoot));
  for (const file of dead) {
    const entries = readManifest(file.path);
    if (entries === undefined) continue;
    let keep = false;
    for (const entry of entries) {
      if (!sweepable(entry.dir, parent, sessionRoot, manifestDir)) continue;
      const spellings = entry.real !== undefined && sameEntry(entry.real, entry.dir) ? [entry.dir, entry.real] : [entry.dir];
      const keys = new Set(spellings.map(encodeCwd));
      const trees = rootNames()
        .filter(name => keyedBy(name, keys))
        .map(name => join(sessionRoot, name))
        .filter(present);
      const paths = realDirectory(entry.dir) ? [...trees, entry.dir] : trees;
      if (paths.length === 0) continue;
      const reason = keepReason(spellings, paths, since, liveOwned, cwds);
      if (reason !== undefined) {
        report.kept.push({ path: entry.dir, reason });
        keep = true;
        continue;
      }
      const left = paths.filter(path => !removedNow(path));
      report.swept.push(...paths.filter(path => !left.includes(path)));
      if (left.length > 0) {
        report.kept.push({ path: entry.dir, reason: "unremovable" });
        keep = true;
      }
    }
    if (!keep && removedNow(file.path)) report.manifests.push(file.path);
  }
  return report;
}

/** Why an entry the janitor could sweep stays, or undefined when every guard passes. */
function keepReason(spellings: readonly string[], paths: readonly string[], since: number, liveOwned: () => ReadonlySet<string>, cwds: () => readonly string[] | undefined): ScratchKeepReason | undefined {
  const owners = liveOwned();
  if (spellings.some(spelling => owners.has(spelling))) return "live-owner";
  if (paths.some(path => changedSince(path, since))) return "fresh";
  const seen = cwds();
  if (seen === undefined) return "cwd-unknown";
  const held = paths.flatMap(path => [path, resolvedOr(path)]);
  if (seen.some(cwd => held.some(path => cwd === path || cwd.startsWith(`${path}${sep}`)))) return "live-cwd";
  return undefined;
}

/** A dead run's entry may go only as a direct child of the scratch parent that is neither root nor any user's pi-subagents tree. */
function sweepable(dir: string, parent: string, sessionRoot: string, manifestDir: string): boolean {
  return isAbsolute(dir) && resolve(dir) === dir && dir !== parent && dirname(dir) === parent && dir !== sessionRoot && dir !== manifestDir && !basename(dir).startsWith("pi-subagents-");
}

/** A manifest's resolved spelling is used only when it names the same mkdtemp leaf. */
function sameEntry(real: string, dir: string): boolean {
  return isAbsolute(real) && resolve(real) === real && basename(real) === basename(dir);
}

/** Every directory a live run's manifest lists, and this process's own. */
function liveEntries(files: readonly ManifestFile[]): Set<string> {
  const listed = new Set<string>();
  for (const file of files) {
    for (const entry of readManifest(file.path) ?? []) {
      listed.add(entry.dir);
      if (entry.real !== undefined) listed.add(entry.real);
    }
  }
  for (const entry of processState().owned) {
    listed.add(entry.dir);
    listed.add(entry.real);
  }
  return listed;
}

function manifestFiles(manifestDir: string): ManifestFile[] {
  const files: ManifestFile[] = [];
  for (const name of listNames(manifestDir).sort()) {
    const pid = Number(MANIFEST_NAME.exec(name)?.[1]);
    if (Number.isSafeInteger(pid) && pid > 0 && pid <= MAX_PID) files.push({ path: join(manifestDir, name), pid });
  }
  return files;
}

/** A manifest's entries, skipping any line that is not one (a torn last line, say); undefined when it cannot be read. */
function readManifest(path: string): ScratchEntry[] | undefined {
  let text: string;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return undefined;
  }
  const entries: ScratchEntry[] = [];
  for (const line of text.split("\n")) {
    const entry = parseEntry(line);
    if (entry !== undefined) entries.push(entry);
  }
  return entries;
}

function parseEntry(line: string): ScratchEntry | undefined {
  let value: unknown;
  try {
    value = JSON.parse(line);
  } catch {
    return undefined;
  }
  if (typeof value !== "object" || value === null || !("dir" in value) || typeof value.dir !== "string") return undefined;
  return { dir: value.dir, real: "real" in value && typeof value.real === "string" ? value.real : undefined };
}

/** Whether a process holds `pid`: only ESRCH says none does (EPERM is another user's live process). */
function processAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return errorCode(error) !== "ESRCH";
  }
}

/** The cwd of every process /proc lets this user read, or undefined when /proc does not show this process itself. */
function liveProcessCwds(): string[] | undefined {
  let pids: string[];
  try {
    pids = readdirSync("/proc").filter(name => /^\d+$/.test(name));
    readlinkSync("/proc/self/cwd");
  } catch {
    return undefined;
  }
  if (!pids.includes(String(process.pid))) return undefined;
  const cwds: string[] = [];
  for (const pid of pids) {
    try {
      cwds.push(readlinkSync(`/proc/${pid}/cwd`));
    } catch {
      /* exited meanwhile, or another user's process */
    }
  }
  return cwds;
}

/** Whether `path` or anything beneath it changed after `since` (by mtime). What cannot be read counts as changed, so it stays. */
function changedSince(path: string, since: number): boolean {
  const pending = [path];
  for (let next = pending.pop(); next !== undefined; next = pending.pop()) {
    let info: Stats;
    try {
      info = lstatSync(next);
    } catch (error) {
      if (errorCode(error) === "ENOENT") continue;
      return true;
    }
    if (info.mtimeMs > since) return true;
    if (!info.isDirectory()) continue;
    try {
      for (const name of readdirSync(next)) pending.push(join(next, name));
    } catch (error) {
      if (errorCode(error) !== "ENOENT") return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// wb-gbu: the leak census and its WARNING record.

/** One child of the session root, aged by its own mtime. */
export interface ScratchLeakChild {
  name: string;
  path: string;
  ageMs: number;
}

/** What the session root held at `at`: how many children, and which are older than 24 h, oldest first. */
export interface ScratchLeakCensus {
  root: string;
  at: number;
  children: number;
  stale: ScratchLeakChild[];
}

/** Count the session root's children and list those whose own mtime is older than SCRATCH_STALE_MS. A missing root is empty. */
export function scratchLeakCensus(options: { sessionRoot?: string; now?: number } = {}): ScratchLeakCensus {
  const root = options.sessionRoot ?? sessionScratchRoot();
  const at = options.now ?? Date.now();
  const names = listNames(root);
  const stale: ScratchLeakChild[] = [];
  for (const name of names) {
    const path = join(root, name);
    let mtimeMs: number;
    try {
      mtimeMs = lstatSync(path).mtimeMs;
    } catch {
      continue;
    }
    if (at - mtimeMs > SCRATCH_STALE_MS) stale.push({ name, path, ageMs: at - mtimeMs });
  }
  stale.sort((a, b) => b.ageMs - a.ageMs || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return { root, at, children: names.length, stale };
}

/** A WARNING-class report record: a suite annotates it (vitest annotate, type "warning") and never fails on it. */
export interface ScratchLeakWarning {
  level: "warning";
  message: string;
}

const WARNING_NAMES = 5;

/** The census's stale children as one WARNING record, or undefined when there are none. Never throws on a leak. */
export function scratchLeakWarning(census: ScratchLeakCensus): ScratchLeakWarning | undefined {
  if (census.stale.length === 0) return undefined;
  const named = census.stale.slice(0, WARNING_NAMES).map(child => `${printable(child.name)} (${Math.floor(child.ageMs / HOUR_MS)} h)`);
  const more = census.stale.length > WARNING_NAMES ? `, and ${census.stale.length - WARNING_NAMES} more` : "";
  return {
    level: "warning",
    message: `scratch leak census (wb-gbu): ${census.stale.length} of ${census.children} children of ${printable(census.root)} are older than 24 h at suite start: ${named.join(", ")}${more}. Left by a run killed before its cleanup, by another tool, or by a run whose manifest was lost; reported, never failed.`,
  };
}

/** `text` with every code point outside printable ASCII written as \u{...}, so a directory name cannot steer the report. */
function printable(text: string): string {
  return text.replace(/[^\x20-\x7e]/gu, char => `\\u{${(char.codePointAt(0) ?? 0).toString(16)}}`);
}

// ---------------------------------------------------------------------------------------------------------------------
// Shared filesystem reads.

function listNames(path: string): string[] {
  try {
    return readdirSync(path);
  } catch {
    return [];
  }
}

/** `name` is the session tree of a key (an encodeCwd spelling) or of a directory beneath it: the exact name, or `<key>-...`. */
function keyedBy(name: string, keys: ReadonlySet<string>): boolean {
  if (keys.has(name)) return true;
  for (let at = name.indexOf("-", 1); at > 0; at = name.indexOf("-", at + 1)) {
    if (keys.has(name.slice(0, at))) return true;
  }
  return false;
}

function present(path: string): boolean {
  try {
    lstatSync(path);
    return true;
  } catch {
    return false;
  }
}

/** A real directory, not a link to one: the only kind of entry directory the janitor removes. */
function realDirectory(path: string): boolean {
  try {
    const info = lstatSync(path);
    return info.isDirectory() && !info.isSymbolicLink();
  } catch {
    return false;
  }
}

/** A real directory (not a link) this user owns: the only kind of manifest directory written to or read. */
function ownedDirectory(path: string): boolean {
  try {
    const info = lstatSync(path);
    return info.isDirectory() && !info.isSymbolicLink() && (process.getuid === undefined || info.uid === process.getuid());
  } catch {
    return false;
  }
}

function resolvedOr(path: string): string {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
}

/** Remove `path`; whether it is gone afterwards. */
function removedNow(path: string): boolean {
  try {
    rmSync(path, { recursive: true, force: true });
    return true;
  } catch {
    return !present(path);
  }
}

function removeQuietly(path: string): void {
  try {
    rmSync(path, { recursive: true, force: true });
  } catch {
    /* best effort on the way out */
  }
}

function lazily<T>(make: () => T): () => T {
  let made: { value: T } | undefined;
  return () => {
    made ??= { value: make() };
    return made.value;
  };
}

function errorCode(error: unknown): string | undefined {
  return error instanceof Error && "code" in error && typeof error.code === "string" ? error.code : undefined;
}
