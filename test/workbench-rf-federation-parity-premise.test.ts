/**
 * wb-a9l2.1 (RF-HARNESS2-FEDERATED-PEER-R1, program-triage-2026-10-22): no Pi surface or Pi-hosted bead treats the rf
 * audit's claim h2fp-C004 as a premise or asserts rf federation disabled-mode parity. The claim is UNDETERMINED at the
 * audit pin 740c1a817, and Pi echoes that verdict verbatim, never a status of its own.
 *
 * Source (the owner filing quotes it): "UNDETERMINED claims the program should settle (1); each names the missing
 * artifact. UNDETERMINED is a result, not permission to guess: no bead treats these as premises."
 * harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:53@6a251bf73af5. BEADS:57 lists h2fp-C004 "Agents continue
 * using RF-CLI normally before, during and after integration (disabled-mode parity)." with the missing artifact "the
 * NEG-05 fixture (H2-05a)"; BEADS:3 says every statement there carries the pin main 740c1a817 (UNDETERMINED at that pin).
 * Acceptance (owner filing, verbatim): "(a) a hermetic guard asserts no Pi src/docs/test/qa string asserts rf federation
 * disabled-mode parity (or 'agents continue using RF-CLI normally') as established while the fixture path is absent from
 * the pinned rf tree; (b) once the fixture lands, a parity claim is admitted only with a receipt naming the rf sha and
 * the executed forge test command exiting 0; (c) a Pi bead note or docs row citing h2fp-C004 carries UNDETERMINED
 * verbatim and the 740c1a817 pin, never a Pi-minted status."
 *
 * READINGS
 * - MENTION: a match of one of the claim's FAMILIES in the folded text of a block (a maximal run of non-blank lines; a
 *   line of white space only is blank, row R8) of a scanned file, or in one exported bead row, never joined to a letter
 *   or a digit before or after it (rows N07, N18). The families: the claim id; "disabled-mode parity"; "using RF-CLI
 *   normally" (README:7 and BEADS:57; use, uses, using or used, an optional "the", and the rf spellings rf, RF-CLI,
 *   RFCLI, ReactiveFiber CLI, ReactiveFiberCLI and Reactive Fiber CLI: rows F01, F04, F64, F65); and NEG-05's own
 *   sentence "leaves existing RF-CLI graph and agent usage unchanged" with the same optional "the" and rf spellings
 *   (README:47, DEVELOPER:50; rows F03, F64). Those are the program's three wordings of the claim at the rf pin, plus
 *   its id.
 * - FOLDED TEXT: the decoded set first, each form read as its code point (up to U+10FFFF): a decimal character
 *   reference of one to seven digits (&#45;), a hex one of one to six digits in either case after x or X (&#x2d;,
 *   &#X2D;), one of the fourteen NAMED_REFERENCES names (&shy;), and the JS escapes \u{X} of one to six hex digits,
 *   \uXXXX and \xHH, hex digits in either case (rows F45, F46, F52-F55: every name, both cases, each width bound, a
 *   code point past U+FFFF and a form standing for a letter); then NFKC (rows F09, F66), lower case, every run of
 *   ASCII punctuation, space, tab, line feed or carriage return one space (rows F57, F58), every other code point (a
 *   non-ASCII one or another ASCII control) one wildcard (rows F07, F08, N21); a block's lines are folded one by one
 *   and joined by a space. A word of a family reads as itself, with one letter read as a wildcard (any letter, the
 *   first and the last included: rows F07, F34, F56), or with one to three spaces or wildcards between two of its
 *   letters (any two, after the first letter and before the last included: rows F08, F51, F56; four is past the
 *   bound, N14), and the words of a phrase, those of a two- or three-word rf spelling included, stand one to four
 *   spaces or wildcards apart (SEPARATOR: rows F48-F50, F65; five is past the bound, N13 and N21; a line join can
 *   leave two or three spaces between them, F49): a hyphen, a line break inside a block, emphasis inside a word, a
 *   look-alike letter, an inserted invisible or a hyphen encoded in the decoded set hides no mention, while a run of
 *   wildcards never reads as a word. A hyphen encoded outside that set can hide one (residuals R10 and R13). Required
 *   text is never folded: the verdict word and the pin are matched exactly, as whole words (rows F22, F39-F41,
 *   F59-F62).
 * - WINDOW: a mention is judged on the raw lines its phrase spans, never on the rest of its block, so an echo on
 *   another line or in another table row does not cover it (rows F36-F38, F43), while an echo on any line it spans,
 *   the first or the last, does (rows N02, N19).
 * - ECHO: a window that carries the verdict word as a whole upper-case word, the audit pin as a whole lower-case hex
 *   token (or a longer one that extends it, up to a full 40-hex sha: rows N03, N20, F60) and no other grade (each of
 *   MINTED_GRADES as a whole upper-case word: rows F15, F21, F23, F63; a grade inside a longer word is none, N15-N17).
 * - (a) While the fixture is absent at the pin (FIXTURE_AT_PIN, measured), a scanned mention whose window is not an echo
 *   is refused: unechoed-claim. The guard does not tell an assertion from a negation or a quotation, so every mention
 *   in the four trees is an echo or it is refused (row F12).
 * - (b) Once a later cut re-measures the rf tree and records the fixture present, a scanned mention whose window is not
 *   an echo is admitted only when the first receipt the window names (docs/workbench/receipts/<file>.md, the name in
 *   letters of either case, digits, dots, hyphens or underscores) exists, names "rf sha <12-40 hex>" (lower-case hex,
 *   rf as a whole word) and carries FIXTURE_COMMAND exactly (no further flag: the command then the end of its line, a
 *   closing mark ` ' " ) ] . , or ;, or white space then the end of the line, an arrow or a word) with "exit 0", as
 *   written and whole, after it on its line; otherwise receipt-not-cited, receipt-absent, receipt-no-rf-sha,
 *   receipt-no-command, receipt-no-exit-0. While the fixture is absent no receipt admits a mention (row F16). Until
 *   FIXTURE_AT_PIN flips, (b) is exercised by rows F24-F31, F67, F68, N08 and N22; the live scan already reads the
 *   receipts directory (RECEIPTS_FLOOR) for that flip.
 * - (c) A scanned claim-id mention also draws echo-no-undetermined, echo-no-pin and echo-minted-status for what its
 *   window lacks, receipt or not (row F31). An exported bead row (.beads/issues.jsonl: every string value of the row,
 *   nested ones included) with a claim-id mention draws echo-no-undetermined and echo-no-pin: bead rows are judged at row
 *   granularity on those two required tokens only, because collector and gate notes accumulate on a filing's own row
 *   (residuals R4, R5). An export line that does not parse is a finding of its own, never skipped (row F44).
 * - SCOPE: the four trees the filing names, walked from disk with dot directories (node_modules, dist and .git skipped;
 *   a symlink is refused, never followed); FLOORS count the walked files per tree and extension. This file is the one
 *   exemption (its falsifier inputs spell the refused forms on purpose), and the exemption is load-bearing: lifted, the
 *   scan reads this file's mentions as refused.
 * - PIN STATE (measured at this cut: git ls-tree -r at rf 6a251bf73af5 lists no tests/journeys/test_federation_disabled_parity.py):
 *   FIXTURE_AT_PIN is absent. A later cut that re-measures the rf tree flips it, never this guard's readers.
 * FINDING: `<path>:<line> <family>: <diagnoses>` per refused mention (line = the first line its phrase spans),
 * `<bead id> claim-id: <diagnoses>` per refused bead row, `line <n> unreadable` per export line that does not parse.
 * OUTSIDE ANCHORS. The owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-a9l2.1) carries every
 * pinned constant verbatim, names the scan trees ("no Pi src/docs/test/qa string") and the fixture's absence ("git
 * ls-tree at 6a251bf73af5 has no such file"), and its quoted spellings read as mentions of their families. The
 * out-of-file roster test/fixtures/rf-federation-parity-premise-roster.json carries every judged row (table, id,
 * registered test, findings, input digest) and the residual families; the roster case judges the in-file rows and this
 * file's registered tests (vitest's task tree) against it, in order and both ways, so a row removed from every literal
 * of this file still reds. Not claimed: an edit of this file and the roster together.
 * FROZEN SHAPE (standing rule 16): one row pins every judged row (table, id, findings, input digest prefix), the family
 * slots, the grades, the trees, the floors, the exemption, the decoded references, the residual families and the
 * tolerance bounds (SEPARATOR, and the in-word gap as tolerantWord's forms for a two-letter word) as literals read at
 * this cut.
 * RESIDUALS (named; each has a pinned quiet row): R1 a paraphrase outside the four families; R2 a phrase assembled at
 * runtime around another token; R3 ASCII look-alikes (1 for l, 0 for o), two alterations in one word, or one code point
 * standing for several letters; R4 a bead row naming a family but not the claim id (wb-a9l2.6 quotes README:51's
 * release condition so); R5 bead-row granularity: a later note on a row that already carries both tokens, and grades in
 * a bead row; R6 files outside the four trees; R7 status prose (lower-case or negated grade words) beside a verbatim
 * echo; R8 a phrase split across a blank line; R9 echo tokens on a mention's own lines admit it, whatever they qualify;
 * R10 a named character reference outside NAMED_REFERENCES; R11 joined words: a phrase's words, or the claim id's two
 * parts, written with no separator between them (camelCase, PascalCase or upper-case identifiers, or one hyphen dropped
 * between two words); R12 inflection and deletion: another form of a family word (leave, leaving or left for NEG-05's
 * leaves; the plural parities) or a dropped letter; R13 a hyphen encoded outside the decoded set (percent-encoded, a
 * numeric or named reference without its semicolon, an octal escape, a reference or braced escape with more digits
 * than the decoded set reads, or an ampersand that is itself encoded).
 * FOLLOW-UP wb-wfpj (landing 255 PREP F1 MEDIUM + F2 LOW; riders F5 and F9; F4 rides). The pinned set it adds, by row
 * id, with the falsifier that turns each red (measured at this cut on in-place throwaway edits):
 * - R11-R13, quiet rows for the three unnamed families of PREP F1. Each carries every gate probe of its family, one
 *   file per probe in the tree that probe used (R11: U01-U03, J01-J05; R12: J06-J08, J11, J15, J16; R13: U04, U17,
 *   U19), so a reader change that closes any one of them reds its row: a camelCase split or joined words admitted
 *   (R11), inflected slots or a dropped-letter form (R12), and decoders for those three encodings (R13) each did.
 * - F48 (six non-ASCII separators: soft hyphen, U+2011, U+2010 inside the claim id, U+2013, a zero-width space beside
 *   a space, a no-break space beside a zero-width space), F49 (line joins leaving two and three spaces: a JSDoc
 *   continuation, a markdown list continuation, a hyphen broken across JSDoc lines), F50 (a four-character separator)
 *   and F51 (two- and three-character gaps inside a word) are refused. The PREP survivors red them: M05 (SEPARATOR one
 *   space) F48-F50, M29 (one or two) F49-F50, M29b (spaces only) F48 and F50, M28 (an in-word gap of one) F51.
 * - N13 (a five-character separator) and N14 (a four-character gap inside a word) stay quiet, the far side of each
 *   bound: a separator of up to five reds N13, a gap of up to four reds N14. N15: a grade at the start of a longer
 *   word (PROVENANCE) is no grade; OB2 (grades matched inside longer words) reds it.
 * - The frozen shape pins SEPARATOR and the in-word gap; deleting that pin together with M29 or M28 still reds F49-F50
 *   or F51.
 * CUT 2 (refusal #1 of wb-wfpj: U1, U2, U3 and the class-level guard over READINGS). The pinned set it adds, by row id,
 * with the one-edit reader hollowing that turns each red (measured at this cut on in-place throwaway edits; each also
 * reds the roster):
 * - U1, the decoded set: F52 (hex references: x and X, digits in either case, one, two, four, five and six digits, a
 *   letter and a code point past U+FFFF), F53 (decimal: one, four and seven digits, a letter), F54 (each of the
 *   fourteen NAMED_REFERENCES names) and F55 (JS escapes: braced of one to six digits in either case, a letter and a
 *   code point past U+FFFF; \uXXXX and \xHH in either case, a letter) are refused. G-DEC-HEX, G-DEC-HEXUP, x-only
 *   and X-only prefixes, hex digits narrowed to one case or to decimal, each narrowed width, a base-10 hex parse, code
 *   points capped at U+FFFF, G-JS-BRACED, its digit cases and widths, the \uXXXX and \xHH digit cases, a base-10
 *   escape parse and each name decoded to nothing (G-NAMED-*, all fourteen) red them.
 * - U2: N15-N17, a grade inside a longer word is no grade: at its start before an upper-case letter (N15) or a
 *   lower-case letter or a digit (N17: CONFIRMEDly, VERIFIED2), and at its end after an upper-case letter, a
 *   lower-case letter or a digit (N16: UNVERIFIED, UNCONFIRMED, UNSETTLED, preVERIFIED, 2VERIFIED). G-MW-LB (the
 *   leading boundary dropped) and each whole range dropped from either boundary red N15, N16 or N17.
 * - U3: F56, the in-word gap after a word's first letter and before its last, and the one-letter wildcard at its first
 *   and last letters; G-GAP-POS-START, G-GAP-POS-END, G-WILD-POS-START and G-WILD-POS-END red it, so the coordinated
 *   hollows CO-GAP-START, CO-GAP-END and CO-WILD-START (each also editing the bound literal) red too.
 * - The class-level guard: F57 (runs of five tabs, carriage returns or marks of each ASCII punctuation range), F58 (a
 *   bead row's claim id split by a run of blank lines), F59 (the verdict joined to a letter or a digit), F60 (the pin
 *   after a letter or a digit or before a letter, extended in upper case, or extended past a full sha), F61 and F62 (a
 *   fullwidth verdict or pin digit, in a file and in a bead row), F63 (each minted grade), F64 (use, uses, used and
 *   both families' optional "the"), F65 (the rf spellings RFCLI, ReactiveFiber CLI, ReactiveFiberCLI and Reactive
 *   Fiber CLI, and a two- or three-word spelling's words four wildcards apart) and F66 (a precomposed letter between
 *   two words) are refused; N18 (a phrase joined to a letter or a digit), N19 (an echo on a mention's first line), N20
 *   (the pin extended to a full sha) and N21 (five ASCII controls between two words) stay quiet; R8 gains a line of
 *   white space only and R13 gains a hex and a named reference without the semicolon, a seven-digit hex, an
 *   eight-digit decimal and a seven-digit braced form, and an ampersand encoded as &amp;. The hollowings measured at this cut each red one of them: each alternative dropped
 *   from a family slot that has several (the verbs, the optional "the", the rf spellings), each whole range
 *   (upper-case letters, lower-case letters or digits) dropped from a word boundary, each width bound moved by one
 *   (save a lower bound of one moved to zero: the decoders and the in-word gap then read the same text, an
 *   equivalent edit), each case of hex letters dropped, each ASCII range, tab, line feed or carriage return dropped
 *   from the punctuation class, each window edge moved by a line, NFC, NFD or NFKD for NFKC, NFKC applied to the
 *   verdict or the pin, and each grade dropped with its frozen literal.
 * - (b): F67 (an rf sha of eleven or forty-one hex digits, in upper case, or after a letter) and F68 (an exit other than
 *   exit 0 as written, the command ending its line, with or without trailing white space) draw their diagnosis, and
 *   N22 (receipt names with capitals, digits, dots and an underscore, a twelve-hex rf sha, each closing mark, and an
 *   arrow or a word after the command) is admitted; each width bound moved by one, each boundary dropped, hex in
 *   either case, exit 0 in any case, each closing mark, the arrow, the word, the end of the line and each name
 *   character kind dropped red one of them.
 * A narrower edit than those (one letter or digit dropped from inside a boundary's range, one mark from inside a
 * punctuation range, one hex letter from a case) is NOT CLAIMED by this census.
 * Other spellings of the R11-R13 families are NOT CLAIMED by a quiet row of their own; the F4 boundary above (an edit
 * of this file and the roster together) is unchanged.
 * Display paths added: none. This file is test-only: it spawns nothing and writes nothing; it reads the four trees, the
 * receipts directory, the bead export and the roster fixture.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = relative(ROOT, fileURLToPath(import.meta.url)).split(sep).join("/");
const BEAD = "wb-a9l2.1";
const BEAD_EXPORT = ".beads/issues.jsonl";
const RECEIPTS_DIR = "docs/workbench/receipts";
const ROSTER = "test/fixtures/rf-federation-parity-premise-roster.json";

/** The rf audit's claim, its verdict and the audit pin (BEADS-2026-10-21.md:3, :53 and :57 at RF_PIN). */
const CLAIM_ID = "h2fp-C004";
const AUDIT_STATUS = "UNDETERMINED";
const AUDIT_PIN = "740c1a817";
/** The rf tree the owner triage read, the gating bead and its fixture (BEADS-2026-10-21.md:13 at RF_PIN). */
const RF_PIN = "6a251bf73af5";
const GATING_BEAD = "rfc-lr9nu.1";
const FIXTURE_PATH = "tests/journeys/test_federation_disabled_parity.py";
const FIXTURE_COMMAND = `forge test --files ${FIXTURE_PATH} -- --no-cov`;

