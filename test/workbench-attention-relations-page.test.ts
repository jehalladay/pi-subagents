/**
 * wb-6ze.29 (W14/W15/VC-5): selectAttention adopts ObservationProjection.relationsPage. A relation page the reader
 * reports whole is whole whatever its size: no pair re-read and no pair budget spent. A page reported truncated takes
 * the pair re-read path exactly as before (pairs within MAX_PAIR_READS 2,000; a truncated or full pair page, or a spent
 * budget, leaves an edge possibly unread). A reader without relationsPage (a producer stand-in, a pre-adoption caller)
 * is read through relations() exactly as before. Rows B2-B6 quote the bead's acceptance criteria; B1 is the timeline's
 * (test/workbench-timeline-relations-page.test.ts). Seeded fixtures only: a fixed seed, no host clock and no host
 * randomness in the measured path.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { ATTENTION_CONTRACT, type AttentionReport, selectAttention } from "../src/workbench/attention.js";
import {
  type Interval, type NativeRef, ObservationProjection, type ObservationQuery, type ObservationScope, type ObservedNode,
  type Relation, type RelationKind,
} from "../src/workbench/observation.js";

afterEach(() => {
  vi.restoreAllMocks();
});

const alice: ObservationScope = { workspace: "ws-attention-pages", principal: "alice" };
const INVOCATION = "inv-attention-pages";
/** The caller's clock for every case. */
const T = "2026-10-18T12:00:00.000Z";
const T_MS = Date.parse(T);
/** The reasons vocabulary of AttentionCriticalPath, in the order the selector emits it. */
const REASONS = ["no-dependency-edges", "missing-intervals", "open-intervals", "hypothesis-edges", "cycle", "truncated"];
/** RELATION_PAGE and MAX_PAIR_READS of src/workbench/attention.ts, which this bead leaves unchanged. */
const RELATION_PAGE = 100;
const MAX_PAIR_READS = 2_000;

const at = (seconds: number): string => new Date(T_MS + seconds * 1000).toISOString();
const span = (start: number, seconds: number): Interval => ({ startedAt: at(start), endedAt: at(start + seconds) });
const ref = (id: string): NativeRef => ({ provider: "furnace", type: "operation", id });
/** ObservationProjection's provider-qualified key layout for an operation in this suite's scope. */
const keyOf = (id: string): string => JSON.stringify([alice.workspace, alice.principal, "furnace", "operation", "", id]);
const ids = (prefix: string, count: number): string[] => Array.from({ length: count }, (_, i) => `${prefix}${String(i).padStart(2, "0")}`);

function observe(view: ObservationProjection, id: string, interval?: Interval): void {
  view.refresh({
    source: ref(id), scope: alice, capturedAt: T, observedAt: T,
    node: { title: `Operation ${id}`, type: "sdk-operation", statusText: "SUCCESS", statusTone: "success" },
    trace: { invocationId: INVOCATION }, ...(interval ? { interval } : {}),
  });
}
/** Edges are keyed by from, to, kind and source, so a distinct source states a parallel edge between the same pair. */
function relate(view: ObservationProjection, from: string, to: string, kind: RelationKind = "dependency", source = "declared workflow"): void {
  view.relate({ scope: alice, from: ref(from), to: ref(to), kind, provenance: { source, observedAt: T } });
}

type Reader = Parameters<typeof selectAttention>[0];
type Read = Parameters<ObservationProjection["relations"]>[0];
const report = (reader: Reader): AttentionReport => selectAttention(reader, { scope: alice, invocationId: INVOCATION, now: T });
/** The same projection with relationsPage hidden: what every pre-adoption caller and producer stand-in hands the selector. */
const legacyOf = (view: ObservationProjection): Pick<ObservationProjection, "query" | "relations"> => ({
  query: filter => view.query(filter),
  relations: input => view.relations(input),
});
const pairReads = (calls: readonly (readonly [Read])[]): number => calls.filter(([input]) => input.to !== undefined).length;
const pageReads = (calls: readonly (readonly [Read])[]): number => calls.filter(([input]) => input.to === undefined).length;
/** Every report field except the critical path, which is the only field relation reads decide. */
const besidesPath = (value: AttentionReport): Omit<AttentionReport, "criticalPath"> & { criticalPath: null } => ({ ...value, criticalPath: null });
const flagged = (value: AttentionReport): boolean => value.criticalPath.label === "incomplete-trace" && value.criticalPath.reasons.includes("truncated");
/** The examined keys in the order the selector reads them: its one query page, re-read the same way. */
const examinedKeys = (view: ObservationProjection): string[] => view.query({ scope: alice, invocationId: INVOCATION, limit: 100 }).nodes.map(node => node.key);

