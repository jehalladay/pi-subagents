/**
 * wb-dqf.2 (FURNACE-CAC-EXECUTION-ASSURANCE-R7, program-triage-2026-10-18), the Furnace cac-execution-assurance citation-status
 * census.
 * Statement (bead title; its two separators are the six characters backslash-u-2014 in the tracked export; "[the second record]"
 * stands for the title's second record, which this file and its roster never spell - THE SECOND RECORD below): "Any Pi document or
 * surfaced string citing Furnace's cac-execution-assurance-2026-10-18 program shall carry its recorded status verbatim - design-only;
 * FurnaceAttemptCapabilityV0 and [the second record] proposed, not shipped; asynchronous-attempt-semantics claims targets for
 * proof/measurement, never established results - until such a citation exists, zero mentions stays the passing state."
 * Owner filing (bead notes, the "Program status at the pin" paragraph): "Duty: any future Pi citation (docs/workbench rows,
 * TRACEABILITY entries, descriptor or receipt strings) carries the design-only / proposed-not-shipped / targets-for-proof grading
 * verbatim and never presents a CAC record or its async-semantics claims as shipped or established; NFR-08's
 * shipped/experimental/planned/blocked labelling discipline (docs/workbench/02-atomic-requirements.md:60) applies to the citing row.
 * Acceptance: the first citing change lands the wording together with a census row binding it (...)". The filing also says that
 * until a citation exists no src/test change is owed: this cut changes no src, docs or tracker text; it adds this test-only census
 * and its out-of-file roster, which mechanize the duty and hold the binding rows (BOUND) the acceptance names, empty today.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-26, at this census's base 32e0e2d). Producer (the local Furnace checkout, git
 * show / ls-tree at the filing's pin 0f791db71b9d; the checkout's HEAD at measurement, 05d6059, carries the same two blobs; the roster's producer block holds the
 * lines and blobs, the hermetic census never re-reads them): docs/programs/cac-execution-assurance-2026-10-18/ holds README.md
 * (blob 2fb1fb0d) and 01-contract-qa.md (blob ab9dbc00); README.md:3 opens "**2026-10-18 · Design-only adapter and correctness
 * investigation.**"; README.md:12 reads "Claims about asynchronous attempt semantics are *targets for proof/measurement* and are not
 * established by finite sequential theorems."; 01-contract-qa.md:3 is the heading "## Proposed source-owned references (not
 * shipped)" over the two records (:4 FurnaceAttemptCapabilityV0, :6 the second record); the vendored @furnace/sdk 0.1.0
 * names neither record. Pi: git grep -i -P over the filing's four needles (the second record's stem, FurnaceAttemptCapability,
 * cac-execution, execution-assurance, each read with separator runs) finds no tracked line outside .beads/ (rc 1), at the base and at
 * the filing pin b21beb0 (the export commit that files this bead: its row is absent from b21beb0's parent); git's lists hold 102
 * tracked documents (.md outside test/: 25 docs/workbench pages outside receipts/, 47 receipts, 30 more) and 116 src files. So zero
 * mentions holds today, as filed.
 *
 * THE SECOND RECORD (cut #2, the orchestrator's respin order at the landing-535 batch red under standing rule 22). The landed
 * wb-dqf.1 census (landing 536) holds every listed Pi file outside .beads/ and its own two holders to zero mentions of the status
 * segment's second record until Furnace ships it (its until-then leg Z2: the record's two middle words with any non-alphanumeric run
 * between them, in any case, read in raw text, paths, cooked and folded script literals and parsed JSON). The record has not
 * shipped - wb-dqf.1's gate is a released Furnace surface Pi vendors, and the vendored @furnace/sdk 0.1.0 names neither record
 * (re-measured by this cut: a grep over the tarball's entries, rc 1) - so this cut ships nothing, flips nothing and carries no
 * mention. SECOND_RECORD is read at module load from this bead's own tracker-export title, which wb-dqf.1 does not judge (its
 * R-TRACKER residual); SECOND_RECORD_SHA256 pins that token (the outside anchors case), so a renamed record reds instead of being
 * followed; formsOf derives every form the judges, controls and witnesses use (spelling, stem, word-reading pattern, id, spaced
 * words and the R-SPLIT-SOURCE split) by the one function whose output the judged-set case pins as literals for the first record,
 * and subjectOf builds the second record's subject by the function that rebuilds the first record's literal subject; the roster
 * writes each form as a token, {{record-2:<form>}}, that readRoster resolves before any case reads it. So at run time every label,
 * quote, witness and test title, and every constant cut #1 pinned, reads exactly as cut #1 spelled it; the roster adds one constant,
 * secondRecord (the sha256, the token's pattern and the form names). The judged-set case reds when this file or the roster spells
 * any form of the record or its first middle word; wb-dqf.1's Z2 stays the reading of record (its cooked, folded and decoded forms
 * included).
 *
 * THE RECEIPT ANCHOR (wb-xfkx, the R694 follow-up of landing 544: its F2 leads, F3 and F4 ride). Until this cut no record outside
 * this file and its roster named the residual families, a residual's probe, row Q's label or how a row's pins split its clause, so a
 * residual row removed, a quiet row's probe swapped or row Q's label shortened in every literal and the roster together read green
 * (the gate's G-CT6-Q4 45/45, G-CT3-Q4-COORD and G-CT2-Q-COORD 46/46), and so did a pin folded into its neighbour when its quote names
 * no anchored term (G-MERGE-A4, G-MERGE-K2 and G-MERGE-Z2 45/45). The record now lives in the wb-xfkx receipt
 * (docs/workbench/receipts/wb-xfkx.md, append-only under standing rule 15, a document this census also judges): its last dated entry
 * holds three tables, read through marked's tokens - every row's id, pins and label digest; every judged pin's quote digest; every
 * residual family with its quiet row and the digest of that row's roster witness (its probe's path, text and causes) - each digest a
 * sha-256 of the UTF-8 bytes, a witness read as its JSON text (JSON.stringify) after readRoster resolves its {{record-2:<form>}}
 * tokens, so the receipt cites nothing and spells no record. The receipt-anchor case holds the three tables to ROWS, QUOTES,
 * RESIDUALS and the roster witnesses, in order and both ways; a later cut that changes any of them appends a new dated entry
 * carrying the three tables for its state and never edits a landed line. Four in-case controls pin the reader: only the last dated
 * entry is read, a table before any dated entry is not, and a table inside an HTML comment or a code block is no table.
 * THE WITNESS RULE (wb-pnn8, the R694 follow-up of landing 615: its F2 leads). The receipt's 2026-10-27 entry stated the witness
 * digest over a witness read as its JSON text with no token resolution, so the six witnesses that carry a {{record-2:<form>}} token
 * (Q3, Q5, Q6, Q7, Q9 and Q14) could not be re-derived from the roster by its rule (an independent recomputation: 8 of 14 without the
 * resolution, 14 of 14 with it); its 2026-10-29 entry restates the rule and carries the three tables again, unchanged. The rule's
 * clause is ANCHOR.definition. The receipt-anchor case holds it EQUAL, both ways, to the one block of the last dated entry that opens
 * with ANCHOR.rule ('Witness rule: '), read past that lead with one closing period dropped (anchorRules), every block read by
 * anchorProse through shownText, the carrier view's token reading: top-level paragraphs and list items only, a code span shows its
 * code, struck text and the other unshown types show nothing, and a block holding a raw HTML element is opaque. So an entry appended
 * without the resolution, with a second or no rule block, or with words added around the clause in its block reds, and so does the
 * clause shortened in this file and the roster together, against the unchanged receipt. The case also holds this header to contain
 * the clause (headerOf: the leading doc comment, comment prefixes removed, whitespace squeezed), so a header that drops it reds.
 * In-case controls pin the three readers: only the last dated entry's prose is read, none before any dated entry, none inside an HTML
 * comment or a code block, a block with a raw HTML element is opaque, only blocks opening with the lead are rules, and the header is
 * the file's leading doc comment only.
 *
 * THE UNITS. A unit is the smallest text the judges read as one "paragraph". Markdown (every document is .md): a blank-line-delimited
 * block, where a heading, a table row and each line inside a code fence are units of their own and a list item starts a new unit (its
 * lazy continuation lines stay in it); a blockquote line holding only ">" is blank. Source (every src file is .ts), read through the
 * TypeScript AST: each string and regular-expression literal (its cooked value), each template expression (cooked literal parts with
 * the raw substitutions), each comment (leading and same-line trailing ranges), and each identifier as a CODE unit (JSDoc nodes are
 * read as their comment only). Any other extension: each line.
 * THE JUDGES (one call, judgeUnit, per unit). A unit CITES the program when the citation pattern (CITATION: the filing's four grep
 * needles, each read word by word with any run of whitespace, underscore or hyphen between its words, case-insensitively) matches it
 * outside a requirement-id spelling (REQUIREMENT_ID: the bead family's id form, FURNACE-CAC-EXECUTION-ASSURANCE-R<n>). A citing CODE
 * unit is a finding ("code": a Pi symbol naming the program or a record presents it as existing). A citing text unit owes, on its
 * CARRIER VIEW, (i) "design-only" as a whole word, not negated within the two words before it and not followed by "no longer"/"no
 * more"/"anymore" ("unqualified" when absent); (ii) when it names a record, the record grading verbatim - "proposed, not shipped",
 * "proposed-not-shipped" or the producer heading "Proposed source-owned references (not shipped)" ("record-status"); (iii) when it
 * holds an asynchronous-attempt-semantics subject, "targets for proof/measurement" or "targets-for-proof" ("async-status"). The
 * existence judge reads the raw text with every carrier span blanked, clause by clause (semicolons and sentence ends outside
 * parentheses): a record subject (the two records, a CAC record) with an EXISTS word, or the asynchronous-attempt-semantics subject
 * with an ESTABLISHED word, not preceded in its clause by a GUARD word and not followed by "nowhere"/"nothing"/"none"/"not"/"never"/
 * "no", is a finding ("exists:<record>", "established:async-semantics"). A citing TABLE ROW owes an NFR-08 label on its carrier view:
 * one of the four words docs/workbench/02-atomic-requirements.md:60 names, not negated ("unlabelled" when none); "shipped" among them
 * contradicts the recorded status ("label:shipped"). BINDING (the acceptance's census row): every citing unit, as its path and its
 * whitespace-squeezed text, must be held in BOUND, and every BOUND entry must still be a citing unit (no stale row); BOUND is empty,
 * so zero mentions is the only passing state until a citing change lands its wording and its row together.
 * THE CARRIER VIEW (the wb-3cql F3 reading, ported). A markdown unit's carrier view is what its rendered page shows. marked's
 * top-level tokens of the whole document (their raws tile its source) place each line: a raw HTML block, a link reference definition
 * and a code fence delimiter show nothing; a code block's lines show verbatim; a list or quote whose raw HTML crosses a blank line is
 * opaque. The unit's remaining lines are rendered on their own through marked (indentation removed, footnote syntax removed, the
 * document's definitions preloaded): HTML, images (their alt text included), definitions, link destinations and titles and struck
 * text show no carrier, and a raw HTML element makes the view opaque, carrying nothing. A src unit is shown as its text. The citation
 * and existence judges read the raw text, so a citation or a claim only the raw markup holds still counts.
 *
 * ROWS (each label an exact slice of the bead row, each pin quote a slice of its label; the quotes of a row tile it). A, the
 * statement's first segment: A1 the documents walk (git's tracked .md outside test/, its docs/ part equal to a filesystem walk, a file
 * floor, content-liveness anchors - the NFR-08 sentence is the unit at docs/workbench/02:60, every receipt opens "# <its bead>: "
 * (rule 15), README.md opens with a level-1 heading - and the same call judging a planted file after the tracked ones), A2 the src
 * walk (the same, its anchor the schema literal "workflow-script/v1" as a string unit of src/workbench/identity.ts only), A3 the
 * citation reader, A4 the three gradings read verbatim. B, the statement's status segment: B1 the design-only carrier, B2 and B3
 * each record owing the record grading, B4 that grading's spellings, B5 the asynchronous-attempt-semantics subject, B6 its grading,
 * B7 the established judge. Z, the statement's last segment: Z1 BOUND is empty, so every citing unit is unbound; Z2 the real tree's
 * citing units equal BOUND (zero mentions today). M, the filing's measurement: M1 the four needles are CITATION's source, M2 at the
 * filing pin b21beb0 no tracked path outside .beads/ matches CITATION and the readers find no citing unit (exact counts at the fixed
 * tree; the same call judges a plant). D, the duty's first clause: D1 a future citation committed into a scratch git repository at a
 * path of each named scope is flagged through readScope's own git listing (its qualified twin is content-quiet and unbound), D2
 * docs/workbench rows (a citing row appended to the live feature matrix), D3 TRACEABILITY entries (a citing entry appended to the
 * live page, which is only read), D4 descriptor strings (every src description: property string is a string unit; a planted
 * descriptor), D5 receipt strings, D6 the duty's hyphenated gradings. E, the duty's second clause: E1 a CAC record presented as
 * existing, E2 the async-semantics claims presented as established, E3 the predicate vocabularies. N, NFR-08: N1 its four labels, N2
 * the live line docs/workbench/02-atomic-requirements.md:60, N3 the label judge on citing table rows. K, the acceptance: K1 a citing
 * change with and without its wording, with and without its binding row; K2 the binding's identity (path and squeezed text) and the
 * stale-row check. Q, the residuals' pinned quiet rows: each witness (but R-SCOPE's path list) is its probe's path, text and causes,
 * and the probe is re-judged where the witness is compared.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness, the constants and every registered test title - is held to the out-of-file roster
 * (test/fixtures/furnace-cac-citation-status-roster.json). OUTSIDE ANCHORS (their own registered case): the bead's own row in the
 * tracker export (.beads/issues.jsonl) - each of its eight sliced clauses (the statement's three segments, the measurement, the duty's
 * three clauses, the acceptance) is exactly one row's label, and each row's pin quotes tile its clause with nothing but separators
 * between them, so a pin or a row removed from ROWS, the literal, IMPL, QUOTES and the roster together still reds; CITATION is
 * derived from the measurement's needles; the program name, the two records (the second also pinned by its sha256), the three
 * gradings, the subjects, the scopes, the labels and the predicate anchor words are read from the bead text; the label list also
 * from the live docs/02 line; the producer block carries the filing's three quoted status lines; the bead's own title read as a
 * receipt heading is a content-quiet citation;
 * and every anchored term a pin's quote names is carried by that pin's roster witness (the wb-3cql F4 reading), so a re-tiling that
 * folds a naming pin into a neighbour reds. The receipt anchor (THE RECEIPT ANCHOR) holds what the bead text cannot: the residual
 * families, each quiet row's probe, row Q's label and every row's split into pins, so a residual row removed, a probe swapped or a
 * pin folded in every literal and the roster together still reds. The last case reads the vitest task tree (every registered test,
 * in roster order, in run mode, ran before it), REACHED (every pin reached its witness compare, and each compare's own result) and
 * ENDS (the judged-set, outside-anchors and receipt-anchor cases each recorded its own end with its assertion count, held to the
 * roster's ends, so an early return or a cut tail in any of them reds).
 * NOT CLAIMED (edits of this file and the roster together): every edit the receipt anchor would catch, made in the anchor too - a later
 * dated entry appended to docs/workbench/receipts/wb-xfkx.md whose tables and witness rule carry it (the census reads the last entry;
 * the append is the visible act a gate judges) - and a sha-256 collision; what the receipt's other prose says (of the last dated entry
 * the census reads its tables and its one rule block, never its other blocks); a non-pin case's tail cut, or any one of its
 * assertions removed, together with its count in the roster's ends;
 * a control removed from IMPL and the roster together while every remaining control holds; a plant edited in IMPL and the roster
 * together; a floor lowered in FLOORS and the
 * roster together (git's list equal to the filesystem walk stays the narrowing guard for docs/ and src/; the documents outside docs/
 * are held by git's list and the floor only); a seat-added vocabulary member (of EXISTS, ESTABLISHED, GUARD or the negation lists)
 * removed with every control naming it, in IMPL and the roster together (only the bead text's words are anchored outside); NFR-08's
 * "with exact source of evidence" tail (R-EVIDENCE-TAIL); "any violation found earlier is corrected append-only in the wb-lrz.3
 * style" (no violation exists: zero mentions); the outside-anchor case, the receipt-anchor case or the closing case removed with its
 * roster title and its ends entry; an
 * escape-spelled or concatenated form of the second record in this file (the judged-set guard reads this file's raw text and the
 * roster's raw and parsed strings; wb-dqf.1's Z2 reads the cooked and folded forms).
 * RESIDUALS (named, each with its pinned quiet row): R-SCOPE only the documents and src are judged - qa/, test/ (fixtures included),
 * configuration and other non-.md files are not (Q1); R-REQUIREMENT-ID a unit whose only matches sit in a requirement-id spelling
 * does not cite (Q2); R-PARAPHRASE-CITE a citation spelling none of the needles' words in order does not cite (Q3);
 * R-NEGATION-DISTANCE a negation more than two words before "design-only" does not cancel it (Q4); R-PARAPHRASE-EXISTS an existence
 * claim through a predicate outside EXISTS is not read (Q5); R-GUARD-WORD any GUARD word before the predicate in its clause silences
 * it, whatever it governs (Q6); R-CROSS-CLAUSE a subject and its predicate in different clauses are not read (Q7);
 * R-SUBJECT-SPELLING a subject spelled outside the subject patterns is not read (Q8); R-SPLIT-SOURCE a src citation split across a
 * string concatenation is not read (Q9); R-ESCAPED-SPELLING a markdown-escaped or entity-spelled needle does not cite (Q10);
 * R-DOCUMENT-SCOPE a claim in a unit that does not cite is not judged, even in a document that cites elsewhere (Q11);
 * R-PROSE-LABEL the NFR-08 label is read on citing table rows only (Q12); R-EVIDENCE-TAIL a labelled citing row naming no source of
 * evidence is quiet (Q13); R-CARRIER-PLACEMENT a grading anywhere in the unit grades every subject of the unit (Q14).
 * SCOPE: the judges read words, not meaning. OVER-READS (disclosed; none today): a citing paragraph whose only status is a paraphrase
 * ("design only", "unreleased", "targets for proof") flags; a "CAC record" in a citing unit reads as one of the program's records; a
 * code symbol that merely names a record flags as code; a status carried only by a heading or a neighbouring paragraph does not
 * qualify a unit; a receipt whose rule-15 first line carries a sibling bead's title that names a record without "design-only" (today
 * wb-dqf.1's) flags - by design: that first citing change lands the wording and its BOUND row together.
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: D1 composes makeScratch/removeScratch with the leak
 * guard installed; docs, src, .beads and git objects are otherwise only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { Lexer, type Links, marked, type Token, type Tokens } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard();

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "furnace-cac-citation-status-roster.json");
const BEAD = "wb-dqf.2";
const EXPORT = ".beads/issues.jsonl";
const NFR_PAGE = "docs/workbench/02-atomic-requirements.md";
const NFR_LINE = 60;
const TRACEABILITY = "docs/workbench/TRACEABILITY.md";
const FEATURE_MATRIX = "docs/workbench/feature-matrix.md";
const WORKBENCH = "docs/workbench/";
const RECEIPTS = "docs/workbench/receipts/";
const IDENTITY = "src/workbench/identity.ts";
const SCHEMA_LITERAL = "workflow-script/v1";
/** The export commit that files this bead (program-triage-2026-10-18, 2026-10-19T01:53:29Z): its row is absent from the parent. */
const FILING_PIN = "b21beb0f89ad49500069403c4815d58f2825b414";
/** The producer pin every status quote of the filing names (Furnace, docs/programs/cac-execution-assurance-2026-10-18). */
const PRODUCER_PIN = "0f791db71b9d";

