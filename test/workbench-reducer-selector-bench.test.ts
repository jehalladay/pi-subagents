/** W21 (wb-9x5.4): reducer-update and UI selector time receipt under live churn on the grouped-10k fixture.
 * Measurement-only: the bench drives compiled dist/ over the wb-9x5.1 fixture, and no production cap moves.
 * This guard checks receipt completeness, determinism of the measured path, the fold falsifier, the exit
 * semantics, and that src/ stays untouched. It never asserts a measured latency value.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  SCOPE,
} from "../qa/workbench/grouped-fixture.mjs";
import {
  assessReducerSelectorReceipt,
  BANDS,
  distribution,
  FOLD_THRESHOLD_EVENTS,
  publishReceipt,
  REDRAW_CAP_LABEL,
  REDRAW_MAX_HZ,
  REDUCER_SELECTOR_CONTRACT,
  runReducerSelectorBench,
  SELECTOR_TARGET_MS,
  VIEW_NAMES,
} from "../qa/workbench/reducer-selector-bench.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { type ObservationEvent, ObservationProjection } from "../src/workbench/observation.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Band {
  label: string;
  minChanges: number;
  maxChanges: number;
  ticks: number;
  updates: number;
  reducer: Distribution;
  selectors: Record<string, Distribution>;
  redraws: number;
}
interface Receipt {
  contract: string;
  benchmark: string;
  measured: boolean;
  utc: string;
  revision: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  toolchain: Record<string, string>;
  command: string;
  fixture: Record<string, unknown> & { updates: number; ticks: number };
  limits: Record<string, number>;
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; events: number; edges: number };
  apply: { ingestApplied: number; ingestDuplicate: number; ingestOutOfOrder: number };
  reducer: { all: Distribution; firstTenth: Distribution; lastTenth: Distribution; growthRatio: number | null; judged: boolean };
  bands: Band[];
  exactChurn: Band[];
  selectors: Record<string, Distribution>;
  folds: {
    redraws: number;
    layoutCalls: number;
    readCalls: Record<string, number>;
    ingestCalls: number;
    maxTouchedPerRedraw: number;
    maxEventsRequested: number;
    fullFoldRedraws: number;
    threshold: number;
  };
  cadence: {
    capHz: number;
    minIntervalMs: number;
    ticks: number;
    redraws: number;
    skipped: number;
    fixtureSpanMs: number;
    effectiveHz: number;
    maxRedrawsInOneSecond: number;
    minTickIntervalMs: number | null;
    capBound: boolean;
    capBinding: string;
    capLabel: string;
  };
  outliers: { reducer: unknown[]; selector: unknown[] };
  bounds: { selectorTargetMs: number; redrawMaxHz: number; foldThresholdEvents: number };
  realised: boolean;
  violations: Array<{ rule: string; detail: string }>;
  over: string[];
  pass: boolean;
  verdict: string;
  exitCode: number;
}
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
interface Host {
  utc: string;
  revision: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  toolchain: Record<string, string>;
  command: string;
}
interface GroupedFixture {
  snapshots: unknown[];
  relations: unknown[];
  updates: ObservationEvent[];
  shape: Record<string, unknown>;
}

const run = runReducerSelectorBench as (input: {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  fixture: GroupedFixture;
  host: Host;
}) => Receipt;
const assess = assessReducerSelectorReceipt as (receipt: Receipt) => {
  realised: boolean;
  violations: Array<{ rule: string; detail: string }>;
  over: string[];
  pass: boolean;
  exitCode: number;
};
const build = buildGroupedFixture as (options?: { seed: number; nodes: number; depth: number; ticks: number }) => GroupedFixture;
const shapeOf = assessFixtureShape as (shape: Record<string, unknown>) => { realised: boolean };

const inspector: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };
const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-reducer-selector-bench.test.ts",
};
const VIEWS = ["overview", "graph", "timeline", "details"];
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const clone = (receipt: Receipt): Receipt => structuredClone(receipt);

const finite = (value: Distribution): boolean =>
  value.samples > 0 &&
  [value.p50, value.p95, value.max].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0) &&
  (value.p50 ?? 0) <= (value.p95 ?? 0) &&
  (value.p95 ?? 0) <= (value.max ?? 0);

let cached: { receipt: Receipt; constructed: unknown[][] } | undefined;
const smallRun = () => {
  if (cached) return cached;
  const constructed: unknown[][] = [];
  class SpyProjection extends ObservationProjection {
    constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
      super(...args);
      constructed.push(args);
    }
  }
  const fixture = build({ seed: 9, nodes: 900, depth: 5, ticks: 140 });
  cached = { receipt: run({ Projection: SpyProjection, inspector, fixture, host: HOST }), constructed };
  return cached;
};

/** A receipt that is the W21 claim, measured and under target, derived from the real small run. */
const realisedReceipt = (): Receipt => {
  const receipt = clone(smallRun().receipt);
  receipt.fixture = {
    ...receipt.fixture,
    nodes: 10_000,
    depth: 5,
    minDepth: 5,
    groupingEdges: 12_000,
    dependencyEdges: 1_400,
    hypothesisEdges: 700,
    ownershipEdges: 0,
    updates: 101_000,
    ticks: 2_000,
    minChangesPerTick: 1,
    maxChangesPerTick: 100,
  };
  receipt.offered = { ...receipt.offered, updates: 101_000 };
  receipt.apply = { ...receipt.apply, ingestApplied: 101_000, ingestDuplicate: 0, ingestOutOfOrder: 0 };
  receipt.retained = { ...receipt.retained, nodes: receipt.offered.nodes, edges: receipt.offered.edges };
  const quick: Distribution = { samples: 50, p50: 0.1, p95: 0.2, max: 0.3 };
  for (const band of [...receipt.bands, ...receipt.exactChurn]) {
    band.reducer = { ...quick };
    for (const view of VIEWS) band.selectors[view] = { ...quick };
  }
  for (const view of VIEWS) receipt.selectors[view] = { ...quick };
  receipt.folds = { ...receipt.folds, fullFoldRedraws: 0, maxEventsRequested: 40, maxTouchedPerRedraw: 400 };
  receipt.cadence = { ...receipt.cadence, redraws: 2_000, maxRedrawsInOneSecond: 1 };
  return receipt;
};

