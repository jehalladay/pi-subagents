/**
 * W21-B (wb-6ze.5): the observation recovery and bounded-query size receipt measures what it claims.
 *
 * Offline: the receipt module is driven with the src ObservationProjection on a 200-node / 2,000-event
 * fixture (bench-like maxEvents 500 so a cursor really leaves the retained window), and with mutant
 * subclasses that each weaken one guarantee through the public API, so a measurement that reported a
 * constant instead of observing the projection would fail here. The bench CLI is read as text only.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessRecovery,
  buildFixture,
  buildReceipt,
  exitCodeFor,
  FINDING_RULES,
  measureRecovery,
  percentiles,
  RECEIPT_CONTRACT,
  UNREALISED_PROBES,
} from "../qa/workbench/observation-recovery-receipt.mjs";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  type ObservationLimits,
  ObservationProjection,
  type ObservationScope,
  type RelationKind,
} from "../src/workbench/observation.js";

type Method = "query" | "window" | "relations" | "events";
type Completeness = "complete" | "partial-gap";

interface FixtureOptions {
  seed: number;
  nodes: number;
  events: number;
  providers: readonly string[];
}

interface RelationInput {
  scope: ObservationScope;
  from: NativeRef;
  to: NativeRef;
  kind: RelationKind;
  provenance: { source: string; observedAt?: string };
}

interface FixtureShape {
  seed: number;
  nodes: number;
  events: number;
  ticks: number;
  changesPerTick: { min: number; max: number };
  providers: Record<string, number>;
  baseline: number;
  snapshots: number;
  relations: number;
  scopes: number;
  invocations: number;
  epoch: string;
}

interface Fixture {
  seed: number;
  epoch: string;
  scope: ObservationScope;
  invocationId: string;
  relationRoot: NativeRef;
  baseline: NativeSnapshot[];
  updates: ObservationEvent[];
  snapshots: NativeSnapshot[];
  relations: RelationInput[];
  shape: FixtureShape;
}

interface Cursor {
  source: NativeRef;
  projectionEventId: string;
}

interface CursorProbe {
  armed: boolean;
  cursor: Cursor | null;
  completeness: Completeness | null;
  rows: number;
}

interface Measurement {
  limits: "default" | ObservationLimits;
  provider: string;
  queryLimit: number;
  shape: FixtureShape;
  ingest: { offered: number; applied: number; duplicate: number; outOfOrder: number };
  ingestMs: number;
  eventsPerSecond: number | null;
  retained: { nodes: number; events: number; edges: number };
  heapGrowthBytes: number;
  heapLabel: string;
  population: { nodes: number; byProvider: Record<string, number> };
  providerNodes: number;
  currentBeforeDisconnect: number;
  disconnectMs: number;
  staleAfterDisconnect: number;
  reconnectMs: number;
  currentRegainedWithoutSnapshot: number;
  providerCensus: { beforeDisconnect: number; afterDisconnect: number; afterReconnect: number; afterRefresh: number };
  refreshCalls: number;
  refreshOutcomes: { applied: number; outOfOrder: number };
  refreshLatencyMs: { p50: number | null; p95: number | null; max: number | null; samples: number; method: string };
  reconcileMs: number;
  staleAfterRefresh: number;
  gap: CursorProbe;
  gapDetectMs: number | null;
  resume: CursorProbe;
  resumeMs: number | null;
  queryBytes: Record<Method, number>;
  rowsReturned: Record<Method, number>;
  boundExercised: Record<Method, boolean>;
  ansiIn: Method[];
  relationRootFound: boolean;
  censusPages: number;
}

interface MeasureOptions {
  limits?: ObservationLimits;
  provider: string;
  queryLimit: number;
  clock?: () => number;
  heapUsed?: () => number;
}

interface Finding {
  rule: string;
  detail: string;
}

interface Unrealised {
  probe: string;
  detail: string;
}

interface Assessment {
  findings: Finding[];
  unrealised: Unrealised[];
  realised: boolean;
}

interface Claim {
  nodes: number;
  events: number;
}

type PassInput =
  | { label: string; claimed: Claim; measurement: Measurement }
  | { label: string; claimed: Claim; limits: "default" | ObservationLimits; error: string };

interface ReceiptInput {
  utc: string;
  revision: string;
  command: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  passes: PassInput[];
}

interface ReceiptPass extends Partial<Measurement> {
  label: string;
  limits: "default" | ObservationLimits;
  claimed: Claim;
  findings: Finding[];
  unrealised: Unrealised[];
  realised: boolean;
  error?: string;
}

interface Receipt {
  contract: string;
  utc: string;
  revision: string;
  command: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  passes: Record<string, ReceiptPass>;
  findings: (Finding & { pass: string })[];
  unrealised: (Unrealised & { pass: string })[];
  realised: boolean;
  pass: boolean;
}

const fixtureOf = buildFixture as (options: FixtureOptions) => Fixture;
const measure = measureRecovery as (
  projectionClass: typeof ObservationProjection,
  fixture: Fixture,
  options: MeasureOptions,
) => Measurement;
const assess = assessRecovery as (measurement: Measurement) => Assessment;
const receiptOf = buildReceipt as (input: ReceiptInput) => Receipt;
const exitOf = exitCodeFor as (receipt: Receipt) => number;
const rank = percentiles as (samples: readonly number[]) => Measurement["refreshLatencyMs"];
const findingRules = FINDING_RULES as readonly string[];
const unrealisedProbes = UNREALISED_PROBES as readonly string[];

const PROVIDERS = ["forge", "furnace", "claude-agent-sdk"] as const;
const BOUNDED: MeasureOptions = { limits: { maxEvents: 500 }, provider: "furnace", queryLimit: 100 };
const smallFixture = (seed = 7): Fixture => fixtureOf({ seed, nodes: 200, events: 2_000, providers: PROVIDERS });

/** Mutant: reconnect re-confirms the provider from its last streamed state, with no read-current snapshot. */
class ReconnectRestoresCurrent extends ObservationProjection {
  private readonly lastStreamed = new Map<string, ObservationEvent>();
  override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
    const outcome = super.ingest(event);
    if (outcome === "applied") this.lastStreamed.set(JSON.stringify(event.source), event);
    return outcome;
  }
  override reconnect(provider: string): void {
    super.reconnect(provider);
    for (const event of this.lastStreamed.values()) {
      if (event.source.provider !== provider || !event.node) continue;
      super.refresh({
        source: event.source,
        scope: event.scope,
        capturedAt: event.observedAt,
        observedAt: event.observedAt,
        sequence: event.sourceSequence,
        node: event.node.presentation,
        trace: event.trace,
        evidenceRefs: event.evidenceRefs,
      });
    }
  }
}

