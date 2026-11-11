/**
 * hx-source-basis-probe.mjs - wb-lri (W07: HyperUnix provider), the source-basis leg: "Typed HX query capability preserving
 * source basis ... Verify actual installed HX SDK surface first; honest blocker if absent. Acceptance: real query coverage and
 * source basis." It measures what source basis the installed producer can give the find request Pi's registered
 * hyperunix.find issues (src/workbench/providers/hyperunix.ts), and records the answer as JSON.
 *
 * The vendored @hyperunix/sdk 0.1.0 carries a read's source basis in one place only: ReadResult.revision, the runtime's own
 * resolution of a pinned view (its hx.view frame: the requested revision and the resolved commit, null on a live read).
 * QueryResult has no such member and resultToJson writes no such key, so the hyperunix.find/v1 output, whose source is
 * resultToJson of the result, cannot carry it. This probe asks the producer twice with PROVIDER_FIND, the request the
 * registered provider issues (test/workbench-hyperunix-source-basis-standing.test.ts holds the two equal):
 *   provider-live    the request exactly as the provider issues it (no view: the runtime's own default, the live view);
 *   provider-pinned  the same request pinned through GitView to the base revision of the probe's repository, the only
 *                    revision binding the SDK offers.
 * Each answer, or the runtime's refusal, becomes one observation: the view identity the runtime printed, the pinned-view
 * resolution, the query digest and its source, the execution kind, the licence, the row count and the frames; for a refusal,
 * the exit code, the terminal class and each diagnostic's code, severity, reason and requirement ids.
 *
 * The repository is a guarded scratch directory (program rule 11, qa/workbench/scratch.mjs) holding two committed files under
 * src/ with a fixed identity and fixed dates, so its base revision is reproducible. No host path is recorded: the workspace
 * root reads <workspace> and the binary is named by its SHA-256. No Pi checkout is read or written and no gate slot is held.
 *
 * Usage: node qa/workbench/hx-source-basis-probe.mjs [--write <path>]
 * The committed record is qa/workbench/receipts/wb-lri-hx-source-basis-probe.json; probe.scriptSha256 ties it to this file.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Bounds, GitView, HyperUnix, ProcessFailureError, resultToJson, terminalOf } from '@hyperunix/sdk';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

/** The record's schema tag. */
export const PROBE_SCHEMA = 'wb-lri.hx-source-basis-probe/1';
/** This script's repository path, as probe.script records it. */
export const PROBE_SCRIPT = 'qa/workbench/hx-source-basis-probe.mjs';
/**
 * The find request src/workbench/providers/hyperunix.ts issues for {kind: 'hx.fs/regular-file', root: 'src'}: best effort,
 * a 30 s wall bound and a 60 s caller wait, and no view.
 */
export const PROVIDER_FIND = Object.freeze({ kind: 'hx.fs/regular-file', root: 'src', bestEffort: true, wall: '30s', timeoutMs: 60_000 });
/** The two legs, in order: the provider's own request, then the same request pinned to the base revision. */
export const LEGS = Object.freeze([Object.freeze({ id: 'provider-live', pinned: false }), Object.freeze({ id: 'provider-pinned', pinned: true })]);

/** The probe repository's committed files and the fixed commit identity that makes its base revision reproducible. */
const FILES = Object.freeze([Object.freeze(['src/a.txt', 'a\n']), Object.freeze(['src/b.txt', 'b\n'])]);
const IDENTITY = Object.freeze({ name: 'hx-source-basis-probe', email: 'probe@example.invalid', date: '2026-11-11T00:00:00Z' });

/**
 * @param {Buffer | string} bytes
 * @returns {string}
 */
function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

/**
 * Runs git in `dir` with the caller's environment minus every GIT_ variable, global and system configuration ignored, and the
 * fixed identity; returns trimmed stdout.
 * @param {string} dir
 * @param {readonly string[]} args
 * @returns {string}
 */
