/** wb-6hb.2 (W13/VC-2): the Forge gate.status reader adapter. It consumes exactly what readForgeGateStatus returns
 * (docs/workbench/09 § Reader adapters) and projects read-model snapshots plus display-scope grouping edges.
 * Quotes are from docs/workbench on branch workbench/implementation-program. */
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import type * as ForgeSdk from '@forge/sdk';
import ts from 'typescript';
import {afterAll, describe, expect, expectTypeOf, it, vi} from 'vitest';
import {CapabilityError, CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {type ControlDecision, decideControl} from '../src/workbench/control.js';
import {type ForgeObservedRelation, forgeGateTopology} from '../src/workbench/forge-observer.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import {type NativeRef, ObservationProjection} from '../src/workbench/observation.js';
import {readForgeGateStatus, registerForgeGateStatus, registerNativeForgeGateStatus} from '../src/workbench/providers/forge.js';
import {A, B, basis, DESCRIPTORLESS, described, FRESHNESS_WORDS, MEASURED_BASIS, MEASURED_ROW, MEASURED_STATE, workbenchSource} from './helpers/forge-last-result-state.js';

// Only the native SDK process is replaced by a canned reply; decodeResultEnvelope and every other export stay real.
const sdk = vi.hoisted(() => ({reply: null as unknown, methods: [] as string[]}));
vi.mock('@forge/sdk', async importOriginal => ({
  ...await importOriginal<typeof ForgeSdk>(),
  ServerConnection: {spawn: () => ({
    initialize: async () => 'compatible',
    capabilities: {stateOf: () => 'supported'},
    request: async (method: string) => { sdk.methods.push(method); return sdk.reply; },
    close: async () => {},
  })},
}));

type Json = {[key: string]: JsonValue};
// The SOURCE shape of test/workbench-forge-contract.test.ts, i.e. the measured native read of this workspace.
const SOURCE = {
  status: 'success', envelope: {verdict: null, reason_code: 'FORGE_OK'},
  data: {packages: [{ref: 'code:pi-subagents', last_result: 'success', authoritative_current: false, unverified_reason: 'FORGE_CURRENT_STATE_UNVERIFIED'}]},
};
const HISTORICAL = SOURCE.data.packages[0];
const reading = (source: JsonValue): Json => ({contract: 'forge.gate.status/v1', protocolMethod: 'gate.status', source});
const withPackages = (...packages: JsonValue[]): Json => reading({...SOURCE, data: {packages}});
const current = (ref: string, last_result: string): Json => ({ref, last_result, authoritative_current: true, verification_ref: 'cmd_current'});
const scope = {workspace: '/tmp/forge-ws', principal: 'local-operator:tester'};
const context = {scope, target: '/tmp/forge-ws', capturedAt: '2026-10-15T07:00:00Z', observedAt: '2026-10-15T07:00:01Z'};
const workspaceRef: NativeRef = {provider: 'forge', type: 'gate-status', id: 'workspace', scope: context.target};
const packageRef = (id: string): NativeRef => ({provider: 'forge', type: 'gate-status', id, scope: context.target});
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202A-\u202E\u2066-\u2069]/;
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected forgeGateTopology to refuse');
}

