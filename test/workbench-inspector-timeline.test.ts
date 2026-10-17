/** wb-6ze.26 (W15-B4/VC-5): the inspector timeline view renders the workbench.timeline/v1 lane model when
 * InspectorModel.timeline is supplied. Each describe block quotes docs/workbench through the bead's acceptance criteria T1-T7
 * plus the owner-approved zoom-clamp constraint. The renderer is a pure layout: every case builds a real ObservationProjection
 * (and, where cell counts matter, a real TimelineModel from buildTimelineLanes) and never touches a TTY, provider or network. */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { visibleWidth } from "@earendil-works/pi-tui";
import { describe, expect, it } from "vitest";
import {
  type InspectorModel,
  type InspectorState,
  type InspectorView,
  initialInspectorState,
  layoutInspector,
  reduceInspectorKey,
} from "../src/ui/workflow-inspector.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import {
  buildTimelineLanes,
  MAX_ZOOM,
  TIMELINE_CONTRACT,
  type TimelineLane,
  type TimelineModel,
  type TimelineNote,
  type TimelineRow,
} from "../src/workbench/timeline.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const scope: ObservationScope = { workspace: "workspace", principal: "reader" };
const INVOCATION = "workflow-1";
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });
const keyOf = (r: NativeRef): string => JSON.stringify([scope.workspace, scope.principal, r.provider, r.type, r.scope ?? "", r.id]);
const at = (seconds: number): string => `2026-10-15T00:${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}Z`;
const presentation = (title: string) => ({ title, type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const });

interface Seed {
  provider: string;
  id: string;
  title: string;
  interval?: { startedAt: string; endedAt?: string };
}
const SEEDS: readonly Seed[] = [
  { provider: "furnace", id: "a", title: "Alpha closed", interval: { startedAt: at(0), endedAt: at(6) } },
  { provider: "furnace", id: "b", title: "Bravo open", interval: { startedAt: at(2) } },
  { provider: "forge", id: "c", title: "Charlie none" },
  { provider: "forge", id: "d", title: "Delta closed", interval: { startedAt: at(1), endedAt: at(3) } },
];
function projectionOf(seeds: readonly Seed[]): ObservationProjection {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 1200, maxEdges: 1200, maxQuery: 40 });
  for (const seed of seeds) {
    projection.refresh({
      source: ref(seed.provider, seed.id),
      scope,
      capturedAt: at(0),
      observedAt: at(0),
      node: presentation(seed.title),
      trace: { invocationId: INVOCATION },
      coverage: "partial",
      ...(seed.interval ? { interval: seed.interval } : {}),
    });
  }
  return projection;
}
const modelOf = (projection: ObservationProjection, timeline?: TimelineModel): InspectorModel => ({
  projection,
  scope,
  invocationId: INVOCATION,
  title: "Timeline workflow",
  status: "running",
  ...(timeline ? { timeline } : {}),
});
const realTimeline = (projection: ObservationProjection, zoom = 1, pan = 0, columns = 30): TimelineModel =>
  buildTimelineLanes(projection, { scope, invocationId: INVOCATION, offset: 0, limit: 40, zoom, pan, columns });
const row = (seed: Seed, over: Partial<TimelineRow> = {}): TimelineRow => ({
  key: keyOf(ref(seed.provider, seed.id)),
  nativeRef: ref(seed.provider, seed.id),
  title: seed.title,
  tone: "active",
  freshness: "current",
  timing: { kind: "unavailable", reason: "no-source-interval" },
  bar: null,
  ...over,
});
const lane = (key: string, label: string, basis: TimelineLane["basis"], confirmed: boolean, rows: TimelineRow[]): TimelineLane => ({ key, label, basis, confirmed, rows });
const closedRow = (seed: Seed, offsetCells: number, lengthCells: number, durationMs: number, flags: Partial<NonNullable<TimelineRow["bar"]>> = {}): TimelineRow =>
  row(seed, {
    timing: { kind: "closed", startedAt: at(0), endedAt: at(1), durationMs },
    bar: { offsetCells, lengthCells, clippedLeft: false, clippedRight: false, openEnded: false, ...flags },
  });
function handModel(over: Partial<TimelineModel> = {}): TimelineModel {
  return {
    contract: TIMELINE_CONTRACT,
    revision: 1,
    topologyRevision: 1,
    origin: { startedAt: at(0), basis: "earliest-observed-start" },
    span: { ms: 6000, complete: true },
    lanes: [],
    concurrency: { maxMeasured: 2, basis: "source-intervals-only", countsOpenIntervals: true },
    notes: [],
    truncated: { lanes: false, rows: false, relations: false, window: false },
    ...over,
  };
}
const timelineState = (over: Partial<InspectorState> = {}): InspectorState => ({ ...initialInspectorState(), view: "timeline", ...over });
const render = (model: InspectorModel, state: InspectorState, width = 120, rows = 40, ascii = true): string[] => layoutInspector(model, state, { width, rows, ascii });
const barOf = (line: string, ascii = true): { offset: number; glyphs: string } | undefined => {
  const mark = ascii ? "|" : "│";
  const at1 = line.indexOf(mark);
  if (at1 < 0) return undefined;
  const rest = line.slice(at1 + 1).replace(/\s+$/u, "");
  return { offset: rest.length - rest.trimStart().length, glyphs: rest.trimStart() };
};

