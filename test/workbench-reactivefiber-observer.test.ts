/** wb-6ze.9 (W13-E/VC-5): the ReactiveFiber reader adapter, the fifth NativeSnapshot producer beside Furnace, Forge, Claude and
 * HyperUnix (wb-6ze.7, whose shape it mirrors). It consumes exactly what the registered reactivefiber.render.preview provider
 * returns (src/workbench/providers/reactivefiber.ts) and projects one noncommitted-preview snapshot plus at most one
 * display-grouping edge. Cases R1-R9 quote docs/workbench (branch workbench/implementation-program) through the bead's
 * acceptance criteria 1-7. Nothing here needs an rf binary, a TTY or the network: the live rf tests stay untouched, and this
 * module never invokes rf (it projects an envelope the host already holds, so it can never issue a history-creating verb). */
import {createHash} from 'node:crypto';
import {chmodSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {afterEach, describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, type JsonValue} from '../src/workbench/capability-registry.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import {type NativeRef, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';
import {nativeReactiveFiberPreview} from '../src/workbench/providers/reactivefiber.js';
import {
  REACTIVEFIBER_OBSERVATION_CONTRACT, type ReactiveFiberObservedRelation, type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext, reactivefiberTopology,
} from '../src/workbench/reactivefiber-observer.js';
import {installScratchLeakGuard, makeScratch, removeScratch} from './helpers/scratch.js';

type Json = {[key: string]: JsonValue};
const WS = '/tmp/reactivefiber-observer-ws';
const OPERATION = 'rfo_0123456789abcdefghijkl';
const WORKSPACE_ID = 'rfw_0123456789abcdefghijkl';
const GRAPH = `sha256:${'a1'.repeat(32)}`;
const TEXT = 'real context text SECRET-CONTEXT-BODY api_key=sk-live-abcdef0123456789';
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:tester'};
const context: ReactiveFiberTopologyContext = {scope, seam: 'rf-cli', capturedAt: '2026-10-15T10:00:00Z', observedAt: '2026-10-15T10:00:01Z'};
const operationRef: NativeRef = {provider: 'pi-workflow', type: 'node-call', id: 'wf_rf_1:0'};
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202A-\u202E\u2066-\u2069]/;
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
/** wb-693.3: result fields that put this file's obviously fake SECRET- placeholders in every engine-era field beside the two
 * bounded identity strings an engine entry states (an unexpected entry field, nested entry metadata, an engine metric and a
 * sibling SDK entry); only those two identity strings may ever surface. wb-693.4 closes engine_metrics to its two producer
 * counters, so the engine-metric placeholder moved out of this fixture into the extra-key refusal row (which asserts the
 * refusal text echoes no placeholder) and the fixture's own counts surface only as the bounded rf-engine-spawns:<n> reference. */
