/**
 * wb-tl5p ([MII P07+], program mechanical-interop-integrity-2026-11-10): EAT-R437 criterion 3, the V0 docs/skill census ONLY.
 * Criterion 3 (the vendored block, test/fixtures/mii-strict-attainability-requirement.json, master a1870c0c, read-only git
 * cat-file): "A docs/skill census asserts the strict clause is accompanied by `attainability: undetermined` text until
 * criterion 1 is met (reusing the frozen-shape census pattern of test/workbench-mwi-docs-remediation-census.test.ts without
 * editing its pinned rows)." The Statement names the surfaces ("Before any receipt, W11 row, skill or docs text asserts that the
 * first release's \"strict native Forge gate\" is achievable", and "every surface MUST describe strict-native attainability as
 * `undetermined`"); the V-tier line reads "the census at V0". This census is that V0 leg and claims exactly the pinned reader set
 * below.
 *
 * MEASURED at base ce180d82 (read-only, by the cutting seat ws-08 of g10-work-s337, 2026-11-11): the surface holds 114 tracked
 * Markdown pages, over which THE READING reads 15565 sentences; no page spells a strict clause as THE READING reads one, no page
 * spells "attainability", and no page holds a letter outside ASCII after NFKD and mark removal. The census therefore reads zero findings at the base: it guards the surface
 * for the first page that spells the clause, and the plants of R437-C3b are its positive controls in this same file.
 *
 * THE SURFACE. PAGES are every Markdown path (*.md) `git ls-files` lists outside the four EXCLUDED prefixes: test/ (test inputs),
 * vendor/ (vendored third-party packages), new-feedback/ (agent findings about the tools, routed upstream) and .beads/ (the
 * tracker's directory). The set is read at run time and never frozen, so a page that lands later (every receipt cut adds one) is
 * read when it lands. ANCHORS name one page for each surface the Statement lists, in its order.
 *
 * THE READING. A page splits into lines; a line holding only white space ends a block. Inside a block a line opens a new ITEM when,
 * after any indentation, it starts with "|", "#", ">", a fence ("```" or "~~~") or a list marker ("-", "*" or "+", or one to nine
 * digits then "." or ")", then a space or a tab); any other line continues the item above it. fold() reads an item's lines joined
 * by one space: numeric character references and the NAMED_REFERENCES decoded; NFKD, with combining marks (General_Category M) and
 * format code points (Cf) dropped; HTML element tags (<name ...>, </name>) dropped; inline link and reference-link destinations
 * ("](...)", "][...]") dropped; the characters [ ] * ~ ` and backslash dropped; "_", the dashes U+2010..U+2015 and U+2212 read as
 * "-"; each run of white space read as one space; letters lower-cased. A folded item splits into SENTENCES after ".", "!" or "?"
 * followed by a space. A STRICT CLAUSE is a match of STRICT in a sentence: the word strict, any run of spaces and hyphens (none
 * included), then the word native. It is QUALIFIED when its own sentence holds QUALIFIER (attainability, an optional space, a
 * colon, an optional space, undetermined). Every unqualified strict clause is one finding "<page>:<line> <sentence>", where line
 * is the first line of the clause's item.
 *
 * PINNED READER SET (this file; each case by its id; each observed green at base ce180d82 with this cut):
 * - R437-C1 A docs/skill census: PAGES are the Markdown paths git ls-files lists outside EXCLUDED, read at run time; they hold each ANCHORS page (one per surface the Statement lists: receipt, W11 row, skill, docs text) and at least SURFACE_FLOOR pages.
 *   Cases: R437-C1a (the derivation: PAGES equal the tracked .md paths minus exactly those under EXCLUDED, and no EXCLUDED
 *   prefix covers an ANCHORS page), R437-C1b (each ANCHORS page is in PAGES, is the surface it names - a receipt under
 *   docs/workbench/receipts/, the page holding the "## W11:" heading, a SKILL.md under .agents/skills/, the root README.md - and
 *   reads at least one sentence; PAGES hold at least SURFACE_FLOOR pages). Falsifier: an EXCLUDED prefix that swallows a
 *   surface, a walker that returns fewer pages, or an anchor that is not its surface.
 * - R437-C2 asserts the strict clause: STRICT and QUALIFIER are the Statement's strict-native spellings and criterion 3's qualifier, read from the vendored block whose SHA-256 is pinned, and fold() reads each FOLD_FORMS spelling as the plain clause.
 *   Cases: R437-C2a (the vendored block and both matrix rows hash to their pinned SHA-256; the Statement's quoted "strict native
 *   Forge gate" and its strict-native word each read as one strict clause; criterion 3's backticked qualifier reads as QUALIFIER;
 *   the Statement's surface list equals the ANCHORS surfaces; Matrix B lists G-CENSUS), R437-C2b (each FOLD_FORMS spelling folds
 *   to its plain form and reads as one strict clause). Falsifier: STRICT or QUALIFIER edited away from the vendored words, or one
 *   fold step removed.
 * - R437-C3 is accompanied by `attainability: undetermined` text: no page holds an unqualified strict clause at the base, and each STRICT_PLANTS text added as a new last block to any page adds exactly the findings its row names.
 *   Cases: R437-C3a (every page of PAGES reads no finding at the base, over at least SENTENCE_FLOOR sentences), R437-C3b (each STRICT_PLANTS text, and each line of the
 *   vendored block that spells the clause, added as a new last block to every page adds exactly its findings: one per
 *   unqualified clause, none when the clause's own sentence holds the qualifier). Falsifier: a reader that never reports, a
 *   qualifier read from another sentence, item or table row, or a qualifier accepted without its colon.
 * - R437-C4 (reusing the frozen-shape census pattern of test/workbench-mwi-docs-remediation-census.test.ts: the CLAIMS rows tile criterion 3 of the vendored block, this header carries each claim sentence, the registered cases equal the CLAIMS pins, and every table is pinned as a literal.
 *   Case: R437-C4a (registered last). Falsifier: a claim row, a pin or a table row deleted, renamed or shortened with or without
 *   its literal (the tiling reads criterion 3 from the fixture, outside this file's literals).
 *
 * NOT CLAIMED (scope sentences, no residual semantics):
 * - "until criterion 1 is met": the lift of this census once a criterion 1 artifact exists is NOT CLAIMED by this census; no
 *   such artifact exists at the base and its location (EAT-R456) is unratified, so the census requires the qualifier
 *   unconditionally, and the cut that lands a criterion 1 artifact updates it.
 * - "without editing its pinned rows).": this cut does not edit test/workbench-mwi-docs-remediation-census.test.ts; that file's
 *   rows are NOT CLAIMED by this census.
 * - EAT-R437 criteria 1, 2 and 4, and EAT-R431, EAT-R457 and EAT-R462, are NOT CLAIMED by this census.
 * - Strict wordings without the word native after strict (strict v1, strict-positive, strict PASS, a strict gate) are NOT
 *   CLAIMED by this census.
 * - A strict clause spelled with a letter outside ASCII that NFKD does not map to ASCII (a Cyrillic or Greek look-alike), split
 *   by a named character reference outside NAMED_REFERENCES, or split by HTML or link syntax inside a word, is NOT CLAIMED by
 *   this census.
 * - Whether a page's sentence is true, and what a strict clause describes, are NOT CLAIMED by this census: the reading counts
 *   spellings.
 * - A table whose rows do not open with "|" reads as one item; its rows are NOT CLAIMED by this census one by one.
 * - Markdown paths outside PAGES (under EXCLUDED, untracked, or not ending in .md) are NOT CLAIMED by this census.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const SELF = fileURLToPath(import.meta.url);
const ROOT = join(dirname(SELF), "..");
const FIXTURE = "test/fixtures/mii-strict-attainability-requirement.json";
const MII = "docs/workbench/programs/mechanical-interop-integrity-2026-11-10/requirements";
/** The master commit the block and the matrix rows were vendored from, their blobs and their pinned SHA-256 (UTF-8 text). */
const SOURCE_COMMIT = "a1870c0c17df60dae63fee78197048bebf2f6b09";
const REQUIREMENT_BLOB = "a8a9bf091e2658a9eb698a023bd9bdb7076fa0e5";
const MATRIX_BLOB = "073567e8c568ecc3fe2d894153915aada567add3";
const REQUIREMENT_SHA256 = "87ecde9e80113a0d69665c78919cfc8db09a32a9a936b9f1e3de3256d1dff479";
const MATRIX_A_SHA256 = "39fdf05e3971ad4dbdde6581701d87592425b499264190b82749418e50a7aa38";
const MATRIX_B_SHA256 = "611d29ab51156620222b9896cc5bfb6508b41bcf92eaae3d27c0d1f604c39d30";

