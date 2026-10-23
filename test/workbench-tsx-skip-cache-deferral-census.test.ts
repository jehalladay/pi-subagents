/**
 * wb-csbt.1 (TSX-RESOURCE-EFFICIENCY-FRONTIER-R1, program-triage-2026-10-22), the standing echo leg. Statement (bead title):
 * "No Pi surface or Pi-filed bead shall mark component-subtree skipping or assembly/serialization caches as already needed;
 * Pi echoes ADR-0032's deferred status until the producer records the re-open conditions (gated: ADR-0032 update via packet
 * TSX-PF-03, not created per R-08 - a concrete workload, differential semantic proof and an owner-reviewed ADR update)"
 * (ReactiveFiberTSXSDK docs/programs/resource-efficiency-frontier-2026-10-17/README.md:8@76bbbffd9d4a). Acceptance (owner
 * filing, verbatim; the labels of rows A, B and C): "(a) grep of Pi docs and wb bead titles/descriptions for component-skip or
 * assembly-cache wording marked needed/required/adopted for the TSX SDK = 0 hits (0 today at Pi d75b68d; store ADR-0032 hits
 * only wb-km7q.6); (b) any Pi summary of this program carries "design, not implementation or measured improvement"
 * (README.md:2) and never "implemented"/"measured improvement"; (c) a Pi-filed bead mentioning TSX component skip or
 * serialization cache carries the ADR-0032 deferred/gated wording and a related (never blocks) edge to the gate."
 *
 * THE SOURCE AT THE PIN (ReactiveFiberTSXSDK 76bbbffd9d4a419f972d6fefc8b7f9dc524df8df, origin/main of the local checkout at its
 * last fetch, package 0.1.668; read by the cutting seat with read-only git show and git ls-tree, 2026-10-23): README.md:2 the
 * program's status line; README.md:8 "ADR-0032 defers component-subtree skipping and assembly/serialization caches after the
 * measured growing-session profile" and the filing's quote; 03-PROFILES-DECISIONS-AND-WORK-PACKAGES.md:4 the three re-open
 * conditions; 01-COST-MODEL-AND-INSTRUMENTATION.md:22 no universal optimization flag before a reproducible win over the
 * ADR-0032 deferral threshold; BEADS-2026-10-21.md:70 the heading "Gated work packages (1; not created, per R-08)", :72 a gated
 * packet is created with related edges only once its gate bead records ADOPT, :76 the TSX-PF-03 row (decision, gate beads
 * rftsx-bge18, rftsx-qjxf1, rftsx-j83yd, rftsx-it5ry); docs/adr/0032-...-deferred.md (one of 81 docs/adr entries) Status
 * "Accepted-provisional (DEC-48)" (:13) and its Verdict section reading DEFER for RFTSX-PERF-009 (:148) and RFTSX-PERF-008b
 * (:153). The roster's producer block holds these lines with their blob ids; Pi vendors none of them.
 *
 * READINGS
 * - THE WALK (rows A and B): every regular file below the repository root, at any depth, in name order; SKIPPED_ROOTS (git's
 *   data, the tracker export directory, installed dependencies, build, coverage and Forge outputs) are skipped at the root only,
 *   and a file holding a NUL byte is binary and not read. It reads the working tree, so an untracked plant is read; a symlink
 *   is refused, never followed; a failed read is a finding (a file or directory gone between its listing and its read is
 *   skipped). EXEMPT files are walked, never judged: this file and its roster (they carry every family as needles) and the
 *   wb-csbt.2 census, landed at landing 303 (it carries the skip family as needles; its roster is judged); A1 reads each
 *   present exemption load-bearing (judged, each yields findings), this file and its roster always present.
 * - FAMILIES (case-insensitive): S, the skip word (skip and its inflections) beside component or subtree, in either word order
 *   with at most one word between the noun and the skip word, or two between the skip word and the noun (component-subtree
 *   skipping, component skip, subtree skip, skip unchanged components); K, an assembly or serialization cache (assembly/serialization caches,
 *   assembly-cache, serialisation cache, caching the serialization, cached assembly). The separators are white space, "_", "/"
 *   and "-".
 * - ANCHOR: a source (a walked file, or one bead row's text fields) is judged only when it names the TSX side anywhere: a
 *   whole-word TSX, rftsx, ReactiveFiber..., the reactive-fiber package scope, ADR-0032, RFCLI or a whole-word rf.
 * - SENTENCE: a text cut at a run of white space after ".", "!", "?" or ";", at a blank line and before a line opening a table
 *   row ("|"); a .md file (and every bead field) is also cut before a line opening a list item ("-", "+", "*", "1." or "1)"),
 *   and a .json or .jsonl file at every line break (a JSON string holds no raw line break, so each value reads on its own).
 *   BLOCK (row B): the same cut without the sentence ends - a paragraph, a table row, a list item or a data line.
 * - MARKER: a family sentence is admitted when it carries a MARKERS word (whole words, any case, read with every family match
 *   blanked) or the n't contraction: the deferral echo and the negations. A family sentence without one is a FINDING,
 *   `<source>:<line> <families>: <diagnosis>`, the diagnosis asserted-<mark> for the first MARKS member it carries (the
 *   filing's needed, required and adopted with their inflections), else unmarked: a sentence presenting a skip or cache as
 *   there marks it adopted as surely as one that says so, and Pi echoes the deferral whenever it names them.
 * - (a) A1 judges every walked file (EXEMPT aside); A2 judges the title, description, design and acceptance_criteria of every
 *   row of the tracked bead export (.beads/issues.jsonl; a line that does not parse is a finding of its own).
 * - (b) SUMMARY: a block naming the program (its name, "resource", "efficiency" and "frontier" joined by white space, "_" or
 *   "-", any case) as a phrase of its own: a name attached to another identifier part or to a path - a requirement tag such as
 *   the one this file names, a dated slug, a prefixed epic name, a document locator - is a citation, not a summary. B1: every
 *   walked summary carries STATUS verbatim (white space runs read as one space); B2: with STATUS blanked, no walked summary and
 *   no judged field of a bead row naming the program carries a NEVER word (implemented; measured improvement). The store cites
 *   the program today (the wb-csbt epic and its four children, by tag and path) and names it in no judged field.
 * - (c) THE GATE: the one row of the export whose title carries GATE_CLAUSE, the filing's gating artifact (wb-csbt.1 at base).
 *   A MENTION ROW is an anchored row other than the gate that names a family in any text field (notes and comment texts
 *   included). C1: a mention row carries a sentence naming ADR-0032 beside a DEFERRAL word (defer and its inflections, gated);
 *   C2: a mention row holds a related edge (RELATED_TYPES) to the gate and no blocks edge either way, and no row of the store
 *   holds a blocks edge to the gate.
 * - (gate) D1 reads the roster's producer facts: each measured Verdict line's bold verdict word, the packet heading and row. The
 *   gate is OPEN once a verdict reads anything but DEFER or REJECT (ADOPT, or no verdict word at all) or TSX-PF-03 leaves the
 *   not-created packets (its heading drops "not created" or its row is gone); a confirmed ADR status keeps it closed.
 * KNOWN FINDINGS (measured on the export of trunk 4435e2e, landing 304; reported, never admitted): C1 reads exactly wb-km7q.6
 * and C2 reads exactly wb-csbt.2 and wb-km7q.6, two owner filings that name the skip family and ADR-0032 and hold only their
 * parent-child edge. wb-km7q.6 carries no sentence naming ADR-0032 beside a deferral word; wb-csbt.2 left C1 at ledger hop
 * edccd80 (landing 287), where its delivery note gained a sentence naming ADR-0032 beside a deferral word (R-WORDING-ANYWHERE).
 * KNOWN pins both sets exactly, so a further finding, or a known row whose reading changes, reds; whether the two rows gain
 * the wording and the edge, or whether (c) binds only beads filed after the filing, is the owner's ruling, not this census's.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label with the families replaced):
 *  A, the statement and acceptance (a). A1 the walk (floors, anchors, no symlink, nothing unreadable, each exemption
 *    load-bearing), the live reading (no finding) and the reader's controls; A2 the store reading (no line unparsed, no
 *    finding, the two posture titles of the filing family read and admitted) and its controls.
 *  B, acceptance (b). B1 the walked summaries (none today) and the status rule's controls; B2 the never rule over the walked
 *    summaries and the store (the epic and its children read as citations) and its controls.
 *  C, acceptance (c). C1 the gate and the wording rule (KNOWN) with controls; C2 the edge rule (KNOWN), no blocks edge to the
 *    gate, with controls.
 *  D, the title's gate. D1 the producer facts read closed and tie to the filing (packet, rule, re-open conditions, quotes).
 * OUTSIDE ANCHOR: the owner filing's row of wb-csbt.1 in the tracked bead export. Its acceptance line holds exactly the clauses
 * (a)-(c), each verbatim in exactly one row label, as are the title's statement (row A) and its gating sentence (row D); its
 * quote and citation equal the roster's; the spellings it uses - the skip and cache wording of the statement, (a) and (c), the
 * marks of (a), the status phrase and the never words of (b), the edge types of (c) and the gating clause - are each read by
 * the vocabulary as themselves; and each pin answers, by position, one atom the row yields (the scopes of (a), the
 * obligations of (b), the carried items of (c), the gating clause), so a row, a pin or a family alternative removed from every
 * literal of this file and of the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the rows, every pin's witness (each carries
 * its pin id and atom), the scan constants, KNOWN, the residual families, the quiet rows, the producer facts and the
 * registered test titles are held to the out-of-file roster (test/fixtures/tsx-skip-cache-deferral-roster.json). RECORDS: the
 * last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode, not
 * inverted, ran; every pin's case reached its end; no registered suite or test title names a family.
 * RESIDUALS (named families, each with pinned quiet rows in QUIET, read false in the roster witnesses): R-MARKER-ANYWHERE a
 * marker anywhere in a sentence admits it, whatever the marker qualifies (a list inside a code comment, or a comment and the
 * code lines after it, read as one sentence, so one marker covers them); R-PARAPHRASE the skip or the cache named outside the
 * families (memoized components, a subtree bailout, reusing prior output); R-SPLIT a claim carried by a later sentence that
 * names no family (a pronoun); R-COMPOSED a term assembled from literal parts; R-LOOKALIKE a look-alike letter or an inserted
 * invisible inside a term; R-ENCODED an HTML reference inside a term; R-UNANCHORED a file or a row that never names the TSX
 * side (Pi's own senses of the words); R-OUTSIDE a file below a skipped root entry, or a binary file; R-NOTES a row's notes and
 * comments sit outside (a)'s titles/descriptions (the filing's own acceptance sentence names the wording beside its marks);
 * R-UNNAMED-SUMMARY a summary that never names the program (by its epic tag alone, a packet or a pronoun); R-CITATION a name
 * attached to an identifier part or a path (a requirement tag, a dated slug, a prefixed name, a locator) is a citation, not a
 * summary, whatever its block says; R-ROW-STATUS a bead row naming the program
 * is held to B2 only, never to B1 (a filing cites the program, it does not summarize it); R-WORDING-ANYWHERE a deferral word
 * anywhere in an ADR-0032 sentence counts as the wording, whatever it qualifies.
 * SCOPE: the families, markers, anchor, fields and the gate's identity are this cut's reading of the filing (the Pi store holds
 * no bead for the unshipped packet, so the gate is the row naming it); the producer facts are measured at the pin and not
 * re-read here (the census is hermetic), so a producer change is seen only when a cut re-measures the roster. A later census
 * that needs these terms as needles adds its own file to EXEMPT in its cut, beside an A1-style load-bearing reading. C reads
 * every text field of every anchored row, notes and comments included, and KNOWN pins its exceptions exactly, so the store's
 * evolution moves the reading in either direction at the ledger hop that exports a change: a note or comment added later to
 * an anchored row can admit a known row (an ADR-0032 sentence with a deferral word takes it out of C1, as wb-csbt.2's
 * delivery note did at hop edccd80) or add a finding (a note naming a family on an anchored row, or a family and the TSX
 * side on any row, makes that row a mention row: C1 reads it unless the row carries the wording, C2 until it holds a related
 * edge to the gate); a bead filed later whose row names a family and the TSX side carries the ADR-0032 wording and a related
 * edge to the gate, or C1 and C2 red at the ledger hop that exports it. Either way that hop re-measures KNOWN in the same
 * change. The gate row's own notes add no reading: C and A2 do not judge them, the gate's wording check only gains from them,
 * and the outside anchor and D1 read the filing's first acceptance line and quote, which stay first.
 *
 * Display paths added: none. Test-only: it spawns nothing; the controls plant files in makeScratch scratch only, and src,
 * docs, qa and the bead export are only read.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-tsx-skip-cache-deferral-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-skip-cache-deferral-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-csbt.1";
/** The wb-csbt.2 census (landing 303): it carries the skip family as needles. Its roster is judged (it yields no finding, so
 * exempting it would bear no load). */
