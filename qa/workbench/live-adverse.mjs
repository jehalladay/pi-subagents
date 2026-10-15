/**
 * Live adverse-journey acceptance for the Claude SDK workflow host (wb-a2g.1).
 *
 * Measurement only. Real SDK, real host, real workflow runtime from dist/; no
 * mock, no query override, no Pi manager. Three journeys, one fresh host and
 * one fresh abort controller each (abort ids are per run, never reused):
 *   midStreamCancel  abort on the first system/init carrying a session id
 *   preStartAbort    abort before runWorkflow is called
 *   invalidModel     an unknown model id at the gateway
 *
 * Exit: 0 realised, no findings; 1 realised with findings (a measured
 * violation, recorded as found); 2 not realised (gateway unavailable, nothing
 * in flight to cancel, or the model was accepted) with a diagnostic naming the
 * journey. An unavailable gateway is exit 2 with the redacted SDK error, never
 * a skip and never a substitute.
 *
 * Each journey records requestedModel (the alias given to the host) and
 * servedModel (the model string the SDK stream natively reported: a genuine
 * assistant message.model, else the system/init model, else null), both
 * redacted at capture. The ack wait after terminal and the native-session
 * lookup retry are bounded by the receipt's disclosed constants and measured.
 *
 * Usage: node qa/workbench/live-adverse.mjs [cwd]   (CLAUDE_ADVERSE_RECEIPT=path writes the receipt)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { getSessionInfo } from '@anthropic-ai/claude-agent-sdk';
import { createClaudeWorkflowHost } from '../../dist/workbench/claude-host.js';
import { redactWorkbenchText, stripUnsafeText } from '../../dist/workbench/redaction.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';
import { ACK_WAIT_BOUND_MS, buildAdverseReceipt, SESSION_LOOKUP_BOUND_MS, servedModelFrom } from './live-adverse-receipt.mjs';

const cwd = process.argv[2] ?? process.cwd();
const MODEL = process.env.CLAUDE_ADVERSE_MODEL ?? 'claude-opus-5-5';
const INVALID_MODEL = process.env.CLAUDE_ADVERSE_INVALID_MODEL ?? 'claude-adverse-not-a-model-000';
const INIT_WATCHDOG_MS = 90_000;
const RUN_CEILING_MS = 120_000;
const LOOKUP_INTERVAL_MS = 500;
/** Native model ids (including long inference-profile ids) fit untruncated, well inside the receipt's 400-character bound. */
const MODEL_PREVIEW = 200;

