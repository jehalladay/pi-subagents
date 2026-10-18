/** wb-6ze.6 (W15-B/VC-5): the pure timeline lane model over observed source intervals and native-confirmed ownership and
 * grouping edges. Each describe block quotes docs/workbench through the bead's acceptance criteria 1-7; inspector wiring is
 * out of scope, so every case reads a real ObservationProjection (or a producer stand-in over one) and nothing else. */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError } from "../src/workbench/capability-registry.js";
import {
  type Interval,
  type NativeRef,
  type NativeSnapshot,
  ObservationProjection,
  type ObservationScope,
  type ObservedNode,
  type Presentation,
  type Relation,
} from "../src/workbench/observation.js";
import {
  buildTimelineLanes,
  TIMELINE_CONTRACT,
  type TimelineBar,
  type TimelineLane,
  type TimelineModel,
  type TimelineReader,
  type TimelineRequest,
  type TimelineRow,
} from "../src/workbench/timeline.js";

// Acceptance 5 "without a TTY, provider or network": nothing this suite loads may reach a native producer SDK.
vi.mock("@anthropic-ai/claude-agent-sdk", () => {
  throw new Error("the timeline must not load the Claude Agent SDK");
});
vi.mock("@furnace/sdk", () => {
  throw new Error("the timeline must not load the Furnace SDK");
});
vi.mock("@forge/sdk", () => {
  throw new Error("the timeline must not load the Forge SDK");
});

afterEach(() => {
  vi.restoreAllMocks();
});

const scope: ObservationScope = { workspace: "ws-timeline", principal: "operator" };
const INVOCATION = "inv-timeline-A";
const ROOT = "/work/furnace-root";
const pad = (value: number): string => String(value).padStart(2, "0");
/** A zone-qualified instant `seconds` after 2026-10-15T07:00:00Z. */
const at = (seconds: number): string =>
  `2026-10-15T${pad(7 + Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}Z`;
const runRef: NativeRef = { provider: "furnace", type: "run", id: "run-1", scope: ROOT };
const attemptRef = (id: string): NativeRef => ({ provider: "furnace", type: "attempt", id, scope: ROOT });
const sessionRef = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
const forgeRef: NativeRef = { provider: "forge", type: "operation", id: "op-1" };
/** ObservationProjection's provider-qualified key layout for a reference in this suite's scope. */
const keyOf = (ref: NativeRef): string => JSON.stringify([scope.workspace, scope.principal, ref.provider, ref.type, ref.scope ?? "", ref.id]);
/** Payload-bearing snapshot fields no timeline may echo (acceptance 6). */
const SECRETS = ["payload-SECRET", "ev-SECRET", "basis-SECRET", "digest-SECRET"] as const;
/** The bead's frozen note vocabulary, in its stated order. */
const NOTES = [
  "clocks-may-differ",
  "open-intervals-present",
  "intervals-missing",
  "stale-rows-present",
  "window-partial",
  "relation-page-full",
  "multiple-parents",
  "rows-outside-viewport",
  "phase-kinds-unavailable",
];

interface Observed {
  ref: NativeRef;
  title: string;
  statusText?: string;
  tone?: Presentation["statusTone"];
  interval?: Interval;
  /** null states no trace: the node belongs to no invocation window. */
  invocationId?: string | null;
}
/** One read-current snapshot that also carries every payload-bearing field a timeline must never echo. */
function observe(projection: ObservationProjection, item: Observed): void {
  const snapshot: NativeSnapshot = {
    source: item.ref,
    scope,
    capturedAt: at(30),
    observedAt: at(30),
    kind: "fixture.snapshot",
    node: { title: item.title, type: "sdk-operation", statusText: item.statusText ?? "running", statusTone: item.tone ?? "active" },
    ...(item.invocationId === null ? {} : { trace: { invocationId: item.invocationId ?? INVOCATION } }),
    ...(item.interval ? { interval: item.interval } : {}),
    nativePayloadRef: SECRETS[0],
    evidenceRefs: [SECRETS[1]],
    subjectBasis: SECRETS[2],
    definitionDigest: SECRETS[3],
  };
  expect(projection.refresh(snapshot)).toBe("applied");
}
/** A producer statement; ownership is stated by the owner's own provider, as ObservationProjection.relate requires. */
function relate(projection: ObservationProjection, from: NativeRef, to: NativeRef, kind: Relation["kind"], nativeConfirmationRef?: string): void {
  const source = kind === "ownership" ? from.provider : `${kind}-statement`;
  projection.relate({ scope, from, to, kind, provenance: { source, observedAt: at(30), ...(nativeConfirmationRef ? { nativeConfirmationRef } : {}) } });
}

/** Fixture A (acceptance 1), the wb-752.1 Furnace shape: a Run snapshot without an invocation (FurnaceObserver's Run snapshot
 * states no trace, so the Run is outside every window) owning three Attempts through furnace-confirmed ownership edges with
 * closed intervals 0-4s, 1-3s and 5-6s; two claude-agent-sdk sessions without incoming edges (2-7s and 8s-open); one forge
 * operation without an interval. `text` rewrites every title and statusText (acceptance 2). */
function fixtureA(text: (value: string) => string = value => value): ObservationProjection {
  const projection = new ObservationProjection();
  observe(projection, { ref: runRef, title: text("Furnace Run run-1"), statusText: text("active"), invocationId: null });
  for (const [id, from, to] of [["att-1", 0, 4], ["att-2", 1, 3], ["att-3", 5, 6]] as const) {
    observe(projection, { ref: attemptRef(id), title: text(`Furnace Attempt ${id}`), statusText: text("succeeded"), tone: "success",
      interval: { startedAt: at(from), endedAt: at(to) } });
    relate(projection, runRef, attemptRef(id), "ownership", "furnace-attempts-request-1");
  }
  observe(projection, { ref: sessionRef("sess-1"), title: text("review the diff · session"), statusText: text("succeeded"), tone: "success",
    interval: { startedAt: at(2), endedAt: at(7) } });
  observe(projection, { ref: sessionRef("sess-2"), title: text("fix the parser · session"), statusText: text("observed-running"),
    interval: { startedAt: at(8) } });
  observe(projection, { ref: forgeRef, title: text("forge gate"), statusText: text("took 3s, finished 12:00:05"), tone: "success" });
  return projection;
}

const request = (overrides: Partial<TimelineRequest> = {}): TimelineRequest =>
  ({ scope, invocationId: INVOCATION, offset: 0, limit: 100, zoom: 1, pan: 0, columns: 40, ...overrides });
const closed = (from: number, to: number) => ({ kind: "closed", startedAt: at(from), endedAt: at(to), durationMs: (to - from) * 1000 });
const bar = (offsetCells: number, lengthCells: number, flags: Partial<Pick<TimelineBar, "clippedLeft" | "clippedRight" | "openEnded">> = {}): TimelineBar =>
  ({ offsetCells, lengthCells, clippedLeft: false, clippedRight: false, openEnded: false, ...flags });
