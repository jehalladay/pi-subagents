/**
 * wb-csbt.3 (TSX-RESOURCE-EFFICIENCY-FRONTIER-R3, program-triage-2026-10-22), a standing posture pin, hardened by wb-jdpn (the R694
 * follow-up of landing 304: F2 leads, F3-F8 ride; each cure is marked "wb-jdpn F<n>" where it lives). Statement (the bead title, held
 * to the roster): no Pi surface spawns or closes TSX Deno workers, shares the Deno directory variable or admits TSX starts; only RFCLI
 * decides, and Pi's RF surface stays the rf CLI envelope. Producer authority, read at the pin (ReactiveFiberTSXSDK 76bbbffd9d4a, git
 * show by the cutting seat): docs/programs/resource-efficiency-frontier-2026-10-17/02-INCREMENTAL-ASSEMBLY-AND-REUSE.md:21 (the
 * filing's quote, held to the roster and the bead row), README.md:5 ("RFCLI owns local Deno worker lifecycle, startup/admission and
 * IPC") and 03-PROFILES-DECISIONS-AND-WORK-PACKAGES.md:37 ("Do not introduce a new security-scanner gate or default resident
 * worker"). The acceptance is the owner filing's, verbatim: the labels of rows A-C below, held to the tracked bead export.
 *
 * NEEDLES, SPELLED ESCAPED: clauses (a) and (c) quote the clause grep's own needles - the Deno directory variable and the TSX SDK's npm
 * scope - so this file and its roster spell the underscore of the one and the hyphen of the other as JS / JSON \u escapes (the cooked
 * values equal the owner's text exactly); A2 reads both files' raw bytes and pins zero hits, so this cut adds no line to the grep it
 * pins. The deno verbs are only ever written as a pattern ("(run|task)") or composed, never as a matching phrase.
 *
 * MEASURED AT BASE 51c3272 (the cut's base): clause (a)'s literal command reads 14 hits, not 0 - the bead's "0 at d75b68d" predates
 * landing 271 (wb-o4h0.4, 3e5bb58), whose remote-hook census and roster name the TSX SDK specifier as the needle of that census's own
 * no-SDK-load guard (7 lines each, the third alternative only). src and package.json hold none of the three alternatives; over the
 * whole tracked tree minus .beads the same pattern reads only those two files (git grep, measured, not pinned: qa/, docs/, examples/
 * and the configs sit outside the clause's pathspecs). The program keeps adding such holders: at cut time seven queued gate entries
 * (wb-fb2z.3, wb-fb2z.4, wb-if7q.1 to wb-if7q.5, measured from state/gate-queue by git diff against their merge bases) add 73 more
 * matching lines, every one inside a TSX-family census module or its roster - mostly the SDK scope as data, plus control texts that
 * spell a deno launch inside string literals. So the clause's "= 0" cannot hold over test/ and is not pinned there: row A pins the
 * product scope at zero (A1), the test side by CLASS (A2: every hit inside a census module or a census roster - the HOLDERS - and no
 * test module launching deno, holders included), and the clause's own command listing no product file and no non-holder (A3). A
 * needle in any other test file - a helper, a harness, a tier, a plain test or fixture - reds A2 and A3. RE-MEASURED AT 6167d5e
 * (wb-jdpn's base, git grep over the tree object, measured, not pinned): the literal command reads 103 hits in 24 files, 12 census
 * modules and 12 census rosters, and still none in src or package.json; over the whole tracked tree minus .beads the pattern reads only
 * those 24 files.
 *
 * Pi's one rf launch is src/workbench/providers/reactivefiber.ts: spawn("rf", argv, {stdio, env: scrubbedEnvironment(process.env,
 * RF_CHILD_ENV_ALLOWLIST)}) per render, a SIGTERM then SIGKILL of that child on deadline, abort or overflow, and nothing else; rf decides
 * inside each render whether a TSX worker starts (result.engine_metrics.tsx_worker_spawns is rf's own counter, which Pi validates and
 * echoes). The capability registry's admission (maxInFlight, deadline) bounds every capability alike and names no rf, TSX or Deno, so it
 * admits invocations, never TSX starts. The rows:
 *  A, acceptance (a). A1 the clause's pattern (git grep -E: case-sensitive, matched per line) over the walk of src/ and package.json:
 *    no hit of any alternative, no symlink, a floor of src files, and positive controls per alternative plus the quiet rows below; the
 *    planted controls are read into the same hits list as the live files (wb-jdpn F5), so the judged list is exactly the planted
 *    positives today. A2 over the walk of test/: every file holding a hit is a HOLDER (at least one live holder, the non-vacuity floor),
 *    no test module launches deno through a node:child_process launcher (B1's launch read over every test module, with a floor of
 *    resolved live launches), this file and its roster are walked (judged, never exempt) with zero hits, and the planted controls read
 *    as designed; they ride the same hit and launch lists as the live tree (wb-jdpn F5), so outsideHolders and denoLaunches are exactly
 *    the planted ones today. A3 the clause's literal command (git grep -n -E <pattern> -- src test package.json, run in the repository;
 *    tracked files only) runs (exit 0 or 1) and lists no product file and no test file outside HOLDERS.
 *  B, acceptance (b). B1 a TypeScript AST read of every src module: no identifier word and no string, template or regular-expression
 *    literal spells deno (any case, as a word; the capitalized control pins the case-insensitive read, wb-jdpn F6), no identifier or
 *    literal names a TSX start admission (the title's "admits TSX starts" duty, wb-jdpn F8: the word tsx beside an ADMISSION word in one
 *    name or literal), no node:child_process launch has an unresolved command, the provider's only launch is spawn("rf") bound to
 *    `child` and its only kill sites are child.kill("SIGTERM") and child.kill("SIGKILL") - Pi closes only its own rf child, never a
 *    worker. The controls are read as modules beside the live ones and a provider-shaped control is read with the provider (wb-jdpn F5),
 *    so the spellings, admissions, unresolved launches and provider launch, binding and kill lists hold exactly the controls' entries
 *    beside the live ones today. B2 every input form the registered descriptor admits (derived from its oneOf inputSchema), invoked
 *    through the capability registry against a stand-in rf first on PATH, spawns exactly one process, the PATH-resolved rf, with the
 *    wb-973.3 argv (the legacy form byte for byte), and returns; B3 a tripwire deno first on the same PATH is never executed across a
 *    returned render, an rf refusal (RF_COMPONENT_RUNTIME_ABSENT, rf's answer when its runtime is missing: Pi echoes it and starts no
 *    runtime itself), malformed output and an abort mid-render, each one rf spawn and no rf process alive once the render settles; both
 *    readings carry a positive control (wb-jdpn F3): the hanging rf reads alive while its render runs (aliveDuring), and deno resolved
 *    through the stand-in PATH, as a PATH-resolving launch would resolve it, is the tripwire, which records the argv it is run with (a
 *    resolution that misses the tripwire is never executed, so no host deno ever runs; the control runs the tripwire by its absolute
 *    scratch path, a computed command A2's literal launch read does not judge); B4 no pool and nothing resident: three
 *    sequential and three concurrent renders each spawn their own rf (distinct pids), none alive once its render settles.
 *  C, acceptance (c). C1 the settings surface read from src/settings.ts (every member of SubagentsSettings and WorkbenchSettings, nested
 *    type literals included, every interface or type alias a member's type names, followed transitively through src/settings.ts and
 *    its relative imports (wb-jdpn F7), and sanitize()'s workbench key set, which equals the WorkbenchSettings members): no name holds a
 *    FAMILY word; planted settings modules ride the same reading (a local and an imported named type, each reached only by following)
 *    and one single-word control per FAMILY word (wb-jdpn F4) reads as designed; C2 loadSettings over a hermetic project file drops
 *    every family-named top-level key and refuses each under workbench by name; C3 every capability registerNativeProviders registers
 *    (each provider module holds one input-schema constant that its native and injected registrations share): no inputSchema property
 *    or required name holds a FAMILY word, and the rf descriptor's input names are exactly model, task, taskId and view; C4 what Pi
 *    hands rf configures no worker: with the Deno directory variable, three more DENO_ operator names and two RF_-prefixed stand-in
 *    knobs set in the parent, no rf child of any input form receives one, while an allowlisted ambient control set beside them
 *    (LC_CTYPE) does reach rf, so the reached list is exactly that control today (wb-jdpn F5); the allowlist holds no FAMILY or deno
 *    name, and no argv token holds a FAMILY word. C4 judges the planted knobs by name: a child's
 *    whole name set is host-dependent, since the node launcher may add its own (this host's process.execPath is a bash wrapper that
 *    sets LD_LIBRARY_PATH, and bash adds PWD and SHLVL, measured), so the allowlist-only projection stays the pin of record of
 *    test/workbench-env-scrub-census.test.ts (its W19 rf CLI child seam), which this cut does not restate.
 * FAMILY (property and argv words, after camelCase and separator splitting): deno, tsx, worker(s), pool(s), resident, admission,
 * admit(s). OUTSIDE ANCHOR (wb-jdpn F4): every FAMILY word is a word of the owner filing (its title, clauses or quote) or the plural or
 * third person of one, and the filing's knob phrases (knobPhrases: the title's "TSX Deno workers", directory variable and "admit TSX
 * starts", clause (b)'s "worker pool", clause (c)'s Deno worker count, directory-variable path, "TSX admission policy" and "default
 * resident worker") split exactly into FAMILY and GENERIC (count, default, dir, path, policy, starts), so a FAMILY word removed from
 * this file and the roster together reds the judged set. ADMISSION (B1, wb-jdpn F8) holds the words of the title's "admit TSX starts"
 * duty with their inflections. PRECISION: "workspace" is not "worker" (C1/C3 controls); the src word "admission" belongs to the
 * registry and the workflow launch admission, so it is a family word only in a settings, input or argv name, never in src prose.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the owner filing's row of wb-csbt.3 in
 * the tracked bead export (.beads/issues.jsonl) - its acceptance clauses (a), (b) and (c) are the labels of rows A, B and C verbatim
 * and in order, clause (a)'s quoted pattern and pathspecs are CLAUSE_PATTERN and SCOPE, and its title, quote and citation equal the
 * roster's; the out-of-file roster holds every row's id, label and pins, every pin's witness, the vocabulary, the HOLDERS patterns and
 * the registered tests; B2's input forms are held to the src descriptor's inputSchema. The last case walks this file's vitest task tree
 * against the roster. SELF-READ: the judged set parses this file's IMPL and requires every case to name one of READERS (the functions
 * that read the subject) and none of ROSTER_NAMES (the parsed roster's handles), so a case swapped for its own roster witness reds
 * (direct identifiers only: a helper's own reads, or a case parsing the roster file by path, are not followed). ROSTER_NAMES is held to
 * this file's own reach of the parsed roster (wb-jdpn F5): readRoster and, to a fixed point, every top-level declaration naming one of
 * them, and no READER is one. REACHED (wb-jdpn F2, the assertion-after-guarded-return class): rosterWitness is each pin's compare's
 * expected value and records the pin as it is evaluated (COMPARED), and the pin's measured witness is recorded after its compare passes
 * (REACHED); the closing case asserts both equal the roster's pins, in roster order and each once, and re-compares every recorded
 * witness to the roster, so a compare removed, guarded away (an early return) or swapped for a matcher that takes no expected value
 * (toBeDefined) reds the closing case; the judged set, which runs first, holds the closing case to run mode, so a skip on it reds the
 * judged set (a skip on both together is left to the delivered-file marker scan). Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead row
 * anchors rows and clauses, not pins); a FAMILY word moved to GENERIC with the roster's family and witnesses regenerated together; a
 * judged list replaced by its whole expected witness (planted entries included), a live input dropped from a reading while its planted
 * controls stay, or a shared reader (clauseHits, readModule, settingsSurface) hollowed for live paths only (wb-jdpn F5 bounds the
 * constant-substitution class at the constant each pin reads today); a compare swapped for a weaker matcher that still takes
 * rosterWitness as its expected value (toEqual is equivalent over JSON witnesses), or a harness hollow that also evaluates rosterWitness
 * apart from the compare and records the roster's own witness.
 * RESIDUALS (named families, each with a pinned quiet row in the controls): R-SPELLING a needle in another letter case, spacing or
 * separator ("Deno run", two spaces) escapes the clause's case-sensitive pattern in A1/A2 (quiet rows quiet-case, quiet-spacing); in
 * src, B1's case-insensitive word read still sees deno. R-COMPOSED a needle or a deno command assembled at runtime (a join, a
 * concatenation) escapes A (quiet row quiet-composed) and B1's spelling read; handed to a bound launcher it is still caught
 * conservatively as an unresolved command (control composedCommand: no spelling, one unresolved; src holds that counter at 0), so the
 * B1 blind spot is a composed command through an unbound launcher (quiet row composedUnbound: no spelling, no launch, nothing
 * unresolved); B3 and C4 are the runtime backstop at the one live launch and env seam. R-SCOPE a needle outside the clause's three
 * pathspecs is not walked by A (quiet row qa/quiet-scope.mjs).
 * R-HOLDER a census module or a census roster may hold a needle as data, so a needle placed there is not an A2 or A3 finding (quiet
 * rows test/workbench-plant-census.test.ts, test/workbench-plant.census.ts, test/fixtures/plant-roster.json); a holder that launches
 * deno still reds A2 (control test/workbench-launch-census.test.ts), and no holder exemption exists outside test/ (A1 judges src and
 * package.json without one).
 * R-COMMENT B1 judges code, not comments: a comment naming deno is quiet (quiet row commentOnly). R-UNBOUND-LAUNCH a launch through a
 * receiver B1 does not bind (the extension's pi.exec, an SDK's spawn helper, a require() call) is read only through its literals, so a
 * deno command there is caught as a spelling, never as a launch (quiet row requireLaunch: one spelling, no launch). R-NAMES C1 and C3
 * read names, not values: a worker knob passed as a value under a neutral key is invisible to them (quiet row: SCHEMA_CONTROL's
 * "options" property, whose enum value names a resident worker pool, reads options:false); C4's argv and env reading is the backstop
 * for what reaches rf. R-ADMISSION-NAMES (wb-jdpn F8) a TSX start limiter named without the word tsx or an ADMISSION word (a render
 * slot count, a concurrency cap) escapes B1's admission read (quiet row admissionQuiet: rf's own tsx counters and a renderSlots
 * constant read 0 admissions); B4's three concurrent renders, each spawning its own rf, are the runtime backstop for a cap below three.
 * R-TYPE-FLOW (wb-jdpn F7) C1 follows named type references only: a member typed by an inferred or computed type (typeof a value, a
 * mapped or conditional type, a package's type) is not followed (quiet row: the planted settings module's `inferred` member, whose
 * typeof-typed object names a resident mode, reads no hit).
 * Display paths added: none. Test-only: the stand-in rf and the tripwire live in makeScratch scratch; src, the roster and the bead
 * export are only read; hermeticDir (makeScratch-backed) holds the settings files.
 */