/** The two scopes the statement names: "Any Pi document" (tracked .md outside test/) and "surfaced string" (src). */
type ScopeId = "documents" | "strings";
interface Scope {
  readonly id: ScopeId;
  readonly word: string;
  /** The directory a path must sit under ("" = the whole tree). */
  readonly under: string;
  /** The path suffix a file must carry ("" = any). */
  readonly extension: string;
  readonly exclude: readonly string[];
  /** The root whose filesystem walk equals git's tracked list under it, both ways. */
  readonly walk: string;
}
const SCOPES: Readonly<Record<ScopeId, Scope>> = {
  documents: { id: "documents", word: "Any Pi document", under: "", extension: ".md", exclude: ["test/"], walk: "docs" },
  strings: { id: "strings", word: "surfaced string", under: "src", extension: "", exclude: [], walk: "src" },
};
const SCOPE_IDS = ["documents", "strings"] as const;
/** Floors measured at this census's base 32e0e2d: files exactly; units 6846 and 103354 read with each leg's plant and 76 src descriptor strings, floored near 90%. */
const FLOORS = {
  documents: { files: 102, units: 6100 },
  strings: { files: 116, units: 93000 },
  workbench: 25,
  receipts: 47,
  descriptors: 68,
} as const;
/** The filing pin's tree is fixed: its tracked paths outside .beads/ and the readers' exact unit count over its two scopes plus the documents plant. */
const PIN_PATHS = 707;
const PIN_UNITS = 106318;

const PROGRAM = "cac-execution-assurance-2026-10-18";
const SEPARATOR_RUN = "[\\s_-]*";
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** A literal's words: split at hyphens, underscores, spaces and lower-to-upper camel boundaries. */
function wordsOf(literal: string): string[] {
  return literal
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(word => word.length > 0);
}
function citationSource(literals: readonly string[]): string {
  return literals.map(literal => wordsOf(literal).map(escaped).join(SEPARATOR_RUN)).join("|");
}
/** The status segment's first record: spelled here, since no landed Pi census holds its mentions to zero. */
const FIRST_RECORD = "FurnaceAttemptCapabilityV0";
/**
 * The status segment's second record (THE SECOND RECORD): read at module load from this bead's own tracker-export title - the token
 * between the first record's "and " and " proposed, not shipped;" - and spelled nowhere in this file or its roster.
 */
const SECOND_RECORD = new RegExp(`; ${FIRST_RECORD} and (\\w+) proposed, not shipped;`).exec(beadRow(BEAD).title)?.[1] ?? "";
if (SECOND_RECORD === "") throw new Error(`${BEAD}'s tracker-export title names no second record after "${FIRST_RECORD} and "`);
/** The second record's token pinned without spelling it: the sha256 of its UTF-8 bytes (the outside anchors case), so a renamed record reds. */
const SECOND_RECORD_SHA256 = "1c0769bbbe60b3db2262951f9239f28ecded7785247417e461f4a01956935ae2";
/** A record's forms as the judges, the controls and the witnesses read them. */
interface RecordForms {
  /** The record as the statement spells it. */
  readonly spelling: string;
  /** Without its V0 suffix: the filing's grep needle. */
  readonly stem: string;
  /** The stem's word-reading: its words with separator runs between them, as CITATION reads a needle. */
  readonly pattern: string;
  /** Its words after "Furnace", lowercased and hyphenated: the subject id a finding names. */
  readonly id: string;
  /** The same words, lowercased and spaced. */
  readonly words: string;
  /** The spelling split before its last word: the two literals of the R-SPLIT-SOURCE probe. */
  readonly head: string;
  readonly tail: string;
}
/** Every form of a record from its spelling alone; the judged-set case pins the first record's forms as literals. */
function formsOf(spelling: string): RecordForms {
  const stem = spelling.replace(/V0$/, "");
  const words = wordsOf(stem);
  const head = words.slice(0, -1).join("");
  return {
    spelling,
    stem,
    pattern: words.map(escaped).join(SEPARATOR_RUN),
    id: words.slice(1).join("-").toLowerCase(),
    words: words.slice(1).join(" ").toLowerCase(),
    head,
    tail: spelling.slice(head.length),
  };
}
const SECOND = formsOf(SECOND_RECORD);
/** The filing's grep needles (row M's quote); the anchor case reads them from the bead row. */
const NEEDLES = [SECOND.stem, "FurnaceAttemptCapability", "cac-execution", "execution-assurance"];
const CITATION = new RegExp(citationSource(NEEDLES), "gi");
/** The bead family's own requirement-id spelling (derived from this bead's title in the anchor case). */
const REQUIREMENT_ID = /\bFURNACE-CAC-EXECUTION-ASSURANCE-R\d+\b/g;

/** The three gradings, verbatim: the statement's words, the duty's hyphenated forms and the producer heading the filing quotes. */
const DESIGN_ONLY = "design-only";
const RECORD_STATUS = ["proposed, not shipped", "proposed-not-shipped", "Proposed source-owned references (not shipped)"];
const ASYNC_STATUS = ["targets for proof/measurement", "targets-for-proof"];
/** A grading phrase: its words with any whitespace run between them, case-insensitive, never inside a longer word. */
function phrasePattern(phrase: string): RegExp {
  return new RegExp(`(?<![\\w-])${phrase.split(/\s+/).map(escaped).join("\\s+")}(?![\\w-])`, "gi");
}
const DESIGN_ONLY_PATTERNS = [phrasePattern(DESIGN_ONLY)];
const RECORD_PATTERNS = RECORD_STATUS.map(phrasePattern);
const ASYNC_PATTERNS = ASYNC_STATUS.map(phrasePattern);
const STATUS_NEGATION_BEFORE = /\b(?:not|never|nor|no|isn't|aren't|wasn't|weren't)\b/i;
const STATUS_NEGATION_AFTER = /^\W*(?:no longer|no more|any ?more)\b/i;

/** The statement's subjects: the two records, a CAC record (the duty's word) and the asynchronous-attempt-semantics claims. */
interface Subject {
  readonly id: string;
  readonly spelling: string;
  readonly pattern: RegExp;
}
/** A record subject from its forms: its id, its spelling, and its word-reading with an optional V0 (the judges read either). */
function subjectOf(forms: RecordForms): Subject {
  return { id: forms.id, spelling: forms.spelling, pattern: new RegExp(`${forms.pattern}(?:${SEPARATOR_RUN}V0)?`, "i") };
}
const RECORDS: readonly Subject[] = [
  { id: "attempt-capability", spelling: "FurnaceAttemptCapabilityV0", pattern: /Furnace[\s_-]*Attempt[\s_-]*Capability(?:[\s_-]*V0)?/i },
  subjectOf(SECOND),
];
const CAC_RECORD: Subject = { id: "cac-record", spelling: "a CAC record", pattern: /\bCAC[\s_-]+records?\b/i };
const ASYNC: Subject = { id: "async-semantics", spelling: "asynchronous-attempt-semantics claims", pattern: /\b(?:asynchronous|async)(?:[\s_-]+attempts?)?[\s_-]+semantics\b/i };
const EXISTS = /\b(?:exist(?:s|ing|ed)?|ship(?:s|ped|ping)?|wired|implement(?:s|ed)|available|land(?:s|ed)|released|published|live|supported|consum(?:es|ed)|vendored|exported|runs|enforce[sd])\b/gi;
const ESTABLISHED = /\b(?:establish(?:es|ed)?|proven|prove[sd]?|verified|guaranteed|demonstrated|confirmed)\b/gi;
const GUARD =
  /\b(?:no|not|never|none|nothing|nor|neither|without|cannot|can't|isn't|aren't|wasn't|weren't|doesn't|don't|didn't|won't|hasn't|haven't|when|whenever|once|if|until|unless|before|would|will|may|might|could|should|proposed|planned|future|yet)\b/i;
const GUARD_AFTER = /^\s*(?:nowhere|nothing|none|not|never|no)\b/i;
/** How clauses split: at a semicolon, or a sentence end followed by whitespace, outside parentheses (a grading's parenthesis never splits a subject from its predicate). */
const CLAUSE_SPLIT = "semicolon or sentence end (.!? then whitespace) at parenthesis depth 0";
/** NFR-08's labels (docs/workbench/02-atomic-requirements.md:60); the anchor case reads them from the bead row and the live line. */
const LABELS = ["shipped", "experimental", "planned", "blocked"];
const LABEL = new RegExp(`\\b(?:${LABELS.join("|")})\\b`, "gi");
/** The carrier view (the wb-3cql F3 reading): marked token types whose text no reader of the rendered page sees as a status. */
const UNSHOWN: readonly string[] = ["html", "image", "def", "del", "space", "hr"];
/** An html token opening or closing an element: an attribute or a style can hide the text between its tags, so its view is opaque. */
const ELEMENT = /^<\/?[A-Za-z]/;
/** Footnote syntax shows no carrier: a reference renders as a number (never its label), a definition apart from its paragraph. */
const FOOTNOTE = { reference: /\[\^[^\]\n]+\]/g, definition: /^\s*(?:>\s*)*\[\^[^\]\n]+\]:/ };

/** A citation's binding row: its path and its whitespace-squeezed text (the acceptance's "census row binding it"). */
interface Binding {
  readonly path: string;
  readonly text: string;
}
/** The census rows binding a citation: empty, so zero mentions is the passing state until a citing change lands with its row. */
const BOUND: readonly Binding[] = [];

const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-SCOPE": ["Q1"],
  "R-REQUIREMENT-ID": ["Q2"],
  "R-PARAPHRASE-CITE": ["Q3"],
  "R-NEGATION-DISTANCE": ["Q4"],
  "R-PARAPHRASE-EXISTS": ["Q5"],
  "R-GUARD-WORD": ["Q6"],
  "R-CROSS-CLAUSE": ["Q7"],
  "R-SUBJECT-SPELLING": ["Q8"],
  "R-SPLIT-SOURCE": ["Q9"],
  "R-ESCAPED-SPELLING": ["Q10"],
  "R-DOCUMENT-SCOPE": ["Q11"],
  "R-PROSE-LABEL": ["Q12"],
  "R-EVIDENCE-TAIL": ["Q13"],
  "R-CARRIER-PLACEMENT": ["Q14"],
};
/**
 * THE RECEIPT ANCHOR: the record of this census's shape outside its two files - its bead's receipt, the path, its last dated entry's
 * three table headers, in order, and the witness rule (wb-pnn8): the lead of the entry's one block that states it, and its clause,
 * which that block and this file's header both state.
 */
