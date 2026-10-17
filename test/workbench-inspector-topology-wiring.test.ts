/**
 * W15-B3/VC-5 (wb-6ze.24): the dialog/host wiring hands the inspector details view the linked topology slice of the
 * selected node. The slice builder (wb-g1g.2, src/workbench/topology-slice.ts) and the details layout (wb-6ze.16,
 * src/ui/workflow-inspector.ts) are landed and untouched: every row drives the real host seam, showWorkflowDialog in
 * src/ui/workflow-menu.ts, over a real ObservationProjection and the real WorkflowDialog, and reads the lines the operator
 * sees. Each row quotes the docs/workbench clause or the bound owner ruling (bead notes, 2026-10-15 ~11:35Z) it pins:
 * (a) the relation page is derived from the exported constant the projection is built with, never a literal; (b) the
 * wiring reads relationsPage, so a full page is a lower bound; (c) the 45-edge probe at maxQuery 40.
 */
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WORKBENCH_PROJECTION_MAX_QUERY } from "../src/index.js";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type RelationKind } from "../src/workbench/observation.js";
import { selectLinkedTopology } from "../src/workbench/topology-slice.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";

const scope: ObservationScope = { workspace: "/workspace/topology-wiring", principal: "local-operator:1000:session-wiring" };
const RUN = "wf_topologywire1";
const TITLE = "topology wiring";
const T = "2026-10-15T12:00:00.000Z";
const T1 = "2026-10-15T11:00:00.000Z";
const T2 = "2026-10-15T11:30:00.000Z";
const WIDTH = 120;
const ROWS = 40;
/** The read cap of ruling (c)'s probe. Rows build their projection with it and hand the host seam the same page, as
 * src/index.ts does with WORKBENCH_PROJECTION_MAX_QUERY; no row depends on the two values being equal. */
const CAP = 40;
const ESC = String.fromCharCode(0x1b);
const DETAILS = "s";
const DOWN = "j";
const UP = "k";
const ref = (id: string): NativeRef => ({ provider: "furnace", type: "operation", id });
const keyOf = (id: string): string => JSON.stringify([scope.workspace, scope.principal, "furnace", "operation", "", id]);
const capped = (): ObservationProjection => new ObservationProjection({ maxQuery: CAP });

/** An observed operation. In the run it is a viewport row of the inspector; beside the run it is observed but not a row. */
function observe(projection: ObservationProjection, id: string, inRun = true): void {
  projection.refresh({
    source: ref(id), scope, capturedAt: T, observedAt: T,
    node: { title: `Operation ${id}`, type: "sdk-operation", statusText: "running", statusTone: "active" },
    ...(inRun ? { trace: { invocationId: RUN } } : {}),
  });
}
function relate(
  projection: ObservationProjection, from: string, to: string, kind: RelationKind = "dependency", source = "declared workflow",
  observedAt: string | null = T, nativeConfirmationRef?: string,
): void {
  // `null` is a producer that stated no timestamp; a default parameter would read an explicit `undefined` as T.
  projection.relate({
    scope, from: ref(from), to: ref(to), kind,
    provenance: { source, ...(observedAt !== null ? { observedAt } : {}), ...(nativeConfirmationRef !== undefined ? { nativeConfirmationRef } : {}) },
  });
}
const idsOf = (prefix: string, count: number): string[] => Array.from({ length: count }, (_, i) => `${prefix}${String(i).padStart(2, "0")}`);

function runTask(): WorkflowTask {
  const task = createWorkflowTask({ id: RUN, script: "return 1;", meta: { name: TITLE, description: "fixture run" } });
  task.observationScope = { ...scope, sessionId: "session-wiring" };
  return task;
}
function controlled(task: WorkflowTask) {
  const control = { pause: vi.fn(), resume: vi.fn(), isPaused: vi.fn(() => false), skip: vi.fn(() => true), retry: vi.fn(() => true) };
  task.control = control;
  return control;
}

