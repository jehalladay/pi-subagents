/**
 * wb-e66.6 (MW-GRAPH-POLICY-COORDINATION-R11, program-triage-2026-10-18), the MW x GP coordination citation-status census.
 * Statement (the bead title; it spells its two marks as × and — escapes, read as the characters they name): "Any
 * docs/workbench text citing the MechanicalWorkflows × GraphPolicyCLI program shall carry its pinned status verbatim —
 * 'research/design, not integrated or verified live' (GPC.md:3@4b8b974ca72b); 'No new native executor, policy compiler or training
 * integration claimed' (README.md:3) — label GP numbers synthetic unless a real-system receipt is cited, and never present a GP
 * result as live coordination." Acceptance shape (owner filing, bead notes, verbatim): "the docs census that binds the citing
 * sentence (wb-cax.25 / docs-07 census style) goes red when a sentence cites the program without both status literals or presents a
 * GP number without a 'synthetic' label or a cited real-system receipt; until a citation exists the bead is a standing rule, not a
 * code change." Rows A, B and C are the statement's three duties (their labels tile it); rows D and E are the shape's two clauses.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-26, at this census's base 32e0e2d). Producer (the local MechanicalWorkflows
 * checkout at 4b8b974ca72bf2ed36b99e315e45857c6181fbe8, git show; the roster's producer block holds the lines and blobs, the
 * hermetic census never re-reads them): the program is two documents, docs/programs/graph-policy-coordination-2026-10-18.md (the
 * filing's GPC.md, blob 01ff00d480ec) and docs/programs/graph-policy-coordination-2026-10-18/README.md (blob 0dbff582a14c). GPC.md:1
 * reads "# MechanicalWorkflows × GraphPolicyCLI — graph-conditioned coordination" and :3 the bold status line "Status 2026-10-18:
 * research/design, not integrated or verified live."; README.md:1 reads "# MechanicalWorkflows × GraphPolicyCLI — graph-conditioned
 * policies", :3 opens "2026-10-18; design-only." and closes "No new native executor, policy compiler or training integration
 * claimed.", and :19 closes "Document synthetic vs real claims separately.". Pi: git would commit 72 files below docs/workbench (25
 * pages and 47 receipts, every one a .md page); the readers split them into 6212 raw and 6148 rendered sentences, and no sentence
 * of either leg cites the program (git grep -i -P over the whole tree outside .beads for the program's spellings: 0 files at this
 * base and 0 at the filing's measuring tree 758ec18187a5), so the census passes empty today, as filed. The tree's GraphPolicyCLI
 * mentions (the docs/workbench/03 GraphPolicyCLI boundary section; receipts wb-1xvp.3, wb-1xvp.5, wb-atq9 and wb-pfxo.1) belong to
 * ReactiveFiberCLI's graph-policy-machine-control program and pair no MechanicalWorkflows name, so none cites this program. No docs,
 * src or tracker text is edited by this cut.
 *
 * THE TWO LEGS. Every judged file is read twice, and a sentence either leg refuses is a finding, reported
 * `<path>:<line> <leg>:<cause>` (the line is its block's first source line). The RAW LEG reads the source as written: markdown
 * units (a blank-line block; a heading, a table row and each line inside a code fence are units of their own; a list item opens
 * one; any other file, each line), each cut into sentences. The RENDERED LEG reads what a reader of the page sees (THE RENDERED
 * VIEW), each piece cut into sentences. A SENTENCE ends at a run of white space after ".", "!" or "?" (a table row, its cells joined
 * by " | ", is one sentence unless one ends inside a cell). A BLOCK is a unit (raw) or a piece (rendered).
 * THE RENDERED VIEW. marked's lexer (the repository's marked devDependency, 18.0.11) lexes the page once. A piece is a heading, a
 * paragraph, a list item's own text, the blocks of a block quote, a table row, one line of a code block, or the text of an HTML block
 * (its tags, comments and declarations, HIDDEN_HTML, removed). Inline, a link renders its text (never its destination or title), a
 * code span and an escape their literal text, emphasis its text; raw HTML renders nothing of itself - a comment, a declaration, a
 * processing instruction, a tag - while the text between an opening tag of a non-void element and its closing tag (or the piece's
 * end) renders; character references are decoded (every numeric one, and the NAMED_REFERENCES); a format character (Unicode Cf)
 * renders nothing; a white-space run reads as one space. PLAINLY SEEN: struck text, an image's alt text, an inline element's content
 * (an attribute or a style can hide it) and an HTML block's text are seen but not plainly: they read for citations, numbers and
 * claims, never for a qualifier or a guard (the plain text holds BLANK in their place).
 *
 * THE JUDGES. CITATION, any case: the slug graph-policy-coordination (the filed source path's), read word by word with any run of
 * white space, underscore, hyphen, Unicode dash or minus sign between its words; the program documents' two subtitles,
 * graph-conditioned coordination and graph-conditioned policies, the same way; the filing's shorthand GPC.md; and the program's
 * name - MechanicalWorkflows (or MW) beside GraphPolicyCLI (or GraphPolicy, or GP), in either order, touching no letter or digit,
 * with an optional possessive and one optional joiner (×, x, *, +, /, &, a hyphen or dash, "and", "with") between. A match that
 * starts inside a requirement-id spelling (REQUIREMENT_ID: the bead family's own MW-GRAPH-POLICY-COORDINATION-R<n>) does not cite. A
 * sentence CITES in a leg when that leg's text of it holds a citation: one only the source holds (a comment, a link destination or
 * title, an attribute) cites in the raw leg, one only the rendered page spells (a character reference, an escape, a format character
 * inside it) in the rendered leg.
 *  (a) STATUS (row A): a citing sentence carries each status literal verbatim - case and marks exact, any white-space run between its
 *    words - where its leg's plain text holds it, unless NEGATION_BEFORE sits in the two words before it (as seen) or NEGATION_AFTER
 *    follows it; missing one is status-l1 or status-l2.
 *  (b) NUMBERS (row B): in a block holding a citing sentence, a sentence that cites or names GP (GP_SUBJECT: GraphPolicyCLI,
 *    GraphPolicy or GP in any case) and holds a NUMBER - a whole word (words end at white space and the WORD_BREAK marks; a trailing
 *    period or colon dropped) shaped as a decimal number with an optional sign, exponent, fraction and percent sign, multiplication
 *    sign or one-to-three-letter unit; so a date, a sha, a version, a path with a line or an id glued to letters (R11, GP-1, p95) is
 *    none - owes, in its own plain text, the label 'synthetic' (a whole word, any case, cancelled as in (a)) or a real-system receipt
 *    (RECEIPT: a Forge command id, cmd_ and twelve lowercase hex digits, a whole word); else unlabelled-number.
 *  (c) LIVE COORDINATION (row C): in the same sentences, a LIVE word (live, production, deployed) whose clause (cut at , ; : ( ) and
 *    the en and em dash) holds no GUARD word before it and no GUARD_AFTER word right after it, both read on the plain text, in a
 *    sentence holding a COORDINATION word (coordinat-, schedul-, assign-, dispatch-, orchestrat-), presents a GP result as live
 *    coordination: live-coordination.
 *  (d) THE BINDING (row D): every citing sentence, as each leg reads it (white space squeezed), is held in BOUND, or it is unbound.
 *    BOUND is empty because no sentence cites today: the cut that adds the first citation binds it here in the same commit (the
 *    docs-07 census style), so this census judges every citing sentence by name.
 *
 * ROWS. A, the status duty, one pin per quoted part (the pin quotes tile the label): A1 the docs/workbench walk - what git would
 *    commit (tracked or untracked, never ignored) equals the filesystem walk (git-ignored files aside) both ways and keeps the
 *    roster's TRACKED FLOOR; every walked file is a markdown page; each page opens with a level-1 heading and each receipt with its
 *    rule-15 first line; the same call judges a planted page after the live ones and the findings are exactly the plant's; each leg
 *    reads at least 4000 sentences - A2 the citation reader, A3 the carrier on the rendered view (what a reader plainly sees
 *    qualifies; a comment, a link title, alt text, struck text, an element's content or an HTML block does not; a status in another
 *    sentence, block, row or list item does not), A4 the first status literal, A5 the second. B, the number duty: B1 the number
 *    reader, B2 the synthetic label, B3 the receipt. C, the live-coordination duty: C1 its scope, C2 its claim and guard words. D, the
 *    acceptance shape: D1 the binding (no live citing sentence, so all are bound; a planted citing sentence unbound in both legs and
 *    its bound twin quiet; a source-only citation bound like any other); D2 the unqualified citation committed into a scratch git
 *    repository (test/helpers/scratch.ts, leak guard installed) as a page and as a receipt and read through readScope's own git
 *    listing goes red, its qualified, bound twin quiet; D3 the unlabelled GP number of a qualified, bound citation committed the same
 *    way goes red, its synthetic and receipted twins quiet. E, the standing rule: E1 no live sentence cites the program in either leg
 *    (the passing-empty state) while the same call reads the plant's citations. Q, the residuals' pinned quiet rows: each witness (but
 *    R-SCOPE's path list) is its probe's path, text and causes, and the probe is re-judged where the witness is compared.
 * TRACKED FLOOR (the wb-w3tz form). A1's walk anchor is computed in this file, so the walk is also held to counts outside it: the
 *    roster's walkFloor pins, at walkFloor.measuredAt (git ls-files --cached), git's tracked file count below docs/workbench (72) and
 *    each directory holding a tracked file of its own (docs/workbench, docs/workbench/receipts); A1 holds that the walk keeps at least
 *    that many files and, of each measured directory still on disk, a file of its own. Floors, never equalities: an added page never
 *    reds them, and a cut that deletes pages re-measures walkFloor in the same commit.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 *    every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 *    (test/fixtures/mw-gp-citation-status-roster.json). RECORD: each pin's case records how many assertions its own case made and
 *    the last case holds them to the roster's reached list, so a case that hands back a witness without measuring reds; no case
 *    reads its own roster witness. OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker export
 *    (.beads/issues.jsonl): rows A, B and C tile its title's statement exactly, and rows D and E are its notes' acceptance shape
 *    exactly; each row's pin quotes tile its label with only separators between; each quoted element of a label is carried by
 *    exactly one pin, whose quote holds no other and whose witness carries it (so folding A4 into A5, or dropping either, reds); the
 *    status literals are the statement's two quotes at their pinned sources; the program's name, the shorthand, GP, live,
 *    coordination and 'synthetic' are the statement's or the shape's words; REQUIREMENT_ID is the title's id family; the slug is the
 *    filed source path's; the producer block's lines carry the filed quotes and both literals, and its two document titles carry the
 *    program's name and the two subtitles; the filing pin is the filed measurement's tree. The last case reads the vitest task tree
 *    (every registered test, in roster order, in run mode, ran before it) and the reached record.
 * NOT CLAIMED (edits of this file and the roster together): a residual row removed from ROWS, the literal, IMPL, RESIDUALS and the
 *    roster (no outside anchor names the residual families); a control, plant or probe removed or edited in IMPL and the roster
 *    together while every remaining one holds; a pin folded into a neighbour where neither quote carries a quoted element (the bead
 *    text anchors each clause and its quoted elements, not the boundary between two unquoted parts); a seat-added vocabulary member
 *    (the joiners, MW and GraphPolicy, production and deployed, schedul-, assign-, dispatch- and orchestrat-, the GUARD, GUARD_AFTER
 *    and negation words, the NUMBER and WORD_BREAK shapes, the RECEIPT form, the NAMED_REFERENCES) removed with every control naming
 *    it in IMPL and the roster together (only the bead text's words are anchored outside); walkFloor lowered in the roster; the
 *    outside-anchor case or the last case removed with its roster title.
 * RESIDUALS (named, each with its pinned quiet row): R-SCOPE only docs/workbench is judged - README.md, CHANGELOG.md, AGENTS.md,
 *    docs/ outside docs/workbench, src, qa and test are not (Q1); R-REQUIREMENT-ID a sentence whose only matches sit in a
 *    requirement-id spelling does not cite (Q2); R-PARAPHRASE-CITE a citation spelling none of the program's spellings ("the MW
 *    graph-scoring coordination deposit") does not cite (Q3); R-CARRIER-CONTEXT a negation more than two words before a status
 *    literal does not cancel it (Q4); R-CROSS-SENTENCE a sentence naming neither GP nor the program ("Its regret fell by 40%") is not
 *    judged for rows B and C, even in a citing block (Q5); R-DOCUMENT-SCOPE a block holding no citing sentence is not judged, even in
 *    a citing page (Q6); R-NUMBER-WORDS a number spelled in words is not read (Q7); R-LIVE-WORDS a live claim through a word outside
 *    LIVE ("in use", "rolled out") is not read (Q8); R-LIVE-WITHOUT-COORDINATION a live claim in a sentence holding no COORDINATION
 *    word is not read (Q9); R-GUARD-WORD any GUARD word before the live word in its clause silences it, whatever it governs (Q10);
 *    R-ONE-LABEL one label in a sentence labels every number in it (Q11); R-ENCODED a spelling through a named reference outside
 *    NAMED_REFERENCES (&minus;) does not cite (Q12); R-FILLER a spelling split by a letter a browser draws as blank space (a Hangul
 *    filler) does not cite (Q13).
 * OVER-READS (disclosed; none today): any MechanicalWorkflows-and-GraphPolicyCLI pairing reads as the program's name; every number in
 *    a GP or citing sentence of a citing block is a GP number (a year, a count of acceptance terms); a literal, label or receipt in
 *    another sentence of the block does not qualify, and a sentence ends at every ". " ("e.g. " included); a source-only citation (a
 *    comment, a link destination) owes its literals in its source sentence although no reader sees it; only a Forge command id reads
 *    as a receipt; "live coordination stays classical" reads as a live claim; a status literal no reader plainly sees (struck, alt
 *    text, an element or an HTML block) also reads as a live claim, its own "not" unread.
 * SCOPE: the judges read words, not meaning. Display paths added: none (test-only; docs/workbench is read, never edited). Scratch:
 *    D2 and D3 compose makeScratch/removeScratch with the leak guard installed; docs, .beads and the roster are otherwise only read,
 *    and the census reads no git history (the filing pin is the seat's measurement, held in the roster).
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "mw-gp-citation-status-roster.json");
const BEAD = "wb-e66.6";
const EXPORT = ".beads/issues.jsonl";
/** The judged scope: every file git would commit below docs/workbench (its pages and docs/workbench/receipts). */
const SCOPE_ROOT = "docs/workbench";
const RECEIPTS = "docs/workbench/receipts/";

