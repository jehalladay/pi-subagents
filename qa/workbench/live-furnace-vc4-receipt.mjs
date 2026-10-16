// wb-752.3 (VC-4 residual): live external Furnace Run observation acceptance receipt.
// Pure assessor and receipt builder. This module imports nothing and does no I/O or clock reads: the tier launcher
// (qa/workbench/live-furnace-vc4-launch.mjs) starts a real Run beforehand, the live runner
// (qa/workbench/live-furnace-vc4.mjs) gathers the evidence from the compiled provider and observer while attached to
// it, and the offline test hands this module hand-built evidence; either way only the evidence is judged.
//
// Criteria judged (docs/workbench 09 "Freshness and ambiguity" and "Acceptance/negative controls", 15 VC-4), with the
// six external-Run rules of BOUNDARY.md "wb-752.3 GATE SUBSTANCE CHECK" (rule N below):
//   C1 attach by Run ID to an independently created Run, no parent invocation, no assumed ownership: the Run lives in
//      a disposable /tmp/pi-external-furnace-realbd.* workspace with its own bd store, made by the tier launcher's
//      own request before the attach, never by the runner (rule 1);
//   C2 disconnect -> last-known-running + stale; reconnect alone stays stale; only a read-current snapshot clears it;
//   C3 closing the observer issues zero control calls and the Run continues unchanged aside from its own progress; the
//      attach is read-only through nativeFurnaceRunInspect with .beads and .furnace hashed before the attach and after
//      the close and equal (rule 2); only read verbs are ever spoken, no probe (rules 3 and 4);
//   C4 edges and intervals are observed, never invented; retention gaps are stated, never filled;
//   C5 an absent fixture identity is not realised (rule 5); the binary identity is the inspect envelope's (rule 6).
// Exit codes (exitCodeFor): 0 realised with no findings; 1 realised with findings (recorded honestly, never tuned
// away); 2 not realised, with a diagnostic naming the unrealised step (never a skip, never a fixture substitute).

export const RECEIPT_CONTRACT = 'workbench.furnace-vc4/v1';
/** The record the tier launcher writes beside (never inside) the two stores, naming the Run it started. */
export const LAUNCHER_CONTRACT = 'workbench.furnace-vc4-fixture/v1';
export const LAUNCHER_RECORD = 'launcher/fixture.json';
/** The only fixture identity the runner reads (rule 5). The old self-chosen FURNACE_RUN_ID/FURNACE_WORKSPACE are not. */
export const FIXTURE_ENV = Object.freeze({ root: 'PI_FURNACE_FIXTURE_ROOT', runId: 'PI_FURNACE_FIXTURE_RUN_ID' });
/** The launcher makes its workspace with mkdtemp on exactly this prefix; the runner attaches to nothing else (rule 1). */
export const FIXTURE_ROOT_PREFIX = '/tmp/pi-external-furnace-realbd.';
export const FIXTURE_ROOT_PATTERN = /^\/tmp\/pi-external-furnace-realbd\.[^/]+$/;
/** The native Run identity shape the furnace_observe tool accepts; also keeps the Run record path inside the root. */
export const RUN_ID_PATTERN = /^frn-run-[A-Za-z0-9_-]{1,100}$/;
/** The stores the attach must leave byte-identical (rule 2), relative to the fixture root. */
export const HASHED_STORES = Object.freeze(['.beads', '.furnace']);
/** The binary identity is copied from nativeFurnaceRunInspect's version block, never parsed from text (rule 6). */
export const BINARY_IDENTITY_SOURCE = 'furnace.run.inspect/v1#version';
const INSPECT_CONTRACT = 'furnace.run.inspect/v1';
/** The four freshness transitions the runner records, in the order they must occur. */
export const PHASES = Object.freeze(['attached', 'disconnected', 'reconnected', 'reconciled']);
/** Measured violations, in the order assessLive reports them (exit 1). */
export const FINDING_RULES = Object.freeze([
  'attach-not-external',
  'attach-not-inspected',
  'parent-invocation-present',
  'transition-order',
  'disconnect-not-stale',
  'last-known-running-lost',
  'reconnect-upgraded-freshness',
  'reconcile-not-current',
  'control-call-on-close',
  'run-changed-on-close',
  'store-changed-by-attach',
  'invented-edge',
  'invented-node',
  'invented-interval',
  'gap-unstated',
]);
/** Steps that did not run to the claimed measurement (exit 2), in the order assessLive checks them. */
export const UNREALISED_STEPS = Object.freeze([
  'fixture-identity-absent',
  'fixture-root-refused',
  'furnace-unavailable',
  'run-not-acquired',
  'binary-identity-unrecorded',
  'measurement-error',
  'run-not-running-before-disconnect',
  'transition-missing',
  'stores-not-hashed',
  'run-progressed-during-attach',
]);
/** The only native verbs the runner may cause: the inspect attach (version, run inspect) and the observer's reads. */
export const READ_ONLY_VERBS = Object.freeze(['version', 'run inspect', 'run status', 'attempt list', 'logs']);
export const READ_ONLY_METHODS = Object.freeze(['runs.status', 'attempts.list', 'logs.read']);

