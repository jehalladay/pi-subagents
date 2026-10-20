/**
 * W15-B6w/VC-5 (wb-6ze.37): the dialog/host wiring supplies the workbench.graph-view/v1 model (wb-6ze.32, buildGraphView) to the
 * inspector graph view. The builder (src/workbench/graph-view.ts) and the renderer (wb-6ze.34, graphModelRows in
 * src/ui/workflow-inspector.ts) are landed and untouched: every row drives the real host seam, showWorkflowDialog in
 * src/ui/workflow-menu.ts, over a real ObservationProjection and the real WorkflowDialog, and reads the lines the operator sees.
 * Each row quotes the bead acceptance: docs/workbench/10 § Four views (Graph) and § Rendering pipeline ("Graph layout cached by
 * topology revision"), and the builder's own cache contract (zero relation reads while the topology revision is unchanged).
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WORKBENCH_PROJECTION_MAX_QUERY } from "../src/index.js";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorState, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { buildGraphView, type GraphViewRequest } from "../src/workbench/graph-view.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation, type RelationKind } from "../src/workbench/observation.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";

const scope: ObservationScope = { workspace: "/workspace/graph-wiring", principal: "local-operator:1000:session-graph" };
const RUN = "wf_graphwire1";
/** A second invocation observed in the same scope: never part of the run's graph view. */
const OTHER = "wf_graphwire2";
const TITLE = "graph wiring";
const WIDTH = 120;
const ROWS = 40;
/** The read cap the rows build their projection with and hand the host seam, as src/index.ts does with WORKBENCH_PROJECTION_MAX_QUERY. */
const CAP = 40;
const TAB = "\t";
const DOWN = "j";
const FOCUS = "f";
const FILTER = "/";
const ENTER = "\r";
const ESC = String.fromCharCode(0x1b);
const at = (seconds: number): string => new Date(Date.UTC(2026, 9, 15, 12, 0, seconds)).toISOString();
const ref = (id: string, provider = "furnace"): NativeRef => ({ provider, type: "operation", id });

interface Seed {
  id: string;
  title: string;
  tone: Presentation["statusTone"];
  invocation?: string;
  /** Seconds past the origin the snapshot was captured at; a later capture updates an observed operation. */
  captured?: number;
}
function observe(projection: ObservationProjection, seed: Seed): void {
  projection.refresh({
    source: ref(seed.id), scope, capturedAt: at(seed.captured ?? 0), observedAt: at(seed.captured ?? 0),
    node: { title: seed.title, type: "sdk-operation", statusText: seed.tone, statusTone: seed.tone },
    trace: { invocationId: seed.invocation ?? RUN },
  });
}
function relate(projection: ObservationProjection, from: string, to: string, kind: RelationKind = "dependency"): void {
  projection.relate({ scope, from: ref(from), to: ref(to), kind, provenance: { source: "furnace", observedAt: at(0) } });
}
/** The ids of the run's five operations, in the order the projection lists them. */
const IDS = ["fetch", "compile", "build", "verify", "lint"] as const;
/**
 * A run with every reading the graph view draws: a dependency chain fetch -> compile -> build, a cycle verify <-> build, an
 * operation with no relation (lint) and one declared dependency to an operation of another invocation (an endpoint the view does
 * not hold, which the builder keeps as a reference entry and never draws as an arrow).
 */
function meshed(): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: CAP });
  observe(projection, { id: "fetch", title: "Fetch sources", tone: "success" });
  observe(projection, { id: "compile", title: "Compile", tone: "success" });
  observe(projection, { id: "build", title: "Build image", tone: "active" });
  observe(projection, { id: "verify", title: "Verify", tone: "waiting" });
  observe(projection, { id: "lint", title: "Lint", tone: "active" });
  observe(projection, { id: "elsewhere", title: "Elsewhere", tone: "waiting", invocation: OTHER });
  relate(projection, "fetch", "compile");
  relate(projection, "compile", "build");
  relate(projection, "verify", "build");
  relate(projection, "build", "verify");
  relate(projection, "compile", "elsewhere");
  return projection;
}
/** `count` operations of the run, o00..., listed in order. */
function manyRows(count: number): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: CAP });
  for (let i = 0; i < count; i++) observe(projection, { id: `o${String(i).padStart(2, "0")}`, title: `Row ${String(i).padStart(2, "0")}`, tone: "active" });
  return projection;
}

function runTask(id = RUN): WorkflowTask {
  const task = createWorkflowTask({ id, script: "return 1;", meta: { name: TITLE, description: "fixture run" } });
  task.observationScope = { ...scope, sessionId: "session-graph" };
  return task;
}
function controlled(task: WorkflowTask) {
  const control = { pause: vi.fn(), resume: vi.fn(), isPaused: vi.fn(() => false), skip: vi.fn(() => true), retry: vi.fn(() => true) };
  task.control = control;
  return control;
}

