/** W21 (wb-9x5.3): retained-memory bound receipt for the grouped-10k inspector.
 * Measurement-only: the module under test loads no src/ or dist/ code, production caps do not move, and the
 * on-blur release falsifier must be able to fail (a deliberately leaking renderer is caught).
 */
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setFlagsFromString } from "node:v8";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import { BENCH_ONLY_LIMITS, buildGroupedFixture } from "../qa/workbench/grouped-fixture.mjs";
import * as retainedMemory from "../qa/workbench/retained-memory.mjs";
import {
  assessRetainedReceipt,
  DEFAULT_RETAINED_SAMPLING,
  RETAINED_BOUNDS,
  RETAINED_RECEIPT_CONTRACT,
  retainedExitCodeFor,
  runRetainedMemoryBench,
  WARMUP_ANCHOR,
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
  lateCollected?: number;
  releaseRounds?: number;
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
  warmupAnchor?: { choice: string; rule: string };
  comparability?: string;
  releaseRecheck?: { rounds: number; rule: string };
  gc: { available: boolean; method: string };
  fixture: Record<string, number | string | Record<string, number>>;
  sampling: { cycles: number; warmupCycles: number; keypressesPerCycle: number; bodyBytesCap: number };
  projection: { retained: { nodes: number; edges: number; events: number }; offered: { nodes: number; edges: number } };
  baseline: Snapshot | null;
  series: Sample[];
  summary: {
    heapGrowthAfterWarmupBytes: number | null;
    heapSlopeBytesPerCycle?: number | null;
    heapSlopeVerdict?: string;
    heapSlopeLabel?: string;
    arrayBufferGrowthBytes: number | null;
    payloadBytesOffered: number;
    payloadBytesRetained: number | null;
    retainedHeapPerRetainedNodeBytes: number | null;
  } | null;
  falsifier: {
    blurCycles: number;
    bodiesIssued: number;
    focusedCycles?: number;
    detailsCycles?: number;
    reachableAfterBlur: number;
    leakedCycles: number[];
    lateCollectedAfterBlur?: number;
    lateCollectedCycles?: number[];
    controlProbeRounds?: { whileHeld: number; afterDrop: number };
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
interface PublishIo {
  path?: string;
  log?: (line: string) => void;
  logError?: (line: string) => void;
  writeFile?: (path: string, text: string) => void;
}

const run = runRetainedMemoryBench as (input: RunInput) => Promise<Receipt>;
const assess = assessRetainedReceipt as (receipt: Receipt) => { realised: boolean; violations: { rule: string }[]; exitCode: number };
const exitCode = retainedExitCodeFor as (receipt: Receipt) => number;
// Added by the respin (U2 bounded re-collect; one-liner batch item (5)). Read off the module namespace so a module
// without them reddens only the tests that use them.
const RELEASE_RECHECK_ROUNDS = retainedMemory.RELEASE_RECHECK_ROUNDS as number | undefined;
const publishRetainedReceipt = retainedMemory.publishRetainedReceipt as ((receipt: Receipt, io?: PublishIo) => number) | undefined;
function recheckRounds(): number {
  if (typeof RELEASE_RECHECK_ROUNDS !== "number") throw new Error("qa/workbench/retained-memory.mjs exports no RELEASE_RECHECK_ROUNDS header constant");
  return RELEASE_RECHECK_ROUNDS;
}
function publishWith(receipt: Receipt, io?: PublishIo): number {
  if (typeof publishRetainedReceipt !== "function") throw new Error("qa/workbench/retained-memory.mjs exports no publishRetainedReceipt");
  return publishRetainedReceipt(receipt, io);
}

setFlagsFromString("--expose-gc");
const gc = runInNewContext("gc") as Gc;
/**
 * wb-xn2: the collector the exit-0 window case injects. The release probe's last collection is the one that frees the
 * 4 MiB body, and V8 releases an ArrayBuffer backing store on a background sweeper after a full collection returns, so
 * a memory sample taken straight after that last collection can still count a body that is already unreachable. A
 * second back-to-back collection starts by completing the first one's pending sweep, so by the time it returns the
 * counter no longer includes the freed store. That is a mechanism, not a wait: nothing here depends on how long the
 * sweeper takes. (Incidents: cmd_87bc2bf80c37, cmd_ddbff06f7b99, cmd_f4ba202b79b1, cmd_db26a7fa13ab.)
 */
function collectTwice(collect: Gc): Gc {
  return () => {
    collect();
    collect();
  };
}
const doubleGc: Gc = collectTwice(gc);
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
/** Bodies up to 4 MiB, so a body still alive when its cycle is sampled would breach the one-body ArrayBuffer tolerance. */
const DELAYED: Sampling = { cycles: 4, warmupCycles: 1, keypressesPerCycle: 12, bodyBytesCap: 4 * 1_048_576 };
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
      focusedCycles: 4,
      detailsCycles: 4,
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

/**
 * A deterministic delayed-release renderer: it keeps every model it is handed (the focused one carries the payload
 * body) and drops each one on the `turns`-th event-loop turn after the layout call. With turns = 3 the body is still
 * reachable when the probe first looks (its first collection spans two turns) and free one re-collect round later, so it
 * is late-collected, never retained.
 */
function delayedReleaseInspector(turns: number): { inspector: Inspector; held: Set<unknown>; peak: () => number } {
  const held = new Set<unknown>();
  let peak = 0;
  const releaseAfter = (model: unknown, remaining: number): void => {
    setImmediate(() => {
      if (remaining > 1) releaseAfter(model, remaining - 1);
      else held.delete(model);
    });
  };
  return {
    held,
    peak: () => peak,
    inspector: {
      ...inspector,
      layoutInspector: (model, state, size) => {
        held.add(model);
        peak = Math.max(peak, held.size);
        releaseAfter(model, turns);
        return layoutInspector(model, state, size);
      },
    },
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

describe("W21-C respin folds F1/F4/F5/F7 (wb-9x5.3, owner 13:30Z rulings)", () => {
  it("F1: records focusedCycles and detailsCycles for a real run and both equal the cycle count", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.focusedCycles).toBe(SMALL.cycles);
    expect(receipt.falsifier?.detailsCycles).toBe(SMALL.cycles);
  }, 120_000);

  it("F1: a run whose focus never takes hold is exit 2, never a pass (an inspector that ignores f/e)", async () => {
    const deaf: Inspector = {
      ...inspector,
      reduceInspectorKey: (data, state, model) => (data === "f" || data === "e" ? { state } : reduceInspectorKey(data, state, model)),
    };
    const receipt = await run({ Projection: ObservationProjection, inspector: deaf, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.focusedCycles).toBe(0);
    expect(receipt.falsifier?.detailsCycles).toBe(0);
    const rules = receipt.violations.map((violation) => violation.rule);
    expect(rules).toContain("focus-not-held-every-cycle");
    expect(rules).toContain("details-not-held-every-cycle");
    expect(receipt.exitCode).toBe(2);
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(2);
  }, 120_000);

  it("F1: exit 2 when focusedCycles or detailsCycles differ from the cycle count, and absent counters are not a pass", () => {
    const focus = passingReceipt();
    if (focus.falsifier) focus.falsifier.focusedCycles = 3;
    const focusVerdict = assess(focus);
    expect(focusVerdict.exitCode).toBe(2);
    expect(focusVerdict.violations.map((violation) => violation.rule)).toContain("focus-not-held-every-cycle");
    const details = passingReceipt();
    if (details.falsifier) details.falsifier.detailsCycles = 0;
    expect(assess(details).violations.map((violation) => violation.rule)).toContain("details-not-held-every-cycle");
    const absent = passingReceipt();
    if (absent.falsifier) {
      delete absent.falsifier.focusedCycles;
      delete absent.falsifier.detailsCycles;
    }
    expect(assess(absent).exitCode).toBe(2);
  });

  it("F7: labels the series non-comparable to production, naming both limit triples", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.comparability).toBe("non-comparable to production (bench limits 12000/128/40 vs 2000/20000/100)");
  }, 120_000);

  it("F5: states the warmup-anchor choice as a header constant before the measurements", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(WARMUP_ANCHOR.choice).toBe("last-warmup-sample");
    expect(receipt.warmupAnchor).toEqual({ ...WARMUP_ANCHOR });
    const keys = Object.keys(receipt);
    expect(keys.indexOf("warmupAnchor")).toBeGreaterThan(-1);
    expect(keys.indexOf("warmupAnchor")).toBeLessThan(keys.indexOf("baseline"));
    expect(keys.indexOf("warmupAnchor")).toBeLessThan(keys.indexOf("series"));
    expect(keys.indexOf("comparability")).toBeLessThan(keys.indexOf("series"));
  }, 120_000);

  it("F4: the post-GC slope stays UNDETERMINED in the receipt text", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.summary?.heapSlopeVerdict).toBe("UNDETERMINED");
    expect(receipt.summary?.heapSlopeLabel).toMatch(/UNDETERMINED/);
    expect(receipt.summary?.heapSlopeLabel).toMatch(/not a leak claim/);
  }, 120_000);
});

