/** W21-I/VC-5 (wb-9x5.11): grouped-10k four-view layoutInspector navigation and resize layout-time receipt, honest exit
 * semantics, production caps unchanged. Measurement-only: the core module takes the projection class, the inspector and the host
 * read sides as arguments, the CLI drives the compiled dist/, and no src/ file or production cap moves.
 * Spec lines pinned (verbatim):
 * docs/workbench/14 "Performance benchmark": "p50/p95 layout render/navigate/resize time" / "number of visible rendered rows vs
 * total nodes" / "Proposed responsive target <=20ms per navigation/layout calculation on declared reference host, redraw <=4Hz
 * live; no full 100k-event fold per redraw; report measured hardware/toolchain and outliers. No invented pass numbers."
 * docs/workbench/10 "Layout responsiveness": "Resize preserves node selection, focus and scroll intent where possible."
 * docs/workbench/15 "Vertical cuts" VC-5: "Benchmark >=1000 nodes/100k events with measured <=20ms navigation target and no
 * full-log redraw fold."
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  GROUPED_FIXTURE_DEFAULTS,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  SCOPE,
} from "../qa/workbench/grouped-fixture.mjs";
import {
  ACTIONS,
  assessFourViewLayoutReceipt,
  attentionNowOf,
  BENCHMARK,
  createHostModel,
  DEFAULT_SAMPLING,
  fourViewLayoutExitCodeFor,
  HOST_READ_CAPS,
  MIN_SAMPLES_PER_ACTION,
  RECEIPT_CONTRACT,
  RUN_LENGTH,
  runFourViewLayoutBench,
  SIZES,
  VIEWS,
} from "../qa/workbench/inspector-four-view-layout-core.mjs";
import { WORKBENCH_ATTENTION_BOTTLENECKS, WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_TIMELINE_COLUMNS } from "../src/index.js";
import type { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorSize, type InspectorState, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import { selectAttention } from "../src/workbench/attention.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import { createGraphViewBuilder } from "../src/workbench/graph-view.js";
import { type ObservationEvent, ObservationProjection } from "../src/workbench/observation.js";
import { buildTimelineLanes } from "../src/workbench/timeline.js";
import { selectLinkedTopology } from "../src/workbench/topology-slice.js";
import { createWorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";

type View = "overview" | "graph" | "timeline" | "details";
type Action = "view-switch" | "selection-move" | "scroll-step" | "resize";
interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Counts {
  p50: number | null;
  max: number | null;
}
interface Reads {
  windowRowsPerNavigation: Counts;
  windowCallsPerNavigation: Counts;
  relationRowsPerNavigation: Counts;
  maxWindowLimit: number;
  fullFoldSamples: number;
  invariant: string;
}
interface Outlier {
  ms: number;
  action: Action;
  view: View;
  size: string;
  index: number;
}
interface ActionSeries {
  layout: Distribution;
  byView: Record<View, Distribution>;
  bySize: Record<string, Distribution>;
  reads: Reads;
  outliers: Outlier[];
}
interface ResizeState {
  checked: number;
  positionKept: number;
  focusKept: number;
  stateUnchanged: number;
  focusedSamples: number;
  label: string;
}
interface Violation {
  rule: string;
  detail: string;
}
interface Receipt {
  contract: string;
  benchmark: string;
  measured: boolean;
  scopeLabel: string;
  notClaimed: string[];
  productionCaps: string;
  utc: string;
  revision: string;
  node: string;
  arch: string;
  platform: string;
  cpus: number;
  cpuModel: string;
  toolchain: Record<string, string>;
  command: string;
  overrides: Record<string, string>;
  fixture: Record<string, unknown> & { realised: boolean };
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; edges: number; events: number };
  limits: Record<string, number>;
  hostReadCaps: { relationPage: number; timelineColumns: number; attentionBottlenecks: number };
  attentionNow: string;
  sampling: Record<string, unknown> & { viewSwitches: number; selectionMoves: number; scrollSteps: number; resizes: number };
  actions: Record<Action, ActionSeries>;
  views: Record<View, Distribution>;
  visibleRows: Record<View, { renderedRows: Counts; windowRowsRead: Counts; totalNodes: number }>;
  resizeState: ResizeState;
  outliers: Outlier[];
  pass: boolean;
  target: { ms: number; statistic: string; judged: string; over: string[]; fullFold: string[]; resizeLost: string[] };
  realised: boolean;
  violations: Violation[];
  passFlagMismatches: Violation[];
  verdict: string;
  exitCode: number;
}
interface Fixture {
  snapshots: readonly Parameters<ObservationProjection["refresh"]>[0][];
  relations: readonly Parameters<ObservationProjection["relate"]>[0][];
  updates: readonly ObservationEvent[];
  shape: Record<string, unknown> & { ticks: number };
}
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
type Sampling = { viewSwitches: number; selectionMoves: number; scrollSteps: number; resizes: number };
const READ_SIDES = { createGraphViewBuilder, buildTimelineLanes, selectAttention, selectLinkedTopology, CapabilityError };
const INSPECTOR: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };
const build = buildGroupedFixture as (options?: Partial<{ seed: number; nodes: number; depth: number; ticks: number }>) => Fixture;
const run = runFourViewLayoutBench as unknown as (input: {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  readSides: typeof READ_SIDES;
  fixture: Fixture;
  host: typeof HOST;
  sampling?: Partial<Sampling>;
}) => Receipt;
const assess = assessFourViewLayoutReceipt as (receipt: Receipt | Record<string, unknown>) => Pick<Receipt, "target" | "realised" | "violations" | "passFlagMismatches" | "verdict" | "exitCode">;
const exitCode = fourViewLayoutExitCodeFor as (receipt: Receipt | Record<string, unknown>) => number;
const hostModel = createHostModel as (input: {
  reader: ObservationProjection;
  readSides: typeof READ_SIDES;
  base: { title: string; status: string };
  now: string;
}) => { observation: InspectorModel; modelFor(state: InspectorState): InspectorModel };
const views = VIEWS as readonly View[];
const actions = ACTIONS as readonly Action[];
const sizes = SIZES as readonly (Required<InspectorSize> & { label: string; tier: string })[];
const minSamples = MIN_SAMPLES_PER_ACTION as number;
const targetMs = NAVIGATION_TARGET_MS as number;
const scope = SCOPE as { workspace: string; principal: string };
const invocation = INVOCATION_ID as string;

const HOST = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-inspector-four-view-layout-bench.test.ts",
  overrides: {},
};
/** Enough runs that every action reaches every view at both sizes (runs cycle sizes, then views). */
const SAMPLING: Sampling = { viewSwitches: 16, selectionMoves: 64, scrollSteps: 80, resizes: 80 };
const SMALL = { seed: 11, nodes: 600, depth: 3, ticks: 8 };
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const apply = (projection: ObservationProjection, fixture: Fixture): void => {
  for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
  for (const relation of fixture.relations) projection.relate(relation);
  for (const update of fixture.updates) projection.ingest(update);
};
let cachedSmall: Receipt | undefined;
const smallRun = (): Receipt => {
  cachedSmall ??= run({ Projection: ObservationProjection, inspector: INSPECTOR, readSides: READ_SIDES, fixture: build(SMALL), host: HOST, sampling: SAMPLING });
  return cachedSmall;
};
let cachedShape: Record<string, unknown> | undefined;
const defaultShape = (): Record<string, unknown> => {
  cachedShape ??= build({ ...(GROUPED_FIXTURE_DEFAULTS as Record<string, number>) }).shape;
  return cachedShape;
};
/** A copy of the real small receipt whose fixture, counts and timings are those of a realised, fast, complete W21 run. */
const realisedFast = (): Receipt => {
  const copy: Receipt = structuredClone(smallRun());
  copy.fixture = { ...defaultShape(), realised: true };
  const fast = (series: Distribution, samples: number): void => {
    Object.assign(series, { samples, p50: 1, p95: 2, max: 3 });
  };
  for (const action of actions) {
    const series = copy.actions[action];
    fast(series.layout, minSamples);
    for (const view of views) fast(series.byView[view], minSamples / 4);
    for (const size of sizes) fast(series.bySize[size.label], minSamples / 2);
    series.reads.fullFoldSamples = 0;
  }
  for (const view of views) fast(copy.views[view], minSamples);
  Object.assign(copy.resizeState, { checked: minSamples, positionKept: minSamples, focusKept: minSamples, stateUnchanged: minSamples });
  copy.pass = true;
  return copy;
};
const finite = (value: Distribution): boolean =>
  value.samples > 0 && [value.p50, value.p95, value.max].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0) && (value.p50 ?? 0) <= (value.p95 ?? 0) && (value.p95 ?? 0) <= (value.max ?? 0);
