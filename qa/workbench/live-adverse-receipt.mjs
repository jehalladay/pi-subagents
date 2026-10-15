/**
 * Pure verdict + receipt builder for the live adverse-journey tier (wb-a2g.1).
 *
 * No imports, no I/O, no clock: the runner (live-adverse.mjs) gathers what the
 * real SDK did; this module only decides what that means and refuses to emit a
 * receipt that could carry a credential. Redaction is the runner's job; the
 * builder is the backstop that throws instead of printing a leak.
 *
 * Three phases are never conflated: cancellation requested (the abort call),
 * acknowledged (a cancelled agent's onSettled result) and terminal (the
 * workflow run resolved). An acknowledgement after the terminal is recorded as
 * a measurement, not asserted away, because a kill can be reported without
 * child acknowledgement.
 */

export const ADVERSE_CONTRACT = 'workbench.claude-adverse/v1';

const CANCEL_ERROR = 'Claude SDK query was cancelled.';
const KILLED_ERROR = 'Workflow aborted.';
const SESSION_ID = /^[a-f0-9-]{36}$/;
const SECRET = /Bearer\s+\S+|sk-ant-|api[_-]?key/i;
const MAX_STRING = 400;
const CONTROL = /[\u0000-\u001f\u007f-\u009f]/;

/** Rules whose presence means the journey could not be realised, not that the SDK misbehaved. */
const UNREALISED = new Set(['no-session-started', 'no-agent-cancelled', 'invalid-model-accepted', 'gateway-unproven']);

function need(condition, message) {
  if (!condition) throw new TypeError(message);
}

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

function requireObserved(observed) {
  need(isObject(observed), 'observed must be an object');
  const { midStreamCancel, preStartAbort, invalidModel } = observed;
  need(isObject(midStreamCancel), 'observed.midStreamCancel must be an object');
  need(Array.isArray(midStreamCancel.agents), 'observed.midStreamCancel.agents must be an array');
  need(Array.isArray(midStreamCancel.initMessages), 'observed.midStreamCancel.initMessages must be an array');
  need(Array.isArray(midStreamCancel.nativeSessions), 'observed.midStreamCancel.nativeSessions must be an array');
  need(isObject(midStreamCancel.outcome), 'observed.midStreamCancel.outcome must be an object');
  need(typeof midStreamCancel.terminalAt === 'number', 'observed.midStreamCancel.terminalAt must be a number');
  need(isObject(preStartAbort), 'observed.preStartAbort must be an object');
  need(isObject(preStartAbort.outcome), 'observed.preStartAbort.outcome must be an object');
  need(Array.isArray(preStartAbort.sessionIds), 'observed.preStartAbort.sessionIds must be an array');
  need(isObject(invalidModel), 'observed.invalidModel must be an object');
  need(isObject(invalidModel.outcome), 'observed.invalidModel.outcome must be an object');
  need(Array.isArray(invalidModel.settled), 'observed.invalidModel.settled must be an array');
  need(Array.isArray(invalidModel.sessionIds), 'observed.invalidModel.sessionIds must be an array');
}

/**
 * Derived counts and phase durations for the mid-stream journey. A phase that
 * was not observed is omitted, never zero-filled.
 */
export function measureMidStream(journey) {
  const requestedAt = journey.requestedAt;
  const distinctSessionIds = new Set(journey.initMessages.map((message) => message.sessionId));
  if (typeof requestedAt !== 'number') {
    return {
      requested: false,
      agentsStarted: 0,
      agentsCancelled: 0,
      settledBeforeCancel: 0,
      unacknowledged: 0,
      initAfterAbort: 0,
      ackAfterTerminal: 0,
      distinctSessionIds: distinctSessionIds.size,
      agentsWithoutSession: 0,
    };
  }
  const started = journey.agents.filter((agent) => typeof agent.startedAt === 'number' && agent.startedAt <= Math.floor(requestedAt));
  const settledBefore = started.filter((agent) => typeof agent.acknowledgedAt === 'number' && agent.acknowledgedAt < requestedAt);
  const inFlight = started.filter((agent) => !settledBefore.includes(agent));
  const unacknowledged = inFlight.filter((agent) => typeof agent.acknowledgedAt !== 'number');
  const cancelled = inFlight.filter((agent) => agent.result?.ok === false && agent.result.skipped === true);
  const acks = cancelled.map((agent) => agent.acknowledgedAt).filter((at) => typeof at === 'number');
  const measured = {
    requested: true,
    agentsStarted: started.length,
    agentsCancelled: cancelled.length,
    settledBeforeCancel: settledBefore.length,
    unacknowledged: unacknowledged.length,
    initAfterAbort: journey.initMessages.filter((message) => message.at > requestedAt).length,
    ackAfterTerminal: acks.filter((at) => at > journey.terminalAt).length,
    distinctSessionIds: distinctSessionIds.size,
    agentsWithoutSession: started.filter((agent) => !journey.initMessages.some((message) => message.agentId === agent.agentId)).length,
  };
  if (acks.length > 0) {
    const lastAck = Math.max(...acks);
    measured.requestToAckMs = lastAck - requestedAt;
    measured.ackToTerminalMs = journey.terminalAt - lastAck;
  }
  return measured;
}

