/** W21-K / VC-5 (wb-9x5.13): attention report build receipt over the grouped-10k fixture.
 * Measurement-only: the bench is pure ESM that takes the projection class and selectAttention as arguments, the CLI
 * loads compiled dist/ only, and no production cap or src file moves.
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ATTENTION_RECEIPT_CONTRACT,
  assessAttentionReceipt,
  DISCONNECT_CYCLE,
  exitCodeFor,
  MAX_PAIR_READS,
  MIN_SAMPLES_PER_PASS,
  PASSES,
  runAttentionBench,
  SAMPLE_EVERY,
  SETTINGS,
} from "../qa/workbench/attention-grouped-bench.mjs";
import { BENCH_ONLY_LIMITS, buildGroupedFixture, FIXTURE_EPOCH_MS, NAVIGATION_TARGET_MS } from "../qa/workbench/grouped-fixture.mjs";
import {
  ATTENTION_TRACE_REASONS,
  type AttentionInput,
  type AttentionReport,
  selectAttention,
} from "../src/workbench/attention.js";
import { ObservationProjection } from "../src/workbench/observation.js";

interface Violation { rule: string; detail: string }
interface Dist { samples: number; p50: number | null; p95: number | null; max: number | null }
interface Series { p50: number | null; max: number | null }
interface SettingResult {
  label: string;
  bottlenecks: number;
  clockLagMs: number;
  samples: number;
  build: Dist;
  reads: {
    queryCallsPerReport: Series;
    relationsCallsPerReport: Series;
    maxRowsPerCall: number;
    reportsWithRowsOverPageCap: number;
    reportsOverRelationsBound: number;
    reportsWithQueryCallsNotOne: number;
  };
  examinedNodes: Series;
  truncatedRate: number | null;
  criticalPath: {
    partialEstimatedRate: number | null;
    incompleteTraceRate: number | null;
    traceReasonReports: Record<string, number>;
    traceReasonRates: Record<string, number | null>;
  };
  counts: Record<string, Series>;
  unmeasured: Series;
  clockSkew: Series;
  disconnectedProviders: { cardinality: Series };
}
interface PassResult {
  label: string;
  limits: { maxNodes: number; maxEdges: number; maxEvents: number; maxQuery: number };
  sampleEvery: number;
  sampleTicks: number;
  samples: number;
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; events: number; edges: number };
  settings: SettingResult[];
  slowest: { ms: number; tick: number; setting: string }[];
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
  pinnedCaps: Record<string, number | string>;
}
interface Receipt extends Omit<Host, "pinnedCaps"> {
  contract: string;
  benchmark: string;
  measured: boolean;
  productionCaps: Record<string, number | string>;
  fixture: Record<string, number | string | Record<string, number>>;
  sampling: { limit: number; minSamplesPerPass: number; sampleEvery: number; maxPairReads: number; settings: unknown[]; disconnectCycle: unknown; clock: string };
  passes: PassResult[];
  target: { ms: number; statistic: string; judged: string[]; over: string[]; readsViolations: string[] };
  realised: boolean;
  violations: Violation[];
  verdict: string;
  exitCode: number;
}
type Selector = (projection: Parameters<typeof selectAttention>[0], input: AttentionInput) => AttentionReport;

const run = runAttentionBench as (input: {
  Projection: typeof ObservationProjection;
  selectAttention: Selector;
  reasonNames: string[];
  fixture: ReturnType<typeof buildGroupedFixture>;
  host: Host;
}) => Receipt;
const assess = assessAttentionReceipt as (receipt: unknown) => { realised: boolean; violations: Violation[]; verdict: string; exitCode: number; target: Receipt["target"] };
const exitCode = exitCodeFor as (receipt: unknown) => number;
const build = buildGroupedFixture as (options?: { seed?: number; nodes?: number; depth?: number; ticks?: number }) => ReturnType<typeof buildGroupedFixture>;

const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-attention-grouped-bench.test.ts",
  pinnedCaps: { observationMaxQuery: 100, attentionDefaultLimit: 100, attentionMaxLimit: 100, attentionDefaultBottlenecks: 5, attentionMaxBottlenecks: 20 },
};
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const W21_SHAPE = {
  contract: "workbench.grouped-fixture/v1", seed: 21, nodes: 10_000, groups: 400, snapshots: 10_400, depth: 5, minDepth: 5,
  groupingEdges: 10_400, dependencyEdges: 1_400, hypothesisEdges: 700, ownershipEdges: 0, causationEdges: 0, updates: 101_000, ticks: 2_000,
  minChangesPerTick: 1, maxChangesPerTick: 100, providers: { forge: 3_334 },
};
const REASONS = [...ATTENTION_TRACE_REASONS];

const dist = (p95: number): Dist => ({ samples: 1_000, p50: p95 / 2, p95, max: p95 * 2 });
const series: Series = { p50: 1, max: 2 };
function settingFor(label: string, p95: number): SettingResult {
  return {
    label, bottlenecks: 5, clockLagMs: 0, samples: 1_000, build: dist(p95),
    reads: { queryCallsPerReport: { p50: 1, max: 1 }, relationsCallsPerReport: series, maxRowsPerCall: 40, reportsWithRowsOverPageCap: 0, reportsOverRelationsBound: 0, reportsWithQueryCallsNotOne: 0 },
    examinedNodes: series, truncatedRate: 1,
    criticalPath: { partialEstimatedRate: 0, incompleteTraceRate: 1, traceReasonReports: {}, traceReasonRates: {} },
    counts: {}, unmeasured: series, clockSkew: series, disconnectedProviders: { cardinality: series },
  };
}
function passFor(label: string, p95: number): PassResult {
  return {
    label, limits: { ...BENCH_ONLY_LIMITS }, sampleEvery: 2, sampleTicks: 1_000, samples: 4_000,
    offered: { nodes: 10_400, edges: 12_000, updates: 101_000 }, retained: { nodes: 10_400, events: 128, edges: 12_000 },
    settings: SETTINGS.map(setting => settingFor(setting.label, p95)), slowest: [],
  };
}
function fakeReceipt(p95: number): Receipt {
  const base = {
    ...HOST, contract: ATTENTION_RECEIPT_CONTRACT, benchmark: "attention-grouped-10k", measured: true, productionCaps: HOST.pinnedCaps,
    fixture: structuredClone(W21_SHAPE), passes: PASSES.map(pass => passFor(pass.label, p95)),
  };
  return base as unknown as Receipt;
}

let smallCache: { receipt: Receipt; calls: AttentionInput[] } | undefined;
function smallRun(): { receipt: Receipt; calls: AttentionInput[] } {
  if (smallCache) return smallCache;
  const calls: AttentionInput[] = [];
  const spy: Selector = (projection, input) => {
    calls.push(input);
    return selectAttention(projection, input);
  };
  const fixture = build({ nodes: 240, depth: 5, ticks: 130 });
  smallCache = { receipt: run({ Projection: ObservationProjection, selectAttention: spy, reasonNames: REASONS, fixture, host: HOST }), calls };
  return smallCache;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("W21-K attention receipt: shape and completeness (spec: Receipt)", () => {
  it("states the contract, host, toolchain and pinned production caps, and runs both passes at their query caps", () => {
    const { receipt } = smallRun();
    expect(ATTENTION_RECEIPT_CONTRACT).toBe("workbench.attention-grouped-bench/v1");
    expect(receipt.contract).toBe(ATTENTION_RECEIPT_CONTRACT);
    expect(receipt.measured).toBe(true);
    for (const field of ["utc", "revision", "node", "arch", "platform", "cpus", "cpuModel", "toolchain", "command", "fixture", "productionCaps"] as const) {
      expect(receipt[field]).toBeDefined();
    }
    expect(receipt.passes.map(pass => pass.label)).toEqual(["maxQuery-40", "maxQuery-100"]);
    expect(receipt.passes[0].limits).toEqual({ ...BENCH_ONLY_LIMITS });
    expect(receipt.passes[1].limits).toEqual({ ...BENCH_ONLY_LIMITS, maxQuery: 100 });
    expect(BENCH_ONLY_LIMITS.maxQuery).toBe(40);
  });

  it("records, per pass and setting, every series the bead lists", () => {
    const { receipt } = smallRun();
    expect(SETTINGS.map(setting => setting.bottlenecks)).toEqual(expect.arrayContaining([5, 20]));
    for (const pass of receipt.passes) {
      expect(pass.settings.map(setting => setting.label)).toEqual(SETTINGS.map(setting => setting.label));
      expect(pass.slowest.length).toBeGreaterThan(0);
      expect(pass.slowest.length).toBeLessThanOrEqual(5);
      for (const item of pass.slowest) {
        expect(Number.isInteger(item.tick)).toBe(true);
        expect(typeof item.setting).toBe("string");
      }
      for (const setting of pass.settings) {
        expect(setting.build.p50).not.toBeNull();
        expect(setting.build.p95).not.toBeNull();
        expect(setting.build.max).not.toBeNull();
        expect(setting.reads.queryCallsPerReport.max).toBe(1);
        expect(setting.reads.relationsCallsPerReport.max).not.toBeNull();
        expect(setting.reads.maxRowsPerCall).toBeLessThanOrEqual(pass.limits.maxQuery);
        expect(setting.reads.reportsWithRowsOverPageCap).toBe(0);
        expect(setting.truncatedRate).not.toBeNull();
        expect(setting.criticalPath.partialEstimatedRate).not.toBeNull();
        expect(setting.criticalPath.incompleteTraceRate).not.toBeNull();
        expect(Object.keys(setting.criticalPath.traceReasonReports).sort()).toEqual([...REASONS].sort());
        for (const name of ["active", "waiting", "stale", "unknown", "disconnected"]) expect(setting.counts[name]).toBeDefined();
        expect(setting.unmeasured.max).not.toBeNull();
        expect(setting.clockSkew.max).not.toBeNull();
        expect(setting.disconnectedProviders.cardinality.max).not.toBeNull();
      }
    }
  });

  it("measures the page cap in force: a 40-row projection truncates the 100-row page, a 100-row projection does not", () => {
    const { receipt } = smallRun();
    const [narrow, wide] = receipt.passes;
    for (const setting of narrow.settings) {
      expect(setting.examinedNodes.max).toBeLessThanOrEqual(40);
      expect(setting.truncatedRate).toBe(1);
      expect(setting.criticalPath.traceReasonReports.truncated).toBe(setting.samples);
    }
    for (const setting of wide.settings) expect(setting.examinedNodes.max).toBeGreaterThan(40);
  });

  it("samples while churn is applied: at least one sample per second tick, across both bottleneck settings, with a disconnect cycle", () => {
    const { receipt } = smallRun();
    expect(SAMPLE_EVERY).toBe(2);
    expect(DISCONNECT_CYCLE.disconnectAt).toBeLessThan(DISCONNECT_CYCLE.reconnectAt);
    expect(DISCONNECT_CYCLE.reconnectAt).toBeLessThan(DISCONNECT_CYCLE.period);
    for (const pass of receipt.passes) {
      expect(pass.sampleTicks).toBe(65);
      expect(pass.samples).toBe(65 * SETTINGS.length);
    }
  });
});

describe("W21-K attention receipt: fixture-derived clock and the timed function (spec: input.now, no Date.now)", () => {
  it("passes a fixture-derived now at limit 100 with bottlenecks 5 and 20 to the injected selector", () => {
    const { calls } = smallRun();
    expect(calls.length).toBeGreaterThan(0);
    const bottlenecks = new Set(calls.map(call => call.bottlenecks));
    expect([...bottlenecks].sort((a, b) => (a ?? 0) - (b ?? 0))).toEqual([5, 20]);
    for (const call of calls) {
      expect(call.limit).toBe(100);
      const offset = Date.parse(call.now) - FIXTURE_EPOCH_MS;
      expect(offset % 1_000).toBe(0);
      expect(call.now).toMatch(/Z$/);
    }
    const lags = new Set(calls.map(call => call.now));
    expect(lags.size).toBeGreaterThan(1);
  });

  it("never reads the host wall clock or an unseeded random source while measuring", () => {
    vi.spyOn(Date, "now").mockImplementation(() => {
      throw new Error("Date.now is forbidden in the timed region");
    });
    vi.spyOn(Math, "random").mockImplementation(() => {
      throw new Error("Math.random is forbidden in the timed region");
    });
    const fixture = build({ nodes: 60, depth: 5, ticks: 6 });
    const receipt = run({ Projection: ObservationProjection, selectAttention, reasonNames: REASONS, fixture, host: HOST });
    expect(receipt.passes[0].samples).toBeGreaterThan(0);
    const text = readRepo("qa/workbench/attention-grouped-bench.mjs");
    expect(text).not.toMatch(/Date\.now|Math\.random/);
    expect(text.match(/new Date\(\)/g)?.length ?? 0).toBeLessThanOrEqual(1);
  });

  it("times the injected selector's result: the receipt p95 follows a slow selector", () => {
    const fixture = build({ nodes: 60, depth: 5, ticks: 6 });
    const slow: Selector = (projection, input) => {
      const until = performance.now() + 2;
      while (performance.now() < until) { /* busy wait: a deliberately slow selector */ }
      return selectAttention(projection, input);
    };
    const receipt = run({ Projection: ObservationProjection, selectAttention: slow, reasonNames: REASONS, fixture, host: HOST });
    for (const pass of receipt.passes) for (const setting of pass.settings) expect(setting.build.p50).toBeGreaterThanOrEqual(2);
  });
});

