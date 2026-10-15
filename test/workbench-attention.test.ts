/**
 * W14/VC-5-C attention and bottleneck selector (wb-6ze.4). Every case pins a docs/workbench clause; B7 is the
 * brute-force falsifier: a seeded fixture (fixed seed, no host clock or host randomness in the measured path, the
 * rules of the test/helpers/perf-fixtures.ts header) checked against an independent computation written here.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { ATTENTION_CONTRACT, type AttentionReport, selectAttention } from "../src/workbench/attention.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type Interval, type NativeRef, ObservationProjection, type ObservationQuery, type ObservationScope, type ObservedNode,
  type Presentation, type Relation, type RelationKind,
} from "../src/workbench/observation.js";

type Tone = Presentation["statusTone"];
type Freshness = ObservedNode["freshness"];
type Reason = "no-dependency-edges" | "missing-intervals" | "open-intervals" | "hypothesis-edges" | "cycle" | "truncated";

const alice: ObservationScope = { workspace: "ws-attention", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-attention", principal: "bob" };
const tenant2: ObservationScope = { workspace: "ws-other", principal: "alice" };
const INVOCATION = "inv-attention";
/** The caller's clock for every case. */
const T = "2026-10-15T12:00:00.000Z";
const T_MS = Date.parse(T);
const CHAIN_CAVEAT = "Observed dependency edges and complete source intervals only; missing edges do not imply independence.";
const CLOCK_CAVEAT = "openMs uses the caller clock against producer startedAt; cross-provider clocks are not reconciled.";
const REASONS: readonly Reason[] = ["no-dependency-edges", "missing-intervals", "open-intervals", "hypothesis-edges", "cycle", "truncated"];
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/;

/** An instant `seconds` after (negative: before) the caller clock. */
const at = (seconds: number): string => new Date(T_MS + seconds * 1000).toISOString();
const openSince = (secondsAgo: number): Interval => ({ startedAt: at(-secondsAgo) });
const span = (start: number, seconds: number): Interval => ({ startedAt: at(start), endedAt: at(start + seconds) });
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });

interface Seed { id: string; tone: Tone; provider?: string; interval?: Interval; title?: string; scope?: ObservationScope; invocationId?: string }
/** A read-current snapshot: freshness current, connection state unknown until a provider disconnects. */
function observe(view: ObservationProjection, seed: Seed): void {
  view.refresh({
    source: ref(seed.provider ?? "furnace", seed.id), scope: seed.scope ?? alice, capturedAt: T, observedAt: T,
    node: { title: seed.title ?? `Operation ${seed.id}`, type: "sdk-operation", statusText: seed.tone.toUpperCase(), statusTone: seed.tone },
    trace: { invocationId: seed.invocationId ?? INVOCATION }, ...(seed.interval ? { interval: seed.interval } : {}),
  });
}
function relate(view: ObservationProjection, from: string, to: string, kind: RelationKind = "dependency", scope = alice, provider = "furnace"): void {
  view.relate({ scope, from: ref(provider, from), to: ref(provider, to), kind, provenance: { source: "declared workflow", observedAt: T } });
}
function keyOf(view: ObservationProjection, id: string, provider = "furnace", scope = alice): string {
  const node = view.query({ scope, ref: ref(provider, id), limit: 1 }).nodes[0];
  if (!node) throw new Error(`fixture node ${id} is absent`);
  return node.key;
}
const report = (view: Pick<ObservationProjection, "query" | "relations">, extra: Partial<Parameters<typeof selectAttention>[1]> = {}): AttentionReport =>
  selectAttention(view, { scope: alice, invocationId: INVOCATION, now: T, ...extra });
/** A complete A->B->C chain of 10 s, 20 s and 30 s plus an unrelated complete node D. */
function chainFixture(): ObservationProjection {
  const view = new ObservationProjection();
  observe(view, { id: "A", tone: "success", interval: span(-100, 10) });
  observe(view, { id: "B", tone: "success", interval: span(-90, 20) });
  observe(view, { id: "C", tone: "success", interval: span(-70, 30) });
  observe(view, { id: "D", tone: "success", interval: span(-500, 400) });
  relate(view, "A", "B");
  relate(view, "B", "C");
  return view;
}
/** A structural stand-in for producer-supplied rows the real projection would refuse to store. */
function stand(nodes: ObservedNode[], edges: Relation[] = []): Pick<ObservationProjection, "query" | "relations"> {
  return {
    query: (filter: ObservationQuery) => ({ nodes: nodes.slice(0, filter.limit), examined: nodes.length, truncated: nodes.length > filter.limit }),
    relations: input => edges.filter(edge => edge.from === input.from).slice(0, input.limit ?? 100),
  };
}
function row(id: string, title: string, extra: Partial<ObservedNode> = {}): ObservedNode {
  return {
    key: JSON.stringify([alice.workspace, alice.principal, "furnace", "operation", "", id]), nativeRef: ref("furnace", id), scope: alice,
    sourceKind: "observed", observedAt: T, sourceConnectionState: "connected", freshness: "current", completeness: "complete",
    presentation: { title, type: "sdk-operation", statusText: "RUNNING", statusTone: "active" }, kind: "native.snapshot",
    invocationId: INVOCATION, evidenceRefs: [], interval: openSince(60), ...extra,
  };
}

