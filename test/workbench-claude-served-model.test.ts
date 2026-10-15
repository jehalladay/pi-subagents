/**
 * wb-a2g.6 offline falsifiers for the one-turn served-model journey. No network
 * and no SDK: these pin the assessor/builder that turns the frames one bounded
 * turn natively produced into a verdict, and the static shape of the runner that
 * gathers them. Bead spec: "asserts the genuine assistant message.model beside
 * the requested alias (servedModelSource \"assistant\")", "exit 2 honestly if the
 * deployed-gateway credentials or gateway are unavailable, never a fake pass",
 * "every capture sanitized through redaction.ts", "measurement-only".
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  buildServedModelReceipt,
  SERVED_MODEL_CONTRACT,
  servedModelExitCode,
  servedModelFrom,
} from '../qa/workbench/live-served-model-receipt.mjs';

const REQUESTED = 'claude-haiku-4-5';
const SERVED = 'claude-haiku-4-5-20251001';
const SID = '3f2a9c1e-7b64-4d0a-9e1f-0a1b2c3d4e5f';

interface Frame {
  type: string;
  subtype?: string;
  sessionId?: string;
  at: number;
  model?: string;
  assistantError?: string;
}
const init = (model: string = REQUESTED): Frame => ({ type: 'system', subtype: 'init', sessionId: SID, at: 1, model });
const assistant = (model: string = SERVED): Frame => ({ type: 'assistant', sessionId: SID, at: 2, model });
const result = (): Frame => ({ type: 'result', subtype: 'success', sessionId: SID, at: 3 });

function input(overrides: Record<string, unknown> = {}) {
  return {
    utc: '2026-10-15T14:20:00.000Z',
    revision: '401b625',
    node: 'v24.0.0',
    arch: 'x64',
    platform: 'linux',
    sdkVersion: '0.2.0',
    requestedModel: REQUESTED,
    turn: {
      outcome: { status: 'completed', hasValue: true },
      messages: [init(), assistant(), result()],
      settled: [{ ok: true, sessionId: SID }],
    },
    ...overrides,
  };
}

describe('servedModelFrom', () => {
  it('prefers the genuine assistant message.model and names its source', () => {
    expect(servedModelFrom([init(), assistant(), result()])).toEqual({ servedModel: SERVED, servedModelSource: 'assistant' });
  });
  it('never promotes the system/init model to the served model', () => {
    expect(servedModelFrom([init(), result()])).toEqual({ servedModel: null, servedModelSource: null });
  });
  it('ignores a synthetic API-error assistant frame', () => {
    const errored: Frame = { ...assistant('<synthetic>'), assistantError: 'authentication_failed' };
    expect(servedModelFrom([init(), errored])).toEqual({ servedModel: null, servedModelSource: null });
  });
  it('returns null when no frame carries a model', () => {
    expect(servedModelFrom([])).toEqual({ servedModel: null, servedModelSource: null });
  });
});

describe('buildServedModelReceipt', () => {
  it('passes with the assistant model beside the requested alias', () => {
    const receipt = buildServedModelReceipt(input());
    expect(receipt.contract).toBe(SERVED_MODEL_CONTRACT);
    expect(receipt).toMatchObject({
      realised: true,
      pass: true,
      requestedModel: REQUESTED,
      servedModel: SERVED,
      servedModelSource: 'assistant',
      initModel: REQUESTED,
      matchesRequested: false,
      findings: [],
    });
    expect(servedModelExitCode(receipt)).toBe(0);
  });
  it('records matchesRequested true when the served model equals the alias, never judging a mismatch', () => {
    const receipt = buildServedModelReceipt(input({ turn: { outcome: { status: 'completed', hasValue: true }, messages: [init(), assistant(REQUESTED), result()], settled: [{ ok: true, sessionId: SID }] } }));
    expect(receipt.matchesRequested).toBe(true);
    expect(receipt.pass).toBe(true);
  });
  it('is exit 2 unrealised when the turn did not complete (gateway unavailable), never a pass', () => {
    const receipt = buildServedModelReceipt(input({ turn: { outcome: { status: 'failed', error: 'gateway unreachable', hasValue: false }, messages: [], settled: [{ ok: false, error: 'gateway unreachable' }] } }));
    expect(receipt).toMatchObject({ realised: false, pass: false, servedModel: null, servedModelSource: null });
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain('turn-not-completed');
    expect(servedModelExitCode(receipt)).toBe(2);
  });
  it('is exit 1 when the turn completed but no assistant frame named a model, and init is not substituted', () => {
    const receipt = buildServedModelReceipt(input({ turn: { outcome: { status: 'completed', hasValue: true }, messages: [init(), result()], settled: [{ ok: true, sessionId: SID }] } }));
    expect(receipt).toMatchObject({ realised: true, pass: false, servedModel: null, servedModelSource: null });
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain('assistant-model-missing');
    expect(servedModelExitCode(receipt)).toBe(1);
  });
  it('is exit 2 when the only assistant frame is a synthetic API-error frame', () => {
    const errored: Frame = { ...assistant('<synthetic>'), assistantError: 'authentication_failed' };
    const receipt = buildServedModelReceipt(input({ turn: { outcome: { status: 'completed', hasValue: true }, messages: [init(), errored], settled: [{ ok: true, sessionId: SID }] } }));
    expect(receipt.realised).toBe(false);
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain('gateway-error-frame');
    expect(servedModelExitCode(receipt)).toBe(2);
  });
  it('flags a run that settled more than one agent as not one bounded turn', () => {
    const receipt = buildServedModelReceipt(input({ turn: { outcome: { status: 'completed', hasValue: true }, messages: [init(), assistant(), result()], settled: [{ ok: true }, { ok: true }] } }));
    expect(receipt.findings.map((finding: { rule: string }) => finding.rule)).toContain('not-one-turn');
    expect(receipt.pass).toBe(false);
    expect(servedModelExitCode(receipt)).toBe(1);
  });
  it('throws instead of printing a receipt that would carry a credential', () => {
    expect(() => buildServedModelReceipt(input({ requestedModel: 'Bearer abc123def456' }))).toThrow(TypeError);
    expect(() => buildServedModelReceipt(input({ turn: { outcome: { status: 'failed', error: 'sk-ant-api03-secret', hasValue: false }, messages: [], settled: [] } }))).toThrow(TypeError);
  });
  it('throws on a model string that is not a bounded printable string', () => {
    expect(() => buildServedModelReceipt(input({ requestedModel: 'x'.repeat(401) }))).toThrow(TypeError);
    expect(() => buildServedModelReceipt(input({ requestedModel: 'bad\u0007model' }))).toThrow(TypeError);
  });
});

describe('runner shape', () => {
  const runner = readFileSync(new URL('../qa/workbench/live-served-model.mjs', import.meta.url), 'utf8');
  it('drives the real dist host and runtime, never a mock or query override', () => {
    expect(runner).toContain("from '../../dist/workbench/claude-host.js'");
    expect(runner).toContain("from '../../dist/workflow/runtime.js'");
    expect(runner).not.toMatch(/\bvi\.|queryOverride|createFixtureQuery|AgentManager/);
  });
  it('sanitizes captures through redaction.ts', () => {
    expect(runner).toContain("from '../../dist/workbench/redaction.js'");
    expect(runner).toContain('redactWorkbenchText');
    expect(runner).toContain('stripUnsafeText');
  });
  it('runs exactly one bounded turn with no tools and exits through the verdict', () => {
    expect(runner).toContain('tools: []');
    expect(runner).toContain('servedModelExitCode');
    expect(runner).toContain('RUN_CEILING_MS');
  });
  it('is measurement-only: no src imports', () => {
    expect(runner).not.toMatch(/from '\.\.\/\.\.\/src\//);
  });
});
