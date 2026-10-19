/** wb-6ze.9 (W13-E/VC-5): the ReactiveFiber reader adapter, the fifth NativeSnapshot producer beside Furnace, Forge, Claude and
 * HyperUnix (wb-6ze.7, whose shape it mirrors). It consumes exactly what the registered reactivefiber.render.preview provider
 * returns (src/workbench/providers/reactivefiber.ts) and projects one noncommitted-preview snapshot plus at most one
 * display-grouping edge. Cases R1-R9 quote docs/workbench (branch workbench/implementation-program) through the bead's
 * acceptance criteria 1-7. Nothing here needs an rf binary, a TTY or the network: the live rf tests stay untouched, and this
 * module never invokes rf (it projects an envelope the host already holds, so it can never issue a history-creating verb). */
import {createHash} from 'node:crypto';
import {chmodSync, readFileSync, writeFileSync} from 'node:fs';
import {delimiter, join} from 'node:path';
import {afterEach, describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, type JsonValue} from '../src/workbench/capability-registry.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import {type NativeRef, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';
import {nativeReactiveFiberPreview, REACTIVE_FIBER_CONTRACT_SOURCE} from '../src/workbench/providers/reactivefiber.js';
import {
  REACTIVEFIBER_OBSERVATION_CONTRACT, type ReactiveFiberObservedRelation, type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext, reactivefiberTopology,
} from '../src/workbench/reactivefiber-observer.js';
import {sanitizeWorkbenchText} from '../src/workbench/redaction.js';
import {fullShapeRf} from './helpers/rf-render-fixture.js';
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

