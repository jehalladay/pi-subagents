/** wb-tz2.4 (HX-ORIGINAL-GOALS-CLOSURE-R4), STANDING leg only. The statement: "When a GC-D03/ADR amendment adds a not-applicable
 * value to hyperunix.result and to the SDK Completeness type (today exactly complete|incomplete|unknown, vendored
 * dist/result.d.ts:25@9df9a03; 07-epistemic:23@6ed14cab8d), the adapter shall give it its own reading — distinct from partial,
 * unknown and absence — never collapsed silently into an existing verdict." The acceptance row pinned here: "Standing: the
 * closed-set discipline holds — an unregistered execution kind is refused (hyperunix-observer.ts:135-136@9df9a03; fixture :346),
 * so new vocabulary cannot silently read as a known verdict."
 *
 * The on-landing row ("an adapter unit test drives a not-applicable result and asserts a distinct projection that is NOT
 * complete, NOT known-empty, and does not license absence without the runtime licence; a second test proves pre-existing values
 * still project byte-identically") waits on that external amendment and is not built here: src/workbench/hyperunix-observer.ts
 * has no not-applicable reading, and by its landed design (test/workbench-hyperunix-observer.test.ts 'H5: tolerates unknown
 * producer fields' and 'R1 Acceptance 4') decides coverage from execution_status.kind and coverage_summary.licenses_absence only,
 * never from coverage_summary.completeness. Until the amendment lands, every place the new word could enter is held:
 *   T1 the trigger: the vendored SDK's Completeness is exactly complete|incomplete|unknown (type level, gate-enforced by
 *      typecheck:test, and in the shipped declaration) and CoverageSummary.completeness is Completeness | null, so vendoring an
 *      amended SDK fails here before the word can reach the adapter as a field nothing reads;
 *   T2 the live decoder: a result-coverage or answer-coverage frame carrying the word fails the whole stream as
 *      SDK_PROTOCOL_INCOMPATIBLE at body.completeness (the SDK's own closed set), so a read never becomes a result at all;
 *   K1 as an execution kind the word is outside the adapter's closed kind set: refused before anything is projected, under either
 *      licence, and the live invariant's execution-kind clause breaks;
 *   K2 through the representation decoder (resultFromJson, then resultToJson, as the provider serializes) such a kind rebuilds as
 *      protocol-failed, which the adapter keeps a failure that never licenses absence;
 *   C1 as a completeness value the representation decoder keeps none of the spellings (each rebuilds as null), so the provider
 *      output is byte-identical to its null twin;
 *   C2 a reading that carries the word past the decoder never reads complete, success or known-empty and never licenses absence
 *      without the runtime licence (nor on a kind that is not complete), and a mutation outcome stays refused;
 *   C3 the pre-existing values (complete, incomplete, unknown, null) project byte-identically to the completeness-free reading
 *      for every kind and licence: the baseline the on-landing row must keep.
 * T1, T2 and C1 state the vendored SDK 0.1.0 and move with an amended SDK (each names this bead's on-landing leg); K1, K2, C2 and C3
 * hold before and after it. Pure: no HX binary, scratch directory, clock, network or file write; the one read is the installed
 * SDK declaration. */
import {readFileSync} from 'node:fs';
import {
  type Completeness, type CoverageSummary, coverageSummaryOf, decodeResultStream, ProtocolError, resultFromJson, resultToJson,
} from '@hyperunix/sdk';
import {describe, expect, expectTypeOf, it} from 'vitest';
import {CapabilityError, type JsonValue} from '../src/workbench/capability-registry.js';
import {HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology} from '../src/workbench/hyperunix-observer.js';

type Json = {[key: string]: JsonValue};
/** The runtime identity of the measured live read (test/workbench-hyperunix-observer.test.ts BINARY). */
const BINARY = '3501da39d77f559548590e59d3fe0ed3b742285520f3bd854c95f977a754fc9d';
const WS = '/srv/hx-not-applicable-ws';
const context: HyperUnixTopologyContext = {scope: {workspace: WS, principal: 'local-operator:tester'},
  target: {kind: 'hx.fs/regular-file', root: 'src'}, capturedAt: '2026-10-15T08:40:00Z', observedAt: '2026-10-15T08:40:01Z'};
