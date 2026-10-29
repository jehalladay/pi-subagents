/** wb-tz2.12 (HX-ORIGINAL-GOALS-CLOSURE-R12), STANDING leg only. The statement: "When a GC-D13 ADR plus an SDK result field carry
 * provider evidence tiers (14-decisions-and-migration.md:19@6ed14cab8d; HXGC-PROV-001 DESIGN requirements.jsonl:22), Pi shall
 * read the tier as a separate axis beside the runtime licence; an empty lower-tier (Contextual/Parsed) answer is never promoted
 * to absence; a result without the field keeps today's projection byte-identical."
 *
 * The bead's one acceptance row is its on-landing leg: "an adapter test surfaces the tier verbatim as its own facet; absence still
 * requires licenses_absence === true on a complete kind regardless of tier (hyperunix-observer.ts:165-170 unchanged); a fixture
 * WITHOUT the field projects today's output byte-identically (toStrictEqual against the pre-landing snapshot)." Its gate is
 * external and unmet, so no tier facet is built here: GC-D13 is a recommendation row ("Source/context/semantic tier explicit and
 * separate from evidence-class tags", 14-decisions:19@6ed14cab8d), HXGC-PROV-001 is DESIGN and not graduated
 * (requirements.jsonl:22@6ed14cab8d), and the vendored @hyperunix/sdk 0.1.0 result carries no tier. What is held before it; each
 * case claims the cells it runs and no more:
 *   T1 the trigger, declared: keyof EvidenceSummary is exactly its five members, and no member of QueryResult, EvidenceSummary,
 *      CoverageSummary, Coverage, ExecutionStatus, TransportTelemetry, ClaimBody or a QueryResult diagnostic has a name holding
 *      "tier" or "Tier" (type level, enforced by typecheck:test); at run time, of the 27 declaration files the SDK ships under dist/, only
 *      dist/provider.d.ts spells the word tier or tiers, five times: its two provider-discovery declarations ("Declarations, never
 *      observations") and three words in their two doc comments; and dist/result.d.ts holds no "tier" substring and an
 *      EvidenceSummary of exactly the five members;
 *   T2 the trigger, decoded: the vendored decoder's closed core bodies, read from its own module (the kinds of its
 *      OBSERVATION_FIELDS table and the four bodies with their own unknown-field refusal: 11), each refuse a tier member under each
 *      of the four TIER_MEMBERS spellings and each of the eleven TIER_VALUES as SDK_PROTOCOL_MALFORMED at body.<member> (native code
 *      HX-PROTOCOL-FRAME-INVALID), its three EMPTY_BODY_KINDS refuse the same members at body, and a frame envelope carrying them
 *      is refused at the member (the decoder's sixth and last unknown-key refusal); a diagnostic frame, an open body, decodes every
 *      one of them (the refusals are the closed-surface checks, not a malformed stream); each decoder evidence status (its
 *      EVIDENCE_STATUSES, read from the module) decodes and becomes exactly that evidence class, and every tier word but "parsed"
 *      is refused as an evidence status (SDK_PROTOCOL_INCOMPATIBLE at body.status, HX-EVIDENCE-STATUS-UNKNOWN): "parsed" is the
 *      one evidence class that is also a tier word, the tag GC-D13 keeps separate from the tier
 *      (10-providers-sdks-and-lx.md:15@6ed14cab8d "Do **not** map this list directly onto the existing evidence-class ordering");
 *   T3 the representation round trip the provider applies (resultFromJson, then resultToJson): over the 23 object nodes of FULL
 *      (a hyperunix.result/1 document the round trip rebuilds unchanged, holding an object at every member resultToJson builds or
 *      clones, and one region inside result_coverage), a tier
 *      member under each spelling and tier word is rebuilt away at the 9 fixed-key nodes (the result, status and its stream,
 *      execution_status, transport, coverage_summary, evidence, the certificate and the diagnostic) and carried verbatim, with
 *      nothing else changed, at the 14 others (CARRIED: the row, the certificate's cause, scope, target and body, the diagnostic's
 *      details, remediation and extra, cost, the incomplete region, result_coverage and its region, the provider-version map, as a
 *      version entry, and the extensions);
 *   T4 the live decode path into Pi: a tier member inside a node-claim's attributes and inside a coverage frame's cause, scope and
 *      target decodes, and assembleQueryResult plus the registered hyperunix.find provider carry it verbatim to rows[0].attributes
 *      and to the certificate's cause, scope and target (also inside its body); nothing else in the provider output differs from
 *      the tier-free twin stream's, and the three readers' outputs equal the twin's. Only those frame members are driven here;
 *      diagnostics reach assembleQueryResult from the transport, not from this decoder path, and are not driven;
 *   R1 today the adapter, the live invariant and nativeEvidence read no tier and no evidence class: over 78 base readings (every
 *      kind x both licences x the weak, strong and full SHAPES, all through the real registration), a tier member at every object
 *      node of the reading's source, under each spelling and tier word, and each of the three evidence-class sets, leave the
 *      projection (or its refusal), the live verdict and the native evidence deep-equal to the tier-free reading's; the nodes
 *      walked are T3's 23 (the full shape holds all of them); no consumed field (HYPERUNIX_CONSUMED_FIELDS) names a tier or the
 *      evidence classes;
 *   A1 the licence axis is separate from the tier: over the same cells, coverage, status tone, status text and the licensed absence
 *      are the tier-free reading's, and a mutation outcome stays refused (the absence lines hyperunix-observer.ts:165-170@9df9a03,
 *      today the `absence` line of hyperunixTopology and the absenceLicensed line of hxLiveInvariant);
 *   A2 a lower-tier answer is never promoted to absence: on every read kind without the runtime licence and on every licensed kind
 *      that is not complete, in each shape (empty in the weak and strong shapes and for complete-empty, one row otherwise), a lower
 *      tier word (the first three tiers, either case) at every object node under each spelling, or the evidence class parsed,
 *      never reads complete coverage, a success tone, known-empty text or a licensed absence, a complete kind reads its
 *      '<kind> · rows <n> · absence not licensed' text with the 'runtime did not license absence' diagnostic, and a licensed
 *      non-complete kind keeps its not-honoured diagnostic; the licensed complete readings of every shape stay successes;
 *   P1 the pre-landing snapshot: four tier-free results through the real hyperunix.find registration project exactly the frozen
 *      topology, live-invariant verdict and native evidence below, the baseline the on-landing toStrictEqual compares against.
 * T1-T4 and R1 assert today's tier-blindness and are re-pinned by the on-landing leg (each failure message names it); A1, A2 and
 * P1 assert only the licence axis and the pre-landing snapshot, which the statement and its acceptance keep unchanged at landing.
 * The SHAPES vary what a reader could condition on: 'weak' (an opportunistic certificate, no completeness, no result_coverage),
 * 'strong' (a complete-within-scope certificate, completeness complete, certificates licensing absence, a complete result_coverage,
 * answer_count 0, terminal established_empty) and 'full' (FULL: a row, a view, a listed provider and its version, a conflict
 * diagnostic, incomplete regions, support ids, evidence classes, derivation handles and an execution id, so the relayed facets and
 * the native references are present).
 * ANCHORS: every loop's cell count is a number literal; PLACEMENTS is the walk of FULL, which the round trip rebuilds unchanged,
 * and R1/A1/A2 walk each base reading itself; the closed bodies, empty-body kinds and evidence statuses are read from the installed
 * decoder module; TIERS (the five proposed tiers as 10-providers-sdks-and-lx.md:9-13@6ed14cab8d spells them) and TIER_MEMBERS
 * have no source in this repository, so the count literals are their only anchor here. LIVENESS: each judgment is one function
 * a control shows can fire: moved() (a changed runtime digest moves every base reading's outputs and axis, and the T4 twin's),
 * departure() (an open body departs from a refusal, a closed one from a decode), uncarried() (the T4 twin carries nothing) and
 * promotion() (the licensed complete readings, and an unlicensed reading judged as licensed, flag each of its seven clauses).
 * Pure: no HX binary, scratch directory, clock, network or file write; the files read are the installed SDK's shipped
 * declarations and its decoder module. */