describe('Forge gate.status reader adapter', () => {
  it('states exactly the relation statement ObservationProjection.relate accepts', () => {
    expectTypeOf<ForgeObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    expectTypeOf(forgeGateTopology).parameter(0).toEqualTypeOf<JsonValue>();
    // wb-nl8 (--expect.requireAssertions, R1 default): the two type-level statements assert nothing at runtime; this states
    // what the case already proves - the reader whose first parameter type is pinned above exists as a function.
    expect(typeof forgeGateTopology).toBe('function');
  });

  // docs/workbench/00 § "2026-10-15 implementation update (experimental; evidence-scoped)": "authoritative_current=false
  // (historical status, not current verification). That latter field is preserved without a fabricated PASS."
  // docs/workbench/02 WB-015: "Workbench cannot turn absent/unknown/partial producer evidence into successful domain verdict."
  it('F1: a historical last_result is not a verdict: unknown tone and partial coverage, never a success tone', () => {
    const result = forgeGateTopology(reading(SOURCE), context);
    expect(result.snapshots).toHaveLength(2);
    const [workspace, pkg] = result.snapshots;
    expect(workspace.source).toStrictEqual(workspaceRef);
    expect(pkg.source).toStrictEqual(packageRef('code:pi-subagents'));
    expect(pkg.node.statusTone).toBe('unknown');
    for (const fragment of ['historical', 'authoritative_current=false', 'FORGE_CURRENT_STATE_UNVERIFIED']) expect(pkg.node.statusText).toContain(fragment);
    expect(pkg.coverage).toBe('partial');
    expect(workspace).toMatchObject({kind: 'forge.gate.status.snapshot', sourceVersion: 'forge.gate.status/v1', coverage: 'partial',
      evidenceRefs: ['forge:gate.status:FORGE_OK'], node: {type: 'sdk-operation', statusTone: 'unknown'}});
    expect(workspace.node.statusText).toContain('verification indeterminate');
    expect(JSON.stringify(result)).not.toContain('"statusTone":"success"');
    expect(result.diagnostics).toStrictEqual([]);
  });

  it('a never-gated package (null last_result, no authority keys) stays unknown without a fabricated authoritative_current=false', () => {
    const result = forgeGateTopology(withPackages({ref: 'code:fresh', last_result: null}), context);
    expect(result.snapshots[1].node).toMatchObject({statusTone: 'unknown', statusText: 'no last_result (historical; authoritative_current=unknown)'});
    expect(result.snapshots[1].coverage).toBe('partial');
    expect(JSON.stringify(result)).not.toContain('authoritative_current=false');
  });

  // docs/workbench/09 § "Acceptance/negative controls" item 7: "A true Forge failed gate remains failed despite transport success."
  // docs/workbench/14 § "Matrix by subsystem" Forge row: "gate on exact candidate/basis with producer verdict | source basis changed -> no PASS".
  it('F2: a current failed gate stays failed despite transport success, and current success is success', () => {
    const failed = forgeGateTopology(withPackages(current('code:pi-subagents', 'failure')), context);
    expect(failed.snapshots.map(snapshot => snapshot.node.statusTone)).toStrictEqual(['failure', 'failure']);
    expect(failed.snapshots[0].node.statusText).toBe('success · FORGE_OK · current gate failed');
    expect(failed.snapshots[1].node.statusText).toBe('failure (current)');
    const passed = forgeGateTopology(withPackages(current('code:pi-subagents', 'success')), context);
    expect(passed.snapshots.map(snapshot => [snapshot.node.statusTone, snapshot.coverage])).toStrictEqual([['success', 'complete'], ['success', 'complete']]);
    expect(passed.snapshots[1].node.statusText).toBe('success (current)');
    expect(passed.diagnostics).toStrictEqual([]);
  });

  it('reads Forge\'s own failed-gate status (error) as failure and never lets a mixed or undecided reading promote the workspace', () => {
    // Forge's CommandStatus vocabulary is success/partial/error/usage_error: a gate that ran to completion and failed records error.
    const forgeFailed = forgeGateTopology(withPackages(current('code:a', 'error'), current('code:b', 'success')), context);
    expect(forgeFailed.snapshots.map(snapshot => snapshot.node.statusTone)).toStrictEqual(['failure', 'failure', 'success']);
    const mixed = forgeGateTopology(withPackages(current('code:a', 'failure'), HISTORICAL), context);
    expect(mixed.snapshots.map(snapshot => snapshot.node.statusTone)).toStrictEqual(['unknown', 'failure', 'unknown']);
    const undecided = forgeGateTopology(withPackages(current('code:a', 'partial'), current('code:b', 'usage_error')), context);
    expect(undecided.snapshots.map(snapshot => snapshot.node.statusTone)).toStrictEqual(['unknown', 'unknown', 'unknown']);
  });

  it('withholds workspace success that the read status or a declared verdict does not support, and says so', () => {
    for (const [status, verdict] of [['partial', 'COULD_NOT_JUDGE'], ['success', 'COULD_NOT_JUDGE'], ['partial', null]] as const) {
      const result = forgeGateTopology(reading({status, envelope: {verdict, reason_code: 'FORGE_GATE_INCOMPLETE'}, data: {packages: [current('code:a', 'success')]}}), context);
      expect(result.snapshots[0].node.statusTone).toBe('unknown');
      expect(result.snapshots[0].node.statusText).toContain('verification indeterminate');
      expect(result.diagnostics).toHaveLength(1);
      expect(result.diagnostics[0]).toMatch(/success is withheld/);
    }
  });

  // docs/workbench/19 § "Example H: native evidence refusal": "Pi must show "verification indeterminate", not success,
  // even if host RPC returned normally and text says "build completed"."
  it('F3: a partial envelope with no packages is indeterminate, never an empty success', () => {
    const result = forgeGateTopology(reading({status: 'partial', envelope: {verdict: 'COULD_NOT_JUDGE', reason_code: 'FORGE_GATE_INCOMPLETE'}, data: {packages: []}}), context);
    expect(result.snapshots).toHaveLength(1);
    const [workspace] = result.snapshots;
    expect(workspace.source).toStrictEqual(workspaceRef);
    expect(workspace.node.statusTone).toBe('unknown');
    expect(workspace.node.statusText).toBe('partial · COULD_NOT_JUDGE · FORGE_GATE_INCOMPLETE · verification indeterminate');
    expect(workspace.coverage).toBe('partial');
    expect(result.relations).toStrictEqual([]);
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0]).toMatch(/empty package list/);
    // Vacuous truth is not verification: a successful read of zero packages still verifies nothing.
    const vacuous = forgeGateTopology(reading({...SOURCE, data: {packages: []}}), context);
    expect(vacuous.snapshots).toHaveLength(1);
    expect(vacuous.snapshots[0].node.statusTone).toBe('unknown');
    expect(vacuous.diagnostics).toHaveLength(1);
  });

  // docs/workbench/13 § "Key validations": "unrecognized SDK message version => diagnostic rather than silent success."
  // docs/workbench/06 § "Registration and resolution": "validate output representation without erasing unknown producer fields."
  const refusals: [string, JsonValue][] = [
    ['a null reading', null],
    ['an array reading', [reading(SOURCE)]],
    ['another provider contract', {...reading(SOURCE), contract: 'hyperunix.find/v1'}],
    ['a gate.run protocol method', {...reading(SOURCE), protocolMethod: 'gate.run'}],
    ['a missing source', {contract: 'forge.gate.status/v1', protocolMethod: 'gate.status'}],
    ['a missing envelope', reading({status: 'success', data: SOURCE.data})],
    ['a missing envelope.reason_code', reading({...SOURCE, envelope: {verdict: null}})],
    ['a non-string envelope.reason_code', reading({...SOURCE, envelope: {verdict: null, reason_code: 7}})],
    ['a missing data block', reading({status: 'success', envelope: SOURCE.envelope})],
    ['packages that are not an array', reading({...SOURCE, data: {packages: {ref: 'code:pi-subagents'}}})],
    ['a package that is not an object', withPackages(null)],
    ['a package without a ref', withPackages({last_result: 'success', authoritative_current: false})],
    ['a package with a numeric ref', withPackages({ref: 42})],
    ['a package with an empty ref', withPackages({ref: ''})],
    ['a ref longer than 256 bytes', withPackages({ref: 'é'.repeat(129)})],
    ['a ref carrying a terminal escape', withPackages({ref: 'code:\u001b[31mred'})],
    ['a ref carrying a bidi override', withPackages({ref: 'code:\u202Epi'})],
    ['a ref colliding with the workspace node', withPackages({ref: 'workspace'})],
    ['a repeated ref', withPackages(HISTORICAL, {...HISTORICAL, last_result: 'failure'})],
  ];
  it.each(refusals)('F4: refuses %s with a typed validation error', (_name, value) => {
    const error = thrown(() => forgeGateTopology(value, context));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({category: 'validation'});
  });

  it('F4: a ref of exactly 256 UTF-8 bytes is accepted: the bound is bytes, not characters', () => {
    const ref = 'é'.repeat(128);
    expect(Buffer.byteLength(ref)).toBe(256);
    expect(forgeGateTopology(withPackages({...HISTORICAL, ref}), context).snapshots[1].source.id).toBe(ref);
  });

  it('F4: unknown producer fields are tolerated, never required and never copied into presentation', () => {
    const extended = reading({...SOURCE, unknown_source_field: 'EXTRA-SOURCE', envelope: {...SOURCE.envelope, disposition: 'EXTRA-ENVELOPE'},
      data: {...SOURCE.data, ready_count: 0, packages: [{...HISTORICAL, step_hermeticity: {test: 'EXTRA-PACKAGE'}, readiness_reason: 'EXTRA-REASON'}]}});
    const result = forgeGateTopology(extended, context);
    const plain = forgeGateTopology(reading(SOURCE), context);
    expect(result.snapshots.map(snapshot => snapshot.node)).toStrictEqual(plain.snapshots.map(snapshot => snapshot.node));
    expect(JSON.stringify(result)).not.toMatch(/EXTRA-/);
  });

  it.each([
    ['an unzoned capture time', {...context, capturedAt: '2026-10-15T07:00:00'}],
    ['an unparseable observation time', {...context, observedAt: 'not-a-time'}],
    ['a target carrying a control character', {...context, target: '/tmp/forge\nws'}],
    ['an empty principal', {...context, scope: {...scope, principal: ''}}],
    ['an oversized invocation id', {...context, invocationId: 'i'.repeat(257)}],
  ])('refuses host context with %s before projecting anything', (_name, bad) => {
    expect(thrown(() => forgeGateTopology(reading(SOURCE), bad))).toMatchObject({category: 'validation'});
  });

  // docs/workbench/09 § "Relationships are typed and provenanced": "lifecycle ownership (only if native producer confirms)"
  // and "grouping only (phase, display scope)". docs/workbench/10 § "Four views" Timeline: "Never infer exact timing from
  // text or assume clocks agree; note uncertain clocks or event gaps." test/workbench-native-evidence.test.ts: "preserves
  // Forge native operation and partial status but never workspace path as basis".
  it('F5: states only forge-observer grouping edges and never invents lifecycle, timing or a basis', () => {
    const refs = ['code:pi-subagents', 'code:forge-sdk', 'docs:workbench'];
    const basis = `dirty-tree/v1:${'a'.repeat(40)}:sha256:${'b'.repeat(64)}`;
    const value = reading({...SOURCE, data: {source_snapshot_id: basis, gated_tree: basis, packages: refs.map(ref => ({...HISTORICAL, ref}))}});
    // native-evidence reads that digest as a source basis; a historical gate.status result was never computed on it.
    expect(nativeEvidence('forge.gate.status', value).sourceBasis).toBe(basis);
    const result = forgeGateTopology(value, context);
    expect(result.relations).toHaveLength(refs.length);
    expect(result.relations).toStrictEqual(refs.map(ref => ({scope, from: workspaceRef, to: packageRef(ref), kind: 'grouping',
      provenance: {source: 'forge-observer', observedAt: context.observedAt}})));
    for (const snapshot of result.snapshots) {
      expect(snapshot).not.toHaveProperty('interval');
      expect(snapshot).not.toHaveProperty('subjectBasis');
      expect(snapshot).not.toHaveProperty('definitionDigest');
    }
    expect(JSON.stringify(result)).not.toContain(basis);
    expect(JSON.stringify(result)).not.toMatch(/ownership|dependency|causation|hypothesis/);
  });

  // docs/workbench/09 § "Reader adapters": "Reader adapter returns snapshot {nativeRef, capturedAt, observedAt,
  // sourceRevision?, coverage?, nativePayloadRef}". docs/workbench/15 § "Gating policy": "P1 inspector release requires
  // VC-4/VC-5 with real native source and scale benchmark."
  it('F6: a real read model holds exactly the packages under the workspace and a later read refreshes in place', () => {
    const refs = ['code:pi-subagents', 'code:forge-sdk'];
    const value = withPackages(HISTORICAL, current('code:forge-sdk', 'failure'));
    const projection = new ObservationProjection();
    const first = forgeGateTopology(value, {...context, invocationId: 'wf-forge-1'});
    for (const snapshot of first.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of first.relations) projection.relate(relation);
    const children = projection.query({scope, parent: workspaceRef, limit: 10});
    expect(children.truncated).toBe(false);
    expect(children.nodes.map(node => node.nativeRef)).toStrictEqual(refs.map(ref => packageRef(ref)));
    expect(projection.query({scope, statusTone: 'unknown', limit: 10}).nodes.map(node => node.nativeRef)).toContainEqual(packageRef('code:pi-subagents'));
    expect(projection.query({scope, statusTone: 'failure', limit: 10}).nodes.map(node => node.nativeRef)).toStrictEqual([packageRef('code:forge-sdk')]);
    const [workspace] = projection.query({scope, ref: workspaceRef, limit: 1}).nodes;
    expect(workspace).toMatchObject({kind: 'forge.gate.status.snapshot', freshness: 'current', completeness: 'partial',
      sourceVersion: 'forge.gate.status/v1', invocationId: 'wf-forge-1', presentation: {statusTone: 'unknown'}});
    const edges = projection.relations({scope, from: workspace.key});
    expect(edges).toHaveLength(refs.length);
    expect(edges.every(edge => edge.kind === 'grouping' && edge.provenance.source === 'forge-observer')).toBe(true);
    expect(projection.window({scope, invocationId: 'wf-forge-1', offset: 0, limit: 10}).nodes.map(node => node.nativeRef))
      .toStrictEqual([workspaceRef, ...refs.map(ref => packageRef(ref))]);
    const before = projection.stats();
    const later = {...context, invocationId: 'wf-forge-1', capturedAt: '2026-10-15T07:05:00Z', observedAt: '2026-10-15T07:05:01Z'};
    const second = forgeGateTopology(value, later);
    for (const snapshot of second.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of second.relations) projection.relate(relation);
    expect(projection.stats()).toStrictEqual(before);
    expect(projection.query({scope, ref: workspaceRef, limit: 1}).nodes[0]).toMatchObject({observedAt: later.observedAt, lastConfirmedAt: later.capturedAt});
  });

  // docs/workbench/12 § "Input and output hardening": "Validate Unicode and terminal escape sequences before display (no
  // untrusted ANSI injection)." docs/workbench/09 § "Acceptance/negative controls" item 10: "Large/secret payload does not
  // leak into Pi tool result or screen by default."
  it('F7: a 10,000-character reason_code with a credential and ANSI yields bounded, redacted text and refresh never throws', () => {
    // The escape is glued to the credential: redacting before stripping would miss "mBearer" and leak it once stripped.
    const hostile = `\u001b[31mBearer abc123 ${'R'.repeat(10_000)}`.slice(0, 10_000);
    expect(hostile).toHaveLength(10_000);
    const result = forgeGateTopology(reading({...SOURCE, envelope: {verdict: null, reason_code: hostile}}), context);
    const [workspace] = result.snapshots;
    expect(workspace.node.statusText.length).toBeLessThanOrEqual(200);
    expect(workspace.node.statusText).not.toMatch(UNSAFE);
    expect(workspace.node.statusText).toContain('[REDACTED]');
    expect(workspace.node.statusText).not.toContain('abc123');
    expect(workspace.node.statusText).toContain('verification indeterminate');
    // A mangled reason code is not an identity: the evidence reference is withheld and the withholding is diagnosed.
    expect(workspace).not.toHaveProperty('evidenceRefs');
    expect(result.diagnostics.some(diagnostic => diagnostic.includes('reason_code'))).toBe(true);
    expect(JSON.stringify(result)).not.toContain('abc123');
    const projection = new ObservationProjection();
    for (const snapshot of result.snapshots) expect(() => projection.refresh(snapshot)).not.toThrow();
  });

  it('F7: every producer string that reaches presentation is bounded, stripped and redacted', () => {
    const value = reading({status: 'success\u001b]0;title\u0007', envelope: {verdict: 'password=abc123', reason_code: 'FORGE_OK'},
      data: {packages: [{ref: 'code:pi-subagents', last_result: `\u001b[2Jsuccess${'S'.repeat(5_000)}`, authoritative_current: false, unverified_reason: 'Bearer abc123\u202E'}]}});
    const result = forgeGateTopology(value, {...context, target: '/tmp/forge-ws/ Bearer abc123'});
    for (const snapshot of result.snapshots) {
      for (const text of [snapshot.node.title, snapshot.node.statusText]) {
        expect(text.length).toBeLessThanOrEqual(200);
        expect(text.length).toBeGreaterThan(0);
        expect(text).not.toMatch(UNSAFE);
        expect(text).not.toContain('abc123');
      }
    }
    expect(result.snapshots[0].node.statusText).toContain('[REDACTED]');
    expect(result.snapshots[1].node.statusText).toContain('[REDACTED]');
    // A status spelled with an escape is not the native success token, so the read cannot count as complete.
    expect(result.snapshots[0].coverage).toBe('partial');
    const projection = new ObservationProjection();
    for (const snapshot of result.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of result.relations) expect(() => projection.relate(relation)).not.toThrow();
  });

  // docs/workbench/13 § "Observation projection": "Do not replace native status with presentation.statusTone. This is a read model only."
  it('F8: the literal native strings stay beside the presentation tone', () => {
    const historical = forgeGateTopology(reading(SOURCE), context);
    expect(historical.snapshots[1].node).toStrictEqual({title: 'Forge package code:pi-subagents', type: 'sdk-operation',
      statusText: 'success (historical; authoritative_current=false; FORGE_CURRENT_STATE_UNVERIFIED)', statusTone: 'unknown'});
    expect(historical.snapshots[0].node.statusText).toBe('success · FORGE_OK · verification indeterminate');
    for (const lastResult of ['success', 'failure', 'error', 'partial', 'running']) {
      for (const authoritative of [true, false]) {
        const result = forgeGateTopology(withPackages({ref: 'code:a', last_result: lastResult, authoritative_current: authoritative}), context);
        expect(result.snapshots[1].node.statusText.startsWith(`${lastResult} (`)).toBe(true);
      }
    }
  });

  it('never mutates the provider output it reads', () => {
    const value = reading(structuredClone(SOURCE));
    const before = structuredClone(value);
    forgeGateTopology(value, context);
    expect(value).toStrictEqual(before);
  });

  // wb-4ap.1 COLLECTIVE-ADAPTATION-R1, the F9 slot of this block: "When a gate.status package row carries
  // last_result_state.invalidation_basis with kind === "invalidation-basis/v2" and a digest-shaped derived_from, the package
  // NativeSnapshot produced by forgeGateTopology shall carry subjectBasis === derived_from verbatim." Every row is the measured
  // SOURCE_WITH_STATE row (wb-4ap.11) or a mutation of it through test/helpers/forge-last-result-state.ts: MEASURED_ROW is the
  // STALE row over basis(A, B). docs/workbench/07 § Forge provider: "Preserve actual source basis".
  it('F9 (wb-4ap.1): the measured STALE row carries its derived_from digest B as the package subjectBasis, never its source_digest A', () => {
    // R1 L4: "forgeGateTopology(withPackages(stale), context).snapshots[1].subjectBasis equals B (the derived_from digest, not
    // source_digest A). RED on 9df9a03: undefined."
    expect(A).not.toBe(B);
    const result = forgeGateTopology(withPackages(MEASURED_ROW), context);
    const [workspace, pkg] = result.snapshots;
    expect(pkg.source).toStrictEqual(packageRef('code:pi-subagents'));
    expect(pkg.subjectBasis).toBe(B);
    expect(pkg.subjectBasis).not.toBe(A);
    expect(Object.keys(workspace)).not.toContain('subjectBasis');
    expect(result.diagnostics).toStrictEqual([]);
  });

  it('F9 (wb-4ap.1): each digest shape native-evidence accepts - sha256-prefixed, bare 64-hex and dirty-tree/v1 - round-trips verbatim as subjectBasis', () => {
    // R1: "Verbatim carriage across the three accepted shapes (native-evidence.ts:87@9df9a03): a bare 64-hex derived_from and a
    // dirty-tree/v1:<40hex>:sha256:<64hex> derived_from each round-trip as subjectBasis unchanged."
    const bare = 'c'.repeat(64);
    const dirty = `dirty-tree/v1:${'d'.repeat(40)}:sha256:${'e'.repeat(64)}`;
    const carried = (derivedFrom: string): string | undefined =>
      forgeGateTopology(withPackages(described({invalidation_basis: basis(A, derivedFrom)})), context).snapshots[1].subjectBasis;
    expect(carried(B)).toBe(B);
    expect(carried(bare)).toBe(bare);
    expect(carried(dirty)).toBe(dirty);
    // The three shapes side by side on three refs of one reading: each package keeps its own derived_from.
    const result = forgeGateTopology(withPackages(
      described({invalidation_basis: basis(A, B)}, {ref: 'code:sha256'}),
      described({invalidation_basis: basis(A, bare)}, {ref: 'code:bare-hex'}),
      described({invalidation_basis: basis(A, dirty)}, {ref: 'code:dirty-tree'}),
    ), context);
    expect(result.snapshots.map(snapshot => [snapshot.source.id, snapshot.subjectBasis])).toStrictEqual([
      ['workspace', undefined], ['code:sha256', B], ['code:bare-hex', bare], ['code:dirty-tree', dirty],
    ]);
    expect(result.diagnostics).toStrictEqual([]);
  });

  // docs/workbench/09 § "Derived view indexes": "byParent, byDependency, bySourceBasis -> child lists and reverse lookup".
  it('F9 (wb-4ap.1) L3: a projection refresh applies the basis-bearing package snapshot and a basis query on B returns that package node alone', () => {
    // R1 L3: "ObservationProjection.refresh(snapshot) returns 'applied' for the basis-bearing snapshot and query({scope,
    // basis: B, limit: 10}).nodes returns the package node (ObservationQuery.basis index, observation.ts:86@9df9a03)."
    const result = forgeGateTopology(withPackages(MEASURED_ROW, {...DESCRIPTORLESS, ref: 'code:sibling'}), context);
    const [workspace, pkg, sibling] = result.snapshots;
    expect(pkg.subjectBasis).toBe(B);
    const projection = new ObservationProjection();
    expect(projection.refresh(pkg)).toBe('applied');
    expect(projection.refresh(workspace)).toBe('applied');
    expect(projection.refresh(sibling)).toBe('applied');
    const byBasis = projection.query({scope, basis: B, limit: 10});
    expect(byBasis.truncated).toBe(false);
    expect(byBasis.nodes.map(node => node.nativeRef)).toStrictEqual([packageRef('code:pi-subagents')]);
    expect(byBasis.nodes[0]).toMatchObject({subjectBasis: B, kind: 'forge.gate.status.package.snapshot'});
    // The index keys on derived_from: the source digest the producer reads now finds no node.
    expect(projection.query({scope, basis: A, limit: 10}).nodes).toStrictEqual([]);
  });

  it('F9 (wb-4ap.1) static pin: the forgeGateTopology doc comment states no interval or definitionDigest and that the published per-package basis is echoed, never that gate.status carries no basis', () => {
    // R1: "The header comment at forge-observer.ts:71-73 no longer asserts gate.status carries no basis; it states no interval or
    // definitionDigest exists and the per-package derived-verdict basis is echoed when published."
    const text = workbenchSource('forge-observer.ts');
    const source = ts.createSourceFile('forge-observer.ts', text, ts.ScriptTarget.Latest, true);
    const declaration = source.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === 'forgeGateTopology');
    expect(declaration).toBeDefined();
    const ranges = declaration === undefined ? [] : ts.getLeadingCommentRanges(text, declaration.getFullStart()) ?? [];
    expect(ranges).toHaveLength(1);
    // The one doc comment attached to the declaration, its line breaks and leading asterisks folded into single spaces.
    const doc = ranges.map(range => text.slice(range.pos, range.end)).join('').replace(/\s*\n\s*\*\s?/g, ' ');
    expect(doc.startsWith('/**')).toBe(true);
    expect(doc).toMatch(/no snapshot has an interval or definitionDigest/);
    expect(doc).toMatch(/carries its derived_from as subjectBasis/);
    expect(doc).not.toMatch(/\bno\b[^.;]*\bbasis\b/i);
  });
});

