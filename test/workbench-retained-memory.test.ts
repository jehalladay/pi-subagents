/** W21 (wb-9x5.3): retained-memory bound receipt for the grouped-10k inspector.
 * Measurement-only: the module under test loads no src/ or dist/ code, production caps do not move, and the
 * on-blur release falsifier must be able to fail (a deliberately leaking renderer is caught).
 */
import { readFileSync } from "node:fs";
import { setFlagsFromString } from "node:v8";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { BENCH_ONLY_LIMITS, buildGroupedFixture } from "../qa/workbench/grouped-fixture.mjs";
import {
  assessRetainedReceipt,
  DEFAULT_RETAINED_SAMPLING,
  RETAINED_BOUNDS,
  RETAINED_RECEIPT_CONTRACT,
  retainedExitCodeFor,
  runRetainedMemoryBench,
} from "../qa/workbench/retained-memory.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { ObservationProjection } from "../src/workbench/observation.js";

type Gc = () => void;
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
interface Sample {
  cycle: number;
  phase: "warmup" | "measured";
  heapUsed: number;
  arrayBuffers: number;
  external: number;
  rss: number;
  payloadBytesOffered: number;
  reachableBodies: number;
}
interface Snapshot {
  heapUsed: number;
  arrayBuffers: number;
}
interface Receipt {
  contract: string;
  benchmark: string;
  measured: boolean;
  heapLabel: string;
  revision: string;
  limits: { maxNodes: number; maxEdges: number; maxEvents: number; maxQuery: number };
  limitsLabel: string;
  bounds: { heapGrowthAfterWarmupBytes: number; arrayBufferGrowthBytes: number; reachableBodiesAfterBlur: number };
  gc: { available: boolean; method: string };
  fixture: Record<string, number | string | Record<string, number>>;
  sampling: { cycles: number; warmupCycles: number; keypressesPerCycle: number; bodyBytesCap: number };
  projection: { retained: { nodes: number; edges: number; events: number }; offered: { nodes: number; edges: number } };
  baseline: Snapshot | null;
  series: Sample[];
  summary: {
    heapGrowthAfterWarmupBytes: number | null;
    arrayBufferGrowthBytes: number | null;
    payloadBytesOffered: number;
    payloadBytesRetained: number | null;
    retainedHeapPerRetainedNodeBytes: number | null;
  } | null;
  falsifier: {
    blurCycles: number;
    bodiesIssued: number;
    reachableAfterBlur: number;
    leakedCycles: number[];
    control: { detectedWhileHeld: boolean; releasedAfterDrop: boolean };
  } | null;
  realised: boolean;
  violations: { rule: string; detail: string }[];
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
interface Sampling {
  cycles: number;
  warmupCycles: number;
  keypressesPerCycle: number;
  bodyBytesCap: number;
}
interface RunInput {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  fixture: ReturnType<typeof buildGroupedFixture>;
  host: Host;
  gc: Gc | undefined;
  sampling?: Sampling;
}

const run = runRetainedMemoryBench as (input: RunInput) => Promise<Receipt>;
const assess = assessRetainedReceipt as (receipt: Receipt) => { realised: boolean; violations: { rule: string }[]; exitCode: number };
const exitCode = retainedExitCodeFor as (receipt: Receipt) => number;

setFlagsFromString("--expose-gc");
const gc = runInNewContext("gc") as Gc;
const inspector: Inspector = { initialInspectorState, layoutInspector, reduceInspectorKey };
const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test",
  toolchain: { node: process.version },
  command: "vitest",
};
const SMALL: Sampling = { cycles: 6, warmupCycles: 2, keypressesPerCycle: 24, bodyBytesCap: 1_048_576 };
const small = () => buildGroupedFixture({ seed: 21, nodes: 600, depth: 5, ticks: 120 });
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

/** A receipt whose measured parts are within every bound, over the real W21 fixture shape. */
function passingReceipt(): Receipt {
  const shape = buildGroupedFixture().shape as unknown as Receipt["fixture"];
  const series: Sample[] = Array.from({ length: 4 }, (_, cycle) => ({
    cycle,
    phase: cycle < 1 ? "warmup" : "measured",
    heapUsed: 200_000_000,
    arrayBuffers: 1_000,
    external: 2_000,
    rss: 400_000_000,
    payloadBytesOffered: (cycle + 1) * 3_000_000,
    reachableBodies: 0,
  }));
  return {
    contract: RETAINED_RECEIPT_CONTRACT,
    benchmark: "inspector-retained-memory-grouped-10k",
    measured: true,
    heapLabel: "post-gc-retained",
    revision: "test",
    limits: { ...BENCH_ONLY_LIMITS },
    limitsLabel: "bench-only",
    bounds: { ...RETAINED_BOUNDS },
    gc: { available: true, method: "global.gc" },
    fixture: shape,
    sampling: { cycles: 4, warmupCycles: 1, keypressesPerCycle: 10, bodyBytesCap: 1_048_576 },
    projection: { retained: { nodes: 10_843, edges: 13_039, events: 128 }, offered: { nodes: 10_843, edges: 13_039 } },
    baseline: { heapUsed: 200_000_000, arrayBuffers: 1_000 },
    series,
    summary: {
      heapGrowthAfterWarmupBytes: 0,
      arrayBufferGrowthBytes: 0,
      payloadBytesOffered: 12_000_000,
      payloadBytesRetained: 0,
      retainedHeapPerRetainedNodeBytes: 18_000,
    },
    falsifier: {
      blurCycles: 4,
      bodiesIssued: 4,
      reachableAfterBlur: 0,
      leakedCycles: [],
      control: { detectedWhileHeld: true, releasedAfterDrop: true },
    },
    realised: true,
    violations: [],
    verdict: "within-bound",
    exitCode: 0,
  };
}