describe("W21-K attention receipt: exit semantics (spec: exit 2 off-shape, exit 1 over 20 ms)", () => {
  it("exits 2 on a fast off-shape receipt, naming the violated rules", () => {
    const { receipt } = smallRun();
    expect(receipt.exitCode).toBe(2);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.realised).toBe(false);
    const rules = receipt.violations.map(violation => violation.rule);
    expect(rules).toContain("operations-below-10000");
    expect(rules).toContain("samples-below-1000");
    expect(exitCode(receipt)).toBe(2);
  });

  it("exits 0 on a W21-shaped receipt within the target, and 1 when any judged p95 is over 20 ms", () => {
    expect(NAVIGATION_TARGET_MS).toBe(20);
    const fast = fakeReceipt(1);
    expect(assess(fast).exitCode).toBe(0);
    expect(assess(fast).verdict).toBe("within-target");
    const slow = fakeReceipt(1);
    slow.passes[1].settings[2].build.p95 = 20.5;
    const verdict = assess(slow);
    expect(verdict.exitCode).toBe(1);
    expect(verdict.verdict).toBe("over-target");
    expect(verdict.target.over).toEqual([`${slow.passes[1].label}:${slow.passes[1].settings[2].label}`]);
    slow.passes[1].settings[2].build.p95 = 20;
    expect(assess(slow).exitCode).toBe(0);
  });

  it("exits 1 on a reads violation even when every p95 is fast, and never tunes it away", () => {
    const rows = fakeReceipt(1);
    rows.passes[0].settings[0].reads.reportsWithRowsOverPageCap = 1;
    expect(assess(rows).exitCode).toBe(1);
    expect(assess(rows).target.readsViolations.length).toBe(1);
    const bound = fakeReceipt(1);
    bound.passes[1].settings[1].reads.reportsOverRelationsBound = 3;
    expect(assess(bound).exitCode).toBe(1);
    const calls = fakeReceipt(1);
    calls.passes[0].settings[3].reads.reportsWithQueryCallsNotOne = 2;
    expect(assess(calls).exitCode).toBe(1);
  });

  it("exits 2, not 0, for too few samples, a truncated projection, or a series that was never sampled", () => {
    const few = fakeReceipt(1);
    few.passes[0].samples = MIN_SAMPLES_PER_PASS - 1;
    expect(MIN_SAMPLES_PER_PASS).toBe(1_000);
    expect(assess(few).exitCode).toBe(2);
    const truncated = fakeReceipt(1);
    truncated.passes[1].retained.nodes = 100;
    expect(assess(truncated).violations.map(violation => violation.rule)).toContain("pass-truncated");
    const unsampled = fakeReceipt(1);
    unsampled.passes[0].settings[0].build = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled).violations.map(violation => violation.rule)).toContain("series-not-sampled");
    expect(assess(unsampled).exitCode).toBe(2);
    const offShape = fakeReceipt(100);
    offShape.fixture = { ...W21_SHAPE, nodes: 9_999 };
    expect(assess(offShape).exitCode).toBe(2);
  });
});

