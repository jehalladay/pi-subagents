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
 * provider's own path (resultFromJson, resultToJson, the JSON round trip) an unknown member with an object value survives verbatim
 * at 12 of the 22 object nodes of a full SDK document - the row claim bodies, each certificate's cause, scope, target and body,
 * the incomplete regions and the sidecar -; at evidence.provider_versions only its name survives, its value coerced to a string by
 * String() (a string value survives there verbatim, so a string member is kept at 13 nodes); and it is dropped from the other 9,
 * the records the serializer rebuilds field by field (A2 measures every node for an object and for a string member). So a
 * typed-ref payload, an object, that reached Pi's find path before a released SDK declares it would arrive verbatim inside one
 * of those open containers. Pi reads no constructed lineage record planted in any of them, as B2's one judge reads it (JSON
 * text, held only as row B's CLAIM SCOPE states): for every plant of PLANTS at every object node of every reading, the output of
 * the registered provider registerHyperUnixFind (providers/hyperunix.ts, the injected-reader registration) is judged equal to the
 * census's model of its output for that document (providerShaped: the contract, the SDK codec's own source, workspaceRoot and
 * runtime), and where the codec keeps the record verbatim, equal to its output for the same document without one plus exactly
 * that record at that node (B2; wb-57n1, re-measured on trunk 0b53dcd); the reader adapter reads rows for their count and
 * certificates for their batch ids only, and the native-evidence projection reads the execution id, kind and evidence ids only.
 * A read of a named producer member of an incomplete region (a relayed display facet) stays outside A3's boundary and inside the
 * B rows' byte-identity, which plant this census's own member.
 *
 * Pi consumes no H0/H1 result today. This census pins that standing leg, and the on-landing leg stays owed (NOT CLAIMED below):
 *  A, the gate. A1 the vendored SDK's shipped declarations (every dist .d.ts of the installed package, the version Pi's
 *    package.json pins through the committed tarball) spell none of the six kinds as a whole string literal - a hit is the
 *    gating artifact arriving: re-measure, the on-landing leg is owed; A1c the kind judge flags each kind in every quote, case and
 *    separator spelling and stays quiet on the SDK's own namesakes, each read from its file; A2 the serializer emits exactly its
 *    23 representation members, and of a member planted at every object node of a full SDK document, one node at a time, an object
 *    member survives verbatim exactly at the 12 open containers, by name only at evidence.provider_versions (its value coerced by
 *    String()) and nowhere else (dropped at the other 9, never moved), while a string member survives verbatim at the 12 and at
 *    evidence.provider_versions (measured, pinned); A3 no consumed field (HYPERUNIX_CONSUMED_FIELDS, at least its count at
 *    this cut's base) reads the sidecar, a row body or a certificate's cause, scope, target or body, rows are read for their
 *    count, the two HX modules never spell the sidecar member, and Pi registers hyperunix.find as its only HX read on both
 *    registrations (each named by its own descriptor text), equal to the src reconcile table.
 *  B, acceptance (3) in its standing form. B1 every reading of READINGS (each non-mutation execution kind, both licences where
 *    they differ) carrying each constructed lineage record of PLANTS in the sidecar projects strictEqual and byte-identical to the
 *    same reading without it, under both host contexts, for the reader adapter and the native-evidence projection alike, and no
 *    output string carries a planted sentinel (a sentinel planted in the operation is the control that the detector sees one);
 *    B2 through the registered provider registerHyperUnixFind (a stub reader returning the document), for every reading of
 *    READINGS, every whole-output comparison decided by one judge (judgeWhole: JSON text, its model leg everywhere and its plain
 *    leg where the codec keeps the record) held only as CLAIM SCOPE below states: the plain document's whole output is judged
 *    equal to the census's model of it (providerShaped, the shape B1 and B3 read), and so is the output for every plant of PLANTS
 *    planted at each object node of the reading's document, one plant and one node at a time (all 9 plants at all 301 object
 *    nodes of READINGS, R05's 22 included, each reading's node count re-derived from its JSON text); where the codec keeps the
 *    record verbatim (the 12 open containers of A2 on R05; 161 nodes over READINGS, the same nodes for every plant) the record
 *    arrives verbatim, the whole output is judged equal to the plain output with exactly that record added at that node, and the
 *    projection and native evidence stay strictEqual; and with a plant at every such node of a reading at once, the whole output
 *    is judged the model and the plain output with the record at each of them. B2's witness carries each plant as it arrived (its
 *    members and its edge list's kinds, read back from the provider's output at the plant's first kept node).
 *    CLAIM SCOPE (wb-57n1 respin 2, rule 19(c), ruling R-B146): the judge is held by exactly these controls, each judged moved on
 *    every leg its context judges, in exactly these contexts and in no other. (1) HELD, in every context the judge decides (each
 *    reading's plain output, each plant at each node, each plant at every kept node at once): the context's output with one
 *    member added beside source (at the output's root) and one added inside source at each node the context planted (at source
 *    itself for a plain output). (2) EDITS, on the delivered output for R05 with P9 at rows.0 only: the census's own single edits
 *    of seven kinds - a member added at each object node, each member and each array element removed, each scalar changed (a
 *    string suffixed, a number incremented, a boolean negated, null replaced by 0), each non-string scalar retyped to its own
 *    text, each string's first cased letter recased, each string given a trailing space, and each object's members and each
 *    array's elements rotated once - every such candidate that moves the output's JSON text, inside source (coverage_summary, the
 *    delivered rows, the record) and beside it alike, each kind's count equal to the count of its candidates the output's JSON
 *    text holds as the platform's own parser reads it; and the delivered output itself is judged moved on neither leg (the plain
 *    leg cannot pass by re-planting: a plant never overwrites a member). Outside (1) and (2) the judge is not held: a judge blind,
 *    in a context other than R05/P9 at rows.0, only to a move outside that context's held controls is the named residual RS4,
 *    and one blind only to an edit other than the census's own or to a combination of edits is RS5;
 *    B3 the full record planted at every object node of a provider reading (positions derived from the reading, their count
 *    re-derived from its JSON text) moves no output byte.
 *  N, the statement's negative clause. N1 no projection states any relation but the one display-grouping edge from the invoking
 *    operation to the query node (none without one), so no planted kind is lifted to a RelationKind or merged into grouping; N2 a
 *    sidecar walk record claiming complete coverage leaves every reading at its own coverage: complete only when runtime-licensed
 *    on a complete kind, partial (tone unknown, "absence not licensed") or failure-unknown otherwise.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * OUTSIDE ANCHORS: F1 the tracked bead export row of wb-4ap.13 (.beads/issues.jsonl, its description only, never its notes)
 * states KINDS in order, row A's label (its Artifact sentence), row N's label (its never-clause) and row B's label (acceptance
 * clause 3) verbatim, and ON_LANDING as acceptance clauses 1 and 2; F2 READINGS covers exactly the execution kinds the src
 * adapter projects (HYPERUNIX_EXECUTION_KINDS, mutation outcomes refused). A2's member list is held to the SDK's own serializer.
 * B2's node counts are held to each document's JSON text, and its EDITS control counts to the delivered output's JSON text as the
 * platform's own parser reads it (JSON.parse's reviver, textCounts), never to nodePaths or editsOf.
 * FROZEN SHAPE (standing rule 16): S pins the rows and their pins, KINDS, READINGS (id, kind, licence, expected coverage), PLANTS
 * (id and record members), the representation members, the judge controls - the kind judge's (FLAGGED, NAMESAKES) and B2's
 * held and whole-output control kinds (HELD, EDITS) -, the residuals and the on-landing labels as literals; every pin compares a
 * measured witness to WITNESSES (payload identity: B2's carries the plants as they arrived, its held-control counts, its control
 * output and each control kind's count); Z requires every pin to run once, in row order.
 * CASE NAMES: no case name here evidences docs/workbench/09's "optional graph traversal of linked native refs" (the RA5/b half of
 * test/workbench-docs09-readers-relationships.census.ts, routed to this bead's on-landing leg), so every case name stays outside
 * that half's title probe; the kind spellings live in data, never in a case name.
 * NOT CLAIMED: acceptance clauses 1 and 2 (ON_LANDING) - a typed-ref fixture mapped onto distinct RelationKinds or counted as
 * unmapped, per-edge coverage and source revision, a bounded walk read partial with its remainder counted - wait for H0/H1
 * results in a released @hyperunix/sdk (HyperUnix-CLI H0/H1, an external target) and a re-vendor; no Pi reader of them exists.
 * The native registration's invoke (nativeHyperUnixFind, which launches the SDK's client and so needs the hx binary) is not
 * driven: B2 reaches the provider through registerHyperUnixFind only, and A3 reads both registrations' catalogs, not outputs.
 * B2 drives the census's own documents only (READINGS' execution kinds, so no mutation outcome; two rows at most) with the records
 * of PLANTS, one node at a time and every codec-kept node at once: a provider keyed on another document, on another payload (A2
 * measures where a string member survives, but no B row plants one) or on another combination of nodes is not driven; and B2's
 * judge is held only as row B's CLAIM SCOPE states, so a judge blind, in a context other than R05/P9 at rows.0, only to a move
 * outside that context's held controls (RS4), or blind only to an edit other than the census's own single edits or to a
 * combination of edits (RS5), is not excluded: each is a named residual with its pinned quiet row (Q4, Q5).
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
  {id: 'Q', label: 'the named residuals of rows A and B, each with its pinned quiet row', pins: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']},
]);