import {readdirSync, readFileSync} from 'node:fs';
import {isDeepStrictEqual} from 'node:util';
import {
  assembleQueryResult, type ClaimBody, type Coverage, type CoverageSummary, decodeResultStream, type EvidenceSummary, type ExecutionStatus,
  evidenceOf, type ProcessResult, ProtocolError, type QueryResult, resultFromJson, resultToJson, type TransportTelemetry,
} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {
  HYPERUNIX_CONSUMED_FIELDS, HYPERUNIX_EXECUTION_KINDS, type HyperUnixLiveVerdict, type HyperUnixProjectionTopology,
  type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology,
} from '../src/workbench/hyperunix-observer.js';
import {type NativeEvidence, nativeEvidence} from '../src/workbench/native-evidence.js';
import {registerHyperUnixFind} from '../src/workbench/providers/hyperunix.js';

type Json = {[key: string]: JsonValue};
/** A path from a JSON value to one of its object nodes: member names and list indices. */
type Path = readonly (string | number)[];
/** The runtime identity of the measured live read (test/workbench-hyperunix-observer.test.ts BINARY). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const WS = '/srv/hx-evidence-tier-ws';
const SCOPE = {workspace: WS, principal: 'local-operator:tester'};
const context: HyperUnixTopologyContext = {scope: SCOPE, target: {kind: 'hx.fs/regular-file', root: 'src'},
  capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z'};
/** The P1 incomplete row names the invoking workflow node call, so the baseline also pins the grouping edge and the trace. */
const invokedContext: HyperUnixTopologyContext = {...context, invocationId: 'wf_hx_tz2.12',
  operationRef: {provider: 'pi-workflow', type: 'node-call', id: 'wf_hx_tz2.12:0'}};
const CAPABILITY_CONTEXT = {grants: ['hyperunix:read'], signal: new AbortController().signal};
const SDK_DIST = new URL('../node_modules/@hyperunix/sdk/dist/', import.meta.url);
/** The five proposed provider evidence tiers, as 10-providers-sdks-and-lx.md:9-13@6ed14cab8d spells them. */
const TIERS = ['Inventory', 'Parsed', 'Contextual', 'Resolved', 'Complete-within-supported-domain'] as const;
/** Each tier word as written there and in the SDK's lowercase value style. */
const TIER_WORDS: readonly string[] = TIERS.flatMap(tier => [tier, tier.toLowerCase()]);
/** The first three tiers make no compiler-resolved claim: the bead's lower-tier (Contextual/Parsed) answers and Inventory. */
const LOWER_WORDS: readonly string[] = TIERS.slice(0, 3).flatMap(tier => [tier, tier.toLowerCase()]);
/** T2's probe values for a tier member: each tier word, and the list of all of them. */
const TIER_VALUES: readonly JsonValue[] = [...TIER_WORDS, [...TIER_WORDS]];
/** The vendored live decoder's evidence statuses (dist/protocol/decoder.js EVIDENCE_STATUSES, T2 reads it): categories, not a rank. */
const EVIDENCE_STATUSES: readonly string[] = ['observed', 'parsed', 'mechanically-derived', 'inferred', 'heuristic', 'asserted'];
const STATUS_SET: ReadonlySet<string> = new Set(EVIDENCE_STATUSES);
/** Spellings a tier member could take: the bare word, the SDK's snake_case field style, the semantic-tier form and a list. */
const TIER_MEMBERS = ['tier', 'evidence_tier', 'semantic_tier', 'tiers'] as const;
/** Evidence-class sets a reading may carry: every tier word, every SDK evidence status, and the one word that is both. */
const CLASS_SETS: readonly (readonly string[])[] = [TIER_WORDS, EVIDENCE_STATUSES, ['parsed']];
const MUTATION_KINDS: ReadonlySet<string> = new Set(['mutation-rejected', 'mutation-partial']);
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION_KINDS.has(kind));
const COMPLETE_KINDS: ReadonlySet<string> = new Set(['complete', 'complete-empty']);
const LICENCES = [true, false] as const;
const SHAPES = ['weak', 'strong', 'full'] as const;
type Shape = (typeof SHAPES)[number];
/** T3's walk of FULL, in walk order: every object node of the representation, the result itself as '$'. */
const PLACEMENTS: readonly string[] = ['$', 'rows[0]', 'coverage[0]', 'coverage[0].cause', 'coverage[0].scope', 'coverage[0].target',
  'coverage[0].body', 'status', 'status.streams[0]', 'execution_status', 'diagnostics[0]', 'diagnostics[0].details',
  'diagnostics[0].remediation', 'diagnostics[0].extra', 'cost', 'transport', 'coverage_summary', 'coverage_summary.incomplete_regions[0]',
  'coverage_summary.result_coverage', 'coverage_summary.result_coverage.incomplete_regions[0]', 'evidence', 'evidence.provider_versions',
  'extensions'];
/** The placements whose tier member the round trip carries verbatim (T3 measures the partition; the other 9 are rebuilt away). */
const CARRIED: readonly string[] = ['rows[0]', 'coverage[0].cause', 'coverage[0].scope', 'coverage[0].target', 'coverage[0].body',
  'diagnostics[0].details', 'diagnostics[0].remediation', 'diagnostics[0].extra', 'cost', 'coverage_summary.incomplete_regions[0]',
  'coverage_summary.result_coverage', 'coverage_summary.result_coverage.incomplete_regions[0]', 'evidence.provider_versions', 'extensions'];
const TRIGGER = 'wb-tz2.12 trigger: the vendored @hyperunix/sdk result or the adapter now carries a provider evidence tier; build '
  + 'the on-landing leg (the tier verbatim as its own facet, A1/A2/P1 unchanged) before re-pinning this';
const AXIS = 'wb-tz2.12: a provider evidence tier moved the runtime-licence axis';

