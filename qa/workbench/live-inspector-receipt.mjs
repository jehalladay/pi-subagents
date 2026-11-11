// wb-6ze.15 (VC-5 residual): live four-view terminal inspector acceptance receipt, contract v1.
//
// Two halves, one file, the shape of live-operator-receipt.mjs (wb-a2g.3):
//   1. PURE judgement: the contract literals; a terminal screen model that replays an append-only
//      pty capture into the frames the terminal showed; a reader for one inspector frame; the finding
//      rules (assessInspectorJourney), buildInspectorReceipt and exitCodeFor. These functions do no I/O,
//      read no clock and load no SDK. The offline test (test/workbench-inspector-receipt.test.ts) feeds
//      the reader frames the product's own WorkflowDialog draws and drives the judge with fabricated
//      journeys and one mutant per rule, so a runner that invented frames, counted rows the operator
//      never saw or smoothed a mismatch away fails there.
//   2. CLI runner: drives a REAL `pi` terminal session over a pty (util-linux script(1); node-pty is not
//      a dependency) against the compiled extension in dist/, running a harness-authored saved Claude
//      SDK workflow. While the run executes it opens the run's inspector from the fleet list, Tab-cycles
//      overview -> graph -> timeline -> details, selects a native row, loads that row's evidence on
//      focus (Enter) and resizes the pty to 80x24. Missing or dead prerequisites exit 2 with a typed
//      unavailability receipt: never a fake pass, never a silent skip.
//
// Measurement only: src/ is untouched. Every string the receipt carries from the screen passes the shared
// helper (sanitizeWorkbenchText, src/workbench/redaction.ts) with the named FRAME_LAYOUT, injected by the
// runner from dist/; without an injected helper the receipt keeps no screen text at all and is unrealised.

import { encodeCwd, installScratchLeakGuard, makeScratch, removeScratch, sessionScratchRoot } from "./scratch.mjs";

installScratchLeakGuard();

export const INSPECTOR_RECEIPT_CONTRACT = "workbench.inspector-journey/v1";

/** The views Tab cycles, in the product's order (src/ui/workflow-inspector.ts `views`). */
export const INSPECTOR_VIEWS = Object.freeze(["overview", "graph", "timeline", "details"]);

/** docs/workbench/10 "Failure and deception defenses": the four states that must not be confused. */
export const INSPECTOR_STATE_CLASSES = Object.freeze(["stalled", "waiting", "stale", "unknown"]);

/** docs/workbench/10 "Design goals": an SSH session at 80x24 must be usable. */
export const RESPONSIVE_SIZE = Object.freeze({ cols: 80, rows: 24 });

/** The shared helper's named layout every screen string in the receipt takes (redaction.ts WorkbenchTextLayout). */
export const FRAME_LAYOUT = "label";

/** Bound of one sanitized screen string in the receipt. */
export const FRAME_TEXT_LIMIT = 240;

/** The overlay the dialog opens in (src/ui/workflow-menu.ts overlayOptions: width "90%", maxHeight VIEWPORT_HEIGHT_PCT "70%"). */
export const OVERLAY_GEOMETRY = Object.freeze({ widthPct: 90, maxHeightPct: 70 });

/** The read cap the host builds its projection with (src/index.ts WORKBENCH_PROJECTION_MAX_QUERY): the graph and timeline window. */
export const RELATION_PAGE = 40;

/** Providers of local-only rows (src/index.ts emitObservation: "pi-workflow" before the SDK supplies a session id). */
export const LOCAL_PROVIDERS = Object.freeze(["pi-workflow"]);

/** Measured semantic violations, in the order assessInspectorJourney reports them (exit 1). */
export const INSPECTOR_FINDING_RULES = Object.freeze([
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

/** Why a measurement is unrealised (exit 2), in the order assessInspectorJourney reports them. */
export const INSPECTOR_UNREALISED_REASONS = Object.freeze([
  "unavailable",
  "journey-unarmed",
  "run-never-live",
  "inspector-not-opened",
  "no-native-row",
  "no-evidence-ref",
]);

/** Run statuses the inspector header names while the run executes (WorkflowTask status). */
const LIVE_STATUSES = Object.freeze(["running", "paused"]);

/* ------------------------------------------------------------------------- *
 * Screen model: an append-only pty capture replayed into the frames the
 * terminal showed. pi 1.2.0's renderer brackets every frame in synchronized
 * output (CSI ?2026h ... CSI ?2026l) and writes rows by absolute position with
 * autowrap off, so the grid at each CSI ?2026l is one whole frame.
 * ------------------------------------------------------------------------- */

const ESC = "\u001B";
const BEL = "\u0007";

/** Code point ranges a terminal draws in no cell of their own (combining marks, zero-width units, variation selectors). */
const ZERO_WIDTH = Object.freeze([
  [0x0300, 0x036f], [0x0483, 0x0489], [0x0591, 0x05bd], [0x0610, 0x061a], [0x064b, 0x065f], [0x1ab0, 0x1aff],
  [0x1dc0, 0x1dff], [0x200b, 0x200f], [0x2028, 0x202e], [0x2060, 0x206f], [0x20d0, 0x20ff], [0xfe00, 0xfe0f],
  [0xfe20, 0xfe2f], [0xfeff, 0xfeff], [0xe0000, 0xe0fff],
]);

/** Code point ranges a terminal draws two cells wide (East Asian wide and fullwidth, and the emoji blocks). */
const WIDE = Object.freeze([
  [0x1100, 0x115f], [0x231a, 0x231b], [0x2329, 0x232a], [0x23e9, 0x23ec], [0x23f0, 0x23f0], [0x23f3, 0x23f3],
  [0x25fd, 0x25fe], [0x2614, 0x2615], [0x2648, 0x2653], [0x267f, 0x267f], [0x2693, 0x2693], [0x26a1, 0x26a1],
  [0x26aa, 0x26ab], [0x26bd, 0x26be], [0x26c4, 0x26c5], [0x26ce, 0x26ce], [0x26d4, 0x26d4], [0x26ea, 0x26ea],
  [0x26f2, 0x26f3], [0x26f5, 0x26f5], [0x26fa, 0x26fa], [0x26fd, 0x26fd], [0x2705, 0x2705], [0x270a, 0x270b],
  [0x2728, 0x2728], [0x274c, 0x274c], [0x274e, 0x274e], [0x2753, 0x2755], [0x2757, 0x2757], [0x2795, 0x2797],
  [0x27b0, 0x27b0], [0x27bf, 0x27bf], [0x2b1b, 0x2b1c], [0x2b50, 0x2b50], [0x2b55, 0x2b55], [0x2e80, 0x303e],
  [0x3041, 0x33ff], [0x3400, 0x4dbf], [0x4e00, 0x9fff], [0xa000, 0xa4cf], [0xa960, 0xa97f], [0xac00, 0xd7a3],
  [0xf900, 0xfaff], [0xfe10, 0xfe19], [0xfe30, 0xfe6f], [0xff00, 0xff60], [0xffe0, 0xffe6], [0x1f004, 0x1f004],
  [0x1f0cf, 0x1f0cf], [0x1f18e, 0x1f18e], [0x1f191, 0x1f19a], [0x1f200, 0x1f251], [0x1f300, 0x1f64f],
  [0x1f680, 0x1f6ff], [0x1f900, 0x1f9ff], [0x1fa70, 0x1faff], [0x20000, 0x3fffd],
]);

const inRanges = (ranges, codePoint) => ranges.some(([low, high]) => codePoint >= low && codePoint <= high);

/** Cells one code point occupies: 0 for zero-width units, 2 for wide ones, 1 otherwise (controls are never drawn). */
export function cellWidth(codePoint) {
  if (inRanges(ZERO_WIDTH, codePoint)) return 0;
  return inRanges(WIDE, codePoint) ? 2 : 1;
}

/**
 * A line as terminal cells: one string per cell, a wide character followed by an empty continuation cell, and a zero-width
 * unit kept inside the cell before it (never dropped: the receipt's sanitizer reads every unit the screen held).
 */
export function cellsOf(line) {
  const cells = [];
  for (const char of String(line)) {
    const width = cellWidth(char.codePointAt(0) ?? 0);
    if (width === 0) {
      if (cells.length === 0) cells.push(char);
      else cells[cells.length - 1] += char;
      continue;
    }
    cells.push(char);
    if (width === 2) cells.push("");
  }
  return cells;
}

const blankRow = cols => Array.from({ length: cols }, () => " ");

/** A blank terminal of `cols` x `rows` cells, cursor home, autowrap on (a terminal's power-on state). */
export function createScreen(cols, rows) {
  return {
    cols, rows, row: 0, col: 0, autowrap: true, pendingWrap: false, overflow: 0,
    cells: Array.from({ length: rows }, () => blankRow(cols)), saved: { row: 0, col: 0 },
    tail: "", syncing: false, frames: 0, frame: undefined,
  };
}

/** Resize the grid as a terminal does on a window change: content kept from the top-left, clipped or padded. */
export function resizeScreen(screen, cols, rows) {
  screen.cells = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (__, c) => screen.cells[r]?.[c] ?? " "));
  screen.cols = cols;
  screen.rows = rows;
  screen.row = Math.min(screen.row, rows - 1);
  screen.col = Math.min(screen.col, cols - 1);
  screen.pendingWrap = false;
}

