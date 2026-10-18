/**
 * W15-B4w/VC-5 (wb-6ze.35): the dialog/host wiring supplies the workbench.timeline/v1 lane model to the inspector timeline view.
 * The selector (wb-6ze.6, buildTimelineLanes in src/workbench/timeline.ts) and the renderer (wb-6ze.26, the timeline branch of
 * src/ui/workflow-inspector.ts) are landed and untouched: every row drives the real host seam, showWorkflowDialog in
 * src/ui/workflow-menu.ts, over a real ObservationProjection and the real WorkflowDialog, and reads the lines the operator sees.
 * Each row quotes the bead acceptance (docs/workbench/10 § Four views, Timeline; docs/workbench/02 WB-010) or a ruling bound on
 * wb-6ze.26 that this wiring inherits: a TimelineModel is never requested from an out-of-contract zoom and the selector's
 * validation throw is never silently caught (zoom-clamp constraint), and header zoom/pan are correct only because the wiring
 * rebuilds the model when the request changes (F5).
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_TIMELINE_COLUMNS } from "../src/index.js";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorState, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { buildTimelineLanes, MAX_ZOOM, TIMELINE_CONTRACT, type TimelineRequest } from "../src/workbench/timeline.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";

const scope: ObservationScope = { workspace: "/workspace/timeline-wiring", principal: "local-operator:1000:session-timeline" };
const RUN = "wf_timelinewire1";
const TITLE = "timeline wiring";
const WIDTH = 120;
const ROWS = 40;
/** The read cap the rows build their projection with and hand the host seam, as src/index.ts does with WORKBENCH_PROJECTION_MAX_QUERY. */
const CAP = 40;
/** The bar viewport the rows hand the host seam, as src/index.ts does with WORKBENCH_TIMELINE_COLUMNS; no row depends on the two being equal. */
const COLUMNS = 30;
const ESC = String.fromCharCode(0x1b);
const TAB = "\t";
const ZOOM_IN = "=";
const ZOOM_OUT = "-";
const PAN_RIGHT = "l";
const DOWN = "j";
const FOCUS = "f";
const FILTER = "/";
const ENTER = "\r";
/** Tab cycles overview -> graph -> timeline -> details. */
const TIMELINE: readonly string[] = [TAB, TAB];
const at = (seconds: number): string => new Date(Date.UTC(2026, 9, 15, 12, 0, seconds)).toISOString();
const ref = (id: string, provider = "furnace"): NativeRef => ({ provider, type: "operation", id });

interface Seed {
  id: string;
  provider?: string;
  title?: string;
  start?: number;
  end?: number;
}
/** An observed operation. In the run it is a viewport row of the inspector; beside the run it is observed but not a row. */
function observe(projection: ObservationProjection, seed: Seed, inRun = true): void {
  projection.refresh({
    source: ref(seed.id, seed.provider), scope, capturedAt: at(0), observedAt: at(0),
    node: { title: seed.title ?? `Operation ${seed.id}`, type: "sdk-operation", statusText: "running", statusTone: "active" },
    ...(inRun ? { trace: { invocationId: RUN } } : {}),
    ...(seed.start !== undefined ? { interval: { startedAt: at(seed.start), ...(seed.end !== undefined ? { endedAt: at(seed.end) } : {}) } } : {}),
  });
}
function relate(projection: ObservationProjection, from: NativeRef, to: NativeRef, kind: RelationKind, nativeConfirmationRef?: string): void {
  projection.relate({
    scope, from, to, kind,
    provenance: { source: "furnace", observedAt: at(0), ...(nativeConfirmationRef !== undefined ? { nativeConfirmationRef } : {}) },
  });
}
/** A run in three lanes: a furnace run that owns two attempts (native-confirmed ownership), the run itself, two forge operations. */
function laned(): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: CAP });
  observe(projection, { id: "run", title: "Run", start: 0, end: 8 });
  observe(projection, { id: "a1", title: "Attempt one", start: 0, end: 4 });
  observe(projection, { id: "a2", title: "Attempt two", start: 1, end: 3 });
  observe(projection, { id: "f1", provider: "forge", title: "Forge verify", start: 2 });
  observe(projection, { id: "f2", provider: "forge", title: "Forge publish" });
  relate(projection, ref("run"), ref("a1"), "ownership", "furnace:run/frn-run-fixture");
  relate(projection, ref("run"), ref("a2"), "ownership", "furnace:run/frn-run-fixture");
  return projection;
}
const LANED_ROWS = 5;

