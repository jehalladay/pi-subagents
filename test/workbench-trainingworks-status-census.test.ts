/**
 * wb-4wmu.1 (BEADS-TRAININGWORKS-R1, program-triage-2026-10-22), the TrainingWorks status census.
 * Statement (bead notes, full form): "Any Pi docs/workbench text or status-ledger row citing a TrainingWorks deposit (any of the six
 * repos) or the HyperUnix x GraphPolicyCLI program shall carry that deposit's pinned status line verbatim (e.g. beads 'no code, test
 * or task-store mutation'; HX GP 'design only'), never present a TrainingWorks adapter, export or policy, or GP-planned hx, as
 * shipped, faster or integrated, and never claim a fixture, fake-producer or hermetic run equals live Furnace/Beads success; with
 * zero citations today, zero matches passes." (beads docs/programs/trainingworks-2026-10-18/README.md:24@105a90b5ed39.)
 * Acceptance (owner filing, verbatim; the labels of rows A to C quote it): "(a) every /TrainingWorks|graph-policy-optimization|
 * GraphPolicy/ match in docs/workbench sits within 400 chars of its deposit's verbatim status phrase; (b) no ledger or matrix row
 * names a TrainingWorks adapter, export, policy or GP-planned hx 'shipped', 'gate-pass' or 'live-sdk', or an hx speedup without a
 * cmd_ receipt; (c) validateLedger refuses a 'shipped'/'gate-pass'/'live-sdk' row backed only by a hermetic or fixture receipt (new
 * guard), and no docs or TRACEABILITY sentence equates a fixture run with live Furnace/Beads success."
 *
 * RESPIN 1 (cut #2, curing refusal #1 of cut #1): every docs judge reads what a reader sees - the RENDERED VIEW below - and never
 * the markdown source: clause (a)'s windows, gaps and file attribution and clause (c)'s sentences (U1), the matrix legend from its
 * one rendered section (U2), and clause (b)'s table rows, so a comment, a tag or markup inside a row reads as it renders too. The
 * riders are pinned controls: F3 a 7-hex sha pin and an "HX GP" mark in an attributed file (A2); F4 a bare and a short cmd_ token
 * (B2), two adjacent list items and a heading line (C2).
 *
 * FOLLOW-UP (wb-9chv, the R694 follow-up of the landing-376 gate's F1): clause (b) reads the rows of marked table tokens, so a
 * table written in raw HTML - an HTML block, table tags inline in a paragraph, a table inside a list item - renders no table row
 * and is not read. The R-HTML-TABLE residual names that with its pinned quiet row Q12, which also holds both judged documents to
 * render no HTML block and to hold no table tag (so every table row they render is a marked table row) and cites the two
 * gate-level guards that close the route for them: the W10 stamped-claim guard's page check on the matrix and the TRACEABILITY
 * freeze. The follow-up is test-only: it edits no product, docs, ledger or matrix text.
 *
 * MEASURED (read-only, by the cutting seats, 2026-10-23 and 2026-10-24; the producer facts ride the roster with their blob ids):
 * each deposit's README.md:3 at its pin is its status line, and DEPOSITS holds that line's status clause verbatim: HX "no new HX
 * code implemented", Forge "proposed additive source adapter, not implemented", Furnace "no simulator or policy hooks implemented by
 * this commit", MW "no new implementation asserted", beads "no code, test or task-store mutation", RFCLI "not a shipped
 * TrainingWorks adapter or new host capability" (the filing's 'not a shipped adapter' elides "TrainingWorks": the census holds the
 * source's words and reads each filed quote as an in-order word subsequence of its phrase), and HX GP
 * (graph-policy-optimization-2026-10-18) "design only". At the filing pin d75b68d no docs/workbench line matched (a)'s pattern. At
 * this census's base 14 matches on 11 lines of 3 files do, in the rendered view as in the source (docs/workbench/03 :37-:78,
 * receipts wb-1xvp.3 and wb-1xvp.5), all landed after the filing by the RF-GRAPH-POLICY-MACHINE-CONTROL beads (wb-1xvp.2 first, at
 * f7d023b): every one names the GraphPolicyCLI tool (gp), none spells the TrainingWorks name or the HX x GP program within 400
 * characters, and each file's rendered text names ReactiveFiberCLI's graph-policy-machine-control program, so each is an
 * ATTRIBUTED NAMESAKE - it cites neither a TrainingWorks deposit nor the HX x GP program and owes no status phrase. TRACEABILITY.md
 * (frozen byte-exact) has one live-sdk row, WB-009 (receipt clauses "Real SDK events" and "session UUIDs"), one gate-pass row,
 * WB-019 (no receipt clause: its live cell is an em dash and it carries no cmd_ token), and no shipped row. Neither the ledger nor
 * the matrix has a row naming TrainingWorks, the HX x GP program, gp beside hx, or an hx speedup, and no docs sentence spells a
 * fixture side, "live", Furnace or Beads and a success word together. The 71 tracked docs pages hold no HTML comment, no HTML
 * block, no image and no character reference; their raw HTML is seven inline placeholders (<id>, <TBD>, ...), which render nothing.
 * Re-measured for R-HTML-TABLE (wb-9chv, at trunk 799eebe): TRACEABILITY.md holds no html token and feature-matrix.md two, the
 * inline <id> placeholders of its invoke:<id> cells; neither renders an HTML block or holds a table tag.
 *
 * RENDERED VIEW. What a reader sees of a markdown page, read through marked's lexer (the repository's marked devDependency, 18.0.11
 * at this cut, the renderer the refusal's readings used). A PIECE is one rendered block: a heading, a paragraph, a list item's own
 * text, a table row (its rendered cells joined by " | "), one line of a code block, or the visible text of an HTML block. Raw HTML
 * renders no text of its own (HIDDEN_HTML): a tag, a comment (an unterminated one runs to the end of its HTML block, as CommonMark
 * reads it), a processing instruction, a declaration or a CDATA section (each to its first ">", as a browser reads them); the
 * text between tags renders. Inline markup renders its
 * text, so emphasis, a tag or a comment inside a word does not split it; a code span or a code block renders its literal text; a
 * link renders its text, not its destination; an image renders its alt text (as test/helpers/census.ts reads it). Outside code,
 * character references are decoded (every numeric one, and the named ones in NAMED_REFERENCES), format characters (Unicode Cf:
 * zero-width characters, the soft hyphen) render nothing, and a white-space run reads as one space. A page's rendered text is its
 * pieces joined by a line break: clause (a)'s windows and gaps count its UTF-16 code units, a status phrase matches inside one piece
 * (PHRASE_SPACE: any white space but a line break between its words), and a sentence never spans two pieces. The matrix legend is
 * read through the shared rendered-section helper (test/helpers/census.ts docsSection): its "Status legend" heading must render
 * exactly once, under the matrix title (a copy in a comment or a code fence is no heading), and the legend is the one list rendered
 * after the section's one vocabulary line - uniqueness and extraction in that same view.
 *
 * THE JUDGES. (a) For every match of the filing's pattern in a docs/workbench page's rendered text, the window is the 400
 * characters on each side. A window spelling "TrainingWorks" (any case) cites the TrainingWorks family; one spelling
 * graph-policy-optimization, the program's title "HyperUnix x GraphPolicyCLI" (x or the multiplication sign) or "HX GP" cites the HX
 * x GP program. A cited family owes the phrase of the deposit its window pins by sha (7 hex or more; HX's two deposits share a sha
 * and the family tells them apart), or, pinning none, any phrase of the family; the phrase must sit within 400 characters of the
 * match (the characters strictly between the two). A match citing neither family is a namesake: attributed when its page's
 * rendered text names the graph-policy-machine-control program (its program id or its directory), otherwise owed some deposit's
 * phrase within the window like any citation. (b) Every rendered table row of TRACEABILITY.md and feature-matrix.md - each row of a
 * marked table token; a table written in raw HTML renders no table token and is not read (R-HTML-TABLE), and Q12 holds both
 * documents to render no HTML block and no table tag - is read with the Status cell of its table. A row names a subject when it
 * spells TrainingWorks or graph-policy-optimization, or gp, GraphPolicy or GraphDataIR beside hx or HyperUnix; it presents the
 * subject as shipped when its status is one of the three words (b) quotes or
 * a matrix status whose legend definition is or names landed-gated (landed-gated, partial), or when its text spells one of the
 * three words. A row spelling hx or HyperUnix beside a speedup word owes a cmd_ receipt in the row. (c) The guard is the product's:
 * qa/workbench/status-ledger.mjs refuses (integrity rule receipt-tier) a shipped, gate-pass or live-sdk row whose receipt clauses -
 * each ";" clause of its live/native cell other than the em dash, and each clause of another evidence cell carrying a cmd_ token -
 * are all fixture tier (FIXTURE_TIER: the clause names a fixture, a fake producer or a hermetic run). The sentence judge reads every
 * docs .md page's rendered pieces (a piece ends a sentence - so a heading, a list item, a table row and a code line each do - and
 * inside a piece terminal punctuation or a table-cell bar does): a sentence equates when it spells a fixture side (FIXTURE_TIER),
 * "live", Furnace or Beads and a success word, and an equating predicate (equals, counts as, proves, means, is, ...) not negated in
 * its own clause before it (never, not, no, cannot, without, distinguish, ...) and not followed by not, never, no, distinct,
 * different, separate or unlike.
 *
 * ROWS. A, (a): A1 the real docs/workbench walk (git-tracked, exact) - no finding, every match a citation or an attributed namesake,
 *    the namesakes found in the three measured files; A2 the judge on flagged and quiet controls (window boundary, sha attribution,
 *    the HX x GP family, the unattributed namesake, a line-wrapped phrase, and the rendered view: a phrase, an attribution or a
 *    mention only inside a comment, a name split by markup, a reference or an invisible character, an unterminated comment (one
 *    holding a ">" too), an empty comment, a CDATA section, processing instruction or declaration, an HTML block's text, code, a
 *    blockquote, a table header cell, a named reference in the HX x GP title, a phrase split across list items, and a finding's
 *    source line). B, (b): B1 the real ledger and matrix - every rendered table row read (each document's own table-line count
 *    outside code and HTML blocks), the product parser's 50 WB rows among them with their statuses, every matrix status a legend
 *    word, no finding; B2 the judge on ledger and matrix controls (with a bare and a short cmd_ token, and the rendered view: a
 *    subject split by a comment, an emphasized status, a receipt or a claim word only inside a comment, and a row only inside a
 *    comment or code, which neither the source count nor the rendered read counts); B3 the legend reader on controls built from
 *    the real matrix (a commented or fenced legend copy before the heading or inside the section, a second rendered heading, a
 *    second vocabulary line, a renamed heading, a comment between the vocabulary line and its list, a malformed item). C, (c): C1
 *    the guard through the product module - each claim status refused on fixture-tier receipts alone (live cell or a labelled cmd_
 *    clause), a mixed row and non-claim rows accepted, the live ledger clean; C2 the real docs walk (git-tracked, exact) - no
 *    finding - and the sentence judge on controls (with two adjacent list items and a heading line, and the rendered view). Q, the
 *    residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/trainingworks-status-roster.json). OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker
 * export (.beads/issues.jsonl): each acceptance clause is exactly one row's label; the pattern, the window and the scope are clause
 * (a)'s; the claim words are the ones clauses (b) and (c) quote and the product guard's CLAIM_STATUSES; FIXTURE_TIER's alternatives
 * are the statement's fixture, fake-producer and hermetic run; the sentence scope is clause (c)'s; DEPOSITS are the filing's merged
 * list, repo, sha and line, each filed quote an in-order word subsequence of its phrase. The matrix legend, read through the shared
 * helper, binds MATRIX_LEGEND and MATRIX_CLAIMS. The last case reads the vitest task tree (every registered test, in roster order,
 * in run mode, ran before it) and the pins reached.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a control removed while every remaining control still holds; a pin's case
 * replaced by one that echoes its roster witness; the outside-anchor case or the closing case removed with its roster title; a
 * constant narrowed in both, such as an element dropped from TABLE_TAG (td dropped from both with a <td> tag planted in a matrix
 * cell: 22 of 22 pass) or a cited guard's spelling rewritten in both.
 * RESIDUALS (named, each with its pinned quiet row): R-ATTRIBUTED-FILE a GraphPolicy mention without a family mark in a page that
 * names the graph-policy-machine-control program is attributed to that program, so an HX x GP citation spelled there without its
 * directory, title or "HX GP" is not held to "design only" (Q1); R-UNPINNED a TrainingWorks citation pinning no deposit sha is held
 * to the family, so a Forge mention beside the beads phrase passes (Q2); R-SCOPE (a) reads docs/workbench only, so README.md,
 * CHANGELOG.md and the root docs pages are not judged (Q3); R-UNLABELLED a claim row whose fixture-tier receipt is unlabelled - a
 * bare cmd_ token, a live clause naming no fixture, fake or hermetic word - reads live tier (Q4); R-ABSENT a claim row with no
 * receipt clause at all is not judged by receipt-tier, as the live ledger's WB-019 gate-pass row shows (Q5; TRACEABILITY is frozen
 * byte-exact and the baseline paragraph's cmd_65b034a22fb5 sits outside the row); R-PARAPHRASE an equation through a predicate
 * outside EQUATING ("vouches for") is not read (Q6); R-SUBJECT-NAME a TrainingWorks adapter row that never spells TrainingWorks
 * ("TW export") or a GP-planned hx row spelling neither gp nor GraphPolicy ("learned hx planner") names no subject (Q7);
 * R-STATUS-WORD a subject row whose status lies outside both claim lists (the W16 table's "landed") and that spells no claim word
 * reads unclaimed (Q8); R-ENCODED a look-alike letter (a Cyrillic a inside "TrainingWorks") or a named reference outside
 * NAMED_REFERENCES ("&hyphen;") is not folded, so the spelling is no match (Q9); R-LINK-TARGET a link destination renders no text,
 * so a deposit sha carried only there pins nothing and the citation is held to its family (Q10); R-HIDDEN-HTML an element a browser
 * hides (the hidden attribute, a display:none style, template, script, style) still renders its text in this view, so a phrase
 * hidden that way satisfies its citation (Q11); R-HTML-TABLE a table written in raw HTML (an HTML block, table tags inline in a
 * paragraph, a table inside a list item) renders no marked table token, so clause (b) reads none of its rows: an HTML row
 * presenting a TrainingWorks subject as landed-gated or shipped, or an hx speedup without a cmd_ receipt, reads no finding, while
 * the same row as a markdown table row is flagged (Q12). The route is closed for the two judged documents outside this census -
 * the W10 stamped-claim guard (test/workbench-w10-stamped-claim-guard.test.ts) refuses every raw HTML token on the matrix but a
 * complete comment, and the TRACEABILITY freeze (test/workbench-traceability-freeze.test.ts) pins the ledger byte-exact - and Q12
 * cites both (the guard's page check applied to the matrix; the freeze's pinned hash equal to the ledger's sha256) and holds both
 * documents to render no HTML block and no table tag.
 * SCOPE: the tier is read from the ledger's own words, never from the producer: a receipt's tier is what its clause says. The
 * sentence judge reads words, not meaning: an affirmative sentence that names both sides around a copula (OVER-READ, disclosed;
 * none today) reads as an equation. The 400-character window counts UTF-16 code units of the rendered text. A row's subject and
 * claim words are read anywhere in its rendered cells. The product guard reads the ledger's source cells: TRACEABILITY.md is frozen
 * byte-exact, so its source and rendered views cannot drift apart without reddening the landed freeze test. No docs, ledger or
 * matrix text is edited by this cut; the guard is the only product change. Q12 reads a document's HTML blocks in the rendered view (a
 * complete comment renders nothing and is no HTML block there) and its table tags in every html token at any depth, a table tag
 * inside a comment excepted; it reads the two guards it cites by their source spellings, so a cut renaming the W10 guard's page
 * check or the freeze's target or hash constant re-measures Q12 in the same commit.
 *
 * Display paths added: none (the receipt-tier detail is a qa/workbench CLI receipt string; src/ is untouched). Test-only otherwise:
 * no scratch is allocated; docs, .beads, qa and the two guard files Q12 cites are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { marked, type Token, type Tokens } from "marked";
import { describe, expect, it } from "vitest";
import { CLAIM_STATUSES, FIXTURE_TIER, parseLedger, receiptClauses, validateLedger } from "../qa/workbench/status-ledger.mjs";
import { docsSection } from "./helpers/census.js";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "trainingworks-status-roster.json");
const BEAD = "wb-4wmu.1";
const LEDGER = "docs/workbench/TRACEABILITY.md";
const MATRIX = "docs/workbench/feature-matrix.md";

/** Clause (a)'s pattern, window and scope; clause (c)'s sentence scope (docs/ holds docs/workbench, TRACEABILITY.md in it, and two root pages). */
const CITATION_PATTERN = "TrainingWorks|graph-policy-optimization|GraphPolicy";
const WINDOW = 400;
const CITATION_SCOPE = "docs/workbench";
const SENTENCE_SCOPE = "docs";
/** The statuses clauses (b) and (c) quote; the product guard's CLAIM_STATUSES must equal them. */
const CLAIM_WORDS = ["shipped", "gate-pass", "live-sdk"];
/** The matrix legend, and its statuses whose definition is or names landed-gated. */
const MATRIX_LEGEND = ["landed-gated", "partial", "in-progress", "planned", "not-started"];
const MATRIX_CLAIMS = ["landed-gated", "partial"];
/** The measured namesake files (A1 requires the walk to find a namesake in each). */
const NAMESAKE_FILES = ["docs/workbench/03-architecture-and-ownership.md", "docs/workbench/receipts/wb-1xvp.3.md", "docs/workbench/receipts/wb-1xvp.5.md"];