describe("B1 docs/workbench/10 § Four views (Overview): status and counts, attention panel and top measured bottlenecks", () => {
  it("counts every tone and lists the five largest measured open intervals; an interval-less active node is unmeasured", () => {
    const view = new ObservationProjection();
    const seeds: Seed[] = [
      { id: "a1", tone: "active", interval: openSince(100) }, { id: "a2", tone: "active", interval: openSince(400) },
      { id: "a3", tone: "active", interval: openSince(250) }, { id: "a4", tone: "active", interval: openSince(50) },
      { id: "w1", tone: "waiting", interval: openSince(300) }, { id: "w2", tone: "waiting", interval: openSince(500) },
      { id: "a5", tone: "active" },
      { id: "s1", tone: "success", interval: span(-900, 10) }, { id: "s2", tone: "success", interval: span(-800, 20) },
      { id: "s3", tone: "success", interval: span(-700, 30) }, { id: "f1", tone: "failure", interval: span(-600, 40) },
      { id: "u1", tone: "unknown", interval: span(-650, 5) },
    ];
    for (const seed of seeds) observe(view, seed);
    const result = report(view);
    expect(ATTENTION_CONTRACT).toBe("workbench.attention/v1");
    expect(result).toMatchObject({ contract: "workbench.attention/v1", basis: "observed", now: T, examined: { nodes: 12, truncated: false } });
    expect(result.bottlenecks.map(entry => [entry.nativeRef.id, entry.openMs, entry.measured])).toEqual([
      ["w2", 500_000, true], ["a2", 400_000, true], ["w1", 300_000, true], ["a3", 250_000, true], ["a1", 100_000, true],
    ]);
    for (const entry of result.bottlenecks) {
      const seed = seeds.find(item => item.id === entry.nativeRef.id);
      expect(entry.openMs).toBe(T_MS - Date.parse(seed?.interval?.startedAt ?? "invalid"));
      expect(entry).toMatchObject({ key: keyOf(view, entry.nativeRef.id), tone: seed?.tone, freshness: "current", title: `Operation ${entry.nativeRef.id}` });
    }
    expect(result.bottlenecks.map(entry => entry.key)).not.toContain(keyOf(view, "a5"));
    expect(result.unmeasured).toBe(1);
    expect(result.counts).toEqual({ active: 5, waiting: 2, success: 3, failure: 1, unknown: 1, stale: 0, disconnected: 0, withInterval: 11, withoutInterval: 1 });
    expect(result.clockSkew).toBe(0);
  });

  it("breaks equal open time by key ascending and honors the requested bottleneck count", () => {
    const view = new ObservationProjection();
    for (const id of ["z", "m", "b"]) observe(view, { id, tone: "active", interval: openSince(120) });
    observe(view, { id: "done-open", tone: "success", interval: openSince(900) });
    observe(view, { id: "active-ended", tone: "active", interval: span(-900, 10) });
    const keys = ["b", "m", "z"].map(id => keyOf(view, id)).sort();
    expect(report(view).bottlenecks.map(entry => entry.key)).toEqual(keys);
    // A settled tone never ranks, even on an open interval; an active node whose interval ended is not measurably open.
    expect(report(view).unmeasured).toBe(1);
    expect(report(view, { bottlenecks: 2 }).bottlenecks.map(entry => entry.key)).toEqual(keys.slice(0, 2));
    expect(report(view, { bottlenecks: 0 }).bottlenecks).toEqual([]);
  });
});