function runTask(): WorkflowTask {
  const task = createWorkflowTask({ id: RUN, script: "return 1;", meta: { name: TITLE, description: "fixture run" } });
  task.observationScope = { ...scope, sessionId: "session-timeline" };
  return task;
}
function controlled(task: WorkflowTask) {
  const control = { pause: vi.fn(), resume: vi.fn(), isPaused: vi.fn(() => false), skip: vi.fn(() => true), retry: vi.fn(() => true) };
  task.control = control;
  return control;
}

type HostObservation = NonNullable<WorkflowMenuDeps["observation"]>;
/** What src/index.ts hands the menu. "undeclared" is a host that states no such value for its projection. */
function observationOf(
  projection: ObservationProjection,
  options: { relationPage?: number | "undeclared"; timelineColumns?: number | "undeclared"; evidence?: EvidenceStore } = {},
): HostObservation {
  const page = options.relationPage ?? CAP;
  const columns = options.timelineColumns ?? COLUMNS;
  return {
    projection,
    scope: task => (task.observationScope ? { workspace: task.observationScope.workspace, principal: task.observationScope.principal } : undefined),
    ...(page === "undeclared" ? {} : { relationPage: page }),
    ...(columns === "undeclared" ? {} : { timelineColumns: columns }),
    ...(options.evidence !== undefined ? { evidence: options.evidence } : {}),
  };
}
function depsOf(observation: HostObservation | undefined) {
  return {
    tasks: new Map<string, WorkflowTask>(),
    ...(observation !== undefined ? { observation } : {}),
    getRecord: vi.fn(() => undefined),
    viewAgentConversation: vi.fn(async () => {}),
    viewClaudeTranscript: vi.fn(async () => {}),
    getCtx: () => undefined,
  } satisfies WorkflowMenuDeps;
}

type Factory = (tui: unknown, theme: unknown, keybindings: unknown, done: (result: undefined) => void) => WorkflowDialog;
const tuiOf = (rows: number) => ({ requestRender: () => {}, terminal: { columns: WIDTH, rows } });
const theme = { fg: (_color: string, text: string) => text, bold: (text: string) => text };
interface Opened {
  dialog: WorkflowDialog;
  notify: ReturnType<typeof vi.fn>;
  /** Settles when the dialog closes itself, as the overlay's `done` does. */
  closed: Promise<void>;
  press(...keys: readonly string[]): void;
  lines(width?: number): string[];
}
const live: WorkflowDialog[] = [];
afterEach(() => {
  for (const dialog of live.splice(0)) dialog.dispose();
  vi.restoreAllMocks();
});
/** Open the run through the host seam exactly as /agents -> Workflows does, with an overlay that stays up. */
async function openRun(task: WorkflowTask, deps: WorkflowMenuDeps, rows = ROWS): Promise<Opened> {
  const notify = vi.fn();
  let opened: (dialog: WorkflowDialog) => void = () => {};
  const ready = new Promise<WorkflowDialog>(resolve => {
    opened = resolve;
  });
  const custom = (factory: Factory): Promise<undefined> =>
    new Promise<undefined>(done => {
      opened(factory(tuiOf(rows), theme, undefined, done));
    });
  const closed = showWorkflowDialog(ctx({ ui: { notify, custom } }), task, deps);
  const dialog = await Promise.race([ready, closed.then(() => undefined)]);
  if (dialog === undefined) throw new Error("the host closed the dialog before showing it");
  live.push(dialog);
  return {
    dialog, notify, closed,
    press: (...keys) => {
      for (const key of keys) dialog.handleInput(key);
    },
    lines: (width = WIDTH) => dialog.render(width),
  };
}

