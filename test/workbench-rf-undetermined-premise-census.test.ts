/**
 * wb-pfxo.11 (RF-COMPOSITIONAL-ASSEMBLY-R12, program-triage-2026-10-22), a posture census (no Pi gating artifact). Statement
 * (the bead note, full form): "No Pi bead, doc or claim surface shall treat the program's UNDETERMINED claims as premises:
 * that rf context plan reaches a 'reuse' row (small-a-C058), that five swarms produced the October 17-18 corpus
 * (small-a-C070), or that dependency traversal meets O(|affected edges|+|affected nodes|) (small-a-C082b), until the named
 * missing artifact exists (posture; the three artifacts are RFCLI's to produce, no Pi gating artifact)" -
 * docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md:45@6a251bf73af5.
 * Acceptance (owner filing, verbatim; CLAUSES, read back out of the bead export by the filing anchor): "(a) grep over wb bead
 * titles/descriptions filed for this program: zero assertions that a 'reuse' plan row is reachable, that five swarms are
 * established, or that traversal meets the O(affected) bound; (b) docs census: any Pi sentence about rf reuse reachability,
 * the five-swarm population or traversal complexity is marked UNDETERMINED with the claim id; (c) a Pi fixture asserting a
 * 'reuse' decision row is labelled synthetic, never as an observed rf plan."
 *
 * SOURCES (read-only: git show and git rev-parse on the local ReactiveFiberCLI checkout at RF_COMMIT, at cut time):
 * BEADS-2026-10-21.md:45 reads "UNDETERMINED claims the program should settle (3); each names the missing artifact.
 * UNDETERMINED is a result, not permission to guess: no bead treats these as premises."; :49-:51 state the three propositions
 * (CLAIMS, quoted as audited, markdown escapes removed) with their missing artifacts (E1 never exercised the reachable 'reuse'
 * configuration; only OrchestrationEngineer and DecideCLI are witnessed; no traversal benchmark exists); :41 is the ledger's
 * grade row. README.md:11 reads "Reachability of plan 'reuse' is not established." and README.md:5 "No independent five-swarm
 * population census has yet been established from feedback corpus." (rows F41, F40). CITATION_BLOBS pins both files' blob ids
 * at RF_COMMIT. No Pi gating artifact exists and none is awaited: settling a claim is the program's move and a re-filing,
 * never a flip of this guard.
 *
 * THE READING (one text reading for (a) and (b); (c) reads JSON structure):
 * - FOLDED TOKENS: numeric character references (semicolon optional), the NAMED_REFERENCES, JS escapes (\uXXXX, \u{X}, \xHH,
 *   three-digit octal) and %XX decoded; NFKD with combining marks dropped; the CONFUSABLES (Greek and Cyrillic letters that
 *   render as Latin ones) read as their Latin look-alikes; format code points (Unicode Cf: zero-width, soft hyphen, bidi
 *   marks) transparent; emphasis marks (* _ ~ `) between two letters or digits dropped; a lower-to-upper case change, or an
 *   upper-case run before a capitalised word, a word boundary (joined camel spellings read); lower case; every [a-z0-9] run
 *   one token. This is a reading of repository text for a test verdict, never a display path.
 * - MENTION: a CLAIMS shape matching the folded tokens of one block (a maximal run of non-blank lines): every group of the
 *   shape reads a token (a term "=w" reads the token w exactly, any other term every token containing it, so inflections and
 *   lower-case joined words read) and the matched tokens span at most the shape's window, in either order. A claim id is a
 *   mention too (family claim-id): one to three tokens that join to the folded id, so small-a-C058, small_a_C058 or
 *   smallAC058 read; a bare C058 does not (R16).
 * - WINDOW: a block's lines split into sentence pieces after ., ! or ? followed by white space; a mention is judged once per
 *   claim, family and first piece, on the pieces its tightest span covers, so an echo in another sentence, on another line or
 *   in another table row never covers it (F33-F35, F38), while a wrapped phrase is judged on both its lines (N03).
 * - ECHO: the window carries the verdict word UNDETERMINED (raw, exact case, whole word; never folded: F29, F31, F32) and the
 *   mention's own claim id (raw, whole token: F27, F30), and no OTHER_GRADES word (the ledger's other grades and the grades a
 *   Pi surface could mint: F28). Otherwise the finding names what the window lacks or carries: no-undetermined, no-claim-id,
 *   other-grade. The reading does not tell an assertion from a negation or a quotation, so every mention is an echo or it is
 *   refused (F24, F40, F41): clause (a)'s "zero assertions" is read in the stricter form clause (b) states.
 * - (a) the tracked bead export (.beads/issues.jsonl): every line must parse (F54); a row filed for the program is the epic
 *   wb-pfxo, an id under it, or a row with a parent-child dependency on it (F53); its judged fields are the title, the
 *   description and the full-statement paragraph a trimmed title carries as the first paragraph of its notes (F49-F55).
 *   Rows outside the program and later note paragraphs are not read (R8, R9): gate and collector notes accumulate on rows.
 * - (b) every file under docs/, examples/, new-feedback/, src/ and qa/ and every .md file at the repository root, as text
 *   (F01-F08), walked from disk with dot directories (node_modules, dist and .git skipped; a symlink is refused, never
 *   followed); TEXT_FLOORS count the walked files per tree and extension. Text under test/ is not read (R7): test files are
 *   evidence, and fixtures are clause (c)'s.
 * - (c) every .json file under test/, qa/ and examples/ is parsed (an unparsable one is a finding, F65) and walked: an object
 *   asserts a reuse row when a key folding to a word ending in "decision" holds a value folding to "reuse" (F63, F73), and a
 *   reuse count when a key folding to "reuse" holds a positive number beside one of the plan summary's other decision counts
 *   (F64). It is admitted only when its nearest deciding label is synthetic: walking from the object to the root, each
 *   object's label (its LABEL_KEYS string or string-array values, or a boolean synthetic) reads not-synthetic (a negated or
 *   qualified "synthetic", or synthetic: false), synthetic, observed (an OBSERVED_WORDS word) or neutral, and the first
 *   non-neutral one decides (F57-F62, F71, F72, N10-N12, N18); with none the row is unlabelled. A synonym ("constructed") is
 *   not the label (F62). Rows built in code, other formats and JSON inside a string are not read (R12, R15, R17).
 * FINDING: `<path>:<line> <claim id> <family>: <diagnoses>` per refused mention (line = the line of its first piece),
 * `<bead id> <field>:<line> <claim id> <family>: <diagnoses>` per refused mention of a program row, `<path> <JSON pointer>
 * reuse-row|reuse-count: unlabelled|labelled-observed|labelled-not-synthetic` per refused fixture row, `<path> unreadable`
 * per unparsable fixture and `line <n> unreadable` per unparsable export line.
 * LIVE NON-VACUITY: each live leg plants one violation into a real file in memory (a sentence into docs/workbench/07, a row
 * into test/fixtures/rf-result-keys.json, the filing's own export line with its verdict word removed) and the same reading
 * finds exactly it; the filing's title reads as a mention of every claim and of every claim id.
 * OUTSIDE ANCHORS: the owner filing's row in the tracked export (wb-pfxo.11) states the three claim ids in order, the verdict
 * word, the audit pin 740c1a817, the C058 proposition with its line and the other two ids with theirs, and the acceptance
 * clauses verbatim, and its spellings read as mentions of their families; the epic's title counts the program's children.
 * The out-of-file roster test/fixtures/rf-undetermined-premise-roster.json carries every judged row (table, id, registered
 * test, findings, input digest), the claims with their shapes, RF_COMMIT, CITATION_BLOBS and the residual families; the
 * roster case judges the in-file rows and this file's registered tests (vitest's task tree) against it in order and both
 * ways, so a row or a claim removed from every literal of this file still reds. Not claimed: an edit of this file and the
 * roster together.
 * FROZEN SHAPE (standing rule 16): ROWS_LITERAL pins every judged row (table, id, findings, input digest prefix); the claims
 * with their shapes, the constants, the scopes, the floors, the vocabularies, the confusables and the residual families are
 * pinned as literals read at this cut.
 * RESIDUALS (named; each has a pinned quiet row, RESIDUAL_FAMILIES): R1 a paraphrase; R2 a verb or noun outside a shape's
 * vocabulary; R3 shape words beyond the window; R4 ASCII look-alikes; R5 a phrase assembled at runtime; R6 files outside the
 * scanned trees; R7 text under test/; R8 bead rows outside the program; R9 later bead notes; R10 echo tokens in the
 * mention's own sentence, whatever they qualify; R11 status prose beside an echo; R12 reuse rows built in code (an in-file
 * constructed plan, such as one census's variant of a measured envelope); R13 decision values other than reuse; R14 a reuse
 * decision under another key; R15 fixture formats other than .json; R16 bare local claim ids; R17 JSON inside a string; R18
 * named references outside the decoded set; R19 a phrase split across a blank line; R20 look-alikes outside the confusables
 * table; R21 blank-looking letters outside Cf; R22 markup inside a word; R23 a reuse count outside the plan-summary shape.
 * Display paths added: none. This file is test-only: it spawns nothing and writes nothing; it reads the scanned trees, the
 * bead export and the roster fixture.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-pfxo.11";
const EPIC = "wb-pfxo";
const BEAD_EXPORT = ".beads/issues.jsonl";
const ROSTER = "test/fixtures/rf-undetermined-premise-roster.json";

/** The program ledger's verdict on the three claims (BEADS-2026-10-21.md:45 at the pin), matched raw and whole, never folded. */
const AUDIT_STATUS = "UNDETERMINED";
/** The ReactiveFiberCLI pin the filing cites (RF_COMMIT in full) and the audit pin the C058 and C082b propositions name. */
const PROGRAM_PIN = "6a251bf73af5";
const RF_COMMIT = "6a251bf73af57c3a703caf6892dfe3015e06a481";
const AUDIT_PIN = "740c1a817";
const PROGRAM_BEADS = "docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md";
/** Blob ids at RF_COMMIT of the two program files this cut quotes (git rev-parse on the local checkout, read-only, at cut time). */
const CITATION_BLOBS: Readonly<Record<string, string>> = {
  "docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md": "2ac4a741d3a21a1ab2c4cb42c5f9c2047f9abbdf",
  "docs/programs/compositional-assembly-2026-10-18/README.md": "b8a3d639fed32075a60ac058f1e689c6aeab4361",
};
/** A program child whose title was trimmed carries its full statement as the first paragraph of its notes. */
const FULL_STATEMENT = "Full statement (title trimmed to bd's 500-character limit):";
/** The program ledger's other grades (BEADS-2026-10-21.md:41) and the grades a Pi surface could mint: beside an echo, any one voids it. */
const OTHER_GRADES = ["ESTABLISHED", "SUPPORTED", "PLAUSIBLE", "UNSUPPORTED", "CONTESTED", "REFUTED", "NON-EPISTEMIC", "CONFIRMED", "VERIFIED", "PROVEN", "SETTLED"] as const;
/** The owner filing's acceptance clauses, verbatim; the filing anchor reads them back out of the bead export. */
const CLAUSES: Readonly<Record<"a" | "b" | "c", string>> = {
  a: "grep over wb bead titles/descriptions filed for this program: zero assertions that a 'reuse' plan row is reachable, that five swarms are established, or that traversal meets the O(affected) bound",
  b: "docs census: any Pi sentence about rf reuse reachability, the five-swarm population or traversal complexity is marked UNDETERMINED with the claim id",
  c: "a Pi fixture asserting a 'reuse' decision row is labelled synthetic, never as an observed rf plan",
};

