/**
 * wb-kku9.3 (MW-CAC-WORKFLOW-COMPOSITION-R3, program-triage-2026-10-22), the Beads claim re-check census. Statement (the bead's
 * title): "Pi's bead-machine and any Pi surface acting on a claimed Beads task shall re-read source-native task state (bd show
 * --json readiness through the landed wb-752.6 seam; no gating artifact) at execution time and shall never act on the claim or
 * cached readiness alone, so that a task no longer ready yields a counted refusal or park, never execution." Source: MechanicalWorkflows
 * docs/programs/cac-workflow-composition-2026-10-18/01-composition-contracts.md:13 at 5ce2a07f891f, "5. A Beads claimed task may be
 * no longer ready at execution; source-native task state is checked." - a design-only program ("Design-only as of 2026-10-18
 * (19ca8d4): the two program documents are the only artifacts", its README.md:3 at the pin). Acceptance (owner filing, verbatim; the
 * labels of rows A to C quote it): "(a) hermetic vitest over the bd show fake: a task re-read after the claim as closed, or blocked
 * by an open dependency, makes the execution path refuse with a typed diagnostic and invoke no native verb; (b) static census: no
 * module caches readiness across the claim-to-execute boundary without a fresh bd show read, and the bead-machine generations call
 * bd show (read verb) before executing a claimed seat; (c) mutant: an implementation executing on the stale claim fails (a)." The
 * filing's caveat: "(a) needs a Pi src execution seam that does not exist yet; (b) runs today over the generation scripts." Not
 * P0/P1 (the filing): the live lane re-reads at claim and no false claim exists; a P2 posture pin.
 *
 * MEASURED (read-only, by the cutting seat at trunk caad951; the producer texts ride the roster verbatim with their blob ids): the
 * cited line reads as quoted at the pin (blob 5e6c16c0). Pi's one Beads module, src/workbench/beads-observer.ts (wb-752.6), is a
 * reader whose injected seam offers `show` alone; no file under src/, qa/ or examples/ imports it and no file under the executable
 * roots spells a bd claim (the bd verbs launched there are the VC-4 tier's `bd init` of a disposable store and the .codex hooks'
 * `bd codex-hook`; the reader spells `bd show` only in its comments and messages). Pi has no execution path for
 * a claimed task and no claim-to-execute boundary today. The bead machine that claims this store's tasks is the flywheel work lane,
 * outside this repository; the census carries two verbatim excerpts of its live generation (generations/g10-work.js, blob 21587f9b,
 * the generationBlob its dispatch args name): the claim step (1) of WORK_STEPS (line 102, through the "(2) WORKTREE:" marker that
 * opens the execution steps) and the RESUME clause (line 161). bd 1.1.0-rc.1 claims through `bd update <id> --claim` and
 * `bd ready --claim`; it has no `bd claim` verb.
 *
 * THE RULE, ARMED. No Pi execution path exists, so the rule is armed on a reference (the h2-close-condition shape): EXEC_CASES states
 * each case as the store row a claim step read and the row the execution-time read returns, both served by a fake `bd show` through
 * the landed reader itself (readBeadsWork, the wb-752.6 seam). `honest` re-reads through the seam at execution time, decides on that
 * reading alone, and either runs the native verb once or returns a typed refusal (REFUSAL_CODES, a closed set) that the seat counts;
 * each MUTANTS member relaxes one condition and breaks at least one case of its clause. A Pi module that acts on a claimed task (a
 * claim site B1 flags or a reader importer B3 flags) binds itself in BEAD_EXECUTORS (empty today) and must meet every case (C3).
 * The rows:
 *  A, the execution-time re-read, (a). A1 closed after the claim (with and without a close reason): refused `closed`, no native
 *    verb, one counted refusal. A2 blocked by an open dependency after the claim (a new open blocker, a closed blocker reopened, a
 *    blocker in progress beside a closed one): refused `blocked`, naming the open blockers. A3 the order and the seam: every
 *    execution-time read is one fresh `bd show` at the workspace root, issued after the claim and before any native verb; a task
 *    still ready (in progress, every blocker closed; open related, discovered-from and parent-child entries block nothing), and one
 *    unblocked since the claim, runs the native verb exactly once (the non-vacuity control; the last also separates a path that
 *    decides on the claim from one that reads nothing). A4 no longer ready otherwise: the claim released (open), a blocked, deferred
 *    or unknown status, a cut dependency page, and an unreadable re-read (a nonzero exit, a non-JSON body, another work id, a
 *    throwing seam) each refuse with their typed code.
 *  B, the boundary census, (b). B1 no file under SCAN_ROOTS (every file the walk reaches, symbolic links followed), and no root
 *    manifest (ROOT_MANIFESTS), claims a Beads task (the bd word with a claim verb, or an update to status in progress, within
 *    CLAIM_WINDOW words, read in the file's raw text and, for a code file (CODE_FILE), in the words the TypeScript parser cooks,
 *    for a JSON file in the strings its JSON parser cooks), with floors, anchors and controls; the Beads seam offers show alone,
 *    read two ways:
 *    every declaration of it under IMPORT_ROOTS read by the TypeScript parser - an interface, a class (its instance members and
 *    its extends clause) or a type alias - with spelling, class and selection controls (every code file there is parsed and
 *    judged on the name the parser reads), and the seam as TypeScript merges it, the checker's declared type of the reader's
 *    export in a Program over tsconfig.json (its members, signatures and bases, and every declaration merged into it), with a
 *    control program; a module B1 flags must be bound in BEAD_EXECUTORS and every binding must name one (empty both ways
 *    today). B2 the
 *    reader holds no readiness: its source keeps no module-scope let or var and writes no module-scope container, and two reads of
 *    one id issue two shows whose readings follow their own envelopes and stamps. B3 no file under IMPORT_ROOTS, code or not,
 *    imports the reader (an exact set, empty today: a specifier read in the raw text - a JSON file's also in the strings its parser
 *    cooks - and, in a code file, as its cooked value by the TypeScript parser, and named as Node's loader reads a URL) or spells a
 *    bd readiness read (READ_VERBS) outside it (read as B1 reads a file: raw, and cooked in a code or a JSON file), with matcher
 *    controls (non-code files among them), a floor and an anchor for the non-code files the walk reads (IMPORT_NON_CODE) and
 *    positive floors (the import matcher finds the reader's own import of redaction.ts; the read judge reads the seam's own bd
 *    show). B4 the bead
 *    machine's generation: in the carried claim step, a bd show read and the status requirement precede the claim-lock and the
 *    claim write, a second bd show follows the claim write, all of them precede the first execution step, and no bd close is
 *    spelled.
 *  C, the mutants, (c). C1 STALE-CLAIM (decides on the reading the claim step saw) runs the native verb on every A1 and A2 case and
 *    never re-reads. C2 every other mutant breaks at least one case of its own clause, and honest meets every case. C3 every bound
 *    executor meets every case (none bound; the same check over synthetic bindings is the non-vacuity control).
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set - every row's id, label and
 * pins, every pin's witness (each case's sha256 among them), the constants and every registered test title - is held to the
 * out-of-file roster; rows A to C are held to the bead's own notes in the tracker export (.beads/issues.jsonl) both ways (every
 * label is one of the acceptance clauses the notes state, every stated clause is a row, in order), the pin set and the residual
 * families to the delivery statement in the same notes (its "19 pins A1-A4 B1-B4 C1-C3 Q1-Q8" run and its RESIDUALS list, in order;
 * a later cut that adds a pin or a family restates it outside first), the cited line to the same notes, the cases to the reader's
 * own vocabulary (every status its STATUS_TONES maps and both dependency types it edges are exercised by a case's re-read), and the
 * carried generation texts to their sha256 literals here and to the fragment of the claim step the filing itself quotes. The last
 * case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it) and the set of pins that
 * reached their witness. Not claimed: an edit of this file, the roster and the notes together. An edit of this file and the roster
 * alone reds through the notes when it removes a row, a pin or a residual family (the X-PIN and X-Q hollows of the wb-kku9.3 gate,
 * F8), and through the reader's vocabulary when it removes the only case of a status or edged type the reader maps; any other case,
 * a control or a constant's member removed from both stays green (no source outside this cut holds those).
 * RESIDUALS (named, each with its pinned quiet row): R-RESUME the generation's RESUME clause skips the claim step and spells neither a
 * bd show read nor a status requirement, so a resumed seat continues on the dispatch-time claim (Q1; a finding about the flywheel
 * generation, outside this repository, not cured here); R-ASSIGNEE the reader retains no assignee, so a task whose claim passed to
 * another holder reads in progress and runs (Q2); R-WINDOW the re-read and the native verb are two steps, so a close landing between
 * them is not seen (Q3); R-COMPOSED a bd word assembled at runtime or held in a named constant spawned past the window, a claim flag
 * held in a variable or a claim verb more than CLAIM_WINDOW words after the bd word escapes B1, and an import specifier composed,
 * selected or held at runtime (a template substitution, a concatenation, a conditional, a named constant), or one passed to the
 * require createRequire returns (called on the spot or through a binding not named require), escapes B3, as does a module loaded
 * through any other API (require reached through call, apply or bind, a Worker over the reader's URL, a package imports-map or
 * exports-map alias, a self-reference among them); and
 * a bd word spelled through the quoting or escapes of a file B1 reads raw only, neither code nor JSON (a shell script's adjacent
 * quotes or backslash, a YAML or TOML string escape), escapes B1, as a bd word, a read verb or an import specifier spelled through
 * them escapes B3, which reads such a file raw only as well (wb-38nd F2; a JavaScript escape inside a shell script's node eval
 * among them) (Q4); R-INSTRUCTION AGENTS.md, .agents/skills/beads/SKILL.md and
 * .beads/README.md teach a generic bd claim for this repository's own store in their rendered text (as marked renders them and
 * visibleTextOf reads the HTML): instruction text outside B1's executable roots; the reading models presentation only through
 * CSS (a page carrying any reads as showing nothing), so a presentational colour attribute that may match the page reads as
 * shown; and an end tag the tree builder ignores or applies to another element than the reading does ends a hiding element
 * here, so the text after it reads as shown where a browser hides it (wb-38nd; among them an end tag whose element is out of
 * scope past a button, a list or a table cell, one of another name that meets a special element opened inside its element, a
 * formatting element's end tag past a marker element or across a block - the adoption agency's furthest block - and a form end
 * tag, which removes the form alone) (Q5); R-CONTROLLER the
 * VC-4 tier's launcher starts a Furnace Run whose Work is claimed and executed by Furnace's authority in a disposable store, and B1
 * reads the launcher as no claim site (Q6); R-ALIAS B2's static scan reads a write spelled on the module-scope name, so a write
 * through an alias escapes it (the two-read case still sees a cache that changes a reading) (Q7); R-REMEASURE the generation is
 * carried at its blob and never read live: a generation change is seen only when the roster is re-measured (Q8).
 * SCOPE: the readiness `honest` requires is judged on the reader's own fields (status, dependency statuses and types, completeness);
 * an execution path may be stricter, never looser - but C3 binds only an executor that meets honest's outcome on every case, so a
 * stricter executor needs C3 widened before it can bind (the wb-kku9.3 gate's F5, disclosed; none is bound today). A3 to A4 and B2
 * to B3 go past the acceptance's literal cases to the statement's "never act on the claim or cached readiness alone". B1 reads no
 * grammar: prose naming the bd word and a claim word within the window reds it (OVER-READ, disclosed: no executable root spells one
 * today). B3's read judge reads no grammar either: a comment or a message naming the bd word and a read verb within the window reds
 * it (OVER-READ, disclosed by the gate's F7 and pinned by B3's last flagged read control; the reader's own messages are its floor).
 * Neither B3 judge reads grammar in a file it reads raw only (wb-38nd F2): a script or a document spelling an import form of the
 * reader, or naming the bd word and a read verb within the window, reds B3 (OVER-READ, disclosed and pinned by B3's non-code
 * controls; no such file exists today).
 * B1's seam reader resolves no module either: it reads every SEAM_INTERFACE declaration a code file under IMPORT_ROOTS spells,
 * merged or not, so a same-named interface or type alias TypeScript never merges into the reader's seam (a module-local declaration
 * in another module) reds B1 too (OVER-READ, disclosed by the wb-xogu gate's F5 and pinned by B1's unmergedLocal selection control;
 * no such declaration exists today). B4 reads the carried text by command (a `;`-separated segment), so a flag in a later command
 * is never attributed to an earlier bd word. The merged seam is pinned with its declarations, so an augmentation merging into the
 * seam reds B1 even when it adds no member beyond show (disclosed; none exists today). B3's specifier reading drops a query or
 * fragment and decodes a percent-encoding as Node's ESM loader does; a require path does neither, so a require specifier carrying
 * one reads as the reader too (OVER-READ, disclosed; no such specifier exists today). visibleTextOf reads tokens, a stack of open
 * elements and the tree builder's list of active formatting elements (wb-38nd F1), not the rest of the tree builder's recovery,
 * and departs from a browser in both directions. These hide more than a browser may, in Q5's direction (a page that still teaches
 * a claim reads as teaching none): an element the parser closes early (a hidden p before a block start tag) hides to its
 * matching end tag; a closed details element hides its summary with its body; a select, an object, a media or canvas element,
 * svg and math content and a bdo show nothing; a page carrying a script (an element or an event-handler attribute), CSS (a style
 * element or attribute, a stylesheet link), a meta refresh, a hidden html or body start tag or a bidi override shows nothing at
 * all; and the list keeps no marker (a table cell's or a caption's, an applet's, a marquee's, an object's or a template's), never
 * ends an open a or nobr at a second one's start tag, and re-opens a waiting element before text (a textarea's body excepted, as
 * in the tree builder) and before a formatting element's start tag only, so a hiding formatting element is re-opened inside a
 * table cell or a caption, outlives a marquee it was opened in, stays open around a second a or nobr, and its end tag inside an
 * element opened while it waited leaves that element open (pinned by Q5's impliedEnd, closedSummary and reconstructionOverHide
 * rows). These show what a browser may hide, against Q5's direction: an end tag the tree
 * builder ignores or applies to another element than the reading does ends a hiding element here (R-INSTRUCTION names the
 * family; its pinned quiet rows are Q5's endTagRecovery). None of them is in the instruction files today; a tag still separates
 * words (wb-dugi's reading).
 *
 * wb-xogu (the R694 follow-up the wb-kku9.3 gate routed at landing 340: F1 leads, F2-F7 ride, F8 shared). F1 the seam is read by
 * the TypeScript parser, so the gate's G16a optional method, G16b readonly optional property and G16d generic method red B1 beside
 * the plain G16c, as do an accessor, a quoted name, a same-line member, a member after a nested brace, a merged or augmenting
 * declaration, an index signature, an extends clause and an alias of another type (B1's spelling controls). F2 B1 also reads the
 * root manifests (npm scripts, Forge step commands, every root config module) and the Beads git hooks. F3 a bd word held in a named
 * constant joins R-COMPOSED (Q4), beside an import specifier composed at runtime. F4 importsOf reads a template-literal specifier.
 * F5 and F7 are disclosed in SCOPE. F6 Q5 judges the instruction files on their rendered text (HTML comments dropped), with a
 * control. F8 the pin set and the residual families are held to the delivery statement in the notes (FROZEN SHAPE).
 *
 * wb-dugi (the R694 follow-up the wb-xogu gate routed at landing 435: F1 leads, F2-F5 ride). F1 the seam reader parses every code
 * file under IMPORT_ROOTS and judges the name the parser reads, with no raw-text prefilter, so an interface whose name is spelled
 * through a unicode escape (the gate's P3: an augmenting `declare module` that never spells the name plainly) reds B1 (selection
 * controls). F2 importsOf reads a specifier past comments, inside parentheses and before a second argument (the gate's P11 and
 * P11b; import controls); a specifier selected or held at runtime, or passed to the require createRequire returns, joins
 * R-COMPOSED (Q4). F3 and F4 Q5 reads the instruction files as marked renders them (renderedOf): code renders literally, so an HTML
 * comment inside a fence hides nothing (P13), while a link reference definition renders nothing (P12); rendering controls. F5 is
 * disclosed in SCOPE.
 *
 * wb-dcsb (the R694 follow-up the wb-dugi gate routed at landing 531: F1 leads, F2-F4 ride). F1 the seam reader reads a class
 * declaration of the seam's name (its instance members, parameter properties among them, and its extends clause; a static member
 * joins the constructor and reads as nothing; class controls), the walk follows symbolic links (filesBelow; a link control over
 * node_modules/.bin), and B1 also judges the seam as TypeScript merges it, in a Program over tsconfig.json with a control program
 * of virtual files: the gate's G8 linked augmentation and G9 merged class red B1. F2 the import matcher also reads every specifier
 * the TypeScript parser reads (every import and export declaration, import-equals require, import type, import() and require
 * call, triple-slash reference and AMD dependency), as its cooked value, a require call read through parentheses, a comma, an
 * optional call or a member named require (the gate's G1-G4 escapes and continuation; parser controls); the same cooked reading
 * widens B1's claim judge and
 * B3's read judge over code files, and B1's over JSON strings, comments tolerated (cooked controls); a .tsx and a .jsx file, and
 * an extension in any case, are code files (code-file controls). F3 a line comment ends at any line terminator
 * (G6, G7) and a specifier is named as Node's loader reads a URL: a query or fragment dropped (G5), a percent-encoding decoded.
 * F4 renderedOf reads marked's HTML through visibleTextOf: a quoted attribute value holds a '>' (G11); an element carrying the
 * hidden (G10) or popover attribute, a dialog or details element that is not open, and the HIDING_ELEMENTS hide their content; a
 * page carrying a script (G12, closed or not), CSS, a meta refresh, a hidden root or a bidi override shows nothing (rendering
 * controls, Q5). The forms the readings still leave are named in their families with pinned quiet rows: R-COMPOSED gains the
 * indirect loaders and the quoting and escapes of files read raw only (Q4), R-INSTRUCTION the presentational colour (Q5).
 *
 * wb-38nd (the R694 follow-up the wb-dcsb gate routed at landing 611: F1 leads, F2 rides). F1 visibleTextOf keeps the tree
 * builder's list of active formatting elements (FORMATTING_ELEMENTS): one an enclosing element's end tag closes is re-opened, its
 * attributes with it, before the next text (a textarea's body excepted, which the tree builder inserts without re-opening) and
 * before a formatting element's start tag, until the end tag of its own name removes it, so the gate's L3 plant (a b carrying
 * hidden, left open across a paragraph's end tag) hides the claim after it, as a browser does, for each of the fourteen; its
 * paired L3c control (a span, not a formatting element) still reads shown (reconstruction controls, Q5). SCOPE names the
 * departures the reading still leaves by direction: the over-hides with pinned rows, and the end-tag recovery a browser applies
 * and the reading does not, which joins R-INSTRUCTION with pinned quiet rows (Q5). F2 B3's import and read judges read every file
 * under IMPORT_ROOTS - a file neither code nor JSON in its raw text, a JSON file also in its cooked strings - so the gate's L1 (a
 * shell script spelling bd ready) and L2 (a shell script whose node eval imports the reader) red B3 (non-code controls; the
 * walk's non-code floor and anchor, IMPORT_NON_CODE); such a file's own quoting and escapes join R-COMPOSED (Q4).
 *
 * Display paths added: none. Test-only: src, qa, examples, the root manifests, the instruction files, .beads, tsconfig.json with
 * the files its program reads, and the node_modules/.bin link the walk's control reads are only read; nothing is written (the
 * merged seam's control files are served from memory) and no scratch is allocated.
 */