const allRows = (model: TimelineModel): TimelineRow[] => model.lanes.flatMap(lane => [...lane.rows]);
function rowOf(model: TimelineModel, ref: NativeRef): TimelineRow {
  const found = allRows(model).find(row => row.key === keyOf(ref));
  if (!found) throw new Error(`no timeline row for ${ref.type} ${ref.id}`);
  return found;
}
function laneOf(model: TimelineModel, key: string): TimelineLane {
  const found = model.lanes.find(lane => lane.key === key);
  if (!found) throw new Error(`no timeline lane ${key}`);
  return found;
}
/** Note codes, after checking each is in the frozen vocabulary, listed at most once and in vocabulary order. */
function notesOf(model: TimelineModel): string[] {
  const codes: string[] = model.notes.map(note => note.code);
  expect(codes.filter(code => !NOTES.includes(code))).toEqual([]);
  expect(codes).toEqual(NOTES.filter(code => codes.includes(code)));
  return codes;
}
/** A producer stand-in over a real projection: window rows pass through `edit`, relation pages through `edges`. */
function standIn(projection: ObservationProjection, edit: (node: ObservedNode) => ObservedNode, edges: (page: Relation[]) => Relation[] = page => page): TimelineReader {
  return {
    window: filter => {
      const page = projection.window(filter);
      return { ...page, nodes: page.nodes.map(edit) };
    },
    relations: input => edges(projection.relations(input)),
    relationRevision: () => projection.relationRevision(),
  };
}
function refusal(run: () => unknown): CapabilityError {
  try {
    run();
  } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
  throw new Error("expected a CapabilityError");
}