describe("T1 lanes, not flat lines", () => {
  // docs/workbench/10 § Four views, Timeline: "relative interval lanes grouped by owner/phase/provider, zoom and horizontal pan,
  // observed waiting/executing/blocked periods and concurrency."
  it("prints one header per lane with label, basis, confirmed flag and row count, rows in model order", () => {
    const [a, b, c, d] = SEEDS;
    const timeline = handModel({
      lanes: [lane("l1", "Run one", "ownership", true, [closedRow(a, 0, 6, 6000), row(b)]), lane("l2", "forge", "provider", false, [row(c), closedRow(d, 1, 2, 2000)])],
    });
    const lines = render(modelOf(projectionOf(SEEDS), timeline), timelineState());
    const text = lines.join("\n");
    const header1 = lines.findIndex((line) => line.includes("Run one") && line.includes("ownership") && line.includes("confirmed") && !line.includes("unconfirmed"));
    const header2 = lines.findIndex((line) => line.includes("forge") && line.includes("provider") && line.includes("unconfirmed"));
    expect(header1).toBeGreaterThan(-1);
    expect(header2).toBeGreaterThan(header1);
    expect(lines[header1]).toMatch(/2 rows/);
    const order = ["Alpha closed", "Bravo open", "Charlie none", "Delta closed"].map((title) => lines.findIndex((line) => line.includes(title)));
    expect([...order].sort((x, y) => x - y)).toEqual(order);
    expect(order[1]).toBeLessThan(header2);
    expect(order[2]).toBeGreaterThan(header2);
    expect(text).not.toMatch(/Source intervals only [·?] zoom/);
  });
  it("uses the model's lane order and membership, never re-deriving them from the projection", () => {
    const [a, b] = SEEDS;
    const timeline = handModel({ lanes: [lane("only", "Custom lane", "grouping", false, [row(b)])] });
    const text = render(modelOf(projectionOf(SEEDS), timeline), timelineState()).join("\n");
    expect(text).toContain("Custom lane");
    expect(text).toContain(b.title);
    expect(text).not.toContain(a.title);
  });
});

describe("T2 no timing from text", () => {
  // "Never infer exact timing from text or assume clocks agree; note uncertain clocks or event gaps."
  it("draws bars from TimelineBar cells only: offset spaces, lengthCells glyphs, clipped edges marked", () => {
    const [a, b, c, d] = SEEDS;
    const timeline = handModel({
      lanes: [
        lane("l", "mix", "provider", true, [
          closedRow(a, 3, 7, 6000),
          closedRow(b, 0, 5, 1234, { clippedLeft: true }),
          closedRow(c, 2, 4, 5, { clippedRight: true }),
          closedRow(d, 9, 1, 9),
        ]),
      ],
    });
    const lines = render(modelOf(projectionOf(SEEDS), timeline), timelineState());
    const bars = [a, b, c, d].map((seed) => barOf(lines.find((line) => line.includes(seed.title)) ?? "")!);
    expect(bars.map((bar) => bar.offset)).toEqual([3, 0, 2, 9]);
    expect(bars.map((bar) => bar.glyphs.length)).toEqual([7, 5, 4, 1]);
    expect(bars[0].glyphs).toBe("#######");
    expect(bars[1].glyphs.startsWith("<")).toBe(true);
    expect(bars[2].glyphs.endsWith(">")).toBe(true);
    const unicode = render(modelOf(projectionOf(SEEDS), timeline), timelineState(), 120, 40, false);
    const uni = [a, b].map((seed) => barOf(unicode.find((line) => line.includes(seed.title)) ?? "", false)!);
    expect(uni.map((bar) => [...bar.glyphs].length)).toEqual([7, 5]);
    expect(uni[1].glyphs.startsWith("◀")).toBe(true);
  });
  it("shows the model's durationMs for closed rows, 'open' for open rows and the model's reason for unavailable rows", () => {
    const [a, b, c] = SEEDS;
    const open = row(b, { timing: { kind: "open", startedAt: at(2) }, bar: { offsetCells: 2, lengthCells: 6, clippedLeft: false, clippedRight: true, openEnded: true } });
    const timeline = handModel({ lanes: [lane("l", "mix", "provider", true, [closedRow(a, 0, 6, 6000), open, row(c)])] });
    const lines = render(modelOf(projectionOf(SEEDS), timeline), timelineState());
    const text = lines.join("\n");
    expect(lines.find((line) => line.includes(a.title))).toContain("6000ms");
    const openLine = lines.find((line) => line.includes(b.title)) ?? "";
    expect(openLine).toMatch(/\bopen\b/);
    expect(openLine).not.toMatch(/timing unavailable/);
    expect(barOf(openLine)?.glyphs.length).toBe(6);
    expect(barOf(openLine)?.glyphs.endsWith("~")).toBe(true);
    expect(lines.find((line) => line.includes(c.title))).toContain("no-source-interval");
    expect(text).not.toMatch(/timing unavailable/);
    expect(text).not.toContain("Waiting/blocked/executing lanes unavailable without producer interval kinds.");
  });
  it("renders the real model's open interval open and its cell counts equal lengthCells", () => {
    const projection = projectionOf(SEEDS);
    const timeline = realTimeline(projection, 2, 0, 40);
    const lines = render(modelOf(projection, timeline), timelineState());
    const rows = timeline.lanes.flatMap((l) => l.rows);
    expect(rows.length).toBe(4);
    for (const r of rows) {
      const line = lines.find((candidate) => candidate.includes(r.title)) ?? "";
      if (r.bar === null) {
        expect(barOf(line)).toBeUndefined();
        continue;
      }
      const bar = barOf(line)!;
      expect(bar.offset).toBe(r.bar.offsetCells);
      expect(bar.glyphs.length).toBe(r.bar.lengthCells);
      if (r.timing.kind === "open") expect(line).not.toMatch(/timing unavailable/);
    }
  });
  it("the timeline model branch does no timing arithmetic and never builds a model itself", () => {
    const source = readFileSync(new URL("../src/ui/workflow-inspector.ts", import.meta.url), "utf8");
    const start = source.indexOf("function timelineModelLines");
    expect(start).toBeGreaterThan(-1);
    const next = source.indexOf("\n/** ", start + 10);
    const branch = source.slice(start, next > start ? next : undefined);
    expect(branch).not.toMatch(/Date\.(parse|now)|new Date|performance\.now/);
    expect(branch).not.toMatch(/state\.pan|buildTimelineLanes/);
    expect(branch).not.toMatch(/\*\s*state\.zoom|state\.zoom\s*\*/);
  });
  it("renders each note code as a fixed phrase, intervals-missing with its count, and never echoes unknown note text", () => {
    const notes: TimelineNote[] = [
      { code: "clocks-may-differ" },
      { code: "intervals-missing", count: 7 },
      { code: "open-intervals-present" },
      { code: "stale-rows-present" },
      { code: "multiple-parents" },
      { code: "rows-outside-viewport" },
      { code: "phase-kinds-unavailable" },
    ];
    const lines = render(modelOf(projectionOf(SEEDS), handModel({ notes })), timelineState(), 120, 40);
    const text = lines.join("\n");
    expect(text).toMatch(/clocks may differ/i);
    expect(text).toMatch(/7 rows? without a source interval/i);
    expect(text).toMatch(/open intervals/i);
    expect(text).toMatch(/stale rows/i);
    expect(text).toMatch(/multiple observed parents/i);
    expect(text).toMatch(/outside the bar viewport/i);
    expect(text).toMatch(/phases unavailable/i);
    const hostile = handModel({ notes: [{ code: "\x1b[31mevil\u202e" as never }] });
    const hostileText = render(modelOf(projectionOf(SEEDS), hostile), timelineState()).join("\n");
    expect(hostileText).not.toContain("evil");
    expect(hostileText).not.toContain("\x1b");
  });
});

