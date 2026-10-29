/**
 * wb-4ap.13 (COLLECTIVE-ADAPTATION-R13, program-triage-2026-10-17), the HyperUnix H0/H1 lineage gate census: the STANDING leg.
 *
 * Statement (bead description, verbatim): "When @hyperunix/sdk exposes HyperUnix H0/H1 (HX-C01/C02/C03/C05: typed directional
 * refs produces/consumes/depends/blocks/verifies/related-to and bounded neighborhood/ancestry queries with per-relationship
 * coverage and source revision), the HyperUnix provider shall consume them additively with per-edge coverage preserved and
 * open-world missing edges reported, never collapsing ref meanings or presenting a bounded traversal as complete. Artifact: H0/H1
 * results in a released @hyperunix/sdk (interim contract: RFCLI fixture stand-in)." Acceptance (verbatim, every clause on
 * landing): (1) "On landing: the hyperunix-observer test gains a fixture with typed refs and asserts each relation kind maps to a
 * distinct RelationKind or is counted as unmapped, never merged." (2) "Each edge carries coverage and source revision from the
 * SDK result; a traversal marked bounded yields coverage 'partial' with the remainder counted (open-world rule already pinned at
 * hyperunix-observer.ts:60-65,165-170@9df9a03)." (3) "The find-only path stays byte-identical."
 *
 * MEASURED (read-only, by the cutting seat on trunk f5589e0, 2026-10-28): the gating artifact does not exist. HyperUnix-CLI
 * origin/main ff96c6810e still reads "design only, not implemented" at
 * docs/programs/collective-adaptation-2026-10-16/04-implementation-and-qa.md:3 (H0 typed reference and lineage query fixtures,
 * H1 budgeted neighborhood/ancestry traversal), and its sdk/typescript/src spells no related-to kind. The RFCLI stand-in the
 * statement names (ReactiveFiberCLI BEADS-2026-10-16.md:102@8a8b83e4d, CA-R1-b, tests/fixtures/scg/hx/SCG-FIX-HX-001..007.stdout
 * at origin/main 2ad670a29) is an hx.coverage/v1 path-coverage report (paths with a covered flag and a complete/partial marker):
 * it carries no typed ref, so no interim typed-ref contract exists either. Pi vendors @hyperunix/sdk 0.1.0
 * (vendor/hyperunix-sdk-0.1.0.tgz). Its 27 shipped declaration files spell none of the six kinds as a string literal (only
 * namesakes: the "verified" mutation outcome, the dependents/dependencies reads, ConsumerActiveError, a provider.d.ts comment),
 * and its QueryResult declares the lossless extension sidecar ("Lossless sidecar of negotiated extension frames"). On the
 * provider's own path (resultFromJson, resultToJson, the JSON round trip) an unknown member survives at 12 of the 23 object nodes
 * of a full SDK document - the row claim bodies, each certificate's cause, scope, target and body, the incomplete regions and
 * the sidecar - and is dropped from every record the serializer rebuilds field by field. So a typed-ref payload that reached
 * Pi's find path before a released SDK declares it would arrive inside one of those open containers. Pi reads no unknown member
 * of any of them: the reader adapter reads rows for their count and certificates for their batch ids only, and the
 * native-evidence projection reads the execution id, kind and evidence ids only. A read of a named producer member of an
 * incomplete region (a relayed display facet) stays outside A3's boundary and inside the B rows' byte-identity, which plant
 * this census's own member.
 *
 * Pi consumes no H0/H1 result today. This census pins that standing leg, and the on-landing leg stays owed (NOT CLAIMED below):
 *  A, the gate. A1 the vendored SDK's shipped declarations (every dist .d.ts of the installed package, the version Pi's
 *    package.json pins through the committed tarball) spell none of the six kinds as a whole string literal - a hit is the
 *    gating artifact arriving: re-measure, the on-landing leg is owed; A1c the kind judge flags each kind in every quote, case and
 *    separator spelling and stays quiet on the SDK's own namesakes, each read from its file; A2 the serializer emits exactly its
 *    23 representation members, a member planted at every object node of a full SDK document survives exactly at the 12 open
 *    containers (measured, pinned), and nowhere else; A3 no consumed field (HYPERUNIX_CONSUMED_FIELDS, at least its count at
 *    this cut's base) reads the sidecar, a row body or a certificate's cause, scope, target or body, rows are read for their
 *    count, the two HX modules never spell the sidecar member, and Pi registers hyperunix.find as its only HX read on both
 *    registrations (each named by its own descriptor text), equal to the src reconcile table.
 *  B, acceptance (3) in its standing form. B1 every reading of READINGS (each non-mutation execution kind, both licences where
 *    they differ) carrying each constructed lineage record of PLANTS in the sidecar projects strictEqual and byte-identical to the
 *    same reading without it, under both host contexts, for the reader adapter and the native-evidence projection alike, and no
 *    output string carries a planted sentinel (a sentinel planted in the operation is the control that the detector sees one);
 *    B2 through the registered provider, the full record planted at each of the 12 open containers arrives verbatim in the
 *    provider output and the projection and native evidence stay strictEqual; B3 the full record planted at every object node of
 *    a provider reading (positions derived from the reading, their count re-derived from its JSON text) moves no output byte.
 *  N, the statement's negative clause. N1 no projection states any relation but the one display-grouping edge from the invoking
 *    operation to the query node (none without one), so no planted kind is lifted to a RelationKind or merged into grouping; N2 a
 *    sidecar walk record claiming complete coverage leaves every reading at its own coverage: complete only when runtime-licensed
 *    on a complete kind, partial (tone unknown, "absence not licensed") or failure-unknown otherwise.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHORS: F1 the tracked bead export row of wb-4ap.13 (.beads/issues.jsonl, its description only, never its notes)
 * states KINDS in order, row A's label (its Artifact sentence), row N's label (its never-clause) and row B's label (acceptance
 * clause 3) verbatim, and ON_LANDING as acceptance clauses 1 and 2; F2 READINGS covers exactly the execution kinds the src
 * adapter projects (HYPERUNIX_EXECUTION_KINDS, mutation outcomes refused). A2's member list is held to the SDK's own serializer.
 * FROZEN SHAPE (standing rule 16): S pins the rows and their pins, KINDS, READINGS (id, kind, licence, expected coverage), PLANTS
 * (id and record members), the representation members, the judge controls, the residuals and the on-landing labels as literals;
 * every pin compares a measured witness to WITNESSES (payload identity); Z requires every pin to run once, in row order.
 * CASE NAMES: no case name here evidences docs/workbench/09's "optional graph traversal of linked native refs" (the RA5/b half of
 * test/workbench-docs09-readers-relationships.census.ts, routed to this bead's on-landing leg), so every case name stays outside
 * that half's title probe; the kind spellings live in data, never in a case name.
 * NOT CLAIMED: acceptance clauses 1 and 2 (ON_LANDING) - a typed-ref fixture mapped onto distinct RelationKinds or counted as
 * unmapped, per-edge coverage and source revision, a bounded walk read partial with its remainder counted - wait for H0/H1
 * results in a released @hyperunix/sdk (HyperUnix-CLI H0/H1, an external target) and a re-vendor; no Pi reader of them exists.
 * Every lineage record, kind spelling and carrier key below is CONSTRUCTED by this census; the producer mints none of them.
 */