type Family = "trainingworks" | "hx-gp";
const FAMILIES: readonly Family[] = ["trainingworks", "hx-gp"];
const FAMILY_MARKS: Readonly<Record<Family, RegExp>> = {
  trainingworks: /trainingworks/i,
  "hx-gp": /graph-policy-optimization|HyperUnix\s*(?:x|×)\s*GraphPolicy|\bHX[- ]GP\b/i,
};
/** ReactiveFiberCLI's graph-policy-machine-control program (the RF-GRAPH-POLICY-MACHINE-CONTROL beads): a page naming it is a gp-tool page. */
const OTHER_PROGRAM = /RF-GRAPH-POLICY-MACHINE-CONTROL|graph-policy-machine-control/;

interface Deposit {
  readonly id: string;
  readonly repo: string;
  readonly sha: string;
  readonly family: Family;
  readonly program: string;
  readonly line: number;
  readonly phrase: string;
}
const TW = "trainingworks-2026-10-18";
const DEPOSITS: readonly Deposit[] = [
  { id: "hx", repo: "HX", sha: "0091719d0288", family: "trainingworks", program: TW, line: 3, phrase: "no new HX code implemented" },
  { id: "forge", repo: "Forge", sha: "3ce473386133", family: "trainingworks", program: TW, line: 3, phrase: "proposed additive source adapter, not implemented" },
  { id: "furnace", repo: "Furnace", sha: "d39a93dddf38", family: "trainingworks", program: TW, line: 3, phrase: "no simulator or policy hooks implemented by this commit" },
  { id: "mw", repo: "MW", sha: "5ce2a07f891f", family: "trainingworks", program: TW, line: 3, phrase: "no new implementation asserted" },
  { id: "beads", repo: "beads", sha: "105a90b5ed39", family: "trainingworks", program: TW, line: 3, phrase: "no code, test or task-store mutation" },
  { id: "rfcli", repo: "RFCLI", sha: "6a251bf73af5", family: "trainingworks", program: TW, line: 3, phrase: "not a shipped TrainingWorks adapter or new host capability" },
  { id: "hx-gp", repo: "HX GP", sha: "0091719d0288", family: "hx-gp", program: "graph-policy-optimization-2026-10-18", line: 3, phrase: "design only" },
];

/** (b): the subject, speedup and receipt vocabulary. */
const SUBJECT_TW = /trainingworks/i;
const SUBJECT_GP_PROGRAM = /graph-policy-optimization/i;
const SUBJECT_GP = /GraphPolicy|GraphDataIR|\bgp\b/i;
const SUBJECT_HX = /\bhx\b|HyperUnix/i;
const SPEED = /\b(?:faster|speed-?ups?|speeds? up|quicker|accelerat\w*)\b/i;
const RECEIPT = /\bcmd_[0-9a-f]{12}\b/;
const SEPARATOR = /^\|[\s:|-]+\|?\s*$/;

/** (c): the sentence vocabulary; the fixture side is the product's FIXTURE_TIER. */
const LIVE = /\blive\b/i;
const NATIVE = /\b(?:furnace|beads)\b/i;
const SUCCESS = /\b(?:success\w*|succeed\w*|pass(?:es|ed)?)\b/i;
const EQUATING =
  /\b(?:equals?|equal to|equivalent(?: to)?|(?:the )?same as|counts? as|stands? (?:in )?for|proves?|establish(?:es)?|amounts? to|means|substitutes? for|replaces?|is as good as|is|are|was|were)\b/gi;