describe("W21-K attention receipt: production caps unchanged and the CLI stays thin", () => {
  it("pins the production caps by reading the source, and the bench constants that mirror them", () => {
    const observation = readRepo("src/workbench/observation.ts");
    expect(observation).toMatch(/const MAX_DEFAULT = \{maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100\};/);
    const attention = readRepo("src/workbench/attention.ts");
    expect(attention).toMatch(/const DEFAULT_LIMIT = 100;/);
    expect(attention).toMatch(/const MAX_LIMIT = 100;/);
    expect(attention).toMatch(/const DEFAULT_BOTTLENECKS = 5;/);
    expect(attention).toMatch(/const MAX_BOTTLENECKS = 20;/);
    expect(attention).toMatch(new RegExp(`const MAX_PAIR_READS = ${MAX_PAIR_READS.toLocaleString("en-US").replace(",", "_")};`));
    expect(BENCH_ONLY_LIMITS.maxQuery).toBe(40);
    expect(PASSES[1].limits).toEqual({ ...BENCH_ONLY_LIMITS, maxQuery: 100 });
  });

  it("loads only dist for the product code, writes and prints the receipt before setting the exit code", () => {
    const text = readRepo("qa/workbench/attention-grouped-bench.mjs");
    const staticSpecifiers = [...text.matchAll(/^import[\s\S]*?from\s*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(staticSpecifiers).toEqual(["./bench-revision.mjs", "./grouped-fixture.mjs", "node:fs", "node:os", "node:url"].sort());
    const dynamic = [...text.matchAll(/await import\('([^']+)'\)/g)].map(match => match[1]).sort();
    expect(dynamic).toEqual(["../../dist/workbench/attention.js", "../../dist/workbench/observation.js"]);
    expect(text).not.toMatch(/\.\.\/\.\.\/src|new ObservationProjection|maxNodes: \d|maxEdges: \d/);
    expect(text).toMatch(/W21_ATTENTION_RECEIPT/);
    const written = text.indexOf("writeFileSync(process.env.W21_ATTENTION_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = exitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
    expect(text).toMatch(/process\.exit\(3\)/);
  });

  it("states the bench rules in its header before any measurement code", () => {
    const text = readRepo("qa/workbench/attention-grouped-bench.mjs");
    const header = text.slice(0, text.indexOf("import {readFileSync"));
    expect(header).toMatch(/BENCH RULES/);
    expect(header).toMatch(/Bench-only limits/);
    expect(header).toMatch(/Hard-coded constants/);
    expect(header).toMatch(/wb-6ze\.29/);
  });
});

describe("W21-K Forge registration (spec: forge.toml one additive block)", () => {
  it("registers attention-grouped-bench as a Forge command outside the default gate, leaving the other blocks alone", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.attention-grouped-bench\]\ncommand = "node qa\/workbench\/attention-grouped-bench\.mjs"\ntimeout = 300\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/attention-grouped/);
    expect(toml).toMatch(/\[build\.commands\.inspector-grouped-bench\]\ncommand = "node qa\/workbench\/inspector-grouped-bench\.mjs"\ntimeout = 300\n/);
  });
});