type HostObservation = NonNullable<WorkflowMenuDeps["observation"]>;
/** What src/index.ts hands the menu. `relationPage: "undeclared"` is a host that states no read cap for its projection. */
function observationOf(projection: ObservationProjection, options: { relationPage?: number | "undeclared"; evidence?: EvidenceStore } = {}): HostObservation {
  const page = options.relationPage ?? CAP;
  return {
    projection,
    scope: task => (task.observationScope ? { workspace: task.observationScope.workspace, principal: task.observationScope.principal } : undefined),
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
  notify: ReturnType<typeof vi.fn>;
  /** Settles when the dialog closes itself, as the overlay's `done` does. */
  closed: Promise<void>;
  press(...keys: string[]): void;
  lines(): string[];
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
    notify, closed,
    press: (...keys) => {
      for (const key of keys) dialog.handleInput(key);
    },
    lines: () => dialog.render(WIDTH),
  };
}
/** The details view's topology edge rows: one per listed neighbour, direction glyph first. */
const edgeRows = (lines: readonly string[]): string[] => lines.filter(line => line.startsWith(" → ") || line.startsWith(" ← "));

describe('docs/workbench/09 § Relationships are typed and provenanced: "Store edge provenance with timestamp and source", end to end', () => {
  it("the host computes the selected node's slice from the projection's typed relations and the details view shows each edge's class, source and timestamp", async () => {
    const projection = capped();
    for (const id of ["F", "U", "D"]) observe(projection, id);
    relate(projection, "U", "F", "dependency", "declared workflow", T1);
    relate(projection, "F", "D", "causation", "tool call", T2);
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    const lines = run.lines();
    expect(lines).toContain(" Native ref: furnace/operation/F");
    expect(lines).toContain(" Upstream (1)");
    expect(lines).toContain(" Downstream (1)");
    expect(edgeRows(lines)).toEqual([
      " ← furnace/operation/U · declared dependency [declared workflow @2026-10-15T11:00:00.000Z]",
      " → furnace/operation/D · observed causal [tool call @2026-10-15T11:30:00.000Z]",
    ]);
    // The slice takes the place of the bare relation-kind list the unwired details view shows.
    expect(lines.filter(line => line.startsWith(" Relations:"))).toEqual([]);
  });

  it('every documented class keeps its own label: native-confirmed ownership, grouping, and a hypothesis "never treated as authoritative"', async () => {
    const projection = capped();
    for (const id of ["F", "O", "G", "H"]) observe(projection, id);
    relate(projection, "O", "F", "ownership", "furnace", T, "furnace:run/frn-run-owner");
    relate(projection, "G", "F", "grouping", "phase");
    relate(projection, "F", "H", "hypothesis", "inferred by heuristic");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    expect(edgeRows(run.lines())).toEqual([
      " ← furnace/operation/O · lifecycle ownership (native-confirmed) [furnace @2026-10-15T12:00:00.000Z]",
      " ← furnace/operation/G · grouping [phase @2026-10-15T12:00:00.000Z]",
      " → furnace/operation/H · inferred hypothesis · non-authoritative [inferred by heuristic @2026-10-15T12:00:00.000Z]",
    ]);
  });

  it('"Missing edges do not imply independence.": a selected node with no observed relation says so and no edge is invented', async () => {
    const projection = capped();
    observe(projection, "F");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    const lines = run.lines();
    expect(lines).toContain(" Topology: no observed relations (missing edges do not imply independence)");
    expect(edgeRows(lines)).toEqual([]);
  });
});

describe('docs/workbench/10 § Four-view viewport increment: "Missing edges, timestamps and evidence loaders are visible unknowns, never fabricated."', () => {
  it("an edge with no stated timestamp says so, and a declared edge to a never-observed endpoint is marked, never dropped or filled in", async () => {
    const projection = capped();
    for (const id of ["F", "N"]) observe(projection, id);
    relate(projection, "F", "N", "grouping", "phase", null);
    relate(projection, "F", "Z", "dependency", "declared workflow", T1);
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    expect(edgeRows(run.lines())).toEqual([
      " → furnace/operation/Z · declared dependency · unobserved endpoint [declared workflow @2026-10-15T11:00:00.000Z]",
      " → furnace/operation/N · grouping [phase · no timestamp]",
    ]);
  });

  it("ruling (b)+(c): 45 observed downstream edges at a read cap of 40 show 10 rows, a counted lower-bound remainder and an incomplete trace", async () => {
    // The ruling's arithmetic (45 - 10 = 35) needs a read past the projection's cap, which ruling (a) forbids. Read through
    // relationsPage, the page of 40 is a reported lower bound: 30 counted past the listing, the "+" and "(partial)" marks and
    // the incomplete-trace label keep the five unseen edges visible as unknowns, so none is silently dropped.
    const projection = capped();
    observe(projection, "F");
    for (const id of idsOf("t", 45)) {
      observe(projection, id, false);
      relate(projection, "F", id);
    }
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    const lines = run.lines();
    expect(lines).toContain(" Topology: incomplete trace (relations truncated)");
    expect(lines).toContain(" Downstream (40+)");
    expect(edgeRows(lines)).toHaveLength(10);
    expect(lines).toContain(" … +30 more (bounded) (partial)");
  });
});