/** The grid as text, one string per row, trailing blanks trimmed. */
export function screenLines(screen) {
  return screen.cells.map(row => row.join("").replace(/ +$/u, ""));
}

function lineFeed(screen) {
  screen.pendingWrap = false;
  if (screen.row < screen.rows - 1) {
    screen.row += 1;
    return;
  }
  screen.cells.shift();
  screen.cells.push(blankRow(screen.cols));
}

function putChar(screen, char, width) {
  if (width === 0) {
    const col = Math.max(0, Math.min(screen.cols - 1, screen.col - (screen.pendingWrap ? 0 : 1)));
    screen.cells[screen.row][col] += char;
    return;
  }
  if (screen.pendingWrap || screen.col + width > screen.cols) {
    // A character past the right margin: a renderer that keeps every line inside the width never writes one.
    screen.overflow += 1;
    if (screen.autowrap) {
      screen.col = 0;
      lineFeed(screen);
    } else screen.col = Math.max(0, screen.cols - width);
  }
  const row = screen.cells[screen.row];
  if (row[screen.col] === "" && screen.col > 0) row[screen.col - 1] = " ";
  row[screen.col] = char;
  if (width === 2) row[screen.col + 1] = "";
  screen.col += width;
  screen.pendingWrap = false;
  if (screen.col >= screen.cols) {
    screen.col = screen.cols - 1;
    screen.pendingWrap = true;
  }
}

function eraseInRow(screen, row, from, to) {
  const cells = screen.cells[row];
  for (let col = Math.max(0, from); col < Math.min(screen.cols, to); col += 1) cells[col] = " ";
}

function moveTo(screen, row, col) {
  screen.row = Math.max(0, Math.min(screen.rows - 1, row));
  screen.col = Math.max(0, Math.min(screen.cols - 1, col));
  screen.pendingWrap = false;
}

function csi(screen, params, final) {
  const isPrivate = params.startsWith("?");
  const parts = (isPrivate ? params.slice(1) : params).split(";").map(part => (part === "" ? undefined : Number(part)));
  const n = (index, fallback) => {
    const value = parts[index];
    return value === undefined || !Number.isFinite(value) ? fallback : value;
  };
  if (isPrivate) {
    if (final !== "h" && final !== "l") return;
    for (const mode of parts) {
      if (mode === 7) screen.autowrap = final === "h";
      if (mode === 2026) {
        if (final === "h") screen.syncing = true;
        else {
          screen.syncing = false;
          screen.frames += 1;
          screen.frame = screenLines(screen);
        }
      }
      if (mode === 1049 || mode === 47 || mode === 1047) {
        for (let row = 0; row < screen.rows; row += 1) eraseInRow(screen, row, 0, screen.cols);
        moveTo(screen, 0, 0);
      }
    }
    return;
  }
  if (/[<=>]/u.test(params)) return;
  switch (final) {
    case "A": moveTo(screen, screen.row - Math.max(1, n(0, 1)), screen.col); return;
    case "B": moveTo(screen, screen.row + Math.max(1, n(0, 1)), screen.col); return;
    case "C": moveTo(screen, screen.row, screen.col + Math.max(1, n(0, 1))); return;
    case "D": moveTo(screen, screen.row, screen.col - Math.max(1, n(0, 1))); return;
    case "E": moveTo(screen, screen.row + Math.max(1, n(0, 1)), 0); return;
    case "F": moveTo(screen, screen.row - Math.max(1, n(0, 1)), 0); return;
    case "G": moveTo(screen, screen.row, n(0, 1) - 1); return;
    case "d": moveTo(screen, n(0, 1) - 1, screen.col); return;
    case "H":
    case "f": moveTo(screen, n(0, 1) - 1, n(1, 1) - 1); return;
    case "J": {
      const mode = n(0, 0);
      if (mode === 0) {
        eraseInRow(screen, screen.row, screen.col, screen.cols);
        for (let row = screen.row + 1; row < screen.rows; row += 1) eraseInRow(screen, row, 0, screen.cols);
      } else if (mode === 1) {
        for (let row = 0; row < screen.row; row += 1) eraseInRow(screen, row, 0, screen.cols);
        eraseInRow(screen, screen.row, 0, screen.col + 1);
      } else for (let row = 0; row < screen.rows; row += 1) eraseInRow(screen, row, 0, screen.cols);
      return;
    }
    case "K": {
      const mode = n(0, 0);
      if (mode === 0) eraseInRow(screen, screen.row, screen.col, screen.cols);
      else if (mode === 1) eraseInRow(screen, screen.row, 0, screen.col + 1);
      else eraseInRow(screen, screen.row, 0, screen.cols);
      return;
    }
    case "X": eraseInRow(screen, screen.row, screen.col, screen.col + Math.max(1, n(0, 1))); return;
    case "P": {
      const cells = screen.cells[screen.row];
      const count = Math.max(1, n(0, 1));
      cells.splice(screen.col, count);
      while (cells.length < screen.cols) cells.push(" ");
      return;
    }
    case "@": {
      const cells = screen.cells[screen.row];
      cells.splice(screen.col, 0, ...blankRow(Math.max(1, n(0, 1))));
      cells.length = screen.cols;
      return;
    }
    case "S":
      for (let i = 0; i < Math.max(1, n(0, 1)); i += 1) {
        screen.cells.shift();
        screen.cells.push(blankRow(screen.cols));
      }
      return;
    case "T":
      for (let i = 0; i < Math.max(1, n(0, 1)); i += 1) {
        screen.cells.pop();
        screen.cells.unshift(blankRow(screen.cols));
      }
      return;
    case "s": screen.saved = { row: screen.row, col: screen.col }; return;
    case "u": moveTo(screen, screen.saved.row, screen.saved.col); return;
    default: return; // SGR (m), scroll regions, queries and window operations draw nothing
  }
}

/**
 * Feed decoded capture text into the screen. Incremental: an escape sequence cut at the end of a chunk is held and completed by
 * the next one. Every CSI ?2026l (end of synchronized output) stores the whole grid as `screen.frame`. Returns frames completed.
 */
export function feedScreen(screen, text) {
  const input = screen.tail + String(text);
  screen.tail = "";
  const before = screen.frames;
  let i = 0;
  while (i < input.length) {
    const char = input[i];
    if (char === ESC) {
      const next = input[i + 1];
      if (next === undefined) {
        screen.tail = input.slice(i);
        break;
      }
      if (next === "[") {
        let end = i + 2;
        while (end < input.length && !/[@-~]/u.test(input[end])) end += 1;
        if (end >= input.length) {
          screen.tail = input.slice(i);
          break;
        }
        csi(screen, input.slice(i + 2, end), input[end]);
        i = end + 1;
        continue;
      }
      if (next === "]" || next === "P" || next === "_" || next === "^" || next === "X") {
        // OSC, DCS, APC, PM and SOS strings draw nothing; each ends at BEL (OSC) or ST.
        let end = i + 2;
        let found = -1;
        while (end < input.length) {
          if (input[end] === BEL && next === "]") { found = end + 1; break; }
          if (input[end] === ESC && input[end + 1] === "\\") { found = end + 2; break; }
          end += 1;
        }
        if (found < 0) {
          screen.tail = input.slice(i);
          break;
        }
        i = found;
        continue;
      }
      if (next === "(" || next === ")" || next === "*" || next === "+" || next === "#") {
        if (i + 2 >= input.length) {
          screen.tail = input.slice(i);
          break;
        }
        i += 3;
        continue;
      }
      if (next === "7") screen.saved = { row: screen.row, col: screen.col };
      else if (next === "8") moveTo(screen, screen.saved.row, screen.saved.col);
      else if (next === "D") lineFeed(screen);
      else if (next === "E") {
        lineFeed(screen);
        screen.col = 0;
      } else if (next === "M") {
        if (screen.row > 0) screen.row -= 1;
        else {
          screen.cells.pop();
          screen.cells.unshift(blankRow(screen.cols));
        }
      } else if (next === "c") {
        for (let row = 0; row < screen.rows; row += 1) eraseInRow(screen, row, 0, screen.cols);
        moveTo(screen, 0, 0);
      }
      i += 2;
      continue;
    }
    const codePoint = input.codePointAt(i) ?? 0;
    const unit = codePoint > 0xffff ? 2 : 1;
    if (codePoint === 0x0d) {
      screen.col = 0;
      screen.pendingWrap = false;
    } else if (codePoint === 0x0a || codePoint === 0x0b || codePoint === 0x0c) lineFeed(screen);
    else if (codePoint === 0x08) moveTo(screen, screen.row, screen.col - 1);
    else if (codePoint === 0x09) moveTo(screen, screen.row, Math.min(screen.cols - 1, (Math.floor(screen.col / 8) + 1) * 8));
    else if (codePoint >= 0x20 && !(codePoint >= 0x7f && codePoint < 0xa0)) putChar(screen, input.slice(i, i + unit), cellWidth(codePoint));
    i += unit;
  }
  return screen.frames - before;
}