import { spawnSync } from "node:child_process";
import { accessSync, chmodSync, constants, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, delimiter, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { loadSettings } from "../src/settings.js";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { RF_CHILD_ENV_ALLOWLIST } from "../src/workbench/process-env.js";
import { nativeReactiveFiberRender, type ReactiveFiberRenderSelector, registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { hermeticDir } from "./helpers/boot-extension.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SELF = "test/workbench-rf-tsx-worker-lifecycle-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-tsx-worker-lifecycle-roster.json";
const EXPORT_FILE = ".beads/issues.jsonl";
const BEAD = "wb-csbt.3";
/** The producer pin the filing cites (ReactiveFiberTSXSDK). */
const PIN = "76bbbffd9d4a";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const PROVIDER = "src/workbench/providers/reactivefiber.ts";

/** The clause grep's first alternative, the Deno directory variable: its underscore written as a JS escape (see NEEDLES above). */
const DIR_VARIABLE = "DENO\u005fDIR";
/** The clause grep's third alternative, the TSX SDK's npm scope: its hyphen written as a JS escape. */
const SDK_SCOPE = "@reactive\u002dfiber";
const DENO = "deno";
/** Clause (a)'s pattern, alternative by alternative: git grep -E reads it case-sensitively, one line at a time. */
const ALTERNATIVES: readonly { readonly id: string; readonly pattern: RegExp }[] = [
  { id: "dir-variable", pattern: new RegExp(DIR_VARIABLE) },
  { id: "deno-verb", pattern: new RegExp(`${DENO} (run|task)`) },
  { id: "sdk-scope", pattern: new RegExp(SDK_SCOPE) },
];
const CLAUSE_PATTERN = `${DIR_VARIABLE}|${DENO} (run|task)|${SDK_SCOPE}`;
/** Clause (a)'s pathspecs. */
const SCOPE = ["src", "test", "package.json"];
/** The program's needle holders: a census module (default or census tier) or a census roster, which name a needle as data - the
 * landed wb-o4h0.4 pair, and the queued TSX-family censuses measured at cut time. Any other test file holding a needle is a finding. */
const HOLDERS: readonly RegExp[] = [/^test\/[^/]+(?:-census\.test|\.census)\.ts$/, /^test\/fixtures\/[^/]+-roster\.json$/];
/** The mark a planted control's path carries in a judged list, so it reads apart from the live tree's paths (wb-jdpn F5). */
const PLANTED = "plant:";
function isPlanted(file: string): boolean {
  return file.startsWith(PLANTED);
}
/** The path behind a planted mark: what a reader opens and what holder() classes. */
function pathOf(file: string): string {
  return isPlanted(file) ? file.slice(PLANTED.length) : file;
}
function holder(file: string): boolean {
  return HOLDERS.some(pattern => pattern.test(pathOf(file)));
}
const MODULE_KINDS: Readonly<Record<string, ts.ScriptKind>> = { ".ts": ts.ScriptKind.TS, ".mts": ts.ScriptKind.TS, ".cts": ts.ScriptKind.TS, ".js": ts.ScriptKind.JS, ".mjs": ts.ScriptKind.JS, ".cjs": ts.ScriptKind.JS };
function moduleKind(file: string): ts.ScriptKind | undefined {
  return MODULE_KINDS[file.slice(file.lastIndexOf("."))];
}
/** A launch entry ("<file> <launcher>(<command>)") whose command names deno as a word. */
function denoLaunch(entry: string): boolean {
  return DENO_WORD.test(entry.slice(entry.indexOf(" ") + 1));
}
/** The words a worker knob's name would hold. */
const FAMILY = ["deno", "tsx", "worker", "workers", "pool", "pools", "resident", "admission", "admit", "admits"];
/** The words of the filing's knob phrases that name a count, a place or a policy rather than the worker family (wb-jdpn F4): FAMILY and
 * GENERIC partition the words of knobPhrases, so a FAMILY word dropped from this file and the roster together reds the judged set. */
const GENERIC = ["count", "default", "dir", "path", "policy", "starts"];
/** The title's "admit TSX starts" duty (wb-jdpn F8): the word tsx beside one of these in one src name or literal admits TSX starts. */
const ADMISSION = ["admit", "admits", "admitted", "admission", "admissions", "start", "starts", "started"];
/** A word of deno in code text, any letter case, not inside a longer alphanumeric run ("denominated" holds none). */
const DENO_WORD = /(?<![A-Za-z0-9])deno(?![A-Za-z0-9])/i;
/** The node:child_process functions that launch a process. */
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]);
const CHILD_PROCESS: ReadonlySet<string> = new Set(["node:child_process", "child_process"]);
/** Each floor sits below the count measured at base 51c3272: 115 src files, 517 test files, 4 resolved src launches, 153 resolved
 * test launches, 2 holder files hit, 41 settings names, 4 native descriptors; re-measured at 6167d5e (wb-jdpn, live entries only):
 * 115 src files, 645 test files, 4 resolved src launches, 185 resolved test launches, 24 holder files hit, 38
 * settings members (the named types followed today hold no property member), 4 native descriptors. */