const GLOBAL_VALUE_FLAGS = new Set(['-C', '--directory', '--state-dir', '--config', '--request-id']);
const TWO_WORD_COMMANDS = new Set(['run', 'attempt', 'work', 'config', 'executor', 'skill']);
const HALTED_RUN_STATES = new Set(['stopped', 'paused']);
const SHA256 = /^[a-f0-9]{64}$/;

// C6 credential refusal (wb-752.3 respin 3: gate-1 07:30Z U1, U2, U4 and U7; owner rulings 07:4xZ). ONE refusal-only
// reading of the raw text: nothing is normalised, deleted or rewritten before it, and nothing it reads is displayed, so
// an over-refusal costs an honest exit 2, never a leak. A separate normalise-then-match reading would be strictly
// contained in this one (each separator run it reads as one space is a run this reading accepts as such), so its line
// could never be falsified; there is none. The vocabulary is the shared redactor's (src/workbench/redaction.ts SCHEMES,
// KEY_PREFIXES, ASSIGNMENT_KEYS and SECRET_FIELD), spelled out here because this module imports nothing.
// Correction of record (respin 3): the respin-2 comment called its enumerated SEPARATOR_RANGES "default-ignorables", but
// that BMP list missed 4117 of the 4174 Default_Ignorable_Code_Point code points (U+FFF0-U+FFF8, U+1BCA0-U+1BCA3,
// U+1D173-U+1D17A, U+E0000-U+E0FFF) and read an escape sequence as ESC followed by visible text. The property is used now.
/** A terminated ANSI CSI or string sequence (OSC, DCS, SOS, PM, APC), read as ONE unit as trunk UNSAFE_UNIT reads it. */
const ESCAPE_SEQUENCE = String.raw`\x1b\[[0-?]*[ -/]*[@-~]|\x1b[\]P^X_][^\x07\x1b]*(?:\x07|\x1b\\)`;
/** Controls, lone surrogates and every default-ignorable code point (the property, astral ones included). */
const INVISIBLE = String.raw`\p{Cc}\p{Cs}\p{Default_Ignorable_Code_Point}`;
/** Every space, line separator and paragraph separator. */
const SPACING = String.raw`\p{Zs}\p{Zl}\p{Zp}`;
/** Glue: what may sit between the letters of a keyword or the characters of a token without splitting it visibly. */
const GLUE = `(?:${ESCAPE_SEQUENCE}|[${INVISIBLE}])*`;
/** One separator unit: the trunk UNSAFE_UNIT set (an escape sequence as one unit) and every spacing code point. */
const SEPARATOR = `(?:${ESCAPE_SEQUENCE}|[${INVISIBLE}${SPACING}])`;
const SCHEMES = Object.freeze(['bearer', 'basic']);
const KEY_PREFIXES = Object.freeze(['sk-ant-', 'sk-proj-', 'ghp_', 'github_pat_']);
/** The shared ASSIGNMENT_KEYS (each [_-]? spelled out) and SECRET_FIELD's authorization: assignment keys and field names. */
const SECRET_NAMES = Object.freeze(['authorization', 'api_key', 'api-key', 'apikey', 'access_token', 'access-token', 'accesstoken', 'refresh_token', 'refresh-token', 'refreshtoken', 'password', 'secret', 'aws_secret_access_key', 'aws_session_token']);
/** The words as alternatives with GLUE between their characters (letters, '-' and '_' only: none is special in a pattern). */
const glued = (words) => words.map((word) => [...word].join(GLUE)).join('|');
/**
 * Three shapes, case-insensitive: a scheme, a separator run and a token of at least six characters, none of them a
 * separator or one of , ; " ' (the scheme not after a letter or digit, unless an escape sequence ends there); a vendor key
 * prefix and one key character; a secret name, an optional quote, separators and an assignment (= or :). The assignment
 * needs no value after it: in the JSON text a value or a closing quote always follows one.
 */