describe("W21-C bounds are stated before any run (wb-9x5.3)", () => {
  it("fixes the pass/fail bounds as constants, not as derived-from-the-run values", () => {
    expect(RETAINED_BOUNDS).toEqual({
      heapGrowthAfterWarmupBytes: 16 * 1_048_576,
      arrayBufferGrowthBytes: 1_048_576,
      reachableBodiesAfterBlur: 0,
    });
    expect(RETAINED_RECEIPT_CONTRACT).toBe("workbench.inspector-retained-memory-bench/v1");
    expect(DEFAULT_RETAINED_SAMPLING.cycles).toBeGreaterThan(DEFAULT_RETAINED_SAMPLING.warmupCycles);
    expect(DEFAULT_RETAINED_SAMPLING.bodyBytesCap).toBeGreaterThanOrEqual(1_048_576);
  });
});

describe("W21-C retained-heap series and on-blur release falsifier (wb-9x5.3)", () => {
  it("records a post-GC series over payload-bearing navigation under bench-only limits and releases every body on blur", async () => {
    const fixture = small();
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture, host: HOST, gc, sampling: SMALL });
    expect(receipt.measured).toBe(true);
    expect(receipt.contract).toBe(RETAINED_RECEIPT_CONTRACT);
    expect(receipt.heapLabel).toBe("post-gc-retained");
    expect(receipt.gc.available).toBe(true);
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.limitsLabel).toMatch(/bench-only/);
    expect(receipt.bounds).toEqual(RETAINED_BOUNDS);
    expect(receipt.fixture.nodes).toBe(fixture.shape.nodes);
    expect(receipt.projection.retained.nodes).toBe(receipt.projection.offered.nodes);
    expect(receipt.baseline?.heapUsed).toBeGreaterThan(0);
    expect(receipt.series).toHaveLength(SMALL.cycles);
    expect(receipt.series.map((sample) => sample.phase)).toEqual(["warmup", "warmup", "measured", "measured", "measured", "measured"]);
    for (const [at, sample] of receipt.series.entries()) {
      expect(sample.cycle).toBe(at);
      expect(sample.heapUsed).toBeGreaterThan(0);
      expect(sample.reachableBodies).toBe(0);
    }
    const offered = receipt.series.map((sample) => sample.payloadBytesOffered);
    expect(offered).toEqual([...offered].sort((left, right) => left - right));
    expect(offered[offered.length - 1]).toBeGreaterThan(SMALL.cycles * 1_000);
    expect(receipt.falsifier?.blurCycles).toBe(SMALL.cycles);
    expect(receipt.falsifier?.bodiesIssued).toBe(SMALL.cycles);
    expect(receipt.falsifier?.reachableAfterBlur).toBe(0);
    expect(receipt.falsifier?.leakedCycles).toEqual([]);
    expect(receipt.summary?.payloadBytesOffered).toBe(offered[offered.length - 1]);
    expect(receipt.summary?.retainedHeapPerRetainedNodeBytes).toBeGreaterThan(0);
  }, 120_000);

  it("proves the probe can see a leak: the positive control is detected while held and released once dropped", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.control).toEqual({ detectedWhileHeld: true, releasedAfterDrop: true });
  }, 120_000);

  it("FAILS the falsifier when a renderer keeps the model it was handed after blur (the leak is caught, exit 1)", async () => {
    const stash: unknown[] = [];
    const leaking: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        stash.push(model);
        return layoutInspector(model, state, size);
      },
    };
    const receipt = await run({ Projection: ObservationProjection, inspector: leaking, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.reachableAfterBlur).toBeGreaterThan(0);
    expect(receipt.falsifier?.leakedCycles.length).toBeGreaterThan(0);
    expect(receipt.violations.map((violation) => violation.rule)).toContain("payload-body-reachable-after-blur");
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(1);
    expect(stash.length).toBeGreaterThan(0);
  }, 120_000);

  it("refuses to measure without a collector: no gc function is exit 2, never a pass", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc: undefined, sampling: SMALL });
    expect(receipt.gc.available).toBe(false);
    expect(receipt.series).toEqual([]);
    expect(receipt.falsifier).toBeNull();
    expect(receipt.violations.map((violation) => violation.rule)).toContain("gc-unavailable");
    expect(receipt.exitCode).toBe(2);
  }, 60_000);

  it("a small fixture is recorded honestly and exits 2 as not the W21 shape", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.violations.map((violation) => violation.rule)).toContain("operations-below-10000");
    expect(receipt.realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
  }, 120_000);
});

