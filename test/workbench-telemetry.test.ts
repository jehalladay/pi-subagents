/**
 * W22 operations telemetry (wb-cax.13, docs/workbench/17 § Operations telemetry). Every case pins a docs/workbench
 * clause: a pure, caller-clocked report over one bounded projection page and one bounded event read, where each
 * metric is measured-with-source or unknown-with-reason and never a defaulted zero.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type NativeRef, type ObservationEvent, ObservationProjection, type ObservationScope, type Presentation,
} from "../src/workbench/observation.js";
import { sanitizeWorkbenchJsonText, sanitizeWorkbenchText, WORKBENCH_TEXT_LIMIT } from "../src/workbench/redaction.js";
import {
  buildOperationsTelemetry, createTelemetryEmitter, emitOperationsTelemetry, type OperationsTelemetry, TELEMETRY_CLOCK_CAVEAT,
  TELEMETRY_CONTRACT, type TelemetryEvent, type TelemetryMetric,
} from "../src/workbench/telemetry.js";

const alice: ObservationScope = { workspace: "ws-telemetry", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-telemetry", principal: "bob" };
const T = "2026-10-15T12:00:00.000Z";
const T_MS = Date.parse(T);
const at = (seconds: number): string => new Date(T_MS + seconds * 1000).toISOString();
const MODULE = readFileSync(new URL("../src/workbench/telemetry.ts", import.meta.url), "utf8");
const METRIC_FIELDS = [
  "activeWorkflows", "claudeSdkSessions", "claudeSdkSessionsSupplied", "providerCallOutcomes", "eventLag", "droppedObservations",
  "lateObservations", "projectionSize", "visibleRows", "renderP95Ms", "heapUsedBytes", "sdkTokens", "nativeEvidenceCoverage", "uncertainEffects",
] as const;
const SUPPLIED_ONLY = ["droppedObservations", "lateObservations", "visibleRows", "renderP95Ms", "heapUsedBytes", "sdkTokens", "uncertainEffects"] as const;

const ref = (provider: string, type: string, id: string): NativeRef => ({ provider, type, id });
interface Seed {
  provider?: string; type?: string; id: string; tone?: Presentation["statusTone"]; title?: string; statusText?: string;
  presentationType?: Presentation["type"]; evidence?: readonly string[]; scope?: ObservationScope; kind?: string;
}
function observe(view: ObservationProjection, seed: Seed): void {
  view.refresh({
    source: ref(seed.provider ?? "furnace", seed.type ?? "run", seed.id), scope: seed.scope ?? alice, capturedAt: T, observedAt: T,
    node: {
      title: seed.title ?? `Node ${seed.id}`, type: seed.presentationType ?? "workflow", statusText: seed.statusText ?? "RUNNING",
      statusTone: seed.tone ?? "active",
    },
    ...(seed.kind ? { kind: seed.kind } : {}), ...(seed.evidence ? { evidenceRefs: seed.evidence } : {}),
  });
}
interface Ev { id: string; provider?: string; sourceTimestamp?: string; observedAt?: string; scope?: ObservationScope }
function ingest(view: ObservationProjection, ev: Ev): void {
  const event: ObservationEvent = {
    projectionEventId: ev.id, source: ref(ev.provider ?? "furnace", "run", `src-${ev.id}`), scope: ev.scope ?? alice,
    observedAt: ev.observedAt ?? T, kind: "native.event",
    ...(ev.sourceTimestamp ? { sourceTimestamp: ev.sourceTimestamp } : {}),
  };
  view.ingest(event);
}
const build = (view: ObservationProjection, extra: Partial<Parameters<typeof buildOperationsTelemetry>[1]> = {}): OperationsTelemetry =>
  buildOperationsTelemetry(view, { scope: alice, now: T, ...extra });
function measured<V>(metric: TelemetryMetric<V>): Extract<TelemetryMetric<V>, { state: "measured" }> {
  if (metric.state !== "measured") throw new Error(`expected measured, saw unknown(${metric.reason})`);
  return metric;
}
function unknownReason(metric: TelemetryMetric<unknown>): string {
  if (metric.state !== "unknown") throw new Error("expected unknown");
  return metric.reason;
}
function fixtureView(): ObservationProjection {
  const view = new ObservationProjection();
  observe(view, { id: "wf-1" });
  observe(view, { id: "wf-2" });
  observe(view, { id: "wf-3", tone: "success", statusText: "SUCCESS" });
  observe(view, { provider: "claude-agent-sdk", type: "session", id: "s-1", presentationType: "agent", tone: "waiting" });
  observe(view, { provider: "claude-agent-sdk", type: "session", id: "s-2", presentationType: "agent", tone: "active" });
  return view;
}
function deepFrozen(value: unknown): boolean {
  if (value === null || typeof value !== "object") return true;
  if (!Object.isFrozen(value)) return false;
  return Object.values(value).every(deepFrozen);
}
/** Every metric field of a report, each of which must be a measured or an unknown record. */
function metricsOf(report: OperationsTelemetry): Array<[string, TelemetryMetric<unknown>]> {
  return METRIC_FIELDS.map(name => [name, report[name] as TelemetryMetric<unknown>]);
}

