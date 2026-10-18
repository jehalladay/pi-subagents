/**
 * RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R6 (wb-2j3.5): a hermetic default-gate guard over the W10 claim row of
 * docs/workbench/feature-matrix.md (the "node() RF noncommitted context preview capability" row). Statement pinned: "the
 * feature-matrix W10 row must cite at least one RF receipt row stamped with the release measured during that run, and the
 * stamped release must match the R2 carrier." It reads docs/workbench/receipts/ (the receipt convention, wb-xox), never
 * TRACEABILITY.md (frozen; test/workbench-traceability-freeze.test.ts), and imports the R2 carrier, never an rf@ literal.
 * It also carries R5 (wb-2j3.4) AC1 on the same rendered model (gate-1 row 547, respin default (a): the raw-text line census
 * it replaces read the markdown source, not the page): "A wb-6hb.11-style census falsifier binds the W10 row: FAILS while
 * /zero durable writes/ remains in feature-matrix.md:105 (RED at 9df9a03), passes with the plane-scoped phrase."
 *
 * READING (respin on gate-3 row 487; owner ruling R1(a): the docs-pin floor binds this guard over the acceptance's
 * "string-level census" wording; respin on gate-1 row 500 adds SECTION CONTENT, the pinned claim cells and EVIDENCE
 * COMPOSITION). The judge reads each page AS IT RENDERS: marked 18.0.11 (GFM, pinned exactly as a devDependency) lexes it,
 * the lexer test/workbench-receipts-convention.test.ts and test/workbench-docs-cancel-path.test.ts already use. One lex of a
 * page serves every count and every extraction on it (same view, 6hb.10).
 * - PAGE CHECK (rendered-text truth, 9x5.17: strip reading for comments, forbid reading for raw HTML): an html token that is
 *   exactly one complete comment renders nothing and is stripped; every other html token, block or inline, is refused,
 *   because raw HTML can hide text the lexer still reads. One carve-out, outside the W10 section only: a bare tag (`<name>`
 *   or `</name>`, no attributes) inside a GFM table cell naming an element that cannot leave its cell or hide what follows
 *   it (never a raw-text, template, table-structure, document or foreign-content element) is tolerated and stripped; today
 *   that is exactly the invoke:<id> cells of the W03 and W06 rows. The receipt files and the rendered index admit complete comments only.
 * - RENDERED TEXT: text, backslash escapes, code spans, code blocks and link text (never a destination or a title), with
 *   numeric and common named character references decoded in text; images and struck-through (del) text are not asserted;
 *   html tokens render nothing; in a table cell every white-space run reads as one space. Fenced and indented code is
 *   visible code, never a table row.
 * - SECTION (heading uniqueness 6hb.9, section bound cax.24): exactly one heading anywhere on the page (any level, ATX or
 *   setext, at any list or block quote depth) reads as a W10 heading under the FOLDED KEY; it is the top-level level-2
 *   heading, and the section runs from it to the next top-level level-1/2 heading or EOF.
 * - SECTION CONTENT (U1/U2, the D3 withdrawn-subsection class): the section holds exactly its committed blocks
 *   (W10_COMMITTED). The W10 heading renders its committed text; the page's first heading is its committed level-1 title
 *   and no other level-1 heading, at any depth, stands between the two (W10 stays a section of the matrix, never of an
 *   appendix); after the heading the section holds exactly one table and no other block, so a ### subsection inside the
 *   section belongs to it and is refused, as is any paragraph, list, code block, rule or second table there (white space,
 *   link reference definitions and html render nothing and are skipped; html other than a complete comment is refused by
 *   the page check). The table's rendered header row and its ordered rendered first cells equal their committed lists.
 * - CLAIM ROW (same view and uniqueness, 6hb.10): a row of any table on the page (header or body, at any depth) is a claim
 *   row when its rendered first cell reads as beginning with CLAIM_KEY under the FOLDED KEY. Exactly one exists, and it is a
 *   body row of a top-level table inside the W10 section whose header names an Evidence column. Its Feature, Status and
 *   Caveats cells (located by header) render their committed text; the Evidence cell is judged below. wb-2j3.4's re-cut of
 *   this row updates W10_COMMITTED (and evidenceLead() or stampSentence() where their wording moves) in the same change.
 * - WITHDRAWN CLAIM (R5 AC1): no rendered cell of any row that reads as the W10 claim row (the CLAIM ROW reading, so a
 *   duplicate claim row anywhere on the page is read as well as the one in W10) reads as containing a WITHDRAWN_CLAIMS entry
 *   under the FOLDED KEY: the universal negative in both spellings it was published in, the row's "zero durable writes"
 *   and the descriptor's "no durable write" (wb-2j3.3). The claim row's rendered Feature cell (its first cell, the one read
 *   as CLAIM_KEY) carries PLANE_SCOPED_CLAUSE instead, as exact rendered text (required text is never folded, so a
 *   look-alike or an invisible inside the clause is refused). Neither reading consults W10_COMMITTED, so a later re-cut of
 *   the committed row cannot carry the claim back.
 * - EVIDENCE COMPOSITION (J7): the rendered Evidence cell, split into sentences at each ". ", is exactly its five committed
 *   sentences in order: the lead (evidenceLead(): its carrier slot renders the R2 carrier, its receipt slot the stamped
 *   receipt, its retired release is the retirement-clause carve-out below), the Tests sentence, the legacy receipt clause
 *   and the bead sentence (each pinned whole), then the stamped sentence (judged by its slice). A sentence outside that
 *   list, anywhere in the cell, is refused, and so is a missing one.
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
 * the gate-1 row-500 battery (J1-J27 docs, receipt and rendered-index variants; N1-N10 rendering-neutral controls) and the
 * gate-1 row-547 battery (X1-X7 rendered-claim variants; its N1/N2 controls carried as XN1/XN2) are carried below as the
 * same edits of the committed docs, judged in memory: every G, K, J and X variant is refused with its named diagnosis and
 * every R, N and XN control is accepted. N6 (an unrelated row above the claim row) changes the committed first cells, so it
 * is carried as a kill. The F rows keep the fefe71f protections; the H rows add hiding and duplication shapes outside the
 * batteries; the C rows are rendering-neutral controls; the W rows carry AC1's own inputs (W1 the row as it read at
 * 9df9a03, W2 the descriptor's spelling, W3 a look-alike, W4 a header-row claim row, W5 a look-alike inside the required
 * clause, W6 an ASCII control character inside the claim). Every look-alike and invisible is built with
 * String.fromCodePoint; none is typed raw.
 * MUTANT AUTHORING (C1): every page and rendered-index edit is located through the lexer (the top-level token raws tile the page; a
 * table's raw lines are its header, delimiter and rows; each rendered character of a cell or heading maps back to the
 * source span it renders from) and authored at those positions, never located by a raw-text regex, so a rendering-neutral
 * rewrite of the committed docs moves no authoring site: the C1 rows re-author every page, receipt and rendered-index variant on
 * each N base and require the same diagnosis. Every N control is stack-safe: applied to a page that already carries it (the
 * gate battery rewrites the committed docs on disk), it adds a further rendering-neutral edit instead of none or a breaking
 * one, so the N and C1 rows stay green on every N-rewritten docs tree. Receipt edits keep fail-closed raw anchors (no
 * rendering-neutral control rewrites a receipt; named scope).
 * EACH-LIVENESS (U3): every for-of falsifier and control table carries a length pin and an ordered roster pin, and every
 * loop inside one row counts the entries it ran against a literal, so deleting any entry (G1 included) turns the suite red.
 * FROZEN SHAPE (standing rule 16, owner order 2026-10-18T18:14:19Z): one row pins WITHDRAWN_CLAIMS, PLANE_SCOPED_CLAUSE,
 * every W and X row with its diagnoses, and the XN control names as literals derived from the tables at this cut, so
 * dropping a diagnosis, shortening a claim or a diagnosis, or swapping one for an unrelated diagnosis the variant also
 * draws turns it red.
 * RESIDUALS (named, not closed): ASCII look-alikes (I for l, 0 for O) in a heading or a first cell are not folded; a
 * tolerated bare cell tag outside W10 is assumed inert; styling applied from outside the page; prose outside the W10
 * section (another section may still describe the capability); the receipt beyond its newest stamp entry and the rendered index
 * beyond its one link; a withdrawn claim outside the claim rows' cells is not named by WITHDRAWN CLAIM (the section-level
 * class, wb-64x): in another W10 row's cell (gate X9) it is silent, in a W10 paragraph (gate X8) SECTION CONTENT refuses it
 * under its own diagnosis.
 * Spawns nothing; writes nothing; reads two docs files and the receipts directory and imports the carrier.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Lexer, type Token, type Tokens, type TokensList } from "marked";
import { describe, expect, it } from "vitest";
import { readReceiptsListing, renderReceiptsIndex } from "../qa/workbench/receipts-index.mjs";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../src/workbench/providers/reactivefiber.js";

const ROOT = process.cwd();
const MATRIX = "docs/workbench/feature-matrix.md";
const RECEIPTS_DIR = "docs/workbench/receipts";
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
/** The withdrawn universal negative (R5 AC1, wb-2j3.4) in both spellings it was published in: the row's and the descriptor's. */
const WITHDRAWN_CLAIMS = ["zero durable writes", "no durable write"] as const;
/** The plane-scoped clause the claim row's rendered Feature cell carries in place of the withdrawn claim (wb-2j3.4 STATEMENT). */
const PLANE_SCOPED_CLAUSE = "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace";
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

/** The W10 section as it renders at this cut (SECTION CONTENT, CLAIM ROW, EVIDENCE COMPOSITION in the header). */
const W10_COMMITTED = {
  title: "Workbench release feature matrix",
  heading: "W10: ReactiveFiber provider/interop",
  header: ["Feature", "Status", "Evidence", "Caveats"],
  firstCells: [
    "node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance; no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace",
    "ReactiveFiber reader adapter projecting NativeSnapshots from reactivefiber.render.preview/v1 envelopes into the observation projection",
  ],
  cells: [
    ["Feature", "node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance; no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"],
    ["Status", "landed-gated"],
    ["Caveats", "Bead wb-x32 open: 'Full interop contract remains open.' Preview deliberately yields null render/transaction IDs (no durable render); W10 acceptance is 'real render or honest blocker' - the landed slice is the noncommitted preview via the CLI envelope, not a committed render or production TS SDK interop."],
  ],
  tests: "Tests: test/workbench-native-rf-preview.test.ts, test/workbench-provider-envelope-audit.test.ts, test/workbench-ecosystem-native.test.ts, test/workbench-native-ecosystem.test.ts, test/workbench-provider-lifecycle.test.ts.",
  legacy: "TRACEABILITY 'Native ecosystem receipts': real RF noncommitted context cmd_994da817d4cd (initialized disposable workspace; output + graph provenance, no durable render ID); custody caps cmd_7e50a487da08 (malformed JSON, stdout/stderr caps, TERM/KILL cleanup); corrected envelope suite cmd_386a32a0323b (actual operation/workspace identity, zero noncommitted storage writes).",
  bead: "Bead wb-x32 (open).",
} as const;

interface LeadSlots {
  carrier: string;
  date: string;
  receipt: string;
  retired: string;
}

/** The Evidence cell's committed lead sentence as the page renders it, slots filled. */
function evidenceLead(slots: LeadSlots): string {
  return `src/workbench/providers/reactivefiber.ts (reactivefiber.render.preview v1; contractSource from the single carrier REACTIVE_FIBER_CONTRACT_SOURCE = ${slots.carrier}, re-pinned ${slots.date} from receipts/${slots.receipt}.md; the earlier rf@${slots.retired} literal is retired).`;
}

/** evidenceLead() read back: carrier, re-pin date, receipt, retired release. */
const LEAD_SHAPE = new RegExp(
  `^src/workbench/providers/reactivefiber\\.ts \\(reactivefiber\\.render\\.preview v1; contractSource from the single carrier REACTIVE_FIBER_CONTRACT_SOURCE = (.+?), re-pinned ([0-9]{4}-[0-9]{2}-[0-9]{2}) from receipts/(${BEAD})\\.md; the earlier rf@(${RELEASE}) literal is retired\\)\\.$`,
);