/** Sub-millisecond wall clock on one monotonic timeline, comparable with progress `startedAt`. */
const now = () => performance.timeOrigin + performance.now();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Redact, strip control bytes, drop credential-looking key names, bound length. */
function preview(value, max = 300) {
  const text = stripUnsafeText(redactWorkbenchText(String(value ?? ''), max))
    .replace(/Bearer\s+\S+/gi, '[REDACTED]')
    .replace(/sk-ant-\S*/gi, '[REDACTED]')
    .replace(/api[_-]?key/gi, '[REDACTED-NAME]');
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

const summariseResult = (result) => ({
  ok: result.ok === true,
  ...(result.skipped === true ? { skipped: true } : {}),
  ...(typeof result.error === 'string' ? { error: preview(result.error) } : {}),
  ...(typeof result.sessionId === 'string' ? { sessionId: preview(result.sessionId, 80) } : {}),
});

const summariseOutcome = (outcome) => ({
  status: outcome.status,
  ...(typeof outcome.error === 'string' ? { error: preview(outcome.error, 400) } : {}),
  hasValue: outcome.value !== undefined && outcome.value !== null,
});

/** The model string a frame natively carries: the system/init `model`, an assistant frame's `message.model`. */
function nativeModel(message) {
  if (message.type === 'system' && message.subtype === 'init') return typeof message.model === 'string' ? message.model : undefined;
  if (message.type === 'assistant') return typeof message.message?.model === 'string' ? message.message.model : undefined;
  return undefined;
}

/** Records ids, types, timestamps and the redacted native model string only. Message bodies and prompts are never kept. */
function recorder(onInit) {
  const messages = [];
  const settled = [];
  return {
    messages,
    settled,
    onMessage(message, call) {
      const at = now();
      const model = nativeModel(message);
      messages.push({
        type: String(message.type),
        subtype: typeof message.subtype === 'string' ? message.subtype : undefined,
        sessionId: typeof message.session_id === 'string' ? message.session_id : undefined,
        agentId: call.agentId,
        at,
        ...(model !== undefined ? { model: preview(model, MODEL_PREVIEW) } : {}),
        // The SDK flags a synthetic API-error frame; it is never a served model.
        ...(message.type === 'assistant' && typeof message.error === 'string' ? { assistantError: preview(message.error, 60) } : {}),
      });
      if (message.type === 'system' && message.subtype === 'init' && message.session_id) onInit?.(call.agentId, message.session_id);
    },
    onSettled(result, call) {
      settled.push({ agentId: call.agentId, at: now(), result: summariseResult(result) });
    },
  };
}

const hostFor = (model, rec) => createClaudeWorkflowHost({
  cwd,
  model,
  tools: [],
  settingSources: [],
  permissionMode: 'dontAsk',
  onMessage: rec.onMessage,
  onSettled: rec.onSettled,
});

/** Race a run against a ceiling so a wedged gateway cannot hang the tier; the abort is the clean stop. */
async function runBounded(promise, controller) {
  const timer = setTimeout(() => controller.abort(), RUN_CEILING_MS);
  try {
    return await promise;
  } finally {
    clearTimeout(timer);
  }
}

const LONG_A = 'Write an extensive, flowing essay of about 600 words on the history of lighthouses. Do not use any tools. Do not stop early.';
const LONG_B = 'Write an extensive, flowing essay of about 600 words on how tidal harbours are engineered. Do not use any tools. Do not stop early.';
const FANOUT = `export const meta={name:"adverse-mid-stream",description:"Two long agents cancelled after the session id"};
await parallel([()=>agent(${JSON.stringify(LONG_A)}),()=>agent(${JSON.stringify(LONG_B)})]);
return "unreachable-if-cancelled";`;
const SINGLE = (name) => `export const meta={name:${JSON.stringify(name)},description:"Single agent adverse journey"};
const result=await agent("Reply with the single word OK. Do not use any tools.");
if(result===null) throw new Error("agent returned null");
return result;`;

/**
 * getSessionInfo for one observed session. The native record is written by
 * the SDK process, possibly after the abort, so a miss is retried every
 * LOOKUP_INTERVAL_MS within the disclosed SESSION_LOOKUP_BOUND_MS; attempts
 * and elapsed time are measured so a late write is not read as an absent record.
 */
async function lookupNativeSession(sessionId) {
  const startedAt = now();
  const deadline = startedAt + SESSION_LOOKUP_BOUND_MS;
  let attempts = 0;
  let record;
  let lookupError;
  do {
    if (attempts > 0) await sleep(LOOKUP_INTERVAL_MS);
    attempts++;
    try {
      const info = await getSessionInfo(sessionId, { dir: cwd });
      if (info) record = info.sessionId;
    } catch (error) {
      lookupError = preview(error instanceof Error ? error.message : error);
    }
  } while (record === undefined && now() + LOOKUP_INTERVAL_MS <= deadline);
  return {
    sessionId,
    ...(record !== undefined ? { recordSessionId: record } : {}),
    ...(record === undefined && lookupError ? { lookupError } : {}),
    lookupAttempts: attempts,
    lookupMs: now() - startedAt,
  };
}

async function midStreamCancel() {
  const controller = new AbortController();
  let requestedAt;
  const rec = recorder(() => {
    if (requestedAt !== undefined) return;
    requestedAt = now();
    controller.abort();
  });
  const watchdog = setTimeout(() => controller.abort(), INIT_WATCHDOG_MS);
  const host = hostFor(MODEL, rec);
  const outcome = await runBounded(runWorkflow({ script: FANOUT, host, concurrency: 2, signal: controller.signal }), controller);
  const terminalAt = now();
  clearTimeout(watchdog);
  // A kill can resolve the run before the host delivers the cancellation
  // result. Wait, bounded by the disclosed ACK_WAIT_BOUND_MS, for
  // acknowledgements so that ordering is measured, not lost: acknowledgedAt is
  // stamped on delivery and may follow terminalAt, and the wait is measured.
  const drainStartedAt = now();
  const drainDeadline = drainStartedAt + ACK_WAIT_BOUND_MS;
  const owed = () => outcome.progress.some((entry) => entry.type === 'workflow_agent' && typeof entry.agentId === 'string' && entry.startedAt !== undefined && !rec.settled.some((item) => item.agentId === entry.agentId));
  while (owed() && now() < drainDeadline) await sleep(50);
  const ackWaitMs = now() - drainStartedAt;
  const entries = new Map();
  for (const entry of outcome.progress) if (entry.type === 'workflow_agent' && typeof entry.agentId === 'string') entries.set(entry.index, entry);
  const agents = [...entries.values()].map((entry) => {
    const ack = rec.settled.find((item) => item.agentId === entry.agentId);
    const firstMessage = rec.messages.find((message) => message.agentId === entry.agentId);
    const startedAt = entry.startedAt ?? firstMessage?.at;
    return {
      agentId: entry.agentId,
      ...(startedAt !== undefined ? { startedAt } : {}),
      ...(ack ? { acknowledgedAt: ack.at, result: ack.result } : {}),
    };
  });
  const initMessages = rec.messages
    .filter((message) => message.type === 'system' && message.subtype === 'init' && message.sessionId)
    .map((message) => ({ agentId: message.agentId, sessionId: message.sessionId, at: message.at }));
  const nativeSessions = [];
  for (const sessionId of new Set(initMessages.map((message) => message.sessionId))) nativeSessions.push(await lookupNativeSession(sessionId));
  return {
    observed: {
      requestedModel: preview(MODEL, MODEL_PREVIEW),
      ...servedModelFrom(rec.messages),
      ...(requestedAt !== undefined ? { requestedAt } : {}),
      terminalAt,
      ackWaitMs,
      outcome: summariseOutcome(outcome),
      agents,
      initMessages,
      nativeSessions,
      ...(requestedAt === undefined ? { settledResults: rec.settled.map((item) => ({ agentId: item.agentId, ...item.result })) } : {}),
    },
    messages: rec.messages,
  };
}

async function preStartAbort() {
  const controller = new AbortController();
  const rec = recorder();
  const host = hostFor(MODEL, rec);
  const requestedAt = now();
  controller.abort();
  const outcome = await runWorkflow({ script: SINGLE('adverse-pre-start'), host, signal: controller.signal });
  return {
    observed: {
      requestedModel: preview(MODEL, MODEL_PREVIEW),
      ...servedModelFrom(rec.messages),
      requestedAt,
      terminalAt: now(),
      outcome: summariseOutcome(outcome),
      sdkMessages: rec.messages.length,
      sessionIds: [...new Set(rec.messages.map((message) => message.sessionId).filter(Boolean))],
    },
    messages: rec.messages,
  };
}

async function invalidModel() {
  const controller = new AbortController();
  const rec = recorder();
  const host = hostFor(INVALID_MODEL, rec);
  const outcome = await runBounded(runWorkflow({ script: SINGLE('adverse-invalid-model'), host, signal: controller.signal }), controller);
  return {
    observed: {
      requestedModel: preview(INVALID_MODEL, MODEL_PREVIEW),
      ...servedModelFrom(rec.messages),
      model: preview(INVALID_MODEL, 120),
      outcome: summariseOutcome(outcome),
      settled: rec.settled.map((item) => item.result),
      sdkMessages: rec.messages.length,
      sessionIds: [...new Set(rec.messages.map((message) => message.sessionId).filter(Boolean))],
    },
    messages: rec.messages,
  };
}

function revision() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: new URL('../..', import.meta.url), encoding: 'utf8' }).trim() || 'working-tree';
  } catch {
    return 'working-tree';
  }
}

