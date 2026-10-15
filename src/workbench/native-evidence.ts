/** Read-only producer metadata projection. The original JSON remains the authoritative result. */
import type { JsonValue } from "./capability-registry.js";

export interface NativeEvidence {
  provider?: "forge" | "hyperunix" | "furnace" | "reactivefiber";
  nativeId?: string;
  domainStatus?: string;
  evidenceRefs?: string[];
  /** Native immutable source/graph basis, never the workspace directory. */
  sourceBasis?: string;
}

function record(value: JsonValue | undefined): Record<string, JsonValue> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value : undefined;
}
function text(value: JsonValue | undefined): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** Fields are specific to the pinned provider contracts; unknown/mismatched contracts project nothing. */
export function nativeEvidence(capabilityId: string, value: JsonValue): NativeEvidence {
  const native = record(value);
  if (native?.contract !== `${capabilityId}/v1`) return {};
  const source = record(native.source);
  if (!source) return {};
  const metadata: NativeEvidence = {};
  let id: string | undefined;
  let status: string | undefined;
  let basis: string | undefined;
  switch (capabilityId) {
    case "forge.gate.status": {
      metadata.provider = "forge";
      id = text(source.operation_id);
      status = text(source.status);
      const data = record(source.data);
      basis = text(data?.source_snapshot_id) ?? text(data?.gated_tree);
      break;
    }
    case "hyperunix.find": {
      if (source.representation !== "hyperunix.result/1") return {};
      metadata.provider = "hyperunix";
      id = text(source.execution_id);
      status = text(record(source.execution_status)?.kind);
      // HX digest is a query identity, not an immutable workspace/source basis.
      const evidence = record(source.evidence);
      const refs = [evidence?.support_ids, evidence?.derivation_handles]
        .flatMap(refs => Array.isArray(refs) ? refs.filter((ref): ref is string => typeof ref === "string" && ref.length > 0) : []);
      if (refs.length > 0) metadata.evidenceRefs = [...new Set(refs)];
      break;
    }
    case "furnace.run.inspect": {
      if (source.kind !== "run_inspect") return {};
      metadata.provider = "furnace";
      // @furnace/sdk Run.inspect() returns Envelope<RunDto>, not an invented run wrapper.
      const run = record(source.data);
      id = text(run?.run_id);
      status = text(run?.state);
      break;
    }
    case "reactivefiber.render.preview": {
      if (source.schema !== "reactive-fiber.cli/v1" || source.command !== "context.render") return {};
      metadata.provider = "reactivefiber";
      id = text(source.operation_id);
      basis = text(record(record(source.result)?.provenance)?.graph_revision_id);
      // `ok` describes CLI transport success; it is not a graph verification verdict.
      break;
    }
    default: return {};
  }
  if (id !== undefined) metadata.nativeId = id;
  if (status !== undefined) metadata.domainStatus = status;
  if (basis !== undefined && (/^sha256:[0-9a-f]{64}$/.test(basis) || /^[0-9a-f]{40,64}$/.test(basis) || /^dirty-tree\/v1:[0-9a-f]{40,64}:sha256:[0-9a-f]{64}$/.test(basis))) metadata.sourceBasis = basis;
  return metadata;
}
