/** wb-6ze.3 (W13/VC-5): the Claude session reader adapter, the third linked-topology provider beside Furnace (wb-752.1) and
 * Forge (wb-6hb.2). Every case quotes docs/workbench through the bead's acceptance A1-A8; the rest pin "no invented ids". */
import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';
import {type InspectorModel, initialInspectorState, layoutInspector, reduceInspectorKey} from '../src/ui/workflow-inspector.js';
import {CapabilityError} from '../src/workbench/capability-registry.js';
import type {ClaudeCallIdentity} from '../src/workbench/claude-host.js';
import {type ClaudeObservedRelation, type ClaudeProjectionTopology, type ClaudeTopologyInput, projectClaudeTopology} from '../src/workbench/claude-topology.js';
import {type NativeRef, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';
import type {ClaudeNativeObservation} from '../src/workflow/progress.js';

// A8 "no SDK": nothing this suite loads may reach the Claude Agent SDK; the adapter reads one payload-free observer sample.
vi.mock('@anthropic-ai/claude-agent-sdk', () => {
  throw new Error('the Claude topology adapter must not load the Claude Agent SDK');
});

type Tool = ClaudeNativeObservation['tools'][number];
const scope: ObservationScope = {workspace: '/tmp/claude-topology-ws', principal: 'operator'};
const invocationId = 'wf_5d0c9e3a7b1f';
const call: ClaudeCallIdentity = {agentId: 'wf-agent-2', index: 2, label: 'review the diff'};
const observedAt = '2026-10-15T07:30:00.000Z';
const agentRef: NativeRef = {provider: 'pi-workflow', type: 'agent-call', id: `${invocationId}:${call.index}`};
const sessionRef = (id = 'sess-1'): NativeRef => ({provider: 'claude-agent-sdk', type: 'session', id});
const toolRef = (id: string): NativeRef => ({provider: 'claude-agent-sdk', type: 'tool-use', id});
const tool = (toolUseId: string, state: Tool['state'] = 'completed', name = 'Read'): Tool => ({toolUseId, name, state});
function observation(overrides: Partial<ClaudeNativeObservation> = {}): ClaudeNativeObservation {
  return {provider: 'claude-agent-sdk', sessionId: 'sess-1', lastMessageId: 'm-9', observedMessages: 7, assistantCharacters: 42,
    tools: [tool('toolu_read_a'), tool('toolu_bash_b', 'started', 'Bash')], toolsTruncated: false, freshness: 'current', ...overrides};
}
/** The observer's sample before the SDK reported a session id (a message uuid may already be known). */
const preInit = (): ClaudeNativeObservation =>
  ({provider: 'claude-agent-sdk', lastMessageId: 'm-0', observedMessages: 1, assistantCharacters: 0, tools: [], toolsTruncated: false, freshness: 'current'});
const input = (snapshot: ClaudeNativeObservation = observation(), overrides: Partial<ClaudeTopologyInput> = {}): ClaudeTopologyInput =>
  ({call, snapshot, scope, invocationId, observedAt, sequence: 3, ...overrides});
const sources = (topology: ClaudeProjectionTopology): NativeRef[] => topology.snapshots.map(snapshot => snapshot.source);
const ofType = (topology: ClaudeProjectionTopology, type: string) => topology.snapshots.filter(snapshot => snapshot.source.type === type);
function keyOf(projection: ObservationProjection, ref: NativeRef): string {
  const node = projection.query({scope, ref, limit: 1}).nodes[0];
  if (!node) throw new Error(`no projected node for ${ref.type} ${ref.id}`);
  return node.key;
}
/** The parent's wiring, exactly as the Furnace topology is applied: refresh every snapshot, then relate every relation. */
function apply(projection: ObservationProjection, topology: ClaudeProjectionTopology): string[] {
  const results = topology.snapshots.map(snapshot => projection.refresh(snapshot));
  for (const relation of topology.relations) projection.relate(relation);
  return results;
}
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected the topology to refuse');
}
function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    const children: unknown[] = Object.values(value);
    for (const child of children) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