const LEAKY_ENGINE_FIELDS: Json = {
  provenance: {graph_revision_id: GRAPH, sdk_versions: {
    fiber_optics: {distribution_version: 'SECRET-SIBLING-VERSION', contract_fingerprint: 'unknown', note: 'SECRET-SIBLING-NOTE'},
    tsx_runtime: {distribution_version: '2.9.7', contract_fingerprint: `sha256:${'b2'.repeat(32)}`, message: 'SECRET-ENGINE-MESSAGE',
      metadata: {detail: 'SECRET-ENGINE-METADATA'}},
    tsx_sdk: {distribution_version: '0.1.341', contract_fingerprint: 'unknown', hint: 'SECRET-ENGINE-HINT'},
  }},
  engine_metrics: {tsx_worker_spawns: 1, tsx_resource_rounds: 0},
};
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
    // wb-2j3.9 (R10) envelope-strictness pins that stay under the 2j3.2/2j3.1 landing: null or non-string graph digest, the six-key work object
    // both ways, a non-numeric storage_write_count, and each required top-level key. Test-only; no loosening.
    ['graph digest null', withResult({provenance: {graph_revision_id: null}})],
    ['graph digest number', withResult({provenance: {graph_revision_id: 7}})],
    ['graph digest only the bare prefix', withResult({provenance: {graph_revision_id: 'sha256:'}})],
    ['work with a seventh key', withResult({work: work({seventh_count: 0})})],
    ['work with five keys', withResult({work: without(work(), 'necessity_eval_count')})],
    ['work not an object', withResult({work: 0})],
    ['storage_write_count 2', withResult({work: work({storage_write_count: 2})})],
    ['storage_write_count the string 0', withResult({work: work({storage_write_count: '0'})})],
    ['storage_write_count null', withResult({work: work({storage_write_count: null})})],
    ...['schema', 'ok', 'command', 'operation_id', 'workspace', 'transaction_id', 'result', 'diagnostics'].map(key => [`top-level ${key} absent`, reading(without(envelope(), key))] as const),
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

  // wb-2j3.9 (R10) acceptance (c): "R1's cli_version admission adds no required key: the absent-field fixture (R1) still validates and projects."
  it('R10: the baseline fixture is the eight-key, six-work-key, cli_version-free envelope, and it still validates and projects without adding a required key', () => {
    const source = envelope() as Json;
    expect(Object.keys(source)).toHaveLength(8);
    expect(Object.keys((source.result as Json).work as Json)).toHaveLength(6);
    expect(JSON.stringify(source)).not.toContain('cli_version');
    const topology = reactivefiberTopology(reading(source) as JsonValue, context);
    expect(topology.snapshots).toHaveLength(1);
    expect(JSON.stringify(topology)).not.toContain('cli_version');
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
  // wb-693.3 (RF-TSX-AND-EMBEDDING-R3) extends this guard to the new fields: the same assertions run over the original fixture
  // and over the engine-era one (LEAKY_ENGINE_FIELDS), whose engine entries, engine metrics and sibling SDK entry carry SECRET-
  // placeholders beside the two bounded identity strings.
  it('R6: output text, diagnostics and budget payloads never appear in any surfaced string', () => {
    const big = `${TEXT} ${'x'.repeat(1_000_000)}`;
    for (const extra of [{}, LEAKY_ENGINE_FIELDS]) {
      const topology = reactivefiberTopology(reading(envelope({result: result({output: {text: big}, ...extra}), diagnostics: [rfDiagnostic({severity: 'warning'})]})) as JsonValue, context);
      const text = JSON.stringify(topology);
      for (const secret of ['SECRET-CONTEXT-BODY', 'sk-live-abcdef', 'api_key', 'SECRET-DIAGNOSTIC', 'SECRET-HINT', 'SECRET-METADATA', 'SECRET-ENGINE', 'SECRET-SIBLING']) expect(text).not.toContain(secret);
      expect(text.length).toBeLessThan(4000);
      expect(topology.snapshots[0].nativePayloadRef).toBe(`rf-output:sha256:${digestOf(big)}`);
      bounded(topology);
    }
  });

  it('R6: host-supplied text is routed through the shared sanitizers: an unsafe invocation id or scope is refused before anything projects', () => {
    expect(refusal(reading(), {...context, invocationId: 'wf\u001b[31m'}).category).toBe('validation');
    expect(refusal(reading(), {...context, scope: {workspace: WS, principal: 'a\u202Eb'}}).category).toBe('validation');
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

/** wb-2j3.1 + wb-2j3.2 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R1 and R3), one cut at the head of the RF lane. Owner ruling
 * G-A (2026-10-17, bound on wb-x32): bundle_revision_id owns NativeSnapshot.sourceVersion; the producer CLI release travels as a
 * distinct rf-cli:<cli_version> evidence reference plus a snapshot note, never as sourceVersion (it supersedes the older R1
 * acceptance text "sourceVersion === '0.1.716'"). R1: "When a validated reactivefiber.render.preview envelope carries
 * result.provenance.cli_version ... native-evidence metadata shall expose it; an envelope without cli_version shall project
 * byte-identically to today." R3: "when result.provenance.cli_version is absent from the envelope, no snapshot,
 * evidence-metadata, receipt or docs field shall present any release as measured from that envelope (absent stays absent)";
 * acceptance: "The R1 no-cli_version fixture asserts no producer-release facet, note or metadata field is synthesized
 * (projection byte-identical to today's)" and "an implementation that defaults absent cli_version to the carrier release (or
 * any literal) FAILS that fixture assertion." Input-hygiene rows only: every invisible is built with String.fromCodePoint and
 * every credential-shaped literal is obviously fake. A later cut that deliberately changes today's projection (wb-2j3.3 rewords
 * the storage-writes note) re-pins TODAY in its own commit and keeps every no-synthesis assertion below. */
describe('producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard)', () => {
  const CAPABILITY = 'reactivefiber.render.preview';
  const RELEASE = '0.1.716';
  /** The release both registered descriptors still hard-code in contractSource: the default the R3 guard must catch. */
  const CARRIER_RELEASE = '0.1.583';
  const invoked: ReactiveFiberTopologyContext = {...context, invocationId: 'wf_rf_1'};
  const stating = (cliVersion: JsonValue): Json => withResult({provenance: {graph_revision_id: GRAPH, cli_version: cliVersion}});
  const noteOf = (release: string): string => `producer release from result.provenance.cli_version: rf@${release}`;
  const cp = (code: number): string => String.fromCodePoint(code);
  const PLAIN_REFS = [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`];
  /** The R1 fixture's projection exactly as the wb-6ze.9 adapter emits it today, key order included. */
  const TODAY = {
    snapshots: [{
      source: {provider: 'reactivefiber', type: 'context-preview', id: OPERATION, scope: WS}, scope: {workspace: WS, principal: scope.principal},
      capturedAt: context.capturedAt, observedAt: context.observedAt, coverage: 'complete',
      node: {title: `RF context preview ${OPERATION}`, type: 'sdk-operation',
        statusText: 'noncommitted preview (rf-cli) · 5968 of 8192 context tokens available · necessity evals 4 · 0 errors, 1 warnings', statusTone: 'success'},
      kind: 'reactivefiber.render.preview.snapshot', evidenceRefs: PLAIN_REFS, sourceRevision: GRAPH, nativePayloadRef: `rf-output:sha256:${digestOf(TEXT)}`,
      trace: {invocationId: 'wf_rf_1'},
    }],
    relations: [],
    diagnostics: ['ephemeral noncommitted preview: render_id null, transaction_id null, 0 storage writes', 'context text withheld: referenced by sha256 digest',
      'no native interval supplied'],
  };
  const [PREVIEW_NOTE, WITHHELD_NOTE, INTERVAL_NOTE] = TODAY.diagnostics;
  const TODAY_EVIDENCE = {provider: 'reactivefiber', nativeId: OPERATION, sourceBasis: GRAPH};

  it('R3: the R1 no-cli_version fixture synthesizes no producer-release facet, note or metadata field: the projection is byte-identical to today', () => {
    const topology = reactivefiberTopology(reading() as JsonValue, invoked);
    expect(JSON.stringify(topology)).toBe(JSON.stringify(TODAY));
    expect(topology).toStrictEqual(TODAY);
    expect(topology.snapshots[0]).not.toHaveProperty('sourceVersion');
    const evidence = nativeEvidence(CAPABILITY, reading() as JsonValue);
    expect(evidence).toStrictEqual(TODAY_EVIDENCE);
    const surfaced = `${JSON.stringify(topology)}\n${JSON.stringify(evidence)}`;
    for (const synthesized of ['rf-cli:', 'rf@', 'cli_version', 'producer release', CARRIER_RELEASE]) expect(surfaced).not.toContain(synthesized);
  });

  it('R1: a stated cli_version travels as one distinct rf-cli evidence reference and one note, never as sourceVersion (owner ruling G-A)', () => {
    const topology = reactivefiberTopology(stating(RELEASE) as JsonValue, invoked);
    const [snapshot] = topology.snapshots;
    expect(snapshot).toStrictEqual({...TODAY.snapshots[0], evidenceRefs: [...PLAIN_REFS, `rf-cli:${RELEASE}`]});
    expect(snapshot).not.toHaveProperty('sourceVersion');
    expect(topology.relations).toStrictEqual([]);
    expect(topology.diagnostics).toStrictEqual([PREVIEW_NOTE, WITHHELD_NOTE, noteOf(RELEASE), INTERVAL_NOTE]);
    bounded(topology);
    everyObject(topology, item => { expect(Object.isFrozen(item)).toBe(true); });
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    const node = projection.query({scope, limit: 10}).nodes.find(item => item.nativeRef.id === OPERATION);
    // The version cohort stays keyed on the graph revision the snapshot already reports; the CLI release never takes it.
    expect(node).toMatchObject({sourceVersion: GRAPH, evidenceRefs: [...PLAIN_REFS, `rf-cli:${RELEASE}`]});
    expect(projection.query({scope, limit: 10, evidence: `rf-cli:${RELEASE}`}).nodes.map(item => item.nativeRef.id)).toStrictEqual([OPERATION]);
    expect(projection.query({scope, limit: 10, version: RELEASE}).nodes).toStrictEqual([]);
  });

  it('R1: native-evidence metadata exposes the stated release as producerRelease, read from RF provenance only', () => {
    expect(nativeEvidence(CAPABILITY, stating(RELEASE) as JsonValue)).toStrictEqual({...TODAY_EVIDENCE, producerRelease: RELEASE});
    // A failed render carries no result, so it states no release and none is read from anywhere else in the envelope.
    expect(nativeEvidence(CAPABILITY, reading(failure()) as JsonValue)).not.toHaveProperty('producerRelease');
    // Another provider's contract is not RF provenance, whatever its payload holds.
    const forge = {contract: 'forge.gate.status/v1', source: {operation_id: 'forge-op', status: 'success', result: {provenance: {cli_version: RELEASE}}}};
    expect(nativeEvidence('forge.gate.status', forge)).not.toHaveProperty('producerRelease');
  });

  it('R1: the value is carried, not hard-coded: other releases round-trip verbatim through the reference, the note and the metadata', () => {
    for (const release of ['0.1.717', '0.1.716+local.1', '0.2.0rc1']) {
      const topology = reactivefiberTopology(stating(release) as JsonValue, context);
      expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-cli:${release}`]);
      expect(topology.diagnostics).toContain(noteOf(release));
      expect(nativeEvidence(CAPABILITY, stating(release) as JsonValue)).toStrictEqual({...TODAY_EVIDENCE, producerRelease: release});
    }
  });

  it('R1: a release of exactly 256 UTF-8 bytes is carried whole in its reference and metadata while every note stays inside the diagnostic bound', () => {
    const ascii = 'a'.repeat(256);
    const wide = cp(0xe9).repeat(128);
    for (const release of [ascii, wide]) {
      const topology = reactivefiberTopology(stating(release) as JsonValue, context);
      expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-cli:${release}`]);
      expect(nativeEvidence(CAPABILITY, stating(release) as JsonValue)).toHaveProperty('producerRelease', release);
      bounded(topology);
    }
    // 184 characters: the note fits whole. 312 characters: the shared bound cuts it and says so.
    expect(reactivefiberTopology(stating(wide) as JsonValue, context).diagnostics).toContain(noteOf(wide));
    const cut = reactivefiberTopology(stating(ascii) as JsonValue, context).diagnostics.find(text => text.startsWith(noteOf('')));
    expect(cut).toMatch(/ \[truncated\]$/);
  });

  it('R1: the release note follows every partial-render note and the diagnostic bound still holds', () => {
    const source = envelope({result: result({provenance: {graph_revision_id: GRAPH, cli_version: RELEASE},
      diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}, budget: {formula_terms: formula({available_context_tokens: -40})}})});
    const topology = reactivefiberTopology(reading(source) as JsonValue, {...context, seam: 'injected-fixture'});
    expect(topology.diagnostics).toStrictEqual([PREVIEW_NOTE, WITHHELD_NOTE, 'fixture seam: not a real generated context',
      'render reported errors: partial, not a clean render', 'context exceeds the available budget: partial', noteOf(RELEASE), INTERVAL_NOTE]);
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-cli:${RELEASE}`]);
    bounded(topology);
  });

  const DROPPED: [string, JsonValue][] = [
    ['empty', ''],
    ['a number', 716],
    ['null', null],
    ['a boolean', true],
    ['an object', {major: 0, minor: 1, patch: 716}],
    ['an array', [RELEASE]],
    ['257 UTF-8 bytes', 'a'.repeat(257)],
    ['258 UTF-8 bytes in 129 characters', cp(0xe9).repeat(129)],
    ['a terminal escape sequence', `${RELEASE}${cp(0x1b)}[31m`],
    ['a bidi override', `0.1.${cp(0x202e)}716`],
    ['a zero-width space', `${RELEASE}${cp(0x200b)}`],
    ['a line break', `${RELEASE}${cp(0x0a)}`],
    ['surrounding whitespace', ` ${RELEASE} `],
    ['a whitespace run', `${RELEASE}  local`],
    ['text the shared label layout redacts (an obviously fake assignment)', 'api_key=OBVIOUSLY-FAKE'],
    ['text the shared label layout redacts (an obviously fake bearer value)', 'Bearer OBVIOUSLY-FAKE-VALUE'],
    // wb-19q (2j3.2 F1): 257 bytes in 129 code units, the one 257-byte string the 256-unit label layout leaves whole, so the byte
    // bound alone drops it; a reader admitting 257 bytes carries it and fails this row (the 257-ASCII row above is also cut by the layout).
    ['257 UTF-8 bytes in 129 characters (the multibyte boundary)', `a${cp(0xe9).repeat(128)}`],
  ];
  it.each(DROPPED)('R3: a cli_version that is %s is dropped, never rewritten or defaulted: the projection equals the absent case', (_name, value) => {
    const topology = reactivefiberTopology(stating(value) as JsonValue, invoked);
    expect(JSON.stringify(topology)).toBe(JSON.stringify(TODAY));
    expect(topology).toStrictEqual(TODAY);
    expect(nativeEvidence(CAPABILITY, stating(value) as JsonValue)).toStrictEqual(TODAY_EVIDENCE);
  });

  // wb-19q (2j3.2 F2) decoy: a release is read from result.provenance.cli_version only. A cli_version beside provenance
  // (result.cli_version) is an extra result key the shape check tolerates and neither reader consults, so a reader falling back to it
  // (provenance?.cli_version ?? result.cli_version, in the topology or the native-evidence reader) fails this row. The value is obviously fake.
  it('R3: a cli_version beside provenance (result.cli_version) is never read as a release: the projection and metadata equal the absent case and never show it', () => {
    const decoyRelease = '9.9.9';
    const decoy = withResult({cli_version: decoyRelease, provenance: {graph_revision_id: GRAPH}});
    expect(JSON.stringify(decoy)).toContain(`"cli_version":"${decoyRelease}"`);
    const topology = reactivefiberTopology(decoy as JsonValue, invoked);
    expect(JSON.stringify(topology)).toBe(JSON.stringify(TODAY));
    expect(topology).toStrictEqual(TODAY);
    const evidence = nativeEvidence(CAPABILITY, decoy as JsonValue);
    expect(evidence).toStrictEqual(TODAY_EVIDENCE);
    const surfaced = `${JSON.stringify(topology)}\n${JSON.stringify(evidence)}`;
    expect(surfaced).not.toContain(decoyRelease);
    for (const synthesized of ['rf-cli:', 'rf@', 'cli_version', 'producer release', CARRIER_RELEASE]) expect(surfaced).not.toContain(synthesized);
    // Control: the same key at the envelope level is a ninth key, refused by the strict eight-key check before anything projects.
    expect(refusal(reading(envelope({cli_version: decoyRelease}))).category).toBe('validation');
  });
});

