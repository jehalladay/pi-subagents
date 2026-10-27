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
 * Pi grows no H2 bead today, so the statement's trigger has not fired for a bead writer. One Pi surface reads a gate: the program
 * readiness reader (src/workbench/beads-program-readiness.ts, wb-4nut.5), which reads a gated child's gate bead through its bd
 * seams; its respin (owner ruling R727) brought it under rows A-D as the SCOPE note below requires (A4, B6, C5, D3) and re-pinned T
 * (its label, T4). The census pins the remaining absence, binds that reader and arms the acceptance for the next Pi surface:
 *  T, the trigger. T1 no walked root (PROGRAM_SCANS: src, qa, examples, .agents, .pi, .github, .codex,
 *    .beads/hooks, the tracker's own files (.beads/README.md, config.yaml, metadata.json, .gitignore; its export and interactions
 *    log omitted, R4) and the root's own files - every surface that acts or instructs an agent) names the program, a work package
 *    or an H2 bead (H2, any case, a key or the program name separated by hyphens, underscores or whitespace), and every path the
 *    git index tracks is held by a T1 root, by a named not-walked residual (NOT_WALKED: R3, R4, R12) or is binary (media/: a NUL
 *    byte, no text to judge);
 *    T2 the bd write spellings of Pi's script roots (EXEC_SCANS, Markdown excluded) are exactly WRITE_ROSTER, src holding none;
 *    T3 Pi's beads reader, driven through a recording seam with the gate's snapshot row closed and ruled in its notes, calls show
 *    alone, keeps the creation title and no description, notes, close-reason or labels, and the reference reader reads no verdict
 *    from what it keeps; T4 the walked roots' files spelling a verdict word (VERDICT_WORDS: ADOPT or REJECT, case-sensitive, at word
 *    bounds) are exactly GATE_READERS, the Pi surfaces that read a gate verdict, and this file imports every one of them (A4, B6,
 *    C5 and D3 drive it).
 *  A, acceptance (a). A1 Pi's store as its tracked export: a floor of rows read, this bead's row read, no row with a gated wp label,
 *    any wp:tsx-h2- label or an rftsx id; A2 no gate text Pi can reach reads ADOPT (no gate row in Pi's store; the producer's gate
 *    row reads no-verdict, the substring count reads ADOPT - F-1); A3 packetViolations, the guard a Pi bead machine must meet, over
 *    the producer's six rows and constructed stores; A4 the program readiness reader over the producer's six rows and the five gated
 *    packets readies no packet while the gate's text reads no ADOPT and every packet once it does (A3's gate states and B1's title
 *    and body rulings), agreeing with packetViolations in every state.
 *  B, acceptance (b). The reference reader readGateVerdict: B1 exactly one marker reads its verdict verbatim, with its field; B2 zero
 *    or two markers read no-verdict; B3 a closed bead with none - closed by status, close reason, labels or closed_at - and every
 *    near-spelling read no-verdict; B4 the judge over READER_CASES passes the reference and fails each synthesizing reader
 *    (closure, labels, close reason, substring count, first of many, case-folded); B5 the creation title and every listed
 *    alternative form read no-verdict while the substring count reads ADOPT; B6 the program readiness reader's gate verdict, driven
 *    through its bd seams: the judge over READER_CASES passes it, and it equals the reference's on every B1-B3 and B5 input, on R5's
 *    case variants and on the seven gate-authored inputs of the wb-4nut.5 cut #1 gate's paired probe (PAIRED_INPUTS).
 *  C, acceptance (c). The reference compile step compileGated over the vendored gated list: C1 REJECT and DEFER create no bead and
 *    archive the five packets with their verdict; C2 ADOPT creates the five under the epic, each with one `related` edge to the gate
 *    and no family: label; C3 no verdict creates and archives nothing; C4 judgeCompile refuses each mutant (creating without ADOPT,
 *    a skipped or extra archive, a blocks edge, a draft outside the epic, a family: label, a dropped packet); C5 the program
 *    readiness reader's verdict compiles as the reference's (judgeCompile passes it for REJECT, DEFER, ADOPT and no-verdict gates)
 *    and the reader refuses a blocks edge from a packet to its gate: a premise is a `related` edge.
 *  D, acceptance (d). D1 Pi's store holds no program-labelled bead and no family: label; the producer's six program-labelled rows
 *    carry none while rftsx-auqdi reads open; D2 familyViolations over constructed stores; D3 the program readiness reader writes
 *    nothing: over a store whose epic carries a family: label while rftsx-auqdi is open it reads through show and dependents
 *    alone and its reading carries no label.
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
 *  E, the escapes wb-ze6u's filing names (F3), each judged: E01 a path-qualified argv executable, E02 a path-qualified shell
 *    command word, E03 a quoted global-flag value before the verb and E09 an argv array split across lines hit the write family;
 *    E04 the underscore key spelling and E05 the spaced program name hit the H2 family; E06 .beads/README.md and E07
 *    .beads/config.yaml are walked by T1 and name nothing.
 *  K, the controls of the judges this census applies to its own run, one per mutant wb-ze6u's filing names (F1, F2), each the
 *    census's own judge over a constructed model of that mutant: M1 a skip marker on every pin, M3 a skip-if marker on row B, M4
 *    the loop narrowed to each row's first pin, M5 an options-object skip on row C, M6 a runtime skip through B3's test context,
 *    M7 a skip marker on row D's describe, M8 a guarded return before the T pins' witness compare, M9 a todo in place of P4, I18 a
 *    liveness-only compare under a subject change (K20: a family: label on a non-program export row), I12 a zeroed export floor,
 *    I16 .agents dropped from T1's roots.
 * FOLLOW-UP (wb-ze6u, the R694 follow-up of landing 307; cut #1 on trunk 9f6b726, respun under owner ruling R760 on trunk
 * 24e0d5b over wb-4nut.5's landed rows T4, A4, B6, C5 and D3): the gate's LEG 2 survivors of wb-4nut.4 cut #1
 * are cured here - F1 by REGISTRATION, F2 by the OUTSIDE ANCHORS, F3 by row E - and row K holds a control per named mutant.
 * REGISTRATION (F1): each pin records its witness in REACHED after its compare. The judged-set case, registered first, reads the
 * collected vitest task tree: the registered tests of this file are exactly the roster's list, once each and in order, each in
 * run mode and not inverted, so a skip marker, a skip-if, an options-object skip, a todo or an inverted case anywhere (the
 * closing case's own included) reds before any pin runs. The closing case, registered last, reads the tree again after the run
 * (every other case ran) and holds REACHED to the roster: every pin reached its compare, in roster order, and every reached
 * witness equals its roster witness - a second compare, so a liveness-only compare at a pin no longer leaves its witness held by
 * one line. An afterAll hook holds the closing case to its end, so a runtime skip or a guarded return there reds the file too.
 * OUTSIDE ANCHORS (F2): rows T to R are held to the frozen shape and the residual names wb-4nut.4's delivery recorded in the
 * tracked export (the first "Frozen shape" and "named residuals" statements of its notes; the shape as a floor per row, so a later
 * cut may add a pin but none may drop below the delivered count), rows T to D to the frozen shape wb-4nut.5's delivery recorded
 * there (READER_CUT: the first "Frozen shape:" statement of its notes, the rows it re-pinned at landing 381 with the five pins it
 * added, T4, A4, B6, C5 and D3, as a floor per row), rows A-D to their acceptance clauses (F1), rows E and K to the escape and
 * mutant ids wb-ze6u's filing names in the export (its F1-F3 bullets, ranges expanded), so removing a delivered pin or a row from
 * every literal here and from the roster reds. EXPORT_FLOOR sits below the export rows the delivery recorded (706 at base
 * 7718651) and at or above four fifths of them. T1's roots are held to the git index, read from the index
 * file itself (nothing is spawned: R9); T2's and G1's root sets are T1's minus the roots each excludes by statement
 * (SCRIPTLESS_ROOTS; CLAIMLESS_ROOTS, with docs added); and every walk holds every tracked file below its root, so an emptied or
 * narrowed walk reds whatever its floor. A1 and D1 (the export's rows), T4 and G1 (the walked trees), T3 (readBeadsWork itself)
 * and A4, B6, C5 and D3 (readBeadsProgramReadiness itself) keep their own anchors.
 * NOT CLAIMED: an edit of this file together with the roster and the export rows it reads; every case of this file skipped at
 * once (vitest then runs no case and no hook; the delivered-file marker scan is the backstop); the exclusion sets, NOT_WALKED and
 * each scan's anchor token are literals here; a liveness-only compare at a pin with no subject change (I18 alone) reads the same
 * witness and stays green - what it used to hollow, the single compare, now has a second. The out-of-file roster
 * test/fixtures/h2-bead-graph-roster.json holds every row's id, label and pins, every pin's witness, the pinned constants and the
 * vendored producer lines; FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * SCOPE: readGateVerdict, packetViolations, compileGated and familyViolations are the rule a future Pi bead machine must meet, not a
 * bead machine: nothing here spawns bd, writes a store or reads a live one. A later cut that adds a Pi surface reading the gate or
 * writing beads brings it under rows A-D and re-pins T. wb-4nut.5's respin did so for the program readiness reader (fake bd
 * seams, no live store): a later gate reader joins GATE_READERS and the A4, B6, C5 and D3 drives; a bead writer re-pins T again.
 *
 * Display paths added: none. Test-only: nothing is spawned or written; the repository files read are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";
import { type BeadsReadClient, type BeadsShowCall, type BeadsShowResult, readBeadsWork } from "../src/workbench/beads-observer.js";
import { type BeadsProgramClient, type BeadsProgramReadiness, readBeadsProgramReadiness } from "../src/workbench/beads-program-readiness.js";
import { CapabilityError } from "../src/workbench/capability-registry.js";

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
/** The R694 follow-up that hardened this census (landing 307's gate verdict F1-F3); its filing anchors rows E and K. */
const FOLLOW_UP = "wb-ze6u";
/** The rows the follow-up added after the delivered rows T to R. */
const FOLLOW_UP_ROWS: readonly string[] = ["E", "K"];
/** The cut that brought the program readiness reader under rows A-D and re-pinned T (landing 381, owner ruling R727); the frozen
 * shape its delivery recorded anchors rows T to D with the five pins it added (owner ruling R760: no landed row or pin dropped). */
const READER_CUT = "wb-4nut.5";
/** The rows that cut re-pinned, in order (its statement holds rows G to R unchanged). */
const READER_CUT_ROWS: readonly string[] = ["T", "A", "B", "C", "D"];

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
 * tsx-h2-adr) and the six bead ids of its map. A key or the program name may be separated by hyphens, underscores or whitespace
 * (TSX_H2_01, 'harness2 reactive evolution': wb-ze6u E04, E05), and an identifier may run on past a key with "_" or "-". */
const H2 = /harness2[-_\s]+reactive[-_\s]+evolution|tsx[-_\s]h2[-_\s](?:0[0-5]|adr)(?![a-z0-9])|rftsx[-_](?:bhmrd|7sy4c|8er6b|e9a5e|auqdi|rupqh)(?![a-z0-9])/i;
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
/** A path that may qualify the executable (/usr/local/bin/, ./, node_modules/.bin/): wb-ze6u E01, E02. */
const EXEC_PATH = "(?:[\\w.~-]*/)*";
/** A shell-form bd command word: bd not inside an identifier, perhaps quoted and path-qualified, its global flags (with their
 * values, quoted or bare: E03), then a write verb. */
const WRITE_SHELL = new RegExp(
  `(?<![\\w./-])["']?${EXEC_PATH}${BD}["']?(?:\\s+-{1,2}[A-Za-z][\\w-]*(?:[=\\s](?!-)(?:"[^"\\n]*"|'[^'\\n]*'|[^\\s'"\`]+))?)*\\s+(${VERB_GROUP})(?![\\w-])`,
);
/** An argv-form launch: the quoted, perhaps path-qualified executable, then its leading flag elements (each perhaps with one value
 * element), then a quoted write verb. It is read over the whole text, so an array split across lines (E09) is one launch. */
const WRITE_ARGV = new RegExp(
  `["'\`]${EXEC_PATH}${BD}["'\`]\\s*,\\s*\\[\\s*(?:["'\`]-[^"'\`]*["'\`]\\s*,\\s*(?:(?:["'\`][^-"'\`][^"'\`]*["'\`]|[\\w.$]+)\\s*,\\s*)?)*["'\`](${VERB_GROUP})["'\`]`,
  "g",
);
/** A bd command word on a line that also carries a write flag, in either form. */
const WRITE_FLAG = new RegExp(`(?:(?<![\\w./-])["']?${EXEC_PATH}${BD}["']?\\s|["'\`]${EXEC_PATH}${BD}["'\`]\\s*,).*?(${FLAG_GROUP})(?![\\w-])`);
/** What follows a marker when it is the first member of an alternative: separators, at most one joining word, a verdict word. */
const SEPARATORS = "[\\s()\\[\\],;:/|'\"`]*";
/** A ruling marker: "ruled ADOPT" or "ruled REJECT" verbatim, at a word start, the verdict word ending where no letter, digit, "_"
 * or "-" follows (ADOPT-PROTOTYPE and ADOPTED are not ADOPT), and not the first member of an alternative ("ruled ADOPT or REJECT",
 * "ruled ADOPT|REJECT"): the question the gate asks is not its answer. */
const MARKER = new RegExp(`(?<![\\w-])ruled (ADOPT|REJECT)(?![\\w-])(?!${SEPARATORS}(?:(?:or|and|nor)(?![\\w-])${SEPARATORS})?(?:ADOPT|REJECT|DEFER)(?![\\w-]))`, "g");
/** T4's family: a verdict word as a marker spells it, case-sensitive, at word bounds (ADOPTED and ADOPT-PROTOTYPE are not). */
const VERDICT_WORDS = /(?<![\w-])(?:ADOPT|REJECT)(?![\w-])/;
/** T4's binding: every Pi surface that reads a gate verdict (wb-4nut.5's program readiness reader). Each is imported here and
 * driven by A4, B6, C5 and D3; a walked file spelling a verdict word outside this list reds T4. */
const GATE_READERS: readonly string[] = ["src/workbench/beads-program-readiness.ts"];
/** B6's paired inputs: the seven gate-authored gate texts of the wb-4nut.5 cut #1 gate's paired probe (PREP, run g10-gate-s62),
 * verbatim; the probe compared that cut's reader with readGateVerdict on them and read six divergences (owner ruling R727). */
const PAIRED_INPUTS: readonly { readonly id: string; readonly fields: JsonObject }[] = [
  { id: "line-adopt+prose-reject", fields: { notes: "ruled ADOPT\nan earlier draft was ruled REJECT and withdrawn" } },
  { id: "line-adopt+description-reject", fields: { description: "ruled REJECT", notes: "ruled ADOPT" } },
  { id: "line-adopt+title-adopt", fields: { title: "gate - ruled ADOPT", notes: "ruled ADOPT" } },
  { id: "line-adopt+line-defer", fields: { notes: "ruled ADOPT\nruled DEFER" } },
  { id: "title-only-adopt", fields: { title: "gate - ruled ADOPT" } },
  { id: "adopt-trailing-period", fields: { notes: "ruled ADOPT." } },
  { id: "padded-crlf", fields: { notes: "Owner ruling recorded.\r\n  ruled ADOPT  \r\nAPI-PIN.md landed." } },
];

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
  /** Subtrees or files of the root that are never read (paths relative to the root). */
  readonly omit: readonly string[];
  /** Read only the root's own regular files, never a directory below it (as "." always is). */
  readonly own?: boolean;
}
/** The tracker's data (R4): the export and the interactions log, never a surface. */
const TRACKER_DATA: readonly string[] = [".beads/issues.jsonl", ".beads/interactions.jsonl"];
/** T1's roots: every surface that acts or tells an agent what to do. Each floor sits below the count measured at base 7718651
 * (src 115, qa 67, examples 7, .agents 2, .pi 1, .github 2, .codex 2, .beads/hooks 5, the root's own files 27; the tracker's own
 * files 4 at 9f6b726), so an emptied walk reds and an additive change does not; "." and an own root read their own regular files
 * (never .git) and nothing below them - the tracker's own root never descends into a local store. docs/, new-feedback/ and vendor/
 * are prose and records, not walked here (residual R12). */