describe("B2 docs/workbench/09 § Aggregates and profiling: missing dependencies or interval bounds suppress precise critical path claims", () => {
  const cases: [string, () => ObservationProjection, Partial<Parameters<typeof selectAttention>[1]>, Reason[]][] = [
    ["(a) no dependency edges", () => {
      const view = new ObservationProjection();
      for (const [id, start] of [["A", -100], ["B", -90], ["C", -70]] as const) observe(view, { id, tone: "success", interval: span(start, 10) });
      relate(view, "A", "B", "causation");
      relate(view, "A", "C", "grouping");
      return view;
    }, {}, ["no-dependency-edges"]],
    ["(b) a chain node lacks endedAt", () => {
      const view = chainFixture();
      observe(view, { id: "C", tone: "active", interval: openSince(70) });
      return view;
    }, {}, ["open-intervals"]],
    ["(c) a chain node has no interval", () => {
      const view = new ObservationProjection();
      observe(view, { id: "A", tone: "success", interval: span(-100, 10) });
      observe(view, { id: "B", tone: "success" });
      observe(view, { id: "C", tone: "success", interval: span(-70, 30) });
      relate(view, "A", "B");
      relate(view, "B", "C");
      return view;
    }, {}, ["missing-intervals"]],
    ["(d) a hypothesis edge among examined nodes", () => {
      const view = chainFixture();
      relate(view, "A", "C", "hypothesis");
      return view;
    }, {}, ["hypothesis-edges"]],
  ];
  it.each(cases)("%s yields incomplete-trace with that reason and no duration", (_name, build, extra, reasons) => {
    const result = report(build(), extra);
    expect(result.criticalPath).toEqual({ label: "incomplete-trace", reasons });
    expect(JSON.stringify(result.criticalPath)).not.toContain("measuredMs");
    expect(JSON.stringify(result.criticalPath)).not.toMatch(/\d/);
  });

  it("(e) a truncated query yields incomplete-trace with reason truncated and no duration", () => {
    const result = report(chainFixture(), { limit: 2 });
    expect(result.examined).toEqual({ nodes: 2, truncated: true });
    expect(result.criticalPath.label).toBe("incomplete-trace");
    expect(result.criticalPath).toMatchObject({ reasons: expect.arrayContaining(["truncated"]) });
    expect(JSON.stringify(result.criticalPath)).not.toContain("measuredMs");
    expect(JSON.stringify(result.criticalPath)).not.toMatch(/\d/);
  });

  it("carries every applicable reason at once, in a fixed order", () => {
    const view = new ObservationProjection();
    observe(view, { id: "A", tone: "success", interval: span(-100, 10) });
    observe(view, { id: "B", tone: "active", interval: openSince(90) });
    observe(view, { id: "C", tone: "success" });
    observe(view, { id: "D", tone: "success", interval: span(-50, 5) });
    relate(view, "A", "B");
    relate(view, "B", "C");
    relate(view, "C", "B");
    relate(view, "A", "D", "hypothesis");
    expect(report(view, { limit: 4 }).criticalPath).toEqual({ label: "incomplete-trace", reasons: ["missing-intervals", "open-intervals", "hypothesis-edges", "cycle"] });
    observe(view, { id: "E", tone: "success", interval: span(-40, 5) });
    expect(report(view, { limit: 4 }).criticalPath).toEqual({ label: "incomplete-trace", reasons: ["missing-intervals", "open-intervals", "hypothesis-edges", "cycle", "truncated"] });
  });

  it("an open or missing interval anywhere in the observed dependency graph withholds the estimate; an unrelated open node does not", () => {
    const blocked = chainFixture();
    observe(blocked, { id: "X", tone: "success", interval: span(-30, 5) });
    observe(blocked, { id: "Y", tone: "active", interval: openSince(20) });
    relate(blocked, "X", "Y");
    expect(report(blocked).criticalPath).toEqual({ label: "incomplete-trace", reasons: ["open-intervals"] });
    const unrelated = chainFixture();
    observe(unrelated, { id: "Z", tone: "active", interval: openSince(9_000) });
    observe(unrelated, { id: "Q", tone: "waiting" });
    expect(report(unrelated).criticalPath).toMatchObject({ label: "partial-estimated", measuredMs: 60_000 });
  });

  it("never builds a chain from other relation kinds or from edges that leave the examined page", () => {
    const view = new ObservationProjection();
    observe(view, { id: "A", tone: "success", interval: span(-100, 10) });
    observe(view, { id: "B", tone: "success", interval: span(-90, 20) });
    for (const id of ["P", "Q", "R"]) observe(view, { id, tone: "success", interval: span(-60, 5) });
    observe(view, { id: "elsewhere", tone: "success", interval: span(-80, 30), invocationId: "inv-other" });
    for (const kind of ["causation", "grouping"] as const) relate(view, "A", "B", kind);
    view.relate({ scope: alice, from: ref("furnace", "A"), to: ref("furnace", "B"), kind: "ownership", provenance: { source: "furnace", nativeConfirmationRef: "native:run-A" } });
    relate(view, "A", "elsewhere");
    relate(view, "B", "never-observed");
    expect(report(view).criticalPath).toEqual({ label: "incomplete-trace", reasons: ["no-dependency-edges"] });
  });

  it("never misses an edge hidden behind a relation page the projection capped below the edges it holds", () => {
    // maxQuery 3 caps every relation page at 3 rows; A's hypothesis edge to C is its fourth outgoing row.
    const view = new ObservationProjection({ maxQuery: 3 });
    observe(view, { id: "A", tone: "success", interval: span(-100, 10) });
    observe(view, { id: "B", tone: "success", interval: span(-90, 20) });
    observe(view, { id: "C", tone: "success", interval: span(-70, 30) });
    relate(view, "A", "B");
    relate(view, "B", "C");
    relate(view, "A", "outside-1", "grouping");
    relate(view, "A", "outside-2", "grouping");
    relate(view, "A", "C", "hypothesis");
    expect(view.relations({ scope: alice, from: keyOf(view, "A"), limit: 100 }).map(edge => edge.kind)).not.toContain("hypothesis");
    expect(report(view)).toMatchObject({ examined: { nodes: 3, truncated: false }, criticalPath: { label: "incomplete-trace", reasons: ["hypothesis-edges"] } });
    // When even one pair's page may be capped, the hidden remainder is reported as truncation, never as a chain.
    const capped = new ObservationProjection({ maxQuery: 2 });
    observe(capped, { id: "A", tone: "success", interval: span(-100, 10) });
    observe(capped, { id: "B", tone: "success", interval: span(-90, 20) });
    for (const kind of ["dependency", "grouping", "hypothesis"] as const) relate(capped, "A", "B", kind);
    expect(report(capped).criticalPath).toEqual({ label: "incomplete-trace", reasons: ["truncated"] });
  });
});

describe("B3 docs/workbench/09 § Relationships are typed and provenanced: missing edges do not imply independence", () => {
  it("states a complete-interval dependency chain only as partial-estimated, and a cycle as incomplete-trace", () => {
    const view = chainFixture();
    const reports: AttentionReport[] = [report(view)];
    expect(reports[0].criticalPath).toEqual({
      label: "partial-estimated", keys: ["A", "B", "C"].map(id => keyOf(view, id)), measuredMs: 60_000,
      coverage: { chainNodes: 3, dependencyEdges: 2 }, caveat: CHAIN_CAVEAT,
    });
    relate(view, "C", "A");
    reports.push(report(view));
    expect(reports[1].criticalPath).toEqual({ label: "incomplete-trace", reasons: ["cycle"] });
    for (const item of reports) {
      expect(JSON.stringify(item)).not.toContain("exact");
      expect(["partial-estimated", "incomplete-trace"]).toContain(item.criticalPath.label);
    }
  });

  it("chooses the longest-duration chain through a diamond, breaks ties by key order and counts a repeated declaration once", () => {
    const view = new ObservationProjection();
    observe(view, { id: "A", tone: "success", interval: span(-300, 10) });
    observe(view, { id: "B", tone: "success", interval: span(-290, 50) });
    observe(view, { id: "C", tone: "success", interval: span(-290, 20) });
    observe(view, { id: "D", tone: "success", interval: span(-200, 5) });
    for (const [from, to] of [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]] as const) relate(view, from, to);
    view.relate({ scope: alice, from: ref("furnace", "A"), to: ref("furnace", "B"), kind: "dependency", provenance: { source: "second declaration" } });
    expect(report(view).criticalPath).toEqual({
      label: "partial-estimated", keys: ["A", "B", "D"].map(id => keyOf(view, id)), measuredMs: 65_000,
      coverage: { chainNodes: 3, dependencyEdges: 4 }, caveat: CHAIN_CAVEAT,
    });
    observe(view, { id: "B", tone: "success", interval: span(-290, 20) });
    const tied = [keyOf(view, "B"), keyOf(view, "C")].sort()[0];
    expect(report(view).criticalPath).toMatchObject({ label: "partial-estimated", keys: [keyOf(view, "A"), tied, keyOf(view, "D")], measuredMs: 35_000 });
  });

  it("starts the chain where no observed dependency enters, even at a zero-duration source", () => {
    const view = new ObservationProjection();
    observe(view, { id: "Z", tone: "success", interval: span(-100, 0) });
    observe(view, { id: "B", tone: "success", interval: span(-90, 10) });
    relate(view, "Z", "B");
    expect(report(view).criticalPath).toEqual({
      label: "partial-estimated", keys: [keyOf(view, "Z"), keyOf(view, "B")], measuredMs: 10_000,
      coverage: { chainNodes: 2, dependencyEdges: 1 }, caveat: CHAIN_CAVEAT,
    });
  });
});

