/** W21 (wb-9x5.5): bounded Pi tool reply size and build-latency receipt over the grouped-10k fixture.
 * Measurement-only: the bench drives compiled dist/ observeInvocation (wb-752.2) over the wb-9x5.1 fixture, and no
 * production cap moves. Spec (docs/workbench/14-qa-and-benchmarks.md#performance-benchmark): measure "Pi model tool
 * response size under bounded queries" on the deterministic fixture and "report measured hardware/toolchain and
 * outliers. No invented pass numbers." This guard checks receipt completeness, the cap-never-exceeded falsifier, the
 * exit semantics (including exit 3 with the receipt already on stdout when the receipt file cannot be written, owner O1
 * bound by name on wb-9x5.5), determinism of the non-timing fields, and that src/ stays untouched. It never asserts a
 * measured latency or a measured byte value.
 */
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  INVOCATION_ID,
  SCOPE,
} from "../qa/workbench/grouped-fixture.mjs";
import {
  assessToolReplyReceipt,
  BYTE_CAPS,
  PAGE_LIMIT,
  publishReceipt,
  runToolReplyBench,
  SHAPE_NAMES,
  TOOL_REPLY_CONTRACT,
} from "../qa/workbench/tool-reply-bench.mjs";
import { type ObservationEvent, ObservationProjection } from "../src/workbench/observation.js";
import {
  OBSERVE_DEFAULT_MAX_BYTES,
  OBSERVE_MAX_LIMIT,
  OBSERVE_MAX_MAX_BYTES,
  type ObserveReply,
  type ObserveRequest,
  observeInvocation,
} from "../src/workbench/observe-query.js";

interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Series {
  id: string;
  shape: string;
  cap: number;
  replies: number;
  offeredNodes: number;
  scannedNodes: number;
  returnedNodes: number;
  truncatedReplies: number;
  droppedNodesForBytes: number;
  finalCursorNull: boolean;
  repliesWithRelations: number;
  repliesWithEvents: number;
  overCap: number;
  maxOverBy: number;
  selfReportedMismatch: number;
  bytes: Distribution;
  buildMs: Distribution;
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
  fixture: Record<string, unknown> & { updates: number };
  limits: Record<string, number>;
  limitsLabel: string;
  productionCaps: { defaultMaxBytes: number; maxMaxBytes: number; maxLimit: number };
  caps: number[];
  pageLimit: number;
  offered: { nodes: number; edges: number; updates: number };
  retained: { nodes: number; events: number; edges: number };
  apply: { ingestApplied: number; ingestDuplicate: number; ingestOutOfOrder: number };
  selectorValues: { tone: string | null; kind: string | null };
  series: Series[];
  outliers: { rule: string; largestReplies: unknown[]; slowestBuilds: unknown[] };
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
interface GroupedFixture {
  snapshots: unknown[];
  relations: unknown[];
  updates: ObservationEvent[];
  shape: Record<string, unknown>;
}
type Observe = (reader: ObservationProjection, request: ObserveRequest) => ObserveReply;

const run = runToolReplyBench as (input: {
  Projection: typeof ObservationProjection;
  observeInvocation: Observe;
  fixture: GroupedFixture;
  host: Host;
  production?: { defaultMaxBytes: number; maxMaxBytes: number; maxLimit: number };
}) => Receipt;
const assess = assessToolReplyReceipt as (receipt: Receipt) => {
  realised: boolean;
  violations: Array<{ rule: string; detail: string }>;
  over: string[];
  pass: boolean;
  exitCode: number;
};
const build = buildGroupedFixture as (options?: { seed: number; nodes: number; depth: number; ticks: number }) => GroupedFixture;
const shapeOf = assessFixtureShape as (shape: Record<string, unknown>) => { realised: boolean };

const HOST: Host = {
  utc: "2026-10-15T00:00:00.000Z",
  revision: "test-revision",
  node: process.version,
  arch: process.arch,
  platform: process.platform,
  cpus: 1,
  cpuModel: "test-cpu",
  toolchain: { node: process.version, typescript: "test", piTui: "test" },
  command: "vitest test/workbench-tool-reply-bench.test.ts",
};
const SHAPES = ["plain", "tone", "kind", "relations", "events", "relations+events"];
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const clone = (receipt: Receipt): Receipt => structuredClone(receipt);
const finite = (value: Distribution): boolean =>
  value.samples > 0 &&
  [value.p50, value.p95, value.max].every((n) => typeof n === "number" && Number.isFinite(n) && n >= 0) &&
  (value.p50 ?? 0) <= (value.p95 ?? 0) &&
  (value.p95 ?? 0) <= (value.max ?? 0);

let cached: { receipt: Receipt; constructed: unknown[][]; requests: ObserveRequest[] } | undefined;
const smallRun = () => {
  if (cached) return cached;
  const constructed: unknown[][] = [];
  const requests: ObserveRequest[] = [];
  class SpyProjection extends ObservationProjection {
    constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
      super(...args);
      constructed.push(args);
    }
  }
  const spy: Observe = (reader, request) => {
    requests.push(request);
    return observeInvocation(reader, request);
  };
  const fixture = build({ seed: 9, nodes: 900, depth: 5, ticks: 140 });
  cached = { receipt: run({ Projection: SpyProjection, observeInvocation: spy, fixture, host: HOST }), constructed, requests };
  return cached;
};

