/**
 * wb-6ze.15 (VC-5 residual): the live four-view terminal inspector receipt measures what it claims.
 *
 * Offline assessor tests, red-first, over qa/workbench/live-inspector-receipt.mjs:
 *  - the contract literals, each pinned to the product source it restates (the Tab cycle the inspector reducer walks, the
 *    overlay the dialog opens in, the host's read cap, the local-only provider name, the shared helper's named layout);
 *  - the screen model that replays a pty capture, over hand-written escape streams;
 *  - the frame reader, over frames the PRODUCT draws: the real WorkflowDialog opened through showWorkflowDialog (the seam
 *    /agents -> Workflows and the fleet list share), shown as an overlay by pi-tui's own TuiAltScreen writing to a fake
 *    terminal, whose bytes the screen model replays;
 *  - the judge, over one good journey and one mutant per finding rule and per unrealised reason;
 *  - the receipt builder, with the injected shared helper (sanitizeWorkbenchText) and without one.
 * The live pty run happens only when the runner is invoked as a CLI; nothing here reaches a real pty, the SDK or the network.
 * The CLI-entry rows (gate refusal #1 F3/F4, refusal #2 U1) pin exactly six readings of a staged copy of the runner:
 *  - two entry-point scenarios with no dist/ beside it (run as the entry point it exits 2 at its honest preflight; imported
 *    by a `node -e` entry point that passes its path as argv[1] it runs nothing);
 *  - three closed censuses of its source text: none of the tokens KEEP_CAPTURE, capture.raw, captureRetained or
 *    copyFileSync; the capture file name inspector.capture.txt once and the identifiers capturePath and work only at their
 *    listed lines; process.env and process.argv only at their listed lines;
 *  - one stand-in run (stand-in dist/, pi, script(1) and stty on PATH) whose stand-in script writes a marker into the
 *    capture path and ends before pi starts: exit 2 within 60 s, 'pi TUI did not start' with the ended pty session in its
 *    diagnostics, the capture removed, the out dir holding exactly inspector-receipt.json, the marker in no file under that
 *    run's witness root (the staged runner, the out dir, the run's TMPDIR, cwd and HOME) nor on stdout, and stderr empty
 *    (so no scratch leak report).
 * A copy made on a journey stage past the boot wait (the stand-in session ends first, so no later stage runs) is NOT
 * CLAIMED by this census. A copy to a path outside that witness root is NOT CLAIMED by this census. A re-encoded copy (the
 * marker text absent from it) is NOT CLAIMED by this census. A copy that reaches the capture without the file name,
 * capturePath or work (for example through the screen model's read buffer) and is gated by an input read through another
 * spelling than process.env or process.argv is NOT CLAIMED by this census.
 *
 * Spec lines pinned (docs/workbench/15 VC-5, docs/workbench/10, bead acceptance):
 *  - "Four views: overview/tree, graph, timeline, evidence; hierarchical aggregation; key navigation; responsive 80x24."
 *  - "Relation-rich graphs, grouped swarms, live TUI execution and native evidence content loading remain separately scoped
 *    acceptance." (this receipt closes the live-TUI-execution plus native-evidence-content slice)
 *  - "Spinner should not imply work progressed." / "STALLED vs WAITING vs STALE vs UNKNOWN must not be confused."
 *  - "the receipt pairs each view's rendered rows with the projection's own counts so a mismatch is a finding"
 *  - "exit 2 honestly when the pty session or the four views cannot be driven, never a fake pass"; "every captured frame sanitized"
 */
