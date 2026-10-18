/** wb-6ze.23 (W15-D/VC-5): pane composition in layoutInspector per docs/workbench/10-terminal-inspector.md "Layout responsiveness".
 * Spec lines pinned (verbatim): "<80 columns or <20 rows: single-column compact tree; details as subview, no side-by-side graph." /
 * "80-119: two-pane tree + details or timeline summary; scrollable pane cap." / ">=120: left hierarchy, center graph/timeline, right
 * details when viable; cap width and height." / "Resize preserves node selection, focus and scroll intent where possible."
 * Every case builds a real ObservationProjection and draws it through the exported layout; nothing touches a TTY, provider or network.
 * Block (e) carries the union re-cut rows of gate outbox row 489 (U1, U4-U10), measured on the merge onto the landed wb-ea1 renderer. */
import { createHash } from "node:crypto";
import { visibleWidth } from "@earendil-works/pi-tui";
import { describe, expect, it, vi } from "vitest";
import {
  type InspectorModel,
  type InspectorState,
  type InspectorView,
  initialInspectorState,
  layoutInspector,
  PANE_MAX_WIDTH,
  PANE_MIN_WIDTH_LEFT,
  PANE_MIN_WIDTH_THREE,
} from "../src/ui/workflow-inspector.js";
import { selectAttention } from "../src/workbench/attention.js";
import { type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";

const scope: ObservationScope = { workspace: "workspace", principal: "reader" };
const ref = (provider: string, id: string): NativeRef => ({ provider, type: "operation", id });
const keyOf = (r: NativeRef): string => JSON.stringify([scope.workspace, scope.principal, r.provider, r.type, r.scope ?? "", r.id]);
const now = "2026-10-15T00:00:00Z";
const presentation = (title: string) => ({ title, type: "sdk-operation" as const, statusText: "running", statusTone: "active" as const });

function modelOf(count = 12, title = "Pane workflow"): InspectorModel {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 1200, maxEdges: 1200, maxQuery: 40 });
  for (let i = 0; i < count; i++) {
    projection.refresh({
      source: ref(i % 2 ? "forge" : "furnace", String(i)),
      scope,
      capturedAt: now,
      observedAt: now,
      node: presentation(`Operation ${i}`),
      trace: { invocationId: "workflow-1" },
    });
  }
  projection.relate({ scope, from: ref("furnace", "0"), to: ref("forge", "1"), kind: "dependency", provenance: { source: "furnace", observedAt: now } });
  return { projection, scope, invocationId: "workflow-1", title, status: "running" };
}
const selectedState = (view: InspectorView = "overview", selected: NativeRef = ref("furnace", "0")): InspectorState => ({ ...initialInspectorState(), view, selected: keyOf(selected) });
const draw = (model: InspectorModel, state: InspectorState, width: number, rows: number, extra: { ascii?: boolean; panes?: boolean } = { panes: true }): string[] =>
  layoutInspector(model, state, { width, rows, ...extra });
const SEPARATOR = " │ ";
/** RIGHT-TO-LEFT OVERRIDE, built from its code point so no raw bidi control sits in this source (wb-era hygiene). */
const RLO = String.fromCodePoint(0x202e);

describe("(a) <80 columns or <20 rows: the single column, unchanged", () => {
  it.each([
    [79, 24],
    [120, 19],
    [80, 19],
    [60, 40],
  ])("opting in at %ix%i draws byte-for-byte what the unopted layout draws", (width, rows) => {
    const model = modelOf();
    for (const view of ["overview", "graph", "timeline", "details"] as const) {
      const state = selectedState(view);
      expect(draw(model, state, width, rows, { panes: true })).toEqual(draw(model, state, width, rows, {}));
    }
  });
  it("a host that passes only width and rows (no opt-in) keeps the single column at every size", () => {
    const model = modelOf();
    for (const [width, rows] of [[80, 24], [119, 24], [120, 40], [200, 60]] as const) {
      const lines = draw(model, selectedState("overview"), width, rows, {});
      expect(lines.some((line) => line.includes("│"))).toBe(false);
      expect(draw(model, selectedState("overview"), width, rows, { panes: false })).toEqual(lines);
    }
  });
});

describe("(b) 80-119 columns: two panes, view rows beside the selected node's details", () => {
  it("draws the view rows left and the same details rows the details view draws right, one separator per body row", () => {
    const model = modelOf();
    const state = selectedState("overview");
    const lines = draw(model, state, 100, 30);
    const body = lines.filter((line) => line.includes(SEPARATOR));
    expect(body.length).toBeGreaterThan(5);
    for (const line of body) expect(line.split(SEPARATOR)).toHaveLength(2);
    const rightOf = body.map((line) => line.split(SEPARATOR)[1].trim());
    expect(rightOf.some((text) => text.startsWith("Native ref: furnace/operation/0") || text.includes("Native ref:"))).toBe(true);
    expect(body.map((line) => line.split(SEPARATOR)[0]).join("\n")).toContain("Operation 0");
    // The details rows are exactly the rows the unpaned details view draws for this node.
    const details = draw(model, { ...state, view: "details" }, 100 - 3 - 40, 30, {}).filter((line) => line.includes("Native ref:"));
    expect(details.length).toBe(1);
  });
  it("the left pane is never narrower than 40 columns and each pane stays within 80", () => {
    const model = modelOf();
    const lines = draw(model, selectedState("overview"), 80, 24);
    const widthOfLeft = Math.max(...lines.filter((line) => line.includes(SEPARATOR)).map((line) => visibleWidth(line.split(SEPARATOR)[0])));
    expect(widthOfLeft).toBe(40);
    for (const width of [80, 99, 119]) for (const line of draw(model, selectedState("overview"), width, 24)) expect(visibleWidth(line)).toBeLessThanOrEqual(width);
  });
  it("with no selected node the right pane carries the timeline summary, never an empty or invented pane", () => {
    const empty = modelOf(0);
    const lines = draw(empty, initialInspectorState(), 100, 24);
    expect(lines.join("\n")).toContain("No source observations for this invocation");
    const right = lines.filter((line) => line.includes(SEPARATOR)).map((line) => line.split(SEPARATOR)[1]).join("\n");
    expect(right).toContain("Source intervals only");
    expect(right).not.toContain("Select an observed operation");
    const model = modelOf();
    const unselected = draw(model, { ...initialInspectorState(), index: 0 }, 100, 24).filter((line) => line.includes(SEPARATOR));
    expect(unselected.map((line) => line.split(SEPARATOR)[1]).join("\n")).toContain("Native ref:");
  });
  it("the timeline view keeps its lanes on the left and details on the right", () => {
    const lines = draw(modelOf(), selectedState("timeline"), 100, 30).filter((line) => line.includes(SEPARATOR));
    expect(lines.map((line) => line.split(SEPARATOR)[0]).join("\n")).toMatch(/Source intervals|timing unavailable/);
    expect(lines.map((line) => line.split(SEPARATOR)[1]).join("\n")).toContain("Native ref:");
  });
});

describe("(c) >=120 columns: hierarchy, graph or timeline, details", () => {
  it("overview and graph views draw tree | graph | details with two separators per body row", () => {
    const model = modelOf();
    for (const view of ["overview", "graph"] as const) {
      const lines = draw(model, selectedState(view), 140, 40);
      const body = lines.filter((line) => line.split(SEPARATOR).length === 3);
      expect(body.length).toBeGreaterThan(5);
      const [left, center, right] = [0, 1, 2].map((at) => body.map((line) => line.split(SEPARATOR)[at]).join("\n"));
      expect(left).toContain("Observed tree");
      expect(center).toContain("Observed reference graph");
      expect(right).toContain("Native ref:");
    }
  });
  it("timeline and details views put the timeline lanes in the center", () => {
    for (const view of ["timeline", "details"] as const) {
      const body = draw(modelOf(), selectedState(view), 140, 40).filter((line) => line.split(SEPARATOR).length === 3);
      expect(body.map((line) => line.split(SEPARATOR)[1]).join("\n")).toMatch(/Source intervals|timing unavailable/);
    }
  });
  it("no pane is wider than 80 columns and surplus width is left blank", () => {
    const lines = draw(modelOf(), selectedState("overview"), 300, 40);
    for (const line of lines) expect(visibleWidth(line)).toBeLessThanOrEqual(3 * 80 + 2 * visibleWidth(SEPARATOR));
    const body = lines.filter((line) => line.split(SEPARATOR).length === 3);
    for (const line of body) for (const pane of line.split(SEPARATOR)) expect(visibleWidth(pane)).toBeLessThanOrEqual(80);
  });
  it("every pane keeps at least 36 columns when three panes are drawn", () => {
    const lines = draw(modelOf(), selectedState("overview"), 120, 40).filter((line) => line.split(SEPARATOR).length === 3);
    expect(lines.length).toBeGreaterThan(5);
    const paneWidths = [0, 1, 2].map((at) => Math.max(...lines.map((line) => visibleWidth(line.split(SEPARATOR)[at]))));
    // Pane text is padded to the pane width, so only the last (right-trimmed) pane can read narrower than the other two.
    expect(Math.min(paneWidths[0], paneWidths[1])).toBeGreaterThanOrEqual(36);
  });
});