const SIBLING_EXEMPT: readonly string[] = ["test/workbench-rf-fiber-node-reuse-echo-census.test.ts"];
/** Walked, never judged (A1 reads each present exemption load-bearing; this file and its roster are always present). */
const EXEMPT: readonly string[] = [SELF, ROSTER_FILE, ...SIBLING_EXEMPT];

/** S: the skip word beside a component or a subtree (either order; one word may stand between the noun and the skip word, two after it). */
const SKIP_SOURCE = String.raw`\b(?:components?|subtrees?)(?:[\s_/-]+[a-z]+)?[\s_/-]+skip(?:s|ped|ping)?\b|\bskip(?:s|ped|ping)?(?:[\s_/-]+[a-z]+){0,2}[\s_/-]+(?:components?|subtrees?)\b`;
/** K: an assembly or serialization cache (either order; a slash, "or" or "and" may join the two kinds). */
const CACHE_SOURCE = String.raw`\b(?:assembly|seriali[sz]ation|serialized[\s_-]+output|assembled[\s_-]+output)(?:[\s_]*(?:\/|\bor\b|\band\b)[\s_]*(?:assembly|seriali[sz]ation))?[\s_/-]+cach(?:e|es|ed|ing)\b|\bcach(?:e|es|ed|ing)(?:[\s_-]+(?:of|the|an?))*[\s_-]+(?:assembl(?:y|ies|ed)|seriali[sz](?:ation|ations|ed))\b`;
const FAMILY_SOURCES: Readonly<Record<string, string>> = { S: SKIP_SOURCE, K: CACHE_SOURCE };
/** The TSX side, named anywhere in a source: the judging anchor. */
const ANCHOR_SOURCE = String.raw`\bTSX\b|\brftsx\w*|\bReactiveFiber\w*|reactive-fiber\/|\bADR-0032\b|\bRFCLI\b|\brf\b`;
/** The posture markers: negations and the deferral echo (whole words, any case), plus the n't contraction. */
const MARKERS: readonly string[] = [
  "no",
  "not",
  "never",
  "nor",
  "neither",
  "none",
  "cannot",
  "without",
  "defer",
  "defers",
  "deferred",
  "deferral",
  "deferrals",
  "deferring",
  "gated",
  "unshipped",
  "absent",
  "proposed",
  "potential",
];
const CONTRACTION_SOURCE = String.raw`n[\u2019']t\b`;
/** The filing's marks (acceptance (a): "marked needed/required/adopted"), each with its inflections; the first match names the diagnosis. */
const MARKS: readonly (readonly [string, string])[] = [
  ["needed", "need(?:s|ed|ing)?"],
  ["required", "requir(?:e|es|ed|ing|ement|ements)"],
  ["adopted", "adopt(?:s|ed|ing|ion)?"],
];
/** The program's name (README.md:1), any case, its words joined by white space, "_" or "-". */
const PROGRAM_SOURCE = String.raw`resource[\s_-]*efficiency[\s_-]*frontier`;
/** A name attached to an identifier part or a path: a word character, "-" or "/" touching it, or a path segment run beside it. */
const ATTACHED_BEFORE_SOURCE = String.raw`(?:[\w/-]|\/[\w.-]*)$`;
const ATTACHED_AFTER_SOURCE = String.raw`^(?:[\w/-]|[\w.-]*\/)`;
/** Acceptance (b)'s status phrase (README.md:2) and its never words. */
const STATUS = "design, not implementation or measured improvement";
const NEVER_SOURCE = String.raw`\bimplemented\b|\bmeasured[\s_-]+improvements?\b`;
/** Acceptance (c): the ADR, the deferral wording, the gate's title clause and the edge types. */
const ADR_SOURCE = String.raw`\bADR-0032\b`;
const DEFERRAL_SOURCE = String.raw`\bdefer(?:s|red|ral|rals|ring)?\b|\bgated\b`;
const GATE_CLAUSE = "ADR-0032 update via packet TSX-PF-03";
const RELATED_TYPES: readonly string[] = ["related", "relates-to"];
const BLOCKS_TYPE = "blocks";
/** Acceptance (a)'s titles/descriptions, with the two description-family fields; (c) reads every text field. */
const JUDGED_FIELDS: readonly string[] = ["title", "description", "design", "acceptance_criteria"];
const MENTION_FIELDS: readonly string[] = [...JUDGED_FIELDS, "notes", "comments"];
const SKIPPED_ROOTS: readonly string[] = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** Each floor sits below the count measured on trunk 4435e2e with this cut merged (877 walked files: the root 27, docs 71, src
 * 115, test 562, qa 67, examples 7, new-feedback 14; 221 anchored judged files; 723 export rows). */