const CREDENTIAL = new RegExp(
  [
    `(?:${ESCAPE_SEQUENCE}|(?<![A-Za-z0-9]))(?:${glued(SCHEMES)})${SEPARATOR}+(?:[^${INVISIBLE}${SPACING},;"']${GLUE}){6,}`,
    `(?:${glued(KEY_PREFIXES)})${GLUE}[A-Za-z0-9_-]`,
    `(?:${glued(SECRET_NAMES)})["']?${SEPARATOR}*[:=]`,
  ].join('|'),
  'iu',
);
/**
 * An object key naming a secret field, whatever its value (the shared SECRET_FIELD reading). Only separators AFTER the
 * name need reading here: in the JSON text a key is followed by its quote and colon, so a name with separators before it
 * already reads as an assignment there.
 */
const SECRET_FIELD = new RegExp(`^(?:${glued(SECRET_NAMES)})${SEPARATOR}*$`, 'iu');

/** Every string in the value as raw text: the values, and the keys (which are also judged as field names). */
function credentialTexts(value, out = { values: [], keys: [] }) {
  if (typeof value === 'string') out.values.push(value);
  else if (Array.isArray(value)) for (const item of value) credentialTexts(item, out);
  else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      out.keys.push(key);
      credentialTexts(item, out);
    }
  }
  return out;
}

/** The JSON text (it alone joins adjacent strings), each value and each key, read raw; then each key as a field name. */
function carriesCredential(input) {
  const { values, keys } = credentialTexts(input);
  return [JSON.stringify(input), ...values, ...keys].some((text) => CREDENTIAL.test(text)) || keys.some((key) => SECRET_FIELD.test(key));
}

/** The Furnace verb of a recorded argv, found after the global flags and their values. */
export function verbOf(argv) {
  const words = [];
  for (let index = 0; index < argv.length; index++) {
    const token = String(argv[index]);
    if (GLOBAL_VALUE_FLAGS.has(token)) {
      index++;
      continue;
    }
    if (token.startsWith('-')) continue;
    words.push(token);
    if (words.length === 1 && !TWO_WORD_COMMANDS.has(token)) break;
    if (words.length === 2) break;
  }
  return words.join(' ');
}

const arrayOf = (value) => (Array.isArray(value) ? value : []);
const textOf = (value) => (typeof value === 'string' ? value.trim() : '');
const instantOf = (value) => (typeof value === 'string' && /(?:Z|[+-]\d\d:\d\d)$/.test(value) ? Date.parse(value) : Number.NaN);
const finding = (rule, detail) => ({ rule, detail });
const unrealised = (step, diagnostic) => ({ step, diagnostic });

/** The fixture identity named by FIXTURE_ENV in an environment-shaped record, and which of the two names are unset. */
export function fixtureIdentityOf(env) {
  const root = textOf(env?.[FIXTURE_ENV.root]);
  const runId = textOf(env?.[FIXTURE_ENV.runId]);
  return { root, runId, missing: [...(root ? [] : [FIXTURE_ENV.root]), ...(runId ? [] : [FIXTURE_ENV.runId])] };
}

