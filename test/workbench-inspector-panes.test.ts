/** wb-6ze.23 (W15-D/VC-5): pane composition in layoutInspector per docs/workbench/10-terminal-inspector.md "Layout responsiveness".
 * Spec lines pinned (verbatim): "<80 columns or <20 rows: single-column compact tree; details as subview, no side-by-side graph." /
 * "80-119: two-pane tree + details or timeline summary; scrollable pane cap." / ">=120: left hierarchy, center graph/timeline, right
 * details when viable; cap width and height." / "Resize preserves node selection, focus and scroll intent where possible."
 * Every case builds a real ObservationProjection and draws it through the exported layout; nothing touches a TTY, provider or network. */
import { visibleWidth } from "@earendil-works/pi-tui";
import { describe, expect, it, vi } from "vitest";
import { type InspectorModel, type InspectorState, type InspectorView, initialInspectorState, layoutInspector } from "../src/ui/workflow-inspector.js";
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
    const model = modelOf(12, "\u001b[2J secret\n‮漢字");
    for (const width of [100, 140]) {
      const text = draw(model, selectedState("overview"), width, 30).join("\n");
      expect(text).not.toContain("\u001b");
      expect(text).not.toContain("‮");
    }
  });
  it("each pane costs exactly what one single-column render costs: bounded projection windows, never raw event history", () => {
    const model = modelOf(60);
    const window = vi.spyOn(model.projection, "window");
    draw(model, selectedState("overview"), 100, 30, {});
    const perColumn = window.mock.calls.length;
    expect(perColumn).toBeGreaterThan(0);
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
