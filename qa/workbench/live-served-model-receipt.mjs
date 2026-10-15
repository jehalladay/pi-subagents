/**
 * Pure verdict + receipt builder for the one-turn served-model journey (wb-a2g.6).
 *
 * No imports, no I/O, no clock: the runner (live-served-model.mjs) gathers what
 * the real SDK did in ONE bounded turn; this module only decides what that
 * means and refuses to emit a receipt that could carry a credential.
 * Redaction is the runner's job; the builder is the backstop that throws.
 *
 * The served model is the model string a genuine assistant frame natively
 * carried (message.model). The system/init model is recorded separately as
 * initModel and is never promoted to the served model, and a synthetic
 * API-error assistant frame is never a served model. The alias the host was
 * asked for (requestedModel) sits beside it; whether they are equal is
 * recorded (matchesRequested), never judged, because a gateway may serve a
 * dated or routed id for an alias.
 *
 * Exit: 0 realised, no findings; 1 realised with findings (a measured
 * violation); 2 not realised (the turn did not complete, or the gateway
 * answered only with an error frame) - an honest unavailability, never a pass.
 */

export const SERVED_MODEL_CONTRACT = 'workbench.claude-served-model/v1';

const SECRET = /Bearer\s+\S+|sk-ant-|api[_-]?key/i;
const CONTROL = /[\u0000-\u001f\u007f-\u009f]/;
const MAX_STRING = 400;
/** Rules that mean the journey was not realised rather than that the SDK misbehaved. */
const UNREALISED = new Set(['turn-not-completed', 'gateway-error-frame']);

function need(condition, message) {
  if (!condition) throw new TypeError(message);
}

/** A bounded, printable, credential-free string; anything else is a builder error, not a receipt. */
function clean(value, label) {
  need(typeof value === 'string', `${label} must be a string`);
  need(value.length <= MAX_STRING, `${label} exceeds ${MAX_STRING} characters`);
  need(!CONTROL.test(value), `${label} carries control characters`);
  need(!SECRET.test(value), `${label} carries a credential-looking value`);
  return value;
}

const isErrorFrame = (message) => message.type === 'assistant' && typeof message.assistantError === 'string';

/** The model a genuine (non-error) assistant frame carried, else null; init is never substituted. */
export function servedModelFrom(messages) {
  for (const message of messages) {
    if (message.type === 'assistant' && !isErrorFrame(message) && typeof message.model === 'string' && message.model.length > 0) {
      return { servedModel: message.model, servedModelSource: 'assistant' };
    }
  }
  return { servedModel: null, servedModelSource: null };
}

function initModelFrom(messages) {
  for (const message of messages) {
    if (message.type === 'system' && message.subtype === 'init' && typeof message.model === 'string') return message.model;
  }
  return null;
}

export function buildServedModelReceipt(input) {
  need(input && typeof input === 'object', 'input must be an object');
  const requestedModel = clean(input.requestedModel, 'requestedModel');
  const { turn } = input;
  need(turn && Array.isArray(turn.messages) && Array.isArray(turn.settled) && turn.outcome, 'turn must carry outcome, messages and settled');
  const { servedModel, servedModelSource } = servedModelFrom(turn.messages);
  const initModel = initModelFrom(turn.messages);
  const findings = [];
  const finding = (rule, detail) => findings.push({ rule, detail: clean(detail, `finding ${rule}`) });

  if (turn.outcome.status !== 'completed') {
    const cause = typeof turn.outcome.error === 'string' ? `: ${turn.outcome.error}` : '';
    finding('turn-not-completed', `the single turn ended ${String(turn.outcome.status)}${cause}`);
  } else if (servedModel === null && turn.messages.some(isErrorFrame)) {
    finding('gateway-error-frame', 'the only assistant frames were synthetic API-error frames');
  } else if (servedModel === null) {
    finding('assistant-model-missing', 'the turn completed but no assistant frame carried message.model');
  }
  if (turn.settled.length !== 1) finding('not-one-turn', `${turn.settled.length} agents settled; the journey is exactly one bounded turn`);

  const realised = !findings.some((item) => UNREALISED.has(item.rule));
  const receipt = {
    contract: SERVED_MODEL_CONTRACT,
    utc: clean(input.utc, 'utc'),
    revision: clean(input.revision, 'revision'),
    node: clean(input.node, 'node'),
    arch: clean(input.arch, 'arch'),
    platform: clean(input.platform, 'platform'),
    sdkVersion: clean(input.sdkVersion, 'sdkVersion'),
    realised,
    pass: realised && findings.length === 0,
    requestedModel,
    servedModel: servedModel === null ? null : clean(servedModel, 'servedModel'),
    servedModelSource,
    initModel: initModel === null ? null : clean(initModel, 'initModel'),
    matchesRequested: servedModel !== null && servedModel === requestedModel,
    outcome: { status: clean(String(turn.outcome.status), 'outcome.status'), hasValue: turn.outcome.hasValue === true },
    sdkMessages: turn.messages.length,
    findings,
  };
  return receipt;
}

export function servedModelExitCode(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length > 0 ? 1 : 0;
}
