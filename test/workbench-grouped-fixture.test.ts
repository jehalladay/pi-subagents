/** W21 (wb-9x5.1): deterministic grouped-10k fixture, two-pass inspector bench receipt, honest exit semantics.
 * Measurement-only: the fixture module is pure ESM, the bench drives compiled dist/, and no production cap moves.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  assessFixtureShape,
  BENCH_ONLY_LIMITS,
  buildGroupedFixture,
  exitCodeFor,
  FIXTURE_EPOCH_MS,
  FIXTURE_PROVENANCE,
  GROUPED_FIXTURE_DEFAULTS,
  INVOCATION_ID,
  NAVIGATION_TARGET_MS,
  RECEIPT_CONTRACT,
  runGroupedBench,
  SCOPE,
} from "../qa/workbench/grouped-fixture.mjs";
import { initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import {
  type NativeRef,
  type NativeSnapshot,
  type ObservationEvent,
  type ObservationLimits,
  ObservationProjection,
} from "../src/workbench/observation.js";

type RelateInput = Parameters<ObservationProjection["relate"]>[0];
interface FixtureOptions {
  seed: number;
  nodes: number;
  depth: number;
  ticks: number;
}
interface FixtureShape {
  contract: string;
  seed: number;
  nodes: number;
  groups: number;
  snapshots: number;
  depth: number;
  minDepth: number;
  groupingEdges: number;
  dependencyEdges: number;
  hypothesisEdges: number;
  ownershipEdges: number;
  causationEdges: number;
  updates: number;
  ticks: number;
  minChangesPerTick: number;
  maxChangesPerTick: number;
  providers: Record<string, number>;
  collidingIds: number;
  minTitleBytes: number;
  maxTitleBytes: number;
  payloadRefs: number;
  minPayloadRefBytes: number;
  maxPayloadRefBytes: number;
}
interface GroupedFixture {
  snapshots: NativeSnapshot[];
  relations: RelateInput[];
  updates: ObservationEvent[];
  shape: FixtureShape;
}
interface Violation {
  rule: string;
  detail: string;
}
interface Distribution {
  samples: number;
  p50: number | null;
  p95: number | null;
  max: number | null;
}
interface Navigation {
  keypresses: number;
  frames: number;
  enterOnGroupRows: number;
  all: Distribution;
  reducer: Distribution;
  layout: Distribution;
  resize: Distribution;
  changedBytes: Distribution;
  byView: Record<string, Distribution>;
  bySize: Record<string, Distribution>;
  byKey: Record<string, Distribution>;
  maxRenderedRows: number;
  maxTerminalBytes: number;
  maxChangedBytes: number;
}
interface Census {
  rows: number;
  groups: number;
  operations: number;
  current: number;
  stale: number;
  unknown: number;
  providers: Record<string, number>;
  edgesBetweenRetainedRows: number;
  edgesByKind: Record<string, number>;
  danglingEdges: number;
  complete: boolean;
}
interface Pass {
  label: string;
  limits: "default" | ObservationLimits;
  limitsLabel: string;
  constructorArgs: number;
  offered: {
    nodes: number;
    groups: number;
    operations: number;
    edges: number;
    groupingEdges: number;
    dependencyEdges: number;
    hypothesisEdges: number;
    updates: number;
  };
  apply: {
    refreshMs: number;
    relateMs: number;
    ingestMs: number;
    eventsPerSecond: number;
    refreshApplied: number;
    refreshOutOfOrder: number;
    ingestApplied: number;
    ingestDuplicate: number;
    ingestOutOfOrder: number;
    ingestPerTick: Distribution;
  };
  retained: { nodes: number; events: number; edges: number };
  census: Census;
  truncation: { truncated: boolean; nodesNotRetained: number; edgesNotRetained: number; eviction: string };
  heapGrowthBytes: number;
  heapLabel: string;
  navigation: Navigation | null;
}
type PassLabel = "default-limits" | "bench-only-limits";
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
interface Receipt extends Host {
  contract: string;
  benchmark: string;
  measured: boolean;
  aggregation: string;
  fixture: FixtureShape;
  sampling: {
    blocks: number;
    keypressesPerBlock: number;
    keypresses: number;
    resizeSamples: number;
    warmupKeypresses: number;
    sizes: string[];
  };
  passes: Record<PassLabel, Pass>;
  target: { ms: number; statistic: string; pass: string; judged: string[]; over: string[] };
  realised: boolean;
  violations: Violation[];
  verdict: string;
  exitCode: number;
}
interface Inspector {
  initialInspectorState: typeof initialInspectorState;
  layoutInspector: typeof layoutInspector;
  reduceInspectorKey: typeof reduceInspectorKey;
}
interface Sampling {
  blocks: number;
  keypressesPerBlock: number;
  resizeSamples: number;
}

const build = buildGroupedFixture as (options?: Partial<FixtureOptions>) => GroupedFixture;
const assess = assessFixtureShape as (shape: FixtureShape) => { realised: boolean; violations: Violation[] };
const run = runGroupedBench as (input: {
  Projection: typeof ObservationProjection;
  inspector: Inspector;
  fixture: GroupedFixture;
  host: Host;
  sampling?: Sampling;
}) => Receipt;
const exitCode = exitCodeFor as (receipt: Receipt) => number;

const refKey = (ref: NativeRef): string => JSON.stringify([ref.provider, ref.type, ref.scope ?? "", ref.id]);
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
  command: "vitest test/workbench-grouped-fixture.test.ts",
};
const STAMP = "2026-10-15T00:00:00Z";
const CJK = /[\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7af]/u;
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/u;
const bytes = (text: string): number => Buffer.byteLength(text);
const readRepo = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

let cachedDefault: GroupedFixture | undefined;
const defaultFixture = (): GroupedFixture => {
  cachedDefault ??= build();
  return cachedDefault;
};
let cachedSmallRun: { receipt: Receipt; constructed: Array<ConstructorParameters<typeof ObservationProjection>> } | undefined;
const smallRun = () => {
  if (cachedSmallRun) return cachedSmallRun;
  const constructed: Array<ConstructorParameters<typeof ObservationProjection>> = [];
  class SpyProjection extends ObservationProjection {
    constructor(...args: ConstructorParameters<typeof ObservationProjection>) {
      super(...args);
      constructed.push(args);
    }
  }
  const fixture = build({ seed: 5, nodes: 2_400, depth: 5, ticks: 150 });
  const receipt = run({
    Projection: SpyProjection,
    inspector,
    fixture,
    host: HOST,
    sampling: { blocks: 4, keypressesPerBlock: 50, resizeSamples: 20 },
  });
  cachedSmallRun = { receipt, constructed };
  return cachedSmallRun;
};
const finiteDistribution = (value: Distribution): boolean =>
  value.samples > 0 &&
  [value.p50, value.p95, value.max].every(n => typeof n === "number" && Number.isFinite(n) && n >= 0) &&
  (value.p50 ?? 0) <= (value.p95 ?? 0) &&
  (value.p95 ?? 0) <= (value.max ?? 0);

describe("W21 grouped fixture: deterministic plain data (C1)", () => {
  it("is deterministic per seed and differs across seeds", () => {
    const options = { seed: 7, nodes: 400, depth: 5, ticks: 150 };
    const first = JSON.stringify(build(options));
    expect(JSON.stringify(build(options)) === first).toBe(true);
    expect(JSON.stringify(build({ ...options, seed: 8 })) === first).toBe(false);
  });

  it("builds the default W21 fixture identically twice", () => {
    expect(GROUPED_FIXTURE_DEFAULTS).toEqual({ seed: 21, nodes: 10_000, depth: 5, ticks: 2_000 });
    const first = defaultFixture();
    const again = build({ ...GROUPED_FIXTURE_DEFAULTS });
    for (const part of ["snapshots", "relations", "updates", "shape"] as const) {
      expect(JSON.stringify(again[part]) === JSON.stringify(first[part])).toBe(true);
    }
  }, 60_000);

  it("refuses options that are not positive safe integers", () => {
    for (const bad of [{ seed: 1.5 }, { nodes: 0 }, { depth: 0 }, { ticks: -1 }, { nodes: Number.NaN }, { depth: 2.5 }]) {
      expect(() => build(bad)).toThrow();
    }
  });

  it("reports shape fields that match counts recomputed from the returned arrays", () => {
    const { snapshots, relations, updates, shape } = defaultFixture();
    const operations = snapshots.filter(snapshot => snapshot.node.type === "sdk-operation");
    const groups = snapshots.filter(snapshot => snapshot.node.type === "group");
    const count = (kind: string): number => relations.filter(relation => relation.kind === kind).length;
    expect(operations.length + groups.length).toBe(snapshots.length);
    expect({
      nodes: shape.nodes,
      groups: shape.groups,
      snapshots: shape.snapshots,
      groupingEdges: shape.groupingEdges,
      dependencyEdges: shape.dependencyEdges,
      hypothesisEdges: shape.hypothesisEdges,
      ownershipEdges: shape.ownershipEdges,
      causationEdges: shape.causationEdges,
      updates: shape.updates,
    }).toEqual({
      nodes: operations.length,
      groups: groups.length,
      snapshots: snapshots.length,
      groupingEdges: count("grouping"),
      dependencyEdges: count("dependency"),
      hypothesisEdges: count("hypothesis"),
      ownershipEdges: 0,
      causationEdges: 0,
      updates: updates.length,
    });
    expect(shape.contract).toBe("workbench.grouped-fixture/v1");
    expect(shape.seed).toBe(21);
    expect(shape.nodes).toBeGreaterThanOrEqual(10_000);
    expect(shape.updates).toBeGreaterThanOrEqual(100_000);
  }, 60_000);

  it("nests every operation under exactly 5 group levels through grouping relations", () => {
    const { snapshots, relations, shape } = defaultFixture();
    const groupKeys = new Set(snapshots.filter(s => s.node.type === "group").map(s => refKey(s.source)));
    const parent = new Map<string, string>();
    const doubleParented: string[] = [];
    for (const relation of relations) {
      if (relation.kind !== "grouping") continue;
      if (parent.has(refKey(relation.to))) doubleParented.push(refKey(relation.to));
      parent.set(refKey(relation.to), refKey(relation.from));
    }
    expect(doubleParented).toEqual([]);
    const nonGroupParents = [...parent.values()].filter(key => !groupKeys.has(key));
    expect(nonGroupParents).toEqual([]);
    const ancestors = (key: string): number => {
      let depth = 0;
      for (let at = parent.get(key); at !== undefined; at = parent.get(at)) {
        depth++;
        if (depth > 64) throw new Error(`grouping cycle above ${key}`);
      }
      return depth;
    };
    const depths = new Set(snapshots.filter(s => s.node.type === "sdk-operation").map(s => ancestors(refKey(s.source))));
    expect([...depths]).toEqual([5]);
    const groupDepths = new Set([...groupKeys].map(ancestors));
    expect([...groupDepths].sort()).toEqual([0, 1, 2, 3, 4]);
    expect({ depth: shape.depth, minDepth: shape.minDepth }).toEqual({ depth: 5, minDepth: 5 });
  }, 60_000);

  it("adds partial dependency (about every 7th operation, never all) and hypothesis links between operations only", () => {
    const { snapshots, relations } = defaultFixture();
    const operationKeys = new Set(snapshots.filter(s => s.node.type === "sdk-operation").map(s => refKey(s.source)));
    const linked = relations.filter(relation => relation.kind === "dependency" || relation.kind === "hypothesis");
    const offOperations = linked.filter(relation => !operationKeys.has(refKey(relation.from)) || !operationKeys.has(refKey(relation.to)));
    expect(offOperations).toEqual([]);
    const dependencies = relations.filter(relation => relation.kind === "dependency");
    const dependents = new Set(dependencies.map(relation => refKey(relation.to)));
    expect(dependents.size).toBeGreaterThan(0);
    expect(dependents.size).toBeLessThan(operationKeys.size);
    expect(Math.abs(dependencies.length - operationKeys.size / 7)).toBeLessThanOrEqual(operationKeys.size / 70);
    const hypotheses = relations.filter(relation => relation.kind === "hypothesis");
    expect(hypotheses.length).toBeGreaterThan(0);
    expect(hypotheses.length).toBeLessThan(operationKeys.size);
    expect(linked.filter(relation => refKey(relation.from) === refKey(relation.to))).toEqual([]);
  }, 60_000);

  it("states only fixture-producer grouping/dependency/hypothesis relations, never ownership", () => {
    const { relations } = defaultFixture();
    expect(FIXTURE_PROVENANCE).toBe("fixture-producer");
    expect(new Set(relations.map(relation => relation.provenance.source))).toEqual(new Set([FIXTURE_PROVENANCE]));
    expect(new Set(relations.map(relation => relation.kind))).toEqual(new Set(["grouping", "dependency", "hypothesis"]));
    expect(relations.filter(relation => relation.provenance.nativeConfirmationRef !== undefined)).toEqual([]);
  }, 60_000);

  it("changes 1-100 distinct operations per tick across >= 100 ticks, >= 100,000 updates, in tick order", () => {
    const { updates, shape } = defaultFixture();
    const perTick = new Map<string, Set<string>>();
    let previous = Number.NEGATIVE_INFINITY;
    let ordered = true;
    for (const update of updates) {
      const at = Date.parse(update.observedAt);
      if (at < previous) ordered = false;
      previous = at;
      const changed = perTick.get(update.observedAt) ?? new Set<string>();
      changed.add(refKey(update.source));
      perTick.set(update.observedAt, changed);
    }
    const sizes = [...perTick.values()].map(changed => changed.size);
    expect(ordered).toBe(true);
    expect(sizes.reduce((sum, size) => sum + size, 0)).toBe(updates.length);
    expect(perTick.size).toBe(shape.ticks);
    expect(shape.ticks).toBeGreaterThanOrEqual(100);
    expect({ min: Math.min(...sizes), max: Math.max(...sizes) }).toEqual({
      min: shape.minChangesPerTick,
      max: shape.maxChangesPerTick,
    });
    expect({ min: shape.minChangesPerTick, max: shape.maxChangesPerTick }).toEqual({ min: 1, max: 100 });
    expect(updates.length).toBeGreaterThanOrEqual(100_000);
    const events = updates.filter(update => update.kind !== "native.status" || update.node?.presentation.type !== "sdk-operation");
    expect(events).toEqual([]);
    expect(new Set(updates.map(update => update.projectionEventId)).size).toBe(updates.length);
    const tones = new Set(updates.map(update => update.node?.presentation.statusTone));
    expect([...tones].sort()).toEqual(["active", "failure", "success", "waiting"]);
  }, 60_000);

  it("derives every timestamp from one fixed epoch and keeps per-source sequences contiguous", () => {
    const { snapshots, relations, updates } = defaultFixture();
    expect(FIXTURE_EPOCH_MS).toBe(Date.parse(STAMP));
    const stamps = [
      ...snapshots.flatMap(s => [s.capturedAt, s.observedAt, s.interval?.startedAt, s.interval?.endedAt]),
      ...updates.flatMap(u => [u.observedAt, u.interval?.startedAt, u.interval?.endedAt]),
      ...relations.map(r => r.provenance.observedAt),
    ].filter((stamp): stamp is string => stamp !== undefined);
    // Whole seconds from the one epoch; an operation already running at capture started before it.
    const offGrid = stamps.filter(stamp => !stamp.endsWith("Z") || !Number.isInteger((Date.parse(stamp) - FIXTURE_EPOCH_MS) / 1_000));
    expect(offGrid).toEqual([]);
    expect(snapshots.filter(s => Date.parse(s.capturedAt) !== FIXTURE_EPOCH_MS || s.observedAt !== s.capturedAt)).toEqual([]);
    expect(updates.filter(u => Date.parse(u.observedAt) <= FIXTURE_EPOCH_MS)).toEqual([]);
    const backwards = [...snapshots, ...updates].filter(
      item => item.interval?.endedAt !== undefined && Date.parse(item.interval.endedAt) < Date.parse(item.interval.startedAt),
    );
    expect(backwards).toEqual([]);
    const sequence = new Map<string, number>();
    for (const snapshot of snapshots) sequence.set(refKey(snapshot.source), Number(snapshot.sequence));
    const gaps = updates.filter(update => {
      const key = refKey(update.source);
      const expected = (sequence.get(key) ?? Number.NaN) + 1;
      sequence.set(key, Number(update.sourceSequence));
      return update.sourceSequence !== expected;
    });
    expect(gaps).toEqual([]);
  }, 60_000);

  it("titles every node with a long Unicode path (CJK, combining marks) inside the projection's bounds", () => {
    const { snapshots, updates, shape } = defaultFixture();
    const titles = snapshots.map(snapshot => snapshot.node.title);
    const unfit = titles.filter(
      title => !title.includes("/") || !CJK.test(title) || !/\p{M}/u.test(title) || UNSAFE.test(title) || title.length > 2_000 || bytes(title) > 4_096,
    );
    expect(unfit).toEqual([]);
    const operationBytes = snapshots.filter(s => s.node.type === "sdk-operation").map(s => bytes(s.node.title));
    expect(Math.min(...operationBytes)).toBeGreaterThanOrEqual(120);
    expect({ min: shape.minTitleBytes, max: shape.maxTitleBytes }).toEqual({
      min: Math.min(...titles.map(bytes)),
      max: Math.max(...titles.map(bytes)),
    });
    for (let seed = 1; seed <= 8; seed++) {
      const titled = build({ seed, nodes: 30, depth: 5, ticks: 1 }).snapshots.map(snapshot => snapshot.node.title);
      expect(titled.filter(title => !title.includes("/") || !CJK.test(title) || !/\p{M}/u.test(title))).toEqual([]);
    }
    const titleOf = new Map(snapshots.map(snapshot => [refKey(snapshot.source), snapshot.node.title]));
    expect(updates.filter(update => update.node?.presentation.title !== titleOf.get(refKey(update.source)))).toEqual([]);
  }, 60_000);

  it("carries transcript payload references, never bodies, and only plain projection input fields", () => {
    const { snapshots, updates, shape } = defaultFixture();
    const operations = snapshots.filter(s => s.node.type === "sdk-operation");
    expect(snapshots.filter(s => s.node.type === "group" && s.nativePayloadRef !== undefined)).toEqual([]);
    const refs = [
      ...operations.map(s => s.nativePayloadRef),
      ...updates.flatMap(u => (u.payloadRef === undefined ? [] : [u.payloadRef])),
    ];
    const unfit = refs.filter(
      ref =>
        ref === undefined ||
        !/^transcript-ref:\/\/[\x21-\x7e]+$/.test(ref) ||
        bytes(ref) < 256 ||
        bytes(ref) > 4_096 ||
        !/[?&]bytes=\d{7,}/.test(ref),
    );
    expect(unfit).toEqual([]);
    expect(shape.payloadRefs).toBe(refs.length);
    const refLengths = refs.map(ref => bytes(ref ?? ""));
    expect({ min: shape.minPayloadRefBytes, max: shape.maxPayloadRefBytes }).toEqual({
      min: Math.min(...refLengths),
      max: Math.max(...refLengths),
    });
    const snapshotRef = new Map(operations.map(s => [refKey(s.source), s.nativePayloadRef]));
    const eventRefs = updates.filter(u => u.payloadRef !== undefined);
    expect(eventRefs.length).toBeGreaterThan(0);
    expect(eventRefs.filter(u => u.source.provider !== "claude-agent-sdk" || u.payloadRef !== snapshotRef.get(refKey(u.source)))).toEqual([]);
    const snapshotFields = new Set(["source", "scope", "capturedAt", "observedAt", "sequence", "coverage", "node", "kind", "trace", "nativePayloadRef", "interval"]);
    const updateFields = new Set(["projectionEventId", "source", "scope", "sourceSequence", "observedAt", "kind", "node", "trace", "payloadRef", "interval"]);
    expect(snapshots.flatMap(s => Object.keys(s).filter(key => !snapshotFields.has(key)))).toEqual([]);
    expect(updates.flatMap(u => Object.keys(u).filter(key => !updateFields.has(key)))).toEqual([]);
    expect(updates.flatMap(u => Object.keys(u.node ?? {}).filter(key => key !== "presentation"))).toEqual([]);
  }, 60_000);

  it("mixes forge, furnace and claude-agent-sdk operations with colliding numeric ids under one scope and invocation", () => {
    const { snapshots, relations, updates, shape } = defaultFixture();
    const operations = snapshots.filter(s => s.node.type === "sdk-operation");
    const byProvider: Record<string, number> = {};
    const providersOfId = new Map<string, Set<string>>();
    for (const operation of operations) {
      byProvider[operation.source.provider] = (byProvider[operation.source.provider] ?? 0) + 1;
      const providers = providersOfId.get(operation.source.id) ?? new Set<string>();
      providers.add(operation.source.provider);
      providersOfId.set(operation.source.id, providers);
    }
    expect(Object.keys(byProvider).sort()).toEqual(["claude-agent-sdk", "forge", "furnace"]);
    expect(shape.providers).toEqual(byProvider);
    expect(operations.filter(s => !/^\d+$/.test(s.source.id))).toEqual([]);
    expect(providersOfId.get("0")).toEqual(new Set(["forge", "furnace", "claude-agent-sdk"]));
    const colliding = [...providersOfId.values()].filter(providers => providers.size > 1).length;
    expect(colliding).toBeGreaterThan(0);
    expect(shape.collidingIds).toBe(colliding);
    expect(new Set(snapshots.map(s => refKey(s.source))).size).toBe(snapshots.length);
    const scopes = new Set([...snapshots, ...updates, ...relations].map(item => JSON.stringify(item.scope)));
    expect([...scopes]).toEqual([JSON.stringify(SCOPE)]);
    const invocations = new Set([...snapshots, ...updates].map(item => item.trace?.invocationId));
    expect([...invocations]).toEqual([INVOCATION_ID]);
  }, 60_000);

  it("is pure ESM: imports nothing (no src/ or dist/), reads no clock and draws no randomness", () => {
    const text = readRepo("qa/workbench/grouped-fixture.mjs");
    expect(text).not.toMatch(/^\s*import[\s{]/m);
    expect(text).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(text).not.toMatch(/Date\.now|Math\.random|new Date\(\s*\)/);
    expect(text).not.toMatch(/(?:src|dist)\/workbench|(?:src|dist)\/ui/);
  });
});

describe("W21 shape realisation (C4 exit-2 rules)", () => {
  it("realises the W21 shape by default and names each violated rule", () => {
    const shape = defaultFixture().shape;
    expect(assess(shape)).toEqual({ realised: true, violations: [] });
    const cases: Array<[Partial<FixtureShape>, string]> = [
      [{ nodes: 9_999 }, "operations-below-10000"],
      [{ depth: 4, minDepth: 4 }, "depth-not-5"],
      [{ depth: 6 }, "depth-not-5"],
      [{ minDepth: 4 }, "depth-not-5"],
      [{ groupingEdges: 0 }, "no-grouping-edges"],
      [{ dependencyEdges: 0 }, "no-dependency-edges"],
      [{ dependencyEdges: shape.nodes }, "dependency-edges-not-partial"],
      [{ hypothesisEdges: 0 }, "no-hypothesis-edges"],
      [{ ownershipEdges: 1 }, "ownership-edges-present"],
      [{ updates: 99_999 }, "updates-below-100000"],
      [{ ticks: 99 }, "ticks-below-100"],
      [{ minChangesPerTick: 0 }, "changes-per-tick-outside-1-100"],
      [{ maxChangesPerTick: 101 }, "changes-per-tick-outside-1-100"],
    ];
    for (const [patch, rule] of cases) {
      const result = assess({ ...shape, ...patch });
      expect(result.realised).toBe(false);
      expect(result.violations.map(violation => violation.rule)).toEqual([rule]);
      expect(result.violations[0].detail.length).toBeGreaterThan(0);
    }
  }, 60_000);
});

describe("W21 read-model compatibility (C2)", () => {
  it("applies a 2,000-node subset to a default-limits projection without throwing and keeps typed fixture provenance", () => {
    const fixture = defaultFixture();
    const subset = fixture.snapshots.slice(0, 2_000);
    const keys = new Set(subset.map(snapshot => refKey(snapshot.source)));
    const relations = fixture.relations.filter(relation => keys.has(refKey(relation.from)) && keys.has(refKey(relation.to)));
    const updates = fixture.updates.filter(update => keys.has(refKey(update.source)));
    const projection = new ObservationProjection();
    expect(subset.map(snapshot => projection.refresh(snapshot)).filter(result => result !== "applied")).toEqual([]);
    for (const relation of relations) projection.relate(relation);
    expect(updates.map(update => projection.ingest(update)).filter(result => result !== "applied")).toEqual([]);
    expect(projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 1 }).total).toBe(2_000);
    expect(projection.stats().nodes).toBe(2_000);
    expect(projection.stats().edges).toBe(relations.length);
    const page = projection.window({ scope: SCOPE, invocationId: INVOCATION_ID, offset: 0, limit: 100 });
    const group = page.nodes.find(node => node.presentation.type === "group");
    expect(group).toBeDefined();
    const outgoing = projection.relations({ scope: SCOPE, from: group?.key ?? "" });
    expect(outgoing.length).toBeGreaterThan(0);
    expect(outgoing.filter(relation => relation.kind !== "grouping" && relation.kind !== "dependency")).toEqual([]);
    expect(outgoing.filter(relation => relation.provenance.source !== FIXTURE_PROVENANCE)).toEqual([]);
    expect(fixture.relations.filter(relation => relation.kind === "ownership")).toEqual([]);
  }, 60_000);
});

describe("W21 production caps stay unchanged (measurement-only falsifier)", () => {
  it("keeps a default projection at 2,000 nodes and 4,000 edges, and no src/ literal raises either cap", () => {
    const projection = new ObservationProjection();
    const ref = (id: number): NativeRef => ({ provider: "forge", type: "operation", id: String(id) });
    const node = { title: "cap probe", type: "sdk-operation" as const, statusText: "RUNNING", statusTone: "active" as const };
    for (let i = 0; i < 2_001; i++) projection.refresh({ source: ref(i), scope: SCOPE, capturedAt: STAMP, observedAt: STAMP, node });
    expect(projection.stats().nodes).toBe(2_000);
    for (let i = 0; i < 4_001; i++) {
      projection.relate({ scope: SCOPE, from: ref(2_000), to: ref(i), kind: "grouping", provenance: { source: "cap-probe" } });
    }
    expect(projection.stats().edges).toBe(4_000);
    const root = new URL("../src/", import.meta.url);
    const raised: string[] = [];
    for (const entry of readdirSync(root, { recursive: true })) {
      const file = String(entry);
      if (!file.endsWith(".ts")) continue;
      const text = readFileSync(join(root.pathname, file), "utf8");
      for (const match of text.matchAll(/\bmax(Nodes|Edges)\s*:\s*([\d_]+)/g)) {
        const value = Number(match[2].replaceAll("_", ""));
        if ((match[1] === "Nodes" && value > 2_000) || (match[1] === "Edges" && value > 4_000)) raised.push(`${file}: ${match[0]}`);
      }
    }
    expect(raised).toEqual([]);
  });

  it("defines the bench-only limits once, outside src/, exactly as the acceptance criteria state", () => {
    expect(BENCH_ONLY_LIMITS).toEqual({ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 });
    expect(Object.isFrozen(BENCH_ONLY_LIMITS)).toBe(true);
    const fixtureText = readRepo("qa/workbench/grouped-fixture.mjs");
    expect([...fixtureText.matchAll(/\bmaxNodes\b/g)]).toHaveLength(1);
  });
});

describe("W21 two-pass bench receipt over the src classes (C3/C4)", () => {
  it("constructs pass A with no argument (default caps) and pass B with exactly the bench-only limits", () => {
    const { constructed } = smallRun();
    expect(constructed).toEqual([[], [{ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 }]]);
  }, 60_000);

  it("emits every receipt field with host/toolchain, fixture shape and judged target", () => {
    const { receipt } = smallRun();
    expect(receipt.contract).toBe(RECEIPT_CONTRACT);
    expect(RECEIPT_CONTRACT).toBe("workbench.inspector-grouped-bench/v1");
    expect(receipt.benchmark).toBe("inspector-grouped-10k");
    expect(receipt.measured).toBe(true);
    expect(receipt.aggregation.length).toBeGreaterThan(0);
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
    }).toEqual(HOST);
    expect(receipt.fixture.contract).toBe("workbench.grouped-fixture/v1");
    expect(receipt.fixture.nodes).toBe(2_400);
    expect(receipt.sampling).toEqual({
      blocks: 4,
      keypressesPerBlock: 50,
      keypresses: 200,
      resizeSamples: 20,
      warmupKeypresses: 0,
      sizes: ["80x24", "120x40", "80x24-ascii", "120x40-ascii"],
    });
    expect(Object.keys(receipt.passes).sort()).toEqual(["bench-only-limits", "default-limits"]);
    expect(receipt.target.ms).toBe(NAVIGATION_TARGET_MS);
    expect(NAVIGATION_TARGET_MS).toBe(20);
    expect(receipt.target.statistic).toBe("p95");
    expect(receipt.target.pass).toBe("bench-only-limits");
    expect(receipt.target.judged).toEqual(
      expect.arrayContaining([
        "navigation",
        "resize",
        "view:overview",
        "view:graph",
        "view:timeline",
        "view:details",
        "size:80x24",
        "size:120x40",
        "size:80x24-ascii",
        "size:120x40-ascii",
      ]),
    );
    expect(JSON.parse(JSON.stringify(receipt))).toEqual(receipt);
  }, 60_000);

  it("reports pass A as honest FIFO truncation: retained versus offered under default caps, no navigation claim", () => {
    const { receipt } = smallRun();
    const pass = receipt.passes["default-limits"];
    expect(pass.label).toBe("default-limits");
    expect(pass.limits).toBe("default");
    expect(pass.constructorArgs).toBe(0);
    expect(pass.offered.nodes).toBe(receipt.fixture.snapshots);
    expect(pass.offered.nodes).toBeGreaterThan(2_000);
    expect(pass.offered.edges).toBe(receipt.fixture.groupingEdges + receipt.fixture.dependencyEdges + receipt.fixture.hypothesisEdges);
    expect(pass.offered.updates).toBe(receipt.fixture.updates);
    expect(pass.retained.nodes).toBe(2_000);
    expect(pass.retained.edges).toBeLessThanOrEqual(4_000);
    expect(pass.truncation).toEqual({
      truncated: true,
      nodesNotRetained: pass.offered.nodes - 2_000,
      edgesNotRetained: pass.offered.edges - pass.retained.edges,
      eviction: "fifo (observation.ts store and relate)",
    });
    expect(pass.census.rows).toBe(pass.retained.nodes);
    expect(pass.census.groups + pass.census.operations).toBe(pass.census.rows);
    expect(pass.census.current + pass.census.stale + pass.census.unknown).toBe(pass.census.rows);
    expect(pass.census.danglingEdges).toBe(pass.retained.edges - pass.census.edgesBetweenRetainedRows);
    expect(pass.navigation).toBeNull();
    expect(pass.heapLabel).toBe("transient-inclusive");
    expect(Number.isFinite(pass.heapGrowthBytes)).toBe(true);
    for (const value of [pass.apply.refreshMs, pass.apply.relateMs, pass.apply.ingestMs, pass.apply.eventsPerSecond]) {
      expect(Number.isFinite(value) && value >= 0).toBe(true);
    }
    expect(pass.apply.refreshApplied + pass.apply.refreshOutOfOrder).toBe(pass.offered.nodes);
    expect(pass.apply.ingestApplied + pass.apply.ingestDuplicate + pass.apply.ingestOutOfOrder).toBe(pass.offered.updates);
    expect(finiteDistribution(pass.apply.ingestPerTick)).toBe(true);
    expect(pass.apply.ingestPerTick.samples).toBe(receipt.fixture.ticks);
    expect(Math.abs((pass.apply.eventsPerSecond * pass.apply.ingestMs) / 1_000 - pass.offered.updates)).toBeLessThanOrEqual(pass.offered.updates * 0.01);
    // A row the FIFO evicted and an update alone re-admitted has no snapshot behind it: unknown, never current.
    expect(pass.census.unknown).toBeGreaterThan(0);
    expect(pass.census.stale).toBe(0);
  }, 60_000);

  it("reports pass B with every offered row retained and navigation/layout/resize distributions per view, size and key", () => {
    const { receipt } = smallRun();
    const pass = receipt.passes["bench-only-limits"];
    expect(pass.label).toBe("bench-only-limits");
    expect(pass.limits).toEqual({ maxNodes: 12_000, maxEdges: 24_000, maxEvents: 128, maxQuery: 40 });
    expect(pass.limitsLabel).toMatch(/bench-only/);
    expect(pass.constructorArgs).toBe(1);
    expect(pass.retained.nodes).toBe(pass.offered.nodes);
    expect(pass.retained.edges).toBe(pass.offered.edges);
    expect(pass.retained.events).toBeLessThanOrEqual(128);
    expect(pass.truncation.truncated).toBe(false);
    expect(pass.census).toMatchObject({
      rows: pass.offered.nodes,
      groups: pass.offered.groups,
      operations: pass.offered.operations,
      current: pass.offered.nodes,
      edgesBetweenRetainedRows: pass.offered.edges,
      danglingEdges: 0,
      complete: true,
    });
    expect(pass.census.edgesByKind).toEqual({
      grouping: pass.offered.groupingEdges,
      dependency: pass.offered.dependencyEdges,
      hypothesis: pass.offered.hypothesisEdges,
    });
    const navigation = pass.navigation;
    expect(navigation).not.toBeNull();
    if (!navigation) return;
    expect(navigation.keypresses).toBe(200);
    expect(navigation.all.samples).toBe(200);
    for (const series of [navigation.all, navigation.reducer, navigation.layout, navigation.resize, navigation.changedBytes]) {
      expect(finiteDistribution(series)).toBe(true);
    }
    expect(navigation.resize.samples).toBe(20 + 4);
    expect(Object.keys(navigation.byView).sort()).toEqual(["details", "graph", "overview", "timeline"]);
    expect(Object.keys(navigation.bySize).sort()).toEqual(["120x40", "120x40-ascii", "80x24", "80x24-ascii"]);
    expect(Object.keys(navigation.byKey).sort()).toEqual(["enter", "f", "j", "k", "tab"]);
    for (const series of [...Object.values(navigation.byView), ...Object.values(navigation.bySize), ...Object.values(navigation.byKey)]) {
      expect(finiteDistribution(series)).toBe(true);
    }
    expect(navigation.maxRenderedRows).toBeGreaterThan(0);
    expect(navigation.maxRenderedRows).toBeLessThanOrEqual(40);
    expect(navigation.maxTerminalBytes).toBeGreaterThan(0);
    expect(navigation.maxChangedBytes).toBeGreaterThan(0);
    expect(navigation.maxChangedBytes).toBeLessThanOrEqual(navigation.maxTerminalBytes + 40);
    expect(navigation.frames).toBe(200 + 24);
    expect(navigation.enterOnGroupRows).toBeGreaterThan(0);
    expect(navigation.enterOnGroupRows).toBe(navigation.byKey.enter.samples);
    expect(Math.abs((pass.apply.eventsPerSecond * pass.apply.ingestMs) / 1_000 - pass.offered.updates)).toBeLessThanOrEqual(pass.offered.updates * 0.01);
    expect(pass.heapLabel).toBe("transient-inclusive");
  }, 60_000);
});

describe("W21 honest exit semantics (C4)", () => {
  it("exits 2 for an unrealised measurement and names why, before any timing judgement", () => {
    const { receipt } = smallRun();
    expect(receipt.realised).toBe(false);
    expect(receipt.verdict).toBe("not-w21-shape");
    expect(receipt.exitCode).toBe(2);
    expect(exitCode(receipt)).toBe(2);
    expect(receipt.violations.map(violation => violation.rule)).toEqual(
      expect.arrayContaining(["operations-below-10000", "updates-below-100000", "keypresses-below-1000"]),
    );
  }, 60_000);

  it("exits 1 only for a bench-only p95 over 20 ms on a realised shape; 20 ms itself is within target", () => {
    const realised: Receipt = structuredClone(smallRun().receipt);
    realised.fixture = defaultFixture().shape;
    const navigation = realised.passes["bench-only-limits"].navigation;
    expect(navigation).not.toBeNull();
    if (!navigation) return;
    navigation.keypresses = 1_600;
    const series = [navigation.all, navigation.resize, ...Object.values(navigation.byView), ...Object.values(navigation.bySize)];
    for (const value of series) value.p95 = 1;
    expect(exitCode(realised)).toBe(0);
    navigation.byView.graph.p95 = NAVIGATION_TARGET_MS;
    expect(exitCode(realised)).toBe(0);
    navigation.byView.graph.p95 = NAVIGATION_TARGET_MS + 0.5;
    expect(exitCode(realised)).toBe(1);
    navigation.byView.graph.p95 = 1;
    navigation.resize.p95 = 25;
    expect(exitCode(realised)).toBe(1);
    navigation.resize.p95 = 1;
    navigation.all.p95 = 21;
    expect(exitCode(realised)).toBe(1);
    realised.fixture = { ...realised.fixture, depth: 4, minDepth: 4 };
    expect(exitCode(realised)).toBe(2);
  }, 60_000);

  it("exits 2 when the bench-only pass truncated the fixture, because that measurement is not the 10k claim", () => {
    const truncated: Receipt = structuredClone(smallRun().receipt);
    truncated.fixture = defaultFixture().shape;
    const pass = truncated.passes["bench-only-limits"];
    if (pass.navigation) pass.navigation.keypresses = 1_600;
    expect(exitCode(truncated)).not.toBe(2);
    pass.retained = { ...pass.retained, nodes: pass.offered.nodes - 1 };
    expect(exitCode(truncated)).toBe(2);
  }, 60_000);

  it("exits 2 when a judged series was never sampled, rather than passing it by absence", () => {
    const unsampled: Receipt = structuredClone(smallRun().receipt);
    unsampled.fixture = defaultFixture().shape;
    const navigation = unsampled.passes["bench-only-limits"].navigation;
    expect(navigation).not.toBeNull();
    if (!navigation) return;
    navigation.keypresses = 1_600;
    for (const value of [navigation.all, navigation.resize, ...Object.values(navigation.byView), ...Object.values(navigation.bySize)]) value.p95 = 1;
    expect(exitCode(unsampled)).toBe(0);
    navigation.byView.timeline = { samples: 0, p50: null, p95: null, max: null };
    expect(exitCode(unsampled)).toBe(2);
  }, 60_000);

  it("keeps the CLI thin: dist imports only, no limits literal, receipt written and printed before the exit code", () => {
    const text = readRepo("qa/workbench/inspector-grouped-bench.mjs");
    const specifiers = [...text.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)].map(match => match[1]).sort();
    expect(specifiers).toEqual(
      ["../../dist/ui/workflow-inspector.js", "../../dist/workbench/observation.js", "./grouped-fixture.mjs", "node:fs", "node:os"].sort(),
    );
    expect(text).not.toMatch(/\bimport\s*\(|\brequire\s*\(/);
    expect(text).not.toMatch(/maxNodes|maxEdges|new ObservationProjection/);
    expect(text).toMatch(/W21_BENCH_RECEIPT/);
    const written = text.indexOf("writeFileSync(process.env.W21_BENCH_RECEIPT");
    const printed = text.indexOf("console.log(JSON.stringify(receipt))");
    const exit = text.indexOf("process.exitCode = exitCodeFor(receipt)");
    expect(written).toBeGreaterThan(-1);
    expect(printed).toBeGreaterThan(written);
    expect(exit).toBeGreaterThan(printed);
  });
});

describe("W21 Forge registration (C5)", () => {
  it("registers inspector-grouped-bench as a Forge command outside the default gate", () => {
    const toml = readRepo("forge.toml");
    expect(toml).toMatch(
      /\[build\.commands\.inspector-grouped-bench\]\ncommand = "node qa\/workbench\/inspector-grouped-bench\.mjs"\ntimeout = 300\n/,
    );
    const gate = /^gate = \[([^\]]*)\]/m.exec(toml)?.[1] ?? "";
    expect(gate.length).toBeGreaterThan(0);
    expect(gate).not.toMatch(/grouped/);
  });
});