describe("T3 honest concurrency and span", () => {
  // docs/workbench/09 § Aggregates and profiling: "Distinguish measured actual from estimated projected metrics. If dependencies
  // or interval bounds are missing, suppress precise critical path claims and show 'incomplete trace'."
  it("prints measured span with complete/partial and concurrency with its basis", () => {
    const complete = render(modelOf(projectionOf(SEEDS), handModel()), timelineState()).join("\n");
    expect(complete).toMatch(/span 6000ms complete/);
    expect(complete).toMatch(/concurrency max 2 \(source-intervals-only\)/);
    expect(complete).toMatch(/origin earliest-observed-start/);
    const partial = render(modelOf(projectionOf(SEEDS), handModel({ span: { ms: 4000, complete: false } })), timelineState()).join("\n");
    expect(partial).toMatch(/span 4000ms partial/);
  });
  it("says 'span unknown' when the origin basis is none and never prints an estimate", () => {
    const none = handModel({ origin: { startedAt: null, basis: "none" }, span: { ms: null, complete: false } });
    const text = render(modelOf(projectionOf(SEEDS), none), timelineState()).join("\n");
    expect(text).toMatch(/span unknown/);
    expect(text).toMatch(/origin none/);
    expect(text).not.toMatch(/estimate|projected|critical path.*[0-9]/i);
  });
});

describe("T4 truncation is visible", () => {
  // docs/workbench/10 § Failure and deception defenses: "Historical reads with limited retention show missing details honestly."
  it.each(["lanes", "rows", "relations", "window"] as const)("truncated.%s alone produces exactly one counted notice", (flag) => {
    const [a] = SEEDS;
    const truncated = { lanes: false, rows: false, relations: false, window: false, [flag]: true };
    const timeline = handModel({ lanes: [lane("l", "one", "provider", true, [closedRow(a, 0, 3, 3000)])], truncated });
    const lines = render(modelOf(projectionOf(SEEDS), timeline), timelineState());
    const notices = lines.filter((line) => /Truncated (lanes|rows|relations|window)/.test(line));
    expect(notices).toHaveLength(1);
    expect(notices[0]).toContain(`Truncated ${flag}`);
    expect(notices[0]).toMatch(/\b1 (lane|row)/);
  });
  it("renders no truncation notice when no flag is set", () => {
    const text = render(modelOf(projectionOf(SEEDS), handModel()), timelineState()).join("\n");
    expect(text).not.toMatch(/Truncated (lanes|rows|relations|window)/);
  });
});

describe("T5 byte-identical fallback", () => {
  // docs/workbench/10 § Existing implementation to reuse: "Preserve existing key behavior and workflow run access where possible".
  const SAMPLE = 240;
  function prng(seed: number): () => number {
    let s = seed >>> 0;
    return () => {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 0x100000000;
    };
  }
  function sampleOutputs(model: InspectorModel): string {
    const next = prng(26);
    const views: InspectorView[] = ["overview", "graph", "timeline", "details"];
    const keys = model.projection.window({ scope, invocationId: INVOCATION, offset: 0, limit: 4 }).nodes.map((node) => node.key);
    const out: string[] = [];
    for (let i = 0; i < SAMPLE; i++) {
      const state: InspectorState = {
        ...initialInspectorState(),
        view: i % 2 === 0 ? "timeline" : views[Math.floor(next() * views.length)],
        zoom: [1, 2, 4, 8, 16][Math.floor(next() * 5)],
        pan: Math.floor(next() * 6),
        index: Math.floor(next() * 4),
        filter: next() < 0.3 ? ["a", "closed", "zzz"][Math.floor(next() * 3)] : "",
        focused: next() < 0.2 ? keys[Math.floor(next() * keys.length)] : null,
        selected: next() < 0.5 ? keys[Math.floor(next() * keys.length)] : null,
      };
      const width = [12, 32, 80, 120][Math.floor(next() * 4)];
      const rows = [5, 9, 24, 40][Math.floor(next() * 4)];
      out.push(layoutInspector(model, state, { width, rows, ascii: next() < 0.5 }).join("\n"));
    }
    return out.join("\n\u0000\n");
  }
  it("the timeline view without a model matches the base output over a seeded sample of states", () => {
    const model = modelOf(projectionOf(SEEDS));
    const digest = createHash("sha256").update(sampleOutputs(model)).digest("hex");
    expect(SAMPLE).toBeGreaterThanOrEqual(200);
    expect(digest).toBe("dfb46fbd50e409a646c8b6fbb4de24e22f6b1a592e14dd8874e79750ad20d5fe");
  });
  it("an explicitly undefined timeline is the same as an absent one", () => {
    const base = modelOf(projectionOf(SEEDS));
    expect(sampleOutputs({ ...base, timeline: undefined })).toBe(sampleOutputs(base));
  });
  it("keeps the legacy flat lines when no model is supplied", () => {
    const text = render(modelOf(projectionOf(SEEDS)), timelineState(), 120, 40, false).join("\n");
    expect(text).toContain("Source intervals only · zoom 1x");
    expect(text).toContain("6000ms source interval");
  });
});

