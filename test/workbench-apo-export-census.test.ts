/**
 * wb-021.3 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R3, program-triage-2026-10-18), the APO export census: the until-then leg of a
 * trigger-gated requirement whose surface Pi has not shipped.
 * Statement (the bead's tracker-export title, verbatim; the export spells each dash as the six characters backslash, u, 2,
 * 0, 1, 4, read here as DASH): "[MW-ADAPTIVE-POLICY-ORGANIZATIONS-R3] If Pi ships an APO workbench trace/evidence export,
 * the export shall be reproducible DASH byte-stable for the same recorded snapshot/basis, declared inputs only DASH and shall
 * contain no secret data: the docs/12 redaction floor (credentials, token prefixes, sensitive key/values) applies to the
 * whole export, proven by a secret-bearing fixture redacted before write; until then no Pi doc claims an APO export exists."
 * Owner filing (the export notes, quoted where this file binds them): the acceptance (ACCEPTANCE below, verbatim) ends
 * "gated on an APO export surface existing", and the filing's source tag names the program
 * ("gap-mw-adaptive-policy-organizations/apo-pi-wb-03").
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-27, at d183c0d and again at this census's base 48d01cc, trunk merged
 * into the branch; landings 480-488 between them touched test/ and .beads/ only). git lists 999 files (tracked plus
 * untracked-not-ignored, this cut's two excluded). src/ holds 116 (all .ts) and none spells the program in any reading
 * below: the trigger has not fired, so Pi ships no APO trace or evidence export. Outside src/, test/ and .beads/ git lists
 * 140 files: the two dependency locks (excluded by name, R-LOCKFILE: an integrity value in each, at line 4620, splits into
 * the word "Apo"), 5 binaries (two media files and the three vendored tarballs) and 133 text files, 101 of them markdown;
 * none spells the program in any reading. The tracker export spells it (the bead's own row and its siblings'). At the
 * filing pin b21beb0 (the ledger hop that added the bead to the export: its row is in that commit's export and not in its
 * parent's) the 293 files of both scopes spell it nowhere either. No src, docs or tracker text is edited by this cut.
 *
 * THE JUDGE. A MENTION is either spelling of the program: the abbreviation (the title's "APO") as a whole alphanumeric run
 * in any case (APO, apo, aPo, each run of apo_pi_wb_03), as a word of a run split at its case changes and letter-digit
 * boundaries (renderApoGraph, getAPOExport, APO2) or as the acronym plural "APOs"; or the slug (the requirement id's three
 * words: adaptive, then policy or policies, then organization or organisation in either number) as three consecutive words,
 * or joined into one run (adaptivepolicyorganizations). Each file is read in several READINGS, and a file's forms are the
 * readings that found a mention: "path" (its own path); "raw" (its text as written); "normalized" (what a reader's eye
 * resolves: compatibility forms folded by NFKC, combining marks dropped, default-ignorable and format code points removed);
 * "decoded" (numeric character references, with or without the closing semicolon, the named references NAMED_REFERENCES
 * holds, and a styled or accented Latin letter's named reference as its letter decoded, any other named reference removed;
 * then backslash escapes (\uXXXX, \u{X...}, \xHH) and percent-encoded bytes decoded; then normalized); "rendered" (a
 * markdown file through marked's lexer: inline markup removed, link and image text kept, raw HTML tags, comments,
 * processing instructions, CDATA and declarations removed with the text between them kept; an HTML, XHTML, SVG or XML file
 * with the same tag removal; then decoded and normalized); "cooked" (a script's string-like literals and template parts by
 * their cooked values; a JSON file's keys and string values by their parsed text); and "folded" (a script's all-literal "+"
 * chains by their folded value). A file that opens with a UTF-16 byte-order mark is decoded as UTF-16; any other file holding
 * a NUL byte is binary and only its path is read. judgeScope reads an entry
 * list in one call, so every leg judges its planted entries after the real ones: the findings must be exactly the plants',
 * so a real mention, a hollowed judge or a result forced empty reds.
 *
 * ROWS. T, the trigger clause, one pin per quoted part: T1 the src walk (every file git lists under src/, held equal to a
 * filesystem walk minus what git ignores) spells no mention, at a file floor, with a content-liveness anchor (the schema
 * literal "workflow-script/v1" is a cooked string of src/workbench/identity.ts) and a planted module found by the same call -
 * ARMED: the census reds naming the acceptance as owed the moment src spells the program; T2 the program's identity: the
 * abbreviation is the title's own token and the slug the requirement id's words, every spelling form read and the quiet
 * words (apology, capo, apollo, &apos; and the slug's words incomplete or out of order) not read; T3 the forms a trace or
 * evidence export surface takes in src (a declaration, a capability id, an escape-spelled string, a folded literal, a
 * template and a path), each found in its readings. Z, the until-then duty, one pin per quoted part: Z1 the trigger is
 * unfired today and the same judge over the filing pin's objects reads no mention, the pin being where the row was filed;
 * Z2 every listed Pi doc (every listed file outside src/, test/ and .beads/, the two locks excluded by name; held equal to a
 * filesystem walk minus what git ignores) spells no mention in any reading, with file, markdown and binary floors,
 * content-liveness anchors (every docs/workbench page opens with a level-1 heading in its rendered reading; docs/12's
 * redaction-floor sentence, the floor the armed clause names, is read) and one planted doc per reading found by the same
 * call (two of them UTF-16 docs, one per byte order); Z3 the claim: every mention counts (OVER-READ below), so a claim, a denial and a bare mention each read, and each
 * reader-visible form the raw text splits (inline markup, a link, raw HTML with a quoted ">", a comment, an HTML block,
 * character references, a styled or accented letter's reference, a soft hyphen, invisible code points, compatibility
 * forms, combining marks, a backslash escape, a percent-encoded byte) is read in its readings. Q, the residuals' pinned
 * quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote, claims and witness, the constants and every registered test title - is held to the out-of-file
 * roster (test/fixtures/apo-export-roster.json).
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - its title, read after its requirement-id prefix,
 * is tiled in order by row T's label, the armed clause (ARMED) and row Z's label with nothing but separators (whitespace,
 * comma, semicolon, colon, period, parentheses, DASH) between them, and each row's pin quotes tile its label the same way,
 * so a row or a pin removed from ROWS, the literal, QUOTES, CLAIMS, IMPL and the roster together still reds; the
 * abbreviation is the title's token after "ships an " and the slug the requirement id's words; the filing's source tag
 * spells both; the owner filing is the notes' first two paragraphs (later notes are appended after them): its source line
 * names the source tag once and ACCEPTANCE is its closing sentence, once, so a weakened filing beside a later note quoting
 * the original reds; docs/12 holds the floor sentence; the filing pin is a commit of this repository (Z1 reads that its
 * export holds the row and its parent's does not).
 * CLAIMS: each quoted pin carries claims - terms tiling its quote, each naming the witness facts (top-level keys) that show
 * it; a pin's live witness holds exactly its claimed facts, each fact under one term, and no pin's live witness holds
 * another pin's claimed facts (the claims bound), so a case swap reds at the swapped pin's claims beside its roster witness.
 * SELF-READ: no case reads the roster, every case names a reader of its subject (READERS), so a case returning a constant
 * witness reds, and each residual's quiet row names its family.
 * RESIDUALS (named, each with its pinned quiet row): R-TRACKER the tracker export (.beads/) is not a Pi doc: the bead's own
 * row spells the program (Q1); R-TEST-TREE test/ is not a Pi doc: this census and its roster spell the program there (Q2);
 * R-LOCKFILE the two dependency locks are excluded by name, since an integrity value splits into the word "Apo" (Q3);
 * R-BINARY a file holding a NUL byte and no UTF-16 byte-order mark is read by its path only, so text inside an image, an
 * archive or a mark-less UTF-16 file is not read (Q4);
 * R-PARAPHRASE a description of the program that spells neither name is not read (Q5); R-LETTERED the abbreviation spelled
 * letter by letter with separators is not read (Q6); R-CONFUSABLE a letter from another script, a small capital, an emoji
 * letter (a negative squared letter, a regional indicator, a shortcode) or a digit standing for a letter is not read (Q7);
 * R-BIDI display reordering is not applied: a spelling reversed under a right-to-left override reads as written (Q8);
 * R-STYLE presentation a style sheet or a script applies is not applied: generated content, hidden text that joins the
 * letters around it, text a script writes (Q9); R-INFLECTED inflections other than "APOs" (Apos, apos, APOes) are not read
 * (Q10); R-JOINED the abbreviation joined to another word with no case change or separator is not read (Q11); R-COMPUTED a
 * script's spelling assembled at runtime (a template substitution, a join, a computed character) is not read (Q12);
 * R-UNNAMED-SURFACE an export surface that spells neither name is invisible to T (Q13); R-OTHER-MARKUP markup of another
 * language (reStructuredText, AsciiDoc) is not rendered (Q14).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together, its
 * claims rewritten with them; a plant or control edited in IMPL and the roster together; a floor lowered with the roster; a
 * residual row removed from ROWS, the literal, IMPL, RESIDUALS and the roster (no outside anchor names the residual
 * families); the outside-anchor case or the closing case removed with its roster title.
 * ARMED HALF PENDING: the clause ARMED (reproducible, byte-stable for one recorded snapshot from declared inputs only, the
 * docs/12 redaction floor over the whole export, a secret-bearing fixture redacted before write) has nothing to read until
 * an APO export surface exists; no exporter is faked here. T1 binds it: the census reds with ACCEPTANCE the moment src
 * spells the program.
 * OVER-READS (disclosed; none today): any mention in a Pi doc reads as a claim - a denial ("Pi ships no APO export") and a
 * citation of the program carrying its design-stage status (the scope arm wb-021.6 admits) included, so the first such doc
 * re-measures this census and narrows Z to the claim; words glued across removed markup and across HTML block boundaries
 * read joined; text a reader does not see still reads (a comment in the raw reading, CDATA in an HTML page, a hidden or
 * script element); a base64 run in a doc may split into the word. SCOPE: files git ignores (node_modules/, .forge/ and the
 * rest of .gitignore) and files deleted from the worktree are not listed; MechanicalWorkflows' own repository is never read
 * (the gate is a surface Pi ships).
 * READS (contacts): every listed file outside test/ and .beads/ (T1, Z2), git objects at the filing pin (Z1), the tracker
 * export (its wb-021.3 row; Q1 reads it whole), docs/workbench/12-security.md and src/workbench/identity.ts (liveness), and
 * this file and its roster (Q2).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory entry judged
 * by the same call as the real files; nothing is written to disk.
 */
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-021.3";
const EXPORT = ".beads/issues.jsonl";
const CENSUS = "test/workbench-apo-export-census.test.ts";
/** This file as it runs: a copy run from another path reads its own text in the self-read. */
const SELF = fileURLToPath(import.meta.url);
const ROSTER_FILE = "test/fixtures/apo-export-roster.json";
/** Row T's scope: the source tree Pi ships. */
const SRC = "src/";
/** Outside both scopes: the test tree (R-TEST-TREE) and the tracker (R-TRACKER). */
const OUTSIDE: readonly string[] = ["test/", ".beads/"];
/** Excluded by name from row Z's scope: machine-written dependency locks whose integrity values split into the word (R-LOCKFILE). */
const LOCKFILES: readonly string[] = ["package-lock.json", "vendor/dependency-lock.json"];
const IDENTITY = "src/workbench/identity.ts";
const SCHEMA_LITERAL = "workflow-script/v1";
const DOCS12 = "docs/workbench/12-security.md";
const FLOOR_SENTENCE = "redact recognized bearer/basic credentials, common API-token prefixes and sensitive plain or JSON-quoted key/value fields";
const DOCS_PAGES = "docs/workbench/";
const FILING_PIN = "b21beb0f89ad49500069403c4815d58f2825b414";
/** The export's dash: the six characters of a JSON escape, kept literally in the title text. */
const DASH = "\\u2014";
const REQUIREMENT = "MW-ADAPTIVE-POLICY-ORGANIZATIONS-R3";
const SOURCE_TAG = "gap-mw-adaptive-policy-organizations/apo-pi-wb-03";
const ACCEPTANCE = "Acceptance: double-export byte-equality on one recorded snapshot plus a planted-credential redaction falsifier; gated on an APO export surface existing.";
/** The title's armed clause: it binds when an export surface exists, so it has no judged row today (ARMED HALF PENDING). */
const ARMED = `the export shall be reproducible ${DASH} byte-stable for the same recorded snapshot/basis, declared inputs only ${DASH} and shall contain no secret data: the docs/12 redaction floor (credentials, token prefixes, sensitive key/values) applies to the whole export, proven by a secret-bearing fixture redacted before write`;
/** The program's two spellings (THE JUDGE): the title's abbreviation and the requirement id's slug words. */
const ABBREVIATION = "APO";
const SLUG: readonly string[] = ["adaptive", "policy", "organizations"];
/** Each slug word's accepted inflections (the anchor case holds each to the requirement id's own word). */
const SLUG_FORMS: readonly RegExp[] = [/^adaptive$/, /^polic(?:y|ies)$/, /^organi[sz]ations?$/];
const JOINED_SLUG = /adaptivepolic(?:y|ies)organi[sz]ations?/i;
/** A run's word boundaries: a lower-to-upper case change, an upper-case letter opening a capitalized word (an acronym's plural s stays on it), a letter-digit boundary. */
const WORD_BREAK = /(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z]{2,})|(?<=[A-Z])(?=[A-Z][a-rt-z])|(?<=[A-Za-z])(?=[0-9])|(?<=[0-9])(?=[A-Za-z])/;
const SCRIPT = /\.(?:[cm]?[jt]sx?)$/i;
const JSON_FILE = /\.json$/i;
const MARKDOWN = /\.(?:md|markdown|mdown|mkdn|mkd|mdwn|mdx)$/i;
const MARKUP = /\.(?:html?|xhtml|svg|xml)$/i;
const FLOORS = { srcFiles: 100, docs: 120, markdown: 90, binaries: 3, pages: 20, pinFiles: 250 } as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for T and Z, to the bead's export title. */
const ROWS: readonly Row[] = [
  { id: "T", label: "If Pi ships an APO workbench trace/evidence export", pins: ["T1", "T2", "T3"] },
  { id: "Z", label: "until then no Pi doc claims an APO export exists", pins: ["Z1", "Z2", "Z3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14"] },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "If Pi ships",
  T2: "an APO workbench",
  T3: "trace/evidence export",
  Z1: "until then",
  Z2: "no Pi doc",
  Z3: "claims an APO export exists",
};
/** Each quoted pin's claims: terms tiling its quote, each naming the witness facts that show it. */
const CLAIMS: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> = {
  T1: { If: ["fired", "srcMentions"], Pi: ["scope", "walkEqualsGit", "srcAtFloor", "liveness"], ships: ["srcPlants"] },
  T2: { "an APO": ["abbreviation", "abbreviationForms", "quietWords"], workbench: ["slugWords", "slugForms"] },
  T3: { "trace/evidence export": ["surfaceForms"] },
  Z1: { "until then": ["triggerFired", "filingPin", "filedAtPin", "absentBeforePin", "pinFilesAtFloor", "pinMentions", "pinPlant"] },
  Z2: { no: ["docMentions"], Pi: ["docScope", "excludedByName", "docWalkEqualsGit"], doc: ["docsAtFloor", "markdownAtFloor", "binariesAtFloor", "docLiveness", "docPlants"] },
  Z3: { claims: ["overRead"], "an APO export exists": ["readerForms", "pageForms"] },
};
/** Each residual family and its quiet row. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-TRACKER": "Q1",
  "R-TEST-TREE": "Q2",
  "R-LOCKFILE": "Q3",
  "R-BINARY": "Q4",
  "R-PARAPHRASE": "Q5",
  "R-LETTERED": "Q6",
  "R-CONFUSABLE": "Q7",
  "R-BIDI": "Q8",
  "R-STYLE": "Q9",
  "R-INFLECTED": "Q10",
  "R-JOINED": "Q11",
  "R-COMPUTED": "Q12",
  "R-UNNAMED-SURFACE": "Q13",
  "R-OTHER-MARKUP": "Q14",
};
/** The functions that read a subject: every case must name one, so a case returning a constant witness reds. */
const READERS: readonly string[] = ["judgeScope", "verdictOf", "readingsOf", "quiet", "mentionsIn", "exportRow", "textOf", "git", "srcListing", "docsListing", "srcVerdict", "docsVerdict", "pinVerdict", "scriptUnits"];

