/**
 * Pre-sampling support enumerator and bounded role-aware GraphDataIR export (GPC claim
 * adapter-enumerates-pre-sampling-support-exports-graphdatair, MechanicalWorkflows-hnqv.1).
 * Edge code over the consumed GraphDataIR subset: pure, no process spawn, no Library dependency.
 *
 * The enumerator keeps the vocabulary members the host's capacity and permission inputs make
 * legal BEFORE sampling, in vocabulary order. A member is legal only when its capacity is a
 * positive safe integer and its permission is exactly true; an id an input omits is never legal.
 * Absent inputs, or a support with no legal member, yield a stated non-ok result that
 * withPreSamplingSupport carries into DecisionReceipt.support as the literal "unknown" — a set is
 * never fabricated. Only a result this module issued is accepted as support: a post-admission
 * mask (mw.training-export.v1 mask.admitted) is original-sampler evidence only after the
 * resolver ran, so offering one as support is refused (README Feedback law).
 *
 * Support ids are GraphDataIR source ids, the same ids graphPolicyAdapter round-trips. The
 * export keeps only the kinds a role may see and refuses, never truncates, past its bound.
 */
import type { DecisionReceipt } from "./decision-receipt.js";
import type { Maybe } from "./episode.js";
import type { GraphData, GraphDataNode, GraphDataNodeKind } from "./graph-policy-adapter.js";

export interface PreSamplingInput {
  /** The handed vocabulary: every legal support member is one of these nodes. */
  readonly graph: GraphData;
  /** Remaining capacity per source id, supplied at proposal time. */
  readonly capacity?: Readonly<Record<string, number>>;
  /** Permission per source id, supplied at proposal time. */
  readonly permitted?: Readonly<Record<string, boolean>>;
}

export type PreSamplingSupport =
  | { readonly ok: true; readonly origin: "pre-sampling-enumerator"; readonly support: readonly string[] }
  | { readonly ok: false; readonly origin: "pre-sampling-enumerator"; readonly code: "PRE_SAMPLING_INPUT_ABSENT" | "PRE_SAMPLING_SUPPORT_EMPTY"; readonly detail: string };

export interface RoleAwareExportInput {
  readonly graph: GraphData;
  readonly role: string;
  /** Host-supplied: the node kinds each role may see. */
  readonly roleKinds: Readonly<Record<string, readonly GraphDataNodeKind[]>>;
  /** A positive safe integer: exceeding it refuses the export. */
  readonly maxNodes: number;
}

export interface RoleAwareGraphExport {
  readonly role: string;
  readonly maxNodes: number;
  readonly graph: GraphData;
}

const KINDS: ReadonlySet<string> = new Set(["agent", "task", "resource", "artifact", "capability"]);
const UNKNOWN = "unknown" as const;
const fail = (code: string, detail: string): never => { throw new RangeError(`${code}: ${detail}`); };
const own = (record: object, key: string): boolean => Object.prototype.hasOwnProperty.call(record, key);
/** Private non-enumerable brand: a spread copy, a JSON round trip or a hand-built literal never carries it. */
const ISSUED: unique symbol = Symbol("pre-sampling-support-issued");

function checkedNodes(graph: GraphData): readonly GraphDataNode[] {
  const ids = new Set<string>();
  for (const node of graph.nodes) {
    if (node.sourceId.trim().length === 0) fail("GRAPH_DATA_INVALID", "blank source id");
    if (ids.has(node.sourceId)) fail("GRAPH_DATA_INVALID", `duplicate source id ${node.sourceId}`);
    if (!KINDS.has(node.kind)) fail("GRAPH_DATA_INVALID", `kind outside the closed enum: ${String(node.kind)}`);
    if ("revision" in node) fail("GRAPH_ENTITY_REVISION_UNSUPPORTED", `node ${node.sourceId} carries a per-entity revision; entity revisions are the literal "unknown"`);
    ids.add(node.sourceId);
  }
  return graph.nodes;
}

function issue(result: PreSamplingSupport): PreSamplingSupport {
  Object.defineProperty(result, ISSUED, { value: true, enumerable: false });
  return Object.freeze(result);
}

