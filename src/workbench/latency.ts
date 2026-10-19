/**
 * Latency decomposition selector (docs/workbench/09 § Aggregates and profiling: "Derive latency decomposition only
 * with valid source intervals"; docs/workbench/11 § Comparative experiment protocol: separate model tokens, provider
 * waiting, Forge build time, RF context time, external queue and overlay overhead "when telemetry allows"). A pure
 * read over ONE bounded ObservationProjection page: it attributes the CLOSED producer intervals of an invocation to a
 * class by a frozen provider map, never by a title or kind, and counts open and missing intervals without summing
 * them. It reads no clock and no randomness, never mutates the projection, and never estimates a waiting/executing
 * split, a token count or an overhead that the observed page cannot support: those are reported as unmeasured with a
 * reason from a frozen vocabulary.
 *
 * The invocation's root (the examined node of presentation type "workflow") carries the wall; it is not itself a
 * component, so the host provider's own entry never absorbs the whole wall and drives overhead to zero.
 *
 * Provider strings are producer text: they pass the shared display helper (sanitizeWorkbenchText, label layout, in
 * redaction.ts) and a 64-character bound before they appear in a report. Native references are the projection's own identities, copied
 * unchanged so a caller can resolve them.
 */
import { CapabilityError } from "./capability-registry.js";
import type { MeasuredMetric } from "./designer.js";
import type { NativeRef, ObservationProjection, ObservationScope, ObservedNode } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const LATENCY_CONTRACT = "workbench.latency-decomposition/v1";
export const LATENCY_CLASSES = Object.freeze(["model", "build", "context", "queue", "query", "host", "other"] as const);
export type LatencyClass = (typeof LATENCY_CLASSES)[number];
/** Provider to class; any provider not listed here is "other". */
export const LATENCY_PROVIDER_CLASSES: Readonly<Record<string, LatencyClass>> = Object.freeze({
  "claude-agent-sdk": "model",
  forge: "build",
  reactivefiber: "context",
  furnace: "queue",
  hyperunix: "query",
  "pi-workflow": "host",
});
/** Why a figure is unmeasured or partial, in the order a report lists them. */
export const LATENCY_REASONS = Object.freeze(["page-truncated", "open-intervals", "missing-intervals", "no-root-interval", "no-native-usage", "single-interval-per-node", "components-exceed-wall", "components-outside-wall"] as const);
export type LatencyReason = (typeof LATENCY_REASONS)[number];
export const LATENCY_CAVEAT = "Closed source intervals only; cross-provider clocks are not reconciled and open or missing intervals are counted, never summed.";

export interface LatencyUsage { source: NativeRef; inputTokens: number; outputTokens: number; evidenceRefs: readonly string[] }
export interface LatencyInput {
  scope: ObservationScope;
  invocationId: string;
  /** Nodes examined from one projection page; default 100, an integer in 1..100. */
  limit?: number;
  /** Native usage rows; a row counts only when its source matches an examined node's native reference. */
  usage?: readonly LatencyUsage[];
}
export interface LatencyComponent {
  class: LatencyClass;
  providers: string[];
  /** Providers beyond the listed few; the nodes and intervals still count. */
  providersOmitted: number;
  nodes: number;
  intervals: { closed: number; open: number; missing: number };
  busyMs: number;
  unionMs: number;
  measured: boolean;
  reasons: LatencyReason[];
  evidenceRefs: string[];
}
export type LatencyWall = { measured: true; ms: number; from: "root-interval" } | { measured: false; reasons: LatencyReason[] };
export type LatencyOverhead = { measured: true; ms: number } | { measured: false; reasons: LatencyReason[] };
export type LatencyTokens = { measured: true; input: number; output: number; sources: NativeRef[] } | { measured: false; reasons: LatencyReason[] };
export interface LatencyDecomposition {
  contract: typeof LATENCY_CONTRACT;
  basis: "observed";
  invocationId: string;
  examined: { nodes: number; truncated: boolean };
  /** The invocation's root node, when the page holds one; the source of every metric row. */
  root?: NativeRef;
  wall: LatencyWall;
  components: LatencyComponent[];
  waiting: { nodes: number; reasons: LatencyReason[] };
  tokens: LatencyTokens;
  overhead: LatencyOverhead;
  evidenceRefs: string[];
  caveat: typeof LATENCY_CAVEAT;
}

