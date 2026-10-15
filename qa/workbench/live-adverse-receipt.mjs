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
 *
 * Every journey carries the model alias the host was asked for
 * (requestedModel) beside the model string the SDK stream natively reported
 * (servedModel, null only when no model-bearing frame arrived), and the
 * receipt states the tier's three disclosed deviations with their measured
 * values instead of leaving them to a side note.
 *
 * J3 ("starts nothing new") is judged by the agent row's runtime start stamp,
 * not by when an init arrived (owner ruling): the runtime stamps startedAt
 * when it issues host.spawnAgent, before the SDK query starts, and the
 * journey starts both agents with parallel(), so both starts are issued
 * before the first init triggers the abort. initAfterAbort counts only inits
 * whose agent's startedAt is at or after requestedAt (a start issued after the
 * abort: a finding). An init that arrives after the request from an agent
 * started before it is the SDK confirming a start requested before the abort:
 * reported as lateInitAfterAbort with its latency after the request and its
 * agent's abort-to-ack, never judged. An after-request init that no runtime
 * start stamp explains is unattributed: counted and flagged, never dropped.
 */

export const ADVERSE_CONTRACT = 'workbench.claude-adverse/v1';

/** Disclosed bounded waits: the runner waits with exactly these and the receipt states them. */
export const ACK_WAIT_BOUND_MS = 20_000;
export const SESSION_LOOKUP_BOUND_MS = 3_000;

/** The runner's imports beyond the bead's allowed set; the guard test enumerates them. */
const RUNNER_EXTRA_IMPORTS = ['./live-adverse-receipt.mjs', 'node:child_process', 'node:fs'];
const JOURNEYS = ['midStreamCancel', 'preStartAbort', 'invalidModel'];
const SERVED_MODEL_SOURCES = new Set(['assistant', 'system/init']);
/** Rules that mean the mid-stream journey itself was never realised. */
const MID_UNREALISED = new Set(['no-session-started', 'no-agent-cancelled']);

/** Sign convention for ackToTerminalMs: negative is a measurement (an ack after the terminal), not an error. */
const ACK_TO_TERMINAL_CONVENTION = 'terminalAt - lastAcknowledgedAt; negative means the last acknowledgement arrived after the terminal';
const CANCEL_ERROR = 'Claude SDK query was cancelled.';
const KILLED_ERROR = 'Workflow aborted.';
const SESSION_ID = /^[a-f0-9-]{36}$/;
/**
 * Backstop for the shared redactor's shapes (src/workbench/redaction.ts): Bearer/Basic
 * values, vendor token prefixes, credential key names and key=value assignments.
 * Redaction itself is the runner's job (buildPreview); this refuses to emit a leak.
 */