import { spawnSync } from "node:child_process";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, delimiter, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { type OverlayHandle, type OverlayOptions, type Terminal, TuiAltScreen } from "@earendil-works/pi-tui";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  assessInspectorJourney,
  buildInspectorReceipt,
  cellsOf,
  createScreen,
  exitCodeFor,
  FRAME_LAYOUT,
  FRAME_TEXT_LIMIT,
  feedScreen,
  INSPECTOR_FINDING_RULES,
  INSPECTOR_RECEIPT_CONTRACT,
  INSPECTOR_STATE_CLASSES,
  INSPECTOR_UNREALISED_REASONS,
  INSPECTOR_VIEWS,
  LOCAL_PROVIDERS,
  OVERLAY_GEOMETRY,
  overlayBounds,
  RELATION_PAGE,
  RESPONSIVE_SIZE,
  readInspectorFrame,
  resizeScreen,
  sameNativeRef,
  screenLines,
  stateClassesObserved,
  windowCount,
} from "../qa/workbench/live-inspector-receipt.mjs";
import { WORKBENCH_ATTENTION_BOTTLENECKS, WORKBENCH_PROJECTION_MAX_QUERY, WORKBENCH_TIMELINE_COLUMNS } from "../src/index.js";
import { VIEWPORT_HEIGHT_PCT } from "../src/ui/conversation-viewer.js";
import type { WorkflowDialog } from "../src/ui/workflow-dialog.js";
import { type InspectorModel, type InspectorView, initialInspectorState, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import { showWorkflowDialog, type WorkflowMenuDeps } from "../src/ui/workflow-menu.js";
import { selectAttention } from "../src/workbench/attention.js";
import { type EvidenceLoader, EvidenceStore } from "../src/workbench/evidence-loader.js";
import { type NativeRef, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { sanitizeWorkbenchText } from "../src/workbench/redaction.js";
import { createWorkflowTask, type WorkflowTask } from "../src/workflow/task.js";
import { ctx } from "./helpers/boot-extension.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

/* ------------------------------------------------------------------------- *
 * Typed views of the runner's pure exports (the .mjs carries no types).
 * ------------------------------------------------------------------------- */

interface StatusRow {
  view: string;
  glyph: string;
  pointed: boolean;
  freshness?: string;
  provider?: string;
  text: string;
  runStatus?: string;
}
interface EvidenceReading {
  ref: string;
  state: string;
  label: string;
  reason?: string;
  bytes?: number;
}
interface FrameReading {
  view: string | undefined;
  legacyDialog?: boolean;
  title?: string;
  status?: string;
  capped?: boolean;
  total?: number;
  position?: number;
  following?: boolean;
  paged?: { from: number; to: number; total: number } | null;
  hint?: boolean;
  clipped?: boolean;
  cols?: number;
  rows?: number;
  drawn?: number;
  remainder?: number;
  expected?: number;
  statusRows?: StatusRow[];
  lines?: string[];
  nativeRef?: string;
  provider?: string;
  evidenceRefs?: number;
  evidence?: EvidenceReading;
  attention?: Record<string, number>;
  lanes?: number;
  laneRows?: number;
  nodeStatus?: { text: string; tone: string };
  nodeFreshness?: string;
}
interface Screen {
  cols: number;
  rows: number;
  overflow: number;
  frames: number;
  frame: string[] | undefined;
  syncing: boolean;
}
interface ViewStep {
  view: string;
  keySentAt: string;
  seenAt?: string;
  frame?: FrameReading;
}
interface Attempt {
  sentAt: string;
  seenAt?: string;
  before?: EvidenceReading;
  outcome?: string;
  bytes?: number;
  reason?: string;
}
interface Journey {
  captureRef: string;
  launchAt: string;
  liveAt?: string;
  inspectorOpenedAt?: string;
  views: ViewStep[];
  selection: { keys: number; sentAt?: string; seenAt?: string; nativeRef?: string; provider?: string };
  evidence: { refs?: number; before?: EvidenceReading; attempts: Attempt[] };
  resize: {
    from: { cols: number; rows: number };
    to: { cols: number; rows: number };
    sentAt?: string;
    seenAt?: string;
    overflowAfter: number;
    frame?: FrameReading;
    cycle: FrameReading[];
  };
  rows: StatusRow[];
}
interface Assessment {
  findings: readonly string[];
  realised: boolean;
  reasons: readonly string[];
}
type Sanitize = (text: string, max: number, layout: string) => string;
interface BuildInput {
  utc: string;
  revision: string;
  node: string;
  platform: string;
  arch: string;
  pi?: string;
  commands?: unknown;
  journey: unknown;
  diagnostics?: readonly string[];
  unavailability?: string;
}
interface Receipt extends Assessment {
  contract: string;
  utc: string;
  revision: string;
  node: string;
  platform: string;
  arch: string;
  pi?: string;
  commands?: { pty: string; prompt: string; keys: string[] };
  journey: Journey;
  diagnostics: readonly string[];
  unavailability?: string;
  pass: boolean;
  stateClasses: Record<string, number | string>;
}

const create = createScreen as (cols: number, rows: number) => Screen;
const feed = feedScreen as (screen: Screen, text: string) => number;
const resizeTo = resizeScreen as (screen: Screen, cols: number, rows: number) => void;
const linesOf = screenLines as (screen: Screen) => string[];
const cells = cellsOf as (line: string) => string[];
const readFrame = readInspectorFrame as (lines: readonly string[], size: { cols: number; rows: number }) => FrameReading;
const assess = assessInspectorJourney as (input: { journey?: unknown; unavailability?: string }) => Assessment;
const build = buildInspectorReceipt as (input: BuildInput, options?: { sanitize?: Sanitize }) => Receipt;
const exitOf = exitCodeFor as (receipt: { realised: boolean; findings: readonly string[] }) => number;
const sameRef = sameNativeRef as (a: unknown, b: unknown) => boolean;
const windowOf = windowCount as (total: number, position: number, page: number) => number;
const boundsOf = overlayBounds as (cols: number, rows: number) => { width: number; maxHeight: number };
const classesOf = stateClassesObserved as (rows: readonly StatusRow[]) => Record<string, number | string>;
const RULES = INSPECTOR_FINDING_RULES as readonly string[];
const REASONS = INSPECTOR_UNREALISED_REASONS as readonly string[];
const VIEWS = INSPECTOR_VIEWS as readonly string[];
const sanitize: Sanitize = (text, max, layout) => sanitizeWorkbenchText(text, max, layout as Parameters<typeof sanitizeWorkbenchText>[2]);

const ESC = String.fromCodePoint(0x1b);
const DOT = String.fromCodePoint(0x00b7);
const ELLIPSIS = String.fromCodePoint(0x2026);
const ACTIVE = String.fromCodePoint(0x25cc);
const WAITING = String.fromCodePoint(0x25cb);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const WIDE = String.fromCodePoint(0x4e00);
const SYNC_ON = `${ESC}[?2026h`;
const SYNC_OFF = `${ESC}[?2026l`;
const cup = (row: number, col = 1): string => `${ESC}[${row};${col}H`;
const EL2 = `${ESC}[2K`;

/* ------------------------------------------------------------------------- *
 * Contract surface, pinned to the product source each literal restates.
 * ------------------------------------------------------------------------- */

const SRC = (path: string): string => readFileSync(new URL(`../src/${path}`, import.meta.url), "utf8");

describe("inspector receipt contract surface", () => {
  it("pins the v1 contract literal, the views, the four docs/10 state classes, the responsive size and the frame layout", () => {
    expect(INSPECTOR_RECEIPT_CONTRACT).toBe("workbench.inspector-journey/v1");
    expect([...VIEWS]).toEqual(["overview", "graph", "timeline", "details"]);
    expect([...(INSPECTOR_STATE_CLASSES as readonly string[])]).toEqual(["stalled", "waiting", "stale", "unknown"]);
    expect({ ...RESPONSIVE_SIZE }).toEqual({ cols: 80, rows: 24 });
    expect(FRAME_LAYOUT).toBe("label");
    expect(FRAME_TEXT_LIMIT).toBe(240);
  });

  it("declares every finding rule the judge can report, in order", () => {
    expect([...RULES]).toEqual([
      "view-not-rendered",
      "view-cycle-out-of-order",
      "view-not-live",
      "row-count-mismatch",
      "native-row-not-selected",
      "evidence-loaded-before-focus",
      "evidence-not-loaded",
      "resize-not-responsive",
      "selection-lost-on-resize",
      "status-glyph-confusion",
      "spinner-after-settle",
      "capture-order-violated",
    ]);
  });

  it("declares every unrealised reason, in order", () => {
    expect([...REASONS]).toEqual(["unavailable", "journey-unarmed", "run-never-live", "inspector-not-opened", "no-native-row", "no-evidence-ref"]);
  });

  it("names the views in the order the product's own reducer cycles them on Tab", () => {
    const model = { projection: new ObservationProjection(), scope: { workspace: "/w", principal: "p" }, invocationId: "wf_x", title: "t", status: "running" } satisfies InspectorModel;
    let state = initialInspectorState();
    const cycle: InspectorView[] = [state.view];
    for (let i = 0; i < 4; i++) {
      state = reduceInspectorKey("\t", state, model)?.state ?? state;
      cycle.push(state.view);
    }
    expect(cycle).toEqual([...VIEWS, VIEWS[0]]);
  });

  it("restates the dialog's overlay (src/ui/workflow-menu.ts) and pi-tui's flooring of its percentages", () => {
    expect(SRC("ui/workflow-menu.ts")).toMatch(/overlayOptions: \{ anchor: "center", width: "90%", maxHeight: `\$\{VIEWPORT_HEIGHT_PCT\}%` \}/u);
    expect(OVERLAY_GEOMETRY.widthPct).toBe(90);
    expect(OVERLAY_GEOMETRY.maxHeightPct).toBe(VIEWPORT_HEIGHT_PCT);
    expect(boundsOf(120, 40)).toEqual({ width: 108, maxHeight: 28 });
    expect(boundsOf(80, 24)).toEqual({ width: 72, maxHeight: 16 });
  });

  it("windows the graph and timeline views by the host's read cap and names the host's local-only provider", () => {
    expect(RELATION_PAGE).toBe(WORKBENCH_PROJECTION_MAX_QUERY);
    expect([...(LOCAL_PROVIDERS as readonly string[])]).toEqual(["pi-workflow"]);
    expect(SRC("index.ts")).toContain('provider: snapshot.sessionId ? "claude-agent-sdk" : "pi-workflow"');
    expect(windowOf(0, 1, 40)).toBe(0);
    expect(windowOf(7, 3, 40)).toBe(7);
    expect(windowOf(90, 85, 40)).toBe(10);
    expect(windowOf(90, 40, 40)).toBe(40);
  });

  it("names a layout the shared helper defines, and that layout collapses a frame line to one label", () => {
    expect(SRC("workbench/redaction.ts")).toMatch(/export type WorkbenchTextLayout = [^;]*"label"/u);
    expect(sanitize(`a${ZERO_WIDTH_SPACE}b   c`, FRAME_TEXT_LIMIT, FRAME_LAYOUT)).toBe("ab c");
  });
});

/* ------------------------------------------------------------------------- *
 * Screen model over hand-written escape streams.
 * ------------------------------------------------------------------------- */

describe("screen model: a pty capture replayed into the frames the terminal showed", () => {
  it("stores a frame only at the end of synchronized output, at the rows the stream addressed", () => {
    const screen = create(20, 4);
    expect(feed(screen, `${SYNC_ON}${cup(2)}${EL2}hello${cup(4, 3)}${EL2}world`)).toBe(0);
    expect(screen.frame).toBeUndefined();
    expect(screen.syncing).toBe(true);
    expect(feed(screen, SYNC_OFF)).toBe(1);
    expect(screen.frame).toEqual(["", "hello", "", "  world"]);
    feed(screen, `${SYNC_ON}${cup(2)}${EL2}bye`);
    expect(screen.frame).toEqual(["", "hello", "", "  world"]);
    expect(linesOf(screen)).toEqual(["", "bye", "", "  world"]);
  });

  it("counts a character written past the right margin, overwriting with autowrap off and wrapping with it on", () => {
    const off = create(5, 2);
    feed(off, `${ESC}[?7l${cup(1)}abcdef${SYNC_OFF}`);
    expect(off.frame).toEqual(["abcdf", ""]);
    expect(off.overflow).toBe(1);
    const on = create(5, 2);
    feed(on, `${cup(1)}abcdef${SYNC_OFF}`);
    expect(on.frame).toEqual(["abcde", "f"]);
    expect(on.overflow).toBe(1);
    const fits = create(5, 2);
    feed(fits, `${ESC}[?7l${cup(1)}abcde${cup(2)}x${SYNC_OFF}`);
    expect(fits.overflow).toBe(0);
  });

  it("draws a wide character in two cells and keeps a zero-width unit inside the cell before it", () => {
    const screen = create(6, 1);
    feed(screen, `${cup(1)}${WIDE}a${ZERO_WIDTH_SPACE}b${SYNC_OFF}`);
    expect(screen.frame).toEqual([`${WIDE}a${ZERO_WIDTH_SPACE}b`]);
    expect(cells(`${WIDE}a${ZERO_WIDTH_SPACE}b`)).toEqual([WIDE, "", `a${ZERO_WIDTH_SPACE}`, "b"]);
  });

  it("completes a sequence cut across chunks and draws nothing for SGR, OSC (BEL or ST) and queries", () => {
    const screen = create(10, 3);
    feed(screen, `${ESC}`);
    feed(screen, "[");
    feed(screen, `3;2H${ESC}[1;31mred${ESC}[0m${ESC}]8;;https://example.invalid/x`);
    feed(screen, `\u0007${ESC}]0;title${ESC}\\${ESC}[16t${ESC}[c!${SYNC_OFF}`);
    expect(screen.frame).toEqual(["", "", " red!"]);
  });

  it("resizes as a terminal does: the top-left content kept, clipped to the new size", () => {
    const screen = create(8, 3);
    feed(screen, `${cup(1)}abcdefgh${cup(3)}tail${SYNC_OFF}`);
    resizeTo(screen, 4, 2);
    expect(linesOf(screen)).toEqual(["abcd", ""]);
    expect([screen.cols, screen.rows]).toEqual([4, 2]);
  });
});

/* ------------------------------------------------------------------------- *
 * The frame reader over frames the product draws through pi-tui.
 * ------------------------------------------------------------------------- */

const scope: ObservationScope = { workspace: "/workspace/inspector-receipt", principal: "local-operator:1000:session-receipt" };
const RUN = "wf_6ze15receipt";
const TITLE = "inspjourney";
const SESSIONS = ["11111111-aaaa-4bbb-8ccc-000000000001", "11111111-aaaa-4bbb-8ccc-000000000002", "11111111-aaaa-4bbb-8ccc-000000000003"] as const;
const MESSAGES = ["22222222-aaaa-4bbb-8ccc-000000000001", "22222222-aaaa-4bbb-8ccc-000000000002", "22222222-aaaa-4bbb-8ccc-000000000003"] as const;
const at = (seconds: number): string => new Date(Date.UTC(2026, 10, 11, 5, 0, seconds)).toISOString();
let sequence = 0;

/** One stream event as the live host ingests it (src/index.ts emitObservation): freshness stays unknown, no snapshot confirms it. */
function ingest(projection: ObservationProjection, source: NativeRef, title: string, statusText: string, tone: Presentation["statusTone"], evidenceRefs?: readonly string[]): void {
  sequence += 1;
  projection.ingest({
    projectionEventId: `${RUN}:claude.stream:${sequence}`, source, scope, sourceSequence: sequence, observedAt: at(sequence % 50), kind: "claude.stream",
    node: { presentation: { title, type: "agent", statusText, statusTone: tone } }, trace: { invocationId: RUN },
    ...(evidenceRefs ? { evidenceRefs } : {}),
  });
}
const session = (id: string): NativeRef => ({ provider: "claude-agent-sdk", type: "session", id });
const local = (index: number): NativeRef => ({ provider: "pi-workflow", type: "agent-call", id: `${RUN}:${index}` });

/** The run as the live host observes it mid-execution: two local-only rows before init, three SDK sessions (one later marked
 * stale by a failed read), and one operation a read-current snapshot confirmed waiting. */
function liveRun(extra = 0): ObservationProjection {
  const projection = new ObservationProjection({ maxQuery: WORKBENCH_PROJECTION_MAX_QUERY });
  ingest(projection, local(2), "insp-charlie", "observed-running", "active");
  ingest(projection, local(3), "insp-delta", "observed-running", "active");
  ingest(projection, session(SESSIONS[0]), "insp-alpha", "observed-running", "active", [`claude-message:${MESSAGES[0]}`]);
  ingest(projection, session(SESSIONS[1]), "insp-bravo", "succeeded", "success", [`claude-message:${MESSAGES[1]}`]);
  ingest(projection, session(SESSIONS[2]), "insp-echo", "observed-running", "active", [`claude-message:${MESSAGES[2]}`]);
  projection.markStale({ scope, ref: session(SESSIONS[2]) });
  projection.refresh({
    source: { provider: "furnace", type: "operation", id: "verify" }, scope, capturedAt: at(1), observedAt: at(1),
    node: { title: "verify", type: "sdk-operation", statusText: "waiting", statusTone: "waiting" }, trace: { invocationId: RUN },
  });
  for (let i = 0; i < extra; i++) ingest(projection, local(10 + i), `insp-extra-${String(i).padStart(2, "0")}`, "observed-running", "active");
  return projection;
}

/** A claude-agent-sdk evidence loader that answers every message reference with one bounded preview (no transcript is read). */
const stubLoader: EvidenceLoader = {
  provider: "claude-agent-sdk",
  requiredGrant: "claude:transcript",
  canLoad: ref => ref.startsWith("claude-message:"),
  load: async () => ({ kind: "claude-message", provider: "claude-agent-sdk", capturedAt: at(5), bytes: 42, truncated: false, preview: ["assistant: fixture message"], freshness: "current" }),
};

function runTask(): WorkflowTask {
  const task = createWorkflowTask({ id: RUN, script: "return 1;", meta: { name: TITLE, description: "receipt fixture run" } });
  task.observationScope = { ...scope, sessionId: "session-receipt" };
  return task;
}

/** What src/index.ts hands the menu: the host's read cap, bar viewport, attention inputs and an evidence store. */
function depsOf(projection: ObservationProjection): WorkflowMenuDeps {
  return {
    tasks: new Map<string, WorkflowTask>(),
    observation: {
      projection,
      scope: task => (task.observationScope ? { workspace: task.observationScope.workspace, principal: task.observationScope.principal } : undefined),
      relationPage: WORKBENCH_PROJECTION_MAX_QUERY,
      timelineColumns: WORKBENCH_TIMELINE_COLUMNS,
      attention: { bottlenecks: WORKBENCH_ATTENTION_BOTTLENECKS, now: () => at(30) },
      evidence: new EvidenceStore({ loaders: [stubLoader], maxEntries: 16, maxBytes: 4_096, timeoutMs: 2_000 }),
    },
    getRecord: () => undefined,
    viewAgentConversation: async () => {},
    viewClaudeTranscript: async () => {},
    getCtx: () => undefined,
  };
}

/** The pty side as pi-tui sees it: a terminal of a given size that records every byte written to it. */
class FakeTerminal implements Terminal {
  output = "";
  onInput: ((data: string) => void) | undefined;
  onResize: (() => void) | undefined;
  readonly kittyProtocolActive = false;
  constructor(
    public columns: number,
    public rows: number,
  ) {}
  start(onInput: (data: string) => void, onResize: () => void): void {
    this.onInput = onInput;
    this.onResize = onResize;
  }
  stop(): void {}
  async drainInput(): Promise<void> {}
  write(data: string): void {
    this.output += data;
  }
  moveBy(): void {}
  hideCursor(): void {}
  showCursor(): void {}
  clearLine(): void {}
  clearFromCursor(): void {}
  clearScreen(): void {}
  setTitle(): void {}
  setProgress(): void {}
  setProgramStatus(): void {}
}

type Factory = (tui: unknown, theme: unknown, keybindings: unknown, done: (result: undefined) => void) => WorkflowDialog;
interface CustomOptions {
  overlayOptions?: OverlayOptions;
  onHandle?: (handle: OverlayHandle) => void;
}
const theme = { fg: (_color: string, text: string) => `${ESC}[2m${text}${ESC}[22m`, bold: (text: string) => `${ESC}[1m${text}${ESC}[22m` };

interface Driven {
  terminal: FakeTerminal;
  tui: TuiAltScreen;
  dialog: WorkflowDialog;
  screen: Screen;
  fed: number;
}
const opened: Driven[] = [];

/** Open the run through the host seam on a real pi-tui renderer, exactly as ctx.ui.custom({ overlay: true }) shows it. */
async function openOnTui(task: WorkflowTask, deps: WorkflowMenuDeps, cols: number, rows: number): Promise<Driven> {
  const terminal = new FakeTerminal(cols, rows);
  const tui = new TuiAltScreen(terminal, false, undefined, { mouse: false });
  let shown: (dialog: WorkflowDialog) => void = () => {};
  const ready = new Promise<WorkflowDialog>(resolve => {
    shown = resolve;
  });
  const custom = (factory: Factory, options?: CustomOptions): Promise<undefined> =>
    new Promise<undefined>(done => {
      const dialog = factory(tui, theme, undefined, done);
      const handle = tui.showOverlay(dialog, options?.overlayOptions);
      options?.onHandle?.(handle);
      shown(dialog);
    });
  tui.start();
  void showWorkflowDialog(ctx({ ui: { notify: vi.fn(), custom } }), task, deps);
  const dialog = await ready;
  const driven = { terminal, tui, dialog, screen: create(cols, rows), fed: 0 };
  opened.push(driven);
  return driven;
}

/** Render one frame through pi-tui, replay its bytes and read the inspector back. */
function frameOf(driven: Driven): FrameReading {
  driven.tui.renderNow();
  feed(driven.screen, driven.terminal.output.slice(driven.fed));
  driven.fed = driven.terminal.output.length;
  return readFrame(driven.screen.frame ?? [], { cols: driven.terminal.columns, rows: driven.terminal.rows });
}
function press(driven: Driven, key: string): FrameReading {
  driven.terminal.onInput?.(key);
  return frameOf(driven);
}
function resizeDriven(driven: Driven, cols: number, rows: number): FrameReading {
  feed(driven.screen, driven.terminal.output.slice(driven.fed));
  driven.fed = driven.terminal.output.length;
  const before = driven.screen.overflow;
  driven.terminal.columns = cols;
  driven.terminal.rows = rows;
  resizeTo(driven.screen, cols, rows);
  driven.terminal.onResize?.();
  const reading = frameOf(driven);
  expect(driven.screen.overflow - before).toBe(0);
  return reading;
}

afterAll(() => {
  for (const driven of opened.splice(0)) {
    driven.dialog.dispose();
    driven.tui.stop();
  }
});

describe("readInspectorFrame over the product's dialog drawn by pi-tui (120x40, then 80x24)", () => {
  const projection = liveRun();
  const window = (offset: number) => projection.window({ scope, invocationId: RUN, offset, limit: 1 });
  const total = window(0).total;
  const readings: Record<string, FrameReading> = {};
  /** How many lines the product's dialog laid out for each 80x24 frame: the overlay shows at most boundsOf(80, 24).maxHeight. */
  const laidOut: Record<string, number> = {};
  const small = boundsOf(80, 24);
  let driven: Driven;

  beforeAll(async () => {
    driven = await openOnTui(runTask(), depsOf(projection), 120, 40);
    readings.opened = frameOf(driven);
    readings.graph = press(driven, "\t");
    readings.timeline = press(driven, "\t");
    readings.details = press(driven, "\t");
    let details = readings.details;
    for (let i = 0; i < total && details.provider !== "claude-agent-sdk"; i++) details = press(driven, "j");
    readings.selected = details;
    readings.requested = press(driven, "\r");
    await vi.waitFor(() => {
      readings.loaded = frameOf(driven);
      expect(readings.loaded.evidence?.state).toBe("loaded");
    });
    readings.resized = resizeDriven(driven, 80, 24);
    laidOut.resized = driven.dialog.render(small.width).length;
    for (const view of ["overview", "graph", "timeline", "details"]) {
      readings[`small-${view}`] = press(driven, "\t");
      laidOut[`small-${view}`] = driven.dialog.render(small.width).length;
    }
  });

  it("finds the overlay by its own header and reads the overview the projection holds, row for row", () => {
    const overview = readings.opened;
    expect(overview.view).toBe("overview");
    expect(overview.title).toBe(TITLE);
    expect(overview.status).toBe("running");
    expect(overview.total).toBe(total);
    expect(overview.hint).toBe(true);
    expect(overview.clipped).toBe(false);
    expect(overview.drawn).toBe(total);
    expect(overview.expected).toBe(total);
    expect(overview.statusRows?.map(row => row.provider)).toEqual(["pi-workflow", "pi-workflow", "claude-agent-sdk", "claude-agent-sdk", "claude-agent-sdk", "furnace"]);
    // The panel's counts, read off the screen, are the product's own attention report for this projection.
    const { counts } = selectAttention(projection, { scope, invocationId: RUN, now: at(30), limit: WORKBENCH_PROJECTION_MAX_QUERY, bottlenecks: WORKBENCH_ATTENTION_BOTTLENECKS });
    expect(overview.attention).toEqual({ active: counts.active, waiting: counts.waiting, stale: counts.stale, unknown: counts.unknown, disconnected: counts.disconnected });
  });

  it("reads the product's honest status axes: ingested rows UNKNOWN '?', the failed read STALE '?', the confirmed snapshot CURRENT", () => {
    const rows = readings.opened.statusRows ?? [];
    expect(rows.map(row => `${row.glyph}:${row.freshness}`)).toEqual(["?:UNKNOWN", "?:UNKNOWN", "?:UNKNOWN", "?:UNKNOWN", "?:STALE", `${WAITING}:CURRENT`]);
    expect(classesOf(rows)).toEqual({ stalled: "not-rendered-by-product", waiting: 1, stale: 1, unknown: 4, active: 0, success: 0, failure: 0 });
  });

  it("reads the graph and timeline views against the same window of the projection", () => {
    expect(readings.graph.view).toBe("graph");
    expect(readings.graph.drawn).toBe(total);
    expect(readings.graph.expected).toBe(total);
    expect(readings.timeline.view).toBe("timeline");
    expect(readings.timeline.drawn).toBe(total);
    expect(readings.timeline.expected).toBe(total);
    expect(readings.timeline.laneRows).toBe(total);
  });

  it("reads the details view's native reference, and the selection walks to a native row", () => {
    expect(readings.details.view).toBe("details");
    expect(readings.details.nativeRef).toBe(`pi-workflow/agent-call/${RUN}:2`);
    expect(readings.details.drawn).toBe(1);
    expect(readings.details.expected).toBe(1);
    expect(readings.selected.provider).toBe("claude-agent-sdk");
    expect(readings.selected.nativeRef).toBe(`claude-agent-sdk/session/${SESSIONS[0]}`);
    expect(readings.selected.evidenceRefs).toBe(1);
    expect(readings.selected.evidence).toEqual({ ref: `claude-message:${MESSAGES[0]}`, state: "not-requested", label: "not loaded (Enter)" });
  });

  it("reads the evidence the product loads on focus (Enter): loading, then loaded with its byte count", () => {
    expect(readings.requested.evidence?.state).toMatch(/^(?:loading|loaded)$/u);
    expect(readings.loaded.evidence).toMatchObject({ ref: `claude-message:${MESSAGES[0]}`, state: "loaded", bytes: 42 });
  });

  it("reads the 80x24 frame: same view and native reference, nothing past the margin, the key hint shown exactly when the layout fits the overlay", () => {
    expect(readings.resized).toMatchObject({ view: "details", cols: 80, rows: 24 });
    expect(sameRef(readings.resized.nativeRef, readings.selected.nativeRef)).toBe(true);
    expect(readings.resized.hint).toBe(laidOut.resized <= small.maxHeight);
    for (const view of ["overview", "graph", "timeline", "details"]) {
      const reading = readings[`small-${view}`];
      expect(reading).toMatchObject({ view, cols: 80, rows: 24 });
      // The dialog lays out for the terminal's rows while the overlay shows 70% of them: a taller layout loses its last rows.
      expect(reading.clipped).toBe(laidOut[`small-${view}`] > small.maxHeight);
      expect(reading.hint).toBe(!reading.clipped);
      expect(reading.drawn).toBe(reading.expected);
    }
  });

  it("assembles a journey from these product frames: every 120x40 fact passes and the judge reports exactly the 80x24 overlay cut", () => {
    const journey: Journey = {
      captureRef: "fixture.capture.txt", launchAt: at(0), liveAt: at(1), inspectorOpenedAt: at(2),
      views: VIEWS.map((view, i) => ({ view, keySentAt: at(3 + i), seenAt: at(3 + i), frame: [readings.opened, readings.graph, readings.timeline, readings.details][i] })),
      selection: { keys: 2, sentAt: at(8), seenAt: at(9), nativeRef: readings.selected.nativeRef, provider: readings.selected.provider },
      evidence: { refs: readings.selected.evidenceRefs, before: readings.selected.evidence, attempts: [{ sentAt: at(10), seenAt: at(11), outcome: readings.loaded.evidence?.state, bytes: readings.loaded.evidence?.bytes }] },
      resize: {
        from: { cols: 120, rows: 40 }, to: { cols: 80, rows: 24 }, sentAt: at(12), seenAt: at(13), overflowAfter: 0, frame: readings.resized,
        cycle: ["overview", "graph", "timeline", "details"].map(view => readings[`small-${view}`]),
      },
      rows: [...(readings.opened.statusRows ?? []), ...(readings.graph.statusRows ?? [])].map(row => ({ ...row, runStatus: "running" })),
    };
    // Every 120x40 fact passes; at 80x24 the judge reports exactly the views whose layout the overlay cut, and nothing else.
    const cut = Object.values(laidOut).some(lines => lines > small.maxHeight);
    expect(assess({ journey })).toEqual({ findings: cut ? ["resize-not-responsive"] : [], realised: true, reasons: [] });
    expect(assess({ journey: { ...journey, resize: { ...journey.resize, frame: { ...readings.resized, hint: true }, cycle: journey.resize.cycle.map(frame => ({ ...frame, hint: true })) } } }))
      .toEqual({ findings: [], realised: true, reasons: [] });
  });
});

describe("readInspectorFrame catches the overlay clipping a page the layout drew (80x24, more rows than the overlay holds)", () => {
  it("reads a clipped overview: the key hint gone and fewer rows drawn than the projection's page holds", async () => {
    const projection = liveRun(12);
    const total = projection.window({ scope, invocationId: RUN, offset: 0, limit: 1 }).total;
    const driven = await openOnTui(runTask(), depsOf(projection), 80, 24);
    const overview = frameOf(driven);
    expect(overview.view).toBe("overview");
    expect(overview.total).toBe(total);
    expect(overview.hint).toBe(false);
    expect(overview.clipped).toBe(true);
    expect(overview.drawn ?? 0).toBeLessThan(overview.expected ?? 0);
    // The rows the overlay hid are rows the operator cannot see and no notice counts: the judge reads it as a finding.
    const journey = goodJourney();
    journey.resize.cycle[0] = overview;
    expect(assess({ journey }).findings).toEqual(["row-count-mismatch", "resize-not-responsive"]);
  });

  it("reads the legacy dialog's Tab-inspector line as an open dialog with no inspector view yet, and Tab opens the overview", async () => {
    const task = runTask();
    task.workflowProgress.push({ type: "workflow_agent", index: 0, label: "insp-alpha", state: "start" });
    const driven = await openOnTui(task, depsOf(liveRun()), 120, 40);
    const legacy = frameOf(driven);
    expect(legacy).toEqual({ view: undefined, legacyDialog: true });
    expect(press(driven, "\t").view).toBe("overview");
  });
});

/* ------------------------------------------------------------------------- *
 * The judge over fabricated journeys: one good journey, one mutant per rule.
 * ------------------------------------------------------------------------- */

const NATIVE = `claude-agent-sdk/session/${SESSIONS[0]}`;
const t = (seconds: number): string => new Date(Date.UTC(2026, 10, 11, 6, 0, seconds)).toISOString();

function frame(view: string, patch: Partial<FrameReading> = {}): FrameReading {
  const one = view === "details";
  return {
    view, title: TITLE, status: "running", capped: false, total: 4, position: 1, following: false, paged: null, hint: true, clipped: false,
    cols: 120, rows: 40, drawn: one ? 1 : 4, remainder: 0, expected: one ? 1 : 4, statusRows: [], lines: [],
    ...(one ? { nativeRef: NATIVE, provider: "claude-agent-sdk", evidenceRefs: 1 } : {}),
    ...patch,
  };
}
function goodJourney(): Journey {
  return {
    captureRef: "inspector.capture.txt",
    launchAt: t(0),
    liveAt: t(10),
    inspectorOpenedAt: t(15),
    views: VIEWS.map((view, i) => ({ view, keySentAt: t(20 + 2 * i), seenAt: t(21 + 2 * i), frame: frame(view) })),
    selection: { keys: 2, sentAt: t(30), seenAt: t(31), nativeRef: NATIVE, provider: "claude-agent-sdk" },
    evidence: {
      refs: 1,
      before: { ref: `claude-message:${MESSAGES[0]}`, state: "not-requested", label: "not loaded (Enter)" },
      attempts: [{ sentAt: t(32), seenAt: t(33), outcome: "loaded", bytes: 512 }],
    },
    resize: {
      from: { cols: 120, rows: 40 }, to: { cols: 80, rows: 24 }, sentAt: t(40), seenAt: t(41), overflowAfter: 0,
      frame: frame("details", { cols: 80, rows: 24 }),
      cycle: VIEWS.map(view => frame(view, { cols: 80, rows: 24 })),
    },
    rows: [
      { view: "overview", glyph: "?", pointed: false, freshness: "UNKNOWN", provider: "claude-agent-sdk", text: `insp-alpha ${DOT} claude-agent-sdk`, runStatus: "running" },
      { view: "overview", glyph: WAITING, pointed: false, freshness: "CURRENT", provider: "furnace", text: `verify ${DOT} furnace`, runStatus: "running" },
    ],
  };
}
const mutate = (change: (journey: Journey) => void): Journey => {
  const journey = goodJourney();
  change(journey);
  return journey;
};
const findingsOf = (change: (journey: Journey) => void): readonly string[] => assess({ journey: mutate(change) }).findings;
const reasonsOf = (change: (journey: Journey) => void): readonly string[] => assess({ journey: mutate(change) }).reasons;

describe("assessInspectorJourney - realisation", () => {
  it("passes a fully realised clean journey with no findings and no reasons", () => {
    expect(assess({ journey: goodJourney() })).toEqual({ findings: [], realised: true, reasons: [] });
  });

  it("treats a typed unavailability as unrealised before the journey is judged", () => {
    expect(assess({ journey: goodJourney(), unavailability: "pi binary unavailable on PATH" })).toEqual({ findings: [], realised: false, reasons: ["unavailable"] });
  });

  it("refuses to arm a journey missing a view step, a capture, or resized to another size than 80x24", () => {
    expect(reasonsOf(journey => journey.views.pop())).toEqual(["journey-unarmed"]);
    expect(reasonsOf(journey => Object.assign(journey, { captureRef: "" }))).toEqual(["journey-unarmed"]);
    expect(reasonsOf(journey => Object.assign(journey.resize, { to: { cols: 100, rows: 30 } }))).toEqual(["journey-unarmed"]);
    expect(reasonsOf(journey => Object.assign(journey.views[1], { view: "timeline" }))).toEqual(["journey-unarmed"]);
    expect(assess({ journey: undefined }).reasons).toEqual(["journey-unarmed"]);
  });

  it("is unrealised when the run was never seen live, or the inspector never rendered a view", () => {
    expect(reasonsOf(journey => delete journey.liveAt)).toEqual(["run-never-live"]);
    expect(
      reasonsOf(journey => {
        for (const step of journey.views) Object.assign(step, { frame: { view: undefined } });
      }),
    ).toContain("inspector-not-opened");
  });

  it("is unrealised when no native row ever appeared, or the selected native row lists no evidence reference", () => {
    const localOnly = mutate(journey => {
      Object.assign(journey.selection, { provider: "pi-workflow", nativeRef: `pi-workflow/agent-call/${RUN}:0` });
      for (const step of journey.views) if (step.frame) Object.assign(step.frame, { provider: "pi-workflow", nativeRef: `pi-workflow/agent-call/${RUN}:0` });
      journey.rows = journey.rows.map(row => ({ ...row, provider: "pi-workflow" }));
    });
    expect(assess({ journey: localOnly }).reasons).toEqual(["no-native-row"]);
    expect(reasonsOf(journey => Object.assign(journey.evidence, { refs: 0, attempts: [] }))).toEqual(["no-evidence-ref"]);
  });
});

describe("assessInspectorJourney - finding rules", () => {
  it("flags a view whose header never rendered after its Tab", () => {
    expect(findingsOf(journey => Object.assign(journey.views[1], { seenAt: undefined, frame: frame("overview") }))).toContain("view-not-rendered");
  });

  it("flags a Tab cycle that did not advance one view at a time, in the product's order", () => {
    expect(findingsOf(journey => Object.assign(journey.views[1], { frame: frame("timeline") }))).toContain("view-cycle-out-of-order");
  });

  it("flags a view visited only after the run settled (not during observed execution)", () => {
    expect(findingsOf(journey => Object.assign(journey.views[2].frame ?? {}, { status: "completed" }))).toEqual(["view-not-live"]);
  });

  it("flags drawn rows that disagree with the projection's own count, before or after the resize", () => {
    expect(findingsOf(journey => Object.assign(journey.views[0].frame ?? {}, { drawn: 3 }))).toEqual(["row-count-mismatch"]);
    expect(findingsOf(journey => Object.assign(journey.resize.cycle[2], { drawn: 2 }))).toEqual(["row-count-mismatch"]);
  });

  it("flags a details selection that is not a native-provider row", () => {
    expect(findingsOf(journey => Object.assign(journey.selection, { provider: "pi-workflow" }))).toContain("native-row-not-selected");
  });

  it("flags evidence that showed a loaded payload before its Enter request, and evidence never loaded", () => {
    expect(findingsOf(journey => Object.assign(journey.evidence.before ?? {}, { state: "loaded" }))).toEqual(["evidence-loaded-before-focus"]);
    const loadedFirst = { ref: `claude-message:${MESSAGES[1]}`, state: "loaded", label: `loaded ${DOT} 9 bytes` };
    expect(findingsOf(journey => journey.evidence.attempts.push({ sentAt: t(34), seenAt: t(35), before: loadedFirst, outcome: "loaded", bytes: 9 }))).toEqual(["evidence-loaded-before-focus"]);
    expect(findingsOf(journey => Object.assign(journey.evidence.attempts[0], { outcome: "unavailable", reason: "not-found" }))).toEqual(["evidence-not-loaded"]);
  });

  it("flags an 80x24 view without its key hint, a view missing from the 80x24 cycle, or a write past the margin", () => {
    expect(findingsOf(journey => Object.assign(journey.resize.frame ?? {}, { hint: false }))).toEqual(["resize-not-responsive"]);
    expect(findingsOf(journey => journey.resize.cycle.pop())).toEqual(["resize-not-responsive"]);
    expect(findingsOf(journey => Object.assign(journey.resize, { overflowAfter: 1 }))).toEqual(["resize-not-responsive"]);
    expect(findingsOf(journey => Object.assign(journey.resize.cycle[0], { rows: 40 }))).toEqual(["resize-not-responsive"]);
  });

  it("flags a resize that changed the view or the selected native reference, but not a width-truncated one", () => {
    expect(findingsOf(journey => Object.assign(journey.resize.frame ?? {}, { nativeRef: `claude-agent-sdk/session/${SESSIONS[1]}` }))).toEqual(["selection-lost-on-resize"]);
    expect(findingsOf(journey => Object.assign(journey.resize.frame ?? {}, { view: "overview" }))).toEqual(["selection-lost-on-resize"]);
    expect(findingsOf(journey => Object.assign(journey.resize.frame ?? {}, { nativeRef: `${NATIVE.slice(0, 40)}${ELLIPSIS}` }))).toEqual([]);
    expect(sameRef(`${NATIVE.slice(0, 40)}${ELLIPSIS}`, "claude-agent-sdk/session/33333333-aaaa-4bbb-8ccc-000000000009")).toBe(false);
    expect(sameRef(`${NATIVE.slice(0, 40)}${ELLIPSIS}`, `furnace/operation/${SESSIONS[0]}`)).toBe(false);
  });

  it("flags a STALE or UNKNOWN row drawn with a live or settled glyph", () => {
    expect(findingsOf(journey => Object.assign(journey.rows[0], { glyph: ACTIVE }))).toEqual(["status-glyph-confusion"]);
    expect(findingsOf(journey => journey.rows.push({ ...journey.rows[0], freshness: "STALE", glyph: WAITING }))).toEqual(["status-glyph-confusion"]);
  });

  it("flags a spinner drawn once the run settled, and only then", () => {
    expect(findingsOf(journey => journey.rows.push({ ...journey.rows[1], glyph: ACTIVE, freshness: "CURRENT", runStatus: "completed" }))).toEqual(["spinner-after-settle"]);
    expect(findingsOf(journey => journey.rows.push({ ...journey.rows[1], glyph: ACTIVE, freshness: "CURRENT", runStatus: "running" }))).toEqual([]);
  });

  it("flags decreasing reader stamps across the journey and accepts equal ones", () => {
    expect(findingsOf(journey => Object.assign(journey.views[2], { seenAt: t(19) }))).toEqual(["capture-order-violated"]);
    expect(findingsOf(journey => Object.assign(journey.views[1], { keySentAt: t(21) }))).toEqual([]);
  });

  it("reports every finding it can see at once, in rule order", () => {
    const wrecked = mutate(journey => {
      Object.assign(journey.views[0].frame ?? {}, { drawn: 1 });
      Object.assign(journey.evidence.attempts[0], { outcome: "unavailable" });
      Object.assign(journey.rows[0], { glyph: ACTIVE });
    });
    expect(assess({ journey: wrecked }).findings).toEqual(RULES.filter(rule => ["row-count-mismatch", "evidence-not-loaded", "status-glyph-confusion"].includes(rule)));
  });
});

/* ------------------------------------------------------------------------- *
 * The receipt: sanitized through the shared helper, or keeping no screen text.
 * ------------------------------------------------------------------------- */

describe("buildInspectorReceipt and exitCodeFor", () => {
  const base = { utc: t(50), revision: "ce180d8", node: "v24.20.0", platform: "linux", arch: "x64" };

  it("shapes a frozen passing receipt from a clean journey, and re-judging it reproduces its verdict", () => {
    const receipt = build({ ...base, journey: goodJourney() }, { sanitize });
    expect(receipt.contract).toBe(INSPECTOR_RECEIPT_CONTRACT);
    expect(receipt).toMatchObject({ realised: true, findings: [], reasons: [], pass: true });
    expect(receipt.unavailability).toBeUndefined();
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.journey.views[0])).toBe(true);
    expect(exitOf(receipt)).toBe(0);
    expect(assess({ journey: receipt.journey })).toEqual({ findings: [], realised: true, reasons: [] });
    expect(receipt.stateClasses).toMatchObject({ stalled: "not-rendered-by-product", waiting: 1, unknown: 1 });
  });

  it("passes every screen string through the shared helper: a credential-shaped fake is redacted, an invisible goes, paths reduce", () => {
    const journey = mutate(next => {
      Object.assign(next, { captureRef: "/tmp/6ze15-pty-abc/inspector.capture.txt" });
      Object.assign(next.views[0].frame ?? {}, { lines: [` ${String.fromCodePoint(0x256d)} ${TITLE}  running ${String.fromCodePoint(0x256e)}`, " api_key=FAKE-NOT-A-REAL-KEY-0000 in a row", ` a${ZERO_WIDTH_SPACE}b`] });
    });
    const receipt = build({ ...base, journey, diagnostics: ["read /home/someone/area/run.log tail"] }, { sanitize });
    const text = JSON.stringify(receipt);
    expect(text).not.toContain("FAKE-NOT-A-REAL-KEY-0000");
    expect(text).not.toContain(ZERO_WIDTH_SPACE);
    expect(text).not.toMatch(/\/(?:tmp|home)\//u);
    expect(receipt.journey.views[0].frame?.lines).toEqual([`${String.fromCodePoint(0x256d)} ${TITLE} running ${String.fromCodePoint(0x256e)}`, "api_key=[REDACTED] in a row", "ab"]);
    expect(receipt.journey.captureRef).toBe("inspector.capture.txt");
    expect(receipt.diagnostics).toEqual(["read run.log tail"]);
  });

  it("carries the docs/14 evidence fields: revision, tool versions, commands, timestamp, host, native references and actual output", () => {
    const commands = { pty: "script -qefc \"exec pi -e /work/repo/dist/index.js\" /tmp/6ze15-pty-abc/inspector.capture.txt", prompt: "Use the SubagentWorkflow tool", keys: ["prompt+Enter", "Down", "Enter", "Tab", "Tab", "Tab", "Tab", "j", "Enter"] };
    const journey = mutate(next => Object.assign(next.views[3].frame ?? {}, { lines: [`Native ref: ${NATIVE}`] }));
    const receipt = build({ ...base, pi: "1.2.0", commands, journey }, { sanitize });
    expect(receipt).toMatchObject({ revision: "ce180d8", node: "v24.20.0", pi: "1.2.0", utc: t(50), platform: "linux", arch: "x64" });
    expect(receipt.commands).toEqual({ pty: 'script -qefc "exec pi -e index.js" inspector.capture.txt', prompt: "Use the SubagentWorkflow tool", keys: commands.keys });
    expect(receipt.journey.selection.nativeRef).toBe(NATIVE);
    expect(receipt.journey.views[3].frame?.lines).toEqual([`Native ref: ${NATIVE}`]);
  });

  it("keeps no screen text at all without an injected helper, and is unrealised (exit 2)", () => {
    const receipt = build({ ...base, journey: goodJourney(), diagnostics: ["frame text"] });
    expect(receipt.journey).toEqual({});
    expect(receipt.diagnostics).toEqual([]);
    expect(receipt.unavailability).toBe("frame sanitizer unavailable: no screen text is kept");
    expect(receipt).toMatchObject({ realised: false, reasons: ["unavailable", "journey-unarmed"], pass: false });
    expect(JSON.stringify(receipt)).not.toContain("insp-alpha");
    expect(exitOf(receipt)).toBe(2);
  });

  it("carries a typed unavailability as a first-class field that can never pass (exit 2)", () => {
    const receipt = build({ ...base, journey: {}, unavailability: "claude-live probe failed: /home/someone/.config missing" }, { sanitize });
    expect(receipt.unavailability).toBe("claude-live probe failed: .config missing");
    expect(receipt).toMatchObject({ realised: false, pass: false });
    expect(receipt.reasons[0]).toBe("unavailable");
    expect(exitOf(receipt)).toBe(2);
  });

  it("maps realised-with-findings to exit 1 and an unarmed journey to exit 2", () => {
    const findings = build({ ...base, journey: mutate(journey => Object.assign(journey.resize.frame ?? {}, { hint: false })) }, { sanitize });
    expect(findings).toMatchObject({ realised: true, findings: ["resize-not-responsive"], pass: false });
    expect(exitOf(findings)).toBe(1);
    const unarmed = build({ ...base, journey: mutate(journey => journey.views.pop()) }, { sanitize });
    expect(unarmed).toMatchObject({ realised: false, reasons: ["journey-unarmed"], pass: false });
    expect(exitOf(unarmed)).toBe(2);
  });
});

/* ------------------------------------------------------------------------- *
 * The CLI entry: two entry-point scenarios, three closed censuses of the
 * runner source, and one stand-in run whose capture holds a marker.
 * ------------------------------------------------------------------------- */

installScratchLeakGuard();

/** The runner and the two qa modules it imports, staged with no dist/ beside them, so a run stops at the honest preflight. */
const STAGED_RUNNER_FILES = ["live-inspector-receipt.mjs", "scratch.mjs", "git-stamp.mjs"];

/** The runner's source text, as the closed source censuses read it. */
const RUNNER_SOURCE_URL = new URL("../qa/workbench/live-inspector-receipt.mjs", import.meta.url);

/** The trimmed lines of `source` that match `pattern`, in file order. */
function linesMatching(source: string, pattern: RegExp): string[] {
  return source
    .split("\n")
    .filter(line => pattern.test(line))
    .map(line => line.trim());
}

/** Every regular file under `dir`, recursively. */
function filesUnder(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return filesUnder(path);
    return entry.isFile() ? [path] : [];
  });
}

