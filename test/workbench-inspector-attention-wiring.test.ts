/**
 * W15-C2w/VC-5 (wb-6ze.36): the dialog/host wiring supplies the workbench.attention/v1 AttentionReport to the inspector overview.
 * The selector (selectAttention, src/workbench/attention.ts) and the renderer (wb-6ze.21, the overview attention panel of
 * src/ui/workflow-inspector.ts) are landed and untouched: every row drives the real host seam, showWorkflowDialog in
 * src/ui/workflow-menu.ts, over a real ObservationProjection and the real WorkflowDialog, and reads the lines the operator sees.
 * Each row quotes the bead acceptance: docs/workbench/10 § Four views (Overview), docs/workbench/02 WB-010, and the selector's
 * own clock contract (ATTENTION_CLOCK_CAVEAT: the caller clock is an explicit input, never read inside the wiring).
 */
import { readFileSync } from "node:fs";
import ts from "typescript";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WORKBENCH_ATTENTION_BOTTLENECKS, WORKBENCH_PROJECTION_MAX_QUERY } from "../src/index.js";
import { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorState, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import {
  ATTENTION_CLOCK_CAVEAT,
  ATTENTION_CONTRACT,
  ATTENTION_CRITICAL_PATH_CAVEAT,
  type AttentionInput,
  selectAttention,
} from "../src/workbench/attention.js";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation, type RelationKind } from "../src/workbench/observation.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";

const scope: ObservationScope = { workspace: "/workspace/attention-wiring", principal: "local-operator:1000:session-attention" };
const RUN = "wf_attentionwire1";
/** A second invocation observed in the same scope: never part of the run's report. */
const OTHER = "wf_attentionwire2";
const TITLE = "attention wiring";
const WIDTH = 120;
const ROWS = 40;
/** The read cap the rows build their projection with and hand the host seam, as src/index.ts does with WORKBENCH_PROJECTION_MAX_QUERY. */
const CAP = 40;
/** The bottleneck cap the rows hand the host seam, as src/index.ts does with WORKBENCH_ATTENTION_BOTTLENECKS; no row depends on the two being equal. */
const BOTTLENECKS = 3;
/** The instant the rows' host clock reads first, in seconds past the fixture origin. The process clock reads days later. */
const NOW = 80;
const ESC = String.fromCharCode(0x1b);
const TAB = "\t";
const DOWN = "j";
const FOCUS = "f";
const FILTER = "/";
const ENTER = "\r";
const at = (seconds: number): string => new Date(Date.UTC(2026, 9, 15, 12, 0, seconds)).toISOString();
const ref = (id: string, provider = "furnace"): NativeRef => ({ provider, type: "operation", id });

interface Seed {
  id: string;
  title: string;
  tone: Presentation["statusTone"];
  start?: number;
  end?: number;
  provider?: string;
  invocation?: string;
  /** Seconds past the origin the snapshot was captured at; a later capture updates an observed operation. */
  captured?: number;
  in?: ObservationScope;
}
/** An observed operation of the run (or of another invocation), with a producer-stated interval when the seed has one. */
function observe(projection: ObservationProjection, seed: Seed): void {
  projection.refresh({
    source: ref(seed.id, seed.provider), scope: seed.in ?? scope, capturedAt: at(seed.captured ?? 0), observedAt: at(seed.captured ?? 0),
    node: { title: seed.title, type: "sdk-operation", statusText: seed.tone, statusTone: seed.tone },
    trace: { invocationId: seed.invocation ?? RUN },
    ...(seed.start !== undefined ? { interval: { startedAt: at(seed.start), ...(seed.end !== undefined ? { endedAt: at(seed.end) } : {}) } } : {}),
  });
}
function relate(projection: ObservationProjection, from: NativeRef, to: NativeRef, kind: RelationKind, within: ObservationScope = scope): void {
  projection.relate({ scope: within, from, to, kind, provenance: { source: "furnace", observedAt: at(0) } });
}
/**
 * A run with every reading the overview panel draws: two settled operations joined by one observed dependency with complete
 * intervals (a partial-estimated chain of 12 s), two open operations (the measured bottlenecks: Build image open 60 s and Verify
 * open 50 s at the rows' first clock reading) and one active operation with no interval (one unmeasured).
 */
