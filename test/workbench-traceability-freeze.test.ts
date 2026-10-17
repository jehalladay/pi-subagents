import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// wb-xox R1 (scope items 1, 4 and 6): docs/workbench/TRACEABILITY.md is frozen as the historical record.
// The wb-xox cut is its last writer. It appended ONE cutover pointer row, after one blank separator line,
// to the file exactly as trunk 5636365 held it: git blob 9d959bbfa68448b7f61a2fee74a4babb9b08d04c, the
// blob the wb-5x0.1 landing 5636365 wrote with the last row of the old EOF-append convention. The row was
// first cut on trunk 130785e (blob 3ffc7495bab9902f48eee51b7d71401dbf460d35, ending with the wb-cra row);
// the wb-5x0.1 row landed after that cut, so the union re-cut took the landed file first and re-anchored
// the cutover row after it, still the last line. This census
// pins the bytes three ways: the historical record is a byte-exact prefix, the only bytes after it are the
// separator and the cutover row, and the whole file carries one pinned content hash. Any later diff to the
// file therefore fails here: an appended receipt, a correction edited into a historical row, a row slipped
// in above the cutover row, a reworded, repeated or removed cutover row, rewritten line endings.
//
// New receipts go to docs/workbench/receipts/<bead-id>.md; a correction to a historical row is filed as an
// entry there that names the row (docs/workbench/15 section "Delivery receipts"). The constants below are
// part of the freeze: a later change to them is itself a diff to this census, visible in review.
//
// The pin is byte-exact by design. The repository carries no .gitattributes and the committed blob holds
// LF line endings only, so a checkout that rewrites line endings reads as a diff.

const TRACE = new URL("../docs/workbench/TRACEABILITY.md", import.meta.url);

/** The cutover pointer row: the frozen file's last line, written once by wb-xox. */
const CUTOVER_ROW = "## Continued in receipts/ per wb-xox";

/** Everything the cutover appended after the historical record: one blank separator line, then the row. */
const CUTOVER_TAIL = `\n${CUTOVER_ROW}\n`;

/** Byte length of the historical record (the file at trunk 5636365). */
const HISTORICAL_BYTES = 112023;

/** sha256 of the historical record, as `git show 5636365:docs/workbench/TRACEABILITY.md | sha256sum` prints it. */
const HISTORICAL_SHA256 = "797d58ad3ecb17b8dc39379c04a883368d2ff47a8fea8f2aa24224a8015af04a";

/** sha256 of the frozen file: the historical record, then CUTOVER_TAIL. */
const FROZEN_SHA256 = "8ec4715e5b8cbec7d24e5926c79388c3018cc57780c05251b015d36411e462d4";

function sha256(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

/** Every way `bytes` differs from the frozen TRACEABILITY file; empty only for the frozen file itself. */
function freezeFindings(bytes: Buffer): string[] {
  const findings: string[] = [];
  const historical = bytes.subarray(0, HISTORICAL_BYTES);
  if (historical.length !== HISTORICAL_BYTES || sha256(historical) !== HISTORICAL_SHA256) {
    findings.push(`the first ${HISTORICAL_BYTES} bytes are not the historical record (sha256 ${HISTORICAL_SHA256})`);
  }
  const tail = bytes.subarray(HISTORICAL_BYTES).toString("utf8");
  if (tail !== CUTOVER_TAIL) {
    findings.push(`the bytes after the historical record are not one blank separator line and the cutover row: ${JSON.stringify(tail.slice(0, 160))}`);
  }
  const written = bytes
    .toString("utf8")
    .split("\n")
    .filter((line) => line === CUTOVER_ROW).length;
  if (written !== 1) findings.push(`the cutover row is written ${written} times, not once`);
  if (sha256(bytes) !== FROZEN_SHA256) findings.push(`the file's content hash is not the frozen hash ${FROZEN_SHA256}`);
  return findings;
}

describe("TRACEABILITY freeze census (wb-xox R1)", () => {
  it("is the historical record byte for byte, then one blank separator line and the cutover row", () => {
    const frozen = readFileSync(TRACE);
    expect(frozen.length).toBe(HISTORICAL_BYTES + Buffer.byteLength(CUTOVER_TAIL));
    expect(sha256(frozen.subarray(0, HISTORICAL_BYTES))).toBe(HISTORICAL_SHA256);
    expect(frozen.subarray(HISTORICAL_BYTES).toString("utf8")).toBe(CUTOVER_TAIL);
  });

  it("ends with the cutover row as its last line, written exactly once", () => {
    const lines = readFileSync(TRACE, "utf8").split("\n");
    expect(lines.at(-1)).toBe("");
    expect(lines.at(-2)).toBe(CUTOVER_ROW);
    expect(lines.filter((line) => line === CUTOVER_ROW)).toHaveLength(1);
  });

  it("carries the pinned frozen content hash, so any later diff to the file fails here", () => {
    const frozen = readFileSync(TRACE);
    expect(sha256(frozen)).toBe(FROZEN_SHA256);
    expect(freezeFindings(frozen)).toEqual([]);
  });
});

describe("TRACEABILITY freeze census refuses each later-diff shape (wb-xox R1 falsifiers)", () => {
  // Each variant is derived from the committed file in memory; nothing on disk is touched.
  const text = readFileSync(TRACE, "utf8");
  const historicalRow = "| WB-001 | P0 |";
  const variants: ReadonlyArray<readonly [string, string]> = [
    ["a receipt section appended after the cutover row (the retired EOF-append)", `${text}\n## A later receipt (wb-zzz)\n\nbody\n`],
    ["a correction edited into a historical matrix row (scope item 6 files it under receipts/ instead)", text.replace(historicalRow, "| WB-001 | P1 |")],
    ["a section slipped in above the cutover row with no re-pin", text.replace(CUTOVER_TAIL, `\n## A late section (wb-zzz)\n\nbody\n${CUTOVER_TAIL}`)],
    ["the cutover row removed", text.endsWith(CUTOVER_TAIL) ? text.slice(0, -CUTOVER_TAIL.length) : text],
    ["the cutover row written a second time", `${text}${CUTOVER_ROW}\n`],
    ["the cutover row reworded", text.replace(CUTOVER_ROW, "## Continued in receipts per wb-xox")],
    ["every line ending rewritten as CRLF", text.replaceAll("\n", "\r\n")],
    ["the final line ending dropped", text.slice(0, -1)],
  ];

  it("starts from the frozen file itself: the control reports nothing", () => {
    expect(freezeFindings(Buffer.from(text, "utf8"))).toEqual([]);
  });

  for (const [shape, variant] of variants) {
    it(`refuses ${shape}`, () => {
      expect(variant).not.toBe(text);
      expect(freezeFindings(Buffer.from(variant, "utf8")).length).toBeGreaterThan(0);
    });
  }
});