function readLeadShape(sentence: string): LeadSlots | undefined {
  const match = LEAD_SHAPE.exec(sentence);
  if (match === null) return undefined;
  const [, carrier = "", date = "", receipt = "", retired = ""] = match;
  return { carrier, date, receipt, retired };
}

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

/** True when some run of `folded` reads as `key` (readsAsPrefix's reading, started at every code point). */
function readsAsContaining(folded: string, key: string): boolean {
  let reach = new Set<number>([0]);
  for (const char of folded) {
    if (reach.has(key.length)) return true;
    const wild = (char.codePointAt(0) ?? 0) > 0x7f;
    const next = new Set<number>([0]);
    for (const position of reach) {
      if (wild) {
        for (let width = 0; width <= 3 && position + width <= key.length; width++) next.add(position + width);
      } else if (key[position] === char) {
        next.add(position + 1);
      }
    }
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

/** The WITHDRAWN CLAIM diagnosis for one cell (the judge appends its reason; the falsifier rows pin this text). */
const withdrawnCause = (cell: string, claim: string): string => `a row that reads as the W10 claim row renders the withdrawn claim ${JSON.stringify(claim)} in its ${cell} cell`;
/** The diagnosis for a claim row whose rendered Feature cell lacks PLANE_SCOPED_CLAUSE. */
const PLANE_SCOPED_CAUSE = `the W10 claim row's rendered Feature cell does not carry the plane-scoped clause ${JSON.stringify(PLANE_SCOPED_CLAUSE)}`;

/** A claim row cell's name in a diagnosis: its column header on a body row, its position on a header row. */
function cellLabel(row: ClaimRow, index: number): string {
  const header = row.header ? undefined : row.table.header[index];
  return header === undefined ? `column ${index + 1}` : cellText(header);
}

/** Why rows that read as the W10 claim row render a withdrawn claim (WITHDRAWN CLAIM): every rendered cell of every such row. */
function withdrawnClaimFindings(rows: readonly ClaimRow[]): string[] {
  const findings: string[] = [];
  for (const row of rows) {
    for (const [index, cell] of row.cells.entries()) {
      const folded = foldKey(cellText(cell));
      for (const claim of WITHDRAWN_CLAIMS) {
        if (readsAsContaining(folded, claim)) findings.push(withdrawnCause(cellLabel(row, index), claim));
      }
    }
  }
  return findings;
}

/** Why the claim row's rendered Feature cell (its first cell, the one read as CLAIM_KEY) does not carry PLANE_SCOPED_CLAUSE
 * as exact rendered text (never folded: the clause is required, so a look-alike or an invisible inside it is refused). */
function planeScopedFindings(row: ClaimRow): string[] {
  const feature = row.cells[0];
  return feature !== undefined && cellText(feature).includes(PLANE_SCOPED_CLAUSE) ? [] : [PLANE_SCOPED_CAUSE];
}

/** The WITHDRAWN CLAIM reading alone over a page's claim rows (the L7 row). */
function withdrawnClaimView(page: string): string[] {
  const rows = claimRows(new Lexer({ gfm: true }).lex(page));
  const row = rows[0];
  if (rows.length !== 1 || row === undefined) return [...withdrawnClaimFindings(rows), `${rows.length} table rows on the page read as the W10 claim row, not exactly one`];
  return [...withdrawnClaimFindings(rows), ...planeScopedFindings(row)];
}

/** Rendered text read as a cell reads it: every white-space run one space, trimmed. */
function collapsed(text: string): string {
  return text.replace(/[ \t\n\r\f]+/g, " ").trim();
}

/** Why the headings above the W10 heading are not its committed chain: the page title first, then no level-1 heading. */
function ancestryFindings(tokens: TokensList, section: Section): string[] {
  const titleIndex = tokens.findIndex((token) => isHeading(token));
  const title = tokens[titleIndex];
  if (title === undefined || !isHeading(title) || titleIndex >= section.start) {
    return [`the page renders no heading above the W10 heading (its committed level-1 title ${JSON.stringify(W10_COMMITTED.title)} is missing)`];
  }
  const findings: string[] = [];
  const titleText = collapsed(rendered(title.tokens, ""));
  if (title.depth !== 1 || titleText !== W10_COMMITTED.title) {
    findings.push(`the page's first heading renders ${JSON.stringify(titleText)} at level ${title.depth}, not its committed level-1 title ${JSON.stringify(W10_COMMITTED.title)}`);
  }
  for (const top of tokens.slice(titleIndex + 1, section.start)) {
    visit([top], (token) => {
      if (isHeading(token) && token.depth === 1) {
        findings.push(`a level-1 heading ${JSON.stringify(collapsed(rendered(token.tokens, "")))} stands between the page title and the W10 heading (W10 must stay a section of the page title)`);
      }
    });
  }
  return findings;
}

/** Top-level blocks that render nothing: white space, link reference definitions, and html (a complete comment is stripped;
 * any other html is refused by the page check). */
const SILENT_BLOCKS: ReadonlySet<string> = new Set(["space", "def", "html"]);

/** Why the W10 section is not exactly its committed blocks: the heading's text, then exactly one table (its committed header
 * row and ordered first cells) and no other block. */
function sectionFindings(tokens: TokensList, section: Section): string[] {
  const findings: string[] = [];
  const heading = tokens[section.start];
  const text = heading !== undefined && isHeading(heading) ? collapsed(rendered(heading.tokens, "")) : "";
  if (text !== W10_COMMITTED.heading) findings.push(`the W10 heading renders ${JSON.stringify(text)}, not its committed ${JSON.stringify(W10_COMMITTED.heading)}`);
  const tables: Tokens.Table[] = [];
  for (const token of tokens.slice(section.start + 1, section.end)) {
    if (SILENT_BLOCKS.has(token.type)) continue;
    if (isTable(token)) {
      tables.push(token);
    } else if (isHeading(token)) {
      findings.push(`the W10 section holds a level-${token.depth} heading ${JSON.stringify(collapsed(rendered(token.tokens, "")))} (a subsection inside the W10 section belongs to it; only the committed table may follow the heading)`);
    } else {
      findings.push(`the W10 section holds a ${token.type} block ${JSON.stringify(collapsed(rendered([token], " ")).slice(0, 160))} beyond its committed heading and table`);
    }
  }
  const table = tables[0];
  if (tables.length !== 1 || table === undefined) return [...findings, `the W10 section holds ${tables.length} tables, not exactly its one committed table`];
  const header = table.header.map(cellText);
  if (JSON.stringify(header) !== JSON.stringify(W10_COMMITTED.header)) {
    findings.push(`the W10 table's rendered header row reads ${JSON.stringify(header)}, not its committed ${JSON.stringify(W10_COMMITTED.header)}`);
  }
  const firstCells = table.rows.map((row) => (row[0] === undefined ? "" : cellText(row[0])));
  if (JSON.stringify(firstCells) !== JSON.stringify(W10_COMMITTED.firstCells)) {
    findings.push(`the W10 table's rendered first cells read ${JSON.stringify(firstCells)}, not its committed ${JSON.stringify(W10_COMMITTED.firstCells)}`);
  }
  return findings;
}

/** Why the claim row's Feature, Status and Caveats cells (located by header) do not render their committed text. */
function claimCellFindings(row: ClaimRow): string[] {
  const findings: string[] = [];
  for (const [name, committed] of W10_COMMITTED.cells) {
    const index = row.table.header.findIndex((cell) => cellText(cell) === name);
    const cell = row.cells[index];
    if (index < 0 || cell === undefined) findings.push(`the W10 claim row's table names no ${name} column`);
    else if (cellText(cell) !== committed) findings.push(`the W10 claim row's rendered ${name} cell reads ${JSON.stringify(cellText(cell).slice(0, 200))}, not its committed text`);
  }
  return findings;
}

/** Why the rendered Evidence cell is not its five committed sentences in order (the stamped one is judged by its slice). */
function evidenceFindings(evidence: string, carrier: string): string[] {
  const committed: ReadonlyArray<readonly [string, (sentence: string) => boolean]> = [
    ["lead sentence", (sentence) => readLeadShape(sentence) !== undefined],
    ["Tests sentence", (sentence) => sentence === W10_COMMITTED.tests],
    ["legacy receipt clause", (sentence) => sentence === W10_COMMITTED.legacy],
    ["bead sentence", (sentence) => sentence === W10_COMMITTED.bead],
    ["stamped receipt sentence", (sentence) => readsAsPrefix(foldKey(sentence), STAMP_KEY)],
  ];
  const findings: string[] = [];
  const read = new Map<string, string>();
  let next = 0;
  for (const sentence of evidence.split(/(?<=\.) /)) {
    const found = committed.findIndex(([, accepts], index) => index >= next && accepts(sentence));
    if (found < 0) {
      findings.push(`the rendered Evidence cell holds a sentence outside its committed slice: ${JSON.stringify(sentence)}`);
      continue;
    }
    for (const [label] of committed.slice(next, found)) findings.push(`the rendered Evidence cell lacks its committed ${label}`);
    read.set(committed[found]?.[0] ?? "", sentence);
    next = found + 1;
  }
  for (const [label] of committed.slice(next)) findings.push(`the rendered Evidence cell lacks its committed ${label}`);
  const lead = readLeadShape(read.get("lead sentence") ?? "");
  const stamp = readStampShape(read.get("stamped receipt sentence") ?? "");
  if (lead !== undefined && lead.carrier !== carrier) {
    findings.push(`the Evidence lead sentence renders the carrier ${JSON.stringify(lead.carrier)}, not the R2 carrier ${JSON.stringify(carrier)}`);
  }
  if (lead !== undefined && stamp !== undefined && lead.receipt !== stamp.slots.receipt) {
    findings.push(`the Evidence lead sentence re-pins from receipts/${lead.receipt}.md, not from the stamped receipt receipts/${stamp.slots.receipt}.md`);
  }
  return findings;
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
  if (section !== undefined) findings.push(...ancestryFindings(tokens, section), ...sectionFindings(tokens, section));
  findings.push(...htmlRefusals(tokens, MATRIX, (top) => section === undefined || top < section.start || top >= section.end));
  const rows = claimRows(tokens);
  findings.push(...withdrawnClaimFindings(rows));
  const row = rows[0];
  if (rows.length !== 1 || row === undefined) return { findings: [...findings, `${rows.length} table rows on the page read as the W10 claim row, not exactly one`] };
  if (section === undefined) return { findings };
  if (row.top < section.start || row.top >= section.end) return { findings: [...findings, "the W10 claim row is not inside the W10 section"] };
  if (row.nested || row.header) return { findings: [...findings, "the W10 claim row is not a body row of a top-level table in the W10 section"] };
  const evidenceIndex = row.table.header.findIndex((cell) => cellText(cell) === EVIDENCE_HEADER);
  const evidence = row.cells[evidenceIndex];
  if (evidenceIndex < 0 || evidence === undefined) return { findings: [...findings, "the W10 claim row's table names no Evidence column"] };
  findings.push(...claimCellFindings(row), ...planeScopedFindings(row));
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
  findings.push(...evidenceFindings(view.evidence, carrier));
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

/** Why the rendered receipts index fails to list `name`.md as rendered text; empty when it does. */
function indexFindings(markdown: string, name: string): string[] {
  const tokens = new Lexer({ gfm: true }).lex(markdown);
  const findings = htmlRefusals(tokens, "the rendered receipts index", () => false);
  if (!assertedHrefs(tokens).includes(`${name}.md`)) findings.push(`the rendered receipts index renders no link to ${name}.md`);
  return findings;
}

function readText(rel: string): string {
  return readFileSync(join(ROOT, rel), "utf8");
}

function liveReceipt(name: string): string | undefined {
  const rel = `docs/workbench/receipts/${name}.md`;
  return existsSync(join(ROOT, rel)) ? readText(rel) : undefined;
}

/** The receipts index as it renders at this cut: generated from the directory listing (wb-5zz), never read from a file. */
const renderedIndex = (): string => renderReceiptsIndex(readReceiptsListing(join(ROOT, RECEIPTS_DIR)));

// ---- Mutant authoring only, never the judge (C1). Every page and INDEX edit is located through the lexer: the top-level
// token raws tile the page, a table's raw lines are its header, delimiter and rows, and each rendered character of a cell or
// heading maps back to the source span it renders from. Edits are authored at those positions, so a rendering-neutral
// rewrite of the committed docs (an N control) moves no authoring site, and every locator fails closed when its committed
// anchor is not exactly where the rendered page puts it. Receipt edits keep fail-closed raw anchors (named scope). ----

const at = (code: number): string => String.fromCodePoint(code);
const CARRIER_RELEASE = carrierRelease(REACTIVE_FIBER_CONTRACT_SOURCE) ?? "";
const STAMP_MARKER = "Stamped receipt row (R6/R8, ";
const LEGACY_MARKER = "TRACEABILITY 'Native ecosystem receipts':";
const CLAIM_PHRASE = "node() RF noncommitted context preview capability";
/** The character references decodeReferences() reads (authoring maps each one back to its source span). */
const REFERENCE_ALL = /&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;

type Edit = readonly [start: number, end: number, insert: string];
type Unit = [text: string, start: number, end: number];

interface Lexed {
  text: string;
  tokens: TokensList;
  starts: readonly number[];
}

const LEXED = new Map<string, Lexed>();

/** A page lexed once (LF line ends, as marked reads it) with each top-level token's source offset; the raws must tile it. */
function lexed(source: string): Lexed {
  const cached = LEXED.get(source);
  if (cached !== undefined) return cached;
  const text = source.replace(/\r\n?/g, "\n");
  const tokens = new Lexer({ gfm: true }).lex(text);
  const starts: number[] = [];
  let cursor = 0;
  for (const token of tokens) {
    starts.push(cursor);
    cursor += token.raw.length;
  }
  if (tokens.map((token) => token.raw).join("") !== text) throw new Error("mutant authoring: the top-level token raws do not tile the page");
  const page: Lexed = { text, tokens, starts };
  if (LEXED.size >= 32) LEXED.clear();
  LEXED.set(source, page);
  return page;
}

/** `text` with every edit applied; offsets are into `text`, and edits may touch but never overlap. */
function applyEdits(text: string, edits: readonly Edit[]): string {
  let out = text;
  let limit = text.length;
  for (const [start, end, insert] of [...edits].sort((a, b) => b[0] - a[0] || b[1] - a[1])) {
    if (start < 0 || start > end || end > limit) throw new Error("mutant authoring: edits overlap or leave the page");
    out = `${out.slice(0, start)}${insert}${out.slice(end)}`;
    limit = start;
  }
  return out;
}

/** The units decodeReferences() renders from a text token's text (source offset `start`), each with the span it decodes from. */
function mapDecoded(text: string, start: number, out: Unit[]): void {
  let cursor = 0;
  for (const match of text.matchAll(REFERENCE_ALL)) {
    const from = match.index ?? 0;
    for (; cursor < from; cursor++) out.push([text[cursor] ?? "", start + cursor, start + cursor + 1]);
    const decoded = decodeReferences(match[0]);
    for (let index = 0; index < decoded.length; index++) out.push([decoded[index] ?? "", start + from, start + from + match[0].length]);
    cursor = from + match[0].length;
  }
  for (; cursor < text.length; cursor++) out.push([text[cursor] ?? "", start + cursor, start + cursor + 1]);
}

/** Every unit rendered() reads from inline `tokens` (source offset `base`), each with the source span it renders from. */
function mapInline(tokens: readonly Token[], base: number, out: Unit[]): void {
  let cursor = base;
  for (const token of tokens) {
    const start = cursor;
    cursor += token.raw.length;
    if (UNASSERTED.has(token.type)) continue;
    if (token.type === "br") {
      out.push([" ", start, cursor]);
    } else if (token.type === "escape" || token.type === "codespan") {
      const text = String(token.text);
      const inner = token.type === "escape" ? token.raw.length - text.length : token.raw.indexOf(text);
      if (inner < 0 || token.raw.slice(inner, inner + text.length) !== text) throw new Error(`mutant authoring: no source span for a ${token.type} token`);
      for (let index = 0; index < text.length; index++) out.push([text[index] ?? "", start + inner + index, start + inner + index + 1]);
    } else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) {
      const children: Token[] = token.tokens;
      const inner = token.raw.indexOf(children.map((child) => child.raw).join(""));
      if (inner < 0) throw new Error(`mutant authoring: the ${token.type} token's children do not sit in its source`);
      mapInline(children, start + inner, out);
    } else if (token.type === "text" && token.raw === token.text) {
      mapDecoded(String(token.text), start, out);
    } else {
      throw new Error(`mutant authoring: no rendered map for a ${token.type} token`);
    }
  }
}

/** The units of the collapsed rendered text of inline `tokens` (each white-space run one " " unit, trimmed), checked
 * against rendered() so authoring and the judge read the same text. */
function renderedUnits(tokens: readonly Token[], base: number): Unit[] {
  const raw: Unit[] = [];
  mapInline(tokens, base, raw);
  const units: Unit[] = [];
  for (const [text, start, end] of raw) {
    const last = units.at(-1);
    if (/^[ \t\n\r\f]$/.test(text)) {
      if (last !== undefined && last[0] === " ") last[2] = end;
      else units.push([" ", start, end]);
    } else {
      units.push([text, start, end]);
    }
  }
  while (units[0]?.[0] === " ") units.shift();
  while (units.at(-1)?.[0] === " ") units.pop();
  if (units.map(([text]) => text).join("") !== collapsed(rendered(tokens, ""))) throw new Error("mutant authoring: the rendered map disagrees with the rendered text");
  return units;
}

interface CellSite {
  start: number;
  end: number;
  text: string;
  units: Unit[];
}

/** The cells of one raw table line, located in order by their cell text, each with its rendered units. */
function cellSites(page: Lexed, line: readonly [number, number], cells: readonly Tokens.TableCell[]): CellSite[] {
  const sites: CellSite[] = [];
  let cursor = line[0];
  for (const cell of cells) {
    const start = page.text.indexOf(cell.text, cursor);
    if (start < 0 || start + cell.text.length > line[1] || !/^[ \t|]*$/.test(page.text.slice(cursor, start))) {
      throw new Error(`mutant authoring: cell ${JSON.stringify(cell.text.slice(0, 40))} is not where its raw line puts it`);
    }
    if (cell.tokens.map((token) => token.raw).join("") !== cell.text) throw new Error("mutant authoring: a cell's inline tokens do not tile its text");
    sites.push({ start, end: start + cell.text.length, text: cellText(cell), units: renderedUnits(cell.tokens, start) });
    cursor = start + cell.text.length;
  }
  return sites;
}

/** The [start, end) source lines of the top-level table at token `index`: its header, its delimiter, then each body row. */
function tableLines(page: Lexed, index: number): Array<readonly [number, number]> {
  const table = page.tokens[index];
  if (table === undefined || !isTable(table)) throw new Error("mutant authoring: no table at that token");
  const lines: Array<readonly [number, number]> = [];
  let cursor = page.starts[index] ?? 0;
  for (const line of table.raw.replace(/\n+$/, "").split("\n")) {
    lines.push([cursor, cursor + line.length]);
    cursor += line.length + 1;
  }
  if (lines.length !== table.rows.length + 2) throw new Error("mutant authoring: a table's raw lines are not its header, delimiter and rows");
  return lines;
}

interface RowSite {
  page: Lexed;
  lines: ReadonlyArray<readonly [number, number]>;
  rowLine: readonly [number, number];
  header: CellSite[];
  cells: CellSite[];
}

/** The one body row of a top-level table whose rendered first cell satisfies `first`: its table token and row index. */
function findRow(source: string, first: (text: string) => boolean, label: string): { page: Lexed; index: number; row: number } {
  const page = lexed(source);
  const hits: Array<readonly [number, number]> = [];
  for (const [index, token] of page.tokens.entries()) {
    if (!isTable(token)) continue;
    for (const [row, cells] of token.rows.entries()) {
      if (cells[0] !== undefined && first(cellText(cells[0]))) hits.push([index, row]);
    }
  }
  const hit = hits[0];
  if (hits.length !== 1 || hit === undefined) throw new Error(`mutant authoring expects one ${label}, found ${hits.length}`);
  return { page, index: hit[0], row: hit[1] };
}

/** The committed claim row (its rendered first cell is the committed Feature text, never the judge's folded reading). */
function claimRowSite(source: string): RowSite {
  const { page, index, row } = findRow(source, (text) => text === W10_COMMITTED.firstCells[0], "committed claim row");
  const table = page.tokens[index];
  const lines = tableLines(page, index);
  const headerLine = lines[0];
  const rowLine = lines[row + 2];
  const cells = table !== undefined && isTable(table) ? table.rows[row] : undefined;
  if (table === undefined || !isTable(table) || headerLine === undefined || rowLine === undefined || cells === undefined) throw new Error("mutant authoring: no committed claim row line");
  return { page, lines, rowLine, header: cellSites(page, headerLine, table.header), cells: cellSites(page, rowLine, cells) };
}

function cellUnder(site: RowSite, name: string): CellSite {
  const index = site.header.findIndex((cell) => cell.text === name);
  const cell = site.cells[index];
  if (index < 0 || cell === undefined) throw new Error(`mutant authoring: the claim row's table names no ${name} column`);
  return cell;
}

function firstCell(site: RowSite): CellSite {
  const cell = site.cells[0];
  if (cell === undefined) throw new Error("mutant authoring: the claim row has no cells");
  return cell;
}

const evidenceOf = (site: RowSite): CellSite => cellUnder(site, EVIDENCE_HEADER);

/** The source span of units [from, to) of the one rendered occurrence of `phrase` in a cell. */
function spanOf(cell: CellSite, phrase: string, from = 0, to = phrase.length): readonly [number, number] {
  const found = cell.text.indexOf(phrase);
  const first = cell.units[found + from];
  const last = cell.units[found + to - 1];
  if (phrase === "" || found < 0 || cell.text.indexOf(phrase, found + 1) >= 0 || from >= to || first === undefined || last === undefined) {
    throw new Error(`mutant authoring: ${JSON.stringify(phrase)} does not render exactly once in the cell`);
  }
  return [first[1], last[2]];
}

/** The rendered sentence of a cell that begins with `beginning`, through its period (the judge's ". " split), and its source span. */
function sentenceOf(cell: CellSite, beginning: string): { text: string; span: readonly [number, number] } {
  const found = cell.text.indexOf(beginning);
  const stop = found < 0 ? -1 : cell.text.indexOf(". ", found);
  const end = stop < 0 ? cell.text.length : stop + 1;
  const first = cell.units[found];
  const last = cell.units[end - 1];
  if (found < 0 || cell.text.indexOf(beginning, found + 1) >= 0 || first === undefined || last === undefined) {
    throw new Error(`mutant authoring: no one rendered sentence beginning ${JSON.stringify(beginning)}`);
  }
  return { text: cell.text.slice(found, end), span: [first[1], last[2]] };
}

/** The page with the committed claim row's raw line replaced by `edit(line)`, the lines joined by newlines. */
function editRow(page: string, edit: (row: string) => readonly string[]): string {
  const site = claimRowSite(page);
  const [start, end] = site.rowLine;
  return applyEdits(site.page.text, [[start, end, edit(site.page.text.slice(start, end)).join("\n")]]);
}

/** The page with edits authored at the committed claim row's lexer positions. */
function editClaim(page: string, edit: (site: RowSite) => readonly Edit[]): string {
  const site = claimRowSite(page);
  return applyEdits(site.page.text, edit(site));
}

/** The page with the one rendered occurrence of `phrase` in the claim row's Evidence cell re-authored as `insert`. */
const inEvidence = (page: string, phrase: string, insert: string): string =>
  editClaim(page, (site) => {
    const [start, end] = spanOf(evidenceOf(site), phrase);
    return [[start, end, insert]];
  });

/** A raw span hidden in one complete comment (a complete comment already inside it is dropped first: it renders nothing,
 * and nested it would close the outer comment early). */
const commented = (raw: string): string => `<!-- ${raw.replace(/<!--[\s\S]*?-->/g, "")} -->`;

/** The page with one sentence of the claim row's Evidence cell hidden in an inline comment. */
const hideSentence = (page: string, beginning: string): string =>
  editClaim(page, (site) => {
    const { span } = sentenceOf(evidenceOf(site), beginning);
    return [[span[0], span[1], commented(site.page.text.slice(span[0], span[1]))]];
  });

/** The page with the stamped sentence deleted from the Evidence cell (its preceding space kept, as an editor deletes it). */
const withoutStamp = (page: string): string =>
  editClaim(page, (site) => {
    const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
    return [[span[0], span[1], ""]];
  });

interface HeadingSite {
  page: Lexed;
  index: number;
  start: number;
  heading: Tokens.Heading;
}

/** The one top-level heading that renders as the committed W10 heading text. */
function w10HeadingSite(source: string): HeadingSite {
  const page = lexed(source);
  const hits = page.tokens.flatMap((token, index) => (isHeading(token) && collapsed(rendered(token.tokens, "")) === W10_COMMITTED.heading ? [index] : []));
  const index = hits[0];
  const heading = index === undefined ? undefined : page.tokens[index];
  if (hits.length !== 1 || index === undefined || heading === undefined || !isHeading(heading)) throw new Error(`mutant authoring expects one top-level committed W10 heading, found ${hits.length}`);
  return { page, index, start: page.starts[index] ?? 0, heading };
}

/** The W10 heading's rendered units, each with its source span. */
function headingUnits(site: HeadingSite): Unit[] {
  const inner = site.heading.raw.indexOf(site.heading.tokens.map((token) => token.raw).join(""));
  if (inner < 0) throw new Error("mutant authoring: the W10 heading's inline tokens do not sit in its source");
  return renderedUnits(site.heading.tokens, site.start + inner);
}

/** The source offset of the newline that ends the W10 heading's line. */
function headingLineEnd(site: HeadingSite): number {
  const eol = site.page.text.indexOf("\n", site.start);
  if (eol < 0) throw new Error("mutant authoring: the W10 heading line has no newline");
  return eol;
}

/** The source offset where the W10 section ends: the next top-level level-1/2 heading, or EOF. */
function sectionEnd(site: HeadingSite): number {
  for (let index = site.index + 1; index < site.page.tokens.length; index++) {
    const token = site.page.tokens[index];
    if (token !== undefined && isHeading(token) && token.depth <= 2) return site.page.starts[index] ?? site.page.text.length;
  }
  return site.page.text.length;
}

/** `insert` placed where the W10 heading's line begins. */
function atW10Heading(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  return applyEdits(site.page.text, [[site.start, site.start, insert]]);
}

/** A blank line and then `insert`, placed right after the W10 heading's line. */
function afterW10Heading(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  const next = headingLineEnd(site) + 1;
  return applyEdits(site.page.text, [[next, next, `\n${insert}`]]);
}

/** `insert` placed where the W10 section ends (at the start of the next top-level level-1/2 heading's line). */
function atW10SectionEnd(source: string, insert: string): string {
  const site = w10HeadingSite(source);
  const end = sectionEnd(site);
  return applyEdits(site.page.text, [[end, end, insert]]);
}

/** The source offset just past the delimiter line of the first top-level table after the W10 section (today W11's). */
function nextTableBody(source: string): number {
  const site = w10HeadingSite(source);
  const end = sectionEnd(site);
  const index = site.page.tokens.findIndex((token, position) => (site.page.starts[position] ?? 0) >= end && isTable(token));
  const delimiter = index < 0 ? undefined : tableLines(site.page, index)[1];
  if (delimiter === undefined) throw new Error("mutant authoring: no table after the W10 section");
  return delimiter[1] + 1;
}

/** `line` added as the first body row of the first table after the W10 section. */
function intoNextTable(source: string, line: string): string {
  const body = nextTableBody(source);
  return applyEdits(lexed(source).text, [[body, body, `${line}\n`]]);
}

/** `insert` placed where the raw line of the one "Curated per-role provider tools" row begins (another section's table). */
function atCuratedRow(source: string, insert: string): string {
  const { page, index, row } = findRow(source, (text) => text.startsWith("Curated per-role provider tools"), "Curated per-role provider tools row");
  const line = tableLines(page, index)[row + 2];
  if (line === undefined) throw new Error("mutant authoring: no Curated per-role provider tools row line");
  return applyEdits(page.text, [[line[0], line[0], insert]]);
}

/** The source line of the one INDEX list item that links `name`.md (located through the lexer), and the item. */
function indexItem(index: string, name: string): { page: Lexed; line: readonly [number, number]; item: Tokens.ListItem } {
  const page = lexed(index);
  const hits: Array<{ start: number; item: Tokens.ListItem }> = [];
  for (const [position, token] of page.tokens.entries()) {
    if (!isList(token)) continue;
    if (!token.raw.startsWith(token.items.map((item) => item.raw).join(""))) throw new Error("mutant authoring: a list's items do not tile its source");
    let cursor = page.starts[position] ?? 0;
    for (const item of token.items) {
      if (assertedHrefs(item.tokens).includes(`${name}.md`)) hits.push({ start: cursor, item });
      cursor += item.raw.length;
    }
  }
  const hit = hits[0];
  if (hits.length !== 1 || hit === undefined) throw new Error(`mutant authoring expects one INDEX item linking ${name}.md, found ${hits.length}`);
  return { page, line: [hit.start, hit.start + (hit.item.raw.split("\n")[0] ?? "").length], item: hit.item };
}

/** The INDEX with the line of the item linking `name`.md wrapped in a complete comment. */
function commentIndexLine(index: string, name: string): string {
  const { page, line } = indexItem(index, name);
  return applyEdits(page.text, [[line[0], line[1], `<!-- ${page.text.slice(line[0], line[1])} -->`]]);
}

/** The INDEX with the line of the item linking `name`.md moved into a fenced code block. */
function fenceIndexLine(index: string, name: string): string {
  const { page, line } = indexItem(index, name);
  return applyEdits(page.text, [[line[0], line[1], `\`\`\`\n${page.text.slice(line[0], line[1])}\n\`\`\``]]);
}

/** The INDEX with the destination of the one link to `name`.md wrapped in angle brackets (it renders the same link). Stack-safe:
 * a destination already in angle brackets gains a link title instead (a title renders nothing the INDEX check reads). */
function angleIndexLink(index: string, name: string): string {
  const { page, line, item } = indexItem(index, name);
  const links: Tokens.Link[] = [];
  visit(item.tokens, (token) => {
    if (isLink(token) && token.href === `${name}.md`) links.push(token);
  });
  const link = links[0];
  const text = page.text.slice(line[0], line[1]);
  const found = link === undefined ? -1 : text.indexOf(link.raw);
  if (links.length !== 1 || link === undefined || found < 0 || text.indexOf(link.raw, found + 1) >= 0) throw new Error(`mutant authoring: no one link to ${name}.md in its INDEX line`);
  const end = line[0] + found + link.raw.length;
  for (const [tail, insert] of [[`](${link.href})`, `(<${link.href}>)`], [`](<${link.href}>)`, `(<${link.href}> "receipt")`]] as const) {
    if (link.raw.endsWith(tail)) return applyEdits(page.text, [[end - tail.length + 1, end, insert]]);
  }
  throw new Error(`mutant authoring: the link to ${name}.md has no destination form this control knows`);
}

/** The slots of the live page's stamped sentence (authoring reads the committed page; the judge never reads a file). */
function liveStamp(): StampSlots {
  const slots = stampedParts(readText(MATRIX))?.slots;
  if (slots === undefined) throw new Error("mutant authoring: the live page has no stamped sentence");
  return slots;
}

/** The live receipt reader with `mutate` applied to whatever it reads. */
const readerWith =
  (mutate: (receipt: string) => string): ReadReceipt =>
  (name) => {
    const text = liveReceipt(name);
    return text === undefined ? undefined : mutate(text);
  };

/** The receipt's stamp line hidden in an inline comment (receipt edits keep fail-closed raw anchors). */
function hideStampLine(receipt: string): string {
  const start = receipt.indexOf("  `RF_PREVIEW_RECEIPT");
  const stop = start < 0 ? -1 : receipt.indexOf("`\n", start + 3) + 1;
  if (start < 0 || stop <= 0) throw new Error("mutant authoring: no receipt stamp line");
  return `${receipt.slice(0, start)}  <!-- ${receipt.slice(start + 2, stop)} -->${receipt.slice(stop)}`;
}

/** The receipt's stamp line struck through (a raw anchor on the receipt). */
const strikeStampLine = (receipt: string): string => receipt.replace(/`RF_PREVIEW_RECEIPT [^`\n]*`/, (line) => `~~${line}~~`);

/** The three receipt stamp shapes without a string cli_version (F7). */
const F7_STAMPS = ['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"] as const;

function breakStamp(receipt: string, replacement: string): string {
  return replacement.startsWith("RF_PREVIEW_RECEIPT") ? receipt.replace(STAMP_MARK, replacement) : receipt.replace(`"cli_version":"${CARRIER_RELEASE}"`, replacement);
}

/** The 9df9a03 row without its capability token: an unstamped duplicate claim row (G5-G7). */
const DUP_NO_TOKEN = ROW_AT_9DF9A03.replace(" (reactivefiber.render.preview/v1)", "");

/** The 9df9a03 Feature cell: the withdrawn claim as the row published it. */
const FEATURE_AT_9DF9A03 = ROW_AT_9DF9A03.slice(2, ROW_AT_9DF9A03.indexOf(" | "));
/** The gate-1 row-547 battery's withdrawn claim row, its cells as that battery wrote them. */
const WITHDRAWN_CELLS = [FEATURE_AT_9DF9A03, "landed-gated", "Evidence sentence.", "Caveat sentence."] as const;
const WITHDRAWN_ROW = `| ${WITHDRAWN_CELLS.join(" | ")} |`;

/** A duplicate, unstamped claim row in the gate-1 battery's form (J8, J9, J11). */
const unstampedRow = (first: string): string =>
  `| ${[first, "landed-gated", "Tests: test/workbench-native-rf-preview.test.ts. TRACEABILITY 'Native ecosystem receipts': cmd_994da817d4cd, cmd_7e50a487da08, cmd_386a32a0323b (unstamped 0.1.583-era runs).", "none"].join(" | ")} |`;

/** The first token of each row name: its battery id. */
const rowIds = (rows: ReadonlyArray<readonly [string, ...unknown[]]>): string[] => rows.map(([name]) => name.split(" ")[0] ?? name);

type PageMutant = readonly [string, (source: string) => string, string];
type PageVariant = readonly [string, (source: string) => string, readonly string[]];
type ReceiptMutant = readonly [string, (receipt: string) => string, string];
type ReceiptVariant = readonly [string, (receipt: string) => string, readonly string[]];
type IndexVariant = readonly [string, (index: string, name: string) => string];
type Control = readonly [string, (source: string) => string];

/** The gate-3 row-487 battery, page side: every G and K variant is judged unstamped. */
const GK_PAGE: readonly PageMutant[] = [
  ["G1 stamped sentence wrapped in an inline comment inside the Evidence cell", (source) => hideSentence(source, STAMP_MARKER), "carries no stamped receipt sentence"],
  ["G2 substring inversion: 'unmeasured release'", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `unmeasured release ${CARRIER_RELEASE}`), "is not the committed stamped-sentence slice"],
  ["G3 negated clause: 'though this run never measured release'", (source) => inEvidence(source, `installed rf, measured release ${CARRIER_RELEASE}`, `installed rf, though this run never measured release ${CARRIER_RELEASE}`), "is not the committed stamped-sentence slice"],
  [
    "G4 claim row moved out of the W10 section into the W11 table",
    (source) => {
      const site = claimRowSite(source);
      const [start, end] = site.rowLine;
      const body = nextTableBody(source);
      return applyEdits(site.page.text, [[start, end + 1, ""], [body, body, `${site.page.text.slice(start, end)}\n`]]);
    },
    "the W10 claim row is not inside the W10 section",
  ],
  ["G5 a second, unstamped claim row (the 9df9a03 row without its capability token) beside the stamped one", (source) => editRow(source, (row) => [row, DUP_NO_TOKEN]), "2 table rows on the page read as the W10 claim row"],
  ["G6 stamped row hidden in a multi-line comment behind a visible unstamped claim row", (source) => editRow(source, (row) => [DUP_NO_TOKEN, "<!--", row, "-->"]), "carries no stamped receipt sentence"],
  ["G6b stamped row hidden in a multi-line comment, nothing visible in its place", (source) => editRow(source, (row) => ["<!--", row, "-->"]), "0 table rows on the page read as the W10 claim row"],
  ["G7 stamped row moved into a fenced code block after a visible unstamped claim row", (source) => editRow(source, (row) => [DUP_NO_TOKEN, "", "```", row, "```"]), "carries no stamped receipt sentence"],
  ["G9 the legacy receipt clause wrapped in an inline comment", (source) => hideSentence(source, LEGACY_MARKER), "historical receipt id cmd_994da817d4cd is not in the rendered Evidence cell"],
  ["K1 kill: the stamped sentence removed", withoutStamp, "carries no stamped receipt sentence"],
  ["K2 kill: the measured release restated as 0.1.716", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, "measured release 0.1.716"), "does not equal its slice"],
];

/** The gate-3 row-487 battery, receipt side. */
const GK_RECEIPT: readonly ReceiptMutant[] = [
  ["G8 the receipt's stamp line hidden in an inline comment", hideStampLine, "renders no RF_PREVIEW_RECEIPT line"],
  ["K3 kill: the receipt stamp cli_version moved to 0.1.716", (receipt) => receipt.replace(`"cli_version":"${CARRIER_RELEASE}"`, '"cli_version":"0.1.716"'), "differs from the carrier release"],
];

/** The gate-3 row-487 rendering-neutral controls. */
const R_CONTROLS: readonly Control[] = [
  [
    "R1 an extra space after the row's leading pipe",
    (source) =>
      editClaim(source, (site) => {
        const first = firstCell(site);
        return [[first.start, first.start, " "]];
      }),
  ],
  ["R2 a complete comment quoting the retired literal after a cell sentence", (source) => inEvidence(source, "Bead wb-x32 (open).", "Bead wb-x32 (open). <!-- formerly rf@0.1.583 -->")],
];

/** Hiding and duplication shapes outside the batteries. */
const H_PAGE: readonly PageMutant[] = [
  ["H1 an unclosed details block before the W10 heading", (source) => atW10Heading(source, "<details>\n\n"), "raw HTML"],
  ["H2 a hidden span inside the claim row", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `<span hidden>measured release ${CARRIER_RELEASE}</span>`), "raw HTML"],
  ["H3 an unclosed block comment opened before the W10 heading (marked hides everything after it)", (source) => atW10Heading(source, "<!-- unclosed\n\n"), "0 headings on the page read as a W10 heading"],
  ["H4 a second W10 heading as a setext heading at EOF", (source) => `${source}\nW10: ReactiveFiber provider/interop\n---\n`, "2 headings on the page read as a W10 heading"],
  ["H5 a second W10 heading nested in a list item", (source) => `${source}\n- ## W10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
  ["H6 a second W10 heading with a fullwidth look-alike", (source) => `${source}\n## ${at(0xff37)}10: ReactiveFiber provider/interop\n`, "2 headings on the page read as a W10 heading"],
  [
    "H7 a duplicate claim row with a Cyrillic look-alike first cell, in the W11 table",
    (source) => {
      const site = claimRowSite(source);
      const o = firstCell(site).units[1];
      if (o === undefined || o[0] !== "o") throw new Error("mutant authoring: the claim row's first cell does not render node()");
      const text = site.page.text;
      return intoNextTable(source, `${text.slice(site.rowLine[0], o[1])}${at(0x43e)}${text.slice(o[2], site.rowLine[1])}`);
    },
    "2 table rows on the page read as the W10 claim row",
  ],
  ["H8 the claim row only in a block-quoted table inside the W10 section", (source) => editRow(source, (row) => ["", "> | Feature | Status | Evidence | Caveats |", "> | --- | --- | --- | --- |", `> ${row}`, ""]), "not a body row of a top-level table"],
  [
    "H9 the stamped sentence struck through",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[0], "~~"], [span[1], span[1], "~~"]];
      }),
    "carries no stamped receipt sentence",
  ],
  [
    "H10 the stamped sentence moved from the Evidence cell to the Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        const caveats = cellUnder(site, "Caveats");
        return [[span[0], span[1], ""], [caveats.end, caveats.end, ` ${site.page.text.slice(span[0], span[1])}`]];
      }),
    "carries no stamped receipt sentence",
  ],
  [
    "H11 a negated copy of the stamped sentence beside the real one",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const { span } = sentenceOf(evidence, STAMP_MARKER);
        const [measured] = spanOf(evidence, `measured release ${CARRIER_RELEASE}`);
        const text = site.page.text;
        return [[span[1], span[1], ` ${text.slice(span[0], measured)}never ${text.slice(measured, span[1])}`]];
      }),
    "2 rendered sentences read as a stamped receipt sentence",
  ],
  ["H12 an attribute-bearing tag in another section's table cell", (source) => atCuratedRow(source, '| <id class="x"> '), "raw HTML"],
  ["H13 a raw-text element tag in another section's table cell", (source) => atCuratedRow(source, "| <style> "), "raw HTML"],
  ["H14 a trailing line after a block comment's close", (source) => atW10Heading(source, "<!-- note --> trailing raw text\n\n"), "raw HTML"],
];