const ANCHOR = {
  bead: "wb-xfkx",
  receipt: "docs/workbench/receipts/wb-xfkx.md",
  tables: [
    ["Row", "Pins", "Label sha-256"],
    ["Pin", "Quote sha-256"],
    ["Quiet row", "Residual family", "Witness sha-256"],
  ],
  rule: "Witness rule: ",
  definition: "a witness read as its JSON text (JSON.stringify) after readRoster resolves its {{record-2:<form>}} tokens",
} as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for every row but Q, to the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "Any Pi document or surfaced string citing Furnace's cac-execution-assurance-2026-10-18 program shall carry its recorded status verbatim",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: `design-only; FurnaceAttemptCapabilityV0 and ${SECOND.spelling} proposed, not shipped; asynchronous-attempt-semantics claims targets for proof/measurement, never established results`,
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
  },
  { id: "Z", label: "until such a citation exists, zero mentions stays the passing state", pins: ["Z1", "Z2"] },
  {
    id: "M",
    label: `git grep for ${SECOND.stem} / FurnaceAttemptCapability / cac-execution / execution-assurance over the working tree returns zero hits`,
    pins: ["M1", "M2"],
  },
  {
    id: "D",
    label:
      "any future Pi citation (docs/workbench rows, TRACEABILITY entries, descriptor or receipt strings) carries the design-only / proposed-not-shipped / targets-for-proof grading verbatim",
    pins: ["D1", "D2", "D3", "D4", "D5", "D6"],
  },
  { id: "E", label: "never presents a CAC record or its async-semantics claims as shipped or established", pins: ["E1", "E2", "E3"] },
  {
    id: "N",
    label: "NFR-08's shipped/experimental/planned/blocked labelling discipline (docs/workbench/02-atomic-requirements.md:60) applies to the citing row",
    pins: ["N1", "N2", "N3"],
  },
  { id: "K", label: "the first citing change lands the wording together with a census row binding it", pins: ["K1", "K2"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14"] },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  A1: "Any Pi document",
  A2: "or surfaced string",
  A3: "citing Furnace's cac-execution-assurance-2026-10-18 program",
  A4: "shall carry its recorded status verbatim",
  B1: "design-only",
  B2: "FurnaceAttemptCapabilityV0",
  B3: `and ${SECOND.spelling}`,
  B4: "proposed, not shipped",
  B5: "asynchronous-attempt-semantics claims",
  B6: "targets for proof/measurement",
  B7: "never established results",
  Z1: "until such a citation exists",
  Z2: "zero mentions stays the passing state",
  M1: `git grep for ${SECOND.stem} / FurnaceAttemptCapability / cac-execution / execution-assurance`,
  M2: "over the working tree returns zero hits",
  D1: "any future Pi citation",
  D2: "docs/workbench rows",
  D3: "TRACEABILITY entries",
  D4: "descriptor",
  D5: "or receipt strings",
  D6: "carries the design-only / proposed-not-shipped / targets-for-proof grading verbatim",
  E1: "never presents a CAC record",
  E2: "or its async-semantics claims",
  E3: "as shipped or established",
  N1: "NFR-08's shipped/experimental/planned/blocked labelling discipline",
  N2: "docs/workbench/02-atomic-requirements.md:60",
  N3: "applies to the citing row",
  K1: "the first citing change lands the wording",
  K2: "together with a census row binding it",
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
interface Roster {
  readonly bead: string;
  readonly producer: { [key: string]: JsonValue };
  readonly constants: { [key: string]: JsonValue };
  readonly tests: readonly string[];
  /** Each non-pin case's recorded end, `${id}:${assertion count}`, in run order (ENDS). */
  readonly ends: readonly string[];
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
/** Every string of a parsed JSON value, its object keys included. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (isObject(value)) return Object.entries(value).flatMap(([key, member]) => [key, ...stringsOf(member)]);
  return [];
}
/** A second-record token of the roster, {{record-2:<form>}}: the roster spells the record only this way (THE SECOND RECORD). */
const RECORD_TOKEN = /\{\{record-2:([a-z]+)\}\}/g;
const SECOND_FORMS: ReadonlyMap<string, string> = new Map(Object.entries(SECOND));
/** A parsed roster value with every token resolved from SECOND, refusing a token that names no form (object keys hold none). */
function resolved(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(RECORD_TOKEN, (token: string, form: string) => {
      const text = SECOND_FORMS.get(form);
      if (text === undefined) throw new Error(`roster token ${token} names no form of the second record`);
      return text;
    });
  }
  if (Array.isArray(value)) return value.map(resolved);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, resolved(member)]));
  return value;
}
/** Parses the roster, resolves its tokens and refuses any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = resolved(JSON.parse(readFileSync(ROSTER_PATH, "utf8")));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests) || !Array.isArray(raw.ends)) {
    throw new Error("roster must be an object with bead, rows, tests and ends");
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
  const ends = raw.ends.map((end: unknown, index: number): string => {
    if (typeof end !== "string") throw new Error(`roster ends[${index}] must be a string`);
    return end;
  });
  return { bead: raw.bead, producer: objectOf(raw.producer, "roster producer"), constants: objectOf(raw.constants, "roster constants"), tests, ends, rows };
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

type UnitKind = "block" | "line" | "string" | "comment" | "code";
/** What a reader sees of a unit, as a carrier: an opaque view carries nothing. */
interface CarrierView {
  readonly text: string;
  readonly opaque: boolean;
}
interface Unit {
  readonly line: number;
  readonly kind: UnitKind;
  readonly text: string;
  /** A markdown unit's carrier view (THE CARRIER VIEW), read lazily; a unit without one is shown as its text. */
  readonly view?: () => CarrierView;
}
const BLANK = /^\s*(?:>\s*)*$/;
const LIST_ITEM = /^\s*(?:>\s*)*(?:[-*+]|\d{1,9}[.)])\s+/;
const HEADING = /^\s{0,3}#{1,6}(?:\s|$)/;
const TABLE_ROW = /^\s*\|/;
const FENCE = /^\s{0,3}(?:`{3,}|~{3,})/;

/** A markdown line's place in its document's own rendering: rendered with its unit, shown verbatim as code, hidden, or opaque. */
type LineShow = "rendered" | "code" | "hidden" | "opaque";
const SHOW_RANK: Readonly<Record<LineShow, number>> = { rendered: 0, code: 1, hidden: 2, opaque: 3 };
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
function childrenOf(token: Token): readonly Token[] {
  if (isList(token)) return token.items.flatMap(item => item.tokens);
  const value: unknown = (token as { tokens?: unknown }).tokens;
  return Array.isArray(value) ? (value as Token[]) : [];
}
function textField(token: Token): string {
  const value: unknown = (token as { text?: unknown }).text;
  return typeof value === "string" ? value : "";
}
/** A list or quote whose raw HTML crosses a blank line: the census's units cannot see where that HTML ends. */
function spansBlankLine(token: Token): boolean {
  return childrenOf(token).some(child => (child.type === "html" && /\n[ \t>]*\n/.test(child.raw)) || spansBlankLine(child));
}
function placeOf(token: Token, line: string): LineShow {
  if (token.type === "html" || token.type === "def") return "hidden";
  if (token.type === "code") return FENCE.test(line) ? "hidden" : "code";
  if ((token.type === "list" || token.type === "blockquote") && spansBlankLine(token)) return "opaque";
  return "rendered";
}
/** Each line's place, read from marked's top-level tokens of the whole document (their raws tile its source), and its link definitions. */
function documentView(text: string): { readonly places: readonly LineShow[]; readonly links: Links } {
  const source = text.split("\n");
  const places: LineShow[] = source.map(() => "rendered");
  const tokens = marked.lexer(text);
  let line = 0;
  for (const token of tokens) {
    const breaks = token.raw.split("\n").length - 1;
    const last = token.raw.endsWith("\n") ? line + breaks - 1 : line + breaks;
    for (let at = line; at <= last && at < source.length; at += 1) {
      const place = placeOf(token, source[at] ?? "");
      if (SHOW_RANK[place] > SHOW_RANK[places[at] ?? "rendered"]) places[at] = place;
    }
    line += breaks;
  }
  return { places, links: tokens.links };
}
/** What a reader sees of marked tokens as a carrier: unshown types and a link's destination and title show nothing. */
function shownText(tokens: readonly Token[], separator: string, view: { opaque: boolean }): string {
  return tokens
    .map(token => {
      if (token.type === "html" && ELEMENT.test(token.raw.trim())) view.opaque = true;
      if (UNSHOWN.includes(token.type)) return "";
      if (token.type === "br") return "\n";
      if (isList(token)) return token.items.map(item => shownText(item.tokens, "\n", view)).join("\n");
      if (isTable(token)) return [...token.header, ...token.rows.flat()].map(cell => shownText(cell.tokens, "", view)).join(" ");
      const children = childrenOf(token);
      return children.length > 0 ? shownText(children, token.type === "blockquote" ? "\n" : "", view) : textField(token);
    })
    .join(separator);
}
/** A unit's carrier view: its hidden lines dropped, code shown verbatim, the rest rendered on its own (indentation removed, footnote syntax removed, the document's definitions preloaded). */
function carrierView(lines: readonly string[], places: readonly LineShow[], links: Links): CarrierView {
  if (places.includes("opaque")) return { text: "", opaque: true };
  const kept = lines.filter((_, index) => places[index] !== "hidden");
  if (places.every(place => place === "code" || place === "hidden")) return { text: kept.join("\n"), opaque: false };
  const markdown = kept
    .filter(line => !FOOTNOTE.definition.test(line))
    .map(line => line.replace(/^[ \t]+/, "").replace(FOOTNOTE.reference, ""))
    .join("\n");
  const lexer = new Lexer();
  Object.assign(lexer.tokens.links, links);
  const view = { opaque: false };
  const text = shownText(lexer.lex(markdown), "\n", view);
  return { text, opaque: view.opaque };
}

/** Markdown units: blank-line blocks; a heading, a table row and each fenced line are units of their own; a list item opens one. */
function markdownUnits(text: string): Unit[] {
  const units: Unit[] = [];
  let document: ReturnType<typeof documentView> | undefined;
  /** The document's own rendering, read once and only when a citing unit asks for its view. */
  const read = (): ReturnType<typeof documentView> => {
    document ??= documentView(text);
    return document;
  };
  const push = (line: number, kind: UnitKind, lines: readonly string[]): void => {
    const view = (): CarrierView => {
      const { places, links } = read();
      return carrierView(
        lines,
        lines.map((_, offset) => places[line - 1 + offset] ?? "rendered"),
        links,
      );
    };
    units.push({ line, kind, text: lines.join("\n"), view });
  };
  let open: { line: number; lines: string[] } | undefined;
  let fenced = false;
  const flush = (): void => {
    if (open !== undefined) push(open.line, "block", open.lines);
    open = undefined;
  };
  for (const [index, line] of text.split("\n").entries()) {
    const at = index + 1;
    if (FENCE.test(line)) {
      flush();
      fenced = !fenced;
      push(at, "line", [line]);
    } else if (fenced) push(at, "line", [line]);
    else if (BLANK.test(line)) flush();
    else if (HEADING.test(line) || TABLE_ROW.test(line)) {
      flush();
      push(at, "line", [line]);
    } else if (LIST_ITEM.test(line) || open === undefined) {
      flush();
      open = { line: at, lines: [line] };
    } else open.lines.push(line);
  }
  flush();
  return units;
}
/** Source units through the TypeScript AST: strings (cooked), templates, comments (leading and same-line trailing ranges), and identifiers as code. */
function sourceUnits(path: string, text: string): Unit[] {
  const kind = /\.(?:m|c)?jsx?$/.test(path) ? ts.ScriptKind.JS : path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const units: Unit[] = [];
  const seen = new Set<number>();
  const lineOf = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  const comments = (start: number, end: number): void => {
    for (const range of [...(ts.getLeadingCommentRanges(text, start) ?? []), ...(ts.getTrailingCommentRanges(text, end) ?? [])]) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      units.push({ line: lineOf(range.pos), kind: "comment", text: text.slice(range.pos, range.end) });
    }
  };
  const visit = (node: ts.Node): void => {
    if (node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode) return;
    comments(node.getFullStart(), node.getEnd());
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isRegularExpressionLiteral(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: node.text });
    } else if (ts.isTemplateExpression(node)) {
      const body = node.head.text + node.templateSpans.map(span => `\${${span.expression.getText(file)}}${span.literal.text}`).join("");
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: body });
    } else if ((ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && !ts.isTemplateExpression(node.parent) && !ts.isTemplateSpan(node.parent)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "string", text: node.text });
    } else if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      units.push({ line: lineOf(node.getStart(file)), kind: "code", text: node.text });
    }
    for (const child of node.getChildren(file)) visit(child);
  };
  visit(file);
  return units;
}
function unitsOf(path: string, text: string): Unit[] {
  if (path.endsWith(".md")) return markdownUnits(text);
  if (/\.(?:[cm]?tsx?|[cm]?jsx?)$/.test(path)) return sourceUnits(path, text);
  return text.split("\n").flatMap((line, index) => (line.trim() === "" ? [] : [{ line: index + 1, kind: "line" as const, text: line }]));
}

/** The matches of CITATION that sit outside every requirement-id spelling. */
function citations(text: string): string[] {
  const ids = [...text.matchAll(REQUIREMENT_ID)].map(match => [match.index, match.index + match[0].length] as const);
  return [...text.matchAll(CITATION)].filter(match => !ids.some(([from, to]) => match.index >= from && match.index < to)).map(match => match[0]);
}
/** Whether a text carries one of the grading patterns, not negated within the two words before it nor followed by "no longer"/"no more"/"anymore". */
function carriesAny(text: string, patterns: readonly RegExp[]): boolean {
  for (const pattern of patterns) {
    for (const hit of text.matchAll(pattern)) {
      const before = text
        .slice(0, hit.index)
        .split(/\s+/)
        .filter(word => word.length > 0)
        .slice(-2)
        .join(" ");
      if (!STATUS_NEGATION_BEFORE.test(before) && !STATUS_NEGATION_AFTER.test(text.slice(hit.index + hit[0].length))) return true;
    }
  }
  return false;
}
/** The raw text with every grading span blanked (same length), so a grading's own words never guard or feed the predicate judges. */
function blankGradings(text: string): string {
  let blanked = text;
  for (const pattern of [...DESIGN_ONLY_PATTERNS, ...RECORD_PATTERNS, ...ASYNC_PATTERNS]) blanked = blanked.replace(pattern, hit => " ".repeat(hit.length));
  return blanked;
}
/** Clauses: split at a semicolon, or a sentence end followed by whitespace, outside parentheses (CLAUSE_SPLIT). */
function clausesOf(text: string): string[] {
  const clauses: string[] = [];
  let depth = 0;
  let start = 0;
  for (let at = 0; at < text.length; at += 1) {
    const char = text.charAt(at);
    if (char === "(") depth += 1;
    else if (char === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && (char === ";" || (/[.!?]/.test(char) && /\s/.test(text.charAt(at + 1))))) {
      clauses.push(text.slice(start, at + 1));
      start = at + 1;
    }
  }
  clauses.push(text.slice(start));
  return clauses;
}
/** Whether a clause states one of the predicate words unguarded (no GUARD word before it in the clause, no GUARD_AFTER word after it). */
function predicated(clause: string, predicate: RegExp): boolean {
  for (const word of clause.matchAll(predicate)) {
    if (GUARD.test(clause.slice(0, word.index)) || GUARD_AFTER.test(clause.slice(word.index + word[0].length))) continue;
    return true;
  }
  return false;
}
/** The record subjects a text presents as existing, and whether it presents the asynchronous-attempt-semantics claims as established. */
function predicateClaims(text: string): string[] {
  const claimed = new Set<string>();
  for (const clause of clausesOf(blankGradings(text))) {
    for (const subject of [...RECORDS, CAC_RECORD]) if (subject.pattern.test(clause) && predicated(clause, EXISTS)) claimed.add(`exists:${subject.id}`);
    if (ASYNC.pattern.test(clause) && predicated(clause, ESTABLISHED)) claimed.add(`established:${ASYNC.id}`);
  }
  return [...RECORDS, CAC_RECORD].map(subject => `exists:${subject.id}`).concat(`established:${ASYNC.id}`).filter(cause => claimed.has(cause));
}
/** The NFR-08 labels a text carries, not negated within the two words before them, in LABELS order. */
function labelsOf(text: string): string[] {
  const found = new Set<string>();
  for (const hit of text.matchAll(LABEL)) {
    const before = text
      .slice(0, hit.index)
      .split(/\s+/)
      .filter(word => word.length > 0)
      .slice(-2)
      .join(" ");
    if (!STATUS_NEGATION_BEFORE.test(before)) found.add(hit[0].toLowerCase());
  }
  return LABELS.filter(label => found.has(label));
}
/** One unit's verdict: whether it cites (raw text), and its causes - its gradings and label read on its carrier view, its predicate claims on the raw text. */
function judgeUnit(unit: Unit): { cites: boolean; causes: string[] } {
  if (citations(unit.text).length === 0) return { cites: false, causes: [] };
  if (unit.kind === "code") return { cites: true, causes: ["code"] };
  const view = unit.view?.() ?? { text: unit.text, opaque: false };
  const shown = view.opaque ? "" : view.text;
  const causes: string[] = [];
  if (!carriesAny(shown, DESIGN_ONLY_PATTERNS)) causes.push("unqualified");
  if (RECORDS.some(record => record.pattern.test(unit.text)) && !carriesAny(shown, RECORD_PATTERNS)) causes.push("record-status");
  if (ASYNC.pattern.test(unit.text) && !carriesAny(shown, ASYNC_PATTERNS)) causes.push("async-status");
  causes.push(...predicateClaims(unit.text));
  if (unit.kind === "line" && TABLE_ROW.test(unit.text)) {
    const labels = labelsOf(shown);
    if (labels.length === 0) causes.push("unlabelled");
    else if (labels.includes("shipped")) causes.push("label:shipped");
  }
  return { cites: true, causes };
}
interface FileText {
  readonly path: string;
  readonly text: string;
}
interface Judgement {
  readonly units: number;
  readonly citing: readonly string[];
  readonly bindings: readonly Binding[];
  readonly findings: readonly string[];
}
function squeezed(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
function judgeFiles(files: readonly FileText[]): Judgement {
  let units = 0;
  const citing: string[] = [];
  const bindings: Binding[] = [];
  const findings: string[] = [];
  for (const file of files) {
    for (const unit of unitsOf(file.path, file.text)) {
      units += 1;
      const verdict = judgeUnit(unit);
      if (verdict.cites) {
        citing.push(`${file.path}:${unit.line}`);
        bindings.push({ path: file.path, text: squeezed(unit.text) });
      }
      for (const cause of verdict.causes) findings.push(`${file.path}:${unit.line} ${cause}`);
    }
  }
  return { units, citing, bindings, findings };
}
/** Causes of one control text read as a whole file at a path. */
function causesOf(path: string, text: string): string[] {
  return judgeFiles([{ path, text }]).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
}
function sameBinding(left: Binding, right: Binding): boolean {
  return left.path === right.path && left.text === right.text;
}
/** The citing units no binding row holds. */
function unboundOf(citing: readonly Binding[], bound: readonly Binding[]): Binding[] {
  return citing.filter(entry => !bound.some(row => sameBinding(row, entry)));
}
/** The binding rows no citing unit still matches (a stale row). */
function staleOf(citing: readonly Binding[], bound: readonly Binding[]): Binding[] {
  return bound.filter(row => !citing.some(entry => sameBinding(row, entry)));
}

function admits(scope: Scope, path: string): boolean {
  return (scope.under === "" || path.startsWith(`${scope.under}/`)) && path.endsWith(scope.extension) && !scope.exclude.some(prefix => path.startsWith(prefix));
}
/** git's tracked list of a scope under a root (the working tree's index, or a tree-ish at REPO). */
function scopeList(root: string, scope: Scope, treeish?: string): string[] {
  const args = treeish === undefined ? ["ls-files", "-z"] : ["ls-tree", "-r", "-z", "--name-only", treeish];
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path.length > 0 && admits(scope, path))
    .sort();
}
/** The scope's walk root read from the filesystem: the outside anchor of git's list under that root. */
function scopeWalk(root: string, scope: Scope): string[] {
  return readdirSync(join(root, scope.walk), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(root, join(entry.parentPath, entry.name)))
    .filter(path => admits(scope, path))
    .sort();
}
/** Every blob of a tree-ish's paths through one git cat-file --batch call. */
function treeTexts(treeish: string, paths: readonly string[]): FileText[] {
  const out = execFileSync("git", ["cat-file", "--batch"], { cwd: REPO, input: `${paths.map(path => `${treeish}:${path}`).join("\n")}\n`, maxBuffer: 512 * 1024 * 1024 });
  const files: FileText[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(10, at);
    const header = out.subarray(at, end).toString("utf8").split(" ");
    if (header[1] !== "blob") throw new Error(`${treeish}:${path} is not a blob (${header.join(" ")})`);
    const size = Number(header[2]);
    files.push({ path, text: out.subarray(end + 1, end + 1 + size).toString("utf8") });
    at = end + 1 + size + 1;
  }
  return files;
}
/** readScope: git's list of a scope under a root, every file read and judged, then the plants judged by the same call. */
function readScope(root: string, scope: Scope, plants: readonly FileText[] = []): Judgement & { files: readonly string[] } {
  const files = scopeList(root, scope);
  return { files, ...judgeFiles([...files.map(path => ({ path, text: readFileSync(join(root, path), "utf8") })), ...plants]) };
}

const PLANT_MD = [
  "# Plant",
  "",
  `The Furnace ${PROGRAM} program is design-only.`,
  "",
  `Pi reads the ${PROGRAM} program.`,
  "",
  `${SECOND.spelling} (design-only) ships in Pi.`,
  "",
  `| ${PROGRAM} | design-only |`,
  "",
  `The ${PROGRAM} program (design-only) proved its asynchronous attempt semantics.`,
  "",
].join("\n");
const PLANT_TS = [
  `// The Furnace ${PROGRAM} program is design-only.`,
  `export const NOTE = "Pi reads the ${PROGRAM} program.";`,
  `export const CLAIM = "${SECOND.spelling} (design-only) ships in Pi.";`,
  "export type FurnaceAttemptCapabilityV0 = { readonly attempt: string };",
  "",
].join("\n");
const PLANTS: Readonly<Record<"documents" | "receipts" | "strings", FileText>> = {
  documents: { path: "docs/workbench/zz-wb-dqf.2-plant.md", text: PLANT_MD },
  receipts: { path: "docs/workbench/receipts/zz-wb-dqf.2-plant.md", text: PLANT_MD },
  strings: { path: "src/zz-wb-dqf.2-plant.ts", text: PLANT_TS },
};

