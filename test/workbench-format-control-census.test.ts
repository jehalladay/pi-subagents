/**
 * wb-rqd (owner-filed from the wb-69g.5 gate F2, the wb-952 gate's Cf-widening follow-up). Spec lines pinned, quoted from the
 * bead: "refuse U+FFF9..U+FFFB FAIL-CLOSED in identity admission AND treat them as unsafe units in display"; "WIDENING IS
 * TARGETED to format controls that hide or reorder adjacent text: FFF9-FFFB FIRST; the seat then CENSUSES the remaining
 * non-Default-Ignorable Cf (Arabic/Syriac number and abbreviation marks, Egyptian format controls) and refuses ONLY what
 * defeats a reader, with a FALSE-POSITIVE CENSUS over the 952 corpus and the fixture texts; NEVER blanket Cf (ZWJ/ZWNJ
 * sequences in legitimate text stay)". The measured shapes run through every census site in
 * test/workbench-sanitizer-corpus.test.ts (rows R1-R6, six acceptance units, and the corpus half of the false-positive census).
 *
 * The census, on the engine's own Unicode data. Of the format controls (General_Category Cf) that are not default-ignorable:
 * - REFUSED, the interlinear annotation anchor, separator and terminator (U+FFF9-U+FFFB) and the Egyptian hieroglyph format
 *   controls (U+13430-U+1343F): no glyph of their own, each a grapheme cluster of its own; a renderer that honours them moves
 *   the annotation off the line or stacks, inserts and overlays the signs beside them, and one that does not draws nothing,
 *   so a keyword one splits reads whole. They become unsafe units: refused in identity text, redacted across, never shown.
 * - KEPT, the prepended concatenation marks (Arabic number signs, ayah ends and currency marks, the Syriac abbreviation mark,
 *   the Kaithi number signs): drawn with a visible glyph over the digits after them, each joining the character after it into
 *   one grapheme cluster, so a keyword one splits still shows the mark inside it. They stay text: number and abbreviation
 *   text keeps them.
 * The default-ignorables, ZWJ and ZWNJ among them, keep the handling wb-952 gave them; none is in either list. The population
 * is pinned, so a format control a later Unicode version adds fails the census until it is classified here. Every assertion
 * names its code point or file and never prints a secret-bearing value; every control is built with String.fromCodePoint.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { decideExecute, EXECUTE_GRANT, type ExecuteDecision } from "../src/workbench/execute.js";
import { WORKFLOW_SCRIPT_SCHEMA_VERSION } from "../src/workbench/identity.js";
import { sanitizeWorkbenchJson, sanitizeWorkbenchText, stripUnsafeText } from "../src/workbench/redaction.js";

const cp = (code: number): string => String.fromCodePoint(code);
const named = (code: number): string => `U+${code.toString(16).toUpperCase().padStart(4, "0")}`;
const LAYOUTS = ["text", "label", "terminal", "lines"] as const;
/** Refused: the interlinear annotation anchor, separator and terminator, and the sixteen Egyptian hieroglyph format controls. */
const REFUSED: readonly number[] = [0xfff9, 0xfffa, 0xfffb, ...Array.from({ length: 16 }, (_, at) => 0x13430 + at)];
/** Kept: the prepended concatenation marks (Arabic number signs, ayah ends and currency marks, the Syriac abbreviation mark, the Kaithi number signs). */
const KEPT: readonly number[] = [0x600, 0x601, 0x602, 0x603, 0x604, 0x605, 0x6dd, 0x70f, 0x890, 0x891, 0x8e2, 0x110bd, 0x110cd];
const FORMAT = /\p{Cf}/u;
const IGNORABLE = /\p{Default_Ignorable_Code_Point}/u;

const definition = { kind: "script" as const, id: "review.js", schemaVersion: WORKFLOW_SCRIPT_SCHEMA_VERSION, artifactDigest: `sha256:${"e".repeat(64)}` };
const decide = (id: string, invocationId = "inv-rqd"): ExecuteDecision =>
  decideExecute({ definitionRef: { ...definition, id }, input: { topic: "identity" }, hostMode: "embedded" }, { grants: [EXECUTE_GRANT], invocationId });