/** A receipt that is the W21 claim, measured and within every cap, derived from the real small run. */
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
  return receipt;
};

describe("W21 tool-reply receipt: contract and completeness (C1, C4)", () => {
  it("names the frozen contract and states the caps and shapes as exported constants", () => {
    expect(TOOL_REPLY_CONTRACT).toBe("workbench.tool-reply-bench/v1");
    expect(BYTE_CAPS).toEqual([16_384, 65_536]);
    expect(BYTE_CAPS).toEqual([OBSERVE_DEFAULT_MAX_BYTES, OBSERVE_MAX_MAX_BYTES]);
    expect(PAGE_LIMIT).toBe(OBSERVE_MAX_LIMIT);
    expect(SHAPE_NAMES).toEqual(SHAPES);
  });

  it("emits host, toolchain, fixture shape, limits and one series per shape and cap", () => {
    const { receipt } = smallRun();
    expect(receipt.contract).toBe("workbench.tool-reply-bench/v1");
    expect(receipt.measured).toBe(true);
    for (const key of ["utc", "revision", "node", "arch", "platform", "cpuModel", "command"] as const) {
      expect(typeof receipt[key]).toBe("string");
      expect(receipt[key].length).toBeGreaterThan(0);
    }
    expect(receipt.cpus).toBeGreaterThan(0);
    expect(Object.keys(receipt.toolchain).sort()).toEqual(["node", "piTui", "typescript"]);
    expect(receipt.limits).toEqual(BENCH_ONLY_LIMITS);
    expect(receipt.limitsLabel).toMatch(/bench-only/);
    expect(receipt.limitsLabel).toMatch(/production caps untouched/);
    expect(receipt.caps).toEqual([16_384, 65_536]);
    expect(receipt.pageLimit).toBe(40);
    expect(receipt.series.map((series) => series.id)).toEqual(
      BYTE_CAPS.flatMap((cap: number) => SHAPES.map((shape) => `${shape}@${cap}`)),
    );
    for (const series of receipt.series) {
      expect(series.replies).toBeGreaterThan(0);
      expect(finite(series.bytes)).toBe(true);
      expect(finite(series.buildMs)).toBe(true);
      expect(series.bytes.samples).toBe(series.replies);
      expect(series.buildMs.samples).toBe(series.replies);
    }
    expect(receipt.outliers.largestReplies.length).toBeGreaterThan(0);
    expect(receipt.outliers.slowestBuilds.length).toBeGreaterThan(0);
  }, 120_000);

  it("constructs the projection exactly once, with exactly the bench-only limits, and truncates nothing", () => {
    const { receipt, constructed } = smallRun();
    expect(constructed).toEqual([[{ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 }]]);
    expect(receipt.apply.ingestApplied).toBe(receipt.offered.updates);
    expect(receipt.retained.nodes).toBe(receipt.offered.nodes);
    expect(receipt.retained.edges).toBe(receipt.offered.edges);
    expect(receipt.realised).toBe(false);
    expect(receipt.exitCode).toBe(2);
    expect(receipt.violations.map((violation) => violation.rule)).toContain("updates-below-100000");
  }, 120_000);

  it("records offered versus returned counts and pages every series to the end of the viewport", () => {
    const { receipt } = smallRun();
    for (const series of receipt.series) {
      expect(series.offeredNodes).toBe(receipt.offered.nodes);
      expect(series.scannedNodes).toBe(series.offeredNodes);
      expect(series.finalCursorNull).toBe(true);
      expect(series.returnedNodes).toBeLessThanOrEqual(series.scannedNodes);
    }
    const plain = receipt.series.find((series) => series.id === "plain@16384");
    expect(plain?.returnedNodes).toBe(plain?.offeredNodes);
    expect(receipt.selectorValues.tone).not.toBeNull();
    expect(receipt.selectorValues.kind).not.toBeNull();
  }, 120_000);

  it("exercises every selector: relations and events ride only the shapes that ask for them", () => {
    const { receipt, requests } = smallRun();
    const byShape = (shape: string) => receipt.series.filter((series) => series.shape === shape);
    for (const shape of ["relations", "relations+events"]) for (const series of byShape(shape)) expect(series.repliesWithRelations).toBeGreaterThan(0);
    for (const shape of ["events", "relations+events"]) for (const series of byShape(shape)) expect(series.repliesWithEvents).toBeGreaterThan(0);
    for (const shape of ["plain", "tone", "kind"]) for (const series of byShape(shape)) expect(series.repliesWithRelations + series.repliesWithEvents).toBe(0);
    const paged = requests.filter((request) => request.maxBytes !== undefined);
    expect(requests.length - paged.length).toBe(1);
    expect(requests.find((request) => request.maxBytes === undefined)?.limit).toBe(1);
    expect(paged.length).toBeGreaterThan(0);
    for (const request of paged) {
      expect(request.scope).toEqual(SCOPE);
      expect(request.invocationId).toBe(INVOCATION_ID);
      expect(request.limit).toBe(40);
      expect([16_384, 65_536]).toContain(request.maxBytes);
    }
  }, 120_000);
});