describe("acceptance 1: docs/workbench/10 § Four views (Timeline): \"relative interval lanes grouped by owner/phase/provider, zoom and horizontal pan, observed waiting/executing/blocked periods and concurrency\"", () => {
  it("lanes fixture A into the furnace-confirmed Run lane and one lane per remaining provider, with the hand-computed concurrency", () => {
    const projection = fixtureA();
    const model = buildTimelineLanes(projection, request());
    expect(model).toStrictEqual({
      contract: TIMELINE_CONTRACT,
      revision: projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 1 }).revision,
      topologyRevision: projection.relationRevision(),
      origin: { startedAt: at(0), basis: "earliest-observed-start" },
      span: { ms: 8000, complete: false },
      lanes: [
        { key: keyOf(runRef), label: "furnace/run/run-1", basis: "ownership", confirmed: true, rows: [
          { key: keyOf(attemptRef("att-1")), nativeRef: attemptRef("att-1"), title: "Furnace Attempt att-1", tone: "success", freshness: "current", timing: closed(0, 4), bar: bar(0, 4) },
          { key: keyOf(attemptRef("att-2")), nativeRef: attemptRef("att-2"), title: "Furnace Attempt att-2", tone: "success", freshness: "current", timing: closed(1, 3), bar: bar(1, 2) },
          { key: keyOf(attemptRef("att-3")), nativeRef: attemptRef("att-3"), title: "Furnace Attempt att-3", tone: "success", freshness: "current", timing: closed(5, 6), bar: bar(5, 1) },
        ] },
        { key: "provider:claude-agent-sdk", label: "claude-agent-sdk", basis: "provider", confirmed: false, rows: [
          { key: keyOf(sessionRef("sess-1")), nativeRef: sessionRef("sess-1"), title: "review the diff · session", tone: "success", freshness: "current", timing: closed(2, 7), bar: bar(2, 5) },
          { key: keyOf(sessionRef("sess-2")), nativeRef: sessionRef("sess-2"), title: "fix the parser · session", tone: "active", freshness: "current",
            timing: { kind: "open", startedAt: at(8) }, bar: bar(8, 32, { clippedRight: true, openEnded: true }) },
        ] },
        { key: "provider:forge", label: "forge", basis: "provider", confirmed: false, rows: [
          { key: keyOf(forgeRef), nativeRef: forgeRef, title: "forge gate", tone: "success", freshness: "current", timing: { kind: "unavailable", reason: "no-source-interval" }, bar: null },
        ] },
      ],
      // Hand-computed: during 2s-3s the 0-4s and 1-3s Attempts and the 2-7s session overlap; no instant holds four.
      concurrency: { maxMeasured: 3, basis: "source-intervals-only", countsOpenIntervals: true },
      notes: [{ code: "clocks-may-differ" }, { code: "open-intervals-present" }, { code: "intervals-missing", count: 1 }, { code: "phase-kinds-unavailable" }],
      truncated: { lanes: false, rows: false, relations: false, window: false },
    });
    // The key layout this suite assumes is the projection's own.
    expect(projection.query({ scope, ref: forgeRef, limit: 1 }).nodes[0]?.key).toBe(keyOf(forgeRef));
  });

  it("zoom 2 exactly doubles every closed bar while durationMs is unchanged", () => {
    const projection = fixtureA();
    const base = buildTimelineLanes(projection, request());
    const zoomed = buildTimelineLanes(projection, request({ zoom: 2 }));
    const closedRefs = [attemptRef("att-1"), attemptRef("att-2"), attemptRef("att-3"), sessionRef("sess-1")];
    for (const ref of closedRefs) {
      expect(rowOf(zoomed, ref).timing).toStrictEqual(rowOf(base, ref).timing);
      expect(rowOf(zoomed, ref).bar?.lengthCells).toBe(2 * (rowOf(base, ref).bar?.lengthCells ?? Number.NaN));
    }
    expect(closedRefs.map(ref => rowOf(zoomed, ref).bar)).toStrictEqual([bar(0, 8), bar(2, 4), bar(10, 2), bar(4, 10)]);
    expect(rowOf(zoomed, sessionRef("sess-2")).bar).toStrictEqual(bar(16, 24, { clippedRight: true, openEnded: true }));
  });

  it("pan 3 subtracts exactly 3 from every offsetCells and clips the 0-4s bar on the left", () => {
    const projection = fixtureA();
    const base = buildTimelineLanes(projection, request());
    const panned = buildTimelineLanes(projection, request({ pan: 3 }));
    let shifted = 0;
    for (const row of allRows(base)) {
      const moved = allRows(panned).find(other => other.key === row.key);
      if (row.bar && moved?.bar) {
        expect(moved.bar.offsetCells).toBe(row.bar.offsetCells - 3);
        shifted++;
      }
    }
    expect(shifted).toBe(4);
    expect(rowOf(panned, attemptRef("att-1")).bar).toStrictEqual(bar(-3, 4, { clippedLeft: true }));
    expect(rowOf(panned, sessionRef("sess-1")).bar).toStrictEqual(bar(-1, 5, { clippedLeft: true }));
    // The 1-3s bar covers cells [-2, 0): entirely left of the viewport, so it is withheld and noted, never drawn at the edge.
    expect(rowOf(panned, attemptRef("att-2")).bar).toBeNull();
    expect(rowOf(panned, attemptRef("att-2")).timing).toStrictEqual(closed(1, 3));
    expect(notesOf(panned)).toContain("rows-outside-viewport");
    expect(notesOf(base)).not.toContain("rows-outside-viewport");
  });

  it("columns 8 clips the 8s-open bar on the right; at pan 0 its first cell is 8 = columns, outside [0, columns)", () => {
    const projection = fixtureA();
    const narrow = buildTimelineLanes(projection, request({ pan: 3, columns: 8 }));
    expect(rowOf(narrow, sessionRef("sess-2")).bar).toStrictEqual(bar(5, 3, { clippedRight: true, openEnded: true }));
    expect(rowOf(narrow, sessionRef("sess-1")).bar).toStrictEqual(bar(-1, 5, { clippedLeft: true }));
    const edge = buildTimelineLanes(projection, request({ columns: 8 }));
    expect(rowOf(edge, sessionRef("sess-2")).bar).toBeNull();
    expect(rowOf(edge, sessionRef("sess-2")).timing).toStrictEqual({ kind: "open", startedAt: at(8) });
    expect(rowOf(edge, sessionRef("sess-1")).bar).toStrictEqual(bar(2, 5));
    expect(notesOf(edge)).toContain("rows-outside-viewport");
    const wide = buildTimelineLanes(projection, request({ columns: 9 }));
    expect(rowOf(wide, sessionRef("sess-2")).bar).toStrictEqual(bar(8, 1, { clippedRight: true, openEnded: true }));
    // A closed bar that ends exactly on the right edge is not cut; one that crosses it is.
    const exact = buildTimelineLanes(projection, request({ zoom: 2, columns: 8 }));
    expect(rowOf(exact, attemptRef("att-1")).bar).toStrictEqual(bar(0, 8));
    expect(rowOf(exact, sessionRef("sess-1")).bar).toStrictEqual(bar(4, 10, { clippedRight: true }));
  });

  it("floors fractional cells, never draws a closed bar shorter than one cell and measures nothing from zoom", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: attemptRef("fraction"), title: "fraction", interval: { startedAt: "2026-10-15T07:00:00.500Z", endedAt: "2026-10-15T07:00:01.700Z" } });
    observe(projection, { ref: attemptRef("instant"), title: "instant", interval: { startedAt: "2026-10-15T07:00:00.000Z", endedAt: "2026-10-15T07:00:00.000Z" } });
    const cells = (zoom: number) => {
      const model = buildTimelineLanes(projection, request({ zoom }));
      return [rowOf(model, attemptRef("instant")).bar, rowOf(model, attemptRef("fraction")).bar];
    };
    expect(cells(1)).toStrictEqual([bar(0, 1), bar(0, 1)]);
    expect(cells(3)).toStrictEqual([bar(0, 1), bar(1, 3)]);
    expect(cells(8)).toStrictEqual([bar(0, 1), bar(4, 9)]);
    const model = buildTimelineLanes(projection, request({ zoom: 8 }));
    expect(rowOf(model, attemptRef("instant")).timing).toStrictEqual({ kind: "closed", startedAt: "2026-10-15T07:00:00.000Z", endedAt: "2026-10-15T07:00:00.000Z", durationMs: 0 });
    expect(rowOf(model, attemptRef("fraction")).timing).toMatchObject({ kind: "closed", durationMs: 1200 });
    // A zero-length closed interval counts on the empty [start, start); only the 1.2s interval is ever running.
    expect(model.concurrency.maxMeasured).toBe(1);
    expect(buildTimelineLanes(projection, request({ zoom: 1 })).concurrency).toStrictEqual(model.concurrency);
  });

  it("measures concurrency on [startedAt, endedAt) and counts an open interval from its start onward", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: attemptRef("a"), title: "a", interval: { startedAt: at(0), endedAt: at(4) } });
    observe(projection, { ref: attemptRef("b"), title: "b", interval: { startedAt: at(4), endedAt: at(6) } });
    observe(projection, { ref: attemptRef("c"), title: "c", interval: { startedAt: at(5) } });
    observe(projection, { ref: attemptRef("d"), title: "d", interval: { startedAt: at(6) } });
    // Touching intervals never overlap: at 4s a ends as b starts (1); at 6s b ends as d starts, beside the open c (2).
    expect(buildTimelineLanes(projection, request()).concurrency.maxMeasured).toBe(2);
    observe(projection, { ref: attemptRef("e"), title: "e", interval: { startedAt: at(7) } });
    // Open intervals never close: from 7s c, d and e all count.
    expect(buildTimelineLanes(projection, request()).concurrency.maxMeasured).toBe(3);
    const none = new ObservationProjection();
    observe(none, { ref: forgeRef, title: "no interval" });
    const empty = buildTimelineLanes(none, request());
    expect([empty.origin, empty.span, empty.concurrency.maxMeasured]).toStrictEqual([{ startedAt: null, basis: "none" }, { ms: null, complete: false }, 0]);
  });

  it("breaks an origin tie between equal instants by key, whatever the window order", () => {
    const projection = new ObservationProjection();
    observe(projection, { ref: attemptRef("b"), title: "b", interval: { startedAt: "2026-10-15T07:00:00.000Z" } });
    observe(projection, { ref: attemptRef("a"), title: "a", interval: { startedAt: "2026-10-15T07:00:00Z", endedAt: at(1) } });
    expect(keyOf(attemptRef("a")) < keyOf(attemptRef("b"))).toBe(true);
    expect(buildTimelineLanes(projection, request()).origin).toStrictEqual({ startedAt: "2026-10-15T07:00:00Z", basis: "earliest-observed-start" });
  });

  it("orders lanes by earliest row start then key and lists rows of a lane by start then key, interval-less rows last", () => {
    const projection = new ObservationProjection();
    const alpha = (id: string): NativeRef => ({ provider: "alpha", type: "op", id });
    const beta = (id: string): NativeRef => ({ provider: "beta", type: "op", id });
    // Inserted against the expected order everywhere, so neither sort can be the window's insertion order.
    observe(projection, { ref: { provider: "aaa", type: "op", id: "untimed" }, title: "untimed lane" });
    observe(projection, { ref: beta("b-1"), title: "b-1", interval: { startedAt: at(3), endedAt: at(4) } });
    observe(projection, { ref: alpha("y"), title: "y" });
    observe(projection, { ref: alpha("x"), title: "x" });
    observe(projection, { ref: alpha("c"), title: "c", interval: { startedAt: at(5) } });
    observe(projection, { ref: alpha("b"), title: "b", interval: { startedAt: at(3), endedAt: at(9) } });
    observe(projection, { ref: alpha("a"), title: "a", interval: { startedAt: at(3), endedAt: at(4) } });
    const model = buildTimelineLanes(projection, request());
    expect(model.lanes.map(lane => lane.key)).toEqual(["provider:alpha", "provider:beta", "provider:aaa"]);
    expect(laneOf(model, "provider:alpha").rows.map(row => row.nativeRef.id)).toEqual(["a", "b", "c", "x", "y"]);
  });
});

