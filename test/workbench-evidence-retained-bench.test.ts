/** W21 (wb-9x5.14): retained-memory and wall-time receipt for evidence-bearing grouped navigation through the REAL
 * trunk evidence channel (EvidenceStore request/get/abortAll driven by the inspector reducer, no stand-in payload field).
 * Measurement-only: the bench drives compiled dist/ over the wb-9x5.1 fixture and no production cap moves.
 * This guard pins the header constants, the exit-code contract (0/1/2), the fixture-loader provenance label, the
 * preview-only invariant and the positive-control detection on a tiny fixture. It never runs the 10k fixture and never
 * asserts a measured latency or heap value.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  NAVIGATION_TARGET_MS,
} from "../qa/workbench/grouped-fixture.mjs";
import {
  assessEvidenceRetainedReceipt,
  BENCH_BOUNDS,
  BENCH_EVIDENCE_LIMITS,
  EVIDENCE_RETAINED_CONTRACT,
  LOADER_PROVENANCE,
  NON_COMPARABLE_LABEL,
  runEvidenceRetainedBench,
} from "../qa/workbench/inspector-evidence-retained-bench.mjs";
import { initialInspectorState, inspectorEvidenceTarget, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { ObservationProjection } from "../src/workbench/observation.js";

interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Receipt {
  contract: string;
  benchmark: string;
  measured: boolean;
  revision: string;
  command: string;
  toolchain: Record<string, string>;
  fixture: Record<string, unknown> & { updates: number };
  projectionLimits: Record<string, number>;
  limits: Record<string, number>;
  nonComparable: string;
  loaderProvenance: string;
  bounds: Record<string, number>;
  cycles: number;
  focusedCycles: number;
  detailsCycles: number;
  loadedCycles: number;
  channel: { requestCalls: number; getCalls: number; abortAllCalls: number; loaderLoads: number; loaderAborted: number };
  entries: { loaded: number; aborted: number; unavailable: number };
  wall: { cycle: Distribution; detailsRender: Distribution };
  heap: {
    gcAvailable: boolean;
    floorRetained: number;
    afterWarmupRetained: number;
    finalRetained: number;
    growthBytes: number;
    peakHeapUsed: number;
    peakRetained: number;
    series: Array<{ cycle: number; retained: number }>;
  };
  bytes: { offered: number; retainedPostGc: number };
  falsifiers: {
    release: { inFlightSurvivors: number; lateResultsKept: number; teardownResidueBytes: number; closeControlCalls: number };
    positiveControl: { detected: boolean; released: boolean; heldBytes: number; deltaBytes: number };
    budget: { maxStoreSize: number; maxPreviewBytes: number; previewOverBudget: number; rawPayloadsReachable: number; rawContentsReachable: number; loadedAtCheck: number };
  };
  outliers: unknown[];
  realised: boolean;
  violations: Array<{ rule: string; detail: string }>;
  over: string[];
  pass: boolean;
  verdict: string;
  exitCode: number;
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
interface Counted {
  request: number;
  get: number;
  abortAll: number;
}

const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-evidence-retained-bench.test.ts",
};
const TINY = {
  cycles: 24,
  warmupCycles: 4,
  sampleEvery: 4,
  payloadBytes: 262_144,
  maxEntries: 4,
  maxBytes: 4_096,
  timeoutMs: 5_000,
  controlBytes: 4_194_304,
};
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const clone = (receipt: Receipt): Receipt => structuredClone(receipt);
const finite = (value: Distribution): boolean =>
  value.samples > 0 &&
  [value.p50, value.p95, value.max].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0) &&
  (value.p50 ?? 0) <= (value.p95 ?? 0) &&
  (value.p95 ?? 0) <= (value.max ?? 0);

const run = runEvidenceRetainedBench as (input: {
  Projection: typeof ObservationProjection;
  EvidenceStore: typeof EvidenceStore;
  inspector: Record<string, unknown>;
  fixture: unknown;
  host: Host;
  limits?: Record<string, number>;
}) => Promise<Receipt>;
const assess = assessEvidenceRetainedReceipt as (receipt: Receipt) => { realised: boolean; violations: Array<{ rule: string; detail: string }>; over: string[]; pass: boolean; exitCode: number };
const build = buildGroupedFixture as (options?: { seed: number; nodes: number; depth: number; ticks: number }) => { shape: Record<string, unknown> };

let cached: { receipt: Receipt; counted: Counted } | undefined;
const smallRun = async () => {
  if (cached) return cached;
  const counted: Counted = { request: 0, get: 0, abortAll: 0 };
  class SpyStore extends EvidenceStore {
    override request(...args: Parameters<EvidenceStore["request"]>): ReturnType<EvidenceStore["request"]> {
      counted.request++;
      return super.request(...args);
    }
    override get(...args: Parameters<EvidenceStore["get"]>): ReturnType<EvidenceStore["get"]> {
      counted.get++;
      return super.get(...args);
    }
    override abortAll(): void {
      counted.abortAll++;
      super.abortAll();
    }
  }
  const receipt = await run({
    Projection: ObservationProjection,
    EvidenceStore: SpyStore,
    inspector: { initialInspectorState, layoutInspector, reduceInspectorKey, inspectorEvidenceTarget },
    fixture: build({ seed: 9, nodes: 120, depth: 5, ticks: 20 }),
    host: HOST,
    limits: TINY,
  });
  cached = { receipt, counted };
  return cached;
};

/** A receipt that is the W21 claim, measured and within bound, derived from the real tiny run. */
const realisedReceipt = async (): Promise<Receipt> => {
  const receipt = clone((await smallRun()).receipt);
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
  receipt.apply = { ingestApplied: 101_000, ingestDuplicate: 0, ingestOutOfOrder: 0 };
  receipt.offered = { nodes: 12_000, edges: 24_000, updates: 101_000 };
  receipt.retained = { nodes: 12_000, edges: 24_000 };
  receipt.heap.growthBytes = 1_024;
  receipt.falsifiers.release.teardownResidueBytes = 1_024;
  receipt.wall.cycle = { samples: 50, p50: 1, p95: 2, max: 3 };
  receipt.wall.detailsRender = { samples: 100, p50: 0.1, p95: 0.2, max: 0.3 };
  return receipt;
};