/** A term reads a folded token: "=word" that token exactly, any other term every token containing it. */
type Group = readonly string[];
interface Shape {
  readonly groups: readonly Group[];
  /** The widest span, in folded tokens, from a match's first token to its last. */
  readonly window: number;
}
interface Claim {
  readonly id: string;
  readonly family: string;
  /** The line of PROGRAM_BEADS (at RF_COMMIT) stating the proposition. */
  readonly line: number;
  /** The proposition as audited, markdown escapes removed. */
  readonly proposition: string;
  readonly shapes: readonly Shape[];
}
const PLAN_CONTEXT: Group = ["plan", "=rf", "rfcli", "reactivefiber", "row", "decision", "graph"];
const FIVE: Group = ["five", "=5"];
const COMPLEXITY: Group = ["complexit", "linear", "asymptot", "proportional"];
const CLAIMS: readonly Claim[] = [
  {
    id: "small-a-C058",
    family: "reuse-reachability",
    line: 49,
    proposition: "Some configuration of rf context plan at 740c1a817 yields a 'reuse' row.",
    shapes: [{ groups: [["reus"], ["reach", "yield", "attain"], PLAN_CONTEXT], window: 6 }],
  },
  {
    id: "small-a-C070",
    family: "five-swarms",
    line: 50,
    proposition: "Five swarms produced the October 17-18 feedback corpus with distinguishable behaviour.",
    shapes: [
      { groups: [FIVE, ["swarms"]], window: 3 },
      { groups: [FIVE, ["swarm"], ["population", "corpus", "produc", "census"]], window: 6 },
    ],
  },
  {
    id: "small-a-C082b",
    family: "traversal-bound",
    line: 51,
    proposition: "The dependency traversal at 740c1a817 meets O(|affected edges|+|affected nodes|) excluding recompute and indexing.",
    shapes: [
      { groups: [["travers"], COMPLEXITY], window: 6 },
      { groups: [["=o"], ["affect"]], window: 2 },
      { groups: [["travers"], ["=o"], ["depend", "=rf", "affect", "fiber", "graph", "edge", "node"]], window: 4 },
      { groups: [["affect"], ["edge", "node"], COMPLEXITY], window: 6 },
    ],
  },
];
/** A claim id folds to at most this many tokens ("small", "a", "c058"). */
const ID_TOKENS = 3;

// ---- the fold ----
/** Greek and Cyrillic letters that render as Latin ones, read as their Latin look-alike. */
const CONFUSABLES: ReadonlyMap<string, string> = new Map(
  (
    [
      [0x0430, "a"],
      [0x0435, "e"],
      [0x043e, "o"],
      [0x0440, "p"],
      [0x0441, "c"],
      [0x0443, "y"],
      [0x0445, "x"],
      [0x0455, "s"],
      [0x0456, "i"],
      [0x0458, "j"],
      [0x04bb, "h"],
      [0x0501, "d"],
      [0x0405, "S"],
      [0x0406, "I"],
      [0x0408, "J"],
      [0x0410, "A"],
      [0x0412, "B"],
      [0x0415, "E"],
      [0x041a, "K"],
      [0x041c, "M"],
      [0x041d, "H"],
      [0x041e, "O"],
      [0x0420, "P"],
      [0x0421, "C"],
      [0x0422, "T"],
      [0x0423, "Y"],
      [0x0425, "X"],
      [0x03b1, "a"],
      [0x03b9, "i"],
      [0x03ba, "k"],
      [0x03bd, "v"],
      [0x03bf, "o"],
      [0x03c1, "p"],
      [0x03c4, "t"],
      [0x03c5, "u"],
      [0x03c7, "x"],
      [0x0391, "A"],
      [0x0392, "B"],
      [0x0395, "E"],
      [0x0396, "Z"],
      [0x0397, "H"],
      [0x0399, "I"],
      [0x039a, "K"],
      [0x039c, "M"],
      [0x039d, "N"],
      [0x039f, "O"],
      [0x03a1, "P"],
      [0x03a4, "T"],
      [0x03a5, "Y"],
      [0x03a7, "X"],
      [0x0131, "i"],
      [0x0237, "j"],
    ] as const
  ).map(([point, latin]) => [String.fromCodePoint(point), latin] as const),
);
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
/** Numeric character references (semicolon optional), the named ones above, JS escapes (\uXXXX, \u{X}, \xHH, \NNN octal) and %XX. */
function decodeReferences(text: string): string {
  return text
    .replace(/&#[xX]([0-9a-fA-F]{1,6});?|&#([0-9]{1,7});?/g, (raw: string, hex: string | undefined, decimal: string | undefined) => codePoint(hex !== undefined ? Number.parseInt(hex, 16) : Number.parseInt(decimal ?? "", 10), raw))
    .replace(/&([A-Za-z]+);/g, (raw: string, name: string) => NAMED_REFERENCES.get(name) ?? raw)
    .replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})|\\([0-7]{3})/g, (raw: string, braced: string | undefined, four: string | undefined, two: string | undefined, octal: string | undefined) =>
      codePoint(octal !== undefined ? Number.parseInt(octal, 8) : Number.parseInt(braced ?? four ?? two ?? "", 16), raw),
    )
    .replace(/%([0-9a-fA-F]{2})/g, (raw: string, hex: string) => codePoint(Number.parseInt(hex, 16), raw));
}
/**
 * Folded tokens: references decoded, NFKD with combining marks dropped, confusables read as Latin, format code points (Cf)
 * transparent, emphasis marks inside a word dropped, a lower-to-upper or upper-run-to-word case change a word boundary,
 * lower case, then every [a-z0-9] run one token.
 */
