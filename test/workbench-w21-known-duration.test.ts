/** W21 known-duration falsifiers, one case per landed W21 bench (wb-oq3 family 3, with the wb-9x5.15 gate F1 bound by name).
 *
 * Every timed series of every landed bench is driven through call-through stubs that busy-wait a KNOWN duration on
 * performance.now(), the clock every W21 bench reads, before delegating to the real call. Any clock that brackets the
 * stubbed call therefore measures at least that long on any host load, so each bound below is the stub's own duration,
 * never a latency target. A constant stub bounds only the median: a clock that is wrong on a minority of samples moves
 * the low order statistics and leaves p50 where it was (the wb-9x5.15 gate's G1), and no W21 receipt publishes a min.
 * So the stubs RAMP: call k waits (base + k * step) tenths of a microsecond. If each sample wraps a distinct stubbed call
 * and the samples' call indices, sorted, are i_0 < i_1 < ..., the j-th smallest sample is at least the wait of call i_j,
 * so EVERY published quantile (p50, p95 and max, read at the lowest rank any bench convention can pick) has a
 * rank-indexed floor, and a minority of wrong-span samples drags them under it: the low-quantile floor the wb-9x5.15
 * F1 binding asks for. Where several series share one stubbed call the stub keys a separate ramp per series (by the
 * argument identity the bench passes), and where a bench interleaves series it records each call, so every floor uses
 * the exact call indices, and the step is chosen to dominate the real per-call work.
 * Scalar spans (apply totals, disconnect, reconnect, probes) wait a stated constant per call and must hold the sum.
 * line-diff-bench reads no clock in its measured path, so its falsifier is that slow stubs change no receipt byte.
 */
import { describe, expect, it } from "vitest";
import { runAttentionBench } from "../qa/workbench/attention-grouped-bench.mjs";
import { buildGroupedFixture, runGroupedBench } from "../qa/workbench/grouped-fixture.mjs";
import { runEvidenceRetainedBench } from "../qa/workbench/inspector-evidence-retained-bench.mjs";
import { runLineDiffBench } from "../qa/workbench/line-diff-bench.mjs";
import { buildFixture, measureRecovery } from "../qa/workbench/observation-recovery-receipt.mjs";
import { runReducerSelectorBench } from "../qa/workbench/reducer-selector-bench.mjs";
import { runTimelineBench } from "../qa/workbench/timeline-grouped-core.mjs";
import { initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { ATTENTION_TRACE_REASONS, selectAttention } from "../src/workbench/attention.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type ObservationEvent, ObservationProjection } from "../src/workbench/observation.js";
import { buildTimelineLanes } from "../src/workbench/timeline.js";

/** Durations are integers in tenths of a microsecond: every floor is then a multiple of the benches' 0.1 us rounding. */
const UNIT = 10_000;
const EPS = 1e-9;

/** Busy-waits at least `ms` on performance.now(); a clock bracketing the stubbed call must contain the whole loop. */
const spin = (ms: number): void => {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // busy-wait: the measured span must contain this whole loop
  }
};

