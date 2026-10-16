/**
 * wb-a2g.1 offline falsifiers for the live adverse-journey tier. No network and
 * no SDK: these pin the assessor/builder that turn observed timestamps into a
 * verdict, and the static shape of the runner that gathers them against the
 * real SDK. A live run is evidence of the surfaces it exercised; these tests
 * are evidence the measurement cannot quietly stop measuring.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ACK_WAIT_BOUND_MS, assessAdverseJourneys, buildAdverseReceipt, buildPreview, SESSION_LOOKUP_BOUND_MS, servedModelFrom } from '../qa/workbench/live-adverse-receipt.mjs';
import { sanitizeWorkbenchText } from '../src/workbench/redaction.js';

const CANCELLED = 'Claude SDK query was cancelled.';
const SID_A = '3f2a9c1e-7b64-4d0a-9e1f-0a1b2c3d4e5f';
const SID_B = '9d8c7b6a-5e4f-4a3b-8c2d-1e0f9a8b7c6d';
const SID_C = '5b4a3c2d-1e0f-4a9b-8c7d-6e5f4a3b2c1d';
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

  it('flags a session init from an agent the runtime started at or after the abort request', () => {
    const o = cleanObserved();
    // Owner J3 ruling: a post-abort start is judged by the agent row's runtime
    // startedAt, not by when its init arrived (that fixture is now a late init,
    // asserted in the J3 block below).
    o.midStreamCancel.agents[1] = { ...o.midStreamCancel.agents[1], startedAt: 1001 };
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
    violated.midStreamCancel.agents[1] = { ...violated.midStreamCancel.agents[1], startedAt: 1001 };
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

describe('J3 by runtime start stamp: post-abort starts judged, late inits measured (owner ruling)', () => {
  const EMPTY_LATE = { count: 0, agentIds: [], latenciesMs: [], toControllerAbortMs: [], startedBeforeAbortMs: [] };
  const midMeasured = (o: Observed) => build(o).journeys.midStreamCancel.measured;

  it('counts an init arriving after the request from an agent started before it as a late init, not a post-abort start', () => {
    const o = cleanObserved();
    // wf-agent-1 was stamped started at 900, before the 1000.5 request; its init lands 9.5 ms after the request.
    o.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1010 };
    expect(assessAdverseJourneys(o)).toEqual({ findings: [], realised: true });
    const measured = midMeasured(o);
    expect(measured.initAfterAbort).toBe(0);
    expect(measured.unattributedInitAfterAbort).toBe(0);
    expect(measured.lateInitAfterAbort).toMatchObject({ count: 1, agentIds: ['wf-agent-1'], latenciesMs: [9.5], startedBeforeAbortMs: [100.5] });
    // Abort-to-ack: the request to that agent's acknowledged cancellation (its onSettled at 1120.7).
    expect(measured.lateInitAfterAbort.toControllerAbortMs).toHaveLength(1);
    expect(measured.lateInitAfterAbort.toControllerAbortMs[0]).toBeCloseTo(1120.7 - 1000.5, 9);
    expect(build(o)).toMatchObject({ realised: true, pass: true });
  });

  it('counts an init whose agent the runtime started at or after the request as a post-abort start and flags it', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents.push({ agentId: 'wf-agent-2', startedAt: 1001, acknowledgedAt: 1130, result: cancelledResult(SID_C) });
    o.midStreamCancel.initMessages.push({ agentId: 'wf-agent-2', sessionId: SID_C, at: 1050 });
    o.midStreamCancel.nativeSessions.push({ sessionId: SID_C, recordSessionId: SID_C, lookupAttempts: 1, lookupMs: 1 });
    expect(rules(o)).toContain('init-after-abort');
    expect(midMeasured(o)).toMatchObject({ initAfterAbort: 1, unattributedInitAfterAbort: 0, lateInitAfterAbort: { count: 0 } });
  });

  it('puts the boundary where the ruling does: startedAt >= requestedAt is a post-abort start, never also counted in flight', () => {
    const exact = cleanObserved();
    exact.midStreamCancel.requestedAt = 1000;
    exact.midStreamCancel.agents[1] = { ...exact.midStreamCancel.agents[1], startedAt: 1000 };
    exact.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1004 };
    expect(rules(exact)).toContain('init-after-abort');
    expect(midMeasured(exact)).toMatchObject({ initAfterAbort: 1, agentsStarted: 1, lateInitAfterAbort: { count: 0 } });
    const before = cleanObserved();
    before.midStreamCancel.requestedAt = 1000;
    before.midStreamCancel.agents[1] = { ...before.midStreamCancel.agents[1], startedAt: 999 };
    before.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1004 };
    expect(assessAdverseJourneys(before)).toEqual({ findings: [], realised: true });
    expect(midMeasured(before)).toMatchObject({ initAfterAbort: 0, agentsStarted: 2, lateInitAfterAbort: { count: 1, latenciesMs: [4], startedBeforeAbortMs: [1] } });
  });

  it('never drops an init it cannot attribute: an after-request init with no runtime start stamp is counted and flagged', () => {
    const unknown = cleanObserved();
    unknown.midStreamCancel.initMessages.push({ agentId: 'wf-agent-9', sessionId: SID_C, at: 1010 });
    expect(rules(unknown)).toContain('init-after-abort-unattributed');
    expect(rules(unknown)).not.toContain('init-after-abort');
    expect(midMeasured(unknown)).toMatchObject({ initAfterAbort: 0, unattributedInitAfterAbort: 1, lateInitAfterAbort: { count: 0 } });
    const unstamped = cleanObserved();
    unstamped.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', acknowledgedAt: 1120.7, result: cancelledResult(SID_B) };
    unstamped.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1010 };
    expect(rules(unstamped)).toContain('init-after-abort-unattributed');
    expect(midMeasured(unstamped)).toMatchObject({ initAfterAbort: 0, unattributedInitAfterAbort: 1 });
  });

  it('reports a late init whose agent was never acknowledged with a null abort-to-ack, never an invented one', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { agentId: 'wf-agent-1', startedAt: 900 };
    o.midStreamCancel.initMessages[1] = { agentId: 'wf-agent-1', sessionId: SID_B, at: 1010 };
    expect(rules(o)).toContain('unacknowledged-agent');
    expect(rules(o)).not.toContain('init-after-abort');
    expect(midMeasured(o).lateInitAfterAbort).toMatchObject({ count: 1, latenciesMs: [9.5], toControllerAbortMs: [null] });
  });

  it('carries an empty late-init block when nothing arrived late and when no abort was requested', () => {
    expect(midMeasured(cleanObserved())).toMatchObject({ initAfterAbort: 0, unattributedInitAfterAbort: 0, lateInitAfterAbort: EMPTY_LATE });
    const never = cleanObserved();
    Reflect.deleteProperty(never.midStreamCancel, 'requestedAt');
    expect(rules(never)).toContain('no-session-started');
    expect(midMeasured(never)).toMatchObject({ requested: false, initAfterAbort: 0, unattributedInitAfterAbort: 0, lateInitAfterAbort: EMPTY_LATE });
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

  it('takes each agent startedAt from the runtime progress rows and never substitutes an SDK message time', () => {
    expect(runner).toMatch(/outcome\.progress/);
    expect(runner).not.toMatch(/startedAt\s*(?:\?\?|\|\|)/);
  });

  it('wires one abort signal into both the run and the host, as production does (src/index.ts runWorkflow + createClaudeWorkflowHost)', () => {
    expect(runner).toMatch(/createClaudeWorkflowHost\(\{[^}]*\bsignal\b/);
    expect(runner.match(/hostFor\([^)]*controller\.signal\)/g) ?? []).toHaveLength(3);
    expect(runner.match(/runWorkflow\(\{[^}]*signal: controller\.signal/g) ?? []).toHaveLength(3);
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

/**
 * wb-a2g.1 respin (owner ruling F1, wb-952 seventeenth site): the runner's
 * preview() must normalize -> redact -> strip, once each, so a credential split
 * by a control byte cannot reassemble after the strip. Respin item 2: the
 * ackToTerminalMs sign convention is stated in the receipt and pinned here.
 * Control bytes are built with String.fromCharCode, never typed as escapes.
 */