function git(dir, args) {
  /** @type {Record<string, string>} */
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && !key.startsWith('GIT_')) env[key] = value;
  }
  Object.assign(env, {
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_AUTHOR_NAME: IDENTITY.name,
    GIT_AUTHOR_EMAIL: IDENTITY.email,
    GIT_AUTHOR_DATE: IDENTITY.date,
    GIT_COMMITTER_NAME: IDENTITY.name,
    GIT_COMMITTER_EMAIL: IDENTITY.email,
    GIT_COMMITTER_DATE: IDENTITY.date,
  });
  const result = spawnSync('git', [...args], { cwd: dir, env, encoding: 'utf8' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`git ${args.join(' ')} exited ${result.status}: ${result.stderr}`);
  return result.stdout.trim();
}

/**
 * Commits FILES into a fresh repository at `dir` (no template, no hooks, no signing) and returns the commit.
 * @param {string} dir
 * @returns {string}
 */
function writeRepository(dir) {
  git(dir, ['init', '-q', '--template=', '-b', 'main']);
  for (const [path, text] of FILES) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  git(dir, ['add', '--', ...FILES.map(([path]) => path)]);
  git(dir, ['-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-q', '-m', 'hx source-basis probe base']);
  return git(dir, ['rev-parse', '--verify', 'HEAD^{commit}']);
}

/**
 * The version of the @hyperunix/sdk package this runner imports, read from that package's own manifest.
 * @returns {string | null}
 */