const samplingOf = (action: Action): number => SAMPLING[({ "view-switch": "viewSwitches", "selection-move": "selectionMoves", "scroll-step": "scrollSteps", resize: "resizes" } as const)[action]];

describe("W21-I four-view layout receipt: shape and completeness (AC1/AC3)", () => {
  it("names its contract, benchmark and layoutInspector-only scope, carries host, toolchain, command, fixture and caps, and is JSON-lossless", () => {
    const receipt = smallRun();
    expect(receipt.contract).toBe(RECEIPT_CONTRACT);
    expect(receipt.contract).toBe("workbench.inspector-four-view-layout-bench/v1");
    expect(receipt.benchmark).toBe(BENCHMARK);
    expect(receipt.measured).toBe(true);
    expect(receipt.scopeLabel).toMatch(/^layoutInspector only, every sample one timed call: four views/);
    expect(receipt.notClaimed).toHaveLength(3);
    expect(receipt.notClaimed[0]).toMatch(/single-column host path/);
    expect(receipt).toMatchObject({ utc: HOST.utc, revision: HOST.revision, node: HOST.node, arch: HOST.arch, platform: HOST.platform, cpus: 1, cpuModel: "test-cpu", command: HOST.command, overrides: {} });
    expect(receipt.toolchain).toEqual(HOST.toolchain);
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.hostReadCaps).toEqual({ relationPage: 40, timelineColumns: 24, attentionBottlenecks: 5 });
    expect(receipt.attentionNow).toBe(new Date(Date.UTC(2026, 9, 15, 0, 0, SMALL.ticks)).toISOString());
    expect(receipt.sampling).toMatchObject({ ...SAMPLING, runLength: RUN_LENGTH, warmupSamples: 0, timedRegion: "one layoutInspector call, bracketed by performance.now()" });
    expect(JSON.parse(JSON.stringify(receipt))).toEqual(receipt);
  });

  it("reports p50/p95/max for every action, per view and per size, in all four views at 80x24 (two panes) and 120x40 (three panes)", () => {
    const receipt = smallRun();
    expect(Object.keys(receipt.actions)).toEqual(["view-switch", "selection-move", "scroll-step", "resize"]);
    expect(sizes.map(size => [size.label, size.width, size.rows, size.panes, size.tier])).toEqual([
      ["80x24", 80, 24, true, "two-pane"],
      ["120x40", 120, 40, true, "three-pane"],
    ]);
    for (const action of actions) {
      const series = receipt.actions[action];
      expect(series.layout.samples, action).toBe(samplingOf(action));
      expect(finite(series.layout), action).toBe(true);
      expect(Object.keys(series.byView)).toEqual(["overview", "graph", "timeline", "details"]);
      for (const view of views) expect(finite(series.byView[view]), `${action}/${view}`).toBe(true);
      for (const size of sizes) expect(finite(series.bySize[size.label]), `${action}/${size.label}`).toBe(true);
      expect(views.reduce((sum, view) => sum + series.byView[view].samples, 0)).toBe(series.layout.samples);
      expect(sizes.reduce((sum, size) => sum + series.bySize[size.label].samples, 0)).toBe(series.layout.samples);
      expect(series.outliers).toHaveLength(5);
      expect(series.outliers.every(outlier => outlier.action === action && outlier.ms === series.layout.max === (outlier === series.outliers[0]) || outlier.ms <= (series.layout.max ?? 0))).toBe(true);
    }
    for (const view of views) expect(finite(receipt.views[view]), view).toBe(true);
    expect(views.reduce((sum, view) => sum + receipt.views[view].samples, 0)).toBe(Object.values(SAMPLING).reduce((sum, value) => sum + value, 0));
    expect(receipt.outliers).toHaveLength(5);
  });

  it("reports visible rendered rows versus total nodes per view: never more rows than the terminal, never every retained row read", () => {
    const receipt = smallRun();
    const projection = new ObservationProjection(BENCH_ONLY_LIMITS);
    apply(projection, build(SMALL));
    const total = projection.window({ scope, invocationId: invocation, offset: 0, limit: 1 }).total;
    for (const view of views) {
      const rows = receipt.visibleRows[view];
      expect(rows.totalNodes, view).toBe(total);
      expect(rows.renderedRows.max ?? 0, view).toBeGreaterThan(0);
      expect(rows.renderedRows.max ?? Number.POSITIVE_INFINITY, view).toBeLessThanOrEqual(40);
      expect(rows.windowRowsRead.max ?? Number.POSITIVE_INFINITY, view).toBeLessThan(total);
    }
  });

  it("fails a receipt for each missing top-level, action or view field, as exit 2", () => {
    for (const field of ["contract", "revision", "toolchain", "fixture", "sampling", "hostReadCaps", "attentionNow", "actions", "views", "visibleRows", "resizeState", "outliers"]) {
      const copy = structuredClone(realisedFast()) as unknown as Record<string, unknown>;
      delete copy[field];
      const result = assess(copy);
      expect(result.exitCode, field).toBe(2);
      expect(result.violations, field).toContainEqual({ rule: "receipt-field-missing", detail: field });
    }
    for (const action of actions) {
      const copy = realisedFast();
      delete (copy.actions[action] as Partial<ActionSeries>).bySize;
      expect(assess(copy).violations).toContainEqual({ rule: "receipt-field-missing", detail: `actions.${action}.bySize` });
    }
    const copy = realisedFast();
    delete (copy.visibleRows as Partial<Receipt["visibleRows"]>).timeline;
    expect(assess(copy).violations).toContainEqual({ rule: "receipt-field-missing", detail: "visibleRows.timeline.renderedRows" });
  });
});

