/** W21 (wb-9x5.12): topology slice receipt over the grouped-10k fixture. Measurement-only: src is untouched, the bench
 * drives compiled dist/ (here the TypeScript sources are injected), and a slow or truncated result is recorded, never tuned away.
 *
 * Spec lines pinned (docs/workbench/14-qa-and-benchmarks.md "Performance benchmark"):
 *   T1 "Construct deterministic fixture with >=1000 nodes, >=100000 events, 1-100 active changes per tick, 5 nested groups depth ..."
 *      and "p50/p95 layout render/navigate/resize time"  -> p50/p95/max per pass and cap set over >= 1,000 operation focuses plus every
 *      group depth 1..5; exit 2 when the W21 shape or the focus sampling is not realised.
 *   T2 "Proposed responsive target <=20ms per navigation/layout calculation on declared reference host ... report measured
 *      hardware/toolchain and outliers. No invented pass numbers." -> compared never asserted: over-target p95 exits 1 with the receipt intact.
 *   T3 docs/09 "Missing edges do not imply independence." -> remainder.count/atLeast rates and trace/reference reason histograms.
 *   T4 production caps byte-identical; bench-only 100 is a local spread.
 *   T5 reads per slice <= 2 + cycleReads in force; rows per call <= the relationPage in force.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BENCH_ONLY_LIMITS, buildGroupedFixture, INVOCATION_ID, NAVIGATION_TARGET_MS, SCOPE } from "../qa/workbench/grouped-fixture.mjs";
import {
  assessTopologyReceipt,
  BENCHMARK,
  CAP_SETS,
  DEFAULT_SAMPLING,
  exitCodeFor,
  PASS_SPECS,
  RECEIPT_CONTRACT,
  runTopologyBench,
} from "../qa/workbench/topology-slice-grouped-bench.mjs";
import { type ObservationLimits, ObservationProjection } from "../src/workbench/observation.js";
import {
  selectLinkedTopology,
  TOPOLOGY_CAVEAT,
  TOPOLOGY_CONTRACT,
  TOPOLOGY_REFERENCE_REASONS,
  TOPOLOGY_TRACE_REASONS,
} from "../src/workbench/topology-slice.js";

interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Violation {
  rule: string;
  detail: string;
}
interface Remainder {
  slices: number;
  withRemainder: number;
  atLeast: number;
  maxRemainderCount: number;
}
interface CapSetResult {
  caps: Record<string, number>;
  cycleReadsInForce: number;
  callBudget: number;
  slices: number;
  slice: { all: Distribution; operation: Distribution; group: Distribution; byDepth: Record<string, Distribution> };
  reads: { calls: Distribution; maxRowsPerCall: number; relationPage: number; violations: number };
  remainder: { upstream: Remainder; downstream: Remainder; operation: { upstream: Remainder; downstream: Remainder }; group: { upstream: Remainder; downstream: Remainder } };
  traceLabels: Record<string, number>;
  traceReasons: Record<string, number>;
  referenceReasons: Record<string, { references: number; slices: number }>;
  referencesRemainder: { max: number; slices: number };
  slowest: { kind: string; depth: number | null; ms: number; capSet: string; pass: string }[];
}
interface PassResult {
  label: string;
  maxQuery: number;
  limits: ObservationLimits;
  relationPage: number;
  offered: { nodes: number; edges: number };
  retained: { nodes: number; edges: number };
  focuses: { operations: number; groups: number; byDepth: Record<string, number>; offeredByDepth: Record<string, number>; source: string };
  capSets: Record<string, CapSetResult>;
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
  caveat: string;
  topologyContract: string;
  fixture: Record<string, number | boolean | Record<string, number>> & { realised: boolean };
  sampling: { operationFocuses: number; groupSampleCap: number };
  passes: Record<string, PassResult>;
  target: { ms: number; statistic: string; judged: string[]; over: string[] };
  readsViolations: string[];
  realised: boolean;
  violations: Violation[];
  verdict: string;
  exitCode: number;
}

const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const topology = {
  selectLinkedTopology,
  TOPOLOGY_CAVEAT,
  TOPOLOGY_CONTRACT,
  TOPOLOGY_REFERENCE_REASONS,
  TOPOLOGY_TRACE_REASONS,
};
const host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: "v24.0.0",
  arch: "x64",
  platform: "linux",
  cpus: 4,
  cpuModel: "test-cpu",
  toolchain: { node: "v24.0.0", typescript: "5.0.0" },
  command: "node qa/workbench/topology-slice-grouped-bench.mjs",
};
const SMALL = { nodes: 400, depth: 5, ticks: 100 };
const SMALL_SAMPLING = { operationFocuses: 60, groupSampleCap: 10 };
const fixtureCache = new Map<string, ReturnType<typeof buildGroupedFixture>>();
const smallFixture = () => {
  const cached = fixtureCache.get("small");
  if (cached) return cached;
  const built = buildGroupedFixture(SMALL);
  fixtureCache.set("small", built);
  return built;
};

interface RunOptions {
  clock?: () => number;
  select?: typeof selectLinkedTopology;
  keys?: string[];
}
function smallRun(options: RunOptions = {}): { receipt: Receipt; constructed: ObservationLimits[][]; focusKeys: string[] } {
  const constructed: ObservationLimits[][] = [];
  const focusKeys: string[] = [];
  class Recording extends ObservationProjection {
    constructor(limits?: ObservationLimits) {
      super(limits);
      constructed.push(limits === undefined ? [] : [limits]);
    }
  }
  const select: typeof selectLinkedTopology = (input, key, caps) => {
    focusKeys.push(key);
    return (options.select ?? selectLinkedTopology)(input, key, caps);
  };
  const receipt = runTopologyBench({
    Projection: Recording,
    topology: { ...topology, selectLinkedTopology: select },
    fixture: smallFixture(),
    host,
    sampling: SMALL_SAMPLING,
    ...(options.clock ? { clock: options.clock } : {}),
  }) as Receipt;
  return { receipt, constructed, focusKeys };
}

/** A receipt that is the W21 claim: realised shape, enough focuses, every judged p95 within target, zero read violations. */
function claimReceipt(): Receipt {
  const receipt = structuredClone(smallRun().receipt);
  receipt.fixture = {
    ...receipt.fixture,
    nodes: 10_000,
    depth: 5,
    minDepth: 5,
    groupingEdges: 12_000,
    dependencyEdges: 1_400,
    hypothesisEdges: 750,
    ownershipEdges: 0,
    updates: 100_500,
    ticks: 2_000,
    minChangesPerTick: 1,
    maxChangesPerTick: 100,
    realised: true,
  };
  for (const pass of Object.values(receipt.passes)) {
    pass.focuses.operations = 1_000;
    for (const depth of ["1", "2", "3", "4", "5"]) pass.focuses.byDepth[depth] = 3;
    pass.retained = { ...pass.offered };
    for (const capSet of Object.values(pass.capSets)) {
      const fast = (value: Distribution): void => {
        value.samples = Math.max(1, value.samples);
        value.p50 = 0.01;
        value.p95 = 0.05;
        value.max = 0.1;
      };
      fast(capSet.slice.all);
      fast(capSet.slice.operation);
      fast(capSet.slice.group);
      capSet.reads.violations = 0;
    }
  }
  return receipt;
}

