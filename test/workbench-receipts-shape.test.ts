import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// wb-xox R2 (scope items 2 and 3): new receipts live in docs/workbench/receipts/, one append-only file per
// bead named after its bead id, beside INDEX.md, which holds exactly one line per receipt file and nothing
// else: "- [<bead-id>](<bead-id>.md) | <bead title> | <first-receipt date, YYYY-MM-DD>". Each receipt file
// opens with "# <bead-id>: <bead title>", the same title its index line carries. Two cuts that deliver at
// once touch disjoint receipt files and meet in INDEX.md as a one-line union at worst.
//
// The rules are one pure function over a listing (receiptsShapeFindings), so the falsifier rows below
// exercise it on synthetic listings in memory; only the first describe block reads the directory.

const RECEIPTS_DIR = fileURLToPath(new URL("../docs/workbench/receipts/", import.meta.url));
const INDEX = "INDEX.md";
const BEAD_ID = "wb-[a-z0-9]+(?:\\.[0-9]+)*";
const RECEIPT_FILE = new RegExp(`^(${BEAD_ID})\\.md$`);
const INDEX_LINE = new RegExp(`^- \\[(${BEAD_ID})\\]\\((${BEAD_ID})\\.md\\) \\| (\\S(?:.*\\S)?) \\| (\\d{4}-\\d{2}-\\d{2})$`);

interface ListedEntry {
  readonly name: string;
  readonly file: boolean;
}

interface Listing {
  readonly entries: readonly ListedEntry[];
  /** The text of every regular file in the listing, by name. */
  readonly texts: ReadonlyMap<string, string>;
}

function isCalendarDate(text: string): boolean {
  const at = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(at.getTime()) && at.toISOString().slice(0, 10) === text;
}

/** The index lines of INDEX.md: the text without its one final line ending, split at LF. */
function indexLines(text: string): string[] {
  return text.endsWith("\n") ? text.slice(0, -1).split("\n") : text.split("\n");
}

/** Every way `listing` breaks the receipts directory shape; empty when the directory is well formed. */
function receiptsShapeFindings(listing: Listing): string[] {
  const findings: string[] = [];
  const receipts = new Map<string, string>();
  let indexPresent = false;
  for (const entry of listing.entries) {
    if (!entry.file) {
      findings.push(`${entry.name}: not a regular file`);
      continue;
    }
    if (entry.name === INDEX) {
      indexPresent = true;
      continue;
    }
    const id = RECEIPT_FILE.exec(entry.name)?.[1];
    if (id === undefined) findings.push(`${entry.name}: not named wb-<id>.md after a bead id`);
    else receipts.set(id, entry.name);
  }
  if (!indexPresent) return [...findings, `${INDEX}: missing`];
  const index = listing.texts.get(INDEX) ?? "";
  if (index.includes("\r")) findings.push(`${INDEX}: holds a carriage return`);
  if (!index.endsWith("\n") || index.endsWith("\n\n")) findings.push(`${INDEX}: does not end with exactly one line ending`);
  const titles = new Map<string, string>();
  for (const [position, line] of indexLines(index).entries()) {
    const match = INDEX_LINE.exec(line);
    if (match === null) {
      findings.push(`${INDEX} line ${position + 1}: not "- [<bead-id>](<bead-id>.md) | <title> | <YYYY-MM-DD>": ${JSON.stringify(line)}`);
      continue;
    }
    const [, id = "", target = "", title = "", date = ""] = match;
    if (target !== id) findings.push(`${INDEX} line ${position + 1}: ${id} links ${target}.md`);
    if (!isCalendarDate(date)) findings.push(`${INDEX} line ${position + 1}: ${date} is not a calendar date`);
    if (titles.has(id)) findings.push(`${INDEX} line ${position + 1}: ${id} is indexed twice`);
    titles.set(id, title);
    if (!receipts.has(id)) findings.push(`${INDEX} line ${position + 1}: ${id}.md is not a file in the directory`);
  }
  for (const [id, name] of receipts) {
    const title = titles.get(id);
    if (title === undefined) {
      findings.push(`${name}: has no ${INDEX} line`);
      continue;
    }
    const heading = (listing.texts.get(name) ?? "").split("\n", 1)[0];
    if (heading !== `# ${id}: ${title}`) findings.push(`${name}: first line ${JSON.stringify(heading)} is not "# ${id}: <the ${INDEX} title>"`);
  }
  return findings;
}

function readListing(): Listing {
  const entries = readdirSync(RECEIPTS_DIR, { withFileTypes: true }).map((dirent) => ({ name: dirent.name, file: dirent.isFile() }));
  const texts = new Map(entries.filter((entry) => entry.file).map((entry) => [entry.name, readFileSync(join(RECEIPTS_DIR, entry.name), "utf8")] as const));
  return { entries, texts };
}