describe('Forge gate.status adapter consumes the registered provider output unchanged', () => {
  const root = mkdtempSync(join(tmpdir(), 'forge-observer-'));
  afterAll(() => rmSync(root, {recursive: true, force: true}));
  const rooted = {...context, scope: {workspace: root, principal: 'local-operator:tester'}, target: root};

  it('projects what readForgeGateStatus returns, carrying the native operation as a forge-operation evidence reference', async () => {
    sdk.reply = {contract_version: 'result-envelope/v1', command: 'gate.status', diagnostics: [],
      operation_id: 'op-7b420e815b9045968ba78bcbb4a20b40', ids: {trace_id: 'trace-is-not-identity'}, ...SOURCE};
    sdk.methods.length = 0;
    const registry = new CapabilityRegistry();
    registerNativeForgeGateStatus(registry, root);
    const value = await registry.invoke('forge.gate.status', {target: root}, {grants: ['forge:inspect'], signal: new AbortController().signal});
    expect(value).toEqual(await readForgeGateStatus(root));
    expect(sdk.methods).toStrictEqual(['gate.status', 'gate.status']);
    const topology = forgeGateTopology(value, rooted);
    // docs/workbench/20 ruling 5: Forge nodes emit forge-operation:<operation_id> refs from native-evidence shaping.
    expect(topology.snapshots[0].evidenceRefs).toStrictEqual(['forge:gate.status:FORGE_OK', 'forge-operation:op-7b420e815b9045968ba78bcbb4a20b40']);
    expect(topology.snapshots.map(snapshot => snapshot.node.statusTone)).toStrictEqual(['unknown', 'unknown']);
    expect(topology.snapshots[1].node.statusText).toContain('authoritative_current=false');
    expect(JSON.stringify(topology)).not.toContain('trace-is-not-identity');
  });

  it('projects a genuine partial native reply as indeterminate, not as an empty success', async () => {
    sdk.reply = {contract_version: 'result-envelope/v1', command: 'gate.status', status: 'partial',
      diagnostics: [{code: 'FORGE_DEPENDENCY_UNRESOLVED', level: 'warning', message: 'declared member dropped'}],
      envelope: {verdict: 'COULD_NOT_JUDGE', reason_code: 'FORGE_GATE_INCOMPLETE'}, data: {packages: [], dropped: ['code:missing']}};
    const topology = forgeGateTopology(await readForgeGateStatus(root), rooted);
    expect(topology.snapshots).toHaveLength(1);
    expect(topology.snapshots[0].node).toMatchObject({statusTone: 'unknown', statusText: 'partial · COULD_NOT_JUDGE · FORGE_GATE_INCOMPLETE · verification indeterminate'});
    expect(topology.relations).toStrictEqual([]);
  });

  it('projects the fixture provider output of registerForgeGateStatus exactly like its source', async () => {
    const registry = new CapabilityRegistry();
    registerForgeGateStatus(registry, {gate: {status: async () => ({protocolMethod: 'gate.status', raw: SOURCE})}}, '0.1.0');
    const value = await registry.invoke('forge.gate.status', {target: '.'}, {grants: ['forge:inspect'], signal: new AbortController().signal});
    expect(forgeGateTopology(value, context)).toStrictEqual(forgeGateTopology(reading(SOURCE), context));
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Collective adaptation (program-triage-2026-10-17, epic wb-4ap): a package row's last_result_state. Every case below pins
// the measured SOURCE_WITH_STATE row of test/workbench-forge-contract.test.ts (wb-4ap.11) through
// test/helpers/forge-last-result-state.ts, and every malformed or planted variant mutates that row. Hermetic, default test
// gate, no SDK process: the fixture is the recorded wire shape, not a live read. One describe block per bead.
// ---------------------------------------------------------------------------------------------------------------------

/** The F8 literal (:288): the measured row's native text and authority label, which every descriptor case keeps verbatim. */
const F8_TEXT = 'success (historical; authoritative_current=false; FORGE_CURRENT_STATE_UNVERIFIED)';
const REASON = 'FORGE_CURRENT_STATE_UNVERIFIED';
/** A whole freshness word. The measured reason code holds CURRENT inside one word (FORGE_CURRENT_STATE_UNVERIFIED), never as one. */
const word = (value: string): RegExp => new RegExp(`\\b${value}\\b`);
const ownKeys = (value: object): string[] => Object.keys(value);
/** The measured STALE row (basis(A, B)) and a CURRENT twin over equal digests (basis(A, A)) on its own ref. */
const staleRow = MEASURED_ROW;
const currentRow = described({invalidation_basis: basis(A, A), freshness: 'CURRENT'}, {ref: 'code:other'});

describe('wb-4ap measured descriptor (B2): every collective-adaptation case mutates the landed SOURCE_WITH_STATE row', () => {
  it('B2: the row is the measured wb-4ap.11 shape - kind invalidation-basis/v2, a closed-set freshness, digest-shaped and distinct digests', () => {
    expect(MEASURED_ROW).toMatchObject({ref: 'code:pi-subagents', last_result: 'success', authoritative_current: false, unverified_reason: REASON});
    expect(MEASURED_BASIS.kind).toBe('invalidation-basis/v2');
    expect(MEASURED_STATE.freshness).toBe('STALE');
    expect(FRESHNESS_WORDS).toContain(MEASURED_STATE.freshness);
    for (const digest of [A, B]) expect(digest).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(A).not.toBe(B);
    expect(ownKeys(DESCRIPTORLESS)).not.toContain('last_result_state');
    expect(ownKeys(DESCRIPTORLESS)).toHaveLength(ownKeys(MEASURED_ROW).length - 1);
  });
});

describe('wb-4ap.2 COLLECTIVE-ADAPTATION-R2: a well-formed descriptor quotes its freshness word beside the historical label', () => {
  it('F10 (wb-4ap.2): the measured STALE row and a CURRENT row each quote their own word after the unchanged native text and authority label', () => {
    const stale = forgeGateTopology(withPackages(staleRow), context).snapshots[1].node.statusText;
    expect(stale).toMatch(/STALE/);
    expect(stale).toMatch(/historical/);
    expect(stale).toMatch(/authoritative_current=false/);
    expect(stale).toBe(`${F8_TEXT} · basis STALE`);
    const fresh = forgeGateTopology(withPackages(currentRow), context).snapshots[1].node.statusText;
    expect(fresh).toMatch(word('CURRENT'));
    expect(fresh).toBe(`${F8_TEXT} · basis CURRENT`);
  });

  it('L5 (wb-4ap.2): each of the four closed words appears, whole and verbatim, in its own row and in no other row', () => {
    const rows = FRESHNESS_WORDS.map(freshness => described({freshness}, {ref: `code:${freshness.toLowerCase()}`}));
    const result = forgeGateTopology(withPackages(...rows), context);
    expect(result.diagnostics).toStrictEqual([]);
    FRESHNESS_WORDS.forEach((own, index) => {
      const text = result.snapshots[index + 1].node.statusText;
      expect(text).toBe(`${F8_TEXT} · basis ${own}`);
      for (const other of FRESHNESS_WORDS) if (other !== own) expect(text, `${own} row`).not.toMatch(word(other));
    });
  });

  it('wb-4ap.2: the text stays within MAX_TEXT (200) on the longest row - a 256-byte ref, 48-character result and reason, the longest word', () => {
    const longest = described({freshness: 'NOT_APPLICABLE'}, {ref: 'é'.repeat(128), last_result: 'L'.repeat(48), authoritative_current: 'maybe', unverified_reason: 'R'.repeat(48)});
    expect(Buffer.byteLength(String(longest.ref))).toBe(256);
    const [, pkg] = forgeGateTopology(withPackages(longest), context).snapshots;
    expect(pkg.node.statusText).toBe(`${'L'.repeat(48)} (historical; authoritative_current=unknown; ${'R'.repeat(48)}) · basis NOT_APPLICABLE`);
    expect(pkg.node.statusText.length).toBeLessThanOrEqual(200);
    expect(pkg.node.title.length).toBeLessThanOrEqual(200);
  });
});

describe('wb-4ap.3 COLLECTIVE-ADAPTATION-R3: a malformed descriptor is withheld with one diagnostic and renders basis UNKNOWN, never CURRENT', () => {
  // The six F11 shapes, each a mutation of the measured row.
  const malformed: [string, Json][] = [
    ['freshness FRESH (outside the closed set)', described({freshness: 'FRESH'})],
    ['freshness CURRENT over kind invalidation-basis/v1', described({freshness: 'CURRENT', invalidation_basis: {...MEASURED_BASIS, kind: 'invalidation-basis/v1'}})],
    ['derived_from /home/me/workspace (a path, not a digest)', described({invalidation_basis: basis(A, '/home/me/workspace')})],
    ['derived_from sha256: + z x 64 (not hex)', described({invalidation_basis: basis(A, `sha256:${'z'.repeat(64)}`)})],
    ['invalidation_basis null with freshness CURRENT', described({invalidation_basis: null, freshness: 'CURRENT'})],
    ['last_result_state text (not an object)', {...MEASURED_ROW, last_result_state: 'text'}],
  ];

  it('F11 table liveness (wb-4ap.2): the malformed table holds all six shapes', () => expect(malformed).toHaveLength(6));

  it.each(malformed)('F11 (wb-4ap.3): %s sets no subjectBasis, pushes exactly one withheld-basis diagnostic for the ref and renders basis UNKNOWN', (_name, row) => {
    const result = forgeGateTopology(withPackages(row), context);
    const [, pkg] = result.snapshots;
    expect(ownKeys(pkg)).not.toContain('subjectBasis');
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0]).toContain('code:pi-subagents');
    expect(result.diagnostics[0]).toMatch(/\bbasis\b/);
    expect(result.diagnostics[0]).toMatch(/\bwithheld\b/);
    expect(pkg.node.statusText).toMatch(/basis UNKNOWN/);
    expect(pkg.node.statusText).not.toMatch(word('CURRENT'));
    // The acceptance's literal /CURRENT/ once the producer's own reason code, which holds CURRENT inside one word, is set aside.
    expect(pkg.node.statusText.replace(REASON, '')).not.toMatch(/CURRENT/);
    expect(pkg.node.statusText).toBe(`${F8_TEXT} · basis UNKNOWN`);
  });

  it('wb-4ap.3 (c) boundary: each of the three accepted digest shapes is well formed - quoted word, no diagnostic, derived_from as the basis', () => {
    // native-evidence.ts accepts exactly these three digest shapes; a sha256-only check would withhold the other two.
    for (const derivedFrom of [B, 'c'.repeat(64), `dirty-tree/v1:${'d'.repeat(40)}:sha256:${'e'.repeat(64)}`]) {
      const result = forgeGateTopology(withPackages(described({invalidation_basis: basis(A, derivedFrom)})), context);
      expect(result.diagnostics, derivedFrom).toStrictEqual([]);
      expect(result.snapshots[1].node.statusText, derivedFrom).toBe(`${F8_TEXT} · basis STALE`);
      expect(result.snapshots[1].subjectBasis, derivedFrom).toBe(derivedFrom);
    }
  });

  it('F11 (wb-4ap.3): no malformed text reaches the result - neither the bad derived_from nor either digest of the withheld basis', () => {
    for (const [name, row] of malformed) {
      const serialized = JSON.stringify(forgeGateTopology(withPackages(row), context));
      for (const raw of ['/home/me/workspace', 'z'.repeat(64), A, B]) expect(serialized, name).not.toContain(raw);
    }
  });

  it('wb-4ap.3: no malformed descriptor moves the base row off unknown tone and partial coverage, or changes the workspace snapshot or the edges', () => {
    const base = forgeGateTopology(withPackages(DESCRIPTORLESS), context);
    for (const [name, row] of malformed) {
      const result = forgeGateTopology(withPackages(row), context);
      expect(result.snapshots[1].node.statusTone, name).toBe('unknown');
      expect(result.snapshots[1].coverage, name).toBe('partial');
      expect(result.snapshots[0], name).toStrictEqual(base.snapshots[0]);
      expect(result.relations, name).toStrictEqual(base.relations);
    }
  });

  it('wb-4ap.3: a malformed row neither throws nor poisons its sibling - in [malformed, stale] the stale sibling keeps subjectBasis B', () => {
    for (const [name, row] of malformed) {
      const result = forgeGateTopology(withPackages(row, {...staleRow, ref: 'code:sibling'}), context);
      expect(ownKeys(result.snapshots[1]), name).not.toContain('subjectBasis');
      expect(result.snapshots[2].subjectBasis, name).toBe(B);
      expect(result.snapshots[2].node.statusText, name).toBe(`${F8_TEXT} · basis STALE`);
      expect(result.diagnostics, name).toHaveLength(1);
    }
  });

  it('wb-4ap.3: the withheld-basis diagnostic names its package through the shared label layout - a credential-shaped ref is redacted there as in the title', () => {
    const result = forgeGateTopology(withPackages(described({freshness: 'FRESH'}, {ref: 'code:Bearer PLANTED-FAKE-TOKEN'})), context);
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0]).toMatch(/\bwithheld\b/);
    expect(result.diagnostics[0]).toContain('[REDACTED]');
    expect(result.diagnostics[0]).not.toContain('PLANTED-FAKE-TOKEN');
    expect(result.snapshots[1].node.title).not.toContain('PLANTED-FAKE-TOKEN');
  });
});

