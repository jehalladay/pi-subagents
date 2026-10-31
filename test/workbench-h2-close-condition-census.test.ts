/**
 * wb-4nut.6 (TSX-HARNESS2-REACTIVE-EVOLUTION-R6, program-triage-2026-10-22), the H2 close-condition census. Statement (the bead's
 * full statement, its note): "Pi-hosted bead machines shall close an H2 bead only on its own condition: a child when the leg its
 * `acceptance` names runs green at one sha on branch bead/<id>/ws-NN and the landing carries `Bead: <id>` (its id); epic
 * rftsx-bhmrd when every ungated child closed, rftsx-rupqh recorded a verdict and the closing-gate receipt (full forge build on
 * main) exists (gated: TSX-H2-ADR verdict + TSX-H2-00 closure, leg ABSENT at the pin); a decision bead when its ruling text lands"
 * (ReactiveFiberTSXSDK docs/programs/harness2-reactive-evolution-2026-10-20/BEADS-2026-10-21.md:54@76bbbffd9d4a). Acceptance (owner
 * filing, verbatim; the labels of rows A to C quote it): "(a) child close refused without a green run of the acceptance-named leg at
 * a named sha on bead/<id>/ws-NN, when the receipt names another file or the landing lacks `Bead: <id>` or carries the epic's/a
 * ruling's id; a docs-only landing leaves it open; (b) epic close refused while rftsx-auqdi is open, rftsx-rupqh has no verdict text
 * or the receipt is missing, never closing a gated packet or ruling transitively; (c) decision-bead close refused without
 * ruling/ADR text; closing every child closes no M0 bead." Not P0 (the filing): no Pi machine closes rftsx beads today; a posture
 * guard.
 *
 * MEASURED (read-only git show and git cat-file -e at the pin by the cutting seat, 2026-10-23; every producer fact rides the roster
 * verbatim with its blob id): the dispatch sentence of :54 ("A child closes only on its public acceptance: the forge leg or test
 * file its `acceptance` field names runs green at one sha on a branch `bead/<id>/ws-NN`, and the landing carries `Bead: <id>` in its
 * message. Epics close when every ungated child has closed and the gate ruling has recorded a verdict. Ruling rows (M0) are decision
 * beads: they close when their ADR or ruling text lands, never by implication.") is byte-identical in the PERF-F deposit
 * (resource-efficiency-frontier-2026-10-17/BEADS-2026-10-21.md:80, the merged TSX-RESOURCE-EFFICIENCY-FRONTIER-R9/R10/R11 drafts)
 * and the INTEROP deposit (component-assembly-2026-10-18/BEADS-2026-10-21.md:77): one rftsx bead protocol. The H2 graph: M0 the epic
 * rftsx-bhmrd and the ruling rows rftsx-7sy4c, rftsx-8er6b, rftsx-e9a5e; M1 the API pin rftsx-auqdi (kind:audit, its acceptance
 * naming tests/audit/harness2-api-pin.test.ts) and the ADR rftsx-rupqh (kind:decision); TSX-H2-01..05 gated on rftsx-rupqh and not
 * created; four adopted beads wired by `related` edge. The leg and API-PIN.md are ABSENT at the pin (cat-file exits 128 for both).
 * PERF-F, carried as the second instance: epic rftsx-sbyih, ruling rftsx-bge18 beside the shared rftsx-7sy4c, ten children M1-M4
 * (rftsx-w9akc kind:decision, "ADR file lands with a registry row"), TSX-PF-03 gated on rftsx-bge18, rftsx-qjxf1, rftsx-j83yd and
 * rftsx-it5ry. PERF-F rides as measured cells, never as verbatim rows (see SCOPE): each bead's id, milestone and kind label, the
 * acceptance cell of the beads the filing or a case names, each packet's key and gate column and each adopted id, every record
 * beside the sha256 of its verbatim producer row. Pi's side: its one Beads module (src/workbench/beads-observer.ts) is a reader whose injected seam offers `show` alone
 * and which reads a closed status as tone unknown ("Closure is a readiness fact, not a verified outcome"); no file under the
 * executable roots launches a bead close. wb-zoq7 (the R694 follow-up from landing 308; its notes in the tracker export carry the
 * gate's F1 and F2 verbatim) re-measured A3's vocabulary against the installed bd 1.1.0-rc.1 (a7903cb34; `bd <command> --help`
 * read from an empty directory outside any store, no store opened). Its close paths: bd close and its alias bd done, bd epic
 * close-eligible, bd todo done, bd duplicate --of, bd supersede --with, bd import (an upsert: a status-closed row rewrites the issue
 * it names), bd gate resolve, bd gate check, bd orphans --fix, bd mol squash (the digest's and the molecule root's close reason),
 * bd duplicates --auto-merge (derived: the help names the merged-away issue's closure), bd update to a closing status (the --status
 * flag or a status=<value> pair) and a bd batch close or closing-update op, written before or after the bd word. The roster carries
 * each help line verbatim. wb-s6jw (the flywheel review of wb-zoq7's cut; its notes carry the escape and the replica probes) re-read
 * every entry the same way under the installed bd 1.1.0-rc.1 (c7aec2c4c; each line the roster carried is byte-identical there) and
 * adds the two direct close verbs that help documents beside them: bd human respond (a human-needed bead closed with reason
 * "Responded") and bd human dismiss (closed with a "Dismissed" reason). The executable surfaces beside SCAN_ROOTS: the repository
 * root's own files (forge.toml's legs, package.json's scripts, the vitest configs) and the tracker's git hooks (.beads/hooks, now a
 * scanned root).
 *
 * THE CLOSE RULE, ARMED. No Pi closer exists, so the rule is armed on a reference: CLOSE_CASES states each clause of the acceptance
 * as a store state (closed ids, leg runs, landings, recorded verdict texts, ruling texts, the closing-gate receipt) over a program
 * graph parsed from the producer's own table rows, with the exact set of beads a closer may close there. `honest` closes a bead only
 * on its own condition and meets every case; each MUTANTS member relaxes one condition and breaks at least one case of its clause. A
 * Pi module that closes beads binds itself in BEAD_CLOSERS (empty today) and must meet every case (B3). The rows:
 *  A, the child close, (a). A1 the child cases: complete evidence (the leg green at one named sha on bead/<id>/ws-NN, a landing
 *    carrying exactly the child's own `Bead:` trailer and a non-docs path) closes the child; a red run, no run, a receipt naming
 *    another file or the leg beside another, no named sha or a sha range, branch machine/flywheel/<id> (the TSX-COMPONENT-ASSEMBLY-R5
 *    pin), another bead's branch or no ws-NN, a landing without the trailer or with the epic's, a ruling's or a second id, and a
 *    docs-only landing each leave it open; PERF-F's three-file leg (rftsx-j83yd) likewise. A2 the leg is the acceptance field's own:
 *    legOf reads the test files and forge legs a child's acceptance names, measured over every child of both programs; a child whose
 *    acceptance names none never closes by this rule; no title names one; over the pinned graph (no receipt, the leg ABSENT) nothing
 *    closes. A3 the trigger: no file under SCAN_ROOTS or ROOT_FILES launches a bead close (the bd word followed within CLOSE_WINDOW
 *    words by every word of a CLOSE_COMMANDS entry or by an update to status closed or done, or a bd batch with a close or closing-
 *    update op within CLOSE_WINDOW words on either side), with floors, anchors and controls, and every gate plant P06-P13 (wb-zoq7's
 *    notes, verbatim) and every review probe (wb-s6jw's notes, verbatim) flagged; the Beads seam offers show alone and its module
 *    exports no writer; a module A3 flags must be bound in BEAD_CLOSERS and every binding must name one (empty both ways today).
 *  B, the epic close, (b). B1 the epic cases: every ungated child closed, a verdict recorded on every gate bead ("ruled ADOPT",
 *    "ruled DEFER" or "ruled REJECT") and a full forge build green on main at a named sha close the epic; rftsx-auqdi open, no
 *    verdict text (a closed gate bead included: closure is never a verdict), text without a verdict, no receipt, a leg receipt, a
 *    receipt off main or a red one each leave it open; PERF-F likewise. B2 never transitively: where the epic closes, the close set
 *    is exactly the epic - no ruling row, no gated packet (no packet key is a bead at the pin) and no adopted bead. B3 every bound
 *    closer meets every case (none bound; the same loop over synthetic bindings is the non-vacuity control).
 *  C, the decision close, (c). C1 the decision cases: a ruling row or ADR bead closes on its own landed, non-empty ruling text and on
 *    nothing else - not unlanded text, not landed emptiness, not its children's closure (never by implication); rftsx-w9akc's
 *    unverified ADR keeps it open. C2 closing every child closes no M0 bead: with every child closed, and in one pass with every
 *    child's own condition met, no M0 bead closes in either program, and Pi's Beads reader, handed the epic beside a closed child,
 *    reads the epic's own status verbatim and the closed child as tone unknown: it derives no closure.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and PROGRAM_SHAPE pins each program's epic, gate
 * beads, beads (`${id}:${milestone}:${kind}`), gated packets and adopted beads as a literal held to the graph parsed from the
 * producer rows the roster carries; the whole judged set - every row's id, label and pins, every pin's witness, the constants and
 * every registered test title - is held to the out-of-file roster, and the labels of rows A to C and the carried PERF-F ids to the
 * bead's own notes in the tracker export (.beads/issues.jsonl); A3's vocabulary rides the roster's bd help lines (an entry, the
 * batch op and the status update each, both ways) and the gate's plants P06-P13 ride wb-zoq7's notes in that same export, each
 * flagged by A3, as do the review's probes on wb-s6jw's notes there. The last case reads the vitest task tree (every registered
 * test, in roster order, in run mode, ran before it) and the set of pins that reached their witness. Not claimed: an edit of this
 * file and the roster together.
 * RESIDUALS (named, each with its pinned quiet row): R-ARGV a close verb more than CLOSE_WINDOW words after the bd word, or held in a
 * variable, and batch ops read from a file (bd batch -f) or piped from a stream composed elsewhere escape A3 (Q1); R-COMPOSED a bd
 * word assembled at runtime escapes A3 (Q2); R-PARAPHRASE a close stated without the bd word - prose, or a status payload for another
 * client - escapes A3 (Q3); R-INSTRUCTION AGENTS.md, .agents/skills/beads/SKILL.md and
 * .beads/README.md teach a generic bd close or done-status update for this repository's own store and name no rftsx bead: instruction
 * text outside A3's executable roots (Q4); R-CONTROLLER a Furnace Run closes its own Work by Furnace's authority on an Attempt's
 * outcome, and Pi's Furnace host spells no bd word: a bead run under Furnace closes outside this census (Q5); R-STORE a direct write
 * of a bead store bypasses bd; the one store write under the executable roots is the VC-4 tier's bd init of a disposable fx store
 * (Q6); R-EVIDENCE the rule judges the evidence a closer states, never its truth: a well-formed green for the leg ABSENT at the pin
 * closes the child under honest too - green is the leg's own exit, echoed, and its truth is the producer's (Q7); R-SCOPE test/ and
 * the tracker export lie outside every scanned root and ROOT_FILES, and both spell the close vocabulary (Q8); R-UNCARRIED five PERF-F children
 * (rftsx-abin9, rftsx-irbta, rftsx-bh3x7, rftsx-zblcp, rftsx-nwut7) ride without their acceptance cell, so the census reads no leg of
 * theirs: an uncarried acceptance names no leg here and the bead never closes by the child rule (Q9); R-SYNC a sync or merge from
 * another store (bd federation sync, bd vc merge, bd dolt pull, a tracker integration's sync such as bd jira sync --pull) carries
 * that store's closed statuses in by the other store's authority, and A3 reads none of them as a close (Q10).
 * SCOPE: PERF-F rides as cells because queued program censuses (wb-csbt.1, wb-csbt.2, wb-if7q.1) read every file below test/ and
 * police that program's own vocabulary: a verbatim PERF-F row in a fixture reads to them as a Pi sentence about the program
 * (measured by overlaying every queued entry beside this cut). The acceptance one-liners are the BEADS snapshot's cells (some cut by the producer with "..."); a closer reads each field
 * from the shared store (wb-4nut.5's duty), and the leg names those cells carry are what this census measures. A receipt naming the
 * leg beside another file is read as naming another file (the acceptance's literal clause). PERF-F's epic waits on a verdict
 * recorded on each of its gate beads (PF:76's gate-bead column; the merged R10 draft: "a verdict token in the gate beads' notes"), a
 * conservative reading. The verdict words are the producer's own ("ruled (ADOPT/DEFER/REJECT)", H2:19); the exact verdict reader is
 * wb-4nut.4's duty and is not re-pinned here. A3 reads no grammar: prose naming the bd word and a close word within the window reds
 * it, and so does a preview or a help read (bd epic close-eligible --dry-run, bd import --dry-run, bd human respond --help) (OVER-READ,
 * disclosed: no executable root or root file spells one today). The producer facts are measured at the pin; Pi vendors no producer
 * file, so a producer change is seen only when the roster is re-measured; likewise the close vocabulary is the installed bd's,
 * re-measured on a bd upgrade.
 *
 * Display paths added: none. Test-only: src, qa, docs and .beads are only read; nothing is written and no scratch is allocated.
 */
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as beadsObserver from "../src/workbench/beads-observer.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import type { ObservationScope } from "../src/workbench/observation.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "h2-close-condition-roster.json");
const BEAD = "wb-4nut.6";
/** ReactiveFiberTSXSDK at the program-triage pin (the bead's citation). */
const PROGRAM_PIN = "76bbbffd9d4a419f972d6fefc8b7f9dc524df8df";

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
      "(a) child close refused without a green run of the acceptance-named leg at a named sha on bead/<id>/ws-NN, when the receipt names another file or the landing lacks `Bead: <id>` or carries the epic's/a ruling's id; a docs-only landing leaves it open",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(b) epic close refused while rftsx-auqdi is open, rftsx-rupqh has no verdict text or the receipt is missing, never closing a gated packet or ruling transitively",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) decision-bead close refused without ruling/ADR text; closing every child closes no M0 bead",
    pins: ["C1", "C2"],
  },
  {
    id: "Q",
    label: "residuals: each named family with its pinned quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
  },
];

