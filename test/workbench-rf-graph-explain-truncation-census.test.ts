/**
 * wb-2j3.10 (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, program-triage-2026-10-17), the standing leg: the rf graph explain
 * truncation-honesty census, an until-then pin.
 * Statement (the bead's STATEMENT, read from the tracked export .beads/issues.jsonl at run time and never retyped beyond the
 * fragments the rows quote): it is tiled, in order and exactly, by row G's label, ", ", row W's label, ". ", the PENDING clause,
 * "; ", row U's label and ".", so no row label can drift from the filing and no row can be dropped without leaving its fragment
 * untiled.
 * NOT DELIVERED HERE: the PENDING clause ("If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit
 * and the graph revision verbatim and shall never present a capped path list as complete") and the filing's ACCEPTANCE, two
 * "On landing:" items (a consumer test driving the new adapter with a truncated:true, path_limit:N fixture; the graph revision
 * carried verbatim, a second value round-tripping). They bind when the gating artifact ships (row G: it has not) and a Pi slice
 * invokes graph explain (row W: none does); until then Pi carries no change toward it (row U). The export's ACCEPTANCE is held to
 * exactly those two on-landing items, so a standing item added to the filing reds this census.
 *
 * MEASURED (by the cutting seat ws-04, run g10-work-s123, 2026-10-28, on trunk 6f41e27 and again at 09f45a5, merged into the
 * branch: test and .beads paths only, src identical; the roster's "capture" object holds the producer values, written by a capture
 * script from the installed rf and a read-only git show of the RFCLI pin, never by hand):
 * - The installed rf is 0.1.845 (rf --json --version, commit 7e6ed89a09f6), the release the contractSource carrier records
 *   (REACTIVE_FIBER_CONTRACT_SOURCE, read through recordedRfRelease of test/helpers/rf-release-drift.ts); its registry serves
 *   graph.explain (served_reachable).
 * - Its graph explain leaf takes no --max-paths: the --help usage lists -h, --from, --json, --workspace, --actor, --no-input,
 *   --yes, --debug, --color and -v before TARGET, and `rf graph explain --max-paths 1 source:x --json` exits 2 with
 *   RF_USAGE_UNKNOWN_OPTION naming --max-paths.
 * - Its envelope schema (reactive_fiber_cli/schemas/cli/graph.explain.schema.json, 23231 bytes) declares the ok:true result at
 *   /$defs/result with eight members, all required: graph_revision_id, target, source, reachable, paths, edge_paths, reason and
 *   diagnostics; no truncated and no path_limit. At the bead's pin (ReactiveFiberCLI 8a8b83e4d) the same object's required list
 *   spans graph.explain.schema.json:375-383, the lines the filing cites, and holds the first seven.
 * - PMO-05a has landed below the CLI (the installed inspection/graph.py carries a max_paths search that flags truncated); PMO-05b,
 *   the leaf's --max-paths with truncated and path_limit in its envelope (RFCLI BEADS-2026-10-16.md:61; ruling R-49 at :297: the
 *   fields are emitted only under the flag), has not. The gating artifact is UNSHIPPED at the recorded release.
 * - Pi: three src modules import node:child_process, with five call sites; the one whose binary is rf is the spawn in
 *   nativeReactiveFiberRender (providers/reactivefiber.ts), its argv renderArgv's (verb context render, tail --no-commit
 *   --no-input --json); the one binary that is not a string literal is the detached host's process.execPath. No src literal
 *   spells the graph explain leaf, no src text spells a PMO-05b name, no src module imports an rf package (none is published)
 *   and the one registered rf capability is the non-committing render preview.
 *
 * ROWS (one test per pin, titled by the pin id under its row's label; each pin's witness is the roster's):
 *  G, the gating artifact, read from the capture. G1 the capture's release is the carrier's (a carrier re-pin reds this row
 *    until the gating state is re-measured at the new release), its commit a full sha and its graph.explain leaf served. G2 the
 *    leaf's usage options, none of them the filing's flag, and the probe: the flag refused with exit 2, ok false and
 *    RF_USAGE_UNKNOWN_OPTION naming it. G3 the result members at the release and the members and required list at the pin, the
 *    revision member in each and neither filing field in any; the pin's required list spans exactly the cited lines.
 *  W, the Pi slice that invokes graph explain (none). W1 the src modules importing node:child_process (this reader and the shared
 *    sourceStructure read the same list, the provider among them; the list itself is not pinned) and every call site there of a
 *    child-process function, resolved through its import or require binding: exactly one whose binary is rf (the provider's
 *    spawn, by its enclosing function) and exactly one whose binary is not a string literal (fail-closed: a new one reds for
 *    re-measure); literal binaries other than rf are not judged. The scanner's controls read as pinned. W2 the rf spawn's argv is renderArgv's: the argument is the const argv initialised by
 *    renderArgv(selector,workspaceRoot), renderArgv's array literals read as pinned and its returned array's words, with options
 *    and expressions elided, are context render. W3 no src string, template or array literal spells the leaf (its two words in
 *    any case, joined directly or by white space, ".", "_" or "-"), read as spelled, with rf's options elided and, for strings
 *    and templates, shell-unquoted; the planted spellings are caught and the near misses are not.
 *  U, until the artifact exists, no Pi change. U1 no src text (comments included) spells a PMO-05b name: the filing's flag and
 *    its path_limit field, each in its snake, kebab and camel spellings, case-sensitive; the planted names are caught and the
 *    near misses are not. U2 the native and the injected rf registrations hold exactly the render preview (effectClass read,
 *    contractSource the carrier's non-committing render with its release masked) and no rf descriptor's id, description or
 *    contractSource spells the leaf; a registry holding a planted explain descriptor reads one finding. U3 no src module
 *    imports (static, export-from, dynamic or require) an rf package and package.json names or specifies none; the
 *    predicate's planted names and specs are caught, and Pi's own relative reactivefiber module and the other packages are not.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 *  pins, every pin's witness, the constants and controls, the residual families and every registered test title - is held to
 *  the out-of-file roster (test/fixtures/rf-graph-explain-truncation-roster.json); outside both, the rows' labels are held to the
 *  bead's STATEMENT in the tracker export (the tiling above), the leaf, flag and fields to the STATEMENT's own spelling of them,
 *  the cited pin and lines to the capture's pin, and the capture's release to the carrier. The last case reads the vitest task
 *  tree (every registered test, in roster order, in run mode, ran before it) and the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 *  roster; a control removed from its list and the roster; a pin's case replaced by one that echoes its roster witness.
 * RESIDUALS (named, each with its pinned quiet row): R-COMPOSED the leaf spelled from runtime parts (a verb held in a variable,
 *  a concatenation, a pushed word) is invisible to W3 (Q1); R-WRAPPED a child-process function reached through a local wrapper
 *  or re-export is not resolved in its caller: the wrapper module is an importer with no site, the caller has no site, and
 *  W3 still reads the caller's literal argv (Q2); R-OUTSIDE-SRC the walks read src only (qa/, scripts and an operator's local
 *  provider module loaded from a path outside src are not read), though the scanners flag the same text (Q3); R-COMMON-WORD
 *  the filing's truncated field is an ordinary src word (a relation page flag, text truncation) and is not a U1 needle (Q4).
 * SCOPE: the census judges Pi's src, its registrations and package.json, and the captured producer state. It re-runs none of
 *  the runtime argv pins the rf graph mutation census owns (test/workbench-rf-graph-mutation-census.test.ts rows A and C), and
 *  the honesty homes the bead's rationale names (graph-view.ts, topology-slice.ts) keep their own suites.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src, package.json, .beads and the roster are only read.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { sourceStructure } from "./helpers/census.js";
import { recordedRfRelease } from "./helpers/rf-release-drift.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-graph-explain-truncation-roster.json");
const BEAD = "wb-2j3.10";
const PROVIDER_FILE = "src/workbench/providers/reactivefiber.ts";
const RF_PREFIX = "reactivefiber.";
/** The src walk reaches at least this many modules (116 measured at the cut); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** The reading of a non-literal element, argument or template substitution. */
const EXPR = "<expr>";
/** The leaf, its flag and its two fields as the STATEMENT spells them (held to it in the first case). */
const LEAF = "graph.explain";
const FLAG = "--max-paths";
const FIELDS = ["truncated", "path_limit"] as const;
/** The field that is an ordinary src word and so no U1 needle (R-COMMON-WORD). */
const EXCLUDED_FIELDS: readonly string[] = ["truncated"];
/** The result member that carries the graph revision. */
const REVISION_MEMBER = "graph_revision_id";
/** The pin and the schema lines the STATEMENT cites for the absent fields. */
const CITED_PIN = { rfcli: "8a8b83e4d", lines: [375, 383] } as const;
/** The STATEMENT clause and the two ACCEPTANCE items this standing leg does not deliver. */
const PENDING =
  "If and when a Pi surface consumes rf graph explain, it shall carry truncated/path_limit and the graph revision verbatim and shall never present a capped path list as complete";
