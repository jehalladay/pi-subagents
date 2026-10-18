/**
 * Timeline lane model (docs/workbench/10 § Four views, Timeline: "relative interval lanes grouped by owner/phase/provider,
 * zoom and horizontal pan, observed waiting/executing/blocked periods and concurrency. Never infer exact timing from text
 * or assume clocks agree; note uncertain clocks or event gaps."). A pure, synchronous read over ONE bounded
 * ObservationProjection window plus at most one incoming relation page per returned row. It reads no clock, mutates
 * nothing and calls no producer.
 *
 * Timing comes only from producer-supplied source intervals in RFC 3339 form: an interval the producer cannot prove is
 * withheld whole, an open one stays open and is never given an end. A row joins the lane of its native-confirmed owner,
 * else of its display-grouping parent, else of its provider; dependency, causation and hypothesis edges never place a row
 * or change its timing. Bars are viewport cell math from the earliest observed start, and concurrency is measured over the
 * same intervals. Interval carries no waiting/executing/blocked kind, so the model says so instead of drawing phases.
 *
 * Titles and labels are producer text and pass the shared sanitizers (redaction.ts). Keys and native references are the
 * projection's own bounded identities, copied unchanged so a consumer can resolve them; display and tool boundaries
 * sanitize them as they do every projection row.
 */
import { CapabilityError } from "./capability-registry.js";
import type { Interval, NativeRef, ObservationProjection, ObservationScope, ObservedNode, Presentation, Relation } from "./observation.js";
import { sanitizeWorkbenchText } from "./redaction.js";

export const TIMELINE_CONTRACT = "workbench.timeline/v1";
/** relationsPage is optional: a reader that has it reports whether a relation page hides a further edge, one that lacks it
 * (a producer stand-in) is read exactly as before, where a page holding relationLimit rows is the only sign of a full page. */
export type TimelineReader = Pick<ObservationProjection, "window" | "relations" | "relationRevision"> & Partial<Pick<ObservationProjection, "relationsPage">>;

export interface TimelineRequest {
  scope: ObservationScope;
  invocationId: string;
  /** Window offset, as ObservationProjection.window takes it. */
  offset: number;
  /** Window rows read, 1..100 (the window's own cap). */
  limit: number;
  /** Cells per second, a safe integer 1..8. */
  zoom: number;
  /** Cells scrolled right, a safe integer >= 0. */
  pan: number;
  /** Viewport width in bar cells, a safe integer 8..200. */
  columns: number;
  /** Lanes kept, 1..64 (default 16). */
  maxLanes?: number;
  /** Rows kept per lane, 1..100 (default 40). */
  maxRowsPerLane?: number;
  /** Incoming relations read per row, 1..100 (default 40). A page that returns this many marks truncated.relations, and so
   * does a page the reader reports truncated (ObservationProjection.relationsPage, whose page is capped at the projection's
   * maxQuery, 40 in the extension). A reader without relationsPage reports no truncation, so keep this at or below its page
   * cap: a page capped below this limit cannot be told from a complete one. */
  relationLimit?: number;
}
export type TimelineTiming =
  | { readonly kind: "closed"; readonly startedAt: string; readonly endedAt: string; readonly durationMs: number }
  | { readonly kind: "open"; readonly startedAt: string }
  | { readonly kind: "unavailable"; readonly reason: "no-source-interval" };
/** Viewport cells over [0, columns). offsetCells and lengthCells are unclipped; the flags say which edge cuts the bar. An
 * open bar reaches the right edge and is always cut there, because its interval has no observed end. */
export interface TimelineBar {
  readonly offsetCells: number;
  readonly lengthCells: number;
  readonly clippedLeft: boolean;
  readonly clippedRight: boolean;
  readonly openEnded: boolean;
}
export interface TimelineRow {
  readonly key: string;
  readonly nativeRef: Readonly<NativeRef>;
  readonly title: string;
  readonly tone: Presentation["statusTone"];
  readonly freshness: ObservedNode["freshness"];
  readonly timing: TimelineTiming;
  /** null when the row has no usable interval or its bar lies entirely outside the viewport. */
  readonly bar: TimelineBar | null;
}
export interface TimelineLane {
  readonly key: string;
  readonly label: string;
  /** ownership only when every row joined through an ownership edge; one grouping-joined row makes the lane grouping. */
  readonly basis: "ownership" | "grouping" | "provider";
  /** True only when every edge used for the lane, over every row assigned to it, carries a nativeConfirmationRef. */
  readonly confirmed: boolean;
  readonly rows: readonly TimelineRow[];
}
export type TimelineNoteCode =
  | "clocks-may-differ"
  | "open-intervals-present"
  | "intervals-missing"
  | "stale-rows-present"
  | "window-partial"
  | "relation-page-full"
  | "multiple-parents"
  | "rows-outside-viewport"
  | "phase-kinds-unavailable";
