/**
 * wb-tz2.5 (HX-ORIGINAL-GOALS-CLOSURE-R5), STANDING leg only (cut #2, the respin of gate refusal #1; wb-thq3 adds the pins of the
 * landing-651 follow-up F1 and F2): until HyperUnix ships its execution-binding key, the HX query id stays a labelled derived
 * digest and no digest becomes an execution identity at the sites the cases below pin: the topology (S1, S2, within the bounds
 * S1 states), native-evidence's projection and execution reference (S3), the workflow node entries' native-evidence fields (S4,
 * S5) and the node rows the live and replayed runs journal (S5). A site outside those, such as a node entry member outside its
 * native-evidence fields, is NOT CLAIMED by this file. Every claim below is over the 132 READINGS this file builds and the three
 * workflow runs over them, except where a case names other inputs (G1: the vendored SDK's types, its shipped declaration and the
 * measured live read's document; S1: 24 mutation-outcome documents built beside the readings); none reaches past those.
 *
 * The bead's statement: "When an accepted GC-D02 ADR plus an SDK result field carry the execution-binding key ..., Pi shall
 * adopt it as the HX query node identity and nativeRef id, replacing the derived digest; until then the derived key stays
 * labelled derived and a digest is never treated as execution identity." Its standing acceptance: "the derived-id diagnostic
 * stays pinned (hyperunix-observer.ts:157-158,:175@9df9a03; DERIVED label, observer test :35)." At wb-tz2.5 cut #2's base
 * (a5eecf0), and still at wb-thq3's base (9ad61f3), those sites are src/workbench/hyperunix-observer.ts:77 (the DERIVED text),
 * :208-210 (the derived id and its 'query' reference) and :226 (the diagnostic); src/workbench/native-evidence.ts:79 reads
 * execution_id; and src/workflow/runtime.ts spreads native-evidence's projection into a workflow node's progress entry on the
 * live path (:1621-1624) and on the replay path (:1536).
 *
 * NOT delivered: the "On landing" leg ("native-evidence.ts hyperunix branch reads the new field as the id ...; the observer uses
 * it for ref identity; a test asserts the derived label disappears exactly when the native key is present and persists when
 * absent"). It waits for a HyperUnix-CLI change outside this repository: an accepted GC-D02 ADR plus an @hyperunix/sdk result
 * field carrying the key. Gate re-measured CLOSED for this cut, read-only (no fetch) at the local HyperUnix-CLI clone's
 * origin/main 8780ecbc9d: docs/programs/original-goals-closure-2026-10-16/14-decisions-and-migration.md:8 still states GC-D02
 * as a proposed direction with no ADR; sdk/typescript is 0.1.0 with SDK_REPRESENTATION "hyperunix.result/1" (src/result.ts:157)
 * and QueryResult.executionId `string | undefined` (src/result.ts:146); 07-epistemic-protocol-lld.md:44 still asks the runtime
 * to "document an execution-binding key distinct from normal_form_digest". Of that test only the "persists when absent" half
 * is checkable today, and S1 holds it over the 132 readings.
 *
 * THE READINGS: 132 provider outputs, each what the real hyperunix.find registration returns for one hyperunix.result/1
 * document built here and read through the vendored SDK (resultFromJson, then the provider's resultToJson). The documents are
 * the cross product READ_KINDS (11: every vendored ExecutionStatusKind but the two mutation outcomes the adapter refuses) x
 * LICENCES (licenses_absence true, false) x EXECUTION_IDS (execution_id null, STATED_EXECUTION_ID) x DIGESTS (digest null;
 * RUNTIME_DIGEST with digest_source 'runtime'; UNATTRIBUTED_DIGEST with digest_source 'absent', which the SDK keeps as
 * queryDigest without attributing it to the runtime). Every other field is fixed by readingDocument and hxDocument below (one row, none
 * on complete-empty; two coverage batches; rows retained; diagnostic_code null; no view, cost, truth or budget dimension; budget-exhausted states
 * dimension null), and one host context reads them all (no invocation id, no operation reference). Each axis is pinned at
 * type level to cover every member of the SDK type it stands for (QueryResult's executionId and queryDigest, the DigestSource
 * values beside a stated digest, CoverageSummary's licensesAbsence), and S1 pins READ_KINDS against the adapter's refusals.
 *
 * G1 the vendored SDK still states the gate closed. QueryResult's members are exactly the 20 below with the declared types
 *    below: read from the shipped dist/result.d.ts with comments dropped and whitespace collapsed (a member split over lines is
 *    still read as one member), and pinned at type level as keyof and as a member-by-member shape over the SDK's exported
 *    types. resultToJson writes exactly the 23 hyperunix.result/1 keys below, in order, and each of the 132 readings
 *    round-trips the SDK unchanged: its provider source is its document plus local_digest and structural_digest, which
 *    resultToJson writes null. A re-vendored SDK that gains or drops a member or a key, retypes a member's declared type, or
 *    changes any wire value of the 132 readings reds here: re-measure this gate first (a new member or key may carry the
 *    binding key), never edit a list alone. Member types are pinned as the declaration spells them; the SDK types they name
 *    (Coverage, ExecutionStatus and the others) are not expanded, so a change inside one of those is not claimed.
 * S1 each of the 132 readings carries one snapshot under the derived id (recomputed here: sha256 hex over JSON.stringify of
 *    the workspace, the operation, the target kind, the target root and the sorted batch ids), typed 'query', with exactly one
 *    DERIVED diagnostic, first. The host context names neither an invocation nor an operation, and each topology has exactly
 *    the members snapshots, relations and diagnostics, with no relation (wb-thq3 F1, gate mutant GP1: no grouping edge from an
 *    execution reference); its snapshot has exactly the nine members source, scope, capturedAt, observedAt, coverage, node,
 *    kind, sourceVersion and evidenceRefs, so no trace (F1, GP2: no digest as the trace invocation id), and each of those but
 *    coverage and node holds the value restated here (QUERY_REF; the host scope and clock readings; 'hyperunix.query.snapshot';
 *    the runtime version '0.1.0'; the binary reference, then one reference per coverage batch in certificate order). The
 *    derived id's 64 hex characters occur exactly once in the topology's JSON text, as the snapshot source id. A rewritten form
 *    of the derived id (a prefix, a re-encoding) inside node or in a diagnostic after the first is NOT CLAIMED by S1; S2's
 *    equality is what holds the readings' result digests and execution_id out of the topology (a topology that varies with
 *    either fails it). The two vendored kinds outside READ_KINDS are the mutation outcomes the adapter refuses: each is built
 *    over LICENCES x EXECUTION_IDS x DIGESTS by readingDocument (24 documents, F2), its provider source is that document plus
 *    local_digest and structural_digest null, and every one is refused with a CapabilityError naming it a mutation outcome (F2,
 *    gate mutant GP5: the refusal holds under either licence). The snapshots span every NativeSnapshot coverage value
 *    (complete, partial, unknown).
 * S2 per read kind and licence, each of the five readings that state execution_id, a digest, or both has a whole topology
 *    deep-equal to the reading that states neither (110 comparisons).
 * S3 native-evidence over the 132 readings: the 66 without execution_id project exactly provider and domain status (no
 *    nativeId, basis or evidence reference) and nativeRefOf none; the 66 with it project exactly those plus STATED_EXECUTION_ID
 *    as nativeId, and nativeRefOf an 'execution' reference to it, whichever of the three digest cells stands beside it.
 * S4 one live workflow run with a hyperunix.find node per reading: each done node's native-evidence fields are exactly the S3
 *    projection of its reading (no nativeId unless execution_id is stated, then STATED_EXECUTION_ID).
 * S5 the S4 workflow journaled live, then replayed from that journal under the same host basis (refusal #1's F1, the replay
 *    path): all 132 nodes replay (cached, stale, the host never called) and each done node's native-evidence fields are
 *    exactly the S3 projection of its reading. The live run journals exactly 132 rows, one per reading in node order, each
 *    exactly {kind 'node', index, key (nodeJournalKey of the capability and that node's input), ok true, capabilityId,
 *    effectClass 'read', text (the reading's provider output as JSON), basis BASIS}: no nativeRefs and no other member (wb-thq3
 *    F1, gate mutant GP3: no execution reference on a read row, digest-bearing readings included), and the replay run journals
 *    exactly the same 132 rows.
 *
 * Display paths added: none (test-only). No scratch directory is allocated: WS is a string, never created or read.
 */
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {
  type ClaimBody, type Coverage, type CoverageSummary, type Diagnostic, type DigestSource, type EvidenceSummary, type ExecutionStatus,
  type QueryResult, resultFromJson, resultToJson, type StreamSummary, type TerminalStatus, type TransportTelemetry, type Truth,
} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';
import {type NativeEvidence, nativeEvidence, nativeRefOf} from '../src/workbench/native-evidence.js';
import type {NativeRef, NativeSnapshot, ObservationScope} from '../src/workbench/observation.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {nodeJournalKey, type WorkflowJournalEntry} from '../src/workflow/journal.js';
import type {WorkflowNodeEntry} from '../src/workflow/progress.js';
import {runWorkflow, type WorkflowHost, type WorkflowNodeRequest, type WorkflowRunResult} from '../src/workflow/runtime.js';