type ProgramKey = "h2" | "perfF";
type BeadKind = "epic" | "decision" | "child";
interface ProgramShape {
  readonly epic: string;
  readonly gates: readonly string[];
  readonly beads: readonly string[];
  readonly gated: readonly string[];
  readonly adopted: readonly string[];
}
/** Each program's graph as a literal: held to the graph parsed from the producer rows the roster carries (the judged set). */
const PROGRAM_SHAPE: Readonly<Record<ProgramKey, ProgramShape>> = {
  h2: {
    epic: "rftsx-bhmrd",
    gates: ["rftsx-rupqh"],
    beads: [
      "rftsx-bhmrd:M0:epic", "rftsx-7sy4c:M0:decision", "rftsx-8er6b:M0:decision", "rftsx-e9a5e:M0:decision", "rftsx-auqdi:M1:child",
      "rftsx-rupqh:M1:decision",
    ],
    gated: ["TSX-H2-01", "TSX-H2-02", "TSX-H2-03", "TSX-H2-04", "TSX-H2-05"],
    adopted: ["rftsx-9ofwd", "rftsx-9q9l", "rftsx-flynt", "rftsx-koy9c.4"],
  },
  perfF: {
    epic: "rftsx-sbyih",
    gates: ["rftsx-bge18", "rftsx-qjxf1", "rftsx-j83yd", "rftsx-it5ry"],
    beads: [
      "rftsx-sbyih:M0:epic", "rftsx-bge18:M0:decision", "rftsx-7sy4c:M0:decision", "rftsx-m69sf:M1:child", "rftsx-abin9:M1:child",
      "rftsx-j83yd:M1:child", "rftsx-irbta:M1:child", "rftsx-bh3x7:M1:child", "rftsx-w9akc:M1:decision", "rftsx-qjxf1:M2:child",
      "rftsx-zblcp:M2:child", "rftsx-nwut7:M3:child", "rftsx-it5ry:M4:child",
    ],
    gated: ["TSX-PF-03"],
    adopted: [
      "rftsx-atcqf", "rftsx-atcqf.22", "rftsx-atcqf.23", "rftsx-atcqf.26", "rftsx-atcqf.27", "rftsx-atcqf.36", "rftsx-atcqf.40",
      "rftsx-atcqf.42", "rftsx-atcqf.8", "rftsx-koy9c",
    ],
  },
};
/** The beads the cases name, each held to PROGRAM_SHAPE by the judged set. */
const AUQDI = "rftsx-auqdi";
const RUPQH = "rftsx-rupqh";
const R05 = "rftsx-7sy4c";
const J83YD = "rftsx-j83yd";
const M69SF = "rftsx-m69sf";
const IT5RY = "rftsx-it5ry";
const W9AKC = "rftsx-w9akc";
const BGE18 = "rftsx-bge18";
/** The H2 child's leg: the test file rftsx-auqdi's acceptance names, ABSENT at the pin (the roster's producer.leg). */
const LEG_H2 = "tests/audit/harness2-api-pin.test.ts";
/** The four clauses of the producer's dispatch sentence, each held verbatim to all three deposits (the judged set). */
const DISPATCH_CLAUSES: readonly string[] = [
  "A child closes only on its public acceptance: the forge leg or test file its `acceptance` field names runs green at one sha on a branch `bead/<id>/ws-NN`, and the landing carries `Bead: <id>` in its message.",
  "Epics close when every ungated child has closed and the gate ruling has recorded a verdict.",
  "Ruling rows (M0) are decision beads: they close when their ADR or ruling text lands, never by implication.",
  "A documented design is not an implementation: every child stays open until its public acceptance holds.",
];
/** What the bead's notes carry from the merged PERF-F and INTEROP drafts (the judged set reads each in the tracker export). */
const CARRIED: readonly string[] = [
  "rftsx-sbyih", "TSX-PF-03", "rftsx-bge18", "rftsx-7sy4c", "rftsx-w9akc", "not machine/flywheel/<id>", "never by implication",
];
/** A3's window: a close command counts when all of its words follow the bd word within this many words; a batch op counts within
 * this many words on either side of it. */