export type TimelineNote =
  | { readonly code: Exclude<TimelineNoteCode, "intervals-missing"> }
  | { readonly code: "intervals-missing"; readonly count: number };
/** Deeply frozen and JSON-lossless. origin, span, concurrency and every note but rows-outside-viewport describe all rows the
 * window returned, so the lane and row bounds never change a measured fact; lanes and bars hold the bounded subset. */
export interface TimelineModel {
  readonly contract: typeof TIMELINE_CONTRACT;
  /** The window's projection revision, for change detection only; never an event order. */
  readonly revision: number;
  readonly topologyRevision: number;
  readonly origin: { readonly startedAt: string; readonly basis: "earliest-observed-start" } | { readonly startedAt: null; readonly basis: "none" };
  /** Origin to the latest observed boundary. complete only when every row of the invocation is in the window and closed. */
  readonly span: { readonly ms: number | null; readonly complete: boolean };
  readonly lanes: readonly TimelineLane[];
  readonly concurrency: { readonly maxMeasured: number; readonly basis: "source-intervals-only"; readonly countsOpenIntervals: true };
  readonly notes: readonly TimelineNote[];
  readonly truncated: { readonly lanes: boolean; readonly rows: boolean; readonly relations: boolean; readonly window: boolean };
}

const MAX_WINDOW = 100;
/** Largest zoom (cells per second) the workbench.timeline/v1 request contract accepts; the inspector zoom reducer clamps to it. */
const MAX_ZOOM = 8;

export { MAX_ZOOM };

const MIN_COLUMNS = 8;
const MAX_COLUMNS = 200;
const DEFAULT_LANES = 16;
const MAX_LANES = 64;
const DEFAULT_ROWS = 40;
const MAX_ROWS = 100;
const DEFAULT_RELATIONS = 40;
const MAX_RELATIONS = 100;
const LABEL = 80;
/** Producer text scanned for a label; anything later is never shown. */
const LABEL_SCAN = 4_096;
const NOTE_ORDER: readonly TimelineNoteCode[] = [
  "clocks-may-differ",
  "open-intervals-present",
  "intervals-missing",
  "stale-rows-present",
  "window-partial",
  "relation-page-full",
  "multiple-parents",
  "rows-outside-viewport",
  "phase-kinds-unavailable",
];
const TONES: readonly string[] = ["active", "success", "failure", "waiting", "unknown"];
const FRESHNESS: readonly string[] = ["current", "stale", "unknown"];
/** RFC 3339 date-time with a zone. The host date parser alone also reads prose such as a weekday-first date, control
 * characters included, which would be timing inferred from text; the shape also keeps every copied instant display-safe. */