describe("W21-I projection reads per navigation (AC2: a full fold is a falsifier, never a hidden cost)", () => {
  it("counts every window and relation read of a navigation; none reads a full fold and every window asks for at most 100 rows", () => {
    const receipt = smallRun();
    for (const action of actions) {
      const reads = receipt.actions[action].reads;
      expect(reads.fullFoldSamples, action).toBe(0);
      expect(reads.maxWindowLimit, action).toBeGreaterThan(0);
      expect(reads.maxWindowLimit, action).toBeLessThanOrEqual(100);
      expect(reads.windowCallsPerNavigation.max ?? 0, action).toBeGreaterThan(0);
      expect(reads.windowRowsPerNavigation.max ?? 0, action).toBeGreaterThan(0);
      expect(reads.invariant).toMatch(/fullFoldSamples must be 0/);
    }
  });

  it("counts a layout that folds every retained row as a full-fold navigation, and the realised receipt then exits 1 naming the action", () => {
    let folds = 0;
    const folding: Inspector = {
      ...INSPECTOR,
      layoutInspector: (model, state, size) => {
        // A full-fold regression: page through every row of the viewport before drawing.
        if (state.view === "graph") {
          folds++;
          const { total } = model.projection.window({ scope, invocationId: invocation, offset: 0, limit: 1 });
          for (let offset = 0; offset < total; offset += 100) model.projection.window({ scope, invocationId: invocation, offset, limit: 100 });
        }
        return layoutInspector(model, state, size);
      },
    };
    const receipt = run({ Projection: ObservationProjection, inspector: folding, readSides: READ_SIDES, fixture: build(SMALL), host: HOST, sampling: SAMPLING });
    expect(folds).toBeGreaterThan(0);
    const folded = actions.filter(action => receipt.actions[action].reads.fullFoldSamples > 0);
    expect(folded).toEqual(actions);
    expect(actions.reduce((sum, action) => sum + receipt.actions[action].reads.fullFoldSamples, 0)).toBe(folds);
    const copy = realisedFast();
    copy.actions["selection-move"].reads.fullFoldSamples = receipt.actions["selection-move"].reads.fullFoldSamples;
    const result = assess(copy);
    expect(result.target.fullFold).toEqual(["selection-move"]);
    expect(result.verdict).toBe("full-fold");
    expect(result.exitCode).toBe(1);
  });
});