const FLOORS = { files: 750, roots: { "": 20, docs: 60, src: 100, test: 440, qa: 55, examples: 5, "new-feedback": 10 }, anchored: 150, rows: 650 };
/** Files the walk must reach, each with a token its bytes carry: root pages, a docs page, a src module, a qa script, an
 * example, the feedback inbox, the vendor page and an installed skill. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["AGENTS.md", "# Development Rules"],
  ["docs/workbench/07-native-integrations.md", "Do not declare a typed TS context-render client exists without code evidence"],
  ["src/workbench/providers/reactivefiber.ts", "RF render refused"],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/agent-tool-description.md", "Available agent types"],
  ["new-feedback/README.md", "pi-subagents operational feedback"],
  ["vendor/README.md", "Native SDK artifacts"],
  [".agents/skills/beads/SKILL.md", "name: beads"],
];
/** The two posture titles of the filing family the store reader must see and admit (their first sentences). */
const POSTURE_ANCHORS: readonly string[] = ["wb-csbt.1.title:1 S,K", "wb-csbt.2.title:1 S"];
/** The rows whose judged fields cite the program at base (the epic and its four children, by tag and path). */
const CITED_ROW_ANCHORS: readonly string[] = ["wb-csbt", "wb-csbt.1", "wb-csbt.2", "wb-csbt.3", "wb-csbt.4"];
/** KNOWN FINDINGS (header): exact, measured on the export of trunk 4435e2e. */
const KNOWN: Readonly<Record<string, readonly string[]>> = {
  C1: ["wb-km7q.6 no-deferral-wording"],
  C2: ["wb-csbt.2 no-related-edge", "wb-km7q.6 no-related-edge"],
};
const RESIDUAL_FAMILIES: readonly string[] = [
  "R-MARKER-ANYWHERE",
  "R-PARAPHRASE",
  "R-SPLIT",
  "R-COMPOSED",
  "R-LOOKALIKE",
  "R-ENCODED",
  "R-UNANCHORED",
  "R-OUTSIDE",
  "R-NOTES",
  "R-UNNAMED-SUMMARY",
  "R-CITATION",
  "R-ROW-STATUS",
  "R-WORDING-ANYWHERE",
];
/** Each residual's pinned quiet rows: `<pin>:<control>` or `<pin>:plant:<path>`, each read as false in the roster witness. */
const QUIET: Readonly<Record<string, readonly string[]>> = {
  "R-MARKER-ANYWHERE": ["A1:markerAnywhere", "A1:listItemInCode", "A1:codeLinesRunTogether", "A2:markerAnywhereTitle"],
  "R-PARAPHRASE": ["A1:paraphraseMemo", "A1:paraphraseBailout", "A1:paraphraseReuse"],
  "R-SPLIT": ["A1:splitPronoun"],
  "R-COMPOSED": ["A1:composed"],
  "R-LOOKALIKE": ["A1:lookalike", "A1:joiner"],
  "R-ENCODED": ["A1:encoded"],
  "R-UNANCHORED": ["A1:unanchored", "A1:plant:src/journal.ts", "A2:unanchoredRow", "C1:unanchoredRow"],
  "R-OUTSIDE": [
    "A1:plant:node_modules/pkg/notes.md",
    "A1:plant:dist/notes.md",
    "A1:plant:build/notes.md",
    "A1:plant:coverage/notes.md",
    "A1:plant:.forge/notes.md",
    "A1:plant:.git/notes.md",
    "A1:plant:.beads/notes.md",
    "A1:plant:media/blob.bin",
  ],
  "R-NOTES": ["A2:notesClaim", "A2:commentClaim"],
  "R-UNNAMED-SUMMARY": ["B1:unnamedSummary", "B1:epicTagOnly"],
  "R-CITATION": ["B1:citationOnly", "B1:tagOnly", "B1:datedSlug", "B1:prefixedName", "B2:citationImplemented", "B2:tagImplemented"],
  "R-ROW-STATUS": ["B1:rowWithoutStatus"],
  "R-WORDING-ANYWHERE": ["C1:wordingAnywhere"],
};
/** The skip word's past tense, composed so that no line of this file spells it beside a noun (the wb-csbt.2 census reads every
 * src and test text for that label). */
const PAST = ["skip", "ped"].join("");
/** A1's spelling controls, by id: the alternatives of S and K, each read as its family. */
const SPELLINGS: readonly (readonly [string, string])[] = [
  ["S01", "component skip"],
  ["S02", "component-skip"],
  ["S03", `components ${PAST}`],
  ["S04", "component-subtree skipping"],
  ["S05", "component render skipping"],
  ["S06", "subtree skip"],
  ["S07", `subtrees ${PAST}`],
  ["S08", "whole-subtree skip"],
  ["S09", "skip components"],
  ["S10", "skipping unchanged components"],
  ["S11", "skips the unchanged subtree"],
  ["S12", `${PAST} subtrees`],
  ["K01", "assembly cache"],
  ["K02", "assembly-cache"],
  ["K03", "assembly caches"],
  ["K04", "serialization cache"],
  ["K05", "serialisation cache"],
  ["K06", "serialization_caching"],
  ["K07", "assembly/serialization caches"],
  ["K08", "assembly or serialization cache"],
  ["K09", "serialized output cache"],
  ["K10", "assembled output cache"],
  ["K11", "caching the serialization"],
  ["K12", "cached assembly"],
  ["K13", "cache of the assembled"],
];
const CYRILLIC_I = String.fromCodePoint(0x0456);
const ZERO_WIDTH_JOINER = String.fromCodePoint(0x200d);

