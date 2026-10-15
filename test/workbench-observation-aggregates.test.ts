/**
 * W14/VC-5 (wb-6ze.2): incremental ancestor aggregates over observed grouping/ownership edges.
 *
 * Every fixture is seeded and deterministic: no Date.now() or Math.random() feeds a compared or
 * measured value (the rules in the header of test/helpers/perf-fixtures.ts). The brute force below
 * is the falsifier for the incremental read model: it reads only public surfaces (window(),
 * relations(), relationRevision()) and recomputes each aggregate from scratch with set semantics,
 * a literal depth cap of 8 and its own interval envelope, so a quietly weakened maintenance path
 * (a missed ancestor, a double-counted diamond, a stale subtraction) cannot pass.
 *
 * docs/workbench/10-terminal-inspector.md § "Rendering pipeline": "Avoid O(allHistory) collapse per
 * frame; maintain by-node last projection and ancestor aggregates incrementally."
 * docs/workbench/14-qa-and-benchmarks.md § "Truth labels and release gates": "Each major work package
 * must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened."
 */
import { performance } from "node:perf_hooks";
import { describe, expect, it } from "vitest";
import { FurnaceObserver, type FurnaceObserverClient } from "../src/workbench/furnace-observer.js";
import {
  AGGREGATE_DEPTH,
  type AncestorAggregate,
  type Interval,
  type NativeRef,
  type ObservationEvent,
  type ObservationLimits,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
  type Presentation,
  type RelationKind,
} from "../src/workbench/observation.js";

type Tone = Presentation["statusTone"];
type Nesting = "grouping" | "ownership";
const TONES: readonly Tone[] = ["active", "success", "failure", "waiting", "unknown"];
const NESTING: ReadonlySet<RelationKind> = new Set<RelationKind>(["grouping", "ownership"]);
const INVOCATION = "aggregate-fixture";
const PAGE = 10_000;
const alice: ObservationScope = { workspace: "ws-agg", principal: "alice" };
const bob: ObservationScope = { workspace: "ws-agg", principal: "bob" };
const elsewhere: ObservationScope = { workspace: "ws-other", principal: "alice" };
const BASE = Date.UTC(2026, 9, 15, 0, 0, 0);

/** One instant, three spellings: equal instants must resolve to one deterministic source string. */
function stamp(second: number, spelling = 0): string {
  const iso = new Date(BASE + second * 1000).toISOString();
  if (spelling === 1) return iso.replace(".000Z", "Z");
  if (spelling === 2) return iso.replace(".000Z", "+00:00");
  return iso;
}

/** mulberry32: a seeded, platform-independent stream instead of Math.random(). */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const present = (tone: Tone): Presentation => ({ title: `node ${tone}`, type: "sdk-operation", statusText: tone.toUpperCase(), statusTone: tone });
const tally = (): Record<Tone, number> => ({ active: 0, success: 0, failure: 0, waiting: 0, unknown: 0 });
const op = (provider: string, id: string, type = "op"): NativeRef => ({ provider, type, id });
const name = (ref: NativeRef): string => `${ref.provider}/${ref.type}/${ref.id}`;

/** Drives one projection with monotonic per-source sequences and a monotonic capture clock. */
class Fixture {
  readonly view: ObservationProjection;
  private readonly sequences = new Map<string, number>();
  private clock = 1_000;
  constructor(
    readonly scope: ObservationScope,
    limits: ObservationLimits = {},
  ) {
    this.view = new ObservationProjection({ maxQuery: PAGE, ...limits });
  }

  /** The next in-order native status event for a source; building it is kept out of timed regions. */
  event(ref: NativeRef, tone: Tone, interval?: Interval): ObservationEvent {
    const sequence = (this.sequences.get(name(ref)) ?? 0) + 1;
    this.sequences.set(name(ref), sequence);
    this.clock++;
    return {
      projectionEventId: `e-${name(ref)}-${sequence}`,
      source: ref,
      scope: this.scope,
      sourceSequence: sequence,
      observedAt: stamp(this.clock),
      kind: "native.status",
      node: { presentation: present(tone) },
      trace: { invocationId: INVOCATION },
      ...(interval ? { interval } : {}),
    };
  }

  /** A native status event; an omitted interval keeps the node's previous one (ingest semantics). */
  observe(ref: NativeRef, tone: Tone, interval?: Interval): void {
    expect(this.view.ingest(this.event(ref, tone, interval))).toBe("applied");
  }

  /** A read-current snapshot; it replaces the interval exactly, so it can also remove one. */
  snapshot(ref: NativeRef, tone: Tone, interval?: Interval): void {
    this.clock++;
    const outcome = this.view.refresh({
      source: ref,
      scope: this.scope,
      capturedAt: stamp(this.clock),
      observedAt: stamp(this.clock),
      sequence: this.sequences.get(name(ref)) ?? 0,
      node: present(tone),
      trace: { invocationId: INVOCATION },
      ...(interval ? { interval } : {}),
    });
    expect(outcome).toBe("applied");
  }

  nest(from: NativeRef, to: NativeRef, kind: Nesting = "grouping"): void {
    this.view.relate({
      scope: this.scope,
      from,
      to,
      kind,
      provenance: kind === "ownership" ? { source: from.provider, nativeConfirmationRef: `native:${from.id}->${to.id}` } : { source: "trace" },
    });
  }

