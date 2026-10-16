/**
 * One-turn served-model journey for the Claude SDK workflow host (wb-a2g.6).
 *
 * Measurement only. Real SDK, real host, real workflow runtime from dist/; no
 * mock, no query override, no Pi manager. ONE bounded, cheap, tool-free turn
 * runs to completion against the deployed gateway; the receipt asserts the
 * genuine assistant message.model beside the requested alias.
 *
 * Exit: 0 realised, no findings; 1 realised with findings; 2 not realised
 * (gateway or credentials unavailable at run time) with the redacted SDK error.
 * An unavailable gateway is exit 2, never a skip and never a fake pass.
 *
 * Usage: node qa/workbench/live-served-model.mjs [cwd]   (CLAUDE_SERVED_MODEL_RECEIPT=path writes the receipt)
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { createClaudeWorkflowHost } from '../../dist/workbench/claude-host.js';
import { sanitizeWorkbenchText } from '../../dist/workbench/redaction.js';
import { runWorkflow } from '../../dist/workflow/runtime.js';
import { buildPreview, buildServedModelReceipt, SERVED_MODEL_CONTRACT, servedModelExitCode } from './live-served-model-receipt.mjs';

const cwd = process.argv[2] ?? process.cwd();
/** Haiku-class alias: one cheap turn only (release terms on the bead). */
const MODEL = process.env.CLAUDE_SERVED_MODEL ?? 'claude-haiku-4-5';
const RUN_CEILING_MS = 90_000;
const MODEL_PREVIEW = 200;
const now = () => performance.timeOrigin + performance.now();

/** Every capture goes through the shared helper's named "label" layout (buildPreview); nothing is composed here. */
const preview = (value, max = 300) => buildPreview(sanitizeWorkbenchText, value, max);

/** The model string a frame natively carries: the system/init `model`, an assistant frame's `message.model`. */
function nativeModel(message) {
  if (message.type === 'system' && message.subtype === 'init') return typeof message.model === 'string' ? message.model : undefined;
  if (message.type === 'assistant') return typeof message.message?.model === 'string' ? message.message.model : undefined;
  return undefined;
}

const messages = [];
const settled = [];
const host = createClaudeWorkflowHost({
  cwd,
  model: MODEL,
  tools: [],
  settingSources: [],
  permissionMode: 'dontAsk',
  // Ids, types, timestamps and the redacted native model string only; bodies and prompts are never kept.
  onMessage(message) {
    const model = nativeModel(message);
    messages.push({
      type: String(message.type),
      subtype: typeof message.subtype === 'string' ? message.subtype : undefined,
      sessionId: typeof message.session_id === 'string' ? message.session_id : undefined,
      at: now(),
      ...(model !== undefined ? { model: preview(model, MODEL_PREVIEW) } : {}),
      // The SDK flags a synthetic API-error frame; it is never a served model.
      ...(message.type === 'assistant' && typeof message.error === 'string' ? { assistantError: preview(message.error, 60) } : {}),
    });
  },
  onSettled(result) {
    settled.push({ ok: result.ok === true, ...(typeof result.error === 'string' ? { error: preview(result.error) } : {}) });
  },
});

const SCRIPT = `export const meta={name:"served-model-one-turn",description:"One bounded tool-free turn"};
const result=await agent("Reply with the single word OK. Do not use any tools.");
if(result===null) throw new Error("agent returned null");
return result;`;

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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RUN_CEILING_MS);
  let outcome;
  try {
    outcome = await runWorkflow({ script: SCRIPT, host, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
  const receipt = buildServedModelReceipt({
    utc: new Date().toISOString(),
    revision: revision(),
    node: process.version,
    arch: process.arch,
    platform: process.platform,
    sdkVersion: sdkVersion(),
    requestedModel: preview(MODEL, MODEL_PREVIEW),
    turn: {
      outcome: {
        status: outcome.status,
        ...(typeof outcome.error === 'string' ? { error: preview(outcome.error, 300) } : {}),
        hasValue: outcome.value !== undefined && outcome.value !== null,
      },
      messages,
      settled,
    },
  });
  const line = JSON.stringify(receipt);
  if (process.env.CLAUDE_SERVED_MODEL_RECEIPT) writeFileSync(process.env.CLAUDE_SERVED_MODEL_RECEIPT, `${line}\n`);
  const code = servedModelExitCode(receipt);
  if (code !== 0) process.stderr.write(`live-served-model: ${code === 2 ? 'not realised' : 'measured violation(s)'}: ${receipt.findings.map((item) => `${item.rule}: ${item.detail}`).join('; ')}\n`);
  finish(code, line);
} catch (error) {
  process.stderr.write(`live-served-model: harness failure: ${preview(error instanceof Error ? error.message : error, 400)}\n`);
  finish(2, JSON.stringify({ contract: SERVED_MODEL_CONTRACT, realised: false, pass: false, harnessFailure: preview(error instanceof Error ? error.message : error, 400) }));
}