describe("T6 geometry and sanitization", () => {
  // docs/workbench/02 WB-028: "Terminal inspector has plain ASCII tier, theme-aware color tier, and usable 80-column/24-row fallback."
  const hostile = "\x1b[2J\x1b]0;pwn\x07 a\u202eb\u200bc\u2066d bearer sk-ant-api03-SECRETSECRETSECRET 漢字";
  function hostileModel(): InspectorModel {
    const [a, b, c] = SEEDS;
    const timeline = handModel({
      lanes: [
        lane("h", `${hostile} lane`, "provider", false, [
          closedRow({ ...a, title: hostile }, 2, 40, 6000),
          row({ ...b, title: `${hostile} two` }, { timing: { kind: "open", startedAt: at(2) }, bar: { offsetCells: 1, lengthCells: 30, clippedLeft: true, clippedRight: true, openEnded: true } }),
          row({ ...c, title: "plain" }),
        ]),
      ],
      notes: [{ code: "clocks-may-differ" }, { code: "window-partial" }],
      truncated: { lanes: true, rows: true, relations: true, window: true },
    });
    return modelOf(projectionOf(SEEDS), timeline);
  }
  it.each([
    [80, 24, true],
    [80, 24, false],
    [120, 40, true],
    [120, 40, false],
    [32, 9, true],
  ])("fits %ix%i (ascii=%s), keeps the key hint and renders hostile text sanitized", (width, rows, ascii) => {
    const lines = render(hostileModel(), timelineState(), width, rows, ascii);
    expect(lines.length).toBeLessThanOrEqual(rows);
    expect(lines.every((line) => visibleWidth(line) <= width)).toBe(true);
    const text = lines.join("\n");
    expect(text).toContain("Tab views");
    expect(text).not.toMatch(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/u);
    expect(text).not.toContain("SECRETSECRET");
    expect(text).not.toContain("pwn");
  });
  it("keeps every truncation notice reachable and counts what the row budget hides", () => {
    const lines = render(hostileModel(), timelineState(), 80, 24, true);
    const text = lines.join("\n");
    for (const flag of ["lanes", "rows", "relations", "window"]) expect(text).toContain(`Truncated ${flag}`);
  });
  it("never exceeds the row budget even with many lanes and rows", () => {
    const many = Array.from({ length: 30 }, (_, i) => lane(`l${i}`, `lane ${i}`, "provider", true, [closedRow({ ...SEEDS[0], title: `row ${i}` }, 0, 3, 3000)]));
    for (const rows of [5, 9, 24]) {
      const lines = render(modelOf(projectionOf(SEEDS), handModel({ lanes: many })), timelineState(), 80, rows, true);
      expect(lines.length).toBeLessThanOrEqual(rows);
      expect(lines.join("\n")).toContain("Tab views");
    }
    const text = render(modelOf(projectionOf(SEEDS), handModel({ lanes: many })), timelineState(), 80, 24, true).join("\n");
    expect(text).toMatch(/more .* \(row budget\)/);
  });
});

describe("T7 selection and filter parity", () => {
  // docs/workbench/10 § Navigation: "j/k or arrow move ... / filters; f focuses subtree"
  const [a, b, c, d] = SEEDS;
  const timeline = (): TimelineModel => handModel({ lanes: [lane("x", "furnace", "provider", true, [closedRow(a, 0, 6, 6000), row(b)]), lane("y", "forge", "provider", true, [row(c), closedRow(d, 1, 2, 2000)])] });
  it("marks the selected row with the pointer glyph", () => {
    const model = modelOf(projectionOf(SEEDS), timeline());
    const selected = model.projection.window({ scope, invocationId: INVOCATION, offset: 2, limit: 1 }).nodes[0];
    const lines = render(model, timelineState({ selected: selected.key, index: 2 }));
    const pointed = lines.filter((line) => /^ >/.test(line));
    expect(pointed).toHaveLength(1);
    expect(pointed[0]).toContain(selected.presentation.title);
  });
  it("state.filter hides non-matching rows and lanes with no match", () => {
    const text = render(modelOf(projectionOf(SEEDS), timeline()), timelineState({ filter: "delta" })).join("\n");
    expect(text).toContain(d.title);
    expect(text).not.toContain(a.title);
    expect(text).not.toContain(c.title);
    expect(text).toContain("Filter (viewport): delta");
    expect(text).not.toMatch(/furnace [·?] provider/);
  });
  it("the filter also matches the provider/type/id reference", () => {
    const text = render(modelOf(projectionOf(SEEDS), timeline()), timelineState({ filter: "operation/c" })).join("\n");
    expect(text).toContain(c.title);
    expect(text).not.toContain(a.title);
  });
  it("state.focused keeps only the focused row", () => {
    const model = modelOf(projectionOf(SEEDS), timeline());
    const text = render(model, timelineState({ focused: keyOf(ref(b.provider, b.id)) })).join("\n");
    expect(text).toContain(b.title);
    for (const other of [a, c, d]) expect(text).not.toContain(other.title);
    expect(text).toContain("Focused on selected node");
  });
});