/* ------------------------------------------------------------------------- *
 * Inspector frame reader: the overlay the dialog draws, located by its own
 * header line, read back into the facts the judge pairs. Glyphs and markers
 * are the ones src/ui/workflow-inspector.ts draws in its Unicode tier.
 * ------------------------------------------------------------------------- */

const GLYPHS = "✓✘○◌?";
const DOT = "·";
const ELLIPSIS = "…";
const POINTER = "❯";
// The layout's safe() collapses runs of spaces, so the header's double spaces reach the screen as one.
const VIEW_HEADER_RE = new RegExp(` (OVERVIEW|GRAPH|TIMELINE|DETAILS) {1,2}(\\d+) observed operations? ${DOT} (following|paused view) ${DOT} (\\d+)/(\\d+)`, "u");
const TITLE_RE = /^ ╭ (.*) ╮$/u;
const RULE_RE = /^ ─+$/u;
const HINT_TEXT = `Tab views ${DOT} j/k ${DOT} Esc back/close`;
const LEGACY_HINT_TEXT = `Tab inspector ${DOT} g toggle view`;
const PAGED_RE = new RegExp(`^ Rows (\\d+)-(\\d+)/(\\d+) ${DOT} viewport only$`, "u");
// A row's lead is the pointer or its blank: tree and timeline rows keep the two-space blank ("   ? title"), a graph head row
// drawn through the layout's add() reaches the screen with its blank collapsed to one space ("  ? title").
const LEAD = `(?:(${POINTER}) | {1,2})?`;
const TREE_ROW_RE = new RegExp(`^ ${LEAD}(?:(?: {2})*(?:\\u2514\\u2500|\\u251C\\u2500) )?([${GLYPHS}]) (.*)$`, "u");
const COLLAPSED_RE = new RegExp(`^ ${LEAD}(?:(?: {2})*(?:\\u2514\\u2500|\\u251C\\u2500) )?${ELLIPSIS} (\\d+) collapsed`, "u");
const TREE_MORE_RE = new RegExp(`^ (?:${POINTER} )?${ELLIPSIS} (\\d+) more rows? in this page \\(row budget\\)$`, "u");
const SELECTED_RE = new RegExp(`^ Selected {1,2}(\\S+) ${DOT} (\\d+) evidence refs?$`, "u");
const HEAD_ROW_RE = new RegExp(`^ ${LEAD}([${GLYPHS}]) (.*)$`, "u");
const GRAPH_MORE_RE = new RegExp(`^ (?:${POINTER} )?${ELLIPSIS} more: (.*) \\(row budget\\)$`, "u");
const LANE_RE = new RegExp(`^ \\u258C (.*) ${DOT} (confirmed|unconfirmed) ${DOT} (\\d+) rows?$`, "u");
const TIMELINE_MORE_RE = new RegExp(`^ ${ELLIPSIS} (.*) \\(row budget\\)$`, "u");
const NATIVE_REF_RE = /^ Native ref: (\S+)$/u;
const STATUS_LINE_RE = new RegExp(`^ Status: (.*) ${DOT} (active|waiting|success|failure|unknown)$`, "u");
const FRESHNESS_LINE_RE = new RegExp(`^ Freshness: (current|stale|unknown) ${DOT}`, "u");
const EVIDENCE_COUNT_RE = /^ Evidence: (\d+) references?/u;
// The label may be width-truncated ("loaded · 42…"): the state word leads it, the byte count is read only when drawn whole.
const EVIDENCE_ROW_RE = new RegExp(`^ (?:(${POINTER}) )?(\\S+) ${DOT} (not loaded \\(Enter\\)|loading${ELLIPSIS}|unavailable: (\\S+).*|loaded\\b.*)$`, "u");
const EVIDENCE_BYTES_RE = new RegExp(`^loaded ${DOT} (\\d+) bytes`, "u");
const FRESHNESS_SEGMENT_RE = new RegExp(` ${DOT} (CURRENT|STALE|UNKNOWN)(?: ${DOT}|$)`, "u");
const ATTENTION_COUNT_RE = /\b(active|waiting|stale|unknown|disconnected) (\d+)\b/gu;

/** Cells before string index `at` of `line`. */
const cellIndexAt = (line, at) => cellsOf(String(line).slice(0, at)).length;

/** The overlay rectangle of a `cols` x `rows` terminal: width and the most rows it shows (pi-tui parseSizeValue floors). */
export function overlayBounds(cols, rows) {
  return { width: Math.floor((cols * OVERLAY_GEOMETRY.widthPct) / 100), maxHeight: Math.floor((rows * OVERLAY_GEOMETRY.maxHeightPct) / 100) };
}

/** `count` rows of the window holding the 1-based `position` of `total`, in pages of `page`: what one window read returns. */
export function windowCount(total, position, page) {
  if (!(total > 0)) return 0;
  const start = Math.floor((Math.max(1, Math.min(position, total)) - 1) / page) * page;
  return Math.min(page, total - start);
}

/** Two native references are the same one when equal, or when one is a width-truncated (ellipsis) prefix of the other. */
export function sameNativeRef(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a === "" || b === "") return false;
  if (a === b) return true;
  const stem = text => (text.endsWith(ELLIPSIS) ? text.slice(0, -ELLIPSIS.length) : undefined);
  const sa = stem(a);
  const sb = stem(b);
  if (sa !== undefined && sb === undefined) return sa.length > 0 && b.startsWith(sa);
  if (sb !== undefined && sa === undefined) return sb.length > 0 && a.startsWith(sb);
  return sa !== undefined && sb !== undefined && sa.length > 0 && sb.length > 0 && (sa.startsWith(sb) || sb.startsWith(sa));
}

const providerOf = nativeRef => (typeof nativeRef === "string" && nativeRef.includes("/") ? nativeRef.slice(0, nativeRef.indexOf("/")) : undefined);

/** A status row of the overview tree, the graph or the timeline: its glyph, its freshness column when drawn, its provider when named. */
function statusRow(view, glyph, text, pointed) {
  const freshness = FRESHNESS_SEGMENT_RE.exec(text)?.[1];
  const provider = view === "overview" ? text.split(` ${DOT} `)[1] : view === "graph" ? text.split(` ${DOT} `)[1] : undefined;
  return { view, glyph, pointed, ...(freshness !== undefined ? { freshness } : {}), ...(provider !== undefined && provider !== "" ? { provider } : {}), text };
}

/**
 * Read the inspector overlay out of one terminal frame. Pure: `lines` are the frame's rows (screenLines), `size` the terminal's
 * cols and rows. The overlay is found by its own view header ("VIEW  N observed operations · ... · i/N"); a frame without one
 * reads `{ view: undefined }` with `legacyDialog` telling whether the dialog's legacy layout (its "Tab inspector" line) is up.
 * `drawn` counts the rows the operator can see plus the rows a drawn notice counts; `expected` is what the projection's own
 * count in the same frame says that view holds, so the two disagree exactly when rows vanish without a notice.
 */
