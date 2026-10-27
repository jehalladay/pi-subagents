/**
 * wb-if7q.1 (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R1, program-triage-2026-10-22), the absent-today leg. Statement (bead
 * notes, full form): "No Pi surface shall present as shipped, runnable or proven what these programs only propose - the
 * browser-safe TSX host/UI runtime, ReactiveWebInterfaceSDK/ReactiveTUIInterfaceSDK (nor ReactiveFiberDOMSDK or runnable
 * TSX-IF-07 samples), the INTEROP API names, record, declared data outputs, graph/v2 value edge, hosts.rfcli row - nor cite
 * RFCLI's dogfood run or VC-D journey as proof of TSX data publication or parity; Pi pins each absence (unshipped at
 * 76bbbffd9d4a)" (ReactiveFiberTSXSDK docs/programs/native-interfaces-and-portable-tsx-2026-10-21/README.md:3@76bbbffd9d4a).
 * Acceptance (owner filing, verbatim; the labels of rows A, B and C): "(a) a census over Pi docs/src/skills/qa/test (0 hits
 * at d75b68d10a1a) finds no sentence asserting any shipped, runnable, landed or proven; a mutant claiming TSX typed-output
 * support or parity fails; (b) a guard over the pinned TSX repo (exports, src/python grep, TSX-IO files, ADR name) reports
 * ABSENT and flips only on a real symbol, export or file; (c) Pi's RF surface stays the rf CLI envelope (wb-2wiv.1,
 * wb-pyel.1); kind=tsx receipt rows (wb-693.7) carry no TSX data-output or parity claim."
 *
 * THE SOURCE AT THE PIN (ReactiveFiberTSXSDK 76bbbffd9d4a419f972d6fefc8b7f9dc524df8df, read with read-only git show, ls-tree
 * and grep on the local checkout by the cutting seat, 2026-10-23): README.md:3 "Not yet a shipped browser-safe TSX host or UI
 * descriptor runtime."; 02-implementation.md:32 "Do not claim samples runnable until demonstrated."; component-first-context-
 * assembly-2026-10-18/README.md:3 "do not represent proposed API names as shipped", :8 the VC-D journey "does not establish
 * complete TSX-to-Python publication parity", :20 "use the RFCLI installed VC-D test as the Python baseline, not as proof of
 * TSX support"; component-assembly-2026-10-18/RFCLI-INTEROP.md:6 the dogfood run "is not proof that a TSX component can export
 * arbitrary data values to a neighboring component over RFCLI's currently gated graph/v2 data edge".
 * MEASURED PRODUCER FACTS (the roster's `producer` block; Pi vendors none of them): package.json (blob a3cef7aa8938) names the
 * SDK package at 0.1.668 and exports ".", "./jsx-runtime", "./jsx-dev-runtime", "./testing", "./embedding" and
 * "./package.json" - none of the entries 02-implementation.md:4 plans (/core, /ui, /host, /node, /resources); InterfaceHost,
 * SurfaceCapabilities, InterfaceEvaluation, ReactiveWebInterfaceSDK, ReactiveTUIInterfaceSDK and ReactiveFiberDOMSDK are spelled
 * by none of the 159 src and 54 python files (git grep -w), only by program docs; the six TSX-IO acceptance files are absent:
 * TSX-IO-00 tests/audit/interop-pin.test.ts, -01 tests/audit/interop-field-census.test.ts, -03a
 * tests/audit/test_interop_typed_output_census.py, -04 tests/replay/version-drift.test.ts, -05
 * tests/unit/embedding/worker-failure.test.ts and -06 scripts/perf/interop-worker-bench.mjs (this cut's reading of the
 * component-assembly BEADS-2026-10-21.md map and the dp003/dp004 requirement parts at the pin: one acceptance file per work
 * package; TSX-IO-02 rides the existing tests/differential/run_differential.sh); docs/adr lists 81 entries, the latest
 * 0082-incremental-performance-program-positions.md, none named <n>-tsx-declared-data-output.md.
 *
 * READINGS
 * - (a) SCANNED: every regular file below docs/, src/, .agents/ (Pi's installed skills), qa/, test/ and examples/, and the
 *   repository root's .md pages, read as UTF-8; a symlink is refused, never followed. That is the filing's five trees plus two
 *   more Pi surfaces (the root pages, examples/). This file and its roster are EXEMPT: walked, never judged (row A3). The
 *   five trees are bound to the filing (F1): every root its clause (a) names ("docs/src/skills/qa/test") is a directory of
 *   the live tree, holding files, that a SCAN_ROOTS root covers - a root word read as the directory of that name, skills as
 *   Pi's installed skills (SKILLS_ROOT: .agents/skills, which must hold a SKILL.md). The root list is CLAUSE_ROOTS's match
 *   in the clause (clauseRootsOf): it must parse - a clause without the list reads null, never an empty list - hold a root
 *   and, rejoined with "/", restate the export row's own list, so an empty or partial parse reds; the parse carries its own
 *   positive controls (a list, a single root, a clause without the list).
 * - SENTENCE: a file's text cut at a run of white space after ".", "!", "?" or ";", at a blank line and before a line opening a
 *   table row ("|"); a .md file is also cut before a line opening a list item ("-", "+", "*", "1." or "1)" then a space). A code
 *   comment's wrapped lines stay one sentence.
 * - MENTION: a sentence names the proposed surface when a NAMED family (N1-N6, the programs' own names) matches it, or when it
 *   carries the TSX ANCHOR (a whole-word TSX, rftsx, ReactiveFiberTSX or the SDK's package path) and a CONTEXT family (N7-N10,
 *   words Pi also uses in other senses: data output, dogfood, parity, samples) matches it.
 * - FINDING: a mentioning sentence that carries no MARKER (MARKERS, whole words, any case, and the n't contraction), reported
 *   `<path>:<line> <families>: <diagnosis>`. Diagnosis: asserted-<claim> for the first CLAIMS member it carries (the
 *   statement's shipped, runnable and proven, the acceptance's landed and support, each with its inflections), else unmarked:
 *   a sentence presenting the surface as there without a claim word ("Pi reads the interop record") presents it as shipped
 *   as surely as one that says so. Markers and claim words are read with every family match blanked, so a word inside a
 *   name never counts (the IF of TSX-IF-07 is no marker: the first red run's A4 caught exactly that escape).
 * - (b) GUARD: guardTree(root) reads a TSX repository four ways, each ABSENT or PRESENT with its evidence. EXPORTS: a
 *   package.json exports key equal to or below a GATED_EXPORTS entry. SYMBOLS: a declaration named exactly a SYMBOLS member -
 *   an interface, class, type alias, function, enum, namespace, variable or export specifier of a module below src/ (every
 *   script kind, parsed by the TypeScript compiler), or a class, def or module-level assignment of a .py file below python/
 *   (comments and triple-quoted strings dropped first). FILES: a TSX_IO_FILES path that is a regular file. ADR: a docs/adr
 *   entry named <digits>-tsx-declared-data-output.md. A comment, a string, a look-alike name, a docs mention, a near entry
 *   name or a directory never flips it (row B5). The guard reads the PIN REPLICA the roster's producer facts build in scratch
 *   (its package.json export map, the program docs' symbol lines, the src/index.ts and python package heads at the pin, the
 *   81-entry docs/adr listing and the measured neighbours of the TSX-IO paths), so it is hermetic.
 * - (c) RF SURFACE: Pi's rf reader stays the rf CLI envelope - RECONCILE_EVIDENCE_READS.reactivefiber
 *   (src/workflow/reconcile.ts:67, ROSTER_SITE: that line is read from the file and must declare the entry inside the
 *   RECONCILE_EVIDENCE_READS literal) and both registrations hold the read preview only; a stand-in rf on PATH sees one
 *   `context render ... --json` spawn per input arm; no src module loads an RF, TSX or Fiber SDK (RF_SDK against every import,
 *   export, import-equals, import type and the literal first argument of any call or new expression, constant-folded) and no
 *   package.json dependency names one. The kind=tsx receipt rows are the two R9 rows of the rf-tsx tier (TIER, the one file
 *   vitest.rf-tsx.config.ts includes): no string or template literal (folded) or identifier of the tier - its titles, labels
 *   and receipt fields - and no sentence of a docs/workbench/receipts file naming the tier (TIER_NAMES) matches a RECEIPT_CLAIM
 *   family (N5, N7, N9: value edge, data output, parity).
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the walk (per-root floors and anchors, the root pages, no symlink, nothing unreadable); A2 the live
 *    census over every judged file returns no finding; A3 each exemption is load-bearing (judged, this file and its roster
 *    carry findings, so lifting either reds A2); A4 the acceptance's mutants - a scratch tree whose every scanned root plants
 *    one claim (TSX typed-output support and TSX parity among them) reads exactly the planted findings, and the marked twin
 *    of each stays quiet.
 *  B, acceptance (b). B1 the pin replica reads ABSENT on all four probes; B2-B4 it flips on a real export (each gated entry
 *    and a subpath), a real symbol (each SYMBOLS member, TypeScript and Python declarations) and a real file (each TSX-IO
 *    path, the ADR); B5 it stays ABSENT on the near misses.
 *  C, acceptance (c). C1 the rf capability roster; C2 the spawned argv of both input arms; C3 no SDK load in src or the
 *    manifest (with controls); C4 the kind=tsx receipt rows (with controls).
 *  F, the outside anchor (below).
 *  M, the instruments rows A-C read, each pinned member by member: MS1-MS4 the sentence cutter, MN1-MN10 every spelling of
 *    every family (bare and beside the anchor), MK every marker, MW every claim inflection, MF the finding format, MG the
 *    guard's declaration readers.
 *  R, the residuals' pinned quiet rows.
 * OUTSIDE ANCHOR. F1: the owner filing's row of wb-if7q.1 in the tracked bead export (.beads/issues.jsonl) - its acceptance
 * line holds exactly the clauses (a)-(c) and each equals its row label; every proposal and citation item of its full
 * statement (the list after "only propose - ", a one-word item read with its predecessor's qualifier, and the clause after
 * "nor cite "), read beside the anchor, is covered word for word by family matches (STOP words, the anchor and claim words
 * aside), so a family or one of its alternatives removed from every literal of this file and the roster still reds (the
 * coverage reader carries its own positive controls); each claim word of the statement and clause (a) diagnoses as itself;
 * its gating sentence's symbols, exports, file count, ADR slug and version are held by SYMBOLS, GATED_EXPORTS, TSX_IO_FILES,
 * ADR_SLUG and the roster's producer version; and every root its clause (a) names is walked (READINGS (a); the root reader
 * carries its own controls), so a filing root removed from SCAN_ROOTS, A4's plants and the roster together still reds. The
 * root parse is held to the row itself (its list parses, holds a root and restates the row's list) and to its own positive
 * controls, so a parse hollowed - it never matches, reads part of the list, drops a root, is fed an empty clause or reads a
 * miss as an empty list - in this file and the roster together still reds.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label
 * and pins, every pin's witness, the vocabularies and the probe constants - is held to the out-of-file roster
 * (test/fixtures/tsx-unshipped-surface-roster.json). A last case reads that every pin's case ran to its end. Not claimed: a
 * pin of rows M or R removed from ROWS, the literal, IMPL and the roster together (F1 anchors clauses, roots and
 * vocabulary, not those pins); examples/ or the root pages - the two surfaces beyond the filing's roots, which nothing
 * outside this file names - removed from the walk, A4's plants and the roster together; SKILLS_ROOT moved, in this file and
 * the roster together, to another covered directory that holds a SKILL.md; the root parse hollowed together with its own
 * expected values (the liveness expectation and the parse controls' literals) in this file and the roster.
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 R-MARKER-ANYWHERE a marker anywhere in a sentence (a table row
 *   included) admits it, whatever the marker qualifies; R2 R-UNANCHORED a CONTEXT word in a sentence without the anchor (Pi
 *   says parity, data output and dogfood in other senses); R3 R-SPLIT a claim carried by a later sentence that names no
 *   family (a pronoun); R4 R-COMPOSED a name assembled from literal parts; R5 R-LOOKALIKE a look-alike letter or an inserted
 *   invisible; R6 R-ENCODED an HTML reference or a JS escape inside a name; R7 R-PARAPHRASE the surface described outside the
 *   families; R8 R-CODE-LIST a list inside a code comment is one sentence, so one item's marker covers another; R9
 *   R-OUTSIDE-ROOTS a file outside the scanned trees (new-feedback/, vendor/, media/, dist/, node_modules/, .beads/); R10
 *   R-OUTSIDE-SRC a declaration outside src/ and python/ (another package's src, a test); R11 R-WILDCARD an entry reached
 *   only through a "./*" pattern export; R12 R-ADR-GRAMMAR an ADR whose name breaks the <digits>-<slug>.md grammar; R13
 *   R-MOVED a TSX-IO acceptance file landed at another path; R14 R-RUNTIME-COMPOSED a specifier or tier label assembled at
 *   runtime (an array join) escapes C3's and C4's literal reads; R15 R-MARKUP markup inside a name - markdown emphasis
 *   delimiters (Reactive**Web**InterfaceSDK, Reactive *Web* Interface SDK) or an inline HTML tag (Interface<b>Host</b>) -
 *   renders as the name, but the census reads the raw text, where the markup splits it.
 * SCOPE: the vocabularies are this cut's reading of the filing; the producer facts are measured at the pin and not re-read
 * here (the census is hermetic), so a producer change is seen only when a cut re-measures the roster. A later census that
 * needs these names as needles adds its own file to EXEMPT in its cut, beside an A3-style reading.
 *
 * wb-5uq7 (R694 follow-up of landing 293, gate cmd_85b0111446dc): F1 binds row A's walk to the filing's clause (a) roots
 * (the L2-09 survivor), C1 reads its ROSTER_SITE line from the file (F5) and R15 names the markup-inside-a-name escape
 * (L2-14, F2).
 * wb-4azw (R694 follow-up of landing 387, gate cmd_24c598497967): F1's clause (a) root parse gets a liveness floor held to
 * the export row and positive controls of its own (CLAUSE_ROOTS, clauseRootsOf; the HOLLOW-PARSE-COORD and
 * HOLLOW-PARSE-COORD+L2-09 survivors).
 *
 * Display paths added: none. Test-only: the stand-in rf, the scanned trees and the pin replicas live in makeScratch scratch;
 * src, docs, qa, the skills, the receipts directory and the bead export are only read.
 */