describe("W21 evidence-retained receipt: header and contract (A1, A2, A6)", () => {
  it("names the frozen contract and states every bound before any run", () => {
    expect(EVIDENCE_RETAINED_CONTRACT).toBe("workbench.evidence-retained-bench/v1");
    expect(BENCH_BOUNDS).toEqual({
      retainedGrowthBytes: 8_388_608,
      teardownResidueBytes: 16_777_216,
      detailsLayoutP95Ms: NAVIGATION_TARGET_MS,
      cycleWallP95Ms: 250,
    });
    expect(BENCH_EVIDENCE_LIMITS).toMatchObject({ maxEntries: 8, maxBytes: 16_384, timeoutMs: 5_000, warmupCycles: 16 });
    expect(BENCH_EVIDENCE_LIMITS.cycles).toBeGreaterThan(BENCH_EVIDENCE_LIMITS.warmupCycles);
    expect(BENCH_EVIDENCE_LIMITS.payloadBytes).toBeGreaterThanOrEqual(1_048_576);
  });

  it("carries the non-comparable label and the fixture-loader provenance label", () => {
    expect(NON_COMPARABLE_LABEL).toMatch(/^non-comparable to production \(bench limits .+ vs production .+\)$/);
    expect(LOADER_PROVENANCE).toMatch(/fixture/i);
    expect(LOADER_PROVENANCE).toMatch(/never a real producer/i);
  });
});