  link(from: NativeRef, to: NativeRef, kind: RelationKind): void {
    if (kind === "grouping" || kind === "ownership") this.nest(from, to, kind);
    else this.view.relate({ scope: this.scope, from, to, kind, provenance: { source: "declared" } });
  }

  key(ref: NativeRef): string {
    const node = this.view.query({ scope: this.scope, ref, limit: 1 }).nodes[0];
    expect(node, `${name(ref)} is observed`).toBeDefined();
    return node.key;
  }

  aggregate(ref: NativeRef): AncestorAggregate {
    const value = this.view.aggregate({ scope: this.scope, key: this.key(ref) });
    expect(value, `${name(ref)} has an aggregate`).toBeDefined();
    return value as AncestorAggregate;
  }
}

/** Everything the brute force may know, read through public pages only. */
interface Census {
  nodes: Map<string, ObservedNode>;
  endpoints: Set<string>;
  children(key: string): string[];
}

function census(view: ObservationProjection, scope: ObservationScope): Census {
  const scoped = view.query({ scope, limit: PAGE });
  expect(scoped.truncated, "the brute force sees every retained node in scope").toBe(false);
  const nodes = new Map<string, ObservedNode>(scoped.nodes.map((node) => [node.key, node]));
  const edges = view.relations({ scope, limit: PAGE });
  expect(edges.length, "the brute force sees every retained edge").toBeLessThan(PAGE);
  const children = new Map<string, Set<string>>();
  const endpoints = new Set<string>();
  for (const edge of edges) {
    endpoints.add(edge.from);
    endpoints.add(edge.to);
    if (!NESTING.has(edge.kind)) continue;
    const set = children.get(edge.from) ?? new Set<string>();
    set.add(edge.to);
    children.set(edge.from, set);
  }
  return { nodes, endpoints, children: (key) => [...(children.get(key) ?? [])] };
}

const earlier = (a: string, b: string): boolean => Date.parse(a) < Date.parse(b) || (Date.parse(a) === Date.parse(b) && a < b);
const later = (a: string, b: string): boolean => Date.parse(a) > Date.parse(b) || (Date.parse(a) === Date.parse(b) && a < b);

/** Independent recomputation: breadth-first with set semantics, a literal cap of 8, measured intervals only. */
function bruteForce(view: ObservationProjection, scope: ObservationScope, seen: Census, key: string): AncestorAggregate {
  const visited = new Set<string>([key]);
  const members: { key: string; depth: number }[] = [];
  let frontier = [key];
  let depth = 0;
  let depthReached = 0;
  while (frontier.length > 0 && depth < 8) {
    depth++;
    const next: string[] = [];
    for (const parent of frontier) {
      for (const child of seen.children(parent)) {
        if (visited.has(child)) continue;
        visited.add(child);
        next.push(child);
        members.push({ key: child, depth });
      }
    }
    if (next.length > 0) depthReached = depth;
    frontier = next;
  }
  const truncated = frontier.some((parent) => seen.children(parent).some((child) => !visited.has(child)));
  const direct = { children: 0, settled: 0, byTone: tally() };
  const byTone = tally();
  let stale = 0;
  let known = 0;
  let open = 0;
  let missing = 0;
  let earliest: string | undefined;
  let latest: string | undefined;
  for (const member of members) {
    const node = seen.nodes.get(member.key);
    const tone = node?.presentation.statusTone ?? "unknown";
    byTone[tone]++;
    if (node?.freshness !== "current") stale++;
    if (member.depth === 1) {
      direct.children++;
      direct.byTone[tone]++;
      if (tone === "success" || tone === "failure") direct.settled++;
    }
    const interval = node?.interval;
    if (!interval) {
      missing++;
      continue;
    }
    if (earliest === undefined || earlier(interval.startedAt, earliest)) earliest = interval.startedAt;
    if (!interval.endedAt) {
      open++;
      continue;
    }
    known++;
    if (latest === undefined || later(interval.endedAt, latest)) latest = interval.endedAt;
  }
  return {
    key,
    revision: view.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).revision,
    topologyRevision: view.relationRevision(),
    direct,
    descendants: { counted: members.length, byTone, stale, depthReached, truncated },
    intervals: {
      known,
      missing,
      open,
      ...(earliest === undefined ? {} : { earliestStartedAt: earliest }),
      ...(open === 0 && latest !== undefined ? { latestEndedAt: latest } : {}),
    },
    trace: missing > 0 || truncated ? "incomplete" : "bounded",
    criticalPath: "unestablished",
    basis: "observed-grouping-ownership",
  };
}

/** Compares every observed key against the brute force; unobserved endpoints have no aggregate. */
function verifyAll(view: ObservationProjection, scope: ObservationScope): number {
  const seen = census(view, scope);
  for (const key of seen.nodes.keys()) expect(view.aggregate({ scope, key }), key).toStrictEqual(bruteForce(view, scope, seen, key));
  for (const key of seen.endpoints) if (!seen.nodes.has(key)) expect(view.aggregate({ scope, key }), key).toBeUndefined();
  return seen.nodes.size;
}

/** Drops the read stamps so two reads of an unchanged aggregate compare equal. */
function shape(value: AncestorAggregate): Omit<AncestorAggregate, "revision" | "topologyRevision"> {
  const { revision: _revision, topologyRevision: _topologyRevision, ...rest } = value;
  return rest;
}

function fields(value: unknown, path = ""): [string, unknown][] {
  if (value === null || typeof value !== "object") return [[path, value]];
  return Object.entries(value).flatMap(([field, item]) => fields(item, path ? `${path}.${field}` : field));
}

