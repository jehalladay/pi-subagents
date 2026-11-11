/**
 * wb-usvh (DX P08) cut #1: the rich inspector's keys through the REAL WorkflowDialog host, the component
 * src/ui/workflow-menu.ts showWorkflowDialog hosts unchanged for /agents -> Workflows and the fleet list.
 *
 * Spec lines pinned (docs/workbench/programs/pi-system-dx-triage-2026-11-11/requirements/.work/req-r-ops.md at 0a5ac3a3):
 *  - EAT-R355 "The workflow dialog MUST deliver printable text to an active inspector filter editor before applying
 *    view-toggle shortcuts." Criterion 1: "Assert / then f,o,r,g,e leaves the rich inspector open with filter exactly
 *    forge." Criterion 2: "Assert g outside filter editing still performs the advertised toggle, while Escape exits
 *    editing according to the declared editor contract." (claim C100: typing forge flipped the dialog to the legacy view
 *    at g, because the host matched g before it handed the key to the inspector reducer.)
 *  - EAT-R354 "Inspector row actions MUST resolve the same stable node key used to draw the selected pointer." Criterion 1:
 *    "Assert after production-cap eviction Enter and transcript open target the pointer key, never the prior numeric
 *    offset." Criterion 2: "Assert a deleted selected key is explicitly unavailable/reselected before action and does not
 *    act on an unrelated replacement row." (claim C103: c opened sess-8 while the pointer stayed on sess-5 after the
 *    session-wide FIFO cap evicted three earlier rows.)
 *
 * Every case drives keys through WorkflowDialog.handleInput or reduceInspectorKey and reads what the dialog draws
 * (WorkflowDialog.render) or what the host is handed (onOpenAgent). Nothing here reaches a pty, a producer or the network.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { WorkflowDialog, type WorkflowDialogActions, type WorkflowDialogSource } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorState, initialInspectorState, inspectorEvidenceTarget, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import type { WorkflowAgentEntry, WorkflowEntry } from "../src/workflow/progress.js";

const scope: ObservationScope = { workspace: "workspace", principal: "reader" };
const NOW = "2026-11-11T00:00:00Z";
const RUN = "wf-usvh";
/** The extension's one-projection-per-session limits; the anchor case below reads them from src/index.ts. */
const PRODUCTION_LIMITS = { maxEvents: 4_096, maxNodes: 2_000, maxEdges: 4_000, maxQuery: 40 };

/** Twenty operations whose providers alternate furnace / forge, so the filter "forge" matches exactly the ten forge rows. */
function providerRun(): ObservationProjection {
  const projection = new ObservationProjection(PRODUCTION_LIMITS);
  for (let i = 0; i < 20; i++) {
    projection.refresh({
      source: { provider: i % 2 ? "forge" : "furnace", type: "operation", id: String(i) },
      scope,
      capturedAt: NOW,
      observedAt: NOW,
      node: { title: `Operation ${i}`, type: "sdk-operation", statusText: "running", statusTone: "active" },
      trace: { invocationId: RUN },
      coverage: "partial",
    });
  }
  return projection;
}
/** One Claude session row; `withEvidence` gives it one evidence reference, ev-<i>, for the details view's load action. */
function addSession(projection: ObservationProjection, i: number, withEvidence = false): void {
  projection.refresh({
    source: { provider: "claude-agent-sdk", type: "session", id: `sess-${i}` },
    scope,
    capturedAt: NOW,
    observedAt: NOW,
    node: { title: `agent ${i}`, type: "agent", statusText: "observed-running", statusTone: "active" },
    trace: { invocationId: RUN },
    coverage: "partial",
    ...(withEvidence ? { evidenceRefs: [`ev-${i}`] } : {}),
  });
}
/** A run of Claude sessions sess-0 .. sess-(count-1); at 2000 rows the production cap is full and the next row evicts sess-0. */
function sessionRun(count: number, withEvidence = false): ObservationProjection {
  const projection = new ObservationProjection(PRODUCTION_LIMITS);
  for (let i = 0; i < count; i++) addSession(projection, i, withEvidence);
  return projection;
}
/** The read side of an evidence store: enough for the details view's Enter to name a load; nothing is ever fetched here. */
const evidenceStub = (): NonNullable<InspectorModel["evidence"]> => ({
  get: () => ({ state: "not-requested" }),
  request: () => Promise.resolve(),
  abortAll: () => {},
});
const modelOf = (projection: ObservationProjection): InspectorModel => ({ projection, scope, invocationId: RUN, title: "Probe workflow", status: "running" });
const keyAt = (model: InspectorModel, offset: number): string | undefined =>
  model.projection.window({ scope, invocationId: RUN, offset, limit: 1 }).nodes[0]?.key;