const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;
/** A UTF-16 code unit orphaned when a length bound cuts through a surrogate pair. */
const LONE_SURROGATE = /[\ud800-\udbff](?![\udc00-\udfff])|(?<![\ud800-\udbff])[\udc00-\udfff]/g;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Timeline request refused: ${message}.`);
const integer = (value: unknown, min: number, max: number): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= min && value <= max;
const text = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const isTone = (value: unknown): value is Presentation["statusTone"] => typeof value === "string" && TONES.includes(value);
const isFreshness = (value: unknown): value is ObservedNode["freshness"] => typeof value === "string" && FRESHNESS.includes(value);
const compare = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
const instant = (value: unknown): number => (typeof value === "string" && INSTANT.test(value) ? Date.parse(value) : Number.NaN);

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
  zoom: number;
  pan: number;
  columns: number;
  maxLanes: number;
  maxRowsPerLane: number;
  relationLimit: number;
}
function validated(request: TimelineRequest): Bounds {
  if (typeof request !== "object" || request === null) throw refused("the request must be an object");
  const { scope, invocationId, offset, limit, zoom, pan, columns } = request;
  if (typeof scope !== "object" || scope === null || !text(scope.workspace) || !text(scope.principal)) throw refused("scope needs a workspace and a principal");
  if (!text(invocationId)) throw refused("invocationId must be a non-empty string");
  if (!integer(offset, 0, Number.MAX_SAFE_INTEGER)) throw refused("offset must be a nonnegative safe integer");
  if (!integer(limit, 1, MAX_WINDOW)) throw refused(`limit must be a safe integer 1..${MAX_WINDOW}`);
  if (!integer(zoom, 1, MAX_ZOOM)) throw refused(`zoom must be a safe integer 1..${MAX_ZOOM}`);
  if (!integer(pan, 0, Number.MAX_SAFE_INTEGER)) throw refused("pan must be a nonnegative safe integer");
  if (!integer(columns, MIN_COLUMNS, MAX_COLUMNS)) throw refused(`columns must be a safe integer ${MIN_COLUMNS}..${MAX_COLUMNS}`);
  return {
    scope: { workspace: scope.workspace, principal: scope.principal },
    invocationId,
    offset,
    limit,
    zoom,
    pan,
    columns,
    maxLanes: bounded(request.maxLanes, "maxLanes", 1, MAX_LANES, DEFAULT_LANES),
    maxRowsPerLane: bounded(request.maxRowsPerLane, "maxRowsPerLane", 1, MAX_ROWS, DEFAULT_ROWS),
    relationLimit: bounded(request.relationLimit, "relationLimit", 1, MAX_RELATIONS, DEFAULT_RELATIONS),
  };
}

/** Producer text bound for display: the shared helper's label layout bounded to 80, then a code unit the bound orphaned is
 * dropped. May be empty; callers choose the fallback. */
function shown(value: unknown): string {
  if (typeof value !== "string") return "";
  return sanitizeWorkbenchText(value.slice(0, LABEL_SCAN), LABEL, "label").replace(LONE_SURROGATE, "").trim();
}

/** provider/type/id of a projection key (the reference form the inspector prints), sanitized; the raw key otherwise. Never
 * empty: the reference form keeps its slashes and an in-scope key starts with its visible scope prefix. */
function referenceLabel(key: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(key);
  } catch {
    return shown(key);
  }
  if (!Array.isArray(parsed) || parsed.length !== 6) return shown(key);
  const parts: unknown[] = parsed;
  return shown(parts.every((part): part is string => typeof part === "string") ? `${parts[2]}/${parts[3]}/${parts[5]}` : key);
}

/** One window row with its source interval read. start is NaN when the interval is withheld; end is +Infinity while open. */
interface Placed {
  observed: ObservedNode;
  timing: TimelineTiming;
  startedAt: string | null;
  start: number;
  end: number;
}
function placed(observed: ObservedNode): Placed {
  const withheld: Placed = { observed, timing: { kind: "unavailable", reason: "no-source-interval" }, startedAt: null, start: Number.NaN, end: Number.NaN };
  const interval: Interval | undefined = observed.interval;
  if (typeof interval !== "object" || interval === null) return withheld;
  const { startedAt, endedAt } = interval;
  const start = instant(startedAt);
  if (!Number.isFinite(start)) return withheld;
  if (endedAt === undefined) return { observed, timing: { kind: "open", startedAt }, startedAt, start, end: Number.POSITIVE_INFINITY };
  const end = instant(endedAt);
  // A stated end that cannot be read, or one before the start, withholds the whole interval: open would claim it still runs.
  if (!Number.isFinite(end) || end < start) return withheld;
  return { observed, timing: { kind: "closed", startedAt, endedAt, durationMs: end - start }, startedAt, start, end };
}
const timed = (row: Placed): boolean => Number.isFinite(row.start);
/** Entries with a usable start first, by start then key; the rest after them, by key. */
function startThenKey(aStart: number, aKey: string, bStart: number, bKey: string): number {
  const aTimed = Number.isFinite(aStart);
  if (aTimed !== Number.isFinite(bStart)) return aTimed ? -1 : 1;
  return (aTimed ? aStart - bStart : 0) || compare(aKey, bKey);
}

interface Parent {
  key: string;
  kind: "ownership" | "grouping";
  /** Edges of that kind from the chosen parent to the row, and how many carry a native confirmation reference. */
  used: number;
  confirmed: number;
  multiple: boolean;
}
/** The lane parent of one row: the smallest-keyed in-scope parent among its incoming ownership edges, else among its
 * grouping edges. Dependency, causation and hypothesis edges never place a row; a self edge, an edge into another row and
 * a parent outside the request scope are ignored. */
function parentOf(incoming: readonly Relation[], key: string, scopePrefix: string): Parent | undefined {
  for (const kind of ["ownership", "grouping"] as const) {
    const usable = incoming.filter(edge => edge.kind === kind && edge.to === key && edge.from !== key && edge.from.startsWith(scopePrefix));
    if (usable.length === 0) continue;
    const parents = [...new Set(usable.map(edge => edge.from))].sort(compare);
    const used = usable.filter(edge => edge.from === parents[0]);
    const confirmed = used.filter(edge => text(edge.provenance.nativeConfirmationRef)).length;
    return { key: parents[0], kind, used: used.length, confirmed, multiple: parents.length > 1 };
  }
  return undefined;
}

interface LaneDraft {
  key: string;
  basis: TimelineLane["basis"];
  parent?: string;
  provider: string;
  edges: number;
  confirmedEdges: number;
  rows: Placed[];
}

/** Viewport cells for one timed row; null when the bar lies entirely outside [0, columns). */
function barOf(row: Placed, origin: number, zoom: number, pan: number, columns: number): TimelineBar | null {
  // Integer milliseconds times an integer zoom stay exact; one division then floors to the cell.
  const offsetCells = Math.floor(((row.start - origin) * zoom) / 1000) - pan;
  if (offsetCells >= columns) return null;
  if (row.end === Number.POSITIVE_INFINITY) return { offsetCells, lengthCells: columns - offsetCells, clippedLeft: offsetCells < 0, clippedRight: true, openEnded: true };
  const lengthCells = Math.max(1, Math.floor(((row.end - row.start) * zoom) / 1000));
  if (offsetCells + lengthCells <= 0) return null;
  return { offsetCells, lengthCells, clippedLeft: offsetCells < 0, clippedRight: offsetCells + lengthCells > columns, openEnded: false };
}

/** Maximum simultaneous intervals: a closed interval counts on [startedAt, endedAt), an open one from its start onward, so
 * through the latest observed boundary. Rows with a withheld interval never count. */
function maxConcurrency(rows: readonly Placed[]): number {
  const points: [number, number][] = [];
  for (const row of rows) {
    if (!timed(row)) continue;
    if (row.end === Number.POSITIVE_INFINITY) points.push([row.start, 1]);
    else if (row.end > row.start) points.push([row.start, 1], [row.end, -1]);
  }
  // At one instant, ends before starts: intervals that only touch never overlap.
  points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let current = 0;
  let max = 0;
  for (const [, delta] of points) {
    current += delta;
    max = Math.max(max, current);
  }
  return max;
}

function toRow(row: Placed, bar: TimelineBar | null): TimelineRow {
  const { key, nativeRef, presentation, freshness } = row.observed;
  return {
    key,
    nativeRef: { provider: nativeRef.provider, type: nativeRef.type, id: nativeRef.id, ...(nativeRef.scope !== undefined ? { scope: nativeRef.scope } : {}) },
    title: shown(presentation.title) || shown(`${nativeRef.provider}/${nativeRef.type}/${nativeRef.id}`),
    tone: isTone(presentation.statusTone) ? presentation.statusTone : "unknown",
    freshness: isFreshness(freshness) ? freshness : "unknown",
    timing: row.timing,
    bar,
  };
}

/** A parent inside the window names its lane by its title; one outside by its reference; a provider lane by the provider. */
function laneLabel(lane: LaneDraft, inWindow: ReadonlyMap<string, ObservedNode>): string {
  if (lane.parent === undefined) return shown(lane.provider) || "unknown provider";
  const parent = inWindow.get(lane.parent);
  return (parent && shown(parent.presentation.title)) || referenceLabel(lane.parent);
}

/** Freezes a tree this module just built; nothing in it is shared with the reader's rows. */
function frozen<T>(value: T): T {
  if (typeof value === "object" && value !== null) {
    const children: unknown[] = Object.values(value);
    for (const child of children) frozen(child);
    Object.freeze(value);
  }
  return value;
}

/** Lanes for one invocation window. Validation precedes every read; then exactly one window read, one relationRevision
 * read and at most one incoming relation page per returned row, nothing else. */
export function buildTimelineLanes(reader: TimelineReader, request: TimelineRequest): TimelineModel {
  const { scope, invocationId, offset, limit, zoom, pan, columns, maxLanes, maxRowsPerLane, relationLimit } = validated(request);
  const page = reader.window({ scope: { ...scope }, invocationId, offset, limit });
  const topologyRevision = reader.relationRevision();
  const returned = Math.min(page.nodes.length, limit);
  const windowPartial = page.total > offset + returned;
  // Producer stand-ins included: only this scope's and this invocation's rows, each once, at most `limit`.
  const inWindow = new Map<string, ObservedNode>();
  for (const observed of page.nodes.slice(0, limit)) {
    if (observed.scope.workspace !== scope.workspace || observed.scope.principal !== scope.principal || observed.invocationId !== invocationId) continue;
    if (!inWindow.has(observed.key)) inWindow.set(observed.key, observed);
  }
  const rows = [...inWindow.values()].map(placed);

  const scopePrefix = `[${JSON.stringify(scope.workspace)},${JSON.stringify(scope.principal)},`;
  const drafts = new Map<string, LaneDraft>();
  let relationsFull = false;
  let multipleParents = false;
  for (const row of rows) {
    const query = { scope: { ...scope }, to: row.observed.key, limit: relationLimit };
    let incoming: Relation[];
    if (typeof reader.relationsPage === "function") {
      const page = reader.relationsPage(query);
      incoming = page.relations;
      // Reported truncation or the exact-relationLimit rule: never less conservative than the size rule alone.
      if (page.truncated || incoming.length >= relationLimit) relationsFull = true;
    } else {
      incoming = reader.relations(query);
      if (incoming.length >= relationLimit) relationsFull = true;
    }
    const parent = parentOf(incoming.slice(0, relationLimit), row.observed.key, scopePrefix);
    if (parent?.multiple) multipleParents = true;
    const provider = row.observed.nativeRef.provider;
    const key = parent ? parent.key : `provider:${provider}`;
    let lane = drafts.get(key);
    if (!lane) {
      lane = { key, basis: parent ? parent.kind : "provider", parent: parent?.key, provider, edges: 0, confirmedEdges: 0, rows: [] };
      drafts.set(key, lane);
    }
    if (parent) {
      if (parent.kind === "grouping") lane.basis = "grouping";
      lane.edges += parent.used;
      lane.confirmedEdges += parent.confirmed;
    }
    lane.rows.push(row);
  }
  for (const lane of drafts.values()) lane.rows.sort((a, b) => startThenKey(a.start, a.observed.key, b.start, b.observed.key));
  // Every lane holds at least one row, and its first row carries its earliest start.
  const ordered = [...drafts.values()].sort((a, b) => startThenKey(a.rows[0].start, a.key, b.rows[0].start, b.key));

  let origin: Placed | undefined;
  let latest = Number.NEGATIVE_INFINITY;
  for (const row of rows.filter(timed)) {
    if (!origin || row.start < origin.start || (row.start === origin.start && compare(row.observed.key, origin.observed.key) < 0)) origin = row;
    latest = Math.max(latest, row.end === Number.POSITIVE_INFINITY ? row.start : row.end);
  }
  const kept = ordered.slice(0, maxLanes);
  const lanes: TimelineLane[] = kept.map(lane => ({
    key: lane.key,
    label: laneLabel(lane, inWindow),
    basis: lane.basis,
    confirmed: lane.edges > 0 && lane.confirmedEdges === lane.edges,
    rows: lane.rows.slice(0, maxRowsPerLane).map(row => toRow(row, origin && timed(row) ? barOf(row, origin.start, zoom, pan, columns) : null)),
  }));
  const outside = lanes.some(lane => lane.rows.some(row => row.timing.kind !== "unavailable" && row.bar === null));

  const missing = rows.filter(row => !timed(row)).length;
  const codes = new Set<TimelineNoteCode>(["phase-kinds-unavailable"]);
  if (new Set(rows.filter(timed).map(row => row.observed.nativeRef.provider)).size > 1) codes.add("clocks-may-differ");
  if (rows.some(row => row.timing.kind === "open")) codes.add("open-intervals-present");
  if (missing > 0) codes.add("intervals-missing");
  if (rows.some(row => row.observed.freshness === "stale")) codes.add("stale-rows-present");
  if (windowPartial) codes.add("window-partial");
  if (relationsFull) codes.add("relation-page-full");
  if (multipleParents) codes.add("multiple-parents");
  if (outside) codes.add("rows-outside-viewport");
  const notes: TimelineNote[] = NOTE_ORDER.filter(code => codes.has(code)).map(code => (code === "intervals-missing" ? { code, count: missing } : { code }));

  return frozen<TimelineModel>({
    contract: TIMELINE_CONTRACT,
    revision: page.revision,
    topologyRevision,
    origin: origin && origin.startedAt !== null ? { startedAt: origin.startedAt, basis: "earliest-observed-start" } : { startedAt: null, basis: "none" },
    span: {
      ms: origin ? latest - origin.start : null,
      complete: rows.length > 0 && rows.length === page.total && rows.every(row => row.timing.kind === "closed"),
    },
    lanes,
    concurrency: { maxMeasured: maxConcurrency(rows), basis: "source-intervals-only", countsOpenIntervals: true },
    notes,
    truncated: {
      lanes: ordered.length > maxLanes,
      rows: kept.some(lane => lane.rows.length > maxRowsPerLane),
      relations: relationsFull,
      window: windowPartial,
    },
  });
}
