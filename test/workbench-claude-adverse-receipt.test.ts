/**
 * wb-a2g.1 offline falsifiers for the live adverse-journey tier. No network and
 * no SDK: these pin the assessor/builder that turn observed timestamps into a
 * verdict, and the static shape of the runner that gathers them against the
 * real SDK. A live run is evidence of the surfaces it exercised; these tests
 * are evidence the measurement cannot quietly stop measuring.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ACK_WAIT_BOUND_MS, assessAdverseJourneys, buildAdverseReceipt, SESSION_LOOKUP_BOUND_MS, servedModelFrom } from '../qa/workbench/live-adverse-receipt.mjs';

const CANCELLED = 'Claude SDK query was cancelled.';
const SID_A = '3f2a9c1e-7b64-4d0a-9e1f-0a1b2c3d4e5f';
const SID_B = '9d8c7b6a-5e4f-4a3b-8c2d-1e0f9a8b7c6d';
const REQUESTED = 'claude-opus-5-5';
const SERVED = 'claude-opus-5-5-20261001';
const INVALID = 'claude-adverse-not-a-model-000';

interface AgentObs {
  agentId: string;
  startedAt?: number;
  acknowledgedAt?: number;
  result?: { ok: boolean; skipped?: boolean; error?: string; sessionId?: string };
}
/** What the SDK stream natively reported as the model, beside the alias the host was asked for. */
interface ModelEvidence {
  requestedModel: string;
  servedModel: string | null;
  servedModelSource: 'assistant' | 'system/init' | null;
}
interface MidStreamObs extends ModelEvidence {
  requestedAt?: number;
  terminalAt: number;
  ackWaitMs: number;
  outcome: { status: string; error?: string; hasValue: boolean };
  agents: AgentObs[];
  initMessages: { agentId: string; sessionId: string; at: number }[];
  nativeSessions: { sessionId: string; recordSessionId?: string; lookupAttempts: number; lookupMs: number }[];
}
interface Observed {
  midStreamCancel: MidStreamObs;
  preStartAbort: ModelEvidence & { requestedAt: number; terminalAt: number; outcome: { status: string; error?: string; hasValue: boolean }; sdkMessages: number; sessionIds: string[] };
  invalidModel: ModelEvidence & { model: string; outcome: { status: string; error?: string; hasValue: boolean }; settled: { ok: boolean; skipped?: boolean; error?: string; sessionId?: string }[]; sdkMessages: number; sessionIds: string[] };
}

const cancelledResult = (sessionId: string) => ({ ok: false, skipped: true, error: CANCELLED, sessionId });

