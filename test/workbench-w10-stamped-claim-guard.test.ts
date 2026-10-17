/**
 * RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R6 (wb-2j3.5): a hermetic default-gate guard over the W10 claim row of
 * docs/workbench/feature-matrix.md (the "node() RF noncommitted context preview capability" row). Statement pinned: "the
 * feature-matrix W10 row must cite at least one RF receipt row stamped with the release measured during that run, and the
 * stamped release must match the R2 carrier." It reads docs/workbench/receipts/ (the receipt convention, wb-xox), never
 * TRACEABILITY.md (frozen; test/workbench-traceability-freeze.test.ts), and imports the R2 carrier, never an rf@ literal.
 *
 * READING (respin on gate-3 row 487; owner ruling R1(a): the docs-pin floor binds this guard over the acceptance's
 * "string-level census" wording). The judge reads each page AS IT RENDERS: marked 18.0.11 (GFM, pinned exactly as a
 * devDependency) lexes it, the lexer test/workbench-receipts-convention.test.ts and test/workbench-docs-cancel-path.test.ts
 * already use. One lex of a page serves every count and every extraction on it (same view, 6hb.10).
 * - PAGE CHECK (rendered-text truth, 9x5.17: strip reading for comments, forbid reading for raw HTML): an html token that is
 *   exactly one complete comment renders nothing and is stripped; every other html token, block or inline, is refused,
 *   because raw HTML can hide text the lexer still reads. One carve-out, outside the W10 section only: a bare tag (`<name>`
 *   or `</name>`, no attributes) inside a GFM table cell naming an element that cannot leave its cell or hide what follows
 *   it (never a raw-text, template, table-structure, document or foreign-content element) is tolerated and stripped; today
 *   that is exactly the invoke:<id> cells of the W03 and W06 rows. The receipt and INDEX files admit complete comments only.
 * - RENDERED TEXT: text, backslash escapes, code spans, code blocks and link text (never a destination or a title), with
 *   numeric and common named character references decoded in text; images and struck-through (del) text are not asserted;
 *   html tokens render nothing; in a table cell every white-space run reads as one space. Fenced and indented code is
 *   visible code, never a table row.
 * - SECTION (heading uniqueness 6hb.9, section bound cax.24): exactly one heading anywhere on the page (any level, ATX or
 *   setext, at any list or block quote depth) reads as a W10 heading under the FOLDED KEY; it is the top-level level-2
 *   heading, and the section runs from it to the next top-level level-1/2 heading or EOF.
 * - CLAIM ROW (same view and uniqueness, 6hb.10): a row of any table on the page (header or body, at any depth) is a claim
 *   row when its rendered first cell reads as beginning with CLAIM_KEY under the FOLDED KEY. Exactly one exists, and it is a
 *   body row of a top-level table inside the W10 section whose header names an Evidence column. The cells are read, never
 *   frozen: only the stamped sentence, the legacy ids and the rf@ release tokens are judged (wb-2j3.4 re-cuts this row).
 * - STAMPED SENTENCE (bounded clause, 6hb.7: slice equality, never includes-anywhere): the rendered Evidence cell splits into
 *   sentences at each ". "; exactly one reads as beginning with STAMP_KEY, and it EQUALS stampSentence() with its slots
 *   filled from the receipt it names and from the carrier: receipts/<bead>.md exists; its newest rendered
 *   RF_PREVIEW_RECEIPT {json} line (document order; receipts are append-only) carries a non-empty string cli_version equal to
 *   the carrier release; the cmd_* id is one the receipt entry carrying that line also renders (entries run between
 *   top-level level-1/2 headings), never a legacy unstamped id; every release slot reads that stamped release.
 * - HISTORY: the three 0.1.583-era unstamped ids stay as whole tokens in the rendered Evidence cell (receipts are added,
 *   history is never rewritten). STALE LITERAL: outside "the earlier rf@<x> literal is retired", every rf@<release> the
 *   rendered row shows is the carrier release.
 * - FOLDED KEY (receipts-convention form): character references decoded, NFKC, white-space runs one space, control, format
 *   and combining code points dropped, case folded; each remaining non-ASCII code point matches any 0-3 characters, so a
 *   non-ASCII look-alike counts.
 * FALSIFIER FLOOR (U5): the gate-3 row-487 battery (G1-G9 with G6b evasions, K1-K3 kills, R1-R2 rendering-neutral controls),
 * authored by the gate as raw-markdown edits, is carried below as the same raw edits of the committed docs, judged in memory:
 * every G and K variant is judged unstamped and every control clean. The F rows keep the fefe71f protections; the H rows
 * add hiding and duplication shapes outside the battery; the C rows are rendering-neutral controls. Every look-alike is
 * built with String.fromCodePoint; none is typed raw.
 * RESIDUALS (named, not closed): ASCII look-alikes (I for l, 0 for O) in a heading or a first cell are not folded; a
 * tolerated bare cell tag outside W10 is assumed inert; styling applied from outside the page; a sentence elsewhere in the
 * row that contradicts the stamped one (the slice pins the stamped sentence, not the row's other prose).
 * Spawns nothing; writes nothing; reads three docs files and imports the carrier.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Lexer, type Token, type Tokens, type TokensList } from "marked";
import { describe, expect, it } from "vitest";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";

const ROOT = process.cwd();
const MATRIX = "docs/workbench/feature-matrix.md";
const INDEX = "docs/workbench/receipts/INDEX.md";
const W10_KEY = "w10";
const CLAIM_KEY = "node() rf noncommitted context preview capability";
const STAMP_KEY = "stamped receipt row";
const EVIDENCE_HEADER = "Evidence";
/** The 0.1.583-era receipts the row cited before the stamp: live runs that recorded no measured producer release. */
const LEGACY_UNSTAMPED_IDS = ["cmd_994da817d4cd", "cmd_7e50a487da08", "cmd_386a32a0323b"];
const RELEASE = "[0-9]+(?:\\.[0-9]+)*";
const BEAD = "wb-[0-9a-z]+(?:\\.[0-9]+)*";
const RELEASE_TOKEN_ALL = /rf@([0-9]+(?:\.[0-9]+)*)/g;
/** The only clause that may name a release other than the carrier's: the retirement of the old literal. */
const RETIREMENT_CLAUSE_ALL = /the earlier rf@[0-9]+(?:\.[0-9]+)* literal is retired/g;
const CMD_ID_ALL = /cmd_[0-9a-f]{12}/g;
const STAMP_MARK = "RF_PREVIEW_RECEIPT {";
/** Elements a bare cell tag may never name: they can leave their cell, swallow what follows, or hide by construction. */
const ESCAPING_ELEMENTS: ReadonlySet<string> = new Set([
  "script", "style", "textarea", "title", "xmp", "iframe", "noembed", "noframes", "noscript", "plaintext", "template",
  "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr", "td", "th", "html", "head", "body", "frameset",
  "frame", "svg", "math", "select", "option", "optgroup", "object", "embed",
]);