/** A known-duration schedule: call k waits (base + k * step) / UNIT ms. */
class Ramp {
  calls = 0;
  readonly #base: number;
  readonly #step: number;
  constructor(base: number, step: number) {
    this.#base = base;
    this.#step = step;
  }
  /** The duration of call k, in ms. */
  at(k: number): number {
    return (this.#base + k * this.#step) / UNIT;
  }
  /** The summed duration of calls 0..n-1, in ms. */
  total(n: number): number {
    return (n * this.#base + (this.#step * n * (n - 1)) / 2) / UNIT;
  }
  wait(): void {
    spin(this.at(this.calls));
    this.calls += 1;
  }
}

interface Quantiles {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
const QUANTILES = [
  ["p50", 0.5],
  ["p95", 0.95],
  ["max", 1],
] as const;
/** The lowest rank any W21 quantile convention reads for q over n samples: floor(n q), ceil(n q) - 1 or floor((n - 1) q). */
const rankFloor = (n: number, q: number): number => Math.max(0, Math.min(n - 1, Math.ceil(n * q) - 1, Math.floor((n - 1) * q)));

/** Every published quantile of a series whose i-th sample (call order) is at least lb(i), lb increasing, holds lb at its rank floor. */
function expectRankFloors(label: string, series: Quantiles, lb: (rank: number) => number): void {
  expect(series.samples, `${label}: samples`).toBeGreaterThan(0);
  for (const [name, q] of QUANTILES) {
    const floor = lb(rankFloor(series.samples, q));
    expect(series[name], `${label}: ${name} >= ${floor} ms`).toBeGreaterThanOrEqual(floor - EPS);
  }
}

/** A scalar span that wraps calls whose waits sum to `floor` ms. */
const expectSpan = (label: string, value: number | null, floor: number): void => {
  expect(value, `${label} >= ${floor} ms`).toBeGreaterThanOrEqual(floor - EPS);
};

const HOST = {
  utc: "2026-10-16T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-w21-known-duration.test.ts",
  overrides: {},
  pinnedCaps: { observationMaxQuery: 100, attentionDefaultLimit: 100, attentionMaxLimit: 100, attentionDefaultBottlenecks: 5, attentionMaxBottlenecks: 20 },
};
type Host = typeof HOST;
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
  inspectorEvidenceTarget?: typeof inspectorEvidenceTarget;
}
const INSPECTOR: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey, inspectorEvidenceTarget };
/** The inspector with layoutInspector behind a known-duration ramp; everything else is the real reducer. */
const rampedLayout = (ramp: Ramp): Inspector => ({
  ...INSPECTOR,
  layoutInspector: (...args: Parameters<typeof layoutInspector>): string[] => {
    ramp.wait();
    return layoutInspector(...args);
  },
});

interface Fixture {
  shape: Record<string, unknown> & { ticks: number };
  snapshots: readonly unknown[];
  relations: readonly unknown[];
  updates: readonly ObservationEvent[];
}
const build = buildGroupedFixture as (options: { seed: number; nodes: number; depth: number; ticks: number }) => Fixture;
const SMALL = { seed: 3, nodes: 60, depth: 3, ticks: 8 };

describe("W21 known duration: inspector-grouped-bench (runGroupedBench and applyFixture in qa/workbench/grouped-fixture.mjs)", () => {
  interface Navigation {
    keypresses: number;
    all: Quantiles;
    reducer: Quantiles;
    layout: Quantiles;
    resize: Quantiles;
    byView: Record<string, Quantiles>;
    bySize: Record<string, Quantiles>;
    byKey: Record<string, Quantiles>;
  }
  interface Pass {
    offered: { nodes: number; edges: number; updates: number };
    apply: { refreshMs: number; relateMs: number; ingestMs: number; ingestPerTick: Quantiles };
    navigation: Navigation | null;
  }
  const groupedRun = runGroupedBench as (input: {
    Projection: typeof ObservationProjection;
    inspector: Inspector;
    fixture: Fixture;
    host: Host;
    sampling: { blocks: number; keypressesPerBlock: number; resizeSamples: number };
  }) => { passes: Record<"default-limits" | "bench-only-limits", Pass> };
  const REFRESH = 1_000;
  const RELATE = 1_000;
  const TICK = { base: 500, step: 2_500 };
  const GROUPED = { seed: 3, nodes: 60, depth: 3, ticks: 24 };
  const SAMPLING = { blocks: 2, keypressesPerBlock: 40, resizeSamples: 16 };

  it("holds every navigation series at its ramp floors and every apply span at its stated sum, in both passes", () => {
    /** Known-duration apply: refresh and relate wait a constant per call, and the first ingest of each tick waits its ramp. */
    class KnownApplyProjection extends ObservationProjection {
      readonly #ticks = new Ramp(TICK.base, TICK.step);
      #tickAt: string | undefined;
      override refresh(...args: Parameters<ObservationProjection["refresh"]>): ReturnType<ObservationProjection["refresh"]> {
        spin(REFRESH / UNIT);
        return super.refresh(...args);
      }
      override relate(...args: Parameters<ObservationProjection["relate"]>): void {
        spin(RELATE / UNIT);
        super.relate(...args);
      }
      override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
        if (event.observedAt !== this.#tickAt) {
          this.#tickAt = event.observedAt;
          this.#ticks.wait();
        }
        return super.ingest(event);
      }
    }
    const reduce = new Ramp(1_000, 500);
    const keyLayout = new Ramp(1_000, 500);
    const resizeLayout = new Ramp(1_000, 5_000);
    // navigate() lays a block's first frame out at a new size (the timed resize) and every keypress frame at that same
    // size object, so the size identity tells the two layout series apart; the call counts are asserted below.
    let lastSize: unknown;
    const inspector: Inspector = {
      ...INSPECTOR,
      layoutInspector: (...args: Parameters<typeof layoutInspector>): string[] => {
        if (args[2] !== lastSize) {
          lastSize = args[2];
          resizeLayout.wait();
        } else keyLayout.wait();
        return layoutInspector(...args);
      },
      reduceInspectorKey: (...args: Parameters<typeof reduceInspectorKey>): ReturnType<typeof reduceInspectorKey> => {
        reduce.wait();
        return reduceInspectorKey(...args);
      },
    };
    const receipt = groupedRun({ Projection: KnownApplyProjection, inspector, fixture: build(GROUPED), host: HOST, sampling: SAMPLING });
    const navigation = receipt.passes["bench-only-limits"].navigation;
    if (navigation === null) throw new Error("the bench-only pass recorded no navigation");
    const keypresses = SAMPLING.blocks * SAMPLING.keypressesPerBlock;
    expect(navigation.keypresses).toBe(keypresses);
    expect(keyLayout.calls).toBe(keypresses);
    expect(navigation.resize.samples).toBe(SAMPLING.blocks + SAMPLING.resizeSamples);
    expect(resizeLayout.calls).toBe(navigation.resize.samples);
    // Keypress k is reduce call k and keypress-layout call k; resize s is resize-layout call s.
    expectRankFloors("navigation.reducer", navigation.reducer, k => reduce.at(k));
    expectRankFloors("navigation.layout", navigation.layout, k => keyLayout.at(k));
    expectRankFloors("navigation.all", navigation.all, k => reduce.at(k) + keyLayout.at(k));
    expectRankFloors("navigation.resize", navigation.resize, s => resizeLayout.at(s));
    for (const group of ["byView", "bySize", "byKey"] as const) {
      for (const [name, series] of Object.entries(navigation[group])) {
        if (series.samples > 0) expectRankFloors(`navigation.${group}.${name}`, series, k => reduce.at(k) + keyLayout.at(k));
      }
    }
    const ticks = new Ramp(TICK.base, TICK.step);
    for (const [label, pass] of Object.entries(receipt.passes)) {
      const perTick = pass.apply.ingestPerTick;
      expect(perTick.samples, `${label} ticks`).toBe(GROUPED.ticks);
      expectSpan(`${label} apply.refreshMs`, pass.apply.refreshMs, (pass.offered.nodes * REFRESH) / UNIT);
      expectSpan(`${label} apply.relateMs`, pass.apply.relateMs, (pass.offered.edges * RELATE) / UNIT);
      expectSpan(`${label} apply.ingestMs`, pass.apply.ingestMs, ticks.total(perTick.samples));
      expectRankFloors(`${label} apply.ingestPerTick`, perTick, tick => ticks.at(tick));
    }
  }, 120_000);
});