interface Control {
  readonly id: string;
  readonly path?: string;
  readonly text: string;
  readonly causes: readonly string[];
}
/** Judges each control at its path (a docs page by default) and asserts its causes; returns the readings for the witness. */
function controlsHold(controls: readonly Control[]): { id: string; causes: string[] }[] {
  return controls.map(control => {
    const causes = causesOf(control.path ?? "docs/workbench/x.md", control.text);
    expect(causes, `${control.id}: its causes`).toEqual([...control.causes]);
    return { id: control.id, causes };
  });
}
/** A residual's quiet row (the wb-3cql F1 reading): its witness carries its own probe beside its causes, so a row swapped for another's reds. */
function quiet(path: string, text: string, why: string): JsonValue {
  const causes = causesOf(path, text);
  expect(causes, why).toEqual([]);
  return json({ path, text, causes });
}
/** A quiet row's probe, read back from its witness (re-judged where the witness is compared). */
function probeOf(witness: JsonValue): { path: string; text: string; causes: unknown } | undefined {
  if (!isObject(witness) || typeof witness.path !== "string" || typeof witness.text !== "string" || !Object.hasOwn(witness, "causes")) return undefined;
  return { path: witness.path, text: witness.text, causes: witness.causes };
}
/** A plant's findings, its path stripped (the witness never holds a live line number). */
function plantCauses(findings: readonly string[], plant: FileText): string[] {
  return findings.filter(finding => finding.startsWith(`${plant.path}:`)).map(finding => finding.slice(plant.path.length + 1));
}
/** One scope leg: git's list (its walk root equal to the filesystem walk), the floors, the liveness anchors, then the plant judged by the same call. */
function scopeLeg(id: ScopeId, plant: FileText, liveness: (files: readonly string[]) => JsonValue): JsonValue {
  const scope = SCOPES[id];
  const listed = scopeList(REPO, scope);
  expect(
    listed.filter(path => path.startsWith(`${scope.walk}/`)),
    `${scope.walk}/: git's tracked list is the filesystem walk, both ways`,
  ).toEqual(scopeWalk(REPO, scope));
  expect(listed.length, `floor: ${FLOORS[id].files} files at this census's base`).toBeGreaterThanOrEqual(FLOORS[id].files);
  const reading = readScope(REPO, scope, [plant]);
  expect(reading.files, "readScope reads git's tracked list").toEqual(listed);
  expect(reading.units, `floor: ${FLOORS[id].units} units at this census's base`).toBeGreaterThanOrEqual(FLOORS[id].units);
  const own = reading.findings.filter(finding => finding.startsWith(`${plant.path}:`));
  expect(reading.findings, "the only findings are the plant's: no tracked unit fails a grading, a predicate or a label").toEqual(own);
  const tracked = reading.bindings.filter(entry => entry.path !== plant.path);
  expect(unboundOf(tracked, BOUND), "no tracked unit cites the program outside BOUND").toEqual([]);
  return json({
    scope: scope.id,
    word: scope.word,
    walk: scope.walk,
    walkIsTracked: true,
    floor: FLOORS[id].files,
    unitFloor: FLOORS[id].units,
    liveness: liveness(listed),
    plantCiting: reading.citing.filter(entry => entry.startsWith(`${plant.path}:`)),
    plantUnbound: unboundOf(
      reading.bindings.filter(entry => entry.path === plant.path),
      BOUND,
    ).length,
    findings: reading.findings,
  });
}