describe("B4 docs/workbench/10 § Failure and deception defenses and 09 § Freshness and ambiguity: STALE/UNKNOWN shown, never confused", () => {
  it("a disconnect raises stale and disconnected by the provider's node count and leaves waiting and unknown alone", () => {
    const view = new ObservationProjection();
    observe(view, { id: "f1", tone: "active", interval: openSince(600) });
    observe(view, { id: "f2", tone: "waiting", interval: openSince(120) });
    observe(view, { id: "f3", tone: "success", interval: span(-900, 30) });
    observe(view, { id: "g1", tone: "active", provider: "forge", interval: openSince(60) });
    observe(view, { id: "g2", tone: "unknown", provider: "forge" });
    const before = report(view);
    expect(before.counts).toMatchObject({ active: 2, waiting: 1, unknown: 1, stale: 0, disconnected: 0 });
    expect(before.disconnectedProviders).toEqual([]);
    view.disconnect("furnace");
    const after = report(view);
    expect(after.counts.stale - before.counts.stale).toBe(3);
    expect(after.counts.disconnected - before.counts.disconnected).toBe(3);
    expect(after.disconnectedProviders).toEqual(["furnace"]);
    expect(after.counts).toMatchObject({ active: 2, waiting: before.counts.waiting, unknown: 1 });
    expect(after.bottlenecks[0]).toMatchObject({ key: keyOf(view, "f1"), tone: "active", freshness: "stale", openMs: 600_000, measured: true });
    expect(after.bottlenecks.map(entry => [entry.nativeRef.id, entry.tone, entry.freshness])).toEqual([
      ["f1", "active", "stale"], ["f2", "waiting", "stale"], ["g1", "active", "current"],
    ]);
  });

  it("lists every disconnected provider once, sorted", () => {
    const view = new ObservationProjection();
    for (const [id, provider] of [["z1", "zeta"], ["a1", "alpha"], ["m1", "mu"], ["z2", "zeta"]] as const) observe(view, { id, provider, tone: "active", interval: openSince(5) });
    for (const provider of ["zeta", "alpha", "mu"]) view.disconnect(provider);
    expect(report(view)).toMatchObject({ disconnectedProviders: ["alpha", "mu", "zeta"], counts: { disconnected: 4, stale: 4 } });
  });
});

describe("B5 docs/workbench/10 § Timeline: never assume clocks agree; note uncertain clocks", () => {
  it("clamps a producer start after the caller clock to zero and counts it as clock skew", () => {
    const view = new ObservationProjection();
    observe(view, { id: "early", tone: "active", interval: { startedAt: at(30) } });
    observe(view, { id: "steady", tone: "waiting", interval: openSince(45) });
    const result = report(view);
    expect(result.bottlenecks.map(entry => [entry.nativeRef.id, entry.openMs])).toEqual([["steady", 45_000], ["early", 0]]);
    expect(result.clockSkew).toBe(1);
    expect(result.clockCaveat).toBe(CLOCK_CAVEAT);
  });

  it("never measures an interval whose stated end is unreadable, an empty one included", () => {
    // The projection admits endedAt "" (its ingest check is a falsy test), so the selector meets it on real rows.
    const view = new ObservationProjection();
    observe(view, { id: "blank-end", tone: "active", interval: { startedAt: at(-30), endedAt: "" } });
    observe(view, { id: "after", tone: "success", interval: span(-20, 5) });
    relate(view, "blank-end", "after");
    expect(report(view)).toMatchObject({
      bottlenecks: [], unmeasured: 1, counts: { withInterval: 1, withoutInterval: 1 },
      criticalPath: { label: "incomplete-trace", reasons: ["missing-intervals"] },
    });
  });

  it("measures against the caller clock only: no host clock read, and the module source names neither host clock nor randomness", () => {
    const view = new ObservationProjection();
    observe(view, { id: "run", tone: "active", interval: openSince(10) });
    const spy = vi.spyOn(Date, "now");
    try {
      const first = report(view);
      const later = report(view, { now: at(25) });
      expect(spy).not.toHaveBeenCalled();
      expect(later.bottlenecks[0].openMs - first.bottlenecks[0].openMs).toBe(25_000);
      expect(later.now).toBe(at(25));
    } finally {
      spy.mockRestore();
    }
    const source = readFileSync(new URL("../src/workbench/attention.ts", import.meta.url), "utf8");
    expect(source).not.toContain("Date.now");
    expect(source).not.toContain("Math.random");
  });

  it.each(["2026-10-15T12:00:00", "yesterday", "", `${"2".repeat(60)}-10-15T12:00:00Z`, "\u202e2026-10-15T12:00:00Z", "2026-10-15T12:00:00Z\u0085",
    "Thursday\u0085 15 Oct 2026 12:00:00 +00:00", "(\u0085) 15 Oct 2026 12:00:00 +00:00", "2026-13-45T12:00:00Z"])(
    "refuses a caller clock that is not a bounded timezone-qualified instant (%j)", now => {
      expect(() => report(new ObservationProjection(), { now })).toThrow(CapabilityError);
      expect(() => report(new ObservationProjection(), { now })).toThrow(/clock/);
    });
});

