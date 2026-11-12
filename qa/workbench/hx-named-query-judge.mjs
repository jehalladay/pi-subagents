/**
 * hx-named-query-judge.mjs - wb-pxvv (MWI B-hx-admit, slice PI-5), EAT-R163 of the 2026-11-06 delta: "Before
 * `hx-task-scope-v1` is described as unsupported version-wide at hx 0.1.0, the HX admission bead MUST probe a
 * workspace-defined named query carrying a task scope against the same installed binary and record exit code, verb, roster
 * and verdict in a dated receipt". The pure half of the named-query route probe: the legs it runs, the observation it keeps of
 * each `hx run` answer, the judgement over them, the record validator and the scope gate a record opens or keeps closed. No
 * I/O, clock or random source: qa/workbench/hx-named-query-probe.mjs hands it what the installed hx returned through
 * @hyperunix/sdk, and test/workbench-hx-admit-census.test.ts hands it planted records.
 *
 * The conditions are the landed wb-f3wd ones, unchanged: judgeNamedQueryRoute is judgeTaskScope of
 * qa/workbench/hx-task-scope-judge.mjs (reasonsOf's nine conditions), so the find verb and the named-query route are judged
 * alike and only the route differs. A named query's scope comes from its kind as the find verb's does; its query digest is the
 * runtime's semantic digest of the captured definition the run executed; its revision is bound only when the answer's own
 * view names a pinned Git object.
 *
 * recordFindings refuses a record that is not this route's own witness: another schema or route, an unpinned binary, a
 * missing definition, another leg set, a find-verb leg recited as a named-query leg (its id, its operation or its argv), a
 * leg that is not `hx run` of the definition, a leg whose query digest is not the definition's, and a verdict, reason or
 * blocker that does not follow from the record's own observations. gateOfRecord reads the named-query route only - never a
 * find-verb section - and a record with any finding opens nothing (witness missing).
 */
import { judgeTaskScope, LEGS as FIND_LEGS, scopeOfKind, WORKSPACE_TOKEN } from './hx-task-scope-judge.mjs';

/** @typedef {'supported' | 'unsupported' | 'missing'} GateWitness */
/** @typedef {import('./hx-task-scope-judge.mjs').Observation} Observation */
/** @typedef {import('./hx-task-scope-judge.mjs').Task} Task */

export const NAMED_QUERY_SCHEMA = 'workbench.hx-named-query-probe/v1';
export const PROBE_SCRIPT = 'qa/workbench/hx-named-query-probe.mjs';
export const JUDGE_SCRIPT = 'qa/workbench/hx-named-query-judge.mjs';
export const PROBE_RECORD = 'qa/workbench/receipts/wb-pxvv-hx-named-query-probe.json';
/** The route this record witnesses. */
export const ROUTE = 'named-query';
/** The verb a named-query leg runs. */
export const VERB = 'run';
/** The workspace-defined named query the probe saves and runs. */
export const QUERY_NAME = 'hx-admit-task-scope';
/** What the captured definition file reads in a kept argv: the SDK's private carrier path is never recorded. */
export const DEFINITION_TOKEN = '<captured-definition>';
/** The legs, in order: strict coverage (the rig's policy) and --best-effort (Pi's hyperunix.find policy). */
export const LEGS = Object.freeze([
  Object.freeze({ id: 'named-query-strict', bestEffort: false }),
  Object.freeze({ id: 'named-query-best-effort', bestEffort: true }),
]);
/** Every finding recordFindings can report, in report order. */
export const FINDINGS = Object.freeze([
  'record-not-object',
  'schema-other',
  'route-other',
  'binary-unpinned',
  'definition-missing',
  'leg-set-other',
  'find-leg-recited',
  'verb-not-run',
  'digest-not-definition',
  'verdict-not-judged',
]);

