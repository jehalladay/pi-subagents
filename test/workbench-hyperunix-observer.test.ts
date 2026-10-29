/** wb-6ze.7 (W13-D/VC-5): the HyperUnix hyperunix.find reader adapter, the fourth NativeSnapshot producer beside Furnace
 * (wb-752.1), Forge (wb-6hb.2) and Claude (wb-6ze.3). It consumes exactly what the registered hyperunix.find provider returns
 * (src/workbench/providers/hyperunix.ts) and projects one query snapshot plus at most one display-grouping edge. Cases H1-H7
 * quote docs/workbench (branch workbench/implementation-program) through the bead's acceptance criteria 1-7. Nothing here needs
 * an HX binary, a TTY or the network: the live hyperunix tests stay untouched and remain the only live evidence. */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {type ExecutionStatusKind, resultFromJson, resultToJson} from '@hyperunix/sdk';
import {afterEach, describe, expect, expectTypeOf, it, vi} from 'vitest';
import {CapabilityError, CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_EXECUTION_KINDS, HYPERUNIX_OBSERVATION_CONTRACT, type HyperUnixLiveClause, type HyperUnixObservedRelation,
  type HyperUnixProjectionTopology, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {type NativeRef, type NativeSnapshot, ObservationProjection, type ObservationScope} from '../src/workbench/observation.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {HX_NATIVE_RECEIPT, hxLiveReceipt} from './helpers/hx-live-receipt.js';

type Json = {[key: string]: JsonValue};
/** The runtime identity the measured live read of this workspace reported (hx 0.1.0, 2026-10-15). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const WS = '/tmp/hyperunix-observer-ws';
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:tester'};
const context: HyperUnixTopologyContext = {scope, target: {kind: 'hx.fs/regular-file', root: 'src'},
  capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z'};
/** The workflow node call that issued the read, named the way src/index.ts names a node without a native id. */
const operationRef: NativeRef = {provider: 'pi-workflow', type: 'node-call', id: 'wf_hx_1:0'};
const BINARY_REF = `hx-binary:sha256:${BINARY}`;
const LIVE_BATCHES = ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'];
const PARTIAL_KINDS = ['incomplete', 'budget-exhausted', 'cancelled', 'view-invalidated'] as const;
const FAILURE_KINDS = ['provider-failed', 'schema-failed', 'internal-failed', 'protocol-failed', 'usage-error'] as const;
const MUTATION_KINDS = ['mutation-rejected', 'mutation-partial'] as const;
const MUTATION = new Set<string>(MUTATION_KINDS);
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202A-\u202E\u2066-\u2069]/;
const LIFECYCLE = /ownership|causation|dependency|hypothesis|nativeConfirmationRef/;
const DERIVED = 'query id is a derived digest, not a native identifier';

/** test/workbench-native-ecosystem.test.ts:10 as the bead measures it: the shape the live read of this workspace returned. */
function measured(source: Json = {}, top: Json = {}): Json {
  return {contract: 'hyperunix.find/v1',
    source: {representation: 'hyperunix.result/1', execution_status: {kind: 'incomplete'}, coverage_summary: {licenses_absence: false},
      rows: [], rows_retained: true, operation: 'find', ...source},
    workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}, ...top};
}
const kindOf = (kind: string, licenses_absence: boolean, source: Json = {}): Json =>
  measured({execution_status: {kind}, coverage_summary: {licenses_absence}, ...source});
const omit = (value: Json, key: string): Json => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
const omitSource = (key: string): Json => {
  const value = measured();
  return {...value, source: omit(value.source as Json, key)};
};
/** One coverage certificate in the SDK's JSON representation, as the live read of this workspace certified b1..b7. */
const certificate = (batch_id: string | null, body: Json = {mode: 'opportunistic'}): Json => ({mode: 'opportunistic',
  cause: {cause: 'other', detail: 'No_change_exclusion'}, scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'},
  provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id, body});
/** The bead's derived query key, computed independently: sha256 hex over canonical JSON of the query and its batch ids. */
const derivedId = (root: string, operation: string, kind: string, queryRoot: string | null, batchIds: readonly string[]): string =>
  createHash('sha256').update(JSON.stringify([root, operation, kind, queryRoot, [...batchIds].sort()])).digest('hex');
const queryRef = (id: string, root = WS): NativeRef => ({provider: 'hyperunix', type: 'query', id, scope: root});
/** The measured live read of this workspace in the SDK's own hyperunix.result/1 representation: kind incomplete, licenses_absence
 * false, seven opportunistic certificates b1..b7. Row, certificate and diagnostic bodies are secrets that must never surface. */
function sdkDocument(overrides: Json = {}): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'SECRET-ROW-BODY'}, {path: 'src/index.ts'}], rows_retained: true,
    coverage: LIVE_BATCHES.map(id => certificate(id, {secret: 'SECRET-CERT'})),
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 272, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 272},
    execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'},
    diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'licenses no absence SECRET-DIAGNOSTIC'}],
    view: null, cost: null,
    transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 272},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
      incomplete_regions: [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}], result_coverage: null, answer_count: 75},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides};
}
/** What registerHyperUnixFind returns for a native result, built on the provider's own path (resultToJson, JSON round trip). */
const providerReading = (document: Json): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
  source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}})) as JsonValue;
/** The runtime-licensed complete-empty overrides of the :595-597 provider read (the one known-empty success), shared by the
 * wb-tz2.1 rows below. */
const LICENSED_COMPLETE_EMPTY: Json = {execution_status: {kind: 'complete-empty', diagnostic_code: null}, rows: [],
  coverage_summary: {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: true, certificates_license_absence: true,
    incomplete_regions: [], result_coverage: null, answer_count: 0}};
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected hyperunixTopology to refuse');
}
function everyObject(value: unknown, visit: (item: object) => void): void {
  if (typeof value !== 'object' || value === null) return;
  visit(value);
  const children: unknown[] = Object.values(value);
  for (const child of children) everyObject(child, visit);
}
function deepFreeze<T>(value: T): T {
  everyObject(value, item => { Object.freeze(item); });
  return value;
}
/** Every diagnostic of every topology stays within the bead's bound: at most 8 entries of at most 200 safe characters. */
function boundedDiagnostics(topology: HyperUnixProjectionTopology): void {
  expect(topology.diagnostics.length).toBeLessThanOrEqual(8);
  for (const diagnostic of topology.diagnostics) {
    expect(diagnostic.length).toBeGreaterThan(0);
    expect(diagnostic.length).toBeLessThanOrEqual(200);
    expect(diagnostic).not.toMatch(UNSAFE);
  }
}

afterEach(() => { vi.restoreAllMocks(); });