/** Rendering-neutral controls outside the batteries. */
const C_CONTROLS: readonly Control[] = [
  ["C1 the page with CRLF line endings", (source) => source.replaceAll("\n", "\r\n")],
  ["C2 a complete comment between the W10 heading and its table", (source) => afterW10Heading(source, "<!-- reviewer note -->\n")],
  ["C3 emphasis around the measured release", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `**measured release ${CARRIER_RELEASE}**`)],
  ["C4 a character reference for a space inside the stamped sentence", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `measured&#32;release ${CARRIER_RELEASE}`)],
  ["C5 an unclosed inline comment opener in another section's cell (marked lexes it as text and escapes it, so it hides nothing)", (source) => atCuratedRow(source, "| <!-- open ")],
];

/** The gate-1 row-500 battery, page side (J1-J19, J25-J27; N6 carried as a kill), each with its named diagnosis. */
const J_PAGE: readonly PageVariant[] = [
  [
    "J1 partial hide: the measured-release half of the stamped sentence in an inline comment",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const { span } = sentenceOf(evidence, STAMP_MARKER);
        const [from] = spanOf(evidence, `measured release ${CARRIER_RELEASE} (RF_PREVIEW_RECEIPT`);
        return [[from, span[1], commented(site.page.text.slice(from, span[1]))]];
      }),
    ["is not the committed stamped-sentence slice"],
  ],
  ["J2 a weakening level-3 subsection inside the W10 section, above the table", (source) => afterW10Heading(source, "### Withdrawn: the rows below are retracted and no longer claimed\n\n"), ['the W10 section holds a level-3 heading "Withdrawn: the rows below are retracted and no longer claimed"']],
  [
    "J3 a weakening paragraph inside the W10 section, above the table",
    (source) => afterW10Heading(source, "**Withdrawn.** The stamped receipt row below was never measured during that run; no claim in this table holds.\n\n"),
    ['the W10 section holds a paragraph block "Withdrawn. The stamped receipt row below was never measured during that run; no claim in this table holds."'],
  ],
  [
    "J4 the claim row moved into a second table under a weakening level-3 subsection, still inside W10",
    (source) => {
      const site = claimRowSite(source);
      const end = sectionEnd(w10HeadingSite(source));
      const text = site.page.text;
      const line = (span: readonly [number, number] | undefined): string => (span === undefined ? "" : text.slice(span[0], span[1]));
      const block = `\n### Withdrawn rows (not claimed)\n\n${line(site.lines[0])}\n${line(site.lines[1])}\n${line(site.rowLine)}\n\n`;
      return applyEdits(text, [[site.rowLine[0], site.rowLine[1] + 1, ""], [end, end, block]]);
    },
    ['the W10 section holds a level-3 heading "Withdrawn rows (not claimed)"', "the W10 section holds 2 tables, not exactly its one committed table"],
  ],
  [
    "J5 the claim row's Status cell weakened to 'withdrawn'",
    (source) =>
      editClaim(source, (site) => {
        const status = cellUnder(site, "Status");
        return [[status.start, status.end, "withdrawn"]];
      }),
    ["the W10 claim row's rendered Status cell reads \"withdrawn\", not its committed text"],
  ],
  [
    "J6 the claim row's Feature cell weakened with a suffix",
    (source) =>
      editClaim(source, (site) => {
        const feature = cellUnder(site, "Feature");
        return [[feature.end, feature.end, " (withdrawn: never measured)"]];
      }),
    ["the W10 claim row's rendered Feature cell reads", "possible per the pinned producer trace (withdrawn: never measured)", "the W10 table's rendered first cells read"],
  ],
  [
    "J7 a trailing sentence after the stamped sentence that contradicts it",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[1], span[1], " The stamp above was not measured during that run."]];
      }),
    ['the rendered Evidence cell holds a sentence outside its committed slice: "The stamp above was not measured during that run."'],
  ],
  ["J8 a duplicate unstamped claim row whose first cell is paraphrased with a hyphen ('non-committed')", (source) => editRow(source, (row) => [row, unstampedRow("node() RF non-committed context preview capability")]), ["the W10 table's rendered first cells read", '"node() RF non-committed context preview capability"']],
  ["J9 a duplicate unstamped claim row whose first cell has a space before the parentheses", (source) => editRow(source, (row) => [row, unstampedRow("node () RF noncommitted context preview capability")]), ["the W10 table's rendered first cells read", '"node () RF noncommitted context preview capability"']],
  [
    "J10 the unstamped claim restated as a list item inside the W10 section, after the table",
    (source) => atW10SectionEnd(source, "\n- node() RF noncommitted context preview capability: landed-gated on cmd_994da817d4cd only (unstamped 0.1.583-era run); no measured release.\n\n"),
    ['the W10 section holds a list block "node() RF noncommitted context preview capability: landed-gated on cmd_994da817d4cd only (unstamped 0.1.583-era run); no measured release."'],
  ],
  ["J11 a duplicate unstamped claim row with the exact capability phrase in another table (W11)", (source) => intoNextTable(source, unstampedRow(CLAIM_PHRASE)), ["2 table rows on the page read as the W10 claim row"]],
  [
    "J12 the stamped sentence hidden in an image's alt text",
    (source) =>
      editClaim(source, (site) => {
        const { text, span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[1], `![${text}](receipt.png)`]];
      }),
    ["carries no stamped receipt sentence"],
  ],
  [
    "J13 the stamped sentence hidden in a link title",
    (source) =>
      editClaim(source, (site) => {
        const { text, span } = sentenceOf(evidenceOf(site), STAMP_MARKER);
        return [[span[0], span[1], `[receipt](receipts/receipt.md "${text.replaceAll('"', "")}")`]];
      }),
    ["carries no stamped receipt sentence"],
  ],
  [
    "J14 the W10 heading demoted to level 3",
    (source) => {
      const site = w10HeadingSite(source);
      const hash = site.heading.raw.indexOf("#");
      if (hash < 0) throw new Error("mutant authoring: the W10 heading is not an ATX heading");
      return applyEdits(site.page.text, [[site.start + hash, site.start + hash, "#"]]);
    },
    ["is not the top-level level-2 heading"],
  ],
  [
    "J15 the W10 heading turned into a bold paragraph",
    (source) => {
      const site = w10HeadingSite(source);
      return applyEdits(site.page.text, [[site.start, headingLineEnd(site), `**${site.heading.text}**`]]);
    },
    ["0 headings on the page read as a W10 heading"],
  ],
  ["J16 a weakening level-2 heading inserted between the W10 heading and its table", (source) => afterW10Heading(source, "## Retracted claims\n\n"), ["the W10 claim row is not inside the W10 section"]],
  ["J17 the stamped sentence's release slot partly struck through", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, `~~measured~~ release ${CARRIER_RELEASE}`), ["is not the committed stamped-sentence slice"]],
  [
    "J18 the legacy receipt clause moved from the Evidence cell to the Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const { span } = sentenceOf(evidenceOf(site), LEGACY_MARKER);
        const caveats = cellUnder(site, "Caveats");
        const trailing = site.page.text[span[1]] === " " ? 1 : 0;
        return [[span[0], span[1] + trailing, ""], [caveats.end, caveats.end, ` ${site.page.text.slice(span[0], span[1])}`]];
      }),
    ["historical receipt id cmd_994da817d4cd is not in the rendered Evidence cell"],
  ],
  [
    "J19 the W10 table's Evidence and Caveats header labels swapped",
    (source) => {
      const site = claimRowSite(source);
      const header = site.lines[0];
      if (header === undefined) throw new Error("mutant authoring: no W10 header line");
      return applyEdits(site.page.text, [[header[0], header[1], "| Feature | Status | Caveats | Evidence |"]]);
    },
    ["carries no stamped receipt sentence"],
  ],
  [
    "J25 a weakening level-1 heading inserted before the W10 heading (W10 now sits under it)",
    (source) => atW10Heading(source, "# Appendix: withdrawn claims (not part of this matrix)\n\n"),
    ['a level-1 heading "Appendix: withdrawn claims (not part of this matrix)" stands between the page title and the W10 heading'],
  ],
  [
    "J26 the W10 heading text weakened with a suffix",
    (source) => {
      const site = w10HeadingSite(source);
      const last = headingUnits(site).at(-1);
      if (last === undefined) throw new Error("mutant authoring: the W10 heading renders nothing");
      return applyEdits(site.page.text, [[last[2], last[2], " (withdrawn)"]]);
    },
    ['the W10 heading renders "W10: ReactiveFiber provider/interop (withdrawn)", not its committed "W10: ReactiveFiber provider/interop"'],
  ],
  [
    "J27 the W10 table header weakened (Evidence column label kept)",
    (source) =>
      editClaim(source, (site) => {
        const feature = site.header[0];
        if (feature === undefined) throw new Error("mutant authoring: no W10 header cells");
        return [[feature.end, feature.end, " (withdrawn, not claimed)"]];
      }),
    ['the W10 table\'s rendered header row reads ["Feature (withdrawn, not claimed)","Status","Evidence","Caveats"]', "the W10 claim row's table names no Feature column"],
  ],
  [
    "N6 (carried as a kill: the first cells are pinned) a new unrelated row above the claim row in the W10 table",
    (source) => editRow(source, (row) => ["| Unrelated RF diagnostics row | planned | none | none |", row]),
    ['the W10 table\'s rendered first cells read ["Unrelated RF diagnostics row",'],
  ],
];