describe("W21 reducer/selector receipt: contract and completeness (C1, C4)", () => {
  it("names the frozen contract and states every bound as an exported constant", () => {
    expect(REDUCER_SELECTOR_CONTRACT).toBe("workbench.reducer-selector/v1");
    expect(REDRAW_MAX_HZ).toBe(4);
    expect(SELECTOR_TARGET_MS).toBe(NAVIGATION_TARGET_MS);
    expect(FOLD_THRESHOLD_EVENTS).toBe(100_000);
    expect(VIEW_NAMES).toEqual(VIEWS);
    expect(BANDS.map((band: { label: string }) => band.label)).toEqual(["1", "10", "100"]);
  });

  it("covers churn 1..100 with disjoint bands labelled 1, 10 and 100", () => {
    const bands = BANDS as Array<{ label: string; min: number; max: number }>;
    expect(bands[0].min).toBe(1);
    expect(bands[bands.length - 1].max).toBe(100);
    for (let i = 1; i < bands.length; i++) expect(bands[i].min).toBe(bands[i - 1].max + 1);
    for (const nominal of [1, 10, 100]) {
      const home = bands.filter(band => band.min <= nominal && nominal <= band.max);
      expect(home.map(band => band.label)).toEqual([String(nominal)]);
    }
  });

  it("emits host, toolchain, fixture shape, limits and every per-band latency", () => {
    const { receipt } = smallRun();
    expect(receipt.contract).toBe("workbench.reducer-selector/v1");
    expect(receipt.measured).toBe(true);
    for (const key of ["utc", "revision", "node", "arch", "platform", "cpuModel", "command"] as const) {
      expect(typeof receipt[key]).toBe("string");
      expect(receipt[key].length).toBeGreaterThan(0);
    }
    expect(receipt.cpus).toBeGreaterThan(0);
    expect(Object.keys(receipt.toolchain).sort()).toEqual(["node", "piTui", "typescript"]);
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.fixture.updates).toBeGreaterThan(0);
    expect(receipt.bands.map(band => band.label)).toEqual(["1", "10", "100"]);
    for (const band of receipt.bands) {
      expect(band.ticks).toBeGreaterThan(0);
      expect(band.updates).toBeGreaterThanOrEqual(band.ticks * band.minChanges);
      expect(band.updates).toBeLessThanOrEqual(band.ticks * band.maxChanges);
      expect(finite(band.reducer)).toBe(true);
      expect(band.reducer.samples).toBe(band.updates);
      expect(Object.keys(band.selectors)).toEqual(VIEWS);
      for (const view of VIEWS) {
        expect(finite(band.selectors[view])).toBe(true);
        expect(band.selectors[view].samples).toBe(band.redraws);
      }
    }
    expect(receipt.exactChurn.map(band => [band.minChanges, band.maxChanges])).toEqual([
      [1, 1],
      [10, 10],
      [100, 100],
    ]);
    for (const band of receipt.exactChurn) expect(band.ticks).toBeGreaterThan(0);
    expect(finite(receipt.reducer.all)).toBe(true);
    expect(receipt.reducer.all.samples).toBe(receipt.apply.ingestApplied);
    expect(receipt.reducer.judged).toBe(false);
    expect(Object.keys(receipt.selectors)).toEqual(VIEWS);
    for (const view of VIEWS) expect(finite(receipt.selectors[view])).toBe(true);
    expect(receipt.bounds).toEqual({ selectorTargetMs: 20, redrawMaxHz: 4, foldThresholdEvents: 100_000 });
    expect(receipt.outliers.reducer.length).toBeGreaterThan(0);
    expect(receipt.outliers.selector.length).toBeGreaterThan(0);
  }, 120_000);

  it("constructs the projection exactly once, with exactly the bench-only limits", () => {
    expect(smallRun().constructed).toEqual([[{ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 }]]);
  }, 120_000);

  it("applies every update through the reducer and truncates nothing, and flags a small fixture as not W21", () => {
    const { receipt } = smallRun();
    expect(receipt.apply.ingestApplied).toBe(receipt.offered.updates);
    expect(receipt.apply.ingestDuplicate).toBe(0);
    expect(receipt.apply.ingestOutOfOrder).toBe(0);
    expect(receipt.retained.nodes).toBe(receipt.offered.nodes);
    expect(receipt.retained.edges).toBe(receipt.offered.edges);
    expect(receipt.realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
    expect(receipt.violations.map(violation => violation.rule)).toContain("updates-below-100000");
  }, 120_000);
});