const PENDING_ACCEPTANCE: readonly string[] = [
  "On landing: a consumer test drives the new adapter with a truncated:true, path_limit:N fixture and asserts the projection is partial/truncated with a counted remainder; a capped list never projects coverage 'complete'.",
  "On landing: the graph revision is carried verbatim from the envelope (a second revision value round-trips).",
];
/** The STATEMENT's tiling: the fragments in order (a row id, or PENDING for the pending clause) and the separator after each. */
const TILES: readonly string[] = ["G", "W", "PENDING", "U"];
const SEPARATORS: readonly string[] = [", ", ". ", "; ", "."];
/** The description's section heads around the STATEMENT and the ACCEPTANCE. */
const HEADS = { statement: "\n\nSTATEMENT: ", rationale: "\n\nRATIONALE: ", acceptance: "\n\nACCEPTANCE: ", surfaces: "\n\nSURFACES: " } as const;
/** The child-process functions a call site is read for, and the two whose first argument is a shell command line. */
const CHILD_PROCESS_CALLS: readonly string[] = ["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"];
const SHELL_CALLS: readonly string[] = ["exec", "execSync"];
const CHILD_PROCESS_MODULE = /^(?:node:)?child_process$/;
/** rf's value-taking globals (its parser's RF_VALUE_OPTIONS): spelled apart, each consumes the next token. */
const RF_VALUE_OPTIONS: readonly string[] = ["--workspace", "--actor", "--color"];
/** A package name or spec carrying one of these (lower-cased), or a name or path segment equal to rf, is an rf package. */
const RF_PACKAGE_WORDS: readonly string[] = ["reactive-fiber", "reactivefiber", "reactive_fiber"];