describe('wb-4ap.4 COLLECTIVE-ADAPTATION-R4: a row without a descriptor gets no basis, no basis word and its 9df9a03 node; the workspace digest is never a package basis', () => {
  it('F12 (wb-4ap.4): reading(SOURCE) keeps the F8 node literal, no subjectBasis and the 9df9a03 diagnostics (none)', () => {
    const result = forgeGateTopology(reading(SOURCE), context);
    expect(result.snapshots[1].node).toStrictEqual({title: 'Forge package code:pi-subagents', type: 'sdk-operation', statusText: F8_TEXT, statusTone: 'unknown'});
    expect(ownKeys(result.snapshots[1])).not.toContain('subjectBasis');
    expect(result.diagnostics).toStrictEqual([]);
    expect(result.snapshots[1].node.statusText).not.toMatch(/\bbasis\b/);
  });

  it('wb-4ap.4: last_result_state null (the producer value for a null last_result) is descriptor-less - byte-identical projection, no basis word, no diagnostic', () => {
    expect(JSON.stringify(forgeGateTopology(withPackages({...HISTORICAL, last_result_state: null}), context))).toBe(JSON.stringify(forgeGateTopology(withPackages(HISTORICAL), context)));
    expect(JSON.stringify(forgeGateTopology(withPackages({...MEASURED_ROW, last_result_state: null}), context))).toBe(JSON.stringify(forgeGateTopology(withPackages(DESCRIPTORLESS), context)));
    const fresh = forgeGateTopology(withPackages({ref: 'code:fresh', last_result: null, last_result_state: null}), context);
    expect(fresh.snapshots[1].node).toMatchObject({statusText: 'no last_result (historical; authoritative_current=unknown)', statusTone: 'unknown'});
    expect(ownKeys(fresh.snapshots[1])).not.toContain('subjectBasis');
    expect(fresh.diagnostics).toStrictEqual([]);
  });

  it('wb-4ap.4 never-case: the measured row without its descriptor, every other measured producer field kept, renders the F8 node with no basis', () => {
    const result = forgeGateTopology(withPackages(DESCRIPTORLESS), context);
    expect(result.snapshots[1].node).toStrictEqual({title: 'Forge package code:pi-subagents', type: 'sdk-operation', statusText: F8_TEXT, statusTone: 'unknown'});
    for (const snapshot of result.snapshots) expect(ownKeys(snapshot)).not.toContain('subjectBasis');
    expect(JSON.stringify(result)).not.toMatch(/\bbasis\b/);
    expect(result.diagnostics).toStrictEqual([]);
  });

  it('wb-4ap.4 never-case: mixed [HISTORICAL, stale] under a workspace source_snapshot_id/gated_tree - only the described row has a basis, B, and the workspace digest appears nowhere', () => {
    const workspaceDigest = `dirty-tree/v1:${'a'.repeat(40)}:sha256:${'c'.repeat(64)}`;
    const value = reading({...SOURCE, data: {source_snapshot_id: workspaceDigest, gated_tree: workspaceDigest, packages: [HISTORICAL, {...staleRow, ref: 'code:described'}]}});
    // native-evidence reads that digest as the workspace source basis; it is never a package's basis.
    expect(nativeEvidence('forge.gate.status', value).sourceBasis).toBe(workspaceDigest);
    const result = forgeGateTopology(value, context);
    expect(ownKeys(result.snapshots[0])).not.toContain('subjectBasis');
    expect(ownKeys(result.snapshots[1])).not.toContain('subjectBasis');
    expect(result.snapshots[2].subjectBasis).toBe(B);
    expect(JSON.stringify(result)).not.toContain(workspaceDigest);
  });
});

