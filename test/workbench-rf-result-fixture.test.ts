/** wb-973.11 (SCG-R11): the offline RF result fixture carries every result key the pinned rf 0.1.716 emits on a --no-commit render,
 * so additive-key admission and the exact pins (eight envelope keys, six work keys, ten work_metrics keys) are proven in the
 * default gate against the real pinned shape. The roster lives in test/fixtures/rf-result-keys.json with its rf version, source
 * kind and capture receipt recorded beside it. Nothing here needs an rf binary on the machine: a scripted stand-in prints the
 * fixture exactly as the provider's own producer-boundary suite does. */
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { CapabilityError, type JsonValue } from '../src/workbench/capability-registry.js';
import { type ObservationScope } from '../src/workbench/observation.js';
import { nativeReactiveFiberPreview } from '../src/workbench/providers/reactivefiber.js';
import { reactivefiberTopology } from '../src/workbench/reactivefiber-observer.js';
import { fullShapeRf, fullShapeWork, type Json, RF_FIXTURE_OPERATION_ID } from './helpers/rf-render-fixture.js';

interface Roster {
  rfVersion: string; source: 'captured' | 'constructed'; receipt: string | null; basis: string;
  resultKeys: string[]; provenanceKeys: string[]; workKeys: string[]; workMetricsKeys: string[];
}
const roster = JSON.parse(readFileSync(new URL('./fixtures/rf-result-keys.json', import.meta.url), 'utf8')) as Roster;

type Obj = { [key: string]: Json };
const asObject = (value: Json | undefined): Obj => {
  if (value === null || value === undefined || typeof value !== 'object' || Array.isArray(value)) throw new Error('expected an object');
  return value;
};
const resultOf = (envelope: Obj): Obj => asObject(envelope.result);
/** The census predicate: every roster key a fixture result lacks, by section. */
function missingKeys(result: Obj): string[] {
  const missing: string[] = [];
  for (const key of roster.resultKeys) if (!Object.hasOwn(result, key)) missing.push(`result.${key}`);
  const provenance = Object.hasOwn(result, 'provenance') ? asObject(result.provenance) : {};
  for (const key of roster.provenanceKeys) if (!Object.hasOwn(provenance, key)) missing.push(`provenance.${key}`);
  return missing;
}

const dirs: string[] = [];
const originalPath = process.env.PATH;
afterEach(() => { process.env.PATH = originalPath; for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });
function producer(reply: unknown): void {
  const dir = mkdtempSync(join(tmpdir(), 'rf-result-fixture-'));
  dirs.push(dir);
  const binary = join(dir, 'rf');
  writeFileSync(binary, `#!/usr/bin/env node\nprocess.stdout.write(JSON.stringify(${JSON.stringify(reply)}));\nprocess.exit(0);\n`);
  chmodSync(binary, 0o700);
  process.env.PATH = `${dir}:${originalPath ?? ''}`;
}

const ws = process.cwd();
const scope: ObservationScope = { workspace: ws, principal: 'local-operator:tester' };
const context = { scope, seam: 'rf-cli' as const, capturedAt: '2026-10-17T10:00:00Z', observedAt: '2026-10-17T10:00:01Z' };

