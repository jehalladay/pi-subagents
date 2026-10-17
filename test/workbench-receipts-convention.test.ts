import { existsSync, readFileSync } from "node:fs";
import { Lexer, type Token, type TokensList } from "marked";
import { describe, expect, it } from "vitest";

// wb-xox R3 (scope items 2, 3, 5 and 6): the "Delivery receipts" section of
// docs/workbench/15-implementation-program.md is the convention doc for delivery receipts. It names
// docs/workbench/receipts/<bead-id>.md as the destination for new receipts, the one-line INDEX.md append,
// the scope item 6 correction rule, the freeze of TRACEABILITY.md and the cutover commit. No tracked
// paragraph named the retired TRACEABILITY EOF-append when this cut began (git grep over the tree at
// 130785e found the practice only in a new-feedback finding and in test comments), so the section is new
// text, placed after "Agent handoff", the program's delivery-duty paragraph.
//
// PIN: slice equality read through marked 18 (the renderer the docs-cancel-path pins use), never token
// presence:
// - the page lexes with no html token other than one complete comment and no link reference definition,
//   since raw HTML or a definition can hide a line from the rendered page while the slice still reads it;
// - exactly one heading the page could show reads "Delivery receipts" under a folded key: its rendered
//   inline text with numeric character references decoded, NFKC, white space collapsed, control, format
//   and combining code points dropped, case folded, and each remaining non-ASCII code point matching any
//   0-3 characters (so a non-ASCII look-alike counts); that heading must be the top-level level-2 one;
// - the section runs from that heading to the next top-level level-1/2 heading or EOF, and its raw text
//   equals SECTION below after the docs-cancel-path normalization (trailing spaces, tabs and carriage
//   returns trimmed per line, runs of blank lines collapsed, leading and trailing blank lines dropped).
// Cross-checks bind the section to the files it names: TRACEABILITY.md's last line is the quoted cutover
// row, receipts/wb-xox.md names the same cutover commit, and every test file the section names exists.
// Every look-alike below is built with String.fromCodePoint; none is typed raw.

const DOC_15 = new URL("../docs/workbench/15-implementation-program.md", import.meta.url);
const TRACE = new URL("../docs/workbench/TRACEABILITY.md", import.meta.url);
const XOX_RECEIPT = new URL("../docs/workbench/receipts/wb-xox.md", import.meta.url);
const HEADING_LINE = "## Delivery receipts";
const HEADING_KEY = "delivery receipts";
const CUTOVER_ROW = "## Continued in receipts/ per wb-xox";
/** The commit that appended CUTOVER_ROW to TRACEABILITY.md (its last writer), cut on trunk 130785e. */
const CUTOVER_COMMIT = "2979307908b9808b0eec77c4ad08d8d0cd7810c1";

/** The committed "Delivery receipts" section of docs/workbench/15. */
const SECTION = [
  HEADING_LINE,
  "",
  "From wb-xox on, a delivery's receipt goes to a per-bead file under `docs/workbench/receipts/`, never to `docs/workbench/TRACEABILITY.md`.",
  "",
  `- \`docs/workbench/TRACEABILITY.md\` is frozen as the historical record: no row is moved, rewritten or corrected in place, and no row is appended to it. Its last line is the cutover pointer row \`${CUTOVER_ROW}\`, which wb-xox appended once, in commit \`${CUTOVER_COMMIT}\` cut on trunk \`130785e\`. \`test/workbench-traceability-freeze.test.ts\` pins the file's content hash, so any later diff to the file fails that test.`,
  "- A new receipt goes to `docs/workbench/receipts/<bead-id>.md`, one file per bead, named after the bead id (for example `docs/workbench/receipts/wb-xox.md`). The file opens with the line `# <bead-id>: <bead title>` and is append-only: a respin, a re-cut or a landing record for the same bead appends a new entry to the same file, and no earlier entry is rewritten.",
  "- A bead's first receipt also appends one line to `docs/workbench/receipts/INDEX.md`, in the form `- [<bead-id>](<bead-id>.md) | <bead title> | <first-receipt date as YYYY-MM-DD>`. The index holds that one line per receipt file and nothing else, so two cuts that deliver at once meet there as a one-line union at worst.",
  "- A correction to a historical row of `docs/workbench/TRACEABILITY.md` is filed as an entry in the correcting bead's `docs/workbench/receipts/<bead-id>.md` that names the corrected row (its matrix ID, or its section heading). `TRACEABILITY.md` is never edited for a correction, so its freeze census holds for corrections too.",
  "- `test/workbench-receipts-shape.test.ts` pins the directory: every file in `docs/workbench/receipts/` except `INDEX.md` is named `wb-*.md` after a bead id, and `INDEX.md` has exactly one line per sibling file. `test/workbench-receipts-convention.test.ts` pins this section as written.",
].join("\n");

