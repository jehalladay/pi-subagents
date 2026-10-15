/** wb-6hb.2 (W13/VC-2): the Forge gate.status reader adapter. It consumes exactly what readForgeGateStatus returns
 * (docs/workbench/09 § Reader adapters) and projects read-model snapshots plus display-scope grouping edges.
 * Quotes are from docs/workbench on branch workbench/implementation-program. */
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import type * as ForgeSdk from '@forge/sdk';
import {afterAll, describe, expect, expectTypeOf, it, vi} from 'vitest';
import {CapabilityError, CapabilityRegistry, type JsonValue} from '../src/workbench/capability-registry.js';
import {type ForgeObservedRelation, forgeGateTopology} from '../src/workbench/forge-observer.js';
import {nativeEvidence} from '../src/workbench/native-evidence.js';
import {type NativeRef, ObservationProjection} from '../src/workbench/observation.js';
import {readForgeGateStatus, registerForgeGateStatus, registerNativeForgeGateStatus} from '../src/workbench/providers/forge.js';

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
const UNSAFE = /[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/;
function thrown(fn: () => unknown): unknown {
  try { fn(); } catch (error) { return error; }
  throw new Error('expected forgeGateTopology to refuse');
}

describe('Forge gate.status reader adapter', () => {
  it('states exactly the relation statement ObservationProjection.relate accepts', () => {
    expectTypeOf<ForgeObservedRelation>().toEqualTypeOf<Parameters<ObservationProjection['relate']>[0]>();
    expectTypeOf(forgeGateTopology).parameter(0).toEqualTypeOf<JsonValue>();
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
    ['a ref carrying a bidi override', withPackages({ref: 'code:‮pi'})],
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
      data: {packages: [{ref: 'code:pi-subagents', last_result: `\u001b[2Jsuccess${'S'.repeat(5_000)}`, authoritative_current: false, unverified_reason: 'Bearer abc123‮'}]}});
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