/** Enumerate the legal pre-sampling support. Pure; malformed inputs throw, absent ones return a stated result. */
export function enumeratePreSamplingSupport(input: PreSamplingInput): PreSamplingSupport {
  const nodes = checkedNodes(input.graph);
  const { capacity, permitted } = input;
  if (capacity === undefined || permitted === undefined) {
    return issue({ ok: false, origin: "pre-sampling-enumerator", code: "PRE_SAMPLING_INPUT_ABSENT", detail: "capacity and permission inputs are both required; support stays unknown" });
  }
  const vocabulary = new Set(nodes.map(node => node.sourceId));
  for (const [label, record] of [["capacity", capacity], ["permitted", permitted]] as const) {
    for (const id of Object.keys(record)) {
      if (!vocabulary.has(id)) fail("PRE_SAMPLING_SOURCE_UNKNOWN", `${label} names ${id}, which is not in the handed vocabulary`);
    }
  }
  for (const [id, value] of Object.entries(capacity)) {
    if (!Number.isSafeInteger(value) || value < 0) fail("PRE_SAMPLING_CAPACITY_INVALID", `capacity for ${id} is not a non-negative safe integer`);
  }
  const support = nodes.map(node => node.sourceId).filter(id => own(capacity, id) && capacity[id]! >= 1 && own(permitted, id) && permitted[id] === true);
  if (support.length === 0) {
    return issue({ ok: false, origin: "pre-sampling-enumerator", code: "PRE_SAMPLING_SUPPORT_EMPTY", detail: "no vocabulary member is legal under the supplied capacity and permissions; support stays unknown" });
  }
  return issue({ ok: true, origin: "pre-sampling-enumerator", support: Object.freeze(support) });
}

/**
 * A copy of the receipt whose support is the enumerated set, or the literal "unknown" when the
 * enumerator found no inputs or no legal member. A post-admission mask and any result this
 * module did not issue are refused.
 */
export function withPreSamplingSupport(receipt: DecisionReceipt, offered: PreSamplingSupport): DecisionReceipt {
  if (typeof offered === "object" && offered !== null && ("admitted" in offered || "rejected" in offered)) {
    fail("PRE_SAMPLING_SUPPORT_POST_ADMISSION", "a post-admission mask is not the sampler's pre-sampling support");
  }
  if (typeof offered !== "object" || offered === null || !Object.prototype.hasOwnProperty.call(offered, ISSUED)) {
    fail("PRE_SAMPLING_OFFER_INVALID", "only a result issued by enumeratePreSamplingSupport can populate receipt support");
  }
  const support: Maybe<readonly string[]> = offered.ok ? [...offered.support] : UNKNOWN;
  return { ...receipt, support };
}

/** Export the nodes a role may see, in vocabulary order, bounded by maxNodes (refusal, never truncation). */
export function exportRoleAwareGraph(input: RoleAwareExportInput): RoleAwareGraphExport {
  const nodes = checkedNodes(input.graph);
  const { role, roleKinds, maxNodes } = input;
  if (!Number.isSafeInteger(maxNodes) || maxNodes < 1) fail("GRAPH_EXPORT_BOUND_INVALID", `maxNodes ${String(maxNodes)} is not a positive safe integer`);
  for (const [name, kinds] of Object.entries(roleKinds)) {
    for (const kind of kinds) if (!KINDS.has(kind)) fail("GRAPH_DATA_INVALID", `role ${name} names a kind outside the closed enum: ${String(kind)}`);
  }
  if (!own(roleKinds, role)) fail("GRAPH_EXPORT_ROLE_UNKNOWN", `role ${role} has no declared node kinds`);
  const allowed = new Set<string>(roleKinds[role]);
  const visible = nodes.filter(node => allowed.has(node.kind)).map(node => ({ sourceId: node.sourceId, kind: node.kind }));
  if (visible.length > maxNodes) fail("GRAPH_EXPORT_OVER_BOUND", `role ${role} sees ${visible.length} nodes, over the bound ${maxNodes}`);
  return { role, maxNodes, graph: { nodes: visible } };
}
