/**
 * hx-task-scope-judge.mjs - wb-f3wd (MWI B-hx-evidence, slice PI-5), EAT-R057: "The HX probe MUST record whether installed
 * producer can supply task-scope proof." The pure half of the probe: the legs it asks, the observation it keeps of each
 * answer or refusal, and the judgement over those observations. This module does no I/O and reads no clock or random source:
 * qa/workbench/hx-task-scope-probe.mjs hands it what the installed hx returned through @hyperunix/sdk, and
 * test/workbench-hx-task-scope-probe.test.ts hands it fabricated observations; either way only the observed shape is judged.
 *
 * Task-scope proof is one observation meeting every condition the MW development rig's own completeness check names
 * (hx-scope.ts:43-46 at mw@f7c0a9431d6c, quoted in the program triage, claim C0242): a native result (not a refused
 * process), exit 0, every stream ended, coverage the runtime certified complete, absence licensed, a task scope, the
 * runtime's own revision resolution equal to the task's base revision, and a runtime query digest. A complete filesystem
 * response is never task proof (the vendored adversarial mutant): scope comes from the query's kind, and an hx.fs kind is a
 * filesystem scope. When no observation qualifies, the blocker is scoped to native-task-scope only: honestly labelled
 * Git-census mode is never blocked by it (claim C03113).
 */
import { createHash } from 'node:crypto';

export const PROBE_SCHEMA = 'workbench.hx-task-scope-probe/v1';
export const PROBE_SCRIPT = 'qa/workbench/hx-task-scope-probe.mjs';
export const JUDGE_SCRIPT = 'qa/workbench/hx-task-scope-judge.mjs';
export const PROBE_RECORD = 'qa/workbench/receipts/wb-f3wd-hx-task-scope-probe.json';
/** The program's named real-infra gate for this slice (BEAD-PLAN B-hx-evidence). */
export const GATE = 'HX-TASK-SCOPE-PROBE';
/** The only mode an unsupported or missing witness blocks: the certified native-scope profile. */
export const BLOCKER_SCOPE = 'native-task-scope';
/** Modes a task-scope blocker never blocks. */
export const NOT_BLOCKED = Object.freeze(['git-census']);
/** What the workspace root reads in a record: no host path is kept. */
export const WORKSPACE_TOKEN = '<workspace>';
export const VERDICTS = Object.freeze(['task-scope-supported', 'task-scope-unsupported']);
/** Every condition an observation can miss, in the order reasonsOf reports them. */
export const REASONS = Object.freeze([
  'process-failed',
  'exit-nonzero',
  'terminal-unreached',
  'coverage-not-complete',
  'absence-unlicensed',
  'scope-not-task',
  'revision-unbound',
  'revision-mismatch',
  'query-digest-absent',
]);
/** The task the probe asks about: the regular files under the workspace root, the MW rig's default discovery query. */
export const PROBE_TASK = Object.freeze({ id: 'hx-task-scope-probe', kind: 'hx.fs/regular-file', root: '.' });
/**
 * The legs, in order: the rig's default query (live view, strict coverage), the same with --best-effort (Pi's hyperunix.find
 * coverage policy), and the same pinned to the base revision through GitView (the SDK's only revision binding).
 */
export const LEGS = Object.freeze([
  Object.freeze({ id: 'filesystem-live', bestEffort: false, pinned: false }),
  Object.freeze({ id: 'filesystem-live-best-effort', bestEffort: true, pinned: false }),
  Object.freeze({ id: 'revision-pinned', bestEffort: false, pinned: true }),
]);

/** @typedef {'filesystem' | 'task' | 'other'} Scope */
/** @typedef {{ readonly requested: string, readonly resolvedCommit: string }} Revision */
/** @typedef {{ readonly code: string, readonly severity: string | null, readonly reason: string | null }} DiagnosticRecord */
/** @typedef {{ readonly operation: 'find', readonly kind: string, readonly root: string, readonly view: string | null, readonly bestEffort: boolean }} Query */
/**
 * @typedef {object} Observation
 * @property {string} id
 * @property {Query} query
 * @property {readonly string[]} argv
 * @property {Scope} scope
 * @property {'result' | 'process-failure'} outcome
 * @property {number | null} exitCode
 * @property {string | null} signal
 * @property {string | null} terminal
 * @property {string | null} statusKind
 * @property {boolean} terminalReached
 * @property {readonly DiagnosticRecord[]} diagnostics
 * @property {'complete' | 'incomplete' | 'unknown' | null} completeness
 * @property {boolean} licensesAbsence
 * @property {readonly string[]} coverageScopes
 * @property {string | null} view
 * @property {Revision | null} revision
 * @property {string | null} queryDigest
 * @property {'runtime' | 'absent'} digestSource
 * @property {number | null} answerCount
 * @property {number} frames
 */
