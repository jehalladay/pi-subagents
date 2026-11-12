/** W21-H (wb-9x5.10): graph-view model build receipt over the grouped-10k fixture, honest exit semantics, production caps unchanged.
 * Measurement-only: the bench takes the projection class and the graph view's buildGraphView and createGraphViewBuilder as
 * arguments, its CLI loads the compiled dist/ only, and no production cap or src file moves.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessGraphViewReceipt,
  CHANGE_EDGE,
  DEFAULT_GRAPH_SAMPLING,
  GRAPH_VIEW_BENCHMARK,
  GRAPH_VIEW_RECEIPT_CONTRACT,
  graphViewExitCodeFor,
  MIN_SAMPLES,
  MODEL_DEFAULTS,
  PASS_LIMITS,
  REGIMES,
  runGraphViewBench,
  SHAPES,
} from "../qa/workbench/graph-view-grouped-bench.mjs";
import { BENCH_ONLY_LIMITS, buildGroupedFixture, GROUPED_FIXTURE_DEFAULTS, INVOCATION_ID, NAVIGATION_TARGET_MS } from "../qa/workbench/grouped-fixture.mjs";
import { buildGraphView, createGraphViewBuilder, GRAPH_VIEW_CONTRACT, type GraphViewRequest } from "../src/workbench/graph-view.js";
import { ObservationProjection } from "../src/workbench/observation.js";

type PassLabel = "maxQuery-40" | "maxQuery-100";
type Regime = "cold" | "cache-hit" | "neighborhood-change";
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
interface RegimeSummary {
  samples: number;
  samplesByShape: Record<string, number>;
  build: Record<string, Distribution>;
  relationReads: { perBuild: Counts; total: number; buildsAboveZero: number; reportedMismatch: number };
  supernodes: Counts;
  references: Counts;
  partials: { perModel: Counts; rates: Record<string, number> };
  outliers: Array<{ ms: number; shape: string; offset: number; limit: number; position: number; reads: number }>;
  notReportedAsHit?: number;
  change?: { applied: number; notApplied: number; recomputedChanged: number };
}
interface Pass {
  label: PassLabel;
  limits: Record<string, number>;
  caps: Record<string, number | string>;
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; events: number; edges: number };
  truncation: { truncated: boolean; nodesNotRetained: number; edgesNotRetained: number };
  rows: number;
  modelContracts: string[];
  regimes: Record<Regime, RegimeSummary>;
  addedEdges: number;
  reportedMismatch: number;
  over: string[];
  pass: boolean;
}
interface Violation {
  rule: string;
  detail: string;
}
interface FixtureShape {
  nodes: number;
  depth: number;
  minDepth: number;
  [key: string]: unknown;
}
interface Fixture {
  snapshots: unknown[];
  relations: unknown[];
  updates: unknown[];
  shape: FixtureShape;
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
  overrides: Record<string, string>;
}
interface Receipt extends Host {
  contract: string;
  benchmark: string;
  measured: boolean;
  scopeLabel: string;
  productionCaps: string;
  fixture: FixtureShape & { realised: boolean };
  sampling: { viewports: number[]; focusPage: number; focusesPerViewport: number; pageStep: number; minSamples: number };
  /** Filled by Object.fromEntries in the bench (a string index under allowJs); the first case asserts both labels present. */
  passes: Record<string, Pass>;
  pass: boolean;
  target: { ms: number; statistic: string; passes: string[]; regimes: string[]; over: string[]; cacheHitReads: string[]; reportMismatches: string[] };
  realised: boolean;
  violations: Violation[];
  contradictions: Violation[];
  verdict: string;
  exitCode: number;
}
interface GraphView {
  buildGraphView: typeof buildGraphView;
  createGraphViewBuilder: typeof createGraphViewBuilder;
}
type Assessment = Pick<Receipt, "target" | "realised" | "violations" | "contradictions" | "verdict" | "exitCode">;