describe("W14/VC-5 incremental ancestor aggregates (wb-6ze.2)", () => {
  it("pins the nesting cap at 8 and exposes additive counters without changing stats()", () => {
    expect(AGGREGATE_DEPTH).toBe(8);
    const view = new ObservationProjection();
    expect(view.aggregateStats()).toStrictEqual({ adjustments: 0, rebuilds: 0, maxVisitedPerUpdate: 0 });
    expect(view.stats()).toStrictEqual({ nodes: 0, events: 0, edges: 0 });
  });

  it("A1: every aggregate deep-equals a brute-force recomputation after each mutation and edge batch (>=500 nodes, depth 10, diamonds, cycles)", () => {
    const random = seeded(20261015);
    const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
    const span = (): Interval | undefined => {
      const roll = random();
      if (roll < 0.25) return undefined;
      const start = Math.floor(random() * 500);
      const startedAt = stamp(start, Math.floor(random() * 3));
      if (roll < 0.5) return { startedAt };
      return { startedAt, endedAt: stamp(start + Math.floor(random() * 100), Math.floor(random() * 3)) };
    };
    const providers = ["furnace", "forge", "claude-agent-sdk"];
    const sizes = [4, 8, 16, 32, 64, 96, 96, 96, 64, 32, 16];
    const layers = sizes.map((size, layer) => Array.from({ length: size }, (_, i) => op(providers[(layer + i) % 3], `L${layer}-${i}`)));
    const all = layers.flat();
    expect(all.length).toBeGreaterThanOrEqual(500);
    const ghosts = Array.from({ length: 12 }, (_, i) => op("forge", `ghost-${i}`, "ghost"));
    const f = new Fixture(alice, { maxNodes: 5_000, maxEdges: 20_000, maxEvents: 5_000 });
    const nesting = (): Nesting => (random() < 0.5 ? "grouping" : "ownership");
    const parentOf = new Map<string, NativeRef>();
    const primary = (layer: number): void => {
      for (const child of layers[layer]) {
        const parent = pick(layers[layer - 1]);
        parentOf.set(name(child), parent);
        f.nest(parent, child, nesting());
      }
    };
    const ancestorOf = (ref: NativeRef, levels: number): NativeRef => {
      let current = ref;
      for (let i = 0; i < levels; i++) current = parentOf.get(name(current)) ?? current;
      return current;
    };
    // Odd layers are related before any node exists: an edge to an unobserved key is still observed topology.
    for (let layer = 1; layer < layers.length; layer += 2) primary(layer);
    for (const ref of all) f.observe(ref, pick(TONES), span());
    for (let layer = 2; layer < layers.length; layer += 2) primary(layer);
    // Diamonds: a second observed parent one or two layers up.
    for (let layer = 1; layer < layers.length; layer++) {
      for (const child of layers[layer]) {
        if (random() < 0.3) f.nest(pick(layers[Math.max(0, layer - 1 - Math.floor(random() * 2))]), child, nesting());
      }
    }
    // Unobserved endpoints: leaves and intermediates referenced only by edges.
    for (const ghost of ghosts.slice(0, 6)) f.nest(pick(all), ghost, nesting());
    for (const ghost of ghosts.slice(6)) {
      const layer = 1 + Math.floor(random() * (layers.length - 2));
      f.nest(pick(layers[layer - 1]), ghost, "grouping");
      f.nest(ghost, pick(layers[layer + 1]), "grouping");
    }
    // Edges that must never count.
    for (let i = 0; i < 300; i++) f.link(pick(all), pick(all), pick<RelationKind>(["dependency", "causation", "hypothesis"]));
    expect(verifyAll(f.view, alice)).toBe(all.length);
    let checks = 1;
    for (let round = 0; round < 6; round++) {
      for (let i = 0; i < 150; i++) f.observe(pick(all), pick(TONES), span());
      for (let i = 0; i < 40; i++) f.snapshot(pick(all), pick(TONES), span());
      for (let i = 0; i < 20; i++) f.view.markStale({ scope: alice, ref: pick(all) });
      if (round === 1) f.view.disconnect("forge");
      if (round === 2) f.view.reconnect("forge");
      if (round === 3) {
        f.view.disconnect("furnace");
        for (let i = 0; i < 20; i++) f.snapshot(pick(all), pick(TONES), span());
      }
      if (round === 4) f.view.reconnect("furnace");
      if (round === 2 || round === 4) for (const ghost of ghosts.slice(round === 2 ? 0 : 6, round === 2 ? 3 : 9)) f.observe(ghost, pick(TONES), span());
      verifyAll(f.view, alice);
      checks++;
      // Downward edges keep the hierarchy acyclic until the last round closes real cycles.
      for (let i = 0; i < 30; i++) {
        const from = Math.floor(random() * (layers.length - 1));
        const to = Math.min(layers.length - 1, from + 1 + Math.floor(random() * 3));
        f.nest(pick(layers[from]), pick(layers[to]), nesting());
      }
      for (let i = 0; i < 30; i++) f.link(pick(all), pick(all), pick<RelationKind>(["dependency", "causation", "hypothesis"]));
      if (round === 5) {
        // Real cycles back up the primary chain: lengths 8, 5 and 11 (longer than the cap).
        for (const [layer, levels] of [[9, 7], [6, 5], [10, 10]] as const) {
          const deep = pick(layers[layer]);
          f.nest(deep, ancestorOf(deep, levels), levels === 10 ? "ownership" : "grouping");
        }
      }
      verifyAll(f.view, alice);
      checks++;
    }
    expect(checks).toBe(13);
    for (let i = 0; i < 100; i++) f.observe(pick(all), pick(TONES), span());
    verifyAll(f.view, alice);
    const stats = f.view.aggregateStats();
    expect(stats.adjustments).toBeGreaterThan(0);
    expect(stats.rebuilds).toBeGreaterThan(0);
  }, 120_000);

  it("A2: dependency, causation and hypothesis edges never count; only grouping/ownership change an aggregate", () => {
    const f = new Fixture(alice);
    const refs = Array.from({ length: 8 }, (_, i) => op("forge", `n${i}`));
    for (const ref of refs) f.observe(ref, "active", { startedAt: stamp(1) });
    const kinds: RelationKind[] = ["dependency", "causation", "hypothesis"];
    for (let i = 0; i < refs.length; i++) {
      for (let j = 0; j < refs.length; j++) if (i !== j) f.link(refs[i], refs[j], kinds[(i + j) % 3]);
    }
    const stats = f.view.aggregateStats();
    for (const ref of refs) {
      const value = f.aggregate(ref);
      expect(value.direct.children).toBe(0);
      expect(value.descendants.counted).toBe(0);
      expect(value.trace).toBe("bounded");
    }
    for (const ref of refs.slice(0, 4)) f.observe(ref, "failure", { startedAt: stamp(2), endedAt: stamp(3) });
    expect(f.view.aggregateStats()).toStrictEqual(stats);
    verifyAll(f.view, alice);
    const [parent, child] = refs;
    const before = f.aggregate(parent);
    f.nest(parent, child, "grouping");
    const grouped = f.aggregate(parent);
    expect(grouped.direct.children).toBe(before.direct.children + 1);
    expect(grouped.descendants.counted).toBe(before.descendants.counted + 1);
    const afterGrouping = f.view.aggregateStats();
    f.link(parent, child, "hypothesis");
    expect(shape(f.aggregate(parent))).toStrictEqual(shape(grouped));
    expect(f.view.aggregateStats()).toStrictEqual(afterGrouping);
    verifyAll(f.view, alice);
  });

  it("A3: a leaf flip adjusts each ancestor within 8 levels once and leaves the 9th and 10th untouched", () => {
    // Top-down construction attaches each key as a fresh leaf; bottom-up re-derives subtrees. Both must agree.
    for (const order of ["top-down", "bottom-up"] as const) {
      const f = new Fixture(alice);
      const ancestors = Array.from({ length: 10 }, (_, i) => op("furnace", `a${i + 1}`));
      const leaf = op("forge", "leaf");
      for (const ref of [...ancestors, leaf]) f.observe(ref, "active", { startedAt: stamp(1), endedAt: stamp(2) });
      const edges: [NativeRef, NativeRef][] = [[ancestors[0], leaf], ...ancestors.slice(1).map((ref, i): [NativeRef, NativeRef] => [ref, ancestors[i]])];
      for (const [from, to] of order === "bottom-up" ? edges : [...edges].reverse()) f.nest(from, to);
      const before = ancestors.map((ref) => f.aggregate(ref));
      const stats = f.view.aggregateStats();
      f.observe(leaf, "success");
      const after = ancestors.map((ref) => f.aggregate(ref));
      const flipped = f.view.aggregateStats();
      expect(flipped.adjustments - stats.adjustments, order).toBe(8);
      expect(flipped.maxVisitedPerUpdate).toBeLessThanOrEqual(8);
      expect(flipped.rebuilds).toBe(stats.rebuilds);
      for (let level = 0; level < 8; level++) {
        expect(after[level].descendants.byTone.success).toBe(before[level].descendants.byTone.success + 1);
        expect(after[level].descendants.byTone.active).toBe(before[level].descendants.byTone.active - 1);
        expect(after[level].direct.settled).toBe(before[level].direct.settled + (level === 0 ? 1 : 0));
        expect(after[level].direct.byTone.success).toBe(before[level].direct.byTone.success + (level === 0 ? 1 : 0));
      }
      for (const level of [8, 9]) {
        expect(shape(after[level]), `${order} level ${level + 1}`).toStrictEqual(shape(before[level]));
        expect(after[level].descendants).toMatchObject({ truncated: true, depthReached: 8, counted: 8 });
        expect(after[level].trace).toBe("incomplete");
      }
      expect(after[7].descendants).toMatchObject({ truncated: false, depthReached: 8, counted: 8 });
      expect(after[7].trace).toBe("bounded");
      expect(after[0].descendants).toMatchObject({ truncated: false, depthReached: 1, counted: 1 });
      verifyAll(f.view, alice);
    }
  });

  it("A4: cycles and diamonds terminate with set semantics; parallel nesting edges count a child once", () => {
    const f = new Fixture(alice);
    const [a, b, c] = ["a", "b", "c"].map((id) => op("forge", id));
    for (const ref of [a, b, c]) f.observe(ref, "active");
    f.nest(a, b);
    f.nest(b, a);
    for (const ref of [a, b]) {
      const value = f.aggregate(ref);
      expect(value.descendants.counted).toBe(1);
      expect(value.direct.children).toBe(1);
      expect(value.descendants.depthReached).toBeLessThanOrEqual(8);
      expect(value.descendants.truncated).toBe(false);
    }
    f.nest(b, c);
    f.nest(c, a, "ownership");
    for (const ref of [a, b, c]) expect(f.aggregate(ref).descendants.counted).toBe(2);
    f.nest(c, c);
    expect(f.aggregate(c).descendants.counted).toBe(2);
    verifyAll(f.view, alice);
    const [p, x, y, z] = ["p", "x", "y", "z"].map((id) => op("furnace", id));
    for (const ref of [p, x, y, z]) f.observe(ref, "waiting");
    f.nest(p, x, "ownership");
    f.nest(p, y);
    f.nest(x, z);
    f.nest(y, z, "ownership");
    expect(f.aggregate(p).descendants).toMatchObject({ counted: 3, depthReached: 2, truncated: false });
    expect(f.aggregate(p).direct.children).toBe(2);
    const beforeParallel = f.view.aggregateStats();
    const nestedOnce = f.aggregate(p);
    f.nest(p, x, "grouping");
    expect(f.view.aggregateStats()).toStrictEqual(beforeParallel);
    expect(shape(f.aggregate(p))).toStrictEqual(shape(nestedOnce));
    f.nest(p, z);
    expect(f.aggregate(p).descendants.counted).toBe(3);
    expect(f.aggregate(p).direct.children).toBe(3);
    const stats = f.view.aggregateStats();
    f.observe(z, "success");
    const updated = f.view.aggregateStats();
    expect(updated.adjustments - stats.adjustments).toBe(3);
    expect(f.aggregate(p).descendants.byTone.success).toBe(1);
    expect(f.aggregate(p).direct.settled).toBe(1);
    verifyAll(f.view, alice);
  });

  it("A5: FIFO node and edge eviction subtract back to the brute-force value and stats() keeps its shape", () => {
    const f = new Fixture(alice, { maxNodes: 4, maxEdges: 3 });
    const [c1, p, c2, c3, extra] = ["c1", "p", "c2", "c3", "extra"].map((id) => op("forge", id));
    for (const ref of [c1, p, c2, c3]) f.observe(ref, "success", { startedAt: stamp(1), endedAt: stamp(2) });
    f.nest(p, c1);
    f.nest(p, c2);
    f.nest(p, c3, "ownership");
    expect(f.aggregate(p).descendants.counted).toBe(3);
    verifyAll(f.view, alice);
    f.observe(extra, "active");
    expect(f.view.query({ scope: alice, ref: c1, limit: 1 }).nodes).toHaveLength(0);
    expect(f.aggregate(p).descendants.counted).toBe(2);
    expect(f.aggregate(p).direct.settled).toBe(2);
    verifyAll(f.view, alice);
    f.nest(p, extra);
    f.link(c2, c3, "dependency");
    expect(f.aggregate(p).descendants.counted).toBe(2);
    expect(f.aggregate(p).descendants.byTone).toMatchObject({ success: 1, active: 1 });
    verifyAll(f.view, alice);
    expect(Object.keys(f.view.stats()).sort()).toStrictEqual(["edges", "events", "nodes"]);
    expect(f.view.stats()).toStrictEqual({ nodes: 4, events: 5, edges: 3 });

    // Evicting the only key nine levels down clears the 9th ancestor's truncation.
    const chain = new Fixture(alice, { maxNodes: 11 });
    const deepest = op("forge", "deepest");
    const links = Array.from({ length: 10 }, (_, i) => op("furnace", `c${i + 1}`));
    for (const ref of [deepest, ...links]) chain.observe(ref, "success", { startedAt: stamp(1), endedAt: stamp(2) });
    chain.nest(links[0], deepest);
    for (let i = 1; i < links.length; i++) chain.nest(links[i], links[i - 1]);
    expect(chain.aggregate(links[8]).descendants).toMatchObject({ counted: 8, truncated: true });
    expect(chain.aggregate(links[8]).trace).toBe("incomplete");
    chain.observe(op("forge", "newcomer"), "active");
    expect(chain.view.query({ scope: alice, ref: deepest, limit: 1 }).nodes).toHaveLength(0);
    expect(chain.aggregate(links[8]).descendants).toMatchObject({ counted: 8, truncated: false, depthReached: 8 });
    expect(chain.aggregate(links[8]).trace).toBe("bounded");
    expect(chain.aggregate(links[7]).descendants).toMatchObject({ counted: 7, truncated: false, depthReached: 7 });
    verifyAll(chain.view, alice);

    // Evicting one of two parallel nesting edges keeps the child; the second removal drops it.
    const parallel = new Fixture(alice, { maxEdges: 3 });
    const [owner, owned, side] = ["owner", "owned", "side"].map((id) => op("furnace", id));
    for (const ref of [owner, owned, side]) parallel.observe(ref, "failure");
    parallel.nest(owner, owned, "grouping");
    parallel.nest(owner, owned, "ownership");
    parallel.link(owned, side, "causation");
    parallel.link(side, owned, "dependency");
    expect(parallel.view.relations({ scope: alice, from: parallel.key(owner) }).map((edge) => edge.kind)).toStrictEqual(["ownership"]);
    expect(parallel.aggregate(owner).direct).toMatchObject({ children: 1, settled: 1 });
    verifyAll(parallel.view, alice);
    parallel.link(side, owner, "hypothesis");
    expect(parallel.view.relations({ scope: alice, from: parallel.key(owner) })).toHaveLength(0);
    expect(parallel.aggregate(owner).direct.children).toBe(0);
    verifyAll(parallel.view, alice);

    // A parent evicted with its edges and observed again starts with no descendants, not its old roll-up.
    const reborn = new Fixture(alice, { maxNodes: 3 });
    const [elder, kid1, kid2, late] = ["elder", "kid1", "kid2", "late"].map((id) => op("forge", id));
    for (const ref of [elder, kid1, kid2]) reborn.observe(ref, "success");
    reborn.nest(elder, kid1);
    reborn.nest(elder, kid2);
    expect(reborn.aggregate(elder).descendants.counted).toBe(2);
    reborn.observe(late, "active");
    reborn.observe(elder, "active");
    expect(reborn.aggregate(elder).descendants.counted).toBe(0);
    expect(reborn.aggregate(elder).direct.children).toBe(0);
    verifyAll(reborn.view, alice);

    const random = seeded(7);
    const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
    const churn = new Fixture(alice, { maxNodes: 40, maxEdges: 60 });
    const pool: NativeRef[] = [];
    let created = 0;
    for (let step = 0; step < 400; step++) {
      const roll = random();
      if (roll < 0.35 || pool.length < 4) {
        const ref = op(pick(["forge", "furnace"]), `n${created++}`);
        pool.push(ref);
        churn.observe(ref, pick(TONES), random() < 0.5 ? { startedAt: stamp(step) } : undefined);
      } else if (roll < 0.75) {
        const recent = pool.slice(-60);
        churn.link(pick(recent), pick(recent), pick<RelationKind>(["grouping", "ownership", "grouping", "dependency", "hypothesis"]));
      } else {
        const live = pool.slice(-40);
        churn.observe(pick(live), pick(TONES), random() < 0.3 ? { startedAt: stamp(step), endedAt: stamp(step + 1) } : undefined);
      }
      if (step < 120 || step % 10 === 0) verifyAll(churn.view, alice);
    }
    expect(churn.view.stats().nodes).toBe(40);
    expect(churn.view.aggregateStats().rebuilds).toBeGreaterThan(0);
    verifyAll(churn.view, alice);
  });

  it("A6: intervals are measured source intervals only; open never fabricates an end; no critical-path number", () => {
    const f = new Fixture(alice);
    const [root, mid, done, late, running, untimed] = ["root", "mid", "done", "late", "running", "untimed"].map((id) => op("furnace", id));
    f.snapshot(root, "active", { startedAt: stamp(0) });
    f.snapshot(mid, "active");
    f.snapshot(done, "success", { startedAt: stamp(10), endedAt: stamp(50) });
    f.snapshot(late, "failure", { startedAt: stamp(20, 1), endedAt: stamp(90, 2) });
    f.snapshot(running, "active", { startedAt: stamp(5, 2) });
    f.snapshot(untimed, "waiting");
    f.nest(root, mid, "ownership");
    f.nest(root, done, "ownership");
    f.nest(mid, late);
    f.nest(mid, running);
    f.nest(mid, untimed);
    const first = f.aggregate(root);
    expect(first.intervals).toStrictEqual({ known: 2, open: 1, missing: 2, earliestStartedAt: stamp(5, 2) });
    expect(first.intervals.latestEndedAt).toBeUndefined();
    expect(first.trace).toBe("incomplete");
    expect(first.criticalPath).toBe("unestablished");
    f.snapshot(running, "success", { startedAt: stamp(5, 2), endedAt: stamp(70) });
    f.snapshot(untimed, "success", { startedAt: stamp(30), endedAt: stamp(40) });
    f.snapshot(mid, "success", { startedAt: stamp(4), endedAt: stamp(95, 1) });
    const closed = f.aggregate(root);
    expect(closed.intervals).toStrictEqual({ known: 5, open: 0, missing: 0, earliestStartedAt: stamp(4), latestEndedAt: stamp(95, 1) });
    expect(closed.trace).toBe("bounded");
    // Equal instants in different spellings resolve to the lexicographically smallest source string.
    f.snapshot(done, "success", { startedAt: stamp(4, 1), endedAt: stamp(95, 2) });
    expect(f.aggregate(root).intervals).toMatchObject({ earliestStartedAt: stamp(4), latestEndedAt: stamp(95, 2) });
    f.snapshot(done, "success");
    expect(f.aggregate(root).intervals).toStrictEqual({ known: 4, open: 0, missing: 1, earliestStartedAt: stamp(4), latestEndedAt: stamp(95, 1) });
    expect(f.aggregate(root).trace).toBe("incomplete");
    verifyAll(f.view, alice);
    const text = JSON.stringify(f.aggregate(root));
    expect(text).not.toMatch(/token|cost|estimat/i);
    for (const [path, value] of fields(JSON.parse(text))) if (/critical/i.test(path)) expect(value).toBe("unestablished");
    const copy = f.aggregate(root);
    copy.descendants.byTone.success = 999;
    copy.intervals.known = 999;
    expect(f.aggregate(root).descendants.byTone.success).not.toBe(999);
    expect(f.aggregate(root).intervals.known).toBe(4);
  });

  it("A7: disconnect raises stale to the non-current descendants, reconnect alone keeps it, a snapshot lowers it", () => {
    const f = new Fixture(alice);
    const run = op("furnace", "run", "run");
    const attempts = Array.from({ length: 4 }, (_, i) => op("furnace", `attempt-${i}`, "attempt"));
    const build = op("forge", "build");
    for (const ref of [run, ...attempts, build]) f.snapshot(ref, "active");
    for (const attempt of attempts) f.nest(run, attempt, "ownership");
    f.nest(run, build);
    expect(f.aggregate(run).descendants.stale).toBe(0);
    f.view.disconnect("furnace");
    expect(f.aggregate(run).descendants.stale).toBe(4);
    verifyAll(f.view, alice);
    const disconnected = f.aggregate(run);
    f.view.reconnect("furnace");
    expect(shape(f.aggregate(run))).toStrictEqual(shape(disconnected));
    f.snapshot(attempts[0], "success");
    expect(f.aggregate(run).descendants.stale).toBe(3);
    f.view.markStale({ scope: alice, ref: build });
    expect(f.aggregate(run).descendants.stale).toBe(4);
    verifyAll(f.view, alice);
  });

  it("A8: 100,000 status ingests over a 2,000-node 5-level tree visit only their ancestors and never rebuild", () => {
    const receipt: Record<string, number> = {};
    // The 2,000-node tree takes the full 100,000 ingests; the 200-node tree is the timing comparison point.
    for (const [size, ingests] of [
      [200, 20_000],
      [2_000, 100_000],
    ] as const) {
      const f = new Fixture(alice);
      let branching = 1;
      while (1 + branching + branching ** 2 + branching ** 3 + branching ** 4 < size) branching++;
      const parent = (i: number): number => Math.floor((i - 1) / branching);
      const depthOf = (i: number): number => (i === 0 ? 0 : 1 + depthOf(parent(i)));
      const refs = Array.from({ length: size }, (_, i) => op(i % 2 ? "forge" : "furnace", `t${i}`));
      for (const ref of refs) f.observe(ref, "active");
      for (let i = 1; i < size; i++) f.nest(refs[parent(i)], refs[i], i % 3 ? "grouping" : "ownership");
      expect(depthOf(size - 1)).toBe(4);
      const depthSum = refs.reduce((sum, _, i) => sum + depthOf(i), 0);
      // Every ingest moves its node to the next tone, so every one of them must walk its ancestors.
      const toneIndex = new Array<number>(size).fill(0);
      const next = (i: number): Tone => {
        toneIndex[i] = (toneIndex[i] + 1) % 4;
        return TONES[toneIndex[i]];
      };
      const settled = f.view.aggregateStats();
      let refused = 0;
      for (let k = 0; k < ingests; k++) {
        const i = (k * 7919) % size;
        if (f.view.ingest(f.event(refs[i], next(i))) !== "applied") refused++;
      }
      expect(refused).toBe(0);
      const after = f.view.aggregateStats();
      expect(after.maxVisitedPerUpdate).toBeLessThanOrEqual(8);
      expect(after.maxVisitedPerUpdate).toBe(4);
      expect(after.rebuilds).toBe(settled.rebuilds);
      expect(after.adjustments - settled.adjustments).toBe((ingests / size) * depthSum);
      // Timed separately: events are built before the clock starts and outcomes are checked after it stops.
      const samples: number[] = [];
      const outcomes: string[] = [];
      for (let k = 0; k < 10_000; k++) {
        const i = (k * 104729) % size;
        const event = f.event(refs[i], next(i));
        const begin = performance.now();
        outcomes.push(f.view.ingest(event));
        samples.push(performance.now() - begin);
      }
      expect(outcomes.every((outcome) => outcome === "applied")).toBe(true);
      expect(f.view.aggregateStats().rebuilds).toBe(settled.rebuilds);
      samples.sort((x, y) => x - y);
      receipt[`ingests${size}`] = ingests;
      receipt[`median${size}Ms`] = samples[Math.floor(samples.length / 2)];
      receipt[`p95${size}Ms`] = samples[Math.floor(samples.length * 0.95)];
      receipt[`maxVisited${size}`] = f.view.aggregateStats().maxVisitedPerUpdate;
      receipt[`topologyRebuilds${size}`] = settled.rebuilds;
      expect(verifyAll(f.view, alice)).toBe(size);
    }
    console.log(JSON.stringify({ benchmark: "observation-aggregates-status-ingest", timedIngestsPerTree: 10_000, ...receipt, node: process.version, arch: process.arch }));
  }, 120_000);

  it("A9: a key from another workspace or principal resolves to nothing and does no work", () => {
    const f = new Fixture(alice);
    const g = new Fixture(bob);
    const other = new Fixture(elsewhere);
    const [parent, child, second] = ["parent", "child", "second"].map((id) => op("forge", id));
    for (const fixture of [f, g, other]) for (const ref of [parent, child, second]) fixture.observe(ref, "active");
    f.nest(parent, child);
    const shared = new ObservationProjection({ maxQuery: PAGE });
    const make = (scope: ObservationScope, ref: NativeRef): void => {
      shared.refresh({ source: ref, scope, capturedAt: stamp(1), observedAt: stamp(1), node: present("active"), trace: { invocationId: INVOCATION } });
    };
    for (const scope of [alice, bob, elsewhere]) for (const ref of [parent, child, second]) make(scope, ref);
    shared.relate({ scope: alice, from: parent, to: child, kind: "grouping", provenance: { source: "trace" } });
    shared.relate({ scope: bob, from: parent, to: child, kind: "grouping", provenance: { source: "trace" } });
    shared.relate({ scope: bob, from: parent, to: second, kind: "grouping", provenance: { source: "trace" } });
    const aliceKey = shared.query({ scope: alice, ref: parent, limit: 1 }).nodes[0].key;
    const bobKey = shared.query({ scope: bob, ref: parent, limit: 1 }).nodes[0].key;
    expect(shared.aggregate({ scope: alice, key: aliceKey })?.descendants.counted).toBe(1);
    expect(shared.aggregate({ scope: bob, key: bobKey })?.descendants.counted).toBe(2);
    const stats = shared.aggregateStats();
    expect(shared.aggregate({ scope: bob, key: aliceKey })).toBeUndefined();
    expect(shared.aggregate({ scope: elsewhere, key: aliceKey })).toBeUndefined();
    expect(shared.aggregate({ scope: alice, key: bobKey })).toBeUndefined();
    expect(shared.aggregate({ scope: alice, key: "not-a-projection-key" })).toBeUndefined();
    expect(shared.aggregateStats()).toStrictEqual(stats);
    verifyAll(shared, alice);
    verifyAll(shared, bob);
    verifyAll(shared, elsewhere);
    expect(f.aggregate(parent).descendants.counted).toBe(1);
    expect(g.aggregate(parent).descendants.counted).toBe(0);
  });
});

