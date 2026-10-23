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
 * MEASURED (read-only, by the cutting seat, 2026-10-23; the producer facts ride the roster with their blob ids): each deposit's
 * README.md:3 at its pin is its status line, and DEPOSITS holds that line's status clause verbatim: HX "no new HX code implemented",
 * Forge "proposed additive source adapter, not implemented", Furnace "no simulator or policy hooks implemented by this commit", MW "no
 * new implementation asserted", beads "no code, test or task-store mutation", RFCLI "not a shipped TrainingWorks adapter or new host
 * capability" (the filing's 'not a shipped adapter' elides "TrainingWorks": the census holds the source's words and reads each filed
 * quote as an in-order word subsequence of its phrase), and HX GP (graph-policy-optimization-2026-10-18) "design only". At the
 * filing pin d75b68d no docs/workbench line matched (a)'s pattern. At this census's base 14 matches on 11 lines of 3 files do
 * (docs/workbench/03 :37-:78, receipts wb-1xvp.3 and wb-1xvp.5), all landed after the filing by the RF-GRAPH-POLICY-MACHINE-CONTROL
 * beads (wb-1xvp.2 first, at f7d023b): every one names the GraphPolicyCLI tool (gp), none spells the TrainingWorks name or the HX x
 * GP program within 400 characters, and each file names ReactiveFiberCLI's graph-policy-machine-control program, so each is an
 * ATTRIBUTED NAMESAKE - it cites neither a TrainingWorks deposit nor the HX x GP program and owes no status phrase. TRACEABILITY.md
 * (frozen byte-exact) has one live-sdk row, WB-009 (receipt clauses "Real SDK events" and "session UUIDs"), one gate-pass row,
 * WB-019 (no receipt clause: its live cell is an em dash and it carries no cmd_ token), and no shipped row. Neither the ledger nor
 * the matrix has a row naming TrainingWorks, the HX x GP program, gp beside hx, or an hx speedup, and no docs sentence spells a
 * fixture side, "live", Furnace or Beads and a success word together.
 *
 * THE JUDGES. (a) For every match of the filing's pattern in docs/workbench, the window is the 400 characters on each side. A
 * window spelling "TrainingWorks" (any case) cites the TrainingWorks family; one spelling graph-policy-optimization, the program's
 * title "HyperUnix x GraphPolicyCLI" (x or the multiplication sign) or "HX GP" cites the HX x GP program. A cited family owes the
 * phrase of the deposit its window pins by sha (7 hex or more; HX's two deposits share a sha and the family tells them apart), or,
 * pinning none, any phrase of the family; the phrase must sit within 400 characters of the match (the characters strictly between
 * the two, the phrase matched with any whitespace between its words). A match citing neither family is a namesake: attributed when
 * its file names the graph-policy-machine-control program (its program id or its directory), otherwise owed some deposit's phrase
 * within the window like any citation. (b) Every markdown table row of TRACEABILITY.md and feature-matrix.md is read with the
 * Status cell of its table. A row names a subject when it spells TrainingWorks or graph-policy-optimization, or gp, GraphPolicy or
 * GraphDataIR beside hx or HyperUnix; it presents the subject as shipped when its status is one of the three words (b) quotes or a
 * matrix status whose legend definition is or names landed-gated (landed-gated, partial), or when its text spells one of the three
 * words. A row spelling hx or HyperUnix beside a speedup word owes a cmd_ receipt in the row. (c) The guard is the product's:
 * qa/workbench/status-ledger.mjs refuses (integrity rule receipt-tier) a shipped, gate-pass or live-sdk row whose receipt clauses -
 * each ";" clause of its live/native cell other than the em dash, and each clause of another evidence cell carrying a cmd_ token -
 * are all fixture tier (FIXTURE_TIER: the clause names a fixture, a fake producer or a hermetic run). The sentence judge reads every
 * docs .md sentence (terminal punctuation, a blank line, a list item, a heading or a table cell ends one): a sentence equates when
 * it spells a fixture side (FIXTURE_TIER), "live", Furnace or Beads and a success word, and an equating predicate (equals, counts
 * as, proves, means, is, ...) not negated in its own clause before it (never, not, no, cannot, without, distinguish, ...) and not
 * followed by not, never, no, distinct, different, separate or unlike.
 *
 * ROWS. A, (a): A1 the real docs/workbench walk (git-tracked, exact) - no finding, every match a citation or an attributed namesake,
 *    the namesakes found in the three measured files; A2 the judge on flagged and quiet controls (window boundary, sha attribution,
 *    the HX x GP family, the unattributed namesake, a line-wrapped phrase). B, (b): B1 the real ledger and matrix - every table row
 *    read (each document's own table-line count), the product parser's 50 WB rows among them with their statuses, every matrix
 *    status a legend word, no finding; B2 the judge on ledger and matrix controls. C, (c): C1 the guard through the product module -
 *    each claim status refused on fixture-tier receipts alone (live cell or a labelled cmd_ clause), a mixed row and non-claim rows
 *    accepted, the live ledger clean; C2 the real docs walk (git-tracked, exact) - no finding - and the sentence judge on controls.
 *    Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/trainingworks-status-roster.json). OUTSIDE ANCHORS (their own registered case): the bead's own row in the tracker
 * export (.beads/issues.jsonl): each acceptance clause is exactly one row's label; the pattern, the window and the scope are clause
 * (a)'s; the claim words are the ones clauses (b) and (c) quote and the product guard's CLAIM_STATUSES; FIXTURE_TIER's alternatives
 * are the statement's fixture, fake-producer and hermetic run; the sentence scope is clause (c)'s; DEPOSITS are the filing's merged
 * list, repo, sha and line, each filed quote an in-order word subsequence of its phrase. The matrix legend binds MATRIX_CLAIMS. The
 * last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the pins reached.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a control removed while every remaining control still holds; a pin's case
 * replaced by one that echoes its roster witness; the outside-anchor case or the closing case removed with its roster title.
 * RESIDUALS (named, each with its pinned quiet row): R-ATTRIBUTED-FILE a GraphPolicy mention without a family mark in a file that
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
 * reads unclaimed (Q8).
 * SCOPE: the tier is read from the ledger's own words, never from the producer: a receipt's tier is what its clause says. The
 * sentence judge reads words, not meaning: an affirmative sentence that names both sides around a copula (OVER-READ, disclosed;
 * none today) reads as an equation. The 400-character window counts UTF-16 code units of the raw markdown. A row's subject and
 * claim words are read anywhere in the row. No docs, ledger or matrix text is edited by this cut; the guard is the only product
 * change.
 *
 * Display paths added: none (the receipt-tier detail is a qa/workbench CLI receipt string; src/ is untouched). Test-only otherwise:
 * no scratch is allocated; docs, .beads and qa are only read.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CLAIM_STATUSES, FIXTURE_TIER, parseLedger, receiptClauses, validateLedger } from "../qa/workbench/status-ledger.mjs";

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
/** ReactiveFiberCLI's graph-policy-machine-control program (the RF-GRAPH-POLICY-MACHINE-CONTROL beads): a file naming it is a gp-tool page. */
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
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]|\d+\.|#+)\s)|\|/;

