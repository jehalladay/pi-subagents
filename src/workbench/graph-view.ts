/**
 * Graph view model (docs/workbench/10 § Four views, Graph: "navigable DAG-ish projection, explicit dependency arrows,
 * fan-out collapsing, cross-provider nodes, nested workflows. Cycles/unknown dynamic edges represented explicitly as
 * 'references' rather than rendered as a fake acyclic plan. Re-layout only changed neighborhood or viewport, not the
 * complete graph for every event." and § Rendering pipeline: "Graph layout cached by topology revision; no force-directed
 * re-layout in render method. For large graphs show aggregate supernodes first."). A pure, synchronous read over ONE bounded
 * ObservationProjection window plus one outgoing relation page per shown row (and, for a focus, the focus's incoming page).
 * It reads no clock, mutates nothing and calls no producer.
 *
 * Every relation the reader reports is accounted for: an acyclic edge between two shown nodes is an arrow; an edge that
 * closes a cycle (a self edge included) or reaches an endpoint outside the view is a reference entry, never dropped and
 * never drawn as an arrow; fan-out past the cap collapses to one counted supernode, listed before the nodes. A relation page
 * that stops at its limit, a window that holds fewer rows than the invocation has, and a reference list past its cap each add
 * a counted partial label, and the model is then not complete: a truncated read is never upgraded to a complete one.
 *
 * The builder caches one neighborhood (a node's outgoing page, a focus's incoming page) per topology revision. While the
 * topology revision and the projection revision are unchanged the identical model comes back without a relation read; a
 * status-only change re-reads the window but no relations; a topology change re-reads the pages once and shares every
 * unchanged neighborhood by identity, so a renderer re-lays out only what changed.
 *
 * Labels are producer text and pass the shared sanitizers (redaction.ts): control characters, bidi marks and every
 * default-ignorable code point are first read as SEPARATORS (and, in a second variant, deleted), the text is redacted in
 * both variants, the variant that redacted more is kept, then it is stripped and bounded. Deletion never precedes the
 * redaction of the only variant that carries it. Keys and native references are the projection's own bounded identities,
 * copied unchanged so a consumer can resolve them.
 */
import { CapabilityError } from "./capability-registry.js";
import type { NativeRef, ObservationProjection, ObservationScope, ObservedNode, Presentation, Relation, RelationKind } from "./observation.js";
import { redactWorkbenchText, stripUnsafeText } from "./redaction.js";

export const GRAPH_VIEW_CONTRACT = "workbench.graph-view/v1";
export type GraphReader = Pick<ObservationProjection, "window" | "relationsPage" | "relationRevision">;