/** The docs-cancel-path normalization: per-line trailing blanks trimmed, blank runs collapsed, outer blank lines dropped. */
function normalize(text: string): string {
  const out: string[] = [];
  for (const raw of text.split(/\r\n|\n|\r/)) {
    const line = raw.replace(/[ \t\r]+$/, "");
    if (line === "" && (out.length === 0 || out[out.length - 1] === "")) continue;
    out.push(line);
  }
  while (out.length > 0 && out[out.length - 1] === "") out.pop();
  return out.join("\n");
}

const NAMED_REFERENCES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** Numeric and the common named character references decoded; any other named reference becomes one non-ASCII stand-in. */
function decodeReferences(text: string): string {
  return text.replace(/&(?:#(\d{1,7})|#[xX]([0-9a-fA-F]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g, (whole, decimal?: string, hex?: string, name?: string) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    return NAMED_REFERENCES[name ?? ""] ?? String.fromCodePoint(0xfffd);
  });
}

/** The text a heading's inline tokens render, markup dropped. */
function renderedText(tokens: readonly Token[] | undefined): string {
  let out = "";
  for (const token of tokens ?? []) {
    if (token.type === "html") continue;
    if (token.type === "br") out += " ";
    else if ("tokens" in token && Array.isArray(token.tokens) && token.tokens.length > 0) out += renderedText(token.tokens);
    else if ("text" in token && typeof token.text === "string") out += token.text;
  }
  return out;
}

/** The folded key of a heading's rendered text (see PIN above). */
function headingKey(text: string): string {
  return decodeReferences(text)
    .normalize("NFKC")
    .replace(/[\s\p{Zs}]+/gu, " ")
    .replace(/[\p{Cc}\p{Cf}\p{Mn}\p{Me}]/gu, "")
    .replace(/ +/g, " ")
    .trim()
    .toLowerCase();
}