interface Residual { readonly id: string; readonly family: string; readonly quiet: string; }
const RESIDUALS: readonly Residual[] = Object.freeze([
  {id: 'RS1', family: 'a kind spelled outside the six whole-literal spellings (a derived form, a namespaced token) never trips A1', quiet: 'Q1'},
  {id: 'RS2', family: 'a kind declared only as an identifier (an enum member or property name) never trips A1', quiet: 'Q2'},
  {id: 'RS3', family: 'a lineage payload inside a container the SDK copies whole adds no serializer member, so A2 never sees it', quiet: 'Q3'},
  {id: 'RS4', family: "a judge blind, in a context other than R05/P9 at rows.0, only to a move outside that context's held controls never trips B2", quiet: 'Q4'},
  {id: 'RS5', family: "a judge blind only to an edit other than the census's own single edits (a scalar moved to another of its values) or to a combination of edits (two scalars exchanged) never trips B2", quiet: 'Q5'},
]);

/** The 12 object nodes of a full SDK document at which an object member survives the provider's codec path verbatim (measured, A2/B2). */
const OPEN_POSITIONS: readonly string[] = Object.freeze([
  'rows.0', 'rows.1', 'coverage.0.cause', 'coverage.0.scope', 'coverage.0.target', 'coverage.0.body', 'coverage.1.cause', 'coverage.1.scope',
  'coverage.1.target', 'coverage.1.body', 'coverage_summary.incomplete_regions.0', 'extensions',
]);
/** The one object node at which only a planted member's name survives, an object value coerced by String(); a string survives there verbatim (A2). */
const COERCING_POSITION = 'evidence.provider_versions';
/** The 9 object nodes the serializer rebuilds field by field, where a planted member is dropped (A2). */
const DROPPED_POSITIONS: readonly string[] = Object.freeze([
  '(root)', 'coverage.0', 'coverage.1', 'status', 'status.streams.0', 'execution_status', 'transport', 'coverage_summary', 'evidence',
]);
/** The measured witness each pin must reproduce (payload identity), measured on trunk f5589e0 with @hyperunix/sdk 0.1.0 (A2's re-measured on trunk c85be84 by the wb-57n1 respin, B2's, Q4's and Q5's on trunk 0b53dcd by its second). */
const WITNESSES: Readonly<Record<string, JsonValue>> = Object.freeze({
  A1: {declarationFiles: 27, kindLiteralFiles: 0, version: '0.1.0', sidecarDeclared: true},
  A1c: {flagged: 9, kinds: 6, namesakes: 4, flaggedHits: 9, namesakeHits: 0},
  A2: {members: 23, objectNodes: 22, kept: [...OPEN_POSITIONS], coerced: [COERCING_POSITION], dropped: [...DROPPED_POSITIONS],
    textKept: [...OPEN_POSITIONS.slice(0, -1), COERCING_POSITION, 'extensions']},
  A3: {sidecarReads: 0, bodyReads: 0, rowsUse: 'rows', sidecarTokens: 0, reads: [['hyperunix.find'], ['hyperunix.find']],
    registrations: [['Read typed HX results with native coverage and query basis'], ['Native bounded HX query with coverage']]},
  B1: {readings: 14, plants: 9, contexts: 2, adapter: 252, evidence: 126, delivered: 126, sentinelHits: 0},
  B2: {plants: ['P1:edges[produces]', 'P2:edges[consumes]', 'P3:edges[depends]', 'P4:edges[blocks]', 'P5:edges[verifies]', 'P6:edges[related-to]', 'P7:walk',
      'P8:missing_edges', 'P9:edges[produces,consumes,depends,blocks,verifies,related-to]+walk+missing_edges'],
    positions: [...OPEN_POSITIONS],
    nodes: {R01: 21, R02: 22, R03: 19, R04: 20, R05: 22, R06: 21, R07: 22, R08: 22, R09: 22, R10: 22, R11: 22, R12: 22, R13: 22, R14: 22},
    kept: {R01: 11, R02: 12, R03: 9, R04: 10, R05: 12, R06: 11, R07: 12, R08: 12, R09: 12, R10: 12, R11: 12, R12: 12, R13: 12, R14: 12},
    unmoved: {model: 2723, plain: 1449}, compared: 1449, together: 126,
    held: {'beside source': 2849, 'inside source': 4172},
    controls: {at: 'R05/P9 at rows.0', added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60}},
  B3: {readings: ['R01', 'R05'], positions: [23, 24]},
  N1: {topologies: 280, relations: 140, kinds: ['grouping']},
  N2: {complete: 2, partial: 7, unknown: 5},
  Q1: {shapes: 6, hits: 0},
  Q2: {shapes: 3, hits: 0},
  Q3: {bodies: ['rows.0', 'coverage.0.body'], members: [23, 23]},
  Q4: {contexts: ['R05/P9 at coverage.0.cause: held 2', 'R01/P9 at rows.0: held 2', 'R05/P1 at rows.0: held 2', 'R05/P9 at every kept node: held 13'],
    unseen: {added: 0, removed: 1, changed: 1, retyped: 1, recased: 0, spaced: 0, rotated: 0}},
  Q5: {at: 'R05/P9 at rows.0', pages: [
    {page: 'another value', seen: {added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
      move: 'source.terminal complete to partial', judge: ['model', 'plain'], missed: []},
    {page: 'a combination', seen: {added: 63, removed: 257, changed: 181, retyped: 30, recased: 150, spaced: 151, rotated: 60},
      move: 'contract and runtime.version exchanged', judge: ['model', 'plain'], missed: []}]},
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
/**
 * A deep copy of `value` with `member` added, set to `payload`, on the object node at `path`. A node that already carries `member`
 * is refused, so a plant never overwrites (B2's plain leg cannot pass by re-planting a record its plain output already holds).
 */
function plantedAt<T extends JsonValue>(value: T, path: Path, member: string, payload: JsonValue): T {
  const copy = JSON.parse(JSON.stringify(value)) as T;
  const node = nodeAt(copy, path);
  if (!isRecord(node)) throw new Error(`no object node at ${path.join('.')}`);
  if (Object.hasOwn(node, member)) throw new Error(`the node at ${path.join('.') || '(root)'} already carries ${member}`);
  node[member] = payload;
  return copy;
}
const dotted = (path: Path): string => path.join('.');
/** The object nodes of a JSON tree that carry the census's member, by dotted path. */
const carriers = (value: unknown): string[] =>
  objectPaths(value).filter(path => {
    const node = nodeAt(value, path);
    return isRecord(node) && Object.hasOwn(node, CENSUS_KEY);
  }).map(dotted);
const braces = (value: unknown): number => JSON.stringify(value).split('{').length - 1;
const same = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);
/** A record's identity read from the record itself: each member by name, an edge list with its kinds in order (B2's witness). */
const signatureOf = (record: unknown): string =>
  isRecord(record)
    ? Object.entries(record).map(([name, value]) => (Array.isArray(value) ? `${name}[${value.map(item => (isRecord(item) ? String(item.kind) : typeof item)).join(',')}]` : name)).join('+')
    : `not a record: ${String(JSON.stringify(record))}`;
/** A dotted node name (A2's and B2's positions) read back as its path. */
const pathOf = (name: string): Path => (name === '(root)' ? [] : name.split('.').map(step => (/^\d+$/u.test(step) ? Number(step) : step)));

const topologyOf = (value: JsonValue, context: HyperUnixTopologyContext): HyperUnixProjectionTopology => hyperunixTopology(value, context);
/** Whether any output string carries a planted sentinel: B1's loop and its leak control share this one judge. */
const leaks = (value: unknown): boolean => JSON.stringify(value).includes(SENTINEL);
const evidenceOf = (value: JsonValue) => nativeEvidence('hyperunix.find', value);
/** `value` with `record` planted under CENSUS_KEY at each node of `paths`, each path read below `under`. */
const plantedEach = <T extends JsonValue>(value: T, paths: readonly Path[], record: Json, under: Path = []): T =>
  paths.reduce((planted, path) => plantedAt(planted, [...under, ...path], CENSUS_KEY, record), value);
interface Judgment { readonly judged: readonly string[]; readonly moved: readonly string[]; }
type Leg = readonly [string, JsonValue];
/** The context legsOf read last, keyed by the JSON text of its inputs: a context's held controls reuse its legs (wb-57n1 respin 2). */
let lastContext: {readonly key: string; readonly legs: readonly Leg[]} | undefined;
/**
 * What B2's judge compares an output with, for `record` planted at each node of `paths` in `base`: the model leg, providerShaped of
 * that planted document; and, when at least one node is planted and the codec keeps the record verbatim at every one of them, the
 * plain leg, `plain` (the provider's output for `base`) with exactly that record added at each of them. A pure function of its
 * inputs' JSON text, built once per context: the judgments that follow for the same context (its held controls) reuse it.
 */
function legsOf(base: Json, plain: JsonValue, paths: readonly Path[], record: Json): readonly Leg[] {
  const key = JSON.stringify([base, plain, paths, record]);
  if (lastContext?.key === key) return lastContext.legs;
  const model = providerShaped(plantedEach(base, paths, record));
  const legs: Leg[] = [['model', model]];
  const verbatim = paths.every(path => JSON.stringify(nodeAt(model, ['source', ...path, CENSUS_KEY])) === JSON.stringify(record));
  if (paths.length > 0 && verbatim) legs.push(['plain', plantedEach(plain, paths, record, ['source'])]);
  lastContext = {key, legs};
  return legs;
}
/**
 * B2's whole-output judge (wb-57n1), the one function its sweep, its held controls and its EDITS controls call. `output` is the
 * provider's output for `base` with `record` planted at each node of `paths`; it is compared, as JSON text, with each leg of legsOf.
 */
function judgeWhole(output: JsonValue, base: Json, plain: JsonValue, paths: readonly Path[], record: Json): Judgment {
  const legs = legsOf(base, plain, paths, record);
  const text = JSON.stringify(output);
  return {judged: legs.map(([leg]) => leg), moved: legs.filter(([, expected]) => JSON.stringify(expected) !== text).map(([leg]) => leg)};
}
/** The kinds of single-edit move B2's judge must see (its controls), in this order; S pins the list. */
const EDITS = Object.freeze(['added', 'removed', 'changed', 'retyped', 'recased', 'spaced', 'rotated'] as const);
type Edit = (typeof EDITS)[number];
/** B2's held controls (wb-57n1 respin 2, ruling R-B146): the moves every context's judgment must see, in this order; S pins the list. */
const HELD = Object.freeze(['beside source', 'inside source'] as const);
type Held = (typeof HELD)[number];
/** The member every held control adds: the census's own carrier key, marked moved. */
const MOVED = `${CENSUS_KEY}:moved`;
/**
 * A context's held controls: its output with one member added beside source (at the output's root), and one added inside source
 * at each node the context planted (at source itself for a plain output, which plants none).
 */
function heldOf(output: JsonValue, paths: readonly Path[]): Record<Held, JsonValue[]> {
  const planted: readonly Path[] = paths.length > 0 ? paths : [[]];
  return {'beside source': [plantedAt(output, [], MOVED, true)], 'inside source': planted.map(path => plantedAt(output, ['source', ...path], MOVED, true))};
}
/**
 * How many candidates of each EDITS kind a JSON text holds, read by the platform's own parser (JSON.parse's reviver visits each
 * value once, the root last), never by nodePaths or editsOf: the anchor of B2's EDITS control counts outside this file's literals.
 * An object is one added candidate and, with two or more members, one rotated; an array whose elements are not all equal is one
 * rotated; every member and element is one removed; every scalar one changed; a non-string scalar one retyped; a string one spaced
 * and, when its first letter has a case, one recased.
 */
function textCounts(text: string): Record<Edit, number> {
  const counts: Record<Edit, number> = {added: 0, removed: 0, changed: 0, retyped: 0, recased: 0, spaced: 0, rotated: 0};
  let values = 0;
  JSON.parse(text, (_key: string, value: unknown) => {
    values++;
    if (Array.isArray(value)) {
      if (value.some(item => JSON.stringify(item) !== JSON.stringify(value[0]))) counts.rotated++;
    } else if (isRecord(value)) {
      counts.added++;
      if (Object.keys(value).length > 1) counts.rotated++;
    } else if (typeof value === 'string') {
      counts.changed++;
      counts.spaced++;
      const letter = value.match(/\p{L}/u)?.[0];
      if (letter !== undefined && letter.toUpperCase() !== letter.toLowerCase()) counts.recased++;
    } else {
      counts.changed++;
      counts.retyped++;
    }
    return value;
  });
  counts.removed = values - 1;
  return counts;
}
/** Every node of a JSON tree by its path - objects, arrays and scalars alike - in document order. */
function nodePaths(value: unknown, path: Path = []): Path[] {
  if (Array.isArray(value)) return [path, ...value.flatMap((child: unknown, index) => nodePaths(child, [...path, index]))];
  if (isRecord(value)) return [path, ...Object.entries(value).flatMap(([key, child]) => nodePaths(child, [...path, key]))];
  return [path];
}
/** A deep copy of `value` whose node at `path` is replaced by `edit` of it. */
function editedAt(value: JsonValue, path: Path, edit: (node: JsonValue) => JsonValue): JsonValue {
  const copy = JSON.parse(JSON.stringify(value)) as JsonValue;
  if (path.length === 0) return edit(copy);
  const parent = nodeAt(copy, path.slice(0, -1));
  const step = path[path.length - 1];
  if (Array.isArray(parent)) parent[Number(step)] = edit(parent[Number(step)] as JsonValue);
  else if (isRecord(parent)) parent[String(step)] = edit(parent[String(step)] as JsonValue);
  else throw new Error(`no container above ${dotted(path)}`);
  return copy;
}
const membersOf = (node: JsonValue): [string, JsonValue][] => (isRecord(node) ? (Object.entries(node) as [string, JsonValue][]) : []);
const elementsOf = (node: JsonValue): JsonValue[] => (Array.isArray(node) ? node : []);
const rotatedOnce = <T>(items: readonly T[]): T[] => [...items.slice(1), ...items.slice(0, 1)];
/** A copy of `value` without the member `name` of the object at `path`, or `value` itself when no object is there (Q4's page). */
const withoutMember = (value: JsonValue, path: Path, name: string): JsonValue =>
  isRecord(nodeAt(value, path)) ? editedAt(value, path, node => Object.fromEntries(membersOf(node).filter(([member]) => member !== name))) : value;
/** A scalar changed: a string suffixed, a number incremented, a boolean negated, null replaced by 0. */
const changedScalar = (scalar: JsonValue): JsonValue =>
  typeof scalar === 'string' ? `${scalar}-moved` : typeof scalar === 'number' ? scalar + 1 : typeof scalar === 'boolean' ? !scalar : 0;
/** A string whose first cased letter has its case flipped (the same text otherwise). */
const recased = (text: string): string => text.replace(/\p{L}/u, letter => (letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase()));
/**
 * B2's judge controls: every single-edit move of `output`, by kind (EDITS), each derived from the output itself. A candidate that
 * leaves the output's JSON text unchanged (a rotation of equal elements, a letter without case) moves nothing, so it is no control.
 */
function editsOf(output: JsonValue): Record<Edit, JsonValue[]> {
  const edits: Record<Edit, JsonValue[]> = {added: [], removed: [], changed: [], retyped: [], recased: [], spaced: [], rotated: []};
  for (const path of nodePaths(output)) {
    const node = nodeAt(output, path) as JsonValue;
    if (isRecord(node)) {
      edits.added.push(editedAt(output, path, copy => Object.fromEntries([...membersOf(copy), [`${CENSUS_KEY}:moved`, true]])));
      for (const member of Object.keys(node)) {
        edits.removed.push(editedAt(output, path, copy => Object.fromEntries(membersOf(copy).filter(([name]) => name !== member))));
      }
      edits.rotated.push(editedAt(output, path, copy => Object.fromEntries(rotatedOnce(membersOf(copy)))));
    } else if (Array.isArray(node)) {
      for (let index = 0; index < node.length; index++) {
        edits.removed.push(editedAt(output, path, copy => [...elementsOf(copy).slice(0, index), ...elementsOf(copy).slice(index + 1)]));
      }
      edits.rotated.push(editedAt(output, path, copy => rotatedOnce(elementsOf(copy))));
    } else {
      edits.changed.push(editedAt(output, path, changedScalar));
      if (typeof node === 'string') {
        edits.recased.push(editedAt(output, path, () => recased(node)));
        edits.spaced.push(editedAt(output, path, () => `${node} `));
      } else {
        edits.retyped.push(editedAt(output, path, scalar => String(scalar)));
      }
    }
  }
  const text = JSON.stringify(output);
  for (const edit of EDITS) edits[edit] = edits[edit].filter(control => JSON.stringify(control) !== text);
  return edits;
}
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

  it('A2: the SDK serializer emits exactly its 23 members; a planted object member survives verbatim only at the open containers it copies whole, coerced to a string at provider_versions, dropped elsewhere', () => {
    const base = documentOf('incomplete', false);
    const members = Object.keys(resultToJson(resultFromJson(base)));
    expect(members).toStrictEqual([...REPRESENTATION_KEYS]);
    const positions = objectPaths(base);
    expect(positions.length).toBe(braces(base));
    const marker = {[SENTINEL]: CENSUS_KEY};
    const text = `${SENTINEL} ${CENSUS_KEY}`;
    const kept: string[] = [];
    const coerced: string[] = [];
    const dropped: string[] = [];
    const textKept: string[] = [];
    for (const path of positions) {
      const where = dotted(path) || '(root)';
      const output = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, marker)));
      expect(Object.keys(output), `members after a plant at ${where}`).toStrictEqual([...REPRESENTATION_KEYS]);
      const node = nodeAt(output, path);
      const value = isRecord(node) ? node[CENSUS_KEY] : undefined;
      if (value === undefined) {
        expect(JSON.stringify(output).includes(CENSUS_KEY), `the plant at ${where} is dropped, never moved`).toBe(false);
        dropped.push(where);
        continue;
      }
      expect(carriers(output), `the plant at ${where} survives at its own node only`).toStrictEqual([dotted(path)]);
      if (JSON.stringify(value) === JSON.stringify(marker)) {
        kept.push(where);
      } else {
        expect(value, `the plant at ${where} keeps only its name, its value coerced by String()`).toBe(String(marker));
        coerced.push(where);
      }
    }
    for (const path of positions) {
      const textOutput = resultToJson(resultFromJson(plantedAt(base, path, CENSUS_KEY, text)));
      const textNode = nodeAt(textOutput, path);
      if (isRecord(textNode) && textNode[CENSUS_KEY] === text && carriers(textOutput).length === 1) textKept.push(dotted(path) || '(root)');
    }
    settle('A2', {members: members.length, objectNodes: positions.length, kept, coerced, dropped, textKept});
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

  it('B2: through registerHyperUnixFind every plant at every node of every reading is judged the modelled whole output, the plain output plus the record wherever the codec keeps it, by a judge held in every context it decides', async () => {
    const plants = new Set<string>();
    const nodes: Record<string, number> = {};
    const kept: Record<string, number> = {};
    // Every count below grows only on a comparison that holds, so a deleted expect still reds the witness under a moving provider.
    const unmoved: Record<string, number> = {model: 0, plain: 0};
    const tally = (judgment: Judgment): void => {
      for (const leg of judgment.judged) if (!judgment.moved.includes(leg)) unmoved[leg] = (unmoved[leg] ?? 0) + 1;
    };
    // HELD (wb-57n1 respin 2, ruling R-B146): in every context the judge decides, each held control is judged moved on every leg
    // that context's own judgment judged, so a judge blind in any one context (a node, a reading, a plant, the joint) reds there.
    const held: Record<Held, number> = {'beside source': 0, 'inside source': 0};
    const hold = (output: JsonValue, judgment: Judgment, base: Json, plain: JsonValue, paths: readonly Path[], record: Json, at: string): void => {
      const controls = heldOf(output, paths);
      const everyLeg: Judgment = {judged: judgment.judged, moved: judgment.judged};
      for (const kind of HELD) {
        for (const control of controls[kind]) {
          const seen = judgeWhole(control, base, plain, paths, record);
          expect(seen, `${at}: the judge sees its held control ${kind} on every leg`).toStrictEqual(everyLeg);
          if (same(seen, everyLeg)) held[kind]++;
        }
      }
    };
    let positions: string[] = [];
    let compared = 0;
    let together = 0;
    for (const row of READINGS) {
      const base = documentOf(row.kind, row.licensed);
      const plain = await provided(base);
      const bare = judgeWhole(plain, base, plain, [], {});
      expect(bare, `${row.id}: the plain output is the model`).toStrictEqual({judged: ['model'], moved: []});
      tally(bare);
      hold(plain, bare, base, plain, [], {}, `${row.id}: the plain output`);
      const all = objectPaths(base);
      expect(all.length, `${row.id}: one node per object of the document, counted from its JSON text`).toBe(braces(base));
      const plainTopologies = CONTEXTS.map(context => topologyOf(plain, context));
      const plainEvidence = evidenceOf(plain);
      let keptAt: string[] | undefined;
      for (const item of PLANTS) {
        const keptHere: Path[] = [];
        let arrivedFirst: unknown;
        for (const path of all) {
          const output = await provided(plantedAt(base, path, CENSUS_KEY, item.record));
          const at = `${row.id}/${item.id} at ${dotted(path) || '(root)'}`;
          const judgment = judgeWhole(output, base, plain, [path], item.record);
          expect(judgment.moved, `${at}: the whole provider output moved`).toStrictEqual([]);
          tally(judgment);
          hold(output, judgment, base, plain, [path], item.record, at);
          if (!judgment.judged.includes('plain')) continue;
          const arrived = nodeAt(output, ['source', ...path, CENSUS_KEY]);
          expect(JSON.stringify(arrived), `${at}: the record arrives verbatim`).toBe(JSON.stringify(item.record));
          arrivedFirst ??= arrived;
          const topologies = CONTEXTS.map(context => topologyOf(output, context));
          expect(topologies, `${at}: the projection under both host contexts`).toStrictEqual(plainTopologies);
          const evidence = evidenceOf(output);
          expect(evidence, `${at}: native evidence`).toStrictEqual(plainEvidence);
          if (same(arrived, item.record) && same(topologies, plainTopologies) && same(evidence, plainEvidence)) compared++;
          keptHere.push(path);
        }
        const names = keptHere.map(dotted);
        keptAt ??= names;
        expect(names, `${row.id}/${item.id}: the codec keeps every plant at the same nodes`).toStrictEqual(keptAt);
        const joint = judgeWhole(await provided(plantedEach(base, keptHere, item.record)), base, plain, keptHere, item.record);
        expect(joint, `${row.id}/${item.id} at every kept node at once`).toStrictEqual({judged: ['model', 'plain'], moved: []});
        if (same(joint, {judged: ['model', 'plain'], moved: []})) together++;
        // The joint's held controls, on the output for the same planted document.
        hold(await provided(plantedEach(base, keptHere, item.record)), joint, base, plain, keptHere, item.record, `${row.id}/${item.id} at every kept node at once`);
        // The witness carries each plant as it arrived, read back from the provider's output, never the loop's own record.
        plants.add(`${item.id}:${signatureOf(arrivedFirst)}`);
      }
      nodes[row.id] = all.length;
      kept[row.id] = keptAt?.length ?? 0;
      if (row.id === 'R05') positions = keptAt ?? [];
    }
    // The judge's controls (wb-57n1 respin), on the delivered output for R05 with the full record P9 at rows.0: every single-edit move
    // of that output (EDITS), inside source (coverage_summary, the delivered rows, the record) and beside it alike, is judged moved on
    // both legs and the delivered output itself on neither, so a judge blind to a region, to key or element order, to a value's type,
    // to a letter's case or to a trailing space reds here. The added count is re-derived from the output's own JSON text.
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    expect(judgeWhole(output, base, plain, [first], full.record), 'the control output itself is unmoved').toStrictEqual({judged: ['model', 'plain'], moved: []});
    const edits = editsOf(output);
    expect(edits.added.length, 'one added member per object node of the output, counted from its JSON text').toBe(braces(output));
    // Every kind's count against the output's JSON text as the platform's parser reads it (respin 2: the G24C1 coordinated hollow).
    const counted = textCounts(JSON.stringify(output));
    for (const edit of EDITS) expect(edits[edit].length, `as many ${edit} controls as the output's JSON text holds`).toBe(counted[edit]);
    const controls: Record<string, JsonValue> = {at: `R05/${full.id} at ${dotted(first)}`};
    for (const edit of EDITS) {
      const seen = edits[edit].filter(control => JSON.stringify(judgeWhole(control, base, plain, [first], full.record).moved) === JSON.stringify(['model', 'plain'])).length;
      expect(seen, `the judge sees every ${edit} move on both legs`).toBe(edits[edit].length);
      controls[edit] = seen;
    }
    settle('B2', {plants: [...plants], positions, nodes, kept, unmoved, compared, together, held, controls});
  }, 120_000);

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

  it('Q4 (residual RS4): a judge blind to one scalar outside R05/P9 at rows.0 sees every held control at another node, reading and plant and at the joint, and misses that scalar there, while the EDITS controls at R05/P9 at rows.0 see it', async () => {
    // The quiet page: judgeWhole's comparison read with source.transport.frames dropped from both sides (G24C1's member). Each
    // context below differs from R05/P9 at rows.0 in one dimension of the judge's own context, where only HELD holds the judge.
    const framesless = (value: JsonValue): string => JSON.stringify(withoutMember(value, ['source', 'transport'], 'frames'));
    const page = (output: JsonValue, base: Json, plain: JsonValue, paths: readonly Path[], record: Json): Judgment => {
      const legs = legsOf(base, plain, paths, record);
      const read = framesless(output);
      return {judged: legs.map(([leg]) => leg), moved: legs.flatMap(([leg, expected]) => (framesless(expected) === read ? [] : [leg]))};
    };
    const readingOfId = (id: string): Reading => {
      const found = READINGS.find(item => item.id === id);
      if (found === undefined) throw new Error(`no reading ${id}`);
      return found;
    };
    const kept = OPEN_POSITIONS.map(pathOf);
    const pages: readonly (readonly [string, string, readonly Path[], string])[] = [
      ['R05', 'P9', [['coverage', 0, 'cause']], 'coverage.0.cause'], ['R01', 'P9', [['rows', 0]], 'rows.0'], ['R05', 'P1', [['rows', 0]], 'rows.0'],
      ['R05', 'P9', kept, 'every kept node'],
    ];
    const contexts: string[] = [];
    for (const [id, plantId, paths, where] of pages) {
      const reading = readingOfId(id);
      const base = documentOf(reading.kind, reading.licensed);
      const plain = await provided(base);
      const record = plantOf(plantId).record;
      const output = await provided(plantedEach(base, paths, record));
      const at = `${id}/${plantId} at ${where}`;
      const judgment = judgeWhole(output, base, plain, paths, record);
      expect(judgment, `${at}: the output is unmoved`).toStrictEqual({judged: ['model', 'plain'], moved: []});
      const everyLeg: Judgment = {judged: judgment.judged, moved: judgment.judged};
      let quiet = 0;
      const controls = heldOf(output, paths);
      for (const kind of HELD) {
        for (const control of controls[kind]) {
          expect(judgeWhole(control, base, plain, paths, record), `${at}: the judge sees its held control ${kind}`).toStrictEqual(everyLeg);
          const read = page(control, base, plain, paths, record);
          expect(read, `${at}: the page sees its held control ${kind} as well`).toStrictEqual(everyLeg);
          if (same(read, everyLeg)) quiet++;
        }
      }
      // Liveness: the page carries the family's blindness here - frames retyped to its own text (G8P9's move) is judged moved on
      // every leg by the judge and on none by the page.
      const move = editedAt(output, ['source', 'transport', 'frames'], frames => String(frames));
      expect(judgeWhole(move, base, plain, paths, record), `${at}: the judge sees frames retyped`).toStrictEqual(everyLeg);
      expect(page(move, base, plain, paths, record).moved, `${at}: the page misses frames retyped`).toStrictEqual([]);
      contexts.push(`${at}: held ${quiet}`);
    }
    // The analog: at R05/P9 at rows.0 the EDITS controls see the same page - it misses exactly the controls that move frames.
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    const edits = editsOf(output);
    const unseen: Record<string, number> = {};
    for (const edit of EDITS) unseen[edit] = edits[edit].filter(control => !same(page(control, base, plain, [first], full.record).moved, ['model', 'plain'])).length;
    settle('Q4', {contexts, unseen});
  }, 60_000);

  it('Q5 (residual RS5): a judge blind only to a scalar moved to another of its values, or only to two scalars exchanged, sees every EDITS control at R05/P9 at rows.0 and misses that move', async () => {
    // Two quiet pages, each judgeWhole's comparison read through one fold on both sides: 'another value' folds source.terminal
    // 'partial' onto 'complete' (blind only to a value the census's own change never writes, G8P10's move), and 'a combination'
    // orders the values of contract and runtime.version (blind only to the two exchanged, an edit of two scalars at once).
    const terminal: Path = ['source', 'terminal'];
    const contract: Path = ['contract'];
    const version: Path = ['runtime', 'version'];
    /** `value` with the values at contract and runtime.version exchanged. */
    const exchanged = (value: JsonValue): JsonValue => {
      const one = nodeAt(value, contract) as JsonValue;
      const other = nodeAt(value, version) as JsonValue;
      return editedAt(editedAt(value, contract, () => other), version, () => one);
    };
    const folds: readonly (readonly [string, (value: JsonValue) => JsonValue, (value: JsonValue) => JsonValue, string])[] = [
      ['another value', value => (nodeAt(value, terminal) === 'partial' ? editedAt(value, terminal, () => 'complete') : value),
        value => editedAt(value, terminal, () => 'partial'), 'source.terminal complete to partial'],
      ['a combination', value => {
        const one = nodeAt(value, contract);
        const other = nodeAt(value, version);
        return typeof one === 'string' && typeof other === 'string' && one > other ? exchanged(value) : value;
      }, exchanged, 'contract and runtime.version exchanged'],
    ];
    const full = plantOf('P9');
    const base = documentOf('incomplete', false);
    const first: Path = ['rows', 0];
    const plain = await provided(base);
    const output = await provided(plantedAt(base, first, CENSUS_KEY, full.record));
    expect(judgeWhole(output, base, plain, [first], full.record), 'the control output itself is unmoved').toStrictEqual({judged: ['model', 'plain'], moved: []});
    expect(nodeAt(output, terminal), 'the delivered output reads terminal complete').toBe('complete');
    const edits = editsOf(output);
    const pages: JsonValue[] = [];
    for (const [name, fold, move, spelled] of folds) {
      const read = (value: JsonValue): string => JSON.stringify(fold(value));
      const page = (control: JsonValue): string[] => legsOf(base, plain, [first], full.record).flatMap(([leg, expected]) => (read(expected) === read(control) ? [] : [leg]));
      const seen: Record<string, number> = {};
      for (const edit of EDITS) {
        seen[edit] = edits[edit].filter(control => same(page(control), ['model', 'plain'])).length;
        expect(seen[edit], `${name}: the page sees every ${edit} control as well`).toBe(edits[edit].length);
      }
      const moved = move(output);
      expect(read(moved) === read(output), `${name}: the move is one the page folds away`).toBe(true);
      const judge = judgeWhole(moved, base, plain, [first], full.record).moved;
      const missed = page(moved);
      expect(judge, `${name}: the judge sees ${spelled} on both legs`).toStrictEqual(['model', 'plain']);
      expect(missed, `${name}: the page misses it`).toStrictEqual([]);
      pages.push({page: name, seen, move: spelled, judge: [...judge], missed});
    }
    settle('Q5', {at: `R05/${full.id} at ${dotted(first)}`, pages});
  }, 60_000);

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
      edits: [...EDITS],
      held: [...HELD],
      derived: DERIVED.length,
      identifiers: IDENTIFIERS.length,
      residuals: RESIDUALS.map(item => `${item.id}:${item.quiet}`),
      onLanding: ON_LANDING.length,
    }).toStrictEqual({
      rows: ['A:4', 'B:3', 'N:2', 'Q:5'],
      pins: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'N1', 'N2', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      witnesses: ['A1', 'A1c', 'A2', 'A3', 'B1', 'B2', 'B3', 'N1', 'N2', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
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
      edits: ['added', 'removed', 'changed', 'retyped', 'recased', 'spaced', 'rotated'],
      held: ['beside source', 'inside source'],
      derived: 6,
      identifiers: 3,
      residuals: ['RS1:Q1', 'RS2:Q2', 'RS3:Q3', 'RS4:Q4', 'RS5:Q5'],
      onLanding: 2,
    });
  });

  it('Z: every pin ran once, in row order, against its witness', () => {
    expect(reached).toStrictEqual(ROWS.flatMap(row => row.pins));
    expect(RESIDUALS.map(item => item.quiet)).toStrictEqual(ROWS.find(row => row.id === 'Q')?.pins);
  });
});
