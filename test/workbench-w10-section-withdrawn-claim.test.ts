/**
 * wb-64x, owner F2 / ORCH-REC-R548: "one section-level census over the docs W10 rows judging every cell of every row
 * for the withdrawn/negated-claim class (rendered-model text ... never a raw-line scan)". Gate X8/X9/X10 are re-authored
 * as synthetic pages: W10 prose, the second row's Caveats, and a W10 capability row relocated into W11.
 *
 * READING: one marked 18.0.11 GFM lex supplies section bounds, row identities and all text. The unique W10 heading is
 * top-level level 2 under the matrix title; bounds end at the next top-level level 1/2 heading or EOF. Every header and
 * body cell of every table anywhere inside that section, and its visible prose/list/quote/code text, is judged. Outside
 * W10, rows whose Feature reads as either W10 capability key are also judged (X10 relocation). Neither membership nor
 * detection depends on the committed claim row's exact wording. Nonempty W10 table/row presence is required.
 *
 * Pinned scope after refusal #3: U1 list-nested table and list raw HTML; U2 rendered relocated key; U3 soft break/tab;
 * U4 width 2 and width 3; U5 uppercase-X/zero-padded references; U6 three complete-comment boundaries; F5 header
 * relocation, F6 C0 folding and F7 post-removal space collapse. F8 remains the named GN12/GN13 shape-only residual.
 * The row-roster geometry is anchored to the live W10 document's rendered table, not only this census's own literals.
 * The current-doc row count is a cut-time literal (2); a later W10 table or row expansion must update this census.
 * The independently pinned W10 stamped-claim guard remains unchanged.
 * The RESIDUALS roster is anchored outside this file as well (wb-64x.1, the CT6 / 6ze.39 class): docs/workbench/14
 * "W10 withdrawn-claim census residuals" names each quiet row with its family, an exemplar its page carries exactly once
 * and a clear form whose page reads the withdrawn claim where that table says; judged both ways, rows frozen as read.
 * wb-5jha (R660 F1, the hk9l roster pattern): the named residual quiet rows docs/14 does not carry - the C3 control
 * (unrelated prose outside W10) and the GN12/GN13 shape-only nesting/title-depth legs - are anchored OUT OF FILE in
 * test/fixtures/w10-withdrawn-claim-roster.json: id, family, registered test name, the full sha256 of the quiet page
 * and its frozen reading, in census order. The roster case judges those rows at test time and requires the fixture,
 * the in-file rows and the registered tests to agree exactly, both ways, so a row dropped, renamed or silenced in every
 * literal of this file still reds. Not claimed: an edit of this file and the fixture together, or of the roster case.
 * F9's title is narrowed to column 1, while the independent HEADERS roster judges every column. A newly discovered
 * escape adds a named residual unless it contradicts one of these pinned claims (rule 19(c), enumerate-the-resolvable).
 * Withdrawn spellings: "zero durable writes" and "no durable write" (including its plural). Rendered inline emphasis,
 * escapes, code spans and link TEXT compose before detection; link destinations/titles, images, definitions and complete
 * comments are not claims. Numeric/common named references decode; unknown named references use the folded wildcard; NFKC/case/whitespace/format-control folding follows
 * the landed W10 guard; non-ASCII look-alikes match 0-3 characters. Cells stay separate: a phrase split across cells is
 * not one claim. Raw HTML other than a complete comment inside W10 is refused rather than guessed at.
 *
 * Scope is the two published universal negatives, not a general natural-language entailment checker. Residuals: ASCII
 * look-alikes, hyphenated/new paraphrases, struck-through text (the landed reading's unasserted del set), renamed W10
 * capability rows outside W10, inline HTML in relocated rows (including a br-split claim), the W10 heading text itself,
 * and unrelated prose outside W10. The gate's GN12/GN13 shape-only nesting/title-depth legs remain named residuals:
 * each has an independently pinned quiet row below. GN14 was equivalent on the measured pages; GN15 changed diagnosis
 * location only. ASCII look-alikes, new paraphrases, struck-through text, renamed relocated keys, inline HTML in
 * relocated rows, W10 heading text and unrelated outside prose remain named residuals, not universal claims.
 * No provider/receipt claims are inferred here. The stamped
 * guard remains independent and unchanged. Synthetic falsifiers do not bind mutable live W10 docs wording (only the
 * RESIDUALS exemplars are bound, to the docs/14 anchor above). Rule 16 freezes
 * each row's full requirement/name and each location/claim diagnosis, not only counts. No processes or scratch allocations.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Lexer, type Token, type Tokens, type TokensList } from "marked";
import { describe, expect, it } from "vitest";

const TITLE = "Workbench release feature matrix";
const HEADING = "W10: ReactiveFiber provider/interop";
const CLAIMS = ["zero durable writes", "no durable write"] as const;
const ROW_KEYS = ["node() rf noncommitted context preview capability", "reactivefiber reader adapter"] as const;
const REFERENCES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const SILENT = new Set(["html", "image", "del", "def", "space", "hr", "checkbox"]);

function decode(text: string): string {
  return text.replace(/&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole: string, decimal?: string, hex?: string, name?: string) => {
    const point = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    return point === undefined ? REFERENCES[name ?? ""] ?? String.fromCodePoint(0xfffd) : point <= 0x10ffff ? String.fromCodePoint(point) : whole;
  });
}
function fold(text: string): string {
  return decode(text).normalize("NFKC").replace(/[\s\p{Zs}]+/gu, " ").replace(/[\p{Cc}\p{Cf}\p{Mn}\p{Me}]/gu, "").replace(/ +/g, " ").trim().toLowerCase();
}
/** The landed folded-key reading, with optional restart at every character for substring detection. */
function reads(text: string, key: string, anywhere = false): boolean {
  let reach = new Set([0]);
  for (const char of fold(text)) {
    if (reach.has(key.length)) return true;
    const next = new Set<number>(anywhere ? [0] : []);
    for (const position of reach) {
      if ((char.codePointAt(0) ?? 0) > 0x7f) {
        for (let width = 0; width <= 3 && position + width <= key.length; width++) next.add(position + width);
      } else if (key[position] === char) next.add(position + 1);
    }
    reach = next;
  }
  return reach.has(key.length);
}
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
function children(token: Token): readonly Token[] {
  return "tokens" in token && Array.isArray(token.tokens) ? token.tokens : [];
}
function walk(tokens: readonly Token[], visit: (token: Token) => void): void {
  for (const token of tokens) {
    visit(token);
    if (isTable(token)) for (const cell of [...token.header, ...token.rows.flat()]) walk(cell.tokens, visit);
    else if (isList(token)) for (const item of token.items) walk(item.tokens, visit);
    else walk(children(token), visit);
  }
}
function rendered(tokens: readonly Token[], separator = ""): string {
  const parts: string[] = [];
  for (const token of tokens) {
    if (SILENT.has(token.type)) continue;
    if (token.type === "br") parts.push(" ");
    else if (token.type === "code" || token.type === "codespan" || token.type === "escape") parts.push(String(token.text));
    else if (isList(token)) parts.push(token.items.map(item => rendered(item.tokens, "\n")).join("\n"));
    else if (isTable(token)) parts.push([token.header, ...token.rows].map(row => row.map(cell => rendered(cell.tokens)).join(" | ")).join("\n"));
    else if (children(token).length > 0) parts.push(rendered(children(token), token.type === "blockquote" ? "\n" : ""));
    else if ("text" in token && typeof token.text === "string") parts.push(decode(token.text));
  }
  return parts.join(separator);
}
const cellText = (cell: Tokens.TableCell): string => rendered(cell.tokens).replace(/\s+/g, " ").trim();
function completeComment(raw: string): boolean {
  const text = raw.trim();
  if (text === "<!-->" || text === "<!--->") return true;
  if (!text.startsWith("<!--") || !text.endsWith("-->") || text.length < 7) return false;
  const body = text.slice(4, -3);
  return !body.startsWith(">") && !body.startsWith("->") && !body.includes("-->") && !body.includes("--!>");
}
interface Finding { readonly location: string; readonly claim: string }
const detected = (text: string, location: string): Finding[] => CLAIMS.filter(claim => reads(text, claim, true)).map(claim => ({ location, claim }));
interface Reading { readonly shape: readonly string[]; readonly claims: readonly Finding[] }
/** Pure census: shape failures never suppress the separately reported withdrawn-claim diagnosis. */
function judgeSection(page: string): Reading {
  const tokens: TokensList = new Lexer({ gfm: true }).lex(page);
  const shape: string[] = [];
  const claims: Finding[] = [];
  const headings: Array<{ top: number; nested: boolean; depth: number }> = [];
  tokens.forEach((top, index) => { walk([top], token => {
    if (isHeading(token) && reads(rendered(token.tokens), "w10") && !/^w10[0-9]/.test(fold(rendered(token.tokens)))) headings.push({ top: index, nested: token !== top, depth: token.depth });
  }); });
  const heading = headings[0];
  const start = headings.length === 1 && heading !== undefined && !heading.nested && heading.depth === 2 ? heading.top : -1;
  if (start < 0) shape.push("W10 must have exactly one top-level level-2 heading");
  let end = tokens.length;
  if (start >= 0) {
    for (let index = start + 1; index < tokens.length; index++) {
      const token = tokens[index];
      if (token !== undefined && isHeading(token) && token.depth <= 2) { end = index; break; }
    }
    const title = tokens.find(isHeading);
    if (title === undefined || title.depth !== 1 || rendered(title.tokens) !== TITLE || tokens.indexOf(title) >= start) shape.push("W10 must belong to the matrix title");
    walk(tokens.slice(0, start), token => { if (isHeading(token) && token.depth === 1 && token !== title) shape.push("W10 has an intervening level-1 parent"); });
  }
  let tables = 0;
  let rows = 0;
  tokens.forEach((top, index) => {
    const inSection = start >= 0 && index > start && index < end;
    let tableNumber = 0;
    if (inSection && !isTable(top)) claims.push(...detected(rendered([top], "\n"), `W10 ${top.type}`));
    walk([top], token => {
      if (inSection && token.type === "html" && !completeComment(token.raw)) shape.push("W10 contains raw HTML, not a complete comment");
      if (!isTable(token)) return;
      tableNumber++;
      if (inSection) { tables++; rows += token.rows.length; }
      for (const [rowIndex, cells] of [token.header, ...token.rows].entries()) {
        const first = cells[0];
        const related = first !== undefined && ROW_KEYS.some(key => reads(cellText(first), key));
        if (!inSection && !related) continue;
        for (const [column, cell] of cells.entries()) {
          const name = token.header[column];
          claims.push(...detected(cellText(cell), `${inSection ? "W10" : "outside W10"} table ${tableNumber} ${rowIndex === 0 ? "header" : `row ${rowIndex}`} ${name === undefined || rowIndex === 0 ? `column ${column + 1}` : cellText(name)}`));
        }
      }
    });
  });
  if (start >= 0 && (tables === 0 || rows === 0)) shape.push("W10 must contain a nonempty rendered table");
  return { shape, claims };
}