const json = (value: unknown): JsonValue => JSON.parse(JSON.stringify(value)) as JsonValue;
function asRecord(value: JsonValue | undefined): Json {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected a JSON object');
  return value;
}
function asList(value: JsonValue | undefined): JsonValue[] {
  if (!Array.isArray(value)) throw new Error('expected a JSON list');
  return value;
}
/** Every object node of a JSON value, depth first in member order; a list is walked, never a node itself. */
function objectPaths(value: JsonValue, path: Path = []): Path[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => objectPaths(item, [...path, index]));
  if (value === null || typeof value !== 'object') return [];
  return [path, ...Object.entries(value).flatMap(([key, child]) => objectPaths(child, [...path, key]))];
}
const label = (path: Path): string => path.length === 0 ? '$'
  : path.map((step, index) => typeof step === 'number' ? `[${step}]` : index === 0 ? step : `.${step}`).join('');
/** The object node a path names. */
function nodeAt(value: JsonValue, path: Path): Json {
  let node: JsonValue = value;
  for (const step of path) node = typeof step === 'number' ? asList(node)[step] : asRecord(node)[step];
  return asRecord(node);
}
/** A copy of a document with one member set on the object node a path names. */
function withMember(document: JsonValue, path: Path, member: string, value: JsonValue): JsonValue {
  const copy = json(document);
  nodeAt(copy, path)[member] = value;
  return copy;
}
/** A copy of a provider output with one member set on an object node of its source. */
function tieredReading(reading: JsonValue, path: Path, member: string, tier: string): JsonValue {
  const copy = json(reading);
  nodeAt(asRecord(copy).source, path)[member] = tier;
  return copy;
}
/** A copy of a provider output whose evidence summary lists the given evidence classes. */
function classedReading(reading: JsonValue, classes: readonly string[]): JsonValue {
  const copy = asRecord(json(reading));
  asRecord(asRecord(copy.source).evidence).evidence_classes = [...classes];
  return copy;
}
/** The comparator control: the same provider output under a runtime digest the readers refuse. */
function undigested(reading: JsonValue): JsonValue {
  const copy = asRecord(json(reading));
  return {...copy, runtime: {...asRecord(copy.runtime), binarySha256: 'not-a-digest'}};
}
const sourceOf = (reading: JsonValue): JsonValue => asRecord(reading).source;

/** One coverage certificate in the SDK's JSON representation, shaped as the measured live read certified its batches. */
const certificate = (batch_id: string, mode: string): Json => ({mode, cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode}});
/** One producer diagnostic in the SDK's JSON representation (its details, remediation and extra are T3 placements). */
const diagnostic = (code: string): Json => ({code, severity: 'warning', message: 'coverage note', details: {}, remediation: {},
  request: null, origin: 'hxs', stream: null, extra: {}});
const REGION: Json = {target: 'relation-expansion', scope: 'fs-subtree'};
const STATUS: Json = {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'observation'}],
  terminal_reached: true, frames_total: 3};
const TRANSPORT: Json = {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 300,
  stderr_bytes: 0, stderr_bytes_retained: 0, frames: 3};
/** A hyperunix.result/1 document with no rows, certificate, view, listed provider, diagnostic, incomplete region or tier. */
function sdkDocument(overrides: Json = {}): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [], status: STATUS,
    execution_status: {kind: 'incomplete', diagnostic_code: null}, diagnostics: [], view: null, cost: null, transport: TRANSPORT,
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: [], completeness: null, licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: null},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides};
}
/** Every object member the representation emits, each holding an object (T3 walks it; the full shape is it, per kind and licence). */
const FULL: Json = {representation: 'hyperunix.result/1', operation: 'find', rows: [{path: 'src/index.ts'}], rows_retained: true,
  coverage: [certificate('b1', 'opportunistic')], status: STATUS,
  execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'}, diagnostics: [diagnostic('HX-SCHEMA-CONFLICT')],
  view: 'view-1', cost: {wall_ms: 1}, transport: TRANSPORT, workspace_root: WS, terminal: 'partial', truth: null,
  coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
    incomplete_regions: [REGION], result_coverage: {completeness: 'incomplete', incomplete_regions: [REGION], certificates: ['b1']},
    answer_count: 1},
  evidence: {support_ids: ['hx-fs/b1/s1'], evidence_classes: ['observed'], derivation_handles: ['hx-fs/b1/s1/dependency[0]:file:c3Jj'],
    providers: ['hx.fs/builtin'], provider_versions: {'hx.fs/builtin': '0.1.0'}},
  digest: null, digest_source: 'absent', local_digest: null, structural_digest: null, execution_id: 'hx-exec-tz2.12', budget_dimension: null,
  extensions: {}};
/** One base reading's document: one kind under one licence in one shape (the SHAPES note in the header). */
function baseDocument(kind: string, licensed: boolean, shape: Shape): Json {
  switch (shape) {
    case 'weak':
      return sdkDocument({execution_status: {kind, diagnostic_code: null}, coverage: [certificate('b1', 'opportunistic')],
        diagnostics: [diagnostic('HX-COVERAGE-INCOMPLETE')], cost: {wall_ms: 1},
        coverage_summary: {modes: ['opportunistic'], completeness: null, licenses_absence: licensed, certificates_license_absence: false,
          incomplete_regions: [], result_coverage: null, answer_count: null}});
    case 'strong':
      return sdkDocument({execution_status: {kind, diagnostic_code: null}, terminal: 'established_empty',
        coverage: [certificate('b1', 'complete-within-scope')], diagnostics: [diagnostic('HX-COVERAGE-INCOMPLETE')], cost: {wall_ms: 1},
        coverage_summary: {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: licensed,
          certificates_license_absence: true, incomplete_regions: [], result_coverage: {completeness: 'complete', incomplete_regions: [],
            certificates: ['b1']}, answer_count: 0}});
    case 'full': {
      const document = asRecord(json(FULL));
      document.execution_status = {kind, diagnostic_code: 'HX-COVERAGE-INCOMPLETE'};
      asRecord(document.coverage_summary).licenses_absence = licensed;
      // The SDK reads complete-empty only for zero node-claims, and the adapter refuses rows beside it.
      if (kind === 'complete-empty') document.rows = [];
      return document;
    }
  }
}
/** What the registered hyperunix.find capability returns for a result: the real registration, invoked through the registry. */
async function providedResult(native: QueryResult<ClaimBody>): Promise<JsonValue> {
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, CAPABILITY_CONTEXT);
}
const provided = (document: Json): Promise<JsonValue> => providedResult(resultFromJson(document));
interface Base {
  readonly name: string;
  readonly kind: string;
  readonly licensed: boolean;
  readonly shape: Shape;
  readonly reading: JsonValue;
}
/** The 78 base readings R1 and A1 vary: every kind under both licences in each shape. */
async function baseReadings(kinds: readonly string[]): Promise<Base[]> {
  const bases: Base[] = [];
  for (const kind of kinds) {
    for (const licensed of LICENCES) {
      for (const shape of SHAPES) {
        bases.push({name: `${kind} ${licensed ? 'licensed' : 'unlicensed'} ${shape}`, kind, licensed, shape,
          reading: await provided(baseDocument(kind, licensed, shape))});
      }
    }
  }
  return bases;
}