/** W1's scanner controls: module bodies (parsed, never compiled or run). */
const SPAWN_CONTROLS: Readonly<Record<string, string>> = {
  named: `import { spawn } from "node:child_process"; function run(argv: string[]) { return spawn("rf", argv); }`,
  alias: `import { execFile as launch } from "child_process"; launch("/usr/local/bin/rf", ["graph"]);`,
  namespace: `import * as cp from "node:child_process"; cp.spawnSync("rf", []);`,
  "default-opaque": `import cp from "node:child_process"; cp.fork(script);`,
  require: `const { spawn: launch } = require("node:child_process"); launch("rf", argv);`,
  "require-element": `const cp = require("child_process"); cp["execSync"]("rf graph show --json");`,
  "variable-binary": `import { spawn } from "node:child_process"; const BIN = "rf"; spawn(BIN, argv);`,
  git: `import { execFileSync } from "node:child_process"; execFileSync("git", ["status"]);`,
  "regex-exec": `import { spawn } from "node:child_process"; const found = /rf/.exec(text);`,
  "type-only": `import type { ChildProcess } from "node:child_process"; const exec = (line: string) => line; exec("rf");`,
  unimported: `spawn("rf", argv);`,
};
/** W3's planted spellings of the leaf (each must be caught) and its near misses (none may be). */
const LEAF_CAUGHT: Readonly<Record<string, string>> = {
  argv: `spawn("rf", ["graph", "explain", target, "--json"]);`,
  spaced: `const line = "rf graph explain source:x --json";`,
  dotted: `const leaf = "graph.explain";`,
  "option-between": `const argv = ["--workspace", root, "graph", "--json", "explain", target];`,
  "value-option-between": `const argv = ["graph", "--color", "never", "explain"];`,
  template: `const line = \`rf graph \${flags} explain \${target}\`;`,
  "shell-quoted": `const line = "rf graph 'explain' source:x";`,
  upper: `const LEAF = "GRAPH_EXPLAIN";`,
  kebab: `const verb = "graph-explain";`,
  camel: `const verb = "graphExplain";`,
};
const LEAF_QUIET: Readonly<Record<string, string>> = {
  show: `const argv = ["graph", "show", "--json"];`,
  "context-explain": `const argv = ["context", "explain", renderId];`,
  word: `const word = "explain";`,
  explainer: `const text = "the graph explainer";`,
  paragraph: `const text = "a paragraph explains it";`,
  render: `const argv = ["--workspace", root, "context", "render", "--no-commit", "--no-input", "--json"];`,
  comment: "// rf graph explain is not consumed here\nconst value = 1;",
};
/** U1's planted PMO-05b names (each must be caught) and its near misses (none may be). */
const NAME_CAUGHT: Readonly<Record<string, string>> = {
  field: "const limit = result.path_limit;",
  flag: `const argv = ["graph", "explain", "--max-paths", "5"];`,
  "camel-field": "interface Projection { pathLimit: number }",
  "library-keyword": "const options = { max_paths: 5 };",
  "camel-flag": "const maxPaths = 5;",
  "kebab-field": `const option = "path-limit";`,
};
const NAME_QUIET: Readonly<Record<string, string>> = {
  socket: "export const DETACHED_SOCKET_PATH_LIMIT = 103;",
  applied: "const page = { truncated: true, limitApplied: 40 };",
  length: "const maxPathLength = 4096;",
};
/** U2's planted descriptor: an rf capability naming the leaf. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "reactivefiber.graph.explain",
  version: "1.0.0",
  description: "Explain one rf graph node",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  effectClass: "read",
  permissions: ["reactivefiber:render"],
  supportedModes: ["invoke"],
  contractSource: "rf@0.0.0:reactive-fiber.cli/v1 graph.explain",
};
/** U3's planted specifiers and specs: rf packages (each caught) and others (none caught). */
const PACKAGE_CAUGHT: readonly string[] = ["@reactive-fiber/sdk", "reactivefiber", "@reactivefiber/cli", "reactive_fiber_cli", "@rf/sdk", "rf", "@acme/reactive-fiber-tsx"];
const PACKAGE_QUIET: readonly string[] = ["@furnace/sdk", "./providers/reactivefiber.js", "../workbench/providers/reactivefiber.js", "node:child_process", "@hyperunix/sdk", "typescript", "rfc-parser", "surf"];
const SPEC_CAUGHT: readonly string[] = ["npm:@reactive-fiber/sdk@1.0.0", "file:../ReactiveFiberCLI", "file:vendor/rf"];
const SPEC_QUIET: readonly string[] = ["^4.1.0", "file:vendor/furnace-sdk", "npm:surf@2.0.0"];
/** Q1's composed spellings (R-COMPOSED): the leaf assembled at run time. */
const COMPOSED_PROBES: Readonly<Record<string, string>> = {
  variable: `const verb = "explain"; spawn("rf", ["graph", verb]);`,
  concatenated: `const leaf = "gr" + "aph explain";`,
  pushed: `const words = ["graph"]; words.push("explain");`,
};
/** Q2's wrapped spawn (R-WRAPPED): a wrapper module re-exporting spawn, and a caller spawning rf through it. */
const WRAPPER_MODULE = `export { spawn as launch } from "node:child_process";`;
const WRAPPED_CALLER = `import { launch } from "./launch.js"; launch("rf", ["graph", "explain", target]);`;
/** Q3's out-of-src text (R-OUTSIDE-SRC): an operator's local provider module spawning the leaf. */
const LOCAL_PROVIDER = `import { spawn } from "node:child_process";
export function register(registry) {
  registry.register({ descriptor: { id: "local.graph", version: "1.0.0", description: "d", inputSchema: {}, effectClass: "read", permissions: [], supportedModes: ["invoke"] }, invoke: async () => spawn("rf", ["graph", "explain", "source:x", "--json"]) });
}`;
/** Q4's probe (R-COMMON-WORD): a page flag read under the excluded field's name. */
const COMMON_WORD_PROBE = "if (result.truncated) return { partial: true };";
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-COMPOSED": ["Q1"],
  "R-WRAPPED": ["Q2"],
  "R-OUTSIDE-SRC": ["Q3"],
  "R-COMMON-WORD": ["Q4"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for G, W and U, to the bead's STATEMENT. */
const ROWS: readonly Row[] = [
  {
    id: "G",
    label:
      "Gating artifact: RFCLI PMO-05a/PMO-05b (program packets rfc-20qgk.8/rfc-20qgk.9, PMO/BEADS-2026-10-16.md:61,:296-297@8a8b83e4d) shipping rf graph explain --max-paths with truncated/path_limit fields (absent from graph.explain.schema.json:375-383@8a8b83e4d)",
    pins: ["G1", "G2", "G3"],
  },
  { id: "W", label: "conjoined with a Pi W10 slice that actually invokes graph explain", pins: ["W1", "W2", "W3"] },
  { id: "U", label: "until the artifact exists, no Pi change", pins: ["U1", "U2", "U3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4"] },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Capture {
  readonly release: string;
  readonly commit: string;
  readonly leaf: { readonly path: string; readonly served: boolean; readonly availability: string };
  readonly usage: string;
  readonly members: readonly string[];
  readonly required: readonly string[];
  readonly probe: {
    readonly argv: readonly string[];
    readonly exit: number;
    readonly ok: boolean;
    readonly command: string;
    readonly code: string;
    readonly refused: readonly string[];
  };
  readonly pin: { readonly rfcli: string; readonly lines: readonly number[]; readonly members: readonly string[]; readonly required: readonly string[] };
}
interface Roster {
  readonly capture: Capture;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`${field} must be a string`);
  return value;
}
function object(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** The capture as the capture script wrote it, every field refused by name when it has the wrong shape. */
function readCapture(raw: unknown): Capture {
  const capture = object(raw, "roster capture");
  const leaf = object(capture.leaf, "capture leaf");
  const schema = object(capture.schema, "capture schema");
  const probe = object(capture.probe, "capture probe");
  const envelope = object(probe.envelope, "capture probe envelope");
  const diagnostics = Array.isArray(envelope.diagnostics) ? envelope.diagnostics : [];
  const primary = object(diagnostics[0], "capture probe diagnostics[0]");
  const pin = object(capture.pin, "capture pin");
  const lines = Array.isArray(pin.lines) && pin.lines.every(line => Number.isInteger(line)) ? (pin.lines as number[]) : [];
  if (typeof leaf.served !== "boolean" || typeof probe.exit !== "number" || typeof envelope.ok !== "boolean") {
    throw new Error("capture leaf.served, probe.exit and probe.envelope.ok must be a boolean, a number and a boolean");
  }
  return {
    release: text(capture.release, "capture release"),
    commit: text(capture.commit, "capture commit"),
    leaf: { path: text(leaf.path, "capture leaf.path"), served: leaf.served, availability: text(leaf.availability, "capture leaf.availability") },
    usage: text(object(capture.usage, "capture usage").line, "capture usage.line"),
    members: strings(schema.members, "capture schema.members"),
    required: strings(schema.required, "capture schema.required"),
    probe: {
      argv: strings(probe.argv, "capture probe.argv"),
      exit: probe.exit,
      ok: envelope.ok,
      command: text(envelope.command, "capture probe.envelope.command"),
      code: text(primary.code, "capture probe code"),
      refused: strings(object(primary.metadata, "capture probe metadata").options, "capture probe metadata.options"),
    },
    pin: {
      rfcli: text(pin.rfcli, "capture pin.rfcli"),
      lines,
      members: strings(pin.members, "capture pin.members"),
      required: strings(pin.required, "capture pin.required"),
    },
  };
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { capture: readCapture(raw.capture), constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
const CAPTURE = ROSTER.capture;
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the readers ----

function parse(fileName: string, source: string): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function filesBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesBelow(path);
    return entry.isFile() ? [path] : [];
  });
}
interface Module {
  readonly name: string;
  readonly source: string;
}
/** Every src/**\/*.ts module, by repository-relative path with "/" separators. */
function srcModules(): Module[] {
  return filesBelow(join(REPO, "src"))
    .filter(file => file.endsWith(".ts"))
    .map(file => ({ name: relative(REPO, file).split("\\").join("/"), source: readFileSync(file, "utf8") }))
    .sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
}

/** The leaf's spelling family: its words in any case, joined directly or by any run of white space, ".", "_" or "-". */
const LEAF_PATTERN = new RegExp(`(?<![A-Za-z0-9])${LEAF.split(".").join("[\\s._-]*")}(?![A-Za-z0-9])`, "i");
/** A token run as rf's group parsers read it: every option, the value a value option consumes and every EXPR elided. */
function optionElided(tokens: readonly string[]): string {
  const kept: string[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] ?? "";
    if (RF_VALUE_OPTIONS.includes(token)) index += 1;
    else if (token !== "" && !token.startsWith("-") && token !== EXPR) kept.push(token);
  }
  return kept.join(" ");
}
/** A shell line with its quoting removed: a backslash escape keeps its character, then every ' and " is dropped. */
function shellUnquoted(line: string): string {
  return line.replace(/\\(.)/gs, "$1").replace(/['"]/g, "");
}
function arrayWords(node: ts.ArrayLiteralExpression): string[] {
  return node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : EXPR));
}
/** Every string, template and array literal of one module that spells the leaf, as `${form}:${line}`. */
function leafHits(fileName: string, source: string): string[] {
  const file = parse(fileName, source);
  const hits: string[] = [];
  const judge = (form: string, node: ts.Node, readings: readonly string[]): void => {
    if (readings.some(reading => LEAF_PATTERN.test(reading))) hits.push(`${form}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`);
  };
  const line = (spelled: string): string[] => {
    const unquoted = shellUnquoted(spelled);
    return [spelled, optionElided(spelled.split(/\s+/)), unquoted, optionElided(unquoted.split(/\s+/))];
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge("literal", node, line(node.text));
    else if (ts.isTemplateExpression(node)) judge("template", node, line([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(` ${EXPR} `)));
    else if (ts.isArrayLiteralExpression(node)) {
      const words = arrayWords(node);
      judge("argv", node, [words.join(" "), optionElided(words)]);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return hits;
}

interface SpawnSite {
  readonly kind: "rf" | "literal" | "opaque";
  readonly scope: string;
  readonly callee: string;
  readonly binary: string;
  readonly call: ts.CallExpression;
}
interface SpawnScan {
  readonly imports: boolean;
  readonly sites: readonly SpawnSite[];
}
/** The name of the function a node stands in (a declaration, a method or a function bound to a const), else <module>. */
function scopeOf(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if ((ts.isFunctionDeclaration(at) || ts.isMethodDeclaration(at)) && at.name !== undefined) return at.name.getText();
    if ((ts.isArrowFunction(at) || ts.isFunctionExpression(at)) && ts.isVariableDeclaration(at.parent) && ts.isIdentifier(at.parent.name)) return at.parent.name.text;
  }
  return "<module>";
}
function requiresChildProcess(node: ts.Expression | undefined): boolean {
  if (node === undefined || !ts.isCallExpression(node) || !ts.isIdentifier(node.expression) || node.expression.text !== "require") return false;
  const first = node.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS_MODULE.test(first.text);
}
/** The basename of a binary path, without a Windows launcher extension, lower-cased. */
function binaryName(binary: string): string {
  return (binary.split(/[\\/]/).pop() ?? "").toLowerCase().replace(/\.(?:exe|cmd)$/, "");
}
/** One module's child-process bindings (static imports and require; a type-only import binds nothing) and every call through
 * them: its callee, its binary (a shell call's first word) read as rf, another literal, or opaque (not a string literal). */
function scanSpawns(fileName: string, source: string): SpawnScan {
  const file = parse(fileName, source);
  const named = new Map<string, string>();
  const spaces = new Set<string>();
  let imports = false;
  const bindRequire = (declaration: ts.VariableDeclaration): void => {
    if (!requiresChildProcess(declaration.initializer)) return;
    imports = true;
    if (ts.isIdentifier(declaration.name)) spaces.add(declaration.name.text);
    else if (ts.isObjectBindingPattern(declaration.name)) {
      for (const element of declaration.name.elements) {
        if (!ts.isIdentifier(element.name)) continue;
        const exported = element.propertyName !== undefined && ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.name.text;
        named.set(element.name.text, exported);
      }
    }
  };
  const bind = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      if (clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) spaces.add(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) spaces.add(bindings.name.text);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) if (!element.isTypeOnly) named.set(element.name.text, (element.propertyName ?? element.name).text);
        }
        imports ||= clause.name !== undefined || bindings !== undefined;
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && CHILD_PROCESS_MODULE.test(node.moduleSpecifier.text)) {
      imports ||= !node.isTypeOnly;
    } else if (ts.isVariableDeclaration(node)) bindRequire(node);
    ts.forEachChild(node, bind);
  };
  bind(file);
  const sites: SpawnSite[] = [];
  const calleeOf = (expression: ts.Expression): string | undefined => {
    if (ts.isIdentifier(expression)) return named.get(expression.text);
    if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text)) return expression.name.text;
    if (ts.isElementAccessExpression(expression) && ts.isIdentifier(expression.expression) && spaces.has(expression.expression.text) && ts.isStringLiteralLike(expression.argumentExpression)) {
      return expression.argumentExpression.text;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = calleeOf(node.expression);
      if (callee !== undefined && CHILD_PROCESS_CALLS.includes(callee)) {
        const first = node.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first)) {
          const binary = SHELL_CALLS.includes(callee) ? (first.text.trim().split(/\s+/)[0] ?? "") : first.text;
          sites.push({ kind: binaryName(binary) === "rf" ? "rf" : "literal", scope: scopeOf(node), callee, binary, call: node });
        } else sites.push({ kind: "opaque", scope: scopeOf(node), callee, binary: first === undefined ? "<none>" : first.getText(file), call: node });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { imports, sites };
}
function scanReading(scan: SpawnScan): string {
  return `${scan.imports ? "imports" : "no-import"}|${scan.sites.map(site => `${site.kind}:${site.scope}:${site.callee}:${site.binary}`).join(",")}`;
}
/** The modules the shared reader (sourceStructure, test/helpers/census.ts) reads as loading node:child_process. */
function sharedImporters(modules: readonly Module[]): string[] {
  return modules
    .filter(module => sourceStructure(REPO, module.name).imports.some(entry => !entry.typeOnly && CHILD_PROCESS_MODULE.test(entry.module)))
    .map(module => module.name);
}