// Every run here takes the default sampling, so the contract states no sampling override (the bench's own is literal-typed).
const run = runGraphViewBench as (input: { Projection: typeof ObservationProjection; graphView: GraphView; fixture: Fixture; host: Host }) => Receipt;
const assess = assessGraphViewReceipt as (receipt: unknown) => Assessment;
const exitCode = graphViewExitCodeFor as (receipt: unknown) => number;
const build = buildGroupedFixture as (options?: Partial<{ seed: number; nodes: number; depth: number; ticks: number }>) => Fixture;
const passLimits = PASS_LIMITS as Record<PassLabel, Record<string, number>>;
const regimes = REGIMES as readonly Regime[];
const shapes = SHAPES as readonly string[];
const LABELS: readonly PassLabel[] = ["maxQuery-40", "maxQuery-100"];

const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-graph-view-grouped-bench.test.ts",
  overrides: {},
};
const GRAPH_VIEW: GraphView = { buildGraphView, createGraphViewBuilder };
/** Small enough to run in seconds; 300 operations over about 30 leaf groups, so some leaf fans out past maxFanOut 8. */
const SMALL = { seed: 3, nodes: 300, depth: 3, ticks: 8 };
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

let cachedSmall: Receipt | undefined;
/** One real run over the TypeScript sources on a small fixture: measured, honestly off the W21 shape. */
const smallRun = (): Receipt => {
  cachedSmall ??= run({ Projection: ObservationProjection, graphView: GRAPH_VIEW, fixture: build(SMALL), host: HOST });
  return cachedSmall;
};
let cachedDefault: Fixture | undefined;
const defaultShape = (): FixtureShape => {
  cachedDefault ??= build({ ...(GROUPED_FIXTURE_DEFAULTS as { seed: number; nodes: number; depth: number; ticks: number }) });
  return cachedDefault.shape;
};
const copyOf = (receipt: Receipt): Receipt => JSON.parse(JSON.stringify(receipt)) as Receipt;
/** The small run's receipt made the W21 claim on paper: the realised default fixture shape and 1,000 samples per regime and shape. */
const atShape = (): Receipt => {
  const copy = copyOf(smallRun());
  copy.fixture = { ...defaultShape(), realised: true };
  for (const label of LABELS) {
    for (const regime of regimes) {
      const summary = copy.passes[label].regimes[regime];
      for (const shape of shapes) summary.samplesByShape[shape] = MIN_SAMPLES;
      for (const series of Object.values(summary.build)) {
        series.samples = Math.max(series.samples, MIN_SAMPLES);
        series.p50 = 0.5;
        series.p95 = 1;
        series.max = 2;
      }
    }
    copy.passes[label].pass = true;
  }
  return copy;
};