function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  return undefined;
}
/** Everything the three readers make of one reading: the projection (or its refusal), the live verdict and the native evidence. */
interface Outputs {
  readonly projection: HyperUnixProjectionTopology | {readonly refused: string};
  readonly verdict: HyperUnixLiveVerdict;
  readonly native: NativeEvidence;
}
function outputsOf(reading: JsonValue): Outputs {
  let projection: Outputs['projection'];
  try { projection = hyperunixTopology(reading, context); } catch (error) { projection = {refused: (error as Error).message}; }
  return {projection, verdict: hxLiveInvariant(reading), native: nativeEvidence('hyperunix.find', reading)};
}
/** The licence axis of one reading (hyperunix-observer.ts:165-170@9df9a03): coverage, tone, status text and the licensed absence,
 * or the refusal of a mutation outcome. */
interface Axis {
  readonly refused?: string;
  readonly coverage?: string;
  readonly statusTone?: string;
  readonly statusText?: string;
  readonly absenceLicensed: boolean;
}
function axisOf(reading: JsonValue): Axis {
  const {absenceLicensed} = hxLiveInvariant(reading);
  try {
    const [snapshot] = hyperunixTopology(reading, context).snapshots;
    return {coverage: snapshot.coverage, statusTone: snapshot.node.statusTone, statusText: snapshot.node.statusText, absenceLicensed};
  } catch (error) {
    return {refused: (error as Error).message, absenceLicensed};
  }
}
/** Whether a reader's output for a reading differs from a reference output: the one comparison R1, A1 and T4 make, so each
 * control that must move and each cell that must not are judged by the same function. */
const moved = <T>(reader: (reading: JsonValue) => T, reading: JsonValue, reference: T): boolean => !isDeepStrictEqual(reader(reading), reference);
/** Every cell R1 and A1 compare for one base reading: a tier member at each object node of its source under each spelling and
 * tier word, then each evidence-class set. */
function* tierCells(base: Base, words: readonly string[], classSets: readonly (readonly string[])[]): Generator<readonly [string, JsonValue]> {
  for (const path of objectPaths(sourceOf(base.reading))) {
    for (const member of TIER_MEMBERS) {
      for (const tier of words) yield [`${base.name} ${label(path)} ${member}=${tier}`, tieredReading(base.reading, path, member, tier)];
    }
  }
  for (const classes of classSets) yield [`${base.name} classes ${classes.join(',')}`, classedReading(base.reading, classes)];
}

const rowsOf = (reading: JsonValue): number => asList(asRecord(sourceOf(reading)).rows).length;
/** What A2 forbids a reading of one kind, under one licence and with that many rows, to read: each clause by name, none when
 * the answer stays unpromoted (partial or unknown coverage, no success, no known-empty text, no licensed absence, a complete kind's
 * unlicensed text and diagnostic, and a licensed non-complete kind's not-honoured diagnostic). */
function promotion(value: JsonValue, kind: string, licensed: boolean, rows: number): string[] {
  const topology = hyperunixTopology(value, context);
  const [snapshot] = topology.snapshots;
  const complete = COMPLETE_KINDS.has(kind);
  const clauses: readonly (readonly [boolean, string])[] = [
    [snapshot.coverage === 'complete', 'complete coverage'],
    [snapshot.node.statusTone === 'success', 'a success tone'],
    [snapshot.node.statusText.includes('known-empty'), 'known-empty text'],
    [hxLiveInvariant(value).absenceLicensed, 'a licensed absence'],
    [complete && snapshot.node.statusText !== `${kind} · rows ${rows} · absence not licensed`, 'its unlicensed text'],
    [complete && !topology.diagnostics.includes('runtime did not license absence'), 'its unlicensed diagnostic'],
    [licensed && !complete && !topology.diagnostics
      .includes(`runtime licensed absence on a ${kind} result, which is not honoured: only a complete kind establishes absence`), 'its not-honoured diagnostic'],
  ];
  return clauses.filter(([holds]) => holds).map(([, name]) => name);
}

/** One HXS line on stream hx-fs; an observation payload frame carries its batch id. */
const frameLine = (seq: number, kind: string, body: Json, batch?: string): string =>
  JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq, kind, body, ...(batch === undefined ? {} : {batch_id: batch})});
type FrameSpec = readonly [kind: string, body: Json, batch?: string];
/** HXS text for frames in order, each numbered by its position. */
const streamText = (frames: readonly FrameSpec[]): string => frames.map(([kind, body, batch], seq) => frameLine(seq, kind, body, batch)).join('\n');
const header = (mode: string, extra: Json = {}): FrameSpec => ['header', {mode, schema_requirements: [], ...extra}];
/** An observation stream holding one batch b1: the frames before the one under test, the frame under test, then the batch end. */
const inBatch = (kind: string, body: Json, before: readonly FrameSpec[] = []): string =>
  streamText([header('observation'), ['observation-begin', {}, 'b1'], ...before, [kind, body, 'b1'], ['observation-end', {}, 'b1'], ['end', {}]]);
const SUPPORT: Json = {id: 's1', provider: {$id: 'hx.fs/builtin'}, provider_version: '0.1.0', status: 'observed', view: {$id: 'view-1'}};
const COVERAGE_BODY: Json = {target: {target: 'relation-expansion'}, scope: {scope: 'fs-subtree', path: []}, mode: 'complete-within-scope',
  provider: {$id: 'hx.fs/builtin'}, cause: {cause: 'other', detail: 'No_change_exclusion'}};
const supportStream = (extra: Json): string => inBatch('support', {...SUPPORT, ...extra});
/** A decodable stream for each closed core body and each empty-body kind, the frame of that kind extended by the given members. */
const BODY_STREAMS: Readonly<Record<string, (extra: Json) => string>> = {
  support: supportStream,
  derivation: extra => inBatch('derivation', {id: 'd1', rule: 'r1', inputs: [], ...extra}),
  'node-claim': extra => inBatch('node-claim', {element: 'e1', ...extra}),
  'edge-claim': extra => inBatch('edge-claim', {element: 'x1', ...extra}),
  'kind-claim': extra => inBatch('kind-claim', {element: 'e1', kind: 'k1', ...extra}),
  'attribute-claim': extra => inBatch('attribute-claim', {element: 'e1', attribute: 'a1', value: 'v1', ...extra}),
  coverage: extra => inBatch('coverage', {...COVERAGE_BODY, ...extra}),
  header: extra => streamText([header('observation', extra), ['end', {}]]),
  'result-coverage': extra => streamText([header('results'),
    ['result-coverage', {completeness: 'complete', incomplete_regions: [], certificates: [], ...extra}], ['end', {}]]),
  answer: extra => streamText([header('observation'), ['observation-begin', {}, 'b1'], ['support', SUPPORT, 'b1'],
    ['node-claim', {element: 'e1', supports: ['s1']}, 'b1'], ['observation-end', {}, 'b1'],
    ['answer', {ref: {$int: '3'}, supports: [{$int: '2'}], ...extra}],
    ['answer-coverage', {count: {$int: '1'}, ordered: false, completeness: 'complete', incomplete_regions: [], certificates: []}], ['end', {}]]),
  'answer-coverage': extra => streamText([header('observation'),
    ['answer-coverage', {count: {$int: '0'}, ordered: true, completeness: 'complete', incomplete_regions: [], certificates: [], ...extra}],
    ['end', {}]]),
  end: extra => streamText([header('observation'), ['end', extra]]),
  'observation-begin': extra => streamText([header('observation'), ['observation-begin', extra, 'b1'], ['observation-end', {}, 'b1'], ['end', {}]]),
  'observation-end': extra => streamText([header('observation'), ['observation-begin', {}, 'b1'], ['observation-end', extra, 'b1'], ['end', {}]]),
};
/** A header frame whose envelope, rather than its body, carries the given members. */
const envelopeStream = (extra: Json): string =>
  [JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq: 0, kind: 'header', body: {mode: 'observation', schema_requirements: []}, ...extra}),
    frameLine(1, 'end', {})].join('\n');