/** The gate-1 row-500 battery, receipt side (receipt edits keep fail-closed raw anchors). */
const J_RECEIPT: readonly ReceiptVariant[] = [
  [
    "J20 a newer receipt entry whose stamp names a different run (the row still cites the old run)",
    (receipt) => `${receipt.replace(/\n+$/, "")}\n\n## 2026-10-18 re-run\n\n- Run of record: forge cmd_0123456789ab.\n- \`RF_PREVIEW_RECEIPT {"cli_version":"${CARRIER_RELEASE}"}\`\n`,
    ["which the receipt entry carrying the newest stamp line does not render"],
  ],
  [
    "J21 a newer receipt entry stamped with an older producer release",
    (receipt) => `${receipt.replace(/\n+$/, "")}\n\n## 2026-10-18 re-run\n\n- Run of record: forge ${liveStamp().cmd}.\n- \`RF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\`\n`,
    ["stamped release 0.1.583 differs from the carrier release"],
  ],
  [
    "J22 the receipt's stamp line moved into an image's alt text",
    (receipt) => {
      const start = receipt.indexOf("  `RF_PREVIEW_RECEIPT");
      const stop = start < 0 ? -1 : receipt.indexOf("`\n", start + 3) + 1;
      if (start < 0 || stop <= 0) throw new Error("mutant authoring: no receipt stamp line");
      return `${receipt.slice(0, start)}  ![${receipt.slice(start + 3, stop - 1)}](stamp.png)${receipt.slice(stop)}`;
    },
    ["renders no RF_PREVIEW_RECEIPT line"],
  ],
  ["J23 every mention of the stamped run id in the receipt wrapped in a comment (stamp line kept)", (receipt) => receipt.replaceAll(liveStamp().cmd, `<!-- ${liveStamp().cmd} -->`), ["which the receipt entry carrying the newest stamp line does not render"]],
];