type HostObservation = NonNullable<WorkflowMenuDeps["observation"]>;
/** What src/index.ts hands the menu. "undeclared" is a host that states no read cap for its projection. */
function observationOf(
  projection: ObservationProjection,
  options: { relationPage?: number | "undeclared"; evidence?: EvidenceStore; scopeOf?: (task: WorkflowTask) => ObservationScope | undefined } = {},
): HostObservation {
  const page = options.relationPage ?? CAP;
  return {
    projection,
    scope:
      options.scopeOf ??
      (task => (task.observationScope ? { workspace: task.observationScope.workspace, principal: task.observationScope.principal } : undefined)),
    ...(page === "undeclared" ? {} : { relationPage: page }),
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

/** The observation the host hands the inspector before any graph model: what the graph view draws today. */
const unwired = (projection: ObservationProjection, invocationId = RUN): InspectorModel => ({
  projection, scope, invocationId, title: TITLE, status: "running",
});
/** The inspector state the dialog reaches by these keys, through the same reducer. */
function stateAfter(projection: ObservationProjection, keys: readonly string[]): InspectorState {
  let state = initialInspectorState();
  for (const key of keys) state = reduceInspectorKey(key, state, unwired(projection))?.state ?? state;
  return state;
}
/** The request the bead names: the observed invocation, one window of the host's declared page, relation pages of the same size. */
const requestOf = (offset: number, page = CAP): GraphViewRequest => ({
  scope, invocationId: RUN, viewport: { offset, limit: page }, caps: { maxNodes: page, relationLimit: page },
});
/** Exactly what the landed renderer draws for the model the landed builder computes from that request. */
function drawn(projection: ObservationProjection, keys: readonly string[], request: GraphViewRequest = requestOf(0)): string[] {
  const graph = buildGraphView(projection, request);
  return layoutInspector({ ...unwired(projection), graph }, stateAfter(projection, keys), { width: WIDTH, rows: ROWS });
}
/** The graph view the unwired dialog draws today, for the same keys. */
const fallback = (projection: ObservationProjection, keys: readonly string[]): string[] =>
  layoutInspector(unwired(projection), stateAfter(projection, keys), { width: WIDTH, rows: ROWS });
const textOf = (lines: readonly string[]): string => lines.map(line => line.trim()).join(" ").replace(/\s+/gu, " ");
const GRAPH = [TAB];

describe('(a) docs/workbench/10 § Four views, Graph: "navigable DAG-ish projection, explicit dependency arrows, fan-out collapsing, cross-provider nodes, nested workflows. Cycles/unknown dynamic edges represented explicitly as \'references\'."', () => {
  it("with a projection present the host supplies the workbench.graph-view/v1 model: the graph view draws buildGraphView over the live projection", async () => {
    const projection = meshed();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(TAB);
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection, GRAPH));
    // The model takes the place of the per-node blocks the unwired graph view draws.
    expect(lines).not.toEqual(fallback(projection, GRAPH));
    const text = textOf(lines);
    expect(text).toContain("dependency → Compile");
    expect(text).toContain("reference");
    expect(text).toContain("cycle");
    expect(text).toContain("not in view");
  });

  it("for the observed invocation only: another invocation's operation is never a graph row, and no relation page is read for it", async () => {
    const projection = meshed();
    const pages = vi.spyOn(projection, "relationsPage");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(TAB);
    const lines = run.lines();
    expect(lines.filter(line => line.includes("Elsewhere") && !line.includes("→") && !line.includes("reference"))).toEqual([]);
    const outgoing = pages.mock.calls.map(([input]) => ("from" in input ? input.from : undefined));
    expect(outgoing.filter(from => from === undefined)).toEqual([]);
    expect(new Set(outgoing).size).toBe(IDS.length);
    // Not vacuous: the other invocation's own dialog draws its own graph.
    const other = await openRun(runTask(OTHER), depsOf(observationOf(projection)));
    other.press(TAB);
    expect(other.lines()).not.toEqual(lines);
  });
});

