/** W21 (wb-9x5.8): terminal bytes-per-update line-diff receipt over the grouped-10k fixture under live churn.
 * Quote basis, docs/workbench/14-qa-and-benchmarks.md "Performance benchmark": "terminal bytes per update
 * (with line diff)"; "1-100 active changes per tick"; "redraw <=4Hz live; no full 100k-event fold per redraw;
 * report measured hardware/toolchain and outliers. No invented pass numbers."
 * Measurement-only: the bench drives compiled dist/ over the wb-9x5.1 fixture and no production cap moves.
 * This guard checks the diff accounting, receipt completeness, the falsifiers F1-F3, the exit semantics,
 * determinism and that src/ stays untouched. It never asserts a measured byte count of the real fixture.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { assessFixtureShape, BENCH_ONLY_LIMITS, buildGroupedFixture, SCOPE } from "../qa/workbench/grouped-fixture.mjs";
import {
  assessLineDiffReceipt,
  BANDS,
  diffFrames,
  FOLD_THRESHOLD_EVENTS,
  frameBytes,
  LINE_DIFF_CONTRACT,
  REDRAW_MAX_HZ,
  runLineDiffBench,
  VIEW_NAMES,
  WIDTHS,
} from "../qa/workbench/line-diff-bench.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { type ObservationEvent, ObservationProjection } from "../src/workbench/observation.js";

interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Series {
  diffBytes: Distribution;
  fullBytes: Distribution;
  ratio: Distribution;
  changedLines: Distribution;
  zeroDiffRedraws: number;
}
interface Band {
  label: string;
  minChanges: number;
  maxChanges: number;
  ticks: number;
  updates: number;
  redraws: number;
  series: Record<string, Series>;
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
  sampling: { views: string[]; sizes: Array<{ label: string; width: number; rows: number }> };
  bands: Band[];
  exactChurn: Band[];
  series: Record<string, Series>;
  firstPaint: Record<string, { fullBytes: number; lines: number }>;
  probe: { fullBytes: number; diffBytes: number; ratio: number; changedLines: number };
  folds: { redraws: number; layoutCalls: number; maxTouchedPerRedraw: number; maxEventsRequested: number; fullFoldRedraws: number; threshold: number };
  cadence: { capHz: number; minIntervalMs: number; redraws: number; skipped: number; fixtureSpanMs: number; effectiveHz: number; maxRedrawsInOneSecond: number };
  outliers: { diff: unknown[] };
  bounds: { redrawMaxHz: number; foldThresholdEvents: number };
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
interface Diff {
  fullBytes: number;
  diffBytes: number;
  changedLines: number;
  totalLines: number;
  removedLines: number;
}

const run = runLineDiffBench as (input: { Projection: typeof ObservationProjection; inspector: Inspector; fixture: GroupedFixture; host: Host }) => Receipt;
const assess = assessLineDiffReceipt as (receipt: Receipt) => {
  realised: boolean;
  violations: Array<{ rule: string; detail: string }>;
  over: string[];
  pass: boolean;
  exitCode: number;
};
const diff = diffFrames as (previous: string[], next: string[]) => Diff;
const bytesOf = frameBytes as (lines: string[]) => number;
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
  command: "vitest test/workbench-line-diff-bench.test.ts",
};
const VIEWS = ["overview", "graph", "timeline", "details"];
const SERIES_KEYS = VIEWS.flatMap(view => [`${view}@80`, `${view}@120`]);
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const clone = (receipt: Receipt): Receipt => structuredClone(receipt);

const sane = (value: Distribution): boolean =>
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

/** A receipt that is the W21 claim, measured and clean, derived from the real small run. */
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
  const quick: Series = {
    diffBytes: { samples: 50, p50: 80, p95: 160, max: 240 },
    fullBytes: { samples: 50, p50: 1_000, p95: 1_000, max: 1_000 },
    ratio: { samples: 50, p50: 0.08, p95: 0.16, max: 0.24 },
    changedLines: { samples: 50, p50: 1, p95: 2, max: 3 },
    zeroDiffRedraws: 0,
  };
  for (const band of [...receipt.bands, ...receipt.exactChurn]) for (const key of SERIES_KEYS) band.series[key] = structuredClone(quick);
  for (const key of SERIES_KEYS) receipt.series[key] = structuredClone(quick);
  receipt.folds = { ...receipt.folds, fullFoldRedraws: 0, maxEventsRequested: 40, maxTouchedPerRedraw: 400 };
  receipt.cadence = { ...receipt.cadence, redraws: 2_000, maxRedrawsInOneSecond: 1 };
  return receipt;
};

