/**
 * wb-4nut.4 (TSX-HARNESS2-REACTIVE-EVOLUTION-R4, program-triage-2026-10-22), the H2 bead-graph census, absent-today leg.
 *
 * Statement (bead notes, full form): "No Pi surface shall grow the H2 bead graph: no TSX-H2-01..05 bead until gate bead
 * rftsx-rupqh records ADOPT via --append-notes (gated: needs API-PIN.md, ABSENT at the pin, and the TSX-FED-01 mapping), read only
 * as exactly one of 'ruled ADOPT'/'ruled REJECT' in the bead's text and never synthesized from status, labels or closure;
 * DEFER/REJECT archives it; packets carry `related` edges only; no family: label on an H2 bead until TSX-H2-00 (rftsx-auqdi) lands
 * (R-05)" (ReactiveFiberTSXSDK docs/programs/harness2-reactive-evolution-2026-10-20/BEADS-2026-10-21.md:42@76bbbffd9d4a). The
 * acceptance is the owner filing's, verbatim: the labels of rows A-D below, held to the tracked bead export by F1.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23; read-only git show of the local ReactiveFiberTSXSDK checkout at 76bbbffd9d4a, blobs
 * BEADS-2026-10-21.md 80427fdf9c89 and requirements/ATOMIC-REQUIREMENTS.md df7eec143737; every producer line rides the roster
 * with its sha256 pinned in EXCERPT_SHA256):
 *  - the map (L19-L22, L28-L29) lists the six H2 beads - the epic rftsx-bhmrd, the rulings rftsx-7sy4c (R-05), rftsx-8er6b (R-08)
 *    and rftsx-e9a5e (R-10), TSX-H2-00 rftsx-auqdi and the gate TSX-H2-ADR rftsx-rupqh - every one labelled
 *    program:harness2-reactive-evolution-2026-10-20, none with a family: label (the checker notes L60-L65 say so per row) and none
 *    with a wp:tsx-h2-01..05 label; L3 reads every bead open at the producer's one store read; L42-L50 hold the gated list
 *    TSX-H2-01..05, each gated on TSX-H2-ADR (rftsx-rupqh) by R-08, and the rule "created under the epic, with `related` edges only,
 *    when its gate bead records the verdict ADOPT (`--append-notes`); DEFER or REJECT archives the packet in the compile ledger".
 *  - EAT-R575 (:1373, :1384) puts the ruling "in its title or body as 'ruled ADOPT' or 'ruled REJECT' (bd has no ADOPT status)";
 *    EAT-R576 (:1392, :1400) is acceptance (a)'s `bd -q list --json -s all --limit 5000` filtered by the five wp labels.
 *  - Pi's own store: that exact command against the wb store read 707 rows at 2026-10-23T09:18:23Z, every id wb-, no wp:, family:
 *    or program: label and no rftsx row; the tracked export .beads/issues.jsonl (706 rows at base 7718651) reads the same. The
 *    rftsx store is unreachable from Pi: the producer pin tracks no .beads/ and the local checkout carries no store.
 *  - Pi's surfaces: the one bd reader is src/workbench/beads-observer.ts (readBeadsWork over the injected BeadsReadClient seam,
 *    show only; it spawns nothing and keeps the title but no description, notes or close-reason text); no src, qa, examples,
 *    .github, .codex, .beads/hooks or root script file spells a bd write but the live Furnace tier's scratch-store init
 *    (qa/workbench/live-furnace-vc4-launch.mjs, prefix fx, a disposable workspace) and the .gitignore comment naming it; write
 *    lines live in instruction text only (AGENTS.md, .agents/skills/beads/SKILL.md, .beads/README.md, one docs record), for this
 *    repository's own tracker; no walked file names the program, its work packages, its beads or the gate's prerequisites.
 *
 * FINDINGS (pinned, for an owner reading before any Pi surface reads the gate):
 *  F-1 the gate's creation title ends "(ruled ADOPT or REJECT)" - the question, which holds the substring 'ruled ADOPT' exactly once
 *    and 'ruled REJECT' never, so a reader counting the marker substrings reads ADOPT at creation, and Pi's beads reader keeps the
 *    title verbatim (T3). The reference reader reads a marker only where no alternative follows it (MARKER); A2 and B5 pin both
 *    readings.
 *  F-2 the filing reads the gate "only as exactly one of 'ruled ADOPT'/'ruled REJECT'" and also says "DEFER/REJECT archives it"
 *    (L42's rule, which the PERF-F map repeats where rulings do name DEFER): for this gate a 'ruled DEFER' note is no marker, reads
 *    no-verdict, creates no bead and archives nothing (R7). C1 exercises DEFER's archive on the verdict itself.
 *
 * Pi grows no H2 bead and reads no gate today, so the statement's trigger has not fired. The census pins that absence and arms the
 * acceptance for the first Pi surface that would:
 *  T, the trigger, absent today. T1 no walked root (PROGRAM_SCANS: src, qa, examples, .agents, .pi, .github, .codex,
 *    .beads/hooks and the root's own files - every surface that acts or instructs an agent) names the program, a work package or
 *    an H2 bead (H2, any case);
 *    T2 the bd write spellings of Pi's script roots (EXEC_SCANS, Markdown excluded) are exactly WRITE_ROSTER, src holding none;
 *    T3 Pi's beads reader, driven through a recording seam with the gate's snapshot row closed and ruled in its notes, calls show
 *    alone, keeps the creation title and no description, notes, close-reason or labels, and the reference reader reads no verdict
 *    from what it keeps.
 *  A, acceptance (a). A1 Pi's store as its tracked export: a floor of rows read, this bead's row read, no row with a gated wp label,
 *    any wp:tsx-h2- label or an rftsx id; A2 no gate text Pi can reach reads ADOPT (no gate row in Pi's store; the producer's gate
 *    row reads no-verdict, the substring count reads ADOPT - F-1); A3 packetViolations, the guard a Pi bead machine must meet, over
 *    the producer's six rows and constructed stores.
 *  B, acceptance (b). The reference reader readGateVerdict: B1 exactly one marker reads its verdict verbatim, with its field; B2 zero
 *    or two markers read no-verdict; B3 a closed bead with none - closed by status, close reason, labels or closed_at - and every
 *    near-spelling read no-verdict; B4 the judge over READER_CASES passes the reference and fails each synthesizing reader
 *    (closure, labels, close reason, substring count, first of many, case-folded); B5 the creation title and every listed
 *    alternative form read no-verdict while the substring count reads ADOPT.
 *  C, acceptance (c). The reference compile step compileGated over the vendored gated list: C1 REJECT and DEFER create no bead and
 *    archive the five packets with their verdict; C2 ADOPT creates the five under the epic, each with one `related` edge to the gate
 *    and no family: label; C3 no verdict creates and archives nothing; C4 judgeCompile refuses each mutant (creating without ADOPT,
 *    a skipped or extra archive, a blocks edge, a draft outside the epic, a family: label, a dropped packet).
 *  D, acceptance (d). D1 Pi's store holds no program-labelled bead and no family: label; the producer's six program-labelled rows
 *    carry none while rftsx-auqdi reads open; D2 familyViolations over constructed stores.
 *  G, the gate's prerequisites stay unshipped in every Pi claim: G1 no src, qa, docs (its receipts aside), examples, .agents, .pi
 *    or root file names API-PIN.md, TSX-FED-01 or the API pin's audit test (GATE_PREREQUISITES).
 *  P, the producer's facts: P1 every vendored block equals its sha256; P2 the gated list and its rule; P3 the six rows' labels, the
 *    checker notes and the store read; P4 EAT-R575/R576's ruling form and filter.
 *  F, the owner filing: F1 wb-4nut.4's row in the tracked bead export carries every FILING_CONSTANTS entry and an acceptance whose
 *    "(x) ..." clauses are exactly rows A-D, each label equal to its clause.
 *  M, the matchers: MH1-MH6 hit the H2 family, MW1-MW9 the bd write family, MG1-MG3 the prerequisites.
 *  R, the named residuals, each with a pinned quiet row: R1 R-COMPOSED an id or a bd argv assembled at runtime; R2 R-GENERIC-RUNNER
 *    a launch whose command and argv come from data; R3 R-TEST-TREE test/ is not walked (it quotes bd writes and names the program
 *    in censuses, this file included); R4 R-TRACKER-DATA the export and the interactions log are data, not surfaces (the export's
 *    wb-4nut rows name the program); R5 R-CASE-VARIANT a ruling in another letter case reads no-verdict (verbatim); R6
 *    R-ALTERNATIVE-UNLISTED an alternative joined by a word MARKER does not list reads as a marker (the one known false-ADOPT
 *    form); R7 R-DEFER-UNREAD (F-2); R8 R-OTHER-FIELD a marker only in design, acceptance_criteria or close_reason is not read; R9
 *    R-SNAPSHOT the census reads the export and the vendored map, never a live store (a bead filed after the last export is
 *    invisible here: 707 live against 706 exported at the cut); R10 R-OTHER-STORE an H2 bead in another store (a hosted agent's
 *    shell in the rftsx checkout) is invisible to A1; R11 R-BD-INTEGRATION bd's own hook verbs (hooks run, codex-hook) sync the
 *    tracker and are not write spellings; R12 R-PROSE-RECORDS docs/, new-feedback/ and vendor/ are prose and records T1 does not
 *    walk, and G1 reads docs but its receipts, which quote bead titles (a later wb-4nut receipt names the program by its title).
 * OUTSIDE ANCHORS: F1 (the bead export: rows A-D), A1 and D1 (the export's rows), T1-T2 and G1 (the walked trees), T3
 * (readBeadsWork itself). Every other pin is held by the roster alone, so removing it from every literal at once stays green: the
 * seat measured that for P4 and R5 and names it here rather than claim otherwise. The out-of-file roster
 * test/fixtures/h2-bead-graph-roster.json holds every row's id, label and pins, every pin's witness, the pinned constants and the
 * vendored producer lines; FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * SCOPE: readGateVerdict, packetViolations, compileGated and familyViolations are the rule a future Pi bead machine must meet, not a
 * bead machine: nothing here spawns bd, writes a store or reads a live one. A later cut that adds a Pi surface reading the gate or
 * writing beads brings it under rows A-D and re-pins T.
 *
 * Display paths added: none. Test-only: nothing is spawned or written; the repository files read are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type BeadsReadClient, type BeadsShowCall, type BeadsShowResult, readBeadsWork } from "../src/workbench/beads-observer.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const THIS_FILE = fileURLToPath(import.meta.url);
const ROSTER_PATH = join(HERE, "fixtures", "h2-bead-graph-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-4nut.4";
/** The owner triage's read sha of the harness2-reactive-evolution program in ReactiveFiberTSXSDK. */
const PROGRAM_PIN = "76bbbffd9d4a";