/** The text the stand-in script writes into the capture path: raw pty bytes no file outside scratch may hold after the run. */
const CAPTURE_MARKER = "RAW-PTY-CAPTURE-MARKER-6ze15-cut3";

/** Stand-ins the stand-in run puts on PATH: pi and stty answer --version; script(1) writes the marker into its capture path. */
const STAND_IN_BIN: Readonly<Record<string, string>> = {
  pi: '#!/bin/sh\nif [ "$1" = "--version" ]; then echo "0.0.0-stand-in"; fi\nexit 0\n',
  stty: "#!/bin/sh\nexit 0\n",
  // Invoked as script -qefc <inner command> <capture path>: write the marker into the capture, log where and how much, end.
  script: [
    "#!/bin/sh",
    'if [ "$1" = "--version" ]; then echo "script from util-linux (stand-in)"; exit 0; fi',
    'printf \'%s line one\\n%s line two\\n\' "$WITNESS_MARKER" "$WITNESS_MARKER" > "$3"',
    'printf \'%s %s\\n\' "$3" "$(wc -c < "$3")" >> "$WITNESS_LOG"',
    "exit 0",
    "",
  ].join("\n"),
};

/** A stand-in dist/: the shared helper as the identity, and a one-turn credential probe that completes on a named model. */
const STAND_IN_DIST: Readonly<Record<string, string>> = {
  "index.js": "export const standIn = true;\n",
  "workbench/redaction.js": "export function sanitizeWorkbenchText(text) { return String(text); }\n",
  "workbench/claude-host.js": "export function createClaudeWorkflowHost(options) { return { options }; }\n",
  "workflow/runtime.js":
    'export async function runWorkflow({ host }) { host.options.onMessage({ message: { model: "stand-in-model" } }); return { status: "completed" }; }\n',
};