/** `n` nodes, each with one dependency edge to every node of the page (itself included): every page holds exactly n rows. */
function square(n: number): ObservationProjection {
  const view = new ObservationProjection();
  const nodes = ids("n", n);
  for (const [i, id] of nodes.entries()) observe(view, id, span(-1_000 + i * 10, 5));
  for (const from of nodes) for (const to of nodes) relate(view, from, to);
  return view;
}
/** c00 -> c01 -> ... -> c09 with complete intervals of 10..19 s, each node also grouping ten operations outside the page,
 * so every page holds at least as many rows as the page has nodes while every pair page holds at most one. */
function chainWithFullPages(): ObservationProjection {
  const view = new ObservationProjection();
  const chain = ids("c", 10);
  for (const [i, id] of chain.entries()) observe(view, id, span(-500 + i * 20, 10 + i));
  for (const [i, id] of chain.entries()) {
    if (i + 1 < chain.length) relate(view, id, chain[i + 1]);
    for (let k = 0; k < 10; k++) relate(view, id, `outside-${i}-${k}`, "grouping");
  }
  return view;
}

describe('B2 docs/workbench/10 § Rendering pipeline: "Avoid O(allHistory) collapse per frame" and docs/workbench/14 § Performance benchmark: "no full 100k-event fold per redraw"', () => {
  it("issues exactly 50 relationsPage calls and 0 pair reads over 50 examined nodes with 50 outgoing dependency edges each, where the legacy path pays 2,000 pair reads", () => {
    const view = square(50);
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const adopted = report(view);
    expect(pages).toHaveBeenCalledTimes(50);
    expect(pairReads(pages.mock.calls)).toBe(0);
    expect(relations).not.toHaveBeenCalled();
    expect(new Set(pages.mock.calls.map(([input]) => input.from))).toEqual(new Set(examinedKeys(view)));
    for (const [input] of pages.mock.calls) expect(input).toStrictEqual({ scope: alice, from: input.from, limit: RELATION_PAGE });
    for (const result of pages.mock.results) expect(result).toMatchObject({ type: "return", value: { truncated: false, limitApplied: 100 } });
    pages.mockClear();
    // The same projection object with relationsPage hidden: every page holds 50 >= min(100, 50) rows, so each is re-read
    // pair by pair until the 2,000-read budget is spent at the 41st key.
    const legacy = report(legacyOf(view));
    expect(pages).not.toHaveBeenCalled();
    expect(pageReads(relations.mock.calls)).toBe(50);
    expect(pairReads(relations.mock.calls)).toBe(MAX_PAIR_READS);
    // Every field but the critical path is deep-equal. The legacy path's spent budget is a false alarm the adopted path
    // retires: every page held the node's 50 edges whole, and only the self-loops make the trace incomplete.
    expect(besidesPath(adopted)).toStrictEqual(besidesPath(legacy));
    expect(adopted.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["cycle"] });
    expect(legacy.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["cycle", "truncated"] });
  });

  it("deep-equals the legacy report, chain included, when the legacy pair re-read runs within its budget, at 10 page reads instead of 110", () => {
    const view = chainWithFullPages();
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const adopted = report(view);
    expect(pageReads(pages.mock.calls)).toBe(10);
    expect(pairReads(pages.mock.calls)).toBe(0);
    expect(relations).not.toHaveBeenCalled();
    const legacy = report(legacyOf(view));
    expect(pageReads(relations.mock.calls)).toBe(10);
    expect(pairReads(relations.mock.calls)).toBe(100);
    expect(JSON.stringify(adopted)).toBe(JSON.stringify(legacy));
    expect(adopted.criticalPath).toStrictEqual({
      label: "partial-estimated", keys: ids("c", 10).map(keyOf), measuredMs: 145_000, coverage: { chainNodes: 10, dependencyEdges: 9 },
      caveat: "Observed dependency edges and complete source intervals only; missing edges do not imply independence.",
    });
  });

  it("re-reads a page reported truncated pair by pair through relationsPage, with the pair re-read count of the legacy path", () => {
    // maxQuery 12 caps every page at 12 rows; p00 states 15 outgoing edges (11 dependencies, a restated one, 3 groupings).
    const view = new ObservationProjection({ maxQuery: 12 });
    const page = ids("p", 12);
    for (const [i, id] of page.entries()) observe(view, id, span(-900 + i * 30, 5 + i));
    for (const to of page.slice(1)) relate(view, "p00", to);
    relate(view, "p00", "p01", "dependency", "restated");
    for (const outside of ["g1", "g2", "g3"]) relate(view, "p00", outside, "grouping");
    for (const [i, id] of page.entries()) if (i > 0 && i + 1 < page.length) relate(view, id, page[i + 1]);
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const adopted = report(view);
    expect(pages.mock.results.filter(result => result.type === "return" && result.value.truncated).length).toBe(1);
    expect(pairReads(pages.mock.calls)).toBe(12);
    expect(pages.mock.calls.filter(([input]) => input.to !== undefined).every(([input]) => input.from === keyOf("p00"))).toBe(true);
    expect(relations).not.toHaveBeenCalled();
    const legacy = report(legacyOf(view));
    expect(pairReads(relations.mock.calls)).toBe(12);
    expect(adopted).toStrictEqual(legacy);
    expect(adopted.criticalPath).toMatchObject({ label: "partial-estimated", keys: page.map(keyOf) });
  });

  it("follows the legacy outcome exactly under a truncated page: a pair page holding `whole` rows still leaves an edge possibly unread", () => {
    // maxQuery 3 with three examined nodes: A states 4 edges (3 to B, 1 to C), so its page is truncated and its pair page to
    // B holds exactly 3 rows, which is reported whole yet is as full as the page rule allows.
    const view = new ObservationProjection({ maxQuery: 3 });
    for (const [id, start] of [["A", -100], ["B", -90], ["C", -70]] as const) observe(view, id, span(start, 10));
    for (const kind of ["dependency", "grouping", "causation"] as const) relate(view, "A", "B", kind);
    relate(view, "A", "C");
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const adopted = report(view);
    expect(pairReads(pages.mock.calls)).toBe(3);
    expect(relations).not.toHaveBeenCalled();
    const legacy = report(legacyOf(view));
    expect(pairReads(relations.mock.calls)).toBe(3);
    expect(adopted).toStrictEqual(legacy);
    expect(adopted.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["truncated"] });
  });

  it("spends no pair budget on pages reported whole: five truncated pages behind 45 whole ones are all re-read in full", () => {
    // maxQuery 60: 45 pages hold 55 rows (whole), 5 hold 61 matching edges (truncated at 60). The legacy path treats all 50
    // as full and spends its budget on the first 40.
    const view = new ObservationProjection({ maxQuery: 60 });
    const page = ids("w", 50);
    for (const [i, id] of page.entries()) observe(view, id, span(-2_000 + i * 10, 5));
    for (const [i, from] of page.entries()) {
      for (const to of page) relate(view, from, to);
      for (let k = 0; k < (i < 45 ? 5 : 11); k++) relate(view, from, `out-${i}-${k}`, "grouping");
    }
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const adopted = report(view);
    expect(pageReads(pages.mock.calls)).toBe(50);
    expect(pairReads(pages.mock.calls)).toBe(5 * 50);
    expect(new Set(pages.mock.calls.filter(([input]) => input.to !== undefined).map(([input]) => input.from))).toEqual(new Set(page.slice(45).map(keyOf)));
    expect(relations).not.toHaveBeenCalled();
    expect(adopted.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["cycle"] });
    const legacy = report(legacyOf(view));
    expect(pairReads(relations.mock.calls)).toBe(MAX_PAIR_READS);
    expect(legacy.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["cycle", "truncated"] });
    expect(besidesPath(adopted)).toStrictEqual(besidesPath(legacy));
  });
});