function attended(within: ObservationScope = scope): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: CAP });
  seedRun(projection, within);
  return projection;
}
function seedRun(projection: ObservationProjection, within: ObservationScope = scope, prefix = ""): void {
  observe(projection, { id: `${prefix}fetch`, title: `${prefix}Fetch sources`, tone: "success", start: 0, end: 5, in: within });
  observe(projection, { id: `${prefix}compile`, title: `${prefix}Compile`, tone: "success", start: 5, end: 12, in: within });
  observe(projection, { id: `${prefix}build`, title: `${prefix}Build image`, tone: "active", start: 20, in: within });
  observe(projection, { id: `${prefix}verify`, title: `${prefix}Verify`, tone: "waiting", start: 30, in: within });
  observe(projection, { id: `${prefix}lint`, title: `${prefix}Lint`, tone: "active", in: within });
  relate(projection, ref(`${prefix}fetch`), ref(`${prefix}compile`), "dependency", within);
}
/** Three waiting operations of another invocation in the run's scope, each open longer than any of the run's own. */
function besideRun(projection: ObservationProjection): ObservationProjection {
  for (const id of ["o1", "o2", "o3"]) observe(projection, { id, title: `Other ${id}`, tone: "waiting", start: 1, invocation: OTHER });
  return projection;
}

function runTask(id = RUN): WorkflowTask {
  const task = createWorkflowTask({ id, script: "return 1;", meta: { name: TITLE, description: "fixture run" } });
  task.observationScope = { ...scope, sessionId: "session-attention" };
  return task;
}
function controlled(task: WorkflowTask) {
  const control = { pause: vi.fn(), resume: vi.fn(), isPaused: vi.fn(() => false), skip: vi.fn(() => true), retry: vi.fn(() => true) };
  task.control = control;
  return control;
}

/** The host clock seam the rows hand the menu: a counted function over a settable instant, never the process clock. */
function hostClock(seconds = NOW) {
  let now = seconds;
  const read = vi.fn((): string => at(now));
  return {
    read,
    set: (next: number): void => {
      now = next;
    },
  };
}