/** The observation the host hands the inspector before any lane model: what the timeline view draws today. */
const unwired = (projection: ObservationProjection): InspectorModel => ({ projection, scope, invocationId: RUN, title: TITLE, status: "running" });
/** The inspector state the dialog reaches by these keys, through the same reducer. */
function stateAfter(projection: ObservationProjection, keys: readonly string[]): InspectorState {
  let state = initialInspectorState();
  for (const key of keys) state = reduceInspectorKey(key, state, unwired(projection))?.state ?? state;
  return state;
}
/** The request the bead names for the current window, zoom and pan, at the host's declared page and viewport. */
const requestOf = (over: Partial<TimelineRequest> = {}): TimelineRequest => ({
  scope, invocationId: RUN, offset: 0, limit: CAP, zoom: 1, pan: 0, columns: COLUMNS, relationLimit: CAP, ...over,
});
/** Exactly what the landed renderer draws for the model the landed selector builds from that request. */
function drawn(projection: ObservationProjection, keys: readonly string[], over: Partial<TimelineRequest> = {}, width = WIDTH, rows = ROWS): string[] {
  const timeline = buildTimelineLanes(projection, requestOf(over));
  return layoutInspector({ ...unwired(projection), timeline }, stateAfter(projection, keys), { width, rows });
}
/** The timeline view the unwired dialog draws today, for the same keys. */
const fallback = (projection: ObservationProjection, keys: readonly string[], width = WIDTH, rows = ROWS): string[] =>
  layoutInspector(unwired(projection), stateAfter(projection, keys), { width, rows });

describe('(a) docs/workbench/10 § Four views, Timeline: "relative interval lanes grouped by owner/phase/provider, zoom and horizontal pan, observed waiting/executing/blocked periods and concurrency."', () => {
  it("with a projection present the host supplies the workbench.timeline/v1 model: the timeline view draws buildTimelineLanes over the live projection", async () => {
    const projection = laned();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(...TIMELINE);
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection, TIMELINE));
    // The lane model takes the place of the flat interval list the unwired view draws.
    expect(lines).not.toEqual(fallback(projection, TIMELINE));
    expect(lines.some(line => line.includes(TIMELINE_CONTRACT))).toBe(true);
    expect(lines).toContain(" ▌ Run · ownership · confirmed · 2 rows");
    expect(lines).toContain(" ▌ forge · provider · unconfirmed · 2 rows");
    expect(lines.filter(line => line.includes("timing unavailable"))).toEqual([]);
  });

  it("F5 (bound on wb-6ze.26): header zoom and pan, and every bar, follow the inspector state because the model is rebuilt for the new request", async () => {
    const projection = laned();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(...TIMELINE);
    const before = run.lines();
    const keys = [ZOOM_IN, ZOOM_IN, PAN_RIGHT, PAN_RIGHT, PAN_RIGHT];
    run.press(...keys);
    const after = run.lines();
    expect(after).toEqual(drawn(projection, [...TIMELINE, ...keys], { zoom: 4, pan: 3 }));
    expect(after.some(line => line.includes("zoom 4x · pan 3"))).toBe(true);
    expect(before.some(line => line.includes("zoom 1x · pan 0"))).toBe(true);
    // Not only the header: the bars are the ones the selector lays out at zoom 4, pan 3.
    expect(after.filter(line => line.includes("│"))).not.toEqual(before.filter(line => line.includes("│")));
  });

  it("the window is the page of the host's read cap that holds the row the inspector draws as current, so the pointer row is always in the model", async () => {
    const projection = new ObservationProjection({ maxQuery: CAP });
    const total = CAP + 5;
    for (let i = 0; i < total; i++) observe(projection, { id: `r${String(i).padStart(2, "0")}`, start: i, end: i + 1 });
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(...TIMELINE);
    const first = run.lines();
    expect(first).toEqual(drawn(projection, TIMELINE));
    expect(first.some(line => line.startsWith(" Truncated window:"))).toBe(true);
    const down = Array.from({ length: CAP + 2 }, () => DOWN);
    run.press(...down);
    const later = run.lines();
    expect(later).toEqual(drawn(projection, [...TIMELINE, ...down], { offset: CAP }));
    expect(later.filter(line => line.startsWith(" ❯ ")).map(line => line.includes(`Operation r${CAP + 2}`))).toEqual([true]);
  });
});