describe("aggregates over the first real producer of native-confirmed ownership (wb-752.1 FurnaceObserver)", () => {
  it("rolls up Run->Attempt ownership by measured counts and source instants, not by string order", async () => {
    const workspace = "/tmp/external-ws";
    const runId = "frn-run-r1";
    const run = {run_id:runId,beads_run_id:"bd-r1",workspace,state:"active",mode:"ephemeral_wisp",furnace_version:"0.1.0",binary_revision:"rev-abc",
      created_at:"2026-10-15T00:00:00Z",updated_at:"2026-10-15T00:00:01Z",state_since:"2026-10-15T00:00:01Z",executor:"runner",max_parallel:2,
      active:[],failed:[],failed_total:0,attention:[],unreadable:[],corrupt_events:[],corrupt_events_total:0,conflicts:[],completed:1,total:3};
    // The offset-qualified start is the earliest instant although it sorts last as a string.
    const attempts = [
      {attempt_id:"frn-atm-a1",run_id:runId,work_id:"bd-work-a",ordinal:1,executor:"runner",state:"succeeded",outcome:"success",
        created_at:"2026-10-15T00:00:01Z",started_at:"2026-10-15T02:00:01+02:00",finished_at:"2026-10-15T00:00:03Z",exit_code:0},
      {attempt_id:"frn-atm-a2",run_id:runId,work_id:"bd-work-b",ordinal:1,executor:"runner",state:"pending",created_at:"2026-10-15T00:00:02Z"},
      {attempt_id:"frn-atm-a3",run_id:runId,work_id:"bd-work-c",ordinal:1,executor:"runner",state:"running",created_at:"2026-10-15T00:00:03Z",started_at:"2026-10-15T00:00:04Z"},
    ];
    const exit = {code:0,signal:null};
    const client = {
      runs:{get:() => ({status:async () => ({kind:"run_status",requestId:"req-status",exit,data:run})})},
      attempts:{list:async () => ({kind:"attempt_list",requestId:"req-attempts",exit,data:{run_id:runId,beads_run_id:"bd-r1",complete:true,limit:5,returned:attempts.length,next_cursor:null,attempts,unreadable:[]}})},
      logs:{read:async (_run:string,request?:{attempt?:string}) => ({kind:"logs_read",requestId:"req-logs",exit,
        data:{run_id:runId,attempt_id:request?.attempt,stream:"stdout",complete:true,limit:512,returned:0,next_cursor:null,lossy:false,lines:[]}})},
    } as unknown as FurnaceObserverClient;
    const scope = {workspace,principal:"tester"};
    const observer = new FurnaceObserver(client,{workspaceRoot:workspace,runId,scope,limits:{maxPolls:1,intervalMs:1,maxElapsedMs:5000,attemptLimit:5,logBytes:512,callTimeoutMs:2000}});
    const topology = observer.projectionTopology(await observer.snapshot());
    observer.close();
    expect(topology.relations.every((relation) => relation.kind === "ownership")).toBe(true);
    const view = new ObservationProjection({maxQuery:PAGE});
    for (const snapshot of topology.snapshots) expect(view.refresh(snapshot)).toBe("applied");
    for (const relation of topology.relations) view.relate(relation);
    const key = view.query({scope,ref:{provider:"furnace",type:"run",id:runId,scope:workspace},limit:1}).nodes[0].key;
    const value = view.aggregate({scope,key});
    expect(value?.direct).toStrictEqual({children:3,settled:1,byTone:{active:1,success:1,failure:0,waiting:1,unknown:0}});
    expect(value?.descendants).toMatchObject({counted:3,stale:0,depthReached:1,truncated:false});
    expect(value?.intervals).toStrictEqual({known:1,open:1,missing:1,earliestStartedAt:"2026-10-15T02:00:01+02:00"});
    expect(value?.trace).toBe("incomplete");
    expect(value?.criticalPath).toBe("unestablished");
    // Work ids stay correlation ids: no Attempt gains an invented child.
    for (const relation of topology.relations) {
      const attempt = view.query({scope,ref:relation.to,limit:1}).nodes[0];
      expect(view.aggregate({scope,key:attempt.key})?.descendants.counted).toBe(0);
    }
    verifyAll(view,scope);
  });
});