type Json = {[key: string]: JsonValue};
/** The vendored SDK's own JSON value type (a ClaimBody row value); the SDK index does not export it by name. */
type SdkJsonValue = ClaimBody[string];
/** true exactly when every member of Union has an Axis value assignable to it: the axis covers that whole SDK type. */
type Covers<Axis, Union> = (Union extends unknown ? ([Extract<Axis, Union>] extends [never] ? false : true) : never) extends true ? true : false;

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
/** A digest a document states with digest_source 'absent': the SDK keeps it as queryDigest but does not attribute it to the runtime. */
const UNATTRIBUTED_DIGEST = `sha256:${'d2'.repeat(32)}`;
/** An id a runtime may state as execution_id today, before any accepted ADR makes it the execution-binding key. */
const STATED_EXECUTION_ID = 'hx-exec-wb-tz2.5';
/** The adapter's derived-id diagnostic text, restated independently of src/workbench/hyperunix-observer.ts. */
const DERIVED = 'query id is a derived digest, not a native identifier';
const TITLE = 'HX find hx.fs/regular-file src';
/** The derived query key, recomputed here: sha256 hex over JSON.stringify of the workspace, the operation, the target kind, the
 * target root and the sorted batch ids. */
const DERIVED_ID = createHash('sha256').update(JSON.stringify([WS, 'find', TARGET.kind, TARGET.root, [...BATCHES].sort()])).digest('hex');
const QUERY_REF: NativeRef = {provider: 'hyperunix', type: 'query', id: DERIVED_ID, scope: WS};
/** The host replay basis both S5 hosts state: a journaled read replays only under the basis it was recorded with. */
const BASIS = 'wb-tz2.5-host-basis';