describe("zoom clamp (owner-approved constraint)", () => {
  // BOUNDARY 10:23:58Z: clamp the zoom-in reducer to MAX_ZOOM imported from src/workbench/timeline.ts (never spell 8), or obtain an
  // owner widening decision - never both, never a silent catch of the validation throw. Option (a) is taken.
  it("pressing the zoom-in key five times from zoom 1 stays within the contract's MAX_ZOOM and sits at the cap", () => {
    const projection = projectionOf(SEEDS);
    const model = modelOf(projection);
    let state = timelineState();
    const seen: number[] = [];
    for (let i = 0; i < 5; i++) {
      state = reduceInspectorKey("=", state, model)!.state;
      seen.push(state.zoom);
    }
    expect(Math.max(...seen)).toBeLessThanOrEqual(MAX_ZOOM);
    expect(state.zoom).toBe(MAX_ZOOM);
    expect(reduceInspectorKey("=", state, model)!.state.zoom).toBe(MAX_ZOOM);
  });
  it("every zoom the reducer can reach is accepted by buildTimelineLanes, and '-' still halves down to 1", () => {
    const projection = projectionOf(SEEDS);
    const model = modelOf(projection);
    let state = timelineState();
    for (let i = 0; i < 6; i++) {
      state = reduceInspectorKey("=", state, model)!.state;
      expect(() => realTimeline(projection, state.zoom)).not.toThrow();
    }
    for (let i = 0; i < 6; i++) state = reduceInspectorKey("-", state, model)!.state;
    expect(state.zoom).toBe(1);
  });
  it("the contract refuses the first zoom above MAX_ZOOM (so the clamp is load-bearing)", () => {
    expect(() => realTimeline(projectionOf(SEEDS), MAX_ZOOM + 1)).toThrow();
  });
  it("the header shows the clamped value and never a zoom the contract refuses", () => {
    const model = modelOf(projectionOf(SEEDS), handModel());
    const text = render(model, timelineState({ zoom: 16 })).join("\n");
    expect(text).toContain(`zoom ${MAX_ZOOM}x`);
    expect(text).not.toContain("zoom 16x");
  });
  it("takes option (a) only: the reducer imports MAX_ZOOM, spells no literal cap and catches nothing around the model", () => {
    const source = readFileSync(new URL("../src/ui/workflow-inspector.ts", import.meta.url), "utf8");
    expect(source).toMatch(/import \{[^}]*\bMAX_ZOOM\b[^}]*\} from '\.\.\/workbench\/timeline\.js'/);
    expect(source).not.toMatch(/Math\.min\(16/);
    const timelineSource = readFileSync(new URL("../src/workbench/timeline.ts", import.meta.url), "utf8");
    // Respin 2 (gate 2026-10-16T08:57:41Z U1): the declaration stays byte-identical to the line wb-9x5.7's W21 C5 falsifier pins
    // and a separate export statement publishes it, so a value-preserving export keyword never reddens that landed pin.
    expect(timelineSource).toMatch(/^const MAX_ZOOM = 8;$/m);
    expect(timelineSource).toMatch(/^export \{ MAX_ZOOM \};$/m);
  });
});

// wb-6ze.26 respin (gate verdict 2026-10-15T18:28Z, owner rulings 18:32Z). Every invisible below is built with String.fromCodePoint
// or a source escape; the file holds no raw default-ignorable, bidi or control character.
const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
const SECRET = "SECRETTOKENVALUE0123456789";
const asciiOnly = (line: string): boolean => /^[\x20-\x7e]*$/.test(line);

// wb-6ze.26 respin 2 (gate verdict 2026-10-16T08:57:41Z, owner ruling 09:01Z): U2 site 24 composes the one helper, U3 title payloads
// fit the visible label.
type Surface = "title" | "label" | "reason";
const SURFACES: readonly Surface[] = ["title", "label", "reason"];
/** U3: a row title shows at most 24 cells, so the 26-character SECRET can never appear whole there and a not-contain assertion on it
 * cannot fail. Title payloads carry this short secret instead, which fits the label together with its keyword, and the title row
 * must also show the redaction marker. */
const TITLE_SECRET = "TKN4826";
const secretFor = (surface: Surface): string => (surface === "title" ? TITLE_SECRET : SECRET);
/** The one rendered line a surface's producer string lands on: the closed row (title), the lane header (label) or the unavailable
 * row (timing.reason) of the payloadModels shapes. */
function surfaceLine(lines: readonly string[], surface: Surface): string {
  const marker = surface === "title" ? "4000ms" : surface === "label" ? " 1 row" : SEEDS[1].title;
  const found = lines.filter((line) => line.includes(marker));
  expect(found, surface).toHaveLength(1);
  return found[0] ?? "";
}

interface Probe {
  readonly id: string;
  readonly raw: string;
  readonly secret: string;
}
/** The wb-952 17:32Z acceptance set and class-level probes, rebuilt from the construction in
 * test/workbench-sanitizer-corpus.test.ts (that census exports nothing, and importing a test file would register its cases here):
 * every unit between two tokens, inside a keyword, prefix, key or token, and both. */