import {readdirSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resultFromJson, resultToJson} from '@hyperunix/sdk';
import {describe, expect, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, type HyperUnixProjectionTopology, type HyperUnixTopologyContext, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import type {NativeRef, ObservationScope} from '../src/workbench/observation.js';
import {registerHyperUnixFind, registerNativeHyperUnixFind} from '../src/workbench/providers/hyperunix.js';
import {RECONCILE_EVIDENCE_READS} from '../src/workflow/reconcile.js';

type Json = {[key: string]: JsonValue};
type Step = string | number;
type Path = readonly Step[];

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const BEAD = 'wb-4ap.13';
const BEAD_EXPORT = '.beads/issues.jsonl';
const SDK_ROOT = 'node_modules/@hyperunix/sdk';
/** Pi's package.json dependency spec for the SDK: the committed tarball. */
const SDK_SPEC = 'file:vendor/hyperunix-sdk-0.1.0.tgz';
const SDK_VERSION = '0.1.0';
/** At least this many shipped declaration files, so an emptied walk reds; the measured count rides A1's witness. */
const DECLARATIONS_FLOOR = 20;
/** The six HX-C01 kinds in the order the bead statement lists them; F1 holds them to the tracked export. */
const KINDS: readonly string[] = Object.freeze(['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to']);
/** The census's own carrier key; every constructed text carries SENTINEL. */
const CENSUS_KEY = 'pi-census:wb-4ap.13';
const SENTINEL = 'WB4AP13-SENTINEL';
const WS = '/tmp/hx-lineage-gate-ws';
/** An obviously synthetic runtime digest (64 lowercase hex characters). */
const BINARY = '0123456789abcdef'.repeat(4);
const scope: ObservationScope = {workspace: WS, principal: 'local-operator:census'};
const TARGET = {kind: 'hx.fs/regular-file', root: 'src'};
const PLAIN: HyperUnixTopologyContext = {scope, target: TARGET, capturedAt: '2026-10-28T03:00:00Z', observedAt: '2026-10-28T03:00:01Z'};
/** The workflow node call that issued the read, named the way src/index.ts names a node without a native id. */
const operationRef: NativeRef = {provider: 'pi-workflow', type: 'node-call', id: 'wf_lineage_1:0'};
const INVOKED: HyperUnixTopologyContext = {...PLAIN, invocationId: 'wf_lineage_1', operationRef};
const CONTEXTS: readonly HyperUnixTopologyContext[] = [PLAIN, INVOKED];

/** Acceptance clauses 1 and 2, owed on landing and NOT CLAIMED here; F1 holds them to the tracked export. */
const ON_LANDING: readonly string[] = Object.freeze([
  'On landing: the hyperunix-observer test gains a fixture with typed refs and asserts each relation kind maps to a distinct RelationKind or is counted as unmapped, never merged.',
  "Each edge carries coverage and source revision from the SDK result; a traversal marked bounded yields coverage 'partial' with the remainder counted (open-world rule already pinned at hyperunix-observer.ts:60-65,165-170@9df9a03).",
]);

interface Row { readonly id: string; readonly label: string; readonly pins: readonly string[]; }
const ROWS: readonly Row[] = Object.freeze([
  {id: 'A', label: 'Artifact: H0/H1 results in a released @hyperunix/sdk (interim contract: RFCLI fixture stand-in).', pins: ['A1', 'A1c', 'A2', 'A3']},
  {id: 'B', label: 'The find-only path stays byte-identical.', pins: ['B1', 'B2', 'B3']},
  {id: 'N', label: 'never collapsing ref meanings or presenting a bounded traversal as complete', pins: ['N1', 'N2']},
  {id: 'Q', label: 'the named residuals of rows A and B, each with its pinned quiet row', pins: ['Q1', 'Q2', 'Q3']},
]);

interface Residual { readonly id: string; readonly family: string; readonly quiet: string; }
const RESIDUALS: readonly Residual[] = Object.freeze([
  {id: 'RS1', family: 'a kind spelled outside the six whole-literal spellings (a derived form, a namespaced token) never trips A1', quiet: 'Q1'},
  {id: 'RS2', family: 'a kind declared only as an identifier (an enum member or property name) never trips A1', quiet: 'Q2'},
  {id: 'RS3', family: 'a lineage payload inside a container the SDK copies whole adds no serializer member, so A2 never sees it', quiet: 'Q3'},
]);

/** The 12 object nodes of a full SDK document at which an unknown member survives the provider's codec path (measured, A2/B2). */
const OPEN_POSITIONS: readonly string[] = Object.freeze([
  'rows.0', 'rows.1', 'coverage.0.cause', 'coverage.0.scope', 'coverage.0.target', 'coverage.0.body', 'coverage.1.cause', 'coverage.1.scope',
  'coverage.1.target', 'coverage.1.body', 'coverage_summary.incomplete_regions.0', 'extensions',
]);
/** The measured witness each pin must reproduce (payload identity), measured on trunk f5589e0 with @hyperunix/sdk 0.1.0. */
const WITNESSES: Readonly<Record<string, JsonValue>> = Object.freeze({
  A1: {declarationFiles: 27, kindLiteralFiles: 0, version: '0.1.0', sidecarDeclared: true},
  A1c: {flagged: 9, kinds: 6, namesakes: 4, flaggedHits: 9, namesakeHits: 0},
  A2: {members: 23, objectNodes: 22, kept: [...OPEN_POSITIONS]},
  A3: {sidecarReads: 0, bodyReads: 0, rowsUse: 'rows', sidecarTokens: 0, reads: [['hyperunix.find'], ['hyperunix.find']],
    registrations: [['Read typed HX results with native coverage and query basis'], ['Native bounded HX query with coverage']]},
  B1: {readings: 14, plants: 9, contexts: 2, adapter: 252, evidence: 126, delivered: 126, sentinelHits: 0},
  B2: {positions: [...OPEN_POSITIONS], compared: 12},
  B3: {readings: ['R01', 'R05'], positions: [23, 24]},
  N1: {topologies: 280, relations: 140, kinds: ['grouping']},
  N2: {complete: 2, partial: 7, unknown: 5},
  Q1: {shapes: 6, hits: 0},
  Q2: {shapes: 3, hits: 0},
  Q3: {bodies: ['rows.0', 'coverage.0.body'], members: [23, 23]},
});

type Coverage = 'complete' | 'partial' | 'unknown';
interface Reading { readonly id: string; readonly kind: string; readonly licensed: boolean; readonly coverage: Coverage; }
/** Every execution kind the adapter projects (F2), both licences where they read differently, and the coverage each must keep. */
const READINGS: readonly Reading[] = Object.freeze([
  {id: 'R01', kind: 'complete', licensed: true, coverage: 'complete'},
  {id: 'R02', kind: 'complete', licensed: false, coverage: 'partial'},
  {id: 'R03', kind: 'complete-empty', licensed: true, coverage: 'complete'},
  {id: 'R04', kind: 'complete-empty', licensed: false, coverage: 'partial'},
  {id: 'R05', kind: 'incomplete', licensed: false, coverage: 'partial'},
  {id: 'R06', kind: 'incomplete', licensed: true, coverage: 'partial'},
  {id: 'R07', kind: 'budget-exhausted', licensed: false, coverage: 'partial'},
  {id: 'R08', kind: 'cancelled', licensed: false, coverage: 'partial'},
  {id: 'R09', kind: 'view-invalidated', licensed: false, coverage: 'partial'},
  {id: 'R10', kind: 'provider-failed', licensed: false, coverage: 'unknown'},
  {id: 'R11', kind: 'schema-failed', licensed: false, coverage: 'unknown'},
  {id: 'R12', kind: 'internal-failed', licensed: false, coverage: 'unknown'},
  {id: 'R13', kind: 'protocol-failed', licensed: false, coverage: 'unknown'},
  {id: 'R14', kind: 'usage-error', licensed: false, coverage: 'unknown'},
]);

/** One constructed lineage edge of `kind`: native endpoints, per-edge coverage and a source revision, every text sentinel-marked. */
const edge = (kind: string, n: number): Json => ({kind, from: {provider: 'hyperunix', type: 'artifact', id: `${SENTINEL}-from-${n}`},
  to: {provider: 'hyperunix', type: 'artifact', id: `${SENTINEL}-to-${n}`}, coverage: 'complete', source_revision: `${SENTINEL}-rev-${n}`});
/** A walk record that claims complete coverage while marked bounded with a remainder: what N2 must never honour. */
const walk = (n: number): Json => ({bounded: true, max_hops: 2, remainder: 5, coverage: 'complete', edges: KINDS.map((kind, index) => edge(kind, n + index))});
const missing = (n: number): Json => ({open_world: true, count: 3, coverage: 'partial', note: `${SENTINEL}-missing-${n}`});
interface Plant { readonly id: string; readonly record: Json; }
const plant = (id: string, record: Json): Plant => ({id, record});
/** One record per kind (P1-P6, in KINDS order), the bounded walk (P7), the open-world missing-edge report (P8) and all of them (P9). */
const PLANTS: readonly Plant[] = Object.freeze([
  ...KINDS.map((kind, index) => plant(`P${index + 1}`, {edges: [edge(kind, index + 1)]})),
  plant('P7', {walk: walk(10)}),
  plant('P8', {missing_edges: missing(20)}),
  plant('P9', {edges: KINDS.map((kind, index) => edge(kind, 30 + index)), walk: walk(40), missing_edges: missing(50)}),
]);
const plantOf = (id: string): Plant => {
  const found = PLANTS.find(item => item.id === id);
  if (found === undefined) throw new Error(`no plant ${id}`);
  return found;
};

/** The serializer's members of hyperunix.result/1, in its own order; A2 holds this list to resultToJson. */
const REPRESENTATION_KEYS: readonly string[] = Object.freeze([
  'representation', 'operation', 'rows', 'rows_retained', 'coverage', 'status', 'execution_status', 'diagnostics', 'view', 'cost', 'transport',
  'workspace_root', 'terminal', 'truth', 'coverage_summary', 'evidence', 'digest', 'digest_source', 'local_digest', 'structural_digest',
  'execution_id', 'budget_dimension', 'extensions',
]);

const escaped = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
/** A kind spelled as one whole string literal: any quote, any case, its words joined by a hyphen, an underscore, a space or nothing. */
const KIND_LITERAL = new RegExp(`(['"\`])(?:${KINDS.map(kind => kind.split('-').map(escaped).join('[-_ ]?')).join('|')})\\1`, 'giu');
const kindHits = (text: string): number => [...text.matchAll(KIND_LITERAL)].length;
/** Each kind in a declaration-shaped control: each must hit exactly once, and together they spell every kind. */
const FLAGGED: readonly (readonly [string, string])[] = Object.freeze([
  ['produces', "type RefKind = 'produces';"], ['consumes', 'readonly kind: "consumes";'], ['depends', 'const kind = `depends`;'],
  ['blocks', "case 'BLOCKS':"], ['verifies', 'kind: "Verifies",'], ['related-to', "'related-to'"], ['related-to', '"related_to"'],
  ['related-to', "'related to'"], ['related-to', '"relatedTo"'],
]);
/** The SDK's own namesakes, each read from its shipped file: the judge must stay quiet on every one. */
const NAMESAKES: readonly {readonly file: string; readonly text: string}[] = Object.freeze([
  {file: 'protocol/mutation.d.ts', text: 'readonly outcome: "verified"'},
  {file: 'client.d.ts', text: 'dependents(path: string'},
  {file: 'execution.d.ts', text: 'ConsumerActiveError'},
  {file: 'provider.d.ts', text: 'One relation the provider produces'},
]);
/** RS1: derived or namespaced spellings. */
const DERIVED: readonly string[] = Object.freeze(["'produced-by'", '"depends-on"', "'hx.ref/verifies'", "'blocked'", "'consumer'", '"relatedness"']);
/** RS2: identifier-only declarations. */
const IDENTIFIERS: readonly string[] = Object.freeze(['enum RefKind { Produces = 0, RelatedTo = 1 }', 'readonly produces: readonly string[];', 'type Blocks = typeof blocks;']);
/** HYPERUNIX_CONSUMED_FIELDS' length at this cut's base: a floor, since a relayed-facet cut may add named reads (A3). */
const CONSUMED_FLOOR = 11;
/** A consumed path that reads into a copied-whole body: a row's claim body or a certificate's cause, scope, target or body (A3). */
const BODY_READ = /^source\.(?:rows\[\]|coverage\[\]\.(?:cause|scope|target|body))(?:\.|$)/u;
const HX_MODULES: readonly string[] = Object.freeze(['src/workbench/providers/hyperunix.ts', 'src/workbench/hyperunix-observer.ts']);

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const textOf = (path: string): string => readFileSync(join(REPO, path), 'utf8');
const certificate = (batch_id: string): Json => ({mode: 'opportunistic', cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode: 'opportunistic'}});

