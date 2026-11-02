/**
 * wb-4f0q (R694 follow-up of wb-noq8 landing 728, F1 LOW LEADS): the two texts that describe the HX adapter's conflict-code
 * reading say what CONFLICT_CODE reads, not "a whole segment". The finding, verbatim: "the 'whole segment' wording that refusal
 * #1's U1 cured in G8 survives in two texts describing the adapter's conflict-code reading; align both with G8's pinned reading (a
 * capital A-Z or a digit glues; every other character and a code end bound)." The two texts: the CONFLICT_CODE doc comment in
 * src/workbench/hyperunix-observer.ts (landed by wb-gwr.2) and the shape list of the R-RELAYED-SHAPE residual family in the
 * header of test/workbench-hx-planner-fallback-census.test.ts (landed by wb-noq8).
 *
 * THE PINNED SET, this file's nine cases. Every check reads the two files' own bytes (the adapter's TypeScript AST for the pattern
 * and its doc comment, the census's header comment for the shape list); the LANDED_* constants are copies only for the plants.
 *  W1 the anchor, outside both texts: CONFLICT_CODE, the adapter's one file-scope const of that name, is a regular expression
 *     literal of one shape - a negated character class before CONFLICT with a code start as its other alternative, the same class
 *     after it with a code end as its other alternative, and no flags - whose class holds ranges only. Its ranges read A-Z and 0-9,
 *     and READING is composed from them in order, each through its noun in GLUE_NOUNS (a range with no noun refuses), then
 *     "glues;" and BOUND_WORDS: "a capital A-Z or a digit 0-9 glues; every other character and a code end bound". The pattern
 *     compiled from the literal is swept over all 65536 UTF-16 code units, each as the one unit before a bare CONFLICT and as the one
 *     unit after it, and over CONFLICT alone: a unit inside a range glues (no match), and every other unit and a code end bound (a
 *     match).
 *  W2 the CONFLICT_CODE doc comment (the JSDoc block that leads that const's statement, with only white space between them) holds
 *     READING and never spells "segment", in any case.
 *  W3 the R-RELAYED-SHAPE shape list (in the census header, the census's first JSDoc block: the first parenthetical after the
 *     family's provenance parenthetical "(wb-noq8, ...)", nested parentheses balanced) holds READING and never spells "segment",
 *     in any case.
 *  Liveness controls, each planted over the file's own bytes at the offsets the reading gives: W4 wb-gwr.2's landed doc comment
 *  (byte for byte) reads red on both checks and leaves the pattern's reading unchanged; W5 wb-noq8's landed shape list (byte for
 *  byte) reads red on both checks; W6 READING followed by ", as a whole segment", planted in either text, reads red on "segment"
 *  alone; W7 the pattern planted with the class [^A-Za-z0-9] composes no reading (no noun for a-z), and with the class [^A-Z]
 *  composes "a capital A-Z glues; every other character and a code end bound", which the sweep reads true of that pattern and which
 *  neither text holds, so both texts are held to the pattern's ranges; W8 the sweep judged against the range A-Z alone misreads
 *  exactly the ten units 0-9, a pattern that reads only the unit before CONFLICT and one that reads only the unit after it each
 *  misread exactly the 36 glue units, and a pattern with no code-start or code-end alternative reads a bare CONFLICT as no conflict
 *  and misreads every one of the 65500 other units, so the sweep reads the pattern on both sides and at both code ends rather than
 *  the ranges it is handed; W9 each refusal of the two readings fires on its plant: CONFLICT_CODE declared twice at file scope, an
 *  initializer that is not a regular expression literal, a literal of another shape, two different classes, a flag, a class member
 *  that is not a range, a line comment between the doc comment and the const, and a census header whose R-RELAYED-SHAPE has no
 *  provenance parenthetical.
 *
 * NOT CLAIMED: the texts' other sentences and their grammar (a negated, conditional or contradicting sentence beside READING that
 * never spells "segment" reads green); READING in any other spelling (it is matched byte for byte once white space collapses, so a
 * re-capitalized or re-punctuated reading reads red, fail-closed); G8's title and the observer test's header, which already read
 * wider and which this file does not read; every other text that describes the reading; and the pattern's case reading and its
 * one-bounded-CONFLICT-anywhere reading, which G8 pins through the adapter (W1 pins no flags and READING names no case).
 *
 * Display paths added: none. Test-only: it spawns nothing and writes nothing; it reads the adapter source and the census source.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
/** The adapter whose CONFLICT_CODE pattern and doc comment this file reads. */
const OBSERVER = "src/workbench/hyperunix-observer.ts";
/** The census whose R-RELAYED-SHAPE shape list this file reads. */
const CENSUS = "test/workbench-hx-planner-fallback-census.test.ts";
/** The noun each glue range of CONFLICT_CODE's class is worded with in READING. */
const GLUE_NOUNS: Readonly<Record<string, string>> = { "A-Z": "a capital A-Z", "0-9": "a digit 0-9" };
/** What READING says bounds CONFLICT besides the glue ranges: every unit outside them, and the pattern's code start and end. */
const BOUND_WORDS = "every other character and a code end bound";
/** READING as W1 composes it from the pattern's ranges at this cut. */
const READING = "a capital A-Z or a digit 0-9 glues; every other character and a code end bound";
/** The wording F1 names, in any case. */
const SEGMENT = /segment/i;
/** CONFLICT_CODE's one literal shape: a negated class and a code start before CONFLICT, a negated class and a code end after it. */
const PATTERN_SHAPE = /^\/\(\?:\^\|\[\^([^\]\\]+)\]\)CONFLICT\(\?:\[\^([^\]\\]+)\]\|\$\)\/([a-z]*)$/;
/** The family's name, then its provenance parenthetical (a comment line break may sit between them). */
const FAMILY_START = /R-RELAYED-SHAPE(?:\s|\*)*(?=\(wb-noq8\b)/g;
/** The CONFLICT_CODE doc comment as wb-gwr.2 landed it (:305-306 at trunk f63d389, blob 0cf6ff47), byte for byte. */
const LANDED_DOC = [
  "/** A producer diagnostic is a conflict status when its code names CONFLICT as a whole segment, as HX's registry spells conflicts",
  " * (HX-SCHEMA-CONFLICT, HX-CONTENT-EDIT-ORIGIN-CONFLICT). */",
].join("\n");
/** The R-RELAYED-SHAPE shape list as wb-noq8 landed it (:88 at trunk f63d389), byte for byte. */
const LANDED_SHAPES = "(a string view, a diagnostic code naming CONFLICT as a whole segment, an incomplete region with a string scope and target)";
/** W6: READING, then the wording F1 names. */
const SEGMENT_DOC = `/** A producer diagnostic is a conflict status when ${READING}, as a whole segment. */`;
const SEGMENT_SHAPES = `(a diagnostic code naming CONFLICT bounded on both sides (${READING}), as a whole segment)`;
/** W7: the pattern with a-z added to its class on both sides, and with 0-9 taken out of it on both sides. */
const LOWER_GLUE_PATTERN = "/(?:^|[^A-Za-z0-9])CONFLICT(?:[^A-Za-z0-9]|$)/";
const CAPITAL_GLUE_PATTERN = "/(?:^|[^A-Z])CONFLICT(?:[^A-Z]|$)/";
const DIGITS = Array.from({ length: 10 }, (_, index) => 0x30 + index);
/** W8: the 36 units the ranges A-Z and 0-9 hold, in code-unit order. */
const GLUE_UNITS = [...DIGITS, ...Array.from({ length: 26 }, (_, index) => 0x41 + index)];
/** W8: a pattern that reads only the unit before CONFLICT, one that reads only the unit after it, and one with no code ends. */
const BEFORE_ONLY_PATTERN = "/(?:^|[^A-Z0-9])CONFLICT/";
const AFTER_ONLY_PATTERN = "/CONFLICT(?:[^A-Z0-9]|$)/";
const NO_ENDS_PATTERN = "/[^A-Z0-9]CONFLICT[^A-Z0-9]/";
/** W9: one plant per refusal of the adapter reading, each with the refusal it must raise. */
const PATTERN_REFUSALS: readonly (readonly [string, string])[] = [
  ['new RegExp("(?:^|[^A-Z0-9])CONFLICT(?:[^A-Z0-9]|$)")', "must be a regular expression literal"],
  [BEFORE_ONLY_PATTERN, "must read a negated class and a code start before CONFLICT"],
  ["/(?:^|[^A-Z0-9])CONFLICT(?:[^A-Z]|$)/", "two classes must be the same"],
  ["/(?:^|[^A-Z0-9])CONFLICT(?:[^A-Z0-9]|$)/u", "must carry no flags"],
  ["/(?:^|[^A-Z0-9_])CONFLICT(?:[^A-Z0-9_]|$)/", "must hold ranges only"],
];

type Span = readonly [number, number];

interface PatternReading {
  /** The literal as written. */
  readonly literal: string;
  /** Its class's ranges, in order. */
  readonly ranges: readonly string[];
  /** READING, composed from the ranges. */
  readonly reading: string;
  /** Where the literal sits in the adapter text. */
  readonly span: Span;
}

interface ObserverReading {
  readonly pattern: PatternReading;
  /** The doc comment's words. */
  readonly doc: string;
  /** Where the doc comment sits in the adapter text. */
  readonly docSpan: Span;
}

interface ShapeListReading {
  /** The shape list's words. */
  readonly shapes: string;
  /** Where the shape list sits in the census text. */
  readonly span: Span;
}

interface TextJudgement {
  /** The text holds the reading, byte for byte once white space collapses. */
  readonly reading: boolean;
  /** The text spells "segment", in any case. */
  readonly segment: boolean;
}

interface SweepReading {
  /** The code units swept, each on both sides of CONFLICT. */
  readonly units: number;
  /** The units the compiled pattern reads otherwise than the ranges say. */
  readonly misread: readonly number[];
  /** Whether the compiled pattern reads a bare CONFLICT, both sides a code end, as a conflict. */
  readonly bare: boolean;
}

/** A comment span's words: the JSDoc delimiters and each line's leading white space and star removed, white space collapsed. */
const prose = (raw: string): string =>
  raw
    .replace(/^\/\*\*/, "")
    .replace(/\*\/$/, "")
    .split("\n")
    .map(line => line.replace(/^\s*\*?\s?/, ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const judge = (words: string, reading: string): TextJudgement => ({ reading: words.includes(reading), segment: SEGMENT.test(words) });

const splice = (text: string, [start, end]: Span, replacement: string): string => `${text.slice(0, start)}${replacement}${text.slice(end)}`;

/** READING from a class's ranges: each range's noun in order, then "glues;" and what bounds. */
function composeReading(ranges: readonly string[]): string {
  const nouns = ranges.map(range => {
    const noun = GLUE_NOUNS[range];
    if (noun === undefined) throw new Error(`${OBSERVER}: CONFLICT_CODE's glue range ${range} has no noun in GLUE_NOUNS, so no reading is composed`);
    return noun;
  });
  return `${nouns.join(" or ")} glues; ${BOUND_WORDS}`;
}

/** The adapter's CONFLICT_CODE pattern, the reading composed from it, and its doc comment. */
function readObserver(text: string): ObserverReading {
  const source = ts.createSourceFile(OBSERVER, text, ts.ScriptTarget.Latest, true);
  const found = source.statements.flatMap(statement =>
    ts.isVariableStatement(statement)
      ? statement.declarationList.declarations
          .filter(declaration => ts.isIdentifier(declaration.name) && declaration.name.text === "CONFLICT_CODE")
          .map(declaration => ({ statement, declaration }))
      : [],
  );
  const only = found.length === 1 ? found[0] : undefined;
  if (only === undefined) throw new Error(`${OBSERVER} must declare CONFLICT_CODE once at file scope; it declares it ${found.length} times`);
  const { statement, declaration } = only;
  const initializer = declaration.initializer;
  if (initializer === undefined || initializer.kind !== ts.SyntaxKind.RegularExpressionLiteral) {
    throw new Error(`${OBSERVER}: CONFLICT_CODE must be a regular expression literal`);
  }
  const literal = initializer.getText(source);
  const shape = PATTERN_SHAPE.exec(literal);
  if (shape === null) throw new Error(`${OBSERVER}: CONFLICT_CODE must read a negated class and a code start before CONFLICT and after it a negated class and a code end; it reads ${literal}`);
  const [, before = "", after = "", flags = ""] = shape;
  if (before !== after) throw new Error(`${OBSERVER}: CONFLICT_CODE's two classes must be the same; they read [^${before}] and [^${after}]`);
  if (flags !== "") throw new Error(`${OBSERVER}: CONFLICT_CODE must carry no flags; it carries ${flags}`);
  const ranges = before.match(/[^-]-[^-]/g) ?? [];
  if (ranges.join("") !== before) throw new Error(`${OBSERVER}: CONFLICT_CODE's class [^${before}] must hold ranges only`);
  const docs = (ts.getLeadingCommentRanges(text, statement.getFullStart()) ?? []).filter(range => text.startsWith("/**", range.pos));
  const doc = docs.at(-1);
  if (doc === undefined || text.slice(doc.end, statement.getStart(source)).trim() !== "") {
    throw new Error(`${OBSERVER}: CONFLICT_CODE's statement must be led by its JSDoc block`);
  }
  return {
    pattern: { literal, ranges, reading: composeReading(ranges), span: [initializer.getStart(source), initializer.getEnd()] },
    doc: prose(text.slice(doc.pos, doc.end)),
    docSpan: [doc.pos, doc.end],
  };
}

/** The offset just past the parenthesis that closes the one opening at `open`. */
function closing(text: string, open: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    if (text[index] === "(") depth++;
    else if (text[index] === ")" && --depth === 0) return index + 1;
  }
  throw new Error(`${CENSUS}: the parenthetical opened at offset ${open} of its header never closes`);
}

/** The R-RELAYED-SHAPE shape list in the census header: the first parenthetical after the family's provenance parenthetical. */
function readShapeList(text: string): ShapeListReading {
  const source = ts.createSourceFile(CENSUS, text, ts.ScriptTarget.Latest, true);
  const first = source.statements[0];
  if (first === undefined) throw new Error(`${CENSUS} holds no statement`);
  const header = (ts.getLeadingCommentRanges(text, first.getFullStart()) ?? []).find(range => text.startsWith("/**", range.pos));
  if (header === undefined) throw new Error(`${CENSUS} has no header JSDoc block`);
  const raw = text.slice(header.pos, header.end);
  const starts = [...raw.matchAll(FAMILY_START)];
  const start = starts.length === 1 ? starts[0] : undefined;
  if (start === undefined || start.index === undefined) {
    throw new Error(`${CENSUS}'s header must define R-RELAYED-SHAPE once, its name then its provenance parenthetical; it does ${starts.length} times`);
  }
  const provenanceEnd = closing(raw, start.index + start[0].length);
  const open = raw.indexOf("(", provenanceEnd);
  if (open === -1) throw new Error(`${CENSUS}: R-RELAYED-SHAPE has no shape list after its provenance parenthetical`);
  const close = closing(raw, open);
  return { shapes: prose(raw.slice(open, close)), span: [header.pos + open, header.pos + close] };
}

/** The pattern compiled from the literal, read on each UTF-16 code unit beside a bare CONFLICT against the ranges it is handed. */
function sweep(literal: string, ranges: readonly string[]): SweepReading {
  const slash = literal.lastIndexOf("/");
  const compiled = new RegExp(literal.slice(1, slash), literal.slice(slash + 1));
  const limits = ranges.map(range => [range.charCodeAt(0), range.charCodeAt(2)] as const);
  const glues = (unit: number): boolean => limits.some(([low, high]) => unit >= low && unit <= high);
  const misread: number[] = [];
  let units = 0;
  for (let unit = 0; unit <= 0xffff; unit++) {
    const character = String.fromCharCode(unit);
    const bound = !glues(unit);
    if (compiled.test(`${character}CONFLICT`) !== bound || compiled.test(`CONFLICT${character}`) !== bound) misread.push(unit);
    units++;
  }
  return { units, misread, bare: compiled.test("CONFLICT") };
}

const observerText = (): string => readFileSync(join(ROOT, OBSERVER), "utf8");
const censusText = (): string => readFileSync(join(ROOT, CENSUS), "utf8");

describe("wb-4f0q: the two texts that describe the HX adapter's conflict-code reading say what CONFLICT_CODE reads", () => {
  it("W1 the anchor: CONFLICT_CODE is one regular expression literal (the same negated class of ranges before and after CONFLICT, a code start and a code end as the other alternatives, no flags) whose ranges A-Z and 0-9 compose READING, and the compiled pattern reads each of the 65536 UTF-16 code units before and after a bare CONFLICT, and CONFLICT alone, as READING says", () => {
    const { pattern } = readObserver(observerText());
    expect({ ranges: pattern.ranges, reading: pattern.reading }).toStrictEqual({ ranges: ["A-Z", "0-9"], reading: READING });
    expect(sweep(pattern.literal, pattern.ranges)).toStrictEqual({ units: 0x10000, misread: [], bare: true });
  });

  it("W2 the CONFLICT_CODE doc comment holds READING and never spells segment", () => {
    const reading = readObserver(observerText());
    expect(judge(reading.doc, reading.pattern.reading), `the doc comment: ${reading.doc}`).toStrictEqual({ reading: true, segment: false });
  });

  it("W3 the census header's R-RELAYED-SHAPE shape list holds READING and never spells segment", () => {
    const { shapes } = readShapeList(censusText());
    const { pattern } = readObserver(observerText());
    expect(judge(shapes, pattern.reading), `the shape list: ${shapes}`).toStrictEqual({ reading: true, segment: false });
  });

  it("W4 liveness: wb-gwr.2's landed doc comment, planted back over the adapter's own bytes, reads red on both checks and leaves the pattern's reading unchanged", () => {
    const text = observerText();
    const reading = readObserver(text);
    const planted = readObserver(splice(text, reading.docSpan, LANDED_DOC));
    expect(planted.doc).toBe(prose(LANDED_DOC));
    expect(planted.pattern.reading).toBe(reading.pattern.reading);
    expect(judge(planted.doc, planted.pattern.reading)).toStrictEqual({ reading: false, segment: true });
  });

  it("W5 liveness: wb-noq8's landed shape list, planted back over the census's own bytes, reads red on both checks", () => {
    const text = censusText();
    const planted = readShapeList(splice(text, readShapeList(text).span, LANDED_SHAPES));
    expect(planted.shapes).toBe(LANDED_SHAPES);
    expect(judge(planted.shapes, readObserver(observerText()).pattern.reading)).toStrictEqual({ reading: false, segment: true });
  });

  it("W6 liveness: READING followed by 'as a whole segment', planted in either text, reads red on segment alone", () => {
    const adapter = observerText();
    const census = censusText();
    const doc = readObserver(splice(adapter, readObserver(adapter).docSpan, SEGMENT_DOC));
    const shapes = readShapeList(splice(census, readShapeList(census).span, SEGMENT_SHAPES));
    expect(judge(doc.doc, doc.pattern.reading)).toStrictEqual({ reading: true, segment: true });
    expect(judge(shapes.shapes, doc.pattern.reading)).toStrictEqual({ reading: true, segment: true });
  });

  it("W7 liveness: the pattern planted with the class [^A-Za-z0-9] composes no reading, and with the class [^A-Z] composes a reading the sweep reads true of it and neither text holds", () => {
    const text = observerText();
    const { pattern, doc } = readObserver(text);
    expect(() => readObserver(splice(text, pattern.span, LOWER_GLUE_PATTERN))).toThrow("glue range a-z has no noun");
    const capital = readObserver(splice(text, pattern.span, CAPITAL_GLUE_PATTERN)).pattern;
    expect({ ranges: capital.ranges, reading: capital.reading }).toStrictEqual({
      ranges: ["A-Z"],
      reading: "a capital A-Z glues; every other character and a code end bound",
    });
    expect(sweep(capital.literal, capital.ranges)).toStrictEqual({ units: 0x10000, misread: [], bare: true });
    expect([judge(doc, capital.reading).reading, judge(readShapeList(censusText()).shapes, capital.reading).reading]).toEqual([false, false]);
  });

  it("W8 liveness: the sweep reads the pattern, not the ranges it is handed - judged against A-Z alone it misreads exactly the ten units 0-9, a pattern reading only one side of CONFLICT misreads exactly the 36 glue units on the other, and a pattern with no code ends misreads a bare CONFLICT and the 65500 other units", () => {
    const { pattern } = readObserver(observerText());
    expect(sweep(pattern.literal, ["A-Z"])).toStrictEqual({ units: 0x10000, misread: DIGITS, bare: true });
    expect(sweep(BEFORE_ONLY_PATTERN, pattern.ranges)).toStrictEqual({ units: 0x10000, misread: GLUE_UNITS, bare: true });
    expect(sweep(AFTER_ONLY_PATTERN, pattern.ranges)).toStrictEqual({ units: 0x10000, misread: GLUE_UNITS, bare: true });
    const noEnds = sweep(NO_ENDS_PATTERN, pattern.ranges);
    expect({ units: noEnds.units, misread: noEnds.misread.length, glueMisread: noEnds.misread.filter(unit => GLUE_UNITS.includes(unit)), bare: noEnds.bare }).toStrictEqual({
      units: 0x10000,
      misread: 0x10000 - GLUE_UNITS.length,
      glueMisread: [],
      bare: false,
    });
  });

  it("W9 liveness: each refusal of the two readings fires on its plant (a second file-scope CONFLICT_CODE, a non-literal, another shape, two classes, a flag, a non-range class member, a line comment between doc and const, a census header without the family's provenance parenthetical)", () => {
    const adapter = observerText();
    const { pattern, docSpan } = readObserver(adapter);
    expect(() => readObserver(splice(adapter, [docSpan[0], docSpan[0]], "const CONFLICT_CODE = /CONFLICT/;\n"))).toThrow("it declares it 2 times");
    for (const [plant, refusal] of PATTERN_REFUSALS) expect(() => readObserver(splice(adapter, pattern.span, plant)), plant).toThrow(refusal);
    expect(() => readObserver(splice(adapter, [docSpan[1], docSpan[1]], "\n// a planted line comment"))).toThrow("must be led by its JSDoc block");
    const census = censusText();
    const unnamed = census.replace("R-RELAYED-SHAPE (wb-noq8,", "R-RELAYED-SHAPE (noq8,");
    expect(unnamed).not.toBe(census);
    expect(() => readShapeList(unnamed)).toThrow("it does 0 times");
  });
});