describe("(b) the model is recomputed only on a projection revision or a window/zoom/pan request change", () => {
  /**
   * The selector reads one incoming relation page per window row and nothing else in this view reads one, so the reads a
   * redraw makes count the models it builds. Only reads inside the dialog's own render are counted: the expected lines
   * each row computes through the same projection are not.
   */
  function counted(projection: ObservationProjection, run: Opened): { render(): string[]; builds(): number } {
    const relations = vi.spyOn(projection, "relations");
    const pages = vi.spyOn(projection, "relationsPage");
    const reads = (): number => [...relations.mock.calls, ...pages.mock.calls].filter(([input]) => input.to !== undefined && input.limit === CAP).length;
    let made = 0;
    return {
      render: () => {
        const before = reads();
        const lines = run.lines();
        made += reads() - before;
        return lines;
      },
      builds: () => made / LANED_ROWS,
    };
  }

  it("two redraws at the same revision and request build once; a revision bump, a relation and each zoom or pan change build once more; selection, focus and filter build nothing", async () => {
    const projection = laned();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    const { render, builds } = counted(projection, run);
    run.press(...TIMELINE);
    render();
    render();
    render();
    expect(builds()).toBe(1);
    // A node update is a new projection revision with the relation revision unmoved: one build, and the redraw shows it.
    const topology = projection.relationRevision();
    observe(projection, { id: "f1", provider: "forge", title: "Forge verify", start: 2, end: 9 });
    expect(projection.relationRevision()).toBe(topology);
    const updated = render();
    render();
    expect(builds()).toBe(2);
    expect(updated).toEqual(drawn(projection, TIMELINE));
    expect(updated.filter(line => line.includes("Forge verify")).map(line => line.includes("7000ms"))).toEqual([true]);
    // A relation observed is a new topology revision: one build, and the lanes follow it.
    relate(projection, ref("f2", "forge"), ref("f1", "forge"), "grouping");
    expect(projection.relationRevision()).toBe(topology + 1);
    const regrouped = render();
    render();
    expect(builds()).toBe(3);
    expect(regrouped).toEqual(drawn(projection, TIMELINE));
    expect(regrouped).not.toEqual(updated);
    // Zoom and pan are the request: one build each.
    run.press(ZOOM_IN);
    render();
    render();
    expect(builds()).toBe(4);
    run.press(PAN_RIGHT);
    render();
    expect(builds()).toBe(5);
    // Selection inside the window, focus and the filter are drawn by the renderer from the same model: nothing is rebuilt.
    const keys = [DOWN, FOCUS, FOCUS, FILTER, "F", "o", ENTER];
    for (const key of keys) {
      run.press(key);
      render();
    }
    expect(builds()).toBe(5);
    expect(render()).toEqual(drawn(projection, [...TIMELINE, ZOOM_IN, PAN_RIGHT, ...keys], { zoom: 2, pan: 1 }));
    expect(builds()).toBe(5);
  });

  it('zoom-clamp constraint (bound on wb-6ze.26): "a TimelineModel must never be requested from an out-of-contract zoom" - every zoom the = and - keys reach is built at exactly that zoom', async () => {
    const projection = laned();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(...TIMELINE);
    const keys: string[] = [...TIMELINE];
    const zooms: number[] = [];
    for (const key of [ZOOM_IN, ZOOM_IN, ZOOM_IN, ZOOM_IN, ZOOM_IN, ZOOM_OUT, ZOOM_OUT, ZOOM_OUT, ZOOM_OUT, ZOOM_OUT]) {
      run.press(key);
      keys.push(key);
      const zoom = stateAfter(projection, keys).zoom;
      zooms.push(zoom);
      expect(run.lines()).toEqual(drawn(projection, keys, { zoom }));
    }
    expect(zooms).toEqual([2, 4, MAX_ZOOM, MAX_ZOOM, MAX_ZOOM, 4, 2, 1, 1, 1]);
  });
});