/** A full SDK document (the hyperunix.result/1 representation) of one execution kind and licence, with an optional sidecar. */
function documentOf(kind: string, licensed: boolean, extensions: Json = {}, operation = 'find'): Json {
  const rows: Json[] = kind === 'complete-empty' ? [] : [{path: 'src/a.ts'}, {path: 'src/b.ts'}];
  return {representation: 'hyperunix.result/1', operation, rows, rows_retained: true, coverage: ['b1', 'b2'].map(certificate),
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind, diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-28T02:59:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 10, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: ['opportunistic'], completeness: licensed ? 'complete' : 'incomplete', licenses_absence: licensed,
      certificates_license_absence: licensed, incomplete_regions: licensed ? [] : [{scope: `fs:${WS}/src`, target: 'hx.fs/directory-entry'}],
      result_coverage: null, answer_count: rows.length},
    evidence: {support_ids: ['hx-support-1'], evidence_classes: [], derivation_handles: ['hx-derivation-1'], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: 'hx-execution-1', budget_dimension: null, extensions};
}
/** What registerHyperUnixFind returns for a document, built the provider's own way (providers/hyperunix.ts:25-26). */
const providerShaped = (document: Json): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
  source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version: SDK_VERSION, binarySha256: BINARY}})) as JsonValue;