describe("W21 known duration: reducer-selector-bench (wb-9x5.15 F1: the minority wrong-span clock is closed here)", () => {
  interface Band {
    updates: number;
    redraws: number;
    reducer: Quantiles;
    selectors: Record<string, Quantiles>;
  }
  interface ReducerReceipt {
    offered: { updates: number };
    reducer: { all: Quantiles; firstTenth: Quantiles; lastTenth: Quantiles };
    bands: Band[];
    exactChurn: Band[];
    selectors: Record<string, Quantiles>;
    folds: { redraws: number; layoutCalls: number };
    outliers: { reducer: Array<{ ms: number }>; selector: Array<{ ms: number }> };
  }
  const reducerRun = runReducerSelectorBench as (input: {
    Projection: typeof ObservationProjection;
    inspector: Inspector;
    fixture: Fixture;
    host: Host;
  }) => ReducerReceipt;

  it("holds the reducer clock at its ingest ramp and every selector clock at its layout ramp, at p50, p95, max and the outliers", () => {
    const ingest = new Ramp(100, 20);
    const layout = new Ramp(2_000, 500);
    class RampIngestProjection extends ObservationProjection {
      override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
        ingest.wait();
        return super.ingest(event);
      }
    }
    const receipt = reducerRun({ Projection: RampIngestProjection, inspector: rampedLayout(layout), fixture: build({ seed: 3, nodes: 200, depth: 5, ticks: 12 }), host: HOST });
    const updates = receipt.offered.updates;
    expect(receipt.reducer.all.samples).toBe(updates);
    expect(ingest.calls).toBe(updates);
    // Reducer sample k is ingest call k; selector sample j of a view is a layout call with index >= j.
    expectRankFloors("reducer.all", receipt.reducer.all, k => ingest.at(k));
    expectRankFloors("reducer.firstTenth", receipt.reducer.firstTenth, k => ingest.at(k));
    const tailStart = updates - receipt.reducer.lastTenth.samples;
    expectRankFloors("reducer.lastTenth", receipt.reducer.lastTenth, k => ingest.at(tailStart + k));
    expect(receipt.folds.layoutCalls).toBe(layout.calls);
    for (const [view, series] of Object.entries(receipt.selectors)) expectRankFloors(`selectors.${view}`, series, j => layout.at(j));
    for (const band of [...receipt.bands, ...receipt.exactChurn]) {
      if (band.updates > 0) expectRankFloors("band reducer", band.reducer, k => ingest.at(k));
      if (band.redraws > 0) for (const [view, series] of Object.entries(band.selectors)) expectRankFloors(`band selectors.${view}`, series, j => layout.at(j));
    }
    // The kept outliers are the top order statistics: the i-th slowest of n is the (n - 1 - i)-th smallest.
    for (const [i, sample] of receipt.outliers.reducer.entries()) expectSpan(`outliers.reducer[${i}]`, sample.ms, ingest.at(updates - 1 - i));
    for (const [i, sample] of receipt.outliers.selector.entries()) expectSpan(`outliers.selector[${i}]`, sample.ms, layout.at(layout.calls - 1 - i));
  }, 120_000);
});

