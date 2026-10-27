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
 * 0.1.716 by wb-973.17, then from 0.1.768 by wb-c7ku). */
export const RF_FIXTURE_RELEASE = '0.1.784';
/** wb-hs2j.1 (RF-REACTIVE-CONTEXT-ASSEMBLY-R1): the one candidate the fixture's document includes, as rf states it twice: its row of
 * result.blocks (context.render.schema.json :628-640 at ReactiveFiberCLI 6a251bf73af5: final_index, candidate_key, component_id,
 * the priced token_cost and its token_cost_kind) and its judged result.necessity decision record (:907-936: the eight required
 * keys, include true). Shapes read off the rf 0.1.709 dogfood capture docs/dogfood/ReactiveFiberCLI-2026-10-16/steps/
 * 15-context-render.out at 6a251bf73af5 (its first block and decision), the render_id and optional keys left out. A render
 * stating neither list, or no block, is not a complete document, so the clean fixtures carry this pair. */
export const RF_FIXTURE_CANDIDATE_KEY = 'fixture.component:main::summary';
export function rfFixtureBlock(): JsonObject {
  return { final_index: 0, candidate_key: RF_FIXTURE_CANDIDATE_KEY, component_id: 'fixture.component', token_cost: { kind: 'estimated', tokens: 2 }, token_cost_kind: 'estimated' };
}
/** A judged decision record: included, the always floor (domain/necessity.py:242 ALWAYS_FLOOR); withheld, a task_conditional
 * candidate no rule matched (:255 TASK_CONDITIONAL_NO_MATCH, the default_task_conditional withhold), never an always
 * candidate, which rf refuses to withhold (integrations/components.py:3024-3026 at 6a251bf73af5). */
export function rfFixtureDecision(include = true, candidateKey: string = RF_FIXTURE_CANDIDATE_KEY): JsonObject {
  return {
    candidate_key: candidateKey, necessity_class: include ? 'always' : 'task_conditional', include,
    reason: include ? 'always_floor' : 'task_conditional_no_match',
    judge_id: 'rf.necessity.default-host.v1', judge_kind: 'host_default', fallback_used: false, failure_mode: 'fail',
  };
}

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
      blocks: [rfFixtureBlock()], components: [],
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
        // rf 0.1.784 (DOLT-A29 AC3): the eighth provenance key, the committing backend beside its engine version (null on jsonl).
        storage: { backend: 'jsonl', engine_version: null },
      },
      work_metrics: fullShapeWorkMetrics(), work: fullShapeWork(),
      engine_metrics: { tsx_worker_spawns: 0, tsx_resource_rounds: 0 },
      scope: null, audience: 'model', bundle_revision_id: digest('2'), observations: [], necessity: [rfFixtureDecision()], attempts: 1,
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
 * key missing when the object is absent or not an object); then, held to a CAPTURED roster, `unexpected result.<key>` for every
 * result key beyond it, sorted. `extraResultKeys` are the result keys beyond the roster, sorted, recorded for every roster. A
 * captured roster is exhaustive in both directions (owner ruling R649 (3), wb-973.20): a silent new key is the rf surface drift
 * the pin exists to catch, and the legitimate path for one is the gated rf-pin-bump cut that re-captures the roster. A
 * constructed roster (read off the emitter, before a capture promotes it) is a floor: the provider admits additive keys, so beyond
 * it they are recorded, never a failure. Last come the freeze-and-flip tripwire's entries (wb-grmo.1, speculativeMarkers below),
 * under every roster whatever its source: `speculative <path>` for a speculative member or marker key, `speculative label <path>`
 * for a speculative label, sorted. */
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
  if (roster.source === 'captured') for (const key of extraResultKeys) failures.push(`unexpected result.${key}`);
  failures.push(...speculativeMarkers(result));
  return { failures, extraResultKeys };
}

