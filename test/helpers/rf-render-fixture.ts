/** wb-973.11 (SCG-R11): the offline rf `context render --no-commit` envelope, built in the shape the pinned rf emits, the frozen
 * key roster it is held to (test/fixtures/rf-result-keys.json) and the one roster diff both tiers use: the default-gate census in
 * test/workbench-rf-result-fixture.test.ts holds this fixture to the roster, and the rf-preview tier
 * (test/workbench-native-rf-preview.test.ts) holds a live --no-commit capture from the installed rf to it. The older
 * cli_version-free fixture in test/workbench-provider-envelope-audit.test.ts stays the minimal-shape pin (wb-2j3.9 acceptance (c));
 * this module is the full-shape counterpart, accepted by name as the fixture home (owner ruling R1 (b'), row 481). */
import { readFileSync } from 'node:fs';

export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const id = 'a'.repeat(22);
const digest = (fill: string): string => `sha256:${fill.repeat(64)}`;

export const RF_FIXTURE_WORKSPACE_ID = `rfw_${id}`;
export const RF_FIXTURE_OPERATION_ID = `rfo_${id}`;
/** The fixture's result.provenance.graph_revision_id. */
export const RF_FIXTURE_GRAPH_REVISION = digest('a');
/** The fixture's result.output.text. */
export const RF_FIXTURE_TEXT = 'context';
/** The producer release the fixture states in result.provenance.cli_version: the pinned rf the roster mirrors (re-pinned from
 * 0.1.716 by wb-973.17). */
export const RF_FIXTURE_RELEASE = '0.1.768';

export function fullShapeWork(): JsonObject {
  return { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 };
}

export function fullShapeWorkMetrics(): JsonObject {
  return {
    source_capture_count: 0, fiber_signal_count: 0, fiber_transaction_count: 0, invalidated_component_count: 0,
    rendered_component_count: 0, state_read_count: 0, state_write_count: 0, journal_records_scanned: 7,
    blob_bytes_written: 0, history_rows_materialized: 0,
    reused_component_count: 0, observation_executed_count: 0, observation_reused_count: 0, publish_conflict_count: 0,
  };
}

/** result.retry_work at the pinned rf (PMO-13-a): no superseded attempt and one zero wasted_<key> per work_metrics key. */
export function fullShapeRetryWork(): JsonObject {
  return { superseded_attempts: [], ...Object.fromEntries(Object.keys(fullShapeWorkMetrics()).map(key => [`wasted_${key}`, 0])) };
}

export function fullShapeRf(workspaceRoot: string): JsonObject {
  return {
    schema: 'reactive-fiber.cli/v1', ok: true, command: 'context.render',
    operation_id: RF_FIXTURE_OPERATION_ID, workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: workspaceRoot },
    transaction_id: null,
    result: {
      output: { text: RF_FIXTURE_TEXT, size_bytes: 7, digest: digest('b'), path: null },
      budget: {
        schema: 'reactive-fiber.budget/v1', requested_model_id: 'model', resolved_model_id: null,
        formula_terms: { context_window: 1000000, max_output_tokens: 16000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 },
      },
      diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
      blocks: [], components: [],
      provenance: {
        created_at: '2026-10-17T15:47:30.870680Z', graph_revision_id: RF_FIXTURE_GRAPH_REVISION, necessity_policy_revision_id: digest('c'),
        workspace_schema_version: 'reactive-fiber.workspace/v1', cli_version: RF_FIXTURE_RELEASE, storage_backend: 'jsonl',
        sdk_versions: {
          fiber_optics: { distribution_version: '0.1.0', contract_fingerprint: digest('d') },
          reactive_lenses: { distribution_version: '0.1.1', contract_fingerprint: digest('e') },
          reactive_components: { distribution_version: '0.1.1', contract_fingerprint: digest('f') },
          reactive_inference: { distribution_version: '0.2.55', contract_fingerprint: digest('1') },
          fiber_optics_wire_format: '2',
        },
      },
      work_metrics: fullShapeWorkMetrics(), work: fullShapeWork(),
      engine_metrics: { tsx_worker_spawns: 0, tsx_resource_rounds: 0 },
      scope: null, audience: 'model', bundle_revision_id: digest('2'), observations: [], necessity: [], attempts: 1,
      superseded_transaction_ids: [], retry_work: fullShapeRetryWork(), fiber_transaction_refs: [],
      render_id: null, ephemeral: true, commit_seq: null, session_id: null, effects: [], plan: { operations: [], would_commit: false },
    },
    diagnostics: [],
  };
}

/** test/fixtures/rf-result-keys.json: the result keys the pinned rf emits on every --no-commit render, with the mirrored rf
 * version, how the roster was obtained and the capture receipt that would promote it to 'captured'. */