/** QueryResult's members in declaration order, as the vendored @hyperunix/sdk 0.1.0 ships them (dist/result.d.ts). */
const QUERY_RESULT_MEMBERS = ['operation', 'rows', 'rowsRetained', 'coverage', 'coverageSummary', 'status', 'terminal', 'truth',
  'diagnostics', 'view', 'evidence', 'queryDigest', 'digestSource', 'executionId', 'actualCost', 'budgetDimension', 'extensions',
  'transport', 'workspaceRoot', 'streams'] as const;
type QueryResultMember = (typeof QUERY_RESULT_MEMBERS)[number];
/** Each member's declared type, spelled exactly as the shipped declaration spells it (the SDK types it names are not expanded). */
const DECLARED_TYPES: Readonly<Record<QueryResultMember, string>> = {
  operation: 'string', rows: 'readonly T[]', rowsRetained: 'boolean', coverage: 'readonly Coverage[]', coverageSummary: 'CoverageSummary',
  status: 'ExecutionStatus', terminal: 'TerminalStatus', truth: 'Truth | undefined', diagnostics: 'readonly Diagnostic[]',
  view: 'string | undefined', evidence: 'EvidenceSummary', queryDigest: 'string | undefined', digestSource: 'DigestSource',
  executionId: 'string | undefined', actualCost: 'JsonValue | undefined', budgetDimension: 'string | null',
  extensions: 'Readonly<Record<string, JsonValue>>', transport: 'TransportTelemetry', workspaceRoot: 'string | undefined',
  streams: 'readonly StreamSummary[]',
};
/** QueryResult (its default row type) member by member over the SDK's exported types: the full-shape type pin. */
interface DeclaredQueryResult {
  readonly operation: string;
  readonly rows: readonly ClaimBody[];
  readonly rowsRetained: boolean;
  readonly coverage: readonly Coverage[];
  readonly coverageSummary: CoverageSummary;
  readonly status: ExecutionStatus;
  readonly terminal: TerminalStatus;
  readonly truth: Truth | undefined;
  readonly diagnostics: readonly Diagnostic[];
  readonly view: string | undefined;
  readonly evidence: EvidenceSummary;
  readonly queryDigest: string | undefined;
  readonly digestSource: DigestSource;
  readonly executionId: string | undefined;
  readonly actualCost: SdkJsonValue | undefined;
  readonly budgetDimension: string | null;
  readonly extensions: Readonly<Record<string, SdkJsonValue>>;
  readonly transport: TransportTelemetry;
  readonly workspaceRoot: string | undefined;
  readonly streams: readonly StreamSummary[];
}
/** The hyperunix.result/1 keys the vendored SDK's resultToJson writes, in emission order. */
const RESULT_KEYS = ['representation', 'operation', 'rows', 'rows_retained', 'coverage', 'status', 'execution_status', 'diagnostics',
  'view', 'cost', 'transport', 'workspace_root', 'terminal', 'truth', 'coverage_summary', 'evidence', 'digest', 'digest_source',
  'local_digest', 'structural_digest', 'execution_id', 'budget_dimension', 'extensions'];