describe("W21-C bounded re-collect before a body counts as retained (wb-9x5.3 respin U2, owner 01:42Z)", () => {
  it("states RELEASE_RECHECK_ROUNDS as a header constant, written into the receipt before the baseline and the series", async () => {
    expect(recheckRounds()).toBe(3);
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.releaseRecheck?.rounds).toBe(recheckRounds());
    expect(receipt.releaseRecheck?.rule).toMatch(/late-collected/);
    expect(receipt.releaseRecheck?.rule).toMatch(/retained/);
    const keys = Object.keys(receipt);
    expect(keys.indexOf("releaseRecheck")).toBeGreaterThan(-1);
    expect(keys.indexOf("releaseRecheck")).toBeLessThan(keys.indexOf("baseline"));
    expect(keys.indexOf("releaseRecheck")).toBeLessThan(keys.indexOf("series"));
    for (const sample of receipt.series) {
      expect(Number.isInteger(sample.releaseRounds)).toBe(true);
      expect(sample.releaseRounds).toBeGreaterThanOrEqual(0);
      expect(sample.releaseRounds).toBeLessThanOrEqual(recheckRounds());
      expect(sample.lateCollected).toBe(sample.reachableBodies === 0 && (sample.releaseRounds ?? 0) > 0 ? 1 : 0);
    }
  }, 120_000);

  it("records a deterministic delayed-release holder as late-collected, never as retained: no reachable body, no ArrayBuffer miss, exit 0 at the W21 shape", async () => {
    const delayed = delayedReleaseInspector(3);
    const receipt = await run({ Projection: ObservationProjection, inspector: delayed.inspector, fixture: small(), host: HOST, gc, sampling: DELAYED });
    expect(receipt.falsifier?.reachableAfterBlur).toBe(0);
    expect(receipt.falsifier?.leakedCycles).toEqual([]);
    expect(receipt.falsifier?.lateCollectedCycles).toEqual(Array.from({ length: DELAYED.cycles }, (_, cycle) => cycle));
    expect(receipt.falsifier?.lateCollectedAfterBlur).toBe(DELAYED.cycles);
    for (const sample of receipt.series) {
      expect(sample.reachableBodies).toBe(0);
      expect(sample.lateCollected).toBe(1);
      expect(sample.releaseRounds).toBeGreaterThanOrEqual(1);
      expect(sample.releaseRounds).toBeLessThanOrEqual(recheckRounds());
    }
    // Sensitivity: a body larger than the one-body ArrayBuffer tolerance was issued, so a memory sample taken before
    // the late release would have breached it; the cycle's sample is taken after the probe settles.
    const perCycle = receipt.series.map((sample, at) => sample.payloadBytesOffered - (at === 0 ? 0 : receipt.series[at - 1].payloadBytesOffered));
    expect(Math.max(...perCycle)).toBeGreaterThan(RETAINED_BOUNDS.arrayBufferGrowthBytes);
    const rules = receipt.violations.map((violation) => violation.rule);
    expect(rules).not.toContain("payload-body-reachable-after-blur");
    expect(rules).not.toContain("array-buffer-growth-over-bound");
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(0);
    // The holder really held models past the probe's first look, and the probe waited until it let go of every one.
    expect(delayed.peak()).toBeGreaterThan(0);
    expect(delayed.held.size).toBe(0);
  }, 120_000);

  it("the window is exactly RELEASE_RECHECK_ROUNDS rounds: a holder that lets go inside the last round is still late-collected", async () => {
    // The first look follows one collection (two event-loop turns) and each round adds two more, so a holder that drops
    // the body on turn 2 * (1 + RELEASE_RECHECK_ROUNDS) is caught by the last round's second collection.
    const lastTurn = 2 * (1 + recheckRounds());
    // wb-xn2: this is the only case whose body is freed by the probe's LAST collection, so it alone sampled
    // process.memoryUsage().arrayBuffers before V8's background sweeper had finished with the freed store (red in four
    // full-suite landing gates, 1 test in ~6800, never in serial). The injected `doubleGc` collects twice per call; the
    // second collection completes the first one's pending sweep before it starts, so the sample does not depend on
    // sweeper timing. The module, RETAINED_BOUNDS and RELEASE_RECHECK_ROUNDS are untouched; no allowlist, no skip.
    // (An earlier cut, eea4eda, waited for the counter to stop moving; that criterion never engaged, because each 2 ms
    // pause allocated a fresh 4-byte SharedArrayBuffer and so moved the very counter it watched by 4 B: every call ran
    // to its 200-read bound, an accidental ~420 ms fixed wait. Replaced.)
    const delayed = delayedReleaseInspector(lastTurn);
    const receipt = await run({ Projection: ObservationProjection, inspector: delayed.inspector, fixture: small(), host: HOST, gc: doubleGc, sampling: DELAYED });
    expect(receipt.falsifier?.reachableAfterBlur).toBe(0);
    expect(receipt.falsifier?.lateCollectedCycles).toEqual(Array.from({ length: DELAYED.cycles }, (_, cycle) => cycle));
    for (const sample of receipt.series) {
      expect(sample.reachableBodies).toBe(0);
      expect(sample.lateCollected).toBe(1);
      expect(sample.releaseRounds).toBe(recheckRounds());
    }
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(0);
    expect(delayed.held.size).toBe(0);
  }, 120_000);

  it("the window is bounded: a holder that lets go only after the last re-collect round is retained and exits 1", async () => {
    const delayed = delayedReleaseInspector(2 * (1 + recheckRounds()) + 1);
    const receipt = await run({ Projection: ObservationProjection, inspector: delayed.inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.leakedCycles).toEqual(Array.from({ length: SMALL.cycles }, (_, cycle) => cycle));
    expect(receipt.falsifier?.lateCollectedCycles).toEqual([]);
    for (const sample of receipt.series) {
      expect(sample.reachableBodies).toBe(1);
      expect(sample.lateCollected).toBe(0);
      expect(sample.releaseRounds).toBe(recheckRounds());
    }
    expect(receipt.violations.map((violation) => violation.rule)).toContain("payload-body-reachable-after-blur");
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(1);
    // The last cycle's holder lets go one turn after the run returns; drain it so nothing outlives this test.
    for (let turn = 0; turn < 4 && delayed.held.size > 0; turn++) await new Promise((resolve) => setImmediate(resolve));
    expect(delayed.held.size).toBe(0);
  }, 120_000);

  it("a body the renderer never releases outlives every re-collect round: retained (exit 1), never late-collected", async () => {
    const stash: unknown[] = [];
    const leaking: Inspector = {
      ...inspector,
      layoutInspector: (model, state, size) => {
        stash.push(model);
        return layoutInspector(model, state, size);
      },
    };
    const receipt = await run({ Projection: ObservationProjection, inspector: leaking, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.leakedCycles).toEqual(Array.from({ length: SMALL.cycles }, (_, cycle) => cycle));
    expect(receipt.falsifier?.lateCollectedCycles).toEqual([]);
    expect(receipt.falsifier?.lateCollectedAfterBlur).toBe(0);
    for (const sample of receipt.series) {
      expect(sample.reachableBodies).toBe(1);
      expect(sample.lateCollected).toBe(0);
      expect(sample.releaseRounds).toBe(recheckRounds());
    }
    const shaped: Receipt = { ...receipt, fixture: passingReceipt().fixture };
    expect(assess(shaped).exitCode).toBe(1);
    expect(stash.length).toBeGreaterThan(0);
  }, 120_000);

  it("judges the positive control through the same bounded probe: held through every round, released once dropped", async () => {
    const receipt = await run({ Projection: ObservationProjection, inspector, fixture: small(), host: HOST, gc, sampling: SMALL });
    expect(receipt.falsifier?.control).toEqual({ detectedWhileHeld: true, releasedAfterDrop: true });
    expect(receipt.falsifier?.controlProbeRounds?.whileHeld).toBe(recheckRounds());
    expect(receipt.falsifier?.controlProbeRounds?.afterDrop).toBeGreaterThanOrEqual(0);
    expect(receipt.falsifier?.controlProbeRounds?.afterDrop).toBeLessThanOrEqual(recheckRounds());
  }, 120_000);

  it("never judges a late-collected sample as retained, while a retained sample keeps exit 1", () => {
    const late = passingReceipt();
    late.series = late.series.map((sample, at) => (at === 2 ? { ...sample, lateCollected: 1, releaseRounds: 1 } : sample));
    if (late.falsifier) {
      late.falsifier.lateCollectedCycles = [2];
      late.falsifier.lateCollectedAfterBlur = 1;
    }
    expect(exitCode(late)).toBe(0);
    const retained = passingReceipt();
    retained.series = retained.series.map((sample, at) => (at === 2 ? { ...sample, reachableBodies: 1, releaseRounds: recheckRounds() } : sample));
    expect(exitCode(retained)).toBe(1);
  });
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

  it("prints the receipt before the file write, sets the exit code only from the publication, and drives compiled dist/ only", () => {
    // One-liner batch item (5), bound onto wb-9x5.3 by name (owner 01:42Z): the receipt line is printed BEFORE the file
    // write. The write-before-print order this pin held at ea221f1 flips here, in the same commit as the behaviour.
    const module = readRepo("qa/workbench/retained-memory.mjs");
    const printed = module.indexOf("log(line);");
    const written = module.indexOf("writeFile(path, ");
    expect(printed).toBeGreaterThan(-1);
    expect(written).toBeGreaterThan(printed);
    const text = readRepo("qa/workbench/inspector-retained-memory-bench.mjs");
    expect(text).toContain("process.exitCode = publishRetainedReceipt(receipt, {path: process.env.W21_RETAINED_RECEIPT});");
    expect(text).not.toMatch(/writeFileSync\s*\(/);
    expect(text).not.toMatch(/console\.log\s*\(/);
    expect(text).not.toContain("retainedExitCodeFor");
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

describe("W21-C receipt publication: printed before the file write; a failed write exits 3 with the receipt on stdout (one-liner batch item (5), bound onto wb-9x5.3 by name)", () => {
  interface Event {
    kind: "log" | "error" | "write";
    text: string;
    path?: string;
  }
  const recorder = (failWith?: Error): { events: Event[]; io: Required<Pick<PublishIo, "log" | "logError" | "writeFile">> } => {
    const events: Event[] = [];
    return {
      events,
      io: {
        log: (line) => {
          events.push({ kind: "log", text: line });
        },
        logError: (line) => {
          events.push({ kind: "error", text: line });
        },
        writeFile: (path, text) => {
          if (failWith) throw failWith;
          events.push({ kind: "write", text, path });
        },
      },
    };
  };
  const overBound = (): Receipt => {
    const receipt = passingReceipt();
    if (receipt.summary) receipt.summary.heapGrowthAfterWarmupBytes = RETAINED_BOUNDS.heapGrowthAfterWarmupBytes + 1;
    return receipt;
  };
  const notTheShape = (): Receipt => {
    const receipt = passingReceipt();
    receipt.fixture = { ...receipt.fixture, nodes: 500 };
    return receipt;
  };
  const RECEIPTS: [string, () => Receipt, number][] = [
    ["within-bound", passingReceipt, 0],
    ["over-bound", overBound, 1],
    ["not-measured", notTheShape, 2],
  ];

  it.each(RECEIPTS)("prints the %s receipt line first, then writes the same line, then returns its exit code", (_label, make, expected) => {
    const receipt = make();
    const { events, io } = recorder();
    expect(publishWith(receipt, { ...io, path: "/var/tmp/retained-receipt.json" })).toBe(expected);
    const line = JSON.stringify(receipt);
    expect(events).toEqual([
      { kind: "log", text: line },
      { kind: "write", text: `${line}\n`, path: "/var/tmp/retained-receipt.json" },
    ]);
  });

  it("prints the receipt and writes nothing when no receipt path is set", () => {
    const receipt = passingReceipt();
    const { events, io } = recorder();
    expect(publishWith(receipt, io)).toBe(0);
    expect(events).toEqual([{ kind: "log", text: JSON.stringify(receipt) }]);
  });

  it("returns the exit code recomputed from the receipt's own series and summary, never a stored exitCode field", () => {
    const receipt = overBound();
    expect(receipt.exitCode).toBe(0);
    const { io } = recorder();
    expect(publishWith(receipt, io)).toBe(1);
  });

  it.each(RECEIPTS)("exits 3, never the %s receipt's own code, when the receipt write fails, with the receipt already printed and the failure on stderr", (_label, make) => {
    const receipt = make();
    const failure = new Error("ENOENT: no such file or directory, open '/nonexistent/receipt.json'");
    const { events, io } = recorder(failure);
    expect(publishWith(receipt, { ...io, path: "/nonexistent/receipt.json" })).toBe(3);
    expect(events.map((event) => event.kind)).toEqual(["log", "error"]);
    expect(events[0].text).toBe(JSON.stringify(receipt));
    expect(JSON.parse(events[1].text)).toEqual({
      benchmark: "inspector-retained-memory-grouped-10k",
      error: "receipt-write-failed",
      path: "/nonexistent/receipt.json",
      detail: failure.message,
    });
  });

  it("uses the real file writer by default: the file holds the printed line, and an unwritable path exits 3", () => {
    const dir = mkdtempSync(join(tmpdir(), "wb-9x5.3-receipt-"));
    try {
      const receipt = passingReceipt();
      const printed: string[] = [];
      const errors: string[] = [];
      const io: PublishIo = {
        log: (line) => {
          printed.push(line);
        },
        logError: (line) => {
          errors.push(line);
        },
      };
      const target = join(dir, "receipt.json");
      expect(publishWith(receipt, { ...io, path: target })).toBe(0);
      expect(printed).toEqual([JSON.stringify(receipt)]);
      expect(readFileSync(target, "utf8")).toBe(`${printed[0]}\n`);
      const unwritable = join(dir, "missing", "receipt.json");
      expect(publishWith(receipt, { ...io, path: unwritable })).toBe(3);
      expect(printed).toEqual([JSON.stringify(receipt), JSON.stringify(receipt)]);
      expect(errors).toHaveLength(1);
      expect(JSON.parse(errors[0])).toMatchObject({ benchmark: "inspector-retained-memory-grouped-10k", error: "receipt-write-failed", path: unwritable });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

describe("wb-xn2 collectTwice: the window case's collector runs the raw collection twice per call", () => {
  it("each call performs exactly two raw collections, back to back, and none between calls", () => {
    const calls: number[] = [];
    const twice = collectTwice(() => calls.push(calls.length));
    twice();
    expect(calls).toEqual([0, 1]);
    twice();
    expect(calls).toEqual([0, 1, 2, 3]);
  });
});