const FAMILY_GLOBAL = new RegExp(`${SKIP_SOURCE}|${CACHE_SOURCE}`, "gi");
const ANCHOR = new RegExp(ANCHOR_SOURCE, "i");
const MARKER = new RegExp(`\\b(?:${MARKERS.join("|")})\\b|${CONTRACTION_SOURCE}`, "i");
const MARK_PATTERNS = MARKS.map(([id, source]) => ({ id, pattern: new RegExp(`\\b(?:${source})\\b`, "i") }));
const PROGRAM = new RegExp(PROGRAM_SOURCE, "gi");
const STATUS_GLOBAL = new RegExp(STATUS.split(" ").map(word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+"), "gi");
const NEVER = new RegExp(NEVER_SOURCE, "i");
const ADR = new RegExp(ADR_SOURCE);
const DEFERRAL = new RegExp(DEFERRAL_SOURCE, "i");

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(statement) No Pi surface or Pi-filed bead shall mark component-subtree skipping or assembly/serialization caches as already needed; (a) grep of Pi docs and wb bead titles/descriptions for component-skip or assembly-cache wording marked needed/required/adopted for the TSX SDK = 0 hits (0 today at Pi d75b68d; store ADR-0032 hits only wb-km7q.6): every sentence of an anchored walked file, and of an anchored row's title, description, design or acceptance_criteria, that names the skip or the cache family carries a posture marker",
    pins: ["A1", "A2"],
  },
  {
    id: "B",
    label:
      '(b) any Pi summary of this program carries "design, not implementation or measured improvement" (README.md:2) and never "implemented"/"measured improvement": a walked block naming the program outside a document locator carries the status phrase, and with it blanked neither it nor a judged field of a row naming the program carries a never word',
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) a Pi-filed bead mentioning TSX component skip or serialization cache carries the ADR-0032 deferred/gated wording and a related (never blocks) edge to the gate: the gate is the one row whose title names the gating artifact, every other anchored row naming a family holds an ADR-0032 sentence with a deferral word and a related edge to it, no row blocks on it, and the measured exceptions are exactly KNOWN",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(gate) Pi echoes ADR-0032's deferred status until the producer records the re-open conditions (gated: ADR-0032 update via packet TSX-PF-03, not created per R-08 - a concrete workload, differential semantic proof and an owner-reviewed ADR update): the producer facts at the pin read the gate closed - every verdict DEFER, TSX-PF-03 among the packets not created - and tie to the filing",
    pins: ["D1"],
  },
];

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Excerpt {
  readonly path: string;
  readonly line: number;
  readonly text: string;
}
interface Producer {
  readonly repo: string;
  readonly sha: string;
  readonly version: string;
  readonly blobs: { readonly [path: string]: string };
  readonly status: Excerpt;
  readonly quote: Excerpt;
  readonly reopen: Excerpt;
  readonly flag: Excerpt;
  readonly packet: { readonly id: string; readonly heading: Excerpt; readonly rule: Excerpt; readonly row: Excerpt };
  readonly adr: { readonly path: string; readonly status: Excerpt; readonly verdicts: { readonly [requirement: string]: Excerpt } };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly known: { readonly [pin: string]: readonly string[] };
  readonly residuals: readonly string[];
  readonly quiet: { readonly [family: string]: readonly string[] };
  readonly producer: Producer;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function stringMap(value: unknown, field: string): { [key: string]: string } {
  return Object.fromEntries(Object.entries(objectOf(value, field)).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}
function listMap(value: unknown, field: string): { [key: string]: string[] } {
  return Object.fromEntries(Object.entries(objectOf(value, field)).map(([key, entry]) => [key, strings(entry, `${field}.${key}`)]));
}
function excerptOf(value: unknown, field: string): Excerpt {
  const excerpt = objectOf(value, field);
  if (typeof excerpt.line !== "number") throw new Error(`roster ${field}.line must be a number`);
  return { path: text(excerpt.path, `${field}.path`), line: excerpt.line, text: text(excerpt.text, `${field}.text`) };
}
function producerOf(value: unknown): Producer {
  const producer = objectOf(value, "producer");
  const packet = objectOf(producer.packet, "producer.packet");
  const adr = objectOf(producer.adr, "producer.adr");
  return {
    repo: text(producer.repo, "producer.repo"),
    sha: text(producer.sha, "producer.sha"),
    version: text(producer.version, "producer.version"),
    blobs: stringMap(producer.blobs, "producer.blobs"),
    status: excerptOf(producer.status, "producer.status"),
    quote: excerptOf(producer.quote, "producer.quote"),
    reopen: excerptOf(producer.reopen, "producer.reopen"),
    flag: excerptOf(producer.flag, "producer.flag"),
    packet: {
      id: text(packet.id, "producer.packet.id"),
      heading: excerptOf(packet.heading, "producer.packet.heading"),
      rule: excerptOf(packet.rule, "producer.packet.rule"),
      row: excerptOf(packet.row, "producer.packet.row"),
    },
    adr: {
      path: text(adr.path, "producer.adr.path"),
      status: excerptOf(adr.status, "producer.adr.status"),
      verdicts: Object.fromEntries(Object.entries(objectOf(adr.verdicts, "producer.adr.verdicts")).map(([requirement, line]): [string, Excerpt] => [requirement, excerptOf(line, `producer.adr.verdicts.${requirement}`)])),
    },
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const scan = json(objectOf(raw.scan, "scan"));
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: isObject(scan) ? (scan as JsonObject) : {},
    known: listMap(raw.known, "known"),
    residuals: strings(raw.residuals, "residuals"),
    quiet: listMap(raw.quiet, "quiet"),
    producer: producerOf(raw.producer),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

const posix = (path: string): string => path.split(sep).join("/");
/** The cutter's patterns: a markdown page, a data file read line by line, a table row, a list item and a sentence end. */
const MARKDOWN_SOURCE = String.raw`\.md$`;
const LINE_DATA_SOURCE = String.raw`\.jsonl?$`;
const TABLE_ROW_SOURCE = String.raw`^\s*\|`;
const LIST_ITEM_SOURCE = String.raw`^\s*(?:[-+*]|\d+[.)])\s`;
const SENTENCE_END_SOURCE = String.raw`[.!?;]\s+`;
const isMarkdown = (path: string): boolean => new RegExp(MARKDOWN_SOURCE, "i").test(path);
const isLineData = (path: string): boolean => new RegExp(LINE_DATA_SOURCE, "i").test(path);
const TABLE_ROW = new RegExp(TABLE_ROW_SOURCE);
const LIST_ITEM = new RegExp(LIST_ITEM_SOURCE);

interface Piece {
  readonly line: number;
  readonly text: string;
}
/** BLOCKS: runs of non-blank lines; a line opening a table row (and, with `lists`, a list item) starts a new block, and with
 * `lines` every line is a block of its own. */
function blocksOf(source: string, lists: boolean, lines = false): Piece[] {
  const blocks: Piece[] = [];
  let current: string[] = [];
  let start = 1;
  const close = (): void => {
    if (current.length > 0) blocks.push({ line: start, text: current.join("\n") });
    current = [];
  };
  source
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .forEach((line, index) => {
      if (line.trim() === "") {
        close();
        return;
      }
      if (current.length > 0 && (lines || TABLE_ROW.test(line) || (lists && LIST_ITEM.test(line)))) close();
      if (current.length === 0) start = index + 1;
      current.push(line);
    });
  close();
  return blocks;
}
/** SENTENCES: each block cut at a run of white space after ".", "!", "?" or ";"; each piece keeps the line it starts on. */
function sentencesOf(source: string, lists: boolean, lines = false): Piece[] {
  return blocksOf(source, lists, lines).flatMap(block => {
    const pieces: Piece[] = [];
    const push = (from: number, to: number): void => {
      const slice = block.text.slice(from, to);
      const lead = slice.length - slice.trimStart().length;
      if (slice.trim() === "") return;
      pieces.push({ line: block.line + (block.text.slice(0, from + lead).match(/\n/g)?.length ?? 0), text: slice.trim() });
    };
    let from = 0;
    for (const match of block.text.matchAll(new RegExp(SENTENCE_END_SOURCE, "g"))) {
      const at = match.index ?? 0;
      push(from, at + 1);
      from = at + match[0].length;
    }
    push(from, block.text.length);
    return pieces;
  });
}

/** The families a text names, in S, K order. */
function familiesIn(value: string): string[] {
  return Object.entries(FAMILY_SOURCES)
    .filter(([, source]) => new RegExp(source, "i").test(value))
    .map(([id]) => id);
}
const blankFamilies = (value: string): string => value.replace(FAMILY_GLOBAL, " ");
const hasMarker = (sentence: string): boolean => MARKER.test(blankFamilies(sentence));
/** asserted-<mark> for the first MARKS member the sentence carries (families blanked), else unmarked. */
function diagnosisOf(sentence: string): string {
  const blank = blankFamilies(sentence);
  const mark = MARK_PATTERNS.find(entry => entry.pattern.test(blank));
  return mark === undefined ? "unmarked" : `asserted-${mark.id}`;
}

interface Reading {
  readonly findings: string[];
  readonly admitted: string[];
}
/** One source's sentences under the family, marker and diagnosis readings; `key` names a sentence by its line or ordinal. */
function readSentences(source: string, lists: boolean, lines: boolean, key: (piece: Piece, index: number) => string): Reading {
  const findings: string[] = [];
  const admitted: string[] = [];
  sentencesOf(source, lists, lines).forEach((piece, index) => {
    const families = familiesIn(piece.text);
    if (families.length === 0) return;
    const name = `${key(piece, index)} ${families.join(",")}`;
    if (hasMarker(piece.text)) admitted.push(name);
    else findings.push(`${name}: ${diagnosisOf(piece.text)}`);
  });
  return { findings, admitted };
}
/** (a) over one walked file: an unanchored file is not judged (R-UNANCHORED). */
function readFile(path: string, source: string): Reading {
  if (!ANCHOR.test(source)) return { findings: [], admitted: [] };
  return readSentences(source, isMarkdown(path), isLineData(path), piece => `${path}:${piece.line}`);
}
/** Is the program named as a phrase of its own? A name attached to an identifier part or a path (a requirement tag, a dated
 * slug, a prefixed name, a document locator) is a citation. */
function namesProgram(value: string): boolean {
  for (const match of value.matchAll(PROGRAM)) {
    const at = match.index ?? 0;
    const before = value.slice(0, at);
    const after = value.slice(at + match[0].length);
    if (!new RegExp(ATTACHED_BEFORE_SOURCE).test(before) && !new RegExp(ATTACHED_AFTER_SOURCE).test(after)) return true;
  }
  return false;
}
/** The never word a block carries with STATUS blanked, as a diagnosis, or undefined. */
function neverOf(block: string): string | undefined {
  const found = NEVER.exec(block.replace(STATUS_GLOBAL, " "));
  if (found === null) return undefined;
  return /implemented/i.test(found[0]) ? "says-implemented" : "says-measured-improvement";
}
const carriesStatus = (block: string): boolean => new RegExp(STATUS_GLOBAL.source, "i").test(block);
/** (b) over one walked file: every block naming the program carries STATUS (B1) and no never word (B2). */
function readSummaries(path: string, source: string): { readonly status: string[]; readonly never: string[]; readonly summaries: string[] } {
  const status: string[] = [];
  const never: string[] = [];
  const summaries: string[] = [];
  for (const block of blocksOf(source, isMarkdown(path), isLineData(path))) {
    if (!namesProgram(block.text)) continue;
    summaries.push(`${path}:${block.line}`);
    if (!carriesStatus(block.text)) status.push(`${path}:${block.line} status-absent`);
    const word = neverOf(block.text);
    if (word !== undefined) never.push(`${path}:${block.line} ${word}`);
  }
  return { status, never, summaries };
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch (error) {
      // A directory gone between its listing and its read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}

interface TreeReading {
  readonly walk: Walk;
  readonly texts: ReadonlyMap<string, string>;
  readonly exempt: ReadonlyMap<string, string>;
  readonly binary: readonly string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root`: each file read once; a binary file is set aside, an exempt file kept apart (read, never judged). */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const texts = new Map<string, string>();
  const exempt = new Map<string, string>();
  const binary: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of walk.files) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
    if (buffer.includes(0)) {
      binary.push(file);
      continue;
    }
    (EXEMPT.includes(file) ? exempt : texts).set(file, buffer.toString("utf8"));
  }
  return { walk, texts, exempt, binary, anchorsWalked: WALK_ANCHORS.every(([path]) => anchors.get(path) === true) };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
/** The judged findings of a tree reading under (a). */
const treeFindings = (tree: TreeReading): string[] => [...tree.texts].flatMap(([path, source]) => readFile(path, source).findings);
const rootOf = (file: string): string => (file.includes("/") ? file.slice(0, file.indexOf("/")) : "");

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | Buffer | null>>): TreeReading {
  const root = makeScratch("tsx-skip-cache-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}

interface Edge {
  readonly dependsOn: string;
  readonly type: string;
}
interface BeadRecord {
  readonly id: string;
  readonly fields: Readonly<Record<string, string>>;
  readonly edges: readonly Edge[];
}
interface ExportReading {
  readonly rows: readonly BeadRecord[];
  readonly unparsed: readonly number[];
}
/** The export's rows: each line one JSON row (an empty line skipped); a line that does not parse, or names no id, is listed. */
function parseExport(source: string): ExportReading {
  const rows: BeadRecord[] = [];
  const unparsed: number[] = [];
  source.split("\n").forEach((line, index) => {
    if (line.trim() === "") return;
    let row: unknown;
    try {
      row = JSON.parse(line);
    } catch {
      unparsed.push(index + 1);
      return;
    }
    if (!isObject(row) || typeof row.id !== "string") {
      unparsed.push(index + 1);
      return;
    }
    const fields: Record<string, string> = {};
    for (const field of ["title", "description", "design", "acceptance_criteria", "notes"]) {
      const value = row[field];
      fields[field] = typeof value === "string" ? value : "";
    }
    const comments = row.comments;
    fields.comments = Array.isArray(comments) ? comments.map(comment => (isObject(comment) && typeof comment.text === "string" ? comment.text : "")).join("\n\n") : "";
    const dependencies = row.dependencies;
    const edges = Array.isArray(dependencies)
      ? dependencies.flatMap((edge: unknown): Edge[] => (isObject(edge) && typeof edge.depends_on_id === "string" && typeof edge.type === "string" ? [{ dependsOn: edge.depends_on_id, type: edge.type }] : []))
      : [];
    rows.push({ id: row.id, fields, edges });
  });
  return { rows, unparsed };
}
let store: ExportReading | undefined;
/** The tracked export's reading, taken once. */
function liveStore(): ExportReading {
  store ??= parseExport(readFileSync(join(REPO, BEAD_EXPORT), "utf8"));
  return store;
}
const fieldOf = (row: BeadRecord, field: string): string => row.fields[field] ?? "";
const anchoredRow = (row: BeadRecord): boolean => MENTION_FIELDS.some(field => ANCHOR.test(fieldOf(row, field)));
/** (a) over the store: each judged field of an anchored row, cut into sentences (list items too). */
function readRows(rows: readonly BeadRecord[]): Reading {
  const findings: string[] = [];
  const admitted: string[] = [];
  for (const row of rows) {
    if (!anchoredRow(row)) continue;
    for (const field of JUDGED_FIELDS) {
      const reading = readSentences(fieldOf(row, field), true, false, (_piece, index) => `${row.id}.${field}:${index + 1}`);
      findings.push(...reading.findings);
      admitted.push(...reading.admitted);
    }
  }
  return { findings, admitted };
}
/** (b) over the store: a judged field naming the program carries no never word (STATUS blanked); the rows naming it. */
function readNamedRows(rows: readonly BeadRecord[]): { readonly findings: string[]; readonly named: string[] } {
  const findings: string[] = [];
  const named: string[] = [];
  for (const row of rows) {
    let names = false;
    for (const field of JUDGED_FIELDS) {
      for (const block of blocksOf(fieldOf(row, field), true)) {
        if (!namesProgram(block.text)) continue;
        names = true;
        const word = neverOf(block.text);
        if (word !== undefined) findings.push(`${row.id}.${field} ${word}`);
      }
    }
    if (names) named.push(row.id);
  }
  return { findings, named };
}
/** The rows whose judged fields carry the program's words at all, named or cited. */
const citedRows = (rows: readonly BeadRecord[]): string[] => rows.filter(row => JUDGED_FIELDS.some(field => new RegExp(PROGRAM_SOURCE, "i").test(fieldOf(row, field)))).map(row => row.id);
/** The rows whose title carries the gating clause: the gate is the one such row. */
const gatesOf = (rows: readonly BeadRecord[]): string[] => rows.filter(row => fieldOf(row, "title").includes(GATE_CLAUSE)).map(row => row.id);
/** An anchored row other than the gate that names a family in any text field. */
const mentionRows = (rows: readonly BeadRecord[], gate: string): BeadRecord[] =>
  rows.filter(row => row.id !== gate && anchoredRow(row) && MENTION_FIELDS.some(field => familiesIn(fieldOf(row, field)).length > 0));
/** C1: does some sentence of some text field name ADR-0032 beside a deferral word? */
const carriesWording = (row: BeadRecord): boolean => MENTION_FIELDS.some(field => sentencesOf(fieldOf(row, field), true).some(piece => ADR.test(piece.text) && DEFERRAL.test(piece.text)));
/** C1 over a store: the mention rows that carry no wording. */
function wordingFindings(rows: readonly BeadRecord[]): string[] {
  const [gate = ""] = gatesOf(rows);
  return mentionRows(rows, gate)
    .filter(row => !carriesWording(row))
    .map(row => `${row.id} no-deferral-wording`);
}
/** C2 over a store: a mention row without a related edge to the gate, or with a blocks edge either way. */
function edgeFindings(rows: readonly BeadRecord[]): string[] {
  const [gate = ""] = gatesOf(rows);
  const gateRow = rows.find(row => row.id === gate);
  return mentionRows(rows, gate).flatMap(row => {
    const found: string[] = [];
    if (!row.edges.some(edge => edge.dependsOn === gate && RELATED_TYPES.includes(edge.type))) found.push(`${row.id} no-related-edge`);
    const blocks = row.edges.some(edge => edge.dependsOn === gate && edge.type === BLOCKS_TYPE) || (gateRow?.edges.some(edge => edge.dependsOn === row.id && edge.type === BLOCKS_TYPE) ?? false);
    if (blocks) found.push(`${row.id} blocks-edge`);
    return found;
  });
}
/** No row of the store may block on the gate. */
function blocksToGate(rows: readonly BeadRecord[]): string[] {
  const [gate = ""] = gatesOf(rows);
  return rows.filter(row => row.edges.some(edge => edge.dependsOn === gate && edge.type === BLOCKS_TYPE)).map(row => row.id);
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row (title and notes) in the tracked export. */
function readBeadRow(): BeadRow {
  const row = liveStore().rows.find(entry => entry.id === BEAD);
  if (row === undefined) throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
  return { title: fieldOf(row, "title"), notes: fieldOf(row, "notes") };
}
/** The text between `start` and the next `end` after it, or "". */
function between(value: string, start: string, end: string): string {
  const from = value.indexOf(start);
  if (from < 0) return "";
  const to = value.indexOf(end, from + start.length);
  return to < 0 ? "" : value.slice(from + start.length, to);
}
/** The filing's acceptance clauses: its "Acceptance: " text up to " Not P0:", split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = between(notes, "Acceptance: ", " Not P0:");
  return line
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/)
    .filter(clause => clause.length > 0);
}
/** The title's statement: after the requirement tag, up to the first "; ". */
const statementOf = (title: string): string => between(title, "] ", "; ");
/** The title's gating sentence: from "Pi echoes " through the close of its "(gated: ...)" parenthesis. */
function gateSentenceOf(title: string): string {
  const from = title.indexOf("Pi echoes ");
  const to = title.indexOf(") - ", from);
  return from < 0 || to < 0 ? "" : title.slice(from, to + 1);
}
/** The pin atoms the bead row yields, in pin order: (a)'s scopes, (b)'s obligations, (c)'s carried items, the gating clause. */
function pinAtoms(bead: BeadRow): string[] {
  const [a = "", b = "", c = ""] = acceptanceClauses(bead.notes);
  const scopes = between(a, "grep of ", " for ").split(" and ");
  const obligations = b.slice(b.indexOf("any Pi summary of this program ") + "any Pi summary of this program ".length).split(" and ");
  const items = c.slice(c.indexOf(" carries ") + " carries ".length).split(" and ");
  return [...scopes, ...obligations, ...items, between(bead.title, "(gated: ", " - ")];
}
/** The atom a pin answers: the bead row's atom at the pin's position in row order. */
function anchorOf(pin: string): string {
  return pinAtoms(readBeadRow())[ROWS.flatMap(row => row.pins).indexOf(pin)] ?? "";
}
interface FilingVocabulary {
  readonly skipWording: string[];
  readonly cacheWording: string[];
  readonly marks: string[];
  readonly status: string;
  readonly never: string[];
  readonly edge: string[];
}
/** The spellings the filing itself uses: the wording pairs of the statement, (a) and (c), (a)'s marks, (b)'s phrase and words, (c)'s edge types. */
function filingVocabulary(bead: BeadRow): FilingVocabulary {
  const [a = "", b = "", c = ""] = acceptanceClauses(bead.notes);
  const pairs = [between(statementOf(bead.title), "shall mark ", " as already needed"), between(a, " for ", " wording marked "), between(c, "mentioning TSX ", " carries ")].map(pair => pair.split(" or "));
  const never = /never "([^"]+)"\/"([^"]+)"/.exec(b);
  const edge = /a (\S+) \(never (\S+)\) edge/.exec(c);
  return {
    skipWording: pairs.map(pair => pair[0] ?? ""),
    cacheWording: pairs.map(pair => pair[1] ?? ""),
    marks: between(a, " wording marked ", " for the TSX SDK").split("/"),
    status: /"([^"]+)"/.exec(b)?.[1] ?? "",
    never: never === null ? [] : [never[1] ?? "", never[2] ?? ""],
    edge: edge === null ? [] : [edge[1] ?? "", edge[2] ?? ""],
  };
}
const wholly = (source: string, value: string): boolean => new RegExp(`^(?:${source})$`, "i").test(value);

interface GateReading {
  readonly open: boolean;
  readonly packetCreated: boolean;
  readonly verdicts: { readonly [requirement: string]: string };
}
/** The verdict word a measured Verdict line carries in bold (ADOPT, DEFER or REJECT), else UNREAD. */
const verdictOf = (line: Excerpt): string => /\*\*(ADOPT|DEFER|REJECT)\.\*\*/.exec(line.text)?.[1] ?? "UNREAD";
/** The producer's gate: open once a verdict reads anything but DEFER or REJECT (ADOPT, or no verdict at all) or the packet
 * leaves the not-created packets (the heading drops "not created", or the packet's row is gone). */
function producerGate(producer: Producer): GateReading {
  const packetCreated = !/\bnot created\b/i.test(producer.packet.heading.text) || !producer.packet.row.text.includes(`| ${producer.packet.id} |`);
  const verdicts = Object.fromEntries(Object.entries(producer.adr.verdicts).map(([requirement, line]): [string, string] => [requirement, verdictOf(line)]));
  const deferred = Object.keys(verdicts).length > 0 && Object.values(verdicts).every(verdict => verdict === "DEFER" || verdict === "REJECT");
  return { open: packetCreated || !deferred, packetCreated, verdicts };
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, anchor: anchorOf(pin), ...witness };
}
/** A1's judge over one snippet read as `path`: its findings without the source prefix, joined, or false. */
function judged(path: string, source: string): string | false {
  const findings = readFile(path, source).findings.map(finding => finding.slice(finding.indexOf(" ") + 1));
  return findings.length === 0 ? false : findings.join(" | ");
}
/** A store of constructed rows, each `{ id, title?, notes?, ... , edges? }`. */
function rowsOf(entries: readonly { readonly id: string; readonly edges?: readonly Edge[]; readonly [field: string]: unknown }[]): BeadRecord[] {
  return entries.map(entry => ({
    id: entry.id,
    fields: Object.fromEntries(MENTION_FIELDS.map(field => [field, typeof entry[field] === "string" ? (entry[field] as string) : ""])),
    edges: entry.edges ?? [],
  }));
}
/** A2's judge over one constructed row: its findings without the row prefix, joined, or false. */
function judgedRow(entry: { readonly id: string; readonly [field: string]: unknown }): string | false {
  const findings = readRows(rowsOf([entry])).findings.map(finding => finding.slice(finding.indexOf(".") + 1));
  return findings.length === 0 ? false : findings.join(" | ");
}
const GATE_ROW = { id: "wb-gate", title: `[R1] Pi echoes ADR-0032's deferred status (gated: ${GATE_CLAUSE}, not created)` };
/** A store holding the gate and one mention variant: the variant's C1 or C2 findings without the row id, joined, or false. */
function judgedMention(read: (rows: readonly BeadRecord[]) => string[], entry: { readonly id: string; readonly edges?: readonly Edge[]; readonly [field: string]: unknown }, gate: { readonly id: string; readonly edges?: readonly Edge[]; readonly [field: string]: unknown } = GATE_ROW): string | false {
  const findings = read(rowsOf([gate, entry])).map(finding => finding.slice(finding.indexOf(" ") + 1));
  return findings.length === 0 ? false : findings.join(" | ");
}
const related = (type = "related", to = GATE_ROW.id): Edge[] => [{ dependsOn: to, type }];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const tree = liveTree();
    const findings = treeFindings(tree);
    const counts: Record<string, number> = Object.fromEntries(Object.keys(FLOORS.roots).map((root): [string, number] => [root, tree.walk.files.filter(file => rootOf(file) === root).length]));
    const rootsFloorMet = Object.entries(FLOORS.roots).every(([root, floor]) => (counts[root] ?? 0) >= floor);
    const filesFloorMet = tree.walk.files.length >= FLOORS.files;
    const anchored = [...tree.texts.values()].filter(source => ANCHOR.test(source)).length;
    const anchoredFloorMet = anchored >= FLOORS.anchored;
    /** Judged, an exempt file yields findings under (a) or (b): its exemption is load-bearing. */
    const loadBearing = (file: string): boolean => {
      const source = tree.exempt.get(file) ?? "";
      const summaries = readSummaries(file, source);
      return readFile(file, source).findings.length + summaries.status.length + summaries.never.length > 0;
    };
    const selfPresent = [SELF, ROSTER_FILE].every(file => tree.exempt.has(file));
    const notLoadBearing = EXEMPT.filter(file => tree.exempt.has(file) && !loadBearing(file));
    const exemptionsLoadBearing = selfPresent && notLoadBearing.length === 0;
    expect(filesFloorMet, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect(rootsFloorMet, `files per root: ${JSON.stringify(counts)}`).toBe(true);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect(anchoredFloorMet, `anchored judged files: ${anchored}`).toBe(true);
    expect({ exempt: [...EXEMPT], selfPresent, notLoadBearing }, "the exemptions: this file, its roster and the wb-csbt.2 census; each present one, judged, yields findings").toStrictEqual({
      exempt: [SELF, ROSTER_FILE, ...SIBLING_EXEMPT],
      selfPresent: true,
      notLoadBearing: [],
    });
    expect({ findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "walked sentences naming a skip or cache family without a posture marker").toStrictEqual({ findings: [], symlinks: [], unreadable: [] });
    const controls: JsonObject = {
      needed: judged("c.md", "rf: component skipping is needed."),
      required: judged("c.md", "The TSX SDK requires a serialization cache."),
      adopted: judged("c.md", "rf adopted assembly caches."),
      unmarked: judged("c.md", "The TSX SDK skips unchanged component subtrees."),
      bothFamilies: judged("c.md", "rf needs component-subtree skipping and assembly/serialization caches."),
      codeComment: judged("c.ts", "// rf: the serialization cache is required for each render\nexport const x = 1;\n"),
      stringLiteral: judged("c.ts", 'export const label = "TSX component skip enabled";\n'),
      jsonValue: judged("c.json", '{ "note": "rf adopts the assembly cache" }\n'),
      jsonLines: judged("c.json", '{\n "other": "not this one",\n "note": "rf adopts the assembly cache"\n}\n'),
      jsonlRow: judged("c.jsonl", '{"id":"a","note":"never"}\n{"id":"b","note":"rf adopts the assembly cache"}\n'),
      twoSentences: judged("c.md", "rf adopts component skipping. Nothing else is deferred."),
      semicolon: judged("c.md", "The TSX serialization cache is required; nothing else is deferred."),
      tableRow: judged("c.md", "| rf | not used |\n| TSX | component skip needed |\n"),
      listItem: judged("c.md", "- TSX assembly cache: required\n- the rest is not\n"),
      listItemInCode: judged("c.ts", "// - TSX assembly cache: required\n// - the rest is not\n"),
      codeLinesRunTogether: judged("c.ts", '// rf: the serialization cache is required\nif (!ready) throw new Error("not ready");\n'),
      wrappedLine: judged("c.md", "The TSX SDK needs\ncomponent skipping."),
      blankLine: judged("c.md", "TSX component skipping is required\n\nnot."),
      anchorElsewhere: judged("c.md", "rf renders for Pi.\n\nThe serialization cache is required."),
      markers: Object.fromEntries(
        [...MARKERS.map((marker): [string, string | false] => [marker, judged("c.md", `rf: component skipping ${marker} here.`)]), ["n't", judged("c.md", "rf doesn't adopt component skipping.")] as [string, string | false]],
      ),
      marks: Object.fromEntries(
        ["need", "needs", "needed", "needing", "require", "requires", "required", "requiring", "requirement", "requirements", "adopt", "adopts", "adopted", "adopting", "adoption"].map((word): [string, string | false] => [
          word,
          judged("c.md", `rf: component skipping ${word}.`),
        ]),
      ),
      spellings: Object.fromEntries(SPELLINGS.map(([id, spelling]): [string, string | false] => [id, familiesIn(spelling).join(",") || false])),
      nearMiss: judged("c.md", "rf skips nothing here; the TSX component renders; the assembly is cached elsewhere by key."),
      unanchored: judged("c.md", "Pi needs a serialization cache."),
      markerAnywhere: judged("c.md", "rf requires component skipping, not optional."),
      paraphraseMemo: judged("c.md", "rf needs memoized components."),
      paraphraseBailout: judged("c.md", "rf requires a subtree bailout."),
      paraphraseReuse: judged("c.md", "rf needs to reuse the prior serialized output."),
      splitPronoun: judged("c.md", "rf studied the assembly cache, which is deferred. It is now required."),
      composed: judged("c.ts", 'export const label = "rf needs a serialization" + " cache";\n'),
      lookalike: judged("c.md", `rf needs component sk${CYRILLIC_I}pping.`),
      joiner: judged("c.md", `rf needs component${ZERO_WIDTH_JOINER} skipping.`),
      encoded: judged("c.md", "rf needs component&#32;skipping."),
    };
    const claim = "rf: the serialization cache is required.\n";
    const planted = plantedTree({
      "README.md": claim,
      "docs/notes.md": claim,
      "src/claim.ts": `// ${claim}`,
      "src/journal.ts": "// Pi's journal needs a serialization cache.\n",
      "qa/claim.mjs": `// ${claim}`,
      "test/fixtures/deep/claim.json": JSON.stringify({ other: "not this one", note: claim }, null, 1),
      "examples/claim.md": claim,
      "new-feedback/claim.md": claim,
      "vendor/README.md": claim,
      ".agents/skills/s/SKILL.md": claim,
      "nested/node_modules/claim.md": claim,
      "link.md": null,
      "node_modules/pkg/notes.md": claim,
      "dist/notes.md": claim,
      "build/notes.md": claim,
      "coverage/notes.md": claim,
      ".forge/notes.md": claim,
      ".git/notes.md": claim,
      ".beads/notes.md": claim,
      "media/blob.bin": Buffer.concat([Buffer.from(claim), Buffer.from([0])]),
    });
    const flagged = new Set([...treeFindings(planted).map(finding => finding.slice(0, finding.indexOf(":"))), ...planted.walk.symlinks]);
    const plants = Object.fromEntries(
      [
        "README.md",
        "docs/notes.md",
        "src/claim.ts",
        "src/journal.ts",
        "qa/claim.mjs",
        "test/fixtures/deep/claim.json",
        "examples/claim.md",
        "new-feedback/claim.md",
        "vendor/README.md",
        ".agents/skills/s/SKILL.md",
        "nested/node_modules/claim.md",
        "link.md",
        "node_modules/pkg/notes.md",
        "dist/notes.md",
        "build/notes.md",
        "coverage/notes.md",
        ".forge/notes.md",
        ".git/notes.md",
        ".beads/notes.md",
        "media/blob.bin",
      ].map((path): [string, boolean] => [path, flagged.has(path)]),
    );
    return done("A1", { filesFloorMet, rootsFloorMet, anchorsWalked: tree.anchorsWalked, anchoredFloorMet, exemptionsLoadBearing, findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable, controls, plants });
  },
  A2: () => {
    const { rows, unparsed } = liveStore();
    const reading = readRows(rows);
    const rowsFloorMet = rows.length >= FLOORS.rows;
    const postureRead = POSTURE_ANCHORS.filter(anchor => reading.admitted.includes(anchor));
    expect(rowsFloorMet, `export rows read: ${rows.length}`).toBe(true);
    expect({ unparsed: [...unparsed], findings: reading.findings }, "export lines that do not parse, and judged sentences naming a family without a marker").toStrictEqual({ unparsed: [], findings: [] });
    expect(postureRead, "the filing family's posture titles are read as mentions and admitted by their markers").toEqual([...POSTURE_ANCHORS]);
    const parsed = parseExport('{"id":"wb-x","title":"ok"}\n\n{broken\n{"title":"no id"}\n');
    const controls: JsonObject = {
      titleClaim: judgedRow({ id: "wb-x", title: "rf adopts component skipping" }),
      descriptionClaim: judgedRow({ id: "wb-x", description: "The TSX serialization cache is required." }),
      designClaim: judgedRow({ id: "wb-x", design: "rf needs an assembly cache." }),
      acceptanceClaim: judgedRow({ id: "wb-x", acceptance_criteria: "- TSX component skip enabled\n- nothing else is deferred" }),
      secondSentence: judgedRow({ id: "wb-x", description: "rf defers the assembly cache. The TSX component skip is required." }),
      anchorInNotes: judgedRow({ id: "wb-x", title: "The serialization cache is required", notes: "TSX program" }),
      markedTitle: judgedRow({ id: "wb-x", title: "rf defers component skipping" }),
      negatedTitle: judgedRow({ id: "wb-x", title: "No Pi surface marks the TSX assembly cache as needed" }),
      notesClaim: judgedRow({ id: "wb-x", title: "TSX", notes: "rf adopts the assembly cache." }),
      commentClaim: judgedRow({ id: "wb-x", title: "TSX", comments: "rf adopts the assembly cache." }),
      unanchoredRow: judgedRow({ id: "wb-x", title: "Pi needs a serialization cache" }),
      markerAnywhereTitle: judgedRow({ id: "wb-x", title: "rf requires component skipping, not optional" }),
      unparsedLines: [...parsed.unparsed],
      parsedRows: parsed.rows.map(row => row.id),
    };
    return done("A2", { rowsFloorMet, unparsed: [...unparsed], findings: reading.findings, postureRead, controls });
  },
  B1: () => {
    const tree = liveTree();
    const readings = [...tree.texts].map(([path, source]) => readSummaries(path, source));
    const summaries = readings.flatMap(reading => reading.summaries);
    const findings = readings.flatMap(reading => reading.status);
    expect(findings, `walked summaries lacking the status phrase (summaries read: ${summaries.join(", ") || "none"})`).toEqual([]);
    const status = (path: string, source: string): string | false => readSummaries(path, source).status.map(finding => finding.slice(finding.indexOf(" ") + 1))[0] ?? false;
    const controls: JsonObject = {
      statusCarried: status("c.md", "The resource-efficiency frontier program is design, not implementation or measured improvement."),
      statusAbsent: status("c.md", "The resource-efficiency frontier program studies resource cost."),
      statusWrapped: status("c.md", "The Resource Efficiency Frontier program is design, not\nimplementation or measured improvement."),
      statusCased: status("c.md", "The resource-efficiency frontier: Design, Not Implementation Or Measured Improvement."),
      titleCased: status("c.md", "Resource-Efficiency Frontier: profiling notes."),
      underscored: status("c.ts", "// resource_efficiency_frontier notes\n"),
      otherBlock: status("c.md", "The resource-efficiency frontier program studies cost.\n\nStatus: design, not implementation or measured improvement."),
      listItemSummary: status("c.md", "- design, not implementation or measured improvement\n- the resource-efficiency frontier program\n"),
      unnamedSummary: status("c.md", "The program studies cost; it is finished."),
      epicTagOnly: status("c.md", "The PERF-F epic is finished."),
      citationOnly: status("c.md", "See docs/programs/resource-efficiency-frontier-2026-10-17/README.md:8 for the cost model."),
      tagOnly: status("c.md", "TSX-RESOURCE-EFFICIENCY-FRONTIER-R1 is pinned by this census."),
      datedSlug: status("c.md", "The resource-efficiency-frontier-2026-10-17 directory holds five files."),
      prefixedName: status("c.md", "The tsx-resource-efficiency-frontier obligations are four."),
      rowWithoutStatus: readNamedRows(rowsOf([{ id: "wb-x", title: "resource-efficiency frontier obligations" }])).findings[0] ?? false,
    };
    return done("B1", { findings, controls });
  },
  B2: () => {
    const tree = liveTree();
    const treeNever = [...tree.texts].flatMap(([path, source]) => readSummaries(path, source).never);
    const { findings } = readNamedRows(liveStore().rows);
    const cited = citedRows(liveStore().rows);
    const citedRead = CITED_ROW_ANCHORS.filter(id => cited.includes(id));
    expect({ treeNever, rowNever: findings }, "summaries and named rows carrying a never word").toStrictEqual({ treeNever: [], rowNever: [] });
    expect(citedRead, "the rows citing the program are read (as citations: no never finding, no summary)").toEqual([...CITED_ROW_ANCHORS]);
    const never = (source: string): string | false => readSummaries("c.md", source).never.map(finding => finding.slice(finding.indexOf(" ") + 1))[0] ?? false;
    const rowNever = (title: string): string | false => readNamedRows(rowsOf([{ id: "wb-x", title }])).findings.map(finding => finding.slice(finding.indexOf(" ") + 1))[0] ?? false;
    const controls: JsonObject = {
      implementedWord: never("The resource-efficiency frontier program is design, not implementation or measured improvement; Pi implemented it."),
      measuredImprovement: never("The resource-efficiency frontier program is design, not implementation or measured improvement.\nIt shows a measured improvement."),
      pluralImprovements: never("The resource-efficiency frontier program reports measured improvements."),
      statusOnly: never("The resource-efficiency frontier program: design, not implementation or measured improvement."),
      implementationNoun: never("The resource-efficiency frontier program names an implementation plan, design, not implementation or measured improvement."),
      unimplemented: never("The resource-efficiency frontier program is unimplemented: design, not implementation or measured improvement."),
      rowImplemented: rowNever("resource-efficiency frontier implemented"),
      rowStatusOnly: rowNever("resource-efficiency frontier: design, not implementation or measured improvement"),
      citationImplemented: rowNever("docs/programs/resource-efficiency-frontier-2026-10-17/README.md:2 implemented"),
      tagImplemented: rowNever("TSX-RESOURCE-EFFICIENCY-FRONTIER-R1 implemented"),
    };
    return done("B2", { treeNever, rowNever: findings, citedRead, controls });
  },
  C1: () => {
    const { rows } = liveStore();
    const gates = gatesOf(rows);
    const findings = wordingFindings(rows).sort();
    const gateRow = rows.find(row => row.id === gates[0]);
    const gateWording = gateRow !== undefined && carriesWording(gateRow);
    expect(gates, "exactly one row's title names the gating artifact").toEqual([BEAD]);
    expect(gateWording, "the gate carries the ADR-0032 deferral wording itself").toBe(true);
    expect(findings, "mention rows without an ADR-0032 sentence carrying a deferral word, exactly the measured KNOWN set").toEqual([...(KNOWN.C1 ?? [])]);
    const wording = (entry: { readonly id: string; readonly [field: string]: unknown }): string | false => judgedMention(wordingFindings, entry);
    const controls: JsonObject = {
      withWording: wording({ id: "wb-x", notes: "rf: ADR-0032 defers component skipping." }),
      gatedWording: wording({ id: "wb-x", title: "TSX serialization cache", notes: "ADR-0032 keeps it gated." }),
      deferralNoun: wording({ id: "wb-x", title: "TSX serialization cache", description: "The ADR-0032 deferral stands." }),
      noWording: wording({ id: "wb-x", notes: "rf: component skipping per ADR-0032." }),
      wordingSplit: wording({ id: "wb-x", notes: "rf: ADR-0032 names the serialization cache. The packet is deferred." }),
      wordingInComment: wording({ id: "wb-x", title: "TSX assembly cache", comments: "ADR-0032 defers it." }),
      noAdr: wording({ id: "wb-x", notes: "rf: the deferred component skip." }),
      mentionInNotesOnly: wording({ id: "wb-x", title: "TSX work", notes: "subtree skip" }),
      gateExcluded: judgedMention(wordingFindings, { id: "wb-other", title: "unrelated" }, { ...GATE_ROW, notes: "component skipping" }),
      unanchoredRow: wording({ id: "wb-x", notes: "Pi's journal keeps a serialization cache." }),
      wordingAnywhere: wording({ id: "wb-x", notes: "rf: ADR-0032 is cited beside a gated live tier and the serialization cache." }),
      gates: {
        none: gatesOf(rowsOf([{ id: "wb-x", title: "TSX" }])).length,
        two: gatesOf(rowsOf([GATE_ROW, { ...GATE_ROW, id: "wb-y" }])).length,
      },
    };
    return done("C1", { gates, gateWording, findings, controls });
  },
  C2: () => {
    const { rows } = liveStore();
    const findings = edgeFindings(rows).sort();
    const blocking = blocksToGate(rows);
    expect(blocking, "rows holding a blocks edge to the gate").toEqual([]);
    expect(findings, "mention rows without a related edge to the gate or with a blocks edge, exactly the measured KNOWN set").toEqual([...(KNOWN.C2 ?? [])]);
    const edge = (edges: readonly Edge[], gate = GATE_ROW as { readonly id: string; readonly edges?: readonly Edge[]; readonly [field: string]: unknown }): string | false =>
      judgedMention(edgeFindings, { id: "wb-x", title: "TSX serialization cache", notes: "ADR-0032 defers it.", edges }, gate);
    const controls: JsonObject = {
      relatedEdge: edge(related()),
      relatesTo: edge(related("relates-to")),
      noEdge: edge([]),
      edgeToOther: edge(related("related", "wb-other")),
      parentChild: edge(related("parent-child")),
      discoveredFrom: edge(related("discovered-from")),
      blocksEdge: edge([...related(), { dependsOn: GATE_ROW.id, type: "blocks" }]),
      gateBlocks: edge(related(), { ...GATE_ROW, edges: [{ dependsOn: "wb-x", type: "blocks" }] }),
      blocksToGate: blocksToGate(rowsOf([GATE_ROW, { id: "wb-y", title: "unrelated", edges: [{ dependsOn: GATE_ROW.id, type: "blocks" }] }])),
    };
    return done("C2", { findings, blocking, controls });
  },
  D1: () => {
    const producer = ROSTER.producer;
    const gate = producerGate(producer);
    const bead = readBeadRow();
    const clause = between(bead.title, "(gated: ", ")");
    const conditions = clause.slice(clause.indexOf(" - ") + 3).split(/, | and /);
    const quoteLine = /Quote: "(.+?)" \S+\. Also \(same dir\+sha\): "(.+?)" (\S+?):(\d+);/.exec(bead.notes);
    const ties = {
      packetNamed: clause.includes(producer.packet.id) && producer.packet.heading.text.includes("per R-08") && clause.includes("per R-08"),
      conditionsRecorded: conditions.length === 3 && conditions.every(condition => producer.reopen.text.includes(condition)),
      quoteMeasured: quoteLine?.[1] === producer.quote.text && producer.quote.path.endsWith("README.md") && producer.quote.line === 8,
      reopenMeasured: quoteLine?.[2] === producer.reopen.text && producer.reopen.path.endsWith(quoteLine?.[3] ?? "\0") && String(producer.reopen.line) === quoteLine?.[4],
      statusMeasured: producer.status.text.includes(STATUS) && producer.status.line === 2,
      flagMeasured: bead.notes.includes(`${producer.flag.path.slice(producer.flag.path.lastIndexOf("/") + 1)}:${producer.flag.line}`),
      adrStatusNamed: bead.notes.includes(`Status ${producer.adr.status.text.replace(/ \((DEC-\d+)\)$/, " $1")}`),
      citationPinned: ROSTER.citation.endsWith(`@${producer.sha.slice(0, 12)}`) && producer.blobs[producer.quote.path] !== undefined,
    };
    expect(gate, `the producer's ADR-0032 gate at ${producer.sha.slice(0, 12)}`).toStrictEqual({ open: false, packetCreated: false, verdicts: { "RFTSX-PERF-009": "DEFER", "RFTSX-PERF-008b": "DEFER" } });
    expect(ties, "the producer facts tie to the owner filing").toStrictEqual(Object.fromEntries(Object.keys(ties).map((key): [string, boolean] => [key, true])));
    const opens = (change: (facts: Producer) => Producer): boolean => producerGate(change(producer)).open;
    const verdictAs = (facts: Producer, requirement: string, word: string): Producer => {
      const line = facts.adr.verdicts[requirement] ?? { path: facts.adr.path, line: 0, text: "" };
      return { ...facts, adr: { ...facts.adr, verdicts: { ...facts.adr.verdicts, [requirement]: { ...line, text: line.text.replace(/\*\*DEFER\.\*\*/, word) } } } };
    };
    const controls: JsonObject = {
      measured: opens(facts => facts),
      verdictAdopt: opens(facts => verdictAs(facts, "RFTSX-PERF-009", "**ADOPT.**")),
      verdictReject: opens(facts => verdictAs(facts, "RFTSX-PERF-008b", "**REJECT.**")),
      verdictUnread: opens(facts => verdictAs(facts, "RFTSX-PERF-008b", "pending")),
      noVerdicts: opens(facts => ({ ...facts, adr: { ...facts.adr, verdicts: {} } })),
      packetCreated: opens(facts => ({ ...facts, packet: { ...facts.packet, heading: { ...facts.packet.heading, text: "## Gated work packages (1; created)" } } })),
      packetRowGone: opens(facts => ({ ...facts, packet: { ...facts.packet, row: { ...facts.packet.row, text: "| TSX-PF-04 | other |" } } })),
      statusConfirmed: opens(facts => ({ ...facts, adr: { ...facts.adr, status: { ...facts.adr.status, text: "Accepted (DEC-48)" } } })),
    };
    return done("D1", { gate: json(gate), packet: producer.packet.id, ties, controls });
  },
};

/** A quiet row's value in the roster: `<pin>:<control>` reads the witness's controls, `<pin>:plant:<path>` its plants. */
function quietValue(id: string): unknown {
  const [pin = "", ...rest] = id.split(":");
  const witness = rosterWitness(pin);
  if (!isObject(witness)) return undefined;
  const plants = witness.plants;
  const controls = witness.controls;
  if (rest[0] === "plant") return isObject(plants) ? plants[rest.slice(1).join(":")] : undefined;
  return isObject(controls) ? controls[rest.join(":")] : undefined;
}
/** A roster witness's anchor, or undefined. */
function rosterAnchor(pin: string): unknown {
  const witness = rosterWitness(pin);
  return isObject(witness) ? witness.anchor : undefined;
}
/** The constants the roster holds: the bead, every scan constant, KNOWN, the residuals and their quiet rows. */
function scanConstants(): Json {
  return json({
    bead: BEAD,
    scan: {
      skip: SKIP_SOURCE,
      cache: CACHE_SOURCE,
      anchor: ANCHOR_SOURCE,
      markers: MARKERS,
      contraction: CONTRACTION_SOURCE,
      marks: MARKS.map(([id, source]) => `${id}:${source}`),
      program: PROGRAM_SOURCE,
      attachedBefore: ATTACHED_BEFORE_SOURCE,
      attachedAfter: ATTACHED_AFTER_SOURCE,
      status: STATUS,
      never: NEVER_SOURCE,
      adr: ADR_SOURCE,
      deferral: DEFERRAL_SOURCE,
      gateClause: GATE_CLAUSE,
      relatedTypes: RELATED_TYPES,
      blocksType: BLOCKS_TYPE,
      markdown: MARKDOWN_SOURCE,
      lineData: LINE_DATA_SOURCE,
      tableRow: TABLE_ROW_SOURCE,
      listItem: LIST_ITEM_SOURCE,
      sentenceEnd: SENTENCE_END_SOURCE,
      judgedFields: JUDGED_FIELDS,
      mentionFields: MENTION_FIELDS,
      skippedRoots: SKIPPED_ROOTS,
      exempt: EXEMPT,
      floors: FLOORS,
      walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
      postureAnchors: POSTURE_ANCHORS,
      citedRowAnchors: CITED_ROW_ANCHORS,
    },
    known: KNOWN,
    residuals: RESIDUAL_FAMILIES,
    quiet: QUIET,
  });
}

/** A describe title: the label, each family match replaced, so a report holding this file's titles names no family. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(FAMILY_GLOBAL, "<family>")}`;

describe("wb-csbt.1 TSX skip and cache deferral census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R1, standing echo leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the owner filing agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:2", "D:1"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(scanConstants()).toStrictEqual(json({ bead: ROSTER.bead, scan: ROSTER.scan, known: ROSTER.known, residuals: ROSTER.residuals, quiet: ROSTER.quiet }));
    // Every residual has pinned quiet rows, and every quiet row reads false in the roster witnesses.
    expect(Object.keys(QUIET), "each residual family has its quiet rows").toEqual([...RESIDUAL_FAMILIES]);
    expect(Object.values(QUIET).flatMap(ids => (ids.length === 0 ? ["(none)"] : ids.filter(id => quietValue(id) !== false))), "quiet rows that are missing or not false").toEqual([]);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = [...clauses, statementOf(bead.title), gateSentenceOf(bead.title)].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage, "each clause, the statement and the gating sentence sit verbatim in exactly one row label").toEqual([["A"], ["B"], ["C"], ["A"], ["D"]]);
    const quote = /Quote: "(.+?)" (\S+?)\. Also/.exec(bead.notes);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    // The filing's own spellings are each read by the vocabulary as themselves.
    const vocabulary = filingVocabulary(bead);
    expect(vocabulary.skipWording.map(spelling => wholly(SKIP_SOURCE, spelling)), `the skip wording of the statement, (a) and (c): ${vocabulary.skipWording.join(" | ")}`).toEqual([true, true, true]);
    expect(vocabulary.cacheWording.map(spelling => wholly(CACHE_SOURCE, spelling)), `the cache wording of the statement, (a) and (c): ${vocabulary.cacheWording.join(" | ")}`).toEqual([true, true, true]);
    expect(vocabulary.marks.map(mark => diagnosisOf(`rf ${mark}`)), "(a)'s marks each diagnose as themselves").toEqual(MARKS.map(([id]) => `asserted-${id}`));
    expect(vocabulary.status, "(b)'s status phrase").toBe(STATUS);
    expect(vocabulary.never.map(word => wholly(NEVER_SOURCE, word)), "(b)'s never words").toEqual([true, true]);
    expect(vocabulary.edge, "(c)'s edge types").toEqual([RELATED_TYPES[0], BLOCKS_TYPE]);
    expect(bead.title.includes(GATE_CLAUSE), "the title names the gating clause").toBe(true);
    // Each pin answers, by position, one atom the bead row yields.
    expect(ROWS.flatMap(row => row.pins).map(rosterAnchor), "each pin's anchor is the bead row's atom at its position").toEqual(pinAtoms(bead));
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and no title names a family", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].filter(name => familiesIn(name).length > 0), "registered titles naming a family").toEqual([]);
  });
});
