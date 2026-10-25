/**
 * wb-pfxo.9 (RF-COMPOSITIONAL-ASSEMBLY-R10, program-triage-2026-10-22, epic wb-pfxo), the absent-today leg. Statement (the
 * bead note's full statement): "If Pi ever reads one component instance's blocks WITH content from a committed render, it
 * shall use rf context show RENDER --instance ID --json once shipped (gated rfc-vg54d.2 / CASM-M3a, unshipped at the pin:
 * context.show takes RENDER, --redact, --detail LEVEL at parser.py:2220; --instance exists only on component.state.show/reset),
 * pinning today's absence of the selector and treating the unknown-instance exit 3 as typed not-found, never falling back to
 * the whole envelope" - docs/programs/compositional-assembly-2026-10-18/BEADS-2026-10-21.md:21@6a251bf73af5.
 *
 * SOURCE (the owner filing quotes it): "rf context show RENDER --instance ID projects one component instance's blocks WITH
 * retained content, producer, dependencies, inclusion and reason, never the whole envelope (content complement of context
 * explain --block)" (BEADS-2026-10-21.md:21; R-063 at 29-program-triage-2026-10-21.md:580, same sha). The acceptance is the
 * owner filing's, verbatim: the labels of rows A, B and C below.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23):
 * - read-only git show on the local ReactiveFiberCLI checkout at 6a251bf73af5: src/reactive_fiber_cli/cli/parser.py:2220
 *   reads `"context.show": (_RENDER, _REDACT, _DETAIL),`; --instance is registered as an option at :1909
 *   (component.state.show) and :1926 (component.state.reset) only, its other mentions there being those two leaves' help
 *   and comments; src/reactive_fiber_cli/schemas/cli/baseline/context.show.json states no "selection" key (its components
 *   rows require component_instance_id from :599); tests/unit/test_context_show_projection.py has 0 lines matching
 *   --instance|selection|"matched". The gating artifact rfc-vg54d.2 is not shipped at the pin.
 * - the installed rf 0.1.832 (commit 2618c211be0d, a descendant of 6a251bf73af5), in a scratch jsonl workspace outside every
 *   repository: the `rf context show --help` usage line; one committed render over two component instances (demo.aside:aside,
 *   demo.notes:notes) and its `context show RENDER --json` reply (exit 0, no selection key at any depth); `context show RENDER
 *   --instance demo.notes:notes --json` (exit 2, RF_USAGE_UNKNOWN_OPTION naming --instance on surface "context show");
 *   `context show <an unknown render id> --json` (exit 3, RF_STORAGE_NOT_FOUND, reason render); `context render ... --no-commit`
 *   against a directory that holds no workspace (exit 3, RF_WORKSPACE_INVALID). Each reply is one rf command's stdout, kept
 *   verbatim in the roster's measured block but for the scratch roots (rewritten to /fixture/rf-workspace and
 *   /fixture/rf-empty) and the actor (rewritten to user:fixture).
 * MEASURED BY THE FOLLOW-UP SEAT (wb-7uzc, 2026-10-24):
 * - read-only git show on the same checkout at 6a251bf73af5: src/reactive_fiber_cli/cli/parser.py:250-260 is CLI-A25's
 *   GLOBAL_OPTIONS, "the eight global options, accepted before and after the subcommand with identical semantics"
 *   (--workspace, --actor, JSON_FLAG, --no-input, --yes, --debug, --color, --no-retry; JSON_FLAG is "--json" at
 *   cli/registry.py:187); :277 is VERBOSE_FLAGS ("-v", "--verbose") and :286 RF_VALUE_OPTIONS (--workspace, --actor and
 *   --color, each taking a value). The roster vendors those fourteen lines verbatim. --format is not a global: context show's
 *   usage line lists it because it is the leaf's own JSON alias.
 * - the installed rf 0.1.836 (commit b3494ab13397, a descendant of 6a251bf73af5), in a scratch jsonl workspace outside every
 *   repository: 26 `rf context ... show <an unknown render id>` argvs, 25 with options between "context" and "show" and one
 *   control with --workspace after the render. Every global there - each flag, -vv, and --workspace, --actor and --color with
 *   their value spaced or after "=" - ran as context.show (exit 3 RF_STORAGE_NOT_FOUND: the read reached the store). The
 *   leaf's own --redact and --detail LEVEL, --format VALUE in both spellings, --json-metadata, the abbreviations --js and
 *   --works, and -h/--help did not (exit 2 usage refusals; exit 0 command help). The roster keeps each reply's argv, exit,
 *   command and first diagnostic code and message, the scratch root rewritten to /fixture/rf-workspace.
 *
 * READINGS
 * - TRIGGER (row T): the obligation binds once Pi reads a committed render's instance blocks. Today Pi's one rf reader
 *   (src/workbench/providers/reactivefiber.ts) spawns `context render ... --no-commit` and admits only render_id null, so no
 *   Pi surface holds a RENDER id, and no src module builds a context show argv or registers a descriptor naming one.
 * - PROBE RULE (a): the selector is served only when the reply to `context show RENDER --instance ID --json` is ok, names
 *   command context.show and states result.selection with an integer matched; any other reply reads not-served, with its
 *   reason (wrong-command, refused:<first diagnostic code>, no-selection).
 * - ARGV RULE (a): an argv array names context show when "context" is followed by "show" after any run of rf's globals
 *   between them - a global flag (-v repeated too), a value global and its value, a --global=VALUE spelling, or an element
 *   the module does not resolve (row M's MG1 holds that run to the measured replies). An element reads as written: a string
 *   literal, a same-module const string binding, or the members of a spread array literal or same-module const array; a const
 *   array spread into another array is judged inside it, never alone. After "show" the argv admits exactly one RENDER
 *   positional (a literal not starting with "-", or any non-literal element), --json, --redact and --detail LEVEL (LEVEL one
 *   of the measured levels compact and full, or a non-literal); --instance and its ID only while the probe reads served.
 *   Findings: instance-unserved, outside-admitted:<flag>, level:<value>, level:missing, render-count:<n>. The globals before
 *   "context" (Pi's --workspace ROOT) and between "context" and "show" are outside the leaf's set.
 * - SELECTION READ (b): B2 reads selection.matched in one access chain (a property access or a string-keyed element access,
 *   optional or not, through parentheses, non-null and type assertions; a same-module const string key resolves), on a
 *   receiver named selection, and in a destructuring pattern that binds matched under a selection key or from a selection.
 * - PROJECTION RULE (b)(c): a reply projects rows only when it is ok, exits 0, names context.show, states
 *   result.selection.matched 1 and every result.blocks row's component_instance_id equals the requested id; the rows are the
 *   producer's, verbatim. A failure reply at exit 3 whose first diagnostic code ends _NOT_FOUND is typed not-found; any other
 *   failure is refused (MJ5: a _NOT_FOUND code at another exit too); a reply stating no selection is unavailable
 *   (selector-unserved). Every outcome but projected surfaces zero rows: the whole envelope never.
 * OUTSIDE ANCHORS. F1: the owner filing row of wb-pfxo.9 in the tracked bead export (.beads/issues.jsonl) carries every pinned
 * constant verbatim, its acceptance sentence names exactly the clauses rows A-C cover, and each of rows A-C's labels equals
 * its clause there. The out-of-file roster test/fixtures/rf-context-show-instance-roster.json holds every row's id, label and
 * pins, every pin's witness, the pinned constants and the measured replies, so a pin deleted, relabelled, swapped or removed
 * from every literal of this file at once still reds against it. LANDED RECORD: the same export row carries the landed cut's
 * delivery note, which enumerates its 43 pins (T1-T5, A1-A4, B1-B3, C1-C3, F1, MP1-MP3, MA1-MA7, MJ1-MJ4, MS1-MS7, R1-R6), its
 * frozen shape and its six residuals by name; each must still be judged here in its row, so a landed member removed from this
 * file and the roster together still reds. FOLLOW-UP: the wb-7uzc row's title names the gate probes this cut cures (G13,
 * G13b, G38, P41); CURES binds each to a judged pin. The src walk is held to git's listing of src (tracked files and the
 * untracked ones git does not ignore), and the record case walks this file's vitest task tree and holds every pin's end to
 * the assertion count the roster pins (REACHED), so a case that returns its witness without doing its work reds. FROZEN SHAPE
 * (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * RESIDUALS (named; each has a pinned row in row R): R1 RUNTIME-COMPOSED - an argv element or literal composed at run time
 * from parts (concatenation, push, a template substitution, a spread of anything but an array literal or a same-module const
 * array) is invisible to the src scans of rows T, A and B; R2 COMMENTS - a src comment naming the leaf, the selector or the
 * row key is not read; R3 ECHOED-SELECTION - the probe rule reads one reply's shape, so a reply that states selection without
 * narrowing its rows reads served (the projection rule's foreign-row check of B3 is the backstop); R4 NOT-FOUND-SPELLING - the
 * not-found typing reads the producer code's _NOT_FOUND suffix, and the landed unknown-instance code is unspecified at the pin
 * ("unknown id exit 3 ..."), so an exit-3 code without that suffix reads refused; R5 CATEGORY-BY-MESSAGE - Pi's capability
 * errors have no not-found category: the reader types an rf refusal 'unavailable' and carries the producer's not-found code
 * only in its message; R6 DESCRIPTOR-ID - row T's descriptor scan reads descriptor text for the leaf, the selector and the row
 * key, so a registration under another id whose text names none of them is not caught (A4 asks for the leaf by the
 * reactivefiber.<leaf> id convention of wb-a9l2.7); R7 UNRESOLVED-BINDING - an element named by an import, a let or var, a
 * parameter, or a name the module binds otherwise than by const declarations of one string is not resolved, so "context"
 * followed by an imported verb names no context show; R8 SELECTION-ALIAS - selection.matched read through a binding of the
 * selection object under another name, or through a key that is neither a literal nor a same-module const string, is not
 * read by B2; R9 COORDINATED - a member this cut adds that neither the landed record nor the follow-up title names is held by
 * the roster alone, so removing it from this file and the roster together reads clean; R10 COMPOSED-FRAGMENT - a const array
 * composed outside an array spread (concat, push, a call) is judged where it is written, so A3 may name a render-count for the
 * fragment while T4 holds the verdict.
 * SCOPE: the three rules are this cut's reading of the filing; the producer facts above are measured at the builds named and
 * are not re-read here (the census is hermetic: no rf runs, the stand-in rf answers from the roster). docs are not read: the
 * acceptance clauses name the argv builder, the projection and the exit-3 typing. A later cut that adds a context show reader
 * flips row T, re-measures the probe from a build that serves the selector and brings its receipt.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, git's listing and the bead export
 * are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type InvocationContext } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { nativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-context-show-instance-roster.json");
const BEAD_EXPORT = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-pfxo.9";

const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PREFIX = "reactivefiber.";
const SHOW_LEAF = "context.show";
/** The capability id the leaf would register under, by the reactivefiber.<leaf> convention (wb-a9l2.7 receipt rule). */
const SHOW_ID = `${RF_PREFIX}${SHOW_LEAF}`;
const SELECTOR = "--instance";
/** The row key the producer keys block rows by (context.show.json :599). */
const INSTANCE_KEY = "component_instance_id";
/** The acceptance's admitted set, as the filing spells it. */
const ADMITTED: readonly string[] = ["RENDER", "--json", "--redact", "--detail LEVEL"];
/** The levels rf 0.1.832 serves for --detail (the measured usage line). */
const LEVELS: readonly string[] = ["compact", "full"];
const GATING = "rfc-vg54d.2";
const MILESTONE = "CASM-M3a";
const PARSER_SITE = "parser.py:2220";
const SELECTOR_SITES = "component.state.show/reset";
const SOURCE_LOCATOR = "BEADS-2026-10-21.md:21@6a251bf73af5";
/** The two component instances of the measured committed render; the projection asks for the second. */
const REQUESTED = "demo.notes:notes";
const SIBLING = "demo.aside:aside";
/** src holds 115 modules at base f021f8e; the floor sits below it, so an emptied walk reds and an additive one does not. */
const SRC_FLOOR = 100;
/** The native registration holds four descriptors at base f021f8e; the floor is that count, so a dropped one reds. */
const NATIVE_FLOOR = 4;
/** The bead export holds 690 rows at base f021f8e. */
const EXPORT_FLOOR = 500;
/** A context show spelling inside one string: the two words joined directly or by white space, ".", "_" or "-". */
const SHOW_TEXT = /\bcontext[\s._-]*show\b/i;
/** The follow-up bead whose title names the gate probes this cut cures. */
const FOLLOW_UP = "wb-7uzc";
/** rf's flag globals, accepted between "context" and "show": CLI-A25 GLOBAL_OPTIONS less its value-taking members, then
 * VERBOSE_FLAGS (parser.py:250-260 and :277 at 6a251bf73af5; JSON_FLAG is "--json" at registry.py:187). -v also repeats. */