/** native-evidence's projection fields, pinned to NativeEvidence's keys at type level in S4. */
const EVIDENCE_KEYS = ['provider', 'nativeId', 'domainStatus', 'evidenceRefs', 'sourceBasis', 'producerRelease'] as const;
const EVIDENCE_KEY_SET: ReadonlySet<string> = new Set(EVIDENCE_KEYS);
/** NativeSnapshot's coverage values, pinned to its type in S1: the readings' snapshots span all three. */
const COVERAGES = ['complete', 'partial', 'unknown'] as const;
/** The members each reading's snapshot states, sorted (S1): every optional NativeSnapshot member the adapter does not write,
 * trace included, is absent. */
const SNAPSHOT_MEMBERS = ['capturedAt', 'coverage', 'evidenceRefs', 'kind', 'node', 'observedAt', 'scope', 'source', 'sourceVersion'];
/** Each reading's snapshot evidence references: the provider's binary, then one per certified coverage batch in certificate order. */
const EVIDENCE_REFS = [`hx-binary:sha256:${BINARY}`, ...BATCHES.map(batch => `hx-coverage:${batch}`)];

/** The kind axis: every vendored SDK kind but the two mutation outcomes the read adapter refuses (S1 checks both sides). */
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !kind.startsWith('mutation-'));
/** The licence axis, as CoverageSummary['licensesAbsence'] types it. */
const LICENCES = [true, false] as const;
/** The execution_id axis, as QueryResult['executionId'] types it: absent (the wire's null) or a stated id. */
const EXECUTION_IDS = [undefined, STATED_EXECUTION_ID] as const;
/** The digest axis, as queryDigest beside digestSource types it: none, the runtime's, or one not attributed to the runtime. */
const DIGESTS = [
  {name: 'digest null', digest: undefined, digestSource: 'absent'},
  {name: 'runtime digest', digest: RUNTIME_DIGEST, digestSource: 'runtime'},
  {name: 'unattributed digest', digest: UNATTRIBUTED_DIGEST, digestSource: 'absent'},
] as const;
type DigestCell = (typeof DIGESTS)[number];

/** The measured live read's hyperunix.result/1 shape (the keys test/workbench-hyperunix-observer.test.ts sdkDocument records):
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
/** The wire digest fields of one digest cell. */
const digestFields = (cell: DigestCell): Json => ({digest: cell.digest ?? null, digest_source: cell.digestSource});
/** One reading's document: `kind` under the runtime licence as given, with the execution_id and digest cells stated. A
 * complete-empty answer carries no rows; budget-exhausted states dimension null, the key resultToJson writes for that kind. */
