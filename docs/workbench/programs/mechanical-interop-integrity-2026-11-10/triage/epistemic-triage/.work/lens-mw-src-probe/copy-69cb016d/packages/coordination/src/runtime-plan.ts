/**
 * A graph mutation invalidates dependent runtime plans, not only certificates (APO program, 02 APO-016; the
 * certificate half is 3l61.4). A runtime plan is what `compilePolicyGraph` produced for one graph revision, so
 * the record names the revision and the structural dependencies it was compiled from (the node ids and edge
 * keys). A mutation invalidates the plan exactly when it rewrites that graph at that revision and touches
 * structure: a node, an edge, or a port (which belongs to a node) — adding a node counts, since the compiled
 * order no longer covers the graph. The dependency negative controls are built in: a mutation of another graph
 * (`GRAPH_MISMATCH`), of another revision (`REVISION_MISMATCH`) or one that changes only certificates,
 * verifiers or authority (`NO_STRUCTURAL_DEPENDENCY_TOUCHED`) leaves the plan valid, because the plan does not
 * depend on those. A graph that does not compile has no plan to invalidate. Pure; nothing here recompiles,
 * schedules or mints an identifier.
 */
import { compilePolicyGraph, type PolicyGraphManifest } from "./policy-graph.js";
import type { RewriteCandidate } from "./rewrite-boundary.js";

export interface RuntimePlanRecord {
  readonly schema: "mw.runtime-plan.v0";
  readonly graphId: string;
  readonly revision: string;
  readonly order: readonly string[];
  /** Sorted node ids and `from->to` edge keys the plan was compiled from. */
  readonly dependsOn: { readonly nodes: readonly string[]; readonly edges: readonly string[] };
}

export type RuntimePlanRecording =
  | { readonly ok: true; readonly plan: RuntimePlanRecord }
  | { readonly ok: false; readonly code: "RUNTIME_PLAN_UNCOMPILABLE"; readonly detail: string };

/** A rewrite candidate addressed to one graph. */
export interface GraphMutation extends RewriteCandidate {
  readonly graphId: string;
}

export type PlanInvalidationReason = "STRUCTURE_TOUCHED" | "GRAPH_MISMATCH" | "REVISION_MISMATCH" | "NO_STRUCTURAL_DEPENDENCY_TOUCHED";

export interface PlanInvalidation {
  readonly invalidated: boolean;
  readonly reason: PlanInvalidationReason;
  /** `kind:id` of every structural change, sorted; empty when nothing structural was touched. */
  readonly touched: readonly string[];
}

/** Record the runtime plan of one graph revision with its structural dependency footprint. Pure. */
export function recordRuntimePlan(manifest: PolicyGraphManifest): RuntimePlanRecording {
  const compiled = compilePolicyGraph(manifest);
  if (!compiled.ok) return { ok: false, code: "RUNTIME_PLAN_UNCOMPILABLE", detail: `${compiled.code}: ${compiled.detail}` };
  const nodes = [...new Set(manifest.nodes.map(node => node.id))].sort();
  const edges = [...new Set(manifest.edges.map(edge => `${edge.from}->${edge.to}`))].sort();
  return { ok: true, plan: { schema: "mw.runtime-plan.v0", graphId: manifest.graphId, revision: manifest.revision, order: compiled.order, dependsOn: { nodes, edges } } };
}

/** Does this mutation invalidate this plan? Only a structural change to the plan's own graph revision does. Pure. */
export function planInvalidation(plan: RuntimePlanRecord, mutation: GraphMutation): PlanInvalidation {
  if (mutation.graphId !== plan.graphId) return { invalidated: false, reason: "GRAPH_MISMATCH", touched: [] };
  if (mutation.parentRevision !== plan.revision) return { invalidated: false, reason: "REVISION_MISMATCH", touched: [] };
  const touched = mutation.changes
    .filter(change => change.kind === "node" || change.kind === "edge" || change.kind === "port")
    .map(change => `${change.kind}:${change.id}`)
    .sort();
  if (touched.length === 0) return { invalidated: false, reason: "NO_STRUCTURAL_DEPENDENCY_TOUCHED", touched };
  return { invalidated: true, reason: "STRUCTURE_TOUCHED", touched };
}