describe("docs/workbench/10 § Four views: \"Details: selected operation's ... upstream/downstream\", for the selected node only, recomputed on selection change", () => {
  const X_ROW = " → furnace/operation/X · declared dependency [declared workflow @2026-10-15T11:00:00.000Z]";
  const Y_ROW = " → furnace/operation/Y · observed causal [tool call @2026-10-15T11:30:00.000Z]";
  /** Two run rows, A then B, each with one neighbour observed beside the run. */
  function twoRows(): ObservationProjection {
    const projection = capped();
    observe(projection, "A");
    observe(projection, "B");
    observe(projection, "X", false);
    observe(projection, "Y", false);
    relate(projection, "A", "X", "dependency", "declared workflow", T1);
    relate(projection, "B", "Y", "causation", "tool call", T2);
    return projection;
  }

  it("j and k move the slice with the selection: each selected node shows only its own neighbours", async () => {
    const run = await openRun(runTask(), depsOf(observationOf(twoRows())));
    run.press(DETAILS);
    let lines = run.lines();
    expect(lines).toContain(" Native ref: furnace/operation/A");
    expect(edgeRows(lines)).toEqual([X_ROW]);
    run.press(DOWN);
    lines = run.lines();
    expect(lines).toContain(" Native ref: furnace/operation/B");
    expect(edgeRows(lines)).toEqual([Y_ROW]);
    run.press(UP);
    expect(edgeRows(run.lines())).toEqual([X_ROW]);
  });

  it("the slice is read for the selected node alone, again only when the selection or the relation topology changes, and at the host's page", async () => {
    const projection = twoRows();
    const reads = vi.spyOn(projection, "relationsPage");
    const focusOf = (): (string | undefined)[] => reads.mock.calls.map(([input]) => input.to ?? input.from);
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    run.lines();
    expect(focusOf()).toEqual([keyOf("A"), keyOf("A")]);
    run.lines();
    run.lines();
    // A redraw with the same selection and the same relation revision reads nothing.
    expect(reads).toHaveBeenCalledTimes(2);
    run.press(DOWN);
    run.lines();
    expect(focusOf().slice(2)).toEqual([keyOf("B"), keyOf("B")]);
    // A relation observed under the selection is a new revision: read once more, shown on the next redraw.
    relate(projection, "B", "Z", "dependency", "declared workflow", T1);
    const after = run.lines();
    expect(focusOf().slice(4)).toEqual([keyOf("B"), keyOf("B")]);
    expect(edgeRows(after)).toEqual([
      " → furnace/operation/Z · declared dependency · unobserved endpoint [declared workflow @2026-10-15T11:00:00.000Z]",
      Y_ROW,
    ]);
    run.lines();
    expect(reads).toHaveBeenCalledTimes(6);
    for (const [input] of reads.mock.calls) expect(input.limit).toBe(CAP);
    for (const result of reads.mock.results) expect(result.type === "return" ? result.value.limitApplied : undefined).toBe(CAP);
  });
});