import { createHash } from "node:crypto";
import { type Dirent, lstatSync, readdirSync, readFileSync, realpathSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import * as beadsObserver from "../src/workbench/beads-observer.js";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import type { ObservationScope } from "../src/workbench/observation.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "beads-claim-recheck-roster.json");
const BEAD = "wb-kku9.3";
/** MechanicalWorkflows at the program-triage pin (the bead's citation). */
const PROGRAM_PIN = "5ce2a07f891f5b165125d26739ec79720c295dd1";
/** The cited line, verbatim at the pin. */
const PROGRAM_LINE = "5. A Beads claimed task may be no longer ready at execution; source-native task state is checked.";
/** The carried generation texts' sha256: the roster carries the texts, so a swap on either side reds the judged set. */
const GENERATION_DIGESTS = {
  claimStep: "797750486c268e7884a6d5ed45a78ed4423153e2d9bad2ae859c2911b85b319d",
  resume: "0e7b0f0049893e2ba1a3530a297144dfdd54a60aa77d7d0cda0998b42dd4d7aa",
} as const;
/** The fragment of the claim step the filing itself quotes (the bead's note): the carried text must contain it. */
const FILED_GENERATION_FACT = "show <bead> --json and REQUIRE status open";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A to C, to the bead's acceptance text. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) hermetic vitest over the bd show fake: a task re-read after the claim as closed, or blocked by an open dependency, makes the execution path refuse with a typed diagnostic and invoke no native verb",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) static census: no module caches readiness across the claim-to-execute boundary without a fresh bd show read, and the bead-machine generations call bd show (read verb) before executing a claimed seat",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) mutant: an implementation executing on the stale claim fails (a)",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "Q",
    label: "residuals: each named family with its pinned quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
  },
];

/** The typed diagnostic an execution path returns instead of running a native verb: a closed set of codes. */
const REFUSAL_CODES = ["closed", "blocked", "status", "partial", "unreadable"] as const;
type RefusalCode = (typeof REFUSAL_CODES)[number];
/** B1's window: a claim verb counts when it follows the bd word within this many words. */
const CLAIM_WINDOW = 8;
interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The executable surfaces B1 reads (the h2-close-condition roots); each floor sits below the count measured at trunk caad951 (src
 * 115, qa 67, examples 7, .pi 1, .codex 2, .github 2 files) and, for the Beads git hooks wb-xogu adds (F2), at trunk 3a71372 (5
 * files). Each anchor is read and quiet; the src, qa, .codex and .beads/hooks anchors spell the bd word itself. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "src/workbench/beads-observer.ts", anchorToken: "bd show" },
  { root: "qa", floor: 50, anchorFile: "qa/workbench/live-furnace-vc4-launch.mjs", anchorToken: "spawnSync('bd', ['init'" },
  { root: "examples", floor: 5, anchorFile: "examples/workflows/gated-fix.js", anchorToken: "gate" },
  { root: ".pi", floor: 1, anchorFile: ".pi/agents/auditor.md", anchorToken: "max_turns" },
  { root: ".codex", floor: 2, anchorFile: ".codex/hooks.json", anchorToken: "bd codex-hook" },
  { root: ".github", floor: 2, anchorFile: ".github/workflows/ci.yml", anchorToken: "setup-node" },
  { root: ".beads/hooks", floor: 4, anchorFile: ".beads/hooks/pre-commit", anchorToken: "bd hooks run" },
];
/** The repository-root files B1 reads beside SCAN_ROOTS (wb-xogu F2): the npm manifest (its scripts), Forge's manifest (its step
 * commands) and every root config module a tool loads, matched by name; the floor sits below the 15 files measured at trunk 3a71372
 * (the two manifests and 13 vitest configs), and each anchor is read and quiet. */
const ROOT_MANIFESTS = {
  pattern: "^(?:package\\.json|forge\\.toml|[\\w.-]+\\.config\\.[cm]?[jt]s)$",
  floor: 12,
  anchors: [
    { file: "package.json", token: '"scripts"' },
    { file: "forge.toml", token: "[build.commands]" },
  ],
} as const;
/** The Beads seam's interface name: every declaration of it is read (seamMembersOf). */
const SEAM_INTERFACE = "BeadsReadClient";
/** The code roots B3 reads for an importer of the reader and for a bd readiness read outside it. */
const IMPORT_ROOTS: readonly string[] = ["src", "qa", "examples"];
/** The non-code files B3's walk reads under IMPORT_ROOTS (wb-38nd F2): a floor below the 6 measured at trunk 27c968d (one examples
 * Markdown page, four qa shell scripts and one qa JSON receipt) and an anchor, read and quiet under both judges. */