const readingOf = (row: Reading, extensions: Json = {}): JsonValue => providerShaped(documentOf(row.kind, row.licensed, extensions));
const sidecar = (planted: Plant): Json => ({[CENSUS_KEY]: planted.record});

/** Every object node of a JSON tree by its path, in document order (an array contributes its elements, never itself). */
function objectPaths(value: unknown, path: Path = []): Path[] {
  if (Array.isArray(value)) return value.flatMap((child: unknown, index) => objectPaths(child, [...path, index]));
  if (!isRecord(value)) return [];
  return [path, ...Object.entries(value).flatMap(([key, child]) => objectPaths(child, [...path, key]))];
}
function nodeAt(value: unknown, path: Path): unknown {
  let node = value;
  for (const step of path) node = Array.isArray(node) ? node[Number(step)] : isRecord(node) ? node[String(step)] : undefined;
  return node;
}
/** A deep copy of `value` with `member` set to `payload` on the object node at `path`. */
function plantedAt<T extends JsonValue>(value: T, path: Path, member: string, payload: JsonValue): T {
  const copy = JSON.parse(JSON.stringify(value)) as T;
  const node = nodeAt(copy, path);
  if (!isRecord(node)) throw new Error(`no object node at ${path.join('.')}`);
  node[member] = payload;
  return copy;
}
const dotted = (path: Path): string => path.join('.');
const braces = (value: unknown): number => JSON.stringify(value).split('{').length - 1;