interface RosterPin {
  readonly id: string;
  readonly quote: string | null;
  readonly claims: JsonObject | null;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(json);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, json(member)]));
  throw new Error(`not a JSON value: ${typeof value}`);
}
function objectOf(value: unknown, field: string): JsonObject {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as JsonObject;
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) {
    throw new Error("roster must be an object with bead, constants, tests and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      const quote = typeof pin.quote === "string" ? pin.quote : null;
      const claims = isObject(pin.claims) ? objectOf(pin.claims, `roster rows[${index}].pins[${at}].claims`) : null;
      return { id: pin.id, quote, claims, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const tests = raw.tests.map((title: unknown, index: number): string => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a string`);
    return title;
  });
  return { bead: raw.bead, constants: objectOf(raw.constants, "roster constants"), tests, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function lazy<T>(make: () => T): () => T {
  let held: { readonly value: T } | undefined;
  return () => {
    if (held === undefined) held = { value: make() };
    return held.value;
  };
}
function git(args: readonly string[], input?: string): Buffer {
  return execFileSync("git", ["-C", REPO, ...args], { input, maxBuffer: 1024 * 1024 * 1024 });
}
function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function sorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort();
}
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
/** One row of the tracker export (one JSON object per line), found by its id. */
function exportRow(id: string, text: string = textOf(EXPORT)): ExportRow {
  for (const line of text.split("\n")) {
    if (!line.includes(id)) continue;
    const parsed: unknown = JSON.parse(line);
    if (isObject(parsed) && parsed.id === id && typeof parsed.title === "string") return { title: parsed.title, notes: typeof parsed.notes === "string" ? parsed.notes : "" };
  }
  throw new Error(`the tracker export holds no row ${id}`);
}
/** The owner filing: the notes' first two paragraphs (its source line and its citation with the acceptance); later notes are appended after them. */
function ownerFiling(notes: string): { readonly source: string; readonly body: string } {
  const [source = "", body = ""] = notes.split("\n\n");
  return { source, body: body.trimEnd() };
}
function occurrences(text: string, part: string): number {
  return part === "" ? 0 : text.split(part).length - 1;
}
/** The quotes tile the text in order, with nothing but separators between them (and after the last). */
function tiles(text: string, quotes: readonly string[], separators: RegExp = /^[\s,;:.()]*$/): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = text.indexOf(quote, at);
    if (quote === "" || found < 0 || !separators.test(text.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(text.slice(at));
}
const TITLE_SEPARATORS = new RegExp(`^(?:[\\s,;:.()]|${escaped(DASH)})*$`);

// ---------------------------------------------------------------------------------------------------------------------
// THE JUDGE.

/** The mentions a text spells (THE JUDGE), each as spelled, sorted. */
function mentionsIn(text: string): string[] {
  const found = new Set<string>();
  const words: string[] = [];
  const isAbbreviation = (word: string): boolean => word.toLowerCase() === ABBREVIATION.toLowerCase() || word === `${ABBREVIATION}s`;
  for (const run of text.match(/[A-Za-z0-9]+/g) ?? []) {
    if (isAbbreviation(run)) found.add(run);
    if (JOINED_SLUG.test(run)) found.add(run.toLowerCase());
    for (const word of run.split(WORD_BREAK)) {
      if (isAbbreviation(word)) found.add(word);
      words.push(word.toLowerCase());
    }
  }
  words.forEach((word, index) => {
    const slug = [word, words[index + 1] ?? "", words[index + 2] ?? ""];
    if (SLUG_FORMS.every((form, at) => form.test(slug[at] ?? ""))) found.add(slug.join(" "));
  });
  return [...found].sort();
}
type Reading = "path" | "raw" | "normalized" | "decoded" | "rendered" | "cooked" | "folded";
interface Entry {
  readonly path: string;
  readonly bytes: Buffer;
}
function entry(path: string, text: string): Entry {
  return { path, bytes: Buffer.from(text, "utf8") };
}
/** Reading "normalized": compatibility forms folded, combining marks dropped, default-ignorable and format code points removed. */
function normalizedText(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[\p{Cf}\p{Default_Ignorable_Code_Point}]/gu, "")
    .normalize("NFKC");
}
/** The named references reading "decoded" renders as their text (a styled or accented letter's reference is read by family). */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: String.fromCodePoint(0xa0),
  shy: String.fromCodePoint(0xad),
  ZeroWidthSpace: String.fromCodePoint(0x200b),
  zwnj: String.fromCodePoint(0x200c),
  zwj: String.fromCodePoint(0x200d),
  lrm: String.fromCodePoint(0x200e),
  rlm: String.fromCodePoint(0x200f),
  NoBreak: String.fromCodePoint(0x2060),
  ApplyFunction: String.fromCodePoint(0x2061),
  InvisibleTimes: String.fromCodePoint(0x2062),
  InvisibleComma: String.fromCodePoint(0x2063),
};
const STYLED_LETTER = /^([A-Za-z])(?:opf|scr|fr)$/;
const ACCENTED_LETTER = /^([A-Za-z])(?:acute|grave|circ|tilde|uml|ring|cedil|caron|macr|breve|ogon|dot|dblac|slash|strok)$/;
/** A code point as text: out of range (or zero) reads as the replacement character, as a browser renders it. */
const codePoint = (code: number): string => (code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : String.fromCodePoint(0xfffd));
/**
 * Reading "decoded", before normalization: character references as a browser renders them (any other named reference
 * renders nothing here), then backslash escapes (\uXXXX, \u{X...}, \xHH, as a JSON, YAML, TOML or script string reads them)
 * and percent-encoded bytes (as a URL reads them).
 */
function decodedText(text: string): string {
  const referenced = text.replace(/&(?:#([0-9]+);?|#[xX]([0-9a-fA-F]+);?|([A-Za-z][A-Za-z0-9]*);)/g, (_whole, decimal: string | undefined, hex: string | undefined, name: string | undefined) => {
    if (decimal !== undefined) return codePoint(Number.parseInt(decimal, 10));
    if (hex !== undefined) return codePoint(Number.parseInt(hex, 16));
    const reference = name ?? "";
    const letter = STYLED_LETTER.exec(reference)?.[1] ?? ACCENTED_LETTER.exec(reference)?.[1];
    return NAMED_REFERENCES[reference] ?? letter ?? "";
  });
  return referenced.replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})|%([0-9a-fA-F]{2})/g, (_whole, braced: string | undefined, four: string | undefined, two: string | undefined, percent: string | undefined) =>
    codePoint(Number.parseInt(braced ?? four ?? two ?? percent ?? "0", 16)),
  );
}
/** The end of a tag that opens at `start`, read as an HTML tokenizer reads it: attributes split by white space or "/", values quoted or not. */
function tagEnd(html: string, start: number): number {
  const space = (at: number): boolean => /\s/.test(html.charAt(at));
  let at = start;
  while (at < html.length && !/[\s/>]/.test(html.charAt(at))) at += 1;
  for (;;) {
    while (at < html.length && (space(at) || html.charAt(at) === "/")) at += 1;
    if (at >= html.length) return html.length;
    if (html.charAt(at) === ">") return at + 1;
    at += 1;
    while (at < html.length && !/[\s/>=]/.test(html.charAt(at))) at += 1;
    while (at < html.length && space(at)) at += 1;
    if (html.charAt(at) !== "=") continue;
    at += 1;
    while (at < html.length && space(at)) at += 1;
    const quote = html.charAt(at);
    if (quote === '"' || quote === "'") {
      const close = html.indexOf(quote, at + 1);
      at = close < 0 ? html.length : close + 1;
    } else while (at < html.length && !space(at) && html.charAt(at) !== ">") at += 1;
  }
}
/**
 * Raw HTML as a reader sees it, read as an HTML tokenizer reads it: a comment (to "-->" or "--!>"; "<!-->" and "<!--->"
 * close at once; unclosed, to the end), a bogus comment ("<?", or "<!" or "</" not opening a comment or a tag, to the first
 * ">") and a tag (tagEnd) render nothing; CDATA renders its content (as SVG and XML show it); any other "<" is text.
 */
function htmlText(html: string): string {
  let out = "";
  let at = 0;
  while (at < html.length) {
    const open = html.indexOf("<", at);
    if (open < 0) return out + html.slice(at);
    out += html.slice(at, open);
    const rest = html.slice(open);
    if (rest.startsWith("<!--")) {
      const abrupt = /^<!--->?|^<!-->/.exec(rest)?.[0];
      const close = /--!?>/.exec(rest.slice(4));
      at = abrupt?.endsWith(">") ? open + abrupt.length : close === null ? html.length : open + 4 + close.index + close[0].length;
    } else if (rest.startsWith("<![CDATA[")) {
      const close = rest.indexOf("]]>");
      out += close < 0 ? rest.slice(9) : rest.slice(9, close);
      at = close < 0 ? html.length : open + close + 3;
    } else if (/^<\/?[A-Za-z]/.test(rest)) at = tagEnd(html, open + (rest.startsWith("</") ? 2 : 1));
    else if (/^<[?!/]/.test(rest)) {
      const close = html.indexOf(">", open);
      at = close < 0 ? html.length : close + 1;
    } else {
      out += "<";
      at = open + 1;
    }
  }
  return out;
}
function childrenOf(token: Token): Token[] {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
function tokenText(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** Inline tokens joined as a reader sees them: markup renders nothing between its text, raw HTML renders its text only. */
function inlineText(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") out += htmlText(token.raw);
    else if (token.type === "br") out += "\n";
    else if (childrenOf(token).length > 0) out += inlineText(childrenOf(token));
    else out += tokenText(token);
  }
  return out;
}
/** Block tokens, each on its own line: a list item, a table cell and a block quote's blocks read as their own text. */
function blockText(tokens: readonly Token[]): string {
  return tokens
    .map(token => {
      if (token.type === "html") return htmlText(token.raw);
      if (token.type === "code") return tokenText(token);
      if (token.type === "list") return (token as Tokens.List).items.map(item => blockText(childrenOf(item))).join("\n");
      if (token.type === "table") {
        const table = token as Tokens.Table;
        return [...table.header, ...table.rows.flat()].map(cell => inlineText(cell.tokens)).join("\n");
      }
      if (token.type === "blockquote") return blockText(childrenOf(token));
      if (token.type === "space" || token.type === "hr" || token.type === "def") return "";
      return childrenOf(token).length > 0 ? inlineText(childrenOf(token)) : tokenText(token);
    })
    .join("\n");
}
/** Reading "rendered", before decoding: a markdown file through marked's lexer, a markup file with its tags removed. */
function renderedText(path: string, text: string): string {
  return MARKDOWN.test(path) ? blockText(marked.lexer(text)) : htmlText(text);
}
/** A script's cooked and folded units: each string-like literal, each template part, each all-literal "+" chain. */
function scriptUnits(path: string, text: string): { readonly reading: Reading; readonly text: string }[] {
  const kind = /x$/i.test(path) ? ts.ScriptKind.TSX : /\.[cm]?js$/i.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const units: { reading: Reading; text: string }[] = [];
  const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
  const folded = (node: ts.Expression): string | undefined => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isParenthesizedExpression(node)) return folded(node.expression);
    if (isPlus(node)) {
      const left = folded(node.left);
      const right = folded(node.right);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) units.push({ reading: "cooked", text: node.text });
    else if (ts.isTemplateExpression(node)) {
      units.push({ reading: "cooked", text: node.head.text });
      for (const span of node.templateSpans) units.push({ reading: "cooked", text: span.literal.text });
    } else if (isPlus(node) && !isPlus(node.parent)) {
      const value = folded(node);
      if (value !== undefined) units.push({ reading: "folded", text: value });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}
/** A JSON file's keys and string values, each by its parsed (unescaped) text; an unparseable file yields none. */
function jsonUnits(text: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  const units: string[] = [];
  const walk = (value: unknown): void => {
    if (typeof value === "string") units.push(value);
    else if (Array.isArray(value)) for (const member of value) walk(member);
    else if (isObject(value))
      for (const [key, member] of Object.entries(value)) {
        units.push(key);
        walk(member);
      }
  };
  walk(parsed);
  return units;
}
/** A file's text: UTF-16 when it opens with a byte-order mark, else UTF-8; undefined for any other file holding a NUL byte (binary). */
function decodedBytes(bytes: Buffer): string | undefined {
  const units = (): Buffer => Buffer.from(bytes.subarray(2, bytes.length - (bytes.length % 2)));
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return units().toString("utf16le");
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return units().swap16().toString("utf16le");
  return bytes.includes(0) ? undefined : bytes.toString("utf8");
}
/** One file's verdict: binary (a NUL byte and no UTF-16 mark: read by its path only) or the sorted readings in which a mention was read. */
function verdictOf(path: string, bytes: Buffer): { readonly binary: boolean; readonly readings: readonly Reading[] } {
  const readings = new Set<Reading>();
  const spells = (text: string): boolean => mentionsIn(text).length > 0;
  if (spells(normalizedText(path))) readings.add("path");
  const text = decodedBytes(bytes);
  if (text === undefined) return { binary: true, readings: [...readings].sort() };
  if (spells(text)) readings.add("raw");
  if (spells(normalizedText(text))) readings.add("normalized");
  if (spells(normalizedText(decodedText(text)))) readings.add("decoded");
  if ((MARKDOWN.test(path) || MARKUP.test(path)) && spells(normalizedText(decodedText(renderedText(path, text))))) readings.add("rendered");
  if (SCRIPT.test(path)) for (const unit of scriptUnits(path, text)) if (spells(normalizedText(unit.text))) readings.add(unit.reading);
  if (JSON_FILE.test(path) && jsonUnits(text).some(unit => spells(normalizedText(unit)))) readings.add("cooked");
  return { binary: false, readings: [...readings].sort() };
}
interface ScopeVerdict {
  readonly files: number;
  readonly markdown: number;
  readonly binaries: readonly string[];
  readonly findings: { readonly [path: string]: readonly Reading[] };
}
/** Judges an entry list in one call: the real entries first, then any planted ones. */
function judgeScope(entries: Iterable<Entry>): ScopeVerdict {
  let files = 0;
  let markdown = 0;
  const binaries: string[] = [];
  const findings: { [path: string]: Reading[] } = {};
  for (const { path, bytes } of entries) {
    files += 1;
    const verdict = verdictOf(path, bytes);
    if (verdict.readings.length > 0) findings[path] = [...verdict.readings];
    if (verdict.binary) binaries.push(path);
    else if (MARKDOWN.test(path)) markdown += 1;
  }
  return { files, markdown, binaries, findings };
}
function findingsFor(verdict: ScopeVerdict, paths: readonly string[], within: boolean): { [path: string]: Reading[] } {
  return Object.fromEntries(Object.entries(verdict.findings).filter(([path]) => paths.includes(path) === within).map(([path, readings]) => [path, [...readings]]));
}

// ---------------------------------------------------------------------------------------------------------------------
// The scopes.

/** Every regular file under a directory of the worktree (no symbolic link followed), skipping .git and node_modules. */
function walked(dir: string, skip: (path: string) => boolean): string[] {
  const out: string[] = [];
  const visit = (relativeDir: string): void => {
    for (const item of readdirSync(join(REPO, relativeDir), { withFileTypes: true })) {
      const path = relativeDir === "" ? item.name : `${relativeDir}/${item.name}`;
      if (item.name === ".git" || item.name === "node_modules" || skip(path)) continue;
      const stat = lstatSync(join(REPO, path));
      if (stat.isDirectory()) visit(path);
      else out.push(path);
    }
  };
  visit(dir.replace(/\/$/, ""));
  return sorted(out);
}
/** The walked paths git ignores (tracked files are never reported). */
function ignoredOf(paths: readonly string[]): Set<string> {
  if (paths.length === 0) return new Set();
  try {
    return new Set(git(["check-ignore", "--stdin", "-z"], `${paths.join("\0")}\0`).toString("utf8").split("\0").filter(Boolean));
  } catch (error) {
    // git check-ignore exits 1 when it ignores none of the paths.
    if (isObject(error) && error.status === 1) return new Set();
    throw error;
  }
}
interface Listing {
  readonly paths: readonly string[];
  readonly excluded: readonly string[];
  readonly walkEqualsGit: boolean;
}
const listedAll = lazy((): string[] => sorted(git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).toString("utf8").split("\0").filter(Boolean)));
const outside = (path: string): boolean => OUTSIDE.some(prefix => path.startsWith(prefix));
/** Row T's scope: every listed file under src/, held equal to a filesystem walk of src/ minus what git ignores. */
const srcListing = lazy((): Listing => {
  const paths = listedAll().filter(path => path.startsWith(SRC) && existsSync(join(REPO, path)));
  const walk = walked(SRC, () => false);
  const ignored = ignoredOf(walk);
  return { paths, excluded: [], walkEqualsGit: isDeepStrictEqual(walk.filter(path => !ignored.has(path)), paths) };
});
/** Row Z's scope: every listed file outside src/, test/ and .beads/, the locks excluded by name; held equal to a filesystem walk. */
const docsListing = lazy((): Listing => {
  const inScope = (path: string): boolean => !path.startsWith(SRC) && !outside(path);
  const listed = listedAll().filter(path => inScope(path) && existsSync(join(REPO, path)));
  const excluded = listedAll().filter(path => !inScope(path) || LOCKFILES.includes(path));
  const paths = listed.filter(path => !LOCKFILES.includes(path));
  const walk = walked("", path => path === SRC.replace(/\/$/, "") || OUTSIDE.some(prefix => path === prefix.replace(/\/$/, "")));
  const ignored = ignoredOf(walk);
  return { paths, excluded, walkEqualsGit: isDeepStrictEqual(walk.filter(path => !ignored.has(path) && !LOCKFILES.includes(path)), paths) };
});
function realEntries(paths: readonly string[]): Entry[] {
  return paths.map(path => ({ path, bytes: readFileSync(join(REPO, path)) }));
}

/** T1's plant: one module of the source tree spelling the program, judged after the real ones. */
const SRC_PLANT = "src/workbench/zz-plant.ts";
/** T3's forms of a trace or evidence export surface in src, each planted after the real modules. */
const SURFACE_PLANTS: Readonly<Record<string, string>> = {
  declaration: "export function exportApoTrace(snapshot: unknown): string {\n  return JSON.stringify(snapshot);\n}\n",
  capabilityId: 'export const CAPABILITY = "apo.evidence.export";\n',
  escapedString: 'export const LABEL = "\\u0041PO trace export";\n',
  foldedLiteral: 'export const LABEL = "A" + "PO evidence export";\n',
  template: "export const label = (kind: string): string => `APO $" + "{kind} export`;\n",
  path: "export {};\n",
};
const surfacePath = (form: string): string => (form === "path" ? "src/apo/zz-export.ts" : `src/workbench/zz-surface-${form}.ts`);
const srcVerdict = lazy((): ScopeVerdict =>
  judgeScope([
    ...realEntries(srcListing().paths),
    entry(SRC_PLANT, 'export const NOTE = "Pi ships an APO export.";\n'),
    ...Object.entries(SURFACE_PLANTS).map(([form, text]) => entry(surfacePath(form), text)),
  ]),
);
const srcPlantPaths = (): string[] => [SRC_PLANT, ...Object.keys(SURFACE_PLANTS).map(surfacePath)];

/** Z2's plants: one doc per reading, judged after the real docs. */
const DOC_PLANTS: Readonly<Record<string, string>> = {
  "docs/workbench/zz-apo-export.md": "# Plant\n\nThis page names nothing.\n",
  "docs/workbench/zz-raw.md": "# Plant\n\nPi ships an APO export.\n",
  "new-feedback/zz-invisible.txt": `Pi ships an A${String.fromCodePoint(0x200b)}PO export.\n`,
  "docs/zz-reference.md": "Pi ships an &#65;PO export.\n",
  "docs/workbench/zz-markup.md": "Pi ships an A**P**O export.\n",
  "docs/zz-page.html": "<p>Pi ships an A<b>P</b>O export.</p>\n",
  "examples/zz-config.json": '{ "note": "Pi ships an \\u0041PO export." }\n',
  "examples/zz-example.ts": 'export const NOTE = "Pi ships an \\u0041PO export.";\n',
  "examples/zz-folded.ts": 'export const NOTE = "Pi ships an A" + "PO export.";\n',
  "qa/zz-plant.mjs": "// Pi ships an APO export.\nexport {};\n",
};
/** Z2's UTF-16 plants: a doc with a byte-order mark in each byte order. */
const UTF16_PLANTS: Readonly<Record<string, "utf16le" | "utf16be">> = { "docs/zz-utf16le.md": "utf16le", "docs/zz-utf16be.md": "utf16be" };
const UTF16_TEXT = "Pi ships an APO export.\n";
function utf16Entry(path: string, order: "utf16le" | "utf16be"): Entry {
  const body = Buffer.from(UTF16_TEXT, "utf16le");
  return order === "utf16le" ? { path, bytes: Buffer.concat([Buffer.from([0xff, 0xfe]), body]) } : { path, bytes: Buffer.concat([Buffer.from([0xfe, 0xff]), Buffer.from(body).swap16()]) };
}
const docPlantPaths = (): string[] => [...Object.keys(DOC_PLANTS), ...Object.keys(UTF16_PLANTS)];
const docsVerdict = lazy((): ScopeVerdict =>
  judgeScope([
    ...realEntries(docsListing().paths),
    ...Object.entries(DOC_PLANTS).map(([path, text]) => entry(path, text)),
    ...Object.entries(UTF16_PLANTS).map(([path, order]) => utf16Entry(path, order)),
  ]),
);

/** The blobs of a commit's paths, read through one git cat-file --batch call. */
function blobsAt(commit: string, paths: readonly string[]): Entry[] {
  const out = git(["cat-file", "--batch"], `${paths.map(path => `${commit}:${path}`).join("\n")}\n`);
  const entries: Entry[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(0x0a, at);
    const header = out.subarray(at, end).toString("utf8");
    const match = /^[0-9a-f]{40,64} blob (\d+)$/.exec(header);
    if (match === null) throw new Error(`git cat-file --batch ${commit}:${path}: ${header}`);
    const size = Number(match[1]);
    entries.push({ path, bytes: Buffer.from(out.subarray(end + 1, end + 1 + size)) });
    at = end + 1 + size + 1;
  }
  return entries;
}
const PIN_PLANT = "docs/workbench/zz-pin-plant.md";
/** Both scopes at the filing pin: every file of the pin's tree outside test/ and .beads/, the locks excluded by name. */
const pinVerdict = lazy((): ScopeVerdict => {
  const paths = git(["ls-tree", "-r", "-z", "--name-only", FILING_PIN])
    .toString("utf8")
    .split("\0")
    .filter(path => path !== "" && !outside(path) && !LOCKFILES.includes(path));
  return judgeScope([...blobsAt(FILING_PIN, paths), entry(PIN_PLANT, "Pi ships the adaptive-policy-organizations export.\n")]);
});

/** The verdict of one constructed text at a path: the readings that found a mention. */
function readingsOf(path: string, text: string): Reading[] {
  return [...verdictOf(path, Buffer.from(text, "utf8")).readings];
}
/** A quiet row's controls: whether each constructed text, read at the given path, finds nothing. */
function quiet(texts: Readonly<Record<string, string>>, path: string): Record<string, boolean> {
  return Object.fromEntries(Object.entries(texts).map(([kind, text]) => [kind, verdictOf(path, Buffer.from(text, "utf8")).readings.length === 0]));
}

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each pin's live witness, for the claims check of the closing case. */
const LIVE = new Map<string, JsonValue>();

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  T1: () => {
    const listing = srcListing();
    const verdict = srcVerdict();
    const real = findingsFor(verdict, srcPlantPaths(), false);
    expect(real, `ARMED: src now spells the APO program; if the module is an APO trace or evidence export, the until-then duty of ${BEAD} ends and the acceptance is owed - ${ACCEPTANCE}`).toEqual({});
    const identity = listing.paths.includes(IDENTITY) ? scriptUnits(IDENTITY, textOf(IDENTITY)) : [];
    return json({
      fired: Object.keys(real).length > 0,
      srcMentions: real,
      scope: "every listed file under src/ (tracked plus untracked-not-ignored)",
      walkEqualsGit: listing.walkEqualsGit,
      srcAtFloor: listing.paths.length >= FLOORS.srcFiles,
      liveness: { identitySchemaLiteral: identity.some(unit => unit.reading === "cooked" && unit.text === SCHEMA_LITERAL) },
      srcPlants: findingsFor(verdict, [SRC_PLANT], true),
    });
  },
  T2: () => {
    const title = exportRow(BEAD).title;
    const abbreviation = /ships an (\S+) workbench/.exec(title)?.[1] ?? "-";
    const slugWords = (/^\[MW-(.+)-R\d+\]/.exec(title)?.[1] ?? "-").toLowerCase().split("-");
    const abbreviationForms: Readonly<Record<string, string>> = {
      upper: "an APO view",
      lower: "the apo export",
      anyCase: "aPo",
      camel: "renderApoGraph()",
      acronymInCamel: "getAPOExport()",
      plural: "two APOs",
      possessive: "the APO's export",
      digits: "APO-020 and APO2",
      snake: "apo_pi_wb_03",
      prefixed: "MW-APO",
    };
    const slugForms: Readonly<Record<string, string>> = {
      programName: "adaptive-policy-organizations-2026-10-18",
      camel: "class AdaptivePolicyOrganization {}",
      screaming: "ADAPTIVE_POLICY_ORGANISATIONS",
      plural: "adaptive policies organizations",
      requirementId: REQUIREMENT,
      joined: "adaptivepolicyorganizations",
      lineBroken: "adaptive-\npolicy organisations",
    };
    const quietWords: Readonly<Record<string, string>> = {
      containsLetters: "apology, capo, apollo, apostrophe, apothecary and a teapot",
      reference: "&apos;",
      otherAbbreviation: "API and a PO box",
      slugIncomplete: "an adaptive policy",
      slugTail: "policy organizations",
      slugOutOfOrder: "organizations of adaptive policy",
      slugInterrupted: "adaptive policy for organizations",
    };
    const read = (forms: Readonly<Record<string, string>>): Record<string, string[]> => Object.fromEntries(Object.entries(forms).map(([form, text]) => [form, mentionsIn(text)]));
    const abbreviationRead = read(abbreviationForms);
    const slugRead = read(slugForms);
    expect(Object.entries({ ...abbreviationRead, ...slugRead }).filter(([, found]) => found.length === 0), "every spelling form of the program is read").toEqual([]);
    expect(Object.entries(read(quietWords)).filter(([, found]) => found.length > 0), "no quiet word is read as a mention").toEqual([]);
    return json({ abbreviation, abbreviationForms: abbreviationRead, quietWords: read(quietWords), slugWords, slugForms: slugRead });
  },
  T3: () => {
    const verdict = srcVerdict();
    const surfaceForms = Object.fromEntries(Object.keys(SURFACE_PLANTS).map(form => [form, verdict.findings[surfacePath(form)] ?? []]));
    expect(Object.entries(surfaceForms).filter(([, readings]) => readings.length === 0), "every export-surface form is found").toEqual([]);
    return json({ surfaceForms });
  },
  Z1: () => {
    const trigger = findingsFor(srcVerdict(), srcPlantPaths(), false);
    const holds = (text: string): boolean => text.split("\n").some(line => line.includes(`"id":"${BEAD}"`));
    const verdict = pinVerdict();
    return json({
      triggerFired: Object.keys(trigger).length > 0,
      filingPin: FILING_PIN.slice(0, 12),
      filedAtPin: holds(git(["show", `${FILING_PIN}:${EXPORT}`]).toString("utf8")),
      absentBeforePin: !holds(git(["show", `${FILING_PIN}^:${EXPORT}`]).toString("utf8")),
      pinFilesAtFloor: verdict.files - 1 >= FLOORS.pinFiles,
      pinMentions: findingsFor(verdict, [PIN_PLANT], false),
      pinPlant: findingsFor(verdict, [PIN_PLANT], true),
    });
  },
  Z2: () => {
    const listing = docsListing();
    const verdict = docsVerdict();
    const plantPaths = docPlantPaths();
    expect(
      plantPaths.filter(path => listing.paths.includes(path)),
      "no plant path is a listed Pi doc",
    ).toEqual([]);
    const real = findingsFor(verdict, plantPaths, false);
    expect(real, `until an APO export surface exists, no Pi doc spells the program (${BEAD})`).toEqual({});
    const pages = listing.paths.filter(path => path.startsWith(DOCS_PAGES) && MARKDOWN.test(path) && !path.slice(DOCS_PAGES.length).includes("/"));
    const opensWithHeading = (path: string): boolean => {
      const first = marked.lexer(textOf(path)).find(token => token.type !== "space");
      return first?.type === "heading" && (first as Tokens.Heading).depth === 1;
    };
    const floor = listing.paths.includes(DOCS12) ? normalizedText(decodedText(renderedText(DOCS12, textOf(DOCS12)))).replace(/\s+/g, " ") : "";
    return json({
      docMentions: real,
      docScope: "every listed file outside src/, test/ and .beads/ (tracked plus untracked-not-ignored)",
      excludedByName: [...LOCKFILES],
      docWalkEqualsGit: listing.walkEqualsGit,
      docsAtFloor: listing.paths.length >= FLOORS.docs,
      markdownAtFloor: verdict.markdown - plantPaths.filter(path => MARKDOWN.test(path)).length >= FLOORS.markdown,
      binariesAtFloor: verdict.binaries.length >= FLOORS.binaries,
      docLiveness: { pagesRead: pages.length >= FLOORS.pages, everyPageOpensWithLevel1Heading: pages.every(opensWithHeading), docs12FloorSentence: floor.includes(FLOOR_SENTENCE) },
      docPlants: findingsFor(verdict, plantPaths, true),
    });
  },
  Z3: () => {
    const doc = "docs/workbench/zz-claim.md";
    const overRead = {
      claim: readingsOf(doc, "Pi ships an APO export.\n").length > 0,
      denial: readingsOf(doc, "Pi ships no APO export.\n").length > 0,
      bareMention: readingsOf(doc, "The APO program is design-only.\n").length > 0,
    };
    expect(Object.entries(overRead).filter(([, read]) => !read), "a claim, a denial and a bare mention each read").toEqual([]);
    const forms: Readonly<Record<string, string>> = {
      strong: "A**P**O",
      emphasis: "A*P*O",
      codeSpan: "A`P`O",
      link: "A[P](https://example.invalid)O",
      inlineTag: "A<span>P</span>O",
      quotedGreaterThan: 'A<span title=">">P</span>O',
      comment: "A<!-- x -->PO",
      htmlBlock: "<div>\nA<b>P</b>O\n</div>",
      decimalReference: "&#65;PO",
      hexReference: "&#x41;PO",
      unterminatedReference: "&#65PO",
      styledLetter: "&Aopf;PO",
      accentedLetter: "&Aacute;PO",
      softHyphenReference: "A&shy;PO",
      invisible: `A${String.fromCodePoint(0x200b)}PO`,
      wordJoiner: `A${String.fromCodePoint(0x2060)}PO`,
      fullwidth: String.fromCodePoint(0xff21, 0xff30, 0xff2f),
      mathBold: String.fromCodePoint(0x1d400, 0x1d40f, 0x1d40e),
      combiningMark: `A${String.fromCodePoint(0x301)}PO`,
      backslashEscape: "\\u0041PO",
      percentEncoded: "%41PO",
    };
    const readerForms = Object.fromEntries(Object.entries(forms).map(([form, text]) => [form, readingsOf(doc, `Pi ships an ${text} export.\n`)]));
    const pages: Readonly<Record<string, readonly [string, string]>> = {
      htmlBlockBogusComment: [doc, "<div>\nA<?x>PO export\n</div>\n"],
      htmlBlockSlashAttribute: [doc, '<div>\nA<span/title=">">P</span>O export\n</div>\n'],
      htmlPageUnquotedAttribute: ["docs/zz-page.html", "<p>A<span title=x>P</span>O export</p>\n"],
      svgCdata: ["docs/zz-figure.svg", "<svg><text><![CDATA[A]]><![CDATA[PO]]> export</text></svg>\n"],
    };
    const pageForms = Object.fromEntries(Object.entries(pages).map(([form, [path, text]]) => [form, readingsOf(path, text)]));
    expect(Object.entries({ ...readerForms, ...pageForms }).filter(([, readings]) => readings.length === 0), "every reader-visible form is read").toEqual([]);
    return json({ overRead, readerForms, pageForms });
  },
  Q1: () => {
    const exportMentions = mentionsIn(textOf(EXPORT)).length;
    expect(exportMentions, "the tracker export spells the program (the bead's own row)").toBeGreaterThanOrEqual(1);
    return json({ residual: "R-TRACKER", exportSpellsProgram: exportMentions >= 1, exportListed: git(["ls-files", EXPORT]).toString("utf8").trim() === EXPORT, trackerExcluded: docsListing().excluded.includes(EXPORT) });
  },
  Q2: () => {
    const holders = [CENSUS, ROSTER_FILE];
    return json({
      residual: "R-TEST-TREE",
      holdersSpellProgram: holders.map(path => existsSync(join(REPO, path)) && mentionsIn(textOf(path)).length > 0),
      testTreeInDocScope: docsListing().paths.some(path => path.startsWith("test/")),
      testTreeInSrcScope: srcListing().paths.some(path => path.startsWith("test/")),
    });
  },
  Q3: () =>
    json({
      residual: "R-LOCKFILE",
      excludedByName: LOCKFILES.map(path => docsListing().excluded.includes(path)),
      integrityValueReadsAsMention: mentionsIn('"integrity": "sha512-gAt0S0DApoOXWQ=="'),
    }),
  Q4: () => {
    const plant = Buffer.concat([Buffer.from([0]), Buffer.from(" Pi ships an APO export. ", "utf8")]);
    const verdict = verdictOf("media/zz-plant.bin", plant);
    const markless = verdictOf("docs/zz-markless-utf16.md", Buffer.from("Pi ships an APO export.\n", "utf16le"));
    return json({
      residual: "R-BINARY",
      plantBinary: verdict.binary,
      plantReadings: [...verdict.readings],
      marklessUtf16: { binary: markless.binary, readings: [...markless.readings] },
      realBinariesAtFloor: docsVerdict().binaries.length >= FLOORS.binaries,
    });
  },
  Q5: () =>
    json({
      residual: "R-PARAPHRASE",
      quiet: quiet({ policyOrganization: "the MechanicalWorkflows policy-organization program", adaptiveOrganizations: "MW's adaptive organizations", described: "the program on organizations that adapt their policies" }, "docs/workbench/zz.md"),
    }),
  Q6: () => json({ residual: "R-LETTERED", quiet: quiet({ periods: "A.P.O.", spaces: "A P O", hyphens: "A-P-O", middleDots: `a${String.fromCodePoint(0xb7)}p${String.fromCodePoint(0xb7)}o` }, "docs/workbench/zz.md") }),
  Q7: () =>
    json({
      residual: "R-CONFUSABLE",
      quiet: quiet(
        {
          cyrillic: String.fromCodePoint(0x410, 0x420, 0x41e),
          greek: String.fromCodePoint(0x391, 0x3a1, 0x39f),
          smallCapitals: String.fromCodePoint(0x1d00, 0x1d18, 0x1d0f),
          negativeSquared: String.fromCodePoint(0x1f170, 0x1f17f, 0x1f17e),
          regionalIndicators: String.fromCodePoint(0x1f1e6, 0x1f1f5, 0x1f1f4),
          emojiShortcodes: ":a::parking::o2:",
          digitForLetter: "AP0",
        },
        "docs/workbench/zz.md",
      ),
    }),
  Q8: () => json({ residual: "R-BIDI", quiet: quiet({ rightToLeftOverride: `${String.fromCodePoint(0x202e)}OPA${String.fromCodePoint(0x202c)}` }, "docs/workbench/zz.md") }),
  Q9: () =>
    json({
      residual: "R-STYLE",
      quiet: quiet(
        {
          styleEscape: '<style>p::before { content: "\\41 PO"; }</style>',
          hiddenText: 'A<span style="display:none">x</span>PO',
          scriptWrite: '<script>document.write("A" + "PO");</script>',
        },
        "docs/workbench/zz.md",
      ),
    }),
  Q10: () => json({ residual: "R-INFLECTED", quiet: quiet({ camelPlural: "renderAposList", lowerPlural: "the apos", esPlural: "APOes" }, "docs/workbench/zz.md") }),
  Q11: () => json({ residual: "R-JOINED", quiet: quiet({ before: "apoexport", after: "exportapo", inside: "theapoexport" }, "docs/workbench/zz.md") }),
  Q12: () =>
    json({
      residual: "R-COMPUTED",
      quiet: quiet(
        {
          substitution: "export const n = `A$" + "{part}PO`;\n",
          runtimeJoin: 'export const n = ["A", "PO"].join("");\n',
          charCode: 'export const n = String.fromCharCode(65) + "PO";\n',
        },
        "src/workbench/zz.ts",
      ),
    }),
  Q13: () => json({ residual: "R-UNNAMED-SURFACE", quiet: quiet({ unnamedExport: "export function exportPolicyOrganizationTrace(snapshot: unknown): string {\n  return JSON.stringify(snapshot);\n}\n" }, "src/workbench/zz.ts") }),
  Q14: () => json({ residual: "R-OTHER-MARKUP", quiet: { restructuredText: quiet({ text: "A\\ *P*\\ O export" }, "docs/workbench/zz.rst").text, asciiDoc: quiet({ text: "A**P**O export" }, "docs/workbench/zz.adoc").text } }),
};

/** The constants the roster holds, read in one place (the judged-set case compares them). */
function constants(): JsonValue {
  return json({
    abbreviation: ABBREVIATION,
    slug: [...SLUG],
    slugForms: SLUG_FORMS.map(form => form.source),
    joinedSlug: { source: JOINED_SLUG.source, flags: JOINED_SLUG.flags },
    wordBreak: WORD_BREAK.source,
    readings: { script: SCRIPT.source, json: JSON_FILE.source, markdown: MARKDOWN.source, markup: MARKUP.source },
    namedReferences: NAMED_REFERENCES,
    styledLetter: STYLED_LETTER.source,
    accentedLetter: ACCENTED_LETTER.source,
    dash: DASH,
    requirement: REQUIREMENT,
    sourceTag: SOURCE_TAG,
    acceptance: ACCEPTANCE,
    armed: ARMED,
    src: SRC,
    outside: [...OUTSIDE],
    lockfiles: [...LOCKFILES],
    identity: IDENTITY,
    schemaLiteral: SCHEMA_LITERAL,
    docs12: DOCS12,
    floorSentence: FLOOR_SENTENCE,
    docsPages: DOCS_PAGES,
    filingPin: FILING_PIN,
    floors: FLOORS,
    srcPlant: SRC_PLANT,
    surfacePlants: SURFACE_PLANTS,
    docPlants: DOC_PLANTS,
    utf16Plants: UTF16_PLANTS,
    utf16Text: UTF16_TEXT,
    pinPlant: PIN_PLANT,
    residuals: RESIDUALS,
    readers: [...READERS],
  });
}
/** The text between two markers of this file (the self-read of the judged-set case). */
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  const to = from < 0 ? -1 : text.indexOf(end, from + start.length);
  return from < 0 || to < 0 ? "" : text.slice(from + start.length, to);
}

describe("wb-021.3 APO export census (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R3, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the cases and their own reads agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "Z:3", "Q:14"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const quoted = ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins);
    expect(Object.keys(QUOTES).sort(), "every pin of rows T and Z carries a quote").toEqual([...quoted].sort());
    expect(Object.keys(CLAIMS).sort(), "every quoted pin carries claims").toEqual([...quoted].sort());
    expect(
      ROSTER.rows.flatMap(row => row.pins).map(pin => ({ id: pin.id, quote: pin.quote, claims: pin.claims })),
      "the roster holds each pin's quote and claims",
    ).toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => ({ id: pin, quote: QUOTES[pin] ?? null, claims: CLAIMS[pin] === undefined ? null : json(CLAIMS[pin]) })));
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row").toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(constants()).toStrictEqual(ROSTER.constants);
    const block = between(readFileSync(SELF, "utf8"), "const IMPL: Readonly<Record<string, () => JsonValue>> = {", "\n};\n");
    expect({ rosterWitness: /\brosterWitness\b/.test(block), roster: /\bROSTER\b|readRoster/.test(block) }, "no case reads its own roster witness").toStrictEqual({ rosterWitness: false, roster: false });
    const cases = block.split(/\n {2}(?=[A-Z][A-Z0-9]*: \(\) =>)/).slice(1);
    const named = cases.map(body => [body.slice(0, body.indexOf(":")), READERS.some(reader => new RegExp(`\\b${reader}\\(`).test(body))]);
    expect(named, "every case names a reader of the subject").toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => [pin, true]));
    const bodies = new Map(cases.map(body => [body.slice(0, body.indexOf(":")), body] as const));
    expect(
      Object.entries(RESIDUALS).map(([family, pin]) => [pin, (bodies.get(pin) ?? "").includes(`residual: "${family}"`)]),
      "each residual's quiet row names its residual",
    ).toStrictEqual(Object.values(RESIDUALS).map(pin => [pin, true]));
  });

  it("the outside anchors: the bead's export row binds the rows, the quotes, the program's spellings and the armed clause, its owner filing the acceptance; docs/12 holds the floor; the filing pin is a commit", () => {
    const { title, notes } = exportRow(BEAD);
    const id = /^\[(MW-ADAPTIVE-POLICY-ORGANIZATIONS-R\d+)\] /.exec(title);
    expect(id?.[1], "the title opens with the bead's requirement id").toBe(REQUIREMENT);
    const statement = title.slice(id?.[0].length ?? 0);
    const label = (row: string): string => ROWS.find(entry => entry.id === row)?.label ?? "";
    expect(tiles(statement, [label("T"), ARMED, label("Z")], TITLE_SEPARATORS), "rows T and Z and the armed clause tile the title, in order").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its label`).toBe(true);
    }
    for (const [pin, claims] of Object.entries(CLAIMS)) expect(tiles(QUOTES[pin] ?? "", Object.keys(claims)), `${pin}'s claim terms tile its quote`).toBe(true);
    expect(/ships an (\S+) workbench/.exec(statement)?.[1], "the abbreviation is the title's token").toBe(ABBREVIATION);
    const words = (/^MW-(.+)-R\d+$/.exec(REQUIREMENT)?.[1] ?? "").toLowerCase().split("-");
    expect(words, "the slug is the requirement id's words").toEqual([...SLUG]);
    expect(
      SLUG_FORMS.map((form, at) => form.test(words[at] ?? "")),
      "each slug-word form accepts the requirement id's own word",
    ).toEqual(SLUG.map(() => true));
    expect(JOINED_SLUG.test(SLUG.join("")), "the joined slug accepts the words joined").toBe(true);
    const filing = ownerFiling(notes);
    expect(filing.source.startsWith("Owner filing (2026-10-19, program-triage-2026-10-18; source "), "the notes open with the owner filing").toBe(true);
    expect(occurrences(filing.source, SOURCE_TAG), "the filing's source line names the source tag once").toBe(1);
    expect(mentionsIn(SOURCE_TAG), "the source tag spells both names").toEqual(["adaptive policy organizations", "apo"]);
    expect(
      { closes: filing.body.endsWith(ACCEPTANCE), once: occurrences(filing.body, ACCEPTANCE) },
      "ACCEPTANCE is the owner filing's own closing sentence, once (never a later note's quote)",
    ).toStrictEqual({ closes: true, once: 1 });
    expect(textOf(DOCS12).includes(FLOOR_SENTENCE), "docs/12 holds the redaction-floor sentence the armed clause names").toBe(true);
    expect(ARMED.includes("the docs/12 redaction floor"), "the armed clause names docs/12's floor").toBe(true);
    expect(git(["cat-file", "-t", FILING_PIN]).toString("utf8").trim(), "the filing pin is a commit of this repository").toBe("commit");
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
          LIVE.set(pin, witness);
          const expected = rosterWitness(pin);
          REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
          expect(witness).toStrictEqual(expected);
        });
      }
    });
  }

  it("the registered tests, the reached pins and the claims equal the roster, in order and both ways", ({ task }) => {
    const walkedTests: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walkedTests.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walkedTests.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walkedTests.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walkedTests.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walkedTests)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walkedTests.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "every compare matched its roster witness",
    ).toEqual([]);
    const keys = (pin: string): string[] => {
      const witness = LIVE.get(pin);
      return isObject(witness) ? Object.keys(witness).sort() : [];
    };
    const facts = (pin: string): string[] => Object.values(CLAIMS[pin] ?? {}).flat();
    for (const pin of Object.keys(CLAIMS)) {
      expect(keys(pin), `${pin}'s live witness holds exactly its claimed facts`).toEqual([...facts(pin)].sort());
      expect(facts(pin).length, `${pin}'s facts each sit under one term`).toBe(new Set(facts(pin)).size);
    }
    const shown = Object.keys(CLAIMS).flatMap(claimed =>
      Object.keys(CLAIMS)
        .filter(other => other !== claimed && isDeepStrictEqual(keys(other), [...facts(claimed)].sort()))
        .map(other => `${other} shows ${claimed}'s claims`),
    );
    expect(shown, "the claims bound: no pin's live witness shows another pin's claims").toEqual([]);
  });
});
