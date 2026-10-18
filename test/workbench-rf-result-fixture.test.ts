/** wb-973.11 (SCG-R11): the offline RF result fixture carries every result key the pinned rf 0.1.716 emits on a --no-commit render,
 * so additive-key admission and the exact pins (eight envelope keys, six work keys, ten work_metrics keys) are proven in the
 * default gate against the real pinned shape. The roster lives in test/fixtures/rf-result-keys.json with its rf version, source
 * kind and capture receipt recorded beside it, and is itself pinned here to a literal roster authored independently from the
 * ReactiveFiberCLI emitter at 8a8b83e4d, so an emptied, shrunken or renamed roster cannot hold the census green. The fixture home
 * is test/helpers/rf-render-fixture.ts (owner ruling R1 (b'), row 481): validRf()/result() in the envelope-audit and observer
 * suites stay the minimal cli_version-free pins. Provider rows run a scripted rf stand-in HERMETICALLY: an absolute node shebang
 * (process.execPath) and PATH restricted to the stand-in's own directory, so the provider can resolve no other rf and a stand-in
 * fault refuses as a launch failure, never as a render by a host rf; each refusal row pins its cause (category and message). The
 * live drift diff of a real capture against the same roster is the rf-preview tier's row (test/workbench-native-rf-preview.test.ts). */