/** The bead's own row in the tracker export. */
function beadRow(bead: string): { title: string; notes: string } {
  for (const line of textOf(EXPORT).split("\n")) {
    if (!line.includes(`"id":"${bead}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === bead && typeof row.title === "string") return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  return { title: "", notes: "" };
}
/** The owner filing's status paragraph: the first notes line that opens "Program status at the pin: " (later appended notes never move it). */
function filingOf(notes: string): string {
  return notes.split("\n").find(line => line.startsWith("Program status at the pin: ")) ?? "";
}
/** The statement's three segments: the title after its requirement id, split at its two dash separators (the export spells each as the six characters backslash-u-2014; a real em dash reads the same). */
function segmentsOf(title: string): string[] {
  return title.replace(/^\[[A-Z-]+-R\d+\] /, "").split(/ (?:\\u2014|—) /);
}
/** The quotes tile the clause in order, with nothing but separators (whitespace, comma, semicolon, colon, parentheses) between. */
function tiles(clause: string, quotes: readonly string[]): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = clause.indexOf(quote, at);
    if (found < 0 || !/^[\s,;:()]*$/.test(clause.slice(at, found))) return false;
    at = found + quote.length;
  }
  return /^[\s,;:()]*$/.test(clause.slice(at));
}

/** The receipt anchor's digest: the sha-256 of a text's UTF-8 bytes, as lowercase hex. */
function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
const isHeading = (token: Token): token is Tokens.Heading => token.type === "heading";
/**
 * The tables of a receipt's last dated entry (the part after its last level-2 heading), each as its header row then its body rows of
 * cell texts, read through marked's tokens: a table only the raw markup holds - inside an HTML comment or a code block - is no
 * table, and a table before the first level-2 heading belongs to no entry.
 */
function anchorTables(text: string): string[][][] {
  const tokens = marked.lexer(text);
  const entries = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 ? [index] : []));
  const last = entries.at(-1);
  if (last === undefined) return [];
  return tokens
    .slice(last + 1)
    .filter(isTable)
    .map(table => [table.header.map(cell => cell.text), ...table.rows.map(row => row.map(cell => cell.text))]);
}
/**
 * The prose of a receipt's last dated entry (the part after its last level-2 heading): each top-level paragraph and each item of a
 * top-level list, in order, read through marked's tokens by shownText (the carrier view's reading: a code span shows its code, the
 * unshown types - struck text among them - show nothing, and a raw HTML element makes its block opaque, so the block reads as
 * nothing) and whitespace-squeezed. Prose only the raw markup holds - inside an HTML comment or a code block - is no prose, and
 * prose before the first level-2 heading belongs to no entry.
 */
function anchorProse(text: string): string[] {
  const tokens = marked.lexer(text);
  const entries = tokens.flatMap((token, index) => (isHeading(token) && token.depth === 2 ? [index] : []));
  const last = entries.at(-1);
  if (last === undefined) return [];
  return tokens
    .slice(last + 1)
    .flatMap(token => (isList(token) ? token.items.map(item => item.tokens) : token.type === "paragraph" ? [[token]] : []))
    .flatMap(block => {
      const view = { opaque: false };
      const shown = shownText(block, " ", view).replace(/\s+/g, " ").trim();
      return view.opaque ? [] : [shown];
    });
}
/** The witness rules a receipt's last dated entry states: each prose block opening with ANCHOR's rule lead, read past it, one closing period dropped. */
function anchorRules(text: string): string[] {
  return anchorProse(text).flatMap(block => (block.startsWith(ANCHOR.rule) ? [block.slice(ANCHOR.rule.length).replace(/\.$/, "")] : []));
}
/** A source file's header as its reader sees it: the leading doc comment, each line's comment prefix removed, whitespace-squeezed. */
function headerOf(source: string): string {
  const end = source.startsWith("/**") ? source.indexOf("*/") : -1;
  return end < 0 ? "" : source.slice(3, end).replace(/^[ \t]*\* ?/gm, "").replace(/\s+/g, " ").trim();
}

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each non-pin case's own end, in run order, as `${id}:${assertion count}` (ENDS): an early return leaves it unrecorded, a cut tail short. */
const ENDS: string[] = [];
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;

/** A compliant citation of every subject: the program, both records, the asynchronous-attempt-semantics claims. */
const COMPLIANT = `Pi cites the ${PROGRAM} program (design-only): ${SECOND.spelling} is proposed, not shipped, and its asynchronous attempt semantics are targets for proof/measurement.`;
const QUALIFIER = "(design-only; proposed, not shipped)";

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  A1: () =>
    scopeLeg("documents", PLANTS.documents, files => {
      const nfr = unitsOf(NFR_PAGE, textOf(NFR_PAGE)).find(unit => unit.text.includes("NFR-08: Every feature is labeled"));
      expect(nfr?.line, `the NFR-08 sentence is the unit at ${NFR_PAGE}:${NFR_LINE}`).toBe(NFR_LINE);
      const receipts = files.filter(path => path.startsWith(RECEIPTS));
      const misses = receipts.filter(path => {
        const bead = (path.split("/").pop() ?? "").replace(/\.md$/, "");
        return !(unitsOf(path, textOf(path))[0]?.text ?? "").startsWith(`# ${bead}: `);
      });
      expect(misses, "every receipt opens with its rule-15 first line '# <bead>: '").toEqual([]);
      expect(receipts.length, `floor: ${FLOORS.receipts} receipts`).toBeGreaterThanOrEqual(FLOORS.receipts);
      expect((unitsOf("README.md", textOf("README.md"))[0]?.text ?? "").startsWith("# "), "README.md opens with a level-1 heading unit").toBe(true);
      return { nfr08Line: nfr?.line ?? 0, receiptTitles: misses.length === 0, readmeH1: true };
    }),
  A2: () =>
    scopeLeg("strings", PLANTS.strings, files => {
      const holders = files.filter(path => textOf(path).includes(SCHEMA_LITERAL) && unitsOf(path, textOf(path)).some(unit => unit.kind === "string" && unit.text === SCHEMA_LITERAL));
      expect(holders, `the schema literal "${SCHEMA_LITERAL}" is a string unit of ${IDENTITY} only`).toEqual([IDENTITY]);
      const kinds = [...new Set(unitsOf(IDENTITY, textOf(IDENTITY)).map(unit => unit.kind))].sort();
      expect(kinds, "identity.ts yields string, comment and code units").toEqual(["code", "comment", "string"]);
      return { schemaLiteralHolders: holders, identityUnitKinds: kinds };
    }),
  A3: () => {
    const controls: Control[] = [
      { id: "program", text: `Pi reads ${PROGRAM} (design-only).`, causes: [] },
      { id: "program-bare", text: `Pi reads ${PROGRAM}.`, causes: ["unqualified"] },
      { id: "title-case", text: "The CAC Execution Assurance program.", causes: ["unqualified"] },
      { id: "underscore", text: "The cac_execution_assurance program.", causes: ["unqualified"] },
      { id: "upper", text: "The CAC-EXECUTION-ASSURANCE program.", causes: ["unqualified"] },
      { id: "glued", text: "The cacexecutionassurance program.", causes: ["unqualified"] },
      { id: "line-wrapped", text: "The cac-execution-\nassurance program.", causes: ["unqualified"] },
      { id: "cac-execution-alone", text: "The CAC execution notes.", causes: ["unqualified"] },
      { id: "execution-assurance-alone", text: "Furnace's execution assurance design.", causes: ["unqualified"] },
      { id: "record-without-v0", text: `The ${SECOND.stem} record ${QUALIFIER}.`, causes: [] },
      { id: "requirement-id", text: "FURNACE-CAC-EXECUTION-ASSURANCE-R7 binds Pi.", causes: [] },
      { id: "requirement-id-and-program", text: `FURNACE-CAC-EXECUTION-ASSURANCE-R7 names ${PROGRAM}.`, causes: ["unqualified"] },
      { id: "lowercase-id", text: "The furnace-cac-execution-assurance-r7 slug.", causes: ["unqualified"] },
      { id: "epic-slug", text: "The furnace-cac-execution-assurance obligations.", causes: ["unqualified"] },
      { id: "other-cac", text: "Forge's CAC evidence assurance names ForgeCACReceiptV0.", causes: [] },
      { id: "plain-furnace", text: "Furnace owns attempt lifecycle and execution logs.", causes: [] },
    ];
    for (const needle of NEEDLES) expect(citations(needle).length, `the needle ${needle} cites`).toBe(1);
    return json({ program: PROGRAM, needles: NEEDLES, controls: controlsHold(controls) });
  },
  A4: () => {
    const controls: Control[] = [
      { id: "every-grading", text: COMPLIANT, causes: [] },
      { id: "design-paraphrase", text: `${PROGRAM} is a design program only.`, causes: ["unqualified"] },
      { id: "record-paraphrase", text: `${SECOND.spelling} (design-only) is unreleased.`, causes: ["record-status"] },
      { id: "record-half-proposed", text: `${SECOND.spelling} (design-only) is proposed.`, causes: ["record-status"] },
      { id: "record-half-not-shipped", text: `${SECOND.spelling} (design-only) is not shipped.`, causes: ["record-status"] },
      { id: "async-paraphrase", text: `${PROGRAM} (design-only): asynchronous attempt semantics are open research.`, causes: ["async-status"] },
      { id: "async-half", text: `${PROGRAM} (design-only): asynchronous attempt semantics are targets for proof.`, causes: ["async-status"] },
      { id: "every-grading-missing", text: "Pi reads FurnaceAttemptCapabilityV0 and its asynchronous attempt semantics.", causes: ["unqualified", "record-status", "async-status"] },
    ];
    return json({ designOnly: DESIGN_ONLY, recordStatus: RECORD_STATUS, asyncStatus: ASYNC_STATUS, controls: controlsHold(controls) });
  },
  B1: () => {
    const cite = PROGRAM;
    const controls: Control[] = [
      { id: "lower", text: `${cite} is design-only.`, causes: [] },
      { id: "capital", text: `Design-only: ${cite}.`, causes: [] },
      { id: "upper", text: `${cite}: DESIGN-ONLY.`, causes: [] },
      { id: "absent", text: `${cite} is a design.`, causes: ["unqualified"] },
      { id: "unhyphenated", text: `${cite} is design only.`, causes: ["unqualified"] },
      { id: "not", text: `${cite} is not design-only.`, causes: ["unqualified"] },
      { id: "not-purely", text: `${cite} is not purely design-only.`, causes: ["unqualified"] },
      { id: "no-longer", text: `${cite} is no longer design-only.`, causes: ["unqualified"] },
      { id: "trailing-no-longer", text: `${cite} was design-only no longer.`, causes: ["unqualified"] },
      { id: "prefixed", text: `${cite} is non-design-only.`, causes: ["unqualified"] },
      { id: "suffixed", text: `${cite} is design-only-ish.`, causes: ["unqualified"] },
      { id: "negation-elsewhere", text: `Pi does not treat the design-only ${cite} program as shipped.`, causes: [] },
      { id: "one-of-two", text: `${cite} is not design-only; it is design-only.`, causes: [] },
      { id: "comment", text: `Pi reads the ${cite} program. <!-- design-only -->`, causes: ["unqualified"] },
      { id: "link-destination", text: `Pi reads the [${cite} program](https://example.invalid/design-only).`, causes: ["unqualified"] },
      { id: "link-title", text: `Pi reads the [${cite} program](https://example.invalid "design-only").`, causes: ["unqualified"] },
      { id: "image-alt", text: `![design-only](status.png) Pi reads the ${cite} program.`, causes: ["unqualified"] },
      { id: "definition", text: `[s]: https://example.invalid/design-only\nPi reads the [${cite} program][s].`, causes: ["unqualified"] },
      { id: "element", text: `Pi reads the ${cite} program. <span hidden>design-only</span>`, causes: ["unqualified"] },
      { id: "struck", text: `${cite} is ~~design-only~~.`, causes: ["unqualified"] },
      { id: "footnote-label", text: `Pi reads the ${cite} program[^design-only].\n\n[^design-only]: A note.`, causes: ["unqualified"] },
      { id: "hidden-citation", text: `<!-- ${cite} is design-only. -->`, causes: ["unqualified"] },
      { id: "shown-link-text", text: `${cite} is [design-only](https://example.invalid).`, causes: [] },
      { id: "shown-code-span", text: `${cite} is \`design-only\`.`, causes: [] },
      { id: "shown-emphasis", text: `${cite} is design-*only*.`, causes: [] },
      { id: "src-string", path: "src/x.ts", text: `export const A = "${cite} (design-only)";`, causes: [] },
      { id: "src-comment-neighbour", path: "src/x.ts", text: `// design-only\nexport const A = "${cite}";`, causes: ["unqualified"] },
    ];
    return json({ word: DESIGN_ONLY, controls: controlsHold(controls) });
  },
  B2: () => recordCase(0),
  B3: () => recordCase(1),
  B4: () => {
    const record = `${SECOND.spelling} (design-only)`;
    const controls: Control[] = [
      { id: "statement-form", text: `${record} is proposed, not shipped.`, causes: [] },
      { id: "wrapped", text: `${record} is proposed,\nnot shipped.`, causes: [] },
      { id: "capital", text: `${record}: Proposed, not shipped.`, causes: [] },
      { id: "duty-form", text: `${record} is proposed-not-shipped.`, causes: [] },
      { id: "producer-heading", text: `${record} sits under Proposed source-owned references (not shipped).`, causes: [] },
      { id: "no-comma", text: `${record} is proposed not shipped.`, causes: ["record-status"] },
      { id: "reordered", text: `${record} is not shipped, only proposed.`, causes: ["record-status"] },
      { id: "negated", text: `${record} is not proposed, not shipped.`, causes: ["record-status"] },
      { id: "no-longer", text: `${record} was proposed, not shipped no longer.`, causes: ["record-status"] },
      { id: "comment", text: `${record} <!-- proposed, not shipped -->`, causes: ["record-status"] },
      { id: "struck", text: `${record} is ~~proposed, not shipped~~.`, causes: ["record-status"] },
      { id: "link-title", text: `${record} is [listed](https://example.invalid "proposed, not shipped").`, causes: ["record-status"] },
      { id: "shown-emphasis", text: `${record} is *proposed, not shipped*.`, causes: [] },
      { id: "program-only", text: `${PROGRAM} (design-only) has proposed, not shipped records.`, causes: [] },
    ];
    return json({ spellings: RECORD_STATUS, controls: controlsHold(controls) });
  },
  B5: () => {
    const base = `${PROGRAM} (design-only):`;
    const controls: Control[] = [
      { id: "hyphenated", text: `${base} asynchronous-attempt-semantics claims are open.`, causes: ["async-status"] },
      { id: "spaced", text: `${base} asynchronous attempt semantics are open.`, causes: ["async-status"] },
      { id: "async-short", text: `${base} async-semantics claims are open.`, causes: ["async-status"] },
      { id: "async-attempt", text: `${base} async attempt semantics are open.`, causes: ["async-status"] },
      { id: "attempts", text: `${base} asynchronous attempts semantics are open.`, causes: ["async-status"] },
      { id: "graded", text: `${base} asynchronous attempt semantics are targets for proof/measurement.`, causes: [] },
      { id: "not-semantics", text: `${base} asynchronous attempts are retried.`, causes: [] },
      { id: "sequential", text: `${base} sequential attempt semantics are fixed.`, causes: [] },
      { id: "uncited", text: "Asynchronous attempt semantics are open.", causes: [] },
    ];
    return json({ subject: ASYNC.spelling, id: ASYNC.id, controls: controlsHold(controls) });
  },
  B6: () => {
    const claim = `${PROGRAM} (design-only): asynchronous attempt semantics are`;
    const controls: Control[] = [
      { id: "statement-form", text: `${claim} targets for proof/measurement.`, causes: [] },
      { id: "producer-emphasis", text: `${claim} *targets for proof/measurement* and are not established by finite sequential theorems.`, causes: [] },
      { id: "duty-form", text: `${claim} targets-for-proof.`, causes: [] },
      { id: "wrapped", text: `${claim} targets for\nproof/measurement.`, causes: [] },
      { id: "half", text: `${claim} targets for proof.`, causes: ["async-status"] },
      { id: "paraphrase", text: `${claim} research targets.`, causes: ["async-status"] },
      { id: "negated", text: `${claim} not targets for proof/measurement.`, causes: ["async-status"] },
      { id: "comment", text: `${claim} open. <!-- targets for proof/measurement -->`, causes: ["async-status"] },
      { id: "link-title", text: `${claim} [open](https://example.invalid "targets for proof/measurement").`, causes: ["async-status"] },
    ];
    return json({ spellings: ASYNC_STATUS, controls: controlsHold(controls) });
  },
  B7: () => {
    const graded = `${PROGRAM} (design-only): asynchronous attempt semantics claims are targets for proof/measurement`;
    const controls: Control[] = [
      { id: "never", text: `${graded}, never established results.`, causes: [] },
      { id: "not-established", text: `${graded} and are not established by finite sequential theorems.`, causes: [] },
      { id: "established", text: `${graded}; asynchronous attempt semantics are established results.`, causes: ["established:async-semantics"] },
      { id: "graded-then-established", text: `${PROGRAM} (design-only): asynchronous attempt semantics (targets for proof/measurement) are established.`, causes: ["established:async-semantics"] },
      { id: "proven", text: `${PROGRAM} (design-only): the asynchronous attempt semantics are proven (targets for proof/measurement).`, causes: ["established:async-semantics"] },
      { id: "verified", text: `${PROGRAM} (design-only): async-semantics claims are verified (targets-for-proof).`, causes: ["established:async-semantics"] },
      { id: "once", text: `${PROGRAM} (design-only): once proved, asynchronous attempt semantics claims stay targets for proof/measurement.`, causes: [] },
      { id: "would", text: `${PROGRAM} (design-only): asynchronous attempt semantics would be established by measurement (targets for proof/measurement).`, causes: [] },
      { id: "pronoun", text: `${graded}; they are established results.`, causes: [] },
    ];
    return json({ word: "established", vocabulary: ESTABLISHED.source, controls: controlsHold(controls) });
  },
  Z1: () => {
    expect(BOUND, "BOUND holds no binding row: the until-state").toEqual([]);
    const file: FileText = { path: "docs/workbench/x.md", text: `${COMPLIANT}\n` };
    const reading = judgeFiles([file]);
    expect(reading.findings, "a compliant citation reads content-quiet").toEqual([]);
    const unbound = unboundOf(reading.bindings, BOUND);
    expect(unbound, "while BOUND is empty, the compliant citation is unbound").toEqual(reading.bindings);
    const overlay = unboundOf(reading.bindings, [...BOUND, ...reading.bindings]);
    expect(overlay, "with its row in BOUND, it is bound").toEqual([]);
    return json({ bound: [...BOUND], compliantCiting: reading.citing.length, unboundWhileEmpty: unbound.length, unboundWithRow: overlay.length });
  },
  Z2: () => {
    const readings = SCOPE_IDS.map(id => readScope(REPO, SCOPES[id]));
    for (const [index, id] of SCOPE_IDS.entries()) expect(readings[index]?.units, `${id}: units read`).toBeGreaterThanOrEqual(FLOORS[id].units);
    const citing = readings.flatMap(reading => reading.bindings);
    expect(unboundOf(citing, BOUND), "every citing unit of the real tree is a BOUND row").toEqual([]);
    expect(staleOf(citing, BOUND), "every BOUND row is still a citing unit").toEqual([]);
    expect(citing.length, "the mentions are exactly the BOUND rows: zero today").toBe(BOUND.length);
    return json({ scopes: [...SCOPE_IDS], mentions: citing.length, bound: BOUND.length, unbound: [], stale: [] });
  },
  M1: () => {
    expect(CITATION.source, "CITATION is the needles' word-reading").toBe(citationSource(NEEDLES));
    expect(CITATION.flags, "read case-insensitively").toBe("gi");
    for (const needle of NEEDLES) expect(citations(needle), `${needle} cites once`).toHaveLength(1);
    const controls: Control[] = [
      { id: "spaced-record", text: `The Furnace ${SECOND.words} ${QUALIFIER}.`, causes: [] },
      { id: "snake-record", text: `The furnace_attempt_capability ${QUALIFIER}.`, causes: [] },
      { id: "spaced-record-bare", text: `The Furnace ${SECOND.words}.`, causes: ["unqualified", "record-status"] },
      { id: "cac-execution", text: "CAC-Execution notes.", causes: ["unqualified"] },
      { id: "execution-assurance", text: "Execution Assurance notes.", causes: ["unqualified"] },
      { id: `${SECOND.id}-alone`, text: `An ${SECOND.words} for Pi.`, causes: [] },
      { id: "attempt-capability-alone", text: "An attempt capability for Pi.", causes: [] },
    ];
    return json({ needles: NEEDLES, citation: CITATION.source, controls: controlsHold(controls) });
  },
  M2: () => {
    const paths = execFileSync("git", ["ls-tree", "-r", "-z", "--name-only", FILING_PIN], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
      .split("\0")
      .filter(path => path.length > 0 && !path.startsWith(".beads/"))
      .sort();
    expect(paths.length, "the filing pin's tracked paths outside .beads/ (a fixed tree)").toBe(PIN_PATHS);
    const texts = treeTexts(FILING_PIN, paths);
    const hits = texts.filter(file => [...file.text.matchAll(CITATION)].length > 0).map(file => file.path);
    expect(hits, "git grep over the filing pin's working tree outside .beads/: zero hits").toEqual([]);
    const scoped = texts.filter(file => SCOPE_IDS.some(id => admits(SCOPES[id], file.path)));
    const reading = judgeFiles([...scoped, PLANTS.documents]);
    expect(
      reading.citing.filter(entry => !entry.startsWith(`${PLANTS.documents.path}:`)),
      "no unit of the two scopes cites the program at the filing pin",
    ).toEqual([]);
    expect(reading.findings, "the same call judges the plant").toEqual(reading.findings.filter(finding => finding.startsWith(`${PLANTS.documents.path}:`)));
    expect(reading.units, "the readers' exact unit count at the fixed pin tree (content liveness)").toBe(PIN_UNITS);
    return json({ pin: FILING_PIN, paths: paths.length, hits, units: reading.units, plantFindings: plantCauses(reading.findings, PLANTS.documents) });
  },
  D1: () => {
    const root = makeScratch("wb-dqf.2-future-");
    try {
      const write = (path: string, text: string): void => {
        mkdirSync(dirname(join(root, path)), { recursive: true });
        writeFileSync(join(root, path), text);
      };
      const mutant = `Pi consumes the shipped ${SECOND.spelling} record.`;
      const twin = `Pi consumes nothing from ${SECOND.spelling} ${QUALIFIER}.`;
      const paths = { page: "docs/workbench/future.md", traceability: TRACEABILITY, receipt: "docs/workbench/receipts/wb-future.md", source: "src/future.ts" } as const;
      const files = (text: string): Readonly<Record<keyof typeof paths, string>> => ({
        page: `# Future\n\n${text}\n`,
        traceability: `# Traceability\n\n${text}\n`,
        receipt: `# wb-future: Future\n\n${text}\n`,
        source: `export const FUTURE = ${JSON.stringify(text)};\n`,
      });
      execFileSync("git", ["init", "-q"], { cwd: root });
      const commit = (text: string): { documents: Judgement & { files: readonly string[] }; strings: Judgement & { files: readonly string[] } } => {
        const bodies = files(text);
        for (const key of Object.keys(paths) as (keyof typeof paths)[]) write(paths[key], bodies[key]);
        execFileSync("git", ["add", "-A"], { cwd: root });
        return { documents: readScope(root, SCOPES.documents), strings: readScope(root, SCOPES.strings) };
      };
      const flagged = commit(mutant);
      expect(flagged.documents.files, "readScope lists the committed documents through git").toEqual([paths.page, paths.receipt, paths.traceability].sort());
      expect(flagged.strings.files, "readScope lists the committed source through git").toEqual([paths.source]);
      for (const id of SCOPE_IDS) expect(flagged[id].findings.length, `${id}: the future citation fails the census`).toBeGreaterThan(0);
      const quietTwin = commit(twin);
      for (const id of SCOPE_IDS) expect(quietTwin[id].findings, `${id}: the graded twin is content-quiet`).toEqual([]);
      const unbound = SCOPE_IDS.flatMap(id => unboundOf(quietTwin[id].bindings, BOUND));
      expect(unbound.length, "and every graded twin is unbound while BOUND is empty").toBe(4);
      return json({ flagged: SCOPE_IDS.map(id => flagged[id].findings), quiet: SCOPE_IDS.map(id => quietTwin[id].findings), unboundTwins: unbound.length });
    } finally {
      removeScratch(root);
    }
  },
  D2: () => {
    const pages = scopeList(REPO, SCOPES.documents).filter(path => path.startsWith(WORKBENCH) && !path.startsWith(RECEIPTS));
    const workbench = execFileSync("git", ["ls-files", "-z", "--", "docs/workbench"], { cwd: REPO, encoding: "utf8" })
      .split("\0")
      .filter(path => path.length > 0 && !path.startsWith(RECEIPTS))
      .sort();
    expect(pages, "the documents scope holds every docs/workbench page outside receipts/").toEqual(workbench);
    expect(pages.length, `floor: ${FLOORS.workbench} docs/workbench pages`).toBeGreaterThanOrEqual(FLOORS.workbench);
    const live = textOf(FEATURE_MATRIX);
    expect(causesOf(FEATURE_MATRIX, live), "the live feature matrix reads clean").toEqual([]);
    const row = `| Furnace ${PROGRAM} adapter (design-only) | shipped | none |`;
    const planted = `${live.replace(/\n*$/, "\n")}\n${row}\n`;
    const findings = judgeFiles([{ path: FEATURE_MATRIX, text: planted }]).findings;
    const at = planted.split("\n").indexOf(row) + 1;
    expect(findings, "the appended docs/workbench row is the page's only finding").toEqual([`${FEATURE_MATRIX}:${at} label:shipped`]);
    return json({ scope: "docs/workbench", floor: FLOORS.workbench, page: FEATURE_MATRIX, causes: findings.map(finding => finding.slice(finding.indexOf(" ") + 1)) });
  },
  D3: () => {
    expect(scopeList(REPO, SCOPES.documents), "the documents scope lists the TRACEABILITY page").toContain(TRACEABILITY);
    const live = textOf(TRACEABILITY);
    expect(causesOf(TRACEABILITY, live), "the live TRACEABILITY page reads clean").toEqual([]);
    const entry = "| WB-999 | P2 | Pi projects FurnaceAttemptCapabilityV0 (design-only) refs. | none | planned |";
    const planted = `${live.replace(/\n*$/, "\n")}\n${entry}\n`;
    const findings = judgeFiles([{ path: TRACEABILITY, text: planted }]).findings;
    const at = planted.split("\n").indexOf(entry) + 1;
    expect(findings, "the appended TRACEABILITY entry is the page's only finding").toEqual([`${TRACEABILITY}:${at} record-status`]);
    return json({ page: TRACEABILITY, listed: true, causes: findings.map(finding => finding.slice(finding.indexOf(" ") + 1)) });
  },
  D4: () => {
    const files = scopeList(REPO, SCOPES.strings);
    let descriptors = 0;
    const unread: string[] = [];
    for (const path of files) {
      const text = textOf(path);
      const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      const strings = new Set(
        unitsOf(path, text)
          .filter(unit => unit.kind === "string")
          .map(unit => unit.text),
      );
      const visit = (node: ts.Node): void => {
        if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "description" && ts.isStringLiteral(node.initializer)) {
          descriptors += 1;
          if (!strings.has(node.initializer.text)) unread.push(`${path}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`);
        }
        ts.forEachChild(node, visit);
      };
      visit(file);
    }
    expect(descriptors, `floor: ${FLOORS.descriptors} src descriptor strings (description: "...")`).toBeGreaterThanOrEqual(FLOORS.descriptors);
    expect(unread, "every src descriptor string is a string unit the judges read").toEqual([]);
    const plant: FileText = { path: "src/zz-wb-dqf.2-descriptor.ts", text: 'export const TOOL = { name: "furnace_attempts", description: "Reads the FurnaceAttemptCapabilityV0 records." };\n' };
    const causes = causesOf(plant.path, plant.text);
    expect(causes, "a planted descriptor citing a record fails its gradings").toEqual(["unqualified", "record-status"]);
    return json({ descriptor: "description", floor: FLOORS.descriptors, unread, causes });
  },
  D5: () => {
    const receipts = scopeList(REPO, SCOPES.documents).filter(path => path.startsWith(RECEIPTS));
    const walked = scopeWalk(REPO, SCOPES.documents).filter(path => path.startsWith(RECEIPTS));
    expect(receipts, "the receipts git lists are the receipts on disk").toEqual(walked);
    expect(receipts.length, `floor: ${FLOORS.receipts} receipts`).toBeGreaterThanOrEqual(FLOORS.receipts);
    const reading = judgeFiles([...receipts.map(path => ({ path, text: textOf(path) })), PLANTS.receipts]);
    expect(reading.findings, "the only receipt findings are the plant's").toEqual(reading.findings.filter(finding => finding.startsWith(`${PLANTS.receipts.path}:`)));
    return json({ scope: "docs/workbench/receipts", floor: FLOORS.receipts, plantFindings: plantCauses(reading.findings, PLANTS.receipts) });
  },
  D6: () => {
    const controls: Control[] = [
      { id: "duty-forms", text: `${PROGRAM} (design-only): ${SECOND.spelling} is proposed-not-shipped; asynchronous attempt semantics are targets-for-proof.`, causes: [] },
      { id: "slash-list", text: `${PROGRAM}: design-only / proposed-not-shipped / targets-for-proof.`, causes: [] },
      { id: "record-and", text: `${PROGRAM} (design-only): ${SECOND.spelling} is proposed and not shipped.`, causes: ["record-status"] },
      { id: "record-underscore", text: `${PROGRAM} (design-only): ${SECOND.spelling} is proposed_not_shipped.`, causes: ["record-status"] },
      { id: "async-of", text: `${PROGRAM} (design-only): asynchronous attempt semantics are targets of proof.`, causes: ["async-status"] },
      { id: "async-spaced", text: `${PROGRAM} (design-only): asynchronous attempt semantics are targets for proof.`, causes: ["async-status"] },
    ];
    return json({ spellings: [DESIGN_ONLY, RECORD_STATUS[1] ?? "", ASYNC_STATUS[1] ?? ""], controls: controlsHold(controls) });
  },
  E1: () => {
    const controls: Control[] = [
      { id: "available", text: `${SECOND.spelling} ${QUALIFIER} is available in Pi.`, causes: [`exists:${SECOND.id}`] },
      { id: "not-available", text: `${SECOND.spelling} ${QUALIFIER} is not available in Pi.`, causes: [] },
      { id: "implemented", text: `FurnaceAttemptCapabilityV0 ${QUALIFIER} is implemented in Pi.`, causes: ["exists:attempt-capability"] },
      { id: "vendored", text: `Pi vendored FurnaceAttemptCapabilityV0 ${QUALIFIER}.`, causes: ["exists:attempt-capability"] },
      { id: "graded-then-wired", text: `${SECOND.spelling} (design-only, proposed, not shipped) is wired into Pi.`, causes: [`exists:${SECOND.id}`] },
      { id: "cac-record", text: `${PROGRAM} (design-only): a CAC record ships with Pi.`, causes: ["exists:cac-record"] },
      { id: "cac-record-negated", text: `${PROGRAM} (design-only): no CAC record ships with Pi.`, causes: [] },
      { id: "when", text: `When Furnace ships ${SECOND.spelling} ${QUALIFIER}, Pi reads it.`, causes: [] },
      { id: "nowhere", text: `${SECOND.spelling} ${QUALIFIER} exists nowhere in Pi.`, causes: [] },
    ];
    const plant: FileText = { path: "docs/workbench/zz-e1.md", text: `${SECOND.spelling} ${QUALIFIER} is wired into Pi.\n` };
    const reading = readScope(REPO, SCOPES.documents, [plant]);
    expect(reading.findings, "the documents walk judges the planted claim and nothing else").toEqual([`${plant.path}:1 exists:${SECOND.id}`]);
    return json({ subjects: [...RECORDS, CAC_RECORD].map(subject => subject.spelling), controls: controlsHold(controls), findings: reading.findings });
  },
  E2: () => {
    const claim = `${PROGRAM} (design-only): asynchronous attempt semantics`;
    const controls: Control[] = [
      { id: "established", text: `${claim} are established results (targets for proof/measurement).`, causes: ["established:async-semantics"] },
      { id: "proven-short", text: `${PROGRAM} (design-only): async-semantics claims are proven (targets-for-proof).`, causes: ["established:async-semantics"] },
      { id: "guaranteed", text: `${claim} are guaranteed in Pi (targets for proof/measurement).`, causes: ["established:async-semantics"] },
      { id: "not-established", text: `${claim} are targets for proof/measurement and are not established by finite sequential theorems.`, causes: [] },
      { id: "never", text: `${claim} are targets for proof/measurement, never established results.`, causes: [] },
    ];
    const plant: FileText = { path: "docs/workbench/zz-e2.md", text: `${claim} are verified in Pi (targets for proof/measurement).\n` };
    const reading = readScope(REPO, SCOPES.documents, [plant]);
    expect(reading.findings, "the documents walk judges the planted claim and nothing else").toEqual([`${plant.path}:1 established:async-semantics`]);
    return json({ subject: ASYNC.id, spelling: ASYNC.spelling, controls: controlsHold(controls), findings: reading.findings });
  },
  E3: () => {
    const exists = ["shipped", "ships", "exists", "existing", "wired", "implemented", "available", "landed", "released", "published", "live", "supported", "consumed", "vendored", "exported", "runs", "enforced"];
    const established = ["established", "proven", "proved", "verified", "guaranteed", "demonstrated", "confirmed"];
    const readsExists = exists.filter(word => causesOf("docs/workbench/x.md", `${SECOND.spelling} ${QUALIFIER} is ${word} here.`).includes(`exists:${SECOND.id}`));
    const readsEstablished = established.filter(word =>
      causesOf("docs/workbench/x.md", `${PROGRAM} (design-only): asynchronous attempt semantics are ${word} here (targets for proof/measurement).`).includes("established:async-semantics"),
    );
    expect(readsExists, "EXISTS reads every word of its vocabulary").toEqual(exists);
    expect(readsEstablished, "ESTABLISHED reads every word of its vocabulary").toEqual(established);
    const outside = ["projected", "described", "named", "cited"].filter(word => causesOf("docs/workbench/x.md", `${SECOND.spelling} ${QUALIFIER} is ${word} here.`).length > 0);
    expect(outside, "a predicate outside the vocabularies is not read").toEqual([]);
    return json({ anchors: ["shipped", "established"], exists: readsExists, established: readsEstablished, outside });
  },
  N1: () => {
    for (const label of LABELS) expect(labelsOf(`| ${label} |`), `the label ${label} is read`).toEqual([label]);
    const controls: Control[] = LABELS.map(label => ({ id: label, text: `| ${PROGRAM} (design-only) | ${label} |`, causes: label === "shipped" ? ["label:shipped"] : [] }));
    return json({ labels: LABELS, controls: controlsHold(controls) });
  },
  N2: () => {
    const lines = textOf(NFR_PAGE).split("\n");
    const sentence = /NFR-08: Every feature is labeled (\w+), (\w+), (\w+), or (\w+) with exact source of evidence\./;
    const holding = lines.flatMap((line, index) => (sentence.test(line) ? [index + 1] : []));
    expect(holding, `exactly one line of ${NFR_PAGE} states NFR-08, line ${NFR_LINE}`).toEqual([NFR_LINE]);
    const labels = sentence.exec(lines[NFR_LINE - 1] ?? "")?.slice(1) ?? [];
    expect(labels, "its labels are LABELS, in order").toEqual(LABELS);
    return json({ ref: `${NFR_PAGE}:${NFR_LINE}`, labels });
  },
  N3: () => {
    const controls: Control[] = [
      { id: "planned-row", text: `| ${PROGRAM} | design-only | planned |`, causes: [] },
      { id: "blocked-row", text: `| ${PROGRAM} | design-only | blocked |`, causes: [] },
      { id: "experimental-row", text: `| ${PROGRAM} | design-only | experimental |`, causes: [] },
      { id: "shipped-row", text: `| ${PROGRAM} | design-only | shipped |`, causes: ["label:shipped"] },
      { id: "shipped-and-planned", text: `| ${PROGRAM} | design-only | shipped, planned |`, causes: ["label:shipped"] },
      { id: "other-status", text: `| ${PROGRAM} | design-only | landed-gated |`, causes: ["unlabelled"] },
      { id: "negated-label", text: `| ${PROGRAM} | design-only | not planned |`, causes: ["unlabelled"] },
      { id: "graded-only", text: `| ${SECOND.spelling} | design-only; proposed, not shipped | none |`, causes: ["unlabelled"] },
      { id: "label-in-comment", text: `| ${PROGRAM} | design-only | <!-- planned --> |`, causes: ["unlabelled"] },
      { id: "non-citing-row", text: "| Forge gate | shipped |", causes: [] },
    ];
    return json({ unit: "table row", controls: controlsHold(controls) });
  },
  K1: () => {
    const path = "docs/workbench/07-native-integrations.md";
    const variant = (text: string, bound: readonly Binding[]): { causes: string[]; unbound: number } => {
      const reading = judgeFiles([{ path, text: `${text}\n` }]);
      return { causes: reading.findings.map(finding => finding.slice(finding.indexOf(" ") + 1)), unbound: unboundOf(reading.bindings, bound).length };
    };
    const unworded = `Pi reads ${SECOND.spelling} refs.`;
    const worded = `Pi reads ${SECOND.spelling} refs ${QUALIFIER}.`;
    const row: Binding = { path, text: squeezed(worded) };
    const readings = { unworded: variant(unworded, BOUND), worded: variant(worded, BOUND), wordedAndBound: variant(worded, [...BOUND, row]) };
    expect(readings.unworded, "without its wording the change fails its gradings and is unbound").toEqual({ causes: ["unqualified", "record-status"], unbound: 1 });
    expect(readings.worded, "with its wording it is content-quiet, still unbound").toEqual({ causes: [], unbound: 1 });
    expect(readings.wordedAndBound, "with its wording and its row it passes").toEqual({ causes: [], unbound: 0 });
    return json(readings);
  },
  K2: () => {
    const path = "docs/workbench/07-native-integrations.md";
    const text = `Pi reads ${SECOND.spelling} refs ${QUALIFIER}.`;
    const citing = judgeFiles([{ path, text: `${text}\n` }]).bindings;
    const row: Binding = { path, text: squeezed(text) };
    const cases = {
      same: unboundOf(citing, [row]).length,
      wrapped: unboundOf(judgeFiles([{ path, text: `${text.replace("refs ", "refs\n")}\n` }]).bindings, [row]).length,
      otherPath: unboundOf(citing, [{ path: "docs/workbench/09-observation-and-provenance.md", text: row.text }]).length,
      edited: unboundOf(citing, [{ path, text: row.text.replace("refs", "records") }]).length,
      stale: staleOf([], [row]).length,
      fresh: staleOf(citing, [row]).length,
    };
    expect(cases, "a row binds its own path and squeezed text only; a row with no citing unit is stale").toEqual({ same: 0, wrapped: 0, otherPath: 1, edited: 1, stale: 1, fresh: 0 });
    return json({ row, cases });
  },
  Q1: () => {
    const outside = ["package.json", "forge.toml", "vitest.config.ts", "qa/workbench/smoke.sh", "test/source-hygiene.test.ts", "test/fixtures/hx-sio-design-status-dossier.md"];
    for (const path of outside) expect(textOf(path).length, `${path} exists`).toBeGreaterThan(0);
    const listed = SCOPE_IDS.flatMap(id => scopeList(REPO, SCOPES[id]));
    expect(
      outside.filter(path => listed.includes(path)),
      "no scope lists them",
    ).toEqual([]);
    return json({ outside, listed: outside.filter(path => listed.includes(path)) });
  },
  Q2: () =>
    quiet(
      "docs/workbench/receipts/wb-dqf.1.md",
      "# wb-dqf.1: [FURNACE-CAC-EXECUTION-ASSURANCE-R4] When Furnace ships the boundary record, Pi reads it\n",
      "a unit whose only matches are requirement ids does not cite",
    ),
  Q3: () => quiet("docs/workbench/x.md", `Pi reads Furnace's 2026-10-18 CAC design deposit for attempts and its ${SECOND.words}.`, "a paraphrased citation does not cite"),
  Q4: () => quiet("docs/workbench/x.md", `${PROGRAM} is not, as of today, design-only.`, "a negation three words away does not cancel the carrier"),
  Q5: () => quiet("docs/workbench/x.md", `${SECOND.spelling} ${QUALIFIER} gates every attempt read Pi makes.`, "predicates outside EXISTS are not read"),
  Q6: () => quiet("docs/workbench/x.md", `If anything, ${SECOND.spelling} ${QUALIFIER} is wired.`, "a guard word before the predicate silences it"),
  Q7: () => quiet("docs/workbench/x.md", `${SECOND.spelling} is design-only and proposed, not shipped. It is wired anyway.`, "a subject and its predicate across a sentence end are not read"),
  Q8: () =>
    quiet(
      "docs/workbench/x.md",
      `${PROGRAM} (design-only): the Furnace boundary record is wired, and the attempt capability record ships.`,
      "subjects spelled outside the subject patterns are not read",
    ),
  Q9: () => quiet("src/x.ts", `export const A = "${SECOND.head}" + "${SECOND.tail}";`, "a citation split across a concatenation does not cite"),
  Q10: () => quiet("docs/workbench/x.md", "The CAC\\-execution\\-assurance program and cac&#45;execution&#45;assurance.", "escaped and entity spellings do not cite"),
  Q11: () =>
    quiet(
      "docs/workbench/x.md",
      `${PROGRAM} is design-only.\n\nThe CAC record is wired and asynchronous attempt semantics are established.`,
      "a claim in a unit that does not cite is not judged",
    ),
  Q12: () => quiet("docs/workbench/x.md", `${PROGRAM} is design-only and carries no status column.`, "a citing prose unit owes no NFR-08 label"),
  Q13: () => quiet("docs/workbench/x.md", `| ${PROGRAM} | design-only | planned |`, "a labelled citing row naming no source of evidence is quiet"),
  Q14: () =>
    quiet(
      "docs/workbench/x.md",
      `${PROGRAM} (design-only) names ${SECOND.spelling} and FurnaceAttemptCapabilityV0; the second is proposed, not shipped.`,
      "one grading anywhere in the unit grades every subject of the unit",
    ),
};