describe("acceptance 2: docs/workbench/10 § Four views (Timeline): \"Never infer exact timing from text or assume clocks agree; note uncertain clocks or event gaps.\"", () => {
  it("leaves a row whose statusText names a duration and finish time, but which has no interval, unavailable", () => {
    const model = buildTimelineLanes(fixtureA(), request());
    expect(rowOf(model, forgeRef)).toMatchObject({ timing: { kind: "unavailable", reason: "no-source-interval" }, bar: null });
  });

  it("changes only label and title fields when every title and statusText is replaced by a neutral string of equal length", () => {
    const original = buildTimelineLanes(fixtureA(), request());
    const neutral = buildTimelineLanes(fixtureA(value => "x".repeat(value.length)), request());
    const blank = (model: TimelineModel) =>
      ({ ...model, lanes: model.lanes.map(lane => ({ ...lane, label: "", rows: lane.rows.map(row => ({ ...row, title: "" })) })) });
    expect(blank(neutral)).toStrictEqual(blank(original));
    expect(allRows(neutral).map(row => row.title)).not.toEqual(allRows(original).map(row => row.title));
  });

  it("reads no instant from free text: a date the host parser accepts but no RFC 3339 shape states is unavailable", () => {
    const projection = new ObservationProjection();
    // ObservationProjection admits both (a zone-qualified suffix and a finite Date.parse); the second carries a C1 NEL.
    observe(projection, { ref: attemptRef("prose"), title: "prose start", interval: { startedAt: "Thursday 15 Oct 2026 07:00:00 +00:00" } });
    observe(projection, { ref: attemptRef("nel"), title: "nel end", interval: { startedAt: at(1), endedAt: "Thursday\u0085 15 Oct 2026 12:00:00 +00:00" } });
    observe(projection, { ref: attemptRef("iso"), title: "iso", interval: { startedAt: at(2), endedAt: at(3) } });
    const model = buildTimelineLanes(projection, request());
    for (const id of ["prose", "nel"]) expect(rowOf(model, attemptRef(id))).toMatchObject({ timing: { kind: "unavailable", reason: "no-source-interval" }, bar: null });
    expect(model.origin).toStrictEqual({ startedAt: at(2), basis: "earliest-observed-start" });
    expect(model.notes).toContainEqual({ code: "intervals-missing", count: 2 });
    expect(JSON.stringify(model)).not.toMatch(/Thursday|\u0085/);
  });

  it("notes clocks-may-differ only when intervals come from more than one provider", () => {
    expect(notesOf(buildTimelineLanes(fixtureA(), request()))).toContain("clocks-may-differ");
    const single = new ObservationProjection();
    observe(single, { ref: attemptRef("att-1"), title: "att-1", interval: { startedAt: at(0), endedAt: at(4) } });
    observe(single, { ref: attemptRef("att-2"), title: "att-2", interval: { startedAt: at(1) } });
    // A second provider without an interval states no clock of its own.
    observe(single, { ref: forgeRef, title: "forge gate" });
    expect(notesOf(buildTimelineLanes(single, request()))).not.toContain("clocks-may-differ");
  });

  it("notes window-partial exactly when the window total exceeds offset + returned", () => {
    const projection = fixtureA();
    const page = buildTimelineLanes(projection, request({ limit: 2 }));
    expect(allRows(page)).toHaveLength(2);
    expect(page.truncated.window).toBe(true);
    expect(notesOf(page)).toContain("window-partial");
    const last = buildTimelineLanes(projection, request({ offset: 4, limit: 2 }));
    // The window reads the requested page: its rows are the invocation's fifth and sixth.
    expect(allRows(last).map(row => row.key)).toEqual([keyOf(sessionRef("sess-2")), keyOf(forgeRef)]);
    for (const whole of [buildTimelineLanes(projection, request()), last]) {
      expect(whole.truncated.window).toBe(false);
      expect(notesOf(whole)).not.toContain("window-partial");
    }
  });

  it("always notes phase-kinds-unavailable: Interval carries no waiting/executing/blocked kinds", () => {
    const empty = new ObservationProjection();
    for (const model of [buildTimelineLanes(fixtureA(), request()), buildTimelineLanes(empty, request()), buildTimelineLanes(fixtureA(), request({ offset: 50 }))]) {
      expect(notesOf(model)).toContain("phase-kinds-unavailable");
    }
    expect(buildTimelineLanes(empty, request()).notes).toStrictEqual([{ code: "phase-kinds-unavailable" }]);
  });
});

describe("acceptance 3: docs/workbench/09 § Aggregates and profiling: \"Derive latency decomposition only with valid source intervals.\" and § Freshness and ambiguity: \"it becomes last-known-running + stale\"", () => {
  it("keeps the 8s-open interval open: no end, no duration, an open-ended bar", () => {
    const open = rowOf(buildTimelineLanes(fixtureA(), request()), sessionRef("sess-2"));
    expect(open.timing).toStrictEqual({ kind: "open", startedAt: at(8) });
    expect(JSON.stringify(open)).not.toContain("endedAt");
    expect(JSON.stringify(open)).not.toContain("durationMs");
    expect(open.bar?.openEnded).toBe(true);
  });

  it("states a complete span only when every row of the invocation is in the window and closed", () => {
    expect(buildTimelineLanes(fixtureA(), request()).span).toStrictEqual({ ms: 8000, complete: false });
    const closedOnly = new ObservationProjection();
    for (const [id, from, to] of [["att-1", 0, 4], ["att-2", 1, 3], ["att-3", 5, 6]] as const) {
      observe(closedOnly, { ref: attemptRef(id), title: id, interval: { startedAt: at(from), endedAt: at(to) } });
    }
    expect(buildTimelineLanes(closedOnly, request()).span).toStrictEqual({ ms: 6000, complete: true });
    // Rows of the invocation outside the window may start earlier or end later: never complete.
    expect(buildTimelineLanes(closedOnly, request({ limit: 2 })).span).toStrictEqual({ ms: 4000, complete: false });
    const openToo = new ObservationProjection();
    observe(openToo, { ref: attemptRef("done"), title: "done", interval: { startedAt: at(0), endedAt: at(4) } });
    observe(openToo, { ref: attemptRef("live"), title: "live", interval: { startedAt: at(1) } });
    expect(buildTimelineLanes(openToo, request()).span).toStrictEqual({ ms: 4000, complete: false });
    observe(closedOnly, { ref: forgeRef, title: "no interval" });
    expect(buildTimelineLanes(closedOnly, request()).span).toStrictEqual({ ms: 6000, complete: false });
  });

  it("withholds an interval whose end the producer cannot prove: a blank end is unavailable, never open", () => {
    const projection = new ObservationProjection();
    // ObservationProjection admits a blank endedAt (it validates only a truthy end).
    observe(projection, { ref: attemptRef("blank-end"), title: "blank end", interval: { startedAt: at(0), endedAt: "" } });
    observe(projection, { ref: attemptRef("closed"), title: "closed", interval: { startedAt: at(1), endedAt: at(2) } });
    // A stand-in producer states an end before its start, which the projection itself would refuse.
    const reader = standIn(projection, node => node.nativeRef.id === "closed" ? { ...node, interval: { startedAt: at(2), endedAt: at(1) } } : node);
    for (const model of [buildTimelineLanes(projection, request()), buildTimelineLanes(reader, request())]) {
      expect(rowOf(model, attemptRef("blank-end"))).toMatchObject({ timing: { kind: "unavailable", reason: "no-source-interval" }, bar: null });
      expect(notesOf(model)).not.toContain("open-intervals-present");
    }
    expect(rowOf(buildTimelineLanes(reader, request()), attemptRef("closed")).timing).toStrictEqual({ kind: "unavailable", reason: "no-source-interval" });
    expect(buildTimelineLanes(reader, request()).notes).toContainEqual({ code: "intervals-missing", count: 2 });
  });

  it("reports the claude rows stale after a disconnect and keeps them stale after a reconnect without a fresh snapshot", () => {
    const projection = fixtureA();
    const claude = [sessionRef("sess-1"), sessionRef("sess-2")];
    const before = buildTimelineLanes(projection, request());
    expect(claude.map(ref => rowOf(before, ref).freshness)).toEqual(["current", "current"]);
    expect(notesOf(before)).not.toContain("stale-rows-present");
    projection.disconnect("claude-agent-sdk");
    const disconnected = buildTimelineLanes(projection, request());
    expect(claude.map(ref => rowOf(disconnected, ref).freshness)).toEqual(["stale", "stale"]);
    expect(rowOf(disconnected, attemptRef("att-1")).freshness).toBe("current");
    expect(notesOf(disconnected)).toContain("stale-rows-present");
    // Stale is last-known state, never a revised interval: timing and bars are unchanged.
    expect(claude.map(ref => rowOf(disconnected, ref).timing)).toStrictEqual(claude.map(ref => rowOf(before, ref).timing));
    projection.reconnect("claude-agent-sdk");
    const reconnected = buildTimelineLanes(projection, request());
    expect(claude.map(ref => rowOf(reconnected, ref).freshness)).toEqual(["stale", "stale"]);
    expect(notesOf(reconnected)).toContain("stale-rows-present");
  });
});