/** The gate-1 row-500 battery, INDEX side. */
const J_INDEX: readonly IndexVariant[] = [["J24 the receipt's INDEX line moved into a fenced code block", fenceIndexLine]];

/** The gate-1 row-500 rendering-neutral controls on the page: each is accepted, and each is a C1 authoring base. */
const N_PAGE: readonly Control[] = [
  [
    "N1 the claim row's first cell bolded",
    (source) =>
      editClaim(source, (site) => {
        const [start, end] = spanOf(firstCell(site), CLAIM_PHRASE);
        return [[start, start, "**"], [end, end, "**"]];
      }),
  ],
  [
    "N2 the parentheses of the claim row's first cell escaped (stack-safe: the first two not yet escaped)",
    (source) =>
      editClaim(source, (site) => {
        const text = site.page.text;
        const parens = firstCell(site).units.filter(([unit, start]) => (unit === "(" || unit === ")") && text[start - 1] !== "\\");
        const [open, close] = parens;
        if (open === undefined || close === undefined) throw new Error("mutant authoring: no two unescaped parentheses in the claim row's first cell");
        return [[open[1], open[2], `\\${open[0]}`], [close[1], close[2], `\\${close[0]}`]];
      }),
  ],
  [
    "N3 a character reference for the W of the W10 heading (stack-safe: the first heading character written as itself)",
    (source) => {
      const site = w10HeadingSite(source);
      const plain = headingUnits(site).find(([unit, start, end]) => end - start === 1 && /^[0-9A-Za-z]$/.test(unit));
      if (plain === undefined) throw new Error("mutant authoring: no W10 heading character written as itself");
      return applyEdits(site.page.text, [[plain[1], plain[2], `&#${plain[0].codePointAt(0) ?? 0};`]]);
    },
  ],
  [
    "N4 an ATX closing sequence on the W10 heading (stack-safe: an existing closing sequence gains one #)",
    (source) => {
      const site = w10HeadingSite(source);
      const eol = headingLineEnd(site);
      const last = headingUnits(site).at(-1);
      if (last === undefined) throw new Error("mutant authoring: the W10 heading renders nothing");
      const hash = site.page.text.slice(last[2], eol).lastIndexOf("#");
      return hash < 0 ? applyEdits(site.page.text, [[eol, eol, " ##"]]) : applyEdits(site.page.text, [[last[2] + hash + 1, last[2] + hash + 1, "#"]]);
    },
  ],
  [
    "N5 a complete inline comment between two words of the stamped sentence, spaces on both sides",
    (source) =>
      editClaim(source, (site) => {
        const [start] = spanOf(evidenceOf(site), `measured release ${CARRIER_RELEASE} (`, 8, 9);
        return [[start, start, " <!-- c -->"]];
      }),
  ],
  [
    "N7 a link reference definition appended at EOF (renders nothing; stack-safe: a label not yet defined)",
    (source) => {
      const page = lexed(source);
      let label = "rf-receipt";
      for (let next = 1; label in page.tokens.links; next++) label = `rf-receipt-${next}`;
      return `${page.text.replace(/\n+$/, "")}\n\n[${label}]: receipts/receipt.md\n`;
    },
  ],
  [
    "N8 the stamped sentence's receipt path as a link (link text renders; stack-safe: an existing link gains a title)",
    (source) =>
      editClaim(source, (site) => {
        const evidence = evidenceOf(site);
        const receipt = `receipts/${readStampShape(sentenceOf(evidence, STAMP_MARKER).text)?.slots.receipt ?? ""}.md`;
        const [start, end] = spanOf(evidence, `${receipt}, gated`, 0, receipt.length);
        const text = site.page.text;
        if (text[start - 1] !== "[") return [[start, end, `[${receipt}](${receipt})`]];
        if (!text.startsWith(`](${receipt})`, end)) throw new Error("mutant authoring: the receipt path's link has a form this control does not know");
        const close = end + receipt.length + 2;
        return [[close, close, ' "receipt"']];
      }),
  ],
  ["N9 trailing white space after the claim row's closing pipe", (source) => editRow(source, (row) => [`${row}   `])],
];