const FLOORS = { src: 100, test: 450, launches: 3, testLaunches: 120, holders: 1, settings: 30, descriptors: 4 };
/** The input values B2 and C4 give each property the rf descriptor admits; none holds a FAMILY word. */
const VALUES: Readonly<Record<string, string>> = { model: "model-fixture", task: "task-fixture", view: "census.view", taskId: "csbt3-fixture" };
/** The parent names C4 sets: the Deno directory variable, three more DENO_ operator names and two RF_-prefixed stand-in knobs (not rf names). */
const PARENT_KNOBS: Readonly<Record<string, string>> = {
  [DIR_VARIABLE]: "/census/deno-cache",
  DENO_INSTALL_ROOT: "/census/deno-install",
  DENO_V8_FLAGS: "--max-old-space-size=64",
  DENO_NO_UPDATE_CHECK: "1",
  RF_TSX_WORKER_COUNT: "4",
  RF_TSX_RESIDENT_WORKER: "1",
};
/** The settings names C2 plants: a Deno worker count, the Deno directory variable, a TSX admission policy and a resident worker. */
const SETTINGS_KNOBS = ["denoWorkerCount", DIR_VARIABLE, "tsxAdmissionPolicy", "residentWorker"];
/** C4's positive control (wb-jdpn F5): an allowlisted ambient name set beside the knobs, which does reach rf (a locale value every
 * host accepts), so the reached list is exactly this name today. */
const REACHING_CONTROL: Readonly<Record<string, string>> = { LC_CTYPE: "C" };
/** C1's planted settings modules (wb-jdpn F7): a local and an imported named type, each reached only by following a member's type,
 * and the R-TYPE-FLOW quiet row (a typeof-typed member, never followed). */