describe("acceptance 4: docs/workbench/09 § Relationships are typed and provenanced: \"lifecycle ownership (only if native producer confirms)\", \"grouping only (phase, display scope)\", \"inferred possible relationship (hypothesis; never treated as authoritative)\"", () => {
  const phaseRef: NativeRef = { provider: "pi-workflow", type: "phase", id: "implement" };
  const reviewRef: NativeRef = { provider: "pi-workflow", type: "phase", id: "review" };
  const ownerA: NativeRef = { provider: "furnace", type: "run", id: "run-a" };
  const ownerB: NativeRef = { provider: "furnace", type: "run", id: "run-b" };
  const op = (id: string): NativeRef => ({ provider: "forge", type: "operation", id });
  /** The implement phase is observed in the window; the review phase and both Runs are referenced by edges only. */
  function relationsFixture(edges = true): ObservationProjection {
    const projection = new ObservationProjection();
    observe(projection, { ref: phaseRef, title: "Implement phase" });
    for (const id of ["g1", "g2", "r1", "r2", "both", "twin"]) observe(projection, { ref: op(id), title: id });
    observe(projection, { ref: op("d1"), title: "d1", interval: { startedAt: at(1), endedAt: at(2) } });
    if (!edges) return projection;
    relate(projection, phaseRef, op("g1"), "grouping", "phase:implement");
    relate(projection, phaseRef, op("g2"), "grouping");
    relate(projection, reviewRef, op("r1"), "grouping", "phase:review");
    relate(projection, reviewRef, op("r2"), "grouping", "phase:review");
    relate(projection, phaseRef, op("d1"), "dependency");
    relate(projection, ownerA, op("d1"), "causation");
    relate(projection, reviewRef, op("d1"), "hypothesis");
    relate(projection, phaseRef, op("both"), "grouping", "phase:implement");
    relate(projection, ownerA, op("both"), "ownership", "furnace-attempts-a");
    // The larger owner key is stated first, so the first edge of the page is not the winner.
    relate(projection, ownerB, op("twin"), "ownership", "furnace-attempts-b");
    relate(projection, ownerA, op("twin"), "ownership", "furnace-attempts-a");
    return projection;
  }
  const ids = (lane: TimelineLane): string[] => lane.rows.map(row => row.nativeRef.id);

  it("assigns ownership, then grouping, then provider lanes and never lanes by dependency, causation or hypothesis", () => {
    const model = buildTimelineLanes(relationsFixture(), request());
    expect(laneOf(model, keyOf(ownerA))).toMatchObject({ basis: "ownership", confirmed: true, label: "furnace/run/run-a" });
    // A node with both an ownership and a grouping parent follows the ownership parent.
    expect(ids(laneOf(model, keyOf(ownerA)))).toEqual(["both", "twin"]);
    // Grouping lanes: the parent inside the window names the lane by its title; one outside by its reference.
    expect(laneOf(model, keyOf(phaseRef))).toMatchObject({ basis: "grouping", label: "Implement phase" });
    expect(ids(laneOf(model, keyOf(phaseRef)))).toEqual(["g1", "g2"]);
    expect(laneOf(model, keyOf(reviewRef))).toMatchObject({ basis: "grouping", confirmed: true, label: "pi-workflow/phase/review" });
    expect(ids(laneOf(model, keyOf(reviewRef)))).toEqual(["r1", "r2"]);
    // d1's only incoming edges are dependency, causation and hypothesis: it lands in its provider lane.
    expect(laneOf(model, "provider:forge")).toMatchObject({ basis: "provider", confirmed: false, label: "forge" });
    expect(ids(laneOf(model, "provider:forge"))).toEqual(["d1"]);
    expect(ids(laneOf(model, "provider:pi-workflow"))).toEqual(["implement"]);
    expect(model.lanes.map(lane => lane.key)).not.toContain(keyOf(ownerB));
    // Those edges never alter timing either.
    expect(rowOf(model, op("d1"))).toStrictEqual(rowOf(buildTimelineLanes(relationsFixture(false), request()), op("d1")));
  });

  it("confirms a lane only when every edge used for it carries a native confirmation reference", () => {
    const projection = relationsFixture();
    const model = buildTimelineLanes(projection, request());
    // g2's grouping edge has no nativeConfirmationRef.
    expect(laneOf(model, keyOf(phaseRef)).confirmed).toBe(false);
    expect(laneOf(model, keyOf(reviewRef)).confirmed).toBe(true);
    // The projection refuses unconfirmed ownership, so a stand-in producer drops the reference: the kind alone confirms nothing.
    const unconfirmed = standIn(projection, node => node, page =>
      page.map(edge => edge.kind === "ownership" ? { ...edge, provenance: { source: edge.provenance.source } } : edge));
    expect(laneOf(buildTimelineLanes(unconfirmed, request()), keyOf(ownerA))).toMatchObject({ basis: "ownership", confirmed: false });
  });

  it("never lets a row parent itself, demotes a lane any row joined through grouping and confirms every statement used", () => {
    const projection = new ObservationProjection();
    const hub: NativeRef = { provider: "pi-workflow", type: "phase", id: "hub" };
    const shelf: NativeRef = { provider: "pi-workflow", type: "phase", id: "shelf" };
    for (const id of ["owned", "grouped", "self", "twice"]) observe(projection, { ref: op(id), title: id });
    relate(projection, hub, op("owned"), "ownership", "hub-confirms-owned");
    relate(projection, hub, op("grouped"), "grouping", "hub-groups");
    relate(projection, op("self"), op("self"), "grouping", "self-statement");
    relate(projection, shelf, op("twice"), "grouping", "shelf-confirms");
    // A second grouping statement from the same parent, by another source and without a confirmation reference.
    projection.relate({ scope, from: shelf, to: op("twice"), kind: "grouping", provenance: { source: "second-statement" } });
    const model = buildTimelineLanes(projection, request());
    expect(laneOf(model, keyOf(hub))).toMatchObject({ basis: "grouping", confirmed: true });
    expect(ids(laneOf(model, keyOf(hub)))).toEqual(["grouped", "owned"]);
    expect(ids(laneOf(model, "provider:forge"))).toEqual(["self"]);
    expect(model.lanes.map(lane => lane.key)).not.toContain(keyOf(op("self")));
    expect(laneOf(model, keyOf(shelf))).toMatchObject({ basis: "grouping", confirmed: false });
  });

  it("chooses the lexicographically smallest of several ownership parents and notes multiple-parents once", () => {
    const model = buildTimelineLanes(relationsFixture(), request());
    expect(keyOf(ownerA) < keyOf(ownerB)).toBe(true);
    expect(model.lanes.map(lane => lane.key)).not.toContain(keyOf(ownerB));
    expect(ids(laneOf(model, keyOf(ownerA)))).toContain("twin");
    expect(notesOf(model)).toContain("multiple-parents");
  });

  it("reads relations at most once per returned node, within relationLimit, and flags a full page", () => {
    const projection = relationsFixture();
    const relations = vi.spyOn(projection, "relations");
    // wb-6ze.29: a projection that has relationsPage is read through it, so a row's incoming page is a call of either method.
    const pages = vi.spyOn(projection, "relationsPage");
    const reads = () => [...relations.mock.calls, ...pages.mock.calls];
    const model = buildTimelineLanes(projection, request({ relationLimit: 2 }));
    const keys = allRows(model).map(row => row.key);
    expect(reads()).toHaveLength(keys.length);
    expect(new Set(reads().map(([input]) => input.to)).size).toBe(keys.length);
    for (const [input] of reads()) {
      expect(input).toStrictEqual({ scope, to: input.to, limit: 2 });
      expect(keys).toContain(input.to);
    }
    // twin, both and d1 each have at least two incoming edges, so their pages return exactly relationLimit rows.
    expect(model.truncated.relations).toBe(true);
    expect(notesOf(model)).toContain("relation-page-full");
    relations.mockClear();
    pages.mockClear();
    const roomy = buildTimelineLanes(projection, request());
    expect(reads()).toHaveLength(keys.length);
    for (const [input] of reads()) expect(input.limit).toBe(40);
    expect(roomy.truncated.relations).toBe(false);
    expect(notesOf(roomy)).not.toContain("relation-page-full");
    // A page cut at relationLimit 1 hides twin's second owner: the lane follows what was read, and the page is flagged.
    const cut = buildTimelineLanes(projection, request({ relationLimit: 1 }));
    expect(ids(laneOf(cut, keyOf(ownerB)))).toEqual(["twin"]);
    expect(cut.truncated.relations).toBe(true);
    // A stand-in that ignores the limit still has only the first relationLimit edges of its page considered.
    const unbounded = standIn(projection, item => item, page => page);
    const loose: TimelineReader = { ...unbounded, relations: input => projection.relations({ ...input, limit: 100 }) };
    expect(ids(laneOf(buildTimelineLanes(loose, request({ relationLimit: 1 })), keyOf(ownerB)))).toEqual(["twin"]);
  });

  it("ignores a parent outside the request scope and an edge that is not incoming to the row", () => {
    const projection = relationsFixture();
    const foreign = JSON.stringify(["ws-other", "someone", "furnace", "run", "", "run-a"]);
    const reader = standIn(projection, node => node, page => [
      ...page.map(edge => edge.kind === "ownership" ? { ...edge, from: foreign } : edge),
      { from: keyOf(ownerB), to: keyOf(op("unrelated")), kind: "ownership", provenance: { source: "furnace", nativeConfirmationRef: "x" } },
    ]);
    const model = buildTimelineLanes(reader, request());
    expect(model.lanes.map(lane => lane.key)).not.toContain(foreign);
    expect(model.lanes.map(lane => lane.key)).not.toContain(keyOf(ownerB));
    // Without its ownership edges, both falls back to its grouping parent and twin to its provider lane.
    expect(ids(laneOf(model, keyOf(phaseRef)))).toEqual(["both", "g1", "g2"]);
    expect(ids(laneOf(model, "provider:forge"))).toEqual(["d1", "twin"]);
  });
});