describe('B3 docs/workbench/09 § Aggregates and profiling: "If dependencies or interval bounds are missing, suppress precise critical path claims and show incomplete trace."', () => {
  /** A producer stand-in whose relation pages are capped at `cap` rows, below the examined count, and that reports the cut
   * the way ObservationProjection.relationsPage does: truncated only when a further matching edge exists past the page. */
  function capped(nodes: readonly ObservedNode[], edges: readonly Relation[], cap: number): Pick<ObservationProjection, "query" | "relations" | "relationsPage"> {
    const matching = (input: Read): Relation[] =>
      edges.filter(edge => (input.from === undefined || edge.from === input.from) && (input.to === undefined || edge.to === input.to));
    const limitOf = (input: Read): number => Math.min(input.limit ?? cap, cap);
    return {
      query: (filter: ObservationQuery) => ({ nodes: nodes.slice(0, filter.limit), examined: nodes.length, truncated: nodes.length > filter.limit }),
      relations: input => matching(input).slice(0, limitOf(input)),
      relationsPage: input => {
        const rows = matching(input);
        const limitApplied = limitOf(input);
        return { relations: rows.slice(0, limitApplied), examined: rows.length, truncated: rows.length > limitApplied, limitApplied };
      },
    };
  }
  const edge = (from: string, to: string, kind: RelationKind): Relation => ({ from: keyOf(from), to: keyOf(to), kind, provenance: { source: "declared workflow", observedAt: T } });

  it("reports a page truncated below whole as truncation, never a chain: maxQuery 2 under three examined nodes", () => {
    const real = new ObservationProjection();
    for (const [id, start] of [["A", -100], ["B", -90], ["C", -70]] as const) observe(real, id, span(start, 10));
    const nodes = real.query({ scope: alice, invocationId: INVOCATION, limit: 100 }).nodes;
    expect(nodes).toHaveLength(3);
    // A's third edge, the hypothesis, lies past a page of 2: the page holds fewer rows than the 3 examined nodes.
    const stand = capped(nodes, [edge("A", "B", "dependency"), edge("A", "B", "grouping"), edge("A", "B", "hypothesis")], 2);
    expect(stand.relationsPage({ scope: alice, from: keyOf("A"), limit: RELATION_PAGE })).toMatchObject({ truncated: true, limitApplied: 2 });
    const result = report(stand);
    expect(result.criticalPath).toStrictEqual({ label: "incomplete-trace", reasons: ["truncated"] });
    expect(result.criticalPath.label).not.toBe("partial-estimated");
    // Without relationsPage the same cut stays invisible: relations() reports no truncation and a page below the examined
    // count looks whole, so the legacy reading claims the chain the hidden hypothesis edge would withdraw.
    const blind: Pick<ObservationProjection, "query" | "relations"> = { query: stand.query, relations: stand.relations };
    expect(report(blind).criticalPath).toMatchObject({ label: "partial-estimated", keys: [keyOf("A"), keyOf("B")] });
  });
});