describe("B1 docs/workbench/17 § Operations telemetry: every named quantity is a measured-or-unknown metric", () => {
  it("counts active workflows, Claude SDK sessions and projection size from the projection with source 'projection'", () => {
    const view = fixtureView();
    const report = build(view);
    expect(report.contract).toBe(TELEMETRY_CONTRACT);
    expect(report.contract).toBe("workbench.telemetry/v1");
    expect(report.now).toBe(T);
    expect(measured(report.activeWorkflows)).toEqual({ state: "measured", source: "projection", value: { active: 2, lastKnownRunningStale: 0 } });
    expect(measured(report.claudeSdkSessions)).toEqual({ state: "measured", source: "projection", value: 2 });
    expect(measured(report.projectionSize)).toEqual({ state: "measured", source: "projection", value: view.stats() });
    expect(report.examined).toEqual({ nodes: 5, truncated: false, events: 0, eventsTruncated: false, completeness: "complete" });
  });

  it("walks the whole report: every metric field is exactly {measured,value,source} or {unknown,reason}", () => {
    const report = build(fixtureView(), { supplied: { visibleRows: 12 } });
    for (const [name, metric] of metricsOf(report)) {
      if (metric.state === "measured") {
        expect(Object.keys(metric).sort(), name).toEqual(["source", "state", "value"]);
        expect(["projection", "supplied"], name).toContain(metric.source);
      } else {
        expect(Object.keys(metric).sort(), name).toEqual(["reason", "state"]);
        expect(["not-supplied", "invalid-supplied", "no-source-timestamps", "no-events"], name).toContain(metric.reason);
      }
    }
    expect(Object.keys(report).sort()).toEqual(["contract", "examined", "now", ...METRIC_FIELDS].sort());
  });

  it("counts a workflow by presentation type or by node kind 'workflow', and only the active tone", () => {
    const view = new ObservationProjection();
    observe(view, { id: "a" });
    observe(view, { id: "b", presentationType: "agent", kind: "workflow" });
    observe(view, { id: "c", presentationType: "agent" });
    observe(view, { id: "d", tone: "waiting" });
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 0 });
  });

  it("keeps the supplied Claude session count beside the projection count and never merges them", () => {
    const report = build(fixtureView(), { supplied: { claudeSessions: 7 } });
    expect(measured(report.claudeSdkSessions).value).toBe(2);
    expect(measured(report.claudeSdkSessions).source).toBe("projection");
    expect(report.claudeSdkSessionsSupplied).toEqual({ state: "measured", value: 7, source: "supplied" });
    expect(unknownReason(build(fixtureView()).claudeSdkSessionsSupplied)).toBe("not-supplied");
  });
});

describe("B2 docs/workbench/13 § Agent execution contracts: no invented zeros", () => {
  it("reports every supplied-only metric as unknown 'not-supplied' with no value:0 anywhere", () => {
    const report = build(fixtureView());
    for (const name of [...SUPPLIED_ONLY, "providerCallOutcomes"] as const) expect(unknownReason(report[name]), name).toBe("not-supplied");
    expect(JSON.stringify(report)).not.toMatch(/"value":0\b/);
    const noneSupplied = build(fixtureView(), { supplied: {} });
    for (const name of [...SUPPLIED_ONLY, "providerCallOutcomes"] as const) expect(unknownReason(noneSupplied[name]), name).toBe("not-supplied");
  });

  it.each([Number.NaN, -1, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])("treats supplied %s as invalid-supplied", bad => {
    const report = build(fixtureView(), {
      supplied: { droppedObservations: bad, lateObservations: bad, visibleRows: bad, renderP95Ms: bad, heapUsedBytes: bad, sdkTokens: bad, uncertainEffects: bad, claudeSessions: bad },
    });
    for (const name of [...SUPPLIED_ONLY, "claudeSdkSessionsSupplied"] as const) expect(unknownReason(report[name]), name).toBe("invalid-supplied");
  });

  it("treats a non-number supplied value as invalid-supplied and a measured zero as measured zero", () => {
    const report = build(fixtureView(), { supplied: { visibleRows: "9" as unknown as number, sdkTokens: 0, droppedObservations: 0 } });
    expect(unknownReason(report.visibleRows)).toBe("invalid-supplied");
    expect(report.sdkTokens).toEqual({ state: "measured", value: 0, source: "supplied" });
    expect(report.droppedObservations).toEqual({ state: "measured", value: 0, source: "supplied" });
  });

  it("reports supplied counters measured with source 'supplied'", () => {
    const report = build(fixtureView(), {
      supplied: { droppedObservations: 3, lateObservations: 4, visibleRows: 50, renderP95Ms: 12.5, heapUsedBytes: 1_000_000, sdkTokens: 4321, uncertainEffects: 1 },
    });
    expect(report.droppedObservations).toEqual({ state: "measured", value: 3, source: "supplied" });
    expect(report.lateObservations).toEqual({ state: "measured", value: 4, source: "supplied" });
    expect(report.visibleRows).toEqual({ state: "measured", value: 50, source: "supplied" });
    expect(report.renderP95Ms).toEqual({ state: "measured", value: 12.5, source: "supplied" });
    expect(report.heapUsedBytes).toEqual({ state: "measured", value: 1_000_000, source: "supplied" });
    expect(report.sdkTokens).toEqual({ state: "measured", value: 4321, source: "supplied" });
    expect(report.uncertainEffects).toEqual({ state: "measured", value: 1, source: "supplied" });
  });

  it("preserves every supplied provider outcome key and refuses a record with an invalid value or unknown key", () => {
    const outcomes = { returned: 4, transport: 1, "uncertain-effect": 1 };
    const report = build(fixtureView(), { supplied: { providerCallOutcomes: outcomes } });
    expect(report.providerCallOutcomes).toEqual({ state: "measured", value: outcomes, source: "supplied" });
    for (const bad of [{ returned: 1, transport: -1 }, { returned: Number.NaN }, { returned: Number.POSITIVE_INFINITY }, { bogus: 1 }]) {
      expect(unknownReason(build(fixtureView(), { supplied: { providerCallOutcomes: bad as never } }).providerCallOutcomes)).toBe("invalid-supplied");
    }
    expect(unknownReason(build(fixtureView(), { supplied: { providerCallOutcomes: {} } }).providerCallOutcomes)).toBe("not-supplied");
  });
});