describe("ruling (a): the slice's relation page is the read cap the host declares for its projection, never a literal", () => {
  function twelveDownstream(): ObservationProjection {
    const projection = capped();
    observe(projection, "F");
    for (const id of idsOf("d", 12)) {
      observe(projection, id, false);
      relate(projection, "F", id);
    }
    return projection;
  }

  it("a host declaring a page of 7 gets a 7-row lower bound; the same projection at a page of 40 counts all 12", async () => {
    const small = await openRun(runTask(), depsOf(observationOf(twelveDownstream(), { relationPage: 7 })));
    small.press(DETAILS);
    const lowerBound = small.lines();
    expect(lowerBound).toContain(" Topology: incomplete trace (relations truncated)");
    expect(lowerBound).toContain(" Downstream (7+)");
    expect(edgeRows(lowerBound)).toHaveLength(7);
    const full = await openRun(runTask(), depsOf(observationOf(twelveDownstream())));
    full.press(DETAILS);
    const counted = full.lines();
    expect(counted).toContain(" Downstream (12)");
    expect(edgeRows(counted)).toHaveLength(10);
    expect(counted).toContain(" … +2 more (bounded)");
    expect(counted.filter(line => line.startsWith(" Topology: incomplete trace"))).toEqual([]);
  });

  it("src/index.ts builds the session projection with WORKBENCH_PROJECTION_MAX_QUERY and hands the menu that same constant as relationPage", () => {
    const source = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
    // Content-anchored by names, never a line number: the one projection the extension builds, and the deps it hands the menu.
    const built = [...source.matchAll(/new ObservationProjection\(\{([^}]*)\}\)/g)].map(match => match[1]);
    expect(built).toHaveLength(1);
    expect(built[0]).toMatch(/\bmaxQuery:\s*WORKBENCH_PROJECTION_MAX_QUERY\b/);
    expect(built[0]).not.toMatch(/\bmaxQuery:\s*\d/);
    const start = source.indexOf("const workflowMenuDeps: WorkflowMenuDeps = {");
    expect(start).toBeGreaterThan(-1);
    const deps = source.slice(start, source.indexOf("getRecord:", start));
    expect(deps).toMatch(/\brelationPage:\s*WORKBENCH_PROJECTION_MAX_QUERY\b/);
    // The exported cap is a page the selector accepts, and the bound a projection built with it enforces on every read.
    expect(Number.isSafeInteger(WORKBENCH_PROJECTION_MAX_QUERY)).toBe(true);
    const projection = new ObservationProjection({ maxQuery: WORKBENCH_PROJECTION_MAX_QUERY });
    observe(projection, "F");
    expect(() => selectLinkedTopology({ scope, relations: projection }, keyOf("F"), { relationPage: WORKBENCH_PROJECTION_MAX_QUERY })).not.toThrow();
    expect(projection.relationsPage({ scope, from: keyOf("F"), limit: Number.MAX_SAFE_INTEGER }).limitApplied).toBe(WORKBENCH_PROJECTION_MAX_QUERY);
  });
});

describe('docs/workbench/10 § Implemented experimental native details at 2026-10-15: "Closing a native detail view is observational and issues no cancellation."', () => {
  it("closing the dialog from a details view showing a wired slice aborts nothing, calls no control verb and writes nothing to the projection", async () => {
    const projection = capped();
    for (const id of ["F", "D"]) observe(projection, id);
    relate(projection, "F", "D", "causation", "tool call", T2);
    const task = runTask();
    const control = controlled(task);
    const deps = depsOf(observationOf(projection));
    const run = await openRun(task, deps);
    run.press(DETAILS);
    expect(edgeRows(run.lines())).toEqual([" → furnace/operation/D · observed causal [tool call @2026-10-15T11:30:00.000Z]"]);
    const revisions = () => ({ relations: projection.relationRevision(), rows: projection.window({ scope, invocationId: RUN, offset: 0, limit: 1 }).revision });
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

  it('docs/workbench/10 § Failure and deception defenses, "Cancel controls unavailable for observers without lifecycle authority": selection changes over wired slices issue no provider call, no evidence load and no control verb', async () => {
    const projection = capped();
    observe(projection, "A");
    observe(projection, "B");
    observe(projection, "X", false);
    observe(projection, "Y", false);
    relate(projection, "A", "X", "dependency", "declared workflow", T1);
    relate(projection, "B", "Y", "causation", "tool call", T2);
    const evidence = new EvidenceStore({ loaders: [], maxEntries: 4, maxBytes: 1024, timeoutMs: 1000, scope });
    const loads = vi.spyOn(evidence, "request");
    const aborts = vi.spyOn(evidence, "abortAll");
    const writes = [
      vi.spyOn(projection, "refresh"), vi.spyOn(projection, "ingest"), vi.spyOn(projection, "relate"),
      vi.spyOn(projection, "markStale"), vi.spyOn(projection, "disconnect"), vi.spyOn(projection, "reconnect"),
    ];
    const task = runTask();
    const control = controlled(task);
    const deps = depsOf(observationOf(projection, { evidence }));
    const run = await openRun(task, deps);
    run.press(DETAILS);
    const shown: string[][] = [edgeRows(run.lines())];
    for (const key of [DOWN, UP, DOWN]) {
      run.press(key);
      shown.push(edgeRows(run.lines()));
    }
    const x = " → furnace/operation/X · declared dependency [declared workflow @2026-10-15T11:00:00.000Z]";
    const y = " → furnace/operation/Y · observed causal [tool call @2026-10-15T11:30:00.000Z]";
    expect(shown).toEqual([[x], [y], [x], [y]]);
    expect(loads).not.toHaveBeenCalled();
    expect(aborts).not.toHaveBeenCalled();
    for (const write of writes) expect(write).not.toHaveBeenCalled();
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(task.abortController.signal.aborted).toBe(false);
    expect(run.notify).not.toHaveBeenCalled();
    expect(deps.getRecord).not.toHaveBeenCalled();
  });
});

describe("falsifier: details rendering is byte-identical when the projection or the slice is absent", () => {
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
    const expected = legacy.render(WIDTH);
    const withRows = capped();
    observe(withRows, "F");
    const unscoped = runTask();
    unscoped.status = "completed";
    unscoped.endTime = task.endTime;
    unscoped.startTime = task.startTime;
    unscoped.observationScope = undefined;
    const noProjection = await openRun(task, depsOf(undefined));
    expect(noProjection.lines()).toEqual(expected);
    const noScope = await openRun(unscoped, depsOf(observationOf(withRows)));
    expect(noScope.lines()).toEqual(expected);
  });

  it("no slice: a host that declares no read cap, or a page the selector refuses, renders the details view exactly as the unwired model does", async () => {
    const projection = capped();
    for (const id of ["F", "D"]) observe(projection, id);
    relate(projection, "F", "D", "causation", "tool call", T2);
    const unwired: InspectorModel = { projection, scope, invocationId: RUN, title: TITLE, status: "running" };
    const state = reduceInspectorKey(DETAILS, initialInspectorState(), unwired)?.state ?? initialInspectorState();
    const expected = layoutInspector(unwired, state, { width: WIDTH, rows: ROWS });
    expect(expected).toContain(" Relations: causation");
    for (const relationPage of ["undeclared", 0, 101] as const) {
      const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage })));
      run.press(DETAILS);
      expect(run.lines()).toEqual(expected);
    }
    // Not vacuous: the same projection at a declared page the selector accepts renders the slice instead.
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    wired.press(DETAILS);
    const lines = wired.lines();
    expect(lines).not.toEqual(expected);
    expect(lines).toContain(" Downstream (1)");
  });
});

