import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Lexer, Marked } from "marked";
import { describe, expect, it } from "vitest";

// wb-2t2 acceptance: "docs quote the receipt; no src change without an owner
// ruling; TRACEABILITY row cites wb-a2g.3." Scope (A): docs/15 + docs/10 state
// the measured behavior and the explicit cancel path. Scope (B) landed at
// 4c5744d (fleet-list inactive footer names the stop path); the docs state it.
//
// PIN RULE (owner ruling 2026-10-16T14:21Z R1=(a); gate-1 2026-10-16T23:58Z U1):
// every docs pin is SLICE EQUALITY of a section of the view below, never token
// presence. A pinned section is located by its committed heading line in the
// view; before anything is sliced, that heading must be the only heading the
// view could show with its text (HEADING KEY below). The slice runs from the
// heading through the line before the next level-1/2 ATX heading, or EOF (the
// docs/15 VC-1 block also ends at the next `**VC-<n>:` label), and is compared
// by strict equality with the committed text below. The same view serves the
// uniqueness check and the extraction. The ONLY normalization: trailing
// spaces, tabs and carriage returns are trimmed from each line, runs of blank
// lines collapse to one, and leading and trailing blank lines are dropped.
//
// PAGE CHECK (owner ruling 2026-10-17T04:46Z on gate-1 row 403, R1=(b): the
// renderer-verified cure, closed by construction). marked 18.0.11, pinned
// exactly as a devDependency, lexes the whole document as the page renders it
// (GFM). The view below is refused, so every pin goes red, when marked reports
// an html token, block or inline, whose raw is not exactly one complete
// comment: `<!--` through the first point a browser ends it (`-->`, `--!>`, or
// the abrupt `<!-->` and `<!--->`), with only spaces, tabs and line breaks
// around it. It is refused too (C3, strengthened) when marked reports a link
// reference definition: the page shows none of a definition's lines, and
// marked lets its title or label run over line breaks, a heading line included
// (measured below), with no html token to show it. Today's three docs produce
// 0 html tokens and 0 link reference definitions (asserted below). The gate-1
// battery of record (row 403: 8 controls, 24 falsifiers) is folded in below as
// a negative-control table.
//
// VIEW MODEL (gate-1 2026-10-17T02:22Z U1/U3/U4 and row 403 C1-C6;
// roster-style, fail-closed; the roster view runs first and the page check
// gates what it accepts). The view is the source split into lines at LF, CRLF
// or a lone CR (the CommonMark line endings). It resolves only the constructs
// on this roster:
// - ``` fenced code opened at column 0 is visible code: its lines are never a
//   heading, a comment or a section end. It closes at a line of 0-3 spaces, at
//   least as many backticks, any further backticks or tildes, then spaces
//   (marked's closing fence), and an unterminated fence runs to EOF;
// - an HTML comment is hidden. An opener at the start of a line begins an HTML
//   block that ends at the first later `-->`, and with none it hides everything
//   to EOF (the page check refuses that document). Any other opener must close
//   on its own line;
// - a code span that closes on its own line (in a GFM table row, inside its
//   cell), a backslash escape and an autolink in marked's grammar stay
//   verbatim as visible text.
// All other text stays verbatim as visible text, except that the model REFUSES
// the whole document (no slice, so every pin goes red) when, outside fenced
// code, comments and code spans, it meets:
// - a `<` followed by an ASCII letter, `/`, `!` or `?` that does not begin a
//   comment or an autolink: any start of raw HTML, whether or not the tag
//   closes on its line (`<div hidden>`, `<details`, `<style` or `<script` can
//   hide text that is not inside it);
// - a backtick string that does not close on its own line (marked pairs it
//   across the line break, which moves the code span boundaries and so which
//   `<` is code);
// - an HTML comment whose text holds `--!>` (a browser ends the comment there,
//   marked does not);
// - a ~~~ fence (marked renders it as code);
// - C1: anything but spaces and tabs after a comment's closing `-->` on its
//   line, block or inline (marked's comment HTML block runs to the end of that
//   line, so the rest of it is raw HTML, not markdown); a rest of line that
//   holds a refused construct of its own, such as raw HTML, is refused as that;
// - C2: an inline `<!--` that does not close on its own line;
// - C3: a backtick or `<` inside a link or image destination or title, or in a
//   link reference definition's (marked consumes the backtick in the link, so
//   it pairs no code span);
// - C4: a backtick inside a whitespace-delimited token from a GFM extended
//   autolink prefix (`www.` or `<scheme>://`), or inside a `<...>` autolink
//   candidate (autolinks follow marked's grammar, which admits no control
//   octet);
// - C5: in a GFM table row, a cell (split at each `|` no backslash escapes, as
//   marked splits a row before inline parsing) whose backticks do not pair
//   inside the cell;
// - C6: a fence opener that is not at column 0: indented, or inside a list or
//   block quote container.
// It also refuses a bidirectional control code point anywhere in a line it
// shows outside fenced code (the page would show that line in another order
// than the source).
// SCOPE (gate-1 row 403 U3, measured): the roster alone does not establish that
// no line the view shows sits inside raw HTML in the page. Three gate cycles
// measured renderer-authored shapes that keep a roster member green while
// marked emits raw HTML (comment-end lines, link destinations and titles, GFM
// autolinks, autolink precedence, table cells, container fences). The page
// check closes that class by construction: a document the pins accept holds
// no raw HTML but complete comments and no link reference definition, and
// under C1 and C2 each comment the view hides is the span marked hides.
// DIRECTION: the view hides only comment text: a complete comment, or a
// line-start comment left open to EOF (which the page check refuses). The page
// hides the same text, except a comment inside indented code, which it shows
// as code; neither can hold a heading or label the page shows, so the view
// never hides one, and the uniqueness counts see every duplicate the page
// shows. It keeps as plain visible text what the page does not show (markup
// characters, link destinations and titles, character references) or shows as
// code (indented code), and it refuses some documents the page reads correctly
// (the battery controls K3 and K4). Showing what the page hides is fail-closed
// for the uniqueness counts, but fail-open for a pin's own text if the page
// hides the pinned lines inside a construct the view shows as text: raw HTML
// other than a complete comment and a link reference definition can hide any
// line, a heading included, and the page check refuses both; a link or image
// hides text only inside one paragraph, which a pinned ATX heading interrupts
// and which ends at the docs/15 VC-1 label (the list under it interrupts it),
// so it can hide a pinned line only by changing the slice. The view is not a
// renderer: no hiding construct outside these is claimed closed.
//
// HEADING KEY (gate-1 2026-10-17T02:22Z U2, route (a): a folded key; route (b),
// "any non-ASCII code point in a heading-form line refuses", is not taken: the
// docs/10 and docs/15 title headings carry an em dash, so it would refuse
// today's text). The headings the view could show are counted over:
// - heading-like lines: after any run of leading whitespace, block quote `>`
//   markers and list markers, an ATX opener (1-6 `#` then a space, a tab or
//   the line end); and, above each setext underline (a line of `=` or `-`
//   after whitespace and `>` markers), every run of the non-blank lines that
//   ends just above it, joined by spaces. This over-approximates headings at
//   every container depth; it also counts lines marked shows as indented code;
// - the text of each (ATX markup and closing sequence removed), decoded as the
//   page shows it and folded as a reader sees it: inline link and image
//   syntax is dropped (`![`, `[`, `]` and the destination or label right after
//   a `]`, so an empty link or image counts as nothing), backslash escapes and
//   numeric character references are decoded, NFKC is applied, and every run
//   of Unicode white space becomes one space, trimmed. The folded text
//   matches the pinned title (printable ASCII) character by character, except
//   that an unescaped `*`, `_`, `~` or backtick (emphasis, strikethrough and
//   code span markup can wrap nothing visible) matches any 0-1 characters, a
//   named character reference matches any 0-3, a format, control, combining
//   or default-ignorable code point matches any 0-1, and any other non-ASCII
//   code point matches any 1-3 (a wildcard skeleton: every non-ASCII
//   look-alike of an ASCII title counts). ASCII look-alikes (`I` for `l`, `rn`
//   for `m`) are not folded and do not count.
// The docs/15 VC-1 label counts the same way, over every view line whose folded
// text, after container markers, an ATX opener and leading `*` or `_`, begins
// with `VC-1:`.

const repo = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function read(path: string): string {
  return readFileSync(join(repo, path), "utf8");
}

const DOC_15 = "docs/workbench/15-implementation-program.md";
const DOC_10 = "docs/workbench/10-terminal-inspector.md";
const TRACE = "docs/workbench/TRACEABILITY.md";
const FLEET_LIST = "src/ui/fleet-list.ts";

const VC1_LABEL = "**VC-1: Pi -> Claude SDK workflow** (P0)";
const DOC_10_HEADING = "## Cancelling a background workflow";
const TRACE_2T2_HEADING = "## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)";
const TRACE_A2G3_HEADING = "## VC-1 residual: live terminal operator acceptance receipt (wb-a2g.3)";
const FOOTER = "esc to interrupt · ← for agents · ↓ to manage or stop a workflow";
const V2_RECEIPT_PATH = "qa/workbench/receipts/wb-a2g.3-operator-receipt.json";

/** The committed docs/15 VC-1 block. */
const DOC_15_VC1_BLOCK = [
  "**VC-1: Pi -> Claude SDK workflow** (P0)",
  "- Keep Pi extension loaded, /agents and legacy workflow interaction working.",
  "- Forked WorkflowHost uses actual Claude Agent SDK for agent(), streaming/session refs; legacy script fixtures unchanged.",
  "- Terminal card displays live actual Claude execution. An explicit test asserts Pi AgentManager is not called for script agent().",
  "- Ctrl-C/cancel and invalid model/permission failures behave explicitly.",
  "  - Measured Ctrl-C behavior (wb-a2g.3 live operator receipt, contract v2, iteration 9, pi 1.2.0, rev e07474a, committed at `qa/workbench/receipts/wb-a2g.3-operator-receipt.json`): a Ctrl-C byte sent through the pty while a SubagentWorkflow run is live has no effect on the background workflow (native session 361ea747 seen 22:36:54.474Z, Ctrl-C 22:36:54.974Z, `ctrlCStoppedWorkflow:false`, 2.5s window). Pi's turn interrupt key is Esc (widget footer 'esc to interrupt'), and a background run is not tied to the turn.",
  "  - The explicit cancel path is the fleet list (Down) -> workflow row (Enter) -> dialog `x stop` (`src/ui/workflow-dialog.ts` kind `kill` -> `onKill` aborts the run controller; the menu notifies 'Stopped workflow'). Docs/10 section \"Cancelling a background workflow\" repeats this.",
  "  - In-flight cancel hint (wb-2t2 scope B, landed at `4c5744d`): while a roster workflow is running or paused, the fleet-list inactive footer reads 'esc to interrupt · ← for agents · ↓ to manage or stop a workflow' (`src/ui/fleet-list.ts`). No new keybinding was added; a prompt-level kill gesture is not part of this slice.",
  "- Success proof: real Claude SDK script with parallel agents and structured schema, inspected in Pi.",
].join("\n");

