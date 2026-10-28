/**
 * wb-tz2.5 (HX-ORIGINAL-GOALS-CLOSURE-R5), STANDING leg only: until HyperUnix ships its execution-binding key, the HX query id
 * stays a labelled derived digest and no digest is ever an execution identity.
 *
 * The bead's statement: "When an accepted GC-D02 ADR plus an SDK result field carry the execution-binding key ..., Pi shall
 * adopt it as the HX query node identity and nativeRef id, replacing the derived digest; until then the derived key stays
 * labelled derived and a digest is never treated as execution identity." Its standing acceptance: "the derived-id diagnostic
 * stays pinned (hyperunix-observer.ts:157-158,:175@9df9a03; DERIVED label, observer test :35)." At this cut's base (cd8927f)
 * those sites are src/workbench/hyperunix-observer.ts:77 (the DERIVED text), :208-210 (the derived id and its 'query'
 * reference) and :226 (the diagnostic), and src/workbench/native-evidence.ts:79 (the execution_id read).
 *
 * NOT delivered: the "On landing" leg ("native-evidence.ts hyperunix branch reads the new field as the id ...; the observer uses
 * it for ref identity; a test asserts the derived label disappears exactly when the native key is present and persists when
 * absent"). It waits for a HyperUnix-CLI change outside this repository: an accepted GC-D02 ADR plus an @hyperunix/sdk result
 * field carrying the key. Gate re-measured CLOSED for this cut, read-only at HyperUnix-CLI origin/main 6d0369d02a:
 * docs/programs/original-goals-closure-2026-10-16/14-decisions-and-migration.md:8 still states GC-D02 as a proposed direction
 * with no ADR; sdk/typescript is 0.1.0 with SDK_REPRESENTATION "hyperunix.result/1" and QueryResult.executionId
 * `string | undefined` (src/result.ts:146); 07-epistemic-protocol-lld.md:44 still asks the runtime to "document an
 * execution-binding key distinct from normal_form_digest". Of that test only the "persists when absent" half is checkable
 * today, and S1 holds it.
 *
 * G1 the vendored SDK still states the gate closed: QueryResult's members (at type level and in the shipped declaration) and
 *    the hyperunix.result/1 keys resultToJson writes are exactly the two lists below, executionId is `string | undefined`, and
 *    the measured read projects execution_id null. Both lists pin the SDK's own shapes and are compared with the SDK itself;
 *    they are not judged rows. A re-vendored SDK that gains, drops or retypes one reds here: re-measure this gate first (a new
 *    member or key may carry the binding key), never edit a list alone.
 * S1 the derived-id diagnostic: every reading the adapter projects (each of the 11 non-mutation kinds, licensed or not) carries
 *    its snapshot under the derived id (recomputed here: sha256 over the query and its sorted batch ids), typed 'query' and
 *    never 'execution', with exactly one DERIVED diagnostic, first.
 * S2 until then: neither a stated execution_id (no accepted binding key makes it one yet) nor the runtime's normal_form digest
 *    moves the id or the label: each topology is deep-equal to the one without them.
 * S3 no digest is an execution identity in native-evidence.ts: the measured provider output projects no nativeId and
 *    nativeRefOf no reference, a runtime digest beside it changes nothing, no read kind projects an id or a basis, and the one
 *    execution reference it states is the runtime's own execution_id, never the digest beside it.
 * S4 the workflow node path: a hyperunix.find node over the measured provider output reports no nativeId on its progress
 *    entry (the field src/index.ts:3182 names a producer reference from), and the runtime's execution_id is the only id that
 *    reaches it.
 *
 * Display paths added: none (test-only). No scratch directory is allocated: WS is a string, never created or read.
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {type QueryResult, resultFromJson, resultToJson} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';
import {nativeEvidence, nativeRefOf} from '../src/workbench/native-evidence.js';
import type {NativeRef, ObservationScope} from '../src/workbench/observation.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import type {WorkflowNodeEntry} from '../src/workflow/progress.js';
import {runWorkflow, type WorkflowHost} from '../src/workflow/runtime.js';

type Json = {[key: string]: JsonValue};

const CAPABILITY = 'hyperunix.find';
const WS = '/workspace/wb-tz2.5';
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:wb-tz2.5'};
const TARGET = {kind: 'hx.fs/regular-file', root: 'src'};
const context: HyperUnixTopologyContext = {scope, target: {...TARGET}, capturedAt: '2026-10-28T04:00:00Z', observedAt: '2026-10-28T04:00:01Z'};
/** The provider's runtime.binarySha256 shape: 64 lowercase hex characters. */
const BINARY = '5e'.repeat(32);
/** Out of order on purpose: the derived key sorts them. */
const BATCHES = ['b2', 'b1'];
/** A runtime-sourced normal_form_digest in its `<scheme>:<hex>` form: the query's program identity, never an execution one. */
const RUNTIME_DIGEST = `sha256:${'d1'.repeat(32)}`;
/** An id a runtime may state as execution_id today, before any accepted ADR makes it the execution-binding key. */
const STATED_EXECUTION_ID = 'hx-exec-wb-tz2.5';
/** The adapter's derived-id diagnostic text, restated independently of src/workbench/hyperunix-observer.ts. */
const DERIVED = 'query id is a derived digest, not a native identifier';
const TITLE = 'HX find hx.fs/regular-file src';
/** The derived query key, recomputed here: sha256 hex over canonical JSON of the workspace, the query and its sorted batch ids. */
const DERIVED_ID = createHash('sha256').update(JSON.stringify([WS, 'find', TARGET.kind, TARGET.root, [...BATCHES].sort()])).digest('hex');
const QUERY_REF: NativeRef = {provider: 'hyperunix', type: 'query', id: DERIVED_ID, scope: WS};
/** QueryResult's members in declaration order, as the vendored @hyperunix/sdk 0.1.0 ships them (dist/result.d.ts). */
const QUERY_RESULT_MEMBERS = ['operation', 'rows', 'rowsRetained', 'coverage', 'coverageSummary', 'status', 'terminal', 'truth',
  'diagnostics', 'view', 'evidence', 'queryDigest', 'digestSource', 'executionId', 'actualCost', 'budgetDimension', 'extensions',
  'transport', 'workspaceRoot', 'streams'] as const;
