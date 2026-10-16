/** W21 (wb-9x5.7): grouped-10k timeline lane-model build receipt, honest exit semantics, production caps unchanged.
 * Measurement-only: the core module takes the projection class and buildTimelineLanes as arguments, the CLI drives the
 * compiled dist/, and no production cap moves.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
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
  assessTimelineReceipt,
  MIN_SAMPLES_PER_PASS,
  NOTE_VOCABULARY,
  PASS_LIMITS,
  runTimelineBench,
  TIMELINE_BENCHMARK,
  TIMELINE_RECEIPT_CONTRACT,
  timelineExitCodeFor,
} from "../qa/workbench/timeline-grouped-core.mjs";
import { ObservationProjection } from "../src/workbench/observation.js";
import { buildTimelineLanes, type TimelineModel, type TimelineRequest } from "../src/workbench/timeline.js";

type PassLabel = "maxQuery-40" | "maxQuery-100";
interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Pass {
  label: PassLabel;
  limits: Record<string, number>;
  constructorArgs: number;
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; events: number; edges: number };
  truncation: { truncated: boolean; nodesNotRetained: number; edgesNotRetained: number };
  rows: number;
  samples: number;
  build: Record<string, Distribution> & { byPan: Record<string, Distribution> };
  relationReads: { perBuild: { p50: number | null; max: number | null }; total: number; rowsReturned: number; buildsExceedingRows: number };
  relationPages: {
    requestedLimit: number;
    pages: number;
    atRequestedLimit: number;
    atRequestedLimitRate: number;
    atMaxQuery: number;
    atMaxQueryRate: number;
    label: string;
    incoming: { rows: number; atMaxQuery: number; atMaxQueryRate: number; maxObserved: number; cap: number };
  };
  truncatedRates: { relations: number; window: number; rows: number; lanes: number };
  notes: { histogram: Record<string, number>; unknownCodes: number; rates: Record<string, number> };
  lanesPerModel: { p50: number | null; max: number | null };
  rowsPerLaneMax: number;
  concurrencyMaxMeasured: number;
  spanCompleteRate: number;
  outliers: Array<{ ms: number; offset: number; zoom: number; pan: number; columns: number }>;
  over: string[];
  pass: boolean;
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
  fixture: ReturnType<typeof defaultShape>;
  sampling: {
    limit: number;
    zooms: number[];
    pans: number[];
    columns: number[];
    rounds: number;
    defaults: { maxLanes: number; maxRowsPerLane: number; relationLimit: number };
    warmupSamples: number;
  };
  passes: Record<PassLabel, Pass>;
  pass: boolean;
  target: { ms: number; statistic: string; passes: string[]; over: string[]; readsExceedingRows: string[] };
  realised: boolean;
  violations: Violation[];
  inconsistencies: Violation[];
  verdict: string;
  exitCode: number;
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
type Builder = (reader: Parameters<typeof buildTimelineLanes>[0], request: TimelineRequest) => TimelineModel;

const build = buildGroupedFixture as (options?: Partial<{ seed: number; nodes: number; depth: number; ticks: number }>) => Fixture;
const run = runTimelineBench as unknown as (input: {
  Projection: new (limits?: Record<string, number>) => ObservationProjection;
  buildTimelineLanes: Builder;
  fixture: Fixture;
  host: Host;
  sampling?: { rounds?: number };
}) => Receipt;
const assess = assessTimelineReceipt as (receipt: Receipt | Record<string, unknown>) => {
  realised: boolean;
  violations: Violation[];
  inconsistencies: Violation[];
  verdict: string;
  exitCode: number;
  target: Receipt["target"];
};
const exitCode = timelineExitCodeFor as (receipt: Receipt | Record<string, unknown>) => number;
const shapeCheck = assessFixtureShape as (shape: FixtureShape) => { realised: boolean };
const passLimits = PASS_LIMITS as Record<PassLabel, Record<string, number>>;
const notes = NOTE_VOCABULARY as readonly string[];
const minSamples = MIN_SAMPLES_PER_PASS as number;
const targetMs = NAVIGATION_TARGET_MS as number;
const benchLimits = BENCH_ONLY_LIMITS as Record<string, number>;
const scope = SCOPE as { workspace: string; principal: string };
const invocation = INVOCATION_ID as string;
const defaults = GROUPED_FIXTURE_DEFAULTS as { seed: number; nodes: number; depth: number; ticks: number };

const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-timeline-grouped-bench.test.ts",
  overrides: {},
};
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
let cachedDefault: Fixture | undefined;
const defaultShape = (): FixtureShape => {
  cachedDefault ??= build({ ...defaults });
  return cachedDefault.shape;
};

interface SmallRun {
  receipt: Receipt;
  constructed: Array<Record<string, number> | undefined>;
  built: TimelineRequest[];
}
let cachedSmall: SmallRun | undefined;
const smallRun = (): SmallRun => {
  if (cachedSmall) return cachedSmall;
  const constructed: Array<Record<string, number> | undefined> = [];
  const built: TimelineRequest[] = [];
  class SpyProjection extends ObservationProjection {
    constructor(limits?: Record<string, number>) {
      super(limits);
      constructed.push(limits);
    }
  }
  const spy: Builder = (reader, request) => {
    built.push(request);
    return buildTimelineLanes(reader, request);
  };
  const receipt = run({
    Projection: SpyProjection,
    buildTimelineLanes: spy,
    fixture: build({ seed: 5, nodes: 2_400, depth: 5, ticks: 150 }),
    host: HOST,
    sampling: { rounds: 2 },
  });
  cachedSmall = { receipt, constructed, built };
  return cachedSmall;
};
/** A copy of the real small receipt whose fixture and sample counts are those of a realised, fast W21 run. */
const realisedFast = (): Receipt => {
  const copy: Receipt = structuredClone(smallRun().receipt);
  copy.fixture = { ...defaultShape(), realised: true } as Receipt["fixture"];
  for (const pass of Object.values(copy.passes)) {
    pass.samples = 3_000;
    pass.relationReads.buildsExceedingRows = 0;
    pass.pass = true;
    for (const [name, value] of Object.entries(pass.build)) {
      if (name === "byPan") continue;
      (value as Distribution).p95 = 1;
    }
  }
  copy.pass = true;
  return copy;
};
const finite = (value: Distribution): boolean =>
  value.samples > 0 && [value.p50, value.p95, value.max].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0) && (value.p50 ?? 0) <= (value.p95 ?? 0) && (value.p95 ?? 0) <= (value.max ?? 0);

