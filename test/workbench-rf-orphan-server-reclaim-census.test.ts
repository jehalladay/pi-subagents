/**
 * wb-pfxo.8 (RF-COMPOSITIONAL-ASSEMBLY-R9, program-triage-2026-10-22), the absent-today leg. <ENGINE> stands for the storage engine
 * whose sql-servers rf owns (the filing's word). This file never spells it: ENGINE composes it at runtime (residual R4 names what
 * that costs), so row A's walk of test/ holds over this file. Its roster spells it only inside rf's own envelope texts, with no kill
 * verb within WINDOW lines of them, so the walk holds over the roster too.
 *
 * Statement (bead notes, full form): "If Pi ever reclaims rf-owned <ENGINE> sql-servers whose workspace was deleted on its host, it
 * shall use rf storage local-servers --orphaned --stop (served at the pin, parser.py:2392) rather than host-level process kills,
 * never stop a live sibling workspace's server, and pin that the classification proof (gated rfc-vg54d.4 / CASM-P0a fake-/proc
 * journey, test_local_servers_reclaim.py ABSENT at the pin) is unshipped and real /proc assertions hold on Linux hosts only (R-066)"
 * (docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md:15@6a251bf73af5). The acceptance is the owner filing's,
 * verbatim: the labels of rows A-D below, <ENGINE> substituted back by F1.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23; read-only git show on the local ReactiveFiberCLI checkout at 6a251bf73af5, read-only
 * reads of the installed rf 0.1.832 at commit 2618c211be0d, a descendant of the pin): cli/registry.py:1157 names the leaf
 * storage.local-servers with destructive_trigger STOP_FLAG (--stop), json_flag --json and the exclusive groups (--dry-run, --stop)
 * and (--orphaned, --idle, --all, --root, --server-id); cli/parser.py:2392 makes --orphaned the default selector;
 * application/local_servers.py:19-20 and :24 say what --orphaned selects and that an unproven candidate is never selected;
 * tests/journeys/test_local_servers_reclaim.py does not exist at the pin (git cat-file -e, rc 128) while
 * tests/integration/test_local_servers_reclaim.py does: the journey the filing gates on (rfc-vg54d.4, CASM-P0a) is unshipped. The
 * leaf's schema (storage.local-servers.schema.json blob 56a82232), application/local_servers.py, cli/registry.py, cli/interaction.py
 * and persistence/<ENGINE>/server_ledger.py are byte-identical between the pin and the installed build; the parser block and the
 * four cli/main.py lines vendored here are identical at shifted line numbers. R-066 (docs/plans/core-convergence-2026-10-10/
 * 29-program-triage-2026-10-21.md:604 at the pin) is the operator decision that fake-/proc journeys run on Darwin, where the leaf
 * answers an empty report, and real /proc assertions on Linux hosts only.
 *
 * FINDING (pinned by B3, for an owner ruling before any Pi reclaim path ships): the filing's argv carries --json and the trigger
 * --stop but no --yes, and rf's CLI-A4 gate (cli/main.py:1392-1395 over cli/interaction.py:121-132) refuses a destructive form
 * without --yes whenever argv holds a JSON spelling, before any handler runs: a Pi path spawning exactly that argv is answered
 * RF_CONFIRMATION_REQUIRED (exit 2) and reclaims nothing. The census reads this from the vendored lines and never spawns rf: no
 * destructive form was executed to measure it.
 *
 * Pi spawns rf only through the reactivefiber.render.preview provider (a context render), so no Pi surface reclaims an rf-owned
 * server today and the statement's trigger has not fired. The census pins that absence and the acceptance it arms:
 *  T, the trigger, absent today. T1 no src file spells the reclaim leaf (LEAF: local, an optional separator, server or servers, in
 *    any case); T2 no src file spells the engine name (TARGET); T3 no served native descriptor spells either, and Pi's rf read roster
 *    stays reactivefiber.render.preview (RECONCILE_EVIDENCE_READS.reactivefiber, src/workflow/reconcile.ts).
 *  A, acceptance (a). Every script root of this repository (SCRIPT_ROOTS: src, qa, test, examples, .github, .beads/hooks, .codex and
 *    the root's script and config files) has no line pair where a kill verb (KILL) sits within WINDOW lines of the engine name
 *    (TARGET): A1-A8, one per root, each with a floor on the files walked and an anchor file whose token must be read; A9 every script
 *    location package.json's scripts and forge.toml's build commands name by path lies under a walked root (the repository's own
 *    commands, an anchor outside this census).
 *  B, acceptance (b). B1 the filing's argv agrees with rf's registry and parser at the pin (the vendored lines, each block's sha256
 *    pinned); B2 the installed rf's registry capture (test/fixtures/rf-version-leaves.json, landed) serves the leaf; B3 the CLI-A4
 *    reading of that argv (the FINDING above); B4 the reference surfacing (surfaceReclaim: rf's envelope read, nothing classified,
 *    counted or signalled by Pi) of the stop run carries the report and the applied rows verbatim and the judge finds nothing; B5 the
 *    judge refuses a surfacing that drops, reorders, relabels or extends a row, rewrites the report or spawns another selector.
 *  C, acceptance (c). C1 every fixture run follows the producer schema's required key lists in rf's order and its grammars, and the
 *    stop run's ledger holds a deleted-workspace server, a live sibling and one stale entry; C2 the reference stop set is the plan's
 *    (the orphan alone), the sibling's pid never enters it and the count is the envelope's row count; C3 the judge refuses a host
 *    pattern stop set (every listed server) and a count of the stops alone.
 *  D, acceptance (d). D1 the no-/proc empty report surfaces as nothing applied; D2 a no-/proc report naming one unproven ledger entry
 *    likewise, the entry riding the report verbatim; D3 both exit-6 shapes surface as refusals with rf's code: the ledger refusal
 *    (MEASURED) and the stop left incomplete (CONSTRUCTED); D4 the judge refuses success on a refusal, a dropped code, a claim on the
 *    empty report and a count of unproven candidates.
 *  G, the statement's gate: G1 no src, qa or docs file names the gated proof (GATED), so no Pi claim surface treats it as shipped.
 *  F, the owner filing. F1 wb-pfxo.8's row in the tracked bead export carries every FILING_CONSTANTS entry, its acceptance names
 *    exactly the clauses rows A-D cover with each label equal to its clause, and each target the filing quotes for (a) has its own
 *    hitting control in row M, the line `pkill -f '<target>'` (MA1, MA2).
 *  M, the matchers rows A, T and the reference surfacing read: MA1-MA13 must hit the kill window, ML1-ML5 the leaf.
 *  R, the named residuals, each with a pinned quiet row: R1 R-FAR a verb WINDOW+1 lines from the name; R2 R-INTERRUPTED the name
 *    split by a zero-width code point; R3 R-HOMOGLYPH one letter swapped for a look-alike from another script; R4 R-COMPOSED the name
 *    assembled at runtime (this file's own mechanism); R5 R-PID-FILE a kill of a recorded pid whose window never names the engine;
 *    R6 R-SERVICE-STOP a stop through a service manager, no kill verb; R7 R-INTERIOR-LOWER the name inside a lowercase run (the
 *    beads store's directory name); R8 R-INSTRUCTION-TEXT docs, agent skills, Pi agent files, feedback files and root Markdown are
 *    instructions, not scripts, and are not walked (a runbook line there would read as a hit; at base the beads skill names bd's own
 *    killall verb on one such line); R9 R-LEAF-COMPOSED the leaf assembled from parts; R10 R-AGREEING-CLASSIFIER a Pi-side
 *    classifier whose stop set happens to equal rf's plan passes the judge, which sees the set and not who classified it.
 * FIXTURES (the roster's runs): ledgerUntrusted is MEASURED, the installed rf's stdout and exit for the read form `rf storage
 * local-servers --orphaned --json` against a scratch ledger directory of mode 0755 (rf's server-ledger variable), outside every repository, with
 * ambient RF_* variables dropped (exit 6, RF_STORAGE_UNAVAILABLE server_ledger_untrusted, nothing read from /proc or signalled;
 * the scratch path rewritten to /fixture/rf-ledger, nothing else changed); the stop form runs the same survey first
 * (application/local_servers.py:415, before the stop branch at :442), so its ledger refusal is this envelope. stopSibling,
 * emptyNoProc, unprovenNoProc and stopIncomplete are CONSTRUCTED from application/local_servers.py:258-449 and
 * persistence/<ENGINE>/server_ledger.py:1363-1370 at the pin (no rf build produced them); C1 holds each to the schema's key lists
 * and grammars. Witnesses name fixture pids by role (<orphan>, <sibling>).
 * OUTSIDE ANCHORS: F1 (the bead export: rows A-D and controls MA1-MA2), A9 (package.json and forge.toml: roots src, qa, test and
 * the root's files), B2 (the landed rf registry capture), T3 (RECONCILE_EVIDENCE_READS and the native registration). Every other
 * pin is held by the roster alone, so removing one from every literal at once stays green: the seat measured that for A5, R5 and
 * T3 and names it here rather than claim otherwise. The out-of-file roster test/fixtures/rf-orphan-server-reclaim-roster.json
 * holds every row's id, label and pins, every pin's witness and the pinned constants; FROZEN SHAPE (standing rule 16): ROWS pins
 * `${id}:${pins.length}` as a literal.
 * SCOPE: surfaceReclaim and judge are the rule a future Pi reclaim path must meet, not a reclaim path: nothing here spawns rf,
 * signals a process or reads a real /proc (real-/proc assertions are the producer's, Linux-only by R-066). The machine lanes'
 * scripts live outside this repository and are not walked. A later cut that adds a Pi reclaim path brings its argv and its surfacing
 * under rows B-D and re-pins T.
 *
 * Display paths added: none. Test-only: nothing is spawned or written; the repository files read are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-orphan-server-reclaim-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-pfxo.8";
/** The owner triage's read sha of the compositional-assembly program. */
const PROGRAM_PIN = "6a251bf73af5";