describe("W21-H graph-view grouped bench: one real run over the TypeScript sources", () => {
  it("measures both passes, all three regimes and both request shapes, and a small fixture is honestly not the W21 claim (exit 2)", () => {
    const receipt = smallRun();
    expect([receipt.contract, receipt.benchmark, receipt.measured]).toEqual([GRAPH_VIEW_RECEIPT_CONTRACT, GRAPH_VIEW_BENCHMARK, true]);
    expect(Object.keys(receipt.passes)).toEqual(LABELS);
    for (const label of LABELS) {
      const pass = receipt.passes[label];
      expect(Object.keys(pass.regimes), label).toEqual([...regimes]);
      expect(pass.limits, label).toEqual(passLimits[label]);
      expect(pass.caps.relationLimit, label).toBe(passLimits[label].maxQuery);
      expect(pass.retained.nodes, label).toBe(pass.offered.nodes);
      expect(pass.retained.edges, label).toBe(pass.offered.edges);
      expect(pass.truncation.truncated, label).toBe(false);
      expect(pass.modelContracts, label).toEqual([GRAPH_VIEW_CONTRACT]);
      const counts = regimes.map(regime => pass.regimes[regime].samples);
      expect(new Set(counts).size, `${label}: one sample plan for every regime`).toBe(1);
      for (const regime of regimes) {
        const summary = pass.regimes[regime];
        for (const shape of shapes) expect(summary.samplesByShape[shape], `${label}/${regime}/${shape}`).toBeGreaterThan(0);
        expect(Object.keys(summary.build).sort(), `${label}/${regime}`).toEqual(
          ["overall", ...shapes, ...shapes.flatMap(shape => DEFAULT_GRAPH_SAMPLING.viewports.map((limit: number) => `${shape}-v${limit}`))].sort(),
        );
        expect(summary.build.overall.samples, `${label}/${regime}`).toBe(summary.samples);
      }
    }
    expect(receipt.exitCode).toBe(2);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.violations.map(violation => violation.rule)).toEqual(expect.arrayContaining(["operations-below-10000", "samples-below-1000"]));
    expect(exitCode(receipt)).toBe(2);
  });

  it("a cache hit reads no relation page and is the builder's own reported hit, and every builder report matches the counted reads", () => {
    const receipt = smallRun();
    for (const label of LABELS) {
      const { regimes: summaries } = receipt.passes[label];
      expect(summaries["cache-hit"].relationReads, label).toMatchObject({ total: 0, buildsAboveZero: 0, perBuild: { max: 0 } });
      expect(summaries["cache-hit"].notReportedAsHit, label).toBe(0);
      expect(summaries.cold.relationReads.buildsAboveZero, `${label}: a cold build reads its pages`).toBe(summaries.cold.samples);
      for (const regime of regimes) expect(summaries[regime].relationReads.reportedMismatch, `${label}/${regime}`).toBe(0);
      expect(receipt.passes[label].reportedMismatch, label).toBe(0);
    }
  });

  it("every neighborhood-change sample moved the topology by exactly one edge and its rebuild recomputed the changed neighborhood", () => {
    const receipt = smallRun();
    for (const label of LABELS) {
      const pass = receipt.passes[label];
      const summary = pass.regimes["neighborhood-change"];
      expect(summary.change, label).toEqual({ applied: summary.samples, notApplied: 0, recomputedChanged: summary.samples });
      expect(pass.addedEdges, label).toBe(summary.samples);
      expect(summary.relationReads.buildsAboveZero, `${label}: a topology change re-reads the pages`).toBe(summary.samples);
    }
    expect(CHANGE_EDGE.kind).toBe("dependency");
  });

  it("records supernode and reference entries per model and the counted partial-label rate of each scope, per pass", () => {
    const receipt = smallRun();
    for (const label of LABELS) {
      for (const regime of regimes) {
        const summary = receipt.passes[label].regimes[regime];
        expect(summary.supernodes.max, `${label}/${regime}`).toBeGreaterThan(0);
        expect(summary.references.max, `${label}/${regime}`).toBeGreaterThan(0);
        expect(Object.keys(summary.partials.rates).sort(), `${label}/${regime}`).toEqual(["any", "references", "relations", "window"]);
        for (const value of Object.values(summary.partials.rates)) {
          expect(value).toBeGreaterThanOrEqual(0);
          expect(value).toBeLessThanOrEqual(1);
        }
        // A 30-row viewport over the whole invocation always shows fewer rows than it holds: the window partial is counted.
        expect(summary.partials.rates.window, `${label}/${regime}`).toBeGreaterThan(0);
      }
    }
  });

  it("every request asks relation pages of its pass's maxQuery and as many rows as its viewport, and a focus sample names a viewport row", () => {
    // A recording graph view: the real functions, with each request kept by the reader (one counting reader per pass).
    const requests = new Map<object, GraphViewRequest[]>();
    const keep = (reader: object, request: GraphViewRequest): void => {
      requests.set(reader, [...(requests.get(reader) ?? []), request]);
    };
    const recording: GraphView = {
      buildGraphView: (reader, request) => {
        keep(reader, request);
        return buildGraphView(reader, request);
      },
      createGraphViewBuilder: reader => {
        const inner = createGraphViewBuilder(reader);
        return {
          build: request => {
            keep(reader, request);
            return inner.build(request);
          },
          get lastBuild() {
            return inner.lastBuild;
          },
        };
      },
    };
    const receipt = run({ Projection: ObservationProjection, graphView: recording, fixture: build(SMALL), host: HOST });
    const perPass = [...requests.values()];
    expect(perPass).toHaveLength(LABELS.length);
    for (const [at, label] of LABELS.entries()) {
      const seen = perPass[at];
      const { samples, samplesByShape } = receipt.passes[label].regimes.cold;
      // cold once, then two builds (warm-up and timed) for the cache hit and two for the neighborhood change, per sample.
      expect(seen, label).toHaveLength(5 * samples);
      expect(seen.filter(request => request.focus !== undefined), label).toHaveLength(5 * samplesByShape.focus);
      for (const request of seen) {
        expect(request.caps, label).toEqual({ maxNodes: request.viewport.limit, relationLimit: passLimits[label].maxQuery });
        expect(DEFAULT_GRAPH_SAMPLING.viewports).toContain(request.viewport.limit);
        expect(request.invocationId).toBe(INVOCATION_ID);
      }
    }
  });

  it("names the five slowest samples of every regime with their request parameters, slowest first", () => {
    const receipt = smallRun();
    for (const label of LABELS) {
      for (const regime of regimes) {
        const { outliers } = receipt.passes[label].regimes[regime];
        expect(outliers, `${label}/${regime}`).toHaveLength(5);
        for (const [at, outlier] of outliers.entries()) {
          expect(shapes).toContain(outlier.shape);
          expect(DEFAULT_GRAPH_SAMPLING.viewports).toContain(outlier.limit);
          expect(Number.isSafeInteger(outlier.offset) && Number.isSafeInteger(outlier.position) && Number.isSafeInteger(outlier.reads)).toBe(true);
          if (at > 0) expect(outlier.ms).toBeLessThanOrEqual(outliers[at - 1].ms);
        }
      }
    }
  });
});