type HostObservation = NonNullable<WorkflowMenuDeps["observation"]>;
/** What src/index.ts hands the menu. "undeclared" is a host that states no such value for its projection. */
function observationOf(
  projection: ObservationProjection,
  options: {
    relationPage?: number | "undeclared";
    attention?: "undeclared";
    bottlenecks?: number;
    now?: () => string;
    evidence?: EvidenceStore;
    scopeOf?: (task: WorkflowTask) => ObservationScope | undefined;
  } = {},
): HostObservation {
  const page = options.relationPage ?? CAP;
  return {
    projection,
    scope:
      options.scopeOf ??
      (task => (task.observationScope ? { workspace: task.observationScope.workspace, principal: task.observationScope.principal } : undefined)),
    ...(page === "undeclared" ? {} : { relationPage: page }),
    ...(options.attention === "undeclared" ? {} : { attention: { bottlenecks: options.bottlenecks ?? BOTTLENECKS, now: options.now ?? hostClock().read } }),
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

/** The observation the host hands the inspector before any report: what the overview draws today. */
const unwired = (projection: ObservationProjection, within: ObservationScope = scope, invocationId = RUN): InspectorModel => ({
  projection, scope: within, invocationId, title: TITLE, status: "running",
});
/** The inspector state the dialog reaches by these keys, through the same reducer. */
function stateAfter(projection: ObservationProjection, keys: readonly string[], within: ObservationScope = scope): InspectorState {
  let state = initialInspectorState();
  for (const key of keys) state = reduceInspectorKey(key, state, unwired(projection, within))?.state ?? state;
  return state;
}
/** The input the bead names: the observed invocation, the host's declared caps and the host clock's reading. */
const inputOf = (over: Partial<AttentionInput> = {}): AttentionInput => ({
  scope, invocationId: RUN, now: at(NOW), limit: CAP, bottlenecks: BOTTLENECKS, ...over,
});
/** Exactly what the landed renderer draws for the report the landed selector computes from that input. */
function drawn(projection: ObservationProjection, keys: readonly string[] = [], over: Partial<AttentionInput> = {}, width = WIDTH, rows = ROWS): string[] {
  const input = inputOf(over);
  const attention = selectAttention(projection, input);
  return layoutInspector({ ...unwired(projection, input.scope, input.invocationId), attention }, stateAfter(projection, keys, input.scope), { width, rows });
}
/** The overview the unwired dialog draws today, for the same keys. */
const fallback = (projection: ObservationProjection, keys: readonly string[] = [], width = WIDTH, rows = ROWS): string[] =>
  layoutInspector(unwired(projection), stateAfter(projection, keys), { width, rows });
/** The drawn text as one run of words, so a caveat wrapped over two lines still reads whole. */
const textOf = (lines: readonly string[]): string => lines.map(line => line.trim()).join(" ").replace(/\s+/gu, " ");
const MEASURED = /open \d\d:\d\d measured/u;
/**
 * A selector read the host seam made for the run. The rows' own reference reads (drawn) pass `scope` itself; the host seam
 * passes the scope its scope function returns, a fresh object on every redraw, so the two are told apart by identity.
 */
const fromHost = ([input]: Parameters<ObservationProjection["query"]>): boolean => input.invocationId === RUN && input.scope !== scope;

describe('(a) docs/workbench/10 § Four views, Overview: "attention panel and top measured bottlenecks. Critical path must be shown as *partial/estimated* when relationships/times incomplete."', () => {
  it("with a projection present the host supplies the workbench.attention/v1 report: the overview draws selectAttention over the live projection", async () => {
    const projection = attended();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection));
    // The panel takes the place of the two fixed lines the unwired overview draws.
    expect(lines).not.toEqual(fallback(projection));
    expect(lines.filter(line => line.includes("Attention: stale/unknown is last-known state"))).toEqual([]);
    expect(lines).toContain(" Attention: active 2 · waiting 1 · stale 0 · unknown 0 · disconnected 0");
    expect(lines.filter(line => MEASURED.test(line)).map(line => [line.includes("Build image"), line.match(MEASURED)?.[0]])).toEqual([
      [true, "open 01:00 measured"],
      [false, "open 00:50 measured"],
    ]);
    expect(lines).toContain(" +1 unmeasured (no open interval)");
    expect(selectAttention(projection, inputOf()).contract).toBe(ATTENTION_CONTRACT);
  });

  it("the caveat strings are surfaced: ATTENTION_CLOCK_CAVEAT qualifies the measured open times and ATTENTION_CRITICAL_PATH_CAVEAT the partial-estimated chain", async () => {
    const projection = attended();
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    const text = textOf(run.lines());
    expect(text).toContain(`Clock: ${ATTENTION_CLOCK_CAVEAT}`);
    expect(text).toContain("Critical path: partial-estimated 00:12 over 2 nodes/1 edges");
    expect(text).toContain(ATTENTION_CRITICAL_PATH_CAVEAT);
  });

  it("times incomplete: a dependency whose interval is still open draws the incomplete trace, never a duration", async () => {
    const projection = attended();
    // The open Build image becomes a dependency target: the chain through it has no measured end.
    relate(projection, ref("compile"), ref("build"), "dependency");
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection));
    const text = textOf(lines);
    expect(text).toContain("Critical path: incomplete trace (open-intervals)");
    expect(text).not.toContain("partial-estimated");
    expect(text).not.toContain(ATTENTION_CRITICAL_PATH_CAVEAT);
  });

  it("for the observed invocation only: another invocation's operations in the same scope change neither the counts nor the bottlenecks", async () => {
    const alone = attended();
    const beside = besideRun(attended());
    const run = await openRun(runTask(), depsOf(observationOf(beside)));
    const lines = run.lines();
    expect(lines).toEqual(drawn(beside));
    // The run's overview reads exactly as it does with nothing else in the scope.
    const solo = await openRun(runTask(), depsOf(observationOf(alone)));
    expect(lines).toEqual(solo.lines());
    expect(lines.filter(line => line.includes("Other o"))).toEqual([]);
    expect(lines).toContain(" Attention: active 2 · waiting 1 · stale 0 · unknown 0 · disconnected 0");
    // Not vacuous: the other invocation's own dialog draws its own report.
    const other = await openRun(runTask(OTHER), depsOf(observationOf(beside)));
    const otherLines = other.lines();
    expect(otherLines).toEqual(drawn(beside, [], { invocationId: OTHER }));
    expect(otherLines).toContain(" Attention: active 0 · waiting 3 · stale 0 · unknown 0 · disconnected 0");
  });
});