describe("W21 timeline receipt: shape and completeness (C1/C2)", () => {
  it("names its contract, benchmark and pure-lane-model scope, and is JSON-lossless", () => {
    const { receipt } = smallRun();
    expect(TIMELINE_RECEIPT_CONTRACT).toBe("workbench.timeline-grouped-bench/v1");
    expect(receipt.contract).toBe(TIMELINE_RECEIPT_CONTRACT);
    expect(TIMELINE_BENCHMARK).toBe("timeline-grouped-10k");
    expect(receipt.benchmark).toBe(TIMELINE_BENCHMARK);
    expect(receipt.measured).toBe(true);
    expect(receipt.scopeLabel).toMatch(/no layoutInspector call/);
    expect(receipt.scopeLabel).toMatch(/no redraw claim/);
    expect(JSON.parse(JSON.stringify(receipt))).toEqual(receipt);
  }, 120_000);

  it("carries host, toolchain, command, overrides, fixture shape and sampling plan", () => {
    const { receipt } = smallRun();
    expect({
      utc: receipt.utc,
      revision: receipt.revision,
      node: receipt.node,
      arch: receipt.arch,
      platform: receipt.platform,
      cpus: receipt.cpus,
      cpuModel: receipt.cpuModel,
      toolchain: receipt.toolchain,
      command: receipt.command,
      overrides: receipt.overrides,
    }).toEqual(HOST);
    expect(receipt.fixture.nodes).toBe(2_400);
    expect(receipt.sampling).toMatchObject({
      limit: 100,
      zooms: [1, 2, 4, 8],
      pans: [0, 10, 100],
      columns: [80, 120],
      rounds: 2,
      defaults: { maxLanes: 16, maxRowsPerLane: 40, relationLimit: 40 },
      warmupSamples: 0,
    });
  }, 120_000);

  it("runs exactly two passes: the bench-only limits as defined, then the same limits with maxQuery 100", () => {
    const { receipt, constructed } = smallRun();
    expect(Object.keys(receipt.passes).sort()).toEqual(["maxQuery-100", "maxQuery-40"]);
    expect(constructed).toEqual([
      { maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 },
      { maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 100 },
    ]);
    expect(passLimits["maxQuery-40"]).toEqual(benchLimits);
    expect(passLimits["maxQuery-100"]).toEqual({ ...benchLimits, maxQuery: 100 });
    expect(benchLimits.maxQuery).toBe(40);
    expect(Object.isFrozen(BENCH_ONLY_LIMITS)).toBe(true);
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) expect(receipt.passes[label].constructorArgs).toBe(1);
  }, 120_000);

  it("samples every offset x zoom x pan x column combination per round with the stated defaults", () => {
    const { receipt, built } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const pass = receipt.passes[label];
      const offsets = Math.ceil(pass.rows / 100);
      expect(pass.samples).toBe(offsets * 4 * 3 * 2 * 2);
      expect(pass.rows).toBeGreaterThan(2_400);
    }
    const first = built[0];
    expect(first).toMatchObject({ scope, invocationId: invocation, offset: 0, limit: 100, zoom: 1, pan: 0, columns: 80 });
    expect(Object.keys(first ?? {}).sort()).toEqual(["columns", "invocationId", "limit", "offset", "pan", "scope", "zoom"]);
    expect(new Set(built.map(request => request.zoom))).toEqual(new Set([1, 2, 4, 8]));
    expect(new Set(built.map(request => request.pan))).toEqual(new Set([0, 10, 100]));
    expect(new Set(built.map(request => request.columns))).toEqual(new Set([80, 120]));
    expect(built.every(request => request.offset % 100 === 0 && request.limit === 100)).toBe(true);
  }, 120_000);

  it("reports p50/p95/max overall and per (zoom, columns), plus the five slowest samples with their request", () => {
    const { receipt } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const pass = receipt.passes[label];
      expect(finite(pass.build.overall)).toBe(true);
      expect(pass.build.overall.samples).toBe(pass.samples);
      for (const zoom of [1, 2, 4, 8]) for (const columns of [80, 120]) expect(finite(pass.build[`z${zoom}c${columns}`] as Distribution)).toBe(true);
      expect(Object.keys(pass.build.byPan).sort()).toEqual(["pan0", "pan10", "pan100"]);
      expect(pass.outliers).toHaveLength(5);
      expect(pass.outliers.map(outlier => outlier.ms)).toEqual([...pass.outliers.map(outlier => outlier.ms)].sort((a, b) => b - a));
      expect(pass.outliers[0]?.ms).toBe(pass.build.overall.max);
      for (const outlier of pass.outliers) {
        expect(outlier).toEqual({
          ms: expect.any(Number),
          offset: expect.any(Number),
          zoom: expect.any(Number),
          pan: expect.any(Number),
          columns: expect.any(Number),
        });
      }
    }
  }, 120_000);

  it("fails a receipt for each missing top-level, fixture or pass field, as exit 2", () => {
    const complete = realisedFast();
    expect(exitCode(complete)).toBe(0);
    for (const field of ["utc", "revision", "node", "arch", "platform", "cpus", "toolchain", "command", "fixture", "sampling", "overrides"] as const) {
      const broken: Record<string, unknown> = structuredClone(complete) as unknown as Record<string, unknown>;
      delete broken[field];
      const assessed = assess(broken);
      expect([field, assessed.exitCode]).toEqual([field, 2]);
      expect(assessed.violations.map(violation => violation.rule)).toContain("receipt-field-missing");
    }
    const noRealised: Record<string, unknown> = structuredClone(complete) as unknown as Record<string, unknown>;
    delete (noRealised.fixture as Record<string, unknown>).realised;
    expect(assess(noRealised).exitCode).toBe(2);
    for (const field of ["samples", "build", "relationReads", "relationPages", "truncatedRates", "notes", "lanesPerModel", "rowsPerLaneMax", "concurrencyMaxMeasured", "spanCompleteRate", "outliers", "pass"] as const) {
      const broken = structuredClone(complete);
      delete (broken.passes["maxQuery-100"] as unknown as Record<string, unknown>)[field];
      expect([field, exitCode(broken)]).toEqual([field, 2]);
    }
  }, 120_000);
});