describe("W21 fold falsifier and redraw cadence (C2)", () => {
  it("accounts reducer calls and bounded reads, and records no full fold per redraw", () => {
    const { receipt } = smallRun();
    expect(receipt.folds.ingestCalls).toBe(receipt.offered.updates);
    expect(receipt.folds.redraws).toBe(receipt.cadence.redraws);
    expect(receipt.folds.layoutCalls).toBe(receipt.folds.redraws * VIEWS.length);
    expect(receipt.folds.readCalls.window).toBeGreaterThan(0);
    expect(receipt.folds.threshold).toBe(100_000);
    expect(receipt.folds.fullFoldRedraws).toBe(0);
    expect(receipt.folds.maxTouchedPerRedraw).toBeLessThan(receipt.folds.threshold);
    expect(receipt.folds.maxEventsRequested).toBeLessThan(receipt.folds.threshold);
  }, 120_000);

  it("keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock", () => {
    const { cadence } = smallRun().receipt;
    expect(cadence.capHz).toBe(4);
    expect(cadence.minIntervalMs).toBe(250);
    expect(cadence.redraws).toBeGreaterThan(0);
    expect(cadence.maxRedrawsInOneSecond).toBeLessThanOrEqual(4);
    expect(cadence.effectiveHz).toBeLessThanOrEqual(4);
    expect(cadence.fixtureSpanMs).toBeGreaterThan(0);
  }, 120_000);

  it("records a full fold per redraw as a finding with exit 1, never tuned away", () => {
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 6 });
    const folding: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        model.projection.events({ scope: SCOPE, limit: 100_000 });
        return layoutInspector(model, state, size);
      },
    };
    const receipt = run({ Projection: ObservationProjection, inspector: folding, fixture, host: HOST });
    expect(receipt.folds.fullFoldRedraws).toBe(receipt.folds.redraws);
    expect(receipt.folds.maxEventsRequested).toBeGreaterThanOrEqual(100_000);
    expect(receipt.over).toContain("full-fold-per-redraw");
  }, 60_000);

  it("counts rows examined by a query toward the same falsifier", () => {
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 4 });
    class ScanningProjection extends ObservationProjection {
      override query(filter: Parameters<ObservationProjection["query"]>[0]) {
        return { ...super.query(filter), examined: 100_000 };
      }
    }
    const scanning: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        model.projection.query({ scope: SCOPE, limit: 5 });
        return layoutInspector(model, state, size);
      },
    };
    const receipt = run({ Projection: ScanningProjection, inspector: scanning, fixture, host: HOST });
    expect(receipt.folds.fullFoldRedraws).toBe(receipt.folds.redraws);
  }, 60_000);
});

describe("W21 reducer/selector exit semantics (C2, C3, C4)", () => {
  it("exits 0 only for a realised W21 receipt with every judged series under target", () => {
    const receipt = realisedReceipt();
    expect(shapeOf(receipt.fixture).realised).toBe(true);
    const verdict = assess(receipt);
    expect(verdict.violations).toEqual([]);
    expect(verdict.over).toEqual([]);
    expect(verdict.exitCode).toBe(0);
    expect(verdict.pass).toBe(true);
  }, 120_000);

  it("exits 1 and names the series when a selector p95 is over 20 ms, and never judges the reducer", () => {
    const receipt = realisedReceipt();
    receipt.bands[2].selectors.graph.p95 = 20.5;
    receipt.bands[2].selectors.graph.max = 21;
    const verdict = assess(receipt);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.over).toEqual(["selector:band-100:graph"]);
    const slowReducer = realisedReceipt();
    slowReducer.bands[0].reducer = { samples: 50, p50: 90, p95: 95, max: 99 };
    expect(assess(slowReducer).exitCode).toBe(0);
  }, 120_000);

  it("exits 1 for a redraw cadence above 4 Hz or a full fold, and 2 beats 1", () => {
    const fast = realisedReceipt();
    fast.cadence.maxRedrawsInOneSecond = 5;
    expect(assess(fast).over).toEqual(["redraw-cadence-over-4hz"]);
    expect(assess(fast).exitCode).toBe(1);
    const folded = realisedReceipt();
    folded.folds.fullFoldRedraws = 3;
    expect(assess(folded).over).toEqual(["full-fold-per-redraw"]);
    folded.fixture.updates = 99_999;
    expect(assess(folded).exitCode).toBe(2);
  }, 120_000);

  it("exits 2 for a wrong-shape fixture, a truncated projection, unapplied updates or an unsampled series", () => {
    const shape = realisedReceipt();
    shape.fixture.updates = 99_999;
    expect(assess(shape).violations.map(violation => violation.rule)).toContain("updates-below-100000");
    expect(assess(shape).exitCode).toBe(2);
    const truncated = realisedReceipt();
    truncated.retained.nodes -= 1;
    expect(assess(truncated).violations.map(violation => violation.rule)).toContain("projection-truncated");
    const unapplied = realisedReceipt();
    unapplied.apply.ingestOutOfOrder = 1;
    unapplied.apply.ingestApplied -= 1;
    expect(assess(unapplied).violations.map(violation => violation.rule)).toContain("updates-not-applied");
    const unsampled = realisedReceipt();
    unsampled.bands[1].selectors.timeline = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled).violations.map(violation => violation.rule)).toContain("series-not-sampled");
    expect(assess(unsampled).exitCode).toBe(2);
    const idle = realisedReceipt();
    idle.cadence.redraws = 0;
    expect(assess(idle).violations.map(violation => violation.rule)).toContain("no-redraws");
  }, 120_000);

  it("recomputes the verdict from the measured fields, ignoring any stored verdict", () => {
    const receipt = realisedReceipt();
    receipt.exitCode = 0;
    receipt.pass = true;
    receipt.bands[1].selectors.overview.p95 = 50;
    expect(assess(receipt).exitCode).toBe(1);
  }, 120_000);
});