/** The hyperunix.result/1 keys the vendored SDK's resultToJson writes, in emission order. */
const RESULT_KEYS = ['representation', 'operation', 'rows', 'rows_retained', 'coverage', 'status', 'execution_status', 'diagnostics',
  'view', 'cost', 'transport', 'workspace_root', 'terminal', 'truth', 'coverage_summary', 'evidence', 'digest', 'digest_source',
  'local_digest', 'structural_digest', 'execution_id', 'budget_dimension', 'extensions'];
/** The kinds the read adapter projects: every vendored SDK kind but the two mutation outcomes it refuses. */
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !kind.startsWith('mutation-'));

/** The measured live read's hyperunix.result/1 shape (as test/workbench-hyperunix-observer.test.ts sdkDocument records it):
 * no runtime digest (digest null, digest_source absent) and no execution id (execution_id null). */
function hxDocument(overrides: Json = {}): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'src/index.ts'}], rows_retained: true,
    coverage: BATCHES.map(batch_id => ({mode: 'opportunistic', cause: {cause: 'other', detail: 'No_change_exclusion'},
      scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
      body: {mode: 'opportunistic'}})),
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 4, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 4},
    execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-28T03:59:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 100, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 4},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
      incomplete_regions: [], result_coverage: null, answer_count: 1},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides};
}
/** One reading of `kind` with the runtime licence as given; a complete-empty answer carries no rows. */
const kindDocument = (kind: string, licenses_absence: boolean): Json => hxDocument({execution_status: {kind, diagnostic_code: null},
  coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence, certificates_license_absence: false,
    incomplete_regions: [], result_coverage: null, answer_count: 1}, ...(kind === 'complete-empty' ? {rows: []} : {})});