const CLOSE_WINDOW = 8;
/** The status values an update closes with. */
const CLOSING_STATUS: readonly string[] = ["closed", "done"];
/** The instruction documents that teach a generic close for this repository's own store (R-INSTRUCTION). */
const INSTRUCTION_FILES: readonly string[] = ["AGENTS.md", ".agents/skills/beads/SKILL.md", ".beads/README.md"];
/** The follow-up bead whose notes carry the gate's plants (R694 follow-up from wb-4nut.6 landing 308: F1 the vocabulary, F2 the roots). */
const FOLLOW_UP = "wb-zoq7";
/** A3's close vocabulary (wb-zoq7 F1; wb-s6jw the human verbs), read from the installed bd 1.1.0-rc.1's own help, each entry beside
 * its help line in the roster: a launch is the bd word followed within CLOSE_WINDOW words by every word of one entry, folded as
 * wordsOf folds them (close and its alias done, which also covers todo done; epic close-eligible; duplicate --of; supersede --with;
 * import; gate resolve; gate check; orphans --fix; mol squash; duplicates --auto-merge; human respond; human dismiss). */
const CLOSE_COMMANDS: readonly (readonly string[])[] = [
  ["close"], ["done"], ["closeeligible"], ["duplicate"], ["supersede"], ["import"], ["gate", "resolve"], ["gate", "check"],
  ["orphans", "fix"], ["mol", "squash"], ["duplicates", "automerge"], ["human", "respond"], ["human", "dismiss"],
];
/** The gate's plants that stayed green at landing 308, each verbatim from wb-zoq7's notes: F1's six src plants (P06-P11; an argv
 * list rides spawnSync("bd", ...) as the gate planted it) and F2's two root configs (P12 a forge.toml leg, P13 an npm script). */
const FINDING_PLANTS: Readonly<Record<string, string>> = {
  P06: 'spawnSync("bd", ["epic", "close-eligible"])',
  P07: '["todo", "done", id]',
  P08: '["duplicate", id, "--of", of]',
  P09: '["supersede", id, "--with", next]',
  P10: `execSync(\`printf 'close \${id} leg green\\n' | bd batch\`)`,
  P11: '["import", "-i", rowsFile]',
  P12: 'command = "bd close rftsx-auqdi"',
  P13: '"zz-close": "bd close rftsx-auqdi"',
};
/** The flywheel-review bead whose notes carry the replica probes of the escape it found in wb-zoq7's cut: bd human respond and bd
 * human dismiss, the installed bd's two direct close verbs that the landed A3 read as quiet. */
const REVIEW = "wb-s6jw";
/** The review's replica probes, each verbatim from wb-s6jw's notes, where the landed judge returned [] for every one (a shell spelling
 * and an argv list for each verb); each is flagged by A3. */
const REVIEW_PLANTS: Readonly<Record<string, string>> = {
  respond: 'bd human respond rftsx-auqdi "fixed"',
  dismiss: "bd human dismiss rftsx-auqdi",
  respondArgv: 'spawnSync("bd", ["human", "respond", id, text])',
  dismissArgv: 'spawnSync("bd", ["human", "dismiss", id, "--note", note])',
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-ARGV": ["Q1"],
  "R-COMPOSED": ["Q2"],
  "R-PARAPHRASE": ["Q3"],
  "R-INSTRUCTION": ["Q4"],
  "R-CONTROLLER": ["Q5"],
  "R-STORE": ["Q6"],
  "R-EVIDENCE": ["Q7"],
  "R-SCOPE": ["Q8"],
  "R-UNCARRIED": ["Q9"],
  "R-SYNC": ["Q10"],
};

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The executable surfaces A3 reads; each floor sits at or below the count measured at base edccd80 (src 115, qa 67, examples 7,
 * .pi 1, .codex 2, .github 2 files) and, for the tracker's git hooks (wb-zoq7), at base 9f6b726 (.beads/hooks 5). Each anchor is read
 * and quiet; the src, qa, .codex and .beads/hooks anchors spell the bd word itself. */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "src/workbench/beads-observer.ts", anchorToken: "bd show" },
  { root: "qa", floor: 50, anchorFile: "qa/workbench/live-furnace-vc4-launch.mjs", anchorToken: "spawnSync('bd', ['init'" },
  { root: "examples", floor: 5, anchorFile: "examples/workflows/gated-fix.js", anchorToken: "gate" },
  { root: ".pi", floor: 1, anchorFile: ".pi/agents/auditor.md", anchorToken: "max_turns" },
  { root: ".codex", floor: 2, anchorFile: ".codex/hooks.json", anchorToken: "bd codex-hook" },
  { root: ".github", floor: 2, anchorFile: ".github/workflows/ci.yml", anchorToken: "setup-node" },
  { root: ".beads/hooks", floor: 5, anchorFile: ".beads/hooks/pre-commit", anchorToken: "bd hooks run pre-commit" },
];
interface RootScan {
  readonly floor: number;
  readonly anchors: readonly { readonly file: string; readonly token: string }[];
}
/** The repository root's own files A3 also reads (wb-zoq7 F2): forge.toml's legs and package.json's scripts run commands and the
 * vitest configs are executed modules, so every regular file at the root is judged but its .md pages (instruction text; AGENTS.md is
 * R-INSTRUCTION's) and git's own .git pointer (a file in a worktree). The floor sits below the 22 files measured at base 9f6b726;
 * each anchor is read and quiet. */