/** The tracked path prefixes PAGES leaves out (THE SURFACE). */
const EXCLUDED: readonly string[] = ["test/", "vendor/", "new-feedback/", ".beads/"];
/** One page per surface the Statement lists, in its order: [surface, page]. */
const ANCHORS: ReadonlyArray<readonly [string, string]> = [
  ["receipt", "docs/workbench/receipts/wb-a3s.md"],
  ["W11 row", "docs/workbench/feature-matrix.md"],
  ["skill", ".agents/skills/pi-mechanical-interop/SKILL.md"],
  ["docs text", "README.md"],
];
/** The tracked Markdown pages PAGES held at the base (MEASURED); fewer means the walker or the exclusions dropped a page. */
const SURFACE_FLOOR = 114;
/** Half the sentences THE READING read over PAGES at the base (MEASURED); fewer means the reader went hollow. */
const SENTENCE_FLOOR = 7782;

/** A line that opens a new item inside a block (THE READING). */
const ITEM_OPENER = /^\s*(?:[|#>]|```|~~~|[-*+][ \t]|\d{1,9}[.)][ \t])/;
/** A strict clause in a folded sentence. */
const STRICT = /(?<![a-z0-9])strict[ -]*native(?![a-z0-9])/g;
/** The qualifier criterion 3 names, in a folded sentence. */
const QUALIFIER = /(?<![a-z0-9])attainability ?: ?undetermined(?![a-z0-9])/;
/** The named character references fold() decodes. */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", String.fromCodePoint(0xa0)],
  ["shy", String.fromCodePoint(0xad)],
  ["zwj", String.fromCodePoint(0x200d)],
  ["zwnj", String.fromCodePoint(0x200c)],
  ["hyphen", String.fromCodePoint(0x2010)],
  ["dash", String.fromCodePoint(0x2010)],
  ["ndash", String.fromCodePoint(0x2013)],
  ["mdash", String.fromCodePoint(0x2014)],
  ["minus", String.fromCodePoint(0x2212)],
]);