/** The tracker's executable name, composed so that no line of this file spells a bd command. */
const BD = ["b", "d"].join("");
const GATE = "rftsx-rupqh";
const API_PIN_BEAD = "rftsx-auqdi";
const EPIC = "rftsx-bhmrd";
const PROGRAM_LABEL = "program:harness2-reactive-evolution-2026-10-20";
const GATED_KEYS: readonly string[] = ["TSX-H2-01", "TSX-H2-02", "TSX-H2-03", "TSX-H2-04", "TSX-H2-05"];
/** Acceptance (a)'s five labels: the gated keys as the producer labels a work package. */
const GATED_LABELS: readonly string[] = GATED_KEYS.map(key => `wp:${key.toLowerCase()}`);
/** The two ruling markers, as EAT-R575 and the filing spell them. */
const MARKERS: readonly string[] = ["ruled ADOPT", "ruled REJECT"];
/** The bead's text the reader reads: its title, its body and the notes --append-notes writes. Never status, labels or closure. */
const TEXT_FIELDS: readonly string[] = ["title", "description", "notes"];
/** The verdicts L42's rule archives. */
const ARCHIVE_VERDICTS: readonly string[] = ["DEFER", "REJECT"];

/** T1's family, in any case: the program's directory and label name, its work-package keys and labels (tsx-h2-00 to -05 and
 * tsx-h2-adr) and the six bead ids of its map. */
const H2 = /harness2-reactive-evolution|tsx-h2-(?:0[0-5]|adr)(?![\w])|rftsx-(?:bhmrd|7sy4c|8er6b|e9a5e|auqdi|rupqh)(?![\w])/i;
/** G1's family: the gate's prerequisites - the API pin document, the vocabulary mapping and the pin's audit test. */
const GATE_PREREQUISITES = /API-PIN|TSX-FED-01|harness2-api-pin/i;
/** T2's verb family: every bd verb that writes a store, makes one or brings rows into one. */
const WRITE_VERBS: readonly string[] = [
  "create",
  "q",
  "update",
  "close",
  "reopen",
  "delete",
  "dep",
  "label",
  "comment",
  "comments",
  "edit",
  "import",
  "init",
  "mol",
  "cook",
  "duplicate",
  "supersede",
  "merge",
  "restore",
  "prune",
  "purge",
  "flatten",
  "sync",
  "dolt",
  "defer",
  "undefer",
  "promote",
  "set-state",
];
/** Flags that make a bd read verb write (ready --claim, doctor --fix, show with appended notes). */
const WRITE_FLAGS: readonly string[] = ["--claim", "--append-notes", "--append-notes-file", "--notes", "--fix"];
const VERB_GROUP = WRITE_VERBS.join("|");
const FLAG_GROUP = WRITE_FLAGS.join("|");
/** A shell-form bd command word: bd not inside an identifier or a path, its global flags (with their values), then a write verb. */
const WRITE_SHELL = new RegExp(`(?<![\\w./-])${BD}(?:\\s+-{1,2}[A-Za-z][\\w-]*(?:[=\\s](?!-)[^\\s'"\`]+)?)*\\s+(${VERB_GROUP})(?![\\w-])`);
/** An argv-form launch: the quoted executable, then its leading flag elements, then a quoted write verb. */
const WRITE_ARGV = new RegExp(`["'\`]${BD}["'\`]\\s*,\\s*\\[\\s*(?:["'\`]-[^"'\`]*["'\`]\\s*,\\s*)*["'\`](${VERB_GROUP})["'\`]`);
/** A bd command word on a line that also carries a write flag, in either form. */
const WRITE_FLAG = new RegExp(`(?:(?<![\\w./-])${BD}\\s|["'\`]${BD}["'\`]\\s*,).*?(${FLAG_GROUP})(?![\\w-])`);
/** What follows a marker when it is the first member of an alternative: separators, at most one joining word, a verdict word. */
const SEPARATORS = "[\\s()\\[\\],;:/|'\"`]*";
/** A ruling marker: "ruled ADOPT" or "ruled REJECT" verbatim, at a word start, the verdict word ending where no letter, digit, "_"
 * or "-" follows (ADOPT-PROTOTYPE and ADOPTED are not ADOPT), and not the first member of an alternative ("ruled ADOPT or REJECT",
 * "ruled ADOPT|REJECT"): the question the gate asks is not its answer. */
const MARKER = new RegExp(`(?<![\\w-])ruled (ADOPT|REJECT)(?![\\w-])(?!${SEPARATORS}(?:(?:or|and|nor)(?![\\w-])${SEPARATORS})?(?:ADOPT|REJECT|DEFER)(?![\\w-]))`, "g");

/** sha256 of each vendored block, newline-terminated lines: `git -C <ReactiveFiberTSXSDK> show 76bbbffd9d4a:<path> | sed -n '<lines>p'`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  storeRead: "6caa3b6c1b914cacb0ba4e723baf081fd3702565fa6b5a3971b10a1eaceec746",
  family: "f00d329427a88b5f865085278195c8dd989cdef4186712b38950c34d2490e45d",
  charter: "f0804ac7d86516ef08eb0a593437265eadb9311ebc9627487673ea7bb3802993",
  ready: "223d0250521fa87512c4a48ed1de1967480ef29cbedfab589ef91ffba67eb432",
  gated: "10e5249d5cd7de4d729fc68458d7f156cd9b5b81c060ac6c4af511f66c0864e1",
  dispatch: "75f0bd46e27a736c9acf6df7831cef72ef669ccedc0cbd009d3d24a9ec80c804",
  checker: "fd84826b02a6f6526e8d9cb094164772813a8ab723f65853a51f01ce628d99b1",
  r575Statement: "b72798e55e76eed293aa1bf9bcfff03ebc3fea8fa998014b5e7a1777f039bc26",
  r575Acceptance: "a5ca0fa367221dad2899cbe926e9da0beae12d9923e56e20002a401f7403043d",
  r576Statement: "6b6199c8b7760b5ea9955243032f83a80fe3ed792cdf9fd1a74ffb4b3f6da79a",
  r576Acceptance: "bf0807e20db575527f7b4691d562034cfc23c230f36960b82578d7698b22effa",
};

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
  /** Subtrees of the root that are never read (paths relative to the root). */
  readonly omit: readonly string[];
}
/** T1's roots: every surface that acts or tells an agent what to do. Each floor sits below the count measured at base 7718651
 * (src 115, qa 67, examples 7, .agents 2, .pi 1, .github 2, .codex 2, .beads/hooks 5, the root's own files 27), so an emptied walk
 * reds and an additive change does not; "." walks the root's own regular files (never .git) and nothing below it. docs/,
 * new-feedback/ and vendor/ are prose and records, not walked here (residual R12). */