// The wb-693.1/.2/.3 provider rows below write a stub rf into tracked scratch; the guard fails this file if any of it survives.
installScratchLeakGuard();

/** wb-693.1 + wb-693.2 + wb-693.3 (RF-TSX-AND-EMBEDDING R1, R2 and R3), one cut. RF ruling A28 records engine identity as the
 * additive JL-A34 sdk_versions keys tsx_runtime and tsx_sdk exactly when a render loaded a TSX definition. R1: "When a preview
 * envelope's result.provenance.sdk_versions is an OBJECT carrying tsx_runtime and/or tsx_sdk entries whose distribution_version
 * passes the existing identity() bound and whose contract_fingerprint matches /^sha256:[0-9a-f]{64}$/ or equals the literal
 * 'unknown', previewSnapshot shall add one bounded evidence ref rf-engine:<key>:<distribution_version>:<contract_fingerprint>
 * per entry and one note that a foreign runtime executed component source; with no such entries the snapshot stays
 * byte-identical to today's." R2: "The engine-identity reader shall treat a LIST-shaped sdk_versions (rf <= 0.1.709) as 'no
 * engine identity recorded' — the preview projects normally with no rf-engine: ref and no refusal — and shall never make
 * sdk_versions or cli_version required envelope fields." R3: "Engine identity and engine metrics shall never surface producer
 * text beyond the bounded identity strings, and their presence shall never upgrade coverage/tone." R10-R13 are that program's
 * case names (the R10 row above is RFCLI's wb-2j3.9 pin). Placeholders keep this file's SECRET- convention: obviously fake and
 * never credential-shaped. The provider rows run nativeReactiveFiberPreview against a stub rf written into tracked scratch and
 * put first on PATH, so the provider's own envelope validator decides; no installed rf ever runs. */