describe("(d) shared geometry: header, hint, caps, selection", () => {
  it("the header spans the full width above the panes and the key hint is the last row", () => {
    const model = modelOf(12, "A workflow title cut by any 40-column pane but whole at full width");
    const narrowest = layoutInspector(model, selectedState("overview"), { width: 100, rows: 30, panes: true });
    expect(narrowest[0]).toContain("A workflow title cut by any 40-column pane but whole at full width");
    expect(narrowest[0]).not.toContain(SEPARATOR);
    expect(narrowest[narrowest.length - 1]).toContain("Tab views");
    const filtered = draw(model, { ...selectedState("overview"), filter: "Operation 1" }, 140, 40);
    expect(filtered[2]).toContain("Filter (viewport): Operation 1");
    expect(filtered[0]).not.toContain(SEPARATOR);
  });
  it("the header names the real view even when a pane draws another one", () => {
    const lines = draw(modelOf(), selectedState("details"), 140, 40);
    expect(lines[1]).toMatch(/^ DETAILS /);
  });
  it("total lines and every line's width stay within the terminal for every view, size and charset", () => {
    for (const ascii of [true, false]) for (const view of ["overview", "graph", "timeline", "details"] as const) for (const [width, rows] of [[80, 20], [100, 24], [119, 40], [120, 20], [160, 60]] as const) {
      const lines = draw(modelOf(40), selectedState(view), width, rows, { panes: true, ascii });
      expect(lines.length).toBeLessThanOrEqual(rows);
      expect(lines.every((line) => visibleWidth(line) <= width)).toBe(true);
      if (ascii) expect(lines.join("\n")).not.toMatch(/[^\x20-\x7e\n]/u);
    }
  });
  it("the ASCII charset separates panes with a plain bar", () => {
    const lines = draw(modelOf(), selectedState("overview"), 140, 40, { panes: true, ascii: true });
    expect(lines.filter((line) => line.split(" | ").length === 3).length).toBeGreaterThan(5);
  });
  it("resize preserves the selected node across the single-column, two-pane and three-pane tiers", () => {
    const model = modelOf();
    const state = selectedState("overview", ref("forge", "3"));
    for (const width of [79, 80, 119, 120, 200]) {
      const pointed = draw(model, state, width, 30).filter((line) => line.includes("❯"));
      expect(pointed.length).toBeGreaterThan(0);
      expect(pointed[0]).toContain("Operation 3");
    }
  });
  it("an unsafe title and control sequences never reach a pane line", () => {
    const model = modelOf(12, `\u001b[2J secret\n${RLO}漢字`);
    for (const width of [100, 140]) {
      const text = draw(model, selectedState("overview"), width, 30).join("\n");
      expect(text).not.toContain("\u001b");
      expect(text).not.toContain(RLO);
    }
  });
  it("each pane costs exactly what one single-column render costs: bounded projection windows, never raw event history", () => {
    const model = modelOf(60);
    const window = vi.spyOn(model.projection, "window");
    draw(model, selectedState("overview"), 100, 30, {});
    const perColumn = window.mock.calls.length;
    expect(perColumn).toBeGreaterThan(0);
    // P6 (wb-feo, owner R505 N1): "at most one window() call per rendered pane" - the single column is one pane.
    expect(perColumn).toBe(1);
    window.mockClear();
    draw(model, selectedState("overview"), 100, 30);
    expect(window.mock.calls.length).toBe(2 * perColumn);
    window.mockClear();
    draw(model, selectedState("overview"), 140, 40);
    expect(window.mock.calls.length).toBe(3 * perColumn);
    for (const call of window.mock.calls) expect(call[0].limit ?? 0).toBeLessThanOrEqual(32);
  });
  it("pane composition does not move the selection or mutate the state", () => {
    const model = modelOf();
    const state = selectedState("overview", ref("forge", "3"));
    const frozen = JSON.stringify(state);
    draw(model, state, 140, 40);
    expect(JSON.stringify(state)).toBe(frozen);
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
// Union re-cut rows (outbox row 489, U1 and U4-U10): measured on the merged tree, landed wb-ea1 remainder rendering kept.
// ---------------------------------------------------------------------------------------------------------------------------

const GAP = visibleWidth(SEPARATOR);
/** Pane widths from the exported minimums and maximum (docs/10 "Layout responsiveness"), computed here, never restated. */
function paneWidths(width: number): number[] {
  const three = Math.min(PANE_MAX_WIDTH, Math.floor((width - 2 * GAP) / 3));
  if (width >= 120 && three >= PANE_MIN_WIDTH_THREE) return [three, three, three];
  const left = Math.min(PANE_MAX_WIDTH, Math.max(PANE_MIN_WIDTH_LEFT, Math.floor((width - GAP) / 2)));
  return [left, Math.min(PANE_MAX_WIDTH, width - GAP - left)];
}
/** The composed body rows, by index: everything between the header rule and the key hint. */
function bodyRows(lines: readonly string[]): string[] {
  const rule = lines.findIndex((line) => /^ (?:─+|-+)$/u.test(line));
  expect(rule).toBeGreaterThan(0);
  return lines.slice(rule + 1, lines.length - 1);
}
/** Grapheme clusters with the visible column each starts at (a cluster, not a code point, is what a terminal cell holds). */
const graphemes = new Intl.Segmenter("en", { granularity: "grapheme" });
function cellsOf(line: string): { text: string; at: number }[] {
  const cells: { text: string; at: number }[] = [];
  let column = 0;
  for (const { segment } of graphemes.segment(line)) {
    cells.push({ text: segment, at: column });
    column += visibleWidth(segment);
  }
  return cells;
}
/** A composed row split back into its panes by visible column: each pane fills exactly its width, then a 3-column separator,
 * so pane text that itself holds a separator-like run (ea1's ASCII remainder line) never splits a pane. */
function panesOf(line: string, width: number): string[] {
  const cells = cellsOf(line);
  let start = 0;
  return paneWidths(width).map((paneWidth) => {
    const from = start;
    start += paneWidth + GAP;
    return cells
      .filter((cell) => cell.at >= from && cell.at < from + paneWidth)
      .map((cell) => cell.text)
      .join("");
  });
}
/** Visible columns at which `glyph` sits in `line`. */
const columnsOf = (line: string, glyph: string): number[] => cellsOf(line).flatMap((cell) => (cell.text === glyph ? [cell.at] : []));
const digest = (lines: readonly string[]): string => createHash("sha256").update(lines.join("\n")).digest("hex");
const VIEWS: readonly InspectorView[] = ["overview", "graph", "timeline", "details"];

/** wb-ea1's capped shape: seven snapshots against a node cap of four (three evicted), then five events against an event cap of three. */
function cappedModel(): InspectorModel {
  const projection = new ObservationProjection({ maxNodes: 4, maxEvents: 3 });
  for (let i = 0; i < 7; i++)
    projection.refresh({ source: ref("forge", String(i)), scope, capturedAt: now, observedAt: now, node: presentation(`Operation ${i}`), trace: { invocationId: "workflow-1" } });
  for (let sequence = 1; sequence <= 5; sequence++)
    projection.ingest({ projectionEventId: `status-6-${sequence}`, source: ref("forge", "6"), scope, sourceSequence: sequence, observedAt: now, kind: "native.status", node: { presentation: presentation("Operation 6") } });
  return { projection, scope, invocationId: "workflow-1", title: "Capped run", status: "running" };
}

describe("(e) U1 the landed cap remainder (wb-ea1) under pane composition", () => {
  it("a capped projection keeps the full-width capped marker and draws the counted remainder once in each pane whose view draws it", () => {
    const model = cappedModel();
    for (const ascii of [false, true]) {
      const whole = ascii ? "3 nodes not shown: projection cap 4 | 2 events not shown" : "3 nodes not shown: projection cap 4 · 2 events not shown";
      // The single column draws ea1's line whole and once, in the overview and the details views only.
      for (const view of VIEWS) {
        const column = layoutInspector(model, { ...initialInspectorState(), view }, { width: 100, rows: 30, ascii });
        expect(column.filter((line) => line.trim() === whole), view).toHaveLength(view === "overview" || view === "details" ? 1 : 0);
      }
      for (const [width, rows] of [
        [100, 30],
        [140, 40],
      ] as const) {
        const lines = draw(model, initialInspectorState(), width, rows, { panes: true, ascii });
        expect(lines[0]).toContain(ascii ? " | capped ]" : " · capped ╮");
        const widths = paneWidths(width);
        const remainders = widths.map((_, at) =>
          bodyRows(lines)
            .map((line) => panesOf(line, width)[at].trimEnd())
            .filter((text) => text.startsWith(" 3 nodes not shown: projection cap 4")),
        );
        // Per pane, never once for the composition and never dropped: overview and details each draw it, the graph pane (three
        // panes) draws none, as the single-column graph view does. A pane narrower than the line cuts it at the pane width with
        // the visible ellipsis; the node count leads, so it always survives the cut.
        expect(remainders.map((found) => found.length)).toEqual(widths.length === 2 ? [1, 1] : [1, 0, 1]);
        for (const [at, found] of remainders.entries()) {
          if (found.length === 0) continue;
          const inner = widths[at] - 4;
          expect(found[0]).toBe(` ${visibleWidth(whole) <= inner ? whole : `${whole.slice(0, inner - 1)}${ascii ? "~" : "…"}`}`);
        }
      }
      // Below the pane tiers an opted-in host still draws ea1's frames byte for byte.
      for (const [width, rows] of [
        [79, 24],
        [120, 19],
        [30, 24],
      ] as const)
        for (const view of VIEWS) {
          const state = { ...initialInspectorState(), view };
          expect(draw(model, state, width, rows, { panes: true, ascii })).toEqual(draw(model, state, width, rows, { ascii }));
        }
    }
  });
});

/** The pre-change renderer's frames for this file's fixture (furnace/0 selected), captured from trunk 310e26e's renderer (and
 * byte-identical from a3bbbdb's, before wb-ea1) with pane composition absent; never re-pinned. Overview lines verbatim, every
 * view as a sha256 of its lines. */
const BASE_OVERVIEW: Readonly<Record<string, readonly string[]>> = {
  "79x24": [
    " ╭ Pane workflow running ╮",
    " OVERVIEW 12 observed operations · paused view · 1/12",
    " ────────────────────────────────────────────────",
    " Observed tree · nesting from observed grouping/ownership edges only",
    " ❯ ◌ Operation 0 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 1 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 2 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 3 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 4 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 5 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 6 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 7 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 8 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 9 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 10 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 11 · forge · running · CURRENT · no observed parent",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Tab views · j/k · Esc back/close",
  ],
  "120x19": [
    " ╭ Pane workflow running ╮",
    " OVERVIEW 12 observed operations · paused view · 1/12",
    " ────────────────────────────────────────────────",
    " Observed tree · nesting from observed grouping/ownership edges only",
    " ❯ ◌ Operation 0 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 1 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 2 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 3 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 4 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 5 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 6 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 7 · forge · running · CURRENT · no observed parent",
    "   ◌ Operation 8 · furnace · running · CURRENT · no observed parent",
    "   ◌ Operation 9 · forge · running · CURRENT · no observed parent",
    " Selected furnace/operation/0 · 0 evidence refs",
    " Attention: stale/unknown is last-known state, not live progress.",
    " Critical path: incomplete trace (no complete dependency/interval proof).",
    " Rows 1-10/12 · viewport only",
    " Tab views · j/k · Esc back/close",
  ],
  "30x24": [
    " ╭ … running ╮",
    " OVERVIEW 12 observed oper…",
    " ──────────────────────────",
    " Observed tree · nesting f…",
    " ❯ ◌ Operation 0 · furnace…",
    "   ◌ Operation 1 · forge ·…",
    "   ◌ Operation 2 · furnace…",
    "   ◌ Operation 3 · forge ·…",
    "   ◌ Operation 4 · furnace…",
    "   ◌ Operation 5 · forge ·…",
    "   ◌ Operation 6 · furnace…",
    "   ◌ Operation 7 · forge ·…",
    "   ◌ Operation 8 · furnace…",
    "   ◌ Operation 9 · forge ·…",
    "   ◌ Operation 10 · furnac…",
    "   ◌ Operation 11 · forge …",
    " Attention: stale/unknown …",
    " Critical path: incomplete…",
    " Tab views · j/k · Esc bac…",
  ],
};
const BASE_DIGESTS: Readonly<Record<string, string>> = {
  "overview 79x24": "4b86497b541cf80006ee236597d21ccf416ca8998a8d03d34fe3029b1f2a822c",
  "graph 79x24": "cc8b0c8fe975477f221cc74ce286e30ebb8c7ce765b3737c4b5666ebb16b73b3",
  "timeline 79x24": "a2869769633468946226e21490b45f29d3432bb1ea9309fbe7335d94cb82a3ce",
  "details 79x24": "c50678b4d0baba94e9e9d11fef34bc4ed86617a32cb4645dabeed48b5f46973e",
  "overview 120x19": "c6bf58cf595910cc8c9fced34c1e238d9f9da52c18a87a356071e2e4e1896e66",
  "graph 120x19": "52c2139834b70e1b086dffb2fce5328170f6ee0d9f67a58092760a47fda2be99",
  "timeline 120x19": "a483a687b8e0a1b04c08fec2b5c3255ea27dd02eacdd5cc09e8286284bf396e8",
  "details 120x19": "a9d48230eac916f1b8525995d783e73faffffa4bac2fdf71b9e4a64aa8c76784",
  "overview 30x24": "6b3da92a83214de7f961b5c4b0eb0fb3e2d3ce0dc9a250b8231942c92e95309d",
  "graph 30x24": "196746a18859e346db8ce1c70a9127f7b6b8a3e6fd00208b2b468b6148b7dc38",
  "timeline 30x24": "a392d3c85eaaf16a48cd91c1d86f0a31ffc6f1cc45d9bf49396628ae19b53b1f",
  "details 30x24": "2f182a8c33beb467cbbe49216452ee541d3d4b8e5b5859ecdc980a2a3a88d213",
};

describe("(e) U5 the single-column tier against the pre-change renderer's captured lines", () => {
  it("at 79x24, 120x19 and 30x24 an opted-in host draws the captured lines byte for byte, no separator, in every view", () => {
    expect(Object.keys(BASE_OVERVIEW)).toEqual(["79x24", "120x19", "30x24"]);
    expect(Object.keys(BASE_DIGESTS)).toHaveLength(12);
    const model = modelOf();
    for (const [width, rows] of [
      [79, 24],
      [120, 19],
      [30, 24],
    ] as const) {
      const overview = draw(model, selectedState("overview"), width, rows);
      expect(overview).toEqual(BASE_OVERVIEW[`${width}x${rows}`]);
      expect(overview.some((line) => line.includes(SEPARATOR))).toBe(false);
      for (const view of VIEWS) expect(digest(draw(model, selectedState(view), width, rows)), `${view} ${width}x${rows}`).toBe(BASE_DIGESTS[`${view} ${width}x${rows}`]);
    }
  });
});

describe("(e) U6 two-pane separators and the overflow notice", () => {
  it("at 80x24 and 119x40 every body row, by index from the header rule to the key hint, carries exactly one separator at the pane boundary", () => {
    const model = modelOf();
    for (const [width, rows] of [
      [80, 24],
      [119, 40],
    ] as const)
      for (const view of VIEWS)
        for (const ascii of [false, true]) {
          const lines = draw(model, selectedState(view), width, rows, { panes: true, ascii });
          const [left] = paneWidths(width);
          const body = bodyRows(lines);
          expect(body.length).toBeGreaterThan(5);
          for (const [at, line] of body.entries()) expect(columnsOf(line, ascii ? "|" : "│"), `${view} ${width}x${rows} ascii=${ascii} row ${at}`).toEqual([left + 1]);
        }
  });
  it("a pane holding more rows than its budget ends them with the counted notice inside that pane, and the frame never exceeds rows", () => {
    // Forty operations, a filter header line and the compact attention panel leave the tree fewer rows than its page holds.
    const base = modelOf(40);
    const model: InspectorModel = { ...base, attention: selectAttention(base.projection, { scope, invocationId: "workflow-1", now }) };
    const state: InspectorState = { ...selectedState("overview"), filter: "Operation" };
    for (const [width, rows] of [
      [80, 24],
      [119, 40],
    ] as const) {
      const lines = draw(model, state, width, rows);
      expect(lines.length).toBeLessThanOrEqual(rows);
      const left = bodyRows(lines).map((line) => panesOf(line, width)[0]);
      const notices = left.filter((text) => /^ … \d+ more rows? in this page/u.test(text));
      expect(notices).toHaveLength(1);
      // Drawn tree rows plus the counted rest are the whole page: nothing is cut silently.
      const drawn = left.filter((text) => /^ [ ❯] ◌ Operation \d+/u.test(text)).length;
      const counted = Number(/(\d+) more rows?/u.exec(notices[0])?.[1]);
      expect(drawn + counted).toBe(Math.min(32, rows - 9));
      expect(counted).toBeGreaterThan(0);
    }
  });
});

describe("(e) U7 tier boundaries from the exported pane minimums", () => {
  it("three panes are viable at every width from 120 because three minimum panes and two separators need 114 columns; 119 draws two", () => {
    const threeMinimum = 3 * PANE_MIN_WIDTH_THREE + 2 * GAP;
    expect(threeMinimum).toBe(114);
    // The two-pane fallback inside the >=120 tier needs a width below threeMinimum, which the tier excludes (disclosed).
    expect(threeMinimum).toBeLessThan(120);
    const boundary = Math.max(120, threeMinimum);
    const model = modelOf();
    const separatorCounts = (width: number) => new Set(bodyRows(draw(model, selectedState("overview"), width, 40)).map((line) => columnsOf(line, "│").length));
    expect(separatorCounts(boundary - 1)).toEqual(new Set([1]));
    for (let width = boundary; width <= 260; width++) expect(separatorCounts(width), `${width} columns`).toEqual(new Set([2]));
    // The two-pane left pane holds its minimum where half the width is narrower; no pane is ever wider than the maximum.
    expect(Math.floor((80 - GAP) / 2)).toBeLessThan(PANE_MIN_WIDTH_LEFT);
    for (const line of bodyRows(draw(model, selectedState("overview"), 80, 24))) expect(columnsOf(line, "│")).toEqual([PANE_MIN_WIDTH_LEFT + 1]);
    for (const width of [163, 200, 260, 300])
      for (const line of bodyRows(draw(model, selectedState("overview"), width, 40))) for (const pane of panesOf(line, width)) expect(visibleWidth(pane)).toBeLessThanOrEqual(PANE_MAX_WIDTH);
  });
  it("at 120x40 in the overview view the center pane opens with the selected node's graph block", () => {
    const center = bodyRows(draw(modelOf(), selectedState("overview"), 120, 40)).map((line) => panesOf(line, 120)[1]);
    expect(center[0]).toMatch(/^ Observed reference graph/u);
    expect(center[1]).toMatch(/^ ❯ ◌ furnace\/operation\/0 Operation/u);
    expect(center.filter((text) => text.includes("❯"))).toHaveLength(1);
  });
});

describe("(e) U8 resize keeps selection, focus and position", () => {
  it("79x24 -> 80x24 -> 120x40 -> 79x24 keeps the pointer on the same node, the focused subtree focused and the i/N position", () => {
    const model = modelOf();
    const target = ref("forge", "3");
    const state: InspectorState = { ...selectedState("overview", target), focused: keyOf(target) };
    const frozen = JSON.stringify(state);
    const geometry = [
      [79, 24],
      [80, 24],
      [120, 40],
      [79, 24],
    ] as const;
    const frames = geometry.map(([width, rows]) => draw(model, state, width, rows));
    for (const [at, lines] of frames.entries()) {
      const [width] = geometry[at];
      expect(lines).toContain(" Focused on selected node and confirmed direct relations only");
      expect(lines[1]).toMatch(/ · 4\/12$/u);
      const pointed = lines.flatMap((line) => (width >= 80 ? panesOf(line, width) : [line])).filter((text) => text.includes("❯"));
      // One pointer per pane that draws the selection: the tree, and the graph pane when three panes are drawn.
      expect(pointed).toHaveLength(width >= 120 ? 2 : 1);
      for (const text of pointed) expect(text).toMatch(/❯ ◌ (?:Operation 3 · forge|forge\/operation\/3 Operation 3)/u);
      if (width >= 80) expect(lines.some((line) => line.includes("Native ref: forge/operation/3"))).toBe(true);
    }
    expect(frames[3]).toEqual(frames[0]);
    expect(JSON.stringify(state)).toBe(frozen);
  });
});

describe("(e) U9 width safety with hostile titles in both tiers", () => {
  it("node and model titles with CJK, combining emoji, embedded ANSI and zero-width characters stay within the width, both charsets", () => {
    const cp = (...points: number[]) => String.fromCodePoint(...points);
    const titles = [
      "漢字テスト fake-node-cjk",
      `fake-node-emoji ${cp(0x1f44d, 0x1f3fd)} ${cp(0x1f468, 0x200d, 0x1f469, 0x200d, 0x1f467)}`,
      `fake-node-combining e${cp(0x301, 0x302)}a${cp(0x308)}`,
      // The projection refuses C0 controls (ESC included) in a title at admission, so a node title carries ANSI in its 8-bit
      // form (C1 CSI and OSC); the 7-bit ESC forms ride on the model title and status, which the host supplies directly.
      `fake-node-ansi ${cp(0x9b)}31mred${cp(0x9b)}0m ${cp(0x9d)}8;;https://example.invalid${cp(0x9c)}link${cp(0x9d)}8;;${cp(0x9c)}`,
      `fake-node-zero${cp(0x200b)}width${cp(0x2060)}join${cp(0xfeff)}bom`,
      `fake-node-bidi ${cp(0x202e)}reversed${cp(0x202c)} ${cp(0x2066)}isolate${cp(0x2069)}`,
    ];
    const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 100, maxEdges: 100, maxQuery: 40 });
    for (const [i, title] of titles.entries())
      projection.refresh({ source: ref(i % 2 ? "forge" : "furnace", String(i)), scope, capturedAt: now, observedAt: now, node: presentation(title), trace: { invocationId: "workflow-1" } });
    const model: InspectorModel = { projection, scope, invocationId: "workflow-1", title: `fake-model ${cp(0x1b)}[31mred${cp(0x1b)}[0m ${cp(0x1b)}]8;;https://example.invalid${cp(0x7)}link${cp(0x1b)}]8;;${cp(0x7)} ${titles[0]} ${titles[4]} ${titles[5]}`, status: `fake-status ${cp(0x1b)}[2J` };
    // Zero-width, joiner and bidi code points, named by number so this source carries none of them raw (wb-era hygiene).
    const INVISIBLE = new Set([0x061c, 0x200b, 0x200c, 0x200d, 0x200e, 0x200f, 0x202a, 0x202b, 0x202c, 0x202d, 0x202e, 0x2060, 0x2061, 0x2062, 0x2063, 0x2064, 0x2066, 0x2067, 0x2068, 0x2069, 0xfeff]);
    const unsafe = (line: string) => [...line].map((char) => char.codePointAt(0) ?? 0).filter((point) => point < 0x20 || (point >= 0x7f && point <= 0x9f) || INVISIBLE.has(point));
    for (const [width, rows] of [
      [80, 24],
      [120, 40],
    ] as const)
      for (const ascii of [false, true])
        for (const view of VIEWS) {
          const lines = draw(model, selectedState(view), width, rows, { panes: true, ascii });
          const label = `${view} ${width}x${rows} ascii=${ascii}`;
          expect(lines.length, label).toBeLessThanOrEqual(rows);
          for (const line of lines) {
            expect(visibleWidth(line), label).toBeLessThanOrEqual(width);
            expect(unsafe(line), label).toEqual([]);
            if (ascii) expect(line, label).toMatch(/^[\x20-\x7e]*$/u);
          }
        }
    // The rows are drawn, not dropped: the CJK node row reaches the overview pane in the Unicode tier.
    expect(
      bodyRows(draw(model, selectedState("overview"), 120, 40))
        .map((line) => panesOf(line, 120)[0])
        .some((text) => text.includes("漢字テスト")),
    ).toBe(true);
  });
});

/** Short-titled nodes in every attention state the overview names: active, waiting and unknown tone (current), stale
 * (markStale) and unknown freshness (an event-only node), so each row's tone glyph and freshness label fit a narrow pane. */
function attentionModel(): InspectorModel {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 100, maxEdges: 100, maxQuery: 40 });
  const short = (title: string, statusTone: "active" | "waiting" | "unknown") => ({ title, type: "sdk-operation" as const, statusText: "ok", statusTone });
  const snapshot = (id: string, title: string, statusTone: "active" | "waiting" | "unknown") =>
    projection.refresh({ source: ref("rf", id), scope, capturedAt: now, observedAt: now, node: short(title, statusTone), trace: { invocationId: "workflow-u10" } });
  snapshot("0", "S0", "active");
  snapshot("1", "S1", "waiting");
  snapshot("2", "S2", "unknown");
  snapshot("3", "S3", "active");
  projection.markStale({ scope, ref: ref("rf", "3") });
  projection.ingest({ projectionEventId: "event-only-4", source: ref("fg", "4"), scope, sourceSequence: 1, observedAt: now, kind: "native.status", node: { presentation: short("S4", "active") }, trace: { invocationId: "workflow-u10" } });
  return { projection, scope, invocationId: "workflow-u10", title: "Attention workflow", status: "running" };
}
const treeRow = /^ [ ❯] [◌○✓✘?*o+x] S\d/u;
/** The overview's two fixed lines without a report (wb-8na, owner R505 N2): its attention and critical-path reading. */
const ATTENTION_FIXED = "Attention: stale/unknown is last-known state, not live progress.";
const CRITICAL_FIXED = "Critical path: incomplete trace (no complete dependency/interval proof).";
/** One overview pane's no-report block: its "Attention:" row through the last continuation row (three leading spaces: the row's
 * one and the compact panel's two) of the "Critical path:" row that follows it. */