describe('HyperUnix hyperunix.find reader adapter', () => {
  it('exports the observation contract, the frozen kind tuple and exactly the relation statement ObservationProjection.relate accepts', () => {
    expect(HYPERUNIX_OBSERVATION_CONTRACT).toBe('workbench.hyperunix-observation/v1');
    expect(HYPERUNIX_EXECUTION_KINDS).toStrictEqual(['complete', 'complete-empty', 'incomplete', 'budget-exhausted', 'cancelled', 'view-invalidated',
      'provider-failed', 'schema-failed', 'internal-failed', 'protocol-failed', 'usage-error', 'mutation-rejected', 'mutation-partial']);
    expect(Object.isFrozen(HYPERUNIX_EXECUTION_KINDS)).toBe(true);
    expectTypeOf<HyperUnixObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    expectTypeOf(hyperunixTopology).parameter(0).toEqualTypeOf<JsonValue>();
    expectTypeOf(hyperunixTopology).parameter(1).toEqualTypeOf<HyperUnixTopologyContext>();
    expectTypeOf(hyperunixTopology).returns.toEqualTypeOf<HyperUnixProjectionTopology>();
  });

  // docs/workbench/09 § "Reader adapters": "HX: query coverage/bounds/query basis, and optional graph traversal of linked native
  // refs." and "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt, sourceRevision?, coverage?, nativePayloadRef}".
  it('H1: the measured incomplete read projects exactly one partial, unknown-toned query snapshot that refreshes a projection', () => {
    const topology = hyperunixTopology(measured(), {...context, invocationId: 'wf_hx_1'});
    expect(topology.snapshots).toHaveLength(1);
    const [snapshot] = topology.snapshots;
    expect(snapshot).toStrictEqual({
      source: queryRef(derivedId(WS, 'find', 'hx.fs/regular-file', 'src', [])), scope, capturedAt: context.capturedAt, observedAt: context.observedAt,
      coverage: 'partial', kind: 'hyperunix.query.snapshot', sourceVersion: '0.1.0', evidenceRefs: [BINARY_REF], trace: {invocationId: 'wf_hx_1'},
      node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation', statusText: 'incomplete · rows 0 · absence not licensed', statusTone: 'unknown'},
    });
    expect(snapshot.source.provider).toBe('hyperunix');
    expect(snapshot.evidenceRefs?.[0]).toBe(BINARY_REF);
    // The result carries no native timestamps, payload reference, basis or definition digest, so none is invented.
    for (const field of ['interval', 'nativePayloadRef', 'subjectBasis', 'definitionDigest', 'sourceRevision', 'sequence', 'cursor']) {
      expect(snapshot).not.toHaveProperty(field);
    }
    expect(topology.relations).toStrictEqual([]);
    expect(topology.diagnostics).toStrictEqual([`${DERIVED}: HX find hx.fs/regular-file src`, 'no native interval supplied']);
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    const window = projection.window({scope, invocationId: 'wf_hx_1', offset: 0, limit: 10});
    expect(window.total).toBe(1);
    expect(window.nodes[0]).toMatchObject({nativeRef: snapshot.source, completeness: 'partial', freshness: 'current', kind: 'hyperunix.query.snapshot',
      sourceVersion: '0.1.0', invocationId: 'wf_hx_1', lastConfirmedAt: context.capturedAt, evidenceRefs: [BINARY_REF], presentation: {statusTone: 'unknown'}});
    // The projection copies an absent snapshot interval as an undefined member; no interval value ever reaches the node.
    expect(window.nodes[0].interval).toBeUndefined();
  });

  it('H1: a later read of the same query and coverage basis refreshes the same node in place', () => {
    const projection = new ObservationProjection();
    const value = measured({coverage: [certificate('b1')]});
    const first = hyperunixTopology(value, {...context, invocationId: 'wf_hx_1'}).snapshots[0];
    expect(projection.refresh(first)).toBe('applied');
    const later = {...context, invocationId: 'wf_hx_1', capturedAt: '2026-10-15T08:45:00Z', observedAt: '2026-10-15T08:45:01Z'};
    const second = hyperunixTopology(value, later).snapshots[0];
    expect(second.source).toStrictEqual(first.source);
    expect(projection.refresh(second)).toBe('applied');
    expect(projection.stats().nodes).toBe(1);
    expect(projection.query({scope, ref: first.source, limit: 1}).nodes[0]).toMatchObject({observedAt: later.observedAt, lastConfirmedAt: later.capturedAt});
  });

  // docs/workbench/09 § "Acceptance/negative controls" item 6: 'Native "partial" HX coverage never becomes "known empty".'
  // docs/workbench/07 § "HyperUnix provider": "Incomplete query cannot silently authorize "nothing to do" or produce false success."
  it('H2: a 0-row incomplete answer that does not license absence stays partial and never reads as known-empty', () => {
    const [snapshot] = hyperunixTopology(kindOf('incomplete', false, {rows: []}), context).snapshots;
    expect(snapshot.coverage).toBe('partial');
    expect(snapshot.node.statusTone).toBe('unknown');
    expect(snapshot.node.statusText).toContain('absence not licensed');
    expect(snapshot.node.statusText).not.toContain('known-empty');
    expect(JSON.stringify(snapshot)).not.toMatch(/known-empty|"success"/);
  });

  it('H2: only a runtime-licensed complete-empty answer is known-empty, complete coverage and a success', () => {
    const topology = hyperunixTopology(kindOf('complete-empty', true), context);
    expect(topology.snapshots[0]).toMatchObject({coverage: 'complete', node: {statusTone: 'success', statusText: 'known-empty (runtime-licensed) · rows 0'}});
    expect(topology.diagnostics).toStrictEqual([`${DERIVED}: HX find hx.fs/regular-file src`, 'no native interval supplied']);
    const rows = hyperunixTopology(kindOf('complete', true, {rows: [{path: 'a'}, {path: 'b'}, {path: 'c'}]}), context).snapshots[0];
    expect(rows).toMatchObject({coverage: 'complete', node: {statusTone: 'success', statusText: 'complete · rows 3'}});
  });

  it('H2: a complete or complete-empty kind without the runtime licence stays partial and says the runtime did not license absence', () => {
    for (const kind of ['complete-empty', 'complete']) {
      const topology = hyperunixTopology(kindOf(kind, false), context);
      expect(topology.snapshots[0]).toMatchObject({coverage: 'partial', node: {statusTone: 'unknown', statusText: `${kind} · rows 0 · absence not licensed`}});
      expect(topology.diagnostics).toContain('runtime did not license absence');
      expect(topology.snapshots[0].node.statusText).not.toContain('known-empty');
    }
  });

  it.each(PARTIAL_KINDS)('H2: %s stays partial and unknown under either licence, and a contradicting licence is diagnosed', kind => {
    for (const licensed of [false, true]) {
      const topology = hyperunixTopology(kindOf(kind, licensed, {rows: [{path: 'a'}]}), context);
      expect(topology.snapshots[0]).toMatchObject({coverage: 'partial', node: {statusTone: 'unknown', statusText: `${kind} · rows 1 · absence not licensed`}});
      expect(topology.diagnostics.some(diagnostic => diagnostic.includes('not honoured'))).toBe(licensed);
      expect(topology.diagnostics).not.toContain('runtime did not license absence');
    }
  });

  it.each(FAILURE_KINDS)('H2: %s stays a failure with unknown coverage under either licence', kind => {
    for (const licensed of [false, true]) {
      const topology = hyperunixTopology(kindOf(kind, licensed), context);
      expect(topology.snapshots[0]).toMatchObject({coverage: 'unknown', node: {statusTone: 'failure', statusText: kind}});
      expect(topology.diagnostics.some(diagnostic => diagnostic.includes('not honoured'))).toBe(licensed);
    }
  });

  it('H2: across all 13 kinds x both licences success appears only with complete coverage and nothing claims "verified"', () => {
    const seen: [string, boolean, string | undefined, string, string][] = [];
    for (const kind of HYPERUNIX_EXECUTION_KINDS) {
      for (const licensed of [true, false]) {
        const value = kindOf(kind, licensed);
        if (MUTATION.has(kind)) {
          expect(thrown(() => hyperunixTopology(value, context))).toMatchObject({category: 'validation'});
          continue;
        }
        const topology = hyperunixTopology(value, context);
        boundedDiagnostics(topology);
        const [snapshot] = topology.snapshots;
        expect(JSON.stringify(topology)).not.toContain('"verified"');
        expect(snapshot.node.statusTone === 'success').toBe(snapshot.coverage === 'complete');
        seen.push([kind, licensed, snapshot.coverage, snapshot.node.statusTone, snapshot.node.statusText]);
      }
    }
    expect(seen).toStrictEqual([
      ['complete', true, 'complete', 'success', 'complete · rows 0'],
      ['complete', false, 'partial', 'unknown', 'complete · rows 0 · absence not licensed'],
      ['complete-empty', true, 'complete', 'success', 'known-empty (runtime-licensed) · rows 0'],
      ['complete-empty', false, 'partial', 'unknown', 'complete-empty · rows 0 · absence not licensed'],
      ['incomplete', true, 'partial', 'unknown', 'incomplete · rows 0 · absence not licensed'],
      ['incomplete', false, 'partial', 'unknown', 'incomplete · rows 0 · absence not licensed'],
      ['budget-exhausted', true, 'partial', 'unknown', 'budget-exhausted · rows 0 · absence not licensed'],
      ['budget-exhausted', false, 'partial', 'unknown', 'budget-exhausted · rows 0 · absence not licensed'],
      ['cancelled', true, 'partial', 'unknown', 'cancelled · rows 0 · absence not licensed'],
      ['cancelled', false, 'partial', 'unknown', 'cancelled · rows 0 · absence not licensed'],
      ['view-invalidated', true, 'partial', 'unknown', 'view-invalidated · rows 0 · absence not licensed'],
      ['view-invalidated', false, 'partial', 'unknown', 'view-invalidated · rows 0 · absence not licensed'],
      ['provider-failed', true, 'unknown', 'failure', 'provider-failed'],
      ['provider-failed', false, 'unknown', 'failure', 'provider-failed'],
      ['schema-failed', true, 'unknown', 'failure', 'schema-failed'],
      ['schema-failed', false, 'unknown', 'failure', 'schema-failed'],
      ['internal-failed', true, 'unknown', 'failure', 'internal-failed'],
      ['internal-failed', false, 'unknown', 'failure', 'internal-failed'],
      ['protocol-failed', true, 'unknown', 'failure', 'protocol-failed'],
      ['protocol-failed', false, 'unknown', 'failure', 'protocol-failed'],
      ['usage-error', true, 'unknown', 'failure', 'usage-error'],
      ['usage-error', false, 'unknown', 'failure', 'usage-error'],
    ]);
  });

  it('H2: rows the stream did not retain are said so on every tone, and the row count is never an answer size', () => {
    const notRetained = {rows: [], rows_retained: false};
    expect(hyperunixTopology(kindOf('complete', true, notRetained), context).snapshots[0].node.statusText).toBe('complete · rows 0 (rows not retained)');
    expect(hyperunixTopology(kindOf('incomplete', false, notRetained), context).snapshots[0].node.statusText)
      .toBe('incomplete · rows 0 · absence not licensed (rows not retained)');
    expect(hyperunixTopology(kindOf('provider-failed', false, notRetained), context).snapshots[0].node.statusText).toBe('provider-failed (rows not retained)');
    expect(hyperunixTopology(kindOf('complete-empty', true, notRetained), context).snapshots[0].node)
      .toMatchObject({statusTone: 'success', statusText: 'known-empty (runtime-licensed) · rows 0 (rows not retained)'});
    // Only an explicit false withholds retention, as the SDK decoder reads it; an absent flag is a retaining stream.
    expect(hyperunixTopology(omitSource('rows_retained'), context).snapshots[0].node.statusText).toBe('incomplete · rows 0 · absence not licensed');
    // answer_count is the runtime's answer size, never a row count; the status text counts rows only.
    const counted = hyperunixTopology(measured({rows: [{path: 'a'}, {path: 'b'}], coverage_summary: {licenses_absence: false, answer_count: 75}}), context);
    expect(counted.snapshots[0].node.statusText).toBe('incomplete · rows 2 · absence not licensed');
  });

  // docs/workbench/09 § "Experimental projection implementation": "Native keys include provider, type, scope and identifier."
  // docs/workbench/09 § "Acceptance/negative controls" item 4: "Two native sources reuse an identifier; provider-qualified keys do not collide."
  it('H3: the same query in two workspaces keys two nodes, and a Furnace snapshot reusing the id string coexists with it', () => {
    const other = '/tmp/hyperunix-observer-other';
    const here = hyperunixTopology(measured(), context).snapshots[0];
    const there = hyperunixTopology(measured({}, {workspaceRoot: other}), {...context, scope: {...scope, workspace: other}}).snapshots[0];
    expect(here.source.id).not.toBe(there.source.id);
    expect(here.source.scope).toBe(WS);
    expect(there.source.scope).toBe(other);
    expect(there.source.id).toBe(derivedId(other, 'find', 'hx.fs/regular-file', 'src', []));
    // Everything but the provider is identical: only provider qualification keeps the two keys apart.
    const furnace: NativeSnapshot = {source: {provider: 'furnace', type: 'query', id: here.source.id, scope: WS}, scope,
      capturedAt: context.capturedAt, observedAt: context.observedAt, coverage: 'complete', kind: 'furnace.run.snapshot',
      node: {title: 'Furnace Run', type: 'workflow', statusText: 'completed', statusTone: 'success'}};
    const projection = new ObservationProjection();
    expect(projection.refresh(here)).toBe('applied');
    expect(projection.refresh(furnace)).toBe('applied');
    expect(projection.stats().nodes).toBe(2);
    expect(projection.query({scope, ref: here.source, limit: 1}).nodes[0]).toMatchObject({completeness: 'partial', presentation: {statusTone: 'unknown'}});
    expect(projection.query({scope, ref: furnace.source, limit: 1}).nodes[0]).toMatchObject({completeness: 'complete', presentation: {statusTone: 'success'}});
  });

  it('H3: the derived id is the sha256 of the query and its sorted batch ids: deterministic, order-free and diagnosed as derived', () => {
    const forward = hyperunixTopology(measured({coverage: [certificate('b1'), certificate('b2')]}), context);
    const backward = hyperunixTopology(measured({coverage: [certificate('b2'), certificate(null), certificate('b1'), certificate('b2'), 'not-a-certificate']}), context);
    expect(forward.snapshots[0].source.id).toBe(derivedId(WS, 'find', 'hx.fs/regular-file', 'src', ['b1', 'b2']));
    expect(backward.snapshots[0].source.id).toBe(forward.snapshots[0].source.id);
    expect(forward.snapshots[0].source.id).toMatch(/^[0-9a-f]{64}$/);
    expect(hyperunixTopology(measured({coverage: [certificate('b1'), certificate('b2')]}), context)).toStrictEqual(forward);
    const rootless = hyperunixTopology(measured(), {...context, target: {kind: 'hx.fs/regular-file'}});
    expect(rootless.snapshots[0].source.id).toBe(derivedId(WS, 'find', 'hx.fs/regular-file', null, []));
    expect(rootless.snapshots[0].node.title).toBe('HX find hx.fs/regular-file');
    // Each input of the recipe moves the id: workspace (above), operation, kind, root (absent, empty or named) and batch ids.
    const ids = [
      hyperunixTopology(measured(), context), rootless, forward,
      hyperunixTopology(measured({operation: 'show'}), context),
      hyperunixTopology(measured(), {...context, target: {kind: 'hx.fs/directory', root: 'src'}}),
      hyperunixTopology(measured(), {...context, target: {kind: 'hx.fs/regular-file', root: 'test'}}),
      hyperunixTopology(measured(), {...context, target: {kind: 'hx.fs/regular-file', root: ''}}),
    ].map(topology => topology.snapshots[0].source.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const topology of [forward, backward, rootless]) {
      expect(topology.diagnostics.filter(diagnostic => diagnostic.startsWith(`${DERIVED}: `))).toHaveLength(1);
    }
  });

  // docs/workbench/09 § "Relationships are typed and provenanced": "grouping only (phase, display scope)" and "lifecycle
  // ownership (only if native producer confirms)". The HX result names no lifecycle owner, so only grouping is ever stated.
  it('H4: with the invoking operation named, exactly one provenanced display-grouping edge and never a lifecycle claim', () => {
    const topology = hyperunixTopology(measured(), {...context, invocationId: 'wf_hx_1', operationRef});
    const [snapshot] = topology.snapshots;
    expect(topology.relations).toStrictEqual([{scope, from: operationRef, to: snapshot.source, kind: 'grouping',
      provenance: {source: 'hyperunix', observedAt: context.observedAt}}]);
    expect(topology.relations[0].provenance).not.toHaveProperty('nativeConfirmationRef');
    expect(hyperunixTopology(measured(), context).relations).toStrictEqual([]);
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of topology.relations) projection.relate(relation);
    expect(projection.query({scope, parent: operationRef, limit: 10}).nodes.map(node => node.nativeRef)).toStrictEqual([snapshot.source]);
    const parentKey = JSON.stringify([scope.workspace, scope.principal, operationRef.provider, operationRef.type, '', operationRef.id]);
    expect(projection.relations({scope, from: parentKey}).map(edge => [edge.kind, edge.provenance.source])).toStrictEqual([['grouping', 'hyperunix']]);
  });

  it('H4: over every projectable kind and both licences the emitted relation kinds are a subset of grouping', () => {
    const kinds = new Set<string>();
    for (const kind of HYPERUNIX_EXECUTION_KINDS.filter(item => !MUTATION.has(item))) {
      for (const licensed of [true, false]) {
        for (const host of [context, {...context, operationRef}, {...context, operationRef: {...operationRef, scope: WS}}]) {
          const topology = hyperunixTopology(kindOf(kind, licensed), host);
          expect(topology.relations.length).toBe(host.operationRef === undefined ? 0 : 1);
          for (const relation of topology.relations) kinds.add(relation.kind);
          expect(JSON.stringify(topology)).not.toMatch(LIFECYCLE);
        }
      }
    }
    expect([...kinds]).toStrictEqual(['grouping']);
  });

  // docs/workbench/13 § "Key validations": "unrecognized SDK message version => diagnostic rather than silent success".
  // docs/workbench/07 § "Shared integration requirements": "Every live adapter records: SDK package + revision, native operation
  // IDs, owner/basis, observed evidence, error taxonomy".
  const refusals: [string, JsonValue][] = [
    ['contract hyperunix.find/v2', {...measured(), contract: 'hyperunix.find/v2'}],
    ['representation hyperunix.result/2', measured({representation: 'hyperunix.result/2'})],
    ["execution kind 'done'", measured({execution_status: {kind: 'done'}})],
    ["licenses_absence 'false' (a string)", measured({coverage_summary: {licenses_absence: 'false'}})],
    ["binarySha256 'abc'", measured({}, {runtime: {version: '0.1.0', binarySha256: 'abc'}})],
    ['a missing runtime.version', measured({}, {runtime: {binarySha256: BINARY}})],
    ['a null reading', null],
    ['an array reading', [measured()]],
    ['a string reading', 'hyperunix.find/v1'],
    ['a missing contract', omit(measured(), 'contract')],
    ['a missing source', omit(measured(), 'source')],
    ['a missing representation', omitSource('representation')],
    ['a missing execution_status', omitSource('execution_status')],
    ['a non-string execution kind', measured({execution_status: {kind: 1}})],
    ['an inherited-name execution kind', measured({execution_status: {kind: 'constructor'}})],
    ['a missing coverage_summary', omitSource('coverage_summary')],
    ['a missing licenses_absence', measured({coverage_summary: {}})],
    ['rows that are not an array', measured({rows: {length: 0}})],
    ['missing rows', omitSource('rows')],
    ['a numeric operation', measured({operation: 7})],
    ['an empty operation', measured({operation: ''})],
    ['a missing operation', omitSource('operation')],
    ['a missing runtime', omit(measured(), 'runtime')],
    ['an uppercase binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: BINARY.toUpperCase()}})],
    ['a 63-character binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: BINARY.slice(1)}})],
    ['a prefixed binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: `sha256:${BINARY}`}})],
    ['a numeric runtime.version', measured({}, {runtime: {version: 1, binarySha256: BINARY}})],
    ['an empty runtime.version', measured({}, {runtime: {version: '', binarySha256: BINARY}})],
    ['a runtime.version carrying a terminal escape', measured({}, {runtime: {version: '0.1.0\u001b[31m', binarySha256: BINARY}})],
    ['a complete-empty answer that carries rows', kindOf('complete-empty', true, {rows: [{path: 'a'}]})],
  ];
  it.each(refusals)('H5: refuses %s with a typed validation error and no snapshot', (_name, value) => {
    let result: HyperUnixProjectionTopology | undefined;
    const error = thrown(() => { result = hyperunixTopology(value, context); });
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({category: 'validation'});
    expect(result).toBeUndefined();
  });

  it('H5: a reading of another workspace is an authorization refusal, mirroring the Furnace observer identity check', () => {
    const host = {...context, scope: {workspace: '/ws', principal: 'local-operator:tester'}};
    expect(hyperunixTopology(measured({}, {workspaceRoot: '/ws'}), host).snapshots).toHaveLength(1);
    for (const value of [measured({}, {workspaceRoot: '/other'}), omit(measured({}, {workspaceRoot: '/ws'}), 'workspaceRoot'), measured({}, {workspaceRoot: '/ws/'})]) {
      const error = thrown(() => hyperunixTopology(value, host));
      expect(error).toBeInstanceOf(CapabilityError);
      expect(error).toMatchObject({category: 'authorization'});
      expect((error as Error).message).toBe('HX reading workspace differs from observer scope.');
    }
  });

  it.each(MUTATION_KINDS)('H5: a %s outcome is refused under either licence: this is a read adapter', kind => {
    for (const licensed of [true, false]) {
      const error = thrown(() => hyperunixTopology(kindOf(kind, licensed), context));
      expect(error).toBeInstanceOf(CapabilityError);
      expect(error).toMatchObject({category: 'validation'});
      expect((error as Error).message).toContain('mutation');
    }
  });

  it('H5: the kind tuple is pinned to the vendored SDK ExecutionStatusKind at type level and against its shipped declaration', () => {
    expectTypeOf<(typeof HYPERUNIX_EXECUTION_KINDS)[number]>().toEqualTypeOf<ExecutionStatusKind>();
    // Since wb-zsv the gate's typing step type-checks test/ too (forge.toml typing -> npm run typecheck:test over tsconfig.test.json),
    // so the pin above is gate-enforced; the runtime read below is kept as a second, tsc-free witness of the same SDK enum.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const start = declaration.indexOf('export type ExecutionStatus =');
    const end = declaration.indexOf('export type ExecutionStatusKind');
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const declared = [...declaration.slice(start, end).matchAll(/readonly kind: "([^"]+)";/g)].map(match => match[1]);
    expect(declared).toHaveLength(HYPERUNIX_EXECUTION_KINDS.length);
    expect([...declared].sort()).toStrictEqual([...HYPERUNIX_EXECUTION_KINDS].sort());
  });

  it('H5: every pinned kind survives the vendored SDK decoder, and an unregistered kind decodes to a failure the adapter keeps failed', () => {
    for (const kind of HYPERUNIX_EXECUTION_KINDS) expect(resultFromJson(sdkDocument({execution_status: {kind}})).status.kind).toBe(kind);
    const unregistered = providerReading(sdkDocument({execution_status: {kind: 'done'}}));
    expect(unregistered).toMatchObject({source: {execution_status: {kind: 'protocol-failed'}}});
    expect(hyperunixTopology(unregistered, context).snapshots[0]).toMatchObject({coverage: 'unknown', node: {statusTone: 'failure', statusText: 'protocol-failed'}});
  });

  it.each([
    ['an unzoned capture time', {...context, capturedAt: '2026-10-15T08:40:00'}],
    ['an unparseable observation time', {...context, observedAt: 'not-a-time'}],
    ['a non-ISO capture time that Date.parse still accepts', {...context, capturedAt: 'Thu, 15 Oct 2026 08:40:00 +00:00'}],
    ['an impossible calendar instant', {...context, observedAt: '2026-13-45T08:40:01Z'}],
    ['an empty principal', {...context, scope: {...scope, principal: ''}}],
    ['a workspace carrying a control character', {...context, scope: {...scope, workspace: '/tmp/hx\nws'}}],
    ['a workspace longer than 256 bytes', {...context, scope: {...scope, workspace: `/${'é'.repeat(128)}`}}],
    ['an empty query kind', {...context, target: {kind: ''}}],
    ['a missing target', {...context, target: undefined}],
    ['a non-string query root', {...context, target: {kind: 'hx.fs/regular-file', root: 7}}],
    ['an oversized invocation id', {...context, invocationId: 'i'.repeat(257)}],
    ['an invocation id carrying a bidi override', {...context, invocationId: 'wf_\u202Ehx'}],
    ['an operation reference carrying a terminal escape', {...context, operationRef: {...operationRef, id: 'wf\u001b[2J'}}],
    ['an operation reference without a type', {...context, operationRef: {provider: 'pi-workflow', id: 'wf_hx_1:0'}}],
    ['an operation reference with an empty native scope', {...context, operationRef: {...operationRef, scope: ''}}],
    ['an operation reference aliasing the query node itself', {...context, operationRef: queryRef(derivedId(WS, 'find', 'hx.fs/regular-file', 'src', []))}],
  ])('H5: refuses host context with %s before projecting anything', (_name, bad) => {
    const error = thrown(() => hyperunixTopology(measured(), bad as unknown as HyperUnixTopologyContext));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({category: 'validation'});
  });

  it('H5: tolerates unknown producer fields and never copies them into any output field', () => {
    const extended = measured({extra_source_field: 'EXTRA-SOURCE', execution_status: {kind: 'incomplete', diagnostic_code: 'EXTRA-CODE'},
      coverage_summary: {licenses_absence: false, completeness: 'EXTRA-COMPLETENESS', incomplete_regions: [{scope: 'EXTRA-REGION'}]},
      diagnostics: [{code: 'EXTRA-DIAGNOSTIC', message: 'EXTRA-MESSAGE'}], evidence: {support_ids: ['EXTRA-SUPPORT']}, digest: 'sha256:EXTRA-DIGEST'},
    {extra_top_field: 'EXTRA-TOP', runtime: {version: '0.1.0', binarySha256: BINARY, path: 'EXTRA-PATH'}});
    const result = hyperunixTopology(extended, context);
    expect(result).toStrictEqual(hyperunixTopology(measured(), context));
    expect(JSON.stringify(result)).not.toMatch(/EXTRA-/);
  });

  // docs/workbench/12 § "Input and output hardening": "Validate Unicode and terminal escape sequences before display (no untrusted
  // ANSI injection)." docs/workbench/09 § "Acceptance/negative controls" item 10: "Large/secret payload does not leak into Pi tool
  // result or screen by default."
  it('H6: hostile operation and target text reach title and diagnostics stripped, redacted and bounded', () => {
    const hostile = {...context, target: {kind: 'hx.fs/\u202Eregular', root: 'src Bearer abc123'}};
    const topology = hyperunixTopology(measured({operation: 'find\u001b[31m'}), hostile);
    const [snapshot] = topology.snapshots;
    // Unsafe sequences become spaces before the shared redactor runs; the shared sanitizers then redact and strip.
    expect(snapshot.node.title).toBe('HX find hx.fs/ regular src [REDACTED]');
    expect(topology.diagnostics[0]).toBe(`${DERIVED}: HX find hx.fs/ regular src [REDACTED]`);
    boundedDiagnostics(topology);
    for (const text of [snapshot.node.title, ...topology.diagnostics]) {
      expect(text).not.toMatch(UNSAFE);
      expect(text).not.toContain('abc123');
    }
    expect(JSON.stringify(topology)).not.toContain('abc123');
    // The derived id hashes the raw native and host strings: sanitization is for display, never for identity.
    expect(snapshot.source.id).toBe(derivedId(WS, 'find\u001b[31m', 'hx.fs/\u202Eregular', 'src Bearer abc123', []));
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
  });

  it('H6: a credential glued to an escape or bidi mark is still redacted, and a 10,000-character target stays within 120', () => {
    const glued = hyperunixTopology(measured({operation: 'find\u001b[0mBearer abc123'}), {...context, target: {kind: 'Bearer\u202Edef456', root: 'password=ghi789'}});
    const title = glued.snapshots[0].node.title;
    for (const secret of ['abc123', 'def456', 'ghi789']) expect(JSON.stringify(glued)).not.toContain(secret);
    expect(title).toBe('HX find [REDACTED] [REDACTED] password=[REDACTED]');
    const long = hyperunixTopology(measured(), {...context, target: {kind: `hx.fs/${'k'.repeat(10_000)}`, root: 'src'}});
    expect(long.snapshots[0].node.title.length).toBeLessThanOrEqual(120);
    expect(long.snapshots[0].node.title).toMatch(/^HX find hx\.fs\/k+ \[truncated\]$/);
    boundedDiagnostics(long);
    // An odd prefix makes the 120-character bound cut through a surrogate pair; the orphaned code unit is dropped.
    const astral = hyperunixTopology(measured(), {...context, target: {kind: `hx.fs/x${'😀'.repeat(200)}`}});
    expect(astral.snapshots[0].node.title).not.toMatch(/[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/);
    expect(astral.snapshots[0].node.title.length).toBeLessThanOrEqual(120);
  });

  it('H6: row, claim and certificate bodies never surface, and 40 certificates cap evidence at 32 references', () => {
    const certificates = Array.from({length: 40}, (_, index) => certificate(`b${index + 1}`, {secret: 'SECRET-CERT'}));
    const topology = hyperunixTopology(measured({rows: [{path: 'SECRET-ROW-BODY', claim: {body: 'SECRET-CLAIM'}}], coverage: certificates}), context);
    const text = JSON.stringify(topology);
    for (const secret of ['SECRET-ROW-BODY', 'SECRET-CLAIM', 'SECRET-CERT', 'No_change_exclusion', 'fs-subtree']) expect(text).not.toContain(secret);
    const refs = topology.snapshots[0].evidenceRefs ?? [];
    expect(refs).toHaveLength(32);
    expect(refs).toStrictEqual([BINARY_REF, ...Array.from({length: 31}, (_, index) => `hx-coverage:b${index + 1}`)]);
    expect(topology.diagnostics).toContain('coverage evidence references are capped at 32: 9 omitted');
    // The derived key still covers every certified batch, listed or not.
    expect(topology.snapshots[0].source.id).toBe(derivedId(WS, 'find', 'hx.fs/regular-file', 'src', certificates.map(item => String(item.batch_id))));
    boundedDiagnostics(topology);
    const projection = new ObservationProjection();
    expect(projection.refresh(topology.snapshots[0])).toBe('applied');
    expect(projection.query({scope, evidence: 'hx-coverage:b31', limit: 1}).nodes).toHaveLength(1);
  });

  it('H6: a batch id that is not an exact displayable identity is withheld from evidence, and the withholding is diagnosed', () => {
    const ids = ['b1', 'b\u001b[2J2', 'Bearer abc123', `b${'x'.repeat(300)}`, 'b1'];
    const topology = hyperunixTopology(measured({coverage: ids.map(id => certificate(id))}), context);
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual([BINARY_REF, 'hx-coverage:b1']);
    expect(topology.diagnostics).toContain('3 of 4 coverage batch ids withheld from evidence references: not exact displayable identities');
    expect(JSON.stringify(topology)).not.toContain('abc123');
    expect(JSON.stringify(topology)).not.toContain('xxxxxxxx');
    boundedDiagnostics(topology);
    const projection = new ObservationProjection();
    expect(projection.refresh(topology.snapshots[0])).toBe('applied');
  });

  // docs/workbench/10 § "Rendering pipeline": "Pure layout and keyboard reducers are unit-tested without a TTY." applied to this
  // pure adapter: no clock, randomness, network, SDK process or projection mutation, and a frozen, JSON-lossless result.
  it('H7: identical input yields deep-equal, deeply frozen, JSON-lossless output with no clock, randomness, network or input mutation', () => {
    const now = vi.spyOn(Date, 'now');
    const random = vi.spyOn(Math, 'random');
    const fetch = vi.spyOn(globalThis, 'fetch');
    const value = deepFreeze(structuredClone(measured({coverage: [certificate('b1'), certificate('b2')], rows: [{path: 'a'}]})));
    const host = deepFreeze(structuredClone({...context, invocationId: 'wf_hx_1', operationRef}));
    const pristine = structuredClone(value);
    const first = hyperunixTopology(value, host);
    const second = hyperunixTopology(value, host);
    expect(first).toStrictEqual(second);
    expect(first).not.toBe(second);
    expect(value).toStrictEqual(pristine);
    for (const spy of [now, random, fetch]) expect(spy).not.toHaveBeenCalled();
    expect(Object.isFrozen(first)).toBe(true);
    everyObject(first, item => { expect(Object.isFrozen(item)).toBe(true); });
    expect(JSON.parse(JSON.stringify(first))).toStrictEqual(first);
    // Nothing in the result aliases the caller's objects.
    expect(first.snapshots[0].scope).not.toBe(host.scope);
    expect(first.relations[0].scope).not.toBe(host.scope);
    expect(first.relations[0].from).not.toBe(host.operationRef);
    expect(() => (first.snapshots as NativeSnapshot[]).push(first.snapshots[0])).toThrow(TypeError);
    expect(() => (first.diagnostics as string[]).push('later')).toThrow(TypeError);
  });

  it('H7: the module source has no clock, randomness, process, file or dynamic-import access and imports only its four allowed modules', () => {
    const text = readFileSync(new URL('../src/workbench/hyperunix-observer.ts', import.meta.url), 'utf8');
    for (const forbidden of ['Date.now', 'Math.random', 'process.', 'child_process', 'node:fs', 'import(']) expect(text).not.toContain(forbidden);
    expect(text).not.toMatch(/\brequire\s*\(/);
    const statements = text.match(/^import\s/gm) ?? [];
    const specifiers = [...text.matchAll(/^import\s[^;]*?\sfrom\s+'([^']+)';/gm)].map(match => match[1]);
    expect(specifiers).toHaveLength(statements.length);
    expect([...specifiers].sort()).toStrictEqual(['./capability-registry.js', './observation.js', './redaction.js', 'node:crypto']);
    expect(text).not.toMatch(/^export\s+(?:type\s+)?(?:\*|\{[^}]*\})\s*from\s/m);
  });
});

describe('HyperUnix adapter consumes the registered hyperunix.find provider output unchanged', () => {
  const ctx = {grants: ['hyperunix:read'], signal: new AbortController().signal};
  async function invoked(document: Json): Promise<JsonValue> {
    const native = resultFromJson(document);
    const registry = new CapabilityRegistry();
    registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}), close: async () => {}}, WS);
    return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, ctx);
  }

  it('projects what registerHyperUnixFind returns for the measured incomplete read: partial, coverage evidence, no bodies', async () => {
    const value = await invoked(sdkDocument());
    // The registry hands back validated null-prototype JSON, so the comparison is structural.
    expect(value).toEqual(providerReading(sdkDocument()));
    expect(value).toMatchObject({contract: 'hyperunix.find/v1', workspaceRoot: WS,
      source: {representation: 'hyperunix.result/1', execution_status: {kind: 'incomplete'}, coverage_summary: {licenses_absence: false}}});
    const topology = hyperunixTopology(value, {...context, invocationId: 'wf_hx_1', operationRef});
    const [snapshot] = topology.snapshots;
    expect(snapshot).toMatchObject({coverage: 'partial', sourceVersion: '0.1.0',
      node: {title: 'HX find hx.fs/regular-file src', statusTone: 'unknown', statusText: 'incomplete · rows 2 · absence not licensed'}});
    expect(snapshot.source).toStrictEqual(queryRef(derivedId(WS, 'find', 'hx.fs/regular-file', 'src', LIVE_BATCHES)));
    expect(snapshot.evidenceRefs).toStrictEqual([BINARY_REF, ...LIVE_BATCHES.map(id => `hx-coverage:${id}`)]);
    const text = JSON.stringify(topology);
    for (const secret of ['SECRET-ROW-BODY', 'SECRET-CERT', 'SECRET-DIAGNOSTIC', 'src/index.ts', 'No_change_exclusion', 'HX-COVERAGE-INCOMPLETE', '"verified"']) {
      expect(text).not.toContain(secret);
    }
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of topology.relations) projection.relate(relation);
    expect(projection.query({scope, parent: operationRef, limit: 10}).nodes).toMatchObject([{nativeRef: snapshot.source, completeness: 'partial'}]);
  });

  it('keeps a provider-failed result failed and reads a runtime-licensed complete-empty result as the one known-empty success', async () => {
    const failed = hyperunixTopology(await invoked(sdkDocument({execution_status: {kind: 'provider-failed', diagnostic_code: 'HX-PROVIDER-FAILED'}, rows: [], coverage: []})), context);
    expect(failed.snapshots[0]).toMatchObject({coverage: 'unknown', node: {statusTone: 'failure', statusText: 'provider-failed'}});
    const empty = hyperunixTopology(await invoked(sdkDocument({execution_status: {kind: 'complete-empty', diagnostic_code: null}, rows: [],
      coverage_summary: {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: true, certificates_license_absence: true,
        incomplete_regions: [], result_coverage: null, answer_count: 0}})), context);
    expect(empty.snapshots[0]).toMatchObject({coverage: 'complete', node: {statusTone: 'success', statusText: 'known-empty (runtime-licensed) · rows 0'}});
    // The runtime's certificate verdict alone is informational: without licenses_absence the same empty answer stays partial.
    const unlicensed = hyperunixTopology(await invoked(sdkDocument({execution_status: {kind: 'complete-empty', diagnostic_code: null}, rows: [],
      coverage_summary: {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: false, certificates_license_absence: true,
        incomplete_regions: [], result_coverage: null, answer_count: 0}})), context);
    expect(unlicensed.snapshots[0]).toMatchObject({coverage: 'partial', node: {statusTone: 'unknown'}});
    expect(unlicensed.diagnostics).toContain('runtime did not license absence');
  });

  it('refuses a mutation outcome that reached it through the provider path', async () => {
    const value = await invoked(sdkDocument({execution_status: {kind: 'mutation-partial', diagnostic_code: null}}));
    expect(thrown(() => hyperunixTopology(value, context))).toMatchObject({category: 'validation'});
  });

  // wb-tz2.1 acceptance 3: the live HX statements stay green against a GC-D10-fixed hx returning a licensed-complete verdict as
  // well as against today's measured read. Statement for statement the rewritten test/workbench-ecosystem-native.test.ts HX case,
  // replayed through the same registered-provider path over both verdict shapes.
  it('R1: the rewritten live HX statements hold over the measured incomplete read and a licensed complete-empty read alike', async () => {
    for (const document of [sdkDocument(), sdkDocument(LICENSED_COMPLETE_EMPTY)]) {
      const result = await invoked(document);
      expect(result).toMatchObject({contract: 'hyperunix.find/v1', source: {representation: 'hyperunix.result/1'},
        runtime: {binarySha256: expect.stringMatching(/^[0-9a-f]{64}$/)}});
      expect(hxLiveInvariant(result)).toMatchObject({holds: true, violations: []});
      expect(JSON.stringify(result)).not.toContain('"verified":true');
    }
  });
});