/** The engine's name, composed so that no line of this file spells it. */
const ENGINE = ["d", "o", "l", "t"].join("");
const ENGINE_UPPER = ENGINE.toUpperCase();
const ENGINE_TITLE = `${ENGINE.charAt(0).toUpperCase()}${ENGINE.slice(1)}`;
/** What labels and roster text write in the name's place. */
const PLACEHOLDER = "<ENGINE>";

/** Acceptance (b)'s argv, as the filing writes it. */
const FILING_ARGV: readonly string[] = ["rf", "storage", "local-servers", "--orphaned", "--stop", "--json"];
/** rf's exit-6 stop refusal (application/local_servers.py:395), spelled at runtime. */
const STOP_INCOMPLETE = ["RF", ENGINE_UPPER, "SERVER", "STOP", "INCOMPLETE"].join("_");
/** The two targets acceptance (a) quotes; F1 requires, for each, a hitting control in row M that is exactly `pkill -f '<target>'`. */
const FILING_TARGETS: readonly string[] = [`${ENGINE} sql-server`, `.reactive-fiber/${ENGINE}`];
/** The filing text F1 holds this census to: the statement's locator, the producer sites, the gate, the code and the argv. */
const FILING_CONSTANTS: readonly string[] = [
  `BEADS-2026-10-21.md:15@${PROGRAM_PIN}`,
  "parser.py:2392",
  "cli/registry.py:1157",
  "application/local_servers.py:19-20",
  "rfc-vg54d.4",
  "CASM-P0a",
  "test_local_servers_reclaim.py",
  "R-066",
  STOP_INCOMPLETE,
  "exit 6",
  `[${FILING_ARGV.map(token => `'${token}'`).join(",")}]`,
];

/** Row A's verb family, in any case: pkill, killall, killpg, kill (also as a .kill( call), fuser, terminate, pgrep and the two
 * signal names; kill, fuser and terminate count only where no letter precedes them, so "skill" is no verb. */
const KILL = /pkill|SIGKILL|SIGTERM|pgrep|(?<![a-z])(?:kill|fuser|terminate)/i;
/** Row A's target family: the engine's name at a word start or after "_" (lower, Title or upper case), or in Title or upper case
 * after a lowercase letter or digit (camelCase and snake_case identifiers). Both targets the filing quotes carry it. */
const TARGET = new RegExp(`(?:\\b|_)(?:${ENGINE}|${ENGINE_TITLE}|${ENGINE_UPPER})|[a-z0-9](?:${ENGINE_TITLE}|${ENGINE_UPPER})`);
/** A kill-verb line and a target line at most WINDOW lines apart are one hit. */
const WINDOW = 5;
/** T1's leaf family: local, an optional run of white space, "_", "." or "-", then server or servers, in any case. */
const LEAF = /local[\s_.-]*servers?/i;
/** G1's family: the gated proof's journey file, its bead and its requirement id. */
const GATED = /test_local_servers_reclaim|vg54d|CASM-P0a/i;

/** sha256 of each vendored block, newline-terminated lines: `git -C <ReactiveFiberCLI> show 6a251bf73af5:<path> | sed -n '<lines>p'`. */
const EXCERPT_SHA256: Readonly<Record<string, string>> = {
  registry: "32848b1336f59a5cbb3bcd4667d0bcd9569dbd37863cbbf3f599a6599f8985a0",
  flags: "7963ffd17e2dffa70e016f976972ff62792aa36550bd76c7b49c4dad3d3977f5",
  parser: "28cc0dfa9fe55c970fca0d6f65b0f2ca8497fd22ad52786d47f5c459c5fcaa8d",
  confirmFlags: "4983972fa3f6e2b5f1a3f870457a37ca14f2e2e302025cd48fc1bcf93f7475c2",
  confirmation: "f490bd0509e4087d22767bab694bddb5ea99117f3476bda0545e717b63898cb9",
  jsonMode: "427a35886b22780d84ea4b58991bfe944073dd6d8faaec663cfa7371f537b6fb",
  gate: "dd36d1149bd08bdc7fddc62b59b1f0acdd4d1ac311abcecfde27b7ce5de557d2",
};

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The script roots acceptance (a) reads. Each floor sits below the count measured at base f021f8e (src 115, qa 67, test 490,
 * examples 7, .github 2, .beads/hooks 5, .codex 2, root script and config files 19), so an emptied walk reds and an additive change
 * does not; "." walks the root's own regular files with a SCRIPT_EXTENSIONS suffix and nothing below it. */