function installedSdkVersion() {
  const entry = fileURLToPath(import.meta.resolve('@hyperunix/sdk'));
  const manifest = JSON.parse(readFileSync(join(dirname(dirname(entry)), 'package.json'), 'utf8'));
  return manifest !== null && manifest.name === '@hyperunix/sdk' && typeof manifest.version === 'string' ? manifest.version : null;
}

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function objectOf(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? /** @type {Record<string, unknown>} */ (value) : {};
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function stringOf(value) {
  return typeof value === 'string' ? value : null;
}

/**
 * Every occurrence of the workspace root in `text` read as <workspace>.
 * @param {string} text
 * @param {string} workspaceRoot
 * @returns {string}
 */
function scrub(text, workspaceRoot) {
  return text.split(workspaceRoot).join('<workspace>');
}

/**
 * One diagnostic as the record keeps it: its code, severity, reason and requirement ids, never its message.
 * @param {unknown} entry
 * @param {string} workspaceRoot
 */
function diagnosticOf(entry, workspaceRoot) {
  const item = objectOf(entry);
  const details = objectOf(item.details);
  const reason = stringOf(details.reason);
  const requirements = stringOf(details.requirements);
  return {
    code: stringOf(item.code),
    severity: stringOf(item.severity),
    reason: reason === null ? null : scrub(reason, workspaceRoot),
    requirements: requirements === null ? [] : requirements.split(/\s+/).filter(Boolean),
  };
}

/**
 * The observation of one answered leg: what the runtime printed, read through the SDK's typed read result.
 * @param {string} id
 * @param {string | null} view
 * @param {Record<string, unknown>} result
 * @param {string} workspaceRoot
 */
function answerOf(id, view, result, workspaceRoot) {
  const json = resultToJson(/** @type {never} */ (result));
  const revision = objectOf(result.revision);
  const requested = stringOf(revision.requested);
  const resolvedCommit = stringOf(revision.resolvedCommit);
  const summary = objectOf(result.coverageSummary);
  return {
    id,
    requestedView: view,
    outcome: 'result',
    exitCode: typeof result.exitCode === 'number' ? result.exitCode : null,
    terminal: stringOf(result.terminal),
    statusKind: stringOf(objectOf(result.status).kind),
    diagnostics: (Array.isArray(result.diagnostics) ? result.diagnostics : []).map((entry) => diagnosticOf(entry, workspaceRoot)),
    view: stringOf(result.view),
    revision: requested !== null && resolvedCommit !== null ? { requested, resolvedCommit } : null,
    revisionMember: Object.hasOwn(result, 'revision'),
    resultJsonKeys: Object.keys(json),
    queryDigest: stringOf(result.queryDigest),
    digestSource: stringOf(result.digestSource),
    licensesAbsence: summary.licensesAbsence === true,
    completeness: stringOf(summary.completeness),
    rows: Array.isArray(result.rows) ? result.rows.length : null,
    frames: Array.isArray(result.frames) ? result.frames.length : null,
  };
}

/**
 * The observation of one refused leg: the SDK's typed process failure, its streams already withheld by the SDK.
 * @param {string} id
 * @param {string | null} view
 * @param {ProcessFailureError} error
 * @param {string} workspaceRoot
 */
function refusalOf(id, view, error, workspaceRoot) {
  const failed = objectOf(error.result);
  const exitCode = typeof failed.exitCode === 'number' ? failed.exitCode : null;
  const signal = stringOf(failed.signal);
  return {
    id,
    requestedView: view,
    outcome: 'process-failure',
    errorCode: stringOf(/** @type {Record<string, unknown>} */ (/** @type {unknown} */ (error)).code),
    exitCode,
    terminal: terminalOf(exitCode, signal),
    diagnostics: (Array.isArray(failed.diagnostics) ? failed.diagnostics : []).map((entry) => diagnosticOf(entry, workspaceRoot)),
    view: null,
    revision: null,
    rows: null,
    frames: Array.isArray(failed.frames) ? failed.frames.length : null,
  };
}

/**
 * Runs both legs against the installed producer and assembles the record.
 */
export async function probe() {
  const here = fileURLToPath(import.meta.url);
  const scratch = makeScratch('hx-source-basis-probe-');
  try {
    const created = join(scratch, 'repository');
    mkdirSync(created);
    const workspaceRoot = realpathSync(created);
    const baseRevision = writeRepository(workspaceRoot);
    const workspace = HyperUnix.open(workspaceRoot);
    try {
      const runtime = await workspace.client.runtime();
      const legs = [];
      for (const leg of LEGS) {
        const view = leg.pinned ? `git:${baseRevision}` : null;
        const options = {
          kind: PROVIDER_FIND.kind,
          root: PROVIDER_FIND.root,
          bestEffort: PROVIDER_FIND.bestEffort,
          bounds: Bounds.create({ wall: PROVIDER_FIND.wall }),
          timeoutMs: PROVIDER_FIND.timeoutMs,
          ...(leg.pinned ? { view: new GitView(baseRevision) } : {}),
        };
        try {
          const result = await workspace.find(options);
          legs.push(answerOf(leg.id, view, /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (result)), workspaceRoot));
        } catch (error) {
          if (!(error instanceof ProcessFailureError)) throw error;
          legs.push(refusalOf(leg.id, view, error, workspaceRoot));
        }
      }
      return {
        schema: PROBE_SCHEMA,
        bead: 'wb-lri',
        utc: new Date().toISOString(),
        probe: { script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(here)) },
        producer: {
          name: 'hx',
          version: runtime.version ?? null,
          binarySha256: runtime.binarySha256 ?? null,
          binaryOrigin: runtime.binaryOrigin ?? null,
          hxsVersion: runtime.hxsVersion ?? null,
          protocol: runtime.protocol ?? null,
          sdk: { name: '@hyperunix/sdk', version: installedSdkVersion() },
        },
        repository: { files: FILES.map(([path]) => path), baseRevision },
        request: { ...PROVIDER_FIND },
        legs,
      };
    } finally {
      await workspace.client.close();
    }
  } finally {
    removeScratch(scratch);
  }
}

const argv1 = process.argv[1];
if (argv1 !== undefined && import.meta.url === pathToFileURL(realpathSync(argv1)).href) {
  const args = process.argv.slice(2);
  const writeAt = args.indexOf('--write');
  const target = writeAt >= 0 ? args[writeAt + 1] : undefined;
  if (writeAt >= 0 && target === undefined) {
    process.stderr.write('usage: node qa/workbench/hx-source-basis-probe.mjs [--write <path>]\n');
    process.exitCode = 2;
  } else {
    const text = `${JSON.stringify(await probe(), null, 2)}\n`;
    if (target === undefined) process.stdout.write(text);
    else writeFileSync(target, text);
  }
}
