/**
 * hx-named-query-probe.mjs - wb-pxvv (MWI B-hx-admit, slice PI-5), EAT-R163 of the 2026-11-06 delta (vendored in
 * test/fixtures/mwi-hx-admit-requirements-roster.json): probe a workspace-defined named query carrying a task scope against
 * the installed binary and record exit code, verb, roster and verdict in a dated receipt.
 *
 * What it does, and nothing more: in a guarded scratch directory (program rule 11, qa/workbench/scratch.mjs) it commits the
 * same two-file repository the wb-f3wd probe commits (the same files, identity, dates and message, so the base revision and
 * the task digest are wb-f3wd's), marks it a workspace with `hx init` (which writes .hyperunix/ only), forms the task's query
 * - the regular files under the workspace root - under the pinned view git:<base revision> and saves it with
 * `hx query save` as the named query QUERY_NAME, declaring the task as its parameter and the task digest as its doc. It then
 * loads that definition through the installed @hyperunix/sdk and runs it once per leg of LEGS
 * (qa/workbench/hx-named-query-judge.mjs): strict coverage and --best-effort. The init, plan and save commands run the very
 * binary the SDK resolved (its runtime binaryPath), and `hx --hxs query show` reads back the saved definition's documentation
 * and whether it keeps a view. In the same run it calls the landed wb-f3wd probe
 * (qa/workbench/hx-task-scope-probe.mjs probe) and keeps its binary SHA-256, verdict and per-leg exit codes, so both routes
 * are measured at one binary. The judge decides the named-query route; the record is written as JSON (stdout, or the file
 * named by --write); test/workbench-hx-admit-census.test.ts judges the committed copy and ties it to this script and the
 * judge by their SHA-256.
 *
 * No host path is recorded: the workspace root reads <workspace>, the SDK's captured definition path reads
 * <captured-definition> and the binary is named by its SHA-256. No Pi checkout is read or written and no gate slot is used.
 *
 * Usage: node qa/workbench/hx-named-query-probe.mjs [--write <path>]
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { HyperUnix, terminalOf } from '@hyperunix/sdk';
import { digestText, JUDGE_SCRIPT, judgeNamedQueryRoute, LEGS, NAMED_QUERY_SCHEMA, observationOfRun, PROBE_SCRIPT, QUERY_NAME, ROUTE, VERB } from './hx-named-query-judge.mjs';
import { GATE, PROBE_TASK, taskDigest, WORKSPACE_TOKEN } from './hx-task-scope-judge.mjs';
import { probe as probeFindVerb } from './hx-task-scope-probe.mjs';
import { installScratchLeakGuard, makeScratch, removeScratch } from './scratch.mjs';

installScratchLeakGuard();

/** wb-f3wd's task repository, byte for byte (qa/workbench/hx-task-scope-probe.mjs FILES, IDENTITY and commit message). */
const FILES = Object.freeze([
  Object.freeze(['src/a.txt', 'a\n']),
  Object.freeze(['src/b.txt', 'b\n']),
]);
const IDENTITY = Object.freeze({ name: 'hx-task-scope-probe', email: 'probe@example.invalid', date: '2026-11-06T00:00:00Z' });
const MESSAGE = 'hx task-scope probe base';
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
 * The caller's environment minus every GIT_ variable, with global and system Git configuration ignored and the fixed identity.
 * @returns {Record<string, string>}
 */
function isolatedEnv() {
  /** @type {Record<string, string>} */
  const env = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && !key.startsWith('GIT_')) env[key] = value;
  }
  return Object.assign(env, {
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_AUTHOR_NAME: IDENTITY.name,
    GIT_AUTHOR_EMAIL: IDENTITY.email,
    GIT_AUTHOR_DATE: IDENTITY.date,
    GIT_COMMITTER_NAME: IDENTITY.name,
    GIT_COMMITTER_EMAIL: IDENTITY.email,
    GIT_COMMITTER_DATE: IDENTITY.date,
  });
}

/**
 * Runs `command` with `args` in `dir` and returns its stdout; throws on a spawn error or a nonzero exit.
 * @param {string} command
 * @param {readonly string[]} args
 * @param {string} dir
 * @param {string} [input]
 * @returns {string}
 */
