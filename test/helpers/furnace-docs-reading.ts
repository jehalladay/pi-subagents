/**
 * wb-aalz: reusable docs/09 sentence reader extracted from the unlanded wb-s876 census.
 * A bound rendered section is inspected by unit and refuses a claim whenever a second subject,
 * an unrecognised named reference or a control character reaches that unit. The parent can import
 * this helper after the child lands; it is not a production reader or an observer authority.
 */
import { docsSection, type RenderedBlock } from "./census.js";

const DOCS09_SECTION = "Experimental projection implementation";
const DOCS09_TITLE = `09 ${String.fromCodePoint(0x2014)} Observation, telemetry, provenance and derived graph`;
const sorted = (values: Iterable<string>): string[] => [...new Set(values)].sort();
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCodePoint(0xa0) };
/** The character a named reference decodes to, when its name (any case) is one of the six (own keys only, so &constructor; is none). */
function namedEntity(name: string): string | undefined {
  const key = name.toLowerCase();
  return Object.hasOwn(NAMED_ENTITIES, key) ? NAMED_ENTITIES[key] : undefined;
}
/**
 * The HTML standard's numeric character reference table (its numeric character reference end state; wb-s876 cut #3): a
 * reference to one of these C1 code points decodes to the Windows-1252 character beside it - &#146; and &#x92; to U+2019 -
 * and a reference to 0x81, 0x8D, 0x8F, 0x90 or 0x9D decodes to itself.
 */