/** The case-sensitive needles of U1: the filing's flag and each non-excluded field, in their snake, kebab and camel spellings. */
function spellings(name: string): string[] {
  const words = name.replace(/^-+/, "").split(/[-_]/);
  const camel = words.map((word, index) => (index === 0 ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)).join("");
  return [...new Set([name, words.join("_"), words.join("-"), camel])];
}
const NEEDLES: readonly string[] = [FLAG, ...FIELDS.filter(field => !EXCLUDED_FIELDS.includes(field))].flatMap(spellings);
function nameHits(source: string): string[] {
  return NEEDLES.filter(needle => source.includes(needle));
}

/** The package a bare module specifier loads, or undefined for a relative, absolute or node: specifier. */
function packageOf(specifier: string): string | undefined {
  if (specifier.startsWith(".") || specifier.startsWith("/") || specifier.startsWith("node:")) return undefined;
  const parts = specifier.split("/");
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}
function rfPackage(specifier: string): boolean {
  const name = packageOf(specifier)?.toLowerCase();
  if (name === undefined) return false;
  return RF_PACKAGE_WORDS.some(word => name.includes(word)) || name.replace(/^@/, "").split("/").includes("rf");
}
function rfSpec(spec: string): boolean {
  const lower = spec.toLowerCase();
  return RF_PACKAGE_WORDS.some(word => lower.includes(word)) || lower.split(/[/:@\\]/).includes("rf");
}