/** The W10 row exactly as it read at 9df9a03: three live receipts, no measured-release stamp, contractSource rf@0.1.583. */
const ROW_AT_9DF9A03 = "| node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance and zero durable writes | landed-gated | src/workbench/providers/reactivefiber.ts (reactivefiber.render.preview v1; contractSource rf@0.1.583 context.render --no-commit). Tests: test/workbench-native-rf-preview.test.ts, test/workbench-provider-envelope-audit.test.ts, test/workbench-ecosystem-native.test.ts, test/workbench-native-ecosystem.test.ts, test/workbench-provider-lifecycle.test.ts. TRACEABILITY 'Native ecosystem receipts': real RF noncommitted context cmd_994da817d4cd (initialized disposable workspace; output + graph provenance, no durable render ID); custody caps cmd_7e50a487da08 (malformed JSON, stdout/stderr caps, TERM/KILL cleanup); corrected envelope suite cmd_386a32a0323b (actual operation/workspace identity, zero noncommitted storage writes). Bead wb-x32 (open). | Bead wb-x32 open: 'Full interop contract remains open.' Preview deliberately yields null render/transaction IDs (no durable render); W10 acceptance is 'real render or honest blocker' - the landed slice is the noncommitted preview via the CLI envelope, not a committed render or production TS SDK interop. |";

type ReadReceipt = (name: string) => string | undefined;

interface StampSlots {
  date: string;
  receipt: string;
  cmd: string;
  release: string;
  pinBead: string;
}

/** The committed stamped sentence as the page renders it (code span markup dropped), slots filled. */
function stampSentence(slots: StampSlots): string {
  return `Stamped receipt row (R6/R8, ${slots.date}): receipts/${slots.receipt}.md, gated forge run rf-preview ${slots.cmd} against the operator-provisioned installed rf, measured release ${slots.release} (RF_PREVIEW_RECEIPT cli_version ${slots.release} with the R7 identity assertions in place); the R2 carrier REACTIVE_FIBER_CONTRACT_SOURCE is re-pinned to rf@${slots.release} from that receipt (${slots.pinBead}).`;
}

/** stampSentence() read back: date, receipt, cmd, the three release slots in order, pinning bead. */
const STAMP_SHAPE = new RegExp(
  `^Stamped receipt row \\(R6/R8, ([0-9]{4}-[0-9]{2}-[0-9]{2})\\): receipts/(${BEAD})\\.md, gated forge run rf-preview (cmd_[0-9a-f]{12}) against the operator-provisioned installed rf, measured release (${RELEASE}) \\(RF_PREVIEW_RECEIPT cli_version (${RELEASE}) with the R7 identity assertions in place\\); the R2 carrier REACTIVE_FIBER_CONTRACT_SOURCE is re-pinned to rf@(${RELEASE}) from that receipt \\((${BEAD})\\)\\.$`,
);

function carrierRelease(carrier: string): string | undefined {
  return /^rf@([0-9]+(?:\.[0-9]+)*):/.exec(carrier)?.[1];
}

const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: String.fromCodePoint(0xa0),
};

/** Numeric and the common named character references decoded; any other named reference becomes one non-ASCII stand-in. */
function decodeReferences(text: string): string {
  return text.replace(/&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    return NAMED_REFERENCES[name ?? ""] ?? String.fromCodePoint(0xfffd);
  });
}

/** The FOLDED KEY of rendered text (see the header). */
function foldKey(text: string): string {
  return decodeReferences(text)
    .normalize("NFKC")
    .replace(/[\s\p{Zs}]+/gu, " ")
    .replace(/[\p{Cc}\p{Cf}\p{Mn}\p{Me}]/gu, "")
    .replace(/ +/g, " ")
    .trim()
    .toLowerCase();
}

/** True when some prefix of `folded` reads as `key`: ASCII matches itself, each non-ASCII code point any 0-3 characters. */
function readsAsPrefix(folded: string, key: string): boolean {
  let reach = new Set<number>([0]);
  for (const char of folded) {
    if (reach.has(key.length)) return true;
    const wild = (char.codePointAt(0) ?? 0) > 0x7f;
    const next = new Set<number>();
    for (const position of reach) {
      if (wild) {
        for (let width = 0; width <= 3 && position + width <= key.length; width++) next.add(position + width);
      } else if (key[position] === char) {
        next.add(position + 1);
      }
    }
    if (next.size === 0) return false;
    reach = next;
  }
  return reach.has(key.length);
}

function isW10Heading(folded: string): boolean {
  return readsAsPrefix(folded, W10_KEY) && !/^w10[0-9]/.test(folded);
}