const NEGATION_BEFORE = /\b(?:never|not|no|cannot|can't|isn't|aren't|doesn't|don't|won't|nor|neither|without|distinguish\w*)\b/i;
const NEGATION_AFTER = /^\s*(?:not|never|no|distinct|different|separate|unlike|apart)\b/i;
const CLAUSE_BREAK = /[,;:(—]/g;
/** Inside one rendered piece a sentence ends at terminal punctuation before white space or at a table-cell bar; a piece always ends one. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\|/;

/** The rendered view's vocabulary (RENDERED VIEW in the header). */
const cp = (...points: number[]): string => String.fromCodePoint(...points);
/** The named character references the view decodes: the ones for ASCII characters (and the fj ligature), plus no-break space and the common typographic marks. */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  Tab: cp(0x9),
  NewLine: cp(0xa),
  excl: "!",
  quot: '"',
  QUOT: '"',
  num: "#",
  dollar: "$",
  percnt: "%",
  amp: "&",
  AMP: "&",
  apos: "'",
  lpar: "(",
  rpar: ")",
  ast: "*",
  midast: "*",
  plus: "+",
  comma: ",",
  period: ".",
  sol: "/",
  colon: ":",
  semi: ";",
  lt: "<",
  LT: "<",
  equals: "=",
  gt: ">",
  GT: ">",
  quest: "?",
  commat: "@",
  lsqb: "[",
  lbrack: "[",
  bsol: "\\",
  rsqb: "]",
  rbrack: "]",
  Hat: "^",
  lowbar: "_",
  UnderBar: "_",
  grave: "`",
  DiacriticalGrave: "`",
  lcub: "{",
  lbrace: "{",
  verbar: "|",
  vert: "|",
  VerticalLine: "|",
  rcub: "}",
  rbrace: "}",
  fjlig: "fj",
  nbsp: cp(0xa0),
  NonBreakingSpace: cp(0xa0),
  times: cp(0xd7),
  ndash: cp(0x2013),
  mdash: cp(0x2014),
  lsquo: cp(0x2018),
  rsquo: cp(0x2019),
  ldquo: cp(0x201c),
  rdquo: cp(0x201d),
  hellip: cp(0x2026),
};
const REFERENCE = /&(?:#(\d{1,7})|#[xX]([0-9A-Fa-f]{1,6})|([A-Za-z][A-Za-z0-9]{1,31}));/g;
/** Raw HTML that renders no text: a comment (an empty one, or to its --> or the end), a declaration, processing instruction or CDATA section (to its first >, as a browser reads them), a tag. */
const HIDDEN_HTML = /<!--(?:-?>|[\s\S]*?(?:-->|$))|<[!?][^>]*(?:>|$)|<\/?[A-Za-z][^<>]*>/g;
/** Format characters (Unicode Cf) render nothing. */
const FORMAT = /\p{Cf}/gu;
/** The white space a status phrase may hold between its words: inside one piece only. */
const PHRASE_SPACE = "[^\\S\\n]+";
/** The matrix legend's rendered section (docsSection) and its line shapes. */
const LEGEND_HEADING = "Status legend";
const LEGEND_PARENTS = ["Workbench release feature matrix"];
const LEGEND_LEAD = "Status vocabulary (exactly one per row):";
const LEGEND_ITEM = /^([a-z-]+): (.*)$/;
/** R-HTML-TABLE (Q12): a table-structure tag, a comment (no tag inside one counts), and each judged document's gate-level guard with the source spellings Q12 cites it by. */
const TABLE_TAG = /<\/?(?:table|caption|colgroup|col|thead|tbody|tfoot|tr|th|td)(?=[\s/>]|$)/i;
const HTML_COMMENT = /<!--(?:-?>|[\s\S]*?(?:-->|$))/g;
const W10_GUARD = "test/workbench-w10-stamped-claim-guard.test.ts";
const W10_MATRIX = /^const MATRIX = "([^"\n]+)";$/m;
const W10_PAGE_CHECK = "htmlRefusals(tokens, MATRIX,";
const FREEZE_GUARD = "test/workbench-traceability-freeze.test.ts";
const FREEZE_TARGET = /new URL\("\.\.\/([^"\n]+)", import\.meta\.url\)/;
const FREEZE_HASH = /^const FROZEN_SHA256 = "([0-9a-f]{64})";$/m;

const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-ATTRIBUTED-FILE": ["Q1"],
  "R-UNPINNED": ["Q2"],
  "R-SCOPE": ["Q3"],
  "R-UNLABELLED": ["Q4"],
  "R-ABSENT": ["Q5"],
  "R-PARAPHRASE": ["Q6"],
  "R-SUBJECT-NAME": ["Q7"],
  "R-STATUS-WORD": ["Q8"],
  "R-ENCODED": ["Q9"],
  "R-LINK-TARGET": ["Q10"],
  "R-HIDDEN-HTML": ["Q11"],
  "R-HTML-TABLE": ["Q12"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C, to the bead's acceptance clauses. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) every /TrainingWorks|graph-policy-optimization|GraphPolicy/ match in docs/workbench sits within 400 chars of its deposit's verbatim status phrase",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      "(b) no ledger or matrix row names a TrainingWorks adapter, export, policy or GP-planned hx 'shipped', 'gate-pass' or 'live-sdk', or an hx speedup without a cmd_ receipt",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) validateLedger refuses a 'shipped'/'gate-pass'/'live-sdk' row backed only by a hermetic or fixture receipt (new guard), and no docs or TRACEABILITY sentence equates a fixture run with live Furnace/Beads success",
    pins: ["C1", "C2"],
  },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly producer: { [key: string]: JsonValue };
  readonly constants: { [key: string]: JsonValue };
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
function objectOf(value: unknown, field: string): { [key: string]: JsonValue } {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as { [key: string]: JsonValue };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) {
    throw new Error("roster must be an object with bead, rows and tests");
  }
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
  const tests = raw.tests.map((title: unknown, index: number): string => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a string`);
    return title;
  });
  return { bead: raw.bead, producer: objectOf(raw.producer, "roster producer"), constants: objectOf(raw.constants, "roster constants"), tests, rows };
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
/** Every .md file below a repo directory, read from the filesystem. */
function markdownBelow(directory: string): string[] {
  return readdirSync(join(REPO, directory), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .map(entry => relative(REPO, join(entry.parentPath, entry.name)))
    .sort();
}
/** The same set as git tracks it: the walk's outside anchor. */
function trackedMarkdown(directory: string): string[] {
  return execFileSync("git", ["ls-files", "--", directory], { cwd: REPO, encoding: "utf8" })
    .split("\n")
    .filter(path => path.endsWith(".md"))
    .sort();
}
/** Whether git tracks a repo path. */
function tracked(path: string): boolean {
  return execFileSync("git", ["ls-files", "--", path], { cwd: REPO, encoding: "utf8" }).split("\n").includes(path);
}
function sha256Of(path: string): string {
  return createHash("sha256").update(readFileSync(join(REPO, path))).digest("hex");
}
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function newlines(text: string): number {
  return text.split("\n").length - 1;
}

// ---- the RENDERED VIEW ----

type PieceKind = "heading" | "paragraph" | "item" | "row" | "code" | "html" | "other";
/** One rendered block: what a reader sees of it, and the source line it starts at. */
interface Piece {
  readonly kind: PieceKind;
  readonly line: number;
  readonly text: string;
}
interface RenderedRow {
  readonly line: number;
  readonly cells: readonly string[];
}
interface RenderedTable {
  readonly line: number;
  readonly header: readonly string[];
  readonly rows: readonly RenderedRow[];
}
interface Rendered {
  readonly pieces: readonly Piece[];
  readonly tables: readonly RenderedTable[];
  /** The pieces' texts joined by one line break: the text clauses (a) and (c) judge. */
  readonly text: string;
  readonly offsets: readonly number[];
}
const tokenText = (token: Token): string => {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
};
const childrenOf = (token: Token): readonly Token[] => {
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
};
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
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
/** What a reader sees of a rendered text: no format character, each white-space run one space. */
function clean(text: string): string {
  return text.replace(FORMAT, "").replace(/\s+/g, " ").trim();
}
/** What a reader sees of inline tokens: raw HTML (a tag, a complete comment) renders nothing, markup its text, code its literal text. */
function inlineOf(tokens: readonly Token[]): string {
  let out = "";
  for (const token of tokens) {
    if (token.type === "html") continue;
    if (token.type === "br") out += "\n";
    else if (token.type === "codespan" || token.type === "escape") out += tokenText(token);
    else if (childrenOf(token).length > 0) out += inlineOf(childrenOf(token));
    else out += referencesDecoded(tokenText(token));
  }
  return out;
}
function renderInto(tokens: readonly Token[], line: number, kind: "paragraph" | "item", pieces: Piece[], tables: RenderedTable[]): void {
  const push = (pieceKind: PieceKind, at: number, text: string): void => {
    const shown = clean(text);
    if (shown.length > 0) pieces.push({ kind: pieceKind, line: at, text: shown });
  };
  let at = line;
  for (const token of tokens) {
    const here = at;
    at += newlines(token.raw);
    if (isHeading(token)) push("heading", here, inlineOf(childrenOf(token)));
    else if (token.type === "paragraph" || token.type === "text") push(kind, here, childrenOf(token).length > 0 ? inlineOf(childrenOf(token)) : referencesDecoded(tokenText(token)));
    else if (isList(token)) {
      let itemLine = here;
      for (const item of token.items) {
        renderInto(childrenOf(item), itemLine, "item", pieces, tables);
        itemLine += newlines(item.raw);
      }
    } else if (isTable(token)) {
      const cells = (row: readonly Tokens.TableCell[]): string[] => row.map(cell => clean(inlineOf(cell.tokens)));
      const table: RenderedTable = { line: here, header: cells(token.header), rows: token.rows.map((row, index) => ({ line: here + 2 + index, cells: cells(row) })) };
      tables.push(table);
      for (const row of [{ line: here, cells: table.header }, ...table.rows]) push("row", row.line, row.cells.join(" | "));
    } else if (token.type === "code") {
      const first = /^ {0,3}(?:`{3}|~{3})/.test(token.raw) ? here + 1 : here;
      for (const [index, codeLine] of tokenText(token).split("\n").entries()) {
        const shown = codeLine.replace(FORMAT, "");
        if (shown.trim().length > 0) pieces.push({ kind: "code", line: first + index, text: shown });
      }
    } else if (token.type === "html") push("html", here, referencesDecoded(token.raw.replace(HIDDEN_HTML, "")));
    else if (token.type === "blockquote") renderInto(childrenOf(token), here, kind, pieces, tables);
    else if (token.type !== "space" && token.type !== "hr" && token.type !== "def") {
      push("other", here, childrenOf(token).length > 0 ? inlineOf(childrenOf(token)) : referencesDecoded(tokenText(token)));
    }
  }
}
/** The raw text of every html token at any depth (block or inline; in table cells, list items, block quotes and inline children). */
function htmlRaws(tokens: readonly Token[]): string[] {
  return tokens.flatMap(token => {
    if (token.type === "html") return [token.raw];
    if (isTable(token)) return [...token.header, ...token.rows.flat()].flatMap(cell => htmlRaws(cell.tokens));
    if (isList(token)) return token.items.flatMap(item => htmlRaws(childrenOf(item)));
    return htmlRaws(childrenOf(token));
  });
}
/** R-HTML-TABLE's closure reading of a page: the HTML blocks it renders (pieces of the rendered view) and the html tokens naming a table element outside a comment. */
function htmlTableRoutes(markdown: string): { htmlBlocks: number; tableTags: number } {
  return {
    htmlBlocks: rendered(markdown).pieces.filter(piece => piece.kind === "html").length,
    tableTags: htmlRaws(marked.lexer(markdown)).filter(raw => TABLE_TAG.test(raw.replace(HTML_COMMENT, ""))).length,
  };
}
const VIEWS = new Map<string, Rendered>();
/** A markdown page's rendered view (memoized by its text). */
function rendered(markdown: string): Rendered {
  const known = VIEWS.get(markdown);
  if (known !== undefined) return known;
  const pieces: Piece[] = [];
  const tables: RenderedTable[] = [];
  renderInto(marked.lexer(markdown), 1, "paragraph", pieces, tables);
  const offsets: number[] = [];
  let length = 0;
  for (const piece of pieces) {
    offsets.push(length);
    length += piece.text.length + 1;
  }
  const view: Rendered = { pieces, tables, text: pieces.map(piece => piece.text).join("\n"), offsets };
  VIEWS.set(markdown, view);
  return view;
}
/** The source line of the piece holding a rendered-text offset. */
function lineOf(view: Rendered, index: number): number {
  let line = 1;
  for (const [at, offset] of view.offsets.entries()) {
    if (offset > index) break;
    line = view.pieces[at]?.line ?? line;
  }
  return line;
}