const SETTINGS_CONTROLS: Readonly<Record<string, string>> = {
  "src/settings.ts": [
    'import type { SizingOptions } from "./sizing-options.js";',
    "export interface SubagentsSettings {",
    "  workbench?: WorkbenchSettings;",
    "}",
    "export interface WorkbenchSettings {",
    "  runtime?: RuntimeOptions;",
    "  sizing?: SizingOptions;",
    "  inferred?: typeof INFERRED;",
    "}",
    "interface RuntimeOptions {",
    "  workerCount?: number;",
    "}",
    "const INFERRED = { residentMode: true };",
    "",
  ].join("\n"),
  "src/sizing-options.ts": "export interface SizingOptions {\n  poolSize?: number;\n}\n",
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster, and their labels to the owner's clauses in the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) git grep -n -E 'DENO\u005fDIR|deno (run|task)|@reactive\u002dfiber' -- src test package.json in Pi-subagents = 0 hits (0 at d75b68d)",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(b) the reactivefiber.render capability spawns only the rf argv - no deno executable, no worker pool (extends the wb-973.3 argv pin)",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) no Pi setting or capability input names a Deno worker count, DENO\u005fDIR path or TSX admission policy, and Pi never configures a default resident worker (03-PROFILES-DECISIONS-AND-WORK-PACKAGES.md:37)",
    pins: ["C1", "C2", "C3", "C4"],
  },
];

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${name} must be a list of strings`);
  return value.map(String);
}

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface Roster {
  readonly bead: string;
  readonly pin: string;
  readonly title: string;
  readonly quote: string;
  readonly citation: string;
  readonly pattern: string;
  readonly scope: string[];
  readonly holders: string[];
  readonly family: string[];
  readonly rows: { readonly id: string; readonly label: string; readonly pins: RosterPin[] }[];
  readonly tests: string[];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows)) throw new Error("roster must be an object with rows");
  const rows = raw.rows.map((row: unknown, index: number) => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  for (const key of ["bead", "pin", "title", "quote", "citation", "pattern"]) {
    if (typeof raw[key] !== "string") throw new Error(`roster ${key} must be a string`);
  }
  return {
    bead: String(raw.bead), pin: String(raw.pin), title: String(raw.title), quote: String(raw.quote), citation: String(raw.citation),
    pattern: String(raw.pattern), scope: strings(raw.scope, "scope"), holders: strings(raw.holders, "holders"),
    family: strings(raw.family, "family"), rows, tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

/** wb-jdpn F2 (the assertion-after-guarded-return class): every pin whose witness compare ran, in run order. rosterWitness is that
 * compare's expected value and records the pin as it is evaluated, so a compare removed, guarded away or swapped for a matcher that
 * takes no expected value records nothing; the closing case reads it. */
const COMPARED: string[] = [];
/** Each pin's measured witness, recorded after its compare passes; the closing case re-compares it to the roster. */
const REACHED = new Map<string, JsonValue>();

function rosterWitness(pin: string): JsonValue {
  COMPARED.push(pin);
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface OwnerFiling {
  readonly title: string;
  readonly clauses: string[];
  readonly quote: string;
  readonly citation: string;
}
/** The owner filing, read from the wb-csbt.3 row of the tracked bead export: its title, its acceptance clauses "(a) ...", "(b) ...",
 * "(c) ..." and the quote with its citation. */
function ownerFiling(): OwnerFiling {
  const rows: unknown[] = readFileSync(join(REPO, EXPORT_FILE), "utf8").split("\n").filter(line => line.includes(`"id":"${BEAD}"`)).map(line => JSON.parse(line) as unknown);
  const row = rows.find(entry => isObject(entry) && entry.id === BEAD);
  if (!isObject(row) || typeof row.notes !== "string" || typeof row.title !== "string") throw new Error(`the bead export holds no ${BEAD} row with notes`);
  const notes = row.notes;
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Not P0:", start);
  const quoteStart = notes.indexOf('Quote: "');
  const quoteEnd = notes.indexOf('" ', quoteStart);
  const citationEnd = notes.indexOf(". Also", quoteEnd);
  if (start < 0 || end < 0 || quoteStart < 0 || quoteEnd < 0 || citationEnd < 0) throw new Error(`the ${BEAD} export row states no acceptance sentence or quote`);
  return {
    title: row.title,
    clauses: notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/),
    quote: notes.slice(quoteStart + 'Quote: "'.length, quoteEnd),
    citation: notes.slice(quoteEnd + 2, citationEnd),
  };
}

/** The text between `start` and the next `end` in `text`, refusing a missing span by name. */
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  const to = from < 0 ? -1 : text.indexOf(end, from + start.length);
  if (from < 0 || to < 0) throw new Error(`the owner filing holds no ${JSON.stringify(start)} ... ${JSON.stringify(end)} span`);
  return text.slice(from + start.length, to);
}
/** The knob phrases of the owner's filing (wb-jdpn F4 and F8): the title's objects (the workers Pi never spawns or closes, the variable
 * it never shares and the duty "admit TSX starts"), clause (b)'s pool and clause (c)'s named knobs and resident worker. */
function knobPhrases(filing: OwnerFiling): { duty: string; phrases: string[] } {
  const [, clauseB = "", clauseC = ""] = filing.clauses;
  const duty = `admit ${between(filing.title, " or admit ", "; only RFCLI")}`;
  return {
    duty,
    phrases: [
      between(filing.title, " shall spawn or close ", ", share "),
      between(filing.title, ", share ", " or admit "),
      duty,
      between(clauseB, "no deno executable, no ", " (extends"),
      ...between(clauseC, " names a ", ", and Pi never").split(/, | or /),
      between(clauseC, " configures a ", " (03-"),
    ],
  };
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
}
/** Every regular file at or below `entry` (a path relative to `root`), in name order; a symlink is recorded, never followed. */
function walk(root: string, entry: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (path: string): void => {
    const stat = lstatSync(join(root, path));
    if (stat.isSymbolicLink()) symlinks.push(path);
    else if (stat.isDirectory()) for (const name of readdirSync(join(root, path)).sort()) visit(`${path}/${name}`);
    else if (stat.isFile()) files.push(path);
  };
  if (existsSync(join(root, entry))) visit(entry);
  return { files, symlinks };
}

interface Hit {
  readonly file: string;
  readonly line: number;
  readonly alternative: string;
}
/** Clause (a)'s reading of each file: every line matching an alternative, once per alternative it matches (a planted path is read
 * behind its mark and reported with it). */
function clauseHits(root: string, files: readonly string[]): Hit[] {
  return files.flatMap(file =>
    readFileSync(join(root, pathOf(file)), "utf8").split("\n").flatMap((text, index) =>
      ALTERNATIVES.filter(({ pattern }) => pattern.test(text)).map(({ id }) => ({ file, line: index + 1, alternative: id }))),
  );
}

/** The words of a name: camelCase humps and the runs between non-alphanumerics, lower-cased. */
function words(name: string): string[] {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").split(/[^A-Za-z0-9]+/).filter(Boolean).map(word => word.toLowerCase());
}
function familyName(name: string): boolean {
  return words(name).some(word => FAMILY.includes(word));
}

interface CodeReading {
  readonly file: string;
  readonly spellings: string[];
  readonly admissions: string[];
  readonly launches: string[];
  readonly unresolved: string[];
  readonly kills: string[];
  readonly launchBindings: string[];
}
/** A TSX start admission spelled in one name or literal (wb-jdpn F8): the word tsx beside an ADMISSION word. */
function admitsTsx(text: string): boolean {
  const spelled = words(text);
  return spelled.includes("tsx") && spelled.some(word => ADMISSION.includes(word));
}
/** One module read through the TypeScript parser: its deno spellings (identifier words and cooked literals), its TSX start admissions
 * (the same names and literals), its node:child_process launches with their commands, the launches whose command is neither a string
 * literal nor process.execPath, its .kill() call sites and the names its launch results are bound to. */
function readModule(fileName: string, text: string): CodeReading {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, moduleKind(fileName) ?? ts.ScriptKind.TS);
  const named = new Set<string>();
  const namespaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !CHILD_PROCESS.has(statement.moduleSpecifier.text)) continue;
    const clause = statement.importClause;
    if (clause?.name) namespaces.add(clause.name.text);
    const bindings = clause?.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings)) namespaces.add(bindings.name.text);
    if (bindings && ts.isNamedImports(bindings)) {
      for (const element of bindings.elements) if (LAUNCHERS.has((element.propertyName ?? element.name).text)) named.add(element.name.text);
    }
  }
  const spellings: string[] = [];
  const admissions: string[] = [];
  const launches: string[] = [];
  const unresolved: string[] = [];
  const kills: string[] = [];
  const launchBindings: string[] = [];
  const line = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const launcherOf = (call: ts.CallExpression): string | undefined => {
    const callee = call.expression;
    if (ts.isIdentifier(callee) && named.has(callee.text)) return callee.text;
    if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && namespaces.has(callee.expression.text) && LAUNCHERS.has(callee.name.text)) {
      return `${callee.expression.text}.${callee.name.text}`;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      if (words(node.text).includes(DENO)) spellings.push(`${fileName}:${line(node)} identifier ${node.text}`);
      if (admitsTsx(node.text)) admissions.push(`${fileName}:${line(node)} identifier ${node.text}`);
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) {
      if (DENO_WORD.test(node.text)) spellings.push(`${fileName}:${line(node)} literal ${JSON.stringify(node.text)}`);
      if (admitsTsx(node.text)) admissions.push(`${fileName}:${line(node)} literal ${JSON.stringify(node.text)}`);
    }
    if (ts.isCallExpression(node)) {
      const launcher = launcherOf(node);
      if (launcher !== undefined) {
        const [command] = node.arguments;
        const spelled = command === undefined ? undefined
          : ts.isStringLiteral(command) || ts.isNoSubstitutionTemplateLiteral(command) ? JSON.stringify(command.text)
            : command.getText(source) === "process.execPath" ? "process.execPath" : undefined;
        if (spelled === undefined) unresolved.push(`${fileName}:${line(node)} ${launcher}(${command?.getText(source) ?? ""})`);
        else launches.push(`${fileName} ${launcher}(${spelled})`);
        if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) launchBindings.push(node.parent.name.text);
      }
      const callee = node.expression;
      if (ts.isPropertyAccessExpression(callee) && callee.name.text === "kill") kills.push(`${callee.expression.getText(source)}.kill(${node.arguments.map(arg => arg.getText(source)).join(", ")})`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file: fileName, spellings, admissions, launches, unresolved, kills, launchBindings };
}
/** Readings joined field by field, in order (undefined when there are none): the provider read with its provider-shaped control. */
function joined(readings: readonly CodeReading[]): CodeReading | undefined {
  if (readings.length === 0) return undefined;
  return {
    file: readings.map(reading => reading.file).join("+"),
    spellings: readings.flatMap(reading => reading.spellings),
    admissions: readings.flatMap(reading => reading.admissions),
    launches: readings.flatMap(reading => reading.launches),
    unresolved: readings.flatMap(reading => reading.unresolved),
    kills: readings.flatMap(reading => reading.kills),
    launchBindings: readings.flatMap(reading => reading.launchBindings),
  };
}

/** The functions IMPL's cases read the subject through, and the names that would hand a case its own expected witness. */
const READERS = ["walk", "clauseHits", "spawnSync", "readModule", "inputForms", "standIn", "nativeRegistry", "nativeReactiveFiberRender", "settingsSurface", "hermeticDir", "loadSettings", "loadWorkbenchNative", "schemaNames"];
const ROSTER_NAMES = ["ROSTER", "rosterWitness", "readRoster"];
/** IMPL as written in this file, read through the TypeScript parser: per case, the READERS and ROSTER_NAMES (the parsed roster's
 * handles) its own initializer names (direct identifiers only: a helper's own reads, or a case parsing the roster file by path, are
 * not followed). */
function implReads(): Record<string, { readers: string[]; roster: string[] }> {
  const source = ts.createSourceFile(SELF, readFileSync(join(REPO, SELF), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const reads: Record<string, { readers: string[]; roster: string[] }> = {};
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "IMPL" && node.initializer && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
        const names = new Set<string>();
        const collect = (inner: ts.Node): void => {
          if (ts.isIdentifier(inner)) names.add(inner.text);
          ts.forEachChild(inner, collect);
        };
        collect(property.initializer);
        reads[property.name.text] = { readers: READERS.filter(name => names.has(name)), roster: ROSTER_NAMES.filter(name => names.has(name)) };
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return reads;
}

/** This file's top-level names that reach the parsed roster (wb-jdpn F5, H22): readRoster and, to a fixed point, every top-level
 * function or variable declaration whose own text names one of them (the describe block is no declaration). ROSTER_NAMES is held to it. */
function rosterHandles(): string[] {
  const source = ts.createSourceFile(SELF, readFileSync(join(REPO, SELF), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declared: { name: string; names: Set<string> }[] = [];
  const namesIn = (node: ts.Node): Set<string> => {
    const names = new Set<string>();
    const collect = (inner: ts.Node): void => {
      if (ts.isIdentifier(inner)) names.add(inner.text);
      ts.forEachChild(inner, collect);
    };
    collect(node);
    return names;
  };
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name) declared.push({ name: statement.name.text, names: namesIn(statement) });
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) declared.push({ name: declaration.name.text, names: namesIn(declaration) });
    }
  }
  const handles = new Set(["readRoster"]);
  for (let grown = true; grown; ) {
    grown = false;
    for (const { name, names } of declared) {
      if (!handles.has(name) && [...handles].some(handle => names.has(handle))) {
        handles.add(name);
        grown = true;
      }
    }
  }
  return [...handles].sort();
}

/** Every property and required name an input schema holds, at any depth (oneOf arms, nested properties and items included). */
function schemaNames(schema: unknown): string[] {
  if (Array.isArray(schema)) return schema.flatMap(schemaNames);
  if (!isObject(schema)) return [];
  const names: string[] = [];
  for (const [key, value] of Object.entries(schema)) {
    if (key === "properties" && isObject(value)) for (const [name, inner] of Object.entries(value)) names.push(name, ...schemaNames(inner));
    else if (key === "required" && Array.isArray(value)) names.push(...value.filter((name): name is string => typeof name === "string"));
    else names.push(...schemaNames(value));
  }
  return names;
}

type NamedType = ts.InterfaceDeclaration | ts.TypeAliasDeclaration;
/** The settings surface: every property name declared inside SubagentsSettings and WorkbenchSettings (nested type literals included)
 * and inside every interface or type alias a member's type names (a type reference, or an interface's extends clause), followed
 * transitively through the module that declares it - src/settings.ts, or a module it imports by a relative specifier - each type
 * once (wb-jdpn F7; `followed` lists them), and the string members of the key set sanitize() checks workbench keys against. `read`
 * returns a module's text by repository path (undefined when absent), so the planted settings modules ride the same reading. */
function settingsSurface(read: (path: string) => string | undefined): { members: string[]; workbenchMembers: string[]; sanitizeKeys: string[]; followed: string[] } {
  const file = "src/settings.ts";
  const parsed = new Map<string, ts.SourceFile | null>();
  const parse = (path: string): ts.SourceFile | null => {
    if (!parsed.has(path)) {
      const text = read(path);
      parsed.set(path, text === undefined ? null : ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
    }
    return parsed.get(path) ?? null;
  };
  const source = parse(file);
  if (source === null) throw new Error(`the settings surface reads no ${file}`);
  const members: string[] = [];
  const workbenchMembers: string[] = [];
  const followed: string[] = [];
  const seen = new Set<string>([`${file}:SubagentsSettings`, `${file}:WorkbenchSettings`]);
  let sanitizeKeys: string[] = [];
  /** The interface or type alias `name` names inside module `path`: declared there, or imported there from a relative module. */
  const resolve = (path: string, name: string): { path: string; declaration: NamedType } | undefined => {
    const module = parse(path);
    if (module === null) return undefined;
    for (const statement of module.statements) {
      if ((ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement)) && statement.name.text === name) return { path, declaration: statement };
    }
    for (const statement of module.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || !statement.moduleSpecifier.text.startsWith(".")) continue;
      const bindings = statement.importClause?.namedBindings;
      const element = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.find(entry => entry.name.text === name) : undefined;
      if (element !== undefined) return resolve(join(dirname(path), statement.moduleSpecifier.text).replace(/\.js$/, ".ts"), (element.propertyName ?? element.name).text);
    }
    return undefined;
  };
  const collect = (node: ts.Node, into: string[], path: string): void => {
    if (ts.isPropertySignature(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name))) into.push(node.name.text);
    const named = ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) ? node.typeName.text
      : ts.isExpressionWithTypeArguments(node) && ts.isIdentifier(node.expression) ? node.expression.text : undefined;
    const target = named === undefined ? undefined : resolve(path, named);
    if (target !== undefined && !seen.has(`${target.path}:${target.declaration.name.text}`)) {
      seen.add(`${target.path}:${target.declaration.name.text}`);
      followed.push(`${target.path}:${target.declaration.name.text}`);
      collect(target.declaration, into, target.path);
    }
    ts.forEachChild(node, child => collect(child, into, path));
  };
  for (const statement of source.statements) {
    if (ts.isInterfaceDeclaration(statement) && (statement.name.text === "SubagentsSettings" || statement.name.text === "WorkbenchSettings")) {
      collect(statement, members, file);
      if (statement.name.text === "WorkbenchSettings") for (const member of statement.members) if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) workbenchMembers.push(member.name.text);
    }
    if (ts.isFunctionDeclaration(statement) && statement.name?.text === "sanitize") {
      const find = (node: ts.Node): void => {
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "Set") {
          const [list] = node.arguments ?? [];
          if (list !== undefined && ts.isArrayLiteralExpression(list) && list.elements.every(ts.isStringLiteral)) sanitizeKeys = list.elements.map(element => (ts.isStringLiteral(element) ? element.text : ""));
        }
        ts.forEachChild(node, find);
      };
      find(statement);
    }
  }
  return { members, workbenchMembers, sanitizeKeys, followed };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
const restorers: (() => void)[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  for (const restore of restorers.splice(0)) restore();
  removeScratch(...scratches.splice(0));
});

function scratch(prefix: string): string {
  const folder = makeScratch(prefix);
  scratches.push(folder);
  return folder;
}
/** Writes each planted file below a fresh scratch root and returns the root. */
function plant(files: Readonly<Record<string, string>>): string {
  const root = scratch("rf-tsx-worker-lifecycle-plant-");
  for (const [path, text] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), text);
  }
  return root;
}

type Reply = "envelope" | "refusal" | "malformed" | "hang";
interface StandIn {
  readonly folder: string;
  readonly log: string;
  readonly denoLog: string;
}
interface Spawned {
  readonly pid: number;
  readonly executable: string;
  readonly argv: string[];
  readonly env: string[];
}
/** The rf answer to a render whose runtime is missing (the code the rf-tsx tier's runtime-absent row pins): a typed refusal envelope. */
function refusalEnvelope(root: string): JsonObject {
  return {
    ...(fullShapeRf(root) as JsonObject), ok: false, result: null,
    diagnostics: [{ code: "RF_COMPONENT_RUNTIME_ABSENT", severity: "error", message: "component runtime absent", hint: null, source: null, metadata: {} }],
  };
}
/**
 * A stand-in rf and a tripwire deno, both first on PATH in one makeScratch folder (absolute-node shebangs, so neither needs a PATH
 * lookup itself). Every rf spawn appends {pid, executable, argv, env names} to the returned log and answers `reply`; any execution of
 * the tripwire appends its argv to denoLog.
 */
function standIn(reply: Reply, root: string): StandIn {
  const folder = scratch("rf-tsx-worker-lifecycle-bin-");
  const log = join(folder, "rf-spawns.jsonl");
  const denoLog = join(folder, "deno-spawns.jsonl");
  const answer = reply === "envelope" ? JSON.stringify(fullShapeRf(root)) : reply === "refusal" ? JSON.stringify(refusalEnvelope(root)) : "{not json";
  const rf = join(folder, "rf");
  writeFileSync(rf, [
    `#!${process.execPath}`,
    'const fs = require("node:fs");',
    `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ pid: process.pid, executable: process.argv[1], argv: process.argv.slice(2), env: Object.keys(process.env).sort() }) + "\\n");`,
    reply === "hang" ? "setTimeout(() => {}, 120000);" : `process.stdout.write(${JSON.stringify(answer)});\nprocess.exitCode = ${reply === "refusal" ? 3 : 0};`,
    "",
  ].join("\n"));
  chmodSync(rf, 0o700);
  const tripwire = join(folder, DENO);
  writeFileSync(tripwire, [`#!${process.execPath}`, `require("node:fs").appendFileSync(${JSON.stringify(denoLog)}, JSON.stringify(process.argv.slice(2)) + "\\n");`, ""].join("\n"));
  chmodSync(tripwire, 0o700);
  process.env.PATH = `${folder}${delimiter}${oldPath ?? ""}`;
  return { folder, log, denoLog };
}
function spawnsOf(log: string): Spawned[] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8").split("\n").filter(Boolean).map(line => JSON.parse(line) as Spawned);
}
function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
/** The first PATH entry holding an executable regular file `name`: the file a PATH-resolving launch of `name` executes (wb-jdpn F3). */
function resolveOnPath(name: string, path: string | undefined): string | null {
  for (const directory of (path ?? "").split(delimiter)) {
    if (directory === "") continue;
    const candidate = join(directory, name);
    try {
      accessSync(candidate, constants.X_OK);
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // not in this entry: the next one
    }
  }
  return null;
}
async function settled(run: Promise<JsonValue>): Promise<string> {
  try {
    await run;
    return "returned";
  } catch (error) {
    const category = isObject(error) && typeof error.category === "string" ? error.category : "thrown";
    return `${category}: ${error instanceof Error ? error.message : String(error)}`;
  }
}
async function until(check: () => boolean, ms: number): Promise<boolean> {
  const deadline = Date.now() + ms;
  while (!check()) {
    if (Date.now() > deadline) return false;
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  return true;
}
/** Every input form the registered rf descriptor admits: each oneOf arm's required names, and each arm with all its properties. */
function inputForms(): { arms: JsonValue; forms: JsonObject[] } {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, REPO);
  const schema = registry.catalogSnapshot()[0]?.descriptor.inputSchema;
  const arms = isObject(schema) && Array.isArray(schema.oneOf) ? schema.oneOf : [];
  const seen = new Set<string>();
  const forms: JsonObject[] = [];
  const shapes = arms.map(arm => {
    const properties = isObject(arm) && isObject(arm.properties) ? Object.keys(arm.properties) : [];
    const required = isObject(arm) && Array.isArray(arm.required) ? arm.required.map(String) : [];
    for (const keys of [required, properties]) {
      const form: JsonObject = Object.fromEntries(keys.map(key => [key, VALUES[key] ?? `unvalued:${key}`]));
      const id = JSON.stringify(form);
      if (!seen.has(id)) {
        seen.add(id);
        forms.push(form);
      }
    }
    return { required, properties };
  });
  return { arms: json(shapes), forms };
}
function nativeRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}
function invokeContext(signal: AbortSignal = new AbortController().signal) {
  return { grants: GRANTS, signal };
}
/** An argv with the workspace root replaced by a fixed mark, so a witness never carries a host path. */
function marked(argv: readonly string[], root: string): string[] {
  return argv.map(token => (token === root ? "<root>" : token));
}