describe("acceptance 5: docs/workbench/13 § Key validations: \"All date/timestamp strings have timezone and are not used as total global event order.\" and docs/workbench/10 § Rendering pipeline: \"Pure layout and keyboard reducers are unit-tested without a TTY.\"", () => {
  /** Every own key of every object in the model, recursively. */
  function keysOf(value: unknown, into = new Set<string>()): Set<string> {
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        if (!Array.isArray(value)) into.add(key);
        keysOf(child, into);
      }
    }
    return into;
  }
  /** Every object and array in the model is frozen and plain. */
  function expectDeeplyFrozen(value: unknown): void {
    if (!value || typeof value !== "object") return;
    expect(Object.isFrozen(value)).toBe(true);
    expect([Object.prototype, Array.prototype]).toContain(Object.getPrototypeOf(value));
    for (const child of Object.values(value)) expectDeeplyFrozen(child);
  }

  it("carries no global sequence or ordering field and no elapsed, estimated or progress field", () => {
    const keys = keysOf(buildTimelineLanes(fixtureA(), request()));
    for (const forbidden of ["observedAt", "sourceSequence", "sequence", "sourceCursor", "lastConfirmedAt", "order", "rank", "elapsedMs", "estimatedEndedAt", "progressPercent"]) {
      expect(keys.has(forbidden)).toBe(false);
    }
  });

  it("is deterministic, deeply frozen and survives a JSON round trip losslessly", () => {
    const projection = fixtureA();
    const now = vi.spyOn(Date, "now");
    const random = vi.spyOn(Math, "random");
    const first = buildTimelineLanes(projection, request());
    const second = buildTimelineLanes(projection, request());
    expect(second).toStrictEqual(first);
    expect(JSON.parse(JSON.stringify(first))).toStrictEqual(first);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.lanes)).toBe(true);
    expect(Object.isFrozen(first.notes)).toBe(true);
    for (const lane of first.lanes) {
      expect(Object.isFrozen(lane)).toBe(true);
      expect(Object.isFrozen(lane.rows)).toBe(true);
      for (const row of lane.rows) expect(Object.isFrozen(row)).toBe(true);
    }
    expectDeeplyFrozen(first);
    expect(now).not.toHaveBeenCalled();
    expect(random).not.toHaveBeenCalled();
  });

  it("freezes only what it built: the reader's own rows stay as the reader returned them", () => {
    const projection = fixtureA();
    const returned: ObservedNode[] = [];
    const reader = standIn(projection, node => {
      returned.push(node);
      return node;
    });
    buildTimelineLanes(reader, request());
    expect(returned).toHaveLength(6);
    for (const node of returned) {
      expect(Object.isFrozen(node)).toBe(false);
      expect(Object.isFrozen(node.nativeRef)).toBe(false);
    }
  });

  it("imports only the observation, capability-registry and redaction modules and reads no clock, randomness, process or module loader", () => {
    const source = readFileSync(new URL("../src/workbench/timeline.ts", import.meta.url), "utf8");
    const imports = new Set([...source.matchAll(/^(?:import|export)\s[^;]*?\sfrom\s+["']([^"']+)["']/gm), ...source.matchAll(/^import\s+["']([^"']+)["']/gm)]
      .map(match => match[1]));
    expect([...imports].sort()).toStrictEqual(["./capability-registry.js", "./observation.js", "./redaction.js"]);
    for (const forbidden of ["Date.now", "Math.random", "process.", "node:", "import(", "require("]) expect(source).not.toContain(forbidden);
  });

  it("refuses invalid requests with CapabilityError('validation') before any reader call", () => {
    const window = vi.fn(() => {
      throw new Error("window read");
    });
    const relations = vi.fn(() => {
      throw new Error("relations read");
    });
    const relationRevision = vi.fn(() => {
      throw new Error("revision read");
    });
    const reader: TimelineReader = { window, relations, relationRevision };
    const invalid: Record<string, unknown>[] = [
      { limit: 0 }, { limit: 101 }, { limit: 1.5 }, { limit: "10" }, { offset: -1 }, { offset: Number.NaN }, { offset: Number.MAX_SAFE_INTEGER + 1 },
      { zoom: 0 }, { zoom: 9 }, { zoom: 1.5 }, { zoom: Number.POSITIVE_INFINITY }, { pan: -1 }, { pan: 0.5 }, { pan: Number.MAX_SAFE_INTEGER + 1 },
      { columns: 7 }, { columns: 201 }, { columns: 40.5 }, { maxLanes: 0 }, { maxLanes: 65 }, { maxRowsPerLane: 0 }, { maxRowsPerLane: 101 },
      { relationLimit: 0 }, { relationLimit: 101 }, { relationLimit: null }, { invocationId: "" }, { invocationId: 7 }, { scope: null },
      { scope: { workspace: "ws-timeline" } }, { scope: { workspace: "", principal: "operator" } },
    ];
    for (const overrides of invalid) {
      const bad = { ...request(), ...overrides } as unknown as TimelineRequest;
      expect(refusal(() => buildTimelineLanes(reader, bad)).category).toBe("validation");
    }
    for (const bad of [null, undefined, 7, "request"]) {
      expect(refusal(() => buildTimelineLanes(reader, bad as unknown as TimelineRequest)).category).toBe("validation");
    }
    expect(window).not.toHaveBeenCalled();
    expect(relations).not.toHaveBeenCalled();
    expect(relationRevision).not.toHaveBeenCalled();
    // The bounds themselves are accepted.
    const projection = fixtureA();
    for (const overrides of [{ limit: 1 }, { zoom: 8, columns: 200 }, { columns: 8 }, { maxLanes: 1, maxRowsPerLane: 1, relationLimit: 1 }, { maxLanes: 64, maxRowsPerLane: 100, relationLimit: 100 }, { pan: Number.MAX_SAFE_INTEGER }]) {
      expect(buildTimelineLanes(projection, request(overrides)).contract).toBe(TIMELINE_CONTRACT);
    }
  });
});