/**
 * Why a fixture cannot be attached to, or null. The runner asks before speaking to any furnace (and looks inside a
 * root only once its path qualifies); the assessor asks again, so a runner that skipped the question cannot pass.
 */
export function fixtureRootRefusal(fixture) {
  const realRoot = fixture?.realRoot;
  if (typeof realRoot !== 'string' || realRoot === '') return 'the fixture root does not resolve to an existing directory';
  if (!FIXTURE_ROOT_PATTERN.test(realRoot)) return `root ${realRoot} is not a disposable ${FIXTURE_ROOT_PREFIX}* workspace`;
  const repoRoot = textOf(fixture.repoRoot);
  if (repoRoot && (realRoot === repoRoot || realRoot.startsWith(`${repoRoot}/`) || repoRoot.startsWith(`${realRoot}/`))) {
    return `root ${realRoot} overlaps this repository at ${repoRoot}`;
  }
  if (!RUN_ID_PATTERN.test(String(fixture.runId ?? ''))) return `${String(fixture.runId)} is not a native Furnace Run identity`;
  if (fixture.beadsStore !== true) return `root ${realRoot} has no real bd store at .beads/embeddeddolt`;
  if (fixture.runRecord !== true) return `root ${realRoot} has no Run record at .furnace/runs/${fixture.runId}/run.json`;
  const launcher = fixture.launcher;
  if (!launcher || typeof launcher !== 'object') {
    return `root ${realRoot} has no ${LAUNCHER_RECORD} launcher record; the Run must come from qa/workbench/live-furnace-vc4-launch.mjs`;
  }
  const problems = [];
  if (launcher.contract !== LAUNCHER_CONTRACT) problems.push(`contract ${String(launcher.contract)}`);
  if (launcher.root !== realRoot) problems.push(`root ${String(launcher.root)}`);
  if (launcher.runId !== fixture.runId) problems.push(`Run ${String(launcher.runId)}`);
  if (!textOf(launcher.requestId)) problems.push('no creating request id');
  if (!Number.isInteger(launcher.launcherPid)) problems.push('no launcher pid');
  return problems.length > 0 ? `the ${LAUNCHER_RECORD} launcher record does not name this fixture: ${problems.join(', ')}` : null;
}

/** File-by-file comparison of two {relative path: sha256} maps. */
export function compareStores(before, after) {
  const left = before && typeof before === 'object' ? before : {};
  const right = after && typeof after === 'object' ? after : {};
  const added = Object.keys(right).filter((path) => !Object.hasOwn(left, path)).sort();
  const removed = Object.keys(left).filter((path) => !Object.hasOwn(right, path)).sort();
  const modified = Object.keys(left).filter((path) => Object.hasOwn(right, path) && left[path] !== right[path]).sort();
  return { equal: added.length === 0 && removed.length === 0 && modified.length === 0, added, removed, modified };
}

const describeChange = (change) =>
  [...change.added.map((path) => `added ${path}`), ...change.removed.map((path) => `removed ${path}`), ...change.modified.map((path) => `modified ${path}`)].join(', ');

function binaryProblem(binary) {
  const problems = [];
  if (binary?.source !== BINARY_IDENTITY_SOURCE) problems.push(`source (${String(binary?.source)})`);
  if (typeof binary?.binary_path !== 'string' || !binary.binary_path.startsWith('/')) problems.push('binary_path');
  if (typeof binary?.binary_digest !== 'string' || !SHA256.test(binary.binary_digest)) problems.push('binary_digest');
  if (!textOf(binary?.binary_revision)) problems.push('binary_revision');
  return problems.length > 0 ? `the furnace binary identity is not the inspect envelope's version block: ${problems.join(', ')}` : null;
}