/** Spellings a not-applicable value could take: the bead's own, the SDK's snake_case value style (TerminalStatus
 * established_empty, Truth known_absent), its camelCase field style, and the one-word form of the present Completeness values.
 * None is SDK 0.1.0 vocabulary. */
const NOT_APPLICABLE = ['not-applicable', 'not_applicable', 'notApplicable', 'inapplicable'] as const;
/** Every value CoverageSummary.completeness takes under the vendored SDK. */
const PRE_EXISTING: readonly (Completeness | null)[] = ['complete', 'incomplete', 'unknown', null];
const MUTATION_KINDS: ReadonlySet<string> = new Set(['mutation-rejected', 'mutation-partial']);
/** The adapter's read kinds (its closed tuple, pinned to the SDK ExecutionStatusKind by the observer suite) and the two whose
 * reading is complete (hyperunix-observer.ts READING). */
const READ_KINDS = HYPERUNIX_EXECUTION_KINDS.filter(kind => !MUTATION_KINDS.has(kind));
const COMPLETE_KINDS: ReadonlySet<string> = new Set(['complete', 'complete-empty']);
const LICENCES = [true, false] as const;
const KIND_REFUSAL = 'HyperUnix topology refused: source.execution_status.kind is not a vendored SDK ExecutionStatusKind.';
const TRIGGER = 'wb-tz2.4 trigger: the vendored @hyperunix/sdk Completeness vocabulary moved; give a not-applicable value its own '
  + 'adapter reading (the on-landing leg) before re-pinning this';

/** The provider output shape of the measured live read (test/workbench-hyperunix-observer.test.ts measured()), with the
 * execution kind, the runtime licence and any further coverage_summary members set. */
function reading(kind: string, licensed: boolean, summary: Json = {}): Json {
  return {contract: 'hyperunix.find/v1',
    source: {representation: 'hyperunix.result/1', execution_status: {kind}, coverage_summary: {licenses_absence: licensed, ...summary},
      rows: [], rows_retained: true, operation: 'find'},
    workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}};
}
/** A hyperunix.result/1 document in the SDK's own representation, with the kind, licence and completeness set. */
function sdkDocument(kind: string, licensed: boolean, completeness: JsonValue): Json {
  return {representation: 'hyperunix.result/1', operation: 'find', rows: [], rows_retained: true, coverage: [],
    status: {exit_code: 0, signal: null, streams: [{name: 'hx-fs', frames: 3, ended: true, mode: 'results'}], terminal_reached: true, frames_total: 3},
    execution_status: {kind, diagnostic_code: null}, diagnostics: [], view: null, cost: null,
    transport: {started_at: '2026-10-15T08:39:59.000Z', startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 300, stderr_bytes: 0,
      stderr_bytes_retained: 0, frames: 3},
    workspace_root: WS, terminal: 'complete', truth: null,
    coverage_summary: {modes: [], completeness, licenses_absence: licensed, certificates_license_absence: false, incomplete_regions: [],
      result_coverage: null, answer_count: null},
    evidence: {support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {}},
    digest: null, digest_source: 'absent', execution_id: null, budget_dimension: null, extensions: {}};
}
/** What registerHyperUnixFind returns for a result the representation decoder rebuilt (resultToJson, JSON round trip). */
const providerReading = (document: Json): JsonValue => JSON.parse(JSON.stringify({contract: 'hyperunix.find/v1',
  source: resultToJson(resultFromJson(document)), workspaceRoot: WS, runtime: {version: '0.1.0', binarySha256: BINARY}})) as JsonValue;
