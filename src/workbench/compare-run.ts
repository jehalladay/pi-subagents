/**
 * Comparison receipt builder (wb-rz62, the W17 native-metric remainder). A CompareRun for compareWorkflowRuns
 * (designer.ts) is assembled from what the host captured for one invocation (its identity receipt, the digests a trusted
 * producer pinned and the workspace source label) and from the invocation's own page of the ObservationProjection.
 * Metrics are not an input: every row is drawn from the native latency decomposition of the invocation's observed source
 * intervals (latency.ts selectLatencyDecomposition, then toMeasuredMetrics), so a metric supplied inline by a caller never
 * reaches a comparison through this builder, and a page with no workflow root yields no row at all (docs/workbench/11
 * "Missing native measured metrics yields unknown, not a claimed optimization").
 *
 * The builder reads the projection once per invocation: the first COMPARE_PAGE_LIMIT nodes of the invocation, a page the
 * latency selector, the freshness read and the native references all take, so the rows, their freshness and the native
 * references that bind them describe the same page (the registered workflow_compare reads each task once, wb-h8f.7).
 * Freshness is the page's own, never assumed:
 * current only when every examined node is current (a read-current snapshot), stale when any is stale, else unknown.
 * Native references are the page's non-host references, as the registered workflow_compare read them before this
 * builder, so a row whose source is a host node is never receipt-bound and the comparison withholds it.
 */
import type { CompareRun, MeasuredMetric } from "./designer.js";
import { selectLatencyDecomposition, toMeasuredMetrics } from "./latency.js";
import type { ObservationProjection, ObservationScope, ObservedNode } from "./observation.js";

/** Nodes read from the invocation's page: the session projection's own query bound. */
export const COMPARE_PAGE_LIMIT = 40;
/** The host's own provider: its nodes are local-only, never native execution references. */
const HOST_PROVIDER = "pi-workflow";

/** What the receipt producer captured for one invocation, and which page of the projection belongs to it. */
export type NativeCompareRunInput = Pick<CompareRun, "snapshot" | "inputDigest" | "modelDigest" | "toolsDigest" | "environmentDigest" | "cacheDigest" | "workspaceSourceState"> & {
  scope: ObservationScope;
  invocationId: string;
};

function pageFreshness(nodes: readonly ObservedNode[]): MeasuredMetric["freshness"] {
  if (nodes.some(node => node.freshness === "stale")) return "stale";
  return nodes.length > 0 && nodes.every(node => node.freshness === "current") ? "current" : "unknown";
}

export function nativeCompareRun(projection: Pick<ObservationProjection, "query">, input: NativeCompareRunInput): CompareRun {
  const { scope, invocationId } = input;
  const page = projection.query({ scope, invocationId, limit: COMPARE_PAGE_LIMIT });
  // The projection binds scope and invocation itself; the latency selector re-checks both, and so does the freshness read.
  const examined = page.nodes.filter(node => node.scope.workspace === scope.workspace && node.scope.principal === scope.principal && node.invocationId === invocationId);
  // The selector takes this same page, never a second read of the projection.
  const report = selectLatencyDecomposition({ query: () => page }, { scope, invocationId, limit: COMPARE_PAGE_LIMIT });
  return {
    snapshot: input.snapshot,
    inputDigest: input.inputDigest,
    modelDigest: input.modelDigest,
    toolsDigest: input.toolsDigest,
    environmentDigest: input.environmentDigest,
    cacheDigest: input.cacheDigest,
    workspaceSourceState: input.workspaceSourceState,
    nativeRefs: page.nodes.map(node => node.nativeRef).filter(ref => ref.provider !== HOST_PROVIDER),
    metrics: toMeasuredMetrics(report, { subjectBasis: input.snapshot.identity.subjectBasis, freshness: pageFreshness(examined) }),
  };
}