/** The committed docs/10 "Cancelling a background workflow" section. */
const DOC_10_SECTION = [
  "## Cancelling a background workflow",
  "",
  "Measured by the wb-a2g.3 live operator receipt, contract v2 (iteration 9, pi 1.2.0, rev e07474a, committed at `qa/workbench/receipts/wb-a2g.3-operator-receipt.json`): a Ctrl-C byte sent through the pty while a SubagentWorkflow run is live has no effect on the background workflow (native session 361ea747 seen 22:36:54.474Z, Ctrl-C 22:36:54.974Z, `ctrlCStoppedWorkflow:false`, 2.5s window). Pi's turn interrupt key is Esc (widget footer 'esc to interrupt'); a background run is not tied to the turn, so neither key stops it. The explicit cancel is the fleet list (Down) -> workflow row (Enter) -> dialog `x stop` (`src/ui/workflow-dialog.ts` kind `kill` -> `onKill` aborts the run controller, then the menu notifies 'Stopped workflow'). While a roster workflow is running or paused the fleet-list inactive footer names this path: 'esc to interrupt · ← for agents · ↓ to manage or stop a workflow' (wb-2t2 scope B, landed at `4c5744d`, `src/ui/fleet-list.ts`); no new keybinding was added.",
].join("\n");

/** The committed TRACEABILITY wb-2t2 section. */
const TRACE_2T2_SECTION = [
  "## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)",
  "",
  "The wb-a2g.3 live operator receipt, contract v2 (re-run of record: iteration 9, 2026-10-15, pi 1.2.0, rev `e07474a`, committed at `qa/workbench/receipts/wb-a2g.3-operator-receipt.json`), measured that a Ctrl-C byte through the pty has no effect on a live background workflow: native session `361ea747-92e7-4dd4-ba0a-dc01b4036a6e` was seen at 22:36:54.474Z, the Ctrl-C went through the pty at 22:36:54.974Z (`ctrlCStoppedWorkflow: false`, 2.5s window), and only the explicit cancel at 22:36:58.814Z, acknowledged at 22:37:02.147Z, stopped the run. Pi's turn interrupt is Esc and the run is not tied to the turn. The explicit cancel path is the fleet list -> workflow row -> dialog `x stop` (`src/ui/workflow-dialog.ts` kind `kill`, `src/ui/workflow-menu.ts` 'Stopped workflow'). Scope B landed at `4c5744d`: while a roster workflow is running or paused the fleet-list inactive footer reads 'esc to interrupt · ← for agents · ↓ to manage or stop a workflow' (`src/ui/fleet-list.ts`); no new keybinding was added. The earlier v1 iteration data is superseded by the wb-h7r correction above and is not cited. Docs only: docs/workbench/15 VC-1 and docs/workbench/10 \"Cancelling a background workflow\" state this, pinned by `test/workbench-docs-cancel-path.test.ts`, which also asserts the cited src hooks still exist and that the wb-h7r correction marker stays inside the wb-a2g.3 section.",
].join("\n");

/** The wb-h7r correction marker of record, one whole line of the wb-a2g.3 section. */
const H7R_MARKER = "SUPERSEDED (wb-h7r): the cancellation claims of this paragraph were unevidenced — see \"CORRECTION (wb-h7r): the wb-a2g.3 operator receipt, contract v2\" below, which replaces them; the completion-journey facts above stand and are re-measured there.";

/** The opening of the wb-a2g.3 receipt paragraph the marker corrects (its "this paragraph"). */
const A2G3_PARAGRAPH_OPENING = "`node qa/workbench/live-operator-receipt.mjs` drove a REAL `pi` 1.2.0 terminal session";

/** The superseded v1 iteration data (wb-h7r): never cited by a pinned slice. */
const V1_TOKENS = ["f63fd79", "22.8s", "iterations 3-5"];

/** The CommonMark line endings: LF, CRLF and a lone CR. */
const LINE_END = /\r\n|\n|\r/;

/** `text` with every line ending written as LF, so LF anchors address a CRLF checkout too. */
function lf(text: string): string {
  return text.split(LINE_END).join("\n");
}

/** A throwaway copy of `doc` with its one occurrence of `anchor` replaced; the anchor must occur exactly once. */
function withOnce(doc: string, anchor: string, replacement: string): string {
  expect(doc.split(anchor), `anchor occurs once: ${anchor.slice(0, 48)}`).toHaveLength(2);
  return doc.replace(anchor, () => replacement);
}

/** A throwaway copy of `doc` with `tail` appended after one blank line at EOF. */
function withTail(doc: string, tail: string): string {
  return `${doc.replace(/\n*$/, "")}\n\n${tail}\n`;
}

/** Each pinned opener with the start of the text under it: unique in its doc, and still unique after a look-alike duplicate is appended. */
const TRACE_2T2_ANCHOR = `\n\n${TRACE_2T2_HEADING}\n\nThe wb-a2g.3 live operator receipt`;
const DOC_10_ANCHOR = `\n\n${DOC_10_HEADING}\n\nMeasured by the wb-a2g.3 live operator receipt`;
const VC1_ANCHOR = `\n\n${VC1_LABEL}\n- Keep Pi extension loaded`;

interface ViewLine {
  readonly text: string;
  readonly code: boolean;
}

type View = { readonly ok: true; readonly lines: readonly ViewLine[] } | { readonly ok: false; readonly reason: string };