const legacyAgent: WorkflowAgentEntry = { type: "workflow_agent", index: 0, label: "agent-0", state: "start", phaseIndex: 0 };
const theme = { fg: (_color: string, text: string) => text, bold: (text: string) => text };
interface Hosted {
  dialog: WorkflowDialog;
  done: ReturnType<typeof vi.fn>;
  frame(): string[];
}
/** The real dialog on a live run, the way the inspector tests host it: a fake TUI that only counts render requests. */
function host(model: InspectorModel, progress: readonly WorkflowEntry[], actions: WorkflowDialogActions = {}): Hosted {
  const done = vi.fn();
  const source = (): WorkflowDialogSource => ({ progress, task: { status: "running", workflowName: "Probe", startTime: 1 }, observation: model });
  const dialog = new WorkflowDialog({ requestRender: vi.fn(), terminal: { rows: 40, columns: 120 } } as never, source, theme as never, done, actions);
  return { dialog, done, frame: () => dialog.render(108) };
}
const type = (hosted: Hosted, keys: readonly string[]): void => {
  for (const key of keys) hosted.dialog.handleInput(key);
};
/** What the operator sees: the view the dialog draws (an inspector view name, or the legacy dialog) and the filter line. */
function seen(hosted: Hosted): { view: string; filter: string | null } {
  const lines = hosted.frame();
  const head = lines[1]?.trim().split(/\s+/u)[0] ?? "";
  const view = ["OVERVIEW", "GRAPH", "TIMELINE", "DETAILS"].includes(head) ? head : lines.some(line => line.includes("Phases")) ? "legacy" : "unknown";
  return { view, filter: lines.find(line => line.includes("Filter (viewport):"))?.trim() ?? null };
}
/** The overview line the pointer is drawn on. */
const pointer = (hosted: Hosted): string | undefined => hosted.frame().find(line => line.includes("❯"))?.trim();
const ESCAPE = "\u001b";
const CTRL_C = "\u0003";

describe("EAT-R355 the inspector's filter editor takes printable keys before the dialog host's view toggles", () => {
  it("R355-C1a: on a run with agent rows, Tab then / f o r g e leaves the rich inspector open with the filter exactly forge", () => {
    const hosted = host(modelOf(providerRun()), [legacyAgent], { onKill: vi.fn() });
    expect(seen(hosted).view).toBe("legacy");
    type(hosted, ["\t"]);
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: null });
    type(hosted, ["/", "f", "o", "r", "g", "e"]);
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: "Filter (viewport): forge_" });
    // The filter is applied, not only echoed: every listed row is one of the ten forge rows.
    const rows = hosted.frame().filter(line => /Operation \d+ ·/u.test(line));
    expect(rows).toHaveLength(10);
    expect(rows.every(line => line.includes("· forge ·"))).toBe(true);
    hosted.dialog.dispose();
  });

  it("R355-C1b: on a rich-only run (no agent rows), / f o r g e types forge instead of losing the g to the host toggle", () => {
    const hosted = host(modelOf(providerRun()), []);
    type(hosted, ["/", "f", "o", "r", "g", "e"]);
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: "Filter (viewport): forge_" });
    hosted.dialog.dispose();
  });

  it("R355-C2a: Escape ends editing without closing (the filter stays forge), then g toggles to the legacy dialog and back", () => {
    const hosted = host(modelOf(providerRun()), [legacyAgent], { onKill: vi.fn() });
    type(hosted, ["\t", "/", "f", "o", "r", "g", "e", ESCAPE]);
    expect(hosted.done).not.toHaveBeenCalled();
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: "Filter (viewport): forge" });
    type(hosted, ["g"]);
    expect(seen(hosted).view).toBe("legacy");
    type(hosted, ["g"]);
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: "Filter (viewport): forge" });
    hosted.dialog.dispose();
  });

  it("R355-C2b: outside filter editing g is still the advertised toggle, and a filter ended by Escape no longer holds g back", () => {
    const hosted = host(modelOf(providerRun()), [legacyAgent], { onKill: vi.fn() });
    type(hosted, ["\t"]);
    expect(seen(hosted).view).toBe("OVERVIEW");
    type(hosted, ["g"]);
    expect(seen(hosted).view).toBe("legacy");
    type(hosted, ["g", "/", "x", ESCAPE]);
    expect(seen(hosted)).toEqual({ view: "OVERVIEW", filter: "Filter (viewport): x" });
    type(hosted, ["g"]);
    expect(seen(hosted).view).toBe("legacy");
    hosted.dialog.dispose();
  });

  it("R355-C2c: Ctrl-C while the filter editor is open still closes the dialog and never stops the run", () => {
    const onKill = vi.fn();
    const hosted = host(modelOf(providerRun()), [], { onKill });
    type(hosted, ["/", "g", CTRL_C]);
    expect(hosted.done).toHaveBeenCalledTimes(1);
    expect(onKill).not.toHaveBeenCalled();
    hosted.dialog.dispose();
  });
});