const PROGRAM_SCANS: readonly ScanRoot[] = [
  { pin: "T1", root: "src", floor: 100, anchorFile: "workbench/beads-observer.ts", anchorToken: "BeadsReadClient", omit: [] },
  { pin: "T1", root: "qa", floor: 50, anchorFile: "workbench/live-furnace-vc4-launch.mjs", anchorToken: "'init'", omit: [] },
  { pin: "T1", root: "examples", floor: 5, anchorFile: "workflows/compose.js", anchorToken: "count-child", omit: [] },
  { pin: "T1", root: ".agents", floor: 2, anchorFile: "skills/beads/SKILL.md", anchorToken: `${BD} create`, omit: [] },
  { pin: "T1", root: ".pi", floor: 1, anchorFile: "agents/auditor.md", anchorToken: "tools:", omit: [] },
  { pin: "T1", root: ".github", floor: 2, anchorFile: "workflows/ci.yml", anchorToken: "runs-on", omit: [] },
  { pin: "T1", root: ".codex", floor: 2, anchorFile: "hooks.json", anchorToken: `${BD} codex-hook`, omit: [] },
  { pin: "T1", root: ".beads/hooks", floor: 5, anchorFile: "pre-commit", anchorToken: `${BD} hooks run`, omit: [] },
  { pin: "T1", root: ".", floor: 20, anchorFile: "package.json", anchorToken: '"extensions"', omit: [] },
];
/** T2's script roots, Markdown never read (instruction text, residual R3's sibling); its own literal, so no row borrows T1's. */
const EXEC_SCANS: readonly ScanRoot[] = [
  { pin: "T2", root: "src", floor: 100, anchorFile: "workbench/beads-observer.ts", anchorToken: "BeadsReadClient", omit: [] },
  { pin: "T2", root: "qa", floor: 50, anchorFile: "workbench/live-furnace-vc4-launch.mjs", anchorToken: "'init'", omit: [] },
  { pin: "T2", root: "examples", floor: 5, anchorFile: "workflows/compose.js", anchorToken: "count-child", omit: [] },
  { pin: "T2", root: ".github", floor: 2, anchorFile: "workflows/ci.yml", anchorToken: "runs-on", omit: [] },
  { pin: "T2", root: ".codex", floor: 2, anchorFile: "hooks.json", anchorToken: `${BD} codex-hook`, omit: [] },
  { pin: "T2", root: ".beads/hooks", floor: 5, anchorFile: "pre-commit", anchorToken: `${BD} hooks run`, omit: [] },
  { pin: "T2", root: ".", floor: 15, anchorFile: "package.json", anchorToken: '"extensions"', omit: [] },
];
/** G1's roots: the code, the agent instructions and the living docs (a claim lives there); the receipts are delivery records that
 * quote bead titles and are not read (residual R12). The docs floor sits below the 27 files measured outside its 44 receipts. */
const GATED_SCANS: readonly ScanRoot[] = [
  { pin: "G1", root: "src", floor: 100, anchorFile: "workbench/beads-observer.ts", anchorToken: "BeadsReadClient", omit: [] },
  { pin: "G1", root: "qa", floor: 50, anchorFile: "workbench/live-furnace-vc4-launch.mjs", anchorToken: "'init'", omit: [] },
  { pin: "G1", root: "docs", floor: 20, anchorFile: "workbench/09-observation-and-provenance.md", anchorToken: "bead machines", omit: ["workbench/receipts"] },
  { pin: "G1", root: "examples", floor: 5, anchorFile: "workflows/compose.js", anchorToken: "count-child", omit: [] },
  { pin: "G1", root: ".agents", floor: 2, anchorFile: "skills/beads/SKILL.md", anchorToken: `${BD} create`, omit: [] },
  { pin: "G1", root: ".pi", floor: 1, anchorFile: "agents/auditor.md", anchorToken: "tools:", omit: [] },
  { pin: "G1", root: ".", floor: 20, anchorFile: "package.json", anchorToken: '"extensions"', omit: [] },
];
/** T2's roster: every bd write spelling of the script roots at base 7718651, as "<file> <verb> x<lines>". */
const WRITE_ROSTER: readonly string[] = [".gitignore init x1", "qa/workbench/live-furnace-vc4-launch.mjs init x4"];
/** A2/R4's floor on the export's rows (706 at base 7718651). */
const EXPORT_FLOOR = 600;
/** The filing text F1 holds this census to. */
const FILING_CONSTANTS: readonly string[] = [
  `BEADS-2026-10-21.md:42@${PROGRAM_PIN}`,
  GATE,
  API_PIN_BEAD,
  "API-PIN.md",
  "TSX-FED-01",
  "--append-notes",
  `'${MARKERS[0]}'/'${MARKERS[1]}'`,
  "never synthesized from status, labels or closure",
  "DEFER/REJECT archives it",
  "packets carry `related` edges only",
  "EAT-R575",
  "R-05",
  "R-08",
];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: "(trigger, absent today) no Pi surface grows the H2 bead graph or reads its gate: no walked root names the program, a work package or an H2 bead, the only bd write spelled in Pi's scripts is the live tier's scratch-store init, and Pi's one beads reader calls show alone and keeps no text a ruling could be read from but the title",
    pins: ["T1", "T2", "T3"],
  },
  {
    id: "A",
    label: "(a) `bd -q list --json -s all --limit 5000` shows 0 wp:tsx-h2-01..05 beads while rftsx-rupqh has no 'ruled ADOPT' text",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(b) verdict reader: exactly one marker reads that verdict verbatim; zero/two markers or a closed bead with none read no-verdict; a closure-derived ADOPT fails",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) a DEFER/REJECT gate creates no bead and writes the packet to the compile ledger; created packets carry only `related` edges",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(d) no program:harness2-reactive-evolution-2026-10-20 bead carries a family: label while rftsx-auqdi is open",
    pins: ["D1", "D2"],
  },
  {
    id: "G",
    label: "the gate's prerequisites stay unshipped in every Pi claim: no src, qa, docs (its receipts aside), examples, .agents, .pi or root file names API-PIN.md, TSX-FED-01 or the API pin's audit test",
    pins: ["G1"],
  },
  {
    id: "P",
    label: "the producer's map at the pin: every vendored block equals its sha256, the gated list is TSX-H2-01..05 behind rftsx-rupqh, no row carries a family: or gated wp label and the ruling form is EAT-R575's",
    pins: ["P1", "P2", "P3", "P4"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-4nut.4 in the tracked bead export carries every pinned constant and names exactly the clauses rows A-D cover, each label equal to its clause",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the H2 family, the bd write family and the prerequisite family judge their pinned spellings as hits",
    pins: ["MH1", "MH2", "MH3", "MH4", "MH5", "MH6", "MW1", "MW2", "MW3", "MW4", "MW5", "MW6", "MW7", "MW8", "MW9", "MG1", "MG2", "MG3"],
  },
  {
    id: "R",
    label: "the named residuals R1-R12 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11", "R12"],
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
  readonly lines: string;
  readonly text: readonly string[];
}
interface Roster {
  readonly constants: Json;
  readonly rows: readonly RosterRow[];
  readonly excerpts: Readonly<Record<string, Excerpt>>;
}

