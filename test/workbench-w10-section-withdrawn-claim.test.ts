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
 * Withdrawn spellings: "zero durable writes" and "no durable write" (including its plural). Rendered inline emphasis,
 * escapes, code spans and link TEXT compose before detection; link destinations/titles, images, definitions and complete
 * comments are not claims. Numeric/common named references decode; NFKC/case/whitespace/format-control folding follows
 * the landed W10 guard; non-ASCII look-alikes match 0-3 characters. Cells stay separate: a phrase split across cells is
 * not one claim. Raw HTML other than a complete comment inside W10 is refused rather than guessed at.
 *
 * Scope is the two published universal negatives, not a general natural-language entailment checker. Residuals: ASCII
 * look-alikes, hyphenated/new paraphrases, struck-through text (the landed reading's unasserted del set), renamed W10
 * capability rows outside W10, inline HTML in relocated rows (including a br-split claim), the W10 heading text itself,
 * and unrelated prose outside W10. No provider/receipt claims are inferred here. The stamped
 * guard remains independent and unchanged. Synthetic falsifiers do not bind mutable live docs wording. Rule 16 freezes
 * each row's full requirement/name and each location/claim diagnosis, not only counts. No processes or scratch allocations.
 */
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
];
const CONTROLS: readonly [string, string][] = [
  ["C0 plane-scoped baseline", page()],
  ["C1 complete comment is not a claim", page(TABLE, "<!-- zero durable writes -->")],
  ["C2 link destination title and image are not asserted claims", appendCell(1, 3, '[reference](https://example.invalid/zero-durable-writes "no durable write") ![zero durable writes](https://example.invalid/image)')],
  ["C3 unrelated W11 prose is outside the named scope", page(TABLE, "", "zero durable writes")],
  ["C4 phrase cannot be fabricated by joining adjacent cells", page(`${TABLE}\n| Another | partial | zero durable | writes |`)],
  ["C5 extra blank lines and tight pipes render the same table", page(TABLE.replaceAll(" | ", "|"), "\n")],
];

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
  it("HEADER every rendered W10 header cell is judged", () => {
    expect(judgeSection(page(TABLE.replace("| Feature |", "| Feature zero durable writes |"))).claims).toEqual([{ location: "W10 table 1 header column 1", claim: "zero durable writes" }]);
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
    ]);
    // CT6/CT6b: same-cause input substitutions must not hollow distinct boundary legs.
    expect(BOUNDS.map(bound => bound.input)).toEqual([
      page().replace(HEADING, "Other section"), `${page()}\n## ${HEADING}\n`, page().replace(`## ${HEADING}`, `### ${HEADING}`),
      page().replace(`# ${TITLE}`, "# Appendix"), page().replace(`## ${HEADING}`, `# Appendix\n\n## ${HEADING}`), page(""),
      page().replace(`## ${HEADING}`, `## ${HEADING}\n\n# Appendix`),
      `${page()}\n## W12: Other work\n\n> ## ${HEADING}\n>\n> Nothing here.\n`,
      page().replace(`## ${HEADING}`, `> ## ${HEADING}\n>\n> The preview performs zero durable writes.`),
      `${page(TABLE, "The preview has zero durable writes.")}\n## ${HEADING}\n\n| Feature | Status | Evidence | Caveats |\n| --- | --- | --- | --- |\n| Clean row | planned | Clean. | Clean. |\n`,
    ]);
    expect(CLAIMS).toEqual(["zero durable writes", "no durable write"]);
    expect(ROW_KEYS).toEqual(["node() rf noncommitted context preview capability", "reactivefiber reader adapter"]);
    expect(VARIANTS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["X8:1", "X9:2", "X10:2", "P1:1", "P2:2", "P3:1", "T1:2", "T2:1", "T3:1", "R1:2", "R2:1", "R3:1", "R4:1", "R5:1"]);
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
    ]);
    expect(CONTROLS.map(([name]) => name)).toEqual(["C0 plane-scoped baseline", "C1 complete comment is not a claim", "C2 link destination title and image are not asserted claims", "C3 unrelated W11 prose is outside the named scope", "C4 phrase cannot be fabricated by joining adjacent cells", "C5 extra blank lines and tight pipes render the same table"]);
  });
});