const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-ATTRIBUTED-FILE": ["Q1"],
  "R-UNPINNED": ["Q2"],
  "R-SCOPE": ["Q3"],
  "R-UNLABELLED": ["Q4"],
  "R-ABSENT": ["Q5"],
  "R-PARAPHRASE": ["Q6"],
  "R-SUBJECT-NAME": ["Q7"],
  "R-STATUS-WORD": ["Q8"],
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
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) validateLedger refuses a 'shipped'/'gate-pass'/'live-sdk' row backed only by a hermetic or fixture receipt (new guard), and no docs or TRACEABILITY sentence equates a fixture run with live Furnace/Beads success",
    pins: ["C1", "C2"],
  },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
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
function lineAt(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** The characters strictly between [start, end) and the phrase's nearest occurrence (any whitespace between its words); Infinity when absent. */
function gapTo(text: string, start: number, end: number, phrase: string): number {
  let best = Number.POSITIVE_INFINITY;
  for (const hit of text.matchAll(new RegExp(phrase.split(/\s+/).map(escaped).join("\\s+"), "g"))) {
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
/** Clause (a)'s judge over one document. */
function citationsIn(path: string, text: string): CitationReading {
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
      else if (!near(DEPOSITS)) findings.push({ path, line: lineAt(text, start), match: hit[0], family: "unattributed", owed: DEPOSITS.map(deposit => deposit.id) });
      continue;
    }
    citations += 1;
    for (const family of families) {
      const members = DEPOSITS.filter(deposit => deposit.family === family);
      const pinned = members.filter(deposit => window.includes(deposit.sha.slice(0, 7)));
      const owed = pinned.length > 0 ? pinned : members;
      if (!near(owed)) findings.push({ path, line: lineAt(text, start), match: hit[0], family, owed: owed.map(deposit => deposit.id) });
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
/** Every table row of a markdown document with the Status cell of its table (empty where the table has none). */
function tableRows(path: string, text: string): TableRow[] {
  const lines = text.split("\n");
  const rows: TableRow[] = [];
  let header: string[] = [];
  for (const [index, line] of lines.entries()) {
    if (!line.startsWith("|") || SEPARATOR.test(line)) continue;
    const cells = cellsOf(line);
    if (SEPARATOR.test(lines[index + 1] ?? "")) {
      header = cells;
      continue;
    }
    const at = header.indexOf("Status");
    const status = at < 0 ? "" : at === header.length - 1 ? (cells[cells.length - 1] ?? "") : (cells[at] ?? "");
    rows.push({ path, line: index + 1, status, text: line });
  }
  return rows;
}
/** A document's table rows counted from its lines alone: pipe lines less each separator and the header above it. */
function tableLineCount(text: string): number {
  const lines = text.split("\n");
  return lines.filter(line => line.startsWith("|")).length - 2 * lines.filter(line => SEPARATOR.test(line)).length;
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
/** The matrix's status legend: each "- word: definition" item after its heading line. */
function matrixLegend(text: string): { word: string; definition: string }[] {
  const start = text.indexOf("Status vocabulary (exactly one per row):");
  if (start === -1) return [];
  const legend: { word: string; definition: string }[] = [];
  for (const line of text.slice(start).split("\n").slice(1)) {
    if (line.trim() === "" && legend.length === 0) continue;
    const item = /^- ([a-z-]+): (.*)$/.exec(line);
    if (item === null) break;
    legend.push({ word: item[1] ?? "", definition: item[2] ?? "" });
  }
  return legend;
}

function sentencesOf(text: string): string[] {
  return text
    .split(SENTENCE_BREAK)
    .map(sentence => sentence.replace(/\s+/g, " ").trim())
    .filter(sentence => sentence.length > 0);
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
function sentenceFindings(path: string, text: string): string[] {
  return sentencesOf(text)
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
    ];
    const readings = controls.map(control => {
      const reading = citationsIn(control.path, control.text);
      expect(reading.findings.length > 0, `${control.id} is ${control.flagged ? "flagged" : "quiet"}`).toBe(control.flagged);
      return { id: control.id, findings: reading.findings.map(finding => `${finding.family}:${finding.owed.join("+")}`) };
    });
    const gap = (text: string): number => gapTo(text, 0, "TrainingWorks".length, DEPOSITS[4]?.phrase ?? "");
    expect([gap(`TrainingWorks${" ".repeat(WINDOW)}no code, test or task-store mutation`), gap(`TrainingWorks ${far}no code, test or task-store mutation`)]).toEqual([WINDOW, WINDOW + 1]);
    return { controls: readings };
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
    const legend = matrixLegend(matrixText).map(entry => entry.word);
    expect(matrixRows.filter(row => !legend.includes(row.status)).map(row => `${row.line}:${row.status}`), "every matrix status is a legend word").toEqual([]);
    const findings = rowFindings([...ledgerRows, ...matrixRows]);
    expect(findings, "no row presents a TrainingWorks or GP-planned hx subject as shipped, and no hx speedup lacks a receipt").toEqual([]);
    const claims = ledgerRows.filter(row => CLAIM_WORDS.includes(row.status)).map(row => `${row.line}:${row.status}`);
    return { ledgerRows: ledgerRows.length, wbRows: wb.length, ledgerClaimRows: claims, matrixStatusesAreLegend: true, findings };
  },
  B2: () => {
    const ledger = (status: string, requirement: string): string => tableOf(WB_HEADER, [`| WB-051 | P2 | ${requirement} | src/x.ts | ${DASH} | ${DASH} | ${DASH} | ${DASH} | ${DASH} | ${status} |`]);
    const matrix = (feature: string, status: string, evidence: string): string => tableOf(MATRIX_HEADER, [`| ${feature} | ${status} | ${evidence} | ${DASH} |`]);
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
    ];
    const readings = controls.map(control => {
      const findings = rowFindings(tableRows("docs/workbench/x.md", control.text));
      expect(findings.length > 0, `${control.id} is ${control.flagged ? "flagged" : "quiet"}`).toBe(control.flagged);
      return { id: control.id, findings: findings.length };
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
};

describe("wb-4wmu.1 TrainingWorks status census (BEADS-TRAININGWORKS-R1)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "Q:8"]);
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
        residuals: RESIDUALS,
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
    const legend = matrixLegend(textOf(MATRIX));
    expect(
      legend.map(entry => entry.word),
      "the matrix legend",
    ).toEqual(MATRIX_LEGEND);
    expect(
      legend.filter(entry => entry.word === "landed-gated" || entry.definition.includes("landed-gated")).map(entry => entry.word),
      "MATRIX_CLAIMS are the legend statuses that are or name landed-gated",
    ).toEqual(MATRIX_CLAIMS);
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