describe("W21 lane-model contract measured (C3)", () => {
  it("never reads more relation pages than window rows, and records reads per build p50/max", () => {
    const { receipt } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const { relationReads } = receipt.passes[label];
      expect(relationReads.buildsExceedingRows).toBe(0);
      expect(relationReads.total).toBeLessThanOrEqual(relationReads.rowsReturned);
      expect(relationReads.perBuild.max).toBeLessThanOrEqual(100);
      expect(relationReads.perBuild.p50).toBeGreaterThan(0);
      expect(relationReads.perBuild.p50).toBeLessThanOrEqual(relationReads.perBuild.max ?? 0);
    }
  }, 120_000);

  it("records lanes, rows per lane, concurrency, span completeness and the frozen note histogram", () => {
    const { receipt } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const pass = receipt.passes[label];
      expect(pass.lanesPerModel.max).toBeGreaterThan(0);
      expect(pass.lanesPerModel.max).toBeLessThanOrEqual(16);
      expect(pass.lanesPerModel.p50).toBeLessThanOrEqual(pass.lanesPerModel.max ?? 0);
      expect(pass.rowsPerLaneMax).toBeGreaterThan(0);
      expect(pass.rowsPerLaneMax).toBeLessThanOrEqual(40);
      expect(pass.concurrencyMaxMeasured).toBeGreaterThan(0);
      expect(pass.spanCompleteRate).toBeGreaterThanOrEqual(0);
      expect(pass.spanCompleteRate).toBeLessThanOrEqual(1);
      expect(Object.keys(pass.notes.histogram).sort()).toEqual([...notes].sort());
      expect(pass.notes.unknownCodes).toBe(0);
      // phase-kinds-unavailable is a contract constant: a sanity check that the measured function is the lane model.
      expect(pass.notes.histogram["phase-kinds-unavailable"]).toBe(pass.samples);
      expect(pass.notes.rates["phase-kinds-unavailable"]).toBe(1);
    }
    expect(notes).toEqual([
      "clocks-may-differ",
      "open-intervals-present",
      "intervals-missing",
      "stale-rows-present",
      "window-partial",
      "relation-page-full",
      "multiple-parents",
      "rows-outside-viewport",
      "phase-kinds-unavailable",
    ]);
  }, 120_000);
});