describe('wb-4ap.5 COLLECTIVE-ADAPTATION-R5: a quoted freshness never confers current authority', () => {
  it('F13 (wb-4ap.5): withPackages(current) keeps unknown tone, partial coverage, the historical label and the workspace literal', () => {
    const result = forgeGateTopology(withPackages(currentRow), context);
    expect(result.snapshots[1].node.statusTone).toBe('unknown');
    expect(result.snapshots[1].coverage).toBe('partial');
    expect(result.snapshots[1].node.statusText).toMatch(/historical; authoritative_current=false/);
    expect(result.snapshots[0].node.statusTone).toBe('unknown');
    expect(result.snapshots[0].node.statusText).toBe('success · FORGE_OK · verification indeterminate');
    expect(result.snapshots[0].coverage).toBe('partial');
  });

  it('wb-4ap.5 never-case: no word changes a tone, a coverage, the workspace snapshot or the native label, on historical and current rows alike', () => {
    for (const freshness of FRESHNESS_WORDS) {
      for (const authoritative of [false, true]) {
        const plain = {...DESCRIPTORLESS, authoritative_current: authoritative};
        const before = forgeGateTopology(withPackages(plain), context);
        const after = forgeGateTopology(withPackages({...plain, last_result_state: {...MEASURED_STATE, freshness}}), context);
        const facets = (topology: typeof before) => topology.snapshots.map(snapshot => [snapshot.node.statusTone, snapshot.coverage]);
        expect(facets(after), `${freshness}/${authoritative}`).toStrictEqual(facets(before));
        expect(after.snapshots[0], `${freshness}/${authoritative}`).toStrictEqual(before.snapshots[0]);
        expect(after.snapshots[1].node.statusText.startsWith(before.snapshots[1].node.statusText), `${freshness}/${authoritative}`).toBe(true);
      }
    }
  });

  it("wb-4ap.5: a current('code:a', 'success') row with freshness STALE keeps the success tone and the (current) label, and the workspace stays success", () => {
    const result = forgeGateTopology(withPackages({...current('code:a', 'success'), last_result_state: MEASURED_STATE}), context);
    expect(result.snapshots[1].node.statusTone).toBe('success');
    expect(result.snapshots[1].node.statusText.startsWith('success (current)')).toBe(true);
    expect(result.snapshots[0].node.statusTone).toBe('success');
    expect(result.snapshots[0].node.statusText).toBe('success · FORGE_OK · current gate passed');
    expect(result.snapshots.map(snapshot => snapshot.coverage)).toStrictEqual(['complete', 'complete']);
  });

  it('wb-4ap.5 static pin: the tone and coverage expressions of forge-observer.ts read pkg.current, pkg.lastResult, readSucceeded and verdict only - no freshness identifier', () => {
    const source = ts.createSourceFile('forge-observer.ts', workbenchSource('forge-observer.ts'), ts.ScriptTarget.Latest, true);
    const derivations: ts.Node[] = [];
    const locate = (node: ts.Node): void => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && ['judged', 'allCurrentSuccess', 'tone', 'packageTone'].includes(node.name.text) && node.initializer) derivations.push(node.initializer);
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'snapshot' && node.arguments[2]) derivations.push(node.arguments[2]);
      if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === 'statusTone') derivations.push(node.initializer);
      ts.forEachChild(node, locate);
    };
    locate(source);
    // judged, allCurrentSuccess, tone and packageTone; the workspace and package coverage arguments; the two statusTone fields.
    expect(derivations).toHaveLength(8);
    const names = new Set<string>();
    const members = new Set<string>();
    const collect = (node: ts.Node): void => {
      if (ts.isIdentifier(node)) names.add(node.text);
      if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'pkg') members.add(node.name.text);
      ts.forEachChild(node, collect);
    };
    for (const node of derivations) collect(node);
    expect(names.has('freshness')).toBe(false);
    const allowed = new Set(['packages', 'length', 'every', 'some', 'pkg', 'current', 'lastResult', 'judged', 'allCurrentSuccess', 'FAILED', 'has', 'readSucceeded', 'verdict', 'undefined', 'tone', 'packageTone']);
    expect([...names].filter(name => !allowed.has(name))).toStrictEqual([]);
    expect([...members].sort()).toStrictEqual(['current', 'lastResult']);
  });
});