describe("EAT-R354 inspector row actions act on the key the pointer is drawn on", () => {
  it("R354-A0: the fixture's limits are the extension's own projection limits (src/index.ts), so the cap evicts as production does", () => {
    const index = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
    expect(index).toContain("export const WORKBENCH_PROJECTION_MAX_QUERY = 40;");
    expect(index).toContain(
      "new ObservationProjection({ maxEvents: 4_096, maxNodes: 2_000, maxEdges: 4_000, maxQuery: WORKBENCH_PROJECTION_MAX_QUERY })",
    );
  });

  it("R354-C1a: after the cap evicts three earlier rows, c opens the transcript of the pointer row sess-5, never the old offset's sess-8", () => {
    const projection = sessionRun(2_000);
    const opened: string[] = [];
    const hosted = host(modelOf(projection), [], { onOpenAgent: id => opened.push(id) });
    type(hosted, ["j", "j", "j", "j", "j"]);
    expect(pointer(hosted)).toMatch(/ agent 5 ·/u);
    for (let i = 2_000; i < 2_003; i++) addSession(projection, i);
    expect(projection.truncation({ scope, invocationId: RUN }).nodes).toBe(3);
    expect(pointer(hosted)).toMatch(/ agent 5 ·/u);
    type(hosted, ["c"]);
    expect(opened).toEqual(["claude:sess-5"]);
    hosted.dialog.dispose();
  });

  it("R354-C1b: after the same eviction, Enter collapses the pointer row sess-5 and the pointer stays on it", () => {
    const projection = sessionRun(2_000);
    const model = modelOf(projection);
    let state: InspectorState = initialInspectorState();
    for (let i = 0; i < 5; i++) state = reduceInspectorKey("j", state, model)?.state ?? state;
    const five = keyAt(model, 5);
    expect(state.selected).toBe(five);
    for (let i = 2_000; i < 2_003; i++) addSession(projection, i);
    const outcome = reduceInspectorKey("\r", state, model);
    expect(outcome?.action).toBeUndefined();
    expect(outcome?.state.collapsed).toEqual([five]);
    expect(outcome?.state.selected).toBe(five);
    // Through the host: the pointer is still drawn on agent 5 after Enter.
    const hostedRun = sessionRun(2_000);
    const hosted = host(modelOf(hostedRun), []);
    type(hosted, ["j", "j", "j", "j", "j"]);
    for (let i = 2_000; i < 2_003; i++) addSession(hostedRun, i);
    type(hosted, ["\r"]);
    expect(pointer(hosted)).toMatch(/ agent 5 ·/u);
    hosted.dialog.dispose();
  });

  it("R354-C1c (control): with no eviction, c opens the pointer row's transcript", () => {
    const opened: string[] = [];
    const hosted = host(modelOf(sessionRun(40)), [], { onOpenAgent: id => opened.push(id) });
    type(hosted, ["j", "j", "c"]);
    expect(pointer(hosted)).toMatch(/ agent 2 ·/u);
    expect(opened).toEqual(["claude:sess-2"]);
    hosted.dialog.dispose();
  });

  it("R354-C1d: when the pointer row is a session and the row at the old offset is not, c still opens the pointer row's transcript", () => {
    // Even rows are Claude sessions, odd rows plain operations: after three evictions the selected sess-4 sits at offset 1 and
    // offset 4 holds operation 7, so a c gated on the stale offset would see no session and open nothing.
    const projection = new ObservationProjection(PRODUCTION_LIMITS);
    for (let i = 0; i < 2_000; i++) {
      if (i % 2 === 0) addSession(projection, i);
      else
        projection.refresh({
          source: { provider: "forge", type: "operation", id: `op-${i}` },
          scope,
          capturedAt: NOW,
          observedAt: NOW,
          node: { title: `operation ${i}`, type: "sdk-operation", statusText: "running", statusTone: "active" },
          trace: { invocationId: RUN },
          coverage: "partial",
        });
    }
    const model = modelOf(projection);
    const opened: string[] = [];
    const hosted = host(model, [], { onOpenAgent: id => opened.push(id) });
    type(hosted, ["j", "j", "j", "j"]);
    expect(pointer(hosted)).toMatch(/ agent 4 \u00b7/u);
    for (let i = 2_000; i < 2_003; i++) addSession(projection, i);
    expect(pointer(hosted)).toMatch(/ agent 4 \u00b7/u);
    expect(model.projection.window({ scope, invocationId: RUN, offset: 4, limit: 1 }).nodes[0]?.nativeRef.id).toBe("op-7");
    type(hosted, ["c"]);
    expect(opened).toEqual(["claude:sess-4"]);
    hosted.dialog.dispose();
  });

  it("R354-C2a: a selected key the cap deleted opens nothing on the first c, which reselects the drawn row; the next c opens that row", () => {
    const projection = sessionRun(2_000);
    const model = modelOf(projection);
    const opened: string[] = [];
    const hosted = host(model, [], { onOpenAgent: id => opened.push(id) });
    type(hosted, ["j", "j", "j", "j", "j"]);
    const gone = keyAt(model, 5);
    // Six arrivals evict sess-0 .. sess-5: the selected row itself leaves the projection.
    for (let i = 2_000; i < 2_006; i++) addSession(projection, i);
    expect(gone).toBeDefined();
    expect(projection.indexOf({ scope, invocationId: RUN, key: gone ?? "" })).toBeUndefined();
    expect(pointer(hosted)).toMatch(/ agent 11 ·/u);
    type(hosted, ["c"]);
    expect(opened).toEqual([]);
    type(hosted, ["c"]);
    expect(opened).toEqual(["claude:sess-11"]);
    hosted.dialog.dispose();
  });

  it("R354-C2b: on a deleted selected key the reducer's c and Enter act on nothing and reselect the row drawn at the pointer", () => {
    const projection = sessionRun(2_000);
    const model = modelOf(projection);
    let state: InspectorState = initialInspectorState();
    for (let i = 0; i < 5; i++) state = reduceInspectorKey("j", state, model)?.state ?? state;
    for (let i = 2_000; i < 2_006; i++) addSession(projection, i);
    const drawn = keyAt(model, 5);
    expect(drawn).toBeDefined();
    expect(drawn).not.toBe(state.selected);
    const transcript = reduceInspectorKey("c", state, model);
    expect(transcript?.action).toBeUndefined();
    expect(transcript?.state.selected).toBe(drawn);
    const enter = reduceInspectorKey("\r", state, model);
    expect(enter?.action).toBeUndefined();
    expect(enter?.state.collapsed).toEqual([]);
    expect(enter?.state.selected).toBe(drawn);
    // Once reselected, the next Enter acts on that explicitly selected row.
    const next = reduceInspectorKey("\r", enter?.state ?? state, model);
    expect(next?.state.collapsed).toEqual([drawn]);
  });

  it("R354-C2c: in the details view, Enter on a deleted selected key names no evidence load and reselects the drawn row first", () => {
    const projection = sessionRun(2_000, true);
    const model: InspectorModel = { ...modelOf(projection), evidence: evidenceStub() };
    let state: InspectorState = { ...initialInspectorState(), view: "details" };
    for (let i = 0; i < 5; i++) state = reduceInspectorKey("j", state, model)?.state ?? state;
    // Control: while the selected key resolves, Enter names the load of the pointer row's own reference.
    expect(reduceInspectorKey("\r", state, model)?.action).toBe("load-evidence");
    expect(inspectorEvidenceTarget(model, state)?.evidenceRef).toBe("ev-5");
    for (let i = 2_000; i < 2_006; i++) addSession(projection, i, true);
    const drawn = keyAt(model, 5);
    const enter = reduceInspectorKey("\r", state, model);
    expect(enter?.action).toBeUndefined();
    expect(enter?.state.selected).toBe(drawn);
    const next = reduceInspectorKey("\r", enter?.state ?? state, model);
    expect(next?.action).toBe("load-evidence");
    expect(inspectorEvidenceTarget(model, next?.state ?? state)?.evidenceRef).toBe("ev-11");
  });
});