const GLOBAL_FLAGS: readonly string[] = ["--json", "--no-input", "--yes", "--debug", "--no-retry", "-v", "--verbose"];
/** The value-taking globals (RF_VALUE_OPTIONS, parser.py:286): each consumes its value, spaced or after "=". */
const GLOBAL_VALUES: readonly string[] = ["--workspace", "--actor", "--color"];
/** The named residuals, by their row R pin. */
const RESIDUALS: Readonly<Record<string, string>> = {
  R1: "RUNTIME-COMPOSED",
  R2: "COMMENTS",
  R3: "ECHOED-SELECTION",
  R4: "NOT-FOUND-SPELLING",
  R5: "CATEGORY-BY-MESSAGE",
  R6: "DESCRIPTOR-ID",
  R7: "UNRESOLVED-BINDING",
  R8: "SELECTION-ALIAS",
  R9: "COORDINATED",
  R10: "COMPOSED-FRAGMENT",
};
/** The landing-285 gate probes this cut cures, each bound to the pin that pins its cured reading. */
const CURES: Readonly<Record<string, string>> = { G13: "MS8", G13b: "MS9", G38: "MS10", G39: "MS11", P41: "MS12", G20: "MS13", G21: "MS14", "X-NOTFOUND-ANYEXIT": "MJ5" };
/** Where the landed cut's delivery note (in the wb-pfxo.9 export row) states its frozen shape, its pins and its residuals. */
const LANDED_SHAPE_MARK = "FROZEN SHAPE (rule 16) literal [";
const LANDED_PINS_MARK = "44 tests = the judged set + 43 pins: ";
const LANDED_PINS_END = ") and its out-of-file roster";
const LANDED_RESIDUALS_MARK = "RESIDUALS (named, each with a pinned quiet row in row R): ";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: "the trigger has not fired: Pi's one rf reader spawns noncommitted context render only, refuses a committed render and a context.show reply, and no src module or descriptor names a context show reader",
    pins: ["T1", "T2", "T3", "T4", "T5"],
  },
  {
    id: "A",
    label: "(a) capability pin: the context.show argv builder admits only {RENDER, --json, --redact, --detail LEVEL} until a served-leaf probe shows --instance; an earlier --instance request is refused typed 'unavailable', zero rf spawns",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) on landing: a fixture with selection.matched == 1 surfaces only that instance's block rows (every component_instance_id equals the requested id), never the whole envelope",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) unknown-id fixture (exit 3): typed not-found, never a re-read of the full envelope",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-pfxo.9 in the tracked bead export carries every pinned constant, names exactly the clauses rows A-C cover and states each of their labels as its clause",
    pins: ["F1"],
  },
  {
    id: "M",
    label: "the probe rule, the argv rule, the projection rule and the src scanner judge their pinned inputs in order",
    pins: [
      "MP1",
      "MP2",
      "MP3",
      "MA1",
      "MA2",
      "MA3",
      "MA4",
      "MA5",
      "MA6",
      "MA7",
      "MJ1",
      "MJ2",
      "MJ3",
      "MJ4",
      "MJ5",
      "MS1",
      "MS2",
      "MS3",
      "MS4",
      "MS5",
      "MS6",
      "MS7",
      "MS8",
      "MS9",
      "MS10",
      "MS11",
      "MS12",
      "MS13",
      "MS14",
      "MS15",
      "MS16",
      "MG1",
    ],
  },
  {
    id: "R",
    label: "the named residuals R1-R10 keep their pinned readings",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"],
  },
];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
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
interface MeasuredReply {
  readonly argv: readonly string[];
  readonly exit: number;
  readonly envelope: Json;
}
interface InterleavedReply {
  readonly argv: readonly string[];
  readonly exit: number;
  readonly command: string;
  readonly code: string;
  readonly message: string;
}
type ReplyName = "probe" | "show" | "unknown" | "renderRefusal";
const REPLY_NAMES: readonly ReplyName[] = ["probe", "show", "unknown", "renderRefusal"];
interface Measured {
  readonly build: string;
  readonly usage: string;
  readonly replies: Readonly<Record<ReplyName, MeasuredReply>>;
  /** The committed render's own fields, as rf 0.1.832 stated them. */
  readonly committed: { readonly render_id: string; readonly ephemeral: boolean; readonly commit_seq: number };
  /** The producer lines that state rf's globals, vendored verbatim with their sites (the follow-up seat's reading). */
  readonly globals: readonly { readonly site: string; readonly text: string }[];
  /** The follow-up seat's interleaving measurement: each argv with its exit, command and first diagnostic. */
  readonly interleaved: { readonly build: string; readonly commit: string; readonly replies: readonly InterleavedReply[] };
}
interface Roster {
  readonly constants: Json;
  readonly measured: Measured;
  readonly rows: readonly RosterRow[];
  readonly residuals: Readonly<Record<string, string>>;
  readonly cures: Readonly<Record<string, string>>;
  /** Every registered test title of this file, in order. */
  readonly tests: readonly string[];
  /** Each pin's end with its pinned assertion count, in row order. */
  readonly reached: readonly string[];
}

function readReply(measured: { [key: string]: unknown }, name: ReplyName): MeasuredReply {
  const entry = measured[name];
  if (!isObject(entry) || !Array.isArray(entry.argv) || !entry.argv.every(item => typeof item === "string") || typeof entry.exit !== "number" || !Object.hasOwn(entry, "envelope")) {
    throw new Error(`roster measured.${name} needs a string argv, an exit and an envelope`);
  }
  return { argv: entry.argv.map(String), exit: entry.exit, envelope: JSON.parse(JSON.stringify(entry.envelope)) as Json };
}