describe("(b) the model is rebuilt only on a topology or projection revision change (docs/workbench/10 § Rendering pipeline: graph layout cached by topology revision)", () => {
  it("redraws, selection and the filter at one revision read no relation page; a node update or a topology change re-reads the pages at most once per shown row and the model follows", async () => {
    const projection = meshed();
    const pages = vi.spyOn(projection, "relationsPage");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(TAB);
    run.lines();
    expect(pages).toHaveBeenCalledTimes(IDS.length);
    pages.mockClear();
    run.lines();
    run.lines();
    for (const key of [DOWN, DOWN, FILTER, "B", ENTER]) {
      run.press(key);
      run.lines();
    }
    expect(pages).not.toHaveBeenCalled();
    expect(run.lines()).toEqual(drawn(projection, [TAB, DOWN, DOWN, FILTER, "B", ENTER]));
    // A node update is a new projection revision: the model follows, reading at most one relation page per shown row.
    observe(projection, { id: "lint", title: "Lint", tone: "success", captured: 1 });
    const updated = run.lines();
    expect(pages.mock.calls.length).toBeLessThanOrEqual(IDS.length);
    run.lines();
    expect(pages.mock.calls.length).toBeLessThanOrEqual(IDS.length);
    pages.mockClear();
    run.lines();
    expect(pages).not.toHaveBeenCalled();
    expect(updated).toEqual(drawn(projection, [TAB, DOWN, DOWN, FILTER, "B", ENTER]));
    // A relation observed is a new topology revision: the pages are read again, once, and the model follows.
    pages.mockClear();
    relate(projection, "lint", "fetch");
    const related = run.lines();
    run.lines();
    expect(pages.mock.calls.length).toBeGreaterThan(0);
    expect(pages.mock.calls.length).toBeLessThanOrEqual(IDS.length);
    expect(related).toEqual(drawn(projection, [TAB, DOWN, DOWN, FILTER, "B", ENTER]));
  });

  it("only the graph view asks for the model: the overview, timeline and details views read no graph relation page", async () => {
    const projection = meshed();
    const pages = vi.spyOn(projection, "relationsPage");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.lines();
    expect(pages).not.toHaveBeenCalled();
    run.press(TAB, TAB);
    run.lines();
    expect(pages).not.toHaveBeenCalled();
    run.press(TAB);
    run.lines();
    // The details view reads the selected node's linked topology slice (wb-6ze.24), never the graph model's window of pages.
    expect(pages.mock.calls.length).toBeLessThan(IDS.length);
  });
});

describe("(c) the window and relation page sizes are the host's declared read cap, never a literal", () => {
  it("the relation pages are read at exactly the declared size, and the host's exported constant is the one src/index.ts declares", async () => {
    for (const declared of [7, 25]) {
      const projection = meshed();
      const pages = vi.spyOn(projection, "relationsPage");
      const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: declared })));
      run.press(TAB);
      const lines = run.lines();
      expect(pages.mock.calls.map(([input]) => input.limit), `declared ${declared}`).toEqual(Array.from({ length: IDS.length }, () => declared));
      expect(lines, `declared ${declared}`).toEqual(drawn(projection, GRAPH, requestOf(0, declared)));
    }
    expect(WORKBENCH_PROJECTION_MAX_QUERY).toBe(CAP);
  });

  it("a window larger than the declared page is paged: moving the cursor to the second page draws the second window and says so", async () => {
    const projection = manyRows(5);
    const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: 3 })));
    run.press(TAB);
    const first = run.lines();
    expect(first).toEqual(drawn(projection, GRAPH, requestOf(0, 3)));
    expect(textOf(first)).toContain("showing 3 of 5 rows");
    expect(textOf(first)).toContain("Row 00");
    expect(textOf(first)).not.toContain("Row 03");
    run.press(DOWN, DOWN, DOWN);
    const second = run.lines();
    expect(second).toEqual(drawn(projection, [TAB, DOWN, DOWN, DOWN], requestOf(3, 3)));
    expect(textOf(second)).toContain("Row 03");
    expect(textOf(second)).not.toContain("Row 00");
  });

  it("counted partial labels reach the operator end-to-end: a relation page that stops at its limit is labeled, never drawn complete", async () => {
    const projection = new ObservationProjection({ maxQuery: CAP });
    observe(projection, { id: "hub", title: "Hub", tone: "active" });
    for (const id of ["t1", "t2", "t3", "t4", "t5"]) {
      observe(projection, { id, title: `Target ${id}`, tone: "waiting" });
      relate(projection, "hub", id);
    }
    const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: 3 })));
    run.press(TAB);
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection, GRAPH, requestOf(0, 3)));
    expect(textOf(lines)).toContain("Hub: showing 3 outgoing relations, more exist (page truncated)");
  });
});