describe("W21 known duration: line-diff-bench reads no clock in its measured path", () => {
  const lineDiffRun = runLineDiffBench as (input: { Projection: typeof ObservationProjection; inspector: Inspector; fixture: Fixture; host: Host }) => Record<string, unknown>;

  it("slow ingest and layout stubs, one pause longer than the 1 s cadence window, leave every receipt field identical", () => {
    const fixture = build(SMALL);
    const plain = lineDiffRun({ Projection: ObservationProjection, inspector: INSPECTOR, fixture, host: HOST });
    let waits = 0;
    const pauseAt = fixture.updates.findIndex(update => update.observedAt !== fixture.updates[0].observedAt);
    class SlowIngestProjection extends ObservationProjection {
      #ingested = 0;
      override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
        // Every update waits; the first update of the second tick waits past one whole cadence window (1 s of wall
        // time), so a redraw clock or cadence read from the host instead of fixture time would change the receipt.
        spin(this.#ingested === pauseAt ? 1_100 : 0.05);
        this.#ingested += 1;
        waits += 1;
        return super.ingest(event);
      }
    }
    const slowLayout: Inspector = {
      ...INSPECTOR,
      layoutInspector: (...args: Parameters<typeof layoutInspector>): string[] => {
        spin(0.2);
        waits += 1;
        return layoutInspector(...args);
      },
    };
    const slowed = lineDiffRun({ Projection: SlowIngestProjection, inspector: slowLayout, fixture, host: HOST });
    expect(pauseAt).toBeGreaterThan(0);
    expect(waits).toBeGreaterThan(fixture.updates.length);
    expect(slowed).toEqual(plain);
  }, 120_000);
});