const FEATURE = "node() RF noncommitted context preview capability with graph provenance; no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace";
const ADAPTER = "ReactiveFiber reader adapter projecting NativeSnapshots";
const TABLE = `| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n| ${FEATURE} | landed-gated | Preview measured. | Partial interop. |\n| ${ADAPTER} | landed-gated | Adapter measured. | Reader only. |`;
const page = (table = TABLE, extra = "", w11 = "Other feature."): string => `# ${TITLE}\n\n## ${HEADING}\n\n${table}\n\n${extra}\n\n## W11: MechanicalWorkflows binding host\n\n${w11}\n`;
const appendCell = (row: number, column: number, text: string): string => {
  const lines = TABLE.split("\n");
  const cells = (lines[row + 2] ?? "").split("|");
  cells[column + 1] = `${cells[column + 1] ?? ""} ${text} `;
  lines[row + 2] = cells.join("|");
  return page(lines.join("\n"));
};
interface Variant { readonly id: string; readonly requirement: string; readonly input: string; readonly pins: readonly Finding[] }
const VARIANTS: readonly Variant[] = [
  { id: "X8", requirement: "W10 paragraph after the table asserting the withdrawn claim", input: page(TABLE, "The rf preview performs zero durable writes."), pins: [{ location: "W10 paragraph", claim: "zero durable writes" }] },
  { id: "X9", requirement: "second W10 row Caveats cell asserting the withdrawn claim", input: appendCell(1, 3, "The rf preview has zero durable writes. No durable write occurs."), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }, { location: "W10 table 1 row 2 Caveats", claim: "no durable write" }] },
  { id: "X10", requirement: "withdrawn W10 capability row planted in the W11 table", input: page(TABLE, "", `| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n| ${FEATURE} with zero durable writes | partial | Measured. | No durable write occurs. |`), pins: [{ location: "outside W10 table 1 row 1 Feature", claim: "zero durable writes" }, { location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "P1", requirement: "nested subsection prose remains inside W10", input: page(TABLE, "### Qualification\n\nThe preview has no durable writes."), pins: [{ location: "W10 paragraph", claim: "no durable write" }] },
  { id: "P2", requirement: "list and quote text remain inside W10", input: page(TABLE, "- Preview has zero durable writes.\n\n> It has no durable write."), pins: [{ location: "W10 list", claim: "zero durable writes" }, { location: "W10 blockquote", claim: "no durable write" }] },
  { id: "P3", requirement: "visible fenced code is not silently excluded from W10", input: page(TABLE, "```text\nzero durable writes\n```"), pins: [{ location: "W10 code", claim: "zero durable writes" }] },
  { id: "T1", requirement: "a third unrelated W10 row is still section-scoped", input: page(`${TABLE}\n| Another row | planned | zero durable writes | no durable write |`), pins: [{ location: "W10 table 1 row 3 Evidence", claim: "zero durable writes" }, { location: "W10 table 1 row 3 Caveats", claim: "no durable write" }] },
  { id: "T2", requirement: "a second W10 table is scanned", input: page(TABLE, "| Feature | Caveats |\n| --- | --- |\n| Other | zero durable writes |"), pins: [{ location: "W10 table 1 row 1 Caveats", claim: "zero durable writes" }] },
  { id: "T3", requirement: "a relocated adapter row is judged outside W10", input: page(TABLE, "", `| Feature | Caveats |\n| --- | --- |\n| ${ADAPTER} | no durable write |`), pins: [{ location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "R1", requirement: "inline rendering composes emphasis link text and code span", input: appendCell(1, 3, "**zero** [durable](https://example.invalid/fixture) `writes`. no durable writ**e**."), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }, { location: "W10 table 1 row 2 Caveats", claim: "no durable write" }] },
  { id: "R2", requirement: "numeric references whitespace and case render a withdrawn claim", input: appendCell(1, 2, "ZERO&#32;DURABLE&#x20;WRITES"), pins: [{ location: "W10 table 1 row 2 Evidence", claim: "zero durable writes" }] },
  { id: "R3", requirement: "zero-width format point cannot split a withdrawn claim", input: appendCell(1, 3, `ze${String.fromCodePoint(0x200b)}ro durable writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R4", requirement: "non-ASCII look-alike cannot evade the folded-key reading", input: appendCell(1, 3, `zero dura${String.fromCodePoint(0x3b2)}le writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R5", requirement: "a hard line break supplies the space inside a W10 paragraph claim", input: page(TABLE, "The preview has zero durable  \nwrites."), pins: [{ location: "W10 paragraph", claim: "zero durable writes" }] },
  { id: "X11", requirement: "a relocated adapter row before W10 is judged", input: page().replace(`## ${HEADING}`, `## W09: Earlier section\n\n| Feature | Caveats |\n| --- | --- |\n| ${ADAPTER} | no durable write |\n\n## ${HEADING}`), pins: [{ location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "X12", requirement: "a relocated adapter row nested in an outside blockquote is judged", input: page(TABLE, "", `> | Feature | Caveats |\n> | --- | --- |\n> | ${ADAPTER} | no durable write |`), pins: [{ location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "R6", requirement: "a common named reference supplies whitespace inside the claim", input: appendCell(1, 3, "zero&nbsp;durable writes"), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R7", requirement: "an unknown named reference uses the replacement-character wildcard", input: appendCell(1, 3, "zero dur&shy;able writes"), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "P4", requirement: "a W10 subsection heading carrying the claim is judged", input: page(TABLE, "### Preview has zero durable writes"), pins: [{ location: "W10 heading", claim: "zero durable writes" }] },
  { id: "P5", requirement: "a nested level-2 heading does not end W10 before a paragraph claim", input: page(TABLE, "> ## Aside\n\nThe preview has zero durable writes."), pins: [{ location: "W10 paragraph", claim: "zero durable writes" }] },
  { id: "P6", requirement: "a claim in the second list item is judged", input: page(TABLE, "- Clean first item.\n- Preview has zero durable writes."), pins: [{ location: "W10 list", claim: "zero durable writes" }] },
  { id: "P7", requirement: "a claim in the second blockquote paragraph is judged", input: page(TABLE, "> Clean first paragraph.\n>\n> Preview has zero durable writes."), pins: [{ location: "W10 blockquote", claim: "zero durable writes" }] },
  { id: "H2", requirement: "a header cell in a second W10 table is judged", input: page(TABLE, "| Feature | Caveats zero durable writes |\n| --- | --- |\n| Clean | Clean |"), pins: [{ location: "W10 table 1 header column 2", claim: "zero durable writes" }] },
  // Refusal #3 U1-U5: gate-authored GN1/GN24/GN3/GN5/GN17/GN17b witnesses.
  { id: "X13", requirement: "a relocated adapter table nested inside an outside list item is judged", input: page(TABLE, "", `- Relocated note:\n\n  | Feature | Caveats |\n  | --- | --- |\n  | ${ADAPTER} (copy) | No durable write occurs. |`), pins: [{ location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "X14", requirement: "the rendered Feature key of a relocated row is judged", input: page(TABLE, "", `| Feature | Caveats |\n| --- | --- |\n| **ReactiveFiber** reader adapter projecting NativeSnapshots (copy) | No durable write occurs. |`), pins: [{ location: "outside W10 table 1 row 1 Caveats", claim: "no durable write" }] },
  { id: "R8", requirement: "a soft line break supplies whitespace inside W10 prose", input: page(TABLE, "The preview has zero durable\nwrites."), pins: [{ location: "W10 paragraph", claim: "zero durable writes" }] },
  { id: "R9", requirement: "a tab supplies whitespace inside W10 prose", input: page(TABLE, "The preview has zero\tdurable writes."), pins: [{ location: "W10 paragraph", claim: "zero durable writes" }] },
  { id: "R10", requirement: "a two-character non-ASCII look-alike cannot hide a claim", input: appendCell(1, 3, `zero dur${String.fromCodePoint(0xe6)}le writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R11", requirement: "uppercase-X hexadecimal reference supplies whitespace", input: appendCell(1, 3, "zero&#X20;durable writes"), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R12", requirement: "zero-padded decimal reference supplies whitespace", input: appendCell(1, 3, "zero&#0032;durable writes"), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R13", requirement: "a three-character non-ASCII look-alike cannot hide a claim", input: appendCell(1, 3, `zero du${String.fromCodePoint(0xe6)}le writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "X15", requirement: "a relocated adapter key in an outside table header is judged", input: page(TABLE, "", `| ${ADAPTER} (copy) | No durable write occurs. |\n| --- | --- |\n| Other | Clean. |`), pins: [{ location: "outside W10 table 1 header column 2", claim: "no durable write" }] },
  { id: "R14", requirement: "a C0 control cannot split a withdrawn claim", input: appendCell(1, 3, `zero ${String.fromCodePoint(1)}durable writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
  { id: "R15", requirement: "spaces collapse after removing an invisible", input: appendCell(1, 3, `zero ${String.fromCodePoint(0x200b)} durable writes`), pins: [{ location: "W10 table 1 row 2 Caveats", claim: "zero durable writes" }] },
];
interface Cell { readonly row: number; readonly column: number; readonly location: string }
const CELLS: readonly Cell[] = [
  { row: 0, column: 0, location: "W10 table 1 row 1 Feature" },
  { row: 0, column: 1, location: "W10 table 1 row 1 Status" },
  { row: 0, column: 2, location: "W10 table 1 row 1 Evidence" },
  { row: 0, column: 3, location: "W10 table 1 row 1 Caveats" },
  { row: 1, column: 0, location: "W10 table 1 row 2 Feature" },
  { row: 1, column: 1, location: "W10 table 1 row 2 Status" },
  { row: 1, column: 2, location: "W10 table 1 row 2 Evidence" },
  { row: 1, column: 3, location: "W10 table 1 row 2 Caveats" },
];
interface HeaderCell { readonly column: number; readonly label: string; readonly location: string }
const HEADERS: readonly HeaderCell[] = [
  { column: 0, label: "Feature", location: "W10 table 1 header column 1" },
  { column: 1, label: "Status", location: "W10 table 1 header column 2" },
  { column: 2, label: "Evidence", location: "W10 table 1 header column 3" },
  { column: 3, label: "Caveats", location: "W10 table 1 header column 4" },
];
interface Bound { readonly id: string; readonly requirement: string; readonly input: string; readonly shape: readonly string[] }
const BOUNDS: readonly Bound[] = [
  { id: "B1", requirement: "missing W10 heading", input: page().replace(HEADING, "Other section"), shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B2", requirement: "duplicate W10 heading at EOF without a table", input: `${page()}\n## ${HEADING}\n`, shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B3", requirement: "W10 heading demoted to level 3", input: page().replace(`## ${HEADING}`, `### ${HEADING}`), shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B4", requirement: "incorrect matrix title", input: page().replace(`# ${TITLE}`, "# Appendix"), shape: ["W10 must belong to the matrix title"] },
  { id: "B5", requirement: "intervening level-1 parent before W10", input: page().replace(`## ${HEADING}`, `# Appendix\n\n## ${HEADING}`), shape: ["W10 has an intervening level-1 parent"] },
  { id: "B6", requirement: "empty W10 section has no rendered table", input: page(""), shape: ["W10 must contain a nonempty rendered table"] },
  { id: "B7", requirement: "level-1 heading after W10 ends the section before its table", input: page().replace(`## ${HEADING}`, `## ${HEADING}\n\n# Appendix`), shape: ["W10 must contain a nonempty rendered table"] },
  { id: "B8", requirement: "nested duplicate W10 heading in a W12 blockquote", input: `${page()}\n## W12: Other work\n\n> ## ${HEADING}\n>\n> Nothing here.\n`, shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B9", requirement: "sole W10 heading nested in a blockquote", input: page().replace(`## ${HEADING}`, `> ## ${HEADING}\n>\n> The preview performs zero durable writes.`), shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B10", requirement: "duplicate W10 heading at EOF over a clean table cannot hide a paragraph claim", input: `${page(TABLE, "The preview has zero durable writes.")}\n## ${HEADING}\n\n| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n| Clean row | planned | Clean. | Clean. |\n`, shape: ["W10 must have exactly one top-level level-2 heading"] },
  { id: "B11", requirement: "top-level raw HTML block is refused", input: page(TABLE, "<div>The preview performs zero durable writes.</div>"), shape: ["W10 contains raw HTML, not a complete comment"] },
  { id: "B12", requirement: "a complete comment followed by visible text is not a complete comment", input: page(TABLE, "<!-- note --> The preview performs zero durable writes."), shape: ["W10 contains raw HTML, not a complete comment"] },
  { id: "B13", requirement: "W10 heading promoted to level 1", input: page().replace(`## ${HEADING}`, `# ${HEADING}`), shape: ["W10 must have exactly one top-level level-2 heading"] },
  // Refusal #3 U1/U6: raw HTML in lists and malformed complete-comment shapes fail closed.
  { id: "B14", requirement: "raw HTML in a W10 list item is refused", input: page(TABLE, "- <div>The preview performs zero durable writes.</div>"), shape: ["W10 contains raw HTML, not a complete comment"] },
  { id: "B15", requirement: "two comment closes with intervening text are not one complete comment", input: page(TABLE, "<!-- a --> The preview performs zero durable writes. <!-- b -->"), shape: ["W10 contains raw HTML, not a complete comment"] },
  { id: "B16", requirement: "an abrupt comment close followed by text is not one complete comment", input: page(TABLE, "<!--> The preview performs zero durable writes. -->"), shape: ["W10 contains raw HTML, not a complete comment"] },
  { id: "B17", requirement: "a dash-bang close followed by text is not one complete comment", input: page(TABLE, "<!-- a --!> The preview performs zero durable writes. -->"), shape: ["W10 contains raw HTML, not a complete comment"] },
];
// GN12/GN13: named shape-only residuals with explicit quiet claim rows (not falsely claimed as killed).
const SHAPE_RESIDUALS: readonly { id: string; requirement: string; input: string; expected: string[] }[] = [
  { id: "GN12", requirement: "nested level-1 heading before W10 is shape-only", input: page().replace(`## ${HEADING}`, `> # Appendix\n\n## ${HEADING}`), expected: ["W10 has an intervening level-1 parent"] },
  { id: "GN13", requirement: "demoted matrix title is shape-only", input: page().replace(`# ${TITLE}`, `## ${TITLE}`), expected: ["W10 must belong to the matrix title"] },
];
// Refusal #4 U1 (cut #5): every residual family the header names is a NAMED family plus a PINNED quiet row. Each input
// carries that family's gate needle and the delivered judge reads it exactly quiet, so an over-refusal of the family reds
// its row; S-SHAPE freezes each id, family, requirement, input and quiet reading (rule 16).
interface Residual { readonly id: string; readonly family: string; readonly requirement: string; readonly input: string; readonly reading: Reading }
const RESIDUALS: readonly Residual[] = [
  { id: "ENUM0", family: "ASCII look-alikes", requirement: "an ASCII look-alike spelling in the second W10 row's Caveats cell reads quiet", input: appendCell(1, 3, "zero durab1e writes"), reading: { shape: [], claims: [] } },
  { id: "ENUM1", family: "hyphenated paraphrases", requirement: "a hyphenated paraphrase in the second W10 row's Caveats cell reads quiet", input: appendCell(1, 3, "zero durable-writes"), reading: { shape: [], claims: [] } },
  { id: "ENUM2", family: "new paraphrases", requirement: "a new paraphrase in the second W10 row's Caveats cell reads quiet", input: appendCell(1, 3, "No persistent writes occur."), reading: { shape: [], claims: [] } },
  { id: "ENUM3", family: "struck-through text", requirement: "struck-through claim text in the second W10 row's Caveats cell reads quiet", input: appendCell(1, 3, "~~zero durable writes~~"), reading: { shape: [], claims: [] } },
  { id: "ENUM4", family: "renamed relocated W10 keys", requirement: "a renamed W10 capability row in an outside table reads quiet", input: page(TABLE, "", "| Feature | Caveats |\n| --- | --- |\n| RF renamed adapter | zero durable writes |"), reading: { shape: [], claims: [] } },
  { id: "ENUM5", family: "relocated inline HTML including br-split claim", requirement: "a br-split claim in a relocated adapter row outside W10 reads quiet", input: page(TABLE, "", `| Feature | Caveats |\n| --- | --- |\n| ${ADAPTER} | zero durable<br>writes |`), reading: { shape: [], claims: [] } },
  { id: "ENUM6", family: "W10 heading text", requirement: "a claim suffixed to the W10 heading text itself reads quiet", input: page().replace(`## ${HEADING}`, `## ${HEADING} zero durable writes`), reading: { shape: [], claims: [] } },
];
const CONTROLS: readonly [string, string][] = [
  ["C0 plane-scoped baseline", page()],
  ["C1 complete comment is not a claim", page(TABLE, "<!-- zero durable writes -->")],
  ["C2 link destination title and image are not asserted claims", appendCell(1, 3, '[reference](https://example.invalid/zero-durable-writes "no durable write") ![zero durable writes](https://example.invalid/image)')],
  ["C3 unrelated W11 prose is outside the named scope", page(TABLE, "", "zero durable writes")],
  ["C4 phrase cannot be fabricated by joining adjacent cells", page(`${TABLE}\n| Another | partial | zero durable | writes |`)],
  ["C5 extra blank lines and tight pipes render the same table", page(TABLE.replaceAll(" | ", "|"), "\n")],
];
// wb-64x.1 (64x cut-5 F6): the RESIDUALS roster's anchor OUTSIDE this file, read in this census's own rendered model.
// A family removed, renamed or silenced in every literal here still disagrees with the docs/14 table, so it reds.
const DOCS_14 = "docs/workbench/14-qa-and-benchmarks.md";
const DOCS_14_TITLE = `14 ${String.fromCodePoint(0x2014)} Test strategy, conformance suite, benchmark and adversarial controls`;
const ANCHOR_HEADING = "W10 withdrawn-claim census residuals";
const ANCHOR_HEADER = ["Quiet row", "Residual family", "Exemplar", "Clear form", "Clear form reads"] as const;
interface AnchorRow { readonly id: string; readonly family: string; readonly exemplar: string; readonly clear: string; readonly reads: string }
/** A whole-cell code span is literal source text, so an exemplar is exactly what its page carries (`\n` = line break). */
function codeCell(cell: Tokens.TableCell | undefined): string | undefined {
  const only = cell?.tokens.length === 1 ? cell.tokens[0] : undefined;
  return only?.type === "codespan" ? String(only.text) : undefined;
}
function residualAnchor(markdown: string): { readonly shape: readonly string[]; readonly rows: readonly AnchorRow[] } {
  const tokens: TokensList = new Lexer({ gfm: true }).lex(markdown);
  const shape: string[] = [];
  const named: Tokens.Heading[] = [];
  walk(tokens, token => { if (isHeading(token) && rendered(token.tokens) === ANCHOR_HEADING) named.push(token); });
  const start = named.length === 1 && named[0]?.depth === 2 ? tokens.indexOf(named[0]) : -1;
  if (start < 0) return { shape: ["docs/14 must have exactly one top-level level-2 residual anchor heading"], rows: [] };
  const title = tokens.find(isHeading);
  if (title === undefined || title.depth !== 1 || rendered(title.tokens) !== DOCS_14_TITLE || tokens.indexOf(title) >= start) shape.push("the residual anchor must belong to the docs/14 title");
  walk(tokens.slice(0, start), token => { if (isHeading(token) && token.depth === 1 && token !== title) shape.push("the residual anchor has an intervening level-1 parent"); });
  let end = tokens.length;
  for (let index = start + 1; index < tokens.length; index++) {
    const token = tokens[index];
    if (token !== undefined && isHeading(token) && token.depth <= 2) { end = index; break; }
  }
  const blocks = tokens.slice(start + 1, end).filter(token => token.type !== "space");
  walk(blocks, token => { if (token.type === "html") shape.push("the residual anchor contains raw HTML"); });
  const table = blocks[1];
  if (blocks.length !== 2 || blocks[0]?.type !== "paragraph" || table === undefined || !isTable(table)) return { shape: [...shape, "the residual anchor must be exactly its intro paragraph and one table"], rows: [] };
  if (table.header.map(cellText).join(" | ") !== ANCHOR_HEADER.join(" | ")) shape.push("the residual anchor table header must be its committed header");
  const rows: AnchorRow[] = [];
  for (const [index, cells] of table.rows.entries()) {
    const [id, family, , , reads] = cells;
    const exemplar = codeCell(cells[2]);
    const clear = codeCell(cells[3]);
    if (cells.length !== ANCHOR_HEADER.length || id === undefined || family === undefined || reads === undefined || exemplar === undefined || clear === undefined) shape.push(`residual anchor row ${index + 1} must be five cells with a code-span exemplar and clear form`);
    else rows.push({ id: cellText(id), family: cellText(family), exemplar, clear: clear.replaceAll("\\n", "\n"), reads: cellText(reads) });
  }
  return { shape, rows };
}

// wb-5jha (R660 F1): the out-of-file roster for the named residual quiet rows docs/14 does not carry. The in-file side
// is derived from the tables the runners register (CONTROLS row C3 and every SHAPE_RESIDUALS row), judged at test time.
const ROSTER = "test/fixtures/w10-withdrawn-claim-roster.json";
const ROSTER_FAMILIES: Readonly<Record<string, string>> = { C3: "unrelated prose outside W10", GN12: "shape-only nesting", GN13: "shape-only title-depth" };
interface RosterRow { readonly id: string; readonly family: string; readonly test: string; readonly digest: string; readonly reading: Reading }
function rosterRows(): readonly (RosterRow & { readonly declared: Reading })[] {
  const quiet = CONTROLS.filter(([name]) => name.startsWith("C3 ")).map(([name, input]) => ({ id: "C3", test: name, input, declared: { shape: [], claims: [] } }));
  const shapes = SHAPE_RESIDUALS.map(row => ({ id: row.id, test: `${row.id} residual: ${row.requirement}`, input: row.input, declared: { shape: row.expected, claims: [] } }));
  return [...quiet, ...shapes].map(row => ({ id: row.id, family: ROSTER_FAMILIES[row.id] ?? "", test: row.test, digest: createHash("sha256").update(row.input).digest("hex"), reading: judgeSection(row.input), declared: row.declared }));
}

describe("wb-64x W10 section-level withdrawn-claim census (rendered-model)", () => {
  it("L1 every live W10 row cell and paragraph, and every relocated W10 capability row, has no withdrawn claim", () => {
    expect(judgeSection(readFileSync(join(process.cwd(), "docs/workbench/feature-matrix.md"), "utf8"))).toEqual({ shape: [], claims: [] });
  });
  for (const variant of VARIANTS) {
    it(`${variant.id}: ${variant.requirement}`, () => {
      const reading = judgeSection(variant.input);
      expect(reading.shape).toEqual([]);
      expect(reading.claims).toEqual(variant.pins);
      expect(reading.claims.length).toBeGreaterThan(0);
    });
  }
  for (const [name, input] of CONTROLS) it(name, () => { expect(judgeSection(input)).toEqual({ shape: [], claims: [] }); });
  for (const { row, column, location } of CELLS) {
    it(`CELL row ${row + 1} column ${column + 1}: every W10 cell is judged, not just the Feature or Evidence cell`, () => {
      const reading = judgeSection(appendCell(row, column, "zero durable writes"));
      expect(reading.shape).toEqual([]);
      expect(reading.claims).toEqual([{ location, claim: "zero durable writes" }]);
    });
  }
  it("HEADER the rendered W10 Feature header cell is judged", () => {
    expect(judgeSection(page(TABLE.replace("| Feature |", "| Feature zero durable writes |"))).claims).toEqual([{ location: "W10 table 1 header column 1", claim: "zero durable writes" }]);
  });
  for (const header of HEADERS) {
    it(`HEADER column ${header.column + 1}: ${header.label} is independently judged`, () => {
      const reading = judgeSection(page(TABLE.replace(`| ${header.label} |`, `| ${header.label} zero durable writes |`)));
      expect(reading).toEqual({ shape: [], claims: [{ location: header.location, claim: "zero durable writes" }] });
    });
  }
  for (const residual of SHAPE_RESIDUALS) it(`${residual.id} residual: ${residual.requirement}`, () => {
    expect(judgeSection(residual.input).claims).toEqual([]);
    expect(judgeSection(residual.input).shape).toEqual(residual.expected);
  });
  for (const residual of RESIDUALS) it(`${residual.id} residual (${residual.family}): ${residual.requirement}`, () => {
    expect(judgeSection(residual.input)).toEqual(residual.reading);
  });
  it("BOUND unique top-level heading title ancestry and nonempty table fail closed", () => {
    for (const bound of BOUNDS) expect(judgeSection(bound.input).shape, `${bound.id}: ${bound.requirement}`).toEqual(bound.shape);
  });
  it("HTML raw HTML in a W10 cell is refused, not interpreted as visible text", () => {
    expect(judgeSection(appendCell(1, 3, '<span style="display:none">zero durable writes</span>')).shape).toContain("W10 contains raw HTML, not a complete comment");
  });
  it("EOF W10 section at EOF is still scanned", () => {
    expect(judgeSection(page(TABLE, "zero durable writes").split("\n## W11:")[0] ?? "").claims).toEqual([{ location: "W10 paragraph", claim: "zero durable writes" }]);
  });
  it("external W10 row anchor keeps CT5 from deleting a judged row and its matching literal together", () => {
    const document = readFileSync(join(process.cwd(), "docs/workbench/feature-matrix.md"), "utf8");
    const section = document.split("## W10: ReactiveFiber provider/interop\n")[1]?.split("\n## W11:")[0] ?? "";
    const tables = new Lexer({ gfm: true }).lex(section).filter(isTable);
    const rows = tables.flatMap(table => table.rows);
    expect(tables.length).toBe(1);
    expect(tables[0]?.header.length).toBe(4);
    expect(rows.length).toBe(2);
    expect(new Set(CELLS.map(cell => cell.row)).size).toBe(rows.length);
    expect(CELLS.length).toBe(rows.length * 4);
  });
  it("external residual anchor (wb-64x.1): docs/14 names exactly the RESIDUALS roster; each quiet page carries its exemplar once and reads quiet, and its clear form reads where docs/14 says", () => {
    const anchor = residualAnchor(readFileSync(join(process.cwd(), DOCS_14), "utf8"));
    expect(anchor.shape).toEqual([]);
    expect(anchor.rows.map(row => `${row.id}:${row.family}`)).toEqual(RESIDUALS.map(residual => `${residual.id}:${residual.family}`));
    for (const row of anchor.rows) {
      const input = RESIDUALS.find(residual => residual.id === row.id)?.input ?? "";
      const at = row.reads.lastIndexOf(": ");
      expect(input.split(row.exemplar).length - 1, `${row.id}: exemplar occurrences in the quiet page`).toBe(1);
      expect(judgeSection(input), `${row.id}: the quiet page`).toEqual({ shape: [], claims: [] });
      expect(judgeSection(input.replace(row.exemplar, () => row.clear)), `${row.id}: the clear form`).toEqual({ shape: [], claims: [{ location: row.reads.slice(0, at), claim: row.reads.slice(at + 2) }] });
    }
    // Rule 16: the anchor rows as read at the cut base, so a docs-side edit that the judge still accepts reds here too.
    expect(anchor.rows.map(row => [row.id, row.family, row.exemplar, row.clear, row.reads].join(" | "))).toEqual([
      "ENUM0 | ASCII look-alikes | zero durab1e writes | zero durable writes | W10 table 1 row 2 Caveats: zero durable writes",
      "ENUM1 | hyphenated paraphrases | zero durable-writes | zero durable writes | W10 table 1 row 2 Caveats: zero durable writes",
      "ENUM2 | new paraphrases | No persistent writes occur. | No durable writes occur. | W10 table 1 row 2 Caveats: no durable write",
      "ENUM3 | struck-through text | ~~zero durable writes~~ | zero durable writes | W10 table 1 row 2 Caveats: zero durable writes",
      "ENUM4 | renamed relocated W10 keys | RF renamed adapter | ReactiveFiber reader adapter | outside W10 table 1 row 1 Caveats: zero durable writes",
      "ENUM5 | relocated inline HTML including br-split claim | zero durable<br>writes | zero durable writes | outside W10 table 1 row 1 Caveats: zero durable writes",
      "ENUM6 | W10 heading text | ## W10: ReactiveFiber provider/interop zero durable writes | ## W10: ReactiveFiber provider/interop\n\nzero durable writes | W10 paragraph: zero durable writes",
    ]);
  });
  it("S-SHAPE standing rule 16 freezes full requirements and each location/claim pin, not only row counts", () => {
    // U1: the actual CELL runner's acceptance-bearing roster, including Feature and Status.
    expect(CELLS.map(cell => `${cell.row}:${cell.column}:${cell.location}`)).toEqual([
      "0:0:W10 table 1 row 1 Feature", "0:1:W10 table 1 row 1 Status", "0:2:W10 table 1 row 1 Evidence", "0:3:W10 table 1 row 1 Caveats",
      "1:0:W10 table 1 row 2 Feature", "1:1:W10 table 1 row 2 Status", "1:2:W10 table 1 row 2 Evidence", "1:3:W10 table 1 row 2 Caveats",
    ]);
    // U2: exact causes stop a duplicate heading from passing for an empty-table failure.
    expect(BOUNDS.map(bound => [bound.id, bound.requirement, ...bound.shape])).toEqual([
      ["B1", "missing W10 heading", "W10 must have exactly one top-level level-2 heading"],
      ["B2", "duplicate W10 heading at EOF without a table", "W10 must have exactly one top-level level-2 heading"],
      ["B3", "W10 heading demoted to level 3", "W10 must have exactly one top-level level-2 heading"],
      ["B4", "incorrect matrix title", "W10 must belong to the matrix title"],
      ["B5", "intervening level-1 parent before W10", "W10 has an intervening level-1 parent"],
      ["B6", "empty W10 section has no rendered table", "W10 must contain a nonempty rendered table"],
      ["B7", "level-1 heading after W10 ends the section before its table", "W10 must contain a nonempty rendered table"],
      ["B8", "nested duplicate W10 heading in a W12 blockquote", "W10 must have exactly one top-level level-2 heading"],
      ["B9", "sole W10 heading nested in a blockquote", "W10 must have exactly one top-level level-2 heading"],
      ["B10", "duplicate W10 heading at EOF over a clean table cannot hide a paragraph claim", "W10 must have exactly one top-level level-2 heading"],
      ["B11", "top-level raw HTML block is refused", "W10 contains raw HTML, not a complete comment"],
      ["B12", "a complete comment followed by visible text is not a complete comment", "W10 contains raw HTML, not a complete comment"],
      ["B13", "W10 heading promoted to level 1", "W10 must have exactly one top-level level-2 heading"],
      ["B14", "raw HTML in a W10 list item is refused", "W10 contains raw HTML, not a complete comment"],
      ["B15", "two comment closes with intervening text are not one complete comment", "W10 contains raw HTML, not a complete comment"],
      ["B16", "an abrupt comment close followed by text is not one complete comment", "W10 contains raw HTML, not a complete comment"],
      ["B17", "a dash-bang close followed by text is not one complete comment", "W10 contains raw HTML, not a complete comment"],
    ]);
    // CT6/CT6b: same-cause input substitutions must not hollow distinct boundary legs.
    expect(BOUNDS.map(bound => bound.input)).toEqual([
      page().replace(HEADING, "Other section"), `${page()}\n## ${HEADING}\n`, page().replace(`## ${HEADING}`, `### ${HEADING}`),
      page().replace(`# ${TITLE}`, "# Appendix"), page().replace(`## ${HEADING}`, `# Appendix\n\n## ${HEADING}`), page(""),
      page().replace(`## ${HEADING}`, `## ${HEADING}\n\n# Appendix`),
      `${page()}\n## W12: Other work\n\n> ## ${HEADING}\n>\n> Nothing here.\n`,
      page().replace(`## ${HEADING}`, `> ## ${HEADING}\n>\n> The preview performs zero durable writes.`),
      `${page(TABLE, "The preview has zero durable writes.")}\n## ${HEADING}\n\n| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n| Clean row | planned | Clean. | Clean. |\n`,
      page(TABLE, "<div>The preview performs zero durable writes.</div>"),
      page(TABLE, "<!-- note --> The preview performs zero durable writes."),
      page().replace(`## ${HEADING}`, `# ${HEADING}`),
      page(TABLE, "- <div>The preview performs zero durable writes.</div>"),
      page(TABLE, "<!-- a --> The preview performs zero durable writes. <!-- b -->"),
      page(TABLE, "<!--> The preview performs zero durable writes. -->"),
      page(TABLE, "<!-- a --!> The preview performs zero durable writes. -->"),
    ]);
    expect(CLAIMS).toEqual(["zero durable writes", "no durable write"]);
    expect(ROW_KEYS).toEqual(["node() rf noncommitted context preview capability", "reactivefiber reader adapter"]);
    expect(VARIANTS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["X8:1", "X9:2", "X10:2", "P1:1", "P2:2", "P3:1", "T1:2", "T2:1", "T3:1", "R1:2", "R2:1", "R3:1", "R4:1", "R5:1", "X11:1", "X12:1", "R6:1", "R7:1", "P4:1", "P5:1", "P6:1", "P7:1", "H2:1", "X13:1", "X14:1", "R8:1", "R9:1", "R10:1", "R11:1", "R12:1", "R13:1", "X15:1", "R14:1", "R15:1"]);
    expect(VARIANTS.map(row => [row.id, row.requirement, ...row.pins.map(pin => `${pin.location}:${pin.claim}`)])).toEqual([
      ["X8", "W10 paragraph after the table asserting the withdrawn claim", "W10 paragraph:zero durable writes"],
      ["X9", "second W10 row Caveats cell asserting the withdrawn claim", "W10 table 1 row 2 Caveats:zero durable writes", "W10 table 1 row 2 Caveats:no durable write"],
      ["X10", "withdrawn W10 capability row planted in the W11 table", "outside W10 table 1 row 1 Feature:zero durable writes", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["P1", "nested subsection prose remains inside W10", "W10 paragraph:no durable write"],
      ["P2", "list and quote text remain inside W10", "W10 list:zero durable writes", "W10 blockquote:no durable write"],
      ["P3", "visible fenced code is not silently excluded from W10", "W10 code:zero durable writes"],
      ["T1", "a third unrelated W10 row is still section-scoped", "W10 table 1 row 3 Evidence:zero durable writes", "W10 table 1 row 3 Caveats:no durable write"],
      ["T2", "a second W10 table is scanned", "W10 table 1 row 1 Caveats:zero durable writes"],
      ["T3", "a relocated adapter row is judged outside W10", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["R1", "inline rendering composes emphasis link text and code span", "W10 table 1 row 2 Caveats:zero durable writes", "W10 table 1 row 2 Caveats:no durable write"],
      ["R2", "numeric references whitespace and case render a withdrawn claim", "W10 table 1 row 2 Evidence:zero durable writes"],
      ["R3", "zero-width format point cannot split a withdrawn claim", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R4", "non-ASCII look-alike cannot evade the folded-key reading", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R5", "a hard line break supplies the space inside a W10 paragraph claim", "W10 paragraph:zero durable writes"],
      ["X11", "a relocated adapter row before W10 is judged", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["X12", "a relocated adapter row nested in an outside blockquote is judged", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["R6", "a common named reference supplies whitespace inside the claim", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R7", "an unknown named reference uses the replacement-character wildcard", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["P4", "a W10 subsection heading carrying the claim is judged", "W10 heading:zero durable writes"],
      ["P5", "a nested level-2 heading does not end W10 before a paragraph claim", "W10 paragraph:zero durable writes"],
      ["P6", "a claim in the second list item is judged", "W10 list:zero durable writes"],
      ["P7", "a claim in the second blockquote paragraph is judged", "W10 blockquote:zero durable writes"],
      ["H2", "a header cell in a second W10 table is judged", "W10 table 1 header column 2:zero durable writes"],
      ["X13", "a relocated adapter table nested inside an outside list item is judged", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["X14", "the rendered Feature key of a relocated row is judged", "outside W10 table 1 row 1 Caveats:no durable write"],
      ["R8", "a soft line break supplies whitespace inside W10 prose", "W10 paragraph:zero durable writes"],
      ["R9", "a tab supplies whitespace inside W10 prose", "W10 paragraph:zero durable writes"],
      ["R10", "a two-character non-ASCII look-alike cannot hide a claim", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R11", "uppercase-X hexadecimal reference supplies whitespace", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R12", "zero-padded decimal reference supplies whitespace", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R13", "a three-character non-ASCII look-alike cannot hide a claim", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["X15", "a relocated adapter key in an outside table header is judged", "outside W10 table 1 header column 2:no durable write"],
      ["R14", "a C0 control cannot split a withdrawn claim", "W10 table 1 row 2 Caveats:zero durable writes"],
      ["R15", "spaces collapse after removing an invisible", "W10 table 1 row 2 Caveats:zero durable writes"],
    ]);
    // Outbox 611 U1-U4: freeze every new leg's input as well as its exact diagnosis.
    expect(VARIANTS.slice(14, 23).map(row => row.input)).toEqual([
      page().replace(`## ${HEADING}`, `## W09: Earlier section\n\n| Feature | Caveats |\n| --- | --- |\n| ${ADAPTER} | no durable write |\n\n## ${HEADING}`),
      page(TABLE, "", `> | Feature | Caveats |\n> | --- | --- |\n> | ${ADAPTER} | no durable write |`),
      appendCell(1, 3, "zero&nbsp;durable writes"),
      appendCell(1, 3, "zero dur&shy;able writes"),
      page(TABLE, "### Preview has zero durable writes"),
      page(TABLE, "> ## Aside\n\nThe preview has zero durable writes."),
      page(TABLE, "- Clean first item.\n- Preview has zero durable writes."),
      page(TABLE, "> Clean first paragraph.\n>\n> Preview has zero durable writes."),
      page(TABLE, "| Feature | Caveats zero durable writes |\n| --- | --- |\n| Clean | Clean |"),
    ]);
    // The new GN rows freeze their INPUTS as well as pin counts, diagnoses and requirements above.
    expect(VARIANTS.slice(23).map(row => row.input)).toEqual([
      page(TABLE, "", `- Relocated note:\n\n  | Feature | Caveats |\n  | --- | --- |\n  | ${ADAPTER} (copy) | No durable write occurs. |`),
      page(TABLE, "", `| Feature | Caveats |\n| --- | --- |\n| **ReactiveFiber** reader adapter projecting NativeSnapshots (copy) | No durable write occurs. |`),
      page(TABLE, "The preview has zero durable\nwrites."),
      page(TABLE, "The preview has zero\tdurable writes."),
      appendCell(1, 3, `zero dur${String.fromCodePoint(0xe6)}le writes`),
      appendCell(1, 3, "zero&#X20;durable writes"),
      appendCell(1, 3, "zero&#0032;durable writes"),
      appendCell(1, 3, `zero du${String.fromCodePoint(0xe6)}le writes`),
      page(TABLE, "", `| ${ADAPTER} (copy) | No durable write occurs. |\n| --- | --- |\n| Other | Clean. |`),
      appendCell(1, 3, `zero ${String.fromCodePoint(1)}durable writes`),
      appendCell(1, 3, `zero ${String.fromCodePoint(0x200b)} durable writes`),
    ]);
    expect(SHAPE_RESIDUALS.map(row => [row.id, row.requirement, ...row.expected])).toEqual([
      ["GN12", "nested level-1 heading before W10 is shape-only", "W10 has an intervening level-1 parent"],
      ["GN13", "demoted matrix title is shape-only", "W10 must belong to the matrix title"],
    ]);
    expect(SHAPE_RESIDUALS.map(row => row.input)).toEqual([
      page().replace(`## ${HEADING}`, `> # Appendix\n\n## ${HEADING}`),
      page().replace(`# ${TITLE}`, `## ${TITLE}`),
    ]);
    // Refusal #4 U1 (cut #5): the seven header-named residual families, each frozen with its input and exact quiet reading.
    expect(RESIDUALS.map(row => [row.id, row.family, row.requirement, JSON.stringify(row.reading)])).toEqual([
      ["ENUM0", "ASCII look-alikes", "an ASCII look-alike spelling in the second W10 row's Caveats cell reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM1", "hyphenated paraphrases", "a hyphenated paraphrase in the second W10 row's Caveats cell reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM2", "new paraphrases", "a new paraphrase in the second W10 row's Caveats cell reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM3", "struck-through text", "struck-through claim text in the second W10 row's Caveats cell reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM4", "renamed relocated W10 keys", "a renamed W10 capability row in an outside table reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM5", "relocated inline HTML including br-split claim", "a br-split claim in a relocated adapter row outside W10 reads quiet", '{"shape":[],"claims":[]}'],
      ["ENUM6", "W10 heading text", "a claim suffixed to the W10 heading text itself reads quiet", '{"shape":[],"claims":[]}'],
    ]);
    expect(RESIDUALS.map(row => row.input)).toEqual([
      appendCell(1, 3, "zero durab1e writes"),
      appendCell(1, 3, "zero durable-writes"),
      appendCell(1, 3, "No persistent writes occur."),
      appendCell(1, 3, "~~zero durable writes~~"),
      page(TABLE, "", "| Feature | Caveats |\n| --- | --- |\n| RF renamed adapter | zero durable writes |"),
      page(TABLE, "", `| Feature | Caveats |\n| --- | --- |\n| ${ADAPTER} | zero durable<br>writes |`),
      page().replace(`## ${HEADING}`, `## ${HEADING} zero durable writes`),
    ]);
    expect(HEADERS.map(header => `${header.column}:${header.label}:${header.location}`)).toEqual([
      "0:Feature:W10 table 1 header column 1", "1:Status:W10 table 1 header column 2",
      "2:Evidence:W10 table 1 header column 3", "3:Caveats:W10 table 1 header column 4",
    ]);
    expect(CONTROLS.map(([name]) => name)).toEqual(["C0 plane-scoped baseline", "C1 complete comment is not a claim", "C2 link destination title and image are not asserted claims", "C3 unrelated W11 prose is outside the named scope", "C4 phrase cannot be fabricated by joining adjacent cells", "C5 extra blank lines and tight pipes render the same table"]);
  });
  it("wb-5jha out-of-file residual roster: the C3 and GN12/GN13 quiet rows equal the fixture by id, family, registered test, page digest and reading, in order and both ways", ({ task }) => {
    const roster = JSON.parse(readFileSync(join(process.cwd(), ROSTER), "utf8")) as { readonly residuals: readonly RosterRow[] };
    const rows = rosterRows();
    const line = (row: RosterRow): string => [row.id, row.family, row.test, row.digest, JSON.stringify(row.reading)].join(" | ");
    expect(rows.map(line), "the in-file quiet rows, judged now, equal the fixture exactly and in order").toEqual(roster.residuals.map(line));
    for (const row of rows) expect(row.reading, `${row.id}: the reading its own runner asserts`).toEqual(row.declared);
    const registered: string[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push(child.name);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(registered.filter(name => roster.residuals.some(row => name.startsWith(`${row.id} `))), "the registered quiet rows, exactly and in fixture order, nothing extra").toEqual(roster.residuals.map(row => row.test));
    // Rule 16: the roster rows as read at the cut base; CT5/CT6 kills run through the fixture, outside this file.
    expect(rows.map(row => `${row.id} | ${row.family} | ${row.test}`)).toEqual([
      "C3 | unrelated prose outside W10 | C3 unrelated W11 prose is outside the named scope",
      "GN12 | shape-only nesting | GN12 residual: nested level-1 heading before W10 is shape-only",
      "GN13 | shape-only title-depth | GN13 residual: demoted matrix title is shape-only",
    ]);
  });
});