/** One HXS stream of three frames: the header, the coverage verdict frame under its mode, and the end frame. */
function verdictStream(frame: 'result-coverage' | 'answer-coverage', completeness: string): string {
  const line = (seq: number, kind: string, body: Json): string => JSON.stringify({hxs: '1.0', stream: 'hx-fs', seq, kind, body});
  const verdict: Json = frame === 'result-coverage' ? {completeness, incomplete_regions: [], certificates: []}
    : {count: {$int: '0'}, ordered: true, completeness, incomplete_regions: [], certificates: []};
  return [line(0, 'header', {mode: frame === 'result-coverage' ? 'results' : 'observation', schema_requirements: []}),
    line(1, frame, verdict), line(2, 'end', {})].join('\n');
}
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected a refusal');
}

describe('wb-tz2.4 standing leg: a not-applicable value cannot silently read as a known verdict', () => {
  it('T1: the vendored SDK Completeness is exactly complete|incomplete|unknown, at type level and in its shipped declaration', () => {
    expectTypeOf<Completeness>().toEqualTypeOf<'complete' | 'incomplete' | 'unknown'>();
    expectTypeOf<CoverageSummary['completeness']>().toEqualTypeOf<Completeness | null>();
    // The tsc-free witness of the same two declarations, read from the installed SDK.
    const declaration = readFileSync(new URL('../node_modules/@hyperunix/sdk/dist/result.d.ts', import.meta.url), 'utf8');
    const completenessLines = declaration.split('\n').filter(text => text.startsWith('export type Completeness ='));
    expect(completenessLines, TRIGGER).toHaveLength(1);
    const declared = [...completenessLines[0].matchAll(/"([^"]+)"/g)].map(match => match[1]);
    expect(declared, TRIGGER).toStrictEqual(['complete', 'incomplete', 'unknown']);
    const start = declaration.indexOf('export interface CoverageSummary {');
    expect(start).toBeGreaterThanOrEqual(0);
    const block = declaration.slice(start, declaration.indexOf('\n}', start));
    expect(block.match(/readonly completeness: [^;]+;/g), TRIGGER).toStrictEqual(['readonly completeness: Completeness | null;']);
  });

  it('T2: the live decoder fails a stream whose coverage verdict carries the word as SDK_PROTOCOL_INCOMPATIBLE, and passes every pre-existing value verbatim', () => {
    let refusals = 0;
    for (const frame of ['result-coverage', 'answer-coverage'] as const) {
      for (const spelling of NOT_APPLICABLE) {
        const error = thrown(() => decodeResultStream(verdictStream(frame, spelling)));
        expect(error, TRIGGER).toBeInstanceOf(ProtocolError);
        expect(error, TRIGGER).toMatchObject({code: 'SDK_PROTOCOL_INCOMPATIBLE', path: 'body.completeness'});
        refusals++;
      }
      // The same stream with each pre-existing value decodes and its verdict reaches the summary as sent: the refusal above is
      // the vocabulary, never a malformed fixture.
      for (const value of ['complete', 'incomplete', 'unknown'] as const) {
        const {checker} = decodeResultStream(verdictStream(frame, value));
        expect(coverageSummaryOf([], checker, 'complete', []).completeness).toBe(value);
      }
    }
    expect(refusals).toBe(2 * NOT_APPLICABLE.length);
  });

  it('K1: every spelling is outside the closed kind set, refused before projecting under either licence, and breaks the execution-kind clause', () => {
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      expect(HYPERUNIX_EXECUTION_KINDS).not.toContain(spelling);
      for (const licensed of LICENCES) {
        const error = thrown(() => hyperunixTopology(reading(spelling, licensed), context));
        expect(error).toBeInstanceOf(CapabilityError);
        expect(error).toMatchObject({category: 'validation', message: KIND_REFUSAL});
        expect(hxLiveInvariant(reading(spelling, licensed))).toStrictEqual({holds: false,
          violations: licensed ? ['execution-kind', 'licence-without-complete-kind'] : ['execution-kind'], absenceLicensed: false,
          versionClass: 'unstamped'});
        cells++;
      }
    }
    expect(cells).toBe(NOT_APPLICABLE.length * LICENCES.length);
  });

  it('K2: through the representation decoder the word as a kind rebuilds as protocol-failed, which stays a failure that never licenses absence', () => {
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      for (const licensed of LICENCES) {
        const rebuilt = providerReading(sdkDocument(spelling, licensed, 'complete'));
        expect(rebuilt).toMatchObject({source: {execution_status: {kind: 'protocol-failed'}, coverage_summary: {licenses_absence: licensed}}});
        expect(hyperunixTopology(rebuilt, context).snapshots[0]).toMatchObject({coverage: 'unknown',
          node: {statusTone: 'failure', statusText: 'protocol-failed'}});
        expect(hxLiveInvariant(rebuilt).absenceLicensed).toBe(false);
        cells++;
      }
    }
    expect(cells).toBe(NOT_APPLICABLE.length * LICENCES.length);
  });

  it('C1: the representation decoder keeps no spelling as a completeness value: each rebuilds as null, byte-identical to its null twin', () => {
    let cells = 0;
    for (const spelling of NOT_APPLICABLE) {
      expect(resultFromJson(sdkDocument('complete', true, spelling)).coverageSummary.completeness, TRIGGER).toBeNull();
      for (const kind of READ_KINDS) {
        for (const licensed of LICENCES) {
          expect(providerReading(sdkDocument(kind, licensed, spelling)), TRIGGER).toStrictEqual(providerReading(sdkDocument(kind, licensed, null)));
          cells++;
        }
      }
    }
    expect(cells).toBe(NOT_APPLICABLE.length * READ_KINDS.length * LICENCES.length);
  });

  it('C2: a reading carrying the word past the decoder never reads complete, success or known-empty and never licenses absence without the runtime licence', () => {
    let projected = 0;
    let refused = 0;
    for (const spelling of NOT_APPLICABLE) {
      for (const kind of HYPERUNIX_EXECUTION_KINDS) {
        for (const licensed of LICENCES) {
          const value = reading(kind, licensed, {completeness: spelling});
          if (MUTATION_KINDS.has(kind)) {
            const error = thrown(() => hyperunixTopology(value, context));
            expect(error).toBeInstanceOf(CapabilityError);
            expect(error).toMatchObject({category: 'validation'});
            expect((error as Error).message).toContain('mutation');
            refused++;
            continue;
          }
          // With the licence on a complete kind the runtime itself licensed absence; every other cell must not read as one.
          if (licensed && COMPLETE_KINDS.has(kind)) continue;
          const [snapshot] = hyperunixTopology(value, context).snapshots;
          expect(snapshot.coverage).not.toBe('complete');
          expect(snapshot.node.statusTone).not.toBe('success');
          expect(snapshot.node.statusText).not.toContain('known-empty');
          expect(hxLiveInvariant(value).absenceLicensed).toBe(false);
          projected++;
        }
      }
    }
    expect(projected).toBe(NOT_APPLICABLE.length * (READ_KINDS.length * LICENCES.length - COMPLETE_KINDS.size));
    expect(refused).toBe(NOT_APPLICABLE.length * MUTATION_KINDS.size * LICENCES.length);
  });

  it('C3: every pre-existing completeness value projects byte-identically to the completeness-free reading, for every kind and licence', () => {
    let cells = 0;
    for (const value of PRE_EXISTING) {
      for (const kind of HYPERUNIX_EXECUTION_KINDS) {
        for (const licensed of LICENCES) {
          const stated = reading(kind, licensed, {completeness: value});
          const bare = reading(kind, licensed);
          expect(hxLiveInvariant(stated)).toStrictEqual(hxLiveInvariant(bare));
          if (MUTATION_KINDS.has(kind)) {
            expect((thrown(() => hyperunixTopology(stated, context)) as Error).message)
              .toBe((thrown(() => hyperunixTopology(bare, context)) as Error).message);
          } else {
            expect(hyperunixTopology(stated, context)).toStrictEqual(hyperunixTopology(bare, context));
          }
          cells++;
        }
      }
    }
    expect(cells).toBe(PRE_EXISTING.length * HYPERUNIX_EXECUTION_KINDS.length * LICENCES.length);
  });
});
