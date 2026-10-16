/**
 * Operations telemetry (docs/workbench/17 § Operations telemetry; docs/workbench/09 § Aggregates and profiling).
 * A pure read over ONE bounded ObservationProjection page and ONE bounded event read, plus counters the host supplies.
 * Every metric is either measured, with the source that measured it, or unknown, with the reason it is not: an absent
 * counter is never defaulted to zero (docs/workbench/13 § Agent execution contracts). The report carries counts and
 * sanitized provider names only; titles, status text, evidence refs, prompts, tool bodies and payload refs never enter
 * it. The module reads no host clock, mutates nothing and returns deep-frozen data; the caller supplies `now`.
 *
 * Counting ingest results, provider outcomes, render timings, memory and SDK usage is the host's job; this module
 * defines the shape of what the host supplies (SuppliedCounters). Delivery to a sink is opt-in and bounded.
 */
import { CapabilityError, type CapabilityErrorCategory } from "./capability-registry.js";
import type { ObservationEvent, ObservationProjection, ObservationScope, ObservedNode } from "./observation.js";
import { sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "./redaction.js";

export const TELEMETRY_CONTRACT = "workbench.telemetry/v1";
export const TELEMETRY_EVENT_CONTRACT = "workbench.telemetry.event/v1";
export const TELEMETRY_CLOCK_CAVEAT =
  "Event lag compares the producer sourceTimestamp with the projection observedAt; cross-provider clocks are not reconciled.";

export type TelemetryMetric<T> =
  | { state: "measured"; value: T; source: "projection" | "supplied" }
  | { state: "unknown"; reason: "not-supplied" | "invalid-supplied" | "no-source-timestamps" | "no-events" };

export type ProviderOutcomeKey = "returned" | CapabilityErrorCategory;

/** Counted by the host and passed in. An absent field is reported unknown, never zero. */
export interface SuppliedCounters {
  providerCallOutcomes?: Readonly<Partial<Record<ProviderOutcomeKey, number>>>;
  droppedObservations?: number;
  lateObservations?: number;
  visibleRows?: number;
  renderP95Ms?: number;
  heapUsedBytes?: number;
  sdkTokens?: number;
  claudeSessions?: number;
  uncertainEffects?: number;
}

export interface OperationsTelemetryInput {
  scope: ObservationScope;
  invocationId?: string;
  /** The caller's clock: an ISO-8601 instant with a timezone. */
  now: string;
  /** Nodes examined from one projection page; default 100, at most 100. */
  limit?: number;
  /** Events examined from one read; default 200, at most 1000. */
  eventLimit?: number;
  supplied?: SuppliedCounters;
}

export interface EventLag {
  p50Ms: number;
  p95Ms: number;
  /** Events that yielded a sample. */
  samples: number;
  /** Events without a usable sourceTimestamp, plus samples whose negative lag was clamped to zero. */
  unmeasured: number;
  /** Sorted, sanitized providers of the sampled events, at most MAX_PROVIDERS. */
  providers: string[];
  providersOmitted: number;
  caveat: typeof TELEMETRY_CLOCK_CAVEAT;
}

export interface OperationsTelemetry {
  contract: typeof TELEMETRY_CONTRACT;
  now: string;
  examined: { nodes: number; truncated: boolean; events: number; eventsTruncated: boolean; completeness: "complete" | "partial-gap" };
  activeWorkflows: TelemetryMetric<{ active: number; lastKnownRunningStale: number }>;
  claudeSdkSessions: TelemetryMetric<number>;
  /** The host's own session count, reported beside the projection count and never merged with it. */
  claudeSdkSessionsSupplied: TelemetryMetric<number>;
  providerCallOutcomes: TelemetryMetric<Record<string, number>>;
  eventLag: TelemetryMetric<EventLag>;
  droppedObservations: TelemetryMetric<number>;
  lateObservations: TelemetryMetric<number>;
  projectionSize: TelemetryMetric<{ nodes: number; events: number; edges: number }>;
  visibleRows: TelemetryMetric<number>;
  renderP95Ms: TelemetryMetric<number>;
  heapUsedBytes: TelemetryMetric<number>;
  sdkTokens: TelemetryMetric<number>;
  nativeEvidenceCoverage: TelemetryMetric<{ withEvidence: number; examined: number }>;
  uncertainEffects: TelemetryMetric<number>;
}

type Projection = Pick<ObservationProjection, "query" | "events" | "stats">;

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 100;
const DEFAULT_EVENT_LIMIT = 200;
const MAX_EVENT_LIMIT = 1000;
const MAX_PROVIDERS = 16;
const MAX_PROVIDER_NAME = 64;
/** Producer text scanned for a provider name; anything later is never shown. */
const MAX_PROVIDER_SCAN = 512;
const OUTCOME_KEYS: readonly string[] = ["returned", "validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const ISO_INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})$/;

const refused = (message: string): CapabilityError => new CapabilityError("validation", `Telemetry report refused: ${message}.`);

function bound(value: number | undefined, fallback: number, most: number, name: string): number {
  if (value === undefined) return fallback;
  if (!Number.isSafeInteger(value) || value < 1) throw refused(`${name} must be a positive integer`);
  return Math.min(value, most);
}

/** Epoch milliseconds of a bounded, timezone-qualified instant, else undefined. */
function instantMs(value: unknown): number | undefined {
  if (typeof value !== "string" || value.length > 64 || !ISO_INSTANT.test(value)) return undefined;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : undefined;
}

const measuredOf = <T>(value: T, source: "projection" | "supplied"): TelemetryMetric<T> => ({ state: "measured", value, source });
const unknownOf = (reason: "not-supplied" | "invalid-supplied" | "no-source-timestamps" | "no-events"): TelemetryMetric<never> => ({ state: "unknown", reason });

/** A supplied count or timing: measured only when a finite, non-negative number; absent is not-supplied. */
function suppliedNumber(value: unknown): TelemetryMetric<number> {
  if (value === undefined) return unknownOf("not-supplied");
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? measuredOf(value, "supplied") : unknownOf("invalid-supplied");
}

function suppliedOutcomes(value: unknown): TelemetryMetric<Record<string, number>> {
  if (value === undefined) return unknownOf("not-supplied");
  if (value === null || typeof value !== "object" || Array.isArray(value)) return unknownOf("invalid-supplied");
  const entries = Object.entries(value);
  if (entries.length === 0) return unknownOf("not-supplied");
  const copy: Record<string, number> = {};
  for (const [key, count] of entries) {
    if (!OUTCOME_KEYS.includes(key) || typeof count !== "number" || !Number.isFinite(count) || count < 0) return unknownOf("invalid-supplied");
    copy[key] = count;
  }
  return measuredOf(copy, "supplied");
}

/** A provider name for display, through the ONE display sanitizer (sanitizeWorkbenchText, src/workbench/redaction.ts) in
 * its single-line label layout: the helper reads every gap a control, escape sequence or invisible leaves both as a
 * separator and as glue before it redacts once, so a credential split or glued by one cannot show, and nothing is deleted
 * before redaction. Its output is capped without cutting a surrogate pair. Empty after sanitizing: undefined. */
function providerName(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const shown = sanitizeWorkbenchText(raw.slice(0, MAX_PROVIDER_SCAN), WORKBENCH_TEXT_LIMIT, "label");
  if (shown === "") return undefined;
  if (shown.length <= MAX_PROVIDER_NAME) return shown;
  let end = MAX_PROVIDER_NAME;
  const last = shown.charCodeAt(end - 1);
  if (last >= 0xd800 && last <= 0xdbff) end -= 1;
  return shown.slice(0, end);
}

/** Nearest-rank percentile of an ascending, non-empty sample list. */
function nearestRank(sorted: readonly number[], percent: number): number {
  const rank = Math.max(1, Math.ceil((percent / 100) * sorted.length));
  return sorted[Math.min(rank, sorted.length) - 1] ?? 0;
}

function eventLagOf(events: readonly ObservationEvent[]): TelemetryMetric<EventLag> {
  if (events.length === 0) return unknownOf("no-events");
  const samples: number[] = [];
  const providers = new Set<string>();
  let unmeasured = 0;
  for (const event of events) {
    const produced = instantMs(event.sourceTimestamp);
    const observed = instantMs(event.observedAt);
    if (produced === undefined || observed === undefined) { unmeasured += 1; continue; }
    const lag = observed - produced;
    if (lag < 0) unmeasured += 1;
    samples.push(Math.max(0, lag));
    const name = providerName(event.source.provider);
    if (name !== undefined) providers.add(name);
  }
  if (samples.length === 0) return unknownOf("no-source-timestamps");
  samples.sort((a, b) => a - b);
  const names = [...providers].sort();
  return measuredOf({
    p50Ms: nearestRank(samples, 50), p95Ms: nearestRank(samples, 95), samples: samples.length, unmeasured,
    providers: names.slice(0, MAX_PROVIDERS), providersOmitted: Math.max(0, names.length - MAX_PROVIDERS), caveat: TELEMETRY_CLOCK_CAVEAT,
  }, "projection");
}

const isWorkflow = (node: ObservedNode): boolean => node.presentation.type === "workflow" || node.kind === "workflow";
/** Last-known state only: a stale or disconnected node is not live, whatever tone it last reported. */
const isLastKnown = (node: ObservedNode): boolean => node.freshness !== "current" || node.sourceConnectionState === "disconnected";
const isClaudeSession = (node: ObservedNode): boolean => node.nativeRef.provider === "claude-agent-sdk" && node.nativeRef.type === "session";

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

export function buildOperationsTelemetry(projection: Projection, input: OperationsTelemetryInput): OperationsTelemetry {
  if (instantMs(input.now) === undefined) throw refused("now must be an ISO-8601 instant with a timezone");
  const limit = bound(input.limit, DEFAULT_LIMIT, MAX_LIMIT, "limit");
  const eventLimit = bound(input.eventLimit, DEFAULT_EVENT_LIMIT, MAX_EVENT_LIMIT, "eventLimit");
  const supplied: SuppliedCounters = input.supplied !== null && typeof input.supplied === "object" ? input.supplied : {};

  const page = projection.query({ scope: input.scope, limit, ...(input.invocationId !== undefined ? { invocationId: input.invocationId } : {}) });
  const read = projection.events({ scope: input.scope, limit: eventLimit });

  let active = 0;
  let stale = 0;
  let sessions = 0;
  let withEvidence = 0;
  for (const node of page.nodes) {
    if (isWorkflow(node) && node.presentation.statusTone === "active") {
      active += 1;
      if (isLastKnown(node)) stale += 1;
    }
    if (isClaudeSession(node)) sessions += 1;
    if (node.evidenceRefs.length > 0) withEvidence += 1;
  }
  const stats = projection.stats();

  return deepFreeze({
    contract: TELEMETRY_CONTRACT,
    now: input.now,
    examined: { nodes: page.nodes.length, truncated: page.truncated, events: read.events.length, eventsTruncated: read.truncated, completeness: read.completeness },
    activeWorkflows: measuredOf({ active, lastKnownRunningStale: stale }, "projection"),
    claudeSdkSessions: measuredOf(sessions, "projection"),
    claudeSdkSessionsSupplied: suppliedNumber(supplied.claudeSessions),
    providerCallOutcomes: suppliedOutcomes(supplied.providerCallOutcomes),
    eventLag: eventLagOf(read.events),
    droppedObservations: suppliedNumber(supplied.droppedObservations),
    lateObservations: suppliedNumber(supplied.lateObservations),
    projectionSize: measuredOf({ nodes: stats.nodes, events: stats.events, edges: stats.edges }, "projection"),
    visibleRows: suppliedNumber(supplied.visibleRows),
    renderP95Ms: suppliedNumber(supplied.renderP95Ms),
    heapUsedBytes: suppliedNumber(supplied.heapUsedBytes),
    sdkTokens: suppliedNumber(supplied.sdkTokens),
    nativeEvidenceCoverage: measuredOf({ withEvidence, examined: page.nodes.length }, "projection"),
    uncertainEffects: suppliedNumber(supplied.uncertainEffects),
  });
}

/** One typed event for a host-injected sink. */
export interface TelemetryEvent {
  contract: typeof TELEMETRY_EVENT_CONTRACT;
  kind: "operations.report";
  report: OperationsTelemetry;
  /** Monotonic count of events this emitter dropped before this one; absent until the first drop. */
  droppedEvents?: number;
}
export interface TelemetrySink { emit(event: TelemetryEvent): void }
export interface TelemetryEmitOptions {
  /** Telemetry is opt-in: absent or false emits nothing. */
  enabled?: boolean;
  /** Serialized cap in UTF-8 bytes for one event; default 8192. */
  maxBytes?: number;
}
export type TelemetryEmitResult = "disabled" | "emitted" | "dropped-oversize" | "dropped-sink-error";
export interface TelemetryEmitter {
  emit(report: OperationsTelemetry): TelemetryEmitResult;
  /** Events this emitter has dropped (oversize or sink error); never decreases. */
  droppedEvents(): number;
}
const DEFAULT_EVENT_BYTES = 8192;
const utf8Bytes = (text: string): number => new TextEncoder().encode(text).length;

/** A stateful emitter over an injected sink. It never writes to the console, a file or the network itself; an oversized
 * event (measured in UTF-8 bytes) or a throwing sink is dropped and counted, and the next delivered event carries the
 * running dropped count. The sink's error text is never echoed. */
export function createTelemetryEmitter(sink: TelemetrySink, options: TelemetryEmitOptions = {}): TelemetryEmitter {
  const cap = options.maxBytes !== undefined && Number.isSafeInteger(options.maxBytes) && options.maxBytes > 0 ? options.maxBytes : DEFAULT_EVENT_BYTES;
  let dropped = 0;
  return {
    droppedEvents: () => dropped,
    emit(report: OperationsTelemetry): TelemetryEmitResult {
      if (options.enabled !== true) return "disabled";
      const event: TelemetryEvent = deepFreeze({
        contract: TELEMETRY_EVENT_CONTRACT, kind: "operations.report" as const, report, ...(dropped > 0 ? { droppedEvents: dropped } : {}),
      });
      if (utf8Bytes(JSON.stringify(event)) > cap) {
        dropped += 1;
        return "dropped-oversize";
      }
      try {
        sink.emit(event);
      } catch {
        dropped += 1;
        return "dropped-sink-error";
      }
      return "emitted";
    },
  };
}

/** Deliver one report to an injected sink when enabled (a one-shot emitter; use createTelemetryEmitter to count drops). */
export function emitOperationsTelemetry(report: OperationsTelemetry, sink: TelemetrySink, options: TelemetryEmitOptions = {}): TelemetryEmitResult {
  return createTelemetryEmitter(sink, options).emit(report);
}