describe("W21 line-diff accounting (F1: diff bytes are never full-frame bytes)", () => {
  it("counts a frame as every line plus its terminator in UTF-8 bytes, not code units", () => {
    expect(bytesOf([])).toBe(0);
    expect(bytesOf(["abc", "de"])).toBe(4 + 3);
    expect(bytesOf(["漢字"])).toBe(6 + 1);
    expect(bytesOf(["é"])).toBe(2 + 1);
  });

  it("emits zero diff bytes for an identical frame and the whole frame for a cold paint", () => {
    const frame = ["alpha", "漢字 beta", "gamma"];
    expect(diff(frame, [...frame])).toMatchObject({ diffBytes: 0, changedLines: 0, totalLines: 3, removedLines: 0, fullBytes: bytesOf(frame) });
    expect(diff([], frame)).toMatchObject({ diffBytes: bytesOf(frame), fullBytes: bytesOf(frame), changedLines: 3 });
  });

  it("charges only the changed line on a single-line change, strictly under the full frame", () => {
    const before = ["one", "two", "three", "four"];
    const after = ["one", "two changed", "three", "four"];
    const result = diff(before, after);
    expect(result.changedLines).toBe(1);
    expect(result.diffBytes).toBe(Buffer.byteLength("two changed") + 1);
    expect(result.fullBytes).toBe(bytesOf(after));
    expect(result.diffBytes).toBeLessThan(result.fullBytes);
  });

  it("charges appended lines, and reports removed lines separately instead of inventing erase bytes", () => {
    expect(diff(["a"], ["a", "bb"]).diffBytes).toBe(3);
    const shorter = diff(["a", "b", "c"], ["a"]);
    expect(shorter.diffBytes).toBe(0);
    expect(shorter.removedLines).toBe(2);
    expect(shorter.totalLines).toBe(1);
  });
});

describe("W21 line-diff receipt: contract and completeness (C1, C4)", () => {
  it("names the frozen contract and states every bound as an exported constant", () => {
    expect(LINE_DIFF_CONTRACT).toBe("workbench.line-diff/v1");
    expect(REDRAW_MAX_HZ).toBe(4);
    expect(FOLD_THRESHOLD_EVENTS).toBe(100_000);
    expect(VIEW_NAMES).toEqual(VIEWS);
    expect(WIDTHS).toEqual([80, 120]);
    expect(BANDS.map((band: { label: string }) => band.label)).toEqual(["1", "10", "100"]);
  });

  it("emits host, toolchain, fixture shape, limits and a series per view and width in every churn band", () => {
    const { receipt } = smallRun();
    expect(receipt.contract).toBe("workbench.line-diff/v1");
    expect(receipt.measured).toBe(true);
    for (const key of ["utc", "revision", "node", "arch", "platform", "cpuModel", "command"] as const) {
      expect(typeof receipt[key]).toBe("string");
      expect(receipt[key].length).toBeGreaterThan(0);
    }
    expect(receipt.cpus).toBeGreaterThan(0);
    expect(Object.keys(receipt.toolchain).sort()).toEqual(["node", "piTui", "typescript"]);
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.sampling.views).toEqual(VIEWS);
    expect(receipt.sampling.sizes.map(size => size.width)).toEqual([80, 120]);
    expect(receipt.bands.map(band => band.label)).toEqual(["1", "10", "100"]);
    expect(receipt.exactChurn.map(band => [band.minChanges, band.maxChanges])).toEqual([
      [1, 1],
      [10, 10],
      [100, 100],
    ]);
    for (const band of [...receipt.bands, ...receipt.exactChurn]) {
      expect(band.ticks).toBeGreaterThan(0);
      expect(band.updates).toBeGreaterThanOrEqual(band.ticks * band.minChanges);
      expect(band.updates).toBeLessThanOrEqual(band.ticks * band.maxChanges);
      expect(Object.keys(band.series).sort()).toEqual([...SERIES_KEYS].sort());
    }
    expect(Object.keys(receipt.series).sort()).toEqual([...SERIES_KEYS].sort());
    for (const key of SERIES_KEYS) {
      const value = receipt.series[key];
      for (const dist of [value.diffBytes, value.fullBytes, value.ratio, value.changedLines]) expect(sane(dist)).toBe(true);
      expect(value.fullBytes.p50).toBeGreaterThan(0);
      expect(receipt.firstPaint[key].fullBytes).toBeGreaterThan(0);
    }
    expect(receipt.outliers.diff.length).toBeGreaterThan(0);
  }, 120_000);

  it("never reports a diff above its own full frame, and the cold paint is excluded from the series", () => {
    const { receipt } = smallRun();
    for (const key of SERIES_KEYS) {
      const value = receipt.series[key];
      expect(value.ratio.max).toBeLessThanOrEqual(1);
      expect(value.diffBytes.max).toBeLessThanOrEqual(value.fullBytes.max ?? 0);
      expect(value.diffBytes.samples).toBe(receipt.cadence.redraws - 1);
      expect(value.zeroDiffRedraws).toBeLessThanOrEqual(value.diffBytes.samples);
    }
  }, 120_000);

  it("constructs the projection exactly once, with exactly the bench-only limits", () => {
    expect(smallRun().constructed).toEqual([[{ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 }]]);
  }, 120_000);

  it("applies every update, truncates nothing, and flags a small fixture as not W21", () => {
    const { receipt } = smallRun();
    expect(receipt.apply.ingestApplied).toBe(receipt.offered.updates);
    expect(receipt.retained.nodes).toBe(receipt.offered.nodes);
    expect(receipt.realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
    expect(receipt.violations.map(violation => violation.rule)).toContain("updates-below-100000");
  }, 120_000);
});