/** mulberry32: a fixed-seed generator, so every fixture is reproducible and no host randomness enters the measured path. */
function prng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}
interface Seeded {
  view: ObservationProjection;
  /** The same snapshots and edges behind a read cap no fixture reaches: complete knowledge of every edge. */
  truth: ObservationProjection;
  /** Stored outgoing edges per key and per (from, to) pair, counted while the fixture states them. */
  outgoing: Map<string, number>;
  pairs: Map<string, number>;
}
function seeded(seed: number, maxQuery: number): Seeded {
  const random = prng(seed);
  const pick = (n: number): number => Math.floor(random() * n);
  const view = new ObservationProjection({ maxQuery });
  const truth = new ObservationProjection({ maxQuery: 10_000 });
  const count = random() < 0.1 ? 2 + pick(50) : 2 + pick(Math.max(1, Math.min(maxQuery, 40) - 1));
  const nodes = ids("a", count);
  for (const id of nodes) {
    const shape = random();
    const interval: Interval | undefined = shape < 0.9 ? span(-3_000 + pick(2_000), 1 + pick(60)) : shape < 0.95 ? { startedAt: at(-pick(500)) } : undefined;
    for (const copy of [view, truth]) observe(copy, id, interval);
  }
  const outgoing = new Map<string, number>();
  const pairs = new Map<string, number>();
  // At most 160 edges, so even the hub's fan-out stays below one 100-row page of the complete-knowledge reader.
  const edges = 1 + pick(Math.min(count * 5, 160));
  for (let e = 0; e < edges; e++) {
    let from = random() < 0.35 ? 0 : pick(count);
    let to = pick(count);
    const roll = random();
    const kind: RelationKind = roll < 0.55 ? "dependency" : roll < 0.75 ? "grouping" : roll < 0.95 ? "causation" : "hypothesis";
    // Mostly forward dependencies, so acyclic chains occur; an occasional backward one makes a cycle.
    if (kind === "dependency" && from > to && random() < 0.85) [from, to] = [to, from];
    const target = random() < 0.15 ? `x${pick(20)}` : nodes[to];
    for (const copy of [view, truth]) relate(copy, nodes[from], target, kind, `s${e}`);
    const fromKey = keyOf(nodes[from]);
    outgoing.set(fromKey, (outgoing.get(fromKey) ?? 0) + 1);
    const pair = JSON.stringify([fromKey, keyOf(target)]);
    pairs.set(pair, (pairs.get(pair) ?? 0) + 1);
  }
  return { view, truth, outgoing, pairs };
}
/** Whether an edge may have been left unread, from the fixture's stored edge counts alone (the bead's stated rule): a page
 * is re-read pair by pair when it is reported truncated (legacy: when it holds min(100, examined) rows), under a budget of
 * 2,000 pair reads; a pair page that is truncated or holds that many rows, or a spent budget, leaves an edge unread. */
