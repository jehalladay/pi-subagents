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

/**
 * Comment-blind source shape (wb-a2g.6 O1, the p5a F1 class): a pin that reads the raw runner text is satisfied by a
 * comment that merely names the route, so every shape assertion below reads the source with comments removed.
 */
const stripComments = (source: string): string => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');

/** Every capture site of the runner and the routed form it must keep; a site that no longer matches bypasses preview(). */
const CAPTURE_SITES: readonly [string, RegExp][] = [
  ['native model string', /model: preview\(model, MODEL_PREVIEW\)/],
  ['assistant error flag', /assistantError: preview\(message\.error, 60\)/],
  ['settled error', /error: preview\(result\.error\)/],
  ['requested alias', /requestedModel: preview\(MODEL, MODEL_PREVIEW\)/],
  ['outcome error', /error: preview\(outcome\.error, 300\)/],
  ['harness-failure stderr line (the one path with no builder backstop)', /harness failure: \$\{preview\(/],
  ['harness-failure stdout receipt', /harnessFailure: preview\(/],
];
const bypassedSites = (source: string): string[] => {
  const code = stripComments(source);
  const failures = CAPTURE_SITES.filter(([, shape]) => !shape.test(code)).map(([name]) => name);
  const rawMessages = (code.match(/error\.message/g) ?? []).length;
  const routedMessages = (code.match(/preview\(error instanceof Error \? error\.message : error, \d+\)/g) ?? []).length;
  if (rawMessages !== routedMessages) failures.push('a raw error.message outside preview(');
  return failures;
};

describe('runner shape', () => {
  const rawRunner = readFileSync(new URL('../qa/workbench/live-served-model.mjs', import.meta.url), 'utf8');
  const runner = stripComments(rawRunner);
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
  it('reads the working tree state for the receipt dirty bit (wb-a2g.6 O4)', () => {
    expect(runner).toMatch(/dirty: /);
    expect(runner).toMatch(/'status', '--porcelain'/);
  });
  it('keeps every one of the seven capture sites routed through preview() (wb-a2g.6 O1: G9 pinned)', () => {
    expect(bypassedSites(rawRunner)).toEqual([]);
  });
  it('the comment stripper is string-aware enough for the runner and keeps urls and quoted slashes', () => {
    expect(stripComments("const a = 'http://x'; // note\nconst b = 1; /* gone */")).toBe("const a = 'http://x'; \nconst b = 1; ");
  });
  it('is comment-blind: a comment naming the route never satisfies a pin (G11 dies)', () => {
    const commentedOut = rawRunner.replace(/^(.*harnessFailure: preview\(.*)$/m, '// $1\n      harnessFailure: String(error),');
    expect(commentedOut).not.toBe(rawRunner);
    expect(bypassedSites(commentedOut)).toContain('harness-failure stdout receipt');
    const named = rawRunner.replace('model: preview(model, MODEL_PREVIEW)', 'model: String(model) /* model: preview(model, MODEL_PREVIEW) */');
    expect(bypassedSites(named)).toContain('native model string');
  });
  it('a capture that bypasses preview() is named, one mutant per site (G9/G10/G12 die)', () => {
    const mutants: [string, string, string][] = [
      ['harness-failure stderr line (the one path with no builder backstop)', 'harness failure: $' + '{preview(error instanceof Error ? error.message : error, 400)}', 'harness failure: $' + '{error}'],
      ['outcome error', 'error: preview(outcome.error, 300)', 'error: outcome.error'],
      ['native model string', 'model: preview(model, MODEL_PREVIEW)', 'model'],
      ['settled error', 'error: preview(result.error)', 'error: result.error'],
    ];
    for (const [name, from, to] of mutants) {
      expect(rawRunner).toContain(from);
      expect(bypassedSites(rawRunner.replace(from, to))).toContain(name);
    }
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
    const spy = (...args: Parameters<typeof sanitizeWorkbenchText>): string => {
      calls.push(args);
      return sanitizeWorkbenchText(...args);
    };
    expect(buildPreview(spy, 'raw input', 120)).toBe(sanitizeWorkbenchText('raw input', 120, 'label'));
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
      ['K1 BEL inside the password KEYWORD (952 corpus:108)', `pass${BEL}word=hunter2`, 'hunter2'],
      ['K1v BEL inside the password VALUE (value-interior)', `password=${KEY40.slice(0, 20)}${BEL}${KEY40.slice(20)}`, KEY40],
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
  it('holds the final bound after the key-name mask lengthens the text (O2: G4 dies)', () => {
    expect(buildPreview(sanitizeWorkbenchText, 'api_key '.repeat(40), 50).length).toBeLessThanOrEqual(50);
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
  it.each([
    ['JSON-escaped newline glued to Bearer', 'x\\nBearer abc123def456'],
    ['JSON-escaped tab glued to Bearer', 'x\\tBearer abc123def456'],
    ['authBearer', 'authBearer abc123def456'],
    ['x1Bearer', 'x1Bearer abc123def456'],
  ])('refuses a word-glued Bearer token: %s (a2g.1 J7 four-probe set)', (_name, value) => rejects(value));
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

describe('receipt dirty bit (wb-a2g.6 O4, the vko family standard)', () => {
  it('records whether the working tree was dirty at the revision, null when unknown', () => {
    expect(buildServedModelReceipt(input({ dirty: false })).dirty).toBe(false);
    expect(buildServedModelReceipt(input({ dirty: true })).dirty).toBe(true);
    expect(buildServedModelReceipt(input()).dirty).toBeNull();
    expect(buildServedModelReceipt(input({ dirty: 'yes' })).dirty).toBeNull();
  });
});

describe('TRACEABILITY alias-vs-native pointer (wb-a2g.6 U3, owner landing instruction 00:06Z)', () => {
  const trace = readFileSync(new URL('../docs/workbench/TRACEABILITY.md', import.meta.url), 'utf8');
  it('points the alias-vs-native sentence at the gate-bound receipt of record', () => {
    expect(trace).toContain('cmd_59b070680f65');
    expect(trace).toContain('30af7a6');
    expect(trace).toContain('claude-sonnet-5-5');
    expect(trace).toContain('claude-haiku-4-5');
  });
});