describe("W21 topology receipt: shape and contract (T1/T2)", () => {
  it("emits every field with host/toolchain, fixture shape, sampling and the judged target", () => {
    const { receipt } = smallRun();
    expect(receipt.contract).toBe(RECEIPT_CONTRACT);
    expect(RECEIPT_CONTRACT).toBe("workbench.topology-slice-grouped-bench/v1");
    expect(receipt.benchmark).toBe(BENCHMARK);
    expect(receipt.measured).toBe(true);
    expect(receipt.utc).toBe(host.utc);
    expect(receipt.revision).toBe("test-revision");
    for (const field of ["node", "arch", "platform", "cpus", "cpuModel", "command"] as const) expect(receipt[field]).toBe(host[field]);
    expect(receipt.toolchain).toEqual(host.toolchain);
    expect(receipt.caveat).toBe(TOPOLOGY_CAVEAT);
    expect(receipt.topologyContract).toBe(TOPOLOGY_CONTRACT);
    expect(receipt.fixture).toMatchObject({ seed: 21, nodes: 400, depth: 5, ticks: 100, realised: false });
    expect(receipt.sampling).toEqual(SMALL_SAMPLING);
    expect(DEFAULT_SAMPLING).toEqual({ operationFocuses: 1_000, groupSampleCap: 200 });
    expect(receipt.target.ms).toBe(NAVIGATION_TARGET_MS);
    expect(receipt.target.statistic).toBe("p95");
    expect(Object.keys(receipt.passes)).toEqual(["maxQuery-40", "maxQuery-100"]);
    expect(PASS_SPECS.map((spec: { label: string }) => spec.label)).toEqual(["maxQuery-40", "maxQuery-100"]);
    expect(Object.keys(CAP_SETS)).toEqual(["defaults", "wide"]);
  }, 60_000);

  it("runs two passes over one fixture: maxQuery 40 is BENCH_ONLY_LIMITS as defined, maxQuery 100 is a local spread", () => {
    const { receipt, constructed } = smallRun();
    expect(constructed).toEqual([[{ ...BENCH_ONLY_LIMITS }], [{ ...BENCH_ONLY_LIMITS, maxQuery: 100 }]]);
    expect(BENCH_ONLY_LIMITS.maxQuery).toBe(40);
    expect(receipt.passes["maxQuery-40"].limits).toEqual({ ...BENCH_ONLY_LIMITS });
    expect(receipt.passes["maxQuery-100"].limits).toEqual({ ...BENCH_ONLY_LIMITS, maxQuery: 100 });
    // relationPage never exceeds the projection's own page cap (topology-slice.ts "Must not exceed the projection's own page cap").
    expect(receipt.passes["maxQuery-40"].relationPage).toBe(40);
    expect(receipt.passes["maxQuery-100"].relationPage).toBe(100);
    for (const pass of Object.values(receipt.passes)) {
      expect(pass.retained).toMatchObject({ nodes: pass.offered.nodes, edges: pass.offered.edges });
      expect(pass.capSets.defaults.caps).toEqual({ relationPage: pass.relationPage });
      expect(pass.capSets.wide.caps).toEqual({ perDirection: 50, references: 50, cycleReads: 256, relationPage: pass.relationPage });
      expect(pass.capSets.defaults.cycleReadsInForce).toBe(64);
      expect(pass.capSets.wide.cycleReadsInForce).toBe(256);
      expect(pass.capSets.defaults.callBudget).toBe(66);
      expect(pass.capSets.wide.callBudget).toBe(258);
    }
  }, 60_000);

  it("times every operation focus plus group focuses at each depth 1..5, reporting p50/p95/max overall and split", () => {
    const { receipt } = smallRun();
    for (const pass of Object.values(receipt.passes)) {
      expect(pass.focuses.operations).toBeGreaterThanOrEqual(SMALL_SAMPLING.operationFocuses);
      expect(Object.keys(pass.focuses.byDepth)).toEqual(["1", "2", "3", "4", "5"]);
      for (const depth of ["1", "2", "3", "4", "5"]) {
        expect(pass.focuses.byDepth[depth]).toBeGreaterThan(0);
        expect(pass.focuses.byDepth[depth]).toBeLessThanOrEqual(Math.min(pass.focuses.offeredByDepth[depth], SMALL_SAMPLING.groupSampleCap));
      }
      expect(pass.focuses.source).toMatch(/projection/);
      for (const capSet of Object.values(pass.capSets)) {
        expect(capSet.slices).toBe(pass.focuses.operations + pass.focuses.groups);
        for (const value of [capSet.slice.all, capSet.slice.operation, capSet.slice.group, ...Object.values(capSet.slice.byDepth)]) {
          expect(value.samples).toBeGreaterThan(0);
          expect(value.p50).not.toBeNull();
          expect(value.p95).not.toBeNull();
          expect(value.max).not.toBeNull();
        }
        expect(capSet.slice.all.samples).toBe(capSet.slices);
        expect(capSet.slice.operation.samples).toBe(pass.focuses.operations);
        expect(capSet.slice.group.samples).toBe(pass.focuses.groups);
        expect(Object.keys(capSet.slice.byDepth)).toEqual(["1", "2", "3", "4", "5"]);
        expect(capSet.slowest).toHaveLength(5);
        for (const entry of capSet.slowest) {
          expect(["operation", "group"]).toContain(entry.kind);
          expect(entry.capSet).toBeDefined();
          expect(entry.pass).toBe(pass.label);
        }
      }
    }
  }, 60_000);

  it("takes focus keys from the projection's own pages, deterministically, and never synthesizes one", () => {
    const first = smallRun();
    const second = smallRun();
    expect(first.focusKeys.length).toBeGreaterThan(0);
    expect(first.focusKeys).toEqual(second.focusKeys);
    const projection = new ObservationProjection(BENCH_ONLY_LIMITS);
    const fixture = smallFixture();
    for (const snapshot of fixture.snapshots) projection.refresh(snapshot);
    for (const item of fixture.relations) projection.relate(item);
    const keys = new Set<string>();
    const head = projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1 });
    for (let offset = 0; offset < head.total; offset += 100) {
      for (const node of projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset, limit: 100 }).nodes) keys.add(node.key);
    }
    expect(keys.size).toBeGreaterThan(0);
    for (const key of first.focusKeys) expect(keys.has(key)).toBe(true);
  }, 60_000);

  it("times through an injectable clock: with a unit-step clock every slice reads exactly 1 ms", () => {
    let ticks = 0;
    const { receipt } = smallRun({ clock: () => ticks++ });
    for (const pass of Object.values(receipt.passes)) {
      for (const capSet of Object.values(pass.capSets)) {
        expect(capSet.slice.all).toMatchObject({ p50: 1, p95: 1, max: 1 });
        expect(capSet.slice.operation).toMatchObject({ p50: 1, p95: 1, max: 1 });
        expect(capSet.slice.group).toMatchObject({ p50: 1, p95: 1, max: 1 });
      }
    }
  }, 60_000);

  it("keeps the timed region free of host clocks, randomness and instrumentation", () => {
    const text = readRepo("qa/workbench/topology-slice-grouped-bench.mjs");
    expect(text).not.toMatch(/Math\.random|Date\.now/);
    const begin = text.indexOf("// timed-region:begin");
    const end = text.indexOf("// timed-region:end");
    expect(begin).toBeGreaterThan(-1);
    expect(end).toBeGreaterThan(begin);
    const region = text.slice(begin, end);
    expect(region).toMatch(/selectLinkedTopology\(/);
    expect(region).not.toMatch(/Date|Math\.random|performance\.now|process\.hrtime|console\./);
    // The counting wrapper never sits in the timed region: timing reads the projection directly.
    expect(region).not.toMatch(/calls\s*(\+\+|\+=)|counting/);
  });
});

