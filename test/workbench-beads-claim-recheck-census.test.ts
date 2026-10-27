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
 *  B, the boundary census, (b). B1 no file under SCAN_ROOTS, and no root manifest (ROOT_MANIFESTS), claims a Beads task (the bd
 *    word with a claim verb, or an update to status in progress, within CLAIM_WINDOW words), with floors, anchors and controls; the
 *    Beads seam offers show alone (every declaration of it under IMPORT_ROOTS read by the TypeScript parser, with spelling
 *    controls; every code file there is parsed and judged on the name the parser reads, with selection controls); a module B1
 *    flags must be bound in BEAD_EXECUTORS and every binding must name one (empty both ways today). B2 the
 *    reader holds no readiness: its source keeps no module-scope let or var and writes no module-scope container, and two reads of
 *    one id issue two shows whose readings follow their own envelopes and stamps. B3 no file under IMPORT_ROOTS imports the reader
 *    (an exact set, empty today) or spells a bd readiness read (READ_VERBS) outside it, with matcher controls and positive floors
 *    (the import matcher finds the reader's own import of redaction.ts; the read judge reads the seam's own bd show). B4 the bead
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
 * require createRequire returns (called on the spot or through a binding not named require), escapes B3 (Q4); R-INSTRUCTION
 * AGENTS.md, .agents/skills/beads/SKILL.md and .beads/README.md teach a generic bd claim for this repository's own store in their
 * rendered text (as marked renders them): instruction text outside B1's executable roots (Q5); R-CONTROLLER the
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
 * B1's seam reader resolves no module either: it reads every SEAM_INTERFACE declaration a code file under IMPORT_ROOTS spells,
 * merged or not, so a same-named interface or type alias TypeScript never merges into the reader's seam (a module-local declaration
 * in another module) reds B1 too (OVER-READ, disclosed by the wb-xogu gate's F5 and pinned by B1's unmergedLocal selection control;
 * no such declaration exists today). B4 reads the carried text by command (a `;`-separated segment), so a flag in a later command
 * is never attributed to an earlier bd word.
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
 * Display paths added: none. Test-only: src, qa, examples, the root manifests, the instruction files and .beads are only read;
 * nothing is written and no scratch is allocated.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
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
/** The members of the Beads seam a module text declares, read by the TypeScript parser over every SEAM_INTERFACE declaration in it -
 * an interface (exported, merged, nested or inside an augmenting `declare module`) or a type alias - so an optional, readonly,
 * generic, accessor, quoted or same-line member, or one after a nested brace, reads by name (wb-xogu F1); an extends clause and an
 * alias of another type read as members of their own, so neither passes as show alone. */