describe("W21 known duration: attention-grouped-bench", () => {
  interface AttentionReceipt {
    passes: Array<{
      label: string;
      samples: number;
      settings: Array<{ label: string; bottlenecks: number; clockLagMs: number; build: Quantiles }>;
      slowest: Array<{ ms: number }>;
    }>;
  }
  type Selector = (projection: Parameters<typeof selectAttention>[0], input: Parameters<typeof selectAttention>[1]) => ReturnType<typeof selectAttention>;
  const attentionRun = runAttentionBench as (input: {
    Projection: typeof ObservationProjection;
    selectAttention: Selector;
    reasonNames: string[];
    fixture: Fixture;
    host: Host;
  }) => AttentionReceipt;

  it("holds every setting's build clock at the exact ramp of its own timed selectAttention calls, in both passes", () => {
    // One ramp per pass (each pass reads its own projection); every timed call is recorded so the floors use exact indices.
    const passes = new Map<object, { ramp: Ramp; calls: Array<{ bottlenecks: number | undefined; now: number }> }>();
    let untimed = 0;
    // The timed call reads the projection itself; the bench's untimed second call reads a counting view.
    const timed: Selector = (projection, input) => {
      if (projection instanceof ObservationProjection) {
        let pass = passes.get(projection);
        if (pass === undefined) {
          pass = { ramp: new Ramp(1_000, 4_000), calls: [] };
          passes.set(projection, pass);
        }
        pass.calls.push({ bottlenecks: input.bottlenecks, now: Date.parse(input.now) });
        pass.ramp.wait();
      } else untimed += 1;
      return selectAttention(projection, input);
    };
    const receipt = attentionRun({ Projection: ObservationProjection, selectAttention: timed, reasonNames: [...ATTENTION_TRACE_REASONS], fixture: build({ seed: 5, nodes: 60, depth: 5, ticks: 20 }), host: HOST });
    const recorded = [...passes.values()];
    expect(recorded).toHaveLength(receipt.passes.length);
    expect(untimed).toBe(recorded.reduce((sum, pass) => sum + pass.calls.length, 0));
    for (const [at, pass] of receipt.passes.entries()) {
      const { ramp, calls } = recorded[at];
      const width = pass.settings.length;
      expect(calls).toHaveLength(pass.samples);
      // The bench samples every setting once per sample tick, in order: call i belongs to setting i mod width.
      for (const [i, call] of calls.entries()) {
        const setting = pass.settings[i % width];
        const first = calls[i - (i % width)];
        expect({ i, bottlenecks: call.bottlenecks, lag: first.now - call.now }).toEqual({
          i,
          bottlenecks: setting.bottlenecks,
          lag: setting.clockLagMs - pass.settings[0].clockLagMs,
        });
      }
      for (const [c, setting] of pass.settings.entries()) {
        expectRankFloors(`${pass.label}:${setting.label}`, setting.build, j => ramp.at(width * j + c));
      }
      for (const [i, sample] of pass.slowest.entries()) expectSpan(`${pass.label} slowest[${i}]`, sample.ms, ramp.at(pass.samples - 1 - i));
    }
  }, 120_000);
});