describe("B3 docs/workbench/09 § Observation event envelope: event lag with an explicit clock caveat", () => {
  it("samples observedAt minus sourceTimestamp across providers and states the caveat", () => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", provider: "forge", sourceTimestamp: at(-10), observedAt: at(-9) });
    ingest(view, { id: "2", provider: "furnace", sourceTimestamp: at(-8), observedAt: at(-6) });
    ingest(view, { id: "3", provider: "furnace", sourceTimestamp: at(-5), observedAt: at(-2) });
    ingest(view, { id: "4", provider: "forge", sourceTimestamp: at(-4), observedAt: at(0) });
    const lag = measured(build(view).eventLag);
    expect(lag.source).toBe("projection");
    expect(lag.value).toEqual({ p50Ms: 2000, p95Ms: 4000, samples: 4, unmeasured: 0, providers: ["forge", "furnace"], providersOmitted: 0, caveat: TELEMETRY_CLOCK_CAVEAT });
    expect(TELEMETRY_CLOCK_CAVEAT).toMatch(/not reconciled/);
  });

  it("uses nearest-rank percentiles over the sorted samples", () => {
    const view = new ObservationProjection();
    for (let i = 1; i <= 20; i++) ingest(view, { id: `e${i}`, sourceTimestamp: at(-100), observedAt: at(-100 + i) });
    const lag = measured(build(view).eventLag).value;
    expect(lag.samples).toBe(20);
    expect(lag.p50Ms).toBe(10_000);
    expect(lag.p95Ms).toBe(19_000);
  });

  it("counts events without a sourceTimestamp as unmeasured and never samples them", () => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", sourceTimestamp: at(-3), observedAt: at(-1) });
    ingest(view, { id: "2" });
    ingest(view, { id: "3" });
    const lag = measured(build(view).eventLag).value;
    expect(lag).toMatchObject({ samples: 1, unmeasured: 2, p50Ms: 2000, p95Ms: 2000 });
  });

  it("clamps a negative lag to zero and counts it as unmeasured", () => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", sourceTimestamp: at(5), observedAt: at(0) });
    ingest(view, { id: "2", sourceTimestamp: at(-4), observedAt: at(-2) });
    const lag = measured(build(view).eventLag).value;
    expect(lag).toMatchObject({ samples: 2, unmeasured: 1, p50Ms: 0, p95Ms: 2000 });
  });

  it("is unknown 'no-source-timestamps' with only untimestamped events and 'no-events' for an empty window", () => {
    const view = new ObservationProjection();
    expect(unknownReason(build(view).eventLag)).toBe("no-events");
    ingest(view, { id: "1" });
    expect(unknownReason(build(view).eventLag)).toBe("no-source-timestamps");
  });

  it("propagates partial-gap completeness and event truncation into examined", () => {
    const view = new ObservationProjection();
    for (let i = 0; i < 5; i++) ingest(view, { id: `e${i}`, sourceTimestamp: at(-2), observedAt: at(-1) });
    const full = build(view, { eventLimit: 3 });
    expect(full.examined).toMatchObject({ events: 3, eventsTruncated: true, completeness: "complete" });
    const gap = buildOperationsTelemetry(
      { query: view.query.bind(view), stats: view.stats.bind(view), events: () => ({ events: [], truncated: false, completeness: "partial-gap" }) },
      { scope: alice, now: T },
    );
    expect(gap.examined.completeness).toBe("partial-gap");
    expect(unknownReason(gap.eventLag)).toBe("no-events");
  });

  it("sanitizes and bounds provider names, and caps the provider list with a visible omitted count", () => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", provider: "furnace\u200b", sourceTimestamp: at(-2), observedAt: at(-1) });
    ingest(view, { id: "2", provider: "Bearer abc123", sourceTimestamp: at(-2), observedAt: at(-1) });
    ingest(view, { id: "3", provider: "x".repeat(120), sourceTimestamp: at(-2), observedAt: at(-1) });
    const lag = measured(build(view).eventLag).value;
    expect(lag.providers).toEqual(["[REDACTED]", "furnace", "x".repeat(64)]);
    const json = JSON.stringify(lag);
    expect(json).not.toMatch(/\u001b|\u200b|abc123|Bearer/);
    const crowd = new ObservationProjection();
    for (let i = 0; i < 40; i++) ingest(crowd, { id: `p${i}`, provider: `prov-${String(i).padStart(2, "0")}`, sourceTimestamp: at(-2), observedAt: at(-1) });
    const many = measured(build(crowd).eventLag).value;
    expect(many.providers.length).toBeLessThanOrEqual(16);
    expect(many.providers.length + many.providersOmitted).toBe(40);
  });
});

describe("B4 docs/workbench/09 § Freshness and ambiguity: disconnected means last-known-running and stale", () => {
  it("counts a disconnected provider's active workflow as active and last-known-running stale; only a real refresh clears it", () => {
    const view = fixtureView();
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 0 });
    view.disconnect("furnace");
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 2 });
    view.reconnect("furnace");
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 2 });
    observe(view, { id: "wf-1" });
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 1 });
    observe(view, { id: "wf-2" });
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 0 });
  });

  it("counts a node whose freshness is not current as stale even when still connected", () => {
    const view = fixtureView();
    view.markStale({ scope: alice, ref: ref("furnace", "run", "wf-1") });
    expect(measured(build(view).activeWorkflows).value).toEqual({ active: 2, lastKnownRunningStale: 1 });
  });
});

describe("B5 docs/workbench/17, 09 and 12: counts and sanitized provider names only", () => {
  it("leaks no title, status text, evidence ref or secret into the report", () => {
    const view = new ObservationProjection();
    observe(view, { id: "wf-1", title: "Bearer abc123 secret", statusText: 'RUNNING "api_key":"xyz"', evidence: ["claude-message:0000"] });
    observe(view, { provider: "claude-agent-sdk", type: "session", id: "s-1", presentationType: "agent", title: "prompt: delete everything", evidence: ["claude-message:0001"] });
    ingest(view, { id: "e1", sourceTimestamp: at(-2), observedAt: at(-1) });
    const json = JSON.stringify(build(view, { supplied: { providerCallOutcomes: { returned: 1 } } }));
    for (const forbidden of ["Bearer", "abc123", "xyz", "api_key", "claude-message", "prompt", "delete everything", "secret", "Node "]) {
      expect(json, forbidden).not.toContain(forbidden);
    }
  });

  it("stays under 8 KiB for the maximum page with 1000 events", () => {
    const view = new ObservationProjection({ maxNodes: 2_000, maxEvents: 20_000, maxQuery: 1_000 });
    for (let i = 0; i < 100; i++) observe(view, { id: `wf-${i}`, title: `Bearer token-${i} ${"t".repeat(300)}`, evidence: [`ref-${i}`] });
    for (let i = 0; i < 1000; i++) ingest(view, { id: `e${i}`, provider: `provider-${i % 70}-${"n".repeat(80)}`, sourceTimestamp: at(-5), observedAt: at(-1) });
    const report = build(view, { limit: 500, eventLimit: 5000, supplied: { providerCallOutcomes: { returned: 1, validation: 2, authorization: 3, unavailable: 4, transport: 5, "uncertain-effect": 6 }, heapUsedBytes: 2 ** 40 } });
    expect(report.examined.nodes).toBe(100);
    expect(report.examined.events).toBe(1000);
    expect(JSON.stringify(report).length).toBeLessThan(8192);
  });
});