/** A record pin's case (B2, B3): a unit naming the record owes the record grading; the code and string readings of src. */
function recordCase(index: number): JsonValue {
  const record = RECORDS[index];
  if (record === undefined) throw new Error(`no record ${index}`);
  const name = record.spelling;
  const spaced = wordsOf(name).join(" ");
  const controls: Control[] = [
    { id: "graded", text: `${name} ${QUALIFIER} is one of the program's two records.`, causes: [] },
    { id: "ungraded", text: `${name} (design-only) is one of the program's two records.`, causes: ["record-status"] },
    { id: "spaced", text: `${spaced} (design-only) is a record.`, causes: ["record-status"] },
    { id: "no-v0", text: `The ${name.replace(/V0$/, "")} record (design-only).`, causes: ["record-status"] },
    { id: "graded-elsewhere", text: `${name} (design-only).\n\nThe record is proposed, not shipped.`, causes: ["record-status"] },
    { id: "src-string", path: "src/x.ts", text: `export const A = "${name} ${QUALIFIER}";`, causes: [] },
    { id: "src-string-ungraded", path: "src/x.ts", text: `export const A = "${name} (design-only)";`, causes: ["record-status"] },
    { id: "src-identifier", path: "src/x.ts", text: `export type ${name} = { readonly attempt: string };`, causes: ["code"] },
  ];
  return json({ subject: name, id: record.id, controls: controlsHold(controls) });
}