describe("W21 tool-reply cap-never-exceeded falsifier (C2)", () => {
  it("holds every reply of the real builder within its maxBytes, measured independently of the reply", () => {
    const { receipt } = smallRun();
    for (const series of receipt.series) {
      expect(series.overCap).toBe(0);
      expect(series.maxOverBy).toBe(0);
      expect(series.bytes.max ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(series.cap);
    }
    expect(receipt.over).toEqual([]);
  }, 120_000);

  it("records an oversize reply as a finding with exit 1 naming the series, never tuned away", () => {
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 6 });
    const bloated: Observe = (reader, request) => {
      const reply = observeInvocation(reader, request);
      return { ...reply, invocationId: `${reply.invocationId}${"x".repeat(70_000)}` };
    };
    const receipt = run({ Projection: ObservationProjection, observeInvocation: bloated, fixture, host: HOST });
    expect(receipt.series.every((series) => series.overCap === series.replies)).toBe(true);
    expect(receipt.series.every((series) => series.maxOverBy > 0)).toBe(true);
    expect(receipt.over).toContain("cap-exceeded:plain@16384");
    expect(receipt.over).toContain("cap-exceeded:relations+events@65536");
  }, 60_000);

  it("counts a reply whose self-reported bytes understate its real size toward the same falsifier", () => {
    const fixture = build({ seed: 3, nodes: 200, depth: 5, ticks: 6 });
    const liar: Observe = (reader, request) => {
      const reply = observeInvocation(reader, request);
      return { ...reply, bytes: 1, invocationId: `${reply.invocationId}${"y".repeat(20_000)}` };
    };
    const receipt = run({ Projection: ObservationProjection, observeInvocation: liar, fixture, host: HOST });
    const small = receipt.series.find((series) => series.id === "plain@16384");
    expect(small?.overCap).toBe(small?.replies);
    expect(small?.selfReportedMismatch).toBe(small?.replies);
    expect(receipt.over).toContain("cap-exceeded:plain@16384");
  }, 60_000);
});