import { createHash } from 'node:crypto';
import { chmodSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { CapabilityError, type JsonValue } from '../src/workbench/capability-registry.js';
import { ObservationProjection, type ObservationScope } from '../src/workbench/observation.js';
import { nativeReactiveFiberPreview } from '../src/workbench/providers/reactivefiber.js';
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from '../src/workbench/reactivefiber-observer.js';
import {
  diffAgainstRoster, fullShapeRf, fullShapeWork, fullShapeWorkMetrics, type Json, RF_FIXTURE_GRAPH_REVISION, RF_FIXTURE_OPERATION_ID,
  RF_FIXTURE_RELEASE, RF_FIXTURE_TEXT, RF_FIXTURE_WORKSPACE_ID, readRfResultRoster,
} from './helpers/rf-render-fixture.js';
import { installScratchLeakGuard, makeScratch, removeScratch } from './helpers/scratch.js';

installScratchLeakGuard();

/* The roster authored independently of test/fixtures/rf-result-keys.json (U5): read off the ReactiveFiberCLI emitter at
 * 8a8b83e4d, in the dossier's listing order, never from the JSON. A key is listed only when every finished --no-commit legacy
 * render carries it; view_id, effective_scopes and view_contract are conditional (render_service.py:1515-1526). necessity is NOT
 * conditional: step L always runs, so every finished --no-commit render emits it (render_service.py:1527-1532 and its comment). */
/** result: render_service.py:1494-1513 (output .. observations), :1533-1539 (attempts, superseded_transaction_ids,
 * fiber_transaction_refs), render.py:3569-3580 (the step-P ephemeral keys render_id, ephemeral, commit_seq, effects, plan) and
 * render_service.py:1527-1532 (necessity) and :1549 (session_id). */
const PINNED_RESULT_KEYS = [
  'output', 'budget', 'diagnostics_summary', 'blocks', 'components', 'provenance', 'work_metrics', 'work',
  'engine_metrics', 'scope', 'audience', 'bundle_revision_id', 'observations', 'necessity', 'attempts',
  'superseded_transaction_ids', 'fiber_transaction_refs',
  'ephemeral', 'render_id', 'commit_seq', 'session_id', 'effects', 'plan',
];
/** result.provenance, at least: context_show.py:313-339 (render_provenance emits seven keys; these three are the dossier's floor). */
const PINNED_PROVENANCE_KEYS = ['graph_revision_id', 'cli_version', 'sdk_versions'];
/** result.work: rendering.py:2606-2613 (WORK_KEYS, emission order). */
const PINNED_WORK_KEYS = [
  'source_capture_count', 'fiber_signal_count', 'component_render_count', 'lens_resolution_count', 'necessity_eval_count', 'storage_write_count',
];
/** result.work_metrics: integrations/fiber.py:2474-2485 (WORK_METRICS_KEYS, the ten-key set rendering.py:2617 names). */
const PINNED_WORK_METRICS_KEYS = [
  'source_capture_count', 'fiber_signal_count', 'fiber_transaction_count', 'invalidated_component_count', 'rendered_component_count',
  'state_read_count', 'state_write_count', 'journal_records_scanned', 'blob_bytes_written', 'history_rows_materialized',
];

const roster = readRfResultRoster();

type Obj = { [key: string]: Json };
const asObject = (value: Json | undefined): Obj => {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected an object');
  return value;
};
const resultOf = (envelope: Obj): Obj => asObject(envelope.result);
const without = (value: Obj, key: string): Obj => Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
const withResult = (envelope: Obj, over: Obj): Obj => ({ ...envelope, result: { ...resultOf(envelope), ...over } });
const digestOf = (text: string): string => createHash('sha256').update(text).digest('hex');

/** The diff a fixture whose result drops `key` must produce: that key, plus every roster key of a subtree it takes with it. */
function droppedFailures(key: string): string[] {
  const subtree = (name: string, keys: readonly string[]): string[] => [`missing result.${name}`, ...keys.map(child => `missing result.${name}.${child}`)];
  if (key === 'provenance') return subtree('provenance', PINNED_PROVENANCE_KEYS);
  if (key === 'work') return subtree('work', PINNED_WORK_KEYS);
  if (key === 'work_metrics') return subtree('work_metrics', PINNED_WORK_METRICS_KEYS);
  return [`missing result.${key}`];
}

const originalPath = process.env.PATH;
const standIns: string[] = [];
afterEach(() => {
  if (originalPath === undefined) Reflect.deleteProperty(process.env, 'PATH');
  else process.env.PATH = originalPath;
  removeScratch(...standIns.splice(0));
});
/** A hermetic rf stand-in that prints `reply` and exits 0: an absolute node shebang, and PATH holding only its own directory for
 * the call, so the provider's spawn("rf") resolves this file or nothing. `mode` 0o600 leaves it unexecutable (the hermeticity row). */
function standIn(reply: unknown, mode = 0o700): void {
  const dir = makeScratch('rf-result-fixture-');
  standIns.push(dir);
  const binary = join(dir, 'rf');
  writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(reply))});\n`);
  chmodSync(binary, mode);
  process.env.PATH = dir;
}

/** The error a synchronous observer call throws; fails the row when it returns instead. */
function thrownBy(fn: () => unknown): unknown {
  try {
    fn();
  } catch (error) {
    return error;
  }
  throw new Error('expected the observer to refuse');
}

const ws = process.cwd();
const scope: ObservationScope = { workspace: ws, principal: 'local-operator:tester' };
const context: ReactiveFiberTopologyContext = { scope, seam: 'rf-cli', capturedAt: '2026-10-17T10:00:00Z', observedAt: '2026-10-17T10:00:01Z' };
const reading = (source: Obj): Json => ({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: ws, source });
const UNRECOGNIZED = 'RF preview returned an unrecognized native envelope.';
const CONTRADICTORY = 'RF preview returned an unrecognized or contradictory envelope.';

/* The two Acceptance 3 refusal tables are named so each carries a length pin: an it.each over an unpinned literal registers
 * whatever rows it holds, so a dropped row (provider 5 -> 4, observer 3 -> 2) would leave every remaining case green. */
const OBSERVER_REFUSAL_ROWS = [
  ['ninth envelope key', (): Obj => ({ ...fullShapeRf(ws), extra: 1 }), 'source must be the strict eight-key rf envelope'],
  ['work with an extra key', (): Obj => withResult(fullShapeRf(ws), { work: { ...fullShapeWork(), extra: 1 } }), 'result.work needs exactly the six non-negative integer counters'],
  ['schema other', (): Obj => ({ ...fullShapeRf(ws), schema: 'reactive-fiber.cli/v2' }), 'source must be a reactive-fiber.cli/v1 context.render envelope'],
] as const;
const PROVIDER_REFUSAL_ROWS = [
  ['extra top-level key', (e: Obj): Obj => ({ ...e, error: 'pretend success' }), UNRECOGNIZED],
  ['claimed ephemeral storage write', (e: Obj): Obj => withResult(e, { work: { ...fullShapeWork(), storage_write_count: 1 } }), CONTRADICTORY],
  ['seventh result.work key', (e: Obj): Obj => withResult(e, { work: { ...fullShapeWork(), seventh_count: 0 } }), CONTRADICTORY],
  ['non-null ephemeral render id', (e: Obj): Obj => withResult(e, { render_id: 'rfr_aaaaaaaaaaaaaaaaaaaaaa' }), CONTRADICTORY],
  ['non-null ephemeral commit sequence', (e: Obj): Obj => withResult(e, { commit_seq: 1 }), CONTRADICTORY],
] as const;

describe('SCG-R11: full-shape offline RF result fixture', () => {
  // U5 (independent oracle): the roster file equals the independently authored literal, key for key and in order, at the
  // dossier's lengths (23 result / 3 provenance / 6 work / 10 work_metrics), so an emptied, shrunken or renamed roster is red here.
  it('the frozen roster equals the independently authored literal roster: 23 result, 3 provenance, 6 work and 10 work_metrics keys', () => {
    expect([PINNED_RESULT_KEYS.length, PINNED_PROVENANCE_KEYS.length, PINNED_WORK_KEYS.length, PINNED_WORK_METRICS_KEYS.length]).toStrictEqual([23, 3, 6, 10]);
    expect(roster.resultKeys).toStrictEqual(PINNED_RESULT_KEYS);
    expect(roster.provenanceKeys).toStrictEqual(PINNED_PROVENANCE_KEYS);
    expect(roster.workKeys).toStrictEqual(PINNED_WORK_KEYS);
    expect(roster.workMetricsKeys).toStrictEqual(PINNED_WORK_METRICS_KEYS);
  });

  // Acceptance 1 (census-grade): the fixture's result keys are a superset of the frozen roster, provenance carries the three
  // named keys, work has exactly 6 keys and work_metrics exactly 10, beside the eight envelope keys.
  it('SCG-R11: the offline RF result fixture carries every key the pinned rf emits', () => {
    const fixture = fullShapeRf(ws);
    const result = resultOf(fixture);
    const provenance = asObject(result.provenance);
    expect(roster.resultKeys.filter(key => !Object.keys(result).includes(key))).toStrictEqual([]);
    expect(['graph_revision_id', 'cli_version', 'sdk_versions'].filter(key => !Object.hasOwn(provenance, key))).toStrictEqual([]);
    expect(Object.keys(asObject(result.work))).toHaveLength(6);
    expect(Object.keys(asObject(result.work_metrics))).toHaveLength(10);
    expect(diffAgainstRoster(roster, result)).toStrictEqual({ failures: [], extraResultKeys: [] });
    expect(Object.keys(fixture)).toHaveLength(8);
    expect(provenance.cli_version).toBe(roster.rfVersion);
  });

  // Acceptance 4: the mirrored rf version, the source kind and the receipt; 'captured' only with a cmd_ receipt, else null.
  it('records the mirrored rf version, source kind and capture receipt beside the roster', () => {
    expect(roster.rfVersion).toBe('0.1.716');
    expect(['captured', 'constructed']).toContain(roster.source);
    if (roster.source === 'captured') expect(roster.receipt).toMatch(/^cmd_[0-9a-f]{12}$/);
    else expect(roster.receipt).toBeNull();
    expect(roster.basis).toContain('8a8b83e4d');
  });

  // Falsifiers over the literal roster (each table registers its cases whatever the JSON holds): the census names the drift.
  it.each(PINNED_RESULT_KEYS)('the census names a fixture that drops result.%s', key => {
    expect(diffAgainstRoster(roster, without(resultOf(fullShapeRf(ws)), key))).toStrictEqual({ failures: droppedFailures(key), extraResultKeys: [] });
  });
  it.each(PINNED_PROVENANCE_KEYS)('the census names a fixture whose provenance drops %s', key => {
    const result = resultOf(fullShapeRf(ws));
    expect(diffAgainstRoster(roster, { ...result, provenance: without(asObject(result.provenance), key) }).failures).toStrictEqual([`missing result.provenance.${key}`]);
  });
  it.each(PINNED_WORK_KEYS)('the census names a fixture whose work drops %s', key => {
    expect(diffAgainstRoster(roster, { ...resultOf(fullShapeRf(ws)), work: without(fullShapeWork(), key) }).failures).toStrictEqual([`missing result.work.${key}`]);
  });
  it.each(PINNED_WORK_METRICS_KEYS)('the census names a fixture whose work_metrics drops %s', key => {
    expect(diffAgainstRoster(roster, { ...resultOf(fullShapeRf(ws)), work_metrics: without(fullShapeWorkMetrics(), key) }).failures)
      .toStrictEqual([`missing result.work_metrics.${key}`]);
  });
  it('the census names a work or work_metrics key beyond the roster, and records an extra result key without failing on it', () => {
    const result = resultOf(fullShapeRf(ws));
    expect(diffAgainstRoster(roster, { ...result, work: { ...fullShapeWork(), seventh_count: 0 } }).failures).toStrictEqual(['unexpected result.work.seventh_count']);
    expect(diffAgainstRoster(roster, { ...result, work_metrics: { ...fullShapeWorkMetrics(), eleventh_count: 0 } }).failures)
      .toStrictEqual(['unexpected result.work_metrics.eleventh_count']);
    // The measured rf 0.1.723 shape: retry_work (after the pin) rides beside the roster; necessity is a roster member since the pin.
    expect(diffAgainstRoster(roster, { ...result, retry_work: { superseded_attempts: [] } }))
      .toStrictEqual({ failures: [], extraResultKeys: ['retry_work'] });
  });

  // Acceptance 2: nativeReactiveFiberPreview round-trips the full-shape fixture (extends the envelope-audit admission row).
  // Positive protection (gate F4): these full-shape rows are the guard of additive-key admission; keep them.
  it('admits the full-shape envelope: additive result keys survive the provider round-trip unchanged', async () => {
    const fixture = fullShapeRf(ws);
    standIn(fixture);
    expect(await nativeReactiveFiberPreview('model', 'task', ws)).toStrictEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: ws, source: fixture });
  });

  // Acceptance 2 (observer), at the landed R1 row's strength: the full-shape provider reading projects one clean snapshot,
  // toStrictEqual, with the stated release as the distinct rf-cli reference and never as sourceVersion (owner ruling G-A).
  it('R1 on the full shape: the observer projects the provider reading as one clean snapshot with the rf-cli release reference', async () => {
    standIn(fullShapeRf(ws));
    const topology = reactivefiberTopology((await nativeReactiveFiberPreview('model', 'task', ws)) as JsonValue, { ...context, invocationId: 'wf_rf_1' });
    expect(topology.snapshots).toHaveLength(1);
    const snapshot = topology.snapshots[0];
    expect(snapshot).toStrictEqual({
      source: { provider: 'reactivefiber', type: 'context-preview', id: RF_FIXTURE_OPERATION_ID, scope: ws }, scope,
      capturedAt: context.capturedAt, observedAt: context.observedAt, coverage: 'complete',
      node: { title: `RF context preview ${RF_FIXTURE_OPERATION_ID}`, type: 'sdk-operation', statusTone: 'success',
        statusText: 'noncommitted preview (rf-cli) · 989760 of 1000000 context tokens available · necessity evals 0 · 0 errors, 0 warnings' },
      kind: 'reactivefiber.render.preview.snapshot',
      evidenceRefs: [`rf-graph:${RF_FIXTURE_GRAPH_REVISION}`, `rf-workspace:${RF_FIXTURE_WORKSPACE_ID}`, `rf-cli:${RF_FIXTURE_RELEASE}`],
      sourceRevision: RF_FIXTURE_GRAPH_REVISION, nativePayloadRef: `rf-output:sha256:${digestOf(RF_FIXTURE_TEXT)}`, trace: { invocationId: 'wf_rf_1' },
    });
    expect(snapshot).not.toHaveProperty('sourceVersion');
    expect(topology.relations).toStrictEqual([]);
    expect(topology.diagnostics).toContain(`producer release from result.provenance.cli_version: rf@${RF_FIXTURE_RELEASE}`);
    expect(topology.diagnostics.join('\n')).toContain('noncommitted');
    const projection = new ObservationProjection();
    expect(projection.refresh(snapshot)).toBe('applied');
    expect(projection.query({ scope, limit: 10, evidence: `rf-cli:${RF_FIXTURE_RELEASE}` }).nodes.map(node => node.nativeRef.id)).toStrictEqual([RF_FIXTURE_OPERATION_ID]);
    expect(projection.query({ scope, limit: 10, version: RF_FIXTURE_RELEASE }).nodes).toStrictEqual([]);
  });

  // Acceptance 3 (observer): the named refusal rows replayed on the full shape, each for its own cause.
  it('the observer refusal table keeps its 3 rows', () => {
    expect(OBSERVER_REFUSAL_ROWS).toHaveLength(3);
  });
  it.each(OBSERVER_REFUSAL_ROWS)('the observer still refuses %s on the full shape', (_label, source, cause) => {
    const error = thrownBy(() => reactivefiberTopology(reading(source()) as JsonValue, context));
    expect(error).toBeInstanceOf(CapabilityError);
    expect(error).toMatchObject({ category: 'validation', message: `ReactiveFiber topology refused: ${cause}.` });
  });

  // Acceptance 3 (provider): strictness is not loosened by the additive keys, and each row refuses for its own cause.
  it('the provider refusal table keeps its 5 rows', () => {
    expect(PROVIDER_REFUSAL_ROWS).toHaveLength(5);
  });
  it.each(PROVIDER_REFUSAL_ROWS)('still refuses %s on the full shape, for that cause', async (_label, mutate, message) => {
    standIn(mutate(fullShapeRf(ws)));
    const refusal = nativeReactiveFiberPreview('model', 'task', ws);
    await expect(refusal).rejects.toBeInstanceOf(CapabilityError);
    await expect(refusal).rejects.toMatchObject({ category: 'transport', message });
  });

  // Hermeticity: with PATH restricted to the stand-in's directory, a stand-in that cannot execute is a launch failure; it can
  // never fall through to a host rf (which would refuse 'unavailable' for its own workspace instead).
  it('the stand-in is hermetic: one that cannot execute refuses as a launch failure and never reaches a host rf', async () => {
    standIn(fullShapeRf(ws), 0o600);
    await expect(nativeReactiveFiberPreview('model', 'task', ws)).rejects.toMatchObject({ category: 'transport', message: 'RF preview could not launch the installed binary.' });
  });
});