describe("W21 reducer/selector determinism and fixture reuse (C5)", () => {
  it("repeats every non-timing field of the receipt exactly", () => {
    const fixture = build({ seed: 4, nodes: 300, depth: 5, ticks: 110 });
    const a = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    const b = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    const stable = (receipt: Receipt) => ({
      fixture: receipt.fixture,
      offered: receipt.offered,
      retained: receipt.retained,
      apply: receipt.apply,
      bands: receipt.bands.map(({ label, ticks, updates, redraws }) => ({ label, ticks, updates, redraws })),
      exact: receipt.exactChurn.map(({ ticks, updates, redraws }) => ({ ticks, updates, redraws })),
      folds: receipt.folds,
      cadence: { ...receipt.cadence },
    });
    expect(stable(b)).toEqual(stable(a));
  }, 120_000);

  it("reads no wall clock and draws no randomness anywhere in the module", () => {
    const text = readRepo("qa/workbench/reducer-selector-bench.mjs");
    expect(text).not.toMatch(/Date\.now|Math\.random|crypto\.random/);
    const calls = [...text.matchAll(/new Date\(\s*\)/g)];
    expect(calls.length).toBeLessThanOrEqual(1);
    for (const call of calls) expect(call.index).toBeGreaterThan(text.indexOf("async function main"));
  });

  it("reuses the grouped fixture builder and forks no second fixture or limits literal", () => {
    const text = readRepo("qa/workbench/reducer-selector-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(["./bench-revision.mjs", "./grouped-fixture.mjs", "node:fs", "node:os", "node:url"].sort());
    expect(text).toMatch(/buildGroupedFixture/);
    expect(text).toMatch(/BENCH_ONLY_LIMITS/);
    expect(text).not.toMatch(/function\s+(?:buildGroupedFixture|seeded|mulberry32)\b|maxNodes|maxEdges/);
    const dynamic = [...text.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]/g)].map(match => match[1]).sort();
    expect(dynamic).toEqual(["../../dist/ui/workflow-inspector.js", "../../dist/workbench/observation.js"]);
    expect(text).not.toMatch(/\brequire\s*\(/);
  });

  it("prints the receipt, writes it when asked, and sets the exit code only after both", () => {
    const text = readRepo("qa/workbench/reducer-selector-bench.mjs");
    expect(text).toMatch(/W21_REDUCER_RECEIPT/);
    // One-liner batch item (5), bound onto wb-9x5.15 by name: the receipt line is printed BEFORE the file write
    // (the write-before-print order this pin held at trunk :384 flips here, in the same commit as the behaviour).
    const printed = text.indexOf("log(line);");
    const written = text.indexOf("writeFile(path, ");
    const exit = text.indexOf("process.exitCode = publishReceipt(receipt, {path: process.env.W21_REDUCER_RECEIPT});");
    expect(printed).toBeGreaterThan(-1);
    expect(written).toBeGreaterThan(printed);
    expect(exit).toBeGreaterThan(written);
    expect(text).not.toMatch(/writeFileSync\s*\(/);
  });

  it("leaves the existing bench, the fixture semantics and the perf test files as they were", () => {
    const fixtureText = readRepo("qa/workbench/grouped-fixture.mjs");
    expect(fixtureText).toMatch(/export function buildGroupedFixture\(options = \{\}\)/);
    expect(fixtureText).toMatch(/export const BENCH_ONLY_LIMITS = Object\.freeze\(\{maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40\}\)/);
  });
});

describe("W21 production caps and Forge registration (C3, C6)", () => {
  it("keeps the default caps and lets no src/ file name the bench or its limits", () => {
    const projection = new ObservationProjection();
    expect(projection.stats()).toEqual({ nodes: 0, events: 0, edges: 0 });
    const root = new URL("../src/", import.meta.url);
    const named: string[] = [];
    for (const entry of readdirSync(root, { recursive: true })) {
      const file = String(entry);
      if (!file.endsWith(".ts")) continue;
      const text = readFileSync(join(root.pathname, file), "utf8");
      if (/reducer-selector|BENCH_ONLY_LIMITS|workbench\.reducer-selector/.test(text)) named.push(file);
      for (const match of text.matchAll(/\bmax(Nodes|Edges)\s*:\s*([\d_]+)/g)) {
        const value = Number(match[2].replaceAll("_", ""));
        if ((match[1] === "Nodes" && value > 2_000) || (match[1] === "Edges" && value > 4_000)) named.push(`${file}: ${match[0]}`);
      }
    }
    expect(named).toEqual([]);
  });

  it("registers reducer-selector-bench as a Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.reducer-selector-bench\]\ncommand = "node qa\/workbench\/reducer-selector-bench\.mjs"\ntimeout = 300\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/reducer-selector/);
  });
});