/**
 * Decide what the observed journeys mean.
 * `realised` is false when a journey could not be exercised (gateway
 * unavailable, nothing was in flight to cancel, the model was accepted);
 * `findings` lists every rule that fired, violations and unrealised causes alike.
 */
export function assessAdverseJourneys(observed) {
  requireObserved(observed);
  const findings = [];
  const add = (rule, detail) => findings.push({ rule, detail });
  const { midStreamCancel: mid, preStartAbort: pre, invalidModel: invalid } = observed;

  // J1 / mid-stream cancel after the native session ID is first received.
  const measured = measureMidStream(mid);
  if (mid.initMessages.length === 0) {
    add('no-session-started', 'no SDK system/init message with a session id was observed; the gateway was unreachable, unauthenticated or too slow');
  } else if (!measured.requested) {
    add('no-session-started', 'an SDK session started but the abort was never requested');
  } else {
    const requestedAt = mid.requestedAt;
    if (mid.outcome.status !== 'killed' || mid.outcome.error !== KILLED_ERROR) {
      add('not-killed', `outcome was status=${String(mid.outcome.status)} error=${JSON.stringify(mid.outcome.error ?? null)}; expected killed with "${KILLED_ERROR}"`);
    }
    if (mid.outcome.hasValue) add('value-after-cancel', 'the cancelled run still returned a value');
    if (mid.terminalAt < requestedAt) add('terminal-before-request', `terminalAt ${mid.terminalAt} precedes requestedAt ${requestedAt}`);
    if (measured.initAfterAbort > 0) add('init-after-abort', `${measured.initAfterAbort} system/init message(s) arrived after the abort was requested`);

    const started = mid.agents.filter((agent) => typeof agent.startedAt === 'number' && agent.startedAt <= Math.floor(requestedAt));
    const inFlight = started.filter((agent) => !(typeof agent.acknowledgedAt === 'number' && agent.acknowledgedAt < requestedAt));
    for (const agent of inFlight) {
      if (typeof agent.acknowledgedAt !== 'number' || !agent.result) {
        add('unacknowledged-agent', `${agent.agentId} was in flight at the abort and onSettled never delivered a result`);
        continue;
      }
      if (agent.result.ok === true) {
        add('completed-after-cancel', `${agent.agentId} settled ok:true after the abort was requested`);
        continue;
      }
      if (agent.result.skipped !== true || agent.result.error !== CANCEL_ERROR) {
        add('cancel-result-shape', `${agent.agentId} settled as ${JSON.stringify({ ok: agent.result.ok, skipped: agent.result.skipped ?? null, error: agent.result.error ?? null })}; expected ok:false skipped:true "${CANCEL_ERROR}"`);
        continue;
      }
      const reported = mid.initMessages.filter((message) => message.agentId === agent.agentId).map((message) => message.sessionId);
      if (reported.length > 0 && !reported.includes(agent.result.sessionId)) {
        add('cancel-session-id', `${agent.agentId} reported session ${reported[0]} but its cancelled result carried ${agent.result.sessionId ?? 'none'}`);
      }
    }
    if (measured.agentsCancelled < 1) {
      add('no-agent-cancelled', `no agent was cancelled mid-flight (${measured.settledBeforeCancel} settled before the abort, ${measured.unacknowledged} unacknowledged)`);
    }
    // Cancellation must stay scoped to owned sessions: more sessions than
    // agents started, or a settled result naming a session no init reported,
    // means a session nobody owned. An agent aborted before the SDK gave it a
    // session id is the fault location under test, not a leak; it is counted
    // in measured.agentsWithoutSession and reported, not failed.
    const reportedIds = new Set(mid.initMessages.map((message) => message.sessionId));
    const unreported = started.filter((agent) => typeof agent.result?.sessionId === 'string' && !reportedIds.has(agent.result.sessionId));
    if (measured.distinctSessionIds > measured.agentsStarted || unreported.length > 0) {
      add('session-count-mismatch', `${measured.distinctSessionIds} distinct session id(s) observed for ${measured.agentsStarted} agent(s) started before the abort; ${unreported.length} settled result(s) named a session no init reported`);
    }
  }
  for (const message of mid.initMessages) {
    if (typeof message.sessionId !== 'string' || !SESSION_ID.test(message.sessionId)) {
      add('invalid-session-id', `observed session id does not match ${SESSION_ID}`);
    }
  }
  for (const sessionId of new Set(mid.initMessages.map((message) => message.sessionId))) {
    const record = mid.nativeSessions.find((session) => session.sessionId === sessionId);
    if (!record || record.recordSessionId !== sessionId) {
      add('native-session-missing', `getSessionInfo did not return a native record for observed session ${String(sessionId)}`);
    }
  }

  // J4 / pre-start abort creates no native work.
  if (pre.outcome.status !== 'killed') add('not-killed-pre-start', `pre-start abort produced status=${String(pre.outcome.status)}; expected killed`);
  if (pre.sdkMessages > 0 || pre.sessionIds.length > 0) {
    add('work-before-start', `pre-start abort still produced ${pre.sdkMessages} SDK message(s) and ${pre.sessionIds.length} session id(s)`);
  }

  // J5 / invalid model fails explicitly. Without a proven reachable gateway an
  // auth failure would masquerade as a model rejection, so it is unrealised.
  if (mid.initMessages.length === 0) {
    add('gateway-unproven', 'the invalid-model journey cannot be told apart from an unauthenticated gateway without a reachable-session baseline');
  }
  if (invalid.outcome.status === 'completed') {
    add('invalid-model-accepted', 'the gateway accepted the invalid model and the run completed');
  }
  if (invalid.settled.some((result) => result.ok === true)) {
    add('invalid-model-settled-ok', 'an agent on the invalid model settled ok:true');
  }
  if (invalid.outcome.status !== 'completed') {
    const error = invalid.outcome.error;
    if (typeof error !== 'string' || error.trim() === '' || error.length > MAX_STRING || CONTROL.test(error)) {
      add('invalid-model-error', 'outcome.error must be a non-empty string of at most 400 characters without control characters');
    }
  }

  return { findings, realised: !findings.some((finding) => UNREALISED.has(finding.rule)) };
}