const ROOT_FILES: RootScan = {
  floor: 20,
  anchors: [{ file: "forge.toml", token: "[build.commands." }, { file: "package.json", token: '"scripts": {' }],
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
  readonly programPin: string;
  readonly producer: { [key: string]: JsonValue };
  readonly constants: { [key: string]: JsonValue };
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
  /** The installed bd's version and the help lines A3's vocabulary is read from (wb-zoq7). */
  readonly bd: { [key: string]: JsonValue };
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: JsonValue } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, json(item)]));
}
function textField(value: { [key: string]: JsonValue }, field: string, where: string): string {
  const found = value[field];
  if (typeof found !== "string") throw new Error(`${where}.${field} must be a string`);
  return found;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || typeof raw.bead !== "string" || typeof raw.programPin !== "string") {
    throw new Error("roster must be an object with bead, programPin and rows");
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
  return {
    bead: raw.bead,
    programPin: raw.programPin,
    producer: objectOf(raw.producer, "roster producer"),
    constants: objectOf(raw.constants, "roster constants"),
    tests: strings(raw.tests, "roster tests"),
    rows,
    bd: objectOf(raw.bd, "roster bd"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerPart(name: string): { [key: string]: JsonValue } {
  return objectOf(ROSTER.producer[name], `roster producer.${name}`);
}
const PRODUCER_PROGRAMS = producerPart("programs");
function producerProgram(key: string): { [key: string]: JsonValue } {
  return objectOf(PRODUCER_PROGRAMS[key], `roster producer.programs.${key}`);
}

interface ProducerRow {
  readonly line: number;
  readonly milestone: string;
  readonly text: string;
}
/** A producer table section: each entry its line number, its milestone (milestone tables only) and its verbatim text. */
function producerRows(part: { [key: string]: JsonValue }, field: string, where: string): ProducerRow[] {
  const value = part[field];
  if (!Array.isArray(value)) throw new Error(`${where}.${field} must be a list`);
  return value.map((entry, index): ProducerRow => {
    if (!isObject(entry) || typeof entry.line !== "number" || typeof entry.text !== "string") throw new Error(`${where}.${field}[${index}] needs a line and a text`);
    return { line: entry.line, milestone: typeof entry.milestone === "string" ? entry.milestone : "", text: entry.text };
  });
}
/** A markdown table row's cells: the producer separates them with " | " and none of the carried cells holds one. */
function cellsOf(text: string, width: number, where: string): string[] {
  const cells = text.replace(/^\| /, "").replace(/ \|$/, "").split(" | ");
  if (cells.length !== width) throw new Error(`${where}: ${cells.length} cells, expected ${width}`);
  return cells;
}
function kindOf(labels: string): BeadKind {
  const kind = labels.split(", ").find(label => label.startsWith("kind:"));
  return kind === "kind:epic" ? "epic" : kind === "kind:decision" ? "decision" : "child";
}

interface ProgramBead {
  readonly id: string;
  readonly milestone: string;
  readonly kind: BeadKind;
  readonly title: string;
  readonly acceptance: string;
  /** Whether the roster carries the bead's acceptance cell: every H2 row; the PERF-F beads the filing or a case names. */
  readonly carried: boolean;
}
interface Program {
  readonly key: ProgramKey;
  readonly epic: string;
  readonly gates: readonly string[];
  readonly beads: readonly ProgramBead[];
  readonly gated: readonly string[];
  readonly adopted: readonly string[];
}
/** A measured cell record (PERF-F): the fields one producer row gives, beside the sha256 of that verbatim row. */
function cellRecords(part: { [key: string]: JsonValue }, field: string, where: string): { [key: string]: JsonValue }[] {
  const value = part[field];
  if (!Array.isArray(value)) throw new Error(`${where}.${field} must be a list`);
  return value.map((entry, index) => {
    const record = objectOf(entry, `${where}.${field}[${index}]`);
    const digest = record.rowSha256;
    if (typeof record.line !== "number" || typeof digest !== "string" || !/^[0-9a-f]{64}$/.test(digest)) throw new Error(`${where}.${field}[${index}] needs a line and a row sha256`);
    return record;
  });
}
/** A program's graph from the producer's own rows. H2 rides verbatim: the milestone tables (9 cells), the gated packets (7 cells,
 * the gate bead column naming each gate's id) and the adopted beads (5 cells). PERF-F rides as measured cells (id, milestone, kind
 * label, the carried acceptance cells, each gated packet's key and gate column, each adopted id). An adopted bead wired by several
 * edges sits on several rows (PERF-F lists rftsx-atcqf.40 three times): one bead each. */
function programOf(key: ProgramKey): Program {
  const part = producerProgram(key);
  const where = `producer.programs.${key}`;
  const gateIds = (column: string): string[] => column.match(/rftsx-[a-z0-9.]+/g) ?? [];
  if (Object.hasOwn(part, "cells")) {
    const beads = cellRecords(part, "cells", where).map((cell, index): ProgramBead => {
      const at = `${where}.cells[${index}]`;
      const acceptance = cell.acceptance;
      return {
        id: textField(cell, "id", at), milestone: textField(cell, "milestone", at), kind: kindOf(textField(cell, "kind", at)), title: "",
        acceptance: typeof acceptance === "string" ? acceptance : "", carried: typeof acceptance === "string",
      };
    });
    const packets = cellRecords(part, "gatedCells", where);
    return {
      key,
      epic: beads.find(bead => bead.kind === "epic")?.id ?? "",
      gates: [...new Set(packets.flatMap((cell, index) => gateIds(textField(cell, "gates", `${where}.gatedCells[${index}]`))))],
      beads,
      gated: packets.map((cell, index) => textField(cell, "key", `${where}.gatedCells[${index}]`)),
      adopted: [...new Set(cellRecords(part, "adoptedCells", where).map((cell, index) => textField(cell, "id", `${where}.adoptedCells[${index}]`)))],
    };
  }
  const beads = producerRows(part, "rows", where).map((row): ProgramBead => {
    const cells = cellsOf(row.text, 9, `${where} line ${row.line}`);
    return { id: cells[0] ?? "", milestone: row.milestone, kind: kindOf(cells[8] ?? ""), title: cells[2] ?? "", acceptance: cells[6] ?? "", carried: true };
  });
  const gatedRows = producerRows(part, "gated", where).map(row => cellsOf(row.text, 7, `${where} line ${row.line}`));
  return {
    key,
    epic: beads.find(bead => bead.kind === "epic")?.id ?? "",
    gates: [...new Set(gatedRows.flatMap(cells => gateIds(cells[5] ?? "")))],
    beads,
    gated: gatedRows.map(cells => cells[0] ?? ""),
    adopted: [...new Set(producerRows(part, "adopted", where).map(row => cellsOf(row.text, 5, `${where} line ${row.line}`)[0] ?? ""))],
  };
}
const PROGRAMS: Readonly<Record<ProgramKey, Program>> = { h2: programOf("h2"), perfF: programOf("perfF") };
const shapeOf = (program: Program): ProgramShape => ({
  epic: program.epic,
  gates: [...program.gates],
  beads: program.beads.map(bead => `${bead.id}:${bead.milestone}:${bead.kind}`),
  gated: [...program.gated],
  adopted: [...program.adopted],
});
function beadOf(program: Program, id: string): ProgramBead {
  const found = program.beads.find(bead => bead.id === id);
  if (found === undefined) throw new Error(`${program.key} has no bead ${id}`);
  return found;
}
const childrenOf = (program: Program): string[] => program.beads.filter(bead => bead.milestone !== "M0").map(bead => bead.id);
const m0Of = (program: Program): string[] => program.beads.filter(bead => bead.milestone === "M0").map(bead => bead.id);

/** The test files and forge legs an acceptance field names, sorted: the leg a child closes on. */
const TEST_FILE = /(?:[\w.-]+\/)*[\w.-]+\.(?:test|spec)\.[cm]?[jt]sx?(?![\w.])/g;
const FORGE_LEG = /\bforge run ([a-z][\w-]*)/g;
function legOf(acceptance: string): string[] {
  const files = acceptance.match(TEST_FILE) ?? [];
  const legs = [...acceptance.matchAll(FORGE_LEG)].map(match => `forge run ${match[1] ?? ""}`);
  return [...new Set([...files, ...legs])].sort();
}

interface LegRun {
  readonly files: readonly string[];
  readonly exit: number;
  readonly sha: string;
  readonly branch: string;
}
interface Landing {
  readonly message: string;
  readonly paths: readonly string[];
}
interface Ruling {
  readonly text: string;
  readonly landed: boolean;
}
interface GateReceipt {
  readonly build: "full" | "leg";
  readonly branch: string;
  readonly exit: number;
  readonly sha: string;
}
/** What a closer reads: the store's closed ids, each child's leg run and landing, the verdict text recorded on each gate bead,
 * each decision bead's ruling text and whether it landed, and the closing-gate receipt. */
interface CloseState {
  readonly program: Program;
  readonly closed: readonly string[];
  readonly runs: Readonly<Record<string, LegRun>>;
  readonly landings: Readonly<Record<string, Landing>>;
  readonly verdicts: Readonly<Record<string, string>>;
  readonly rulings: Readonly<Record<string, Ruling>>;
  readonly receipt?: GateReceipt;
}
/** A closer answers which beads it would close now, sorted. */
type Closer = (state: CloseState) => readonly string[];

function own<T>(record: Readonly<Record<string, T>>, key: string): T | undefined {
  return Object.hasOwn(record, key) ? record[key] : undefined;
}
const sameList = (left: readonly string[], right: readonly string[]): boolean => JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
const NAMED_SHA = /^[0-9a-f]{40}$/;
const VERDICT = /\bruled (?:ADOPT|DEFER|REJECT)\b/;
const isDocsPath = (path: string): boolean => path.startsWith("docs/") || path.endsWith(".md");
/** The `Bead: <id>` trailers a landing message carries, in order. */
function trailersOf(message: string): string[] {
  return [...message.matchAll(/^Bead: (\S+)$/gm)].map(match => match[1] ?? "");
}
function onWorkBranch(id: string, branch: string): boolean {
  const prefix = `bead/${id}/ws-`;
  return branch.startsWith(prefix) && /^\d{2}$/.test(branch.slice(prefix.length));
}

/** One condition a mutant drops; the honest closer drops none. */
type Relaxation =
  | "exit" | "files" | "superset" | "sha" | "machineBranch" | "foreignBranch" | "trailer" | "anyTrailer" | "docsOnly" | "run"
  | "legFromTitle" | "openChild" | "verdict" | "verdictFromClosure" | "receipt" | "legReceipt" | "branchReceipt" | "rulingText"
  | "unlanded" | "implication";
function closerWith(relaxed: readonly Relaxation[]): Closer {
  const drops = (relaxation: Relaxation): boolean => relaxed.includes(relaxation);
  const childMayClose = (state: CloseState, bead: ProgramBead): boolean => {
    const leg = legOf(drops("legFromTitle") ? bead.title : bead.acceptance);
    const landing = own(state.landings, bead.id);
    if (leg.length === 0 || landing === undefined) return false;
    const trailers = trailersOf(landing.message);
    const trailerOk = drops("trailer") || (drops("anyTrailer") ? trailers.length > 0 : sameList(trailers, [bead.id]));
    const landingOk = trailerOk && (drops("docsOnly") || landing.paths.some(path => !isDocsPath(path)));
    const run = own(state.runs, bead.id);
    if (run === undefined) return drops("run") && landingOk;
    const filesOk = drops("files") || (drops("superset") ? leg.every(file => run.files.includes(file)) : sameList(run.files, leg));
    const branchOk =
      onWorkBranch(bead.id, run.branch) ||
      (drops("machineBranch") && run.branch === `machine/flywheel/${bead.id}`) ||
      (drops("foreignBranch") && /^bead\/[^/]+\/ws-\d{2}$/.test(run.branch));
    return filesOk && (drops("exit") || run.exit === 0) && (drops("sha") || NAMED_SHA.test(run.sha)) && branchOk && landingOk;
  };
  const epicMayClose = (state: CloseState): boolean => {
    const { program, receipt } = state;
    const childrenOk = drops("openChild") || childrenOf(program).every(id => state.closed.includes(id));
    const verdictOk =
      drops("verdict") || program.gates.every(gate => VERDICT.test(own(state.verdicts, gate) ?? "") || (drops("verdictFromClosure") && state.closed.includes(gate)));
    const receiptOk =
      drops("receipt") ||
      (receipt !== undefined &&
        (receipt.build === "full" || drops("legReceipt")) &&
        (receipt.branch === "main" || drops("branchReceipt")) &&
        receipt.exit === 0 &&
        NAMED_SHA.test(receipt.sha));
    return childrenOk && verdictOk && receiptOk;
  };
  const decisionMayClose = (state: CloseState, bead: ProgramBead): boolean => {
    const ruling = own(state.rulings, bead.id);
    const textOk = ruling !== undefined && (drops("rulingText") || ruling.text.trim().length > 0) && (drops("unlanded") || ruling.landed);
    const implied = drops("implication") && childrenOf(state.program).filter(id => id !== bead.id).every(id => state.closed.includes(id));
    return textOk || implied;
  };
  return state =>
    state.program.beads
      .filter(bead => !state.closed.includes(bead.id))
      .filter(bead => (bead.kind === "epic" ? epicMayClose(state) : bead.kind === "decision" ? decisionMayClose(state, bead) : childMayClose(state, bead)))
      .map(bead => bead.id)
      .sort();
}
const honest: Closer = closerWith([]);
/** Wraps honest: when it closes the epic, the mutant also closes `extra` (a transitive close). */
function cascade(extra: (program: Program) => readonly string[]): Closer {
  return state => {
    const closes = honest(state);
    return closes.includes(state.program.epic) ? [...new Set([...closes, ...extra(state.program)])].sort() : closes;
  };
}
type Clause = "a" | "b" | "c";
interface Mutant {
  readonly clause: Clause;
  readonly close: Closer;
}
/** Each mutant names the close the statement forbids; its clause's cases hold it to at least one violation. */
const MUTANTS: Readonly<Record<string, Mutant>> = {
  closeOnRedRun: { clause: "a", close: closerWith(["exit"]) },
  closeOnAnyFile: { clause: "a", close: closerWith(["files"]) },
  closeOnSupersetRun: { clause: "a", close: closerWith(["superset"]) },
  closeWithoutNamedSha: { clause: "a", close: closerWith(["sha"]) },
  closeOnMachineBranch: { clause: "a", close: closerWith(["machineBranch"]) },
  closeOnForeignBranch: { clause: "a", close: closerWith(["foreignBranch"]) },
  closeWithoutTrailer: { clause: "a", close: closerWith(["trailer"]) },
  closeOnAnyTrailer: { clause: "a", close: closerWith(["anyTrailer"]) },
  closeOnDocsOnly: { clause: "a", close: closerWith(["docsOnly"]) },
  closeWithoutRun: { clause: "a", close: closerWith(["run"]) },
  legFromTitle: { clause: "a", close: closerWith(["legFromTitle"]) },
  closeEpicWithOpenChild: { clause: "b", close: closerWith(["openChild"]) },
  closeEpicWithoutVerdict: { clause: "b", close: closerWith(["verdict"]) },
  verdictFromClosure: { clause: "b", close: closerWith(["verdictFromClosure"]) },
  closeEpicWithoutReceipt: { clause: "b", close: closerWith(["receipt"]) },
  acceptLegReceipt: { clause: "b", close: closerWith(["legReceipt"]) },
  acceptReceiptOffMain: { clause: "b", close: closerWith(["branchReceipt"]) },
  cascadeRulings: { clause: "b", close: cascade(program => program.beads.filter(bead => bead.kind === "decision" && bead.milestone === "M0").map(bead => bead.id)) },
  cascadeGated: { clause: "b", close: cascade(program => program.gated) },
  cascadeAdopted: { clause: "b", close: cascade(program => program.adopted) },
  closeOnEmptyRuling: { clause: "c", close: closerWith(["rulingText"]) },
  closeOnUnlandedRuling: { clause: "c", close: closerWith(["unlanded"]) },
  closeByImplication: { clause: "c", close: closerWith(["implication"]) },
  closeM0WithChildren: {
    clause: "c",
    close: state => {
      const closes = honest(state);
      const children = childrenOf(state.program);
      return children.every(id => state.closed.includes(id) || closes.includes(id)) ? [...new Set([...closes, ...m0Of(state.program).filter(id => !state.closed.includes(id))])].sort() : closes;
    },
  },
};

const SHA_A = "0123456789abcdef0123456789abcdef01234567";
const SHA_B = "89abcdef0123456789abcdef0123456789abcdef";
const H2 = PROGRAMS.h2;
const PERF_F = PROGRAMS.perfF;
const LEG_J = legOf(beadOf(PERF_F, J83YD).acceptance);
const RULED = "ruled ADOPT: candidate and public-port work proceeds after the API pin";
const RULING_TEXT = "R-05: requirement families for the w2 programs, none for harness2 until TSX-H2-00";
const FULL_BUILD: GateReceipt = { build: "full", branch: "main", exit: 0, sha: SHA_B };
function stateOf(program: Program, patch: Partial<Omit<CloseState, "program">> = {}): CloseState {
  return { program, closed: [], runs: {}, landings: {}, verdicts: {}, rulings: {}, ...patch };
}
const greenRun = (id: string, files: readonly string[], patch: Partial<LegRun> = {}): LegRun => ({ files, exit: 0, sha: SHA_A, branch: `bead/${id}/ws-01`, ...patch });
const landingOf = (id: string, patch: Partial<Landing> = {}): Landing => ({
  message: `test(audit): pin the installed API at one sha\n\nBead: ${id}`,
  paths: [LEG_H2],
  ...patch,
});
/** The H2 child with complete evidence except where `run` or `landing` replace a part. */
function h2Child(run: Partial<LegRun> = {}, landing: Partial<Landing> = {}): CloseState {
  return stateOf(H2, { runs: { [AUQDI]: greenRun(AUQDI, [LEG_H2], run) }, landings: { [AUQDI]: landingOf(AUQDI, landing) } });
}
const UNTRAILED = "test(audit): pin the installed API at one sha";
const h2EpicReady = (): Omit<CloseState, "program"> => ({
  closed: [AUQDI, RUPQH], runs: {}, landings: {}, verdicts: { [RUPQH]: RULED }, rulings: {}, receipt: FULL_BUILD,
});
const perfEpicReady = (): Omit<CloseState, "program"> => ({
  closed: childrenOf(PERF_F), runs: {}, landings: {}, verdicts: Object.fromEntries(PERF_F.gates.map(gate => [gate, RULED])), rulings: {}, receipt: FULL_BUILD,
});
const withoutReceipt = (ready: Omit<CloseState, "program">): Omit<CloseState, "program"> => ({
  closed: ready.closed, runs: ready.runs, landings: ready.landings, verdicts: ready.verdicts, rulings: ready.rulings,
});

interface CloseCase {
  readonly name: string;
  readonly clause: Clause;
  readonly state: CloseState;
  readonly expect: readonly string[];
}
/** The acceptance, clause by clause, as store states and the exact close set each allows. */
const CLOSE_CASES: readonly CloseCase[] = [
  { name: "a: the pinned graph states nothing and closes nothing", clause: "a", state: stateOf(H2), expect: [] },
  { name: "a: complete evidence closes the child", clause: "a", state: h2Child(), expect: [AUQDI] },
  { name: "a: a red run", clause: "a", state: h2Child({ exit: 1 }), expect: [] },
  { name: "a: a landing and no run", clause: "a", state: stateOf(H2, { landings: { [AUQDI]: landingOf(AUQDI) } }), expect: [] },
  { name: "a: the receipt names another file", clause: "a", state: h2Child({ files: ["tests/audit/harness2-api.test.ts"] }), expect: [] },
  { name: "a: the receipt names the leg beside another file", clause: "a", state: h2Child({ files: [LEG_H2, "tests/audit/public-exports.test.ts"] }), expect: [] },
  { name: "a: no named sha", clause: "a", state: h2Child({ sha: "HEAD" }), expect: [] },
  { name: "a: a sha range", clause: "a", state: h2Child({ sha: `${SHA_A}..${SHA_B}` }), expect: [] },
  { name: "a: branch machine/flywheel/<id>", clause: "a", state: h2Child({ branch: `machine/flywheel/${AUQDI}` }), expect: [] },
  { name: "a: another bead's branch", clause: "a", state: h2Child({ branch: `bead/${RUPQH}/ws-01` }), expect: [] },
  { name: "a: a branch without ws-NN", clause: "a", state: h2Child({ branch: `bead/${AUQDI}` }), expect: [] },
  { name: "a: the landing lacks the trailer", clause: "a", state: h2Child({}, { message: UNTRAILED }), expect: [] },
  { name: "a: the landing carries the epic's id", clause: "a", state: h2Child({}, { message: `${UNTRAILED}\n\nBead: ${H2.epic}` }), expect: [] },
  { name: "a: the landing carries a ruling's id", clause: "a", state: h2Child({}, { message: `${UNTRAILED}\n\nBead: ${R05}` }), expect: [] },
  { name: "a: the landing carries its own id and the epic's", clause: "a", state: h2Child({}, { message: `${UNTRAILED}\n\nBead: ${AUQDI}\nBead: ${H2.epic}` }), expect: [] },
  { name: "a: a docs-only landing leaves it open", clause: "a", state: h2Child({}, { paths: ["docs/programs/harness2-reactive-evolution-2026-10-20/API-PIN.md"] }), expect: [] },
  {
    name: "a: PERF-F: complete evidence over the three-file leg closes rftsx-j83yd",
    clause: "a",
    state: stateOf(PERF_F, { runs: { [J83YD]: greenRun(J83YD, LEG_J) }, landings: { [J83YD]: landingOf(J83YD, { paths: LEG_J }) } }),
    expect: [J83YD],
  },
  {
    name: "a: PERF-F: a run of two of the three named files",
    clause: "a",
    state: stateOf(PERF_F, { runs: { [J83YD]: greenRun(J83YD, LEG_J.slice(0, 2)) }, landings: { [J83YD]: landingOf(J83YD, { paths: LEG_J }) } }),
    expect: [],
  },
  {
    name: "a: PERF-F: an acceptance naming no leg never closes",
    clause: "a",
    state: stateOf(PERF_F, { runs: { [M69SF]: greenRun(M69SF, [LEG_H2]) }, landings: { [M69SF]: landingOf(M69SF) } }),
    expect: [],
  },
  { name: "b: every ungated child closed, the verdict recorded, a full build green on main: the epic closes", clause: "b", state: stateOf(H2, h2EpicReady()), expect: [H2.epic] },
  { name: "b: rftsx-auqdi open", clause: "b", state: stateOf(H2, { ...h2EpicReady(), closed: [RUPQH] }), expect: [] },
  { name: "b: rftsx-rupqh closed with no verdict text", clause: "b", state: stateOf(H2, { ...h2EpicReady(), verdicts: {} }), expect: [] },
  { name: "b: verdict text without a verdict", clause: "b", state: stateOf(H2, { ...h2EpicReady(), verdicts: { [RUPQH]: "ADR drafted; the ruling is pending" } }), expect: [] },
  { name: "b: the receipt is missing", clause: "b", state: stateOf(H2, withoutReceipt(h2EpicReady())), expect: [] },
  { name: "b: a leg receipt", clause: "b", state: stateOf(H2, { ...h2EpicReady(), receipt: { ...FULL_BUILD, build: "leg" } }), expect: [] },
  { name: "b: a receipt off main", clause: "b", state: stateOf(H2, { ...h2EpicReady(), receipt: { ...FULL_BUILD, branch: `bead/${H2.epic}/ws-01` } }), expect: [] },
  { name: "b: a red receipt", clause: "b", state: stateOf(H2, { ...h2EpicReady(), receipt: { ...FULL_BUILD, exit: 1 } }), expect: [] },
  { name: "b: PERF-F: the epic closes on its own condition", clause: "b", state: stateOf(PERF_F, perfEpicReady()), expect: [PERF_F.epic] },
  {
    name: "b: PERF-F: one child open",
    clause: "b",
    state: stateOf(PERF_F, { ...perfEpicReady(), closed: childrenOf(PERF_F).filter(id => id !== IT5RY) }),
    expect: [],
  },
  {
    name: "b: PERF-F: a verdict on three of the four gate beads",
    clause: "b",
    state: stateOf(PERF_F, { ...perfEpicReady(), verdicts: Object.fromEntries(PERF_F.gates.slice(1).map(gate => [gate, RULED])) }),
    expect: [],
  },
  { name: "c: a ruling row closes on its own landed ruling text", clause: "c", state: stateOf(H2, { rulings: { [R05]: { text: RULING_TEXT, landed: true } } }), expect: [R05] },
  { name: "c: ruling text not landed", clause: "c", state: stateOf(H2, { rulings: { [R05]: { text: RULING_TEXT, landed: false } } }), expect: [] },
  { name: "c: landed with no ruling text", clause: "c", state: stateOf(H2, { rulings: { [R05]: { text: " ", landed: true } } }), expect: [] },
  { name: "c: the ADR bead closes on its own landed ADR text", clause: "c", state: stateOf(H2, { rulings: { [RUPQH]: { text: RULED, landed: true } } }), expect: [RUPQH] },
  { name: "c: never by implication: every child closed", clause: "c", state: stateOf(H2, { closed: childrenOf(H2) }), expect: [] },
  { name: "c: PERF-F: rftsx-bge18 closes on its own landed ruling text", clause: "c", state: stateOf(PERF_F, { rulings: { [BGE18]: { text: RULING_TEXT, landed: true } } }), expect: [BGE18] },
  {
    name: "c: PERF-F: rftsx-w9akc stays open while its ADR is unverified",
    clause: "c",
    state: stateOf(PERF_F, { rulings: { [W9AKC]: { text: "ADR: one instance per worker, shared-process state fenced", landed: false } } }),
    expect: [],
  },
  { name: "c: PERF-F: never by implication: every child closed", clause: "c", state: stateOf(PERF_F, { closed: childrenOf(PERF_F) }), expect: [] },
];
/** The cases a closer breaks (its close set differs from the one the case allows), optionally within one clause. */
function closeViolations(close: Closer, clause?: Clause): string[] {
  return CLOSE_CASES.filter(entry => clause === undefined || entry.clause === clause).flatMap(entry => {
    const closes = close(entry.state);
    return sameList(closes, entry.expect) ? [] : [`${entry.name}: closes [${closes.join(", ")}]`];
  });
}
function clauseWitness(clause: Clause): JsonValue {
  const mutants = Object.fromEntries(Object.entries(MUTANTS).filter(([, mutant]) => mutant.clause === clause).map(([name, mutant]) => [name, closeViolations(mutant.close, clause).length]));
  expect(closeViolations(honest, clause), `the honest closer meets every (${clause}) case`).toEqual([]);
  expect(Object.entries(mutants).filter(([, count]) => count === 0).map(([name]) => name), `a (${clause}) mutant the cases miss`).toEqual([]);
  return json({ cases: CLOSE_CASES.filter(entry => entry.clause === clause).map(entry => ({ name: entry.name, closes: [...honest(entry.state)] })), mutants });
}

interface CloserBinding {
  readonly module: string;
  readonly close: Closer;
}
/** The Pi bead closers: a module A3 flags must be bound here, every binding must name such a module, and every bound closer meets
 * every case (B3). Empty today: Pi closes no bead. */
const BEAD_CLOSERS: readonly CloserBinding[] = [];

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
const byName = (left: Dirent, right: Dirent): number => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort(byName)) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
/** The regular files at the repository root A3 reads (ROOT_FILES): all but the .md pages and git's .git pointer. */
function rootFiles(): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .sort(byName)
    .filter(entry => entry.isFile() && entry.name !== ".git" && !entry.name.endsWith(".md"))
    .map(entry => join(REPO, entry.name));
}
/** Every file A3 judges: the files below each scanned root, then the root's own files. */
function executableFiles(): string[] {
  return [...SCAN_ROOTS.flatMap(scan => filesBelow(join(REPO, scan.root))), ...rootFiles()];
}
/** The words a text spells, folded (lowercased; "_", "-" and "$" dropped, so flags, snake, kebab and camel forms agree). */
function wordsOf(text: string): string[] {
  return (text.match(/[A-Za-z0-9_$-]+/g) ?? []).map(word => word.toLowerCase().replace(/[_$-]/g, ""));
}
/** Whether words hold an update whose status flag or key names a closing status (--status closed, -s done, status=closed). */
function statusWriteIn(words: readonly string[]): boolean {
  return words.includes("update") && words.some((item, at) => (item === "status" || item === "s") && CLOSING_STATUS.includes(words[at + 1] ?? ""));
}
/** A3's judge: each bd word followed within CLOSE_WINDOW words by every word of a CLOSE_COMMANDS entry or by a closing status update,
 * or naming a batch whose close or closing-update op sits within CLOSE_WINDOW words on either side (bd batch reads its ops from stdin,
 * so a piped op precedes the bd word); each with the window it read after the bd word. */
function closeLaunchesIn(text: string): string[] {
  const words = wordsOf(text);
  const found: string[] = [];
  words.forEach((word, index) => {
    if (word !== "bd") return;
    const window = words.slice(index + 1, index + 1 + CLOSE_WINDOW);
    const before = words.slice(Math.max(0, index - CLOSE_WINDOW), index);
    const command = CLOSE_COMMANDS.some(entry => entry.every(member => window.includes(member)));
    const batch = window.includes("batch") && (before.includes("close") || statusWriteIn(before));
    if (command || statusWriteIn(window) || batch) found.push(["bd", ...window].join(" "));
  });
  return found;
}
/** Words joined at runtime, so a composed control never sits on one source line. */
function compose(...words: string[]): string {
  return words.join(" ");
}
/** The members of the Beads seam interface, read from the module's own text. */
function seamMembers(): string[] {
  const text = textOf(join(REPO, "src", "workbench", "beads-observer.ts"));
  const body = /export interface BeadsReadClient \{([^}]*)\}/.exec(text)?.[1] ?? "";
  return [...body.matchAll(/^\s*(\w+)\s*[(:]/gm)].map(match => match[1] ?? "").sort();
}

/** A bead's own notes in the tracker export: wb-4nut.6's carry the acceptance text rows A to C quote, wb-zoq7's the gate's plants. */
function notesOf(id: string): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** A plant as the gate planted it: an argv list rides spawnSync("bd", ...), any other plant stands as written. */
const launchOf = (plant: string): string => (plant.startsWith("[") ? `spawnSync("bd", ${plant})` : plant);
/** A row label's quoted acceptance text: the label without its leading clause tag. */
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}

