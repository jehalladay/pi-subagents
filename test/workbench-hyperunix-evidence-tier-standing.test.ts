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
 * (requirements.jsonl:22@6ed14cab8d), and the vendored @hyperunix/sdk 0.1.0 result carries no tier. What can be held before it:
 *   T1 the trigger: the SDK result declaration names no tier (QueryResult, EvidenceSummary, CoverageSummary and Coverage at type
 *      level, gate-enforced by typecheck:test, and the shipped dist/result.d.ts text) and EvidenceSummary is exactly its five
 *      members; the SDK's tier words today are provider-discovery declarations (ProviderRelationFact.tiers, ProviderFacts.tier in
 *      dist/provider.d.ts: "Declarations, never observations"), not a result field;
 *   T2 the live decoder fails a stream carrying a tier member in any closed body that carries evidence or coverage (support,
 *      coverage, result-coverage, answer-coverage) as SDK_PROTOCOL_MALFORMED at that member, and refuses every tier word as an
 *      evidence status except "parsed", which it accepts and the SDK files as the evidence class parsed: the evidence-class tag
 *      GC-D13 keeps separate from the tier (10-providers-sdks-and-lx.md:15@6ed14cab8d "Do **not** map this list directly onto
 *      the existing evidence-class ordering");
 *   T3 the representation round trip the provider applies (resultFromJson, resultToJson) drops a tier member at the evidence,
 *      coverage-summary, certificate and result levels, and carries one verbatim only inside a certificate body or the
 *      extensions sidecar;
 *   R1 the adapter, the live invariant and nativeEvidence read no tier and no evidence class today: a tier at any of those six
 *      placements, or tier words and evidence statuses as evidence classes, leave every output byte-identical, and no consumed
 *      field (HYPERUNIX_CONSUMED_FIELDS) names a tier or the evidence classes;
 *   A1 the licence axis is separate from the tier: coverage, status tone, status text and the licensed absence are the tier-free
 *      reading's for every kind, licence, tier word, placement and evidence-class set, and a mutation outcome stays refused (the
 *      absence lines hyperunix-observer.ts:165-170@9df9a03, today :216-221, unchanged);
 *   A2 an empty lower-tier answer is never promoted to absence: on a complete kind without the runtime licence, or on a kind that
 *      is not complete, a 0-row reading carrying a lower tier (or the evidence class parsed) never reads complete, success or
 *      known-empty and licenses nothing, while the licensed complete-empty reading still reads the one known-empty success;
 *   P1 the pre-landing snapshot: four tier-free results through the real hyperunix.find registration project exactly the frozen
 *      topology, live-invariant verdict and native evidence below, the baseline the on-landing toStrictEqual compares against.
 * T1, T2, T3 and R1 state the vendored SDK 0.1.0 and today's adapter and move with the landing (each names this bead's on-landing
 * leg); A1, A2 and P1 hold before and after it. Tier words: the five proposed tiers as 10-providers-sdks-and-lx.md:9-13@6ed14cab8d
 * spells them, each also in the SDK's lowercase value style; the lower tiers are its first three (no compiler-resolved claim), the
 * bead's Contextual and Parsed among them. The baseline fixtures carry no view, listed provider, diagnostic or incomplete region.
 * Pure: no HX binary, scratch directory, clock, network or file write; the only files read are the installed SDK declarations. */