describe("the runner's CLI entry (gate refusals #1 F3/F4 and #2 U1): two entry-point scenarios, three closed censuses of the runner source and one stand-in run whose capture holds a marker", () => {
  let root = "";
  let entry = "";
  beforeAll(() => {
    root = makeScratch("6ze15-entry-");
    const qaDir = join(root, "qa", "workbench");
    mkdirSync(qaDir, { recursive: true });
    for (const file of STAGED_RUNNER_FILES) copyFileSync(fileURLToPath(new URL(`../qa/workbench/${file}`, import.meta.url)), join(qaDir, file));
    entry = join(qaDir, "live-inspector-receipt.mjs");
  });
  afterAll(() => removeScratch(root));

  it("run as the entry point with no dist/ beside it, prints its typed unavailability receipt and exits 2 (main() ran)", () => {
    const run = spawnSync(process.execPath, [entry], { encoding: "utf8" });
    expect(run.status).toBe(2);
    expect(JSON.parse(run.stdout.trim())).toMatchObject({ contract: INSPECTOR_RECEIPT_CONTRACT, journey: {}, realised: false, pass: false });
    expect(run.stderr).toContain("unavailable: dist/index.js missing");
  });

  it("imported by another entry point that passes the module's own path as argv[1] (node -e), runs nothing", () => {
    const script = `import(${JSON.stringify(pathToFileURL(entry).href)}).then(() => console.log("imported"))`;
    const run = spawnSync(process.execPath, ["-e", script, entry], { encoding: "utf8" });
    expect({ status: run.status, stdout: run.stdout }).toEqual({ status: 0, stdout: "imported\n" });
  });

  it("the runner source holds none of the tokens KEEP_CAPTURE, capture.raw, captureRetained or copyFileSync", () => {
    const source = readFileSync(RUNNER_SOURCE_URL, "utf8");
    expect(source).not.toMatch(/KEEP_CAPTURE|capture\.raw|captureRetained/u);
    expect(source).not.toMatch(/\bcopyFileSync\b/u);
  });

  it("the runner source names the capture file inspector.capture.txt once, and capturePath and work only at their listed lines", () => {
    const source = readFileSync(RUNNER_SOURCE_URL, "utf8");
    expect(source.match(/inspector\.capture\.txt/gu)).toEqual(["inspector.capture.txt"]);
    expect(linesMatching(source, /\bcapturePath\b/u)).toEqual([
      'const capturePath = join(work, "inspector.capture.txt");',
      'fd = openSync(capturePath, "r");',
      ["const commands = { pty: `script -qefc \"$", '{inner}" $', "{capturePath}`, piArgs: `-e $", "{distEntry}`, prompt, keys: keyLog };"].join(""),
      'const child = spawn("script", ["-qefc", inner, capturePath], {',
      "captureRef: capturePath,",
    ]);
    expect(linesMatching(source, /\bwork\b/u)).toEqual([
      'const work = makeScratch("6ze15-pty-");',
      "scratch.push(work);",
      'const capturePath = join(work, "inspector.capture.txt");',
      'const ttyFile = join(work, "pty.name");',
    ]);
  });

  it("the runner source names process.env and process.argv only at their listed lines", () => {
    const source = readFileSync(RUNNER_SOURCE_URL, "utf8");
    expect(linesMatching(source, /process\.env/u)).toEqual(['model: process.env.INSPECTOR_RECEIPT_MODEL || "claude-sonnet-4-5",', 'env: { ...process.env, TERM: "xterm-256color" },']);
    expect(linesMatching(source, /process\.argv/u)).toEqual([
      "const outDir = process.argv[2] ? resolve(process.argv[2]) : undefined;",
      'if (typeof process === "undefined" || !process.argv?.[1]) return false;',
      'return import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "\\u0000");',
    ]);
  });

  it("a stand-in run (stand-in dist/, pi, script(1) and stty; the stand-in script writes a marker into the capture path and ends before pi starts): exit 2 within 60 s, 'pi TUI did not start' with the ended pty session in its diagnostics, the capture removed, the out dir holding exactly inspector-receipt.json, the marker in no file under the run's witness root nor on stdout, and stderr empty", { timeout: 180_000 }, () => {
    const witness = makeScratch("6ze15-witness-");
    try {
      const qaDir = join(witness, "runner", "qa", "workbench");
      mkdirSync(qaDir, { recursive: true });
      for (const file of STAGED_RUNNER_FILES) copyFileSync(fileURLToPath(new URL(`../qa/workbench/${file}`, import.meta.url)), join(qaDir, file));
      for (const [file, text] of Object.entries(STAND_IN_DIST)) {
        mkdirSync(dirname(join(witness, "runner", "dist", file)), { recursive: true });
        writeFileSync(join(witness, "runner", "dist", file), text);
      }
      // The staged root marks its stand-in dist/*.js as ES modules, so no enclosing package.json makes node warn on stderr.
      writeFileSync(join(witness, "runner", "package.json"), '{ "type": "module" }\n');
      const bin = join(witness, "bin");
      mkdirSync(bin);
      for (const [name, text] of Object.entries(STAND_IN_BIN)) {
        writeFileSync(join(bin, name), text);
        chmodSync(join(bin, name), 0o755);
      }
      const [tmp, cwd, home] = ["tmp", "cwd", "home"].map(name => join(witness, name));
      for (const dir of [tmp, cwd, home]) mkdirSync(dir);
      const out = join(witness, "out");
      const log = join(witness, "stand-in-script.log");
      const run = spawnSync(process.execPath, [join(qaDir, "live-inspector-receipt.mjs"), out], {
        cwd,
        encoding: "utf8",
        // The boot wait ends with the pty session: a run that instead runs out the runner's 90 s boot bound is killed here.
        timeout: 60_000,
        env: { ...process.env, PATH: `${bin}${delimiter}${process.env.PATH ?? ""}`, TMPDIR: tmp, HOME: home, WITNESS_LOG: log, WITNESS_MARKER: CAPTURE_MARKER },
      });
      expect(run.status).toBe(2);
      const receipt = JSON.parse(run.stdout.trim());
      expect(receipt).toMatchObject({ contract: INSPECTOR_RECEIPT_CONTRACT, unavailability: "pi TUI did not start", journey: {}, realised: false, pass: false });
      expect(receipt.diagnostics[0]).toBe("the pty session ended (exit 0) before pi finished startup; stderr: ");
      // The stand-in wrote the capture inside the run's own pty scratch under its TMPDIR, and the run removed it.
      const written = readFileSync(log, "utf8").trim().split("\n");
      expect(written).toHaveLength(1);
      const [capture, size] = written[0].split(" ");
      expect(basename(capture)).toBe("inspector.capture.txt");
      expect(basename(dirname(capture)).startsWith("6ze15-pty-")).toBe(true);
      expect(dirname(dirname(capture))).toBe(tmp);
      expect(Number(size)).toBe(2 * CAPTURE_MARKER.length + " line one\n line two\n".length);
      expect(existsSync(capture)).toBe(false);
      expect(readdirSync(out)).toEqual(["inspector-receipt.json"]);
      expect(filesUnder(witness).filter(file => readFileSync(file, "utf8").includes(CAPTURE_MARKER))).toEqual([]);
      expect(run.stdout.includes(CAPTURE_MARKER)).toBe(false);
      // Nothing reached stderr: no scratch leak report (the runner's own removal ran before the exit audit) and no capture text.
      expect(run.stderr).toBe("");
    } finally {
      removeScratch(witness);
    }
  });
});