function storesProblem(evidence) {
  const before = evidence.stores?.before;
  const after = evidence.stores?.after;
  if (!before?.files || !after?.files) return 'no .beads/.furnace hashes were recorded before the attach and after the close';
  const covered = (files) => HASHED_STORES.every((store) => Object.keys(files).some((path) => path.startsWith(`${store}/`)));
  if (!covered(before.files) || !covered(after.files)) return `the hashes do not cover both ${HASHED_STORES.join(' and ')}`;
  const clocks = [before.at, evidence.attach?.attachedAt, evidence.close?.closedAt, after.at].map(instantOf);
  const [start, attachedAt, closedAt, end] = clocks;
  if (!clocks.every(Number.isFinite) || start > attachedAt || end < closedAt) {
    return `the hash window ${String(before.at)}..${String(after.at)} does not enclose the attach at ${String(evidence.attach?.attachedAt)} and the close at ${String(evidence.close?.closedAt)}`;
  }
  return null;
}

/** What the Run itself changed between two summaries. Only a field both state is compared: absence is never progress. */
function progressOf(start, end) {
  if (!start || !end) return [];
  const changes = [];
  for (const field of ['state', 'updatedAt', 'controllerSessionId']) {
    if (start[field] !== undefined && end[field] !== undefined && start[field] !== end[field]) changes.push(`${field} ${String(start[field])} -> ${String(end[field])}`);
  }
  const ids = (summary) => (Array.isArray(summary.attemptIds) ? [...summary.attemptIds].sort().join(',') : undefined);
  if (ids(start) !== undefined && ids(end) !== undefined && ids(start) !== ids(end)) changes.push(`attempts ${ids(start)} -> ${ids(end)}`);
  const states = (summary) => (summary.attemptStates && typeof summary.attemptStates === 'object' ? summary.attemptStates : undefined);
  const from = states(start);
  const to = states(end);
  if (from && to) {
    for (const id of Object.keys(from)) if (to[id] !== undefined && to[id] !== from[id]) changes.push(`attempt ${id} ${from[id]} -> ${to[id]}`);
  }
  return changes;
}

function controlCallsOf(close) {
  const verbs = arrayOf(close?.argv)
    .map((argv) => verbOf(arrayOf(argv)))
    .filter((verb) => !READ_ONLY_VERBS.includes(verb));
  const methods = arrayOf(close?.observerCalls).filter((method) => !READ_ONLY_METHODS.includes(method));
  return { verbs, methods, count: verbs.length + methods.length };
}

function assessAttach(evidence, findings) {
  const attach = evidence.attach ?? {};
  const external = [];
  if (attach.ownership !== 'external' || attach.attachedBy !== 'run-id') external.push(`attached by ${String(attach.attachedBy)} with ownership ${String(attach.ownership)}`);
  if (!attach.creatingRequestId || attach.creatingRequestId !== attach.launcherRequestId) {
    external.push(`the Run's creating request ${String(attach.creatingRequestId)} is not the tier launcher's ${String(attach.launcherRequestId)}`);
  }
  const created = instantOf(attach.runCreatedAt);
  const attachedAt = instantOf(attach.attachedAt);
  if (!Number.isFinite(created) || !Number.isFinite(attachedAt) || created >= attachedAt) {
    external.push(`the Run was created at ${String(attach.runCreatedAt)}, not before the attach at ${String(attach.attachedAt)}`);
  }
  if (external.length > 0) findings.push(finding('attach-not-external', external.join('; ')));

  const inspect = evidence.inspect ?? {};
  const root = evidence.fixture?.realRoot;
  const inspected = [];
  if (attach.via !== 'nativeFurnaceRunInspect') inspected.push(`attached via ${String(attach.via)}`);
  if (inspect.contract !== INSPECT_CONTRACT || inspect.kind !== 'run_inspect') inspected.push(`envelope ${String(inspect.contract)} kind ${String(inspect.kind)}`);
  if (inspect.runId !== evidence.acquisition?.runId) inspected.push(`envelope names Run ${String(inspect.runId)}`);
  if (inspect.workspace !== root || inspect.workspaceRoot !== root) inspected.push(`envelope names workspace ${String(inspect.workspace)}`);
  if (inspect.exitCode !== 0) inspected.push(`inspect exit ${String(inspect.exitCode)}`);
  if (inspected.length > 0) findings.push(finding('attach-not-inspected', inspected.join('; ')));

  const selfOwned = [attach.controllerPid, attach.launcherPid].some((pid) => pid !== null && pid !== undefined && pid === attach.runnerPid);
  if ((attach.parentInvocationId ?? null) !== null || selfOwned) {
    findings.push(finding('parent-invocation-present', selfOwned ? 'the runner itself launched or controls the Run' : `parent invocation ${String(attach.parentInvocationId)}`));
  }
}