function cleanObserved(): Observed {
  return {
    midStreamCancel: {
      requestedModel: REQUESTED,
      servedModel: SERVED,
      servedModelSource: 'system/init',
      requestedAt: 1000.5,
      terminalAt: 1300.25,
      ackWaitMs: 0,
      outcome: { status: 'killed', error: 'Workflow aborted.', hasValue: false },
      agents: [
        { agentId: 'wf-agent-0', startedAt: 900, acknowledgedAt: 1100.1, result: cancelledResult(SID_A) },
        { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 1120.7, result: cancelledResult(SID_B) },
      ],
      initMessages: [
        { agentId: 'wf-agent-0', sessionId: SID_A, at: 950.2 },
        { agentId: 'wf-agent-1', sessionId: SID_B, at: 960.4 },
      ],
      nativeSessions: [{ sessionId: SID_A, recordSessionId: SID_A, lookupAttempts: 1, lookupMs: 3.5 }, { sessionId: SID_B, recordSessionId: SID_B, lookupAttempts: 2, lookupMs: 504.25 }],
    },
    preStartAbort: { requestedModel: REQUESTED, servedModel: null, servedModelSource: null, requestedAt: 10, terminalAt: 40, outcome: { status: 'killed', error: 'Workflow aborted.', hasValue: false }, sdkMessages: 0, sessionIds: [] },
    invalidModel: {
      requestedModel: INVALID,
      servedModel: null,
      servedModelSource: null,
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
      requestedModel: REQUESTED,
      servedModel: null,
      servedModelSource: null,
      terminalAt: 500,
      ackWaitMs: 0,
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
    missing.midStreamCancel.nativeSessions = [{ sessionId: SID_A, recordSessionId: SID_A, lookupAttempts: 1, lookupMs: 3.5 }];
    expect(rules(missing)).toContain('native-session-missing');
    const mismatch = cleanObserved();
    mismatch.midStreamCancel.nativeSessions[1] = { sessionId: SID_B, recordSessionId: SID_A, lookupAttempts: 6, lookupMs: 2504 };
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

describe('served model evidence', () => {
  const cleared = { servedModel: null, servedModelSource: null };

  it('carries the requested and the natively served model in every journey measured block', () => {
    const receipt = build(cleanObserved());
    expect(receipt.journeys.midStreamCancel.measured).toMatchObject({ requestedModel: REQUESTED, servedModel: SERVED, servedModelSource: 'system/init' });
    expect(receipt.journeys.preStartAbort.measured).toEqual({ requestedModel: REQUESTED, ...cleared });
    expect(receipt.journeys.invalidModel.measured).toEqual({ requestedModel: INVALID, ...cleared });
  });

  it('keeps requested and served independent and carries an assistant-reported model', () => {
    const o = cleanObserved();
    o.midStreamCancel.servedModel = 'claude-opus-5-5-native';
    o.midStreamCancel.servedModelSource = 'assistant';
    o.invalidModel.servedModel = INVALID;
    o.invalidModel.servedModelSource = 'system/init';
    const receipt = build(o);
    expect(receipt.journeys.midStreamCancel.measured).toMatchObject({ requestedModel: REQUESTED, servedModel: 'claude-opus-5-5-native', servedModelSource: 'assistant' });
    expect(receipt.journeys.invalidModel.measured).toEqual({ requestedModel: INVALID, servedModel: INVALID, servedModelSource: 'system/init' });
  });

  it('refuses a realised mid-stream cancel that lost its served model: never a silent null', () => {
    const o = cleanObserved();
    Object.assign(o.midStreamCancel, cleared);
    expect(assessAdverseJourneys(o)).toEqual({ findings: [], realised: true });
    expect(() => build(o)).toThrow(TypeError);
    expect(() => build(o)).toThrow(/servedModel/);
  });

  it('carries a null served model for a mid-stream journey that was never realised', () => {
    const o = cleanObserved();
    o.midStreamCancel = {
      requestedModel: REQUESTED,
      ...cleared,
      terminalAt: 500,
      ackWaitMs: 0,
      outcome: { status: 'completed', hasValue: true },
      agents: [{ agentId: 'wf-agent-0', startedAt: 100, acknowledgedAt: 200, result: { ok: false, error: 'Claude SDK query failed: connect ECONNREFUSED' } }],
      initMessages: [],
      nativeSessions: [],
    };
    const receipt = build(o);
    expect(receipt).toMatchObject({ realised: false, pass: false });
    expect(receipt.journeys.midStreamCancel.measured).toMatchObject({ requestedModel: REQUESTED, ...cleared });
  });

  it('refuses absent, empty, mistyped or source-inconsistent model evidence on any journey', () => {
    const mutations: [string, (journey: ModelEvidence) => void][] = [
      ['empty requestedModel', (journey) => { journey.requestedModel = ''; }],
      ['absent requestedModel', (journey) => { Reflect.deleteProperty(journey, 'requestedModel'); }],
      ['absent servedModel', (journey) => { Reflect.deleteProperty(journey, 'servedModel'); }],
      ['absent servedModelSource', (journey) => { Reflect.deleteProperty(journey, 'servedModelSource'); }],
      ['empty servedModel', (journey) => { journey.servedModel = ''; journey.servedModelSource = 'system/init'; }],
      ['mistyped servedModel', (journey) => { Object.assign(journey, { servedModel: 42, servedModelSource: 'system/init' }); }],
      ['served model without a source', (journey) => { journey.servedModel = SERVED; journey.servedModelSource = null; }],
      ['source without a served model', (journey) => { journey.servedModel = null; journey.servedModelSource = 'assistant'; }],
      ['unknown source', (journey) => { Object.assign(journey, { servedModel: SERVED, servedModelSource: 'stream_event' }); }],
    ];
    for (const name of ['midStreamCancel', 'preStartAbort', 'invalidModel'] as const) {
      for (const [label, mutate] of mutations) {
        const o = cleanObserved();
        mutate(o[name]);
        expect(() => build(o), `${name}: ${label}`).toThrow(TypeError);
      }
    }
  });

  it('passes the model strings through the receipt credential and escape backstop', () => {
    const leak = cleanObserved();
    leak.invalidModel.servedModel = 'sk-ant-api03-leak';
    leak.invalidModel.servedModelSource = 'system/init';
    expect(() => build(leak)).toThrow(/credential/);
    const escaped = cleanObserved();
    escaped.midStreamCancel.requestedModel = 'claude\u001b[31m';
    expect(() => build(escaped)).toThrow(/escape/);
  });
});

describe('servedModelFrom', () => {
  it('prefers the first genuine assistant message.model, the gateway answer, over the system/init model', () => {
    const frames = [
      { type: 'system', subtype: 'init', model: REQUESTED },
      { type: 'stream_event' },
      { type: 'assistant', model: SERVED },
      { type: 'assistant', model: 'claude-later-frame' },
    ];
    expect(servedModelFrom(frames)).toEqual({ servedModel: SERVED, servedModelSource: 'assistant' });
  });

  it('falls back to the first system/init model when the journey stopped before any assistant frame', () => {
    const frames = [{ type: 'system', subtype: 'status' }, { type: 'system', subtype: 'init', model: REQUESTED }, { type: 'system', subtype: 'init', model: 'claude-second-init' }];
    expect(servedModelFrom(frames)).toEqual({ servedModel: REQUESTED, servedModelSource: 'system/init' });
  });

  it('never reads an assistant frame the SDK flags as an API error as a served model', () => {
    const synthetic = { type: 'assistant', model: '<synthetic>', assistantError: 'model_not_found' };
    expect(servedModelFrom([{ type: 'system', subtype: 'init', model: INVALID }, synthetic, { type: 'result', subtype: 'success' }])).toEqual({ servedModel: INVALID, servedModelSource: 'system/init' });
    expect(servedModelFrom([synthetic])).toEqual({ servedModel: null, servedModelSource: null });
  });

  it('is null when no model-bearing frame arrived and never invents one from an empty or non-string model', () => {
    expect(servedModelFrom([])).toEqual({ servedModel: null, servedModelSource: null });
    expect(servedModelFrom([{ type: 'system', subtype: 'init', model: '' }, { type: 'assistant', model: 7 }, { type: 'result', subtype: 'error_during_execution' }])).toEqual({ servedModel: null, servedModelSource: null });
    expect(() => servedModelFrom(undefined)).toThrow(TypeError);
  });
});

describe('disclosed deviations', () => {
  const STATED = [
    'agentsWithoutSession is a measured count, never a pass',
    'the 20 s ack wait after terminal and the 3 s native-session-lookup retry are bounded waits reported with their measured values',
    "the runner's extra imports (./live-adverse-receipt.mjs, node:child_process, node:fs) are enumerated by the guard test",
  ];

  it('states exactly the three disclosed deviations, each beside its measured values', () => {
    const o = cleanObserved();
    o.midStreamCancel.ackWaitMs = 2004.5;
    const receipt = build(o);
    expect(receipt.deviations).toEqual([
      { id: 'agents-without-session', statement: STATED[0], agentsWithoutSession: 0 },
      { id: 'bounded-waits', statement: STATED[1], ackWaitBoundMs: 20_000, ackWaitMs: 2004.5, sessionLookupBoundMs: 3_000, sessionLookupMs: [3.5, 504.25], sessionLookupAttempts: [1, 2] },
      { id: 'runner-extra-imports', statement: STATED[2], imports: ['./live-adverse-receipt.mjs', 'node:child_process', 'node:fs'] },
    ]);
    expect(Object.isFrozen(receipt.deviations)).toBe(true);
    expect([ACK_WAIT_BOUND_MS, SESSION_LOOKUP_BOUND_MS]).toEqual([20_000, 3_000]);
  });

  it('reports agentsWithoutSession as the measured count it is, never as a pass', () => {
    const one = cleanObserved();
    one.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900, acknowledgedAt: 1120, result: { ok: false, skipped: true, error: CANCELLED } };
    one.midStreamCancel.initMessages = [one.midStreamCancel.initMessages[0]];
    one.midStreamCancel.nativeSessions = [one.midStreamCancel.nativeSessions[0]];
    const measured = build(one);
    expect(measured.deviations[0].agentsWithoutSession).toBe(1);
    expect(measured.deviations[0].agentsWithoutSession).toBe(measured.journeys.midStreamCancel.measured.agentsWithoutSession);
    expect(measured.deviations[1]).toMatchObject({ sessionLookupMs: [3.5], sessionLookupAttempts: [1] });
    const none = cleanObserved();
    none.midStreamCancel.agents = none.midStreamCancel.agents.map((agent) => ({ ...agent, result: { ok: false, skipped: true, error: CANCELLED } }));
    none.midStreamCancel.initMessages = [];
    none.midStreamCancel.nativeSessions = [];
    Object.assign(none.midStreamCancel, { servedModel: null, servedModelSource: null });
    const sessionless = build(none);
    expect(sessionless).toMatchObject({ realised: false, pass: false });
    expect(sessionless.deviations[0].agentsWithoutSession).toBe(2);
  });

  it('refuses absent, negative or non-finite wait measurements', () => {
    const mutations: [string, (o: Observed) => void][] = [
      ['absent ackWaitMs', (o) => { Reflect.deleteProperty(o.midStreamCancel, 'ackWaitMs'); }],
      ['negative ackWaitMs', (o) => { o.midStreamCancel.ackWaitMs = -1; }],
      ['infinite ackWaitMs', (o) => { o.midStreamCancel.ackWaitMs = Number.POSITIVE_INFINITY; }],
      ['zero lookup attempts', (o) => { o.midStreamCancel.nativeSessions[0].lookupAttempts = 0; }],
      ['fractional lookup attempts', (o) => { o.midStreamCancel.nativeSessions[0].lookupAttempts = 1.5; }],
      ['NaN lookupMs', (o) => { o.midStreamCancel.nativeSessions[1].lookupMs = Number.NaN; }],
      ['absent lookupMs', (o) => { Reflect.deleteProperty(o.midStreamCancel.nativeSessions[1], 'lookupMs'); }],
    ];
    for (const [label, mutate] of mutations) {
      const o = cleanObserved();
      mutate(o);
      expect(() => build(o), label).toThrow(TypeError);
    }
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

  it('enumerates exactly the imports beyond the bead set that the receipt discloses as a deviation', () => {
    const beadSet = ['../../dist/workbench/claude-host.js', '../../dist/workbench/redaction.js', '../../dist/workflow/runtime.js', '@anthropic-ai/claude-agent-sdk'];
    const extra = specifiers.filter((specifier) => !beadSet.includes(specifier)).sort();
    const disclosed = build(cleanObserved()).deviations.find((deviation: { id: string }) => deviation.id === 'runner-extra-imports');
    expect(extra).toEqual(disclosed?.imports);
  });

  it('waits only by the disclosed bounds and picks the served model with the tested selector', () => {
    expect(runner).toMatch(/\bACK_WAIT_BOUND_MS\b/);
    expect(runner).toMatch(/\bSESSION_LOOKUP_BOUND_MS\b/);
    expect(runner).toMatch(/\bservedModelFrom\(/);
    expect(runner).not.toMatch(/\b(?:20_?000|3_?000)\b/);
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