const SECRET = /\b(?:Bearer|Basic)\s+\S+|sk-ant-|sk-proj-|ghp_|github_pat_|api[_-]?key|access[_-]?token|refresh[_-]?token|aws_secret_access_key|aws_session_token|(?:password|secret)["']?\s*[=:]/i;
const MAX_STRING = 400;
const CONTROL = /[\u0000-\u001f\u007f-\u009f]/;

/** Rules whose presence means the journey could not be realised, not that the SDK misbehaved. */
const UNREALISED = new Set(['no-session-started', 'no-agent-cancelled', 'invalid-model-accepted', 'gateway-unproven']);

function need(condition, message) {
  if (!condition) throw new TypeError(message);
}

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const isDuration = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const named = (frame) => isObject(frame) && typeof frame.model === 'string' && frame.model.trim() !== '';
/** The runtime's own start stamp (Date.now() when it issued host.spawnAgent, 1 ms resolution); never invented. */
const stamped = (agent) => typeof agent.startedAt === 'number';
/**
 * Started strictly before the abort request, so in flight at the abort. Its
 * exact complement among stamped agents (startedAt >= requestedAt) is a start
 * issued at or after the abort; no agent is ever both.
 */
const startedBeforeAbort = (agent, requestedAt) => stamped(agent) && agent.startedAt < requestedAt;
const emptyLateInits = () => ({ count: 0, agentIds: [], latenciesMs: [], toControllerAbortMs: [], startedBeforeAbortMs: [] });

/**
 * Sort every init by its agent's runtime start stamp against the request.
 * postAbortStart: the agent's startedAt >= requestedAt, whenever its init
 * arrived. late: the agent started before the request and its init arrived
 * after it. unattributed: an after-request init whose agent has no runtime
 * start stamp (no agent row, or a row the runtime never stamped).
 */
function classifyInits(journey, requestedAt) {
  const startOf = new Map();
  for (const agent of journey.agents) if (stamped(agent) && !startOf.has(agent.agentId)) startOf.set(agent.agentId, agent);
  const postAbortStart = [];
  const late = [];
  const unattributed = [];
  for (const message of journey.initMessages) {
    const agent = startOf.get(message.agentId);
    if (agent === undefined) {
      if (message.at > requestedAt) unattributed.push(message);
    } else if (agent.startedAt >= requestedAt) {
      postAbortStart.push(message);
    } else if (message.at > requestedAt) {
      late.push({ message, agent });
    }
  }
  return { postAbortStart, late, unattributed };
}

/**
 * Measurements only, never judged. Per late init, in arrival order: its
 * latency after the request (init at - requestedAt); toControllerAbortMs, its
 * agent's abort-to-ack (the request to that agent's acknowledged controller
 * abort, the onSettled cancellation result), null when no acknowledgement was
 * observed; and startedBeforeAbortMs, how long before the request the runtime
 * stamped that agent's start.
 */
function lateInitBlock(late, requestedAt) {
  return {
    count: late.length,
    agentIds: late.map(({ message }) => message.agentId),
    latenciesMs: late.map(({ message }) => message.at - requestedAt),
    toControllerAbortMs: late.map(({ agent }) => (typeof agent.acknowledgedAt === 'number' ? agent.acknowledgedAt - requestedAt : null)),
    startedBeforeAbortMs: late.map(({ agent }) => requestedAt - agent.startedAt),
  };
}

/**
 * The model one journey's SDK stream natively reported, from the runner's
 * redacted frame records ({ type, subtype?, model?, assistantError? }). A
 * genuine assistant frame's message.model is the gateway's own answer and
 * wins; a journey stopped before any assistant frame (the abort lands on the
 * first system/init) falls back to the system/init model; an assistant frame
 * the SDK flags with an API error is synthetic, never a served model. Null,
 * never invented, when no model-bearing frame arrived (a pre-start abort).
 */
export function servedModelFrom(frames) {
  need(Array.isArray(frames), 'frames must be an array');
  const assistant = frames.find((frame) => named(frame) && frame.type === 'assistant' && frame.assistantError === undefined);
  if (assistant) return { servedModel: assistant.model, servedModelSource: 'assistant' };
  const init = frames.find((frame) => named(frame) && frame.type === 'system' && frame.subtype === 'init');
  if (init) return { servedModel: init.model, servedModelSource: 'system/init' };
  return { servedModel: null, servedModelSource: null };
}

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
      lateInitAfterAbort: emptyLateInits(),
      unattributedInitAfterAbort: 0,
      ackAfterTerminal: 0,
      distinctSessionIds: distinctSessionIds.size,
      agentsWithoutSession: 0,
    };
  }
  const started = journey.agents.filter((agent) => startedBeforeAbort(agent, requestedAt));
  const settledBefore = started.filter((agent) => typeof agent.acknowledgedAt === 'number' && agent.acknowledgedAt < requestedAt);
  const inFlight = started.filter((agent) => !settledBefore.includes(agent));
  const unacknowledged = inFlight.filter((agent) => typeof agent.acknowledgedAt !== 'number');
  const cancelled = inFlight.filter((agent) => agent.result?.ok === false && agent.result.skipped === true);
  const acks = cancelled.map((agent) => agent.acknowledgedAt).filter((at) => typeof at === 'number');
  const inits = classifyInits(journey, requestedAt);
  const measured = {
    requested: true,
    agentsStarted: started.length,
    agentsCancelled: cancelled.length,
    settledBeforeCancel: settledBefore.length,
    unacknowledged: unacknowledged.length,
    initAfterAbort: inits.postAbortStart.length,
    lateInitAfterAbort: lateInitBlock(inits.late, requestedAt),
    unattributedInitAfterAbort: inits.unattributed.length,
    ackAfterTerminal: acks.filter((at) => at > journey.terminalAt).length,
    distinctSessionIds: distinctSessionIds.size,
    agentsWithoutSession: started.filter((agent) => !journey.initMessages.some((message) => message.agentId === agent.agentId)).length,
  };
  if (acks.length > 0) {
    const lastAck = Math.max(...acks);
    measured.requestToAckMs = lastAck - requestedAt;
    measured.ackToTerminalMs = journey.terminalAt - lastAck;
    measured.ackToTerminalConvention = ACK_TO_TERMINAL_CONVENTION;
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
    // J3 by the runtime start stamp: a late init (agent started before the
    // request) is a measurement in measured.lateInitAfterAbort, not a finding.
    if (measured.initAfterAbort > 0) {
      add('init-after-abort', `${measured.initAfterAbort} system/init message(s) came from agent(s) the runtime started at or after the abort request`);
    }
    if (measured.unattributedInitAfterAbort > 0) {
      add('init-after-abort-unattributed', `${measured.unattributedInitAfterAbort} system/init message(s) arrived after the abort request from agent(s) with no runtime start stamp`);
    }

    const started = mid.agents.filter((agent) => startedBeforeAbort(agent, requestedAt));
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

const BACKSLASH_U = String.fromCharCode(92) + 'u';
const hex4 = (code) => BACKSLASH_U + code.toString(16).padStart(4, '0');
const classOf = (ranges) => new RegExp(`[${ranges.map(([from, to]) => `${hex4(from)}-${hex4(to)}`).join('')}]`, 'g');
const ESC_CHAR = String.fromCharCode(0x1b);
const BEL_CHAR = String.fromCharCode(0x07);
/** Terminated ANSI CSI and OSC sequences, removed whole so a credential they split reassembles before redaction. */
const TERMINAL_SEQUENCES = new RegExp(
  `${ESC_CHAR}${/\[[0-?]*[ -/]*[@-~]/.source}|${ESC_CHAR}${/\]/.source}[^${BEL_CHAR}${ESC_CHAR}]*(?:${BEL_CHAR}|${ESC_CHAR}${/\\/.source})`,
  'g',
);
/** Tab, line feed, vertical tab, form feed, carriage return: become one space. */
const WHITESPACE_CONTROLS = classOf([[0x09, 0x0d]]);
/** Other C0/C1 controls, soft hyphen, combining grapheme joiner, Arabic letter mark, zero-width, bidi, word-joiner, invisible operators, BOM: deleted. */
const INVISIBLES = classOf([[0x00, 0x08], [0x0e, 0x1f], [0x7f, 0x9f], [0xad, 0xad], [0x34f, 0x34f], [0x61c, 0x61c], [0x180e, 0x180e], [0x200b, 0x200f], [0x202a, 0x202e], [0x2060, 0x206f], [0xfeff, 0xfeff]]);

/**
 * The runner's preview(), as a pure function over injected sanitizers (this
 * module imports nothing): normalize -> redact -> strip, once each (wb-952
 * shape, owner ruling F1). Normalizing first makes a credential that a control
 * byte split contiguous BEFORE the redactor sees it; the old strip(redact(x))
 * order let the strip reassemble it afterwards. `redact(text, max)` and
 * `strip(text)` are the shared redactWorkbenchText and stripUnsafeText.
 */
export function buildPreview(value, max, { redact, strip }) {
  const normalized = String(value ?? '').replace(TERMINAL_SEQUENCES, '').replace(WHITESPACE_CONTROLS, ' ').replace(INVISIBLES, '');
  const text = strip(redact(normalized, max))
    .replace(/Bearer\s+\S+/gi, '[REDACTED]')
    .replace(/sk-ant-\S*/gi, '[REDACTED]')
    .replace(/api[_-]?key/gi, '[REDACTED-NAME]');
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** requestedModel is the alias the host was given; servedModel is present, either the native string or an explicit null. */
function requireModelEvidence(journey, name) {
  need(typeof journey.requestedModel === 'string' && journey.requestedModel.trim() !== '', `observed.${name}.requestedModel must be a non-empty string`);
  need(Object.hasOwn(journey, 'servedModel'), `observed.${name}.servedModel must be present: the native model string, or null when no model-bearing frame arrived`);
  if (journey.servedModel === null) {
    need(journey.servedModelSource === null, `observed.${name}.servedModelSource must be null when servedModel is null`);
    return;
  }
  need(typeof journey.servedModel === 'string' && journey.servedModel.trim() !== '', `observed.${name}.servedModel must be a non-empty string or null`);
  need(SERVED_MODEL_SOURCES.has(journey.servedModelSource), `observed.${name}.servedModelSource must be "assistant" or "system/init" when servedModel is set`);
}

/** The bounded waits are evidence only when they were measured. */
function requireWaitMeasurements(mid) {
  need(isDuration(mid.ackWaitMs), 'observed.midStreamCancel.ackWaitMs must be the measured, finite, non-negative ack wait');
  mid.nativeSessions.forEach((session, index) => {
    need(isObject(session), `observed.midStreamCancel.nativeSessions[${index}] must be an object`);
    need(Number.isInteger(session.lookupAttempts) && session.lookupAttempts >= 1, `observed.midStreamCancel.nativeSessions[${index}].lookupAttempts must be a positive integer`);
    need(isDuration(session.lookupMs), `observed.midStreamCancel.nativeSessions[${index}].lookupMs must be the measured, finite, non-negative lookup time`);
  });
}

const modelEvidence = (journey) => ({ requestedModel: journey.requestedModel, servedModel: journey.servedModel, servedModelSource: journey.servedModelSource });

/** The three disclosed deviations, each stated beside the values this run measured. */
function disclosedDeviations(mid, measured) {
  return [
    { id: 'agents-without-session', statement: 'agentsWithoutSession is a measured count, never a pass', agentsWithoutSession: measured.agentsWithoutSession },
    {
      id: 'bounded-waits',
      statement: `the ${ACK_WAIT_BOUND_MS / 1000} s ack wait after terminal and the ${SESSION_LOOKUP_BOUND_MS / 1000} s native-session-lookup retry are bounded waits reported with their measured values`,
      ackWaitBoundMs: ACK_WAIT_BOUND_MS,
      ackWaitMs: mid.ackWaitMs,
      sessionLookupBoundMs: SESSION_LOOKUP_BOUND_MS,
      sessionLookupMs: mid.nativeSessions.map((session) => session.lookupMs),
      sessionLookupAttempts: mid.nativeSessions.map((session) => session.lookupAttempts),
    },
    { id: 'runner-extra-imports', statement: `the runner's extra imports (${RUNNER_EXTRA_IMPORTS.join(', ')}) are enumerated by the guard test`, imports: [...RUNNER_EXTRA_IMPORTS] },
  ];
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
 * mistyped field (including absent model evidence, unmeasured waits, and a
 * realised mid-stream journey whose served model is null) and Error for any
 * credential-shaped, escape-bearing or over-long string; the receipt must
 * never carry a secret or a payload.
 */
export function buildAdverseReceipt(input) {
  need(isObject(input), 'receipt input must be an object');
  for (const key of REQUIRED_TEXT) {
    need(typeof input[key] === 'string' && input[key].trim() !== '', `receipt input ${key} must be a non-empty string`);
  }
  need(Array.isArray(input.sdkEventTypes) && input.sdkEventTypes.every((type) => typeof type === 'string'), 'receipt input sdkEventTypes must be an array of strings');
  requireObserved(input.journeys);
  for (const name of JOURNEYS) requireModelEvidence(input.journeys[name], name);
  requireWaitMeasurements(input.journeys.midStreamCancel);
  const journeys = structuredClone(input.journeys);
  const { findings, realised } = assessAdverseJourneys(journeys);
  const midRealised = !findings.some((finding) => MID_UNREALISED.has(finding.rule));
  need(!(midRealised && journeys.midStreamCancel.servedModel === null), 'a realised midStreamCancel journey must carry the servedModel the SDK reported natively; a silent null is refused');
  const midMeasured = measureMidStream(journeys.midStreamCancel);
  journeys.midStreamCancel.measured = { ...midMeasured, ...modelEvidence(journeys.midStreamCancel) };
  journeys.preStartAbort.measured = modelEvidence(journeys.preStartAbort);
  journeys.invalidModel.measured = modelEvidence(journeys.invalidModel);
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
    deviations: disclosedDeviations(journeys.midStreamCancel, midMeasured),
    realised,
    pass: realised && findings.length === 0,
  };
  scanStrings(receipt, 'receipt');
  return deepFreeze(receipt);
}
