/**
 * wb-5zz: the receipts index is a RENDERED VIEW of docs/workbench/receipts/, never a committed file.
 *
 * Convention (docs/workbench/15-implementation-program.md, section "Delivery receipts", as amended by
 * wb-5zz): every entry in the directory is a regular file named wb-<id>.md after a bead id; each opens
 * with "# <bead-id>: <bead title>" and a dated first entry heading "## <YYYY-MM-DD> ..."; the index is
 * rendered from that listing, one line per receipt file,
 * "- [<bead-id>](<bead-id>.md) | <bead title> | <first-receipt date as YYYY-MM-DD>", the title from the
 * file's first line and the date from its first entry heading, ordered by date then bead id. Both sort
 * keys compare by plain code points (never localeCompare, never Date arithmetic), so "wb-a3s" sorts
 * before "wb-a3s.1" and "wb-x.10" before "wb-x.9": deterministic, documented, acceptable for a pin.
 * Heading rules use the marked lexer over TOP-LEVEL tokens, never a line scan: a dated line inside a
 * fenced block is not a heading.
 *
 * Retired file: the committed docs/workbench/receipts/INDEX.md was retired by wb-5zz and is never
 * re-created and never edited. Its last blob was 6d700dcea926bced3e56202df9df60f3bbe399c8 (short 6d700dc;
 * sha256 33d5f716e489f5d37e420f9dcc8452c61dce19c1d13419ef2e6bb852b9f696b8; 29 lines at the cut base,
 * trunk ea31d5f). Its order equalled the trunk first-parent add order of the receipt files (29/29),
 * which stays recoverable by:
 *   git log --first-parent --reverse --diff-filter=A --name-only -- docs/workbench/receipts/
 * A committed INDEX.md beside the receipts is a refusal here and in test/workbench-receipts-shape.test.ts.
 *
 * Purity contract: the judge and the renderer are pure functions of the listing. The listing is read with
 * a sorted readdir; no clock, no git, no environment, no locale enters the render; and the render either
 * succeeds whole or throws its findings (fail closed, never a partial view).
 *
 * CLI: node qa/workbench/receipts-index.mjs [dir]   (dir defaults to docs/workbench/receipts under cwd)
 *   exit 0: the rendered index on stdout
 *   exit 1: the shape findings on stderr
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { Lexer } from "marked";

/** @typedef {{ readonly name: string, readonly file: boolean }} ListedEntry */
/** @typedef {{ readonly entries: ReadonlyArray<ListedEntry>, readonly texts: ReadonlyMap<string, string> }} Listing */

export const BEAD_ID = "wb-[a-z0-9]+(?:\\.[0-9]+)*";
export const RECEIPT_FILE = new RegExp(`^(${BEAD_ID})\\.md$`);
export const INDEX_LINE = new RegExp(`^- \\[(${BEAD_ID})\\]\\((${BEAD_ID})\\.md\\) \\| (\\S(?:.*\\S)?) \\| (\\d{4}-\\d{2}-\\d{2})$`);
const RETIRED_INDEX = "INDEX.md";
const SEED = "wb-xox";
const FIRST_LINE = new RegExp(`^# (${BEAD_ID}): (\\S(?:.*\\S)?)$`);
const ENTRY_DATE = /^(\d{4}-\d{2}-\d{2})(?: |$)/;

/**
 * True when `text` is a real calendar date (UTC round-trip).
 * @param {string} text
 * @returns {boolean}
 */
export function isCalendarDate(text) {
  const at = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(at.getTime()) && at.toISOString().slice(0, 10) === text;
}

/**
 * Plain code-point compare (never localeCompare).
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function compare(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * The receipts directory read as a listing: entries sorted by name (code point), the text of every
 * regular file by name.
 * @param {string} dirPath
 * @returns {Listing}
 */
export function readReceiptsListing(dirPath) {
  const entries = readdirSync(dirPath, { withFileTypes: true })
    .map((dirent) => ({ name: dirent.name, file: dirent.isFile() }))
    .sort((a, b) => compare(a.name, b.name));
  /** @type {Map<string, string>} */
  const texts = new Map();
  for (const entry of entries) {
    if (entry.file) texts.set(entry.name, readFileSync(join(dirPath, entry.name), "utf8"));
  }
  return { entries, texts };
}