import {readFileSync} from 'node:fs';
import {
  type Coverage, type CoverageSummary, decodeResultStream, type EvidenceSummary, evidenceOf, ProtocolError, type QueryResult,
  resultFromJson, resultToJson,
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
/** The five proposed provider evidence tiers, as 10-providers-sdks-and-lx.md:9-13@6ed14cab8d spells them. */
const TIERS = ['Inventory', 'Parsed', 'Contextual', 'Resolved', 'Complete-within-supported-domain'] as const;
/** Each tier word as written there and in the SDK's lowercase value style. */
const TIER_WORDS: readonly string[] = TIERS.flatMap(tier => [tier, tier.toLowerCase()]);
/** The first three tiers make no compiler-resolved claim: the bead's lower-tier (Contextual/Parsed) answers and Inventory. */
const LOWER_WORDS: readonly string[] = TIERS.slice(0, 3).flatMap(tier => [tier, tier.toLowerCase()]);
/** The vendored live decoder's evidence statuses (dist/protocol/decoder.js EVIDENCE_STATUSES): categories, not a tier rank. */
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
/** Where a tier member could sit in a hyperunix.result/1 source: beside evidence_classes, at the result level, beside the licence,
 * on a certificate, inside a certificate body and in the extensions sidecar (T3: only the last two survive the round trip today). */
const PLACEMENTS = ['evidence', 'result', 'coverage-summary', 'certificate', 'certificate-body', 'extensions'] as const;
type Placement = (typeof PLACEMENTS)[number];
const CARRIED: ReadonlySet<Placement> = new Set<Placement>(['certificate-body', 'extensions']);
const TRIGGER = 'wb-tz2.12 trigger: the vendored @hyperunix/sdk result or the adapter now carries a provider evidence tier; build '
  + 'the on-landing leg (the tier verbatim as its own facet, A1/A2/P1 unchanged) before re-pinning this';

const json = (value: unknown): JsonValue => JSON.parse(JSON.stringify(value)) as JsonValue;
function asRecord(value: JsonValue | undefined): Json {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected a JSON object');
  return value;
}
function firstCertificate(source: Json): Json {
  const coverage = source.coverage;
  if (!Array.isArray(coverage) || coverage.length === 0) throw new Error('the fixture carries no certificate');
  return asRecord(coverage[0]);
}
/** The object of a hyperunix.result/1 source (an SDK document, or a provider output's source) that holds one placement. */
function holder(source: Json, placement: Placement): Json {
  switch (placement) {
    case 'evidence': return asRecord(source.evidence);
    case 'result': return source;
    case 'coverage-summary': return asRecord(source.coverage_summary);
    case 'certificate': return firstCertificate(source);
    case 'certificate-body': return asRecord(firstCertificate(source).body);
    case 'extensions': return asRecord(source.extensions);
  }
}
/** A copy of a source with evidence_tier set at one placement. */
function tieredSource(source: Json, placement: Placement, tier: string): Json {
  const copy = asRecord(json(source));
  holder(copy, placement).evidence_tier = tier;
  return copy;
}
/** A copy of a provider output with the tier placed in its source. */
function tieredReading(reading: JsonValue, placement: Placement, tier: string): JsonValue {
  const copy = asRecord(json(reading));
  return {...copy, source: tieredSource(asRecord(copy.source), placement, tier)};
}
/** A copy of a provider output whose evidence summary lists the given evidence classes. */
function classedReading(reading: JsonValue, classes: readonly string[]): JsonValue {
  const copy = asRecord(json(reading));
  asRecord(asRecord(copy.source).evidence).evidence_classes = [...classes];
  return copy;
}

/** One coverage certificate in the SDK's JSON representation, shaped as the measured live read certified its batches. */
const certificate = (batch_id: string, mode: string): Json => ({mode, cause: {cause: 'other', detail: 'No_change_exclusion'},
  scope: {path: [], scope: 'fs-subtree'}, target: {target: 'relation-expansion'}, provider: 'hx.fs/builtin', stream: 'hx-fs', batch_id,
  body: {mode}});
/** A hyperunix.result/1 document with no rows, certificate, view, listed provider, diagnostic, incomplete region or tier. */
function sdkDocument(overrides: Json = {}): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [],
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'observation'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind: 'incomplete', diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 300, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: [], completeness: null, licenses_absence: false, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: null},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}, ...overrides};
}
/** The 0-row reading of one kind under one licence, with one opportunistic certificate: the cell T3, R1, A1 and A2 vary. */
const cellDocument = (kind: string, licensed: boolean): Json => sdkDocument({execution_status: {kind, diagnostic_code: null},
  coverage: [certificate('b1', 'opportunistic')],
  coverage_summary: {modes: ['opportunistic'], completeness: null, licenses_absence: licensed, certificates_license_absence: false,
    incomplete_regions: [], result_coverage: null, answer_count: null}});