/** True when `key` reads as HEADING_KEY, each non-ASCII code point standing for any 0-3 characters. */
function readsAsHeading(key: string): boolean {
  let pattern = "";
  for (const char of key) pattern += (char.codePointAt(0) ?? 0) > 0x7f ? "[\\s\\S]{0,3}" : char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^${pattern}$`, "u").test(HEADING_KEY);
}

/** Every heading token in `tokens`, at any nesting depth (list items, block quotes), in document order. */
function headingTokens(tokens: readonly Token[]): Token[] {
  const found: Token[] = [];
  for (const token of tokens) {
    if (token.type === "heading") found.push(token);
    if (token.type === "list") for (const item of token.items) found.push(...headingTokens(item.tokens));
    else if (token.type === "blockquote") found.push(...headingTokens(token.tokens ?? []));
  }
  return found;
}

/** Every html token anywhere in `tokens` (block, inline, nested). */
function htmlTokens(tokens: readonly Token[]): Token[] {
  const found: Token[] = [];
  for (const token of tokens) {
    if (token.type === "html") found.push(token);
    if (token.type === "list") for (const item of token.items) found.push(...htmlTokens(item.tokens));
    else if ("tokens" in token && Array.isArray(token.tokens)) found.push(...htmlTokens(token.tokens));
  }
  return found;
}

/** One complete HTML comment and only white space around it, as a browser ends it. */
function isCompleteComment(raw: string): boolean {
  const text = raw.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "");
  if (text === "<!-->" || text === "<!--->") return true;
  if (!text.startsWith("<!--") || !text.endsWith("-->") || text.length < 7) return false;
  const body = text.slice(4, -3);
  return !body.startsWith(">") && !body.startsWith("->") && !body.includes("-->") && !body.includes("--!>");
}

/** The section's raw text, or a refusal naming why the page cannot be read as written. */
function sectionOf(markdown: string): { section?: string; findings: string[] } {
  const tokens: TokensList = new Lexer({ gfm: true }).lex(markdown);
  const findings: string[] = [];
  const hiding = htmlTokens(tokens).filter((token) => !isCompleteComment(token.raw));
  if (hiding.length > 0) findings.push(`the page holds ${hiding.length} raw HTML token(s) that can hide lines: ${JSON.stringify(hiding[0]?.raw.slice(0, 80))}`);
  const definitions = Object.keys(tokens.links).length + tokens.filter((token) => token.type === "def").length;
  if (definitions > 0) findings.push(`the page holds ${definitions} link reference definition(s)`);
  const named = headingTokens(tokens).filter((token) => token.type === "heading" && readsAsHeading(headingKey(renderedText(token.tokens))));
  if (named.length !== 1) findings.push(`${named.length} headings read as "${HEADING_KEY}", not exactly one`);
  const start = tokens.findIndex((token) => token.type === "heading" && token.depth === 2 && token.raw.split("\n", 1)[0]?.trimEnd() === HEADING_LINE);
  if (start < 0) return { findings: [...findings, `no top-level "${HEADING_LINE}" heading is written in its committed form`] };
  if (named[0] !== undefined && named[0] !== tokens[start]) findings.push(`the heading that reads as "${HEADING_KEY}" is not the top-level "${HEADING_LINE}"`);
  const stop = tokens.findIndex((token, index) => index > start && token.type === "heading" && token.depth <= 2);
  const section = tokens
    .slice(start, stop < 0 ? tokens.length : stop)
    .map((token) => token.raw)
    .join("");
  return { section, findings };
}

/** Every way `markdown` fails to carry the committed convention section; empty when it does. */
function conventionFindings(markdown: string): string[] {
  const { section, findings } = sectionOf(markdown);
  if (section !== undefined && normalize(section) !== SECTION) findings.push("the section is not the committed text");
  return findings;
}

describe("the delivery-receipt convention doc (wb-xox R3)", () => {
  it("docs/workbench/15 carries the committed Delivery receipts section, uniquely, on a page that hides nothing", () => {
    const doc = readFileSync(DOC_15, "utf8");
    expect(conventionFindings(doc)).toEqual([]);
    expect(normalize(sectionOf(doc).section ?? "")).toBe(SECTION);
  });

  it("names receipts/<bead-id>.md, the one-line INDEX.md append and the scope item 6 correction rule", () => {
    expect(SECTION).toContain("A new receipt goes to `docs/workbench/receipts/<bead-id>.md`, one file per bead");
    expect(SECTION).toContain("A bead's first receipt also appends one line to `docs/workbench/receipts/INDEX.md`");
    expect(SECTION).toContain("is filed as an entry in the correcting bead's `docs/workbench/receipts/<bead-id>.md` that names the corrected row");
    expect(SECTION).toContain("`TRACEABILITY.md` is never edited for a correction");
  });

  it("states the freeze with the cutover row TRACEABILITY.md ends with and the cutover commit the wb-xox receipt names", () => {
    const lines = readFileSync(TRACE, "utf8").replace(/\r\n?/g, "\n").split("\n");
    expect(lines.at(-1)).toBe("");
    expect(lines.at(-2)).toBe(CUTOVER_ROW);
    expect(SECTION).toContain(`the cutover pointer row \`${CUTOVER_ROW}\``);
    expect(SECTION).toContain(`in commit \`${CUTOVER_COMMIT}\``);
    expect(readFileSync(XOX_RECEIPT, "utf8")).toContain(CUTOVER_COMMIT);
  });

  it("names only test files that exist", () => {
    const named = [...SECTION.matchAll(/`(test\/[A-Za-z0-9._-]+\.test\.ts)`/g)].map((match) => match[1] ?? "");
    expect(named).toEqual(["test/workbench-traceability-freeze.test.ts", "test/workbench-receipts-shape.test.ts", "test/workbench-receipts-convention.test.ts"]);
    for (const path of named) expect(existsSync(new URL(`../${path}`, import.meta.url)), path).toBe(true);
  });
});