export interface GraphViewCaps {
  /** Rows shown, 1..100 (default 60). The window read is bounded by this and by the viewport limit. */
  maxNodes?: number;
  /** Outgoing arrows one node may keep, 1..40 (default 8); more collapse to one supernode. */
  maxFanOut?: number;
  /** Relations read per page, 1..100 (default 40). A reader may cap a page lower; its own truncation flag is what counts. */
  relationLimit?: number;
  /** Reference entries kept, 1..200 (default 50). */
  maxReferences?: number;
}
export interface GraphViewRequest {
  scope: ObservationScope;
  invocationId: string;
  /** The ObservationProjection window: offset >= 0, limit 1..100. */
  viewport: { offset: number; limit: number };
  /** A projection key in the viewport; the model then holds only it and its direct neighbors. */
  focus?: string;
  caps?: GraphViewCaps;
}
export interface GraphNode {
  readonly key: string;
  readonly nativeRef: Readonly<NativeRef>;
  readonly provider: string;
  readonly type: Presentation["type"];
  readonly label: string;
  readonly status: string;
  readonly tone: Presentation["statusTone"];
  readonly freshness: ObservedNode["freshness"];
}
export interface GraphEdge {
  readonly from: string;
  readonly to: string;
  readonly class: RelationKind;
  /** The producer's provenance source, sanitized. */
  readonly source: string;
  /** True when the relation carries a native confirmation reference; the reference itself is never echoed. */
  readonly confirmed: boolean;
  readonly crossProvider: boolean;
}
export interface GraphSupernode {
  readonly key: string;
  readonly from: string;
  readonly label: string;
  /** Collapsed edges (targets). */
  readonly count: number;
  /** True when the node's relation page was truncated, so more targets exist than were counted. */
  readonly lowerBound: boolean;
  readonly providers: readonly { readonly provider: string; readonly count: number }[];
  readonly tones: readonly { readonly tone: Presentation["statusTone"]; readonly count: number }[];
  readonly classes: readonly RelationKind[];
}
export type GraphReferenceReason = "cycle" | "endpoint-not-in-view";
export interface GraphReference {
  readonly reason: GraphReferenceReason;
  readonly from: string;
  readonly to: string;
  readonly class: RelationKind;
  readonly source: string;
  readonly confirmed: boolean;
}
export interface GraphPartial {
  readonly scope: "relations" | "window" | "references";
  /** The projection key whose relation page was truncated. */
  readonly subject?: string;
  readonly direction?: "outgoing" | "incoming";
  readonly shown: number;
  /** The count the reader offered, when it is known. */
  readonly offered?: number;
  readonly label: string;
}
/** Deeply frozen and JSON-lossless. supernodes come first, then nodes, edges, references and partial labels. */
export interface GraphViewModel {
  readonly contract: typeof GRAPH_VIEW_CONTRACT;
  readonly revisionBasis: { readonly revision: number; readonly topologyRevision: number };
  /** False whenever any partial label exists. */
  readonly complete: boolean;
  readonly supernodes: readonly GraphSupernode[];
  readonly nodes: readonly GraphNode[];
  readonly edges: readonly GraphEdge[];
  readonly references: readonly GraphReference[];
  readonly partials: readonly GraphPartial[];
}
export interface GraphBuildReport {
  /** The previous model was returned unchanged. */
  readonly cacheHit: boolean;
  /** relationsPage calls made by this build. */
  readonly relationReads: number;
  /** Neighborhood ids (out:<key>, in:<key>) that are new or whose page changed. */
  readonly recomputed: readonly string[];
  /** Neighborhood ids whose cached derivation was shared unchanged. */
  readonly reused: readonly string[];
}
export interface GraphViewBuilder {
  build(request: GraphViewRequest): GraphViewModel;
  readonly lastBuild: GraphBuildReport | undefined;
}

