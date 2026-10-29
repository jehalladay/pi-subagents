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
 * MEASURED (read-only, by the re-cutting seat, 2026-10-27, at fab8559: trunk 8450d6b merged into the branch, this census
 * and its roster tracked there; every count is over the scope the census reads, qa/ included). git lists 1036 files
 * (tracked plus untracked-not-ignored): src/ 116 (all .ts), test/ 699, .beads/ 11 and 210 outside src/, test/ and .beads/.
 * Of those 210 the two dependency locks are excluded by name (R-LOCKFILE: an integrity value in each, at line 4620, splits
 * into the word "Apo") and 208 are judged as docs: 5 binaries (two media files and the three vendored tarballs) and 203
 * text files, 104 of them markdown. By top-level entry the 210 are the root files 27 (package-lock.json among them),
 * .agents/ 2, .codex/ 2, .github/ 2, .pi/ 1, docs/ 77, examples/ 7, media/ 2, new-feedback/ 18, qa/ 67 and vendor/ 5
 * (vendor/dependency-lock.json among them). No src/ file and no judged doc spells the program in any reading below: the
 * trigger has not fired, so Pi ships no APO trace or evidence export. The tracker export spells it (the bead's own row and
 * its siblings'). At the filing pin b21beb0 (the ledger hop that added the bead to the export: its row is in that commit's
 * export and not in its parent's) the 293 files of both scopes (src/ 115 and 178 docs, qa/ 67 of them) spell it nowhere
 * either. No src, docs or tracker text is edited by this cut.
 *
 * THE JUDGE. A MENTION is either spelling of the program: the abbreviation (the title's "APO") as a whole alphanumeric run
 * in any case (APO, apo, aPo, each run of apo_pi_wb_03), as a word of a run split by the word-break rules (WORD_BREAKS: a
 * lower-to-upper case change, renderApoGraph; an upper-case letter before a capitalized word of two or more lower-case
 * letters, readAPOUsage; an upper-case letter before an upper-case one and a lower-case letter other than s, getAPOId, so an
 * acronym's plural keeps its s; a letter-digit boundary, APO2; a digit-letter boundary, 020APO) or as the acronym plural
 * "APOs" (two APOs, readAPOsList); or the slug (the requirement id's three words: adaptive, then policy or policies, then
 * organization or organisation in either number) as three consecutive words, or joined into one run
 * (adaptivepolicyorganizations). Each file is read in several READINGS, and a file's forms are the
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
 * so a real mention reds, and so does a judge, a reading or a scope verdict hollowed so that some plant's readings change
 * (every plant's readings are pinned). Which real findings a leg asserts is not pinned by the plants, and the probes
 * (PROBES) measure each case's outcome only: a leg, a judge or a listing that drops the findings of some real files and
 * not the plants', or that tells a probe from the plain run, is NOT CLAIMED (below).
 *
 * ROWS. T, the trigger clause, one pin per quoted part: T1 the src walk (every file git lists under src/, held equal to a
 * filesystem walk minus what git ignores) spells no mention, at a file floor, with a content-liveness anchor read from the
 * bytes its verdict records (the schema literal "workflow-script/v1" is a cooked string of src/workbench/identity.ts) and a
 * planted module found by the same call - ARMED: the census reds naming the acceptance as owed the moment src spells the
 * program; T2 the program's identity: the abbreviation is the title's own token and the slug the requirement id's words,
 * every spelling form read, each word-break rule the only reader of at least one form (an ablation: the judge run without
 * that one rule leaves the form unread), and the quiet words (apology, capo, apollo, &apos; and the slug's words incomplete
 * or out of order) not read; T3 the forms a trace or evidence export surface takes in src (a declaration, a capability id,
 * an escape-spelled string, a folded literal, a template and a path), each found in its readings. Z, the until-then duty, one
 * pin per quoted part: Z1 the trigger is unfired today and the same judge over the filing pin's objects reads no mention,
 * the pin being where the row was filed; Z2 every listed Pi doc (every listed file outside src/, test/ and .beads/, the two
 * locks excluded by name; held equal to a filesystem walk minus what git ignores) spells no mention in any reading, with
 * file, markdown and binary floors, the partition (every listed file is recorded as judged, whole, by exactly one of T1's
 * and Z2's scope verdicts or excluded by name: a listed file neither verdict records, and a file recorded twice, recorded
 * although excluded, recorded although unlisted or recorded with bytes other than its bytes on disk, each reds; the
 * partition compares the files git lists with the paths and bytes each verdict records, so a scope narrowed together with
 * the partition's own listing is NOT CLAIMED), content-liveness anchors read from the bytes Z2's scope verdict records
 * (every docs/workbench page opens with a level-1 heading in its rendered reading; docs/12's redaction-floor
 * sentence, the floor the armed clause names, is read) and one planted doc per reading found by the same call (two of them
 * UTF-16 docs, one per byte order); Z3 the claim: every mention counts (OVER-READ below), so a claim, a denial and a bare
 * mention each read; each reader-visible form the raw text splits (inline markup, a link, an image's alt text split by
 * inline markup, raw HTML with a quoted ">", a
 * comment, an HTML block, a list item, a table cell, a block quote, character references, a styled or accented letter's
 * reference, a soft hyphen, a zero-width space, a word joiner, a default-ignorable filler and a format control that is not
 * default-ignorable, compatibility forms, a combining mark, a precomposed accented letter, the backslash escapes \uXXXX,
 * \u{X...} and \xHH, a percent-encoded byte, and in an HTML page a comment closed at once ("<!-->", "<!--->") or by "--!>")
 * is read in its readings; and two forms are read in no reading: an HTML page whose unclosed comment hides the rest of it,
 * and a named reference rendering a visible character between the letters ("A&amp;PO"). Q, the residuals' pinned quiet
 * rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote, claims and witness, the constants (PROBE_OUTCOMES among them) and every registered test title - is
 * held to the out-of-file roster (test/fixtures/apo-export-roster.json).
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - its title, read after its requirement-id prefix,
 * is tiled in order by row T's label, the armed clause (ARMED) and row Z's label with nothing but separators (whitespace,
 * comma, semicolon, colon, period, parentheses, DASH) between them, and each row's pin quotes tile its label the same way,
 * so row T or Z, or one of their quoted pins, removed from ROWS, the literal, QUOTES, CLAIMS, IMPL, PROBE_OUTCOMES and the
 * roster together still reds (a pin folded into its neighbour does not: R-RETILED; a residual row is NOT CLAIMED); the
 * abbreviation is the title's token after "ships an " and the slug the requirement id's words; the filing's source tag
 * spells both; the owner filing is the notes' first two paragraphs (later notes are appended after them): its source line
 * names the source tag once and ACCEPTANCE is its closing sentence, once, so a weakened filing beside a later note quoting
 * the original reds; docs/12 holds the floor sentence; the filing pin is a commit of this repository (Z1 reads that its
 * export holds the row and its parent's does not).
 * CLAIMS: each quoted pin carries claims - terms tiling its quote, each naming the witness facts (top-level keys) that show
 * it; a pin's live witness holds exactly its claimed facts, each fact under one term, and no pin's live witness holds
 * another pin's claimed facts (the claims bound), so a case swap reds at the swapped pin's claims beside its roster witness.
 * SELF-READ (the judged-set case reads the cases from this file's own syntax tree, so a comment or a string names nothing):
 * no case of IMPL names the roster or its readers (ROSTER, readRoster, rosterWitness; Q2 reads ROSTER_FILE's text only as a
 * test-tree file that spells the program), the probes (probe, PROBES, PROBE_LINE, PROBE_OUTCOMES) or the run records (LIVE,
 * REACHED); every case calls one of READERS by name; and each residual's quiet row names its family. The self-read judges
 * the names in a case's syntax: what a call reads, and whether the witness a case returns comes from what it read, are not
 * judged (NOT CLAIMED).
 * PROBES (their own registered case, after the rows): every case runs again under each of four probes, each changing one
 * subject the cases read - blind (the judge reads no mention), saturated (the judge reads a mention in every non-empty
 * text), planted (every real file a scope judges, src/, the docs and the filing pin's objects alike, gains the line
 * PROBE_LINE) and untitled (the bead's export row reads with its title cut to the requirement-id prefix) - and its outcome
 * under each probe (throws; changes, its witness differing from its plain run's; or keeps) is held to PROBE_OUTCOMES and the
 * roster, and every case throws or changes under at least one probe. What the probes pin is each case's outcome profile
 * and nothing more: the census reds when a case's measured outcome under some probe differs from PROBE_OUTCOMES, or
 * when a case keeps under all four. For example, a case that returns its roster witness as a constant and calls only
 * readers no probe changes reds (it keeps under every probe), and T1, Z1 or Z2 with its scope's real findings replaced
 * by an empty set reds (each must throw under planted, and no longer does). The probes do not see which subject a case
 * reads or which of its findings it asserts: a case whose outcome profile is unchanged while its witness no longer
 * reads its own subject, in whole or in part, is NOT CLAIMED (below), whether or not it tells the probes from the plain
 * run. A src or doc file recorded with bytes other than its bytes on disk (cut or altered) reds through Z2's partition,
 * not through the probes.
 * RESIDUALS (named, each with its pinned quiet row): R-TRACKER the tracker export (.beads/) is not a Pi doc: the bead's own
 * row spells the program (Q1); R-TEST-TREE test/ is not a Pi doc: this census and its roster spell the program there (Q2);
 * R-LOCKFILE the two dependency locks are excluded by name, since an integrity value splits into the word "Apo" (Q3);
 * R-BINARY a file holding a NUL byte and no UTF-16 byte-order mark is read by its path only, so text inside an image, an
 * archive or a mark-less UTF-16 file is not read, and a UTF-32 file (its mark opens with UTF-16's) is decoded as UTF-16, its
 * letters read apart (Q4);
 * R-PARAPHRASE a description of the program that spells neither name is not read (Q5); R-LETTERED the abbreviation spelled
 * letter by letter with separators is not read (Q6); R-CONFUSABLE a letter from another script, a small capital, an emoji
 * letter (a negative squared letter, a regional indicator, a shortcode) or a digit standing for a letter is not read (Q7);
 * R-BIDI display reordering is not applied: a spelling reversed under a right-to-left override reads as written (Q8);
 * R-STYLE presentation that markup, a style sheet or a script applies is not applied: generated content (in a style element
 * or a style-sheet file), hidden text that joins the letters around it (a display:none span, a hidden attribute, a
 * template), a ruby annotation's text read inline between the letters, text a script writes (Q9); R-INFLECTED inflections
 * other than "APOs" (Apos, apos, APOes, APOS) are not read (Q10); R-JOINED the abbreviation joined to another word with no
 * case change or separator (apoexport, APOV1) is not read (Q11); R-COMPUTED a script's spelling assembled at runtime (a
 * template substitution, a join, a computed character) is not read (Q12); R-UNNAMED-SURFACE an export surface that spells
 * neither name is invisible to T (Q13); R-OTHER-MARKUP markup of another language (reStructuredText, AsciiDoc) and a
 * notebook's markdown cells are not rendered (Q14); R-NAMED-REFERENCE a named reference outside NAMED_REFERENCES and the
 * styled and accented letter families renders nothing, though a browser renders a letter for some (&angst;, &order;,
 * &ordf;, &ordm;) (Q15); R-OTHER-ESCAPE escape syntaxes outside \uXXXX, \u{X...}, \xHH and percent bytes are not decoded
 * (a YAML or TOML \U00000041, a Python \N{...} name, a shell octal \101) (Q16); R-SUFFIXED the abbreviation followed by a
 * lower-case suffix with no separator (APOv1, APOx) is not read: the case change reads as a capitalized word's first letter,
 * so the run splits as AP and Ov1 (Q17); R-RETILED the outside anchors bind the order and the words of the T and Z quotes,
 * not where one quote ends: a pin folded into its neighbour (removed, the neighbour re-quoted over both quotes and its claim
 * terms re-tiled, in this file and the roster together) still tiles the title (Q18).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together, its
 * claims rewritten with them; a plant or control edited in IMPL and the roster together; a floor or a scope constant changed
 * with the roster; a residual row removed from ROWS, the literal, IMPL, RESIDUALS, PROBE_OUTCOMES and the roster (no outside
 * anchor names the residual families); a pin folded into its neighbour (R-RETILED); a probe or PROBE_OUTCOMES edited with
 * the roster; the outside-anchor case, the probes case or the closing case removed with its roster title.
 * Nor, in edits of this file alone, any case, judge, reading, scope or partition edit that keeps every case's outcome
 * profile and every plant's readings while a case's witness stops reading its own subject, in whole or in part (the
 * probes pin outcome profiles, the self-read pins names, the plants pin the plants' readings). The known forms: a case
 * that tells a probe from the plain run and returns a constant, or discards findings, only in the plain run - through a
 * helper outside its own body, or inside its own body by what its readers return (the judge on a fixed text such as
 * "an APO view" or "apology", or a judged file's bytes such as docs/12's last line); a case whose witness is a constant
 * but for facts read from fixed texts or from subjects other than its own, which move under the probes as its own facts
 * would (a quiet row forcing all but one control; Z3 or Q1, whose outcome profiles hold no "changes", returning the
 * witness as a constant after asserting what the judge reads in fixed texts); a discard of part of a scope's real
 * findings - by path (the docs/workbench/ pages), by reading (findings kept only when read raw) or by content - in the
 * case, in the judge or in a scope's listing narrowed with the partition's, or a scope case asserting another scope's
 * real findings in place of its own, while under planted some real file it asserts still reads; and a single witness
 * fact forced to its plain value while the case's other facts still read their subject.
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
 * export (its wb-021.3 row; Q1 reads it whole), docs/workbench/12-security.md and src/workbench/identity.ts (liveness, from
 * the bytes the scope verdicts record), and this file and its roster (Q2; the self-read parses this file).
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
/** A run's word-break rules by name (THE JUDGE); T2's ablation holds each the only reader of some spelling form. */
const WORD_BREAKS: Readonly<Record<string, RegExp>> = {
  lowerUpper: /(?<=[a-z])(?=[A-Z])/,
  acronymBeforeWord: /(?<=[A-Z])(?=[A-Z][a-z]{2,})/,
  acronymBeforeLetter: /(?<=[A-Z])(?=[A-Z][a-rt-z])/,
  letterDigit: /(?<=[A-Za-z])(?=[0-9])/,
  digitLetter: /(?<=[0-9])(?=[A-Za-z])/,
};
/** Word-break rules joined into one pattern: a run's word boundaries. */
function wordBreakOf(rules: Readonly<Record<string, RegExp>>): RegExp {
  return new RegExp(Object.values(rules).map(rule => rule.source).join("|"));
}
const WORD_BREAK = wordBreakOf(WORD_BREAKS);
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
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", "Q16", "Q17", "Q18"] },
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
  T2: { "an APO": ["abbreviation", "abbreviationForms", "breakRules", "quietWords"], workbench: ["slugWords", "slugForms"] },
  T3: { "trace/evidence export": ["surfaceForms"] },
  Z1: { "until then": ["triggerFired", "filingPin", "filedAtPin", "absentBeforePin", "pinFilesAtFloor", "pinMentions", "pinPlant"] },
  Z2: { no: ["docMentions"], Pi: ["docScope", "excludedByName", "docWalkEqualsGit", "listedPartition"], doc: ["docsAtFloor", "markdownAtFloor", "binariesAtFloor", "docLiveness", "docPlants"] },
  Z3: { claims: ["overRead"], "an APO export exists": ["readerForms", "pageForms", "quietForms"] },
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
  "R-NAMED-REFERENCE": "Q15",
  "R-OTHER-ESCAPE": "Q16",
  "R-SUFFIXED": "Q17",
  "R-RETILED": "Q18",
};
/** The functions that read a subject: every case calls one by name (SELF-READ: a call in the case's own syntax tree). */
const READERS: readonly string[] = ["judgeScope", "verdictOf", "readingsOf", "quiet", "mentionsIn", "mentionsWith", "exportRow", "textOf", "git", "listedAll", "srcListing", "docsListing", "srcVerdict", "docsVerdict", "pinVerdict", "scriptUnits"];
/** The names no case may use (SELF-READ): the roster and its reader, the probes, and the run records. */
const UNNAMED_IN_CASES: readonly string[] = ["ROSTER", "readRoster", "rosterWitness", "probe", "PROBES", "PROBE_LINE", "PROBE_OUTCOMES", "LIVE", "REACHED"];

/** The probes (PROBES): each changes one subject the cases read, and the probes case re-runs every case under each. */
type Probe = "blind" | "saturated" | "planted" | "untitled";
const PROBES: readonly Probe[] = ["blind", "saturated", "planted", "untitled"];
/** The planted probe's line: appended to every real file a scope judges while that probe is in force. */
const PROBE_LINE = "\nPi ships an APO export.\n";
/** The probe in force while the probes case re-runs the cases; undefined in the plain run. */
let probe: Probe | undefined;
/** A case's outcome under a probe: it throws, its witness differs from its plain run's, or it keeps that witness. */
type Outcome = "throws" | "changes" | "keeps";
/** Each case's outcome under each probe, as the probes case measures it (held to the roster with the constants). */
const PROBE_OUTCOMES: Readonly<Record<string, Readonly<Record<Probe, Outcome>>>> = {
  T1: { blind: "changes", saturated: "throws", planted: "throws", untitled: "keeps" },
  T2: { blind: "throws", saturated: "throws", planted: "keeps", untitled: "changes" },
  T3: { blind: "throws", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Z1: { blind: "changes", saturated: "throws", planted: "throws", untitled: "keeps" },
  Z2: { blind: "changes", saturated: "throws", planted: "throws", untitled: "keeps" },
  Z3: { blind: "throws", saturated: "throws", planted: "keeps", untitled: "keeps" },
  Q1: { blind: "throws", saturated: "keeps", planted: "keeps", untitled: "keeps" },
  Q2: { blind: "changes", saturated: "keeps", planted: "keeps", untitled: "keeps" },
  Q3: { blind: "changes", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q4: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q5: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q6: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q7: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q8: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q9: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q10: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q11: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q12: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q13: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q14: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q15: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q16: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q17: { blind: "keeps", saturated: "changes", planted: "keeps", untitled: "keeps" },
  Q18: { blind: "keeps", saturated: "keeps", planted: "keeps", untitled: "changes" },
};

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
/** A value computed once per probe in force (the plain run included): the scope verdicts the probes change. */
function lazyPerProbe<T>(make: () => T): () => T {
  const held = new Map<string, T>();
  return () => {
    const key = probe ?? "plain";
    const cached = held.get(key);
    if (cached !== undefined) return cached;
    const value = make();
    held.set(key, value);
    return value;
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
/** One row of the tracker export (one JSON object per line), found by its id; the untitled probe cuts its title to the requirement-id prefix. */
function exportRow(id: string, text: string = textOf(EXPORT)): ExportRow {
  for (const line of text.split("\n")) {
    if (!line.includes(id)) continue;
    const parsed: unknown = JSON.parse(line);
    if (isObject(parsed) && parsed.id === id && typeof parsed.title === "string") {
      const title = probe === "untitled" ? (/^\[[^\]]*\]/.exec(parsed.title)?.[0] ?? "") : parsed.title;
      return { title, notes: typeof parsed.notes === "string" ? parsed.notes : "" };
    }
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

/** The mentions a text spells (THE JUDGE), each as spelled, sorted; the blind and saturated probes replace the judge. */
function mentionsIn(text: string): string[] {
  if (probe === "blind") return [];
  if (probe === "saturated") return text === "" ? [] : [ABBREVIATION];
  return mentionsWith(text, WORD_BREAK);
}
/** THE JUDGE with the given word-break rules (T2's ablation runs it with one rule removed). */
function mentionsWith(text: string, wordBreak: RegExp): string[] {
  const found = new Set<string>();
  const words: string[] = [];
  const isAbbreviation = (word: string): boolean => word.toLowerCase() === ABBREVIATION.toLowerCase() || word === `${ABBREVIATION}s`;
  for (const run of text.match(/[A-Za-z0-9]+/g) ?? []) {
    if (isAbbreviation(run)) found.add(run);
    if (JOINED_SLUG.test(run)) found.add(run.toLowerCase());
    for (const word of run.split(wordBreak)) {
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
  /** Every path judged, in the order judged (a path judged twice appears twice). */
  readonly paths: readonly string[];
  /** The bytes judged for each path (the liveness anchors and the partition read them). */
  readonly bytes: ReadonlyMap<string, Buffer>;
}
/** Judges an entry list in one call: the real entries first, then any planted ones. */
function judgeScope(entries: Iterable<Entry>): ScopeVerdict {
  let files = 0;
  let markdown = 0;
  const binaries: string[] = [];
  const findings: { [path: string]: Reading[] } = {};
  const paths: string[] = [];
  const judged = new Map<string, Buffer>();
  for (const { path, bytes } of entries) {
    files += 1;
    paths.push(path);
    judged.set(path, bytes);
    const verdict = verdictOf(path, bytes);
    if (verdict.readings.length > 0) findings[path] = [...verdict.readings];
    if (verdict.binary) binaries.push(path);
    else if (MARKDOWN.test(path)) markdown += 1;
  }
  return { files, markdown, binaries, findings, paths, bytes: judged };
}
/** A judged file's text, from the bytes its scope verdict records ("" for a path not judged, or judged as binary). */
function judgedText(verdict: ScopeVerdict, path: string): string {
  const bytes = verdict.bytes.get(path);
  return bytes === undefined ? "" : (decodedBytes(bytes) ?? "");
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
/** The real entries a scope judges: under the planted probe each gains PROBE_LINE. */
function asJudged(entries: Entry[]): Entry[] {
  return probe === "planted" ? entries.map(({ path, bytes }) => ({ path, bytes: Buffer.concat([bytes, Buffer.from(PROBE_LINE, "utf8")]) })) : entries;
}
function realEntries(paths: readonly string[]): Entry[] {
  return asJudged(paths.map(path => ({ path, bytes: readFileSync(join(REPO, path)) })));
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
const srcVerdict = lazyPerProbe((): ScopeVerdict =>
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
const docsVerdict = lazyPerProbe((): ScopeVerdict =>
  judgeScope([
    ...realEntries(docsListing().paths),
    ...Object.entries(DOC_PLANTS).map(([path, text]) => entry(path, text)),
    ...Object.entries(UTF16_PLANTS).map(([path, order]) => utf16Entry(path, order)),
  ]),
);

/** The partition (Z2): every listed file is judged whole by exactly one of T1's and Z2's scopes, or excluded by name. */
function listedPartition(): JsonValue {
  const plants = new Set([...srcPlantPaths(), ...docPlantPaths()]);
  const scopes = [srcVerdict(), docsVerdict()];
  const judged = scopes.flatMap(verdict => verdict.paths.filter(path => !plants.has(path)));
  const judgedSet = new Set(judged);
  const listed = new Set(listedAll().filter(path => existsSync(join(REPO, path))));
  const byName = (path: string): boolean => outside(path) || LOCKFILES.includes(path);
  const bytesOf = (path: string): Buffer | undefined => scopes.find(verdict => verdict.bytes.has(path))?.bytes.get(path);
  return json({
    unjudged: [...listed].filter(path => !judgedSet.has(path) && !byName(path)),
    judgedTwice: sorted(judged.filter((path, index) => judged.indexOf(path) !== index)),
    judgedExcluded: judged.filter(byName),
    judgedUnlisted: judged.filter(path => !listed.has(path)),
    judgedAltered: judged.filter(path => listed.has(path) && bytesOf(path)?.equals(readFileSync(join(REPO, path))) !== true),
  });
}

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
  return asJudged(entries);
}
const PIN_PLANT = "docs/workbench/zz-pin-plant.md";
/** Both scopes at the filing pin: every file of the pin's tree outside test/ and .beads/, the locks excluded by name. */
const pinVerdict = lazyPerProbe((): ScopeVerdict => {
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
    const identity = scriptUnits(IDENTITY, judgedText(verdict, IDENTITY));
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
      acronymBeforeWord: "readAPOUsage()",
      acronymBeforeLetter: "getAPOId()",
      plural: "two APOs",
      pluralInCamel: "readAPOsList()",
      possessive: "the APO's export",
      letterDigit: "APO2",
      digitLetter: "020APO",
      snake: "apo_pi_wb_03",
      prefixed: "MW-APO",
    };
    const slugForms: Readonly<Record<string, string>> = {
      programName: "adaptive-policy-organizations-2026-10-18",
      camel: "AdaptivePolicy-Organization",
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
    const forms = [...Object.entries(abbreviationForms).map(([form, text]) => [`abbreviation.${form}`, text] as const), ...Object.entries(slugForms).map(([form, text]) => [`slug.${form}`, text] as const)];
    const breakRules = Object.fromEntries(
      Object.keys(WORD_BREAKS).map(rule => {
        const without = wordBreakOf(Object.fromEntries(Object.entries(WORD_BREAKS).filter(([name]) => name !== rule)));
        return [rule, forms.filter(([, text]) => mentionsIn(text).length > 0 && mentionsWith(text, without).length === 0).map(([form]) => form)];
      }),
    );
    expect(Object.entries(breakRules).filter(([, sole]) => sole.length === 0), "every word-break rule is the only reader of some spelling form").toEqual([]);
    return json({ abbreviation, abbreviationForms: abbreviationRead, breakRules, quietWords: read(quietWords), slugWords, slugForms: slugRead });
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
    const pinMentions = findingsFor(verdict, [PIN_PLANT], false);
    expect(pinMentions, `the same judge reads no mention in the filing pin's objects (${FILING_PIN.slice(0, 12)})`).toEqual({});
    return json({
      triggerFired: Object.keys(trigger).length > 0,
      filingPin: FILING_PIN.slice(0, 12),
      filedAtPin: holds(git(["show", `${FILING_PIN}:${EXPORT}`]).toString("utf8")),
      absentBeforePin: !holds(git(["show", `${FILING_PIN}^:${EXPORT}`]).toString("utf8")),
      pinFilesAtFloor: verdict.files - 1 >= FLOORS.pinFiles,
      pinMentions,
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
      const first = marked.lexer(judgedText(verdict, path)).find(token => token.type !== "space");
      return first?.type === "heading" && (first as Tokens.Heading).depth === 1;
    };
    const floor = normalizedText(decodedText(renderedText(DOCS12, judgedText(verdict, DOCS12)))).replace(/\s+/g, " ");
    return json({
      docMentions: real,
      docScope: "every listed file outside src/, test/ and .beads/ (tracked plus untracked-not-ignored)",
      excludedByName: [...LOCKFILES],
      docWalkEqualsGit: listing.walkEqualsGit,
      listedPartition: listedPartition(),
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
      imageAlt: "![A**P**O](x.png)",
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
      defaultIgnorable: `A${String.fromCodePoint(0x3164)}PO`,
      formatControl: `A${String.fromCodePoint(0xfff9)}PO`,
      fullwidth: String.fromCodePoint(0xff21, 0xff30, 0xff2f),
      mathBold: String.fromCodePoint(0x1d400, 0x1d40f, 0x1d40e),
      combiningMark: `A${String.fromCodePoint(0x301)}PO`,
      precomposedAccent: `${String.fromCodePoint(0xc0)}PO`,
      backslashEscape: "\\u0041PO",
      bracedEscape: "\\u{41}PO",
      hexEscape: "\\x41PO",
      percentEncoded: "%41PO",
    };
    const readerForms = Object.fromEntries(Object.entries(forms).map(([form, text]) => [form, readingsOf(doc, `Pi ships an ${text} export.\n`)]));
    const pages: Readonly<Record<string, readonly [string, string]>> = {
      htmlBlockBogusComment: [doc, "<div>\nA<?x>PO export\n</div>\n"],
      htmlBlockSlashAttribute: [doc, '<div>\nA<span/title=">">P</span>O export\n</div>\n'],
      htmlPageUnquotedAttribute: ["docs/zz-page.html", "<p>A<span title=x>P</span>O export</p>\n"],
      htmlPageAbruptComment: ["docs/zz-page.html", "<p>A<!-->PO export</p>\n"],
      htmlPageAbruptDashComment: ["docs/zz-page.html", "<p>A<!--->PO export</p>\n"],
      htmlPageBangComment: ["docs/zz-page.html", "<p>A<!-- x --!>PO export</p>\n"],
      svgCdata: ["docs/zz-figure.svg", "<svg><text><![CDATA[A]]><![CDATA[PO]]> export</text></svg>\n"],
      listItem: [doc, "- Pi ships an A**P**O export.\n"],
      tableCell: [doc, "| a | b |\n| - | - |\n| Pi ships an A**P**O export. | x |\n"],
      blockQuote: [doc, "> Pi ships an A**P**O export.\n"],
    };
    const pageForms = Object.fromEntries(Object.entries(pages).map(([form, [path, text]]) => [form, readingsOf(path, text)]));
    expect(Object.entries({ ...readerForms, ...pageForms }).filter(([, readings]) => readings.length === 0), "every reader-visible form is read").toEqual([]);
    const hidden: Readonly<Record<string, readonly [string, string]>> = {
      htmlPageUnclosedComment: ["docs/zz-page.html", "<p>A<!--PO export</p>\n"],
      visibleReference: [doc, "Pi ships an A&amp;PO export.\n"],
    };
    const quietForms = Object.fromEntries(Object.entries(hidden).map(([form, [path, text]]) => [form, readingsOf(path, text)]));
    expect(
      Object.entries(quietForms).filter(([, readings]) => readings.length > 0),
      "an unclosed comment hiding the rest of a page, and a reference rendering a visible character between the letters, are read in no reading",
    ).toEqual([]);
    return json({ overRead, readerForms, pageForms, quietForms });
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
    const utf32 = verdictOf("docs/zz-utf32.md", Buffer.concat([Buffer.from([0xff, 0xfe, 0, 0]), Buffer.from([..."Pi ships an APO export.\n"].flatMap(letter => [letter.charCodeAt(0), 0, 0, 0]))]));
    return json({
      residual: "R-BINARY",
      plantBinary: verdict.binary,
      plantReadings: [...verdict.readings],
      marklessUtf16: { binary: markless.binary, readings: [...markless.readings] },
      utf32: { binary: utf32.binary, readings: [...utf32.readings] },
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
          hiddenAttribute: "A<span hidden>x</span>PO",
          template: "A<template>x</template>PO",
          rubyAnnotation: "A<ruby>P<rt>x</rt></ruby>O",
          scriptWrite: '<script>document.write("A" + "PO");</script>',
        },
        "docs/workbench/zz.md",
      ),
      styleSheet: quiet({ generatedContent: 'p::before { content: "\\41 PO"; }\n' }, "docs/workbench/zz.css"),
    }),
  Q10: () => json({ residual: "R-INFLECTED", quiet: quiet({ camelPlural: "renderAposList", lowerPlural: "the apos", esPlural: "APOes", capsPlural: "APOS" }, "docs/workbench/zz.md") }),
  Q11: () => json({ residual: "R-JOINED", quiet: quiet({ before: "apoexport", after: "exportapo", inside: "theapoexport", capsJoined: "APOV1" }, "docs/workbench/zz.md") }),
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
  Q14: () =>
    json({
      residual: "R-OTHER-MARKUP",
      quiet: {
        restructuredText: quiet({ text: "A\\ *P*\\ O export" }, "docs/workbench/zz.rst").text,
        asciiDoc: quiet({ text: "A**P**O export" }, "docs/workbench/zz.adoc").text,
        notebook: quiet({ text: '{"cells": [{"cell_type": "markdown", "source": ["A**P**O export"]}]}\n' }, "examples/zz.ipynb").text,
      },
    }),
  Q15: () => json({ residual: "R-NAMED-REFERENCE", quiet: quiet({ angstrom: "&angst;PO", scriptSmallO: "AP&order;", ordinals: "&ordf;p&ordm;" }, "docs/workbench/zz.md") }),
  Q16: () =>
    json({
      residual: "R-OTHER-ESCAPE",
      quiet: {
        yamlLongEscape: quiet({ text: 'note: "\\U00000041PO export"\n' }, "examples/zz.yaml").text,
        tomlLongEscape: quiet({ text: 'note = "\\U00000041PO export"\n' }, "examples/zz.toml").text,
        pythonNamedEscape: quiet({ text: 'NOTE = "\\N{LATIN CAPITAL LETTER A}PO export"\n' }, "qa/zz.py").text,
        shellOctalEscape: quiet({ text: "printf '\\101PO export'\n" }, "scripts/zz.sh").text,
      },
    }),
  Q17: () => json({ residual: "R-SUFFIXED", quiet: quiet({ versionSuffix: "the APOv1 export", letterSuffix: "the APOx export" }, "docs/workbench/zz.md") }),
  Q18: () => {
    const statement = exportRow(BEAD).title.replace(/^\[[^\]]*\] /, "");
    const quotesOf = (id: string): string[] => (ROWS.find(row => row.id === id)?.pins ?? []).map(pin => QUOTES[pin] ?? "");
    const folds: Record<string, boolean> = {};
    for (const id of ["T", "Z"]) {
      const pins = ROWS.find(row => row.id === id)?.pins ?? [];
      for (let at = 0; at + 1 < pins.length; at += 1) {
        const folded = (row: string): string[] => {
          const quotes = quotesOf(row);
          return row === id ? [...quotes.slice(0, at), `${quotes[at] ?? ""} ${quotes[at + 1] ?? ""}`, ...quotes.slice(at + 2)] : quotes;
        };
        folds[`${pins[at] ?? ""}+${pins[at + 1] ?? ""}`] = tiles(statement, [...folded("T"), ARMED, ...folded("Z")], TITLE_SEPARATORS);
      }
    }
    return json({ residual: "R-RETILED", quiet: folds });
  },
};

/** The constants the roster holds, read in one place (the judged-set case compares them). */
function constants(): JsonValue {
  return json({
    abbreviation: ABBREVIATION,
    slug: [...SLUG],
    slugForms: SLUG_FORMS.map(form => form.source),
    joinedSlug: { source: JOINED_SLUG.source, flags: JOINED_SLUG.flags },
    wordBreak: WORD_BREAK.source,
    wordBreaks: Object.fromEntries(Object.entries(WORD_BREAKS).map(([name, rule]) => [name, rule.source])),
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
    unnamedInCases: [...UNNAMED_IN_CASES],
    probes: [...PROBES],
    probeLine: PROBE_LINE,
    probeOutcomes: PROBE_OUTCOMES,
  });
}
/** The cases of IMPL by pin, read from this file's own syntax tree (the self-read: a comment or a string names nothing). */
function caseNodes(): Map<string, ts.Node> {
  const source = ts.createSourceFile(SELF, readFileSync(SELF, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found = new Map<string, ts.Node>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) found.set(property.name.text, property.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** What a case's syntax names: every identifier, every bare-name callee, and every `residual` property's string value. */
function namesIn(node: ts.Node): { readonly named: ReadonlySet<string>; readonly called: ReadonlySet<string>; readonly residuals: readonly string[] } {
  const named = new Set<string>();
  const called = new Set<string>();
  const residuals: string[] = [];
  const visit = (child: ts.Node): void => {
    if (ts.isIdentifier(child)) named.add(child.text);
    if (ts.isCallExpression(child) && ts.isIdentifier(child.expression)) called.add(child.expression.text);
    if (ts.isPropertyAssignment(child) && ts.isIdentifier(child.name) && child.name.text === "residual" && ts.isStringLiteral(child.initializer)) residuals.push(child.initializer.text);
    ts.forEachChild(child, visit);
  };
  visit(node);
  return { named, called, residuals };
}

describe("wb-021.3 APO export census (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R3, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the cases and their own reads agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "Z:3", "Q:18"]);
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
    const pins = ROWS.flatMap(row => row.pins);
    const nodes = caseNodes();
    expect([...nodes.keys()].sort(), "every case of IMPL is read from this file's own syntax tree").toEqual([...pins].sort());
    const names = new Map([...nodes].map(([pin, node]) => [pin, namesIn(node)] as const));
    expect(
      pins.map(pin => [pin, UNNAMED_IN_CASES.filter(name => names.get(pin)?.named.has(name) === true)]),
      "no case names the roster or its reader, the probes or the run records",
    ).toStrictEqual(pins.map(pin => [pin, []]));
    expect(
      pins.map(pin => [pin, READERS.some(reader => names.get(pin)?.called.has(reader) === true)]),
      "every case calls one of READERS by name",
    ).toStrictEqual(pins.map(pin => [pin, true]));
    expect(
      Object.entries(RESIDUALS).map(([family, pin]) => [pin, names.get(pin)?.residuals.includes(family) === true]),
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

  it("the probes: every case re-run under each probe throws, changes or keeps its witness as PROBE_OUTCOMES holds", { timeout: 900_000 }, () => {
    const pins = ROWS.flatMap(row => row.pins);
    expect(pins.filter(pin => !LIVE.has(pin)), "every case ran plainly before the probes").toEqual([]);
    const outcomeOf = (pin: string, each: Probe): Outcome => {
      probe = each;
      try {
        const impl = IMPL[pin];
        if (impl === undefined) throw new Error(`no case for ${pin}`);
        return isDeepStrictEqual(json(impl()), LIVE.get(pin)) ? "keeps" : "changes";
      } catch {
        return "throws";
      } finally {
        probe = undefined;
      }
    };
    const measured = Object.fromEntries(pins.map(pin => [pin, Object.fromEntries(PROBES.map(each => [each, outcomeOf(pin, each)]))]));
    expect(probe, "the plain run is restored after the probes").toBeUndefined();
    expect(Object.keys(PROBE_OUTCOMES), "PROBE_OUTCOMES holds every case, in row order").toEqual(pins);
    expect(measured, "each case's outcome under each probe").toStrictEqual(PROBE_OUTCOMES);
    expect(pins.filter(pin => PROBES.every(each => PROBE_OUTCOMES[pin]?.[each] === "keeps")), "every case throws or changes under at least one probe").toEqual([]);
  });

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