/** The characters strictly between [start, end) and the phrase's nearest occurrence inside one piece; Infinity when absent. */
function gapTo(text: string, start: number, end: number, phrase: string): number {
  let best = Number.POSITIVE_INFINITY;
  for (const hit of text.matchAll(new RegExp(phrase.split(/\s+/).map(escaped).join(PHRASE_SPACE), "g"))) {
    const from = hit.index;
    const to = from + hit[0].length;
    best = Math.min(best, from >= end ? from - end : to <= start ? start - to : 0);
  }
  return best;
}

interface CitationFinding {
  readonly path: string;
  readonly line: number;
  readonly match: string;
  readonly family: Family | "unattributed";
  readonly owed: readonly string[];
}
interface CitationReading {
  readonly citations: number;
  readonly attributed: number;
  readonly findings: readonly CitationFinding[];
}
/** Clause (a)'s judge over one page's rendered text. */
function citationsIn(path: string, markdown: string): CitationReading {
  const view = rendered(markdown);
  const text = view.text;
  const findings: CitationFinding[] = [];
  let citations = 0;
  let attributed = 0;
  const fileAttributed = OTHER_PROGRAM.test(text);
  for (const hit of text.matchAll(new RegExp(CITATION_PATTERN, "g"))) {
    const start = hit.index;
    const end = start + hit[0].length;
    const window = text.slice(Math.max(0, start - WINDOW), end + WINDOW);
    const families = FAMILIES.filter(family => FAMILY_MARKS[family].test(window));
    const near = (deposits: readonly Deposit[]): boolean => deposits.some(deposit => gapTo(text, start, end, deposit.phrase) <= WINDOW);
    if (families.length === 0) {
      if (fileAttributed) attributed += 1;
      else if (!near(DEPOSITS)) findings.push({ path, line: lineOf(view, start), match: hit[0], family: "unattributed", owed: DEPOSITS.map(deposit => deposit.id) });
      continue;
    }
    citations += 1;
    for (const family of families) {
      const members = DEPOSITS.filter(deposit => deposit.family === family);
      const pinned = members.filter(deposit => window.includes(deposit.sha.slice(0, 7)));
      const owed = pinned.length > 0 ? pinned : members;
      if (!near(owed)) findings.push({ path, line: lineOf(view, start), match: hit[0], family, owed: owed.map(deposit => deposit.id) });
    }
  }
  return { citations, attributed, findings };
}
function findingText(finding: CitationFinding): string {
  return `${finding.path}:${finding.line} ${finding.match} ${finding.family} owes ${finding.owed.join("+")}`;
}

interface TableRow {
  readonly path: string;
  readonly line: number;
  readonly status: string;
  readonly text: string;
}
function cellsOf(line: string): string[] {
  const trimmed = line.trim();
  const body = trimmed.slice(trimmed.startsWith("|") ? 1 : 0, trimmed.endsWith("|") ? -1 : undefined);
  return body.split("|").map(cell => cell.trim());
}
/** Every rendered table body row of a markdown page with the rendered Status cell of its table (empty where the table has none). */
function tableRows(path: string, markdown: string): TableRow[] {
  return rendered(markdown).tables.flatMap(table => {
    const at = table.header.indexOf("Status");
    return table.rows.map(row => ({ path, line: row.line, status: at < 0 ? "" : (row.cells[at] ?? ""), text: row.cells.join(" | ") }));
  });
}
/** A page's table rows counted from its source lines alone: pipe lines outside code and HTML blocks, less each separator and the header above it. */
function tableLineCount(markdown: string): number {
  const hidden = new Set<number>();
  let line = 1;
  for (const token of marked.lexer(markdown)) {
    if (token.type === "code" || token.type === "html") for (let at = line; at <= line + newlines(token.raw.replace(/\n+$/, "")); at++) hidden.add(at);
    line += newlines(token.raw);
  }
  const lines = markdown.split("\n").filter((_, index) => !hidden.has(index + 1));
  return lines.filter(entry => entry.startsWith("|")).length - 2 * lines.filter(entry => SEPARATOR.test(entry)).length;
}
/** Clause (b)'s judge. */
function rowFindings(rows: readonly TableRow[]): string[] {
  const claimText = new RegExp(`\\b(?:${CLAIM_WORDS.join("|")})\\b`);
  return rows.flatMap(row => {
    const out: string[] = [];
    const subject = SUBJECT_TW.test(row.text) || SUBJECT_GP_PROGRAM.test(row.text) || (SUBJECT_GP.test(row.text) && SUBJECT_HX.test(row.text));
    const claim = [...CLAIM_WORDS, ...MATRIX_CLAIMS].includes(row.status) ? row.status : claimText.exec(row.text)?.[0];
    if (subject && claim !== undefined) out.push(`${row.path}:${row.line} presents its subject as ${claim}`);
    if (SUBJECT_HX.test(row.text) && SPEED.test(row.text) && !RECEIPT.test(row.text)) out.push(`${row.path}:${row.line} claims an hx speedup without a cmd_ receipt`);
    return out;
  });
}
interface LegendReading {
  readonly ok: boolean;
  readonly why: string;
  readonly entries: readonly { readonly word: string; readonly definition: string }[];
}
/** The matrix's status legend from its one rendered section (docsSection): the one list rendered after the section's one vocabulary line. */
function legendOf(markdown: string): LegendReading {
  const refused = (why: string): LegendReading => ({ ok: false, why, entries: [] });
  const section = docsSection(markdown, LEGEND_HEADING, 2, LEGEND_PARENTS);
  if (!section.ok) return refused(section.why);
  const leads = section.blocks.flatMap((block, index) => (block.kind === "paragraph" && block.text === LEGEND_LEAD ? [index] : []));
  if (leads.length !== 1) return refused(`the section renders the vocabulary line ${leads.length} times; the legend needs it exactly once`);
  const list = section.blocks.slice((leads[0] ?? 0) + 1).find(block => block.kind !== "html");
  if (list === undefined || list.kind !== "list") return refused("no list renders after the vocabulary line");
  const items = list.items.map(item => LEGEND_ITEM.exec(item.text));
  if (items.some(item => item === null)) return refused("a legend item does not render as word: definition");
  return { ok: true, why: "", entries: items.map(item => ({ word: item?.[1] ?? "", definition: item?.[2] ?? "" })) };
}
/** The legend's claim statuses: the ones that are or name landed-gated. */
function legendClaims(reading: LegendReading): string[] {
  return reading.entries.filter(entry => entry.word === "landed-gated" || entry.definition.includes("landed-gated")).map(entry => entry.word);
}

/** A page's sentences: each rendered piece split at terminal punctuation or a table-cell bar. */
function sentencesOf(markdown: string): string[] {
  return rendered(markdown).pieces.flatMap(piece =>
    piece.text
      .split(SENTENCE_BREAK)
      .map(sentence => sentence.replace(/\s+/g, " ").trim())
      .filter(sentence => sentence.length > 0),
  );
}
/** Clause (c)'s sentence judge. */
function equates(sentence: string): boolean {
  if (!(FIXTURE_TIER.test(sentence) && LIVE.test(sentence) && NATIVE.test(sentence) && SUCCESS.test(sentence))) return false;
  for (const hit of sentence.matchAll(EQUATING)) {
    const before = sentence.slice(0, hit.index);
    let clauseStart = 0;
    for (const mark of before.matchAll(CLAUSE_BREAK)) clauseStart = mark.index + 1;
    const after = sentence.slice(hit.index + hit[0].length);
    if (!NEGATION_BEFORE.test(before.slice(clauseStart)) && !NEGATION_AFTER.test(after)) return true;
  }
  return false;
}
function sentenceFindings(path: string, markdown: string): string[] {
  return sentencesOf(markdown)
    .filter(equates)
    .map(sentence => `${path}: ${sentence}`);
}
/** A WB ledger row as the product parser returns it (the fields this census reads). */
interface LedgerRow {
  readonly id: string;
  readonly line: number;
  readonly status: string;
  readonly evidence: string[];
}
interface Finding {
  readonly rule: string;
  readonly row?: string;
  readonly detail: string;
}
interface Validation {
  readonly integrity: readonly Finding[];
  readonly vocabulary: readonly Finding[];
}
const WB_HEADER = "| ID | Priority | Requirement | Implementation evidence | L1 shell | L2 client | L3 integration | L4 unit/fault | Live/native evidence | Status |";
const WB_SEPARATOR = "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |";
const DASH = "—";
const IMPLEMENTED = "qa/workbench/status-ledger.mjs";
function wbRow(id: string, status: string, evidence: readonly string[]): string {
  return `| ${id} | P0 | Requirement text. | ${evidence.join(" | ")} | ${status} |`;
}
/** A clean 50-row ledger whose WB-001 is the row under test, so only that row's rules fire. */
function ledgerWith(row: string): string {
  const others = Array.from({ length: 49 }, (_, index) => wbRow(`WB-${String(index + 2).padStart(3, "0")}`, "planned", [DASH, DASH, DASH, DASH, DASH, DASH]));
  return ["# Ledger", "", WB_HEADER, WB_SEPARATOR, row, ...others, ""].join("\n");
}
function validated(markdown: string): Validation {
  return validateLedger(parseLedger(markdown), { root: REPO }) as Validation;
}
interface LedgerControl {
  readonly id: string;
  readonly status: string;
  readonly evidence: readonly string[];
}
function guardReading(control: LedgerControl): { rules: string[]; vocabulary: number; detail: string } {
  const result = validated(ledgerWith(wbRow("WB-001", control.status, control.evidence)));
  const tier = result.integrity.filter(finding => finding.rule === "receipt-tier");
  for (const finding of tier) expect(finding.row, `${control.id}: the finding names its row`).toBe("WB-001");
  return { rules: result.integrity.map(finding => finding.rule), vocabulary: result.vocabulary.length, detail: tier.map(finding => finding.detail).join(" / ") };
}
function tableOf(header: string, rows: readonly string[]): string {
  return [header, `|${" --- |".repeat(cellsOf(header).length)}`, ...rows, ""].join("\n");
}
const MATRIX_HEADER = "| Feature | Status | Evidence | Caveats |";