const ROOT = fileURLToPath(new URL("..", import.meta.url));
/** The fixture texts: the fixture tree, the recorded live receipts and the shipped examples. */
const FIXTURE_ROOTS = ["test/fixtures", "qa/workbench/receipts", "examples"] as const;
const filesUnder = (dir: string): string[] =>
  readdirSync(dir)
    .sort()
    .flatMap(name => (statSync(join(dir, name)).isDirectory() ? filesUnder(join(dir, name)) : [join(dir, name)]));

describe("wb-rqd census: the format controls that defeat a reader are unsafe units; the prepended concatenation marks are not", () => {
  it("the engine's format controls that are not default-ignorable are exactly the refused and the kept, each named", () => {
    const population: string[] = [];
    for (let code = 0; code <= 0x10ffff; code += 1) {
      if (code >= 0xd800 && code <= 0xdfff) continue;
      const unit = cp(code);
      if (FORMAT.test(unit) && !IGNORABLE.test(unit)) population.push(named(code));
    }
    expect(population).toEqual([...REFUSED, ...KEPT].sort((a, b) => a - b).map(named));
  });

  it("each refused control is a grapheme cluster of its own, and each kept mark joins the character after it", () => {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const clusters = (code: number): string[] => [...segmenter.segment(`a${cp(code)}b`)].map(part => part.segment);
    expect(REFUSED.filter(code => clusters(code).length !== 3).map(named)).toEqual([]);
    expect(KEPT.filter(code => clusters(code).join("|") !== `a|${cp(code)}b`).map(named)).toEqual([]);
  });

  it("every refused control is an unsafe unit: stripped whole, an invisible gap in every layout, and it splits no keyword, prefix, scheme or secret field", () => {
    const failures: string[] = [];
    for (const code of REFUSED) {
      const unit = cp(code);
      if (stripUnsafeText(`a${unit}b`) !== "ab" || stripUnsafeText(`a${unit}b`, " ") !== "a b") failures.push(`${named(code)}: not one unsafe unit`);
      // An invisible gap: it vanishes in every layout, as a zero-width character does, and never displays as a space.
      for (const layout of LAYOUTS) if (sanitizeWorkbenchText(`a${unit}b`, 2000, layout) !== "ab") failures.push(`${named(code)} (${layout}): not rendered as an invisible`);
      const shapes = [`pass${unit}word=RQDSECRET`, `Authorization: Bea${unit}rer RQDSECRET`, `see gh${unit}p_RQDSECRET`, `key${unit}sk-ant-RQDSECRET`];
      for (const shape of shapes) {
        for (const layout of LAYOUTS) {
          const shown = sanitizeWorkbenchText(shape, 2000, layout);
          if (shown.includes("RQDSECRET")) failures.push(`${named(code)} (${layout}): leaked`);
          if (shown.includes(unit)) failures.push(`${named(code)} (${layout}): kept`);
        }
      }
      if (JSON.stringify(sanitizeWorkbenchJson({ [`pass${unit}word`]: "RQDOPAQUE" })).includes("RQDOPAQUE")) failures.push(`${named(code)}: secret field missed`);
    }
    expect([...new Set(failures)]).toEqual([]);
  });

  it("fail-closed identity admission: execute refuses identity text holding a refused control, typed and never deleting it", () => {
    expect(decide("review.js").decision).toBe("admitted");
    const failures: string[] = [];
    for (const code of REFUSED) {
      const byId = decide(`review${cp(code)}.js`);
      if (byId.decision !== "refused" || byId.policy !== "malformed-request") failures.push(`${named(code)}: definition id admitted`);
      const byInvocation = decide("review.js", `inv${cp(code)}rqd`);
      if (byInvocation.decision !== "refused" || byInvocation.invocationId !== undefined) failures.push(`${named(code)}: invocation reference admitted`);
    }
    expect(failures).toEqual([]);
  });

  it("no false positive on a kept mark: number and abbreviation text keeps it, displayed and admitted as it is (never blanket Cf)", () => {
    const failures: string[] = [];
    for (const code of KEPT) {
      // The mark before the digits it spans, as a year or a page number is written.
      const text = `${cp(code)}2026`;
      if (stripUnsafeText(text) !== text) failures.push(`${named(code)}: stripped`);
      for (const layout of LAYOUTS) if (sanitizeWorkbenchText(text, 2000, layout) !== text) failures.push(`${named(code)} (${layout}): changed`);
      if (decide(`sura${text}.js`).decision !== "admitted") failures.push(`${named(code)}: identity refused`);
    }
    expect(failures).toEqual([]);
  });

  // Owner ruling R1 = ALT (23:52Z): the refused class has EXACT edges. The four range neighbours are pinned by their own rows, so a
  // widening of either edge by one code point reddens a row and not only a census count.
  const NEIGHBOURS: readonly { readonly code: number; readonly side: string }[] = [
    { code: 0xfffc, side: "after FFF9-FFFB (OBJECT REPLACEMENT CHARACTER)" },
    { code: 0x1342f, side: "before 13430-1343F" },
    { code: 0x13440, side: "after 13430-1343F" },
  ];
  for (const { code, side } of NEIGHBOURS) {
    it(`range neighbour ${named(code)} (${side}) stays text: admitted in identity, unchanged in every display layout`, () => {
      const text = `a${cp(code)}b`;
      const failures: string[] = [];
      if (REFUSED.includes(code)) failures.push("in the refused list");
      if (stripUnsafeText(text) !== text) failures.push("stripped");
      for (const layout of LAYOUTS) if (sanitizeWorkbenchText(text, 2000, layout) !== text) failures.push(`${layout}: changed`);
      if (decide(`review${cp(code)}.js`).decision !== "admitted") failures.push("definition id refused");
      if (decide("review.js", `inv${cp(code)}rqd`).decision !== "admitted") failures.push("invocation reference refused");
      expect(failures).toEqual([]);
    });
  }

  // wb-19q member 21 (wb-rqd F1): table liveness. Hollowed to [], the census registers 7 of 10 cases with exit 0.
  it("the NEIGHBOURS table itself registers all three range-neighbour rows", () => expect(NEIGHBOURS).toHaveLength(3));

  it(`range neighbour ${named(0xfff8)} (before FFF9-FFFB) is a default-ignorable that wb-952 already refuses: stripped whole, unrelated to this class's edge`, () => {
    const text = `a${cp(0xfff8)}b`;
    expect(IGNORABLE.test(cp(0xfff8))).toBe(true);
    expect(REFUSED.includes(0xfff8)).toBe(false);
    expect(stripUnsafeText(text)).toBe("ab");
    expect(decide(`review${cp(0xfff8)}.js`).decision).toBe("refused");
  });

  it("false-positive census over the fixture texts: none holds a refused control or a kept mark, so the widening changes none", () => {
    const refused = new Set(REFUSED);
    const kept = new Set(KEPT);
    const holds = (text: string, codes: ReadonlySet<number>): boolean => [...text].some(unit => codes.has(unit.codePointAt(0) ?? -1));
    // The fixture texts, and the corpus file whose site drivers hold the fixture text every probe is displayed beside.
    const files = [...FIXTURE_ROOTS.flatMap(root => filesUnder(join(ROOT, root))), join(ROOT, "test/workbench-sanitizer-corpus.test.ts")];
    // A file holding a NUL byte is binary, not text, and is not read as text.
    const texts = files.map(file => ({ file, bytes: readFileSync(file) })).filter(({ bytes }) => !bytes.includes(0));
    expect(texts.length).toBeGreaterThan(30);
    const hits = texts.filter(({ bytes }) => holds(bytes.toString("utf8"), refused) || holds(bytes.toString("utf8"), kept));
    expect(hits.map(({ file }) => relative(ROOT, file))).toEqual([]);
  });
});