function unreadModel(keys: readonly string[], fixture: Seeded, maxQuery: number, legacy: boolean): boolean {
  const cap = Math.min(RELATION_PAGE, maxQuery);
  const whole = Math.min(RELATION_PAGE, keys.length);
  let budget = MAX_PAIR_READS;
  let unread = false;
  for (const key of keys) {
    const count = fixture.outgoing.get(key) ?? 0;
    if (!(legacy ? Math.min(count, cap) >= whole : count > cap)) continue;
    if (budget < keys.length) {
      unread = true;
      continue;
    }
    budget -= keys.length;
    for (const to of keys) {
      const pair = fixture.pairs.get(JSON.stringify([key, to])) ?? 0;
      if ((!legacy && pair > cap) || Math.min(pair, cap) >= whole) unread = true;
    }
  }
  return unread;
}

describe('B4 docs/workbench/14 § Truth labels and release gates: "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened."', () => {
  it("never reports less than complete knowledge supports and never alarms where the legacy path is quiet, over 200 seeded projections at maxQuery 2, 5, 40 and 100", () => {
    const tally = { compared: 0, quietEqual: 0, adoptedAlarms: 0, falseAlarmsRetired: 0, chains: 0, examinedTruncated: 0 };
    for (const maxQuery of [2, 5, 40, 100]) {
      for (let seed = 0; seed < 50; seed++) {
        const fixture = seeded(20_261_018 + maxQuery * 1_000 + seed, maxQuery);
        const keys = examinedKeys(fixture.view);
        const truthReader: Reader = {
          query: filter => fixture.view.query(filter),
          relations: input => fixture.truth.relations(input),
          relationsPage: input => {
            const page = fixture.truth.relationsPage(input);
            if (page.truncated) throw new Error("the complete-knowledge reader met a capped page");
            return page;
          },
        };
        const adopted = report(fixture.view);
        const legacy = report(legacyOf(fixture.view));
        const truth = report(truthReader);
        // The documented rule, modelled from edge counts alone, decides every "truncated" the two paths report.
        expect(flagged(adopted)).toBe(adopted.examined.truncated || unreadModel(keys, fixture, maxQuery, false));
        expect(flagged(legacy)).toBe(legacy.examined.truncated || unreadModel(keys, fixture, maxQuery, true));
        expect(besidesPath(adopted)).toStrictEqual(besidesPath(legacy));
        expect(besidesPath(adopted)).toStrictEqual(besidesPath(truth));
        // Never less conservative: a report that does not flag truncation is the report complete knowledge gives.
        if (!flagged(adopted)) expect(adopted).toStrictEqual(truth);
        // Never more alarming than the size inference, and identical wherever it is quiet.
        if (flagged(adopted)) expect(flagged(legacy)).toBe(true);
        if (!flagged(legacy)) expect(adopted).toStrictEqual(legacy);
        tally.compared++;
        if (!flagged(legacy)) tally.quietEqual++;
        if (flagged(adopted) && !adopted.examined.truncated) tally.adoptedAlarms++;
        if (flagged(legacy) && !flagged(adopted)) tally.falseAlarmsRetired++;
        if (adopted.criticalPath.label === "partial-estimated") tally.chains++;
        if (adopted.examined.truncated) tally.examinedTruncated++;
      }
    }
    // Non-vacuity: every branch of the comparison is exercised, including false alarms the adoption retires (each one
    // checked above against complete knowledge) and real truncation the adopted path still reports.
    expect(tally.compared).toBe(200);
    for (const count of [tally.quietEqual, tally.adoptedAlarms, tally.falseAlarmsRetired, tally.chains, tally.examinedTruncated]) expect(count).toBeGreaterThan(0);
  });
});