function readStrings(value: unknown, name: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${name} must be a list of strings`);
  return value.map(String);
}
function readTable(value: unknown, name: string): Record<string, string> {
  if (!isObject(value) || !Object.values(value).every(item => typeof item === "string")) throw new Error(`roster ${name} must map names to strings`);
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, String(item)]));
}
function readGlobals(value: unknown): Measured["globals"] {
  if (!Array.isArray(value)) throw new Error("roster measured.globals must list the vendored producer lines");
  return value.map((entry: unknown, index: number) => {
    if (!isObject(entry) || typeof entry.site !== "string" || typeof entry.text !== "string") throw new Error(`roster measured.globals[${index}] needs a site and a text`);
    return { site: entry.site, text: entry.text };
  });
}
function readInterleaved(value: unknown): Measured["interleaved"] {
  if (!isObject(value) || typeof value.build !== "string" || typeof value.commit !== "string" || !Array.isArray(value.replies)) {
    throw new Error("roster measured.interleaved needs a build, a commit and a replies list");
  }
  const replies = value.replies.map((entry: unknown, index: number): InterleavedReply => {
    if (!isObject(entry) || typeof entry.exit !== "number" || typeof entry.command !== "string" || typeof entry.code !== "string" || typeof entry.message !== "string") {
      throw new Error(`roster measured.interleaved.replies[${index}] needs an argv, an exit, a command, a code and a message`);
    }
    return { argv: readStrings(entry.argv, `measured.interleaved.replies[${index}].argv`), exit: entry.exit, command: entry.command, code: entry.code, message: entry.message };
  });
  return { build: value.build, commit: value.commit, replies };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Object.hasOwn(raw, "constants") || !isObject(raw.measured)) {
    throw new Error("roster must be an object with constants, a measured block and a rows list");
  }
  const measured = raw.measured;
  const rf = measured.rf;
  const committed = isObject(measured.committedRender) ? measured.committedRender.fields : undefined;
  if (!isObject(rf) || typeof rf.build !== "string" || typeof measured.usage !== "string") {
    throw new Error("roster measured needs rf.build and the usage line");
  }
  if (!isObject(committed) || typeof committed.render_id !== "string" || typeof committed.ephemeral !== "boolean" || typeof committed.commit_seq !== "number") {
    throw new Error("roster measured.committedRender.fields needs render_id, ephemeral and commit_seq");
  }
  const replies = Object.fromEntries(REPLY_NAMES.map(name => [name, readReply(measured, name)])) as Record<ReplyName, MeasuredReply>;
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    constants: JSON.parse(JSON.stringify(raw.constants)) as Json,
    measured: {
      build: rf.build,
      usage: measured.usage,
      replies,
      committed: { render_id: committed.render_id, ephemeral: committed.ephemeral, commit_seq: committed.commit_seq },
      globals: readGlobals(measured.globals),
      interleaved: readInterleaved(measured.interleaved),
    },
    rows,
    residuals: readTable(raw.residuals, "residuals"),
    cures: readTable(raw.cures, "cures"),
    tests: readStrings(raw.tests, "tests"),
    reached: readStrings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();
const MEASURED = ROSTER.measured;

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The constants the roster pins beside the rows. */
function constants(): Json {
  return {
    bead: BEAD,
    previewId: PREVIEW_ID,
    showLeaf: SHOW_LEAF,
    showId: SHOW_ID,
    selector: SELECTOR,
    instanceKey: INSTANCE_KEY,
    admitted: [...ADMITTED],
    levels: [...LEVELS],
    gating: GATING,
    milestone: MILESTONE,
    parserSite: PARSER_SITE,
    selectorSites: SELECTOR_SITES,
    sourceLocator: SOURCE_LOCATOR,
    requested: REQUESTED,
    sibling: SIBLING,
    floors: { src: SRC_FLOOR, native: NATIVE_FLOOR, export: EXPORT_FLOOR },
    followUp: FOLLOW_UP,
    globals: { flags: [...GLOBAL_FLAGS], values: [...GLOBAL_VALUES] },
  };
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
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
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every object key path of a value, arrays read as "[]". */
function keyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) return value.flatMap(item => keyPaths(item, `${prefix}[]`));
  if (!isObject(value)) return [];
  return Object.entries(value).flatMap(([key, item]) => {
    const path = prefix === "" ? key : `${prefix}.${key}`;
    return [path, ...keyPaths(item, path)];
  });
}
const digestOf = (texts: readonly string[]): string => createHash("sha256").update(JSON.stringify(texts)).digest("hex").slice(0, 16);

// ---- the src scanner (rows T, A and B) ----

interface ShowArgv {
  readonly at: string;
  /** The elements after "show": a string's text, or null for any element the scanner does not resolve. */
  readonly tail: readonly (string | null)[];
}
interface Scan {
  readonly showArgv: readonly ShowArgv[];
  readonly renderArgv: number;
  readonly showLiterals: readonly string[];
  readonly selectorLiterals: readonly string[];
  readonly instanceReads: readonly string[];
}
type Word = string | null;
/** How one declaration binds a name: a const of one string literal, a const of one array literal, or anything else. */
type Binding = { readonly kind: "string"; readonly text: string } | { readonly kind: "array"; readonly node: ts.ArrayLiteralExpression } | { readonly kind: "other" };
interface Bindings {
  /** The names the module binds only by const declarations of one and the same string literal. */
  readonly strings: ReadonlyMap<string, string>;
  /** The names the module binds exactly once, by a const declaration of an array literal. */
  readonly arrays: ReadonlyMap<string, ts.ArrayLiteralExpression>;
}

/** An expression without the parentheses, non-null and type assertions that leave its value as written. */
function bare(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current) || ts.isTypeAssertionExpression(current) || ts.isSatisfiesExpression(current)) {
    current = current.expression;
  }
  return current;
}
/** Every name the module binds, in any scope, and how; only the const string and const array bindings resolve. */
function bindingsOf(source: ts.SourceFile): Bindings {
  const seen = new Map<string, Binding[]>();
  const record = (name: ts.Node | undefined, binding: Binding): void => {
    if (name !== undefined && ts.isIdentifier(name)) seen.set(name.text, [...(seen.get(name.text) ?? []), binding]);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node)) {
      const constant = ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0;
      const value = node.initializer === undefined ? undefined : bare(node.initializer);
      if (constant && value !== undefined && ts.isStringLiteralLike(value)) record(node.name, { kind: "string", text: value.text });
      else if (constant && value !== undefined && ts.isArrayLiteralExpression(value)) record(node.name, { kind: "array", node: value });
      else record(node.name, { kind: "other" });
    } else if (ts.isParameter(node) || ts.isBindingElement(node) || ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) {
      record(node.name, { kind: "other" });
    } else if (ts.isImportSpecifier(node) || ts.isNamespaceImport(node) || ts.isImportEqualsDeclaration(node) || ts.isImportClause(node)) {
      record(node.name, { kind: "other" });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  const strings = new Map<string, string>();
  const arrays = new Map<string, ts.ArrayLiteralExpression>();
  for (const [name, bound] of seen) {
    const first = bound[0];
    const text = first?.kind === "string" ? first.text : undefined;
    if (text !== undefined && bound.every(binding => binding.kind === "string" && binding.text === text)) strings.set(name, text);
    if (first?.kind === "array" && bound.length === 1) arrays.set(name, first.node);
  }
  return { strings, arrays };
}
/** One argv element's words: a string's text, a same-module const string, or the members of a spread array literal or
 * const array (a name is spread once per path); null for anything else. */
function wordsOf(element: ts.Expression, bindings: Bindings, spreading: ReadonlySet<string> = new Set()): Word[] {
  if (ts.isSpreadElement(element)) {
    const inner = bare(element.expression);
    if (ts.isArrayLiteralExpression(inner)) return inner.elements.flatMap(item => wordsOf(item, bindings, spreading));
    if (ts.isIdentifier(inner) && !spreading.has(inner.text)) {
      const bound = bindings.arrays.get(inner.text);
      if (bound !== undefined) return bound.elements.flatMap(item => wordsOf(item, bindings, new Set([...spreading, inner.text])));
    }
    return [null];
  }
  const value = bare(element);
  if (ts.isStringLiteralLike(value)) return [value.text];
  if (ts.isIdentifier(value)) return [bindings.strings.get(value.text) ?? null];
  return [null];
}
/** The array literals judged inside another array: a spread array literal, and a same-module const array spread by name. */
function fragmentsOf(source: ts.SourceFile, bindings: Bindings): Set<ts.Node> {
  const fragments = new Set<ts.Node>();
  const visit = (node: ts.Node): void => {
    if (ts.isSpreadElement(node) && ts.isArrayLiteralExpression(node.parent)) {
      const inner = bare(node.expression);
      const bound = ts.isIdentifier(inner) ? bindings.arrays.get(inner.text) : undefined;
      if (ts.isArrayLiteralExpression(inner)) fragments.add(inner);
      else if (bound !== undefined) fragments.add(bound);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return fragments;
}
/** A flag global (-v repeated too) or a value global's --opt=VALUE spelling: one word of the run. */
const globalWord = (word: string): boolean => GLOBAL_FLAGS.includes(word) || /^-v+$/.test(word) || GLOBAL_VALUES.some(option => word.startsWith(`${option}=`));
/** The words after "context" VERB when an argv names it: "context", then any run of rf's globals (a flag global, a value
 * global and its value, a --global=VALUE spelling, an unresolved element), then VERB; undefined when it names none. */
function verbTail(words: readonly Word[], verb: string): Word[] | undefined {
  for (let start = 0; start < words.length; start++) {
    if (words[start] !== "context") continue;
    let at = start + 1;
    while (at < words.length) {
      const word = words[at];
      if (word === null || globalWord(word)) at += 1;
      else if (GLOBAL_VALUES.includes(word)) at += 2;
      else break;
    }
    if (words[at] === verb) return words.slice(at + 1);
  }
  return undefined;
}
/** The literal key of a property access or of an element access (a string literal or a same-module const string). */
function accessKey(node: ts.Node, bindings: Bindings): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (!ts.isElementAccessExpression(node)) return undefined;
  const key = bare(node.argumentExpression);
  if (ts.isStringLiteralLike(key)) return key.text;
  return ts.isIdentifier(key) ? bindings.strings.get(key.text) : undefined;
}
/** A selection receiver: an access keyed selection, or a binding named selection. */
function isSelection(node: ts.Expression, bindings: Bindings): boolean {
  const value = bare(node);
  return accessKey(value, bindings) === "selection" || (ts.isIdentifier(value) && value.text === "selection");
}
/** The literal key one destructuring element binds. */
function bindingKey(element: ts.BindingElement, bindings: Bindings): string | undefined {
  const key = element.propertyName ?? element.name;
  if (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) return key.text;
  if (!ts.isComputedPropertyName(key)) return undefined;
  const inner = bare(key.expression);
  if (ts.isStringLiteralLike(inner)) return inner.text;
  return ts.isIdentifier(inner) ? bindings.strings.get(inner.text) : undefined;
}
/** A read of selection.matched: one access chain on a selection receiver, or a destructuring that binds matched under a
 * selection key or from a selection receiver. */
function readsSelectionMatched(node: ts.Node, bindings: Bindings): boolean {
  if ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) && accessKey(node, bindings) === "matched") return isSelection(node.expression, bindings);
  if (!ts.isBindingElement(node) || bindingKey(node, bindings) !== "matched" || !ts.isObjectBindingPattern(node.parent)) return false;
  const holder = node.parent.parent;
  if (ts.isBindingElement(holder)) return bindingKey(holder, bindings) === "selection";
  return ts.isVariableDeclaration(holder) && holder.initializer !== undefined && isSelection(holder.initializer, bindings);
}
/** One module's context show argv arrays, its context render argv count and its literals or names reaching the selector. */
function scanSource(fileName: string, text: string): Scan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const bindings = bindingsOf(source);
  const fragments = fragmentsOf(source, bindings);
  const showArgv: ShowArgv[] = [];
  const showLiterals: string[] = [];
  const selectorLiterals: string[] = [];
  const instanceReads: string[] = [];
  let renderArgv = 0;
  const at = (node: ts.Node): string => `${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node) && !fragments.has(node)) {
      const words = node.elements.flatMap(element => wordsOf(element, bindings));
      const tail = verbTail(words, "show");
      if (tail !== undefined) showArgv.push({ at: at(node), tail });
      if (verbTail(words, "render") !== undefined) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node)) {
      if (SHOW_TEXT.test(node.text)) showLiterals.push(at(node));
      if (node.text.includes(SELECTOR)) selectorLiterals.push(at(node));
      if (node.text === INSTANCE_KEY) instanceReads.push(`${at(node)} "${INSTANCE_KEY}"`);
    }
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (SHOW_TEXT.test(parts)) showLiterals.push(at(node));
      if (parts.includes(SELECTOR)) selectorLiterals.push(at(node));
    }
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && node.text === INSTANCE_KEY) instanceReads.push(`${at(node)} ${INSTANCE_KEY}`);
    if (readsSelectionMatched(node, bindings)) instanceReads.push(`${at(node)} selection.matched`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { showArgv, renderArgv, showLiterals, selectorLiterals, instanceReads };
}

