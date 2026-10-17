/**
 * wb-8bi: the display-safety oracle must be ONE definition, or every declared copy must equal it.
 *
 * Spec (bead wb-8bi): "UNSAFE_DISPLAY oracle drift: four sibling copies carry the unwidened form while graph-view, execute and
 * sanitizer-corpus carry the 19 wb-rqd units ... Red-first: a unit the sanitizer rejects that an unwidened copy accepts."
 * Cure shape taken: hoist test/helpers/unsafe-display.ts and import it from the four formerly unwidened suites; the widened
 * copies the verbatim-segment and corpus files keep are pinned equal to it here, so a future edit to either side goes red.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { stripUnsafeText } from "../src/workbench/redaction.js";
import { UNSAFE_DISPLAY } from "./helpers/unsafe-display.js";

const cp = (code: number): string => String.fromCodePoint(code);
const named = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;

/** The 19 wb-rqd format-control units, each as [name, code point]. */
const RQD_UNITS: readonly (readonly [string, number])[] = [0xfff9, 0xfffa, 0xfffb, ...Array.from({ length: 16 }, (_, at) => 0x13430 + at)].map(
  code => [named(code), code] as const,
);
/** The nearest code point past each range on the side where text begins again. */
const RQD_NEIGHBOURS: readonly (readonly [string, number])[] = [
  [`${named(0xfffc)} after FFF9-FFFB`, 0xfffc],
  [`${named(0x1342f)} before 13430-1343F`, 0x1342f],
  [`${named(0x13440)} after 13430-1343F`, 0x13440],
];

describe("shared UNSAFE_DISPLAY oracle (wb-8bi)", () => {
  it("names all 19 units and 3 neighbours", () => {
    expect(RQD_UNITS).toHaveLength(19);
    expect(RQD_NEIGHBOURS).toHaveLength(3);
  });

  it.each(RQD_UNITS)("%s: the shared oracle flags it and stripUnsafeText drops it", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(true);
    expect(stripUnsafeText(cp(code))).toBe("");
  });

  it.each(RQD_NEIGHBOURS)("%s: the shared oracle and stripUnsafeText both keep it as text", (_, code) => {
    expect(UNSAFE_DISPLAY.test(cp(code))).toBe(false);
    expect(stripUnsafeText(cp(code))).toBe(cp(code));
  });
});

const TEST_DIR = new URL(".", import.meta.url).pathname;
const SELF = "workbench-unsafe-display-oracle.test.ts";
/** A whole-line regex-literal declaration of a display-safety oracle: const UNSAFE_DISPLAY = /.../u; (or the DISPLAY_UNSAFE spelling). */
const DECLARATION = /^\s*(?:export\s+)?const\s+(UNSAFE_DISPLAY|DISPLAY_UNSAFE)\b[^=\n]*=\s*\/(.*)\/([a-z]*);\s*$/gmu;

const testSources = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory() ? testSources(join(dir, entry.name)) : /\.test\.ts$/u.test(entry.name) && entry.name !== SELF ? [join(dir, entry.name)] : [],
  );

interface Declaration {
  readonly file: string;
  readonly name: string;
  readonly source: string;
  readonly flags: string;
}

const declarations = (): Declaration[] =>
  testSources(TEST_DIR).flatMap(path =>
    [...readFileSync(path, "utf8").matchAll(DECLARATION)].map(match => ({
      file: relative(TEST_DIR, path),
      name: match[1] ?? "",
      source: match[2] ?? "",
      flags: match[3] ?? "",
    })),
  );

describe("display-oracle copy census (wb-8bi)", () => {
  it("the declaration scanner reads the known widened copies (never vacuous)", () => {
    const files = declarations().map(found => found.file);
    for (const expected of [
      "workbench-sanitizer-corpus.test.ts",
      "workbench-execute.test.ts",
      "workbench-graph-view.test.ts",
      "workbench-forge-control.test.ts",
    ]) {
      expect(files, expected).toContain(expected);
    }
  });

  it("every suite-local oracle declaration equals the shared oracle, so no copy can lag a widening", () => {
    const shared = new RegExp(UNSAFE_DISPLAY.source, UNSAFE_DISPLAY.flags);
    const drifted = declarations()
      .filter(found => {
        const copy = new RegExp(found.source, found.flags);
        return copy.source !== shared.source || copy.flags !== shared.flags;
      })
      .map(found => `${found.file}: ${found.name} differs from test/helpers/unsafe-display.ts`);
    expect(drifted).toEqual([]);
  });

  it("every declaration accepts and refuses exactly the shared oracle's units", () => {
    const failures: string[] = [];
    for (const found of declarations()) {
      const copy = new RegExp(found.source, found.flags);
      for (const [name, code] of RQD_UNITS) if (!copy.test(cp(code))) failures.push(`${found.file}: ${found.name} accepts ${name}`);
      for (const [name, code] of RQD_NEIGHBOURS) if (copy.test(cp(code))) failures.push(`${found.file}: ${found.name} refuses ${name}`);
    }
    expect(failures).toEqual([]);
  });
});