describe('W21-I resize keeps selection, focus and position (AC4, docs/10: "Resize preserves node selection, focus and scroll intent where possible.")', () => {
  it("checks every 80x24<->120x40 reflow against its rendered frame and the state handed in, focused and unfocused in every view", () => {
    const receipt = smallRun();
    const resize = receipt.resizeState;
    expect(resize.checked).toBe(SAMPLING.resizes);
    expect(resize).toMatchObject({ positionKept: resize.checked, focusKept: resize.checked, stateUnchanged: resize.checked });
    expect(resize.focusedSamples).toBeGreaterThan(0);
    expect(resize.focusedSamples).toBeLessThan(resize.checked);
    expect(resize.label).toMatch(/i\/N position/);
    for (const view of views) expect(receipt.actions.resize.byView[view].samples, view).toBeGreaterThan(0);
    for (const size of sizes) expect(receipt.actions.resize.bySize[size.label].samples, size.label).toBe(SAMPLING.resizes / 2);
  });

  it("a layout that drops the focus line, misreports the position or mutates its state on reflow is a resize-state-lost finding naming each check", () => {
    const focusLine = " Focused on selected node and confirmed direct relations only";
    const cases: Array<[string, Inspector["layoutInspector"]]> = [
      ["focusKept", (model, state, size) => layoutInspector(model, state, size).filter(line => line !== focusLine)],
      ["positionKept", (model, state, size) => layoutInspector(model, state, size).map((line, at) => (at === 1 ? line.replace(/ · \d+\/(\d+)$/u, " · 0/$1") : line))],
      [
        "stateUnchanged",
        (model, state, size) => {
          // An in-contract mutation (zoom or pan would leave the timeline's own bounds): the reflow flips follow.
          (state as { follow: boolean }).follow = !state.follow;
          return layoutInspector(model, state, size);
        },
      ],
    ];
    for (const [check, layout] of cases) {
      const receipt = run({ Projection: ObservationProjection, inspector: { ...INSPECTOR, layoutInspector: layout }, readSides: READ_SIDES, fixture: build(SMALL), host: HOST, sampling: { viewSwitches: 4, selectionMoves: 8, scrollSteps: 10, resizes: 80 } });
      // 80 reflows are eight runs: the second view cycle is focused, so every check has a frame it can fail on.
      expect(receipt.resizeState.focusedSamples, check).toBe(40);
      expect(receipt.resizeState[check as "focusKept"], check).toBeLessThan(receipt.resizeState.checked);
      const copy = realisedFast();
      copy.resizeState[check as "focusKept"] = receipt.resizeState[check as "focusKept"];
      const result = assess(copy);
      expect(result.target.resizeLost, check).toEqual([check]);
      expect(result.verdict, check).toBe("resize-state-lost");
      expect(result.exitCode, check).toBe(1);
    }
  });
});