export function readInspectorFrame(lines, size) {
  const rows = Array.isArray(lines) ? lines.map(line => String(line)) : [];
  const legacyDialog = rows.some(line => line.includes(LEGACY_HINT_TEXT));
  const { width, maxHeight } = overlayBounds(size.cols, size.rows);
  let headerRow = -1;
  let match;
  for (let r = 1; r < rows.length; r += 1) {
    match = VIEW_HEADER_RE.exec(rows[r]);
    if (match && TITLE_RE.test(sliceCells(rows[r - 1], cellIndexAt(rows[r], match.index), width).replace(/ +$/u, ""))) {
      headerRow = r;
      break;
    }
    match = undefined;
  }
  if (headerRow < 0 || match === undefined) return { view: undefined, legacyDialog };
  const col = cellIndexAt(rows[headerRow], match.index);
  const top = headerRow - 1;
  const overlay = [];
  let hint = false;
  for (let r = top; r < Math.min(rows.length, top + Math.max(2, maxHeight)); r += 1) {
    const text = sliceCells(rows[r], col, width).replace(/ +$/u, "");
    overlay.push(text);
    if (text === ` ${HINT_TEXT}`) {
      hint = true;
      break;
    }
  }
  const view = match[1].toLowerCase();
  const total = Number(match[2]);
  const position = Number(match[4]);
  const titleText = TITLE_RE.exec(overlay[0])?.[1] ?? "";
  const capped = titleText.endsWith(` ${DOT} capped`);
  const head = (capped ? titleText.slice(0, -` ${DOT} capped`.length) : titleText).trim();
  // "title  status" reaches the screen as "title status": the status is the last word (a WorkflowTask status never has a space).
  const split = head.lastIndexOf(" ");
  const title = split >= 0 ? head.slice(0, split).trim() : head;
  const status = split >= 0 ? head.slice(split + 1) : "";
  const ruleAt = overlay.findIndex((text, at) => at >= 2 && RULE_RE.test(text));
  const body = overlay.slice(ruleAt >= 0 ? ruleAt + 1 : 2, hint ? -1 : undefined);
  let paged = null;
  for (const text of body) {
    const p = PAGED_RE.exec(text);
    if (p) paged = { from: Number(p[1]), to: Number(p[2]), total: Number(p[3]) };
  }
  const reading = {
    view, title, status, capped, total, position, following: match[3] === "following", paged, hint, clipped: !hint,
    cols: size.cols, rows: size.rows, overlay: { col, width, top, height: overlay.length },
    drawn: 0, remainder: 0, expected: 0, statusRows: [], lines: overlay,
  };
  if (view === "overview") {
    const pageRows = paged ? paged.to - paged.from + 1 : total;
    let part = "tree";
    for (const text of body) {
      if (/^ (?:Selected {1,2}\S|Attention: |Critical path: )/u.test(text) && part === "tree") part = "after";
      if (text.startsWith(" Attention: ")) {
        part = "attention";
        reading.attention = {};
      } else if (text.startsWith(" Critical path: ")) part = "after";
      if (part === "tree") {
        const row = TREE_ROW_RE.exec(text);
        if (row) {
          reading.drawn += 1;
          reading.statusRows.push(statusRow(view, row[2], row[3], row[1] === POINTER));
          continue;
        }
        const collapsed = COLLAPSED_RE.exec(text);
        if (collapsed) reading.remainder += Number(collapsed[1]);
        const more = TREE_MORE_RE.exec(text);
        if (more) reading.remainder += Number(more[1]);
        continue;
      }
      const selected = SELECTED_RE.exec(text);
      if (selected) {
        reading.nativeRef = selected[1];
        reading.evidenceRefs = Number(selected[2]);
      }
      if (part === "attention" && reading.attention !== undefined) {
        // The panel's count line may wrap; a bottleneck row below it names no count word, so the first reading of each wins.
        for (const count of text.matchAll(ATTENTION_COUNT_RE)) if (reading.attention[count[1]] === undefined) reading.attention[count[1]] = Number(count[2]);
      }
    }
    reading.expected = pageRows;
  } else if (view === "graph") {
    for (const text of body) {
      const row = HEAD_ROW_RE.exec(text);
      if (row) {
        reading.drawn += 1;
        reading.statusRows.push(statusRow(view, row[2], row[3], row[1] === POINTER));
        continue;
      }
      const more = GRAPH_MORE_RE.exec(text);
      if (more) reading.remainder += Number(/(\d+) nodes?\b/u.exec(more[1])?.[1] ?? 0);
    }
    reading.expected = windowCount(total, position, RELATION_PAGE);
  } else if (view === "timeline") {
    let laneRows = 0;
    let lanes = 0;
    for (const text of body) {
      const lane = LANE_RE.exec(text);
      if (lane) {
        lanes += 1;
        laneRows += Number(lane[3]);
        continue;
      }
      const row = HEAD_ROW_RE.exec(text);
      if (row) {
        reading.drawn += 1;
        reading.statusRows.push(statusRow(view, row[2], row[3], row[1] === POINTER));
        continue;
      }
      const more = TIMELINE_MORE_RE.exec(text);
      if (more) reading.remainder += Number(/(\d+) more rows?\b/u.exec(more[1])?.[1] ?? 0);
    }
    reading.lanes = lanes;
    reading.laneRows = laneRows;
    reading.expected = windowCount(total, position, RELATION_PAGE);
  } else {
    let selectedEvidence;
    for (const text of body) {
      const native = NATIVE_REF_RE.exec(text);
      if (native) {
        reading.nativeRef = native[1];
        reading.drawn += 1;
      }
      const status = STATUS_LINE_RE.exec(text);
      if (status) reading.nodeStatus = { text: status[1], tone: status[2] };
      const freshness = FRESHNESS_LINE_RE.exec(text);
      if (freshness) reading.nodeFreshness = freshness[1];
      const count = EVIDENCE_COUNT_RE.exec(text);
      if (count) reading.evidenceRefs = Number(count[1]);
      const evidence = EVIDENCE_ROW_RE.exec(text);
      if (evidence && (evidence[1] === POINTER || selectedEvidence === undefined)) {
        const label = evidence[3];
        const state = label.startsWith("not loaded") ? "not-requested" : label.startsWith("loading") ? "loading" : label.startsWith("unavailable") ? "unavailable" : "loaded";
        const bytes = EVIDENCE_BYTES_RE.exec(label)?.[1];
        selectedEvidence = {
          ref: evidence[2], state, label,
          ...(evidence[4] !== undefined ? { reason: evidence[4] } : {}),
          ...(bytes !== undefined ? { bytes: Number(bytes) } : {}),
        };
      }
    }
    if (selectedEvidence) reading.evidence = selectedEvidence;
    reading.expected = total > 0 ? 1 : 0;
  }
  reading.drawn += reading.remainder;
  if (reading.nativeRef !== undefined) {
    const provider = providerOf(reading.nativeRef);
    if (provider !== undefined) reading.provider = provider;
  }
  return reading;
}

/** Cells [from, from + count) of a line, joined back to text. */
function sliceCells(line, from, count) {
  return cellsOf(line).slice(from, from + count).join("");
}

/* ------------------------------------------------------------------------- *
 * Judgement.
 * ------------------------------------------------------------------------- */

const isObject = value => value !== null && typeof value === "object" && !Array.isArray(value);
const isNonEmptyString = value => typeof value === "string" && value.length > 0;