describe("(c) falsifier: inspector rendering is byte-identical when the projection or the model is absent", () => {
  it("no projection: the host opens exactly the dialog a source without an observation renders", async () => {
    const task = runTask();
    task.status = "completed";
    task.endTime = task.startTime + 5_000;
    const legacy = new WorkflowDialog(
      tuiOf(ROWS) as unknown as never,
      () => ({
        progress: task.workflowProgress,
        task: {
          status: task.status, workflowName: task.workflowName, startTime: task.startTime, endTime: task.endTime, totalPausedMs: task.totalPausedMs,
          replayedCount: task.replayedCount, replayedNodeCount: task.replayedNodeCount, reconciledNodeCount: task.reconciledNodeCount,
        },
        meta: task.meta,
        agentCount: task.agentCount,
      }),
      theme,
      () => {},
      { onKill: () => {}, onPause: () => {}, onResume: () => {}, onSkipAgent: () => {}, onRetryAgent: () => {}, onOpenAgent: () => {} },
    );
    live.push(legacy);
    // The same keys reach every dialog below, whatever the legacy dialog does with them.
    for (const key of TIMELINE) legacy.handleInput(key);
    const expected = legacy.render(WIDTH);
    const unscoped = runTask();
    unscoped.status = "completed";
    unscoped.startTime = task.startTime;
    unscoped.endTime = task.endTime;
    unscoped.observationScope = undefined;
    const noProjection = await openRun(task, depsOf(undefined));
    noProjection.press(...TIMELINE);
    expect(noProjection.lines()).toEqual(expected);
    const noScope = await openRun(unscoped, depsOf(observationOf(laned())));
    noScope.press(...TIMELINE);
    expect(noScope.lines()).toEqual(expected);
  });

  it("no model: a host that declares no timeline viewport or no read cap draws the timeline view exactly as the unwired model does", async () => {
    const projection = laned();
    const expected = fallback(projection, TIMELINE);
    expect(expected).toContain(" Source intervals only · zoom 1x · pan 0 · clocks may differ");
    const hosts = [observationOf(projection, { timelineColumns: "undeclared" }), observationOf(projection, { relationPage: "undeclared" })];
    for (const host of hosts) {
      const run = await openRun(runTask(), depsOf(host));
      run.press(...TIMELINE);
      expect(run.lines()).toEqual(expected);
      run.press(ZOOM_IN, PAN_RIGHT);
      expect(run.lines()).toEqual(fallback(projection, [...TIMELINE, ZOOM_IN, PAN_RIGHT]));
    }
    // Not vacuous: the same projection behind a host that declares both draws the lane model instead.
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    wired.press(...TIMELINE);
    expect(wired.lines()).not.toEqual(expected);
  });

  it("the overview, graph and details views of a wired host render exactly as the same host without a timeline viewport", async () => {
    const projection = laned();
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    const bare = await openRun(runTask(), depsOf(observationOf(projection, { timelineColumns: "undeclared" })));
    const views: ReadonlyArray<readonly [string, readonly string[]]> = [["overview", []], ["graph", [TAB]], ["details", [TAB]]];
    for (const [view, keys] of views) {
      wired.press(...keys);
      bare.press(...keys);
      const lines = wired.lines();
      expect(lines.some(line => line.startsWith(` ${view.toUpperCase()} `)), view).toBe(true);
      expect(lines, view).toEqual(bare.lines());
      // The details view sits one Tab past the timeline view; cross it on both dialogs before the next comparison.
      if (view === "graph") {
        wired.press(TAB);
        bare.press(TAB);
        expect(wired.lines()).not.toEqual(bare.lines());
      }
    }
  });
});

describe('(d) docs/workbench/02-atomic-requirements.md WB-010: "Stopping the parent propagates cancellation only through established ownership and appropriate SDK API; stopping observation does not."', () => {
  const revisionsOf = (projection: ObservationProjection) => () => ({
    relations: projection.relationRevision(),
    rows: projection.window({ scope, invocationId: RUN, offset: 0, limit: 1 }).revision,
  });

  it("closing the dialog from a timeline view drawing a wired model aborts nothing, calls no control verb and writes nothing to the projection", async () => {
    const projection = laned();
    const task = runTask();
    const control = controlled(task);
    const deps = depsOf(observationOf(projection));
    const run = await openRun(task, deps);
    run.press(...TIMELINE, ZOOM_IN);
    expect(run.lines()).toEqual(drawn(projection, [...TIMELINE, ZOOM_IN], { zoom: 2 }));
    const revisions = revisionsOf(projection);
    const before = revisions();
    // Esc steps back timeline -> graph -> overview, then closes.
    run.press(ESC, ESC, ESC);
    await run.closed;
    expect(task.abortController.signal.aborted).toBe(false);
    expect(task.status).toBe("running");
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(run.notify).not.toHaveBeenCalled();
    expect(deps.viewAgentConversation).not.toHaveBeenCalled();
    expect(deps.viewClaudeTranscript).not.toHaveBeenCalled();
    expect(revisions()).toEqual(before);
  });

  it("disposing the overlay while the timeline view draws a wired model aborts nothing and calls no control verb", async () => {
    const projection = laned();
    const task = runTask();
    const control = controlled(task);
    const deps = depsOf(observationOf(projection));
    const run = await openRun(task, deps);
    run.press(...TIMELINE);
    expect(run.lines()).toEqual(drawn(projection, TIMELINE));
    const revisions = revisionsOf(projection);
    const before = revisions();
    run.dialog.dispose();
    expect(task.abortController.signal.aborted).toBe(false);
    expect(task.status).toBe("running");
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(run.notify).not.toHaveBeenCalled();
    expect(revisions()).toEqual(before);
  });

  it("building the model reads only: across rebuilds no projection write, no evidence load and no control verb", async () => {
    const projection = laned();
    const evidence = new EvidenceStore({ loaders: [], maxEntries: 4, maxBytes: 1024, timeoutMs: 1000, scope });
    const loads = vi.spyOn(evidence, "request");
    const aborts = vi.spyOn(evidence, "abortAll");
    const writes = [
      vi.spyOn(projection, "refresh"), vi.spyOn(projection, "ingest"), vi.spyOn(projection, "relate"),
      vi.spyOn(projection, "markStale"), vi.spyOn(projection, "disconnect"), vi.spyOn(projection, "reconnect"),
    ];
    const task = runTask();
    const control = controlled(task);
    const run = await openRun(task, depsOf(observationOf(projection, { evidence })));
    run.press(...TIMELINE);
    for (const key of [ZOOM_IN, PAN_RIGHT, DOWN, ZOOM_OUT, PAN_RIGHT]) {
      run.press(key);
      run.lines();
    }
    expect(loads).not.toHaveBeenCalled();
    expect(aborts).not.toHaveBeenCalled();
    for (const write of writes) expect(write).not.toHaveBeenCalled();
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(task.abortController.signal.aborted).toBe(false);
    expect(run.notify).not.toHaveBeenCalled();
  });
});