function assessTransitions(transitions, findings) {
  const phases = transitions.map((entry) => entry.phase);
  const ordered = PHASES.every((phase, index) => phases[index] === phase) && phases.length === PHASES.length;
  const clocks = transitions.map((entry) => instantOf(entry.utc));
  const monotonic = clocks.every((clock, index) => Number.isFinite(clock) && (index === 0 || clock >= clocks[index - 1]));
  if (!ordered || !monotonic) findings.push(finding('transition-order', `phases ${phases.join(' > ')}; clocks ${monotonic ? 'monotonic' : 'not monotonic'}`));
  const at = (phase) => transitions.find((entry) => entry.phase === phase);
  const [attached, disconnected, reconnected, reconciled] = PHASES.map(at);
  const nodesOf = (entry) => [entry.runNodeFreshness, entry.attemptNodeFreshness];
  if (disconnected.freshness !== 'stale' || nodesOf(disconnected).some((freshness) => freshness !== 'stale')) {
    findings.push(finding('disconnect-not-stale', `reading ${disconnected.freshness}; run node ${disconnected.runNodeFreshness}; attempt node ${disconnected.attemptNodeFreshness}`));
  }
  if (disconnected.attemptState !== attached.attemptState || disconnected.runState !== attached.runState || !/running/i.test(String(disconnected.attemptNodeStatusText))) {
    findings.push(finding('last-known-running-lost', `attempt ${attached.attemptState} -> ${disconnected.attemptState} (${String(disconnected.attemptNodeStatusText)}); run ${attached.runState} -> ${disconnected.runState}`));
  }
  if (reconnected.freshness !== 'stale' || nodesOf(reconnected).some((freshness) => freshness === 'current')) {
    findings.push(finding('reconnect-upgraded-freshness', `reading ${reconnected.freshness}; run node ${reconnected.runNodeFreshness}; attempt node ${reconnected.attemptNodeFreshness}`));
  }
  if (reconciled.freshness !== 'current' || nodesOf(reconciled).some((freshness) => freshness !== 'current')) {
    findings.push(finding('reconcile-not-current', `reading ${reconciled.freshness}; run node ${reconciled.runNodeFreshness}; attempt node ${reconciled.attemptNodeFreshness}`));
  }
}

function assessClose(close, findings) {
  const calls = controlCallsOf(close);
  if (calls.count > 0) findings.push(finding('control-call-on-close', `control-capable calls: ${[...calls.verbs, ...calls.methods].join(', ')}`));
  const before = close?.runBefore ?? {};
  const after = close?.runAfter ?? {};
  const problems = [];
  if (HALTED_RUN_STATES.has(after.state) && after.state !== before.state) problems.push(`Run state ${String(before.state)} -> ${String(after.state)}`);
  if (arrayOf(after.cancelledAttemptIds).some((id) => !arrayOf(before.cancelledAttemptIds).includes(id))) problems.push('an Attempt was cancelled');
  if (before.controllerSessionId && after.controllerSessionId && before.controllerSessionId !== after.controllerSessionId) problems.push('the controller session changed');
  if (before.controllerLive === true && after.controllerLive === false && after.state === 'active') problems.push('the controller let go of a Run that still records active');
  if (arrayOf(before.attemptIds).some((id) => !arrayOf(after.attemptIds).includes(id))) problems.push('a recorded Attempt disappeared');
  if (problems.length > 0) findings.push(finding('run-changed-on-close', problems.join('; ')));
}