describe("W21 evidence-retained receipt: real evidence channel (A1, A5)", () => {
  it("emits host, toolchain, fixture, limits, labels and the bounds", async () => {
    const { receipt } = await smallRun();
    expect(receipt.contract).toBe("workbench.evidence-retained-bench/v1");
    expect(receipt.measured).toBe(true);
    expect(receipt.revision).toBe("test-revision");
    expect(Object.keys(receipt.toolchain).sort()).toEqual(["node", "piTui", "typescript"]);
    expect(receipt.projectionLimits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.limits).toMatchObject({ maxEntries: 4, maxBytes: 4_096, cycles: 24 });
    expect(receipt.nonComparable).toBe(NON_COMPARABLE_LABEL);
    expect(receipt.loaderProvenance).toBe(LOADER_PROVENANCE);
    expect(receipt.bounds).toEqual(BENCH_BOUNDS);
    expect(receipt.fixture.updates).toBeGreaterThan(0);
  }, 120_000);

  it("drives EvidenceStore.request/get/abortAll through the reducer path, one close per cycle", async () => {
    const { receipt, counted } = await smallRun();
    expect(receipt.channel.requestCalls).toBe(counted.request);
    expect(receipt.channel.getCalls).toBe(counted.get);
    expect(receipt.channel.abortAllCalls).toBe(counted.abortAll);
    expect(counted.abortAll).toBe(receipt.cycles);
    expect(counted.request).toBeGreaterThanOrEqual(receipt.cycles * 2);
    expect(counted.get).toBeGreaterThan(0);
    expect(receipt.channel.loaderLoads).toBeGreaterThan(0);
    expect(receipt.channel.loaderAborted).toBeGreaterThan(0);
  }, 120_000);

  it("records focusedCycles and detailsCycles equal to cycles, and a loaded render every cycle", async () => {
    const { receipt } = await smallRun();
    expect(receipt.cycles).toBe(24);
    expect(receipt.focusedCycles).toBe(receipt.cycles);
    expect(receipt.detailsCycles).toBe(receipt.cycles);
    expect(receipt.loadedCycles).toBe(receipt.cycles);
    expect(receipt.entries.loaded).toBeGreaterThanOrEqual(receipt.cycles);
    expect(receipt.entries.aborted).toBeGreaterThan(0);
  }, 120_000);

  it("measures wall time p50/p95/max per cycle and per details render, and peak heap", async () => {
    const { receipt } = await smallRun();
    expect(finite(receipt.wall.cycle)).toBe(true);
    expect(receipt.wall.cycle.samples).toBe(receipt.cycles);
    expect(finite(receipt.wall.detailsRender)).toBe(true);
    expect(receipt.heap.gcAvailable).toBe(true);
    expect(receipt.heap.peakHeapUsed).toBeGreaterThan(0);
    expect(receipt.heap.peakRetained).toBeGreaterThanOrEqual(receipt.heap.floorRetained);
    expect(receipt.heap.series.length).toBeGreaterThan(1);
    expect(receipt.outliers.length).toBeGreaterThan(0);
  }, 120_000);

  it("offers far more payload bytes than it retains post-GC", async () => {
    const { receipt } = await smallRun();
    expect(receipt.bytes.offered).toBeGreaterThanOrEqual(receipt.channel.loaderLoads * TINY.payloadBytes);
    expect(receipt.bytes.retainedPostGc).toBeLessThan(receipt.bytes.offered / 2);
  }, 120_000);
});

describe("W21 evidence-retained receipt: falsifiers (A4, A5)", () => {
  it("release: abortAll leaves no in-flight entry, drops late results, and issues no control call", async () => {
    const { receipt } = await smallRun();
    expect(receipt.falsifiers.release.inFlightSurvivors).toBe(0);
    expect(receipt.falsifiers.release.lateResultsKept).toBe(0);
    expect(receipt.falsifiers.release.closeControlCalls).toBe(0);
    expect(typeof receipt.falsifiers.release.teardownResidueBytes).toBe("number");
  }, 120_000);

  it("positive control: a deliberately retained payload is detected as retained and released when dropped", async () => {
    const { receipt } = await smallRun();
    expect(receipt.falsifiers.positiveControl.heldBytes).toBe(TINY.controlBytes);
    expect(receipt.falsifiers.positiveControl.detected).toBe(true);
    expect(receipt.falsifiers.positiveControl.released).toBe(true);
    expect(receipt.falsifiers.positiveControl.deltaBytes).toBeGreaterThanOrEqual(TINY.controlBytes * 0.9);
  }, 120_000);

  it("budget: the store holds at most maxEntries previews of at most maxBytes, and no raw payload is reachable", async () => {
    const { receipt } = await smallRun();
    const budget = receipt.falsifiers.budget;
    expect(budget.maxStoreSize).toBeGreaterThan(0);
    expect(budget.maxStoreSize).toBeLessThanOrEqual(TINY.maxEntries);
    expect(budget.maxPreviewBytes).toBeGreaterThan(0);
    expect(budget.previewOverBudget).toBe(0);
    expect(budget.loadedAtCheck).toBeGreaterThan(0);
    expect(budget.rawPayloadsReachable).toBe(0);
    expect(budget.rawContentsReachable).toBe(0);
  }, 120_000);
});