let srcCache: { files: number; walked: string[]; scans: Scan[] } | undefined;
/** Every src module scanned once. */
function srcScans(): { files: number; walked: string[]; scans: Scan[] } {
  if (srcCache === undefined) {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    srcCache = { files: files.length, walked: files.map(file => relative(REPO, file)), scans: files.map(file => scanSource(relative(REPO, file), textOf(file))) };
  }
  return srcCache;
}
let listedCache: string[] | undefined;
/** git's listing of the src .ts modules - the tracked files and the untracked ones git does not ignore - present on disk. */
function listedSrc(): string[] {
  listedCache ??= execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src"], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path.endsWith(".ts") && existsSync(join(REPO, path)));
  return listedCache;
}
/** The src walk's floor, its breadth (no module git lists goes unread) and its non-vacuity: it reached the live context
 * render argv of the rf reader. */
function srcWalk(): { srcFloorMet: boolean; renderArgvSeen: boolean; unread: string[] } {
  const { files, walked, scans } = srcScans();
  const unread = listedSrc()
    .filter(path => !walked.includes(path))
    .sort();
  const walk = { srcFloorMet: files >= SRC_FLOOR, renderArgvSeen: scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1, unread };
  expect(walk, `src modules walked: ${files}, floor ${SRC_FLOOR}`).toStrictEqual({ srcFloorMet: true, renderArgvSeen: true, unread: [] });
  return walk;
}

// ---- the three rules (READINGS) ----

function firstDiagnostic(reply: { [key: string]: unknown }): { [key: string]: unknown } | undefined {
  const first = Array.isArray(reply.diagnostics) ? reply.diagnostics[0] : undefined;
  return isObject(first) ? first : undefined;
}
function primaryCode(reply: { [key: string]: unknown }): string {
  const code = firstDiagnostic(reply)?.code;
  return typeof code === "string" ? code : "none";
}

interface ProbeReading {
  readonly served: boolean;
  readonly reason: string;
}
/** PROBE RULE: whether a reply to `context show RENDER --instance ID --json` shows the selector served. */
function probeReading(reply: Json): ProbeReading {
  if (!isObject(reply) || reply.command !== SHOW_LEAF) return { served: false, reason: "wrong-command" };
  if (reply.ok !== true) return { served: false, reason: `refused:${primaryCode(reply)}` };
  const selection = isObject(reply.result) ? reply.result.selection : undefined;
  if (!isObject(selection) || !Number.isSafeInteger(selection.matched)) return { served: false, reason: "no-selection" };
  return { served: true, reason: "served" };
}

/** ARGV RULE: the findings of one context show argv's elements after "show". */
function argvFindings(tail: readonly (string | null)[], served: boolean): string[] {
  const findings: string[] = [];
  let renders = 0;
  for (let index = 0; index < tail.length; index++) {
    const element: string | null | undefined = tail[index];
    if (element === undefined) continue;
    if (element === null || !element.startsWith("-")) {
      renders += 1;
      continue;
    }
    if (element === "--json" || element === "--redact") continue;
    if (element === "--detail") {
      const level: string | null | undefined = tail[index + 1];
      if (level === undefined) findings.push("level:missing");
      else if (level !== null && !LEVELS.includes(level)) findings.push(`level:${level}`);
      index += 1;
      continue;
    }
    if (element === SELECTOR) {
      if (!served) findings.push("instance-unserved");
      index += 1;
      continue;
    }
    findings.push(`outside-admitted:${element}`);
  }
  if (renders !== 1) findings.push(`render-count:${renders}`);
  return findings;
}

interface Projection {
  readonly kind: "projected" | "not-found" | "refused" | "unavailable";
  readonly reason: string;
  readonly rows: readonly Json[];
}
/** PROJECTION RULE: the rows a context show reply may surface for one requested instance, or why it surfaces none. */
function project(reply: Json, exit: number, requested: string): Projection {
  if (!isObject(reply) || reply.command !== SHOW_LEAF) return { kind: "refused", reason: "wrong-command", rows: [] };
  if (reply.ok !== true) {
    const code = primaryCode(reply);
    if (exit === 3 && /_NOT_FOUND$/.test(code)) return { kind: "not-found", reason: code, rows: [] };
    return { kind: "refused", reason: `exit-${exit}:${code}`, rows: [] };
  }
  if (exit !== 0) return { kind: "refused", reason: `exit-${exit}`, rows: [] };
  const result = isObject(reply.result) ? reply.result : {};
  if (!Object.hasOwn(result, "selection")) return { kind: "unavailable", reason: "selector-unserved", rows: [] };
  const matched = isObject(result.selection) ? result.selection.matched : undefined;
  if (matched !== 1) return { kind: "refused", reason: `matched-${String(matched)}`, rows: [] };
  const blocks = Array.isArray(result.blocks) ? (JSON.parse(JSON.stringify(result.blocks)) as Json[]) : [];
  const foreign = blocks.map(block => (isObject(block) ? block[INSTANCE_KEY] : undefined)).filter(id => id !== requested);
  if (foreign.length > 0) return { kind: "refused", reason: `foreign-row:${String(foreign[0])}`, rows: [] };
  return { kind: "projected", reason: "matched-1", rows: blocks };
}
function summary(projection: Projection): Json {
  return {
    kind: projection.kind,
    reason: projection.reason,
    rows: projection.rows.length,
    ids: projection.rows.map(row => (isObject(row) && typeof row[INSTANCE_KEY] === "string" ? row[INSTANCE_KEY] : "<none>")),
  };
}