const isTable = (token: Token): token is Tokens.Table => token.type === "table";
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isHtml = (token: Token): token is Tokens.HTML => token.type === "html";
const isLink = (token: Token): token is Tokens.Link => token.type === "link";
/** Tokens whose text the page does not assert: hidden (html), pictures (image), struck through (del), or never shown. */
const UNASSERTED = new Set(["html", "image", "del", "def", "space", "hr", "checkbox"]);

/** Every token in `tokens` at any depth (cells, list items, block quotes, inline children), with whether it sits in a cell. */
function visit(tokens: readonly Token[], fn: (token: Token, inCell: boolean) => void, inCell = false): void {
  for (const token of tokens) {
    fn(token, inCell);
    if (isTable(token)) {
      for (const cell of [...token.header, ...token.rows.flat()]) visit(cell.tokens, fn, true);
    } else if (isList(token)) {
      for (const item of token.items) visit(item.tokens, fn, inCell);
    } else if ("tokens" in token && Array.isArray(token.tokens)) {
      visit(token.tokens, fn, inCell);
    }
  }
}

/** The text `tokens` render (see RENDERED TEXT): blocks joined by `separator`, inline runs concatenated. */
function rendered(tokens: readonly Token[], separator: string): string {
  const parts: string[] = [];
  for (const token of tokens) {
    if (UNASSERTED.has(token.type)) continue;
    if (token.type === "br") parts.push(" ");
    else if (token.type === "codespan" || token.type === "code" || token.type === "escape") parts.push(String(token.text));
    else if (isList(token)) parts.push(token.items.map((item) => rendered(item.tokens, "\n")).join("\n"));
    else if (isTable(token)) parts.push([token.header, ...token.rows].map((row) => row.map((cell) => rendered(cell.tokens, "")).join(" | ")).join("\n"));
    else if (token.type === "blockquote" && "tokens" in token && Array.isArray(token.tokens)) parts.push(rendered(token.tokens, "\n"));
    else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) parts.push(rendered(token.tokens, ""));
    else if ("text" in token && typeof token.text === "string") parts.push(decodeReferences(token.text));
  }
  return parts.join(separator);
}

function cellText(cell: Tokens.TableCell): string {
  return rendered(cell.tokens, "").replace(/[ \t\n\r\f]+/g, " ").trim();
}

/** The hrefs of the links a page asserts (the same skip set as rendered()). */
function assertedHrefs(tokens: readonly Token[]): string[] {
  const hrefs: string[] = [];
  for (const token of tokens) {
    if (UNASSERTED.has(token.type)) continue;
    if (isLink(token)) hrefs.push(token.href);
    if (isTable(token)) {
      for (const cell of [...token.header, ...token.rows.flat()]) hrefs.push(...assertedHrefs(cell.tokens));
    } else if (isList(token)) {
      for (const item of token.items) hrefs.push(...assertedHrefs(item.tokens));
    } else if ("tokens" in token && Array.isArray(token.tokens)) {
      hrefs.push(...assertedHrefs(token.tokens));
    }
  }
  return hrefs;
}

/** One complete HTML comment and only white space around it, as a browser ends it. */
function isCompleteComment(raw: string): boolean {
  const text = raw.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "");
  if (text === "<!-->" || text === "<!--->") return true;
  if (!text.startsWith("<!--") || !text.endsWith("-->") || text.length < 7) return false;
  const body = text.slice(4, -3);
  return !body.startsWith(">") && !body.startsWith("->") && !body.includes("-->") && !body.includes("--!>");
}

/** A bare start or end tag (no attributes) naming an element outside ESCAPING_ELEMENTS. */
function isBareConfinedTag(raw: string): boolean {
  const name = /^<\/?([A-Za-z][A-Za-z0-9-]*)[ \t]*\/?>$/.exec(raw)?.[1];
  return name !== undefined && !ESCAPING_ELEMENTS.has(name.toLowerCase());
}

/** Every html token of the page that is not a complete comment, unless it is a bare in-cell tag where `admitsCellTags`. */
function htmlRefusals(tokens: TokensList, label: string, admitsCellTags: (top: number) => boolean): string[] {
  const refusals: string[] = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token, inCell) => {
      if (!isHtml(token) || isCompleteComment(token.raw)) return;
      if (inCell && admitsCellTags(index) && isBareConfinedTag(token.raw)) return;
      refusals.push(`${label} holds raw HTML ${JSON.stringify(token.raw.slice(0, 60))} that can hide rendered text (only complete comments are admitted here)`);
    });
  }
  return refusals;
}

interface Section {
  start: number;
  end: number;
}

/** The W10 section bounds, refused unless exactly one heading on the page reads as W10 and it is the top-level level-2 one. */
function w10Section(tokens: TokensList): { section?: Section; findings: string[] } {
  const found: Array<{ top: number; nested: boolean; depth: number }> = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token) => {
      if (isHeading(token) && isW10Heading(foldKey(rendered(token.tokens, "")))) found.push({ top: index, nested: token !== top, depth: token.depth });
    });
  }
  const only = found[0];
  if (found.length !== 1 || only === undefined) return { findings: [`${found.length} headings on the page read as a W10 heading, not exactly one`] };
  if (only.nested || only.depth !== 2) return { findings: ["the one heading that reads as a W10 heading is not the top-level level-2 heading"] };
  let end = tokens.length;
  for (let index = only.top + 1; index < tokens.length; index++) {
    const token = tokens[index];
    if (token !== undefined && isHeading(token) && token.depth <= 2) {
      end = index;
      break;
    }
  }
  return { section: { start: only.top, end }, findings: [] };
}

interface ClaimRow {
  top: number;
  nested: boolean;
  header: boolean;
  table: Tokens.Table;
  cells: Tokens.TableCell[];
}