describe("W21 truncation rates at maxQuery 40 versus 100 (C4)", () => {
  it("reports truncated.relations, relation-page-full and exact-page rates side by side without judging either", () => {
    const { receipt } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const pass = receipt.passes[label];
      for (const value of Object.values(pass.truncatedRates)) expect(value >= 0 && value <= 1).toBe(true);
      expect(pass.relationPages.requestedLimit).toBe(40);
      expect(pass.relationPages.pages).toBe(pass.relationReads.total);
      expect(pass.relationPages.atRequestedLimitRate).toBeGreaterThanOrEqual(0);
      expect(pass.relationPages.atMaxQueryRate).toBeGreaterThanOrEqual(0);
      expect(pass.relationPages.label).toMatch(/proxy/);
      expect(pass.relationPages.incoming.cap).toBe(passLimits[label].maxQuery);
      expect(pass.relationPages.incoming.rows).toBe(pass.rows);
      // truncated.relations is set exactly when the model saw a full relation page, which is also the note.
      expect(pass.truncatedRates.relations).toBe(pass.notes.rates["relation-page-full"]);
    }
    expect(receipt.target.over).toBeInstanceOf(Array);
  }, 120_000);

  it("retains the whole fixture in both passes, so a rate is about lane cost and not about eviction", () => {
    const { receipt } = smallRun();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const pass = receipt.passes[label];
      expect(pass.truncation).toEqual({ truncated: false, nodesNotRetained: 0, edgesNotRetained: 0 });
      expect(pass.retained.nodes).toBe(pass.offered.nodes);
      expect(pass.retained.edges).toBe(pass.offered.edges);
    }
  }, 120_000);
});

