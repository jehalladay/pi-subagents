/**
 * wb-6ze.29 (W14/W15/VC-5): buildTimelineLanes adopts ObservationProjection.relationsPage. A row's incoming page marks
 * truncated.relations, with the 'relation-page-full' note, when the reader reports it truncated OR it holds relationLimit
 * rows: a superset of the size rule, never less conservative. Lane assignment still uses only the rows read. A reader
 * without relationsPage (a producer stand-in) gets the pre-adoption model byte for byte. Rows B1 and B4-B6 quote the
 * bead's acceptance criteria; the attention rows are in test/workbench-attention-relations-page.test.ts. Seeded fixtures
 * only: a fixed seed, no host clock and no host randomness in the measured path.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  type Interval, type NativeRef, type NativeSnapshot, type ObservationLimits, ObservationProjection, type ObservationScope, type Relation,
} from "../src/workbench/observation.js";
import { buildTimelineLanes, TIMELINE_CONTRACT, type TimelineModel, type TimelineReader, type TimelineRequest } from "../src/workbench/timeline.js";

afterEach(() => {
  vi.restoreAllMocks();
});

const scope: ObservationScope = { workspace: "ws-timeline-pages", principal: "operator" };
const INVOCATION = "inv-timeline-pages";
const ROOT = "/work/furnace-root";
const pad = (value: number): string => String(value).padStart(2, "0");
/** A zone-qualified instant `seconds` after 2026-10-18T07:00:00Z. */
const at = (seconds: number): string =>
  `2026-10-18T${pad(7 + Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}Z`;