/** Every table row on the page (header or body, any depth) whose rendered first cell reads as beginning with CLAIM_KEY. */
function claimRows(tokens: TokensList): ClaimRow[] {
  const found: ClaimRow[] = [];
  for (const [index, top] of tokens.entries()) {
    visit([top], (token) => {
      if (!isTable(token)) return;
      const rows: Array<[boolean, Tokens.TableCell[]]> = [[true, token.header], ...token.rows.map((row): [boolean, Tokens.TableCell[]] => [false, row])];
      for (const [header, cells] of rows) {
        const first = cells[0];
        if (first !== undefined && readsAsPrefix(foldKey(cellText(first)), CLAIM_KEY)) found.push({ top: index, nested: token !== top, header, table: token, cells });
      }
    });
  }
  return found;
}

interface ClaimView {
  findings: string[];
  evidence?: string;
  row?: string;
}

/** The rendered W10 claim row of a feature-matrix page: its Evidence cell and its whole row, or why it cannot be read. */
function w10View(page: string): ClaimView {
  const tokens = new Lexer({ gfm: true }).lex(page);
  const { section, findings } = w10Section(tokens);
  findings.push(...htmlRefusals(tokens, MATRIX, (top) => section === undefined || top < section.start || top >= section.end));
  const rows = claimRows(tokens);
  const row = rows[0];
  if (rows.length !== 1 || row === undefined) return { findings: [...findings, `${rows.length} table rows on the page read as the W10 claim row, not exactly one`] };
  if (section === undefined) return { findings };
  if (row.top < section.start || row.top >= section.end) return { findings: [...findings, "the W10 claim row is not inside the W10 section"] };
  if (row.nested || row.header) return { findings: [...findings, "the W10 claim row is not a body row of a top-level table in the W10 section"] };
  const evidenceIndex = row.table.header.findIndex((cell) => cellText(cell) === EVIDENCE_HEADER);
  const evidence = row.cells[evidenceIndex];
  if (evidenceIndex < 0 || evidence === undefined) return { findings: [...findings, "the W10 claim row's table names no Evidence column"] };
  return { findings, evidence: cellText(evidence), row: row.cells.map(cellText).join(" | ") };
}

/** The sentences of a rendered cell that read as a stamped receipt sentence. */
function stampedSentences(evidence: string): string[] {
  return evidence.split(/(?<=\.) /).filter((sentence) => readsAsPrefix(foldKey(sentence), STAMP_KEY));
}

function readStampShape(sentence: string): { slots: StampSlots; releases: string[] } | undefined {
  const match = STAMP_SHAPE.exec(sentence);
  if (match === null) return undefined;
  const [, date = "", receipt = "", cmd = "", measured = "", cliVersion = "", repinned = "", pinBead = ""] = match;
  return { slots: { date, receipt, cmd, release: measured, pinBead }, releases: [measured, cliVersion, repinned] };
}

/** The JSON object text that opens at `open` and closes on the same line, or undefined. */
function balancedObject(text: string, open: number): string | undefined {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = open; index < text.length; index++) {
    const char = text[index];
    if (char === "\n") return undefined;
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
    } else if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth++;
    } else if (char === "}") {
      depth--;
      if (depth === 0) return text.slice(open, index + 1);
    }
  }
  return undefined;
}

function stampRelease(json: string | undefined): string | undefined {
  if (json === undefined) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return undefined;
  }
  if (parsed === null || typeof parsed !== "object" || !("cli_version" in parsed)) return undefined;
  const release = parsed.cli_version;
  return typeof release === "string" && release !== "" ? release : undefined;
}

interface ReceiptStamp {
  release?: string;
  entryIds: ReadonlySet<string>;
}

/** A receipt file's newest rendered RF_PREVIEW_RECEIPT line and the cmd ids its entry renders, or why it cannot be read. */
function receiptView(markdown: string, label: string): { findings: string[]; newest?: ReceiptStamp } {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, label, () => false);
  const entries: Token[][] = [];
  for (const token of tokens) {
    if (entries.length === 0 || (isHeading(token) && token.depth <= 2)) entries.push([]);
    entries[entries.length - 1]?.push(token);
  }
  let newest: ReceiptStamp | undefined;
  for (const entry of entries) {
    const text = rendered(entry, "\n");
    const objects: Array<string | undefined> = [];
    for (let cursor = text.indexOf(STAMP_MARK); cursor >= 0; cursor = text.indexOf(STAMP_MARK, cursor + STAMP_MARK.length)) objects.push(balancedObject(text, cursor + STAMP_MARK.length - 1));
    if (objects.length > 0) newest = { release: stampRelease(objects.at(-1)), entryIds: new Set(text.match(CMD_ID_ALL) ?? []) };
  }
  return { findings, newest };
}

function hasToken(text: string, token: string): boolean {
  return new RegExp(`(?<![0-9A-Za-z_])${token}(?![0-9A-Za-z_])`).test(text);
}