// wb-tz2.1 (HX-ORIGINAL-GOALS-CLOSURE-R1): the two live-binary HX tests assert the program-normative runtime-licence invariant
// through one shared pure predicate instead of any concrete verdict, so a correct hx fix (GC-D10) or a version bump cannot turn
// Pi's only live HX witness red. These rows run in the default gate over the existing fixtures of this file.
describe('hxLiveInvariant: the shared live-tier runtime-licence invariant (wb-tz2.1)', () => {
  const withVersion = (version: JsonValue): Json => measured({}, {runtime: {version, binarySha256: BINARY}});

  // Acceptance 1: "accepts BOTH the measured incomplete fixture (:37-43) and the runtime-licensed complete-empty fixture (:592-605)".
  it('R1: accepts the measured incomplete read and the runtime-licensed complete-empty read, licensing absence only for the second', () => {
    expect(hxLiveInvariant(measured())).toStrictEqual({holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'});
    expect(hxLiveInvariant(providerReading(sdkDocument()))).toStrictEqual(hxLiveInvariant(measured()));
    expect(hxLiveInvariant(providerReading(sdkDocument(LICENSED_COMPLETE_EMPTY))))
      .toStrictEqual({holds: true, violations: [], absenceLicensed: true, versionClass: 'unstamped'});
    expect(Object.isFrozen(hxLiveInvariant(measured()).violations)).toBe(true);
  });

  // Acceptance 2: "Predicate rejects, each as its own unit assertion: licence true on a non-complete kind; a kind outside
  // HYPERUNIX_EXECUTION_KINDS (e.g. 'done', mirroring refusal fixture :346); binarySha256 failing the 64-hex regex (:348);
  // missing/empty runtime.version (:349)." Every row names exactly the clause it breaks.
  const rejections: [string, JsonValue, HyperUnixLiveClause[]][] = [
    ['licence true on the non-complete kind incomplete', kindOf('incomplete', true), ['licence-without-complete-kind']],
    ["execution kind 'done' (refusal fixture :346)", measured({execution_status: {kind: 'done'}}), ['execution-kind']],
    ["binarySha256 'abc' (refusal fixture :348)", measured({}, {runtime: {version: '0.1.0', binarySha256: 'abc'}}), ['binary-sha256']],
    ['a missing runtime.version (refusal fixture :349)', measured({}, {runtime: {binarySha256: BINARY}}), ['runtime-version']],
    ['an empty runtime.version (refusal fixture :371)', withVersion(''), ['runtime-version']],
    ["licenses_absence 'false' as a string (refusal fixture :347)", measured({coverage_summary: {licenses_absence: 'false'}}), ['licence-boolean']],
    ['a missing coverage_summary', omitSource('coverage_summary'), ['licence-boolean']],
    ['a non-string execution kind', measured({execution_status: {kind: 1}}), ['execution-kind']],
    ['an inherited-name execution kind', measured({execution_status: {kind: 'constructor'}}), ['execution-kind']],
    ['an uppercase binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: BINARY.toUpperCase()}}), ['binary-sha256']],
    ['a 63-character binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: BINARY.slice(1)}}), ['binary-sha256']],
    ['a prefixed binary digest', measured({}, {runtime: {version: '0.1.0', binarySha256: `sha256:${BINARY}`}}), ['binary-sha256']],
    ['a numeric runtime.version', withVersion(1), ['runtime-version']],
    ['a runtime.version carrying a terminal escape', withVersion('0.1.0\u001b[31m'), ['runtime-version']],
    ['a runtime.version longer than 256 bytes', withVersion(`0.1.0+${'x'.repeat(256)}`), ['runtime-version']],
    ['a missing runtime', omit(measured(), 'runtime'), ['binary-sha256', 'runtime-version']],
    ['a null reading', null, ['execution-kind', 'licence-boolean', 'binary-sha256', 'runtime-version']],
    ['an array reading', [measured()], ['execution-kind', 'licence-boolean', 'binary-sha256', 'runtime-version']],
    ['a string reading', 'hyperunix.find/v1', ['execution-kind', 'licence-boolean', 'binary-sha256', 'runtime-version']],
  ];
  it.each(rejections)('R1: rejects %s, naming exactly the broken clauses', (_name, value, clauses) => {
    expect(hxLiveInvariant(value)).toMatchObject({holds: false, violations: clauses, absenceLicensed: false});
  });

  it.each([...PARTIAL_KINDS, ...FAILURE_KINDS])('R1: a licence on the non-complete kind %s breaks the invariant; without one it holds unlicensed', kind => {
    expect(hxLiveInvariant(kindOf(kind, true))).toMatchObject({holds: false, violations: ['licence-without-complete-kind'], absenceLicensed: false});
    expect(hxLiveInvariant(kindOf(kind, false))).toMatchObject({holds: true, violations: [], absenceLicensed: false});
  });

  it.each(MUTATION_KINDS)('R1: a %s outcome breaks the invariant under either licence: the live reads are finds', kind => {
    expect(hxLiveInvariant(kindOf(kind, false)).violations).toStrictEqual(['read-outcome']);
    expect(hxLiveInvariant(kindOf(kind, true)).violations).toStrictEqual(['read-outcome', 'licence-without-complete-kind']);
  });

  it('R1: only a licensed complete or complete-empty kind licenses absence; the same kinds without the licence hold unlicensed', () => {
    for (const kind of ['complete', 'complete-empty']) {
      expect(hxLiveInvariant(kindOf(kind, true))).toStrictEqual({holds: true, violations: [], absenceLicensed: true, versionClass: 'unstamped'});
      expect(hxLiveInvariant(kindOf(kind, false))).toStrictEqual({holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'});
    }
  });

  // Acceptance 4 (negative): "completeness decided only from execution_status.kind + coverage_summary.licenses_absence - a result
  // with rows [] and exit 0 and licence false never reads complete/known-empty; no exit_code or rows.length branch decides completeness".
  it('R1: rows [], exit 0 and no licence never read complete, and no row, retention, exit or answer-count field moves the verdict', () => {
    const unlicensed = providerReading(sdkDocument({...LICENSED_COMPLETE_EMPTY, coverage_summary: {modes: ['complete-within-scope'],
      completeness: 'complete', licenses_absence: false, certificates_license_absence: true, incomplete_regions: [], result_coverage: null,
      answer_count: 0}}));
    expect(unlicensed).toMatchObject({source: {rows: [], status: {exit_code: 0}, execution_status: {kind: 'complete-empty'}}});
    expect(hxLiveInvariant(unlicensed)).toMatchObject({holds: true, absenceLicensed: false});
    const cells: [string, boolean][] = [['complete-empty', true], ['complete', true], ['complete', false], ['incomplete', false], ['provider-failed', false]];
    const variants: Json[] = [{rows: []}, {rows: [{path: 'a'}, {path: 'b'}]}, {rows_retained: false}, {status: {exit_code: 0, signal: null}},
      {status: {exit_code: 1, signal: 'SIGTERM'}}, {terminal: 'incomplete'}];
    for (const [kind, licensed] of cells) {
      const reference = hxLiveInvariant(kindOf(kind, licensed));
      for (const variant of variants) expect(hxLiveInvariant(kindOf(kind, licensed, variant))).toStrictEqual(reference);
      const counted = kindOf(kind, licensed, {coverage_summary: {licenses_absence: licensed, answer_count: 75, completeness: 'complete'}});
      expect(hxLiveInvariant(counted)).toStrictEqual(reference);
    }
    // ...and the predicate's own source never reads those fields, so no such branch can exist.
    const text = readFileSync(new URL('../src/workbench/hyperunix-observer.ts', import.meta.url), 'utf8');
    const start = text.indexOf('export function hxLiveInvariant(');
    expect(start).toBeGreaterThan(0);
    const body = text.slice(start, text.indexOf('\n}\n', start));
    expect(body.length).toBeGreaterThan(0);
    expect(body).not.toMatch(/\brows\b|rows_retained|exit_code|\bstatus\b|answer_count|\bterminal\b|completeness/);
  });

  it('R1: agrees with the adapter over every kind and licence: a holding verdict projects, and absence is licensed exactly on complete coverage', () => {
    for (const kind of HYPERUNIX_EXECUTION_KINDS) {
      for (const licensed of [true, false]) {
        const value = kindOf(kind, licensed);
        const verdict = hxLiveInvariant(value);
        if (MUTATION.has(kind)) {
          expect(thrown(() => hyperunixTopology(value, context))).toMatchObject({category: 'validation'});
          expect(verdict.holds).toBe(false);
          continue;
        }
        const [snapshot] = hyperunixTopology(value, context).snapshots;
        expect(verdict.absenceLicensed).toBe(snapshot.coverage === 'complete');
        if (snapshot.coverage === 'complete') expect(verdict.holds).toBe(true);
      }
    }
  });

  // Fold-in HXFS-PI-3 (bead notes): "classify runtime.version as a build identity (<version>+<family>.<commit>) versus a bare
  // semver ... a bare 0.1.0 is recorded as 'unstamped binary - provenance unknown'. The sha256 stays the identity pin; the version
  // class is a label, never a branch that decides completeness or fails the read."
  it('R1 fold-in HXFS-PI-3: runtime.version is classed installed only for an installed build identity, and the class never moves the verdict', () => {
    for (const stamped of ['0.1.0+primary.3f2a1b9c', '0.1.0+primary.3f2a1b9', '1.2.3+dogfood.x86.0123456789abcdef0123456789abcdef01234567',
      '0.2.0-rc.1+primary.3f2a1b9c']) {
      expect(hxLiveInvariant(withVersion(stamped))).toStrictEqual({holds: true, violations: [], absenceLicensed: false, versionClass: 'installed'});
    }
    for (const bare of ['0.1.0', '0.1.0+primary', '0.1.0+primary.', '0.1.0+.3f2a1b9c', '0.1.0+primary.3F2A1B9C', '0.1.0+primary.3f2a1b',
      'v0.1.0+primary.3f2a1b9c', 'hx 0.1.0+primary.3f2a1b9c', '0.1.0+primary.3f2a1b9c ', '0.1+primary.3f2a1b9c', 'unknown']) {
      expect(hxLiveInvariant(withVersion(bare))).toStrictEqual({holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'});
    }
    // An unclassifiable or undisplayable version is never installed, and the version clause still decides holds on its own.
    expect(hxLiveInvariant(withVersion('0.1.0+primary.3f2a1b9c\u001b[31m'))).toMatchObject({holds: false, versionClass: 'unstamped'});
    expect(hxLiveInvariant(omit(measured(), 'runtime'))).toMatchObject({holds: false, versionClass: 'unstamped'});
    const {versionClass: installed, ...stampedRest} = hxLiveInvariant(withVersion('0.1.0+primary.3f2a1b9c'));
    const {versionClass: unstamped, ...bareRest} = hxLiveInvariant(withVersion('0.1.0'));
    expect([installed, unstamped]).toStrictEqual(['installed', 'unstamped']);
    expect(stampedRest).toStrictEqual(bareRest);
  });
});

// Fold-in HXFS-PI-3: the receipt line both live HX cases print (test/helpers/hx-live-receipt.ts). It says "installed" only for an
// installed build identity, records a bare 0.1.0 as "unstamped binary — provenance unknown", and echoes no identity from a read
// the invariant refuses.
describe('hxLiveReceipt: the live HX receipt line (wb-tz2.1 fold-in HXFS-PI-3)', () => {
  const withVersion = (version: JsonValue): Json => measured({}, {runtime: {version, binarySha256: BINARY}});
  const PREFIX = `${HX_NATIVE_RECEIPT} `;
  const body = (line: string): JsonValue => {
    expect(line.startsWith(PREFIX)).toBe(true);
    expect(line).not.toContain('\n');
    return JSON.parse(line.slice(PREFIX.length)) as JsonValue;
  };

  it('R1 fold-in HXFS-PI-3: the measured bare 0.1.0 read is recorded as an unstamped binary of unknown provenance, never as installed', () => {
    const line = hxLiveReceipt(measured());
    expect(body(line)).toStrictEqual({version: '0.1.0', versionClass: 'unstamped', provenance: 'unstamped binary — provenance unknown',
      binarySha256: BINARY, kind: 'incomplete', absenceLicensed: false});
    expect(line).not.toMatch(/installed/i);
  });

  it('R1 fold-in HXFS-PI-3: only an installed build identity is called installed; every other version reads unstamped', () => {
    for (const stamped of ['0.1.0+primary.3f2a1b9c', '0.2.0-rc.1+primary.3f2a1b9c']) {
      const line = hxLiveReceipt(withVersion(stamped));
      expect(body(line)).toMatchObject({version: stamped, versionClass: 'installed', provenance: 'installed build identity'});
      expect(line).toMatch(/installed/);
    }
    for (const bare of ['0.1.0', '0.2.0', '0.1.0+primary', 'v0.1.0+primary.3f2a1b9c', 'unknown']) {
      const line = hxLiveReceipt(withVersion(bare));
      expect(body(line)).toMatchObject({version: bare, versionClass: 'unstamped', provenance: 'unstamped binary — provenance unknown'});
      expect(line).not.toMatch(/installed/i);
    }
  });

  it('R1 fold-in HXFS-PI-3: the receipt records a licensed complete-empty read as licensed and carries no row, certificate or diagnostic body', () => {
    expect(body(hxLiveReceipt(providerReading(sdkDocument(LICENSED_COMPLETE_EMPTY)))))
      .toMatchObject({kind: 'complete-empty', absenceLicensed: true, versionClass: 'unstamped'});
    const line = hxLiveReceipt(providerReading(sdkDocument()));
    expect(body(line)).toStrictEqual(body(hxLiveReceipt(measured())));
    for (const secret of ['SECRET-ROW-BODY', 'SECRET-CERT', 'SECRET-DIAGNOSTIC', 'src/index.ts', 'HX-COVERAGE-INCOMPLETE', WS, '"verified"']) {
      expect(line).not.toContain(secret);
    }
  });

  it('R1 fold-in HXFS-PI-3: a read the invariant refuses prints no identity at all, only the broken clauses', () => {
    const escaped = hxLiveReceipt(withVersion('0.1.0+primary.3f2a1b9c\u001b[31m'));
    expect(escaped).toBe(`${PREFIX}{"withheld":true,"violations":["runtime-version"]}`);
    const unknownKind = hxLiveReceipt(measured({execution_status: {kind: 'done'}}));
    expect(body(unknownKind)).toStrictEqual({withheld: true, violations: ['execution-kind']});
    expect(unknownKind).not.toContain(BINARY);
    expect(body(hxLiveReceipt(null))).toStrictEqual({withheld: true,
      violations: ['execution-kind', 'licence-boolean', 'binary-sha256', 'runtime-version']});
  });
});

/** wb-gwr.2 (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R2, program-triage-2026-10-18). Statement (the bead title, verbatim): "When an HX
 * result Pi consumes carries a view identity or consistency mode, provider versions, conflict or incomplete-region statuses (WM-002,
 * 01-boundaries.md:6@694570cd00c2), the HX reader adapter shall carry each verbatim as its own facet, never folded into coverage or
 * tone nor read as absence or source basis; a result lacking them projects byte-identically. Artifact: a measured read carrying
 * them." Acceptance (the bead's notes, verbatim): "an adapter unit test feeds a hyperunix.result/1 fixture with a non-null view,
 * non-empty provider_versions, non-empty incomplete_regions and a conflict diagnostic and asserts each surfaces verbatim as its own
 * bounded, sanitized facet (typed field or diagnostic), coverage and statusTone unchanged by any of them, absence still requiring
 * licenses_absence true on a complete kind (hyperunix-observer.ts:216-217), and no provider version or view ever used as
 * sourceVersion or a source basis; a fixture without the fields projects toStrictEqual today's snapshot".
 * THE ARTIFACT, measured read-only by the cutting seat (ws-01, run g10-work-s120, 2026-10-28T01:06:06Z): the vendored @hyperunix/sdk
 * 0.1.0 find this provider issues (kind hx.fs/regular-file, root src, best effort) over this tree at trunk 216ed85, with hx 0.1.0
 * (binary sha256 MEASURED_BINARY), returned view 'hx.view/workspace-head', providers ['hx.fs/builtin'], provider_versions
 * {'hx.fs/builtin': '0.1.0'} and one incomplete region; the 2026-10-15 read above carried view null and provider_versions {}. No
 * measured read carries a conflict diagnostic, so the conflict facet is pinned on HX's own code spelling (HX-SCHEMA-CONFLICT) from a
 * fixture; hyperunix.result/1 has no consistency-mode field, so a consistency mode is a named residual that sequences behind the
 * wb-tz2.3 successor re-vendor (R1-RESIDUAL below). Rows: G1 the measured read; G2 the acceptance fixture; G3 absence and basis;
 * G4 a result lacking them; G5 bounds and sanitizing; G6 only the measured shapes; G7 frozen, lossless, deterministic; and from
 * wb-noq8 (the landing-646 follow-up) G8 the whole-segment conflict boundary (CONFLICT glued to a letter or a digit is no conflict
 * status) and G9 a facet whose string sanitizes to nothing is not relayed, read guard by guard. */
describe('wb-gwr.2 HX result facets: view identity, provider versions, incomplete regions and conflicts relayed verbatim', () => {
  const MEASURED_BINARY = '451221852d248a2d31398b6b18bee9f6e149e5561e30bb6efc5fadeb23dc2913';
  const REGION_TARGET = 'hx.fs/directory-entry (coverage opportunistic (other:No_change_exclusion))';
  const ESC = String.fromCodePoint(0x1b);
  const BEL = String.fromCodePoint(0x07);
  const RLO = String.fromCodePoint(0x202e);
  /** The 2026-10-28 measured read as the SDK's hyperunix.result/1 document: the facet fields as measured, row, certificate and
   * diagnostic bodies replaced by secret markers that must never surface. */
  const measuredDocument = (overrides: Json = {}): Json => ({representation: 'hyperunix.result/1', operation: 'find',
    rows: [{path: 'SECRET-ROW-BODY'}, {path: 'src/index.ts'}], rows_retained: true,
    coverage: LIVE_BATCHES.map(id => certificate(id, {secret: 'SECRET-CERT'})),
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 272, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 272},
    execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'},
    diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'licenses no absence SECRET-DIAGNOSTIC'}],
    view: 'hx.view/workspace-head', cost: null,
    transport: {started_at: '2026-10-28T01:06:06.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 272},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: LIVE_BATCHES.map(() => 'opportunistic'), completeness: 'incomplete', licenses_absence: false,
      certificates_license_absence: false, incomplete_regions: [{scope: `fs:${WS}/src`, target: REGION_TARGET}], result_coverage: null, answer_count: 116},
    evidence: {support_ids: LIVE_BATCHES.map(id => `hx-fs/${id}/s1`), evidence_classes: ['observed'], derivation_handles: [],
      providers: ['hx.fs/builtin'], provider_versions: {'hx.fs/builtin': '0.1.0'}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides});
  /** The same document with every facet field empty: view null, no provider, no region, no conflict code. */
  const lacking = (overrides: Json = {}): Json => measuredDocument({view: null,
    coverage_summary: {modes: LIVE_BATCHES.map(() => 'opportunistic'), completeness: 'incomplete', licenses_absence: false,
      certificates_license_absence: false, incomplete_regions: [], result_coverage: null, answer_count: 116},
    evidence: {support_ids: LIVE_BATCHES.map(id => `hx-fs/${id}/s1`), evidence_classes: ['observed'], derivation_handles: [], providers: [], provider_versions: {}},
    ...overrides});
  /** The provider's own path for a document: resultToJson over the SDK's decoded result, inside the hyperunix.find/v1 envelope. */
  const reading = (document: Json, version = '0.1.0'): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
    source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version, binarySha256: MEASURED_BINARY}})) as JsonValue;
  const conflict: Json = {code: 'HX-SCHEMA-CONFLICT', severity: 'error', message: 'SECRET-CONFLICT-MESSAGE'};
  /** The acceptance fixture: a non-null view, non-empty provider_versions, a non-empty incomplete_regions and a conflict diagnostic. */
  const acceptance = (overrides: Json = {}): Json => measuredDocument({diagnostics: [...(measuredDocument().diagnostics as Json[]), conflict], ...overrides});
  /** The statement's own order: view identity, provider versions, conflict, incomplete-region statuses. */
  const ALL_FACETS = [
    {kind: 'view', view: 'hx.view/workspace-head'},
    {kind: 'provider-version', provider: 'hx.fs/builtin', version: '0.1.0'},
    {kind: 'conflict', code: 'HX-SCHEMA-CONFLICT'},
    {kind: 'incomplete-region', scope: `fs:${WS}/src`, target: REGION_TARGET},
  ];
  const MEASURED_FACETS = [ALL_FACETS[0], ALL_FACETS[1], ALL_FACETS[3]];
  const withKind = (document: Json, kind: string, licenses_absence: boolean): Json => ({...document,
    execution_status: {kind, diagnostic_code: null}, rows: kind === 'complete-empty' ? [] : document.rows,
    coverage_summary: {...(document.coverage_summary as Json), licenses_absence}});
  const PROJECTABLE = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION.has(kind));
  const withoutFacets = (topology: HyperUnixProjectionTopology): HyperUnixProjectionTopology => {
    const {facets: _facets, ...rest} = topology;
    return rest;
  };

  it('G1: the measured 2026-10-28 read relays its view, its provider version and its incomplete region verbatim, each as its own facet', async () => {
    const registry = new CapabilityRegistry();
    const native = resultFromJson(measuredDocument());
    registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: MEASURED_BINARY}), close: async () => {}}, WS);
    const value = await registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'},
      {grants: ['hyperunix:read'], signal: new AbortController().signal});
    expect(value).toEqual(reading(measuredDocument()));
    const topology = hyperunixTopology(value, context);
    expect(topology.facets).toStrictEqual(MEASURED_FACETS);
    const [snapshot] = topology.snapshots;
    expect(snapshot).toMatchObject({coverage: 'partial', sourceVersion: '0.1.0',
      node: {title: 'HX find hx.fs/regular-file src', statusTone: 'unknown', statusText: 'incomplete · rows 2 · absence not licensed'}});
    const text = JSON.stringify(topology);
    for (const secret of ['SECRET-ROW-BODY', 'SECRET-CERT', 'SECRET-DIAGNOSTIC', 'src/index.ts', 'HX-COVERAGE-INCOMPLETE', 'hx-fs/b1/s1']) expect(text).not.toContain(secret);
  });

  it('G2: each acceptance field surfaces verbatim as its own facet, and coverage, tone and every other output field read as without them', () => {
    let judged = 0;
    for (const kind of PROJECTABLE) for (const licensed of [false, true]) {
      const full = hyperunixTopology(reading(withKind(acceptance(), kind, licensed)), context);
      const bare = hyperunixTopology(reading(withKind(lacking(), kind, licensed)), context);
      expect(full.facets, `${kind} licensed=${licensed}`).toStrictEqual(ALL_FACETS);
      expect(withoutFacets(full), `${kind} licensed=${licensed}`).toStrictEqual(bare);
      expect(full.snapshots[0].coverage).toBe(bare.snapshots[0].coverage);
      expect(full.snapshots[0].node.statusTone).toBe(bare.snapshots[0].node.statusTone);
      judged++;
    }
    expect(judged).toBe(22);
  });

  it('G3: absence still needs the runtime licence on a complete kind, and no view or provider version is a source version or a source basis', () => {
    for (const kind of ['complete', 'complete-empty']) {
      const unlicensed = hyperunixTopology(reading(withKind(acceptance(), kind, false)), context).snapshots[0];
      expect(unlicensed.coverage, kind).toBe('partial');
      expect(unlicensed.node.statusTone, kind).toBe('unknown');
      const licensed = hyperunixTopology(reading(withKind(acceptance(), kind, true)), context).snapshots[0];
      expect(licensed.coverage, kind).toBe('complete');
      expect(licensed.node.statusTone, kind).toBe('success');
    }
    const other = acceptance({view: 'hx.view/pinned-live', evidence: {support_ids: [], evidence_classes: [], derivation_handles: [],
      providers: ['hx.fs/builtin'], provider_versions: {'hx.fs/builtin': '9.9.9'}}});
    const topology = hyperunixTopology(reading(other, '0.1.0'), context);
    const [snapshot] = topology.snapshots;
    expect(snapshot.sourceVersion).toBe('0.1.0');
    expect(snapshot.source).toStrictEqual(hyperunixTopology(reading(lacking()), context).snapshots[0].source);
    for (const key of ['sourceRevision', 'subjectBasis', 'definitionDigest', 'cursor', 'sequence']) expect(snapshot, key).not.toHaveProperty(key);
    expect(snapshot.evidenceRefs).toStrictEqual([`hx-binary:sha256:${MEASURED_BINARY}`, ...LIVE_BATCHES.map(id => `hx-coverage:${id}`)]);
    expect(topology.facets).toStrictEqual([{kind: 'view', view: 'hx.view/pinned-live'},
      {kind: 'provider-version', provider: 'hx.fs/builtin', version: '9.9.9'}, ...ALL_FACETS.slice(2)]);
  });

  it('G4: a result lacking them projects byte-identically: no facets member, the same projection as the facet-less read', () => {
    const today = hyperunixTopology(measured(), context);
    expect(Object.keys(today)).toStrictEqual(['snapshots', 'relations', 'diagnostics']);
    const bare = hyperunixTopology(reading(lacking()), context);
    expect(Object.keys(bare)).toStrictEqual(['snapshots', 'relations', 'diagnostics']);
    // Each field at its empty value, and a result that omits the field, read exactly as the facet-less read.
    const variants: JsonValue[] = [
      reading(lacking({view: null})),
      reading(lacking({diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', severity: 'warning', message: 'no conflict here'}]})),
      reading(lacking({evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {'hx.fs/unlisted': '9.9.9'}}})),
      measured({view: null, evidence: {providers: [], provider_versions: {}}, coverage_summary: {licenses_absence: false, incomplete_regions: []}, diagnostics: []}),
    ];
    expect(hyperunixTopology(variants[3], context)).toStrictEqual(today);
    for (const variant of variants.slice(0, 3)) expect(hyperunixTopology(variant, context)).toStrictEqual(bare);
  });

  it('G5: facets are bounded and sanitized: escapes and bidi marks stripped, credentials redacted, every string within 200, at most 16', () => {
    const regions = Array.from({length: 20}, (_, index) => ({scope: `fs:${WS}/r${index}`, target: 'hx.fs/directory-entry'}));
    const hostile = measuredDocument({view: `${ESC}[31mhx.view/x${RLO}`,
      diagnostics: [{code: `HX-SCHEMA-CONFLICT${ESC}[2J`, severity: 'error', message: 'SECRET-CONFLICT-MESSAGE'}],
      evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: ['Bearer abc123', 'hx.fs/builtin'],
        provider_versions: {'Bearer abc123': `v${BEL}1`, 'hx.fs/builtin': `0.1.0 ${'k'.repeat(10_000)}`}},
      coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
        incomplete_regions: [{scope: `fs:${WS}/src password=ghi789`, target: 't'.repeat(10_000)}, ...regions], result_coverage: null, answer_count: 1}});
    const topology = hyperunixTopology(reading(hostile), context);
    const facets = topology.facets ?? [];
    // 25 facets (a view, two provider versions, one conflict, 21 regions): the first 16 are kept and the rest are counted.
    expect(facets).toHaveLength(16);
    expect(topology.diagnostics).toContain('result facets are capped at 16: 9 omitted');
    expect(facets.map(facet => facet.kind)).toStrictEqual(['view', 'provider-version', 'provider-version', 'conflict', ...Array.from({length: 12}, () => 'incomplete-region')]);
    expect(facets[0]).toStrictEqual({kind: 'view', view: 'hx.view/x'});
    expect(facets[1]).toStrictEqual({kind: 'provider-version', provider: '[REDACTED]', version: 'v 1'});
    expect(facets[2]).toMatchObject({kind: 'provider-version', provider: 'hx.fs/builtin'});
    expect(facets[3]).toStrictEqual({kind: 'conflict', code: 'HX-SCHEMA-CONFLICT'});
    expect(facets[4]).toMatchObject({kind: 'incomplete-region', scope: `fs:${WS}/src password=[REDACTED]`});
    for (const facet of facets) for (const text of Object.values(facet)) {
      expect(text.length).toBeGreaterThan(0);
      expect(text.length).toBeLessThanOrEqual(200);
      expect(text).not.toMatch(UNSAFE);
    }
    const text = JSON.stringify(topology);
    for (const secret of ['abc123', 'ghi789', 'SECRET-CONFLICT-MESSAGE', 'k'.repeat(201), 't'.repeat(201)]) expect(text).not.toContain(secret);
    boundedDiagnostics(topology);
  });

  it('G6: only the measured shapes are relayed: a region without a string scope and target, an unlisted provider, a non-string version and a non-conflict code never surface', () => {
    const odd = measured({view: 42, diagnostics: [{code: 'HX-COVERAGE-INCOMPLETE', message: 'SECRET-DIAGNOSTIC'}, {code: 7}, conflict],
      evidence: {providers: ['hx.fs/unversioned', 3, 'hx.num'], provider_versions: {'hx.fs/unlisted': '9.9.9', 'hx.num': 3}},
      coverage_summary: {licenses_absence: false, incomplete_regions: [{scope: 'only-scope'}, 'a-string-region', {scope: 1, target: 2}, null]}});
    const topology = hyperunixTopology(odd, context);
    expect(topology.facets).toStrictEqual([{kind: 'conflict', code: 'HX-SCHEMA-CONFLICT'}]);
    const text = JSON.stringify(topology);
    for (const absent of ['only-scope', 'a-string-region', '9.9.9', 'hx.fs/unlisted', 'hx.fs/unversioned', 'hx.num', 'SECRET-']) expect(text).not.toContain(absent);
    const {facets: _facets, ...rest} = topology;
    expect(rest).toStrictEqual(hyperunixTopology(measured(), context));
  });

  it('G7: a facet-carrying projection is deeply frozen, JSON-lossless and deterministic, and leaves its input untouched', () => {
    const value = deepFreeze(reading(acceptance()));
    const first = hyperunixTopology(value, context);
    expect(first.facets).toStrictEqual(ALL_FACETS);
    expect(Object.isFrozen(first.facets)).toBe(true);
    for (const facet of first.facets ?? []) expect(Object.isFrozen(facet)).toBe(true);
    expect(JSON.parse(JSON.stringify(first))).toStrictEqual(first);
    expect(hyperunixTopology(reading(acceptance()), context)).toStrictEqual(first);
  });

  it('G8: only a code naming CONFLICT as a whole segment is a conflict status: CONFLICT glued to a letter or a digit never surfaces', () => {
    // G6's non-conflict codes spell no CONFLICT at all, so a substring reading of the conflict test reads them the same way; these
    // spell it inside a longer segment on either side, and beside them the whole segment opens, sits inside and closes a code.
    const glued = ['HX-NONCONFLICT', 'HX-CONFLICTED', 'HX-2CONFLICT', 'HX-CONFLICT9', 'NONCONFLICT', 'CONFLICTS'];
    const whole = ['CONFLICT', 'CONFLICT-HX', 'HX-CONFLICT-ORIGIN', 'HX-CONTENT-EDIT-ORIGIN-CONFLICT'];
    const coded = (codes: readonly string[]): Json => measured({diagnostics: codes.map(code => ({code, severity: 'error', message: 'SECRET-CONFLICT-MESSAGE'}))});
    const bare = hyperunixTopology(measured(), context);
    expect(hyperunixTopology(coded(glued), context)).toStrictEqual(bare);
    const mixed = hyperunixTopology(coded([...glued, ...whole]), context);
    expect(mixed.facets).toStrictEqual(whole.map(code => ({kind: 'conflict', code})));
    expect(JSON.stringify(mixed)).not.toContain('SECRET-CONFLICT-MESSAGE');
    const {facets: _facets, ...rest} = mixed;
    expect(rest).toStrictEqual(bare);
  });

  it('G9: a facet whose string sanitizes to nothing is not relayed: a blank view, provider, version, region scope or target drops exactly that facet', () => {
    // HyperUnixResultFacet's own claim, one plant per guard: every blank is a string the label layout keeps nothing of, and the
    // unblanked provider and region beside them show the same document still relays.
    const blanks = ['', '   ', `${ESC}[2J`, `${BEL}${RLO}`];
    const bare = hyperunixTopology(measured(), context);
    for (const blank of blanks) {
      const value = measured({view: blank,
        evidence: {providers: [blank, 'hx.fs/builtin', 'hx.fs/other'], provider_versions: {[blank]: '0.1.0', 'hx.fs/builtin': blank, 'hx.fs/other': '0.2.0'}},
        coverage_summary: {licenses_absence: false, incomplete_regions: [{scope: blank, target: 'hx.fs/directory-entry'},
          {scope: `fs:${WS}/src`, target: blank}, {scope: `fs:${WS}/lib`, target: 'hx.fs/regular-file'}]}});
      const topology = hyperunixTopology(value, context);
      expect(topology.facets, JSON.stringify(blank)).toStrictEqual([
        {kind: 'provider-version', provider: 'hx.fs/other', version: '0.2.0'},
        {kind: 'incomplete-region', scope: `fs:${WS}/lib`, target: 'hx.fs/regular-file'},
      ]);
      const {facets: _facets, ...rest} = topology;
      expect(rest, JSON.stringify(blank)).toStrictEqual(bare);
    }
  });

  it('R1-RESIDUAL: hyperunix.result/1 has no consistency-mode field, so no reading carries one and no facet kind names one', () => {
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    expect(declaration).toContain('readonly view: string | undefined;');
    expect(declaration).not.toMatch(/consistency/i);
    const kinds = new Set((hyperunixTopology(reading(acceptance()), context).facets ?? []).map(facet => facet.kind));
    expect([...kinds].sort()).toStrictEqual(['conflict', 'incomplete-region', 'provider-version', 'view']);
  });
});