function readingDocument(kind: string, licensed: boolean, executionId: string | undefined, digest: DigestCell): Json {
  return hxDocument({execution_status: {kind, diagnostic_code: null, ...(kind === 'budget-exhausted' ? {dimension: null} : {})},
    coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: licensed, certificates_license_absence: false,
      incomplete_regions: [], result_coverage: null, answer_count: 1},
    ...(kind === 'complete-empty' ? {rows: []} : {}), execution_id: executionId ?? null, ...digestFields(digest)});
}

/** What the registered hyperunix.find returns for one SDK result: the real registration over an injected reader. */
async function providerOutput(document: Json): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => resultFromJson(document), runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {}}, WS);
  return registry.invoke(CAPABILITY, {...TARGET}, {grants: ['hyperunix:read'], signal: new AbortController().signal});
}
/** A JSON object member, or nothing. */
function objectOf(value: JsonValue | undefined): Json | undefined {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value : undefined;
}
/** The provider output's hyperunix.result/1 source object. */
function sourceOf(value: JsonValue): Json {
  const source = objectOf(objectOf(value)?.source);
  if (source === undefined) throw new Error('the provider output carries no source object');
  return source;
}

interface Reading {
  readonly label: string;
  readonly kind: string;
  readonly licensed: boolean;
  readonly stated: boolean;
  readonly digest: DigestCell;
  readonly document: Json;
  readonly value: JsonValue;
}
async function buildReadings(): Promise<readonly Reading[]> {
  const readings: Reading[] = [];
  for (const kind of READ_KINDS) {
    for (const licensed of LICENCES) {
      for (const executionId of EXECUTION_IDS) {
        for (const digest of DIGESTS) {
          const document = readingDocument(kind, licensed, executionId, digest);
          const stated = executionId !== undefined;
          const label = `${kind} licenses_absence=${licensed} execution_id=${stated ? 'stated' : 'null'} ${digest.name}`;
          readings.push({label, kind, licensed, stated, digest, document, value: await providerOutput(document)});
        }
      }
    }
  }
  return readings;
}
let readingsMemo: Promise<readonly Reading[]> | undefined;
/** THE READINGS, built once for every case. */
function allReadings(): Promise<readonly Reading[]> {
  readingsMemo ??= buildReadings();
  return readingsMemo;
}
/** The S3 projection of one reading: provider and domain status, plus STATED_EXECUTION_ID as nativeId when it is stated. */
function projectionOf(reading: Reading): NativeEvidence {
  return {provider: 'hyperunix', ...(reading.stated ? {nativeId: STATED_EXECUTION_ID} : {}), domainStatus: reading.kind};
}

/** A workflow with one hyperunix.find node per cell, in cell order. */
const script = (cells: number): string => 'export const meta={name:"wb-tz2.5",description:"test"}; ' +
  `for (let cell = 0; cell < ${cells}; cell++) await node("hyperunix.find",{kind:"hx.fs/regular-file",root:"src",cell}); return "read";`;
/** A host answering each node call with the provider output of the reading at that node position. */
function readingHost(readings: readonly Reading[], extra: Partial<WorkflowHost> = {}): WorkflowHost {
  return {spawnAgent: async () => ({ok: true}), abortAgent: () => {}, describeNodeEffect: () => 'read',
    callNode: async (request: WorkflowNodeRequest) => {
      const reading = readings[request.index];
      if (reading === undefined) throw new Error(`no reading at node position ${request.index}`);
      return reading.value;
    }, ...extra};
}
/** A run's done node entries in node position order. */
function doneNodes(result: WorkflowRunResult): WorkflowNodeEntry[] {
  return result.progress.filter((entry): entry is WorkflowNodeEntry => entry.type === 'workflow_node' && entry.state === 'done')
    .sort((left, right) => left.index - right.index);
}
/** A node entry's native-evidence fields, whatever else it carries. */
function evidenceFieldsOf(entry: WorkflowNodeEntry): Record<string, unknown> {
  return Object.fromEntries(Object.entries(entry).filter(([key]) => EVIDENCE_KEY_SET.has(key)));
}
/** The journal row a run under BASIS settles for the read at node position `index` (S5): a read keeping its provider output as
 * text, keyed by the journal's node key for the input the script passes there, and no nativeRefs. */
