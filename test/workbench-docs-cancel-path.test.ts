import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// wb-2t2 acceptance: "docs quote the receipt; no src change without an owner
// ruling; TRACEABILITY row cites wb-a2g.3." Scope (A): docs/15 + docs/10 state
// the measured behavior and the explicit cancel path. Scope (B) landed at
// 4c5744d (fleet-list inactive footer names the stop path); the docs state it.
//
// PIN RULE (owner ruling 2026-10-16T14:21Z R1=(a); gate-1 2026-10-16T23:58Z U1):
// every docs pin is SLICE EQUALITY of a rendered section, never token presence.
// A pinned section is located by its committed heading line in the rendered
// view; that heading must name exactly one section of the view, in any heading
// form, before anything is sliced. The slice runs from the heading through the
// line before the next level-1/2 heading, or EOF (the docs/15 VC-1 block also
// ends at the next `**VC-<n>:` label), and is compared by strict equality with
// the committed text below. The same view serves the uniqueness check and the
// extraction. The ONLY normalization: trailing spaces, tabs and carriage
// returns are trimmed from each line, runs of blank lines collapse to one, and
// leading and trailing blank lines are dropped.
//
// VIEW MODEL (gate-1 U2, rendered-text docs truth). It may hide or refuse more
// than a renderer would, never less:
// - fenced code (``` fences; an unterminated fence runs to EOF) is visible
//   code: its lines stay in the view verbatim but are never a heading, never a
//   comment and never end a section;
// - an HTML comment is hidden. An opener that starts a line begins an HTML
//   block: it ends at the first later `-->`, and with none it hides everything
//   to EOF (marked emits the rest of the document raw and a browser runs the
//   unclosed comment to the end). Any other opener ends only on its own line,
//   and with no `-->` there it hides everything after it: stricter than marked,
//   which closes it later in the same paragraph or escapes it as text;
// - a ~~~ fence or a raw HTML tag outside code is not modelled and refuses the
//   whole document (fail-closed; marked renders a ~~~ fence as code, and an
//   element such as `<div hidden>`, `<details>` or `<style>` can hide text that
//   is not inside it). Code spans, backslash escapes and autolinks are
//   modelled, so they never trigger it.

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

interface ViewLine {
  readonly text: string;
  readonly code: boolean;
}

type View = { readonly ok: true; readonly lines: readonly ViewLine[] } | { readonly ok: false; readonly reason: string };

const FENCE_OPEN = /^ {0,3}(`{3,})[^`]*$/;
const FENCE_CLOSE = /^ {0,3}(`{3,})[ \t]*$/;
const TILDE_FENCE = /^ {0,3}~{3,}/;
const BLOCK_COMMENT = /^ {0,3}<!--/;
const RAW_HTML_TAG = /^(?:<[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\/?>|<\/[A-Za-z][A-Za-z0-9-]*\s*>|<\?|<![A-Za-z[])/;
const AUTOLINK = /^(?:<[A-Za-z][A-Za-z0-9+.-]{1,31}:[^\s<>]*>|<[^\s<>@\\]+@[^\s<>\\]+>)/;
const ASCII_PUNCTUATION = /^[!-/:-@[-`{-~]$/;

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
  readonly hidesRest: boolean;
  readonly refusal: string | null;
}

/** Visible text of one line outside fenced code and block comments: code spans, escapes, inline comments, raw HTML. */
function scanInline(segment: string): InlineScan {
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
      const end = close < 0 ? index + run : close + run;
      visible += segment.slice(index, end);
      index = end;
      continue;
    }
    if (segment.startsWith("<!--", index)) {
      const close = segment.indexOf("-->", index + 2);
      if (close < 0) return { visible, hidesRest: true, refusal: null };
      index = close + 3;
      continue;
    }
    if (char === "<") {
      const rest = segment.slice(index);
      const link = AUTOLINK.exec(rest)?.[0];
      if (link !== undefined) {
        visible += link;
        index += link.length;
        continue;
      }
      if (RAW_HTML_TAG.test(rest)) return { visible, hidesRest: false, refusal: `raw HTML is not modelled: ${rest.slice(0, 32)}` };
    }
    visible += char;
    index++;
  }
  return { visible, hidesRest: false, refusal: null };
}

/** The rendered view of a markdown document under the VIEW MODEL above, or the reason the model refuses it. */
function renderView(markdown: string): View {
  const lines: ViewLine[] = [];
  let fence = 0;
  let inBlockComment = false;
  for (const line of markdown.split("\n")) {
    if (fence > 0) {
      lines.push({ text: line, code: true });
      const close = FENCE_CLOSE.exec(line)?.[1] ?? "";
      if (close.length >= fence) fence = 0;
      continue;
    }
    let prefix = "";
    let segment = line;
    if (inBlockComment) {
      const close = line.indexOf("-->");
      if (close < 0) continue;
      inBlockComment = false;
      segment = line.slice(close + 3);
    } else {
      const open = FENCE_OPEN.exec(line)?.[1];
      if (open !== undefined) {
        fence = open.length;
        lines.push({ text: line, code: true });
        continue;
      }
      if (TILDE_FENCE.test(line)) return { ok: false, reason: "a ~~~ fence is not modelled" };
      if (BLOCK_COMMENT.test(line)) {
        const opener = line.indexOf("<!--");
        const close = line.indexOf("-->", opener + 2);
        prefix = line.slice(0, opener);
        if (close < 0) {
          inBlockComment = true;
          lines.push({ text: prefix, code: false });
          continue;
        }
        segment = line.slice(close + 3);
      }
    }
    const scan = scanInline(segment);
    if (scan.refusal !== null) return { ok: false, reason: scan.refusal };
    lines.push({ text: prefix + scan.visible, code: false });
    if (scan.hidesRest) break;
  }
  return { ok: true, lines };
}