describe("assessGraphViewReceipt: the exit code is recomputed from the receipt's own measured fields", () => {
  it("a complete, realised receipt with every judged p95 within 20 ms, no cache-hit read and no report mismatch exits 0", () => {
    const receipt = atShape();
    expect(assess(receipt)).toMatchObject({ realised: true, violations: [], contradictions: [], verdict: "within-target", exitCode: 0 });
    expect(assess(receipt).target).toMatchObject({ ms: NAVIGATION_TARGET_MS, statistic: "p95", passes: LABELS, regimes: [...regimes] });
  });

  it("a fast receipt below the W21 shape exits 2, whatever its timings say", () => {
    const fast = copyOf(atShape());
    fast.fixture = { ...copyOf(smallRun()).fixture };
    expect(assess(fast)).toMatchObject({ realised: false, verdict: "not-w21-shape", exitCode: 2 });
    expect(assess(fast).violations.map(violation => violation.rule)).toContain("operations-below-10000");
  });

  it("a judged p95 over 20 ms is a recorded finding (exit 1), named by pass, regime and series", () => {
    const slow = atShape();
    slow.passes["maxQuery-100"].regimes["neighborhood-change"].build["page-v100"].p95 = NAVIGATION_TARGET_MS + 5;
    expect(assess(slow)).toMatchObject({ realised: true, verdict: "over-target", exitCode: 1 });
    expect(assess(slow).target.over).toEqual(["maxQuery-100/neighborhood-change/page-v100"]);
  });

  it("a cache-hit build that read a relation page is a recorded finding (exit 1)", () => {
    const reading = atShape();
    reading.passes["maxQuery-40"].regimes["cache-hit"].relationReads.buildsAboveZero = 1;
    expect(assess(reading)).toMatchObject({ realised: true, verdict: "cache-hit-reads", exitCode: 1 });
    expect(assess(reading).target.cacheHitReads).toEqual(["maxQuery-40: 1 cache-hit builds read a relation page"]);
  });

  it("a builder report of relation reads that differs from the counted reads is a recorded finding (exit 1)", () => {
    const mismatched = atShape();
    mismatched.passes["maxQuery-100"].regimes["neighborhood-change"].relationReads.reportedMismatch = 2;
    expect(assess(mismatched)).toMatchObject({ realised: true, verdict: "report-mismatch", exitCode: 1 });
    expect(assess(mismatched).target.reportMismatches).toEqual(["maxQuery-100: 2 builds report relation reads that differ from the counted reads"]);
  });

  it("fewer than 1,000 samples in one regime of one request shape is not the W21 claim (exit 2)", () => {
    const thin = atShape();
    thin.passes["maxQuery-40"].regimes.cold.samplesByShape.focus = MIN_SAMPLES - 1;
    expect(assess(thin)).toMatchObject({ realised: false, exitCode: 2 });
    expect(assess(thin).violations).toEqual([{ rule: "samples-below-1000", detail: `maxQuery-40/cold/focus: ${MIN_SAMPLES - 1} samples; W21 needs >= ${MIN_SAMPLES}` }]);
  });

  it("a neighborhood change that did not move the topology is not the regime it claims (exit 2)", () => {
    const unmoved = atShape();
    const change = unmoved.passes["maxQuery-40"].regimes["neighborhood-change"].change;
    if (change === undefined) throw new Error("the change regime carries no change record");
    change.notApplied = 1;
    expect(assess(unmoved)).toMatchObject({ realised: false, exitCode: 2 });
    expect(assess(unmoved).violations.map(violation => violation.rule)).toEqual(["neighborhood-change-not-applied"]);
  });

  it("a pass that did not retain the whole fixture is not the W21 claim (exit 2)", () => {
    const truncated = atShape();
    truncated.passes["maxQuery-100"].retained.edges = truncated.passes["maxQuery-100"].offered.edges - 1;
    expect(assess(truncated)).toMatchObject({ realised: false, exitCode: 2 });
    expect(assess(truncated).violations.map(violation => violation.rule)).toEqual(["pass-truncated"]);
  });

  it("an unsampled series is not the W21 claim (exit 2)", () => {
    const unsampled = atShape();
    unsampled.passes["maxQuery-40"].regimes["cache-hit"].build["focus-v30"] = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled)).toMatchObject({ realised: false, exitCode: 2 });
    expect(assess(unsampled).violations).toEqual([{ rule: "series-not-sampled", detail: "maxQuery-40/cache-hit/focus-v30 has no samples" }]);
  });

  it.each([
    ["revision", (receipt: Receipt) => Reflect.deleteProperty(receipt, "revision")],
    ["cpus", (receipt: Receipt) => Reflect.deleteProperty(receipt, "cpus")],
    ["fixture.realised", (receipt: Receipt) => Reflect.deleteProperty(receipt.fixture, "realised")],
    ["passes.maxQuery-40.regimes.cold.outliers", (receipt: Receipt) => Reflect.deleteProperty(receipt.passes["maxQuery-40"].regimes.cold, "outliers")],
    ["passes.maxQuery-100.regimes.cache-hit.build.overall", (receipt: Receipt) => Reflect.deleteProperty(receipt.passes["maxQuery-100"].regimes["cache-hit"].build, "overall")],
    ["passes.maxQuery-40.regimes.neighborhood-change.references.max", (receipt: Receipt) =>
      Reflect.deleteProperty(receipt.passes["maxQuery-40"].regimes["neighborhood-change"].references, "max")],
    ["passes.maxQuery-100", (receipt: Receipt) => Reflect.deleteProperty(receipt.passes, "maxQuery-100")],
  ] as const)("a receipt missing %s is incomplete and exits 2", (path, remove) => {
    const receipt = atShape();
    expect(remove(receipt)).toBe(true);
    const assessment = assess(receipt);
    expect(assessment.exitCode).toBe(2);
    expect(assessment.violations).toContainEqual({ rule: "receipt-field-missing", detail: path });
  });

  it("a pass flag that contradicts the measurements is listed as a contradiction; the exit code follows the measurements", () => {
    const flagged = atShape();
    flagged.passes["maxQuery-40"].pass = false;
    expect(assess(flagged)).toMatchObject({ exitCode: 0, contradictions: [{ rule: "pass-flag-contradicts-measurement", detail: "maxQuery-40: pass=false but the measurements say true" }] });
  });
});