/** Never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
function plantedRegistry(): CapabilityRegistry {
  const registry = injectedRegistry();
  registry.register({ descriptor: PLANTED_DESCRIPTOR, invoke: async () => NEVER() });
  return registry;
}
function rfDescriptors(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor)
    .filter(descriptor => descriptor.id.startsWith(RF_PREFIX));
}
function maskedRelease(source: string | undefined): string {
  return source === undefined ? "<none>" : source.replace(/^rf@[^:]+:/, "rf@<release>:");
}
function rfReadings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry).map(descriptor => `${descriptor.id}|${descriptor.effectClass}|${maskedRelease(descriptor.contractSource)}`);
}
function explainFindings(registry: CapabilityRegistry): string[] {
  return rfDescriptors(registry)
    .filter(descriptor => [descriptor.id, descriptor.description, descriptor.contractSource ?? ""].some(field => LEAF_PATTERN.test(field)))
    .map(descriptor => descriptor.id);
}

// ---- the bead's own text ----

function exportDescription(): string {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.description === "string") return row.description;
  }
  return "";
}
function between(description: string, head: string, tail: string): string {
  const start = description.indexOf(head);
  const end = start === -1 ? -1 : description.indexOf(tail, start + head.length);
  return end === -1 ? "" : description.slice(start + head.length, end);
}
/** The ACCEPTANCE list's items (the filing writes it as a list literal whose items may be quoted either way). */
function acceptanceItems(list: string): string[] {
  if (!/^\[["']/.test(list) || !/["']\]$/.test(list)) return [];
  return list.slice(2, -2).split(/["'], ["'](?=On landing: )/);
}
function tiled(rows: readonly Row[]): string {
  return TILES.map((tile, index) => `${tile === "PENDING" ? PENDING : (rows.find(row => row.id === tile)?.label ?? `<no row ${tile}>`)}${SEPARATORS[index] ?? ""}`).join("");
}

// ---- the cases ----

const REACHED: string[] = [];
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  G1: async () => {
    const carrier = recordedRfRelease();
    expect(
      CAPTURE.release,
      `the gating state was captured at rf ${CAPTURE.release} but the carrier records ${carrier}: re-measure it at ${carrier} (the leaf's usage, its result members, the ${FLAG} probe) and re-capture the roster`,
    ).toBe(carrier);
    return json({ carrier, release: CAPTURE.release, commit: /^[0-9a-f]{40}$/.test(CAPTURE.commit), leaf: `${CAPTURE.leaf.path}|${CAPTURE.leaf.served}|${CAPTURE.leaf.availability}` });
  },
  G2: async () => {
    const options = [...CAPTURE.usage.matchAll(/\[(--?[A-Za-z][\w-]*)/g)].map(match => match[1] ?? "");
    expect(options, `rf ${LEAF.split(".").join(" ")} takes no ${FLAG} at the recorded release`).not.toContain(FLAG);
    expect(CAPTURE.probe.refused, `the probe's own refusal names ${FLAG}`).toContain(FLAG);
    return json({
      usage: CAPTURE.usage.startsWith(`usage: rf ${LEAF.split(".").join(" ")} `),
      options,
      probe: {
        flag: CAPTURE.probe.argv.includes(FLAG),
        exit: CAPTURE.probe.exit,
        ok: CAPTURE.probe.ok,
        command: CAPTURE.probe.command,
        code: CAPTURE.probe.code,
        refused: CAPTURE.probe.refused,
      },
    });
  },
  G3: async () => {
    const lists = [CAPTURE.members, CAPTURE.required, CAPTURE.pin.members, CAPTURE.pin.required];
    const fields = FIELDS.filter(field => lists.some(list => list.includes(field)));
    expect(fields, "neither filing field is a result member or a required name, at the release or at the pin").toEqual([]);
    const [opening, closing] = CAPTURE.pin.lines;
    return json({
      release: { members: CAPTURE.members, required: CAPTURE.required },
      pin: { rfcli: CAPTURE.pin.rfcli, members: CAPTURE.pin.members, required: CAPTURE.pin.required },
      revision: lists.map(list => list.includes(REVISION_MEMBER)),
      fields,
      span: opening !== undefined && closing !== undefined && closing - opening - 1 === CAPTURE.pin.required.length,
    });
  },
  W1: async () => {
    const modules = srcModules();
    const scans = modules.map(module => ({ module: module.name, scan: scanSpawns(module.name, module.source) }));
    const importers = scans.filter(entry => entry.scan.imports).map(entry => entry.module);
    const sites = scans.flatMap(entry => entry.scan.sites.map(site => ({ module: entry.module, site })));
    return json({
      agree: JSON.stringify(importers) === JSON.stringify(sharedImporters(modules)),
      provider: importers.includes(PROVIDER_FILE),
      rf: sites.filter(entry => entry.site.kind === "rf").map(entry => `${entry.module}|${entry.site.scope}|${entry.site.callee}`),
      opaque: sites.filter(entry => entry.site.kind === "opaque").map(entry => `${entry.module}|${entry.site.scope}|${entry.site.callee}|${entry.site.binary}`),
      controls: Object.fromEntries(Object.entries(SPAWN_CONTROLS).map(([name, body]) => [name, scanReading(scanSpawns(`${name}.ts`, body))])),
    });
  },
  W2: async () => {
    const source = readFileSync(join(REPO, PROVIDER_FILE), "utf8");
    const file = parse(PROVIDER_FILE, source);
    const rf = scanSpawns(PROVIDER_FILE, source).sites.filter(site => site.kind === "rf");
    expect(rf, "the provider holds one rf spawn").toHaveLength(1);
    const argument = rf[0]?.call.arguments[1];
    let initializer = "<unread>";
    let arrays: string[] = [];
    let verb = "<unread>";
    const visit = (node: ts.Node): void => {
      if (argument !== undefined && ts.isIdentifier(argument) && ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === argument.text && scopeOf(node) === rf[0]?.scope) {
        initializer = node.initializer === undefined ? "<none>" : node.initializer.getText(file);
      }
      if (ts.isFunctionDeclaration(node) && node.name?.text === "renderArgv") {
        const found: string[] = [];
        const collect = (inner: ts.Node): void => {
          if (ts.isArrayLiteralExpression(inner)) found.push(arrayWords(inner).join(" "));
          if (ts.isReturnStatement(inner) && inner.expression !== undefined && ts.isArrayLiteralExpression(inner.expression)) verb = optionElided(arrayWords(inner.expression));
          ts.forEachChild(inner, collect);
        };
        collect(node);
        arrays = found;
      }
      ts.forEachChild(node, visit);
    };
    visit(file);
    return json({ argument: argument === undefined ? "<none>" : argument.getText(file), initializer, arrays, verb });
  },
  W3: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, number> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, leafHits(`${name}.ts`, body).length]));
    return json({
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => leafHits(module.name, module.source).map(hit => `${module.name}:${hit}`)),
      caught: read(LEAF_CAUGHT),
      quiet: read(LEAF_QUIET),
    });
  },
  U1: async () => {
    const modules = srcModules();
    const read = (bodies: Readonly<Record<string, string>>): Record<string, string[]> =>
      Object.fromEntries(Object.entries(bodies).map(([name, body]) => [name, nameHits(body)]));
    return json({
      needles: NEEDLES,
      floor: modules.length >= SRC_FLOOR,
      hits: modules.flatMap(module => nameHits(module.source).map(needle => `${module.name}|${needle}`)),
      caught: read(NAME_CAUGHT),
      quiet: read(NAME_QUIET),
    });
  },
  U2: async () => {
    const registry = await nativeRegistry();
    const injected = injectedRegistry();
    return json({
      native: rfReadings(registry),
      injected: rfReadings(injected),
      explain: [...explainFindings(registry), ...explainFindings(injected)],
      planted: explainFindings(plantedRegistry()),
    });
  },
  U3: async () => {
    const modules = srcModules();
    const structures = modules.map(module => ({ module: module.name, structure: sourceStructure(REPO, module.name) }));
    const manifest = object(JSON.parse(readFileSync(join(REPO, "package.json"), "utf8")), "package.json");
    const maps = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"].map(key => (isObject(manifest[key]) ? manifest[key] : {}));
    const entries = maps.flatMap(map => Object.entries(map).map(([name, spec]) => [name, String(spec)] as const));
    return json({
      floor: modules.length >= SRC_FLOOR,
      unread: structures.filter(entry => !entry.structure.ok).map(entry => entry.module),
      imports: structures.flatMap(entry => entry.structure.imports.filter(found => rfPackage(found.module)).map(found => `${entry.module}|${found.kind}|${found.module}`)),
      manifest: entries.length > 0 && typeof manifest.name === "string",
      packages: [String(manifest.name), ...entries.map(([name]) => name)].filter(rfPackage),
      specs: entries.filter(([, spec]) => rfSpec(spec)).map(([name, spec]) => `${name}|${spec}`),
      missed: [...PACKAGE_CAUGHT.filter(name => !rfPackage(name)), ...SPEC_CAUGHT.filter(spec => !rfSpec(spec))],
      quiet: [...PACKAGE_QUIET.filter(rfPackage), ...SPEC_QUIET.filter(rfSpec)],
    });
  },
  Q1: async () => json(Object.fromEntries(Object.entries(COMPOSED_PROBES).map(([name, body]) => [name, leafHits(`${name}.ts`, body)]))),
  Q2: async () =>
    json({
      wrapper: scanReading(scanSpawns("launch.ts", WRAPPER_MODULE)),
      caller: scanReading(scanSpawns("caller.ts", WRAPPED_CALLER)),
      callerLeafHits: leafHits("caller.ts", WRAPPED_CALLER),
    }),
  Q3: async () => {
    const roots = [...new Set(srcModules().map(module => module.name.split("/")[0] ?? ""))];
    return json({ roots, scan: scanReading(scanSpawns("local-provider.ts", LOCAL_PROVIDER)), leafHits: leafHits("local-provider.ts", LOCAL_PROVIDER) });
  },
  Q4: async () => {
    const word = new RegExp(`(?<![A-Za-z0-9_])${EXCLUDED_FIELDS[0] ?? "<none>"}(?![A-Za-z0-9_])`);
    return json({
      excluded: EXCLUDED_FIELDS,
      needle: NEEDLES.some(needle => EXCLUDED_FIELDS.includes(needle)),
      probe: nameHits(COMMON_WORD_PROBE),
      spelled: srcModules().filter(module => word.test(module.source)).length >= 1,
    });
  },
};