/** @typedef {{ readonly id: string, readonly kind: string, readonly root: string, readonly baseRevision: string }} Task */
/** @typedef {{ readonly gate: string, readonly scope: string, readonly witness: 'missing' | 'unsupported', readonly notBlocked: readonly string[] }} Blocker */
/**
 * @typedef {object} Judgement
 * @property {string} verdict
 * @property {readonly string[]} capable
 * @property {Readonly<Record<string, readonly string[]>>} reasons
 * @property {Blocker | null} blocker
 */
/**
 * @typedef {object} Producer
 * @property {string} name
 * @property {string | null} version
 * @property {string | null} binarySha256
 * @property {string | null} hxsVersion
 * @property {string | null} protocol
 * @property {string | null} binaryOrigin
 * @property {{ readonly count: number, readonly taskNamed: readonly string[] }} capabilities
 * @property {{ readonly name: string, readonly version: string | null, readonly reported: string | null }} sdk
 */
/**
 * @typedef {object} ProbeRecord
 * @property {string} schema
 * @property {string} bead
 * @property {string} requirement
 * @property {string} gate
 * @property {string} utc
 * @property {{ readonly script: string, readonly scriptSha256: string, readonly judge: string, readonly judgeSha256: string }} probe
 * @property {Producer} producer
 * @property {Task & { readonly digest: string }} task
 * @property {readonly Observation[]} observations
 * @property {string} verdict
 * @property {readonly string[]} capable
 * @property {Readonly<Record<string, readonly string[]>>} reasons
 * @property {Blocker | null} blocker
 */
/**
 * What the probe hands observationOf: the leg, its query, and the SDK's result (outcome 'result') or the ProcessResult a
 * ProcessFailureError carries (outcome 'process-failure', with the SDK's terminal class for its exit).
 * @typedef {object} ObservationInput
 * @property {string} id
 * @property {Query} query
 * @property {'result' | 'process-failure'} outcome
 * @property {Readonly<Record<string, unknown>>} result
 * @property {string | null} [terminal]
 */

/**
 * @param {unknown} value
 * @returns {Readonly<Record<string, unknown>>}
 */
function objectOf(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? /** @type {Readonly<Record<string, unknown>>} */ (value) : {};
}

/**
 * @param {unknown} value
 * @returns {readonly unknown[]}
 */
function arrayOf(value) {
  return Array.isArray(value) ? value : [];
}

/**
 * @param {unknown} value
 * @returns {string | null}
 */
function stringOf(value) {
  return typeof value === 'string' ? value : null;
}

/**
 * Every occurrence of the workspace root replaced by WORKSPACE_TOKEN.
 * @param {string} text
 * @param {string} workspaceRoot
 * @returns {string}
 */
function scrub(text, workspaceRoot) {
  return workspaceRoot === '' ? text : text.split(workspaceRoot).join(WORKSPACE_TOKEN);
}

/**
 * The scope a query over `kind` asks about: an hx.fs kind is a filesystem scope; no kind of this build is a task scope.
 * @param {string} kind
 * @returns {Scope}
 */
export function scopeOfKind(kind) {
  return kind.startsWith('hx.fs/') && kind.length > 'hx.fs/'.length ? 'filesystem' : 'other';
}

/**
 * The task digest: sha256 over the task's canonical JSON (keys in code-point order).
 * @param {Task} task
 * @returns {string}
 */
export function taskDigest(task) {
  const canonical = JSON.stringify({ baseRevision: task.baseRevision, id: task.id, kind: task.kind, root: task.root });
  return `sha256:${createHash('sha256').update(canonical).digest('hex')}`;
}

/**
 * The observation kept of one leg: the terminal response, the coverage and the digest exactly as the SDK reported them,
 * nothing derived but the query's scope, with the workspace root scrubbed from every kept string.
 * @param {ObservationInput} input
 * @param {string} workspaceRoot
 * @returns {Observation}
 */