describe("W21 line-diff falsifiers", () => {
  it("F1: the self-check probe changes exactly one line and reports a ratio strictly under 1", () => {
    const { probe } = smallRun().receipt;
    expect(probe.changedLines).toBe(1);
    expect(probe.diffBytes).toBeGreaterThan(0);
    expect(probe.ratio).toBeLessThan(1);
    expect(probe.ratio).toBeCloseTo(probe.diffBytes / probe.fullBytes, 5);
  }, 120_000);

  it("F1: a frame that repaints every line each redraw is recorded as ratio 1, and a static frame as zero bytes", () => {
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 12 });
    let tick = 0;
    const churning: Inspector = { ...inspector, layoutInspector: () => ["header", "body", "footer"].map(line => `${line} ${tick++}`) };
    const everyLine = run({ Projection: ObservationProjection, inspector: churning, fixture, host: HOST });
    expect(everyLine.series["overview@80"].ratio.p50).toBe(1);
    expect(everyLine.series["overview@80"].zeroDiffRedraws).toBe(0);
    const stillFrame: Inspector = { ...inspector, layoutInspector: () => ["header", "body", "footer"] };
    const still = run({ Projection: ObservationProjection, inspector: stillFrame, fixture, host: HOST });
    expect(still.series["overview@80"].diffBytes.max).toBe(0);
    expect(still.series["overview@80"].zeroDiffRedraws).toBe(still.series["overview@80"].diffBytes.samples);
  }, 60_000);

  it("F2: echoes the bench-only limits and states that production caps are untouched", () => {
    const { receipt } = smallRun();
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(JSON.stringify(receipt)).toMatch(/production caps untouched/);
  }, 120_000);

  it("F3: accounts bounded reads, and records a full fold per redraw as a finding with exit 1", () => {
    const { receipt } = smallRun();
    expect(receipt.folds.layoutCalls).toBe(receipt.folds.redraws * VIEWS.length * WIDTHS.length);
    expect(receipt.folds.fullFoldRedraws).toBe(0);
    expect(receipt.folds.maxTouchedPerRedraw).toBeLessThan(receipt.folds.threshold);
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 6 });
    const folding: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        model.projection.events({ scope: SCOPE, limit: 100_000 });
        return layoutInspector(model, state, size);
      },
    };
    const folded = run({ Projection: ObservationProjection, inspector: folding, fixture, host: HOST });
    expect(folded.folds.fullFoldRedraws).toBe(folded.folds.redraws);
    expect(folded.over).toContain("full-fold-per-redraw");
  }, 60_000);

  it("keeps the redraw cadence at or below 4 Hz from fixture time, never the wall clock", () => {
    const { cadence } = smallRun().receipt;
    expect(cadence.capHz).toBe(4);
    expect(cadence.minIntervalMs).toBe(250);
    expect(cadence.redraws).toBeGreaterThan(1);
    expect(cadence.maxRedrawsInOneSecond).toBeLessThanOrEqual(4);
    expect(cadence.effectiveHz).toBeLessThanOrEqual(4);
  }, 120_000);
});

