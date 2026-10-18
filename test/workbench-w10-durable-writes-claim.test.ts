/**
 * wb-2j3.4 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION R5): the feature-matrix W10 claim row no longer publishes the
 * false universal negative "zero durable writes" for the rf preview; it carries the plane-scoped sentence instead.
 *
 * Spec lines pinned (bead acceptance):
 *  A1 "A wb-6hb.11-style census falsifier binds the W10 row: FAILS while /zero durable writes/ remains in
 *      feature-matrix.md:105 (RED at 9df9a03), passes with the plane-scoped phrase."
 *  A2 "wb-cax.1's TRACEABILITY validator and the wb-6hb.11 docs census run green in the same change (no guard left
 *      asserting the old phrasing)." (test/workbench-w10-stamped-claim-guard.test.ts pins this row's Feature cell and is
 *      updated in the same change; test/workbench-traceability-freeze.test.ts and the docs-07 census stay untouched.)
 * Statement: "no authoritative/journal write; disposable cache-plane writes possible per the pinned producer trace".
 *
 * The row is located by its W10 section key and its first-cell key, never by line number (the row has moved before). The
 * Feature cell is judged by slice equality against its committed text; the whole row is judged against the withdrawn
 * phrases. Only the Feature cell's wording is pinned here: the Evidence cell (carrier correction, stamped receipt sentence)
 * belongs to test/workbench-w10-stamped-claim-guard.test.ts and wb-973.16 and is not asserted.
 * Spawns nothing; writes nothing; reads docs/workbench/feature-matrix.md.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const MATRIX = join(process.cwd(), "docs/workbench/feature-matrix.md");
const W10_HEADING = /^## W10: /;
const CLAIM_PREFIX = "| node() RF noncommitted context preview capability";
const WITHDRAWN = /zero durable writes|no durable writes?\b|effect-?free|no effects/i;
const PLANE_SCOPED = "no authoritative or journal write, disposable cache-plane writes possible per the pinned producer trace";
const FEATURE_COMMITTED = `node() RF noncommitted context preview capability (reactivefiber.render.preview/v1) with graph provenance; ${PLANE_SCOPED}`;

/** Findings for the W10 claim row of a matrix page; empty when the row is present, plane-scoped and free of the withdrawn claim. */
function judgeW10Row(source: string): string[] {
  const lines = source.split("\n");
  const start = lines.findIndex((line) => W10_HEADING.test(line));
  if (start < 0) return ["the W10 section is absent"];
  let end = lines.findIndex((line, index) => index > start && /^## /.test(line));
  if (end < 0) end = lines.length;
  const rows = lines.slice(start, end).filter((line) => line.startsWith(CLAIM_PREFIX));
  if (rows.length !== 1) return [`the W10 section holds ${rows.length} claim rows, not exactly 1 (absent or duplicated)`];
  const row = rows[0] ?? "";
  const findings: string[] = [];
  const withdrawn = WITHDRAWN.exec(row);
  if (withdrawn !== null) findings.push(`the W10 claim row still carries the withdrawn claim "${withdrawn[0]}"`);
  const cells = row.split(" | ");
  const feature = (cells[0] ?? "").replace(/^\| /, "");
  if (feature !== FEATURE_COMMITTED) {
    findings.push(`the W10 claim row's Feature cell reads ${JSON.stringify(feature)}, not the plane-scoped ${JSON.stringify(FEATURE_COMMITTED)}`);
  }
  return findings;
}

const committed = readFileSync(MATRIX, "utf8");

describe("wb-2j3.4 W10 claim row is plane-scoped (A1)", () => {
  it("the committed matrix W10 claim row carries the plane-scoped sentence and no withdrawn claim", () => {
    expect(judgeW10Row(committed)).toEqual([]);
  });

  it("A1 re-inserting the old phrase into the Feature cell goes red", () => {
    const mutated = committed.replace(
      `with graph provenance; ${PLANE_SCOPED}`,
      "with graph provenance and zero durable writes",
    );
    expect(mutated).not.toBe(committed);
    const findings = judgeW10Row(mutated);
    expect(findings.join("\n")).toContain('still carries the withdrawn claim "zero durable writes"');
  });

  it("A1 the old phrase anywhere else in the row (the Evidence cell) goes red", () => {
    const mutated = committed.replace("Bead wb-x32 (open).", "Bead wb-x32 (open). The preview has zero durable writes.");
    expect(mutated).not.toBe(committed);
    expect(judgeW10Row(mutated).join("\n")).toContain('"zero durable writes"');
  });

  it("A1 deleting the W10 claim row goes red as absent", () => {
    const mutated = committed
      .split("\n")
      .filter((line) => !line.startsWith(CLAIM_PREFIX))
      .join("\n");
    expect(mutated).not.toBe(committed);
    expect(judgeW10Row(mutated).join("\n")).toContain("holds 0 claim rows");
  });

  it("A1 weakening the plane-scoped phrase (dropping the cache-plane disclosure) goes red", () => {
    const mutated = committed.replace(", disposable cache-plane writes possible per the pinned producer trace", "");
    expect(mutated).not.toBe(committed);
    expect(judgeW10Row(mutated).join("\n")).toContain("Feature cell reads");
  });

  it("A1 a duplicated claim row goes red", () => {
    const row = committed.split("\n").find((line) => line.startsWith(CLAIM_PREFIX)) ?? "";
    expect(row).not.toBe("");
    const mutated = committed.replace(row, `${row}\n${row}`);
    expect(judgeW10Row(mutated).join("\n")).toContain("holds 2 claim rows");
  });

  it("A1 deleting the W10 section heading goes red as absent", () => {
    const mutated = committed.replace("## W10: ReactiveFiber provider/interop", "## W10 renamed");
    expect(mutated).not.toBe(committed);
    expect(judgeW10Row(mutated)).toEqual(["the W10 section is absent"]);
  });
});