describe("W21 known duration: timeline-grouped-bench (runTimelineBench in qa/workbench/timeline-grouped-core.mjs)", () => {
  interface TimelinePass {
    samples: number;
    build: Record<string, unknown>;
  }
  const timelineRun = runTimelineBench as (input: {
    Projection: typeof ObservationProjection;
    buildTimelineLanes: typeof buildTimelineLanes;
    fixture: Fixture;
    host: Host;
    sampling: { rounds: number };
  }) => { passes: Record<string, TimelinePass> };
  const isQuantiles = (value: unknown): value is Quantiles => typeof value === "object" && value !== null && "samples" in value && "p50" in value;
  type Call = { zoom: number; pan: number; columns: number };
  /** The recorded call indices a receipt series covers, from its name: overall, z<zoom>c<columns> or pan<pan>. */
  const indicesOf = (name: string, calls: readonly Call[]): number[] => {
    const zc = /^z(\d+)c(\d+)$/.exec(name);
    const pan = /^pan(\d+)$/.exec(name);
    const keep = (call: Call): boolean =>
      name === "overall" || (zc !== null && call.zoom === Number(zc[1]) && call.columns === Number(zc[2])) || (pan !== null && call.pan === Number(pan[1]));
    return calls.flatMap((call, index) => (keep(call) ? [index] : []));
  };

  it("holds the overall, zoom-columns and pan series at the exact ramp of their own buildTimelineLanes calls, in both passes", () => {
    // One ramp per pass (each pass builds through its own counting reader); every call's request is recorded.
    const passes = new Map<object, { ramp: Ramp; calls: Call[] }>();
    const timed: typeof buildTimelineLanes = (reader, request) => {
      let pass = passes.get(reader);
      if (pass === undefined) {
        pass = { ramp: new Ramp(500, 2_500), calls: [] };
        passes.set(reader, pass);
      }
      pass.calls.push({ zoom: request.zoom, pan: request.pan, columns: request.columns });
      pass.ramp.wait();
      return buildTimelineLanes(reader, request);
    };
    const receipt = timelineRun({ Projection: ObservationProjection, buildTimelineLanes: timed, fixture: build(SMALL), host: HOST, sampling: { rounds: 1 } });
    const recorded = [...passes.values()];
    const results = Object.entries(receipt.passes);
    expect(recorded).toHaveLength(results.length);
    let checked = 0;
    for (const [at, [label, pass]] of results.entries()) {
      const { ramp, calls } = recorded[at];
      expect(calls, label).toHaveLength(pass.samples);
      for (const [name, value] of Object.entries(pass.build)) {
        const series = isQuantiles(value) ? { [name]: value } : (value as Record<string, unknown>);
        for (const [key, entry] of Object.entries(series)) {
          if (!isQuantiles(entry)) throw new Error(`${label}.build.${name}.${key} is not a distribution`);
          const indices = indicesOf(key, calls);
          expect(indices, `${label}.build.${key} calls`).toHaveLength(entry.samples);
          expectRankFloors(`${label}.build.${key}`, entry, j => ramp.at(indices[j]));
          checked += 1;
        }
      }
    }
    expect(checked).toBe(results.length * (1 + 4 * 2 + 3));
  }, 120_000);
});

