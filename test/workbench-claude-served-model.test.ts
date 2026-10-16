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
  buildPreview,
  buildServedModelReceipt,
  SERVED_MODEL_CONTRACT,
  servedModelExitCode,
  servedModelFrom,
} from '../qa/workbench/live-served-model-receipt.mjs';
import { sanitizeWorkbenchText } from '../src/workbench/redaction.js';

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
  it('routes every capture through the shared helper via buildPreview, composing no sanitizer primitive locally (wb-a2g.6 U1/U2)', () => {
    expect(runner).toContain("from '../../dist/workbench/redaction.js'");
    expect(runner).toMatch(/buildPreview\(sanitizeWorkbenchText,/);
    expect(runner).not.toContain('stripUnsafeText');
    expect(runner).not.toContain('redactWorkbenchText');
    expect(runner).not.toMatch(/\.replace\(/);
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

const cp = (code: number): string => String.fromCodePoint(code);
const NUL = cp(0x00);
const BEL = cp(0x07);
const NEL = cp(0x85);
const LRM = cp(0x200e);
const ZWSP = cp(0x200b);
const RLO = cp(0x202e);
const LS = cp(0x2028);
const BOM = cp(0xfeff);
const SHY = cp(0xad);
const LONE_HIGH = cp(0xd800);

/** Any 6-character window of the secret that survives in the shown text is a leaked fragment. */
const TOKEN36 = 'q7x2k9m4p1z8w3v6b5n0c2d4f6h8j1l3r5t7';
const KEY40 = 'k3j9d8s7f6a5g4h2l1p0o9i8u7y6t5r4e3w2q1z0';
const leaks = (shown: string, secret: string): boolean => {
  for (let at = 0; at + 6 <= secret.length; at += 1) if (shown.includes(secret.slice(at, at + 6))) return true;
  return false;
};

describe('buildPreview: the pure, behaviourally pinned display path (wb-a2g.6 U1/U2)', () => {
  it('calls the injected sanitizer exactly once with the NAMED label layout and the bound (M2: a wrong layout dies)', () => {
    const calls: unknown[][] = [];
    const spy = (...args: unknown[]): string => {
      calls.push(args);
      return 'SANITIZED';
    };
    expect(buildPreview(spy as never, 'raw input', 120)).toBe('SANITIZED');
    expect(calls).toEqual([['raw input', 120, 'label']]);
  });
  it('coerces a missing value to the empty string before sanitizing and rejects a non-function sanitizer', () => {
    expect(buildPreview(sanitizeWorkbenchText, undefined)).toBe('');
    expect(buildPreview(sanitizeWorkbenchText, null)).toBe('');
    expect(() => buildPreview('nope' as never, 'x')).toThrow(TypeError);
  });
  it('never returns the raw input (M1/M4: dropping the sanitizer call leaks the secret)', () => {
    const shown = buildPreview(sanitizeWorkbenchText, `ghp_${TOKEN36}`);
    expect(shown).not.toContain(TOKEN36);
    expect(shown).toContain('[REDACTED]');
  });
  it('redacts the two wb-a2g.1 F1 inputs and the 952 P2/P3/K1/Z2 shapes the old local composition leaked', () => {
    const cases: [string, string, string][] = [
      ['ghp_ + BEL + 36 alnum', `ghp_${BEL}${TOKEN36}`, TOKEN36],
      ['aws_secret_access + BEL + _key=40 chars', `aws_secret_access${BEL}_key=${KEY40}`, KEY40],
      ['P2 Bearer + NEL', `Bearer${NEL}${TOKEN36}`, TOKEN36],
      ['P3 Bearer + NUL', `Bearer${NUL}${TOKEN36}`, TOKEN36],
      ['K1 BEL inside password', `password=${KEY40.slice(0, 20)}${BEL}${KEY40.slice(20)}`, KEY40],
      ['Z2 LRM inside ghp_', `gh${LRM}p_${TOKEN36}`, TOKEN36],
    ];
    const failures = cases.filter(([, raw, secret]) => leaks(buildPreview(sanitizeWorkbenchText, raw), secret)).map(([name]) => name);
    expect(failures).toEqual([]);
  });
  it('keeps the three a2g.1 controls redacted: split Anthropic key, split Bearer, plain ghp_', () => {
    const controls = [`sk-an${BEL}t-${TOKEN36}`, `Bea${ZWSP}rer ${TOKEN36}`, `ghp_${TOKEN36}`];
    for (const raw of controls) expect(leaks(buildPreview(sanitizeWorkbenchText, raw), TOKEN36)).toBe(false);
  });
  it('leaves no unsafe code point and masks a credential-looking key NAME, bounded to max', () => {
    const shown = buildPreview(sanitizeWorkbenchText, `a${BEL}b${RLO}c${LS}d${BOM}e${SHY}f${LONE_HIGH}g api_key is missing`, 60);
    expect(shown).not.toMatch(/[\u0000-\u001f\u007f-\u009f\u2028\u202e\ufeff\u00ad\ud800]/u);
    expect(shown).toContain('[REDACTED-NAME]');
    expect(shown).not.toMatch(/api[_-]?key/i);
    expect(buildPreview(sanitizeWorkbenchText, 'x'.repeat(500), 40).length).toBeLessThanOrEqual(40);
  });
});

describe('builder backstop is as wide as the shared redactor and the unsafe-unit set (wb-a2g.6 U1)', () => {
  const rejects = (requestedModel: string): void => {
    expect(() => buildServedModelReceipt(input({ requestedModel }))).toThrow(TypeError);
  };
  it.each([
    ['Bearer', 'Bearer abc123'],
    ['Basic scheme', 'Basic dXNlcjpwYXNz'],
    ['sk-ant- prefix', 'sk-ant-api03-x'],
    ['sk-proj- prefix', 'sk-proj-abc123'],
    ['ghp_ prefix', `ghp_${TOKEN36}`],
    ['github_pat_ prefix', 'github_pat_11ABCDE'],
    ['password assignment', 'password=hunter2'],
    ['access_token assignment', 'access_token: abcdef'],
    ['refresh-token assignment', 'refresh-token=abcdef'],
    ['aws_secret_access_key assignment', `aws_secret_access_key=${KEY40}`],
    ['aws_session_token assignment', 'aws_session_token = abcdef'],
    ['secret assignment', 'secret="abcdef"'],
    ['api key name', 'api_key'],
  ])('refuses %s', (_name, value) => rejects(value));
  it('still admits an already-redacted assignment and a plain model id', () => {
    expect(buildServedModelReceipt(input({ requestedModel: 'password=[REDACTED]' })).requestedModel).toBe('password=[REDACTED]');
    expect(buildServedModelReceipt(input()).requestedModel).toBe(REQUESTED);
  });
  it.each([
    ['ZWSP', ZWSP],
    ['RLO', RLO],
    ['LS', LS],
    ['BOM', BOM],
    ['soft hyphen', SHY],
    ['LRM', LRM],
    ['NEL', NEL],
    ['lone surrogate', LONE_HIGH],
  ])('refuses %s in a string field', (_name, unit) => rejects(`claude${unit}haiku`));
});
