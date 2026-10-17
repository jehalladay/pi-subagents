/**
 * scratch.ts — tracked, self-cleaning temp directories for the test suites (wb-g5o).
 *
 * Why this exists: a suite that mkdtemp's a working directory under tmpdir() leaks
 * TWO things when it only removes that directory. The directory itself (when a
 * path is forgotten or an early failure skips the cleanup), and the per-session
 * scratch tree `sessionTaskDir` (src/output-file.ts) creates for it at
 * `<tmpdir>/pi-subagents-<uid>/<encodeCwd(dir)>/...`. Over many runs that drove the
 * shared /tmp tmpfs to forge's inode floor. The fix is the suites' own cleanup,
 * never periodic deletion — and this helper only ever removes paths it created.
 *
 * Usage in a suite:
 *   installScratchLeakGuard();                 // once, at module scope
 *   const cwd = makeScratch("my-suite-");      // instead of mkdtempSync(join(tmpdir(), ...))
 *   afterEach(() => removeScratch(cwd));       // dir AND its session tree
 * The guard runs after the suite and fails it, naming each path that survived.
 */

import { existsSync, mkdtempSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll } from "vitest";
import { encodeCwd } from "../../src/output-file.js";

/** Every path this process created through `makeScratch` and has not yet removed. */
const created = new Set<string>();

/**
 * Every path `removeScratch` has removed. They stay audited until the suite's afterAll, so
 * a path RE-CREATED after removal (fire-and-forget work landing late) is still named.
 */
const removed = new Set<string>();

/** The per-user session scratch root `sessionTaskDir` writes under. */
export function sessionScratchRoot(): string {
  return join(tmpdir(), `pi-subagents-${process.getuid?.() ?? 0}`);
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

/** A fresh scratch directory under tmpdir(), tracked so the leak guard can audit it. */
export function makeScratch(prefix: string): string {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  created.add(dir);
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