/** The planted texts A1 reads as a scratch tree: a positive control per alternative and the R-SPELLING / R-COMPOSED / R-SCOPE quiet rows. */
const A1_CONTROLS: Readonly<Record<string, string>> = {
  "src/dir-variable.ts": `const cache = process.env.${DIR_VARIABLE};\n`,
  "src/verb-run.ts": `launch("${DENO} run main.ts");\n`,
  "src/verb-task.ts": `launch("${DENO} task build");\n`,
  "package.json": `{ "dependencies": { "${SDK_SCOPE}/components": "1.0.0" } }\n`,
  "src/quiet-case.ts": `launch("Deno run main.ts");\n`,
  "src/quiet-spacing.ts": `launch("${DENO}  run main.ts");\n`,
  "src/quiet-composed.ts": 'const cache = ["DENO", "DIR"].join("_");\n',
  "qa/quiet-scope.mjs": `const cache = process.env.${DIR_VARIABLE};\n`,
};
/** The planted test tree A2 reads: needles outside the holder class (a helper, a plain test, a plain fixture), the R-HOLDER quiet rows
 * (a census module, a census-tier module and a roster holding one as data), and a deno launch that reds even inside a holder. */
const A2_CONTROLS: Readonly<Record<string, string>> = {
  "test/helpers/plant-helper.ts": `export const SCOPE = "${SDK_SCOPE}/components";\n`,
  "test/plant.test.ts": `const cache = process.env.${DIR_VARIABLE};\n`,
  "test/fixtures/plant.json": `{ "sdk": "${SDK_SCOPE}/components" }\n`,
  "test/workbench-plant-census.test.ts": `const needle = "${DENO} run main.ts";\n`,
  "test/workbench-plant.census.ts": `const needle = "${SDK_SCOPE}/components";\n`,
  "test/fixtures/plant-roster.json": `{ "needle": "${DIR_VARIABLE}" }\n`,
  "test/workbench-launch-census.test.ts": `import { spawn } from "node:child_process";\nspawn("${DENO}", ["--version"]);\n`,
};
/** The module texts B1 reads beside src: launches and spellings it must see, the precision row, the R-COMPOSED / R-COMMENT /
 * R-UNBOUND-LAUNCH quiet rows, the capitalized literal (wb-jdpn F6), the provider-shaped control read with the provider (wb-jdpn F5)
 * and the TSX admission controls with the R-ADMISSION-NAMES quiet row (wb-jdpn F8). */