const PROGRAM_SCANS: readonly ScanRoot[] = [
  { pin: "T1", root: "src", floor: 100, anchorFile: "workbench/beads-observer.ts", anchorToken: "BeadsReadClient", omit: [] },
  { pin: "T1", root: "qa", floor: 50, anchorFile: "workbench/live-furnace-vc4-launch.mjs", anchorToken: "'init'", omit: [] },
  { pin: "T1", root: "examples", floor: 5, anchorFile: "workflows/compose.js", anchorToken: "count-child", omit: [] },
  { pin: "T1", root: ".agents", floor: 2, anchorFile: "skills/beads/SKILL.md", anchorToken: `${BD} create`, omit: [] },
  { pin: "T1", root: ".pi", floor: 1, anchorFile: "agents/auditor.md", anchorToken: "tools:", omit: [] },
  { pin: "T1", root: ".github", floor: 2, anchorFile: "workflows/ci.yml", anchorToken: "runs-on", omit: [] },
  { pin: "T1", root: ".codex", floor: 2, anchorFile: "hooks.json", anchorToken: `${BD} codex-hook`, omit: [] },
  { pin: "T1", root: ".beads/hooks", floor: 5, anchorFile: "pre-commit", anchorToken: `${BD} hooks run`, omit: [] },
  { pin: "T1", root: ".beads", floor: 3, anchorFile: "README.md", anchorToken: "AI-Native Issue Tracking", omit: ["issues.jsonl", "interactions.jsonl"], own: true },
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
/** The roots T1 walks that hold no script - instruction text and the tracker's own files: T2 walks T1's roots but these. */
const SCRIPTLESS_ROOTS: readonly string[] = [".agents", ".pi", ".beads"];
/** The roots T1 walks that state no product claim - CI, the tool configs and the tracker: G1 walks T1's roots but these, and docs. */
const CLAIMLESS_ROOTS: readonly string[] = [".github", ".codex", ".beads/hooks", ".beads"];
const CLAIM_ROOTS: readonly string[] = ["docs"];
/** The tracked paths no T1 root holds, by the named residual that leaves them unwalked: a top-level directory or a file. */
const NOT_WALKED: Readonly<Record<string, readonly string[]>> = { R3: ["test"], R4: TRACKER_DATA, R12: ["docs", "new-feedback", "vendor"] };
/** Row R's pins and the residual each names, held to the list wb-4nut.4's delivery recorded in the export. */
const RESIDUALS: readonly { readonly pin: string; readonly name: string }[] = [
  { pin: "R1", name: "R-COMPOSED" },
  { pin: "R2", name: "R-GENERIC-RUNNER" },
  { pin: "R3", name: "R-TEST-TREE" },
  { pin: "R4", name: "R-TRACKER-DATA" },
  { pin: "R5", name: "R-CASE-VARIANT" },
  { pin: "R6", name: "R-ALTERNATIVE-UNLISTED" },
  { pin: "R7", name: "R-DEFER-UNREAD" },
  { pin: "R8", name: "R-OTHER-FIELD" },
  { pin: "R9", name: "R-SNAPSHOT" },
  { pin: "R10", name: "R-OTHER-STORE" },
  { pin: "R11", name: "R-BD-INTEGRATION" },
  { pin: "R12", name: "R-PROSE-RECORDS" },
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
    label: "(trigger) no Pi surface grows the H2 bead graph: no walked root names the program, a work package or an H2 bead, the only bd write spelled in Pi's scripts is the live tier's scratch-store init, Pi's work reader calls show alone and keeps no text a ruling could be read from but the title, and the one Pi surface that reads a gate verdict is the program readiness reader, held to rows A-D",
    pins: ["T1", "T2", "T3", "T4"],
  },
  {
    id: "A",
    label: "(a) `bd -q list --json -s all --limit 5000` shows 0 wp:tsx-h2-01..05 beads while rftsx-rupqh has no 'ruled ADOPT' text",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) verdict reader: exactly one marker reads that verdict verbatim; zero/two markers or a closed bead with none read no-verdict; a closure-derived ADOPT fails",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) a DEFER/REJECT gate creates no bead and writes the packet to the compile ledger; created packets carry only `related` edges",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "D",
    label: "(d) no program:harness2-reactive-evolution-2026-10-20 bead carries a family: label while rftsx-auqdi is open",
    pins: ["D1", "D2", "D3"],
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
  {
    id: "E",
    label: "the escapes wb-ze6u's filing names are judged: the path-qualified, quoted-flag and split-argv write spellings and the underscore and spaced family spellings hit, and T1 walks the tracker's README and config",
    pins: ["E01", "E02", "E03", "E04", "E05", "E09", "E06", "E07"],
  },
  {
    id: "K",
    label: "the registration, reached-record, floor and surface judges this census applies to its own run flag a constructed model of each mutant wb-ze6u's filing names",
    pins: ["M1", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "I18", "I12", "I16"],
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
    gateReaders: GATE_READERS,
    pairedInputs: PAIRED_INPUTS,
    families: { h2: H2.source, prerequisites: GATE_PREREQUISITES.source, marker: MARKER.source, verdictWords: VERDICT_WORDS.source },
    trackerData: TRACKER_DATA,
    scriptlessRoots: SCRIPTLESS_ROOTS,
    claimlessRoots: CLAIMLESS_ROOTS,
    claimRoots: CLAIM_ROOTS,
    notWalked: NOT_WALKED,
    residuals: RESIDUALS,
    followUpRows: FOLLOW_UP_ROWS,
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
/** A directory's own regular files (never .git, never a directory below it); an unreadable directory holds none. */
function ownFiles(directory: string): string[] {
  try {
    return readdirSync(directory, { withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name !== ".git")
      .map(entry => join(directory, entry.name));
  } catch {
    return [];
  }
}
const isOwnRoot = (scan: ScanRoot): boolean => scan.root === "." || scan.own === true;
/** A root's files: the whole tree below it, or for "." and an own root its own regular files, but the omitted subtrees and files. */
function filesOf(scan: ScanRoot): string[] {
  const base = join(REPO, scan.root);
  const omitted = scan.omit.map(path => join(base, path));
  return (isOwnRoot(scan) ? ownFiles(base) : filesBelow(base)).filter(file => !omitted.some(path => file === path || file.startsWith(`${path}/`)));
}

// --- the git index ----------------------------------------------------------------------------------------------------

/** The repository's tracked paths, read from git's own index file: nothing is spawned (R9). A linked worktree's .git is a file
 * naming its git directory. Index versions 2 to 4 are read (a v4 path is prefix-compressed against the one before it); any other
 * version, a split index (its link extension) or paths out of git's byte order fail closed. */
function trackedPaths(): string[] {
  const dotGit = join(REPO, ".git");
  const pointer = /^gitdir: (.+)$/m.exec(textOf(dotGit))?.[1]?.trim();
  const index = readFileSync(join(pointer === undefined ? dotGit : resolve(REPO, pointer), "index"));
  if (index.toString("latin1", 0, 4) !== "DIRC") throw new Error("the git index carries no DIRC signature");
  const version = index.readUInt32BE(4);
  if (version < 2 || version > 4) throw new Error(`git index version ${version} is not read`);
  const paths: string[] = [];
  let offset = 12;
  for (let entry = index.readUInt32BE(8); entry > 0; entry -= 1) {
    const extended = version >= 3 && (index.readUInt16BE(offset + 60) & 0x4000) !== 0;
    let cursor = offset + (extended ? 64 : 62);
    let prefix = "";
    if (version === 4) {
      let byte = index[cursor] ?? 0;
      cursor += 1;
      let strip = byte & 0x7f;
      while ((byte & 0x80) !== 0) {
        byte = index[cursor] ?? 0;
        cursor += 1;
        strip = ((strip + 1) << 7) | (byte & 0x7f);
      }
      const previous = paths[paths.length - 1] ?? "";
      prefix = previous.slice(0, previous.length - strip);
    }
    const end = index.indexOf(0, cursor);
    if (end < 0) throw new Error("a git index path runs past the file");
    paths.push(prefix + index.toString("utf8", cursor, end));
    offset = version === 4 ? end + 1 : offset + ((end - offset + 8) & ~7);
  }
  for (let at = offset; at + 8 <= index.length - 20; at += 8 + index.readUInt32BE(at + 4)) {
    if (index.toString("latin1", at, at + 4) === "link") throw new Error("a split git index is not read");
  }
  if (paths.some((path, at) => at > 0 && Buffer.compare(Buffer.from(paths[at - 1] ?? ""), Buffer.from(path)) > 0)) throw new Error("the git index paths are out of order");
  return [...new Set(paths)];
}
/** Whether a scan's walk is meant to read a tracked path: below its root (for "." and an own root, its own files), not omitted. */
function holds(scan: ScanRoot, path: string): boolean {
  const prefix = scan.root === "." ? "" : `${scan.root}/`;
  if (!path.startsWith(prefix)) return false;
  const rest = path.slice(prefix.length);
  if (isOwnRoot(scan) && rest.includes("/")) return false;
  return !scan.omit.some(omit => rest === omit || rest.startsWith(`${omit}/`));
}
/** A file holding a NUL byte: binary, no text a surface could carry (textOf reads it as empty). */
function isBinary(path: string): boolean {
  try {
    return readFileSync(path).includes(0);
  } catch {
    return false;
  }
}
interface Surface {
  readonly unclassified: string[];
  readonly notWalked: Record<string, string[]>;
}
/** A family's surface against the git index: every tracked path is held by one of its roots, by a NOT_WALKED residual (recorded by
 * its member) or is binary (recorded by its top-level directory); any other tracked path is unclassified. */
function surfaceOf(scans: readonly ScanRoot[], tracked: readonly string[]): Surface {
  const unclassified: string[] = [];
  const notWalked: Record<string, string[]> = {};
  const note = (key: string, member: string): void => {
    const members = notWalked[key] ?? [];
    if (!members.includes(member)) members.push(member);
    notWalked[key] = members;
  };
  for (const path of tracked) {
    if (scans.some(scan => holds(scan, path))) continue;
    const named = Object.entries(NOT_WALKED).flatMap(([residual, members]) =>
      members.filter(member => path === member || path.startsWith(`${member}/`)).map(member => ({ residual, member })),
    )[0];
    if (named !== undefined) note(named.residual, named.member);
    else if (isBinary(join(REPO, path))) note("binary", path.split("/")[0] ?? path);
    else unclassified.push(path);
  }
  return { unclassified, notWalked };
}
interface Walk {
  readonly files: readonly string[];
  readonly floorMet: boolean;
  readonly anchorRead: boolean;
  readonly trackedRead: boolean;
}
/** A scan's walk, held to its floor, its anchor and the git index: every tracked path the scan holds (and reads) was read. */
function walked(scan: ScanRoot, files: readonly string[], tracked: readonly string[]): Walk {
  const anchor = join(REPO, scan.root, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const unread = tracked.filter(path => holds(scan, path) && !files.includes(join(REPO, path)));
  expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(unread, `${scan.root}: tracked files the walk did not read`).toEqual([]);
  return { files, floorMet: files.length >= scan.floor, anchorRead, trackedRead: unread.length === 0 };
}
const rel = (path: string): string => relative(REPO, path);
function familyScan(scan: ScanRoot, family: RegExp, spelled: string, tracked: readonly string[]): Json {
  const walk = walked(scan, filesOf(scan), tracked);
  const hits = walk.files.filter(file => family.test(textOf(file))).map(rel);
  expect(hits, `files spelling ${spelled} under ${scan.root}`).toEqual([]);
  return { root: scan.root, floorMet: walk.floorMet, anchorRead: walk.anchorRead, trackedRead: walk.trackedRead, hits };
}
/** T2's matcher: the write verb (or flag) of every line spelling a bd write, in line order. An argv launch is read over the whole
 * text and counts on its executable's line, so one split across lines (E09) counts once. */
function writeHits(text: string): string[] {
  const argvVerbs = new Map<number, string>();
  for (const match of text.matchAll(WRITE_ARGV)) {
    const line = text.slice(0, match.index).split("\n").length - 1;
    if (!argvVerbs.has(line)) argvVerbs.set(line, match[1] ?? "");
  }
  return text.split("\n").flatMap((line, index) => {
    const verb = WRITE_SHELL.exec(line)?.[1] ?? argvVerbs.get(index) ?? WRITE_FLAG.exec(line)?.[1];
    return verb === undefined ? [] : [verb];
  });
}
const isMarkdown = (path: string): boolean => path.endsWith(".md");
/** A script root's bd write spellings as "<file> <verb> x<lines>" (Markdown is instruction text, never read here). */
function writeScan(scan: ScanRoot, tracked: readonly string[]): { readonly walk: Walk; readonly spellings: string[] } {
  const walk = walked(
    scan,
    filesOf(scan).filter(file => !isMarkdown(file)),
    tracked.filter(path => !isMarkdown(path)),
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

// --- Pi's gate reader: the program readiness reader ------------------------------------------------------------------

/** A modeled store bead: its bd show record (text fields included) and its edges, `{ to, type }`, as bd 1.1.0-rc.1 prints them. */
type StoreBead = JsonObject & { readonly id: string };
const edgesOf = (bead: JsonObject): { to: string; type: string }[] =>
  (Array.isArray(bead.edges) ? bead.edges : []).flatMap(edge => (isObject(edge) && typeof edge.to === "string" && typeof edge.type === "string" ? [{ to: edge.to, type: edge.type }] : []));
/** A fake bd over a modeled store, through a seam recording every member read: show prints the bead (an issue array) with a
 * dependency record per edge; the dependents listing prints a flat record per bead with an edge to the id; a missing id exits 1. */
function programClient(store: readonly StoreBead[]): { readonly client: BeadsProgramClient; readonly accessed: string[] } {
  const byId = new Map(store.map(bead => [bead.id, bead]));
  const missing: BeadsShowResult = { exit: 1, stdout: JSON.stringify({ error: "no issues found matching the provided IDs" }), stderr: "" };
  const record = (id: string, type: string): JsonObject => {
    const bead = byId.get(id);
    return { id, title: String(bead?.title ?? id), status: String(bead?.status ?? "open"), issue_type: String(bead?.issue_type ?? "task"), priority: 2, dependency_type: type };
  };
  const seam: BeadsProgramClient = {
    show: async (id: string, _call: BeadsShowCall): Promise<BeadsShowResult> => {
      const bead = byId.get(id);
      if (bead === undefined) return missing;
      const fields = Object.fromEntries(Object.entries(bead).filter(([key]) => key !== "edges"));
      return { exit: 0, stdout: JSON.stringify([{ ...fields, dependencies: edgesOf(bead).map(edge => record(edge.to, edge.type)) }]), stderr: "" };
    },
    dependents: async (id: string, _call: BeadsShowCall): Promise<BeadsShowResult> => {
      if (!byId.has(id)) return missing;
      const listed = store.flatMap(bead => edgesOf(bead).filter(edge => edge.to === id).map(edge => ({ ...record(bead.id, edge.type), labels: labelsOf(bead) })));
      return { exit: 0, stdout: JSON.stringify(listed), stderr: "" };
    },
  };
  const accessed: string[] = [];
  const client = new Proxy(seam, {
    get(target, property, receiver) {
      accessed.push(String(property));
      return Reflect.get(target, property, receiver);
    },
  });
  return { client, accessed };
}
/** readBeadsProgramReadiness over a modeled store, host-bound to a fixture workspace; the host binds readBeadsWork as its work
 * reader (the module imports no Beads reader: the wb-kku9.3 claim re-check census holds that reader's importers empty). */
async function readProgram(client: BeadsProgramClient, gates: Readonly<Record<string, string>>): Promise<BeadsProgramReadiness> {
  const workspaceRoot = "/fixture/rftsx";
  return readBeadsProgramReadiness(client, {
    program: { epics: [EPIC], gates },
    workspaceRoot,
    scope: { workspace: workspaceRoot, principal: "census" },
    limits: { maxDependencies: 16, maxTitleChars: 200, timeoutMs: 5000 },
    now: () => "2026-10-23T00:00:00.000Z",
    readWork: readBeadsWork,
  });
}
/** A gated packet under the epic, as R-08 would create it: a parent-child edge to the epic and its wp label. */
const packetBead = (key: string): StoreBead => ({ id: key, title: `[H2] ${key}`, status: "open", issue_type: "feature", priority: 3, labels: [PROGRAM_LABEL, `wp:${key.toLowerCase()}`], edges: [{ to: EPIC, type: "parent-child" }] });
/** The program readiness reader's verdict on one gate bead: the bead (its own fields over the gate's id) gates one packet. */
async function programVerdict(bead: JsonObject): Promise<string> {
  const gate: StoreBead = { ...bead, id: typeof bead.id === "string" ? bead.id : GATE };
  const epic: StoreBead = { id: EPIC, title: "epic", status: "open", issue_type: "epic", priority: 2, labels: [PROGRAM_LABEL] };
  const packet = packetBead("TSX-H2-01");
  const reading = await readProgram(programClient([epic, packet, gate]).client, { [packet.id]: gate.id });
  return reading.children.find(entry => entry.id === packet.id)?.gate?.verdict ?? "unread";
}
/** The producer's six rows as a store (the epic bare, every other row a parent-child dependent of it; ruling rows and the gate
 * typed decision) beside the five gated packets, each gated on rftsx-rupqh; `gateFields` edits the gate's row. */
function producerStore(gateFields: JsonObject): StoreBead[] {
  const rows = snapshotRows().map((row): StoreBead => {
    const id = idOf(row);
    const decision = labelsOf(row).some(label => label.startsWith("ruling:") || label === "kind:decision");
    const bead: StoreBead = { ...row, id, issue_type: id === EPIC ? "epic" : decision ? "decision" : "task", priority: 2, ...(id === EPIC ? {} : { edges: [{ to: EPIC, type: "parent-child" }] }) };
    return id === GATE ? { ...bead, ...gateFields, id } : bead;
  });
  return [...rows, ...GATED_KEYS.map(packetBead)];
}
async function refusal(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof CapabilityError) return error.category;
    throw error;
  }
  return "resolved";
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
/** wb-ze6u F3's spellings, each now a hit of its family (E06 and E07 are files, judged by trackerFile). */
const ESCAPES: readonly Spelling[] = [
  { pin: "E01", family: "write", text: `spawnSync('/usr/local/bin/${BD}', ['create', '--title', 'x']);`, hit: true },
  { pin: "E02", family: "write", text: `/usr/local/bin/${BD} create "[H2] packet" --parent ${EPIC}`, hit: true },
  { pin: "E03", family: "write", text: `${BD} -C "/work/rftsx" update ${GATE} --status closed`, hit: true },
  { pin: "E04", family: "h2", text: 'const key = "TSX_H2_01";', hit: true },
  { pin: "E05", family: "h2", text: "the harness2 reactive evolution program", hit: true },
  { pin: "E09", family: "write", text: `spawnSync("${BD}", [\n  "create",\n  "--title",\n  "x",\n]);`, hit: true },
];
/** A spelling's case: its family judges it as the roster says, and the witness carries its digest, never the text. */
const spellingCase = (spelling: Spelling): Json => {
  const hit = familyHits(spelling);
  expect(hit).toBe(spelling.hit);
  return { family: spelling.family, digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
};
/** E06 / E07: a tracker file T1 is meant to read - tracked, held by a T1 root, read by that root's walk, naming nothing. */
function trackerFile(path: string, tracked: readonly string[]): Json {
  const scan = PROGRAM_SCANS.find(entry => holds(entry, path));
  const witness = {
    path,
    tracked: tracked.includes(path),
    root: scan?.root ?? null,
    read: scan !== undefined && filesOf(scan).includes(join(REPO, path)),
    hit: H2.test(textOf(join(REPO, path))),
  };
  expect(witness).toStrictEqual({ path, tracked: true, root: ".beads", read: true, hit: false });
  return witness;
}

// --- the registration and reached-record judges (wb-ze6u F1) ----------------------------------------------------------

/** The top suite of this file, the case registered first and the case registered last. */
const SUITE = "wb-4nut.4 H2 bead-graph census (TSX-HARNESS2-REACTIVE-EVOLUTION-R4, absent-today leg)";
const JUDGED_SET = "the judged set: the frozen shape, the out-of-file roster and the cases agree";
const CLOSING = "the registered tests ran and every pin reached its witness compare, in roster order, with the roster's witness";
/** The pins that reached their witness compare, with the witness each recorded, in run order; the closing case holds it. */
const REACHED = new Map<string, Json>();
/** Set by the closing case's last line; the suite's afterAll hook holds it. */
const CLOSED = { done: false };
/** A registered test of this file as the vitest task tree reads it. */
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly inverted: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** The members of the vitest task tree this census reads: a test, or a suite with its tasks. */
interface TaskNode {
  readonly type: string;
  readonly name: string;
  readonly mode: string;
  readonly fails?: boolean;
  readonly result?: { readonly state?: string };
  readonly tasks?: readonly TaskNode[];
}
/** Every test the file registered, by its suite path, in registration order; `self` marks the reading case by identity. */
function registeredOf(file: { readonly tasks: readonly TaskNode[] }, self: unknown): Registered[] {
  const found: Registered[] = [];
  const visit = (nodes: readonly TaskNode[], path: readonly string[]): void => {
    for (const node of nodes) {
      const { type, name, mode, fails, result, tasks } = node;
      if (type === "test") found.push({ name: [...path, name].join(" > "), mode, inverted: fails === true, state: result?.state, self: node === self });
      else if (tasks !== undefined) visit(tasks, [...path, name]);
    }
  };
  visit(file.tasks, []);
  return found;
}
/** The tests this file must register, in order, read from the roster: the judged set, every row's pins, the closing case. */
const expectedTitles = (): string[] => [
  `${SUITE} > ${JUDGED_SET}`,
  ...ROSTER.rows.flatMap(row => row.pins.map(pin => `${SUITE} > ${row.id} ${row.label} > ${pin.id}`)),
  `${SUITE} > ${CLOSING}`,
];
const tail = (title: string): string => title.slice(title.lastIndexOf(" > ") + 3);
type Phase = "collected" | "ran";
/** The registration rule as a predicate over a read of the task tree: its gaps, by kind and the test's last title part.
 * Collected (the judged set, first): the titles are the roster's, once each and in order, the reader first, every test in run
 * mode and not inverted. Ran (the closing case, last): the same with the reader last, and every other test ran (passed or failed). */
function registrationGaps(entries: readonly Registered[], expected: readonly string[], phase: Phase): string[] {
  const names = entries.map(entry => entry.name);
  const gaps = [
    ...expected.filter(title => !names.includes(title)).map(title => `unregistered ${tail(title)}`),
    ...names.filter(name => !expected.includes(name)).map(name => `unexpected ${tail(name)}`),
    ...names.filter((name, at) => names.indexOf(name) !== at).map(name => `twice ${tail(name)}`),
  ];
  if (gaps.length === 0 && !sameList(names, expected)) gaps.push("order");
  const reader = entries.findIndex(entry => entry.self);
  if (reader !== (phase === "collected" ? 0 : entries.length - 1)) gaps.push(`reader ${phase} at ${reader}`);
  for (const entry of entries) {
    if (entry.mode !== "run") gaps.push(`mode:${entry.mode} ${tail(entry.name)}`);
    if (entry.inverted) gaps.push(`inverted ${tail(entry.name)}`);
    if (phase === "ran" && !entry.self && entry.state !== "pass" && entry.state !== "fail") gaps.push(`unrun:${entry.state ?? "none"} ${tail(entry.name)}`);
  }
  return gaps;
}
/** Two JSON values are equal, an object's members in any order. */
function sameJson(left: Json, right: Json): boolean {
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every((item, at) => sameJson(item, right[at] ?? null));
  }
  if (isObject(left) || isObject(right)) {
    if (!isObject(left) || !isObject(right)) return false;
    const keys = Object.keys(left);
    return keys.length === Object.keys(right).length && keys.every(key => Object.hasOwn(right, key) && sameJson(left[key] ?? null, right[key] ?? null));
  }
  return left === right;
}
/** The reached-record rule as a predicate over a record of pins and witnesses: every roster pin reached its compare and nothing
 * else did, in roster order, and each recorded witness equals the roster's - the second compare. */
function reachedGaps(reached: ReadonlyMap<string, Json>): string[] {
  const pins = ROSTER.rows.flatMap(row => row.pins);
  const ids = pins.map(pin => pin.id);
  const keys = [...reached.keys()];
  const gaps = [
    ...ids.filter(id => !reached.has(id)).map(id => `unreached ${id}`),
    ...keys.filter(key => !ids.includes(key)).map(key => `unexpected ${key}`),
    ...pins.filter(pin => reached.has(pin.id) && !sameJson(reached.get(pin.id) ?? null, pin.witness)).map(pin => `witness ${pin.id}`),
  ];
  if (gaps.length === 0 && !sameList(keys, ids)) gaps.push("order");
  return gaps;
}

// --- the export's records (wb-ze6u F2) --------------------------------------------------------------------------------

const notesOf = (rows: readonly JsonObject[], id: string): string => {
  const row = rows.find(entry => idOf(entry) === id);
  return row !== undefined && typeof row.notes === "string" ? row.notes : "";
};
interface Delivered {
  readonly shape: string[];
  readonly residuals: string[];
  readonly exportRows: number;
}
/** What wb-4nut.4's delivery recorded in its notes, the first statement of each: the frozen shape of rows T to R, the named
 * residuals in order (only when their stated count matches the list) and the export rows it read at base 7718651. */
function deliveredRecord(notes: string): Delivered {
  const shape = /Frozen shape ((?:[A-Z]:\d+ )*[A-Z]:\d+) \(standing rule 16\)/.exec(notes)?.[1]?.split(" ") ?? [];
  const named = /R (\d+) named residuals each with a pinned quiet row \(([^)]*)\)/.exec(notes);
  const residuals = named?.[2]?.split(", ") ?? [];
  const exportRows = Number(/the export read (\d+) rows at 7718651/.exec(notes)?.[1] ?? Number.NaN);
  return { shape, residuals: residuals.length === Number(named?.[1]) ? residuals : [], exportRows };
}
/** What wb-4nut.5's delivery recorded in its notes, the first frozen shape statement: the rows it re-pinned with their pin counts. */
function readerCutShape(notes: string): string[] {
  return /Frozen shape: ((?:[A-Z]:\d+ )*[A-Z]:\d+) \(G-R unchanged\)/.exec(notes)?.[1]?.split(" ") ?? [];
}
/** The rows of a delivered shape that hold fewer pins here than it recorded ("B:6 holds 5"): a later cut may add a pin, never drop one. */
function belowShape(shape: readonly string[]): string[] {
  return shape.flatMap(entry => {
    const [id = "", count = ""] = entry.split(":");
    const held = ROWS.find(row => row.id === id)?.pins.length ?? 0;
    return held >= Number(count) ? [] : [`${entry} holds ${held}`];
  });
}
/** The ids a filing bullet names in parentheses, ranges expanded (M3-M9, E01-E05), in their order. */
function idsIn(line: string): string[] {
  return [...line.matchAll(/\(([A-Z]\d+(?:-[A-Z]\d+)?(?:, [A-Z]\d+(?:-[A-Z]\d+)?)*)\)/g)].flatMap(group =>
    (group[1] ?? "").split(", ").flatMap(member => {
      const range = /^([A-Z])(\d+)-[A-Z](\d+)$/.exec(member);
      if (range === null) return [member];
      const [, letter = "", from = "", to = ""] = range;
      return Array.from({ length: Number(to) - Number(from) + 1 }, (_, step) => `${letter}${String(Number(from) + step).padStart(from.length, "0")}`);
    }),
  );
}
/** The mutant and escape ids wb-ze6u's filing names, per bullet (F1 leads; F2 and F3 ride), the first bullet of each in its notes. */
function filedIds(notes: string): { readonly lead: string[]; readonly f2: string[]; readonly f3: string[] } {
  const bullet = (label: string): string => new RegExp(`^- ${label}: (.*)$`, "m").exec(notes)?.[1] ?? "";
  return { lead: idsIn(bullet("F1 leads")), f2: idsIn(bullet("F2 rides")), f3: idsIn(bullet("F3 rides")) };
}
/** The export floor's rule against the count the delivery recorded: below it, and at or above four fifths of it. */
function exportFloorGaps(floor: number, recorded: number): string[] {
  if (!Number.isInteger(recorded) || recorded <= 0) return ["no export count recorded"];
  return [
    ...(floor < recorded ? [] : [`floor ${floor} not below the ${recorded} rows recorded`]),
    ...(floor * 5 >= recorded * 4 ? [] : [`floor ${floor} below four fifths of the ${recorded} rows recorded`]),
  ];
}
const rootsOf = (scans: readonly ScanRoot[]): string[] => scans.map(scan => scan.root);

// --- row K: the judges over constructed models of the filed mutants ----------------------------------------------------

/** A judge's gaps as a witness: listed while short, counted by kind once long. */
function gapWitness(gaps: readonly string[]): Json {
  if (gaps.length <= 12) return [...gaps];
  const counts = new Map<string, number>();
  for (const gap of gaps) {
    const kind = gap.split(" ")[0] ?? gap;
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  return [...counts].map(([kind, count]) => `${kind} x${count}`);
}
interface RowPin {
  readonly row: string;
  readonly pin: string;
}
/** The task tree a run of this file would read with every case as the roster lists it, then `change` applied to each pin's
 * entry; the two harness cases are never changed, and the reader is the judged set when collected, the closing case when ran. */
function modelRegistration(phase: Phase, change: (entry: Registered, at: RowPin) => Registered | undefined): Registered[] {
  const titles = expectedTitles();
  const pins: (RowPin | undefined)[] = [undefined, ...ROSTER.rows.flatMap(row => row.pins.map(pin => ({ row: row.id, pin: pin.id }))), undefined];
  const reader = phase === "collected" ? 0 : titles.length - 1;
  return titles.flatMap((name, at) => {
    const entry: Registered = { name, mode: "run", inverted: false, state: phase === "ran" && at !== reader ? "pass" : undefined, self: at === reader };
    const pin = pins[at];
    const changed = pin === undefined ? entry : change(entry, pin);
    return changed === undefined ? [] : [changed];
  });
}
const registrationModel = (phase: Phase, change: (entry: Registered, at: RowPin) => Registered | undefined): Json =>
  gapWitness(registrationGaps(modelRegistration(phase, change), expectedTitles(), phase));
const skipped = (entry: Registered): Registered => ({ ...entry, mode: "skip" });
/** REACHED as a run of this file would record it, every pin with its roster witness. */
const modelReached = (): Map<string, Json> => new Map(ROSTER.rows.flatMap(row => row.pins.map(pin => [pin.id, clone(pin.witness)] as const)));

// --- the cases --------------------------------------------------------------------------------------------------------

const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  T1: async () => {
    const tracked = trackedPaths();
    const roots = PROGRAM_SCANS.map(scan => familyScan(scan, H2, "the H2 family", tracked));
    const surface = surfaceOf(PROGRAM_SCANS, tracked);
    expect(surface.unclassified, "tracked paths no T1 root, NOT_WALKED residual or binary rule holds").toEqual([]);
    return { roots, notWalked: surface.notWalked, unclassified: surface.unclassified };
  },
  T2: async () => {
    const tracked = trackedPaths();
    const scans = EXEC_SCANS.map(scan => ({ scan, result: writeScan(scan, tracked) }));
    const spellings = scans.flatMap(entry => entry.result.spellings).sort();
    const srcSpellings = scans.filter(entry => entry.scan.root === "src").flatMap(entry => entry.result.spellings);
    expect(spellings, "the bd write spellings of Pi's script roots").toEqual([...WRITE_ROSTER]);
    expect(srcSpellings).toEqual([]);
    const roots = scans.map(entry => ({ root: entry.scan.root, floorMet: entry.result.walk.floorMet, anchorRead: entry.result.walk.anchorRead, trackedRead: entry.result.walk.trackedRead }));
    return { roots, spellings, srcSpellings };
  },
  T3: async () => {
    const witness = await piBeadsReading();
    expect(isObject(witness) ? witness.accessed : null).toEqual(["show"]);
    // The retention fields are judged here too, not only through the witness compare (wb-ze6u F1, I18 with K22).
    expect(isObject(witness) ? [witness.titleKept, witness.bodyKept, witness.notesKept, witness.closeReasonKept, witness.labelsKept, witness.closure] : null).toStrictEqual([
      true,
      false,
      false,
      false,
      false,
      { status: "closed", closeReasonPresent: true, closedAt: true },
    ]);
    return witness;
  },
  T4: async () => {
    const tracked = trackedPaths();
    const readers = PROGRAM_SCANS.flatMap(scan => walked(scan, filesOf(scan), tracked).files.filter(file => VERDICT_WORDS.test(textOf(file))).map(rel)).sort();
    const imports = ownImports();
    const driven = GATE_READERS.map(path => imports.includes(`../${path.replace(/\.ts$/, ".js")}`));
    expect(readers, "the walked files spelling a verdict word").toEqual([...GATE_READERS]);
    expect(driven).toEqual(GATE_READERS.map(() => true));
    return { readers, driven };
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
  A4: async () => {
    const states: Readonly<Record<string, JsonObject>> = {
      producerMap: {},
      afterAdopt: { notes: "ruled ADOPT" },
      gateClosed: { status: "closed", close_reason: "ADOPT" },
      gateRejected: { notes: "ruled REJECT" },
      titleReject: { title: "[H2-ADR] ADR: ruled REJECT" },
      bodyAdopt: { description: "Decision: ruled ADOPT" },
    };
    const gates = Object.fromEntries(GATED_KEYS.map(key => [key, GATE]));
    const witness: Record<string, Json> = {};
    for (const [state, fields] of Object.entries(states)) {
      const store = producerStore(fields);
      const reading = await readProgram(programClient(store).client, gates);
      const readyPackets = reading.ready.filter(id => GATED_KEYS.includes(id));
      const gateRow = store.find(bead => bead.id === GATE) ?? {};
      const verdict = reference(gateRow);
      const violations = packetViolations(store);
      expect(readyPackets, `${state}: packets the reader readies`).toEqual(verdict === "ADOPT" ? [...GATED_KEYS] : []);
      expect(violations.length === 0, `${state}: packetViolations agrees`).toBe(verdict === "ADOPT");
      witness[state] = { reference: verdict, readyPackets, violations: violations.length };
    }
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
  B6: async () => {
    const gate = (fields: JsonObject): JsonObject => ({ id: GATE, title: "gate", status: "open", labels: [], ...fields });
    /** B1-B3's own inputs, verbatim. */
    const ruled: JsonObject[] = [
      { notes: "2026-10-23: ruled ADOPT." },
      { notes: "ruled REJECT (no mapping)" },
      { title: "[H2-ADR] ADR: ruled REJECT" },
      { description: "Decision: ruled ADOPT" },
      { notes: "awaiting the API pin" },
      { title: "ADR: ruled ADOPT", notes: "ruled ADOPT" },
      { status: "closed", close_reason: "ruled ADOPT" },
      { status: "closed", notes: "ruled ADOPT-PROTOTYPE" },
      { status: "closed", notes: "overruled ADOPT" },
      { status: "closed", notes: "ruled  ADOPT" },
    ];
    const inputs: { readonly id: string; readonly bead: JsonObject }[] = [
      ...readerCases().map(entry => ({ id: `case:${entry.id}`, bead: entry.bead })),
      ...ruled.map((fields, index) => ({ id: `b1-b3:${index + 1}`, bead: gate(fields) })),
      ...[creationTitle(), "ruled ADOPT or REJECT", "ruled ADOPT|REJECT", "ruled ADOPT / REJECT", "ruled ADOPT, DEFER or REJECT", "(ruled ADOPT or ruled REJECT)"].map((title, index) => ({ id: `b5:${index + 1}`, bead: gate({ title }) })),
      ...["Ruled ADOPT", "ruled Adopt", "RULED ADOPT", "ruled adopt"].map((notes, index) => ({ id: `r5:${index + 1}`, bead: gate({ notes }) })),
      ...PAIRED_INPUTS.map(input => ({ id: `paired:${input.id}`, bead: gate(input.fields) })),
    ];
    const readings = new Map<string, string>();
    for (const input of inputs) readings.set(JSON.stringify(input.bead), await programVerdict(input.bead));
    const programReader: Reader = bead => {
      const verdict = readings.get(JSON.stringify(bead));
      if (verdict !== "ADOPT" && verdict !== "REJECT" && verdict !== "no-verdict") throw new Error(`the program reader read ${String(verdict)} for a judged bead`);
      return verdict;
    };
    const witness = {
      judged: judgeReader(programReader),
      diverging: inputs.filter(input => programReader(input.bead) !== reference(input.bead)).map(input => input.id),
      readings: inputs.map(input => `${input.id} ${programReader(input.bead)}`),
    };
    expect([witness.judged, witness.diverging]).toEqual([[], []]);
    return witness;
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
  C5: async () => {
    const packets = gatedPackets();
    const gates: Readonly<Record<string, JsonObject>> = { reject: { notes: "ruled REJECT" }, defer: { notes: "ruled DEFER" }, adopt: { notes: "ruled ADOPT" }, none: { notes: "awaiting" }, titleOnly: { title: creationTitle() } };
    const compiled: Record<string, Json> = {};
    for (const [name, fields] of Object.entries(gates)) {
      const bead = { id: GATE, ...fields };
      const verdict = await programVerdict(bead);
      if (verdict !== "ADOPT" && verdict !== "REJECT" && verdict !== "DEFER" && verdict !== "no-verdict") throw new Error(`the program reader read ${verdict} for the ${name} gate`);
      compiled[name] = { verdict, judged: judgeCompile(reference(bead), compileGated(verdict, packets), packets, true) };
    }
    const epic: StoreBead = { id: EPIC, title: "epic", status: "open", issue_type: "epic", priority: 2, labels: [PROGRAM_LABEL] };
    const gate: StoreBead = { id: GATE, title: creationTitle(), status: "closed", issue_type: "decision", priority: 2, labels: [PROGRAM_LABEL], notes: "ruled ADOPT", edges: [{ to: EPIC, type: "parent-child" }] };
    const blocked: StoreBead = { ...packetBead("TSX-H2-01"), edges: [{ to: EPIC, type: "parent-child" }, { to: GATE, type: "blocks" }] };
    const related: StoreBead = { ...packetBead("TSX-H2-01"), edges: [{ to: EPIC, type: "parent-child" }, { to: GATE, type: "related" }] };
    const witness = {
      compiled,
      blocksEdge: await refusal(readProgram(programClient([epic, gate, blocked]).client, { "TSX-H2-01": GATE })),
      relatedEdge: (await readProgram(programClient([epic, gate, related]).client, { "TSX-H2-01": GATE })).ready,
    };
    expect(Object.values(compiled).map(entry => (isObject(entry) ? entry.judged : null))).toEqual(Object.keys(gates).map(() => []));
    expect([witness.blocksEdge, witness.relatedEdge]).toEqual(["validation", ["TSX-H2-01"]]);
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
    // The store's rows are judged here too, not only through the witness compare (wb-ze6u F1, I18 with K20).
    expect([witness.storeProgramRows, witness.storeFamilyRows, witness.storeViolations, witness.mapFamilyRows, witness.mapViolations]).toEqual([[], [], [], [], []]);
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
  D3: async () => {
    const store = producerStore({}).map(bead => (bead.id === EPIC ? { ...bead, labels: [...labelsOf(bead), "family:perf"] } : bead));
    const { client, accessed } = programClient(store);
    const reading = await readProgram(client, Object.fromEntries(GATED_KEYS.map(key => [key, GATE])));
    const witness = {
      familyWhileOpen: familyViolations(store),
      members: [...new Set(accessed)].sort(),
      readingCarriesLabels: /family:|program:|wp:/.test(JSON.stringify(reading)),
      ready: [...reading.ready].sort(),
    };
    expect([witness.familyWhileOpen, witness.members, witness.readingCarriesLabels]).toEqual([["d:rftsx-bhmrd family:perf"], ["dependents", "show"], false]);
    return witness;
  },
  G1: async () => {
    const tracked = trackedPaths();
    return GATED_SCANS.map(scan => familyScan(scan, GATE_PREREQUISITES, "a gate prerequisite", tracked));
  },
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
  ...Object.fromEntries([...SPELLINGS, ...ESCAPES].map(spelling => [spelling.pin, async () => spellingCase(spelling)])),
  E06: async () => trackerFile(".beads/README.md", trackedPaths()),
  E07: async () => trackerFile(".beads/config.yaml", trackedPaths()),
  M1: async () => registrationModel("collected", entry => skipped(entry)),
  M3: async () => registrationModel("collected", (entry, at) => (at.row === "B" ? skipped(entry) : entry)),
  M4: async () => registrationModel("collected", (entry, at) => (ROSTER.rows.find(row => row.id === at.row)?.pins[0]?.id === at.pin ? entry : undefined)),
  M5: async () => registrationModel("collected", (entry, at) => (at.row === "C" ? skipped(entry) : entry)),
  M6: async () => registrationModel("ran", (entry, at) => (at.pin === "B3" ? { ...entry, mode: "skip", state: "skip" } : entry)),
  M7: async () => registrationModel("collected", (entry, at) => (at.row === "D" ? skipped(entry) : entry)),
  M8: async () => {
    const reached = modelReached();
    for (const pin of ["T1", "T2", "T3"]) reached.delete(pin);
    return gapWitness(reachedGaps(reached));
  },
  M9: async () => registrationModel("collected", (entry, at) => (at.pin === "P4" ? { ...entry, mode: "todo" } : entry)),
  I18: async () => {
    const reached = modelReached();
    const d1 = reached.get("D1") ?? null;
    reached.set("D1", isObject(d1) ? { ...d1, storeFamilyRows: ["wb-k20"] } : d1);
    return gapWitness(reachedGaps(reached));
  },
  I12: async () => gapWitness(exportFloorGaps(0, deliveredRecord(notesOf(exportRows(), BEAD)).exportRows)),
  I16: async () => {
    const surface = surfaceOf(
      PROGRAM_SCANS.filter(scan => scan.root !== ".agents"),
      trackedPaths(),
    );
    return { unclassifiedRoots: [...new Set(surface.unclassified.map(path => path.split("/")[0] ?? path))] };
  },
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
    const data = TRACKER_DATA.map(path => join(REPO, path));
    const walkedFiles = [...PROGRAM_SCANS, ...EXEC_SCANS, ...GATED_SCANS].flatMap(scan => filesOf(scan));
    const witness = {
      // The tracker's own files are walked by T1 (wb-ze6u E06, E07); its data never is: no walk reads the export or the log.
      trackerDataWalked: walkedFiles.some(file => data.includes(file)),
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

describe(SUITE, () => {
  afterAll(() => {
    expect(CLOSED.done, "the closing case ran to its end (a runtime skip or a guarded return there leaves this unset)").toBe(true);
  });

  it(JUDGED_SET, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "A:4", "B:6", "C:5", "D:3", "G:1", "P:4", "F:1", "M:18", "R:12", "E:8", "K:11"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
    const witnesses = ROSTER.rows.flatMap(row => row.pins).map(pin => JSON.stringify(pin.witness));
    expect(witnesses.filter((witness, at) => witnesses.indexOf(witness) !== at), "two pins carry one witness, so swapping their cases stays green").toEqual([]);
    // OUTSIDE ANCHORS (wb-ze6u F2): the delivery's record and the follow-up's filing, read from the tracked bead export.
    const rows = exportRows();
    const delivered = deliveredRecord(notesOf(rows, BEAD));
    expect(ROWS.map(row => row.id), "the rows are the delivered rows T to R, then the follow-up's").toEqual([...delivered.shape.map(entry => entry.split(":")[0] ?? ""), ...FOLLOW_UP_ROWS]);
    expect(belowShape(delivered.shape), `rows T to R hold at least the pins ${BEAD}'s delivery recorded (a later cut may add a pin, never drop one)`).toEqual([]);
    const readerShape = readerCutShape(notesOf(rows, READER_CUT));
    expect(readerShape.map(entry => entry.split(":")[0] ?? ""), `the rows ${READER_CUT}'s delivery re-pinned`).toEqual([...READER_CUT_ROWS]);
    expect(belowShape(readerShape), `rows T to D hold at least the pins ${READER_CUT}'s delivery recorded (T4, A4, B6, C5 and D3 among them)`).toEqual([]);
    expect(RESIDUALS.map(residual => residual.name), "the residual names against the delivery's list").toEqual(delivered.residuals);
    expect(RESIDUALS.map(residual => residual.pin), "the residuals are row R's pins").toEqual([...(ROWS.find(row => row.id === "R")?.pins ?? [])]);
    const filed = filedIds(notesOf(rows, FOLLOW_UP));
    expect([...(ROWS.find(row => row.id === "E")?.pins ?? [])], `row E against the escapes ${FOLLOW_UP}'s filing names`).toEqual(filed.f3);
    expect([...(ROWS.find(row => row.id === "K")?.pins ?? [])], `row K against the mutants ${FOLLOW_UP}'s filing names`).toEqual([...filed.lead, ...filed.f2]);
    expect(exportFloorGaps(EXPORT_FLOOR, delivered.exportRows), "EXPORT_FLOOR against the export rows the delivery recorded").toEqual([]);
    expect(rootsOf(EXEC_SCANS), "T2's roots: T1's but the scriptless ones").toEqual(rootsOf(PROGRAM_SCANS).filter(root => !SCRIPTLESS_ROOTS.includes(root)));
    expect(rootsOf(GATED_SCANS).sort(), "G1's roots: T1's but the claimless ones, and docs").toEqual(
      [...rootsOf(PROGRAM_SCANS).filter(root => !CLAIMLESS_ROOTS.includes(root)), ...CLAIM_ROOTS].sort(),
    );
    // REGISTRATION (wb-ze6u F1), first: every case of this file is collected exactly as the roster lists it, in run mode.
    expect(registrationGaps(registeredOf(task.file, task), expectedTitles(), "collected"), "the collected task tree against the roster").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.set(pin, witness);
        });
      }
    });
  }

  it(CLOSING, ({ task }) => {
    expect(registrationGaps(registeredOf(task.file, task), expectedTitles(), "ran"), "the task tree after the run against the roster").toEqual([]);
    expect(reachedGaps(REACHED), "REACHED against the roster: every pin, in order, its recorded witness equal to the roster's").toEqual([]);
    CLOSED.done = true;
  });
});