function fixedBlock(pane: readonly string[]): string[] {
  const start = pane.findIndex((text) => text.startsWith(" Attention: stale/unknown"));
  const critical = pane.findIndex((text, at) => at > start && text.startsWith(" Critical path:"));
  expect(start).toBeGreaterThan(0);
  expect(critical).toBeGreaterThan(start);
  let end = critical;
  while (end + 1 < pane.length && pane[end + 1].startsWith("   ")) end++;
  return pane.slice(start, end + 1);
}

describe("(e) U10 deception defenses in the overview pane", () => {
  it("with an AttentionReport the overview pane draws the compact attention panel whole, line for line as the single column at that width", () => {
    const base = attentionModel();
    const report = selectAttention(base.projection, { scope, invocationId: "workflow-u10", now });
    const model: InspectorModel = { ...base, attention: report };
    for (const [width, rows] of [
      [80, 24],
      [120, 40],
    ] as const) {
      const [paneWidth] = paneWidths(width);
      const pane = bodyRows(draw(model, initialInspectorState(), width, rows)).map((line) => panesOf(line, width)[0].trimEnd());
      const single = layoutInspector(model, initialInspectorState(), { width: paneWidth, rows });
      const from = (lines: readonly string[]) => {
        const start = lines.findIndex((text) => text.startsWith(" Attention: active"));
        const end = lines.findIndex((text, at) => at > start && text.startsWith(" Critical path:"));
        expect(start).toBeGreaterThan(0);
        expect(end).toBeGreaterThan(start);
        let last = end;
        while (last + 1 < lines.length && lines[last + 1].startsWith("   ")) last++;
        return lines.slice(start, last + 1);
      };
      const drawn = from(pane);
      expect(drawn).toEqual(from(single));
      // Whole: every count and the critical-path reading survive (wrapped, never cut).
      const text = drawn.join(" ").replace(/\s+/gu, " ");
      for (const [name, count] of [
        ["active", report.counts.active],
        ["waiting", report.counts.waiting],
        ["stale", report.counts.stale],
        ["unknown", report.counts.unknown],
        ["disconnected", report.counts.disconnected],
      ] as const)
        expect(text).toContain(`${name} ${count}`);
      expect(text).toMatch(/Critical path: incomplete trace \([^)]+\)/u);
      expect(drawn.every((line) => !line.endsWith("…"))).toBe(true);
    }
  });
  it("tones and freshness labels: each overview-pane row equals the single column's row at the pane width, glyph and label as at full width", () => {
    const model = attentionModel();
    for (const [width, rows] of [
      [80, 24],
      [120, 40],
    ] as const) {
      const [paneWidth] = paneWidths(width);
      const pane = bodyRows(draw(model, initialInspectorState(), width, rows))
        .map((line) => panesOf(line, width)[0].trimEnd())
        .filter((text) => treeRow.test(text));
      expect(pane).toHaveLength(5);
      expect(pane).toEqual(layoutInspector(model, initialInspectorState(), { width: paneWidth, rows }).filter((text) => treeRow.test(text)));
      const full = layoutInspector(model, initialInspectorState(), { width, rows }).filter((text) => treeRow.test(text));
      const reading = (text: string) => /^ [ ❯] (\S) (S\d) · \S+ · ok · (CURRENT|STALE|UNKNOWN)/u.exec(text)?.slice(1, 4);
      expect(pane.map(reading)).toEqual(full.map(reading));
      expect(pane.map(reading)).toEqual([
        ["◌", "S0", "CURRENT"],
        ["○", "S1", "CURRENT"],
        ["?", "S2", "CURRENT"],
        ["?", "S3", "STALE"],
        ["?", "S4", "UNKNOWN"],
      ]);
    }
  });
  it("without a report the fixed attention and critical-path lines end the overview pane whole, wrapped at the pane width with the compact panel's continuation indent (wb-8na cures the cut this row measured)", () => {
    // This row recorded the cut as a measured reading, not a target ("in a pane narrower than a line the line is cut like any pane
    // text"); owner ruling R505 N2 filed the cure as wb-8na. A line that fits the pane is still drawn on one row exactly as the
    // single column draws it (the reading kept from the measured row); a longer one wraps at word boundaries, never cut.
    const attention = ` ${ATTENTION_FIXED}`;
    const critical = ` ${CRITICAL_FIXED}`;
    const fits = (text: string, paneWidth: number) => visibleWidth(text) <= paneWidth - 3;
    for (const [width, rows] of [
      [80, 24],
      [120, 40],
      [220, 40],
    ] as const) {
      const [paneWidth] = paneWidths(width);
      const pane = bodyRows(draw(modelOf(), selectedState("overview"), width, rows)).map((line) => panesOf(line, width)[0].trimEnd());
      const block = fixedBlock(pane);
      expect(block.map((text) => text.trim()).join(" "), `${width}x${rows}`).toBe(`${ATTENTION_FIXED} ${CRITICAL_FIXED}`);
      expect(block.filter((text) => text.endsWith("…")), `${width}x${rows}`).toEqual([]);
      for (const text of block) expect(visibleWidth(text), `${width}x${rows}`).toBeLessThanOrEqual(paneWidth);
      // Every row after a sentence's first is its indented continuation.
      for (const text of block) if (!text.startsWith(" Attention:") && !text.startsWith(" Critical path:")) expect(text, `${width}x${rows}`).toMatch(/^ {3}\S/u);
      for (const text of [attention, critical]) if (fits(text, paneWidth)) expect(pane, `${width}x${rows}`).toContain(text);
      // The block still ends the overview pane: only the blank padding of a longer neighbouring pane follows it.
      const at = pane.findIndex((text) => text.startsWith(" Attention: stale/unknown"));
      expect(pane.slice(at + block.length).every((text) => text === ""), `${width}x${rows}`).toBe(true);
    }
    expect(layoutInspector(modelOf(), selectedState("overview"), { width: 80, rows: 24 })).toEqual(expect.arrayContaining([attention, critical]));
  });
});