describe("W21-H graph-view grouped bench: the sampled functions are the compiled graph view and no production cap moves", () => {
  const cli = readRepo("qa/workbench/graph-view-grouped-bench.mjs");

  it("the CLI loads the projection and the graph view from the compiled dist/ only, and imports no src/ module", () => {
    const dynamic = [...cli.matchAll(/await import\('([^']+)'\)/g)].map(match => match[1]);
    expect(dynamic).toEqual(["../../dist/workbench/observation.js", "../../dist/workbench/graph-view.js"]);
    expect(cli).toMatch(/const \{buildGraphView, createGraphViewBuilder\} = await import\('\.\.\/\.\.\/dist\/workbench\/graph-view\.js'\);/);
    expect(cli).toContain("graphView: {buildGraphView, createGraphViewBuilder},");
    const statics = [...cli.matchAll(/^import [^;]*? from '([^']+)';$/gms)].map(match => match[1]);
    expect(statics).toEqual(["node:fs", "node:os", "node:url", "./bench-revision.mjs", "./grouped-fixture.mjs"]);
    expect([...dynamic, ...statics].filter(specifier => specifier.includes("/src/"))).toEqual([]);
  });

  it("the timed region is one call between two performance.now() readings; nothing reads the wall clock or an unseeded random source", () => {
    expect(cli).toContain("const clock = () => performance.now();");
    expect(cli).toMatch(/const begin = clock\(\);\n {4}const model = call\(\);\n {4}const ms = clock\(\) - begin;/);
    // clock() is read exactly twice, and both readings bracket the one call; no other timing API appears anywhere.
    expect([...cli.matchAll(/\bclock\(\)/g)]).toHaveLength(2);
    expect([...cli.matchAll(/= \(\) => performance\.now\(\);/g)]).toHaveLength(1);
    expect(cli).not.toMatch(/Date\.now|Math\.random|hrtime/);
    expect([...cli.matchAll(/new Date\(([^)]*)\)/g)].map(match => match[1])).toEqual(["FIXTURE_EPOCH_MS", ""]);
    expect(cli).toContain("utc: new Date().toISOString(),");
  });

  it("the second pass spreads maxQuery 100 over BENCH_ONLY_LIMITS locally, and the bench-only limits are as grouped-fixture.mjs defines them", () => {
    expect(passLimits["maxQuery-40"]).toBe(BENCH_ONLY_LIMITS);
    expect(passLimits["maxQuery-100"]).toEqual({ ...BENCH_ONLY_LIMITS, maxQuery: 100 });
    expect(BENCH_ONLY_LIMITS).toEqual({ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 });
    expect(readRepo("qa/workbench/grouped-fixture.mjs")).toContain(
      "export const BENCH_ONLY_LIMITS = Object.freeze({maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40});",
    );
  });

  it("production caps and graph-view defaults in src/ are unchanged, and the defaults the bench leaves in force are the source's", () => {
    expect(readRepo("src/workbench/observation.ts")).toContain(
      "const MAX_DEFAULT = {maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100};",
    );
    const graphView = readRepo("src/workbench/graph-view.ts");
    for (const line of [
      "const MAX_WINDOW = 100;",
      "const DEFAULT_NODES = 60;",
      "const DEFAULT_FAN_OUT = 8;",
      "const MAX_FAN_OUT = 40;",
      "const DEFAULT_RELATIONS = 40;",
      "const MAX_RELATIONS = 100;",
      "const DEFAULT_REFERENCES = 50;",
      "const MAX_REFERENCES = 200;",
    ]) {
      expect(graphView, line).toContain(line);
    }
    expect(MODEL_DEFAULTS).toEqual({ maxFanOut: 8, maxReferences: 50 });
    for (const limit of DEFAULT_GRAPH_SAMPLING.viewports) expect(limit).toBeLessThanOrEqual(100);
  });

  it("registers graph-view-grouped-bench as one additive Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.graph-view-grouped-bench\]\ncommand = "node qa\/workbench\/graph-view-grouped-bench\.mjs"\ntimeout = 300\n/);
    expect([...toml.matchAll(/^\[build\.commands\.graph-view-grouped-bench\]$/gm)]).toHaveLength(1);
    const gate = /^gate = \[([^\]]*)\]$/m.exec(toml)?.[1] ?? "";
    expect(gate).toBe('"lint", "typing", "build", "test", "census", "workbench-shell", "package-smoke"');
    expect(gate).not.toContain("graph-view-grouped-bench");
  });
});