function ts(value) {
  if (typeof value !== "string") return Number.NaN;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

/** Non-decreasing where both ends exist (one reader poll may satisfy two predicates); an absent stamp never fails ordering. */
function ordered(...stamps) {
  const present = stamps.map(ts).filter(value => Number.isFinite(value));
  for (let i = 1; i < present.length; i += 1) if (present[i] < present[i - 1]) return false;
  return true;
}

const isReading = value => isObject(value) && (value.view === undefined || INSPECTOR_VIEWS.includes(value.view));

function journeyArmed(journey) {
  if (!isObject(journey)) return false;
  const { views, selection, evidence, resize } = journey;
  return (
    isNonEmptyString(journey.captureRef) && isNonEmptyString(journey.launchAt) &&
    Array.isArray(views) && views.length === INSPECTOR_VIEWS.length &&
    views.every((step, at) => isObject(step) && step.view === INSPECTOR_VIEWS[at] && isNonEmptyString(step.keySentAt) &&
      (step.frame === undefined || isReading(step.frame))) &&
    isObject(selection) && Number.isSafeInteger(selection.keys) && selection.keys >= 0 &&
    isObject(evidence) && Array.isArray(evidence.attempts) &&
    evidence.attempts.every(attempt => isObject(attempt) && isNonEmptyString(attempt.sentAt)) &&
    isObject(resize) && isObject(resize.to) && resize.to.cols === RESPONSIVE_SIZE.cols && resize.to.rows === RESPONSIVE_SIZE.rows &&
    Number.isSafeInteger(resize.overflowAfter) && resize.overflowAfter >= 0 &&
    Array.isArray(resize.cycle) && resize.cycle.every(isReading) &&
    Array.isArray(journey.rows) && journey.rows.every(row => isObject(row) && typeof row.glyph === "string")
  );
}

const isNativeProvider = provider => isNonEmptyString(provider) && !LOCAL_PROVIDERS.includes(provider);

/**
 * Judge one measured inspector journey. Pure: only the observed shape is judged, in rule order. A missing or unarmed journey,
 * a run never seen live, an inspector that never rendered, and a session with no native row or no evidence reference to load
 * make the measurement UNREALISED (typed reasons) rather than inventing findings.
 */
export function assessInspectorJourney(input) {
  const source = isObject(input) ? input : {};
  const journey = source.journey;
  const reasons = [];
  if (isNonEmptyString(source.unavailability)) reasons.push("unavailable");
  if (!journeyArmed(journey)) reasons.push("journey-unarmed");
  if (reasons.length > 0) return { findings: [], realised: false, reasons };
  const frames = journey.views.map(step => step.frame).filter(frame => isReading(frame) && frame.view !== undefined);
  if (!isNonEmptyString(journey.liveAt)) reasons.push("run-never-live");
  if (frames.length === 0) reasons.push("inspector-not-opened");
  const allRows = journey.rows;
  const nativeSeen = isNativeProvider(journey.selection.provider) || allRows.some(row => isNativeProvider(row.provider)) ||
    frames.some(frame => isNativeProvider(frame.provider));
  if (!nativeSeen) reasons.push("no-native-row");
  const details = journey.views[INSPECTOR_VIEWS.indexOf("details")].frame;
  const selectedRefs = journey.evidence.refs ?? details?.evidenceRefs;
  if (isNativeProvider(journey.selection.provider) && journey.evidence.attempts.length === 0 && !(selectedRefs > 0)) reasons.push("no-evidence-ref");
  if (reasons.length > 0) return { findings: [], realised: false, reasons };

  const findings = [];
  const add = rule => {
    if (!findings.includes(rule)) findings.push(rule);
  };
  const seen = journey.views.map(step => (isReading(step.frame) ? step.frame.view : undefined));

  // Every view of the Tab cycle rendered its own header after its key press.
  if (INSPECTOR_VIEWS.some(view => !seen.includes(view)) || journey.views.some(step => !isNonEmptyString(step.seenAt))) add("view-not-rendered");

  // Each Tab advanced exactly one view, in the product's order.
  if (seen.some((view, at) => view !== undefined && view !== INSPECTOR_VIEWS[at])) add("view-cycle-out-of-order");

  // Each view was visited while the run executed: its own header names a live status.
  if (frames.some(frame => !LIVE_STATUSES.includes(frame.status))) add("view-not-live");

  // A view's drawn rows plus the rows its notices count equal what the projection's own count in that frame says it holds, before
  // and after the resize.
  const resizedFrames = [journey.resize.frame, ...journey.resize.cycle].filter(frame => isReading(frame) && frame.view !== undefined);
  const judged = [...frames, ...resizedFrames];
  if (judged.some(frame => !Number.isSafeInteger(frame.drawn) || !Number.isSafeInteger(frame.expected) || frame.drawn !== frame.expected)) add("row-count-mismatch");

  // The details view's selected node is a native-provider row.
  if (!isNativeProvider(journey.selection.provider) || !isNonEmptyString(journey.selection.nativeRef)) add("native-row-not-selected");

  // Large content loads only on focus: no reference showed a payload before the Enter request made for it.
  if (journey.evidence.before?.state === "loaded" || journey.evidence.attempts.some(attempt => attempt.before?.state === "loaded")) {
    add("evidence-loaded-before-focus");
  }

  // An Enter request on the focused native row reached a loaded payload.
  if (!journey.evidence.attempts.some(attempt => attempt.outcome === "loaded")) add("evidence-not-loaded");

  // At 80x24 every view still draws its header and key hint at that size (the resized frame and one more Tab cycle), and
  // nothing was written past the right margin.
  const resized = journey.resize.frame;
  const usable = frame => isReading(frame) && frame.view !== undefined && frame.hint === true &&
    frame.cols === RESPONSIVE_SIZE.cols && frame.rows === RESPONSIVE_SIZE.rows;
  const cycled = journey.resize.cycle.filter(usable).map(frame => frame.view);
  if (!usable(resized) || journey.resize.overflowAfter > 0 || INSPECTOR_VIEWS.some(view => !cycled.includes(view)) ||
    journey.resize.cycle.some(frame => !usable(frame))) add("resize-not-responsive");

  // The resize kept the view and the selected native reference.
  if (!isReading(resized) || resized.view !== "details" || !sameNativeRef(resized.nativeRef, journey.selection.nativeRef)) add("selection-lost-on-resize");

  // STALE and UNKNOWN never draw a live or settled glyph: a row whose freshness column names them draws "?".
  if (allRows.some(row => (row.freshness === "STALE" || row.freshness === "UNKNOWN") && row.glyph !== "?")) add("status-glyph-confusion");

  // A spinner never implies progress once the run settled.
  if (allRows.some(row => row.glyph === "◌" && isNonEmptyString(row.runStatus) && !LIVE_STATUSES.includes(row.runStatus))) add("spinner-after-settle");

  // Reader stamps are non-decreasing across the journey.
  const attempts = journey.evidence.attempts.flatMap(attempt => [attempt.sentAt, attempt.seenAt]);
  if (!ordered(journey.launchAt, journey.liveAt, journey.inspectorOpenedAt, ...journey.views.flatMap(step => [step.keySentAt, step.seenAt]),
    journey.selection.seenAt, ...attempts, journey.resize.sentAt, journey.resize.seenAt)) add("capture-order-violated");

  return { findings, realised: true, reasons: [] };
}

/** State classes the journey's rows drew, for the receipt: the docs/10 four plus what the product's glyph vocabulary shows. */
export function stateClassesObserved(rows) {
  const list = Array.isArray(rows) ? rows : [];
  return {
    stalled: "not-rendered-by-product",
    waiting: list.filter(row => row.glyph === "○").length,
    stale: list.filter(row => row.freshness === "STALE").length,
    unknown: list.filter(row => row.freshness === "UNKNOWN" || (row.glyph === "?" && row.freshness !== "STALE")).length,
    active: list.filter(row => row.glyph === "◌").length,
    success: list.filter(row => row.glyph === "✓").length,
    failure: list.filter(row => row.glyph === "✘").length,
  };
}

const ABSOLUTE_PATH = /(?<![A-Za-z0-9._@+~-])\/(?:[A-Za-z0-9._@+~-]+\/)+([A-Za-z0-9._@+~-]*)/g;
const basename = value => (typeof value === "string" ? value.replace(ABSOLUTE_PATH, (_, tail) => tail) : value);

/** Every string leaf through `map`; arrays and plain objects rebuilt, everything else kept. */
function mapStrings(value, map) {
  if (typeof value === "string") return map(value);
  if (Array.isArray(value)) return value.map(entry => mapStrings(entry, map));
  if (isObject(value)) {
    const out = {};
    for (const [key, entry] of Object.entries(value)) out[key] = mapStrings(entry, map);
    return out;
  }
  return value;
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object") {
    for (const entry of Object.values(value)) deepFreeze(entry);
    Object.freeze(value);
  }
  return value;
}

/**
 * Shape the evidence-grade receipt. Every string reduces absolute paths to basenames and then passes the injected shared helper
 * (`sanitize(text, FRAME_TEXT_LIMIT, FRAME_LAYOUT)`, sanitizeWorkbenchText); the judge then reads the journey exactly as the
 * receipt carries it, so re-judging a receipt reproduces its verdict. Without a helper no screen text is kept: the journey is
 * dropped and the receipt is unrealised. A typed `unavailability` is a first-class field and can never be a pass.
 */