import { chmodSync, type Dirent, lstatSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberRender, type ReactiveFiberRenderSelector, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import rfTsxConfig from "../vitest.rf-tsx.config.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROOT = process.cwd();
const SELF = "test/workbench-tsx-unshipped-surface-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-unshipped-surface-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-if7q.1";
const EXEMPT: readonly string[] = [SELF, ROSTER_FILE];

/** The producer pin and the Pi sha the filing read its census count at (owner filing). */
const PIN = "76bbbffd9d4a";
const FILING_READ = "d75b68d10a1a";
/** The SDK's package name, assembled so that no literal of this file spells it where a module specifier could stand. */
const TSX_PACKAGE = ["@reactive-fiber", "tsx"].join("/");
const TSX_VERSION = "0.1.668";

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchor: string;
  readonly token: string;
}
/** (a)'s trees. Each floor sits below the count at base dae1788 (docs 70, src 115, .agents 2, qa 67, test 504, examples 7
 * files), so an emptied or misdirected walk reds and an additive one does not; each anchor file must be walked and read. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "docs", floor: 60, anchor: "docs/workbench/07-native-integrations.md", token: "Do not declare a typed TS context-render client exists without code evidence" },
  { root: "src", floor: 100, anchor: "src/workbench/providers/reactivefiber.ts", token: "RF render refused" },
  { root: ".agents", floor: 1, anchor: ".agents/skills/beads/SKILL.md", token: "name: beads" },
  { root: "qa", floor: 55, anchor: "qa/workbench/receipts-index.mjs", token: "docs/workbench/receipts" },
  { root: "test", floor: 440, anchor: "test/workbench-native-rf-tsx-preview.test.ts", token: "RF-TSX-RECEIPT" },
  { root: "examples", floor: 5, anchor: "examples/agent-tool-description.md", token: "Available agent types" },
];
/** The root's .md pages: five at base dae1788. */
const PAGES_FLOOR = 4;
const PAGE_ANCHOR = { file: "README.md", token: "pi-subagents" };
interface SkillsRoot {
  readonly word: string;
  readonly directory: string;
  readonly member: string;
}
/** F1: the directory clause (a)'s "skills" names - Pi's installed skills, which must hold a SKILL.md (A1's anchor is one). */
const SKILLS_ROOT: SkillsRoot = { word: "skills", directory: ".agents/skills", member: "SKILL.md" };
/** F1: the root list clause (a) names ("a census over Pi docs/src/skills/qa/test (0 hits ..."), read by clauseRootsOf. */
const CLAUSE_ROOTS = /\bcensus over Pi (\S+) \(/;

/** The separator class between two words of a name: any run of white space, "_" or "-". */
const SEP = "[\\s_-]*";
interface Family {
  readonly id: string;
  /** A CONTEXT family reads only in a sentence that carries the TSX ANCHOR. */
  readonly context: boolean;
  readonly source: string;
  /** One spelling per alternative, in order (row MN pins each one). */
  readonly spellings: readonly string[];
}
/** The proposed surface (statement, full form): N1-N6 the programs' names, N7-N10 the CONTEXT words. Case-insensitive. */
const FAMILIES: readonly Family[] = [
  {
    id: "N1",
    context: false,
    source: `\\bbrowser${SEP}safe${SEP}TSX\\b|\\bTSX[\\s_-]+(?:hosts?|UIs?)\\b|\\bUI[\\s_-]+(?:runtimes?|descriptors?)\\b|\\bInterface(?:Host|Evaluation)s?\\b|\\bSurfaceCapabilities\\b`,
    spellings: ["browser-safe TSX", "TSX host", "TSX UI", "UI runtime", "UI descriptors", "InterfaceHost", "InterfaceEvaluation", "SurfaceCapabilities"],
  },
  {
    id: "N2",
    context: false,
    source: `\\bReactive${SEP}(?:Web|TUI)${SEP}Interface${SEP}SDKs?\\b|\\bReactive${SEP}Fiber${SEP}DOM${SEP}SDKs?\\b`,
    spellings: ["ReactiveWebInterfaceSDK", "ReactiveTUIInterfaceSDK", "ReactiveFiberDOMSDK", "Reactive Web Interface SDK", "reactive_tui_interface_sdk"],
  },
  { id: "N3", context: false, source: `\\bTSX${SEP}IF${SEP}\\d+\\b`, spellings: ["TSX-IF-07", "tsx_if_4"] },
  {
    id: "N4",
    context: false,
    source: "\\binterop(?:erability)?[\\s_-]+(?:records?|APIs?)\\b|\\bdeclared[\\s_-]+(?:data[\\s_-]+)?outputs?\\b",
    spellings: ["interop record", "INTEROP API", "interoperability records", "declared data outputs", "declared output"],
  },
  { id: "N5", context: false, source: "\\bgraph\\/v2\\b|\\bvalue[\\s_-]+edges?\\b", spellings: ["graph/v2", "value edge", "value-edges"] },
  { id: "N6", context: false, source: "\\bhosts\\.rfcli\\b", spellings: ["hosts.rfcli"] },
  {
    id: "N7",
    context: true,
    source: `\\b(?:typed|data|value)${SEP}(?:outputs?|publications?)\\b|\\binterop\\w*`,
    spellings: ["typed-output", "data outputs", "data publication", "value publications", "interop"],
  },
  { id: "N8", context: true, source: `\\bdogfood\\w*|\\bVC${SEP}D\\b`, spellings: ["dogfood", "dogfooding", "VC-D"] },
  { id: "N9", context: true, source: "\\bparity\\b|\\bequivalen(?:ce|t)\\b", spellings: ["parity", "equivalence", "equivalent"] },
  { id: "N10", context: true, source: "\\bsamples?\\b", spellings: ["samples", "sample"] },
];
const FAMILY_PATTERNS: ReadonlyMap<string, RegExp> = new Map(FAMILIES.map(family => [family.id, new RegExp(family.source, "i")]));
/** The TSX ANCHOR a CONTEXT family needs in its sentence. */
const ANCHOR = /\bTSX\b|\brftsx\w*|\bReactiveFiberTSX\w*|reactive-fiber\/tsx/i;

/** The words that mark a sentence as not presenting the surface as shipped (closed; whole words, any case). */
const MARKERS: readonly string[] = [
  "not", "no", "never", "nor", "none", "neither", "without", "cannot", "unshipped", "unproven", "unimplemented", "unavailable",
  "unreleased", "absent", "gated", "propose", "proposes", "proposed", "proposal", "planned", "illustrative", "future", "until",
  "unless", "if",
];
const MARKER = new RegExp(`\\b(?:${MARKERS.join("|")})\\b|n[\\u2019']t\\b`, "i");

interface Claim {
  readonly id: string;
  readonly source: string;
  /** Every inflection the source admits, in order (row MW pins each one). */
  readonly inflections: readonly string[];
}
/** The claim words: the statement's shipped, runnable and proven, the acceptance's landed and support. First match wins. */
const CLAIMS: readonly Claim[] = [
  { id: "shipped", source: "ship(?:s|ped|ping)?", inflections: ["ship", "ships", "shipped", "shipping"] },
  { id: "runnable", source: "runnable", inflections: ["runnable"] },
  { id: "landed", source: "land(?:s|ed|ing)?", inflections: ["land", "lands", "landed", "landing"] },
  { id: "proven", source: "prov(?:e|es|ed|en|ing)|proofs?", inflections: ["prove", "proves", "proved", "proven", "proving", "proof", "proofs"] },
  { id: "support", source: "support(?:s|ed|ing)?", inflections: ["support", "supports", "supported", "supporting"] },
];
const CLAIM_PATTERNS = CLAIMS.map(claim => ({ id: claim.id, pattern: new RegExp(`\\b(?:${claim.source})\\b`, "i") }));

/** (b): the entries the program plans (02-implementation.md:4) as the export keys a manifest would carry. */
const GATED_EXPORTS: readonly string[] = ["./core", "./ui", "./host", "./node", "./resources"];
/** (b): the proposed names the filing's gating sentence and its statement list. */
const SYMBOLS: readonly string[] = [
  "InterfaceHost", "SurfaceCapabilities", "InterfaceEvaluation", "ReactiveWebInterfaceSDK", "ReactiveTUIInterfaceSDK", "ReactiveFiberDOMSDK",
];
/** (b): the six TSX-IO acceptance files, in work-package order (header, MEASURED PRODUCER FACTS). */
const TSX_IO_FILES: readonly string[] = [
  "tests/audit/interop-pin.test.ts",
  "tests/audit/interop-field-census.test.ts",
  "tests/audit/test_interop_typed_output_census.py",
  "tests/replay/version-drift.test.ts",
  "tests/unit/embedding/worker-failure.test.ts",
  "scripts/perf/interop-worker-bench.mjs",
];
const ADR_SLUG = "tsx-declared-data-output";
const ADR_NAME = new RegExp(`^\\d+-${ADR_SLUG}\\.md$`);
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"];

const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";
const ROSTER_SITE = "src/workflow/reconcile.ts:67";
/** (c): a package path of an RF, TSX or Fiber SDK, as a specifier or a dependency name spells it. */
const RF_SDK = /@reactive-fiber\/|^reactive[-_.]?fiber(?:[-_.]?tsx)?(?:\/|$)|fiber[-_.]?optics|reactive[-_.]?(?:web|tui)[-_.]?interface|reactive[-_.]?components|^rftsx/i;
/** (c): the rf-tsx tier file and the names a receipt for its rows would carry. */
const TIER = "test/workbench-native-rf-tsx-preview.test.ts";
const TIER_NAMES: readonly string[] = ["RF-TSX-RECEIPT", "rf-preview-tsx", "wb-693.7"];
const RECEIPT_CLAIM_FAMILIES: readonly string[] = ["N5", "N7", "N9"];
const MANIFEST_FIELDS: readonly string[] = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];