describe("B6 docs/workbench/09 § Aggregates and profiling: measured actual, never an invented ratio", () => {
  it("reports evidence coverage as two counts over the examined page, not the projection", () => {
    const view = new ObservationProjection({ maxNodes: 2_000, maxQuery: 100 });
    for (let i = 0; i < 150; i++) observe(view, { id: `n-${i}`, ...(i % 3 === 0 ? { evidence: [`ref-${i}`] } : {}) });
    const report = build(view, { limit: 100 });
    expect(report.examined).toMatchObject({ nodes: 100, truncated: true });
    const coverage = measured(report.nativeEvidenceCoverage);
    expect(coverage.source).toBe("projection");
    expect(coverage.value).toEqual({ withEvidence: 34, examined: 100 });
    expect(Object.keys(coverage.value).sort()).toEqual(["examined", "withEvidence"]);
    expect(measured(report.projectionSize).value.nodes).toBe(150);
  });

  it("scopes every projection metric to the requested principal", () => {
    const view = fixtureView();
    observe(view, { id: "bob-wf", scope: bob });
    expect(measured(build(view).activeWorkflows).value.active).toBe(2);
    expect(measured(buildOperationsTelemetry(view, { scope: bob, now: T }).activeWorkflows).value.active).toBe(1);
  });

  it("passes the invocation filter to the projection query", () => {
    const view = new ObservationProjection();
    view.refresh({ source: ref("furnace", "run", "in"), scope: alice, capturedAt: T, observedAt: T, trace: { invocationId: "inv-a" }, node: { title: "t", type: "workflow", statusText: "RUNNING", statusTone: "active" } });
    observe(view, { id: "out" });
    expect(measured(build(view, { invocationId: "inv-a" }).activeWorkflows).value.active).toBe(1);
    expect(build(view, { invocationId: "inv-a" }).examined.nodes).toBe(1);
  });

  it("issues exactly one bounded query and one bounded events read, with documented defaults and caps", () => {
    const view = fixtureView();
    const query = vi.spyOn(view, "query");
    const events = vi.spyOn(view, "events");
    build(view);
    expect(query).toHaveBeenCalledTimes(1);
    expect(events).toHaveBeenCalledTimes(1);
    expect(query.mock.calls[0]?.[0].limit).toBe(100);
    expect(events.mock.calls[0]?.[0].limit).toBe(200);
    build(view, { limit: 9999, eventLimit: 99999 });
    expect(query.mock.calls[1]?.[0].limit).toBe(100);
    expect(events.mock.calls[1]?.[0].limit).toBe(1000);
  });

  it.each([0, -1, 1.5, Number.NaN])("refuses an invalid limit %s with a typed validation error", bad => {
    expect(() => build(fixtureView(), { limit: bad })).toThrow(CapabilityError);
    expect(() => build(fixtureView(), { eventLimit: bad })).toThrow(CapabilityError);
  });

  it.each(["", "yesterday", "2026-10-15T12:00:00", "2026-10-15 12:00:00Z"])("refuses a caller clock %j that is not a timezone-qualified instant", bad => {
    expect(() => build(fixtureView(), { now: bad })).toThrow(CapabilityError);
  });
});