export function buildInspectorReceipt(input, options = {}) {
  const source = isObject(input) ? input : {};
  const sanitize = typeof options.sanitize === "function" ? options.sanitize : undefined;
  const clean = sanitize === undefined ? undefined : text => sanitize(basename(text), FRAME_TEXT_LIMIT, FRAME_LAYOUT);
  const given = isNonEmptyString(source.unavailability) ? source.unavailability : undefined;
  const unavailability = clean === undefined ? "frame sanitizer unavailable: no screen text is kept" : given === undefined ? undefined : clean(given);
  const journey = clean === undefined || !isObject(source.journey) ? {} : mapStrings(source.journey, clean);
  const diagnostics = clean === undefined ? [] : (Array.isArray(source.diagnostics) ? source.diagnostics : []).filter(entry => typeof entry === "string").map(clean);
  const { findings, realised, reasons } = assessInspectorJourney({ journey, unavailability });
  const field = key => (typeof source[key] === "string" ? source[key] : "unknown");
  return deepFreeze(structuredClone({
    contract: INSPECTOR_RECEIPT_CONTRACT,
    utc: typeof source.utc === "string" ? source.utc : "",
    revision: field("revision"),
    node: field("node"),
    platform: field("platform"),
    arch: field("arch"),
    ...(typeof source.pi === "string" ? { pi: source.pi } : {}),
    ...(isObject(source.settings) && clean !== undefined ? { settings: mapStrings(source.settings, clean) } : {}),
    ...(isObject(source.preflight) && clean !== undefined ? { preflight: mapStrings(source.preflight, clean) } : {}),
    // docs/workbench/14: every evidence artifact carries the commands that produced it (here the pty command, the operator
    // prompt and the keys sent, in order).
    ...(isObject(source.commands) && clean !== undefined ? { commands: mapStrings(source.commands, clean) } : {}),
    ...(unavailability !== undefined ? { unavailability } : {}),
    journey,
    stateClasses: stateClassesObserved(journey.rows),
    diagnostics,
    findings: [...findings],
    realised,
    reasons: [...reasons],
    pass: realised && findings.length === 0,
  }));
}

/** Runner exit semantics: 0 realised and clean, 1 realised with findings, 2 not realised. */
export function exitCodeFor(receipt) {
  if (!receipt.realised) return 2;
  return receipt.findings.length === 0 ? 0 : 1;
}

/* ------------------------------------------------------------------------- *
 * CLI runner: the live pty journey. Everything below runs only as a main
 * module and never under vitest.
 * ------------------------------------------------------------------------- */

const SAVED_WORKFLOW_NAME = "inspjourney";
const START_SIZE = Object.freeze({ cols: 120, rows: 40 });
const LABELS = Object.freeze(["insp-alpha", "insp-bravo", "insp-charlie", "insp-delta"]);
const LIVE_CARD_RE = new RegExp(`${SAVED_WORKFLOW_NAME}(\\d+)/([1-9]\\d*)agents${DOT}(?:\\d+ms|\\d+s|\\d+m\\d{2}s)(?!${DOT}(?:done|stopped|failed|paused))`, "u");
const TASK_ID_RE = /wf_[0-9a-f]{12}/u;

function savedWorkflowSource() {
  const schema = JSON.stringify({ type: "object", properties: { answer: { type: "string" } }, required: ["answer"], additionalProperties: false });
  // Two phases of two agents, each slow enough (a long enumeration before the answer) that the run stays live for the whole
  // inspection, and the second phase adds rows while the inspector is open.
  const slow = "First write a numbered list of 80 distinct one-sentence facts about the history of computing, one per line. Only after the full list, return the JSON object";
  const call = (label, answer) => `  () => agent("${slow} whose answer is exactly '${answer}'.", { label: "${label}", schema: ${schema} }),`;
  return [
    `export const meta = { name: "${SAVED_WORKFLOW_NAME}", description: "VC-5 inspector journey: two phases of two Claude SDK agents with a real live window" };`,
    "const first = await parallel([",
    call(LABELS[0], "alpha-ok-2718"),
    call(LABELS[1], "bravo-ok-3141"),
    "]);",
    "const second = await parallel([",
    call(LABELS[2], "charlie-ok-1618"),
    call(LABELS[3], "delta-ok-1414"),
    "]);",
    "return { first, second };",
    "",
  ].join("\n");
}