describe("(e) every cap in the TimelineRequest comes from the host's exported constants, never a numeric literal in the wiring", () => {
  const sourceOf = (path: string): ts.SourceFile =>
    ts.createSourceFile(path, readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  function collect<T extends ts.Node>(root: ts.Node, guard: (node: ts.Node) => node is T): T[] {
    const found: T[] = [];
    const visit = (node: ts.Node): void => {
      if (guard(node)) found.push(node);
      ts.forEachChild(node, visit);
    };
    visit(root);
    return found;
  }
  /** The initializer of one named property of an object literal, if the node is one and has it. */
  function initializerOf(literal: ts.Node | undefined, name: string, file: ts.SourceFile): ts.Expression | undefined {
    if (literal === undefined || !ts.isObjectLiteralExpression(literal)) return undefined;
    for (const property of literal.properties) if (ts.isPropertyAssignment(property) && property.name.getText(file) === name) return property.initializer;
    return undefined;
  }
  /** Property name -> initializer text of an object literal; a shorthand property reads as its own name. */
  function propertiesOf(literal: ts.Node | undefined, file: ts.SourceFile): Map<string, string> {
    const properties = new Map<string, string>();
    if (literal === undefined || !ts.isObjectLiteralExpression(literal)) return properties;
    for (const property of literal.properties) {
      if (ts.isShorthandPropertyAssignment(property)) properties.set(property.name.text, property.name.text);
      else if (ts.isPropertyAssignment(property)) properties.set(property.name.getText(file), property.initializer.getText(file));
    }
    return properties;
  }

  it("src/ui/workflow-menu.ts: the request object carries no numeric literal, its caps are the factory's page and columns, and nothing catches the selector's throw", () => {
    const file = sourceOf("src/ui/workflow-menu.ts");
    const factories = collect(file, ts.isFunctionDeclaration).filter(fn => fn.name?.text === "timelineLanes");
    expect(factories).toHaveLength(1);
    const factory = factories[0];
    expect(factory.parameters.map(parameter => parameter.name.getText(file))).toEqual(["projection", "page", "columns"]);
    // The only numbers in the read side are the 0 and 1 of the clamp the inspector itself applies (Math.max(0, total - 1)).
    expect(collect(factory, ts.isNumericLiteral).map(literal => literal.text).sort()).toEqual(["0", "1"]);
    expect(collect(factory, ts.isBigIntLiteral)).toEqual([]);
    expect(collect(factory, ts.isTryStatement)).toEqual([]);
    const requests = collect(factory, ts.isVariableDeclaration).filter(declaration => declaration.name.getText(file) === "request");
    expect(requests).toHaveLength(1);
    const literal = requests[0].initializer;
    const properties = propertiesOf(literal, file);
    expect([...properties.keys()]).toEqual(["scope", "invocationId", "offset", "limit", "zoom", "pan", "columns", "relationLimit"]);
    expect({ limit: properties.get("limit"), relationLimit: properties.get("relationLimit"), columns: properties.get("columns") }).toEqual({
      limit: "page", relationLimit: "page", columns: "columns",
    });
    expect({ zoom: properties.get("zoom"), pan: properties.get("pan") }).toEqual({ zoom: "view.zoom", pan: "view.pan" });
    expect(literal === undefined ? ["no initializer"] : collect(literal, ts.isNumericLiteral).map(found => found.text)).toEqual([]);
    const builds = collect(factory, ts.isCallExpression).filter(call => call.expression.getText(file) === "buildTimelineLanes");
    expect(builds.map(call => call.arguments.map(argument => argument.getText(file)))).toEqual([["projection", "request"]]);
    // The host side makes the read side from the values the host declared, never from literals.
    const made = collect(file, ts.isCallExpression).filter(call => call.expression.getText(file) === "timelineLanes");
    expect(made.map(call => call.arguments.map(argument => argument.getText(file)))).toEqual([["host.projection", "host.relationPage", "host.timelineColumns"]]);
  });

  it("src/index.ts hands the menu WORKBENCH_PROJECTION_MAX_QUERY and WORKBENCH_TIMELINE_COLUMNS, exported numbers the selector's contract accepts", () => {
    const file = sourceOf("src/index.ts");
    const deps = collect(file, ts.isVariableDeclaration).filter(declaration => declaration.name.getText(file) === "workflowMenuDeps");
    expect(deps).toHaveLength(1);
    const declared = propertiesOf(initializerOf(deps[0].initializer, "observation", file), file);
    expect({ relationPage: declared.get("relationPage"), timelineColumns: declared.get("timelineColumns") }).toEqual({
      relationPage: "WORKBENCH_PROJECTION_MAX_QUERY", timelineColumns: "WORKBENCH_TIMELINE_COLUMNS",
    });
    const exported = collect(file, ts.isVariableStatement)
      .filter(statement => statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
      .flatMap(statement => [...statement.declarationList.declarations])
      .filter(declaration => ["WORKBENCH_PROJECTION_MAX_QUERY", "WORKBENCH_TIMELINE_COLUMNS"].includes(declaration.name.getText(file)));
    expect(exported.map(declaration => [declaration.name.getText(file), declaration.initializer !== undefined && ts.isNumericLiteral(declaration.initializer)])).toEqual([
      ["WORKBENCH_PROJECTION_MAX_QUERY", true],
      ["WORKBENCH_TIMELINE_COLUMNS", true],
    ]);
    expect([WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_TIMELINE_COLUMNS].every(value => Number.isSafeInteger(value))).toBe(true);
    const projection = new ObservationProjection({ maxQuery: WORKBENCH_PROJECTION_MAX_QUERY });
    for (const zoom of [1, MAX_ZOOM]) {
      expect(() =>
        buildTimelineLanes(projection, {
          scope, invocationId: RUN, offset: 0, limit: WORKBENCH_PROJECTION_MAX_QUERY, zoom, pan: 0,
          columns: WORKBENCH_TIMELINE_COLUMNS, relationLimit: WORKBENCH_PROJECTION_MAX_QUERY,
        }),
      ).not.toThrow();
    }
  });

  it("the wiring follows whatever the host declares: a page of 7 and 16 columns read windows and relation pages of 7 and lay bars out in 16 cells", async () => {
    const projection = new ObservationProjection({ maxQuery: CAP });
    for (let i = 0; i < 9; i++) observe(projection, { id: `s${i}`, start: i * 3, end: i * 3 + 2 });
    const relations = vi.spyOn(projection, "relations");
    const windows = vi.spyOn(projection, "window");
    const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: 7, timelineColumns: 16 })));
    run.press(...TIMELINE);
    relations.mockClear();
    windows.mockClear();
    const lines = run.lines();
    // The reads of this one redraw, taken before the expected lines below read the same projection.
    const incoming = relations.mock.calls.map(([input]) => input).filter(input => input.to !== undefined);
    const windowLimits = windows.mock.calls.map(([input]) => input.limit);
    expect(incoming).toHaveLength(7);
    for (const input of incoming) expect(input.limit).toBe(7);
    expect(windowLimits).toContain(7);
    expect(lines).toEqual(drawn(projection, TIMELINE, { limit: 7, relationLimit: 7, columns: 16 }));
    expect(lines.some(line => line.startsWith(" Truncated window:"))).toBe(true);
  });

  it('docs/workbench/02 WB-028 "usable 80-column/24-row fallback": at the 80-column overlay a bar on the last cell of the WORKBENCH_TIMELINE_COLUMNS viewport is drawn whole', async () => {
    // The overlay is 90% of the terminal (showWorkflowDialog overlayOptions), so an 80-column terminal renders the dialog 72 wide.
    const overlay = 72;
    expect(Number.isSafeInteger(WORKBENCH_TIMELINE_COLUMNS)).toBe(true);
    const projection = new ObservationProjection({ maxQuery: CAP });
    observe(projection, { id: "origin", start: 0, end: 1 });
    observe(projection, { id: "edge", start: WORKBENCH_TIMELINE_COLUMNS - 1, end: WORKBENCH_TIMELINE_COLUMNS });
    const run = await openRun(runTask(), depsOf(observationOf(projection, { timelineColumns: WORKBENCH_TIMELINE_COLUMNS })), 24);
    run.press(...TIMELINE);
    const lines = run.lines(overlay);
    expect(lines).toEqual(drawn(projection, TIMELINE, { columns: WORKBENCH_TIMELINE_COLUMNS }, overlay, 24));
    const edge = lines.find(line => line.includes("Operation edge")) ?? "";
    const bar = edge.slice(edge.indexOf("│") + 1);
    expect({ cells: bar.length, glyph: bar.trimStart(), truncated: edge.endsWith("…") }).toEqual({ cells: WORKBENCH_TIMELINE_COLUMNS, glyph: "━", truncated: false });
  });
});

