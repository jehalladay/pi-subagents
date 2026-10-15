// wb-752.3 (VC-4 residual): live external Furnace Run observation acceptance receipt.
// Pure assessor and receipt builder. This module imports nothing and does no I/O or clock reads: the live runner
// (qa/workbench/live-furnace-vc4.mjs) gathers the evidence from the compiled observer against a real external Run
// and the offline test hands this module hand-built evidence, and either way only the evidence is judged.
//
// Criteria judged (docs/workbench 09 "Freshness and ambiguity" and "Acceptance/negative controls", 15 VC-4):
//   C1 attach by Run ID to an independently created Run, no parent invocation, no assumed ownership;
//   C2 disconnect -> last-known-running + stale; reconnect alone stays stale; only a read-current snapshot clears it;
//   C3 closing the observer issues zero control calls and the Run continues unchanged aside from its own progress;
//   C4 edges and intervals are observed, never invented; retention gaps are stated, never filled.
// Exit codes (exitCodeFor): 0 realised with no findings; 1 realised with findings (recorded honestly, never tuned
// away); 2 not realised, with a diagnostic naming the unrealised step (never a skip, never a fixture substitute).

export const RECEIPT_CONTRACT = 'workbench.furnace-vc4/v1';
/** The four freshness transitions the runner records, in the order they must occur. */
export const PHASES = Object.freeze(['attached', 'disconnected', 'reconnected', 'reconciled']);
/** Measured violations, in the order assessLive reports them (exit 1). */
export const FINDING_RULES = Object.freeze([
  'attach-not-external',
  'parent-invocation-present',
  'transition-order',
  'disconnect-not-stale',
  'last-known-running-lost',
  'reconnect-upgraded-freshness',
  'reconcile-not-current',
  'control-call-on-close',
  'run-changed-on-close',
  'invented-edge',
  'invented-node',
  'invented-interval',
  'gap-unstated',
]);
/** Steps that did not run to the claimed measurement (exit 2). */
export const UNREALISED_STEPS = Object.freeze([
  'furnace-unavailable',
  'run-not-acquired',
  'transition-missing',
  'run-not-running-before-disconnect',
  'measurement-error',
]);
/** The only native reads the observer is allowed to speak. Anything else is control-capable. */
export const READ_ONLY_VERBS = Object.freeze(['run status', 'attempt list', 'logs']);
export const READ_ONLY_METHODS = Object.freeze(['runs.status', 'attempts.list', 'logs.read']);

const GLOBAL_VALUE_FLAGS = new Set(['-C', '--directory', '--state-dir', '--config', '--request-id']);
const TWO_WORD_COMMANDS = new Set(['run', 'attempt', 'work', 'config', 'executor', 'skill']);
const HALTED_RUN_STATES = new Set(['stopped', 'paused']);
const CREDENTIAL = /\bbearer\s+[A-Za-z0-9._~+/=-]{6,}|"authorization"\s*:|\bauthorization\s*[:=]\s*\S/i;

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
const instantOf = (value) => (typeof value === 'string' && /(?:Z|[+-]\d\d:\d\d)$/.test(value) ? Date.parse(value) : Number.NaN);
const finding = (rule, detail) => ({ rule, detail });
const unrealised = (step, diagnostic) => ({ step, diagnostic });

function controlCallsOf(close) {
  const verbs = arrayOf(close?.argv)
    .map((argv) => verbOf(arrayOf(argv)))
    .filter((verb) => !READ_ONLY_VERBS.includes(verb));
  const methods = arrayOf(close?.observerCalls).filter((method) => !READ_ONLY_METHODS.includes(method));
  return { verbs, methods, count: verbs.length + methods.length };
}

function assessAttach(evidence, findings) {
  const attach = evidence.attach ?? {};
  if (attach.ownership !== 'external' || attach.attachedBy !== 'run-id') {
    findings.push(finding('attach-not-external', `attached by ${String(attach.attachedBy)} with ownership ${String(attach.ownership)}`));
  }
  const selfOwned = attach.controllerPid !== null && attach.controllerPid !== undefined && attach.controllerPid === attach.runnerPid;
  if ((attach.parentInvocationId ?? null) !== null || selfOwned) {
    findings.push(finding('parent-invocation-present', selfOwned ? 'the observer process is the Run controller' : `parent invocation ${String(attach.parentInvocationId)}`));
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
  if (evidence?.environment?.furnaceAvailable !== true) {
    return stop('furnace-unavailable', `no usable furnace binary: ${String(evidence?.environment?.diagnostic ?? 'not probed')}`);
  }
  if (evidence.acquisition?.error || !evidence.acquisition?.runId) {
    return stop('run-not-acquired', String(evidence.acquisition?.error ?? 'no Run ID was started or supplied'));
  }
  if (evidence.measurementError) return stop('measurement-error', String(evidence.measurementError));
  const transitions = arrayOf(evidence.transitions);
  const missing = PHASES.filter((phase) => !transitions.some((entry) => entry.phase === phase));
  if (missing.length > 0) return stop('transition-missing', `no recorded transition for: ${missing.join(', ')}`);
  const attached = transitions.find((entry) => entry.phase === 'attached');
  if (attached.attemptState !== 'running' || ['completed', 'stopped', 'failed'].includes(attached.runState)) {
    return stop('run-not-running-before-disconnect', `at attach the Run was ${attached.runState} with attempt ${attached.attemptState}; the disconnect could not be exercised against a running node`);
  }
  const findings = [];
  assessAttach(evidence, findings);
  assessTransitions(transitions, findings);
  assessClose(evidence.close, findings);
  assessTopology(evidence.topology, findings);
  findings.sort((left, right) => FINDING_RULES.indexOf(left.rule) - FINDING_RULES.indexOf(right.rule));
  return { findings, unrealised: [], controlCallsObserved };
}

/** Build the evidence-grade receipt. Refuses (throws, without echoing the value) any input carrying a credential. */
export function buildReceipt(input) {
  if (CREDENTIAL.test(JSON.stringify(input))) throw new Error('receipt input carries an Authorization credential; refusing to record it');
  const evidence = input.evidence ?? {};
  const assessment = assessLive(evidence);
  const topology = evidence.topology ?? {};
  const realised = assessment.unrealised.length === 0;
  return {
    contract: RECEIPT_CONTRACT,
    utc: input.utc,
    revision: input.revision,
    command: input.command,
    node: input.node,
    arch: input.arch,
    platform: input.platform,
    toolchain: input.toolchain,
    environment: evidence.environment ?? {},
    acquisition: evidence.acquisition ?? {},
    attach: evidence.attach ?? {},
    run: { runId: evidence.acquisition?.runId ?? null, attemptIds: arrayOf(topology.nativeAttemptIds) },
    transitions: arrayOf(evidence.transitions),
    close: {
      controlCallsObserved: assessment.controlCallsObserved,
      observerCalls: arrayOf(evidence.close?.observerCalls),
      verbs: arrayOf(evidence.close?.argv).map((argv) => verbOf(arrayOf(argv))),
      runBefore: evidence.close?.runBefore ?? null,
      runAfter: evidence.close?.runAfter ?? null,
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