const cp = (...points: number[]): string => String.fromCodePoint(...points);
const TIMES = cp(0xd7);
const EM_DASH = cp(0x2014);
const EN_DASH = cp(0x2013);
const RIGHT_QUOTE = cp(0x2019);
const MINUS = cp(0x2212);
const PLUS_MINUS = cp(0xb1);
/** The census's own marker for a code unit a reader does not plainly see (THE RENDERED VIEW). */
const BLANK = cp(0xfffc);
/** The Unicode hyphens and dashes (U+2010 to U+2015) and the minus sign, read like a hyphen between the words of a spelling. */
const DASHES = `${cp(0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015)}${MINUS}`;

/** The statement's two pinned status literals, in its order (the anchor case reads them from the bead title's two quotes). */
interface Status {
  readonly id: "l1" | "l2";
  readonly literal: string;
  /** Where the statement pins the literal. */
  readonly source: string;
}
const STATUS: readonly Status[] = [
  { id: "l1", literal: "research/design, not integrated or verified live", source: "GPC.md:3@4b8b974ca72b" },
  { id: "l2", literal: "No new native executor, policy compiler or training integration claimed", source: "README.md:3" },
];

/** The program's spellings (THE JUDGES: CITATION). */
const SLUG = "graph-policy-coordination";
const SUBTITLES: readonly string[] = ["graph-conditioned coordination", "graph-conditioned policies"];
const SHORTHAND = "GPC.md";
const MW_NAMES: readonly string[] = ["MechanicalWorkflows", "MW"];
const GP_NAMES: readonly string[] = ["GraphPolicyCLI", "GraphPolicy", "GP"];
const SEPARATOR_RUN = `[\\s_${DASHES}-]*`;
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** A spelling's words: split at white space, underscores and hyphens and at lower-to-upper camel humps (GraphPolicyCLI -> Graph Policy CLI). */
function wordsOf(spelling: string): string[] {
  return spelling
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(word => word.length > 0);
}
function spellingSource(spelling: string): string {
  return wordsOf(spelling).map(escaped).join(SEPARATOR_RUN);
}
/** What may sit between the two names of the program: a possessive, then one of the joiners, with white space or underscores around it. */
const JOINER = `(?:['${RIGHT_QUOTE}]s?)?[\\s_]*(?:[${TIMES}xX*+/&${DASHES}-]|and|with)?[\\s_]*`;
function nameSource(first: readonly string[], second: readonly string[]): string {
  return `(?<![A-Za-z0-9])(?:${first.map(spellingSource).join("|")})${JOINER}(?:${second.map(spellingSource).join("|")})(?![A-Za-z0-9])`;
}
function citationSource(): string {
  return [spellingSource(SLUG), ...SUBTITLES.map(spellingSource), escaped(SHORTHAND), nameSource(MW_NAMES, GP_NAMES), nameSource(GP_NAMES, MW_NAMES)].join("|");
}
const CITATION = new RegExp(citationSource(), "gi");
/** The bead family's own requirement-id spelling (derived from this bead's title in the anchor case). */
const REQUIREMENT_ID = /\bMW-GRAPH-POLICY-COORDINATION-R\d+\b/g;