function assessTopology(topology, findings) {
  const runId = topology?.runId;
  const native = arrayOf(topology?.nativeAttemptIds);
  const confirmations = arrayOf(topology?.confirmations);
  const edgeProblems = [];
  for (const relation of arrayOf(topology?.relations)) {
    if (relation.kind !== 'ownership') edgeProblems.push(`${String(relation.kind)} edge is not native-stated`);
    if (!relation.nativeConfirmationRef || !confirmations.includes(relation.nativeConfirmationRef)) edgeProblems.push(`edge to ${String(relation.to)} lacks a recorded native confirmation`);
    if (relation.from !== runId) edgeProblems.push(`edge owner ${String(relation.from)} is not the observed Run`);
    if (!native.includes(relation.to)) edgeProblems.push(`edge target ${String(relation.to)} was never listed by the producer`);
  }
  if (edgeProblems.length > 0) findings.push(finding('invented-edge', edgeProblems.join('; ')));
  const nodeProblems = arrayOf(topology?.nodes)
    .filter((node) => !(node.type === 'run' && node.id === runId) && !(node.type === 'attempt' && native.includes(node.id)))
    .map((node) => `${String(node.type)} ${String(node.id)}`);
  if (nodeProblems.length > 0) findings.push(finding('invented-node', `nodes with no native source: ${nodeProblems.join(', ')}`));
  const nativeIntervals = arrayOf(topology?.nativeIntervals);
  const intervalProblems = arrayOf(topology?.intervals)
    .filter((interval) => {
      const source = nativeIntervals.find((entry) => entry.attemptId === interval.attemptId);
      return !source || source.startedAt !== interval.startedAt || (source.finishedAt ?? null) !== (interval.endedAt ?? null);
    })
    .map((interval) => interval.attemptId);
  if (intervalProblems.length > 0) findings.push(finding('invented-interval', `intervals not equal to the producer's started/finished: ${intervalProblems.join(', ')}`));
  if (topology?.completeness !== 'complete' && arrayOf(topology?.gaps).length === 0) {
    findings.push(finding('gap-unstated', `completeness ${String(topology?.completeness)} with no stated gap`));
  }
}

/** Judge one evidence record. Unrealised steps pre-empt findings: an unmeasured claim is never graded. */
export function assessLive(evidence) {
  const controlCallsObserved = controlCallsOf(evidence?.close).count;
  const stop = (step, diagnostic) => ({ findings: [], unrealised: [unrealised(step, diagnostic)], controlCallsObserved });
  const fixture = evidence?.fixture ?? {};
  const identity = fixtureIdentityOf({ [FIXTURE_ENV.root]: fixture.root, [FIXTURE_ENV.runId]: fixture.runId });
  if (identity.missing.length > 0) {
    return stop('fixture-identity-absent', `${identity.missing.join(' and ')} not set: start the Run with qa/workbench/live-furnace-vc4-launch.mjs and pass the identity it prints`);
  }
  const refusal = fixtureRootRefusal(fixture);
  if (refusal) return stop('fixture-root-refused', refusal);
  if (evidence.environment?.furnaceAvailable !== true) {
    return stop('furnace-unavailable', `no usable furnace binary: ${String(evidence.environment?.diagnostic ?? 'not looked up')}`);
  }
  if (evidence.acquisition?.error || !evidence.acquisition?.runId) {
    return stop('run-not-acquired', String(evidence.acquisition?.error ?? 'no Run was attached'));
  }
  const binary = binaryProblem(evidence.binary);
  if (binary) return stop('binary-identity-unrecorded', binary);
  if (evidence.measurementError) return stop('measurement-error', String(evidence.measurementError));
  const transitions = arrayOf(evidence.transitions);
  const attached = transitions.find((entry) => entry.phase === 'attached');
  if (attached && (attached.attemptState !== 'running' || ['completed', 'stopped', 'failed'].includes(attached.runState))) {
    return stop('run-not-running-before-disconnect', `at attach the Run was ${attached.runState} with attempt ${attached.attemptState}; the disconnect could not be exercised against a running node`);
  }
  const missing = PHASES.filter((phase) => !transitions.some((entry) => entry.phase === phase));
  if (missing.length > 0) return stop('transition-missing', `no recorded transition for: ${missing.join(', ')}`);
  const storesIssue = storesProblem(evidence);
  if (storesIssue) return stop('stores-not-hashed', storesIssue);
  const findings = [];
  assessAttach(evidence, findings);
  assessTransitions(transitions, findings);
  assessClose(evidence.close, findings);
  assessTopology(evidence.topology, findings);
  const change = compareStores(evidence.stores.before.files, evidence.stores.after.files);
  if (!change.equal) {
    const explained = findings.some((entry) => entry.rule === 'control-call-on-close' || entry.rule === 'run-changed-on-close');
    const progress = progressOf(evidence.attach?.runSummary, evidence.close?.runAfter);
    if (!explained && progress.length > 0) {
      return stop('run-progressed-during-attach', `the Run made its own progress inside the hash window (${progress.join('; ')}), so ${describeChange(change)} cannot be attributed; launch again with a longer hold`);
    }
    findings.push(finding('store-changed-by-attach', `bytes changed between the hash before the attach and the hash after the close: ${describeChange(change)}`));
  }
  findings.sort((left, right) => FINDING_RULES.indexOf(left.rule) - FINDING_RULES.indexOf(right.rule));
  return { findings, unrealised: [], controlCallsObserved };
}