function readRow(reading: Reading, index: number): WorkflowJournalEntry {
  return {kind: 'node', index, key: nodeJournalKey(CAPABILITY, JSON.stringify({...TARGET, cell: index})), ok: true,
    capabilityId: CAPABILITY, effectClass: 'read', text: JSON.stringify(reading.value), basis: BASIS};
}

describe('wb-tz2.5 standing leg over the 132 readings: the HX query id stays a labelled derived digest until an execution-binding key ships', () => {
  it('G1: the vendored SDK still states the gate closed: 20 QueryResult members by name and declared type, 23 wire keys, and the 132 readings round-trip it unchanged', async () => {
    expectTypeOf<keyof QueryResult>().toEqualTypeOf<QueryResultMember>();
    expectTypeOf<QueryResult>().toEqualTypeOf<DeclaredQueryResult>();
    expectTypeOf<QueryResult['executionId']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<QueryResult['queryDigest']>().toEqualTypeOf<string | undefined>();
    // Each reading axis covers every member of the SDK type it stands for.
    expectTypeOf<Covers<(typeof LICENCES)[number], CoverageSummary['licensesAbsence']>>().toEqualTypeOf<true>();
    expectTypeOf<Covers<(typeof EXECUTION_IDS)[number], QueryResult['executionId']>>().toEqualTypeOf<true>();
    expectTypeOf<Covers<DigestCell['digest'], QueryResult['queryDigest']>>().toEqualTypeOf<true>();
    expectTypeOf<Covers<Extract<DigestCell, {digest: string}>['digestSource'], DigestSource>>().toEqualTypeOf<true>();
    // The type pins above are gate-enforced by the typing step (npm run typecheck:test over tsconfig.test.json); the shipped
    // declaration read below is a second, tsc-free witness of the same interface.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const start = declaration.indexOf('export interface QueryResult<');
    const open = declaration.indexOf('{', start);
    const end = declaration.indexOf('\n}', start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(open).toBeGreaterThan(start);
    expect(end).toBeGreaterThan(open);
    const members = declaration.slice(open + 1, end).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').split(';')
      .map(member => member.replace(/\s+/g, ' ').trim()).filter(member => member.length > 0);
    expect(members).toStrictEqual(QUERY_RESULT_MEMBERS.map(name => `readonly ${name}: ${DECLARED_TYPES[name]}`));
    // The wire form native-evidence.ts reads: resultToJson's keys, and execution_id null when the runtime states none.
    expect(Object.keys(resultToJson(resultFromJson(hxDocument())))).toStrictEqual(RESULT_KEYS);
    expect(sourceOf(await providerOutput(hxDocument()))).toMatchObject({execution_id: null, digest: null, digest_source: 'absent'});
    const readings = await allReadings();
    expect(readings).toHaveLength(132);
    for (const reading of readings) {
      const source = sourceOf(reading.value);
      expect(Object.keys(source), reading.label).toStrictEqual(RESULT_KEYS);
      expect(source, reading.label).toStrictEqual({...reading.document, local_digest: null, structural_digest: null});
      // Each axis reached the wire, so no reading below silently reads as another.
      expect(objectOf(source.execution_status)?.kind, reading.label).toBe(reading.kind);
      expect(objectOf(source.coverage_summary)?.licenses_absence, reading.label).toBe(reading.licensed);
      expect(source.execution_id, reading.label).toBe(reading.stated ? STATED_EXECUTION_ID : null);
      expect({digest: source.digest, digest_source: source.digest_source}, reading.label).toStrictEqual(digestFields(reading.digest));
    }
  });

  it('S1: each of the 132 readings keeps one snapshot under the derived id typed query, with exactly one DERIVED diagnostic, first, no relation, no trace and no other verbatim occurrence of the derived id; the two mutation outcomes are refused over all 24 of their documents', async () => {
    // READ_KINDS is exactly what the adapter projects: the two vendored kinds outside it are the mutation outcomes it refuses,
    // over the same licence, execution_id and digest cells as the readings (wb-thq3 F2: 24 documents, not one per kind).
    const refused = HYPERUNIX_EXECUTION_KINDS.filter(kind => !READ_KINDS.includes(kind));
    expect(refused).toHaveLength(2);
    let refusals = 0;
    for (const kind of refused) {
      for (const licensed of LICENCES) {
        for (const executionId of EXECUTION_IDS) {
          for (const digest of DIGESTS) {
            const document = readingDocument(kind, licensed, executionId, digest);
            const label = `${kind} licenses_absence=${licensed} execution_id=${executionId === undefined ? 'null' : 'stated'} ${digest.name}`;
            const value = await providerOutput(document);
            // The provider source is the document plus the two digests resultToJson writes null, so each refusal is measured on
            // the document its label names.
            expect(sourceOf(value), label).toStrictEqual({...document, local_digest: null, structural_digest: null});
            expect(() => hyperunixTopology(value, context), label).toThrow(CapabilityError);
            expect(() => hyperunixTopology(value, context), label).toThrow(`${kind} is a mutation outcome`);
            refusals++;
          }
        }
      }
    }
    // Every cell of the readings' licence, execution_id and digest axes, for each refused kind: 2 x (2 x 2 x 3).
    expect(refusals).toBe(refused.length * LICENCES.length * EXECUTION_IDS.length * DIGESTS.length);
    expect(refusals).toBe(24);
    expectTypeOf<(typeof COVERAGES)[number]>().toEqualTypeOf<NonNullable<NativeSnapshot['coverage']>>();
    const readings = await allReadings();
    expect(readings).toHaveLength(132);
    const coverages = new Set<string | undefined>();
    for (const reading of readings) {
      const topology = hyperunixTopology(reading.value, context);
      expect(topology.snapshots, reading.label).toHaveLength(1);
      expect(topology.snapshots[0].source, reading.label).toStrictEqual(QUERY_REF);
      expect(topology.diagnostics[0], reading.label).toBe(`${DERIVED}: ${TITLE}`);
      expect(topology.diagnostics.filter(text => text.startsWith(`${DERIVED}: `)), reading.label).toHaveLength(1);
      // wb-thq3 F1: the host names neither an invocation nor an operation, and the topology states no relation and no trace
      // (GP1, GP2) and no member beyond the ones the adapter writes.
      expect(Object.keys(topology).sort(), reading.label).toStrictEqual(['diagnostics', 'relations', 'snapshots']);
      expect(topology.relations, reading.label).toStrictEqual([]);
      const [snapshot] = topology.snapshots;
      expect(Object.keys(snapshot).sort(), reading.label).toStrictEqual(SNAPSHOT_MEMBERS);
      expect({source: snapshot.source, scope: snapshot.scope, capturedAt: snapshot.capturedAt, observedAt: snapshot.observedAt,
        kind: snapshot.kind, sourceVersion: snapshot.sourceVersion, evidenceRefs: snapshot.evidenceRefs}, reading.label).toStrictEqual({
        source: QUERY_REF, scope, capturedAt: context.capturedAt, observedAt: context.observedAt, kind: 'hyperunix.query.snapshot',
        sourceVersion: '0.1.0', evidenceRefs: EVIDENCE_REFS});
      // The derived id's 64 hex characters occur once in the topology's JSON text, as the snapshot source id (QUERY_REF above):
      // no other member carries them verbatim.
      expect(JSON.stringify(topology).split(DERIVED_ID), reading.label).toHaveLength(2);
      coverages.add(topology.snapshots[0].coverage);
    }
    expect(coverages).toStrictEqual(new Set(COVERAGES));
  });

  it('S2: per read kind and licence, each reading stating execution_id, a digest or both has the whole topology of the reading stating neither', async () => {
    const readings = await allReadings();
    const bare = new Map(readings.filter(reading => !reading.stated && reading.digest.digest === undefined)
      .map(reading => [`${reading.kind}/${reading.licensed}`, reading]));
    expect(bare.size).toBe(22);
    let compared = 0;
    for (const reading of readings) {
      if (!reading.stated && reading.digest.digest === undefined) continue;
      const without = bare.get(`${reading.kind}/${reading.licensed}`);
      if (without === undefined) throw new Error(`no bare reading for ${reading.label}`);
      expect(hyperunixTopology(reading.value, context), reading.label).toStrictEqual(hyperunixTopology(without.value, context));
      compared++;
    }
    expect(compared).toBe(110);
  });

  it('S3: native-evidence over the 132 readings projects a nativeId and an execution reference exactly when execution_id is stated, and then that id, never a digest', async () => {
    const readings = await allReadings();
    let withoutId = 0;
    for (const reading of readings) {
      const evidence = nativeEvidence(CAPABILITY, reading.value);
      expect(evidence, reading.label).toStrictEqual(projectionOf(reading));
      expect(nativeRefOf(evidence), reading.label)
        .toStrictEqual(reading.stated ? {provider: 'hyperunix', type: 'execution', id: STATED_EXECUTION_ID} : undefined);
      if (!reading.stated) withoutId++;
    }
    expect(withoutId).toBe(66);
  });

  it('S4: one live workflow run with a hyperunix.find node per reading: each done node has exactly the S3 projection of its reading in its native-evidence fields', async () => {
    expectTypeOf<(typeof EVIDENCE_KEYS)[number]>().toEqualTypeOf<keyof NativeEvidence>();
    const readings = await allReadings();
    const result = await runWorkflow({script: script(readings.length), host: readingHost(readings)});
    expect(result.status).toBe('completed');
    const done = doneNodes(result);
    expect(done.map(entry => entry.index)).toStrictEqual(readings.map((_, index) => index));
    for (const [index, entry] of done.entries()) {
      const reading = readings[index];
      expect(entry, reading.label).toMatchObject({capabilityId: CAPABILITY, freshness: 'unknown'});
      expect(evidenceFieldsOf(entry), reading.label).toStrictEqual(projectionOf(reading));
    }
  }, 60_000);

  it('S5: the S4 workflow journaled live, then replayed under the same host basis: all 132 nodes replay cached and stale, each with the S3 projection of its reading; both runs journal exactly one read row per reading, its provider output as text and no nativeRefs', async () => {
    const readings = await allReadings();
    const recorded: WorkflowJournalEntry[] = [];
    const first = await runWorkflow({script: script(readings.length), host: readingHost(readings, {replayBasis: BASIS}),
      journal: {append: entry => { recorded.push(entry); }}});
    expect(first.status).toBe('completed');
    const journaled = recorded.filter(entry => entry.kind === 'node');
    expect(journaled).toHaveLength(readings.length);
    expect(journaled.filter(entry => entry.effectClass === 'read' && entry.basis === BASIS)).toHaveLength(readings.length);
    // wb-thq3 F1 (GP3): the whole live journal is one read row per reading, and no row carries nativeRefs or any other member.
    expect(recorded).toStrictEqual(readings.map(readRow));
    let replayCalls = 0;
    const replayHost = readingHost(readings, {replayBasis: BASIS, callNode: async () => {
      replayCalls++;
      throw new Error('a journaled read must not re-run');
    }});
    const rejournaled: WorkflowJournalEntry[] = [];
    const second = await runWorkflow({script: script(readings.length), host: replayHost,
      journal: {entries: recorded, append: entry => { rejournaled.push(entry); }}});
    expect(second.status).toBe('completed');
    expect(replayCalls).toBe(0);
    // The replay path journals the same rows, so a replayed read gains no reference either.
    expect(rejournaled).toStrictEqual(readings.map(readRow));
    expect(second.replayedNodeCount).toBe(readings.length);
    const done = doneNodes(second);
    expect(done.map(entry => entry.index)).toStrictEqual(readings.map((_, index) => index));
    for (const [index, entry] of done.entries()) {
      const reading = readings[index];
      expect(entry, reading.label).toMatchObject({capabilityId: CAPABILITY, cached: true, freshness: 'stale'});
      expect(evidenceFieldsOf(entry), reading.label).toStrictEqual(projectionOf(reading));
    }
  }, 60_000);
});