describe("B5 the legacy fallback is byte-identical: a reader without relationsPage is read exactly as before", () => {
  it("reads relations() page by page and pair by pair in the documented order, and the report is byte-identical to the adopted one when nothing is truncated", () => {
    const view = chainWithFullPages();
    const legacy = legacyOf(view);
    expect("relationsPage" in legacy).toBe(false);
    const relations = vi.spyOn(view, "relations");
    const pages = vi.spyOn(view, "relationsPage");
    const fallback = report(legacy);
    expect(pages).not.toHaveBeenCalled();
    const keys = examinedKeys(view);
    // Every page here holds at least min(100, 10) rows, so each is followed by one pair read per examined key.
    const expected: Read[] = keys.flatMap(key => [
      { scope: alice, from: key, limit: RELATION_PAGE },
      ...keys.map(to => ({ scope: alice, from: key, to, limit: RELATION_PAGE })),
    ]);
    expect(relations.mock.calls.map(([input]) => input)).toStrictEqual(expected);
    expect(JSON.stringify(fallback)).toBe(JSON.stringify(report(view)));
  });

  it("keeps a query-and-relations producer stand-in on relations() and its report unchanged", () => {
    const view = chainWithFullPages();
    const rows = view.query({ scope: alice, invocationId: INVOCATION, limit: 100 }).nodes;
    const edges: Relation[] = rows.flatMap(node => view.relations({ scope: alice, from: node.key, limit: 100 }));
    const stand: Pick<ObservationProjection, "query" | "relations"> = {
      query: (filter: ObservationQuery) => ({ nodes: rows.slice(0, filter.limit), examined: rows.length, truncated: rows.length > filter.limit }),
      relations: input => edges.filter(row => (input.from === undefined || row.from === input.from) && (input.to === undefined || row.to === input.to)).slice(0, input.limit ?? 100),
    };
    expect(JSON.stringify(report(stand))).toBe(JSON.stringify(report(legacyOf(view))));
    expect(report(stand).criticalPath).toMatchObject({ label: "partial-estimated", coverage: { chainNodes: 10 } });
  });
});

describe('B6 docs/workbench/10 § Four views (Overview): "attention panel and top measured bottlenecks" -- the AttentionReport shape the renderers read is unchanged', () => {
  it("pins the contract string, the report keys, the counts keys, both critical-path shapes and the reasons vocabulary", () => {
    expect(ATTENTION_CONTRACT).toBe("workbench.attention/v1");
    const chain = report(chainWithFullPages());
    const incomplete = report(square(4));
    for (const value of [chain, incomplete]) {
      expect(Object.keys(value)).toEqual([
        "contract", "basis", "now", "examined", "counts", "disconnectedProviders", "bottlenecks", "unmeasured", "clockSkew", "criticalPath", "clockCaveat",
      ]);
      expect(value).toMatchObject({ contract: "workbench.attention/v1", basis: "observed", now: T });
      expect(Object.keys(value.examined)).toEqual(["nodes", "truncated"]);
      expect(Object.keys(value.counts)).toEqual(["active", "waiting", "success", "failure", "unknown", "stale", "disconnected", "withInterval", "withoutInterval"]);
    }
    expect(Object.keys(chain.criticalPath)).toEqual(["label", "keys", "measuredMs", "coverage", "caveat"]);
    expect(chain.criticalPath.label === "partial-estimated" && Object.keys(chain.criticalPath.coverage)).toEqual(["chainNodes", "dependencyEdges"]);
    expect(Object.keys(incomplete.criticalPath)).toEqual(["label", "reasons"]);
    // Reasons come from the frozen vocabulary, each at most once, in vocabulary order.
    const legacy = report(legacyOf(square(50)));
    for (const value of [incomplete, legacy]) {
      const reasons = value.criticalPath.label === "incomplete-trace" ? value.criticalPath.reasons : [];
      expect(reasons.length).toBeGreaterThan(0);
      expect(reasons).toEqual(REASONS.filter(reason => (reasons as readonly string[]).includes(reason)));
    }
  });
});