/** Every reason the rendered W10 claim fails the stamped-release rule; empty means it holds. Pure over its three inputs. */
function judgeW10Claim(page: string, readReceipt: ReadReceipt, carrier: string): string[] {
  const findings: string[] = [];
  const carried = carrierRelease(carrier);
  if (carried === undefined) findings.push(`carrier ${JSON.stringify(carrier)} is not rf@<release>:<schema>`);
  const view = w10View(page);
  findings.push(...view.findings);
  if (view.evidence === undefined || view.row === undefined) return findings;
  for (const id of LEGACY_UNSTAMPED_IDS) {
    if (!hasToken(view.evidence, id)) findings.push(`historical receipt id ${id} is not in the rendered Evidence cell (new receipts are added, history is never rewritten)`);
  }
  for (const match of view.row.replace(RETIREMENT_CLAUSE_ALL, "").matchAll(RELEASE_TOKEN_ALL)) {
    if (match[1] !== carried) findings.push(`the rendered row names rf@${match[1] ?? ""} outside the retirement clause; only the carrier release ${carried ?? "(none)"} may stand`);
  }
  const stamped = stampedSentences(view.evidence);
  const sentence = stamped[0];
  if (stamped.length !== 1 || sentence === undefined) {
    findings.push(stamped.length === 0 ? "the rendered Evidence cell carries no stamped receipt sentence" : `${stamped.length} rendered sentences read as a stamped receipt sentence, not exactly one`);
    return findings;
  }
  const shape = readStampShape(sentence);
  if (shape === undefined) {
    findings.push(`the stamped sentence is not the committed stamped-sentence slice: ${JSON.stringify(sentence)}`);
    return findings;
  }
  const { receipt, cmd } = shape.slots;
  const text = readReceipt(receipt);
  if (text === undefined) {
    findings.push(`the stamped sentence cites receipts/${receipt}.md but that receipt file does not exist`);
    return findings;
  }
  const stamp = receiptView(text, `receipts/${receipt}.md`);
  findings.push(...stamp.findings);
  if (stamp.newest === undefined) {
    findings.push(`receipts/${receipt}.md renders no RF_PREVIEW_RECEIPT line`);
    return findings;
  }
  const release = stamp.newest.release;
  if (release === undefined) {
    findings.push(`receipts/${receipt}.md: its newest rendered RF_PREVIEW_RECEIPT line carries no string cli_version`);
    return findings;
  }
  if (release !== carried) findings.push(`receipts/${receipt}.md stamped release ${release} differs from the carrier release ${carried ?? "(none)"}`);
  if (LEGACY_UNSTAMPED_IDS.includes(cmd)) findings.push(`the stamped sentence names ${cmd}, a legacy unstamped receipt (legacy unstamped ids do not count)`);
  else if (!stamp.newest.entryIds.has(cmd)) findings.push(`the stamped sentence names ${cmd}, which the receipt entry carrying the newest stamp line does not render`);
  if (sentence !== stampSentence({ ...shape.slots, release })) {
    findings.push(`the stamped sentence does not equal its slice with the stamped release ${release} (releases read ${shape.releases.join(", ")})`);
  }
  return findings;
}

/** The live page's one stamped sentence and its slots (for the live rows), or undefined. */
function stampedParts(page: string): { sentence: string; slots: StampSlots; releases: string[] } | undefined {
  const evidence = w10View(page).evidence;
  const stamped = evidence === undefined ? [] : stampedSentences(evidence);
  const sentence = stamped[0];
  const shape = stamped.length === 1 && sentence !== undefined ? readStampShape(sentence) : undefined;
  return sentence === undefined || shape === undefined ? undefined : { sentence, ...shape };
}

/** Why the receipts INDEX page fails to list `name`.md as rendered text; empty when it does. */
function indexFindings(markdown: string, name: string): string[] {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, INDEX, () => false);
  if (!assertedHrefs(tokens).includes(`${name}.md`)) findings.push(`INDEX.md renders no link to ${name}.md`);
  return findings;
}