/** What the registered hyperunix.find capability returns for a document: the real registration, invoked through the registry. */
async function provided(document: Json): Promise<JsonValue> {
  const native = resultFromJson(document);
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, {find: async () => native, runtime: async () => ({version: '0.1.0', binarySha256: BINARY}),
    close: async () => {}}, WS);
  return registry.invoke('hyperunix.find', {kind: 'hx.fs/regular-file', root: 'src'}, CAPABILITY_CONTEXT);
}

function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected a refusal');
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

/** One HXS line on stream hx-fs; an observation payload frame carries its batch id. */
const frameLine = (seq: number, kind: string, body: Json, batch?: string): string =>
  JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq, kind, body, ...(batch === undefined ? {} : {batch_id: batch})});
/** The header under its mode, the one frame under test (inside batch b1 when it is an observation payload) and the end frame. */
function streamOf(mode: 'observation' | 'results', kind: string, body: Json, batched: boolean): string {
  const header = frameLine(0, 'header', {mode, schema_requirements: []});
  const rest = batched
    ? [frameLine(1, 'observation-begin', {}, 'b1'), frameLine(2, kind, body, 'b1'), frameLine(3, 'observation-end', {}, 'b1'), frameLine(4, 'end', {})]
    : [frameLine(1, kind, body), frameLine(2, 'end', {})];
  return [header, ...rest].join('\n');
}
const SUPPORT: Json = {id: 's1', provider: {$id: 'hx.fs/builtin'}, provider_version: '0.1.0', status: 'observed', view: {$id: 'view-1'}};
const supportStream = (extra: Json): string => streamOf('observation', 'support', {...SUPPORT, ...extra}, true);
/** The closed core bodies that carry evidence or coverage, each as a decodable stream extended by the given members. */
const CLOSED_BODIES: readonly (readonly [string, (extra: Json) => string])[] = [
  ['support', supportStream],
  ['coverage', extra => streamOf('observation', 'coverage', {target: {target: 'relation-expansion'}, scope: {scope: 'fs-subtree', path: []},
    mode: 'complete-within-scope', provider: {$id: 'hx.fs/builtin'}, cause: {cause: 'other', detail: 'No_change_exclusion'}, ...extra}, true)],
  ['result-coverage', extra => streamOf('results', 'result-coverage', {completeness: 'complete', incomplete_regions: [], certificates: [], ...extra}, false)],
  ['answer-coverage', extra => streamOf('observation', 'answer-coverage', {count: {$int: '0'}, ordered: true, completeness: 'complete',
    incomplete_regions: [], certificates: [], ...extra}, false)],
];

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
  it('T1: the vendored SDK result declaration names no tier and EvidenceSummary is exactly its five members; its tier words are provider-discovery declarations', () => {
    expectTypeOf<keyof EvidenceSummary>().toEqualTypeOf<'supportIds' | 'evidenceClasses' | 'derivationHandles' | 'providers' | 'providerVersions'>();
    expectTypeOf<TierMember<QueryResult>>().toBeNever();
    expectTypeOf<TierMember<EvidenceSummary>>().toBeNever();
    expectTypeOf<TierMember<CoverageSummary>>().toBeNever();
    expectTypeOf<TierMember<Coverage>>().toBeNever();
    // The tsc-free witness of the same declarations, read from the installed SDK.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    expect(declaration.match(/tier/gi), TRIGGER).toBeNull();
    const start = declaration.indexOf('export interface EvidenceSummary {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = declaration.slice(start, declaration.indexOf('\n}', start));
    expect([...block.matchAll(/readonly (\w+):/g)].map(match => match[1]), TRIGGER)
      .toStrictEqual(['supportIds', 'evidenceClasses', 'derivationHandles', 'providers', 'providerVersions']);
    const discovery = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/provider.d.ts', import.meta.url), 'utf8');
    expect(discovery.match(/readonly tiers?: [^;]+;/g), TRIGGER).toStrictEqual(['readonly tiers: readonly string[];', 'readonly tier: string;']);
    expect(discovery, TRIGGER).toContain('Declarations, never observations');
  });

  it('T2: the live decoder fails a tier member in every closed evidence or coverage body, and admits no tier word as an evidence status but parsed, an evidence class', () => {
    let refusals = 0;
    for (const [body, stream] of CLOSED_BODIES) {
      // The plain frame decodes, so each refusal below is the tier member, never a malformed fixture.
      expect(decodeResultStream(stream({})).frames.length, body).toBeGreaterThan(2);
      for (const member of TIER_MEMBERS) {
        const error = thrown(() => decodeResultStream(stream({[member]: 'parsed'})));
        expect(error, `${TRIGGER} (${body} ${member})`).toBeInstanceOf(ProtocolError);
        expect(error, `${TRIGGER} (${body} ${member})`).toMatchObject({code: 'SDK_PROTOCOL_MALFORMED', path: `body.${member}`});
        refusals++;
      }
    }
    expect(refusals).toBe(CLOSED_BODIES.length * TIER_MEMBERS.length);
    // Each evidence status decodes and becomes exactly that evidence class: a category tag, never a tier.
    for (const status of EVIDENCE_STATUSES) {
      expect(evidenceOf(decodeResultStream(supportStream({status})).frames).evidenceClasses).toStrictEqual([status]);
    }
    let statusRefusals = 0;
    for (const word of TIER_WORDS) {
      if (STATUS_SET.has(word)) continue;
      const error = thrown(() => decodeResultStream(supportStream({status: word})));
      expect(error, `${TRIGGER} (status ${word})`).toBeInstanceOf(ProtocolError);
      expect(error, `${TRIGGER} (status ${word})`).toMatchObject({code: 'SDK_PROTOCOL_INCOMPATIBLE', path: 'body.status', nativeCode: 'HX-EVIDENCE-STATUS-UNKNOWN'});
      statusRefusals++;
    }
    expect(TIER_WORDS.filter(word => STATUS_SET.has(word)), TRIGGER).toStrictEqual(['parsed']);
    expect(statusRefusals).toBe(TIER_WORDS.length - 1);
  });

  it('T3: the round trip the provider applies drops a tier member at the evidence, coverage-summary, certificate and result levels, and carries one only in a certificate body or the extensions', () => {
    const document = cellDocument('complete-empty', false);
    const bare = asRecord(json(resultToJson(resultFromJson(document))));
    expect(Object.keys(asRecord(bare.evidence)), TRIGGER).toStrictEqual(['support_ids', 'evidence_classes', 'derivation_handles', 'providers', 'provider_versions']);
    let cells = 0;
    for (const placement of PLACEMENTS) {
      for (const tier of TIER_WORDS) {
        const rebuilt = json(resultToJson(resultFromJson(tieredSource(document, placement, tier))));
        expect(rebuilt, `${TRIGGER} (${placement} ${tier})`).toStrictEqual(CARRIED.has(placement) ? tieredSource(bare, placement, tier) : bare);
        cells++;
      }
    }
    expect(cells).toBe(PLACEMENTS.length * TIER_WORDS.length);
  });

  it('R1: today the adapter, the live invariant and nativeEvidence read no tier and no evidence class, and no consumed field names either', async () => {
    let cells = 0;
    for (const kind of HYPERUNIX_EXECUTION_KINDS) {
      for (const licensed of LICENCES) {
        const reading = await provided(cellDocument(kind, licensed));
        const bare = outputsOf(reading);
        for (const placement of PLACEMENTS) {
          for (const tier of TIER_WORDS) {
            expect(outputsOf(tieredReading(reading, placement, tier)), `${TRIGGER} (${kind} ${licensed} ${placement} ${tier})`).toStrictEqual(bare);
            cells++;
          }
        }
        for (const classes of CLASS_SETS) {
          expect(outputsOf(classedReading(reading, classes)), `${TRIGGER} (${kind} ${licensed} classes ${classes.join(',')})`).toStrictEqual(bare);
          cells++;
        }
      }
    }
    expect(cells).toBe(HYPERUNIX_EXECUTION_KINDS.length * LICENCES.length * (PLACEMENTS.length * TIER_WORDS.length + CLASS_SETS.length));
    expect(HYPERUNIX_CONSUMED_FIELDS.filter(field => /tier|evidence_classes/i.test(field.path)), TRIGGER).toStrictEqual([]);
  });

  it('A1: the licence axis is separate from the tier: coverage, tone, status text and licensed absence stay the tier-free reading\'s for every kind, licence, tier and placement', async () => {
    let cells = 0;
    for (const kind of HYPERUNIX_EXECUTION_KINDS) {
      for (const licensed of LICENCES) {
        const reading = await provided(cellDocument(kind, licensed));
        const bare = axisOf(reading);
        // A mutation outcome is refused and every read kind projects: the axis compared below is never an empty shape.
        expect(bare.refused !== undefined).toBe(MUTATION_KINDS.has(kind));
        for (const placement of PLACEMENTS) {
          for (const tier of TIER_WORDS) {
            expect(axisOf(tieredReading(reading, placement, tier)), `${kind} ${licensed} ${placement} ${tier}`).toStrictEqual(bare);
            cells++;
          }
        }
        for (const classes of CLASS_SETS) {
          expect(axisOf(classedReading(reading, classes)), `${kind} ${licensed} classes ${classes.join(',')}`).toStrictEqual(bare);
          cells++;
        }
      }
    }
    expect(cells).toBe(HYPERUNIX_EXECUTION_KINDS.length * LICENCES.length * (PLACEMENTS.length * TIER_WORDS.length + CLASS_SETS.length));
  });

  it('A2: an empty lower-tier answer is never promoted to absence, while the licensed complete-empty answer stays the one known-empty success', async () => {
    // The positive control: absence is reachable, and the runtime licence on a complete kind is what reaches it.
    const control = await provided(cellDocument('complete-empty', true));
    expect(hyperunixTopology(control, context).snapshots[0]).toMatchObject({coverage: 'complete',
      node: {statusTone: 'success', statusText: 'known-empty (runtime-licensed) · rows 0'}});
    expect(hxLiveInvariant(control).absenceLicensed).toBe(true);
    let cells = 0;
    for (const kind of READ_KINDS) {
      for (const licensed of LICENCES) {
        // With the licence on a complete kind the runtime itself licensed absence; A1 holds those cells to the tier-free reading.
        if (licensed && COMPLETE_KINDS.has(kind)) continue;
        const reading = await provided(cellDocument(kind, licensed));
        const variants = [...PLACEMENTS.flatMap(placement => LOWER_WORDS.map(tier => tieredReading(reading, placement, tier))),
          classedReading(reading, ['parsed'])];
        for (const value of variants) {
          const topology = hyperunixTopology(value, context);
          const [snapshot] = topology.snapshots;
          expect(snapshot.coverage).not.toBe('complete');
          expect(snapshot.node.statusTone).not.toBe('success');
          expect(snapshot.node.statusText).not.toContain('known-empty');
          expect(hxLiveInvariant(value).absenceLicensed).toBe(false);
          if (COMPLETE_KINDS.has(kind)) {
            expect(snapshot.node.statusText).toBe(`${kind} · rows 0 · absence not licensed`);
            expect(topology.diagnostics).toContain('runtime did not license absence');
          }
          if (licensed) {
            expect(topology.diagnostics)
              .toContain(`runtime licensed absence on a ${kind} result, which is not honoured: only a complete kind establishes absence`);
          }
          cells++;
        }
      }
    }
    expect(cells).toBe((READ_KINDS.length * LICENCES.length - COMPLETE_KINDS.size) * (PLACEMENTS.length * LOWER_WORDS.length + 1));
  });

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