/**
 * Mutant: the same fabricated reconfirmation, but without trace, so the reconfirmed nodes also leave the
 * invocation viewport; a census that only counted what it could still see would read a clean zero.
 */
class ReconnectHidesProvider extends ObservationProjection {
  private readonly lastStreamed = new Map<string, ObservationEvent>();
  override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
    const outcome = super.ingest(event);
    if (outcome === "applied") this.lastStreamed.set(JSON.stringify(event.source), event);
    return outcome;
  }
  override reconnect(provider: string): void {
    super.reconnect(provider);
    for (const event of this.lastStreamed.values()) {
      if (event.source.provider !== provider || !event.node) continue;
      super.refresh({
        source: event.source,
        scope: event.scope,
        capturedAt: event.observedAt,
        observedAt: event.observedAt,
        sequence: event.sourceSequence,
        node: event.node.presentation,
      });
    }
  }
}

/** Mutant: after reconnect every row reads freshness "unknown"; unknown is not current, before or after refresh. */
class UnknownAfterReconnect extends ObservationProjection {
  private reconnectedOnce = false;
  override reconnect(provider: string): void {
    super.reconnect(provider);
    this.reconnectedOnce = true;
  }
  override window(filter: Parameters<ObservationProjection["window"]>[0]): ReturnType<ObservationProjection["window"]> {
    const result = super.window(filter);
    if (!this.reconnectedOnce) return result;
    return { ...result, nodes: result.nodes.map((node) => ({ ...node, freshness: "unknown" as const })) };
  }
}

/** Mutant: disconnect is dropped, so nothing the provider owns goes stale. */
class DisconnectIgnored extends ObservationProjection {
  override disconnect(_provider: string): void {
    // deliberately a no-op
  }
}

/** Mutant: once a provider disconnects, every read-current snapshot is refused as out-of-order. */
class RefreshRefusedAfterDisconnect extends ObservationProjection {
  private disconnectedOnce = false;
  override disconnect(provider: string): void {
    this.disconnectedOnce = true;
    super.disconnect(provider);
  }
  override refresh(snapshot: NativeSnapshot): ReturnType<ObservationProjection["refresh"]> {
    return this.disconnectedOnce ? "out-of-order" : super.refresh(snapshot);
  }
}

/** Mutant: an evicted cursor is reported as a complete resume instead of a partial gap. */
class GapBlind extends ObservationProjection {
  override events(filter: Parameters<ObservationProjection["events"]>[0]): ReturnType<ObservationProjection["events"]> {
    return { ...super.events(filter), completeness: "complete" };
  }
}

/** Mutant: a bounded query page is returned twice over. */
class QueryLimitIgnored extends ObservationProjection {
  override query(filter: Parameters<ObservationProjection["query"]>[0]): ReturnType<ObservationProjection["query"]> {
    const result = super.query(filter);
    return { ...result, nodes: [...result.nodes, ...result.nodes] };
  }
}