function readText(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function liveReceipt(name: string): string | undefined {
  const rel = `docs/workbench/receipts/${name}.md`;
  return existsSync(join(ROOT, rel)) ? readText(rel) : undefined;
}

// Mutant authoring only, never the judge: the raw source line of the claim row, located the way a docs editor would.
const ROW_LINE = /^\|\s*node\(\) RF noncommitted context preview capability/;

function editRow(page: string, edit: (row: string) => readonly string[]): string {
  const lines = page.split("\n");
  const hits = lines.flatMap((line, index) => (ROW_LINE.test(line) ? [index] : []));
  const index = hits[0];
  if (hits.length !== 1 || index === undefined) throw new Error(`mutant authoring expects one raw claim row line, found ${hits.length}`);
  return [...lines.slice(0, index), ...edit(lines[index] ?? ""), ...lines.slice(index + 1)].join("\n");
}

/** The [start, end) span of the sentence that begins with `marker` in a raw row, through its closing ". ". */
function sentenceSpan(row: string, marker: string): [number, number] {
  const start = row.indexOf(marker);
  const stop = start < 0 ? -1 : row.indexOf(". ", start);
  if (start < 0 || stop < 0) throw new Error(`mutant authoring: no sentence beginning ${JSON.stringify(marker)}`);
  return [start, stop + 1];
}

const STAMP_MARKER = "Stamped receipt row (R6/R8, ";
const LEGACY_MARKER = "TRACEABILITY 'Native ecosystem receipts':";
const at = (code: number): string => String.fromCodePoint(code);

describe("W10 stamped-release claim guard (wb-2j3.5, R6), read as the page renders", () => {
  const carrier = REACTIVE_FIBER_CONTRACT_SOURCE;
  const release = carrierRelease(carrier) ?? "";
  const page = (): string => readText(MATRIX);

  it("L1: the live W10 claim row cites a receipt row stamped with the measured release, and that release matches the R2 carrier", () => {
    expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
  });

  it("L2: the receipt the stamped sentence names is listed in the rendered receipts INDEX (the one-line append convention)", () => {
    const parts = stampedParts(page());
    expect(parts).toBeDefined();
    expect(indexFindings(readText(INDEX), parts?.slots.receipt ?? "")).toEqual([]);
  });

  it("L3: the live stamped sentence fills every release slot with the carrier release and equals its own slice", () => {
    const parts = stampedParts(page());
    expect(release).not.toBe("");
    expect(parts?.releases).toEqual([release, release, release]);
    expect(parts?.sentence).toBe(stampSentence({ ...(parts?.slots ?? { date: "", receipt: "", cmd: "", release: "", pinBead: "" }), release }));
  });

  it("L4: the slice shape reads back exactly the slots stampSentence() writes (one source of the committed wording)", () => {
    const slots: StampSlots = { date: "2099-01-02", receipt: "wb-abc.1", cmd: "cmd_0123456789ab", release: "9.8.7", pinBead: "wb-def.2" };
    expect(readStampShape(stampSentence(slots))).toEqual({ slots, releases: ["9.8.7", "9.8.7", "9.8.7"] });
  });

  describe("falsifiers on the judge's own inputs (the fefe71f protections, kept)", () => {
    const stampedSpan = (row: string): [number, number] => sentenceSpan(row, STAMP_MARKER);

    it("F1 (acceptance 1): the page with the row as it read at 9df9a03 (three unstamped 0.1.583-era receipts, no stamp) FAILS", () => {
      const findings = judgeW10Claim(editRow(page(), () => [ROW_AT_9DF9A03]), liveReceipt, carrier).join("\n");
      expect(findings).toContain("the rendered Evidence cell carries no stamped receipt sentence");
      expect(findings).toContain("names rf@0.1.583 outside the retirement clause");
    });

    it("F2: the stamped sentence removed from the live row (only the legacy ids remain) FAILS", () => {
      const variant = editRow(page(), (row) => {
        const [start, end] = stampedSpan(row);
        return [row.slice(0, start) + row.slice(end)];
      });
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("carries no stamped receipt sentence");
    });

    it("F3: the row states a different measured release (0.1.716) than the receipt and carrier stamp FAILS", () => {
      const variant = editRow(page(), (row) => [row.replaceAll(`measured release ${release}`, "measured release 0.1.716")]);
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not equal its slice");
    });

    it("F4: the stamped sentence names a cmd_* id the receipt does not render FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const variant = editRow(page(), (row) => [row.replaceAll(cmd, "cmd_000000000000")]);
      expect(cmd).toMatch(/^cmd_[0-9a-f]{12}$/);
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not render");
    });

    it("F5: the only shared receipt id is a legacy unstamped one (stamp id swapped for cmd_994da817d4cd in both row and receipt) FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const swapped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll(cmd, "cmd_994da817d4cd");
      const findings = judgeW10Claim(editRow(page(), (row) => [row.replaceAll(cmd, "cmd_994da817d4cd")]), swapped, carrier).join("\n");
      expect(findings).toContain("legacy unstamped ids do not count");
    });

    it("F6: the cited receipt renders no RF_PREVIEW_RECEIPT stamp line FAILS", () => {
      const stripped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE");
      expect(judgeW10Claim(page(), stripped, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("F7: the receipt stamp has no string cli_version (numeric, empty, or unparsable JSON) FAILS", () => {
      for (const replacement of ['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"]) {
        const broken: ReadReceipt = (name) => {
          const text = liveReceipt(name);
          if (text === undefined) return undefined;
          return replacement.startsWith("RF_PREVIEW_RECEIPT") ? text.replace(STAMP_MARK, replacement) : text.replace(`"cli_version":"${release}"`, replacement);
        };
        expect(judgeW10Claim(page(), broken, carrier).join("\n"), replacement).toContain("carries no string cli_version");
      }
    });

    it("F8: the newest rendered stamp line of the receipt disagrees with the carrier (older line matches, newest does not) FAILS", () => {
      const appended: ReadReceipt = (name) => {
        const text = liveReceipt(name);
        return text === undefined ? undefined : `${text}\nRF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\n`;
      };
      expect(judgeW10Claim(page(), appended, carrier).join("\n")).toContain("differs from the carrier release");
    });

    it("F9: the carrier is re-pinned away from the stamped release FAILS", () => {
      const findings = judgeW10Claim(page(), liveReceipt, "rf@0.1.583:reactive-fiber.cli/v1 context.render --no-commit");
      expect(findings.join("\n")).toContain("differs from the carrier release 0.1.583");
    });

    it("F10: a carrier that is not rf@<release>:<schema> FAILS", () => {
      expect(judgeW10Claim(page(), liveReceipt, "rf-latest").join("\n")).toContain("is not rf@<release>:<schema>");
    });

    it("F11: the cited receipt file is missing FAILS", () => {
      expect(judgeW10Claim(page(), () => undefined, carrier).join("\n")).toContain("receipt file does not exist");
    });

    it("F12: a legacy unstamped receipt id is edited out of the row (history rewritten) FAILS", () => {
      for (const id of LEGACY_UNSTAMPED_IDS) {
        const findings = judgeW10Claim(editRow(page(), (row) => [row.replaceAll(id, "cmd_ffffffffffff")]), liveReceipt, carrier).join("\n");
        expect(findings, id).toContain(`historical receipt id ${id} is not in the rendered Evidence cell`);
      }
    });

    it("F13: a stale rf@ literal re-enters a rendered cell outside the retirement clause FAILS, while the retirement clause itself is tolerated", () => {
      const variant = editRow(page(), (row) => [row.replace("Bead wb-x32 (open).", "Bead wb-x32 (open). contractSource rf@0.1.583 context.render.")]);
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("names rf@0.1.583 outside the retirement clause");
      expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
    });

    it("F14: the stale literal the retirement clause quotes is itself changed to a non-clause form FAILS", () => {
      const variant = editRow(page(), (row) => [row.replace("the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept")]);
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("outside the retirement clause");
    });
  });

  describe("independently-authored docs battery (gate-3 row 487, carried as the same raw-markdown edits): every G and K variant is judged unstamped", () => {
    // G5-G7 reuse the 9df9a03 row without its capability token: an unstamped duplicate claim row.
    const dupNoToken = ROW_AT_9DF9A03.replace(" (reactivefiber.render.preview/v1)", "");
    const wrap = (row: string, marker: string): string => {
      const [start, end] = sentenceSpan(row, marker);
      return `${row.slice(0, start)}<!-- ${row.slice(start, end)} -->${row.slice(end)}`;
    };
    const intoW11 = (source: string): string => {
      const lines = source.split("\n");
      const index = lines.findIndex((line) => ROW_LINE.test(line));
      const row = lines[index] ?? "";
      const rest = [...lines.slice(0, index), ...lines.slice(index + 1)];
      const w11 = rest.findIndex((line) => line.startsWith("## W11:"));
      const rule = rest.findIndex((line, k) => k > w11 && line.startsWith("| --- |"));
      if (index < 0 || w11 < 0 || rule < 0) throw new Error("mutant authoring: no W11 table");
      return [...rest.slice(0, rule + 1), row, ...rest.slice(rule + 1)].join("\n");
    };
    const hideStampLine = (receipt: string): string => {
      const start = receipt.indexOf("  `RF_PREVIEW_RECEIPT");
      const stop = start < 0 ? -1 : receipt.indexOf("`\n", start + 3) + 1;
      if (start < 0 || stop <= 0) throw new Error("mutant authoring: no receipt stamp line");
      return `${receipt.slice(0, start)}  <!-- ${receipt.slice(start + 2, stop)} -->${receipt.slice(stop)}`;
    };
    const pageMutants: ReadonlyArray<readonly [string, (source: string) => string, string]> = [
      ["G1 stamped sentence wrapped in an inline comment inside the Evidence cell", (source) => editRow(source, (row) => [wrap(row, STAMP_MARKER)]), "carries no stamped receipt sentence"],
      ["G2 substring inversion: 'unmeasured release'", (source) => editRow(source, (row) => [row.replaceAll(`measured release ${release}`, `unmeasured release ${release}`)]), "is not the committed stamped-sentence slice"],
      ["G3 negated clause: 'though this run never measured release'", (source) => editRow(source, (row) => [row.replace(`installed rf, measured release ${release}`, `installed rf, though this run never measured release ${release}`)]), "is not the committed stamped-sentence slice"],
      ["G4 claim row moved out of the W10 section into the W11 table", intoW11, "the W10 claim row is not inside the W10 section"],
      ["G5 a second, unstamped claim row (the 9df9a03 row without its capability token) beside the stamped one", (source) => editRow(source, (row) => [row, dupNoToken]), "2 table rows on the page read as the W10 claim row"],
      ["G6 stamped row hidden in a multi-line comment behind a visible unstamped claim row", (source) => editRow(source, (row) => [dupNoToken, "<!--", row, "-->"]), "carries no stamped receipt sentence"],
      ["G6b stamped row hidden in a multi-line comment, nothing visible in its place", (source) => editRow(source, (row) => ["<!--", row, "-->"]), "0 table rows on the page read as the W10 claim row"],
      ["G7 stamped row moved into a fenced code block after a visible unstamped claim row", (source) => editRow(source, (row) => [dupNoToken, "", "```", row, "```"]), "carries no stamped receipt sentence"],
      ["G9 the legacy receipt clause wrapped in an inline comment", (source) => editRow(source, (row) => [wrap(row, LEGACY_MARKER)]), "historical receipt id cmd_994da817d4cd is not in the rendered Evidence cell"],
      ["K1 kill: the stamped sentence removed", (source) => editRow(source, (row) => {
        const [start, end] = sentenceSpan(row, STAMP_MARKER);
        return [row.slice(0, start) + row.slice(end)];
      }), "carries no stamped receipt sentence"],
      ["K2 kill: the measured release restated as 0.1.716", (source) => editRow(source, (row) => [row.replace(`measured release ${release}`, "measured release 0.1.716")]), "does not equal its slice"],
    ];
    const receiptMutants: ReadonlyArray<readonly [string, (receipt: string) => string, string]> = [
      ["G8 the receipt's stamp line hidden in an inline comment", hideStampLine, "renders no RF_PREVIEW_RECEIPT line"],
      ["K3 kill: the receipt stamp cli_version moved to 0.1.716", (receipt) => receipt.replace(`"cli_version":"${release}"`, '"cli_version":"0.1.716"'), "differs from the carrier release"],
    ];

    for (const [name, mutate, cause] of pageMutants) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    for (const [name, mutate, cause] of receiptMutants) {
      it(`refuses ${name}`, () => {
        const mutated: ReadReceipt = (receipt) => {
          const text = liveReceipt(receipt);
          return text === undefined ? undefined : mutate(text);
        };
        const named = stampedParts(page())?.slots.receipt ?? "";
        expect(mutated(named)).not.toBe(liveReceipt(named));
        const findings = judgeW10Claim(page(), mutated, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    const controls: ReadonlyArray<readonly [string, (source: string) => string]> = [
      ["R1 an extra space after the row's leading pipe", (source) => editRow(source, (row) => [`|  ${row.slice(2)}`])],
      ["R2 a complete comment quoting the retired literal after a cell sentence", (source) => editRow(source, (row) => [row.replace("Bead wb-x32 (open).", "Bead wb-x32 (open). <!-- formerly rf@0.1.583 -->")])],
    ];
    for (const [name, mutate] of controls) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }
  });

  describe("hiding and duplication shapes outside the battery (H) and rendering-neutral controls (C)", () => {
    const withAt = (source: string, line: string, insert: string): string => {
      const index = source.indexOf(line);
      if (index < 0) throw new Error(`mutant authoring: no ${JSON.stringify(line)}`);
      return `${source.slice(0, index)}${insert}${source.slice(index)}`;
    };
    const lookAlikeRow = (row: string): string => row.replace("| node()", `| n${at(0x43e)}de()`);
    const afterW10Heading = (source: string, insert: string): string => {
      const eol = source.indexOf("\n", source.indexOf("## W10:"));
      if (source.indexOf("## W10:") < 0 || eol < 0) throw new Error("mutant authoring: no W10 heading line");
      return `${source.slice(0, eol + 1)}\n${insert}${source.slice(eol + 1)}`;
    };
    const mutants: ReadonlyArray<readonly [string, (source: string) => string, string]> = [
      ["H1 an unclosed details block before the W10 heading", (source) => withAt(source, "## W10:", "<details>\n\n"), "raw HTML"],
      ["H2 a hidden span inside the claim row", (source) => editRow(source, (row) => [row.replace(`measured release ${release}`, `<span hidden>measured release ${release}</span>`)]), "raw HTML"],
      ["H3 an unclosed block comment opened before the W10 heading (marked hides everything after it)", (source) => withAt(source, "## W10:", "<!-- unclosed\n\n"), "0 headings on the page read as a W10 heading"],
      ["H4 a second W10 heading as a setext heading at EOF", (source) => `${source}\nW10: ReactiveFiber provider/interop\n---\n`, "2 headings on the page read as a W10 heading"],
      ["H5 a second W10 heading nested in a list item", (source) => `${source}\n- ## W10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
      ["H6 a second W10 heading with a fullwidth look-alike", (source) => `${source}\n## ${at(0xff37)}10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
      ["H7 a duplicate claim row with a Cyrillic look-alike first cell, in the W11 table", (source) => {
        const lines = source.split("\n");
        const row = lines.find((line) => ROW_LINE.test(line)) ?? "";
        const w11 = lines.findIndex((line) => line.startsWith("## W11:"));
        const rule = lines.findIndex((line, k) => k > w11 && line.startsWith("| --- |"));
        return [...lines.slice(0, rule + 1), lookAlikeRow(row), ...lines.slice(rule + 1)].join("\n");
      }, "2 table rows on the page read as the W10 claim row"],
      ["H8 the claim row only in a block-quoted table inside the W10 section", (source) => editRow(source, (row) => ["", "> | Feature | Status | Evidence | Caveats |", "> | --- | --- | --- | --- |", `> ${row}`, ""]), "not a body row of a top-level table"],
      ["H9 the stamped sentence struck through", (source) => editRow(source, (row) => {
        const [start, end] = sentenceSpan(row, STAMP_MARKER);
        return [`${row.slice(0, start)}~~${row.slice(start, end)}~~${row.slice(end)}`];
      }), "carries no stamped receipt sentence"],
      ["H10 the stamped sentence moved from the Evidence cell to the Caveats cell", (source) => editRow(source, (row) => {
        const [start, end] = sentenceSpan(row, STAMP_MARKER);
        const without = row.slice(0, start) + row.slice(end);
        const close = without.lastIndexOf(" |");
        return [`${without.slice(0, close)} ${row.slice(start, end)}${without.slice(close)}`];
      }), "carries no stamped receipt sentence"],
      ["H11 a negated copy of the stamped sentence beside the real one", (source) => editRow(source, (row) => {
        const [start, end] = sentenceSpan(row, STAMP_MARKER);
        return [`${row.slice(0, end)} ${row.slice(start, end).replace("measured release", "never measured release")}${row.slice(end)}`];
      }), "2 rendered sentences read as a stamped receipt sentence"],
      ["H12 an attribute-bearing tag in another section's table cell", (source) => withAt(source, "| Curated per-role provider tools", '| <id class="x"> '), "raw HTML"],
      ["H13 a raw-text element tag in another section's table cell", (source) => withAt(source, "| Curated per-role provider tools", "| <style> "), "raw HTML"],
      ["H14 a trailing line after a block comment's close", (source) => withAt(source, "## W10:", "<!-- note --> trailing raw text\n\n"), "raw HTML"],
    ];
    for (const [name, mutate, cause] of mutants) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    it("refuses H15 the receipt stamp line struck through", () => {
      const struck: ReadReceipt = (name) => liveReceipt(name)?.replace(/`RF_PREVIEW_RECEIPT [^`\n]*`/, (line) => `~~${line}~~`);
      const named = stampedParts(page())?.slots.receipt ?? "";
      expect(struck(named)).not.toBe(liveReceipt(named));
      expect(judgeW10Claim(page(), struck, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("refuses H16 the receipt's INDEX line wrapped in a complete comment", () => {
      const named = stampedParts(page())?.slots.receipt ?? "";
      const index = readText(INDEX);
      const line = index.split("\n").find((entry) => entry.startsWith(`- [${named}](${named}.md)`)) ?? "";
      expect(line).not.toBe("");
      expect(indexFindings(index.replace(line, `<!-- ${line} -->`), named).join("\n")).toContain(`renders no link to ${named}.md`);
    });

    const controls: ReadonlyArray<readonly [string, (source: string) => string]> = [
      ["C1 the page with CRLF line endings", (source) => source.replaceAll("\n", "\r\n")],
      ["C2 a complete comment between the W10 heading and its table", (source) => afterW10Heading(source, "<!-- reviewer note -->\n")],
      ["C3 emphasis around the measured release", (source) => editRow(source, (row) => [row.replace(`measured release ${release}`, `**measured release ${release}**`)])],
      ["C4 a character reference for a space inside the stamped sentence", (source) => editRow(source, (row) => [row.replace(`measured release ${release}`, `measured&#32;release ${release}`)])],
      ["C5 an unclosed inline comment opener in another section's cell (marked lexes it as text and escapes it, so it hides nothing)", (source) => withAt(source, "| Curated per-role provider tools", "| <!-- open ")],
    ];
    for (const [name, mutate] of controls) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }
  });
});