function seamMembersOf(text: string): string[] {
  const source = ts.createSourceFile("seam.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const members: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === SEAM_INTERFACE) {
      for (const clause of node.heritageClauses ?? []) for (const type of clause.types) members.push(`extends ${type.getText(source)}`);
      for (const member of node.members) members.push(memberName(member, source));
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

/** What importsOf reads past between the parts of an import form (wb-dugi F2): whitespace, a block comment (to its first closing
 * delimiter, so a comment never runs on into the code after it) and a line comment (through its newline). */
const IMPORT_GAP = "(?:\\s|/\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/|//[^\\n]*(?:\\n|$))*";
/** A call's opening parenthesis, then any parentheses wrapped around its argument, each past a gap. */
const CALL_OPEN = `\\(${IMPORT_GAP}(?:\\(${IMPORT_GAP})*`;
/** A quoted or template-literal specifier, then the end of the argument: the call's closing parenthesis or a second argument. */
const CALL_SPECIFIER = `["'\`]([^"'\`]+)["'\`]${IMPORT_GAP}[,)]`;
const IMPORT_FORMS = new RegExp(
  `\\b(?:from|import)${IMPORT_GAP}["']([^"']+)["']|\\brequire${IMPORT_GAP}${CALL_OPEN}${CALL_SPECIFIER}|\\bimport${IMPORT_GAP}${CALL_OPEN}${CALL_SPECIFIER}`,
  "g",
);
/** The import specifiers a code text names (static, re-export, require and dynamic forms; the require and dynamic forms read a
 * quoted or a template-literal specifier, wb-xogu F4; every form reads past comments, and the call forms through parentheses
 * around the specifier and before a second argument, wb-dugi F2 - a specifier composed, selected or held at runtime names no
 * module, R-COMPOSED, Q4). */
function importsOf(text: string): string[] {
  return [...text.matchAll(IMPORT_FORMS)].map(match => match[1] ?? match[2] ?? match[3] ?? "");
}
const CODE_FILE = /\.(?:[cm]?ts|[cm]?js)$/;
/** True when a specifier names the module whose file stem is `stem`, with or without an extension. */
function namesModule(specifier: string, stem: string): boolean {
  return new RegExp(`(?:^|/)${stem}(?:\\.[cm]?[jt]s)?$`).test(specifier);
}
/** The Beads seam members a set of module texts declares: every text is parsed and judged by seamMembersOf on the name the
 * parser reads, with no raw-text prefilter, so an interface whose name is spelled through a unicode escape is read (wb-dugi F1).
 * Read merged or not: the reader's own declaration, an augmenting `declare module`, and a same-named declaration TypeScript never
 * merges into the reader's seam (the OVER-READ SCOPE discloses, wb-dugi F5). */
function seamMembersIn(texts: readonly string[]): string[] {
  return texts.flatMap(text => seamMembersOf(text)).sort();
}
/** Every Beads seam member declared under IMPORT_ROOTS: seamMembersIn over every code file there. */
const seamMembers = (): string[] =>
  seamMembersIn(
    IMPORT_ROOTS.flatMap(root => filesBelow(join(REPO, root)))
      .filter(file => CODE_FILE.test(file))
      .map(file => textOf(file)),
  );
function importersOf(stem: string, roots: readonly string[]): string[] {
  return roots
    .flatMap(root => filesBelow(join(REPO, root)))
    .filter(file => CODE_FILE.test(file))
    .map(file => relative(REPO, file))
    .filter(file => file !== READER_MODULE || stem !== "beads-observer")
    .filter(file => importsOf(textOf(join(REPO, file))).some(specifier => namesModule(specifier, stem)));
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
/** A Markdown text as its reader sees it rendered (wb-dugi F3 and F4; wb-xogu F6): marked renders it to HTML, where code (a fence,
 * an indented block, an inline span) is escaped text, so an HTML comment inside code renders literally and is kept; then the
 * page's own HTML comments (an unclosed one runs to the end) and the bodies of script, style and template elements are dropped,
 * every tag is dropped with its attributes (a link's destination and title among them), and the entities are decoded. A link
 * reference definition renders nothing; the text inside an HTML element is kept, as a browser shows it. */
function renderedOf(text: string): string {
  const html = MARKDOWN.parse(text, { async: false });
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?(?:-->|$)/g, " ")
      .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
      .replace(/<[^>]*>/g, " "),
  );
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
      const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken) && claimLaunchesIn(textOf(anchor)).length === 0;
      expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
      expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was read and is quiet`).toBe(true);
      return { root: scan.root, floor: files.length >= scan.floor, anchor: anchorRead, files };
    });
    const manifests = rootManifests();
    const manifestAnchors = ROOT_MANIFESTS.anchors.map(anchor => {
      const path = join(REPO, anchor.file);
      return manifests.includes(path) && textOf(path).includes(anchor.token) && claimLaunchesIn(textOf(path)).length === 0;
    });
    expect(manifests.length >= ROOT_MANIFESTS.floor, `the root manifests: ${manifests.length} read, floor ${ROOT_MANIFESTS.floor}`).toBe(true);
    expect(manifestAnchors, "each root manifest anchor was read and is quiet").toEqual(ROOT_MANIFESTS.anchors.map(() => true));
    const launched = [...roots.flatMap(scan => scan.files), ...manifests].flatMap(file => claimLaunchesIn(textOf(file)).map(found => `${relative(REPO, file)}: ${found}`));
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
    const importers = importersOf("beads-observer", IMPORT_ROOTS);
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
      ].map(text => importsOf(text).filter(specifier => namesModule(specifier, "beads-observer")).length),
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
      ].map(text => importsOf(text).filter(specifier => namesModule(specifier, "beads-observer")).length),
    };
    const bound = BEAD_EXECUTORS.map(binding => binding.module);
    expect(importers, "a file under the import roots importing the Beads reader").toEqual([]);
    expect(importers.filter(module => !bound.includes(module)), "an importer not bound in BEAD_EXECUTORS").toEqual([]);
    expect(floor, "the same matcher finds the reader's own import of redaction.ts").toContain(READER_MODULE);
    expect(controls.flagged.every(count => count === 1) && controls.quiet.every(count => count === 0), "the import matcher's controls").toBe(true);
    // A readiness read outside the seam: no code file but the reader spells a bd read verb.
    const codeFiles = IMPORT_ROOTS.flatMap(root => filesBelow(join(REPO, root)))
      .filter(file => CODE_FILE.test(file))
      .map(file => relative(REPO, file));
    const bypass = codeFiles.filter(file => file !== READER_MODULE && bdReadsIn(textOf(join(REPO, file))).length > 0);
    const seamReads = bdReadsIn(textOf(join(REPO, READER_MODULE))).length > 0;
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
    expect(bypass, "a code file reading bd readiness outside the seam").toEqual([]);
    expect(seamReads, "the same judge reads the seam's own bd show").toBe(true);
    expect(readControls.flagged.every(count => count > 0) && readControls.quiet.every(count => count === 0), "the read judge's controls").toBe(true);
    return json({ importers, bound, readerImportsRedaction: floor.includes(READER_MODULE), controls, bypass, seamReads, readControls });
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
    return json({ quiet, edge, composedImport, runtimeImports, loaderControl, composedControl: claimLaunchesIn(compose("bd", "update", WORK_ID, "--claim")).length });
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
    return json({ files, controls, rendering: renderedClaims });
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
