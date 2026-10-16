/**
 * Linked topology slice (docs/workbench/10 § Four views, Details; docs/workbench/09 § Relationships are typed and
 * provenanced). A pure read over the typed relations a projection holds for ONE focused node: a bounded set of upstream
 * and downstream neighbors, each edge carrying its relation class, producer source and observation timestamp. It never
 * mutates the projection, never reads a host clock and never invents an edge: a node with no observed relation yields
 * empty slices labeled incomplete-trace, and missing edges are stated as not implying independence.
 *
 * Direction follows the producer's statement: an edge from -> to is upstream of `to` and downstream of `from`
 * (a prerequisite, cause, owner or group precedes what it feeds). Cycles through the focus, and edges whose endpoint,
 * kind or provenance cannot be established, come back as explicit references instead of plain neighbors, so no fake
 * acyclic chain is drawn. Neighbors beyond a cap collapse to a counted remainder by class; hypothesis edges are listed
 * last, flagged non-authoritative, and drop into the remainder first.
 *
 * Labels are producer text and pass the shared sanitizers (redaction.ts). Keys and native references are the
 * projection's own bounded identities, copied unchanged so a consumer can resolve them; a display surface shows the
 * label. An endpoint that is not a projection key is untrusted free text and is sanitized and bounded here.
 */
import { CapabilityError } from "./capability-registry.js";
import type { NativeRef, ObservationProjection, ObservationScope, Relation, RelationKind } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const TOPOLOGY_CONTRACT = "workbench.topology-slice/v1";
export const TOPOLOGY_CAVEAT = "Observed typed relations only; missing edges do not imply independence.";
/** The documented relation classes, authoritative ones first; a listing orders by this rank. */
export const TOPOLOGY_RELATION_CLASSES = ["declared-dependency", "observed-causal", "lifecycle-ownership", "grouping", "inferred-hypothesis"] as const;
export type TopologyRelationClass = (typeof TOPOLOGY_RELATION_CLASSES)[number];
/** Why a slice cannot be read as the whole neighborhood, in the order a result lists them. */
export const TOPOLOGY_TRACE_REASONS = ["no-observed-relations", "relations-truncated", "cycle-search-truncated", "hypothesis-only"] as const;
export type TopologyTraceReason = (typeof TOPOLOGY_TRACE_REASONS)[number];
export const TOPOLOGY_REFERENCE_REASONS = ["cycle", "missing-provenance", "unconfirmed-ownership", "unknown-endpoint", "unknown-relation-kind"] as const;
export type TopologyReferenceReason = (typeof TOPOLOGY_REFERENCE_REASONS)[number];

export interface TopologyRelationsInput {
  scope: ObservationScope;
  /** Only the read side of a projection: the selector holds no mutation capability. */
  relations: Pick<ObservationProjection, "relations">;
}
export interface TopologyCaps {
  /** Edges listed per direction; default 10, 0 to 50. */
  perDirection?: number;
  /** References listed; default 10, 0 to 50. */
  references?: number;
  /** Rows requested per relation read; default 100, 1 to 100. Must not exceed the projection's own page cap. */
  relationPage?: number;
  /** Relation reads the cycle search may spend; default 64, 0 to 256. */
  cycleReads?: number;
}
export interface TopologyProvenance {
  sourceLabel: string;
  observedAt?: string;
  nativeConfirmationRef?: string;
}
export interface TopologyEdge {
  key: string;
  nativeRef: NativeRef;
  label: string;
  relation: TopologyRelationClass;
  /** False only for an inferred hypothesis, which is never treated as authoritative. */
  authoritative: boolean;
  provenance: TopologyProvenance;
}
export interface TopologyRemainder {
  count: number;
  /** True when the relation page was full, so count is a lower bound. */
  atLeast: boolean;
  byClass: Partial<Record<TopologyRelationClass, number>>;
}
export interface TopologySlice {
  edges: TopologyEdge[];
  remainder: TopologyRemainder;
}
export interface TopologyReference {
  direction: "upstream" | "downstream" | "self";
  reason: TopologyReferenceReason;
  key: string;
  nativeRef?: NativeRef;
  label: string;
  /** Present for a cycle only: the best-ranked edge on it. */
  relation?: TopologyRelationClass;
  provenance?: TopologyProvenance;
  edgeCount: number;
}
export interface LinkedTopology {
  contract: typeof TOPOLOGY_CONTRACT;
  basis: "observed";
  focus: { key: string; nativeRef: NativeRef; label: string };
  upstream: TopologySlice;
  downstream: TopologySlice;
  references: TopologyReference[];
  referencesRemainder: number;
  trace: { label: "observed" | "incomplete-trace"; reasons: TopologyTraceReason[]; caveat: typeof TOPOLOGY_CAVEAT };
}