const SGR = `${cp(0x1b)}[0m`;
const ACCEPTANCE_CODES = [
  0x200b, 0x07, 0x1b, 0x202e, 0xad, 0x2060, 0x200d, 0x200c, 0x7f, 0x2066, 0x9b, 0x180e, 0x34f, 0xfe0f, 0x3164, 0x08, 0x00, 0xfeff, 0x85,
  0x2061, 0x2064, 0x206a, 0x115f, 0xffa0, 0xe0020, 0x1d173, 0x200e, 0x200f, 0x61c, 0x80, 0x9f, 0x202a, 0x202c, 0x2069, 0x1160, 0x17b4,
  0x17b5, 0x180b, 0x2062, 0x2063, 0x206f, 0xfe00, 0x1bca0, 0xe0001, 0xe007f, 0xfff0,
];
const ACCEPTANCE_UNITS: readonly (readonly [name: string, unit: string])[] = [
  ...ACCEPTANCE_CODES.map((code) => [`U+${code.toString(16).toUpperCase().padStart(4, "0")}`, cp(code)] as const),
  ["SGR", SGR],
];
type Shape = (unit: string, secret: string) => string;
const BETWEEN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["before ghp_", (unit, secret) => `see${unit}ghp_${secret}`],
  ["before sk-ant-", (unit, secret) => `key${unit}sk-ant-${secret}`],
  ["before Bearer", (unit, secret) => `x${unit}Bearer ${secret}`],
  ["before Basic", (unit, secret) => `x${unit}Basic ${secret}`],
  ["as the space after Bearer", (unit, secret) => `Authorization: Bearer${unit}${secret}`],
  ["as the space after Basic", (unit, secret) => `Authorization: Basic${unit}${secret}`],
];
const WITHIN_TOKENS: readonly (readonly [position: string, shape: Shape])[] = [
  ["inside Bearer", (unit, secret) => `Authorization: Bea${unit}rer ${secret}`],
  ["inside ghp_", (unit, secret) => `see gh${unit}p_${secret}`],
  ["inside a Bearer token", (unit, secret) => `Bearer SEC${unit}${secret}`],
  ["inside password", (unit, secret) => `pass${unit}word=${secret}`],
  ["before and inside Bearer", (unit, secret) => `x${unit}Bea${unit}rer ${secret}`],
  ["before and inside ghp_", (unit, secret) => `see${unit}gh${unit}p_${secret}`],
  ["inside and after Bearer", (unit, secret) => `Authorization: Bea${unit}rer${unit}${secret}`],
  ["before, inside and after Bearer", (unit, secret) => `x${unit}Bea${unit}rer${unit}${secret}`],
  ["after a key token and inside the next key name", (unit, secret) => `ghp_abc${unit}pass${unit}word=${secret}`],
];
/** Whitespace always separates (wb-952 12:10Z), so the acceptance set gives whitespace units no inside-a-token positions. */
const WHITESPACE_UNITS: ReadonlySet<string> = new Set([0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x85, 0x2028, 0x2029].map((code) => cp(code)));
const CLASS_UNIT = { quiet: cp(0xfeff), control: cp(0x07), escape: SGR, invisible: cp(0x200b) } as const;
type GapClassName = keyof typeof CLASS_UNIT;
const GAP_CLASS_NAMES: readonly GapClassName[] = ["quiet", "control", "escape", "invisible"];
/** Every choice of at most two separator classes, every other class glued inside the scheme (no uniform reading exposes it). */
const SEPARATOR_CHOICES: readonly (readonly GapClassName[])[] = [
  [],
  ...GAP_CLASS_NAMES.flatMap((first, index) => [[first], ...GAP_CLASS_NAMES.slice(index + 1).map((second) => [first, second])]),
];
function classRaw(separators: readonly GapClassName[], secret: string): string {
  const glue = GAP_CLASS_NAMES.filter((name) => !separators.includes(name)).map((name) => CLASS_UNIT[name]);
  const scheme = [..."Bearer"].map((letter, at) => `${letter}${glue[at] ?? ""}`).join("");
  const before = separators[0] === undefined ? "" : `x${CLASS_UNIT[separators[0]]}`;
  const after = separators[1] === undefined ? " " : CLASS_UNIT[separators[1]];
  return `${before}${scheme}${after}${secret}`;
}
/** Label and timing.reason probes carry the corpus's own secrets; title probes (fitted) carry a short secret and drop the
 * "Authorization: " lead so that every secret lands inside the 24-cell row label (U3). */
function wb952Probes(fitted: boolean): Probe[] {
  const probes: Probe[] = [];
  for (const [name, unit] of ACCEPTANCE_UNITS) {
    for (const [position, shape] of [...BETWEEN_TOKENS, ...(WHITESPACE_UNITS.has(unit) ? [] : WITHIN_TOKENS)]) {
      const secret = fitted ? `TQ${String(probes.length).padStart(3, "0")}` : `ACCEPT${name.replace(/[^A-Z0-9]/g, "")}${position.replace(/[^a-z]/g, "").slice(0, 24)}`;
      const raw = shape(unit, secret);
      probes.push({ id: `${name} ${position}`, raw: fitted ? raw.replace(/^Authorization: /, "") : raw, secret });
    }
  }
  SEPARATOR_CHOICES.forEach((separators, index) => {
    const secret = fitted ? `TQ${String(probes.length).padStart(3, "0")}` : `CLASSTOKEN${index}`;
    probes.push({ id: `C${index} separators {${separators.join(",")}}`, raw: classRaw(separators, secret), secret });
  });
  return probes;
}

/** A hand-built one-lane, one-row model whose three producer strings (row title, lane label, timing.reason) carry `payload`. */
function payloadModels(payload: string): Record<"title" | "label" | "reason", InspectorModel> {
  const [a, b] = SEEDS;
  const projection = projectionOf(SEEDS);
  const model = (timeline: TimelineModel): InspectorModel => modelOf(projection, timeline);
  return {
    title: model(handModel({ lanes: [lane("t", "lane", "provider", true, [closedRow({ ...a, title: payload }, 0, 4, 4000)])] })),
    label: model(handModel({ lanes: [lane("l", payload, "provider", true, [closedRow(a, 0, 4, 4000)])] })),
    reason: model(handModel({ lanes: [lane("r", "lane", "provider", true, [row(b, { timing: { kind: "unavailable", reason: payload as never } })])] })),
  };
}