function run(command, args, dir, input) {
  const result = spawnSync(command, [...args], { cwd: dir, env: isolatedEnv(), encoding: 'utf8', ...(input === undefined ? {} : { input }) });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command === 'git' ? 'git' : 'hx'} ${args.join(' ')} exited ${result.status}: ${result.stderr}`);
  return result.stdout;
}

/**
 * Commits FILES into a fresh repository at `dir` (no template, no hooks, no signing) and returns the commit.
 * @param {string} dir
 * @returns {string}
 */
function writeTaskRepository(dir) {
  run('git', ['init', '-q', '--template=', '-b', 'main'], dir);
  for (const [path, text] of FILES) {
    mkdirSync(dirname(join(dir, path)), { recursive: true });
    writeFileSync(join(dir, path), text);
  }
  run('git', ['add', '--', ...FILES.map(([path]) => path)], dir);
  run('git', ['-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-q', '-m', MESSAGE], dir);
  return run('git', ['rev-parse', '--verify', 'HEAD^{commit}'], dir).trim();
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
 * The saved definition as the runtime shows it (`hx --hxs query show NAME`): its documentation, and the view it keeps, if any
 * frame of the definition stream states one at any depth.
 * @param {string} stream
 * @returns {{ doc: string | null, savedView: string | null }}
 */
function shownDefinition(stream) {
  let doc = null;
  let savedView = null;
  /** @param {unknown} value */
  const walk = (value) => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value !== null && typeof value === 'object') {
      for (const [key, inner] of Object.entries(value)) {
        if (key === 'view' && typeof inner === 'string' && savedView === null) savedView = inner;
        walk(inner);
      }
    }
  };
  for (const line of stream.split('\n')) {
    if (line.trim() === '') continue;
    const frame = JSON.parse(line);
    if (frame?.kind === 'query-definition' && typeof frame.body?.documentation === 'string') doc = frame.body.documentation;
    walk(frame);
  }
  return { doc, savedView };
}

/**
 * The view the first frame of a plan stream states, or null.
 * @param {string} plan
 * @returns {string | null}
 */
function planView(plan) {
  const first = plan.split('\n').find((line) => line.trim() !== '');
  if (first === undefined) return null;
  const view = JSON.parse(first)?.body?.view;
  return typeof view === 'string' ? view : null;
}

/**
 * Runs the named-query legs and the same-binary find-verb probe against the installed producer and assembles the record.
 */
export async function probe() {
  const here = fileURLToPath(import.meta.url);
  const scratch = makeScratch('hx-named-query-probe-');
  try {
    const created = join(scratch, 'task');
    mkdirSync(created);
    const workspaceRoot = realpathSync(created);
    const baseRevision = writeTaskRepository(workspaceRoot);
    const task = { ...PROBE_TASK, baseRevision };
    const digest = taskDigest(task);
    const workspace = HyperUnix.open(workspaceRoot);
    try {
      const runtime = await workspace.client.runtime();
      const binary = runtime.binaryPath;
      const pinnedView = `git:${baseRevision}`;
      const commands = [
        ['init', workspaceRoot],
        ['--hxs', `--view=${pinnedView}`, 'find', '--kind', task.kind, '--plan', task.root],
        ['query', 'save', QUERY_NAME, `--param=task:string=${task.id}`, `--doc=${digest}`],
        ['--hxs', 'query', 'show', QUERY_NAME],
      ];
      run(binary, commands[0] ?? [], workspaceRoot);
      const plan = run(binary, commands[1] ?? [], workspaceRoot);
      run(binary, commands[2] ?? [], workspaceRoot, plan);
      const shown = shownDefinition(run(binary, commands[3] ?? [], workspaceRoot));
      const loaded = await workspace.namedQuery(QUERY_NAME);
      const semanticDigest = digestText(loaded.digest);
      /** @type {import('./hx-task-scope-judge.mjs').Observation[]} */
      const observations = [];
      for (const leg of LEGS) {
        const result = await loaded.run({}, { bestEffort: leg.bestEffort, timeoutMs: TIMEOUT_MS });
        const query = { operation: VERB, name: QUERY_NAME, kind: task.kind, root: task.root, view: pinnedView, bestEffort: leg.bestEffort };
        observations.push(
          observationOfRun(
            { id: leg.id, query, result: /** @type {Record<string, unknown>} */ (/** @type {unknown} */ (result)), terminal: terminalOf(result.exitCode, result.signal) },
            workspaceRoot,
          ),
        );
      }
      const judged = judgeNamedQueryRoute(task, observations);
      const find = await probeFindVerb();
      return {
        schema: NAMED_QUERY_SCHEMA,
        bead: 'wb-pxvv',
        requirement: 'EAT-R163',
        gate: GATE,
        route: ROUTE,
        utc: new Date().toISOString(),
        probe: { script: PROBE_SCRIPT, scriptSha256: sha256(readFileSync(here)), judge: JUDGE_SCRIPT, judgeSha256: sha256(readFileSync(join(dirname(here), 'hx-named-query-judge.mjs'))) },
        producer: {
          name: 'hx',
          version: runtime.version ?? null,
          binarySha256: runtime.binarySha256 ?? null,
          binaryOrigin: runtime.binaryOrigin ?? null,
          hxsVersion: runtime.hxsVersion ?? null,
          protocol: runtime.protocol ?? null,
          capabilities: { count: runtime.capabilities.length, taskNamed: runtime.capabilities.filter((name) => /task/i.test(name)) },
          sdk: { name: '@hyperunix/sdk', version: installedSdkVersion(), reported: runtime.sdkVersion ?? null },
        },
        task: { ...task, digest },
        definition: {
          name: loaded.name,
          verb: VERB,
          parameters: loaded.parameters.map((parameter) => ({ name: parameter.name, type: parameter.type, default: typeof parameter.default === 'string' ? parameter.default : null })),
          doc: shown.doc,
          formedUnder: planView(plan),
          savedView: shown.savedView,
          semanticDigest,
          commands: commands.map((args) => ['hx', ...args.map((token) => token.split(workspaceRoot).join(WORKSPACE_TOKEN))]),
        },
        observations,
        verdict: judged.verdict,
        capable: judged.capable,
        reasons: judged.reasons,
        blocker: judged.blocker,
        findVerb: {
          binarySha256: find.producer.binarySha256,
          verdict: find.verdict,
          legs: find.observations.map((observation) => ({ id: observation.id, exitCode: observation.exitCode })),
        },
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
    process.stderr.write('usage: node qa/workbench/hx-named-query-probe.mjs [--write <path>]\n');
    process.exitCode = 2;
  } else {
    const text = `${JSON.stringify(await probe(), null, 2)}\n`;
    if (target === undefined) process.stdout.write(text);
    else writeFileSync(target, text);
  }
}