/** Rewrites each fixture tick's observedAt so consecutive ticks are exactly `intervalMs` apart (order preserved). */
const retimed = (fixture: GroupedFixture, intervalMs: number): GroupedFixture => {
  const base = Date.parse(fixture.updates[0].observedAt);
  const tickOf = new Map<string, number>();
  for (const update of fixture.updates) if (!tickOf.has(update.observedAt)) tickOf.set(update.observedAt, tickOf.size);
  return {
    ...fixture,
    updates: fixture.updates.map(update => ({
      ...update,
      observedAt: new Date(base + (tickOf.get(update.observedAt) ?? 0) * intervalMs).toISOString(),
    })),
  };
};
const LABEL = "redraw cap never binds on 1s fixture ticks; the product's live redraw scheduler is not measured";

describe("W21-D2 redraw-cap honesty: label and bound versus unbound cadence (wb-9x5.15, kills K1/K2)", () => {
  it("states the verbatim label on the receipt and exports it as one constant", () => {
    expect(REDRAW_CAP_LABEL).toBe(LABEL);
    expect(smallRun().receipt.cadence.capLabel).toBe(LABEL);
  }, 120_000);

  it("records the 1 s fixture cadence as unbound: nothing skipped, one redraw per tick", () => {
    const { cadence } = smallRun().receipt;
    expect(cadence.minTickIntervalMs).toBe(1_000);
    expect(cadence.skipped).toBe(0);
    expect(cadence.redraws).toBe(cadence.ticks);
    expect(cadence.capBound).toBe(false);
    expect(cadence.capBinding).toBe("unbound");
  }, 120_000);

  it("binds the 4 Hz cap on sub-250 ms ticks and says so", () => {
    const fixture = retimed(build({ seed: 3, nodes: 200, depth: 5, ticks: 40 }), 100);
    const { cadence } = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    expect(cadence.minTickIntervalMs).toBe(100);
    expect(cadence.capBound).toBe(true);
    expect(cadence.capBinding).toBe("bound");
    expect(cadence.skipped).toBeGreaterThan(0);
    expect(cadence.redraws).toBeLessThan(cadence.ticks);
    expect(cadence.redraws + cadence.skipped).toBe(cadence.ticks);
    expect(cadence.maxRedrawsInOneSecond).toBe(4);
    expect(cadence.effectiveHz).toBeLessThanOrEqual(4);
    expect(cadence.capLabel).toBe(LABEL);
  }, 60_000);

  it("redraws at most every third 100 ms tick, so a 40-tick stream draws exactly 14 times", () => {
    const fixture = retimed(build({ seed: 3, nodes: 200, depth: 5, ticks: 40 }), 100);
    const { cadence } = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    expect(cadence.ticks).toBe(40);
    expect(cadence.redraws).toBe(14);
    expect(cadence.skipped).toBe(26);
  }, 60_000);

  it("treats exactly 250 ms as unbound and 249 ms as bound", () => {
    const at250 = run({
      Projection: ObservationProjection,
      inspector,
      fixture: retimed(build({ seed: 3, nodes: 200, depth: 5, ticks: 20 }), 250),
      host: HOST,
    }).cadence;
    expect(at250.skipped).toBe(0);
    expect(at250.capBound).toBe(false);
    expect(at250.maxRedrawsInOneSecond).toBe(4);
    const at249 = run({
      Projection: ObservationProjection,
      inspector,
      fixture: retimed(build({ seed: 3, nodes: 200, depth: 5, ticks: 20 }), 249),
      host: HOST,
    }).cadence;
    expect(at249.skipped).toBeGreaterThan(0);
    expect(at249.capBound).toBe(true);
    expect(at249.capBinding).toBe("bound");
  }, 60_000);
});

const EXPECTED_READ_METHODS = ["window", "query", "events", "relations", "aggregate", "indexOf", "relationRevision", "stats"] as const;
type ReadMethod = (typeof EXPECTED_READ_METHODS)[number];