const B1_CONTROLS: Readonly<Record<string, string>> = {
  literalCommand: `import { spawn } from "node:child_process";\nspawn("${DENO}", ["--version"]);\n`,
  aliasedUnresolved: 'import { spawn as launch } from "node:child_process";\nconst bin = pick();\nlaunch(bin, []);\n',
  namespacePath: `import * as cp from "node:child_process";\ncp.execFileSync("/usr/local/bin/${DENO}");\n`,
  identifierWord: `const ${DENO}Cache = 1;\n`,
  denominated: 'const note = "denominated in agents";\n',
  composedCommand: 'import { spawn } from "node:child_process";\nconst bin = "de" + "no";\nspawn(bin);\n',
  composedUnbound: 'require("node:child_process").spawn("de" + "no");\n',
  commentOnly: `// ${DENO} is named here only in a comment\nconst value = 1;\n`,
  requireLaunch: `require("node:child_process").spawn("${DENO}");\n`,
  capitalLiteral: 'const label = "Deno";\n',
  providerShape: 'import { spawn } from "node:child_process";\nconst helper = spawn("rf", ["--version"]);\nhelper.kill("SIGINT");\n',
  admissionIdentifier: "let tsxStarts = 0;\nconst TSX_START_LIMIT = 4;\n",
  admissionLiteral: 'throw new Error("TSX start not admitted.");\n',
  admissionQuiet: 'const counters = ["tsx_worker_spawns", "tsx_resource_rounds"];\nconst renderSlots = 4;\n',
};
/** The provider-shaped control's planted path: B1 reads it with the provider, so the provider's launch, binding and kill lists hold it. */
const PROVIDER_SHAPE = `${PLANTED}providerShape.ts`;
/** The schemas and names C1/C3 read: family names they must see, one single-word control per FAMILY word (each holds that word and
 * no other, wb-jdpn F4), the precision rows and the R-NAMES quiet row. */
const NAME_CONTROLS: readonly string[] = [
  "denoWorkerCount", "tsxAdmissionPolicy", "residentWorker", "workerPool", DIR_VARIABLE,
  "denoHome", "tsxRuntime", "workerCount", "workersMax", "poolSize", "poolsMax", "residentMode", "admissionLimit", "admitLimit", "admitsMax",
  "reactivefiberWorkspaceRoot", "maxConcurrent", "workspace",
];
const SCHEMA_CONTROL = {
  type: "object",
  properties: { workspaceRoot: { type: "string" }, options: { type: "string", enum: ["resident worker pool"] }, nested: { type: "object", properties: { tsxAdmission: { type: "string" } } } },
  oneOf: [{ required: ["residentWorker"] }],
};