interface FixtureState {
  readonly state: "absent" | "present";
  readonly rfSha: string;
}
/** Measured: the owner triage and this cut's git ls-tree at RF_PIN find no FIXTURE_PATH. */
const FIXTURE_AT_PIN: FixtureState = { state: "absent", rfSha: RF_PIN };
const FIXTURE_LANDED: FixtureState = { state: "present", rfSha: "0123456789ab" };

const TREES = ["src", "docs", "test", "qa"] as const;
type Tree = (typeof TREES)[number];
/** Walked files per tree and extension, well under the counts at this cut; fewer means the walk lost a kind of file. */
const FLOORS: Readonly<Record<Tree, Readonly<Record<string, number>>>> = {
  src: { ".ts": 80 },
  docs: { ".md": 40 },
  test: { ".ts": 300, ".md": 15, ".json": 10, ".mjs": 3 },
  qa: { ".mjs": 40, ".sh": 3 },
};
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
const EXEMPT: readonly string[] = ["test/workbench-rf-federation-parity-premise.test.ts"];
/** Lifted, the exemption must expose at least this many refused mentions in this file (its falsifier inputs). */
const MIN_SELF_FINDINGS = 30;
/** The bead export and the receipts directory hold well over this many rows and files. */
const EXPORT_FLOOR = 100;
const RECEIPTS_FLOOR = 30;
const MINTED_GRADES = ["CONFIRMED", "PLAUSIBLE", "REFUTED", "VERIFIED", "ESTABLISHED", "SETTLED", "PROVEN"] as const;

const RF_SPELLINGS = ["rf cli", "rfcli", "rf", "reactivefiber cli", "reactivefibercli", "reactive fiber cli"];
/** A family is a sequence of slots; a slot lists its alternative word sequences, and "" makes the slot optional. */
interface Family {
  readonly id: string;
  readonly slots: readonly (readonly string[])[];
}
const FAMILIES: readonly Family[] = [
  { id: "claim-id", slots: [["h2fp"], ["c004"]] },
  { id: "mode-parity", slots: [["disabled"], ["mode"], ["parity"]] },
  { id: "rf-normally", slots: [["use", "uses", "using", "used"], ["", "the"], RF_SPELLINGS, ["normally"]] },
  { id: "neg-05", slots: [["leaves"], ["", "the"], ["existing"], RF_SPELLINGS, ["graph"], ["and"], ["agent"], ["usage"], ["unchanged"]] },
];

/** Between two words of a phrase: one to four spaces or wildcards. */
const SEPARATOR = "[ ?]{1,4}";
/**
 * One word as itself, with one letter read as a wildcard, or with one to three spaces or wildcards between two of its
 * letters. Every form keeps all but at most one letter literal, so a run of wildcards never reads as a word, and the
 * bounded alternation cannot backtrack catastrophically.
 */