/** The measured reply's block rows. */
function blocksOf(reply: Json): Json[] {
  const result = isObject(reply) && isObject(reply.result) ? reply.result : {};
  return Array.isArray(result.blocks) ? (JSON.parse(JSON.stringify(result.blocks)) as Json[]) : [];
}
/** The landed CASM-M3a shape built from a measured reply: result.selection.matched 1, and the rows narrowed to the requested
 * instance when `narrow` (BEADS-2026-10-21.md:21: "only that instance's blocks and selection.matched 1"). */
function landed(reply: Json, narrow: boolean): Json {
  const copy = JSON.parse(JSON.stringify(reply)) as Json;
  if (!isObject(copy) || !isObject(copy.result)) throw new Error("the measured show reply has no result object");
  const rows = blocksOf(reply);
  return {
    ...(copy as { [key: string]: Json }),
    result: {
      ...(copy.result as { [key: string]: Json }),
      selection: { matched: 1 },
      blocks: narrow ? rows.filter(row => isObject(row) && row[INSTANCE_KEY] === REQUESTED) : rows,
    },
  };
}
/** A constructed rf reply for the matcher and residual rows. */
function reply(command: string, ok: boolean, result: Json, code?: string): Json {
  return {
    schema: "reactive-fiber.cli/v1",
    ok,
    command,
    operation_id: `rfo_${"a".repeat(22)}`,
    workspace: null,
    transaction_id: null,
    result: ok ? result : null,
    diagnostics: code === undefined ? [] : [{ code, severity: "error", message: "constructed", hint: null, source: "host", metadata: {} }],
  };
}

/** The descriptor-text reading of row T: whether a descriptor's JSON names the leaf, the selector or the row key. */
function descriptorHits(text: string): string[] {
  return [SHOW_TEXT.test(text) ? "leaf" : "", text.includes(SELECTOR) ? "selector" : "", text.includes(INSTANCE_KEY) ? "row-key" : ""].filter(Boolean);
}

let nativeCache: Promise<{ id: string; text: string }[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<{ id: string; text: string }[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, text: JSON.stringify(entry.descriptor) }));
  });
  return nativeCache;
}
/** The injected registration's descriptors; its reader is never invoked here. */
function injectedDescriptors(): { id: string; text: string }[] {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(
    registry,
    async () => {
      throw new Error("the injected reader is never invoked here");
    },
    ROOT,
  );
  return registry.catalogSnapshot().map(entry => ({ id: entry.descriptor.id, text: JSON.stringify(entry.descriptor) }));
}

// ---- the stand-in rf (rows T, A, C and R) ----

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits
 * with `code`. */
function standInRf(envelope: unknown, code: number): string {
  const folder = makeScratch("rf-context-show-instance-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(${code});\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => (JSON.parse(line) as string[]).map(item => (item === ROOT ? "<root>" : item)));
}
async function refusalOf(run: () => Promise<unknown>): Promise<{ category: string; message: string }> {
  try {
    await run();
  } catch (error) {
    if (error instanceof CapabilityError) return { category: error.category, message: error.message };
    return { category: "thrown", message: error instanceof Error ? error.message : String(error) };
  }
  return { category: "none", message: "resolved" };
}
/** One read through Pi's rf reader against a stand-in answering `envelope` at `code`: its refusal and the spawns it made. */
async function readThrough(envelope: unknown, code: number): Promise<{ refusal: { category: string; message: string }; spawns: number }> {
  const log = standInRf(envelope, code);
  const refusal = await refusalOf(() => nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT));
  return { refusal, spawns: spawnsOf(log).length };
}

// ---- the matcher and residual cases (rows M and R) ----

type Case =
  | { readonly pin: string; readonly kind: "probe"; readonly reply: Json; readonly outcome: Json }
  | { readonly pin: string; readonly kind: "argv"; readonly tail: readonly (string | null)[]; readonly served: boolean; readonly outcome: Json }
  | { readonly pin: string; readonly kind: "project"; readonly reply: Json; readonly exit: number; readonly outcome: Json }
  | { readonly pin: string; readonly kind: "scan"; readonly text: string; readonly outcome: Json }
  | { readonly pin: string; readonly kind: "descriptor"; readonly text: string; readonly outcome: Json };

const QUIET_SCAN: Json = { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 };
const CASES: readonly Case[] = [
  { pin: "MP1", kind: "probe", reply: reply(SHOW_LEAF, true, { selection: { matched: 1 }, blocks: [] }), outcome: { served: true, reason: "served" } },
  { pin: "MP2", kind: "probe", reply: reply(SHOW_LEAF, true, { blocks: [] }), outcome: { served: false, reason: "no-selection" } },
  { pin: "MP3", kind: "probe", reply: reply("component.state.show", true, { selection: { matched: 1 } }), outcome: { served: false, reason: "wrong-command" } },
  { pin: "MA1", kind: "argv", tail: [null, "--json"], served: false, outcome: [] },
  { pin: "MA2", kind: "argv", tail: [null, "--redact", "--detail", "full", "--json"], served: false, outcome: [] },
  { pin: "MA3", kind: "argv", tail: [null, SELECTOR, null, "--json"], served: false, outcome: ["instance-unserved"] },
  { pin: "MA4", kind: "argv", tail: [null, SELECTOR, null, "--json"], served: true, outcome: [] },
  { pin: "MA5", kind: "argv", tail: [null, "--format", "json"], served: false, outcome: ["outside-admitted:--format", "render-count:2"] },
  { pin: "MA6", kind: "argv", tail: ["--json"], served: false, outcome: ["render-count:0"] },
  { pin: "MA7", kind: "argv", tail: [null, "--detail", "verbose", "--json"], served: false, outcome: ["level:verbose"] },
  { pin: "MJ1", kind: "project", reply: reply(SHOW_LEAF, true, { selection: { matched: 0 }, blocks: [] }), exit: 0, outcome: { kind: "refused", reason: "matched-0", rows: 0, ids: [] } },
  { pin: "MJ2", kind: "project", reply: reply(SHOW_LEAF, true, { selection: { matched: 2 }, blocks: [] }), exit: 0, outcome: { kind: "refused", reason: "matched-2", rows: 0, ids: [] } },
  { pin: "MJ3", kind: "project", reply: reply(SHOW_LEAF, false, null, "RF_USAGE_UNKNOWN_OPTION"), exit: 2, outcome: { kind: "refused", reason: "exit-2:RF_USAGE_UNKNOWN_OPTION", rows: 0, ids: [] } },
  { pin: "MJ4", kind: "project", reply: reply("context.render", true, { selection: { matched: 1 }, blocks: [] }), exit: 0, outcome: { kind: "refused", reason: "wrong-command", rows: 0, ids: [] } },
  { pin: "MJ5", kind: "project", reply: reply(SHOW_LEAF, false, null, "RF_STORAGE_NOT_FOUND"), exit: 2, outcome: { kind: "refused", reason: "exit-2:RF_STORAGE_NOT_FOUND", rows: 0, ids: [] } },
  { pin: "MS1", kind: "scan", text: 'spawn("rf", ["--workspace", w, "context", "show", r, "--json"]);', outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS2", kind: "scan", text: 'const leaf = "context.show";', outcome: { showArgv: [], renderArgv: 0, showLiterals: 1, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS3", kind: "scan", text: ["const cmd = `rf context  show $", "{r} --json`;"].join(""), outcome: { showArgv: [], renderArgv: 0, showLiterals: 1, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS4", kind: "scan", text: 'const flag = "--instance";', outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 1, instanceReads: 0 } },
  { pin: "MS5", kind: "scan", text: "const id = row.component_instance_id; const hit = reply.selection.matched;", outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 2 } },
  { pin: "MS6", kind: "scan", text: 'const argv = ["context", "render", "--no-commit"];', outcome: { showArgv: [], renderArgv: 1, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS7", kind: "scan", text: 'spawn("rf", ["context", "show", r, "--instance", i]);', outcome: { showArgv: [["instance-unserved"]], renderArgv: 0, showLiterals: 0, selectorLiterals: 1, instanceReads: 0 } },
  { pin: "MS8", kind: "scan", text: 'spawn("rf", ["context", "--json", "show", r]);', outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS9", kind: "scan", text: 'spawn("rf", ["context", "--workspace", w, "show", r, "--json"]);', outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  {
    pin: "MS10",
    kind: "scan",
    text: 'const GROUP = "context";\nconst VERB = "show";\nspawn("rf", [GROUP, VERB, r, "--json"]);',
    outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 },
  },
  { pin: "MS11", kind: "scan", text: 'const VERB = "show";\nspawn("rf", ["context", VERB, r, "--json"]);', outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  {
    pin: "MS12",
    kind: "scan",
    text: 'const RF_SHOW = ["context", "show"] as const;\nspawn("rf", [...RF_SHOW, r, "--json"]);',
    outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 },
  },
  {
    pin: "MS13",
    kind: "scan",
    text: 'const KEY = "matched";\nconst a = reply["selection"]["matched"];\nconst b = reply.selection["matched"];\nconst c = reply?.["selection"]?.matched;\nconst d = (reply.selection as Sel)!.matched;\nconst e = reply.selection[KEY];',
    outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 5 },
  },
  {
    pin: "MS14",
    kind: "scan",
    text: 'const { selection: { matched } } = result;\nconst { selection: { matched: m } } = other;\nconst { matched: n } = reply.selection;\nconst { "matched": o } = selection;\nconst p = selection.matched;',
    outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 5 },
  },
  {
    pin: "MS15",
    kind: "scan",
    text: ['spawn("rf", ["context", `--workspace=$', '{w}`, "-vv", "--color", "never", ...globals, "show", r]);'].join(""),
    outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 },
  },
  {
    pin: "MS16",
    kind: "scan",
    text: 'spawn("rf", ["context", "--redact", "show", r]);\nspawn("rf", ["context", "--format", "json", "show", r]);\nspawn("rf", ["context", "-h", "show", r]);\nspawn("rf", ["context", "render", "show", r]);',
    outcome: { showArgv: [], renderArgv: 1, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 },
  },
  { pin: "R1", kind: "scan", text: 'spawn("rf", ["con" + "text", "show", r, "--inst" + "ance", i]);', outcome: QUIET_SCAN },
  { pin: "R2", kind: "scan", text: "// rf context show RENDER --instance ID\n/* reads row.component_instance_id */\nconst quiet = 1;", outcome: QUIET_SCAN },
  {
    pin: "R3",
    kind: "probe",
    reply: reply(SHOW_LEAF, true, { selection: { matched: 1 }, blocks: [{ component_instance_id: SIBLING }, { component_instance_id: REQUESTED }] }),
    outcome: { served: true, reason: "served" },
  },
  { pin: "R4", kind: "project", reply: reply(SHOW_LEAF, false, null, "RF_INSTANCE_UNKNOWN"), exit: 3, outcome: { kind: "refused", reason: "exit-3:RF_INSTANCE_UNKNOWN", rows: 0, ids: [] } },
  { pin: "R6", kind: "descriptor", text: '{"id":"reactivefiber.instance-blocks","description":"one component instance\'s committed blocks"}', outcome: [] },
  {
    pin: "R7",
    kind: "scan",
    text: 'import { VERB } from "./rf-verbs.js";\nlet group = "context";\nconst a = ["context", VERB, r];\nconst b = [group, "show", r];\nconst c = (verb: string) => ["context", verb, r];\nfunction d() {\n  const V = "show";\n  return ["context", V, r];\n}\nfunction e() {\n  const V = "list";\n  return V;\n}',
    outcome: QUIET_SCAN,
  },
  {
    pin: "R8",
    kind: "scan",
    text: 'const sel = reply.selection;\nconst n = sel.matched;\nlet key = "matched";\nconst m = reply.selection[key];\nconst { [key]: k } = reply.selection;',
    outcome: QUIET_SCAN,
  },
  {
    pin: "R10",
    kind: "scan",
    text: 'const RF_SHOW = ["context", "show"] as const;\nspawn("rf", RF_SHOW.concat([r, "--json"]));',
    outcome: { showArgv: [["render-count:0"]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 },
  },
];