describe("W21-D2 counted read methods: one guard case per method (wb-9x5.15, kills K3/K4)", () => {
  /** An inspector whose only projection read is `method`, called once per layout; returns what that call touched. */
  const probe = (method: ReadMethod) => {
    const seen: number[] = [];
    const stub: Inspector = {
      ...inspector,
      layoutInspector: (model) => {
        const projection = model.projection;
        if (method === "window") seen.push(projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 3 }).nodes.length);
        if (method === "query") seen.push(projection.query({ scope: SCOPE, limit: 5 }).examined);
        if (method === "events") seen.push(projection.events({ scope: SCOPE, limit: 7 }).events.length);
        if (method === "relations") seen.push(projection.relations({ scope: SCOPE, limit: 5 }).length);
        if (method === "aggregate") {
          projection.aggregate({ scope: SCOPE, key: "no-such-key" });
          seen.push(0);
        }
        if (method === "indexOf") {
          projection.indexOf({ scope: SCOPE, invocationId: INVOCATION_ID, key: "no-such-key" });
          seen.push(0);
        }
        if (method === "relationRevision") {
          projection.relationRevision();
          seen.push(0);
        }
        if (method === "stats") {
          projection.stats();
          seen.push(0);
        }
        return undefined as never;
      },
    };
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 4 });
    const receipt = run({ Projection: ObservationProjection, inspector: stub, fixture, host: HOST });
    return { receipt, seen };
  };

  it("lists the eight counted methods and nothing else in the instrumentation", () => {
    const text = readRepo("qa/workbench/reducer-selector-bench.mjs");
    const listed = /const READ_METHODS = Object\.freeze\(\[([^\]]*)\]\)/.exec(text)?.[1] ?? "";
    expect([...listed.matchAll(/'([A-Za-z]+)'/g)].map(match => match[1])).toEqual([...EXPECTED_READ_METHODS]);
  });

  for (const method of EXPECTED_READ_METHODS) {
    it(`counts ${method} once per layout call and no other read method`, () => {
      const { receipt, seen } = probe(method);
      expect(receipt.folds.layoutCalls).toBeGreaterThan(0);
      expect(seen.length).toBe(receipt.folds.layoutCalls);
      expect(receipt.folds.readCalls[method]).toBe(receipt.folds.layoutCalls);
      expect(Object.keys(receipt.folds.readCalls)).toEqual([method]);
    }, 60_000);
  }

  for (const method of ["window", "query", "events", "relations"] as const) {
    it(`counts the rows ${method} touched toward the fold falsifier, per redraw`, () => {
      const { receipt, seen } = probe(method);
      expect(seen.every(value => value > 0)).toBe(true);
      const perCall = seen[0];
      expect(receipt.folds.maxTouchedPerRedraw).toBe(perCall * VIEWS.length);
    }, 60_000);
  }

  for (const method of ["aggregate", "indexOf", "relationRevision", "stats"] as const) {
    it(`counts ${method} calls but treats them as touching no rows`, () => {
      const { receipt } = probe(method);
      expect(receipt.folds.maxTouchedPerRedraw).toBe(0);
      expect(receipt.folds.fullFoldRedraws).toBe(0);
    }, 60_000);
  }

  it("records the largest events page requested only for the events method", () => {
    expect(probe("events").receipt.folds.maxEventsRequested).toBe(7);
    expect(probe("window").receipt.folds.maxEventsRequested).toBe(0);
  }, 60_000);
});

describe("W21-D2 timed distributions: positivity and honest emptiness (wb-9x5.15, kills K5; K12/K14 die under the known-duration stubs below)", () => {
  const timed = (receipt: Receipt): Array<[string, Distribution]> => [
    ["reducer.all", receipt.reducer.all],
    ["reducer.firstTenth", receipt.reducer.firstTenth],
    ["reducer.lastTenth", receipt.reducer.lastTenth],
    ...[...receipt.bands, ...receipt.exactChurn].flatMap((band): Array<[string, Distribution]> => [
      [`reducer:${band.label}`, band.reducer],
      ...VIEWS.map((view): [string, Distribution] => [`selector:${band.label}:${view}`, band.selectors[view]]),
    ]),
    ...VIEWS.map((view): [string, Distribution] => [`selector:all:${view}`, receipt.selectors[view]]),
  ];

  it("measures every non-empty timed distribution strictly positive in p50, p95 and max", () => {
    for (const [name, value] of timed(smallRun().receipt)) {
      expect(value.samples, name).toBeGreaterThan(0);
      expect(value.p50, `${name} p50`).toBeGreaterThan(0);
      expect(value.p95, `${name} p95`).toBeGreaterThan(0);
      expect(value.max, `${name} max`).toBeGreaterThan(0);
    }
  }, 120_000);

  it("labels an empty series unmeasured with null quantiles, never zero", () => {
    const empty = (distribution as (values: number[]) => Record<string, unknown>)([]);
    expect(empty).toEqual({ samples: 0, p50: null, p95: null, max: null, unmeasured: true });
    const filled = (distribution as (values: number[]) => Record<string, unknown>)([0.5, 0.25, 1]);
    expect(filled).toEqual({ samples: 3, p50: 0.5, p95: 1, max: 1 });
    expect("unmeasured" in filled).toBe(false);
  });

  for (const field of ["p50", "p95", "max"] as const) {
    for (const bad of [0, -0.001]) {
      it(`exits 2 naming the series when a non-empty selector ${field} is ${bad}`, () => {
        const receipt = realisedReceipt();
        receipt.bands[1].selectors.timeline = { samples: 50, p50: 0.1, p95: 0.2, max: 0.3, [field]: bad };
        const verdict = assess(receipt);
        expect(verdict.exitCode).toBe(2);
        expect(verdict.violations.map(violation => violation.rule)).toContain("timing-not-positive");
        expect(verdict.violations.find(violation => violation.rule === "timing-not-positive")?.detail).toContain("selector:band-10:timeline");
      });
    }
  }

  it("exits 2 for a non-positive reducer distribution, per band and overall", () => {
    const band = realisedReceipt();
    band.exactChurn[2].reducer = { samples: 50, p50: 0, p95: 0.2, max: 0.3 };
    expect(assess(band).exitCode).toBe(2);
    expect(assess(band).violations.find(violation => violation.rule === "timing-not-positive")?.detail).toContain("reducer:churn-100");
    const overall = realisedReceipt();
    overall.reducer.all = { samples: 50, p50: 0.1, p95: 0.2, max: 0 };
    expect(assess(overall).exitCode).toBe(2);
    expect(assess(overall).violations.find(violation => violation.rule === "timing-not-positive")?.detail).toContain("reducer:all");
    const aggregate = realisedReceipt();
    aggregate.selectors.graph = { samples: 50, p50: 0, p95: 0.2, max: 0.3 };
    expect(assess(aggregate).violations.find(violation => violation.rule === "timing-not-positive")?.detail).toContain("selector:all:graph");
  });

  it("does not call an empty series non-positive: it is unsampled, and the overall reducer series is checked for emptiness too", () => {
    const empty = realisedReceipt();
    empty.reducer.all = { samples: 0, p50: null, p95: null, max: null };
    const verdict = assess(empty);
    expect(verdict.exitCode).toBe(2);
    expect(verdict.violations.map(violation => violation.rule)).toContain("series-not-sampled");
    expect(verdict.violations.map(violation => violation.rule)).not.toContain("timing-not-positive");
  });

  it("keeps a clean realised receipt at exit 0", () => {
    expect(assess(realisedReceipt()).exitCode).toBe(0);
  }, 120_000);
});