function sdkVersion() {
  return JSON.parse(readFileSync(new URL('../../node_modules/@anthropic-ai/claude-agent-sdk/package.json', import.meta.url), 'utf8')).version;
}

function finish(code, line) {
  process.stdout.write(`${line}\n`, () => process.exit(code));
}

try {
  // Sequential on purpose: each journey owns its own host, controller and ids.
  const mid = await midStreamCancel();
  const pre = await preStartAbort();
  const invalid = await invalidModel();
  const types = new Set();
  for (const message of [...mid.messages, ...pre.messages, ...invalid.messages]) types.add(message.subtype ? `${message.type}/${message.subtype}` : message.type);
  const receipt = buildAdverseReceipt({
    utc: new Date().toISOString(),
    revision: revision(),
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    sdkVersion: sdkVersion(),
    model: MODEL,
    sdkEventTypes: [...types].sort(),
    journeys: { midStreamCancel: mid.observed, preStartAbort: pre.observed, invalidModel: invalid.observed },
  });
  const line = JSON.stringify(receipt);
  if (process.env.CLAUDE_ADVERSE_RECEIPT) writeFileSync(process.env.CLAUDE_ADVERSE_RECEIPT, `${line}\n`);
  if (!receipt.realised) {
    const causes = receipt.findings.map((finding) => `${finding.rule}: ${finding.detail}`).join('; ');
    process.stderr.write(`live-adverse: not realised: ${causes}\n`);
    finish(2, line);
  } else if (receipt.findings.length > 0) {
    process.stderr.write(`live-adverse: measured violation(s): ${receipt.findings.map((finding) => finding.rule).join(', ')}\n`);
    finish(1, line);
  } else {
    finish(0, line);
  }
} catch (error) {
  process.stderr.write(`live-adverse: harness failure: ${preview(error instanceof Error ? error.message : error, 400)}\n`);
  finish(2, JSON.stringify({ contract: 'workbench.claude-adverse/v1', realised: false, pass: false, harnessFailure: preview(error instanceof Error ? error.message : error, 400) }));
}