function deepFreeze(value) {
  if (typeof value === 'object' && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function scanStrings(value, path) {
  if (typeof value === 'string') {
    if (SECRET.test(value)) throw new Error(`receipt refused: credential-shaped content at ${path}`);
    if (value.includes('\u001b')) throw new Error(`receipt refused: escape byte at ${path}`);
    if (value.length > MAX_STRING) throw new Error(`receipt refused: string length ${value.length} at ${path} exceeds the bounded ${MAX_STRING}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanStrings(item, `${path}[${index}]`));
    return;
  }
  if (isObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      scanStrings(key, `${path}.<key>`);
      scanStrings(child, `${path}.${key}`);
    }
  }
}

const REQUIRED_TEXT = ['utc', 'revision', 'node', 'arch', 'platform', 'sdkVersion', 'model'];

/**
 * Assemble the frozen evidence receipt. Throws TypeError for a missing or
 * mistyped field and Error for any credential-shaped, escape-bearing or
 * over-long string; the receipt must never carry a secret or a payload.
 */
export function buildAdverseReceipt(input) {
  need(isObject(input), 'receipt input must be an object');
  for (const key of REQUIRED_TEXT) {
    need(typeof input[key] === 'string' && input[key].trim() !== '', `receipt input ${key} must be a non-empty string`);
  }
  need(Array.isArray(input.sdkEventTypes) && input.sdkEventTypes.every((type) => typeof type === 'string'), 'receipt input sdkEventTypes must be an array of strings');
  requireObserved(input.journeys);
  const journeys = structuredClone(input.journeys);
  const { findings, realised } = assessAdverseJourneys(journeys);
  journeys.midStreamCancel.measured = measureMidStream(journeys.midStreamCancel);
  const receipt = {
    contract: ADVERSE_CONTRACT,
    utc: input.utc,
    revision: input.revision,
    node: input.node,
    arch: input.arch,
    platform: input.platform,
    sdkVersion: input.sdkVersion,
    model: input.model,
    journeys,
    sdkEventTypes: [...input.sdkEventTypes],
    findings,
    realised,
    pass: realised && findings.length === 0,
  };
  scanStrings(receipt, 'receipt');
  return deepFreeze(receipt);
}