describe('wb-4ap.6 COLLECTIVE-ADAPTATION-R6: the word is echoed from the producer, never derived from the digests, the filesystem or Git', () => {
  it('F14 (wb-4ap.6): basis(A, A) with STALE renders STALE and basis(A, B) with CURRENT renders CURRENT, the tone still unknown', () => {
    const equal = forgeGateTopology(withPackages(described({invalidation_basis: basis(A, A), freshness: 'STALE'})), context).snapshots[1];
    expect(equal.node.statusText).toMatch(word('STALE'));
    expect(equal.node.statusText).not.toMatch(word('CURRENT'));
    const differ = forgeGateTopology(withPackages(described({invalidation_basis: basis(A, B), freshness: 'CURRENT'})), context).snapshots[1];
    expect(differ.node.statusText).toMatch(word('CURRENT'));
    expect(differ.node.statusText).not.toMatch(word('STALE'));
    expect(differ.node.statusTone).toBe('unknown');
  });

  it('wb-4ap.6: subjectBasis is derived_from in both cases (A, then B) and never source_digest', () => {
    expect(forgeGateTopology(withPackages(described({invalidation_basis: basis(A, A), freshness: 'STALE'})), context).snapshots[1].subjectBasis).toBe(A);
    expect(forgeGateTopology(withPackages(described({invalidation_basis: basis(A, B), freshness: 'CURRENT'})), context).snapshots[1].subjectBasis).toBe(B);
    expect(forgeGateTopology(withPackages(described({invalidation_basis: basis(B, A), freshness: 'STALE'})), context).snapshots[1].subjectBasis).toBe(A);
  });

  it('wb-4ap.6: the quoted word is exactly the producer field - every closed word over equal, differing and swapped digests is echoed verbatim', () => {
    for (const freshness of FRESHNESS_WORDS) {
      for (const [sourceDigest, derivedFrom] of [[A, A], [A, B], [B, A]]) {
        const pkg = forgeGateTopology(withPackages(described({invalidation_basis: basis(sourceDigest, derivedFrom), freshness})), context).snapshots[1];
        expect(pkg.node.statusText, freshness).toBe(`${F8_TEXT} · basis ${freshness}`);
        expect(pkg.subjectBasis, freshness).toBe(derivedFrom);
      }
    }
  });

  it('wb-4ap.6 static pin: forge-observer.ts imports no node:fs, node:child_process or Git helper (exactly its four modules) and never names source_digest', () => {
    const text = workbenchSource('forge-observer.ts');
    expect(text).not.toMatch(/from\s+['"]node:(fs|child_process)/);
    expect(text).not.toMatch(/\brequire\s*\(|\bimport\s*\(/);
    expect([...text.matchAll(/^import\s[^;]*?\sfrom\s+['"]([^'"]+)['"]/gm)].map(match => match[1]).sort()).toStrictEqual(['./capability-registry.js', './native-evidence.js', './observation.js', './redaction.js']);
    expect(text).not.toMatch(/source_digest/);
  });

  it('wb-4ap.6: forgeGateTopology stays synchronous and pure - a declared non-async function, a non-thenable result, equal on a re-read, the reading untouched', () => {
    const source = ts.createSourceFile('forge-observer.ts', workbenchSource('forge-observer.ts'), ts.ScriptTarget.Latest, true);
    const declaration = source.statements.find((statement): statement is ts.FunctionDeclaration => ts.isFunctionDeclaration(statement) && statement.name?.text === 'forgeGateTopology');
    expect(declaration).toBeDefined();
    expect(declaration?.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword) ?? false).toBe(false);
    expect(declaration?.asteriskToken).toBeUndefined();
    const value = withPackages(structuredClone(staleRow));
    const before = structuredClone(value);
    const first = forgeGateTopology(value, context);
    expect(first).not.toBeInstanceOf(Promise);
    expect('then' in first).toBe(false);
    expect(forgeGateTopology(value, context)).toStrictEqual(first);
    expect(value).toStrictEqual(before);
  });
});

describe('wb-4ap.7 COLLECTIVE-ADAPTATION-R7: reading last_result_state adds no relation and changes no relation kind - one forge-observer grouping edge per package, whatever the descriptor says', () => {
  // wb-4ap.7 STATEMENT: "Reading last_result_state shall add no relation and change no relation kind: forgeGateTopology shall
  // state exactly one grouping edge per package with provenance.source === 'forge-observer' and never an ownership, dependency,
  // causation or hypothesis edge, whatever the descriptor says (semantic_owner, authoritative_read_source and source_ref
  // included)." RATIONALE: gate.status names no native lifecycle confirmation (forge-observer.ts:131-132@9df9a03) and the
  // control core permits native actions only on a confirmed-ownership edge (control.ts:184-185@9df9a03), so an ownership
  // edge minted from a descriptor would escalate observation into control authority. Default test gate, hermetic, no SDK
  // process: every row mutates the measured B2 row.
  const OWNER = 'forge:gate';
  const READ_SOURCE = 'log:.forge/logs/commands.jsonl';
  /** The F15 descriptor: the measured descriptor naming Forge's gate as its semantic owner and its command log as its read source. */
  const owned = described({semantic_owner: OWNER, authoritative_read_source: READ_SOURCE});
  /** The same two values on a malformed (withheld) descriptor. */
  const withheldOwned = described({freshness: 'FRESH', semantic_owner: OWNER, authoritative_read_source: READ_SOURCE});
  /** A second, descriptor-less package, so "exactly one grouping edge per package" is judged over more than one package. */
  const SIBLING_REF = 'code:forge-sdk';
  const SIBLING: Json = {...DESCRIPTORLESS, ref: SIBLING_REF};
  /** The F5 edge (:198-199@9df9a03): workspace -> package, kind grouping, provenance forge-observer at the host's observedAt. */
  const grouping = (ref: string): ForgeObservedRelation => ({scope, from: workspaceRef, to: packageRef(ref), kind: 'grouping',
    provenance: {source: 'forge-observer', observedAt: context.observedAt}});
  /** F5's relation-kind scan (:206@9df9a03). */
  const RELATION_KINDS = /ownership|dependency|causation|hypothesis/;
  /** The adapter's own reason evidence reference (F1), built from envelope.reason_code: OWNER is its prefix. */
  const REASON_REF = 'forge:gate.status:FORGE_OK';
  /** Whatever the descriptor says: each row states a relation in the descriptor's own words, as a mutation of the measured descriptor. */
  const sayings: [string, Json][] = [
    ['semantic_owner forge:gate and authoritative_read_source log:.forge/logs/commands.jsonl (the F15 literals)', owned],
    ['a source_ref naming each relation kind', described({source_ref: ['ownership:forge:gate', 'dependency:code:forge-sdk', 'causation:cmd_9d1c4826a638', 'hypothesis:basis-stale']})],
    ['a semantic_owner and an authoritative_read_source naming the sibling package', described({semantic_owner: SIBLING_REF, authoritative_read_source: SIBLING_REF})],
    ['relation-shaped keys: an ownership kind, a dependency relation and a forge provenance with a native confirmation reference', described({kind: 'ownership', relation: 'dependency', provenance: {source: 'forge', nativeConfirmationRef: 'forge-operation:op-planted'}})],
    ['a malformed (withheld) descriptor carrying the F15 literals', withheldOwned],
  ];
  /** AC3's pairs: a descriptor carrying the two planted values beside its twin without them, well formed and withheld (wb-4ap.18
   * hoists the list out of the AC3 loop header so its shape can be pinned). */
  const AC3_PAIRS: [string, Json, Json][] = [
    ['well formed: the F15 descriptor beside the measured STALE row', owned, staleRow],
    ['withheld: the malformed F15 descriptor beside the malformed FRESH descriptor', withheldOwned, described({freshness: 'FRESH'})],
  ];
  /** wb-4ap.18: what a row's descriptor plants beyond the measured one - each last_result_state field whose value differs from
   * MEASURED_STATE, as key=JSON in key order; 'measured' when none differs, 'no descriptor' when the row carries none. */
  function planted(row: Json): string {
    const state = row.last_result_state;
    if (state === null || typeof state !== 'object' || Array.isArray(state)) return 'no descriptor';
    const keys = [...new Set([...Object.keys(MEASURED_STATE), ...Object.keys(state)])].sort();
    const said = keys.filter(key => JSON.stringify(state[key]) !== JSON.stringify(MEASURED_STATE[key])).map(key => `${key}=${JSON.stringify(state[key])}`);
    return said.length === 0 ? 'measured' : said.join(' ');
  }
  /** A projection fed only what forgeGateTopology states for [row, SIBLING]: its snapshots, then its relations. */
  function observed(row: Json): ObservationProjection {
    const result = forgeGateTopology(withPackages(row, SIBLING), context);
    const projection = new ObservationProjection();
    for (const snapshot of result.snapshots) expect(projection.refresh(snapshot)).toBe('applied');
    for (const relation of result.relations) projection.relate(relation);
    return projection;
  }
  /** A well-formed, exactly granted, operator-confirmed forge cancel by the scope's own principal: only ownership is left to decide it. */
  const cancel = (target: NativeRef, projection: ObservationProjection): ControlDecision => decideControl({scope, principal: {id: scope.principal},
    grants: ['control:forge.cancel'], target, action: 'cancel', params: {confirmed: true}, invocationId: 'inv-wb-4ap.7', requestedAt: '2026-10-15T07:00:02Z'},
  {projection, now: () => '2026-10-15T07:00:03Z'});
  /** control.ts:185@9df9a03: deny("no-confirmed-ownership", "authorization", "no confirmed lifecycle ownership"). */
  const NO_OWNER: ControlDecision = {decision: 'denied', category: 'authorization', reason: 'no confirmed lifecycle ownership', policy: 'no-confirmed-ownership'};
  const TARGETS = [workspaceRef, packageRef('code:pi-subagents'), packageRef(SIBLING_REF)];

  it('F15 table liveness (wb-4ap.7): the descriptor table holds all five sayings', () => expect(sayings).toHaveLength(5));

  // wb-4ap.18 (wb-4ap.7 test strength, PREP F1/F2 of gate cmd_0dd29fa73ef0): each inline table of this block pins its own shape as
  // an AC1-style literal derived from the table at d3404d3, so a swapped saying (H4), an emptied TARGETS (H2) or a cut AC3 pair
  // list (H3) reds instead of passing vacuously.
  it('F15 table shape (wb-4ap.18): the five sayings are pinned by name and by what each plants beyond the measured descriptor', () => {
    expect(sayings.map(([name, row]) => `${name} :: ${planted(row)}`)).toStrictEqual([
      'semantic_owner forge:gate and authoritative_read_source log:.forge/logs/commands.jsonl (the F15 literals) :: authoritative_read_source="log:.forge/logs/commands.jsonl" semantic_owner="forge:gate"',
      'a source_ref naming each relation kind :: source_ref=["ownership:forge:gate","dependency:code:forge-sdk","causation:cmd_9d1c4826a638","hypothesis:basis-stale"]',
      'a semantic_owner and an authoritative_read_source naming the sibling package :: authoritative_read_source="code:forge-sdk" semantic_owner="code:forge-sdk"',
      'relation-shaped keys: an ownership kind, a dependency relation and a forge provenance with a native confirmation reference :: kind="ownership" provenance={"source":"forge","nativeConfirmationRef":"forge-operation:op-planted"} relation="dependency"',
      'a malformed (withheld) descriptor carrying the F15 literals :: authoritative_read_source="log:.forge/logs/commands.jsonl" freshness="FRESH" semantic_owner="forge:gate"',
    ]);
  });

  it('AC3 pair liveness (wb-4ap.18): the AC3 table holds the well-formed and the withheld pair - each row is its twin plus the two planted values', () => {
    expect(AC3_PAIRS.map(([label, row, twin]) => `${label} :: ${planted(row)} | ${planted(twin)}`)).toStrictEqual([
      'well formed: the F15 descriptor beside the measured STALE row :: authoritative_read_source="log:.forge/logs/commands.jsonl" semantic_owner="forge:gate" | measured',
      'withheld: the malformed F15 descriptor beside the malformed FRESH descriptor :: authoritative_read_source="log:.forge/logs/commands.jsonl" freshness="FRESH" semantic_owner="forge:gate" | freshness="FRESH"',
    ]);
  });

  it('L3 target liveness (wb-4ap.18): the cancel targets are the workspace and both packages - three refs, pinned whole', () => {
    expect(TARGETS).toHaveLength(3);
    expect(TARGETS).toStrictEqual([
      {provider: 'forge', type: 'gate-status', id: 'workspace', scope: '/tmp/forge-ws'},
      {provider: 'forge', type: 'gate-status', id: 'code:pi-subagents', scope: '/tmp/forge-ws'},
      {provider: 'forge', type: 'gate-status', id: 'code:forge-sdk', scope: '/tmp/forge-ws'},
    ]);
  });

  it('F15 (wb-4ap.7): a descriptor carrying semantic_owner forge:gate and authoritative_read_source log:.forge/logs/commands.jsonl states only the single F5 grouping edge', () => {
    const result = forgeGateTopology(withPackages(owned), context);
    expect(result.relations).toStrictEqual([grouping('code:pi-subagents')]);
    expect(JSON.stringify(result)).not.toMatch(RELATION_KINDS);
    // The descriptor is read (its word and basis reach the package snapshot), and still states no relation.
    expect(result.snapshots[1].subjectBasis).toBe(B);
    expect(result.snapshots[1].node.statusText).toBe(`${F8_TEXT} · basis STALE`);
  });

  it.each(sayings)('wb-4ap.7: %s - exactly one forge-observer grouping edge per package, the descriptor-less relations unchanged, no other relation kind', (_name, row) => {
    const result = forgeGateTopology(withPackages(row, SIBLING), context);
    expect(result.relations).toStrictEqual([grouping('code:pi-subagents'), grouping(SIBLING_REF)]);
    expect(result.relations).toStrictEqual(forgeGateTopology(withPackages(DESCRIPTORLESS, SIBLING), context).relations);
    expect(JSON.stringify(result)).not.toMatch(RELATION_KINDS);
  });

  it('wb-4ap.7: the semantic_owner and authoritative_read_source values never appear in JSON.stringify(result), well formed or withheld', () => {
    const judged: string[] = [];
    for (const [label, row, twin] of AC3_PAIRS) {
      const result = forgeGateTopology(withPackages(row), context);
      const serialized = JSON.stringify(result);
      // OWNER is also the prefix of the adapter's own reason reference forge:gate.status:FORGE_OK (F1), built from
      // envelope.reason_code and never from the descriptor; that one landed reference is set aside first, as wb-4ap.3 sets
      // aside the reason code that holds CURRENT inside one word.
      expect(result.snapshots[0].evidenceRefs).toStrictEqual([REASON_REF]);
      expect(serialized.replaceAll(REASON_REF, '')).not.toContain(OWNER);
      expect(serialized).not.toContain(READ_SOURCE);
      // Neither value contributes anything: the row projects exactly as its twin without them.
      expect(result).toStrictEqual(forgeGateTopology(withPackages(twin), context));
      judged.push(label);
    }
    // wb-4ap.18: every pinned pair is judged - a loop cut to the well-formed pair reds here, a table cut reds AC3 pair liveness.
    expect(judged).toStrictEqual(AC3_PAIRS.map(([label]) => label));
  });

  it('L3 (wb-4ap.7): decideControl over a projection fed only forge-observer snapshots and relations denies a forge cancel on every node with no-confirmed-ownership, exactly as on 9df9a03', () => {
    // DESCRIPTORLESS is the 9df9a03 input shape (that adapter never read last_result_state); every saying decides as it does.
    const rows: [string, Json][] = [['the descriptor-less 9df9a03 row', DESCRIPTORLESS], ...sayings];
    for (const [name, row] of rows) {
      const projection = observed(row);
      expect(TARGETS.map(target => cancel(target, projection)), name).toStrictEqual(TARGETS.map(() => NO_OWNER));
    }
  });

  it('L3 liveness (wb-4ap.7): one hand-stated, natively confirmed forge ownership edge on the same projection permits - the denial is the missing statement, not an unresolvable target', () => {
    const projection = observed(owned);
    projection.relate({scope, from: workspaceRef, to: packageRef('code:pi-subagents'), kind: 'ownership',
      provenance: {source: 'forge', observedAt: context.observedAt, nativeConfirmationRef: 'forge-operation:op-hand-stated'}});
    expect(cancel(workspaceRef, projection)).toMatchObject({decision: 'permitted', receipt: {phase: 'requested', ownershipConfirmationRef: 'forge-operation:op-hand-stated'}});
    // The owned child holds no owner rights, and the sibling stays unowned.
    expect(cancel(packageRef('code:pi-subagents'), projection)).toStrictEqual(NO_OWNER);
    expect(cancel(packageRef(SIBLING_REF), projection)).toStrictEqual(NO_OWNER);
  });

  it('wb-4ap.7 static pin: forge-observer.ts spells no other relation kind, and its relations start empty and take exactly one push - the F5 statement built from scope, workspace, ref and observedAt', () => {
    const source = ts.createSourceFile('forge-observer.ts', workbenchSource('forge-observer.ts'), ts.ScriptTarget.Latest, true);
    const texts: string[] = [];
    const accesses: ts.PropertyAccessExpression[] = [];
    const declared: ts.VariableDeclaration[] = [];
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) texts.push(node.text);
      if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'relations') accesses.push(node);
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'relations') declared.push(node);
      ts.forEachChild(node, visit);
    };
    visit(source);
    // No string the module holds spells another relation kind, so the one kind it can state is the literal below.
    expect(texts.length).toBeGreaterThan(0);
    expect(texts.filter(text => RELATION_KINDS.test(text))).toStrictEqual([]);
    expect(declared.map(declaration => declaration.initializer?.getText(source))).toStrictEqual(['[]']);
    expect(accesses.map(access => access.name.text)).toStrictEqual(['push']);
    const call = accesses[0].parent;
    expect(ts.isCallExpression(call) ? call.arguments.map(argument => argument.getText(source)) : [])
      .toStrictEqual(["{scope: {...scope}, from: {...workspace}, to: {...ref}, kind: 'grouping', provenance: {source: 'forge-observer', observedAt}}"]);
  });
});