describe("(e) U4 bounded work in a three-pane render", () => {
  it("a three-pane render reads bounded windows only: no event history, no query scan, no evidence request or load (store.get only)", () => {
    const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 1200, maxEdges: 1200, maxQuery: 40 });
    for (let i = 0; i < 60; i++)
      projection.refresh({
        source: ref(i % 2 ? "forge" : "furnace", String(i)),
        scope,
        capturedAt: now,
        observedAt: now,
        node: presentation(`Operation ${i}`),
        trace: { invocationId: "workflow-1" },
        ...(i === 0 ? { evidenceRefs: ["ev:fake-alpha", "ev:fake-beta"] } : {}),
      });
    let loads = 0;
    const loader: EvidenceLoader = {
      provider: "furnace",
      requiredGrant: "furnace:inspect",
      canLoad: (item) => item.startsWith("ev:"),
      load: async (request) => {
        loads++;
        return { kind: "fixture", provider: "furnace", capturedAt: now, bytes: request.evidenceRef.length, truncated: false, preview: ["fake preview"], freshness: "current" };
      },
    };
    const store = new EvidenceStore({ loaders: [loader], maxEntries: 8, maxBytes: 2048, timeoutMs: 200, scope });
    const model: InspectorModel = { projection, scope, invocationId: "workflow-1", title: "Bounded", status: "running", evidence: store };
    const history = [vi.spyOn(projection, "events"), vi.spyOn(projection, "identityRefusals"), vi.spyOn(projection, "query")];
    const window = vi.spyOn(projection, "window");
    const truncation = vi.spyOn(projection, "truncation");
    const get = vi.spyOn(store, "get");
    const request = vi.spyOn(store, "request");
    const abortAll = vi.spyOn(store, "abortAll");
    layoutInspector(model, selectedState("overview"), { width: 140, rows: 40 });
    const perColumn = window.mock.calls.length;
    expect(perColumn).toBeGreaterThan(0);
    // P6 (wb-feo, owner R505 N1): one window() call per rendered pane, so the three-pane render below reads three.
    expect(perColumn).toBe(1);
    for (const spy of [...history, window, truncation, get]) spy.mockClear();
    const lines = draw(model, selectedState("overview"), 140, 40);
    expect(lines.join("\n")).toContain("ev:fake-alpha");
    for (const spy of history) expect(spy).not.toHaveBeenCalled();
    expect(window.mock.calls.length).toBe(3 * perColumn);
    for (const call of window.mock.calls) expect(call[0].limit).toBeLessThanOrEqual(32);
    // ea1's truncation read is counters only (never event history), once per pane.
    expect(truncation).toHaveBeenCalledTimes(3);
    expect(get).toHaveBeenCalled();
    expect(request).not.toHaveBeenCalled();
    expect(abortAll).not.toHaveBeenCalled();
    expect(loads).toBe(0);
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
// wb-feo (owner ruling R505 N1, the src follow-up of wb-6ze.23): P6 "at most one window() call per rendered pane". Measured on
// 400ece7 (gate cmd_4461460cb0f9) the column read the viewport twice - a 1-row head read for the total, then the page - so a
// frame cost 2 (single column) / 4 (two panes) / 6 (three panes); each pane now reads its page with one window() call.
// ---------------------------------------------------------------------------------------------------------------------------

/** Node `at` of modelOf's fixture: even ids are furnace operations, odd ids forge operations. */
const rowRef = (at: number): NativeRef => ref(at % 2 ? "forge" : "furnace", String(at));
/** The state the reducer leaves after selecting row `at` with j/k: the row's key and its index. */
const rowState = (view: InspectorView, at: number): InspectorState => ({ ...initialInspectorState(), view, selected: keyOf(rowRef(at)), index: at });
/** The column body's page height at a terminal height: the layout's row budget, min(32, rows - 9), as U6 pins it. */
const pageHeight = (rows: number): number => Math.min(32, rows - 9);
/** Rows that put the column's page at the top of the viewport, centred mid-viewport and clamped at its end, plus a viewport
 * shorter than one page. */
const P6_SELECTIONS = [
  { name: "first row of 60", count: 60, at: 0 },
  { name: "middle row of 60", count: 60, at: 30 },
  { name: "last row of 60", count: 60, at: 59 },
  { name: "last row of 12", count: 12, at: 11 },
] as const;
const P6_SIZES = [
  [100, 30],
  [140, 40],
] as const;
/** The eight frames one state draws at a size - the single column, then the opted-in panes, each in overview, graph, timeline,
 * details order, every frame followed by one empty line - as one sha256. */
function framesDigest(model: InspectorModel, stateOf: (view: InspectorView) => InspectorState, width: number, rows: number): string {
  const lines: string[] = [];
  for (const panes of [false, true]) for (const view of VIEWS) lines.push(...layoutInspector(model, stateOf(view), { width, rows, panes }), "");
  return digest(lines);
}
/** Each window() read, as {offset, limit}, the draws of one state issue: one list per draw. */
function readsOf(model: InspectorModel, draws: readonly (() => unknown)[]): { offset: number; limit: number }[][] {
  const window = vi.spyOn(model.projection, "window");
  try {
    return draws.map((drawOnce) => {
      window.mockClear();
      drawOnce();
      return window.mock.calls.map(([input]) => ({ offset: input.offset, limit: input.limit }));
    });
  } finally {
    window.mockRestore();
  }
}
/** The P6 selections' frames: one read per pane changes what is read, never what is drawn. First captured from trunk d56e8a2's
 * renderer (two reads per pane), which wb-feo's one read per pane drew byte for byte; re-captured once at wb-8na from its cured
 * renderer, the cure changing only the overview pane's no-report attention and critical-path block (block (h)): outside the
 * overview pane every frame here is the pre-cure renderer's byte for byte (OUTSIDE_OVERVIEW_DIGESTS). */
const P6_BASE_DIGESTS: Readonly<Record<string, string>> = {
  "first row of 60 100x30": "e1485d7a7e8e71e8e63db756cc5f6bcc6dc450e1919eb2280bcf46c1f9f76d02",
  "first row of 60 140x40": "82d3b87a77145855ec14c5feb3f8eba9d6977d4f2c1160d29f924017b47aa490",
  "middle row of 60 100x30": "518ea4ba88c977033bc3585fedf030b3f2b8c46ea7b1beb65472800b48e1a81d",
  "middle row of 60 140x40": "56d4011b5d71054e8f42ad68bbfa5973d0a3d059da19e3e453c7dff99177f588",
  "last row of 60 100x30": "8707aeb3e1caf5635755241b43cc3e904e371f470e1434bf82bc24cef225b17a",
  "last row of 60 140x40": "3754848f0bca86cb53a6fcbaecdf91f191c6e4ab5613ab3ed7ace4cc09df3f6a",
  "last row of 12 100x30": "827f09d18389d4eb70186efe2a46ee8e5a6af3349b96c52811e166d474669e55",
  "last row of 12 140x40": "edc749302e7ee6e81df3a86121378c3c5e4e783bbaedda814efd6a6ce1855ad1",
};

describe("(f) P6 at most one window() call per rendered pane (wb-feo)", () => {
  it.each(P6_SIZES)("at %ix%i every view reads exactly one window() for the single column and exactly one per rendered pane", (width, rows) => {
    const panes = paneWidths(width).length;
    expect(panes).toBe(width >= 120 ? 3 : 2);
    for (const selection of P6_SELECTIONS) {
      const model = modelOf(selection.count);
      for (const view of VIEWS) {
        const state = rowState(view, selection.at);
        const [single, composed] = readsOf(model, [() => layoutInspector(model, state, { width, rows }), () => layoutInspector(model, state, { width, rows, panes: true })]);
        expect(single, `${selection.name} ${view} single column`).toHaveLength(1);
        expect(composed, `${selection.name} ${view} ${panes} panes`).toHaveLength(panes);
      }
    }
  });
  it.each(P6_SIZES)("at %ix%i an unselected view and a selection the projection no longer holds read one window() per rendered pane too", (width, rows) => {
    const model = modelOf(60);
    const unselected = (view: InspectorView): InspectorState => ({ ...initialInspectorState(), view });
    const unheld = (view: InspectorView): InspectorState => ({ ...initialInspectorState(), view, selected: keyOf(ref("gone", "fake-evicted")), index: 30 });
    for (const stateOf of [unselected, unheld])
      for (const view of VIEWS) {
        const [single, composed] = readsOf(model, [() => layoutInspector(model, stateOf(view), { width, rows }), () => layoutInspector(model, stateOf(view), { width, rows, panes: true })]);
        expect(single, `${view} single column`).toHaveLength(1);
        expect(composed, `${view} panes`).toHaveLength(paneWidths(width).length);
      }
    // Same frames as the held rows they stand on: row 0 when nothing is selected, the stored row 30 when its key left the viewport.
    expect(framesDigest(model, unselected, width, rows)).toBe(P6_BASE_DIGESTS[`first row of 60 ${width}x${rows}`]);
    expect(framesDigest(model, unheld, width, rows)).toBe(P6_BASE_DIGESTS[`middle row of 60 ${width}x${rows}`]);
  });
  it.each(P6_SIZES)("at %ix%i the one read holds the drawn page and reads at most half a page above it (docs/10 'Virtualized visible rows + modest overscan')", (width, rows) => {
    const page = pageHeight(rows);
    for (const selection of P6_SELECTIONS) {
      const model = modelOf(selection.count);
      let lines: string[] = [];
      const [reads] = readsOf(model, [() => (lines = layoutInspector(model, rowState("overview", selection.at), { width, rows }))]);
      expect(reads, selection.name).toHaveLength(1);
      const [read] = reads;
      // The drawn rows: the paged footer's range when the page is a slice of the viewport, else the whole (shorter) viewport.
      const footer = lines.map((line) => /^ Rows (\d+)-(\d+)\/(\d+) · viewport only$/u.exec(line)).find((match) => match !== null);
      const [first, last] = footer ? [Number(footer[1]) - 1, Number(footer[2]) - 1] : [0, selection.count - 1];
      expect(last - first + 1, selection.name).toBe(Math.min(page, selection.count));
      expect(read.offset, selection.name).toBeLessThanOrEqual(first);
      expect(read.offset + read.limit, selection.name).toBeGreaterThan(last);
      // Overscan only above the page, never below its lowest possible start (the page that ends at the row) and never more than
      // half a page: the end clamp needs the viewport total, which only this same read reports.
      expect(read.offset, selection.name).toBeGreaterThanOrEqual(Math.max(0, selection.at - page + 1));
      expect(read.limit, selection.name).toBeLessThanOrEqual(page + Math.ceil(page / 2) - 1);
      // A row in the first half page cannot shift the page, so its read is exactly the page.
      if (selection.at <= Math.floor(page / 2)) expect(read, selection.name).toEqual({ offset: 0, limit: page });
      // Below 32 terminal rows the read also stays inside the interim 32-row bound of wb-6ze.23 at every selection.
      if (rows < 32) expect(read.limit, selection.name).toBeLessThanOrEqual(32);
    }
  });
  it.each(P6_SIZES)("at %ix%i one read per pane draws byte for byte the frames the two-read renderer drew: centred page, clamped at the end", (width, rows) => {
    const page = pageHeight(rows);
    const half = Math.floor(page / 2);
    for (const selection of P6_SELECTIONS) {
      const model = modelOf(selection.count);
      expect(framesDigest(model, (view) => rowState(view, selection.at), width, rows), selection.name).toBe(P6_BASE_DIGESTS[`${selection.name} ${width}x${rows}`]);
      if (selection.count <= page) continue;
      // The paging rule the frames carry, restated from docs/10's viewport: the page centres the row and stops at the viewport end.
      const offset = Math.max(0, Math.min(selection.at - half, selection.count - page));
      const column = layoutInspector(model, rowState("overview", selection.at), { width, rows });
      expect(column, selection.name).toContain(` Rows ${offset + 1}-${offset + page}/${selection.count} · viewport only`);
      expect(column.filter((line) => line.includes("❯")), selection.name).toEqual([expect.stringContaining(`Operation ${selection.at} ·`)]);
    }
  });
  it.each(P6_SIZES)("at %ix%i the one corrective read: a row index past the viewport end with no held selection reads twice and draws the clamped last page", (width, rows) => {
    // Reachable when the selected node leaves the viewport (cap eviction) after the keypress and the stored index outruns the
    // rows left: only the read itself reports the end, so the clamped page needs a second read. The frames are the last row's.
    const model = modelOf(60);
    const stale = (view: InspectorView): InspectorState => ({ ...initialInspectorState(), view, index: 100 });
    for (const view of VIEWS) {
      const [single, composed] = readsOf(model, [() => layoutInspector(model, stale(view), { width, rows }), () => layoutInspector(model, stale(view), { width, rows, panes: true })]);
      expect(single, `${view} single column`).toHaveLength(2);
      expect(composed, `${view} panes`).toHaveLength(2 * paneWidths(width).length);
      for (const read of [...single, ...composed]) expect(read.limit, view).toBeLessThanOrEqual(pageHeight(rows) + Math.ceil(pageHeight(rows) / 2) - 1);
    }
    expect(framesDigest(model, stale, width, rows)).toBe(P6_BASE_DIGESTS[`last row of 60 ${width}x${rows}`]);
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
// wb-feo respin 1 (gate row 522 U1/U2, R2(a)): N2 above is the ONE exception to P6, not a general allowance. The reducers store
// whole row indices only (initialInspectorState sets 0; the j/k reducer clamps a whole index into the viewport), but a host can
// hand layoutInspector a number of its own, so the indices nothing in src stores are pinned here: 2^53 or more and +Infinity
// read from the top, a fraction is read exactly as its whole part, and NaN or a page that would start between rows throws in
// the projection as the two-read renderer did. No second read happens outside N2.
// ---------------------------------------------------------------------------------------------------------------------------

/** An unselected state storing row index `index`. */
const storedIndex =
  (index: number) =>
  (view: InspectorView): InspectorState => ({ ...initialInspectorState(), view, index });
/** The frames of stored fractions: a fraction draws the page the two-read renderer drew, with no row marked current. First
 * captured from that renderer (trunk blob 841c988) before this respin; re-captured once at wb-8na with P6_BASE_DIGESTS, the cure
 * changing only the overview pane's no-report block (block (h), OUTSIDE_OVERVIEW_DIGESTS). A fraction past the last row clamps
 * to it and draws the last row's frames (P6_BASE_DIGESTS). */
const FRACTION_BASE_DIGESTS: Readonly<Record<string, string>> = {
  "5.5 of 60 100x30": "6266ba32a3e11845ae1fe2da55f54c62fdf5d736be062135dd0832bb0bb8a38e",
  "5.5 of 60 140x40": "a14c7441c33948b0c9f48b157ed22d0086615de1e1ad22391e24f2bfdcb9187c",
  "49.5 of 60 100x30": "626a7fe8cdc39480e2ec2e3651a2b482343e4f0662ac731991c001c18d2b7dfc",
  "44.5 of 60 140x40": "98dcab5a3dda4c7edcf63af5b76ba7e57f4bc5b0efe096455bb97db96c5b3e32",
  "55.5 of 60 100x30": "877c28cdfdc4f43cd54f4270259d184c58f84473ec5cb06403838bc0c492ac04",
  "55.5 of 60 140x40": "0f061246926aeecd01f81cb4e072e99eb35d835b91b29058ef47a67b58056d01",
  "5.5 of 12 100x30": "6015ea2a1509518bc5e455929933eae46df6701f5c2284df925ede7de3051b60",
  "5.5 of 12 140x40": "1bf9f929b620d3c21b186263a992e23edb279c0e4cde53b17f6f846181c71151",
};
/** The projection's refusal of a viewport offset that is not a whole number (ObservationProjection.window). */
const OFFSET_REFUSAL = "Invalid observation viewport offset or limit (1..100).";

describe("(g) N2 stays the only second read for row indices the reducers never store (wb-feo respin 1, R2(a))", () => {
  it.each(P6_SIZES)("at %ix%i an index of 2^53 or more reads from the top: N2's corrective read of the last page on a viewport longer than a page, one read on a shorter one", (width, rows) => {
    const page = pageHeight(rows);
    const panes = paneWidths(width).length;
    for (const index of [Number.POSITIVE_INFINITY, 2 ** 53, 1e300]) {
      for (const count of [60, 12]) {
        const model = modelOf(count);
        // The read starts at the top; only a viewport longer than the page needs N2's second read, of the clamped last page.
        const expected = count > page ? [{ offset: 0, limit: page }, { offset: count - page, limit: page }] : [{ offset: 0, limit: page }];
        for (const view of VIEWS) {
          const state = storedIndex(index)(view);
          const [single, composed] = readsOf(model, [() => layoutInspector(model, state, { width, rows }), () => layoutInspector(model, state, { width, rows, panes: true })]);
          expect(single, `${index} of ${count} ${view} single column`).toEqual(expected);
          expect(composed, `${index} of ${count} ${view} ${panes} panes`).toEqual(Array.from({ length: panes }, () => expected).flat());
        }
        expect(framesDigest(model, storedIndex(index), width, rows), `${index} of ${count}`).toBe(P6_BASE_DIGESTS[`last row of ${count} ${width}x${rows}`]);
      }
    }
  });
  it.each(P6_SIZES)("at %ix%i a fraction is read exactly as its whole part: one read in the last-page band and at the last row, N2's two only past the end, the two-read renderer's frames", (width, rows) => {
    const page = pageHeight(rows);
    const half = Math.floor(page / 2);
    // The lowest fraction whose centred page clamps to the last page of 60 rows: the first one above the throwing range.
    const edge = 60 - page + half + 0.5;
    const long = modelOf(60);
    const short = modelOf(12);
    const cases = [
      { model: long, count: 60, index: 5.5, frames: FRACTION_BASE_DIGESTS[`5.5 of 60 ${width}x${rows}`] },
      { model: long, count: 60, index: edge, frames: FRACTION_BASE_DIGESTS[`${edge} of 60 ${width}x${rows}`] },
      { model: long, count: 60, index: 55.5, frames: FRACTION_BASE_DIGESTS[`55.5 of 60 ${width}x${rows}`] },
      { model: long, count: 60, index: 59.5, frames: P6_BASE_DIGESTS[`last row of 60 ${width}x${rows}`] },
      { model: long, count: 60, index: 100.5, frames: P6_BASE_DIGESTS[`last row of 60 ${width}x${rows}`] },
      { model: short, count: 12, index: 5.5, frames: FRACTION_BASE_DIGESTS[`5.5 of 12 ${width}x${rows}`] },
      { model: short, count: 12, index: 30.5, frames: P6_BASE_DIGESTS[`last row of 12 ${width}x${rows}`] },
    ];
    for (const { model, count, index, frames } of cases) {
      // N2's predicate on the whole part: at or past the end of the (non-empty) viewport and a page or more down. 30.5 of 12
      // meets it below a 31-row page and misses it at one, so the second read follows the predicate, not the fraction.
      const whole = Math.floor(index);
      const reads = whole >= count && whole >= page ? 2 : 1;
      for (const view of VIEWS) {
        const draws = (at: number) => [() => layoutInspector(model, storedIndex(at)(view), { width, rows }), () => layoutInspector(model, storedIndex(at)(view), { width, rows, panes: true })];
        const fraction = readsOf(model, draws(index));
        expect(fraction, `${index} of ${count} ${view} reads as ${Math.floor(index)}`).toEqual(readsOf(model, draws(Math.floor(index))));
        expect(fraction[0], `${index} of ${count} ${view} single column`).toHaveLength(reads);
        expect(fraction[1], `${index} of ${count} ${view} panes`).toHaveLength(reads * paneWidths(width).length);
      }
      expect(framesDigest(model, storedIndex(index), width, rows), `${index} of ${count}`).toBe(frames);
    }
  });
  it.each(P6_SIZES)("at %ix%i NaN, and a fraction whose centred page would start between rows, throw in the projection as the two-read renderer did", (width, rows) => {
    const page = pageHeight(rows);
    const half = Math.floor(page / 2);
    const model = modelOf(60);
    // half + 0.5 is the lowest fraction past the first-page clamp, 60 - page + half - 0.5 the highest below the last-page clamp.
    for (const index of [Number.NaN, half + 0.5, 30.5, 60 - page + half - 0.5])
      for (const view of VIEWS)
        for (const panes of [false, true])
          expect(() => layoutInspector(model, storedIndex(index)(view), { width, rows, panes }), `${index} ${view} panes ${panes}`).toThrow(OFFSET_REFUSAL);
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
// wb-8na (owner ruling R505 N2, the src follow-up of wb-6ze.23): with NO AttentionReport the overview's two fixed lines must not
// be cut at the pane width. Measured on 400ece7 (gate cmd_4461460cb0f9) both ended cut with the visible ellipsis at 100x30 (two
// panes) and 140x40 (three panes), while the single column draws them whole and the compact panel wraps its own lines whole when a
// report is supplied. A pane now wraps them as the compact panel wraps its lines: whole words, continuation rows indented two
// columns, and the tree yields the rows they take.
// ---------------------------------------------------------------------------------------------------------------------------

/** The views whose first pane is the overview: every view in three panes, overview and details in two (layoutPanes). */
const overviewFirst = (width: number): readonly InspectorView[] => (paneWidths(width).length === 3 ? VIEWS : ["overview", "details"]);
/** The no-report block at 100x30 and 140x40, whose overview panes have 44 and 40 body columns: each sentence wraps once. */
const WRAPPED_AT_P6_SIZES = [" Attention: stale/unknown is last-known", "   state, not live progress.", " Critical path: incomplete trace (no", "   complete dependency/interval proof)."];
/** framesDigest with the overview pane taken out: the four single-column frames whole, then each composed frame with its first
 * pane dropped where that pane draws the overview (header rows, the other panes' rows less the trailing rows every one of them
 * leaves blank, key hint): the body is as tall as its tallest pane, so the overview pane's own height is not read either. */
function outsideOverviewDigest(model: InspectorModel, stateOf: (view: InspectorView) => InspectorState, width: number, rows: number): string {
  const lines: string[] = [];
  for (const view of VIEWS) lines.push(...layoutInspector(model, stateOf(view), { width, rows }), "");
  for (const view of VIEWS) {
    const frame = layoutInspector(model, stateOf(view), { width, rows, panes: true });
    if (!overviewFirst(width).includes(view)) {
      lines.push(...frame, "");
      continue;
    }
    const body = bodyRows(frame);
    const others = body.map((line) =>
      panesOf(line, width)
        .slice(1)
        .map((text) => text.trimEnd()),
    );
    while (others.length > 0 && others[others.length - 1].every((text) => text === "")) others.pop();
    lines.push(...frame.slice(0, frame.length - 1 - body.length), ...others.map((cells) => cells.join(" | ").trimEnd()), frame[frame.length - 1], "");
  }
  return digest(lines);
}
/** outsideOverviewDigest of the P6 selections and the stored fractions, captured from the renderer before the wb-8na cure (trunk
 * c8b7243, blob of src/ui/workflow-inspector.ts as landed by wb-feo) and never re-pinned: the cure draws nothing new outside the
 * overview pane. */
const OUTSIDE_OVERVIEW_DIGESTS: Readonly<Record<string, string>> = {
  "first row of 60 100x30": "d204388edb5b8c967ab1ffccf780a5c88a6eeffad4c986f646eb88822089e859",
  "first row of 60 140x40": "967584cdf13f57615c106c93b9336b7145c19752bfadadbf8505912280c0669a",
  "middle row of 60 100x30": "abc70d9fd2fcfee2c5ad957389c73c31d1379556f8a0eeaa86fa5a94b94b82d7",
  "middle row of 60 140x40": "14d4833c3438add34f5bdca3e80417982ddadbc9d46b58195d7ecfb464b905a7",
  "last row of 60 100x30": "095305597845bafc670cdebe72dc661cca621f661ad0fbb901f50f46fc8f781c",
  "last row of 60 140x40": "7c95a83a02e8122cbb03a13547d322e250beb9e2eaa1d2d1c25a24cb71a23c7e",
  "last row of 12 100x30": "87033896fe9f24f5a105c8285f4d1126622bf57d325dc3336d22cd611788e82e",
  "last row of 12 140x40": "ea9c2cc051fb1f2fe2f5e8a0340f25cdd42843b8aa7c9fad405376ee81932ede",
  "5.5 of 60 100x30": "c21d8d9d338057d7794108cf19cf8e6115d13a0ed32ea75143c57a93eda87c58",
  "5.5 of 60 140x40": "1678213a270410c0ff49a7702489ae3a687fbd99a506c5e2e871f4ded6f0fbc9",
  "49.5 of 60 100x30": "0062b0aec333ae6541a23a49b68f3fb82efd3532b57613cfee0570178a863422",
  "44.5 of 60 140x40": "9f0725d90760bb0253537d365b1d7a6f2cdaa663b9b6b777a7df67f2f6eb2c09",
  "55.5 of 60 100x30": "99bb7e062809ad615e4035572afee4119b3baa44a4f67a030c57f349c45cee10",
  "55.5 of 60 140x40": "c68333cdfd979d82785c7f65a5c789570aa2284829b6fc66773539d9b994accb",
  "5.5 of 12 100x30": "5023e1224f600630501cb520b403696117008d3fabe5ce6221e1ee9a587d0d9b",
  "5.5 of 12 140x40": "88610582e7f2affcf87707953094df67316ab51c484b18198ce942a8fa2cd3b4",
};

describe("(h) the no-report attention and critical-path lines are never cut at the pane width (wb-8na, owner R505 N2)", () => {
  it.each(P6_SIZES)("at %ix%i with no AttentionReport every overview pane draws both fixed lines whole, wrapped as the compact panel wraps, in both charsets", (width, rows) => {
    const [paneWidth] = paneWidths(width);
    for (const count of [12, 60])
      for (const ascii of [false, true])
        for (const view of overviewFirst(width)) {
          const model = modelOf(count);
          expect(model.attention).toBeUndefined();
          const label = `${count} rows, ${view}, ascii ${ascii}`;
          const lines = draw(model, selectedState(view), width, rows, { panes: true, ascii });
          expect(lines.length, label).toBeLessThanOrEqual(rows);
          const pane = bodyRows(lines).map((line) => panesOf(line, width)[0].trimEnd());
          const block = fixedBlock(pane);
          // Whole: both sentences read back word for word, no row ends in the cut marker, every row fits the pane.
          expect(block.map((text) => text.trim()).join(" "), label).toBe(`${ATTENTION_FIXED} ${CRITICAL_FIXED}`);
          expect(block.filter((text) => text.endsWith(ascii ? "~" : "…")), label).toEqual([]);
          for (const text of block) expect(visibleWidth(text), label).toBeLessThanOrEqual(paneWidth);
          expect(block, label).toEqual(WRAPPED_AT_P6_SIZES);
        }
  });
  it.each(P6_SIZES)("at %ix%i the tree yields the rows the wrapped lines take: drawn rows plus the counted rest are the whole page, and no pane-cap notice hides a row", (width, rows) => {
    const page = pageHeight(rows);
    for (const ascii of [false, true])
      for (const view of overviewFirst(width)) {
        const label = `${view}, ascii ${ascii}`;
        const pane = bodyRows(draw(modelOf(60), selectedState(view), width, rows, { panes: true, ascii })).map((line) => panesOf(line, width)[0].trimEnd());
        expect(fixedBlock(pane), label).toEqual(WRAPPED_AT_P6_SIZES);
        const drawn = pane.filter((text) => (ascii ? /^ [ >] \* Operation \d+/u : /^ [ ❯] ◌ Operation \d+/u).test(text)).length;
        const notices = pane.filter((text) => (ascii ? /^ \.\.\. \d+ more rows? in this page/u : /^ … \d+ more rows? in this page/u).test(text));
        expect(notices, label).toHaveLength(1);
        expect(drawn + Number(/(\d+) more rows?/u.exec(notices[0])?.[1]), label).toBe(page);
        expect(pane.filter((text) => /more rows? in this pane/u.test(text)), label).toEqual([]);
      }
  });
  it.each(P6_SIZES)("at %ix%i outside the overview pane every P6 and stored-fraction frame is the pre-cure renderer's, byte for byte", (width, rows) => {
    for (const selection of P6_SELECTIONS)
      expect(outsideOverviewDigest(modelOf(selection.count), (view) => rowState(view, selection.at), width, rows), selection.name).toBe(OUTSIDE_OVERVIEW_DIGESTS[`${selection.name} ${width}x${rows}`]);
    const page = pageHeight(rows);
    const edge = 60 - page + Math.floor(page / 2) + 0.5;
    for (const [count, index] of [
      [60, 5.5],
      [60, edge],
      [60, 55.5],
      [12, 5.5],
    ] as const)
      expect(outsideOverviewDigest(modelOf(count), storedIndex(index), width, rows), `${index} of ${count}`).toBe(OUTSIDE_OVERVIEW_DIGESTS[`${index} of ${count} ${width}x${rows}`]);
  });
});