describe("acceptance 6: docs/workbench/12 § Input and output hardening: \"Validate Unicode and terminal escape sequences before display (no untrusted ANSI injection).\" and docs/workbench/09 § Acceptance/negative controls 10: \"Large/secret payload does not leak into Pi tool result or screen by default.\"", () => {
  const parent: NativeRef = { provider: "pi-workflow", type: "phase", id: "hostile" };
  const child: NativeRef = { provider: "forge", type: "operation", id: "child" };
  const tail = " step".repeat(30);
  /** U+200B inside the keyword would hide the credential from a redactor that runs before invisible characters are dropped. */
  const hostile = (lead: string): string => `${lead}Authorization: Bea\u200brer abc123\u202e${tail}`;
  function hostileFixture(title: string): ObservationProjection {
    const projection = new ObservationProjection();
    observe(projection, { ref: parent, title, interval: { startedAt: at(0), endedAt: at(9) } });
    observe(projection, { ref: child, title: "child", interval: { startedAt: at(1), endedAt: at(2) } });
    relate(projection, parent, child, "grouping");
    return projection;
  }
  function expectSanitized(text: string, prefix: string): void {
    expect(text.startsWith(`${prefix}Authorization: [REDACTED] step`)).toBe(true);
    expect(text.length).toBeLessThanOrEqual(80);
    expect(text.endsWith(" [truncated]")).toBe(true);
    for (const unsafe of ["\x1b", "\u009b", "\u202e", "\u200b", "abc123", "Bearer"]) expect(text).not.toContain(unsafe);
  }

  it("strips an ANSI escape, bidi override and zero-width character and redacts the credential in lane.label and row.title", () => {
    const projection = hostileFixture("placeholder title");
    // ObservationProjection refuses a C0 escape in a title; a producer stand-in delivers one.
    expect(() => observe(projection, { ref: { provider: "pi-workflow", type: "phase", id: "escape" }, title: hostile("\x1b[31m") })).toThrow(/unsafe/);
    const reader = standIn(projection, node => node.nativeRef.id === parent.id ? { ...node, presentation: { ...node.presentation, title: hostile("\x1b[31m") } } : node);
    const model = buildTimelineLanes(reader, request());
    expectSanitized(laneOf(model, keyOf(parent)).label, "");
    expectSanitized(rowOf(model, parent).title, "");
    expect(rowOf(model, parent).title).toBe(laneOf(model, keyOf(parent)).label);
  });

  it("sanitizes the same way when the real projection admits an 8-bit CSI, a bidi override and a zero-width character", () => {
    const model = buildTimelineLanes(hostileFixture(hostile("\u009b31m")), request());
    // wb-xbq: the 8-bit CSI is one escape unit, as its 7-bit form is, so none of it is displayed: the same prefix as above.
    expectSanitized(laneOf(model, keyOf(parent)).label, "");
    expectSanitized(rowOf(model, parent).title, "");
  });

  it("admits from a producer stand-in only this scope's and this invocation's rows, each once and at most limit, in the known vocabulary", () => {
    const projection = fixtureA();
    const reader: TimelineReader = {
      window: filter => {
        const page = projection.window(filter);
        const [first, second] = page.nodes;
        const odd = { ...first, presentation: { ...first.presentation, statusTone: "bogus" as unknown as Presentation["statusTone"] },
          freshness: "weird" as unknown as ObservedNode["freshness"] };
        const duplicate = { ...first, presentation: { ...first.presentation, title: "duplicate" } };
        const otherInvocation = { ...second, invocationId: "inv-other" };
        const otherScope = { ...second, scope: { workspace: "ws-other", principal: "operator" } };
        return { ...page, nodes: [odd, duplicate, otherInvocation, otherScope, ...page.nodes.slice(2)] };
      },
      relations: input => projection.relations(input),
      relationRevision: () => projection.relationRevision(),
    };
    const model = buildTimelineLanes(reader, request({ limit: 4 }));
    expect(allRows(model)).toStrictEqual([{ ...rowOf(buildTimelineLanes(projection, request()), attemptRef("att-1")), tone: "unknown", freshness: "unknown" }]);
    expect(model.truncated.window).toBe(true);
  });

  it("keeps a credential glued to an escape redacted, never splits a surrogate pair and falls back to the reference for invisible text", () => {
    const projection = new ObservationProjection();
    const forge = (id: string): NativeRef => ({ provider: "forge", type: "operation", id });
    observe(projection, { ref: forge("glued"), title: "placeholder" });
    observe(projection, { ref: forge("emoji"), title: `${"x".repeat(59)}\u{1F600}${"y".repeat(100)}` });
    // ObservationProjection admits a title made only of zero-width characters.
    observe(projection, { ref: forge("blank"), title: "\u200b\u200b" });
    // ...but refuses a provider made only of one (wb-0br, owner F2 ruling 21:43Z: admission refuses default-ignorables in
    // nativeRef identity), so a producer stand-in delivers it, as it delivers the glued title.
    const ghost: NativeRef = { provider: "\u200b", type: "operation", id: "ghost" };
    expect(projection.refresh({ source: ghost, scope, capturedAt: at(30), observedAt: at(30), node: { title: "\u200b", type: "sdk-operation", statusText: "running", statusTone: "active" } })).toBe("refused");
    observe(projection, { ref: forge("ghost"), title: "\u200b" });
    relate(projection, forge("blank"), forge("glued"), "grouping");
    const reader = standIn(projection, item => item.nativeRef.id === "glued" ? { ...item, presentation: { ...item.presentation, title: "Authorization: Bearer\x1b[0mabc123" } }
      : item.nativeRef.id === "ghost" ? { ...item, key: keyOf(ghost), nativeRef: { ...ghost } } : item);
    const model = buildTimelineLanes(reader, request());
    expect(rowOf(model, forge("glued")).title).toBe("Authorization: [REDACTED]");
    expect(rowOf(model, forge("emoji")).title).toBe(`${"x".repeat(59)} [truncated]`);
    expect(rowOf(model, forge("blank")).title).toBe("forge/operation/blank");
    expect(laneOf(model, keyOf(forge("blank"))).label).toBe("forge/operation/blank");
    expect(laneOf(model, "provider:\u200b").label).toBe("unknown provider");
    expect(rowOf(model, ghost).title).toBe("/operation/ghost");
  });

  it("never copies payloadRef, evidenceRefs, subjectBasis or definitionDigest into the model", () => {
    const projection = fixtureA();
    expect(JSON.stringify(projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 100 }))).toContain(SECRETS[1]);
    const text = JSON.stringify(buildTimelineLanes(projection, request()));
    for (const secret of SECRETS) expect(text).not.toContain(secret);
    const keys = new Set([...text.matchAll(/"([A-Za-z]+)":/g)].map(match => match[1]));
    for (const field of ["payloadRef", "evidenceRefs", "subjectBasis", "definitionDigest", "statusText"]) expect(keys.has(field)).toBe(false);
  });
});