/** The bead's own notes in the tracker export. */
function beadNotes(): string {
  for (const line of textOf(".beads/issues.jsonl").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The acceptance clauses of the notes, by letter: the one line that opens with "Acceptance: (a) ". */
function acceptanceClauses(notes: string): Record<string, string> {
  const start = notes.indexOf("Acceptance: (a) ");
  if (start === -1) return {};
  const end = notes.indexOf("\n", start);
  const body = notes.slice(start + "Acceptance: ".length, end === -1 ? undefined : end).trim();
  const clauses: Record<string, string> = {};
  for (const match of body.matchAll(/\(([a-z])\) (.*?)(?=; \([a-z]\) |\.$)/gs)) clauses[match[1] ?? ""] = match[2] ?? "";
  return clauses;
}
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}
function letterOf(label: string): string {
  return /^\(([a-z])\) /.exec(label)?.[1] ?? "";
}
function quotedWords(clause: string): string[] {
  return [...clause.matchAll(/'([^']+)'/g)].map(match => match[1] ?? "");
}
/** The filing's merged deposit list: each repo@sha 'quote' at the TW README line, then HX GP's program, line and sha. */
function filedDeposits(notes: string): { key: string; quote: string }[] {
  const merged = /Merged \(TW README\.md:(\d+)\): (.*?)\nAuthority:/s.exec(notes);
  if (merged === null) return [];
  const line = merged[1] ?? "";
  const segment = merged[2] ?? "";
  const filed = [...segment.matchAll(/(\w+)@([0-9a-f]{12}) '([^']+)'/g)].map(match => ({ key: `${match[1]}@${match[2]}:${TW}:${line}`, quote: match[3] ?? "" }));
  const gp = /HX GP (graph-policy-optimization-\d{4}-\d{2}-\d{2})\/README\.md:(\d+), :\d+ @([0-9a-f]{12})/.exec(segment);
  const gpQuote = /HX GP '([^']+)'/.exec(notes)?.[1] ?? "";
  if (gp !== null) filed.push({ key: `HX GP@${gp[3]}:${gp[1]}:${gp[2]}`, quote: gpQuote });
  return filed;
}
function inOrder(quote: string, phrase: string): boolean {
  const words = phrase.split(/\s+/);
  let at = 0;
  for (const word of quote.split(/\s+/)) {
    at = words.indexOf(word, at);
    if (at < 0) return false;
    at += 1;
  }
  return true;
}