describe("U3 the ascii tier carries no non-ASCII byte on any model-backed line", () => {
  // docs/workbench/10 § ASCII glyph set and docs/workbench/02 WB-028: the plain ASCII tier is ASCII. Every base view maps non-ASCII
  // to '?'; the lane header must not be the one line that carries a raw U+00B7.
  const sizes: ReadonlyArray<readonly [number, number]> = [
    [80, 24],
    [120, 40],
    [32, 9],
    [60, 14],
  ];
  it("the real buildTimelineLanes path at every size renders only printable ASCII in the ascii tier", () => {
    const projection = projectionOf(SEEDS);
    for (const [width, rows] of sizes) {
      const lines = render(modelOf(projection, realTimeline(projection)), timelineState(), width, rows, true);
      const offenders = lines.filter((line) => !asciiOnly(line));
      expect(offenders, `${width}x${rows}`).toEqual([]);
      if (rows >= 14) expect(lines.some((line) => line.includes("confirmed"))).toBe(true);
    }
  });
  it("hand-built unicode labels, notes and truncation render ascii-only too, and the unicode tier still uses the middle dot", () => {
    const [a, b] = SEEDS;
    const timeline = handModel({
      lanes: [lane("u", "漢字 lane · dot", "ownership", false, [closedRow({ ...a, title: "café → arrow" }, 1, 5, 5000), row(b)])],
      notes: [{ code: "clocks-may-differ" }, { code: "intervals-missing", count: 3 }],
      truncated: { lanes: true, rows: true, relations: true, window: true },
    });
    for (const [width, rows] of sizes) {
      const lines = render(modelOf(projectionOf(SEEDS), timeline), timelineState({ zoom: 4 }), width, rows, true);
      expect(lines.filter((line) => !asciiOnly(line)), `${width}x${rows}`).toEqual([]);
    }
    const unicode = render(modelOf(projectionOf(SEEDS), timeline), timelineState(), 120, 40, false).join("\n");
    expect(unicode).toContain("·");
  });
  it("a seeded sample of states over the real model never emits a non-ASCII byte in the ascii tier", () => {
    const projection = projectionOf(SEEDS);
    let seed = 0x6e26;
    const next = (limit: number): number => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed % limit;
    };
    for (let i = 0; i < 300; i++) {
      const timeline = realTimeline(projection, [1, 2, 4, 8][next(4)], next(5), 8 + next(60));
      const lines = render(modelOf(projection, timeline), timelineState({ zoom: [1, 2, 4, 8, 16][next(5)], pan: next(6), filter: ["", "alpha", "forge"][next(3)] }), 12 + next(110), 5 + next(36), true);
      expect(lines.filter((line) => !asciiOnly(line))).toEqual([]);
    }
  });
});

describe("U4 whitespace-control separators are redacted through title, lane label and timing.reason", () => {
  // The P1-P7 glue class: a TAB/LF/VT/FF/CR as the ONLY separator between a credential keyword and its value must still be redacted
  // (redaction sees the control before it is collapsed to a space). Deleting controls before redaction would glue
  // "Bearer" to the token and leak it (gate mutant M21). Respin 2 U3: the title third carries TITLE_SECRET, which fits the 24-cell
  // row label, so a title-only mutant can fail it (M21t, MTred); each surface's line must also show the redaction marker.
  const controls: ReadonlyArray<readonly [string, string]> = [
    ["TAB", "\t"],
    ["LF", "\n"],
    ["VT", "\u000b"],
    ["FF", "\u000c"],
    ["CR", "\r"],
  ];
  const keywords = ["Bearer", "Basic", "bearer"];
  const surfaces = ["title", "label", "reason"] as const;
  for (const surface of surfaces) {
    it.each(controls.flatMap(([name, control]) => keywords.map((keyword) => [name, control, keyword] as const)))(
      `${surface}: %s as the only separator after %s keeps the credential out of the frame`,
      (_name, control, keyword) => {
        const secret = secretFor(surface);
        const model = payloadModels(`${keyword}${control}${secret}`)[surface];
        for (const ascii of [true, false]) {
          const lines = render(model, timelineState(), 120, 40, ascii);
          expect(lines.join("\n")).not.toContain(secret);
          expect(surfaceLine(lines, surface)).toContain("[REDACTED]");
        }
      },
    );
  }
});