describe("W21 honest exit semantics (C1/C2)", () => {
  it("exits 2 on an off-shape receipt even when every p95 is fast, and names the violated rules", () => {
    const { receipt } = smallRun();
    expect(shapeCheck(receipt.fixture as unknown as FixtureShape).realised).toBe(false);
    expect(receipt.fixture.realised).toBe(false);
    expect(receipt.realised).toBe(false);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.exitCode).toBe(2);
    expect(exitCode(receipt)).toBe(2);
    expect(receipt.violations.map(violation => violation.rule)).toEqual(expect.arrayContaining(["operations-below-10000", "updates-below-100000"]));
    for (const pass of Object.values(receipt.passes)) expect(pass.build.overall.p95).toBeLessThan(targetMs);
  }, 120_000);

  it("exits 0 for a realised, fast, complete receipt; 20 ms itself is within target", () => {
    const receipt = realisedFast();
    expect(shapeCheck(receipt.fixture as unknown as FixtureShape).realised).toBe(true);
    const verdict = assess(receipt);
    expect(verdict).toMatchObject({ realised: true, exitCode: 0, verdict: "within-target", violations: [], inconsistencies: [] });
    receipt.passes["maxQuery-40"].build.z4c120 = { samples: 10, p50: 1, p95: targetMs, max: targetMs };
    expect(exitCode(receipt)).toBe(0);
  }, 120_000);

  it("exits 1 when any judged p95 is over 20 ms, in either pass, naming the series; the receipt is still a measurement", () => {
    const receipt = realisedFast();
    (receipt.passes["maxQuery-100"].build.z8c80 as Distribution).p95 = targetMs + 0.5;
    const verdict = assess(receipt);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.verdict).toBe("over-target");
    expect(verdict.target.over).toEqual(["maxQuery-100/z8c80"]);
    const overall = realisedFast();
    (overall.passes["maxQuery-40"].build.overall as Distribution).p95 = 21;
    expect(exitCode(overall)).toBe(1);
  }, 120_000);

  it("exits 1 as a finding when any build read more relation pages than window rows, however fast", () => {
    const receipt = realisedFast();
    receipt.passes["maxQuery-40"].relationReads.buildsExceedingRows = 1;
    const verdict = assess(receipt);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.verdict).toBe("reads-exceed-rows");
    expect(verdict.target.readsExceedingRows).toEqual(["maxQuery-40"]);
  }, 120_000);

  it("follows the measurements, not a pass flag: a pass claiming true with a p95 over target exits 1 and is flagged inconsistent", () => {
    const receipt = realisedFast();
    (receipt.passes["maxQuery-40"].build.overall as Distribution).p95 = 35;
    receipt.passes["maxQuery-40"].pass = true;
    const verdict = assess(receipt);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.inconsistencies.map(item => item.rule)).toEqual(["pass-flag-contradicts-measurement"]);
    const honest = realisedFast();
    expect(assess(honest).inconsistencies).toEqual([]);
  }, 120_000);

  it("exits 2 below 1,000 samples in either pass, a truncated pass, or an unsampled series, rather than passing by absence", () => {
    expect(minSamples).toBe(1_000);
    const few = realisedFast();
    few.passes["maxQuery-100"].samples = 999;
    expect(exitCode(few)).toBe(2);
    expect(assess(few).violations.map(violation => violation.rule)).toContain("samples-below-1000");
    const enough = realisedFast();
    enough.passes["maxQuery-100"].samples = 1_000;
    expect(exitCode(enough)).toBe(0);
    const truncated = realisedFast();
    truncated.passes["maxQuery-40"].retained = { ...truncated.passes["maxQuery-40"].retained, nodes: truncated.passes["maxQuery-40"].offered.nodes - 1 };
    expect(exitCode(truncated)).toBe(2);
    const unsampled = realisedFast();
    unsampled.passes["maxQuery-40"].build.z2c80 = { samples: 0, p50: null, p95: null, max: null };
    expect(exitCode(unsampled)).toBe(2);
    const shallow = realisedFast();
    shallow.fixture = { ...shallow.fixture, depth: 4, minDepth: 4 } as Receipt["fixture"];
    expect(exitCode(shallow)).toBe(2);
  }, 120_000);
});

