/**
 * W22 (wb-cax.23): run-evidence receipt for docs/workbench/17 "Release checklist" items 6 and 7.
 *
 * Pure node: no src/ or dist/ import. Runs the pinned suites for each item through vitest's JSON reporter and
 * emits one `workbench.release-checklist/v1` receipt. A passing receipt is suite evidence for the two items, never
 * the release decision.
 *
 *   node qa/workbench/release-checklist-receipt.mjs
 *
 * Env: W22_CHECKLIST_RECEIPT (also write the receipt to this path), VITEST_MAX_WORKERS (passed through).
 * Exit 0: every pinned suite ran, nothing failed, vitest exited 0 with success true, every negative control passed. Exit 1: a
 * pinned test failed, a pinned file failed (hook/unhandled error), vitest exited non-zero, or a pinned negative control did not pass. Exit 2: a pinned suite is missing, or a reporter file is absent/unparseable.
 */
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { cpus, platform, arch, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONTRACT = 'workbench.release-checklist/v1';
export const DISCLAIMER = 'suite pass, not release proof: a passing run is suite evidence for checklist items 6 and 7 only; the release decision stays owner-reviewed (docs/workbench/17). Native references: not applicable (unit/fault tiers).';

/** Item text is docs/workbench/17-packaging-and-operations.md "Release checklist" verbatim. */
export const ITEMS = Object.freeze([
  Object.freeze({
    item: 6,
    text: 'Authorized provider invocation and denial tests pass.',
    suites: Object.freeze([
      Object.freeze({ path: 'test/workbench-registry-auth.test.ts', negativeControls: Object.freeze(['discovery alone exposes detached metadata but cannot invoke or inspect', 'permission-free providers still require an explicit invocation grant']) }),
      Object.freeze({ path: 'test/workbench-security-capability.test.ts', negativeControls: Object.freeze(['hostile caller-added outer identity/grants never reach provider; inner authority fields are refused']) }),
      Object.freeze({ path: 'test/workbench-security-pi-tools.test.ts', negativeControls: Object.freeze(['denies forged outer grants/principal/workspace/scope when settings carry no grant']) }),
      Object.freeze({ path: 'test/workbench-claude-role-tools.test.ts', negativeControls: Object.freeze(['adds only curated role MCP tools to actual SDK options without provider auto-grants']) }),
      Object.freeze({ path: 'test/workbench-claude-capability-tools.test.ts', negativeControls: Object.freeze(['registration and discovery never authorize invocation']) }),
      Object.freeze({ path: 'test/workbench-registry-admission.test.ts', negativeControls: Object.freeze(['refuses unknown, unauthorized, invalid and pre-cancelled requests before admission, even while saturated']) }),
    ]),
  }),
  Object.freeze({
    item: 7,
    text: 'Abort/restart/side-effect ambiguity tests pass.',
    suites: Object.freeze([
      Object.freeze({ path: 'test/workflow-effect-replay.test.ts', negativeControls: Object.freeze(['neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect', 'refuses to resume past a write the Claude host journaled']) }),
      Object.freeze({ path: 'test/workflow-journal.test.ts', negativeControls: Object.freeze(['stops replaying after a changed call even when a later one still matches']) }),
      Object.freeze({ path: 'test/workflow-reconcile.test.ts', negativeControls: Object.freeze(['refuses with no decisions, an unbound decision, or a decision bound to another call']) }),
      Object.freeze({ path: 'test/workbench-reconcile-decision.test.ts', negativeControls: Object.freeze(['denies nothing-to-reconcile when no refusing node row sits at the position']) }),
      Object.freeze({ path: 'test/workbench-claude-cancel-faults.test.ts', negativeControls: Object.freeze(['F5 a pre-aborted host signal makes zero query() calls and settles skipped', 'F10 a run abort during beforeDispatch stops the agent before query(): no SDK call, settled as workflow aborted']) }),
      Object.freeze({ path: 'test/workbench-local-detached-effects.test.ts', negativeControls: Object.freeze(['neither re-runs nor replays a journaled write: the resume surfaces an uncertain effect naming its producer', 'refuses a write whose first attempt lost its answer instead of retrying it']) }),
      Object.freeze({ path: 'test/workbench-pi-reconcile.test.ts', negativeControls: Object.freeze(['registers only under the claude backend']) }),
    ]),
  }),
]);

export function sha256Of(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** True when the source declares a test whose title is exactly `title`: `it(`/`test(` (and `.skip` style modifiers) at a line start with the title as the whole quoted first argument. A suffix-extended title, a comment or a plain string never matches. */
export function hasTestCall(source, title) {
  return new RegExp(`^\\s*(?:it|test)(?:\\.\\w+)*\\(\\s*(["'\`])${escapeRegExp(title)}\\1`, 'm').test(source);
}

/** Drift check against a tree: every pinned path exists and holds each pinned negative-control title. */
export function pinProblems(root, items = ITEMS) {
  const problems = [];
  for (const item of items) {
    for (const suite of item.suites) {
      const file = resolve(root, suite.path);
      if (!existsSync(file)) {
        problems.push({ item: item.item, path: suite.path, kind: 'missing-suite' });
        continue;
      }
      const source = readFileSync(file, 'utf8');
      for (const title of suite.negativeControls) {
        if (!hasTestCall(source, title)) problems.push({ item: item.item, path: suite.path, kind: 'missing-negative-control', title });
      }
    }
  }
  return problems;
}

function suiteResult(report, root, suite) {
  const absolute = resolve(root, suite.path);
  const file = (report?.testResults ?? []).find((entry) => resolve(entry.name ?? '') === absolute);
  const cases = file?.assertionResults ?? [];
  const count = (status) => cases.filter((c) => c.status === status).length;
  const skipped = cases.filter((c) => c.status !== 'passed' && c.status !== 'failed').map((c) => c.fullName ?? c.title);
  const negativeControls = suite.negativeControls.map((title) => ({ title, present: cases.some((c) => c.title === title && c.status === 'passed') }));
  return { ran: file !== undefined, fileStatus: file?.status ?? null, fileMessage: typeof file?.message === 'string' && file.message.length > 0 ? file.message : null, tests: cases.length, passed: count('passed'), failed: count('failed'), skipped: skipped.length, skippedTitles: skipped, negativeControls };
}

/**
 * Builds the receipt. `inputs.reports[item]` is `{ report }` (parsed vitest JSON) or `{ unavailable: reason }`;
 * `inputs.read(path)` returns the suite bytes or undefined when the file is absent.
 */
export function buildReceipt(inputs) {
  const items = inputs.items ?? ITEMS;
  const out = items.map((item) => {
    const given = inputs.reports[item.item] ?? { unavailable: 'no reporter output recorded' };
    const reasons = [];
    const suites = item.suites.map((suite) => {
      const bytes = inputs.read(suite.path);
      if (bytes === undefined) {
        reasons.push(`missing suite ${suite.path}`);
        return { path: suite.path, sha256: null, fileStatus: null, fileMessage: null, tests: 0, passed: 0, failed: 0, skipped: 0, skippedTitles: [], negativeControls: suite.negativeControls.map((title) => ({ title, present: false })) };
      }
      const result = given.report ? suiteResult(given.report, inputs.root, suite) : { ran: false, fileStatus: null, fileMessage: null, tests: 0, passed: 0, failed: 0, skipped: 0, skippedTitles: [], negativeControls: suite.negativeControls.map((title) => ({ title, present: false })) };
      if (given.report && !result.ran) reasons.push(`reporter has no result for ${suite.path}`);
      const { ran: _ran, ...rest } = result;
      return { path: suite.path, sha256: sha256Of(bytes), ...rest };
    });
    if (given.unavailable) reasons.push(given.unavailable);
    const unavailable = reasons.length > 0;
    // Vitest's own verdict is part of the item verdict: a non-zero exit (null = killed by signal), success false or a failed
    // file (afterAll/beforeAll error, unhandled error) fails the item even when every assertion passed.
    const exitFailed = given.exitStatus !== undefined && given.exitStatus !== 0;
    const successFalse = given.report?.success === false;
    const failing = exitFailed || successFalse || suites.some((s) => s.failed > 0 || s.fileStatus === 'failed' || s.negativeControls.some((c) => !c.present));
    return { item: item.item, text: item.text, command: given.command ?? null, vitestExit: given.exitStatus, vitestSuccess: typeof given.report?.success === 'boolean' ? given.report.success : null, suites, unavailable: reasons, pass: !unavailable && !failing };
  });
  const unavailable = out.some((i) => i.unavailable.length > 0);
  return { contract: CONTRACT, utc: inputs.meta.utc, revision: inputs.meta.revision, dirty: inputs.meta.dirty, node: inputs.meta.node, vitest: inputs.meta.vitest, host: inputs.meta.host, items: out, pass: !unavailable && out.every((i) => i.pass), disclaimer: DISCLAIMER };
}

export function exitCodeFor(receipt) {
  if (receipt.items.some((i) => i.unavailable.length > 0)) return 2;
  return receipt.pass ? 0 : 1;
}

function git(root, args) {
  const run = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  return run.status === 0 ? run.stdout.trim() : undefined;
}

/** Revision and dirty flag of the repository that OWNS root; nested inside another repository, or inside none, both are 'unknown' (never the outer repository's HEAD, never an asserted dirty:false). */
export function repoIdentity(root) {
  const top = git(root, ['rev-parse', '--show-toplevel']);
  if (top === undefined || realpathSync(top) !== realpathSync(root)) return { revision: 'unknown', dirty: 'unknown' };
  const revision = git(root, ['rev-parse', 'HEAD']);
  const status = git(root, ['status', '--porcelain']);
  if (revision === undefined || status === undefined) return { revision: 'unknown', dirty: 'unknown' };
  return { revision, dirty: status !== '' };
}

function runItem(root, item, scratch) {
  const outputFile = join(scratch, `item-${item.item}.json`);
  const argv = ['run', '--reporter=json', `--outputFile=${outputFile}`, ...item.suites.map((s) => s.path)];
  const command = `./node_modules/.bin/vitest ${argv.join(' ')}`;
  const run = spawnSync(join(root, 'node_modules', '.bin', 'vitest'), argv, { cwd: root, encoding: 'utf8', env: process.env, stdio: ['ignore', 'ignore', 'ignore'] });
  if (run.error) return { command, unavailable: `vitest could not start: ${run.error.message}` };
  if (!existsSync(outputFile)) return { command, unavailable: 'reporter file absent' };
  try {
    return { command, exitStatus: run.status, report: JSON.parse(readFileSync(outputFile, 'utf8')) };
  } catch (error) {
    return { command, unavailable: `reporter file unparseable: ${error instanceof Error ? error.message : String(error)}` };
  }
}

export function runCli(env, root) {
  const missing = pinProblems(root).filter((p) => p.kind === 'missing-suite');
  const scratch = mkdtempSync(join(tmpdir(), 'release-checklist-'));
  let receipt;
  try {
    const reports = {};
    for (const item of ITEMS) reports[item.item] = missing.some((p) => p.item === item.item) ? { unavailable: 'pinned suite missing; item not run' } : runItem(root, item, scratch);
    const identity = repoIdentity(root);
    const pkg = JSON.parse(readFileSync(join(root, 'node_modules', 'vitest', 'package.json'), 'utf8'));
    receipt = buildReceipt({
      root,
      reports,
      read: (path) => (existsSync(resolve(root, path)) ? readFileSync(resolve(root, path)) : undefined),
      meta: { utc: new Date().toISOString(), revision: identity.revision, dirty: identity.dirty, node: process.version, vitest: pkg.version, host: { platform: platform(), arch: arch(), cpus: cpus().length } },
    });
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
  const line = JSON.stringify(receipt);
  process.stdout.write(`${line}\n`);
  if (env.W22_CHECKLIST_RECEIPT) writeFileSync(env.W22_CHECKLIST_RECEIPT, `${line}\n`);
  return exitCodeFor(receipt);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exitCode = runCli(process.env, join(dirname(fileURLToPath(import.meta.url)), '..', '..'));
}