describe("W21 line-diff exit semantics (C3, C4)", () => {
  it("exits 0 only for a realised W21 receipt with no finding", () => {
    const receipt = realisedReceipt();
    expect(shapeOf(receipt.fixture).realised).toBe(true);
    const verdict = assess(receipt);
    expect(verdict.violations).toEqual([]);
    expect(verdict.over).toEqual([]);
    expect(verdict.exitCode).toBe(0);
    expect(verdict.pass).toBe(true);
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

  it("exits 2 for a wrong shape, a truncated projection, unapplied updates, an unsampled series or no redraws", () => {
    const shape = realisedReceipt();
    shape.fixture.updates = 99_999;
    expect(assess(shape).violations.map(violation => violation.rule)).toContain("updates-below-100000");
    const truncated = realisedReceipt();
    truncated.retained.nodes -= 1;
    expect(assess(truncated).violations.map(violation => violation.rule)).toContain("projection-truncated");
    const unapplied = realisedReceipt();
    unapplied.apply.ingestApplied -= 1;
    expect(assess(unapplied).violations.map(violation => violation.rule)).toContain("updates-not-applied");
    const unsampled = realisedReceipt();
    unsampled.bands[1].series["graph@120"].diffBytes = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled).violations.map(violation => violation.rule)).toContain("series-not-sampled");
    expect(assess(unsampled).exitCode).toBe(2);
    const idle = realisedReceipt();
    idle.cadence.redraws = 0;
    expect(assess(idle).violations.map(violation => violation.rule)).toContain("no-redraws");
  }, 120_000);

  it("exits 2 when the instrument is broken: a probe that does not beat the full frame, or a diff above its frame", () => {
    const broken = realisedReceipt();
    broken.probe = { ...broken.probe, diffBytes: broken.probe.fullBytes, ratio: 1 };
    expect(assess(broken).violations.map(violation => violation.rule)).toContain("probe-diff-equals-full");
    expect(assess(broken).exitCode).toBe(2);
    const inverted = realisedReceipt();
    inverted.series["overview@80"].ratio = { samples: 50, p50: 0.5, p95: 1.2, max: 1.4 };
    expect(assess(inverted).violations.map(violation => violation.rule)).toContain("diff-exceeds-full");
    expect(assess(inverted).exitCode).toBe(2);
  }, 120_000);

  it("recomputes the verdict from the measured fields, ignoring any stored verdict", () => {
    const receipt = realisedReceipt();
    receipt.exitCode = 0;
    receipt.pass = true;
    receipt.cadence.maxRedrawsInOneSecond = 9;
    expect(assess(receipt).exitCode).toBe(1);
  }, 120_000);
});

describe("W21 line-diff determinism and fixture reuse (C5)", () => {
  it("repeats every non-timing field, including every emitted byte count, exactly", () => {
    const fixture = build({ seed: 4, nodes: 300, depth: 5, ticks: 110 });
    const a = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    const b = run({ Projection: ObservationProjection, inspector, fixture, host: HOST });
    const stable = (receipt: Receipt) => ({
      fixture: receipt.fixture,
      offered: receipt.offered,
      retained: receipt.retained,
      apply: receipt.apply,
      series: receipt.series,
      bands: receipt.bands.map(({ label, ticks, updates, redraws, series }) => ({ label, ticks, updates, redraws, series })),
      firstPaint: receipt.firstPaint,
      probe: receipt.probe,
      folds: receipt.folds,
      cadence: receipt.cadence,
    });
    expect(stable(b)).toEqual(stable(a));
  }, 120_000);

  it("reads no wall clock and draws no randomness anywhere in the module", () => {
    const text = readRepo("qa/workbench/line-diff-bench.mjs");
    expect(text).not.toMatch(/Date\.now|Math\.random|crypto\.random|performance\.now/);
    const calls = [...text.matchAll(/new Date\(\s*\)/g)];
    expect(calls.length).toBeLessThanOrEqual(1);
    for (const call of calls) expect(call.index).toBeGreaterThan(text.indexOf("async function main"));
  });

  it("reuses the grouped fixture builder and forks no second fixture or limits literal", () => {
    const text = readRepo("qa/workbench/line-diff-bench.mjs");
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
    const text = readRepo("qa/workbench/line-diff-bench.mjs");
    expect(text).toMatch(/W21_LINEDIFF_RECEIPT/);
    const written = text.indexOf("writeFileSync(process.env.W21_LINEDIFF_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = receipt.exitCode");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
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
      if (/line-diff-bench|BENCH_ONLY_LIMITS|workbench\.line-diff/.test(text)) named.push(file);
    }
    expect(named).toEqual([]);
  });

  it("registers line-diff-bench as a Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.line-diff-bench\]\ncommand = "node qa\/workbench\/line-diff-bench\.mjs"\ntimeout = 300\n/);
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/line-diff/);
  });
});