const DEFAULT_PER_DIRECTION = 10;
const MAX_PER_DIRECTION = 50;
const DEFAULT_REFERENCES = 10;
const MAX_REFERENCES = 50;
const DEFAULT_PAGE = 100;
const MAX_PAGE = 100;
const DEFAULT_CYCLE_READS = 64;
const MAX_CYCLE_READS = 256;
const MAX_LABEL = 120;
/** Producer text scanned for a label; anything later is never shown. */
const MAX_SCAN = 1_024;
const CLASS_OF: Readonly<Record<RelationKind, TopologyRelationClass>> = {
  dependency: "declared-dependency", causation: "observed-causal", ownership: "lifecycle-ownership", grouping: "grouping", hypothesis: "inferred-hypothesis",
};
const RANK: ReadonlyMap<TopologyRelationClass, number> = new Map(TOPOLOGY_RELATION_CLASSES.map((name, index) => [name, index]));
/** An ISO-8601 date-time with a timezone. A stated timestamp that is not one is dropped, never echoed. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Topology selection refused: ${message}.`);
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const isKind = (value: string): value is RelationKind => Object.hasOwn(CLASS_OF, value);

function bound(value: number | undefined, fallback: number, least: number, most: number, name: string): number {
  if (value === undefined) return fallback;
  if (!Number.isSafeInteger(value) || value < least || value > most) throw refused(`${name} must be an integer from ${least} to ${most}`);
  return value;
}

interface ParsedKey { workspace: string; principal: string; ref: NativeRef }
/** A projection key is the JSON of [workspace, principal, provider, type, native scope, id]. */
function parseKey(key: unknown): ParsedKey | undefined {
  if (typeof key !== "string" || key.length > 2_048) return undefined;
  let parts: unknown;
  try {
    parts = JSON.parse(key);
  } catch {
    return undefined;
  }
  if (!Array.isArray(parts) || parts.length !== 6 || parts.some(part => typeof part !== "string")) return undefined;
  const [workspace, principal, provider, type, scope, id] = parts as string[];
  if (!provider || !type || !id) return undefined;
  return { workspace, principal, ref: { provider, type, id, ...(scope ? { scope } : {}) } };
}

/** Producer text bound for display: the shared helper's label layout, cut to MAX_LABEL with a visible marker. */
function labelOf(raw: string): string {
  return sanitizeWorkbenchText(raw.slice(0, MAX_SCAN), MAX_LABEL, "label");
}
const refLabel = (ref: NativeRef): string => labelOf(`${ref.provider}:${ref.type}:${ref.id}`);
const nativeRefOf = (ref: NativeRef): NativeRef => ({ provider: ref.provider, type: ref.type, id: ref.id, ...(ref.scope !== undefined ? { scope: ref.scope } : {}) });

type Interpreted =
  | { tag: "drop" }
  | { tag: "reference"; reason: TopologyReferenceReason; key: string; ref?: NativeRef; label: string }
  | { tag: "edge"; key: string; ref: NativeRef; label: string; relation: TopologyRelationClass; provenance: TopologyProvenance };

/** One stored row read as the edge it actually states, judged from the neighbor's side. Nothing is filled in: a row that
 * cannot prove its endpoint, kind, provenance or (for ownership) native confirmation is a reference, not an edge. */
function interpret(row: Relation, scope: ObservationScope, neighbor: "from" | "to"): Interpreted {
  const key = row[neighbor];
  const parsed = parseKey(key);
  if (!parsed) return { tag: "reference", reason: "unknown-endpoint", key: labelOf(typeof key === "string" ? key : ""), label: labelOf(typeof key === "string" ? key : "") };
  if (parsed.workspace !== scope.workspace || parsed.principal !== scope.principal) return { tag: "drop" };
  const base = { key, ref: nativeRefOf(parsed.ref), label: refLabel(parsed.ref) };
  const kind: string = row.kind;
  if (!isKind(kind)) return { tag: "reference", reason: "unknown-relation-kind", ...base };
  const raw = row.provenance;
  const source = raw && typeof raw.source === "string" ? labelOf(raw.source) : "";
  if (!source) return { tag: "reference", reason: "missing-provenance", ...base };
  const confirmation = typeof raw.nativeConfirmationRef === "string" ? labelOf(raw.nativeConfirmationRef) : "";
  if (kind === "ownership" && (!confirmation || raw.source !== parseKey(row.from)?.ref.provider)) {
    return { tag: "reference", reason: "unconfirmed-ownership", ...base };
  }
  const observedAt = typeof raw.observedAt === "string" && ISO_INSTANT.test(raw.observedAt) ? raw.observedAt : undefined;
  const provenance: TopologyProvenance = {
    sourceLabel: source, ...(observedAt !== undefined ? { observedAt } : {}), ...(kind === "ownership" ? { nativeConfirmationRef: confirmation } : {}),
  };
  return { tag: "edge", ...base, relation: CLASS_OF[kind], provenance };
}