/**
 * The one walk both exports share: every finding, and the render row of every well-formed receipt.
 * @param {Listing} listing
 * @returns {{ findings: string[], rows: Array<{ id: string, title: string, date: string }> }}
 */
function judge(listing) {
  /** @type {string[]} */
  const findings = [];
  /** @type {Map<string, string>} */
  const receipts = new Map();
  for (const entry of listing.entries) {
    if (!entry.file) {
      findings.push(`${entry.name}: not a regular file`);
      continue;
    }
    if (entry.name === RETIRED_INDEX) {
      findings.push(`${RETIRED_INDEX}: the index is rendered, never committed (wb-5zz)`);
      continue;
    }
    const id = RECEIPT_FILE.exec(entry.name)?.[1];
    if (id === undefined) findings.push(`${entry.name}: not named wb-<id>.md after a bead id`);
    else receipts.set(id, entry.name);
  }
  /** @type {Array<{ id: string, title: string, date: string }>} */
  const rows = [];
  for (const [id, name] of receipts) {
    const text = listing.texts.get(name) ?? "";
    if (text.includes("\r")) findings.push(`${name}: holds a carriage return`);
    const line = text.split("\n", 1)[0] ?? "";
    const opening = FIRST_LINE.exec(line);
    /** @type {string | undefined} */
    let title;
    if (opening === null) findings.push(`${name}: first line ${JSON.stringify(line)} is not "# <bead-id>: <title>"`);
    else if (opening[1] !== id) findings.push(`${name}: first line names ${opening[1]}`);
    else title = opening[2];
    /** @type {string | undefined} */
    let date;
    let sawEntry = false;
    let level1 = 0;
    for (const token of new Lexer({ gfm: true }).lex(text)) {
      if (token.type !== "heading") continue;
      if (token.depth === 1) {
        level1 += 1;
        if (level1 > 1) findings.push(`${name}: holds a second level-1 heading`);
        continue;
      }
      if (token.depth !== 2) continue;
      const heading = String(token.text);
      const opens = ENTRY_DATE.exec(heading)?.[1];
      const dated = opens !== undefined && isCalendarDate(opens);
      if (!sawEntry) {
        sawEntry = true;
        if (dated) date = opens;
        else findings.push(`${name}: first entry heading ${JSON.stringify(heading)} does not open with a calendar date`);
      } else if (!dated) {
        findings.push(`${name}: entry heading ${JSON.stringify(heading)} does not open with a calendar date`);
      }
    }
    if (!sawEntry) findings.push(`${name}: has no entry heading (## <YYYY-MM-DD> ...)`);
    if (title !== undefined && date !== undefined) rows.push({ id, title, date });
  }
  if (receipts.size === 0) findings.push("no receipt files");
  if (!receipts.has(SEED)) findings.push(`${SEED}.md: the seed receipt is missing`);
  rows.sort((a, b) => compare(a.date, b.date) || compare(a.id, b.id));
  return { findings, rows };
}

/**
 * Every way `listing` breaks the receipts directory shape; empty when it is well formed.
 * @param {Listing} listing
 * @returns {string[]}
 */
export function receiptsShapeFindings(listing) {
  return judge(listing).findings;
}

/**
 * The rendered receipts index: one line per receipt file, ordered by date then bead id, one trailing
 * line feed. Throws its findings when the listing is malformed (fail closed, never a partial view).
 * @param {Listing} listing
 * @returns {string}
 */
export function renderReceiptsIndex(listing) {
  const { findings, rows } = judge(listing);
  if (findings.length > 0) throw new Error(findings.join("\n"));
  return `${rows.map((row) => `- [${row.id}](${row.id}.md) | ${row.title} | ${row.date}`).join("\n")}\n`;
}

const argv1 = process.argv[1];
if (argv1 !== undefined && import.meta.url === pathToFileURL(argv1).href) {
  const dir = process.argv[2] ?? join(process.cwd(), "docs", "workbench", "receipts");
  const listing = readReceiptsListing(dir);
  const findings = receiptsShapeFindings(listing);
  if (findings.length > 0) {
    process.stderr.write(`${findings.join("\n")}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(renderReceiptsIndex(listing));
  }
}
