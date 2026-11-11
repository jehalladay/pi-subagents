/**
 * GraphPolicy adapter basis contract (GPC-EAT-R013, MechanicalWorkflows-93ze). Edge code: the
 * GraphDataIR is external and unpinned, so this module models only the consumed subset — nodes
 * with a source id and a closed kind enum. Every candidate Intent the adapter produces carries
 * expectedRevision equal to the pinned Basis.revision (whole-basis staleness; reconcile rejects
 * a stale one with INTENT_BASIS_STALE) and a target.uri that round-trips exactly to the
 * GraphDataIR source id. Per-entity revisions are recorded as the literal "unknown": no
 * identity/revision model exists for agents, resources or artifacts yet, and a fabricated
 * per-entity revision is refused rather than trusted (per-entity staleness stays TARGET).
 */
import type { Basis, Intent, ResourceClaim } from "./contracts.js";

export type GraphDataNodeKind = "agent" | "task" | "resource" | "artifact" | "capability";

export interface GraphDataNode {
  readonly sourceId: string;
  readonly kind: GraphDataNodeKind;
}

export interface GraphData {
  readonly nodes: readonly GraphDataNode[];
}

export interface GraphActionSpec {
  readonly effect: string;
  readonly claim: ResourceClaim;
  readonly evidenceRefs: readonly string[];
  readonly writeScopes: readonly string[];
  readonly readScopes: readonly string[];
}

export interface GraphPolicyAdapterInput {
  readonly basis: Basis;
  readonly policyId: string;
  readonly graph: GraphData;
  readonly action: (sourceId: string) => GraphActionSpec;
}

export interface GraphDecisionSidecar {
  readonly schema: "mw.graph-policy-sidecar.v1";
  readonly basis: Basis;
  /** The literal "unknown" per entity until an identity/revision model exists (C018). */
  readonly entityRevisions: Readonly<Record<string, "unknown">>;
}

export interface GraphPolicyAdapter {
  /** One candidate Intent per source id; target.uri IS the source id, expectedRevision IS the pinned basis revision. */
  toIntent(sourceId: string): Intent;
  /** The exact inverse over this adapter's intents: the GraphDataIR source id. */
  fromIntent(intent: Intent): string;
  /** The per-decision sidecar view of entity revisions at this basis. */
  sidecar(): GraphDecisionSidecar;
}

const KINDS: ReadonlySet<string> = new Set(["agent", "task", "resource", "artifact", "capability"]);
const fail = (code: string, detail: string): never => { throw new RangeError(`${code}: ${detail}`); };

/** Build the adapter over one pinned basis and one GraphDataIR snapshot. */
export function graphPolicyAdapter(input: GraphPolicyAdapterInput): GraphPolicyAdapter {
  const { basis, policyId, graph } = input;
  if (graph.nodes.length === 0) fail("GRAPH_DATA_INVALID", "no nodes");
  const ids = new Set<string>();
  for (const node of graph.nodes) {
    if (node.sourceId.trim().length === 0) fail("GRAPH_DATA_INVALID", "blank source id");
    if (ids.has(node.sourceId)) fail("GRAPH_DATA_INVALID", `duplicate source id ${node.sourceId}`);
    if (!KINDS.has(node.kind)) fail("GRAPH_DATA_INVALID", `kind outside the closed enum: ${String(node.kind)}`);
    if ("revision" in node) {
      fail("GRAPH_ENTITY_REVISION_UNSUPPORTED", `node ${node.sourceId} carries a per-entity revision; no identity model exists, so entity revisions are the literal "unknown"`);
    }
    ids.add(node.sourceId);
  }
  return {
    toIntent(sourceId: string): Intent {
      if (!ids.has(sourceId)) fail("GRAPH_SOURCE_UNKNOWN", `source id ${sourceId} is not a node of this GraphDataIR snapshot`);
      const spec = input.action(sourceId);
      return {
        intentId: `${policyId}:gp:${basis.revision}:${sourceId}`,
        policyId,
        target: { kind: "artifact", uri: sourceId },
        expectedRevision: basis.revision,
        effect: spec.effect,
        claim: { ...spec.claim },
        evidenceRefs: [...spec.evidenceRefs],
        writeScopes: [...spec.writeScopes],
        readScopes: [...spec.readScopes],
      };
    },
    fromIntent(intent: Intent): string {
      if (!ids.has(intent.target.uri)) fail("GRAPH_SOURCE_UNKNOWN", `intent target ${intent.target.uri} round-trips to no node of this snapshot`);
      return intent.target.uri;
    },
    sidecar(): GraphDecisionSidecar {
      const entityRevisions: Record<string, "unknown"> = {};
      for (const node of graph.nodes) entityRevisions[node.sourceId] = "unknown";
      return { schema: "mw.graph-policy-sidecar.v1", basis, entityRevisions };
    },
  };
}