/** The census's constants as the roster holds them. */
function constants(): JsonValue {
  return json({
    needles: NEEDLES,
    program: PROGRAM,
    citation: CITATION.source,
    requirementId: REQUIREMENT_ID.source,
    designOnly: DESIGN_ONLY,
    recordStatus: RECORD_STATUS,
    asyncStatus: ASYNC_STATUS,
    gradingPatterns: [...DESIGN_ONLY_PATTERNS, ...RECORD_PATTERNS, ...ASYNC_PATTERNS].map(pattern => pattern.source),
    statusNegation: [STATUS_NEGATION_BEFORE.source, STATUS_NEGATION_AFTER.source],
    records: RECORDS.map(subject => ({ id: subject.id, spelling: subject.spelling, pattern: subject.pattern.source })),
    cacRecord: { id: CAC_RECORD.id, spelling: CAC_RECORD.spelling, pattern: CAC_RECORD.pattern.source },
    async: { id: ASYNC.id, spelling: ASYNC.spelling, pattern: ASYNC.pattern.source },
    exists: EXISTS.source,
    established: ESTABLISHED.source,
    guard: [GUARD.source, GUARD_AFTER.source],
    clauseSplit: CLAUSE_SPLIT,
    labels: LABELS,
    label: LABEL.source,
    carrierView: { unshown: UNSHOWN, element: ELEMENT.source, footnote: [FOOTNOTE.reference.source, FOOTNOTE.definition.source] },
    units: [BLANK.source, LIST_ITEM.source, HEADING.source, TABLE_ROW.source, FENCE.source],
    scopes: SCOPES,
    floors: FLOORS,
    pinPaths: PIN_PATHS,
    pinUnits: PIN_UNITS,
    quotes: QUOTES,
    pages: { nfr: NFR_PAGE, nfrLine: NFR_LINE, traceability: TRACEABILITY, featureMatrix: FEATURE_MATRIX, workbench: WORKBENCH, receipts: RECEIPTS, identity: IDENTITY },
    schemaLiteral: SCHEMA_LITERAL,
    filingPin: FILING_PIN,
    producerPin: PRODUCER_PIN,
    plants: PLANTS,
    compliant: COMPLIANT,
    qualifier: QUALIFIER,
    bound: [...BOUND],
    residuals: RESIDUALS,
    secondRecord: { sha256: SECOND_RECORD_SHA256, token: RECORD_TOKEN.source, forms: [...SECOND_FORMS.keys()] },
    anchor: ANCHOR,
  });
}