const IMPL: Record<string, () => JsonValue | Promise<JsonValue>> = {
  A1: () => {
    const src = walk(REPO, "src");
    const manifest = walk(REPO, "package.json");
    const root = plant(A1_CONTROLS);
    const planted = [...walk(root, "src").files, ...walk(root, "test").files, ...walk(root, "package.json").files].map(file => `${PLANTED}${file}`);
    // wb-jdpn F5: the planted controls ride the live reading, so the judged hits list holds exactly the planted positives today.
    const hits = [...clauseHits(REPO, [...src.files, ...manifest.files]), ...clauseHits(root, planted)];
    const controls: JsonObject = {};
    for (const file of Object.keys(A1_CONTROLS)) {
      const label = `${PLANTED}${file}`;
      controls[file] = planted.includes(label) ? hits.filter(hit => hit.file === label).map(hit => hit.alternative) : "unwalked";
    }
    return {
      hits: hits.map(hit => `${hit.file}:${hit.line} ${hit.alternative}`),
      manifest: manifest.files,
      symlinks: [...src.symlinks, ...manifest.symlinks],
      srcFloor: src.files.length >= FLOORS.src,
      controls,
    };
  },
  A2: () => {
    const test = walk(REPO, "test");
    const root = plant(A2_CONTROLS);
    const planted = walk(root, "test").files.map(file => `${PLANTED}${file}`);
    // wb-jdpn F5: the planted controls ride the live reading, so outsideHolders and denoLaunches hold exactly the planted ones today.
    const hits = [...clauseHits(REPO, test.files), ...clauseHits(root, planted)];
    const files = [...new Set(hits.map(hit => hit.file))];
    const modules = [...test.files, ...planted].filter(file => moduleKind(file) !== undefined);
    const launches = modules.flatMap(file => readModule(file, readFileSync(isPlanted(file) ? join(root, pathOf(file)) : join(REPO, file), "utf8")).launches);
    const controls: JsonObject = {};
    for (const file of Object.keys(A2_CONTROLS)) {
      const label = `${PLANTED}${file}`;
      const hit = files.includes(label);
      const launched = launches.some(entry => entry.startsWith(`${label} `) && denoLaunch(entry));
      controls[file] = `${hit ? (holder(label) ? "holder" : "outside") : "quiet"}${launched ? "+deno-launch" : ""}`;
    }
    return {
      outsideHolders: files.filter(file => !holder(file)),
      holderFloor: files.filter(file => !isPlanted(file) && holder(file)).length >= FLOORS.holders,
      denoLaunches: launches.filter(denoLaunch),
      launchFloor: launches.filter(entry => !isPlanted(entry)).length >= FLOORS.testLaunches,
      symlinks: test.symlinks,
      self: [SELF, ROSTER_FILE].map(file => ({ file, walked: test.files.includes(file), hits: clauseHits(REPO, [file]).length })),
      testFloor: test.files.length >= FLOORS.test,
      controls,
    };
  },
  A3: () => {
    const run = spawnSync("git", ["grep", "-n", "-E", CLAUSE_PATTERN, "--", ...SCOPE], { cwd: REPO, encoding: "utf8" });
    const files = [...new Set(run.stdout.split("\n").filter(Boolean).map(entry => entry.slice(0, entry.indexOf(":"))))].sort();
    return {
      ran: run.status === 0 || run.status === 1,
      productHits: files.filter(file => file === "package.json" || file.startsWith("src/")),
      outsideHolders: files.filter(file => file.startsWith("test/") && !holder(file)),
    };
  },
  B1: () => {
    const modules = walk(REPO, "src").files;
    // wb-jdpn F5: the controls are read as modules beside the live ones (the provider with its provider-shaped control), so every
    // judged list below holds exactly the controls' entries beside the live ones today.
    const sources = [...modules.map(file => ({ file, text: readFileSync(join(REPO, file), "utf8") })), ...Object.entries(B1_CONTROLS).map(([name, text]) => ({ file: `${PLANTED}${name}.ts`, text }))];
    const readings = sources.map(({ file, text }) => readModule(file, text));
    const provider = joined(readings.filter(reading => reading.file === PROVIDER || reading.file === PROVIDER_SHAPE));
    const controls: JsonObject = {};
    for (const reading of readings.filter(entry => isPlanted(entry.file))) {
      controls[pathOf(reading.file).slice(0, -".ts".length)] = { spellings: reading.spellings.length, admissions: reading.admissions.length, launches: reading.launches, unresolved: reading.unresolved.length };
    }
    return {
      spellings: readings.flatMap(reading => reading.spellings),
      admissions: readings.flatMap(reading => reading.admissions),
      unresolved: readings.flatMap(reading => reading.unresolved),
      providerLaunches: provider?.launches ?? null,
      providerBindings: provider?.launchBindings ?? null,
      providerKills: provider?.kills ?? null,
      nonTs: modules.filter(file => !file.endsWith(".ts")),
      launchFloor: readings.filter(reading => !isPlanted(reading.file)).flatMap(reading => reading.launches).length >= FLOORS.launches,
      controls,
    };
  },
  B2: async () => {
    const { arms, forms } = inputForms();
    const root = scratch("rf-tsx-worker-lifecycle-root-");
    const renders: JsonValue[] = [];
    for (const form of forms) {
      const bin = standIn("envelope", root);
      const outcome = await settled(nativeRegistry(root).invoke(PREVIEW_ID, form, invokeContext()));
      const spawns = spawnsOf(bin.log);
      renders.push({
        input: Object.keys(form),
        spawns: spawns.length,
        executables: spawns.map(entry => basename(entry.executable)),
        onPath: spawns.every(entry => dirname(entry.executable) === bin.folder),
        argv: spawns.map(entry => marked(entry.argv, root)),
        outcome,
      });
    }
    return { arms, renders };
  },
  B3: async () => {
    const root = scratch("rf-tsx-worker-lifecycle-root-");
    const paths: JsonValue[] = [];
    const tripped: string[] = [];
    for (const reply of ["envelope", "refusal", "malformed", "hang"] as const) {
      const bin = standIn(reply, root);
      const controller = new AbortController();
      const run = nativeReactiveFiberRender({ model: VALUES.model ?? "", task: VALUES.task ?? "" }, root, controller.signal);
      let aliveDuring: number | null = null;
      if (reply === "hang") {
        const started = await until(() => spawnsOf(bin.log).length > 0, 30_000);
        // wb-jdpn F3: the liveness reading's positive control - the hanging rf reads alive while its render runs.
        aliveDuring = spawnsOf(bin.log).filter(entry => alive(entry.pid)).length;
        if (started) controller.abort();
      }
      const outcome = await settled(run);
      const spawns = spawnsOf(bin.log);
      paths.push({ reply, rfSpawns: spawns.length, outcome, aliveDuring, aliveAfter: spawns.filter(entry => alive(entry.pid)).length });
      tripped.push(...spawnsOf(bin.denoLog).map(argv => JSON.stringify(argv)));
    }
    // wb-jdpn F3: the tripwire's positive control - deno resolved through the stand-in PATH, as a PATH-resolving launch resolves it, is
    // the tripwire, and running it records its argv; a resolution that misses the tripwire is never executed (no host deno is ever executed).
    const control = standIn("envelope", root);
    const resolvesToTripwire = resolveOnPath(DENO, process.env.PATH) === join(control.folder, DENO);
    if (resolvesToTripwire) spawnSync(join(control.folder, DENO), ["--census-tripwire-control"], { stdio: "ignore" });
    return { paths, denoExecutions: tripped, tripwire: { resolvesToTripwire, recorded: spawnsOf(control.denoLog).map(argv => JSON.stringify(argv)) } };
  },
  B4: async () => {
    const root = scratch("rf-tsx-worker-lifecycle-root-");
    const selector: ReactiveFiberRenderSelector = { model: VALUES.model ?? "", task: VALUES.task ?? "" };
    const sequentialBin = standIn("envelope", root);
    const lingering: number[] = [];
    for (let render = 0; render < 3; render++) {
      await nativeReactiveFiberRender(selector, root);
      lingering.push(...spawnsOf(sequentialBin.log).filter(entry => alive(entry.pid)).map(entry => entry.pid));
    }
    const sequential = spawnsOf(sequentialBin.log);
    const concurrentBin = standIn("envelope", root);
    await Promise.all([0, 1, 2].map(() => nativeReactiveFiberRender(selector, root)));
    const concurrent = spawnsOf(concurrentBin.log);
    const reading = (spawns: Spawned[], live: number) => ({ renders: 3, spawns: spawns.length, distinctPids: new Set(spawns.map(entry => entry.pid)).size, aliveAfter: live });
    return {
      sequential: reading(sequential, lingering.length),
      concurrent: reading(concurrent, concurrent.filter(entry => alive(entry.pid)).length),
    };
  },
  C1: () => {
    const surface = settingsSurface(path => (existsSync(join(REPO, path)) ? readFileSync(join(REPO, path), "utf8") : undefined));
    // wb-jdpn F7: the planted settings modules ride the same reading, so the judged hits and followed types hold exactly theirs today.
    const planted = settingsSurface(path => SETTINGS_CONTROLS[path]);
    const names = [...surface.members, ...surface.sanitizeKeys, ...planted.members.map(name => `${PLANTED}${name}`)];
    return {
      hits: names.filter(name => familyName(pathOf(name))),
      followed: [...surface.followed, ...planted.followed.map(entry => `${PLANTED}${entry}`)],
      sanitizeMatchesWorkbench: JSON.stringify([...surface.sanitizeKeys].sort()) === JSON.stringify([...surface.workbenchMembers].sort()),
      memberFloor: surface.members.length >= FLOORS.settings,
      controls: NAME_CONTROLS.map(name => `${name}:${familyName(name)}`),
    };
  },
  C2: () => {
    const topLevel = hermeticDir({ settings: { ...Object.fromEntries(SETTINGS_KNOBS.map(key => [key, 4])), workbench: { workflowAgentBackend: "pi" } } });
    let survivors: string[];
    try {
      survivors = Object.keys(loadSettings(topLevel.dir)).filter(key => SETTINGS_KNOBS.includes(key));
    } finally {
      topLevel.restore();
    }
    const refusals = SETTINGS_KNOBS.map(key => {
      const sandbox = hermeticDir({ settings: { workbench: { workflowAgentBackend: "pi", [key]: 4 } } });
      try {
        loadSettings(sandbox.dir);
        return `${key}: loaded`;
      } catch (error) {
        return error instanceof Error ? error.message : String(error);
      } finally {
        sandbox.restore();
      }
    });
    return { survivors, refusals };
  },
  C3: async () => {
    const native = await loadWorkbenchNative();
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    const descriptors = registry.catalogSnapshot().map(row => row.descriptor);
    const rf = descriptors.find(descriptor => descriptor.id === PREVIEW_ID);
    return {
      familyNames: descriptors.flatMap(descriptor => schemaNames(descriptor.inputSchema).filter(familyName).map(name => `${descriptor.id}:${name}`)),
      rfInputNames: [...new Set(schemaNames(rf?.inputSchema))].sort(),
      descriptorFloor: descriptors.length >= FLOORS.descriptors,
      controls: [...new Set(schemaNames(SCHEMA_CONTROL))].sort().map(name => `${name}:${familyName(name)}`),
    };
  },
  C4: async () => {
    // wb-jdpn F5: the reaching control is set beside the knobs and read by the same filter, so the reached list holds exactly it today.
    const planted: Readonly<Record<string, string>> = { ...PARENT_KNOBS, ...REACHING_CONTROL };
    const saved = Object.fromEntries(Object.keys(planted).map(name => [name, process.env[name]]));
    restorers.push(() => {
      for (const [name, value] of Object.entries(saved)) {
        if (value === undefined) delete process.env[name];
        else process.env[name] = value;
      }
    });
    Object.assign(process.env, PARENT_KNOBS);
    Object.assign(process.env, REACHING_CONTROL);
    const root = scratch("rf-tsx-worker-lifecycle-root-");
    const reached: string[] = [];
    const argvFamily: string[] = [];
    let spawns = 0;
    for (const form of inputForms().forms) {
      const bin = standIn("envelope", root);
      await nativeRegistry(root).invoke(PREVIEW_ID, form, invokeContext());
      for (const entry of spawnsOf(bin.log)) {
        spawns++;
        reached.push(...entry.env.filter(name => Object.hasOwn(planted, name)));
        argvFamily.push(...marked(entry.argv, root).filter(token => familyName(token) || DENO_WORD.test(token)));
      }
    }
    return {
      set: Object.keys(planted).filter(name => process.env[name] === planted[name]),
      spawns,
      reached: [...new Set(reached)].sort(),
      allowlistFamily: RF_CHILD_ENV_ALLOWLIST.filter(name => familyName(name) || DENO_WORD.test(name)),
      argvFamily,
    };
  },
};