const SEMANTIC_DIGEST = /^sha256\/hxq-normalized-v1:[0-9a-f]{64}$/;
const BINARY_SHA256 = /^[0-9a-f]{64}$/;
const PINNED_VIEW = /^git:([0-9a-f]{40})$/;

/**
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function objectOf(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) ? /** @type {Record<string, unknown>} */ (value) : {};
}
/**
 * @param {unknown} value
 * @returns {unknown[]}
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
 * @param {string} text
 * @param {string} workspaceRoot
 * @returns {string}
 */
function scrub(text, workspaceRoot) {
  return workspaceRoot === '' ? text : text.split(workspaceRoot).join(WORKSPACE_TOKEN);
}

/**
 * The runtime's semantic digest as one string (scheme:value), or null when it is not stated in that form.
 * @param {unknown} value
 * @returns {string | null}
 */
export function digestText(value) {
  const digest = objectOf(value);
  const text = typeof digest.scheme === 'string' && typeof digest.value === 'string' ? `${digest.scheme}:${digest.value}` : null;
  return text !== null && SEMANTIC_DIGEST.test(text) ? text : null;
}

/**
 * The observation kept of one `hx run` leg, in the landed wb-f3wd Observation shape: what the SDK's NamedQueryResult states,
 * nothing derived but the query's scope (from its kind) and a revision only when the answer's view names a pinned Git object,
 * with the workspace root scrubbed from every kept string and the captured definition path replaced by DEFINITION_TOKEN.
 * @param {{ id: string, query: { operation: string, name: string, kind: string, root: string, view: string | null, bestEffort: boolean }, result: Record<string, unknown>, terminal: string | null }} input
 * @param {string} workspaceRoot
 * @returns {Observation}
 */
export function observationOfRun(input, workspaceRoot) {
  const result = input.result;
  const refused = result.refusal !== null && result.refusal !== undefined;
  const coverage = objectOf(objectOf(arrayOf(result.coverage)[0]).body);
  /** @type {string[]} */
  const coverageScopes = [];
  for (const item of [...arrayOf(coverage.incomplete_regions), ...arrayOf(coverage.certificates)]) {
    let entry = item;
    if (typeof entry === 'string') {
      try {
        entry = JSON.parse(entry);
      } catch {
        entry = null;
      }
    }
    const scope = objectOf(entry).scope;
    if (scope === undefined || scope === null) continue;
    const text = scrub(typeof scope === 'string' ? scope : JSON.stringify(scope), workspaceRoot);
    if (!coverageScopes.includes(text)) coverageScopes.push(text);
  }
  const argv = arrayOf(result.argv).map((token) => String(token));
  const carrier = argv.indexOf('--query');
  const keptArgv = argv.map((token, index) => (carrier >= 0 && index === carrier + 1 ? DEFINITION_TOKEN : scrub(token, workspaceRoot)));
  const diagnostics = arrayOf(result.diagnostics).map((entry) => {
    const item = objectOf(entry);
    const reason = stringOf(objectOf(item.details).reason);
    return { code: stringOf(item.code) ?? '', severity: stringOf(item.severity), reason: reason === null ? null : scrub(reason, workspaceRoot) };
  });
  const asked = input.query;
  const view = stringOf(result.view);
  const pinned = view === null ? null : PINNED_VIEW.exec(view);
  const completeness = coverage.completeness;
  const queryDigest = refused ? null : digestText(objectOf(result.query).digest);
  return {
    id: input.id,
    query: { ...asked },
    argv: keptArgv,
    scope: scopeOfKind(asked.kind),
    outcome: refused || typeof result.exitCode !== 'number' ? 'process-failure' : 'result',
    exitCode: typeof result.exitCode === 'number' ? result.exitCode : null,
    signal: stringOf(result.signal),
    terminal: input.terminal,
    statusKind: null,
    terminalReached: result.terminalReached === true,
    diagnostics,
    completeness: completeness === 'complete' || completeness === 'incomplete' || completeness === 'unknown' ? completeness : null,
    licensesAbsence: coverage.licenses_absence === true,
    coverageScopes,
    view,
    revision: pinned === null ? null : { requested: asked.view ?? view ?? '', resolvedCommit: pinned[1] ?? '' },
    queryDigest,
    digestSource: queryDigest === null ? 'absent' : 'runtime',
    answerCount: refused ? null : arrayOf(result.rows).length,
    frames: arrayOf(result.frames).length,
  };
}