describe("W21 known duration: observation-recovery-bench (measureRecovery in qa/workbench/observation-recovery-receipt.mjs)", () => {
  interface Measurement {
    ingest: { offered: number };
    ingestMs: number;
    disconnectMs: number;
    reconnectMs: number;
    refreshCalls: number;
    refreshLatencyMs: Quantiles;
    reconcileMs: number;
    gapDetectMs: number | null;
    resumeMs: number | null;
  }
  const measure = measureRecovery as (
    projection: typeof ObservationProjection,
    fixture: unknown,
    options: { provider: string; queryLimit: number; limits: { maxEvents: number } },
  ) => Measurement;
  const fixtureOf = buildFixture as (options: { seed: number; nodes: number; events: number; providers: readonly string[] }) => unknown;
  const INGEST = 500;
  const DISCONNECT = 5_000;
  const RECONNECT = 7_000;
  const PROBE = 3_000;

  it("holds every scalar span at its stated duration and every per-node reconcile latency at its ramp floor", () => {
    const reconcile = new Ramp(200, 100);
    class KnownRecoveryProjection extends ObservationProjection {
      #reconnected = false;
      override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
        spin(INGEST / UNIT);
        return super.ingest(event);
      }
      override disconnect(provider: string): void {
        spin(DISCONNECT / UNIT);
        super.disconnect(provider);
      }
      override reconnect(provider: string): void {
        spin(RECONNECT / UNIT);
        super.reconnect(provider);
        this.#reconnected = true;
      }
      // Only the per-node reconcile after the reconnect is timed per call; the baseline refreshes stay untouched.
      override refresh(...args: Parameters<ObservationProjection["refresh"]>): ReturnType<ObservationProjection["refresh"]> {
        if (this.#reconnected) reconcile.wait();
        return super.refresh(...args);
      }
      // Only the two cursor probes pass `after`; the size samples read events without it.
      override events(...args: Parameters<ObservationProjection["events"]>): ReturnType<ObservationProjection["events"]> {
        if (args[0].after !== undefined) spin(PROBE / UNIT);
        return super.events(...args);
      }
    }
    const measurement = measure(KnownRecoveryProjection, fixtureOf({ seed: 7, nodes: 200, events: 2_000, providers: ["forge", "furnace", "claude-agent-sdk"] }), {
      provider: "furnace",
      queryLimit: 100,
      limits: { maxEvents: 500 },
    });
    expect(measurement.refreshCalls).toBe(reconcile.calls);
    expect(measurement.refreshLatencyMs.samples).toBe(reconcile.calls);
    expectSpan("ingestMs", measurement.ingestMs, (measurement.ingest.offered * INGEST) / UNIT);
    expectSpan("disconnectMs", measurement.disconnectMs, DISCONNECT / UNIT);
    expectSpan("reconnectMs", measurement.reconnectMs, RECONNECT / UNIT);
    expectRankFloors("refreshLatencyMs", measurement.refreshLatencyMs, j => reconcile.at(j));
    expectSpan("reconcileMs", measurement.reconcileMs, reconcile.total(reconcile.calls));
    expectSpan("gapDetectMs", measurement.gapDetectMs, PROBE / UNIT);
    expectSpan("resumeMs", measurement.resumeMs, PROBE / UNIT);
  }, 120_000);
});

describe("W21 known duration: inspector-evidence-retained-bench", () => {
  interface EvidenceReceipt {
    wall: { cycle: Quantiles; detailsRender: Quantiles };
    outliers: Array<{ ms: number }>;
  }
  const evidenceRun = runEvidenceRetainedBench as (input: {
    Projection: typeof ObservationProjection;
    EvidenceStore: typeof EvidenceStore;
    inspector: Inspector;
    fixture: Fixture;
    host: Host;
    limits: Record<string, number>;
  }) => Promise<EvidenceReceipt>;

  it("holds the details render clock at the layout ramp and each cycle wall at the sum of its renders' ramp", async () => {
    const render = new Ramp(500, 1_000);
    const receipt = await evidenceRun({
      Projection: ObservationProjection,
      EvidenceStore,
      inspector: rampedLayout(render),
      fixture: build({ seed: 9, nodes: 120, depth: 5, ticks: 20 }),
      host: HOST,
      limits: { cycles: 12, warmupCycles: 4, sampleEvery: 4, payloadBytes: 262_144, maxEntries: 4, maxBytes: 4_096, timeoutMs: 5_000, controlBytes: 4_194_304 },
    });
    const { cycle, detailsRender } = receipt.wall;
    const perCycle = detailsRender.samples / cycle.samples;
    expect(perCycle).toBe(3);
    expect(render.calls).toBe(detailsRender.samples);
    // Render i is layout call i; cycle c wraps exactly layout calls perCycle * c .. perCycle * c + perCycle - 1.
    expectRankFloors("wall.detailsRender", detailsRender, i => render.at(i));
    const cycleFloor = (c: number): number => Array.from({ length: perCycle }, (_, r) => render.at(perCycle * c + r)).reduce((sum, ms) => sum + ms, 0);
    expectRankFloors("wall.cycle", cycle, cycleFloor);
    for (const [i, sample] of receipt.outliers.entries()) expectSpan(`outliers[${i}]`, sample.ms, cycleFloor(cycle.samples - 1 - i));
  }, 120_000);
});