/** F1: the words of a filing item that need no family (articles, the item's own nouns of kind, the producer, the anchor). */
const STOP: readonly string[] = ["the", "of", "as", "row", "names", "run", "journey", "rfcli's", "tsx"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a census over Pi docs/src/skills/qa/test (0 hits at d75b68d10a1a) finds no sentence asserting any shipped, runnable, landed or proven; a mutant claiming TSX typed-output support or parity fails",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) a guard over the pinned TSX repo (exports, src/python grep, TSX-IO files, ADR name) reports ABSENT and flips only on a real symbol, export or file",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) Pi's RF surface stays the rf CLI envelope (wb-2wiv.1, wb-pyel.1); kind=tsx receipt rows (wb-693.7) carry no TSX data-output or parity claim",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-if7q.1 in the tracked bead export names exactly the clauses rows A-C cover, states each of their labels as its clause, names only roots row A walks, and carries every proposal, claim word and producer constant the census reads",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the sentence cutter, the family, marker and claim matchers, the finding format and the guard's declaration readers judge their pinned inputs in order",
    pins: ["MS1", "MS2", "MS3", "MS4", "MN1", "MN2", "MN3", "MN4", "MN5", "MN6", "MN7", "MN8", "MN9", "MN10", "MK", "MW", "MF", "MG"],
  },
  {
    id: "R",
    label: "the named residuals R1-R15 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12", "R13", "R14", "R15"],
  },
];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function asStrings(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${name} must be a list of strings`);
  return [...value];
}
function asText(value: unknown, name: string): string {
  if (typeof value !== "string") throw new Error(`roster ${name} must be a string`);
  return value;
}

interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Site {
  readonly path: string;
  readonly line: number;
  readonly text: string;
}
/** The measured producer facts the pin replica is built from (header, MEASURED PRODUCER FACTS). */
interface Producer {
  readonly pin: string;
  readonly name: string;
  readonly version: string;
  readonly exports: readonly string[];
  readonly sites: readonly Site[];
  readonly srcIndexHead: string;
  readonly pythonInitHead: string;
  readonly adr: readonly string[];
  readonly neighbors: readonly string[];
}
interface Roster {
  readonly constants: Json;
  readonly producer: Producer;
  readonly rows: readonly RosterRow[];
  readonly titles: readonly string[];
}

function readProducer(raw: unknown): Producer {
  if (!isObject(raw) || !Array.isArray(raw.sites)) throw new Error("roster producer must be an object with a sites list");
  const sites = raw.sites.map((site: unknown, index: number): Site => {
    if (!isObject(site) || typeof site.path !== "string" || typeof site.line !== "number" || typeof site.text !== "string") {
      throw new Error(`roster producer.sites[${index}] needs a path, a line and a text`);
    }
    return { path: site.path, line: site.line, text: site.text };
  });
  return {
    pin: asText(raw.pin, "producer.pin"),
    name: asText(raw.name, "producer.name"),
    version: asText(raw.version, "producer.version"),
    exports: asStrings(raw.exports, "producer.exports"),
    sites,
    srcIndexHead: asText(raw.srcIndexHead, "producer.srcIndexHead"),
    pythonInitHead: asText(raw.pythonInitHead, "producer.pythonInitHead"),
    adr: asStrings(raw.adr, "producer.adr"),
    neighbors: asStrings(raw.neighbors, "producer.neighbors"),
  };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Object.hasOwn(raw, "constants")) throw new Error("roster must be an object with constants and a rows list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: JSON.parse(JSON.stringify(raw.constants)) as Json, producer: readProducer(raw.producer), rows, titles: asStrings(raw.titles, "titles") };
}
const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The constants the roster pins beside the rows. */
function constants(): Json {
  return {
    bead: BEAD,
    pin: PIN,
    filingRead: FILING_READ,
    tsxVersion: TSX_VERSION,
    exempt: [...EXEMPT],
    scanRoots: SCAN_ROOTS.map(({ root, floor, anchor, token }) => ({ root, floor, anchor, token })),
    pagesFloor: PAGES_FLOOR,
    skillsRoot: { ...SKILLS_ROOT },
    clauseRoots: `${CLAUSE_ROOTS.source}/${CLAUSE_ROOTS.flags}`,
    families: FAMILIES.map(({ id, context, source, spellings }) => ({ id, context, source, spellings: [...spellings] })),
    anchor: `${ANCHOR.source}/${ANCHOR.flags}`,
    markers: [...MARKERS],
    claims: CLAIMS.map(({ id, source, inflections }) => ({ id, source, inflections: [...inflections] })),
    gatedExports: [...GATED_EXPORTS],
    symbols: [...SYMBOLS],
    tsxIoFiles: [...TSX_IO_FILES],
    adrSlug: ADR_SLUG,
    moduleExtensions: [...MODULE_EXTENSIONS],
    rosterSite: ROSTER_SITE,
    rfSdk: `${RF_SDK.source}/${RF_SDK.flags}`,
    tier: TIER,
    tierNames: [...TIER_NAMES],
    receiptClaimFamilies: [...RECEIPT_CLAIM_FAMILIES],
    manifestFields: [...MANIFEST_FIELDS],
    stop: [...STOP],
  };
}

const posix = (path: string): string => path.split(sep).join("/");
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function isRegularFile(path: string): boolean {
  try {
    return lstatSync(path).isFile();
  } catch {
    return false;
  }
}
function namesIn(directory: string): string[] {
  try {
    return readdirSync(directory).sort();
  } catch {
    return [];
  }
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`/`start`, root-relative with "/" separators, in name order; symlinks are refused. */
function walk(root: string, start: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(join(root, start));
  return { files, symlinks, unreadable };
}

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index++) if (text[index] === "\n") starts.push(index + 1);
  return starts;
}
/** The 0-based line holding `offset`. */
function lineAt(starts: readonly number[], offset: number): number {
  let low = 0;
  let high = starts.length - 1;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if ((starts[middle] ?? 0) <= offset) low = middle;
    else high = middle - 1;
  }
  return low;
}