async function main() {
  const { closeSync, existsSync, fstatSync, mkdirSync, openSync, readFileSync, readSync, writeFileSync } = await import("node:fs");
  const { dirname, join, resolve } = await import("node:path");
  const { spawn, spawnSync } = await import("node:child_process");
  const { fileURLToPath, pathToFileURL } = await import("node:url");

  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  const distEntry = join(repoRoot, "dist", "index.js");
  const outDir = process.argv[2] ? resolve(process.argv[2]) : undefined;
  const diagnostics = [];
  const now = () => new Date().toISOString();
  const startedUtc = now();
  const sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms));
  const scratch = [];

  const { gitStamp } = await import("./git-stamp.mjs");
  const revision = (() => {
    const { head, porcelain } = gitStamp(repoRoot);
    if (head === null || porcelain === null) return "unknown";
    return porcelain.trim().length > 0 ? `${head.slice(0, 7)}-dirty` : head.slice(0, 7);
  })();
  const hostFacts = { utc: startedUtc, revision, node: process.version, platform: process.platform, arch: process.arch };

  let sanitize;
  try {
    ({ sanitizeWorkbenchText: sanitize } = await import(pathToFileURL(join(repoRoot, "dist", "workbench", "redaction.js")).href));
  } catch {
    sanitize = undefined;
  }

  function finish(receipt) {
    // The raw pty capture is removed with the scratch, unread by anything but the screen model: every screen string the receipt
    // carries passed the shared helper (gate refusal #1 F3: no opt-in copies the unsanitized capture out of scratch).
    removeScratch(...scratch);
    if (outDir !== undefined) {
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "inspector-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
    }
    console.log(JSON.stringify({ ...receipt, ...(outDir !== undefined ? { receiptPath: join(outDir, "inspector-receipt.json") } : {}) }));
    process.exit(exitCodeFor(receipt));
  }
  const unavailable = (reason, extra = {}) => {
    // Without the shared helper the receipt keeps no text at all; the reason still reaches the operator on stderr.
    if (sanitize === undefined) console.error(`unavailable: ${reason}`);
    finish(buildInspectorReceipt({ ...hostFacts, ...extra, journey: {}, diagnostics, unavailability: reason }, { sanitize }));
  };

  // Honest preflight: every absent or dead prerequisite is a typed unavailability, never a skip.
  if (!existsSync(distEntry)) unavailable("dist/index.js missing: build the extension first (npm run build)");
  if (sanitize === undefined) unavailable("dist/workbench/redaction.js unavailable: no shared frame sanitizer");
  const piProbe = spawnSync("pi", ["--version"], { encoding: "utf8" });
  if (piProbe.status !== 0) unavailable("pi binary unavailable on PATH");
  const piVersion = piProbe.stdout.trim();
  if (spawnSync("script", ["--version"], { encoding: "utf8" }).status !== 0) unavailable("util-linux script(1) unavailable: no pty allocator");
  if (spawnSync("stty", ["--version"], { encoding: "utf8" }).status !== 0) unavailable("stty unavailable: the pty cannot be resized");

  const settings = {
    workflowsEnabled: true,
    workbench: {
      workflowAgentBackend: "claude",
      model: process.env.INSPECTOR_RECEIPT_MODEL || "claude-sonnet-4-5",
      permissionMode: "dontAsk",
      settingSources: [],
      tools: [],
      // workbench:observe keeps the run observed; claude:transcript is the exact grant the claude evidence loader checks.
      capabilityGrants: ["workbench:observe", "claude:transcript"],
    },
  };

  // Credential LIVENESS, not env presence: one bounded turn through the compiled host.
  let preflight;
  {
    const probeCwd = makeScratch("6ze15-preflight-");
    scratch.push(probeCwd);
    const models = new Set();
    try {
      const { createClaudeWorkflowHost } = await import(pathToFileURL(join(repoRoot, "dist", "workbench", "claude-host.js")).href);
      const { runWorkflow } = await import(pathToFileURL(join(repoRoot, "dist", "workflow", "runtime.js")).href);
      const host = createClaudeWorkflowHost({
        cwd: probeCwd, model: settings.workbench.model, tools: [], settingSources: [], permissionMode: "dontAsk",
        onMessage: message => {
          const model = message?.message?.model;
          if (typeof model === "string") models.add(model);
        },
      });
      const script = 'export const meta={name:"6ze15-preflight",description:"one-turn credential probe"};\nreturn await agent("Reply with the single word ok.");';
      const timeout = new Promise(resolveTimeout => setTimeout(() => resolveTimeout({ status: "timeout" }), 120_000));
      const outcome = await Promise.race([runWorkflow({ script, host, concurrency: 1 }), timeout]);
      preflight = { requestedModel: settings.workbench.model, nativeModels: [...models], status: outcome.status, at: now() };
      if (outcome.status !== "completed" || models.size === 0) {
        unavailable(`claude-live credentials unusable: one-turn probe ${outcome.status}${outcome.error ? ` (${String(outcome.error).slice(0, 160)})` : ""}`, { preflight });
      }
    } catch (error) {
      unavailable(`claude-live probe failed: ${error instanceof Error ? error.message.slice(0, 200) : String(error)}`);
    }
  }

  // The disposable operator workspace: settings route workflows to the real Claude backend.
  const workspace = makeScratch("6ze15-ws-");
  scratch.push(workspace);
  mkdirSync(join(workspace, ".pi", "workflows"), { recursive: true });
  writeFileSync(join(workspace, ".pi", "subagents.json"), `${JSON.stringify(settings, null, 2)}\n`);
  writeFileSync(join(workspace, ".pi", "workflows", `${SAVED_WORKFLOW_NAME}.js`), savedWorkflowSource());
  // The pty capture lives in scratch: the receipt carries its sanitized readings, never the raw bytes.
  const work = makeScratch("6ze15-pty-");
  scratch.push(work);
  const capturePath = join(work, "inspector.capture.txt");
  const ttyFile = join(work, "pty.name");
  const taskRoot = join(sessionScratchRoot(), encodeCwd(workspace));
  const quote = text => `'${String(text).replace(/'/gu, "'\\''")}'`;

  const screen = createScreen(START_SIZE.cols, START_SIZE.rows);
  const decoder = new TextDecoder("utf-8");
  let captured = 0;
  let size = { ...START_SIZE };
  function pump() {
    let fd;
    try {
      fd = openSync(capturePath, "r");
    } catch {
      return;
    }
    try {
      const total = fstatSync(fd).size;
      if (total > captured) {
        const buffer = Buffer.alloc(total - captured);
        const read = readSync(fd, buffer, 0, buffer.length, captured);
        captured += read;
        feedScreen(screen, decoder.decode(buffer.subarray(0, read), { stream: true }));
      }
    } finally {
      closeSync(fd);
    }
  }
  const frameLines = () => screen.frame ?? [];
  const dense = lines => lines.join("").replace(/\s+/gu, "");
  const read = () => readInspectorFrame(frameLines(), size);

  const seenRows = new Map();
  function harvest(reading) {
    if (reading?.view === undefined) return;
    for (const row of reading.statusRows) {
      const key = `${row.view}|${row.glyph}|${row.freshness ?? ""}|${reading.status}|${row.text}`;
      if (!seenRows.has(key)) seenRows.set(key, { ...row, runStatus: reading.status });
    }
  }

  /** Poll until `test(reading, lines)` holds, recording WHEN the reader first saw it. */
  async function waitFor(test, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      pump();
      const lines = frameLines();
      const reading = readInspectorFrame(lines, size);
      harvest(reading);
      if (test(reading, lines)) return { at: now(), reading, lines };
      if (Date.now() >= deadline) return { at: undefined, reading, lines };
      await sleep(150);
    }
  }

  const launchAt = now();
  const inner = `stty cols ${START_SIZE.cols} rows ${START_SIZE.rows} && tty > ${quote(ttyFile)} && exec pi -e ${quote(distEntry)}`;
  const keyLog = [];
  const KEY_NAMES = new Map([["\t", "Tab"], ["\r", "Enter"], ["\u001B", "Esc"], ["\u001B[B", "Down"], ["j", "j"], ["k", "k"]]);
  const prompt = `Use the SubagentWorkflow tool to run the saved workflow named ${SAVED_WORKFLOW_NAME}. Reply with ONLY the returned taskId and nothing else. Do not wait for the workflow to finish.`;
  const commands = { pty: `script -qefc "${inner}" ${capturePath}`, piArgs: `-e ${distEntry}`, prompt, keys: keyLog };
  const child = spawn("script", ["-qefc", inner, capturePath], {
    cwd: workspace,
    env: { ...process.env, TERM: "xterm-256color" },
    stdio: ["pipe", "ignore", "pipe"],
  });
  const stderrChunks = [];
  child.stderr.on("data", chunk => stderrChunks.push(String(chunk)));
  const exited = new Promise(resolveExit => child.on("exit", code => resolveExit(code)));
  const send = text => {
    keyLog.push(KEY_NAMES.get(text) ?? (text === `${prompt}\r` ? "prompt+Enter" : text === "/quit\r" ? "/quit+Enter" : `${text.length} chars`));
    try {
      child.stdin.write(text);
    } catch {
      /* a closed pty is a measured outcome */
    }
  };
  async function quit() {
    // Esc steps the inspector back view by view and then closes it (reduceInspectorKey), so the editor owns /quit.
    for (let i = 0; i < 4; i += 1) {
      send("\u001B");
      await sleep(350);
    }
    send("/quit\r");
    const code = await Promise.race([exited, sleep(15_000).then(() => "timeout")]);
    if (code === "timeout") {
      try {
        child.kill("SIGKILL");
      } catch {
        /* already gone */
      }
      diagnostics.push("pi did not exit on /quit within 15s");
    }
  }

  const booted = await waitFor((_, lines) => lines.filter(line => line.trim() !== "").length >= 3 && !dense(lines).includes("Startupisstillinprogress"), 90_000);
  if (booted.at === undefined) {
    diagnostics.push(`pi never finished startup; stderr: ${stderrChunks.join("").slice(0, 300)}`);
    await quit();
    unavailable("pi TUI did not start", { pi: piVersion, preflight });
  }
  await sleep(2_000);

  send(`${prompt}\r`);
  const live = await waitFor((_, lines) => LIVE_CARD_RE.test(dense(lines)), 180_000);
  if (live.at === undefined) diagnostics.push("the run never rendered a live card");
  // Let the operator turn end so the keys reach the fleet list, not the turn.
  const idle = await waitFor((_, lines) => TASK_ID_RE.test(lines.join("\n")) && !dense(lines).includes("Working"), 60_000);
  if (idle.at === undefined) diagnostics.push("the operator turn had not ended before the fleet list was opened");

  // The explicit path from docs/10: fleet list (Down) -> workflow row (Enter) -> the run's dialog.
  let inspectorOpenedAt;
  for (const moves of [1, 0, 2]) {
    send("\u001B[B");
    await sleep(400);
    for (let i = 0; i < moves; i += 1) {
      send("\u001B[B");
      await sleep(250);
    }
    send("\r");
    // The legacy layout's own footer ("x stop" while the run is live), its Tab inspector line, or the inspector itself.
    const opened = await waitFor((reading, lines) => reading.legacyDialog === true || reading.view !== undefined || dense(lines).includes("xstop"), 3_000);
    if (opened.at !== undefined) {
      inspectorOpenedAt = opened.at;
      break;
    }
    send("\u001B");
    await sleep(400);
  }
  if (inspectorOpenedAt === undefined) diagnostics.push("the run's dialog never opened from the fleet list");
  // The dialog offers the rich inspector once the projection holds a row for the run.
  const offered = await waitFor((reading, lines) => reading.view !== undefined || lines.some(line => line.includes(LEGACY_HINT_TEXT)), 30_000);
  if (offered.at === undefined && inspectorOpenedAt !== undefined) diagnostics.push("the dialog never offered the rich inspector (no Tab inspector line)");

  // The four views, each by one Tab while the run executes.
  const views = [];
  for (const view of INSPECTOR_VIEWS) {
    const before = screen.frames;
    const keySentAt = now();
    if (view === "overview" && read().view === "overview") {
      // A run with no legacy rows shows the inspector at once, on its overview: that view needs no key.
      views.push({ view, keySentAt, seenAt: keySentAt, key: "none: the dialog opened on the inspector overview", frame: read() });
      continue;
    }
    send("\t");
    const shown = await waitFor(reading => screen.frames > before && reading.view === view, 6_000);
    let frame = shown.reading;
    if (view === "overview" && shown.at !== undefined && !(frame.total >= 2)) {
      // Phase one runs two agents: the views are read once the projection holds both, so a view of one row proves less.
      const fuller = await waitFor(reading => reading.view === "overview" && reading.total >= 2, 45_000);
      if (fuller.at === undefined) diagnostics.push("overview: the projection never held a second row within 45s");
      frame = fuller.reading;
    }
    views.push({ view, keySentAt, ...(shown.at !== undefined ? { seenAt: shown.at } : {}), frame });
    if (shown.at === undefined) diagnostics.push(`${view}: its header never rendered after the Tab (last frame view ${shown.reading.view ?? "none"})`);
  }

  // A native row: j until the details view names a native provider.
  const selection = { keys: 0, moves: [] };
  {
    let reading = read();
    // Key navigation, measured: one j in the details view and the row it reached (docs/10 Navigation: j/k or arrow move).
    if (reading.view === "details" && reading.total >= 2) {
      const from = { position: reading.position, nativeRef: reading.nativeRef };
      selection.sentAt = now();
      send("j");
      selection.keys += 1;
      reading = (await waitFor(next => next.view === "details" && next.position !== from.position, 2_000)).reading;
      selection.moves.push({ key: "j", from, to: { position: reading.position, nativeRef: reading.nativeRef } });
    }
    const limit = Math.max(1, Math.min(RELATION_PAGE, reading.total ?? 1));
    // Down through the rows first, then back up: a native row is wherever the projection lists it.
    for (const key of ["j", "k"]) {
      let pressed = 0;
      while (reading.view === "details" && !isNativeProvider(reading.provider) && pressed < limit) {
        if (selection.sentAt === undefined) selection.sentAt = now();
        const before = reading.position;
        send(key);
        pressed += 1;
        selection.keys += 1;
        reading = (await waitFor(next => next.view === "details" && next.position !== before, 1_500)).reading;
        if (reading.position === before) break;
      }
    }
    if (isNativeProvider(reading.provider)) {
      selection.seenAt = now();
      selection.nativeRef = reading.nativeRef;
      selection.provider = reading.provider;
    } else if (reading.provider !== undefined) selection.provider = reading.provider;
  }

  // Evidence on focus: the selected reference before any request, then Enter, then the outcome the details view draws.
  const evidence = { attempts: [] };
  if (isNativeProvider(selection.provider)) {
    const ref = await waitFor(next => next.view === "details" && next.evidence !== undefined, 30_000);
    if (ref.at === undefined) diagnostics.push("the selected native row listed no evidence reference within 30s");
    evidence.refs = ref.reading.evidenceRefs ?? 0;
    if (ref.reading.evidence !== undefined) evidence.before = ref.reading.evidence;
    const attempt = async () => {
      const before = read().evidence;
      const entry = { sentAt: now(), ...(before !== undefined ? { before } : {}) };
      send("\r");
      const settled = await waitFor(next => next.view === "details" && (next.evidence?.state === "loaded" || next.evidence?.state === "unavailable"), 20_000);
      if (settled.at !== undefined) entry.seenAt = settled.at;
      entry.outcome = settled.reading.evidence?.state ?? "absent";
      if (settled.reading.evidence?.ref !== undefined) entry.ref = settled.reading.evidence.ref;
      if (settled.reading.evidence?.bytes !== undefined) entry.bytes = settled.reading.evidence.bytes;
      if (settled.reading.evidence?.reason !== undefined) entry.reason = settled.reading.evidence.reason;
      evidence.attempts.push(entry);
      return entry;
    };
    if (ref.reading.evidence !== undefined) {
      const first = await attempt();
      if (first.outcome !== "loaded") {
        // A live message may not be readable yet: once this node settles, its final message is focused and requested once more.
        const settledNode = await waitFor(next => next.view === "details" && next.nodeStatus !== undefined && next.nodeStatus.tone !== "active" && next.evidence !== undefined, 180_000);
        if (settledNode.at === undefined) diagnostics.push("the selected node did not settle within 180s for the second evidence request");
        await attempt();
      }
    }
  }

  // The responsive check: the pty resized to 80x24 while the details view is open.
  const resize = { from: { ...size }, to: { ...RESPONSIVE_SIZE }, overflowAfter: 0, cycle: [] };
  {
    let pts;
    try {
      pts = readFileSync(ttyFile, "utf8").trim();
    } catch {
      diagnostics.push("the pty name was not recorded; the resize was not sent");
    }
    if (pts) {
      pump();
      const overflowBefore = screen.overflow;
      const before = screen.frames;
      resizeScreen(screen, RESPONSIVE_SIZE.cols, RESPONSIVE_SIZE.rows);
      size = { ...RESPONSIVE_SIZE };
      resize.sentAt = now();
      const stty = spawnSync("stty", ["-F", pts, "cols", String(RESPONSIVE_SIZE.cols), "rows", String(RESPONSIVE_SIZE.rows)], { encoding: "utf8" });
      if (stty.status !== 0) diagnostics.push(`stty resize failed: ${String(stty.stderr).slice(0, 160)}`);
      const measured = spawnSync("stty", ["-F", pts, "size"], { encoding: "utf8" });
      resize.ptySize = String(measured.stdout).trim();
      const shown = await waitFor(next => screen.frames > before + 1 && next.view !== undefined, 8_000);
      await sleep(1_000);
      pump();
      const reading = read();
      harvest(reading);
      if (shown.at !== undefined) resize.seenAt = shown.at;
      resize.frame = reading;
      // Every view once more at 80x24: Tab from details wraps to the overview and comes back round to details.
      for (const view of [...INSPECTOR_VIEWS.slice(INSPECTOR_VIEWS.indexOf(reading.view ?? "details") + 1), ...INSPECTOR_VIEWS.slice(0, INSPECTOR_VIEWS.indexOf(reading.view ?? "details") + 1)]) {
        const frames = screen.frames;
        send("\t");
        const next = await waitFor(candidate => screen.frames > frames && candidate.view === view, 6_000);
        resize.cycle.push(next.reading);
        if (next.at === undefined) diagnostics.push(`80x24 ${view}: its header never rendered after the Tab (last frame view ${next.reading.view ?? "none"})`);
      }
      resize.overflowAfter = Math.max(0, screen.overflow - overflowBefore);
    }
  }

  const final = read();
  const settledSeenAt = final.view !== undefined && !LIVE_STATUSES.includes(final.status) ? now() : undefined;
  await quit();
  pump();
  const runDirs = (() => {
    try {
      return existsSync(taskRoot);
    } catch {
      return false;
    }
  })();
  if (!runDirs) diagnostics.push("no run artifacts under the harness workspace's task root");

  const journey = {
    captureRef: capturePath,
    captureBytes: captured,
    framesReplayed: screen.frames,
    start: START_SIZE,
    launchAt,
    ...(live.at !== undefined ? { liveAt: live.at } : {}),
    ...(inspectorOpenedAt !== undefined ? { inspectorOpenedAt } : {}),
    ...(settledSeenAt !== undefined ? { settledSeenAt } : {}),
    views,
    selection,
    evidence,
    resize,
    rows: [...seenRows.values()],
  };
  finish(buildInspectorReceipt({ ...hostFacts, pi: piVersion, settings, preflight, commands, journey, diagnostics }, { sanitize }));
}