describe('wb-4ap.8 COLLECTIVE-ADAPTATION-R8: descriptor prose never surfaces; the descriptor contributes only its word and the subjectBasis facet', () => {
  const ESC = String.fromCodePoint(0x1b);
  const RLO = String.fromCodePoint(0x202e);
  const planted = described({note: `PLANTED-NOTE ${ESC}[2Jwipe${RLO}`, source_ref: ['PLANTED-REF#cmd_9'], state_class: 'PLANTED-CLASS', semantic_owner: 'PLANTED-OWNER', authoritative_read_source: 'PLANTED-SOURCE'});

  it('F16 (wb-4ap.8): a planted note, source_ref, state_class, semantic_owner and authoritative_read_source never surface, nor any control or bidi unit', () => {
    const result = forgeGateTopology(withPackages(planted), context);
    expect(JSON.stringify(result)).not.toMatch(/PLANTED-/);
    expect(JSON.stringify(result)).not.toMatch(UNSAFE);
    for (const snapshot of result.snapshots) for (const text of [snapshot.node.title, snapshot.node.statusText]) expect(text).not.toMatch(UNSAFE);
    for (const diagnostic of result.diagnostics) {
      expect(diagnostic).not.toMatch(/PLANTED-/);
      expect(diagnostic).not.toMatch(UNSAFE);
    }
  });

  it('wb-4ap.8: the measured descriptor prose never surfaces either - its note, source_ref entries, state_class and declared roots', () => {
    const serialized = JSON.stringify(forgeGateTopology(withPackages(staleRow), context));
    const refs = Array.isArray(MEASURED_STATE.source_ref) ? MEASURED_STATE.source_ref.filter((ref): ref is string => typeof ref === 'string') : [];
    const roots = Array.isArray(MEASURED_BASIS.declared_roots) ? MEASURED_BASIS.declared_roots.filter((root): root is string => typeof root === 'string' && root.includes('/')) : [];
    expect(refs.length).toBeGreaterThan(0);
    expect(roots.length).toBeGreaterThan(0);
    for (const prose of [String(MEASURED_STATE.note), String(MEASURED_STATE.state_class), ...refs, ...roots]) expect(serialized).not.toContain(prose);
  });

  it('wb-4ap.8: the descriptor contributes exactly its word and the subjectBasis facet - planted equals measured, and measured is the descriptor-less twin plus those two', () => {
    expect(forgeGateTopology(withPackages(planted), context)).toStrictEqual(forgeGateTopology(withPackages(staleRow), context));
    const plain = forgeGateTopology(withPackages(DESCRIPTORLESS), context).snapshots[1];
    expect(forgeGateTopology(withPackages(staleRow), context).snapshots[1]).toStrictEqual({...plain, subjectBasis: B, node: {...plain.node, statusText: `${plain.node.statusText} · basis STALE`}});
  });

  it('wb-4ap.8: a 300-character freshness is malformed under R3 - withheld as basis UNKNOWN, never truncated into presentation', () => {
    const long = `CURRENT${'Q'.repeat(293)}`;
    expect(long).toHaveLength(300);
    const result = forgeGateTopology(withPackages(described({freshness: long})), context);
    expect(result.snapshots[1].node.statusText).toBe(`${F8_TEXT} · basis UNKNOWN`);
    expect(ownKeys(result.snapshots[1])).not.toContain('subjectBasis');
    expect(result.diagnostics).toHaveLength(1);
    expect(JSON.stringify(result)).not.toContain('QQQQ');
    expect(JSON.stringify(result)).not.toContain('[truncated]');
  });
});