/** The gate-1 row-500 rendering-neutral control on the INDEX. */
const N_INDEX: readonly IndexVariant[] = [["N10 the INDEX link destination wrapped in angle brackets", angleIndexLink]];

/** The R5 AC1 rows (W) and the gate-1 row-547 battery (X1-X7, wb-2j3.4 respin), each refused with every named diagnosis. */
const W_PAGE: readonly PageVariant[] = [
  ["W1 (AC1, RED at 9df9a03) the claim row as it read at 9df9a03", (source) => editRow(source, () => [ROW_AT_9DF9A03]), [withdrawnCause("Feature", "zero durable writes"), PLANE_SCOPED_CAUSE]],
  [
    "W2 the descriptor's spelling of the withdrawn claim appended to the claim row's Caveats cell",
    (source) =>
      editClaim(source, (site) => {
        const caveats = cellUnder(site, "Caveats");
        return [[caveats.end, caveats.end, " The preview makes no durable writes."]];
      }),
    [withdrawnCause("Caveats", "no durable write"), "the W10 claim row's rendered Caveats cell reads"],
  ],
  [
    "W3 the withdrawn claim with a Cyrillic look-alike o in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has zer${at(0x43e)} durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
  [
    "W4 a one-column table at EOF whose header row is the 9df9a03 Feature cell (a header row reads as a claim row too)",
    (source) => `${source}\n\n| ${FEATURE_AT_9DF9A03} |\n| --- |\n`,
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("column 1", "zero durable writes")],
  ],
  [
    "W5 the plane-scoped clause with a Cyrillic look-alike o in its first word (required text is read exactly, never folded)",
    (source) =>
      editClaim(source, (site) => {
        const [start, end] = spanOf(firstCell(site), "no authoritative");
        return [[start, end, `n${at(0x43e)} authoritative`]];
      }),
    [PLANE_SCOPED_CAUSE, "the W10 claim row's rendered Feature cell reads"],
  ],
  [
    "W6 the withdrawn claim split by an ASCII control character inside its first word in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has ze${at(0x1)}ro durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
  [
    "X1 a duplicate W10 heading at EOF carrying the withdrawn claim row",
    (source) => `${source}\n\n## W10: ReactiveFiber provider/interop\n\n| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n${WITHDRAWN_ROW}\n`,
    ["2 headings on the page read as a W10 heading", "2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X2 a second claim row carrying the withdrawn claim, two leading spaces (still a table row)",
    (source) => editRow(source, (row) => [row, `  ${WITHDRAWN_ROW}`]),
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X3 a second claim row carrying the withdrawn claim, tight pipes",
    (source) => editRow(source, (row) => [row, `|${WITHDRAWN_CELLS.join("|")}|`]),
    ["2 table rows on the page read as the W10 claim row", withdrawnCause("Feature", "zero durable writes")],
  ],
  [
    "X4 a level-1 heading between the W10 heading and its table (the row leaves W10 when rendered)",
    (source) => afterW10Heading(source, "# Appendix: withdrawn rows\n"),
    ["the W10 claim row is not inside the W10 section", "the W10 section holds 0 tables"],
  ],
  ["X5 the claim row hidden in a multi-line HTML comment (it renders nothing)", (source) => editRow(source, (row) => ["<!--", row, "-->"]), ["0 table rows on the page read as the W10 claim row"]],
  [
    "X6 the claim row moved into a fenced code block (it renders as code, not a row)",
    (source) => editRow(source, (row) => ["```", row, "```"]),
    ["0 table rows on the page read as the W10 claim row", "the W10 section holds a code block"],
  ],
  [
    "X7 the withdrawn claim split by a zero-width space in a new Evidence sentence",
    (source) => inEvidence(source, "Bead wb-x32 (open).", `Bead wb-x32 (open). The preview has zero${at(0x200b)} durable writes.`),
    [withdrawnCause("Evidence", "zero durable writes"), "the rendered Evidence cell holds a sentence outside its committed slice"],
  ],
];

/** The gate-1 row-547 rendering-neutral controls (that battery's N1/N2, carried as XN1/XN2): each is accepted. */
const XN_CONTROLS: readonly Control[] = [
  ["XN1 trailing spaces after the claim row's last pipe", (source) => editRow(source, (row) => [`${row}   `])],
  ["XN2 an extra blank line between the W10 heading and its table", (source) => afterW10Heading(source, "")],
];

/** The F rows' page edits (the F tests below author through the same helpers), each with its diagnosis, for C1. */
const F_PAGE: readonly (readonly [string, (source: string) => string, readonly string[], ((receipt: string) => string)?])[] = [
  ["F1", (source) => editRow(source, () => [ROW_AT_9DF9A03]), ["the rendered Evidence cell carries no stamped receipt sentence", "names rf@0.1.583 outside the retirement clause"]],
  ["F2", withoutStamp, ["carries no stamped receipt sentence"]],
  ["F3", (source) => inEvidence(source, `measured release ${CARRIER_RELEASE}`, "measured release 0.1.716"), ["does not equal its slice"]],
  ["F4", (source) => inEvidence(source, liveStamp().cmd, "cmd_000000000000"), ["does not render"]],
  ["F5", (source) => inEvidence(source, liveStamp().cmd, "cmd_994da817d4cd"), ["legacy unstamped ids do not count"], (receipt) => receipt.replaceAll(liveStamp().cmd, "cmd_994da817d4cd")],
  ...LEGACY_UNSTAMPED_IDS.map((id) => [`F12 ${id}`, (source: string) => inEvidence(source, id, "cmd_ffffffffffff"), [`historical receipt id ${id} is not in the rendered Evidence cell`]] as const),
  ["F13", (source) => inEvidence(source, "Bead wb-x32 (open).", "Bead wb-x32 (open). contractSource rf@0.1.583 context.render."), ["names rf@0.1.583 outside the retirement clause"]],
  ["F14", (source) => inEvidence(source, "the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept"), ["outside the retirement clause"]],
];

/** The F rows' receipt edits, for C1. */
const F_RECEIPT: readonly ReceiptVariant[] = [
  ["F6", (receipt) => receipt.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE"), ["renders no RF_PREVIEW_RECEIPT line"]],
  ...F7_STAMPS.map((replacement) => [`F7 ${replacement}`, (receipt: string) => breakStamp(receipt, replacement), ["carries no string cli_version"]] as const),
  ["F8", (receipt) => `${receipt}\nRF_PREVIEW_RECEIPT {"cli_version":"0.1.583"}\n`, ["differs from the carrier release"]],
];

/** Every page variant in this file with its diagnosis (C1 re-authors each on every N base). */
const PAGE_VARIANTS: readonly (readonly [string, (source: string) => string, readonly string[], ((receipt: string) => string)?])[] = [
  ...F_PAGE,
  ...GK_PAGE.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ...H_PAGE.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ...J_PAGE,
  ...W_PAGE,
];

/** Every receipt variant in this file with its diagnosis. */
const RECEIPT_VARIANTS: readonly ReceiptVariant[] = [
  ...F_RECEIPT,
  ...GK_RECEIPT.map(([name, mutate, cause]) => [name, mutate, [cause]] as const),
  ["H15", strikeStampLine, ["renders no RF_PREVIEW_RECEIPT line"]],
  ...J_RECEIPT,
];

/** Every INDEX variant in this file. */
const INDEX_VARIANTS: readonly IndexVariant[] = [["H16", commentIndexLine], ...J_INDEX];

/** Every page control in this file. */
const CONTROLS: readonly Control[] = [...R_CONTROLS, ...C_CONTROLS, ...XN_CONTROLS];

describe("W10 stamped-release claim guard (wb-2j3.5, R6), read as the page renders", () => {
  const carrier = REACTIVE_FIBER_CONTRACT_SOURCE;
  const release = carrierRelease(carrier) ?? "";
  const page = (): string => readText(MATRIX);

  it("L1: the live W10 claim row cites a receipt row stamped with the measured release, and that release matches the R2 carrier", () => {
    expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
  });

  it("L2: the receipt the stamped sentence names is listed in the rendered receipts index (generated from the directory listing, wb-5zz)", () => {
    const parts = stampedParts(page());
    expect(parts).toBeDefined();
    expect(indexFindings(renderedIndex(), parts?.slots.receipt ?? "")).toEqual([]);
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

  it("L5: the lead shape reads back exactly the slots evidenceLead() writes (one source of the committed lead wording)", () => {
    const slots: LeadSlots = { carrier: "rf@9.8.7:x.cli/v1 y --z", date: "2099-01-02", receipt: "wb-abc.1", retired: "1.2.3" };
    expect(readLeadShape(evidenceLead(slots))).toEqual(slots);
  });

  it("L6: the live Evidence cell is its five committed sentences, its lead naming the R2 carrier and the stamped receipt (EVIDENCE COMPOSITION)", () => {
    const evidence = w10View(page()).evidence ?? "";
    const sentences = evidence.split(/(?<=\.) /);
    expect(sentences).toHaveLength(5);
    expect(sentences.slice(1, 4)).toEqual([W10_COMMITTED.tests, W10_COMMITTED.legacy, W10_COMMITTED.bead]);
    const lead = readLeadShape(sentences[0] ?? "");
    expect(lead?.carrier).toBe(carrier);
    expect(lead?.receipt).toBe(stampedParts(page())?.slots.receipt);
    expect(evidenceFindings(evidence, carrier)).toEqual([]);
  });

  it("L7 (wb-2j3.4 AC1): no live row that reads as the W10 claim row renders the withdrawn durable-writes claim, and its Feature cell carries the plane-scoped clause", () => {
    expect(withdrawnClaimView(page())).toEqual([]);
  });

  describe("falsifiers on the judge's own inputs (the fefe71f protections, kept)", () => {
    it("F1 (acceptance 1): the page with the row as it read at 9df9a03 (three unstamped 0.1.583-era receipts, no stamp) FAILS", () => {
      const findings = judgeW10Claim(editRow(page(), () => [ROW_AT_9DF9A03]), liveReceipt, carrier).join("\n");
      expect(findings).toContain("the rendered Evidence cell carries no stamped receipt sentence");
      expect(findings).toContain("names rf@0.1.583 outside the retirement clause");
    });

    it("F2: the stamped sentence removed from the live row (only the legacy ids remain) FAILS", () => {
      const variant = withoutStamp(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("carries no stamped receipt sentence");
    });

    it("F3: the row states a different measured release (0.1.716) than the receipt and carrier stamp FAILS", () => {
      const variant = inEvidence(page(), `measured release ${release}`, "measured release 0.1.716");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not equal its slice");
    });

    it("F4: the stamped sentence names a cmd_* id the receipt does not render FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const variant = inEvidence(page(), cmd, "cmd_000000000000");
      expect(cmd).toMatch(/^cmd_[0-9a-f]{12}$/);
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("does not render");
    });

    it("F5: the only shared receipt id is a legacy unstamped one (stamp id swapped for cmd_994da817d4cd in both row and receipt) FAILS", () => {
      const cmd = stampedParts(page())?.slots.cmd ?? "";
      const swapped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll(cmd, "cmd_994da817d4cd");
      const findings = judgeW10Claim(inEvidence(page(), cmd, "cmd_994da817d4cd"), swapped, carrier).join("\n");
      expect(findings).toContain("legacy unstamped ids do not count");
    });

    it("F6: the cited receipt renders no RF_PREVIEW_RECEIPT stamp line FAILS", () => {
      const stripped: ReadReceipt = (name) => liveReceipt(name)?.replaceAll("RF_PREVIEW_RECEIPT", "RF_PREVIEW_NOTE");
      expect(judgeW10Claim(page(), stripped, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("F7: the receipt stamp has no string cli_version (numeric, empty, or unparsable JSON) FAILS", () => {
      let ran = 0;
      for (const replacement of F7_STAMPS) {
        const broken = readerWith((text) => breakStamp(text, replacement));
        expect(judgeW10Claim(page(), broken, carrier).join("\n"), replacement).toContain("carries no string cli_version");
        ran++;
      }
      expect(ran).toBe(3);
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
      let ran = 0;
      for (const id of LEGACY_UNSTAMPED_IDS) {
        const findings = judgeW10Claim(inEvidence(page(), id, "cmd_ffffffffffff"), liveReceipt, carrier).join("\n");
        expect(findings, id).toContain(`historical receipt id ${id} is not in the rendered Evidence cell`);
        ran++;
      }
      expect(ran).toBe(3);
    });

    it("F13: a stale rf@ literal re-enters a rendered cell outside the retirement clause FAILS, while the retirement clause itself is tolerated", () => {
      const variant = inEvidence(page(), "Bead wb-x32 (open).", "Bead wb-x32 (open). contractSource rf@0.1.583 context.render.");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("names rf@0.1.583 outside the retirement clause");
      expect(judgeW10Claim(page(), liveReceipt, carrier)).toEqual([]);
    });

    it("F14: the stale literal the retirement clause quotes is itself changed to a non-clause form FAILS", () => {
      const variant = inEvidence(page(), "the earlier rf@0.1.583 literal is retired", "the earlier rf@0.1.583 literal is kept");
      expect(variant).not.toBe(page());
      expect(judgeW10Claim(variant, liveReceipt, carrier).join("\n")).toContain("outside the retirement clause");
    });

    it("U3 (EACH-LIVENESS): the shapes the F7 and F12 loops walk are exactly their pinned rows", () => {
      expect(F7_STAMPS).toHaveLength(3);
      expect(F7_STAMPS).toEqual(['"cli_version":0.1', '"cli_version":""', "RF_PREVIEW_RECEIPT {not json"]);
      expect(LEGACY_UNSTAMPED_IDS).toHaveLength(3);
      expect(LEGACY_UNSTAMPED_IDS).toEqual(["cmd_994da817d4cd", "cmd_7e50a487da08", "cmd_386a32a0323b"]);
    });
  });

  describe("independently-authored docs battery (gate-3 row 487, carried as the same raw-markdown edits): every G and K variant is judged unstamped", () => {
    for (const [name, mutate, cause] of GK_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    for (const [name, mutate, cause] of GK_RECEIPT) {
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

    for (const [name, mutate] of R_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the G/K tables and the R controls hold exactly their named rows, in order", () => {
      expect(GK_PAGE).toHaveLength(11);
      expect(rowIds(GK_PAGE)).toEqual(["G1", "G2", "G3", "G4", "G5", "G6", "G6b", "G7", "G9", "K1", "K2"]);
      expect(GK_RECEIPT).toHaveLength(2);
      expect(rowIds(GK_RECEIPT)).toEqual(["G8", "K3"]);
      expect(R_CONTROLS).toHaveLength(2);
      expect(rowIds(R_CONTROLS)).toEqual(["R1", "R2"]);
    });
  });

  describe("hiding and duplication shapes outside the battery (H) and rendering-neutral controls (C)", () => {
    for (const [name, mutate, cause] of H_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        expect(findings.join("\n"), name).toContain(cause);
      });
    }

    it("refuses H15 the receipt stamp line struck through", () => {
      const struck = readerWith(strikeStampLine);
      const named = stampedParts(page())?.slots.receipt ?? "";
      expect(struck(named)).not.toBe(liveReceipt(named));
      expect(judgeW10Claim(page(), struck, carrier).join("\n")).toContain("renders no RF_PREVIEW_RECEIPT line");
    });

    it("refuses H16 the receipt's INDEX line wrapped in a complete comment", () => {
      const named = stampedParts(page())?.slots.receipt ?? "";
      const index = renderedIndex();
      const variant = commentIndexLine(index, named);
      expect(named).not.toBe("");
      expect(variant).not.toBe(index);
      expect(indexFindings(variant, named).join("\n")).toContain(`renders no link to ${named}.md`);
    });

    for (const [name, mutate] of C_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the H table and the C controls hold exactly their named rows, in order", () => {
      expect(H_PAGE).toHaveLength(14);
      expect(rowIds(H_PAGE)).toEqual(["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13", "H14"]);
      expect(C_CONTROLS).toHaveLength(5);
      expect(rowIds(C_CONTROLS)).toEqual(["C1", "C2", "C3", "C4", "C5"]);
    });
  });

  describe("independently-authored docs battery (gate-1 row 500, carried as lexer-located edits): every J variant is refused with its named diagnosis and every N control accepted", () => {
    for (const [name, mutate, causes] of J_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, mutate, causes] of J_RECEIPT) {
      it(`refuses ${name}`, () => {
        const mutated = readerWith(mutate);
        const named = stampedParts(page())?.slots.receipt ?? "";
        expect(mutated(named)).not.toBe(liveReceipt(named));
        const findings = judgeW10Claim(page(), mutated, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, mutate] of J_INDEX) {
      it(`refuses ${name}`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const variant = mutate(index, named);
        expect(named).not.toBe("");
        expect(variant).not.toBe(index);
        expect(indexFindings(variant, named).join("\n")).toContain(`renders no link to ${named}.md`);
      });
    }

    for (const [name, neutral] of N_PAGE) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = neutral(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
      });
    }

    for (const [name, neutral] of N_INDEX) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const variant = neutral(index, named);
        expect(variant).not.toBe(index);
        expect(indexFindings(variant, named)).toEqual([]);
      });
    }

    it("U3 (EACH-LIVENESS): the J and N tables hold exactly their named rows, in order", () => {
      expect(J_PAGE).toHaveLength(23);
      expect(rowIds(J_PAGE)).toEqual(["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J25", "J26", "J27", "N6"]);
      expect(J_RECEIPT).toHaveLength(4);
      expect(rowIds(J_RECEIPT)).toEqual(["J20", "J21", "J22", "J23"]);
      expect(J_INDEX).toHaveLength(1);
      expect(rowIds(J_INDEX)).toEqual(["J24"]);
      expect(N_PAGE).toHaveLength(8);
      expect(rowIds(N_PAGE)).toEqual(["N1", "N2", "N3", "N4", "N5", "N7", "N8", "N9"]);
      expect(N_INDEX).toHaveLength(1);
      expect(rowIds(N_INDEX)).toEqual(["N10"]);
    });
  });

  describe("W10 withdrawn-claim rows (wb-2j3.4 AC1) and the gate-1 row-547 battery, carried as lexer-located edits: every W and X variant is refused with each named diagnosis and every XN control accepted", () => {
    for (const [name, mutate, causes] of W_PAGE) {
      it(`refuses ${name}`, () => {
        const variant = mutate(page());
        expect(variant).not.toBe(page());
        const findings = judgeW10Claim(variant, liveReceipt, carrier);
        expect(findings, name).not.toEqual([]);
        let ran = 0;
        for (const cause of causes) {
          expect(findings.join("\n"), name).toContain(cause);
          ran++;
        }
        expect(ran, name).toBe(causes.length);
        expect(ran, name).toBeGreaterThan(0);
      });
    }

    for (const [name, neutral] of XN_CONTROLS) {
      it(`still accepts ${name} (rendering-neutral)`, () => {
        const variant = neutral(page());
        expect(variant).not.toBe(page());
        expect(judgeW10Claim(variant, liveReceipt, carrier)).toEqual([]);
        expect(withdrawnClaimView(variant)).toEqual([]);
      });
    }

    it("W0: the 9df9a03 row alone, read by the WITHDRAWN CLAIM reading only, names its withdrawn claim and its missing plane-scoped clause", () => {
      const findings = withdrawnClaimView(editRow(page(), () => [ROW_AT_9DF9A03]));
      expect(findings).toHaveLength(2);
      expect(findings[0]).toContain(withdrawnCause("Feature", "zero durable writes"));
      expect(findings[1]).toBe(PLANE_SCOPED_CAUSE);
    });

    it("U3 (EACH-LIVENESS): the W table and the XN controls hold exactly their named rows, in order", () => {
      expect(W_PAGE).toHaveLength(13);
      expect(rowIds(W_PAGE)).toEqual(["W1", "W2", "W3", "W4", "W5", "W6", "X1", "X2", "X3", "X4", "X5", "X6", "X7"]);
      expect(XN_CONTROLS).toHaveLength(2);
      expect(rowIds(XN_CONTROLS)).toEqual(["XN1", "XN2"]);
    });

    it("W-SHAPE (standing rule 16 frozen shape): the withdrawn claims, the plane-scoped clause, every W and X row with its diagnoses and the XN controls are their frozen literal", () => {
      expect(WITHDRAWN_CLAIMS).toEqual(["zero durable writes", "no durable write"]);
      expect(PLANE_SCOPED_CLAUSE).toBe("no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace");
      expect(W_PAGE.map(([name, , causes]) => `${name.split(" ")[0] ?? name}:${causes.length}`)).toEqual(["W1:2", "W2:2", "W3:2", "W4:2", "W5:2", "W6:2", "X1:3", "X2:2", "X3:2", "X4:2", "X5:1", "X6:2", "X7:2"]);
      expect(W_PAGE.map(([name, , causes]) => [name, ...causes])).toEqual([
        ["W1 (AC1, RED at 9df9a03) the claim row as it read at 9df9a03", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell', 'the W10 claim row\'s rendered Feature cell does not carry the plane-scoped clause "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"'],
        ["W2 the descriptor's spelling of the withdrawn claim appended to the claim row's Caveats cell", 'a row that reads as the W10 claim row renders the withdrawn claim "no durable write" in its Caveats cell', "the W10 claim row's rendered Caveats cell reads"],
        ["W3 the withdrawn claim with a Cyrillic look-alike o in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
        ["W4 a one-column table at EOF whose header row is the 9df9a03 Feature cell (a header row reads as a claim row too)", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its column 1 cell'],
        ["W5 the plane-scoped clause with a Cyrillic look-alike o in its first word (required text is read exactly, never folded)", 'the W10 claim row\'s rendered Feature cell does not carry the plane-scoped clause "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace"', "the W10 claim row's rendered Feature cell reads"],
        ["W6 the withdrawn claim split by an ASCII control character inside its first word in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
        ["X1 a duplicate W10 heading at EOF carrying the withdrawn claim row", "2 headings on the page read as a W10 heading", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X2 a second claim row carrying the withdrawn claim, two leading spaces (still a table row)", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X3 a second claim row carrying the withdrawn claim, tight pipes", "2 table rows on the page read as the W10 claim row", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Feature cell'],
        ["X4 a level-1 heading between the W10 heading and its table (the row leaves W10 when rendered)", "the W10 claim row is not inside the W10 section", "the W10 section holds 0 tables"],
        ["X5 the claim row hidden in a multi-line HTML comment (it renders nothing)", "0 table rows on the page read as the W10 claim row"],
        ["X6 the claim row moved into a fenced code block (it renders as code, not a row)", "0 table rows on the page read as the W10 claim row", "the W10 section holds a code block"],
        ["X7 the withdrawn claim split by a zero-width space in a new Evidence sentence", 'a row that reads as the W10 claim row renders the withdrawn claim "zero durable writes" in its Evidence cell', "the rendered Evidence cell holds a sentence outside its committed slice"],
      ]);
      expect(XN_CONTROLS.map(([name]) => name)).toEqual(["XN1 trailing spaces after the claim row's last pipe", "XN2 an extra blank line between the W10 heading and its table"]);
    });
  });

  describe("C1: authoring follows the rendered page, so on every rendering-neutral base (N) each variant is still authored and refused with its diagnosis and each control still accepted", () => {
    for (const [name, neutral] of N_PAGE) {
      const id = name.split(" ")[0] ?? name;
      it(`on the ${id} base every page and receipt variant is re-authored and refused, and every R and C control accepted`, () => {
        const base = neutral(page());
        expect(base).not.toBe(page());
        expect(judgeW10Claim(base, liveReceipt, carrier)).toEqual([]);
        let ran = 0;
        for (const [variant, mutate, causes, receipt] of PAGE_VARIANTS) {
          const edited = mutate(base);
          expect(edited, `${id} + ${variant}`).not.toBe(base);
          const findings = judgeW10Claim(edited, receipt === undefined ? liveReceipt : readerWith(receipt), carrier).join("\n");
          for (const cause of causes) expect(findings, `${id} + ${variant}`).toContain(cause);
          ran++;
        }
        for (const [variant, mutate, causes] of RECEIPT_VARIANTS) {
          const findings = judgeW10Claim(base, readerWith(mutate), carrier).join("\n");
          for (const cause of causes) expect(findings, `${id} + ${variant}`).toContain(cause);
          ran++;
        }
        for (const [control, mutate] of CONTROLS) {
          expect(judgeW10Claim(mutate(base), liveReceipt, carrier), `${id} + ${control}`).toEqual([]);
          ran++;
        }
        expect(ran).toBe(92);
      }, 120_000);
    }

    for (const [name, neutral] of N_INDEX) {
      const id = name.split(" ")[0] ?? name;
      it(`on the ${id} INDEX base every INDEX variant is re-authored and refused, and the base itself accepted`, () => {
        const named = stampedParts(page())?.slots.receipt ?? "";
        const index = renderedIndex();
        const base = neutral(index, named);
        expect(base).not.toBe(index);
        expect(indexFindings(base, named)).toEqual([]);
        let ran = 0;
        for (const [variant, mutate] of INDEX_VARIANTS) {
          const edited = mutate(base, named);
          expect(edited, `${id} + ${variant}`).not.toBe(base);
          expect(indexFindings(edited, named).join("\n"), `${id} + ${variant}`).toContain(`renders no link to ${named}.md`);
          ran++;
        }
        expect(ran).toBe(2);
      });
    }

    it("U3 (EACH-LIVENESS): the C1 tables hold exactly the file's page, receipt, INDEX and control rows", () => {
      expect(PAGE_VARIANTS).toHaveLength(71);
      expect(rowIds(F_PAGE)).toEqual(["F1", "F2", "F3", "F4", "F5", "F12", "F12", "F12", "F13", "F14"]);
      expect(PAGE_VARIANTS.map(([name]) => name)).toEqual([...F_PAGE, ...GK_PAGE, ...H_PAGE, ...J_PAGE, ...W_PAGE].map(([name]) => name));
      expect(RECEIPT_VARIANTS).toHaveLength(12);
      expect(rowIds(RECEIPT_VARIANTS)).toEqual(["F6", "F7", "F7", "F7", "F8", "G8", "K3", "H15", "J20", "J21", "J22", "J23"]);
      expect(INDEX_VARIANTS).toHaveLength(2);
      expect(rowIds(INDEX_VARIANTS)).toEqual(["H16", "J24"]);
      expect(CONTROLS).toHaveLength(9);
      expect(rowIds(CONTROLS)).toEqual(["R1", "R2", "C1", "C2", "C3", "C4", "C5", "XN1", "XN2"]);
    });
  });
});
