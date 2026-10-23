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
 *
 * READINGS
 * - TRIGGER (row T): the obligation binds once Pi reads a committed render's instance blocks. Today Pi's one rf reader
 *   (src/workbench/providers/reactivefiber.ts) spawns `context render ... --no-commit` and admits only render_id null, so no
 *   Pi surface holds a RENDER id, and no src module builds a context show argv or registers a descriptor naming one.
 * - PROBE RULE (a): the selector is served only when the reply to `context show RENDER --instance ID --json` is ok, names
 *   command context.show and states result.selection with an integer matched; any other reply reads not-served, with its
 *   reason (wrong-command, refused:<first diagnostic code>, no-selection).
 * - ARGV RULE (a): an argv array that names context show (adjacent "context", "show" elements) admits, after "show", exactly
 *   one RENDER positional (a literal not starting with "-", or any non-literal element), --json, --redact and --detail LEVEL
 *   (LEVEL one of the measured levels compact and full, or a non-literal); --instance and its ID only while the probe reads
 *   served. Findings: instance-unserved, outside-admitted:<flag>, level:<value>, level:missing, render-count:<n>. The global
 *   prefix before "context" (Pi's --workspace ROOT) is outside the leaf's set.
 * - PROJECTION RULE (b)(c): a reply projects rows only when it is ok, exits 0, names context.show, states
 *   result.selection.matched 1 and every result.blocks row's component_instance_id equals the requested id; the rows are the
 *   producer's, verbatim. A failure reply at exit 3 whose first diagnostic code ends _NOT_FOUND is typed not-found; any other
 *   failure is refused; a reply stating no selection is unavailable (selector-unserved). Every outcome but projected surfaces
 *   zero rows: the whole envelope never.
 * OUTSIDE ANCHORS. F1: the owner filing row of wb-pfxo.9 in the tracked bead export (.beads/issues.jsonl) carries every pinned
 * constant verbatim, its acceptance sentence names exactly the clauses rows A-C cover, and each of rows A-C's labels equals
 * its clause there. The out-of-file roster test/fixtures/rf-context-show-instance-roster.json holds every row's id, label and
 * pins, every pin's witness, the pinned constants and the measured replies, so a pin deleted, relabelled, swapped or removed
 * from every literal of this file at once still reds against it. FROZEN SHAPE (standing rule 16): ROWS pins
 * `${id}:${pins.length}` as a literal.
 * RESIDUALS (named; each has a pinned quiet row in row R): R1 RUNTIME-COMPOSED - an argv element or literal composed at run
 * time from parts is invisible to the src scans of rows T, A and B; R2 COMMENTS - a src comment naming the leaf, the selector
 * or the row key is not read; R3 ECHOED-SELECTION - the probe rule reads one reply's shape, so a reply that states selection
 * without narrowing its rows reads served (the projection rule's foreign-row check of B3 is the backstop); R4
 * NOT-FOUND-SPELLING - the not-found typing reads the producer code's _NOT_FOUND suffix, and the landed unknown-instance code
 * is unspecified at the pin ("unknown id exit 3 ..."), so an exit-3 code without that suffix reads refused; R5
 * CATEGORY-BY-MESSAGE - Pi's capability errors have no not-found category: the reader types an rf refusal 'unavailable' and
 * carries the producer's not-found code only in its message; R6 DESCRIPTOR-ID - row T's descriptor scan reads descriptor text
 * for the leaf, the selector and the row key, so a registration under another id whose text names none of them is not caught
 * (A4 asks for the leaf by the reactivefiber.<leaf> id convention of wb-a9l2.7).
 * SCOPE: the three rules are this cut's reading of the filing; the producer facts above are measured at the builds named and
 * are not re-read here (the census is hermetic: no rf runs, the stand-in rf answers from the roster). docs are not read: the
 * acceptance clauses name the argv builder, the projection and the exit-3 typing. A later cut that adds a context show reader
 * flips row T, re-measures the probe from a build that serves the selector and brings its receipt.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
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
    pins: ["MP1", "MP2", "MP3", "MA1", "MA2", "MA3", "MA4", "MA5", "MA6", "MA7", "MJ1", "MJ2", "MJ3", "MJ4", "MS1", "MS2", "MS3", "MS4", "MS5", "MS6", "MS7"],
  },
  {
    id: "R",
    label: "the named residuals R1-R6 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6"],
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
type ReplyName = "probe" | "show" | "unknown" | "renderRefusal";
const REPLY_NAMES: readonly ReplyName[] = ["probe", "show", "unknown", "renderRefusal"];
interface Measured {
  readonly build: string;
  readonly usage: string;
  readonly replies: Readonly<Record<ReplyName, MeasuredReply>>;
  /** The committed render's own fields, as rf 0.1.832 stated them. */
  readonly committed: { readonly render_id: string; readonly ephemeral: boolean; readonly commit_seq: number };
}
interface Roster {
  readonly constants: Json;
  readonly measured: Measured;
  readonly rows: readonly RosterRow[];
}

function readReply(measured: { [key: string]: unknown }, name: ReplyName): MeasuredReply {
  const entry = measured[name];
  if (!isObject(entry) || !Array.isArray(entry.argv) || !entry.argv.every(item => typeof item === "string") || typeof entry.exit !== "number" || !Object.hasOwn(entry, "envelope")) {
    throw new Error(`roster measured.${name} needs a string argv, an exit and an envelope`);
  }
  return { argv: entry.argv.map(String), exit: entry.exit, envelope: JSON.parse(JSON.stringify(entry.envelope)) as Json };
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
    },
    rows,
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
  /** The elements after "show": a string literal's text, or null for any other element. */
  readonly tail: readonly (string | null)[];
}
interface Scan {
  readonly showArgv: readonly ShowArgv[];
  readonly renderArgv: number;
  readonly showLiterals: readonly string[];
  readonly selectorLiterals: readonly string[];
  readonly instanceReads: readonly string[];
}
/** One module's context show argv arrays, its context render argv count and its literals or names reaching the selector. */
function scanSource(fileName: string, text: string): Scan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const showArgv: ShowArgv[] = [];
  const showLiterals: string[] = [];
  const selectorLiterals: string[] = [];
  const instanceReads: string[] = [];
  let renderArgv = 0;
  const at = (node: ts.Node): string => `${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      const show = elements.findIndex((element, index) => element === "context" && elements[index + 1] === "show");
      if (show >= 0) showArgv.push({ at: at(node), tail: elements.slice(show + 2) });
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
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
    if (ts.isPropertyAccessExpression(node) && node.name.text === "matched" && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "selection") {
      instanceReads.push(`${at(node)} selection.matched`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { showArgv, renderArgv, showLiterals, selectorLiterals, instanceReads };
}

let srcCache: { files: number; scans: Scan[] } | undefined;
/** Every src module scanned once. */
function srcScans(): { files: number; scans: Scan[] } {
  if (srcCache === undefined) {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    srcCache = { files: files.length, scans: files.map(file => scanSource(relative(REPO, file), textOf(file))) };
  }
  return srcCache;
}
/** The src walk's floor and its non-vacuity: it reached the live context render argv of the rf reader. */
function srcWalk(): { srcFloorMet: boolean; renderArgvSeen: boolean } {
  const { files, scans } = srcScans();
  const walk = { srcFloorMet: files >= SRC_FLOOR, renderArgvSeen: scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1 };
  expect(walk, `src modules walked: ${files}, floor ${SRC_FLOOR}`).toStrictEqual({ srcFloorMet: true, renderArgvSeen: true });
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
  { pin: "MS1", kind: "scan", text: 'spawn("rf", ["--workspace", w, "context", "show", r, "--json"]);', outcome: { showArgv: [[]], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS2", kind: "scan", text: 'const leaf = "context.show";', outcome: { showArgv: [], renderArgv: 0, showLiterals: 1, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS3", kind: "scan", text: ["const cmd = `rf context  show $", "{r} --json`;"].join(""), outcome: { showArgv: [], renderArgv: 0, showLiterals: 1, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS4", kind: "scan", text: 'const flag = "--instance";', outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 1, instanceReads: 0 } },
  { pin: "MS5", kind: "scan", text: "const id = row.component_instance_id; const hit = reply.selection.matched;", outcome: { showArgv: [], renderArgv: 0, showLiterals: 0, selectorLiterals: 0, instanceReads: 2 } },
  { pin: "MS6", kind: "scan", text: 'const argv = ["context", "render", "--no-commit"];', outcome: { showArgv: [], renderArgv: 1, showLiterals: 0, selectorLiterals: 0, instanceReads: 0 } },
  { pin: "MS7", kind: "scan", text: 'spawn("rf", ["context", "show", r, "--instance", i]);', outcome: { showArgv: [["instance-unserved"]], renderArgv: 0, showLiterals: 0, selectorLiterals: 1, instanceReads: 0 } },
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

describe("wb-pfxo.9 context show instance census (RF-COMPOSITIONAL-ASSEMBLY-R10, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:5", "A:4", "B:3", "C:3", "F:1", "M:21", "R:6"]);
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