// Only the process's own entry module runs the journey (gate refusal #1 F4: a basename match of argv[1] ran main() when another
// entry point imported this module with its path as argv[1], as `node -e '...' <this path>` does). import.meta.main answers that
// exactly (Node >= 24.2; vitest's module runner sets it false); a runtime without it keeps the basename check.
const invokedDirectly = (() => {
  if (typeof import.meta.main === "boolean") return import.meta.main;
  if (typeof process === "undefined" || !process.argv?.[1]) return false;
  return import.meta.url.endsWith(process.argv[1].split("/").pop() ?? "\u0000");
})();

if (invokedDirectly) {
  main().catch(async error => {
    // A crash still prints a typed receipt, never a missing one that reads as "not run"; its text passes the same shared helper.
    const message = error instanceof Error ? error.message : String(error);
    console.error(error instanceof Error ? (error.stack ?? message) : message);
    let sanitize;
    try {
      ({ sanitizeWorkbenchText: sanitize } = await import(new URL("../../dist/workbench/redaction.js", import.meta.url).href));
    } catch {
      sanitize = undefined;
    }
    const receipt = buildInspectorReceipt({
      utc: new Date().toISOString(), revision: "unknown", node: process.version, platform: process.platform, arch: process.arch,
      journey: {}, diagnostics: [], unavailability: `harness crash: ${message.slice(0, 200)}`,
    }, { sanitize });
    console.log(JSON.stringify(receipt));
    process.exit(2);
  });
}