describe("B7 purity: no host clock, no mutation, deep-frozen output, bounded imports", () => {
  it("never reads the host clock", () => {
    const now = vi.spyOn(Date, "now");
    const view = new ObservationProjection();
    ingest(view, { id: "1", sourceTimestamp: at(-2), observedAt: at(-1) });
    build(view);
    expect(now).not.toHaveBeenCalled();
    now.mockRestore();
    expect(MODULE).not.toMatch(/Date\.now|new Date\(\)|performance\.now|process\.|Math\.random/);
  });

  it("does not mutate the projection", () => {
    const view = fixtureView();
    ingest(view, { id: "1", sourceTimestamp: at(-2), observedAt: at(-1) });
    const before = JSON.stringify({ stats: view.stats(), nodes: view.query({ scope: alice, limit: 100 }), events: view.events({ scope: alice, limit: 100 }) });
    build(view);
    build(view, { supplied: { visibleRows: 3 } });
    expect(JSON.stringify({ stats: view.stats(), nodes: view.query({ scope: alice, limit: 100 }), events: view.events({ scope: alice, limit: 100 }) })).toBe(before);
  });

  it("returns a deep-frozen report and does not alias the supplied record", () => {
    const outcomes = { returned: 2 };
    const view = fixtureView();
    ingest(view, { id: "1", sourceTimestamp: at(-2), observedAt: at(-1) });
    const report = build(view, { supplied: { providerCallOutcomes: outcomes } });
    expect(deepFrozen(report)).toBe(true);
    expect(Object.isFrozen(outcomes)).toBe(false);
    outcomes.returned = 99;
    expect(measured(report.providerCallOutcomes).value).toEqual({ returned: 2 });
  });

  it("imports only the observation, capability-registry and redaction modules", () => {
    const specifiers = [...MODULE.matchAll(/(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g)].map(match => match[1]).sort();
    expect(specifiers).toEqual(["./capability-registry.js", "./observation.js", "./redaction.js"]);
    expect(MODULE).not.toMatch(/\bimport\s*\(/);
    expect(MODULE).not.toContain("workflow-script/v1");
  });
});

describe("B8 Sr. Engineer ruling: opt-in, bounded, injected sink; no console, file or network write", () => {
  const report = (): OperationsTelemetry => build(fixtureView());
  it("emits nothing unless enabled", () => {
    const received: TelemetryEvent[] = [];
    const sink = { emit: (event: TelemetryEvent): void => { received.push(event); } };
    expect(emitOperationsTelemetry(report(), sink)).toBe("disabled");
    expect(emitOperationsTelemetry(report(), sink, { enabled: false })).toBe("disabled");
    expect(received).toEqual([]);
  });

  it("emits one typed event carrying the report when enabled", () => {
    const received: TelemetryEvent[] = [];
    const sink = { emit: (event: TelemetryEvent): void => { received.push(event); } };
    const built = report();
    expect(emitOperationsTelemetry(built, sink, { enabled: true })).toBe("emitted");
    expect(received).toHaveLength(1);
    expect(received[0]).toEqual({ contract: "workbench.telemetry.event/v1", kind: "operations.report", report: built });
  });

  it("drops an event over the byte cap and a sink that throws, reporting the drop and never throwing or leaking the error", () => {
    const received: TelemetryEvent[] = [];
    expect(emitOperationsTelemetry(report(), { emit: event => { received.push(event); } }, { enabled: true, maxBytes: 64 })).toBe("dropped-oversize");
    expect(received).toEqual([]);
    const throwing = { emit: (): void => { throw new Error("Bearer abc123 sink down"); } };
    expect(emitOperationsTelemetry(report(), throwing, { enabled: true })).toBe("dropped-sink-error");
  });

  it("writes to neither console nor the network", () => {
    const log = vi.spyOn(console, "log");
    const error = vi.spyOn(console, "error");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    emitOperationsTelemetry(report(), { emit: () => undefined }, { enabled: true });
    expect(log).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    log.mockRestore(); error.mockRestore(); fetchSpy.mockRestore();
    expect(MODULE).not.toMatch(/console\.|["']node:|fetch\(/);
  });
});

/** Seat rule F11: every control or invisible code point the respin-2 cases add is built with String.fromCodePoint. */
const cp = (code: number): string => String.fromCodePoint(code);
const BEL = cp(0x07);
const TAB = cp(0x09);
const ESC = cp(0x1b);
const NEL = cp(0x85);
const SHY = cp(0xad);
const ZWSP = cp(0x200b);
const LS = cp(0x2028);
const BOM = cp(0xfeff);
const CREDENTIAL = "ABCDEFGHIJ0123456789";
/** wb-cax.13 respin U1 (gate probe): an invisible character inside a credential prefix or keyword stops the shared redactor
 * matching; stripping it AFTER redaction reassembled the credential in the report. Normalize, redact once, strip once. */
const SPLIT_CREDENTIALS: ReadonlyArray<readonly [string, string]> = [
  ["zero-width space inside the sk-ant- prefix", `sk-ant-\u200bapi03-${CREDENTIAL}`],
  ["word joiner inside the sk- prefix", `sk\u2060-ant-api03-${CREDENTIAL}`],
  ["soft hyphen inside Bearer", "Bea\u00adrer abc123secret"],
  ["zero-width space inside Bearer", "Bear\u200ber abc123secret"],
  ["zero-width space before the password separator", "password\u200b=hunter2hunter2"],
  ["bidi override inside the sk-ant- prefix", `sk-ant-\u202eapi03-${CREDENTIAL}`],
  // The C1 next-line row is re-expressed in its own case below (respin 2 U3): NEL is a separator under the one helper.
  ["Arabic letter mark inside a ghp_ prefix", `ghp_\u061c${CREDENTIAL}`],
];

describe("C1 wb-cax.13 respin U1: split credentials never reassemble in the report", () => {
  it.each(SPLIT_CREDENTIALS)("redacts %s through a real projection", (_label, provider) => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", provider, sourceTimestamp: at(-2), observedAt: at(-1) });
    const lag = measured(build(view).eventLag).value;
    const json = JSON.stringify(build(view));
    for (const secret of [CREDENTIAL, "abc123secret", "hunter2hunter2", "api03"]) expect(json, secret).not.toContain(secret);
    expect(lag.providers.length).toBe(1);
    expect(lag.providers[0]).toMatch(/\[REDACTED\]/);
  });

  it("re-expresses the C1 next-line-inside-the-sk-ant-prefix row to the one helper's ruled reading: NEL separates two plain words", () => {
    // Respin 2 U3 (gate 2026-10-15T23:27Z, F3 default; owner 2026-10-16T00:01Z "F3 helper reading stands"): whitespace survives
    // as a separator (12:10Z) and U+0085 is whitespace (16:44Z; the trunk corpus WHITESPACE_UNITS), so "sk-ant-" then NEL is the
    // visible-space split class under every layout of the one helper. Reading NEL inside a key prefix as glue would be a wb-952
    // helper change (the authorized 952-F2 follow-up), never a local pre-pass in this module.
    const provider = `sk-ant-${NEL}api03-${CREDENTIAL}`;
    const view = new ObservationProjection();
    ingest(view, { id: "1", provider, sourceTimestamp: at(-2), observedAt: at(-1) });
    expect(measured(build(view).eventLag).value.providers).toEqual([`sk-ant- api03-${CREDENTIAL}`]);
    expect(sanitizeWorkbenchText(provider, WORKBENCH_TEXT_LIMIT, "label")).toBe(`sk-ant- api03-${CREDENTIAL}`);
  });

  it("control: a plain credential provider name becomes [REDACTED]", () => {
    const view = new ObservationProjection();
    ingest(view, { id: "1", provider: `sk-ant-api03-${CREDENTIAL}`, sourceTimestamp: at(-2), observedAt: at(-1) });
    expect(measured(build(view).eventLag).value.providers).toEqual(["[REDACTED]"]);
  });

  it("redacts a credential split by an escape sequence fed through a structural projection (the real one refuses ESC)", () => {
    const event = (provider: string): ObservationEvent => ({
      projectionEventId: "s1", source: ref(provider, "run", "src"), scope: alice, observedAt: at(-1), kind: "native.event", sourceTimestamp: at(-2),
    });
    const structural = (provider: string): Parameters<typeof buildOperationsTelemetry>[0] => ({
      query: () => ({ nodes: [], truncated: false }) as never,
      stats: () => ({ nodes: 0, events: 1, edges: 0 }),
      events: () => ({ events: [event(provider)], truncated: false, completeness: "complete" }),
    });
    const split = buildOperationsTelemetry(structural(`sk-ant-\u001b[31mapi03-${CREDENTIAL}`), { scope: alice, now: T });
    expect(JSON.stringify(split)).not.toContain(CREDENTIAL);
    expect(measured(split.eventLag).value.providers).toEqual(["[REDACTED]"]);
  });
});

describe("C2 wb-cax.13 respin U3: terminal escapes and invisibles are removed from provider names", () => {
  // Respin 2: the one helper's label layout renders an escape sequence as one space and deletes the ZWSP (gate U1: "label"
  // re-expresses C2 as "fur nace"); the case still dies if the module stops stripping (the raw ESC would reach the report).
  it("renders 'fur<ESC>[31mnace<ZWSP>' as 'fur nace' in the label layout with no escape byte (kills the strip-removal mutant)", () => {
    const event: ObservationEvent = {
      projectionEventId: "s1", source: ref("fur\u001b[31mnace\u200b", "run", "src"), scope: alice, observedAt: at(-1), kind: "native.event", sourceTimestamp: at(-2),
    };
    const report = buildOperationsTelemetry(
      { query: () => ({ nodes: [], truncated: false }) as never, stats: () => ({ nodes: 0, events: 1, edges: 0 }), events: () => ({ events: [event], truncated: false, completeness: "complete" }) },
      { scope: alice, now: T },
    );
    const providers = measured(report.eventLag).value.providers;
    expect(providers).toEqual(["fur nace"]);
    expect(JSON.stringify(report)).not.toContain("\\u001b");
    expect(providers.join("")).not.toMatch(/[\u0000-\u001f]/);
  });
});

describe("C3 wb-cax.13 respin U2a: dropped telemetry events are countable downstream", () => {
  const reportOf = (): OperationsTelemetry => build(fixtureView());
  it("carries a monotonic droppedEvents count on the next emitted event, and the emitter exposes it", () => {
    const received: TelemetryEvent[] = [];
    const emitter = createTelemetryEmitter({ emit: event => { received.push(event); } }, { enabled: true, maxBytes: 16 * 1024 });
    expect(emitter.droppedEvents()).toBe(0);
    const tiny = createTelemetryEmitter({ emit: event => { received.push(event); } }, { enabled: true, maxBytes: 64 });
    expect(tiny.emit(reportOf())).toBe("dropped-oversize");
    expect(tiny.emit(reportOf())).toBe("dropped-oversize");
    expect(tiny.emit(reportOf())).toBe("dropped-oversize");
    expect(tiny.droppedEvents()).toBe(3);
    expect(received).toEqual([]);
  });

  it("stamps the running dropped count on the first event delivered after drops and never decreases", () => {
    const received: TelemetryEvent[] = [];
    let fail = true;
    const sink = { emit: (event: TelemetryEvent): void => { if (fail) throw new Error("sink down"); received.push(event); } };
    const emitter = createTelemetryEmitter(sink, { enabled: true });
    expect(emitter.emit(reportOf())).toBe("dropped-sink-error");
    expect(emitter.emit(reportOf())).toBe("dropped-sink-error");
    fail = false;
    expect(emitter.emit(reportOf())).toBe("emitted");
    expect(emitter.emit(reportOf())).toBe("emitted");
    expect(received.map(event => event.droppedEvents)).toEqual([2, 2]);
    expect(emitter.droppedEvents()).toBe(2);
  });

  it("omits droppedEvents on an event delivered before any drop and counts nothing when disabled", () => {
    const received: TelemetryEvent[] = [];
    const emitter = createTelemetryEmitter({ emit: event => { received.push(event); } }, { enabled: true });
    expect(emitter.emit(reportOf())).toBe("emitted");
    expect(Object.keys(received[0] ?? {}).sort()).toEqual(["contract", "kind", "report"]);
    const off = createTelemetryEmitter({ emit: event => { received.push(event); } }, {});
    expect(off.emit(reportOf())).toBe("disabled");
    expect(off.droppedEvents()).toBe(0);
  });
});

describe("C4 wb-cax.13 respin U2b: the serialized cap counts UTF-8 bytes, not UTF-16 code units", () => {
  it("drops a non-ASCII event whose UTF-8 size exceeds maxBytes though its UTF-16 length does not", () => {
    const view = new ObservationProjection();
    for (let i = 0; i < 16; i++) {
      ingest(view, { id: `cjk${i}`, provider: `${"\u63d0\u4f9b\u8005".repeat(6)}${String(i).padStart(2, "0")}`, sourceTimestamp: at(-2), observedAt: at(-1) });
    }
    const report = build(view);
    const event = { contract: "workbench.telemetry.event/v1", kind: "operations.report", report };
    const units = JSON.stringify(event).length;
    const bytes = new TextEncoder().encode(JSON.stringify(event)).length;
    expect(bytes).toBeGreaterThan(units + 500);
    const received: TelemetryEvent[] = [];
    const sink = { emit: (delivered: TelemetryEvent): void => { received.push(delivered); } };
    expect(emitOperationsTelemetry(report, sink, { enabled: true, maxBytes: units })).toBe("dropped-oversize");
    expect(received).toEqual([]);
    expect(emitOperationsTelemetry(report, sink, { enabled: true, maxBytes: bytes })).toBe("emitted");
    expect(received).toHaveLength(1);
  });
});

describe("C5 wb-cax.13 respin S1: the module and its test carry no raw invisible or bidi code points", () => {
  it("keeps telemetry.ts and this test escape-only for format characters", () => {
    const raw = /[\u00ad\u061c\u180e\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff\ufff9-\ufffb]/;
    expect(raw.test(MODULE)).toBe(false);
    expect(raw.test(readFileSync(new URL("./workbench-telemetry.test.ts", import.meta.url), "utf8"))).toBe(false);
  });
});

/** The module's declared input as a plain object: it hands the report the producer's raw provider, which is the only way a
 * C0 control such as BEL or ESC reaches the provider path (the real projection refuses C0 controls in identity at ingest). */
function structuralView(provider: string): Parameters<typeof buildOperationsTelemetry>[0] {
  const event: ObservationEvent = {
    projectionEventId: "between-1", source: ref(provider, "run", "src"), scope: alice, observedAt: at(-1), kind: "native.event", sourceTimestamp: at(-2),
  };
  return {
    query: () => ({ nodes: [], examined: 0, truncated: false }),
    stats: () => ({ nodes: 0, events: 1, edges: 0 }),
    events: () => ({ events: [event], truncated: false, completeness: "complete" }),
  };
}
const providersOf = (projection: Parameters<typeof buildOperationsTelemetry>[0]): string[] =>
  measured(buildOperationsTelemetry(projection, { scope: alice, now: T }).eventLag).value.providers;

const BETWEEN_SECRET = "BETWEENTOKEN0123456789";
/**
 * Respin 2 U2 (gate 2026-10-15T23:27Z F2): a unit BETWEEN two tokens separates them, so the credential after it keeps its
 * boundary and is redacted. Deleting the unit before redaction (the 0071719 pre-pass, the eighth deletion-before-redaction
 * instance) glued the credential to the word before it and the redactor missed it; every row here leaked at 0071719.
 */
const STRUCTURAL_BETWEEN: ReadonlyArray<readonly [label: string, provider: string, shown: string]> = [
  ["a zero-width space before sk-ant-", `x${ZWSP}sk-ant-api03-${BETWEEN_SECRET}`, "x[REDACTED]"],
  ["a BEL before sk-ant-", `key${BEL}sk-ant-${BETWEEN_SECRET}`, "key [REDACTED]"],
  ["an SGR sequence before Bearer", `x${ESC}[0mBearer ${BETWEEN_SECRET}`, "x [REDACTED]"],
  ["a BEL as the space after Bearer", `Authorization: Bearer${BEL}${BETWEEN_SECRET}`, "Authorization: [REDACTED]"],
];
const REAL_BETWEEN: ReadonlyArray<readonly [label: string, provider: string, shown: string]> = [
  ["a BOM as the space after Bearer", `Authorization: Bearer${BOM}${BETWEEN_SECRET}`, "Authorization: [REDACTED]"],
  ["a soft hyphen before Bearer", `x${SHY}Bearer ${BETWEEN_SECRET}`, "x[REDACTED]"],
  ["a next-line as the space after Bearer", `Authorization: Bearer${NEL}${BETWEEN_SECRET}`, "Authorization: [REDACTED]"],
  ["a line separator before sk-ant-", `x${LS}sk-ant-api03-${BETWEEN_SECRET}`, "x [REDACTED]"],
  ["a line separator as the space after Bearer", `Authorization: Bearer${LS}${BETWEEN_SECRET}`, "Authorization: [REDACTED]"],
];

describe("C6 wb-cax.13 respin 2 U1/U2: provider names are the one helper's label output, falsified between tokens", () => {
  it.each(STRUCTURAL_BETWEEN)("redacts a credential after %s fed through a structural projection", (_label, provider, shown) => {
    const providers = providersOf(structuralView(provider));
    expect(providers).toEqual([shown]);
    expect(JSON.stringify(providers)).not.toContain(BETWEEN_SECRET);
  });

  it.each(REAL_BETWEEN)("redacts a credential after %s ingested through a real projection", (_label, provider, shown) => {
    const view = new ObservationProjection();
    const event: ObservationEvent = {
      projectionEventId: "between-real", source: ref(provider, "run", "src"), scope: alice, observedAt: at(-1), kind: "native.event", sourceTimestamp: at(-2),
    };
    expect(view.ingest(event)).toBe("applied");
    const report = build(view);
    expect(measured(report.eventLag).value.providers).toEqual([shown]);
    expect(JSON.stringify(report)).not.toContain(BETWEEN_SECRET);
  });

  it("renders exactly what sanitizeWorkbenchText renders in the label layout for every split and between-token shape", () => {
    for (const [, provider] of [...SPLIT_CREDENTIALS, ...STRUCTURAL_BETWEEN, ...REAL_BETWEEN]) {
      expect(providersOf(structuralView(provider)), provider).toEqual([sanitizeWorkbenchText(provider, WORKBENCH_TEXT_LIMIT, "label")]);
    }
  });

  it("collapses whitespace and trims the ends as a single-line label (respin 2 O2)", () => {
    expect(providersOf(structuralView(`furnace${TAB}${TAB} local `))).toEqual(["furnace local"]);
  });

  it("drops a provider that sanitizes to nothing from the list while its event still counts as a sample", () => {
    const lag = measured(buildOperationsTelemetry(structuralView(`${ZWSP}${BOM} ${TAB}`), { scope: alice, now: T }).eventLag).value;
    expect(lag).toMatchObject({ samples: 1, unmeasured: 0, providers: [], providersOmitted: 0 });
  });

  it("composes no sanitizer locally: one helper call with the named label layout, no primitive and no deletion class (F6 rule)", () => {
    expect(MODULE).toContain('WORKBENCH_TEXT_LIMIT, "label")');
    for (const forbidden of ["stripUnsafeText", "redactWorkbenchText", "Default_Ignorable_Code_Point", "{Cf}"]) expect(MODULE, forbidden).not.toContain(forbidden);
  });
});

/** wb-9iu: the cax.13 15:45Z deferred bundle. Each case kills one mutant that survived the landed tip (de79272); the
 * mutant it kills is named in the case title so a later reader can replay it. */
type StructuralProjection = Parameters<typeof buildOperationsTelemetry>[0];
const structuralEvents = (provider: string): StructuralProjection => ({
  query: () => ({ nodes: [], truncated: false }) as never,
  stats: () => ({ nodes: 0, events: 1, edges: 0 }),
  events: () => ({
    events: [{ projectionEventId: "d1", source: ref(provider, "run", "src"), scope: alice, observedAt: at(-1), kind: "native.event", sourceTimestamp: at(-2) }],
    truncated: false,
    completeness: "complete",
  }),
});
const structuralNodes = (nodes: ReadonlyArray<{ freshness: string; connection: string }>): StructuralProjection => ({
  query: () => ({
    nodes: nodes.map((node, index) => ({
      key: `n${index}`, kind: "workflow", nativeRef: ref("furnace", "run", `n${index}`), evidenceRefs: [],
      freshness: node.freshness, sourceConnectionState: node.connection,
      presentation: { type: "workflow", title: `Node ${index}`, statusText: "RUNNING", statusTone: "active" },
    })),
    truncated: false,
  }) as never,
  stats: () => ({ nodes: nodes.length, events: 0, edges: 0 }),
  events: () => ({ events: [], truncated: false, completeness: "complete" }),
});
const shownProviders = (projection: StructuralProjection): string[] => measured(buildOperationsTelemetry(projection, { scope: alice, now: T }).eventLag).value.providers;

describe("D1 wb-9iu M3: the 64-unit provider cap never leaves half a surrogate pair", () => {
  const FACE = cp(0x1f600);
  it("keeps 63 units when the pair would straddle the cap (kills the surrogate-guard-removed mutant)", () => {
    const shown = shownProviders(structuralEvents(`${"a".repeat(63)}${FACE}b`));
    expect(shown).toEqual(["a".repeat(63)]);
    expect(shown[0]).not.toMatch(/[\ud800-\udbff]$/);
  });

  it("controls: a pair wholly inside the cap and a name of exactly 64 units are kept whole", () => {
    expect(shownProviders(structuralEvents(`${"a".repeat(62)}${FACE}b`))).toEqual([`${"a".repeat(62)}${FACE}`]);
    expect(shownProviders(structuralEvents("a".repeat(64)))).toEqual(["a".repeat(64)]);
    expect(shownProviders(structuralEvents("a".repeat(65)))).toEqual(["a".repeat(64)]);
  });
});

describe("D2 wb-9iu M4: telemetry is enabled only by the boolean true", () => {
  it.each([1, "true", "yes", {}, []])("emits nothing for a truthy non-boolean enabled flag %j", flag => {
    const received: TelemetryEvent[] = [];
    const sink = { emit: (event: TelemetryEvent): void => { received.push(event); } };
    const report = build(fixtureView());
    expect(emitOperationsTelemetry(report, sink, { enabled: flag as never })).toBe("disabled");
    const emitter = createTelemetryEmitter(sink, { enabled: flag as never });
    expect(emitter.emit(report)).toBe("disabled");
    expect(emitter.droppedEvents()).toBe(0);
    expect(received).toEqual([]);
  });

  it("control: enabled true still emits", () => {
    const received: TelemetryEvent[] = [];
    expect(emitOperationsTelemetry(build(fixtureView()), { emit: event => { received.push(event); } }, { enabled: true })).toBe("emitted");
    expect(received).toHaveLength(1);
  });
});

describe("D3 wb-9iu M5 / gate F1: the authorization outcome key survives the report and is redacted only by the JSON reply path", () => {
  const OUTCOMES = { returned: 1, validation: 2, authorization: 3, unavailable: 4, transport: 5, "uncertain-effect": 6 } as const;
  it.each(Object.keys(OUTCOMES))("accepts %s as a supplied outcome key and preserves its count in the in-memory report", key => {
    const count = OUTCOMES[key as keyof typeof OUTCOMES];
    const report = build(fixtureView(), { supplied: { providerCallOutcomes: { [key]: count } } });
    expect(report.providerCallOutcomes).toEqual({ state: "measured", value: { [key]: count }, source: "supplied" });
  });

  it("characterizes the known loss: sanitizeWorkbenchJsonText turns the authorization count into [REDACTED] and keeps every other count", () => {
    const report = build(fixtureView(), { supplied: { providerCallOutcomes: OUTCOMES } });
    expect(measured(report.providerCallOutcomes).value.authorization).toBe(3);
    const reply = JSON.parse(sanitizeWorkbenchJsonText(report)) as { providerCallOutcomes: { value: Record<string, unknown> } };
    expect(reply.providerCallOutcomes.value).toEqual({ ...OUTCOMES, authorization: "[REDACTED]" });
  });
});

describe("D4 wb-9iu M6: a disconnected node counts as last-known even when its freshness says current", () => {
  const stale = (nodes: ReadonlyArray<{ freshness: string; connection: string }>): number =>
    measured(buildOperationsTelemetry(structuralNodes(nodes), { scope: alice, now: T }).activeWorkflows).value.lastKnownRunningStale;
  it("counts a current-but-disconnected active workflow as stale (kills the disconnected-clause-removed mutant)", () => {
    expect(stale([{ freshness: "current", connection: "disconnected" }])).toBe(1);
  });

  it("counts a non-current but connected node as stale and a current connected or unknown-connection node as live", () => {
    expect(stale([{ freshness: "stale", connection: "connected" }])).toBe(1);
    expect(stale([{ freshness: "current", connection: "connected" }])).toBe(0);
    expect(stale([{ freshness: "current", connection: "unknown" }])).toBe(0);
    expect(stale([
      { freshness: "current", connection: "disconnected" }, { freshness: "current", connection: "connected" }, { freshness: "unknown", connection: "unknown" },
    ])).toBe(2);
  });
});

describe("D5 wb-9iu M8 / gate F6: an invalid maxBytes falls back to the 8192-byte default, never used raw", () => {
  const oversize = (): OperationsTelemetry => ({ ...build(fixtureView()), now: `${T}${"x".repeat(9000)}` });
  const small = (): OperationsTelemetry => build(fixtureView());
  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 2, "64" as never])(
    "applies the default cap to maxBytes %j: a small event is delivered and an event over 8192 bytes is dropped", bad => {
      const received: TelemetryEvent[] = [];
      const sink = { emit: (event: TelemetryEvent): void => { received.push(event); } };
      expect(emitOperationsTelemetry(small(), sink, { enabled: true, maxBytes: bad })).toBe("emitted");
      expect(emitOperationsTelemetry(oversize(), sink, { enabled: true, maxBytes: bad })).toBe("dropped-oversize");
      expect(received).toHaveLength(1);
    },
  );

  it("control: a valid positive-integer maxBytes is honored in both directions", () => {
    const received: TelemetryEvent[] = [];
    const sink = { emit: (event: TelemetryEvent): void => { received.push(event); } };
    expect(emitOperationsTelemetry(oversize(), sink, { enabled: true, maxBytes: 64 * 1024 })).toBe("emitted");
    expect(emitOperationsTelemetry(small(), sink, { enabled: true, maxBytes: 64 })).toBe("dropped-oversize");
  });
});