function isObject(value: unknown): value is { [key: string]: Json } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
const clone = (value: unknown): Json => JSON.parse(JSON.stringify(value)) as Json;

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows)) throw new Error("roster must be an object with a rows list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: clone(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  if (!isObject(raw.excerpts)) throw new Error("roster needs an excerpts object");
  const excerpts: Record<string, Excerpt> = {};
  for (const [name, entry] of Object.entries(raw.excerpts)) {
    if (!isObject(entry) || typeof entry.path !== "string" || typeof entry.lines !== "string") throw new Error(`roster excerpts.${name} needs a path and lines`);
    excerpts[name] = { path: entry.path, lines: entry.lines, text: strings(entry.text, `excerpts.${name}.text`) };
  }
  return { constants: clone(raw.constants), rows, excerpts };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function excerptOf(name: string): Excerpt {
  const excerpt = ROSTER.excerpts[name];
  if (excerpt === undefined) throw new Error(`the roster holds no excerpt ${name}`);
  return excerpt;
}
/** The constants the roster mirrors: a change to any of them here re-pins the roster. */
const constants = (): Json =>
  clone({
    gatedLabels: GATED_LABELS,
    markers: MARKERS,
    textFields: TEXT_FIELDS,
    archiveVerdicts: ARCHIVE_VERDICTS,
    writeVerbs: WRITE_VERBS,
    writeFlags: WRITE_FLAGS,
    writeRoster: WRITE_ROSTER,
    exportFloor: EXPORT_FLOOR,
    excerptSha256: EXCERPT_SHA256,
    programScans: PROGRAM_SCANS,
    execScans: EXEC_SCANS,
    gatedScans: GATED_SCANS,
    families: { h2: H2.source, prerequisites: GATE_PREREQUISITES.source, marker: MARKER.source },
  });

// --- the walk ---------------------------------------------------------------------------------------------------------

/** Every regular file below a directory (symlinks are not followed); a path that vanishes mid-walk holds nothing. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
/** A file's text; a binary file (a NUL byte in it) or an unreadable one holds none. */
function textOf(path: string): string {
  try {
    const text = readFileSync(path, "utf8");
    return text.includes(String.fromCodePoint(0)) ? "" : text;
  } catch {
    return "";
  }
}
/** A root's files: the whole tree below it but its omitted subtrees, or for "." the root's own regular files but .git. */
function filesOf(scan: ScanRoot): string[] {
  const omitted = scan.omit.map(path => join(REPO, scan.root, path));
  if (scan.root !== ".") return filesBelow(join(REPO, scan.root)).filter(file => !omitted.some(prefix => file.startsWith(`${prefix}/`)));
  return readdirSync(REPO, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name !== ".git")
    .map(entry => join(REPO, entry.name));
}
interface Walk {
  readonly files: readonly string[];
  readonly floorMet: boolean;
  readonly anchorRead: boolean;
}
function walked(scan: ScanRoot, files: readonly string[]): Walk {
  const anchor = join(REPO, scan.root, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  return { files, floorMet: files.length >= scan.floor, anchorRead };
}
const rel = (path: string): string => relative(REPO, path);
function familyScan(scan: ScanRoot, family: RegExp, spelled: string): Json {
  const walk = walked(scan, filesOf(scan));
  const hits = walk.files.filter(file => family.test(textOf(file))).map(rel);
  expect(hits, `files spelling ${spelled} under ${scan.root}`).toEqual([]);
  return { root: scan.root, floorMet: walk.floorMet, anchorRead: walk.anchorRead, hits };
}
/** T2's matcher: the write verb (or flag) of every line spelling a bd write, in line order. */
function writeHits(text: string): string[] {
  return text.split("\n").flatMap(line => {
    const verb = WRITE_SHELL.exec(line)?.[1] ?? WRITE_ARGV.exec(line)?.[1] ?? WRITE_FLAG.exec(line)?.[1];
    return verb === undefined ? [] : [verb];
  });
}
/** A script root's bd write spellings as "<file> <verb> x<lines>" (Markdown is instruction text, never read here). */
function writeScan(scan: ScanRoot): { readonly walk: Walk; readonly spellings: string[] } {
  const walk = walked(
    scan,
    filesOf(scan).filter(file => !file.endsWith(".md")),
  );
  const spellings = walk.files.flatMap(file => {
    const counts = new Map<string, number>();
    for (const verb of writeHits(textOf(file))) counts.set(verb, (counts.get(verb) ?? 0) + 1);
    return [...counts].map(([verb, count]) => `${rel(file)} ${verb} x${count}`);
  });
  return { walk, spellings };
}

// --- the bead export --------------------------------------------------------------------------------------------------

/** Every row of the tracked bead export (the store's rows at the last ledger hop), unparsable lines dropped. */
function exportRows(): JsonObject[] {
  const rows: JsonObject[] = [];
  for (const line of textOf(BEAD_EXPORT).split("\n")) {
    if (line.trim() === "") continue;
    try {
      const parsed: unknown = JSON.parse(line);
      if (isObject(parsed) && typeof parsed.id === "string") rows.push(parsed);
    } catch {
      // A torn line names no bead.
    }
  }
  return rows;
}
const labelsOf = (row: JsonObject): string[] => (Array.isArray(row.labels) ? row.labels.filter((label): label is string => typeof label === "string") : []);
const idOf = (row: JsonObject): string => (typeof row.id === "string" ? row.id : "");

// --- the producer's map -----------------------------------------------------------------------------------------------

const sha256Of = (lines: readonly string[]): string => createHash("sha256").update(lines.map(line => `${line}\n`).join("")).digest("hex");
/** A markdown table row's cells, outer pipes dropped. */
const cellsOf = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map(cell => cell.trim());
/** The six H2 rows of the map (charter and ready blocks) as store rows, status open as L3 reads them. */
function snapshotRows(): JsonObject[] {
  return [...excerptOf("charter").text, ...excerptOf("ready").text]
    .filter(line => line.startsWith("| rftsx-"))
    .map(line => {
      const cells = cellsOf(line);
      return { id: cells[0] ?? "", title: cells[2] ?? "", status: "open", labels: (cells[8] ?? "").split(",").map(label => label.trim()) };
    });
}
function snapshotRow(id: string): JsonObject {
  const row = snapshotRows().find(entry => entry.id === id);
  if (row === undefined) throw new Error(`the vendored map holds no row ${id}`);
  return row;
}
interface Packet {
  readonly key: string;
  readonly title: string;
  readonly gate: string;
  readonly rule: string;
}
/** The gated list (L46-L50): key, title, gate bead and rule of each packet. */
function gatedPackets(): Packet[] {
  return excerptOf("gated")
    .text.filter(line => line.startsWith("| TSX-H2-"))
    .map(line => {
      const cells = cellsOf(line);
      return { key: cells[0] ?? "", title: cells[1] ?? "", gate: cells[5] ?? "", rule: cells[6] ?? "" };
    });
}

// --- the reference reader ---------------------------------------------------------------------------------------------

type Verdict = "ADOPT" | "REJECT" | "no-verdict";
type Reader = (bead: JsonObject) => Verdict;
interface Reading {
  readonly verdict: Verdict;
  readonly markers: number;
  readonly marker?: string;
  readonly field?: string;
}
const markersIn = (text: string): string[] => [...text.matchAll(MARKER)].map(match => match[0]);
/** The reference reader: the markers of the bead's text fields; exactly one reads its own verdict, any other count none. */
function readGateVerdict(bead: JsonObject): Reading {
  const found = TEXT_FIELDS.flatMap(field => {
    const value = bead[field];
    return typeof value === "string" ? markersIn(value).map(marker => ({ field, marker })) : [];
  });
  const [only] = found;
  if (only === undefined || found.length !== 1) return { verdict: "no-verdict", markers: found.length };
  return { verdict: only.marker.endsWith("ADOPT") ? "ADOPT" : "REJECT", markers: 1, marker: only.marker, field: only.field };
}
const reference: Reader = bead => readGateVerdict(bead).verdict;
const readingJson = (reading: Reading): Json => clone(reading);
/** The hazard F-1 names: the marker substrings counted over the same fields, alternatives included. */
const substringCount: Reader = bead => {
  const count = (marker: string): number => TEXT_FIELDS.reduce((sum, field) => sum + (typeof bead[field] === "string" ? String(bead[field]).split(marker).length - 1 : 0), 0);
  const adopt = count(MARKERS[0] ?? "");
  const reject = count(MARKERS[1] ?? "");
  if (adopt + reject !== 1) return "no-verdict";
  return adopt === 1 ? "ADOPT" : "REJECT";
};
/** Readers that synthesize a verdict the acceptance forbids, each a mutant B4's judge must fail. */
const MUTANT_READERS: Readonly<Record<string, Reader>> = {
  closure: bead => (bead.status === "closed" ? "ADOPT" : reference(bead)),
  labels: bead => (labelsOf(bead).some(label => /adopt/i.test(label)) ? "ADOPT" : reference(bead)),
  closeReason: bead => (typeof bead.close_reason === "string" && bead.close_reason.includes("ADOPT") ? "ADOPT" : reference(bead)),
  substringCount,
  firstOfMany: bead => {
    const first = TEXT_FIELDS.flatMap(field => (typeof bead[field] === "string" ? markersIn(String(bead[field])) : []))[0];
    return first === undefined ? "no-verdict" : first.endsWith("ADOPT") ? "ADOPT" : "REJECT";
  },
  caseFolded: bead => {
    const folded = Object.fromEntries(TEXT_FIELDS.map(field => [field, typeof bead[field] === "string" ? String(bead[field]).replace(/ruled (adopt|reject)/gi, (_, word: string) => `ruled ${word.toUpperCase()}`) : null]));
    return reference(folded);
  },
};

/** The creation title of the gate, as the producer's map spells it. */
const creationTitle = (): string => String(snapshotRow(GATE).title);
interface ReaderCase {
  readonly id: string;
  readonly bead: JsonObject;
  readonly expected: Verdict;
}
/** The acceptance's readings, stated per case (never derived from the reference reader). */
function readerCases(): ReaderCase[] {
  const gate = (fields: JsonObject): JsonObject => ({ id: GATE, title: "gate", status: "open", labels: [], ...fields });
  return [
    { id: "one-adopt", bead: gate({ notes: "2026-10-23 orchestrator: ruled ADOPT (API-PIN.md landed; the mapping exists)" }), expected: "ADOPT" },
    { id: "one-reject", bead: gate({ notes: "ruled REJECT" }), expected: "REJECT" },
    { id: "none", bead: gate({ notes: "awaiting the API pin and the mapping" }), expected: "no-verdict" },
    { id: "two-adopt", bead: gate({ notes: "ruled ADOPT\nruled ADOPT" }), expected: "no-verdict" },
    { id: "adopt-and-reject", bead: gate({ notes: "ruled ADOPT; then ruled REJECT" }), expected: "no-verdict" },
    { id: "closed-none", bead: gate({ status: "closed", close_reason: "ADOPT", closed_at: "2026-10-23T00:00:00Z" }), expected: "no-verdict" },
    { id: "closed-labels", bead: gate({ status: "closed", labels: ["ruled:adopt", "verdict:ADOPT"] }), expected: "no-verdict" },
    { id: "creation-title", bead: gate({ title: creationTitle() }), expected: "no-verdict" },
    { id: "lowercase", bead: gate({ notes: "ruled adopt" }), expected: "no-verdict" },
    { id: "closed-ruled", bead: gate({ status: "closed", notes: "ruled ADOPT", close_reason: "ruled" }), expected: "ADOPT" },
  ];
}
/** The acceptance as a predicate over a reader: the cases it reads otherwise than the acceptance states, in case order. */
const judgeReader = (reader: Reader): string[] => readerCases().flatMap(entry => (reader(entry.bead) === entry.expected ? [] : [entry.id]));

// --- the reference guards ---------------------------------------------------------------------------------------------

/** Acceptance (a) as a predicate over a store: every gated wp label on a row while the gate does not read ADOPT. */
function packetViolations(rows: readonly JsonObject[]): string[] {
  const gate = rows.find(row => idOf(row) === GATE);
  const verdict = gate === undefined ? "no-verdict" : readGateVerdict(gate).verdict;
  if (verdict === "ADOPT") return [];
  return rows.flatMap(row => labelsOf(row).filter(label => GATED_LABELS.includes(label)).map(label => `a:${idOf(row)} ${label}`)).sort();
}
/** Acceptance (d) as a predicate over a store: every family: label on a program-labelled row while rftsx-auqdi is not closed (absent
 * reads open: the clause holds until the landing is seen). */
function familyViolations(rows: readonly JsonObject[]): string[] {
  const apiPin = rows.find(row => idOf(row) === API_PIN_BEAD);
  if (apiPin !== undefined && apiPin.status === "closed") return [];
  return rows
    .filter(row => labelsOf(row).includes(PROGRAM_LABEL))
    .flatMap(row => labelsOf(row).filter(label => label.startsWith("family:")).map(label => `d:${idOf(row)} ${label}`))
    .sort();
}
type CompileVerdict = Verdict | "DEFER";
interface Edge {
  readonly type: string;
  readonly to: string;
}
interface Draft {
  readonly key: string;
  readonly parent: string;
  readonly labels: readonly string[];
  readonly edges: readonly Edge[];
}
interface LedgerEntry {
  readonly key: string;
  readonly verdict: string;
}
interface Compiled {
  readonly created: readonly Draft[];
  readonly archived: readonly LedgerEntry[];
}
/** The reference compile step: ADOPT creates every packet under the epic with one `related` edge to its gate; DEFER and REJECT
 * archive every packet with the verdict; anything else leaves the list gated. No family: label is ever minted (the ruling's). */
function compileGated(verdict: CompileVerdict, packets: readonly Packet[]): Compiled {
  if (verdict === "ADOPT") {
    return { created: packets.map(packet => ({ key: packet.key, parent: EPIC, labels: [PROGRAM_LABEL, `wp:${packet.key.toLowerCase()}`], edges: [{ type: "related", to: GATE }] })), archived: [] };
  }
  if (ARCHIVE_VERDICTS.includes(verdict)) return { created: [], archived: packets.map(packet => ({ key: packet.key, verdict })) };
  return { created: [], archived: [] };
}
const sameList = (left: readonly string[], right: readonly string[]): boolean => left.length === right.length && left.every((item, index) => item === right[index]);
/** Acceptance (c), with (d)'s label clause, as a predicate over any compile of `verdict`: the clauses it breaks, in a fixed order. */
function judgeCompile(verdict: CompileVerdict, compiled: Compiled, packets: readonly Packet[], apiPinOpen: boolean): string[] {
  const keys = packets.map(packet => packet.key);
  const archives = ARCHIVE_VERDICTS.includes(verdict);
  const broken: string[] = [];
  if (verdict !== "ADOPT" && compiled.created.length > 0) broken.push("c:created-without-adopt");
  if (verdict === "ADOPT" && !sameList(compiled.created.map(draft => draft.key), keys)) broken.push("c:packets");
  if (archives && !sameList(compiled.archived.map(entry => entry.key), keys)) broken.push("c:archive-missing");
  if (archives && compiled.archived.some(entry => entry.verdict !== verdict)) broken.push("c:archive-verdict");
  if (!archives && compiled.archived.length > 0) broken.push("c:archive-without-verdict");
  if (compiled.created.some(draft => draft.edges.length === 0 || draft.edges.some(edge => edge.type !== "related"))) broken.push("c:edge-type");
  if (compiled.created.some(draft => draft.parent !== EPIC)) broken.push("c:parent");
  if (apiPinOpen && compiled.created.some(draft => draft.labels.some(label => label.startsWith("family:")))) broken.push("d:family");
  return broken;
}
/** Compile steps that break the acceptance, each a mutant C4's judge must name. */
const MUTANT_COMPILES: Readonly<Record<string, { readonly verdict: CompileVerdict; readonly compile: (packets: readonly Packet[]) => Compiled }>> = {
  createOnReject: { verdict: "REJECT", compile: packets => ({ created: compileGated("ADOPT", packets).created, archived: compileGated("REJECT", packets).archived }) },
  skipArchive: { verdict: "DEFER", compile: () => ({ created: [], archived: [] }) },
  archiveUngated: { verdict: "no-verdict", compile: packets => compileGated("DEFER", packets) },
  blocksEdge: { verdict: "ADOPT", compile: packets => ({ created: compileGated("ADOPT", packets).created.map(draft => ({ ...draft, edges: [{ type: "blocks", to: GATE }] })), archived: [] }) },
  outsideEpic: { verdict: "ADOPT", compile: packets => ({ created: compileGated("ADOPT", packets).created.map(draft => ({ ...draft, parent: GATE })), archived: [] }) },
  familyLabel: { verdict: "ADOPT", compile: packets => ({ created: compileGated("ADOPT", packets).created.map(draft => ({ ...draft, labels: [...draft.labels, "family:h2"] })), archived: [] }) },
  dropPacket: { verdict: "ADOPT", compile: packets => compileGated("ADOPT", packets.slice(0, -1)) },
};

// --- Pi's beads reader ------------------------------------------------------------------------------------------------

const SENTINEL = { body: "body-sentinel-4nut4", notes: "notes-sentinel-4nut4", closeReason: "close-sentinel-4nut4", label: "label-sentinel-4nut4" };
/** readBeadsWork over the gate's snapshot row, closed and ruled in its notes, through a seam recording every member read. */
async function piBeadsReading(): Promise<Json> {
  const accessed: string[] = [];
  const envelope = [
    {
      id: GATE,
      title: creationTitle(),
      description: `${SENTINEL.body} ruled ADOPT`,
      notes: `${SENTINEL.notes} ruled ADOPT`,
      status: "closed",
      issue_type: "task",
      priority: 2,
      dependencies: [],
      close_reason: `${SENTINEL.closeReason} ruled ADOPT`,
      closed_at: "2026-10-23T00:00:00Z",
      labels: [SENTINEL.label],
    },
  ];
  const seam: BeadsReadClient = {
    show: async (_id: string, _call: BeadsShowCall): Promise<BeadsShowResult> => ({ exit: 0, stdout: JSON.stringify(envelope), stderr: "" }),
  };
  const client = new Proxy(seam, {
    get(target, property, receiver) {
      accessed.push(String(property));
      return Reflect.get(target, property, receiver);
    },
  });
  const workspaceRoot = "/fixture/rftsx";
  const reading = await readBeadsWork(client, {
    workId: GATE,
    workspaceRoot,
    scope: { workspace: workspaceRoot, principal: "census" },
    limits: { maxDependencies: 8, maxTitleChars: 200, timeoutMs: 5000 },
    now: () => "2026-10-23T00:00:00.000Z",
  });
  const text = JSON.stringify(reading);
  return {
    accessed,
    titleKept: reading.work.title === creationTitle(),
    bodyKept: text.includes(SENTINEL.body),
    notesKept: text.includes(SENTINEL.notes),
    closeReasonKept: text.includes(SENTINEL.closeReason),
    labelsKept: text.includes(SENTINEL.label),
    closure: { status: reading.work.status, closeReasonPresent: reading.work.closeReasonPresent, closedAt: reading.work.closedAt !== undefined },
    verdictFromReading: readingJson(readGateVerdict({ id: GATE, title: reading.work.title, status: reading.work.status })),
  };
}

// --- the matcher spellings --------------------------------------------------------------------------------------------

interface Spelling {
  readonly pin: string;
  readonly family: "h2" | "write" | "prerequisite";
  readonly text: string;
  readonly hit: boolean;
}
const familyHits = (spelling: Spelling): boolean => {
  if (spelling.family === "h2") return H2.test(spelling.text);
  if (spelling.family === "prerequisite") return GATE_PREREQUISITES.test(spelling.text);
  return writeHits(spelling.text).length > 0;
};
/** MH1-MH6, MW1-MW9 and MG1-MG3 must hit; R1, R2 and R11 are quiet rows of their named residuals. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MH1", family: "h2", text: `${BD} create "Versioned schema" --labels wp:tsx-h2-01`, hit: true },
  { pin: "MH2", family: "h2", text: "the gate TSX-H2-ADR reads ADOPT", hit: true },
  { pin: "MH3", family: "h2", text: `const gate = "${GATE}";`, hit: true },
  { pin: "MH4", family: "h2", text: `labels: ["${PROGRAM_LABEL}"]`, hit: true },
  { pin: "MH5", family: "h2", text: "RFTSX-AUQDI closed", hit: true },
  { pin: "MH6", family: "h2", text: "docs/programs/HARNESS2-REACTIVE-EVOLUTION-2026-10-20/BEADS-2026-10-21.md", hit: true },
  { pin: "MW1", family: "write", text: `${BD} create "[H2] packet" --parent ${EPIC}`, hit: true },
  { pin: "MW2", family: "write", text: `${BD} -C /work/rftsx update ${GATE} --status closed`, hit: true },
  { pin: "MW3", family: "write", text: `spawnSync("${BD}", ["create", "--title", "x"]);`, hit: true },
  { pin: "MW4", family: "write", text: `execFileSync('${BD}', ['-q', 'dep', 'add', 'a', 'b']);`, hit: true },
  { pin: "MW5", family: "write", text: `${BD} q "quick capture"`, hit: true },
  { pin: "MW6", family: "write", text: `${BD} label add ${EPIC} family:h2`, hit: true },
  { pin: "MW7", family: "write", text: `${BD} ready --claim --json`, hit: true },
  { pin: "MW8", family: "write", text: `execSync(\`${BD} close \${id}\`);`, hit: true },
  { pin: "MW9", family: "write", text: `BEADS_ACTOR=machine ${BD} show ${GATE} --append-notes "ruled ADOPT"`, hit: true },
  { pin: "MG1", family: "prerequisite", text: "API-PIN.md has landed", hit: true },
  { pin: "MG2", family: "prerequisite", text: "the tsx-fed-01 mapping exists", hit: true },
  { pin: "MG3", family: "prerequisite", text: "tests/audit/harness2-api-pin.test.ts passes", hit: true },
];
/** R1, R2 and R11's quiet spellings, by family. */
const QUIET: Readonly<Record<string, readonly Spelling[]>> = {
  R1: [
    { pin: "R1", family: "h2", text: 'const gate = ["rftsx", "rupqh"].join("-");', hit: false },
    { pin: "R1", family: "write", text: 'spawnSync(["b", "d"].join(""), ["create", "x"]);', hit: false },
  ],
  R2: [{ pin: "R2", family: "write", text: "spawnSync(command.binary, command.argv, { cwd });", hit: false }],
  R11: [
    { pin: "R11", family: "write", text: `timeout "$_bd_timeout" ${BD} hooks run pre-commit "$@"`, hit: false },
    { pin: "R11", family: "write", text: `"command": "${BD} codex-hook SessionStart",`, hit: false },
  ],
};
const quietRow = (pin: string): Json => {
  const spellings = QUIET[pin] ?? [];
  const hits = spellings.map(spelling => familyHits(spelling));
  expect(hits).toEqual(spellings.map(() => false));
  return spellings.map(spelling => ({ family: spelling.family, digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit: familyHits(spelling) }));
};

/** The specifiers this file imports, read from its own import lines. */
const ownImports = (): string[] => [...textOf(THIS_FILE).matchAll(/^import [^;]*? from "([^"]+)";$/gm)].map(match => match[1] ?? "");

// --- the cases --------------------------------------------------------------------------------------------------------

const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  T1: async () => PROGRAM_SCANS.map(scan => familyScan(scan, H2, "the H2 family")),
  T2: async () => {
    const scans = EXEC_SCANS.map(scan => ({ scan, result: writeScan(scan) }));
    const spellings = scans.flatMap(entry => entry.result.spellings).sort();
    const srcSpellings = scans.filter(entry => entry.scan.root === "src").flatMap(entry => entry.result.spellings);
    expect(spellings, "the bd write spellings of Pi's script roots").toEqual([...WRITE_ROSTER]);
    expect(srcSpellings).toEqual([]);
    return { roots: scans.map(entry => ({ root: entry.scan.root, floorMet: entry.result.walk.floorMet, anchorRead: entry.result.walk.anchorRead })), spellings, srcSpellings };
  },
  T3: async () => {
    const witness = await piBeadsReading();
    expect(isObject(witness) ? witness.accessed : null).toEqual(["show"]);
    return witness;
  },
  A1: async () => {
    const rows = exportRows();
    const anchor = rows.find(row => idOf(row) === BEAD);
    const witness = {
      floorMet: rows.length >= EXPORT_FLOOR,
      anchorRead: anchor !== undefined && typeof anchor.title === "string" && anchor.title.includes(GATE),
      gatedLabelRows: rows.filter(row => labelsOf(row).some(label => GATED_LABELS.includes(label))).map(idOf),
      wpH2Rows: rows.filter(row => labelsOf(row).some(label => label.startsWith("wp:tsx-h2-"))).map(idOf),
      rftsxRows: rows.filter(row => idOf(row).startsWith("rftsx-")).map(idOf),
      violations: packetViolations(rows),
    };
    expect(witness).toStrictEqual({ floorMet: true, anchorRead: true, gatedLabelRows: [], wpH2Rows: [], rftsxRows: [], violations: [] });
    return witness;
  },
  A2: async () => {
    const storeGate = exportRows().find(row => idOf(row) === GATE);
    const gateRow = snapshotRow(GATE);
    const witness = {
      storeHoldsGate: storeGate !== undefined,
      producerTitle: creationTitle(),
      producerReading: readingJson(readGateVerdict(gateRow)),
      substringCount: substringCount(gateRow),
    };
    expect([witness.storeHoldsGate, witness.producerReading, witness.substringCount]).toStrictEqual([false, { verdict: "no-verdict", markers: 0 }, "ADOPT"]);
    return witness;
  },
  A3: async () => {
    const rows = snapshotRows();
    const packet: JsonObject = { id: "rftsx-new01", title: "[H2] Versioned schema", status: "open", labels: [PROGRAM_LABEL, "wp:tsx-h2-01"] };
    const withGate = (fields: JsonObject): JsonObject[] => [...rows.map(row => (idOf(row) === GATE ? { ...row, ...fields } : row)), packet];
    const witness = {
      producerMap: packetViolations(rows),
      packetUngated: packetViolations([...rows, packet]),
      packetAfterAdopt: packetViolations(withGate({ notes: "ruled ADOPT" })),
      packetGateClosed: packetViolations(withGate({ status: "closed", close_reason: "ADOPT" })),
      packetGateRejected: packetViolations(withGate({ notes: "ruled REJECT" })),
      packetNoGateRow: packetViolations([packet]),
    };
    const violation = ["a:rftsx-new01 wp:tsx-h2-01"];
    expect(witness).toStrictEqual({ producerMap: [], packetUngated: violation, packetAfterAdopt: [], packetGateClosed: violation, packetGateRejected: violation, packetNoGateRow: violation });
    return witness;
  },
  B1: async () => {
    const bead = (fields: JsonObject): JsonObject => ({ id: GATE, title: "gate", status: "open", ...fields });
    const witness = {
      notesAdopt: readingJson(readGateVerdict(bead({ notes: "2026-10-23: ruled ADOPT." }))),
      notesReject: readingJson(readGateVerdict(bead({ notes: "ruled REJECT (no mapping)" }))),
      titleReject: readingJson(readGateVerdict(bead({ title: "[H2-ADR] ADR: ruled REJECT" }))),
      bodyAdopt: readingJson(readGateVerdict(bead({ description: "Decision: ruled ADOPT" }))),
    };
    expect(Object.values(witness).map(reading => (isObject(reading) ? reading.marker : null))).toEqual(["ruled ADOPT", "ruled REJECT", "ruled REJECT", "ruled ADOPT"]);
    return witness;
  },
  B2: async () => {
    const bead = (fields: JsonObject): JsonObject => ({ id: GATE, title: "gate", status: "open", ...fields });
    const witness = {
      none: readingJson(readGateVerdict(bead({ notes: "awaiting the API pin" }))),
      twoAdopt: readingJson(readGateVerdict(bead({ notes: "ruled ADOPT\nruled ADOPT" }))),
      adoptAndReject: readingJson(readGateVerdict(bead({ notes: "ruled ADOPT; then ruled REJECT" }))),
      titleAndNotes: readingJson(readGateVerdict(bead({ title: "ADR: ruled ADOPT", notes: "ruled ADOPT" }))),
    };
    expect(Object.values(witness).map(reading => (isObject(reading) ? reading.verdict : null))).toEqual(["no-verdict", "no-verdict", "no-verdict", "no-verdict"]);
    return witness;
  },
  B3: async () => {
    const closed = (fields: JsonObject): JsonObject => ({ id: GATE, title: "gate", status: "closed", closed_at: "2026-10-23T00:00:00Z", ...fields });
    const witness = {
      closedStatus: reference(closed({})),
      closedReason: reference(closed({ close_reason: "ruled ADOPT" })),
      closedLabels: reference(closed({ labels: ["ruled:adopt", "verdict:ADOPT", "ADOPT"] })),
      prototype: reference(closed({ notes: "ruled ADOPT-PROTOTYPE" })),
      adopted: reference(closed({ notes: "ruled ADOPTED" })),
      bareWord: reference(closed({ notes: "ADOPT" })),
      overruled: reference(closed({ notes: "overruled ADOPT" })),
      twoSpaces: reference(closed({ notes: "ruled  ADOPT" })),
    };
    expect(Object.values(witness).every(verdict => verdict === "no-verdict")).toBe(true);
    return witness;
  },
  B4: async () => {
    const witness = { reference: judgeReader(reference), ...Object.fromEntries(Object.entries(MUTANT_READERS).map(([name, reader]) => [name, judgeReader(reader)])) };
    expect(witness.reference).toEqual([]);
    expect(Object.entries(witness).filter(([name, failed]) => name !== "reference" && failed.length === 0)).toEqual([]);
    return witness;
  },
  B5: async () => {
    const forms = [creationTitle(), "ruled ADOPT or REJECT", "ruled ADOPT|REJECT", "ruled ADOPT / REJECT", "ruled ADOPT, DEFER or REJECT", "(ruled ADOPT or ruled REJECT)"];
    const readings = forms.map(title => ({ reference: reference({ title }), substringCount: substringCount({ title }) }));
    expect(readings.map(reading => reading.reference)).toEqual(forms.map(() => "no-verdict"));
    return readings;
  },
  C1: async () => {
    const packets = gatedPackets();
    const witness = {
      reject: clone(compileGated(reference({ notes: "ruled REJECT" }), packets)),
      defer: clone(compileGated("DEFER", packets)),
      judged: [judgeCompile("REJECT", compileGated("REJECT", packets), packets, true), judgeCompile("DEFER", compileGated("DEFER", packets), packets, true)],
    };
    expect(witness.judged).toEqual([[], []]);
    return witness;
  },
  C2: async () => {
    const packets = gatedPackets();
    const compiled = compileGated(reference({ notes: "ruled ADOPT" }), packets);
    const witness = { compiled: clone(compiled), judged: judgeCompile("ADOPT", compiled, packets, true), edgeTypes: [...new Set(compiled.created.flatMap(draft => draft.edges.map(edge => edge.type)))] };
    expect([witness.judged, witness.edgeTypes]).toEqual([[], ["related"]]);
    return witness;
  },
  C3: async () => {
    const packets = gatedPackets();
    const witness = { noVerdict: clone(compileGated(reference({ notes: "awaiting" }), packets)), titleOnly: clone(compileGated(reference({ title: creationTitle() }), packets)) };
    expect(witness).toStrictEqual({ noVerdict: { created: [], archived: [] }, titleOnly: { created: [], archived: [] } });
    return witness;
  },
  C4: async () => {
    const packets = gatedPackets();
    const witness = Object.fromEntries(Object.entries(MUTANT_COMPILES).map(([name, mutant]) => [name, judgeCompile(mutant.verdict, mutant.compile(packets), packets, true)]));
    expect(Object.entries(witness).filter(([, broken]) => broken.length === 0)).toEqual([]);
    return witness;
  },
  D1: async () => {
    const store = exportRows();
    const map = snapshotRows();
    const witness = {
      storeProgramRows: store.filter(row => labelsOf(row).includes(PROGRAM_LABEL)).map(idOf),
      storeFamilyRows: store.filter(row => labelsOf(row).some(label => label.startsWith("family:"))).map(idOf),
      storeViolations: familyViolations(store),
      mapProgramRows: map.filter(row => labelsOf(row).includes(PROGRAM_LABEL)).map(idOf),
      mapFamilyRows: map.filter(row => labelsOf(row).some(label => label.startsWith("family:"))).map(idOf),
      apiPinStatusAtRead: snapshotRow(API_PIN_BEAD).status,
      mapViolations: familyViolations(map),
    };
    expect([witness.storeViolations, witness.mapFamilyRows, witness.mapViolations]).toEqual([[], [], []]);
    return witness;
  },
  D2: async () => {
    const map = snapshotRows();
    const relabel = (id: string, extra: string): JsonObject[] => map.map(row => (idOf(row) === id ? { ...row, labels: [...labelsOf(row), extra] } : row));
    const adopted = compileGated("ADOPT", gatedPackets()).created.map(draft => ({ id: draft.key, status: "open", labels: [...draft.labels] }));
    const witness = {
      epicFamilyWhileOpen: familyViolations(relabel(EPIC, "family:perf")),
      epicFamilyAfterLanding: familyViolations(relabel(EPIC, "family:perf").map(row => (idOf(row) === API_PIN_BEAD ? { ...row, status: "closed" } : row))),
      familyOutsideProgram: familyViolations([...map, { id: "rftsx-other", status: "open", labels: ["program:resource-efficiency-frontier-2026-10-17", "family:perf"] }]),
      adoptedDrafts: familyViolations([...map, ...adopted]),
      apiPinUnseen: familyViolations([{ id: EPIC, status: "open", labels: [PROGRAM_LABEL, "family:h2"] }]),
    };
    expect(witness).toStrictEqual({ epicFamilyWhileOpen: ["d:rftsx-bhmrd family:perf"], epicFamilyAfterLanding: [], familyOutsideProgram: [], adoptedDrafts: [], apiPinUnseen: ["d:rftsx-bhmrd family:h2"] });
    return witness;
  },
  G1: async () => GATED_SCANS.map(scan => familyScan(scan, GATE_PREREQUISITES, "a gate prerequisite")),
  P1: async () => {
    const computed = Object.fromEntries(Object.keys(ROSTER.excerpts).map(name => [name, sha256Of(excerptOf(name).text)]));
    expect(computed).toStrictEqual({ ...EXCERPT_SHA256 });
    return Object.keys(computed).sort();
  },
  P2: async () => {
    const packets = gatedPackets();
    const rule = excerptOf("gated").text[0] ?? "";
    const witness = {
      keys: packets.map(packet => packet.key),
      gates: [...new Set(packets.map(packet => packet.gate))],
      rules: [...new Set(packets.map(packet => packet.rule))],
      ruleClauses: ["created under the epic, with `related` edges only", "records the verdict ADOPT (`--append-notes`)", "DEFER or REJECT archives the packet in the compile ledger"].filter(clause => rule.includes(clause)).length,
    };
    expect(witness).toStrictEqual({ keys: [...GATED_KEYS], gates: [`TSX-H2-ADR (${GATE})`], rules: ["R-08"], ruleClauses: 3 });
    return witness;
  },
  P3: async () => {
    const map = snapshotRows();
    const checker = excerptOf("checker").text;
    const witness = {
      ids: map.map(idOf),
      wpLabels: map.flatMap(row => labelsOf(row).filter(label => label.startsWith("wp:"))),
      familyLabels: map.flatMap(row => labelsOf(row).filter(label => label.startsWith("family:"))),
      checkerNoFamily: checker.filter(line => line.includes("no family: label")).map(line => /`(rftsx-\w+)`/.exec(line)?.[1] ?? ""),
      everyOpenAtRead: (excerptOf("storeRead").text[0] ?? "").includes("every bead below was `open`"),
      familyRuling: (excerptOf("family").text[0] ?? "").includes("Requirement family (R-05): none until TSX-H2-00"),
    };
    expect([witness.wpLabels, witness.familyLabels, witness.everyOpenAtRead]).toStrictEqual([["wp:tsx-h2-00", "wp:tsx-h2-adr"], [], true]);
    return witness;
  },
  P4: async () => {
    const statement = excerptOf("r575Statement").text.join("\n");
    const acceptance = excerptOf("r575Acceptance").text.join("\n");
    const filter = excerptOf("r576Statement").text.join("\n") + excerptOf("r576Acceptance").text.join("\n");
    const witness = {
      form: statement.includes(`'${MARKERS[0]}' or '${MARKERS[1]}'`),
      titleOrBody: statement.includes("in its title or body"),
      noAdoptStatus: statement.includes("bd has no ADOPT status"),
      exactlyOne: acceptance.includes(`exactly one of '${MARKERS[0]}' / '${MARKERS[1]}'`),
      gatedLabelsNamed: filter.includes("wp:tsx-h2-01 through wp:tsx-h2-05"),
      listCommand: filter.includes("`bd -q list --json -s all --limit 5000`"),
    };
    expect(Object.values(witness).every(Boolean)).toBe(true);
    return witness;
  },
  F1: async () => {
    const row = exportRows().find(entry => idOf(entry) === BEAD);
    const text = row !== undefined && typeof row.notes === "string" ? row.notes : "";
    expect(text, `${BEAD} has no notes in the bead export`).not.toBe("");
    // The filing's acceptance sentence, cut into its "(x) ..." clauses; each judged label must equal its clause.
    const acceptance = /Acceptance: ([\s\S]*?)\s*(?:Related wb:|$)/.exec(text)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(row => /^\([a-z]\) /.test(row.label));
    const labelsEqual = judged.filter((judgedRow, index) => clauseTexts[index] === judgedRow.label).map(judgedRow => judgedRow.id);
    const constantsQuoted = FILING_CONSTANTS.filter(constant => text.includes(constant));
    expect(clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(judgedRow => judgedRow.label.charAt(1)));
    expect(labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(judgedRow => judgedRow.id));
    expect(constantsQuoted).toEqual([...FILING_CONSTANTS]);
    return { clauses, labelsEqual, constantsQuoted: constantsQuoted.length };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = familyHits(spelling);
        expect(hit).toBe(spelling.hit);
        return { family: spelling.family, digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
  R1: async () => quietRow("R1"),
  R2: async () => quietRow("R2"),
  R3: async () => {
    const testFiles = filesBelow(join(REPO, "test"));
    const walkedRoots = [...PROGRAM_SCANS, ...EXEC_SCANS, ...GATED_SCANS].map(scan => scan.root);
    const witness = {
      testWalked: walkedRoots.some(root => root === "test" || root.startsWith("test/")),
      testNamesProgram: testFiles.some(file => H2.test(textOf(file))),
      testSpellsWrites: testFiles.some(file => writeHits(textOf(file)).length > 0),
    };
    expect(witness).toStrictEqual({ testWalked: false, testNamesProgram: true, testSpellsWrites: true });
    return witness;
  },
  R4: async () => {
    const rows = exportRows();
    const walkedRoots = [...PROGRAM_SCANS, ...EXEC_SCANS, ...GATED_SCANS].map(scan => scan.root);
    const witness = {
      trackerDataWalked: walkedRoots.some(root => root === ".beads"),
      exportNamesProgram: rows.some(row => idOf(row).startsWith("wb-4nut") && H2.test(JSON.stringify(row))),
      floorMet: rows.length >= EXPORT_FLOOR,
    };
    expect(witness).toStrictEqual({ trackerDataWalked: false, exportNamesProgram: true, floorMet: true });
    return witness;
  },
  R5: async () => {
    const witness = ["Ruled ADOPT", "ruled Adopt", "RULED ADOPT", "ruled adopt"].map(notes => reference({ notes }));
    expect(witness).toEqual(["no-verdict", "no-verdict", "no-verdict", "no-verdict"]);
    return witness;
  },
  R6: async () => {
    const witness = ["ruled ADOPT, else REJECT", "ruled ADOPT - otherwise REJECT"].map(notes => reference({ notes }));
    expect(witness).toEqual(["ADOPT", "ADOPT"]);
    return witness;
  },
  R7: async () => {
    const verdict = reference({ id: GATE, notes: "ruled DEFER" });
    const witness = { verdict, compiled: clone(compileGated(verdict, gatedPackets())) };
    expect(witness).toStrictEqual({ verdict: "no-verdict", compiled: { created: [], archived: [] } });
    return witness;
  },
  R8: async () => {
    const witness = ["design", "acceptance_criteria", "close_reason"].map(field => reference({ id: GATE, [field]: "ruled ADOPT" }));
    expect(witness).toEqual(["no-verdict", "no-verdict", "no-verdict"]);
    return witness;
  },
  R9: async () => {
    const witness = ownImports();
    expect(witness.filter(specifier => /child_process|worker_threads|node:net/.test(specifier))).toEqual([]);
    return witness;
  },
  R10: async () => {
    const witness = [...new Set(exportRows().map(row => idOf(row).split("-")[0] ?? ""))].sort();
    expect(witness).toEqual(["wb"]);
    return witness;
  },
  R11: async () => quietRow("R11"),
  R12: async () => {
    const receipts = filesBelow(join(REPO, "docs", "workbench", "receipts")).filter(file => file.endsWith(".md"));
    const docsScan = GATED_SCANS.find(scan => scan.root === "docs");
    const witness = {
      proseWalkedByT1: PROGRAM_SCANS.some(scan => ["docs", "new-feedback", "vendor"].includes(scan.root)),
      g1OmitsReceipts: docsScan?.omit.includes("workbench/receipts") === true,
      receiptsReadByG1: docsScan === undefined ? -1 : filesOf(docsScan).filter(file => receipts.includes(file)).length,
      receiptsQuoteTitles: receipts.length > 0 && receipts.every(file => /^# wb-[\w.]+: \S/.test(textOf(file))),
    };
    expect(witness).toStrictEqual({ proseWalkedByT1: false, g1OmitsReceipts: true, receiptsReadByG1: 0, receiptsQuoteTitles: true });
    return witness;
  },
};

describe("wb-4nut.4 H2 bead-graph census (TSX-HARNESS2-REACTIVE-EVOLUTION-R4, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "A:3", "B:5", "C:4", "D:2", "G:1", "P:4", "F:1", "M:18", "R:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