/** Build the evidence-grade receipt. Refuses (throws, without echoing the value) any input carrying a credential. */
export function buildReceipt(input) {
  if (carriesCredential(input)) throw new Error('receipt input carries a credential; refusing to record it');
  if (input.toolchain && typeof input.toolchain === 'object' && Object.hasOwn(input.toolchain, 'furnace')) {
    throw new Error('the furnace binary identity comes from the inspect envelope (evidence.binary), never from the toolchain');
  }
  const evidence = input.evidence ?? {};
  const assessment = assessLive(evidence);
  const topology = evidence.topology ?? {};
  const fixture = evidence.fixture ?? {};
  const stores = evidence.stores ?? {};
  const change = compareStores(stores.before?.files, stores.after?.files);
  const realised = assessment.unrealised.length === 0;
  return {
    contract: RECEIPT_CONTRACT,
    utc: input.utc,
    revision: input.revision,
    dirty: input.dirty ?? null,
    sources: input.sources ?? {},
    command: input.command,
    node: input.node,
    arch: input.arch,
    platform: input.platform,
    toolchain: input.toolchain ?? {},
    fixture: {
      root: fixture.realRoot ?? fixture.root ?? null,
      runId: fixture.runId ?? null,
      pattern: FIXTURE_ROOT_PATTERN.source,
      launcher: fixture.launcher ?? null,
    },
    environment: evidence.environment ?? {},
    acquisition: evidence.acquisition ?? {},
    inspect: evidence.inspect ?? null,
    binary: evidence.binary ?? null,
    attach: evidence.attach ?? {},
    run: { runId: evidence.acquisition?.runId ?? null, attemptIds: arrayOf(topology.nativeAttemptIds) },
    transitions: arrayOf(evidence.transitions),
    close: {
      controlCallsObserved: assessment.controlCallsObserved,
      observerCalls: arrayOf(evidence.close?.observerCalls),
      verbs: arrayOf(evidence.close?.argv).map((argv) => verbOf(arrayOf(argv))),
      closedAt: evidence.close?.closedAt ?? null,
      runBefore: evidence.close?.runBefore ?? null,
      runAfter: evidence.close?.runAfter ?? null,
    },
    stores: {
      hashed: [...HASHED_STORES],
      before: stores.before ?? null,
      after: stores.after ? { at: stores.after.at, digest: stores.after.digest, count: stores.after.count } : null,
      equal: Boolean(stores.before?.files && stores.after?.files) && change.equal,
      changed: { added: change.added, removed: change.removed, modified: change.modified },
    },
    topology: {
      nodes: arrayOf(topology.nodes),
      relations: arrayOf(topology.relations),
      intervals: arrayOf(topology.intervals),
      completeness: topology.completeness ?? 'unknown',
      gaps: arrayOf(topology.gaps),
    },
    findings: assessment.findings,
    unrealised: assessment.unrealised,
    realised,
    pass: realised && assessment.findings.length === 0,
  };
}

/** 0 realised clean; 1 realised with findings; 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length > 0 ? 1 : 0;
}
