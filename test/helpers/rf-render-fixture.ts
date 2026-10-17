/** wb-973.11 (SCG-R11): the offline rf `context render --no-commit` envelope, built in the shape the pinned rf emits. Shared by the
 * R11 census and its admission rows. The older cli_version-free fixture in test/workbench-provider-envelope-audit.test.ts is
 * deliberately left as the minimal-shape pin (wb-2j3.9 acceptance (c)); this module is the full-shape counterpart. */
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const id = 'a'.repeat(22);
const digest = (fill: string): string => `sha256:${fill.repeat(64)}`;

export const RF_FIXTURE_WORKSPACE_ID = `rfw_${id}`;
export const RF_FIXTURE_OPERATION_ID = `rfo_${id}`;

export function fullShapeWork(): JsonObject {
  return { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 };
}

export function fullShapeWorkMetrics(): JsonObject {
  return {
    source_capture_count: 0, fiber_signal_count: 0, fiber_transaction_count: 0, invalidated_component_count: 0,
    rendered_component_count: 0, state_read_count: 0, state_write_count: 0, journal_records_scanned: 7,
    blob_bytes_written: 0, history_rows_materialized: 0,
  };
}

export function fullShapeRf(workspaceRoot: string): JsonObject {
  return {
    schema: 'reactive-fiber.cli/v1', ok: true, command: 'context.render',
    operation_id: RF_FIXTURE_OPERATION_ID, workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: workspaceRoot },
    transaction_id: null,
    result: {
      output: { text: 'context', size_bytes: 7, digest: digest('b'), path: null },
      budget: {
        schema: 'reactive-fiber.budget/v1', requested_model_id: 'model', resolved_model_id: null,
        formula_terms: { context_window: 1000000, max_output_tokens: 16000, output_reserve: 8192, occupied_tokens: 0, overhead: 0, safety_margin: 2048, available_context_tokens: 989760 },
      },
      diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
      blocks: [], components: [],
      provenance: {
        created_at: '2026-10-17T15:47:30.870680Z', graph_revision_id: digest('a'), necessity_policy_revision_id: digest('c'),
        workspace_schema_version: 'reactive-fiber.workspace/v1', cli_version: '0.1.716', storage_backend: 'jsonl',
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
      scope: null, audience: 'model', bundle_revision_id: digest('2'), observations: [], attempts: 1,
      superseded_transaction_ids: [], fiber_transaction_refs: [],
      render_id: null, ephemeral: true, commit_seq: null, session_id: null, effects: [], plan: { operations: [], would_commit: false },
    },
    diagnostics: [],
  };
}