/** A fence opens only at column 0 (C6), and a backtick fence's info string holds no backtick (marked's rule). */
const FENCE_OPEN = /^(`{3,})[^`]*$/;
/** marked's closing fence: 0-3 spaces, at least the opener's backticks, any further backticks or tildes, then spaces only. */
const FENCE_CLOSE = /^ {0,3}(`{3,})[~`]* *$/;
const TILDE_FENCE = /^ {0,3}~{3,}/;
const TILDE_RUN = /^~{3,}/;
const BLOCK_COMMENT = /^ {0,3}<!--/;
const TAG_START = /^<[A-Za-z/!?]/;
/** marked 18.0.11's own autolink grammar: a URI or an email address between `<` and `>`, no control octet (C4). */
const AUTOLINK = Lexer.rules.inline.gfm.autolink;
/** What a `<...>` autolink could be: text between `<` and `>` with no white space and no other angle bracket (C4). */
const AUTOLINK_CANDIDATE = /^<[^\s<>]*>/;
/** marked 18.0.11's own inline link and image grammar (destination in group 2, title in group 3) and link reference definition grammar (C3). */
const LINK = Lexer.rules.inline.gfm.link;
const DEFINITION = Lexer.rules.block.gfm.def;
/** A GFM extended autolink starts at `www.`, or at a scheme followed by `://` (C4). */
const WWW_PREFIX = /www\./iy;
const SCHEME_PREFIX = /[A-Za-z][A-Za-z0-9+.-]*:\/\//y;
const SCHEME_CHARACTER = /^[A-Za-z0-9+.-]$/;
const ASCII_LETTER = /^[A-Za-z]$/;
const TOKEN = /\S+/y;
/** marked's GFM table delimiter row; the line above it is the table's header (C5). */
const TABLE_DELIMITER = /^(?:\| *)?:?-+:? *(?:\| *:?-+:? *)*(?:\| *)?$/;
const TABLE_DELIMITER_MARK = /[:|]/;
const CODE_OR_TAG = /[`<]/;
const BLANK = /^[ \t]*$/;
const ASCII_PUNCTUATION = /^[!-/:-@[-`{-~]$/;
/** A browser also ends an HTML comment at `--!>`; marked and this view end it only at `-->`. */
const BANG_CLOSE = "--!>";
const BANG_REFUSAL = `a comment holding ${BANG_CLOSE} is not modelled`;
/** A bidirectional control makes the page show text in another order than the source. */
const BIDI_CONTROL = /\p{Bidi_Control}/u;
/** The roster refusals of the gate-1 row 403 cure (C1-C6), each named in its reason. */
const C1_REFUSAL = "text after a comment's closing --> on its line is not modelled (C1)";
const C2_REFUSAL = "an inline comment that does not close on its own line is not modelled (C2)";
const C3_REFUSAL = "a backtick or < in a link destination, title or reference definition is not modelled (C3)";
const C4_REFUSAL = "a backtick in an autolink or a GFM extended autolink is not modelled (C4)";
const C5_REFUSAL = "a table cell whose backticks do not pair inside the cell is not modelled (C5)";
const C6_REFUSAL = "a fence opener that is not at column 0 is not modelled (C6)";

/** Index of the next run of exactly `run` backticks at or after `from`, or -1. */
function closingRun(text: string, from: number, run: number): number {
  let index = from;
  while (index < text.length) {
    if (text[index] !== "`") {
      index++;
      continue;
    }
    let length = 1;
    while (text[index + length] === "`") length++;
    if (length === run) return index;
    index += length;
  }
  return -1;
}

interface InlineScan {
  readonly visible: string;
  readonly refusal: string | null;
}

/** True when `part` (a link destination or title, as marked's grammar captures it) holds a backtick or a `<` (C3). */
function holdsCodeOrTag(part: string | undefined): boolean {
  return part !== undefined && CODE_OR_TAG.test(part);
}

/** True when a GFM extended autolink can start at `index`: `www.` anywhere, or a scheme and `://` where a scheme-like run starts (C4). */
function extendedAutolinkAt(text: string, index: number): boolean {
  WWW_PREFIX.lastIndex = index;
  if (WWW_PREFIX.test(text)) return true;
  if (SCHEME_CHARACTER.test(text[index - 1] ?? "")) return false;
  SCHEME_PREFIX.lastIndex = index;
  return SCHEME_PREFIX.test(text);
}

/**
 * Visible text of one line outside fenced code and block comments (code spans, escapes, inline comments, links,
 * autolinks), or the refusal. `continuation` returns the rest of the paragraph, since marked's link grammar may span lines.
 */
function scanInline(segment: string, continuation: () => string): InlineScan {
  let visible = "";
  let index = 0;
  while (index < segment.length) {
    const char = segment[index] ?? "";
    if (char === "\\" && ASCII_PUNCTUATION.test(segment[index + 1] ?? "")) {
      visible += segment.slice(index, index + 2);
      index += 2;
      continue;
    }
    if (char === "`") {
      let run = 1;
      while (segment[index + run] === "`") run++;
      const close = closingRun(segment, index + run, run);
      if (close < 0) return { visible, refusal: `a code span that does not close on its line is not modelled: ${segment.slice(index, index + 32)}` };
      visible += segment.slice(index, close + run);
      index = close + run;
      continue;
    }
    if (segment.startsWith("<!--", index)) {
      const close = segment.indexOf("-->", index + 2);
      if (close < 0) return { visible, refusal: `${C2_REFUSAL}: ${segment.slice(index, index + 32)}` };
      if (segment.slice(index + 4, close).includes(BANG_CLOSE)) return { visible, refusal: BANG_REFUSAL };
      if (!BLANK.test(segment.slice(close + 3))) return { visible, refusal: commentTailRefusal(segment.slice(close + 3), segment.slice(close, close + 32), continuation) };
      index = close + 3;
      continue;
    }
    if (char === "<") {
      const rest = segment.slice(index);
      const link = AUTOLINK.exec(rest)?.[0];
      const candidate = link ?? AUTOLINK_CANDIDATE.exec(rest)?.[0];
      if (candidate?.includes("`")) return { visible, refusal: `${C4_REFUSAL}: ${candidate.slice(0, 32)}` };
      if (link !== undefined) {
        visible += link;
        index += link.length;
        continue;
      }
      if (TAG_START.test(rest)) return { visible, refusal: `raw HTML is not modelled: ${rest.slice(0, 32)}` };
    }
    if (char === "[") {
      const link = LINK.exec(`${segment.slice(index)}${continuation()}`);
      if (link !== null && (holdsCodeOrTag(link[2]) || holdsCodeOrTag(link[3]))) return { visible, refusal: `${C3_REFUSAL}: ${link[0].slice(0, 32)}` };
    }
    if (ASCII_LETTER.test(char) && extendedAutolinkAt(segment, index)) {
      TOKEN.lastIndex = index;
      const token = TOKEN.exec(segment)?.[0] ?? "";
      if (token.includes("`")) return { visible, refusal: `${C4_REFUSAL}: ${token.slice(0, 32)}` };
    }
    visible += char;
    index++;
  }
  return { visible, refusal: null };
}

/**
 * C1's refusal for the non-blank `tail` after a comment's closing `-->` on its line (`at` quotes the source from `-->`):
 * the refusal the tail itself gives when it holds one, so raw HTML after `-->` is named as raw HTML; else C1.
 */
function commentTailRefusal(tail: string, at: string, continuation: () => string): string {
  return scanInline(tail, continuation).refusal ?? `${C1_REFUSAL}: ${at}`;
}

/** The source lines after `index` up to the next blank line, each after a line feed: the rest of a paragraph, for marked's multi-line grammars. */
function paragraphAfter(source: readonly string[], index: number): string {
  let rest = "";
  for (let next = index + 1; next < source.length; next++) {
    const line = source[next] ?? "";
    if (BLANK.test(line)) break;
    rest += `\n${line}`;
  }
  return rest;
}

/** Source line indexes inside a GFM table: a header line, a delimiter row holding `|` or `:`, and every line under it to a blank line (never fewer than marked's table). */
function tableLines(source: readonly string[]): ReadonlySet<number> {
  const rows = new Set<number>();
  for (let index = 0; index + 1 < source.length; index++) {
    const delimiter = containerFree(source[index + 1] ?? "");
    if (containerFree(source[index] ?? "") === "" || !TABLE_DELIMITER.test(delimiter) || !TABLE_DELIMITER_MARK.test(delimiter)) continue;
    for (let row = index; row < source.length && !BLANK.test(source[row] ?? ""); row++) rows.add(row);
  }
  return rows;
}

/** The cells of a GFM table row: split at every `|` that no backslash escapes, as marked splits a row before parsing its cells. */
function tableCells(row: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let index = 0;
  while (index < row.length) {
    const char = row[index] ?? "";
    if (char === "\\") {
      cell += row.slice(index, index + 2);
      index += 2;
      continue;
    }
    if (char === "|") cells.push(cell);
    cell = char === "|" ? "" : cell + char;
    index++;
  }
  cells.push(cell);
  return cells;
}

/** True when every backtick string in a table cell closes inside the cell (C5); backslash escapes as in the view. */
function pairsInCell(cell: string): boolean {
  let index = 0;
  while (index < cell.length) {
    if (cell[index] === "\\" && ASCII_PUNCTUATION.test(cell[index + 1] ?? "")) {
      index += 2;
      continue;
    }
    if (cell[index] !== "`") {
      index++;
      continue;
    }
    let run = 1;
    while (cell[index + run] === "`") run++;
    const close = closingRun(cell, index + run, run);
    if (close < 0) return false;
    index = close + run;
  }
  return true;
}

/** The roster view of a markdown document under the VIEW MODEL above, or the reason the roster refuses it. The pins read pageView. */
function renderView(markdown: string): View {
  const source = markdown.split(LINE_END);
  const tables = tableLines(source);
  const lines: ViewLine[] = [];
  let fence = 0;
  let comment: string | null = null;
  for (const [index, line] of source.entries()) {
    if (fence > 0) {
      lines.push({ text: line, code: true });
      const close = FENCE_CLOSE.exec(line)?.[1] ?? "";
      if (close.length >= fence) fence = 0;
      continue;
    }
    let prefix = "";
    let segment = line;
    if (comment !== null) {
      const close = line.indexOf("-->");
      if (close < 0) {
        comment += `\n${line}`;
        continue;
      }
      if (`${comment}\n${line.slice(0, close)}`.includes(BANG_CLOSE)) return { ok: false, reason: BANG_REFUSAL };
      comment = null;
      segment = line.slice(close + 3);
      if (!BLANK.test(segment)) return { ok: false, reason: commentTailRefusal(segment, line.slice(close, close + 32), () => paragraphAfter(source, index)) };
    } else {
      const open = FENCE_OPEN.exec(line)?.[1];
      if (open !== undefined) {
        fence = open.length;
        lines.push({ text: line, code: true });
        continue;
      }
      if (TILDE_FENCE.test(line)) return { ok: false, reason: "a ~~~ fence is not modelled" };
      const inner = containerFree(line);
      if (inner !== line && (FENCE_OPEN.test(inner) || TILDE_RUN.test(inner))) return { ok: false, reason: `${C6_REFUSAL}: ${line.slice(0, 32)}` };
      if (inner.startsWith("[")) {
        const definition = DEFINITION.exec(`${inner}${paragraphAfter(source, index)}`);
        if (definition !== null && (holdsCodeOrTag(definition[2]) || holdsCodeOrTag(definition[3]))) return { ok: false, reason: `${C3_REFUSAL}: ${line.slice(0, 32)}` };
      }
      if (tables.has(index) && !tableCells(line).every(pairsInCell)) return { ok: false, reason: `${C5_REFUSAL}: ${line.slice(0, 32)}` };
      if (BLOCK_COMMENT.test(line)) {
        const opener = line.indexOf("<!--");
        const close = line.indexOf("-->", opener + 2);
        prefix = line.slice(0, opener);
        if (close < 0) {
          comment = line.slice(opener + 4);
          lines.push({ text: prefix, code: false });
          continue;
        }
        if (line.slice(opener + 4, close).includes(BANG_CLOSE)) return { ok: false, reason: BANG_REFUSAL };
        segment = line.slice(close + 3);
        if (!BLANK.test(segment)) return { ok: false, reason: commentTailRefusal(segment, line.slice(close, close + 32), () => paragraphAfter(source, index)) };
      }
    }
    const scan = scanInline(segment, () => paragraphAfter(source, index));
    if (scan.refusal !== null) return { ok: false, reason: scan.refusal };
    if (BIDI_CONTROL.test(prefix + scan.visible)) return { ok: false, reason: "a bidirectional control is not modelled" };
    lines.push({ text: prefix + scan.visible, code: false });
  }
  return { ok: true, lines };
}

/** marked 18.0.11 (pinned exactly as a devDependency) with GFM on: the page the docs render to (PAGE CHECK). */
const PAGE = new Marked({ gfm: true });
const PAGE_REFUSAL = "marked reports raw HTML that is not one complete comment";

const DEFINITION_REFUSAL = "marked reports a link reference definition, none of whose lines the page shows (C3)";

/** The raw text of every token of `type` marked reports for `markdown`, at any depth, in document order. */
function tokenRaws(markdown: string, type: "html" | "def"): string[] {
  const raws: string[] = [];
  PAGE.walkTokens(PAGE.lexer(markdown), (token) => {
    if (token.type === type) raws.push(token.raw);
  });
  return raws;
}

/** The raw text of every html token marked reports for `markdown`, block and inline, in document order. */
function htmlTokens(markdown: string): string[] {
  return tokenRaws(markdown, "html");
}

/** The raw text of every link reference definition marked reports for `markdown` (a later one with a label already defined is consumed without a token, after the first one). */
function definitionTokens(markdown: string): string[] {
  return tokenRaws(markdown, "def");
}

/** True when `raw`, spaces, tabs and line breaks around it aside, is exactly one HTML comment: it ends where a browser ends the comment it opens. */
function isOneCompleteComment(raw: string): boolean {
  const text = raw.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "");
  if (!text.startsWith("<!--")) return false;
  if (text.startsWith("<!-->")) return text.length === 5;
  if (text.startsWith("<!--->")) return text.length === 6;
  const ends = ["-->", BANG_CLOSE].map((close) => {
    const at = text.indexOf(close, 4);
    return at < 0 ? Number.POSITIVE_INFINITY : at + close.length;
  });
  return Math.min(...ends) === text.length;
}

/** The page check (owner R1=(b)): its refusal when marked reports an html token that is not exactly one complete comment, else null. */
function rawHtmlRefusal(markdown: string): string | null {
  const raw = htmlTokens(markdown).find((token) => !isOneCompleteComment(token));
  return raw === undefined ? null : `${PAGE_REFUSAL}: ${raw.slice(0, 32)}`;
}

/** C3, strengthened: its refusal when marked reports any link reference definition (a title or label may span lines), else null. */
function definitionRefusal(markdown: string): string | null {
  const raw = definitionTokens(markdown)[0];
  return raw === undefined ? null : `${DEFINITION_REFUSAL}: ${raw.slice(0, 32)}`;
}

/** The view every pin reads: the roster view, refused when the page check refuses the document. */
function pageView(markdown: string): View {
  const view = renderView(markdown);
  if (!view.ok) return view;
  const refusal = rawHtmlRefusal(markdown) ?? definitionRefusal(markdown);
  return refusal === null ? view : { ok: false, reason: refusal };
}

/** View texts, or one refusal line, for the model rows below. */
function texts(view: View): readonly string[] {
  return view.ok ? view.lines.map((line) => line.text) : [`REFUSED: ${view.reason}`];
}