describe("W21 topology receipt: reads bound (T5)", () => {
  it("records zero violations for the real selector: calls <= 2 + cycleReads and rows per call <= relationPage", () => {
    const { receipt } = smallRun();
    for (const pass of Object.values(receipt.passes)) {
      for (const capSet of Object.values(pass.capSets)) {
        expect(capSet.reads.violations).toBe(0);
        expect(capSet.reads.relationPage).toBe(pass.relationPage);
        expect(capSet.reads.maxRowsPerCall).toBeLessThanOrEqual(pass.relationPage);
        expect(capSet.reads.calls.max).toBeLessThanOrEqual(capSet.callBudget);
        expect(capSet.reads.calls.p50).not.toBeNull();
      }
    }
    expect(receipt.readsViolations).toEqual([]);
  }, 60_000);

  it("names every cap set whose selector spends more reads than 2 + cycleReads", () => {
    const greedy: typeof selectLinkedTopology = (input, key, caps) => {
      for (let i = 0; i < 300; i++) input.relations.relations({ scope: input.scope, from: key, limit: 1 });
      return selectLinkedTopology(input, key, caps);
    };
    const { receipt } = smallRun({ select: greedy });
    for (const pass of Object.values(receipt.passes)) {
      expect(pass.capSets.defaults.reads.violations).toBeGreaterThan(0);
      expect(pass.capSets.wide.reads.violations).toBeGreaterThan(0);
    }
    expect(receipt.readsViolations).toEqual(["maxQuery-40/defaults", "maxQuery-40/wide", "maxQuery-100/defaults", "maxQuery-100/wide"]);
  }, 60_000);

  it("counts reads outside the timed region: the same selector sees one extra untimed call per focus", () => {
    const { receipt, focusKeys } = smallRun();
    const slices = Object.values(receipt.passes).reduce((sum, pass) => sum + pass.capSets.defaults.slices + pass.capSets.wide.slices, 0);
    expect(focusKeys).toHaveLength(slices * 2);
  }, 60_000);
});