const edgeOrder = (a: TopologyEdge, b: TopologyEdge): number =>
  (RANK.get(a.relation) ?? 0) - (RANK.get(b.relation) ?? 0) || compare(a.key, b.key) || compare(a.provenance.sourceLabel, b.provenance.sourceLabel);

interface Side {
  edges: TopologyEdge[];
  references: TopologyReference[];
  rows: number;
  full: boolean;
}
type Direction = "upstream" | "downstream";

function readSide(input: TopologyRelationsInput, focus: string, direction: Direction, page: number): Side {
  const { scope } = input;
  const rows = input.relations.relations(direction === "downstream" ? { scope, from: focus, limit: page } : { scope, to: focus, limit: page });
  const side: Side = { edges: [], references: [], rows: 0, full: rows.length >= page };
  for (const row of rows) {
    const near = direction === "downstream" ? row.from : row.to;
    if (near !== focus) continue;
    const far = direction === "downstream" ? row.to : row.from;
    const self = far === focus;
    // A self loop is read once, from the downstream side.
    if (self && direction === "upstream") continue;
    side.rows += 1;
    const read = interpret(row, scope, direction === "downstream" ? "to" : "from");
    if (read.tag === "drop") {
      side.rows -= 1;
    } else if (read.tag === "reference") {
      side.references.push({ direction: self ? "self" : direction, reason: read.reason, key: read.key, ...(read.ref ? { nativeRef: read.ref } : {}), label: read.label, edgeCount: 1 });
    } else if (self) {
      side.references.push({
        direction: "self", reason: "cycle", key: read.key, nativeRef: read.ref, label: read.label, relation: read.relation, provenance: read.provenance, edgeCount: 1,
      });
    } else {
      side.edges.push({
        key: read.key, nativeRef: read.ref, label: read.label, relation: read.relation, authoritative: read.relation !== "inferred-hypothesis", provenance: read.provenance,
      });
    }
  }
  return side;
}

interface CycleFinding { downstream: Set<string>; upstream: Set<string>; truncated: boolean }
/** Bounded forward walk from the focus over authoritative, well-formed edges. A node the walk reaches that also feeds the
 * focus closes a cycle; the walk remembers which first hop each node was reached through. A walk the read budget or a
 * full page cuts short is reported as truncated and never guessed at. */
function findCycles(input: TopologyRelationsInput, focus: string, down: readonly TopologyEdge[], up: readonly TopologyEdge[], page: number, budget: number): CycleFinding {
  const found: CycleFinding = { downstream: new Set(), upstream: new Set(), truncated: false };
  const feeds = new Set(up.filter(edge => edge.authoritative).map(edge => edge.key));
  const firstHops = down.filter(edge => edge.authoritative).map(edge => edge.key);
  if (feeds.size === 0 || firstHops.length === 0) return found;
  const firsts = new Map<string, Set<string>>();
  const queue: string[] = [];
  const queued = new Set<string>();
  for (const hop of firstHops) {
    if (firsts.has(hop)) continue;
    firsts.set(hop, new Set([hop]));
    queue.push(hop);
    queued.add(hop);
  }
  let reads = 0;
  for (let at = 0; at < queue.length; at++) {
    if (reads >= budget) {
      found.truncated = true;
      break;
    }
    reads += 1;
    const node = queue[at];
    queued.delete(node);
    const rows = input.relations.relations({ scope: input.scope, from: node, limit: page });
    if (rows.length >= page) found.truncated = true;
    const mine = firsts.get(node) ?? new Set<string>();
    for (const row of rows) {
      if (row.from !== node || row.to === focus) continue;
      const read = interpret(row, input.scope, "to");
      if (read.tag !== "edge" || read.relation === "inferred-hypothesis") continue;
      const reached = firsts.get(read.key) ?? new Set<string>();
      let grew = !firsts.has(read.key);
      for (const hop of mine) {
        if (!reached.has(hop)) {
          reached.add(hop);
          grew = true;
        }
      }
      firsts.set(read.key, reached);
      if (grew && !queued.has(read.key)) {
        queue.push(read.key);
        queued.add(read.key);
      }
    }
  }
  for (const key of feeds) {
    const hops = firsts.get(key);
    if (!hops) continue;
    found.upstream.add(key);
    for (const hop of hops) found.downstream.add(hop);
  }
  return found;
}