describe("W21 live read-count detector and degenerate-comparison labels (respin R1/R4)", () => {
  const doubleReader: Builder = (reader, request) => {
    const model = buildTimelineLanes(reader, request);
    // A second incoming-relation read for every row of the window: the read-count invariant must see it.
    const page = reader.window({ scope: { ...scope }, invocationId: invocation, offset: request.offset, limit: request.limit });
    for (const node of page.nodes.slice(0, request.limit)) reader.relations({ scope: { ...scope }, to: node.key, limit: 1 });
    return model;
  };
  const doubled = (): Receipt =>
    run({
      Projection: ObservationProjection,
      buildTimelineLanes: doubleReader,
      fixture: build({ seed: 5, nodes: 2_400, depth: 5, ticks: 150 }),
      host: HOST,
      sampling: { rounds: 1 },
    });

  it("counts a builder that reads relations twice for one row as exceeding rows, in both passes", () => {
    const receipt = doubled();
    for (const label of ["maxQuery-40", "maxQuery-100"] as const) {
      const { relationReads } = receipt.passes[label];
      expect(relationReads.buildsExceedingRows).toBeGreaterThan(0);
      expect(relationReads.total).toBeGreaterThan(relationReads.rowsReturned);
      expect(receipt.passes[label].pass).toBe(false);
    }
  }, 120_000);

  it("exits 1 with verdict reads-exceed-rows for that builder once the receipt is a realised, fast W21 run", () => {
    const receipt = doubled();
    const realised: Receipt = structuredClone(receipt);
    realised.fixture = { ...defaultShape(), realised: true } as Receipt["fixture"];
    for (const pass of Object.values(realised.passes)) {
      pass.samples = 3_000;
      for (const [name, value] of Object.entries(pass.build)) {
        if (name !== "byPan") (value as Distribution).p95 = 1;
      }
    }
    const verdict = assess(realised);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.verdict).toBe("reads-exceed-rows");
    expect(verdict.target.readsExceedingRows).toEqual(["maxQuery-40", "maxQuery-100"]);
  }, 120_000);

  it("states the degenerate comparison and the span.complete rate in the receipt header, verbatim", () => {
    const header = smallRun().receipt as unknown as Record<string, unknown>;
    expect(header.comparisonLabel).toBe(
      "comparison degenerate at relationLimit 40: timeline.ts requests 40 so both passes issue identical reader calls; the grouped-10k fixture never fills a relation page (incoming maxObserved 4) and every truncation rate is 0 at both caps",
    );
    expect(header.spanCompleteLabel).toBe("span.complete rate 0: every 100-row window holds an open or missing interval");
  });
});