describe("W21-I honest exit semantics (AC2/AC3: the 20 ms target compared, never asserted)", () => {
  it("exits 2 on an off-shape receipt even when every p95 is fast, and names the violated rules", () => {
    const receipt = smallRun();
    expect(assessFixtureShape(receipt.fixture).realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.pass).toBe(false);
    const rules = receipt.violations.map(violation => violation.rule);
    expect(rules).toContain("operations-below-10000");
    expect(rules).toContain("samples-below-1000");
    expect(rules).toContain("resize-checks-below-1000");
    expect(exitCode(receipt)).toBe(2);
  });

  it("exits 0 for a realised, fast, complete receipt; 20 ms itself is within target", () => {
    const copy = realisedFast();
    expect(assess(copy)).toMatchObject({ realised: true, violations: [], passFlagMismatches: [], verdict: "within-target", exitCode: 0 });
    copy.actions.resize.layout.p95 = targetMs;
    copy.views.details.p95 = targetMs;
    expect(assess(copy).exitCode).toBe(0);
    expect(assess(copy).target).toMatchObject({ ms: 20, statistic: "p95", over: [], fullFold: [], resizeLost: [] });
  });

  it("exits 1 naming the series when any judged p95 is over 20 ms: an action, an action/view, an action/size or a view", () => {
    const edits: Array<[string, (copy: Receipt) => void]> = [
      [
        "view-switch",
        copy => {
          copy.actions["view-switch"].layout.p95 = targetMs + 0.0001;
        },
      ],
      [
        "selection-move/timeline",
        copy => {
          copy.actions["selection-move"].byView.timeline.p95 = 21;
        },
      ],
      [
        "scroll-step/120x40",
        copy => {
          copy.actions["scroll-step"].bySize["120x40"].p95 = 21;
        },
      ],
      [
        "view:graph",
        copy => {
          copy.views.graph.p95 = 21;
        },
      ],
    ];
    for (const [name, edit] of edits) {
      const copy = realisedFast();
      edit(copy);
      const result = assess(copy);
      expect(result.target.over, name).toEqual([name]);
      expect(result.verdict, name).toBe("over-target");
      expect(result.exitCode, name).toBe(1);
    }
  });

  it("follows the measurements, not a pass flag: a pass claiming true over target exits 1 and is listed as a pass-flag mismatch", () => {
    const copy = realisedFast();
    copy.actions.resize.layout.p95 = 25;
    copy.pass = true;
    const result = assess(copy);
    expect(result.exitCode).toBe(1);
    expect(result.passFlagMismatches).toEqual([{ rule: "pass-flag-disagrees-with-measurement", detail: "pass=true but the measurements say false" }]);
  });

  it("exits 2, not 1, below 1,000 samples, for a truncated bench pass or an unsampled series, even when a p95 is over target", () => {
    const below = realisedFast();
    below.actions["scroll-step"].layout.samples = minSamples - 1;
    below.actions["scroll-step"].layout.p95 = 50;
    expect(assess(below).violations).toContainEqual({ rule: "samples-below-1000", detail: `scroll-step: ${minSamples - 1} samples; W21 needs >= ${minSamples}` });
    expect(assess(below).exitCode).toBe(2);
    const truncated = realisedFast();
    truncated.retained = { ...truncated.retained, nodes: truncated.offered.nodes - 1 };
    expect(assess(truncated).violations.map(violation => violation.rule)).toContain("bench-pass-truncated");
    expect(assess(truncated).exitCode).toBe(2);
    const unsampled = realisedFast();
    unsampled.actions.resize.byView.graph = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled).violations).toContainEqual({ rule: "series-not-sampled", detail: "resize/byView/graph has no samples" });
    expect(assess(unsampled).exitCode).toBe(2);
  });
});