describe("wb-dqf.2 Furnace cac-execution-assurance citation-status census (FURNACE-CAC-EXECUTION-ASSURANCE-R7)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:7", "Z:2", "M:2", "D:6", "E:3", "N:3", "K:2", "Q:14"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(QUOTES).sort(), "every pin of the judged rows carries a quote").toEqual(
      ROWS.filter(row => row.id !== "Q")
        .flatMap(row => row.pins)
        .sort(),
    );
    expect(ROSTER.bead).toBe(BEAD);
    expect(constants()).toStrictEqual(ROSTER.constants);
    expect(Object.values(RESIDUALS).flat().sort(), "the residual quiet rows are exactly row Q's pins").toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    for (const [family, members] of Object.entries(RESIDUALS)) {
      for (const member of members) if (family !== "R-SCOPE") expect(probeOf(rosterWitness(member)), `${member} (${family}) carries its own probe`).toBeDefined();
    }
    const readers: readonly ((...args: never[]) => unknown)[] = [...Object.values(IMPL), recordCase, scopeLeg, controlsHold, quiet, readScope, judgeFiles, judgeUnit, anchorTables, anchorProse, anchorRules, headerOf];
    for (const reader of readers) expect(/\bROSTER\b|rosterWitness|readRoster/.test(reader.toString()), `${reader.name || "a case"} reads no roster (SELF-READ)`).toBe(false);
    expect(formsOf(FIRST_RECORD), "formsOf reads the first record's forms as spelled (the second record's come from the same function)").toEqual({
      spelling: "FurnaceAttemptCapabilityV0",
      stem: "FurnaceAttemptCapability",
      pattern: "Furnace[\\s_-]*Attempt[\\s_-]*Capability",
      id: "attempt-capability",
      words: "attempt capability",
      head: "FurnaceAttempt",
      tail: "CapabilityV0",
    });
    expect(subjectOf(formsOf(FIRST_RECORD)), "subjectOf rebuilds the first record's literal subject (the second record's subject is built the same way)").toEqual(RECORDS[0]);
    const spelled = (text: string): string[] => [wordsOf(SECOND.stem)[1] ?? "-", ...Object.values(SECOND)].filter(form => text.toLowerCase().includes(form.toLowerCase()));
    expect(spelled(readFileSync(fileURLToPath(import.meta.url), "utf8")), "this file spells the second record in no form, its first middle word included (the landed wb-dqf.1 until-then leg)").toEqual([]);
    const rosterSource = readFileSync(ROSTER_PATH, "utf8");
    expect(spelled(`${rosterSource}\n${stringsOf(JSON.parse(rosterSource)).join("\n")}`), "the roster spells it only through its tokens, raw or parsed").toEqual([]);
    ENDS.push(endOf("judged-set"));
  });

  it("the outside anchors: the bead's own row binds the rows, the pin quotes, the needles, the program, the records, the gradings, the subjects, the scopes, the labels and the predicate words; the producer block carries the filing's status lines", { timeout: 60_000 }, () => {
    const { title, notes } = beadRow(BEAD);
    expect(title.length, `${BEAD}'s row was read from the tracker export`).toBeGreaterThan(0);
    const segments = segmentsOf(title);
    expect(segments, "the statement holds three segments").toHaveLength(3);
    const filing = filingOf(notes);
    expect(filing.length, "the filing's status paragraph was read").toBeGreaterThan(0);
    const measured = /Measured Pi state 2026-10-18: (git grep for .+? returns zero hits)/.exec(filing)?.[1] ?? "";
    const duty = /Duty: (.+?) and (never presents .+?); (NFR-08's .+?)\. Acceptance: /.exec(filing)?.slice(1) ?? [];
    const acceptance = /Acceptance: (.+?) \(wb-973\.15 precedent/.exec(filing)?.[1] ?? "";
    const slices: Readonly<Record<string, string>> = {
      A: segments[0] ?? "",
      B: segments[1] ?? "",
      Z: (segments[2] ?? "").replace(/\.$/, ""),
      M: measured,
      D: duty[0] ?? "",
      E: duty[1] ?? "",
      N: duty[2] ?? "",
      K: acceptance,
    };
    for (const [id, slice] of Object.entries(slices)) {
      expect(slice.length, `the bead text's clause for row ${id} was read`).toBeGreaterThan(0);
      expect(
        ROWS.filter(row => row.label === slice).map(row => row.id),
        `the bead text's clause ${id} is exactly one row's label`,
      ).toEqual([id]);
    }
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(slices[row.id], `row ${row.id} is a clause of the bead text`).toBe(row.label);
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its clause`).toBe(true);
    }
    const needles = /^git grep for (.+?) over the working tree/.exec(slices.M ?? "")?.[1]?.split(" / ") ?? [];
    expect(needles, "the needles are the filing's grep list").toEqual(NEEDLES);
    expect(CITATION.source, "CITATION is derived from the needles").toBe(citationSource(needles));
    const prefix = /^\[([A-Z-]+)-R\d+\] /.exec(title)?.[1] ?? "";
    expect(REQUIREMENT_ID.source, "REQUIREMENT_ID is the bead family's id form").toBe(`\\b${escaped(prefix)}-R\\d+\\b`);
    const id = /^\[([A-Z-]+-R\d+)\] /.exec(title)?.[1] ?? "-";
    expect([...id.matchAll(new RegExp(CITATION.source, "gi"))].length, "the bead's own id spells CITATION (the namesake the exemption exists for)").toBeGreaterThan(0);
    expect(citations(id), "and is exempt as a requirement id").toEqual([]);
    const a = slices.A ?? "";
    const program = /citing Furnace's (\S+) program/.exec(a)?.[1] ?? "-";
    expect(program, "the program is the statement's").toBe(PROGRAM);
    expect([/^(Any Pi document) or /.exec(a)?.[1], / or (surfaced string) citing /.exec(a)?.[1]], "the scopes are the statement's").toEqual(SCOPE_IDS.map(scope => SCOPES[scope].word));
    const b = slices.B ?? "";
    expect(/^(design-only); /.exec(b)?.[1], "the program grading opens the status segment").toBe(DESIGN_ONLY);
    const records = /; (\w+) and (\w+) proposed, not shipped;/.exec(b)?.slice(1) ?? [];
    expect(records, "the records are the status segment's").toEqual(RECORDS.map(record => record.spelling));
    expect(createHash("sha256").update(SECOND_RECORD).digest("hex"), "the second record read from the title is the pinned token").toBe(SECOND_RECORD_SHA256);
    for (const record of RECORDS) expect(record.pattern.test(record.spelling), `${record.id} reads its own spelling`).toBe(true);
    expect(/ and \w+ (proposed, not shipped);/.exec(b)?.[1], "the record grading is the status segment's").toBe(RECORD_STATUS[0]);
    expect(/; (asynchronous-attempt-semantics claims) /.exec(b)?.[1], "the asynchronous subject is the status segment's").toBe(ASYNC.spelling);
    expect(/claims (targets for proof\/measurement),/.exec(b)?.[1], "the asynchronous grading is the status segment's").toBe(ASYNC_STATUS[0]);
    const d = slices.D ?? "";
    const dutyGradings = /the (design-only) \/ (proposed-not-shipped) \/ (targets-for-proof) grading verbatim$/.exec(d)?.slice(1) ?? [];
    expect(dutyGradings, "the duty's gradings").toEqual([DESIGN_ONLY, RECORD_STATUS[1], ASYNC_STATUS[1]]);
    const scopes = /\((docs\/workbench) rows, (TRACEABILITY) entries, (descriptor) or (receipt) strings\)/.exec(d)?.slice(1) ?? [];
    expect(scopes, "the duty's named scopes").toHaveLength(4);
    expect([WORKBENCH.startsWith(`${scopes[0]}/`), TRACEABILITY.startsWith(`${scopes[0]}/${scopes[1]}.`), RECEIPTS === `${scopes[0]}/${scopes[3]}s/`], "the census's pages are the duty's scopes").toEqual([true, true, true]);
    expect(RECORD_STATUS[2], "the producer heading is the filing's quote").toBe(/both reference records sit under '([^']+)'/.exec(filing)?.[1]);
    const e = slices.E ?? "";
    expect(/^never presents (a CAC record) or /.exec(e)?.[1], "the record subject is the duty's").toBe(CAC_RECORD.spelling);
    expect(CAC_RECORD.pattern.test(CAC_RECORD.spelling), "the CAC record subject reads its own spelling").toBe(true);
    const asyncWord = / or its (async-semantics) claims /.exec(e)?.[1] ?? "-";
    expect(asyncWord, "the asynchronous subject's duty spelling").toBe(ASYNC.id);
    expect([ASYNC.pattern.test(ASYNC.spelling), ASYNC.pattern.test(`${asyncWord} claims`)], "the asynchronous subject reads both spellings").toEqual([true, true]);
    const anchors = /as (shipped) or (established)$/.exec(e)?.slice(1) ?? [];
    expect(anchors, "the predicate anchor words").toEqual(["shipped", "established"]);
    expect([...(anchors[0] ?? "-").matchAll(new RegExp(EXISTS.source, "gi"))].map(match => match[0]), "EXISTS reads the duty's 'shipped'").toEqual(["shipped"]);
    expect([...(anchors[1] ?? "-").matchAll(new RegExp(ESTABLISHED.source, "gi"))].map(match => match[0]), "ESTABLISHED reads the duty's 'established'").toEqual(["established"]);
    expect(/, never (established) results$/.exec(b)?.[1], "the status segment's 'never established results'").toBe(anchors[1]);
    const n = slices.N ?? "";
    const labels = /^NFR-08's ([a-z/]+) labelling discipline/.exec(n)?.[1]?.split("/") ?? [];
    expect(labels, "the labels are the duty's").toEqual(LABELS);
    expect(/\((\S+?):(\d+)\)/.exec(n)?.slice(1), "the NFR-08 line is the duty's reference").toEqual([NFR_PAGE, String(NFR_LINE)]);
    const live = /NFR-08: Every feature is labeled (\w+), (\w+), (\w+), or (\w+) with/.exec(textOf(NFR_PAGE).split("\n")[NFR_LINE - 1] ?? "")?.slice(1) ?? [];
    expect(live, "the live docs/02 line names the same labels").toEqual(labels);
    const furnace = ROSTER.producer.furnace;
    expect(isObject(furnace), "the roster carries the Furnace producer block").toBe(true);
    if (!isObject(furnace)) return;
    expect(new Set([...filing.matchAll(/@([0-9a-f]{12})\)/g)].map(match => match[1])), "every status quote of the filing names one producer pin").toEqual(new Set([PRODUCER_PIN]));
    expect(String(furnace.sha).slice(0, 12), "the producer block is read at that pin").toBe(PRODUCER_PIN);
    expect(/design-only/i.test(String(furnace.readme3)), "README.md:3 at the pin carries design-only (the filing's 'design-only program')").toBe(/^Program status at the pin: design-only program, 2026-10-18 \(README\.md:3 @/.test(filing));
    expect(String(furnace.contracts3), "01-contract-qa.md:3 is the heading the filing quotes").toBe(`## ${RECORD_STATUS[2]}`);
    const readme12 = /'(Claims about asynchronous attempt semantics [^']+)' \(README\.md:12 @/.exec(filing)?.[1] ?? "-";
    expect(String(furnace.readme12).replace(/\*/g, "").includes(readme12), "README.md:12 at the pin carries the filing's quote").toBe(true);
    expect([String(furnace.contracts4).includes(records[0] ?? "-"), String(furnace.contracts6).includes(records[1] ?? "-")], "01-contract-qa.md:4 and :6 name the two records").toEqual([true, true]);
    expect(causesOf(`${RECEIPTS}${BEAD}.md`, `# ${BEAD}: ${title}\n`), "the bead's own statement, read as its receipt heading, is a graded citation").toEqual([]);
    const terms = [...needles, program, ...records, ...dutyGradings, RECORD_STATUS[0] ?? "-", ASYNC_STATUS[0] ?? "-", ...anchors, ...labels, ...scopes, `${NFR_PAGE}:${NFR_LINE}`, CAC_RECORD.spelling.replace(/^a /, ""), asyncWord];
    for (const term of terms) {
      const naming = ROWS.filter(row => row.id !== "Q")
        .flatMap(row => row.pins)
        .filter(pin => (QUOTES[pin] ?? "").includes(term));
      expect(naming.length, `a pin's quote names '${term}'`).toBeGreaterThan(0);
      for (const pin of naming) expect(JSON.stringify(rosterWitness(pin)), `${pin}'s witness carries '${term}' (an anchored term its quote names)`).toContain(JSON.stringify(term).slice(1, -1));
    }
    ENDS.push(endOf("outside-anchors"));
  });

  it("the receipt anchor: the wb-xfkx receipt's last dated entry records every row's pins and label, every judged pin's quote and every residual family with its quiet row and witness, in order and both ways", () => {
    expect(ANCHOR.receipt, "the anchor is its bead's receipt (standing rule 15: append-only)").toBe(`${RECEIPTS}${ANCHOR.bead}.md`);
    expect(scopeList(REPO, SCOPES.documents), "git lists the anchor among the documents this census judges").toContain(ANCHOR.receipt);
    expect(textOf(ANCHOR.receipt).startsWith(`# ${ANCHOR.bead}: `), "the anchor opens with its rule-15 first line").toBe(true);
    const tables = anchorTables(textOf(ANCHOR.receipt));
    expect(
      tables.map(table => table[0]),
      "the last dated entry holds the three anchor tables, in order",
    ).toEqual(ANCHOR.tables.map(header => [...header]));
    const [rows, pins, residuals] = tables.map(table => table.slice(1));
    expect(rows, "the rows table: every row's id, its pins and the digest of its label, in row order, both ways").toEqual(ROWS.map(row => [row.id, row.pins.join(", "), sha256(row.label)]));
    expect(pins, "the pins table: every judged pin and the digest of its quote, in row order, both ways").toEqual(
      ROWS.filter(row => row.id !== "Q")
        .flatMap(row => row.pins)
        .map(pin => [pin, sha256(QUOTES[pin] ?? "")]),
    );
    expect(residuals, "the residuals table: every family's quiet row, the family and the digest of that row's roster witness, in order, both ways").toEqual(
      Object.entries(RESIDUALS).flatMap(([family, members]) => members.map(member => [member, family, sha256(JSON.stringify(rosterWitness(member)))])),
    );
    expect(
      anchorRules(textOf(ANCHOR.receipt)),
      `the last dated entry states its witness rule once, in its own paragraph or list item opening '${ANCHOR.rule}', and that rule is the token-resolving one, exactly`,
    ).toEqual([ANCHOR.definition]);
    expect(headerOf(readFileSync(fileURLToPath(import.meta.url), "utf8")), "this census's header states the same witness rule").toContain(ANCHOR.definition);
    expect(
      [headerOf('/**\n * a leading\n * doc comment\n */\nconst rule = "not the header";\n'), headerOf("const rule = 1;\n/** not leading */\n")],
      "the header reader: the file's leading doc comment only, its comment prefixes removed",
    ).toEqual(["a leading doc comment", ""]);
    const entry = (heading: string, cell: string): string => `## ${heading}\n\n| Pin | Quote sha-256 |\n| --- | --- |\n| ${cell} | 0 |`;
    const page = (...blocks: string[]): string => `# wb-x: a receipt\n\n${blocks.join("\n\n")}\n`;
    const controls = {
      lastEntry: anchorTables(page(entry("2026-10-27 first", "A1"), entry("2026-10-28 second", "B1"))),
      noEntry: anchorTables(page("| Pin | Quote sha-256 |\n| --- | --- |\n| A1 | 0 |")),
      comment: anchorTables(page(entry("2026-10-27 first", "A1"), "## 2026-10-28 second\n\n<!--\n| Pin | Quote sha-256 |\n| --- | --- |\n| B1 | 0 |\n-->")),
      codeBlock: anchorTables(page("## 2026-10-28 second\n\n```\n| Pin | Quote sha-256 |\n| --- | --- |\n| B1 | 0 |\n```")),
    };
    expect(controls, "the reader: the last dated entry's tables only, none before an entry, none inside a comment or a code block").toEqual({
      lastEntry: [[["Pin", "Quote sha-256"], ["B1", "0"]]],
      noEntry: [],
      comment: [],
      codeBlock: [],
    });
    const stated = (heading: string, block: string): string => `## ${heading}\n\n${block}`;
    const prose = {
      lastEntry: anchorProse(page(stated("2026-10-27 first", "- first rule"), stated("2026-10-28 second", "- second `rule`\n- third ~~struck~~ rule"))),
      noEntry: anchorProse(page("- a rule before any entry")),
      comment: anchorProse(page(stated("2026-10-28 second", "<!--\n- a rule\n-->"))),
      codeBlock: anchorProse(page(stated("2026-10-28 second", "```\n- a rule\n```"))),
      element: anchorProse(page(stated("2026-10-28 second", '- a <span style="display:none">rule</span>'))),
      rules: anchorRules(page(stated("2026-10-28 second", `- ${ANCHOR.rule}one.\n- a later ${ANCHOR.rule}two\n- ${ANCHOR.rule}three`))),
    };
    expect(
      prose,
      "the prose reader: the last dated entry's paragraphs and list items only, a code span as its code and struck text unshown; none before an entry, none inside a comment or a code block, and a block with a raw HTML element opaque; the rule reader: only blocks opening with the lead, read past it, one closing period dropped",
    ).toEqual({
      lastEntry: ["second rule", "third rule"],
      noEntry: [],
      comment: [],
      codeBlock: [],
      element: [],
      rules: ["one", "three"],
    });
    ENDS.push(endOf("receipt-anchor"));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
          const expected = rosterWitness(pin);
          REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
          expect(witness).toStrictEqual(expected);
          const probe = probeOf(witness);
          if (probe !== undefined) expect(causesOf(probe.path, probe.text), `${pin}'s causes are its own probe's`).toEqual(probe.causes);
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
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "every compare matched its roster witness",
    ).toEqual([]);
    expect(ENDS, "every non-pin case before this one reached its end, in run order, with its pinned assertion count").toEqual([...ROSTER.ends]);
  });
});