describe("(b) the report is recomputed only on a projection revision change", () => {
  it("redraws, keys and a moving clock at one revision compute once and read the host clock once; each revision change computes once more", async () => {
    const projection = attended();
    const clock = hostClock();
    const queries = vi.spyOn(projection, "query");
    const computes = (): number => queries.mock.calls.filter(fromHost).length;
    const run = await openRun(runTask(), depsOf(observationOf(projection, { now: clock.read })));
    run.lines();
    run.lines();
    run.lines();
    expect({ clock: clock.read.mock.calls.length, computes: computes() }).toEqual({ clock: 1, computes: 1 });
    // Selection, focus and the filter redraw the overview from the held report.
    const keys = [DOWN, DOWN, FOCUS, FOCUS, FILTER, "B", ENTER];
    for (const key of keys) {
      run.press(key);
      run.lines();
    }
    expect({ clock: clock.read.mock.calls.length, computes: computes() }).toEqual({ clock: 1, computes: 1 });
    // The clock moves and the projection does not: the held report stands, measured at the clock of its revision.
    clock.set(95);
    const held = run.lines();
    expect({ clock: clock.read.mock.calls.length, computes: computes() }).toEqual({ clock: 1, computes: 1 });
    expect(held).toEqual(drawn(projection, keys));
    // A node update is a new projection revision: one computation, with one fresh clock reading.
    observe(projection, { id: "lint", title: "Lint", tone: "active", start: 70, captured: 1 });
    const updated = run.lines();
    run.lines();
    expect({ clock: clock.read.mock.calls.length, computes: computes() }).toEqual({ clock: 2, computes: 2 });
    expect(updated).toEqual(drawn(projection, keys, { now: at(95) }));
    expect(updated.filter(line => line.includes("Build image") && MEASURED.test(line)).map(line => line.match(MEASURED)?.[0])).toEqual(["open 01:15 measured"]);
    expect(updated.filter(line => line.includes("unmeasured"))).toEqual([]);
    // A relation observed is a new revision too: one more, and the panel follows it.
    relate(projection, ref("compile"), ref("lint"), "dependency");
    const related = run.lines();
    run.lines();
    expect({ clock: clock.read.mock.calls.length, computes: computes() }).toEqual({ clock: 3, computes: 3 });
    expect(related).toEqual(drawn(projection, keys, { now: at(95) }));
    expect(textOf(related)).toContain("Critical path: incomplete trace (open-intervals)");
  });

  it("only the overview asks for the report: the graph, timeline and details views compute nothing and read no clock", async () => {
    const projection = attended();
    const clock = hostClock();
    const run = await openRun(runTask(), depsOf(observationOf(projection, { now: clock.read })));
    for (let view = 0; view < 3; view++) {
      run.press(TAB);
      run.lines();
      run.lines();
    }
    expect(clock.read).not.toHaveBeenCalled();
    // Tab from details returns to the overview, which computes the report once.
    run.press(TAB);
    expect(run.lines()).toEqual(drawn(projection, [TAB, TAB, TAB, TAB]));
    run.lines();
    expect(clock.read).toHaveBeenCalledTimes(1);
  });

  it("the held report is reused only for the scope it was computed for: a host that re-reads another scope gets that scope's report", async () => {
    const elsewhere: ObservationScope = { workspace: "/workspace/attention-elsewhere", principal: scope.principal };
    const projection = attended();
    seedRun(projection, elsewhere, "e-");
    observe(projection, { id: "e-extra", title: "e-Extra wait", tone: "waiting", start: 10, in: elsewhere });
    let current: ObservationScope = scope;
    const clock = hostClock();
    const run = await openRun(runTask(), depsOf(observationOf(projection, { now: clock.read, scopeOf: () => current })));
    expect(run.lines()).toEqual(drawn(projection));
    current = elsewhere;
    const moved = run.lines();
    expect(moved).toEqual(drawn(projection, [], { scope: elsewhere }));
    expect(moved).toContain(" Attention: active 2 · waiting 2 · stale 0 · unknown 0 · disconnected 0");
    expect(clock.read).toHaveBeenCalledTimes(2);
  });
});