describe('SCG-R11: full-shape offline RF result fixture', () => {
  // Acceptance 1 (census-grade RED on 9df9a03): the fixture's result keys are a superset of the frozen roster.
  it('SCG-R11: the offline RF result fixture carries every key the pinned rf emits', () => {
    const fixture = fullShapeRf(ws);
    const result = resultOf(fixture);
    expect(missingKeys(result)).toEqual([]);
    expect(Object.keys(asObject(result.work))).toHaveLength(6);
    expect(Object.keys(asObject(result.work_metrics))).toHaveLength(10);
    expect(Object.keys(asObject(result.work)).sort()).toEqual([...roster.workKeys].sort());
    expect(Object.keys(asObject(result.work_metrics)).sort()).toEqual([...roster.workMetricsKeys].sort());
    expect(Object.keys(fixture)).toHaveLength(8);
  });

  it('records the mirrored rf version, source kind and capture receipt beside the roster', () => {
    expect(roster.rfVersion).toBe('0.1.716');
    expect(['captured', 'constructed']).toContain(roster.source);
    if (roster.source === 'captured') expect(roster.receipt).toMatch(/^cmd_[0-9a-f]{12}$/);
    else expect(roster.receipt).toBeNull();
    expect(roster.basis.length).toBeGreaterThan(0);
    expect(new Set(roster.resultKeys).size).toBe(roster.resultKeys.length);
    expect(roster.workKeys).toHaveLength(6);
    expect(roster.workMetricsKeys).toHaveLength(10);
  });

  // Falsifier: the census itself fails when the fixture silently loses a roster key (never vacuous).
  it.each(roster.resultKeys)('the census names a fixture that drops result.%s', key => {
    const fixture = fullShapeRf(ws);
    const { [key]: _dropped, ...rest } = resultOf(fixture);
    // Dropping provenance also drops every provenance key beneath it, so the census names the whole subtree.
    const expected = key === 'provenance' ? ['result.provenance', ...roster.provenanceKeys.map(name => `provenance.${name}`)] : [`result.${key}`];
    expect(missingKeys(rest)).toEqual(expected);
  });
  it.each(roster.provenanceKeys)('the census names a fixture whose provenance drops %s', key => {
    const result = resultOf(fullShapeRf(ws));
    const { [key]: _dropped, ...provenance } = asObject(result.provenance);
    expect(missingKeys({ ...result, provenance })).toEqual([`provenance.${key}`]);
  });

  // Acceptance 2: nativeReactiveFiberPreview round-trips the full-shape fixture toEqual (extends the envelope-audit :76-80 row).
  it('admits the full-shape envelope: additive result keys survive the provider round-trip unchanged', async () => {
    const fixture = fullShapeRf(ws);
    producer(fixture);
    const result = await nativeReactiveFiberPreview('model', 'task', ws);
    expect(result).toEqual({ contract: 'reactivefiber.render.preview/v1', workspaceRoot: ws, source: fixture });
  });

  // Acceptance 2 (observer): the clean R1 case passes on the full shape.
  it('the observer projects the full-shape preview as one clean snapshot keyed by operation_id', async () => {
    producer(fullShapeRf(ws));
    const reading = await nativeReactiveFiberPreview('model', 'task', ws);
    const topology = reactivefiberTopology(reading as JsonValue, context);
    expect(topology.snapshots).toHaveLength(1);
    expect(topology.snapshots[0]?.source).toMatchObject({ provider: 'reactivefiber', type: 'context-preview', id: RF_FIXTURE_OPERATION_ID });
    expect(topology.snapshots[0]?.coverage).toBe('complete');
  });

  // Acceptance 3: the refusal tables stay green on the full shape (strictness is not loosened by the additive keys).
  it.each([
    ['extra top-level key', (e: Obj): Obj => ({ ...e, error: 'pretend success' })],
    ['claimed ephemeral storage write', (e: Obj): Obj => ({ ...e, result: { ...resultOf(e), work: { ...fullShapeWork(), storage_write_count: 1 } } })],
    ['seventh result.work key', (e: Obj): Obj => ({ ...e, result: { ...resultOf(e), work: { ...fullShapeWork(), seventh_count: 0 } } })],
    ['non-null ephemeral render id', (e: Obj): Obj => ({ ...e, result: { ...resultOf(e), render_id: 'rfr_aaaaaaaaaaaaaaaaaaaaaa' } })],
    ['non-null ephemeral commit sequence', (e: Obj): Obj => ({ ...e, result: { ...resultOf(e), commit_seq: 1 } })],
  ])('still refuses %s on the full shape', async (_label, mutate) => {
    producer(mutate(fullShapeRf(ws)));
    await expect(nativeReactiveFiberPreview('model', 'task', ws)).rejects.toBeInstanceOf(CapabilityError);
  });
});