describe("acceptance 7: docs/workbench/02 WB-029: \"Over 1000 nodes: render cost scales with visible slice and changed ancestors; no full historical-log fold per frame.\" and docs/workbench/10 § Scalability targets: \"don't declare targets met without measured runs.\"", () => {
  it("reads one window and at most one relation page per row on a projection filled to its default limits, and bounds lanes and rows", () => {
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
      // The first 60 operations share one owner; every later one has its own, so the window's 100 rows span 41 owners.
      relate(projection, { provider: "furnace", type: "run", id: i < 60 ? "run-0" : `run-${i}` }, operation(i), "ownership", `furnace-attempts-${i}`);
      relate(projection, { provider: "pi-workflow", type: "phase", id: `phase-${i % 7}` }, operation(i), "grouping");
    }
    expect(projection.stats()).toStrictEqual({ nodes: 2_000, events: 20_000, edges: 4_000 });
    const window = vi.spyOn(projection, "window");
    const relations = vi.spyOn(projection, "relations");
    // wb-6ze.29: a projection that has relationsPage is read through it; the per-row bound covers both relation reads.
    const pages = vi.spyOn(projection, "relationsPage");
    const untouched = [
      vi.spyOn(projection, "events"), vi.spyOn(projection, "query"), vi.spyOn(projection, "ingest"), vi.spyOn(projection, "refresh"),
      vi.spyOn(projection, "relate"), vi.spyOn(projection, "markStale"), vi.spyOn(projection, "disconnect"), vi.spyOn(projection, "reconnect"),
    ];
    const model = buildTimelineLanes(projection, { scope, invocationId: "inv-big", offset: 0, limit: 100, zoom: 1, pan: 0, columns: 80 });
    expect(window).toHaveBeenCalledTimes(1);
    expect(relations.mock.calls.length).toBeLessThanOrEqual(100);
    expect(relations.mock.calls.length + pages.mock.calls.length).toBeLessThanOrEqual(100);
    expect(relations.mock.calls.length + pages.mock.calls.length).toBeGreaterThan(0);
    for (const spy of untouched) expect(spy).not.toHaveBeenCalled();
    expect(model.lanes.length).toBeLessThanOrEqual(16);
    expect(model.lanes).toHaveLength(16);
    expect(model.truncated.lanes).toBe(true);
    for (const lane of model.lanes) expect(lane.rows.length).toBeLessThanOrEqual(40);
    // Only the shared owner's lane had more than 40 rows; it is the one that dropped rows.
    expect(model.lanes[0]?.key).toBe(keyOf({ provider: "furnace", type: "run", id: "run-0" }));
    expect(model.lanes[0]?.rows).toHaveLength(40);
    expect(model.truncated.rows).toBe(true);
    expect(model.truncated.window).toBe(true);
    expect(notesOf(model)).toContain("window-partial");
  }, 60_000);

  it("keeps measured facts independent of the lane and row bounds", () => {
    const projection = fixtureA();
    const whole = buildTimelineLanes(projection, request());
    const bounded = buildTimelineLanes(projection, request({ maxLanes: 1, maxRowsPerLane: 2 }));
    expect(bounded.lanes.map(lane => [lane.key, lane.rows.length])).toStrictEqual([[keyOf(runRef), 2]]);
    expect(bounded.truncated).toStrictEqual({ lanes: true, rows: true, relations: false, window: false });
    expect([bounded.origin, bounded.span, bounded.concurrency]).toStrictEqual([whole.origin, whole.span, whole.concurrency]);
    expect(bounded.notes).toStrictEqual(whole.notes);
    notesOf(bounded);
    const exact = buildTimelineLanes(projection, request({ maxLanes: 3, maxRowsPerLane: 3 }));
    expect(exact.lanes.map(lane => lane.rows.length)).toEqual([3, 2, 1]);
    expect(exact.truncated).toStrictEqual({ lanes: false, rows: false, relations: false, window: false });
  });
});