/** An open body: a diagnostic frame on the same observation stream. */
const diagnosticStream = (extra: Json): string => streamText([header('observation'), ['diagnostic', {code: 'HX-NOTE', ...extra}], ['end', {}]]);
/** The names a decoder table spells, read from the installed decoder module's source text. */
function decoderTables(): {closed: string[]; empty: string[]; statuses: string[]} {
  const text = readFileSync(new URL('protocol/decoder.js', SDK_DIST), 'utf8');
  const quoted = (list: string): string[] => [...list.matchAll(/'([^']+)'|"([^"]+)"/g)].map(match => match[1] ?? match[2]);
  const start = text.indexOf('const OBSERVATION_FIELDS = Object.freeze({');
  const fields = start < 0 ? '' : text.slice(start, text.indexOf('});', start));
  const observation = [...fields.matchAll(/^ {4}'?([a-z-]+)'?: \[/gm)].map(match => match[1]);
  const named = [...text.matchAll(/this\.fail\("SDK_PROTOCOL_MALFORMED", `([a-z-]+): unknown field/g)].map(match => match[1]);
  const setOf = (name: string): string[] => quoted(text.match(new RegExp(`const ${name} = new Set\\(\\[([^\\]]*)\\]\\);`))?.[1] ?? '');
  return {closed: [...observation, ...named], empty: setOf('EMPTY_BODY_KINDS'), statuses: setOf('EVIDENCE_STATUSES')};
}
/** A stream's decode outcome: 'decoded', or the refusal's code, path and native code. */
function decodeOutcome(text: string): string {
  const error = thrown(() => decodeResultStream(text));
  if (error === undefined) return 'decoded';
  return error instanceof ProtocolError ? `${error.code} ${error.path ?? ''} ${error.nativeCode ?? ''}` : `not a ProtocolError: ${String(error)}`;
}
/** How a stream's decoding departs from the expected outcome: nothing when it matches, else what happened. T2 judges every
 * plain frame, tier member, open body and evidence status through it. */
function departure(text: string, expected: string): string | undefined {
  const outcome = decodeOutcome(text);
  return outcome === expected ? undefined : `${outcome}, expected ${expected}`;
}
const FRAME_INVALID = 'HX-PROTOCOL-FRAME-INVALID';

/** The live path T4 drives: an observation stream with one support, one node-claim and one coverage frame, decoded, assembled
 * by the SDK and returned by the registered provider; a tier member, when given, sits in the claim's attributes and in the
 * coverage frame's cause, scope and target. */
async function liveReading(member?: string, tier?: string): Promise<JsonValue> {
  const extra: Json = member === undefined || tier === undefined ? {} : {[member]: tier};
  const text = streamText([header('observation'), ['observation-begin', {}, 'b1'], ['support', SUPPORT, 'b1'],
    ['node-claim', {element: 'e1', attributes: {...extra}, supports: ['s1']}, 'b1'],
    ['coverage', {...COVERAGE_BODY, target: {target: 'relation-expansion', ...extra}, scope: {scope: 'fs-subtree', path: [], ...extra},
      cause: {cause: 'other', detail: 'No_change_exclusion', ...extra}}, 'b1'], ['observation-end', {}, 'b1'], ['end', {}]]);
  const {frames} = decodeResultStream(text);
  // The transport's own readings are fixed, so the tiered stream and its twin differ in their frames alone.
  const transport: TransportTelemetry = {startedAt: '2026-10-15T08:39:59.000Z', durationMs: 200, startupLatencyMs: 10, processDurationMs: 200,
    stdoutBytes: 300, stderrBytes: 0, stderrBytesRetained: 0, frames: frames.length};
  const process: ProcessResult = {argv: [], cwd: WS, exitCode: 0, signal: null, frames, diagnostics: [], stderrProse: [], transport,
    streams: [], terminalReached: true, stdout: text, stdoutUnstructuredBytesTotal: 0, stdoutUnstructured: new Uint8Array(), stderr: ''};
  return providedResult(assembleQueryResult('find', process, WS));
}
/** The provider-output nodes T4 places a tier member in: the row's attributes and the certificate's cause, scope and target,
 * which the certificate also carries inside its body. */
const LIVE_NODES: readonly Path[] = [['rows', 0, 'attributes'], ['coverage', 0, 'cause'], ['coverage', 0, 'scope'], ['coverage', 0, 'target'],
  ['coverage', 0, 'body', 'cause'], ['coverage', 0, 'body', 'scope'], ['coverage', 0, 'body', 'target']];

/** The LIVE_NODES of a provider output's source that do not carry the member at that value, by label. */
const uncarried = (source: JsonValue, member: string, tier: string): string[] =>
  LIVE_NODES.filter(path => nodeAt(source, path)[member] !== tier).map(label);

/** Members of an SDK result type whose name carries a tier. */
type TierMember<T> = Extract<keyof T, `${string}${'tier' | 'Tier'}${string}`>;

/** The pre-landing snapshot (P1): four tier-free results, the context each is read in, and exactly what today's adapter, live
 * invariant and nativeEvidence make of them through the real registration. */
interface BaselineRow {
  readonly name: string;
  readonly document: Json;
  readonly context: HyperUnixTopologyContext;
  readonly topology: HyperUnixProjectionTopology;
  readonly verdict: HyperUnixLiveVerdict;
  readonly native: NativeEvidence;
}
const LICENSED_SUMMARY: Json = {modes: ['complete-within-scope'], completeness: 'complete', licenses_absence: true,
  certificates_license_absence: true, incomplete_regions: [], result_coverage: null, answer_count: 0};
const BASELINE: readonly BaselineRow[] = [
  {name: 'runtime-licensed complete-empty',
    document: sdkDocument({execution_status: {kind: 'complete-empty', diagnostic_code: null}, coverage: [certificate('b1', 'complete-within-scope')],
      coverage_summary: LICENSED_SUMMARY}),
    context,
    topology: {snapshots: [{source: {provider: 'hyperunix', type: 'query', id: '4dced6e6b7cbe0945847ca74bb68a746ac2ff2b75aca7a8a967c257aee609de6', scope: WS},
      scope: {workspace: WS, principal: 'local-operator:tester'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z',
      coverage: 'complete', node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation', statusText: 'known-empty (runtime-licensed) · rows 0',
        statusTone: 'success'}, kind: 'hyperunix.query.snapshot', sourceVersion: '0.1.0', evidenceRefs: [`hx-binary:sha256:${BINARY}`, 'hx-coverage:b1']}],
    relations: [],
    diagnostics: ['query id is a derived digest, not a native identifier: HX find hx.fs/regular-file src', 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: true, versionClass: 'unstamped'},
    native: {provider: 'hyperunix', domainStatus: 'complete-empty'}},
  {name: 'complete-empty without the licence',
    document: sdkDocument({execution_status: {kind: 'complete-empty', diagnostic_code: null}, coverage: [certificate('b1', 'complete-within-scope')],
      coverage_summary: {...LICENSED_SUMMARY, licenses_absence: false}}),
    context,
    topology: {snapshots: [{source: {provider: 'hyperunix', type: 'query', id: '4dced6e6b7cbe0945847ca74bb68a746ac2ff2b75aca7a8a967c257aee609de6', scope: WS},
      scope: {workspace: WS, principal: 'local-operator:tester'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z',
      coverage: 'partial', node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation', statusText: 'complete-empty · rows 0 · absence not licensed',
        statusTone: 'unknown'}, kind: 'hyperunix.query.snapshot', sourceVersion: '0.1.0', evidenceRefs: [`hx-binary:sha256:${BINARY}`, 'hx-coverage:b1']}],
    relations: [],
    diagnostics: ['query id is a derived digest, not a native identifier: HX find hx.fs/regular-file src', 'no native interval supplied',
      'runtime did not license absence']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'},
    native: {provider: 'hyperunix', domainStatus: 'complete-empty'}},
  {name: 'incomplete read with proof handles, named by its invoking node call',
    document: sdkDocument({execution_status: {kind: 'incomplete', diagnostic_code: 'HX-COVERAGE-INCOMPLETE'}, rows: [{path: 'src/index.ts'}],
      coverage: [certificate('b1', 'opportunistic'), certificate('b2', 'opportunistic')], execution_id: 'hx-exec-tz2.12',
      coverage_summary: {modes: ['opportunistic'], completeness: 'incomplete', licenses_absence: false, certificates_license_absence: false,
        incomplete_regions: [], result_coverage: null, answer_count: 1},
      evidence: {support_ids: ['hx-fs/b1/s1'], evidence_classes: ['observed'], derivation_handles: ['hx-fs/b1/s1/dependency[0]:file:c3Jj'],
        providers: [], provider_versions: {}}}),
    context: invokedContext,
    topology: {snapshots: [{source: {provider: 'hyperunix', type: 'query', id: '360a76810bc79e341059e7e464d5e6308caa8719e6de2dd49d4299060de6e0ad', scope: WS},
      scope: {workspace: WS, principal: 'local-operator:tester'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z',
      coverage: 'partial', node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation', statusText: 'incomplete · rows 1 · absence not licensed',
        statusTone: 'unknown'}, kind: 'hyperunix.query.snapshot', sourceVersion: '0.1.0',
      evidenceRefs: [`hx-binary:sha256:${BINARY}`, 'hx-coverage:b1', 'hx-coverage:b2'], trace: {invocationId: 'wf_hx_tz2.12'}}],
    relations: [{scope: {workspace: WS, principal: 'local-operator:tester'}, from: {provider: 'pi-workflow', type: 'node-call', id: 'wf_hx_tz2.12:0'},
      to: {provider: 'hyperunix', type: 'query', id: '360a76810bc79e341059e7e464d5e6308caa8719e6de2dd49d4299060de6e0ad', scope: WS}, kind: 'grouping',
      provenance: {source: 'hyperunix', observedAt: '2026-10-15T08:40:01Z'}}],
    diagnostics: ['query id is a derived digest, not a native identifier: HX find hx.fs/regular-file src', 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'},
    native: {provider: 'hyperunix', nativeId: 'hx-exec-tz2.12', domainStatus: 'incomplete',
      evidenceRefs: ['hx-fs/b1/s1', 'hx-fs/b1/s1/dependency[0]:file:c3Jj']}},
  {name: 'provider-failed',
    document: sdkDocument({execution_status: {kind: 'provider-failed', diagnostic_code: 'HX-PROVIDER-FAILED'}}),
    context,
    topology: {snapshots: [{source: {provider: 'hyperunix', type: 'query', id: '01cd58f0040fc27b452ca0c1d5ae4dbb48afeead07dcc8bcb106dc513284b34e', scope: WS},
      scope: {workspace: WS, principal: 'local-operator:tester'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z',
      coverage: 'unknown', node: {title: 'HX find hx.fs/regular-file src', type: 'sdk-operation', statusText: 'provider-failed', statusTone: 'failure'},
      kind: 'hyperunix.query.snapshot', sourceVersion: '0.1.0', evidenceRefs: [`hx-binary:sha256:${BINARY}`]}],
    relations: [],
    diagnostics: ['query id is a derived digest, not a native identifier: HX find hx.fs/regular-file src', 'no native interval supplied']},
    verdict: {holds: true, violations: [], absenceLicensed: false, versionClass: 'unstamped'},
    native: {provider: 'hyperunix', domainStatus: 'provider-failed'}},
];

describe('wb-tz2.12 standing leg: a provider evidence tier is held off the runtime licence until GC-D13 ships it', () => {
  it('T1: no SDK result type has a tier member and EvidenceSummary is exactly its five members; of the 27 shipped declaration files only provider.d.ts spells tier, in its two provider-discovery declarations', () => {
    expectTypeOf<keyof EvidenceSummary>().toEqualTypeOf<'supportIds' | 'evidenceClasses' | 'derivationHandles' | 'providers' | 'providerVersions'>();
    expectTypeOf<TierMember<QueryResult>>().toBeNever();
    expectTypeOf<TierMember<EvidenceSummary>>().toBeNever();
    expectTypeOf<TierMember<CoverageSummary>>().toBeNever();
    expectTypeOf<TierMember<Coverage>>().toBeNever();
    expectTypeOf<TierMember<ExecutionStatus>>().toBeNever();
    expectTypeOf<TierMember<TransportTelemetry>>().toBeNever();
    expectTypeOf<TierMember<ClaimBody>>().toBeNever();
    expectTypeOf<TierMember<QueryResult['diagnostics'][number]>>().toBeNever();
    // The tsc-free witness, read from every declaration file the installed SDK ships ("frontier" holds the letters, never the word).
    const declarations = readdirSync(SDK_DIST, {recursive: true, encoding: 'utf8'}).filter(name => name.endsWith('.d.ts')).sort();
    expect(declarations.length, TRIGGER).toBe(27);
    const read = (name: string): string => readFileSync(new URL(name, SDK_DIST), 'utf8');
    expect(declarations.filter(name => /\btiers?\b/i.test(read(name))), TRIGGER).toStrictEqual(['provider.d.ts']);
    const discovery = read('provider.d.ts');
    expect(discovery.match(/\btiers?\b/gi), TRIGGER).toStrictEqual(['tiers', 'tiers', 'tiers', 'tier', 'tier']);
    expect(discovery.match(/readonly tiers?: [^;]+;/g), TRIGGER).toStrictEqual(['readonly tiers: readonly string[];', 'readonly tier: string;']);
    expect(discovery, TRIGGER).toContain('Declarations, never observations');
    const declaration = read('result.d.ts');
    expect(declaration.match(/tier/gi), TRIGGER).toBeNull();
    const start = declaration.indexOf('export interface EvidenceSummary {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = declaration.slice(start, declaration.indexOf('\n}', start));
    expect([...block.matchAll(/readonly (\w+):/g)].map(match => match[1]), TRIGGER)
      .toStrictEqual(['supportIds', 'evidenceClasses', 'derivationHandles', 'providers', 'providerVersions']);
  });

  it('T2: each of the decoder\'s 11 closed core bodies refuses a tier member under every spelling and probe value at body.<member>, its 3 empty-body kinds refuse it at body and the frame envelope at the member, an open diagnostic body decodes it, and no tier word but parsed is an evidence status', () => {
    const tables = decoderTables();
    expect(tables.closed, TRIGGER).toStrictEqual(['support', 'derivation', 'node-claim', 'edge-claim', 'kind-claim', 'attribute-claim', 'coverage',
      'header', 'result-coverage', 'answer', 'answer-coverage']);
    expect(tables.empty, TRIGGER).toStrictEqual(['end', 'observation-begin', 'observation-end']);
    expect(Object.keys(BODY_STREAMS).sort()).toStrictEqual([...tables.closed, ...tables.empty].sort());
    // The judge can fire both ways: an open body departs from a refusal, and a closed one from a decode.
    expect([departure(diagnosticStream({evidence_tier: 'Parsed'}), `SDK_PROTOCOL_MALFORMED body.evidence_tier ${FRAME_INVALID}`),
      departure(supportStream({evidence_tier: 'Parsed'}), 'decoded')]).toStrictEqual([
      `decoded, expected SDK_PROTOCOL_MALFORMED body.evidence_tier ${FRAME_INVALID}`,
      `SDK_PROTOCOL_MALFORMED body.evidence_tier ${FRAME_INVALID}, expected decoded`]);
    const misread: string[] = [];
    let closedRefusals = 0;
    let emptyRefusals = 0;
    for (const [kinds, at] of [[tables.closed, 'member'], [tables.empty, 'body']] as const) {
      for (const kind of kinds) {
        const stream = BODY_STREAMS[kind];
        // The plain frame decodes, so each refusal below is the tier member, never a malformed fixture.
        const plain = departure(stream({}), 'decoded');
        if (plain !== undefined) misread.push(`${kind} plain: ${plain}`);
        for (const member of TIER_MEMBERS) {
          for (const value of TIER_VALUES) {
            const wrong = departure(stream({[member]: value}), `SDK_PROTOCOL_MALFORMED ${at === 'member' ? `body.${member}` : 'body'} ${FRAME_INVALID}`);
            if (wrong !== undefined) misread.push(`${kind} ${member}=${JSON.stringify(value)}: ${wrong}`);
            if (at === 'member') closedRefusals++;
            else emptyRefusals++;
          }
        }
      }
    }
    let envelopeRefusals = 0;
    let openDecodes = 0;
    for (const member of TIER_MEMBERS) {
      for (const value of TIER_VALUES) {
        const envelope = departure(envelopeStream({[member]: value}), `SDK_PROTOCOL_MALFORMED ${member} ${FRAME_INVALID}`);
        if (envelope !== undefined) misread.push(`envelope ${member}=${JSON.stringify(value)}: ${envelope}`);
        envelopeRefusals++;
        const wrong = departure(diagnosticStream({[member]: value}), 'decoded');
        if (wrong !== undefined) misread.push(`diagnostic ${member}=${JSON.stringify(value)}: ${wrong}`);
        openDecodes++;
      }
    }
    expect(misread, TRIGGER).toStrictEqual([]);
    expect([closedRefusals, emptyRefusals, envelopeRefusals, openDecodes]).toStrictEqual([484, 132, 44, 44]);
    // Each evidence status decodes and becomes exactly that evidence class: a category tag, never a tier.
    expect(tables.statuses, TRIGGER).toStrictEqual(EVIDENCE_STATUSES);
    for (const status of EVIDENCE_STATUSES) {
      expect(evidenceOf(decodeResultStream(supportStream({status})).frames).evidenceClasses).toStrictEqual([status]);
    }
    const statusMisread: string[] = [];
    let statusRefusals = 0;
    for (const word of TIER_WORDS) {
      if (STATUS_SET.has(word)) continue;
      const wrong = departure(supportStream({status: word}), 'SDK_PROTOCOL_INCOMPATIBLE body.status HX-EVIDENCE-STATUS-UNKNOWN');
      if (wrong !== undefined) statusMisread.push(`${word}: ${wrong}`);
      statusRefusals++;
    }
    expect(statusMisread, TRIGGER).toStrictEqual([]);
    expect(TIER_WORDS.filter(word => STATUS_SET.has(word)), TRIGGER).toStrictEqual(['parsed']);
    expect(statusRefusals).toBe(9);
  }, 60_000);

  it('T3: over the 23 object nodes of FULL the round trip the provider applies rebuilds a tier member away at the 9 fixed-key nodes and carries it verbatim, nothing else changed, at the 14 CARRIED nodes', () => {
    expect(json(resultToJson(resultFromJson(FULL))), 'FULL is a fixed point of the round trip').toStrictEqual(FULL);
    const paths = objectPaths(FULL);
    expect(paths.map(label)).toStrictEqual(PLACEMENTS);
    const carried: string[] = [];
    const misread: string[] = [];
    let cells = 0;
    for (const path of paths) {
      const outcomes = new Set<string>();
      for (const member of TIER_MEMBERS) {
        for (const tier of TIER_WORDS) {
          const tiered = withMember(FULL, path, member, tier);
          const rebuilt = json(resultToJson(resultFromJson(asRecord(tiered))));
          const outcome = isDeepStrictEqual(rebuilt, tiered) ? 'carried' : isDeepStrictEqual(rebuilt, FULL) ? 'dropped' : 'changed';
          if (outcome === 'changed') misread.push(`${label(path)} ${member}=${tier}: the round trip changed more than the tier member`);
          outcomes.add(outcome);
          cells++;
        }
      }
      if (outcomes.size === 1 && outcomes.has('carried')) carried.push(label(path));
      else if (outcomes.size > 1) misread.push(`${label(path)}: ${[...outcomes].join(' and ')}`);
    }
    expect(misread, TRIGGER).toStrictEqual([]);
    expect(carried, TRIGGER).toStrictEqual(CARRIED);
    expect(cells).toBe(920);
  }, 60_000);

  it('T4: a tier member in a node-claim\'s attributes and in a coverage frame\'s cause, scope and target decodes and reaches the provider output verbatim, changing nothing else and no reader output', async () => {
    const twin = await liveReading();
    const twinSource = sourceOf(twin);
    // The twin is a live read that projects: the readers below compare real outputs, never two refusals.
    expect(hyperunixTopology(twin, context).snapshots[0].node.statusText).toBe('complete · rows 1 · absence not licensed');
    // Each check below can fire: the twin carries the member at none of the nodes, and a changed runtime digest moves its outputs.
    expect(uncarried(twinSource, 'evidence_tier', 'Parsed')).toStrictEqual(LIVE_NODES.map(label));
    expect(moved(outputsOf, undigested(twin), outputsOf(twin))).toBe(true);
    const misread: string[] = [];
    let cells = 0;
    for (const member of TIER_MEMBERS) {
      for (const tier of TIER_WORDS) {
        const tiered = await liveReading(member, tier);
        const source = json(sourceOf(tiered));
        for (const node of uncarried(source, member, tier)) misread.push(`${node} ${member}=${tier}: not carried`);
        if (isDeepStrictEqual(source, twinSource)) misread.push(`${member}=${tier}: the provider output equals its twin before the strip`);
        for (const path of LIVE_NODES) delete nodeAt(source, path)[member];
        if (!isDeepStrictEqual(source, twinSource)) misread.push(`${member}=${tier}: the provider output differs beyond the tier member`);
        if (moved(outputsOf, tiered, outputsOf(twin))) misread.push(`${member}=${tier}: a reader output moved`);
        cells++;
      }
    }
    expect(misread, TRIGGER).toStrictEqual([]);
    expect(cells).toBe(40);
  }, 60_000);

  it('R1: today the adapter, the live invariant and nativeEvidence read no tier and no evidence class: a tier member at every object node of 78 base readings, or an evidence-class set, leaves every output deep-equal; no consumed field names either', async () => {
    const bases = await baseReadings(HYPERUNIX_EXECUTION_KINDS);
    expect(bases.length).toBe(78);
    const misread: string[] = [];
    const walked = new Set<string>();
    let cells = 0;
    for (const base of bases) {
      const bare = outputsOf(base.reading);
      if (!moved(outputsOf, undigested(base.reading), bare)) misread.push(`${base.name}: the comparator control did not move`);
      for (const path of objectPaths(sourceOf(base.reading))) walked.add(label(path));
      for (const [name, value] of tierCells(base, TIER_WORDS, CLASS_SETS)) {
        if (moved(outputsOf, value, bare)) misread.push(name);
        cells++;
      }
    }
    expect(misread, TRIGGER).toStrictEqual([]);
    expect([...walked].sort()).toStrictEqual([...PLACEMENTS].sort());
    // 26 weak x (19 nodes x 4 members x 10 words + 3) + 26 strong x (20 x 40 + 3) + 24 full x (23 x 40 + 3) + 2 complete-empty full x (22 x 40 + 3)
    expect(cells).toBe(64634);
    expect(HYPERUNIX_CONSUMED_FIELDS.filter(field => /tier|evidence_classes/i.test(field.path)), TRIGGER).toStrictEqual([]);
  }, 120_000);

  it('A1: the licence axis is separate from the tier: over the same cells, coverage, tone, status text and licensed absence stay the tier-free reading\'s and a mutation outcome stays refused', async () => {
    const bases = await baseReadings(HYPERUNIX_EXECUTION_KINDS);
    expect(bases.length).toBe(78);
    const misread: string[] = [];
    let cells = 0;
    for (const base of bases) {
      const bare = axisOf(base.reading);
      // A mutation outcome is refused and every read kind projects: the axis compared below is never an empty shape.
      if ((bare.refused !== undefined) !== MUTATION_KINDS.has(base.kind)) misread.push(`${base.name}: refused ${bare.refused ?? 'nothing'}`);
      if (!moved(axisOf, undigested(base.reading), bare)) misread.push(`${base.name}: the comparator control did not move`);
      for (const [name, value] of tierCells(base, TIER_WORDS, CLASS_SETS)) {
        if (moved(axisOf, value, bare)) misread.push(name);
        cells++;
      }
    }
    expect(misread, AXIS).toStrictEqual([]);
    expect(cells).toBe(64634);
  }, 120_000);

  it('A2: a lower-tier answer, empty or with a row, is never promoted to absence without the runtime licence or on a kind that is not complete, while the licensed complete readings stay successes', async () => {
    // The positive controls: absence is reachable in every shape, and the runtime licence on a complete kind is what reaches it;
    // the promotion reader flags each of them, so every clause it checks below can fire.
    const controls = (await baseReadings([...COMPLETE_KINDS])).filter(base => base.licensed);
    const flagged = new Set<string>();
    for (const control of controls) {
      const [snapshot] = hyperunixTopology(control.reading, context).snapshots;
      const rows = rowsOf(control.reading);
      expect(snapshot, control.name).toMatchObject({coverage: 'complete', node: {statusTone: 'success',
        statusText: control.kind === 'complete-empty' ? 'known-empty (runtime-licensed) · rows 0' : `complete · rows ${rows}`}});
      expect(hxLiveInvariant(control.reading).absenceLicensed, control.name).toBe(true);
      for (const reading of promotion(control.reading, control.kind, false, rows)) flagged.add(reading);
    }
    expect(controls.length).toBe(6);
    // The not-honoured clause, read against an unlicensed reading as if it were licensed, is the one a real reading cannot show.
    const unlicensed = (await baseReadings(['incomplete'])).filter(base => !base.licensed);
    for (const base of unlicensed) for (const reading of promotion(base.reading, base.kind, true, rowsOf(base.reading))) flagged.add(reading);
    expect([...flagged].sort()).toStrictEqual(['a licensed absence', 'a success tone', 'complete coverage', 'its not-honoured diagnostic',
      'its unlicensed diagnostic', 'its unlicensed text', 'known-empty text']);
    const bases = (await baseReadings(READ_KINDS)).filter(base => !(base.licensed && COMPLETE_KINDS.has(base.kind)));
    expect(bases.length).toBe(60);
    const promoted: string[] = [];
    let cells = 0;
    for (const base of bases) {
      const rows = rowsOf(base.reading);
      for (const [name, value] of tierCells(base, LOWER_WORDS, [['parsed']])) {
        const wrong = promotion(value, base.kind, base.licensed, rows);
        if (wrong.length > 0) promoted.push(`${name}: ${wrong.join(', ')}`);
        cells++;
      }
    }
    expect(promoted, AXIS).toStrictEqual([]);
    // 20 weak x (19 nodes x 4 members x 6 words + 1) + 20 strong x (20 x 24 + 1) + 19 full x (23 x 24 + 1) + 1 complete-empty full x (22 x 24 + 1)
    expect(cells).toBe(29796);
  }, 120_000);

  it('P1: the pre-landing snapshot: four tier-free results through the real registration project exactly the frozen topology, verdict and native evidence', async () => {
    expect(BASELINE.map(row => row.name)).toStrictEqual(['runtime-licensed complete-empty', 'complete-empty without the licence',
      'incomplete read with proof handles, named by its invoking node call', 'provider-failed']);
    for (const row of BASELINE) {
      const reading = await provided(row.document);
      expect(hyperunixTopology(reading, row.context), row.name).toStrictEqual(row.topology);
      expect(hxLiveInvariant(reading), row.name).toStrictEqual(row.verdict);
      expect(nativeEvidence('hyperunix.find', reading), row.name).toStrictEqual(row.native);
    }
  });
});