const NUMERIC_REFERENCES: ReadonlyMap<number, number> = new Map([
  [0x80, 0x20ac],
  [0x82, 0x201a],
  [0x83, 0x192],
  [0x84, 0x201e],
  [0x85, 0x2026],
  [0x86, 0x2020],
  [0x87, 0x2021],
  [0x88, 0x2c6],
  [0x89, 0x2030],
  [0x8a, 0x160],
  [0x8b, 0x2039],
  [0x8c, 0x152],
  [0x8e, 0x17d],
  [0x91, 0x2018],
  [0x92, 0x2019],
  [0x93, 0x201c],
  [0x94, 0x201d],
  [0x95, 0x2022],
  [0x96, 0x2013],
  [0x97, 0x2014],
  [0x98, 0x2dc],
  [0x99, 0x2122],
  [0x9a, 0x161],
  [0x9b, 0x203a],
  [0x9c, 0x153],
  [0x9e, 0x17e],
  [0x9f, 0x178],
]);
/** The code point a numeric character reference decodes to under the HTML standard: 0, a surrogate and a code point above 0x10FFFF to U+FFFD, a code point of NUMERIC_REFERENCES to its character, any other to itself. */
function numericReference(code: number): number {
  if (code === 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return 0xfffd;
  return NUMERIC_REFERENCES.get(code) ?? code;
}
/** A markup text with each numeric character reference (spelled with its semicolon) replaced by what decode makes of its code point, and the six named entities (amp, lt, gt, quot, apos, nbsp) decoded. */
function decodedReferences(text: string, decode: (code: number, whole: string) => string): string {
  return text.replace(/&(?:#(\d+)|#x([0-9a-f]+)|(\w+));/gi, (whole, decimal: string | undefined, hex: string | undefined, name: string | undefined) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return decode(code, whole);
    return namedEntity(name ?? "") ?? whole;
  });
}
/** A markup file's text with its numeric character references decoded as the HTML standard decodes them (numericReference) and the six named entities decoded: the reading subjectText matches the subject words in. */
function decodedMarkup(text: string): string {
  return decodedReferences(text, code => String.fromCodePoint(numericReference(code)));
}
/**
 * A markup file's text with each numeric character reference decoded to its own code point - the landed census's reading,
 * and how XML and CommonMark read a reference into 0x80-0x9F (its C1 control) - one above 0x10FFFF left as written, and
 * the six named entities decoded (wb-s876 cut #3): THE JUDGE reads a mention in this reading as well as in decodedMarkup's,
 * and controlCharacters reads both, so neither reading narrows the other.
 */
function decodedCodePoints(text: string): string {
  return decodedReferences(text, (code, whole) => (code <= 0x10ffff ? String.fromCodePoint(code) : whole));
}
/** What the census reads of docs/09's Furnace sentences: the section binding, every subject word's blocks, every clause found, and the reads and verbs. */
export interface Docs09Reading {
  readonly binds: boolean;
  readonly why: string;
  readonly html: boolean;
  /** Each named character reference in the section's units that decodedMarkup does not decode, as written (wb-s876 U2). */
  readonly undecoded: readonly string[];
  /** Each control character in the section's units once their references are decoded either way - a bidi control or any other \p{Cc} code point but tab, line feed, form feed and carriage return - as U+XXXX (wb-s876 U2, cut #3). */
  readonly controls: readonly string[];
  /** For each subject word (DOCS09_SUBJECTS), the block kind of each of its occurrences in the section's text units (docs09Units; wb-s876 F1). */
  readonly subjects: { readonly [word: string]: readonly string[] };
  readonly readsClauses: readonly string[];
  readonly verbsClauses: readonly string[];
  readonly reads: readonly string[];
  readonly verbs: readonly string[];
}
const READS_SENTENCE = /The external Furnace reader uses explicit bounded (\S+) polling\./g;
const VERBS_SENTENCE = /Pi attachment is read-only and does not (.+?) a Run\./g;
/** The parent wb-s876 subject-word forms, including the documented readiness and reattachment over-reads. */
const DOCS09_SUBJECTS: Readonly<Record<string, RegExp>> = {
  "Furnace read": /furnace(?:['\u2019]s)?[^\p{L}\p{N}]*read/giu,
  poll: /poll/giu,
  attach: /attach/giu,
};
/** Decode references, fold compatibility characters, and remove format/default-ignorable characters before matching. */
function subjectText(text: string): string {
  return decodedMarkup(text)
    .normalize("NFKC")
    .replace(/[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu, "");
}
/** Any named reference outside the six known names refuses a claimed docs/09 reading. */
function undecodedReferences(text: string): string[] {
  return [...text.matchAll(/&(\w+);/g)].map(match => match[1] ?? "").filter(name => namedEntity(name) === undefined).map(name => `&${name};`);
}
/** Controls in either numeric-reference decoding (excluding structural whitespace) refuse a reading. */
function controlCharacters(text: string): string[] {
  const read = (decoded: string): string[] => [...decoded.matchAll(/(?![\t\n\f\r])[\p{Bidi_Control}\p{Cc}]/gu)].map(match => `U+${(match[0].codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`);
  return [...read(decodedMarkup(text)), ...read(decodedCodePoints(text))];
}
/** One rendered text unit of docs/09's bound section: its block kind and its text in the landed rendered view (wb-s876 F1). */
interface Docs09Unit {
  readonly kind: string;
  readonly text: string;
}
/**
 * One unit per top-level block (or top-level list item), using the shared rendered view.
 * Nested blockquotes recursively carry their lists and subsequent children after wb-aalz.
 */
function docs09Units(blocks: readonly RenderedBlock[]): Docs09Unit[] {
  return blocks.flatMap((block): Docs09Unit[] => {
    if (block.kind === "list") return block.items.map(item => ({ kind: "list item", text: item.text }));
    if (block.kind === "other") return [{ kind: block.type, text: block.text }];
    if (block.kind === "html") return [];
    return [{ kind: block.kind, text: block.text.replace(/\s+/g, " ").trim() }];
  });
}
/** The bounded docs/09 section is STATED only when its subject words occur once each in paragraphs,
 * its frames occur once each, and no unit contains unrecognised references or controls. */
export function docs09Reading(text: string): Docs09Reading {
  const section = docsSection(text, DOCS09_SECTION, 2, [DOCS09_TITLE]);
  const units = docs09Units(section.blocks);
  const subjects = Object.fromEntries(
    Object.entries(DOCS09_SUBJECTS).map(([word, pattern]) => [word, units.flatMap(unit => [...subjectText(unit.text).matchAll(pattern)].map(() => unit.kind))]),
  );
  const readsClauses = units.flatMap(unit => [...unit.text.matchAll(READS_SENTENCE)].map(match => match[1] ?? ""));
  const verbsClauses = units.flatMap(unit => [...unit.text.matchAll(VERBS_SENTENCE)].map(match => match[1] ?? ""));
  const undecoded = sorted(units.flatMap(unit => undecodedReferences(unit.text)));
  const controls = sorted(units.flatMap(unit => controlCharacters(unit.text)));
  const once = Object.values(subjects).every(kinds => kinds.length === 1 && kinds[0] === "paragraph");
  const stated = section.ok && !section.hasHtml && undecoded.length === 0 && controls.length === 0 && once && readsClauses.length === 1 && verbsClauses.length === 1;
  return {
    binds: section.ok,
    why: section.why,
    html: section.hasHtml,
    undecoded,
    controls,
    subjects,
    readsClauses,
    verbsClauses,
    reads: stated ? (readsClauses[0] ?? "").split("/") : [],
    verbs: stated ? (verbsClauses[0] ?? "").split(/, | or /) : [],
  };
}