describe("W21-I the timed region is exactly layoutInspector, over the host's own view models (AC1)", () => {
  it("calls layoutInspector exactly once per sample, handing the graph and timeline views their models and the overview its attention report", () => {
    const seen: Array<{ view: string; graph: boolean; timeline: boolean; attention: boolean; topology: boolean; size: string }> = [];
    const spy: Inspector = {
      ...INSPECTOR,
      layoutInspector: (model, state, size) => {
        seen.push({ view: state.view, graph: model.graph !== undefined, timeline: model.timeline !== undefined, attention: model.attention !== undefined, topology: model.topology !== undefined, size: `${size.width}x${size.rows}` });
        return layoutInspector(model, state, size);
      },
    };
    const receipt = run({ Projection: ObservationProjection, inspector: spy, readSides: READ_SIDES, fixture: build(SMALL), host: HOST, sampling: SAMPLING });
    expect(seen).toHaveLength(Object.values(SAMPLING).reduce((sum, value) => sum + value, 0));
    expect(actions.reduce((sum, action) => sum + receipt.actions[action].layout.samples, 0)).toBe(seen.length);
    for (const call of seen) {
      expect(call.graph).toBe(call.view === "graph");
      expect(call.timeline).toBe(call.view === "timeline");
      expect(call.attention).toBe(call.view === "overview");
      expect(call.topology).toBe(true);
      expect(["80x24", "120x40"]).toContain(call.size);
    }
  });

  it("reads no wall clock and no unseeded randomness; the only clock is performance.now around the one layoutInspector call", () => {
    const core = readRepo("qa/workbench/inspector-four-view-layout-core.mjs");
    expect(core).not.toMatch(/Math\.random|Date\.now|hrtime|new Date\(\)/);
    expect(core).toMatch(/const clock = \(\) => performance\.now\(\);/);
    const begin = core.indexOf("const begin = clock();");
    const call = core.indexOf("inspector.layoutInspector(model, state, size)", begin);
    const end = core.indexOf("const ms = clock() - begin;", call);
    expect(begin).toBeGreaterThan(-1);
    expect(call).toBeGreaterThan(begin);
    expect(end).toBeGreaterThan(call);
    expect(core.slice(begin, end).split("\n").filter(line => line.trim() !== "")).toHaveLength(2);
    expect(core.match(/clock\(\)/g)?.length).toBe(2);
    expect(core.match(/inspector\.layoutInspector\(/g)?.length).toBe(1);
  });

  it("keeps the CLI thin: dist imports only, the dist inspector and read sides, receipt written and printed before the exit code", () => {
    const text = readRepo("qa/workbench/inspector-four-view-layout-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(
      [
        "../../dist/ui/workflow-inspector.js",
        "../../dist/workbench/attention.js",
        "../../dist/workbench/capability-registry.js",
        "../../dist/workbench/graph-view.js",
        "../../dist/workbench/observation.js",
        "../../dist/workbench/timeline.js",
        "../../dist/workbench/topology-slice.js",
        "./bench-revision.mjs",
        "./grouped-fixture.mjs",
        "./inspector-four-view-layout-core.mjs",
        "node:fs",
        "node:os",
      ].sort(),
    );
    expect(text).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(text).not.toMatch(/maxNodes|maxEdges|\bmaxQuery\s*:|new ObservationProjection/);
    const written = text.indexOf("writeFileSync(process.env.W21_FOUR_VIEW_LAYOUT_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = fourViewLayoutExitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
    expect(text).toMatch(/process\.exit\(3\)/);
    expect(text.split("\n", 1)[0]).toMatch(/^\/\/ W21-I \(wb-9x5\.11\)/);
  });

  it("reuses the fixture module without forking it and imports nothing else in the core", () => {
    const core = readRepo("qa/workbench/inspector-four-view-layout-core.mjs");
    const specifiers = [...core.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(match => match[1]);
    expect(specifiers).toEqual(["./grouped-fixture.mjs"]);
    expect(core).not.toMatch(/function seeded|function buildGroupedFixture/);
    expect(core).toMatch(/new Projection\(BENCH_ONLY_LIMITS\)/);
  });
});

describe("W21-I host read side mirror: createHostModel draws what the real host seam draws (fidelity pin)", () => {
  type Factory = (tui: unknown, theme: unknown, keybindings: unknown, done: (result: undefined) => void) => WorkflowDialog;
  const live: WorkflowDialog[] = [];
  afterEach(() => {
    for (const dialog of live.splice(0)) dialog.dispose();
  });

  it("HOST_READ_CAPS are the constants src/index.ts hands the host seam", () => {
    expect(HOST_READ_CAPS).toEqual({ relationPage: WORKBENCH_PROJECTION_MAX_QUERY, timelineColumns: WORKBENCH_TIMELINE_COLUMNS, attentionBottlenecks: WORKBENCH_ATTENTION_BOTTLENECKS });
  });

  it("every view, after the same keys, equals the frame showWorkflowDialog renders over the same projection, caps and attention clock", async () => {
    const fixture = build(SMALL);
    const projection = new ObservationProjection(BENCH_ONLY_LIMITS);
    apply(projection, fixture);
    const now = (attentionNowOf as (fixture: Fixture) => string)(fixture);
    const task = createWorkflowTask({ id: invocation, script: "return 1;", meta: { name: "W21 four-view parity", description: "fixture run" } });
    task.observationScope = { ...scope, sessionId: "w21-four-view-parity" };
    const deps = {
      tasks: new Map(),
      observation: {
        projection,
        scope: () => ({ workspace: scope.workspace, principal: scope.principal }),
        relationPage: WORKBENCH_PROJECTION_MAX_QUERY,
        timelineColumns: WORKBENCH_TIMELINE_COLUMNS,
        attention: { bottlenecks: WORKBENCH_ATTENTION_BOTTLENECKS, now: () => now },
      },
      getRecord: vi.fn(() => undefined),
      viewAgentConversation: vi.fn(async () => {}),
      viewClaudeTranscript: vi.fn(async () => {}),
      getCtx: () => undefined,
    } satisfies WorkflowMenuDeps;
    const [width, rows] = [120, 40];
    let opened: (dialog: WorkflowDialog) => void = () => {};
    const ready = new Promise<WorkflowDialog>(resolve => {
      opened = resolve;
    });
    const custom = (factory: Factory): Promise<undefined> =>
      new Promise<undefined>(done => {
        opened(factory({ requestRender: () => {}, terminal: { columns: width, rows } }, { fg: (_color: string, text: string) => text, bold: (text: string) => text }, undefined, done));
      });
    void showWorkflowDialog(ctx({ ui: { notify: vi.fn(), custom } }) as never, task, deps);
    const dialog = await ready;
    live.push(dialog);
    const mirror = hostModel({ reader: projection, readSides: READ_SIDES, base: { title: "W21 four-view parity", status: task.status }, now });
    let state = initialInspectorState();
    const seen = new Set<string>([state.view]);
    const compare = (label: string): void => {
      expect(dialog.render(width), label).toEqual(layoutInspector(mirror.modelFor(state), state, { width, rows }));
    };
    compare("initial");
    for (const [at, key] of ["j", "j", "j", "\t", "j", "\t", "j", "l", "\t", "j", "\t", "j"].entries()) {
      dialog.handleInput(key);
      state = reduceInspectorKey(key, state, mirror.observation)?.state ?? state;
      seen.add(state.view);
      compare(`${at}:${JSON.stringify(key)}:${state.view}`);
    }
    expect([...seen].sort()).toEqual([...views].sort());
  });
});

describe("W21-I production caps unchanged and Forge registration (measurement-only falsifier)", () => {
  it("pins observation.ts MAX_DEFAULT and the bench-only limits, and no src/ file names the bench or its limits", () => {
    expect(readRepo("src/workbench/observation.ts")).toMatch(/const MAX_DEFAULT = \{maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100\};/);
    expect(BENCH_ONLY_LIMITS).toEqual({ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 });
    const root = new URL("../src/", import.meta.url);
    const named: string[] = [];
    for (const entry of readdirSync(root, { recursive: true })) {
      const file = String(entry);
      if (!file.endsWith(".ts")) continue;
      if (/BENCH_ONLY_LIMITS|four-view-layout|grouped-fixture/.test(readFileSync(join(root.pathname, file), "utf8"))) named.push(file);
    }
    expect(named).toEqual([]);
  });

  it("freezes the default sample plan, the action, view and size sets and the 1,000-sample floor the receipt claims", () => {
    expect(minSamples).toBe(1_000);
    expect(DEFAULT_SAMPLING).toEqual({ viewSwitches: 1_000, selectionMoves: 1_000, scrollSteps: 1_000, resizes: 1_000 });
    expect(RUN_LENGTH).toEqual({ "view-switch": 4, "selection-move": 8, "scroll-step": 10, resize: 10 });
    expect(actions).toEqual(["view-switch", "selection-move", "scroll-step", "resize"]);
    expect(views).toEqual(["overview", "graph", "timeline", "details"]);
  });

  it("registers inspector-four-view-layout-bench as one additive Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.inspector-four-view-layout-bench\]\ncommand = "node qa\/workbench\/inspector-four-view-layout-bench\.mjs"\ntimeout = 600\n/);
    expect(toml.match(/\[build\.commands\.inspector-four-view-layout-bench\]/g)).toHaveLength(1);
    expect(/^gate = \[([^\]]*)\]/m.exec(toml)?.[1]).toBe('"lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"');
    expect(toml).toMatch(/\[build\.commands\.timeline-grouped-bench\]\ncommand = "node qa\/workbench\/timeline-grouped-bench\.mjs"\ntimeout = 300\n/);
  });
});
