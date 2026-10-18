/**
 * Attention and bottleneck selector (docs/workbench/10 § Four views, Overview; docs/workbench/09 § Aggregates and
 * profiling). A pure read over ONE bounded ObservationProjection page: it counts observed tones, freshness and
 * connection state, ranks producer-stated open intervals against the CALLER's clock, and states a dependency-chain
 * critical path only as partial-estimated when every condition for it was observed, otherwise as an incomplete trace
 * naming every reason. It never reads the host clock, never mutates the projection and never invents an edge, an
 * interval or a duration: a duration appears only beside a measured or partial-estimated label.
 *
 * Titles are producer text and pass the shared sanitizers (redaction.ts) here. Keys, native references and provider
 * names are the projection's own bounded identities, copied unchanged so a consumer can resolve them; display and
 * tool boundaries sanitize them as they do every projection row.
 */
import { CapabilityError } from "./capability-registry.js";
import type { NativeRef, ObservationProjection, ObservationScope, ObservedNode, Presentation, Relation } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const ATTENTION_CONTRACT = "workbench.attention/v1";
export const ATTENTION_CRITICAL_PATH_CAVEAT = "Observed dependency edges and complete source intervals only; missing edges do not imply independence.";
export const ATTENTION_CLOCK_CAVEAT = "openMs uses the caller clock against producer startedAt; cross-provider clocks are not reconciled.";
/** Why an observed trace cannot support a critical-path estimate, in the order a report lists them. */
export const ATTENTION_TRACE_REASONS = ["no-dependency-edges", "missing-intervals", "open-intervals", "hypothesis-edges", "cycle", "truncated"] as const;
export type AttentionTraceReason = (typeof ATTENTION_TRACE_REASONS)[number];

export interface AttentionInput {
  scope: ObservationScope;
  invocationId: string;
  /** The caller's clock: a bounded ISO-8601 instant with a timezone. */
  now: string;
  /** Nodes examined from one projection page; default 100, at most 100. */
  limit?: number;
  /** Bottlenecks listed; default 5, at most 20. */
  bottlenecks?: number;
}
export interface AttentionCounts {
  active: number; waiting: number; success: number; failure: number; unknown: number;
  stale: number; disconnected: number; withInterval: number; withoutInterval: number;
}
/** One producer-stated open interval measured against the caller clock. */
export interface AttentionBottleneck {
  key: string; nativeRef: NativeRef; title: string; tone: "active" | "waiting"; freshness: ObservedNode["freshness"]; openMs: number; measured: true;
}
export type AttentionCriticalPath =
  | { label: "incomplete-trace"; reasons: AttentionTraceReason[] }
  | {
      label: "partial-estimated"; keys: string[]; measuredMs: number;
      coverage: { chainNodes: number; dependencyEdges: number }; caveat: typeof ATTENTION_CRITICAL_PATH_CAVEAT;
    };
export interface AttentionReport {
  contract: typeof ATTENTION_CONTRACT;
  basis: "observed";
  now: string;
  examined: { nodes: number; truncated: boolean };
  counts: AttentionCounts;
  disconnectedProviders: string[];
  bottlenecks: AttentionBottleneck[];
  /** Active or waiting nodes with no measurable open interval (none, or one that ended); never ranked. */
  unmeasured: number;
  /** Open intervals whose producer start lies after the caller clock; each is clamped to openMs 0. */
  clockSkew: number;
  criticalPath: AttentionCriticalPath;
  clockCaveat: typeof ATTENTION_CLOCK_CAVEAT;
}

/** The read side the selector uses. relationsPage is optional: a projection that has it reports whether a relation page
 * hides a further edge, one that lacks it (a producer stand-in, a query-only fake) is read exactly as before. */
type Projection = Pick<ObservationProjection, "query" | "relations"> & Partial<Pick<ObservationProjection, "relationsPage">>;
type Tone = Presentation["statusTone"];
type Freshness = ObservedNode["freshness"];

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 100;
const DEFAULT_BOTTLENECKS = 5;
const MAX_BOTTLENECKS = 20;
/** Rows requested per relation page; the projection may cap a page lower, at its own maxQuery. */
const RELATION_PAGE = 100;
/** Pairwise relation reads one report may spend re-reading pages that may have been capped. */
const MAX_PAIR_READS = 2_000;
const MAX_TITLE = 120;
/** Producer text scanned for a title; anything later is never shown. */
const MAX_TITLE_SCAN = 4_096;
const TRUNCATED = " [truncated]";
/** A disconnected-provider list longer than this is withheld whole; counts.disconnected still reports every node. */
const MAX_PROVIDER_LIST = 2_048;
const MAX_REPORT_CHARS = 16_000;
const TONES: readonly string[] = ["active", "waiting", "success", "failure", "unknown"];
const FRESHNESS: readonly string[] = ["current", "stale", "unknown"];

