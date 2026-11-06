/**
 * hx-task-scope-probe.mjs - wb-f3wd (MWI B-hx-evidence, slice PI-5), EAT-R057: "The HX probe MUST record whether installed
 * producer can supply task-scope proof." Acceptance (vendored in test/fixtures/mwi-hx-evidence-requirements-roster.json): pin
 * the installed HX version, query an actual task/revision, capture the terminal response and the task/query digest plus
 * coverage, and record an unsupported or missing witness as a blocker scoped only to native-task-scope, not Git census.
 *
 * What it does, and nothing more: it commits a two-file Git repository in a guarded scratch directory (program rule 11,
 * qa/workbench/scratch.mjs; fixed identity and dates, Git configuration isolated, so the base revision is reproducible),
 * opens it with the installed @hyperunix/sdk against the hx the SDK resolves (HYPERUNIX_HX, then PATH), reads the runtime's
 * identity (version, binary SHA-256, HXS version, protocol, capability list) and asks the task PROBE_TASK names, the regular
 * files under the workspace root at the base revision, once per leg of LEGS (qa/workbench/hx-task-scope-judge.mjs): live and
 * strict, live with --best-effort, and pinned to the base revision through GitView. Each answer, or the runtime's refusal,
 * becomes an observation; the judge decides whether any of them is task-scope proof and, when none is, names the blocker,
 * scoped to native-task-scope only. The record is written as JSON (stdout, or the file named by --write);
 * test/workbench-hx-task-scope-probe.test.ts judges the committed copy (qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json)
 * and ties it to this script and the judge through probe.scriptSha256 and probe.judgeSha256.
 *
 * No host path is recorded: the workspace root reads <workspace> and the binary is named by its SHA-256. No Pi checkout is
 * read or written (the task repository is the scratch one), and no gate slot is involved.
 *
 * Usage: node qa/workbench/hx-task-scope-probe.mjs [--write <path>]
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { GitView, HyperUnix, ProcessFailureError, terminalOf } from '@hyperunix/sdk';
import { GATE, JUDGE_SCRIPT, judgeTaskScope, LEGS, observationOf, PROBE_SCHEMA, PROBE_SCRIPT, PROBE_TASK, taskDigest } from './hx-task-scope-judge.mjs';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

/** The task repository's committed files and the fixed commit identity that makes its base revision reproducible. */
const FILES = Object.freeze([
  Object.freeze(['src/a.txt', 'a\n']),
  Object.freeze(['src/b.txt', 'b\n']),
]);
const IDENTITY = Object.freeze({ name: 'hx-task-scope-probe', email: 'probe@example.invalid', date: '2026-11-06T00:00:00Z' });
/** The caller's wait per leg (never a runtime budget). */
const TIMEOUT_MS = 60_000;

/**
 * @param {Buffer | string} bytes
 * @returns {string}
 */
function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

/**
 * Runs git in `dir` with the caller's environment minus every GIT_ variable, global and system configuration ignored, and
 * the fixed identity; returns trimmed stdout.
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
function writeTaskRepository(dir) {
  git(dir, ['init', '-q', '--template=', '-b', 'main']);
  for (const [path, text] of FILES) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  git(dir, ['add', '--', ...FILES.map(([path]) => path)]);
  git(dir, ['-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-q', '-m', 'hx task-scope probe base']);
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
 * Runs every leg against the installed producer and assembles the record.
 * @returns {Promise<import('./hx-task-scope-judge.mjs').ProbeRecord>}
 */
export async function probe() {
  const here = fileURLToPath(import.meta.url);
  const scratch = makeScratch('hx-task-scope-probe-');
  try {
    const created = join(scratch, 'task');
    mkdirSync(created);
    const workspaceRoot = realpathSync(created);
    const baseRevision = writeTaskRepository(workspaceRoot);
    const task = { ...PROBE_TASK, baseRevision };
    const workspace = HyperUnix.open(workspaceRoot);
    try {
      const runtime = await workspace.client.runtime();
      /** @type {import('./hx-task-scope-judge.mjs').Observation[]} */
      const observations = [];
      for (const leg of LEGS) {
        /** @type {import('./hx-task-scope-judge.mjs').Query} */
        const query = { operation: 'find', kind: task.kind, root: task.root, view: leg.pinned ? `git:${baseRevision}` : null, bestEffort: leg.bestEffort };
        const options = {
          kind: task.kind,
          root: task.root,
          timeoutMs: TIMEOUT_MS,
          ...(leg.bestEffort ? { bestEffort: true } : {}),
          ...(leg.pinned ? { view: new GitView(baseRevision) } : {}),
        };
        try {
          const result = await workspace.find(options);
          observations.push(observationOf({ id: leg.id, query, outcome: 'result', result: /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (result)) }, workspaceRoot));
        } catch (error) {
          if (!(error instanceof ProcessFailureError)) throw error;
          const failed = error.result;
          observations.push(
            observationOf(
              { id: leg.id, query, outcome: 'process-failure', result: /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (failed)), terminal: terminalOf(failed.exitCode, failed.signal) },
              workspaceRoot,
            ),
          );
        }
      }
      const judged = judgeTaskScope(task, observations);
      return {
        schema: PROBE_SCHEMA,
        bead: 'wb-f3wd',
        requirement: 'EAT-R057',
        gate: GATE,
        utc: new Date().toISOString(),
        probe: {
          script: PROBE_SCRIPT,
          scriptSha256: sha256(readFileSync(here)),
          judge: JUDGE_SCRIPT,
          judgeSha256: sha256(readFileSync(join(dirname(here), 'hx-task-scope-judge.mjs'))),
        },
        producer: {
          name: 'hx',
          version: runtime.version ?? null,
          binarySha256: runtime.binarySha256 ?? null,
          hxsVersion: runtime.hxsVersion ?? null,
          protocol: runtime.protocol ?? null,
          binaryOrigin: runtime.binaryOrigin ?? null,
          capabilities: { count: runtime.capabilities.length, taskNamed: runtime.capabilities.filter((name) => /task/i.test(name)) },
          sdk: { name: '@hyperunix/sdk', version: installedSdkVersion(), reported: runtime.sdkVersion ?? null },
        },
        task: { ...task, digest: taskDigest(task) },
        observations,
        verdict: judged.verdict,
        capable: judged.capable,
        reasons: judged.reasons,
        blocker: judged.blocker,
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
    process.stderr.write('usage: node qa/workbench/hx-task-scope-probe.mjs [--write <path>]\n');
    process.exitCode = 2;
  } else {
    const text = `${JSON.stringify(await probe(), null, 2)}\n`;
    if (target === undefined) process.stdout.write(text);
    else writeFileSync(target, text);
  }
}