// wb-4v6 (wb-1c6 gate rows 475/483 F1-F2): registration-site liveness for the it.each tables. A constant's length pin proves the
// TABLE is whole; it cannot see a table thinned AT THE it.each CALL (DROPPED.slice(1), a filter over the argument), which registers
// fewer cases and stays green. Each table's callback records the row name it ran under; the pin that follows the it.each in
// definition order (vitest runs a file's tests in order) compares the ran names to the table's row names, so a row that is not
// registered and run turns that pin red naming the table. Names are compared as sorted unique lists, so a retry cannot double-count.
const RAN = new Map<string, string[]>();
function record(table: string, name: string): void {
  RAN.set(table, [...(RAN.get(table) ?? []), name]);
}
function expectEveryRowRan(table: string, rows: readonly (readonly unknown[])[]): void {
  const unique = (names: string[]): string[] => [...new Set(names)].sort();
  expect(unique(RAN.get(table) ?? [])).toStrictEqual(unique(rows.map(row => String(row[0]))));
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
  const REFUSED = [
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
  ] as const;
  it('R3: the REFUSED table registers all 50 rows', () => {
    expect(REFUSED.length).toBe(50);
  });
  it.each(REFUSED)('R3: refuses with a typed error and projects nothing: %s', (name, value) => {
    record('REFUSED', name);
    expect(refusal(value as Json).category).toBe('validation');
  });
  it('R3: every REFUSED row is registered at the it.each call and runs', () => {
    expectEveryRowRan('REFUSED', REFUSED);
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

  const CONTRADICTORY = [
    ['a non-RF code', failure({diagnostics: [rfDiagnostic({code: 'HX_FAILED'})]})],
    ['a warning-severity primary diagnostic', failure({diagnostics: [rfDiagnostic({severity: 'warning'})]})],
    ['no diagnostic at all', failure({diagnostics: []})],
    ['a non-null result', failure({result: result()})],
    ['a transaction id', failure({transaction_id: 'rft_0123456789abcdefghijkl'})],
  ] as const;
  it('R4: the CONTRADICTORY table registers all 5 rows', () => {
    expect(CONTRADICTORY.length).toBe(5);
  });
  it.each(CONTRADICTORY)('R4: ok:false with %s is a contradictory failure envelope and is refused', (name, source) => {
    record('CONTRADICTORY', name);
    expect(refusal(reading(source as Json)).category).toBe('validation');
  });
  it('R4: every CONTRADICTORY row is registered at the it.each call and runs', () => {
    expectEveryRowRan('CONTRADICTORY', CONTRADICTORY);
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
  /** The release the single rf contractSource carrier states (wb-2j3.12, R2; read by identifier so the R3 guard tracks the
   * live carrier, never a stale literal): the default an implementation must never synthesize for an absent cli_version. */
  const CARRIER_RELEASE = REACTIVE_FIBER_CONTRACT_SOURCE.slice('rf@'.length, REACTIVE_FIBER_CONTRACT_SOURCE.indexOf(':'));
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
    diagnostics: ['ephemeral noncommitted preview: render_id null, transaction_id null, 0 authoritative storage writes (envelope storage_write_count)', 'context text withheld: referenced by sha256 digest',
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
  it('R3: the cli_version DROPPED table registers all 17 rows', () => {
    expect(DROPPED.length).toBe(17);
  });
  it.each(DROPPED)('R3: a cli_version that is %s is dropped, never rewritten or defaulted: the projection equals the absent case', (name, value) => {
    record('R3 DROPPED', name);
    const topology = reactivefiberTopology(stating(value) as JsonValue, invoked);
    expect(JSON.stringify(topology)).toBe(JSON.stringify(TODAY));
    expect(topology).toStrictEqual(TODAY);
    expect(nativeEvidence(CAPABILITY, stating(value) as JsonValue)).toStrictEqual(TODAY_EVIDENCE);
  });

  it('R3: every cli_version DROPPED row is registered at the it.each call and runs', () => {
    expectEveryRowRan('R3 DROPPED', DROPPED);
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
  /** A stub rf as the ONLY PATH entry (absolute-node shebang, no host rf behind it) that prints `source` and exits 0, so the provider's own envelope validator decides. */
  function stubRf(source: Json): void {
    const dir = makeScratch('rf-engine-identity-');
    stubs.push(dir);
    const binary = join(dir, 'rf');
    writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
    chmodSync(binary, 0o700);
    process.env.PATH = dir;
  }
  /** One call of the native provider through the stub: the reading the registered reactivefiber.render.preview returns. */
  async function provided(source: Json): Promise<JsonValue> {
    stubRf(source);
    return nativeReactiveFiberPreview('claude-opus-5', 'Summarize workbench integration', WS);
  }
  // wb-n0z: the stand-in is hermetic - the only PATH entry, so a refusal or a success can never be produced by the host rf.
  it('wb-n0z: the stand-in is the only PATH entry and its interpreter is the absolute node of this run', () => {
    stubRf(envelope());
    const entries = (process.env.PATH ?? '').split(delimiter);
    expect(entries).toHaveLength(1);
    expect(readFileSync(join(entries[0] ?? '', 'rf'), 'utf8').split('\n')[0]).toBe(`#!${process.execPath}`);
  });
  it('wb-n0z: a stand-in that cannot be executed refuses as could-not-launch, never through the host rf', async () => {
    stubRf(envelope());
    chmodSync(join(process.env.PATH ?? '', 'rf'), 0o600);
    await expect(nativeReactiveFiberPreview('claude-opus-5', 'Summarize workbench integration', WS)).rejects.toMatchObject({category: 'transport', message: 'RF preview could not launch the installed binary.'});
  });
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

  // wb-1c6 (G8 kill margin): the engine note is the last note before the interval note even behind every partial-render note.
  it('R10: the engine note follows the release note and every partial-render note, and precedes the interval note', () => {
    const over = {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}, budget: {formula_terms: formula({available_context_tokens: -40})}};
    const topology = project(stating(ENGINE_OBJECT, over, {cli_version: '0.1.716'}));
    const plain = today(over, {cli_version: '0.1.716'});
    expect(topology.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, -1), ENGINE_NOTE, INTERVAL_NOTE]);
    expect(topology.diagnostics.indexOf(ENGINE_NOTE)).toBe(topology.diagnostics.indexOf(releaseNote('0.1.716')) + 1);
    expect(topology.diagnostics.indexOf(releaseNote('0.1.716'))).toBeGreaterThan(topology.diagnostics.indexOf('context exceeds the available budget: partial'));
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
    const source = tsxEra();
    const topology = project(await provided(source));
    // wb-693.4: the envelope's engine_metrics.tsx_worker_spawns 1 adds the bounded spawn reference after the identities.
    // wb-973.8 (SCG-R8): its bundle_revision_id rides as the rf-bundle reference after the workspace reference and keys sourceVersion.
    const bundle = String((source.result as Json).bundle_revision_id);
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-bundle:${bundle}`, 'rf-cli:0.1.716', RUNTIME_REF, SDK_REF, 'rf-engine-spawns:1']);
    expect(topology.snapshots[0].sourceVersion).toBe(bundle);
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
    for (const key of ['tsx_runtime_v2', 'TSX_RUNTIME', 'Tsx_Sdk', 'Tsx_Runtime', 'TSX_SDK', 'tsx', 'runtime', 'deno']) {
      expect(JSON.stringify(project(stating({...SIBLINGS, [key]: RUNTIME})))).toBe(JSON.stringify(today()));
    }
  });

  // wb-1c6 (G11 kill margin): an out-of-case engine key beside a correctly cased one never adds a reference of its own.
  it('R11: an out-of-case engine key beside the correctly cased one adds no second reference and no second note', () => {
    const topology = project(stating({...SIBLINGS, tsx_runtime: RUNTIME, TSX_SDK: SDK, Tsx_Runtime: SDK}));
    expect(engineRefsOf(topology)).toStrictEqual([RUNTIME_REF]);
    expect(topology.diagnostics.filter(note => note === ENGINE_NOTE)).toHaveLength(1);
  });

  // R12 (wb-693.2 acceptance 1): "sdk_versions [{name:'fiber_optics_wire_format', version:'2'}] projects with no validation
  // refusal and no rf-engine: ref; passes today and keeps passing after R1's GREEN".
  const LISTS: [string, JsonValue][] = [
    ['the rf <= 0.1.709 wire-format list', [{name: 'fiber_optics_wire_format', version: '2'}]],
    ['an empty list', []],
    ['a list whose elements look like engine entries', [{name: 'tsx_runtime', ...RUNTIME}, {tsx_sdk: SDK}]],
    // wb-1c6 (G3 kill margin): a list scanned as entries would read these two keyed, fully valid engine entries.
    ['a list of keyed, valid engine entries', [{tsx_runtime: RUNTIME}, {tsx_sdk: SDK}]],
    ['a list holding the bare identity objects', [RUNTIME, SDK]],
  ];
  // wb-1c6 (wb-19q member 36 / wb-693.1 R2): each-liveness. A table that is emptied or thinned registers fewer cases and would
  // otherwise stay green; the count below is the fact that every row is still registered.
  it('R12: the LISTS table registers all 5 rows', () => {
    expect(LISTS.length).toBe(5);
  });
  it.each(LISTS)('R12: a LIST-shaped sdk_versions (%s) records no engine identity and is never a refusal', (name, list) => {
    record('LISTS', name);
    const releases: Json[] = [{}, {cli_version: '0.1.709'}];
    for (const provenance of releases) {
      const topology = project(stating(list, {}, provenance));
      expect(JSON.stringify(topology)).toBe(JSON.stringify(today({}, provenance)));
      expect(engineRefsOf(topology)).toStrictEqual([]);
    }
  });

  it('R12: every LISTS row is registered at the it.each call and runs', () => {
    expectEveryRowRan('LISTS', LISTS);
  });

  const OTHER_SHAPES: [string, JsonValue][] = [['null', null], ['a string', 'tsx_runtime 2.9.7'], ['a number', 2], ['a boolean', true]];
  it('R12: the OTHER_SHAPES table registers all 4 rows', () => {
    expect(OTHER_SHAPES.length).toBe(4);
  });
  it.each(OTHER_SHAPES)('R12: an sdk_versions that is %s records no engine identity and is never a refusal either', (name, value) => {
    record('OTHER_SHAPES', name);
    expect(JSON.stringify(project(stating(value)))).toBe(JSON.stringify(today()));
  });

  it('R12: every OTHER_SHAPES row is registered at the it.each call and runs', () => {
    expectEveryRowRan('OTHER_SHAPES', OTHER_SHAPES);
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
    // wb-1c6 kill margins: G1 (case-insensitive fingerprint regex) and G2 ('unknown' compared after trim) each had one killing row.
    ['a mixed-case-hex fingerprint', {distribution_version: '2.9.7', contract_fingerprint: `sha256:${'b2'.repeat(31)}B2`}],
    ['unknown with a leading line break', {distribution_version: '2.9.7', contract_fingerprint: `${cp(0x0a)}unknown`}],
    ['placeholder text as the fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 'SECRET-ENGINE-FINGERPRINT'}],
    ['a null fingerprint', {distribution_version: '2.9.7', contract_fingerprint: null}],
    ['a numeric fingerprint', {distribution_version: '2.9.7', contract_fingerprint: 0}],
    ['no fingerprint', {distribution_version: '2.9.7'}],
    // The entry itself must be an object.
    ['an entry that is a string', '2.9.7'],
    ['an entry that is a list', ['2.9.7', 'unknown']],
    ['an entry that is null', null],
  ];
  it('R13: the DROPPED table registers all 32 rows', () => {
    expect(DROPPED.length).toBe(32);
  });
  it.each(DROPPED)('R13: an engine entry with %s is dropped, never rewritten: no reference, no note, the projection equals today', (name, entry) => {
    record('R13 DROPPED', name);
    const topology = project(stating({...SIBLINGS, tsx_runtime: entry, tsx_sdk: entry}));
    expect(JSON.stringify(topology)).toBe(JSON.stringify(today()));
    expect(JSON.stringify(topology)).not.toContain('SECRET-');
    expect(topology.snapshots[0].evidenceRefs?.length).toBeLessThanOrEqual(32);
  });

  it('R13: every DROPPED row is registered at the it.each call and runs', () => {
    expectEveryRowRan('R13 DROPPED', DROPPED);
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
  it('R13: the PARTIAL table registers all 3 rows', () => {
    expect(PARTIAL.length).toBe(3);
  });
  it.each(PARTIAL)('R13: %s with both engine entries still reads partial and unknown, its status text and seam label unchanged', (name, over, ctx, label) => {
    record('PARTIAL', name);
    const engine = project(stating(ENGINE_OBJECT, over), ctx).snapshots[0];
    const plain = today(over, {}, ctx).snapshots[0];
    expect(engine.coverage).toBe('partial');
    expect(engine.node.statusTone).toBe('unknown');
    expect(engine.node.statusText).toMatch(label);
    expect(engine.node).toStrictEqual(plain.node);
    expect(engine.coverage).toBe(plain.coverage);
  });

  it('R13: every PARTIAL row is registered at the it.each call and runs', () => {
    expectEveryRowRan('PARTIAL', PARTIAL);
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
  it('R15: the MALFORMED table registers all 12 rows', () => {
    expect(MALFORMED.length).toBe(12);
  });
  it.each(MALFORMED)('R15: engine_metrics with %s is refused as a validation error that echoes no producer text', (name, engineMetrics) => {
    record('MALFORMED', name);
    const error = refusal(withResult({engine_metrics: engineMetrics}));
    expect(error.category).toBe('validation');
    expect(error.message).toMatch(/result\.engine_metrics/);
    expect(error.message).not.toContain('SECRET-');
  });

  it('R15: every MALFORMED row is registered at the it.each call and runs', () => {
    expectEveryRowRan('MALFORMED', MALFORMED);
  });
});

/** wb-973.10 (SWARM-CONTEXT-GRAPH-R10, the negative requirement of dossier C22; it extends R6 above). Statement: "No surfaced
 * string shall carry an observation row's executable, binding_ref, observed_dep_refs, freshness_witness, timestamps or any digest
 * preimage - only bounded, sanitized lens_key and status words and counts; a row can only demote coverage/tone, never upgrade a
 * flagged or over-budget render; an unknown status word is treated as non-observed, never as success and never as a refusal;
 * distinct surfaced status words <= 4 and notes within MAX_DIAGNOSTICS." The pinned rf row vocabulary is observed, missing, null,
 * suppressed, invalid, timeout, nonzero, truncated and denied, of which observed and null are observed values; a planned vocabulary
 * migration adds words, so a word outside that enum reads as not observed and is never refused. A row's freshness, replayed and
 * degraded legs belong to wb-973.9 (SCG-R9), not to this cut. Input-hygiene rows only: the SECRET- placeholders and the
 * FAKEPLACEHOLDER credential shapes are obviously fake. Every it.each table below carries its own length pin and, after the wb-4v6
 * convention this file landed with, a registration-site pin (each-liveness: a table thinned at the it.each call turns that pin red). */
describe('observation rows from result.observations (wb-973.10 SCG-R10)', () => {
  const STARTED = '2026-10-17T00:00:00Z';
  const OBSERVATION_ID = 'rfl_0123456789abcdefghijkl';
  const VALUE_DIGEST = `sha256:${'c7'.repeat(32)}`;
  const PARSED_DIGEST = `sha256:${'d8'.repeat(32)}`;
  const ELLIPSIS = '…';
  const cp = (code: number): string => String.fromCodePoint(code);
  /** One served row in the pinned shape (context.render.schema.json observations items): observed and fresh unless overridden. */
  const row = (over: Json = {}): Json => ({observation_id: OBSERVATION_ID, lens_key: 'beads.current', value_digest: VALUE_DIGEST, status: 'observed',
    code: null, freshness: 'captured_at_render', replayed: false, required: true, degraded: false, persisted: true, ...over});
  const withRows = (rows: JsonValue, over: Json = {}): Json => withResult({observations: rows, ...over});
  const project = (value: Json, ctx: ReactiveFiberTopologyContext = context): ReactiveFiberProjectionTopology => reactivefiberTopology(value as JsonValue, ctx);
  const observationNotes = (topology: ReactiveFiberProjectionTopology): string[] => topology.diagnostics.filter(note => note.startsWith('observations: '));
  /** Every key and every string value anywhere in the topology, the R6 everyObject walk: what any display of it can show. */
  function surfaced(topology: ReactiveFiberProjectionTopology): string[] {
    const texts: string[] = [];
    everyObject(topology, item => {
      for (const [key, value] of Object.entries(item)) {
        texts.push(key);
        if (typeof value === 'string') texts.push(value);
      }
    });
    return texts;
  }

  // Acceptance 1: "a row carrying executable '/usr/bin/SECRET-EXE', binding_ref 'binding:SECRET-BIND/x', observed_dep_refs
  // ['SECRET-DEP'], freshness_witness {secret:'SECRET-WITNESS'}, started_at '2026-10-17T00:00:00Z' yields no surfaced string
  // containing any SECRET- substring or the timestamp (everyObject walk)". The walk runs for observed values and for not-observed
  // rows, which do surface a note, and also finds no row id, digest, code or row field name anywhere.
  const LEAKY: Json = {executable: '/usr/bin/SECRET-EXE', binding_ref: 'binding:SECRET-BIND/x', observed_dep_refs: ['SECRET-DEP'],
    freshness_witness: {secret: 'SECRET-WITNESS'}, started_at: STARTED, elapsed_ms: 17, exit_code: 3, parsed_value_digest: PARSED_DIGEST};
  const HIDDEN = ['SECRET-', STARTED, OBSERVATION_ID, VALUE_DIGEST, PARSED_DIGEST, 'RF_OBSERVATION_DENIED', '/usr/bin', 'binding:'];
  const ROW_FIELDS = /executable|binding_ref|observed_dep_refs|freshness_witness|started_at|elapsed_ms|exit_code|value_digest|observation_id|lens_key/;
  const LEAK_STATUSES = ['observed', 'null', 'denied', 'frobnicated'];
  it('SCG-R10 (a): the leak-walk table registers all 4 statuses', () => {
    expect(LEAK_STATUSES.length).toBe(4);
  });
  it.each(LEAK_STATUSES)('SCG-R10 (a): %s rows carrying executable, binding_ref, observed_dep_refs, freshness_witness and timestamps surface none of them, nor any row id, digest or code', status => {
    record('SCG-R10 LEAK_STATUSES', status);
    const code = status === 'denied' ? 'RF_OBSERVATION_DENIED' : null;
    const topology = project(withRows([row({...LEAKY, status, code}), row({...LEAKY, status, code, lens_key: 'beads.ready'})]));
    const texts = surfaced(topology);
    expect(texts.length).toBeGreaterThan(0);
    for (const text of texts) {
      for (const hidden of HIDDEN) expect(text).not.toContain(hidden);
      expect(text).not.toMatch(ROW_FIELDS);
    }
    bounded(topology);
  });
  it('SCG-R10 (a): every leak-walk status is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R10 LEAK_STATUSES', LEAK_STATUSES.map(status => [status]));
  });

  // Acceptance 2: "One-directional: a flagged (has_errors:true) or over-budget render with all-fresh observed rows stays
  // partial/non-success (the R4 cases pass unchanged with rows added)". All-fresh rows leave each partial render byte-identical
  // to its row-free projection, and a not-observed row adds only its own note.
  const FRESH = [row(), row({status: 'null'}), row({lens_key: 'beads.ready'})];
  const PARTIAL_RENDERS: [string, Json, Json, ReactiveFiberTopologyContext][] = [
    ['diagnostics_summary.has_errors (R4)', {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}}, {}, context],
    ['an error-severity envelope diagnostic beside has_errors false (R4)', {}, {diagnostics: [rfDiagnostic()]}, context],
    ['an over-budget render (R4)', {budget: {formula_terms: formula({available_context_tokens: -40})}}, {}, context],
    ['the injected-fixture seam (R2)', {}, {}, {...context, seam: 'injected-fixture'}],
  ];
  const render = (resultOver: Json, envelopeOver: Json, rows?: JsonValue): Json =>
    reading(envelope({result: result(rows === undefined ? resultOver : {...resultOver, observations: rows}), ...envelopeOver}));
  it('SCG-R10 (b): the one-directional table registers all 4 partial renders', () => {
    expect(PARTIAL_RENDERS.length).toBe(4);
  });
  it.each(PARTIAL_RENDERS)('SCG-R10 (b): %s with all-fresh observed rows stays partial and non-success, byte-identical to the row-free render', (name, resultOver, envelopeOver, ctx) => {
    record('SCG-R10 PARTIAL_RENDERS', name);
    const plain = project(render(resultOver, envelopeOver), ctx);
    const fresh = project(render(resultOver, envelopeOver, FRESH), ctx);
    expect(fresh.snapshots[0].coverage).toBe('partial');
    expect(fresh.snapshots[0].node.statusTone).not.toBe('success');
    expect(JSON.stringify(fresh)).toBe(JSON.stringify(plain));
    const demoted = project(render(resultOver, envelopeOver, [...FRESH, row({status: 'denied'}), row({status: 'denied'})]), ctx);
    expect(demoted.snapshots).toStrictEqual(plain.snapshots);
    expect(demoted.relations).toStrictEqual(plain.relations);
    expect(demoted.diagnostics.filter(note => !note.startsWith('observations: '))).toStrictEqual(plain.diagnostics);
    expect(observationNotes(demoted)).toStrictEqual(['observations: 5 rows, 2 not observed (denied): partial']);
  });
  it('SCG-R10 (b): every one-directional partial render is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R10 PARTIAL_RENDERS', PARTIAL_RENDERS);
  });

  // The positive controls a demote-only reader keeps: observed values ('observed' and 'null'), an empty list and an absent key
  // leave a clean render complete and successful, byte-identical to today. wb-973.9 (SCG-R9) owns the reused, replayed and degraded
  // legs; a cut that adds a fresh-row count note re-pins this row in its own commit. wb-973.9 re-pinned it (its acceptance 2): the
  // projected snapshot and relations stay byte-identical to the row-free projection, an empty list adds nothing, and a non-empty
  // all-fresh list adds exactly one witness note, 'observations: <n> rows, 0 reused', in the observations slot.
  it('SCG-R10 (b): observed values and an empty list never demote a clean render: byte-identical to the row-free projection', () => {
    const plain = project(reading());
    const witness = (count: number): string => `observations: ${count} ${count === 1 ? 'row' : 'rows'}, 0 reused`;
    for (const rows of [FRESH, [row({status: 'null'})], [row(), row()], []]) {
      const topology = project(withRows(rows));
      expect(JSON.stringify(topology.snapshots)).toBe(JSON.stringify(plain.snapshots));
      expect(JSON.stringify(topology.relations)).toBe(JSON.stringify(plain.relations));
      expect(topology.diagnostics).toStrictEqual(rows.length === 0 ? plain.diagnostics : [...plain.diagnostics.slice(0, 2), witness(rows.length), ...plain.diagnostics.slice(2)]);
    }
    expect(project(withRows(FRESH)).snapshots[0]).toMatchObject({coverage: 'complete', node: {statusTone: 'success'}});
  });

  it('SCG-R10 (b): a clean render whose rows are all observed values applies to the projection complete and successful', () => {
    const [snapshot] = project(withRows([row(), row({status: 'null'})])).snapshots;
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.query({scope, limit: 10}).nodes.find(item => item.nativeRef.id === OPERATION)).toMatchObject({completeness: 'complete', presentation: {statusTone: 'success'}});
  });

  // Acceptance 3: "Unknown status 'frobnicated' -> partial, no CapabilityError; status of a non-string type -> refused 'validation'".
  it('SCG-R10 (c): an unknown status word reads as not observed: partial and never success, and never a refusal', () => {
    const value = withRows([row({status: 'frobnicated'})]);
    expect(() => project(value)).not.toThrow();
    const topology = project(value);
    const [snapshot] = topology.snapshots;
    expect(snapshot.coverage).toBe('partial');
    expect(snapshot.node.statusTone).toBe('unknown');
    expect(observationNotes(topology)).toStrictEqual(['observations: 1 row, 1 not observed (frobnicated): partial']);
    // Only coverage and tone move: the status text, references, revision and payload reference are the clean render's.
    const [clean] = project(reading()).snapshots;
    expect({...snapshot, coverage: clean.coverage, node: {...snapshot.node, statusTone: clean.node.statusTone}}).toStrictEqual(clean);
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.query({scope, limit: 10}).nodes.find(item => item.nativeRef.id === OPERATION)).toMatchObject({completeness: 'partial', presentation: {statusTone: 'unknown'}});
  });

  const NOT_OBSERVED = ['missing', 'suppressed', 'invalid', 'timeout', 'nonzero', 'truncated', 'denied', 'frobnicated', 'stale_inputs', 'reused'];
  it('SCG-R10 (c): the not-observed table registers all 10 words', () => {
    expect(NOT_OBSERVED.length).toBe(10);
  });
  it.each(NOT_OBSERVED)('SCG-R10 (c): status %s is not an observed value: beside a fresh row the render reads partial and unknown, listing the word', status => {
    record('SCG-R10 NOT_OBSERVED', status);
    const topology = project(withRows([row(), row({status})]));
    expect(topology.snapshots[0].coverage).toBe('partial');
    expect(topology.snapshots[0].node.statusTone).toBe('unknown');
    expect(observationNotes(topology)).toStrictEqual([`observations: 2 rows, 1 not observed (${status}): partial`]);
  });
  it('SCG-R10 (c): every not-observed word is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R10 NOT_OBSERVED', NOT_OBSERVED.map(status => [status]));
  });

  const UNREADABLE: [string, JsonValue][] = [
    ['a numeric status', [row({status: 7})]],
    ['a null status', [row({status: null})]],
    ['a boolean status', [row({status: true})]],
    ['an object status', [row({status: {word: 'observed'}})]],
    ['a list status', [row({status: ['observed']})]],
    ['a row without status', [without(row(), 'status')]],
    ['a non-string status after a fresh row', [row(), row({status: 0})]],
    ['a row that is a string', ['observed']],
    ['a row that is null', [null]],
    ['a row that is a list', [[row()]]],
    ['observations as an object', {rows: [row()]}],
    ['observations as a string', 'observed'],
    ['observations as a number', 1],
    ['observations null', null],
  ];
  it('SCG-R10 (c): the refusal table registers all 14 shapes', () => {
    expect(UNREADABLE.length).toBe(14);
  });
  it.each(UNREADABLE)('SCG-R10 (c): %s is refused with a typed validation error before anything projects', (name, rows) => {
    record('SCG-R10 UNREADABLE', name);
    expect(refusal(withRows(rows)).category).toBe('validation');
  });
  it('SCG-R10 (c): every refusal shape is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R10 UNREADABLE', UNREADABLE);
  });

  // Acceptance 4: "Bound: 10 000 rows with 10 000 distinct status words project one note listing at most 4 words plus '…',
  // total diagnostics <= MAX_DIAGNOSTICS (8), each <= 200 bytes (DIAGNOSTIC), each through sanitizeWorkbenchText; projection time
  // bounded (the R8 purity/determinism case still passes)".
  it('SCG-R10 (d): 10 000 rows with 10 000 distinct status words project one note listing 4 words plus …, inside every bound', () => {
    const input = withRows(Array.from({length: 10_000}, (_, index) => row({status: `word_${index}`})));
    const before = JSON.stringify(input);
    const topology = project(input);
    expect(observationNotes(topology)).toStrictEqual([`observations: 10000 rows, 10000 not observed (word_0, word_1, word_2, word_3, ${ELLIPSIS}): partial`]);
    expect(topology.diagnostics.length).toBeLessThanOrEqual(8);
    for (const note of topology.diagnostics) {
      expect(Buffer.byteLength(note)).toBeLessThanOrEqual(200);
      expect(sanitizeWorkbenchText(note, 200, 'label')).toBe(note);
    }
    bounded(topology);
    expect([...new Set(surfaced(topology).flatMap(text => text.match(/word_\d+/g) ?? []))]).toStrictEqual(['word_0', 'word_1', 'word_2', 'word_3']);
    expect(topology.snapshots[0].coverage).toBe('partial');
    // R8 on the 10 000-row input: deterministic, the input unmutated, the result deeply frozen.
    expect(project(input)).toStrictEqual(topology);
    expect(JSON.stringify(input)).toBe(before);
    everyObject(topology, item => { expect(Object.isFrozen(item)).toBe(true); });
  });

  it('SCG-R10 (d): a repeated word is listed once, exactly four distinct words carry no …, a fifth adds it, and observed values take no slot', () => {
    const four = ['missing', 'denied', 'timeout', 'frobnicated'];
    const notesFor = (statuses: readonly string[]): string[] => observationNotes(project(withRows(statuses.map(status => row({status})))));
    expect(notesFor(Array.from({length: 10_000}, () => 'denied'))).toStrictEqual(['observations: 10000 rows, 10000 not observed (denied): partial']);
    expect(notesFor([...four, ...four])).toStrictEqual(['observations: 8 rows, 8 not observed (missing, denied, timeout, frobnicated): partial']);
    expect(notesFor([...four, 'truncated'])).toStrictEqual([`observations: 5 rows, 5 not observed (missing, denied, timeout, frobnicated, ${ELLIPSIS}): partial`]);
    expect(notesFor(['observed', 'null', ...four, 'observed'])).toStrictEqual(['observations: 7 rows, 4 not observed (missing, denied, timeout, frobnicated): partial']);
  });

  it('SCG-R10 (d): a 24-character status word is listed whole, and four of them with the … stay inside the 200-byte bound', () => {
    const longest = ['a', 'b', 'c', 'd'].map(letter => `${letter.repeat(23)}_`);
    const [note] = observationNotes(project(withRows([...longest, `${'e'.repeat(23)}_`].map(status => row({status})))));
    expect(note).toBe(`observations: 5 rows, 5 not observed (${longest.join(', ')}, ${ELLIPSIS}): partial`);
    expect(Buffer.byteLength(note)).toBeLessThanOrEqual(200);
  });

  // A status word is listed only when it is a bounded word the shared label layout shows unchanged; any other not-observed word
  // still counts and demotes, and the note marks it with … instead of rewriting it.
  const UNLISTED: [string, string][] = [
    ['empty', ''],
    ['25 characters', 'a'.repeat(25)],
    ['4096 characters', `stale_${'x'.repeat(4090)}`],
    ['two words', 'stale inputs'],
    ['a comma-joined pair', 'denied,timeout'],
    ['an ellipsis', `denied${ELLIPSIS}`],
    ['a terminal escape sequence', `denied${cp(0x1b)}[31m`],
    ['a bidi override', `de${cp(0x202e)}nied`],
    ['a zero-width space', `denied${cp(0x200b)}`],
    ['a line break', `denied${cp(0x0a)}SECRET-STATUS-TAIL`],
    ['a non-ASCII letter', `d${cp(0xe9)}nied`],
    ['text the shared label layout redacts (an obviously fake prefixed key)', ['sk', 'ant', 'FAKEPLACEHOLDER'].join('-')],
    ['text the shared label layout redacts (an obviously fake ghp key)', ['ghp', 'FAKEPLACEHOLDER'].join('_')],
  ];
  it('SCG-R10 (d): the unlisted-word table registers all 13 shapes', () => {
    expect(UNLISTED.length).toBe(13);
  });
  it.each(UNLISTED)('SCG-R10 (d): a not-observed status word that is %s counts and demotes but is never listed: the note marks it …', (name, status) => {
    record('SCG-R10 UNLISTED', name);
    const topology = project(withRows([row({status}), row({status: 'denied'})]));
    expect(topology.snapshots[0].coverage).toBe('partial');
    expect(observationNotes(topology)).toStrictEqual([`observations: 2 rows, 2 not observed (denied, ${ELLIPSIS}): partial`]);
    for (const text of surfaced(topology)) {
      expect(text).not.toMatch(UNSAFE);
      expect(text).not.toContain('SECRET-');
      expect(text).not.toContain('FAKEPLACEHOLDER');
    }
    bounded(topology);
  });
  it('SCG-R10 (d): every unlisted-word shape is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R10 UNLISTED', UNLISTED);
  });

  // The observations note is a partial-render note: after the errors and budget notes, before the release and engine notes.
  const EVERY_NOTE: Json = {diagnostics_summary: {errors: 2, warnings: 0, has_errors: true, has_warnings: false}, budget: {formula_terms: formula({available_context_tokens: -40})},
    provenance: {graph_revision_id: GRAPH, cli_version: '0.1.716', sdk_versions: {tsx_runtime: {distribution_version: '2.9.7', contract_fingerprint: 'unknown'}}}};
  it('SCG-R10 (e): the observations note follows every partial-render note and precedes the release note; on the rf-cli seam no note is cut', () => {
    const plain = project(withResult(EVERY_NOTE));
    const topology = project(withRows([row({status: 'timeout'})], EVERY_NOTE));
    expect(topology.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, 4), 'observations: 1 row, 1 not observed (timeout): partial', ...plain.diagnostics.slice(4)]);
    expect(topology.diagnostics).toHaveLength(8);
    expect(topology.diagnostics.at(-1)).toBe('no native interval supplied');
    bounded(topology);
  });

  // On the injected-fixture seam nine notes compete for MAX_DIAGNOSTICS (8) slots: the shared bound keeps the first eight, so the
  // observations note always survives and the constant interval note is the one cut.
  it('SCG-R10 (e): with the fixture-seam note as well the diagnostics stay at MAX_DIAGNOSTICS and the observations note is kept', () => {
    const topology = project(withRows([row({status: 'denied'})], EVERY_NOTE), {...context, seam: 'injected-fixture'});
    expect(topology.diagnostics).toHaveLength(8);
    expect(topology.diagnostics.slice(2, 7)).toStrictEqual(['fixture seam: not a real generated context', 'render reported errors: partial, not a clean render',
      'context exceeds the available budget: partial', 'observations: 1 row, 1 not observed (denied): partial', 'producer release from result.provenance.cli_version: rf@0.1.716']);
    expect(topology.diagnostics.at(-1)).toBe('TSX engine identity from result.provenance.sdk_versions: a foreign runtime executed component source');
    bounded(topology);
  });

  // wb-693.4 landed a second foreign-runtime note (result.engine_metrics.tsx_worker_spawns) on this render path after this cut was
  // first delivered (gate F2, re-measured here). It shares the engine-identity note's slot - it is stated only beside no identity -
  // so the worst case is still nine notes for MAX_DIAGNOSTICS (8) slots and the one cut is still the constant interval note: the
  // observations note is kept beside the spawn note, and beside an identity plus spawns.
  const SPAWNS: Json = {engine_metrics: {tsx_worker_spawns: 1, tsx_resource_rounds: 0}};
  const SPAWN_TEXT = 'TSX worker spawned (result.engine_metrics.tsx_worker_spawns): a foreign runtime executed component source';
  const IDENTITY_TEXT = 'TSX engine identity from result.provenance.sdk_versions: a foreign runtime executed component source';
  const NO_IDENTITY: Json = {...EVERY_NOTE, provenance: {graph_revision_id: GRAPH, cli_version: '0.1.716'}, ...SPAWNS};
  const OBSERVED_NOTE = 'observations: 1 row, 1 not observed (denied): partial';
  const RELEASE_TEXT = 'producer release from result.provenance.cli_version: rf@0.1.716';
  it('SCG-R10 (e): beside the wb-693.4 spawn note on the rf-cli seam no note is cut and the observations note precedes the release and spawn notes', () => {
    const topology = project(withRows([row({status: 'denied'})], NO_IDENTITY));
    expect(topology.diagnostics).toHaveLength(8);
    expect(topology.diagnostics.slice(4)).toStrictEqual([OBSERVED_NOTE, RELEASE_TEXT, SPAWN_TEXT, 'no native interval supplied']);
    expect(topology.snapshots[0].evidenceRefs).toContain('rf-engine-spawns:1');
    bounded(topology);
  });

  it('SCG-R10 (e): with the fixture-seam note and the spawn note the diagnostics stay at MAX_DIAGNOSTICS, the observations note is kept and only the interval note is cut', () => {
    const topology = project(withRows([row({status: 'denied'})], NO_IDENTITY), {...context, seam: 'injected-fixture'});
    expect(topology.diagnostics).toHaveLength(8);
    expect(topology.diagnostics.slice(2)).toStrictEqual(['fixture seam: not a real generated context', 'render reported errors: partial, not a clean render',
      'context exceeds the available budget: partial', OBSERVED_NOTE, RELEASE_TEXT, SPAWN_TEXT]);
    expect(topology.diagnostics).not.toContain('no native interval supplied');
    bounded(topology);
  });

  it('SCG-R10 (e): beside both an engine identity and spawns on the rf-cli seam one foreign-runtime note is stated, the observations note is kept and no note is cut', () => {
    const topology = project(withRows([row({status: 'denied'})], {...EVERY_NOTE, ...SPAWNS}));
    expect(topology.diagnostics).toHaveLength(8);
    expect(topology.diagnostics.filter(note => /foreign runtime/.test(note))).toStrictEqual([IDENTITY_TEXT]);
    expect(topology.diagnostics.slice(4)).toStrictEqual([OBSERVED_NOTE, RELEASE_TEXT, IDENTITY_TEXT, 'no native interval supplied']);
    bounded(topology);
  });

  /** wb-973.9 (SWARM-CONTEXT-GRAPH-R9, dossier G5 CONFIRMED-GAP observations-rows-reused-not-current; it extends the SCG-R10
   * status-word leg above). Statement: "When result.observations carries any row that is not a fresh observed value - replayed===true,
   * or freshness==='reused', or degraded===true, or a status outside the pin's observed-value set {observed, null} (including any
   * unknown word) - the RF reader adapter shall project coverage 'partial' and a statusTone other than 'success', with one note
   * naming the row count, the reused/replayed count and the verbatim status words; all-fresh rows, observations [] or absent keep
   * today's output byte-identical." The pinned row (context.render.schema.json:1112-1152@8a8b83e4d, unchanged in the installed rf):
   * freshness is the closed pair captured_at_render | reused (:1136-1140), replayed is true exactly when a recorded observation
   * stood in (:1144) and degraded is true exactly when the status is unusable (:1152). Acceptance 2 adds one witness note to a clean
   * render whose rows are all fresh, so the byte identity holds for the projected snapshot and relations, and for every partial
   * render; the SCG-R10 positive-control row above is re-pinned to exactly that in this cut. Rows are the SCG-R10 row() in the pin's
   * required-key shape; the provider rows run the landed wb-973.11 full-shape fixture through a hermetic rf stand-in. */
  describe('observation freshness, replay and degradation (wb-973.9 SCG-R9)', () => {
    const REUSED = row({freshness: 'reused', replayed: true});
    const DENIED = row({status: 'denied', code: 'RF_OBSERVATION_DENIED', degraded: true});
    const STATUS_CAUSE = 'every result.observations row must be an object with a string status';
    const FRESHNESS_CAUSE = 'every result.observations row must state freshness captured_at_render or reused';
    const REPLAYED_CAUSE = 'every result.observations row must state a boolean replayed';
    const DEGRADED_CAUSE = 'a stated result.observations degraded flag must be a boolean';
    const AGREEMENT_CAUSE = 'a result.observations row is replayed exactly when its freshness is reused';
    const OBSERVED_DEGRADED_CAUSE = 'a degraded result.observations row cannot have status observed';
    const REFUSED_ENVELOPE = 'RF preview returned an unrecognized or contradictory envelope.';

    // Acceptance 1, rows (a)-(c) verbatim on an otherwise clean rf-cli envelope: "each asserts coverage==='partial',
    // statusTone!=='success', a note matching /observations: 1 row/ naming reused/replayed for (a) and the verbatim status word for
    // (b),(c); HEAD projects complete/success for all three". Row (d) is the one only the degraded leg demotes: the pin makes degraded
    // true beside status null a contradiction as well (:1152), but acceptance 3 fences only status observed, so this reader demotes
    // it - fail-closed, never success - and lists its verbatim status word.
    const NOT_FRESH: [string, Json, RegExp, string][] = [
      ['(a) a reused, replayed observed value', REUSED, /reused|replayed/, 'observations: 1 row, 1 reused: partial'],
      ['(b) a denied, degraded row', DENIED, /\(denied\)/, 'observations: 1 row, 1 not observed (denied): partial'],
      ['(c) the unknown status word stale_inputs', row({status: 'stale_inputs'}), /\(stale_inputs\)/, 'observations: 1 row, 1 not observed (stale_inputs): partial'],
      ['(d) a degraded null value', row({status: 'null', degraded: true}), /\(null\)/, 'observations: 1 row, 1 not observed (null): partial'],
    ];
    it('SCG-R9: the not-fresh table registers all 4 rows', () => {
      expect(NOT_FRESH.length).toBe(4);
    });
    it.each(NOT_FRESH)('SCG-R9: %s on an otherwise clean rf-cli envelope projects partial and non-success with one note naming it', (name, value, named, note) => {
      record('SCG-R9 NOT_FRESH', name);
      const topology = project(withRows([value]));
      const [snapshot] = topology.snapshots;
      expect(snapshot.coverage).toBe('partial');
      expect(snapshot.node.statusTone).not.toBe('success');
      expect(snapshot.node.statusTone).toBe('unknown');
      const notes = observationNotes(topology);
      expect(notes).toHaveLength(1);
      expect(notes[0]).toMatch(/observations: 1 row/);
      expect(notes[0]).toMatch(named);
      expect(notes).toStrictEqual([note]);
      // Only coverage and tone move: the status text, references, revision and payload reference are the clean render's.
      const [clean] = project(reading()).snapshots;
      expect({...snapshot, coverage: clean.coverage, node: {...snapshot.node, statusTone: clean.node.statusTone}}).toStrictEqual(clean);
      bounded(topology);
    });
    it('SCG-R9: every not-fresh row is registered at the it.each call and runs', () => {
      expectEveryRowRan('SCG-R9 NOT_FRESH', NOT_FRESH);
    });

    // Acceptance 2: "Positive controls: observations [], absent, and one row {status:'observed', freshness:'captured_at_render',
    // replayed:false, degraded:false} leave the clean R1 expectation toStrictEqual unchanged except, for the fresh row, one added note
    // 'observations: 1 row, 0 reused'." The witness takes the observations slot: after the base notes, before the interval note.
    it('SCG-R9: observations [] or absent leave the clean R1 projection unchanged, and one fresh row adds only the note "observations: 1 row, 0 reused"', () => {
      const r1 = {...context, invocationId: 'wf_rf_1'};
      const plain = project(reading(), r1);
      expect(Object.hasOwn(result(), 'observations')).toBe(false);
      expect(project(withResult({}), r1)).toStrictEqual(plain);
      expect(project(withRows([]), r1)).toStrictEqual(plain);
      expect(row()).toMatchObject({status: 'observed', freshness: 'captured_at_render', replayed: false, degraded: false});
      const fresh = project(withRows([row()]), r1);
      expect(fresh.snapshots).toStrictEqual(plain.snapshots);
      expect(fresh.relations).toStrictEqual(plain.relations);
      expect(fresh.diagnostics).toStrictEqual([...plain.diagnostics.slice(0, 2), 'observations: 1 row, 0 reused', ...plain.diagnostics.slice(2)]);
      expect(fresh.snapshots[0]).toMatchObject({coverage: 'complete', node: {statusTone: 'success'}});
    });

    it('SCG-R9: one note names the row count, the reused count and the verbatim not-observed words together; all-fresh rows name 0 reused', () => {
      const withTimeout = row({status: 'timeout', code: 'RF_OBSERVATION_TIMEOUT', freshness: 'reused', replayed: true, degraded: true});
      expect(observationNotes(project(withRows([REUSED, DENIED, row(), withTimeout])))).toStrictEqual(['observations: 4 rows, 2 reused, 2 not observed (denied, timeout): partial']);
      expect(observationNotes(project(withRows([REUSED, row(), REUSED])))).toStrictEqual(['observations: 3 rows, 2 reused: partial']);
      expect(observationNotes(project(withRows([row(), row({status: 'null'}), row({lens_key: 'beads.ready'})])))).toStrictEqual(['observations: 3 rows, 0 reused']);
    });

    // The bound the SCG-R10 note keeps (four 24-character words, their separators and the counts inside DIAGNOSTIC) still holds with
    // the reused term beside it: the longest note is one whole note, never cut by the shared bound.
    it('SCG-R9: the longest note - 10 000 reused rows beside four 24-character words and … - stays one whole note inside the 200-byte bound', () => {
      const longest = ['a', 'b', 'c', 'd', 'e'].map(letter => `${letter.repeat(23)}_`);
      const rows = Array.from({length: 10_000}, (_, index) => row({status: longest[index % longest.length], freshness: 'reused', replayed: true}));
      const topology = project(withRows(rows));
      const [note] = observationNotes(topology);
      expect(note).toBe(`observations: 10000 rows, 10000 reused, 10000 not observed (${longest.slice(0, 4).join(', ')}, ${ELLIPSIS}): partial`);
      expect(Buffer.byteLength(note)).toBeLessThanOrEqual(200);
      expect(sanitizeWorkbenchText(note, 200, 'label')).toBe(note);
      bounded(topology);
    });

    // DELTA-B-AMEND (MWRL-PI-4), accepted: until RFCLI's status enum gains an unknown class, an all-unknown row set stays partial -
    // never coverage 'unknown' - with the fail-closed non-success tone and its word listed verbatim.
    it('SCG-R9: an all-unknown row set stays partial, never coverage unknown, with a non-success tone and the word listed verbatim', () => {
      const topology = project(withRows([row({status: 'unknown'}), row({status: 'unknown'})]));
      const [snapshot] = topology.snapshots;
      expect(snapshot.coverage).toBe('partial');
      expect(snapshot.coverage).not.toBe('unknown');
      expect(snapshot.node.statusTone).not.toBe('success');
      expect(observationNotes(topology)).toStrictEqual(['observations: 2 rows, 2 not observed (unknown): partial']);
    });

    // One-directional on the R9 legs too: on every SCG-R10 partial render a reused row adds only its own note.
    it('SCG-R9: on every SCG-R10 partial render a reused row adds only its own note: the snapshot and relations stay the row-free render', () => {
      for (const [, resultOver, envelopeOver, ctx] of PARTIAL_RENDERS) {
        const plain = project(render(resultOver, envelopeOver), ctx);
        const reused = project(render(resultOver, envelopeOver, [REUSED]), ctx);
        expect(reused.snapshots).toStrictEqual(plain.snapshots);
        expect(reused.relations).toStrictEqual(plain.relations);
        expect(reused.diagnostics.filter(note => !note.startsWith('observations: '))).toStrictEqual(plain.diagnostics);
        expect(observationNotes(reused)).toStrictEqual(['observations: 1 row, 1 reused: partial']);
      }
    });

    it('SCG-R9: degraded is read only when stated: a row without it reads by its status, freshness and replay alone', () => {
      expect(observationNotes(project(withRows([without(row(), 'degraded')])))).toStrictEqual(['observations: 1 row, 0 reused']);
      expect(observationNotes(project(withRows([without(row({status: 'timeout'}), 'degraded')])))).toStrictEqual(['observations: 1 row, 1 not observed (timeout): partial']);
      expect(observationNotes(project(withRows([without(REUSED, 'degraded')])))).toStrictEqual(['observations: 1 row, 1 reused: partial']);
    });

    const LEAKY_OVERS: Json[] = [{freshness: 'reused', replayed: true}, {status: 'denied', code: 'RF_OBSERVATION_DENIED', degraded: true}, {status: 'null', degraded: true}];
    it('SCG-R9: reused, replayed and degraded rows carrying the leak fields surface none of them, nor any row id, digest or code', () => {
      for (const over of LEAKY_OVERS) {
        const topology = project(withRows([row({...LEAKY, ...over}), row(LEAKY)]));
        const texts = surfaced(topology);
        expect(texts.length).toBeGreaterThan(0);
        for (const text of texts) {
          for (const hidden of HIDDEN) expect(text).not.toContain(hidden);
          expect(text).not.toMatch(ROW_FIELDS);
        }
        bounded(topology);
      }
    });

    // Acceptance 4: "Projection effect: after ObservationProjection.refresh the node's completeness==='partial'; the adapter writes no
    // projection freshness field (freshness semantics stay projection-owned; the note is the row-level witness)."
    it('SCG-R9: after ObservationProjection.refresh every not-fresh row leaves the node partial, and freshness stays projection-owned', () => {
      const nodeOf = (snapshot: ReactiveFiberProjectionTopology['snapshots'][number]) => {
        const projection = new ObservationProjection();
        expect(projection.refresh(snapshot)).toBe('applied');
        return projection.query({scope, limit: 10}).nodes.find(item => item.nativeRef.id === OPERATION);
      };
      const [clean] = project(reading()).snapshots;
      const cleanNode = nodeOf(clean);
      expect(cleanNode?.freshness).toBe('current');
      for (const [, value, , note] of NOT_FRESH) {
        const topology = project(withRows([value]));
        const [snapshot] = topology.snapshots;
        expect(Object.keys(snapshot).sort()).toStrictEqual(Object.keys(clean).sort());
        expect(Object.keys(snapshot.node).sort()).toStrictEqual(Object.keys(clean.node).sort());
        expect(snapshot).not.toHaveProperty('freshness');
        const node = nodeOf(snapshot);
        expect(node).toMatchObject({completeness: 'partial', presentation: {statusTone: 'unknown'}});
        expect(node?.freshness).toBe(cleanNode?.freshness);
        expect(topology.diagnostics).toContain(note);
      }
    });

    // Acceptance 3: "Contradiction fences (schema :1140,:1144): replayed:true with freshness 'captured_at_render', replayed:false with
    // freshness 'reused', degraded:true with status 'observed' -> refused 'validation'". Each refusal pins its cause, beside a fresh row.
    const CONTRADICTIONS: [string, Json, string][] = [
      ['replayed true with freshness captured_at_render', row({replayed: true}), AGREEMENT_CAUSE],
      ['replayed false with freshness reused', row({freshness: 'reused'}), AGREEMENT_CAUSE],
      ['degraded true with status observed', row({degraded: true}), OBSERVED_DEGRADED_CAUSE],
    ];
    it('SCG-R9: the contradiction table registers all 3 fences', () => {
      expect(CONTRADICTIONS.length).toBe(3);
    });
    it.each(CONTRADICTIONS)('SCG-R9: a row with %s is refused with a typed validation error before anything projects', (name, value, cause) => {
      record('SCG-R9 CONTRADICTIONS', name);
      expect(refusal(withRows([row(), value]))).toMatchObject({category: 'validation', message: `ReactiveFiber topology refused: ${cause}.`});
    });
    it('SCG-R9: every contradiction fence is registered at the it.each call and runs', () => {
      expectEveryRowRan('SCG-R9 CONTRADICTIONS', CONTRADICTIONS);
    });

    // Acceptance 3: "a row missing status/freshness/replayed or a non-array observations -> 'validation' (observer)". Beside them the
    // shapes no pinned row can take: a freshness outside the closed pair, a non-boolean replayed and a stated non-boolean degraded.
    const UNSTATED: [string, JsonValue, string][] = [
      ['a row without status', [without(row(), 'status')], STATUS_CAUSE],
      ['a row without freshness', [without(row(), 'freshness')], FRESHNESS_CAUSE],
      ['a row without replayed', [without(row(), 'replayed')], REPLAYED_CAUSE],
      ['observations as an object', {rows: [row()]}, 'result.observations must be an array of rows'],
      ['a numeric freshness', [row({freshness: 1})], FRESHNESS_CAUSE],
      ['a null freshness', [row({freshness: null})], FRESHNESS_CAUSE],
      ['a freshness word outside the pin', [row({freshness: 'stale'})], FRESHNESS_CAUSE],
      ['a freshness differing only in case', [row({freshness: 'Reused', replayed: true})], FRESHNESS_CAUSE],
      ['a string replayed', [row({replayed: 'true'})], REPLAYED_CAUSE],
      ['a null replayed', [row({replayed: null})], REPLAYED_CAUSE],
      ['a string degraded', [row({degraded: 'false'})], DEGRADED_CAUSE],
      ['a null degraded', [row({degraded: null})], DEGRADED_CAUSE],
    ];
    it('SCG-R9: the unstated-field table registers all 12 shapes', () => {
      expect(UNSTATED.length).toBe(12);
    });
    it.each(UNSTATED)('SCG-R9: %s is refused with a typed validation error that names its cause', (name, rows, cause) => {
      record('SCG-R9 UNSTATED', name);
      expect(refusal(withRows(rows))).toMatchObject({category: 'validation', message: `ReactiveFiber topology refused: ${cause}.`});
    });
    it('SCG-R9: every unstated-field shape is registered at the it.each call and runs', () => {
      expectEveryRowRan('SCG-R9 UNSTATED', UNSTATED);
    });

    // Acceptance 3, the provider half: "... -> 'transport' (provider)". Each row is the landed wb-973.11 full-shape envelope with only
    // result.observations replaced, printed by a hermetic stand-in (the only PATH entry, absolute-node shebang), so the provider's own
    // envelope validator decides and no host rf can answer.
    const originalPath = process.env.PATH;
    const stubs: string[] = [];
    afterEach(() => {
      if (originalPath === undefined) Reflect.deleteProperty(process.env, 'PATH');
      else process.env.PATH = originalPath;
      removeScratch(...stubs.splice(0));
    });
    const fullShape = (observations: JsonValue): Json => {
      const source = fullShapeRf(WS);
      const fixture = source.result;
      if (fixture === null || typeof fixture !== 'object' || Array.isArray(fixture)) throw new Error('the wb-973.11 fixture result must be an object');
      return {...source, result: {...fixture, observations}};
    };
    async function provided(source: Json): Promise<JsonValue> {
      const dir = makeScratch('rf-observation-rows-');
      stubs.push(dir);
      const binary = join(dir, 'rf');
      writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
      chmodSync(binary, 0o700);
      process.env.PATH = dir;
      return nativeReactiveFiberPreview('claude-opus-5', 'Summarize workbench integration', WS);
    }
    const PROVIDER: [string, JsonValue][] = [
      ['observations as an object', {rows: [row()]}],
      ['a row without status', [row(), without(row(), 'status')]],
      ['a row without freshness', [row(), without(row(), 'freshness')]],
      ['a row without replayed', [row(), without(row(), 'replayed')]],
    ];
    it('SCG-R9 provider: the refusal table registers all 4 shapes', () => {
      expect(PROVIDER.length).toBe(4);
    });
    it.each(PROVIDER)('SCG-R9 provider: the full-shape envelope with %s is refused as a transport error', async (name, observations) => {
      record('SCG-R9 PROVIDER', name);
      const preview = provided(fullShape(observations));
      await expect(preview).rejects.toBeInstanceOf(CapabilityError);
      await expect(preview).rejects.toMatchObject({category: 'transport', message: REFUSED_ENVELOPE});
    }, 30_000);
    it('SCG-R9 provider: every refusal shape is registered at the it.each call and runs', () => {
      expectEveryRowRan('SCG-R9 PROVIDER', PROVIDER);
    });

    it('SCG-R9 provider: the full-shape envelope with fresh and not-fresh rows passes unchanged and projects partial end to end', async () => {
      const source = fullShape([row(), ...NOT_FRESH.map(([, value]) => value)]);
      const preview = await provided(source);
      expect(preview).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
      const topology = reactivefiberTopology(preview, context);
      expect(topology.snapshots[0]).toMatchObject({coverage: 'partial', node: {statusTone: 'unknown'}});
      expect(observationNotes(topology)).toStrictEqual(['observations: 5 rows, 1 reused, 3 not observed (denied, stale_inputs, null): partial']);
    }, 30_000);

    it('SCG-R9 provider: the full-shape envelope with one fresh row passes unchanged and projects complete with the witness note', async () => {
      const source = fullShape([row()]);
      const preview = await provided(source);
      expect(preview).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
      const topology = reactivefiberTopology(preview, context);
      expect(topology.snapshots[0]).toMatchObject({coverage: 'complete', node: {statusTone: 'success'}});
      expect(observationNotes(topology)).toStrictEqual(['observations: 1 row, 0 reused']);
    }, 30_000);
  });
});

/** wb-973.8 (SWARM-CONTEXT-GRAPH-R8): "When result.bundle_revision_id is present (sha256 digest), the RF reader adapter shall
 * carry it as a distinct evidence ref rf-bundle:<digest>, use it as the snapshot's sourceVersion (version cohort key), and
 * nativeEvidence shall prefer it as sourceBasis; graph_revision_id stays sourceRevision and rf-graph:<digest>; an absent key
 * keeps today's output byte-identical." Owner ruling G-A (bound on wb-x32): bundle_revision_id owns NativeSnapshot.sourceVersion,
 * and the CLI release keeps travelling as rf-cli:<cli_version> plus a note, never as sourceVersion. The pinned schema
 * (ReactiveFiberCLI context.render.schema.json :1025-1027 and $defs/digest :132-136 @8a8b83e4d) types the key as
 * sha256:<64 lowercase hex>, not nullable and not required (an envelope recorded without it stays valid), so a present value of
 * any other shape is refused: 'validation' by this reader and 'transport' by the provider's isPreviewEnvelope. The wb-6ze.9 R1
 * row and the wb-2j3.2 TODAY pins above stay the byte-identity fence for the absent key. Input-hygiene rows only: every invisible
 * is built with String.fromCodePoint. The provider rows run nativeReactiveFiberPreview against a hermetic stub rf (the only PATH
 * entry, absolute-node shebang) written into tracked scratch, so the provider's own envelope validator decides. */
describe('bundle revision from result.bundle_revision_id (wb-973.8 SCG-R8)', () => {
  const CAPABILITY = 'reactivefiber.render.preview';
  const BUNDLE = `sha256:${'b2'.repeat(32)}`;
  const OTHER_BUNDLE = `sha256:${'c3'.repeat(32)}`;
  const SECOND_OPERATION = 'rfo_lkjihgfedcba9876543210';
  const THIRD_OPERATION = `rfo_${'m'.repeat(22)}`;
  const PLAIN_REFS = [`rf-graph:${GRAPH}`, `rf-workspace:${WORKSPACE_ID}`];
  const BUNDLE_CAUSE = 'result.bundle_revision_id must be sha256:<64 lowercase hex> when stated';
  const PROVIDER_REFUSAL = 'RF preview returned an unrecognized or contradictory envelope.';
  const cp = (code: number): string => String.fromCodePoint(code);
  const project = (value: Json, ctx: ReactiveFiberTopologyContext = context): ReactiveFiberProjectionTopology => reactivefiberTopology(value as JsonValue, ctx);
  /** One preview of `operation` stating `bundle` beside the fixture's graph digest. */
  const previewOf = (operation: string, bundle: JsonValue): Json => reading(envelope({operation_id: operation, result: result({bundle_revision_id: bundle})}));
  const idsAt = (projection: ObservationProjection, version: string): string[] =>
    projection.query({scope, limit: 10, version}).nodes.map(node => node.nativeRef.id).sort();

  // Acceptance 1 (the named RED row): "withResult({bundle_revision_id: BUNDLE}) asserts evidenceRefs contains rf-graph:${GRAPH}
  // and rf-bundle:${BUNDLE}, sourceVersion === BUNDLE, sourceRevision === GRAPH; HEAD has no rf-bundle ref and sourceVersion undefined."
  it('SCG-R8: bundle_revision_id rides as rf-bundle evidence and the version cohort key', () => {
    const topology = project(withResult({bundle_revision_id: BUNDLE}));
    const [snapshot] = topology.snapshots;
    expect(snapshot.evidenceRefs).toEqual(expect.arrayContaining([`rf-graph:${GRAPH}`, `rf-bundle:${BUNDLE}`]));
    expect(snapshot.sourceVersion).toBe(BUNDLE);
    expect(snapshot.sourceRevision).toBe(GRAPH);
    // Exactly: today's two references, then the bundle; everything else is today's projection (coverage, tone, status, notes).
    const today = project(reading());
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-bundle:${BUNDLE}`]);
    expect({...snapshot, evidenceRefs: PLAIN_REFS}).toStrictEqual({...today.snapshots[0], sourceVersion: BUNDLE});
    expect(topology.diagnostics).toStrictEqual(today.diagnostics);
    expect(topology.relations).toStrictEqual(today.relations);
    bounded(topology);
    everyObject(topology, item => { expect(Object.isFrozen(item)).toBe(true); });
    // Applied, the bundle keys the node's version cohort; both digest references stay queryable evidence.
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.query({scope, limit: 10}).nodes.find(node => node.nativeRef.id === OPERATION)).toMatchObject({sourceVersion: BUNDLE});
    expect(idsAt(projection, BUNDLE)).toStrictEqual([OPERATION]);
    expect(idsAt(projection, GRAPH)).toStrictEqual([]);
    for (const ref of [`rf-bundle:${BUNDLE}`, `rf-graph:${GRAPH}`]) {
      expect(projection.query({scope, limit: 10, evidence: ref}).nodes.map(node => node.nativeRef.id)).toStrictEqual([OPERATION]);
    }
  });

  it('SCG-R8: the value is carried, not hard-coded: another bundle digest round-trips verbatim into the reference and sourceVersion', () => {
    const snapshot = project(withResult({bundle_revision_id: OTHER_BUNDLE})).snapshots[0];
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-bundle:${OTHER_BUNDLE}`]);
    expect(snapshot.sourceVersion).toBe(OTHER_BUNDLE);
    expect(snapshot.sourceRevision).toBe(GRAPH);
  });

  it('SCG-R8: the bundle reference sits after the workspace reference and before a stated rf-cli release, which still never becomes sourceVersion', () => {
    const topology = project(withResult({bundle_revision_id: BUNDLE, provenance: {graph_revision_id: GRAPH, cli_version: '0.1.716'}}));
    const [snapshot] = topology.snapshots;
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-bundle:${BUNDLE}`, 'rf-cli:0.1.716']);
    expect(snapshot.sourceVersion).toBe(BUNDLE);
    expect(topology.diagnostics).toContain('producer release from result.provenance.cli_version: rf@0.1.716');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(idsAt(projection, '0.1.716')).toStrictEqual([]);
  });

  // Acceptance 2: "two snapshots (distinct operation_ids) with equal GRAPH and bundle ids B1≠B2 applied to an ObservationProjection
  // - query({version:B1}) returns exactly the first node; equal bundle ids share the cohort."
  it('SCG-R8: equal graph digests with distinct bundle ids split the version cohort, and equal bundle ids share it', () => {
    const projection = new ObservationProjection();
    expect(projection.refresh(project(previewOf(OPERATION, BUNDLE)).snapshots[0])).toBe('applied');
    expect(projection.refresh(project(previewOf(SECOND_OPERATION, OTHER_BUNDLE)).snapshots[0])).toBe('applied');
    expect(idsAt(projection, BUNDLE)).toStrictEqual([OPERATION]);
    expect(idsAt(projection, OTHER_BUNDLE)).toStrictEqual([SECOND_OPERATION]);
    // The shared graph digest no longer stands in for the cohort once a bundle is stated.
    expect(idsAt(projection, GRAPH)).toStrictEqual([]);
    expect(projection.refresh(project(previewOf(THIRD_OPERATION, BUNDLE)).snapshots[0])).toBe('applied');
    expect(idsAt(projection, BUNDLE)).toStrictEqual([OPERATION, THIRD_OPERATION].sort());
    expect(idsAt(projection, OTHER_BUNDLE)).toStrictEqual([SECOND_OPERATION]);
  });

  // Acceptance 4: "Absent key: the clean R1 case passes toStrictEqual unchanged (wb-6ze.9 suite is the fence)." This row adds the
  // cohort fallback: without a bundle the snapshot states no sourceVersion and the projection keys the cohort on the graph digest.
  it('SCG-R8: an envelope without bundle_revision_id states no rf-bundle reference and no sourceVersion, and its cohort stays the graph digest', () => {
    const topology = project(reading());
    const [snapshot] = topology.snapshots;
    expect(snapshot).not.toHaveProperty('sourceVersion');
    expect(snapshot.evidenceRefs).toStrictEqual(PLAIN_REFS);
    expect(snapshot.sourceRevision).toBe(GRAPH);
    expect(JSON.stringify(topology)).not.toContain('rf-bundle:');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.refresh(project(reading(envelope({operation_id: SECOND_OPERATION}))).snapshots[0])).toBe('applied');
    expect(idsAt(projection, GRAPH)).toStrictEqual([OPERATION, SECOND_OPERATION].sort());
  });

  it('SCG-R8: a failed render carries no result, so it states no bundle reference and no sourceVersion', () => {
    const [snapshot] = project(reading(failure())).snapshots;
    expect(snapshot).not.toHaveProperty('sourceVersion');
    expect(snapshot.evidenceRefs).toStrictEqual([`rf-workspace:${WORKSPACE_ID}`]);
  });

  it('SCG-R8: nativeEvidence of the same reading prefers the bundle as sourceBasis while the snapshot keeps the graph digest as sourceRevision', () => {
    expect(nativeEvidence(CAPABILITY, withResult({bundle_revision_id: BUNDLE}) as JsonValue)).toStrictEqual({provider: 'reactivefiber', nativeId: OPERATION, sourceBasis: BUNDLE});
    expect(nativeEvidence(CAPABILITY, reading() as JsonValue)).toStrictEqual({provider: 'reactivefiber', nativeId: OPERATION, sourceBasis: GRAPH});
  });

  // Acceptance 5: "Malformed value (non-sha256 string, number, object) refused 'validation' by the observer and 'transport' by
  // isPreviewEnvelope." The schema types a stated key as the digest and never null, so null and every other shape is refused too.
  const MALFORMED: [string, JsonValue][] = [
    ['a bare 64-hex digest without the sha256: prefix', 'b2'.repeat(32)],
    ['an uppercase-hex digest', `sha256:${'B2'.repeat(32)}`],
    ['a 63-hex digest', `sha256:${'b'.repeat(63)}`],
    ['a 65-hex digest', `sha256:${'b'.repeat(65)}`],
    ['another algorithm prefix', `sha512:${'b2'.repeat(32)}`],
    ['a directory string', '/workspace'],
    ['an empty string', ''],
    ['a digest followed by a line break', `${BUNDLE}${cp(0x0a)}`],
    ['a digest followed by a zero-width space', `${BUNDLE}${cp(0x200b)}`],
    ['a digest carrying a bidi override', `sha256:${cp(0x202e)}${'b2'.repeat(32)}`],
    ['a number', 716],
    ['an object', {digest: BUNDLE}],
    ['an array', [BUNDLE]],
    ['a boolean', true],
    ['null', null],
  ];
  it('SCG-R8: the malformed bundle_revision_id table registers all 15 shapes', () => {
    expect(MALFORMED.length).toBe(15);
  });
  it.each(MALFORMED)('SCG-R8: a bundle_revision_id that is %s is refused with a typed validation error naming its cause', (name, value) => {
    record('SCG-R8 MALFORMED', name);
    const error = refusal(withResult({bundle_revision_id: value}));
    expect(error).toMatchObject({category: 'validation', message: `ReactiveFiber topology refused: ${BUNDLE_CAUSE}.`});
  });
  it('SCG-R8: every malformed bundle_revision_id shape is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R8 MALFORMED', MALFORMED);
  });

  const originalPath = process.env.PATH;
  const stubs: string[] = [];
  afterEach(() => {
    if (originalPath === undefined) Reflect.deleteProperty(process.env, 'PATH');
    else process.env.PATH = originalPath;
    removeScratch(...stubs.splice(0));
  });
  /** One provider call through a stub rf that prints `source` and exits 0 as the only PATH entry. */
  async function provided(source: Json): Promise<JsonValue> {
    const dir = makeScratch('rf-bundle-revision-');
    stubs.push(dir);
    const binary = join(dir, 'rf');
    writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
    chmodSync(binary, 0o700);
    process.env.PATH = dir;
    return nativeReactiveFiberPreview('claude-opus-5', 'Summarize workbench integration', WS);
  }
  const PROVIDER_MALFORMED: [string, JsonValue][] = [
    ['a non-sha256 string', 'b2'.repeat(32)],
    ['a directory string', '/workspace'],
    ['a number', 716],
    ['an object', {digest: BUNDLE}],
    ['null', null],
  ];
  it('SCG-R8 provider: the malformed bundle_revision_id table registers all 5 shapes', () => {
    expect(PROVIDER_MALFORMED.length).toBe(5);
  });
  it.each(PROVIDER_MALFORMED)('SCG-R8 provider: an envelope whose bundle_revision_id is %s is refused as a transport error', async (name, value) => {
    record('SCG-R8 PROVIDER', name);
    const preview = provided(envelope({result: result({bundle_revision_id: value})}));
    await expect(preview).rejects.toBeInstanceOf(CapabilityError);
    await expect(preview).rejects.toMatchObject({category: 'transport', message: PROVIDER_REFUSAL});
  }, 30_000);
  it('SCG-R8 provider: every malformed bundle_revision_id shape is registered at the it.each call and runs', () => {
    expectEveryRowRan('SCG-R8 PROVIDER', PROVIDER_MALFORMED);
  });

  it('SCG-R8 provider: an envelope stating a sha256 bundle_revision_id passes unchanged and projects the rf-bundle reference end to end', async () => {
    const source = envelope({result: result({bundle_revision_id: BUNDLE})});
    const preview = await provided(source);
    expect(preview).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
    const [snapshot] = reactivefiberTopology(preview, context).snapshots;
    expect(snapshot.evidenceRefs).toStrictEqual([...PLAIN_REFS, `rf-bundle:${BUNDLE}`]);
    expect(snapshot.sourceVersion).toBe(BUNDLE);
  }, 30_000);

  // "Gate: default gate (full-shape case needs R11's fixture keys)": the landed wb-973.11 full-shape envelope states a bundle id.
  it('SCG-R8 provider: the wb-973.11 full-shape envelope passes unchanged and its bundle_revision_id keys the snapshot cohort', async () => {
    const source = fullShapeRf(WS);
    const fixture = source.result;
    if (fixture === null || typeof fixture !== 'object' || Array.isArray(fixture)) throw new Error('the wb-973.11 fixture result must be an object');
    const bundle = fixture.bundle_revision_id;
    if (typeof bundle !== 'string') throw new Error('the wb-973.11 fixture must state a string bundle_revision_id');
    const preview = await provided(source);
    expect(preview).toStrictEqual({contract: 'reactivefiber.render.preview/v1', workspaceRoot: WS, source});
    const [snapshot] = reactivefiberTopology(preview, context).snapshots;
    expect(snapshot.evidenceRefs).toEqual(expect.arrayContaining([`rf-bundle:${bundle}`]));
    expect(snapshot.sourceVersion).toBe(bundle);
    expect(snapshot.sourceVersion).not.toBe(snapshot.sourceRevision);
  }, 30_000);
});