/**
 * Busy-waits at least `ms` on the monotonic clock. A known-duration stub: any clock that wraps the stubbed call must
 * measure at least this long on any host load, so the asserted bound is the stub's own duration, never a latency target.
 */
const spin = (ms: number): void => {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // busy-wait: the measured span must contain this whole loop
  }
};
const KNOWN_FIXTURE = { seed: 3, nodes: 200, depth: 5, ticks: 4 };
const bandName = (band: Band): string => `${band.minChanges}-${band.maxChanges}`;

describe("W21-D2 known-duration falsifiers: each clock wraps exactly the timed call (wb-9x5.15 respin, kills K12/K14)", () => {
  it("P1: times layoutInspector inside the selector clock, so a 1 ms layout stub puts every view's selector p50 at >= 1 ms", () => {
    const slowLayout: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        spin(1);
        return layoutInspector(model, state, size);
      },
    };
    const receipt = run({ Projection: ObservationProjection, inspector: slowLayout, fixture: build(KNOWN_FIXTURE), host: HOST });
    expect(receipt.folds.redraws).toBeGreaterThan(0);
    expect(receipt.folds.layoutCalls).toBe(receipt.folds.redraws * VIEWS.length);
    for (const view of VIEWS) {
      expect(receipt.selectors[view].samples, view).toBe(receipt.folds.redraws);
      expect(receipt.selectors[view].p50, `selector:all:${view} p50`).toBeGreaterThanOrEqual(1);
    }
    for (const band of [...receipt.bands, ...receipt.exactChurn].filter(band => band.redraws > 0)) {
      for (const view of VIEWS) expect(band.selectors[view].p50, `selector:${bandName(band)}:${view} p50`).toBeGreaterThanOrEqual(1);
    }
  }, 60_000);

  it("P2: times ingest inside the reducer clock, so a 0.2 ms ingest stub puts reducer.all p50 at >= 0.2 ms", () => {
    class SlowIngestProjection extends ObservationProjection {
      override ingest(event: ObservationEvent): ReturnType<ObservationProjection["ingest"]> {
        spin(0.2);
        return super.ingest(event);
      }
    }
    const receipt = run({ Projection: SlowIngestProjection, inspector, fixture: build(KNOWN_FIXTURE), host: HOST });
    expect(receipt.apply.ingestApplied).toBe(receipt.offered.updates);
    expect(receipt.reducer.all.samples).toBe(receipt.offered.updates);
    expect(receipt.reducer.all.p50, "reducer.all p50").toBeGreaterThanOrEqual(0.2);
    expect(receipt.reducer.firstTenth.p50, "reducer.firstTenth p50").toBeGreaterThanOrEqual(0.2);
    expect(receipt.reducer.lastTenth.p50, "reducer.lastTenth p50").toBeGreaterThanOrEqual(0.2);
    for (const band of [...receipt.bands, ...receipt.exactChurn].filter(band => band.updates > 0)) {
      expect(band.reducer.p50, `reducer:${bandName(band)} p50`).toBeGreaterThanOrEqual(0.2);
    }
  }, 60_000);
});

/** Rewrites each fixture tick's observedAt so tick n + 1 lands `gaps[n]` ms after tick n: non-uniform spacing, order kept. */
const respaced = (fixture: GroupedFixture, gaps: readonly number[]): GroupedFixture => {
  const base = Date.parse(fixture.updates[0].observedAt);
  const tickOf = new Map<string, number>();
  for (const update of fixture.updates) if (!tickOf.has(update.observedAt)) tickOf.set(update.observedAt, tickOf.size);
  if (tickOf.size !== gaps.length + 1) throw new RangeError(`${tickOf.size} ticks need ${tickOf.size - 1} gaps, got ${gaps.length}`);
  const offsets = [0];
  for (const gap of gaps) offsets.push(offsets[offsets.length - 1] + gap);
  return {
    ...fixture,
    updates: fixture.updates.map(update => ({
      ...update,
      observedAt: new Date(base + offsets[tickOf.get(update.observedAt) ?? 0]).toISOString(),
    })),
  };
};