describe("W21 tool-reply exit semantics (C2, C3, C4)", () => {
  it("exits 0 only for a realised W21 receipt with every reply within its cap", () => {
    const receipt = realisedReceipt();
    expect(shapeOf(receipt.fixture).realised).toBe(true);
    const verdict = assess(receipt);
    expect(verdict.violations).toEqual([]);
    expect(verdict.over).toEqual([]);
    expect(verdict.exitCode).toBe(0);
    expect(verdict.pass).toBe(true);
  }, 120_000);

  it("exits 1 for a reply over its cap, and never judges a slow build", () => {
    const over = realisedReceipt();
    over.series[0].overCap = 1;
    over.series[0].maxOverBy = 12;
    expect(assess(over).over).toEqual([`cap-exceeded:${over.series[0].id}`]);
    expect(assess(over).exitCode).toBe(1);
    const slow = realisedReceipt();
    for (const series of slow.series) series.buildMs = { samples: series.replies, p50: 900, p95: 950, max: 999 };
    expect(assess(slow).exitCode).toBe(0);
  }, 120_000);

  it("exits 2 for a wrong-shape fixture, a truncated projection, unapplied updates, an unsampled or unfinished series", () => {
    const shape = realisedReceipt();
    shape.fixture.updates = 99_999;
    expect(assess(shape).violations.map((violation) => violation.rule)).toContain("updates-below-100000");
    expect(assess(shape).exitCode).toBe(2);
    const truncated = realisedReceipt();
    truncated.retained.nodes -= 1;
    expect(assess(truncated).violations.map((violation) => violation.rule)).toContain("projection-truncated");
    const unapplied = realisedReceipt();
    unapplied.apply.ingestOutOfOrder = 1;
    unapplied.apply.ingestApplied -= 1;
    expect(assess(unapplied).violations.map((violation) => violation.rule)).toContain("updates-not-applied");
    const unsampled = realisedReceipt();
    unsampled.series[3].bytes = { samples: 0, p50: null, p95: null, max: null };
    expect(assess(unsampled).violations.map((violation) => violation.rule)).toContain("series-not-sampled");
    const missing = realisedReceipt();
    missing.series.pop();
    expect(assess(missing).violations.map((violation) => violation.rule)).toContain("series-not-sampled");
    const unfinished = realisedReceipt();
    unfinished.series[1].scannedNodes -= 1;
    unfinished.series[2].finalCursorNull = false;
    expect(assess(unfinished).violations.map((violation) => violation.rule)).toContain("pagination-incomplete");
    const mute = realisedReceipt();
    const relations = mute.series.find((series) => series.shape === "relations");
    if (relations) relations.repliesWithRelations = 0;
    expect(assess(mute).violations.map((violation) => violation.rule)).toContain("selector-not-exercised");
    const blind = realisedReceipt();
    blind.selectorValues = { tone: null, kind: "x" };
    expect(assess(blind).violations.map((violation) => violation.rule)).toContain("selector-values-missing");
  }, 120_000);

  it("lets 2 beat 1, and recomputes the verdict from the measured fields ignoring any stored verdict", () => {
    const both = realisedReceipt();
    both.series[0].overCap = 1;
    both.fixture.updates = 99_999;
    expect(assess(both).exitCode).toBe(2);
    const stored = realisedReceipt();
    stored.exitCode = 0;
    stored.pass = true;
    stored.series[1].overCap = 2;
    expect(assess(stored).exitCode).toBe(1);
  }, 120_000);
});