describe("(d) falsifier: inspector rendering is byte-identical when the projection, the read cap or the model is absent", () => {
  it("no read cap declared: the graph view draws exactly as the unwired model does, and no relation page is read", async () => {
    const projection = meshed();
    const pages = vi.spyOn(projection, "relationsPage");
    const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: "undeclared" })));
    run.press(TAB);
    expect(run.lines()).toEqual(fallback(projection, GRAPH));
    run.press(DOWN);
    expect(run.lines()).toEqual(fallback(projection, [TAB, DOWN]));
    expect(pages).not.toHaveBeenCalled();
    // Not vacuous: the same projection behind a host that declares the cap draws the model instead.
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    wired.press(TAB);
    expect(wired.lines()).not.toEqual(fallback(projection, GRAPH));
  });

  it("no scope: an unscoped task opens the dialog a source without an observation renders, with no graph model built", async () => {
    const projection = meshed();
    const pages = vi.spyOn(projection, "relationsPage");
    const unscoped = runTask();
    unscoped.observationScope = undefined;
    // A settled run: the header's elapsed time stops moving, so the two dialogs compare byte for byte.
    unscoped.status = "completed";
    unscoped.endTime = unscoped.startTime + 5_000;
    const bare = await openRun(unscoped, depsOf(undefined));
    const scoped = await openRun(unscoped, depsOf(observationOf(projection)));
    bare.press(TAB);
    scoped.press(TAB);
    expect(scoped.lines()).toEqual(bare.lines());
    expect(pages).not.toHaveBeenCalled();
  });

  it("the overview, timeline and details views of a wired host render exactly as the same host without a read cap", async () => {
    const projection = meshed();
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    const bare = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: "undeclared" })));
    // The overview is first and the graph second; skip the graph, then compare timeline and details (their own wiring needs more declarations).
    expect(wired.lines()).toEqual(bare.lines());
    wired.press(TAB, TAB);
    bare.press(TAB, TAB);
    expect(wired.lines()).toEqual(bare.lines());
  });
});

describe('(e) docs/workbench/02-atomic-requirements.md WB-010: "Stopping the parent propagates cancellation only through established ownership and appropriate SDK API; stopping observation does not."', () => {
  const revisionOf = (projection: ObservationProjection) => () => ({
    relations: projection.relationRevision(),
    rows: projection.window({ scope, invocationId: RUN, offset: 0, limit: 1 }).revision,
  });

  it("closing the dialog from a graph view drawing a wired model aborts nothing, calls no control verb and writes nothing", async () => {
    const projection = meshed();
    const task = runTask();
    const control = controlled(task);
    const deps = depsOf(observationOf(projection));
    const run = await openRun(task, deps);
    run.press(TAB);
    expect(run.lines()).toEqual(drawn(projection, GRAPH));
    const revisions = revisionOf(projection);
    const before = revisions();
    run.press(ESC, ESC);
    await run.closed;
    expect(task.abortController.signal.aborted).toBe(false);
    expect(task.status).toBe("running");
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(run.notify).not.toHaveBeenCalled();
    expect(deps.viewAgentConversation).not.toHaveBeenCalled();
    expect(deps.viewClaudeTranscript).not.toHaveBeenCalled();
    expect(revisions()).toEqual(before);
  });

  it("building the model reads only: across rebuilds no projection write, no evidence load and no control verb", async () => {
    const projection = meshed();
    const evidence = new EvidenceStore({ loaders: [], maxEntries: 4, maxBytes: 1024, timeoutMs: 1000, scope });
    const loads = vi.spyOn(evidence, "request");
    const aborts = vi.spyOn(evidence, "abortAll");
    const task = runTask();
    const control = controlled(task);
    const run = await openRun(task, depsOf(observationOf(projection, { evidence })));
    run.press(TAB);
    run.lines();
    const writes = [
      vi.spyOn(projection, "refresh"), vi.spyOn(projection, "ingest"), vi.spyOn(projection, "relate"),
      vi.spyOn(projection, "markStale"), vi.spyOn(projection, "disconnect"), vi.spyOn(projection, "reconnect"),
    ];
    for (const key of [DOWN, FOCUS, FOCUS, DOWN]) {
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

describe("(f) the GraphViewRequest the wiring builds carries the host's declared read cap, never a literal", () => {
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

  it("src/ui/workflow-menu.ts: the graph read side is built from host.projection and host.relationPage, holds a builder, and has no try or numeric literal of its own", () => {
    const file = sourceOf("src/ui/workflow-menu.ts");
    const factories = collect(file, ts.isFunctionDeclaration).filter(fn => fn.name?.text === "graphViewModel");
    expect(factories).toHaveLength(1);
    const factory = factories[0];
    expect(factory.parameters.map(parameter => parameter.name.getText(file))).toEqual(["projection", "page"]);
    expect(collect(factory, ts.isTryStatement)).toEqual([]);
    expect(collect(factory, ts.isNumericLiteral).map(found => found.getText(file)).filter(value => value !== "0" && value !== "1")).toEqual([]);
    expect(collect(factory, ts.isCallExpression).map(call => call.expression.getText(file))).toContain("createGraphViewBuilder");
    const made = collect(file, ts.isCallExpression).filter(call => call.expression.getText(file) === "graphViewModel");
    expect(made.map(call => call.arguments.map(argument => argument.getText(file)))).toEqual([["host.projection", "host.relationPage"]]);
  });
});