describe("W21-D2 respin folds: tenths positivity and non-uniform cadence (wb-9x5.15 respin O1/O2/O3, kills N13/N14/N3/N4)", () => {
  for (const tenth of ["firstTenth", "lastTenth"] as const) {
    it(`O1: exits 2 naming reducer:${tenth} when its non-empty p50 is 0`, () => {
      const receipt = realisedReceipt();
      receipt.reducer[tenth] = { samples: 50, p50: 0, p95: 0.2, max: 0.3 };
      const verdict = assess(receipt);
      expect(verdict.exitCode).toBe(2);
      expect(verdict.violations.find(violation => violation.rule === "timing-not-positive")?.detail).toContain(`reducer:${tenth}`);
    }, 120_000);
  }

  it("O2/O3: binds on exactly one skipped tick and reports the smallest gap of a non-uniformly spaced stream", () => {
    const fixture = respaced(build(KNOWN_FIXTURE), [1_000, 100, 1_000]);
    const { cadence } = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    expect(cadence.ticks).toBe(4);
    expect(cadence.skipped).toBe(1);
    expect(cadence.redraws).toBe(3);
    expect(cadence.capBound).toBe(true);
    expect(cadence.capBinding).toBe("bound");
    expect(cadence.minTickIntervalMs).toBe(100);
  }, 60_000);
});

interface PublishIo {
  path?: string;
  log?: (line: string) => void;
  logError?: (line: string) => void;
  writeFile?: (path: string, text: string) => void;
}
const publish = publishReceipt as (receipt: Receipt, io?: PublishIo) => number;

describe("W21 receipt publication: printed before the file write; a failed write exits 3 with the receipt on stdout (one-liner batch item (5), bound onto wb-9x5.15 by name)", () => {
  interface Published {
    kind: "log" | "error" | "write";
    text: string;
    path?: string;
  }
  const recorder = (failure?: Error) => {
    const events: Published[] = [];
    const io: Required<Omit<PublishIo, "path">> = {
      log: text => {
        events.push({ kind: "log", text });
      },
      logError: text => {
        events.push({ kind: "error", text });
      },
      writeFile: (path, text) => {
        if (failure) throw failure;
        events.push({ kind: "write", text, path });
      },
    };
    return { events, io };
  };
  const withStoredExit = (exitCode: number): Receipt => ({ ...realisedReceipt(), exitCode });

  it("prints the receipt line first, then writes the same line to the receipt file, then returns the receipt's own exit code", () => {
    const receipt = withStoredExit(1);
    const { events, io } = recorder();
    expect(publish(receipt, { ...io, path: "/var/tmp/reducer-receipt.json" })).toBe(1);
    const line = JSON.stringify(receipt);
    expect(events).toEqual([
      { kind: "log", text: line },
      { kind: "write", text: `${line}\n`, path: "/var/tmp/reducer-receipt.json" },
    ]);
  }, 120_000);

  it("prints and writes nothing when no receipt path is set", () => {
    const receipt = withStoredExit(0);
    const { events, io } = recorder();
    expect(publish(receipt, io)).toBe(0);
    expect(events).toEqual([{ kind: "log", text: JSON.stringify(receipt) }]);
  }, 120_000);

  for (const stored of [0, 1, 2]) {
    it(`exits 3, never the stored ${stored}, when the receipt write fails, with the receipt already printed and the failure on stderr`, () => {
      const receipt = withStoredExit(stored);
      const detail = "EACCES: permission denied, open '/nonexistent/receipt.json'";
      const { events, io } = recorder(new Error(detail));
      expect(publish(receipt, { ...io, path: "/nonexistent/receipt.json" })).toBe(3);
      expect(events.map(event => event.kind)).toEqual(["log", "error"]);
      expect(events[0].text).toBe(JSON.stringify(receipt));
      const diagnostic: unknown = JSON.parse(events[1].text);
      expect(diagnostic).toEqual({ benchmark: "reducer-selector-grouped-10k", error: "receipt-write-failed", path: "/nonexistent/receipt.json", detail });
    }, 120_000);
  }

  it("uses the real file writer by default: the file holds the printed line, and an unwritable path exits 3", () => {
    const directory = makeScratch("w21-rs-");
    try {
      const receipt = withStoredExit(0);
      const printed: string[] = [];
      const errors: string[] = [];
      const io = { log: (line: string) => printed.push(line), logError: (line: string) => errors.push(line) };
      const target = join(directory, "receipt.json");
      expect(publish(receipt, { ...io, path: target })).toBe(0);
      expect(printed).toEqual([JSON.stringify(receipt)]);
      expect(readFileSync(target, "utf8")).toBe(`${printed[0]}\n`);
      const unwritable = join(directory, "missing", "receipt.json");
      expect(publish(receipt, { ...io, path: unwritable })).toBe(3);
      expect(printed).toEqual([JSON.stringify(receipt), JSON.stringify(receipt)]);
      expect(errors).toHaveLength(1);
      const diagnostic: unknown = JSON.parse(errors[0]);
      expect(diagnostic).toMatchObject({ benchmark: "reducer-selector-grouped-10k", error: "receipt-write-failed", path: unwritable });
    } finally {
      removeScratch(directory);
    }
  }, 120_000);
});