/** Mutant: the viewport leaks a rendered ANSI title. */
class AnsiLeak extends ObservationProjection {
  override window(filter: Parameters<ObservationProjection["window"]>[0]): ReturnType<ObservationProjection["window"]> {
    const result = super.window(filter);
    return {
      ...result,
      nodes: result.nodes.map((node) => ({
        ...node,
        presentation: { ...node.presentation, title: `\x1b[31m${node.presentation.title}\x1b[0m` },
      })),
    };
  }
}

const constructions: unknown[][] = [];
/** Spy: records the exact arguments the measurement constructs the projection with. */
class ConstructionSpy extends ObservationProjection {
  constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
    super(...args);
    constructions.push(args);
  }
}

const FINITE_FIELDS = [
  "eventsPerSecond",
  "ingestMs",
  "retained.nodes",
  "retained.events",
  "retained.edges",
  "heapGrowthBytes",
  "disconnectMs",
  "reconnectMs",
  "refreshLatencyMs.p50",
  "refreshLatencyMs.p95",
  "refreshLatencyMs.max",
  "refreshCalls",
  "reconcileMs",
  "gapDetectMs",
  "resumeMs",
  "queryBytes.query",
  "queryBytes.window",
  "queryBytes.relations",
  "queryBytes.events",
  "rowsReturned.query",
  "rowsReturned.window",
  "rowsReturned.relations",
  "rowsReturned.events",
] as const;

const fieldAt = (value: unknown, path: string): unknown =>
  path
    .split(".")
    .reduce<unknown>(
      (node, key) => (node !== null && typeof node === "object" ? (node as Record<string, unknown>)[key] : undefined),
      value,
    );

const furnaceNodes = (fixture: Fixture): number =>
  fixture.snapshots.filter((snapshot) => snapshot.source.provider === "furnace").length;

const rulesOf = (measurement: Measurement): string[] => assess(measurement).findings.map((finding) => finding.rule);

const sourceOf = (path: string): string => readFileSync(new URL(path, import.meta.url), "utf8");