describe('engine identity from result.provenance.sdk_versions (wb-693.1 R1, wb-693.2 R2, wb-693.3 R3)', () => {
  const RUNTIME_FINGERPRINT = `sha256:${'b2'.repeat(32)}`;
  const RUNTIME_REF = `rf-engine:tsx_runtime:2.9.7:${RUNTIME_FINGERPRINT}`;
  const SDK_REF = 'rf-engine:tsx_sdk:0.1.341:unknown';
  const PLAIN_REFS = [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`];
  /** The acceptance's own pattern for the foreign-runtime note, and the one note text the reader states. */
  const ENGINE_NOTE_PATTERN = /foreign runtime|TSX engine/;
  const ENGINE_NOTE = 'TSX engine identity from result.provenance.sdk_versions: a foreign runtime executed component source';
  const INTERVAL_NOTE = 'no native interval supplied';
  const releaseNote = (release: string): string => `producer release from result.provenance.cli_version: rf@${release}`;
  const cp = (code: number): string => String.fromCodePoint(code);
  /** The four sibling entries and the wire format every JL-A34 object states, python-only and TSX renders alike; never read. */
  const SIBLINGS: Json = {
    fiber_optics: {distribution_version: '0.1.88', contract_fingerprint: `sha256:${'c3'.repeat(32)}`},
    reactive_lenses: {distribution_version: '0.1.40', contract_fingerprint: `sha256:${'d4'.repeat(32)}`},
    reactive_components: {distribution_version: '0.1.52', contract_fingerprint: 'unknown'},
    reactive_inference: {distribution_version: '0.1.17', contract_fingerprint: `sha256:${'e5'.repeat(32)}`},
    fiber_optics_wire_format: '2',
  };
  const RUNTIME: Json = {distribution_version: '2.9.7', contract_fingerprint: RUNTIME_FINGERPRINT};
  const SDK: Json = {distribution_version: '0.1.341', contract_fingerprint: 'unknown'};
  /** The acceptance's JL-A34 object fixture: both engine entries beside the siblings. */
  const ENGINE_OBJECT: Json = {...SIBLINGS, tsx_runtime: RUNTIME, tsx_sdk: SDK};
  const stating = (sdkVersions: JsonValue, over: Json = {}, provenance: Json = {}): Json =>
    withResult({provenance: {graph_revision_id: GRAPH, ...provenance, sdk_versions: sdkVersions}, ...over});
  const project = (value: JsonValue, ctx: ReactiveFiberTopologyContext = context): ReactiveFiberProjectionTopology => reactivefiberTopology(value, ctx);
  /** The same fixture with sdk_versions absent, projected: what "byte-identical to today's" compares with (R1 and wb-2j3.2's TODAY pin it). */
  const today = (over: Json = {}, provenance: Json = {}, ctx: ReactiveFiberTopologyContext = context): ReactiveFiberProjectionTopology =>
    project(withResult({provenance: {graph_revision_id: GRAPH, ...provenance}, ...over}), ctx);
  const engineRefsOf = (topology: ReactiveFiberProjectionTopology): string[] =>
    (topology.snapshots[0].evidenceRefs ?? []).filter(ref => ref.startsWith('rf-engine:'));

  const originalPath = process.env.PATH;
  const stubs: string[] = [];
  afterEach(() => {
    if (originalPath === undefined) Reflect.deleteProperty(process.env, 'PATH');
    else process.env.PATH = originalPath;
    removeScratch(...stubs.splice(0));
  });
  /** A stub rf first on PATH that prints `source` and exits 0, so the provider's own envelope validator decides. */
  function stubRf(source: Json): void {
    const dir = makeScratch('rf-engine-identity-');
    stubs.push(dir);
    const binary = join(dir, 'rf');
    writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
    chmodSync(binary, 0o700);
    process.env.PATH = `${dir}:${originalPath ?? ''}`;
  }
  /** One call of the native provider through the stub: the reading the registered reactivefiber.render.preview returns. */
  async function provided(source: Json): Promise<JsonValue> {
    stubRf(source);
    return nativeReactiveFiberPreview('claude-opus-5', 'Summarize workbench integration', WS);
  }
  const STUB_TEXT = 'hermetic stub render';
  /** A TSX-era noncommitted preview (wb-693.1 acceptance 4): object sdk_versions with both engine keys, engine_metrics and the
   * seven-key formula_terms (max_output_tokens beside the five terms and available_context_tokens), plus a later result key. */
  const tsxEra = (): Json => envelope({result: result({
    output: {text: STUB_TEXT}, provenance: {graph_revision_id: GRAPH, cli_version: '0.1.716', sdk_versions: ENGINE_OBJECT},
    budget: {formula_terms: formula({max_output_tokens: 128000})}, engine_metrics: {tsx_worker_spawns: 1, tsx_resource_rounds: 1},
    commit_seq: null, bundle_revision_id: `sha256:${'f6'.repeat(32)}`,
  })});
  /** The dogfood-shaped rf 0.1.709 render (wb-693.2 acceptance 3, steps/15-context-render.out:1@8a8b83e4d) as the noncommitted
   * preview Pi asks for: LIST sdk_versions, engine_metrics.tsx_worker_spawns 1, the seven-key formula_terms and the extra
   * provenance and result keys that release reported. */
  const dogfood709 = (): Json => envelope({result: result({
    output: {text: STUB_TEXT},
    provenance: {created_at: '2026-10-16T09:57:47.094450Z', graph_revision_id: GRAPH, necessity_policy_revision_id: `sha256:${'44'.repeat(32)}`,
      workspace_schema_version: 'reactive-fiber.workspace/v1', cli_version: '0.1.709', storage_backend: 'jsonl',
      sdk_versions: [{name: 'fiber_optics_wire_format', version: '2'}]},
    budget: {formula_terms: {context_window: 1000000, max_output_tokens: 128000, output_reserve: 8192, occupied_tokens: 0, overhead: 0,
      safety_margin: 2048, available_context_tokens: 989760}},
    diagnostics_summary: {errors: 0, warnings: 0, has_errors: false, has_warnings: false},
    engine_metrics: {tsx_worker_spawns: 1, tsx_resource_rounds: 0}, commit_seq: null, scope: null, session_id: null, effects: [],
  })});

  // R10 (wb-693.1 acceptance 1): "evidenceRefs arrayContaining ['rf-engine:tsx_runtime:2.9.7:sha256:b2b2...',
  // 'rf-engine:tsx_sdk:0.1.341:unknown'] and diagnostics match /foreign runtime|TSX engine/". Acceptance 3: refs stay within the cap.
  it('R10: an object sdk_versions stating both engine entries adds one rf-engine reference per entry and one foreign-runtime note', () => {
    const topology = project(stating(ENGINE_OBJECT));
    const [snapshot] = topology.snapshots;
    expect(snapshot.evidenceRefs).toEqual(expect.arrayContaining([RUNTIME_REF, SDK_REF]));
    expect(topology.diagnostics.some(note => ENGINE_NOTE_PATTERN.test(note))).toBe(true);
    // Exactly: today's references, then one per entry in tsx_runtime, tsx_sdk order; one note, just before the interval note.
    const plain = today();
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, RUNTIME_REF, SDK_REF]);
    expect(topology.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, -1), ENGINE_NOTE, INTERVAL_NOTE]);
    expect(ENGINE_NOTE).toMatch(ENGINE_NOTE_PATTERN);
    // Nothing else moves: coverage, tone, status text, revision and payload reference are today's.
    expect({...snapshot, evidenceRefs: PLAIN_REFS}).toStrictEqual(plain.snapshots[0]);
    expect(snapshot.evidenceRefs?.length).toBeLessThanOrEqual(32);
    bounded(topology);
    everyObject(topology, item => { expect(Object.isFrozen(item)).toBe(true); });
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    for (const ref of [RUNTIME_REF, SDK_REF]) {
      expect(projection.query({scope, limit: 10, evidence: ref}).nodes.map(item => item.nativeRef.id)).toStrictEqual([OPERATION]);
    }
  });

  it('R10: each engine entry stands alone: a lone tsx_runtime or tsx_sdk entry adds its one reference and the same single note', () => {
    const cases: [Json, string[]][] = [[{tsx_runtime: RUNTIME}, [RUNTIME_REF]], [{tsx_sdk: SDK}, [SDK_REF]]];
    for (const [entries, refs] of cases) {
      const topology = project(stating({...SIBLINGS, ...entries}));
      expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, ...refs]);
      expect(topology.diagnostics.filter(note => note === ENGINE_NOTE)).toHaveLength(1);
    }
  });

  it('R10: references follow tsx_runtime, tsx_sdk order whatever the key order, after a stated rf-cli release, and the engine note follows the release note', () => {
    expect(project(stating({tsx_sdk: SDK, ...SIBLINGS, tsx_runtime: RUNTIME})).snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, RUNTIME_REF, SDK_REF]);
    const topology = project(stating(ENGINE_OBJECT, {}, {cli_version: '0.1.716'}));
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, 'rf-cli:0.1.716', RUNTIME_REF, SDK_REF]);
    const plain = today({}, {cli_version: '0.1.716'});
    expect(topology.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, -1), ENGINE_NOTE, INTERVAL_NOTE]);
    expect(topology.diagnostics.indexOf(ENGINE_NOTE)).toBe(topology.diagnostics.indexOf(releaseNote('0.1.716')) + 1);
  });

  it('R10: the identities are carried, not hard-coded: other versions and fingerprints round-trip verbatim into their references', () => {
    const cases: [Json, string][] = [
      [{distribution_version: '2.1.4', contract_fingerprint: `sha256:${'0f'.repeat(32)}`}, `2.1.4:sha256:${'0f'.repeat(32)}`],
      [{distribution_version: '0.1.400-rc.1+local.7', contract_fingerprint: 'unknown'}, '0.1.400-rc.1+local.7:unknown'],
    ];
    for (const [entry, identities] of cases) {
      expect(engineRefsOf(project(stating({tsx_runtime: entry, tsx_sdk: entry})))).toStrictEqual([`rf-engine:tsx_runtime:${identities}`, `rf-engine:tsx_sdk:${identities}`]);
    }
  });

  it('R10: a distribution_version of exactly 256 UTF-8 bytes is carried whole and its reference still applies to the projection', () => {
    for (const version of ['a'.repeat(256), cp(0xe9).repeat(128)]) {
      const topology = project(stating({tsx_runtime: {distribution_version: version, contract_fingerprint: RUNTIME_FINGERPRINT}}));
      expect(engineRefsOf(topology)).toStrictEqual([`rf-engine:tsx_runtime:${version}:${RUNTIME_FINGERPRINT}`]);
      expect(new ObservationProjection().refresh(topology.snapshots[0])).toBe('applied');
      bounded(topology);
    }
  });

  it('R10: no other field of an entry is read: an entry that also carries placeholders yields only its two bounded identities', () => {
    const topology = project(stating({tsx_runtime: {...RUNTIME, message: 'SECRET-ENGINE-MESSAGE', metadata: {detail: 'SECRET-ENGINE-METADATA'}},
      tsx_sdk: {...SDK, hint: 'SECRET-ENGINE-HINT'}}));
    expect(engineRefsOf(topology)).toStrictEqual([RUNTIME_REF, SDK_REF]);
    expect(JSON.stringify(topology)).not.toContain('SECRET-');
  });

  it('R10: a valid entry beside a malformed one adds only the valid reference and the note; the malformed entry surfaces nothing', () => {
    const topology = project(stating({tsx_runtime: RUNTIME, tsx_sdk: {distribution_version: 'SECRET-ENGINE-VERSION', contract_fingerprint: 'SECRET-ENGINE-FINGERPRINT'}}));
    expect(engineRefsOf(topology)).toStrictEqual([RUNTIME_REF]);
    expect(topology.diagnostics.filter(note => note === ENGINE_NOTE)).toHaveLength(1);
    expect(JSON.stringify(topology)).not.toContain('SECRET-');
  });

  // wb-693.1 acceptance 4 names a workbench-provider-envelope-audit row; that file belongs to another seat this run, so the row is
  // carried here through the same nativeReactiveFiberPreview path (providers/reactivefiber.ts is unchanged by this cut).
  it('R10 provider: a TSX-era envelope (object sdk_versions with engine keys, engine_metrics, seven-key formula_terms) passes isPreviewEnvelope unchanged', async () => {
    const source = tsxEra();
    expect(Object.keys(((source.result as Json).budget as Json).formula_terms as Json)).toHaveLength(7);
    expect(await provided(source)).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
  }, 30_000);

  it('R10 end to end: the provider reading of a TSX-era envelope projects both rf-engine references and the foreign-runtime note', async () => {
    const topology = project(await provided(tsxEra()));
    // wb-693.4: the envelope's engine_metrics.tsx_worker_spawns 1 adds the bounded spawn reference after the identities.
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, 'rf-cli:0.1.716', RUNTIME_REF, SDK_REF, 'rf-engine-spawns:1']);
    expect(topology.diagnostics).toContain(ENGINE_NOTE);
    expect(topology.snapshots[0].coverage).toBe('complete');
  }, 30_000);

  // R11 (wb-693.1 acceptance 2): "python-only object, no engine keys: no rf-engine: ref, no engine note, snapshot otherwise identical".
  it('R11: a python-only object sdk_versions (siblings and wire format, no engine key) projects byte-identically to today', () => {
    const releases: Json[] = [{}, {cli_version: '0.1.716'}];
    for (const provenance of releases) {
      const topology = project(stating(SIBLINGS, {}, provenance));
      expect(JSON.stringify(topology)).toBe(JSON.stringify(today({}, provenance)));
      expect(engineRefsOf(topology)).toStrictEqual([]);
      expect(topology.diagnostics.some(note => ENGINE_NOTE_PATTERN.test(note))).toBe(false);
    }
  });

  it('R11: only the two engine keys are read: an engine-shaped entry under another name or out of case adds nothing', () => {
    for (const key of ['tsx_runtime_v2', 'TSX_RUNTIME', 'Tsx_Sdk', 'tsx', 'runtime', 'deno']) {
      expect(JSON.stringify(project(stating({...SIBLINGS, [key]: RUNTIME})))).toBe(JSON.stringify(today()));
    }
  });

  // R12 (wb-693.2 acceptance 1): "sdk_versions [{name:'fiber_optics_wire_format', version:'2'}] projects with no validation
  // refusal and no rf-engine: ref; passes today and keeps passing after R1's GREEN".
  const LISTS: [string, JsonValue][] = [
    ['the rf <= 0.1.709 wire-format list', [{name: 'fiber_optics_wire_format', version: '2'}]],
    ['an empty list', []],
    ['a list whose elements look like engine entries', [{name: 'tsx_runtime', ...RUNTIME}, {tsx_sdk: SDK}]],
  ];
  it.each(LISTS)('R12: a LIST-shaped sdk_versions (%s) records no engine identity and is never a refusal', (_name, list) => {
    const releases: Json[] = [{}, {cli_version: '0.1.709'}];
    for (const provenance of releases) {
      const topology = project(stating(list, {}, provenance));
      expect(JSON.stringify(topology)).toBe(JSON.stringify(today({}, provenance)));
      expect(engineRefsOf(topology)).toStrictEqual([]);
    }
  });

  const OTHER_SHAPES: [string, JsonValue][] = [['null', null], ['a string', 'tsx_runtime 2.9.7'], ['a number', 2], ['a boolean', true]];
  it.each(OTHER_SHAPES)('R12: an sdk_versions that is %s records no engine identity and is never a refusal either', (_name, value) => {
    expect(JSON.stringify(project(stating(value)))).toBe(JSON.stringify(today()));
  });

  // R12 (wb-693.2 acceptance 2): sdk_versions and cli_version never become required envelope fields.
  it('R12: sdk_versions and cli_version are never required: the baseline fixture states neither and still validates and projects', () => {
    const source = envelope();
    expect(JSON.stringify(source)).not.toMatch(/sdk_versions|cli_version|engine_metrics/);
    const topology = project(reading(source));
    expect(topology.snapshots).toHaveLength(1);
    expect(topology.snapshots[0].coverage).toBe('complete');
  });

  // R12 (wb-693.2 acceptance 3): "A dogfood-shaped 0.1.709 fixture (list sdk_versions + tsx_worker_spawns 1 ...) passes provider and
  // observer end-to-end".
  it('R12: the dogfood-shaped rf 0.1.709 preview (list sdk_versions, tsx_worker_spawns 1, seven-key formula_terms) projects normally', () => {
    const topology = project(reading(dogfood709()));
    const [snapshot] = topology.snapshots;
    // wb-693.4: tsx_worker_spawns 1 adds the bounded spawn reference (and the spawn note); no engine identity is recorded.
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, 'rf-cli:0.1.709', 'rf-engine-spawns:1']);
    expect(snapshot.coverage).toBe('complete');
    expect(snapshot.node.statusTone).toBe('success');
    expect(snapshot.node.statusText).toBe('noncommitted preview (rf-cli) · 989760 of 1000000 context tokens available · necessity evals 4 · 0 errors, 0 warnings');
    expect(topology.diagnostics).toContain(releaseNote('0.1.709'));
    expect(topology.diagnostics).not.toContain(ENGINE_NOTE);
  });

  it('R12 end to end: the dogfood-shaped 0.1.709 preview passes the provider unchanged and projects with no engine identity', async () => {
    const source = dogfood709();
    const preview = await provided(source);
    expect(preview).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
    const topology = project(preview);
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, 'rf-cli:0.1.709', 'rf-engine-spawns:1']);
    expect(engineRefsOf(topology)).toStrictEqual([]);
  }, 30_000);

  it('R12 end to end: the provider still admits the envelope that states neither sdk_versions nor cli_version', async () => {
    const source = envelope({result: result({output: {text: STUB_TEXT}})});
    expect(await provided(source)).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
  }, 30_000);

  // R13 (wb-693.3 acceptance 1): "engine entries carrying SECRET-... text in an unexpected field, an oversized
  // distribution_version, and a non-sha256:/non-'unknown' fingerprint surface nothing beyond bounded identities;
  // JSON.stringify(topology) contains no secret; refs <= 32".
  const DROPPED: [string, JsonValue][] = [
    // The version: the identity() bound (non-empty, at most 256 UTF-8 bytes, no unsafe unit), displayed unchanged by the shared label layout.
    ['a 257-byte version', {distribution_version: 'a'.repeat(257), contract_fingerprint: 'unknown'}],
    ['a 258-byte version in 129 characters', {distribution_version: cp(0xe9).repeat(129), contract_fingerprint: 'unknown'}],
    ['a 4096-character version', {distribution_version: `2.9.7-${'9'.repeat(4090)}`, contract_fingerprint: 'unknown'}],
    ['an empty version', {distribution_version: '', contract_fingerprint: 'unknown'}],
    ['a numeric version', {distribution_version: 297, contract_fingerprint: 'unknown'}],
    ['a null version', {distribution_version: null, contract_fingerprint: 'unknown'}],
    ['an object version', {distribution_version: {major: 2, minor: 9, patch: 7}, contract_fingerprint: 'unknown'}],
    ['a list version', {distribution_version: ['2.9.7'], contract_fingerprint: 'unknown'}],
    ['no version', {contract_fingerprint: 'unknown'}],
    ['a terminal escape sequence in the version', {distribution_version: `2.9.7${cp(0x1b)}[31m`, contract_fingerprint: 'unknown'}],
    ['a bidi override in the version', {distribution_version: `2.${cp(0x202e)}9.7`, contract_fingerprint: 'unknown'}],
    ['a zero-width space in the version', {distribution_version: `2.9.7${cp(0x200b)}`, contract_fingerprint: 'unknown'}],
    ['a line break in the version', {distribution_version: `2.9.7${cp(0x0a)}SECRET-ENGINE-TAIL`, contract_fingerprint: 'unknown'}],
    ['surrounding whitespace in the version', {distribution_version: ' 2.9.7 ', contract_fingerprint: 'unknown'}],
    ['a whitespace run in the version', {distribution_version: '2.9.7  local', contract_fingerprint: 'unknown'}],
    // The fingerprint: exactly sha256:<64 lowercase hex> or the literal unknown.
    ['an uppercase-hex fingerprint', {distribution_version: '2.9.7', contract_fingerprint: `sha256:${'B2'.repeat(32)}`}],
    ['a 63-hex fingerprint', {distribution_version: '2.9.7', contract_fingerprint: `sha256:${'b'.repeat(63)}`}],
    ['a 65-hex fingerprint', {distribution_version: '2.9.7', contract_fingerprint: `sha256:${'b'.repeat(65)}`}],
    ['a fingerprint without its prefix', {distribution_version: '2.9.7', contract_fingerprint: 'b2'.repeat(32)}],
    ['the bare prefix as the fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 'sha256:'}],
    ['a sha512 fingerprint', {distribution_version: '2.9.7', contract_fingerprint: `sha512:${'b2'.repeat(64)}`}],
    ['UNKNOWN as the fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 'UNKNOWN'}],
    ['unknown with a trailing space', {distribution_version: '2.9.7', contract_fingerprint: 'unknown '}],
    ['placeholder text as the fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 'SECRET-ENGINE-FINGERPRINT'}],
    ['a null fingerprint', {distribution_version: '2.9.7', contract_fingerprint: null}],
    ['a numeric fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 0}],
    ['no fingerprint', {distribution_version: '2.9.7'}],
    // The entry itself must be an object.
    ['an entry that is a string', '2.9.7'],
    ['an entry that is a list', ['2.9.7', 'unknown']],
    ['an entry that is null', null],
  ];
  it.each(DROPPED)('R13: an engine entry with %s is dropped, never rewritten: no reference, no note, the projection equals today', (_name, entry) => {
    const topology = project(stating({...SIBLINGS, tsx_runtime: entry, tsx_sdk: entry}));
    expect(JSON.stringify(topology)).toBe(JSON.stringify(today()));
    expect(JSON.stringify(topology)).not.toContain('SECRET-');
    expect(topology.snapshots[0].evidenceRefs?.length).toBeLessThanOrEqual(32);
  });

  it('R13: placeholders in every engine-era field beside the identities never surface; only bounded references do, refs <= 32', () => {
    const topology = project(withResult(LEAKY_ENGINE_FIELDS));
    expect(JSON.stringify(topology)).not.toContain('SECRET-');
    for (const ref of engineRefsOf(topology)) expect([RUNTIME_REF, SDK_REF]).toContain(ref);
    expect(topology.snapshots[0].evidenceRefs?.length).toBeLessThanOrEqual(32);
    bounded(topology);
  });

  // R13 (wb-693.3 acceptance 2): "The existing seam case and partial rows, re-run with engine keys added to their fixtures, still
  // read partial/unknown with the seam label intact".
  const PARTIAL: [string, Json, ReactiveFiberTopologyContext, RegExp][] = [
    ['the injected-fixture seam (R2)', {}, {...context, seam: 'injected-fixture'}, /^fixture seam \(not a real render\) · /],
    ['diagnostics_summary.has_errors (R4)', {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}}, context, /^noncommitted preview \(rf-cli\) · .* 2 errors, 0 warnings$/],
    ['an over-budget render (R4)', {budget: {formula_terms: formula({available_context_tokens: -40})}}, context, /^noncommitted preview \(rf-cli\) · over budget by 40 /],
  ];
  it.each(PARTIAL)('R13: %s with both engine entries still reads partial and unknown, its status text and seam label unchanged', (_name, over, ctx, label) => {
    const engine = project(stating(ENGINE_OBJECT, over), ctx).snapshots[0];
    const plain = today(over, {}, ctx).snapshots[0];
    expect(engine.coverage).toBe('partial');
    expect(engine.node.statusTone).toBe('unknown');
    expect(engine.node.statusText).toMatch(label);
    expect(engine.node).toStrictEqual(plain.node);
    expect(engine.coverage).toBe(plain.coverage);
  });

  it('R13: an error-severity envelope diagnostic beside engine entries still cannot read as success, and its text stays withheld', () => {
    const topology = project(reading(envelope({result: result({provenance: {graph_revision_id: GRAPH, sdk_versions: ENGINE_OBJECT}}), diagnostics: [rfDiagnostic()]})));
    expect(topology.snapshots[0].coverage).toBe('partial');
    expect(topology.snapshots[0].node.statusTone).not.toBe('success');
    for (const secret of ['SECRET-DIAGNOSTIC', 'SECRET-HINT', 'SECRET-METADATA']) expect(JSON.stringify(topology)).not.toContain(secret);
  });

  it('R13: with every partial note, a stated release and engine identity the diagnostics stay inside the shared bound and none is dropped', () => {
    const over: Json = {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}, budget: {formula_terms: formula({available_context_tokens: -40})}};
    const ctx: ReactiveFiberTopologyContext = {...context, seam: 'injected-fixture'};
    const topology = project(stating(ENGINE_OBJECT, over, {cli_version: '0.1.716'}), ctx);
    bounded(topology);
    // Every note today's projection states is still stated, the interval note last: the bound truncated nothing.
    for (const note of today(over, {cli_version: '0.1.716'}, ctx).diagnostics) expect(topology.diagnostics).toContain(note);
    expect(topology.diagnostics.at(-1)).toBe(INTERVAL_NOTE);
    expect(topology.snapshots[0].coverage).toBe('partial');
  });
});

/** wb-693.4 (RF-TSX-AND-EMBEDDING-R6): "When result.engine_metrics is present, previewSnapshot shall require exactly the
 * producer-closed keys {tsx_worker_spawns, tsx_resource_rounds} as non-negative integers (mirroring work handling) and, when
 * tsx_worker_spawns > 0, add one bounded ref rf-engine-spawns:<n> and a foreign-runtime note; zero spawns or an absent object
 * leaves the projection unchanged." Acceptance 1: R15 spawns 1 -> the ref plus the note; spawns 0 -> neither; absent -> unchanged.
 * Acceptance 2 (closedness mutant): "a missing or extra key -> validation refusal mirroring work". */
describe('engine_metrics spawn surfacing (wb-693.4 R6, R15)', () => {
  const PLAIN = [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`];
  const SPAWN_NOTE = 'TSX worker spawned (result.engine_metrics.tsx_worker_spawns): a foreign runtime executed component source';
  const INTERVAL = 'no native interval supplied';
  const metrics = (spawns: JsonValue, rounds: JsonValue = 0, extra: Json = {}): Json => ({tsx_worker_spawns: spawns, tsx_resource_rounds: rounds, ...extra});
  const rendered = (engineMetrics: JsonValue | undefined, provenance: Json = {}): ReactiveFiberProjectionTopology =>
    reactivefiberTopology(withResult({provenance: {graph_revision_id: GRAPH, ...provenance}, ...(engineMetrics === undefined ? {} : {engine_metrics: engineMetrics})}) as JsonValue, context);
  const baseline = (provenance: Json = {}): ReactiveFiberProjectionTopology => rendered(undefined, provenance);

  it('R15: tsx_worker_spawns 1 adds exactly one rf-engine-spawns:1 reference and one foreign-runtime note, nothing else moves', () => {
    const topology = rendered(metrics(1, 1));
    const plain = baseline();
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN, 'rf-engine-spawns:1']);
    expect(topology.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, -1), SPAWN_NOTE, INTERVAL]);
    expect(SPAWN_NOTE).toMatch(/foreign runtime/);
    expect({...topology.snapshots[0], evidenceRefs: PLAIN}).toStrictEqual(plain.snapshots[0]);
  });

  it('R15: the count is carried verbatim, including the largest safe integer, and the reference stays applicable to the projection', () => {
    for (const spawns of [2, 17, Number.MAX_SAFE_INTEGER]) {
      const topology = rendered(metrics(spawns));
      expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN, `rf-engine-spawns:${spawns}`]);
      expect(topology.snapshots[0].evidenceRefs?.at(-1)).toMatch(/^rf-engine-spawns:[1-9][0-9]{0,15}$/);
      const projection = new ObservationProjection();
      expect(projection.refresh(topology.snapshots[0])).toBe('applied');
      expect(projection.query({scope, limit: 10, evidence: `rf-engine-spawns:${spawns}`}).nodes.map(item => item.nativeRef.id)).toStrictEqual([OPERATION]);
    }
  });

  it('R15: zero spawns (any rounds) and an absent object leave the projection byte-identical to today', () => {
    for (const engineMetrics of [metrics(0, 0), metrics(0, 3)]) {
      expect(JSON.stringify(rendered(engineMetrics))).toBe(JSON.stringify(baseline()));
    }
    const topology = baseline();
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual(PLAIN);
    expect(topology.diagnostics.some(note => /foreign runtime/.test(note))).toBe(false);
  });

  it('R15: beside an engine identity the spawn reference follows the identity references and the foreign-runtime note is stated once', () => {
    const runtime: Json = {distribution_version: '2.9.7', contract_fingerprint: 'unknown'};
    const topology = rendered(metrics(1, 1), {cli_version: '0.1.716', sdk_versions: {tsx_runtime: runtime}});
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN, 'rf-cli:0.1.716', 'rf-engine:tsx_runtime:2.9.7:unknown', 'rf-engine-spawns:1']);
    expect(topology.diagnostics.filter(note => /foreign runtime/.test(note))).toHaveLength(1);
  });

  it('R15: a list-shaped sdk_versions (rf <= 0.1.709) with spawns 1 still projects, carrying the spawn reference and note', () => {
    const topology = rendered(metrics(1, 0), {cli_version: '0.1.709', sdk_versions: [{name: 'fiber_optics_wire_format', version: '2'}]});
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN, 'rf-cli:0.1.709', 'rf-engine-spawns:1']);
    expect(topology.diagnostics).toContain(SPAWN_NOTE);
  });

  it('R15: with every partial note, a release, an engine identity and spawns the diagnostics stay inside the shared bound and the interval note is last', () => {
    const over: Json = {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}, budget: {formula_terms: formula({available_context_tokens: -40})}};
    const runtime: Json = {distribution_version: '2.9.7', contract_fingerprint: 'unknown'};
    const topology = reactivefiberTopology(withResult({provenance: {graph_revision_id: GRAPH, cli_version: '0.1.716', sdk_versions: {tsx_runtime: runtime}}, engine_metrics: metrics(1), ...over}) as JsonValue,
      {...context, seam: 'injected-fixture'});
    expect(topology.diagnostics.length).toBeLessThanOrEqual(8);
    expect(topology.diagnostics.at(-1)).toBe(INTERVAL);
    expect(topology.diagnostics.some(note => /foreign runtime/.test(note))).toBe(true);
  });

  // Closedness (acceptance 2): exactly the two producer keys, each a non-negative safe integer; absence alone is tolerated.
  const MALFORMED: [string, JsonValue][] = [
    ['a missing tsx_resource_rounds', {tsx_worker_spawns: 1}],
    ['a missing tsx_worker_spawns', {tsx_resource_rounds: 0}],
    ['an empty object', {}],
    ['an extra key', metrics(1, 0, {detail: 'SECRET-ENGINE-METRICS'})],
    ['a negative spawn count', metrics(-1)],
    ['a fractional spawn count', metrics(1.5)],
    ['a string spawn count', metrics('1')],
    ['a null round count', metrics(1, null)],
    ['an unsafe integer round count', metrics(1, 2 ** 53)],
    ['a null object', null],
    ['a list', [1, 0]],
    ['a string', 'tsx_worker_spawns'],
  ];
  it.each(MALFORMED)('R15: engine_metrics with %s is refused as a validation error that echoes no producer text', (_name, engineMetrics) => {
    const error = refusal(withResult({engine_metrics: engineMetrics}));
    expect(error.category).toBe('validation');
    expect(error.message).toMatch(/result\.engine_metrics/);
    expect(error.message).not.toContain('SECRET-');
  });
});