function outcomeOf(entry: Case): Json {
  if (entry.kind === "probe") return { ...probeReading(entry.reply) };
  if (entry.kind === "argv") return argvFindings(entry.tail, entry.served);
  if (entry.kind === "project") return summary(project(entry.reply, entry.exit, REQUESTED));
  if (entry.kind === "descriptor") return descriptorHits(entry.text);
  const scan = scanSource("control.ts", entry.text);
  return {
    showArgv: scan.showArgv.map(argv => argvFindings(argv.tail, false)),
    renderArgv: scan.renderArgv,
    showLiterals: scan.showLiterals.length,
    selectorLiterals: scan.selectorLiterals.length,
    instanceReads: scan.instanceReads.length,
  };
}

// ---- the outside anchors (the judged set and R9) ----

/** The tracked bead export's rows. */
function exportRows(): { [key: string]: unknown }[] {
  return textOf(BEAD_EXPORT)
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line => JSON.parse(line) as unknown)
    .filter(isObject);
}
function exportRow(id: string): { [key: string]: unknown } {
  const row = exportRows().find(entry => entry.id === id);
  if (row === undefined) throw new Error(`${id} is missing from the bead export`);
  return row;
}
/** The text between two marks; a missing mark refuses by name. */
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  const to = from < 0 ? -1 : text.indexOf(end, from + start.length);
  if (from < 0 || to < 0) throw new Error(`the bead export lacks the marks "${start}" ... "${end}"`);
  return text.slice(from + start.length, to);
}
interface Anchors {
  /** The pins the landed cut's delivery note enumerates. */
  readonly landedPins: readonly string[];
  /** The landed frozen-shape literal. */
  readonly landedShape: readonly string[];
  /** The landed residuals, by pin. */
  readonly landedResiduals: Readonly<Record<string, string>>;
  /** The gate probes the follow-up bead's title names. */
  readonly namedProbes: readonly string[];
}
/** The outside anchors: the landed record in the wb-pfxo.9 export row and the probes the wb-7uzc row's title names. */
function exportAnchors(): Anchors {
  const notes = String(exportRow(BEAD).notes ?? "");
  const landedPins = [...between(notes, LANDED_PINS_MARK, LANDED_PINS_END).matchAll(/\b([A-Z]{1,2})(\d+)(?:-\1(\d+))?\b/g)].flatMap(match => {
    const from = Number(match[2]);
    const to = match[3] === undefined ? from : Number(match[3]);
    return Array.from({ length: Math.max(0, to - from + 1) }, (_, index) => `${match[1] ?? ""}${from + index}`);
  });
  const shape: unknown = JSON.parse(`[${between(notes, LANDED_SHAPE_MARK, "]")}]`);
  const landedShape = Array.isArray(shape) ? shape.map(String) : [];
  const landedResiduals = Object.fromEntries([...between(notes, LANDED_RESIDUALS_MARK, "\n").matchAll(/\b(R\d+) ([A-Z]+(?:-[A-Z]+)*)\b/g)].map(match => [match[1] ?? "", match[2] ?? ""]));
  const namedProbes = [...String(exportRow(FOLLOW_UP).title ?? "").matchAll(/\b[GP]\d+[a-z]?\b/g)].map(match => match[0]);
  return { landedPins, landedShape, landedResiduals, namedProbes };
}
/** What the roster and the outside anchors find missing from a judged set (rows, residual names and cure bindings). */
function anchorFindings(rows: readonly Row[], residuals: Readonly<Record<string, string>>, cures: Readonly<Record<string, string>>, roster: Roster, anchors: Anchors): string[] {
  const findings: string[] = [];
  const tally = anchors.landedShape.map(entry => {
    const id = entry.split(":")[0] ?? "";
    return `${id}:${anchors.landedPins.filter(pin => pin.charAt(0) === id).length}`;
  });
  const rowOf = (pin: string): boolean => anchors.landedShape.some(entry => entry.startsWith(`${pin.charAt(0)}:`));
  if (anchors.landedPins.length === 0 || !anchors.landedPins.every(rowOf) || JSON.stringify(tally) !== JSON.stringify(anchors.landedShape)) findings.push("landed record unreadable");
  const shapes = (entries: readonly { readonly id: string; readonly label: string; readonly pins: readonly string[] }[]): string => JSON.stringify(entries.map(({ id, label, pins }) => ({ id, label, pins })));
  if (shapes(rows) !== shapes(roster.rows.map(row => ({ id: row.id, label: row.label, pins: row.pins.map(pin => pin.id) })))) findings.push("roster rows differ");
  if (JSON.stringify(residuals) !== JSON.stringify(roster.residuals)) findings.push("roster residuals differ");
  if (JSON.stringify(cures) !== JSON.stringify(roster.cures)) findings.push("roster cures differ");
  for (const pin of anchors.landedPins) if (!rows.some(row => row.id === pin.charAt(0) && row.pins.includes(pin))) findings.push(`landed pin missing: ${pin}`);
  for (const [pin, name] of Object.entries(anchors.landedResiduals)) if (residuals[pin] !== name) findings.push(`landed residual missing: ${pin} ${name}`);
  const judged = rows.flatMap(row => row.pins);
  for (const probe of anchors.namedProbes) if (!judged.includes(cures[probe] ?? "")) findings.push(`named probe unbound: ${probe}`);
  for (const [probe, pin] of Object.entries(cures)) if (!judged.includes(pin)) findings.push(`cure unbound: ${probe}`);
  return findings;
}
/** The globals the vendored producer lines state: GLOBAL_OPTIONS (JSON_FLAG resolved through its registry line) and
 * VERBOSE_FLAGS, less RF_VALUE_OPTIONS, then RF_VALUE_OPTIONS. */
