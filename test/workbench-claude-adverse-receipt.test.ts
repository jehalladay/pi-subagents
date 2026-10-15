/**
 * wb-a2g.1 offline falsifiers for the live adverse-journey tier. No network and
 * no SDK: these pin the assessor/builder that turn observed timestamps into a
 * verdict, and the static shape of the runner that gathers them against the
 * real SDK. A live run is evidence of the surfaces it exercised; these tests
 * are evidence the measurement cannot quietly stop measuring.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { assessAdverseJourneys, buildAdverseReceipt } from '../qa/workbench/live-adverse-receipt.mjs';

const CANCELLED = 'Claude SDK query was cancelled.';
const SID_A = '3f2a9c1e-7b64-4d0a-9e1f-0a1b2c3d4e5f';
const SID_B = '9d8c7b6a-5e4f-4a3b-8c2d-1e0f9a8b7c6d';

interface AgentObs {
  agentId: string;
  startedAt?: number;
  acknowledgedAt?: number;
  result?: { ok: boolean; skipped?: boolean; error?: string; sessionId?: string };
}
interface MidStreamObs {
  requestedAt?: number;
  terminalAt: number;
  outcome: { status: string; error?: string; hasValue: boolean };
  agents: AgentObs[];
  initMessages: { agentId: string; sessionId: string; at: number }[];
  nativeSessions: { sessionId: string; recordSessionId?: string }[];
}
interface Observed {
  midStreamCancel: MidStreamObs;
  preStartAbort: { requestedAt: number; terminalAt: number; outcome: { status: string; error?: string; hasValue: boolean }; sdkMessages: number; sessionIds: string[] };
  invalidModel: { model: string; outcome: { status: string; error?: string; hasValue: boolean }; settled: { ok: boolean; skipped?: boolean; error?: string; sessionId?: string }[]; sdkMessages: number; sessionIds: string[] };
}

const cancelledResult = (sessionId: string) => ({ ok: false, skipped: true, error: CANCELLED, sessionId });

function cleanObserved(): Observed {
  return {
    midStreamCancel: {
      requestedAt: 1000.5,
      terminalAt: 1300.25,
      outcome: { status: 'killed', error: 'Workflow aborted.', hasValue: false },
      agents: [
        { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100.1, result: cancelledResult(SID_A) },
        { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 1120.7, result: cancelledResult(SID_B) },
      ],
      initMessages: [
        { agentId: 'wf-agent-0', sessionId: SID_A, at: 950.2 },
        { agentId: 'wf-agent-1', sessionId: SID_B, at: 960.4 },
      ],
      nativeSessions: [{ sessionId: SID_A, recordSessionId: SID_A }, { sessionId: SID_B, recordSessionId: SID_B }],
    },
    preStartAbort: { requestedAt: 10, terminalAt: 40, outcome: { status: 'killed', error: 'Workflow aborted.', hasValue: false }, sdkMessages: 0, sessionIds: [] },
    invalidModel: {
      model: 'claude-adverse-not-a-model-000',
      outcome: { status: 'failed', error: 'agent returned null', hasValue: false },
      settled: [{ ok: false, error: 'Claude SDK query failed: model not found' }],
      sdkMessages: 0,
      sessionIds: [],
    },
  };
}

const meta = () => ({ utc: '2026-10-15T09:00:00.000Z', revision: 'working-tree', node: 'v24.0.0', arch: 'x64', platform: 'linux', sdkVersion: '0.3.300', model: 'claude-opus-5-5', sdkEventTypes: ['system/init', 'result'] });
const build = (observed: Observed) => buildAdverseReceipt({ ...meta(), journeys: observed });
const rules = (observed: Observed) => assessAdverseJourneys(observed).findings.map((f: { rule: string }) => f.rule);

describe('assessAdverseJourneys', () => {
  it('passes a clean three-journey observation with no findings', () => {
    expect(assessAdverseJourneys(cleanObserved())).toEqual({ findings: [], realised: true });
  });

  it('counts agents the SDK finished before the abort as reported, not failures', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 990, result: { ok: true, sessionId: SID_B } };
    expect(assessAdverseJourneys(o)).toEqual({ findings: [], realised: true });
    const receipt = build(o);
    expect(receipt.journeys.midStreamCancel.measured.settledBeforeCancel).toBe(1);
    expect(receipt.journeys.midStreamCancel.measured.agentsCancelled).toBe(1);
  });

  it('flags an in-flight agent that completes after the abort', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[0] = { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100.1, result: { ok: true, sessionId: SID_A } };
    expect(rules(o)).toContain('completed-after-cancel');
  });

  it('flags a session init observed after the abort was requested', () => {
    const o = cleanObserved();
    o.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1010 };
    expect(rules(o)).toContain('init-after-abort');
  });

  it('is not realised when no agent was cancelled mid-flight', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents = o.midStreamCancel.agents.map((a) => ({ ...a, acknowledgedAt: 990, result: { ok: true, sessionId: a.result?.sessionId } }));
    const verdict = assessAdverseJourneys(o);
    expect(verdict.realised).toBe(false);
    expect(verdict.findings.map((f: { rule: string }) => f.rule)).toContain('no-agent-cancelled');
  });

  it('is not realised when no SDK session ever started (gateway unreachable)', () => {
    const o = cleanObserved();
    o.midStreamCancel = {
      terminalAt: 500,
      outcome: { status: 'completed', hasValue: true },
      agents: [{ agentId: 'wf-agent-0', startedAt: 100, acknowledgedAt: 200, result: { ok: false, error: 'Claude SDK query failed: connect ECONNREFUSED' } }],
      initMessages: [],
      nativeSessions: [],
    };
    const verdict = assessAdverseJourneys(o);
    expect(verdict.realised).toBe(false);
    expect(verdict.findings.map((f: { rule: string }) => f.rule)).toEqual(expect.arrayContaining(['no-session-started', 'gateway-unproven']));
  });

  it('records an agent whose onSettled never fired as unacknowledged', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900 };
    expect(rules(o)).toContain('unacknowledged-agent');
    const receipt = build(o);
    expect(receipt.journeys.midStreamCancel.agents[1]).not.toHaveProperty('acknowledgedAt');
  });

  it('flags a cancellation that is not an explicit killed outcome without a value', () => {
    const wrongStatus = cleanObserved();
    wrongStatus.midStreamCancel.outcome = { status: 'completed', hasValue: true };
    expect(rules(wrongStatus)).toEqual(expect.arrayContaining(['not-killed', 'value-after-cancel']));
    const wrongError = cleanObserved();
    wrongError.midStreamCancel.outcome = { status: 'killed', error: 'boom', hasValue: false };
    expect(rules(wrongError)).toContain('not-killed');
  });

  it('flags a cancelled agent whose settled result is not the explicit skipped cancellation', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[0] = { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100, result: { ok: false, error: 'Claude SDK query failed: x', sessionId: SID_A } };
    expect(rules(o)).toContain('cancel-result-shape');
  });

  it('flags a cancelled agent that dropped the session id the SDK reported', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[0] = { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100, result: { ok: false, skipped: true, error: CANCELLED } };
    expect(rules(o)).toContain('cancel-session-id');
  });

  it('flags session-count, session-id shape and native-record violations', () => {
    const count = cleanObserved();
    count.midStreamCancel.initMessages.push({ agentId: 'wf-agent-9', sessionId: '11111111-2222-4333-8444-555555555555', at: 970 });
    expect(rules(count)).toContain('session-count-mismatch');
    const invented = cleanObserved();
    invented.midStreamCancel.agents[0] = { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100, result: cancelledResult('11111111-2222-4333-8444-555555555555') };
    expect(rules(invented)).toContain('session-count-mismatch');
    const shape = cleanObserved();
    shape.midStreamCancel.initMessages[0] = { agentId: 'wf-agent-0', sessionId: 'NOT-A-UUID', at: 950 };
    expect(rules(shape)).toContain('invalid-session-id');
    const missing = cleanObserved();
    missing.midStreamCancel.nativeSessions = [{ sessionId: SID_A, recordSessionId: SID_A }];
    expect(rules(missing)).toContain('native-session-missing');
    const mismatch = cleanObserved();
    mismatch.midStreamCancel.nativeSessions[1] = { sessionId: SID_B, recordSessionId: SID_A };
    expect(rules(mismatch)).toContain('native-session-missing');
  });

  it('reports an agent aborted before the SDK gave it a session id without failing it', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 1120, result: { ok: false, skipped: true, error: CANCELLED } };
    o.midStreamCancel.initMessages = [o.midStreamCancel.initMessages[0]];
    o.midStreamCancel.nativeSessions = [o.midStreamCancel.nativeSessions[0]];
    expect(assessAdverseJourneys(o)).toEqual({ findings: [], realised: true });
    expect(build(o).journeys.midStreamCancel.measured.agentsWithoutSession).toBe(1);
  });

  it('measures the three phases and never reports one it did not observe', () => {
    const receipt = build(cleanObserved());
    const measured = receipt.journeys.midStreamCancel.measured;
    expect(measured.requestToAckMs).toBeCloseTo(120.7 - 0.5, 5);
    expect(measured.ackToTerminalMs).toBeCloseTo(1300.25 - 1120.7, 5);
    const noAck = cleanObserved();
    noAck.midStreamCancel.agents = noAck.midStreamCancel.agents.map((a) => ({ agentId: a.agentId, startedAt: a.startedAt }));
    const bare = build(noAck).journeys.midStreamCancel.measured;
    expect(bare).not.toHaveProperty('requestToAckMs');
    expect(bare).not.toHaveProperty('ackToTerminalMs');
  });

  it('records an acknowledgement after the terminal as a measurement, not a violation', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 1400, result: cancelledResult(SID_B) };
    expect(assessAdverseJourneys(o).findings).toEqual([]);
    expect(build(o).journeys.midStreamCancel.measured.ackAfterTerminal).toBe(1);
  });

  it('flags a terminal that precedes the request', () => {
    const o = cleanObserved();
    o.midStreamCancel.terminalAt = 900;
    expect(rules(o)).toContain('terminal-before-request');
  });

  it('flags native work or a non-killed outcome in a pre-start abort', () => {
    const work = cleanObserved();
    work.preStartAbort.sdkMessages = 1;
    expect(rules(work)).toContain('work-before-start');
    const sessions = cleanObserved();
    sessions.preStartAbort.sessionIds = [SID_A];
    expect(rules(sessions)).toContain('work-before-start');
    const status = cleanObserved();
    status.preStartAbort.outcome = { status: 'completed', hasValue: true };
    expect(rules(status)).toContain('not-killed-pre-start');
  });

  it('treats an accepted invalid model as unrealised, never a pass', () => {
    const o = cleanObserved();
    o.invalidModel.outcome = { status: 'completed', hasValue: true };
    o.invalidModel.settled = [{ ok: true, sessionId: SID_A }];
    const verdict = assessAdverseJourneys(o);
    expect(verdict.realised).toBe(false);
    expect(verdict.findings.map((f: { rule: string }) => f.rule)).toContain('invalid-model-accepted');
    expect(verdict.findings.map((f: { rule: string }) => f.rule)).toContain('invalid-model-settled-ok');
  });

  it('requires an explicit, bounded, control-free error for an invalid model', () => {
    const missing = cleanObserved();
    missing.invalidModel.outcome = { status: 'failed', hasValue: false };
    expect(rules(missing)).toContain('invalid-model-error');
    const long = cleanObserved();
    long.invalidModel.outcome = { status: 'failed', error: 'x'.repeat(401), hasValue: false };
    expect(rules(long)).toContain('invalid-model-error');
    const control = cleanObserved();
    control.invalidModel.outcome = { status: 'failed', error: 'bad\u0007bell', hasValue: false };
    expect(rules(control)).toContain('invalid-model-error');
  });

  it('refuses malformed observations loudly', () => {
    expect(() => assessAdverseJourneys({})).toThrow(TypeError);
    expect(() => assessAdverseJourneys(null)).toThrow(TypeError);
  });
});

describe('buildAdverseReceipt', () => {
  it('builds a frozen receipt carrying every evidence field and passes a clean observation', () => {
    const receipt = build(cleanObserved());
    expect(receipt).toMatchObject({
      contract: 'workbench.claude-adverse/v1',
      utc: '2026-10-15T09:00:00.000Z',
      revision: 'working-tree',
      node: 'v24.0.0',
      arch: 'x64',
      platform: 'linux',
      sdkVersion: '0.3.300',
      model: 'claude-opus-5-5',
      sdkEventTypes: ['system/init', 'result'],
      findings: [],
      realised: true,
      pass: true,
    });
    expect(Object.keys(receipt.journeys).sort()).toEqual(['invalidModel', 'midStreamCancel', 'preStartAbort']);
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journeys.midStreamCancel.agents[0])).toBe(true);
    expect(Object.isFrozen(receipt.findings)).toBe(true);
  });

  it('does not alias or mutate the caller observation', () => {
    const o = cleanObserved();
    const before = JSON.stringify(o);
    build(o);
    expect(JSON.stringify(o)).toBe(before);
  });

  it('is not a pass when there are findings or the run is unrealised', () => {
    const violated = cleanObserved();
    violated.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1010 };
    const receipt = build(violated);
    expect(receipt.realised).toBe(true);
    expect(receipt.pass).toBe(false);
    expect(receipt.findings.length).toBeGreaterThan(0);
    const unrealised = cleanObserved();
    unrealised.invalidModel.outcome = { status: 'completed', hasValue: true };
    expect(build(unrealised)).toMatchObject({ realised: false, pass: false });
  });

  it('throws when any string carries a credential shape', () => {
    for (const secret of ['Authorization: Bearer abc123', 'sk-ant-api03-zzz', 'x-api-key: abc', 'api_key=1', 'apikey']) {
      const o = cleanObserved();
      o.invalidModel.settled = [{ ok: false, error: `leak ${secret}` }];
      expect(() => build(o), secret).toThrow(/credential|secret|redact/i);
    }
    expect(() => buildAdverseReceipt({ ...meta(), model: 'sk-ant-xyz', journeys: cleanObserved() })).toThrow();
  });

  it('throws on an escape byte anywhere in the receipt', () => {
    const o = cleanObserved();
    o.invalidModel.settled = [{ ok: false, error: 'colour \u001b[31mred' }];
    expect(() => build(o)).toThrow(/escape|control/i);
  });

  it('throws on a string too long to be a bounded preview (payload leak guard)', () => {
    const o = cleanObserved();
    o.invalidModel.settled = [{ ok: false, error: 'a'.repeat(5000) }];
    expect(() => build(o)).toThrow(/length|bounded/i);
  });

  it('throws when a required evidence field is missing or mistyped', () => {
    const base = { ...meta(), journeys: cleanObserved() };
    for (const key of ['utc', 'revision', 'node', 'arch', 'platform', 'sdkVersion', 'model'] as const) {
      expect(() => buildAdverseReceipt({ ...base, [key]: '' }), key).toThrow(TypeError);
    }
    expect(() => buildAdverseReceipt({ ...base, sdkEventTypes: 'system/init' })).toThrow(TypeError);
    expect(() => buildAdverseReceipt({ ...base, journeys: undefined })).toThrow(TypeError);
  });
});

describe('live-adverse runner static guard', () => {
  const runner = readFileSync(new URL('../qa/workbench/live-adverse.mjs', import.meta.url), 'utf8');
  const specifiers = [...runner.matchAll(/^\s*import\s[^;]*?from\s+['"]([^'"]+)['"]/gm)].map((m) => m[1]);

  it('imports only the dist host, runtime, redaction, the real SDK, its pure receipt sibling and two node builtins', () => {
    expect([...specifiers].sort()).toEqual([
      '../../dist/workbench/claude-host.js',
      '../../dist/workbench/redaction.js',
      '../../dist/workflow/runtime.js',
      './live-adverse-receipt.mjs',
      '@anthropic-ai/claude-agent-sdk',
      'node:child_process',
      'node:fs',
    ].sort());
    expect(runner).not.toMatch(/\bimport\s*\(/);
    expect(runner).not.toMatch(/\brequire\s*\(/);
  });

  it('imports getSessionInfo from the real SDK and nothing from src/', () => {
    expect(runner).toMatch(/import\s*\{\s*getSessionInfo\s*\}\s*from\s*['"]@anthropic-ai\/claude-agent-sdk['"]/);
    expect(runner).not.toMatch(/from\s+['"][^'"]*\/src\//);
  });

  it('contains no mock, query override or Pi AgentManager', () => {
    expect(runner).not.toContain('vi.mock');
    expect(runner).not.toContain('query:');
    expect(runner).not.toContain('AgentManager');
  });

  it('keeps the receipt module pure: no imports at all', () => {
    const receiptSource = readFileSync(new URL('../qa/workbench/live-adverse-receipt.mjs', import.meta.url), 'utf8');
    expect(receiptSource).not.toMatch(/^\s*import\s/m);
    expect(receiptSource).not.toMatch(/\bimport\s*\(/);
    expect(receiptSource).not.toMatch(/\brequire\s*\(/);
  });
});

describe('forge.toml placement', () => {
  const toml = readFileSync(new URL('../forge.toml', import.meta.url), 'utf8');

  it('adds exactly one claude-adverse-live command with the 300s timeout', () => {
    const blocks = toml.match(/^\[build\.commands\.claude-adverse-live\]\n(?:(?!\[).*\n?)*/gm) ?? [];
    expect(blocks).toHaveLength(1);
    expect(blocks[0]).toContain('command = "node qa/workbench/live-adverse.mjs"');
    expect(blocks[0]).toMatch(/^timeout = 300$/m);
  });

  it('leaves the default gate list byte-for-byte unchanged', () => {
    expect(toml).toContain('gate = ["lint", "typing", "build", "test", "workbench-shell", "package-smoke"]\n');
    expect((toml.match(/^gate = /gm) ?? []).length).toBe(1);
  });
});