function tolerantWord(word: string): string {
  const letters = [...word];
  const forms = [word];
  for (let index = 0; index < letters.length; index++) forms.push([...letters.slice(0, index), "\\?", ...letters.slice(index + 1)].join(""));
  for (let index = 1; index < letters.length; index++) forms.push(`${letters.slice(0, index).join("")}[ ?]{1,3}${letters.slice(index).join("")}`);
  return `(?:${forms.join("|")})`;
}
function familySource(family: Family): string {
  const slots = family.slots.map(slot => ({
    pattern: `(?:${slot
      .filter(alternative => alternative !== "")
      .map(alternative => alternative.split(" ").map(tolerantWord).join(SEPARATOR))
      .join("|")})`,
    optional: slot.includes(""),
  }));
  const body = slots.map((slot, index) => (index === 0 ? slot.pattern : slot.optional ? `(?:${SEPARATOR}${slot.pattern})?` : `${SEPARATOR}${slot.pattern}`)).join("");
  return `(?<![a-z0-9])${body}(?![a-z0-9])`;
}
const PATTERNS: readonly (readonly [string, RegExp])[] = FAMILIES.map(family => [family.id, new RegExp(familySource(family))]);
const GLOBAL_PATTERNS: readonly (readonly [string, RegExp])[] = FAMILIES.map(family => [family.id, new RegExp(familySource(family), "g")]);
const STATUS_WORD = new RegExp(`(?<![A-Za-z0-9])${AUDIT_STATUS}(?![A-Za-z0-9])`);
const PIN_WORD = new RegExp(`(?<![0-9A-Za-z])${AUDIT_PIN}[0-9a-f]{0,31}(?![0-9A-Za-z])`);
const MINTED_WORD = new RegExp(`(?<![A-Za-z0-9])(?:${MINTED_GRADES.join("|")})(?![A-Za-z0-9])`);
const RECEIPT_REF = /docs\/workbench\/receipts\/([A-Za-z0-9._-]+\.md)/;
const RF_SHA = /(?<![A-Za-z0-9])rf sha [0-9a-f]{12,40}(?![0-9a-f])/;
/** What may follow the exact command on its line: nothing, a closing mark, or white space then no further flag. */
const COMMAND_END = /^(?:$|[`'")\].,;]|[ \t]+(?:$|->|[^\s-]))/;
const EXIT_ZERO = /(?<![A-Za-z0-9])exit 0(?![0-9])/;

/** The named character references decoded before folding (HTML names for the marks a phrase could hide behind). */
const NAMED_REFERENCES: ReadonlyMap<string, string> = new Map([
  ["amp", "&"],
  ["lt", "<"],
  ["gt", ">"],
  ["quot", '"'],
  ["apos", "'"],
  ["nbsp", String.fromCodePoint(0xa0)],
  ["shy", String.fromCodePoint(0xad)],
  ["hyphen", String.fromCodePoint(0x2010)],
  ["dash", String.fromCodePoint(0x2010)],
  ["ndash", String.fromCodePoint(0x2013)],
  ["mdash", String.fromCodePoint(0x2014)],
  ["minus", String.fromCodePoint(0x2212)],
  ["zwj", String.fromCodePoint(0x200d)],
  ["zwnj", String.fromCodePoint(0x200c)],
]);
const codePoint = (value: number, raw: string): string => (Number.isInteger(value) && value >= 0 && value <= 0x10ffff ? String.fromCodePoint(value) : raw);
function decodeReferences(text: string): string {
  return text
    .replace(/&#[xX]([0-9a-fA-F]{1,6});|&#([0-9]{1,7});/g, (raw: string, hex: string | undefined, decimal: string | undefined) => codePoint(hex !== undefined ? Number.parseInt(hex, 16) : Number.parseInt(decimal ?? "", 10), raw))
    .replace(/&([A-Za-z]+);/g, (raw: string, name: string) => NAMED_REFERENCES.get(name) ?? raw)
    .replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g, (raw: string, braced: string | undefined, four: string | undefined, two: string | undefined) => codePoint(Number.parseInt(braced ?? four ?? two ?? "", 16), raw));
}

/** References and escapes decoded, NFKC, lower case, ASCII punctuation and white space runs one space, every other code point one wildcard. */
function fold(text: string): string {
  return decodeReferences(text)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\t\n\r\x20-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]+/g, " ")
    .replace(/[^a-z0-9 ]/gu, "?")
    .replace(/ {2,}/g, " ");
}

/** The families the folded text mentions, in FAMILIES order. */
function familiesOf(text: string): string[] {
  const folded = fold(text);
  return PATTERNS.filter(([, pattern]) => pattern.test(folded)).map(([id]) => id);
}

type Diagnosis =
  | "echo-no-undetermined"
  | "echo-no-pin"
  | "echo-minted-status"
  | "unechoed-claim"
  | "receipt-not-cited"
  | "receipt-absent"
  | "receipt-no-rf-sha"
  | "receipt-no-command"
  | "receipt-no-exit-0";

/** (b): what the first receipt a window names lacks; empty when it admits the mention. */
function receiptFindings(window: string, receipts: ReadonlyMap<string, string>): Diagnosis[] {
  const cited = RECEIPT_REF.exec(window);
  if (cited === null) return ["receipt-not-cited"];
  const receipt = receipts.get(cited[1] ?? "");
  if (receipt === undefined) return ["receipt-absent"];
  const found: Diagnosis[] = [];
  if (!RF_SHA.test(receipt)) found.push("receipt-no-rf-sha");
  const runs = receipt.split("\n").flatMap(line => {
    const at = line.indexOf(FIXTURE_COMMAND);
    if (at < 0) return [];
    const rest = line.slice(at + FIXTURE_COMMAND.length);
    return COMMAND_END.test(rest) ? [rest] : [];
  });
  if (runs.length === 0) found.push("receipt-no-command", "receipt-no-exit-0");
  else if (!runs.some(rest => EXIT_ZERO.test(rest))) found.push("receipt-no-exit-0");
  return found;
}

/** (a)-(c) for one mention judged on its window: empty when the window is an echo or a receipt admits it. */
function judgeMention(family: string, window: string, fixture: FixtureState, receipts: ReadonlyMap<string, string>): Diagnosis[] {
  const status = STATUS_WORD.test(window);
  const pinned = PIN_WORD.test(window);
  const minted = MINTED_WORD.test(window);
  const found: Diagnosis[] = [];
  if (family === "claim-id") {
    if (!status) found.push("echo-no-undetermined");
    if (!pinned) found.push("echo-no-pin");
    if (minted) found.push("echo-minted-status");
  }
  if (status && pinned && !minted) return found;
  if (fixture.state === "absent") return [...found, "unechoed-claim"];
  return [...found, ...receiptFindings(window, receipts)];
}

interface SourceFile {
  readonly path: string;
  readonly text: string;
}
interface Block {
  /** 1-based line of the block's first line. */
  readonly line: number;
  readonly lines: readonly string[];
}
interface Mention {
  readonly family: string;
  /** 0-based block lines the phrase spans. */
  readonly first: number;
  readonly last: number;
}

function blocks(text: string): Block[] {
  const lines = text.split(/\r?\n/);
  const out: Block[] = [];
  let start = -1;
  for (let index = 0; index <= lines.length; index++) {
    const blank = index === lines.length || /^\s*$/.test(lines[index] ?? "");
    if (!blank && start < 0) start = index;
    if (blank && start >= 0) {
      out.push({ line: start + 1, lines: lines.slice(start, index) });
      start = -1;
    }
  }
  return out;
}

/** Every mention in one block, in line order then FAMILIES order, with the block lines its phrase spans. */
function mentionsOf(lines: readonly string[]): Mention[] {
  const starts: number[] = [];
  let folded = "";
  for (const line of lines) {
    if (starts.length > 0) folded += " ";
    starts.push(folded.length);
    folded += fold(line);
  }
  const lineAt = (offset: number): number => {
    let index = 0;
    while (index + 1 < starts.length && (starts[index + 1] ?? folded.length) <= offset) index++;
    return index;
  };
  const found: (Mention & { readonly order: number })[] = [];
  for (const [order, [family, pattern]] of GLOBAL_PATTERNS.entries()) {
    for (const match of folded.matchAll(pattern)) {
      const at = match.index ?? 0;
      found.push({ family, first: lineAt(at), last: lineAt(at + Math.max(match[0].length - 1, 0)), order });
    }
  }
  return found.sort((left, right) => left.first - right.first || left.order - right.order).map(({ family, first, last }) => ({ family, first, last }));
}

function inTrees(path: string): boolean {
  return TREES.some(tree => path.startsWith(`${tree}/`));
}

/** One FINDING per refused mention of the in-scope, non-exempt files. */
function scanFiles(files: readonly SourceFile[], fixture: FixtureState, receipts: ReadonlyMap<string, string>, exempt: readonly string[] = EXEMPT): string[] {
  const findings: string[] = [];
  for (const file of files) {
    if (!inTrees(file.path) || exempt.includes(file.path)) continue;
    // Whole-file prefilter: a mention inside one block is a mention of the whole file too.
    if (familiesOf(file.text).length === 0) continue;
    for (const block of blocks(file.text)) {
      for (const mention of mentionsOf(block.lines)) {
        const window = block.lines.slice(mention.first, mention.last + 1).join("\n");
        const found = judgeMention(mention.family, window, fixture, receipts);
        if (found.length > 0) findings.push(`${file.path}:${block.line + mention.first} ${mention.family}: ${found.join("+")}`);
      }
    }
  }
  return findings;
}

function collectStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) collectStrings(item, out);
  else if (typeof value === "object" && value !== null) for (const item of Object.values(value)) collectStrings(item, out);
}

function rowId(row: unknown): string | undefined {
  return typeof row === "object" && row !== null && "id" in row && typeof row.id === "string" ? row.id : undefined;
}

function parseRow(line: string): { readonly ok: true; readonly row: unknown } | { readonly ok: false } {
  try {
    return { ok: true, row: JSON.parse(line) };
  } catch {
    return { ok: false };
  }
}

/** (c) over the bead export: one FINDING per row with a claim-id mention that lacks either required token, or per unreadable line. */
function scanBeadExport(lines: readonly string[]): string[] {
  const findings: string[] = [];
  for (const [index, line] of lines.entries()) {
    if (line.trim() === "") continue;
    const parsed = parseRow(line);
    if (!parsed.ok) {
      findings.push(`line ${index + 1} unreadable`);
      continue;
    }
    const strings: string[] = [];
    collectStrings(parsed.row, strings);
    const text = strings.join("\n");
    if (!familiesOf(text).includes("claim-id")) continue;
    const found: Diagnosis[] = [];
    if (!STATUS_WORD.test(text)) found.push("echo-no-undetermined");
    if (!PIN_WORD.test(text)) found.push("echo-no-pin");
    if (found.length > 0) findings.push(`${rowId(parsed.row) ?? `line ${index + 1}`} claim-id: ${found.join("+")}`);
  }
  return findings;
}

function beadRowText(lines: readonly string[], id: string): string {
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parsed = parseRow(line);
    if (!parsed.ok || rowId(parsed.row) !== id) continue;
    const strings: string[] = [];
    collectStrings(parsed.row, strings);
    return strings.join("\n");
  }
  return "";
}

/** Every regular file under `directory` (dot directories included); every symlink lands in `links`, never followed. */
function walk(directory: string, out: string[], links: string[]): void {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))) {
    if (SKIPPED_DIRS.has(entry.name)) continue;
    const full = join(directory, entry.name);
    if (entry.isSymbolicLink()) links.push(full);
    else if (entry.isDirectory()) walk(full, out, links);
    else if (entry.isFile()) out.push(full);
  }
}

const repoPath = (path: string): string => relative(ROOT, path).split(sep).join("/");

function liveFiles(): { readonly files: SourceFile[]; readonly links: string[] } {
  const paths: string[] = [];
  const links: string[] = [];
  for (const tree of TREES) walk(join(ROOT, tree), paths, links);
  return { files: paths.map(path => ({ path: repoPath(path), text: readFileSync(path, "utf8") })), links: links.map(repoPath) };
}

function liveReceipts(): ReadonlyMap<string, string> {
  const directory = join(ROOT, RECEIPTS_DIR);
  return new Map(
    readdirSync(directory)
      .filter(name => name.endsWith(".md"))
      .sort()
      .map(name => [name, readFileSync(join(directory, name), "utf8")] as const),
  );
}

const exportLines = (): string[] => readFileSync(join(ROOT, BEAD_EXPORT), "utf8").split("\n");
/**
 * The live bead export scan's budget (wb-coyr: F4 of the wb-021.9 landing-912 gate, cmd_5da3b69d9465). live bead export (c)
 * reads the whole bead export and judges every row of it (scanBeadExport), so its wall follows the export's size and the host's
 * load, not its judgements. Measured: 3087 and 3100 ms file-alone at load1 about 27 (base 4bfe0ac1 with this budget, an export
 * of 82704321 bytes and 1225 rows); 6898 ms in that gate's merge-tree targeted run (187 files, load1 73.84 at start), where
 * vitest's default 5000 ms failed it ('Test timed out in 5000ms.'). 60000 ms is 8.7 x that 6898 ms wall. vitest fails a
 * synchronous body that outran its budget only once the body has finished, so the budget decides whether a finished scan fails;
 * it never stops or shortens one. The case holds its own task's timeout, as vitest's task tree states it, to 60000, so that
 * case registered with any other budget, vitest's default 5000 ms among them, reds. Any other case's budget (the live tree (a)
 * walk's and the filing anchor's export read's among them), a run-time write to a task's timeout (vitest binds a test's budget
 * when it collects the test, so such a write changes the task tree, not the budget) and an edit of EXPORT_SCAN_BUDGET_MS and
 * the pin's literal together are NOT CLAIMED by this guard.
 */
const EXPORT_SCAN_BUDGET_MS = 60_000;

// ---- judged rows (every non-ASCII input is built with String.fromCodePoint) ----
const CYRILLIC_A = String.fromCodePoint(0x0430);
const CYRILLIC_ER = String.fromCodePoint(0x0440);
const CYRILLIC_I = String.fromCodePoint(0x0406);
const CYRILLIC_U = String.fromCodePoint(0x0443);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const SOFT_HYPHEN = String.fromCodePoint(0xad);
const NO_BREAK_SPACE = String.fromCodePoint(0xa0);
const UNICODE_HYPHEN = String.fromCodePoint(0x2010);
const NON_BREAKING_HYPHEN = String.fromCodePoint(0x2011);
const EN_DASH = String.fromCodePoint(0x2013);
const FULLWIDTH_RF_CLI = String.fromCodePoint(0xff32, 0xff26, 0xff0d, 0xff23, 0xff2c, 0xff29);
const FULLWIDTH_UNDETERMINED = String.fromCodePoint(0xff35, 0xff2e, 0xff24, 0xff25, 0xff34, 0xff25, 0xff32, 0xff2d, 0xff29, 0xff2e, 0xff25, 0xff24);
const FULLWIDTH_ZERO = String.fromCodePoint(0xff10);
const E_ACUTE = String.fromCodePoint(0xe9);
/** The audit pin extended to a full 40-hex sha. */
const FULL_PIN_SHA = "740c1a8170123456789abcdef0123456789abcde";
const COMPLETE_RECEIPT = ["# wb-x: installed journey", "", "## 2026-10-22 run", "rf sha 0123456789abcdef0123456789abcdef01234567", `\`${FIXTURE_COMMAND}\` -> exit 0`, ""].join("\n");
const CITING = "Disabled-mode parity holds (docs/workbench/receipts/wb-x.md).";
const FILLER = "filler line\n".repeat(60_000);

type Table = "FALSIFIERS" | "CONTROLS" | "RESIDUALS";
interface Row {
  readonly table: Table;
  readonly id: string;
  /** Mention-free: the roster carries it inside a scanned tree. */
  readonly label: string;
  readonly files?: readonly SourceFile[];
  readonly bead?: readonly string[];
  readonly fixture?: FixtureState;
  readonly receipts?: Readonly<Record<string, string>>;
  readonly expect: readonly string[];
}
const doc = (text: string): readonly SourceFile[] => [{ path: "docs/x.md", text }];
const beadLine = (row: Record<string, unknown>): string => JSON.stringify(row);

const ROWS: readonly Row[] = [
  // (a), one row per tree the filing names
  { table: "FALSIFIERS", id: "F01", label: "docs paragraph, the README:7 sentence", files: [{ path: "docs/workbench/x.md", text: "Agents continue using RF-CLI normally before, during and after integration.\n" }], expect: ["docs/workbench/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F02", label: "src string literal", files: [{ path: "src/x.ts", text: 'export const label = "rf federation keeps disabled-mode parity";\n' }], expect: ["src/x.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F03", label: "test comment, the NEG-05 sentence", files: [{ path: "test/x.test.ts", text: "// Turning integration off leaves existing RF-CLI graph and agent usage unchanged.\n" }], expect: ["test/x.test.ts:1 neg-05: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F04", label: "qa script output", files: [{ path: "qa/x.mjs", text: "console.log('agents keep using rf normally');\n" }], expect: ["qa/x.mjs:1 rf-normally: unechoed-claim"] },
  // (a), folding
  { table: "FALSIFIERS", id: "F05", label: "case and spacing", files: doc("Disabled  Mode Parity holds.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F06", label: "line break inside one block", files: doc("intro\n\nagents continue using\nRF-CLI normally\n"), expect: ["docs/x.md:3 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F07", label: "look-alike letter", files: doc(`disabled-mode p${CYRILLIC_A}rity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F08", label: "inserted invisible", files: doc(`disabled-mo${ZERO_WIDTH_SPACE}de parity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F09", label: "fullwidth compatibility forms", files: doc(`agents continue using ${FULLWIDTH_RF_CLI} normally\n`), expect: ["docs/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F10", label: "string concatenation", files: [{ path: "src/y.ts", text: 'const s = "disabled-mode " + "parity";\n' }], expect: ["src/y.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F11", label: "html comment", files: doc("<!-- agents continue using RF-CLI normally -->\n"), expect: ["docs/x.md:1 rf-normally: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F12", label: "a negation is still a mention", files: doc("Pi never claims disabled-mode parity.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F13", label: "verdict without the pin", files: doc("Disabled-mode parity is UNDETERMINED.\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F14", label: "pin without the verdict", files: doc("disabled-mode parity at rf main 740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F15", label: "echo with a minted grade", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817, CONFIRMED by Pi\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F16", label: "a complete receipt while the fixture is absent", files: doc(`${CITING}\n`), receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F17", label: "two refused blocks in one file", files: doc("disabled-mode parity\n\nunrelated\n\nagents continue using RF-CLI normally\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim", "docs/x.md:5 rf-normally: unechoed-claim"] },
  // (c), the claim id in the trees
  { table: "FALSIFIERS", id: "F18", label: "claim id alone", files: doc("h2fp-C004 holds.\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F19", label: "claim id and verdict, no pin", files: doc("h2fp-C004 is UNDETERMINED.\n"), expect: ["docs/x.md:1 claim-id: echo-no-pin+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F20", label: "claim id and pin, no verdict", files: doc("h2fp-C004 at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F21", label: "claim id with a minted grade", files: doc("h2fp-C004: UNDETERMINED at 740c1a817; Pi grades it PLAUSIBLE\n"), expect: ["docs/x.md:1 claim-id: echo-minted-status+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F22", label: "a look-alike verdict is never folded", files: doc(`h2fp-C004 is UNDETERM${CYRILLIC_I}NED at 740c1a817\n`), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F23", label: "docs table row with a Pi grade", files: doc("| h2fp-C004 | parity | CONFIRMED |\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+echo-minted-status+unechoed-claim"] },
  // (b), once the fixture is present at the pin
  { table: "FALSIFIERS", id: "F24", label: "present, no receipt cited", files: doc("Disabled-mode parity holds.\n"), fixture: FIXTURE_LANDED, expect: ["docs/x.md:1 mode-parity: receipt-not-cited"] },
  { table: "FALSIFIERS", id: "F25", label: "present, the receipt is not in the listing", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-y.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 mode-parity: receipt-absent"] },
  { table: "FALSIFIERS", id: "F26", label: "present, the receipt names no rf sha", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf at main") }, expect: ["docs/x.md:1 mode-parity: receipt-no-rf-sha"] },
  { table: "FALSIFIERS", id: "F27", label: "present, the rf sha is too short", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 740c1a817") }, expect: ["docs/x.md:1 mode-parity: receipt-no-rf-sha"] },
  { table: "FALSIFIERS", id: "F28", label: "present, no command", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(FIXTURE_COMMAND, "forge test") }, expect: ["docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F29", label: "present, a narrowed command", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace(`${FIXTURE_COMMAND}\``, `${FIXTURE_COMMAND} -k smoke\``) }, expect: ["docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F30", label: "present, a nonzero exit", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT.replace("-> exit 0", "-> exit 1") }, expect: ["docs/x.md:1 mode-parity: receipt-no-exit-0"] },
  { table: "FALSIFIERS", id: "F31", label: "present, a complete receipt does not excuse the claim id", files: doc("h2fp-C004 holds (docs/workbench/receipts/wb-x.md).\n"), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin"] },
  // (c), the bead export
  { table: "FALSIFIERS", id: "F32", label: "bead row with the verdict, no pin", bead: [beadLine({ id: "wb-zz.1", title: "h2fp-C004 is UNDETERMINED" })], expect: ["wb-zz.1 claim-id: echo-no-pin"] },
  { table: "FALSIFIERS", id: "F33", label: "bead row with neither token", bead: [beadLine({ id: "wb-zz.2", notes: "follow-up on h2fp-C004" })], expect: ["wb-zz.2 claim-id: echo-no-undetermined+echo-no-pin"] },
  { table: "FALSIFIERS", id: "F34", label: "bead row, look-alike claim id", bead: [beadLine({ id: "wb-zz.3", notes: `h2f${CYRILLIC_ER}-C004 holds` })], expect: ["wb-zz.3 claim-id: echo-no-undetermined+echo-no-pin"] },
  { table: "FALSIFIERS", id: "F35", label: "bead row, a nested string", bead: ["", beadLine({ id: "wb-zz.4", comments: [{ text: "h2fp-C004 at 740c1a817" }] })], expect: ["wb-zz.4 claim-id: echo-no-undetermined"] },
  // the window: an echo elsewhere in the block never covers a mention
  { table: "FALSIFIERS", id: "F36", label: "an echo on another line of the block", files: doc("h2fp-C004 is UNDETERMINED at 740c1a817.\nSee the rf audit.\nDisabled-mode parity holds.\n"), expect: ["docs/x.md:3 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F37", label: "an echo in another table row", files: doc("| claim | status |\n| h2fp-C004 | UNDETERMINED at 740c1a817 |\n| disabled-mode parity | holds |\n"), expect: ["docs/x.md:3 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F38", label: "the echo tokens on the next line", files: doc("h2fp-C004 is\nUNDETERMINED at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim"] },
  // required text is exact
  { table: "FALSIFIERS", id: "F39", label: "a lower-case verdict", files: doc("h2fp-C004 is undetermined at 740c1a817\n"), expect: ["docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim"] },
  { table: "FALSIFIERS", id: "F40", label: "the verdict inside a longer word", files: doc("disabled-mode parity: UNDETERMINEDNESS at 740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F41", label: "the pin inside a longer token", files: doc("disabled-mode parity: UNDETERMINED at g740c1a817\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  // the scan reads every file, every mention and every export line
  { table: "FALSIFIERS", id: "F42", label: "a mention deep in a large file", files: doc(`${FILLER}\ndisabled-mode parity\n`), expect: ["docs/x.md:60002 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F43", label: "a second mention of one family in a block", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817\nand disabled-mode parity holds\n"), expect: ["docs/x.md:2 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F44", label: "an unreadable export line", bead: [beadLine({ id: "wb-zz.8", notes: "x" }), '{"id":"wb-zz.9","notes":'], expect: ["line 2 unreadable"] },
  // decoded before folding
  { table: "FALSIFIERS", id: "F45", label: "an html character reference", files: doc("disabled&#45;mode&nbsp;parity\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F46", label: "a JS escape inside a string", files: [{ path: "src/w.ts", text: 'const s = "disabled\\u002dmode\\x20parity";\n' }], expect: ["src/w.ts:1 mode-parity: unechoed-claim"] },
  { table: "FALSIFIERS", id: "F47", label: "emphasis inside a word", files: doc("dis**abled** mode parity\n"), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  // the tolerance bounds (wb-wfpj, landing 255 PREP F2): non-ASCII separators, multi-space line joins, both bounds
  {
    table: "FALSIFIERS",
    id: "F48",
    label: "non-ASCII separators between words",
    files: [
      { path: "docs/f48a.md", text: `disabled${SOFT_HYPHEN}mode parity\n` },
      { path: "docs/f48b.md", text: `disabled${NON_BREAKING_HYPHEN}mode parity\n` },
      { path: "docs/f48c.md", text: `h2fp${UNICODE_HYPHEN}C004 holds\n` },
      { path: "docs/f48d.md", text: `disabled${EN_DASH}mode parity\n` },
      { path: "docs/f48e.md", text: `Turning it off leaves ${ZERO_WIDTH_SPACE}existing RF-CLI graph and agent usage unchanged.\n` },
      { path: "docs/f48f.md", text: `agents keep using${NO_BREAK_SPACE}${ZERO_WIDTH_SPACE}RF-CLI normally\n` },
    ],
    expect: ["docs/f48a.md:1 mode-parity: unechoed-claim", "docs/f48b.md:1 mode-parity: unechoed-claim", "docs/f48c.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim", "docs/f48d.md:1 mode-parity: unechoed-claim", "docs/f48e.md:1 neg-05: unechoed-claim", "docs/f48f.md:1 rf-normally: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F49",
    label: "line joins that leave two or three spaces between words",
    files: [
      { path: "test/f49a.test.ts", text: "/**\n * Turning integration off keeps disabled-mode\n * parity for every agent.\n */\n" },
      { path: "docs/f49b.md", text: "- agents keep using\n  RF-CLI normally\n" },
      { path: "src/f49c.ts", text: "/**\n * Turning integration off keeps disabled-\n * mode parity.\n */\n" },
    ],
    expect: ["test/f49a.test.ts:2 mode-parity: unechoed-claim", "docs/f49b.md:1 rf-normally: unechoed-claim", "src/f49c.ts:2 mode-parity: unechoed-claim"],
  },
  { table: "FALSIFIERS", id: "F50", label: "a four-character separator, the bound", files: doc(`disabled ${ZERO_WIDTH_SPACE.repeat(2)} mode parity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  {
    table: "FALSIFIERS",
    id: "F51",
    label: "two- and three-character gaps inside a word, the bound",
    files: [
      { path: "docs/f51a.md", text: `disa${SOFT_HYPHEN}${ZERO_WIDTH_SPACE}bled-mode parity\n` },
      { path: "docs/f51b.md", text: `disa ${ZERO_WIDTH_SPACE} bled-mode parity\n` },
    ],
    expect: ["docs/f51a.md:1 mode-parity: unechoed-claim", "docs/f51b.md:1 mode-parity: unechoed-claim"],
  },
  // the decoded set, form by form (wb-wfpj cut 2, refusal #1 U1): each decoded form stands between two words of a phrase
  {
    table: "FALSIFIERS",
    id: "F52",
    label: "hex character references after x or X, one to six digits in either case, between two words or for a letter",
    files: [
      { path: "docs/f52a.md", text: "disabled&#x2d;mode parity\n" },
      { path: "docs/f52b.md", text: "disabled&#X2D;mode parity\n" },
      { path: "docs/f52c.md", text: "disabled&#x9;mode parity\n" },
      { path: "docs/f52d.md", text: "disabled&#x2010;mode parity\n" },
      { path: "docs/f52e.md", text: "disabled&#x00002D;mode parity\n" },
      { path: "docs/f52f.md", text: "dis&#x61;bled-mode parity\n" },
      { path: "docs/f52g.md", text: "dis&#x1D41A;bled-mode parity\n" },
    ],
    expect: ["docs/f52a.md:1 mode-parity: unechoed-claim", "docs/f52b.md:1 mode-parity: unechoed-claim", "docs/f52c.md:1 mode-parity: unechoed-claim", "docs/f52d.md:1 mode-parity: unechoed-claim", "docs/f52e.md:1 mode-parity: unechoed-claim", "docs/f52f.md:1 mode-parity: unechoed-claim", "docs/f52g.md:1 mode-parity: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F53",
    label: "decimal character references of one to seven digits, between two words or for a letter",
    files: [
      { path: "docs/f53a.md", text: "disabled&#9;mode parity\n" },
      { path: "docs/f53b.md", text: "disabled&#8208;mode parity\n" },
      { path: "docs/f53c.md", text: "disabled&#0000045;mode parity\n" },
      { path: "docs/f53d.md", text: "dis&#97;bled-mode parity\n" },
    ],
    expect: ["docs/f53a.md:1 mode-parity: unechoed-claim", "docs/f53b.md:1 mode-parity: unechoed-claim", "docs/f53c.md:1 mode-parity: unechoed-claim", "docs/f53d.md:1 mode-parity: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F54",
    label: "every NAMED_REFERENCES name between two words",
    files: [
      { path: "docs/f54-amp.md", text: "disabled&amp;mode parity\n" },
      { path: "docs/f54-lt.md", text: "disabled&lt;mode parity\n" },
      { path: "docs/f54-gt.md", text: "disabled&gt;mode parity\n" },
      { path: "docs/f54-quot.md", text: "disabled&quot;mode parity\n" },
      { path: "docs/f54-apos.md", text: "disabled&apos;mode parity\n" },
      { path: "docs/f54-nbsp.md", text: "disabled&nbsp;mode parity\n" },
      { path: "docs/f54-shy.md", text: "disabled&shy;mode parity\n" },
      { path: "docs/f54-hyphen.md", text: "disabled&hyphen;mode parity\n" },
      { path: "docs/f54-dash.md", text: "disabled&dash;mode parity\n" },
      { path: "docs/f54-ndash.md", text: "disabled&ndash;mode parity\n" },
      { path: "docs/f54-mdash.md", text: "disabled&mdash;mode parity\n" },
      { path: "docs/f54-minus.md", text: "disabled&minus;mode parity\n" },
      { path: "docs/f54-zwj.md", text: "disabled&zwj;mode parity\n" },
      { path: "docs/f54-zwnj.md", text: "disabled&zwnj;mode parity\n" },
    ],
    expect: [
      "docs/f54-amp.md:1 mode-parity: unechoed-claim",
      "docs/f54-lt.md:1 mode-parity: unechoed-claim",
      "docs/f54-gt.md:1 mode-parity: unechoed-claim",
      "docs/f54-quot.md:1 mode-parity: unechoed-claim",
      "docs/f54-apos.md:1 mode-parity: unechoed-claim",
      "docs/f54-nbsp.md:1 mode-parity: unechoed-claim",
      "docs/f54-shy.md:1 mode-parity: unechoed-claim",
      "docs/f54-hyphen.md:1 mode-parity: unechoed-claim",
      "docs/f54-dash.md:1 mode-parity: unechoed-claim",
      "docs/f54-ndash.md:1 mode-parity: unechoed-claim",
      "docs/f54-mdash.md:1 mode-parity: unechoed-claim",
      "docs/f54-minus.md:1 mode-parity: unechoed-claim",
      "docs/f54-zwj.md:1 mode-parity: unechoed-claim",
      "docs/f54-zwnj.md:1 mode-parity: unechoed-claim",
    ],
  },
  {
    table: "FALSIFIERS",
    id: "F55",
    label: "JS escapes, a braced one of one to six digits and the four- and two-digit ones, hex digits in either case, between two words or for a letter",
    files: [
      { path: "src/f55a.ts", text: 'const a = "disabled\\u{2d}mode parity";\n' },
      { path: "src/f55b.ts", text: 'const b = "disabled\\u{2D}mode parity";\n' },
      { path: "src/f55c.ts", text: 'const c = "disabled\\u{9}mode parity";\n' },
      { path: "src/f55d.ts", text: 'const d = "disabled\\u{2010}mode parity";\n' },
      { path: "src/f55e.ts", text: 'const e = "disabled\\u{00002d}mode parity";\n' },
      { path: "src/f55f.ts", text: 'const f = "dis\\u{1D41A}bled-mode parity";\n' },
      { path: "src/f55g.ts", text: 'const g = "dis\\u{61}bled-mode parity";\n' },
      { path: "src/f55h.ts", text: 'const h = "disabled\\u002Dmode parity";\n' },
      { path: "src/f55i.ts", text: 'const i = "dis\\u0061bled-mode parity";\n' },
      { path: "src/f55j.ts", text: 'const j = "disabled\\x2dmode parity";\n' },
      { path: "src/f55k.ts", text: 'const k = "disabled\\x2Dmode parity";\n' },
      { path: "src/f55l.ts", text: 'const l = "dis\\x61bled-mode parity";\n' },
    ],
    expect: [
      "src/f55a.ts:1 mode-parity: unechoed-claim",
      "src/f55b.ts:1 mode-parity: unechoed-claim",
      "src/f55c.ts:1 mode-parity: unechoed-claim",
      "src/f55d.ts:1 mode-parity: unechoed-claim",
      "src/f55e.ts:1 mode-parity: unechoed-claim",
      "src/f55f.ts:1 mode-parity: unechoed-claim",
      "src/f55g.ts:1 mode-parity: unechoed-claim",
      "src/f55h.ts:1 mode-parity: unechoed-claim",
      "src/f55i.ts:1 mode-parity: unechoed-claim",
      "src/f55j.ts:1 mode-parity: unechoed-claim",
      "src/f55k.ts:1 mode-parity: unechoed-claim",
      "src/f55l.ts:1 mode-parity: unechoed-claim",
    ],
  },
  // the tolerance at a word's edges (refusal #1 U3)
  {
    table: "FALSIFIERS",
    id: "F56",
    label: "the in-word gap after a word's first letter and before its last, and the one-letter wildcard at its first and last letters",
    files: [
      { path: "docs/f56a.md", text: `d${ZERO_WIDTH_SPACE}isabled-mode parity\n` },
      { path: "docs/f56b.md", text: "agents keep using RF-CLI n ormally\n" },
      { path: "docs/f56c.md", text: `disable${ZERO_WIDTH_SPACE}d-mode parity\n` },
      { path: "docs/f56d.md", text: `disabled-mode ${CYRILLIC_ER}arity\n` },
      { path: "docs/f56e.md", text: `disabled-mode parit${CYRILLIC_U}\n` },
    ],
    expect: ["docs/f56a.md:1 mode-parity: unechoed-claim", "docs/f56b.md:1 rf-normally: unechoed-claim", "docs/f56c.md:1 mode-parity: unechoed-claim", "docs/f56d.md:1 mode-parity: unechoed-claim", "docs/f56e.md:1 mode-parity: unechoed-claim"],
  },
  // every run of ASCII punctuation, space, tab, line feed or carriage return folds to one space
  {
    table: "FALSIFIERS",
    id: "F57",
    label: "a run of five tabs, carriage returns or ASCII punctuation marks of each range between two words",
    files: [
      { path: "docs/f57a.md", text: "disabled\t\t\t\t\tmode parity\n" },
      { path: "docs/f57b.md", text: "disabled\r\r\r\r\rmode parity\n" },
      { path: "docs/f57c.md", text: "disabled-----mode parity\n" },
      { path: "docs/f57d.md", text: "disabled:::::mode parity\n" },
      { path: "docs/f57e.md", text: "disabled_____mode parity\n" },
      { path: "docs/f57f.md", text: "disabled~~~~~mode parity\n" },
    ],
    expect: ["docs/f57a.md:1 mode-parity: unechoed-claim", "docs/f57b.md:1 mode-parity: unechoed-claim", "docs/f57c.md:1 mode-parity: unechoed-claim", "docs/f57d.md:1 mode-parity: unechoed-claim", "docs/f57e.md:1 mode-parity: unechoed-claim", "docs/f57f.md:1 mode-parity: unechoed-claim"],
  },
  { table: "FALSIFIERS", id: "F58", label: "bead row, a run of blank lines inside the claim id", bead: [beadLine({ id: "wb-zz.10", notes: "h2fp\n\n\n\n\nC004 holds" })], expect: ["wb-zz.10 claim-id: echo-no-undetermined+echo-no-pin"] },
  // required text is exact (ECHO): whole words, the pin's extension bound, no compatibility folding
  {
    table: "FALSIFIERS",
    id: "F59",
    label: "the verdict joined to a letter or a digit before or after it",
    files: [
      { path: "docs/f59a.md", text: "disabled-mode parity: PREUNDETERMINED at 740c1a817\n" },
      { path: "docs/f59b.md", text: "disabled-mode parity: xUNDETERMINED at 740c1a817\n" },
      { path: "docs/f59c.md", text: "disabled-mode parity: 2UNDETERMINED at 740c1a817\n" },
      { path: "docs/f59d.md", text: "disabled-mode parity: UNDETERMINEDly at 740c1a817\n" },
      { path: "docs/f59e.md", text: "disabled-mode parity: UNDETERMINED2 at 740c1a817\n" },
    ],
    expect: ["docs/f59a.md:1 mode-parity: unechoed-claim", "docs/f59b.md:1 mode-parity: unechoed-claim", "docs/f59c.md:1 mode-parity: unechoed-claim", "docs/f59d.md:1 mode-parity: unechoed-claim", "docs/f59e.md:1 mode-parity: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F60",
    label: "the pin after a letter or a digit or before a letter, extended in upper case, or extended past a full sha",
    files: [
      { path: "docs/f60a.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817g\n" },
      { path: "docs/f60b.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817G\n" },
      { path: "docs/f60c.md", text: "disabled-mode parity: UNDETERMINED at G740c1a817\n" },
      { path: "docs/f60d.md", text: "disabled-mode parity: UNDETERMINED at 1740c1a817\n" },
      { path: "docs/f60e.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817AB\n" },
      { path: "docs/f60f.md", text: `disabled-mode parity: UNDETERMINED at ${FULL_PIN_SHA}9\n` },
    ],
    expect: ["docs/f60a.md:1 mode-parity: unechoed-claim", "docs/f60b.md:1 mode-parity: unechoed-claim", "docs/f60c.md:1 mode-parity: unechoed-claim", "docs/f60d.md:1 mode-parity: unechoed-claim", "docs/f60e.md:1 mode-parity: unechoed-claim", "docs/f60f.md:1 mode-parity: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F61",
    label: "a fullwidth verdict or a fullwidth digit in the pin is never folded",
    files: [
      { path: "docs/f61a.md", text: `h2fp-C004 is ${FULLWIDTH_UNDETERMINED} at 740c1a817\n` },
      { path: "docs/f61b.md", text: `h2fp-C004 is UNDETERMINED at 74${FULLWIDTH_ZERO}c1a817\n` },
    ],
    expect: ["docs/f61a.md:1 claim-id: echo-no-undetermined+unechoed-claim", "docs/f61b.md:1 claim-id: echo-no-pin+unechoed-claim"],
  },
  { table: "FALSIFIERS", id: "F62", label: "bead row, a fullwidth verdict and a fullwidth digit in the pin", bead: [beadLine({ id: "wb-zz.11", notes: `h2fp-C004 is ${FULLWIDTH_UNDETERMINED} at 74${FULLWIDTH_ZERO}c1a817` })], expect: ["wb-zz.11 claim-id: echo-no-undetermined+echo-no-pin"] },
  {
    table: "FALSIFIERS",
    id: "F63",
    label: "each minted grade beside an echo",
    files: [
      { path: "docs/f63-confirmed.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, CONFIRMED\n" },
      { path: "docs/f63-plausible.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, PLAUSIBLE\n" },
      { path: "docs/f63-refuted.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, REFUTED\n" },
      { path: "docs/f63-verified.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, VERIFIED\n" },
      { path: "docs/f63-established.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, ESTABLISHED\n" },
      { path: "docs/f63-settled.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, SETTLED\n" },
      { path: "docs/f63-proven.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817, PROVEN\n" },
    ],
    expect: [
      "docs/f63-confirmed.md:1 mode-parity: unechoed-claim",
      "docs/f63-plausible.md:1 mode-parity: unechoed-claim",
      "docs/f63-refuted.md:1 mode-parity: unechoed-claim",
      "docs/f63-verified.md:1 mode-parity: unechoed-claim",
      "docs/f63-established.md:1 mode-parity: unechoed-claim",
      "docs/f63-settled.md:1 mode-parity: unechoed-claim",
      "docs/f63-proven.md:1 mode-parity: unechoed-claim",
    ],
  },
  // the families' word lists (MENTION)
  {
    table: "FALSIFIERS",
    id: "F64",
    label: "the verbs use, uses and used, and the optional the of both families",
    files: [
      { path: "docs/f64a.md", text: "agents use RF-CLI normally\n" },
      { path: "docs/f64b.md", text: "an agent uses RF-CLI normally\n" },
      { path: "docs/f64c.md", text: "agents used RF-CLI normally\n" },
      { path: "docs/f64d.md", text: "agents keep using the RF-CLI normally\n" },
      { path: "docs/f64e.md", text: "Turning it off leaves the existing RF-CLI graph and agent usage unchanged.\n" },
    ],
    expect: ["docs/f64a.md:1 rf-normally: unechoed-claim", "docs/f64b.md:1 rf-normally: unechoed-claim", "docs/f64c.md:1 rf-normally: unechoed-claim", "docs/f64d.md:1 rf-normally: unechoed-claim", "docs/f64e.md:1 neg-05: unechoed-claim"],
  },
  {
    table: "FALSIFIERS",
    id: "F65",
    label: "the rf spellings RFCLI, ReactiveFiber CLI, ReactiveFiberCLI and Reactive Fiber CLI, and a two- or three-word spelling's words four wildcards apart",
    files: [
      { path: "docs/f65a.md", text: "agents keep using RFCLI normally\n" },
      { path: "docs/f65b.md", text: "agents keep using ReactiveFiber CLI normally\n" },
      { path: "docs/f65c.md", text: "agents keep using ReactiveFiberCLI normally\n" },
      { path: "docs/f65d.md", text: "agents keep using Reactive Fiber CLI normally\n" },
      { path: "docs/f65e.md", text: `agents keep using RF${ZERO_WIDTH_SPACE.repeat(4)}CLI normally\n` },
      { path: "docs/f65f.md", text: `agents keep using ReactiveFiber${ZERO_WIDTH_SPACE.repeat(4)}CLI normally\n` },
      { path: "docs/f65g.md", text: `agents keep using Reactive${ZERO_WIDTH_SPACE.repeat(4)}Fiber CLI normally\n` },
    ],
    expect: [
      "docs/f65a.md:1 rf-normally: unechoed-claim",
      "docs/f65b.md:1 rf-normally: unechoed-claim",
      "docs/f65c.md:1 rf-normally: unechoed-claim",
      "docs/f65d.md:1 rf-normally: unechoed-claim",
      "docs/f65e.md:1 rf-normally: unechoed-claim",
      "docs/f65f.md:1 rf-normally: unechoed-claim",
      "docs/f65g.md:1 rf-normally: unechoed-claim",
    ],
  },
  { table: "FALSIFIERS", id: "F66", label: "a precomposed letter between two words stays one wildcard under NFKC", files: doc(`disabled${E_ACUTE}mode parity\n`), expect: ["docs/x.md:1 mode-parity: unechoed-claim"] },
  // (b), the receipt's forms, form by form
  {
    table: "FALSIFIERS",
    id: "F67",
    label: "present, a receipt whose rf sha has eleven or forty-one hex digits, upper-case hex, or a letter before rf",
    files: [
      { path: "docs/f67a.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-s11.md).\n" },
      { path: "docs/f67b.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-s41.md).\n" },
      { path: "docs/f67c.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-sup.md).\n" },
      { path: "docs/f67d.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-sxrf.md).\n" },
    ],
    fixture: FIXTURE_LANDED,
    receipts: {
      "wb-s11.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 0123456789a"),
      "wb-s41.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 0123456789abcdef0123456789abcdef012345678"),
      "wb-sup.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 0123456789ABCDEF0123456789ABCDEF01234567"),
      "wb-sxrf.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "xrf sha 0123456789abcdef0123456789abcdef01234567"),
    },
    expect: ["docs/f67a.md:1 mode-parity: receipt-no-rf-sha", "docs/f67b.md:1 mode-parity: receipt-no-rf-sha", "docs/f67c.md:1 mode-parity: receipt-no-rf-sha", "docs/f67d.md:1 mode-parity: receipt-no-rf-sha"],
  },
  {
    table: "FALSIFIERS",
    id: "F68",
    label: "present, a receipt whose exit after the command is not exit 0 as written, or whose command ends its line",
    files: [
      { path: "docs/f68a.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-e02.md).\n" },
      { path: "docs/f68b.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-eup.md).\n" },
      { path: "docs/f68c.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-epre.md).\n" },
      { path: "docs/f68d.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-eol.md).\n" },
      { path: "docs/f68e.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-ews.md).\n" },
    ],
    fixture: FIXTURE_LANDED,
    receipts: {
      "wb-e02.md": COMPLETE_RECEIPT.replace("-> exit 0", "-> exit 02"),
      "wb-eup.md": COMPLETE_RECEIPT.replace("-> exit 0", "-> EXIT 0"),
      "wb-epre.md": COMPLETE_RECEIPT.replace("-> exit 0", "-> preexit 0"),
      "wb-eol.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND}\nexit 0`),
      "wb-ews.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND}  \nexit 0`),
    },
    expect: ["docs/f68a.md:1 mode-parity: receipt-no-exit-0", "docs/f68b.md:1 mode-parity: receipt-no-exit-0", "docs/f68c.md:1 mode-parity: receipt-no-exit-0", "docs/f68d.md:1 mode-parity: receipt-no-exit-0", "docs/f68e.md:1 mode-parity: receipt-no-exit-0"],
  },
  // accepted
  { table: "CONTROLS", id: "N01", label: "the echo form", files: doc("h2fp-C004 (agents keep using RF-CLI normally; disabled-mode parity) is UNDETERMINED at rf main 740c1a817.\n"), expect: [] },
  { table: "CONTROLS", id: "N02", label: "an echo on the lines a mention spans", files: doc("agents keep using\nRF-CLI normally: UNDETERMINED at 740c1a817\n"), expect: [] },
  { table: "CONTROLS", id: "N03", label: "an echo with a longer pin", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817aa\n"), expect: [] },
  { table: "CONTROLS", id: "N04", label: "unrelated parity", files: doc("the replay parity check compares digests\n"), expect: [] },
  { table: "CONTROLS", id: "N05", label: "a disabled mode without parity", files: doc("a disabled mode toggle\n"), expect: [] },
  { table: "CONTROLS", id: "N06", label: "another word order", files: doc("rf normally renders the context\n"), expect: [] },
  { table: "CONTROLS", id: "N07", label: "another claim id", files: doc("h2fp-C0045 holds.\n"), expect: [] },
  { table: "CONTROLS", id: "N08", label: "present, a complete receipt", files: doc(`${CITING}\n`), fixture: FIXTURE_LANDED, receipts: { "wb-x.md": COMPLETE_RECEIPT }, expect: [] },
  { table: "CONTROLS", id: "N09", label: "the one exempt path", files: [{ path: EXEMPT[0] ?? "", text: "agents continue using RF-CLI normally\n" }], expect: [] },
  { table: "CONTROLS", id: "N10", label: "bead row with both tokens", bead: [beadLine({ id: "wb-zz.5", notes: "h2fp-C004 is UNDETERMINED at 740c1a817" })], expect: [] },
  { table: "CONTROLS", id: "N11", label: "a run of wildcards is no word", files: doc(`${String.fromCodePoint(0x4e00).repeat(40)}\n`), expect: [] },
  { table: "CONTROLS", id: "N12", label: "a decoded reference outside a phrase", files: doc("parity &amp; disabled mode\n"), expect: [] },
  { table: "CONTROLS", id: "N13", label: "a five-character separator, past the bound", files: doc(`disabled ${ZERO_WIDTH_SPACE.repeat(3)} mode parity\n`), expect: [] },
  { table: "CONTROLS", id: "N14", label: "a four-character gap inside a word, past the bound", files: doc(`disa ${ZERO_WIDTH_SPACE.repeat(2)} bled-mode parity\n`), expect: [] },
  { table: "CONTROLS", id: "N15", label: "a grade at the start of a longer word is no grade", files: doc("disabled-mode parity: UNDETERMINED at 740c1a817 (PROVENANCE: the rf audit)\n"), expect: [] },
  {
    table: "CONTROLS",
    id: "N16",
    label: "a grade at the end of a longer word is no grade",
    files: [
      { path: "docs/n16a.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817 (UNVERIFIED upstream)\n" },
      { path: "docs/n16b.md", text: "h2fp-C004 is UNDETERMINED at 740c1a817 (UNCONFIRMED by Pi)\n" },
      { path: "docs/n16c.md", text: "agents keep using RF-CLI normally: UNDETERMINED at 740c1a817, UNSETTLED\n" },
      { path: "docs/n16d.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817 (preVERIFIED)\n" },
      { path: "docs/n16e.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817 (build 2VERIFIED)\n" },
    ],
    expect: [],
  },
  {
    table: "CONTROLS",
    id: "N17",
    label: "a grade followed by a lower-case letter or a digit is no grade",
    files: [
      { path: "docs/n17a.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817 (CONFIRMEDly)\n" },
      { path: "docs/n17b.md", text: "disabled-mode parity: UNDETERMINED at 740c1a817 (VERIFIED2)\n" },
    ],
    expect: [],
  },
  {
    table: "CONTROLS",
    id: "N18",
    label: "a family phrase joined to a letter or a digit before or after it is no mention",
    files: [
      { path: "docs/n18a.md", text: "undisabled-mode parity\n" },
      { path: "docs/n18b.md", text: "4disabled-mode parity\n" },
      { path: "docs/n18c.md", text: "disabled-mode parityx\n" },
      { path: "docs/n18d.md", text: "disabled-mode parity2\n" },
    ],
    expect: [],
  },
  { table: "CONTROLS", id: "N19", label: "an echo on the first of the lines a mention spans", files: doc("UNDETERMINED at 740c1a817: agents keep using\nRF-CLI normally\n"), expect: [] },
  { table: "CONTROLS", id: "N20", label: "an echo with the pin extended to a full sha", files: doc(`disabled-mode parity: UNDETERMINED at ${FULL_PIN_SHA}\n`), expect: [] },
  { table: "CONTROLS", id: "N21", label: "five ASCII controls between two words are five wildcards, past the bound", files: doc("disabled\v\f\v\f\vmode parity\n"), expect: [] },
  {
    table: "CONTROLS",
    id: "N22",
    label: "present, receipts named with capitals, digits, dots and an underscore, a twelve-hex rf sha, and the command closed by each closing mark or followed by an arrow or a word",
    files: [
      { path: "docs/n22a.md", text: "Disabled-mode parity holds (docs/workbench/receipts/WB-a9l2.1.md).\n" },
      { path: "docs/n22b.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-s12.md).\n" },
      { path: "docs/n22c.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cq.md).\n" },
      { path: "docs/n22d.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cdq.md).\n" },
      { path: "docs/n22e.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cp.md).\n" },
      { path: "docs/n22f.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cb.md).\n" },
      { path: "docs/n22g.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cdot.md).\n" },
      { path: "docs/n22h.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cc.md).\n" },
      { path: "docs/n22i.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-csc.md).\n" },
      { path: "docs/n22j.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-ca.md).\n" },
      { path: "docs/n22k.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb-cw.md).\n" },
      { path: "docs/n22l.md", text: "Disabled-mode parity holds (docs/workbench/receipts/wb_u.md).\n" },
    ],
    fixture: FIXTURE_LANDED,
    receipts: {
      "WB-a9l2.1.md": COMPLETE_RECEIPT,
      "wb-s12.md": COMPLETE_RECEIPT.replace(/^rf sha .*$/m, "rf sha 0123456789ab"),
      "wb-cq.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `'${FIXTURE_COMMAND}' -> exit 0`),
      "wb-cdq.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `"${FIXTURE_COMMAND}" -> exit 0`),
      "wb-cp.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `(${FIXTURE_COMMAND}) exit 0`),
      "wb-cb.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `[${FIXTURE_COMMAND}] exit 0`),
      "wb-cdot.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `ran ${FIXTURE_COMMAND}. exit 0`),
      "wb-cc.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND}, exit 0`),
      "wb-csc.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND}; exit 0`),
      "wb-ca.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND} -> exit 0`),
      "wb-cw.md": COMPLETE_RECEIPT.replace(`\`${FIXTURE_COMMAND}\` -> exit 0`, `${FIXTURE_COMMAND} then exit 0`),
      "wb_u.md": COMPLETE_RECEIPT,
    },
    expect: [],
  },
  // named residuals: quiet rows
  { table: "RESIDUALS", id: "R1", label: "a paraphrase", files: doc("With the integration switched off, agents see no change in rf.\n"), expect: [] },
  { table: "RESIDUALS", id: "R2", label: "assembled at runtime", files: [{ path: "src/z.ts", text: 'const s = "disabled-" + kind + " parity";\n' }], expect: [] },
  { table: "RESIDUALS", id: "R3", label: "an ASCII look-alike", files: doc("disab1ed-mode parity\n"), expect: [] },
  { table: "RESIDUALS", id: "R4", label: "bead row without the claim id", bead: [beadLine({ id: "wb-zz.6", notes: "clean disabled-mode parity (README:51)" })], expect: [] },
  { table: "RESIDUALS", id: "R5", label: "bead-row granularity", bead: [beadLine({ id: "wb-zz.7", notes: "h2fp-C004 is UNDETERMINED at 740c1a817\n\nlater note: h2fp-C004 holds, CONFIRMED" })], expect: [] },
  { table: "RESIDUALS", id: "R6", label: "outside the four trees", files: [{ path: "README.md", text: "agents continue using RF-CLI normally\n" }], expect: [] },
  { table: "RESIDUALS", id: "R7", label: "status prose beside an echo", files: doc("h2fp-C004 is UNDETERMINED at 740c1a817, but Pi has verified it\n"), expect: [] },
  {
    table: "RESIDUALS",
    id: "R8",
    label: "split across a blank line",
    files: [
      { path: "docs/x.md", text: "agents continue using\n\nRF-CLI normally\n" },
      { path: "docs/r8b.md", text: "agents continue using\n \t \nRF-CLI normally\n" },
    ],
    expect: [],
  },
  { table: "RESIDUALS", id: "R9", label: "echo tokens on the same line", files: doc("Disabled-mode parity holds; h2fp-C004 is UNDETERMINED at 740c1a817.\n"), expect: [] },
  { table: "RESIDUALS", id: "R10", label: "a named reference outside the decoded set", files: doc("disabled&hybull;mode parity\n"), expect: [] },
  {
    table: "RESIDUALS",
    id: "R11",
    label: "joined words, the identifier forms",
    files: [
      { path: "src/u01.ts", text: "export const disabledModeParity = true;\n" },
      { path: "src/u02.ts", text: "assertDisabledModeParity();\n" },
      { path: "docs/u03.md", text: "h2fpC004 holds\n" },
      { path: "src/j01.ts", text: "class DisabledModeParity {}\n" },
      { path: "test/j02.test.ts", text: "it('keeps disabledModeParity', () => {});\n" },
      { path: "src/j03.ts", text: "const usingRfCliNormally = true;\n" },
      { path: "qa/j04.sh", text: "DISABLEDMODEPARITY=1\n" },
      { path: "docs/j05.md", text: "disabled-modeparity\n" },
    ],
    expect: [],
  },
  {
    table: "RESIDUALS",
    id: "R12",
    label: "another word form or a dropped letter",
    files: [
      { path: "docs/j06.md", text: "Disabling it must leave existing RF-CLI graph and agent usage unchanged.\n" },
      { path: "docs/j07.md", text: "leaving existing RF-CLI graph and agent usage unchanged\n" },
      { path: "docs/j08.md", text: "it left existing RF-CLI graph and agent usage unchanged\n" },
      { path: "docs/j11.md", text: "agents keep usin' RF-CLI normally\n" },
      { path: "docs/j15.md", text: "disable-mode parity\n" },
      { path: "docs/j16.md", text: "disabled-mode parities\n" },
    ],
    expect: [],
  },
  {
    table: "RESIDUALS",
    id: "R13",
    label: "a percent, semicolon-less, octal, over-long or doubly encoded hyphen",
    files: [
      { path: "docs/u04.md", text: "disabled%2Dmode parity\n" },
      { path: "docs/u17.md", text: "disabled&#45mode parity\n" },
      { path: "src/u19.ts", text: "disabled\\055mode parity\n" },
      { path: "docs/r13d.md", text: "disabled&#x2Dmode parity\n" },
      { path: "docs/r13e.md", text: "disabled&hyphen mode parity\n" },
      { path: "docs/r13f.md", text: "disabled&#x000002D;mode parity\n" },
      { path: "docs/r13g.md", text: "disabled&#00000045;mode parity\n" },
      { path: "src/r13h.ts", text: 'const h = "disabled\\u{000002d}mode parity";\n' },
      { path: "docs/r13i.md", text: "disabled&amp;#45;mode parity\n" },
    ],
    expect: [],
  },
];
const RESIDUAL_FAMILIES: Readonly<Record<string, string>> = {
  R1: "paraphrase outside the four families",
  R2: "phrase assembled at runtime",
  R3: "ASCII look-alikes and multi-letter alterations",
  R4: "bead row without the claim id",
  R5: "bead-row granularity",
  R6: "files outside the four trees",
  R7: "status prose beside an echo",
  R8: "phrase split across a blank line",
  R9: "same-line echo tokens",
  R10: "named references outside the decoded set",
  R11: "joined words",
  R12: "inflection and deletion",
  R13: "encodings outside the decoded set",
};

function readRow(row: Row): string[] {
  if (row.bead !== undefined) return scanBeadExport(row.bead);
  return scanFiles(row.files ?? [], row.fixture ?? FIXTURE_AT_PIN, new Map(Object.entries(row.receipts ?? {})));
}
function inputDigest(row: Row): string {
  return createHash("sha256")
    .update(JSON.stringify({ files: row.files ?? null, bead: row.bead ?? null, fixture: row.fixture ?? null, receipts: row.receipts ?? null }))
    .digest("hex");
}
const TABLE_WORD: Readonly<Record<Table, string>> = { FALSIFIERS: "falsifier", CONTROLS: "control", RESIDUALS: "residual" };
const testName = (row: Row): string => `${TABLE_WORD[row.table]} ${row.id} ${row.label}`;

interface RosterRow {
  readonly table: Table;
  readonly id: string;
  readonly test: string;
  readonly findings: readonly string[];
  readonly input: string;
}
interface Roster {
  readonly rows: readonly RosterRow[];
  readonly residuals: Readonly<Record<string, string>>;
}

describe("rf federation parity premise guard (wb-a9l2.1, RF-HARNESS2-FEDERATED-PEER-R1)", () => {
  it("live tree (a): no mention in the four trees except as an echo while the fixture is absent at the pin", () => {
    const { files, links } = liveFiles();
    const floors = TREES.flatMap(tree => Object.entries(FLOORS[tree]).map(([extension, floor]) => `${tree}${extension}:${files.filter(file => file.path.startsWith(`${tree}/`) && extname(file.path) === extension).length >= floor}`));
    expect(floors, "walked files per tree and extension, at or above their floors").toEqual(TREES.flatMap(tree => Object.keys(FLOORS[tree]).map(extension => `${tree}${extension}:true`)));
    expect(links, "symlinks under the four trees (refused, never followed)").toEqual([]);
    const receipts = liveReceipts();
    expect(receipts.size).toBeGreaterThanOrEqual(RECEIPTS_FLOOR);
    expect(scanFiles(files, FIXTURE_AT_PIN, receipts)).toEqual([]);
    // Non-vacuity: this file is on disk and the exemption is load-bearing - lifted, the same walk, fold and judge read
    // this file's falsifier inputs as refused mentions.
    expect(EXEMPT).toEqual([SELF]);
    const self = files.filter(file => file.path === SELF);
    expect(self).toHaveLength(1);
    expect(scanFiles(self, FIXTURE_AT_PIN, new Map(), []).length).toBeGreaterThanOrEqual(MIN_SELF_FINDINGS);
  });

  it("live bead export (c): every exported row with a claim-id mention carries the verdict verbatim and the audit pin", { timeout: EXPORT_SCAN_BUDGET_MS }, ({ task }) => {
    expect(task.timeout, "the live bead export scan's own budget (wb-coyr): 60000 ms, never vitest's default 5000 ms").toBe(60_000);
    const lines = exportLines();
    expect(lines.filter(line => line.trim() !== "").length).toBeGreaterThanOrEqual(EXPORT_FLOOR);
    expect(scanBeadExport(lines)).toEqual([]);
    // Non-vacuity: the filing's own row mentions the claim id, so the scan judged at least that row.
    expect(familiesOf(beadRowText(lines, BEAD))).toContain("claim-id");
  });

  it("filing anchor: the owner filing carries every pinned constant, names the trees and the fixture's absence, and its spellings read as mentions", () => {
    const filing = beadRowText(exportLines(), BEAD);
    for (const constant of [CLAIM_ID, AUDIT_STATUS, AUDIT_PIN, RF_PIN, GATING_BEAD, FIXTURE_PATH, FIXTURE_COMMAND]) expect(filing, constant).toContain(constant);
    expect(/no Pi ((?:[a-z]+\/)+[a-z]+) string/.exec(filing)?.[1]?.split("/"), "the filing's scan trees").toEqual([...TREES]);
    expect(filing, "the filing's measurement of the fixture").toContain(`git ls-tree at ${FIXTURE_AT_PIN.rfSha} has no such file`);
    expect(FIXTURE_AT_PIN.state).toBe("absent");
    const spellings = [/string asserts (rf federation disabled-mode parity) \(or/.exec(filing)?.[1], /\(or '([^']+)'\)/.exec(filing)?.[1], new RegExp(`lists ${CLAIM_ID} '([^']+)'`).exec(filing)?.[1]];
    expect(
      spellings.map(spelling => familiesOf(spelling ?? "")),
      "the filing's spellings, by family",
    ).toEqual([["mode-parity"], ["rf-normally"], ["mode-parity", "rf-normally"]]);
    expect(
      spellings.map(spelling => scanFiles(doc(`${spelling ?? ""}\n`), FIXTURE_AT_PIN, new Map())),
      "each spelling, planted unechoed",
    ).toEqual([["docs/x.md:1 mode-parity: unechoed-claim"], ["docs/x.md:1 rf-normally: unechoed-claim"], ["docs/x.md:1 mode-parity: unechoed-claim", "docs/x.md:1 rf-normally: unechoed-claim"]]);
  });

  for (const row of ROWS) {
    it(testName(row), () => {
      expect(readRow(row)).toEqual(row.expect);
    });
  }

  it("frozen shape (rule 16): rows, family slots, grades, trees, floors, the exemption, the decoded references, the residual families and the tolerance bounds as read at this cut", () => {
    expect(ROWS.map(row => `${row.table}:${row.id}:${row.expect.join("|")}:${inputDigest(row).slice(0, 8)}`)).toEqual([
      "FALSIFIERS:F01:docs/workbench/x.md:1 rf-normally: unechoed-claim:86057134",
      "FALSIFIERS:F02:src/x.ts:1 mode-parity: unechoed-claim:403c351e",
      "FALSIFIERS:F03:test/x.test.ts:1 neg-05: unechoed-claim:3f78352c",
      "FALSIFIERS:F04:qa/x.mjs:1 rf-normally: unechoed-claim:0f579455",
      "FALSIFIERS:F05:docs/x.md:1 mode-parity: unechoed-claim:cf786200",
      "FALSIFIERS:F06:docs/x.md:3 rf-normally: unechoed-claim:e3c504bb",
      "FALSIFIERS:F07:docs/x.md:1 mode-parity: unechoed-claim:9d796616",
      "FALSIFIERS:F08:docs/x.md:1 mode-parity: unechoed-claim:066bab37",
      "FALSIFIERS:F09:docs/x.md:1 rf-normally: unechoed-claim:7ec7094a",
      "FALSIFIERS:F10:src/y.ts:1 mode-parity: unechoed-claim:c3e950e2",
      "FALSIFIERS:F11:docs/x.md:1 rf-normally: unechoed-claim:63e21ce5",
      "FALSIFIERS:F12:docs/x.md:1 mode-parity: unechoed-claim:ea81464e",
      "FALSIFIERS:F13:docs/x.md:1 mode-parity: unechoed-claim:a9280aad",
      "FALSIFIERS:F14:docs/x.md:1 mode-parity: unechoed-claim:eb8dbc2d",
      "FALSIFIERS:F15:docs/x.md:1 mode-parity: unechoed-claim:bcd4ac43",
      "FALSIFIERS:F16:docs/x.md:1 mode-parity: unechoed-claim:2315c8a9",
      "FALSIFIERS:F17:docs/x.md:1 mode-parity: unechoed-claim|docs/x.md:5 rf-normally: unechoed-claim:efbb3700",
      "FALSIFIERS:F18:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim:13cc5eed",
      "FALSIFIERS:F19:docs/x.md:1 claim-id: echo-no-pin+unechoed-claim:b2180a1f",
      "FALSIFIERS:F20:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:43ce2b7d",
      "FALSIFIERS:F21:docs/x.md:1 claim-id: echo-minted-status+unechoed-claim:ef872526",
      "FALSIFIERS:F22:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:9bf824e2",
      "FALSIFIERS:F23:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+echo-minted-status+unechoed-claim:5ab9bb94",
      "FALSIFIERS:F24:docs/x.md:1 mode-parity: receipt-not-cited:a0217c06",
      "FALSIFIERS:F25:docs/x.md:1 mode-parity: receipt-absent:b4ccd63d",
      "FALSIFIERS:F26:docs/x.md:1 mode-parity: receipt-no-rf-sha:aca15edc",
      "FALSIFIERS:F27:docs/x.md:1 mode-parity: receipt-no-rf-sha:f58028ba",
      "FALSIFIERS:F28:docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0:5ad425bf",
      "FALSIFIERS:F29:docs/x.md:1 mode-parity: receipt-no-command+receipt-no-exit-0:0d6f701f",
      "FALSIFIERS:F30:docs/x.md:1 mode-parity: receipt-no-exit-0:09446c4b",
      "FALSIFIERS:F31:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin:15af21ad",
      "FALSIFIERS:F32:wb-zz.1 claim-id: echo-no-pin:2df52283",
      "FALSIFIERS:F33:wb-zz.2 claim-id: echo-no-undetermined+echo-no-pin:ababdc1b",
      "FALSIFIERS:F34:wb-zz.3 claim-id: echo-no-undetermined+echo-no-pin:e48867a0",
      "FALSIFIERS:F35:wb-zz.4 claim-id: echo-no-undetermined:082836cd",
      "FALSIFIERS:F36:docs/x.md:3 mode-parity: unechoed-claim:2c425554",
      "FALSIFIERS:F37:docs/x.md:3 mode-parity: unechoed-claim:364334d9",
      "FALSIFIERS:F38:docs/x.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim:156988e3",
      "FALSIFIERS:F39:docs/x.md:1 claim-id: echo-no-undetermined+unechoed-claim:6dacac1a",
      "FALSIFIERS:F40:docs/x.md:1 mode-parity: unechoed-claim:43513c48",
      "FALSIFIERS:F41:docs/x.md:1 mode-parity: unechoed-claim:ba717beb",
      "FALSIFIERS:F42:docs/x.md:60002 mode-parity: unechoed-claim:7c9bddcf",
      "FALSIFIERS:F43:docs/x.md:2 mode-parity: unechoed-claim:e20b78c9",
      "FALSIFIERS:F44:line 2 unreadable:def4ab4f",
      "FALSIFIERS:F45:docs/x.md:1 mode-parity: unechoed-claim:a3b69aa6",
      "FALSIFIERS:F46:src/w.ts:1 mode-parity: unechoed-claim:4141a351",
      "FALSIFIERS:F47:docs/x.md:1 mode-parity: unechoed-claim:e54af4d7",
      "FALSIFIERS:F48:docs/f48a.md:1 mode-parity: unechoed-claim|docs/f48b.md:1 mode-parity: unechoed-claim|docs/f48c.md:1 claim-id: echo-no-undetermined+echo-no-pin+unechoed-claim|docs/f48d.md:1 mode-parity: unechoed-claim|docs/f48e.md:1 neg-05: unechoed-claim|docs/f48f.md:1 rf-normally: unechoed-claim:6b3c7d18",
      "FALSIFIERS:F49:test/f49a.test.ts:2 mode-parity: unechoed-claim|docs/f49b.md:1 rf-normally: unechoed-claim|src/f49c.ts:2 mode-parity: unechoed-claim:0650a552",
      "FALSIFIERS:F50:docs/x.md:1 mode-parity: unechoed-claim:acf24249",
      "FALSIFIERS:F51:docs/f51a.md:1 mode-parity: unechoed-claim|docs/f51b.md:1 mode-parity: unechoed-claim:aa10649d",
      "FALSIFIERS:F52:docs/f52a.md:1 mode-parity: unechoed-claim|docs/f52b.md:1 mode-parity: unechoed-claim|docs/f52c.md:1 mode-parity: unechoed-claim|docs/f52d.md:1 mode-parity: unechoed-claim|docs/f52e.md:1 mode-parity: unechoed-claim|docs/f52f.md:1 mode-parity: unechoed-claim|docs/f52g.md:1 mode-parity: unechoed-claim:aa681d90",
      "FALSIFIERS:F53:docs/f53a.md:1 mode-parity: unechoed-claim|docs/f53b.md:1 mode-parity: unechoed-claim|docs/f53c.md:1 mode-parity: unechoed-claim|docs/f53d.md:1 mode-parity: unechoed-claim:9f9f9ad7",
      "FALSIFIERS:F54:docs/f54-amp.md:1 mode-parity: unechoed-claim|docs/f54-lt.md:1 mode-parity: unechoed-claim|docs/f54-gt.md:1 mode-parity: unechoed-claim|docs/f54-quot.md:1 mode-parity: unechoed-claim|docs/f54-apos.md:1 mode-parity: unechoed-claim|docs/f54-nbsp.md:1 mode-parity: unechoed-claim|docs/f54-shy.md:1 mode-parity: unechoed-claim|docs/f54-hyphen.md:1 mode-parity: unechoed-claim|docs/f54-dash.md:1 mode-parity: unechoed-claim|docs/f54-ndash.md:1 mode-parity: unechoed-claim|docs/f54-mdash.md:1 mode-parity: unechoed-claim|docs/f54-minus.md:1 mode-parity: unechoed-claim|docs/f54-zwj.md:1 mode-parity: unechoed-claim|docs/f54-zwnj.md:1 mode-parity: unechoed-claim:abca1fd8",
      "FALSIFIERS:F55:src/f55a.ts:1 mode-parity: unechoed-claim|src/f55b.ts:1 mode-parity: unechoed-claim|src/f55c.ts:1 mode-parity: unechoed-claim|src/f55d.ts:1 mode-parity: unechoed-claim|src/f55e.ts:1 mode-parity: unechoed-claim|src/f55f.ts:1 mode-parity: unechoed-claim|src/f55g.ts:1 mode-parity: unechoed-claim|src/f55h.ts:1 mode-parity: unechoed-claim|src/f55i.ts:1 mode-parity: unechoed-claim|src/f55j.ts:1 mode-parity: unechoed-claim|src/f55k.ts:1 mode-parity: unechoed-claim|src/f55l.ts:1 mode-parity: unechoed-claim:969b9479",
      "FALSIFIERS:F56:docs/f56a.md:1 mode-parity: unechoed-claim|docs/f56b.md:1 rf-normally: unechoed-claim|docs/f56c.md:1 mode-parity: unechoed-claim|docs/f56d.md:1 mode-parity: unechoed-claim|docs/f56e.md:1 mode-parity: unechoed-claim:208ce016",
      "FALSIFIERS:F57:docs/f57a.md:1 mode-parity: unechoed-claim|docs/f57b.md:1 mode-parity: unechoed-claim|docs/f57c.md:1 mode-parity: unechoed-claim|docs/f57d.md:1 mode-parity: unechoed-claim|docs/f57e.md:1 mode-parity: unechoed-claim|docs/f57f.md:1 mode-parity: unechoed-claim:9fc1dee2",
      "FALSIFIERS:F58:wb-zz.10 claim-id: echo-no-undetermined+echo-no-pin:c2fc677e",
      "FALSIFIERS:F59:docs/f59a.md:1 mode-parity: unechoed-claim|docs/f59b.md:1 mode-parity: unechoed-claim|docs/f59c.md:1 mode-parity: unechoed-claim|docs/f59d.md:1 mode-parity: unechoed-claim|docs/f59e.md:1 mode-parity: unechoed-claim:3a873721",
      "FALSIFIERS:F60:docs/f60a.md:1 mode-parity: unechoed-claim|docs/f60b.md:1 mode-parity: unechoed-claim|docs/f60c.md:1 mode-parity: unechoed-claim|docs/f60d.md:1 mode-parity: unechoed-claim|docs/f60e.md:1 mode-parity: unechoed-claim|docs/f60f.md:1 mode-parity: unechoed-claim:2f94ad95",
      "FALSIFIERS:F61:docs/f61a.md:1 claim-id: echo-no-undetermined+unechoed-claim|docs/f61b.md:1 claim-id: echo-no-pin+unechoed-claim:4abf8c44",
      "FALSIFIERS:F62:wb-zz.11 claim-id: echo-no-undetermined+echo-no-pin:cf975960",
      "FALSIFIERS:F63:docs/f63-confirmed.md:1 mode-parity: unechoed-claim|docs/f63-plausible.md:1 mode-parity: unechoed-claim|docs/f63-refuted.md:1 mode-parity: unechoed-claim|docs/f63-verified.md:1 mode-parity: unechoed-claim|docs/f63-established.md:1 mode-parity: unechoed-claim|docs/f63-settled.md:1 mode-parity: unechoed-claim|docs/f63-proven.md:1 mode-parity: unechoed-claim:14ec40de",
      "FALSIFIERS:F64:docs/f64a.md:1 rf-normally: unechoed-claim|docs/f64b.md:1 rf-normally: unechoed-claim|docs/f64c.md:1 rf-normally: unechoed-claim|docs/f64d.md:1 rf-normally: unechoed-claim|docs/f64e.md:1 neg-05: unechoed-claim:d4a5264e",
      "FALSIFIERS:F65:docs/f65a.md:1 rf-normally: unechoed-claim|docs/f65b.md:1 rf-normally: unechoed-claim|docs/f65c.md:1 rf-normally: unechoed-claim|docs/f65d.md:1 rf-normally: unechoed-claim|docs/f65e.md:1 rf-normally: unechoed-claim|docs/f65f.md:1 rf-normally: unechoed-claim|docs/f65g.md:1 rf-normally: unechoed-claim:01b7f003",
      "FALSIFIERS:F66:docs/x.md:1 mode-parity: unechoed-claim:62544368",
      "FALSIFIERS:F67:docs/f67a.md:1 mode-parity: receipt-no-rf-sha|docs/f67b.md:1 mode-parity: receipt-no-rf-sha|docs/f67c.md:1 mode-parity: receipt-no-rf-sha|docs/f67d.md:1 mode-parity: receipt-no-rf-sha:62836f28",
      "FALSIFIERS:F68:docs/f68a.md:1 mode-parity: receipt-no-exit-0|docs/f68b.md:1 mode-parity: receipt-no-exit-0|docs/f68c.md:1 mode-parity: receipt-no-exit-0|docs/f68d.md:1 mode-parity: receipt-no-exit-0|docs/f68e.md:1 mode-parity: receipt-no-exit-0:99a5851b",
      "CONTROLS:N01::6c96b072",
      "CONTROLS:N02::1e8fd29a",
      "CONTROLS:N03::3a545c1b",
      "CONTROLS:N04::4ab18508",
      "CONTROLS:N05::98294570",
      "CONTROLS:N06::02ba78e7",
      "CONTROLS:N07::3c6e2d1d",
      "CONTROLS:N08::9bcbbb7a",
      "CONTROLS:N09::e4b726bd",
      "CONTROLS:N10::a496060b",
      "CONTROLS:N11::9823b841",
      "CONTROLS:N12::528c75a0",
      "CONTROLS:N13::3a40bc92",
      "CONTROLS:N14::8947550e",
      "CONTROLS:N15::7acb67a3",
      "CONTROLS:N16::9f48a178",
      "CONTROLS:N17::36234763",
      "CONTROLS:N18::f70b610c",
      "CONTROLS:N19::e223d59c",
      "CONTROLS:N20::bedd485d",
      "CONTROLS:N21::c6ad383d",
      "CONTROLS:N22::60083418",
      "RESIDUALS:R1::1e0d90ec",
      "RESIDUALS:R2::e7707859",
      "RESIDUALS:R3::cf696a35",
      "RESIDUALS:R4::1dfda94b",
      "RESIDUALS:R5::e0cfe2ab",
      "RESIDUALS:R6::c1b665aa",
      "RESIDUALS:R7::788a8bd7",
      "RESIDUALS:R8::e081e111",
      "RESIDUALS:R9::486147cd",
      "RESIDUALS:R10::3ff23a66",
      "RESIDUALS:R11::153a8eec",
      "RESIDUALS:R12::a2db2a6f",
      "RESIDUALS:R13::eade1053",
    ]);
    expect(FAMILIES.map(family => `${family.id}:${family.slots.map(slot => slot.join("/")).join(" ")}`)).toEqual([
      "claim-id:h2fp c004",
      "mode-parity:disabled mode parity",
      "rf-normally:use/uses/using/used /the rf cli/rfcli/rf/reactivefiber cli/reactivefibercli/reactive fiber cli normally",
      "neg-05:leaves /the existing rf cli/rfcli/rf/reactivefiber cli/reactivefibercli/reactive fiber cli graph and agent usage unchanged",
    ]);
    expect([...MINTED_GRADES]).toEqual(["CONFIRMED", "PLAUSIBLE", "REFUTED", "VERIFIED", "ESTABLISHED", "SETTLED", "PROVEN"]);
    expect([...TREES]).toEqual(["src", "docs", "test", "qa"]);
    expect(FLOORS).toEqual({ src: { ".ts": 80 }, docs: { ".md": 40 }, test: { ".ts": 300, ".md": 15, ".json": 10, ".mjs": 3 }, qa: { ".mjs": 40, ".sh": 3 } });
    expect([MIN_SELF_FINDINGS, EXPORT_FLOOR, RECEIPTS_FLOOR]).toEqual([30, 100, 30]);
    expect([...EXEMPT]).toEqual(["test/workbench-rf-federation-parity-premise.test.ts"]);
    expect([...NAMED_REFERENCES.keys()]).toEqual(["amp", "lt", "gt", "quot", "apos", "nbsp", "shy", "hyphen", "dash", "ndash", "mdash", "minus", "zwj", "zwnj"]);
    expect([SEPARATOR, tolerantWord("ab")], "the separator between words and the in-word gap, as tolerantWord's forms for a two-letter word").toEqual(["[ ?]{1,4}", "(?:ab|\\?b|a\\?|a[ ?]{1,3}b)"]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([id, family]) => `${id}:${family}`)).toEqual([
      "R1:paraphrase outside the four families",
      "R2:phrase assembled at runtime",
      "R3:ASCII look-alikes and multi-letter alterations",
      "R4:bead row without the claim id",
      "R5:bead-row granularity",
      "R6:files outside the four trees",
      "R7:status prose beside an echo",
      "R8:phrase split across a blank line",
      "R9:same-line echo tokens",
      "R10:named references outside the decoded set",
      "R11:joined words",
      "R12:inflection and deletion",
      "R13:encodings outside the decoded set",
    ]);
  });

  it("out-of-file roster: the judged rows, the registered row tests and the residual families equal the fixture, in order and both ways", ({ task }) => {
    const roster = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;
    const rows: RosterRow[] = ROWS.map(row => ({ table: row.table, id: row.id, test: testName(row), findings: readRow(row), input: inputDigest(row) }));
    expect(rows, "the in-file rows, judged now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the residual families").toEqual(roster.residuals);
    expect(
      ROWS.filter(row => row.table === "RESIDUALS").map(row => row.id),
      "one quiet row per residual family",
    ).toEqual(Object.keys(roster.residuals));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    const rowTests = new Set(roster.rows.map(row => row.test));
    expect(
      walked.filter(entry => rowTests.has(entry.name)).map(read),
      "every roster row's registered test ran before this case, in run mode and not inverted",
    ).toEqual(roster.rows.map(row => `${row.test} | run | ran`));
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case is in the walk by task identity, after the tests it judges").toBeGreaterThan(0);
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || (index < here && !ran(entry.state)))).map(read),
      "other tests of this file skipped, todo, inverted or not run before this case",
    ).toEqual([]);
    const titles = walked.map(entry => entry.name);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice",
    ).toEqual([]);
  });
});