describe("B6 docs/workbench/09 § Data retention and privacy and 10 § Rendering pipeline: tenant-bounded, paginated, compact, sanitized", () => {
  it("never reports a node, interval or edge observed under another workspace or principal", () => {
    const view = new ObservationProjection();
    observe(view, { id: "mine-1", tone: "active", interval: openSince(100) });
    observe(view, { id: "mine-2", tone: "success", interval: span(-50, 5) });
    for (const scope of [bob, tenant2]) {
      observe(view, { id: "theirs-1", tone: "active", interval: openSince(9_000), scope });
      observe(view, { id: "theirs-2", tone: "success", interval: span(-80, 20), scope });
      relate(view, "theirs-1", "theirs-2", "dependency", scope);
    }
    const result = report(view);
    expect(result.examined).toEqual({ nodes: 2, truncated: false });
    expect(result.bottlenecks.map(entry => entry.key)).toEqual([keyOf(view, "mine-1")]);
    expect(result.counts).toMatchObject({ active: 1, success: 1, withInterval: 2 });
    expect(result.criticalPath).toEqual({ label: "incomplete-trace", reasons: ["no-dependency-edges"] });
    const text = JSON.stringify(result);
    for (const foreign of ["bob", "ws-other", "theirs"]) expect(text).not.toContain(foreign);
  });

  it("drops a foreign, repeated or surplus row even when a producer stand-in returns one", () => {
    const foreign = { ...row("foreign", "Foreign"), scope: bob };
    const otherRun = { ...row("other-run", "Other run"), invocationId: "inv-other" };
    const mine = row("mine", "Mine");
    const result = report(stand([foreign, otherRun, mine, mine, row("spare", "Spare")]), { limit: 4 });
    expect(result.examined).toEqual({ nodes: 1, truncated: true });
    expect(result.bottlenecks.map(entry => entry.nativeRef.id)).toEqual(["mine"]);
  });

  it("never trusts an interval, tone or freshness the projection would have refused", () => {
    const backwards: Interval = { startedAt: at(-10), endedAt: at(-20) };
    const base = row("odd-tone", "Odd tone");
    const oddTone = { ...base, presentation: { ...base.presentation, statusTone: "bogus" as unknown as Tone } };
    const oddFresh = { ...row("odd-fresh", "Odd freshness"), freshness: "bogus" as unknown as Freshness };
    const nodes = [row("backwards", "Backwards", { interval: backwards }), row("garbled", "Garbled", { interval: { startedAt: "soon" } }), oddTone, oddFresh, row("next", "Next", { interval: span(-5, 1) })];
    const edges: Relation[] = [{ from: nodes[0].key, to: nodes[4].key, kind: "dependency", provenance: { source: "declared workflow" } }];
    const result = report(stand(nodes, edges));
    expect(result.counts).toMatchObject({ active: 4, unknown: 1, withInterval: 3, withoutInterval: 2, stale: 1 });
    expect(result.unmeasured).toBe(3);
    expect(result.bottlenecks.map(entry => [entry.nativeRef.id, entry.freshness, entry.openMs])).toEqual([["odd-fresh", "unknown", 60_000]]);
    expect(result.criticalPath).toEqual({ label: "incomplete-trace", reasons: ["missing-intervals"] });
    expect(JSON.stringify(result)).not.toContain("bogus");
  });

  it("examines one 100-node page of 1,000 and keeps the report compact", () => {
    const view = new ObservationProjection();
    for (let i = 0; i < 1000; i++) observe(view, { id: `op-${i}`, tone: i % 3 === 0 ? "waiting" : "active", interval: openSince(10 + (i * 37) % 997) });
    const result = report(view, { bottlenecks: 5 });
    expect(result.examined).toEqual({ nodes: 100, truncated: true });
    expect(result.bottlenecks).toHaveLength(5);
    expect(result.criticalPath).toMatchObject({ label: "incomplete-trace", reasons: expect.arrayContaining(["truncated"]) });
    expect(JSON.stringify(result).length).toBeLessThan(16_384);
  });

  it("redacts credentials and strips control sequences from titles, cut to 120 characters", () => {
    const hostile = row("hostile", `deploy Bearer abc123 then \x1b[31mred\x1b[0m Bearer\x1b[1mxyz789 ${"tail ".repeat(60)}`);
    const [shown] = report(stand([hostile])).bottlenecks;
    expect(shown.title).toContain("[REDACTED]");
    for (const secret of ["abc123", "xyz789"]) expect(shown.title).not.toContain(secret);
    expect(shown.title).not.toMatch(UNSAFE);
    expect(shown.title.length).toBeLessThanOrEqual(120);
    const view = new ObservationProjection();
    observe(view, { id: "c1", tone: "active", interval: openSince(5), title: `\u009b31m\u202estep password=hunter2 ${"\u{1f600}".repeat(80)}` });
    const [stored] = report(view).bottlenecks;
    expect(stored.title).toContain("password=[REDACTED]");
    expect(stored.title).not.toContain("hunter2");
    expect(stored.title).not.toMatch(UNSAFE);
    expect(stored.title.length).toBeLessThanOrEqual(120);
    expect(stored.title).toMatch(/ \[truncated\]$/);
    expect(stored.title).not.toMatch(/[\ud800-\udbff](?![\udc00-\udfff])/);
  });

  it("withdraws a chain that cannot be listed inside the report bound instead of listing part of it", () => {
    const build = (idLength: number): ObservationProjection => {
      const view = new ObservationProjection();
      const ids = Array.from({ length: 100 }, (_, i) => `${String(i).padStart(3, "0")}${"x".repeat(idLength)}`);
      for (const [i, id] of ids.entries()) observe(view, { id, tone: "success", interval: span(-1000 + i * 5, 2) });
      for (let i = 1; i < ids.length; i++) relate(view, ids[i - 1], ids[i]);
      return view;
    };
    const short = report(build(4));
    expect(short.criticalPath).toMatchObject({ label: "partial-estimated", measuredMs: 200_000, coverage: { chainNodes: 100, dependencyEdges: 99 } });
    expect(JSON.stringify(short).length).toBeLessThan(16_384);
    const long = report(build(200));
    expect(long.criticalPath).toEqual({ label: "incomplete-trace", reasons: ["truncated"] });
    expect(JSON.stringify(long).length).toBeLessThan(16_384);
  });

  it("stays inside the report bound for oversized producer identities", () => {
    const wide = (i: number): ObservedNode => {
      const id = `${i}-${"w".repeat(4000)}`;
      return { ...row(id, `Wide ${i}`), key: JSON.stringify([alice.workspace, alice.principal, "furnace", "operation", "", id]), interval: openSince(100 + i) };
    };
    const result = report(stand(Array.from({ length: 8 }, (_, i) => wide(i))), { bottlenecks: 8 });
    expect(JSON.stringify(result).length).toBeLessThan(16_384);
    expect(result.bottlenecks.length).toBeGreaterThan(0);
    expect(result.bottlenecks.map(entry => entry.openMs)).toEqual([...result.bottlenecks.map(entry => entry.openMs)].sort((a, b) => b - a));
    expect(result.bottlenecks[0].openMs).toBe(107_000);
    const providers = Array.from({ length: 20 }, (_, i) => `${String(i).padStart(2, "0")}${"p".repeat(250)}`);
    const scattered = providers.map(provider => ({ ...row(provider.slice(0, 2), "Scattered"), nativeRef: ref(provider, "x"), sourceConnectionState: "disconnected" as const }));
    const withheld = report(stand(scattered));
    expect(withheld).toMatchObject({ disconnectedProviders: [], counts: { disconnected: 20 } });
    expect(JSON.stringify(withheld).length).toBeLessThan(16_384);
  });
});

