/**
 * scratch.mjs - tracked, self-cleaning temp directories for the plain-node qa runners (wb-e37 qa leg, E37QALEGTOKEN).
 *
 * The runner-side twin of test/helpers/scratch.ts (wb-g5o). That helper registers its leak guard through vitest's
 * afterAll and reads encodeCwd from src/, so a .mjs runner cannot import it; this module imports node builtins only.
 * It keeps the same semantics: makeScratch / trackScratch / removeScratch only ever touch paths this process created,
 * removal takes the directory AND every session tree `sessionTaskDir` (src/output-file.ts) keys by it or by a cwd
 * beneath it, and removed paths stay audited, so a directory re-created after removal is still a leak.
 *
 * Program rule 11 (owner, 2026-10-15T16:08Z), widened to qa runners by the wb-e37 qa leg: every qa runner scratch
 * allocation composes this module (or test/helpers/scratch.ts from a vitest suite); test/workbench-scratch-census.test.ts
 * fails on a raw mkdtemp/tmpdir allocation under test/ or qa/ that is not on its reasoned allowlist.
 *
 * Usage in a runner:
 *   installScratchLeakGuard();                 // once, at module scope
 *   const root = makeScratch('my-runner-');    // instead of mkdtempSync(join(tmpdir(), ...))
 *   try { ... } finally { removeScratch(root); }
 * The guard audits when the runner exits and, naming each path that survived, turns a clean exit into exit 1.
 */
import { existsSync, mkdtempSync, readdirSync, realpathSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** Every path this process created through makeScratch (or registered through trackScratch) and has not yet removed. @type {Set<string>} */
const created = new Set();

/** Every path removeScratch has removed; audited until exit, so a path RE-CREATED after removal is still named. @type {Set<string>} */
const removed = new Set();

/**
 * src/output-file.ts encodeCwd, mirrored byte for byte (pinned equal over a corpus by test/workbench-qa-scratch-helper.test.ts).
 * @param {string} cwd
 * @returns {string}
 */
export function encodeCwd(cwd) {
  return cwd
    .replace(/[/\\]/g, '-')
    .replace(/^[A-Za-z]:-/, '')
    .replace(/^-+/, '');
}

/**
 * The per-user session scratch root `sessionTaskDir` writes under.
 * @returns {string}
 */
export function sessionScratchRoot() {
  return join(tmpdir(), `pi-subagents-${process.getuid?.() ?? 0}`);
}

/**
 * Every per-session directory keyed by `dir` (literal and resolved spelling), as the exact name or a `<name>-...` child.
 * @param {string} dir
 * @returns {string[]}
 */
export function sessionScratchFor(dir) {
  const spellings = new Set([dir]);
  try {
    spellings.add(realpathSync(dir));
  } catch {
    /* already gone - the literal spelling is all there is */
  }
  const encoded = [...spellings].map(encodeCwd);
  const root = sessionScratchRoot();
  /** @type {string[]} */
  let entries = [];
  try {
    entries = readdirSync(root);
  } catch {
    /* no session root yet - nothing was created */
  }
  return entries.filter((entry) => encoded.some((name) => entry === name || entry.startsWith(`${name}-`))).map((entry) => join(root, entry));
}

/**
 * A fresh scratch directory under tmpdir(), tracked so the leak guard can audit it.
 * @param {string} prefix
 * @returns {string}
 */
export function makeScratch(prefix) {
  const dir = mkdtempSync(join(tmpdir(), prefix));
  created.add(dir);
  return dir;
}

/**
 * Register a directory the runner created itself (or the code it drives created) so the guard audits it. Returns it.
 * @param {string} dir
 * @returns {string}
 */
export function trackScratch(dir) {
  created.add(dir);
  return dir;
}

/**
 * Remove scratch directories together with the session trees created for them. Idempotent.
 * @param {...(string | undefined)} dirs
 */
export function removeScratch(...dirs) {
  for (const dir of dirs) {
    if (!dir) continue;
    for (const session of sessionScratchFor(dir)) rmSync(session, { recursive: true, force: true });
    rmSync(dir, { recursive: true, force: true });
    created.delete(dir);
    removed.add(dir);
  }
}

/** Remove every scratch directory still tracked. */
export function removeAllScratch() {
  removeScratch(...created);
}

/**
 * The tracked paths (and their session trees) that still exist, removing each. Pure observation of paths we created.
 * @returns {string[]}
 */
export function drainLeaks() {
  /** @type {string[]} */
  const leaked = [];
  for (const dir of new Set([...created, ...removed])) {
    for (const path of [dir, ...sessionScratchFor(dir)]) {
      if (existsSync(path)) leaked.push(path);
    }
    removeScratch(dir);
  }
  return leaked;
}

/** How long the guard waits on a natural exit for fire-and-forget work to land before it audits (ms). */
export const SCRATCH_SETTLE_MS = 150;

/**
 * What the guard listens on: the process, or a stand-in a test drives.
 * @typedef {object} ExitTarget
 * @property {(event: 'beforeExit' | 'exit', listener: () => void) => unknown} once
 * @property {number | string | null | undefined} [exitCode]
 */

/**
 * Fail the calling runner if anything made through makeScratch or trackScratch - or the session tree created for it -
 * survives the run. Call once at module scope. A plain-node runner has no afterAll, so the guard rides process exit:
 * when the event loop drains ('beforeExit') it settles for SCRATCH_SETTLE_MS and audits; on process.exit() or an
 * uncaught error ('exit') it audits at once, since nothing asynchronous can run there. A survivor is written to stderr,
 * one path per line, removed, and a clean exit becomes exit 1. `options.target` (an EventEmitter with an exitCode) and
 * `options.report` let a test drive the guard without exiting a process. Returns the audit function.
 * @param {{ target?: ExitTarget, report?: (text: string) => void }} [options]
 * @returns {() => string[]}
 */
export function installScratchLeakGuard(options = {}) {
  const target = options.target ?? process;
  const report = options.report ?? ((/** @type {string} */ text) => process.stderr.write(`${text}\n`));
  let audited = false;
  const audit = () => {
    audited = true;
    const leaked = drainLeaks();
    if (leaked.length > 0) {
      report(`scratch leaked under ${tmpdir()} (${leaked.length}):\n  ${leaked.join('\n  ')}`);
      if (!target.exitCode) target.exitCode = 1;
    }
    return leaked;
  };
  target.once('beforeExit', () => {
    setTimeout(audit, SCRATCH_SETTLE_MS);
  });
  target.once('exit', () => {
    if (!audited) audit();
  });
  return audit;
}