/** A terminator cut never follows a line-leading list number ("1. five" stays one sentence). */
const CUT = /(?<=[.!?;])(?<!(?:^|\n)[ \t]*\d+\.)\s+|\n[ \t]*\n|\n(?=[ \t]*\|)/g;
const CUT_MARKDOWN = /(?<=[.!?;])(?<!(?:^|\n)[ \t]*\d+\.)\s+|\n[ \t]*\n|\n(?=[ \t]*\|)|\n(?=[ \t]*(?:[-+*]|\d+[.)])[ \t])/g;
interface Sentence {
  readonly line: number;
  readonly text: string;
}
/** A text's sentences (header, READINGS SENTENCE), each with the 1-based line its first character sits on. */
function sentencesOf(text: string, markdown: boolean): Sentence[] {
  const starts = lineStarts(text);
  const sentences: Sentence[] = [];
  let from = 0;
  const take = (to: number): void => {
    const body = text.slice(from, to);
    if (body.trim() === "") return;
    sentences.push({ line: lineAt(starts, from + body.length - body.trimStart().length) + 1, text: body.trim() });
  };
  for (const match of text.matchAll(markdown ? CUT_MARKDOWN : CUT)) {
    const at = match.index ?? 0;
    take(at);
    from = at + match[0].length;
  }
  take(text.length);
  return sentences;
}

/** The families a text mentions, in FAMILIES order; a CONTEXT family only beside the anchor. */
function familiesOf(text: string, anchored: boolean = ANCHOR.test(text)): string[] {
  return FAMILIES.filter(family => (!family.context || anchored) && FAMILY_PATTERNS.get(family.id)?.test(text) === true).map(family => family.id);
}
const claimOf = (text: string): string | null => CLAIM_PATTERNS.find(claim => claim.pattern.test(text))?.id ?? null;
/** A sentence with every family match blanked, so a marker or claim word inside a name (TSX-IF-07's IF) is never read. */
function maskFamilies(text: string): string {
  let masked = text;
  for (const family of FAMILIES) masked = masked.replace(new RegExp(family.source, "gi"), match => " ".repeat(match.length));
  return masked;
}
/** One file's findings (header, READINGS FINDING): markers and claim words are read outside the family matches. */
function findingsOf(path: string, text: string): string[] {
  return sentencesOf(text, path.endsWith(".md")).flatMap(sentence => {
    const families = familiesOf(sentence.text);
    if (families.length === 0) return [];
    const rest = maskFamilies(sentence.text);
    if (MARKER.test(rest)) return [];
    const claim = claimOf(rest);
    return [`${path}:${sentence.line} ${families.join("+")}: ${claim === null ? "unmarked" : `asserted-${claim}`}`];
  });
}

interface TreeCensus {
  readonly counts: { [root: string]: number };
  readonly walked: string[];
  readonly pages: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
  readonly findings: string[];
}
/** (a) over a tree: the walk of every scanned root and the root pages, and the findings of every judged file. */
function censusOf(root: string): TreeCensus {
  const counts: { [root: string]: number } = {};
  const walked: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  for (const scan of SCAN_ROOTS) {
    const found = walk(root, scan.root);
    counts[scan.root] = found.files.length;
    walked.push(...found.files);
    symlinks.push(...found.symlinks);
    unreadable.push(...found.unreadable);
  }
  let entries: Dirent[] = [];
  try {
    entries = readdirSync(root, { withFileTypes: true });
  } catch {
    unreadable.push(".");
  }
  const pages = entries.filter(entry => entry.name.endsWith(".md") && (entry.isFile() || entry.isSymbolicLink())).map(entry => entry.name).sort();
  for (const page of pages) {
    if (lstatSync(join(root, page)).isSymbolicLink()) symlinks.push(page);
    else walked.push(page);
  }
  const findings = walked.filter(file => !EXEMPT.includes(file)).flatMap(file => findingsOf(file, textOf(join(root, file))));
  return { counts, walked, pages: pages.filter(page => !symlinks.includes(page)), symlinks, unreadable, findings };
}
let liveCache: TreeCensus | undefined;
function liveCensus(): TreeCensus {
  liveCache ??= censusOf(REPO);
  return liveCache;
}

const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratch(prefix: string): string {
  const folder = makeScratch(prefix);
  scratches.push(folder);
  return folder;
}
/** Writes each `path: text` below `root`, making the directories it needs. */
function writeTree(root: string, files: Readonly<Record<string, string>>): void {
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
}

type Verdict = "ABSENT" | "PRESENT";
interface Probe {
  readonly verdict: Verdict;
  readonly hits: string[];
}
interface GuardReading {
  readonly exports: Probe;
  readonly symbols: Probe;
  readonly files: Probe;
  readonly adr: Probe;
  readonly verdict: Verdict;
}
const probe = (hits: string[]): Probe => ({ verdict: hits.length > 0 ? "PRESENT" : "ABSENT", hits });

/** A manifest's export keys: a string export is ".", an object of "."-keys is its keys, a conditions object is ".". */
function exportKeys(manifest: unknown): string[] {
  if (!isObject(manifest)) return [];
  const exported = manifest.exports;
  if (typeof exported === "string") return ["."];
  if (!isObject(exported)) return [];
  const keys = Object.keys(exported);
  return keys.length > 0 && keys.every(key => key.startsWith(".")) ? keys : ["."];
}
const gatedExport = (key: string): boolean => GATED_EXPORTS.some(entry => key === entry || key.startsWith(`${entry}/`));