export function observationOf(input, workspaceRoot) {
  const result = input.result;
  const isResult = input.outcome === 'result';
  const status = isResult ? objectOf(result.status) : {};
  const summary = isResult ? objectOf(result.coverageSummary) : {};
  /** @type {string[]} */
  const coverageScopes = [];
  for (const item of [...arrayOf(summary.incompleteRegions), ...arrayOf(summary.certificates)]) {
    const scope = objectOf(item).scope;
    if (scope === undefined || scope === null) continue;
    const text = scrub(typeof scope === 'string' ? scope : JSON.stringify(scope), workspaceRoot);
    if (!coverageScopes.includes(text)) coverageScopes.push(text);
  }
  const diagnostics = arrayOf(result.diagnostics).map((entry) => {
    const item = objectOf(entry);
    const reason = stringOf(objectOf(item.details).reason);
    return { code: stringOf(item.code) ?? '', severity: stringOf(item.severity), reason: reason === null ? null : scrub(reason, workspaceRoot) };
  });
  const revision = objectOf(isResult ? result.revision : null);
  const requested = stringOf(revision.requested);
  const resolvedCommit = stringOf(revision.resolvedCommit);
  const completeness = summary.completeness;
  return {
    id: input.id,
    query: { ...input.query },
    argv: arrayOf(result.argv).map((token) => scrub(String(token), workspaceRoot)),
    scope: scopeOfKind(input.query.kind),
    outcome: input.outcome,
    exitCode: typeof result.exitCode === 'number' ? result.exitCode : null,
    signal: stringOf(result.signal),
    terminal: isResult ? stringOf(result.terminal) : (input.terminal ?? null),
    statusKind: stringOf(status.kind),
    terminalReached: result.terminalReached === true,
    diagnostics,
    completeness: completeness === 'complete' || completeness === 'incomplete' || completeness === 'unknown' ? completeness : null,
    licensesAbsence: summary.licensesAbsence === true,
    coverageScopes,
    view: isResult ? stringOf(result.view) : null,
    revision: requested !== null && resolvedCommit !== null ? { requested, resolvedCommit } : null,
    queryDigest: isResult ? stringOf(result.queryDigest) : null,
    digestSource: isResult && result.digestSource === 'runtime' ? 'runtime' : 'absent',
    answerCount: typeof summary.answerCount === 'number' ? summary.answerCount : null,
    frames: arrayOf(result.frames).length,
  };
}

/**
 * Every condition of task-scope proof `observation` misses, in REASONS order; empty exactly when it is task-scope proof.
 * @param {Observation} observation
 * @param {string} baseRevision
 * @returns {string[]}
 */
export function reasonsOf(observation, baseRevision) {
  /** @type {string[]} */
  const reasons = [];
  if (observation.outcome !== 'result') reasons.push('process-failed');
  if (observation.exitCode !== 0) reasons.push('exit-nonzero');
  if (observation.terminalReached !== true) reasons.push('terminal-unreached');
  if (observation.completeness !== 'complete') reasons.push('coverage-not-complete');
  if (observation.licensesAbsence !== true) reasons.push('absence-unlicensed');
  if (observation.scope !== 'task') reasons.push('scope-not-task');
  if (observation.revision === null) reasons.push('revision-unbound');
  else if (observation.revision.resolvedCommit !== baseRevision) reasons.push('revision-mismatch');
  if (observation.digestSource !== 'runtime' || typeof observation.queryDigest !== 'string' || observation.queryDigest === '') {
    reasons.push('query-digest-absent');
  }
  return reasons;
}

/**
 * Whether the installed producer supplied task-scope proof for `task`: supported when at least one observation is proof;
 * otherwise unsupported, with the blocker scoped to native-task-scope (witness 'missing' when nothing was observed).
 * @param {Task} task
 * @param {readonly Observation[]} observations
 * @returns {Judgement}
 */
export function judgeTaskScope(task, observations) {
  const judged = observations.map((observation) => /** @type {const} */ ([observation.id, reasonsOf(observation, task.baseRevision)]));
  const reasons = Object.fromEntries(judged);
  const capable = judged.filter(([, missed]) => missed.length === 0).map(([id]) => id);
  if (capable.length > 0) return { verdict: 'task-scope-supported', capable, reasons, blocker: null };
  return {
    verdict: 'task-scope-unsupported',
    capable: [],
    reasons,
    blocker: { gate: GATE, scope: BLOCKER_SCOPE, witness: observations.length === 0 ? 'missing' : 'unsupported', notBlocked: [...NOT_BLOCKED] },
  };
}