/**
 * The named-query route's verdict: exactly the landed wb-f3wd judgeTaskScope over these observations.
 * @param {Task} task
 * @param {readonly Observation[]} observations
 */
export function judgeNamedQueryRoute(task, observations) {
  return judgeTaskScope(task, observations);
}

/**
 * Every reason `record` is not this route's own witness, in FINDINGS order; empty exactly when it is one.
 * @param {unknown} record
 * @returns {string[]}
 */
export function recordFindings(record) {
  if (record === null || typeof record !== 'object' || Array.isArray(record)) return ['record-not-object'];
  const source = objectOf(record);
  /** @type {string[]} */
  const findings = [];
  if (source.schema !== NAMED_QUERY_SCHEMA) findings.push('schema-other');
  if (source.route !== ROUTE) findings.push('route-other');
  const binary = objectOf(source.producer).binarySha256;
  if (typeof binary !== 'string' || !BINARY_SHA256.test(binary)) findings.push('binary-unpinned');
  const definition = objectOf(source.definition);
  const semanticDigest = typeof definition.semanticDigest === 'string' && SEMANTIC_DIGEST.test(definition.semanticDigest) ? definition.semanticDigest : null;
  if (definition.name !== QUERY_NAME || definition.verb !== VERB || semanticDigest === null) findings.push('definition-missing');
  const observations = arrayOf(source.observations).map(objectOf);
  if (JSON.stringify(observations.map((observation) => observation.id)) !== JSON.stringify(LEGS.map((leg) => leg.id))) findings.push('leg-set-other');
  const findIds = FIND_LEGS.map((leg) => leg.id);
  const argvOf = (/** @type {Record<string, unknown>} */ observation) => arrayOf(observation.argv);
  if (observations.some((observation) => findIds.includes(String(observation.id)) || objectOf(observation.query).operation === 'find' || argvOf(observation).includes('find'))) {
    findings.push('find-leg-recited');
  }
  if (observations.some((observation) => objectOf(observation.query).operation !== VERB || !argvOf(observation).includes(VERB) || !argvOf(observation).includes(QUERY_NAME))) {
    findings.push('verb-not-run');
  }
  if (observations.some((observation) => observation.digestSource !== 'runtime' || semanticDigest === null || observation.queryDigest !== semanticDigest)) {
    findings.push('digest-not-definition');
  }
  const task = /** @type {Task} */ (/** @type {unknown} */ (objectOf(source.task)));
  const judged = judgeNamedQueryRoute(task, /** @type {Observation[]} */ (/** @type {unknown} */ (observations)));
  const stated = { verdict: source.verdict, capable: source.capable, reasons: source.reasons, blocker: source.blocker };
  if (JSON.stringify(stated) !== JSON.stringify(judged)) findings.push('verdict-not-judged');
  return findings;
}

/**
 * The scope gate a record opens or keeps closed, read from the named-query route alone: supported only for a record without
 * findings whose verdict is task-scope-supported, unsupported for one whose verdict is task-scope-unsupported, and missing
 * for any record with a finding. A find-verb section is never read.
 * @param {unknown} record
 * @returns {{ route: string, witness: GateWitness }}
 */
export function gateOfRecord(record) {
  if (recordFindings(record).length > 0) return { route: ROUTE, witness: 'missing' };
  return { route: ROUTE, witness: objectOf(record).verdict === 'task-scope-supported' ? 'supported' : 'unsupported' };
}