/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];
const ZERO_WIDTH = cp(0x200b);

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () => {
    const walked = markdownBelow(CITATION_SCOPE);
    expect(walked, "the walk is every .md file git tracks under docs/workbench").toEqual(trackedMarkdown(CITATION_SCOPE));
    expect(walked.length, "floor: 69 .md files at this census's base").toBeGreaterThanOrEqual(69);
    for (const anchor of [LEDGER, MATRIX, ...NAMESAKE_FILES]) expect(walked, `the walk reads ${anchor}`).toContain(anchor);
    const readings = walked.map(path => ({ path, reading: citationsIn(path, textOf(path)) }));
    const findings = readings.flatMap(entry => entry.reading.findings.map(findingText));
    expect(findings, "every match cites with its deposit's phrase in the window or is an attributed namesake").toEqual([]);
    const namesakeFiles = readings.filter(entry => entry.reading.attributed > 0).map(entry => entry.path);
    for (const file of NAMESAKE_FILES) expect(namesakeFiles, `the walk finds the measured namesakes of ${file}`).toContain(file);
    return { walkIsTracked: true, floor: 69, findings, namesakeFilesMeasured: NAMESAKE_FILES };
  },
  A2: () => {
    const far = "-".repeat(WINDOW);
    const controls: { id: string; path: string; text: string; flagged: boolean }[] = [
      { id: "unpinned-no-phrase", path: "docs/workbench/x.md", text: "Pi reads no TrainingWorks export.", flagged: true },
      { id: "forge-pinned-beside-beads-phrase", path: "docs/workbench/x.md", text: "TrainingWorks (Forge docs/programs/trainingworks-2026-10-18/README.md:3@3ce473386133): no code, test or task-store mutation.", flagged: true },
      { id: "phrase-401-away", path: "docs/workbench/x.md", text: `TrainingWorks ${far}no code, test or task-store mutation.`, flagged: true },
      { id: "hx-gp-directory-no-phrase", path: "docs/workbench/x.md", text: "The graph-policy-optimization-2026-10-18 program ranks HX plans.", flagged: true },
      { id: "hx-gp-title-no-phrase", path: "docs/workbench/x.md", text: "HyperUnix × GraphPolicyCLI ranks physical plans.", flagged: true },
      { id: "hx-pinned-beside-hx-gp-phrase", path: "docs/workbench/x.md", text: "TrainingWorks (HX @0091719d0288): design only.", flagged: true },
      { id: "unattributed-namesake", path: "docs/workbench/x.md", text: "GraphPolicyCLI scores the plans Pi runs.", flagged: true },
      { id: "unpinned-phrase-after", path: "docs/workbench/x.md", text: "TrainingWorks is cited here: proposed additive source adapter, not implemented.", flagged: false },
      { id: "furnace-pinned-phrase-before", path: "docs/workbench/x.md", text: "no simulator or policy hooks implemented by this commit (Furnace TrainingWorks @d39a93dddf38).", flagged: false },
      { id: "phrase-400-away", path: "docs/workbench/x.md", text: `TrainingWorks${" ".repeat(WINDOW)}no code, test or task-store mutation.`, flagged: false },
      { id: "hx-gp-with-phrase", path: "docs/workbench/x.md", text: "graph-policy-optimization-2026-10-18: design only.", flagged: false },
      { id: "attributed-namesake", path: "docs/workbench/x.md", text: `RF-GRAPH-POLICY-MACHINE-CONTROL-R1 binds the gp seam.\n${"x".repeat(2 * WINDOW)}\nThe GraphPolicyCLI boundary.`, flagged: false },
      { id: "phrase-wrapped", path: "docs/workbench/x.md", text: "TrainingWorks: no code, test\nor task-store mutation.", flagged: false },
      { id: "unattributed-beside-phrase", path: "docs/workbench/x.md", text: "GraphPolicyCLI (design only).", flagged: false },
      // F3 (rider): a sha pins its deposit at 7 hex, and "HX GP" marks the HX x GP family even on an attributed page.
      { id: "seven-hex-pin-beside-beads-phrase", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce4733): no code, test or task-store mutation.", flagged: true },
      { id: "hx-gp-mark-on-an-attributed-page", path: "docs/workbench/x.md", text: `RF-GRAPH-POLICY-MACHINE-CONTROL-R1 binds the gp seam.\n\n${"x".repeat(2 * WINDOW)}\n\nGraphPolicyCLI ranks HX GP plans.`, flagged: true },
      // The window boundary in the rendered view, where a white-space run reads as one space: 400 dashes between.
      { id: "phrase-400-away-filled", path: "docs/workbench/x.md", text: `TrainingWorks${far}no code, test or task-store mutation.`, flagged: false },
      // U1, the rendered view: RT1, RT3 and RT4 of the refusal, then the other members of their class.
      { id: "RT1-phrase-only-in-a-comment", path: "docs/workbench/x.md", text: "TrainingWorks (Forge docs/programs/trainingworks-2026-10-18/README.md:3@3ce473386133) <!-- proposed additive source adapter, not implemented -->.", flagged: true },
      { id: "RT3-attribution-only-in-a-comment", path: "docs/workbench/x.md", text: "<!-- graph-policy-machine-control -->\nGraphPolicyCLI ranks the plans Pi runs.", flagged: true },
      { id: "RT4-mention-only-in-a-comment", path: "docs/workbench/x.md", text: "<!-- Pi reads the TrainingWorks Forge export. -->\n\nPi reads docs.", flagged: false },
      { id: "name-split-by-a-comment", path: "docs/workbench/x.md", text: "Pi reads the Training<!-- -->Works export.", flagged: true },
      { id: "name-split-by-a-tag", path: "docs/workbench/x.md", text: "Pi reads the Training<span></span>Works export.", flagged: true },
      { id: "name-split-by-emphasis", path: "docs/workbench/x.md", text: "Pi reads the Training**Works** export.", flagged: true },
      { id: "name-spelled-by-a-reference", path: "docs/workbench/x.md", text: "Pi reads the Training&#87;orks export.", flagged: true },
      { id: "name-split-by-an-invisible", path: "docs/workbench/x.md", text: `Pi reads the Training${ZERO_WIDTH}Works export.`, flagged: true },
      { id: "phrase-in-an-unterminated-comment", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce473386133).\n\n<!-- proposed additive source adapter, not implemented", flagged: true },
      { id: "unterminated-comment-holding-a-bracket", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce473386133).\n\n<!-- -> proposed additive source adapter, not implemented", flagged: true },
      { id: "html-block-text-after-a-comment", path: "docs/workbench/x.md", text: "<!-- note --> Pi reads the TrainingWorks export.", flagged: true },
      { id: "inline-unterminated-comment-is-text", path: "docs/workbench/x.md", text: "TrainingWorks <!-- proposed additive source adapter, not implemented.", flagged: false },
      { id: "phrase-split-across-list-items", path: "docs/workbench/x.md", text: "- TrainingWorks: no code, test\n- or task-store mutation.", flagged: true },
      { id: "mention-in-code", path: "docs/workbench/x.md", text: "```\nPi reads the TrainingWorks export.\n```", flagged: true },
      { id: "phrase-in-code", path: "docs/workbench/x.md", text: "TrainingWorks:\n\n```\nno code, test or task-store mutation\n```", flagged: false },
      { id: "mention-in-a-blockquote", path: "docs/workbench/x.md", text: "> Pi reads the TrainingWorks export.", flagged: true },
      { id: "mention-in-a-table-header", path: "docs/workbench/x.md", text: "| TrainingWorks export | Status |\n| --- | --- |\n| x | planned |", flagged: true },
      { id: "phrase-in-a-cdata-section", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce473386133).\n\n<![CDATA[ proposed additive source adapter, not implemented ]]>", flagged: true },
      { id: "phrase-in-a-processing-instruction", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce473386133).\n\n<?note proposed additive source adapter, not implemented ?>", flagged: true },
      { id: "phrase-in-a-declaration", path: "docs/workbench/x.md", text: "TrainingWorks (Forge @3ce473386133).\n\n<!NOTE proposed additive source adapter, not implemented>", flagged: true },
      { id: "text-after-an-empty-comment", path: "docs/workbench/x.md", text: "<!--> Pi reads the TrainingWorks export.", flagged: true },
      { id: "title-with-a-named-reference", path: "docs/workbench/x.md", text: "HyperUnix &times; GraphPolicyCLI ranks physical plans.", flagged: true },
    ];
    const readings = controls.map(control => {
      const reading = citationsIn(control.path, control.text);
      expect(reading.findings.length > 0, `${control.id} is ${control.flagged ? "flagged" : "quiet"}`).toBe(control.flagged);
      return { id: control.id, findings: reading.findings.map(finding => `${finding.family}:${finding.owed.join("+")}`) };
    });
    const gap = (text: string): number => gapTo(text, 0, "TrainingWorks".length, DEPOSITS[4]?.phrase ?? "");
    expect([gap(`TrainingWorks${" ".repeat(WINDOW)}no code, test or task-store mutation`), gap(`TrainingWorks ${far}no code, test or task-store mutation`)]).toEqual([WINDOW, WINDOW + 1]);
    const findingLine = citationsIn("docs/workbench/x.md", "# Title\n\nPara one.\n\n- item\n- Pi reads the TrainingWorks export.").findings.map(finding => finding.line);
    expect(findingLine, "a finding names the source line of the piece it sits in").toEqual([6]);
    return { controls: readings, findingLine };
  },
  B1: () => {
    const ledgerText = textOf(LEDGER);
    const matrixText = textOf(MATRIX);
    const ledgerRows = tableRows(LEDGER, ledgerText);
    const matrixRows = tableRows(MATRIX, matrixText);
    expect(ledgerRows.length, "every TRACEABILITY table row is read").toBe(tableLineCount(ledgerText));
    expect(matrixRows.length, "every matrix table row is read").toBe(tableLineCount(matrixText));
    expect(matrixRows.length, "floor: 81 matrix rows at this census's base").toBeGreaterThanOrEqual(81);
    const wb = parseLedger(ledgerText).rows.map((row: LedgerRow) => `${row.line}:${row.status}`);
    expect(wb, "the product parser reads the 50 WB rows").toHaveLength(50);
    expect(wb.filter(entry => !ledgerRows.some(row => `${row.line}:${row.status}` === entry)), "each WB row is read with its status").toEqual([]);
    const legend = legendOf(matrixText);
    expect(legend.ok, `the matrix legend reads: ${legend.why}`).toBe(true);
    const words = legend.entries.map(entry => entry.word);
    expect(matrixRows.filter(row => !words.includes(row.status)).map(row => `${row.line}:${row.status}`), "every matrix status is a legend word").toEqual([]);
    const findings = rowFindings([...ledgerRows, ...matrixRows]);
    expect(findings, "no row presents a TrainingWorks or GP-planned hx subject as shipped, and no hx speedup lacks a receipt").toEqual([]);
    const claims = ledgerRows.filter(row => CLAIM_WORDS.includes(row.status)).map(row => `${row.line}:${row.status}`);
    return { ledgerRows: ledgerRows.length, wbRows: wb.length, ledgerClaimRows: claims, matrixStatusesAreLegend: true, findings };
  },
  B2: () => {
    const ledger = (status: string, requirement: string): string => tableOf(WB_HEADER, [`| WB-051 | P2 | ${requirement} | src/x.ts | ${DASH} | ${DASH} | ${DASH} | ${DASH} | ${DASH} | ${status} |`]);
    const matrix = (feature: string, status: string, evidence: string): string => tableOf(MATRIX_HEADER, [`| ${feature} | ${status} | ${evidence} | ${DASH} |`]);
    const hidden = (text: string): string => `${matrix("GraphPolicyCLI decision seam", "landed-gated", "test/x.test.ts")}\n${text}\n`;
    const fence = "```";
    const controls: { id: string; text: string; flagged: boolean }[] = [
      { id: "ledger-shipped", text: ledger("shipped", "A TrainingWorks export adapter."), flagged: true },
      { id: "ledger-gate-pass", text: ledger("gate-pass", "A TrainingWorks policy proposal."), flagged: true },
      { id: "ledger-live-sdk", text: ledger("live-sdk", "GP-planned hx: GraphPolicyCLI ranks HyperUnix plans."), flagged: true },
      { id: "matrix-landed-gated", text: matrix("TrainingWorks Forge export", "landed-gated", "test/x.test.ts"), flagged: true },
      { id: "matrix-partial", text: matrix("GP-planned hx (gp ranks hx plans)", "partial", "test/x.test.ts"), flagged: true },
      { id: "matrix-claim-word-in-text", text: matrix("TrainingWorks export", "planned", "TRACEABILITY status live-sdk"), flagged: true },
      { id: "matrix-hx-gp-program", text: matrix("graph-policy-optimization-2026-10-18 adapter", "landed-gated", "test/x.test.ts"), flagged: true },
      { id: "hx-speedup-no-receipt", text: matrix("hx query planning", "landed-gated", "hx answers 3x faster"), flagged: true },
      { id: "subject-planned", text: matrix("TrainingWorks export", "planned", "Open bead wb-4wmu.1; design only"), flagged: false },
      { id: "hx-speedup-with-receipt", text: matrix("hx query planning", "landed-gated", "hx answers 3x faster, cmd_65b034a22fb5"), flagged: false },
      { id: "gp-without-hx", text: matrix("GraphPolicyCLI decision seam", "landed-gated", "test/x.test.ts"), flagged: false },
      { id: "hx-without-speed-or-gp", text: matrix("hx provider", "landed-gated", "test/x.test.ts"), flagged: false },
      // F4 (rider): the receipt is a whole cmd_ id; a bare or a short token is none.
      { id: "hx-speedup-bare-cmd", text: matrix("hx query planning", "landed-gated", "hx answers 3x faster, cmd_"), flagged: true },
      { id: "hx-speedup-short-cmd", text: matrix("hx query planning", "landed-gated", "hx answers 3x faster, cmd_65b034a2"), flagged: true },
      // The rendered view: a row reads as it renders.
      { id: "subject-split-by-a-comment", text: matrix("Training<!-- -->Works Forge export", "landed-gated", "test/x.test.ts"), flagged: true },
      { id: "status-in-emphasis", text: matrix("TrainingWorks Forge export", "**landed-gated**", "test/x.test.ts"), flagged: true },
      { id: "receipt-only-in-a-comment", text: matrix("hx query planning", "landed-gated", "hx answers 3x faster <!-- cmd_65b034a22fb5 -->"), flagged: true },
      { id: "claim-word-only-in-a-comment", text: matrix("TrainingWorks export", "planned", "TRACEABILITY status <!-- live-sdk -->"), flagged: false },
      { id: "row-only-in-a-comment", text: hidden(`<!--\n| TrainingWorks Forge export | landed-gated | test/x.test.ts | ${DASH} |\n-->`), flagged: false },
      { id: "row-only-in-code", text: hidden(`${fence}\n| TrainingWorks Forge export | landed-gated | test/x.test.ts | ${DASH} |\n${fence}`), flagged: false },
    ];
    const readings = controls.map(control => {
      const findings = rowFindings(tableRows("docs/workbench/x.md", control.text));
      expect(findings.length > 0, `${control.id} is ${control.flagged ? "flagged" : "quiet"}`).toBe(control.flagged);
      return { id: control.id, findings: findings.length };
    });
    const hiddenRowCounts = controls
      .filter(control => control.id === "row-only-in-a-comment" || control.id === "row-only-in-code")
      .map(control => [tableLineCount(control.text), tableRows("docs/workbench/x.md", control.text).length]);
    expect(hiddenRowCounts, "a pipe line inside a comment or code is a table row in neither the source count nor the rendered read").toEqual([
      [1, 1],
      [1, 1],
    ]);
    return { controls: readings, hiddenRowCounts };
  },
  B3: () => {
    const real = textOf(MATRIX);
    const heading = `## ${LEGEND_HEADING}`;
    const copy = /Status vocabulary \(exactly one per row\):\n\n(?:- [^\n]*\n)+/.exec(real)?.[0] ?? "";
    expect(copy.split("\n").filter(line => line.startsWith("- ")), "the real legend's source block: the vocabulary line and its items").toHaveLength(MATRIX_LEGEND.length);
    expect(real.split("\n").filter(line => line === heading), "the real matrix spells the legend heading on one line").toHaveLength(1);
    const changed = real.replace(/^- in-progress: .*$/m, () => "- in-progress: beads in_progress, counted as landed-gated for the feature.");
    expect(changed, "the controls change the real in-progress definition").not.toBe(real);
    const fence = "```";
    const before = (text: string, insert: string): string => text.replace(heading, () => `${insert}\n\n${heading}`);
    const inside = (text: string, insert: string): string => text.replace(`${heading}\n\n`, () => `${heading}\n\n${insert}\n\n`);
    const raised = [...MATRIX_CLAIMS, "in-progress"];
    const controls: { id: string; text: string; ok: boolean; claims: readonly string[] }[] = [
      { id: "real-legend", text: real, ok: true, claims: MATRIX_CLAIMS },
      { id: "HU1c-changed-definition", text: changed, ok: true, claims: raised },
      { id: "HU1-commented-copy-before-the-heading", text: before(changed, `<!--\n${heading}\n\n${copy}-->`), ok: true, claims: raised },
      { id: "HU2-fenced-copy-before-the-heading", text: before(changed, `${fence}\n${heading}\n\n${copy}${fence}`), ok: true, claims: raised },
      { id: "commented-copy-inside-the-section", text: inside(changed, `<!--\n${copy}-->`), ok: true, claims: raised },
      { id: "fenced-copy-inside-the-section", text: inside(changed, `${fence}\n${copy}${fence}`), ok: true, claims: raised },
      { id: "second-rendered-heading", text: `${real}\n${heading}\n\n${copy}`, ok: false, claims: [] },
      { id: "second-vocabulary-line", text: real.replace(copy, () => `${copy}\n${copy}`), ok: false, claims: [] },
      { id: "renamed-heading", text: real.replace(heading, () => "## Status words"), ok: false, claims: [] },
      { id: "comment-between-the-line-and-the-list", text: real.replace(`${LEGEND_LEAD}\n\n`, () => `${LEGEND_LEAD}\n\n<!-- the five words -->\n\n`), ok: true, claims: MATRIX_CLAIMS },
      { id: "malformed-legend-item", text: real.replace("\n- planned: ", () => "\n- planned words: "), ok: false, claims: [] },
    ];
    const readings = controls.map(control => {
      const reading = legendOf(control.text);
      expect({ ok: reading.ok, claims: legendClaims(reading) }, `${control.id}: ${reading.why}`).toEqual({ ok: control.ok, claims: [...control.claims] });
      return { id: control.id, ok: reading.ok, claims: legendClaims(reading) };
    });
    return { controls: readings };
  },
  C1: () => {
    expect([...CLAIM_STATUSES], "the guard's claim statuses").toEqual(CLAIM_WORDS);
    const controls: LedgerControl[] = [
      { id: "live-sdk-on-a-fixture", status: "live-sdk", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "Pi route fixture"] },
      { id: "gate-pass-on-a-hermetic-cmd", status: "gate-pass", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "hermetic forge run cmd_65b034a22fb5"] },
      { id: "shipped-on-fakes", status: "shipped", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "fake-producer journey; recorded fixture envelope"] },
      { id: "live-sdk-on-a-labelled-cmd-elsewhere", status: "live-sdk", evidence: [IMPLEMENTED, "hermetic smoke cmd_65b034a22fb5", DASH, DASH, DASH, DASH] },
      { id: "live-sdk-mixed", status: "live-sdk", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "Real SDK events; Pi route fixture"] },
      { id: "fixture-status", status: "fixture", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "Pi route fixture"] },
      { id: "experimental-status", status: "experimental", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "hermetic fixture"] },
    ];
    const refused = new Set(["live-sdk-on-a-fixture", "gate-pass-on-a-hermetic-cmd", "shipped-on-fakes", "live-sdk-on-a-labelled-cmd-elsewhere"]);
    const readings = controls.map(control => {
      const reading = guardReading(control);
      expect(reading.rules, `${control.id}: ${refused.has(control.id) ? "refused by receipt-tier alone" : "no integrity finding"}`).toEqual(refused.has(control.id) ? ["receipt-tier"] : []);
      expect(reading.vocabulary, `${control.id}: no vocabulary finding`).toBe(0);
      if (refused.has(control.id)) expect(reading.detail, `${control.id}: the detail names the status`).toContain(`${control.status} row`);
      return { id: control.id, rules: reading.rules, detail: reading.detail };
    });
    const live = parseLedger(textOf(LEDGER));
    const result = validateLedger(live, { root: REPO }) as Validation;
    expect(result.integrity, "the live ledger carries no integrity finding").toEqual([]);
    const claimRows: LedgerRow[] = live.rows.filter((row: LedgerRow) => CLAIM_WORDS.includes(row.status));
    const receipts = Object.fromEntries(claimRows.map(row => [row.id, json(receiptClauses(row))]));
    return { controls: readings, liveClaimRows: claimRows.map(row => `${row.id}:${row.status}`), liveReceipts: receipts, liveIntegrity: result.integrity.length };
  },
  C2: () => {
    const walked = markdownBelow(SENTENCE_SCOPE);
    expect(walked, "the walk is every .md file git tracks under docs").toEqual(trackedMarkdown(SENTENCE_SCOPE));
    for (const anchor of [LEDGER, "docs/rpc.md", "docs/workflows.md"]) expect(walked, `the walk reads ${anchor}`).toContain(anchor);
    const findings = walked.flatMap(path => sentenceFindings(path, textOf(path)));
    expect(findings, "no docs sentence equates a fixture run with live Furnace/Beads success").toEqual([]);
    expect(sentencesOf(textOf("docs/workbench/07-native-integrations.md")), "the splitter reads a real docs sentence whole").toContain("Never call fixture success a live end-to-end journey.");
    const controls: { id: string; text: string; flagged: boolean }[] = [
      { id: "equals", text: "A fixture run equals live Furnace success.", flagged: true },
      { id: "counts-as", text: "The fake-producer journey counts as a live Beads success.", flagged: true },
      { id: "proves", text: "A hermetic run proves live Furnace/Beads success.", flagged: true },
      { id: "copula", text: "A fixture run is live Furnace success.", flagged: true },
      { id: "reversed", text: "Live Furnace success is the same as a fixture pass.", flagged: true },
      { id: "negation-elsewhere", text: "A fixture run equals live Furnace success, with no GitHub CI.", flagged: true },
      { id: "furnace-own-rule", text: "Use Forge for QA. Never claim a fixture run equals live Furnace/Beads success or that a learned policy gained native mutation authority.", flagged: false },
      { id: "is-not", text: "Fixture success is not a live Furnace success.", flagged: false },
      { id: "does-not-equal", text: "A fixture pass does not equal live Beads success.", flagged: false },
      { id: "is-distinct", text: "A fixture pass is distinct from a live Furnace success.", flagged: false },
      { id: "no-predicate", text: "The live Furnace run succeeded; the fixture also ran.", flagged: false },
      { id: "table-cells", text: "| A fixture run is | live Furnace success |", flagged: false },
      // F4 (rider): a list item and a heading each end a sentence.
      { id: "two-adjacent-list-items", text: "- A fixture run\n- equals live Furnace success.", flagged: false },
      { id: "heading-then-a-line", text: "## A fixture run\nequals live Furnace success.", flagged: false },
      // U1, the rendered view: RT2 of the refusal, then the other members of its class.
      { id: "RT2-negation-only-in-a-comment", text: "A fixture run <!-- never --> equals live Furnace success.", flagged: true },
      { id: "predicate-split-by-a-comment", text: "A fixture run eq<!-- -->uals live Furnace success.", flagged: true },
      { id: "word-split-by-emphasis", text: "A fix**ture** run equals live Furnace success.", flagged: true },
      { id: "word-spelled-by-a-reference", text: "A fixture run equals live Furnace succ&#101;ss.", flagged: true },
      { id: "word-split-by-an-invisible", text: `A fixture run equals live Fur${ZERO_WIDTH}nace success.`, flagged: true },
      { id: "equation-in-an-unterminated-comment", text: "Pi runs fixtures.\n\n<!-- A fixture run equals live Furnace success.", flagged: false },
      { id: "html-block-text", text: "<div>A fixture run equals live Furnace success.</div>", flagged: true },
      { id: "equation-in-code", text: "```\nA fixture run equals live Furnace success.\n```", flagged: true },
      { id: "equation-in-a-blockquote", text: "> A fixture run equals live Furnace success.", flagged: true },
    ];
    const readings = controls.map(control => {
      const found = sentenceFindings("docs/workbench/x.md", control.text);
      expect(found.length > 0, `${control.id} is ${control.flagged ? "flagged" : "quiet"}`).toBe(control.flagged);
      return { id: control.id, findings: found.length };
    });
    return { walkIsTracked: true, findings, controls: readings };
  },
  Q1: () => {
    const text = `RF-GRAPH-POLICY-MACHINE-CONTROL-R1 binds the gp seam.\n${"x".repeat(2 * WINDOW)}\nGraphPolicyCLI ranks HX plans faster.`;
    const reading = citationsIn("docs/workbench/03-architecture-and-ownership.md", text);
    expect(reading.findings, "an HX plan-ranking mention in an attributed file reads as a namesake").toEqual([]);
    return { attributed: reading.attributed, findings: reading.findings.length };
  },
  Q2: () => {
    const reading = citationsIn("docs/workbench/x.md", "TrainingWorks Forge export (no code, test or task-store mutation).");
    expect(reading.findings, "an unpinned Forge mention beside the beads phrase passes").toEqual([]);
    return { citations: reading.citations, findings: reading.findings.length };
  },
  Q3: () => {
    const walked = markdownBelow(CITATION_SCOPE);
    const outside = ["README.md", "CHANGELOG.md", "docs/rpc.md", "docs/workflows.md"];
    for (const path of outside) expect(textOf(path).length, `${path} exists`).toBeGreaterThan(0);
    expect(outside.filter(path => walked.includes(path)), "clause (a)'s walk reads none of them").toEqual([]);
    return { outsideTheWalk: outside };
  },
  Q4: () => {
    const bare = guardReading({ id: "bare-cmd", status: "gate-pass", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "cmd_65b034a22fb5"] });
    const unlabelled = guardReading({ id: "unlabelled-replay", status: "live-sdk", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, "recorded envelope replay"] });
    expect([bare.rules, unlabelled.rules], "unlabelled fixture-tier receipts read live tier").toEqual([[], []]);
    return { bare: bare.rules, unlabelled: unlabelled.rules };
  },
  Q5: () => {
    const live = parseLedger(textOf(LEDGER));
    const row: LedgerRow | undefined = live.rows.find((entry: LedgerRow) => entry.id === "WB-019");
    expect(row?.status, "WB-019 is the live gate-pass row").toBe("gate-pass");
    const receipts: string[] = row === undefined ? [] : receiptClauses(row);
    expect(receipts, "WB-019 carries no receipt clause").toEqual([]);
    const tier = (validateLedger(live, { root: REPO }) as Validation).integrity.filter(finding => finding.rule === "receipt-tier");
    expect(tier, "receipt-tier does not judge a row with no receipt clause").toEqual([]);
    const absent = guardReading({ id: "absent", status: "shipped", evidence: [IMPLEMENTED, DASH, DASH, DASH, DASH, DASH] });
    expect(absent.rules, "a synthetic shipped row with no receipt clause reads clean").toEqual([]);
    return { row: "WB-019", receipts, tier: tier.length, synthetic: absent.rules };
  },
  Q6: () => {
    const found = sentenceFindings("docs/workbench/x.md", "A fixture pass vouches for live Furnace success.");
    expect(found, "an equation through an unlisted predicate is not read").toEqual([]);
    return { findings: found.length };
  },
  Q7: () => {
    const rows = tableRows("docs/workbench/x.md", tableOf(MATRIX_HEADER, ["| TW export adapter | landed-gated | test/x.test.ts | — |", "| learned hx planner | landed-gated | test/x.test.ts | — |"]));
    const findings = rowFindings(rows);
    expect(findings, "rows spelling no subject name read no subject").toEqual([]);
    return { rows: rows.length, findings: findings.length };
  },
  Q8: () => {
    const rows = tableRows("docs/workbench/x.md", tableOf("| Requirement | Evidence | Status |", ["| A TrainingWorks export adapter | test/x.test.ts | landed |"]));
    const findings = rowFindings(rows);
    expect(rows.map(row => row.status), "the row's status is read").toEqual(["landed"]);
    expect(findings, "a status outside both claim lists reads unclaimed").toEqual([]);
    return { status: "landed", findings: findings.length };
  },
  Q9: () => {
    const lookalike = citationsIn("docs/workbench/x.md", `Pi reads the Tr${cp(0x430)}iningWorks export.`);
    const unlisted = citationsIn("docs/workbench/x.md", "The graph&hyphen;policy&hyphen;optimization program ranks plans.");
    expect([lookalike.findings, unlisted.findings], "a look-alike letter or an unlisted named reference is not folded, so the spelling is no match").toEqual([[], []]);
    expect([lookalike.citations, unlisted.citations], "and no citation is counted").toEqual([0, 0]);
    return { lookalike: lookalike.findings.length, unlisted: unlisted.findings.length };
  },
  Q10: () => {
    const reading = citationsIn("docs/workbench/x.md", "[TrainingWorks](https://example.invalid/forge/README.md@3ce473386133) export: no code, test or task-store mutation.");
    expect(reading.findings, "a sha only in a link destination pins nothing: the citation is held to its family").toEqual([]);
    return { citations: reading.citations, findings: reading.findings.length };
  },
  Q11: () => {
    const reading = citationsIn("docs/workbench/x.md", "Pi reads no TrainingWorks export <span hidden>no code, test or task-store mutation</span>.");
    expect(reading.findings, "a phrase in an element a browser hides still renders in this view").toEqual([]);
    return { citations: reading.citations, findings: reading.findings.length };
  },
  Q12: () => {
    const html = (header: readonly string[], row: readonly string[]): string =>
      `<table>\n<tr>${header.map(cell => `<th>${cell}</th>`).join("")}</tr>\n<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>\n</table>`;
    const markdown = (header: readonly string[], row: readonly string[]): string => tableOf(`| ${header.join(" | ")} |`, [`| ${row.join(" | ")} |`]);
    const matrixHeader = cellsOf(MATRIX_HEADER);
    const ledgerHeader = ["Requirement", "Status"];
    const subject = "TrainingWorks Forge export adapter (proposed additive source adapter, not implemented)";
    const subjectRow = [subject, "landed-gated", "test/x.test.ts", DASH];
    const speedupRow = ["hx query planning", "landed-gated", "hx answers 3x faster", DASH];
    const shippedRow = ["TrainingWorks export adapter (no code, test or task-store mutation)", "shipped"];
    const controls: { id: string; text: string; quiet: boolean }[] = [
      { id: "html-matrix-subject-landed-gated", text: html(matrixHeader, subjectRow), quiet: true },
      { id: "html-matrix-hx-speedup-without-a-receipt", text: html(matrixHeader, speedupRow), quiet: true },
      { id: "html-ledger-subject-shipped", text: html(ledgerHeader, shippedRow), quiet: true },
      { id: "table-tags-inline-in-a-paragraph", text: `Pi notes <table><tr><td>${subject}</td><td>landed-gated</td></tr></table>`, quiet: true },
      { id: "html-table-inside-a-list-item", text: `- <table><tr><td>${subject}</td><td>landed-gated</td></tr></table>`, quiet: true },
      { id: "markdown-matrix-subject-landed-gated", text: markdown(matrixHeader, subjectRow), quiet: false },
      { id: "markdown-matrix-hx-speedup-without-a-receipt", text: markdown(matrixHeader, speedupRow), quiet: false },
      { id: "markdown-ledger-subject-shipped", text: markdown(ledgerHeader, shippedRow), quiet: false },
    ];
    const readings = controls.map(control => {
      const rows = tableRows("docs/workbench/x.md", control.text);
      const findings = rowFindings(rows);
      expect(findings.length === 0, `${control.id} is ${control.quiet ? "quiet: a table in raw HTML renders no table row for clause (b)" : "flagged as a markdown table row"}`).toBe(control.quiet);
      if (control.quiet) expect([rows.length, tableLineCount(control.text)], `${control.id}: no row in the rendered read or the source count`).toEqual([0, 0]);
      return { id: control.id, rows: rows.length, findings: findings.length };
    });
    const documents = [LEDGER, MATRIX].map(path => ({ path, ...htmlTableRoutes(textOf(path)) }));
    expect(documents, "neither judged document renders an HTML block or holds a table tag, so every table row they render is a marked table row").toEqual(
      [LEDGER, MATRIX].map(path => ({ path, htmlBlocks: 0, tableTags: 0 })),
    );
    const w10 = textOf(W10_GUARD);
    const freeze = textOf(FREEZE_GUARD);
    const guards = {
      matrix: { guard: W10_GUARD, tracked: tracked(W10_GUARD), document: W10_MATRIX.exec(w10)?.[1] ?? "", pageChecks: w10.split(W10_PAGE_CHECK).length - 1 },
      ledger: { guard: FREEZE_GUARD, tracked: tracked(FREEZE_GUARD), document: FREEZE_TARGET.exec(freeze)?.[1] ?? "", frozenSha256: FREEZE_HASH.exec(freeze)?.[1] ?? "" },
    };
    expect([guards.matrix.tracked, guards.ledger.tracked], "both cited guards are git-tracked test files").toEqual([true, true]);
    expect(guards.matrix.document, "the W10 stamped-claim guard reads the matrix").toBe(MATRIX);
    expect(guards.matrix.pageChecks, "and applies its raw-HTML page check to it once").toBe(1);
    expect(guards.ledger.document, "the TRACEABILITY freeze reads the ledger").toBe(LEDGER);
    expect(guards.ledger.frozenSha256, "and its pinned hash is the ledger's sha256").toBe(sha256Of(LEDGER));
    return { controls: readings, documents, guards };
  },
};