describe("selector purity and bounds (docs/workbench/10 § Rendering pipeline)", () => {
  it("reads one bounded query page and relation pages for examined keys only, without mutating the projection", () => {
    const view = chainFixture();
    observe(view, { id: "other", tone: "active", interval: openSince(5), invocationId: "inv-other" });
    relate(view, "other", "A");
    const query = vi.spyOn(view, "query");
    const relations = vi.spyOn(view, "relations");
    const revision = view.window({ scope: alice, invocationId: INVOCATION, offset: 0, limit: 1 }).revision;
    const topology = view.relationRevision();
    const first = report(view);
    expect(query).toHaveBeenCalledTimes(1);
    expect(query.mock.calls[0][0]).toEqual({ scope: alice, invocationId: INVOCATION, limit: 100 });
    const examined = new Set(["A", "B", "C", "D"].map(id => keyOf(view, id)));
    expect(relations.mock.calls.length).toBe(4);
    for (const [input] of relations.mock.calls) expect(examined.has(input.from ?? "")).toBe(true);
    query.mockClear();
    report(view, { limit: 7 });
    expect(query.mock.calls[0][0]).toMatchObject({ limit: 7 });
    expect(view.window({ scope: alice, invocationId: INVOCATION, offset: 0, limit: 1 }).revision).toBe(revision);
    expect(view.relationRevision()).toBe(topology);
    expect(report(view)).toEqual(first);
  });

  it("caps the page and the bottleneck list and refuses malformed bounds", () => {
    const view = new ObservationProjection({ maxQuery: 500 });
    for (let i = 0; i < 150; i++) observe(view, { id: `op-${i}`, tone: "active", interval: openSince(i + 1) });
    const query = vi.spyOn(view, "query");
    const result = report(view, { limit: 400, bottlenecks: 50 });
    expect(query.mock.calls[0][0]).toMatchObject({ limit: 100 });
    expect(result.examined).toEqual({ nodes: 100, truncated: true });
    expect(result.bottlenecks).toHaveLength(20);
    for (const limit of [0, -1, 1.5, Number.NaN]) expect(() => report(view, { limit })).toThrow(CapabilityError);
    for (const bottlenecks of [-1, 2.5, Number.POSITIVE_INFINITY]) expect(() => report(view, { bottlenecks })).toThrow(CapabilityError);
  });
});

/** Mulberry32: a fixed-seed PRNG so the fixture is identical on every run and every host. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
interface TruthNode { id: string; provider: string; tone: Tone; interval?: Interval; snapshot: boolean; title: string }
interface TruthEdge { from: string; to: string; kind: RelationKind }
interface Fixture { view: ObservationProjection; invocations: string[]; nodes: Map<string, TruthNode>; edges: TruthEdge[]; disconnected: string }
const PROFILES = ["clean", "hub", "hypothesis", "open", "missing", "cycle", "isolated", "mixed"] as const;

/** 200 nodes in eight 25-node invocations, with dependency, grouping, causation and hypothesis edges, cross-invocation
 * and never-observed endpoints, complete, open, missing and clock-skewed intervals, and one disconnected provider. */