type Projection = Pick<ObservationProjection, "query">;

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 100;
const MAX_PROVIDER = 64;
const MAX_PROVIDER_SCAN = 512;
const MAX_PROVIDERS_LISTED = 4;
const MAX_EVIDENCE_LISTED = 4;
const MAX_EVIDENCE_CHARS = 120;
const MAX_SOURCES_LISTED = 8;
const MAX_REPORT_CHARS = 8_000;
/** Shape of a bounded, timezone-qualified ISO-8601 instant; the host date parser alone is too lenient. */
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Latency selection refused: ${message}.`);
const byText = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const refKey = (ref: NativeRef): string => JSON.stringify([ref.provider, ref.type, ref.scope ?? "", ref.id]);
const nativeRefOf = (ref: NativeRef): NativeRef => ({ provider: ref.provider, type: ref.type, id: ref.id, ...(ref.scope !== undefined ? { scope: ref.scope } : {}) });

function instantMs(value: unknown): number | undefined {
  if (typeof value !== "string" || value.length > 64 || !ISO_INSTANT.test(value)) return undefined;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : undefined;
}

type Span = { state: "closed"; startMs: number; endMs: number } | { state: "open" } | { state: "missing" };
/** Closed: both bounds valid and ordered. Open: a valid start and no end stated. Anything else is missing. */
function spanOf(node: ObservedNode): Span {
  const startMs = instantMs(node.interval?.startedAt);
  if (startMs === undefined) return { state: "missing" };
  if (node.interval?.endedAt === undefined) return { state: "open" };
  const endMs = instantMs(node.interval.endedAt);
  return endMs === undefined || endMs < startMs ? { state: "missing" } : { state: "closed", startMs, endMs };
}

function classOf(provider: string): LatencyClass {
  return Object.hasOwn(LATENCY_PROVIDER_CLASSES, provider) ? LATENCY_PROVIDER_CLASSES[provider] : "other";
}

/** Producer text through the shared helper's label layout (normalize, redact, strip once, deletion never before redaction). */
function sanitizedText(raw: unknown): string {
  return typeof raw === "string" ? sanitizeWorkbenchText(raw.slice(0, MAX_PROVIDER_SCAN), MAX_PROVIDER_SCAN, "label") : "";
}
/** Producer text bound for display: the sanitized text, then a cut to `most` characters that never leaves half a surrogate pair. */
function displayText(raw: unknown, most: number): string {
  const shown = sanitizedText(raw);
  if (shown.length <= most) return shown;
  const last = shown.charCodeAt(most - 1);
  return shown.slice(0, last >= 0xd800 && last <= 0xdbff ? most - 1 : most);
}

interface Interval { startMs: number; endMs: number }
function unionMs(spans: readonly Interval[]): number {
  const ordered = [...spans].sort((a, b) => a.startMs - b.startMs || a.endMs - b.endMs);
  let total = 0;
  let from = 0;
  let to = 0;
  let started = false;
  for (const span of ordered) {
    if (!started || span.startMs > to) {
      total += to - from;
      from = span.startMs;
      to = span.endMs;
      started = true;
    } else if (span.endMs > to) to = span.endMs;
  }
  return total + (started ? to - from : 0);
}

/** An evidence ref is kept whole or not at all: the drop is decided on the SANITIZED length before any cut, because a
 * truncated ref is a wrong ref. */
function evidenceText(raw: unknown): string {
  // A ref whose RAW length exceeds the scan bound is dropped first, before the scan cut: sanitizedText reads only the
  // first MAX_PROVIDER_SCAN units, so a longer ref whose prefix shrinks under the label layout would pass truncated.
  if (typeof raw === "string" && raw.length > MAX_PROVIDER_SCAN) return "";
  const shown = sanitizedText(raw);
  return shown.length <= MAX_EVIDENCE_CHARS ? shown : "";
}

function evidenceOf(nodes: readonly ObservedNode[], first?: ObservedNode): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  const add = (node: ObservedNode, sort: boolean): void => {
    const shown = [...node.evidenceRefs].map(evidenceText).filter(item => item !== "");
    for (const item of sort ? shown.sort(byText) : shown) if (!seen.has(item)) { seen.add(item); ordered.push(item); }
  };
  if (first) add(first, false);
  const rest: string[] = [];
  for (const node of nodes) if (node !== first) for (const item of node.evidenceRefs) {
    const shown = evidenceText(item);
    if (shown !== "" && !seen.has(shown)) rest.push(shown);
  }
  for (const item of [...new Set(rest)].sort(byText)) if (!seen.has(item)) { seen.add(item); ordered.push(item); }
  return ordered.slice(0, MAX_EVIDENCE_LISTED);
}

function tokensOf(usage: readonly LatencyUsage[] | undefined, examined: readonly ObservedNode[]): LatencyTokens {
  const known = new Set(examined.map(node => refKey(node.nativeRef)));
  const counted = new Set<string>();
  const sources: NativeRef[] = [];
  let input = 0;
  let output = 0;
  for (const row of usage ?? []) {
    const source = row?.source;
    if (!source || typeof source.provider !== "string" || typeof source.type !== "string" || typeof source.id !== "string") continue;
    const key = refKey(source);
    if (!known.has(key) || counted.has(key)) continue;
    if (!Number.isSafeInteger(row.inputTokens) || row.inputTokens < 0 || !Number.isSafeInteger(row.outputTokens) || row.outputTokens < 0) continue;
    if (!Number.isSafeInteger(input + row.inputTokens) || !Number.isSafeInteger(output + row.outputTokens)) continue;
    counted.add(key);
    input += row.inputTokens;
    output += row.outputTokens;
    sources.push(nativeRefOf(source));
  }
  if (counted.size === 0) return { measured: false, reasons: ["no-native-usage"] };
  return { measured: true, input, output, sources: sources.sort((a, b) => byText(refKey(a), refKey(b))).slice(0, MAX_SOURCES_LISTED) };
}

/** Keep the serialized report inside MAX_REPORT_CHARS whatever the identity lengths: evidence goes first, then the
 * token source list, then provider names. The figures themselves are never dropped. */
function bounded(report: LatencyDecomposition): LatencyDecomposition {
  let next = report;
  const over = (): boolean => JSON.stringify(next).length > MAX_REPORT_CHARS;
  if (over()) next = { ...next, evidenceRefs: [], components: next.components.map(item => ({ ...item, evidenceRefs: [] })) };
  if (over() && next.tokens.measured) next = { ...next, tokens: { ...next.tokens, sources: [] } };
  if (over()) next = { ...next, components: next.components.map(item => ({ ...item, providersOmitted: item.providersOmitted + item.providers.length, providers: [] })) };
  return next;
}

export function selectLatencyDecomposition(projection: Projection, input: LatencyInput): LatencyDecomposition {
  const limit = input.limit ?? DEFAULT_LIMIT;
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > MAX_LIMIT) throw refused(`limit must be an integer in 1..${MAX_LIMIT}`);
  const { scope, invocationId } = input;
  if (typeof invocationId !== "string" || invocationId === "") throw refused("invocationId must be a non-empty string");
  const page = projection.query({ scope, invocationId, limit });
  // The projection binds tenant scope and invocation itself; re-checking keeps a foreign, repeated or surplus row out.
  const seen = new Set<string>();
  const rows: ObservedNode[] = [];
  for (const node of page.nodes) {
    if (node.scope.workspace !== scope.workspace || node.scope.principal !== scope.principal || node.invocationId !== invocationId || seen.has(node.key)) continue;
    seen.add(node.key);
    rows.push(node);
  }
  const truncated = page.truncated === true || rows.length > limit;
  const examined = rows.slice(0, limit);

  const spans = new Map<string, Span>();
  for (const node of examined) spans.set(node.key, spanOf(node));
  const roots = examined.filter(node => node.presentation.type === "workflow").sort((a, b) => byText(a.key, b.key));
  const closedRoot = roots.find(node => spans.get(node.key)?.state === "closed");
  const rootNode = closedRoot ?? roots[0];
  const rootSpan = closedRoot ? spans.get(closedRoot.key) : undefined;
  const wall: LatencyWall = rootSpan?.state === "closed" ? { measured: true, ms: rootSpan.endMs - rootSpan.startMs, from: "root-interval" } : { measured: false, reasons: ["no-root-interval"] };

  const grouped = new Map<LatencyClass, ObservedNode[]>(LATENCY_CLASSES.map(name => [name, []]));
  for (const node of examined) if (node !== closedRoot) grouped.get(classOf(node.nativeRef.provider))?.push(node);

  const everyClosed: Interval[] = [];
  let open = 0;
  let missing = 0;
  if (closedRoot === undefined) for (const node of roots) { const state = spans.get(node.key)?.state; if (state === "open") open += 1; else if (state === "missing") missing += 1; }
  const components = LATENCY_CLASSES.map((name): LatencyComponent => {
    const members = grouped.get(name) ?? [];
    const closed: Interval[] = [];
    const counts = { closed: 0, open: 0, missing: 0 };
    for (const node of members) {
      const span = spans.get(node.key);
      if (span?.state === "closed") { counts.closed += 1; closed.push(span); everyClosed.push(span); }
      else if (span?.state === "open") counts.open += 1;
      else counts.missing += 1;
    }
    open += counts.open;
    missing += counts.missing;
    const providers = [...new Set(members.map(node => displayText(node.nativeRef.provider, MAX_PROVIDER)))].filter(item => item !== "").sort(byText);
    const reasons: LatencyReason[] = [];
    if (truncated) reasons.push("page-truncated");
    if (counts.open > 0) reasons.push("open-intervals");
    if (counts.missing > 0) reasons.push("missing-intervals");
    return {
      class: name, providers: providers.slice(0, MAX_PROVIDERS_LISTED), providersOmitted: Math.max(0, providers.length - MAX_PROVIDERS_LISTED), nodes: members.length, intervals: counts,
      busyMs: closed.reduce((sum, span) => sum + (span.endMs - span.startMs), 0), unionMs: unionMs(closed), measured: counts.closed > 0, reasons, evidenceRefs: evidenceOf(members),
    };
  });

  const overheadReasons: LatencyReason[] = [];
  if (!wall.measured) overheadReasons.push("no-root-interval");
  if (truncated) overheadReasons.push("page-truncated");
  if (open > 0) overheadReasons.push("open-intervals");
  if (missing > 0) overheadReasons.push("missing-intervals");
  const componentsMs = unionMs(everyClosed);
  if (wall.measured && overheadReasons.length === 0 && componentsMs > wall.ms) overheadReasons.push("components-exceed-wall");
  // A closed component interval must lie inside the closed root interval, or its overhead share is not the wall's.
  else if (rootSpan?.state === "closed" && overheadReasons.length === 0 && everyClosed.some(span => span.startMs < rootSpan.startMs || span.endMs > rootSpan.endMs)) overheadReasons.push("components-outside-wall");
  const overhead: LatencyOverhead = wall.measured && overheadReasons.length === 0 ? { measured: true, ms: wall.ms - componentsMs } : { measured: false, reasons: overheadReasons };

  return bounded({
    contract: LATENCY_CONTRACT,
    basis: "observed",
    invocationId: displayText(invocationId, MAX_PROVIDER * 2),
    examined: { nodes: examined.length, truncated },
    ...(rootNode ? { root: nativeRefOf(rootNode.nativeRef) } : {}),
    wall,
    components,
    waiting: { nodes: components.reduce((sum, item) => sum + item.nodes, 0), reasons: ["single-interval-per-node"] },
    tokens: tokensOf(input.usage, examined),
    overhead,
    evidenceRefs: evidenceOf(examined, rootNode),
    caveat: LATENCY_CAVEAT,
  });
}

export interface LatencyMetricOptions { subjectBasis: string; freshness: MeasuredMetric["freshness"] }

/** MeasuredMetric rows for compareWorkflowRuns. Coverage is "complete" only for a whole page whose component has no
 * open or missing interval; "unknown" when nothing in the component was measured. No root node, no attributable source,
 * so no rows. */
export function toMeasuredMetrics(report: LatencyDecomposition, options: LatencyMetricOptions): MeasuredMetric[] {
  const source = report.root;
  if (!source) return [];
  const rows: MeasuredMetric[] = [];
  const push = (name: string, value: number, coverage: MeasuredMetric["coverage"], evidenceRefs: readonly string[]): void => {
    rows.push({ name, unit: "ms", value, source: nativeRefOf(source), evidenceRefs: [...evidenceRefs], subjectBasis: options.subjectBasis, coverage, freshness: options.freshness });
  };
  for (const item of report.components) {
    if (item.nodes === 0) continue;
    const coverage = !item.measured ? "unknown" : !report.examined.truncated && item.intervals.open + item.intervals.missing === 0 ? "complete" : "partial";
    push(`latency.${item.class}.unionMs`, item.unionMs, coverage, item.evidenceRefs);
    push(`latency.${item.class}.busyMs`, item.busyMs, coverage, item.evidenceRefs);
  }
  if (report.wall.measured) push("latency.wall.ms", report.wall.ms, report.examined.truncated ? "partial" : "complete", report.evidenceRefs);
  if (report.overhead.measured) push("latency.overhead.ms", report.overhead.ms, "complete", report.evidenceRefs);
  return rows;
}