function scriptKindOf(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (path.endsWith(".js") || path.endsWith(".mjs") || path.endsWith(".cjs")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
/** Every name a module declares: interfaces, classes, type aliases, functions, enums, namespaces, variables, export specifiers. */
function declaredNames(path: string, text: string): string[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const names: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isEnumDeclaration(node)) names.push(node.name.text);
    else if ((ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node)) && node.name !== undefined) names.push(node.name.text);
    else if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name)) names.push(node.name.text);
    else if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) names.push(node.name.text);
    else if (ts.isExportSpecifier(node)) names.push(node.name.text);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return names;
}
const PY_TRIPLE = /("""|''')[\s\S]*?\1/g;
const PY_COMMENT = /#[^\n]*/g;
const PY_DECLARATION = /^[ \t]*(?:async[ \t]+)?(?:class|def)[ \t]+([A-Za-z_]\w*)/gm;
const PY_ASSIGNMENT = /^([A-Za-z_]\w*)[ \t]*(?::[^=\n]*)?=(?!=)/gm;
/** Every name a python file defines: a class or def at any depth, or a module-level assignment (comments, docstrings dropped). */
function pythonNames(text: string): string[] {
  const code = text.replace(PY_TRIPLE, "").replace(PY_COMMENT, "");
  return [...code.matchAll(PY_DECLARATION), ...code.matchAll(PY_ASSIGNMENT)].map(match => match[1] ?? "");
}

/** (b): the guard over one TSX repository tree (header, READINGS (b)). */
function guardTree(root: string): GuardReading {
  let manifest: unknown = null;
  try {
    manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  } catch {
    manifest = null;
  }
  const exportsProbe = probe(exportKeys(manifest).filter(gatedExport));
  const symbolHits: string[] = [];
  for (const file of walk(root, "src").files.filter(path => MODULE_EXTENSIONS.some(extension => path.endsWith(extension)))) {
    for (const name of declaredNames(file, textOf(join(root, file)))) if (SYMBOLS.includes(name)) symbolHits.push(`${file}: ${name}`);
  }
  for (const file of walk(root, "python").files.filter(path => path.endsWith(".py"))) {
    for (const name of pythonNames(textOf(join(root, file)))) if (SYMBOLS.includes(name)) symbolHits.push(`${file}: ${name}`);
  }
  const symbols = probe(symbolHits);
  const files = probe(TSX_IO_FILES.filter(file => isRegularFile(join(root, file))));
  const adr = probe(namesIn(join(root, "docs", "adr")).filter(name => ADR_NAME.test(name) && isRegularFile(join(root, "docs", "adr", name))).map(name => `docs/adr/${name}`));
  const verdict: Verdict = [exportsProbe, symbols, files, adr].some(reading => reading.verdict === "PRESENT") ? "PRESENT" : "ABSENT";
  return { exports: exportsProbe, symbols, files, adr, verdict };
}

/** The pin replica: the producer facts the roster measured, written as a repository tree in scratch. */
function pinReplica(): string {
  const producer = ROSTER.producer;
  const root = scratch("tsx-pin-replica-");
  const exportMap: { [key: string]: string } = {};
  for (const key of producer.exports) exportMap[key] = key === "./package.json" ? key : `./dist${key === "." ? "/index" : key.slice(1)}.js`;
  const files: Record<string, string> = {
    "package.json": `${JSON.stringify({ name: producer.name, version: producer.version, type: "module", exports: exportMap }, null, 2)}\n`,
    "src/index.ts": producer.srcIndexHead,
    "python/src/reactive_fiber_tsx_host/__init__.py": producer.pythonInitHead,
  };
  const docs = new Map<string, string[]>();
  for (const site of producer.sites) {
    const lines = docs.get(site.path) ?? [];
    while (lines.length < site.line) lines.push("");
    lines[site.line - 1] = site.text;
    docs.set(site.path, lines);
  }
  for (const [path, lines] of docs) files[path] = `${lines.join("\n")}\n`;
  for (const name of producer.adr) files[`docs/adr/${name}`] = `# ${name}\n`;
  for (const path of producer.neighbors) files[path] = `measured neighbour at ${producer.pin}\n`;
  writeTree(root, files);
  return root;
}
interface Plant {
  readonly files?: Readonly<Record<string, string>>;
  readonly directories?: readonly string[];
  readonly exports?: readonly string[];
}
/** A fresh pin replica with `plant` applied, read by the guard. */
function guardWith(plant: Plant): GuardReading {
  const root = pinReplica();
  writeTree(root, plant.files ?? {});
  for (const directory of plant.directories ?? []) mkdirSync(join(root, directory), { recursive: true });
  if (plant.exports !== undefined) {
    const manifest: unknown = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
    if (!isObject(manifest) || !isObject(manifest.exports)) throw new Error("the replica manifest carries an export map");
    for (const key of plant.exports) manifest.exports[key] = `./dist/${key.replace(/[^\w]+/g, "-")}.js`;
    writeFileSync(join(root, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  }
  return guardTree(root);
}
const summary = (reading: GuardReading): Json => ({
  verdict: reading.verdict,
  exports: reading.exports.hits,
  symbols: reading.symbols.hits,
  files: reading.files.hits,
  adr: reading.adr.hits,
});

/** A string or template literal, parenthesized, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
/** (c): every module specifier of a module and the literal first argument of each of its calls and new expressions. */
function specifiersOf(path: string, text: string): string[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: string[] = [];
  const load = (node: ts.Node | undefined): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value !== undefined) found.push(value);
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** (c): every string and template literal (cooked, and folded where it folds) and every identifier of a module. */
function wordsOf(path: string, text: string): string[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) found.push(node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) found.push(node.text);
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) found.push(folded);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return found;
}
/** The titles a module registers through it(...) or test(...) with a literal first argument. */
function registeredTitles(path: string, text: string): string[] {
  const file = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const titles: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && (node.expression.text === "it" || node.expression.text === "test")) {
      const title = node.arguments[0] === undefined ? undefined : fold(node.arguments[0]);
      if (title !== undefined) titles.push(title);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return titles;
}
/** (c): the line ROSTER_SITE names, read from the file (F5), and whether it sits inside the RECONCILE_EVIDENCE_READS literal. */
function siteReading(site: string): { text: string; inLiteral: boolean } {
  const [file = "", at = ""] = site.split(":");
  const line = Number(at) - 1;
  const lines = textOf(join(REPO, file)).split("\n");
  const open = lines.findIndex(text => text.startsWith("export const RECONCILE_EVIDENCE_READS"));
  const close = open < 0 ? -1 : lines.findIndex((text, index) => index > open && text.startsWith("});"));
  return { text: (lines[line] ?? "").trim(), inLiteral: open >= 0 && open < line && line < close };
}
/** Whether a text matches a RECEIPT_CLAIM family (any sentence; no anchor needed). */
const receiptClaim = (text: string): boolean => RECEIPT_CLAIM_FAMILIES.some(id => FAMILY_PATTERNS.get(id)?.test(text) === true);

let nativeCache: Promise<{ id: string; effectClass: string }[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<{ id: string; effectClass: string }[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, effectClass: entry.descriptor.effectClass }));
  });
  return nativeCache;
}
/** The injected registration's descriptors; its reader is never invoked here. */
function injectedDescriptors(): { id: string; effectClass: string }[] {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      throw new Error("the injected reader is never invoked here");
    },
    ROOT,
  );
  return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, effectClass: entry.descriptor.effectClass }));
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope`, exits 0. */
function standInRf(envelope: Json): string {
  const folder = scratch("tsx-unshipped-rf-");
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
async function spawnedArgv(selector: ReactiveFiberRenderSelector): Promise<string[][]> {
  const log = standInRf(fullShapeRf(ROOT));
  await nativeReactiveFiberRender(selector, ROOT);
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => (JSON.parse(line) as string[]).map(item => (item === ROOT ? "<root>" : item)));
}

/** The tracked bead export's row for `id` (every line must parse; a malformed export is refused, never skipped). */
function exportRow(id: string): { [key: string]: unknown } {
  const rows = textOf(join(REPO, BEAD_EXPORT))
    .split("\n")
    .filter(line => line.trim() !== "")
    .map((line, index): unknown => {
      try {
        return JSON.parse(line);
      } catch {
        throw new Error(`${BEAD_EXPORT} line ${index + 1} does not parse`);
      }
    });
  const row = rows.find(entry => isObject(entry) && entry.id === id);
  if (!isObject(row)) throw new Error(`${id} is missing from ${BEAD_EXPORT}`);
  return row;
}
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  if (from < 0) return "";
  const to = text.indexOf(end, from + start.length);
  return to < 0 ? "" : text.slice(from + start.length, to);
}
/** The words of `item` no family match covers when it is read beside the anchor (STOP words and claim words aside). */
function uncoveredWords(item: string): string[] {
  const framed = `TSX ${item}`;
  const spans: [number, number][] = [];
  for (const family of FAMILIES) {
    for (const match of framed.matchAll(new RegExp(family.source, "gi"))) spans.push([match.index ?? 0, (match.index ?? 0) + match[0].length]);
  }
  const uncovered: string[] = [];
  for (const word of framed.slice(4).matchAll(/\S+/g)) {
    const start = 4 + (word.index ?? 0);
    const end = start + word[0].length;
    const bare = word[0].replace(/^[("']+|[)"',.;:]+$/g, "");
    if (bare === "" || STOP.includes(bare.toLowerCase()) || claimOf(bare) !== null) continue;
    if (!spans.some(([from, to]) => from < end && to > start)) uncovered.push(bare);
  }
  return uncovered;
}

/** A type alias, not an interface, so a reading stays assignable to the Json witness. */
type RootReading = {
  readonly word: string;
  readonly directory: string;
  readonly held: boolean;
  readonly scannedBy: string | null;
};
/** F1: a clause's root words (CLAUSE_ROOTS split at "/"), or null when it carries no root list - a miss reads as a miss,
 * never as an empty list. */
function clauseRootsOf(clause: string): string[] | null {
  const list = CLAUSE_ROOTS.exec(clause)?.[1];
  return list === undefined ? null : list.split("/").filter(Boolean);
}
/** F1: one clause (a) root word read in `tree`: its directory (skills through SKILLS_ROOT), whether that directory holds a
 * regular file (for skills, a SKILL.md) and the SCAN_ROOTS root that covers it (null when none does). */
function rootReading(tree: string, word: string): RootReading {
  const directory = word === SKILLS_ROOT.word ? SKILLS_ROOT.directory : word;
  const files = walk(tree, directory).files;
  const held = word === SKILLS_ROOT.word ? files.some(file => file.endsWith(`/${SKILLS_ROOT.member}`)) : files.length > 0;
  const scannedBy = SCAN_ROOTS.find(scan => directory === scan.root || directory.startsWith(`${scan.root}/`))?.root ?? null;
  return { word, directory, held, scannedBy };
}

type CaseKind = "file" | "markdown" | "cut" | "cutMarkdown" | "names" | "python" | "specifiers" | "words";
interface Case {
  readonly pin: string;
  readonly kind: CaseKind;
  readonly text: string;
  readonly outcome: readonly string[];
}
const cp = (...codes: number[]): string => String.fromCodePoint(...codes);
/** The quiet rows of R1-R8, R14 and R15 (R9-R13 build trees); MS1-MS4 the cutter. */
const CASES: readonly Case[] = [
  { pin: "MS1", kind: "cut", text: "One names a. Two names b! Three? Four; five", outcome: ["One names a.", "Two names b!", "Three?", "Four;", "five"] },
  { pin: "MS2", kind: "cut", text: "para one\n\npara two\n| a | b |\n| c | d |", outcome: ["para one", "para two", "| a | b |", "| c | d |"] },
  { pin: "MS3", kind: "cutMarkdown", text: "- one\n- two\n+ three\n* four\n1. five\n2) six", outcome: ["- one", "- two", "+ three", "* four", "1. five", "2) six"] },
  { pin: "MS4", kind: "cut", text: "The host\n * wraps here\n * and graph/v2, 0.1.668, README.md:3 and e.g.x stay whole\n- in code a dash item joins", outcome: ["The host\n * wraps here\n * and graph/v2, 0.1.668, README.md:3 and e.g.x stay whole\n- in code a dash item joins"] },
  { pin: "R1", kind: "markdown", text: "ReactiveWebInterfaceSDK ships today and nothing is gated.\n\n| ReactiveTUIInterfaceSDK | shipped | not P0 |\n", outcome: [] },
  { pin: "R2", kind: "file", text: "// The renders reach parity with Python, the dogfood run proves it and the data output is typed.\n", outcome: [] },
  { pin: "R3", kind: "file", text: "// ReactiveWebInterfaceSDK is not a dependency here. It ships today.\n", outcome: [] },
  { pin: "R4", kind: "file", text: 'const sdk = "ReactiveWeb" + "InterfaceSDK"; // ships\n', outcome: [] },
  { pin: "R5", kind: "file", text: `// Reactiv${cp(0x0435)}WebInterfaceSDK ships. Interface${cp(0x200b)}Host ships.\n`, outcome: [] },
  { pin: "R6", kind: "file", text: "// ReactiveWeb&#73;nterfaceSDK ships. ReactiveTUI\\u0049nterfaceSDK ships.\n", outcome: [] },
  { pin: "R7", kind: "file", text: "// Pi ships the new web interface package and the terminal UI kit.\n", outcome: [] },
  { pin: "R8", kind: "file", text: "/**\n * - ReactiveWebInterfaceSDK ships\n * - graph/v2 is gated\n */\n", outcome: [] },
  { pin: "R14", kind: "specifiers", text: 'const sdk = ["@reactive-fiber", "tsx"].join("/");\nawait import(sdk);\nit(["R9 success:", "par" + "", "ity"].join(" "), () => {});\n', outcome: [] },
  { pin: "R15", kind: "markdown", text: "Pi ships Reactive**Web**InterfaceSDK today.\n\nPi ships Reactive *Web* Interface SDK today.\n\nPi ships Interface<b>Host</b> today.\n", outcome: [] },
];
function outcomeOf(kind: CaseKind, text: string): string[] {
  if (kind === "file") return findingsOf("x.ts", text);
  if (kind === "markdown") return findingsOf("x.md", text);
  if (kind === "cut" || kind === "cutMarkdown") return sentencesOf(text, kind === "cutMarkdown").map(sentence => sentence.text);
  if (kind === "names") return declaredNames("x.ts", text).filter(name => SYMBOLS.includes(name));
  if (kind === "python") return pythonNames(text).filter(name => SYMBOLS.includes(name));
  if (kind === "specifiers") {
    const loads = specifiersOf("x.ts", text).filter(specifier => RF_SDK.test(specifier));
    const words = wordsOf("x.ts", text).filter(word => receiptClaim(word));
    return [...loads, ...words];
  }
  return wordsOf("x.ts", text).filter(word => receiptClaim(word));
}

/** A4's plants, one per scanned root and the root pages: [path, claim sentence, its marked twin, expected finding]. */
const MUTANTS: readonly (readonly [string, string, string, string])[] = [
  ["docs/plant.md", "Pi supports TSX typed-output for every view.", "Pi does not support TSX typed-output for any view.", "docs/plant.md:1 N7: asserted-support"],
  ["src/plant.ts", "// TSX renders in Pi have parity with Python.\n", "// TSX renders in Pi have no parity with Python.\n", "src/plant.ts:1 N9: unmarked"],
  [".agents/skills/plant/SKILL.md", "ReactiveWebInterfaceSDK ships in Pi.", "ReactiveWebInterfaceSDK never ships in Pi.", ".agents/skills/plant/SKILL.md:1 N2: asserted-shipped"],
  ["qa/plant.mjs", 'const note = "the hosts.rfcli row landed";\n', 'const note = "the hosts.rfcli row is absent";\n', "qa/plant.mjs:1 N6: asserted-landed"],
  ["test/plant.test.ts", "// The VC-D journey proves TSX data publication.\n", "// The VC-D journey is not proof of TSX data publication.\n", "test/plant.test.ts:1 N7+N8: asserted-proven"],
  ["examples/plant.md", "The TSX-IF-07 samples are runnable.", "The TSX-IF-07 samples are runnable only if demonstrated.", "examples/plant.md:1 N3+N10: asserted-runnable"],
  ["PLANT.md", "Pi renders through the browser-safe TSX host.", "Pi renders through no browser-safe TSX host.", "PLANT.md:1 N1: unmarked"],
];

const REACHED = new Set<string>();
/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const census = liveCensus();
    const roots = SCAN_ROOTS.map(scan => ({
      root: scan.root,
      floorMet: (census.counts[scan.root] ?? 0) >= scan.floor,
      anchorRead: census.walked.includes(scan.anchor) && textOf(join(REPO, scan.anchor)).includes(scan.token),
    }));
    const pages = { floorMet: census.pages.length >= PAGES_FLOOR, anchorRead: census.pages.includes(PAGE_ANCHOR.file) && textOf(join(REPO, PAGE_ANCHOR.file)).includes(PAGE_ANCHOR.token) };
    const walk = { roots, pages, symlinks: census.symlinks, unreadable: census.unreadable };
    expect(walk, `walked: ${JSON.stringify(census.counts)}, pages ${census.pages.join(", ")}`).toStrictEqual({
      roots: SCAN_ROOTS.map(scan => ({ root: scan.root, floorMet: true, anchorRead: true })),
      pages: { floorMet: true, anchorRead: true },
      symlinks: [],
      unreadable: [],
    });
    return walk;
  },
  A2: async () => {
    const findings = liveCensus().findings;
    expect(findings, "a Pi sentence presenting the proposed TSX surface as shipped").toEqual([]);
    return { findings };
  },
  A3: async () => {
    const census = liveCensus();
    const exemptions = EXEMPT.map(file => ({
      file,
      walked: census.walked.includes(file),
      judgedFindings: findingsOf(file, textOf(join(REPO, file))).length > 0,
    }));
    expect(exemptions).toStrictEqual(EXEMPT.map(file => ({ file, walked: true, judgedFindings: true })));
    return { exemptions };
  },
  A4: async () => {
    const claims = scratch("tsx-unshipped-claims-");
    writeTree(claims, Object.fromEntries(MUTANTS.map(([path, claim]) => [path, claim])));
    const twins = scratch("tsx-unshipped-twins-");
    writeTree(twins, Object.fromEntries(MUTANTS.map(([path, , twin]) => [path, twin])));
    const planted = censusOf(claims).findings;
    const quiet = censusOf(twins).findings;
    expect({ planted, quiet }).toStrictEqual({ planted: MUTANTS.map(([, , , finding]) => finding), quiet: [] });
    return { planted, quiet };
  },
  B1: async () => {
    const root = pinReplica();
    const reading = guardTree(root);
    const replica = {
      srcModules: walk(root, "src").files.length,
      pythonFiles: walk(root, "python").files.length,
      adrEntries: namesIn(join(root, "docs", "adr")).length,
      exports: exportKeys(JSON.parse(textOf(join(root, "package.json")))),
      docsSites: ROSTER.producer.sites.length,
    };
    expect(summary(reading)).toStrictEqual({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] });
    expect(replica.adrEntries, "the replica lists the measured docs/adr entries").toBe(ROSTER.producer.adr.length);
    return { reading: summary(reading), replica };
  },
  B2: async () => {
    const keys = [...GATED_EXPORTS, "./ui/button", "./host/web"];
    const flips = keys.map(key => ({ key, reading: summary(guardWith({ exports: [key] })) }));
    expect(flips.map(flip => flip.reading)).toStrictEqual(keys.map(key => ({ verdict: "PRESENT", exports: [key], symbols: [], files: [], adr: [] })));
    return { flips };
  },
  B3: async () => {
    const plants: [string, string, string][] = [
      ["src/host/interface-host.ts", "export interface InterfaceHost { mount(): void }\n", "InterfaceHost"],
      ["src/host/surface.ts", "export type SurfaceCapabilities = { target: string };\n", "SurfaceCapabilities"],
      ["src/host/evaluation.mts", "export class InterfaceEvaluation {}\n", "InterfaceEvaluation"],
      ["src/web/index.tsx", "export function ReactiveWebInterfaceSDK(): null { return null; }\n", "ReactiveWebInterfaceSDK"],
      ["src/tui/index.js", "export const ReactiveTUIInterfaceSDK = {};\n", "ReactiveTUIInterfaceSDK"],
      ["src/dom/index.ts", "const dom = {};\nexport { dom as ReactiveFiberDOMSDK };\n", "ReactiveFiberDOMSDK"],
      ["python/src/reactive_fiber_tsx_host/interface_host.py", "class InterfaceHost:\n    pass\n", "InterfaceHost"],
      ["python/src/reactive_fiber_tsx_host/surface.py", "def SurfaceCapabilities():\n    return None\n", "SurfaceCapabilities"],
      ["python/src/reactive_fiber_tsx_host/evaluation.py", "InterfaceEvaluation: type = object\n", "InterfaceEvaluation"],
    ];
    const flips = plants.map(([path, text, name]) => ({ path, reading: summary(guardWith({ files: { [path]: text } })), name }));
    expect(flips.map(flip => flip.reading)).toStrictEqual(plants.map(([path, , name]) => ({ verdict: "PRESENT", exports: [], symbols: [`${path}: ${name}`], files: [], adr: [] })));
    return { flips: flips.map(({ path, reading }) => ({ path, reading })) };
  },
  B4: async () => {
    const adrName = "docs/adr/0083-tsx-declared-data-output.md";
    const flips = [...TSX_IO_FILES, adrName].map(path => ({ path, reading: summary(guardWith({ files: { [path]: "landed\n" } })) }));
    expect(flips.map(flip => flip.reading)).toStrictEqual([
      ...TSX_IO_FILES.map(path => ({ verdict: "PRESENT", exports: [], symbols: [], files: [path], adr: [] })),
      { verdict: "PRESENT", exports: [], symbols: [], files: [], adr: [adrName] },
    ]);
    return { flips };
  },
  B5: async () => {
    const near: [string, Plant][] = [
      ["src comment", { files: { "src/notes.ts": "// InterfaceHost lands with TSX-IF-04: export interface InterfaceHost {}\nexport const version = 1;\n" } }],
      ["src string", { files: { "src/notes.ts": 'export const note = "export class InterfaceHost {}";\n' } }],
      ["look-alike names", { files: { "src/notes.ts": "export interface InterfaceHostLike {}\nexport class SurfaceCapabilitiesView {}\nexport const myReactiveWebInterfaceSDK = 1;\n" } }],
      ["python comment and docstring", { files: { "python/src/reactive_fiber_tsx_host/notes.py": '# class InterfaceHost:\n"""\nclass SurfaceCapabilities:\n"""\nnote = "def InterfaceEvaluation"\n' } }],
      ["docs declaration", { files: { "docs/guide.md": "export interface InterfaceHost {}\n" } }],
      ["near export keys", { exports: ["./hosts", "./uikit", "./node-compat", "./resources-legacy", "./embedding/host"] }],
      ["TSX-IO path as a directory", { directories: ["tests/audit/interop-pin.test.ts"] }],
      ["near ADR names", { files: { "docs/adr/0083-tsx-declared-data-inputs.md": "x\n", "docs/adr/0083-tsx-declared-data-output.md.draft": "x\n", "docs/adr/drafts/0083-tsx-declared-data-output.md": "x\n" }, directories: ["docs/adr/0084-tsx-declared-data-output.md"] }],
    ];
    const readings = near.map(([name, plant]) => ({ name, reading: summary(guardWith(plant)) }));
    expect(readings.map(entry => entry.reading)).toStrictEqual(near.map(() => ({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] })));
    return { readings };
  },
  C1: async () => {
    const reactivefiber = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const rf = (descriptors: { id: string; effectClass: string }[]): Json => descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX)).map(({ id, effectClass }) => ({ id, effectClass }));
    const native = rf(await nativeDescriptors());
    const injected = rf(injectedDescriptors());
    const pinned = [{ id: PREVIEW_ID, effectClass: "read" }];
    expect({ reactivefiber, native, injected }).toStrictEqual({ reactivefiber: [PREVIEW_ID], native: pinned, injected: pinned });
    const siteLine = siteReading(ROSTER_SITE);
    expect(siteLine, `the ${ROSTER_SITE} line declares the reactivefiber entry`).toStrictEqual({ text: `reactivefiber: Object.freeze(["${PREVIEW_ID}"]),`, inLiteral: true });
    return { site: ROSTER_SITE, siteLine, reactivefiber, native, injected };
  },
  C2: async () => {
    const legacy = await spawnedArgv({ model: "m", task: "t" });
    const view = await spawnedArgv({ view: "v", taskId: "t", model: "m" });
    const shape = [...legacy, ...view].map(argv => ({ verb: argv.slice(2, 4).join(" "), envelope: argv[argv.length - 1] ?? "" }));
    expect({ spawns: [legacy.length, view.length], shape }).toStrictEqual({
      spawns: [1, 1],
      shape: [
        { verb: "context render", envelope: "--json" },
        { verb: "context render", envelope: "--json" },
      ],
    });
    return { legacy, view };
  },
  C3: async () => {
    const modules = walk(REPO, "src").files.filter(path => MODULE_EXTENSIONS.some(extension => path.endsWith(extension)));
    const specifiers = modules.flatMap(path => specifiersOf(path, textOf(join(REPO, path))).map(specifier => ({ path, specifier })));
    const sdkLoads = specifiers.filter(entry => RF_SDK.test(entry.specifier)).map(entry => `${entry.path}: ${entry.specifier}`);
    const manifest: unknown = JSON.parse(textOf(join(REPO, "package.json")));
    const names = MANIFEST_FIELDS.flatMap(field => (isObject(manifest) && isObject(manifest[field]) ? Object.keys(manifest[field]) : []));
    const bundled = isObject(manifest) && Array.isArray(manifest.bundledDependencies) ? manifest.bundledDependencies.filter((name: unknown): name is string => typeof name === "string") : [];
    const sdkDependencies = [...names, ...bundled].filter(name => RF_SDK.test(name));
    const reading = {
      modulesFloorMet: modules.length >= 100,
      specifierAnchor: specifiers.some(entry => entry.path === "src/workbench/providers/reactivefiber.ts" && entry.specifier === "node:child_process"),
      dependencyAnchor: names.includes("@anthropic-ai/claude-agent-sdk"),
      sdkLoads,
      sdkDependencies,
    };
    expect(reading).toStrictEqual({ modulesFloorMet: true, specifierAnchor: true, dependencyAnchor: true, sdkLoads: [], sdkDependencies: [] });
    const control = (text: string): number => specifiersOf("control.ts", text).filter(specifier => RF_SDK.test(specifier)).length;
    const controls = {
      importDeclaration: control(`import { render } from "${TSX_PACKAGE}";\n`),
      subpath: control(`export * from "${TSX_PACKAGE}/embedding";\n`),
      dynamicImport: control(`const sdk = await import("${TSX_PACKAGE}");\n`),
      requireCall: control(`const sdk = require("@reactive-fiber/" + "components");\n`),
      fiberOptics: control('import fo from "fiber-optics";\n'),
      interfaceSdk: control('import web from "reactive-web-interface-sdk";\n'),
      dependencyName: ["@reactive-fiber/tui", "reactive_fiber_tsx", "lodash"].filter(name => RF_SDK.test(name)).length,
    };
    return { ...reading, controls };
  },
  C4: async () => {
    const include = (rfTsxConfig as unknown as { test?: { include?: readonly string[] } }).test?.include ?? [];
    const text = textOf(join(REPO, TIER));
    const titles = registeredTitles(TIER, text);
    const tierClaims = wordsOf(TIER, text).filter(word => receiptClaim(word));
    const receipts = walk(REPO, "docs/workbench/receipts").files.filter(path => path.endsWith(".md"));
    const naming = receipts.filter(path => TIER_NAMES.some(name => textOf(join(REPO, path)).includes(name)));
    const receiptClaims = naming.flatMap(path => sentencesOf(textOf(join(REPO, path)), true).filter(sentence => receiptClaim(sentence.text)).map(sentence => `${path}:${sentence.line}`));
    const reading = { include: [...include], titles, tierClaims, receiptsFloorMet: receipts.length >= 30, naming, receiptClaims };
    expect(reading).toStrictEqual({ include: [TIER], titles: ROSTER.titles, tierClaims: [], receiptsFloorMet: true, naming: [], receiptClaims: [] });
    const tierControl = (source: string): number => wordsOf("tier.ts", source).filter(word => receiptClaim(word)).length;
    const controls = {
      title: tierControl('it("success row: the TSX data output reaches parity", () => {});\n'),
      label: tierControl('expect(x, "R9 success: " + "value edge stated").toBe(1);\n'),
      field: tierControl('receipt("success", { typed_output: 1 });\n'),
      receipt: sentencesOf("# wb-693.7\n\nThe RF-TSX-RECEIPT success row proves TSX data publication.\n", true).filter(sentence => receiptClaim(sentence.text)).length,
    };
    return { ...reading, controls };
  },
  F1: async () => {
    const row = exportRow(BEAD);
    const notes = typeof row.notes === "string" ? row.notes : "";
    const acceptance = /^Acceptance: (.*)$/m.exec(notes)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label).map(entry => entry.id);
    const statement = /^Full statement[^:]*: (.*)$/m.exec(notes)?.[1] ?? "";
    const listed = between(statement, "only propose - ", " - nor cite ").split(/,\s+|\s+\(nor\s+|\s+or\s+|\)/).map(item => item.trim()).filter(Boolean);
    // A one-word item is elliptical ("the INTEROP API names, record"): it is read with its predecessor's first content word.
    const proposals = listed.map((item, index) => {
      if (/\s/.test(item)) return item;
      const qualifier = (listed[index - 1] ?? "").split(/\s+/).find(word => !STOP.includes(word.toLowerCase())) ?? "";
      return /^[a-z]+$/.test(item) && qualifier !== "" ? `${qualifier} ${item}` : item;
    });
    const citations = between(statement, "nor cite ", "; Pi pins").split(/\s+as proof of\s+|\s+or\s+/).map(item => item.trim()).filter(Boolean);
    const items = [...proposals, ...citations];
    const uncovered = items.flatMap(item => uncoveredWords(item).map(word => `${item}: ${word}`));
    const claimWords = [
      ...between(statement, "present as ", " what").split(/,\s+|\s+or\s+/),
      ...between(acceptance, "asserting any ", ";").split(/,\s+|\s+or\s+/),
      ...between(acceptance, "typed-output ", " or").split(/\s+/),
    ]
      .map(word => word.trim())
      .filter(Boolean);
    const claimsRead = [...new Set(claimWords)].map(word => ({ word, diagnosis: findingsOf("x.ts", `// ReactiveWebInterfaceSDK ${word}.\n`)[0] ?? "" }));
    const gating = /^Gating: (.*)$/m.exec(notes)?.[1] ?? "";
    const parsedRoots = clauseRootsOf(acceptance);
    const filingRoots = parsedRoots ?? [];
    const controlTree = scratch("tsx-unshipped-roots-");
    writeTree(controlTree, { "outside/x.md": "x\n", ".agents/skills/plain/README.md": "x\n" });
    const filingSymbols = between(gating, `at ${PIN} `, " hit 0").split("/").filter(Boolean);
    const filingExports = [...between(gating, "exports no ", ",").matchAll(/\.\/\w+/g)].map(match => match[0]);
    const reading = {
      clauses,
      labelsEqual,
      items,
      uncovered,
      claimsRead,
      symbolsHeld: filingSymbols.filter(symbol => SYMBOLS.includes(symbol)),
      exportsHeld: filingExports.filter(entry => GATED_EXPORTS.includes(entry)),
      sixFiles: /\bsix TSX-IO acceptance files\b/.test(gating) && TSX_IO_FILES.length === 6,
      adrSlug: /the ([a-z0-9-]+) ADR\b/.exec(gating)?.[1] === ADR_SLUG,
      version: gating.includes(`${TSX_VERSION} exports`) && ROSTER.producer.version === TSX_VERSION,
      pins: [PIN, FILING_READ].filter(token => notes.includes(token)),
      roots: filingRoots.map(word => rootReading(REPO, word)),
      // The root parse's liveness floor, held to the export row itself: clause (a)'s list parses, holds a root and, rejoined,
      // restates the row's own list - so an empty or partial parse reds whatever the roster holds.
      rootParse: { parsed: parsedRoots !== null, count: filingRoots.length, restated: acceptance.includes(`census over Pi ${filingRoots.join("/")} (`) },
      // The root parse's positive controls: a list, a single root and a clause without the list (a miss reads null, never []).
      parseControls: {
        list: clauseRootsOf("(a) a census over Pi alpha/beta/gamma (0 hits) finds nothing"),
        single: clauseRootsOf("(a) a census over Pi docs (0 hits) finds nothing"),
        absent: clauseRootsOf("(a) a census over the docs finds nothing"),
      },
      // The root reader's positive controls: an unscanned directory, a covered but empty one and skills without a SKILL.md.
      rootControls: { unscanned: rootReading(controlTree, "outside"), missing: rootReading(controlTree, "docs"), kind: rootReading(controlTree, "skills") },
      // The coverage reader's positive controls: an unknown word stays uncovered, a STOP word and a claim word never count.
      controls: { unknown: uncoveredWords("quantum widget"), stopAndClaim: uncoveredWords("the shipped row"), covered: uncoveredWords("hosts.rfcli row") },
    };
    expect(reading.clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(reading.labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(entry => entry.id));
    expect(reading.uncovered, "filing words no family covers").toEqual([]);
    expect(reading.claimsRead.map(entry => entry.diagnosis), "each filing claim word diagnoses as itself").toEqual(reading.claimsRead.map(entry => `x.ts:1 N2: asserted-${entry.word}`));
    expect(reading.symbolsHeld).toEqual(filingSymbols);
    expect(reading.exportsHeld).toEqual(filingExports);
    expect({ sixFiles: reading.sixFiles, adrSlug: reading.adrSlug, version: reading.version, pins: reading.pins }).toStrictEqual({ sixFiles: true, adrSlug: true, version: true, pins: [PIN, FILING_READ] });
    expect(reading.controls).toStrictEqual({ unknown: ["quantum", "widget"], stopAndClaim: [], covered: [] });
    expect({ parsed: reading.rootParse.parsed, nonEmpty: reading.rootParse.count > 0, restated: reading.rootParse.restated }, "clause (a)'s root list parses, holds a root and restates the export row's list").toStrictEqual({ parsed: true, nonEmpty: true, restated: true });
    expect(reading.parseControls, "the root parse reads a list, a single root and a clause without the list").toStrictEqual({ list: ["alpha", "beta", "gamma"], single: ["docs"], absent: null });
    expect(reading.roots.filter(root => !root.held || root.scannedBy === null).map(root => root.word), "clause (a) roots row A does not walk").toEqual([]);
    expect(reading.rootControls).toStrictEqual({
      unscanned: { word: "outside", directory: "outside", held: true, scannedBy: null },
      missing: { word: "docs", directory: "docs", held: false, scannedBy: "docs" },
      kind: { word: "skills", directory: ".agents/skills", held: false, scannedBy: ".agents" },
    });
    return reading;
  },
  ...Object.fromEntries(
    FAMILIES.map((family, index) => [
      `MN${index + 1}`,
      async (): Promise<Json> => {
        const readings = family.spellings.map(spelling => ({ spelling, bare: familiesOf(`Pi reads ${spelling} here`), anchored: familiesOf(`Pi reads ${spelling} here`, true) }));
        expect(readings.every(reading => reading.anchored.includes(family.id) && reading.bare.includes(family.id) === !family.context), `${family.id} spellings`).toBe(true);
        return { family: family.id, readings };
      },
    ]),
  ),
  MK: async () => {
    const control = findingsOf("x.ts", "// Pi reads ReactiveWebInterfaceSDK here.\n");
    const admitted = MARKERS.filter(marker => findingsOf("x.ts", `// Pi ${marker} reads ReactiveWebInterfaceSDK here.\n`).length === 0);
    const contractions = ["doesn't", `doesn${cp(0x2019)}t`, "isn't"].map(word => findingsOf("x.ts", `// Pi ${word} read ReactiveWebInterfaceSDK here.\n`).length);
    const wholeWord = findingsOf("x.ts", "// Pi notes ReactiveWebInterfaceSDK in an iffy unnotated note.\n");
    expect({ control: control.length, admitted, contractions, wholeWord: wholeWord.length }).toStrictEqual({ control: 1, admitted: [...MARKERS], contractions: [0, 0, 0], wholeWord: 1 });
    return { control, admitted, contractions, wholeWord };
  },
  MW: async () => {
    const readings = CLAIMS.flatMap(claim => claim.inflections.map(word => ({ word, finding: findingsOf("x.ts", `// ReactiveWebInterfaceSDK ${word} today.\n`)[0] ?? "" })));
    const order = findingsOf("x.ts", "// ReactiveWebInterfaceSDK support landed and shipped.\n");
    const partial = findingsOf("x.ts", "// ReactiveWebInterfaceSDK shipments, landmarks, provenance and supportive notes.\n");
    expect(readings.map(reading => reading.finding)).toStrictEqual(CLAIMS.flatMap(claim => claim.inflections.map(() => `x.ts:1 N2: asserted-${claim.id}`)));
    expect({ order, partial }).toStrictEqual({ order: ["x.ts:1 N2: asserted-shipped"], partial: ["x.ts:1 N2: unmarked"] });
    return { readings, order, partial };
  },
  MF: async () => {
    const text = "Line one names nothing.\nPi reads the hosts.rfcli row.\n\nThe value edge is gated.\n| ReactiveTUIInterfaceSDK | shipped |\n- TSX parity holds\n";
    const markdown = findingsOf("docs/x.md", text);
    const code = findingsOf("src/x.ts", text);
    expect({ markdown, code }).toStrictEqual({
      markdown: ["docs/x.md:2 N6: unmarked", "docs/x.md:5 N2: asserted-shipped", "docs/x.md:6 N9: unmarked"],
      code: ["src/x.ts:2 N6: unmarked", "src/x.ts:5 N2+N9: asserted-shipped"],
    });
    return { markdown, code };
  },
  MG: async () => {
    const tsText = [
      "export interface InterfaceHost {}",
      "export type SurfaceCapabilities = string;",
      "export class InterfaceEvaluation {}",
      "export function ReactiveWebInterfaceSDK(): void {}",
      "export enum ReactiveTUIInterfaceSDK { A }",
      "export namespace ReactiveFiberDOMSDK {}",
      "let InterfaceHost2 = 1, SurfaceCapabilities = 2;",
      "export { InterfaceHost as InterfaceEvaluation } from './x.js';",
      "// export class InterfaceHost {}",
      'const text = "export interface SurfaceCapabilities {}";',
      "import { ReactiveWebInterfaceSDK } from './y.js';",
      "const value = InterfaceHost;",
    ].join("\n");
    const pyText = [
      "class InterfaceHost:",
      "    def SurfaceCapabilities(self):",
      "        pass",
      "async def InterfaceEvaluation():",
      "    pass",
      "ReactiveWebInterfaceSDK = 1",
      "ReactiveTUIInterfaceSDK: int = 2",
      "ReactiveFiberDOMSDK == 3",
      "  InterfaceHost = 4",
      "# class SurfaceCapabilities:",
      "'''",
      "def ReactiveFiberDOMSDK():",
      "'''",
    ].join("\n");
    const tsNames = outcomeOf("names", tsText);
    const pyNames = outcomeOf("python", pyText);
    expect({ tsNames, pyNames }).toStrictEqual({
      tsNames: ["InterfaceHost", "SurfaceCapabilities", "InterfaceEvaluation", "ReactiveWebInterfaceSDK", "ReactiveTUIInterfaceSDK", "ReactiveFiberDOMSDK", "SurfaceCapabilities", "InterfaceEvaluation"],
      pyNames: ["InterfaceHost", "SurfaceCapabilities", "InterfaceEvaluation", "ReactiveWebInterfaceSDK", "ReactiveTUIInterfaceSDK"],
    });
    return { tsNames, pyNames };
  },
  R9: async () => {
    const tree = scratch("tsx-unshipped-outside-");
    const claim = "ReactiveWebInterfaceSDK ships in Pi.\n";
    writeTree(tree, Object.fromEntries(["new-feedback/x.md", "vendor/x.md", "media/x.md", "dist/x.js", "node_modules/x/README.md", ".beads/x.md", "docs.md.d/x.md"].map(path => [path, claim])));
    const findings = censusOf(tree).findings;
    expect(findings).toEqual([]);
    return { findings };
  },
  R10: async () => {
    const reading = summary(
      guardWith({
        files: {
          "packages/web/src/index.ts": "export class InterfaceHost {}\n",
          "tests/unit/host.test.ts": "export interface SurfaceCapabilities {}\n",
          "tests/python/test_host.py": "class InterfaceEvaluation:\n    pass\n",
        },
      }),
    );
    expect(reading).toStrictEqual({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] });
    return { reading };
  },
  R11: async () => {
    const reading = summary(guardWith({ exports: ["./*", "./dist/*"] }));
    expect(reading).toStrictEqual({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] });
    return { reading };
  },
  R12: async () => {
    const reading = summary(guardWith({ files: { "docs/adr/ADR-0083-tsx-declared-data-output.md": "x\n", "docs/adr/0083_tsx_declared_data_output.md": "x\n", "docs/adr/tsx-declared-data-output.md": "x\n" } }));
    expect(reading).toStrictEqual({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] });
    return { reading };
  },
  R13: async () => {
    const reading = summary(guardWith({ files: { "tests/audit/interop-pin.spec.ts": "x\n", "tests/interop-field-census.test.ts": "x\n", "scripts/interop-worker-bench.mjs": "x\n" } }));
    expect(reading).toStrictEqual({ verdict: "ABSENT", exports: [], symbols: [], files: [], adr: [] });
    return { reading };
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async (): Promise<Json> => {
        const outcome = outcomeOf(entry.kind, entry.text);
        expect(outcome).toStrictEqual([...entry.outcome]);
        return { kind: entry.kind, outcome };
      },
    ]),
  ),
};

describe("wb-if7q.1 unshipped TSX surface census (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R1, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:5", "C:4", "F:1", "M:18", "R:15"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("the record: every pin's case ran to its end", () => {
    expect([...REACHED].sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