/** Module specifiers of static import declarations, including bare side-effect imports. */
const specifiersOf = (source: string): string[] =>
  [...source.matchAll(/\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']/gm)]
    .map((match) => match[1] ?? match[2] ?? "")
    .sort();

/** A dynamic import or require anywhere in the text (AGENTS.md: top-level imports only). */
const DYNAMIC_LOAD = /\bimport\s*\(|\brequire\s*\(/;

describe("W21-B observation recovery receipt: measurement on the src projection", () => {
  it("records every recovery and bounded-query field as a finite number and holds the recovery invariants (200 nodes / 2,000 events)", () => {
    const fixture = smallFixture();
    const measurement = measure(ObservationProjection, fixture, BOUNDED);
    for (const path of FINITE_FIELDS) expect(Number.isFinite(fieldAt(measurement, path)), path).toBe(true);
    expect(measurement.heapLabel).toBe("transient-inclusive");
    expect(measurement.limits).toEqual({ maxEvents: 500 });

    const population = furnaceNodes(fixture);
    expect(population).toBeGreaterThan(0);
    expect(measurement.providerNodes).toBe(population);
    expect(measurement.currentBeforeDisconnect).toBe(population);
    expect(measurement.staleAfterDisconnect).toBe(population);
    expect(measurement.currentRegainedWithoutSnapshot).toBe(0);
    expect(measurement.providerCensus).toEqual({
      beforeDisconnect: population,
      afterDisconnect: population,
      afterReconnect: population,
      afterRefresh: population,
    });
    expect(measurement.refreshCalls).toBe(population);
    expect(measurement.refreshLatencyMs.samples).toBe(population);
    expect(measurement.refreshOutcomes).toEqual({ applied: population, outOfOrder: 0 });
    expect(measurement.staleAfterRefresh).toBe(0);
    const latency = measurement.refreshLatencyMs;
    expect(latency.method).toBe("nearest-rank");
    expect(latency.p50 ?? Number.NaN).toBeLessThanOrEqual(latency.p95 ?? Number.NaN);
    expect(latency.p95 ?? Number.NaN).toBeLessThanOrEqual(latency.max ?? Number.NaN);

    expect(measurement.ingest).toEqual({ offered: 2_000, applied: 2_000, duplicate: 0, outOfOrder: 0 });
    expect(measurement.eventsPerSecond ?? Number.NaN).toBeCloseTo((2_000 * 1_000) / measurement.ingestMs, 6);
    expect(measurement.retained).toEqual({ nodes: 200, events: 500, edges: fixture.relations.length });
    expect(measurement.population.nodes).toBe(200);
    expect(measurement.gap).toMatchObject({ armed: true, completeness: "partial-gap", rows: 0 });
    expect(measurement.gap.cursor?.projectionEventId).toBe(fixture.updates[0].projectionEventId);
    expect(measurement.resume).toMatchObject({ armed: true, completeness: "complete", rows: 100 });

    expect(measurement.rowsReturned).toEqual({ query: 100, window: 100, relations: 100, events: 100 });
    expect(measurement.boundExercised).toEqual({ query: true, window: true, relations: true, events: true });
    for (const method of ["query", "window", "relations", "events"] as const) {
      expect(measurement.queryBytes[method], method).toBeGreaterThan(2);
    }
    expect(measurement.ansiIn).toEqual([]);
    expect(measurement.relationRootFound).toBe(true);
    expect(assess(measurement)).toEqual({ findings: [], unrealised: [], realised: true });
  });

  it("constructs a default-limits pass with no argument, judges its retained window against the documented default, and reports an unarmed gap probe as not realised rather than as a pass or a violation", () => {
    constructions.length = 0;
    const overflowing = measure(ConstructionSpy, fixtureOf({ seed: 11, nodes: 200, events: 20_500, providers: PROVIDERS }), {
      provider: "furnace",
      queryLimit: 100,
    });
    expect(constructions).toEqual([[]]);
    expect(overflowing.limits).toBe("default");
    expect(overflowing.retained.events).toBeLessThanOrEqual(20_000);
    expect(overflowing.retained.events).toBeLessThan(20_500);
    expect(overflowing.gap).toMatchObject({ armed: true, completeness: "partial-gap" });
    expect(assess(overflowing)).toEqual({ findings: [], unrealised: [], realised: true });

    const fitting = measure(ConstructionSpy, smallFixture(), { provider: "furnace", queryLimit: 100 });
    expect(constructions.at(-1)).toEqual([]);
    expect(fitting.gap.armed).toBe(false);
    const judged = assess(fitting);
    expect(judged.findings).toEqual([]);
    expect(judged.unrealised.map((entry) => entry.probe)).toEqual(["gap-probe-unarmed"]);
    expect(judged.realised).toBe(false);

    measure(ConstructionSpy, smallFixture(), BOUNDED);
    expect(constructions.at(-1)).toEqual([{ maxEvents: 500 }]);
  }, 60_000);

  it("times every refresh() call on its own and derives throughput and heap growth from the injected probes", () => {
    let tick = 0;
    const heap = [1_000, 4_096];
    const fixture = smallFixture();
    const measurement = measure(ObservationProjection, fixture, {
      ...BOUNDED,
      clock: () => {
        tick += 1;
        return tick;
      },
      heapUsed: () => heap.shift() ?? Number.NaN,
    });
    const calls = furnaceNodes(fixture);
    expect(measurement.ingestMs).toBe(1);
    expect(measurement.eventsPerSecond).toBe(2_000_000);
    expect(measurement.disconnectMs).toBe(1);
    expect(measurement.reconnectMs).toBe(1);
    expect(measurement.refreshLatencyMs).toEqual({ p50: 1, p95: 1, max: 1, samples: calls, method: "nearest-rank" });
    expect(measurement.reconcileMs).toBe(2 * calls + 1);
    expect(measurement.gapDetectMs).toBe(1);
    expect(measurement.resumeMs).toBe(1);
    expect(measurement.heapGrowthBytes).toBe(3_096);
    expect(heap).toEqual([]);
  });

  it("reports nearest-rank percentiles over individual samples", () => {
    expect(rank([5, 1, 4, 2, 3])).toEqual({ p50: 3, p95: 5, max: 5, samples: 5, method: "nearest-rank" });
    expect(rank(Array.from({ length: 20 }, (_, index) => 20 - index))).toEqual({
      p50: 10,
      p95: 19,
      max: 20,
      samples: 20,
      method: "nearest-rank",
    });
    expect(rank([])).toEqual({ p50: null, p95: null, max: null, samples: 0, method: "nearest-rank" });
  });

  it("reports a bound that never cut an answer as not realised when the population is below the query limit", () => {
    const measurement = measure(ObservationProjection, fixtureOf({ seed: 7, nodes: 60, events: 2_000, providers: PROVIDERS }), BOUNDED);
    expect(measurement.rowsReturned).toEqual({ query: 60, window: 60, relations: 59, events: 100 });
    expect(measurement.boundExercised).toEqual({ query: false, window: false, relations: false, events: true });
    const judged = assess(measurement);
    expect(judged.findings).toEqual([]);
    expect(judged.unrealised.map((entry) => entry.probe)).toEqual(["bound-unexercised"]);
    expect(judged.realised).toBe(false);
  });

  it("refuses a query limit outside the 1..100 window page cap instead of measuring a different bound", () => {
    for (const queryLimit of [0, 101, 1.5]) {
      expect(() => measure(ObservationProjection, smallFixture(), { ...BOUNDED, queryLimit }), String(queryLimit)).toThrow(
        /queryLimit/,
      );
    }
  });
});

describe("W21-B observation recovery receipt: falsifiers through mutant projections", () => {
  it("catches a reconnect that restores current without a read-current snapshot", () => {
    const measurement = measure(ReconnectRestoresCurrent, smallFixture(), BOUNDED);
    expect(measurement.currentRegainedWithoutSnapshot).toBeGreaterThan(0);
    expect(rulesOf(measurement)).toEqual(["reconnect-restored-current"]);
    expect(assess(measurement).realised).toBe(true);
  });

  it("catches a reconnect that hides the provider's nodes from the window pages instead of reading a clean zero", () => {
    const fixture = smallFixture();
    const measurement = measure(ReconnectHidesProvider, fixture, BOUNDED);
    expect(measurement.providerCensus).toEqual({
      beforeDisconnect: furnaceNodes(fixture),
      afterDisconnect: furnaceNodes(fixture),
      afterReconnect: 0,
      afterRefresh: furnaceNodes(fixture),
    });
    expect(rulesOf(measurement)).toEqual(["census-population-changed"]);
  });

  it("never counts an unknown freshness as current: unknown after reconnect is not regained, and unknown after refresh is not reconciled", () => {
    const fixture = smallFixture();
    const measurement = measure(UnknownAfterReconnect, fixture, BOUNDED);
    expect(measurement.currentRegainedWithoutSnapshot).toBe(0);
    expect(measurement.staleAfterRefresh).toBe(furnaceNodes(fixture));
    expect(rulesOf(measurement)).toEqual(["stale-after-full-refresh"]);
  });

  it("catches a disconnect that leaves the provider current", () => {
    const measurement = measure(DisconnectIgnored, smallFixture(), BOUNDED);
    expect(measurement.staleAfterDisconnect).toBe(0);
    expect(rulesOf(measurement)).toEqual(["disconnect-not-stale", "reconnect-restored-current"]);
  });

  it("catches a reconcile whose snapshots never restore current", () => {
    const fixture = smallFixture();
    const measurement = measure(RefreshRefusedAfterDisconnect, fixture, BOUNDED);
    expect(measurement.refreshCalls).toBe(furnaceNodes(fixture));
    expect(measurement.refreshOutcomes.outOfOrder).toBe(furnaceNodes(fixture));
    expect(measurement.staleAfterRefresh).toBe(furnaceNodes(fixture));
    expect(rulesOf(measurement)).toEqual(["stale-after-full-refresh"]);
  });

  it("catches an evicted cursor reported as a complete resume", () => {
    const measurement = measure(GapBlind, smallFixture(), BOUNDED);
    expect(measurement.gap).toMatchObject({ armed: true, completeness: "complete" });
    expect(rulesOf(measurement)).toEqual(["gap-not-detected"]);
  });

  it("catches a bounded query that returns more rows than its limit", () => {
    const measurement = measure(QueryLimitIgnored, smallFixture(), BOUNDED);
    expect(measurement.rowsReturned.query).toBe(200);
    expect(rulesOf(measurement)).toEqual(["limit-exceeded"]);
  });

  it("catches a terminal escape in a serialized observation result, including its JSON-escaped form", () => {
    const measurement = measure(AnsiLeak, smallFixture(), BOUNDED);
    expect(measurement.ansiIn).toEqual(["window"]);
    expect(rulesOf(measurement)).toEqual(["ansi-in-result"]);
  });
});

describe("W21-B observation recovery receipt: judgement of synthetic measurements", () => {
  it("raises each finding for a synthetic measurement that violates exactly that rule", () => {
    const base = measure(ObservationProjection, smallFixture(), BOUNDED);
    const violations: Array<[string, (measurement: Measurement) => void]> = [
      [
        "census-population-changed",
        (m) => {
          m.providerCensus.afterReconnect = m.providerNodes - 1;
        },
      ],
      [
        "disconnect-not-stale",
        (m) => {
          m.staleAfterDisconnect = m.providerNodes - 1;
        },
      ],
      [
        "reconnect-restored-current",
        (m) => {
          m.currentRegainedWithoutSnapshot = 1;
        },
      ],
      [
        "stale-after-full-refresh",
        (m) => {
          m.staleAfterRefresh = 2;
        },
      ],
      [
        "gap-not-detected",
        (m) => {
          m.gap.completeness = "complete";
        },
      ],
      [
        "retained-cursor-gap",
        (m) => {
          m.resume.completeness = "partial-gap";
        },
      ],
      [
        "retained-window-exceeded",
        (m) => {
          m.retained.events = 501;
        },
      ],
      [
        "limit-exceeded",
        (m) => {
          m.rowsReturned.relations = m.queryLimit + 1;
        },
      ],
      [
        "ansi-in-result",
        (m) => {
          m.ansiIn = ["events"];
        },
      ],
    ];
    expect(violations.map(([rule]) => rule)).toEqual([...findingRules]);
    for (const [rule, violate] of violations) {
      const measurement = structuredClone(base);
      violate(measurement);
      const judged = assess(measurement);
      expect(
        judged.findings.map((finding) => finding.rule),
        rule,
      ).toEqual([rule]);
      expect(judged.findings[0].detail.length, rule).toBeGreaterThan(0);
      expect(judged.realised, rule).toBe(true);
    }
    const atDefaults: Measurement = { ...structuredClone(base), limits: "default" };
    atDefaults.retained.events = 20_000;
    expect(rulesOf(atDefaults)).toEqual([]);
    atDefaults.retained.events = 20_001;
    expect(rulesOf(atDefaults)).toEqual(["retained-window-exceeded"]);
  });

  it("reports each unarmed probe as not realised, never as a finding", () => {
    const base = measure(ObservationProjection, smallFixture(), BOUNDED);
    const unarmed: Array<[string, (measurement: Measurement) => void]> = [
      [
        "provider-population",
        (m) => {
          m.providerNodes = 0;
          m.currentBeforeDisconnect = 0;
          m.staleAfterDisconnect = 0;
          m.refreshCalls = 0;
        },
      ],
      [
        "falsifier-unarmed",
        (m) => {
          m.currentBeforeDisconnect = m.providerNodes - 1;
        },
      ],
      [
        "population-truncated",
        (m) => {
          m.population.nodes = m.shape.nodes - 1;
        },
      ],
      [
        "reconcile-incomplete",
        (m) => {
          m.refreshCalls = m.providerNodes - 1;
        },
      ],
      [
        "gap-probe-unarmed",
        (m) => {
          m.gap.armed = false;
          m.gap.completeness = "complete";
        },
      ],
      [
        "resume-probe-unarmed",
        (m) => {
          m.resume.armed = false;
          m.resume.completeness = null;
        },
      ],
      [
        "relations-probe-unarmed",
        (m) => {
          m.relationRootFound = false;
        },
      ],
      [
        "bound-unexercised",
        (m) => {
          m.boundExercised.window = false;
        },
      ],
      [
        "non-finite-measurement",
        (m) => {
          m.eventsPerSecond = null;
        },
      ],
    ];
    expect(unarmed.map(([probe]) => probe)).toEqual([...unrealisedProbes]);
    for (const [probe, disarm] of unarmed) {
      const measurement = structuredClone(base);
      disarm(measurement);
      const judged = assess(measurement);
      expect(
        judged.unrealised.map((entry) => entry.probe),
        probe,
      ).toEqual([probe]);
      expect(judged.findings, probe).toEqual([]);
      expect(judged.realised, probe).toBe(false);
    }
  });
});

describe("W21-B observation recovery receipt: fixture", () => {
  it("is deterministic per seed and has the claimed shape: one scope, one invocation, three providers, 1-100 changes per tick, epoch-derived timestamps and contiguous sequences", () => {
    const first = smallFixture(7);
    const again = smallFixture(7);
    const other = smallFixture(8);
    expect(JSON.stringify(again)).toBe(JSON.stringify(first));
    expect(JSON.stringify(other)).not.toBe(JSON.stringify(first));

    expect(first.shape).toMatchObject({ seed: 7, nodes: 200, events: 2_000, baseline: 200, snapshots: 200, scopes: 1, invocations: 1 });
    expect(first.updates).toHaveLength(2_000);
    expect(first.baseline).toHaveLength(200);
    expect(first.snapshots).toHaveLength(200);
    expect(Object.keys(first.shape.providers).sort()).toEqual([...PROVIDERS].sort());
    expect(Object.values(first.shape.providers).reduce((sum, count) => sum + count, 0)).toBe(200);
    expect(first.shape.changesPerTick.min).toBeGreaterThanOrEqual(1);
    expect(first.shape.changesPerTick.max).toBeLessThanOrEqual(100);
    expect(first.shape.relations).toBe(first.relations.length);
    expect(first.relations.filter((relation) => relation.from.id === first.relationRoot.id).length).toBeGreaterThan(100);

    const items = [...first.baseline, ...first.updates, ...first.snapshots];
    expect(new Set(items.map((item) => JSON.stringify(item.scope))).size).toBe(1);
    expect(new Set(items.map((item) => item.trace?.invocationId)).size).toBe(1);
    const epoch = Date.parse(first.epoch);
    for (const item of items) expect(item.observedAt).toMatch(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.000Z$/);
    expect(first.baseline.every((snapshot) => Date.parse(snapshot.capturedAt) === epoch)).toBe(true);

    const streamed = new Map<string, number>();
    for (const update of first.updates) {
      expect(Date.parse(update.observedAt)).toBeGreaterThan(epoch);
      const key = JSON.stringify(update.source);
      const prior = streamed.get(key) ?? 0;
      expect(update.sourceSequence).toBe(prior + 1);
      streamed.set(key, prior + 1);
    }
    const lastStreamedAt = Math.max(...first.updates.map((update) => Date.parse(update.observedAt)));
    for (const snapshot of first.snapshots) {
      expect(snapshot.sequence).toBe((streamed.get(JSON.stringify(snapshot.source)) ?? 0) + 1);
      expect(Date.parse(snapshot.capturedAt)).toBeGreaterThan(lastStreamedAt);
    }
  });
});

describe("W21-B observation recovery receipt: receipt and exit code", () => {
  const host = {
    utc: "2026-10-15T08:00:00.000Z",
    revision: "abc1234",
    command: "node qa/workbench/observation-recovery-bench.mjs",
    node: "v24.20.0",
    arch: "x64",
    platform: "linux",
    cpus: 8,
    cpuModel: "reference host",
  };
  const claimed = { nodes: 200, events: 2_000 };

  it("builds a frozen v1 receipt whose exit code separates pass (0), measured violation (1) and not realised (2)", () => {
    const measured = measure(ObservationProjection, smallFixture(), BOUNDED);
    const passA: Measurement = { ...structuredClone(measured), limits: "default" };
    const passB = structuredClone(measured);
    const clean = receiptOf({
      ...host,
      passes: [
        { label: "default-limits", claimed, measurement: passA },
        { label: "bench-only-limits", claimed, measurement: passB },
      ],
    });
    expect(clean).toMatchObject({ contract: RECEIPT_CONTRACT, ...host, findings: [], unrealised: [], realised: true, pass: true });
    expect(RECEIPT_CONTRACT).toBe("workbench.observation-recovery/v1");
    expect(Object.keys(clean.passes)).toEqual(["default-limits", "bench-only-limits"]);
    expect(clean.passes["default-limits"].limits).toBe("default");
    expect(clean.passes["bench-only-limits"].limits).toEqual({ maxEvents: 500 });
    expect(clean.passes["bench-only-limits"]).toMatchObject({ label: "bench-only-limits", claimed, realised: true, findings: [] });
    expect(clean.passes["bench-only-limits"].refreshLatencyMs).toEqual(measured.refreshLatencyMs);
    expect(exitOf(clean)).toBe(0);

    expect(Object.isFrozen(clean)).toBe(true);
    expect(Object.isFrozen(clean.passes)).toBe(true);
    expect(Object.isFrozen(clean.passes["default-limits"].refreshLatencyMs)).toBe(true);
    expect(Object.isFrozen(clean.findings)).toBe(true);
    expect(() => {
      (clean as { pass: boolean }).pass = false;
    }).toThrow(TypeError);

    const violating = receiptOf({
      ...host,
      passes: [
        { label: "default-limits", claimed, measurement: passA },
        { label: "bench-only-limits", claimed, measurement: { ...structuredClone(measured), currentRegainedWithoutSnapshot: 3 } },
      ],
    });
    expect(violating.findings.map(({ pass, rule }) => ({ pass, rule }))).toEqual([
      { pass: "bench-only-limits", rule: "reconnect-restored-current" },
    ]);
    expect(violating).toMatchObject({ realised: true, pass: false });
    expect(exitOf(violating)).toBe(1);

    const shortOfClaim = receiptOf({
      ...host,
      passes: [
        { label: "default-limits", claimed: { nodes: 1_000, events: 100_000 }, measurement: passA },
        { label: "bench-only-limits", claimed, measurement: { ...structuredClone(measured), currentRegainedWithoutSnapshot: 3 } },
      ],
    });
    expect(shortOfClaim.unrealised.map(({ pass, probe }) => ({ pass, probe }))).toEqual([
      { pass: "default-limits", probe: "shape-below-claim" },
    ]);
    expect(shortOfClaim.findings).toHaveLength(1);
    expect(shortOfClaim).toMatchObject({ realised: false, pass: false });
    expect(exitOf(shortOfClaim)).toBe(2);

    const failed = receiptOf({
      ...host,
      passes: [
        { label: "default-limits", claimed, limits: "default", error: "projection unavailable" },
        { label: "bench-only-limits", claimed, measurement: passB },
      ],
    });
    expect(failed.passes["default-limits"]).toMatchObject({
      label: "default-limits",
      limits: "default",
      error: "projection unavailable",
      realised: false,
      findings: [],
    });
    expect(failed.unrealised.map(({ pass, probe }) => ({ pass, probe }))).toEqual([
      { pass: "default-limits", probe: "measurement-error" },
    ]);
    expect(exitOf(failed)).toBe(2);
  });
});

describe("W21-B observation recovery receipt: source boundaries", () => {
  const bench = sourceOf("../qa/workbench/observation-recovery-bench.mjs");
  const receipt = sourceOf("../qa/workbench/observation-recovery-receipt.mjs");

  it("keeps the bench CLI on exactly the allowed static imports: the compiled projection, the receipt module, node:os and node:fs", () => {
    expect(specifiersOf(bench)).toEqual(
      ["../../dist/workbench/observation.js", "./observation-recovery-receipt.mjs", "node:fs", "node:os"].sort(),
    );
    expect(bench).not.toMatch(DYNAMIC_LOAD);
  });

  it("keeps the only maxNodes literal inside the bench-only pass object, so the default pass never raises a cap", () => {
    const benchOnlyStart = bench.indexOf("const BENCH_ONLY_PASS = Object.freeze({");
    const benchOnlyEnd = bench.indexOf("\n});", benchOnlyStart);
    const defaultStart = bench.indexOf("const DEFAULT_PASS = Object.freeze({");
    const defaultEnd = bench.indexOf("\n});", defaultStart);
    expect(benchOnlyStart).toBeGreaterThan(-1);
    expect(defaultStart).toBeGreaterThan(-1);
    const maxNodesAt = [...bench.matchAll(/maxNodes/g)].map((match) => match.index ?? -1);
    expect(maxNodesAt).toHaveLength(1);
    expect(maxNodesAt[0]).toBeGreaterThan(benchOnlyStart);
    expect(maxNodesAt[0]).toBeLessThan(benchOnlyEnd);

    const benchOnly = bench.slice(benchOnlyStart, benchOnlyEnd);
    expect(benchOnly).toMatch(/label:\s*["']bench-only-limits["']/);
    expect(benchOnly).toMatch(/maxNodes:\s*12_?000\b/);
    expect(benchOnly).toMatch(/maxEdges:\s*24_?000\b/);
    expect(benchOnly).toMatch(/maxEvents:\s*20_?000\b/);
    expect(benchOnly).toMatch(/maxQuery:\s*100\b/);
    expect(benchOnly).toMatch(/nodes:\s*10_?000\b/);
    expect(benchOnly).toMatch(/events:\s*100_?000\b/);

    const defaultPass = bench.slice(defaultStart, defaultEnd);
    expect(defaultPass).toMatch(/label:\s*["']default-limits["']/);
    expect(defaultPass).toMatch(/limits:\s*["']default["']/);
    expect(defaultPass).toMatch(/nodes:\s*1_?000\b/);
    expect(defaultPass).toMatch(/events:\s*100_?000\b/);
    expect(defaultPass).not.toMatch(/max(Nodes|Edges|Events|Query|PayloadBytes)/);
    // The default pass reaches measureRecovery with no limits key, so the projection gets no argument.
    expect(bench).toContain("...(pass.limits === 'default' ? {} : {limits: pass.limits}),");
  });

  it("prints and writes the receipt before setting a non-zero exit code, and never calls process.exit", () => {
    expect(bench).toMatch(/W21_RECOVERY_RECEIPT/);
    expect(bench).toMatch(/W21_REVISION/);
    expect(bench).not.toMatch(/process\.exit\s*\(/);
    const written = bench.indexOf("writeFileSync(");
    const printed = bench.indexOf("console.log(");
    const exited = bench.indexOf("process.exitCode");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(-1);
    expect(exited).toBeGreaterThan(Math.max(written, printed));
    expect(bench).toMatch(/exitCodeFor\(receipt\)/);
    expect(bench).toMatch(/process\.exitCode\s*=\s*code;\s*$/);
  });

  it("keeps the receipt module pure: no imports, no require, no wall clock or random source", () => {
    expect(specifiersOf(receipt)).toEqual([]);
    expect(receipt).not.toMatch(DYNAMIC_LOAD);
    expect(receipt).not.toMatch(/Date\.now|Math\.random/);
  });

  it("registers the bench as one additive Forge command outside the default gate", () => {
    const forge = sourceOf("../forge.toml");
    expect(forge).toContain(
      '[build.commands.observation-recovery-bench]\ncommand = "node qa/workbench/observation-recovery-bench.mjs"\ntimeout = 300\n',
    );
    expect(forge.match(/\[build\.commands\.observation-recovery-bench\]/g)).toHaveLength(1);
    const gate = /^gate = \[(.*)\]$/m.exec(forge)?.[1] ?? "";
    expect(gate).toContain("test");
    expect(gate).not.toContain("observation-recovery-bench");
  });
});