function seededFixture(seed: number): Fixture {
  const random = mulberry32(seed);
  const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
  const view = new ObservationProjection();
  const nodes = new Map<string, TruthNode>();
  const edges: TruthEdge[] = [];
  const declared = new Set<string>();
  const provider = (id: string): string => nodes.get(id)?.provider ?? "beads";
  const link = (from: string, to: string, kind: RelationKind): void => {
    const id = JSON.stringify([from, to, kind]);
    if (declared.has(id)) return;
    declared.add(id);
    edges.push({ from, to, kind });
  };
  const invocations = PROFILES.map((_, i) => `inv-${i}`);
  PROFILES.forEach((profile, i) => {
    const ids = Array.from({ length: 25 }, (_, j) => `n${i}-${String(j).padStart(2, "0")}`);
    for (const id of ids) nodes.set(id, { id, provider: pick(["furnace", "forge", "claude"]), tone: pick(["active", "waiting", "success", "failure", "unknown"] as const), snapshot: random() < 0.6, title: `Op ${id}` });
    if (profile !== "isolated") {
      link(ids[0], ids[1], "dependency");
      for (let j = 0; j < ids.length; j++) for (let k = j + 1; k < ids.length; k++) if (random() < 0.07) link(ids[j], ids[k], "dependency");
    }
    if (profile === "hub") for (let j = 1; j < ids.length; j++) for (const kind of ["grouping", "causation"] as const) link(ids[0], ids[j], kind);
    for (let j = 1; j < ids.length; j++) {
      if (random() < 0.3) link(ids[Math.floor(random() * 5)], ids[j], "grouping");
      if (random() < 0.1) link(ids[Math.floor(random() * ids.length)], ids[j], "causation");
    }
    if (profile === "hypothesis" || profile === "isolated" || (profile === "mixed" && random() < 0.5)) link(ids[2], ids[7], "hypothesis");
    const dependencies = edges.filter(edge => edge.kind === "dependency" && ids.includes(edge.from) && ids.includes(edge.to));
    if (profile === "cycle") {
      const back = pick(dependencies);
      link(back.to, back.from, "dependency");
    }
    if (i + 1 < PROFILES.length) link(ids[3], `n${i + 1}-04`, "dependency");
    link(ids[5], `ghost-${i}`, "dependency");
    const incident = new Set(dependencies.flatMap(edge => [edge.from, edge.to]));
    const spoiled = profile === "open" || profile === "missing" ? pick([...incident]) : undefined;
    for (const id of ids) {
      const start = -1 - Math.floor(random() * 3600);
      const shape = profile === "mixed" || !incident.has(id) ? pick(["complete", "open", "missing", "skew"] as const) :
        id !== spoiled ? "complete" : profile === "open" ? "open" : "missing";
      const interval: Interval | undefined = shape === "missing" ? undefined : shape === "open" ? { startedAt: at(start) } :
        shape === "skew" ? { startedAt: at(1 + Math.floor(random() * 60)) } : { startedAt: at(start), endedAt: at(start + Math.floor(random() * 900)) };
      const truth = nodes.get(id);
      if (!truth) throw new Error(`fixture node ${id} is absent`);
      truth.interval = interval;
      const presentation: Presentation = { title: truth.title, type: "sdk-operation", statusText: truth.tone, statusTone: truth.tone };
      const source = ref(truth.provider, id);
      if (truth.snapshot) view.refresh({ source, scope: alice, capturedAt: T, observedAt: T, node: presentation, trace: { invocationId: invocations[i] }, ...(interval ? { interval } : {}) });
      else view.ingest({ projectionEventId: `e-${id}`, source, scope: alice, sourceSequence: 1, observedAt: T, kind: "native.status", node: { presentation }, trace: { invocationId: invocations[i] }, ...(interval ? { interval } : {}) });
    }
  });
  for (const edge of edges) view.relate({ scope: alice, from: ref(provider(edge.from), edge.from), to: ref(provider(edge.to), edge.to), kind: edge.kind, provenance: { source: "fixture", observedAt: T } });
  view.disconnect("claude");
  return { view, invocations, nodes, edges, disconnected: "claude" };
}

/** The independent computation: counts by enumeration, bottlenecks by a full sort, cycles by depth-first colouring and
 * the chain by enumerating every source-to-sink dependency path. Only the examined page comes from the projection. */