const topologyOf = (value: JsonValue, context: HyperUnixTopologyContext): HyperUnixProjectionTopology => hyperunixTopology(value, context);
/** Whether any output string carries a planted sentinel: B1's loop and its leak control share this one judge. */
const leaks = (value: unknown): boolean => JSON.stringify(value).includes(SENTINEL);
const evidenceOf = (value: JsonValue) => nativeEvidence('hyperunix.find', value);
const CTX = {grants: ['hyperunix:read'], signal: new AbortController().signal};
/** The registered provider's output for a document, through a stub reader and the capability registry. */
async function provided(document: Json): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: SDK_VERSION, binarySha256: BINARY}), close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: TARGET.kind, root: TARGET.root}, CTX);
}

function declarationFiles(dir: string): string[] {
  return readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return declarationFiles(path);
    return entry.isFile() && entry.name.endsWith('.d.ts') ? [path] : [];
  }).sort();
}

/** The tracked bead export's description for `id` (never its notes: a later note append never moves this census). */
function exportDescription(id: string): string {
  for (const line of textOf(BEAD_EXPORT).split('\n')) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === id && typeof row.description === 'string') return row.description;
  }
  throw new Error(`the tracked bead export holds no row for ${id}`);
}
/** The text strictly between `from` and the first `to` after it, both required. */
function between(text: string, from: string, to: string): string {
  const start = text.indexOf(from);
  const end = start < 0 ? -1 : text.indexOf(to, start + from.length);
  if (start < 0 || end < 0) throw new Error(`no "${from}" ... "${to}" span`);
  return text.slice(start + from.length, end);
}

const reached: string[] = [];
/** A pin's closing step: its measured witness must equal WITNESSES[pin], then the pin counts as run. */
function settle(pin: string, witness: JsonValue): void {
  expect(witness, `${pin}: the measured witness`).toStrictEqual(WITNESSES[pin]);
  reached.push(pin);
}