export interface RfResultRoster {
  rfVersion: string;
  source: 'captured' | 'constructed';
  receipt: string | null;
  basis: string;
  resultKeys: string[];
  provenanceKeys: string[];
  workKeys: string[];
  workMetricsKeys: string[];
}

const ROSTER_URL = new URL('../fixtures/rf-result-keys.json', import.meta.url);
const ROSTER_FIELDS = ['rfVersion', 'source', 'receipt', 'basis', 'resultKeys', 'provenanceKeys', 'workKeys', 'workMetricsKeys'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringList(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === 'string' && item.length > 0)) {
    throw new Error(`rf-result-keys.json: ${field} must be a list of non-empty strings`);
  }
  const list = value.map(item => String(item));
  if (new Set(list).size !== list.length) throw new Error(`rf-result-keys.json: ${field} repeats a key`);
  return list;
}

/** Parses and shape-checks the roster: exactly the eight fields, the source kind closed to 'captured' | 'constructed', every
 * key list a duplicate-free list of non-empty strings. A malformed roster throws naming the field, so no tier can read it. */
export function readRfResultRoster(): RfResultRoster {
  const parsed: unknown = JSON.parse(readFileSync(ROSTER_URL, 'utf8'));
  if (!isRecord(parsed)) throw new Error('rf-result-keys.json: the roster must be a JSON object');
  const extra = Object.keys(parsed).filter(key => !ROSTER_FIELDS.includes(key));
  const missing = ROSTER_FIELDS.filter(key => !Object.hasOwn(parsed, key));
  if (extra.length > 0 || missing.length > 0) {
    throw new Error(`rf-result-keys.json: fields must be exactly ${ROSTER_FIELDS.join(', ')} (missing ${missing.join(', ') || 'none'}; extra ${extra.join(', ') || 'none'})`);
  }
  const { rfVersion, source, receipt, basis } = parsed;
  if (typeof rfVersion !== 'string' || rfVersion.length === 0) throw new Error('rf-result-keys.json: rfVersion must be a non-empty string');
  if (source !== 'captured' && source !== 'constructed') throw new Error("rf-result-keys.json: source must be 'captured' or 'constructed'");
  if (receipt !== null && typeof receipt !== 'string') throw new Error('rf-result-keys.json: receipt must be a string or null');
  if (typeof basis !== 'string' || basis.length === 0) throw new Error('rf-result-keys.json: basis must be a non-empty string');
  return {
    rfVersion, source, receipt, basis,
    resultKeys: stringList(parsed.resultKeys, 'resultKeys'), provenanceKeys: stringList(parsed.provenanceKeys, 'provenanceKeys'),
    workKeys: stringList(parsed.workKeys, 'workKeys'), workMetricsKeys: stringList(parsed.workMetricsKeys, 'workMetricsKeys'),
  };
}

/** What a render result holds against the roster. `failures` is the drift a tier fails on, one entry per key path, in roster
 * order: `missing result.<key>` for a roster result key the result lacks, `missing result.provenance.<key>` for a roster
 * provenance key its provenance lacks (all three when provenance is absent), and `missing` / `unexpected`
 * `result.work.<key>` and `result.work_metrics.<key>` wherever those objects differ from the roster's exact key sets (every roster
 * key missing when the object is absent or not an object). `extraResultKeys` are the result keys beyond the roster, sorted: an
 * rf newer than the pin may add result keys and the provider admits them, so they are recorded, never a failure. */
export interface RfRosterDiff {
  failures: string[];
  extraResultKeys: string[];
}

function exactKeys(path: string, value: unknown, expected: readonly string[], failures: string[]): void {
  const actual = isRecord(value) ? Object.keys(value) : [];
  for (const key of expected) if (!actual.includes(key)) failures.push(`missing ${path}.${key}`);
  for (const key of actual) if (!expected.includes(key)) failures.push(`unexpected ${path}.${key}`);
}

export function diffAgainstRoster(roster: RfResultRoster, result: Readonly<Record<string, unknown>>): RfRosterDiff {
  const failures: string[] = [];
  for (const key of roster.resultKeys) if (!Object.hasOwn(result, key)) failures.push(`missing result.${key}`);
  const provenance = isRecord(result.provenance) ? result.provenance : {};
  for (const key of roster.provenanceKeys) if (!Object.hasOwn(provenance, key)) failures.push(`missing result.provenance.${key}`);
  exactKeys('result.work', result.work, roster.workKeys, failures);
  exactKeys('result.work_metrics', result.work_metrics, roster.workMetricsKeys, failures);
  const extraResultKeys = Object.keys(result).filter(key => !roster.resultKeys.includes(key)).sort();
  return { failures, extraResultKeys };
}