/** The caller clock's shape: an ISO-8601 date-time with a timezone. The host date parser alone is lenient enough to
 * accept prose and comments (control characters included), so the shape is checked before the instant is read. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Attention selection refused: ${message}.`);
const isTone = (value: string): value is Tone => TONES.includes(value);
const isFreshness = (value: string): value is Freshness => FRESHNESS.includes(value);
const byKey = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

/** Epoch milliseconds of a bounded, timezone-qualified instant: the same values the projection accepts. */
function instantMs(value: unknown): number | undefined {
  if (typeof value !== "string" || value.length > 64 || !/(?:Z|[+-]\d\d:\d\d)$/.test(value)) return undefined;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : undefined;
}

function bound(value: number | undefined, fallback: number, least: number, most: number, name: string): number {
  if (value === undefined) return fallback;
  if (!Number.isSafeInteger(value) || value < least) throw refused(`${name} must be an integer of at least ${least}`);
  return Math.min(value, most);
}

interface Span { startMs: number; endMs?: number }
/** A valid source interval: a parseable start and, when an end is stated at all, a parseable end no earlier than it.
 * Only an absent endedAt is open; a stated but unreadable one (an empty string included) proves neither an end nor
 * an open interval, so the whole interval is unmeasured. */
function spanOf(node: ObservedNode): Span | undefined {
  const startMs = instantMs(node.interval?.startedAt);
  if (startMs === undefined) return undefined;
  if (node.interval?.endedAt === undefined) return { startMs };
  const endMs = instantMs(node.interval.endedAt);
  return endMs === undefined || endMs < startMs ? undefined : { startMs, endMs };
}

/** Producer text bound for display: the shared helper's label layout, and a longer title is cut to MAX_TITLE with a visible
 * marker, never through a surrogate pair. */
function titleOf(node: ObservedNode): string {
  const raw = node.presentation.title;
  if (typeof raw !== "string") return "";
  const shown = sanitizeWorkbenchText(raw.slice(0, MAX_TITLE_SCAN), MAX_TITLE_SCAN, "label");
  if (shown.length <= MAX_TITLE) return shown;
  let end = MAX_TITLE - TRUNCATED.length;
  const last = shown.charCodeAt(end - 1);
  if (last >= 0xd800 && last <= 0xdbff) end -= 1;
  return `${shown.slice(0, end).trimEnd()}${TRUNCATED}`;
}

const nativeRefOf = (ref: NativeRef): NativeRef =>
  ({ provider: ref.provider, type: ref.type, id: ref.id, ...(ref.scope !== undefined ? { scope: ref.scope } : {}) });

interface ObservedEdges { successors: Map<string, Set<string>>; dependencyEdges: number; hypothesis: boolean; unread: boolean }

/** One relation page and, when the projection reports it, whether a further matching edge exists past the page. */
interface PageRead { rows: Relation[]; reported?: boolean }
function readPage(projection: Projection, input: { scope: ObservationScope; from: string; to?: string; limit: number }): PageRead {
  if (typeof projection.relationsPage === "function") {
    const page = projection.relationsPage(input);
    return { rows: page.relations, reported: page.truncated };
  }
  return { rows: projection.relations(input) };
}

/** Dependency and hypothesis edges between examined nodes, read from examined keys only.
 * A projection with relationsPage reports whether a page hides a further edge: a page reported whole is read as it is,
 * with no pair re-read and no budget spent. Without relationsPage the page size is the only signal: the projection caps
 * each page at its own maxQuery, which this selector cannot see, but its query just returned these keys, so that cap is
 * at least `keys.length` and a page holding fewer rows than both the page size and the examined count is provably whole.
 * A page reported truncated, or (unreported) a fuller page, is re-read pair by pair over the examined nodes; a pair page
 * reported truncated or holding that many rows, or a spent pair budget, leaves an edge possibly unread. */