/** Cyclic edges leave the listing and come back as one reference per neighbor, carrying the best-ranked edge. */
function splitCycles(edges: TopologyEdge[], cyclic: ReadonlySet<string>, direction: Direction): { plain: TopologyEdge[]; references: TopologyReference[] } {
  const plain: TopologyEdge[] = [];
  const byKey = new Map<string, TopologyEdge[]>();
  for (const edge of edges) {
    if (edge.authoritative && cyclic.has(edge.key)) byKey.set(edge.key, [...(byKey.get(edge.key) ?? []), edge]);
    else plain.push(edge);
  }
  const references: TopologyReference[] = [];
  for (const [key, group] of byKey) {
    const best = [...group].sort(edgeOrder)[0];
    references.push({
      direction, reason: "cycle", key, nativeRef: best.nativeRef, label: best.label, relation: best.relation, provenance: best.provenance, edgeCount: group.length,
    });
  }
  return { plain, references };
}

function sliceOf(edges: TopologyEdge[], cap: number, full: boolean): TopologySlice {
  const sorted = [...edges].sort(edgeOrder);
  const listed = sorted.slice(0, cap);
  const left = sorted.slice(cap);
  const byClass: Partial<Record<TopologyRelationClass, number>> = {};
  for (const name of TOPOLOGY_RELATION_CLASSES) {
    const count = left.filter(edge => edge.relation === name).length;
    if (count > 0) byClass[name] = count;
  }
  return { edges: listed, remainder: { count: left.length, atLeast: full, byClass } };
}

const referenceOrder = (a: TopologyReference, b: TopologyReference): number => compare(a.reason, b.reason) || compare(a.direction, b.direction) || compare(a.key, b.key);

/** Select the bounded linked slice around `focusKey` from the typed relations observed for it. */
export function selectLinkedTopology(input: TopologyRelationsInput, focusKey: string, caps: TopologyCaps = {}): LinkedTopology {
  const perDirection = bound(caps.perDirection, DEFAULT_PER_DIRECTION, 0, MAX_PER_DIRECTION, "perDirection");
  const maxReferences = bound(caps.references, DEFAULT_REFERENCES, 0, MAX_REFERENCES, "references");
  const page = bound(caps.relationPage, DEFAULT_PAGE, 1, MAX_PAGE, "relationPage");
  const cycleReads = bound(caps.cycleReads, DEFAULT_CYCLE_READS, 0, MAX_CYCLE_READS, "cycleReads");
  const parsed = parseKey(focusKey);
  if (!parsed || parsed.workspace !== input.scope.workspace || parsed.principal !== input.scope.principal) {
    throw refused("focus must be an observed node key inside the caller scope");
  }

  const up = readSide(input, focusKey, "upstream", page);
  const down = readSide(input, focusKey, "downstream", page);
  const cycles = findCycles(input, focusKey, down.edges, up.edges, page, cycleReads);
  const upSplit = splitCycles(up.edges, cycles.upstream, "upstream");
  const downSplit = splitCycles(down.edges, cycles.downstream, "downstream");
  const allReferences = [...up.references, ...down.references, ...upSplit.references, ...downSplit.references].sort(referenceOrder);

  const reasons: TopologyTraceReason[] = [];
  if (up.rows + down.rows === 0) reasons.push("no-observed-relations");
  if (up.full || down.full) reasons.push("relations-truncated");
  if (cycles.truncated) reasons.push("cycle-search-truncated");
  const everyEdge = [...up.edges, ...down.edges];
  if (everyEdge.length > 0 && everyEdge.every(edge => !edge.authoritative) && allReferences.length === 0) reasons.push("hypothesis-only");

  return {
    contract: TOPOLOGY_CONTRACT,
    basis: "observed",
    focus: { key: focusKey, nativeRef: nativeRefOf(parsed.ref), label: refLabel(parsed.ref) },
    upstream: sliceOf(upSplit.plain, perDirection, up.full),
    downstream: sliceOf(downSplit.plain, perDirection, down.full),
    references: allReferences.slice(0, maxReferences),
    referencesRemainder: Math.max(0, allReferences.length - maxReferences),
    trace: { label: reasons.length > 0 ? "incomplete-trace" : "observed", reasons, caveat: TOPOLOGY_CAVEAT },
  };
}
