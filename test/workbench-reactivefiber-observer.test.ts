/** wb-6ze.9 (W13-E/VC-5): the ReactiveFiber reader adapter, the fifth NativeSnapshot producer beside Furnace, Forge, Claude and
 * HyperUnix (wb-6ze.7, whose shape it mirrors). It consumes exactly what the registered reactivefiber.render.preview provider
 * returns (src/workbench/providers/reactivefiber.ts) and projects one noncommitted-preview snapshot plus at most one
 * display-grouping edge. Cases R1-R9 quote docs/workbench (branch workbench/implementation-program) through the bead's
 * acceptance criteria 1-7. Nothing here needs an rf binary, a TTY or the network: the live rf tests stay untouched, and this
 * module never invokes rf (it projects an envelope the host already holds, so it can never issue a history-creating verb). */
import {createHash} from 'node:crypto';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, type JsonValue} from '../src/workbench/capability-registry.js';
import {type NativeRef, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';
import {
  REACTIVEFIBER_OBSERVATION_CONTRACT, type ReactiveFiberObservedRelation, type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext, reactivefiberTopology,
} from '../src/workbench/reactivefiber-observer.js';

type Json = {[key: string]: JsonValue};
const WS = '/tmp/reactivefiber-observer-ws';
const OPERATION = 'rfo_0123456789abcdefghijkl';
const WORKSPACE_ID = 'rfw_0123456789abcdefghijkl';
const GRAPH = `sha256:${'a1'.repeat(32)}`;
const TEXT = 'real context text SECRET-CONTEXT-BODY api_key=sk-live-abcdef0123456789';
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:tester'};
const context: ReactiveFiberTopologyContext = {scope, seam: 'rf-cli', capturedAt: '2026-10-15T10:00:00Z', observedAt: '2026-10-15T10:00:01Z'};
const operationRef: NativeRef = {provider: 'pi-workflow', type: 'node-call', id: 'wf_rf_1:0'};
const UNSAFE = /[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/;
const LIFECYCLE = /ownership|causation|dependency|hypothesis|nativeConfirmationRef/;
const digestOf = (text: string): string => createHash('sha256').update(text).digest('hex');

const work = (over: Json = {}): Json => ({source_capture_count: 3, fiber_signal_count: 5, component_render_count: 2, lens_resolution_count: 1,
  necessity_eval_count: 4, storage_write_count: 0, ...over});
const formula = (over: Json = {}): Json => ({context_window: 8192, output_reserve: 1024, occupied_tokens: 900, overhead: 100, safety_margin: 200,
  available_context_tokens: 5968, ...over});
function result(over: Json = {}): Json {
  return {ephemeral: true, render_id: null, output: {text: TEXT}, provenance: {graph_revision_id: GRAPH},
    budget: {formula_terms: formula()}, diagnostics_summary: {errors: 0, warnings: 1, has_errors: false, has_warnings: true},
    work: work(), ...over};
}
const rfDiagnostic = (over: Json = {}): Json => ({code: 'RF_RENDER_FAILED', severity: 'error', message: 'failed SECRET-DIAGNOSTIC', hint: 'hint SECRET-HINT',
  source: null, metadata: {secret: 'SECRET-METADATA'}, ...over});
/** The validated rf CLI envelope the provider returns as `source`, in the measured reactive-fiber.cli/v1 shape. */
function envelope(over: Json = {}): Json {
  return {schema: 'reactive-fiber.cli/v1', ok: true, command: 'context.render', operation_id: OPERATION, workspace: {id: WORKSPACE_ID, root: WS},
    transaction_id: null, result: result(), diagnostics: [], ...over};
}
const reading = (source: Json = envelope(), top: Json = {}): Json => ({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source, ...top});
const failure = (over: Json = {}): Json => envelope({ok: false, result: null, diagnostics: [rfDiagnostic()], ...over});
const withResult = (over: Json): Json => reading(envelope({result: result(over)}));
const without = (value: Json, key: string): Json => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected reactivefiberTopology to refuse');
}
const refusal = (value: Json, ctx: ReactiveFiberTopologyContext = context): CapabilityError => {
  const error = thrown(() => reactivefiberTopology(value as JsonValue, ctx));
  expect(error).toBeInstanceOf(CapabilityError);
  return error as CapabilityError;
};
function everyObject(value: unknown, visit: (item: object) => void): void {
  if (typeof value !== 'object' || value === null) return;
  visit(value);
  const children: unknown[] = Object.values(value);
  for (const child of children) everyObject(child, visit);
}
function bounded(topology: ReactiveFiberProjectionTopology): void {
  expect(topology.diagnostics.length).toBeLessThanOrEqual(8);
  for (const diagnostic of topology.diagnostics) {
    expect(diagnostic.length).toBeGreaterThan(0);
    expect(diagnostic.length).toBeLessThanOrEqual(200);
    expect(diagnostic).not.toMatch(UNSAFE);
  }
}

describe('ReactiveFiber render preview reader adapter', () => {
  it('exports the observation contract and exactly the relation statement ObservationProjection.relate accepts', () => {
    expect(REACTIVEFIBER_OBSERVATION_CONTRACT).toBe('workbench.reactivefiber-observation/v1');
    expectTypeOf<ReactiveFiberObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    expectTypeOf(reactivefiberTopology).parameter(0).toEqualTypeOf<JsonValue>();
    expectTypeOf(reactivefiberTopology).parameter(1).toEqualTypeOf<ReactiveFiberTopologyContext>();
    expectTypeOf(reactivefiberTopology).returns.toEqualTypeOf<ReactiveFiberProjectionTopology>();
  });

  // R1: docs/workbench/09 § "Reader adapters": "RF: render context provenance and context artifact references." and "Reader adapter
  // returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef}".
  it('R1: a clean noncommitted preview projects one snapshot keyed by operation_id with the graph digest as sourceRevision and a payload reference', () => {
    const topology = reactivefiberTopology(reading() as JsonValue, {...context, invocationId: 'wf_rf_1'});
    expect(topology.snapshots).toHaveLength(1);
    const [snapshot] = topology.snapshots;
    expect(snapshot).toStrictEqual({
      source: {provider: 'reactivefiber', type: 'context-preview', id: OPERATION, scope: WS}, scope, capturedAt: context.capturedAt,
      observedAt: context.observedAt, sourceRevision: GRAPH, coverage: 'complete', nativePayloadRef: `rf-output:sha256:${digestOf(TEXT)}`,
      kind: 'reactivefiber.render.preview.snapshot', evidenceRefs: [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`], trace: {invocationId: 'wf_rf_1'},
      node: {title: `RF context preview ${OPERATION}`, type: 'sdk-operation', statusTone: 'success',
        statusText: 'noncommitted preview (rf-cli) · 5968 of 8192 context tokens available · necessity evals 4 · 0 errors, 1 warnings'},
    });
    expect(topology.relations).toStrictEqual([]);
    bounded(topology);
    expect(topology.diagnostics.join('\n')).toContain('noncommitted');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    const node = projection.query({scope, limit: 10}).nodes.find(item => item.nativeRef.id === OPERATION);
    expect(node).toMatchObject({completeness: 'complete', freshness: 'current', sourceVersion: GRAPH, kind: 'reactivefiber.render.preview.snapshot',
      evidenceRefs: [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`], presentation: {statusTone: 'success'}});
  });

  // R2: docs/workbench/07 § "ReactiveFiberCLI provider": "Fixture text is never reported as real generated context."
  it('R2: an injected-fixture seam is labelled as such and is never reported as a live, complete or successful render', () => {
    const [snapshot] = reactivefiberTopology(reading() as JsonValue, {...context, seam: 'injected-fixture'}).snapshots;
    expect(snapshot.node.statusText).toMatch(/^fixture seam \(not a real render\)/);
    expect(snapshot.node.statusText).not.toContain('rf-cli');
    expect(snapshot.node.statusTone).toBe('unknown');
    expect(snapshot.coverage).toBe('partial');
    expect(refusal(reading(), {...context, seam: 'live' as 'rf-cli'}).category).toBe('validation');
  });

  // R3: the success-shape guards: each hand mutant of the noncommitted-preview shape is refused, never projected.
  it.each([
    ['ephemeral false', withResult({ephemeral: false})],
    ['ephemeral missing', reading(envelope({result: without(result(), 'ephemeral')}))],
    ['render_id set', withResult({render_id: 'rfr_0123456789abcdefghijkl'})],
    ['commit_seq set', withResult({commit_seq: 7})],
    ['transaction_id set', reading(envelope({transaction_id: 'rft_0123456789abcdefghijkl'}))],
    ['storage_write_count 1', withResult({work: work({storage_write_count: 1})})],
    ['storage_write_count missing', withResult({work: without(work(), 'storage_write_count')})],
    ['work with an extra key', withResult({work: work({extra: 1})})],
    ['graph digest uppercase', withResult({provenance: {graph_revision_id: `sha256:${'A1'.repeat(32)}`}})],
    ['graph digest short', withResult({provenance: {graph_revision_id: `sha256:${'a1'.repeat(31)}`}})],
    ['graph digest without prefix', withResult({provenance: {graph_revision_id: 'a1'.repeat(32)}})],
    ['graph digest missing', withResult({provenance: {}})],
    ['output text not a string', withResult({output: {text: 7}})],
    ['budget missing', reading(envelope({result: without(result(), 'budget')}))],
    ['budget term negative', withResult({budget: {formula_terms: formula({overhead: -1})}})],
    ['available tokens fractional', withResult({budget: {formula_terms: formula({available_context_tokens: 1.5})}})],
    ['diagnostics_summary missing', reading(envelope({result: without(result(), 'diagnostics_summary')}))],
    ['has_errors contradicts errors', withResult({diagnostics_summary: {errors: 2, warnings: 0, has_errors: false, has_warnings: false}})],
    ['has_warnings contradicts warnings', withResult({diagnostics_summary: {errors: 0, warnings: 0, has_errors: false, has_warnings: true}})],
    ['result null on ok', reading(envelope({result: null}))],
    ['ok not boolean', reading(envelope({ok: 'true'}))],
    ['schema other', reading(envelope({schema: 'reactive-fiber.cli/v2'}))],
    ['command other', reading(envelope({command: 'graph.show'}))],
    ['operation_id malformed', reading(envelope({operation_id: 'rfo_SHORT'}))],
    ['workspace id malformed', reading(envelope({workspace: {id: 'rfw_x', root: WS}}))],
    ['workspace null on success', reading(envelope({workspace: null}))],
    ['workspace root differs', reading(envelope({workspace: {id: WORKSPACE_ID, root: '/tmp/elsewhere'}}))],
    ['ninth envelope key', reading(envelope({extra: 1}))],
    ['seventh envelope key', reading(without(envelope(), 'diagnostics'))],
    ['malformed envelope diagnostic', reading(envelope({diagnostics: [{code: 'RF_X'}]}))],
    ['wrong contract', reading(envelope(), {contract: 'reactivefiber.render.other/v1'})],
    ['source missing', without(reading(), 'source')],
    ['source not an object', reading(envelope(), {source: 'text'})],
  ] as const)('R3: refuses with a typed error and projects nothing: %s', (_name, value) => {
    expect(refusal(value as Json).category).toBe('validation');
  });

  it('R3: a reading of another workspace is an authorization refusal', () => {
    expect(refusal(reading(envelope(), {workspaceRoot: '/tmp/elsewhere'})).category).toBe('authorization');
  });

  // R4: docs/workbench/07 "partial/refused status": ok:false with an RF_* error diagnostic stays failure; has_errors is partial.
  it('R4: an ok:false envelope with one RF_ error diagnostic projects a failure that surfaces only the code', () => {
    const topology = reactivefiberTopology(reading(failure()) as JsonValue, context);
    const [snapshot] = topology.snapshots;
    expect(snapshot.node.statusTone).toBe('failure');
    expect(snapshot.node.statusText).toBe('refused · RF_RENDER_FAILED');
    expect(snapshot.coverage).toBe('unknown');
    expect(snapshot.source.id).toBe(OPERATION);
    expect(snapshot).not.toHaveProperty('sourceRevision');
    expect(snapshot).not.toHaveProperty('nativePayloadRef');
    const text = JSON.stringify(topology);
    for (const secret of ['SECRET-DIAGNOSTIC', 'SECRET-HINT', 'SECRET-METADATA']) expect(text).not.toContain(secret);
    expect(new ObservationProjection().refresh(snapshot)).toBe('applied');
    // A failure that the rf CLI emitted before resolving a workspace has a null workspace and still projects.
    expect(reactivefiberTopology(reading(failure({workspace: null})) as JsonValue, context).snapshots[0].node.statusTone).toBe('failure');
  });

  it.each([
    ['a non-RF code', failure({diagnostics: [rfDiagnostic({code: 'HX_FAILED'})]})],
    ['a warning-severity primary diagnostic', failure({diagnostics: [rfDiagnostic({severity: 'warning'})]})],
    ['no diagnostic at all', failure({diagnostics: []})],
    ['a non-null result', failure({result: result()})],
    ['a transaction id', failure({transaction_id: 'rft_0123456789abcdefghijkl'})],
  ] as const)('R4: ok:false with %s is a contradictory failure envelope and is refused', (_name, source) => {
    expect(refusal(reading(source as Json)).category).toBe('validation');
  });

  it('R4: ok:true with diagnostics_summary.has_errors projects partial and never clean success', () => {
    const [snapshot] = reactivefiberTopology(withResult({diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}}) as JsonValue, context).snapshots;
    expect(snapshot.coverage).toBe('partial');
    expect(snapshot.node.statusTone).not.toBe('success');
    expect(snapshot.node.statusText).toContain('2 errors, 0 warnings');
    expect(snapshot.sourceRevision).toBe(GRAPH);
  });

  it('R4: an error-severity envelope diagnostic beside has_errors false still cannot read as success', () => {
    const [snapshot] = reactivefiberTopology(reading(envelope({diagnostics: [rfDiagnostic()]})) as JsonValue, context).snapshots;
    expect(snapshot.coverage).toBe('partial');
    expect(snapshot.node.statusTone).not.toBe('success');
  });

  it('R4: a render that exceeds its context budget is partial and says how far over', () => {
    const [snapshot] = reactivefiberTopology(withResult({budget: {formula_terms: formula({available_context_tokens: -40})}}) as JsonValue, context).snapshots;
    expect(snapshot.coverage).toBe('partial');
    expect(snapshot.node.statusTone).not.toBe('success');
    expect(snapshot.node.statusText).toContain('over budget by 40');
  });

  // R5: docs/workbench/09 negative control 4: "Two native sources reuse an identifier; provider-qualified keys do not collide."
  it('R5: provider-qualified keys do not collide with another provider reusing the same identifier', () => {
    const [here] = reactivefiberTopology(reading() as JsonValue, context).snapshots;
    const there = {...here, source: {provider: 'furnace', type: 'context-preview', id: OPERATION, scope: WS}, sourceRevision: undefined,
      kind: 'furnace.run.snapshot'};
    const hyper = {...here, source: {provider: 'hyperunix', type: 'query', id: OPERATION, scope: WS}, sourceRevision: undefined, kind: 'hyperunix.query.snapshot'};
    const projection = new ObservationProjection();
    expect(projection.refresh(here)).toBe('applied');
    expect(projection.refresh(there)).toBe('applied');
    expect(projection.refresh(hyper)).toBe('applied');
    const nodes = projection.query({scope, limit: 10}).nodes.filter(item => item.nativeRef.id === OPERATION);
    expect(nodes).toHaveLength(3);
    expect(new Set(nodes.map(item => item.key)).size).toBe(3);
    expect(here.source.provider).toBe('reactivefiber');
  });

  // R6: docs/workbench/09 negative control 10: "Large/secret payload does not leak into Pi tool result or screen by default."
  it('R6: output text, diagnostics and budget payloads never appear in any surfaced string', () => {
    const big = `${TEXT} ${'x'.repeat(1_000_000)}`;
    const topology = reactivefiberTopology(reading(envelope({result: result({output: {text: big}}), diagnostics: [rfDiagnostic({severity: 'warning'})]})) as JsonValue, context);
    const text = JSON.stringify(topology);
    for (const secret of ['SECRET-CONTEXT-BODY', 'sk-live-abcdef', 'api_key', 'SECRET-DIAGNOSTIC', 'SECRET-HINT', 'SECRET-METADATA']) expect(text).not.toContain(secret);
    expect(text.length).toBeLessThan(4000);
    expect(topology.snapshots[0].nativePayloadRef).toBe(`rf-output:sha256:${digestOf(big)}`);
    bounded(topology);
  });

  it('R6: host-supplied text is routed through the shared sanitizers: an unsafe invocation id or scope is refused before anything projects', () => {
    expect(refusal(reading(), {...context, invocationId: 'wf\u001b[31m'}).category).toBe('validation');
    expect(refusal(reading(), {...context, scope: {workspace: WS, principal: 'a‮b'}}).category).toBe('validation');
    expect(refusal(reading(), {...context, capturedAt: 'yesterday'}).category).toBe('validation');
    expect(refusal(reading(), {...context, operationRef: {provider: 'pi\u0007', type: 'node-call', id: 'x'}}).category).toBe('validation');
  });

  // R7: display grouping only, mirroring wb-6ze.7: no dependency, causation or ownership edge is ever invented.
  it('R7: the invoking operation gets one grouping edge with reactivefiber provenance and nothing else', () => {
    const topology = reactivefiberTopology(reading() as JsonValue, {...context, operationRef});
    expect(topology.relations).toStrictEqual([{scope, from: operationRef, to: topology.snapshots[0].source, kind: 'grouping',
      provenance: {source: 'reactivefiber', observedAt: context.observedAt}}]);
    expect(topology.relations[0].provenance).not.toHaveProperty('nativeConfirmationRef');
    expect(JSON.stringify(topology.relations)).not.toMatch(LIFECYCLE);
    const projection = new ObservationProjection();
    projection.refresh({source: operationRef, scope, capturedAt: context.capturedAt, observedAt: context.observedAt,
      node: {title: 'node', type: 'workflow', statusText: 'running', statusTone: 'active'}});
    expect(projection.refresh(topology.snapshots[0])).toBe('applied');
    for (const relation of topology.relations) projection.relate(relation);
    expect(projection.query({scope, parent: operationRef, limit: 10}).nodes.map(item => item.nativeRef)).toStrictEqual([topology.snapshots[0].source]);
    const parentKey = JSON.stringify([scope.workspace, scope.principal, operationRef.provider, operationRef.type, '', operationRef.id]);
    expect(projection.relations({scope, from: parentKey}).map(edge => [edge.kind, edge.provenance.source])).toStrictEqual([['grouping', 'reactivefiber']]);
  });

  it('R7: a failure projection also groups under the invoking operation, and an operation aliasing the node itself is refused', () => {
    expect(reactivefiberTopology(reading(failure()) as JsonValue, {...context, operationRef}).relations).toHaveLength(1);
    const self: NativeRef = {provider: 'reactivefiber', type: 'context-preview', id: OPERATION, scope: WS};
    expect(refusal(reading(), {...context, operationRef: self}).category).toBe('validation');
  });

  // R8: purity: deterministic, no input mutation, deeply frozen, nothing shared with the caller.
  it('R8: the projection is pure, deterministic and deeply frozen, and shares nothing with its input', () => {
    const input = reading();
    const before = JSON.stringify(input);
    const ctx = {...context, operationRef: {...operationRef}};
    const first = reactivefiberTopology(input as JsonValue, ctx);
    const second = reactivefiberTopology(input as JsonValue, ctx);
    expect(JSON.stringify(input)).toBe(before);
    expect(first).toStrictEqual(second);
    everyObject(first, item => { expect(Object.isFrozen(item)).toBe(true); });
    expect(first.relations[0].from).not.toBe(ctx.operationRef);
    expect(first.snapshots[0].scope).not.toBe(scope);
  });
});