describe("display path: producer text reaching the operator through the wired lane model passes the landed named-layout sanitizers", () => {
  it("credential-shaped titles, one carrying a zero-width and a bidi control, render redacted in their rows and their lane, with no unsafe code point and the visible text kept", async () => {
    const zeroWidth = String.fromCodePoint(0x200b);
    const override = String.fromCodePoint(0x202e);
    // Obviously fake placeholders in shapes the shared redactor recognises; each title fits the 24-cell row label, so an
    // unsanitized title would show its placeholder whole and the leak check below can fail.
    const placeholders = { bearerToken: "FAKE0TKN", prefixedKey: "sk-ant-FAKE0KEY" };
    const projection = new ObservationProjection({ maxQuery: CAP });
    observe(projection, { id: "parent", title: `Run ${placeholders.prefixedKey}`, start: 0, end: 6 });
    observe(projection, { id: "child", title: `op${zeroWidth}Bearer ${placeholders.bearerToken}${override}tail`, start: 1, end: 3 });
    relate(projection, ref("parent"), ref("child"), "ownership", "furnace:run/frn-run-fixture");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(...TIMELINE);
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection, TIMELINE));
    // Names-only projections: no assertion below prints a rendered row.
    const unsafe = lines
      .flatMap(line => [...line])
      .map(unit => unit.codePointAt(0) ?? 0)
      .filter(point => point < 0x20 || (point >= 0x7f && point <= 0x9f) || (point >= 0x202a && point <= 0x202e) || (point >= 0x2066 && point <= 0x2069) || point === 0x200b)
      .map(point => `U+${point.toString(16).toUpperCase().padStart(4, "0")}`);
    const leaked = Object.entries(placeholders).filter(([, secret]) => lines.some(line => line.includes(secret))).map(([name]) => name);
    // The parent's title names its ownership lane and its own row; the zero-width is deleted where it is glued and the bidi
    // control is read as glued, so the redacted bearer value takes its tail and the visible "op" is kept.
    expect({
      laneRedacted: lines.includes(" ▌ Run [REDACTED] · ownership · confirmed · 1 row"),
      parentRowRedacted: lines.some(line => line.startsWith(" ❯ ◌ Run [REDACTED] ")),
      childRowRedacted: lines.some(line => line.startsWith("   ◌ op[REDACTED] ")),
      leaked,
      unsafe,
    }).toStrictEqual({ laneRedacted: true, parentRowRedacted: true, childRowRedacted: true, leaked: [], unsafe: [] });
  });
});