describe('respin F1: preview normalizes before it redacts', () => {
  const BEL = String.fromCharCode(7);
  const ZWSP = String.fromCharCode(0x200b);
  const SHY = String.fromCharCode(0xad);
  const RLO = String.fromCharCode(0x202e);
  const ESC = String.fromCharCode(0x1b);
  const preview = (value: string, max = 300) => buildPreview(value, max, { sanitize: sanitizeWorkbenchText });
  const alnum36 = 'a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8';
  const secretKey40 = 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY12';

  it('redacts a ghp_ token split by a BEL byte (confirmed leak input 1)', () => {
    const out = preview(`err ghp_${BEL}${alnum36} end`);
    expect(out).toContain('[REDACTED]');
    expect(out).not.toContain('ghp_');
    expect(out).not.toContain(alnum36);
  });

  it('redacts an aws_secret_access_key assignment split by a BEL byte (confirmed leak input 2)', () => {
    const out = preview(`aws_secret_access${BEL}_key=${secretKey40}`);
    expect(out).toContain('[REDACTED]');
    expect(out).not.toContain(secretKey40);
  });

  it('redacts credentials split by zero-width, soft-hyphen and bidi marks', () => {
    for (const mark of [ZWSP, SHY, RLO]) {
      const out = preview(`sk-ant-${mark}api03-${alnum36}`);
      expect(out, `mark ${mark.charCodeAt(0).toString(16)}`).not.toContain(alnum36);
      expect(out).toContain('[REDACTED]');
    }
  });

  it('keeps the three behaving controls redacted: split Anthropic key, split Bearer, plain ghp_', () => {
    expect(preview(`sk-ant-${BEL}api03-${alnum36}`)).not.toContain(alnum36);
    expect(preview(`Bearer${BEL} abc123def456ghi`)).not.toContain('abc123def456ghi');
    expect(preview(`ghp_${alnum36}`)).not.toContain(alnum36);
  });

  it('turns whitespace controls into a single space and removes terminal escapes, leaving benign text intact', () => {
    expect(preview('line one\nline\ttwo')).toBe('line one line two');
    expect(preview(`colour ${ESC}[31mred${ESC}[0m ok`)).toBe('colour red ok');
    expect(preview('claude-opus-5-5-20261001')).toBe('claude-opus-5-5-20261001');
  });

  it('bounds the result and masks bare credential key names after the strip', () => {
    expect(preview('x'.repeat(500), 50).length).toBeLessThanOrEqual(50);
    expect(preview('the api_key name')).toContain('[REDACTED-NAME]');
  });

  it('is wired: the runner delegates to buildPreview and no longer composes strip(redact(x)) itself', () => {
    const runner = readFileSync(new URL('../qa/workbench/live-adverse.mjs', import.meta.url), 'utf8');
    expect(runner).toMatch(/buildPreview\(/);
    expect(runner).not.toMatch(/stripUnsafeText\(redactWorkbenchText\(/);
  });
});

describe('respin F1: the receipt backstop covers the shared redactor shapes', () => {
  const shapes = ['ghp_abcdefghijklmnopqrstuvwxyz0123456789', 'github_pat_11ABCDEFG0123456789', 'sk-proj-abc123', 'Basic dXNlcjpwYXNz', 'access_token=abc', 'refresh_token: xyz', 'password=hunter2', 'secret: "s3"', 'aws_secret_access_key=AAAA', 'aws_session_token=BBBB'];
  for (const shape of shapes) {
    it(`refuses a receipt string carrying ${shape.split(/[=: ]/)[0]}`, () => {
      const o = cleanObserved();
      o.invalidModel.settled = [{ ok: false, error: `leak ${shape}` }];
      expect(() => build(o)).toThrow(/credential/);
    });
  }

  it('still accepts the clean receipt (no false positive on its own statements)', () => {
    expect(() => build(cleanObserved())).not.toThrow();
  });
});

describe('respin item 2: ackToTerminalMs states its sign convention', () => {
  it('names terminalAt minus the last acknowledgement beside a positive value', () => {
    const measured = build(cleanObserved()).journeys.midStreamCancel.measured;
    expect(measured.ackToTerminalMs).toBeGreaterThan(0);
    expect(measured.ackToTerminalConvention).toBe('terminalAt - lastAcknowledgedAt; negative means the last acknowledgement arrived after the terminal');
  });

  it('carries a negative value, with the same convention, when an acknowledgement lands after the terminal', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents[1] = { ...o.midStreamCancel.agents[1], acknowledgedAt: 1400 };
    const measured = build(o).journeys.midStreamCancel.measured;
    expect(measured.ackToTerminalMs).toBeCloseTo(1300.25 - 1400, 5);
    expect(measured.ackToTerminalMs).toBeLessThan(0);
    expect(measured.ackToTerminalConvention).toMatch(/negative means the last acknowledgement arrived after the terminal/);
  });

  it('omits the convention when no acknowledgement was observed', () => {
    const o = cleanObserved();
    o.midStreamCancel.agents = o.midStreamCancel.agents.map((a) => ({ agentId: a.agentId, startedAt: a.startedAt }));
    expect(build(o).journeys.midStreamCancel.measured).not.toHaveProperty('ackToTerminalConvention');
  });
});

describe('respin item 3: src/index.ts line references are current', () => {
  it('cites the trunk lines where runWorkflow and the host receive the task abort signal', () => {
    const runner = readFileSync(new URL('../qa/workbench/live-adverse.mjs', import.meta.url), 'utf8');
    const lines = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8').split('\n');
    const cited = [...runner.matchAll(/src\/index\.ts (\d+)-(\d+)/g)];
    expect(cited.length).toBeGreaterThan(0);
    for (const [, from, to] of cited) {
      const window = lines.slice(Number(from) - 1, Number(to)).join('\n');
      expect(window).toMatch(/runWorkflow\(/);
      expect(window).toMatch(/createClaudeWorkflowHost\(/);
      expect(window.match(/signal: task\.abortController\.signal/g)?.length).toBeGreaterThanOrEqual(2);
    }
  });
});

/**
 * wb-a2g.1 F6 pre-emption (owner ruling 00:06Z, the wb-a2g.6 U1 shape): preview() composed the sanitizer primitives locally,
 * the class the wb-a2g.6 gate measured leaking 5,036 of 5,806 separator-corpus probes. buildPreview now routes through the
 * landed sanitizeWorkbenchText with the NAMED "label" layout (single-line receipt fields) and carries no local unit class.
 * Every control and invisible code point here is built with String.fromCodePoint, never typed raw.
 */
describe('F6 pre-emption: preview routes through sanitizeWorkbenchText "label" and survives the separator corpus', () => {
  const cp = (code: number): string => String.fromCodePoint(code);
  const ESC = cp(0x1b);
  /** Units that may sit glued inside a token: the helper reads them both as separators and as nothing (redaction.ts cover). */
  const UNITS: readonly string[] = [cp(0x07), cp(0x00), cp(0x200b), cp(0xad), cp(0x202e), cp(0xfeff), cp(0x2060), cp(0x200e), `${ESC}[31m`, `${ESC}]0;t${cp(0x07)}`];
  /** Whitespace (VT, NEL, LS, PS) always separates, exactly as a plain space does, so it never splits a keyword: it is probed only beside a credential and in place of the Bearer space. */
  const WHITESPACE: readonly string[] = [cp(0x0b), cp(0x85), cp(0x2028), cp(0x2029)];
  const BODY_36 = 'a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8';
  const BODY_40 = 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY12';
  const TOKEN = 'abc123def456ghi789jkl';
  const SECRETS: readonly { readonly text: string; readonly body: string; readonly gap?: number }[] = [
    { text: `ghp_${BODY_36}`, body: BODY_36 },
    { text: `sk-ant-api03-${BODY_36}`, body: BODY_36 },
    { text: `github_pat_${BODY_36}`, body: BODY_36 },
    { text: `Bearer ${TOKEN}`, body: TOKEN, gap: 6 },
    { text: `aws_secret_access_key=${BODY_40}`, body: BODY_40 },
    { text: `password=${TOKEN}`, body: TOKEN },
  ];
  /** A leak is either end of the body visible: the whole value, or twelve characters of either half. */
  const leaks = (shown: string, body: string): boolean => shown.includes(body.slice(0, 12)) || shown.includes(body.slice(-12));

  function probes(): { readonly raw: string; readonly body: string; readonly label: string }[] {
    const out: { raw: string; body: string; label: string }[] = [];
    for (const { text, body, gap } of SECRETS) {
      const keyword = text.length - body.length;
      for (const unit of [...UNITS, ...WHITESPACE]) {
        if (UNITS.includes(unit)) for (let at = 0; at <= keyword; at++) out.push({ raw: text.slice(0, at) + unit + text.slice(at), body, label: `${text.slice(0, 6)}@${at}+U${unit.codePointAt(0)?.toString(16)}` });
        if (gap !== undefined) out.push({ raw: text.slice(0, gap) + unit + text.slice(gap + 1), body, label: `${text.slice(0, 6)} replaces the space with U${unit.codePointAt(0)?.toString(16)}` });
        out.push({ raw: `lead${unit}${text}`, body, label: `${text.slice(0, 6)} glued after U${unit.codePointAt(0)?.toString(16)}` });
        out.push({ raw: `${text}${unit}tail`, body, label: `${text.slice(0, 6)} glued before U${unit.codePointAt(0)?.toString(16)}` });
      }
    }
    return out;
  }

  it('shows no credential body for any unit between, inside or beside any credential keyword (zero leaks over the corpus)', () => {
    const all = probes();
    expect(all.length).toBeGreaterThan(800);
    const failures = all.filter(({ raw, body }) => leaks(buildPreview(raw, 400, { sanitize: sanitizeWorkbenchText }), body)).map(({ label }) => label);
    expect(failures).toEqual([]);
  });

  it('names the "label" layout and the receipt bound when it calls the shared helper', () => {
    const calls: { max: number; layout: string | undefined }[] = [];
    const recording = (text: string, max?: number, layout?: 'text' | 'terminal' | 'label' | 'lines'): string => {
      calls.push({ max: max ?? -1, layout });
      return sanitizeWorkbenchText(text, max, layout);
    };
    expect(buildPreview('plain text', 80, { sanitize: recording })).toBe('plain text');
    expect(calls).toEqual([{ max: 80, layout: 'label' }]);
  });

  it('collapses a multi-line value to one line (the label layout), still bounded by the caller', () => {
    expect(buildPreview('one\ntwo\r\nthree', 300, { sanitize: sanitizeWorkbenchText })).toBe('one two three');
    expect(buildPreview('y'.repeat(900), 120, { sanitize: sanitizeWorkbenchText }).length).toBeLessThanOrEqual(120);
  });

  it('the receipt module composes no unit class of its own and the runner imports only sanitizeWorkbenchText from the helper', () => {
    const receipt = readFileSync(new URL('../qa/workbench/live-adverse-receipt.mjs', import.meta.url), 'utf8');
    const runner = readFileSync(new URL('../qa/workbench/live-adverse.mjs', import.meta.url), 'utf8');
    for (const retired of ['TERMINAL_SEQUENCES', 'WHITESPACE_CONTROLS', 'INVISIBLES', 'redact(', 'strip(']) expect(receipt, retired).not.toContain(retired);
    const redactionImports = [...runner.matchAll(/import \{([^}]*)\} from '\.\.\/\.\.\/dist\/workbench\/redaction\.js'/g)].map((match) => match[1].split(',').map((name) => name.trim()));
    expect(redactionImports).toEqual([['sanitizeWorkbenchText']]);
    expect(runner).toContain('sanitize: sanitizeWorkbenchText');
    expect(runner).not.toMatch(/redactWorkbenchText|stripUnsafeText/);
  });
});

/**
 * wb-a2g.1 J7 respin (gate-1 12:14Z U1, owner ruling 12:2xZ): the shared helper's BEARER rule is boundary-anchored by
 * ruled policy (a word-glued scheme stays plain text), so on this runner the receipt builder is the ONLY refusal for a
 * glued or JSON-escaped Bearer token. J7 requires the builder to throw on any value matching
 * /Bearer\s+\S+|sk-ant-|api[_-]?key/i, so the Bearer alternative is unanchored again (Basic keeps its word boundary).
 * The four measured probes are ASCII only: the JSON-escaped forms carry a literal backslash before n or t.
 */
describe('J7 respin: the builder refuses word-glued and JSON-escaped Bearer tokens (unanchored Bearer, fail-closed)', () => {
  const J7_VERBATIM = /Bearer\s+\S+|sk-ant-|api[_-]?key/i;
  const TOKEN = 'abc123def456';
  const GLUED: readonly [string, string][] = [
    ['the JSON-escaped newline form', `{"error":"denied\\nBearer ${TOKEN}"}`],
    ['the JSON-escaped tab form', `{"error":"denied\\tBearer ${TOKEN}"}`],
    ['authBearer', `authBearer ${TOKEN}`],
    ['x1Bearer', `x1Bearer ${TOKEN}`],
  ];
  const preview = (value: string, max = 300) => buildPreview(value, max, { sanitize: sanitizeWorkbenchText });
  const refusesAsCredential = (error: unknown): boolean => error instanceof Error && error.message.startsWith('receipt refused: credential-shaped content');
  /** The receipt line the runner would print for this settled error, or '' when the builder refuses it as credential-shaped. */
  function emitted(errorText: string): string {
    const o = cleanObserved();
    o.invalidModel.settled = [{ ok: false, error: errorText }];
    try {
      return JSON.stringify(build(o));
    } catch (error) {
      if (refusesAsCredential(error)) return '';
      throw error;
    }
  }

  it.each(GLUED)('throws on %s, a value the J7 verbatim pattern refuses', (_name, value) => {
    expect(J7_VERBATIM.test(value)).toBe(true);
    const o = cleanObserved();
    o.invalidModel.settled = [{ ok: false, error: value }];
    expect(() => build(o)).toThrow(/^receipt refused: credential-shaped content at receipt\.journeys\.invalidModel\.settled\[0\]\.error$/);
  });

  it.each(GLUED)('never emits the token for %s through the runner path (preview, then the builder)', (_name, value) => {
    expect(emitted(preview(value))).not.toContain(TOKEN);
  });

  it('keeps the word boundary on Basic: a word merely ending in "basic" is not refused, a Basic credential still is', () => {
    expect(emitted('Claude SDK query failed: acidobasic balance unknown')).toContain('acidobasic balance unknown');
    expect(emitted('leak Basic dXNlcjpwYXNz')).toBe('');
  });

  it('builds a live-shaped clean receipt unflagged: no false refusal from the unanchored alternative', () => {
    const o = cleanObserved();
    o.midStreamCancel.servedModel = 'openai.gpt-6.1-sol';
    o.invalidModel.outcome = { status: 'failed', error: 'agent returned null', hasValue: false };
    o.invalidModel.settled = [{ ok: false, error: "Claude SDK query failed: There's an issue with the selected model (claude-adverse-not-a-model-000). It may not exist or you may not have access to it." }];
    const receipt = buildAdverseReceipt({ ...meta(), sdkEventTypes: ['assistant', 'result/success', 'stream_event', 'system/init', 'system/status'], journeys: o });
    expect(receipt).toMatchObject({ realised: true, pass: true, findings: [] });
  });
});

describe('O1 (bound by the owner): the receipt bound applies after the key-name mask grows the text', () => {
  it('keeps a mask-grown preview within its max (api_key, 7 characters, becomes [REDACTED-NAME], 15)', () => {
    const shown = buildPreview('api_key '.repeat(60), 300, { sanitize: sanitizeWorkbenchText });
    expect(shown).toContain('[REDACTED-NAME]');
    expect(shown.length).toBeLessThanOrEqual(300);
  });
});

/** Comment-blind source shape (the p5a F1 / a2g.6 O1 class): a pin read from raw text is satisfied by a comment naming the route. */
const codeOnly = (source: string): string => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`\\])\/\/.*$/gm, '$1');

describe('O3 (bound by the owner): receipt dirty bit (the wb-a2g.6 O4 family standard)', () => {
  it('records whether the working tree differed from HEAD at the revision, null when unknown or mistyped', () => {
    expect(buildAdverseReceipt({ ...meta(), dirty: false, journeys: cleanObserved() }).dirty).toBe(false);
    expect(buildAdverseReceipt({ ...meta(), dirty: true, journeys: cleanObserved() }).dirty).toBe(true);
    expect(build(cleanObserved()).dirty).toBeNull();
    expect(buildAdverseReceipt({ ...meta(), dirty: 'yes', journeys: cleanObserved() }).dirty).toBeNull();
  });

  it('the runner reads git status --porcelain from the package root and passes the bit to the builder (comment-blind)', () => {
    const code = codeOnly(readFileSync(new URL('../qa/workbench/live-adverse.mjs', import.meta.url), 'utf8'));
    expect(code).toMatch(/execFileSync\('git', \['status', '--porcelain'\], \{ cwd: new URL\('\.\.\/\.\.', import\.meta\.url\)/);
    expect(code).toMatch(/\bdirty: dirty\(\),/);
  });

  it('the comment stripper is not satisfied by a commented-out call', () => {
    expect(codeOnly("const a = 'x'; // dirty: dirty(),\n")).not.toMatch(/dirty: dirty\(\),/);
    expect(codeOnly("/* execFileSync('git', ['status', '--porcelain'] */ const b = 1;")).not.toContain('--porcelain');
    expect(codeOnly("const u = new URL('http://x'); // note")).toBe("const u = new URL('http://x'); ");
  });
});