describe("wb-4wmu.1 TrainingWorks status census (BEADS-TRAININGWORKS-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:3", "C:2", "Q:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      json({
        citationPattern: CITATION_PATTERN,
        window: WINDOW,
        citationScope: CITATION_SCOPE,
        sentenceScope: SENTENCE_SCOPE,
        ledger: LEDGER,
        matrix: MATRIX,
        claimWords: CLAIM_WORDS,
        matrixLegend: MATRIX_LEGEND,
        matrixClaims: MATRIX_CLAIMS,
        namesakeFiles: NAMESAKE_FILES,
        familyMarks: Object.fromEntries(FAMILIES.map(family => [family, FAMILY_MARKS[family].source])),
        otherProgram: OTHER_PROGRAM.source,
        deposits: DEPOSITS,
        subject: [SUBJECT_TW.source, SUBJECT_GP_PROGRAM.source, SUBJECT_GP.source, SUBJECT_HX.source],
        speed: SPEED.source,
        receipt: RECEIPT.source,
        fixtureTier: FIXTURE_TIER.source,
        sentence: [LIVE.source, NATIVE.source, SUCCESS.source, EQUATING.source, NEGATION_BEFORE.source, NEGATION_AFTER.source, CLAUSE_BREAK.source, SENTENCE_BREAK.source],
        rendered: { namedReferences: NAMED_REFERENCES, reference: REFERENCE.source, hiddenHtml: HIDDEN_HTML.source, format: FORMAT.source, phraseSpace: PHRASE_SPACE },
        legend: { heading: LEGEND_HEADING, parents: LEGEND_PARENTS, lead: LEGEND_LEAD, item: LEGEND_ITEM.source },
        residuals: RESIDUALS,
        htmlTable: {
          tableTag: TABLE_TAG.source,
          comment: HTML_COMMENT.source,
          guards: [W10_GUARD, FREEZE_GUARD],
          w10: [W10_MATRIX.source, W10_PAGE_CHECK],
          freeze: [FREEZE_TARGET.source, FREEZE_HASH.source],
        },
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    for (const deposit of DEPOSITS) {
      const producer = ROSTER.producer[deposit.id];
      expect(isObject(producer) && typeof producer.statusLine === "string" && producer.statusLine.includes(deposit.phrase), `${deposit.id}'s phrase is its measured status line's words`).toBe(true);
    }
  });

  it("the outside anchors: the bead's own row binds the row labels, the pattern, the window, the scopes, the claim and fixture words and the deposits; the matrix legend binds its claim statuses", { timeout: 60_000 }, () => {
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = acceptanceClauses(notes);
    expect(Object.keys(clauses), "the bead states clauses (a) to (c)").toEqual(["a", "b", "c"]);
    const judgedRows = ROWS.filter(row => row.id !== "Q");
    for (const row of judgedRows) expect(clauses[letterOf(row.label)], `row ${row.id} quotes its acceptance clause exactly`).toBe(quoteOf(row.label));
    for (const [letter, clause] of Object.entries(clauses)) {
      expect(judgedRows.filter(row => letterOf(row.label) === letter && quoteOf(row.label) === clause).map(row => row.id), `clause (${letter}) is quoted by exactly one row`).toHaveLength(1);
    }
    const a = clauses.a ?? "";
    expect(/^every \/([^/]+)\/ match/.exec(a)?.[1], "the pattern is clause (a)'s").toBe(CITATION_PATTERN);
    expect(Number(/within (\d+) chars/.exec(a)?.[1]), "the window is clause (a)'s").toBe(WINDOW);
    expect(/ match in (\S+) sits /.exec(a)?.[1], "the citation scope is clause (a)'s").toBe(CITATION_SCOPE);
    expect(quotedWords(clauses.b ?? ""), "the claim words are clause (b)'s").toEqual(CLAIM_WORDS);
    expect(quotedWords(clauses.c ?? ""), "and clause (c)'s").toEqual(CLAIM_WORDS);
    expect(/no (\w+) or TRACEABILITY sentence/.exec(clauses.c ?? "")?.[1], "the sentence scope is clause (c)'s").toBe(SENTENCE_SCOPE);
    const runWords = /never claim a (\w+), ([\w-]+) or (\w+) run equals live/.exec(notes)?.slice(1) ?? [];
    expect(runWords, "the statement names the fixture side").toEqual(["fixture", "fake-producer", "hermetic"]);
    expect(FIXTURE_TIER.source.split("|"), "FIXTURE_TIER's alternatives are the statement's run words").toEqual(runWords.map(word => word.split("-")[0]));
    expect(FIXTURE_TIER.flags, "read case-insensitively").toBe("i");
    const filed = filedDeposits(notes);
    expect(filed.map(entry => entry.key), "DEPOSITS are the filing's merged list").toEqual(DEPOSITS.map(deposit => `${deposit.repo}@${deposit.sha}:${deposit.program}:${deposit.line}`));
    for (const [index, entry] of filed.entries()) {
      const phrase = DEPOSITS[index]?.phrase ?? "";
      expect(inOrder(entry.quote, phrase), `the filed quote '${entry.quote}' is an in-order word subsequence of "${phrase}"`).toBe(true);
    }
    const legend = legendOf(textOf(MATRIX));
    expect(legend.ok, `the matrix legend renders once under its heading: ${legend.why}`).toBe(true);
    expect(
      legend.entries.map(entry => entry.word),
      "the matrix legend",
    ).toEqual(MATRIX_LEGEND);
    expect(legendClaims(legend), "MATRIX_CLAIMS are the legend statuses that are or name landed-gated").toEqual(MATRIX_CLAIMS);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
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
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