describe("W21 tool-reply determinism and fixture reuse (C5)", () => {
  it("repeats every non-timing field of the receipt exactly", () => {
    const fixture = build({ seed: 4, nodes: 300, depth: 5, ticks: 110 });
    const a = run({ Projection: ObservationProjection, observeInvocation, fixture, host: HOST });
    const b = run({ Projection: ObservationProjection, observeInvocation, fixture, host: HOST });
    const stable = (receipt: Receipt) => ({
      fixture: receipt.fixture,
      offered: receipt.offered,
      retained: receipt.retained,
      apply: receipt.apply,
      selectorValues: receipt.selectorValues,
      series: receipt.series.map((series) => ({
        id: series.id,
        replies: series.replies,
        offeredNodes: series.offeredNodes,
        scannedNodes: series.scannedNodes,
        returnedNodes: series.returnedNodes,
        truncatedReplies: series.truncatedReplies,
        droppedNodesForBytes: series.droppedNodesForBytes,
        bytes: series.bytes,
        overCap: series.overCap,
      })),
    });
    expect(stable(b)).toEqual(stable(a));
  }, 120_000);

  it("reads no wall clock and draws no randomness anywhere in the module", () => {
    const text = readRepo("qa/workbench/tool-reply-bench.mjs");
    expect(text).not.toMatch(/Date\.now|Math\.random|crypto\.random/);
    const calls = [...text.matchAll(/new Date\(\s*\)/g)];
    expect(calls.length).toBeLessThanOrEqual(1);
    for (const call of calls) expect(call.index).toBeGreaterThan(text.indexOf("async function main"));
  });

  it("reuses the grouped fixture builder and forks no second fixture or limits literal", () => {
    const text = readRepo("qa/workbench/tool-reply-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map((match) => match[1]).sort();
    expect(specifiers).toEqual(["./bench-revision.mjs", "./grouped-fixture.mjs", "node:fs", "node:os", "node:url"].sort());
    expect(text).toMatch(/buildGroupedFixture/);
    expect(text).toMatch(/BENCH_ONLY_LIMITS/);
    expect(text).not.toMatch(/function\s+(?:buildGroupedFixture|seeded|mulberry32)\b|maxNodes|maxEdges/);
    const dynamic = [...text.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]/g)].map((match) => match[1]).sort();
    expect(dynamic).toEqual(["../../dist/workbench/observation.js", "../../dist/workbench/observe-query.js"]);
    expect(text).not.toMatch(/\brequire\s*\(/);
  });

  it("prints the receipt, writes it when asked, and sets the exit code only after both", () => {
    const text = readRepo("qa/workbench/tool-reply-bench.mjs");
    expect(text).toMatch(/W21_TOOL_REPLY_RECEIPT/);
    // Owner O1, bound by name on wb-9x5.5 (the one-liner batch item (5) shape of the wb-9x5.12 / wb-9x5.15 precedents):
    // the receipt line is printed BEFORE the file write. The write-before-print order this pin held at 75e94a6
    // (:424-433) flips here, in the same commit as the behaviour.
    const printed = text.indexOf("log(line);");
    const written = text.indexOf("writeFile(path, ");
    const exit = text.indexOf("process.exitCode = publishReceipt(receipt, {path: process.env.W21_TOOL_REPLY_RECEIPT});");
    expect(printed).toBeGreaterThan(-1);
    expect(written).toBeGreaterThan(printed);
    expect(exit).toBeGreaterThan(written);
    expect(text).not.toMatch(/writeFileSync\s*\(/);
  });

  it("leaves the grouped fixture semantics as they were", () => {
    const fixtureText = readRepo("qa/workbench/grouped-fixture.mjs");
    expect(fixtureText).toMatch(/export function buildGroupedFixture\(options = \{\}\)/);
    expect(fixtureText).toMatch(/export const BENCH_ONLY_LIMITS = Object\.freeze\(\{maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40\}\)/);
  });
});

describe("W21 production caps and Forge registration (C3, C6)", () => {
  it("keeps the production reply caps and lets no src/ file name the bench", () => {
    expect(OBSERVE_DEFAULT_MAX_BYTES).toBe(16_384);
    expect(OBSERVE_MAX_MAX_BYTES).toBe(65_536);
    expect(OBSERVE_MAX_LIMIT).toBe(40);
    expect(smallRun().receipt.productionCaps).toEqual({ defaultMaxBytes: 16_384, maxMaxBytes: 65_536, maxLimit: 40 });
    const root = new URL("../src/", import.meta.url);
    const named: string[] = [];
    for (const entry of readdirSync(root, { recursive: true })) {
      const file = String(entry);
      if (!file.endsWith(".ts")) continue;
      const text = readFileSync(join(root.pathname, file), "utf8");
      if (/tool-reply-bench|BENCH_ONLY_LIMITS|workbench\.tool-reply-bench/.test(text)) named.push(file);
    }
    expect(named).toEqual([]);
  });

  it("registers tool-reply-bench as a Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(/\[build\.commands\.tool-reply-bench\]\ncommand = "node qa\/workbench\/tool-reply-bench\.mjs"\ntimeout = 600\n/);
    expect(toml.match(/^\[build\.commands\.tool-reply-bench\]$/gm)).toHaveLength(1);
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/tool-reply/);
  });
});

interface PublishIo {
  path?: string;
  log?: (line: string) => void;
  logError?: (line: string) => void;
  writeFile?: (path: string, text: string) => void;
}
const publish = publishReceipt as (receipt: Receipt, io?: PublishIo) => number;