function observedEdges(projection: Projection, scope: ObservationScope, keys: readonly string[]): ObservedEdges {
  const examined = new Set(keys);
  const whole = Math.min(RELATION_PAGE, keys.length);
  const successors = new Map<string, Set<string>>();
  let dependencyEdges = 0;
  let hypothesis = false;
  let unread = false;
  let pairReads = MAX_PAIR_READS;
  for (const key of keys) {
    const page = readPage(projection, { scope, from: key, limit: RELATION_PAGE });
    let rows: Relation[] = page.rows;
    if (page.reported ?? rows.length >= whole) {
      if (pairReads < keys.length) unread = true;
      else {
        pairReads -= keys.length;
        rows = [];
        for (const to of keys) {
          const pair = readPage(projection, { scope, from: key, to, limit: RELATION_PAGE });
          if (pair.reported === true || pair.rows.length >= whole) unread = true;
          rows.push(...pair.rows);
        }
      }
    }
    for (const row of rows) {
      if (row.from !== key || !examined.has(row.to)) continue;
      if (row.kind === "hypothesis") hypothesis = true;
      if (row.kind !== "dependency") continue;
      const next = successors.get(key) ?? new Set<string>();
      if (!next.has(row.to)) dependencyEdges += 1;
      next.add(row.to);
      successors.set(key, next);
    }
  }
  return { successors, dependencyEdges, hypothesis, unread };
}

/** Kahn's order over the dependency graph, or undefined when a cycle (a self-loop included) leaves nodes unordered. */
function topologicalOrder(nodes: ReadonlySet<string>, successors: ReadonlyMap<string, ReadonlySet<string>>): string[] | undefined {
  const indegree = new Map<string, number>();
  for (const node of nodes) indegree.set(node, 0);
  for (const next of successors.values()) for (const to of next) indegree.set(to, (indegree.get(to) ?? 0) + 1);
  const ready = [...nodes].filter(node => indegree.get(node) === 0);
  const order: string[] = [];
  for (let node = ready.pop(); node !== undefined; node = ready.pop()) {
    order.push(node);
    for (const to of successors.get(node) ?? []) {
      const left = (indegree.get(to) ?? 0) - 1;
      indegree.set(to, left);
      if (left === 0) ready.push(to);
    }
  }
  return order.length === nodes.size ? order : undefined;
}

interface Chain { ms: number; keys: string[] }
function compareKeys(a: readonly string[], b: readonly string[]): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return byKey(a[i], b[i]);
  return a.length - b.length;
}
/** The longer measured chain wins; equal chains go to the lower key sequence, so the choice is deterministic. */
const longer = (a: Chain, b: Chain | undefined): boolean => b === undefined || a.ms > b.ms || (a.ms === b.ms && compareKeys(a.keys, b.keys) < 0);

function criticalPathOf(projection: Projection, scope: ObservationScope, keys: readonly string[], spans: ReadonlyMap<string, Span>, truncated: boolean): AttentionCriticalPath {
  const { successors, dependencyEdges, hypothesis, unread } = observedEdges(projection, scope, keys);
  const incident = new Set<string>();
  for (const [from, next] of successors) {
    incident.add(from);
    for (const to of next) incident.add(to);
  }
  // An open or missing interval anywhere in the observed dependency graph leaves the longest chain unestablished, not
  // only one on the chain a full trace would choose: a still-running node may yet outgrow every measured chain.
  const reasons: AttentionTraceReason[] = [];
  if (dependencyEdges === 0) reasons.push("no-dependency-edges");
  if ([...incident].some(key => !spans.has(key))) reasons.push("missing-intervals");
  if ([...incident].some(key => spans.has(key) && spans.get(key)?.endMs === undefined)) reasons.push("open-intervals");
  if (hypothesis) reasons.push("hypothesis-edges");
  const order = topologicalOrder(incident, successors);
  if (!order) reasons.push("cycle");
  if (truncated || unread) reasons.push("truncated");
  if (reasons.length > 0 || !order) return { label: "incomplete-trace", reasons };

  // Longest chain from each node to a sink, in reverse topological order. Durations are non-negative, so the longest
  // chain overall starts where no observed dependency enters.
  const best = new Map<string, Chain>();
  const entered = new Set<string>();
  for (let i = order.length - 1; i >= 0; i--) {
    const key = order[i];
    const span = spans.get(key);
    // Every node here carries a complete span (an open or missing one returned above); the guard only narrows the type.
    const ms = span?.endMs === undefined ? 0 : span.endMs - span.startMs;
    let tail: Chain | undefined;
    for (const to of successors.get(key) ?? []) {
      entered.add(to);
      const next = best.get(to);
      if (next && longer(next, tail)) tail = next;
    }
    best.set(key, tail ? { ms: ms + tail.ms, keys: [key, ...tail.keys] } : { ms, keys: [key] });
  }
  let chosen: Chain | undefined;
  for (const key of order) {
    const chain = best.get(key);
    if (!entered.has(key) && chain && longer(chain, chosen)) chosen = chain;
  }
  // Unreachable: an acyclic graph with at least one edge has a source. Kept so no path can emit an unlabeled number.
  if (!chosen) return { label: "incomplete-trace", reasons: ["no-dependency-edges"] };
  return {
    label: "partial-estimated", keys: chosen.keys, measuredMs: chosen.ms,
    coverage: { chainNodes: chosen.keys.length, dependencyEdges }, caveat: ATTENTION_CRITICAL_PATH_CAVEAT,
  };
}