const MAX_WINDOW = 100;
const DEFAULT_NODES = 60;
const DEFAULT_FAN_OUT = 8;
const MAX_FAN_OUT = 40;
const DEFAULT_RELATIONS = 40;
const MAX_RELATIONS = 100;
const DEFAULT_REFERENCES = 50;
const MAX_REFERENCES = 200;
const LABEL = 80;
/** Producer text scanned for a label; anything later is never shown. */
const LABEL_SCAN = 4_096;
const REDACTED = "[REDACTED]";
const INVISIBLE = /\p{Default_Ignorable_Code_Point}/gu;
const LINE_SEPARATORS = /[\u2028\u2029]/g;
/** A UTF-16 code unit orphaned when a length bound cuts through a surrogate pair. */
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Graph view request refused: ${message}.`);
const integer = (value: unknown, min: number, max: number): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= min && value <= max;
const text = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

function bounded(value: unknown, name: string, min: number, max: number, fallback: number): number {
  if (value === undefined) return fallback;
  if (!integer(value, min, max)) throw refused(`${name} must be a safe integer ${min}..${max}`);
  return value;
}

interface Bounds {
  scope: ObservationScope;
  invocationId: string;
  offset: number;
  limit: number;
  focus: string | undefined;
  maxNodes: number;
  maxFanOut: number;
  relationLimit: number;
  maxReferences: number;
}
function validated(request: GraphViewRequest): Bounds {
  if (typeof request !== "object" || request === null) throw refused("the request must be an object");
  const { scope, invocationId, viewport, focus, caps } = request;
  if (typeof scope !== "object" || scope === null || !text(scope.workspace) || !text(scope.principal)) throw refused("scope needs a workspace and a principal");
  if (!text(invocationId)) throw refused("invocationId must be a non-empty string");
  if (typeof viewport !== "object" || viewport === null) throw refused("viewport must be an object");
  if (!integer(viewport.offset, 0, Number.MAX_SAFE_INTEGER)) throw refused("viewport.offset must be a nonnegative safe integer");
  if (!integer(viewport.limit, 1, MAX_WINDOW)) throw refused(`viewport.limit must be a safe integer 1..${MAX_WINDOW}`);
  if (focus !== undefined && !text(focus)) throw refused("focus must be a non-empty projection key");
  if (caps !== undefined && (typeof caps !== "object" || caps === null)) throw refused("caps must be an object");
  const maxNodes = bounded(caps?.maxNodes, "caps.maxNodes", 1, MAX_WINDOW, DEFAULT_NODES);
  return {
    scope: { workspace: scope.workspace, principal: scope.principal },
    invocationId,
    offset: viewport.offset,
    limit: Math.min(viewport.limit, maxNodes),
    focus,
    maxNodes,
    maxFanOut: bounded(caps?.maxFanOut, "caps.maxFanOut", 1, MAX_FAN_OUT, DEFAULT_FAN_OUT),
    relationLimit: bounded(caps?.relationLimit, "caps.relationLimit", 1, MAX_RELATIONS, DEFAULT_RELATIONS),
    maxReferences: bounded(caps?.maxReferences, "caps.maxReferences", 1, MAX_REFERENCES, DEFAULT_REFERENCES),
  };
}

const spaces = (value: string): string => value.replace(/\s+/g, " ").trim();
const redactedCount = (value: string): number => value.split(REDACTED).length - 1;

/** Producer text bound for display. Controls, bidi marks, terminal sequences and default-ignorable code points are read
 * as separators first; the text is redacted both with them as separators and with the ignorables deleted, and the variant
 * that redacted more is kept (the separator reading on a tie), so neither a deleted character nor a glued separator can
 * hide a credential from the redactor. The shared strip and the length bound follow. May be empty; callers choose the
 * fallback. */
function shown(value: unknown): string {
  if (typeof value !== "string") return "";
  const separated = stripUnsafeText(value.slice(0, LABEL_SCAN), " ").replace(LINE_SEPARATORS, " ");
  const asSeparators = redactWorkbenchText(spaces(separated.replace(INVISIBLE, " ")), LABEL);
  const deleted = redactWorkbenchText(spaces(separated.replace(INVISIBLE, "")), LABEL);
  const kept = redactedCount(deleted) > redactedCount(asSeparators) ? deleted : asSeparators;
  return stripUnsafeText(kept).replace(LONE_SURROGATE, "").trim();
}

function providerOf(key: string): string {
  try {
    const parsed: unknown = JSON.parse(key);
    return Array.isArray(parsed) && parsed.length === 6 && typeof parsed[2] === "string" ? parsed[2] : "";
  } catch {
    return "";
  }
}
function referenceLabel(ref: NativeRef): string {
  return shown(`${ref.provider}/${ref.type}/${ref.id}`);
}

/** One edge as a relation page states it, sanitized once so a shared neighborhood is shared whole. */
interface Seed {
  readonly from: string;
  readonly to: string;
  readonly class: RelationKind;
  readonly source: string;
  readonly confirmed: boolean;
  readonly crossProvider: boolean;
}
interface Neighborhood {
  readonly topologyRevision: number;
  readonly fingerprint: string;
  readonly truncated: boolean;
  readonly seeds: readonly Seed[];
}
function seedOf(relation: Relation): Seed {
  return Object.freeze({
    from: relation.from,
    to: relation.to,
    class: relation.kind,
    source: shown(relation.provenance.source),
    confirmed: Boolean(relation.provenance.nativeConfirmationRef),
    crossProvider: providerOf(relation.from) !== providerOf(relation.to),
  });
}
const seedId = (seed: Seed): string => JSON.stringify([seed.from, seed.to, seed.class, seed.source]);
const seedOrder = (a: Seed, b: Seed): number => compare(a.from, b.from) || compare(a.to, b.to) || compare(a.class, b.class) || compare(a.source, b.source);

/** The strongly connected components of the shown graph; an edge inside one (a self edge included) closes a cycle. */
function cycleEdges(keys: readonly string[], edges: readonly Seed[]): ReadonlySet<Seed> {
  const successors = new Map<string, string[]>();
  for (const edge of edges) successors.set(edge.from, [...(successors.get(edge.from) ?? []), edge.to]);
  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const component = new Map<string, number>();
  const stack: string[] = [];
  const onStack = new Set<string>();
  let counter = 0;
  let components = 0;
  const visit = (key: string): void => {
    index.set(key, counter);
    low.set(key, counter);
    counter++;
    stack.push(key);
    onStack.add(key);
    for (const next of successors.get(key) ?? []) {
      if (!index.has(next)) {
        visit(next);
        low.set(key, Math.min(low.get(key) ?? 0, low.get(next) ?? 0));
      } else if (onStack.has(next)) {
        low.set(key, Math.min(low.get(key) ?? 0, index.get(next) ?? 0));
      }
    }
    if (low.get(key) === index.get(key)) {
      for (let member = stack.pop(); member !== undefined; member = stack.pop()) {
        onStack.delete(member);
        component.set(member, components);
        if (member === key) break;
      }
      components++;
    }
  };
  for (const key of keys) if (!index.has(key)) visit(key);
  return new Set(edges.filter(edge => edge.from === edge.to || component.get(edge.from) === component.get(edge.to)));
}

function tally<T extends string>(values: readonly T[]): { value: T; count: number }[] {
  const counts = new Map<T, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => compare(a.value, b.value));
}

function deepFreeze<T>(value: T): T {
  if (typeof value === "object" && value !== null && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

class Builder implements GraphViewBuilder {
  lastBuild: GraphBuildReport | undefined;
  private readonly neighborhoods = new Map<string, Neighborhood>();
  private cached: { requestKey: string; topologyRevision: number; revision: number; model: GraphViewModel } | undefined;

  constructor(private readonly reader: GraphReader) {}

  build(request: GraphViewRequest): GraphViewModel {
    const bounds = validated(request);
    const topologyRevision = this.reader.relationRevision();
    const window = this.reader.window({ scope: bounds.scope, invocationId: bounds.invocationId, offset: bounds.offset, limit: bounds.limit });
    const requestKey = JSON.stringify([bounds.scope, bounds.invocationId, bounds.offset, bounds.limit, bounds.focus ?? null, bounds.maxFanOut, bounds.relationLimit, bounds.maxReferences]);
    if (this.cached && this.cached.requestKey === requestKey && this.cached.topologyRevision === topologyRevision && this.cached.revision === window.revision) {
      this.lastBuild = { cacheHit: true, relationReads: 0, recomputed: [], reused: [] };
      return this.cached.model;
    }
    const windowKeys = new Set(window.nodes.map(node => node.key));
    if (bounds.focus !== undefined && !windowKeys.has(bounds.focus)) throw refused("focus is not a row of the viewport");

    const used = new Set<string>();
    const recomputed: string[] = [];
    const reused: string[] = [];
    let reads = 0;
    const neighborhood = (id: string, key: string, direction: "outgoing" | "incoming"): Neighborhood => {
      used.add(id);
      const prior = this.neighborhoods.get(id);
      if (prior && prior.topologyRevision === topologyRevision) {
        reused.push(id);
        return prior;
      }
      reads++;
      const page = this.reader.relationsPage({ scope: bounds.scope, ...(direction === "outgoing" ? { from: key } : { to: key }), limit: bounds.relationLimit });
      const fingerprint = JSON.stringify([page.relations, page.truncated, page.limitApplied]);
      if (prior && prior.fingerprint === fingerprint) {
        const refreshed: Neighborhood = { ...prior, topologyRevision };
        this.neighborhoods.set(id, refreshed);
        reused.push(id);
        return refreshed;
      }
      const fresh: Neighborhood = Object.freeze({ topologyRevision, fingerprint, truncated: page.truncated, seeds: Object.freeze(page.relations.map(seedOf)) });
      this.neighborhoods.set(id, fresh);
      recomputed.push(id);
      return fresh;
    };

    const reads_: { id: string; key: string; direction: "outgoing" | "incoming"; value: Neighborhood }[] = [];
    if (bounds.focus === undefined) {
      for (const node of window.nodes) reads_.push({ id: `out:${node.key}`, key: node.key, direction: "outgoing", value: neighborhood(`out:${node.key}`, node.key, "outgoing") });
    } else {
      reads_.push({ id: `out:${bounds.focus}`, key: bounds.focus, direction: "outgoing", value: neighborhood(`out:${bounds.focus}`, bounds.focus, "outgoing") });
      reads_.push({ id: `in:${bounds.focus}`, key: bounds.focus, direction: "incoming", value: neighborhood(`in:${bounds.focus}`, bounds.focus, "incoming") });
    }
    for (const id of [...this.neighborhoods.keys()]) if (!used.has(id)) this.neighborhoods.delete(id);

    const seen = new Map<string, Seed>();
    for (const read of reads_) for (const seed of read.value.seeds) seen.set(seedId(seed), seed);
    const seeds = [...seen.values()].sort(seedOrder);

    const inView = new Set<string>(windowKeys);
    if (bounds.focus !== undefined) {
      inView.clear();
      inView.add(bounds.focus);
      for (const seed of seeds) {
        for (const other of [seed.from, seed.to]) if (windowKeys.has(other)) inView.add(other);
      }
    }
    const nodes = window.nodes.filter(node => inView.has(node.key));
    const nodeByKey = new Map(nodes.map(node => [node.key, node]));

    const references: GraphReference[] = [];
    const reference = (reason: GraphReferenceReason, seed: Seed): void => {
      references.push({ reason, from: seed.from, to: seed.to, class: seed.class, source: seed.source, confirmed: seed.confirmed });
    };
    const candidates: Seed[] = [];
    for (const seed of seeds) {
      if (nodeByKey.has(seed.from) && nodeByKey.has(seed.to)) candidates.push(seed);
      else reference("endpoint-not-in-view", seed);
    }
    const cyclic = cycleEdges([...nodeByKey.keys()], candidates);
    const arrows: Seed[] = [];
    for (const seed of candidates) {
      if (cyclic.has(seed)) reference("cycle", seed);
      else arrows.push(seed);
    }

    const byFrom = new Map<string, Seed[]>();
    for (const arrow of arrows) byFrom.set(arrow.from, [...(byFrom.get(arrow.from) ?? []), arrow]);
    const truncatedOut = new Set(reads_.filter(read => read.direction === "outgoing" && read.value.truncated).map(read => read.key));
    const collapsed = new Set<Seed>();
    const supernodes: GraphSupernode[] = [];
    for (const [from, group] of [...byFrom].sort((a, b) => compare(a[0], b[0]))) {
      if (group.length <= bounds.maxFanOut) continue;
      for (const arrow of group) collapsed.add(arrow);
      const targets = group.map(arrow => nodeByKey.get(arrow.to));
      const fromNode = nodeByKey.get(from);
      const fromLabel = fromNode ? shown(fromNode.presentation.title) || referenceLabel(fromNode.nativeRef) : "node";
      const lowerBound = truncatedOut.has(from);
      supernodes.push({
        key: `fanout:${from}`,
        from,
        label: `${lowerBound ? "at least " : ""}${group.length} targets collapsed from ${fromLabel} (fan-out above ${bounds.maxFanOut})`,
        count: group.length,
        lowerBound,
        providers: tally(targets.map(node => shown(node?.nativeRef.provider))).map(entry => ({ provider: entry.value, count: entry.count })),
        tones: tally(targets.flatMap(node => (node ? [node.presentation.statusTone] : []))).map(entry => ({ tone: entry.value, count: entry.count })),
        classes: [...new Set(group.map(arrow => arrow.class))].sort(),
      });
    }
    const edges = arrows.filter(arrow => !collapsed.has(arrow));

    const visible = new Set<string>();
    for (const edge of edges) {
      visible.add(edge.from);
      visible.add(edge.to);
    }
    for (const entry of references) {
      visible.add(entry.from);
      visible.add(entry.to);
    }
    const absorbed = new Set<string>();
    for (const arrow of collapsed) if (!visible.has(arrow.to) && arrow.to !== bounds.focus) absorbed.add(arrow.to);

    const graphNodes: GraphNode[] = nodes
      .filter(node => !absorbed.has(node.key))
      .map(node => ({
        key: node.key,
        nativeRef: { ...node.nativeRef },
        provider: shown(node.nativeRef.provider),
        type: node.presentation.type,
        label: shown(node.presentation.title) || referenceLabel(node.nativeRef),
        status: shown(node.presentation.statusText),
        tone: node.presentation.statusTone,
        freshness: node.freshness,
      }));

    references.sort((a, b) => compare(a.reason, b.reason) || compare(a.from, b.from) || compare(a.to, b.to) || compare(a.class, b.class) || compare(a.source, b.source));
    const keptReferences = references.slice(0, bounds.maxReferences);

    const partials: GraphPartial[] = [];
    if (window.nodes.length < window.total) {
      partials.push({
        scope: "window",
        shown: window.nodes.length,
        offered: window.total,
        label: `showing ${window.nodes.length} of ${window.total} rows`,
      });
    }
    for (const read of reads_) {
      if (!read.value.truncated) continue;
      const owner = nodeByKey.get(read.key);
      const name = owner ? shown(owner.presentation.title) || referenceLabel(owner.nativeRef) : "node";
      partials.push({
        scope: "relations",
        subject: read.key,
        direction: read.direction,
        shown: read.value.seeds.length,
        label: `${name}: showing ${read.value.seeds.length} ${read.direction} relations, more exist (page truncated)`,
      });
    }
    if (references.length > keptReferences.length) {
      partials.push({
        scope: "references",
        shown: keptReferences.length,
        offered: references.length,
        label: `showing ${keptReferences.length} of ${references.length} references`,
      });
    }

    const model: GraphViewModel = deepFreeze({
      contract: GRAPH_VIEW_CONTRACT,
      revisionBasis: { revision: window.revision, topologyRevision },
      complete: partials.length === 0,
      supernodes,
      nodes: graphNodes,
      edges: edges.map(edge => ({ ...edge })),
      references: keptReferences,
      partials,
    });
    this.cached = { requestKey, topologyRevision, revision: window.revision, model };
    this.lastBuild = { cacheHit: false, relationReads: reads, recomputed: recomputed.sort(), reused: reused.sort() };
    return model;
  }
}

/** A builder holding the topology-revision cache; keep one per inspector view and call build on each change. */
export function createGraphViewBuilder(reader: GraphReader): GraphViewBuilder {
  return new Builder(reader);
}

/** One uncached build. */
export function buildGraphView(reader: GraphReader, request: GraphViewRequest): GraphViewModel {
  return new Builder(reader).build(request);
}