describe("W21 topology receipt: remainder and reason histograms (T3)", () => {
  it("histograms every frozen trace and reference reason and rates remainder.count / atLeast per direction", () => {
    const { receipt } = smallRun();
    for (const pass of Object.values(receipt.passes)) {
      for (const capSet of Object.values(pass.capSets)) {
        expect(Object.keys(capSet.traceReasons)).toEqual([...TOPOLOGY_TRACE_REASONS]);
        expect(Object.keys(capSet.referenceReasons)).toEqual([...TOPOLOGY_REFERENCE_REASONS]);
        expect(capSet.traceLabels.observed + capSet.traceLabels["incomplete-trace"]).toBe(capSet.slices);
        for (const direction of ["upstream", "downstream"] as const) {
          const stat = capSet.remainder[direction];
          expect(stat.slices).toBe(capSet.slices);
          expect(stat.withRemainder).toBeGreaterThanOrEqual(0);
          expect(stat.atLeast).toBeLessThanOrEqual(stat.slices);
          expect(stat.maxRemainderCount).toBeGreaterThanOrEqual(0);
          expect(capSet.remainder.operation[direction].slices).toBe(pass.focuses.operations);
          expect(capSet.remainder.group[direction].slices).toBe(pass.focuses.groups);
        }
        expect(capSet.referencesRemainder.max).toBeGreaterThanOrEqual(0);
      }
    }
  }, 60_000);

  it("counts a full relation page as a lower bound (atLeast) and as relations-truncated, never as the whole neighbourhood", () => {
    const fixture = smallFixture();
    // A page of 1 is the smallest the selector accepts; every focus with a relation fills it.
    const tiny = runTopologyBench({
      Projection: ObservationProjection,
      topology,
      fixture,
      host,
      sampling: SMALL_SAMPLING,
      passes: [{ label: "page-1", limits: { ...BENCH_ONLY_LIMITS, maxQuery: 1 } }],
    }) as Receipt;
    const capSet = tiny.passes["page-1"].capSets.defaults;
    expect(tiny.passes["page-1"].relationPage).toBe(1);
    expect(capSet.remainder.downstream.atLeast + capSet.remainder.upstream.atLeast).toBeGreaterThan(0);
    expect(capSet.traceReasons["relations-truncated"]).toBeGreaterThan(0);
  }, 60_000);
});