function foldTokens(text: string): string[] {
  const decomposed = decodeReferences(text)
    .normalize("NFKD")
    .replace(/\p{M}/gu, "");
  return (
    Array.from(decomposed, char => CONFUSABLES.get(char) ?? char)
      .join("")
      .replace(/\p{Cf}/gu, "")
      .replace(/(?<=[\p{L}\p{N}])[*_~`]+(?=[\p{L}\p{N}])/gu, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .toLowerCase()
      .match(/[a-z0-9]+/g) ?? []
  );
}
const folded = (text: string): string => foldTokens(text).join("");

// ---- mentions ----
const termReads = (term: string, token: string): boolean => (term.startsWith("=") ? token === term.slice(1) : token.includes(term));
const groupReads = (group: Group, token: string): boolean => group.some(term => termReads(term, token));
type Span = readonly [number, number];
/** From each token one of its groups reads: the tightest span in which every group reads a token at or after it, within the window. */
function shapeSpans(shape: Shape, words: readonly string[]): Span[] {
  const spans: Span[] = [];
  for (let start = 0; start < words.length; start++) {
    if (!shape.groups.some(group => groupReads(group, words[start] ?? ""))) continue;
    const end = Math.min(words.length - 1, start + shape.window);
    let last = start;
    let complete = true;
    for (const group of shape.groups) {
      let hit = -1;
      for (let index = start; index <= end && hit < 0; index++) if (groupReads(group, words[index] ?? "")) hit = index;
      if (hit < 0) {
        complete = false;
        break;
      }
      last = Math.max(last, hit);
    }
    if (complete) spans.push([start, last]);
  }
  return spans;
}
/** Runs of one to ID_TOKENS tokens that join to the folded claim id. */
function idSpans(claim: Claim, words: readonly string[]): Span[] {
  const target = folded(claim.id);
  const spans: Span[] = [];
  for (let start = 0; start < words.length; start++) {
    let joined = "";
    for (let end = start; end < Math.min(words.length, start + ID_TOKENS); end++) {
      joined += words[end] ?? "";
      if (joined === target) {
        spans.push([start, end]);
        break;
      }
      if (!target.startsWith(joined)) break;
    }
  }
  return spans;
}
interface Mention {
  readonly claim: Claim;
  /** The claim's family, or "claim-id" for a mention of the id itself. */
  readonly family: string;
  readonly first: number;
  readonly last: number;
}
/** Every candidate mention of the tokens, in token order, then CLAIMS order, a family before its id. */
function mentionsOf(words: readonly string[]): Mention[] {
  const found: { readonly mention: Mention; readonly order: number }[] = [];
  for (const [index, claim] of CLAIMS.entries()) {
    for (const shape of claim.shapes) for (const [first, last] of shapeSpans(shape, words)) found.push({ mention: { claim, family: claim.family, first, last }, order: 2 * index });
    for (const [first, last] of idSpans(claim, words)) found.push({ mention: { claim, family: "claim-id", first, last }, order: 2 * index + 1 });
  }
  return found.sort((left, right) => left.mention.first - right.mention.first || left.order - right.order || left.mention.last - right.mention.last).map(entry => entry.mention);
}

// ---- (a) and (b): the text reading ----
interface Piece {
  /** 1-based line of the scanned text. */
  readonly line: number;
  readonly text: string;
}
/** A line splits after ., ! or ? followed by white space; a line break always ends a piece. */
const SENTENCE_END = /(?<=[.!?])\s+/;
/** Blocks (maximal runs of non-blank lines), each as its sentence pieces. */
function blocksOf(text: string): Piece[][] {
  const out: Piece[][] = [];
  let block: Piece[] = [];
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    if (/^\s*$/.test(line)) {
      if (block.length > 0) out.push(block);
      block = [];
      continue;
    }
    for (const part of line.split(SENTENCE_END)) block.push({ line: index + 1, text: part });
  }
  if (block.length > 0) out.push(block);
  return out;
}
const STATUS_WORD = new RegExp(`(?<![A-Za-z0-9])${AUDIT_STATUS}(?![A-Za-z0-9])`);
const GRADE_WORD = new RegExp(`(?<![A-Za-z0-9-])(?:${OTHER_GRADES.join("|")})(?![A-Za-z0-9-])`);
const CLAIM_WORDS: ReadonlyMap<string, RegExp> = new Map(CLAIMS.map(claim => [claim.id, new RegExp(`(?<![A-Za-z0-9_-])${claim.id}(?![A-Za-z0-9_])`)]));
type Diagnosis = "no-undetermined" | "no-claim-id" | "other-grade";
/** What a mention's window lacks or carries: empty when the window is an echo. */
function judge(claim: Claim, window: string): Diagnosis[] {
  const found: Diagnosis[] = [];
  if (!STATUS_WORD.test(window)) found.push("no-undetermined");
  if (!(CLAIM_WORDS.get(claim.id)?.test(window) ?? false)) found.push("no-claim-id");
  if (GRADE_WORD.test(window)) found.push("other-grade");
  return found;
}
/**
 * One FINDING per refused mention of `text`, reported as `<where>:<line>`. A mention is judged once per claim, family and
 * first sentence piece, on the pieces of its tightest span; findings are deduplicated in order.
 */
function scanText(where: string, text: string): string[] {
  // Whole-text prefilter: the whole text's tokens are its blocks' tokens in order, so a block mention is one of the whole text.
  if (mentionsOf(foldTokens(text)).length === 0) return [];
  const findings: string[] = [];
  for (const block of blocksOf(text)) {
    // Block prefilter, sound for the same reason: a block's tokens are its pieces' tokens in order.
    if (mentionsOf(foldTokens(block.map(piece => piece.text).join("\n"))).length === 0) continue;
    const located = block.flatMap((piece, index) => foldTokens(piece.text).map(word => ({ word, piece: index })));
    const judged = new Set<string>();
    for (const mention of mentionsOf(located.map(entry => entry.word))) {
      const from = located[mention.first]?.piece ?? 0;
      const key = `${mention.claim.id} ${mention.family} ${from}`;
      if (judged.has(key)) continue;
      judged.add(key);
      const to = located[mention.last]?.piece ?? from;
      const found = judge(
        mention.claim,
        block
          .slice(from, to + 1)
          .map(piece => piece.text)
          .join("\n"),
      );
      const finding = `${where}:${block[from]?.line ?? 0} ${mention.claim.id} ${mention.family}: ${found.join("+")}`;
      if (found.length > 0 && !findings.includes(finding)) findings.push(finding);
    }
  }
  return findings;
}
/** The unjudged mentions of a text, `<claim id> <family>` in order: what the reading sees. */
function mentionsIn(text: string): string[] {
  return blocksOf(text).flatMap(block => {
    const words = block.flatMap(piece => foldTokens(piece.text));
    const seen: string[] = [];
    for (const mention of mentionsOf(words)) {
      const name = `${mention.claim.id} ${mention.family}`;
      if (!seen.includes(name)) seen.push(name);
    }
    return seen;
  });
}

// ---- (a): the bead export ----
const isRecord = (value: unknown): value is Readonly<Record<string, unknown>> => typeof value === "object" && value !== null && !Array.isArray(value);
/** A row filed for the program: the epic, an id under it, or a parent-child dependency on it. */
function isProgramRow(row: Readonly<Record<string, unknown>>, id: string): boolean {
  if (id === EPIC || id.startsWith(`${EPIC}.`)) return true;
  const dependencies = row.dependencies;
  return Array.isArray(dependencies) && dependencies.some(dependency => isRecord(dependency) && dependency.depends_on_id === EPIC && dependency.type === "parent-child");
}
/** The judged fields: title, description, and the full-statement paragraph of a trimmed title. */
function beadFields(row: Readonly<Record<string, unknown>>): (readonly [string, string])[] {
  const fields: (readonly [string, string])[] = [];
  if (typeof row.title === "string") fields.push(["title", row.title]);
  if (typeof row.description === "string") fields.push(["description", row.description]);
  if (typeof row.notes === "string") {
    const first = row.notes.split(/\r?\n[ \t]*\r?\n/)[0] ?? "";
    if (first.startsWith(FULL_STATEMENT)) fields.push(["fullStatement", first]);
  }
  return fields;
}
function parseJson(text: string): { readonly ok: true; readonly value: unknown } | { readonly ok: false } {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false };
  }
}
/** (a) over export lines: one FINDING per refused mention of a program row's judged fields, or per unreadable line. */
function scanBeads(lines: readonly string[]): string[] {
  const findings: string[] = [];
  for (const [index, line] of lines.entries()) {
    if (line.trim() === "") continue;
    const parsed = parseJson(line);
    if (!parsed.ok) {
      findings.push(`line ${index + 1} unreadable`);
      continue;
    }
    const row = parsed.value;
    if (!isRecord(row)) continue;
    const id = row.id;
    if (typeof id !== "string" || !isProgramRow(row, id)) continue;
    for (const [field, text] of beadFields(row)) findings.push(...scanText(`${id} ${field}`, text));
  }
  return findings;
}
const exportLines = (): string[] => readFileSync(join(ROOT, BEAD_EXPORT), "utf8").split("\n");
function exportRow(lines: readonly string[], id: string): Readonly<Record<string, unknown>> | undefined {
  for (const line of lines) {
    const parsed = line.trim() === "" ? undefined : parseJson(line);
    if (parsed?.ok === true && isRecord(parsed.value) && parsed.value.id === id) return parsed.value;
  }
  return undefined;
}
const stringField = (row: Readonly<Record<string, unknown>> | undefined, field: string): string => {
  const value = row?.[field];
  return typeof value === "string" ? value : "";
};

// ---- (c): fixture rows ----
/** Label keys (folded) whose string (or string-array) value labels its object; a boolean `synthetic` labels it too. */
const LABEL_KEYS = ["label", "provenance", "comment", "note", "origin", "description"] as const;
/** Folded words of a label that claim an observation. */
const OBSERVED_WORDS = ["measured", "observed", "captured", "recorded", "witnessed"] as const;
/** A word right before "synthetic" that negates it. */
const NEGATORS = ["not", "non", "never", "no"] as const;
/** The plan summary's other decision counts (folded): beside one of them, a positive reuse count asserts a reuse row. */
const OTHER_DECISIONS = ["invalidated", "nonreusable", "refreshrequired"] as const;
type Verdict = "synthetic" | "not-synthetic" | "observed" | "neutral";
const VERDICT_ORDER = ["not-synthetic", "synthetic", "observed"] as const;
const REFUSAL: Readonly<Record<Exclude<Verdict, "synthetic">, string>> = { neutral: "unlabelled", observed: "labelled-observed", "not-synthetic": "labelled-not-synthetic" };
const includesWord = (list: readonly string[], word: string): boolean => list.includes(word);
function textVerdict(text: string): Verdict {
  const words = foldTokens(text);
  if (words.some((word, index) => (word === "synthetic" && includesWord(NEGATORS, words[index - 1] ?? "")) || (word !== "synthetic" && word.endsWith("synthetic")))) return "not-synthetic";
  if (words.includes("synthetic")) return "synthetic";
  if (words.some(word => includesWord(OBSERVED_WORDS, word))) return "observed";
  return "neutral";
}
function labelText(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.every(item => typeof item === "string")) return value.join("\n");
  return undefined;
}
/** An object's own label verdict: a negated synthetic first, then synthetic, then an observation, else neutral. */
function objectVerdict(object: Readonly<Record<string, unknown>>): Verdict {
  const verdicts: Verdict[] = [];
  for (const [key, value] of Object.entries(object)) {
    const name = folded(key);
    if (name === "synthetic" && typeof value === "boolean") verdicts.push(value ? "synthetic" : "not-synthetic");
    else if (includesWord(LABEL_KEYS, name)) {
      const text = labelText(value);
      if (text !== undefined) verdicts.push(textVerdict(text));
    }
  }
  return VERDICT_ORDER.find(verdict => verdicts.includes(verdict)) ?? "neutral";
}
/** What an object asserts: a reuse decision (a key ending in decision, the value reuse) and/or a positive reuse count in a plan summary. */
function reuseKinds(object: Readonly<Record<string, unknown>>): string[] {
  const entries = Object.entries(object).map(([key, value]) => [folded(key), value] as const);
  const kinds: string[] = [];
  if (entries.some(([key, value]) => key.endsWith("decision") && typeof value === "string" && folded(value) === "reuse")) kinds.push("reuse-row");
  if (entries.some(([key, value]) => key === "reuse" && typeof value === "number" && value > 0) && entries.some(([key]) => includesWord(OTHER_DECISIONS, key))) kinds.push("reuse-count");
  return kinds;
}
const pointerPart = (key: string): string => key.replace(/~/g, "~0").replace(/\//g, "~1");
/** (c) over one JSON file: one FINDING per reuse assertion whose nearest deciding label is not synthetic, or one if it does not parse. */
function scanFixture(path: string, text: string): string[] {
  const parsed = parseJson(text);
  if (!parsed.ok) return [`${path} unreadable`];
  const findings: string[] = [];
  const visit = (node: unknown, pointer: string, outer: readonly Verdict[]): void => {
    if (Array.isArray(node)) {
      for (const [index, item] of node.entries()) visit(item, `${pointer}/${index}`, outer);
      return;
    }
    if (!isRecord(node)) return;
    const chain = [objectVerdict(node), ...outer];
    const decided = chain.find(verdict => verdict !== "neutral") ?? "neutral";
    if (decided !== "synthetic") for (const kind of reuseKinds(node)) findings.push(`${path} ${pointer} ${kind}: ${REFUSAL[decided]}`);
    for (const [key, child] of Object.entries(node)) visit(child, `${pointer}/${pointerPart(key)}`, chain);
  };
  visit(parsed.value, "#", []);
  return findings;
}

// ---- scope and the live walk ----
interface SourceFile {
  readonly path: string;
  readonly text: string;
}
/** (b) reads every file under these trees and every .md file at the repository root as text. */
const TEXT_TREES = ["docs", "examples", "new-feedback", "src", "qa"] as const;
/** (c) reads every .json file under these trees as JSON. */
const FIXTURE_TREES = ["test", "qa", "examples"] as const;
const inText = (path: string): boolean => TEXT_TREES.some(tree => path.startsWith(`${tree}/`)) || (!path.includes("/") && path.endsWith(".md"));
const inFixtures = (path: string): boolean => extname(path) === ".json" && FIXTURE_TREES.some(tree => path.startsWith(`${tree}/`));
/** Both readings of a file list: the text findings of a text-scope file, then the fixture findings of a fixture-scope file. */
function scanFiles(files: readonly SourceFile[]): string[] {
  return files.flatMap(file => [...(inText(file.path) ? scanText(file.path, file.text) : []), ...(inFixtures(file.path) ? scanFixture(file.path, file.text) : [])]);
}
/** Walked files per tree ("." the repository root) and extension, well under the counts at this cut; fewer means the walk lost a kind. */
const TEXT_FLOORS: Readonly<Record<string, Readonly<Record<string, number>>>> = {
  docs: { ".md": 60 },
  examples: { ".js": 5, ".md": 1 },
  "new-feedback": { ".md": 10 },
  src: { ".ts": 100 },
  qa: { ".mjs": 50, ".sh": 3, ".json": 1 },
  ".": { ".md": 5 },
};
const FIXTURE_FLOORS: Readonly<Record<string, Readonly<Record<string, number>>>> = { test: { ".json": 30 }, qa: { ".json": 1 } };
/** The bead export holds well over this many rows. */
const EXPORT_FLOOR = 500;
const SKIPPED_DIRS = new Set(["node_modules", "dist", ".git"]);
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
const treeOf = (path: string): string => (path.includes("/") ? (path.split("/")[0] ?? "") : ".");
/** The in-scope files on disk (text scope or fixture scope), and the symlinks met. */
function liveFiles(): { readonly files: SourceFile[]; readonly links: string[] } {
  const paths: string[] = [];
  const links: string[] = [];
  for (const tree of [...new Set<string>([...TEXT_TREES, ...FIXTURE_TREES])]) walk(join(ROOT, tree), paths, links);
  for (const entry of readdirSync(ROOT, { withFileTypes: true })) if (entry.isFile() && entry.name.endsWith(".md")) paths.push(join(ROOT, entry.name));
  const files = paths
    .map(repoPath)
    .filter(path => inText(path) || inFixtures(path))
    .map(path => ({ path, text: readFileSync(join(ROOT, path), "utf8") }));
  return { files, links: links.map(repoPath) };
}
function floorsRead(files: readonly SourceFile[], floors: Readonly<Record<string, Readonly<Record<string, number>>>>): string[] {
  return Object.entries(floors).flatMap(([tree, byExtension]) =>
    Object.entries(byExtension).map(([extension, floor]) => `${tree}${extension}:${files.filter(file => treeOf(file.path) === tree && extname(file.path) === extension).length >= floor}`),
  );
}
const floorsMet = (floors: Readonly<Record<string, Readonly<Record<string, number>>>>): string[] => Object.entries(floors).flatMap(([tree, byExtension]) => Object.keys(byExtension).map(extension => `${tree}${extension}:true`));

// ---- judged rows (every non-ASCII input is built with String.fromCodePoint) ----
const CYRILLIC_A = String.fromCodePoint(0x0430);
const CYRILLIC_E = String.fromCodePoint(0x0435);
const CYRILLIC_ES = String.fromCodePoint(0x0421);
const CYRILLIC_I = String.fromCodePoint(0x0406);
const ARMENIAN_O = String.fromCodePoint(0x0585);
const HANGUL_FILLER = String.fromCodePoint(0x3164);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
const COMBINING_ACUTE = String.fromCodePoint(0x0301);
const FULLWIDTH_FIVE = String.fromCodePoint(0xff46, 0xff49, 0xff56, 0xff45);
const CJK_RUN = String.fromCodePoint(0x4e00).repeat(40);
const FILLER = "filler line\n".repeat(60_000);
const [C058, C070, C082B] = CLAIMS;

type Table = "FALSIFIERS" | "CONTROLS" | "RESIDUALS";
interface Row {
  readonly table: Table;
  readonly id: string;
  readonly label: string;
  readonly files?: readonly SourceFile[];
  readonly bead?: readonly string[];
  readonly expect: readonly string[];
}
const doc = (text: string): readonly SourceFile[] => [{ path: "docs/x.md", text }];
const json = (value: unknown, path = "test/fixtures/x.json"): readonly SourceFile[] => [{ path, text: JSON.stringify(value) }];
const beadLine = (row: Readonly<Record<string, unknown>>): string => JSON.stringify(row);
const child = (id: string, fields: Readonly<Record<string, unknown>>): string => beadLine({ id, ...fields, dependencies: [{ issue_id: id, depends_on_id: EPIC, type: "parent-child" }] });
const REFUSED = "no-undetermined+no-claim-id";

const ROWS: readonly Row[] = [
  // (b), one row per scanned tree
  { table: "FALSIFIERS", id: "F01", label: "docs: the C058 proposition as audited", files: doc(`${C058?.proposition}\n`), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F02", label: "docs: the filing's title spelling", files: doc("The rf context plan reaches a 'reuse' row.\n"), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F03", label: "src: a string literal", files: [{ path: "src/x.ts", text: 'export const note = "five swarms produced the corpus";\n' }], expect: [`src/x.ts:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F04", label: "qa: script output", files: [{ path: "qa/x.mjs", text: "console.log('dependency traversal meets O(|affected edges|+|affected nodes|)');\n" }], expect: [`qa/x.mjs:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F05", label: "new-feedback: a feedback sentence", files: [{ path: "new-feedback/x.md", text: "The five-swarm population is established.\n" }], expect: [`new-feedback/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F06", label: "root markdown", files: [{ path: "README.md", text: "Traversal complexity is linear in the graph.\n" }], expect: [`README.md:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F07", label: "examples: a script comment", files: [{ path: "examples/x.js", text: "// rf reuse reachability holds here\n" }], expect: [`examples/x.js:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F08", label: "qa: a json file read as text", files: [{ path: "qa/x.json", text: '{"note": "five swarms produced the corpus"}\n' }], expect: [`qa/x.json:1 small-a-C070 five-swarms: ${REFUSED}`] },
  // (b), folded spellings
  { table: "FALSIFIERS", id: "F09", label: "camel case", files: [{ path: "src/x.ts", text: "const fiveSwarmsProducedTheCorpus = true;\n" }], expect: [`src/x.ts:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F10", label: "words joined in lower case", files: doc("fiveswarms produced the corpus\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F11", label: "inflected forms", files: doc("The planner reached a reused row.\n"), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F12", label: "a look-alike letter", files: doc(`The rf context plan re${CYRILLIC_A}ches a reuse row.\n`), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F13", label: "an inserted invisible", files: doc(`five swa${ZERO_WIDTH_SPACE}rms produced the corpus\n`), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F14", label: "fullwidth compatibility forms", files: doc(`${FULLWIDTH_FIVE} swarms produced the corpus\n`), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F15", label: "a combining mark", files: doc(`The rf plan reaches a reu${COMBINING_ACUTE}se row.\n`), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F16", label: "a numeric reference without its semicolon", files: doc("five&#32swarms produced the corpus\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F17", label: "a percent escape", files: doc("five%20swarms produced the corpus\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F18", label: "a JS escape", files: [{ path: "src/x.ts", text: 'const s = "five\\u0020swarms";\n' }], expect: [`src/x.ts:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F19", label: "an octal escape", files: [{ path: "src/x.ts", text: 'const s = "five\\040swarms";\n' }], expect: [`src/x.ts:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F20", label: "emphasis inside a word", files: doc("fi**ve** swarms produced the corpus\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F21", label: "a named reference", files: doc("five&nbsp;swarms produced the corpus\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F22", label: "an html comment", files: doc("<!-- five swarms produced the corpus -->\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F23", label: "a line break inside one block", files: doc("intro\n\nfive\nswarms produced the corpus\n"), expect: [`docs/x.md:3 small-a-C070 five-swarms: ${REFUSED}`] },
  // (b), the echo
  { table: "FALSIFIERS", id: "F24", label: "a negation is still a mention", files: doc("Pi never assumes a 'reuse' plan row is reachable.\n"), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F25", label: "the verdict without the claim id", files: doc("Five swarms produced the corpus: UNDETERMINED.\n"), expect: ["docs/x.md:1 small-a-C070 five-swarms: no-claim-id"] },
  { table: "FALSIFIERS", id: "F26", label: "the claim id without the verdict", files: doc("small-a-C070: five swarms produced the corpus.\n"), expect: ["docs/x.md:1 small-a-C070 claim-id: no-undetermined", "docs/x.md:1 small-a-C070 five-swarms: no-undetermined"] },
  { table: "FALSIFIERS", id: "F27", label: "another claim's id", files: doc("Five swarms produced the corpus (small-a-C058 is UNDETERMINED).\n"), expect: ["docs/x.md:1 small-a-C070 five-swarms: no-claim-id"] },
  { table: "FALSIFIERS", id: "F28", label: "a grade beside the echo", files: doc("small-a-C070 (five swarms produced the corpus) is UNDETERMINED and ESTABLISHED by Pi.\n"), expect: ["docs/x.md:1 small-a-C070 claim-id: other-grade", "docs/x.md:1 small-a-C070 five-swarms: other-grade"] },
  { table: "FALSIFIERS", id: "F29", label: "a look-alike verdict is never folded", files: doc(`small-a-C070 (five swarms) is UNDETERM${CYRILLIC_I}NED.\n`), expect: ["docs/x.md:1 small-a-C070 claim-id: no-undetermined", "docs/x.md:1 small-a-C070 five-swarms: no-undetermined"] },
  { table: "FALSIFIERS", id: "F30", label: "a look-alike claim id", files: doc(`small-a-${CYRILLIC_ES}070 (five swarms) is UNDETERMINED.\n`), expect: ["docs/x.md:1 small-a-C070 claim-id: no-claim-id", "docs/x.md:1 small-a-C070 five-swarms: no-claim-id"] },
  { table: "FALSIFIERS", id: "F31", label: "a lower-case verdict", files: doc("small-a-C058 (the rf plan reaches a reuse row) is undetermined.\n"), expect: ["docs/x.md:1 small-a-C058 claim-id: no-undetermined", "docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined"] },
  { table: "FALSIFIERS", id: "F32", label: "the verdict inside a longer word", files: doc("small-a-C070 (five swarms) is UNDETERMINEDNESS.\n"), expect: ["docs/x.md:1 small-a-C070 claim-id: no-undetermined", "docs/x.md:1 small-a-C070 five-swarms: no-undetermined"] },
  { table: "FALSIFIERS", id: "F33", label: "the echo in the next sentence", files: doc("Five swarms produced the corpus. small-a-C070 is UNDETERMINED.\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F34", label: "the echo on another line of the block", files: doc("small-a-C070 is UNDETERMINED.\nFive swarms produced the corpus.\n"), expect: [`docs/x.md:2 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F35", label: "the echo in another table row", files: doc("| claim | status |\n| small-a-C070 | UNDETERMINED |\n| five swarms | produced the corpus |\n"), expect: [`docs/x.md:3 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F36", label: "the echo tokens on the next line", files: doc("small-a-C070 (five swarms produced the corpus) is\nUNDETERMINED.\n"), expect: ["docs/x.md:1 small-a-C070 claim-id: no-undetermined", "docs/x.md:1 small-a-C070 five-swarms: no-undetermined"] },
  { table: "FALSIFIERS", id: "F37", label: "a mention deep in a large file", files: doc(`${FILLER}\nfive swarms produced the corpus\n`), expect: [`docs/x.md:60002 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F38", label: "a second mention of one claim in a block", files: doc("small-a-C070 (five swarms) is UNDETERMINED.\nAnd five swarms produced the corpus.\n"), expect: [`docs/x.md:2 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F39", label: "two claims in one sentence, one echoed", files: doc("The rf plan reaches a reuse row (small-a-C058 is UNDETERMINED) and five swarms produced the corpus.\n"), expect: ["docs/x.md:1 small-a-C070 five-swarms: no-claim-id"] },
  { table: "FALSIFIERS", id: "F40", label: "the program README's population sentence", files: doc("No independent five-swarm population census has yet been established from feedback corpus.\n"), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F41", label: "the program README's reachability sentence", files: doc("Reachability of plan 'reuse' is not established.\n"), expect: [`docs/x.md:1 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F42", label: "the C070 proposition as audited", files: doc(`${C070?.proposition}\n`), expect: [`docs/x.md:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F43", label: "the C082b proposition as audited", files: doc(`${C082B?.proposition}\n`), expect: [`docs/x.md:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F44", label: "an O of affected alone", files: [{ path: "src/x.ts", text: "// propagation is O(affected)\n" }], expect: [`src/x.ts:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F45", label: "linear in the affected edges", files: doc("Recompute is linear in the affected edges and nodes.\n"), expect: [`docs/x.md:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F46", label: "a traversal in O of its edges", files: doc("The traversal is O(edges + nodes).\n"), expect: [`docs/x.md:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F47", label: "a claim id alone", files: doc("small-a-C082b holds.\n"), expect: ["docs/x.md:1 small-a-C082b claim-id: no-undetermined"] },
  { table: "FALSIFIERS", id: "F48", label: "a snake-case claim id", files: doc("small_a_C082b is open\n"), expect: [`docs/x.md:1 small-a-C082b claim-id: ${REFUSED}`] },
  // (a), the bead export
  { table: "FALSIFIERS", id: "F49", label: "a program child's title", bead: [child("wb-pfxo.98", { title: "Five swarms produced the corpus." })], expect: [`wb-pfxo.98 title:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F50", label: "the epic's description", bead: [beadLine({ id: EPIC, title: "epic", description: "Pi reads it.\nThe rf context plan reaches a 'reuse' row.\n" })], expect: [`${EPIC} description:2 small-a-C058 reuse-reachability: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F51", label: "the full-statement paragraph", bead: [child("wb-pfxo.97", { title: "R13", notes: `${FULL_STATEMENT} dependency traversal meets O(|affected edges|+|affected nodes|)\n\nlater note` })], expect: [`wb-pfxo.97 fullStatement:1 small-a-C082b traversal-bound: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F52", label: "a verdict for another claim", bead: [child("wb-pfxo.96", { title: "small-a-C058 is UNDETERMINED, but five swarms produced the corpus" })], expect: ["wb-pfxo.96 title:1 small-a-C070 five-swarms: no-claim-id"] },
  { table: "FALSIFIERS", id: "F53", label: "the program link among other dependencies", bead: [beadLine({ id: "wb-zz.95", title: "Five swarms produced the corpus.", dependencies: [{ issue_id: "wb-zz.95", depends_on_id: "wb-zz", type: "blocks" }, { issue_id: "wb-zz.95", depends_on_id: EPIC, type: "parent-child" }] })], expect: [`wb-zz.95 title:1 small-a-C070 five-swarms: ${REFUSED}`] },
  { table: "FALSIFIERS", id: "F54", label: "an unreadable export line", bead: [child("wb-pfxo.94", { title: "x" }), '{"id":"wb-pfxo.93","title":'], expect: ["line 2 unreadable"] },
  {
    table: "FALSIFIERS",
    id: "F55",
    label: "every judged field of one row",
    bead: [child("wb-pfxo.92", { title: "five swarms produced the corpus", description: "traversal complexity is linear", notes: `${FULL_STATEMENT} the rf plan reaches a reuse row` })],
    expect: [`wb-pfxo.92 title:1 small-a-C070 five-swarms: ${REFUSED}`, `wb-pfxo.92 description:1 small-a-C082b traversal-bound: ${REFUSED}`, `wb-pfxo.92 fullStatement:1 small-a-C058 reuse-reachability: ${REFUSED}`],
  },
  // (c), fixture rows
  { table: "FALSIFIERS", id: "F56", label: "an unlabelled reuse row", files: json({ rows: [{ instance: "a", decision: "reuse" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F57", label: "an observed provenance", files: json({ provenance: "MEASURED from the installed rf", plan: { rows: [{ decision: "reuse" }] } }), expect: ["test/fixtures/x.json #/plan/rows/0 reuse-row: labelled-observed"] },
  { table: "FALSIFIERS", id: "F58", label: "a nearer observed label over a farther synthetic one", files: json({ label: "synthetic roster", envelope: { comment: "captured from rf context plan", rows: [{ decision: "reuse" }] } }), expect: ["test/fixtures/x.json #/envelope/rows/0 reuse-row: labelled-observed"] },
  { table: "FALSIFIERS", id: "F59", label: "synthetic false", files: json({ rows: [{ decision: "reuse", synthetic: false }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic"] },
  { table: "FALSIFIERS", id: "F60", label: "a negated label", files: json({ rows: [{ decision: "reuse", label: "not synthetic: copied from rf" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic"] },
  { table: "FALSIFIERS", id: "F61", label: "a non-synthetic label", files: json({ rows: [{ decision: "reuse", note: "non-synthetic row" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic"] },
  { table: "FALSIFIERS", id: "F62", label: "a synonym is not the label", files: json({ rows: [{ decision: "reuse", label: "constructed by hand" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: unlabelled"] },
  {
    table: "FALSIFIERS",
    id: "F63",
    label: "decision key and value spellings",
    files: json({ a: { planDecision: "reuse" }, b: { plan_decision: "REUSE" }, c: { Decision: " re-use " } }),
    expect: ["test/fixtures/x.json #/a reuse-row: unlabelled", "test/fixtures/x.json #/b reuse-row: unlabelled", "test/fixtures/x.json #/c reuse-row: unlabelled"],
  },
  { table: "FALSIFIERS", id: "F64", label: "a plan-summary reuse count", files: json({ summary: { rows: 1, reuse: 1, refresh_required: 0 } }), expect: ["test/fixtures/x.json #/summary reuse-count: unlabelled"] },
  { table: "FALSIFIERS", id: "F65", label: "an unreadable fixture", files: [{ path: "test/fixtures/x.json", text: '{"rows": [' }], expect: ["test/fixtures/x.json unreadable"] },
  { table: "FALSIFIERS", id: "F66", label: "the root object is the row", files: json({ decision: "reuse" }), expect: ["test/fixtures/x.json # reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F67", label: "a qa json fixture", files: json({ rows: [{ decision: "reuse" }] }, "qa/x.json"), expect: ["qa/x.json #/rows/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F68", label: "an examples json fixture", files: json({ rows: [{ decision: "reuse" }] }, "examples/x.json"), expect: ["examples/x.json #/rows/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F69", label: "pointer escaping", files: json({ "a/b~c": { decision: "reuse" } }), expect: ["test/fixtures/x.json #/a~1b~0c reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F70", label: "nested arrays", files: json([[{ decision: "reuse" }]]), expect: ["test/fixtures/x.json #/0/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F71", label: "a sibling's label does not cover", files: json({ rows: [{ decision: "reuse" }, { label: "synthetic" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F72", label: "a label array", files: json({ comment: ["MEASURED", "from rf"], rows: [{ decision: "reuse" }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: labelled-observed"] },
  { table: "FALSIFIERS", id: "F73", label: "a look-alike decision value", files: json({ rows: [{ decision: `r${CYRILLIC_E}use` }] }), expect: ["test/fixtures/x.json #/rows/0 reuse-row: unlabelled"] },
  { table: "FALSIFIERS", id: "F74", label: "a row and a count in one object", files: json({ decision: "reuse", reuse: 2, invalidated: 0 }), expect: ["test/fixtures/x.json # reuse-row: unlabelled", "test/fixtures/x.json # reuse-count: unlabelled"] },
  // accepted
  { table: "CONTROLS", id: "N01", label: "the echo form", files: doc("small-a-C070 (five swarms produced the October 17-18 corpus) is UNDETERMINED.\n"), expect: [] },
  {
    table: "CONTROLS",
    id: "N02",
    label: "the filing's statement form",
    files: doc(
      "No Pi doc shall treat the program's UNDETERMINED claims as premises: that rf context plan reaches a 'reuse' row (small-a-C058), that five swarms produced the October 17-18 corpus (small-a-C070), or that dependency traversal meets O(|affected edges|+|affected nodes|) (small-a-C082b).\n",
    ),
    expect: [],
  },
  { table: "CONTROLS", id: "N03", label: "an echo on the lines a wrapped mention spans", files: doc("small-a-C070 is UNDETERMINED: five\nswarms produced the corpus.\n"), expect: [] },
  { table: "CONTROLS", id: "N04", label: "reuse without plan context (docs/workflows.md)", files: doc("Reach for it to reuse something already saved, not to structure one script.\n"), expect: [] },
  { table: "CONTROLS", id: "N05", label: "an O(1) read with no traversal (src/workbench/observation.ts)", files: [{ path: "src/x.ts", text: "/** Copied ancestor aggregate of one observed node: an O(1) read, no traversal. */\n" }], expect: [] },
  { table: "CONTROLS", id: "N06", label: "a section number before swarm (wb-973.4)", files: doc("See decisions.md section 5 swarm-id workspace.\n"), expect: [] },
  { table: "CONTROLS", id: "N07", label: "a reader line naming bounds with no complexity claim (docs/workbench/09)", files: doc("- HX: query coverage/bounds/query basis, and optional graph traversal of linked native refs.\n"), expect: [] },
  { table: "CONTROLS", id: "N08", label: "a traversal bound error (src/workbench/hosts/local-detached.ts)", files: [{ path: "src/x.ts", text: 'throw new Error("Local provider directory tree exceeds traversal bound.");\n' }], expect: [] },
  { table: "CONTROLS", id: "N09", label: "longer and shorter claim ids", files: doc("small-a-C0705 and small-a-C082 hold.\n"), expect: [] },
  { table: "CONTROLS", id: "N10", label: "a synthetic-labelled reuse row", files: json({ rows: [{ decision: "reuse", label: "synthetic: alpha's row set to reuse on a copy of the measured plan" }] }), expect: [] },
  { table: "CONTROLS", id: "N11", label: "synthetic true", files: json({ rows: [{ decision: "reuse", synthetic: true }] }), expect: [] },
  { table: "CONTROLS", id: "N12", label: "an outer synthetic label over neutral ones", files: json({ label: "synthetic plan envelope", rows: [{ decision: "reuse", label: "row alpha" }] }), expect: [] },
  { table: "CONTROLS", id: "N13", label: "vocabulary lists and zero counts", files: json({ decisions: ["reuse", "invalidated", "non_reusable", "refresh_required"], summary: { rows: 1, reuse: 0, refresh_required: 1 } }), expect: [] },
  { table: "CONTROLS", id: "N14", label: "the other decision words", files: json({ rows: [{ decision: "refresh_required" }, { decision: "non_reusable" }, { decision: "invalidated" }] }), expect: [] },
  { table: "CONTROLS", id: "N15", label: "a program row carrying the echo", bead: [child("wb-pfxo.91", { title: "small-a-C070 (five swarms produced the corpus) is UNDETERMINED" })], expect: [] },
  { table: "CONTROLS", id: "N16", label: "a run of wildcards is no word", files: doc(`${CJK_RUN}\n`), expect: [] },
  { table: "CONTROLS", id: "N17", label: "every claim id echoed in one sentence", files: doc("small-a-C058, small-a-C070 and small-a-C082b are UNDETERMINED.\n"), expect: [] },
  { table: "CONTROLS", id: "N18", label: "a nearer synthetic flag under an observed provenance", files: json({ provenance: "MEASURED from rf", rows: [{ decision: "reuse", synthetic: true }] }), expect: [] },
  // named residuals: quiet rows
  { table: "RESIDUALS", id: "R1", label: "a paraphrase", files: doc("The planner can serve a component straight from its cache.\n"), expect: [] },
  { table: "RESIDUALS", id: "R2", label: "a verb outside the shape", files: doc("The rf context plan can achieve a reuse row.\n"), expect: [] },
  { table: "RESIDUALS", id: "R3", label: "words farther apart than the window", files: doc("Five of the many independent agent teams we ran last month were swarms.\n"), expect: [] },
  { table: "RESIDUALS", id: "R4", label: "an ASCII look-alike", files: doc("f1ve swarms produced the corpus\n"), expect: [] },
  { table: "RESIDUALS", id: "R5", label: "assembled at runtime", files: [{ path: "src/x.ts", text: 'const s = ["fi", "ve swarms"].join("");\n' }], expect: [] },
  { table: "RESIDUALS", id: "R6", label: "outside the scanned trees", files: [{ path: ".github/x.md", text: "five swarms produced the corpus\n" }, { path: "media/x.md", text: "five swarms produced the corpus\n" }], expect: [] },
  { table: "RESIDUALS", id: "R7", label: "text under test", files: [{ path: "test/x.test.ts", text: "// five swarms produced the corpus\n" }], expect: [] },
  { table: "RESIDUALS", id: "R8", label: "a bead row outside the program", bead: [beadLine({ id: "wb-zz.1", title: "Five swarms produced the corpus." })], expect: [] },
  { table: "RESIDUALS", id: "R9", label: "notes beyond the full-statement paragraph", bead: [child("wb-pfxo.90", { title: "R13", notes: `${FULL_STATEMENT} R13 statement.\n\nFive swarms produced the corpus.` })], expect: [] },
  { table: "RESIDUALS", id: "R10", label: "echo tokens in the mention's own sentence", files: doc("Five swarms produced the corpus, unlike small-a-C070, which stays UNDETERMINED.\n"), expect: [] },
  { table: "RESIDUALS", id: "R11", label: "status prose beside an echo", files: doc("small-a-C070 (five swarms) is UNDETERMINED, but Pi treats it as settled.\n"), expect: [] },
  { table: "RESIDUALS", id: "R12", label: "rows built in code", files: [{ path: "test/x.test.ts", text: 'const row = { decision: "reuse" };\n' }, { path: "src/x.ts", text: 'row.decision = "reuse";\n' }], expect: [] },
  { table: "RESIDUALS", id: "R13", label: "decision values other than reuse", files: json({ rows: [{ decision: "reused" }, { decision: "reusing" }] }), expect: [] },
  { table: "RESIDUALS", id: "R14", label: "a reuse decision under another key", files: json({ rows: [{ outcome: "reuse" }, { plan: "reuse" }] }), expect: [] },
  { table: "RESIDUALS", id: "R15", label: "fixture formats other than json", files: [{ path: "test/fixtures/x.jsonl", text: '{"decision":"reuse"}\n' }], expect: [] },
  { table: "RESIDUALS", id: "R16", label: "bare local claim ids", files: doc("C070 and C058 hold.\n"), expect: [] },
  { table: "RESIDUALS", id: "R17", label: "json inside a string value", files: json({ stdout: '{"decision":"reuse"}' }), expect: [] },
  { table: "RESIDUALS", id: "R18", label: "a named reference outside the decoded set", files: doc("f&igrave;ve swarms produced the corpus\n"), expect: [] },
  { table: "RESIDUALS", id: "R19", label: "split across a blank line", files: doc("five\n\nswarms produced the corpus\n"), expect: [] },
  { table: "RESIDUALS", id: "R20", label: "a look-alike outside the confusables table", files: doc(`propagation is ${ARMENIAN_O}(affected)\n`), expect: [] },
  { table: "RESIDUALS", id: "R21", label: "a blank-looking letter outside Cf", files: doc(`five swa${HANGUL_FILLER}rms produced the corpus\n`), expect: [] },
  { table: "RESIDUALS", id: "R22", label: "markup inside a word", files: doc("fi<b>ve</b> swarms produced the corpus\n"), expect: [] },
  { table: "RESIDUALS", id: "R23", label: "a reuse count outside the plan-summary shape", files: json({ reuse: 3 }), expect: [] },
];
const RESIDUAL_FAMILIES: Readonly<Record<string, string>> = {
  R1: "paraphrase outside the shapes",
  R2: "a verb or noun outside a shape's vocabulary",
  R3: "shape words farther apart than the window",
  R4: "ASCII look-alikes (1 for i, 0 for o)",
  R5: "phrase assembled at runtime",
  R6: "files outside the scanned trees",
  R7: "text under test/ (fixtures are read as JSON only)",
  R8: "bead rows outside the program",
  R9: "bead notes beyond the full-statement paragraph",
  R10: "echo tokens in the mention's own sentence, whatever they qualify",
  R11: "status prose beside an echo",
  R12: "reuse rows built in code",
  R13: "decision values other than reuse",
  R14: "a reuse decision under a key not ending in decision",
  R15: "fixture formats other than .json",
  R16: "bare local claim ids",
  R17: "JSON inside a string value",
  R18: "named references outside the decoded set",
  R19: "phrase split across a blank line",
  R20: "look-alike letters outside the confusables table",
  R21: "blank-looking letters outside Unicode Cf",
  R22: "markup tags inside a word",
  R23: "a reuse count outside the plan-summary shape",
};

function readRow(row: Row): string[] {
  if (row.bead !== undefined) return scanBeads(row.bead);
  return scanFiles(row.files ?? []);
}
function inputDigest(row: Row): string {
  return createHash("sha256")
    .update(JSON.stringify({ files: row.files ?? null, bead: row.bead ?? null }))
    .digest("hex");
}
const TABLE_WORD: Readonly<Record<Table, string>> = { FALSIFIERS: "falsifier", CONTROLS: "control", RESIDUALS: "residual" };
const testName = (row: Row): string => `${TABLE_WORD[row.table]} ${row.id} ${row.label}`;
const shapeText = (shape: Shape): string => `${shape.groups.map(group => group.join("/")).join(" ")} @${shape.window}`;

interface RosterRow {
  readonly table: Table;
  readonly id: string;
  readonly test: string;
  readonly findings: readonly string[];
  readonly input: string;
}
interface RosterClaim {
  readonly id: string;
  readonly family: string;
  readonly line: number;
  readonly proposition: string;
  readonly shapes: readonly string[];
}
interface Roster {
  readonly rfCommit: string;
  readonly citationBlobs: Readonly<Record<string, string>>;
  readonly claims: readonly RosterClaim[];
  readonly rows: readonly RosterRow[];
  readonly residuals: Readonly<Record<string, string>>;
}

/** Frozen-shape literals (standing rule 16), read from the tables above at this cut. */
const ROWS_LITERAL: readonly string[] = [
  "FALSIFIERS:F01:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:346bc5ba",
  "FALSIFIERS:F02:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:c5a1a092",
  "FALSIFIERS:F03:src/x.ts:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:c23ba4d1",
  "FALSIFIERS:F04:qa/x.mjs:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:d0845665",
  "FALSIFIERS:F05:new-feedback/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:4dc570c9",
  "FALSIFIERS:F06:README.md:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:1211eda7",
  "FALSIFIERS:F07:examples/x.js:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:1d9080c0",
  "FALSIFIERS:F08:qa/x.json:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:76014b6b",
  "FALSIFIERS:F09:src/x.ts:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:6cabb6c4",
  "FALSIFIERS:F10:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:dfbb7585",
  "FALSIFIERS:F11:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:b223c3bf",
  "FALSIFIERS:F12:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:5e075178",
  "FALSIFIERS:F13:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:c44b4c89",
  "FALSIFIERS:F14:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:07d8af37",
  "FALSIFIERS:F15:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:cf244cd7",
  "FALSIFIERS:F16:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:560ffeb0",
  "FALSIFIERS:F17:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:3f1ed80b",
  "FALSIFIERS:F18:src/x.ts:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:ba6a2d75",
  "FALSIFIERS:F19:src/x.ts:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:f669c732",
  "FALSIFIERS:F20:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:557fcb9d",
  "FALSIFIERS:F21:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:cf794f0c",
  "FALSIFIERS:F22:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:63e9185f",
  "FALSIFIERS:F23:docs/x.md:3 small-a-C070 five-swarms: no-undetermined+no-claim-id:6d71d9da",
  "FALSIFIERS:F24:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:0928b69b",
  "FALSIFIERS:F25:docs/x.md:1 small-a-C070 five-swarms: no-claim-id:49e495cb",
  "FALSIFIERS:F26:docs/x.md:1 small-a-C070 claim-id: no-undetermined|docs/x.md:1 small-a-C070 five-swarms: no-undetermined:4b4ee2d0",
  "FALSIFIERS:F27:docs/x.md:1 small-a-C070 five-swarms: no-claim-id:d1a76a43",
  "FALSIFIERS:F28:docs/x.md:1 small-a-C070 claim-id: other-grade|docs/x.md:1 small-a-C070 five-swarms: other-grade:ba10cb31",
  "FALSIFIERS:F29:docs/x.md:1 small-a-C070 claim-id: no-undetermined|docs/x.md:1 small-a-C070 five-swarms: no-undetermined:a822202d",
  "FALSIFIERS:F30:docs/x.md:1 small-a-C070 claim-id: no-claim-id|docs/x.md:1 small-a-C070 five-swarms: no-claim-id:c84e6319",
  "FALSIFIERS:F31:docs/x.md:1 small-a-C058 claim-id: no-undetermined|docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined:4e15b4f3",
  "FALSIFIERS:F32:docs/x.md:1 small-a-C070 claim-id: no-undetermined|docs/x.md:1 small-a-C070 five-swarms: no-undetermined:9606ffd7",
  "FALSIFIERS:F33:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:1f9f1628",
  "FALSIFIERS:F34:docs/x.md:2 small-a-C070 five-swarms: no-undetermined+no-claim-id:2f2a8e8f",
  "FALSIFIERS:F35:docs/x.md:3 small-a-C070 five-swarms: no-undetermined+no-claim-id:b9614d1b",
  "FALSIFIERS:F36:docs/x.md:1 small-a-C070 claim-id: no-undetermined|docs/x.md:1 small-a-C070 five-swarms: no-undetermined:466b060f",
  "FALSIFIERS:F37:docs/x.md:60002 small-a-C070 five-swarms: no-undetermined+no-claim-id:1cbca5f7",
  "FALSIFIERS:F38:docs/x.md:2 small-a-C070 five-swarms: no-undetermined+no-claim-id:cd1fdd1c",
  "FALSIFIERS:F39:docs/x.md:1 small-a-C070 five-swarms: no-claim-id:6f1cd040",
  "FALSIFIERS:F40:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:cc3e72a9",
  "FALSIFIERS:F41:docs/x.md:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:ab3be34a",
  "FALSIFIERS:F42:docs/x.md:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:70866380",
  "FALSIFIERS:F43:docs/x.md:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:c5510854",
  "FALSIFIERS:F44:src/x.ts:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:269163ae",
  "FALSIFIERS:F45:docs/x.md:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:7d14f442",
  "FALSIFIERS:F46:docs/x.md:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:df4116bf",
  "FALSIFIERS:F47:docs/x.md:1 small-a-C082b claim-id: no-undetermined:293f6a4b",
  "FALSIFIERS:F48:docs/x.md:1 small-a-C082b claim-id: no-undetermined+no-claim-id:32500b2c",
  "FALSIFIERS:F49:wb-pfxo.98 title:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:18d65c4b",
  "FALSIFIERS:F50:wb-pfxo description:2 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:b2891181",
  "FALSIFIERS:F51:wb-pfxo.97 fullStatement:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id:5f8f1662",
  "FALSIFIERS:F52:wb-pfxo.96 title:1 small-a-C070 five-swarms: no-claim-id:98c5081c",
  "FALSIFIERS:F53:wb-zz.95 title:1 small-a-C070 five-swarms: no-undetermined+no-claim-id:bb443c2c",
  "FALSIFIERS:F54:line 2 unreadable:5c1d2304",
  "FALSIFIERS:F55:wb-pfxo.92 title:1 small-a-C070 five-swarms: no-undetermined+no-claim-id|wb-pfxo.92 description:1 small-a-C082b traversal-bound: no-undetermined+no-claim-id|wb-pfxo.92 fullStatement:1 small-a-C058 reuse-reachability: no-undetermined+no-claim-id:a6b97bbe",
  "FALSIFIERS:F56:test/fixtures/x.json #/rows/0 reuse-row: unlabelled:a7de1848",
  "FALSIFIERS:F57:test/fixtures/x.json #/plan/rows/0 reuse-row: labelled-observed:189602b2",
  "FALSIFIERS:F58:test/fixtures/x.json #/envelope/rows/0 reuse-row: labelled-observed:0a3896f9",
  "FALSIFIERS:F59:test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic:3e369115",
  "FALSIFIERS:F60:test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic:ea2acfd6",
  "FALSIFIERS:F61:test/fixtures/x.json #/rows/0 reuse-row: labelled-not-synthetic:2a069b20",
  "FALSIFIERS:F62:test/fixtures/x.json #/rows/0 reuse-row: unlabelled:6ab99ab8",
  "FALSIFIERS:F63:test/fixtures/x.json #/a reuse-row: unlabelled|test/fixtures/x.json #/b reuse-row: unlabelled|test/fixtures/x.json #/c reuse-row: unlabelled:a0388c4e",
  "FALSIFIERS:F64:test/fixtures/x.json #/summary reuse-count: unlabelled:363835df",
  "FALSIFIERS:F65:test/fixtures/x.json unreadable:93126d93",
  "FALSIFIERS:F66:test/fixtures/x.json # reuse-row: unlabelled:022b36ba",
  "FALSIFIERS:F67:qa/x.json #/rows/0 reuse-row: unlabelled:8cf5542b",
  "FALSIFIERS:F68:examples/x.json #/rows/0 reuse-row: unlabelled:53d40044",
  "FALSIFIERS:F69:test/fixtures/x.json #/a~1b~0c reuse-row: unlabelled:beb4a586",
  "FALSIFIERS:F70:test/fixtures/x.json #/0/0 reuse-row: unlabelled:60c23919",
  "FALSIFIERS:F71:test/fixtures/x.json #/rows/0 reuse-row: unlabelled:8bf8caa0",
  "FALSIFIERS:F72:test/fixtures/x.json #/rows/0 reuse-row: labelled-observed:bf3a73b0",
  "FALSIFIERS:F73:test/fixtures/x.json #/rows/0 reuse-row: unlabelled:77906fcc",
  "FALSIFIERS:F74:test/fixtures/x.json # reuse-row: unlabelled|test/fixtures/x.json # reuse-count: unlabelled:4d7707b4",
  "CONTROLS:N01::986f32d9",
  "CONTROLS:N02::23555f35",
  "CONTROLS:N03::0e57baad",
  "CONTROLS:N04::d3f269d6",
  "CONTROLS:N05::af5880ba",
  "CONTROLS:N06::1372ba4d",
  "CONTROLS:N07::85f00454",
  "CONTROLS:N08::89b6c22d",
  "CONTROLS:N09::f436673a",
  "CONTROLS:N10::bcdd8140",
  "CONTROLS:N11::7f3e0c8e",
  "CONTROLS:N12::28e26119",
  "CONTROLS:N13::145a5206",
  "CONTROLS:N14::eb9a0416",
  "CONTROLS:N15::deb660f6",
  "CONTROLS:N16::6c0a7f53",
  "CONTROLS:N17::bc60c344",
  "CONTROLS:N18::f70e5835",
  "RESIDUALS:R1::7a74feab",
  "RESIDUALS:R2::7c0a0e99",
  "RESIDUALS:R3::be78ac18",
  "RESIDUALS:R4::9fcfeb10",
  "RESIDUALS:R5::fab9fc36",
  "RESIDUALS:R6::49907789",
  "RESIDUALS:R7::0e2ea4be",
  "RESIDUALS:R8::f99d016b",
  "RESIDUALS:R9::89634978",
  "RESIDUALS:R10::fa0175f7",
  "RESIDUALS:R11::d86136c7",
  "RESIDUALS:R12::dca5724c",
  "RESIDUALS:R13::0f8d2e68",
  "RESIDUALS:R14::404305c8",
  "RESIDUALS:R15::e9667e92",
  "RESIDUALS:R16::2d465e95",
  "RESIDUALS:R17::3defd6c9",
  "RESIDUALS:R18::8e591520",
  "RESIDUALS:R19::a0d67ca8",
  "RESIDUALS:R20::660fb97d",
  "RESIDUALS:R21::d7538c8b",
  "RESIDUALS:R22::3e0e9c9d",
  "RESIDUALS:R23::5fb87db1",
];
const CLAIMS_LITERAL: readonly string[] = [
  "small-a-C058:reuse-reachability:49:reus reach/yield/attain plan/=rf/rfcli/reactivefiber/row/decision/graph @6",
  "small-a-C070:five-swarms:50:five/=5 swarms @3 ; five/=5 swarm population/corpus/produc/census @6",
  "small-a-C082b:traversal-bound:51:travers complexit/linear/asymptot/proportional @6 ; =o affect @2 ; travers =o depend/=rf/affect/fiber/graph/edge/node @4 ; affect edge/node complexit/linear/asymptot/proportional @6",
];
const RESIDUALS_LITERAL: readonly string[] = [
  "R1:paraphrase outside the shapes",
  "R2:a verb or noun outside a shape's vocabulary",
  "R3:shape words farther apart than the window",
  "R4:ASCII look-alikes (1 for i, 0 for o)",
  "R5:phrase assembled at runtime",
  "R6:files outside the scanned trees",
  "R7:text under test/ (fixtures are read as JSON only)",
  "R8:bead rows outside the program",
  "R9:bead notes beyond the full-statement paragraph",
  "R10:echo tokens in the mention's own sentence, whatever they qualify",
  "R11:status prose beside an echo",
  "R12:reuse rows built in code",
  "R13:decision values other than reuse",
  "R14:a reuse decision under a key not ending in decision",
  "R15:fixture formats other than .json",
  "R16:bare local claim ids",
  "R17:JSON inside a string value",
  "R18:named references outside the decoded set",
  "R19:phrase split across a blank line",
  "R20:look-alike letters outside the confusables table",
  "R21:blank-looking letters outside Unicode Cf",
  "R22:markup tags inside a word",
  "R23:a reuse count outside the plan-summary shape",
];
const CONFUSABLES_LITERAL: readonly string[] = ["430>a", "435>e", "43e>o", "440>p", "441>c", "443>y", "445>x", "455>s", "456>i", "458>j", "4bb>h", "501>d", "405>S", "406>I", "408>J", "410>A", "412>B", "415>E", "41a>K", "41c>M", "41d>H", "41e>O", "420>P", "421>C", "422>T", "423>Y", "425>X", "3b1>a", "3b9>i", "3ba>k", "3bd>v", "3bf>o", "3c1>p", "3c4>t", "3c5>u", "3c7>x", "391>A", "392>B", "395>E", "396>Z", "397>H", "399>I", "39a>K", "39c>M", "39d>N", "39f>O", "3a1>P", "3a4>T", "3a5>Y", "3a7>X", "131>i", "237>j"];

/** The planted (b) sentence and (c) row the live non-vacuity checks add to real files, in memory only. */
const PLANTED_SENTENCE = "The rf context plan reaches a 'reuse' row.";
const PLANTED_DOC = "docs/workbench/07-native-integrations.md";
const PLANTED_FIXTURE = "test/fixtures/rf-result-keys.json";

describe("rf undetermined premise census (wb-pfxo.11, RF-COMPOSITIONAL-ASSEMBLY-R12)", () => {
  it("live trees (b): every mention in the scanned trees is an echo", { timeout: 60_000 }, () => {
    const { files, links } = liveFiles();
    expect(links, "symlinks under the scanned trees (refused, never followed)").toEqual([]);
    const text = files.filter(file => inText(file.path));
    expect(floorsRead(text, TEXT_FLOORS), "walked text files per tree and extension, at or above their floors").toEqual(floorsMet(TEXT_FLOORS));
    expect(text.flatMap(file => scanText(file.path, file.text))).toEqual([]);
    // Non-vacuity: the same reading over a real docs file with one planted sentence finds exactly that sentence.
    const real = text.find(file => file.path === PLANTED_DOC);
    expect(real, PLANTED_DOC).toBeDefined();
    const body = (real?.text ?? "").replace(/\n*$/, "");
    expect(scanFiles([{ path: PLANTED_DOC, text: `${body}\n\n${PLANTED_SENTENCE}\n` }])).toEqual([`${PLANTED_DOC}:${body.split("\n").length + 2} small-a-C058 reuse-reachability: ${REFUSED}`]);
  });

  it("live fixtures (c): every JSON fixture parses and no reuse decision row stands unlabelled synthetic", { timeout: 60_000 }, () => {
    const { files } = liveFiles();
    const fixtures = files.filter(file => inFixtures(file.path));
    expect(floorsRead(fixtures, FIXTURE_FLOORS), "walked JSON files per tree, at or above their floors").toEqual(floorsMet(FIXTURE_FLOORS));
    expect(fixtures.flatMap(file => scanFixture(file.path, file.text))).toEqual([]);
    // Non-vacuity: the same reading over a real fixture with one planted row finds exactly that row.
    const real = fixtures.find(file => file.path === PLANTED_FIXTURE);
    expect(real, PLANTED_FIXTURE).toBeDefined();
    const planted = { ...(JSON.parse(real?.text ?? "{}") as Record<string, unknown>), wbPfxo11Planted: { decision: "reuse", synthetic: false } };
    expect(scanFiles([{ path: PLANTED_FIXTURE, text: JSON.stringify(planted) }])).toEqual([`${PLANTED_FIXTURE} #/wbPfxo11Planted reuse-row: labelled-not-synthetic`]);
  });

  it("live bead export (a): every program row's judged fields carry only echoes, and every export line parses", { timeout: 60_000 }, () => {
    const lines = exportLines();
    expect(lines.filter(line => line.trim() !== "").length).toBeGreaterThanOrEqual(EXPORT_FLOOR);
    expect(scanBeads(lines)).toEqual([]);
    // The program set is read from the export: the epic and the children its own title counts.
    const program = lines.flatMap(line => {
      const parsed = line.trim() === "" ? undefined : parseJson(line);
      return parsed?.ok === true && isRecord(parsed.value) && typeof parsed.value.id === "string" && isProgramRow(parsed.value, parsed.value.id) ? [parsed.value.id] : [];
    });
    const stated = Number(/\((\d+) gating\/posture requirements/.exec(stringField(exportRow(lines, EPIC), "title"))?.[1] ?? "0");
    expect(stated, "children the epic's title counts").toBeGreaterThan(0);
    expect(
      [EPIC, ...Array.from({ length: stated }, (_, index) => `${EPIC}.${index + 1}`)].filter(id => !program.includes(id)),
      "program rows missing from the export",
    ).toEqual([]);
    // Non-vacuity: the filing's own title reads as a mention of every claim and every id, and with the verdict word
    // removed from its export line the same reading refuses all of them.
    const filingLine = lines.find(line => parseJson(line).ok && exportRow([line], BEAD) !== undefined) ?? "";
    expect(mentionsIn(stringField(exportRow(lines, BEAD), "title"))).toEqual(CLAIMS.flatMap(claim => [`${claim.id} ${claim.family}`, `${claim.id} claim-id`]));
    expect(scanBeads([filingLine.replaceAll(AUDIT_STATUS, "open")])).toEqual(
      ["title", "fullStatement"].flatMap(field => CLAIMS.flatMap(claim => [`${BEAD} ${field}:1 ${claim.id} ${claim.family}: no-undetermined`, `${BEAD} ${field}:1 ${claim.id} claim-id: no-undetermined`])),
    );
  });

  it("filing anchor: the owner filing carries the claims, their citations and the clauses, and its spellings read as mentions", () => {
    const row = exportRow(exportLines(), BEAD);
    const title = stringField(row, "title");
    const notes = stringField(row, "notes");
    const filing = `${title}\n${notes}`;
    expect([...new Set(title.match(/small-a-C\d+[a-z]?/g) ?? [])], "the claim ids, in the order the filing states them").toEqual(CLAIMS.map(claim => claim.id));
    for (const constant of [AUDIT_STATUS, AUDIT_PIN, `${PROGRAM_BEADS}:45@${PROGRAM_PIN}`, "UNDETERMINED is a result, not permission to guess: no bead treats these as premises."]) expect(filing, constant).toContain(constant);
    expect(notes, "the C058 proposition, quoted with its line").toContain(`'${C058?.proposition}' ${PROGRAM_BEADS}:${C058?.line}@${PROGRAM_PIN}`);
    for (const claim of CLAIMS.slice(1)) expect(notes, `${claim.id} with its line`).toMatch(new RegExp(`${claim.id}[^:;]*:${claim.line}(?![0-9])`));
    const acceptance = /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\. Related:/.exec(notes);
    expect([acceptance?.[1], acceptance?.[2], acceptance?.[3]], "the acceptance clauses, verbatim").toEqual([CLAUSES.a, CLAUSES.b, CLAUSES.c]);
    const spellings = [
      /that (rf context plan reaches a 'reuse' row) \(small-a-C058\)/.exec(title)?.[1],
      /that (five swarms produced the October 17-18 corpus) \(small-a-C070\)/.exec(title)?.[1],
      /that (dependency traversal meets O\(\|affected edges\|\+\|affected nodes\|\)) \(small-a-C082b\)/.exec(title)?.[1],
      /that (a 'reuse' plan row is reachable)/.exec(acceptance?.[1] ?? "")?.[1],
      /that (five swarms are established)/.exec(acceptance?.[1] ?? "")?.[1],
      /that (traversal meets the O\(affected\) bound)/.exec(acceptance?.[1] ?? "")?.[1],
      /about (rf reuse reachability)/.exec(acceptance?.[2] ?? "")?.[1],
      /(the five-swarm population)/.exec(acceptance?.[2] ?? "")?.[1],
      /or (traversal complexity) is marked/.exec(acceptance?.[2] ?? "")?.[1],
      /'(Reachability of plan 'reuse' is not established\.)'/.exec(notes)?.[1],
    ];
    const expected = ["small-a-C058 reuse-reachability", "small-a-C070 five-swarms", "small-a-C082b traversal-bound"];
    expect(
      spellings.map(spelling => mentionsIn(spelling ?? "")),
      "the filing's spellings, by family",
    ).toEqual([...expected, ...expected, ...expected, expected[0]].map(name => [name]));
    expect(
      spellings.map(spelling => scanFiles(doc(`${spelling ?? ""}\n`))),
      "each spelling, planted unechoed",
    ).toEqual([...expected, ...expected, ...expected, expected[0]].map(name => [`docs/x.md:1 ${name}: ${REFUSED}`]));
    expect(
      CLAIMS.map(claim => mentionsIn(claim.proposition)),
      "each proposition as audited reads as its own claim",
    ).toEqual(expected.map(name => [name]));
  });

  for (const row of ROWS) {
    it(testName(row), { timeout: 60_000 }, () => {
      expect(readRow(row)).toEqual(row.expect);
    });
  }

  it("frozen shape (rule 16): rows, claims, grades, scopes, floors, vocabularies and the residual families as read at this cut", () => {
    expect(ROWS.map(row => `${row.table}:${row.id}:${row.expect.join("|")}:${inputDigest(row).slice(0, 8)}`)).toEqual(ROWS_LITERAL);
    expect(CLAIMS.map(claim => `${claim.id}:${claim.family}:${claim.line}:${claim.shapes.map(shapeText).join(" ; ")}`)).toEqual(CLAIMS_LITERAL);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([id, family]) => `${id}:${family}`)).toEqual(RESIDUALS_LITERAL);
    expect([AUDIT_STATUS, PROGRAM_PIN, RF_COMMIT, AUDIT_PIN, PROGRAM_BEADS, FULL_STATEMENT, ID_TOKENS]).toEqual([
      "UNDETERMINED",
      "6a251bf73af5",
      "6a251bf73af57c3a703caf6892dfe3015e06a481",
      "740c1a817",
      "docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md",
      "Full statement (title trimmed to bd's 500-character limit):",
      3,
    ]);
    expect(CITATION_BLOBS).toEqual({
      "docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md": "2ac4a741d3a21a1ab2c4cb42c5f9c2047f9abbdf",
      "docs/programs/compositional-assembly-2026-10-18/README.md": "b8a3d639fed32075a60ac058f1e689c6aeab4361",
    });
    expect([...OTHER_GRADES]).toEqual(["ESTABLISHED", "SUPPORTED", "PLAUSIBLE", "UNSUPPORTED", "CONTESTED", "REFUTED", "NON-EPISTEMIC", "CONFIRMED", "VERIFIED", "PROVEN", "SETTLED"]);
    expect(Object.keys(CLAUSES)).toEqual(["a", "b", "c"]);
    expect([[...TEXT_TREES], [...FIXTURE_TREES]]).toEqual([
      ["docs", "examples", "new-feedback", "src", "qa"],
      ["test", "qa", "examples"],
    ]);
    expect([TEXT_FLOORS, FIXTURE_FLOORS, EXPORT_FLOOR]).toEqual([
      { docs: { ".md": 60 }, examples: { ".js": 5, ".md": 1 }, "new-feedback": { ".md": 10 }, src: { ".ts": 100 }, qa: { ".mjs": 50, ".sh": 3, ".json": 1 }, ".": { ".md": 5 } },
      { test: { ".json": 30 }, qa: { ".json": 1 } },
      500,
    ]);
    expect([...SKIPPED_DIRS]).toEqual(["node_modules", "dist", ".git"]);
    expect([[...LABEL_KEYS], [...OBSERVED_WORDS], [...NEGATORS], [...OTHER_DECISIONS], [...VERDICT_ORDER]]).toEqual([
      ["label", "provenance", "comment", "note", "origin", "description"],
      ["measured", "observed", "captured", "recorded", "witnessed"],
      ["not", "non", "never", "no"],
      ["invalidated", "nonreusable", "refreshrequired"],
      ["not-synthetic", "synthetic", "observed"],
    ]);
    expect([...NAMED_REFERENCES.keys()]).toEqual(["amp", "lt", "gt", "quot", "apos", "nbsp", "shy", "hyphen", "dash", "ndash", "mdash", "minus", "zwj", "zwnj"]);
    expect([...CONFUSABLES].map(([char, latin]) => `${(char.codePointAt(0) ?? 0).toString(16)}>${latin}`)).toEqual(CONFUSABLES_LITERAL);
  });

  it("out-of-file roster: the judged rows, the registered row tests, the claims and the residual families equal the fixture, in order and both ways", { timeout: 60_000 }, ({ task }) => {
    const roster = JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;
    expect([roster.rfCommit, roster.citationBlobs], "the program pin and the quoted files' blobs").toEqual([RF_COMMIT, CITATION_BLOBS]);
    expect(
      CLAIMS.map(claim => ({ id: claim.id, family: claim.family, line: claim.line, proposition: claim.proposition, shapes: claim.shapes.map(shapeText) })),
      "the claims, their propositions and their shapes",
    ).toEqual(roster.claims);
    const rows: RosterRow[] = ROWS.map(row => ({ table: row.table, id: row.id, test: testName(row), findings: readRow(row), input: inputDigest(row) }));
    expect(rows, "the in-file rows, judged now, equal the roster rows exactly and in order").toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the residual families").toEqual(roster.residuals);
    expect(
      ROWS.filter(row => row.table === "RESIDUALS").map(row => row.id),
      "one quiet row per residual family",
    ).toEqual(Object.keys(roster.residuals));
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const entry of tasks) {
        if (entry.type === "test") walked.push({ name: entry.name, mode: entry.mode, fails: entry.fails === true, state: entry.result?.state, self: entry === task });
        else if (entry.type === "suite") visit(entry.tasks);
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