/** A sentence names GP: GraphPolicyCLI, GraphPolicy or GP (any case, any separator inside graph policy), touching no letter or digit. */
const GP_SUBJECT = /(?<![A-Za-z0-9])(?:graph[\s_-]*policy(?:[\s_-]*cli)?|gp)(?![A-Za-z0-9])/i;
/** A word ends at white space and at these marks; a number is a whole word of NUMBER's shape (a trailing period or colon dropped). */
const WORD_BREAK = new RegExp(`[\\s()[\\]{},;"'\`*=<>~|!?${EM_DASH}${EN_DASH}${RIGHT_QUOTE}${cp(0x2018)}${cp(0x201c)}${cp(0x201d)}]+`);
const NUMBER = new RegExp(
  `^[+${PLUS_MINUS}${MINUS}${TIMES}-]?(?:\\d{1,3}(?:,\\d{3})+(?:\\.\\d+)?|\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?(?:/\\d+(?:\\.\\d+)?)?(?:%|${TIMES}|[A-Za-z]{1,3})?$`,
);
/** The label 'synthetic', a whole word in any case. */
const SYNTHETIC = /(?<![\w-])synthetic(?![\w-])/gi;
/** A real-system receipt: a Forge command id, cmd_ and twelve lowercase hex digits, as a whole word. */
const RECEIPT = /(?<![\w-])cmd_[0-9a-f]{12}(?![\w-])/;
/** A qualifier (a status literal, the synthetic label) is cancelled by one of these in the two words before it, or by these after it. */
const NEGATION_BEFORE = /\b(?:not|never|nor|no|non|isn't|aren't|wasn't|weren't|formerly|previously)\b/i;
const NEGATION_AFTER = /^\W*(?:no longer|no more|any ?more)\b/i;
/** The live-coordination claim: a LIVE word not guarded in its clause, in a sentence holding a COORDINATION word. */
const LIVE = /\b(?:live|production|deployed)\b/gi;
const COORDINATION = /\b(?:coordinat\w*|schedul\w*|assign\w*|dispatch\w*|orchestrat\w*)\b/i;
const GUARD =
  /\b(?:no|not|never|none|nothing|nor|neither|without|cannot|can't|isn't|aren't|wasn't|weren't|doesn't|don't|didn't|won't|hasn't|haven't|when|whenever|once|if|until|unless|before|would|will|may|might|could|should|proposed|planned|future|yet)\b/i;
const GUARD_AFTER = /^\s*(?:nowhere|nothing|none|not|never|no)\b/i;
const CLAUSE_BREAK = new RegExp(`[,;:()${EM_DASH}${EN_DASH}]`);
/** A sentence ends at a run of white space after ".", "!" or "?". */
const SENTENCE_END = /(?<=[.!?])\s+/g;
/** The citing sentences this census binds (THE BINDING), each as a reader sees it and as its source spells it; none exists today. */
const BOUND: readonly string[] = [];

const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-SCOPE": ["Q1"],
  "R-REQUIREMENT-ID": ["Q2"],
  "R-PARAPHRASE-CITE": ["Q3"],
  "R-CARRIER-CONTEXT": ["Q4"],
  "R-CROSS-SENTENCE": ["Q5"],
  "R-DOCUMENT-SCOPE": ["Q6"],
  "R-NUMBER-WORDS": ["Q7"],
  "R-LIVE-WORDS": ["Q8"],
  "R-LIVE-WITHOUT-COORDINATION": ["Q9"],
  "R-GUARD-WORD": ["Q10"],
  "R-ONE-LABEL": ["Q11"],
  "R-ENCODED": ["Q12"],
  "R-FILLER": ["Q13"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to E, to the bead's own row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: `Any docs/workbench text citing the MechanicalWorkflows ${TIMES} GraphPolicyCLI program shall carry its pinned status verbatim ${EM_DASH} 'research/design, not integrated or verified live' (GPC.md:3@4b8b974ca72b); 'No new native executor, policy compiler or training integration claimed' (README.md:3)`,
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  { id: "B", label: "label GP numbers synthetic unless a real-system receipt is cited", pins: ["B1", "B2", "B3"] },
  { id: "C", label: "and never present a GP result as live coordination", pins: ["C1", "C2"] },
  {
    id: "D",
    label:
      "the docs census that binds the citing sentence (wb-cax.25 / docs-07 census style) goes red when a sentence cites the program without both status literals or presents a GP number without a 'synthetic' label or a cited real-system receipt",
    pins: ["D1", "D2", "D3"],
  },
  { id: "E", label: "until a citation exists the bead is a standing rule, not a code change", pins: ["E1"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13"] },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  A1: "Any docs/workbench text",
  A2: `citing the MechanicalWorkflows ${TIMES} GraphPolicyCLI program`,
  A3: "shall carry its pinned status verbatim",
  A4: "'research/design, not integrated or verified live' (GPC.md:3@4b8b974ca72b)",
  A5: "'No new native executor, policy compiler or training integration claimed' (README.md:3)",
  B1: "label GP numbers",
  B2: "synthetic",
  B3: "unless a real-system receipt is cited",
  C1: "and never present a GP result",
  C2: "as live coordination",
  D1: "the docs census that binds the citing sentence (wb-cax.25 / docs-07 census style)",
  D2: "goes red when a sentence cites the program without both status literals",
  D3: "or presents a GP number without a 'synthetic' label or a cited real-system receipt",
  E1: "until a citation exists the bead is a standing rule, not a code change",
};

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
/** The walk's tracked floor: git's tracked file count below SCOPE_ROOT and each directory holding a tracked file of its own, at measuredAt. */
interface WalkFloor {
  readonly measuredAt: string;
  readonly tracked: number;
  readonly directories: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly producer: { [key: string]: JsonValue };
  readonly walkFloor: WalkFloor;
  readonly constants: { [key: string]: JsonValue };
  readonly tests: readonly string[];
  readonly reached: readonly string[];
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
function objectOf(value: unknown, field: string): { [key: string]: JsonValue } {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as { [key: string]: JsonValue };
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some(entry => typeof entry !== "string")) throw new Error(`roster ${field} must be a list of strings`);
  return value as string[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows)) throw new Error("roster must be an object with bead and rows");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const floor = raw.walkFloor;
  if (
    !isObject(floor) ||
    typeof floor.measuredAt !== "string" ||
    !/^[0-9a-f]{40}$/.test(floor.measuredAt) ||
    typeof floor.tracked !== "number" ||
    !Number.isSafeInteger(floor.tracked) ||
    floor.tracked < 1
  ) {
    throw new Error("roster walkFloor needs a full measuredAt sha and a positive integer tracked count");
  }
  const directories = stringsOf(floor.directories, "walkFloor.directories");
  if (directories.length === 0 || directories.some(directory => directory !== SCOPE_ROOT && !directory.startsWith(`${SCOPE_ROOT}/`))) {
    throw new Error(`roster walkFloor.directories must list at least one directory at or below ${SCOPE_ROOT}`);
  }
  return {
    bead: raw.bead,
    producer: objectOf(raw.producer, "roster producer"),
    walkFloor: { measuredAt: floor.measuredAt, tracked: floor.tracked, directories },
    constants: objectOf(raw.constants, "roster constants"),
    tests: stringsOf(raw.tests, "tests"),
    reached: stringsOf(raw.reached, "reached"),
    rows,
  };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function newlines(text: string): number {
  return text.split("\n").length - 1;
}

// ---- THE RAW LEG: the source as written, cut into units and sentences ----

/** One judged sentence: its source line, the text its leg reads, and its plain text (the same length; BLANK where a reader does not plainly see it). */
interface Sentence {
  readonly line: number;
  readonly seen: string;
  readonly plain: string;
}
/** A unit (raw leg) or a piece (rendered leg): the block whose sentences the duties of rows B and C read together. */
interface Block {
  readonly line: number;
  readonly sentences: readonly Sentence[];
}
const BLANK_LINE = /^\s*(?:>\s*)*$/;
const LIST_ITEM = /^\s*(?:>\s*)*(?:[-*+]|\d{1,9}[.)])\s+/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TABLE_ROW = /^\s*\|/;
const FENCE = /^\s{0,3}(?:`{3,}|~{3,})/;
/** Markdown units: blank-line blocks; a heading, a table row and each fenced line are units of their own; a list item opens one. */
function markdownUnits(text: string): { line: number; text: string }[] {
  const units: { line: number; text: string }[] = [];
  let open: { line: number; lines: string[] } | undefined;
  let fenced = false;
  const flush = (): void => {
    if (open !== undefined) units.push({ line: open.line, text: open.lines.join("\n") });
    open = undefined;
  };
  for (const [index, line] of text.split("\n").entries()) {
    const at = index + 1;
    if (FENCE.test(line)) {
      flush();
      fenced = !fenced;
      units.push({ line: at, text: line });
    } else if (fenced) units.push({ line: at, text: line });
    else if (BLANK_LINE.test(line)) flush();
    else if (HEADING.test(line) || TABLE_ROW.test(line)) {
      flush();
      units.push({ line: at, text: line });
    } else if (LIST_ITEM.test(line) || open === undefined) {
      flush();
      open = { line: at, lines: [line] };
    } else open.lines.push(line);
  }
  flush();
  return units;
}
function sentencesIn(line: number, seen: string, plain: string): Sentence[] {
  const out: Sentence[] = [];
  let start = 0;
  for (const match of seen.matchAll(SENTENCE_END)) {
    out.push({ line, seen: seen.slice(start, match.index), plain: plain.slice(start, match.index) });
    start = match.index + match[0].length;
  }
  out.push({ line, seen: seen.slice(start), plain: plain.slice(start) });
  return out.filter(sentence => sentence.seen.trim().length > 0);
}
function rawBlocks(path: string, text: string): Block[] {
  const units = path.toLowerCase().endsWith(".md")
    ? markdownUnits(text)
    : text.split("\n").flatMap((line, index) => (line.trim() === "" ? [] : [{ line: index + 1, text: line }]));
  return units.map(unit => ({ line: unit.line, sentences: sentencesIn(unit.line, unit.text, unit.text) }));
}

// ---- THE RENDERED VIEW: what a reader of the rendered page sees, through marked's lexer ----

const cpText = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** The named character references the view decodes: those for ASCII marks, no-break space and the common typographic marks. */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  quot: '"',
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  sol: "/",
  hyphen: "-",
  dash: "-",
  lowbar: "_",
  colon: ":",
  semi: ";",
  comma: ",",
  period: ".",
  nbsp: cp(0xa0),
  times: TIMES,
  ndash: EN_DASH,
  mdash: EM_DASH,
  lsquo: cp(0x2018),
  rsquo: RIGHT_QUOTE,
  ldquo: cp(0x201c),
  rdquo: cp(0x201d),
};
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9A-Fa-f]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** Character references as a browser decodes them: every numeric one, and the named ones in NAMED_REFERENCES; any other stays as written. */
function referencesDecoded(text: string): string {
  return text.replace(REFERENCE, (whole: string, decimal: string | undefined, hex: string | undefined, name: string | undefined): string => {
    if (decimal !== undefined || hex !== undefined) {
      const point = decimal !== undefined ? Number.parseInt(decimal, 10) : Number.parseInt(hex ?? "", 16);
      return point > 0 && point <= 0x10ffff && (point < 0xd800 || point > 0xdfff) ? cp(point) : whole;
    }
    return name !== undefined && Object.hasOwn(NAMED_REFERENCES, name) ? (NAMED_REFERENCES[name] ?? whole) : whole;
  });
}
/** Raw HTML that renders no text: a comment (to its --> or the end), a declaration, processing instruction or CDATA section, a tag. */
const HIDDEN_HTML = /<!--(?:-?>|[\s\S]*?(?:-->|$))|<[!?][^>]*(?:>|$)|<\/?[A-Za-z][^<>]*>/g;
/** A format character (Unicode Cf: the zero-width characters, the soft hyphen) renders nothing. */
const FORMAT = /^\p{Cf}$/u;
/** The elements that never hold content, so their tag opens nothing. */
const VOID_ELEMENTS: ReadonlySet<string> = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
/** An inline HTML token's effect on the element depth: an opening tag of a non-void element opens one (+1), a closing tag closes one (-1), anything else (a comment, a declaration, a void or self-closed tag) renders nothing (0). */
function tagEffect(raw: string): number {
  const trimmed = raw.trim();
  if (/^<\/[A-Za-z]/.test(trimmed)) return -1;
  const open = /^<([A-Za-z][A-Za-z0-9-]*)(?:\s[^>]*)?>$/s.exec(trimmed);
  if (open === null || trimmed.endsWith("/>") || VOID_ELEMENTS.has((open[1] ?? "").toLowerCase())) return 0;
  return 1;
}
interface Glyph {
  readonly char: string;
  readonly plain: boolean;
}
interface Run {
  readonly glyphs: Glyph[];
  depth: number;
}
function pushText(run: Run, text: string, plain: boolean): void {
  for (const char of text) run.glyphs.push({ char, plain: plain && run.depth === 0 });
}
/** Inline tokens as a reader sees them: raw HTML renders nothing (an element's content is not plainly seen), struck text and an image's alt text are seen but not plainly, a code span or an escape renders its literal text, a link renders its text (never its destination or title), and character references are decoded. */
function inlineInto(tokens: readonly Token[], plain: boolean, run: Run): void {
  for (const token of tokens) {
    if (token.type === "html") {
      run.depth = Math.max(0, run.depth + tagEffect(token.raw));
      continue;
    }
    if (token.type === "br") pushText(run, "\n", plain);
    else if (token.type === "codespan" || token.type === "escape") pushText(run, cpText(token), plain);
    else if (token.type === "del") inlineInto(childrenOf(token), false, run);
    else if (token.type === "image") pushText(run, referencesDecoded(cpText(token)), false);
    else if (childrenOf(token).length > 0) inlineInto(childrenOf(token), plain, run);
    else pushText(run, referencesDecoded(cpText(token)), plain);
  }
}
/** A piece's text and plain text: format characters dropped, each white-space run one space, trimmed; plain holds BLANK for every code unit not plainly seen. */
function finish(run: Run, line: number, blocks: Block[]): void {
  let text = "";
  let plain = "";
  let space: boolean | undefined;
  for (const glyph of run.glyphs) {
    if (FORMAT.test(glyph.char)) continue;
    if (/^\s$/.test(glyph.char)) {
      space = space === undefined ? glyph.plain : space && glyph.plain;
      continue;
    }
    if (space !== undefined && text.length > 0) {
      text += " ";
      plain += space ? " " : BLANK;
    }
    space = undefined;
    text += glyph.char;
    plain += glyph.plain ? glyph.char : BLANK.repeat(glyph.char.length);
  }
  if (text.length > 0) blocks.push({ line, sentences: sentencesIn(line, text, plain) });
}
const newRun = (): Run => ({ glyphs: [], depth: 0 });
function renderInto(tokens: readonly Token[], line: number, blocks: Block[]): void {
  let at = line;
  for (const token of tokens) {
    const here = at;
    at += newlines(token.raw);
    if (isList(token)) {
      let itemLine = here;
      for (const item of token.items) {
        renderInto(childrenOf(item), itemLine, blocks);
        itemLine += newlines(item.raw);
      }
    } else if (isTable(token)) {
      for (const [index, row] of [token.header, ...token.rows].entries()) {
        const run = newRun();
        for (const [cell, entry] of row.entries()) {
          if (cell > 0) pushText(run, " | ", true);
          run.depth = 0;
          inlineInto(entry.tokens, true, run);
        }
        finish(run, index === 0 ? here : here + 1 + index, blocks);
      }
    } else if (token.type === "code") {
      const first = FENCE.test(token.raw) ? here + 1 : here;
      for (const [index, codeLine] of cpText(token).split("\n").entries()) {
        const run = newRun();
        pushText(run, codeLine, true);
        finish(run, first + index, blocks);
      }
    } else if (token.type === "html") {
      const run = newRun();
      pushText(run, referencesDecoded(token.raw.replace(HIDDEN_HTML, " ")), false);
      finish(run, here, blocks);
    } else if (token.type === "blockquote") renderInto(childrenOf(token), here, blocks);
    else if (token.type !== "space" && token.type !== "hr" && token.type !== "def") {
      const run = newRun();
      if (childrenOf(token).length > 0) inlineInto(childrenOf(token), true, run);
      else pushText(run, referencesDecoded(cpText(token)), true);
      finish(run, here, blocks);
    }
  }
}
const VIEWS = new Map<string, Block[]>();
/** A markdown page's rendered pieces (memoized by its text); any other file has no rendered page. */
function renderedBlocks(path: string, text: string): Block[] {
  if (!path.toLowerCase().endsWith(".md")) return [];
  const known = VIEWS.get(text);
  if (known !== undefined) return known;
  const blocks: Block[] = [];
  renderInto(marked.lexer(text), 1, blocks);
  VIEWS.set(text, blocks);
  return blocks;
}

// ---- THE JUDGES ----

/** The matches of CITATION that sit outside every requirement-id spelling. */
function citations(text: string): string[] {
  const ids = [...text.matchAll(REQUIREMENT_ID)].map(match => [match.index, match.index + match[0].length] as const);
  return [...text.matchAll(CITATION)].filter(match => !ids.some(([from, to]) => match.index >= from && match.index < to)).map(match => match[0]);
}
function literalPattern(literal: string): RegExp {
  return new RegExp(literal.split(/\s+/).map(escaped).join("\\s+"), "g");
}
const STATUS_PATTERNS: Readonly<Record<string, RegExp>> = Object.fromEntries(STATUS.map(status => [status.id, literalPattern(status.literal)]));
/** A qualifier occurrence counts where its plain text holds it, unless the two words before it (as seen) or the words after it cancel it. */
function qualified(sentence: Sentence, pattern: RegExp): boolean {
  for (const hit of sentence.plain.matchAll(pattern)) {
    const before = sentence.seen.slice(0, hit.index).split(/\s+/).filter(word => word.length > 0).slice(-2).join(" ");
    if (!NEGATION_BEFORE.test(before) && !NEGATION_AFTER.test(sentence.seen.slice(hit.index + hit[0].length))) return true;
  }
  return false;
}
function hasNumber(text: string): boolean {
  return text.split(WORD_BREAK).some(word => NUMBER.test(word.replace(/[.:]+$/, "")));
}
function labelled(sentence: Sentence): boolean {
  return qualified(sentence, SYNTHETIC) || RECEIPT.test(sentence.plain);
}
/** A LIVE word whose clause holds no GUARD word before it (as plainly seen) and no GUARD_AFTER word after it, in a sentence holding a COORDINATION word. */
function liveCoordination(sentence: Sentence): boolean {
  if (!COORDINATION.test(sentence.seen)) return false;
  for (const hit of sentence.seen.matchAll(LIVE)) {
    let start = hit.index;
    while (start > 0 && !CLAUSE_BREAK.test(sentence.seen[start - 1] ?? "")) start -= 1;
    let end = hit.index + hit[0].length;
    while (end < sentence.seen.length && !CLAUSE_BREAK.test(sentence.seen[end] ?? "")) end += 1;
    const before = sentence.plain.slice(start, hit.index);
    const after = sentence.plain.slice(hit.index + hit[0].length, end);
    if (!GUARD.test(before) && !GUARD_AFTER.test(after)) return true;
  }
  return false;
}
function squeezed(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
type Leg = "raw" | "rendered";
/**
 * One block's findings in one leg. A citing sentence owes both status literals and its binding; every sentence of a block
 * holding a citing sentence that cites or names GP owes a label for its numbers and no live-coordination claim.
 */
function blockFindings(block: Block, leg: Leg, bound: ReadonlySet<string> | undefined): string[] {
  const citing = block.sentences.map(sentence => citations(sentence.seen).length > 0);
  if (!citing.includes(true)) return [];
  const findings: string[] = [];
  for (const [index, sentence] of block.sentences.entries()) {
    const cites = citing[index] === true;
    if (cites) {
      for (const status of STATUS) if (!qualified(sentence, STATUS_PATTERNS[status.id] ?? /$^/)) findings.push(`${leg}:status-${status.id}`);
      if (bound !== undefined && !bound.has(squeezed(sentence.seen))) findings.push(`${leg}:unbound`);
    }
    if (cites || GP_SUBJECT.test(sentence.seen)) {
      if (hasNumber(sentence.seen) && !labelled(sentence)) findings.push(`${leg}:unlabelled-number`);
      if (liveCoordination(sentence)) findings.push(`${leg}:live-coordination`);
    }
  }
  return findings;
}
interface FileText {
  readonly path: string;
  readonly text: string;
}
interface Judgement {
  /** The sentences each leg read. */
  readonly sentences: { readonly raw: number; readonly rendered: number };
  /** Every citing sentence, `<path>:<line> <leg>`. */
  readonly citing: readonly string[];
  /** Every finding, `<path>:<line> <leg>:<cause>`. */
  readonly findings: readonly string[];
}
/** Judges files in both legs; with a bound list, every citing sentence must be held in it (THE BINDING). */
function judgeFiles(files: readonly FileText[], bound?: readonly string[]): Judgement {
  const held = bound === undefined ? undefined : new Set(bound.map(squeezed));
  const counts = { raw: 0, rendered: 0 };
  const citing: string[] = [];
  const findings: string[] = [];
  for (const file of files) {
    const legs: readonly [Leg, Block[]][] = [
      ["raw", rawBlocks(file.path, file.text)],
      ["rendered", renderedBlocks(file.path, file.text)],
    ];
    for (const [leg, blocks] of legs) {
      for (const block of blocks) {
        counts[leg] += block.sentences.length;
        for (const sentence of block.sentences) if (citations(sentence.seen).length > 0) citing.push(`${file.path}:${sentence.line} ${leg}`);
        for (const finding of blockFindings(block, leg, held)) findings.push(`${file.path}:${block.line} ${finding}`);
      }
    }
  }
  return { sentences: counts, citing, findings };
}
/** One control text's causes, read as a whole file at a path (binding not judged), its path and line taken off. */
function causesOf(path: string, text: string): string[] {
  return judgeFiles([{ path, text }]).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
}

// ---- THE WALK: what git would commit below SCOPE_ROOT, held to the filesystem and to the roster's tracked floor ----

function gitList(root: string): string[] {
  return execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", SCOPE_ROOT], { cwd: root, encoding: "utf8", maxBuffer: 1 << 26 })
    .split("\0")
    .filter(path => path.length > 0)
    .sort();
}
function walkList(root: string): string[] {
  if (!existsSync(join(root, SCOPE_ROOT))) return [];
  return readdirSync(join(root, SCOPE_ROOT), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(root, join(entry.parentPath, entry.name)))
    .sort();
}
/** The walked paths git ignores (git check-ignore reads them from stdin; exit 1 means none is ignored). */
function ignoredOf(root: string, paths: readonly string[]): string[] {
  if (paths.length === 0) return [];
  const result = spawnSync("git", ["check-ignore", "--stdin", "-z"], { cwd: root, input: `${paths.join("\0")}\0`, encoding: "utf8" });
  if (result.status !== 0 && result.status !== 1) throw new Error(`git check-ignore failed: ${result.stderr}`);
  return result.stdout
    .split("\0")
    .filter(path => path.length > 0)
    .sort();
}
interface Scan {
  readonly files: readonly string[];
  readonly walkOnly: readonly string[];
  readonly gitOnly: readonly string[];
}
function scanOf(root: string): Scan {
  const listed = gitList(root);
  const ignored = new Set(ignoredOf(root, walkList(root)));
  const walked = walkList(root).filter(path => !ignored.has(path));
  const known = new Set(listed);
  const kept = new Set(walked);
  return { files: listed, walkOnly: walked.filter(path => !known.has(path)), gitOnly: listed.filter(path => !kept.has(path)) };
}
/** readScope: git's list below SCOPE_ROOT under a root, every file read and judged, then the plants judged by the same call. */
function readScope(root: string, plants: readonly FileText[], bound: readonly string[]): Judgement & { files: readonly string[] } {
  const files = gitList(root);
  return { files, ...judgeFiles([...files.map(path => ({ path, text: readFileSync(join(root, path), "utf8") })), ...plants], bound) };
}

// ---- the plants, the controls and the probes ----

const [S1, S2] = STATUS.map(status => status.literal) as [string, string];
const CITE = "The graph-policy-coordination-2026-10-18 program";
const QC = `${CITE} (${S1}; ${S2})`;
const UNQUALIFIED = ["raw:status-l1", "raw:status-l2", "rendered:status-l1", "rendered:status-l2"];
const RAW_UNQUALIFIED = ["raw:status-l1", "raw:status-l2"];
const RENDERED_UNQUALIFIED = ["rendered:status-l1", "rendered:status-l2"];
const UNLABELLED = ["raw:unlabelled-number", "rendered:unlabelled-number"];
const LIVE_CLAIM = ["raw:live-coordination", "rendered:live-coordination"];
const PLANT: FileText = {
  path: "docs/workbench/zz-wb-e66.6-plant.md",
  text: [
    "# Plant",
    "",
    `The MechanicalWorkflows ${TIMES} GraphPolicyCLI program is ${S1}; ${S2}.`,
    "",
    "Pi reads the graph-policy-coordination-2026-10-18 program.",
    "",
    `${QC} reports a GP regret of 0.12, and GP scores drive live coordination.`,
    "",
  ].join("\n"),
};

interface Control {
  readonly id: string;
  readonly path?: string;
  readonly text: string;
  readonly causes: readonly string[];
}
/** Judges each control at its path (a docs/workbench page by default) and asserts its causes; returns the readings for the witness. */
function controlsHold(controls: readonly Control[]): { id: string; causes: string[] }[] {
  return controls.map(control => {
    const causes = causesOf(control.path ?? "docs/workbench/x.md", control.text);
    expect.soft(causes, `${control.id}: its causes`).toEqual([...control.causes]);
    return { id: control.id, causes };
  });
}
/** A residual's quiet row: the witness carries its own probe beside its causes (re-judged where the witness is compared). */
function probe(path: string, text: string, why: string): JsonValue {
  const causes = causesOf(path, text);
  expect(causes, why).toEqual([]);
  return json({ path, text, causes });
}
/** A quiet row's probe, read back from its witness. */
function probeOf(witness: JsonValue): { path: string; text: string; causes: JsonValue } | undefined {
  if (!isObject(witness) || typeof witness.path !== "string" || typeof witness.text !== "string" || !Array.isArray(witness.causes)) return undefined;
  return { path: witness.path, text: witness.text, causes: witness.causes };
}
/** Builds a scratch git repository holding the files, lists them through readScope's own git listing and judges them. */
function scratchScope(prefix: string, files: readonly FileText[], bound: readonly string[]): Judgement & { files: readonly string[] } {
  const root = makeScratch(prefix);
  try {
    for (const file of files) {
      mkdirSync(dirname(join(root, file.path)), { recursive: true });
      writeFileSync(join(root, file.path), file.text);
    }
    execFileSync("git", ["init", "-q"], { cwd: root });
    execFileSync("git", ["add", "-A"], { cwd: root });
    return readScope(root, [], bound);
  } finally {
    removeScratch(root);
  }
}
/** A text's citing sentences in both legs, as BOUND would hold them. */
function citingForms(path: string, text: string): string[] {
  const forms = new Set<string>();
  for (const block of [...rawBlocks(path, text), ...renderedBlocks(path, text)]) {
    for (const sentence of block.sentences) if (citations(sentence.seen).length > 0) forms.add(squeezed(sentence.seen));
  }
  return [...forms];
}

/** The pins that reached their end, in run order, each with the number of assertions its case made. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () => {
    const scan = scanOf(REPO);
    expect({ walkOnly: scan.walkOnly, gitOnly: scan.gitOnly }, `${SCOPE_ROOT}: what git would commit is the filesystem walk (git-ignored files aside), both ways`).toEqual({
      walkOnly: [],
      gitOnly: [],
    });
    const floor = ROSTER.walkFloor;
    expect(scan.files.length, `the tracked floor: ${floor.tracked} files at ${floor.measuredAt}`).toBeGreaterThanOrEqual(floor.tracked);
    const unwalked = floor.directories.filter(directory => existsSync(join(REPO, directory)) && !scan.files.some(path => dirname(path) === directory));
    expect(unwalked, "every measured directory still on disk keeps a walked file of its own").toEqual([]);
    expect(
      scan.files.filter(path => !path.endsWith(".md")),
      "every walked file is a markdown page",
    ).toEqual([]);
    const misses = scan.files.filter(path => {
      const first = textOf(path).split("\n")[0] ?? "";
      if (!path.startsWith(RECEIPTS)) return !first.startsWith("# ");
      return !first.startsWith(`# ${(path.split("/").pop() ?? "").replace(/\.md$/, "")}: `);
    });
    expect(misses, "every page opens with a level-1 heading, every receipt with its rule-15 first line '# <bead>: '").toEqual([]);
    const reading = readScope(REPO, [PLANT], BOUND);
    expect(reading.files, "readScope reads git's list").toEqual(scan.files);
    const plantFindings = reading.findings.filter(finding => finding.startsWith(`${PLANT.path}:`));
    expect(reading.findings, "the only findings are the plant's: no live sentence breaks a duty in either leg").toEqual(plantFindings);
    expect(reading.sentences.raw >= 4000 && reading.sentences.rendered >= 4000, "both legs read the pages (sentence floor 4000 each)").toBe(true);
    return json({ root: SCOPE_ROOT, walkIsGit: true, floor: { tracked: floor.tracked, directories: floor.directories }, markdownOnly: true, openingLines: true, plantFindings });
  },
  A2: () => {
    const controls: Control[] = [
      { id: "slug", text: "Pi reads graph-policy-coordination-2026-10-18.", causes: UNQUALIFIED },
      { id: "slug-upper", text: "Pi reads GRAPH-POLICY-COORDINATION.", causes: UNQUALIFIED },
      { id: "slug-underscore", text: "Pi reads graph_policy_coordination.", causes: UNQUALIFIED },
      { id: "slug-spaced", text: "Pi reads the graph policy coordination program.", causes: UNQUALIFIED },
      { id: "slug-glued", text: "Pi reads graphpolicycoordination.", causes: UNQUALIFIED },
      { id: "slug-wrapped", text: "Pi reads the graph-policy-\ncoordination program.", causes: UNQUALIFIED },
      { id: "slug-unicode-hyphen", text: `Pi reads graph${cp(0x2010)}policy${cp(0x2010)}coordination.`, causes: UNQUALIFIED },
      { id: "name-times", text: `The MechanicalWorkflows ${TIMES} GraphPolicyCLI program.`, causes: UNQUALIFIED },
      { id: "name-x", text: "The MechanicalWorkflows x GraphPolicyCLI program.", causes: UNQUALIFIED },
      { id: "name-short", text: "The MW x GP program.", causes: UNQUALIFIED },
      { id: "name-glued", text: "The MWxGP program.", causes: UNQUALIFIED },
      { id: "name-reverse", text: `GraphPolicyCLI ${TIMES} MechanicalWorkflows.`, causes: UNQUALIFIED },
      { id: "name-possessive", text: "MW's GP program.", causes: UNQUALIFIED },
      { id: "name-and", text: "MechanicalWorkflows and GraphPolicyCLI.", causes: UNQUALIFIED },
      { id: "name-dash", text: `The MW${EN_DASH}GP program.`, causes: UNQUALIFIED },
      { id: "name-entity", text: "The MechanicalWorkflows &times; GraphPolicyCLI program.", causes: RENDERED_UNQUALIFIED },
      { id: "subtitle-coordination", text: "The graph-conditioned coordination program.", causes: UNQUALIFIED },
      { id: "subtitle-policies", text: "Graph-conditioned policies.", causes: UNQUALIFIED },
      { id: "shorthand", text: "Per GPC.md:3.", causes: UNQUALIFIED },
      { id: "requirement-id", text: "MW-GRAPH-POLICY-COORDINATION-R11 binds Pi.", causes: [] },
      { id: "requirement-id-lower", text: "The mw-graph-policy-coordination-r11 slug.", causes: UNQUALIFIED },
      { id: "requirement-id-and-slug", text: "MW-GRAPH-POLICY-COORDINATION-R11 names graph-policy-coordination-2026-10-18.", causes: UNQUALIFIED },
      { id: "other-program", text: "ReactiveFiberCLI graph-policy-machine-control-2026-10-21 binds gp.", causes: [] },
      { id: "gp-alone", text: "GraphPolicyCLI scores graphs for gp rpc.", causes: [] },
      { id: "mw-alone", text: "MechanicalWorkflows owns reconcile and MW intents.", causes: [] },
      { id: "gpu", text: "MW GPU budgets.", causes: [] },
      { id: "hidden-comment", text: "<!-- graph-policy-coordination-2026-10-18 -->", causes: RAW_UNQUALIFIED },
      { id: "link-target", text: "See [the program](https://example.invalid/graph-policy-coordination-2026-10-18.md).", causes: RAW_UNQUALIFIED },
      { id: "escaped", text: "Pi reads graph\\-policy\\-coordination.", causes: RENDERED_UNQUALIFIED },
      { id: "invisible", text: `Pi reads graph${cp(0x200b)}-policy-coordination.`, causes: RENDERED_UNQUALIFIED },
      { id: "code-span", text: "Pi reads `graph-policy-coordination`.", causes: UNQUALIFIED },
      { id: "struck", text: "Pi reads ~~graph-policy-coordination~~.", causes: UNQUALIFIED },
      { id: "alt", text: "![graph-policy-coordination](x.png)", causes: UNQUALIFIED },
    ];
    return json({ citation: CITATION.source, controls: controlsHold(controls) });
  },
  A3: () => {
    const controls: Control[] = [
      { id: "visible", text: `${QC}.`, causes: [] },
      { id: "comment", text: `${CITE} <!-- ${S1}; ${S2} -->.`, causes: RENDERED_UNQUALIFIED },
      { id: "comment-one", text: `${CITE} (${S1}) <!-- ${S2} -->.`, causes: ["rendered:status-l2"] },
      { id: "struck", text: `${CITE} (~~${S1}~~; ${S2}).`, causes: ["rendered:status-l1", "rendered:live-coordination"] },
      { id: "alt", text: `${CITE} (![${S1}](status.png); ${S2}).`, causes: ["rendered:status-l1", "rendered:live-coordination"] },
      { id: "link-title", text: `${CITE} ([status](https://example.invalid/s "${S1}"); ${S2}).`, causes: ["rendered:status-l1"] },
      { id: "link-text", text: `${CITE} ([${S1}](https://example.invalid/s); ${S2}).`, causes: [] },
      { id: "code-span", text: `${CITE} (\`${S1}\`; ${S2}).`, causes: [] },
      { id: "emphasis", text: `${CITE} (*${S1}*; ${S2}).`, causes: [] },
      { id: "element", text: `${CITE} (<span hidden>${S1}</span>; ${S2}).`, causes: ["rendered:status-l1", "rendered:live-coordination"] },
      { id: "element-unclosed", text: `${CITE} (<span hidden>${S1}; ${S2}).`, causes: [...RENDERED_UNQUALIFIED, "rendered:live-coordination"] },
      { id: "void-element", text: `${CITE} (${S1};<br>${S2}).`, causes: [] },
      { id: "html-block", text: `<div>\n${QC}.\n</div>`, causes: [...RENDERED_UNQUALIFIED, "rendered:live-coordination"] },
      { id: "entity-in-literal", text: `${CITE} (research&#47;design, not integrated or verified live; ${S2}).`, causes: ["raw:status-l1"] },
      { id: "escape-in-literal", text: `${CITE} (research\\/design, not integrated or verified live; ${S2}).`, causes: ["raw:status-l1"] },
      { id: "invisible-in-literal", text: `${CITE} (research/design, not integrated or${cp(0x200b)} verified live; ${S2}).`, causes: ["raw:status-l1"] },
      { id: "heading-status", text: `## ${S1}; ${S2}\n\n${CITE}.`, causes: UNQUALIFIED },
      { id: "separate-paragraph", text: `${CITE}.\n\n${S1}; ${S2}.`, causes: UNQUALIFIED },
      { id: "separate-sentence", text: `${CITE}. Status: ${S1}; ${S2}.`, causes: UNQUALIFIED },
      { id: "list-items", text: `- ${CITE}\n- ${S1}; ${S2}`, causes: UNQUALIFIED },
      { id: "table-row", text: `| program | status |\n|---|---|\n| ${CITE} | ${S1}; ${S2} |`, causes: [] },
      { id: "table-rows-apart", text: `| program | status |\n|---|---|\n| ${CITE} | x |\n| y | ${S1}; ${S2} |`, causes: UNQUALIFIED },
      { id: "blockquote", text: `> ${CITE} (${S1};\n> ${S2}).`, causes: [] },
      { id: "fenced", text: `\`\`\`\n${CITE}\n${S1}; ${S2}\n\`\`\``, causes: UNQUALIFIED },
    ];
    return json({ controls: controlsHold(controls) });
  },
  A4: () => {
    const controls: Control[] = [
      { id: "both-quoted", text: `Status of ${CITE}: '${S1}' and '${S2}'.`, causes: [] },
      { id: "l1-only", text: `${CITE} (${S1}).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "wrapped", text: `${CITE} (research/design, not integrated\nor verified live; ${S2}).`, causes: [] },
      { id: "source-line", text: `${CITE}: 'Status 2026-10-18: ${S1}.' and ${S2}.`, causes: [] },
      { id: "capitalized", text: `${CITE} (Research/design, not integrated or verified live; ${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "altered-word", text: `${CITE} (research/design, not integrated or validated live; ${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "fragment", text: `${CITE} (not integrated or verified live; ${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "spaced-slash", text: `${CITE} (research / design, not integrated or verified live; ${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "negated", text: `${CITE} is not ${S1}; ${S2}.`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "no-longer-before", text: `${CITE} is no longer ${S1}; ${S2}.`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "formerly", text: `${CITE} was formerly ${S1}; ${S2}.`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "no-longer-after", text: `${CITE} (${S1} no longer, as filed; ${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
    ];
    return json({ literal: S1, controls: controlsHold(controls) });
  },
  A5: () => {
    const controls: Control[] = [
      { id: "l2-only", text: `${CITE} (${S2}).`, causes: ["raw:status-l1", "rendered:status-l1"] },
      { id: "final-period", text: `${CITE} (${S1}; ${S2}.)`, causes: [] },
      { id: "wrapped", text: `${CITE} (${S1}; No new native\nexecutor, policy compiler or training integration claimed).`, causes: [] },
      { id: "lowercase", text: `${CITE} (${S1}; no new native executor, policy compiler or training integration claimed).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "altered-word", text: `${CITE} (${S1}; No new native executor, policy compiler or training integration asserted).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "fragment", text: `${CITE} (${S1}; No new native executor).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "reordered", text: `${CITE} (${S1}; No new policy compiler, native executor or training integration claimed).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "design-only", text: `${CITE} (2026-10-18; design-only; ${S1}).`, causes: ["raw:status-l2", "rendered:status-l2"] },
      { id: "negated", text: `${CITE} (${S1}; not: ${S2}).`, causes: ["raw:status-l2", "rendered:status-l2"] },
    ];
    return json({ literal: S2, controls: controlsHold(controls) });
  },
  B1: () => {
    const controls: Control[] = [
      { id: "decimal", text: `${QC} reports a GP regret of 0.12.`, causes: UNLABELLED },
      { id: "percent", text: `${QC}: GP cut p95 cost by 40%.`, causes: UNLABELLED },
      { id: "multiplier", text: `${QC}: the GP scorer ran 1.3x faster.`, causes: UNLABELLED },
      { id: "count", text: `${QC} scored 1,024 graphs with GP.`, causes: UNLABELLED },
      { id: "minus", text: `${QC}: GP regret ${MINUS}12%.`, causes: UNLABELLED },
      { id: "unit", text: `${QC}: GP latency 12ms.`, causes: UNLABELLED },
      { id: "code", text: `${QC}: GP regret \`0.12\`.`, causes: UNLABELLED },
      { id: "year", text: `${QC} since 2026.`, causes: UNLABELLED },
      { id: "next-sentence", text: `${QC}. GP cut regret by 40%.`, causes: UNLABELLED },
      { id: "comment", text: `${QC} <!-- 0.12 -->.`, causes: ["raw:unlabelled-number"] },
      { id: "date", text: `${QC}, filed 2026-10-19.`, causes: [] },
      { id: "sha", text: `${QC} at 4b8b974ca72b.`, causes: [] },
      { id: "line-references", text: `${QC} per GPC.md:3 and README.md:3.`, causes: [] },
      { id: "version", text: `${QC} beside marked 18.0.11.`, causes: [] },
      { id: "ids", text: `${QC}: R11, GP-1, p95 and wb-e66.6.`, causes: [] },
      { id: "other-paragraph", text: `${QC}.\n\nGP regret 0.12.`, causes: [] },
    ];
    return json({ number: NUMBER.source, controls: controlsHold(controls) });
  },
  B2: () => {
    const controls: Control[] = [
      { id: "synthetic", text: `${QC} reports a synthetic GP regret of 0.12.`, causes: [] },
      { id: "capital", text: `${QC}: Synthetic GP regret 0.12.`, causes: [] },
      { id: "upper", text: `${QC}: GP regret 0.12 (SYNTHETIC).`, causes: [] },
      { id: "non-synthetic", text: `${QC}: non-synthetic GP regret 0.12.`, causes: UNLABELLED },
      { id: "not-synthetic", text: `${QC}: GP regret 0.12, not synthetic.`, causes: UNLABELLED },
      { id: "synthetically", text: `${QC}: GP regret 0.12, synthetically derived.`, causes: UNLABELLED },
      { id: "no-longer", text: `${QC}: GP regret 0.12, synthetic no longer.`, causes: UNLABELLED },
      { id: "other-sentence", text: `${QC}: GP regret 0.12. All GP numbers here are synthetic.`, causes: UNLABELLED },
      { id: "comment", text: `${QC}: GP regret 0.12 <!-- synthetic -->.`, causes: ["rendered:unlabelled-number"] },
      { id: "struck", text: `${QC}: ~~synthetic~~ GP regret 0.12.`, causes: ["rendered:unlabelled-number"] },
      { id: "element", text: `${QC}: GP regret 0.12 (<span hidden>synthetic</span>).`, causes: ["rendered:unlabelled-number"] },
    ];
    return json({ label: SYNTHETIC.source, controls: controlsHold(controls) });
  },
  B3: () => {
    const controls: Control[] = [
      { id: "receipt", text: `${QC}: GP regret 0.12 (cmd_0123456789ab).`, causes: [] },
      { id: "code", text: `${QC}: GP regret 0.12 (\`cmd_0123456789ab\`).`, causes: [] },
      { id: "bare", text: `${QC}: GP regret 0.12 (cmd_).`, causes: UNLABELLED },
      { id: "short", text: `${QC}: GP regret 0.12 (cmd_0123ab).`, causes: UNLABELLED },
      { id: "long", text: `${QC}: GP regret 0.12 (cmd_0123456789abc).`, causes: UNLABELLED },
      { id: "upper", text: `${QC}: GP regret 0.12 (cmd_0123456789AB).`, causes: UNLABELLED },
      { id: "other-sentence", text: `${QC}: GP regret 0.12. Receipt cmd_0123456789ab.`, causes: UNLABELLED },
      { id: "link-target", text: `${QC}: GP regret 0.12 ([receipt](https://example.invalid/cmd_0123456789ab)).`, causes: ["rendered:unlabelled-number"] },
    ];
    return json({ receipt: RECEIPT.source, controls: controlsHold(controls) });
  },
  C1: () => {
    const controls: Control[] = [
      { id: "gp-sentence", text: `${QC}. GP scores drive live coordination.`, causes: LIVE_CLAIM },
      { id: "citing-sentence", text: `${QC} is live.`, causes: LIVE_CLAIM },
      { id: "graph-policy", text: `${QC}. The GraphPolicyCLI scorer feeds live scheduling.`, causes: LIVE_CLAIM },
      { id: "gp-lowercase", text: `${QC}. gp output drives live dispatch.`, causes: LIVE_CLAIM },
      { id: "no-gp-subject", text: `${QC}. Scheduling is live in Forge.`, causes: [] },
      { id: "other-paragraph", text: `${QC}.\n\nGP scores drive live coordination.`, causes: [] },
      { id: "status-literal", text: `${QC}.`, causes: [] },
    ];
    return json({ subject: GP_SUBJECT.source, controls: controlsHold(controls) });
  },
  C2: () => {
    const controls: Control[] = [
      { id: "live", text: `${QC}. GP results steer live orchestration.`, causes: LIVE_CLAIM },
      { id: "production", text: `${QC}. GP assignments run in production.`, causes: LIVE_CLAIM },
      { id: "deployed", text: `${QC}. The GP scorer is deployed for task dispatch.`, causes: LIVE_CLAIM },
      { id: "not", text: `${QC}. GP results are not live coordination.`, causes: [] },
      { id: "never", text: `${QC}. GP never drives live coordination.`, causes: [] },
      { id: "would", text: `${QC}. GP would drive live coordination.`, causes: [] },
      { id: "guard-after", text: `${QC}. GP output is live nowhere in Pi's coordination.`, causes: [] },
      { id: "comma-clause", text: `${QC}. GP output, not live coordination, feeds the shadow log.`, causes: [] },
      { id: "comment-guard", text: `${QC}. GP <!-- never --> drives live coordination.`, causes: ["rendered:live-coordination"] },
      { id: "struck-guard", text: `${QC}. GP ~~never~~ drives live coordination.`, causes: ["rendered:live-coordination"] },
      { id: "over-read", text: `${QC}. GP stays in shadow mode; live coordination stays classical.`, causes: LIVE_CLAIM },
    ];
    return json({ live: LIVE.source, coordination: COORDINATION.source, guard: [GUARD.source, GUARD_AFTER.source], controls: controlsHold(controls) });
  },
  D1: () => {
    const live = readScope(REPO, [], BOUND);
    expect(live.citing, "no live sentence cites the program, so every live citing sentence is bound").toEqual([]);
    const path = "docs/workbench/zz-d1.md";
    const text = `# D1\n\n${QC}.\n`;
    const unbound = judgeFiles([{ path, text }], BOUND).findings;
    expect(unbound, "a qualified citing sentence BOUND does not hold reds in both legs").toEqual([`${path}:3 raw:unbound`, `${path}:3 rendered:unbound`]);
    const forms = citingForms(path, text);
    const held = judgeFiles([{ path, text }], [...BOUND, ...forms]).findings;
    expect(held, "its bound twin is quiet").toEqual([]);
    const hiddenText = `# D1\n\n<!-- ${QC}. -->\n`;
    const hidden = judgeFiles([{ path, text: hiddenText }], BOUND).findings;
    expect(hidden, "a citation only the source holds is bound like any other").toEqual([`${path}:3 raw:unbound`]);
    return json({ bound: BOUND, liveCiting: live.citing, unbound, forms, held, hidden });
  },
  D2: () => {
    const mutant = "Pi reads the graph-policy-coordination-2026-10-18 program.";
    const files = (sentence: string): FileText[] => [
      { path: "docs/workbench/mutant.md", text: `# Mutant\n\n${sentence}\n` },
      { path: "docs/workbench/receipts/wb-mutant.md", text: `# wb-mutant: mutant\n\n${sentence}\n` },
    ];
    const flagged = scratchScope("wb-e66.6-mutant-", files(mutant), BOUND);
    expect(flagged.files, "readScope lists the committed mutants through git").toEqual(["docs/workbench/mutant.md", "docs/workbench/receipts/wb-mutant.md"]);
    expect(flagged.findings.length, "the census goes red on the unqualified citation in a page and in a receipt").toBeGreaterThan(0);
    const twin = `${QC}.`;
    const quiet = scratchScope("wb-e66.6-twin-", files(twin), [...BOUND, ...citingForms("docs/workbench/mutant.md", `# Mutant\n\n${twin}\n`)]);
    expect(quiet.findings, "the qualified, bound twin passes").toEqual([]);
    expect(quiet.citing.length, "and still cites (both files, both legs)").toBe(4);
    return json({ files: flagged.files, flagged: flagged.findings, quiet: quiet.findings });
  },
  D3: () => {
    const page = (sentence: string): FileText[] => [{ path: "docs/workbench/mutant.md", text: `# Mutant\n\n${sentence}\n` }];
    const bindOf = (sentence: string): string[] => [...BOUND, ...citingForms("docs/workbench/mutant.md", `# Mutant\n\n${sentence}\n`)];
    const mutant = `${QC} reports a GP regret of 0.12.`;
    const synthetic = `${QC} reports a synthetic GP regret of 0.12.`;
    const receipt = `${QC} reports a GP regret of 0.12 (cmd_0123456789ab).`;
    const flagged = scratchScope("wb-e66.6-number-", page(mutant), bindOf(mutant));
    expect(flagged.findings, "the census goes red on the unlabelled GP number of a qualified, bound citation").toEqual([
      "docs/workbench/mutant.md:3 raw:unlabelled-number",
      "docs/workbench/mutant.md:3 rendered:unlabelled-number",
    ]);
    const labelled = scratchScope("wb-e66.6-synthetic-", page(synthetic), bindOf(synthetic));
    expect(labelled.findings, "the synthetic twin passes").toEqual([]);
    const receipted = scratchScope("wb-e66.6-receipt-", page(receipt), bindOf(receipt));
    expect(receipted.findings, "the receipted twin passes").toEqual([]);
    return json({ flagged: flagged.findings, synthetic: labelled.findings, receipt: receipted.findings });
  },
  E1: () => {
    const reading = readScope(REPO, [PLANT], BOUND);
    const live = reading.citing.filter(entry => !entry.startsWith(`${PLANT.path}:`));
    expect(live, "no live sentence cites the program in either leg: the passing-empty state").toEqual([]);
    const plantCiting = reading.citing.filter(entry => entry.startsWith(`${PLANT.path}:`));
    expect(plantCiting.length, "the same call reads the plant's citations").toBeGreaterThan(0);
    return json({ liveCiting: live, plantCiting });
  },
  Q1: () => {
    const outside = ["README.md", "CHANGELOG.md", "AGENTS.md", "docs/rpc.md", "src/index.ts", "qa/workbench/receipts-index.mjs", "test/source-hygiene.test.ts"];
    for (const path of outside) expect(existsSync(join(REPO, path)), `${path} exists`).toBe(true);
    const listed = gitList(REPO);
    expect(
      outside.filter(path => listed.includes(path)),
      "the walk lists none of them",
    ).toEqual([]);
    return json({ outside, listed: outside.filter(path => listed.includes(path)) });
  },
  Q2: () =>
    probe(
      "docs/workbench/receipts/wb-e66.5.md",
      "# wb-e66.5: [MW-GRAPH-POLICY-COORDINATION-R10] Pi shall adopt no GP-conditioned coordination at runtime\n",
      "a sentence whose only match is a requirement id does not cite",
    ),
  Q3: () => probe("docs/workbench/x.md", "Pi reads the MW graph-scoring coordination deposit of 2026-10-18.", "a paraphrased citation does not cite"),
  Q4: () => probe("docs/workbench/x.md", `${CITE} is not, as of today, ${S1}; ${S2}.`, "a negation more than two words before a status literal does not cancel it"),
  Q5: () => probe("docs/workbench/x.md", `${QC}. Its regret fell by 40% under live scheduling.`, "a sentence naming neither GP nor the program is not judged, even in a citing block"),
  Q6: () => probe("docs/workbench/x.md", `${QC}.\n\nGP regret 0.12 drives live coordination.`, "a block holding no citing sentence is not judged, even in a citing page"),
  Q7: () => probe("docs/workbench/x.md", `${QC}: GP cut regret by forty percent.`, "a number spelled in words is not read"),
  Q8: () => probe("docs/workbench/x.md", `${QC}. GP results are in use and rolled out for coordination.`, "a live claim through a word outside LIVE is not read"),
  Q9: () => probe("docs/workbench/x.md", `${QC}. GP results are live.`, "a live claim with no coordination word in its sentence is not read"),
  Q10: () => probe("docs/workbench/x.md", `${QC}. GP that was never tuned drives live coordination.`, "a guard word before the live word in its clause silences it, whatever it governs"),
  Q11: () => probe("docs/workbench/x.md", `${QC}: GP regret 0.12 and cost 9.5 (cmd_0123456789ab for the cost only).`, "one label in a sentence labels every number in it"),
  Q12: () => probe("docs/workbench/x.md", "Pi reads graph&minus;policy&minus;coordination.", "a spelling through a named reference the view does not decode does not cite"),
  Q13: () => probe("docs/workbench/x.md", `Pi reads graph${cp(0x3164)}policy${cp(0x3164)}coordination.`, "a spelling split by a filler letter does not cite"),
};

function constants(): JsonValue {
  return json({
    scope: SCOPE_ROOT,
    receipts: RECEIPTS,
    status: STATUS,
    slug: SLUG,
    subtitles: SUBTITLES,
    shorthand: SHORTHAND,
    names: { mw: MW_NAMES, gp: GP_NAMES, joiner: JOINER },
    citation: CITATION.source,
    requirementId: REQUIREMENT_ID.source,
    gpSubject: GP_SUBJECT.source,
    number: { wordBreak: WORD_BREAK.source, shape: NUMBER.source },
    synthetic: SYNTHETIC.source,
    receipt: RECEIPT.source,
    negation: [NEGATION_BEFORE.source, NEGATION_AFTER.source],
    live: { live: LIVE.source, coordination: COORDINATION.source, guard: GUARD.source, guardAfter: GUARD_AFTER.source, clauseBreak: CLAUSE_BREAK.source },
    sentenceEnd: SENTENCE_END.source,
    units: [BLANK_LINE.source, LIST_ITEM.source, HEADING.source, TABLE_ROW.source, FENCE.source],
    rendered: { namedReferences: NAMED_REFERENCES, reference: REFERENCE.source, hiddenHtml: HIDDEN_HTML.source, format: FORMAT.source, voidElements: [...VOID_ELEMENTS] },
    bound: BOUND,
    quotes: QUOTES,
    plant: PLANT,
    residuals: RESIDUALS,
  });
}

/** The bead's own row in the tracker export. */
function beadRow(): { title: string; notes: string } {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The title as filed spells its two non-ASCII marks as \u escapes; they are read as the characters they name. */
function unescaped(text: string): string {
  return text.replace(/\\u([0-9a-fA-F]{4})/g, (_whole: string, hex: string): string => cp(Number.parseInt(hex, 16)));
}
function quotedWords(text: string): string[] {
  return [...text.matchAll(/'([^']+)'/g)].map(match => match[1] ?? "");
}
/** The quotes tile the label in order, with nothing but separators (white space, comma, semicolon, colon, parentheses, an em dash) between. */
function tiles(label: string, quotes: readonly string[]): boolean {
  const separators = new RegExp(`^[\\s,;:()${EM_DASH}]*$`);
  let at = 0;
  for (const quote of quotes) {
    const found = label.indexOf(quote, at);
    if (found < 0 || !separators.test(label.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(label.slice(at));
}

describe("wb-e66.6 MW x GP coordination citation-status census (MW-GRAPH-POLICY-COORDINATION-R11)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:3", "C:2", "D:3", "E:1", "Q:13"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(QUOTES).sort(), "every pin of rows A to E carries a quote").toEqual(ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(constants()).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a Q pin`).toContain(member);
    expect(
      Object.values(RESIDUALS)
        .flat()
        .sort(),
      "every Q pin is a residual's quiet row",
    ).toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    for (const [pin, impl] of Object.entries(IMPL)) expect(/rosterWitness/.test(impl.toString()), `${pin}'s case never reads its roster witness`).toBe(false);
    const named = new Map<string, string[]>();
    for (const [pin, quote] of Object.entries(QUOTES)) {
      const words = quotedWords(quote);
      expect(words.length, `${pin}'s quote carries at most one quoted element`).toBeLessThanOrEqual(1);
      const witness = JSON.stringify(rosterWitness(pin));
      for (const word of words) {
        expect(witness, `${pin}'s witness carries its quote's '${word}'`).toContain(word);
        named.set(word, [...(named.get(word) ?? []), pin]);
      }
    }
    const elements = ROWS.filter(row => row.id !== "Q").flatMap(row => quotedWords(row.label));
    expect(
      elements.map(word => `${word}: ${(named.get(word) ?? []).join(",")}`),
      "each quoted element of a label is carried by exactly one pin",
    ).toEqual(elements.map(word => `${word}: ${(named.get(word) ?? ["-"]).length === 1 ? (named.get(word) ?? []).join(",") : "not one"}`));
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the status literals, the spellings and the vocabulary; the producer block carries the program's lines", () => {
    const { title, notes } = beadRow();
    expect(title.length > 0 && notes.length > 0, `${BEAD}'s row was read from the tracker export`).toBe(true);
    const id = /^\[([A-Z-]+-R\d+)\] /.exec(title)?.[1] ?? "-";
    expect(REQUIREMENT_ID.source, "REQUIREMENT_ID is the bead family's id form").toBe(`\\b${escaped(id.replace(/-R\d+$/, ""))}-R\\d+\\b`);
    expect(citations(id), "the bead's own id is exempt as a requirement id").toEqual([]);
    expect(id.match(new RegExp(CITATION.source, "gi"))?.length ?? 0, "and spells CITATION, the namesake the exemption exists for").toBeGreaterThan(0);
    const statement = unescaped(title.slice(id.length + 3));
    const [a, b, c] = ROWS.slice(0, 3).map(row => row.label);
    expect(statement, "rows A, B and C tile the statement").toBe(`${a} ${EM_DASH} ${b}, ${c}.`);
    const shape = /Acceptance shape: (.+?); (until a citation exists .+?)\.(?: |$)/.exec(notes);
    expect([shape?.[1], shape?.[2]], "rows D and E are the filing's acceptance shape").toEqual([ROWS[3]?.label, ROWS[4]?.label]);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "-")), `row ${row.id}'s pin quotes tile its label`).toBe(true);
    }
    expect(quotedWords(statement), "the status literals are the statement's two quotes, in order").toEqual(STATUS.map(status => status.literal));
    for (const status of STATUS) expect(statement.includes(`'${status.literal}' (${status.source})`), `${status.id} is pinned at ${status.source}`).toBe(true);
    expect(statement.includes(`the ${MW_NAMES[0]} ${TIMES} ${GP_NAMES[0]} program`), "the program's name is the statement's").toBe(true);
    expect(/\((GPC\.md):3@/.exec(statement)?.[1], "the shorthand is the statement's").toBe(SHORTHAND);
    expect(/\bGP numbers\b/.test(statement) && /\ba GP result\b/.test(statement), "GP is the statement's subject word").toBe(true);
    expect(GP_NAMES.includes("GP") && GP_SUBJECT.test("GP") && GP_SUBJECT.test(GP_NAMES[0] ?? "-"), "GP_SUBJECT reads GP and the program's GP name").toBe(true);
    expect([...`${c}`.matchAll(LIVE)].map(match => match[0]), "LIVE reads the statement's live").toEqual(["live"]);
    expect(COORDINATION.test(c ?? "-"), "COORDINATION reads the statement's coordination").toBe(true);
    expect(quotedWords(ROWS[3]?.label ?? "-"), "the label word is the acceptance shape's quote").toEqual(["synthetic"]);
    expect(SYNTHETIC.source.includes("synthetic"), "SYNTHETIC reads it").toBe(true);
    const source = /Source: (docs\/programs\/(graph-policy-coordination)-\d{4}-\d{2}-\d{2}\.md):3 \('([^']+)'\)/.exec(notes);
    expect(source?.[2], "the slug is the filed source path's").toBe(SLUG);
    const mw = ROSTER.producer.mw;
    expect(isObject(mw), "the roster carries the MW producer block").toBe(true);
    if (!isObject(mw) || !isObject(mw.gpc) || !isObject(mw.readme)) return;
    expect(mw.gpc.path, "the producer's GPC.md is the filed source path").toBe(source?.[1]);
    expect(/@([0-9a-f]{12})/.exec(statement)?.[1], "the producer sha is the statement's pin").toBe(String(mw.sha).slice(0, 12));
    expect(String(mw.gpc.line3).replace(/\*\*/g, ""), "GPC.md:3 at the pin is the filed quote").toBe(source?.[3]);
    expect(String(mw.gpc.line3).includes(S1), "and carries the first status literal").toBe(true);
    const readmeLine3 = String(mw.readme.line3);
    const readme3 = /README\.md:3 \('([^']+)' \.\.\. '([^']+)'\)/.exec(notes);
    expect(
      [readme3?.[1], readme3?.[2]].every(quote => quote !== undefined && readmeLine3.includes(quote)),
      "README.md:3 at the pin carries the filed quotes",
    ).toBe(true);
    expect(String(mw.readme.line3).includes(S2), "and the second status literal").toBe(true);
    const readme19 = /:19 \('([^']+)'\)/.exec(notes)?.[1] ?? "-";
    expect(String(mw.readme.line19).includes(readme19) && new RegExp(SYNTHETIC.source, "i").test(readme19), "README.md:19 at the pin carries the filed synthetic-vs-real quote").toBe(true);
    const gpc22 = /and :22 \('([^']+)'\)/.exec(notes)?.[1] ?? "-";
    expect(String(mw.gpc.line22).includes(gpc22), "GPC.md:22 at the pin carries the filed quote").toBe(true);
    const titles = [String(mw.gpc.line1), String(mw.readme.line1)];
    expect(
      titles.map(line => line.includes(`${MW_NAMES[0]} ${TIMES} ${GP_NAMES[0]}`)),
      "both program documents open with the program's name",
    ).toEqual([true, true]);
    expect(
      SUBTITLES.map(subtitle => titles.some(line => line.endsWith(`${EM_DASH} ${subtitle}`))),
      "each subtitle is a program document's title",
    ).toEqual([true, true]);
    for (const line of titles) expect(citations(line).length, "each document title cites the program").toBeGreaterThan(0);
    const pin = /at ([0-9a-f]{12}) = 0 hits/.exec(notes)?.[1] ?? "-";
    expect(String(ROSTER.producer.filingPin ?? "").startsWith(pin), "the filing pin is the filed measurement's tree").toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const before = expect.getState().assertionCalls;
          const witness = impl === undefined ? null : json(impl());
          const made = expect.getState().assertionCalls - before;
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
          const quiet = probeOf(witness);
          if (quiet !== undefined) expect(causesOf(quiet.path, quiet.text), `${pin}'s causes are its own probe's`).toEqual(quiet.causes);
          REACHED.push(`${pin}:${made}`);
        });
      }
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
    expect(
      REACHED.map(entry => entry.split(":")[0]),
      "in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
  });
});