/** Keep the serialized report inside MAX_REPORT_CHARS whatever the identity lengths. A chain that cannot be listed
 * whole is withdrawn as truncated rather than listed in part; then the lowest-ranked bottlenecks go. */
function bounded(report: AttentionReport): AttentionReport {
  let next = report;
  if (JSON.stringify(next.disconnectedProviders).length > MAX_PROVIDER_LIST) next = { ...next, disconnectedProviders: [] };
  if (JSON.stringify(next).length > MAX_REPORT_CHARS && next.criticalPath.label === "partial-estimated") {
    next = { ...next, criticalPath: { label: "incomplete-trace", reasons: ["truncated"] } };
  }
  while (next.bottlenecks.length > 0 && JSON.stringify(next).length > MAX_REPORT_CHARS) next = { ...next, bottlenecks: next.bottlenecks.slice(0, -1) };
  return next;
}

export function selectAttention(projection: Projection, input: AttentionInput): AttentionReport {
  const nowMs = typeof input.now === "string" && ISO_INSTANT.test(input.now) ? instantMs(input.now) : undefined;
  if (nowMs === undefined) {
    throw refused("now must be the caller's clock as a bounded, timezone-qualified ISO-8601 instant");
  }
  const limit = bound(input.limit, DEFAULT_LIMIT, 1, MAX_LIMIT, "limit");
  const wanted = bound(input.bottlenecks, DEFAULT_BOTTLENECKS, 0, MAX_BOTTLENECKS, "bottlenecks");
  const { scope, invocationId } = input;
  const page = projection.query({ scope, invocationId, limit });
  // The projection binds tenant scope and invocation itself; re-checking keeps a foreign, repeated or surplus row out
  // of the report whatever a producer hands back.
  const seen = new Set<string>();
  const nodes: ObservedNode[] = [];
  for (const node of page.nodes) {
    if (node.scope.workspace !== scope.workspace || node.scope.principal !== scope.principal || node.invocationId !== invocationId || seen.has(node.key)) continue;
    seen.add(node.key);
    nodes.push(node);
  }
  const truncated = page.truncated === true || nodes.length > limit;
  const examined = nodes.slice(0, limit);

  const counts: AttentionCounts = { active: 0, waiting: 0, success: 0, failure: 0, unknown: 0, stale: 0, disconnected: 0, withInterval: 0, withoutInterval: 0 };
  const providers = new Set<string>();
  const spans = new Map<string, Span>();
  const open: { node: ObservedNode; tone: "active" | "waiting"; freshness: Freshness; openMs: number }[] = [];
  let unmeasured = 0;
  let clockSkew = 0;
  for (const node of examined) {
    const tone: Tone = isTone(node.presentation.statusTone) ? node.presentation.statusTone : "unknown";
    const freshness: Freshness = isFreshness(node.freshness) ? node.freshness : "unknown";
    counts[tone] += 1;
    if (freshness !== "current") counts.stale += 1;
    if (node.sourceConnectionState === "disconnected") {
      counts.disconnected += 1;
      providers.add(node.nativeRef.provider);
    }
    const span = spanOf(node);
    if (span) {
      counts.withInterval += 1;
      spans.set(node.key, span);
    } else counts.withoutInterval += 1;
    if (tone !== "active" && tone !== "waiting") continue;
    if (!span || span.endMs !== undefined) {
      unmeasured += 1;
      continue;
    }
    const elapsed = nowMs - span.startMs;
    if (elapsed < 0) clockSkew += 1;
    open.push({ node, tone, freshness, openMs: Math.max(0, elapsed) });
  }
  open.sort((a, b) => b.openMs - a.openMs || byKey(a.node.key, b.node.key));
  const bottlenecks = open.slice(0, wanted).map(({ node, tone, freshness, openMs }): AttentionBottleneck => ({
    key: node.key, nativeRef: nativeRefOf(node.nativeRef), title: titleOf(node), tone, freshness, openMs, measured: true,
  }));

  return bounded({
    contract: ATTENTION_CONTRACT,
    basis: "observed",
    now: input.now,
    examined: { nodes: examined.length, truncated },
    counts,
    disconnectedProviders: [...providers].sort(byKey),
    bottlenecks,
    unmeasured,
    clockSkew,
    criticalPath: criticalPathOf(projection, scope, examined.map(node => node.key), spans, truncated),
    clockCaveat: ATTENTION_CLOCK_CAVEAT,
  });
}