/** View texts, or one refusal line, for the model rows below. */
function texts(view: View): readonly string[] {
  return view.ok ? view.lines.map((line) => line.text) : [`REFUSED: ${view.reason}`];
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

/** A view line without its block-quote markers, one list marker and its ATX heading markup. */
function bareText(text: string): string {
  return text
    .replace(/^(?: {0,3}>[ \t]?)+/, "")
    .replace(/^ {0,3}(?:[-+*]|\d{1,9}[.)])[ \t]+/, "")
    .replace(/^ {0,3}#{1,6}(?:[ \t]+|$)/, "")
    .replace(/[ \t]+#+[ \t]*$/, "")
    .trim();
}

/** ATX heading level of a view line; 0 for code and for every other line. */
function atxLevel(line: ViewLine): number {
  if (line.code) return 0;
  return (/^ {0,3}(#{1,6})(?:[ \t]|$)/.exec(line.text)?.[1] ?? "").length;
}

/** True when the view line at `index` is a heading in any form: ATX (quoted, listed, indented) or setext. */
function isHeadingForm(lines: readonly ViewLine[], index: number): boolean {
  const line = lines[index];
  if (line === undefined || line.code) return false;
  const inner = line.text.replace(/^(?: {0,3}>[ \t]?)+/, "").replace(/^ {0,3}(?:[-+*]|\d{1,9}[.)])[ \t]+/, "");
  if (/^ {0,3}#{1,6}(?:[ \t]|$)/.test(inner)) return true;
  const next = lines[index + 1];
  return inner.trim() !== "" && next !== undefined && !next.code && /^ {0,3}(?:=+|-+)[ \t]*$/.test(next.text);
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

/** The level-2 section under `heading`: unique in any heading form, bounded by the next level-1/2 heading or EOF. */
function sectionOf(markdown: string, heading: string): string {
  const view = renderView(markdown);
  const title = bareText(heading);
  const names = view.ok ? view.lines.filter((_, index) => isHeadingForm(view.lines, index) && bareText(view.lines[index]?.text ?? "") === title).length : 0;
  return sliceFrom(view, heading, names, closesLevel2);
}

/** The docs/15 VC-1 block: the unique VC-1 label to the next `**VC-<n>:` label or level-1/2 heading. */
function vc1BlockOf(markdown: string): string {
  const view = renderView(markdown);
  const names = view.ok ? view.lines.filter((line) => !line.code && bareText(line.text).replace(/^(?:\*\*|__)/, "").startsWith("VC-1:")).length : 0;
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
  it("a closed comment hides exactly its own span", () => {
    expect(texts(renderView("a <!-- x --> b\n<!-- y -->\nc <!--> d <!---> e\nf\n<!-- g\nh\ni --> j"))).toEqual(["a  b", "", "c  d  e", "f", "", " j"]);
  });

  it("an unterminated opener at the start of a line hides everything to EOF", () => {
    const doc = "## A\n\nkept\n<!--\n## B\n\nhidden\n";
    expect(texts(renderView(doc))).toEqual(["## A", "", "kept", ""]);
    expect(sectionOf(doc, "## B")).toBe('REFUSED: "## B" names 0 sections');
    expect(sectionOf(doc, "## A")).toBe("## A\n\nkept");
  });

  it("an inline opener that does not close on its own line hides everything after it (stricter than marked)", () => {
    expect(texts(renderView("p <!-- q\nr -->\n## B\nhidden"))).toEqual(["p "]);
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
    const doc = read(TRACE);
    const anchor = "\n\n## VC-1 measured gap: Ctrl-C does not stop a background workflow (wb-2t2)";
    expect(doc.split(anchor)).toHaveLength(2);
    expect(sectionOf(doc.replace(anchor, () => `\n\n<!--${anchor}`), TRACE_2T2_HEADING)).toBe(`REFUSED: "${TRACE_2T2_HEADING}" names 0 sections`);
  });

  it("S3b falsifier: an unterminated <!-- right after the docs/10 heading leaves the heading alone in the slice", () => {
    const doc = read(DOC_10);
    const anchor = "## Cancelling a background workflow\n\nMeasured by the wb-a2g.3 live operator receipt";
    expect(doc.split(anchor)).toHaveLength(2);
    const opened = doc.replace(anchor, () => anchor.replace("\n\n", "\n<!--\n\n"));
    expect(sectionOf(opened, DOC_10_HEADING)).toBe("## Cancelling a background workflow");
  });

  it("control: a ```-fenced copy of the docs/10 heading before the section leaves the slice equal", () => {
    const doc = read(DOC_10);
    const anchor = "## Cancelling a background workflow\n\nMeasured by the wb-a2g.3 live operator receipt";
    expect(doc.split(anchor)).toHaveLength(2);
    const fenced = "```\n## Cancelling a background workflow\n```\n\n";
    expect(sectionOf(doc.replace(anchor, () => `${fenced}${anchor}`), DOC_10_HEADING)).toBe(DOC_10_SECTION);
  });
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