describe("W21 the sampled function is the lane model, timed only around the call (C2)", () => {
  it("calls the injected buildTimelineLanes exactly once per sample and nothing else per sample", () => {
    const { receipt, built } = smallRun();
    expect(built).toHaveLength(receipt.passes["maxQuery-40"].samples + receipt.passes["maxQuery-100"].samples);
  }, 120_000);

  it("reads no wall clock and no unseeded randomness; the only clock is performance.now around the call", () => {
    for (const path of ["qa/workbench/timeline-grouped-core.mjs", "qa/workbench/timeline-grouped-bench.mjs"]) {
      const text = readRepo(path);
      expect(text).not.toMatch(/Math\.random|Date\.now|hrtime/);
    }
    const core = readRepo("qa/workbench/timeline-grouped-core.mjs");
    expect(core).toMatch(/const clock = \(\) => performance\.now\(\);/);
    const begin = core.indexOf("const begin = clock();");
    const call = core.indexOf("buildTimelineLanes(counting.reader, request)", begin);
    const end = core.indexOf("const ms = clock() - begin;", call);
    expect(begin).toBeGreaterThan(-1);
    expect(call).toBeGreaterThan(begin);
    expect(end).toBeGreaterThan(call);
    // Nothing but the call sits inside the timed region.
    expect(core.slice(begin, end).split("\n").filter(line => line.trim() !== "")).toHaveLength(2);
    expect(core.match(/clock\(\)/g)?.length).toBe(2);
  });

  it("keeps the CLI thin: dist imports only, the dist buildTimelineLanes, receipt written and printed before the exit code", () => {
    const text = readRepo("qa/workbench/timeline-grouped-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(
      ["../../dist/workbench/observation.js", "../../dist/workbench/timeline.js", "./bench-revision.mjs", "./grouped-fixture.mjs", "./timeline-grouped-core.mjs", "node:fs", "node:os"].sort(),
    );
    expect(text).toMatch(/import \{buildTimelineLanes\} from '\.\.\/\.\.\/dist\/workbench\/timeline\.js';/);
    expect(text).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(text).not.toMatch(/maxNodes|maxEdges|\bmaxQuery\s*:|new ObservationProjection|layoutInspector/);
    expect(text).toMatch(/W21_TIMELINE_RECEIPT/);
    const written = text.indexOf("writeFileSync(process.env.W21_TIMELINE_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = timelineExitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
    expect(text).toMatch(/process\.exit\(3\)/);
    expect(text).toMatch(/\$W21_REVISION|W21_REVISION/);
  });

  it("does not import the inspector or the layout in the core, and reuses the fixture module without forking it", () => {
    const core = readRepo("qa/workbench/timeline-grouped-core.mjs");
    const specifiers = [...core.matchAll(/from\s+['"]([^'"]+)['"]/g)].map(match => match[1]);
    expect(specifiers).toEqual(["./grouped-fixture.mjs"]);
    expect(core).not.toMatch(/function seeded|function buildGroupedFixture/);
    expect(core).toMatch(/BENCH_ONLY_LIMITS/);
  });
});

describe("W21 production caps unchanged (C5, measurement-only falsifier)", () => {
  it("pins observation.ts MAX_DEFAULT and the timeline.ts zoom and relation constants by their source text", () => {
    const observation = readRepo("src/workbench/observation.ts");
    expect(observation).toMatch(/const MAX_DEFAULT = \{maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100\};/);
    const timeline = readRepo("src/workbench/timeline.ts");
    expect(timeline).toMatch(/^const MAX_ZOOM = 8;$/m);
    expect(timeline).toMatch(/^const MAX_RELATIONS = 100;$/m);
    expect(timeline).toMatch(/^const DEFAULT_RELATIONS = 40;$/m);
  });

  it("behaves at those caps: a default projection holds 2,000 nodes and answers a relation page of at most 100", () => {
    const projection = new ObservationProjection();
    const stamp = "2026-10-15T00:00:00Z";
    const ref = (id: number) => ({ provider: "forge", type: "operation", id: String(id) });
    const node = { title: "cap probe", type: "sdk-operation" as const, statusText: "RUNNING", statusTone: "active" as const };
    for (let i = 0; i < 2_001; i++) projection.refresh({ source: ref(i), scope, capturedAt: stamp, observedAt: stamp, node });
    expect(projection.stats().nodes).toBe(2_000);
    for (let i = 0; i < 150; i++) projection.relate({ scope, from: ref(i + 1), to: ref(0), kind: "grouping", provenance: { source: "cap-probe" } });
    const key = JSON.stringify([scope.workspace, scope.principal, "forge", "operation", "", "0"]);
    expect(projection.relations({ scope, to: key, limit: 100 })).toHaveLength(100);
    expect(projection.relations({ scope, to: key })).toHaveLength(100);
  });

  it("keeps the bench-only limits in qa/ only: no src/ literal raises a cap, and the maxQuery spread is local to the core", () => {
    const root = new URL("../src/", import.meta.url);
    const raised: string[] = [];
    for (const entry of readdirSync(root, { recursive: true })) {
      const file = String(entry);
      if (!file.endsWith(".ts")) continue;
      const text = readFileSync(join(root.pathname, file), "utf8");
      if (/BENCH_ONLY_LIMITS|PASS_LIMITS|timeline-grouped|grouped-fixture/.test(text)) raised.push(`${file}: bench symbol`);
      for (const match of text.matchAll(/\bmax(Nodes|Edges)\s*:\s*([\d_]+)/g)) {
        const value = Number((match[2] ?? "0").replaceAll("_", ""));
        if ((match[1] === "Nodes" && value > 2_000) || (match[1] === "Edges" && value > 4_000)) raised.push(`${file}: ${match[0]}`);
      }
    }
    expect(raised).toEqual([]);
    const core = readRepo("qa/workbench/timeline-grouped-core.mjs");
    expect(core).toMatch(/\{\.\.\.BENCH_ONLY_LIMITS, maxQuery: 100\}/);
    const fixtureText = readRepo("qa/workbench/grouped-fixture.mjs");
    expect(fixtureText).toMatch(/BENCH_ONLY_LIMITS = Object\.freeze\(\{maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40\}\);/);
    expect([...fixtureText.matchAll(/\bmaxNodes\b/g)]).toHaveLength(1);
  });
});

describe("W21 Forge registration (C6)", () => {
  it("registers timeline-grouped-bench as one additive Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.timeline-grouped-bench\]\ncommand = "node qa\/workbench\/timeline-grouped-bench\.mjs"\ntimeout = 300\n/);
    expect(toml.match(/\[build\.commands\.timeline-grouped-bench\]/g)).toHaveLength(1);
    expect(/^gate = \[([^\]]*)\]/m.exec(toml)?.[1]).toBe('"lint", "typing", "build", "test", "workbench-shell", "package-smoke"');
    expect(toml).toMatch(/\[build\.commands\.inspector-grouped-bench\]\ncommand = "node qa\/workbench\/inspector-grouped-bench\.mjs"\ntimeout = 300\n/);
  });
});