function codePointText(digits: string, radix: number): string | undefined {
  const value = Number.parseInt(digits, radix);
  return Number.isInteger(value) && value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : undefined;
}

/** What the census reads of one item's text (THE READING). */
function fold(text: string): string {
  return text
    .replace(/&#(?:(\d{1,7})|[xX]([0-9a-fA-F]{1,6}));/g, (whole: string, decimal?: string, hex?: string) => {
      const decoded = decimal !== undefined ? codePointText(decimal, 10) : hex !== undefined ? codePointText(hex, 16) : undefined;
      return decoded ?? whole;
    })
    .replace(/&([A-Za-z][A-Za-z0-9]*);/g, (whole: string, name: string) => NAMED_REFERENCES.get(name) ?? whole)
    .normalize("NFKD")
    .replace(/\p{M}|\p{Cf}/gu, "")
    .replace(/<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\/?>/g, "")
    .replace(/\]\([^)]*\)|\]\[[^\]]*\]/g, "")
    .replace(/[[\]*~`\\]/g, "")
    .replace(/[_\u2010-\u2015\u2212]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

interface Item {
  readonly line: number;
  readonly text: string;
}

/** The items of one page (THE READING): blocks split at blank lines, items opened by ITEM_OPENER. */
function itemsOf(text: string): Item[] {
  const items: { line: number; parts: string[] }[] = [];
  let open = false;
  for (const [index, raw] of text.split(/\r\n|\r|\n/).entries()) {
    if (raw.trim() === "") {
      open = false;
      continue;
    }
    const current = items[items.length - 1];
    if (open && current !== undefined && !ITEM_OPENER.test(raw)) current.parts.push(raw);
    else items.push({ line: index + 1, parts: [raw] });
    open = true;
  }
  return items.map(item => ({ line: item.line, text: item.parts.join(" ") }));
}

const sentencesOf = (folded: string): string[] => folded.split(/(?<=[.!?]) /).filter(sentence => sentence !== "");
const clausesIn = (sentence: string): number => [...sentence.matchAll(STRICT)].length;

/** One page read (THE READING): every finding, in item order, and the number of sentences read. */
function readPage(page: string, text: string): { readonly findings: string[]; readonly sentences: number } {
  const findings: string[] = [];
  let sentences = 0;
  for (const item of itemsOf(text)) {
    for (const sentence of sentencesOf(fold(item.text))) {
      sentences += 1;
      if (QUALIFIER.test(sentence)) continue;
      for (let clause = 0; clause < clausesIn(sentence); clause += 1) findings.push(`${page}:${item.line} ${sentence}`);
    }
  }
  return { findings, sentences };
}
const findingsOf = (page: string, text: string): string[] => readPage(page, text).findings;

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");
const pageText = (page: string): string => readFileSync(join(ROOT, page), "utf8");
const tracked = (): string[] =>
  execFileSync("git", ["ls-files", "-z", "--", "*.md"], { cwd: ROOT, encoding: "utf8" })
    .split("\0")
    .filter(path => path !== "");
const excluded = (path: string): boolean => EXCLUDED.some(prefix => path.startsWith(prefix));
/** PAGES (THE SURFACE), read at run time. */
const pages = (): string[] => tracked().filter(path => !excluded(path));

/** A page's text with the planted text as a new last block, and the line number the plant starts on. */
function plant(text: string, planted: string): { readonly text: string; readonly first: number } {
  const base = text.endsWith("\n") ? text : `${text}\n`;
  return { text: `${base}\n${planted}\n`, first: base.split("\n").length + 1 };
}

const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const SOFT_HYPHEN = String.fromCodePoint(0xad);
const WORD_JOINER = String.fromCodePoint(0x2060);
const NO_BREAK_SPACE = String.fromCodePoint(0xa0);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
const EN_DASH = String.fromCodePoint(0x2013);
const MINUS_SIGN = String.fromCodePoint(0x2212);
const COMBINING_ACUTE = String.fromCodePoint(0x301);
const I_ACUTE = String.fromCodePoint(0xed);
/** The text in full-width Latin letters (U+FF41 is "a" + 0xFEE0). */
const fullWidth = (text: string): string =>
  [...text].map(letter => (/[a-z]/.test(letter) ? String.fromCodePoint((letter.codePointAt(0) ?? 0) + 0xfee0) : letter)).join("");

/** [name, spelling, the plain form fold() reads it as]; every plain form holds exactly one strict clause. */
const FOLD_FORMS: ReadonlyArray<readonly [string, string, string]> = [
  ["upper case", "STRICT NATIVE", "strict native"],
  ["hyphen", "strict-native", "strict-native"],
  ["camel case", "strictNative", "strictnative"],
  ["underscore", "STRICT_NATIVE", "strict-native"],
  ["two spaces", "strict  native", "strict native"],
  ["tab", "strict\tnative", "strict native"],
  ["no-break space", `strict${NO_BREAK_SPACE}native`, "strict native"],
  ["non-breaking hyphen", `strict${NON_BREAKING_HYPHEN}native`, "strict-native"],
  ["en dash", `strict${EN_DASH}native`, "strict-native"],
  ["minus sign", `strict${MINUS_SIGN}native`, "strict-native"],
  ["zero-width space", `str${ZERO_WIDTH_SPACE}ict native`, "strict native"],
  ["soft hyphen", `strict nat${SOFT_HYPHEN}ive`, "strict native"],
  ["word joiner", `strict${WORD_JOINER}-native`, "strict-native"],
  ["combining acute", `stri${COMBINING_ACUTE}ct native`, "strict native"],
  ["precomposed i acute", `str${I_ACUTE}ct native`, "strict native"],
  ["full-width letters", fullWidth("strict native"), "strict native"],
  ["decimal reference", "strict&#45;native", "strict-native"],
  ["hexadecimal reference", "strict&#x20;native", "strict native"],
  ["named reference", "strict&nbsp;native", "strict native"],
  ["named hyphen reference", "strict&hyphen;native", "strict-native"],
  ["emphasis", "*strict* native", "strict native"],
  ["strong emphasis", "**strict-native**", "strict-native"],
  ["intraword strong emphasis", "str**ict** native", "strict native"],
  ["underscore emphasis", "_strict_ native", "-strict- native"],
  ["strikethrough", "~~strict~~ native", "strict native"],
  ["code span", "`strict-native`", "strict-native"],
  ["backslash escape", "strict\\-native", "strict-native"],
  ["HTML element", "strict <b>native</b>", "strict native"],
  ["HTML line break", "strict<br/>native", "strictnative"],
  ["inline link", "[strict](https://example.invalid/a) native", "strict native"],
  ["reference link", "[strict][ref] native", "strict native"],
  ["bracketed word", "[strict] native", "strict native"],
];

interface StrictPlant {
  readonly name: string;
  readonly text: string;
  /** The findings the plant adds: [line offset inside the plant, folded sentence]. */
  readonly adds: ReadonlyArray<readonly [number, string]>;
}
/** The plants R437-C3b adds to every page as a new last block. */
const STRICT_PLANTS: readonly StrictPlant[] = [
  { name: "unqualified", text: "The first release runs the strict native Forge gate.", adds: [[0, "the first release runs the strict native forge gate."]] },
  { name: "qualified in its sentence", text: "The first release runs the strict native Forge gate (attainability: undetermined).", adds: [] },
  { name: "qualified, code spans", text: "The `strict-native` assurance holds `attainability: undetermined` until a pinned envelope exists.", adds: [] },
  { name: "qualified, upper case", text: "STRICT-NATIVE GATE (ATTAINABILITY: UNDETERMINED).", adds: [] },
  { name: "qualified, spaced colon", text: "The strict native gate (attainability : undetermined).", adds: [] },
  { name: "qualified on the next line of its sentence", text: "The strict native Forge gate is\nachievable (attainability: undetermined).", adds: [] },
  { name: "clause wrapped over two lines", text: "The first release runs the strict\nnative Forge gate.", adds: [[0, "the first release runs the strict native forge gate."]] },
  {
    name: "qualifier in the next sentence",
    text: "The strict native Forge gate is achievable. Its attainability: undetermined.",
    adds: [[0, "the strict native forge gate is achievable."]],
  },
  { name: "two in one sentence", text: "Both strict-native and strict native read here.", adds: [[0, "both strict-native and strict native read here."], [0, "both strict-native and strict native read here."]] },
  {
    name: "table row, qualifier in the same row",
    text: "| Row | Status |\n| --- | --- |\n| W11 | strict native Forge gate, attainability: undetermined |",
    adds: [],
  },
  {
    name: "table row, qualifier in the next row",
    text: "| Row | Status |\n| --- | --- |\n| W11 | strict native Forge gate |\n| Note | attainability: undetermined |",
    adds: [[2, "| w11 | strict native forge gate |"]],
  },
  {
    name: "list item, qualifier in the next item",
    text: "- The strict-native assurance is reached\n- attainability: undetermined",
    adds: [[0, "- the strict-native assurance is reached"]],
  },
  { name: "heading", text: "## Strict-native attainability", adds: [[0, "## strict-native attainability"]] },
  { name: "HTML comment", text: "<!-- strict native Forge gate -->", adds: [[0, "<!-- strict native forge gate -->"]] },
  { name: "fenced code", text: "```\nassurance: strict-native\n```", adds: [[0, "assurance: strict-native"]] },
  { name: "blockquote", text: "> The strict native Forge gate passes.", adds: [[0, "> the strict native forge gate passes."]] },
  { name: "qualifier without its colon", text: "The strict native Forge gate (attainability undetermined).", adds: [[0, "the strict native forge gate (attainability undetermined)."]] },
  { name: "qualifier words reversed", text: "The strict native Forge gate (undetermined attainability).", adds: [[0, "the strict native forge gate (undetermined attainability)."]] },
  { name: "another qualifier word", text: "The strict native Forge gate (attainability: unknown).", adds: [[0, "the strict native forge gate (attainability: unknown)."]] },
  { name: "camel-case identifier", text: "assurance: strictNative", adds: [[0, "assurance: strictnative"]] },
  { name: "upper-case identifier", text: "ASSURANCE: STRICT_NATIVE", adds: [[0, "assurance: strict-native"]] },
];

/** Criterion 3 of the vendored block, in order: [the words, the claim that pins them or NOT CLAIMED]. */
const PARTS: ReadonlyArray<readonly [string, string]> = [
  ["A docs/skill census", "R437-C1"],
  ["asserts the strict clause", "R437-C2"],
  ["is accompanied by `attainability: undetermined` text", "R437-C3"],
  ["until criterion 1 is met", "NOT CLAIMED"],
  ["(reusing the frozen-shape census pattern of test/workbench-mwi-docs-remediation-census.test.ts", "R437-C4"],
  ["without editing its pinned rows).", "NOT CLAIMED"],
];

interface Claim {
  readonly id: string;
  /** The claim's header sentence, verbatim on its own header line. */
  readonly header: string;
  readonly pins: readonly string[];
}
/** The judged rows: each claim of the header, its sentence and the cases that pin it. */
const CLAIMS: readonly Claim[] = [
  {
    id: "R437-C1",
    header:
      "R437-C1 A docs/skill census: PAGES are the Markdown paths git ls-files lists outside EXCLUDED, read at run time; they hold each ANCHORS page (one per surface the Statement lists: receipt, W11 row, skill, docs text) and at least SURFACE_FLOOR pages.",
    pins: ["R437-C1a", "R437-C1b"],
  },
  {
    id: "R437-C2",
    header:
      "R437-C2 asserts the strict clause: STRICT and QUALIFIER are the Statement's strict-native spellings and criterion 3's qualifier, read from the vendored block whose SHA-256 is pinned, and fold() reads each FOLD_FORMS spelling as the plain clause.",
    pins: ["R437-C2a", "R437-C2b"],
  },
  {
    id: "R437-C3",
    header:
      "R437-C3 is accompanied by `attainability: undetermined` text: no page holds an unqualified strict clause at the base, and each STRICT_PLANTS text added as a new last block to any page adds exactly the findings its row names.",
    pins: ["R437-C3a", "R437-C3b"],
  },
  {
    id: "R437-C4",
    header:
      "R437-C4 (reusing the frozen-shape census pattern of test/workbench-mwi-docs-remediation-census.test.ts: the CLAIMS rows tile criterion 3 of the vendored block, this header carries each claim sentence, the registered cases equal the CLAIMS pins, and every table is pinned as a literal.",
    pins: ["R437-C4a"],
  },
];

interface VendoredText {
  readonly path: string;
  readonly blob: string;
  readonly sha256: string;
}
interface Vendored {
  readonly bead: string;
  readonly branch: string;
  readonly commit: string;
  readonly requirement: VendoredText & { readonly id: string; readonly lines: string; readonly text: readonly string[] };
  readonly matrixA: VendoredText & { readonly line: number; readonly text: string };
  readonly matrixB: VendoredText & { readonly line: number; readonly text: string };
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isStrings = (value: unknown): value is string[] => Array.isArray(value) && value.every(entry => typeof entry === "string");

function rowOf(value: unknown, what: string): VendoredText & { readonly line: number; readonly text: string } {
  if (!isRecord(value)) throw new Error(`${what}: not an object`);
  const { path, blob, sha256: digest, line, text } = value;
  if (typeof path !== "string" || typeof blob !== "string" || typeof digest !== "string" || typeof line !== "number" || typeof text !== "string") {
    throw new Error(`${what}: a field is malformed`);
  }
  return { path, blob, sha256: digest, line, text };
}

function vendored(): Vendored {
  const parsed: unknown = JSON.parse(readFileSync(join(ROOT, FIXTURE), "utf8"));
  if (!isRecord(parsed) || !isRecord(parsed.source) || !isRecord(parsed.requirement)) throw new Error(`${FIXTURE}: not a vendored requirement`);
  const { bead } = parsed;
  const { branch, commit } = parsed.source;
  const { id, path, blob, lines, sha256: digest, text } = parsed.requirement;
  if (typeof bead !== "string" || typeof branch !== "string" || typeof commit !== "string") throw new Error(`${FIXTURE}: bead or source is malformed`);
  if (typeof id !== "string" || typeof path !== "string" || typeof blob !== "string" || typeof lines !== "string" || typeof digest !== "string" || !isStrings(text)) {
    throw new Error(`${FIXTURE}: requirement is malformed`);
  }
  return {
    bead,
    branch,
    commit,
    requirement: { id, path, blob, lines, sha256: digest, text },
    matrixA: rowOf(parsed.matrixA, "matrixA"),
    matrixB: rowOf(parsed.matrixB, "matrixB"),
  };
}

/** The vendored lines that spell the strict clause, read with a plain case-insensitive pattern of their own (no fold()). */
const strictLines = (fixture: Vendored): Array<readonly [string, number]> =>
  fixture.requirement.text.map(line => [line, [...line.matchAll(/strict[\s-]+native/gi)].length] as const).filter(([, count]) => count > 0);

/** Each case's id, pushed when the case reaches its end; R437-C4a reads it last. */
const REACHED: string[] = [];
let planted = 0;

describe("wb-tl5p EAT-R437 criterion 3 V0 docs/skill census (R437-C1..R437-C4): the tracked Markdown surface holds no strict clause without `attainability: undetermined` in its own sentence, and every plant adds exactly its findings", () => {
  it("R437-C1a the surface derivation: PAGES are the tracked .md paths minus exactly those under EXCLUDED, and no EXCLUDED prefix covers an ANCHORS page", () => {
    const all = tracked();
    const surface = pages();
    expect(surface.length).toBeGreaterThan(0);
    expect([...surface, ...all.filter(excluded)].sort()).toEqual([...all].sort());
    expect(surface.filter(excluded)).toEqual([]);
    expect(surface.every(path => path.endsWith(".md"))).toBe(true);
    expect(ANCHORS.filter(([, page]) => excluded(page))).toEqual([]);
    REACHED.push("R437-C1a");
  });

  it("R437-C1b the anchors: each ANCHORS page is in PAGES, is the surface it names and reads at least one sentence, and PAGES hold at least SURFACE_FLOOR pages", { timeout: 60_000 }, () => {
    const surface = new Set(pages());
    expect(surface.size).toBeGreaterThanOrEqual(SURFACE_FLOOR);
    for (const [name, page] of ANCHORS) expect(surface.has(page), `${name}: ${page}`).toBe(true);
    const [receipt, w11, skill, docs] = ANCHORS.map(([, page]) => page);
    expect(receipt?.startsWith("docs/workbench/receipts/")).toBe(true);
    expect(pageText(w11 ?? "").split("\n").some(line => line.startsWith("## W11:"))).toBe(true);
    expect(/^\.agents\/skills\/[^/]+\/SKILL\.md$/.test(skill ?? "")).toBe(true);
    expect(docs).toBe("README.md");
    for (const [name, page] of ANCHORS) {
      const sentences = itemsOf(pageText(page)).flatMap(item => sentencesOf(fold(item.text)));
      expect(sentences.length, `${name}: ${page} reads sentences`).toBeGreaterThan(0);
    }
    REACHED.push("R437-C1b");
  });

  it("R437-C2a the requirement anchor: the vendored EAT-R437 block and its Matrix A and B rows hash to their pinned SHA-256, the Statement's strict-native words read as strict clauses, criterion 3's qualifier reads as QUALIFIER, and the Statement's surfaces equal ANCHORS", () => {
    const fixture = vendored();
    expect([fixture.bead, fixture.branch, fixture.commit]).toEqual(["wb-tl5p", "master", SOURCE_COMMIT]);
    expect([fixture.requirement.id, fixture.requirement.path, fixture.requirement.blob, fixture.requirement.lines]).toEqual([
      "EAT-R437",
      `${MII}/ATOMIC-REQUIREMENTS.md`,
      REQUIREMENT_BLOB,
      "1180-1203",
    ]);
    expect([sha256(fixture.requirement.text.join("\n")), fixture.requirement.sha256]).toEqual([REQUIREMENT_SHA256, REQUIREMENT_SHA256]);
    expect([fixture.matrixA.path, fixture.matrixA.blob, fixture.matrixA.line, sha256(fixture.matrixA.text), fixture.matrixA.sha256]).toEqual([
      `${MII}/TDD-MATRIX.md`,
      MATRIX_BLOB,
      114,
      MATRIX_A_SHA256,
      MATRIX_A_SHA256,
    ]);
    expect([fixture.matrixB.path, fixture.matrixB.blob, fixture.matrixB.line, sha256(fixture.matrixB.text), fixture.matrixB.sha256]).toEqual([
      `${MII}/TDD-MATRIX.md`,
      MATRIX_BLOB,
      201,
      MATRIX_B_SHA256,
      MATRIX_B_SHA256,
    ]);
    expect(fixture.requirement.text[0]?.startsWith("## EAT-R437 ")).toBe(true);
    expect(fixture.matrixA.text.startsWith("| EAT-R437 | Settle strict-native attainability")).toBe(true);
    expect(fixture.matrixB.text.startsWith("| EAT-R437 | V0,V4 |")).toBe(true);
    expect(fixture.matrixB.text.includes("G-CENSUS")).toBe(true);
    const statement = fixture.requirement.text.find(line => line.startsWith("- Statement: ")) ?? "";
    const quoted = /first release's "([^"]+)" is achievable/.exec(statement)?.[1] ?? "";
    expect(quoted).toBe("strict native Forge gate");
    expect(clausesIn(fold(quoted))).toBe(1);
    const described = /every surface MUST describe (\S+) attainability as `([^`]+)`/.exec(statement);
    expect([described?.[1], described?.[2]]).toEqual(["strict-native", "undetermined"]);
    expect(clausesIn(fold(described?.[1] ?? ""))).toBe(1);
    const surfaces = /^- Statement: Before any (.+?) asserts that/.exec(statement)?.[1] ?? "";
    expect(surfaces.split(/, | or /)).toEqual(ANCHORS.map(([surface]) => surface));
    const criterion = fixture.requirement.text.find(line => line.startsWith("  3. ")) ?? "";
    const qualifier = /accompanied by `([^`]+)` text/.exec(criterion)?.[1] ?? "";
    expect(qualifier).toBe("attainability: undetermined");
    expect(QUALIFIER.test(fold(qualifier))).toBe(true);
    expect(fixture.requirement.text.some(line => line.startsWith("- V-tier: ") && line.endsWith("the census at V0."))).toBe(true);
    REACHED.push("R437-C2a");
  });

  it("R437-C2b the fold: each FOLD_FORMS spelling folds to its plain form and reads as exactly one strict clause", () => {
    for (const [name, spelling, plain] of FOLD_FORMS) {
      expect(fold(spelling), name).toBe(plain);
      expect(clausesIn(fold(spelling)), name).toBe(1);
    }
    expect(FOLD_FORMS.filter(([, spelling, plain]) => spelling === plain).map(([name]) => name)).toEqual(["hyphen"]);
    REACHED.push("R437-C2b");
  });

  it("R437-C3a the base reading: every page of PAGES reads no finding (no strict clause without the qualifier in its own sentence), over at least SENTENCE_FLOOR sentences", { timeout: 120_000 }, () => {
    const surface = pages();
    const reads = surface.map(page => readPage(page, pageText(page)));
    expect(reads.flatMap(read => read.findings)).toEqual([]);
    expect([reads.length, reads.length >= SURFACE_FLOOR]).toEqual([surface.length, true]);
    expect(reads.reduce((total, read) => total + read.sentences, 0)).toBeGreaterThanOrEqual(SENTENCE_FLOOR);
    REACHED.push("R437-C3a");
  });

  it("R437-C3b the plants: each STRICT_PLANTS text and each strict-spelling line of the vendored block, added as a new last block to every page, adds exactly its findings", { timeout: 300_000 }, () => {
    const vendoredLines = strictLines(vendored());
    expect(vendoredLines.map(([, count]) => count)).toEqual([1, 2, 1, 1]);
    const surface = pages();
    expect.assertions(2 + surface.length * (STRICT_PLANTS.length + 2 * vendoredLines.length));
    for (const page of surface) {
      const text = pageText(page);
      const base = findingsOf(page, text);
      for (const { name, text: planting, adds } of STRICT_PLANTS) {
        const result = plant(text, planting);
        expect(findingsOf(page, result.text), `${page} + ${name}`).toEqual([...base, ...adds.map(([offset, sentence]) => `${page}:${result.first + offset} ${sentence}`)]);
        planted += 1;
      }
      for (const [line, count] of vendoredLines) {
        const result = plant(text, line);
        const added = findingsOf(page, result.text).slice(base.length);
        expect(added.length, `${page} + vendored ${line.slice(0, 40)}`).toBe(count);
        expect(added.every(finding => finding.startsWith(`${page}:${result.first} `)), `${page} + vendored ${line.slice(0, 40)}`).toBe(true);
        planted += 1;
      }
    }
    expect(planted).toBe(surface.length * (STRICT_PLANTS.length + vendoredLines.length));
    REACHED.push("R437-C3b");
  });

  it("R437-C4a the frozen shape (standing rule 16): the CLAIMS rows tile criterion 3 of the vendored block, this header carries each claim sentence, the registered cases equal the CLAIMS pins, and every table is pinned as a literal", ({ task }) => {
    const criterion = (vendored().requirement.text.find(line => line.startsWith("  3. ")) ?? "").slice("  3. ".length);
    expect(PARTS.map(([words]) => words).join(" ")).toBe(criterion);
    expect(PARTS.map(([, claim]) => claim).filter(claim => claim !== "NOT CLAIMED")).toEqual(CLAIMS.map(claim => claim.id));
    for (const [words, claim] of PARTS) {
      const row = CLAIMS.find(entry => entry.id === claim);
      if (claim !== "NOT CLAIMED") expect(row?.header.startsWith(`${claim} ${words}`), claim).toBe(true);
    }
    const source = readFileSync(SELF, "utf8");
    const header = source.slice(0, source.indexOf(" */"));
    for (const claim of CLAIMS) expect(header.includes(` * - ${claim.header}\n`), claim.id).toBe(true);
    const notClaimed = header.slice(header.indexOf(" * NOT CLAIMED"));
    for (const [words, claim] of PARTS) if (claim === "NOT CLAIMED") expect(notClaimed.includes(` * - "${words}": `), words).toBe(true);

    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    expect(walked.map(entry => entry.name.split(" ")[0])).toEqual(CLAIMS.flatMap(claim => claim.pins));
    expect(walked.findIndex(entry => entry.self)).toBe(walked.length - 1);
    expect(walked.filter(entry => !entry.self && (entry.mode !== "run" || entry.fails || entry.state !== "pass")).map(entry => entry.name)).toEqual([]);
    expect(REACHED).toEqual(CLAIMS.flatMap(claim => claim.pins).slice(0, -1));

    expect(CLAIMS.map(claim => `${claim.id}:${claim.pins.length}`)).toEqual(["R437-C1:2", "R437-C2:2", "R437-C3:2", "R437-C4:1"]);
    expect(PARTS.map(([, claim]) => claim)).toEqual(["R437-C1", "R437-C2", "R437-C3", "NOT CLAIMED", "R437-C4", "NOT CLAIMED"]);
    expect(EXCLUDED).toEqual(["test/", "vendor/", "new-feedback/", ".beads/"]);
    expect(ANCHORS.map(([surface, page]) => `${surface}=${page}`)).toEqual([
      "receipt=docs/workbench/receipts/wb-a3s.md",
      "W11 row=docs/workbench/feature-matrix.md",
      "skill=.agents/skills/pi-mechanical-interop/SKILL.md",
      "docs text=README.md",
    ]);
    expect([SURFACE_FLOOR, SENTENCE_FLOOR]).toEqual([114, 7782]);
    expect([`/${STRICT.source}/${STRICT.flags}`, `/${QUALIFIER.source}/${QUALIFIER.flags}`, `/${ITEM_OPENER.source}/`]).toEqual([
      "/(?<![a-z0-9])strict[ -]*native(?![a-z0-9])/g",
      "/(?<![a-z0-9])attainability ?: ?undetermined(?![a-z0-9])/",
      "/^\\s*(?:[|#>]|```|~~~|[-*+][ \\t]|\\d{1,9}[.)][ \\t])/",
    ]);
    expect([...NAMED_REFERENCES.keys()]).toEqual(["amp", "lt", "gt", "quot", "apos", "nbsp", "shy", "zwj", "zwnj", "hyphen", "dash", "ndash", "mdash", "minus"]);
    expect([SOURCE_COMMIT, REQUIREMENT_BLOB, MATRIX_BLOB, REQUIREMENT_SHA256.slice(0, 16), MATRIX_A_SHA256.slice(0, 16), MATRIX_B_SHA256.slice(0, 16)]).toEqual([
      "a1870c0c17df60dae63fee78197048bebf2f6b09",
      "a8a9bf091e2658a9eb698a023bd9bdb7076fa0e5",
      "073567e8c568ecc3fe2d894153915aada567add3",
      "87ecde9e80113a0d",
      "39fdf05e3971ad4d",
      "611d29ab51156620",
    ]);
    expect(FOLD_FORMS.map(([name]) => name)).toEqual([
      "upper case",
      "hyphen",
      "camel case",
      "underscore",
      "two spaces",
      "tab",
      "no-break space",
      "non-breaking hyphen",
      "en dash",
      "minus sign",
      "zero-width space",
      "soft hyphen",
      "word joiner",
      "combining acute",
      "precomposed i acute",
      "full-width letters",
      "decimal reference",
      "hexadecimal reference",
      "named reference",
      "named hyphen reference",
      "emphasis",
      "strong emphasis",
      "intraword strong emphasis",
      "underscore emphasis",
      "strikethrough",
      "code span",
      "backslash escape",
      "HTML element",
      "HTML line break",
      "inline link",
      "reference link",
      "bracketed word",
    ]);
    expect(STRICT_PLANTS.map(({ name, adds }) => `${name}:${adds.length}`)).toEqual([
      "unqualified:1",
      "qualified in its sentence:0",
      "qualified, code spans:0",
      "qualified, upper case:0",
      "qualified, spaced colon:0",
      "qualified on the next line of its sentence:0",
      "clause wrapped over two lines:1",
      "qualifier in the next sentence:1",
      "two in one sentence:2",
      "table row, qualifier in the same row:0",
      "table row, qualifier in the next row:1",
      "list item, qualifier in the next item:1",
      "heading:1",
      "HTML comment:1",
      "fenced code:1",
      "blockquote:1",
      "qualifier without its colon:1",
      "qualifier words reversed:1",
      "another qualifier word:1",
      "camel-case identifier:1",
      "upper-case identifier:1",
    ]);
  });
});