function producerGlobals(): { flags: string[]; values: string[] } {
  const text = MEASURED.globals.map(line => line.text).join("\n");
  const jsonFlag = /^JSON_FLAG: Final = "([^"]+)"$/m.exec(text)?.[1] ?? "<unresolved JSON_FLAG>";
  const tuple = (name: string): string[] => {
    const body = new RegExp(`^${name}: Final\\[.*\\] = \\(([^)]*)\\)`, "m").exec(text)?.[1] ?? "";
    return [...body.matchAll(/"([^"]+)"|\bJSON_FLAG\b/g)].map(match => match[1] ?? jsonFlag);
  };
  const values = tuple("RF_VALUE_OPTIONS");
  return { flags: [...tuple("GLOBAL_OPTIONS"), ...tuple("VERBOSE_FLAGS")].filter(option => !values.includes(option)), values };
}

const UNAVAILABLE_SHOW = { category: "unavailable", message: `Unknown or unavailable capability: ${SHOW_ID}.` };
const INVALID_INPUT = { category: "validation", message: `Invalid input schema for capability ${PREVIEW_ID}.` };
const UNRECOGNIZED = { category: "transport", message: "RF preview returned an unrecognized native envelope." };

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  T1: async () => {
    const legacyLog = standInRf(fullShapeRf(ROOT), 0);
    await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT);
    const legacy = spawnsOf(legacyLog);
    const viewLog = standInRf(fullShapeRf(ROOT), 0);
    await nativeReactiveFiberRender({ view: "v", taskId: "t", model: "m" }, ROOT);
    const view = spawnsOf(viewLog);
    const reading = [...legacy, ...view].map(argv => ({ verb: argv.slice(2, 4).join(" "), noCommit: argv.includes("--no-commit"), show: argv.includes("show") }));
    const expected = { verb: "context render", noCommit: true, show: false };
    expect({ spawns: [legacy.length, view.length], reading }).toStrictEqual({ spawns: [1, 1], reading: [expected, expected] });
    return { legacy, view };
  },
  T2: async () => {
    const control = await readThrough(fullShapeRf(ROOT), 0);
    const base = fullShapeRf(ROOT);
    const committed = await readThrough({ ...base, result: { ...(base.result as { [key: string]: Json }), ...MEASURED.committed } }, 0);
    expect({ control, committed }).toStrictEqual({
      control: { refusal: { category: "none", message: "resolved" }, spawns: 1 },
      committed: { refusal: { category: "transport", message: "RF preview returned an unrecognized or contradictory envelope." }, spawns: 1 },
    });
    return { fields: { ...MEASURED.committed }, control, committed };
  },
  T3: async () => {
    const show = MEASURED.replies.show;
    const reading = await readThrough(show.envelope, show.exit);
    expect(reading).toStrictEqual({ refusal: UNRECOGNIZED, spawns: 1 });
    return { command: isObject(show.envelope) ? String(show.envelope.command) : "<none>", exit: show.exit, ...reading };
  },
  T4: async () => {
    const walk = srcWalk();
    const { scans } = srcScans();
    const showArgv = scans.flatMap(scan => scan.showArgv.map(argv => argv.at));
    const showLiterals = scans.flatMap(scan => scan.showLiterals);
    expect({ showArgv, showLiterals }, "a src context show argv or literal").toStrictEqual({ showArgv: [], showLiterals: [] });
    return { ...walk, showArgv, showLiterals };
  },
  T5: async () => {
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const rf = (descriptors: readonly { id: string }[]): string[] => descriptors.filter(descriptor => descriptor.id.startsWith(RF_PREFIX)).map(descriptor => descriptor.id);
    const hits = [...native, ...injected].filter(descriptor => descriptorHits(descriptor.text).length > 0).map(descriptor => descriptor.id);
    const reading = { nativeFloorMet: native.length >= NATIVE_FLOOR, native: rf(native), injected: rf(injected), hits };
    expect(reading, `native descriptors: ${native.length}`).toStrictEqual({ nativeFloorMet: true, native: [PREVIEW_ID], injected: [PREVIEW_ID], hits: [] });
    return reading;
  },
  A1: async () => {
    const usage = MEASURED.usage;
    const groups = [...usage.matchAll(/\[([^\]]+)\]/g)].map(match => match[1] ?? "");
    const flags = groups.map(group => group.split(/\s+/)[0] ?? "");
    const positionals = usage
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/^usage:\s+rf\s+context\s+show\s*/, "")
      .split(/\s+/)
      .filter(Boolean);
    const detail = groups.find(group => group.startsWith("--detail "));
    const detailLevels = /\{([^}]*)\}/.exec(detail ?? "")?.[1]?.split(",") ?? [];
    const servedSet = [...positionals, ...flags];
    const admittedServed = ADMITTED.map(element => element.split(" ")[0] ?? "").filter(element => servedSet.includes(element));
    const reading = {
      build: MEASURED.build,
      leaf: /^usage:\s+rf\s+context\s+show\b/.test(usage),
      positionals,
      flags,
      detailLevels,
      admittedServed,
      instanceInUsage: usage.includes(SELECTOR),
    };
    expect({ leaf: reading.leaf, admittedServed, detailLevels, instanceInUsage: reading.instanceInUsage }).toStrictEqual({
      leaf: true,
      admittedServed: ADMITTED.map(element => element.split(" ")[0] ?? ""),
      detailLevels: [...LEVELS],
      instanceInUsage: false,
    });
    return reading;
  },
  A2: async () => {
    const probe = MEASURED.replies.probe;
    const reading = probeReading(probe.envelope);
    const first = isObject(probe.envelope) ? firstDiagnostic(probe.envelope) : undefined;
    const metadata = isObject(first?.metadata) ? first.metadata : {};
    const named = { options: JSON.parse(JSON.stringify(metadata.options ?? null)) as Json, surface: String(metadata.surface) };
    expect({ argv: probe.argv.slice(0, 2), exit: probe.exit, reading, named }).toStrictEqual({
      argv: ["context", "show"],
      exit: 2,
      reading: { served: false, reason: "refused:RF_USAGE_UNKNOWN_OPTION" },
      named: { options: [SELECTOR], surface: "context show" },
    });
    return { argv: [...probe.argv], exit: probe.exit, reading: { ...reading }, named };
  },
  A3: async () => {
    const walk = srcWalk();
    const served = probeReading(MEASURED.replies.probe.envelope).served;
    const { scans } = srcScans();
    const showArgvFindings = scans.flatMap(scan => scan.showArgv.flatMap(argv => argvFindings(argv.tail, served).map(finding => `${argv.at} ${finding}`)));
    const selectorLiterals = scans.flatMap(scan => scan.selectorLiterals);
    expect({ served, showArgvFindings, selectorLiterals }).toStrictEqual({ served: false, showArgvFindings: [], selectorLiterals: [] });
    return { ...walk, served, showArgvFindings, selectorLiterals };
  },
  A4: async () => {
    const log = standInRf(fullShapeRf(ROOT), 0);
    const native = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(native, ROOT);
    let injectedCalls = 0;
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(
      injected,
      async () => {
        injectedCalls += 1;
        throw new Error("the injected reader is never reached by an instance request");
      },
      ROOT,
    );
    const context = (): InvocationContext => ({ grants: ["reactivefiber:render", `invoke:${SHOW_ID}`], signal: new AbortController().signal });
    const request = { render: MEASURED.committed.render_id, instance: REQUESTED };
    const read = async (registry: CapabilityRegistry): Promise<Json> => ({
      show: await refusalOf(() => registry.invoke(SHOW_ID, request, context())),
      view: await refusalOf(() => registry.invoke(PREVIEW_ID, { view: "v", taskId: "t", instance: REQUESTED }, context())),
      legacy: await refusalOf(() => registry.invoke(PREVIEW_ID, { model: "m", task: "t", instance: REQUESTED }, context())),
    });
    const refused = { native: await read(native), injected: await read(injected) };
    const spawnsAfterRequests = spawnsOf(log).length;
    // Non-vacuity: the same native registry reaches the stand-in for a plain render, so zero spawns above is a refusal.
    const control = await refusalOf(() => native.invoke(PREVIEW_ID, { model: "m", task: "t" }, context()));
    const reading = { refused, spawnsAfterRequests, injectedCalls, control, spawnsAfterControl: spawnsOf(log).length };
    expect(reading).toStrictEqual({
      refused: {
        native: { show: UNAVAILABLE_SHOW, view: INVALID_INPUT, legacy: INVALID_INPUT },
        injected: { show: UNAVAILABLE_SHOW, view: INVALID_INPUT, legacy: INVALID_INPUT },
      },
      spawnsAfterRequests: 0,
      injectedCalls: 0,
      control: { category: "none", message: "resolved" },
      spawnsAfterControl: 1,
    });
    return reading;
  },
  B1: async () => {
    const show = MEASURED.replies.show;
    const selectionPaths = keyPaths(show.envelope).filter(path => path === "selection" || path.endsWith(".selection"));
    const blockInstances = blocksOf(show.envelope).map(row => (isObject(row) ? String(row[INSTANCE_KEY]) : "<none>"));
    const outcome = summary(project(show.envelope, show.exit, REQUESTED));
    const reading = { exit: show.exit, selectionPaths, blockInstances, outcome };
    expect(reading).toStrictEqual({
      exit: 0,
      selectionPaths: [],
      blockInstances: [SIBLING, REQUESTED],
      outcome: { kind: "unavailable", reason: "selector-unserved", rows: 0, ids: [] },
    });
    return reading;
  },
  B2: async () => {
    const walk = srcWalk();
    const instanceReads = srcScans().scans.flatMap(scan => scan.instanceReads);
    expect(instanceReads, "a src read of the row key or of selection.matched").toEqual([]);
    return { ...walk, instanceReads };
  },
  B3: async () => {
    const show = MEASURED.replies.show;
    const narrowed = project(landed(show.envelope, true), 0, REQUESTED);
    const whole = project(landed(show.envelope, false), 0, REQUESTED);
    const requestedRows = blocksOf(show.envelope).filter(row => isObject(row) && row[INSTANCE_KEY] === REQUESTED);
    // The projected rows are the producer's own rows for the requested instance, byte for byte.
    expect(narrowed.rows).toStrictEqual(requestedRows);
    const reading = { narrowed: summary(narrowed), whole: summary(whole), rowsDigest: digestOf(narrowed.rows.map(row => JSON.stringify(row))) };
    expect({ narrowed: reading.narrowed, whole: reading.whole }).toStrictEqual({
      narrowed: { kind: "projected", reason: "matched-1", rows: 1, ids: [REQUESTED] },
      whole: { kind: "refused", reason: `foreign-row:${SIBLING}`, rows: 0, ids: [] },
    });
    return reading;
  },
  C1: async () => {
    const unknown = MEASURED.replies.unknown;
    const outcome = summary(project(unknown.envelope, unknown.exit, REQUESTED));
    const first = isObject(unknown.envelope) ? firstDiagnostic(unknown.envelope) : undefined;
    const reason = isObject(first?.metadata) ? String(first.metadata.reason) : "<none>";
    const reading = { exit: unknown.exit, outcome, reason };
    expect(reading).toStrictEqual({ exit: 3, outcome: { kind: "not-found", reason: "RF_STORAGE_NOT_FOUND", rows: 0, ids: [] }, reason: "render" });
    return reading;
  },
  C2: async () => {
    const refusalReply = MEASURED.replies.renderRefusal;
    const reading = await readThrough(refusalReply.envelope, refusalReply.exit);
    expect(reading).toStrictEqual({ refusal: { category: "unavailable", message: "RF render refused: RF_WORKSPACE_INVALID" }, spawns: 1 });
    return { exit: refusalReply.exit, ...reading };
  },
  C3: async () => {
    const unknown = MEASURED.replies.unknown;
    const reading = await readThrough(unknown.envelope, unknown.exit);
    expect(reading).toStrictEqual({ refusal: UNRECOGNIZED, spawns: 1 });
    return { exit: unknown.exit, ...reading };
  },
  F1: async () => {
    const rows = textOf(BEAD_EXPORT)
      .split("\n")
      .filter(line => line.trim() !== "")
      .map(line => JSON.parse(line) as unknown);
    const row = rows.find(entry => isObject(entry) && entry.id === BEAD);
    expect(rows.length, "bead export rows").toBeGreaterThanOrEqual(EXPORT_FLOOR);
    expect(row, `${BEAD} is missing from the bead export`).toBeDefined();
    const text = stringLeaves(row).join("\n");
    // The filing's acceptance sentence, cut into its "(x) ..." clauses; each judged label must equal its clause.
    const acceptance = /Acceptance: ([\s\S]*?)\s*(?:Related:|$)/.exec(text)?.[1] ?? "";
    const clauseTexts = acceptance.split(/;\s+(?=\([a-z]\) )/).map(clause => clause.replace(/\.$/, ""));
    const clauses = clauseTexts.map(clause => /^\(([a-z])\) /.exec(clause)?.[1] ?? "");
    const judged = ROWS.filter(entry => /^\([a-z]\) /.test(entry.label));
    const labelsEqual = judged.filter((entry, index) => clauseTexts[index] === entry.label).map(entry => entry.id);
    const pinned = [SHOW_LEAF, SELECTOR, INSTANCE_KEY, `{${ADMITTED.join(", ")}}`, GATING, MILESTONE, PARSER_SITE, SELECTOR_SITES, SOURCE_LOCATOR, "exit 3"];
    const constantsQuoted = pinned.filter(constant => text.includes(constant));
    expect(clauses, "the filing's acceptance clauses against the judged rows").toEqual(judged.map(entry => entry.label.charAt(1)));
    expect(labelsEqual, "each judged label equals its acceptance clause").toEqual(judged.map(entry => entry.id));
    expect(constantsQuoted).toEqual(pinned);
    return { clauses, labelsEqual, constantsQuoted };
  },
  R5: async () => {
    const reading = await readThrough(reply("context.render", false, null, "RF_STORAGE_NOT_FOUND"), 3);
    expect(reading).toStrictEqual({ refusal: { category: "unavailable", message: "RF render refused: RF_STORAGE_NOT_FOUND" }, spawns: 1 });
    return reading;
  },
  MG1: async () => {
    const producer = producerGlobals();
    const readings = MEASURED.interleaved.replies.map(entry => ({
      argv: entry.argv.join(" "),
      ran: entry.exit === 3 && entry.command === SHOW_LEAF && entry.code === "RF_STORAGE_NOT_FOUND",
      read: verbTail(entry.argv, "show") !== undefined,
    }));
    const disagree = readings.filter(entry => entry.ran !== entry.read).map(entry => entry.argv);
    const kinds = { ran: readings.some(entry => entry.ran), refused: readings.some(entry => !entry.ran) };
    expect({ producer, kinds, disagree }).toStrictEqual({ producer: { flags: [...GLOBAL_FLAGS], values: [...GLOBAL_VALUES] }, kinds: { ran: true, refused: true }, disagree: [] });
    return {
      build: MEASURED.interleaved.build,
      producer,
      ran: readings.filter(entry => entry.ran).map(entry => entry.argv),
      refused: readings.filter(entry => !entry.ran).map(entry => entry.argv),
      disagree,
    };
  },
  R9: async () => {
    const anchors = exportAnchors();
    const rowsWithout = (pin: string): Row[] => ROWS.map(row => ({ ...row, pins: row.pins.filter(entry => entry !== pin) }));
    const curesWithout = (probe: string): Record<string, string> => Object.fromEntries(Object.entries(CURES).filter(([name]) => name !== probe));
    const rosterWithout = (pin: string, probe: string): Roster => ({
      ...ROSTER,
      rows: ROSTER.rows.map(row => ({ ...row, pins: row.pins.filter(entry => entry.id !== pin) })),
      cures: Object.fromEntries(Object.entries(ROSTER.cures).filter(([name]) => name !== probe)),
    });
    const reading = {
      residual: RESIDUALS.R9 ?? "<none>",
      addedTogether: anchorFindings(rowsWithout("MJ5"), RESIDUALS, curesWithout("X-NOTFOUND-ANYEXIT"), rosterWithout("MJ5", "X-NOTFOUND-ANYEXIT"), anchors),
      addedHere: anchorFindings(rowsWithout("MJ5"), RESIDUALS, CURES, ROSTER, anchors),
      landedTogether: anchorFindings(rowsWithout("A2"), RESIDUALS, CURES, rosterWithout("A2", ""), anchors),
      namedTogether: anchorFindings(rowsWithout("MS8"), RESIDUALS, curesWithout("G13"), rosterWithout("MS8", "G13"), anchors),
    };
    expect(reading).toStrictEqual({
      residual: "COORDINATED",
      addedTogether: [],
      addedHere: ["roster rows differ", "cure unbound: X-NOTFOUND-ANYEXIT"],
      landedTogether: ["landed pin missing: A2"],
      namedTogether: ["named probe unbound: G13"],
    });
    return reading;
  },
  ...Object.fromEntries(
    CASES.map(entry => [
      entry.pin,
      async () => {
        const outcome = outcomeOf(entry);
        expect(outcome).toStrictEqual(entry.outcome);
        return { digest: digestOf([JSON.stringify(entry)]), outcome };
      },
    ]),
  ),
};

const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the landed record, the follow-up's probes and the cases agree";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, and every pin reached its end with its pinned assertion count";
/** Each pin's witness, held to the roster a second time by the record. */
const WITNESSED: Record<string, Json> = {};
/** Each pin's end, with the assertion count its case reached. */
const REACHED: string[] = [];

describe("wb-pfxo.9 context show instance census (RF-COMPOSITIONAL-ASSEMBLY-R10, absent-today leg)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:5", "A:4", "B:3", "C:3", "F:1", "M:32", "R:10"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(constants()).toStrictEqual(ROSTER.constants);
    expect(Object.keys(RESIDUALS), "every row R pin names its residual").toEqual(ROWS.find(row => row.id === "R")?.pins ?? []);
    expect(anchorFindings(ROWS, RESIDUALS, CURES, ROSTER, exportAnchors()), "the roster, the landed record and the follow-up's probes").toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          WITNESSED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
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
    expect(titles, "the judged title, one test per pin in row order, then this record").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins), RECORD_TITLE]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(WITNESSED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