describe("wb-csbt.3 rf TSX worker lifecycle census (TSX-RESOURCE-EFFICIENCY-FRONTIER-R3, standing posture pin)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the owner's filing and the cases agree", ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:4", "C:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // Every case, as written, reads the subject through a named reader and never names the roster it is judged against.
    const reads = implReads();
    expect(Object.keys(reads).sort(), "IMPL as written in this file").toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.entries(reads).filter(([, read]) => read.readers.length === 0 || read.roster.length > 0).map(([pin]) => pin), "cases that read no subject or name the roster").toEqual([]);
    const filing = ownerFiling();
    // The owner's acceptance clauses in the tracked bead export are exactly the labels of rows A, B and C, in order.
    expect(filing.clauses).toEqual(ROWS.map(row => row.label));
    // Clause (a)'s quoted pattern and pathspecs are the ones A1-A3 read.
    const clauseA = filing.clauses[0] ?? "";
    expect(clauseA.slice(clauseA.indexOf("-E '") + 4, clauseA.indexOf("' --"))).toBe(CLAUSE_PATTERN);
    expect(clauseA.slice(clauseA.indexOf("' -- ") + 5, clauseA.indexOf(" in Pi-subagents")).split(" ")).toEqual(SCOPE);
    expect({ title: filing.title, quote: filing.quote, citation: filing.citation }).toStrictEqual({ title: ROSTER.title, quote: ROSTER.quote, citation: ROSTER.citation });
    expect(ROSTER.citation.endsWith(`@${PIN}`)).toBe(true);
    expect({ bead: BEAD, pin: PIN, pattern: CLAUSE_PATTERN, scope: SCOPE, holders: HOLDERS.map(pattern => pattern.source), family: FAMILY }).toStrictEqual({
      bead: ROSTER.bead, pin: ROSTER.pin, pattern: ROSTER.pattern, scope: [...ROSTER.scope], holders: [...ROSTER.holders], family: [...ROSTER.family],
    });
    // wb-jdpn F5 (H22): ROSTER_NAMES is held to this file's own reach of the parsed roster, and no READER is a roster handle.
    const handles = rosterHandles();
    expect(handles, "this file's top-level names that reach the parsed roster").toEqual([...ROSTER_NAMES].sort());
    expect(READERS.filter(name => handles.includes(name)), "READERS that reach the parsed roster").toEqual([]);
    // wb-jdpn F4: FAMILY is held outside itself - each word is a word of the owner's filing or its plural or third person, and the
    // filing's knob phrases split exactly into FAMILY and GENERIC.
    const filingWords = new Set(words([filing.title, ...filing.clauses, filing.quote].join(" ")));
    expect(FAMILY.filter(word => !filingWords.has(word) && !filingWords.has(word.replace(/s$/, ""))), "FAMILY words the owner's filing never uses").toEqual([]);
    const knobs = knobPhrases(filing);
    const knobWords = [...new Set(knobs.phrases.flatMap(words))].sort();
    expect(knobWords.filter(word => !FAMILY.includes(word) && !GENERIC.includes(word)), "knob-phrase words neither FAMILY nor GENERIC").toEqual([]);
    expect(GENERIC.filter(word => FAMILY.includes(word) || !knobWords.includes(word)), "GENERIC words that are FAMILY or no knob-phrase word").toEqual([]);
    // wb-jdpn F2: the closing case, which reads COMPARED and REACHED, is collected in run mode (it cannot see its own skip).
    const [top] = task.file.tasks;
    const closing = top?.type === "suite" ? top.tasks[top.tasks.length - 1] : undefined;
    expect(closing === undefined ? null : `${closing.type} | ${closing.name} | ${closing.mode}`, "the closing case, last in this file, collected in run mode").toBe(`test | ${ROSTER.tests[ROSTER.tests.length - 1] ?? ""} | run`);
    // wb-jdpn F8: the title's duty phrase names TSX beside ADMISSION words only.
    expect(words(knobs.duty).filter(word => word !== "tsx" && !ADMISSION.includes(word)), `the title duty "${knobs.duty}" outside ADMISSION`).toEqual([]);
    expect(words(knobs.duty).includes("tsx"), "the title duty names TSX").toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(await impl());
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.set(pin, witness);
        });
      }
    });
  }

  it("registration: every case of this file is registered once, in roster order, in run mode, ran before this one and reached its witness compare", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    // wb-jdpn F2: every pin's case reached its witness compare (rosterWitness evaluated as its expected value) and passed it.
    const pins = ROSTER.rows.flatMap(row => row.pins.map(entry => entry.id));
    expect(COMPARED, "pins whose witness compare ran, in roster order, each once").toEqual(pins);
    expect([...REACHED.keys()], "pins that passed their witness compare, in roster order").toEqual(pins);
    const expected = new Map(ROSTER.rows.flatMap(row => row.pins.map(entry => [entry.id, entry.witness] as const)));
    for (const pin of pins) expect(REACHED.get(pin), `${pin}'s recorded witness against the roster`).toStrictEqual(expected.get(pin));
  });
});