/** wb-grmo.1 (RF-PREDICTIVE-WORLD-MODEL-CONTEXT-R1, the until-then leg): the SCG-R11 roster diff's freeze-and-flip tripwire. RFCLI
 * serves a labeled WhatIf view on `rf context render --scenario PATH` from 0.1.844 on (RFCLI 8bd35ecd4651); Pi's legacy and --view
 * argv never pass --scenario and rf states these members absent on those renders, so a capture of Pi's own arms names none of
 * them at any pinned release (measured on a real rf 0.1.845 render). FREEZE: until Pi's refusal cases
 * exist (both readers refuse a speculative-marked result as 'validation', a speculative render lives only behind its own
 * capability id and grant), every tier that holds a result to the roster fails on any name below, whatever the roster's source,
 * so a pin-bump re-capture cannot adopt a speculative member as a roster key. FLIP: the cut that adds those cases replaces this
 * tripwire with them. The names are producer facts measured at RFCLI 8bd35ecd4651 and the installed rf 0.1.845; the census
 * test/workbench-rf-speculative-context-census.test.ts holds them to its roster. */
/** The nine result members rf states exactly on a --scenario render and on no legacy or --view render (context.render.schema.json
 * $defs/result), read as top-level result members only: several are ordinary words (notice, labels, suppressions). */
export const SPECULATIVE_RESULT_KEYS: readonly string[] = [
  'speculative', 'notice', 'labels', 'exclusion_stages', 'counts_by_stage', 'suppressions', 'lens_snapshots', 'rendered_output', 'effects_denied',
];
/** Marker keys read at any depth: the design name ScenarioResult.rendered_speculative_view (02-architecture.md:9@82bd879eee52),
 * the two host markers rf stamps in the metadata of a block rendered from a scenario (domain/scenario.py SCENARIO_ID_MARKER_KEY,
 * EPISTEMIC_STATUS_MARKER_KEY), and the scenario identity keys, which no pinned or installed schema property spells outside a
 * scenario member. */
export const SPECULATIVE_MARKER_KEYS: readonly string[] = ['rendered_speculative_view', 'rf.scenario_id', 'rf.epistemic_status', 'scenario_id', 'scenario'];
/** Label values read exactly, at any depth: the notice block's key (application/scenario_view.py NOTICE_BLOCK_KEY). */
export const SPECULATIVE_LABEL_VALUES: readonly string[] = ['rf.whatif_notice'];
/** The notice line that opens a WhatIf document's output.text (application/scenario_view.py WhatIfNotice.text). */
export const SPECULATIVE_TEXT_PREFIX = 'WHAT-IF VIEW of scenario ';

/** A key appended to a path: `.key` for an identifier, `["key"]` for any other spelling (rf.scenario_id). */
function keyPath(path: string, key: string): string {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key) ? `${path}.${key}` : `${path}[${JSON.stringify(key)}]`;
}

/** The tripwire's reading of one render result, sorted: a top-level SPECULATIVE_RESULT_KEYS member, present whatever its value,
 * and a SPECULATIVE_MARKER_KEYS key at any depth each give `speculative <path>` (neither is read further); a string equal to a
 * SPECULATIVE_LABEL_VALUES entry at any depth, and a result.output.text opening with SPECULATIVE_TEXT_PREFIX, each give
 * `speculative label <path>`. Keys are read in rf's exact spelling and labels only where rf places them, so a marker word inside
 * free text is not read. An object reached twice is read once. */
export function speculativeMarkers(result: Readonly<Record<string, unknown>>): string[] {
  const found: string[] = [];
  const seen = new WeakSet<object>([result]);
  const visit = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      if (SPECULATIVE_LABEL_VALUES.includes(value)) found.push(`speculative label ${path}`);
      return;
    }
    if (value === null || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) {
      for (const [index, item] of value.entries()) visit(item, `${path}[${index}]`);
      return;
    }
    for (const [key, item] of Object.entries(value)) {
      const at = keyPath(path, key);
      if (SPECULATIVE_MARKER_KEYS.includes(key)) found.push(`speculative ${at}`);
      else visit(item, at);
    }
  };
  for (const [key, item] of Object.entries(result)) {
    const at = keyPath('result', key);
    if (SPECULATIVE_RESULT_KEYS.includes(key) || SPECULATIVE_MARKER_KEYS.includes(key)) found.push(`speculative ${at}`);
    else visit(item, at);
  }
  const output = isRecord(result.output) ? result.output : undefined;
  if (typeof output?.text === 'string' && output.text.startsWith(SPECULATIVE_TEXT_PREFIX)) found.push('speculative label result.output.text');
  return found.sort();
}