describe("W21-C exit semantics are recomputed from the receipt (wb-9x5.3)", () => {
  it("exits 0 when every measured quantity is inside its bound", () => {
    expect(exitCode(passingReceipt())).toBe(0);
    expect(assess(passingReceipt()).realised).toBe(true);
  });

  it("exits 2 for a fixture that is not the W21 shape", () => {
    const receipt = passingReceipt();
    receipt.fixture = { ...receipt.fixture, nodes: 500 };
    expect(exitCode(receipt)).toBe(2);
  });

  it("exits 2 when the positive control was not detected (the instrument is blind)", () => {
    const receipt = passingReceipt();
    if (receipt.falsifier) receipt.falsifier.control.detectedWhileHeld = false;
    const verdict = assess(receipt);
    expect(verdict.exitCode).toBe(2);
    expect(verdict.violations.map((violation) => violation.rule)).toContain("control-not-detected");
  });

  it("exits 2 when the control stays reachable after being dropped (the probe cannot tell held from free)", () => {
    const receipt = passingReceipt();
    if (receipt.falsifier) receipt.falsifier.control.releasedAfterDrop = false;
    expect(assess(receipt).violations.map((violation) => violation.rule)).toContain("control-not-released");
  });

  it("exits 2 when the series is too short to separate warmup from measured cycles", () => {
    const receipt = passingReceipt();
    receipt.series = receipt.series.slice(0, 1);
    expect(assess(receipt).violations.map((violation) => violation.rule)).toContain("series-too-short");
  });

  it("exits 1 when post-warmup retained heap growth exceeds its bound, after the receipt exists", () => {
    const receipt = passingReceipt();
    if (receipt.summary) receipt.summary.heapGrowthAfterWarmupBytes = RETAINED_BOUNDS.heapGrowthAfterWarmupBytes + 1;
    expect(exitCode(receipt)).toBe(1);
  });

  it("exits 1 when retained ArrayBuffer bytes exceed the one-body tolerance", () => {
    const receipt = passingReceipt();
    if (receipt.summary) receipt.summary.arrayBufferGrowthBytes = RETAINED_BOUNDS.arrayBufferGrowthBytes + 1;
    expect(exitCode(receipt)).toBe(1);
  });

  it("recomputes the bounds from the series rather than trusting the stored summary", () => {
    const receipt = passingReceipt();
    receipt.series = receipt.series.map((sample, at) => (at === 3 ? { ...sample, heapUsed: sample.heapUsed + 64 * 1_048_576 } : sample));
    expect(exitCode(receipt)).toBe(1);
  });

  it("exits 1 for a reachable body on any series sample even when the summary says zero", () => {
    const receipt = passingReceipt();
    receipt.series = receipt.series.map((sample, at) => (at === 2 ? { ...sample, reachableBodies: 1 } : sample));
    expect(exitCode(receipt)).toBe(1);
  });
});

describe("W21-C measurement-only guarantees (wb-9x5.3)", () => {
  it("reuses the landed fixture builder instead of redefining it", () => {
    const text = readRepo("qa/workbench/retained-memory.mjs");
    expect(text).toMatch(/from '\.\/grouped-fixture\.mjs'/);
    expect(text).not.toMatch(/function buildGroupedFixture/);
    expect(text).not.toMatch(/Math\.random|Date\.now/);
  });

  it("leaves the production default caps untouched", () => {
    expect(readRepo("src/workbench/observation.ts")).toContain("const MAX_DEFAULT = {maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100};");
  });

  it("writes and prints the receipt before it sets the exit code, and drives compiled dist/ only", () => {
    const text = readRepo("qa/workbench/inspector-retained-memory-bench.mjs");
    const written = text.indexOf("writeFileSync(process.env.W21_RETAINED_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = retainedExitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
    expect(text).toContain("../../dist/ui/workflow-inspector.js");
    expect(text).toContain("../../dist/workbench/observation.js");
    expect(text).not.toMatch(/\.\.\/\.\.\/src\//);
  });

  it("registers one Forge command with --expose-gc outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toContain(
      '[build.commands.inspector-retained-memory-bench]\ncommand = "node --expose-gc qa/workbench/inspector-retained-memory-bench.mjs"\ntimeout = 300\n',
    );
    expect(toml.match(/\[build\.commands\.inspector-retained-memory-bench\]/g)).toHaveLength(1);
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/retained/);
  });
});