function everyObject(value: unknown, visit: (item: object) => void): void {
  if (typeof value !== 'object' || value === null) return;
  visit(value);
  const children: unknown[] = Object.values(value);
  for (const child of children) everyObject(child, visit);
}
const UNSAFE = /[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/;
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/;

afterEach(() => { vi.restoreAllMocks(); });

describe('Claude session reader adapter topology', () => {
  it('A1: one sample with a session, a message reference and two tools projects agent-call, session and two tool-use snapshots', () => {
    const topology = projectClaudeTopology(input());
    expect(sources(topology)).toStrictEqual([agentRef, sessionRef(), toolRef('toolu_read_a'), toolRef('toolu_bash_b')]);
    for (const snapshot of topology.snapshots) {
      expect(snapshot).toMatchObject({scope, capturedAt: observedAt, observedAt, sequence: 3, trace: {invocationId}});
      expect(['partial', 'unknown']).toContain(snapshot.coverage);
      expect(snapshot.node.title.length).toBeGreaterThan(0);
      expect(snapshot).not.toHaveProperty('nativePayloadRef');
    }
    const [agent, session, read, bash] = topology.snapshots;
    expect(agent).toStrictEqual({source: agentRef, scope, capturedAt: observedAt, observedAt, sequence: 3, coverage: 'partial',
      node: {title: 'review the diff', type: 'agent', statusText: 'observed-running', statusTone: 'active'}, kind: 'claude.call', trace: {invocationId}});
    expect(session).toStrictEqual({source: sessionRef(), scope, capturedAt: observedAt, observedAt, sequence: 3, coverage: 'partial',
      node: {title: 'review the diff · session', type: 'agent', statusText: 'observed-running', statusTone: 'active'}, kind: 'claude.session',
      trace: {invocationId}, evidenceRefs: ['claude-message:m-9']});
    expect(read).toStrictEqual({source: toolRef('toolu_read_a'), scope, capturedAt: observedAt, observedAt, sequence: 3, coverage: 'partial',
      node: {title: 'Read', type: 'sdk-operation', statusText: 'completed', statusTone: 'success'}, kind: 'claude.tool-use', trace: {invocationId}});
    expect(bash.node).toStrictEqual({title: 'Bash', type: 'sdk-operation', statusText: 'started', statusTone: 'active'});
    expect(topology.truncated).toBe(false);
    // Only known observation fields are read: a transcript-shaped field smuggled into the sample never reaches a snapshot.
    const smuggled = {...observation(), transcript: 'SECRET TRANSCRIPT BODY', text: 'assistant said SECRET'} as ClaudeNativeObservation;
    expect(JSON.stringify(projectClaudeTopology(input(smuggled)))).not.toContain('SECRET');
  });

  it('A2: the pre-init agent-call key survives native session assignment, so the post-init sample adds no duplicate row', () => {
    const before = projectClaudeTopology(input(preInit(), {sequence: 1}));
    expect(sources(before)).toStrictEqual([agentRef]);
    expect(before.relations).toStrictEqual([]);
    // claude-message refs resolve through the session's own loader (docs/workbench/20), never through the agent-call row.
    expect(before.snapshots[0]).not.toHaveProperty('evidenceRefs');
    const after = projectClaudeTopology(input(observation({tools: [tool('toolu_read_a')]}), {sequence: 2}));
    expect(after.snapshots[0].source).toStrictEqual(before.snapshots[0].source);
    expect(after.relations[0]).toStrictEqual({scope, from: agentRef, to: sessionRef(), kind: 'ownership',
      provenance: {source: 'pi-workflow', observedAt, nativeConfirmationRef: 'sess-1'}});
    const projection = new ObservationProjection();
    const viewport = {scope, invocationId, offset: 0, limit: 50};
    expect(apply(projection, before)).toStrictEqual(['applied']);
    const agentKey = keyOf(projection, agentRef);
    expect(projection.window(viewport).total).toBe(1);
    expect(projection.indexOf({scope, invocationId, key: agentKey})).toBe(0);
    expect(apply(projection, after)).toStrictEqual(['applied', 'applied', 'applied']);
    const distinct = new Set([...sources(before), ...sources(after)].map(ref => JSON.stringify(ref)));
    expect(distinct.size).toBe(3);
    expect(projection.window(viewport).total).toBe(distinct.size);
    expect(projection.indexOf({scope, invocationId, key: agentKey})).toBe(0);
    expect(projection.window(viewport).nodes.map(node => node.nativeRef)).toStrictEqual([agentRef, sessionRef(), toolRef('toolu_read_a')]);
    expect(projection.relations({scope, from: agentKey, limit: 100})).toStrictEqual([{from: agentKey, to: keyOf(projection, sessionRef()),
      kind: 'ownership', provenance: {source: 'pi-workflow', observedAt, nativeConfirmationRef: 'sess-1'}}]);
  });

  it('A3: exactly one native-confirmed ownership edge, and per tool one causation plus one grouping edge, all accepted by relate()', () => {
    expectTypeOf<ClaudeObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    const topology = projectClaudeTopology(input());
    expect(topology.relations.filter(relation => relation.kind === 'ownership')).toStrictEqual([{scope, from: agentRef, to: sessionRef(),
      kind: 'ownership', provenance: {source: 'pi-workflow', observedAt, nativeConfirmationRef: 'sess-1'}}]);
    const toolIds = ['toolu_read_a', 'toolu_bash_b'];
    for (const id of toolIds) {
      const provenance = {source: 'claude-observer', observedAt, nativeConfirmationRef: id};
      expect(topology.relations.filter(relation => relation.to.id === id)).toStrictEqual([
        {scope, from: sessionRef(), to: toolRef(id), kind: 'causation', provenance},
        {scope, from: sessionRef(), to: toolRef(id), kind: 'grouping', provenance},
      ]);
    }
    expect(topology.relations).toHaveLength(1 + 2 * toolIds.length);
    expect(topology.relations.some(relation => relation.kind === 'dependency' || relation.kind === 'hypothesis')).toBe(false);
    const present = new Set(sources(topology).map(ref => JSON.stringify(ref)));
    for (const relation of topology.relations) {
      expect(present.has(JSON.stringify(relation.from))).toBe(true);
      expect(present.has(JSON.stringify(relation.to))).toBe(true);
    }
    const projection = new ObservationProjection();
    expect(() => apply(projection, topology)).not.toThrow();
    const sessionKey = keyOf(projection, sessionRef());
    const outgoing = projection.relations({scope, from: sessionKey, limit: 100});
    for (const id of toolIds) {
      expect(outgoing.filter(relation => relation.to === keyOf(projection, toolRef(id))).map(relation => relation.kind).sort()).toStrictEqual(['causation', 'grouping']);
    }
    expect(projection.query({scope, parent: sessionRef(), limit: 10}).nodes.map(node => node.nativeRef)).toStrictEqual(toolIds.map(toolRef));
    expect(projection.query({scope, parent: agentRef, limit: 10}).nodes.map(node => node.nativeRef)).toStrictEqual([sessionRef()]);
    // The provenance is what satisfies relate()'s ownership rule (observation.ts:385): another source stating it is refused.
    const [ownership] = topology.relations;
    expect(() => projection.relate({...ownership, provenance: {...ownership.provenance, source: 'claude-observer'}})).toThrow(/Ownership requires/);
  });

  it('A4: workbench run, workflow agent and Claude session identities stay distinct; no session is synthesized before the SDK reports one', () => {
    for (const snapshot of [preInit(), observation({sessionId: '', tools: []}), observation({sessionId: undefined, tools: []})]) {
      const topology = projectClaudeTopology(input(snapshot));
      expect(sources(topology).some(ref => ref.provider === 'claude-agent-sdk')).toBe(false);
      expect(sources(topology)).toStrictEqual([agentRef]);
      expect(topology.relations).toStrictEqual([]);
    }
    for (const sessionId of ['sess-1', 'a1b3c5d7-e9f1-4a3b-8c5d-7e9f1a3b5c7d', 'session_alpha']) {
      const topology = projectClaudeTopology(input(observation({sessionId})));
      const [agent, session, ...tools] = topology.snapshots;
      expect(agent.source.id).toBe(`${invocationId}:${call.index}`);
      expect(agent.source.id).not.toContain(sessionId);
      expect(session.source).toStrictEqual(sessionRef(sessionId));
      for (const fragment of [invocationId, call.agentId, String(call.index)]) expect(session.source.id).not.toContain(fragment);
      expect(tools.map(item => item.source.id)).toStrictEqual(observation().tools.map(item => item.toolUseId));
      // The workflow's own wf-agent-N handle is never projected as, or into, any identity.
      expect(JSON.stringify(topology)).not.toContain(call.agentId);
    }
  });

  it('A5: tool states keep their literal native text; observation_lost and cancelled are UNKNOWN, never success or failure', () => {
    const states = [['started', 'active'], ['completed', 'success'], ['failed', 'failure'], ['refused', 'failure']] as const;
    const live = projectClaudeTopology(input(observation({tools: states.map(([state], n) => tool(`toolu_${state}_${n}`, state))})));
    expect(ofType(live, 'tool-use').map(snapshot => [snapshot.node.statusText, snapshot.node.statusTone])).toStrictEqual(states.map(([state, tone]) => [state, tone]));
    const lost = projectClaudeTopology(input(observation({terminal: 'observation_lost', freshness: 'unknown'})));
    const [agent, session] = lost.snapshots;
    for (const node of [agent.node, session.node]) expect(node).toMatchObject({statusText: 'observation_lost', statusTone: 'unknown'});
    expect(session.coverage).toBe('unknown');
    expect(agent.coverage).toBe('partial');
    const cancelled = projectClaudeTopology(input(observation({terminal: 'cancelled'})));
    for (const snapshot of cancelled.snapshots.slice(0, 2)) expect(snapshot.node).toMatchObject({statusText: 'cancelled', statusTone: 'unknown'});
    for (const [terminal, tone] of [['succeeded', 'success'], ['failed', 'failure']] as const) {
      const settled = projectClaudeTopology(input(observation({terminal})));
      for (const snapshot of settled.snapshots.slice(0, 2)) expect(snapshot.node).toMatchObject({statusText: terminal, statusTone: tone});
    }
  });

  it('A5: a started tool in a settled or lost call is last-known, never a spinner; a live call whose stream is unknown is not active', () => {
    for (const terminal of ['succeeded', 'failed', 'cancelled', 'observation_lost'] as const) {
      const topology = projectClaudeTopology(input(observation({terminal, tools: [tool('toolu_open', 'started'), tool('toolu_done')]})));
      const [open, done] = ofType(topology, 'tool-use');
      expect(open.node).toStrictEqual({title: 'Read', type: 'sdk-operation', statusText: 'started', statusTone: 'unknown'});
      expect(done.node).toMatchObject({statusText: 'completed', statusTone: 'success'});
    }
    const unknown = projectClaudeTopology(input(observation({freshness: 'unknown', tools: [tool('toolu_open', 'started')]})));
    const [agent, session, open] = unknown.snapshots;
    for (const node of [agent.node, session.node]) expect(node).toMatchObject({statusText: 'observed-running', statusTone: 'unknown'});
    expect(open.node).toMatchObject({statusText: 'started', statusTone: 'unknown'});
    expect([session.coverage, open.coverage]).toStrictEqual(['unknown', 'unknown']);
  });

  it('A6: a replayed or out-of-order sample never regresses status or double counts', () => {
    const done = projectClaudeTopology(input(observation({terminal: 'succeeded', tools: [tool('toolu_read_a'), tool('toolu_bash_b', 'completed', 'Bash')]}), {sequence: 2}));
    const live = projectClaudeTopology(input(observation({tools: [tool('toolu_read_a', 'started'), tool('toolu_bash_b', 'started', 'Bash')]}), {sequence: 1}));
    expect(sources(live)).toStrictEqual(sources(done));
    const projection = new ObservationProjection();
    expect(apply(projection, done)).toStrictEqual(done.snapshots.map(() => 'applied'));
    const counted = projection.stats();
    expect(counted).toMatchObject({nodes: 4, edges: 5});
    expect(apply(projection, live)).toStrictEqual(live.snapshots.map(() => 'out-of-order'));
    const status = (ref: NativeRef) => projection.query({scope, ref, limit: 1}).nodes[0].presentation.statusText;
    expect(status(sessionRef())).toBe('succeeded');
    expect(status(agentRef)).toBe('succeeded');
    expect(status(toolRef('toolu_bash_b'))).toBe('completed');
    expect(projection.stats()).toStrictEqual(counted);
    expect(apply(projection, done)).toStrictEqual(done.snapshots.map(() => 'applied'));
    expect(projection.stats().nodes).toBe(counted.nodes);
    expect(projection.stats().edges).toBe(counted.edges);
  });

  it('A7: secrets, terminal escapes and bidi marks never reach a title or the serialized topology', () => {
    const label = 'deploy \u001b[31mBearer abc123‮';
    const topology = projectClaudeTopology(input(observation({tools: [tool('toolu_secret', 'completed', 'deploy api_key=xyz now')]}), {call: {...call, label}}));
    const [agent, session, used] = topology.snapshots;
    expect(agent.node.title).toBe('deploy [REDACTED]');
    expect(session.node.title).toBe('deploy [REDACTED] · session');
    expect(used.node.title).toBe('deploy api_key=[REDACTED] now');
    for (const snapshot of topology.snapshots) expect(snapshot.node.title).not.toMatch(UNSAFE);
    const text = JSON.stringify(topology);
    expect(text).not.toContain('abc123');
    expect(text).not.toContain('xyz');
    // An escape, control byte or bidi mark glued to a credential cannot hide it from the redactor.
    for (const glued of ['Bearer\u0007abc123', 'Bearer\u001b[0mabc123', 'Bearer⁦abc123', 'run password=\u0000abc123']) {
      const sample = projectClaudeTopology(input(observation({tools: [tool('toolu_glued', 'completed', glued)]}), {call: {...call, label: glued}}));
      const serialized = JSON.stringify(sample);
      expect(serialized).not.toContain('abc123');
      for (const snapshot of sample.snapshots) expect(snapshot.node.title).not.toMatch(UNSAFE);
    }
  });

  it('A7: titles stay within 120 (agent, session) and 80 (tool-use) characters, keep the session suffix and never split a character', () => {
    const topology = projectClaudeTopology(input(observation({tools: [tool('toolu_long', 'completed', 'y'.repeat(500))]}), {call: {...call, label: `a${'😀'.repeat(150)}`}}));
    const [agent, session, used] = topology.snapshots;
    expect(agent.node.title.length).toBeLessThanOrEqual(120);
    expect(session.node.title.length).toBeLessThanOrEqual(120);
    expect(session.node.title.endsWith(' · session')).toBe(true);
    expect(used.node.title.length).toBeLessThanOrEqual(80);
    for (const snapshot of topology.snapshots) {
      expect(snapshot.node.title).toContain('[truncated]');
      expect(snapshot.node.title).not.toMatch(LONE_SURROGATE);
    }
    // Text that sanitizes to nothing shows a fixed placeholder, never an id, and the projection still accepts it.
    const blank = projectClaudeTopology(input(observation({tools: [tool('toolu_blank', 'completed', '\u001b[0m \u0007')]}), {call: {...call, label: '‮\u0007 '}}));
    expect(blank.snapshots.map(snapshot => snapshot.node.title)).toStrictEqual(['agent', 'agent · session', 'unknown']);
    expect(apply(new ObservationProjection(), blank)).toStrictEqual(['applied', 'applied', 'applied']);
  });

  it('A8: an evicting observer sample keeps exactly its 16 tools, says truncated and never invents the evicted ones', () => {
    const tools = Array.from({length: 16}, (_, n) => tool(`toolu_${String(n + 184).padStart(3, '0')}`));
    const topology = projectClaudeTopology(input(observation({tools, toolsTruncated: true})));
    expect(topology.truncated).toBe(true);
    expect(ofType(topology, 'tool-use').map(snapshot => snapshot.source.id)).toStrictEqual(tools.map(item => item.toolUseId));
    expect(topology.snapshots[1].coverage).toBe('partial');
    expect(topology.relations).toHaveLength(1 + 2 * 16);
    expect(projectClaudeTopology(input()).truncated).toBe(false);
    everyObject(topology, item => {
      for (const key of Object.keys(item)) expect(key).not.toMatch(/^(?:tokens|cost|usage|outputTokens)$/i);
    });
  });

  it('A8: identical input yields deep-equal, deeply frozen, JSON-stable output with no clock, randomness, network or input mutation', () => {
    const now = vi.spyOn(Date, 'now');
    const random = vi.spyOn(Math, 'random');
    const fetch = vi.spyOn(globalThis, 'fetch');
    const sample = deepFreeze(structuredClone(input(observation({terminal: 'succeeded'}), {definitionDigest: 'sha256:def', subjectBasis: 'basis:abc'})));
    const pristine = structuredClone(sample);
    const first = projectClaudeTopology(sample);
    const second = projectClaudeTopology(sample);
    expect(first).toStrictEqual(second);
    expect(first).not.toBe(second);
    expect(sample).toStrictEqual(pristine);
    for (const spy of [now, random, fetch]) expect(spy).not.toHaveBeenCalled();
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.snapshots)).toBe(true);
    expect(Object.isFrozen(first.relations)).toBe(true);
    everyObject(first, item => { expect(Object.isFrozen(item)).toBe(true); });
    expect(JSON.parse(JSON.stringify(first))).toStrictEqual(first);
    // Nothing in the result aliases the caller's objects.
    expect(first.snapshots.every(snapshot => snapshot.scope !== sample.scope)).toBe(true);
    expect(first.relations.every(relation => relation.scope !== sample.scope)).toBe(true);
    expect(() => first.snapshots.push(first.snapshots[0])).toThrow(TypeError);
  });

  it('passes definitionDigest and subjectBasis through on the host-owned agent-call only, and only when supplied', () => {
    const supplied = projectClaudeTopology(input(observation(), {definitionDigest: 'sha256:def', subjectBasis: 'basis:abc'}));
    expect(supplied.snapshots[0]).toMatchObject({definitionDigest: 'sha256:def', subjectBasis: 'basis:abc'});
    for (const snapshot of supplied.snapshots.slice(1)) {
      expect(snapshot).not.toHaveProperty('definitionDigest');
      expect(snapshot).not.toHaveProperty('subjectBasis');
    }
    const absent = projectClaudeTopology(input());
    for (const snapshot of absent.snapshots) {
      expect(snapshot).not.toHaveProperty('definitionDigest');
      expect(snapshot).not.toHaveProperty('subjectBasis');
    }
    const projection = new ObservationProjection();
    apply(projection, supplied);
    expect(projection.query({scope, basis: 'basis:abc', limit: 10}).nodes.map(node => node.nativeRef)).toStrictEqual([agentRef]);
  });

  it('withholds a native session id it cannot use verbatim instead of repairing it, and attaches nothing under it', () => {
    for (const sessionId of ['sess\u001b[2J-1', 'sess‮-1', `s${'x'.repeat(300)}`, 'sk-ant-api03-SECRETSESSION']) {
      const topology = projectClaudeTopology(input(observation({sessionId})));
      expect(sources(topology)).toStrictEqual([agentRef]);
      expect(topology.relations).toStrictEqual([]);
      expect(topology.truncated).toBe(true);
      const text = JSON.stringify(topology);
      expect(text).not.toContain('sess-1');
      expect(text).not.toContain('SECRETSESSION');
      expect(apply(new ObservationProjection(), topology)).toStrictEqual(['applied']);
    }
    // Tools reported without any session id are not attached to the agent call either.
    const orphan = projectClaudeTopology(input(observation({sessionId: undefined})));
    expect(sources(orphan)).toStrictEqual([agentRef]);
    expect(orphan.relations).toStrictEqual([]);
    expect(orphan.truncated).toBe(true);
  });

  it('withholds an unusable tool id and never mangles one; a repeated id folds like the observer and over-bound tools keep the newest 16', () => {
    const malformed = [tool('toolu_ok'), tool(''), tool('toolu\u0000nul'), tool('toolu⁧bidi'), tool(`toolu_${'z'.repeat(300)}`),
      {toolUseId: 7, name: 'Read', state: 'completed'}, null] as unknown as Tool[];
    const withheld = projectClaudeTopology(input(observation({tools: malformed})));
    expect(ofType(withheld, 'tool-use').map(snapshot => snapshot.source.id)).toStrictEqual(['toolu_ok']);
    expect(withheld.relations).toHaveLength(3);
    expect(withheld.truncated).toBe(true);
    expect(JSON.stringify(withheld)).not.toMatch(/toolu ?nul|toolu ?bidi|toolu_zz/);
    expect(apply(new ObservationProjection(), withheld).every(result => result === 'applied')).toBe(true);
    const repeated = projectClaudeTopology(input(observation({tools: [tool('toolu_a', 'started', 'Grep'), tool('toolu_b'), tool('toolu_a', 'completed', 'renamed')]})));
    expect(ofType(repeated, 'tool-use').map(snapshot => [snapshot.source.id, snapshot.node.title, snapshot.node.statusText])).toStrictEqual([
      ['toolu_a', 'Grep', 'completed'], ['toolu_b', 'Read', 'completed']]);
    expect(repeated.relations).toHaveLength(5);
    expect(repeated.truncated).toBe(false);
    const many = Array.from({length: 20}, (_, n) => tool(`toolu_${String(n).padStart(2, '0')}`));
    const bounded = projectClaudeTopology(input(observation({tools: many})));
    expect(ofType(bounded, 'tool-use').map(snapshot => snapshot.source.id)).toStrictEqual(many.slice(4).map(item => item.toolUseId));
    expect(bounded.truncated).toBe(true);
  });

  it('lists the session message reference only when it is an exact native uuid, never a mangled one', () => {
    for (const lastMessageId of [undefined, '', 'm-\u001b[31m9', 'm‮9', `m-${'9'.repeat(300)}`]) {
      const topology = projectClaudeTopology(input(observation({lastMessageId})));
      expect(topology.snapshots[1].source).toStrictEqual(sessionRef());
      expect(topology.snapshots[1]).not.toHaveProperty('evidenceRefs');
      expect(JSON.stringify(topology)).not.toContain('claude-message:');
    }
    const uuid = '0f8e7d6c-5b4a-4938-a7b6-c5d4e3f2a1b0';
    expect(projectClaudeTopology(input(observation({lastMessageId: uuid}))).snapshots[1].evidenceRefs).toStrictEqual([`claude-message:${uuid}`]);
  });

  it('classifies a terminal or tool state outside the native vocabulary as unknown and quotes it sanitized', () => {
    const odd = {...observation(), terminal: 'constructor', tools: [{toolUseId: 'toolu_odd', name: 'Read', state: 'teleported\u001b[5m'}]} as unknown as ClaudeNativeObservation;
    const topology = projectClaudeTopology(input(odd));
    const [agent, session, used] = topology.snapshots;
    for (const node of [agent.node, session.node]) expect(node).toMatchObject({statusText: 'constructor', statusTone: 'unknown'});
    expect(used.node).toMatchObject({statusText: 'teleported', statusTone: 'unknown'});
    expect(apply(new ObservationProjection(), topology).every(result => result === 'applied')).toBe(true);
    const garbled = projectClaudeTopology(input({...observation(), terminal: 'exploded\u0007now'} as unknown as ClaudeNativeObservation));
    expect(garbled.snapshots[0].node).toMatchObject({statusText: 'exploded now', statusTone: 'unknown'});
    // Only an explicitly current stream is current; any other freshness label is not a confirmation.
    const stale = projectClaudeTopology(input({...observation(), freshness: 'stale'} as unknown as ClaudeNativeObservation));
    expect(stale.snapshots.slice(0, 2).map(snapshot => snapshot.node.statusTone)).toStrictEqual(['unknown', 'unknown']);
    expect(stale.snapshots[1].coverage).toBe('unknown');
    // A tool list that is not a list carries no tool node, and the topology says it may be missing some.
    const listless = projectClaudeTopology(input({...observation(), tools: 'Read,Bash'} as unknown as ClaudeNativeObservation));
    expect(sources(listless)).toStrictEqual([agentRef, sessionRef()]);
    expect(listless.truncated).toBe(true);
  });

  it('refuses host inputs a projection would reject, with a typed validation error and no partial topology', () => {
    const bad: Partial<ClaudeTopologyInput>[] = [
      {observedAt: '2026-10-15T07:30:00'}, {observedAt: 'not-a-time'}, {sequence: -1}, {sequence: 1.5}, {sequence: Number.NaN},
      {scope: {workspace: '', principal: 'operator'}}, {scope: {workspace: '/tmp/ws', principal: 'op\u0007'}},
      {invocationId: ''}, {invocationId: 'wf\u001b[2J'}, {invocationId: 'w'.repeat(300)},
      {call: {...call, index: -1}}, {call: {...call, index: 0.5}},
      {definitionDigest: ''}, {subjectBasis: 'basis\u0000'},
      {snapshot: {...observation(), provider: 'pi-workflow'} as unknown as ClaudeNativeObservation},
    ];
    for (const override of bad) {
      const error = thrown(() => projectClaudeTopology(input(observation(), override)));
      expect(error).toBeInstanceOf(CapabilityError);
      expect(error).toMatchObject({category: 'validation'});
      expect((error as CapabilityError).message).toMatch(/^Claude topology refused: /);
    }
  });

  it('every sample shape the observer can emit applies to a default projection without a refusal or an orphan edge', () => {
    const samples: ClaudeNativeObservation[] = [preInit(), observation(), observation({tools: []}), observation({toolsTruncated: true}),
      ...(['succeeded', 'failed', 'cancelled'] as const).map(terminal => observation({terminal})),
      observation({terminal: 'observation_lost', freshness: 'unknown'})];
    samples.forEach((sample, sequence) => {
      const topology = projectClaudeTopology(input(sample, {sequence}));
      const projection = new ObservationProjection();
      expect(apply(projection, topology).every(result => result === 'applied')).toBe(true);
      expect(projection.stats()).toMatchObject({nodes: topology.snapshots.length, edges: topology.relations.length});
    });
  });

  it('the inspector links the agent call to its session by ownership and the session to its tools, and offers the lazy transcript', () => {
    const projection = new ObservationProjection();
    apply(projection, projectClaudeTopology(input()));
    const model: InspectorModel = {projection, scope, invocationId, title: 'Claude workflow', status: 'running'};
    const graph = layoutInspector(model, {...initialInspectorState(), view: 'graph'}, {width: 140, rows: 40, ascii: true}).join('\n');
    expect(graph).toContain('ownership -> claude-agent-sdk/session/sess-1 [pi-workflow]');
    expect(graph).toContain('causation <- claude-agent-sdk/session/sess-1 [claude-observer]');
    expect(graph).toContain('grouping <- claude-agent-sdk/session/sess-1 [claude-observer]');
    expect(graph).not.toMatch(/dependency|hypothesis/);
    const onSession = {...initialInspectorState(), view: 'details' as const, index: 1};
    const details = layoutInspector(model, onSession, {width: 140, rows: 40, ascii: true}).join('\n');
    expect(details).toContain('Native ref: claude-agent-sdk/session/sess-1');
    expect(details).toContain('claude-message:m-9');
    expect(reduceInspectorKey('c', onSession, model)?.action).toBe('transcript');
  });
});