/** A pattern for a refusal line that gives `reason` (and any quoted source after it). */
function refusedBy(reason: string): RegExp {
  return new RegExp(`^REFUSED: ${reason.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
}

/** The only normalization the pins allow (see PIN RULE). */
function normalize(lines: readonly string[]): string {
  const out: string[] = [];
  for (const raw of lines) {
    const line = raw.replace(/[ \t\r]+$/, "");
    if (line === "" && (out.length === 0 || out[out.length - 1] === "")) continue;
    out.push(line);
  }
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  return out.join("\n");
}

/** A view line's text inside its containers: leading whitespace, block quote `>` markers and list markers removed at any depth. */
function containerFree(text: string): string {
  let rest = text;
  for (;;) {
    const next = rest.replace(/^[ \t]*>[ \t]?/, "").replace(/^[ \t]*(?:[-+*]|\d{1,9}[.)])(?:[ \t]+|$)/, "");
    if (next === rest) return rest.replace(/^[ \t]+/, "");
    rest = next;
  }
}

const ATX_OPEN = /^#{1,6}(?:[ \t]|$)/;
const SETEXT_UNDERLINE = /^(?:=+|-+)[ \t]*$/;

/** The heading text of an ATX-like view line (HEADING KEY), or null. */
function atxText(line: ViewLine): string | null {
  if (line.code) return null;
  const inner = containerFree(line.text);
  if (!ATX_OPEN.test(inner)) return null;
  return inner
    .replace(/^#{1,6}/, "")
    .replace(/(?:^|[ \t]+)#+[ \t]*$/, "")
    .trim();
}

/** True when a view line could be a setext underline in some container. */
function isUnderline(line: ViewLine): boolean {
  return !line.code && SETEXT_UNDERLINE.test(line.text.replace(/^(?:[ \t]*>)*[ \t]*/, ""));
}

/** Every heading text the view could show (HEADING KEY): each ATX-like line, and every run of non-blank lines ending above a setext underline. */
function headingTexts(lines: readonly ViewLine[]): string[] {
  const out: string[] = [];
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line === undefined) continue;
    const atx = atxText(line);
    if (atx !== null) {
      out.push(atx);
      continue;
    }
    if (!isUnderline(line)) continue;
    const run: string[] = [];
    for (let above = index - 1; above >= 0; above--) {
      const prior = lines[above];
      if (prior === undefined || prior.code || atxText(prior) !== null) break;
      const text = containerFree(prior.text).trim();
      if (text === "") break;
      run.unshift(text);
      out.push(run.join(" "));
    }
  }
  return out;
}

type KeyToken = { readonly kind: "char"; readonly char: string } | { readonly kind: "space" } | { readonly kind: "any"; readonly min: number; readonly max: number };

const NUMERIC_REFERENCE = /^&#(?:([0-9]{1,7})|[xX]([0-9A-Fa-f]{1,6}));/;
const NAMED_REFERENCE = /^&[A-Za-z][A-Za-z0-9]{1,31};/;
const WHITE_SPACE = /^\p{White_Space}$/u;
const MAYBE_INVISIBLE = /^[\p{Cf}\p{Cc}\p{M}\p{Default_Ignorable_Code_Point}]$/u;
const PRINTABLE_ASCII = /^[!-~]$/;
/** Emphasis, strikethrough and code span markup, which can wrap nothing visible. */
const MARKUP = /^[*_~`]/;

/** The code point a numeric character reference decodes to (U+FFFD where the page substitutes it). */
function referenced(digits: string, radix: number): string {
  const value = Number.parseInt(digits, radix);
  const valid = value > 0 && value <= 0x10ffff && (value < 0xd800 || value > 0xdfff);
  return String.fromCodePoint(valid ? value : 0xfffd);
}

/** `text` without inline link and image syntax (HEADING KEY): `![`, `[` and `]` dropped, and the `(...)` or `[...]` right after a `]` dropped; escapes kept. */
function withoutLinkSyntax(text: string): string {
  let out = "";
  let index = 0;
  while (index < text.length) {
    const char = text[index] ?? "";
    if (char === "\\" && ASCII_PUNCTUATION.test(text[index + 1] ?? "")) {
      out += text.slice(index, index + 2);
      index += 2;
    } else if (char === "!" && text[index + 1] === "[") {
      index++;
    } else if (char === "[") {
      index++;
    } else if (char === "]") {
      index++;
      const open = text[index];
      if (open === "(" || open === "[") index = afterGroup(text, index, open, open === "(" ? ")" : "]");
    } else {
      out += char;
      index++;
    }
  }
  return out;
}

/** Index just past the group that opens at `from` with `open` and closes at its matching `close` (or the end of `text`). */
function afterGroup(text: string, from: number, open: string, close: string): number {
  let depth = 0;
  for (let index = from; index < text.length; index++) {
    const char = text[index];
    if (char === "\\") index++;
    else if (char === open) depth++;
    else if (char === close) {
      depth--;
      if (depth === 0) return index + 1;
    }
  }
  return text.length;
}

/** The folded key of a heading or label text (HEADING KEY). */
function keyTokens(source: string): KeyToken[] {
  const text = withoutLinkSyntax(source);
  const tokens: KeyToken[] = [];
  let pending = "";
  const flush = (): void => {
    for (const char of pending.normalize("NFKC")) {
      if (WHITE_SPACE.test(char)) tokens.push({ kind: "space" });
      else if (MAYBE_INVISIBLE.test(char)) tokens.push({ kind: "any", min: 0, max: 1 });
      else if (PRINTABLE_ASCII.test(char)) tokens.push({ kind: "char", char });
      else tokens.push({ kind: "any", min: 1, max: 3 });
    }
    pending = "";
  };
  let index = 0;
  while (index < text.length) {
    const rest = text.slice(index);
    const numeric = NUMERIC_REFERENCE.exec(rest);
    const named = NAMED_REFERENCE.exec(rest);
    if (rest[0] === "\\" && ASCII_PUNCTUATION.test(rest[1] ?? "")) {
      pending += rest[1];
      index += 2;
    } else if (numeric !== null) {
      pending += numeric[1] !== undefined ? referenced(numeric[1], 10) : referenced(numeric[2] ?? "", 16);
      index += numeric[0].length;
    } else if (named !== null) {
      flush();
      tokens.push({ kind: "any", min: 0, max: 3 });
      index += named[0].length;
    } else if (MARKUP.test(rest)) {
      flush();
      tokens.push({ kind: "any", min: 0, max: 1 });
      index++;
    } else {
      const char = String.fromCodePoint(rest.codePointAt(0) ?? 0);
      pending += char;
      index += char.length;
    }
  }
  flush();
  return collapseSpaces(tokens);
}

/** A key without the spaces a reader cannot see: a space after another one (only optional tokens between) and every leading or trailing space. */
function collapseSpaces(tokens: readonly KeyToken[]): KeyToken[] {
  const solid = (token: KeyToken): boolean => token.kind === "char" || (token.kind === "any" && token.min > 0);
  const out: KeyToken[] = [];
  let afterSolid = false;
  for (const token of tokens) {
    if (token.kind === "space") {
      if (afterSolid) out.push(token);
      afterSolid = false;
      continue;
    }
    out.push(token);
    if (solid(token)) afterSolid = true;
  }
  let last = out.length - 1;
  while (last >= 0) {
    const token = out[last];
    if (token !== undefined && solid(token)) break;
    last--;
  }
  return out.filter((token, index) => token.kind !== "space" || index < last);
}

/** True when the key can spell exactly `title`, or, as a `prefix`, can begin with it. */
function keyMatches(tokens: readonly KeyToken[], title: string, prefix: boolean): boolean {
  let reach = new Set<number>([0]);
  for (const token of tokens) {
    const next = new Set<number>();
    for (const at of reach) {
      if (token.kind === "char") {
        if (title[at] === token.char) next.add(at + 1);
      } else if (token.kind === "space") {
        if (title[at] === " ") next.add(at + 1);
      } else {
        for (let take = token.min; take <= token.max && at + take <= title.length; take++) next.add(at + take);
      }
    }
    if (prefix && next.has(title.length)) return true;
    if (next.size === 0) return false;
    reach = next;
  }
  return reach.has(title.length);
}

/** How many headings the view could show with the pinned heading's text (HEADING KEY). */
function headingNames(lines: readonly ViewLine[], heading: string): number {
  const title = heading.replace(/^#{1,6}[ \t]+/, "");
  return headingTexts(lines).filter((text) => keyMatches(keyTokens(text), title, false)).length;
}

/** How many view lines could show a `VC-1:` label (HEADING KEY). */
function labelNames(lines: readonly ViewLine[]): number {
  const label = (line: ViewLine): string =>
    containerFree(line.text)
      .replace(/^#{1,6}(?:[ \t]+|$)/, "")
      .replace(/^[*_]+/, "");
  return lines.filter((line) => !line.code && keyMatches(keyTokens(label(line)), "VC-1:", true)).length;
}

/** ATX heading level of a view line; 0 for code and for every other line. */
function atxLevel(line: ViewLine): number {
  if (line.code) return 0;
  return (/^ {0,3}(#{1,6})(?:[ \t]|$)/.exec(line.text)?.[1] ?? "").length;
}

/** Slice the view from the committed `opener` line (exclusive end at the first `closes` line), normalized. */
function sliceFrom(view: View, opener: string, names: number, closes: (line: ViewLine) => boolean): string {
  if (!view.ok) return `REFUSED: ${view.reason}`;
  if (names !== 1) return `REFUSED: "${opener}" names ${names} sections`;
  const start = view.lines.findIndex((line) => !line.code && line.text === opener);
  if (start < 0) return `REFUSED: "${opener}" is not written in its committed form`;
  let end = view.lines.length;
  for (let index = start + 1; index < view.lines.length; index++) {
    const line = view.lines[index];
    if (line !== undefined && closes(line)) {
      end = index;
      break;
    }
  }
  return normalize(view.lines.slice(start, end).map((line) => line.text));
}

const closesLevel2 = (line: ViewLine): boolean => atxLevel(line) === 1 || atxLevel(line) === 2;

/** How a slice reads its view: pageView (every pin), or renderView where a model row asks for the roster alone. */
type ViewOf = (markdown: string) => View;

/** The level-2 section under `heading`: the only heading the view could show with its text, bounded by the next level-1/2 ATX heading or EOF. */
function sectionOf(markdown: string, heading: string, viewOf: ViewOf = pageView): string {
  const view = viewOf(markdown);
  const names = view.ok ? headingNames(view.lines, heading) : 0;
  return sliceFrom(view, heading, names, closesLevel2);
}

/** The docs/15 VC-1 block: the only `VC-1:` label the view could show, to the next `**VC-<n>:` label or level-1/2 ATX heading. */
function vc1BlockOf(markdown: string, viewOf: ViewOf = pageView): string {
  const view = viewOf(markdown);
  const names = view.ok ? labelNames(view.lines) : 0;
  return sliceFrom(view, VC1_LABEL, names, (line) => closesLevel2(line) || (!line.code && /^\*\*VC-\d+:/.test(line.text)));
}

/** A field of the parsed receipt, or undefined when the path is absent. */
function receiptField(receipt: unknown, path: readonly string[]): unknown {
  let current: unknown = receipt;
  for (const key of path) current = typeof current === "object" && current !== null ? Reflect.get(current, key) : undefined;
  return current;
}

/** A string field of the parsed receipt, or a marker naming the missing path (which no pinned slice contains). */
function receiptString(receipt: unknown, path: readonly string[]): string {
  const value = receiptField(receipt, path);
  return typeof value === "string" ? value : `<missing ${path.join(".")}>`;
}

function pinnedSlices(): ReadonlyArray<readonly [string, string]> {
  return [
    ["docs/15 VC-1 block", vc1BlockOf(read(DOC_15))],
    ["docs/10 section", sectionOf(read(DOC_10), DOC_10_HEADING)],
    ["TRACEABILITY wb-2t2 section", sectionOf(read(TRACE), TRACE_2T2_HEADING)],
  ];
}

describe("wb-2t2 docs pins: each pinned section equals its committed text in the rendered view", () => {
  it("docs/15: the VC-1 block equals the committed block", () => {
    expect(vc1BlockOf(read(DOC_15))).toBe(DOC_15_VC1_BLOCK);
  });

  it("docs/10: the 'Cancelling a background workflow' section equals the committed section", () => {
    expect(sectionOf(read(DOC_10), DOC_10_HEADING)).toBe(DOC_10_SECTION);
  });

  it("TRACEABILITY: the wb-2t2 section equals the committed section", () => {
    expect(sectionOf(read(TRACE), TRACE_2T2_HEADING)).toBe(TRACE_2T2_SECTION);
  });

  it("TRACEABILITY: the wb-h7r marker is one exact whole line of the wb-a2g.3 section, after a blank separator under the receipt paragraph", () => {
    const lines = sectionOf(read(TRACE), TRACE_A2G3_HEADING).split("\n");
    const found = lines.flatMap((line, index) => (line === H7R_MARKER ? [index] : []));
    expect(found).toHaveLength(1);
    const at = found[0] ?? 0;
    expect(lines[at - 1]).toBe("");
    expect((lines[at - 2] ?? "").startsWith(A2G3_PARAGRAPH_OPENING)).toBe(true);
    const view = renderView(read(TRACE));
    const shown = texts(view).join("\n");
    expect(shown.split("SUPERSEDED (wb-h7r): the cancellation claims").length - 1).toBe(1);
  });
});

describe("wb-2t2 the pinned slices quote the committed v2 receipt of record, never the superseded v1 data", () => {
  it("every quoted receipt value is read from the committed receipt file, not from the pin text", () => {
    const receipt: unknown = JSON.parse(read(V2_RECEIPT_PATH));
    expect(receiptString(receipt, ["contract"])).toBe("workbench.operator-journey/v2");
    expect(receiptField(receipt, ["journeys", "cancellation", "ctrlCStoppedWorkflow"])).toBe(false);
    const session = receiptString(receipt, ["journeys", "cancellation", "sessionIdsDuringRun", "0"]);
    const quoted = [
      receiptString(receipt, ["revision"]),
      `pi ${receiptString(receipt, ["pi"])}`,
      V2_RECEIPT_PATH,
      session.slice(0, 8),
      receiptString(receipt, ["journeys", "cancellation", "sessionIdSeenAt"]).slice(11),
      receiptString(receipt, ["journeys", "cancellation", "interruptSentAt"]).slice(11),
    ];
    for (const [name, slice] of pinnedSlices()) {
      for (const value of quoted) expect(slice, `${name} quotes ${value}`).toContain(value);
      expect(slice, `${name} quotes the Ctrl-C verdict`).toMatch(/ctrlCStoppedWorkflow: ?false/);
    }
    const trace = sectionOf(read(TRACE), TRACE_2T2_HEADING);
    expect(trace).toContain(session);
    expect(trace).toContain(receiptString(receipt, ["journeys", "cancellation", "explicitCancelSentAt"]).slice(11));
    expect(trace).toContain(receiptString(receipt, ["journeys", "cancellation", "interruptAcknowledgedAt"]).slice(11));
  });

  it("no pinned slice carries a superseded v1 token", () => {
    for (const [name, slice] of pinnedSlices()) {
      expect(slice.startsWith("REFUSED"), `${name} is sliced, not refused`).toBe(false);
      for (const token of V1_TOKENS) expect(slice, `${name} carries ${token}`).not.toContain(token);
    }
  });
});

describe("wb-2t2 the rendered view model (gate-1 U2: rendered-text docs truth)", () => {
  it("a closed comment hides exactly its own span; C1: only spaces and tabs may follow its closing --> on the line", () => {
    expect(texts(renderView("a <!-- x -->\n<!-- y -->\nc <!-->\nd <!--->\nf\n<!-- g\nh\ni -->"))).toEqual(["a ", "", "c ", "d ", "f", "", ""]);
    expect(texts(renderView("a <!-- x --> b\n<!-- y -->\nc <!--> d <!---> e\nf\n<!-- g\nh\ni --> j"))[0]).toMatch(refusedBy(C1_REFUSAL));
  });

  it("an unterminated opener at the start of a line hides everything to EOF in the roster view, and the page check refuses the document", () => {
    const doc = "## A\n\nkept\n<!--\n## B\n\nhidden\n";
    expect(texts(renderView(doc))).toEqual(["## A", "", "kept", ""]);
    expect(sectionOf(doc, "## B", renderView)).toBe('REFUSED: "## B" names 0 sections');
    expect(sectionOf(doc, "## A", renderView)).toBe("## A\n\nkept");
    expect(rawHtmlRefusal(doc)).toMatch(/^marked reports raw HTML that is not one complete comment: <!--/);
    for (const heading of ["## A", "## B"]) expect(sectionOf(doc, heading), heading).toMatch(refusedBy(PAGE_REFUSAL));
  });

  it("C2: an inline opener that does not close on its own line refuses the document (hiding everything after it was fail-open for the uniqueness pins)", () => {
    expect(texts(renderView("p <!-- q\nr -->\n## B\nhidden"))[0]).toMatch(refusedBy(C2_REFUSAL));
  });

  it("fenced code is visible code: never a heading, never a comment, never a section end; an unterminated fence runs to EOF", () => {
    const doc = "```\n## A\n<!--\n```\n\n## A\nbody\n\n## C\n\n```\n## D\nx";
    expect(sectionOf(doc, "## A")).toBe("## A\nbody");
    expect(sectionOf(doc, "## C")).toBe("## C\n\n```\n## D\nx");
    expect(sectionOf(doc, "## D")).toBe('REFUSED: "## D" names 0 sections');
  });

  it("a ~~~ fence or a raw HTML tag refuses the document; code spans, escapes and autolinks do not", () => {
    expect(texts(renderView("~~~\nx\n~~~"))).toEqual(["REFUSED: a ~~~ fence is not modelled"]);
    expect(renderView("<div hidden>\n\n## A").ok).toBe(false);
    expect(renderView("text <details> more").ok).toBe(false);
    expect(renderView("</div>").ok).toBe(false);
    const safe = "`<div hidden>` and \\<div> and <https://example.com> and ``a<!--b`` end";
    expect(texts(renderView(safe))).toEqual([safe]);
  });

  it("a section heading names exactly one section in any heading form; a fenced copy is code", () => {
    const doc = "## A\nbody\n";
    expect(sectionOf(`${doc}\n## A\n`, "## A")).toBe('REFUSED: "## A" names 2 sections');
    expect(sectionOf(`${doc}\n   ## A ##\n`, "## A")).toBe('REFUSED: "## A" names 2 sections');
    expect(sectionOf(`${doc}\nA\n---\n`, "## A")).toBe('REFUSED: "## A" names 2 sections');
    expect(sectionOf(`${doc}\n> ### A\n`, "## A")).toBe('REFUSED: "## A" names 2 sections');
    expect(sectionOf(`\`\`\`\n## A\n\`\`\`\n\n${doc}`, "## A")).toBe("## A\nbody");
  });

  it("S3 falsifier: an unterminated <!-- closing the section before it hides the TRACEABILITY wb-2t2 section", () => {
    const doc = lf(read(TRACE));
    const anchor = "\n\n## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)";
    expect(doc.split(anchor)).toHaveLength(2);
    const opened = doc.replace(anchor, () => `\n\n<!--${anchor}`);
    expect(sectionOf(opened, TRACE_2T2_HEADING, renderView)).toBe(`REFUSED: "${TRACE_2T2_HEADING}" names 0 sections`);
    expect(sectionOf(opened, TRACE_2T2_HEADING)).toMatch(refusedBy(PAGE_REFUSAL));
  });

  it("S3b falsifier: an unterminated <!-- right after the docs/10 heading leaves the heading alone in the roster slice, and the page check refuses the document", () => {
    const doc = lf(read(DOC_10));
    const anchor = "## Cancelling a background workflow\n\nMeasured by the wb-a2g.3 live operator receipt";
    expect(doc.split(anchor)).toHaveLength(2);
    const opened = doc.replace(anchor, () => anchor.replace("\n\n", "\n<!--\n\n"));
    expect(sectionOf(opened, DOC_10_HEADING, renderView)).toBe("## Cancelling a background workflow");
    expect(sectionOf(opened, DOC_10_HEADING)).toMatch(refusedBy(PAGE_REFUSAL));
  });

  it("control: a ```-fenced copy of the docs/10 heading before the section leaves the slice equal", () => {
    const doc = lf(read(DOC_10));
    const anchor = "## Cancelling a background workflow\n\nMeasured by the wb-a2g.3 live operator receipt";
    expect(doc.split(anchor)).toHaveLength(2);
    const fenced = "```\n## Cancelling a background workflow\n```\n\n";
    expect(sectionOf(doc.replace(anchor, () => `${fenced}${anchor}`), DOC_10_HEADING)).toBe(DOC_10_SECTION);
  });
});

const NBSP = String.fromCodePoint(0x00a0);
const ZWSP = String.fromCodePoint(0x200b);
const CYRILLIC_A = String.fromCodePoint(0x0430);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
const HANGUL_FILLER = String.fromCodePoint(0x3164);
const FULLWIDTH_C = String.fromCodePoint(0xff23);
const TAB = String.fromCodePoint(0x09);
const CR = String.fromCodePoint(0x0d);
const RIGHT_TO_LEFT_OVERRIDE = String.fromCodePoint(0x202e);
const POP_DIRECTIONAL = String.fromCodePoint(0x202c);
const RAW_HTML_REFUSED = /^REFUSED: raw HTML is not modelled: </;
const DOC_10_NAMES_2 = `REFUSED: "${DOC_10_HEADING}" names 2 sections`;
const TRACE_2T2_NAMES_2 = `REFUSED: "${TRACE_2T2_HEADING}" names 2 sections`;
const WEAKER_DOC_10 = "Correction: Ctrl-C stops a background workflow; the dialog path is deprecated.";
const WEAKER_TRACE = "Superseded: Ctrl-C now stops a live background workflow.";

describe("wb-2t2 raw HTML refuses the document wherever it starts (gate-1 2026-10-17T02:22Z U1, shapes H1-H7)", () => {
  it("H1 falsifier: '<style' alone on a line before the TRACEABILITY wb-2t2 heading refuses the document", () => {
    const doc = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `\n\n<style${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toMatch(RAW_HTML_REFUSED);
  });

  it("H2 falsifier: a '<div hidden title=\"<\">' line before the TRACEABILITY wb-2t2 heading refuses the document", () => {
    const doc = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `\n\n<div hidden title="<">${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toMatch(RAW_HTML_REFUSED);
  });

  it("H3 falsifier: a '<div' / 'hidden>' tag split over two lines before the docs/10 heading refuses the document", () => {
    const doc = withOnce(lf(read(DOC_10)), DOC_10_ANCHOR, `\n\n<div\nhidden>${DOC_10_ANCHOR}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toMatch(RAW_HTML_REFUSED);
  });

  it("H4 falsifier: a '<details' / '>' tag split over two lines before the docs/10 heading refuses the document", () => {
    const doc = withOnce(lf(read(DOC_10)), DOC_10_ANCHOR, `\n\n<details\n>${DOC_10_ANCHOR}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toMatch(RAW_HTML_REFUSED);
  });

  it("H5 falsifier: '<script' alone on a line before the docs/15 VC-1 label refuses the document", () => {
    const doc = withOnce(lf(read(DOC_15)), VC1_ANCHOR, `\n\n<script${VC1_ANCHOR}`);
    expect(vc1BlockOf(doc)).toMatch(RAW_HTML_REFUSED);
  });

  it("H6 falsifier: a '<div hidden title=\"<\">' line before the docs/15 VC-1 label refuses the document", () => {
    const doc = withOnce(lf(read(DOC_15)), VC1_ANCHOR, `\n\n<div hidden title="<">${VC1_ANCHOR}`);
    expect(vc1BlockOf(doc)).toMatch(RAW_HTML_REFUSED);
  });

  it("H7 falsifier: an inline ' <div hidden title=\"<\">' ending the paragraph line above the TRACEABILITY wb-2t2 heading refuses the document", () => {
    const doc = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, ` <div hidden title="<">${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toMatch(RAW_HTML_REFUSED);
  });

  it("roster: a backtick string that does not close on its line refuses the document (marked pairs it across the line break, so the tag the next line seems to quote is raw)", () => {
    const crossing = "\n\nThe gap is open: ` see\nthe note ` <div hidden> `";
    const doc = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `${crossing}${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toMatch(/^REFUSED: a code span that does not close on its line is not modelled: `/);
  });

  it("roster: a comment holding '--!>' refuses the document (a browser ends the comment there, marked at the next '-->')", () => {
    const doc = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `\n\n<!-- note --!> <div hidden>\n-->${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toBe("REFUSED: a comment holding --!> is not modelled");
    expect(texts(renderView("a <!-- x --!> <div hidden> y --> b"))).toEqual(["REFUSED: a comment holding --!> is not modelled"]);
  });

  it("control: a '<' that cannot start raw HTML, a closed code span, an escape and an autolink stay visible text", () => {
    const text = "a < b, x <3, <- back, 2 <= 3, `<style>` and \\<script> and <mailto:a@b.c>";
    expect(texts(renderView(text))).toEqual([text]);
  });
});

describe("wb-2t2 a pinned heading or label names one section under the folded heading key (gate-1 2026-10-17T02:22Z U2)", () => {
  it("U1-NBSP falsifier: an NBSP look-alike of the docs/10 heading appended at EOF names a second section", () => {
    const doc = withTail(lf(read(DOC_10)), `## Cancelling a background${NBSP}workflow\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toBe(DOC_10_NAMES_2);
  });

  it("U3-Cyrillic falsifier: a U+0430 look-alike of the docs/10 heading appended at EOF names a second section", () => {
    const doc = withTail(lf(read(DOC_10)), `## Cancelling ${CYRILLIC_A} background workflow\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toBe(DOC_10_NAMES_2);
  });

  it("U2b-ZWSP falsifier: a ZWSP inside a look-alike of the TRACEABILITY wb-2t2 heading appended at EOF names a second section", () => {
    const doc = withTail(lf(read(TRACE)), `## VC-1 measured${ZWSP} gap: Ctrl-C does not stop a background workflow (wb-2t2)\n\n${WEAKER_TRACE}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toBe(TRACE_2T2_NAMES_2);
  });

  it("U5-NBSP falsifier: an NBSP look-alike of the TRACEABILITY wb-2t2 heading appended at EOF names a second section", () => {
    const doc = withTail(lf(read(TRACE)), `## VC-1 measured gap: Ctrl-C does not stop a background${NBSP}workflow (wb-2t2)\n\n${WEAKER_TRACE}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toBe(TRACE_2T2_NAMES_2);
  });

  it("U2-ZWSP-at-end falsifier: a trailing-ZWSP look-alike of the TRACEABILITY wb-2t2 heading appended at EOF names a second section (red by the heading key, not by an anchor count)", () => {
    const doc = withTail(lf(read(TRACE)), `${TRACE_2T2_HEADING}${ZWSP}\n\n${WEAKER_TRACE}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toBe(TRACE_2T2_NAMES_2);
  });

  it("any container depth: a docs/10 heading duplicate in a nested list, in a list item body or in a quote in a list in a quote names a second section", () => {
    for (const tail of [`- - ${DOC_10_HEADING}`, `- x\n\n    ${DOC_10_HEADING}`, `> - > ${DOC_10_HEADING}`]) {
      expect(sectionOf(withTail(lf(read(DOC_10)), `${tail}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), tail).toBe(DOC_10_NAMES_2);
    }
  });

  it("decoded text: a duplicate spelled with backslash escapes, a numeric or named character reference, or a whitespace run names a second section", () => {
    const escaped = "## VC-1 measured gap: Ctrl-C does not stop a background workflow \\(wb-2t2\\)";
    expect(sectionOf(withTail(lf(read(TRACE)), `${escaped}\n\n${WEAKER_TRACE}`), TRACE_2T2_HEADING)).toBe(TRACE_2T2_NAMES_2);
    for (const heading of ["## Cancelling &#97; background workflow", "## Cancelling&nbsp;a background workflow", `## Cancelling  a background${TAB}workflow`, "## Cancelling a background workflow &#x200B;"]) {
      expect(sectionOf(withTail(lf(read(DOC_10)), `${heading}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), heading).toBe(DOC_10_NAMES_2);
    }
  });

  it("width look-alikes: a docs/10 duplicate with a Hangul filler for a space or a fullwidth capital names a second section", () => {
    for (const heading of [`## Cancelling${HANGUL_FILLER}a background workflow`, `## ${FULLWIDTH_C}ancelling a background workflow`]) {
      expect(sectionOf(withTail(lf(read(DOC_10)), `${heading}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), heading).toBe(DOC_10_NAMES_2);
    }
  });

  it("a setext duplicate of the docs/10 heading written over two lines names a second section", () => {
    const doc = withTail(lf(read(DOC_10)), `Cancelling a\nbackground workflow\n---\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toBe(DOC_10_NAMES_2);
  });

  it("markup that renders nothing: a docs/10 duplicate followed by an empty link, an empty image or an empty reference link names a second section", () => {
    for (const heading of [`${DOC_10_HEADING}[](x)`, `${DOC_10_HEADING}![](x)`]) {
      expect(sectionOf(withTail(lf(read(DOC_10)), `${heading}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), heading).toBe(DOC_10_NAMES_2);
    }
    // the empty reference link needs a definition, which the page check now refuses (C3, strengthened): the folded key
    // still counts the duplicate in the roster view, and every pin refuses the document for the definition
    const reference = withTail(lf(read(DOC_10)), `${DOC_10_HEADING}[][r]\n\n[r]: x\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(reference, DOC_10_HEADING, renderView)).toBe(DOC_10_NAMES_2);
    expect(sectionOf(reference, DOC_10_HEADING)).toMatch(refusedBy(DEFINITION_REFUSAL));
  });

  it("markup around nothing visible: a docs/10 duplicate ending in emphasis, strong, strikethrough or a code span around a ZWSP names a second section", () => {
    for (const markup of [`*${ZWSP}*`, `**${ZWSP}**`, `~~${ZWSP}~~`, `\`${ZWSP}\``]) {
      const heading = `${DOC_10_HEADING}${markup}`;
      expect(sectionOf(withTail(lf(read(DOC_10)), `${heading}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), heading).toBe(DOC_10_NAMES_2);
    }
  });

  it("a bidirectional control outside code refuses the document: a right-to-left override shows a reversed duplicate in title order", () => {
    const doc = withTail(lf(read(DOC_10)), `## Cancelling a background ${RIGHT_TO_LEFT_OVERRIDE}wolfkrow${POP_DIRECTIONAL}\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toBe("REFUSED: a bidirectional control is not modelled");
  });

  it("the docs/15 VC-1 label is counted under the same key: a U+2011 look-alike label appended at EOF names a second block", () => {
    const doc = withTail(lf(read(DOC_15)), `**VC${NON_BREAKING_HYPHEN}1: Pi -> Claude SDK workflow** (P0)\n- Ctrl-C stops a background workflow; no explicit cancel path is needed.`);
    expect(vc1BlockOf(doc)).toBe(`REFUSED: "${VC1_LABEL}" names 2 sections`);
  });

  it("control: headings a reader tells apart stay separate sections (another word, another article, an extra character)", () => {
    for (const heading of ["## Cancelling a foreground workflow", "## Cancelling the background workflow", "## Cancelling a background workflow."]) {
      expect(sectionOf(withTail(lf(read(DOC_10)), `${heading}\n\n${WEAKER_DOC_10}`), DOC_10_HEADING), heading).toBe(DOC_10_SECTION);
    }
  });
});

describe("wb-2t2 line endings (gate-1 2026-10-17T02:22Z U4)", () => {
  it("a CRLF checkout of each doc renders the same view and the same pinned slices", () => {
    const crlf = (text: string): string => lf(text).split("\n").join(`${CR}\n`);
    for (const path of [DOC_15, DOC_10, TRACE]) expect(texts(renderView(crlf(read(path)))), path).toEqual(texts(renderView(lf(read(path)))));
    expect(vc1BlockOf(crlf(read(DOC_15)))).toBe(DOC_15_VC1_BLOCK);
    expect(sectionOf(crlf(read(DOC_10)), DOC_10_HEADING)).toBe(DOC_10_SECTION);
    expect(sectionOf(crlf(read(TRACE)), TRACE_2T2_HEADING)).toBe(TRACE_2T2_SECTION);
  });

  it("a lone CR ends a line, as in CommonMark: a heading after one is a heading", () => {
    const doc = withTail(lf(read(DOC_10)), `Moved.${CR}${DOC_10_HEADING}\n\n${WEAKER_DOC_10}`);
    expect(sectionOf(doc, DOC_10_HEADING)).toBe(DOC_10_NAMES_2);
  });
});

const SOH = String.fromCodePoint(0x01);
const RAW_HTML = "raw HTML is not modelled";

/** `text` with every line ending written as CRLF. */
function crlfOf(text: string): string {
  return lf(text).split("\n").join(`${CR}\n`);
}

describe("wb-2t2 the page check: marked 18.0.11 html tokens and link reference definitions over the whole document (owner ruling 2026-10-17T04:46Z, R1=(b))", () => {
  it("today's three docs produce 0 html tokens and 0 link reference definitions, in LF and in CRLF, so the page check passes them", () => {
    for (const path of [DOC_15, DOC_10, TRACE]) {
      expect(htmlTokens(read(path)), path).toEqual([]);
      expect(htmlTokens(crlfOf(read(path))), `${path} (CRLF)`).toEqual([]);
      expect(rawHtmlRefusal(read(path)), path).toBeNull();
      expect(definitionTokens(read(path)), path).toEqual([]);
      expect(definitionTokens(crlfOf(read(path))), `${path} (CRLF)`).toEqual([]);
      expect(definitionRefusal(read(path)), path).toBeNull();
    }
  });

  it("positive controls: marked reports a planted raw tag and a planted comment, and only the comment is one complete comment", () => {
    const tagged = htmlTokens("x\n\n<div hidden>\n\ny");
    expect(tagged).toHaveLength(1);
    expect(tagged[0]?.startsWith("<div hidden>")).toBe(true);
    expect(rawHtmlRefusal("x\n\n<div hidden>\n\ny")).toMatch(/^marked reports raw HTML that is not one complete comment: <div hidden>/);
    expect(htmlTokens("a <!-- x --> b")).toEqual(["<!-- x -->"]);
    expect(rawHtmlRefusal("a <!-- x --> b")).toBeNull();
  });

  it("one complete comment ends where a browser ends the comment it opens, with only spaces, tabs and line breaks around it", () => {
    for (const raw of ["<!-- x -->", "  <!-- x -->\n\n", "<!-->", "<!--->", "<!---->", "<!--\nx\n-->"]) expect(isOneCompleteComment(raw), raw).toBe(true);
    for (const raw of ["<!-- x --> y", "<!-- x -->`y`", "<!-- x", "<!-- x --!> y -->", "<!-- x --><!-- y -->", "<!--> x -->", "<div hidden>", `<!-- x -->${NBSP}`]) {
      expect(isOneCompleteComment(raw), raw).toBe(false);
    }
  });

  it("every pin reads the page view: the roster view accepts a line-start comment left open, and the page check refuses that document", () => {
    const doc = withOnce(lf(read(DOC_10)), DOC_10_ANCHOR, `\n\n<!--${DOC_10_ANCHOR}`);
    expect(renderView(doc).ok).toBe(true);
    expect(pageView(doc).ok).toBe(false);
    expect(sectionOf(doc, DOC_10_HEADING)).toMatch(refusedBy(PAGE_REFUSAL));
  });

  it("C3, strengthened: marked renders none of a link reference definition's lines, and a title or label may run over a heading, with no html token", () => {
    expect(PAGE.parse("## H\n")).toBe("<h2>H</h2>\n");
    for (const doc of ['[r]: x "t\n\n## H\n"\n', "[r]: x 't\n## H\n'\n", "[r]: x (t\n## H\n)\n", "[r\n## H\n]: x\n"]) {
      expect(PAGE.parse(doc), doc).toBe("");
      expect(htmlTokens(doc), doc).toEqual([]);
      expect(definitionTokens(doc), doc).toHaveLength(1);
      expect(definitionRefusal(doc)?.startsWith(`${DEFINITION_REFUSAL}: `), doc).toBe(true);
    }
    expect(definitionTokens("[r]: x\n\n[r]: y\n"), "a second definition of a label is consumed without a token").toHaveLength(1);
    expect(definitionTokens("p\n[r]: x\n"), "a definition cannot interrupt a paragraph: it stays paragraph text").toEqual([]);
  });

  it("two-edit definition falsifiers: an opener before each pinned opener and a closer after its slice hide the pinned text in the page; the roster view alone passes each pin, and the page check refuses it", () => {
    const scalability = "\n## Scalability targets (proposed, not measured)\n";
    const vc2 = "\n**VC-2: node() + real SDK operation** (P0/P1)\n";
    const rows = [
      {
        copy: withTail(withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `\n\n[r${TRACE_2T2_ANCHOR}`), "## Addendum\n\n]: x"),
        pristine: lf(read(TRACE)),
        shown: "<h2>VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)</h2>",
        pin: (markdown: string, viewOf: ViewOf): string => sectionOf(markdown, TRACE_2T2_HEADING, viewOf),
        committed: TRACE_2T2_SECTION,
      },
      {
        copy: withOnce(withOnce(lf(read(DOC_10)), DOC_10_ANCHOR, `\n\n[r]: x "t${DOC_10_ANCHOR}`), scalability, `${scalability}"\n`),
        pristine: lf(read(DOC_10)),
        shown: "<h2>Cancelling a background workflow</h2>",
        pin: (markdown: string, viewOf: ViewOf): string => sectionOf(markdown, DOC_10_HEADING, viewOf),
        committed: DOC_10_SECTION,
      },
      {
        copy: withOnce(withOnce(lf(read(DOC_15)), VC1_ANCHOR, `\n\n[r${VC1_ANCHOR}`), vc2, `${vc2}]: x\n`),
        pristine: lf(read(DOC_15)),
        shown: "<strong>VC-1: Pi -&gt; Claude SDK workflow</strong>",
        pin: (markdown: string, viewOf: ViewOf): string => vc1BlockOf(markdown, viewOf),
        committed: DOC_15_VC1_BLOCK,
      },
    ];
    for (const row of rows) {
      expect(PAGE.parse(row.pristine), row.shown).toContain(row.shown);
      expect(PAGE.parse(row.copy), row.shown).not.toContain(row.shown);
      expect(row.pin(row.copy, renderView), row.shown).toBe(row.committed);
      expect(rawHtmlRefusal(row.copy), row.shown).toBeNull();
      expect(row.pin(row.copy, pageView), row.shown).toMatch(refusedBy(DEFINITION_REFUSAL));
    }
  });
});

describe("wb-2t2 the roster refusals C1-C6 (gate-1 row 403 cure; each is zero-cost on today's docs, whose pins stay equal above)", () => {
  it("C1: text after a comment's closing --> on its line refuses, block or inline; a comment with nothing after it stays hidden", () => {
    for (const doc of ["<!-- note --> `x`", "<!--\nnote\n--> `x`", "a <!-- x --> b", `<!-- a -->${TAB}<!-- b -->`]) expect(texts(renderView(doc))[0], doc).toMatch(refusedBy(C1_REFUSAL));
    expect(texts(renderView("<!-- note -->\nkept\n<!--\nnote\n-->  \nalso <!-- x -->"))).toEqual(["", "kept", "", "  ", "also "]);
  });

  it("C1 names a refused construct after --> as itself: H7's inline tag after battery K1's comment line above the TRACEABILITY wb-2t2 heading is refused as raw HTML", () => {
    const k1 = withOnce(lf(read(TRACE)), TRACE_2T2_ANCHOR, `\n\n<!-- gate -->${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(k1, TRACE_2T2_HEADING)).toBe(TRACE_2T2_SECTION);
    const doc = withOnce(k1, TRACE_2T2_ANCHOR, ` <div hidden title="<">${TRACE_2T2_ANCHOR}`);
    expect(sectionOf(doc, TRACE_2T2_HEADING)).toMatch(RAW_HTML_REFUSED);
    for (const shape of ["<!-- x --> <b>", "a <!-- x --> <b>", "<!--\nx\n--> <b>"]) expect(texts(renderView(shape))[0], shape).toMatch(refusedBy(`${RAW_HTML}: <b>`));
  });

  it("C2: an inline <!-- that does not close on its own line refuses; a line-start comment may span lines", () => {
    for (const doc of ["p <!-- q\nr -->", "p <!-- q", "- <!-- q\n- r -->"]) expect(texts(renderView(doc))[0], doc).toMatch(refusedBy(C2_REFUSAL));
    expect(texts(renderView("<!-- q\nr -->\np"))).toEqual(["", "", "p"]);
  });

  it("C3: a backtick or < in a link or image destination or title, or in a reference definition's, refuses; links without them stay visible text", () => {
    for (const doc of ["[x](a`b) c`", "![x](a`b)", '[x](a "t`")', "[x](<a> )", '[x](a\n"t`")', "[r]: a`b", '[r]: a\n"t`"', "[r]: <a>"]) {
      expect(texts(renderView(doc))[0], doc).toMatch(refusedBy(C3_REFUSAL));
    }
    for (const doc of ["[x](a) `c`", "[](x)", "![x](a 't')", "[r]: x 't'"]) expect(texts(renderView(doc)), doc).toEqual([doc]);
  });

  it("C4: a backtick in a GFM extended autolink token or in a <...> autolink candidate refuses; autolinks follow marked's grammar", () => {
    for (const doc of ["https://example.com/`c d`", "www.example.com/`c d`", "see:https://x.io/`a b`", "<a`b@c>", `<a:${SOH}\`>`, `<ab:${SOH}\`>`, "<https://x.io/`a>"]) {
      expect(texts(renderView(doc))[0], doc).toMatch(refusedBy(C4_REFUSAL));
    }
    for (const doc of ["<https://example.com>", "<mailto:a@b.c>", "see https://example.com/x and `code`", "<a@b.co>"]) expect(texts(renderView(doc)), doc).toEqual([doc]);
    expect(texts(renderView(`<ab:${SOH}> x`))[0]).toMatch(refusedBy(`${RAW_HTML}: <ab:`));
  });

  it("C5: a GFM table cell whose backticks do not pair inside the cell refuses; cells split at unescaped pipes first", () => {
    const table = (row: string): string => `| h | h |\n| - | - |\n${row}`;
    for (const row of ["| `a | b` |", "| x | `a \\\\| b` |"]) expect(texts(renderView(table(row)))[0], row).toMatch(refusedBy(C5_REFUSAL));
    for (const row of ["| `a` | `b \\| c` |", "| a \\| b | c |"]) expect(texts(renderView(table(row))), row).toEqual(["| h | h |", "| - | - |", row]);
  });

  it("C6: a fence opener that is not at column 0 refuses (indented, in a list or a block quote); a column-0 fence closes at marked's closing fence", () => {
    for (const doc of ["  ```\nx\n```", "- ```\nx\n```", "> ```\nx", "1. item\n   ```\nx\n```", "- ~~~\nx", "    ```"]) expect(texts(renderView(doc))[0], doc).toMatch(refusedBy(C6_REFUSAL));
    expect(sectionOf("```\n## A\n```~\n\n## A\nbody", "## A")).toBe("## A\nbody");
    expect(sectionOf(`\`\`\`\n## A\n\`\`\`${TAB}\n\n## A\nbody`, "## A")).toBe('REFUSED: "## A" names 0 sections');
  });
});

/** Each document the battery mutates: its path, the pinned opener it inserts before, the pin that reads it and the committed text that pin equals. */
const PINNED = {
  TRACE: { path: TRACE, anchor: TRACE_2T2_ANCHOR, pin: (markdown: string): string => sectionOf(markdown, TRACE_2T2_HEADING), committed: TRACE_2T2_SECTION },
  DOC_10: { path: DOC_10, anchor: DOC_10_ANCHOR, pin: (markdown: string): string => sectionOf(markdown, DOC_10_HEADING), committed: DOC_10_SECTION },
  DOC_15: { path: DOC_15, anchor: VC1_ANCHOR, pin: (markdown: string): string => vc1BlockOf(markdown), committed: DOC_15_VC1_BLOCK },
} as const;

/**
 * One row of the gate-1 battery of record (outbox row 403, gate g4-gate-r2 on f812fbc; copied durable at
 * machines/flywheel/state/batteries/wb-2t2-f812fbc/: cases1.json holds 25 rows and cases2.json 7, and battery.mjs reads
 * its rows from those two files and carries none of its own, so the battery is these 32 rows). Each payload goes into a
 * throwaway copy before the pinned opener ("before") or after one blank line at EOF ("eof"), exactly as battery.mjs
 * mutates it. `pin` is the refusal the pin itself must give (null: the pin stays equal to the committed text); `page` is
 * whether the page check alone refuses the copy.
 */
interface BatteryRow {
  readonly id: string;
  readonly kind: "control" | "falsifier";
  readonly doc: keyof typeof PINNED;
  readonly at: "before" | "eof";
  readonly payload: string;
  readonly construct: string;
  readonly pin: string | null;
  readonly page: boolean;
}

const DUPLICATE_DOC_10 = `## Cancelling a background workflow\n\n${WEAKER_DOC_10}`;
const DUPLICATE_DOC_15 = "**VC-1: Pi -> Claude SDK workflow** (P0)\n- Ctrl-C stops a background workflow; no explicit cancel path is needed.";
const DUPLICATE_TRACE = `## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)\n\n${WEAKER_TRACE}`;
const TABLE_HEAD = "| h | h | h |\n| - | - | - |\n";

const BATTERY: readonly BatteryRow[] = [
  { id: "K0", kind: "control", doc: "TRACE", at: "eof", payload: "## Addendum control\n\nplain text", construct: "true green: a plain section at EOF after the TRACEABILITY wb-2t2 section", pin: null, page: false },
  { id: "K1", kind: "control", doc: "TRACE", at: "before", payload: "<!-- gate -->", construct: "true green: one complete comment alone on its line", pin: null, page: false },
  { id: "K2", kind: "control", doc: "DOC_10", at: "before", payload: "`<div hidden>`", construct: "true green: a tag inside a closed code span", pin: null, page: false },
  { id: "K3", kind: "control", doc: "TRACE", at: "before", payload: "[x](a`b) c`", construct: "false-closed (the page shows the section): a backtick in a link destination, refused by C3", pin: C3_REFUSAL, page: false },
  { id: "K4", kind: "control", doc: "DOC_15", at: "before", payload: "<!-- gate --> `x`", construct: "false-closed (the page shows the label): text after -->, refused by C1 and by the page check", pin: C1_REFUSAL, page: true },
  { id: "K5", kind: "control", doc: "DOC_10", at: "eof", payload: `Note <!-- draft -->\n\n${DUPLICATE_DOC_10}`, construct: "true red: a closed inline comment, then a visible EOF duplicate of the docs/10 heading", pin: `"${DOC_10_HEADING}" names 2 sections`, page: false },
  { id: "H2", kind: "control", doc: "TRACE", at: "before", payload: '<div hidden title="<">', construct: "true red: a hidden div whose attribute holds <", pin: RAW_HTML, page: true },
  { id: "H5", kind: "control", doc: "DOC_15", at: "before", payload: "<script", construct: "true red: an unclosed <script line before the VC-1 label", pin: RAW_HTML, page: true },
  { id: "G1", kind: "falsifier", doc: "TRACE", at: "before", payload: "<!-- gate --> `<div hidden>`", construct: "comment-end line: a code span after --> is raw HTML in marked's comment block", pin: C1_REFUSAL, page: true },
  { id: "G2", kind: "falsifier", doc: "DOC_10", at: "before", payload: "<!-- gate --> \\<div hidden>", construct: "comment-end line: an escaped < after --> is raw HTML in marked's comment block", pin: C1_REFUSAL, page: true },
  { id: "G3", kind: "falsifier", doc: "DOC_15", at: "before", payload: "<!--\ngate note\n--> `<div hidden>`", construct: "comment-end line: a three-line comment whose closing line goes on with a code span", pin: C1_REFUSAL, page: true },
  { id: "G4", kind: "falsifier", doc: "TRACE", at: "before", payload: "[x](a`b) <div hidden> c`", construct: "link destination: marked consumes the backtick the view paired as a code span", pin: C3_REFUSAL, page: true },
  { id: "G5", kind: "falsifier", doc: "DOC_15", at: "before", payload: '[x](a "t`") <div hidden> c`', construct: "link title: marked consumes the backtick the view paired as a code span", pin: C3_REFUSAL, page: true },
  { id: "G6", kind: "falsifier", doc: "DOC_10", at: "before", payload: "![x](a`b) <div hidden> c`", construct: "image destination: marked consumes the backtick the view paired as a code span", pin: C3_REFUSAL, page: true },
  { id: "G7", kind: "falsifier", doc: "TRACE", at: "before", payload: "https://example.com/`c <div hidden> d`", construct: "GFM extended autolink from scheme://: the URL consumes the backtick", pin: C4_REFUSAL, page: true },
  { id: "G8", kind: "falsifier", doc: "DOC_10", at: "before", payload: "www.example.com/`c <div hidden> d`", construct: "GFM extended autolink from www.: the URL consumes the backtick", pin: C4_REFUSAL, page: true },
  { id: "G9", kind: "falsifier", doc: "TRACE", at: "before", payload: "- item\n  ```\n<div hidden>\n```", construct: "container-indented fence: marked closes the list item's fence where the item ends", pin: C6_REFUSAL, page: true },
  { id: "G10", kind: "falsifier", doc: "DOC_10", at: "before", payload: "<a`b@c> `<div hidden>` x", construct: "autolink precedence: an email-like <...> holding a backtick is no autolink in marked", pin: C4_REFUSAL, page: true },
  { id: "G11", kind: "falsifier", doc: "TRACE", at: "before", payload: `<a:${SOH}\`> \`<div hidden>\` x`, construct: "autolink superset: a one-letter scheme, a control octet and a backtick", pin: C4_REFUSAL, page: true },
  { id: "G12", kind: "falsifier", doc: "DOC_15", at: "before", payload: "<!-- gate --> `<template>`", construct: "comment-end line: a template tag after -->", pin: C1_REFUSAL, page: true },
  { id: "G13", kind: "falsifier", doc: "TRACE", at: "before", payload: "<!-- gate --> `<style>`", construct: "comment-end line: a style tag after -->", pin: C1_REFUSAL, page: true },
  { id: "G14", kind: "falsifier", doc: "DOC_10", at: "eof", payload: `Note <!-- draft\nend -->\n\n${DUPLICATE_DOC_10}`, construct: "over-hide: an inline <!-- closing on the next line, then a visible EOF duplicate of the docs/10 heading", pin: C2_REFUSAL, page: false },
  { id: "G15", kind: "falsifier", doc: "DOC_15", at: "eof", payload: `Note <!-- draft\nend -->\n\n${DUPLICATE_DOC_15}`, construct: "over-hide: an inline <!-- closing on the next line, then a visible EOF duplicate of the VC-1 label", pin: C2_REFUSAL, page: false },
  { id: "G16", kind: "falsifier", doc: "TRACE", at: "eof", payload: `## Addendum\n\nNote <!-- draft\nend -->\n\n${DUPLICATE_TRACE}`, construct: "over-hide: an inline <!-- closing on the next line, then a visible EOF duplicate of the TRACEABILITY wb-2t2 heading", pin: C2_REFUSAL, page: false },
  { id: "G17", kind: "falsifier", doc: "DOC_10", at: "eof", payload: `Note <!-- draft\n\n<!-- x -->\n\n${DUPLICATE_DOC_10}`, construct: "over-hide: a stray '<!-- draft' paragraph, then a visible EOF duplicate of the docs/10 heading", pin: C2_REFUSAL, page: false },
  { id: "G9b", kind: "falsifier", doc: "TRACE", at: "before", payload: "- item\n  ```\n<div hidden>\n```\n\nfiller paragraph", construct: "container-indented fence, then a filler paragraph", pin: C6_REFUSAL, page: true },
  { id: "G11b", kind: "falsifier", doc: "TRACE", at: "before", payload: `<ab:${SOH}\`> \`<div hidden>\` x`, construct: "autolink superset: a control octet the old view's autolink admitted and marked's grammar does not", pin: C4_REFUSAL, page: true },
  { id: "G18", kind: "falsifier", doc: "DOC_10", at: "before", payload: `${TABLE_HEAD}| \`a | <style> | b\` |`, construct: "GFM table: cells split at | before code spans pair (style)", pin: C5_REFUSAL, page: true },
  { id: "G18b", kind: "falsifier", doc: "TRACE", at: "before", payload: `${TABLE_HEAD}| \`a | <div hidden> | b\` |`, construct: "GFM table: cells split at | before code spans pair (div; the cell closes it)", pin: C5_REFUSAL, page: true },
  { id: "G19", kind: "falsifier", doc: "DOC_15", at: "before", payload: `${TABLE_HEAD}| \`a | <script> | b\` |`, construct: "GFM table: cells split at | before code spans pair (script)", pin: C5_REFUSAL, page: true },
  { id: "G20", kind: "falsifier", doc: "TRACE", at: "before", payload: "<!-- gate -->`<details>`", construct: "comment-end line: a details tag right after -->", pin: C1_REFUSAL, page: true },
  { id: "G21", kind: "falsifier", doc: "DOC_10", at: "before", payload: "1. item\n   ```\n<div hidden>\n```\n\nfiller paragraph", construct: "container-indented fence in an ordered list, then a filler paragraph", pin: C6_REFUSAL, page: true },
];

/** A throwaway copy of the row's document with its payload placed as battery.mjs places it. */
function batteryCopy(row: BatteryRow): string {
  const pinned = PINNED[row.doc];
  const doc = lf(read(pinned.path));
  return row.at === "eof" ? withTail(doc, row.payload) : withOnce(doc, pinned.anchor, `\n\n${row.payload}${pinned.anchor}`);
}

describe("wb-2t2 the gate-1 battery of record as a negative-control table (row 403, folded in under owner R1=(b))", () => {
  it("the table is the whole battery: 32 rows, 8 controls (K0-K5, H2, H5) and 24 falsifiers, each id once", () => {
    expect(new Set(BATTERY.map((row) => row.id)).size).toBe(32);
    expect(BATTERY.filter((row) => row.kind === "control").map((row) => row.id)).toEqual(["K0", "K1", "K2", "K3", "K4", "K5", "H2", "H5"]);
    expect(BATTERY.filter((row) => row.kind === "falsifier")).toHaveLength(24);
    expect(BATTERY.filter((row) => row.kind === "falsifier" && row.pin === null)).toEqual([]);
    expect(BATTERY.filter((row) => row.kind === "falsifier" && row.page).map((row) => row.id)).toHaveLength(20);
  });

  for (const row of BATTERY) {
    it(`${row.id} (${row.kind}) ${row.construct}`, () => {
      const copy = batteryCopy(row);
      const pinned = PINNED[row.doc];
      if (row.pin === null) expect(pinned.pin(copy)).toBe(pinned.committed);
      else expect(pinned.pin(copy)).toMatch(refusedBy(row.pin));
      expect(rawHtmlRefusal(copy) !== null, "the page check alone refuses the copy").toBe(row.page);
    });
  }
});

describe("wb-2t2 the documented cancel path exists in src", () => {
  it("the workflow dialog offers an x stop hint wired to a kill action", () => {
    const dialog = read("src/ui/workflow-dialog.ts");
    expect(dialog).toContain('hints.push("x stop")');
    expect(dialog).toContain('kind: "kill"');
  });

  it("the workflow menu announces the stop it performs", () => {
    expect(read("src/ui/workflow-menu.ts")).toContain("Stopped workflow");
  });

  it("the fleet-list inactive footer names the stop path while a workflow is live", () => {
    expect(read(FLEET_LIST)).toContain(FOOTER);
  });
});
