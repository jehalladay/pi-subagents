import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { INDEX_LINE, readReceiptsListing, receiptsShapeFindings, renderReceiptsIndex } from "../qa/workbench/receipts-index.mjs";

// wb-xox R2 as amended by wb-5zz (scope items 2 and 3): new receipts live in docs/workbench/receipts/, one
// append-only file per bead named after its bead id. The index is a RENDERED VIEW of that directory
// (qa/workbench/receipts-index.mjs), never a committed file: a committed INDEX.md beside the receipts is a
// refusal. Each receipt opens with "# <bead-id>: <bead title>" and a dated first entry heading
// "## <YYYY-MM-DD> ..."; the rendered index holds exactly one line per receipt file,
// "- [<bead-id>](<bead-id>.md) | <bead title> | <first-receipt date, YYYY-MM-DD>", ordered by date then
// bead id (plain code-point compare, never localeCompare). Two cuts that deliver at once touch disjoint
// receipt files and meet nowhere: the shared file this suite used to pin was retired by wb-5zz.
//
// The rules are one pure module (the judge the w10 guard and the CLI share), so the falsifier rows below
// exercise it on synthetic listings in memory; only the first describe block reads the directory.

const RECEIPTS_DIR = fileURLToPath(new URL("../docs/workbench/receipts/", import.meta.url));

interface ListedEntry {
  readonly name: string;
  readonly file: boolean;
}

interface Listing {
  readonly entries: readonly ListedEntry[];
  /** The text of every regular file in the listing, by name. */
  readonly texts: ReadonlyMap<string, string>;
}

const goodTexts: ReadonlyArray<readonly [string, string]> = [
  ["wb-aaa.md", "# wb-aaa: first bead\n\n## 2026-10-17 receipt\n"],
  ["wb-bbb.2.md", "# wb-bbb.2: second | bead\n\n## 2026-10-18 receipt\n"],
  ["wb-xox.md", "# wb-xox: the seed receipt\n\n## 2026-10-16 receipt\n"],
];
const listingOf = (texts: ReadonlyArray<readonly [string, string]>, extra: readonly ListedEntry[] = []): Listing => ({
  entries: [...texts.map(([name]) => ({ name, file: true })), ...extra],
  texts: new Map(texts),
});
const withText = (name: string, text: string): ReadonlyArray<readonly [string, string]> =>
  goodTexts.map(([entry, body]) => [entry, entry === name ? text : body] as const);
/** The control listing's exact rendered bytes: date ascending, then bead id, one trailing LF. */
const CONTROL_RENDER = `${[
  "- [wb-xox](wb-xox.md) | the seed receipt | 2026-10-16",
  "- [wb-aaa](wb-aaa.md) | first bead | 2026-10-17",
  "- [wb-bbb.2](wb-bbb.2.md) | second | bead | 2026-10-18",
].join("\n")}\n`;

describe("docs/workbench/receipts/ shape (wb-xox R2 as amended by wb-5zz)", () => {
  it("every entry is a receipt file, no INDEX.md is committed, and the rendered index holds one well-formed line per receipt", () => {
    const listing = readReceiptsListing(RECEIPTS_DIR);
    expect(receiptsShapeFindings(listing)).toEqual([]);
    expect(listing.entries.map((entry) => entry.name)).not.toContain("INDEX.md");
    expect(listing.entries.length).toBeGreaterThan(0);
    const render = renderReceiptsIndex(listing);
    expect(render.includes("\r")).toBe(false);
    expect(render.endsWith("\n")).toBe(true);
    expect(render.endsWith("\n\n")).toBe(false);
    const lines = render.slice(0, -1).split("\n");
    expect(lines).toHaveLength(listing.entries.length);
    const ids: string[] = [];
    for (const line of lines) {
      const match = INDEX_LINE.exec(line);
      expect(match, line).not.toBeNull();
      expect(match?.[2], line).toBe(match?.[1]);
      ids.push(match?.[1] ?? "");
    }
    expect(new Set(ids).size).toBe(lines.length);
  });

  it("is seeded by wb-xox's own receipt file and rendered line, so the cut follows its own convention", () => {
    const listing = readReceiptsListing(RECEIPTS_DIR);
    expect(listing.entries.map((entry) => entry.name)).toContain("wb-xox.md");
    const lines = renderReceiptsIndex(listing).slice(0, -1).split("\n");
    expect(lines.filter((line) => line.startsWith("- [wb-xox](wb-xox.md) | "))).toHaveLength(1);
  });
});