describe("the convention pin refuses each hiding, duplicating or rewording shape (wb-xox R3 falsifiers)", () => {
  // Each variant is derived from the committed docs/workbench/15 text in memory; nothing on disk is touched.
  const doc = readFileSync(DOC_15, "utf8");
  const at = (code: number): string => String.fromCodePoint(code);
  const lookAlike = (heading: string): string => `${doc}\n\n${heading}\n\nA second convention.\n`;
  const atSection = (replacement: (section: string) => string): string => {
    const start = doc.indexOf(HEADING_LINE);
    return start < 0 ? doc : `${doc.slice(0, start)}${replacement(doc.slice(start))}`;
  };
  const controls: ReadonlyArray<readonly [string, string]> = [
    ["the committed page with CRLF line endings", doc.replaceAll("\n", "\r\n")],
    ["trailing spaces on a section line", doc.replace("never to `docs/workbench/TRACEABILITY.md`.", "never to `docs/workbench/TRACEABILITY.md`.   ")],
    ["a plain section appended after it", `${doc}\n\n## A later section\n\nplain text\n`],
    ["one complete comment before it", doc.replace("## Agent handoff", "<!-- note -->\n\n## Agent handoff")],
  ];
  const falsifiers: ReadonlyArray<readonly [string, string]> = [
    ["the section heading reworded", doc.replace(HEADING_LINE, "## Delivery receipt")],
    ["a rule inside the section reworded (never -> also)", doc.replace("`TRACEABILITY.md` is never edited for a correction", "`TRACEABILITY.md` is also edited for a correction")],
    ["a sentence added inside the section", doc.replace("pins this section as written.", "pins this section as written. Receipts may also go to TRACEABILITY.md.")],
    ["a duplicate of the section appended", `${doc}\n\n${SECTION}\n`],
    ["an NBSP look-alike heading appended", lookAlike(`## Delivery${at(0xa0)}receipts`)],
    ["a Cyrillic look-alike heading appended", lookAlike(`## D${at(0x435)}livery receipts`)],
    ["a zero-width-space look-alike heading appended", lookAlike(`## Deli${at(0x200b)}very receipts`)],
    ["an emphasis look-alike heading appended", lookAlike("## *Delivery* receipts")],
    ["a character-reference look-alike heading appended", lookAlike("## &#68;elivery receipts")],
    ["a setext look-alike heading appended", `${doc}\n\nDelivery receipts\n---\n\nA second convention.\n`],
    ["a look-alike heading nested in a list item", `${doc}\n\n- ## Delivery receipts\n`],
    ["the section moved inside a fenced code block", atSection((section) => `\`\`\`\n${section}\n\`\`\`\n`)],
    ["the section wrapped in an HTML comment", atSection((section) => `<!--\n${section}\n-->\n`)],
    ["an unclosed details element before the section", atSection((section) => `<details>\n\n${section}`)],
    ["a link reference definition on the page", `${doc}\n\n[receipts]: https://example.invalid/receipts\n`],
  ];

  it("reads the committed page as written: the control reports nothing", () => {
    expect(conventionFindings(doc)).toEqual([]);
  });

  for (const [shape, variant] of controls) {
    it(`still accepts ${shape}`, () => {
      expect(variant).not.toBe(doc);
      expect(conventionFindings(variant)).toEqual([]);
    });
  }

  for (const [shape, variant] of falsifiers) {
    it(`refuses ${shape}`, () => {
      expect(variant).not.toBe(doc);
      expect(conventionFindings(variant).length).toBeGreaterThan(0);
    });
  }
});