describe("display path: producer text reaching the operator through the wired slice passes the landed named-layout sanitizer", () => {
  it("a hostile neighbour id and provenance source render redacted, with no unsafe code point, and the row still renders", async () => {
    const override = String.fromCodePoint(0x202e);
    const nextLine = String.fromCodePoint(0x85);
    const zeroWidth = String.fromCodePoint(0x200b);
    // Obviously fake placeholders in the shapes the shared redactor recognises.
    const fakeKey = "sk-ant-FAKE0PLACEHOLDER0KEY";
    const fakeToken = "FAKE0TOKEN0FOR0TEST0ONLY";
    const projection = capped();
    observe(projection, "F");
    relate(projection, "F", `${fakeKey}${nextLine}tail`, "dependency", `tool call Bearer ${fakeToken}${override}rtl${zeroWidth}`, T1);
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    run.press(DETAILS);
    const rows = edgeRows(run.lines());
    // Names-only projections: the rendered row may carry producer text, so no assertion below touches it raw; a
    // failure names the broken check, the leaked placeholder or the unsafe code point, never the row itself.
    expect(rows.length).toBe(1);
    const row = rows[0] ?? "";
    expect({ neighbourRow: row.startsWith(" → furnace/operation/"), redactionMarker: row.includes("[REDACTED]") }).toEqual({
      neighbourRow: true,
      redactionMarker: true,
    });
    const placeholders = { fakeKey, fakeKeyBody: "FAKE0PLACEHOLDER0KEY", fakeToken };
    expect(Object.entries(placeholders).filter(([, secret]) => row.includes(secret)).map(([name]) => name)).toEqual([]);
    const unsafe = [...row]
      .map(unit => unit.codePointAt(0) ?? 0)
      .filter(point => point < 0x20 || (point >= 0x7f && point <= 0x9f) || (point >= 0x202a && point <= 0x202e) || (point >= 0x2066 && point <= 0x2069) || point === 0x200b)
      .map(point => `U+${point.toString(16).toUpperCase().padStart(4, "0")}`);
    expect(unsafe).toEqual([]);
  });
});