describe('wb-4ap.13 HyperUnix lineage gate census (standing leg)', () => {
  it('A1: the vendored SDK declarations spell none of the six HX-C01 kinds as a whole string literal (a hit means re-measure)', () => {
    const manifest: unknown = JSON.parse(textOf(`${SDK_ROOT}/package.json`));
    const pi: unknown = JSON.parse(textOf('package.json'));
    expect(isRecord(manifest) && manifest.name === '@hyperunix/sdk').toBe(true);
    const version = isRecord(manifest) ? manifest.version : undefined;
    const spec = isRecord(pi) && isRecord(pi.dependencies) ? pi.dependencies['@hyperunix/sdk'] : undefined;
    expect(spec, 'Pi pins the SDK through the committed tarball').toBe(SDK_SPEC);
    const files = declarationFiles(join(REPO, SDK_ROOT, 'dist'));
    expect(files.length).toBeGreaterThanOrEqual(DECLARATIONS_FLOOR);
    const hits = files.map(file => [relative(join(REPO, SDK_ROOT, 'dist'), file), kindHits(readFileSync(file, 'utf8'))] as const).filter(([, count]) => count > 0);
    expect(hits, 'declarations spelling a kind literal').toStrictEqual([]);
    const result = textOf(`${SDK_ROOT}/dist/result.d.ts`);
    expect(result).toContain('export interface QueryResult<T = ClaimBody> {');
    const sidecarDeclared = result.includes('readonly extensions: Readonly<Record<string, JsonValue>>;') && result.includes('Lossless sidecar of negotiated extension frames');
    settle('A1', {declarationFiles: files.length, kindLiteralFiles: hits.length, version: typeof version === 'string' ? version : null, sidecarDeclared});
  });

  it('A1c: the kind judge flags each planted kind literal once and stays quiet on the SDK namesakes read from their files', () => {
    for (const [kind, control] of FLAGGED) {
      expect(kindHits(control), `flagged control ${control}`).toBe(1);
      expect(control.toLowerCase().replace(/[-_ ]/gu, ''), `control ${control} spells ${kind}`).toContain(kind.replace(/-/gu, ''));
    }
    expect([...new Set(FLAGGED.map(([kind]) => kind))]).toStrictEqual([...KINDS]);
    for (const {file, text} of NAMESAKES) {
      expect(textOf(`${SDK_ROOT}/dist/${file}`), `${file} carries the namesake`).toContain(text);
      expect(kindHits(text), `namesake ${text}`).toBe(0);
    }
    expect(kindHits(FLAGGED.map(([, control]) => control).join('\n')), 'the judge counts every literal of a text').toBe(FLAGGED.length);
    settle('A1c', {flagged: FLAGGED.length, kinds: KINDS.length, namesakes: NAMESAKES.length, flaggedHits: FLAGGED.length, namesakeHits: 0});
  });

  it('A2: the SDK serializer emits exactly its 23 members, and an unknown member survives only at the open containers it copies whole', () => {
    const base = documentOf('incomplete', false);
    const members = Object.keys(resultToJson(resultFromJson(base)));
    expect(members).toStrictEqual([...REPRESENTATION_KEYS]);
    const positions = objectPaths(base);
    expect(positions.length).toBe(braces(base));
    const marker = {[SENTINEL]: CENSUS_KEY};
    const kept: string[] = [];
    for (const path of positions) {
      const output = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, marker)));
      expect(Object.keys(output), `members after a plant at ${dotted(path) || '(root)'}`).toStrictEqual([...REPRESENTATION_KEYS]);
      if (JSON.stringify(output).includes(SENTINEL)) {
        expect(JSON.stringify(nodeAt(output, [...path, CENSUS_KEY])), `the plant at ${dotted(path)} arrives verbatim`).toBe(JSON.stringify(marker));
        kept.push(dotted(path));
      }
    }
    settle('A2', {members: members.length, objectNodes: positions.length, kept});
  });

  it('A3: Pi reads neither the sidecar nor a copied-whole body and registers hyperunix.find as its only HX read, on both registrations', () => {
    const consumed = HYPERUNIX_CONSUMED_FIELDS.map(field => field.path);
    expect(consumed.length).toBeGreaterThanOrEqual(CONSUMED_FLOOR);
    for (const anchor of ['source.execution_status.kind', 'source.coverage[].batch_id']) expect(consumed, 'a read the adapter has made since wb-6ze.7').toContain(anchor);
    const sidecarReads = consumed.filter(path => path.split('.').includes('extensions'));
    const bodyReads = consumed.filter(path => BODY_READ.test(path));
    expect(sidecarReads).toStrictEqual([]);
    expect(bodyReads).toStrictEqual([]);
    expect(BODY_READ.test('source.coverage[].body.secret') && BODY_READ.test('source.rows[]') && !BODY_READ.test('source.coverage[].batch_id'), 'the body judge reads its own controls').toBe(true);
    const rowsUse = HYPERUNIX_CONSUMED_FIELDS.find(field => field.path === 'source.rows')?.use;
    expect(rowsUse, 'rows are read for their count only').toBe('rows');
    const tokens = HX_MODULES.map(path => textOf(path).split('extensions').length - 1);
    expect(tokens).toStrictEqual(HX_MODULES.map(() => 0));
    const injected = new CapabilityRegistry();
    registerHyperUnixFind(injected, {find: async () => resultFromJson(documentOf('incomplete', false)), runtime: async () => ({version: SDK_VERSION, binarySha256: BINARY}), close: async () => {}}, WS);
    const native = new CapabilityRegistry();
    registerNativeHyperUnixFind(native, WS);
    const catalogs = [injected, native].map(registry => registry.catalogSnapshot().map(entry => entry.descriptor));
    const ids = catalogs.map(catalog => catalog.map(descriptor => descriptor.id));
    expect(ids).toStrictEqual([[...RECONCILE_EVIDENCE_READS.hyperunix], [...RECONCILE_EVIDENCE_READS.hyperunix]]);
    // Each registration is named by its own descriptor text, so a census reading one registration twice is refused.
    const registrations = catalogs.map(catalog => catalog.map(descriptor => descriptor.description));
    settle('A3', {sidecarReads: sidecarReads.length, bodyReads: bodyReads.length, rowsUse: rowsUse ?? null, sidecarTokens: tokens.reduce((sum, n) => sum + n, 0), reads: ids, registrations});
  });

  it('B1: every reading carrying each constructed lineage record in the sidecar projects strictEqual and byte-identical, adapter and evidence alike', () => {
    let adapter = 0;
    let evidence = 0;
    let delivered = 0;
    let sentinelHits = 0;
    for (const row of READINGS) {
      const base = readingOf(row);
      for (const item of PLANTS) {
        const planted = readingOf(row, sidecar(item));
        expect(JSON.stringify(nodeAt(planted, ['source', 'extensions', CENSUS_KEY])), `${row.id}/${item.id} carries its record`).toBe(JSON.stringify(item.record));
        delivered++;
        for (const context of CONTEXTS) {
          const want = topologyOf(base, context);
          const got = topologyOf(planted, context);
          expect(got, `${row.id}/${item.id}`).toStrictEqual(want);
          expect(JSON.stringify(got)).toBe(JSON.stringify(want));
          if (leaks(got)) sentinelHits++;
          adapter++;
        }
        expect(evidenceOf(planted), `${row.id}/${item.id} native evidence`).toStrictEqual(evidenceOf(base));
        if (leaks(evidenceOf(planted))) sentinelHits++;
        evidence++;
      }
    }
    expect(sentinelHits).toBe(0);
    const leak = providerShaped(documentOf('incomplete', false, {}, `find-${SENTINEL}`));
    expect(leaks(topologyOf(leak, PLAIN)), 'the leak judge sees a sentinel the adapter does show').toBe(true);
    settle('B1', {readings: READINGS.length, plants: PLANTS.length, contexts: CONTEXTS.length, adapter, evidence, delivered, sentinelHits});
  });

  it('B2: the registered provider delivers the full record at each open container verbatim and the projection stays strictEqual', async () => {
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const plain = await provided(base);
    const kept = objectPaths(base).filter(path => JSON.stringify(resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, full.record)))).includes(SENTINEL));
    let compared = 0;
    for (const path of kept) {
      const output = await provided(plantedAt(base, path, CENSUS_KEY, full.record));
      expect(JSON.stringify(nodeAt(output, ['source', ...path, CENSUS_KEY])), `the record at ${dotted(path)} arrives verbatim`).toBe(JSON.stringify(full.record));
      for (const context of CONTEXTS) expect(topologyOf(output, context), dotted(path)).toStrictEqual(topologyOf(plain, context));
      expect(evidenceOf(output), dotted(path)).toStrictEqual(evidenceOf(plain));
      compared++;
    }
    settle('B2', {positions: kept.map(dotted), compared});
  });

  it('B3: the full record planted at every object node of a provider reading moves no output byte', () => {
    const full = plantOf('P9');
    const counts: number[] = [];
    for (const row of READINGS.filter(item => item.id === 'R01' || item.id === 'R05')) {
      const base = readingOf(row);
      const positions = objectPaths(base);
      expect(positions.length, `${row.id}: one position per object node`).toBe(braces(base));
      for (const path of positions) {
        const planted = plantedAt(base, path, CENSUS_KEY, full.record);
        expect(JSON.stringify(nodeAt(planted, [...path, CENSUS_KEY]))).toBe(JSON.stringify(full.record));
        for (const context of CONTEXTS) expect(JSON.stringify(topologyOf(planted, context)), `${row.id} at ${dotted(path) || '(root)'}`).toBe(JSON.stringify(topologyOf(base, context)));
        expect(evidenceOf(planted)).toStrictEqual(evidenceOf(base));
      }
      counts.push(positions.length);
    }
    settle('B3', {readings: ['R01', 'R05'], positions: counts});
  });

  it('N1: no projection states any relation but the one display-grouping edge from the invoking operation', () => {
    let topologies = 0;
    let relations = 0;
    const kinds = new Set<string>();
    for (const row of READINGS) {
      for (const extensions of [{}, ...PLANTS.map(sidecar)]) {
        const value = readingOf(row, extensions);
        expect(topologyOf(value, PLAIN).relations).toStrictEqual([]);
        const invoked = topologyOf(value, INVOKED);
        const [snapshot] = invoked.snapshots;
        expect(invoked.relations).toStrictEqual([{scope, from: operationRef, to: snapshot?.source, kind: 'grouping',
          provenance: {source: 'hyperunix', observedAt: INVOKED.observedAt}}]);
        for (const relation of invoked.relations) kinds.add(relation.kind);
        topologies += 2;
        relations += invoked.relations.length;
      }
    }
    settle('N1', {topologies, relations, kinds: [...kinds]});
  });

  it('N2: a sidecar walk record claiming complete coverage leaves every reading at its own coverage, partial never lifted', () => {
    const walked = plantOf('P7');
    const tally: Record<Coverage, number> = {complete: 0, partial: 0, unknown: 0};
    for (const row of READINGS) {
      for (const context of CONTEXTS) {
        const [snapshot] = topologyOf(readingOf(row, sidecar(walked)), context).snapshots;
        expect(snapshot?.coverage, row.id).toBe(row.coverage);
        if (row.coverage === 'partial') {
          expect(snapshot?.node.statusTone, row.id).toBe('unknown');
          expect(snapshot?.node.statusText, row.id).toContain('absence not licensed');
        }
        if (row.coverage === 'complete') expect(snapshot?.node.statusTone, row.id).toBe('success');
        if (row.coverage === 'unknown') expect(snapshot?.node.statusTone, row.id).toBe('failure');
      }
      tally[row.coverage]++;
    }
    settle('N2', {...tally});
  });

  it('Q1 (residual RS1): a derived or namespaced kind spelling stays quiet under the kind judge', () => {
    const hits = DERIVED.map(kindHits);
    expect(hits).toStrictEqual(DERIVED.map(() => 0));
    settle('Q1', {shapes: DERIVED.length, hits: hits.reduce((sum, n) => sum + n, 0)});
  });

  it('Q2 (residual RS2): an identifier-only kind declaration stays quiet under the kind judge', () => {
    const hits = IDENTIFIERS.map(kindHits);
    expect(hits).toStrictEqual(IDENTIFIERS.map(() => 0));
    settle('Q2', {shapes: IDENTIFIERS.length, hits: hits.reduce((sum, n) => sum + n, 0)});
  });

  it('Q3 (residual RS3): a lineage record inside a copied-whole row or certificate body adds no serializer member', () => {
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const bodies: Path[] = [['rows', 0], ['coverage', 0, 'body']];
    const members: number[] = [];
    for (const path of bodies) {
      const output = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, full.record)));
      expect(Object.keys(output)).toStrictEqual([...REPRESENTATION_KEYS]);
      expect(JSON.stringify(nodeAt(output, [...path, CENSUS_KEY]))).toBe(JSON.stringify(full.record));
      members.push(Object.keys(output).length);
    }
    settle('Q3', {bodies: bodies.map(dotted), members});
  });

  it('F1: the tracked export row of wb-4ap.13 states KINDS in order and every row label and on-landing clause verbatim', () => {
    const description = exportDescription(BEAD);
    const statement = between(description, 'STATEMENT: ', '\n\nRATIONALE: ');
    expect(between(statement, 'typed directional refs ', ' and bounded').split('/')).toStrictEqual([...KINDS]);
    const artifact = `Artifact: ${between(statement, 'Artifact: ', ').')}).`;
    const never = `never ${between(statement, ', never ', ' as complete')} as complete`;
    const acceptance = [...between(description, 'ACCEPTANCE: [', ']\n\nSURFACES: ').matchAll(/(['"])(.*?)\1(?=, ['"]|$)/gsu)].map(match => match[2]);
    expect(acceptance).toHaveLength(3);
    expect(ROWS.filter(row => row.id !== 'Q').map(row => row.label)).toStrictEqual([artifact, acceptance[2], never]);
    expect([...ON_LANDING]).toStrictEqual(acceptance.slice(0, 2));
  });

  it('F2: READINGS covers exactly the execution kinds the src adapter projects, mutation outcomes refused', () => {
    const projected = HYPERUNIX_EXECUTION_KINDS.filter(kind => {
      try {
        topologyOf(providerShaped(documentOf(kind, false)), PLAIN);
        return true;
      } catch {
        return false;
      }
    });
    expect([...new Set(READINGS.map(row => row.kind))]).toStrictEqual(projected);
    expect(HYPERUNIX_EXECUTION_KINDS.filter(kind => !projected.includes(kind))).toStrictEqual(['mutation-rejected', 'mutation-partial']);
  });

  it('S: the frozen shape of rows, pins, kinds, readings, plants, members, judge controls, residuals and on-landing clauses', () => {
    expect({
      rows: ROWS.map(row => `${row.id}:${row.pins.length}`),
      pins: ROWS.flatMap(row => row.pins),
      witnesses: Object.keys(WITNESSES),
      kinds: [...KINDS],
      readings: READINGS.map(row => `${row.id}:${row.kind}:${row.licensed}:${row.coverage}`),
      plants: PLANTS.map(item => `${item.id}:${Object.keys(item.record).join('+')}`),
      members: REPRESENTATION_KEYS.length,
      flagged: FLAGGED.map(([kind]) => kind),
      namesakes: NAMESAKES.map(item => item.file),
      derived: DERIVED.length,
      identifiers: IDENTIFIERS.length,
      residuals: RESIDUALS.map(item => `${item.id}:${item.quiet}`),
      onLanding: ON_LANDING.length,
    }).toStrictEqual({
      rows: ['A:4', 'B:3', 'N:2', 'Q:3'],
      pins: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'N1', 'N2', 'Q1', 'Q2', 'Q3'],
      witnesses: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'N1', 'N2', 'Q1', 'Q2', 'Q3'],
      kinds: ['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to'],
      readings: [
        'R01:complete:true:complete', 'R02:complete:false:partial', 'R03:complete-empty:true:complete', 'R04:complete-empty:false:partial',
        'R05:incomplete:false:partial', 'R06:incomplete:true:partial', 'R07:budget-exhausted:false:partial', 'R08:cancelled:false:partial',
        'R09:view-invalidated:false:partial', 'R10:provider-failed:false:unknown', 'R11:schema-failed:false:unknown',
        'R12:internal-failed:false:unknown', 'R13:protocol-failed:false:unknown', 'R14:usage-error:false:unknown',
      ],
      plants: ['P1:edges', 'P2:edges', 'P3:edges', 'P4:edges', 'P5:edges', 'P6:edges', 'P7:walk', 'P8:missing_edges', 'P9:edges+walk+missing_edges'],
      members: 23,
      flagged: ['produces', 'consumes', 'depends', 'blocks', 'verifies', 'related-to', 'related-to', 'related-to', 'related-to'],
      namesakes: ['protocol/mutation.d.ts', 'client.d.ts', 'execution.d.ts', 'provider.d.ts'],
      derived: 6,
      identifiers: 3,
      residuals: ['RS1:Q1', 'RS2:Q2', 'RS3:Q3'],
      onLanding: 2,
    });
  });

  it('Z: every pin ran once, in row order, against its witness', () => {
    expect(reached).toStrictEqual(ROWS.flatMap(row => row.pins));
    expect(RESIDUALS.map(item => item.quiet)).toStrictEqual(ROWS.find(row => row.id === 'Q')?.pins);
  });
});