describe("(c) AttentionInput caps and now() are injected from the host, never literals and never a clock read inside the wiring", () => {
  it("the bottlenecks listed are the host's declared cap: 1 lists the longest open interval alone, 2 lists both", async () => {
    for (const cap of [1, 2]) {
      const projection = attended();
      const run = await openRun(runTask(), depsOf(observationOf(projection, { bottlenecks: cap })));
      const lines = run.lines();
      expect(lines, `cap ${cap}`).toEqual(drawn(projection, [], { bottlenecks: cap }));
      expect(lines.filter(line => MEASURED.test(line)).map(line => line.includes("Build image")), `cap ${cap}`).toEqual(cap === 1 ? [true] : [true, false]);
    }
  });

  it("the page examined is the host's declared read cap: a page of 3 examines 3 of the run's 5 operations and says the page is truncated", async () => {
    const projection = attended();
    const queries = vi.spyOn(projection, "query");
    const run = await openRun(runTask(), depsOf(observationOf(projection, { relationPage: 3 })));
    const lines = run.lines();
    expect(queries.mock.calls.filter(fromHost).map(([input]) => input.limit)).toEqual([3]);
    expect(lines).toEqual(drawn(projection, [], { limit: 3 }));
    expect(textOf(lines)).toContain("page truncated");
    // Not vacuous: the host's full page examines every operation and truncates nothing.
    const whole = await openRun(runTask(), depsOf(observationOf(attended())));
    expect(textOf(whole.lines())).not.toContain("page truncated");
  });

  it("now() is the host clock seam: open times are measured against its reading, while the process clock reads days later", async () => {
    const projection = attended();
    const clock = hostClock();
    const run = await openRun(runTask(), depsOf(observationOf(projection, { now: clock.read })));
    const lines = run.lines();
    expect(clock.read).toHaveBeenCalledTimes(1);
    expect(Date.now() - Date.parse(at(NOW))).toBeGreaterThan(86_400_000);
    expect(lines).toEqual(drawn(projection, [], { now: at(NOW) }));
    expect(lines.filter(line => line.includes("Build image") && MEASURED.test(line)).map(line => line.match(MEASURED)?.[0])).toEqual(["open 01:00 measured"]);
  });

  it("a host clock outside the selector's contract is the selector's typed refusal, never caught into a fabricated or silent report", async () => {
    const projection = attended();
    const run = await openRun(runTask(), depsOf(observationOf(projection, { now: () => "not a timestamp" })));
    expect(() => run.lines()).toThrow(/Attention selection refused: now must be the caller's clock/u);
  });
});

describe("(d) falsifier: inspector rendering is byte-identical when the projection or the report is absent", () => {
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
    const unscoped = runTask();
    unscoped.status = "completed";
    unscoped.startTime = task.startTime;
    unscoped.endTime = task.endTime;
    unscoped.observationScope = undefined;
    const noProjection = await openRun(task, depsOf(undefined));
    expect(noProjection.lines()).toEqual(expected);
    const noScope = await openRun(unscoped, depsOf(observationOf(attended())));
    expect(noScope.lines()).toEqual(expected);
  });

  it("no report: a host that declares no attention clock and cap, or no read cap, draws the overview exactly as the unwired model does", async () => {
    const projection = attended();
    const expected = fallback(projection);
    expect(expected).toContain(" Attention: stale/unknown is last-known state, not live progress.");
    expect(expected).toContain(" Critical path: incomplete trace (no complete dependency/interval proof).");
    const clock = hostClock();
    const hosts = [observationOf(projection, { attention: "undeclared" }), observationOf(projection, { relationPage: "undeclared", now: clock.read })];
    for (const host of hosts) {
      const run = await openRun(runTask(), depsOf(host));
      expect(run.lines()).toEqual(expected);
      run.press(DOWN);
      expect(run.lines()).toEqual(fallback(projection, [DOWN]));
    }
    expect(clock.read).not.toHaveBeenCalled();
    // Not vacuous: the same projection behind a host that declares both draws the attention panel instead.
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    expect(wired.lines()).not.toEqual(expected);
  });

  it("the graph, timeline and details views of a wired host render exactly as the same host without an attention clock and cap", async () => {
    const projection = attended();
    const wired = await openRun(runTask(), depsOf(observationOf(projection)));
    const bare = await openRun(runTask(), depsOf(observationOf(projection, { attention: "undeclared" })));
    expect(wired.lines()).not.toEqual(bare.lines());
    for (const view of ["graph", "timeline", "details"]) {
      wired.press(TAB);
      bare.press(TAB);
      const lines = wired.lines();
      expect(lines.some(line => line.startsWith(` ${view.toUpperCase()} `)), view).toBe(true);
      expect(lines, view).toEqual(bare.lines());
    }
  });
});