describe("W21 topology honest exit semantics (T1/T2)", () => {
  it("exits 2 for a fast off-shape receipt and names why, before any timing judgement", () => {
    const { receipt } = smallRun();
    expect(receipt.realised).toBe(false);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.exitCode).toBe(2);
    expect(exitCodeFor(receipt)).toBe(2);
    expect(receipt.violations.map(violation => violation.rule)).toEqual(
      expect.arrayContaining(["operations-below-10000", "updates-below-100000", "operation-focuses-below-1000"]),
    );
  }, 60_000);

  it("exits 0 on the claim receipt, 1 only for a judged p95 over 20 ms (20 ms itself is within target)", () => {
    const claim = claimReceipt();
    expect(assessTopologyReceipt(claim)).toMatchObject({ exitCode: 0, verdict: "within-target", realised: true, violations: [] });
    const capSet = claim.passes["maxQuery-100"].capSets.wide;
    capSet.slice.group.p95 = NAVIGATION_TARGET_MS;
    expect(exitCodeFor(claim)).toBe(0);
    capSet.slice.group.p95 = NAVIGATION_TARGET_MS + 0.5;
    const over = assessTopologyReceipt(claim);
    expect(over.exitCode).toBe(1);
    expect(over.verdict).toBe("over-target");
    expect(over.target.over).toEqual(["maxQuery-100/wide/group"]);
    capSet.slice.group.p95 = 0.05;
    claim.passes["maxQuery-40"].capSets.defaults.slice.operation.p95 = 21;
    expect(exitCodeFor(claim)).toBe(1);
  }, 60_000);

  it("exits 1 on a reads violation even when every p95 is fast, and keeps the receipt intact", () => {
    const claim = claimReceipt();
    claim.passes["maxQuery-40"].capSets.wide.reads.violations = 3;
    const assessed = assessTopologyReceipt(claim);
    expect(assessed.exitCode).toBe(1);
    expect(assessed.readsViolations).toEqual(["maxQuery-40/wide"]);
  }, 60_000);

  it("exits 2 when the fixture is off-shape, a pass truncated, a depth is unsampled or a series was never sampled", () => {
    const shape = claimReceipt();
    shape.fixture = { ...shape.fixture, depth: 4, minDepth: 4 };
    expect(exitCodeFor(shape)).toBe(2);

    const truncated = claimReceipt();
    truncated.passes["maxQuery-40"].retained = { ...truncated.passes["maxQuery-40"].offered, nodes: truncated.passes["maxQuery-40"].offered.nodes - 1 };
    expect(exitCodeFor(truncated)).toBe(2);
    expect(assessTopologyReceipt(truncated).violations.map(violation => violation.rule)).toContain("pass-truncated");

    const fewOperations = claimReceipt();
    fewOperations.passes["maxQuery-100"].focuses.operations = 999;
    expect(exitCodeFor(fewOperations)).toBe(2);

    const unsampledDepth = claimReceipt();
    unsampledDepth.passes["maxQuery-100"].focuses.byDepth["3"] = 0;
    expect(exitCodeFor(unsampledDepth)).toBe(2);
    expect(assessTopologyReceipt(unsampledDepth).violations.map(violation => violation.rule)).toContain("group-depth-unsampled");

    const unsampled = claimReceipt();
    unsampled.passes["maxQuery-40"].capSets.defaults.slice.group = { samples: 0, p50: null, p95: null, max: null };
    expect(exitCodeFor(unsampled)).toBe(2);
    expect(assessTopologyReceipt(unsampled).violations.map(violation => violation.rule)).toContain("series-not-sampled");
  }, 60_000);

  it("keeps the CLI thin: dist imports only inside the entry guard, receipt written and printed before the exit code, exit 3 on exception", () => {
    const text = readRepo("qa/workbench/topology-slice-grouped-bench.mjs");
    const staticImports = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(staticImports).toEqual(["./grouped-fixture.mjs", "node:fs", "node:os", "node:url"].sort());
    const dynamicImports = [...text.matchAll(/await import\(\s*['"]([^'"]+)['"]\s*\)/g)].map(match => match[1]).sort();
    expect(dynamicImports).toEqual(["../../dist/workbench/observation.js", "../../dist/workbench/topology-slice.js"].sort());
    expect(text).not.toMatch(/\brequire\s*\(/);
    expect(text).not.toMatch(/maxNodes|maxEdges|new ObservationProjection/);
    expect(text).toMatch(/W21_TOPOLOGY_RECEIPT/);
    const written = text.indexOf("writeFileSync(process.env.W21_TOPOLOGY_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = exitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
    expect(text).toMatch(/process\.exit\(3\)/);
    expect(text).toMatch(/W21_REVISION/);
    expect(text).toMatch(/\{\.\.\.BENCH_ONLY_LIMITS, maxQuery: 100\}/);
  });
});

describe("W21 topology production caps stay unchanged (T4)", () => {
  it("pins the topology-slice.ts cap constants and observation.ts MAX_DEFAULT by reading the source", () => {
    const slice = readRepo("src/workbench/topology-slice.ts");
    const constants = Object.fromEntries([...slice.matchAll(/^const (DEFAULT_PER_DIRECTION|MAX_PER_DIRECTION|DEFAULT_REFERENCES|MAX_REFERENCES|DEFAULT_PAGE|MAX_PAGE|DEFAULT_CYCLE_READS|MAX_CYCLE_READS) = (\d+);/gm)].map(match => [match[1], Number(match[2])]));
    expect(constants).toEqual({
      DEFAULT_PER_DIRECTION: 10,
      MAX_PER_DIRECTION: 50,
      DEFAULT_REFERENCES: 10,
      MAX_REFERENCES: 50,
      DEFAULT_PAGE: 100,
      MAX_PAGE: 100,
      DEFAULT_CYCLE_READS: 64,
      MAX_CYCLE_READS: 256,
    });
    expect(readRepo("src/workbench/observation.ts")).toContain("const MAX_DEFAULT = {maxEvents:20_000,maxNodes:2_000,maxEdges:4_000,maxPayloadBytes:4_096,maxQuery:100};");
  });

  it("defines the bench-only limits only in grouped-fixture.mjs; the bench spreads maxQuery 100 locally and never writes src/", () => {
    expect(BENCH_ONLY_LIMITS).toEqual({ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 });
    const text = readRepo("qa/workbench/topology-slice-grouped-bench.mjs");
    expect(text).not.toMatch(/writeFileSync\([^)]*src\//);
    expect(text).not.toMatch(/\bsrc\/workbench\//);
  });
});

describe("W21 topology Forge registration", () => {
  it("registers topology-slice-grouped-bench as one additive Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.topology-slice-grouped-bench\]\ncommand = "node qa\/workbench\/topology-slice-grouped-bench\.mjs"\ntimeout = 300\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/topology/);
  });
});