/** What the registered hyperunix.find returns for one SDK result: the real registration over an injected reader. */
async function providerOutput(document: Json): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => resultFromJson(document), runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {}}, WS);
  return registry.invoke(CAPABILITY, {...TARGET}, {grants: ['hyperunix:read'], signal: new AbortController().signal});
}
/** The provider output's hyperunix.result/1 source object. */
function sourceOf(value: JsonValue): Json {
  const source = typeof value === 'object' && value !== null && !Array.isArray(value) ? value.source : undefined;
  if (typeof source !== 'object' || source === null || Array.isArray(source)) throw new Error('the provider output carries no source object');
  return source;
}

describe('wb-tz2.5 standing leg: the HX query id stays a labelled derived digest until an execution-binding key ships', () => {
  it('G1: the vendored SDK still states the gate closed: no new identity member, executionId optional, execution_id null in the measured read', async () => {
    expectTypeOf<keyof QueryResult>().toEqualTypeOf<(typeof QUERY_RESULT_MEMBERS)[number]>();
    expectTypeOf<QueryResult['executionId']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<QueryResult['queryDigest']>().toEqualTypeOf<string | undefined>();
    // The type pins above are gate-enforced by the typing step (npm run typecheck:test over tsconfig.test.json); the shipped
    // declaration read below is a second, tsc-free witness of the same interface, as the observer test's H5 is for the kinds.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const start = declaration.indexOf('export interface QueryResult<');
    const end = declaration.indexOf('\n}', start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    const members = [...declaration.slice(start, end).matchAll(/^ {4}readonly (\w+)\??: ([^;]+);$/gm)];
    expect(members.map(match => match[1])).toStrictEqual([...QUERY_RESULT_MEMBERS]);
    expect(members.filter(match => match[1] === 'executionId').map(match => match[2])).toStrictEqual(['string | undefined']);
    // The wire form native-evidence.ts reads: resultToJson's keys, and execution_id null when the runtime states none.
    expect(Object.keys(resultToJson(resultFromJson(hxDocument())))).toStrictEqual(RESULT_KEYS);
    const measured = sourceOf(await providerOutput(hxDocument()));
    expect(Object.keys(measured)).toStrictEqual(RESULT_KEYS);
    expect(measured).toMatchObject({execution_id: null, digest: null, digest_source: 'absent'});
  });

  it('S1: every projected reading keeps its snapshot under the derived id typed query, with exactly one DERIVED diagnostic, first', async () => {
    expect(READ_KINDS).toHaveLength(11);
    let projected = 0;
    for (const kind of READ_KINDS) {
      for (const licensed of [true, false]) {
        const label = `${kind} licenses_absence=${licensed}`;
        const topology = hyperunixTopology(await providerOutput(kindDocument(kind, licensed)), context);
        expect(topology.snapshots, label).toHaveLength(1);
        expect(topology.snapshots[0].source, label).toStrictEqual(QUERY_REF);
        expect(topology.diagnostics[0], label).toBe(`${DERIVED}: ${TITLE}`);
        expect(topology.diagnostics.filter(text => text.startsWith(`${DERIVED}: `)), label).toHaveLength(1);
        projected++;
      }
    }
    expect(projected).toBe(22);
  });

  it('S2: until a binding key exists, neither a stated execution_id nor the runtime digest moves the derived id or its label', async () => {
    const base = hyperunixTopology(await providerOutput(hxDocument()), context);
    expect(base.snapshots[0].source).toStrictEqual(QUERY_REF);
    expect(base.diagnostics[0]).toBe(`${DERIVED}: ${TITLE}`);
    const variants: readonly (readonly [string, Json])[] = [
      ['a stated execution_id', {execution_id: STATED_EXECUTION_ID}],
      ['a runtime normal_form digest', {digest: RUNTIME_DIGEST, digest_source: 'runtime'}],
      ['both', {execution_id: STATED_EXECUTION_ID, digest: RUNTIME_DIGEST, digest_source: 'runtime'}],
    ];
    for (const [name, overrides] of variants) {
      const value = await providerOutput(hxDocument(overrides));
      // The provider output does carry the stated fields, so the equality below cannot pass over their absence.
      expect(sourceOf(value), name).toMatchObject(overrides);
      expect(hyperunixTopology(value, context), name).toStrictEqual(base);
    }
  });

  it('S3: native-evidence never takes a digest for the execution identity: no nativeId without the runtime execution_id', async () => {
    const measured = await providerOutput(hxDocument());
    const digested = await providerOutput(hxDocument({digest: RUNTIME_DIGEST, digest_source: 'runtime'}));
    expect(sourceOf(digested)).toMatchObject({digest: RUNTIME_DIGEST, digest_source: 'runtime', execution_id: null});
    for (const value of [measured, digested]) {
      expect(nativeEvidence(CAPABILITY, value)).toStrictEqual({provider: 'hyperunix', domainStatus: 'incomplete'});
      expect(nativeRefOf(nativeEvidence(CAPABILITY, value))).toBeUndefined();
    }
    // No read kind projects an id or a basis while the runtime states no execution_id, so the derived query id never becomes one.
    for (const kind of READ_KINDS) {
      expect(nativeEvidence(CAPABILITY, await providerOutput(kindDocument(kind, false))), kind).toStrictEqual({provider: 'hyperunix', domainStatus: kind});
    }
    // The one execution reference native-evidence states is the runtime's own execution_id, never the digest beside it.
    const stated = await providerOutput(hxDocument({execution_id: STATED_EXECUTION_ID, digest: RUNTIME_DIGEST, digest_source: 'runtime'}));
    expect(nativeEvidence(CAPABILITY, stated)).toStrictEqual({provider: 'hyperunix', nativeId: STATED_EXECUTION_ID, domainStatus: 'incomplete'});
    expect(nativeRefOf(nativeEvidence(CAPABILITY, stated))).toStrictEqual({provider: 'hyperunix', type: 'execution', id: STATED_EXECUTION_ID});
  });

  it('S4: a hyperunix.find workflow node over the measured output reports no native id; only the runtime execution_id reaches it', async () => {
    const script = 'export const meta={name:"wb-tz2.5",description:"test"}; return await node("hyperunix.find",{kind:"hx.fs/regular-file",root:"src"});';
    async function doneNode(document: Json): Promise<WorkflowNodeEntry> {
      const value = await providerOutput(document);
      const host: WorkflowHost = {spawnAgent: async () => ({ok: true}), abortAgent: () => {}, callNode: async () => value, describeNodeEffect: () => 'read'};
      const result = await runWorkflow({script, host});
      expect(result.status).toBe('completed');
      const done = result.progress.filter((entry): entry is WorkflowNodeEntry => entry.type === 'workflow_node' && entry.state === 'done');
      expect(done).toHaveLength(1);
      return done[0];
    }
    const measured = await doneNode(hxDocument({digest: RUNTIME_DIGEST, digest_source: 'runtime'}));
    // The node did carry native-evidence's projection (its domain status), so the missing id is not a dropped projection.
    expect(measured).toMatchObject({capabilityId: CAPABILITY, domainStatus: 'incomplete'});
    expect(measured).not.toHaveProperty('nativeId');
    const stated = await doneNode(hxDocument({execution_id: STATED_EXECUTION_ID, digest: RUNTIME_DIGEST, digest_source: 'runtime'}));
    expect(stated).toMatchObject({capabilityId: CAPABILITY, domainStatus: 'incomplete', nativeId: STATED_EXECUTION_ID});
  });
});