describe("docs/workbench/receipts/ shape (wb-xox R2)", () => {
  it("names every file except INDEX.md wb-<id>.md, and INDEX.md holds exactly one line per sibling file", () => {
    const listing = readListing();
    expect(receiptsShapeFindings(listing)).toEqual([]);
    const siblings = listing.entries.filter((entry) => entry.name !== INDEX);
    expect(siblings.length).toBeGreaterThan(0);
    expect(indexLines(listing.texts.get(INDEX) ?? "")).toHaveLength(siblings.length);
  });

  it("is seeded by wb-xox's own receipt file and index line, so the cut follows its own convention", () => {
    const listing = readListing();
    expect(listing.entries.map((entry) => entry.name)).toContain("wb-xox.md");
    expect(indexLines(listing.texts.get(INDEX) ?? "").filter((line) => line.startsWith("- [wb-xox](wb-xox.md) | "))).toHaveLength(1);
  });
});

describe("receipts shape rules refuse each malformed listing (wb-xox R2 falsifiers)", () => {
  const goodIndex = "- [wb-aaa](wb-aaa.md) | first bead | 2026-10-17\n- [wb-bbb.2](wb-bbb.2.md) | second | bead | 2026-10-18\n";
  const goodTexts: ReadonlyArray<readonly [string, string]> = [
    [INDEX, goodIndex],
    ["wb-aaa.md", "# wb-aaa: first bead\n\n## 2026-10-17 receipt\n"],
    ["wb-bbb.2.md", "# wb-bbb.2: second | bead\n"],
  ];
  const listingOf = (texts: ReadonlyArray<readonly [string, string]>, extra: readonly ListedEntry[] = []): Listing => ({
    entries: [...texts.map(([name]) => ({ name, file: true })), ...extra],
    texts: new Map(texts),
  });
  const withText = (name: string, text: string): ReadonlyArray<readonly [string, string]> =>
    goodTexts.map(([entry, body]) => [entry, entry === name ? text : body] as const);
  const malformed: ReadonlyArray<readonly [string, Listing]> = [
    ["a stray README.md beside the receipts", listingOf([...goodTexts, ["README.md", "notes\n"]])],
    ["an upper-case receipt name", listingOf([...goodTexts.filter(([name]) => name !== "wb-aaa.md"), ["WB-AAA.md", "# wb-aaa: first bead\n"]])],
    ["a receipt with another extension", listingOf([...goodTexts, ["wb-ccc.markdown", "# wb-ccc: x\n"]])],
    ["a subdirectory", listingOf(goodTexts, [{ name: "wb-ddd", file: false }])],
    ["INDEX.md missing", listingOf(goodTexts.filter(([name]) => name !== INDEX))],
    ["a receipt file with no index line", listingOf([...goodTexts, ["wb-eee.md", "# wb-eee: x\n"]])],
    ["an index line for a file that is not there", listingOf(withText(INDEX, `${goodIndex}- [wb-fff](wb-fff.md) | gone | 2026-10-18\n`))],
    ["the same bead indexed twice", listingOf(withText(INDEX, `${goodIndex}- [wb-aaa](wb-aaa.md) | first bead | 2026-10-19\n`))],
    ["a header line in the index", listingOf(withText(INDEX, `# Index\n${goodIndex}`))],
    ["a blank line inside the index", listingOf(withText(INDEX, goodIndex.replace("\n- [wb-bbb.2]", "\n\n- [wb-bbb.2]")))],
    ["an index line whose link names another file", listingOf(withText(INDEX, goodIndex.replace("(wb-aaa.md)", "(wb-bbb.2.md)")))],
    ["an index date that is not a calendar date", listingOf(withText(INDEX, goodIndex.replace("2026-10-17", "2026-02-30")))],
    ["an index line with no date", listingOf(withText(INDEX, goodIndex.replace(" | 2026-10-17", "")))],
    ["an index without its final line ending", listingOf(withText(INDEX, goodIndex.slice(0, -1)))],
    ["an index written with CRLF", listingOf(withText(INDEX, goodIndex.replaceAll("\n", "\r\n")))],
    ["a receipt whose first line names another bead", listingOf(withText("wb-aaa.md", "# wb-bbb.2: first bead\n"))],
    ["a receipt whose title differs from its index line", listingOf(withText("wb-aaa.md", "# wb-aaa: renamed bead\n"))],
  ];

  it("accepts the well-formed control listing", () => {
    expect(receiptsShapeFindings(listingOf(goodTexts))).toEqual([]);
  });

  for (const [shape, listing] of malformed) {
    it(`refuses ${shape}`, () => {
      expect(receiptsShapeFindings(listing).length).toBeGreaterThan(0);
    });
  }
});