describe("the rendered index is a pure function of the listing (wb-5zz render controls)", () => {
  it("renders the control listing to its exact bytes: title from the first line, date from the first entry heading", () => {
    expect(renderReceiptsIndex(listingOf(goodTexts))).toBe(CONTROL_RENDER);
    for (const line of CONTROL_RENDER.slice(0, -1).split("\n")) expect(line, line).toMatch(INDEX_LINE);
  });

  it("renders identical bytes when the listing arrives in reverse order (determinism)", () => {
    expect(renderReceiptsIndex(listingOf([...goodTexts].reverse()))).toBe(CONTROL_RENDER);
  });

  it("orders by date then bead id with plain code-point compares", () => {
    const withZzz = listingOf([...goodTexts, ["wb-zzz.md", "# wb-zzz: last named, early dated\n\n## 2026-10-16 receipt\n"]]);
    const lines = renderReceiptsIndex(withZzz).slice(0, -1).split("\n");
    expect(lines.map((line) => INDEX_LINE.exec(line)?.[1])).toEqual(["wb-xox", "wb-zzz", "wb-aaa", "wb-bbb.2"]);
  });

  it("round-trips a title that itself carries ' | ' through the line grammar", () => {
    const line = renderReceiptsIndex(listingOf(goodTexts)).slice(0, -1).split("\n").find((row) => row.startsWith("- [wb-bbb.2]"));
    expect(INDEX_LINE.exec(line ?? "")?.[3]).toBe("second | bead");
  });

  it("throws the finding text on a malformed listing instead of rendering a partial view", () => {
    const withIndex = listingOf([...goodTexts, ["INDEX.md", CONTROL_RENDER]]);
    expect(() => renderReceiptsIndex(withIndex)).toThrowError("INDEX.md: the index is rendered, never committed (wb-5zz)");
  });
});

describe("receipts shape rules refuse each malformed listing (wb-xox R2 falsifiers, as amended by wb-5zz)", () => {
  const malformed: ReadonlyArray<readonly [string, Listing]> = [
    ["a stray README.md beside the receipts", listingOf([...goodTexts, ["README.md", "notes\n"]])],
    ["an upper-case receipt name", listingOf([...goodTexts.filter(([name]) => name !== "wb-aaa.md"), ["WB-AAA.md", "# wb-aaa: first bead\n\n## 2026-10-17 receipt\n"]])],
    ["a receipt with another extension", listingOf([...goodTexts, ["wb-ccc.markdown", "# wb-ccc: x\n\n## 2026-10-18 receipt\n"]])],
    ["a subdirectory", listingOf(goodTexts, [{ name: "wb-ddd", file: false }])],
    ["a committed INDEX.md beside the receipts", listingOf([...goodTexts, ["INDEX.md", "- [wb-aaa](wb-aaa.md) | first bead | 2026-10-17\n"]])],
    ["a receipt with no entry heading", listingOf([...goodTexts, ["wb-eee.md", "# wb-eee: x\n"]])],
    ["a first entry heading dated 2026-02-30", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\n\n## 2026-02-30 receipt\n"))],
    ["a first entry heading with no date (## receipt)", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\n\n## receipt\n"))],
    ["a receipt written with CRLF", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\r\n\r\n## 2026-10-17 receipt\r\n"))],
    ["a receipt whose first line names another bead", listingOf(withText("wb-aaa.md", "# wb-bbb.2: first bead\n\n## 2026-10-17 receipt\n"))],
    ["an empty title (# wb-aaa: )", listingOf(withText("wb-aaa.md", "# wb-aaa: \n\n## 2026-10-17 receipt\n"))],
    ["a title ending in a space", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead \n\n## 2026-10-17 receipt\n"))],
    ["no colon after the bead id (# wb-aaa first bead)", listingOf(withText("wb-aaa.md", "# wb-aaa first bead\n\n## 2026-10-17 receipt\n"))],
    ["the only dated line sits inside a fenced block before any heading", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\n\n```\n## 2026-10-17 receipt\n```\n"))],
    ["a second level-1 heading", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\n\n## 2026-10-17 receipt\n\n# appendix\n"))],
    ["an undated second entry heading (## Summary)", listingOf(withText("wb-aaa.md", "# wb-aaa: first bead\n\n## 2026-10-17 receipt\n\n## Summary\n"))],
    ["the seed receipt wb-xox.md missing", listingOf(goodTexts.filter(([name]) => name !== "wb-xox.md"))],
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