describe("W21 evidence-retained receipt: exit semantics (A2)", () => {
  it("a tiny fixture is measured but is not the W21 claim: exit 2, never a pass", async () => {
    const { receipt } = await smallRun();
    expect(receipt.realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
    expect(receipt.pass).toBe(false);
    expect(receipt.violations.map(violation => violation.rule)).toContain("operations-below-10000");
    expect((assessFixtureShape as (shape: Record<string, unknown>) => { realised: boolean })(receipt.fixture).realised).toBe(false);
  }, 120_000);

  it("a realised, within-bound receipt exits 0", async () => {
    const receipt = await realisedReceipt();
    const verdict = assess(receipt);
    expect(verdict.violations).toEqual([]);
    expect(verdict.over).toEqual([]);
    expect(verdict.exitCode).toBe(0);
    expect(verdict.pass).toBe(true);
  }, 120_000);

  it("a miss is recorded at exit 1, per bound", async () => {
    const base = await realisedReceipt();
    const cases: Array<[string, (receipt: Receipt) => void]> = [
      ["retained-growth", receipt => { receipt.heap.growthBytes = BENCH_BOUNDS.retainedGrowthBytes + 1; }],
      ["teardown-residue", receipt => { receipt.falsifiers.release.teardownResidueBytes = BENCH_BOUNDS.teardownResidueBytes + 1; }],
      ["details-layout-p95", receipt => { receipt.wall.detailsRender.p95 = NAVIGATION_TARGET_MS + 0.5; }],
      ["cycle-wall-p95", receipt => { receipt.wall.cycle.p95 = BENCH_BOUNDS.cycleWallP95Ms + 1; }],
      ["in-flight-survivor", receipt => { receipt.falsifiers.release.inFlightSurvivors = 1; }],
      ["late-result-kept", receipt => { receipt.falsifiers.release.lateResultsKept = 1; }],
      ["close-control-call", receipt => { receipt.falsifiers.release.closeControlCalls = 1; }],
      ["store-over-budget", receipt => { receipt.falsifiers.budget.maxStoreSize = receipt.limits.maxEntries + 1; }],
      ["preview-over-budget", receipt => { receipt.falsifiers.budget.previewOverBudget = 1; }],
      ["raw-payload-reachable", receipt => { receipt.falsifiers.budget.rawPayloadsReachable = 1; }],
    ];
    for (const [name, mutate] of cases) {
      const receipt = clone(base);
      mutate(receipt);
      const verdict = assess(receipt);
      expect({ name, exitCode: verdict.exitCode }).toEqual({ name, exitCode: 1 });
      expect(verdict.over.some(item => item.includes(name))).toBe(true);
    }
  }, 120_000);

  it("an off-shape or invalid measurement exits 2, never 1", async () => {
    const base = await realisedReceipt();
    const cases: Array<[string, (receipt: Receipt) => void]> = [
      ["focused-cycles-short", receipt => { receipt.focusedCycles = receipt.cycles - 1; }],
      ["details-cycles-short", receipt => { receipt.detailsCycles = receipt.cycles - 1; }],
      ["loaded-cycles-short", receipt => { receipt.loadedCycles = 0; }],
      ["gc-unavailable", receipt => { receipt.heap.gcAvailable = false; }],
      ["positive-control-undetected", receipt => { receipt.falsifiers.positiveControl.detected = false; }],
      ["positive-control-not-released", receipt => { receipt.falsifiers.positiveControl.released = false; }],
      ["no-loads", receipt => { receipt.channel.loaderLoads = 0; }],
      ["no-aborts", receipt => { receipt.channel.loaderAborted = 0; }],
      ["no-wall-samples", receipt => { receipt.wall.cycle = { samples: 0, p50: null, p95: null, max: null }; }],
    ];
    for (const [name, mutate] of cases) {
      const receipt = clone(base);
      mutate(receipt);
      const verdict = assess(receipt);
      expect({ name, exitCode: verdict.exitCode }).toEqual({ name, exitCode: 2 });
      expect(verdict.violations.map(violation => violation.rule)).toContain(name);
    }
  }, 120_000);
});

describe("W21 evidence-retained bench: provenance and hygiene", () => {
  it("imports compiled dist only, never src, and never a stand-in payload field", () => {
    const text = readRepo("qa/workbench/inspector-evidence-retained-bench.mjs");
    expect(text).not.toMatch(/from\s+['"][./]*src\//);
    expect(text).toMatch(/dist\/workbench\/evidence-loader\.js/);
    expect(text).toMatch(/dist\/ui\/workflow-inspector\.js/);
    expect(text).not.toMatch(/loadedPayload/);
    expect(text).toMatch(/grouped-fixture\.mjs/);
  });

  it("states the bounds, the warmup anchor and the disclosure in the header before any code", () => {
    const text = readRepo("qa/workbench/inspector-evidence-retained-bench.mjs");
    const header = text.slice(0, text.indexOf("import "));
    expect(header).toMatch(/BOUNDS, stated here before any run/);
    expect(header).toMatch(/warmup anchor/i);
    expect(header).toMatch(/non-comparable to production \(bench limits/);
    expect(header).toMatch(/fixture EvidenceLoader|FIXTURE EvidenceLoader/);
  });

  it("registers one additive command block outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.inspector-evidence-retained-bench\]\ncommand = "node --expose-gc qa\/workbench\/inspector-evidence-retained-bench\.mjs"\ntimeout = 300\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/evidence-retained/);
  });
});