const SCOPE: ObservationScope = { workspace: "/fixture/rftsx", principal: "operator" };
const AT = "2026-10-23T09:00:00.000Z";
/** Pi's Beads reader over a fake `bd show`: the store rows it is handed, one per id. */
function fakeShow(rows: Readonly<Record<string, JsonValue>>): beadsObserver.BeadsReadClient {
  return {
    show: async (id: string) => ({ exit: 0, stdout: JSON.stringify([own(rows, id) ?? null]), stderr: "" }),
  };
}
async function readTone(client: beadsObserver.BeadsReadClient, workId: string): Promise<{ status: string; tone: string; relations: string[] }> {
  const reading = await beadsObserver.readBeadsWork(client, {
    workId, workspaceRoot: SCOPE.workspace, scope: SCOPE, limits: { maxDependencies: 10, maxTitleChars: 120, timeoutMs: 1_000 }, now: () => AT,
  });
  const projection = beadsObserver.projectBeadsWork(reading, SCOPE);
  return {
    status: projection.snapshot.node.statusText,
    tone: projection.snapshot.node.statusTone,
    relations: projection.relations.map(relation => `${relation.kind} ${relation.from.id} -> ${relation.to.id}`),
  };
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => clauseWitness("a"),
  A2: async () => {
    const legs = Object.fromEntries(
      (Object.keys(PROGRAMS) as ProgramKey[]).map(key => [
        key,
        Object.fromEntries(PROGRAMS[key].beads.filter(bead => bead.milestone !== "M0" && bead.carried).map(bead => [bead.id, legOf(bead.acceptance)])),
      ]),
    );
    const legless = (Object.keys(PROGRAMS) as ProgramKey[]).flatMap(key =>
      PROGRAMS[key].beads.filter(bead => bead.kind === "child" && bead.carried && legOf(bead.acceptance).length === 0).map(bead => bead.id),
    );
    const leglessCloses = (Object.keys(PROGRAMS) as ProgramKey[]).flatMap(key =>
      PROGRAMS[key].beads
        .filter(bead => bead.kind === "child" && bead.carried && legOf(bead.acceptance).length === 0)
        .flatMap(bead => honest(stateOf(PROGRAMS[key], { runs: { [bead.id]: greenRun(bead.id, [LEG_H2]) }, landings: { [bead.id]: landingOf(bead.id) } }))),
    );
    const titled = (Object.keys(PROGRAMS) as ProgramKey[]).flatMap(key => PROGRAMS[key].beads.flatMap(bead => legOf(bead.title)));
    const pinned = Object.fromEntries((Object.keys(PROGRAMS) as ProgramKey[]).map(key => [key, [...honest(stateOf(PROGRAMS[key]))]]));
    const leg = producerPart("leg");
    expect(legOf(beadOf(H2, AUQDI).acceptance), "rftsx-auqdi's acceptance names the H2 leg").toEqual([LEG_H2]);
    expect({ path: textField(leg, "path", "producer.leg"), present: leg.present }, "the leg is ABSENT at the pin").toStrictEqual({ path: LEG_H2, present: false });
    expect(leglessCloses, "a child whose acceptance names no leg never closes").toEqual([]);
    expect(titled, "no title names a leg").toEqual([]);
    expect(Object.values(pinned).flat(), "the pinned graph closes nothing").toEqual([]);
    return json({ legs, legless, leglessCloses, titled, pinned, forgeLeg: legOf("`forge run census` exits 0 on main"), legPresentAtPin: leg.present });
  },
  A3: async () => {
    const roots = SCAN_ROOTS.map(scan => {
      const files = filesBelow(join(REPO, scan.root));
      const anchor = join(REPO, scan.anchorFile);
      const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken) && closeLaunchesIn(textOf(anchor)).length === 0;
      expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
      expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was read and is quiet`).toBe(true);
      return { root: scan.root, floor: files.length >= scan.floor, anchor: anchorRead, files };
    });
    const top = rootFiles();
    const root = {
      floor: top.length >= ROOT_FILES.floor,
      anchors: ROOT_FILES.anchors.map(anchor => {
        const path = join(REPO, anchor.file);
        return top.includes(path) && textOf(path).includes(anchor.token) && closeLaunchesIn(textOf(path)).length === 0;
      }),
    };
    expect(root.floor, `the root: ${top.length} files read, floor ${ROOT_FILES.floor}`).toBe(true);
    expect(root.anchors, "the root: each anchor was read and is quiet").toEqual(ROOT_FILES.anchors.map(() => true));
    const judged = [...roots.flatMap(scan => scan.files), ...top];
    const launched = judged.flatMap(file => closeLaunchesIn(textOf(file)).map(found => `${relative(REPO, file)}: ${found}`));
    const launchingModules = [...new Set(launched.map(entry => entry.slice(0, entry.indexOf(":"))))];
    const bound = BEAD_CLOSERS.map(binding => binding.module);
    const controls = {
      flagged: [
        "bd close wb-1",
        'spawnSync("bd", ["close", id])',
        "execFileSync('bd', ['update', id, '--status', 'closed'])",
        "bd -C /repo --db .beads close rftsx-auqdi --reason green",
        "bd update rftsx-auqdi -s closed",
        'execSync("bd close " + id)',
        "BEADS_ACTOR=machine bd close rftsx-bhmrd",
        "bd update rftsx-auqdi --status=done",
        'spawnSync("bd", ["done", id])',
        "bd gate resolve rftsx-rupqh --reason ruled",
        "bd gate check",
        "bd orphans --fix",
        "bd mol squash rftsx-bhmrd",
        "bd duplicates --auto-merge",
        "printf 'update rftsx-auqdi status=closed\\n' | bd batch",
        "bd batch <<EOF\nclose rftsx-auqdi green\nEOF",
        'bd human respond rftsx-auqdi -r "approved"',
        'bd human dismiss rftsx-auqdi --reason "no longer applicable"',
        "execFileSync('bd', ['human', 'respond', id, '--response', text])",
        "BEADS_ACTOR=machine bd -C /repo human dismiss rftsx-bhmrd",
      ].map(text => closeLaunchesIn(text).length),
      quiet: [
        "bd show rftsx-auqdi --json",
        "bd list --status closed --json",
        "bd update rftsx-auqdi --notes closed",
        "bd show rftsx-auqdi | jq .close_reason",
        "socket.close()",
        "bd ready --json",
        "bd dep list rftsx-bhmrd",
        "bd epic status rftsx-bhmrd",
        "bd todo list",
        "bd gate list --all",
        "bd mol show rftsx-bhmrd",
        "bd duplicates --dry-run",
        "bd orphans",
        "printf 'create task 2 probe\\n' | bd batch",
        "bd hooks run pre-commit",
        "bd human list",
        "bd human stats --json",
      ].map(text => closeLaunchesIn(text).length),
    };
    const followUp = notesOf(FOLLOW_UP);
    const plants = Object.fromEntries(
      Object.entries(FINDING_PLANTS).map(([id, plant]) => [id, { carried: followUp.includes(plant), launches: closeLaunchesIn(launchOf(plant)).length }]),
    );
    const review = notesOf(REVIEW);
    const reviewPlants = Object.fromEntries(
      Object.entries(REVIEW_PLANTS).map(([id, plant]) => [id, { carried: review.includes(plant), launches: closeLaunchesIn(plant).length }]),
    );
    const exports = Object.keys(beadsObserver).sort();
    expect(launched, "a file under the executable roots or at the root launching a bead close").toEqual([]);
    expect(launchingModules.filter(module => !bound.includes(module)), "a launching module not bound in BEAD_CLOSERS").toEqual([]);
    expect(bound.filter(module => !launchingModules.includes(module)), "a binding naming no launching module").toEqual([]);
    expect(controls.flagged.every(count => count > 0) && controls.quiet.every(count => count === 0), "the judge's controls").toBe(true);
    expect(
      Object.entries(plants).filter(([, entry]) => !entry.carried || entry.launches === 0).map(([id]) => id),
      `a gate plant ${FOLLOW_UP}'s notes do not carry or A3 misses`,
    ).toEqual([]);
    expect(
      Object.entries(reviewPlants).filter(([, entry]) => !entry.carried || entry.launches === 0).map(([id]) => id),
      `a review probe ${REVIEW}'s notes do not carry or A3 misses`,
    ).toEqual([]);
    expect(seamMembers(), "the Beads seam offers show alone").toEqual(["show"]);
    return json({
      roots: roots.map(({ root, floor, anchor }) => ({ root, floor, anchor })), root, launched, bound, controls, plants, reviewPlants,
      seam: seamMembers(), exports,
    });
  },
  B1: async () => clauseWitness("b"),
  B2: async () => {
    const programs = Object.fromEntries(
      ([["h2", stateOf(H2, h2EpicReady())], ["perfF", stateOf(PERF_F, perfEpicReady())]] as const).map(([key, state]) => {
        const closes = [...honest(state)];
        const beadIds = state.program.beads.map(bead => bead.id);
        return [key, {
          closes,
          rulingsOpen: state.program.beads.filter(bead => bead.kind === "decision" && bead.milestone === "M0").map(bead => bead.id).filter(id => !closes.includes(id)),
          gatedAreBeads: state.program.gated.some(packet => beadIds.includes(packet)),
          adoptedAreBeads: state.program.adopted.some(id => beadIds.includes(id)),
        }];
      }),
    );
    const cascades = Object.fromEntries(["cascadeRulings", "cascadeGated", "cascadeAdopted"].map(name => [name, closeViolations(MUTANTS[name]?.close ?? honest, "b")]));
    expect(Object.values(programs).map(entry => entry.closes), "where the epic closes, the close set is exactly the epic").toEqual([[H2.epic], [PERF_F.epic]]);
    expect(Object.values(cascades).every(found => found.length > 0), "every transitive close breaks a case").toBe(true);
    return json({ programs, cascades });
  },
  B3: async () => {
    const meets = (bindings: readonly CloserBinding[]): Record<string, number> => Object.fromEntries(bindings.map(binding => [binding.module, closeViolations(binding.close).length]));
    const bound = meets(BEAD_CLOSERS);
    const synthetic = meets([{ module: "synthetic/honest", close: honest }, { module: "synthetic/closeOnMachineBranch", close: MUTANTS.closeOnMachineBranch?.close ?? honest }]);
    expect(Object.values(bound).filter(count => count > 0), "a bound closer breaking a case").toEqual([]);
    expect(synthetic, "the loop reads a breaking binding").toEqual({ "synthetic/honest": 0, "synthetic/closeOnMachineBranch": 1 });
    return json({ bound, synthetic, cases: CLOSE_CASES.length });
  },
  C1: async () => clauseWitness("c"),
  C2: async () => {
    const programs = Object.fromEntries(
      (Object.keys(PROGRAMS) as ProgramKey[]).map(key => {
        const program = PROGRAMS[key];
        const legged = program.beads.filter(bead => bead.kind === "child" && legOf(bead.acceptance).length > 0);
        const onePass = stateOf(program, {
          runs: Object.fromEntries(legged.map(bead => [bead.id, greenRun(bead.id, legOf(bead.acceptance))])),
          landings: Object.fromEntries(legged.map(bead => [bead.id, landingOf(bead.id, { paths: legOf(bead.acceptance) })])),
          rulings: Object.fromEntries(program.beads.filter(bead => bead.kind === "decision" && bead.milestone !== "M0").map(bead => [bead.id, { text: RULED, landed: true }])),
        });
        const m0 = m0Of(program);
        return [key, { m0, afterChildren: [...honest(stateOf(program, { closed: childrenOf(program) }))], onePass: [...honest(onePass)] }];
      }),
    );
    const client = fakeShow({
      [H2.epic]: { id: H2.epic, title: "[H2] TSX Context Candidates", status: "open", issue_type: "epic", priority: 2, dependencies: [] },
      [AUQDI]: {
        id: AUQDI, title: "[H2] API pin", status: "closed", issue_type: "task", priority: 1, closed_at: AT, close_reason: "leg green",
        dependencies: [{ id: H2.epic, status: "open", dependency_type: "parent-child" }],
      },
    });
    const reader = { epic: await readTone(client, H2.epic), child: await readTone(client, AUQDI) };
    for (const entry of Object.values(programs)) {
      expect([...entry.afterChildren, ...entry.onePass].filter(id => entry.m0.includes(id)), "closing every child closes no M0 bead").toEqual([]);
    }
    expect(reader.epic.status, "the reader echoes the epic's own status").toBe("open");
    expect(reader.child.tone, "a closed child reads tone unknown, never an outcome").toBe("unknown");
    return json({ programs, reader });
  },
  Q1: async () => {
    const held = 'const verb = "close"; spawnSync("bd", [verb, id]);';
    const far = "bd -C /work/repo --db /work/repo/.beads --actor machine --quiet --no-daemon close rftsx-auqdi";
    const edge = `bd ${"x ".repeat(CLOSE_WINDOW - 1)}close`;
    const fromFile = 'spawnSync("bd", ["batch", "-f", opsFile]);';
    const piped = "cat ops.txt | bd batch";
    return json({
      held: closeLaunchesIn(held).length, far: closeLaunchesIn(far).length, edge: closeLaunchesIn(edge).length,
      fromFile: closeLaunchesIn(fromFile).length, piped: closeLaunchesIn(piped).length,
    });
  },
  Q2: async () => {
    const joined = 'spawnSync(["b", "d"].join(""), ["close", id]);';
    const added = 'execSync("b" + "d" + " close " + id);';
    return json({ joined: closeLaunchesIn(joined).length, added: closeLaunchesIn(added).length });
  },
  Q3: async () => {
    const prose = compose("Close", "the", "bead", "once", "its", "leg", "is", "green.");
    const payload = 'await rpc.call("update", { id, status: "closed" });';
    return json({ prose: closeLaunchesIn(prose).length, payload: closeLaunchesIn(payload).length });
  },
  Q4: async () => {
    const files = Object.fromEntries(
      INSTRUCTION_FILES.map(file => {
        const text = textOf(join(REPO, file));
        return [file, { read: text.length > 0, launches: closeLaunchesIn(text).length > 0, namesRftsx: /rftsx-/.test(text) }];
      }),
    );
    const judged = executableFiles();
    const scanned = INSTRUCTION_FILES.filter(file => judged.includes(join(REPO, file)));
    return json({ files, scanned });
  },
  Q5: async () => {
    const host = textOf(join(REPO, "src", "workbench", "hosts", "furnace-hosted.ts"));
    return json({ read: host.length > 0, bdWords: wordsOf(host).filter(word => word === "bd").length, launches: closeLaunchesIn(host) });
  },
  Q6: async () => {
    const launcher = textOf(join(REPO, "qa", "workbench", "live-furnace-vc4-launch.mjs"));
    const bdArgv = [...launcher.matchAll(/spawnSync\('bd', \[([^\]]*)\]/g)].map(match => (match[1] ?? "").split(", ").map(item => item.replace(/^'|'$/g, "")));
    const storeJoins = [...launcher.matchAll(/join\(root, '\.beads', '([^']+)'/g)].map(match => match[1] ?? "");
    const exportReaders = executableFiles().filter(file => textOf(file).includes("issues.jsonl")).map(file => relative(REPO, file));
    return json({ bdArgv, storeJoins, exportReaders });
  },
  Q7: async () => {
    const fabricated = h2Child();
    return json({ legPresentAtPin: producerPart("leg").present ?? null, closes: [...honest(fabricated)] });
  },
  Q8: async () => {
    const census = textOf(fileURLToPath(import.meta.url));
    const exported = textOf(join(REPO, ".beads", "issues.jsonl"));
    const judged = executableFiles().map(file => relative(REPO, file));
    return json({
      scanned: SCAN_ROOTS.map(scan => scan.root),
      reads: { test: judged.some(file => file.startsWith("test/")), export: judged.includes(".beads/issues.jsonl") },
      testSpells: closeLaunchesIn(census).length > 0,
      exportSpells: closeLaunchesIn(exported).length > 0,
    });
  },
  Q9: async () => {
    const uncarried = (Object.keys(PROGRAMS) as ProgramKey[]).flatMap(key => PROGRAMS[key].beads.filter(bead => !bead.carried).map(bead => `${key}:${bead.id}`));
    const closes = PERF_F.beads
      .filter(bead => !bead.carried)
      .flatMap(bead => honest(stateOf(PERF_F, { runs: { [bead.id]: greenRun(bead.id, [LEG_H2]) }, landings: { [bead.id]: landingOf(bead.id) } })));
    return json({ uncarried, closes });
  },
  Q10: async () => {
    const syncs: Readonly<Record<string, string>> = {
      federation: "bd federation sync --strategy theirs",
      merge: "bd vc merge main --strategy theirs",
      pull: "bd dolt pull",
      tracker: "bd jira sync --pull --state closed",
    };
    return json(Object.fromEntries(Object.entries(syncs).map(([name, text]) => [name, closeLaunchesIn(text).length])));
  },
};

describe("wb-4nut.6 H2 close-condition census (TSX-HARNESS2-REACTIVE-EVOLUTION-R6)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the producer rows, the bead's notes and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2", "Q:10"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, programPin: PROGRAM_PIN }).toStrictEqual({ bead: ROSTER.bead, programPin: ROSTER.programPin });
    expect(textField(ROSTER.producer, "pin", "producer"), "the producer facts were read at the program pin").toBe(PROGRAM_PIN);
    expect({
      programShape: PROGRAM_SHAPE, leg: LEG_H2, dispatchClauses: DISPATCH_CLAUSES, carried: CARRIED, closeWindow: CLOSE_WINDOW,
      closingStatus: CLOSING_STATUS, closeCommands: CLOSE_COMMANDS, instructionFiles: INSTRUCTION_FILES, scanRoots: SCAN_ROOTS,
      rootFiles: ROOT_FILES, followUp: FOLLOW_UP, findingPlants: FINDING_PLANTS, review: REVIEW, reviewPlants: REVIEW_PLANTS,
      residuals: RESIDUALS,
      cases: CLOSE_CASES.map(entry => `${entry.clause}:${entry.expect.join(",")}`), mutants: Object.keys(MUTANTS),
    }).toStrictEqual(ROSTER.constants);
    // A3's vocabulary is the installed bd's: every entry, the batch op and the status update ride help lines, one naming the close.
    expect(textField(ROSTER.bd, "version", "roster bd"), "the help was read from the installed bd 1.1.0-rc.1").toMatch(/^bd version 1\.1\.0-rc\.1 /);
    const help = objectOf(ROSTER.bd.help, "roster bd.help");
    expect(Object.keys(help).sort(), "a help entry for every vocabulary entry, the batch op and the status update").toEqual(
      [...CLOSE_COMMANDS.map(entry => entry.join(" ")), "batch", "update"].sort(),
    );
    for (const [key, entry] of Object.entries(help)) {
      const lines = strings(objectOf(entry, `roster bd.help.${key}`).lines, `roster bd.help.${key}.lines`);
      expect(lines.some(line => /\bclos/i.test(line)), `a help line of ${key} names the close`).toBe(true);
    }
    // Each program's graph, parsed from the producer's own rows, equals its frozen literal.
    for (const key of Object.keys(PROGRAMS) as ProgramKey[]) expect(shapeOf(PROGRAMS[key]), `${key}'s graph`).toStrictEqual(PROGRAM_SHAPE[key]);
    const named: Record<string, ProgramKey> = { [AUQDI]: "h2", [RUPQH]: "h2", [R05]: "h2", [J83YD]: "perfF", [M69SF]: "perfF", [IT5RY]: "perfF", [W9AKC]: "perfF", [BGE18]: "perfF" };
    for (const [id, key] of Object.entries(named)) expect(PROGRAMS[key].beads.map(bead => bead.id), `${id} is a ${key} bead`).toContain(id);
    // The dispatch sentence is one protocol: byte-identical in the three deposits, carrying every clause; the statement line rides H2.
    const deposits = ["h2", "perfF", "componentAssembly"].map(key => textField(producerProgram(key), "dispatch", `producer.programs.${key}`));
    expect(new Set(deposits).size, "the three deposits carry one dispatch sentence").toBe(1);
    const statement = textField(producerPart("statement"), "text", "producer.statement");
    for (const clause of DISPATCH_CLAUSES) expect(`${deposits[0]} ${statement}`, "a dispatch clause the producer states").toContain(clause);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = notesOf(BEAD);
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) expect(notes, `row ${row.id} quotes the bead's acceptance`).toContain(quoteOf(row.label));
    for (const carried of CARRIED) expect(notes, `the bead's notes carry ${carried}`).toContain(carried);
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