describe("W21 tool-reply receipt publication: printed before the file write; a failed write exits 3 with the receipt on stdout (owner O1, bound by name on wb-9x5.5)", () => {
  interface Published {
    kind: "log" | "error" | "write";
    text: string;
    path?: string;
  }
  const recorder = (failure?: unknown) => {
    const events: Published[] = [];
    const io: Required<Omit<PublishIo, "path">> = {
      log: (text) => {
        events.push({ kind: "log", text });
      },
      logError: (text) => {
        events.push({ kind: "error", text });
      },
      writeFile: (path, text) => {
        if (failure !== undefined) throw failure;
        events.push({ kind: "write", text, path });
      },
    };
    return { events, io };
  };
  const withStoredExit = (exitCode: number): Receipt => ({ ...realisedReceipt(), exitCode });
  const TARGET = "/var/tmp/tool-reply-receipt.json";
  const MISSING = "/nonexistent/tool-reply-receipt.json";

  it("prints the receipt line first, then writes the same line to the receipt file, then returns the receipt's own exit code", () => {
    for (const stored of [0, 1, 2]) {
      const receipt = withStoredExit(stored);
      const { events, io } = recorder();
      expect(publish(receipt, { ...io, path: TARGET })).toBe(stored);
      const line = JSON.stringify(receipt);
      expect(events).toEqual([
        { kind: "log", text: line },
        { kind: "write", text: `${line}\n`, path: TARGET },
      ]);
    }
  }, 120_000);

  it("prints the receipt and writes no file when the receipt path is unset or empty", () => {
    for (const path of [undefined, ""]) {
      const receipt = withStoredExit(0);
      const { events, io } = recorder();
      expect(publish(receipt, { ...io, path })).toBe(0);
      expect(events).toEqual([{ kind: "log", text: JSON.stringify(receipt) }]);
    }
  }, 120_000);

  for (const stored of [0, 1, 2]) {
    it(`exits 3, never the stored ${stored}, when the receipt write fails, with the receipt already printed and the failure on stderr`, () => {
      const receipt = withStoredExit(stored);
      const detail = `ENOENT: no such file or directory, open '${MISSING}'`;
      const { events, io } = recorder(new Error(detail));
      expect(publish(receipt, { ...io, path: MISSING })).toBe(3);
      expect(events.map((event) => event.kind)).toEqual(["log", "error"]);
      expect(events[0].text).toBe(JSON.stringify(receipt));
      const diagnostic: unknown = JSON.parse(events[1].text);
      expect(diagnostic).toEqual({ benchmark: "tool-reply-grouped-10k", error: "receipt-write-failed", path: MISSING, detail });
    }, 120_000);
  }

  it("states a thrown non-Error value verbatim in the write-failure diagnostic and still exits 3", () => {
    const receipt = withStoredExit(1);
    const { events, io } = recorder("disk full");
    expect(publish(receipt, { ...io, path: MISSING })).toBe(3);
    expect(events.map((event) => event.kind)).toEqual(["log", "error"]);
    const diagnostic: unknown = JSON.parse(events[1].text);
    expect(diagnostic).toEqual({ benchmark: "tool-reply-grouped-10k", error: "receipt-write-failed", path: MISSING, detail: "disk full" });
  }, 120_000);

  it("uses the real file writer by default: the file holds the printed line, and an unwritable path exits 3", () => {
    const directory = mkdtempSync(join(tmpdir(), "w21-tr-"));
    try {
      const receipt = withStoredExit(0);
      const printed: string[] = [];
      const errors: string[] = [];
      const io = { log: (line: string) => printed.push(line), logError: (line: string) => errors.push(line) };
      const target = join(directory, "receipt.json");
      expect(publish(receipt, { ...io, path: target })).toBe(0);
      expect(printed).toEqual([JSON.stringify(receipt)]);
      expect(readFileSync(target, "utf8")).toBe(`${printed[0]}\n`);
      expect(errors).toEqual([]);
      const unwritable = join(directory, "missing", "receipt.json");
      expect(publish(receipt, { ...io, path: unwritable })).toBe(3);
      expect(printed).toEqual([JSON.stringify(receipt), JSON.stringify(receipt)]);
      expect(errors).toHaveLength(1);
      const diagnostic: unknown = JSON.parse(errors[0]);
      expect(diagnostic).toMatchObject({
        benchmark: "tool-reply-grouped-10k",
        error: "receipt-write-failed",
        path: unwritable,
        detail: expect.stringContaining("ENOENT"),
      });
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }, 120_000);
});