function bruteForce(fixture: Fixture, page: { nodes: ObservedNode[]; truncated: boolean }, wanted: number) {
  const keyOf = new Map(page.nodes.map(node => [node.nativeRef.id, node.key]));
  const truths = page.nodes.map(node => {
    const truth = fixture.nodes.get(node.nativeRef.id);
    if (!truth) throw new Error(`page node ${node.nativeRef.id} is not in the fixture`);
    return truth;
  });
  const key = (id: string): string => keyOf.get(id) ?? "";
  const freshness = (truth: TruthNode): Freshness => truth.provider === fixture.disconnected ? "stale" : truth.snapshot ? "current" : "unknown";
  const counts = { active: 0, waiting: 0, success: 0, failure: 0, unknown: 0, stale: 0, disconnected: 0, withInterval: 0, withoutInterval: 0 };
  const providers = new Set<string>();
  const open: AttentionReport["bottlenecks"] = [];
  let unmeasured = 0;
  let clockSkew = 0;
  for (const truth of truths) {
    counts[truth.tone] += 1;
    if (freshness(truth) !== "current") counts.stale += 1;
    if (truth.provider === fixture.disconnected) {
      counts.disconnected += 1;
      providers.add(truth.provider);
    }
    if (truth.interval) counts.withInterval += 1;
    else counts.withoutInterval += 1;
    if (truth.tone !== "active" && truth.tone !== "waiting") continue;
    if (!truth.interval || truth.interval.endedAt !== undefined) {
      unmeasured += 1;
      continue;
    }
    const elapsed = T_MS - Date.parse(truth.interval.startedAt);
    if (elapsed < 0) clockSkew += 1;
    open.push({ key: key(truth.id), nativeRef: ref(truth.provider, truth.id), title: truth.title, tone: truth.tone, freshness: freshness(truth), openMs: Math.max(0, elapsed), measured: true });
  }
  open.sort((a, b) => b.openMs - a.openMs || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));

  const inPage = new Set(truths.map(truth => truth.id));
  const outgoing = new Map<string, number>();
  const pairs = new Map<string, number>();
  const successors = new Map<string, Set<string>>();
  let dependencyEdges = 0;
  let hypothesis = false;
  for (const edge of fixture.edges) {
    if (inPage.has(edge.from)) outgoing.set(edge.from, (outgoing.get(edge.from) ?? 0) + 1);
    if (!inPage.has(edge.from) || !inPage.has(edge.to)) continue;
    const pair = JSON.stringify([edge.from, edge.to]);
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
    if (edge.kind === "hypothesis") hypothesis = true;
    if (edge.kind !== "dependency") continue;
    const next = successors.get(edge.from) ?? new Set<string>();
    if (!next.has(edge.to)) dependencyEdges += 1;
    next.add(edge.to);
    successors.set(edge.from, next);
  }
  const incident = new Set([...successors].flatMap(([from, to]) => [from, ...to]));
  const intervalOf = (id: string): Interval | undefined => fixture.nodes.get(id)?.interval;
  const colour = new Map<string, "grey" | "black">();
  const cyclic = (id: string): boolean => {
    colour.set(id, "grey");
    for (const to of successors.get(id) ?? []) if (colour.get(to) === "grey" || (!colour.has(to) && cyclic(to))) return true;
    colour.set(id, "black");
    return false;
  };
  const reasons: Reason[] = [];
  if (dependencyEdges === 0) reasons.push("no-dependency-edges");
  if ([...incident].some(id => !intervalOf(id))) reasons.push("missing-intervals");
  if ([...incident].some(id => intervalOf(id) && intervalOf(id)?.endedAt === undefined)) reasons.push("open-intervals");
  if (hypothesis) reasons.push("hypothesis-edges");
  if ([...incident].some(id => !colour.has(id) && cyclic(id))) reasons.push("cycle");
  // The documented page rule: a page is whole below min(100, examined); a fuller page is re-read pair by pair over the
  // examined nodes, and only a pair page that is itself that full leaves an edge possibly unread.
  const whole = Math.min(100, truths.length);
  const full = truths.filter(truth => (outgoing.get(truth.id) ?? 0) >= whole);
  if (full.length * truths.length > 2_000) throw new Error("fixture exceeds the pair-read budget this model assumes");
  const unread = full.some(from => truths.some(to => (pairs.get(JSON.stringify([from.id, to.id])) ?? 0) >= whole));
  if (page.truncated || unread) reasons.push("truncated");
  let criticalPath: AttentionReport["criticalPath"] = { label: "incomplete-trace", reasons };
  if (reasons.length === 0) {
    const entered = new Set([...successors.values()].flatMap(set => [...set]));
    let best: { ms: number; keys: string[] } | undefined;
    let walked = 0;
    const lexLess = (a: string[], b: string[]): boolean => {
      for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] < b[i];
      return a.length < b.length;
    };
    const walk = (id: string, ms: number, path: string[]): void => {
      if (++walked > 2_000_000) throw new Error("fixture path enumeration exploded");
      const interval = intervalOf(id);
      const total = ms + Date.parse(interval?.endedAt ?? "") - Date.parse(interval?.startedAt ?? "");
      const keys = [...path, key(id)];
      const next = successors.get(id);
      if (!next || next.size === 0) {
        if (!best || total > best.ms || (total === best.ms && lexLess(keys, best.keys))) best = { ms: total, keys };
        return;
      }
      for (const to of next) walk(to, total, keys);
    };
    for (const id of incident) if (!entered.has(id)) walk(id, 0, []);
    if (!best) throw new Error("an acyclic dependency graph has a source");
    const chosen: { ms: number; keys: string[] } = best;
    criticalPath = { label: "partial-estimated", keys: chosen.keys, measuredMs: chosen.ms, coverage: { chainNodes: chosen.keys.length, dependencyEdges }, caveat: CHAIN_CAVEAT };
  }
  return {
    examined: { nodes: truths.length, truncated: page.truncated }, counts, disconnectedProviders: [...providers].sort(),
    bottlenecks: open.slice(0, wanted), unmeasured, clockSkew, criticalPath,
  };
}

describe("B7 docs/workbench/14 § Truth labels and release gates: brute-force falsifier", () => {
  it("deep-equals an independent brute-force computation over a seeded 200-node fixture", () => {
    const fixture = seededFixture(20_261_015);
    expect(fixture.nodes.size).toBe(200);
    expect(new Set(fixture.edges.map(edge => edge.kind))).toEqual(new Set(["dependency", "grouping", "causation", "hypothesis"]));
    const labels = new Set<string>();
    const reasons = new Set<string>();
    let compared = 0;
    let pairReads = 0;
    for (const invocationId of fixture.invocations) {
      for (const [limit, wanted] of [[100, 5], [25, 25], [18, 3]] as const) {
        const page = fixture.view.query({ scope: alice, invocationId, limit });
        const relations = vi.spyOn(fixture.view, "relations");
        const actual = selectAttention(fixture.view, { scope: alice, invocationId, now: T, limit, bottlenecks: wanted });
        pairReads += relations.mock.calls.filter(([input]) => input.to !== undefined).length;
        relations.mockRestore();
        const { examined, counts, disconnectedProviders, bottlenecks, unmeasured, clockSkew, criticalPath } = actual;
        expect({ examined, counts, disconnectedProviders, bottlenecks, unmeasured, clockSkew, criticalPath }).toEqual(bruteForce(fixture, page, wanted));
        labels.add(criticalPath.label);
        if (criticalPath.label === "incomplete-trace") for (const reason of criticalPath.reasons) reasons.add(reason);
        compared++;
      }
    }
    expect(compared).toBe(24);
    // The hub's fan-out exceeds a page, so the pairwise read ran and was checked by the same deep-equality.
    expect(pairReads).toBeGreaterThan(0);
    // Non-vacuity: both labels and every reason occur, so a weakened rule on any branch would be caught.
    expect(labels).toEqual(new Set(["partial-estimated", "incomplete-trace"]));
    expect([...reasons].sort()).toEqual([...REASONS].sort());
  });
});