/** ObservationProjection's provider-qualified key layout for a reference in this suite's scope. */
const keyOf = (ref: NativeRef): string => JSON.stringify([scope.workspace, scope.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
/** The frozen note vocabulary, in its stated order. */
const NOTES = [
  "clocks-may-differ", "open-intervals-present", "intervals-missing", "stale-rows-present", "window-partial", "relation-page-full",
  "multiple-parents", "rows-outside-viewport", "phase-kinds-unavailable",
];

interface Observed { ref: NativeRef; title: string; tone?: "active" | "success"; interval?: Interval; invocationId?: string | null }
function observe(projection: ObservationProjection, item: Observed): void {
  const snapshot: NativeSnapshot = {
    source: item.ref, scope, capturedAt: at(30), observedAt: at(30), kind: "fixture.snapshot",
    node: { title: item.title, type: "sdk-operation", statusText: "running", statusTone: item.tone ?? "active" },
    ...(item.invocationId === null ? {} : { trace: { invocationId: item.invocationId ?? INVOCATION } }),
    ...(item.interval ? { interval: item.interval } : {}),
  };
  expect(projection.refresh(snapshot)).toBe("applied");
}
/** Ownership is stated by the owner's own provider with a native confirmation, as ObservationProjection.relate requires;
 * other kinds name their statement, so a distinct statement is a parallel edge. */
function relate(projection: ObservationProjection, from: NativeRef, to: NativeRef, kind: Relation["kind"], statement: string): void {
  const source = kind === "ownership" ? from.provider : statement;
  projection.relate({ scope, from, to, kind, provenance: { source, observedAt: at(30), ...(kind === "ownership" ? { nativeConfirmationRef: statement } : {}) } });
}
const request = (overrides: Partial<TimelineRequest> = {}): TimelineRequest =>
  ({ scope, invocationId: INVOCATION, offset: 0, limit: 100, zoom: 1, pan: 0, columns: 40, ...overrides });
const noteCodes = (model: TimelineModel): string[] => model.notes.map(note => note.code);
/** The same projection with relationsPage hidden: the reader shape of a producer stand-in (the a937f53 loose stand-in). */
const legacyOf = (projection: ObservationProjection): TimelineReader => ({
  window: filter => projection.window(filter),
  relations: input => projection.relations(input),
  relationRevision: () => projection.relationRevision(),
});
/** Every model field but the relation-page flag and its note, which are the only fields the adoption may change. */
const besidesRelationFlag = (model: TimelineModel) => ({
  ...model, truncated: { ...model.truncated, relations: null }, notes: model.notes.filter(note => note.code !== "relation-page-full"),
});

const attempt: NativeRef = { provider: "furnace", type: "attempt", id: "att-1", scope: ROOT };
const owner = (id: string): NativeRef => ({ provider: "furnace", type: "run", id, scope: ROOT });
/** One Attempt row with three furnace-confirmed owners; the smallest owner key is stated last, so a page cut at two rows
 * hides it and the lane follows the smaller of the two owners read. */
function ownedThrice(limits: ObservationLimits = {}): ObservationProjection {
  const projection = new ObservationProjection(limits);
  observe(projection, { ref: attempt, title: "Furnace Attempt att-1", tone: "success", interval: { startedAt: at(0), endedAt: at(4) } });
  for (const id of ["run-c", "run-b", "run-a"]) relate(projection, owner(id), attempt, "ownership", `furnace-attempts-${id}`);
  return projection;
}

describe('B1 docs/workbench/10 § Four views (Timeline): "note uncertain clocks or event gaps" and § Failure and deception defenses: "Historical reads with limited retention show missing details honestly."', () => {
  it("a maxQuery-2 projection holding 3 incoming ownership edges to one Attempt, read at relationLimit 40, flags the cut page", () => {
    const capped = ownedThrice({ maxQuery: 2 });
    expect(capped.relationsPage({ scope, to: keyOf(attempt), limit: 40 })).toMatchObject({ truncated: true, limitApplied: 2 });
    const model = buildTimelineLanes(capped, request({ relationLimit: 40 }));
    expect(model.truncated.relations).toBe(true);
    expect(noteCodes(model)).toContain("relation-page-full");
    // The lane follows only the rows read: run-c and run-b, so the smaller of those two owners, never the hidden run-a.
    expect(model.lanes.map(lane => [lane.key, lane.basis, lane.rows.map(row => row.key)])).toEqual([[keyOf(owner("run-b")), "ownership", [keyOf(attempt)]]]);
    expect(noteCodes(model)).toEqual(["relation-page-full", "multiple-parents", "phase-kinds-unavailable"]);
  });

  it("the same projection at the default limits reads the whole page: no flag, no note, and the lane of the smallest owner", () => {
    const model = buildTimelineLanes(ownedThrice(), request({ relationLimit: 40 }));
    expect(model.truncated.relations).toBe(false);
    expect(noteCodes(model)).not.toContain("relation-page-full");
    expect(model.lanes.map(lane => lane.key)).toEqual([keyOf(owner("run-a"))]);
  });

  it("without relationsPage the same cut is invisible to the size rule, which is why the reader's report is adopted", () => {
    const model = buildTimelineLanes(legacyOf(ownedThrice({ maxQuery: 2 })), request({ relationLimit: 40 }));
    expect(model.truncated.relations).toBe(false);
    expect(noteCodes(model)).not.toContain("relation-page-full");
    expect(model.lanes.map(lane => lane.key)).toEqual([keyOf(owner("run-b"))]);
  });

  it("an exactly-relationLimit page the reader reports whole still flags: the size half of the rule stays", () => {
    const projection = ownedThrice();
    expect(projection.relationsPage({ scope, to: keyOf(attempt), limit: 3 })).toMatchObject({ truncated: false, limitApplied: 3 });
    expect(projection.relations({ scope, to: keyOf(attempt), limit: 3 })).toHaveLength(3);
    const model = buildTimelineLanes(projection, request({ relationLimit: 3 }));
    expect(model.truncated.relations).toBe(true);
    expect(noteCodes(model)).toContain("relation-page-full");
    expect(buildTimelineLanes(projection, request({ relationLimit: 4 })).truncated.relations).toBe(false);
  });

  it("reads one relationsPage per row with the request's relationLimit and no relations() call", () => {
    const projection = ownedThrice({ maxQuery: 2 });
    const relations = vi.spyOn(projection, "relations");
    const pages = vi.spyOn(projection, "relationsPage");
    buildTimelineLanes(projection, request({ relationLimit: 40 }));
    expect(pages.mock.calls.map(([input]) => input)).toStrictEqual([{ scope, to: keyOf(attempt), limit: 40 }]);
    expect(relations).not.toHaveBeenCalled();
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
interface Seeded { projection: ObservationProjection; incoming: Map<string, number>; relationLimit: number; limit: number }
function seeded(seed: number, maxQuery: number): Seeded {
  const random = prng(seed);
  const pick = (n: number): number => Math.floor(random() * n);
  const projection = new ObservationProjection({ maxQuery });
  const ops: NativeRef[] = Array.from({ length: 1 + pick(Math.min(maxQuery + 3, 30)) }, (_, i) => ({ provider: "forge", type: "operation", id: `op-${i}` }));
  for (const [i, ref] of ops.entries()) {
    observe(projection, { ref, title: `operation ${i}`, ...(random() < 0.9 ? { interval: { startedAt: at(i), endedAt: at(i + 1 + pick(9)) } } : {}) });
  }
  // Stored edges per target, mirroring ObservationProjection's edge identity (from, to, kind, source): a restated
  // ownership edge from the same owner is the same edge.
  const stored = new Set<string>();
  const incoming = new Map<string, number>();
  const edges = pick(ops.length * 6);
  for (let e = 0; e < edges; e++) {
    const to = ops[random() < 0.4 ? 0 : pick(ops.length)];
    const roll = random();
    const [from, kind]: [NativeRef, Relation["kind"]] =
      roll < 0.35 ? [{ provider: "furnace", type: "run", id: `run-${pick(8)}` }, "ownership"]
      : roll < 0.6 ? [{ provider: "pi-workflow", type: "phase", id: `phase-${pick(4)}` }, "grouping"]
      : roll < 0.8 ? [ops[pick(ops.length)], "dependency"]
      : roll < 0.92 ? [ops[pick(ops.length)], "causation"]
      : [{ provider: "forge", type: "operation", id: `outside-${pick(5)}` }, "hypothesis"];
    const statement = `${kind}-statement-${e}`;
    relate(projection, from, to, kind, statement);
    const id = JSON.stringify([keyOf(from), keyOf(to), kind, kind === "ownership" ? from.provider : statement]);
    if (stored.has(id)) continue;
    stored.add(id);
    incoming.set(keyOf(to), (incoming.get(keyOf(to)) ?? 0) + 1);
  }
  const relationLimit = [1, 2, 3, 5, 8, 40, 100][pick(7)];
  return { projection, incoming, relationLimit, limit: 1 + pick(100) };
}

describe('B4 docs/workbench/14 § Truth labels and release gates: "Each major work package must have a falsifier: a negative test that would fail if a critical guarantee was quietly weakened."', () => {
  it("flags exactly the rows whose page is truncated or holds relationLimit rows, a superset of the legacy flag, over 200 seeded projections at maxQuery 2, 5, 40 and 100", () => {
    const tally = { compared: 0, adoptedOnly: 0, both: 0, neither: 0, exactOnly: 0 };
    for (const maxQuery of [2, 5, 40, 100]) {
      for (let seed = 0; seed < 50; seed++) {
        const { projection, incoming, relationLimit, limit } = seeded(20_261_018 + maxQuery * 1_000 + seed, maxQuery);
        const timeline = request({ limit, relationLimit });
        const adopted = buildTimelineLanes(projection, timeline);
        const legacy = buildTimelineLanes(legacyOf(projection), timeline);
        // The independent model: the window's rows and the stored incoming edge count of each.
        const rows = projection.window({ scope, invocationId: INVOCATION, offset: 0, limit }).nodes.slice(0, limit).map(node => incoming.get(node.key) ?? 0);
        const cap = Math.min(relationLimit, maxQuery);
        const cut = rows.some(count => count > cap);
        const exact = rows.some(count => Math.min(count, cap) >= relationLimit);
        expect(adopted.truncated.relations).toBe(cut || exact);
        expect(legacy.truncated.relations).toBe(exact);
        for (const model of [adopted, legacy]) expect(noteCodes(model).includes("relation-page-full")).toBe(model.truncated.relations);
        if (legacy.truncated.relations) expect(adopted.truncated.relations).toBe(true);
        // Lanes, rows, bars, origin, span, concurrency and every other note are the legacy model's.
        expect(besidesRelationFlag(adopted)).toStrictEqual(besidesRelationFlag(legacy));
        tally.compared++;
        if (adopted.truncated.relations && !legacy.truncated.relations) tally.adoptedOnly++;
        if (adopted.truncated.relations && legacy.truncated.relations) tally.both++;
        if (!adopted.truncated.relations) tally.neither++;
        if (exact && !cut) tally.exactOnly++;
      }
    }
    // Non-vacuity: cut pages the size rule misses, exact pages only the size rule catches, and quiet models all occur.
    expect(tally.compared).toBe(200);
    for (const count of [tally.adoptedOnly, tally.both, tally.neither, tally.exactOnly]) expect(count).toBeGreaterThan(0);
  });
});

/** Fixture A of test/workbench-timeline.test.ts: a Run outside every window owning three Attempts through furnace-confirmed
 * ownership edges, two claude-agent-sdk sessions and one forge operation without an interval. */
function fixtureA(): ObservationProjection {
  const projection = new ObservationProjection();
  const runRef: NativeRef = { provider: "furnace", type: "run", id: "run-1", scope: ROOT };
  observe(projection, { ref: runRef, title: "Furnace Run run-1", invocationId: null });
  for (const [id, from, to] of [["att-1", 0, 4], ["att-2", 1, 3], ["att-3", 5, 6]] as const) {
    const ref: NativeRef = { provider: "furnace", type: "attempt", id, scope: ROOT };
    observe(projection, { ref, title: `Furnace Attempt ${id}`, tone: "success", interval: { startedAt: at(from), endedAt: at(to) } });
    relate(projection, runRef, ref, "ownership", "furnace-attempts-request-1");
  }
  observe(projection, { ref: { provider: "claude-agent-sdk", type: "session", id: "sess-1" }, title: "review the diff", tone: "success", interval: { startedAt: at(2), endedAt: at(7) } });
  observe(projection, { ref: { provider: "claude-agent-sdk", type: "session", id: "sess-2" }, title: "fix the parser", interval: { startedAt: at(8) } });
  observe(projection, { ref: { provider: "forge", type: "operation", id: "op-1" }, title: "forge gate", tone: "success" });
  return projection;
}
/** The acceptance-7 fixture of test/workbench-timeline.test.ts: 2,000 operations of ten events each, every one owned and
 * grouped, filled to the projection's default limits. */
function filledToDefaults(): ObservationProjection {
  const projection = new ObservationProjection();
  const operation = (i: number): NativeRef => ({ provider: "forge", type: "operation", id: `op-${i}` });
  for (let i = 0; i < 2_000; i++) {
    for (let e = 0; e < 10; e++) {
      projection.ingest({
        projectionEventId: `op-${i}-${e}`, source: operation(i), scope, sourceSequence: e + 1, observedAt: at(30), kind: "forge.operation",
        node: { presentation: { title: `operation ${i}`, type: "sdk-operation", statusText: "running", statusTone: "active" } },
        trace: { invocationId: "inv-big" }, interval: { startedAt: at(i), endedAt: at(i + 5) },
      });
    }
    relate(projection, { provider: "furnace", type: "run", id: i < 60 ? "run-0" : `run-${i}` }, operation(i), "ownership", `furnace-attempts-${i}`);
    relate(projection, { provider: "pi-workflow", type: "phase", id: `phase-${i % 7}` }, operation(i), "grouping", "grouping-statement");
  }
  expect(projection.stats()).toStrictEqual({ nodes: 2_000, events: 20_000, edges: 4_000 });
  return projection;
}

describe("B5 the legacy fallback is byte-identical: TimelineReader = Pick<ObservationProjection, 'window' | 'relations' | 'relationRevision'>", () => {
  it("builds fixture A from a reader without relationsPage through one relations() page per row, byte-identical to the adopted model", () => {
    const projection = fixtureA();
    const legacy = legacyOf(projection);
    expect("relationsPage" in legacy).toBe(false);
    const relations = vi.spyOn(projection, "relations");
    const pages = vi.spyOn(projection, "relationsPage");
    const fallback = buildTimelineLanes(legacy, request());
    expect(pages).not.toHaveBeenCalled();
    // One incoming page per window row (three Attempts, two sessions, the forge operation), at the default relationLimit.
    const rows = fallback.lanes.flatMap(lane => lane.rows.map(row => row.key));
    expect(rows).toHaveLength(6);
    expect(relations).toHaveBeenCalledTimes(rows.length);
    expect(new Set(relations.mock.calls.map(([input]) => input.to))).toEqual(new Set(rows));
    for (const [input] of relations.mock.calls) expect(input).toStrictEqual({ scope, to: input.to, limit: 40 });
    expect(JSON.stringify(fallback)).toBe(JSON.stringify(buildTimelineLanes(projection, request())));
  });

  it("builds the 1000-node acceptance-7 fixture from a reader without relationsPage byte-identical to the adopted model", () => {
    const projection = filledToDefaults();
    const big = { scope, invocationId: "inv-big", offset: 0, limit: 100, zoom: 1, pan: 0, columns: 80 };
    const relations = vi.spyOn(projection, "relations");
    const fallback = buildTimelineLanes(legacyOf(projection), big);
    expect(relations).toHaveBeenCalledTimes(100);
    expect(JSON.stringify(fallback)).toBe(JSON.stringify(buildTimelineLanes(projection, big)));
    expect(fallback.truncated).toStrictEqual({ lanes: true, rows: true, relations: false, window: true });
  }, 60_000);
});

describe('B6 docs/workbench/10 § Four views (Timeline): "relative interval lanes grouped by owner/phase/provider" -- the TimelineModel shape the renderers read is unchanged', () => {
  it("pins the contract string, the model, truncated, lane and row keys, and the frozen note vocabulary", () => {
    expect(TIMELINE_CONTRACT).toBe("workbench.timeline/v1");
    const models = [buildTimelineLanes(fixtureA(), request()), buildTimelineLanes(ownedThrice({ maxQuery: 2 }), request({ relationLimit: 40 }))];
    for (const model of models) {
      expect(Object.keys(model)).toEqual(["contract", "revision", "topologyRevision", "origin", "span", "lanes", "concurrency", "notes", "truncated"]);
      expect(Object.keys(model.truncated)).toEqual(["lanes", "rows", "relations", "window"]);
      for (const lane of model.lanes) {
        expect(Object.keys(lane)).toEqual(["key", "label", "basis", "confirmed", "rows"]);
        for (const row of lane.rows) expect(Object.keys(row)).toEqual(["key", "nativeRef", "title", "tone", "freshness", "timing", "bar"]);
      }
      const codes = noteCodes(model);
      expect(codes.length).toBeGreaterThan(0);
      expect(codes).toEqual(NOTES.filter(code => codes.includes(code)));
    }
  });
});