describe("U2 site 24 reads in-token splits through the one helper (wb-952 landed first at 04cd6d4)", () => {
  // Respin 2 U2: clean() is safe() alone, the shared helper's named terminal layout, so redaction reads every gap both as a separator
  // and as glue inside a keyword, prefix or token: an invisible inside "Bearer" or "sk-ant-" is read glued and redacted with no local
  // deletion. A pre-pass that turns the gaps into spaces instead (gate M2) splits the keyword and leaks.
  const zwsp = cp(0x200b);
  const inToken = (secret: string): string[] => [`Bea${zwsp}rer ${secret}`, `sk-${zwsp}ant-api03-${secret}`, `Bea${cp(0xfeff)}rer ${secret}`, `Bea${cp(0x202e)}rer ${secret}`];
  for (const surface of SURFACES) {
    it.each(inToken(secretFor(surface)).map((payload, i) => [i, payload] as const))(`${surface}: in-token split ${"%i"} is read glued by the one helper and redacted`, (_i, payload) => {
      for (const ascii of [true, false]) {
        const lines = render(payloadModels(payload)[surface], timelineState(), 120, 40, ascii);
        expect(lines.join("\n")).not.toContain(secretFor(surface));
        expect(surfaceLine(lines, surface)).toContain("[REDACTED]");
      }
    });
  }
  // PIN-FLIP (wb-952): the shipped deletion pre-pass glued "x" to the key, so the delivered KNOWN RESIDUAL row pinned the secret as
  // PRESENT in the lane label and said it flips when the helper lands. wb-952 landed first (04cd6d4) and site 24 now composes it, so
  // the row is flipped here to secret ABSENT, on every surface the residual reached.
  it.each(SURFACES)("PIN-FLIP (wb-952 one helper, landed 04cd6d4): the former site-24 KNOWN RESIDUAL, a default-ignorable between a prefix letter and a sk-ant- key, now separates there and the key is redacted (%s, secret absent)", (surface) => {
    const secret = secretFor(surface);
    const payload = `x${zwsp}sk-ant-api03-${secret}`;
    for (const ascii of [true, false]) {
      const lines = render(payloadModels(payload)[surface], timelineState(), 120, 40, ascii);
      expect(lines.join("\n")).not.toContain(secret);
      expect(surfaceLine(lines, surface)).toContain("x[REDACTED]");
    }
  });
});

describe("U2 site 24 composes the one helper: the wb-952 probes through title, lane label and timing.reason", () => {
  // wb-952 closure record (bound by name): "24 workflow-inspector timelineModelLines clean() (wb-6ze.26) ... whichever lands second
  // composes the helper". wb-952 landed first, so no local pre-pass may delete anything before redaction has read it (16:43Z
  // "deletion never precedes redaction"); the shipped deletion pre-pass leaked these probes through lane label and timing.reason.
  const wide = wb952Probes(false);
  const fitted = wb952Probes(true);
  it("builds the full wb-952 set: 47 units at 6 between-token positions, 9 inside-token positions for non-whitespace units, 11 class probes", () => {
    const whitespace = ACCEPTANCE_UNITS.filter(([, unit]) => WHITESPACE_UNITS.has(unit)).length;
    expect(ACCEPTANCE_UNITS).toHaveLength(47);
    expect(SEPARATOR_CHOICES).toHaveLength(11);
    expect(wide).toHaveLength(ACCEPTANCE_UNITS.length * BETWEEN_TOKENS.length + (ACCEPTANCE_UNITS.length - whitespace) * WITHIN_TOKENS.length + 11);
    expect(fitted).toHaveLength(wide.length);
    expect(new Set(fitted.map((probe) => probe.secret)).size).toBe(fitted.length);
  });
  it("every title probe fits the 24-cell row label, so its secret would show if it were not redacted (no case that cannot fail)", () => {
    // stripUnsafeText is the measurement instrument here: every unsafe unit as one cell bounds any unredacted rendering.
    const over = fitted.filter((probe) => visibleWidth(stripUnsafeText(probe.raw, " ")) > 24).map((probe) => probe.id);
    expect(over).toEqual([]);
  });
  it("every lane label and timing.reason probe fits its 200-column line whole, so those cases can fail too", () => {
    // The lane header and the unavailable row spend under 40 fixed cells of the 196-cell inner width; 120 leaves room for both.
    const over = wide.filter((probe) => visibleWidth(stripUnsafeText(probe.raw, " ")) > 120).map((probe) => probe.id);
    expect(over).toEqual([]);
  });
  for (const surface of SURFACES) {
    const probes = surface === "title" ? fitted : wide;
    it(`${surface}: every wb-952 probe leaks no secret and keeps no unsafe code point in either tier`, () => {
      const leaked = { ascii: new Set<string>(), unicode: new Set<string>() };
      const unsafe = new Set<string>();
      for (const probe of probes) {
        const model = payloadModels(probe.raw)[surface];
        for (const ascii of [true, false]) {
          const lines = render(model, timelineState(), 200, 40, ascii);
          if (lines.some((line) => line.includes(probe.secret))) leaked[ascii ? "ascii" : "unicode"].add(probe.id);
          if (lines.some((line) => UNSAFE_DISPLAY.test(line))) unsafe.add(probe.id);
        }
      }
      const sample = [...new Set([...leaked.ascii, ...leaked.unicode, ...unsafe])].slice(0, 6);
      expect({ probes: probes.length, ascii: leaked.ascii.size, unicode: leaked.unicode.size, unsafe: unsafe.size, sample }).toEqual({
        probes: probes.length,
        ascii: 0,
        unicode: 0,
        unsafe: 0,
        sample: [],
      });
    });
  }
});

describe("U4 hostile timing.reason and unknown span", () => {
  it("renders an unavailable-timing reason through the sanitizer: no escape, bidi, zero-width or secret survives", () => {
    const reason = `\u001b[31mred${cp(0x202e)}${cp(0x200b)} Bearer\t${SECRET} \u001b]0;pwn\u0007`;
    for (const ascii of [true, false]) {
      const text = render(payloadModels(reason).reason, timelineState(), 120, 40, ascii).join("\n");
      expect(text).not.toContain("\u001b");
      expect(text).not.toContain(SECRET);
      expect(text).not.toContain("pwn");
      expect(text).not.toMatch(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/u);
      expect(text).toContain("red");
    }
  });
  it("says 'span unknown' whenever span.ms is null, even when the origin basis is not none, and never prints 'null'", () => {
    const unknown = handModel({ origin: { startedAt: at(0), basis: "earliest-observed-start" }, span: { ms: null, complete: false } });
    const text = render(modelOf(projectionOf(SEEDS), unknown), timelineState(), 120, 40, true).join("\n");
    expect(text).toMatch(/span unknown/);
    expect(text).not.toMatch(/null/);
    expect(text).toMatch(/origin earliest-observed-start/);
  });
});