describe('(e) docs/workbench/02-atomic-requirements.md WB-010: "Stopping the parent propagates cancellation only through established ownership and appropriate SDK API; stopping observation does not."', () => {
  const revisionOf = (projection: ObservationProjection) => () => ({
    relations: projection.relationRevision(),
    rows: projection.window({ scope, invocationId: RUN, offset: 0, limit: 1 }).revision,
  });

  it("closing the dialog from an overview drawing a wired report aborts nothing, calls no control verb, reads no clock and writes nothing", async () => {
    const projection = attended();
    const task = runTask();
    const control = controlled(task);
    const clock = hostClock();
    const deps = depsOf(observationOf(projection, { now: clock.read }));
    const run = await openRun(task, deps);
    expect(run.lines()).toEqual(drawn(projection));
    const revisions = revisionOf(projection);
    const before = revisions();
    const reads = clock.read.mock.calls.length;
    run.press(ESC);
    await run.closed;
    expect(task.abortController.signal.aborted).toBe(false);
    expect(task.status).toBe("running");
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(run.notify).not.toHaveBeenCalled();
    expect(deps.viewAgentConversation).not.toHaveBeenCalled();
    expect(deps.viewClaudeTranscript).not.toHaveBeenCalled();
    expect(revisions()).toEqual(before);
    expect(clock.read.mock.calls.length).toBe(reads);
  });

  it("disposing the overlay while the overview draws a wired report aborts nothing and calls no control verb", async () => {
    const projection = attended();
    const task = runTask();
    const control = controlled(task);
    const clock = hostClock();
    const run = await openRun(task, depsOf(observationOf(projection, { now: clock.read })));
    expect(run.lines()).toEqual(drawn(projection));
    const revisions = revisionOf(projection);
    const before = revisions();
    run.dialog.dispose();
    expect(task.abortController.signal.aborted).toBe(false);
    expect(task.status).toBe("running");
    for (const verb of Object.values(control)) expect(verb).not.toHaveBeenCalled();
    expect(run.notify).not.toHaveBeenCalled();
    expect(revisions()).toEqual(before);
    expect(clock.read).toHaveBeenCalledTimes(1);
  });

  it("computing the report reads only: across recomputes no projection write, no evidence load and no control verb", async () => {
    const projection = attended();
    const evidence = new EvidenceStore({ loaders: [], maxEntries: 4, maxBytes: 1024, timeoutMs: 1000, scope });
    const loads = vi.spyOn(evidence, "request");
    const aborts = vi.spyOn(evidence, "abortAll");
    const task = runTask();
    const control = controlled(task);
    const run = await openRun(task, depsOf(observationOf(projection, { evidence })));
    run.lines();
    observe(projection, { id: "verify", title: "Verify", tone: "waiting", start: 30, captured: 1 });
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

describe("(f) the AttentionInput the wiring builds carries the host's declared caps and clock reading, never a literal or a clock of its own", () => {
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

  it("src/ui/workflow-menu.ts: the input carries the factory's page, bottlenecks and clock reading, with no literal, no clock of its own and no catch", () => {
    const file = sourceOf("src/ui/workflow-menu.ts");
    const factories = collect(file, ts.isFunctionDeclaration).filter(fn => fn.name?.text === "attentionReport");
    expect(factories).toHaveLength(1);
    const factory = factories[0];
    expect(factory.parameters.map(parameter => parameter.name.getText(file))).toEqual(["projection", "invocationId", "page", "bottlenecks", "now"]);
    expect(collect(factory, ts.isTryStatement)).toEqual([]);
    // The clock is the injected `now`: the read side names no process clock at all.
    expect(collect(factory, ts.isIdentifier).map(identifier => identifier.text).filter(name => ["Date", "performance", "process", "hrtime"].includes(name))).toEqual([]);
    const selections = collect(factory, ts.isCallExpression).filter(call => call.expression.getText(file) === "selectAttention");
    expect(selections).toHaveLength(1);
    const [target, input] = selections[0].arguments;
    expect(target?.getText(file)).toBe("projection");
    const properties = propertiesOf(input, file);
    expect(Object.fromEntries(properties)).toEqual({ scope: "scope", invocationId: "invocationId", now: "now()", limit: "page", bottlenecks: "bottlenecks" });
    expect(input === undefined ? ["no input"] : [...collect(input, ts.isNumericLiteral), ...collect(input, ts.isBigIntLiteral)].map(found => found.getText(file))).toEqual([]);
    // The host side makes the read side from the values the host declared, for the dialog's own invocation.
    const made = collect(file, ts.isCallExpression).filter(call => call.expression.getText(file) === "attentionReport");
    expect(made.map(call => call.arguments.map(argument => argument.getText(file)))).toEqual([
      ["host.projection", "task.id", "host.relationPage", "host.attention.bottlenecks", "host.attention.now"],
    ]);
  });

  it("src/index.ts hands the menu WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_ATTENTION_BOTTLENECKS and the host clock, exported numbers the selector accepts", () => {
    const file = sourceOf("src/index.ts");
    const deps = collect(file, ts.isVariableDeclaration).filter(declaration => declaration.name.getText(file) === "workflowMenuDeps");
    expect(deps).toHaveLength(1);
    const observation = initializerOf(deps[0].initializer, "observation", file);
    expect(propertiesOf(observation, file).get("relationPage")).toBe("WORKBENCH_PROJECTION_MAX_QUERY");
    const attention = propertiesOf(initializerOf(observation, "attention", file), file);
    expect(Object.fromEntries(attention)).toEqual({ bottlenecks: "WORKBENCH_ATTENTION_BOTTLENECKS", now: "() => new Date().toISOString()" });
    const exported = collect(file, ts.isVariableStatement)
      .filter(statement => statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword))
      .flatMap(statement => [...statement.declarationList.declarations])
      .filter(declaration => declaration.name.getText(file) === "WORKBENCH_ATTENTION_BOTTLENECKS");
    expect(exported.map(declaration => declaration.initializer !== undefined && ts.isNumericLiteral(declaration.initializer))).toEqual([true]);
    expect(Number.isSafeInteger(WORKBENCH_ATTENTION_BOTTLENECKS) && WORKBENCH_ATTENTION_BOTTLENECKS >= 1 && WORKBENCH_ATTENTION_BOTTLENECKS <= 20).toBe(true);
    // The selector accepts the host's page and cap, and lists no more bottlenecks than the cap.
    const projection = new ObservationProjection({ maxQuery: WORKBENCH_PROJECTION_MAX_QUERY });
    for (let i = 0; i < WORKBENCH_ATTENTION_BOTTLENECKS + 2; i++) observe(projection, { id: `open${i}`, title: `Open ${i}`, tone: "active", start: i });
    const report = selectAttention(projection, inputOf({ limit: WORKBENCH_PROJECTION_MAX_QUERY, bottlenecks: WORKBENCH_ATTENTION_BOTTLENECKS }));
    expect(report.bottlenecks).toHaveLength(WORKBENCH_ATTENTION_BOTTLENECKS);
    expect(report.examined).toEqual({ nodes: WORKBENCH_ATTENTION_BOTTLENECKS + 2, truncated: false });
  });
});

describe("display path: producer text reaching the operator through the wired attention report passes the landed named-layout sanitizers", () => {
  it("credential-shaped titles of open operations, one carrying a zero-width and a bidi control, render redacted in their bottleneck rows with no unsafe code point", async () => {
    const zeroWidth = String.fromCodePoint(0x200b);
    const override = String.fromCodePoint(0x202e);
    // Obviously fake placeholders in shapes the shared redactor recognises; each title fits its bottleneck row at this width,
    // so an unsanitized title would show its placeholder whole and the leak check below can fail.
    const placeholders = { bearerToken: "FAKE0TKN", prefixedKey: "sk-ant-FAKE0KEY" };
    const projection = new ObservationProjection({ maxQuery: CAP });
    observe(projection, { id: "first", title: `Deploy ${placeholders.prefixedKey}`, tone: "active", start: 0 });
    observe(projection, { id: "second", title: `op${zeroWidth}Bearer ${placeholders.bearerToken}${override}tail`, tone: "waiting", start: 10 });
    const run = await openRun(runTask(), depsOf(observationOf(projection)));
    const lines = run.lines();
    expect(lines).toEqual(drawn(projection));
    // Names-only projections: no assertion below prints a rendered row.
    const rows = lines.filter(line => MEASURED.test(line));
    const unsafe = lines
      .flatMap(line => [...line])
      .map(unit => unit.codePointAt(0) ?? 0)
      .filter(point => point < 0x20 || (point >= 0x7f && point <= 0x9f) || (point >= 0x202a && point <= 0x202e) || (point >= 0x2066 && point <= 0x2069) || point === 0x200b)
      .map(point => `U+${point.toString(16).toUpperCase().padStart(4, "0")}`);
    const leaked = Object.entries(placeholders).filter(([, secret]) => lines.some(line => line.includes(secret))).map(([name]) => name);
    expect({
      rows: rows.length,
      redacted: rows.map(row => row.includes("[REDACTED]")),
      deployKept: rows[0]?.includes("Deploy ") ?? false,
      leaked,
      unsafe,
    }).toStrictEqual({ rows: 2, redacted: [true, true], deployKept: true, leaked: [], unsafe: [] });
  });
});