describe("wb-2j3.10 rf graph explain truncation census (RFCLI-PERFORMANCE-MATHEMATICAL-OPTIMIZATION-R11, standing leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's STATEMENT and ACCEPTANCE and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["G:3", "W:3", "U:3", "Q:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        leaf: LEAF,
        flag: FLAG,
        fields: FIELDS,
        excluded: EXCLUDED_FIELDS,
        revision: REVISION_MEMBER,
        citedPin: CITED_PIN,
        pending: PENDING,
        pendingAcceptance: PENDING_ACCEPTANCE,
        tiles: TILES,
        separators: SEPARATORS,
        srcFloor: SRC_FLOOR,
        calls: CHILD_PROCESS_CALLS,
        shellCalls: SHELL_CALLS,
        valueOptions: RF_VALUE_OPTIONS,
        packageWords: RF_PACKAGE_WORDS,
        spawnControls: SPAWN_CONTROLS,
        leafCaught: LEAF_CAUGHT,
        leafQuiet: LEAF_QUIET,
        nameCaught: NAME_CAUGHT,
        nameQuiet: NAME_QUIET,
        planted: PLANTED_DESCRIPTOR,
        packageCaught: PACKAGE_CAUGHT,
        packageQuiet: PACKAGE_QUIET,
        specCaught: SPEC_CAUGHT,
        specQuiet: SPEC_QUIET,
        composed: COMPOSED_PROBES,
        wrapped: [WRAPPER_MODULE, WRAPPED_CALLER],
        localProvider: LOCAL_PROVIDER,
        commonWord: COMMON_WORD_PROBE,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const description = exportDescription();
    expect(description.length, `${BEAD}'s description was read from the tracker export`).toBeGreaterThan(0);
    const statement = between(description, HEADS.statement, HEADS.rationale);
    expect(statement, "the rows' labels and the PENDING clause tile the STATEMENT, in order, with its own separators").toBe(tiled(ROWS));
    expect(acceptanceItems(between(description, HEADS.acceptance, HEADS.surfaces)), "the ACCEPTANCE is exactly the two pending on-landing items").toStrictEqual([
      ...PENDING_ACCEPTANCE,
    ]);
    const spelled = /shipping rf (\w+) (\w+) (--[a-z-]+) with (\w+)\/(\w+) fields \(absent from \1\.\2\.schema\.json:(\d+)-(\d+)@([0-9a-f]+)\)/.exec(statement);
    expect(spelled?.slice(1), "the STATEMENT spells the leaf, the flag, the two fields and the cited lines at the pin").toStrictEqual([
      ...LEAF.split("."),
      FLAG,
      ...FIELDS,
      ...CITED_PIN.lines.map(String),
      CITED_PIN.rfcli,
    ]);
    expect({ rfcli: CAPTURE.pin.rfcli, lines: [...CAPTURE.pin.lines] }, "the capture read the pin and the lines the STATEMENT cites").toStrictEqual({
      rfcli: CITED_PIN.rfcli,
      lines: [...CITED_PIN.lines],
    });
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