const IMPORT_NON_CODE = { floor: 4, anchorFile: "qa/workbench/smoke.sh", anchorToken: "node qa/workbench/smoke.mjs" } as const;
const READER_MODULE = "src/workbench/beads-observer.ts";
/** The instruction documents that teach a generic claim for this repository's own store (R-INSTRUCTION). */
const INSTRUCTION_FILES: readonly string[] = ["AGENTS.md", ".agents/skills/beads/SKILL.md", ".beads/README.md"];
/** The VC-4 tier's launcher: it starts a Furnace Run in a disposable store (R-CONTROLLER). */
const VC4_LAUNCHER = "qa/workbench/live-furnace-vc4-launch.mjs";
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-RESUME": ["Q1"],
  "R-ASSIGNEE": ["Q2"],
  "R-WINDOW": ["Q3"],
  "R-COMPOSED": ["Q4"],
  "R-INSTRUCTION": ["Q5"],
  "R-CONTROLLER": ["Q6"],
  "R-ALIAS": ["Q7"],
  "R-REMEASURE": ["Q8"],
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
interface CarriedText {
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
interface Roster {
  readonly bead: string;
  readonly programPin: string;
  readonly program: { readonly citation: string; readonly blob: string; readonly line: number; readonly text: string };
  readonly generation: { readonly path: string; readonly blob: string; readonly claimStep: CarriedText; readonly resume: CarriedText };
  readonly constants: { [key: string]: JsonValue };
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function textOfField(value: { [key: string]: unknown }, field: string, where: string): string {
  const found = value[field];
  if (typeof found !== "string") throw new Error(`${where}.${field} must be a string`);
  return found;
}
function lineOfField(value: { [key: string]: unknown }, where: string): number {
  const found = value.line;
  if (typeof found !== "number" || !Number.isSafeInteger(found)) throw new Error(`${where}.line must be an integer`);
  return found;
}
function carried(value: unknown, where: string): CarriedText {
  const record = objectOf(value, where);
  return { line: lineOfField(record, where), text: textOfField(record, "text", where), sha256: textOfField(record, "sha256", where) };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(ROSTER_PATH, "utf8")), "roster");
  if (!Array.isArray(raw.rows) || !Array.isArray(raw.tests) || !raw.tests.every(item => typeof item === "string")) {
    throw new Error("roster needs a rows list and a tests list");
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
  const producer = objectOf(raw.producer, "roster producer");
  const program = objectOf(producer.program, "roster producer.program");
  const generation = objectOf(producer.generation, "roster producer.generation");
  return {
    bead: textOfField(raw, "bead", "roster"),
    programPin: textOfField(raw, "programPin", "roster"),
    program: {
      citation: textOfField(program, "citation", "producer.program"),
      blob: textOfField(program, "blob", "producer.program"),
      line: lineOfField(program, "producer.program"),
      text: textOfField(program, "text", "producer.program"),
    },
    generation: {
      path: textOfField(generation, "path", "producer.generation"),
      blob: textOfField(generation, "blob", "producer.generation"),
      claimStep: carried(generation.claimStep, "producer.generation.claimStep"),
      resume: carried(generation.resume, "producer.generation.resume"),
    },
    constants: objectOf(json(raw.constants), "roster constants") as { [key: string]: JsonValue },
    tests: raw.tests as string[],
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
const byName = (left: Dirent, right: Dirent): number => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
/** What a symbolic link resolves to: a directory, a file, or nothing readable (a dangling link, a special file). */
function linkedKind(path: string): "directory" | "file" | "other" {
  try {
    const target = statSync(path);
    return target.isDirectory() ? "directory" : target.isFile() ? "file" : "other";
  } catch {
    return "other";
  }
}
/** Every file below a root as TypeScript's include walk and Node's loader reach it (wb-dcsb F1): a regular file, a symbolic link
 * to a file (listed under the link's own path, so its name decides whether it is a code file, and read through to its target)
 * and the files below a linked directory (a directory whose real path is already open on the walk is not entered again, so a
 * link cycle ends); a dangling link, a special file and a path that vanishes mid-walk hold nothing. */
function filesBelow(directory: string, open: readonly string[] = []): string[] {
  let entries: Dirent[];
  let real: string;
  try {
    real = realpathSync(directory);
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  if (open.includes(real)) return [];
  const files: string[] = [];
  for (const entry of entries.sort(byName)) {
    const path = join(directory, entry.name);
    const kind = entry.isSymbolicLink() ? linkedKind(path) : entry.isDirectory() ? "directory" : entry.isFile() ? "file" : "other";
    if (kind === "directory") files.push(...filesBelow(path, [...open, real]));
    else if (kind === "file") files.push(path);
  }
  return files;
}
/** The words a text spells, folded (lowercased; "_", "-" and "$" dropped, so flags, snake, kebab and camel forms agree). */
function wordsOf(text: string): string[] {
  return (text.match(/[A-Za-z0-9_$-]+/g) ?? []).map(word => word.toLowerCase().replace(/[_$-]/g, "")).filter(word => word.length > 0);
}
/** B1's judge: each bd word followed within CLAIM_WINDOW words by a claim verb, or by an update whose status flag names
 * in_progress, with the window it read. */
function claimLaunchesIn(text: string): string[] {
  const words = wordsOf(text);
  const found: string[] = [];
  words.forEach((word, index) => {
    if (word !== "bd") return;
    const window = words.slice(index + 1, index + 1 + CLAIM_WINDOW);
    const statusClaim = window.includes("update") && window.some((item, at) => (item === "status" || item === "s") && window[at + 1] === "inprogress");
    if (window.includes("claim") || statusClaim) found.push(["bd", ...window].join(" "));
  });
  return found;
}
/** The script kind a code file is parsed as: TSX or JSX for a .tsx or .jsx file, JavaScript for a .js, .mjs or .cjs file,
 * TypeScript otherwise (any case). */
function scriptKindOf(file: string): ts.ScriptKind {
  if (/\.tsx$/i.test(file)) return ts.ScriptKind.TSX;
  if (/\.jsx$/i.test(file)) return ts.ScriptKind.JSX;
  return /\.[cm]?js$/i.test(file) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}
/** The code texts the cooked and parser readings have parsed, by script kind and text (a parse depends on nothing else), so each
 * is parsed once per run. */
const PARSED_CODE = new Map<string, ts.SourceFile>();
function parsedCode(text: string, file: string): ts.SourceFile {
  const kind = scriptKindOf(file);
  const key = `${kind}\n${text}`;
  const cached = PARSED_CODE.get(key);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  PARSED_CODE.set(key, source);
  return source;
}
/** A code text's words as the language cooks them (wb-dcsb, the F2 class at B1 and at B3's read judge): the TypeScript parser's
 * identifiers and literals in source order, each as its cooked value - a string, template or identifier escape decoded, a line
 * continuation removed. Comments are not among them; the raw reading holds those. */
function cookedOf(text: string, file: string): string {
  const source = parsedCode(text, file);
  const words: string[] = [];
  const visit = (node: ts.Node): void => {
    if (
      ts.isIdentifier(node) ||
      ts.isPrivateIdentifier(node) ||
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateHead(node) ||
      ts.isTemplateMiddle(node) ||
      ts.isTemplateTail(node) ||
      ts.isNumericLiteral(node) ||
      ts.isBigIntLiteral(node) ||
      ts.isRegularExpressionLiteral(node) ||
      ts.isJsxText(node)
    ) {
      words.push(node.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return words.join(" ");
}
/** A JSON file's strings (every key and value, in document order) as the TypeScript JSON parser cooks them - an escape decoded,
 * comments and a trailing comma tolerated, as a JSONC reader reads them. */
function cookedJsonOf(text: string, file: string): string {
  const strings: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node)) strings.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(ts.parseJsonText(file, text));
  return strings.join(" ");
}
/** The readings a file judge takes of one file (wb-dcsb): its raw text; beside it, for a code file the words the TypeScript parser
 * cooks and for a JSON file the strings the TypeScript JSON parser cooks. Any other file is read raw only (its own quoting and
 * escapes are R-COMPOSED, Q4). */
function readingsOf(text: string, file: string): string[] {
  if (CODE_FILE.test(file)) return [text, cookedOf(text, file)];
  if (/\.json$/i.test(file)) return [text, cookedJsonOf(text, file)];
  return [text];
}
/** B1's file judge: the claim launches every reading of a file holds, each once. */
const claimsIn = (text: string, file: string): string[] => [...new Set(readingsOf(text, file).flatMap(reading => claimLaunchesIn(reading)))];
/** B3's read judge over a file: the bd readiness reads every reading of it holds, each once. */
const readsIn = (text: string, file: string): string[] => [...new Set(readingsOf(text, file).flatMap(reading => bdReadsIn(reading)))];
/** The bd verbs that read readiness: B3's second judge flags any of them within CLAIM_WINDOW words after the bd word. */
const READ_VERBS: readonly string[] = ["show", "ready", "list", "blocked", "query", "search", "export"];
function bdReadsIn(text: string): string[] {
  const words = wordsOf(text);
  const found: string[] = [];
  words.forEach((word, index) => {
    if (word !== "bd") return;
    const window = words.slice(index + 1, index + 1 + CLAIM_WINDOW);
    if (window.some(item => READ_VERBS.includes(item))) found.push(["bd", ...window].join(" "));
  });
  return found;
}
/** Words joined at runtime, so a composed control never sits on one source line. */
function compose(...words: string[]): string {
  return words.join(" ");
}
/** The name a seam member reads as: its spelled name (an identifier, a quoted or numeric name, a private or a computed one, as
 * written), or the kind of a member that carries none (a call, construct or index signature), so no member reads as absent. */
function memberName(member: ts.TypeElement, source: ts.SourceFile): string {
  if (ts.isCallSignatureDeclaration(member)) return "(call signature)";
  if (ts.isConstructSignatureDeclaration(member)) return "(construct signature)";
  if (ts.isIndexSignatureDeclaration(member)) return "(index signature)";
  const name = member.name;
  if (name === undefined) return "(unnamed member)";
  return ts.isComputedPropertyName(name) ? name.getText(source) : name.text;
}
/** The names a class element adds to the instance type a class merges into the seam (wb-dcsb F1): a method, property or accessor
 * by name, an index signature by its kind, a constructor by its parameter properties; a static member (it joins the constructor,
 * not the seam), a static block and a stray semicolon add none. */
function classMemberNames(member: ts.ClassElement, source: ts.SourceFile): string[] {
  if (ts.isConstructorDeclaration(member)) {
    return member.parameters
      .filter((parameter): parameter is ts.ParameterPropertyDeclaration => ts.isParameterPropertyDeclaration(parameter, member))
      .map(parameter => parameter.name.text);
  }
  if (ts.isClassStaticBlockDeclaration(member) || ts.isSemicolonClassElement(member)) return [];
  if ((ts.getCombinedModifierFlags(member) & ts.ModifierFlags.Static) !== 0) return [];
  if (ts.isIndexSignatureDeclaration(member)) return ["(index signature)"];
  const name = member.name;
  if (name === undefined) return ["(unnamed member)"];
  return [ts.isComputedPropertyName(name) ? name.getText(source) : name.text];
}
/** The members of the Beads seam a module text declares, read by the TypeScript parser over every SEAM_INTERFACE declaration in it -
 * an interface (exported, merged, nested or inside an augmenting `declare module`), a class (wb-dcsb F1: its instance members and
 * its extends clause, the members TypeScript merges into an interface of the same name) or a type alias - so an optional,
 * readonly, generic, accessor, quoted or same-line member, or one after a nested brace, reads by name (wb-xogu F1); an extends
 * clause and an alias of another type read as members of their own, so neither passes as show alone. */
function seamMembersOf(text: string, file = "seam.ts"): string[] {
  const kind = /\.tsx$/i.test(file) ? ts.ScriptKind.TSX : /\.jsx$/i.test(file) ? ts.ScriptKind.JSX : ts.ScriptKind.TS;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, kind);
  const members: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === SEAM_INTERFACE) {
      for (const clause of node.heritageClauses ?? []) for (const type of clause.types) members.push(`extends ${type.getText(source)}`);
      for (const member of node.members) members.push(memberName(member, source));
    } else if (ts.isClassDeclaration(node) && node.name?.text === SEAM_INTERFACE) {
      for (const clause of node.heritageClauses ?? []) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) for (const type of clause.types) members.push(`extends ${type.getText(source)}`);
      }
      for (const member of node.members) members.push(...classMemberNames(member, source));
    } else if (ts.isTypeAliasDeclaration(node) && node.name.text === SEAM_INTERFACE) {
      if (ts.isTypeLiteralNode(node.type)) for (const member of node.type.members) members.push(memberName(member, source));
      else members.push(`type ${node.type.getText(source)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return members.sort();
}

interface ModuleState {
  readonly lets: readonly string[];
  readonly containers: readonly string[];
  readonly writes: readonly string[];
}
/** B2's static judge over one module's text: module-scope let/var bindings, module-scope containers (a const initialised with a
 * Map, Set, WeakMap, WeakSet, Array, array literal or object literal), and every write spelled on a container's own name. */
function moduleState(text: string): ModuleState {
  const lets = [...text.matchAll(/^(?:export\s+)?(?:let|var)\s+([A-Za-z_$][\w$]*)/gm)].map(match => match[1] ?? "");
  const containers = [
    ...text.matchAll(/^(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*(?::[^=\n]*)?=\s*(?:new\s+(?:Map|Set|WeakMap|WeakSet|Array)\b|\[|\{)/gm),
  ].map(match => match[1] ?? "");
  const writes = containers.flatMap(name =>
    [
      ...text.matchAll(
        new RegExp(`\\b${name}\\s*(?:\\.(?:set|add|delete|clear|push|pop|shift|unshift|splice|sort|reverse|fill|copyWithin)\\s*\\(|\\[[^\\]]*\\]\\s*=(?!=)|\\.[A-Za-z_$][\\w$]*\\s*=(?!=))`, "g"),
      ),
    ].map(match => `${name}: ${match[0]}`),
  );
  return { lets, containers, writes };
}

/** What the raw import forms read past between the parts of an import form (wb-dugi F2): whitespace, a block comment (to its first
 * closing delimiter, so a comment never runs on into the code after it) and a line comment (through the first line terminator
 * JavaScript ends one at - a line feed, a carriage return, a line or a paragraph separator, wb-dcsb F3). */
const IMPORT_GAP = "(?:\\s|/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/|//[^\\n\\r\\u2028\\u2029]*(?:[\\n\\r\\u2028\\u2029]|$))*";
/** A call's opening parenthesis, then any parentheses wrapped around its argument, each past a gap. */
const CALL_OPEN = `\\(${IMPORT_GAP}(?:\\(${IMPORT_GAP})*`;
/** A quoted or template-literal specifier, then the end of the argument: the call's closing parenthesis or a second argument. */
const CALL_SPECIFIER = `["'\`]([^"'\`]+)["'\`]${IMPORT_GAP}[,)]`;
const IMPORT_FORMS = new RegExp(
  `\\b(?:from|import)${IMPORT_GAP}["']([^"']+)["']|\\brequire${IMPORT_GAP}${CALL_OPEN}${CALL_SPECIFIER}|\\bimport${IMPORT_GAP}${CALL_OPEN}${CALL_SPECIFIER}`,
  "g",
);
/** The expression an argument or a callee evaluates to past parentheses and the comma operator (its last operand). */
function unwrapped(node: ts.Expression): ts.Expression {
  let current = node;
  for (;;) {
    if (ts.isParenthesizedExpression(current)) current = current.expression;
    else if (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.CommaToken) current = current.right;
    else return current;
  }
}
/** True when a call's callee loads a module (wb-dcsb F2): the import keyword, the identifier require (its name as the parser cooks
 * it), or a member named require - a property access or a string-keyed element access - each past parentheses and commas. */
function loadsModule(callee: ts.Expression): boolean {
  const target = unwrapped(callee);
  if (target.kind === ts.SyntaxKind.ImportKeyword) return true;
  if (ts.isIdentifier(target)) return target.text === "require";
  if (ts.isPropertyAccessExpression(target)) return target.name.text === "require";
  if (!ts.isElementAccessExpression(target)) return false;
  const key = unwrapped(target.argumentExpression);
  return (ts.isStringLiteral(key) || ts.isNoSubstitutionTemplateLiteral(key)) && key.text === "require";
}
/** The specifiers the TypeScript parser reads in a code text (wb-dcsb F2 and F3): an import or export declaration's, an import-equals
 * require's, an import type's, and an import() or require call's first argument (past parentheses and commas; an optional call
 * too), each the cooked value of a string or no-substitution template literal - so a specifier spelled through a unicode, hex or
 * octal escape or a line continuation, a require spelled through an identifier escape, and a comment ended by any line
 * terminator read as Node reads them - and the path of every triple-slash reference (path or types) and AMD dependency the
 * parser records. */
function parsedImportsOf(text: string, file: string): string[] {
  const source = parsedCode(text, file);
  const found: string[] = [];
  const read = (node: ts.Expression | undefined): void => {
    const literal = node === undefined ? undefined : unwrapped(node);
    if (literal !== undefined && (ts.isStringLiteral(literal) || ts.isNoSubstitutionTemplateLiteral(literal))) found.push(literal.text);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) read(node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) read(node.moduleReference.expression);
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) found.push(node.argument.literal.text);
    else if (ts.isCallExpression(node) && loadsModule(node.expression)) read(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  for (const directive of [...source.referencedFiles, ...source.typeReferenceDirectives]) found.push(directive.fileName);
  for (const dependency of source.amdDependencies) found.push(dependency.path);
  return found;
}
/** The import specifiers a code text names, each once: the raw-text forms (static, re-export, require and dynamic; the require and
 * dynamic forms read a quoted or a template-literal specifier, wb-xogu F4; every form reads past comments, and the call forms
 * through parentheses around the specifier and before a second argument, wb-dugi F2) beside the parser's reading (wb-dcsb F2 and
 * F3, parsedImportsOf), so a form only the raw text holds (an import inside a JSDoc comment) is still read - a specifier composed,
 * selected or held at runtime, or loaded by any other API, names no module (R-COMPOSED, Q4). */
function importsOf(text: string, file = "module.ts"): string[] {
  return [...new Set([...rawImportsOf(text), ...parsedImportsOf(text, file)])];
}
/** The specifiers a text's raw import forms name (IMPORT_FORMS), in order. */
function rawImportsOf(text: string): string[] {
  return [...text.matchAll(IMPORT_FORMS)].map(match => match[1] ?? match[2] ?? match[3] ?? "");
}
/** A code file: a .ts, .mts, .cts, .tsx, .js, .mjs, .cjs or .jsx name, in any case (a declaration file among them). */
const CODE_FILE = /\.(?:[cm]?[jt]s|[jt]sx)$/i;
/** True when a specifier names the module whose file stem is `stem`, with or without an extension: as spelled, and as Node's loader
 * reads a URL specifier (wb-dcsb F3) - a query or fragment suffix dropped, then a percent-encoded character decoded (a require path
 * does neither, so reading them there is an over-read, disclosed in SCOPE). */
function namesModule(specifier: string, stem: string): boolean {
  const path = specifier.replace(/[?#][\s\S]*$/, "");
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    decoded = path;
  }
  const names = new RegExp(`(?:^|/)${stem}(?:\\.[cm]?[jt]s)?$`);
  return [specifier, path, decoded].some(candidate => names.test(candidate));
}
/** The Beads seam members a set of module texts declares: every text is parsed and judged by seamMembersOf on the name the
 * parser reads, with no raw-text prefilter, so an interface whose name is spelled through a unicode escape is read (wb-dugi F1).
 * Read merged or not: the reader's own declaration, an augmenting `declare module`, and a same-named declaration TypeScript never
 * merges into the reader's seam (the OVER-READ SCOPE discloses, wb-dugi F5). */
function seamMembersIn(texts: readonly string[]): string[] {
  return texts.flatMap(text => seamMembersOf(text)).sort();
}
/** Every Beads seam member declared under IMPORT_ROOTS: seamMembersOf over every code file there (a .tsx or .jsx file parsed as TSX
 * or JSX, wb-dcsb). */
const seamMembers = (): string[] =>
  IMPORT_ROOTS.flatMap(root => filesBelow(join(REPO, root)))
    .filter(file => CODE_FILE.test(file))
    .flatMap(file => seamMembersOf(textOf(file), file))
    .sort();
/** A file B3's judges read: its repository-relative path and its text. */
interface JudgedFile {
  readonly path: string;
  readonly text: string;
}
/** Every file below the roots as the walk reaches it (filesBelow), by repository-relative path, with its text. */
function judgedFilesBelow(roots: readonly string[]): JudgedFile[] {
  return roots.flatMap(root => filesBelow(join(REPO, root))).map(file => ({ path: relative(REPO, file), text: textOf(file) }));
}
/** The import specifiers a file names, as B3's import judge reads them (wb-38nd F2): a code file's as importsOf reads them (raw and
 * parsed); a JSON file's through the raw import forms over its text and over the strings its JSON parser cooks; any other file's
 * through the raw import forms over its text (its own quoting and escapes are R-COMPOSED, Q4). */
function fileImportsOf(text: string, file: string): string[] {
  if (CODE_FILE.test(file)) return importsOf(text, file);
  const readings = /\.json$/i.test(file) ? [text, cookedJsonOf(text, file)] : [text];
  return [...new Set(readings.flatMap(reading => rawImportsOf(reading)))];
}
/** B3's import judge over a set of files, code or not (wb-38nd F2): the paths of those naming the module whose file stem is `stem`
 * (the reader itself excepted when the stem is its own). */
function importersIn(files: readonly JudgedFile[], stem: string): string[] {
  return files
    .filter(file => file.path !== READER_MODULE || stem !== "beads-observer")
    .filter(file => fileImportsOf(file.text, file.path).some(specifier => namesModule(specifier, stem)))
    .map(file => file.path);
}
/** B3's import judge over every file below the roots. */
function importersOf(stem: string, roots: readonly string[]): string[] {
  return importersIn(judgedFilesBelow(roots), stem);
}
/** B3's read judge over a set of files, code or not (wb-38nd F2): the paths of those spelling a bd readiness read in any reading
 * readsIn takes (raw, and cooked for a code or a JSON file), the reader excepted. */
function bypassIn(files: readonly JudgedFile[]): string[] {
  return files.filter(file => file.path !== READER_MODULE && readsIn(file.text, file.path).length > 0).map(file => file.path);
}

/** The TypeScript configuration the typecheck step reads (npm run typecheck): the program TypeScript merges the seam in. */
const TSCONFIG = "tsconfig.json";
interface MergedSeam {
  readonly members: readonly string[];
  readonly signatures: { readonly index: number; readonly call: number; readonly construct: number };
  readonly bases: readonly string[];
  readonly declarations: readonly string[];
}
/** The source files the programs below parse, shared across them (a file is parsed once per run). */
const PARSED_SOURCES = new Map<string, ts.SourceFile>();
/** The Beads seam as TypeScript itself merges it (wb-dcsb F1): a Program over TSCONFIG (its include walked by TypeScript, symbolic
 * links followed), beside any virtual files a control adds (served from memory; nothing is written), and the checker's declared
 * type of the reader's exported SEAM_INTERFACE - its property names, its index, call and construct signatures, its base types and
 * every declaration TypeScript merged into it, as file and kind (an interface, a class or an augmentation anywhere in the program). */
function mergedSeam(virtual: ReadonlyMap<string, string> = new Map<string, string>()): MergedSeam {
  const configPath = join(REPO, TSCONFIG);
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO, { noEmit: true }, configPath);
  const base = ts.createCompilerHost(parsed.options, true);
  const host: ts.CompilerHost = {
    ...base,
    fileExists: file => virtual.has(file) || base.fileExists(file),
    readFile: file => virtual.get(file) ?? base.readFile(file),
    getSourceFile: (file, language) => {
      const planted = virtual.get(file);
      if (planted !== undefined) return ts.createSourceFile(file, planted, language, true, ts.ScriptKind.TS);
      const cached = PARSED_SOURCES.get(file);
      if (cached !== undefined) return cached;
      const read = base.getSourceFile(file, language);
      if (read !== undefined) PARSED_SOURCES.set(file, read);
      return read;
    },
  };
  const program = ts.createProgram({ rootNames: [...parsed.fileNames, ...virtual.keys()], options: parsed.options, host });
  const checker = program.getTypeChecker();
  const reader = program.getSourceFile(join(REPO, READER_MODULE));
  const moduleSymbol = reader === undefined ? undefined : checker.getSymbolAtLocation(reader);
  const seam = moduleSymbol === undefined ? undefined : checker.getExportsOfModule(moduleSymbol).find(symbol => symbol.name === SEAM_INTERFACE);
  if (seam === undefined) return { members: [], signatures: { index: -1, call: -1, construct: -1 }, bases: [], declarations: [] };
  const type = checker.getDeclaredTypeOfSymbol(seam);
  return {
    members: checker.getPropertiesOfType(type).map(symbol => symbol.name).sort(),
    signatures: { index: checker.getIndexInfosOfType(type).length, call: type.getCallSignatures().length, construct: type.getConstructSignatures().length },
    bases: type.isClassOrInterface() ? checker.getBaseTypes(type).map(baseType => checker.typeToString(baseType)) : [],
    declarations: (seam.declarations ?? []).map(declaration => `${relative(REPO, declaration.getSourceFile().fileName)}:${ts.SyntaxKind[declaration.kind]}`).sort(),
  };
}

/** The repository-root files B1 reads (ROOT_MANIFESTS), in name order. */
function rootManifests(): string[] {
  const pattern = new RegExp(ROOT_MANIFESTS.pattern);
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter(entry => entry.isFile() && pattern.test(entry.name))
    .sort(byName)
    .map(entry => join(REPO, entry.name));
}
/** True when B1 reads a repository path: one under a SCAN_ROOTS directory, or a root manifest. */
function scannedByB1(file: string): boolean {
  return SCAN_ROOTS.some(scan => file.startsWith(`${scan.root}/`)) || (!file.includes("/") && new RegExp(ROOT_MANIFESTS.pattern).test(file));
}
/** marked, the repository's CommonMark and GFM renderer (a devDependency), as an instance of its own, so no other case's options
 * reach it. */
const MARKDOWN = new Marked();
/** The named entities an HTML text carries here (marked escapes &, <, >, " and ' in code and text), beside the numeric ones. */
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
/** An HTML text with its entities decoded, so an escaped character reads as the character the page shows. */
function decodeEntities(html: string): string {
  return html.replace(/&(?:#(\d+)|#[xX]([0-9a-fA-F]+)|([A-Za-z]+));/g, (entity: string, decimal?: string, hex?: string, name?: string): string => {
    const point = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (point !== undefined) return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
    return (name === undefined ? undefined : NAMED_ENTITIES[name]) ?? entity;
  });
}
/** The elements the HTML parser reads as void: a start tag opens no content. */
const VOID_ELEMENTS: readonly string[] = ["area", "base", "basefont", "bgsound", "br", "col", "embed", "frame", "hr", "image", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
interface RawTextElement {
  readonly shown: boolean;
  readonly decoded: boolean;
}
/** The elements whose body the HTML tokenizer reads as text, never as markup, to the element's own end tag (an unclosed one to the
 * end of the document; plaintext always to the end): RAWTEXT and RCDATA (script and style never reach here: a page carrying either
 * is unjudged, unjudgedBy). `shown` is whether a browser renders the body (noscript with scripting on; an iframe's body is
 * fallback), `decoded` whether its references are. */
const RAW_TEXT_ELEMENTS: Readonly<Record<string, RawTextElement>> = {
  noscript: { shown: false, decoded: false },
  noembed: { shown: false, decoded: false },
  noframes: { shown: false, decoded: false },
  iframe: { shown: false, decoded: false },
  title: { shown: false, decoded: true },
  textarea: { shown: true, decoded: true },
  xmp: { shown: true, decoded: false },
  plaintext: { shown: true, decoded: false },
};
/** The elements the parser builds whose content the reading shows nothing of: the HTML standard's rendering section hides template,
 * datalist and rp (display: none); a media, canvas or object element renders in place of its fallback content; and a select (it
 * shows one option), an svg or math element (foreign content, rendered by its own rules) and a bdo (its text may be shown
 * reversed) are read as showing nothing, which hides more than a browser may (OVER-READ, SCOPE). An element carrying the hidden or
 * the popover attribute, a dialog that is not open and a details element that is not open (its summary with it, OVER-READ) hide
 * theirs too (hidesContent). */
const HIDING_ELEMENTS: readonly string[] = ["template", "datalist", "rp", "video", "audio", "canvas", "object", "select", "svg", "math", "bdo"];
/** The HTML standard's formatting elements (wb-38nd F1): the tree builder keeps each on its list of active formatting elements from
 * its start tag until the end tag of its own name removes it (or a marker element's end tag clears it from the list, which the
 * reading does not model: SCOPE), so one an enclosing element's end tag closes is re-opened, its attributes with it (a hiding
 * attribute among them), around the content after it - it reconstructs the active formatting elements. */
const FORMATTING_ELEMENTS: readonly string[] = ["a", "b", "big", "code", "em", "font", "i", "nobr", "s", "small", "strike", "strong", "tt", "u"];
const isHtmlSpace = (char: string | undefined): boolean => char === "\t" || char === "\n" || char === "\f" || char === " ";
const isAsciiAlpha = (char: string | undefined): boolean => char !== undefined && /^[A-Za-z]$/.test(char);
/** True when `at` opens the tag `tag` (a "<name" or "</name" prefix, any case) followed by the character the tokenizer ends a tag
 * name at: whitespace, '/' or '>'. */
function tagOpensAt(html: string, at: number, tag: string): boolean {
  const after = html[at + tag.length];
  return html.slice(at, at + tag.length).toLowerCase() === tag && (isHtmlSpace(after) || after === "/" || after === ">");
}
interface HtmlTag {
  readonly name: string;
  readonly attributes: ReadonlyMap<string, string>;
  readonly next: number;
}
/** One tag as the HTML tokenizer reads it from its name's first character (wb-dcsb F4): the name, lowercased; its attributes, a
 * quoted value read whole (a '>' inside one stays in the tag, the gate's G11) and an unquoted one to whitespace or '>'; and the
 * index past its closing '>'. Undefined when the document ends inside the tag: the tokenizer emits nothing more. */
function htmlTagAt(html: string, start: number): HtmlTag | undefined {
  let at = start;
  let name = "";
  while (at < html.length && !isHtmlSpace(html[at]) && html[at] !== "/" && html[at] !== ">") {
    name += (html[at] ?? "").toLowerCase();
    at += 1;
  }
  const attributes = new Map<string, string>();
  while (at < html.length) {
    const char = html[at] ?? "";
    if (isHtmlSpace(char) || char === "/") {
      at += 1;
      continue;
    }
    if (char === ">") return { name, attributes, next: at + 1 };
    let attribute = char.toLowerCase();
    at += 1;
    while (at < html.length && !isHtmlSpace(html[at]) && html[at] !== "/" && html[at] !== ">" && html[at] !== "=") {
      attribute += (html[at] ?? "").toLowerCase();
      at += 1;
    }
    while (isHtmlSpace(html[at])) at += 1;
    let value = "";
    if (html[at] === "=") {
      at += 1;
      while (isHtmlSpace(html[at])) at += 1;
      const quote = html[at];
      if (quote === '"' || quote === "'") {
        const close = html.indexOf(quote, at + 1);
        if (close < 0) return undefined;
        value = html.slice(at + 1, close);
        at = close + 1;
      } else {
        const begin = at;
        while (at < html.length && !isHtmlSpace(html[at]) && html[at] !== ">") at += 1;
        value = html.slice(begin, at);
      }
    }
    if (!attributes.has(attribute)) attributes.set(attribute, decodeEntities(value));
  }
  return undefined;
}
/** The index past an HTML comment opening at `at` ("<!--"): "<!-->" and "<!--->" close at once, any other at its first "-->" or
 * "--!>", an unclosed one at the end of the document. */
function commentEnd(html: string, at: number): number {
  const body = at + 4;
  if (html.startsWith(">", body)) return body + 1;
  if (html.startsWith("->", body)) return body + 2;
  const ends = [html.indexOf("-->", body), html.indexOf("--!>", body)].filter(index => index >= 0);
  if (ends.length === 0) return html.length;
  const first = Math.min(...ends);
  return first + (html.startsWith("-->", first) ? 3 : 4);
}
/** Where a RAWTEXT or RCDATA element's body ends: the start of its own end tag, or the end of the document. */
function rawBodyEnd(html: string, from: number, name: string): number {
  for (let at = html.indexOf("<", from); at >= 0; at = html.indexOf("<", at + 1)) if (tagOpensAt(html, at, `</${name}`)) return at;
  return html.length;
}
/** The bidi override characters (left-to-right and right-to-left override): text shown after one may be shown in another order. */
const BIDI_OVERRIDES: readonly string[] = [String.fromCodePoint(0x202d), String.fromCodePoint(0x202e)];
/** True when an element hides its content: one of HIDING_ELEMENTS, one carrying the hidden or the popover attribute, a dialog or a
 * details element that is not open. */
function hidesContent(name: string, attributes: ReadonlyMap<string, string>): boolean {
  if (attributes.has("hidden") || attributes.has("popover") || HIDING_ELEMENTS.includes(name)) return true;
  return (name === "dialog" || name === "details") && !attributes.has("open");
}
/** True when a start tag leaves the reading unable to judge what a browser shows, so the page reads as showing nothing (OVER-READ,
 * SCOPE): a script (a script element, an event-handler attribute) and CSS (a style element or attribute, a stylesheet link) can
 * hide any text, a meta refresh navigates away, and a hidden attribute on an html or body start tag hides the whole page (the
 * parser adds it to the root element wherever the tag sits). Attribute values are read with their references decoded. */
function unjudgedBy(tag: HtmlTag): boolean {
  if (tag.name === "script" || tag.name === "style") return true;
  for (const attribute of tag.attributes.keys()) if (attribute === "style" || attribute.startsWith("on")) return true;
  if (tag.name === "link" && (tag.attributes.get("rel") ?? "").toLowerCase().includes("stylesheet")) return true;
  if (tag.name === "meta" && (tag.attributes.get("http-equiv") ?? "").toLowerCase().includes("refresh")) return true;
  return (tag.name === "html" || tag.name === "body") && tag.attributes.has("hidden");
}
/** An element on visibleTextOf's stack of open elements or on its list of active formatting elements: its name, and whether it hides
 * its content (hidesContent). */
interface OpenElement {
  readonly name: string;
  readonly hides: boolean;
}
/** The text an HTML document shows (wb-dcsb F4), read token by token as the HTML tokenizer reads it: a comment, a markup declaration
 * and a processing instruction show nothing; a tag shows nothing (its attributes with it) and separates words; a raw-text
 * element's body is read to its end tag (RAW_TEXT_ELEMENTS) and shown only when the element renders it; the text inside an
 * element that hides its content (hidesContent) shows nothing; and a page carrying a start tag unjudgedBy names, or a bidi
 * override character in its shown text (the text may be shown reversed), shows nothing at all. Entities are decoded in text and
 * RCDATA. An element is open from its start tag (a self-closing slash on an element that is not void closes nothing) until an end
 * tag closes it, or to the end of the document when none does; an end tag closes the element it names with every element opened
 * inside it. The end tag of an element that is not a formatting element names the last open element of its name (nested
 * same-name elements counted). A formatting element (FORMATTING_ELEMENTS; wb-38nd F1) is also listed, as the tree builder's list
 * of active formatting elements holds it, from its start tag until an end tag of its name removes it: that end tag names the
 * last listed element of its name, removes it from the list and closes it when it is still open (one closed already is only
 * removed). A listed element an end tag closed is re-opened, with its hiding, before the next text (a textarea's body excepted,
 * which the tree builder inserts without re-opening) and before a formatting element's start tag - every listed element after
 * the last one still open, in order, as the tree builder reconstructs the active formatting elements. */
function visibleTextOf(html: string): string {
  const source = html.replace(/\r\n?/g, "\n");
  const shown: string[] = [];
  const open: OpenElement[] = [];
  const active: OpenElement[] = [];
  const reconstruct = (): void => {
    let from = active.length;
    while (from > 0) {
      const entry = active[from - 1];
      if (entry === undefined || open.includes(entry)) break;
      from -= 1;
    }
    for (let index = from; index < active.length; index += 1) {
      const entry = active[index];
      if (entry === undefined) continue;
      const reopened: OpenElement = { name: entry.name, hides: entry.hides };
      open.push(reopened);
      active[index] = reopened;
    }
  };
  const show = (segment: string, decoded: boolean, reopens = true): void => {
    if (segment.length === 0) return;
    if (reopens) reconstruct();
    if (open.every(element => !element.hides)) shown.push(decoded ? decodeEntities(segment) : segment);
  };
  let at = 0;
  while (at < source.length) {
    const lt = source.indexOf("<", at);
    show(source.slice(at, lt < 0 ? source.length : lt), true);
    if (lt < 0) break;
    const next = source[lt + 1];
    const after = source[lt + 2];
    if (source.startsWith("<!--", lt)) at = commentEnd(source, lt);
    else if (next === "!" || next === "?" || (next === "/" && after !== undefined && after !== ">" && !isAsciiAlpha(after))) {
      const close = source.indexOf(">", lt);
      at = close < 0 ? source.length : close + 1;
    } else if (next === "/" && after === ">") at = lt + 3;
    else if (next === "/" && isAsciiAlpha(after)) {
      const tag = htmlTagAt(source, lt + 2);
      if (tag === undefined) break;
      if (FORMATTING_ELEMENTS.includes(tag.name)) {
        const listed = active.map(element => element.name).lastIndexOf(tag.name);
        const entry = active[listed];
        if (entry !== undefined) {
          active.splice(listed, 1);
          const index = open.indexOf(entry);
          if (index >= 0) open.length = index;
        }
      } else {
        const index = open.map(element => element.name).lastIndexOf(tag.name);
        if (index >= 0) open.length = index;
      }
      at = tag.next;
    } else if (isAsciiAlpha(next)) {
      const tag = htmlTagAt(source, lt + 1);
      if (tag === undefined) break;
      if (unjudgedBy(tag)) return "";
      at = tag.next;
      const raw = RAW_TEXT_ELEMENTS[tag.name];
      if (raw === undefined) {
        if (FORMATTING_ELEMENTS.includes(tag.name)) {
          reconstruct();
          const element: OpenElement = { name: tag.name, hides: hidesContent(tag.name, tag.attributes) };
          open.push(element);
          active.push(element);
        } else if (!VOID_ELEMENTS.includes(tag.name)) open.push({ name: tag.name, hides: hidesContent(tag.name, tag.attributes) });
      } else {
        const end = tag.name === "plaintext" ? source.length : rawBodyEnd(source, at, tag.name);
        if (raw.shown && !hidesContent(tag.name, tag.attributes)) show(source.slice(at, end), raw.decoded, tag.name !== "textarea");
        const close = end < source.length ? htmlTagAt(source, end + 2) : undefined;
        if (close === undefined) break;
        at = close.next;
      }
    } else {
      show("<", false);
      at = lt + 1;
      continue;
    }
    shown.push(" ");
  }
  const page = shown.join("");
  return BIDI_OVERRIDES.some(override => page.includes(override)) ? "" : page;
}
/** A Markdown text as its reader sees it rendered (wb-dugi F3 and F4; wb-xogu F6; wb-dcsb F4; wb-38nd F1): marked renders it to HTML,
 * where code (a fence, an indented block, an inline span) is escaped text, so an HTML comment inside code renders literally and is
 * kept; then visibleTextOf reads the HTML as a browser's tokenizer does, with the tree builder's re-opening of formatting elements,
 * and keeps the text it reads as shown - SCOPE names where that departs from what a browser shows, in each direction. A link
 * reference definition renders nothing; the text inside an element that hides nothing is kept. */
function renderedOf(text: string): string {
  return visibleTextOf(MARKDOWN.parse(text, { async: false }));
}

interface StepReading {
  readonly segments: number;
  readonly reads: readonly number[];
  readonly requires: readonly number[];
  readonly claimLocks: readonly number[];
  readonly claimWrites: readonly number[];
  readonly closes: readonly number[];
  readonly execution: number;
  readonly skipsClaim: boolean;
}
/** B4's judge over a carried generation text, by command (`;`-separated segment): the segments that spell a bd show read, the
 * status requirement, the claim-lock invocation, a bd claim write, a bd close, the first execution step, and whether the text skips
 * the claim step. */
function judgeStep(text: string): StepReading {
  const segments = text.split(";").map(wordsOf);
  const where = (test: (words: string[]) => boolean): number[] => segments.flatMap((words, index) => (test(words) ? [index] : []));
  const pair = (words: string[], first: string, second: string): boolean => words.some((word, at) => word === first && words[at + 1] === second);
  return {
    segments: segments.length,
    reads: where(words => words.includes("bd") && words.includes("show")),
    requires: where(words => pair(words, "require", "status")),
    claimLocks: where(words => pair(words, "claimlock", "bead")),
    claimWrites: where(words => words.includes("bd") && (words.includes("claim") || (words.includes("update") && words.includes("inprogress")))),
    closes: where(words => words.includes("bd") && words.includes("close")),
    execution: where(words => pair(words, "2", "worktree"))[0] ?? -1,
    skipsClaim: where(words => words.includes("skip") && words.some((word, at) => (word === "claim" || word === "claimlock") && at > words.indexOf("skip"))).length > 0,
  };
}
/** B4's verdict on a step reading: a read and the requirement before the claim-lock and the write, a read after the write, all
 * before the first execution step, and no close. */
function readsBeforeExecuting(step: StepReading): boolean {
  const firstRead = step.reads[0] ?? -1;
  const firstRequire = step.requires[0] ?? -1;
  const lock = step.claimLocks[0] ?? -1;
  const write = step.claimWrites[0] ?? -1;
  const reread = step.reads.find(index => index > write) ?? -1;
  return (
    firstRead >= 0 &&
    firstRequire >= 0 &&
    lock > Math.max(firstRead, firstRequire) &&
    write > lock &&
    reread > write &&
    step.execution > reread &&
    step.closes.length === 0
  );
}

/** The bead's own notes in the tracker export, the acceptance text rows A to C quote. */
function beadNotes(): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The vocabulary the reader itself maps, read from its source: the statuses STATUS_TONES names and the dependency types it edges. */
function readerVocabulary(): { readonly statuses: string[]; readonly edgeTypes: string[] } {
  const text = textOf(join(REPO, READER_MODULE));
  const tones = /const STATUS_TONES[^=]*= new Map\(\[([\s\S]*?)\]\);/.exec(text)?.[1] ?? "";
  return {
    statuses: [...tones.matchAll(/\['([a-z_]+)', '[a-z]+'\]/g)].map(match => match[1] ?? ""),
    edgeTypes: [...new Set([...text.matchAll(/rawType === '([a-z-]+)'/g)].map(match => match[1] ?? ""))],
  };
}
/** The acceptance clauses the notes state, in order: the filing's "Acceptance: (a) ...; (b) ...; (c) ... ." sentence, cut before
 * its "Caveat:", split at each "; (x) " tag. */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(" Caveat:", start);
  if (start < 0 || end < 0) return [];
  return notes
    .slice(start + "Acceptance: ".length, end)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The delivery statement's opening of its residual list in the notes (wb-kku9.3's cut, appended by the collector). */
const RESIDUAL_STATEMENT = "RESIDUALS (named, each with its pinned quiet row): ";
/** The pin set the delivery statement in the notes names: the first "<n> pins <ranges>" run ("19 pins A1-A4 B1-B4 C1-C3 Q1-Q8"),
 * each range expanded in order (a range across two letters is kept as spelled, so it never matches a pin), beside the count. */
function statedPins(notes: string): { readonly count: number; readonly pins: readonly string[] } {
  const match = /(\d+) pins ([A-Z]\d+(?:-[A-Z]\d+)?(?: [A-Z]\d+(?:-[A-Z]\d+)?)*)/.exec(notes);
  if (match === null) return { count: -1, pins: [] };
  const pins = (match[2] ?? "").split(" ").flatMap(range => {
    const [from = "", to = from] = range.split("-");
    const letter = from.slice(0, 1);
    if (to.slice(0, 1) !== letter) return [range];
    const first = Number(from.slice(1));
    return Array.from({ length: Math.max(0, Number(to.slice(1)) - first + 1) }, (_, index) => `${letter}${first + index}`);
  });
  return { count: Number(match[1]), pins };
}
/** The residual list the delivery statement in the notes names: the RESIDUAL_STATEMENT paragraph, each "<pin> <family>" pair in
 * order, read as "<family>:<pin>". */
function statedResiduals(notes: string): string[] {
  const start = notes.indexOf(RESIDUAL_STATEMENT);
  if (start < 0) return [];
  const end = notes.indexOf("\n", start);
  return [...notes.slice(start, end < 0 ? notes.length : end).matchAll(/\b(Q\d+) (R-[A-Z]+)\b/g)].map(match => `${match[2]}:${match[1]}`);
}

// The reference execution path and its fixtures. ------------------------------------------------------------------------------
const WORK_ID = "fx-run.1";
const WORKSPACE = "/fixture/beads-claim-recheck";
const SCOPE: ObservationScope = { workspace: WORKSPACE, principal: "operator" };
const LIMITS = { maxDependencies: 8, maxTitleChars: 80, timeoutMs: 1_000 };
const AT = "2026-10-23T20:00:00.000Z";

interface Dep {
  readonly id: string;
  readonly type: string;
  readonly status: string;
}
interface StoreRow {
  readonly status: string;
  readonly deps: readonly Dep[];
  readonly closeReason?: string;
  readonly assignee?: string;
}
type Fault = "exit" | "not-json" | "other-id" | "throws";
type Fresh = StoreRow | { readonly fault: Fault };
const blocks = (id: string, status: string): Dep => ({ id, type: "blocks", status });
const READY: StoreRow = { status: "in_progress", deps: [] };

/** One bd-1.1.0-rc.1 `bd show --json` issue object (the wb-752.6 fixture shape). */
function issueOf(row: StoreRow, id: string): Record<string, unknown> {
  return {
    id,
    title: "claimed task fixture",
    status: row.status,
    issue_type: "task",
    priority: 2,
    created_at: "2026-10-23T19:00:00Z",
    updated_at: "2026-10-23T19:30:00Z",
    dependencies: row.deps.map(dep => ({ id: dep.id, title: `title of ${dep.id}`, status: dep.status, issue_type: "task", priority: 2, dependency_type: dep.type })),
    dependency_count: row.deps.length,
    ...(row.closeReason !== undefined ? { close_reason: row.closeReason, closed_at: "2026-10-23T19:45:00Z" } : {}),
    ...(row.assignee !== undefined ? { assignee: row.assignee } : {}),
  };
}
function serve(fresh: Fresh, id: string): beadsObserver.BeadsShowResult {
  if ("fault" in fresh) {
    if (fresh.fault === "throws") throw new Error("spawn bd ENOENT");
    if (fresh.fault === "exit") return { exit: 1, stdout: JSON.stringify([issueOf(READY, id)]), stderr: "no beads database" };
    if (fresh.fault === "not-json") return { exit: 0, stdout: "not json", stderr: "" };
    return { exit: 0, stdout: JSON.stringify([issueOf(READY, "fx-other.1")]), stderr: "" };
  }
  return { exit: 0, stdout: JSON.stringify([issueOf(fresh, id)]), stderr: "" };
}
const readThrough = (client: beadsObserver.BeadsReadClient, now: () => string = () => AT): Promise<beadsObserver.BeadsWorkReading> =>
  beadsObserver.readBeadsWork(client, { workId: WORK_ID, workspaceRoot: WORKSPACE, scope: SCOPE, limits: LIMITS, now });

interface Refusal {
  readonly code: RefusalCode;
  readonly detail: string;
}
type Outcome = { readonly kind: "executed"; readonly workId: string } | { readonly kind: "refused"; readonly workId: string; readonly code: RefusalCode; readonly detail: string };
/** What an execution touches: the Beads seam (show only), the native verb and the seat's refusal counter. */
interface Seat {
  readonly client: beadsObserver.BeadsReadClient;
  readonly refusals: Outcome[];
  native(workId: string): Promise<void>;
}
/** The claim a seat took: the work id and the reading the claim step saw (the cached readiness a stale path acts on). */
interface Claim {
  readonly workId: string;
  readonly reading: beadsObserver.BeadsWorkReading;
}
type Executor = (claim: Claim, seat: Seat) => Promise<Outcome>;
interface Checks {
  readonly status: boolean;
  readonly blockers: boolean;
  readonly complete: boolean;
}
const ALL: Checks = { status: true, blockers: true, complete: true };

async function freshRead(seat: Seat, workId: string): Promise<beadsObserver.BeadsWorkReading | CapabilityError> {
  try {
    return await beadsObserver.readBeadsWork(seat.client, { workId, workspaceRoot: WORKSPACE, scope: SCOPE, limits: LIMITS, now: () => AT });
  } catch (error) {
    if (error instanceof CapabilityError) return error;
    throw error;
  }
}
/** The readiness a claimed task needs at execution, judged on one reading: undefined when it may run. */
function notReady(reading: beadsObserver.BeadsWorkReading, checks: Checks): Refusal | undefined {
  const { status } = reading.work;
  if (checks.status && status === "closed") return { code: "closed", detail: status };
  if (checks.status && status !== "in_progress") return { code: "status", detail: status };
  if (checks.blockers) {
    const open = reading.dependencies.items.filter(item => item.dependencyType === "blocks" && item.id !== reading.source.workId && item.status !== "closed").map(item => item.id);
    if (open.length > 0) return { code: "blocked", detail: open.join(",") };
  }
  if (checks.complete && reading.completeness !== "complete") return { code: "partial", detail: `${reading.dependencies.returned}/${reading.dependencies.offered}` };
  return undefined;
}
function refuse(seat: Seat, workId: string, refusal: Refusal): Outcome {
  const outcome: Outcome = { kind: "refused", workId, code: refusal.code, detail: refusal.detail };
  seat.refusals.push(outcome);
  return outcome;
}
async function execute(seat: Seat, workId: string): Promise<Outcome> {
  await seat.native(workId);
  return { kind: "executed", workId };
}
function judged(fresh: beadsObserver.BeadsWorkReading | CapabilityError, checks: Checks): Refusal | undefined {
  return fresh instanceof CapabilityError ? { code: "unreadable", detail: fresh.category } : notReady(fresh, checks);
}
async function decide(claim: Claim, seat: Seat, fresh: beadsObserver.BeadsWorkReading | CapabilityError, checks: Checks): Promise<Outcome> {
  const refusal = judged(fresh, checks);
  return refusal === undefined ? execute(seat, claim.workId) : refuse(seat, claim.workId, refusal);
}

/** The reference: re-read through the seam at execution time and decide on that reading alone. */
const honest: Executor = async (claim, seat) => decide(claim, seat, await freshRead(seat, claim.workId), ALL);

interface Mutant {
  readonly clauses: readonly string[];
  readonly run: Executor;
}
/** Each member relaxes one condition of honest; it must break at least one case of its clauses (C2), STALE-CLAIM all of (a)'s (C1). */
const MUTANTS: Readonly<Record<string, Mutant>> = {
  "STALE-CLAIM": { clauses: ["A1", "A2"], run: (claim, seat) => decide(claim, seat, claim.reading, ALL) },
  "NO-READ": { clauses: ["A3"], run: (claim, seat) => execute(seat, claim.workId) },
  "READ-IGNORED": {
    clauses: ["A1"],
    run: async (claim, seat) => {
      await freshRead(seat, claim.workId);
      return decide(claim, seat, claim.reading, ALL);
    },
  },
  "STATUS-ONLY": { clauses: ["A2"], run: async (claim, seat) => decide(claim, seat, await freshRead(seat, claim.workId), { status: true, blockers: false, complete: true }) },
  "BLOCKERS-ONLY": { clauses: ["A1"], run: async (claim, seat) => decide(claim, seat, await freshRead(seat, claim.workId), { status: false, blockers: true, complete: true }) },
  "PARTIAL-TRUSTED": { clauses: ["A4"], run: async (claim, seat) => decide(claim, seat, await freshRead(seat, claim.workId), { status: true, blockers: true, complete: false }) },
  "EXECUTE-FIRST": {
    clauses: ["A3"],
    run: async (claim, seat) => {
      await seat.native(claim.workId);
      const refusal = judged(await freshRead(seat, claim.workId), ALL);
      return refusal === undefined ? { kind: "executed", workId: claim.workId } : refuse(seat, claim.workId, refusal);
    },
  },
  "UNREADABLE-FALLBACK": {
    clauses: ["A4"],
    run: async (claim, seat) => {
      const fresh = await freshRead(seat, claim.workId);
      return decide(claim, seat, fresh instanceof CapabilityError ? claim.reading : fresh, ALL);
    },
  },
  "UNCOUNTED": { clauses: ["A1"], run: (claim, seat) => honest(claim, { ...seat, refusals: [] }) },
};
interface ExecutorBinding {
  readonly module: string;
  readonly run: Executor;
}
/** The Pi modules that act on a claimed task: a module B1 or B3 flags must be bound here, every binding must name such a module,
 * and every bound executor meets every case (C3). Empty today: Pi executes no claimed task. */
const BEAD_EXECUTORS: readonly ExecutorBinding[] = [];

type Clause = "A1" | "A2" | "A3" | "A4";
interface ExecCase {
  readonly id: string;
  readonly clause: Clause;
  readonly claimed: StoreRow;
  readonly fresh: Fresh;
  readonly expect: string;
}
/** Every case: the row the claim step read (ready when claimed, except the one case unblocked since the claim), the row the
 * execution-time read returns, and honest's outcome. */
const EXEC_CASES: readonly ExecCase[] = [
  { id: "closed with a close reason", clause: "A1", claimed: READY, fresh: { status: "closed", deps: [], closeReason: "duplicate of fx-run.2" }, expect: "refused closed:closed" },
  { id: "closed without a close reason", clause: "A1", claimed: READY, fresh: { status: "closed", deps: [] }, expect: "refused closed:closed" },
  { id: "a new open blocker", clause: "A2", claimed: READY, fresh: { status: "in_progress", deps: [blocks("fx-dep.1", "open")] }, expect: "refused blocked:fx-dep.1" },
  {
    id: "a closed blocker reopened",
    clause: "A2",
    claimed: { status: "in_progress", deps: [blocks("fx-dep.1", "closed")] },
    fresh: { status: "in_progress", deps: [blocks("fx-dep.1", "open")] },
    expect: "refused blocked:fx-dep.1",
  },
  {
    id: "a blocker in progress beside a closed one",
    clause: "A2",
    claimed: { status: "in_progress", deps: [blocks("fx-dep.1", "closed"), blocks("fx-dep.2", "closed")] },
    fresh: { status: "in_progress", deps: [blocks("fx-dep.1", "closed"), blocks("fx-dep.2", "in_progress")] },
    expect: "refused blocked:fx-dep.2",
  },
  { id: "still ready with no dependency", clause: "A3", claimed: READY, fresh: READY, expect: "executed" },
  {
    id: "still ready beside non-blocking entries",
    clause: "A3",
    claimed: { status: "in_progress", deps: [blocks("fx-dep.1", "closed")] },
    fresh: {
      status: "in_progress",
      deps: [blocks("fx-dep.1", "closed"), { id: "fx-rel.1", type: "related", status: "open" }, { id: "fx-src.1", type: "discovered-from", status: "open" }, { id: "fx-run", type: "parent-child", status: "open" }],
    },
    expect: "executed",
  },
  {
    id: "unblocked since the claim",
    clause: "A3",
    claimed: { status: "in_progress", deps: [blocks("fx-dep.1", "open")] },
    fresh: { status: "in_progress", deps: [blocks("fx-dep.1", "closed")] },
    expect: "executed",
  },
  { id: "the claim released", clause: "A4", claimed: READY, fresh: { status: "open", deps: [] }, expect: "refused status:open" },
  { id: "a blocked status", clause: "A4", claimed: READY, fresh: { status: "blocked", deps: [] }, expect: "refused status:blocked" },
  { id: "a deferred status", clause: "A4", claimed: READY, fresh: { status: "deferred", deps: [] }, expect: "refused status:deferred" },
  { id: "an unknown status word", clause: "A4", claimed: READY, fresh: { status: "hooked", deps: [] }, expect: "refused status:hooked" },
  {
    id: "a cut dependency page",
    clause: "A4",
    claimed: READY,
    fresh: { status: "in_progress", deps: Array.from({ length: 9 }, (_, index) => blocks(`fx-dep.${index + 1}`, "closed")) },
    expect: "refused partial:8/9",
  },
  { id: "a nonzero exit", clause: "A4", claimed: READY, fresh: { fault: "exit" }, expect: "refused unreadable:unavailable" },
  { id: "a non-JSON body", clause: "A4", claimed: READY, fresh: { fault: "not-json" }, expect: "refused unreadable:unavailable" },
  { id: "another work id", clause: "A4", claimed: READY, fresh: { fault: "other-id" }, expect: "refused unreadable:unavailable" },
  { id: "a throwing seam", clause: "A4", claimed: READY, fresh: { fault: "throws" }, expect: "refused unreadable:unavailable" },
];

const SHOW = `show ${WORK_ID} @root ${LIMITS.timeoutMs}ms`;
const CLAIMED = `claim ${WORK_ID}`;
const NATIVE = `native ${WORK_ID}`;
interface RunRecord {
  readonly case: string;
  readonly digest: string;
  readonly summary: string;
  readonly outcome: JsonValue;
  readonly log: readonly string[];
  readonly native: number;
  readonly refusals: number;
}
const summaryOf = (outcome: Outcome): string => (outcome.kind === "executed" ? "executed" : `refused ${outcome.code}:${outcome.detail}`);
/** One case through one executor: the claim step reads through the seam (the first show) and claims; the executor then runs
 * against the same seam, whose later shows return the case's execution-time row. */
async function runCase(executor: Executor, entry: ExecCase): Promise<RunRecord> {
  const log: string[] = [];
  let shows = 0;
  let native = 0;
  const client: beadsObserver.BeadsReadClient = {
    async show(id, call) {
      shows += 1;
      log.push(`show ${id} @${call.cwd === WORKSPACE ? "root" : call.cwd} ${call.timeoutMs}ms`);
      return serve(shows === 1 ? entry.claimed : entry.fresh, id);
    },
  };
  const reading = await readThrough(client);
  log.push(CLAIMED);
  const refusals: Outcome[] = [];
  const seat: Seat = {
    client,
    refusals,
    async native(workId) {
      native += 1;
      log.push(`native ${workId}`);
    },
  };
  const outcome = await executor({ workId: WORK_ID, reading }, seat);
  return { case: entry.id, digest: sha256(JSON.stringify(entry)), summary: summaryOf(outcome), outcome: json(outcome), log, native, refusals: refusals.length };
}
async function recordsOf(executor: Executor, clauses: readonly Clause[] = ["A1", "A2", "A3", "A4"]): Promise<RunRecord[]> {
  const records: RunRecord[] = [];
  for (const entry of EXEC_CASES.filter(item => clauses.includes(item.clause))) records.push(await runCase(executor, entry));
  return records;
}
function caseNamed(id: string): ExecCase {
  const found = EXEC_CASES.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`no case ${id}`);
  return found;
}
/** A record meets its case: honest's outcome, no native verb and one counted refusal when refused, one native verb and none when
 * executed, and exactly one fresh show after the claim, before any native verb. */
function meets(record: RunRecord): boolean {
  const refused = record.summary.startsWith("refused ");
  const afterClaim = record.log.slice(record.log.indexOf(CLAIMED) + 1);
  return (
    record.summary === caseNamed(record.case).expect &&
    (refused ? record.native === 0 && record.refusals === 1 : record.native === 1 && record.refusals === 0) &&
    afterClaim.filter(entry => entry.startsWith("show ")).length === 1 &&
    afterClaim[0] === SHOW
  );
}
/** The typed diagnostic: exactly the refusal fields, its code from the closed set. */
function typedRefusal(outcome: JsonValue): boolean {
  if (!isObject(outcome)) return false;
  return (
    Object.keys(outcome).sort().join(",") === "code,detail,kind,workId" &&
    outcome.kind === "refused" &&
    typeof outcome.detail === "string" &&
    (REFUSAL_CODES as readonly string[]).includes(String(outcome.code))
  );
}
function assertRefusals(records: readonly RunRecord[], code: RefusalCode): void {
  for (const record of records) {
    expect(record.summary, record.case).toBe(caseNamed(record.case).expect);
    expect(record.summary.startsWith(`refused ${code}:`), `${record.case}: refused ${code}`).toBe(true);
    expect(typedRefusal(record.outcome), `${record.case}: a typed diagnostic`).toBe(true);
    expect({ native: record.native, refusals: record.refusals }, `${record.case}: no native verb, one counted refusal`).toStrictEqual({ native: 0, refusals: 1 });
    expect(record.log, `${record.case}: the re-read follows the claim and nothing follows it`).toStrictEqual([SHOW, CLAIMED, SHOW]);
  }
}

/** The census constants the roster holds: every table and literal a case reads. */
function constantsOf(): JsonValue {
  return json({
    refusalCodes: REFUSAL_CODES,
    claimWindow: CLAIM_WINDOW,
    readVerbs: READ_VERBS,
    scanRoots: SCAN_ROOTS,
    rootManifests: ROOT_MANIFESTS,
    importRoots: IMPORT_ROOTS,
    importNonCode: IMPORT_NON_CODE,
    seamInterface: SEAM_INTERFACE,
    readerModule: READER_MODULE,
    instructionFiles: INSTRUCTION_FILES,
    vc4Launcher: VC4_LAUNCHER,
    residuals: RESIDUALS,
    cases: EXEC_CASES.map(entry => `${entry.clause}:${entry.id}:${entry.expect}`),
    mutants: Object.entries(MUTANTS).map(([name, mutant]) => `${name}:${mutant.clauses.join(",")}`),
    executors: BEAD_EXECUTORS.map(binding => binding.module),
    generationDigests: GENERATION_DIGESTS,
    residualStatement: RESIDUAL_STATEMENT,
    tsconfig: TSCONFIG,
    voidElements: VOID_ELEMENTS,
    rawTextElements: RAW_TEXT_ELEMENTS,
    hidingElements: HIDING_ELEMENTS,
    formattingElements: FORMATTING_ELEMENTS,
    contract: beadsObserver.BEADS_WORK_CONTRACT,
  });
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const records = await recordsOf(honest, ["A1"]);
    expect(records.length, "A1 cases").toBe(2);
    assertRefusals(records, "closed");
    // The typed-diagnostic check's controls: an unknown code, an extra field and an executed outcome are not typed refusals.
    const typedControls = [
      { kind: "refused", workId: WORK_ID, code: "closed", detail: "closed" },
      { kind: "refused", workId: WORK_ID, code: "stale", detail: "closed" },
      { kind: "refused", workId: WORK_ID, code: "closed", detail: "closed", message: "free text" },
      { kind: "executed", workId: WORK_ID },
    ].map(outcome => typedRefusal(json(outcome)));
    expect(typedControls, "the typed-diagnostic check's controls").toEqual([true, false, false, false]);
    return json({ records, typedControls });
  },
  A2: async () => {
    const records = await recordsOf(honest, ["A2"]);
    expect(records.length, "A2 cases").toBe(3);
    assertRefusals(records, "blocked");
    expect(records.map(record => record.summary.slice("refused blocked:".length)), "the open blockers are named").toEqual(["fx-dep.1", "fx-dep.1", "fx-dep.2"]);
    return json(records);
  },
  A3: async () => {
    const ready = await recordsOf(honest, ["A3"]);
    expect(ready.length, "A3 cases").toBe(3);
    for (const record of ready) {
      expect({ summary: record.summary, native: record.native, refusals: record.refusals }, record.case).toStrictEqual({ summary: "executed", native: 1, refusals: 0 });
      expect(record.log, `${record.case}: the fresh show precedes the native verb`).toStrictEqual([SHOW, CLAIMED, SHOW, NATIVE]);
    }
    const every = await recordsOf(honest);
    const reads = every.map(record => record.log.slice(record.log.indexOf(CLAIMED) + 1).filter(entry => entry.startsWith("show ")).length);
    expect(reads, "every execution issues exactly one show after the claim").toEqual(EXEC_CASES.map(() => 1));
    expect(every.every(meets), "honest meets every case").toBe(true);
    return json({ ready, freshShowsPerCase: reads });
  },
  A4: async () => {
    const records = await recordsOf(honest, ["A4"]);
    expect(records.length, "A4 cases").toBe(9);
    for (const record of records) {
      expect(record.summary, record.case).toBe(caseNamed(record.case).expect);
      expect(typedRefusal(record.outcome), `${record.case}: a typed diagnostic`).toBe(true);
      expect({ native: record.native, refusals: record.refusals }, `${record.case}: no native verb, one counted refusal`).toStrictEqual({ native: 0, refusals: 1 });
    }
    expect([...new Set(records.map(record => record.summary.split(" ")[1]?.split(":")[0]))], "the codes A4 reaches").toEqual(["status", "partial", "unreadable"]);
    return json(records);
  },
  B1: async () => {
    const roots = SCAN_ROOTS.map(scan => {
      const files = filesBelow(join(REPO, scan.root));
      const anchor = join(REPO, scan.anchorFile);
      const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken) && claimsIn(textOf(anchor), anchor).length === 0;
      expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
      expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was read and is quiet`).toBe(true);
      return { root: scan.root, floor: files.length >= scan.floor, anchor: anchorRead, files };
    });
    const manifests = rootManifests();
    const manifestAnchors = ROOT_MANIFESTS.anchors.map(anchor => {
      const path = join(REPO, anchor.file);
      return manifests.includes(path) && textOf(path).includes(anchor.token) && claimsIn(textOf(path), path).length === 0;
    });
    expect(manifests.length >= ROOT_MANIFESTS.floor, `the root manifests: ${manifests.length} read, floor ${ROOT_MANIFESTS.floor}`).toBe(true);
    expect(manifestAnchors, "each root manifest anchor was read and is quiet").toEqual(ROOT_MANIFESTS.anchors.map(() => true));
    const launched = [...roots.flatMap(scan => scan.files), ...manifests].flatMap(file => claimsIn(textOf(file), file).map(found => `${relative(REPO, file)}: ${found}`));
    const claimingModules = [...new Set(launched.map(entry => entry.slice(0, entry.indexOf(":"))))];
    const bound = BEAD_EXECUTORS.map(binding => binding.module);
    const controls = {
      flagged: [
        "bd update wb-1 --claim",
        'spawnSync("bd", ["update", id, "--claim"])',
        "execFileSync('bd', ['update', id, '--status', 'in_progress'])",
        "BEADS_ACTOR=machine bd -C /repo update fx-run.1 --claim",
        "bd update fx-run.1 -s in_progress",
        'execSync("bd update " + id + " --claim")',
        "bd ready --claim --json",
        "bd update fx-run.1 --status=in_progress",
      ].map(text => claimLaunchesIn(text).length),
      quiet: [
        "bd show fx-run.1 --json",
        "bd ready --json",
        "bd update fx-run.1 --notes claimed",
        "bd list --status in_progress --json",
        "claim-lock --bead fx-run.1",
        "the claim step",
        "bd prune --older-than 30d (reclaim space)",
      ].map(text => claimLaunchesIn(text).length),
    };
    const exports = Object.keys(beadsObserver).sort();
    expect(launched, "a file under the executable roots claiming a Beads task").toEqual([]);
    expect(claimingModules.filter(module => !bound.includes(module)), "a claiming module not bound in BEAD_EXECUTORS").toEqual([]);
    expect(bound.filter(module => !claimingModules.includes(module) && !importersOf("beads-observer", IMPORT_ROOTS).includes(module)), "a binding naming no claiming module or importer").toEqual([]);
    expect(controls.flagged.every(count => count > 0) && controls.quiet.every(count => count === 0), "the judge's controls").toBe(true);
    const seam = seamMembers();
    expect(seam, "the Beads seam offers show alone").toEqual(["show"]);
    const seamControl = seamMembersOf("export interface BeadsReadClient {\n  show(id: string): Promise<R>;\n  claim(id: string): Promise<R>;\n}");
    expect(seamControl, "the seam reader's control: a declared claim member is read").toEqual(["claim", "show"]);
    // The seam reader's spelling controls (wb-xogu F1): the wb-kku9.3 gate's G16 plants - an optional method (G16a), a readonly
    // optional property (G16b) and a generic method (G16d) beside the plain member (G16c) - and the shapes a line regex misses. Each
    // declared member reads by name, an index signature by its kind, an extends clause and a non-literal alias as members of their own.
    const show = "show(id: string, call: BeadsShowCall): Promise<BeadsShowResult>;";
    const declared = (...members: string[]): string => `export interface BeadsReadClient {\n${members.map(member => `  ${member}\n`).join("")}}`;
    const spellings: Readonly<Record<string, string>> = {
      plain: declared(show, "claim(id: string, call: BeadsShowCall): Promise<BeadsShowResult>;"),
      optionalMethod: declared(show, "claim?(id: string, call: BeadsShowCall): Promise<BeadsShowResult>;"),
      readonlyProperty: declared(show, "readonly claim?: (id: string, call: BeadsShowCall) => Promise<BeadsShowResult>;"),
      genericMethod: declared(show, "claim<T = BeadsShowResult>(id: string, call: BeadsShowCall): Promise<T>;"),
      accessor: declared(show, "get claim(): (id: string) => Promise<BeadsShowResult>;"),
      quotedName: declared(show, "'claim'(id: string): Promise<BeadsShowResult>;"),
      sameLine: `export interface BeadsReadClient { ${show} claim(id: string): Promise<BeadsShowResult> }`,
      afterNestedBrace: declared("show(id: string, call: { cwd: string; timeoutMs: number }): Promise<BeadsShowResult>;", "claim(id: string): Promise<BeadsShowResult>;"),
      mergedDeclaration: `${declared(show)}\ninterface BeadsReadClient {\n  claim(id: string): Promise<BeadsShowResult>;\n}`,
      augmentation: 'declare module "./beads-observer.js" {\n  interface BeadsReadClient {\n    claim(id: string): Promise<unknown>;\n  }\n}',
      indexSignature: declared(show, "[verb: string]: (id: string, call: BeadsShowCall) => Promise<BeadsShowResult>;"),
      heritage: `export interface BeadsReadClient extends ClaimClient {\n  ${show}\n}`,
      typeAlias: `export type BeadsReadClient = { ${show} claim(id: string): Promise<BeadsShowResult> };`,
      aliasOfAnother: "export type BeadsReadClient = ClaimingClient;",
    };
    const seamSpellings = Object.fromEntries(Object.entries(spellings).map(([name, text]) => [name, seamMembersOf(text)]));
    expect(seamSpellings, "the seam reader's spelling controls: every member a declaration spells is read").toStrictEqual({
      plain: ["claim", "show"],
      optionalMethod: ["claim", "show"],
      readonlyProperty: ["claim", "show"],
      genericMethod: ["claim", "show"],
      accessor: ["claim", "show"],
      quotedName: ["claim", "show"],
      sameLine: ["claim", "show"],
      afterNestedBrace: ["claim", "show"],
      mergedDeclaration: ["claim", "show"],
      augmentation: ["claim"],
      indexSignature: ["(index signature)", "show"],
      heritage: ["extends ClaimClient", "show"],
      typeAlias: ["claim", "show"],
      aliasOfAnother: ["type ClaimingClient"],
    });
    const readerText = textOf(join(REPO, READER_MODULE));
    const readerSeam = seamMembersOf(readerText);
    expect(readerSeam, "the reader's own declaration offers show alone").toEqual(["show"]);
    // The seam reader's selection controls (wb-dugi F1 and F5), each over the reader's own text beside one more module: every
    // module is parsed, so an interface whose name the raw text spells through a unicode escape - four hex digits (the wb-xogu
    // gate's P3) or a braced code point - reads as the seam, as the name spelled plainly does; another name is not the seam; and a
    // same-named interface TypeScript never merges (the gate's P5) reads too, the OVER-READ SCOPE discloses.
    const augmenting = (name: string): string => `declare module "./beads-observer.js" {\n  interface ${name} {\n    claim(id: string): Promise<unknown>;\n  }\n}\nexport {};\n`;
    const selections: Readonly<Record<string, string>> = {
      escapedName: augmenting("Beads\\u0052eadClient"),
      escapedCodePoint: augmenting("\\u{42}eadsReadClient"),
      plainName: augmenting(SEAM_INTERFACE),
      otherName: augmenting("BeadsWriteClient"),
      unmergedLocal: "interface BeadsReadClient {\n  list(): string[];\n}\nexport const names = (client: BeadsReadClient): string[] => client.list();\n",
    };
    const seamSelection = Object.fromEntries(Object.entries(selections).map(([name, text]) => [name, seamMembersIn([readerText, text])]));
    expect(seamSelection, "the seam reader's selection controls: every module is parsed and judged on the name the parser reads").toStrictEqual({
      escapedName: ["claim", "show"],
      escapedCodePoint: ["claim", "show"],
      plainName: ["claim", "show"],
      otherName: ["show"],
      unmergedLocal: ["list", "show"],
    });
    // The seam reader's class controls (wb-dcsb F1, the gate's G9: a class declaration TypeScript merges into the seam, inside an
    // augmenting declare module). A class reads by its instance members - a method, a property, an accessor, a parameter
    // property, an index signature - and its extends clause; a static member joins the constructor, not the seam, and reads as
    // nothing; another class name is not the seam.
    const classSpellings: Readonly<Record<string, string>> = {
      classAugmentation: 'declare module "./beads-observer.js" {\n  class BeadsReadClient {\n    claim(id: string): Promise<unknown>;\n  }\n}\nexport {};\n',
      classProperty: "export declare class BeadsReadClient {\n  readonly claim?: (id: string) => Promise<unknown>;\n}",
      classAccessor: "export declare class BeadsReadClient {\n  get claim(): (id: string) => Promise<unknown>;\n}",
      parameterProperty: "export class BeadsReadClient {\n  constructor(public claim: (id: string) => Promise<unknown>, plain: number) {}\n}",
      classIndexSignature: "export declare class BeadsReadClient {\n  [verb: string]: unknown;\n}",
      classHeritage: "export declare class BeadsReadClient extends ClaimingBase {}",
      staticMember: "export declare class BeadsReadClient {\n  static claim(id: string): Promise<unknown>;\n}",
      otherClass: "export declare class BeadsWriteClient {\n  claim(id: string): Promise<unknown>;\n}",
    };
    const seamClasses = Object.fromEntries(Object.entries(classSpellings).map(([name, text]) => [name, seamMembersOf(text)]));
    expect(seamClasses, "the seam reader's class controls: a class's instance members and its extends clause are read").toStrictEqual({
      classAugmentation: ["claim"],
      classProperty: ["claim"],
      classAccessor: ["claim"],
      parameterProperty: ["claim"],
      classIndexSignature: ["(index signature)"],
      classHeritage: ["extends ClaimingBase"],
      staticMember: [],
      otherClass: [],
    });
    expect(seamMembersIn([readerText, classSpellings.classAugmentation ?? ""]), "the class merge beside the reader's own declaration").toEqual(["claim", "show"]);
    // The code-file controls (wb-dcsb): every TypeScript and JavaScript extension, in any case, names a code file the readers parse
    // (a .tsx declaration beside JSX is read), while a JSON, Markdown or text file and a doubled extension do not.
    const codeFiles = {
      named: ["a.ts", "a.mts", "a.cts", "a.d.ts", "a.tsx", "a.js", "a.mjs", "a.cjs", "a.jsx", "a.TS", "a.MJS"].map(name => CODE_FILE.test(name)),
      other: ["a.json", "a.md", "a.txt", "a.ts.txt"].map(name => CODE_FILE.test(name)),
      tsxSeam: seamMembersOf(`${classSpellings.classAugmentation ?? ""}export const view = <div>seam</div>;\n`, "zz-view.tsx"),
    };
    expect(codeFiles, "the code-file controls").toStrictEqual({ named: codeFiles.named.map(() => true), other: [false, false, false, false], tsxSeam: ["claim"] });
    // The walk's link control (wb-dcsb F1, the gate's G8: a code file reached through a symbolic link): the repository's own
    // node_modules/.bin/tsc link is listed under its own path and read through to its target.
    const binLink = join(REPO, "node_modules", ".bin", "tsc");
    const linkControl = {
      isLink: lstatSync(binLink).isSymbolicLink(),
      walked: filesBelow(join(REPO, "node_modules", ".bin")).includes(binLink),
      readThrough: textOf(binLink).length > 0 && textOf(binLink) === textOf(join(REPO, "node_modules", "typescript", "bin", "tsc")),
    };
    expect(linkControl, "the walk's link control: a symbolic link is walked and read through").toStrictEqual({ isLink: true, walked: true, readThrough: true });
    // The file judge's cooked controls (wb-dcsb, the F2 class at B1): a code file is judged on its raw text and on the words the
    // TypeScript parser cooks (a hex, unicode or braced escape decoded, a line continuation removed), a JSON file on the strings
    // JSON.parse reads; a bd word composed from parts at runtime still reads quiet (R-COMPOSED).
    const cookedClaims = {
      flagged: [
        ["hex.mjs", 'spawnSync("b\\x64", ["update", id, "--claim"]);'],
        ["unicode.ts", 'spawnSync("\\u0062d", ["update", id, "\\u002D-claim"]);'],
        ["braced.cjs", 'spawnSync("\\u{62}d", ["update", id, "--claim"]);'],
        ["continued.js", 'spawnSync("b\\\nd", ["update", id, "--claim"]);'],
        ["package.json", '{ "scripts": { "take": "\\u0062d update fx-run.1 --claim" } }'],
        ["hooks.json", '{\n  // the hook\n  "command": "\\u0062d update fx-run.1 --claim",\n}'],
      ].map(([file = "", source = ""]) => claimsIn(source, file).length),
      quiet: [
        ["composed.mjs", 'spawnSync("b" + "d", ["update", id, "--claim"]);'],
        ["read.ts", 'spawnSync("b\\x64", ["show", id, "--json"]);'],
        ["notes.json", '{ "notes": "\\u0062d show fx-run.1 --json" }'],
      ].map(([file = "", source = ""]) => claimsIn(source, file).length),
    };
    expect(cookedClaims, "the file judge's cooked controls").toStrictEqual({ flagged: [1, 1, 1, 1, 1, 1], quiet: [0, 0, 0] });
    // The seam as TypeScript merges it (wb-dcsb F1): the checker's declared type of the reader's export in a Program over
    // tsconfig.json offers show alone, with no signature, no base and one declaration, the reader's own. Its control program adds
    // three virtual files beside src/workbench/beads-observer.ts (from memory, nothing written): a class merged through an augmenting
    // declare module (the G9 shape) and an interface merged the same way each add their member and their declaration, while a
    // same-named interface local to another module merges nothing (the precise reading the syntactic reader over-reads, SCOPE).
    const merged = mergedSeam();
    const sideBySide = (name: string): string => join(REPO, dirname(READER_MODULE), name);
    const mergedControl = mergedSeam(
      new Map([
        [sideBySide("zz-census-class-merge.ts"), 'declare module "./beads-observer.js" {\n  class BeadsReadClient {\n    claimViaClass(id: string): Promise<unknown>;\n  }\n}\nexport {};\n'],
        [sideBySide("zz-census-interface-merge.ts"), 'declare module "./beads-observer.js" {\n  interface BeadsReadClient {\n    claimViaInterface(id: string): Promise<unknown>;\n  }\n}\nexport {};\n'],
        [sideBySide("zz-census-local.ts"), selections.unmergedLocal ?? ""],
      ]),
    );
    expect(merged, "the seam as TypeScript merges it offers show alone, declared once").toStrictEqual({
      members: ["show"],
      signatures: { index: 0, call: 0, construct: 0 },
      bases: [],
      declarations: [`${READER_MODULE}:InterfaceDeclaration`],
    });
    expect(mergedControl, "the merged seam's control: a merged class and a merged interface each add their member; a local same-named interface adds none").toStrictEqual({
      members: ["claimViaClass", "claimViaInterface", "show"],
      signatures: { index: 0, call: 0, construct: 0 },
      bases: [],
      declarations: [`${READER_MODULE}:InterfaceDeclaration`, "src/workbench/zz-census-class-merge.ts:ClassDeclaration", "src/workbench/zz-census-interface-merge.ts:InterfaceDeclaration"],
    });
    return json({
      roots: roots.map(({ root, floor, anchor }) => ({ root, floor, anchor })),
      manifests: { floor: manifests.length >= ROOT_MANIFESTS.floor, anchors: manifestAnchors },
      launched,
      bound,
      controls,
      seam,
      readerSeam,
      seamControl,
      seamSpellings,
      seamSelection,
      seamClasses,
      linkControl,
      codeFiles,
      cookedClaims,
      merged,
      mergedControl,
      exports,
    });
  },
  B2: async () => {
    const reader = moduleState(textOf(join(REPO, READER_MODULE)));
    const controls = {
      flagged: [
        "let cache = new Map();",
        "const CACHE = new Map();\nfunction read(id) { CACHE.set(id, 1); }",
        "const SEEN: string[] = [];\nfunction read(id) { SEEN.push(id); }",
        "const LAST = {};\nfunction read(id) { LAST[id] = 1; }",
        "export var latest;",
        "const STATE = { reading: undefined };\nfunction read(r) { STATE.reading = r; }",
      ].map(text => {
        const state = moduleState(text);
        return state.lets.length + state.writes.length;
      }),
      quiet: [
        "const TONES = new Map([['open', 'waiting']]);\nconst tone = TONES.get('open');",
        "const LIMIT = 8;\nfunction read() { let local = 1; return local; }",
        "const KEYS = ['a', 'b'];\nconst first = KEYS[0] === 'a';",
      ].map(text => {
        const state = moduleState(text);
        return state.lets.length + state.writes.length;
      }),
    };
    expect({ lets: reader.lets, writes: reader.writes }, "the reader's module scope holds no mutable binding and writes no container").toStrictEqual({ lets: [], writes: [] });
    expect(reader.containers.length, "the scan reached the reader's module-scope containers").toBeGreaterThan(0);
    expect(controls.flagged.every(count => count > 0) && controls.quiet.every(count => count === 0), "the static judge's controls").toBe(true);
    // Dynamic: two reads of one id are two shows, each reading its own envelope and stamp.
    let shows = 0;
    const client: beadsObserver.BeadsReadClient = {
      async show(id) {
        shows += 1;
        return serve(shows === 1 ? READY : { status: "closed", deps: [] }, id);
      },
    };
    let tick = 0;
    const now = (): string => `2026-10-23T20:00:0${++tick}.000Z`;
    const first = await readThrough(client, now);
    const second = await readThrough(client, now);
    const dynamic = { shows, statuses: [first.work.status, second.work.status], observedAt: [first.observedAt, second.observedAt], freshness: [first.freshness, second.freshness] };
    expect(dynamic, "no reading is held across reads").toStrictEqual({
      shows: 2,
      statuses: ["in_progress", "closed"],
      observedAt: ["2026-10-23T20:00:01.000Z", "2026-10-23T20:00:02.000Z"],
      freshness: ["current", "current"],
    });
    return json({ reader, controls, dynamic });
  },
  B3: async () => {
    const walked = judgedFilesBelow(IMPORT_ROOTS);
    const importers = importersIn(walked, "beads-observer");
    const floor = importersOf("redaction", ["src"]);
    const controls = {
      flagged: [
        'import {readBeadsWork} from "./beads-observer.js";',
        "import * as beads from '../src/workbench/beads-observer.ts';",
        'export {readBeadsWork} from "./beads-observer.js";',
        'import type {BeadsWorkReading} from "../workbench/beads-observer";',
        'const beads = require("./beads-observer.js");',
        'const beads = await import("./beads-observer.mjs");',
        "const beads = await import(`./beads-observer.js`);",
        "const beads = require(`../workbench/beads-observer.js`);",
        // wb-dugi F2: past a comment (the wb-xogu gate's P11) and before a second argument (its P11b); past a line comment to a
        // trailing comma, through a parenthesized specifier, past a comment before the require or the import call's parenthesis,
        // and in the static and re-export forms past a block or a line comment.
        'const beads = await import(/* reader */ "./beads-observer.js");',
        'export const loadReader = () => import("../../src/workbench/beads-observer.js", {});',
        "const beads = await import(\n  // the reader\n  './beads-observer.js',\n);",
        "const beads = await import(('./beads-observer.js'));",
        'const beads = require /* the reader */ (/* its module */ "./beads-observer.js");',
        "const beads = await import /* the reader */ ('./beads-observer.js');",
        'import /* the reader */ * as beads from /* its module */ "./beads-observer.js";',
        "export * from // the reader\n  './beads-observer.js';",
      ].map(text => fileImportsOf(text, "module.ts").filter(specifier => namesModule(specifier, "beads-observer")).length),
      quiet: [
        'import {sanitizeWorkbenchText} from "./redaction.js";',
        "// beads-observer.js stays a reader",
        'import {notes} from "./beads-observer-notes.js";',
        'import {x} from "./my-beads-observer.js";',
        "const notes = await import(`./beads-observer-notes.js`);",
        // wb-dugi F2: a comment is read past, never read as the specifier, and ends at its first closing delimiter (never running
        // on to a later comment's, past code, to a specifier-shaped string after the first argument).
        'const redaction = await import(/* "./beads-observer.js" */ "./redaction.js");',
        "const loaded = await import(/* ./beads-observer.js */ loaderPath);",
        "const loaded = await import(/* a */ loaderPath, /* b */ './beads-observer.js');",
      ].map(text => fileImportsOf(text, "module.ts").filter(specifier => namesModule(specifier, "beads-observer")).length),
    };
    const bound = BEAD_EXECUTORS.map(binding => binding.module);
    expect(importers, "a file under the import roots importing the Beads reader").toEqual([]);
    expect(importers.filter(module => !bound.includes(module)), "an importer not bound in BEAD_EXECUTORS").toEqual([]);
    expect(floor, "the same matcher finds the reader's own import of redaction.ts").toContain(READER_MODULE);
    expect(controls.flagged.every(count => count === 1) && controls.quiet.every(count => count === 0), "the import matcher's controls").toBe(true);
    // The import matcher's parser controls (wb-dcsb F2 and F3): the gate's G1-G7 - a specifier spelled through a unicode or hex
    // escape or a string line continuation, a require spelled through an identifier escape, a query or fragment suffix, a
    // percent-encoded character, and a line comment ended by a carriage return, a line separator or a paragraph separator - read
    // as Node reads them, as do an import type, an import-equals require, a require call through parentheses, a comma, an
    // optional call or a member named require, and a triple-slash reference (path or types) or AMD dependency; require.resolve
    // loads nothing and reads quiet.
    const readerSpecifiers = (file: string, source: string): number => fileImportsOf(source, file).filter(specifier => namesModule(specifier, "beads-observer")).length;
    const parserImports = Object.fromEntries(
      Object.entries({
        unicodeEscape: ["zz-reexport.ts", 'export { readBeadsWork } from "./beads\\u002Dobserver.js";'],
        bracedEscape: ["zz-braced.ts", 'import { readBeadsWork } from "./beads\\u{2D}observer.js";'],
        hexEscape: ["zz-loader.mjs", 'const beads = await import("../../src/workbench/beads\\x2Dobserver.js");'],
        identifierEscape: ["zz-require.cjs", 'const beads = requ\\u0069re("./beads-observer.js");'],
        lineContinuation: ["zz-continued.cjs", 'const beads = require("./beads-obs\\\nerver.js");'],
        querySuffix: ["zz-query.mjs", 'const beads = await import("../../src/workbench/beads-observer.js?fresh");'],
        fragmentSuffix: ["zz-fragment.mjs", 'const beads = await import("./beads-observer.js#reader");'],
        percentEncoded: ["zz-percent.mjs", 'const beads = await import("./beads%2Dobserver.js");'],
        carriageReturn: ["zz-cr.mjs", 'const beads = await import(// the reader\r"./beads-observer.js");'],
        lineSeparator: ["zz-ls.mjs", `const beads = await import(// the reader${String.fromCodePoint(0x2028)}"./beads-observer.js");`],
        paragraphSeparator: ["zz-ps.mjs", `const beads = await import(// the reader${String.fromCodePoint(0x2029)}"./beads-observer.js");`],
        importType: ["zz-type.ts", 'type Reading = import("./beads-observer.js").BeadsWorkReading;'],
        importEquals: ["zz-equals.ts", 'import beads = require("./beads-observer.js");'],
        parenthesizedCallee: ["zz-paren.cjs", 'const beads = (require)("./beads-observer.js");'],
        commaCallee: ["zz-comma.cjs", 'const beads = (0, require)("./beads-observer.js");'],
        optionalCall: ["zz-optional.cjs", 'const beads = require?.("./beads-observer.js");'],
        memberRequire: ["zz-member.cjs", 'const beads = module["require"]("./beads-observer.js");'],
        referencePath: ["zz-reference.ts", '/// <reference path="./beads-observer.ts" />\nexport {};\n'],
        referenceTypes: ["zz-types.ts", '/// <reference types="../workbench/beads-observer" />\nexport {};\n'],
        amdDependency: ["zz-amd.ts", '/// <amd-dependency path="./beads-observer.js" />\nexport {};\n'],
        resolveOnly: ["zz-resolve.cjs", 'const where = require.resolve("./beads-observer.js");'],
      }).map(([name, [file = "", source = ""]]) => [name, readerSpecifiers(file, source)]),
    );
    expect(parserImports, "the import matcher's parser controls").toStrictEqual({
      unicodeEscape: 1,
      bracedEscape: 1,
      hexEscape: 1,
      identifierEscape: 1,
      lineContinuation: 1,
      querySuffix: 1,
      fragmentSuffix: 1,
      percentEncoded: 1,
      carriageReturn: 1,
      lineSeparator: 1,
      paragraphSeparator: 1,
      importType: 1,
      importEquals: 1,
      parenthesizedCallee: 1,
      commaCallee: 1,
      optionalCall: 1,
      memberRequire: 1,
      referencePath: 1,
      referenceTypes: 1,
      amdDependency: 1,
      resolveOnly: 0,
    });
    // A readiness read outside the seam: no file under the import roots but the reader spells a bd read verb (code or not, wb-38nd F2).
    const bypass = bypassIn(walked);
    const seamReads = readsIn(textOf(join(REPO, READER_MODULE)), READER_MODULE).length > 0;
    const readControls = {
      // The last flagged control is the disclosed OVER-READ (wb-xogu F7): prose naming a read verb reds the judge, as in B1.
      flagged: [
        "bd show fx-run.1 --json",
        'spawnSync("bd", ["ready", "--json"])',
        "execFileSync('bd', ['list', '--status', 'open'])",
        "bd blocked --json",
        "// Operators inspect the queue with bd list --status open before a run.",
      ].map(text => bdReadsIn(text).length),
      quiet: ["bd init --non-interactive --prefix fx", "bd codex-hook SessionStart", "showReady(list)"].map(text => bdReadsIn(text).length),
    };
    expect(bypass, "a file reading bd readiness outside the seam").toEqual([]);
    expect(seamReads, "the same judge reads the seam's own bd show").toBe(true);
    expect(readControls.flagged.every(count => count > 0) && readControls.quiet.every(count => count === 0), "the read judge's controls").toBe(true);
    // The read judge's cooked controls (wb-dcsb, the F2 class at B3's second judge): an escaped bd word or read verb in a code file
    // reads; one composed from parts at runtime reads quiet (R-COMPOSED).
    const cookedReads = {
      flagged: [
        ["hex.mjs", 'spawnSync("b\\x64", ["show", id, "--json"]);'],
        ["verb.ts", 'execFileSync("bd", ["\\u0072eady", "--json"]);'],
      ].map(([file = "", source = ""]) => readsIn(source, file).length),
      quiet: [["composed.mjs", 'spawnSync("b" + "d", ["show", id]);']].map(([file = "", source = ""]) => readsIn(source, file).length),
    };
    expect(cookedReads, "the read judge's cooked controls").toStrictEqual({ flagged: [1, 1], quiet: [0] });
    // wb-38nd F2: both judges read every file under the import roots. The gate's L2 (a shell script whose node eval imports the
    // reader) and L1 (a shell script spelling bd ready) red them, as do a JSON string read cooked and a document spelling an import
    // form or a read (the disclosed OVER-READ); a script and a document naming neither read quiet.
    const nonCode = {
      importers: importersIn(
        [
          {
            path: "qa/workbench/zz-gate-eval.sh",
            text: "node --input-type=module -e \"const { readBeadsWork } = await import('./dist/workbench/beads-observer.js'); console.log(typeof readBeadsWork);\"\n",
          },
          { path: "qa/workbench/zz-gate-probe.json", text: '{ "probe": "node -e \\"import(\\u0027./src/workbench/beads-observer.js\\u0027)\\"" }\n' },
          { path: "examples/zz-reader.md", text: "```js\nimport { readBeadsWork } from './beads-observer.js';\n```\n" },
          { path: "qa/workbench/zz-quiet.sh", text: "node qa/workbench/smoke.mjs\n" },
          { path: "examples/zz-quiet.md", text: "The beads-observer module stays a reader.\n" },
        ],
        "beads-observer",
      ),
      reads: bypassIn([
        { path: "qa/workbench/zz-gate-ready.sh", text: "bd ready --json\n" },
        { path: "qa/workbench/zz-gate-show.json", text: '{ "probe": "\\u0062d show fx-run.1 --json" }\n' },
        { path: "examples/zz-queue.md", text: "Inspect the queue with `bd list --status open` first.\n" },
        { path: "qa/workbench/zz-quiet.sh", text: "bd init --non-interactive --prefix fx\n" },
        { path: "examples/zz-quiet.md", text: "The queue stays in Beads.\n" },
      ]),
    };
    expect(nonCode, "the non-code controls: a script, a JSON string and a document naming the reader or a read red B3; the rest read quiet").toStrictEqual({
      importers: ["qa/workbench/zz-gate-eval.sh", "qa/workbench/zz-gate-probe.json", "examples/zz-reader.md"],
      reads: ["qa/workbench/zz-gate-ready.sh", "qa/workbench/zz-gate-show.json", "examples/zz-queue.md"],
    });
    // The walk reaches the non-code files both judges now read: a floor below today's count, and an anchor read and quiet.
    const anchorQuiet = (file: JudgedFile): boolean =>
      file.text.includes(IMPORT_NON_CODE.anchorToken) && importersIn([file], "beads-observer").length === 0 && bypassIn([file]).length === 0;
    const nonCodeWalk = {
      floor: walked.filter(file => !CODE_FILE.test(file.path)).length >= IMPORT_NON_CODE.floor,
      anchor: walked.some(file => file.path === IMPORT_NON_CODE.anchorFile && anchorQuiet(file)),
    };
    expect(nonCodeWalk, "the walk's non-code floor and anchor").toStrictEqual({ floor: true, anchor: true });
    return json({ importers, bound, readerImportsRedaction: floor.includes(READER_MODULE), controls, parserImports, bypass, seamReads, readControls, cookedReads, nonCode, nonCodeWalk });
  },
  B4: async () => {
    const step = judgeStep(ROSTER.generation.claimStep.text);
    expect(step.reads.length, "two bd show reads in the claim step").toBe(2);
    expect(readsBeforeExecuting(step), "read and requirement, then claim-lock, then the claim write, then a re-read, then execution; no close").toBe(true);
    const dropped = judgeStep(ROSTER.generation.claimStep.text.replace("verify with bd show", "verify"));
    const unordered = judgeStep(ROSTER.generation.claimStep.text.replace(FILED_GENERATION_FACT, "the bead is open"));
    expect([readsBeforeExecuting(dropped), readsBeforeExecuting(unordered)], "the verdict's controls: no re-read, no first read").toEqual([false, false]);
    return json({ step, controls: { droppedReread: readsBeforeExecuting(dropped), droppedFirstRead: readsBeforeExecuting(unordered) } });
  },
  C1: async () => {
    const stale = MUTANTS["STALE-CLAIM"];
    expect(stale, "STALE-CLAIM is a mutant").toBeDefined();
    const records = stale === undefined ? [] : await recordsOf(stale.run, ["A1", "A2"]);
    const executedNoLongerReady = records.filter(record => record.native > 0).map(record => record.case);
    const freshShows = records.map(record => record.log.slice(record.log.indexOf(CLAIMED) + 1).filter(entry => entry.startsWith("show ")).length);
    expect(executedNoLongerReady, "STALE-CLAIM runs the native verb on every A1 and A2 case").toEqual(EXEC_CASES.filter(entry => entry.clause === "A1" || entry.clause === "A2").map(entry => entry.id));
    expect(freshShows, "STALE-CLAIM never re-reads after the claim").toEqual(records.map(() => 0));
    expect(records.some(meets), "no A1 or A2 case met").toBe(false);
    return json({ executedNoLongerReady, freshShows, summaries: records.map(record => record.summary) });
  },
  C2: async () => {
    const reference = await recordsOf(honest);
    expect(reference.every(meets), "honest meets every case").toBe(true);
    const brokenBy: Record<string, string[]> = {};
    for (const [name, mutant] of Object.entries(MUTANTS)) {
      const broken = (await recordsOf(mutant.run)).filter(record => !meets(record));
      expect(broken.length, `${name} breaks a case`).toBeGreaterThan(0);
      expect(broken.some(record => mutant.clauses.includes(caseNamed(record.case).clause)), `${name} breaks a case of its own clause`).toBe(true);
      // Each broken case with what the mutant did there: its outcome, then its fresh shows and native verbs after the claim.
      brokenBy[name] = broken.map(record => {
        const after = record.log.slice(record.log.indexOf(CLAIMED) + 1);
        return `${record.case}: ${record.summary} / ${after.map(entry => entry.split(" ")[0]).join(",") || "nothing"} / counted ${record.refusals}`;
      });
    }
    return json({ honest: reference.filter(record => !meets(record)).map(record => record.case), brokenBy });
  },
  C3: async () => {
    const meetsAll = async (run: Executor): Promise<boolean> => (await recordsOf(run)).every(meets);
    const bound: Record<string, boolean> = {};
    for (const binding of BEAD_EXECUTORS) bound[binding.module] = await meetsAll(binding.run);
    const stale = MUTANTS["STALE-CLAIM"];
    const control = { honest: await meetsAll(honest), staleClaim: stale === undefined ? true : await meetsAll(stale.run) };
    expect(Object.values(bound).every(Boolean), "every bound executor meets every case").toBe(true);
    expect(control, "the check's control: honest meets, STALE-CLAIM does not").toStrictEqual({ honest: true, staleClaim: false });
    return json({ bound, control });
  },
  Q1: async () => {
    const resume = judgeStep(ROSTER.generation.resume.text);
    const claim = judgeStep(ROSTER.generation.claimStep.text);
    const quiet = { reads: resume.reads.length, requires: resume.requires.length, skipsClaim: resume.skipsClaim, claimStepReads: claim.reads.length, claimStepRequires: claim.requires.length };
    expect(quiet, "the RESUME clause skips the claim step, which alone spells the read and the requirement").toStrictEqual({ reads: 0, requires: 0, skipsClaim: true, claimStepReads: 2, claimStepRequires: 1 });
    return json(quiet);
  },
  Q2: async () => {
    const entry: ExecCase = { id: "claim passed to another holder", clause: "A3", claimed: READY, fresh: { status: "in_progress", deps: [], assignee: "another-holder" }, expect: "executed" };
    const record = await runCase(honest, entry);
    const reading = await readThrough({ show: async id => serve({ status: "in_progress", deps: [], assignee: "another-holder" }, id) });
    const quiet = { summary: record.summary, native: record.native, workFields: Object.keys(reading.work).sort(), holderSeen: JSON.stringify(reading).includes("another-holder") };
    expect(quiet, "the reader keeps no assignee and honest runs the task").toStrictEqual({
      summary: "executed",
      native: 1,
      workFields: ["closeReasonPresent", "issueType", "priority", "status", "title"],
      holderSeen: false,
    });
    return json(quiet);
  },
  Q3: async () => {
    let shows = 0;
    let store = "in_progress";
    let storeAtNative = "";
    const client: beadsObserver.BeadsReadClient = {
      async show(id) {
        shows += 1;
        const served = serve({ status: store, deps: [] }, id);
        if (shows === 2) store = "closed";
        return served;
      },
    };
    const reading = await readThrough(client);
    const refusals: Outcome[] = [];
    const outcome = await honest({ workId: WORK_ID, reading }, {
      client,
      refusals,
      async native() {
        storeAtNative = store;
      },
    });
    const quiet = { summary: summaryOf(outcome), shows, storeAtNative, refusals: refusals.length };
    expect(quiet, "a close landing after the re-read is not seen").toStrictEqual({ summary: "executed", shows: 2, storeAtNative: "closed", refusals: 0 });
    return json(quiet);
  },
  Q4: async () => {
    const quiet = [
      'const tool = ["b", "d"].join("");\nspawnSync(tool, ["update", id, "--claim"]);',
      'const flag = "--claim";\nspawnSync("bd", ["update", id, flag]);',
      `bd ${"x ".repeat(CLAIM_WINDOW)}claim`,
      // wb-xogu F3: a bd word held in a named constant and spawned past the window from its declaration.
      'const BEADS_CLI = "bd";\nconst TIMEOUT_MS = 30_000;\nconst RETRIES = 3;\nconst ATTEMPT_LIMIT = 5;\nfunction claimTask(id) {\n  return spawnSync(BEADS_CLI, ["update", id, "--claim"], { timeout: TIMEOUT_MS * RETRIES });\n}',
    ].map(text => claimLaunchesIn(text).length);
    const edge = claimLaunchesIn(`bd ${"x ".repeat(CLAIM_WINDOW - 1)}claim`).length;
    // The same family at B3: an import specifier composed at runtime names no module the matcher can read.
    const composedImport = importsOf(`const stem = "beads-observer";\nconst beads = await import(\`./\${stem}.js\`);`).filter(specifier => namesModule(specifier, "beads-observer")).length;
    // wb-dugi F2: a specifier concatenated, selected by a condition or held in a named constant, and one passed to the require
    // createRequire returns (on the spot, or through a binding not named require) - each names no module the matcher reads; the
    // loader's control: bound to the name require, the same call reads (B3 reads the require form).
    const readerImports = (text: string): number => importsOf(text).filter(specifier => namesModule(specifier, "beads-observer")).length;
    const runtimeImports = Object.fromEntries(
      Object.entries({
        concatenated: 'const beads = await import("./beads-" + "observer.js");',
        selected: 'const beads = await import(useReader ? "./beads-observer.js" : "./redaction.js");',
        held: 'const READER = "./beads-observer.js";\nconst beads = await import(READER);',
        loaderCall: 'const beads = createRequire(import.meta.url)("./beads-observer.js");',
        loaderBinding: 'const load = createRequire(import.meta.url);\nconst beads = load("./beads-observer.js");',
      }).map(([name, text]) => [name, readerImports(text)]),
    );
    const loaderControl = readerImports('const require = createRequire(import.meta.url);\nconst beads = require("./beads-observer.js");');
    // wb-dcsb: what the parser reading leaves to the same family. A module loaded through any API but the import, export, import(),
    // import type and require forms - require reached through call or apply, a Worker over the reader's URL, a package imports-map
    // alias - names no module the matcher reads; and a bd word spelled through a non-code, non-JSON file's own quoting or escapes
    // (a shell script's adjacent quotes or backslash, a YAML or TOML string escape) reads quiet in B1's file judge, which cooks
    // only code and JSON.
    const indirectLoads = Object.fromEntries(
      Object.entries({
        requireCall: ["zz-call.cjs", 'const beads = require.call(null, "./beads-observer.js");'],
        worker: ["zz-worker.mjs", 'const worker = new Worker(new URL("./beads-observer.js", import.meta.url));'],
        importsMap: ["zz-alias.mjs", 'const beads = await import("#beads-reader");'],
      }).map(([name, [file = "", source = ""]]) => [name, importsOf(source, file).filter(specifier => namesModule(specifier, "beads-observer")).length]),
    );
    const otherSyntaxes = {
      shellQuotes: claimsIn("#!/bin/sh\nb''d update \"$1\" --claim\n", ".beads/hooks/post-merge").length,
      shellBackslash: claimsIn('#!/bin/sh\nb\\d update "$1" --claim\n', "qa/workbench/zz-claim.sh").length,
      yamlEscape: claimsIn('run: "\\x62d update fx-run.1 --claim"\n', ".github/workflows/zz-claim.yml").length,
      tomlEscape: claimsIn('[build.commands]\nclaim = "\\u0062d update fx-run.1 --claim"\n', "forge.toml").length,
    };
    expect({ indirectLoads, otherSyntaxes }, "indirect loaders and other files' own quoting and escapes read quiet").toStrictEqual({
      indirectLoads: { requireCall: 0, worker: 0, importsMap: 0 },
      otherSyntaxes: { shellQuotes: 0, shellBackslash: 0, yamlEscape: 0, tomlEscape: 0 },
    });
    // wb-38nd F2: B3 reads such a file raw only as well, so the same family reaches its judges - a readiness read whose bd word or
    // read verb a shell script's adjacent quotes split, a specifier spelled through a JavaScript escape inside a shell script's node
    // eval, and a readiness read through a YAML string escape read quiet, while the same read and specifier spelled plainly read
    // (the controls).
    const rawOnlyB3 = {
      shellQuotesRead: bypassIn([{ path: "qa/workbench/zz-ready.sh", text: "#!/bin/sh\nb''d ready --json\n" }]).length,
      shellQuotesVerb: bypassIn([{ path: "qa/workbench/zz-ready.sh", text: "#!/bin/sh\nbd re''ady --json\n" }]).length,
      evalEscapedSpecifier: importersIn([{ path: "qa/workbench/zz-eval.sh", text: "node --input-type=module -e \"await import('./dist/workbench/beads\\-observer.js')\"\n" }], "beads-observer").length,
      yamlEscapeRead: bypassIn([{ path: "qa/workbench/zz-ready.yml", text: 'run: "\\x62d ready --json"\n' }]).length,
      plainRead: bypassIn([{ path: "qa/workbench/zz-ready.sh", text: "#!/bin/sh\nbd ready --json\n" }]).length,
      plainSpecifier: importersIn([{ path: "qa/workbench/zz-eval.sh", text: "node --input-type=module -e \"await import('./dist/workbench/beads-observer.js')\"\n" }], "beads-observer").length,
    };
    expect(rawOnlyB3, "a raw-only file's own quoting and escapes read quiet at B3's judges; the plain spellings read").toStrictEqual({
      shellQuotesRead: 0,
      shellQuotesVerb: 0,
      evalEscapedSpecifier: 0,
      yamlEscapeRead: 0,
      plainRead: 1,
      plainSpecifier: 1,
    });
    expect(
      { quiet, edge, composedImport, runtimeImports, loaderControl },
      "composed, held and far claims read quiet; the window's last word still counts; composed, selected, held and loader-passed specifiers read quiet; the loader bound as require reads",
    ).toStrictEqual({
      quiet: [0, 0, 0, 0],
      edge: 1,
      composedImport: 0,
      runtimeImports: { concatenated: 0, selected: 0, held: 0, loaderCall: 0, loaderBinding: 0 },
      loaderControl: 1,
    });
    return json({ quiet, edge, composedImport, runtimeImports, loaderControl, indirectLoads, otherSyntaxes, composedControl: claimLaunchesIn(compose("bd", "update", WORK_ID, "--claim")).length, rawOnlyB3 });
  },
  Q5: async () => {
    const files = INSTRUCTION_FILES.map(file => ({ file, claims: claimLaunchesIn(renderedOf(textOf(join(REPO, file)))).length > 0, scanned: scannedByB1(file) }));
    expect(files, "each instruction file teaches a claim and lies outside every scanned root").toStrictEqual(INSTRUCTION_FILES.map(file => ({ file, claims: true, scanned: false })));
    // wb-xogu F6: a claim inside an HTML comment teaches nothing - the reading's control, beside the same text uncommented.
    const hidden = "Claim work:\n<!--\nbd update <id> --claim\n-->\nthen run it.";
    const controls = { hidden: claimLaunchesIn(renderedOf(hidden)).length, shown: claimLaunchesIn(renderedOf(hidden.replace("<!--", "").replace("-->", ""))).length };
    expect(controls, "a claim inside an HTML comment reads quiet; the same claim uncommented reads").toStrictEqual({ hidden: 0, shown: 1 });
    // wb-dugi F4 and F3, read as marked renders them: code renders literally, so a comment inside a backtick or tilde fence (the
    // wb-xogu gate's P13 shape), a fence in a list item, an indented block or an inline span hides nothing, an escaped character
    // (a named, decimal or hex reference) reads as the one the page shows, a reference past the last code point and an unknown name
    // show as written, and an HTML element's text shows; a link reference definition (its P12 shape), a link's title, an
    // attribute, a comment around a whole fence, an inline comment past a '>', an unclosed comment, and a script, style or template
    // body show nothing.
    const rendering: Readonly<Record<string, string>> = {
      fencedComment: "Claim work:\n\n```bash\n<!-- bd update <id> --claim -->\n```\n",
      tildeFencedComment: "Claim work:\n\n~~~\n<!-- bd update <id> --claim -->\n~~~\n",
      listFencedComment: "1. Claim work:\n\n   ```bash\n   <!-- bd update <id> --claim -->\n   ```\n",
      indentedComment: "Claim work:\n\n    <!-- bd update <id> --claim -->\n",
      inlineCodeComment: "Claim with `<!-- bd update <id> --claim -->` first.",
      escapedWindow: "Claim with `bd update <a> <b> <c> --claim` first.",
      escapedQuotes: "Claim with `bd update 'a' 'b' 'c' --claim` first.",
      hexEncoded: "Claim with &#x62;&#x64; update fx-run.1 --claim first.",
      outOfRange: "Claim &#9999999; with bd update fx-run.1 --claim first.",
      unknownEntities: "Claim with bd &zz; &zz; &zz; &zz; &zz; &zz; &zz; update fx-run.1 --claim first.",
      elementText: "<div>\nbd update fx-run.1 --claim\n</div>\n",
      linkDefinition: 'Read the docs.\n\n[beads-claim]: <https://example.invalid/beads> "bd update <id> --claim"\n',
      linkTitle: '[the queue](https://example.invalid "bd update <id> --claim")',
      attribute: '<div title="bd update fx-run.1 --claim"></div>\n',
      commentAroundFence: "<!--\n```bash\ncd repo >/dev/null\nbd update fx-run.1 --claim\n```\n-->\n",
      inlineComment: "Run <!-- a > b: bd update fx-run.1 --claim --> it.",
      unclosedComment: "Claim work:\n\n<!-- maintainers only\n\nbd update fx-run.1 --claim\n",
      scriptBody: "<script>\nbd update fx-run.1 --claim\n</script>\n",
      styleBody: "<style>\nbd update fx-run.1 --claim\n</style>\n",
      templateBody: "<template>\nbd update fx-run.1 --claim\n</template>\n",
    };
    const renderedClaims = Object.fromEntries(Object.entries(rendering).map(([name, text]) => [name, claimLaunchesIn(renderedOf(text)).length]));
    expect(renderedClaims, "the rendering controls: code shows its text literally; a definition, a title, an attribute and a hidden comment show nothing").toStrictEqual({
      fencedComment: 1,
      tildeFencedComment: 1,
      listFencedComment: 1,
      indentedComment: 1,
      inlineCodeComment: 1,
      escapedWindow: 1,
      escapedQuotes: 1,
      hexEncoded: 1,
      outOfRange: 1,
      unknownEntities: 0,
      elementText: 1,
      linkDefinition: 0,
      linkTitle: 0,
      attribute: 0,
      commentAroundFence: 0,
      inlineComment: 0,
      unclosedComment: 0,
      scriptBody: 0,
      styleBody: 0,
      templateBody: 0,
    });
    // wb-dcsb F4: the gate's G10-G12 - an element carrying the hidden attribute, an attribute value holding a '>', an unclosed
    // script element - and the rest of visibleTextOf's reading. Hidden: an element carrying the hidden (any value) or the popover
    // attribute, to its matching end tag (nested same-name elements counted; a self-closing slash closes nothing); a dialog and a
    // details element that are not open; a title; a video's, an object's fallback; a select's options; svg content; a bdo; a tag
    // the document ends inside. Unjudged, the whole page shows nothing: a script (an element, closed or not, an event-handler
    // attribute), CSS (a style element or attribute, a stylesheet link, its rel read with references decoded), a meta refresh, a
    // hidden body start tag (wherever it sits), a bidi override in the shown text. Shown, the controls: the text after a hidden
    // element's end tag, an open dialog's and an open details element's, a textarea's, a script inside a comment or a textarea, a
    // link that is not a stylesheet.
    const renderingF4: Readonly<Record<string, string>> = {
      hiddenAttribute: "<div hidden>bd update fx-1 --claim</div>\n",
      hiddenUntilFound: '<div hidden="until-found">bd update fx-1 --claim</div>\n',
      hiddenNested: "<div hidden>\n<div>context</div>\n<p>bd update fx-1 --claim</p>\n</div>\n",
      hiddenSelfClosing: "<div hidden/>\nbd update fx-1 --claim\n",
      popoverElement: "<div popover>bd update fx-1 --claim</div>\n",
      attributeGt: '<div title="a > b: bd update fx-1 --claim"></div>\n',
      attributeGtSingle: "<div title='a > b: bd update fx-1 --claim'></div>\n",
      unclosedTag: '<div title="bd update fx-1 --claim\n',
      closedDialog: "<dialog>bd update fx-1 --claim</dialog>\n",
      closedDetails: "<details><summary>more</summary>bd update fx-1 --claim</details>\n",
      titleElement: "<title>bd update fx-1 --claim</title>\n",
      videoFallback: '<video src="x.webm">bd update fx-1 --claim</video>\n',
      objectFallback: '<object data="x.svg">bd update fx-1 --claim</object>\n',
      selectOption: "<select><option>first</option><option>bd update fx-1 --claim</option></select>\n",
      svgContent: "<svg><text>bd update fx-1 --claim</text></svg>\n",
      bdoElement: '<bdo dir="rtl">bd update fx-1 --claim</bdo>\n',
      unclosedScript: "<script>\nbd update fx-1 --claim\n",
      scriptEscaped: "<script><!--<script></script>bd update fx-1 --claim</script>\n",
      afterScript: "<script>context</script>\n\nbd update fx-1 --claim\n",
      eventHandler: '<img src="x.png" onerror="this.remove()">\n\nbd update fx-1 --claim\n',
      styleElement: "<style>p { color: red }</style>\n\nbd update fx-1 --claim\n",
      styleAttribute: '<div style="display:none">bd update fx-1 --claim</div>\n',
      stylesheetLink: '<link rel="style&#115;heet" href="x.css">\n\nbd update fx-1 --claim\n',
      metaRefresh: '<meta http-equiv="refresh" content="0; url=x">\n\nbd update fx-1 --claim\n',
      hiddenBody: "bd update fx-1 --claim\n\n<body hidden>\n",
      bidiOverride: "&#x202E;bd update fx-1 --claim\n",
      afterHidden: "<div hidden>context</div>\n\nbd update fx-1 --claim\n",
      openDialog: "<dialog open>bd update fx-1 --claim</dialog>\n",
      openDetails: "<details open><summary>more</summary>bd update fx-1 --claim</details>\n",
      textareaText: "<textarea>bd update fx-1 --claim</textarea>\n",
      commentedScript: "<!-- <script> -->\n\nbd update fx-1 --claim\n",
      textareaScript: "<textarea><script></textarea>\n\nbd update fx-1 --claim\n",
      otherLink: '<link rel="icon" href="x.ico">\n\nbd update fx-1 --claim\n',
    };
    const renderedF4 = Object.fromEntries(Object.entries(renderingF4).map(([name, source]) => [name, claimLaunchesIn(renderedOf(source)).length]));
    expect(renderedF4, "the F4 rendering controls: hidden content and unjudged pages show nothing; the shown controls show").toStrictEqual({
      hiddenAttribute: 0,
      hiddenUntilFound: 0,
      hiddenNested: 0,
      hiddenSelfClosing: 0,
      popoverElement: 0,
      attributeGt: 0,
      attributeGtSingle: 0,
      unclosedTag: 0,
      closedDialog: 0,
      closedDetails: 0,
      titleElement: 0,
      videoFallback: 0,
      objectFallback: 0,
      selectOption: 0,
      svgContent: 0,
      bdoElement: 0,
      unclosedScript: 0,
      scriptEscaped: 0,
      afterScript: 0,
      eventHandler: 0,
      styleElement: 0,
      styleAttribute: 0,
      stylesheetLink: 0,
      metaRefresh: 0,
      hiddenBody: 0,
      bidiOverride: 0,
      afterHidden: 1,
      openDialog: 1,
      openDetails: 1,
      textareaText: 1,
      commentedScript: 1,
      textareaScript: 1,
      otherLink: 1,
    });
    // wb-dcsb: what the reading does not model. R-INSTRUCTION's quiet row: presentation outside CSS - a presentational colour
    // attribute that may match the page - reads as shown. And the over-hide SCOPE discloses: an element the parser closes early
    // (a hidden p before a block start tag) hides here to its end tag, and a closed details element's summary, which a browser
    // shows, hides here with the body.
    const unmodeled: Readonly<Record<string, string>> = {
      presentationalColour: '<font color="white">bd update fx-1 --claim</font>\n',
      impliedEnd: "<p hidden>context<div>bd update fx-1 --claim</div>\n",
      closedSummary: "<details><summary>bd update fx-1 --claim</summary>more</details>\n",
    };
    const unmodeledClaims = Object.fromEntries(Object.entries(unmodeled).map(([name, source]) => [name, claimLaunchesIn(renderedOf(source)).length]));
    expect(unmodeledClaims, "the unmodeled rendering: a presentational colour reads as shown; an implied end tag and a closed summary over-hide").toStrictEqual({
      presentationalColour: 1,
      impliedEnd: 0,
      closedSummary: 0,
    });
    // wb-38nd F1: the tree builder's reconstruction. A formatting element carrying the hidden or the popover attribute, left open
    // across a paragraph's end tag (the gate's L3 plant, for each of FORMATTING_ELEMENTS) or a division's, is re-opened around the
    // text after it, as is an inner one its formatting parent's end tag closes, one re-opened before another formatting element's
    // start tag, one re-opened around an xmp's or a plaintext's body, an outer one an end tag of its name leaves open when the end
    // tag removes a waiting inner one (before text and before a textarea, whose body is not re-opened around), and an outer one an
    // inner same-named one's end tag leaves listed - each shows nothing. Shown, the controls: the gate's L3c span (not a formatting
    // element: the paragraph's end tag ends it), a formatting element ended by its own end tag inside the paragraph, after it, or
    // after it was re-opened once, one that hides nothing, and a textarea's body, which the tree builder inserts without re-opening.
    const leftOpen = (element: string, attribute = "hidden"): string => `<p><${element} ${attribute}>Note.</p>\n\nbd update fx-1 --claim\n`;
    const reconstruction: Readonly<Record<string, string>> = {
      ...Object.fromEntries(FORMATTING_ELEMENTS.map(element => [`leftOpen:${element}`, leftOpen(element)])),
      popover: leftOpen("b", "popover"),
      acrossDivision: "<div><i hidden>Note.</div>\n\nbd update fx-1 --claim\n",
      innerFormatting: "<p><b><i hidden>Note.</b> bd update fx-1 --claim</p>\n",
      beforeFormatting: "<p><b hidden>Note.</p><i>bd update fx-1 --claim</i>\n",
      xmpBody: "<p><b hidden>Note.</p><xmp>bd update fx-1 --claim</xmp>\n",
      plaintextBody: "<p><b hidden>Note.</p><plaintext>bd update fx-1 --claim\n",
      endedWaiting: "<div><b hidden><p><b>Note.</p></b> bd update fx-1 --claim</div>\n",
      endedWaitingRaw: "<div><b hidden><p><b>Note.</p></b><textarea>bd update fx-1 --claim</textarea></div>\n",
      nestedSameName: "<p><b hidden><b>Note.</b></p>\n\nbd update fx-1 --claim\n",
      spanControl: leftOpen("span"),
      endedInside: "<p><b hidden>Note.</b></p>\n\nbd update fx-1 --claim\n",
      endedAfter: "<p><b hidden>Note.</p>\n\n</b>\n\nbd update fx-1 --claim\n",
      endedReopened: "<p><b hidden>Note.</p>\n\n<p>context</b> bd update fx-1 --claim</p>\n",
      shownFormatting: leftOpen("b", 'title="note"'),
      textareaBody: "<p><b hidden>Note.</p><textarea>bd update fx-1 --claim</textarea>\n",
    };
    const reconstructionClaims = Object.fromEntries(Object.entries(reconstruction).map(([name, source]) => [name, claimLaunchesIn(renderedOf(source)).length]));
    expect(reconstructionClaims, "the reconstruction controls: a hiding formatting element re-opened hides the text after it; the controls show").toStrictEqual({
      "leftOpen:a": 0,
      "leftOpen:b": 0,
      "leftOpen:big": 0,
      "leftOpen:code": 0,
      "leftOpen:em": 0,
      "leftOpen:font": 0,
      "leftOpen:i": 0,
      "leftOpen:nobr": 0,
      "leftOpen:s": 0,
      "leftOpen:small": 0,
      "leftOpen:strike": 0,
      "leftOpen:strong": 0,
      "leftOpen:tt": 0,
      "leftOpen:u": 0,
      popover: 0,
      acrossDivision: 0,
      innerFormatting: 0,
      beforeFormatting: 0,
      xmpBody: 0,
      plaintextBody: 0,
      endedWaiting: 0,
      endedWaitingRaw: 0,
      nestedSameName: 0,
      spanControl: 1,
      endedInside: 1,
      endedAfter: 1,
      endedReopened: 1,
      shownFormatting: 1,
      textareaBody: 1,
    });
    // wb-38nd: what the reading leaves of the tree builder's recovery, by direction (SCOPE). In Q5's direction, over-hides (a
    // browser shows each claim): the list keeps no marker, so a hiding b is re-opened inside a table cell and a caption and outlives
    // a marquee it was opened in; a second a or nobr leaves the first open; and a b's end tag inside a span opened while the b waited
    // leaves the span open. Against it, R-INSTRUCTION's quiet rows (a browser hides each claim): an end tag the tree builder ignores
    // or applies to another element - a p's past a button, an li's past a list, a div's past a table cell, a span's past a div
    // opened inside it, a form's (it removes the form alone), a b's across a block (the furthest block) and past a marquee (its
    // marker) - ends the hiding element here, so each claim reads as shown.
    const overHide: Readonly<Record<string, string>> = {
      markerCell: "<p><b hidden>Note.</p><table><tr><td>bd update fx-1 --claim</td></tr></table>\n",
      markerCaption: "<p><b hidden>Note.</p><table><caption>bd update fx-1 --claim</caption></table>\n",
      markerMarquee: "<div><marquee><b hidden>Note.</marquee></div>\n\nbd update fx-1 --claim\n",
      secondAnchor: "<p><a hidden>Note.<a>bd update fx-1 --claim</a></a></p>\n",
      secondNobr: "<p><nobr hidden>Note.<nobr>bd update fx-1 --claim</nobr></nobr></p>\n",
      openedWhileWaiting: "<p><b hidden>Note.</p><p><span hidden>context</b>bd update fx-1 --claim</span></p>\n",
    };
    const endTagRecovery: Readonly<Record<string, string>> = {
      scopeButton: "<p hidden><button></p>bd update fx-1 --claim</button>\n",
      scopeList: "<ul><li hidden><ul></li>bd update fx-1 --claim</ul></li></ul>\n",
      scopeCell: "<div hidden><table><tr><td></div>bd update fx-1 --claim</td></tr></table></div>\n",
      specialStop: "<div><span hidden><div></span>bd update fx-1 --claim</div></div>\n",
      formEnd: "<form><span hidden>Note.</form>bd update fx-1 --claim\n",
      furthestBlock: "<b><p hidden>Note.</b>bd update fx-1 --claim</p>\n",
      pastMarker: "<b hidden><marquee>Note.</b>bd update fx-1 --claim</marquee>\n",
    };
    const overHideClaims = Object.fromEntries(Object.entries(overHide).map(([name, source]) => [name, claimLaunchesIn(renderedOf(source)).length]));
    const endTagClaims = Object.fromEntries(Object.entries(endTagRecovery).map(([name, source]) => [name, claimLaunchesIn(renderedOf(source)).length]));
    expect(
      { overHide: overHideClaims, endTagRecovery: endTagClaims },
      "the unmodeled recovery: the reconstruction's over-hides read quiet; R-INSTRUCTION's end-tag rows read as shown",
    ).toStrictEqual({
      overHide: { markerCell: 0, markerCaption: 0, markerMarquee: 0, secondAnchor: 0, secondNobr: 0, openedWhileWaiting: 0 },
      endTagRecovery: { scopeButton: 1, scopeList: 1, scopeCell: 1, specialStop: 1, formEnd: 1, furthestBlock: 1, pastMarker: 1 },
    });
    return json({
      files,
      controls,
      rendering: renderedClaims,
      hiding: renderedF4,
      unmodeled: unmodeledClaims,
      reconstruction: reconstructionClaims,
      reconstructionOverHide: overHideClaims,
      endTagRecovery: endTagClaims,
    });
  },
  Q6: async () => {
    const text = textOf(join(REPO, VC4_LAUNCHER));
    const quiet = {
      underRoot: scannedByB1(VC4_LAUNCHER),
      claims: claimLaunchesIn(text).length,
      startsRun: text.includes("'run', 'start'"),
      initsStore: text.includes("spawnSync('bd', ['init'"),
    };
    expect(quiet, "the launcher starts a Furnace Run and B1 reads no claim in it").toStrictEqual({ underRoot: true, claims: 0, startsRun: true, initsStore: true });
    return json(quiet);
  },
  Q7: async () => {
    const alias = moduleState("const CACHE = new Map();\nconst held = CACHE;\nfunction read(id, reading) { held.set(id, reading); }");
    const direct = moduleState("const CACHE = new Map();\nfunction read(id, reading) { CACHE.set(id, reading); }");
    const quiet = { aliasWrites: alias.writes.length, directWrites: direct.writes.length };
    expect(quiet, "a write through an alias escapes the static scan; the direct write does not").toStrictEqual({ aliasWrites: 0, directWrites: 1 });
    return json(quiet);
  },
  Q8: async () => {
    const generationFiles = [...SCAN_ROOTS.map(scan => scan.root), "test"].flatMap(root => filesBelow(join(REPO, root))).filter(file => file.endsWith(`/${ROSTER.generation.path.split("/").pop()}`));
    const quiet = {
      liveGenerationFiles: generationFiles.length,
      claimStepDigest: sha256(ROSTER.generation.claimStep.text) === GENERATION_DIGESTS.claimStep,
      resumeDigest: sha256(ROSTER.generation.resume.text) === GENERATION_DIGESTS.resume,
      carriedJudged: readsBeforeExecuting(judgeStep(ROSTER.generation.claimStep.text)),
    };
    expect(quiet, "the census judges the carried texts at their digests and reads no live generation").toStrictEqual({ liveGenerationFiles: 0, claimStepDigest: true, resumeDigest: true, carriedJudged: true });
    return json({ ...quiet, path: ROSTER.generation.path, blob: ROSTER.generation.blob });
  },
};

describe("wb-kku9.3 Beads claim re-check census (MW-CAC-WORKFLOW-COMPOSITION-R3)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the producer texts, the bead's notes and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:4", "C:3", "Q:8"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, programPin: PROGRAM_PIN }).toStrictEqual({ bead: ROSTER.bead, programPin: ROSTER.programPin });
    expect(constantsOf()).toStrictEqual(ROSTER.constants);
    // The producer texts: the cited line and the two generation excerpts, each held to its literal here.
    expect({ line: ROSTER.program.line, text: ROSTER.program.text }, "the cited line").toStrictEqual({ line: 13, text: PROGRAM_LINE });
    expect(ROSTER.program.citation, "the citation carries the program's design-only status").toContain("design-only");
    expect(
      { claimStep: sha256(ROSTER.generation.claimStep.text), resume: sha256(ROSTER.generation.resume.text) },
      "the carried generation texts equal their digests",
    ).toStrictEqual(GENERATION_DIGESTS);
    expect(
      { claimStep: ROSTER.generation.claimStep.sha256, resume: ROSTER.generation.resume.sha256 },
      "the roster records the same digests",
    ).toStrictEqual(GENERATION_DIGESTS);
    expect(ROSTER.generation.claimStep.text, "the claim step carries the fragment the filing quotes").toContain(FILED_GENERATION_FACT);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) expect(notes, `row ${row.id} quotes the bead's acceptance`).toContain(row.label);
    expect(
      acceptanceClauses(notes),
      "every acceptance clause the notes state is a row, in order, and rows A to C are exactly those clauses",
    ).toEqual(ROWS.filter(entry => entry.id !== "Q").map(entry => entry.label));
    // The cases against the reader's own vocabulary: every status it maps and both dependency types it edges are exercised.
    const vocabulary = readerVocabulary();
    const rows = EXEC_CASES.map(entry => entry.fresh).filter((fresh): fresh is StoreRow => !("fault" in fresh));
    expect(vocabulary, "the reader's vocabulary was read").toStrictEqual({ statuses: ["in_progress", "open", "blocked", "deferred", "closed"], edgeTypes: ["blocks", "parent-child"] });
    expect(vocabulary.statuses.filter(status => !rows.some(row => row.status === status)), "a status the reader maps that no case's re-read returns").toEqual([]);
    expect(vocabulary.edgeTypes.filter(type => !rows.some(row => row.deps.some(dep => dep.type === type))), "an edged dependency type no case's re-read carries").toEqual([]);
    // The pin set and the residual families, held to the delivery statement in the same notes (wb-xogu F8): a source outside this
    // file and the roster, so a pin or a residual family removed from both reds (the X-PIN and X-Q coordinated hollows).
    const pins = ROWS.flatMap(row => row.pins);
    expect(statedPins(notes), "the delivery statement's pin run names every pin, in row order, at its stated count").toStrictEqual({ count: pins.length, pins });
    expect(statedResiduals(notes), "the delivery statement's residual list is RESIDUALS, family by pin, in order").toEqual(
      Object.entries(RESIDUALS).flatMap(([family, members]) => members.map(member => `${family}:${member}`)),
    );
    expect(notes, "the notes quote the cited line").toContain(PROGRAM_LINE);
    expect(notes, "the notes quote the claim step's fragment").toContain(FILED_GENERATION_FACT);
    expect(notes, "the notes name the generation file").toContain(`${ROSTER.generation.path.split("/").pop()}:${ROSTER.generation.claimStep.line}`);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
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
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