const SCRIPT_ROOTS: readonly ScanRoot[] = [
  { pin: "A1", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" },
  { pin: "A2", root: "qa", floor: 50, anchorFile: "workbench/local-detached-faults.mjs", anchorToken: "process.kill(" },
  { pin: "A3", root: "test", floor: 400, anchorFile: "helpers/rf-render-fixture.ts", anchorToken: "RF_FIXTURE_RELEASE" },
  { pin: "A4", root: "examples", floor: 5, anchorFile: "workflows/compose.js", anchorToken: "count-child" },
  { pin: "A5", root: ".github", floor: 2, anchorFile: "workflows/ci.yml", anchorToken: "runs-on" },
  { pin: "A6", root: ".beads/hooks", floor: 5, anchorFile: "pre-commit", anchorToken: "BEADS INTEGRATION" },
  { pin: "A7", root: ".codex", floor: 2, anchorFile: "hooks.json", anchorToken: "bd codex-hook" },
  { pin: "A8", root: ".", floor: 15, anchorFile: "package.json", anchorToken: '"scripts"' },
];
const SCRIPT_EXTENSIONS: readonly string[] = [".json", ".toml", ".ts", ".mjs", ".js", ".yml", ".yaml", ".sh"];
/** Instruction text, not scripts (residual R8): never walked by row A. Root Markdown files are excluded with them. */
const INSTRUCTION_ROOTS: readonly string[] = ["docs", ".agents", ".pi", "new-feedback"];
/** Row T's src walk, and G1's three walks; each its own literal (the same floors and anchors as A1 and A2 where the roots match), so
 * no row borrows another row's entry. */
const SRC_SCAN: ScanRoot = { pin: "T", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" };
const GATED_SCANS: readonly ScanRoot[] = [
  { pin: "G1", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" },
  { pin: "G1", root: "qa", floor: 50, anchorFile: "workbench/local-detached-faults.mjs", anchorToken: "process.kill(" },
  { pin: "G1", root: "docs", floor: 50, anchorFile: "workbench/13-contracts-and-config.md", anchorToken: "reactivefiber.render.preview" },
];
/** A token of a command string that names a script by path: a relative path ending in "/" or a script suffix. */
const COMMAND_SCRIPT = /^[\w.-]+(?:\/[\w.-]+)*(?:\/|\.(?:mjs|cjs|js|sh|ts))$/;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: "(trigger, absent today) Pi reclaims no rf-owned server: no src file spells the reclaim leaf or the engine's name, no served native descriptor spells either, and the rf read roster stays reactivefiber.render.preview",
    pins: ["T1", "T2", "T3"],
  },
  {
    id: "A",
    label: "(a) census over Pi lane/cleanup scripts: zero pkill/kill-by-pattern over '<ENGINE> sql-server' or '.reactive-fiber/<ENGINE>'",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  },
  {
    id: "B",
    label: "(b) any Pi reclaim path spawns ['rf','storage','local-servers','--orphaned','--stop','--json'] and surfaces the envelope's result rows verbatim",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) fixture ledger with a deleted-workspace server and a live sibling: the sibling's pid never enters the stop set, the surfaced count is the envelope's",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(d) without /proc the path surfaces the producer's empty report and claims nothing reclaimed; exit 6 is the ledger refusal, never success",
    pins: ["D1", "D2", "D3", "D4"],
  },
  {
    id: "G",
    label: "the classification proof stays unshipped in every Pi claim: no src, qa or docs file names the gated journey, its bead or its requirement id",
    pins: ["G1"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-pfxo.8 in the tracked bead export carries every pinned constant, names exactly the clauses rows A-D cover, states each of their labels as its clause and quotes only targets row M controls",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the kill-window and leaf matchers rows A and T read judge their pinned spellings as hits",
    pins: ["MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MA8", "MA9", "MA10", "MA11", "MA12", "MA13", "ML1", "ML2", "ML3", "ML4", "ML5"],
  },
  {
    id: "R",
    label: "the named residuals R1-R10 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"],
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
interface Run {
  readonly provenance: string;
  readonly exit: number;
  readonly envelope: JsonObject;
}
interface Roster {
  readonly constants: Json;
  readonly rows: readonly RosterRow[];
  readonly excerpts: Readonly<Record<string, Excerpt>>;
  readonly schemaRequired: Readonly<Record<string, readonly string[]>>;
  readonly grammar: JsonObject;
  readonly runs: Readonly<Record<string, Run>>;
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
  if (!isObject(raw.excerpts) || !isObject(raw.schemaRequired) || !isObject(raw.grammar) || !isObject(raw.runs)) {
    throw new Error("roster needs excerpts, schemaRequired, grammar and runs objects");
  }
  const excerpts: Record<string, Excerpt> = {};
  for (const [name, entry] of Object.entries(raw.excerpts)) {
    if (!isObject(entry) || typeof entry.path !== "string" || typeof entry.lines !== "string") throw new Error(`roster excerpts.${name} needs a path and lines`);
    excerpts[name] = { path: entry.path, lines: entry.lines, text: strings(entry.text, `excerpts.${name}.text`) };
  }
  const schemaRequired: Record<string, readonly string[]> = {};
  for (const [name, list] of Object.entries(raw.schemaRequired)) schemaRequired[name] = strings(list, `schemaRequired.${name}`);
  const runs: Record<string, Run> = {};
  for (const [name, entry] of Object.entries(raw.runs)) {
    if (!isObject(entry) || typeof entry.provenance !== "string" || typeof entry.exit !== "number" || !isObject(entry.envelope)) {
      throw new Error(`roster runs.${name} needs a provenance, an exit and an envelope`);
    }
    runs[name] = { provenance: entry.provenance, exit: entry.exit, envelope: entry.envelope };
  }
  return { constants: clone(raw.constants), rows, excerpts, schemaRequired, grammar: raw.grammar, runs };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function runOf(name: string): Run {
  const run = ROSTER.runs[name];
  if (run === undefined) throw new Error(`the roster holds no run ${name}`);
  return run;
}
function excerptOf(name: string): Excerpt {
  const excerpt = ROSTER.excerpts[name];
  if (excerpt === undefined) throw new Error(`the roster holds no excerpt ${name}`);
  return excerpt;
}
function required(name: string): readonly string[] {
  const list = ROSTER.schemaRequired[name];
  if (list === undefined) throw new Error(`the roster holds no required list ${name}`);
  return list;
}
/** The constants the roster mirrors: a change to any of them here re-pins the roster. */
const constants = (): Json =>
  clone({
    argv: FILING_ARGV,
    window: WINDOW,
    excerptSha256: EXCERPT_SHA256,
    scriptRoots: SCRIPT_ROOTS,
    srcScan: SRC_SCAN,
    gatedScans: GATED_SCANS,
    scriptExtensions: SCRIPT_EXTENSIONS,
    instructionRoots: INSTRUCTION_ROOTS,
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
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** A root's files: the whole tree below it, or for "." the root's own script and config files. */
function filesOf(scan: ScanRoot): string[] {
  if (scan.root !== ".") return filesBelow(join(REPO, scan.root));
  return readdirSync(REPO, { withFileTypes: true })
    .filter(entry => entry.isFile() && SCRIPT_EXTENSIONS.some(suffix => entry.name.endsWith(suffix)))
    .map(entry => join(REPO, entry.name));
}
interface Walk {
  readonly files: readonly string[];
  readonly floorMet: boolean;
  readonly anchorRead: boolean;
}
function walked(scan: ScanRoot): Walk {
  const files = filesOf(scan);
  const anchor = join(REPO, scan.root, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(files.length >= scan.floor, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  return { files, floorMet: files.length >= scan.floor, anchorRead };
}
const rel = (path: string): string => relative(REPO, path);

/** Row A's matcher: every (kill-verb line, target line) pair at most WINDOW lines apart, 1-based. */
function windowHits(text: string): Array<[number, number]> {
  const lines = text.split("\n");
  const kills = lines.flatMap((line, index) => (KILL.test(line) ? [index] : []));
  const targets = lines.flatMap((line, index) => (TARGET.test(line) ? [index] : []));
  const hits: Array<[number, number]> = [];
  for (const kill of kills) {
    for (const target of targets) if (Math.abs(kill - target) <= WINDOW) hits.push([kill + 1, target + 1]);
  }
  return hits;
}
function scriptScan(scan: ScanRoot): Json {
  const walk = walked(scan);
  const hits = walk.files.flatMap(file => windowHits(textOf(file)).map(([kill, target]) => `${rel(file)}:${kill}:${target}`));
  expect(hits, `a kill verb within ${WINDOW} lines of the engine's name under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, floorMet: walk.floorMet, anchorRead: walk.anchorRead, hits };
}
function familyScan(scan: ScanRoot, family: RegExp, spelled: string): Json {
  const walk = walked(scan);
  const hits = walk.files.filter(file => family.test(textOf(file))).map(rel);
  expect(hits, `files spelling ${spelled} under ${scan.root}`).toEqual([]);
  return { root: scan.root, floorMet: walk.floorMet, anchorRead: walk.anchorRead, hits };
}
/** A9's reading: the top-level roots of every script a package.json script or a forge.toml build command names by path. */
function commandRoots(): string[] {
  const manifest: unknown = JSON.parse(textOf(join(REPO, "package.json")));
  const scripts = isObject(manifest) && isObject(manifest.scripts) ? Object.values(manifest.scripts) : [];
  const commands = [
    ...scripts.filter((value): value is string => typeof value === "string"),
    ...[...textOf(join(REPO, "forge.toml")).matchAll(/^\s*command\s*=\s*"(.*)"\s*$/gm)].map(match => match[1] ?? ""),
  ];
  const tokens = commands.flatMap(command => command.split(/\s+/)).map(token => token.replace(/^\.\//, ""));
  const named = tokens.filter(token => COMMAND_SCRIPT.test(token) && !token.startsWith("node_modules/"));
  return [...new Set(named.map(token => (token.includes("/") ? (token.split("/")[0] ?? "") : ".")))].sort();
}

interface Served {
  readonly id: string;
  readonly text: string;
}
let served: Promise<readonly Served[]> | undefined;
/** Every descriptor the native registration serves, with its JSON text, loaded once. */
function servedDescriptors(): Promise<readonly Served[]> {
  served ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, text: JSON.stringify(entry.descriptor) }));
  });
  return served;
}

// --- the producer facts -------------------------------------------------------------------------------------------------

const sha256Of = (lines: readonly string[]): string => createHash("sha256").update(lines.map(line => `${line}\n`).join("")).digest("hex");
/** The first capture of `pattern` in a vendored block, or a marker naming what was not read. */
function readIn(name: string, pattern: RegExp): string {
  for (const line of excerptOf(name).text) {
    const found = pattern.exec(line)?.[1];
    if (found !== undefined) return found;
  }
  return `<unread ${name} ${pattern.source}>`;
}
const quoted = (text: string): string[] => [...text.matchAll(/"([^"]+)"/g)].map(match => match[1] ?? "");
/** A flag constant's spelling, read from the vendored registry flag lines. */
const flagValue = (constant: string): string => readIn("flags", new RegExp(`^${constant}: Final = "([^"]+)"$`));
/** What the vendored registry descriptor and parser lines say about the leaf. */
function registryFacts(): { leaf: string[]; destructive: boolean; trigger: string; json: string; modeGroup: string[]; selectors: string[]; defaultSelector: string } {
  const descriptor = excerptOf("registry").text.join("\n");
  const groups = /exclusive_groups=\(\((\w+), (\w+)\), \(([^)]*)\)\)/.exec(descriptor);
  const parserLine = excerptOf("parser").text.find(line => line.includes("(the default)")) ?? "";
  return {
    leaf: readIn("registry", /name="([^"]+)"/).split("."),
    destructive: /destructive=True/.test(descriptor),
    trigger: flagValue(readIn("registry", /destructive_trigger=(\w+)/)),
    json: flagValue(readIn("registry", /json_flag=(\w+)/)),
    modeGroup: groups === null ? [] : [flagValue(groups[1] ?? ""), flagValue(groups[2] ?? "")],
    selectors: groups === null ? [] : quoted(groups[3] ?? ""),
    defaultSelector: quoted(parserLine)[0] ?? "",
  };
}
/** The CLI-A4 rule the vendored interaction and main lines state, applied to `argv` (stdin a pipe, as any Pi spawn's is). */
function confirmationReading(argv: readonly string[]): JsonObject {
  const facts = registryFacts();
  const yes = readIn("confirmFlags", /^CONFIRM_FLAG: Final = "([^"]+)"$/);
  const noInput = readIn("confirmFlags", /^NO_INPUT_FLAG: Final = "([^"]+)"$/);
  const dryRun = facts.modeGroup[0] ?? "";
  const requiresConfirmation = facts.destructive && argv.includes(facts.trigger) && !argv.includes(dryRun);
  const confirmed = argv.includes(yes);
  const nonInteractive = argv.includes(facts.json) || argv.includes(noInput);
  return { requiresConfirmation, confirmed, nonInteractive, refusedAtGate: requiresConfirmation && !confirmed && nonInteractive };
}

// --- the reference surfacing and its judge ------------------------------------------------------------------------------

type Outcome = "applied" | "nothing" | "refused";
/** What a Pi reclaim path reports of one rf run. */
interface Surfaced {
  readonly argv: readonly string[];
  readonly outcome: Outcome;
  readonly code: string | null;
  readonly report: Json;
  readonly rows: readonly Json[];
  readonly stopPids: readonly number[];
  readonly count: number;
}
const objectOf = (value: Json | undefined): JsonObject | undefined => (isObject(value) ? value : undefined);
const listOf = (value: Json | undefined): Json[] => (Array.isArray(value) ? [...value] : []);
const sameJson = (left: unknown, right: unknown): boolean => JSON.stringify(left) === JSON.stringify(right);
const sameList = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((item, index) => item === right[index]);
const refused = (run: Run): boolean => run.exit !== 0 || run.envelope.ok !== true;
const diagnosticsOf = (run: Run): JsonObject[] => listOf(run.envelope.diagnostics).filter(isObject);
function errorCode(run: Run): string | null {
  const first = diagnosticsOf(run).find(diagnostic => diagnostic.severity === "error");
  return typeof first?.code === "string" ? first.code : null;
}
/** The applied rows a run's envelope carries: result.applied, else the primary diagnostic's metadata.applied (exit 6), else none. */
function envelopeRows(run: Run): Json[] {
  const result = objectOf(run.envelope.result);
  if (result !== undefined) return listOf(result.applied);
  return listOf(objectOf(diagnosticsOf(run)[0]?.metadata)?.applied);
}
/** The pids rf's plan stops (CLI-A19 stop_server operations, detail.pid), in plan order. */
function planStopPids(run: Run): number[] {
  const operations = listOf(objectOf(objectOf(run.envelope.result)?.plan)?.operations);
  return operations.flatMap(operation => {
    const entry = objectOf(operation);
    const pid = objectOf(entry?.detail)?.pid;
    return entry?.kind === "stop_server" && typeof pid === "number" ? [pid] : [];
  });
}
const serverRows = (run: Run): JsonObject[] => listOf(objectOf(run.envelope.result)?.servers).filter(isObject);
const pidOf = (row: JsonObject): number => (typeof row.pid === "number" ? row.pid : -1);
function rolePid(run: Run, serverClass: string): number {
  const row = serverRows(run).find(entry => entry.class === serverClass);
  return row === undefined ? -1 : pidOf(row);
}
/** The reference surfacing: rf's envelope read verbatim; Pi classifies, counts and signals nothing of its own. */
function surfaceReclaim(run: Run): Surfaced {
  const rows = envelopeRows(run);
  if (refused(run)) return { argv: [...FILING_ARGV], outcome: "refused", code: errorCode(run), report: null, rows, stopPids: [], count: rows.length };
  const report = run.envelope.result ?? null;
  return { argv: [...FILING_ARGV], outcome: rows.length > 0 ? "applied" : "nothing", code: null, report, rows, stopPids: planStopPids(run), count: rows.length };
}
/** The acceptance as a predicate over any surfacing of `run`: the clauses it breaks, in a fixed order (none for a conforming one). */
function judge(run: Run, surfaced: Surfaced, sibling: number | null): string[] {
  const rows = envelopeRows(run);
  const isRefused = refused(run);
  const broken: string[] = [];
  if (!sameJson(surfaced.argv, FILING_ARGV)) broken.push("b:argv");
  if (!sameJson(surfaced.report, isRefused ? null : (run.envelope.result ?? null))) broken.push("b:report");
  if (!sameJson(surfaced.rows, rows)) broken.push("b:rows");
  if (!isRefused && rows.length > 0 && surfaced.outcome !== "applied") broken.push("b:outcome");
  if (!sameJson(surfaced.stopPids, isRefused ? [] : planStopPids(run))) broken.push("c:stop-set");
  if (sibling !== null && surfaced.stopPids.includes(sibling)) broken.push("c:sibling");
  if (surfaced.count !== rows.length) broken.push("c:count");
  if (!isRefused && rows.length === 0 && surfaced.outcome !== "nothing") broken.push("d:nothing");
  if (isRefused && surfaced.outcome !== "refused") broken.push("d:refusal");
  if (isRefused && surfaced.code !== errorCode(run)) broken.push("d:code");
  return broken;
}
type Mutant = (surfaced: Surfaced, run: Run) => Surfaced;
const firstRow = (rows: readonly Json[], change: (row: JsonObject) => JsonObject): Json[] =>
  rows.map((row, index) => (index === 0 && isObject(row) ? change(row) : row));
/** Surfacings that each break one clause, judged by B5, C3, D4 and R10. */
const MUTANTS: Readonly<Record<string, Mutant>> = {
  dropRow: surfaced => ({ ...surfaced, rows: surfaced.rows.slice(0, -1), count: surfaced.rows.length - 1 }),
  reorderRows: surfaced => ({ ...surfaced, rows: [...surfaced.rows].reverse() }),
  relabelStatus: surfaced => ({ ...surfaced, rows: firstRow(surfaced.rows, row => ({ ...row, status: "reclaimed" })) }),
  addField: surfaced => ({ ...surfaced, rows: firstRow(surfaced.rows, row => ({ ...row, reclaimed_by: "pi" })) }),
  rewriteReport: surfaced => ({ ...surfaced, report: isObject(surfaced.report) ? { ...surfaced.report, proof: "linux-proc" } : surfaced.report }),
  argvAll: surfaced => ({ ...surfaced, argv: surfaced.argv.map(token => (token === "--orphaned" ? "--all" : token)) }),
  hostPattern: (surfaced, run) => ({ ...surfaced, stopPids: serverRows(run).map(pidOf) }),
  stopsOnly: surfaced => ({ ...surfaced, count: surfaced.stopPids.length }),
  successOnRefusal: surfaced => ({ ...surfaced, outcome: "applied" }),
  dropCode: surfaced => ({ ...surfaced, code: null }),
  claimOnEmpty: surfaced => ({ ...surfaced, outcome: "applied" }),
  countUnproven: (surfaced, run) => ({ ...surfaced, count: listOf(objectOf(run.envelope.result)?.unproven).length }),
  piClassifier: (surfaced, run) => ({ ...surfaced, stopPids: serverRows(run).filter(row => row.cwd_deleted === true).map(pidOf) }),
};
function mutant(name: string): Mutant {
  const found = MUTANTS[name];
  if (found === undefined) throw new Error(`no mutant ${name}`);
  return found;
}
const judgeMutants = (run: Run, names: readonly string[], sibling: number | null): JsonObject =>
  Object.fromEntries(names.map(name => [name, judge(run, mutant(name)(surfaceReclaim(run), run), sibling)]));
/** Fixture pids by role, so a fixture re-pin re-reads them. */
function roleOf(run: Run, pid: number): string {
  if (pid === rolePid(run, "orphaned")) return "<orphan>";
  if (pid === rolePid(run, "active")) return "<sibling>";
  return `<pid ${pid}>`;
}

/** The keys of `value` against a required list, in rf's order. */
function keysProblem(path: string, value: Json | undefined, keys: readonly string[]): string[] {
  const got = isObject(value) ? Object.keys(value) : null;
  return got !== null && sameList(got, keys) ? [] : [`${path}: ${JSON.stringify(got)}`];
}
function grammarOf(name: string): RegExp {
  const pattern = ROSTER.grammar[name];
  if (typeof pattern !== "string") throw new Error(`the roster holds no grammar ${name}`);
  return new RegExp(pattern);
}
function enumOf(name: string): Json[] {
  return listOf(ROSTER.grammar[name]);
}
/** Every key list and every graded value of one run against the producer schema facts the roster holds. */
function shapeProblems(run: Run): string[] {
  const problems: string[] = [...keysProblem("envelope", run.envelope, required("envelope"))];
  const fits = (path: string, value: Json | undefined, ok: boolean): void => {
    if (!ok) problems.push(`${path}: ${JSON.stringify(value ?? null)}`);
  };
  fits("operation_id", run.envelope.operation_id, typeof run.envelope.operation_id === "string" && grammarOf("operationId").test(run.envelope.operation_id));
  diagnosticsOf(run).forEach((diagnostic, index) => {
    problems.push(...keysProblem(`diagnostics[${index}]`, diagnostic, required("diagnostic")));
  });
  const appliedRows = (path: string, rows: Json[]): void => {
    rows.forEach((row, index) => {
      problems.push(...keysProblem(`${path}[${index}]`, row, required("applied")));
      const entry = objectOf(row);
      fits(`${path}[${index}].target`, entry?.target, typeof entry?.target === "string" && grammarOf("target").test(entry.target));
      fits(`${path}[${index}].status`, entry?.status, enumOf("status").includes(entry?.status ?? null));
    });
  };
  const result = objectOf(run.envelope.result);
  if (result === undefined) {
    const metadata = objectOf(diagnosticsOf(run)[0]?.metadata);
    if (errorCode(run) === STOP_INCOMPLETE) {
      problems.push(...keysProblem("diagnostics[0].metadata", metadata, required("stopIncompleteMetadata")));
      appliedRows("diagnostics[0].metadata.applied", listOf(metadata?.applied));
    }
    return problems;
  }
  problems.push(...keysProblem("result", result, Object.hasOwn(result, "applied") ? [...required("result"), "applied"] : required("result")));
  for (const part of ["ledger", "selection", "totals", "plan"]) problems.push(...keysProblem(`result.${part}`, result[part], required(part)));
  fits("result.proof", result.proof, enumOf("proof").includes(result.proof ?? null));
  serverRows(run).forEach((row, index) => {
    problems.push(...keysProblem(`result.servers[${index}]`, row, required("server")));
    fits(`result.servers[${index}].class`, row.class, enumOf("class").includes(row.class ?? null));
    fits(`result.servers[${index}].server_id`, row.server_id, row.server_id === null || (typeof row.server_id === "string" && grammarOf("serverId").test(row.server_id)));
    for (const field of ["started_at", "last_used_at"]) {
      const stamp = row[field];
      fits(`result.servers[${index}].${field}`, stamp, stamp === null || (typeof stamp === "string" && grammarOf("timestamp").test(stamp)));
    }
  });
  listOf(result.unproven).forEach((row, index) => {
    problems.push(...keysProblem(`result.unproven[${index}]`, row, required("unproven")));
  });
  listOf(result.stale).forEach((row, index) => {
    problems.push(...keysProblem(`result.stale[${index}]`, row, required("stale")));
  });
  listOf(objectOf(result.plan)?.operations).forEach((row, index) => {
    problems.push(...keysProblem(`result.plan.operations[${index}]`, row, required("operation")));
    const entry = objectOf(row);
    fits(`result.plan.operations[${index}].target`, entry?.target, typeof entry?.target === "string" && grammarOf("target").test(entry.target));
  });
  appliedRows("result.applied", listOf(result.applied));
  return problems;
}

// --- the bead export ----------------------------------------------------------------------------------------------------

/** The owner filing: the notes of this bead's row in the tracked bead export. */
function filingNotes(): string {
  for (const line of textOf(BEAD_EXPORT).split("\n")) {
    if (line.trim() === "") continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(line);
    } catch {
      continue;
    }
    if (isObject(parsed) && parsed.id === BEAD && typeof parsed.notes === "string") return parsed.notes;
  }
  return "";
}

// --- the matcher spellings ----------------------------------------------------------------------------------------------

const cp = (code: number): string => String.fromCodePoint(code);
interface Spelling {
  readonly pin: string;
  readonly family: "window" | "leaf";
  readonly text: string;
  readonly hit: boolean;
}
const lines = (...parts: string[]): string => parts.join("\n");
const gap = (count: number): string[] => Array.from({ length: count }, () => "");
/** MA1-MA13 and ML1-ML5 must hit; R1-R7 and R9 are quiet rows of their named residuals (R8 and R10 are judged below). */
const SPELLINGS: readonly Spelling[] = [
  { pin: "MA1", family: "window", text: `pkill -f '${ENGINE} sql-server'`, hit: true },
  { pin: "MA2", family: "window", text: `pkill -f '.reactive-fiber/${ENGINE}'`, hit: true },
  { pin: "MA3", family: "window", text: `killall ${ENGINE}`, hit: true },
  { pin: "MA4", family: "window", text: `pgrep -f "${ENGINE}-sql-server" | xargs kill -TERM`, hit: true },
  { pin: "MA5", family: "window", text: `kill -9 $(pgrep -f '.reactive-fiber/${ENGINE}/data')`, hit: true },
  { pin: "MA6", family: "window", text: `execSync("pkill -f '${ENGINE} sql-server'");`, hit: true },
  { pin: "MA7", family: "window", text: `spawnSync("pkill", ["-f", "${ENGINE} sql-server"]);`, hit: true },
  { pin: "MA8", family: "window", text: lines(`for (const pid of ${ENGINE}Pids) {`, '  process.kill(pid, "SIGTERM");', "}"), hit: true },
  { pin: "MA9", family: "window", text: `PKILL -F '${ENGINE_UPPER} SQL-SERVER'`, hit: true },
  { pin: "MA10", family: "window", text: `os.kill(pid, signal.SIGKILL)  # ${ENGINE_TITLE} server`, hit: true },
  { pin: "MA11", family: "window", text: lines('kill "$pid"', ...gap(WINDOW - 1), `# the ${ENGINE} sql-server above`), hit: true },
  { pin: "MA12", family: "window", text: `await kill${ENGINE_TITLE}Servers();`, hit: true },
  { pin: "MA13", family: "window", text: `if (code === "${STOP_INCOMPLETE}") process.kill(pid);`, hit: true },
  { pin: "ML1", family: "leaf", text: "storage.local-servers", hit: true },
  { pin: "ML2", family: "leaf", text: "local_servers", hit: true },
  { pin: "ML3", family: "leaf", text: "localServers", hit: true },
  { pin: "ML4", family: "leaf", text: "LOCAL-SERVERS", hit: true },
  { pin: "ML5", family: "leaf", text: '["storage", "local-servers"]', hit: true },
  { pin: "R1", family: "window", text: lines('kill "$pid"', ...gap(WINDOW), `# the ${ENGINE} sql-server above`), hit: false },
  { pin: "R2", family: "window", text: `pkill -f '${ENGINE.slice(0, 1)}${cp(0x200b)}${ENGINE.slice(1)} sql-server'`, hit: false },
  { pin: "R3", family: "window", text: `pkill -f '${ENGINE.replace("o", cp(0x043e))} sql-server'`, hit: false },
  { pin: "R4", family: "window", text: lines('const ENGINE = ["d", "o", "l", "t"].join("");', "execSync(`pkill -f '$" + "{ENGINE} sql-server'`);"), hit: false },
  { pin: "R5", family: "window", text: 'kill -TERM "$(cat "$WS/server.pid")"', hit: false },
  { pin: "R6", family: "window", text: `systemctl --user stop ${ENGINE}-sql-server.service`, hit: false },
  { pin: "R7", family: "window", text: `pkill -f embedded${ENGINE}`, hit: false },
  { pin: "R9", family: "leaf", text: '["local", "servers"].join("-")', hit: false },
];
const spellingHits = (spelling: Spelling): boolean =>
  spelling.family === "window" ? windowHits(spelling.text).length > 0 : LEAF.test(spelling.text);
/** A runbook-shaped line: row A's matcher reads it as a hit, but R8's roots are never walked. */
const RUNBOOK_LINE = `operators may run pkill -f '${ENGINE} sql-server' to clear stale servers`;

// --- the cases ----------------------------------------------------------------------------------------------------------

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  T1: async () => familyScan(SRC_SCAN, LEAF, "the reclaim leaf"),
  T2: async () => familyScan(SRC_SCAN, TARGET, "the engine's name"),
  T3: async () => {
    const descriptors = await servedDescriptors();
    const leafHits = descriptors.filter(descriptor => LEAF.test(descriptor.text)).map(descriptor => descriptor.id);
    const targetHits = descriptors.filter(descriptor => TARGET.test(descriptor.text)).map(descriptor => descriptor.id);
    const rfServed = descriptors.map(descriptor => descriptor.id).filter(id => id.startsWith("reactivefiber.")).sort();
    const rfRoster = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(descriptors.length >= 4, `served native descriptors: ${descriptors.map(descriptor => descriptor.id).join(", ")}`).toBe(true);
    expect([leafHits, targetHits]).toEqual([[], []]);
    expect(rfRoster).toEqual(["reactivefiber.render.preview"]);
    expect(rfServed).toEqual(rfRoster);
    return { descriptorFloorMet: descriptors.length >= 4, leafHits, targetHits, rfServed, rfRoster };
  },
  ...Object.fromEntries(SCRIPT_ROOTS.map(scan => [scan.pin, async () => scriptScan(scan)])),
  A9: async () => {
    const referenced = commandRoots();
    const walkedRoots = SCRIPT_ROOTS.map(scan => scan.root);
    const uncovered = referenced.filter(root => !walkedRoots.includes(root));
    expect(referenced.length >= 3, `script roots the repository's commands name: ${referenced.join(", ")}`).toBe(true);
    expect(uncovered, "a script location the repository's commands name lies under no walked root").toEqual([]);
    return { referenced, uncovered };
  },
  B1: async () => {
    const shas = Object.fromEntries(["registry", "flags", "parser"].map(name => [name, sha256Of(excerptOf(name).text)]));
    const facts = registryFacts();
    const selectorsInArgv = FILING_ARGV.filter(token => facts.selectors.includes(token));
    const expectedArgv = ["rf", ...facts.leaf, facts.defaultSelector, facts.trigger, facts.json];
    expect(shas, "a vendored block is not the producer's lines at the pin").toStrictEqual({
      registry: EXCERPT_SHA256.registry, flags: EXCERPT_SHA256.flags, parser: EXCERPT_SHA256.parser,
    });
    expect([...FILING_ARGV], "the filing's argv against rf's registry and parser").toEqual(expectedArgv);
    expect(selectorsInArgv).toEqual([facts.defaultSelector]);
    expect(FILING_ARGV.filter(token => facts.modeGroup.includes(token))).toEqual([facts.trigger]);
    return { ...facts, selectorsInArgv, argvAgrees: sameList(FILING_ARGV, expectedArgv) };
  },
  B2: async () => {
    const capture: unknown = JSON.parse(textOf(join(HERE, "fixtures", "rf-version-leaves.json")));
    const result = isObject(capture) && isObject(capture.envelope) ? objectOf(capture.envelope.result) : undefined;
    const leafPath = FILING_ARGV.slice(1, 3).join(".");
    const leaf = listOf(result?.leaves).filter(isObject).find(entry => entry.path === leafPath) ?? null;
    const witness = { rfVersion: isObject(capture) ? (capture.rfVersion ?? null) : null, leafPath, leaf };
    expect(leaf, `the installed rf's registry capture serves no ${leafPath}`).not.toBeNull();
    expect([leaf?.served, leaf?.reachable, leaf?.availability]).toEqual([true, true, "served_reachable"]);
    return witness;
  },
  B3: async () => {
    const shas = Object.fromEntries(["confirmFlags", "confirmation", "jsonMode", "gate"].map(name => [name, sha256Of(excerptOf(name).text)]));
    const facts = registryFacts();
    const code = readIn("confirmFlags", /DiagnosticCode\.(\w+)\.value/);
    const exit = Number(readIn("confirmFlags", /registered with exit (\d+)/));
    const rule = excerptOf("confirmation").text.join("\n");
    const gateRaises = excerptOf("gate").text.some(line => line.includes("raise interaction.ConfirmationRequiredError(descriptor)"));
    const witness = {
      code, exit, gateRaises,
      ruleStated: rule.includes("desc.destructive_trigger in argv") && rule.includes("json_mode_requested(list(argv))"),
      jsonSpelling: excerptOf("jsonMode").text.some(line => line.includes(`\`\`${facts.json}\`\``)),
      filingArgv: confirmationReading(FILING_ARGV),
      withYes: confirmationReading([...FILING_ARGV, readIn("confirmFlags", /^CONFIRM_FLAG: Final = "([^"]+)"$/)]),
      preview: confirmationReading(FILING_ARGV.map(token => (token === facts.trigger ? (facts.modeGroup[0] ?? "") : token))),
    };
    expect(shas, "a vendored block is not the producer's lines at the pin").toStrictEqual({
      confirmFlags: EXCERPT_SHA256.confirmFlags, confirmation: EXCERPT_SHA256.confirmation, jsonMode: EXCERPT_SHA256.jsonMode, gate: EXCERPT_SHA256.gate,
    });
    expect(witness.filingArgv.refusedAtGate, "the filing's argv passes rf's confirmation gate unconfirmed").toBe(true);
    expect([witness.withYes.refusedAtGate, witness.preview.refusedAtGate]).toEqual([false, false]);
    return witness;
  },
  B4: async () => {
    const run = runOf("stopSibling");
    const surfaced = surfaceReclaim(run);
    const witness = {
      outcome: surfaced.outcome, rows: surfaced.rows.length,
      reportVerbatim: sameJson(surfaced.report, run.envelope.result), rowsVerbatim: sameJson(surfaced.rows, objectOf(run.envelope.result)?.applied),
      broken: judge(run, surfaced, rolePid(run, "active")),
    };
    expect(witness).toStrictEqual({ outcome: "applied", rows: 2, reportVerbatim: true, rowsVerbatim: true, broken: [] });
    return witness;
  },
  B5: async () => {
    const run = runOf("stopSibling");
    const broken = judgeMutants(run, ["dropRow", "reorderRows", "relabelStatus", "addField", "rewriteReport", "argvAll"], rolePid(run, "active"));
    expect(Object.values(broken).every(list => Array.isArray(list) && list.length > 0), "the judge admits a rewritten surfacing").toBe(true);
    return broken;
  },
  C1: async () => {
    const problems = Object.fromEntries(Object.entries(ROSTER.runs).map(([name, run]) => [name, shapeProblems(run)]));
    const run = runOf("stopSibling");
    const result = objectOf(run.envelope.result);
    const witness = {
      provenance: Object.fromEntries(Object.entries(ROSTER.runs).map(([name, entry]) => [name, entry.provenance])),
      problems,
      servers: serverRows(run).map(row => ({ role: roleOf(run, pidOf(row)), class: row.class ?? null, selected: row.selected ?? null, cwdDeleted: row.cwd_deleted ?? null })),
      stale: listOf(result?.stale).length,
      plan: listOf(objectOf(result?.plan)?.operations).map(operation => objectOf(operation)?.kind ?? null),
    };
    expect(Object.values(problems).flat(), "a fixture run strays from the producer schema").toEqual([]);
    expect(rolePid(run, "orphaned") !== rolePid(run, "active") && rolePid(run, "active") > 0, "the stop run needs an orphan and a live sibling").toBe(true);
    return witness;
  },
  C2: async () => {
    const run = runOf("stopSibling");
    const surfaced = surfaceReclaim(run);
    const sibling = rolePid(run, "active");
    const witness = {
      stopPids: surfaced.stopPids.map(pid => roleOf(run, pid)),
      siblingStopped: surfaced.stopPids.includes(sibling),
      count: surfaced.count,
      envelopeRows: envelopeRows(run).length,
      broken: judge(run, surfaced, sibling),
    };
    expect(witness).toStrictEqual({ stopPids: ["<orphan>"], siblingStopped: false, count: 2, envelopeRows: 2, broken: [] });
    return witness;
  },
  C3: async () => {
    const run = runOf("stopSibling");
    const broken = judgeMutants(run, ["hostPattern", "stopsOnly"], rolePid(run, "active"));
    expect(broken).toStrictEqual({ hostPattern: ["c:stop-set", "c:sibling"], stopsOnly: ["c:count"] });
    return broken;
  },
  D1: async () => {
    const run = runOf("emptyNoProc");
    const surfaced = surfaceReclaim(run);
    const witness = { proof: objectOf(run.envelope.result)?.proof ?? null, outcome: surfaced.outcome, count: surfaced.count, stopPids: [...surfaced.stopPids], broken: judge(run, surfaced, null) };
    expect(witness).toStrictEqual({ proof: "unavailable", outcome: "nothing", count: 0, stopPids: [], broken: [] });
    return witness;
  },
  D2: async () => {
    const run = runOf("unprovenNoProc");
    const surfaced = surfaceReclaim(run);
    const result = objectOf(run.envelope.result);
    const witness = {
      proof: result?.proof ?? null, outcome: surfaced.outcome, count: surfaced.count,
      unproven: listOf(result?.unproven).map(row => objectOf(row)?.reason ?? null),
      warnings: diagnosticsOf(run).map(diagnostic => diagnostic.severity ?? null),
      unprovenRideTheReport: sameJson(objectOf(surfaced.report)?.unproven, result?.unproven), broken: judge(run, surfaced, null),
    };
    expect([witness.outcome, witness.count, witness.unprovenRideTheReport, witness.broken]).toEqual(["nothing", 0, true, []]);
    return witness;
  },
  D3: async () => {
    const read = (name: string): JsonObject => {
      const run = runOf(name);
      const surfaced = surfaceReclaim(run);
      return {
        exit: run.exit, provenance: run.provenance, outcome: surfaced.outcome, codeVerbatim: surfaced.code !== null && surfaced.code === errorCode(run),
        stopIncomplete: surfaced.code === STOP_INCOMPLETE, rows: surfaced.rows.length, broken: judge(run, surfaced, null),
      };
    };
    const witness = { ledgerUntrusted: read("ledgerUntrusted"), stopIncomplete: read("stopIncomplete"), ledgerCode: errorCode(runOf("ledgerUntrusted")) };
    expect([witness.ledgerUntrusted.outcome, witness.stopIncomplete.outcome]).toEqual(["refused", "refused"]);
    expect([witness.ledgerUntrusted.exit, witness.stopIncomplete.exit]).toEqual([6, 6]);
    return witness;
  },
  D4: async () => {
    const broken = {
      successOnRefusal: judge(runOf("ledgerUntrusted"), mutant("successOnRefusal")(surfaceReclaim(runOf("ledgerUntrusted")), runOf("ledgerUntrusted")), null),
      dropCode: judge(runOf("stopIncomplete"), mutant("dropCode")(surfaceReclaim(runOf("stopIncomplete")), runOf("stopIncomplete")), null),
      claimOnEmpty: judge(runOf("emptyNoProc"), mutant("claimOnEmpty")(surfaceReclaim(runOf("emptyNoProc")), runOf("emptyNoProc")), null),
      countUnproven: judge(runOf("unprovenNoProc"), mutant("countUnproven")(surfaceReclaim(runOf("unprovenNoProc")), runOf("unprovenNoProc")), null),
    };
    expect(broken).toStrictEqual({ successOnRefusal: ["d:refusal"], dropCode: ["d:code"], claimOnEmpty: ["d:nothing"], countUnproven: ["c:count"] });
    return broken;
  },
  G1: async () => Object.fromEntries(GATED_SCANS.map(scan => [scan.root, familyScan(scan, GATED, "the gated proof")])),
  F1: async () => {
    const text = filingNotes();
    expect(text, `${BEAD} has no notes in the bead export`).not.toBe("");
    // The filing's acceptance sentence, cut into its "(x) ..." clauses; each judged label must equal its clause.
    const acceptance = /Acceptance: ([\s\S]*?)\s*(?:Related:|$)/.exec(text)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(row => /^\([a-z]\) /.test(row.label));
    const labelsEqual = judged.filter((row, index) => clauseTexts[index] === row.label.split(PLACEHOLDER).join(ENGINE)).map(row => row.id);
    const constantsQuoted = FILING_CONSTANTS.filter(constant => text.includes(constant));
    const controls = SPELLINGS.filter(spelling => spelling.pin.startsWith("MA") && spelling.hit && spellingHits(spelling));
    // (a) reads "pkill/kill-by-pattern over '<target>'": each quoted target needs the control that is exactly that pkill line.
    const targetsControlled = FILING_TARGETS.filter(target => text.includes(`'${target}'`) && controls.some(spelling => spelling.text === `pkill -f '${target}'`));
    expect(clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(row => row.label.charAt(1)));
    expect(labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(row => row.id));
    expect(constantsQuoted).toEqual([...FILING_CONSTANTS]);
    expect(targetsControlled, "a target the filing quotes for (a) has no hitting control").toEqual([...FILING_TARGETS]);
    return { clauses, labelsEqual, constantsQuoted: constantsQuoted.length, targetsControlled: targetsControlled.length };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = spellingHits(spelling);
        expect(hit).toBe(spelling.hit);
        return { family: spelling.family, digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
  R8: async () => {
    const files = SCRIPT_ROOTS.flatMap(scan => filesOf(scan).map(rel));
    const underInstruction = files.filter(path => INSTRUCTION_ROOTS.some(root => path === root || path.startsWith(`${root}/`)) || (!path.includes("/") && path.endsWith(".md")));
    const witness = { instructionRoots: [...INSTRUCTION_ROOTS], walkedUnderInstruction: underInstruction.length, runbookLineWouldHit: windowHits(RUNBOOK_LINE).length > 0 };
    expect(witness).toStrictEqual({ instructionRoots: [...INSTRUCTION_ROOTS], walkedUnderInstruction: 0, runbookLineWouldHit: true });
    return witness;
  },
  R10: async () => {
    const run = runOf("stopSibling");
    const surfaced = mutant("piClassifier")(surfaceReclaim(run), run);
    const witness = { stopPids: surfaced.stopPids.map(pid => roleOf(run, pid)), broken: judge(run, surfaced, rolePid(run, "active")) };
    expect(witness).toStrictEqual({ stopPids: ["<orphan>"], broken: [] });
    return witness;
  },
};

describe("wb-pfxo.8 orphan-server reclaim census (RF-COMPOSITIONAL-ASSEMBLY-R9, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "A:9", "B:5", "C:3", "D:4", "G:1", "F:1", "M:18", "R:10"]);
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
