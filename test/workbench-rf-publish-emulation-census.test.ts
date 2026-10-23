/**
 * wb-hs2j.6 (RF-REACTIVE-CONTEXT-ASSEMBLY-R7, program-triage-2026-10-22), the absent-today leg. Statement (bead title): "If
 * Pi ever needs rf graph/assembly publication, no Pi surface shall emulate the gated publish by writing the workspace TOML or any
 * direct store write under that name (gated: assembly publish, README C2 'P1 gated; DO NOT CLAIM SHIPPED'; gated
 * publish/rollback leaves refuse with metadata.gates per RFCLI rfc-9n4dr, open, unshipped) - pin
 * docs/programs/reactive-context-assembly-2026-10-18/02-swarm-usage-and-command-grammar.md:56@6a251bf73af5".
 *
 * SOURCE (read-only git show at ReactiveFiberCLI 6a251bf73af5 by the cutting seat): 02-swarm-usage-and-command-grammar.md:56
 * "`publish` is gated/not established in this build; do not emulate it with a direct TOML write under that name.";
 * README.md:60 "### C2. assembly publish (P1 gated; DO NOT CLAIM SHIPPED)" and :61 "publication must not be silently
 * simulated by writing the TOML file."; BEADS-2026-10-21.md:60 "`rfc-9n4dr` | open | gated publish/rollback/optic leaves
 * refuse with metadata.gates".
 *
 * MEASURED AT THE PIN (same read): src/reactive_fiber_cli/cli/gates.py:286-297 holds every form of graph publish and graph
 * rollback under gate SCG-A3 (GatedSurface rows; probe_argv `graph publish --candidate c --expect-head 1` and `graph rollback
 * --to b --expect-head 1`), and refusal_diagnostic (:346-371) answers exit 2 with code RF_USAGE_NOT_IMPLEMENTED, message
 * "<surface> is not available in this build" and metadata exactly {surface, gates, planned_slice} on a leaf that still carries
 * planned_slice 17. rf keeps its workspace under ".reactive-fiber" (domain/workspace/locator.py:33); its definition documents
 * are TOML (layout.py:81 DEFINITION_SUFFIX ".toml"; graphs/context.toml :83, lenses/workspace.toml :86, the
 * components/manifests and components/declarative <id>.toml files :73-76, views/<id>.toml :92-95) and the backend store's own
 * files sit in the same directory (layout.py:57-65, jsonl or dolt).
 *
 * MEASURED ON THE HOST (2026-10-23T03:33:22Z; the installed rf 0.1.832 at commit 2618c211be0d, the build the landed
 * test/fixtures/rf-version-leaves.json captured): test/fixtures/rf-publish-gate-refusals.json holds rf's answers to the two
 * probe argv and to `rf --json assembly publish --candidate c`, each run in an empty scratch directory that stayed empty. graph
 * publish and graph rollback exit 2 with the SCG-A3 refusal; assembly publish exits 2 with RF_USAGE_UNKNOWN_COMMAND (assembly
 * is no rf command group). rf-version-leaves.json lists graph.publish and graph.rollback served false, planned_slice 17,
 * availability refusing_slice, and no assembly leaf.
 *
 * MEASURED AT BASE (2a26385, landing 272): src is 115 .ts files; no src file spells ".reactive-fiber" or ".toml"; src's one rf
 * launch is the spawn in nativeReactiveFiberRender (providers/reactivefiber.ts), its argv renderArgv's context render ...
 * --no-commit; isRfEnvelope admits only a context.render envelope, so the captured graph.publish refusal is refused as a
 * transport error, and the gate diagnostic on a context.render failure envelope becomes CapabilityError unavailable "RF render
 * refused: RF_USAGE_NOT_IMPLEMENTED", the code kept verbatim and the metadata dropped.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; the labels of A, B and C are the owner
 * filing's acceptance clauses, verbatim):
 *  A, acceptance (a). A1 an AST scan of every src module for a write-family call (WRITE_CALLS, import aliases from node:fs
 *    resolved) whose arguments spell an rf workspace or TOML path (RF_STORE_PATH): none, with a floor of real write sites the
 *    scan must see; A2 every regular file below src, read as text (comments included): none spells RF_STORE_PATH, the walk
 *    held to an independent recursive listing; A3 the rf paths (every src file naming the reactive fiber stem or holding the
 *    string literal "rf"; a floor of five) declare no identifier and no string or template literal spelling the publish stem;
 *    A4 the served surface (the native and the four injected registrations, and the Claude tool names) spells neither the
 *    publish stem nor RF_STORE_PATH, and its reactivefiber.* descriptors are the preview, effectClass read; A5 through a
 *    stand-in rf (the ONLY PATH entry) both input arms of the native preview leave a seeded rf workspace (manifest, graph,
 *    lens and config TOML, a store journal) byte-identical.
 *  B, acceptance (b). B1 the capture is the producer's refusal (exit 2, ok false, result null, one RF_USAGE_NOT_IMPLEMENTED
 *    diagnostic with metadata {surface, gates [SCG-A3], planned_slice 17}; assembly unknown) and agrees with the landed
 *    registry capture; B2 no Pi request against a publication leaf exists: no src argv array holds graph or assembly followed
 *    (anywhere later in the array) by publish or rollback, no src literal spells one (LEAF_SPELLING), and the rf launch roster
 *    is the one render spawn, with the render argv seen; B3 the captured publish and rollback refusals, replayed by the stand-in rf, reach the native preview
 *    as a transport refusal, never a value; B4 the same gate diagnostic on a context.render failure envelope is refused
 *    unavailable with RF_USAGE_NOT_IMPLEMENTED verbatim; B5 through the real curated capability_invoke tool each reply is
 *    isError with kind rejected, never returned; B6 relayFindings, the rule a future publish request must meet (no simulated
 *    success, and the code, the surface, the gates and the planned slice carried), on four constructed replies.
 *  C, acceptance (c). C1 every regular file below docs, examples and new-feedback and the repo-root Markdown, line by line:
 *    no line presents a publication leaf as served (lineVerdict), with the five landed wb-a9l2.8 receipt mentions as the floor;
 *    C2 every regular file below test and qa: no JSON object or string value, module object literal or text line presents one as served
 *    (servedObject, lineVerdict), with the two registry rows and the capture's refusals as the floor.
 *  M, the matchers: M1 LEAF_SPELLING and the argv run; M2 PUBLICATION_MENTION and lineVerdict; M3 RF_STORE_PATH; M4 the
 *    write-call scan on planted shapes; M5 servedObject on planted rows and envelopes.
 *  R, the named residuals, each a pinned quiet row (the escape stays uncaught; the row reds when that changes): Q1
 *    R-COMPOSED a path, leaf or writer assembled at runtime from parts or reached through a value binding is invisible to the
 *    text and call scans (A5 is the runtime backstop for the read path only); Q2 R-INPUT-PATH a write whose target arrives as
 *    input names no rf path to A1 or A2; Q3 R-SPLIT-LINE a mention and its served word on two lines are read apart; Q4
 *    R-ANY-MARKER a not-served marker anywhere on a line admits it, whatever the marker qualifies; Q5 R-OUTSIDE-VOCABULARY a
 *    served claim worded outside the vocabularies is not read as served: publication named outside the graph|assembly
 *    spellings is no mention, and a claim word outside SERVED_WORDS (a table cell "yes") leaves a mention named; Q6
 *    R-MODULE-FIXTURE in a module C2 reads object literals only: a row or envelope built through a helper call, and a served
 *    claim in a plain string literal, are not read; Q7 R-GATES-UNCARRIED (a finding, not an escape) the one rf wrapper keeps the
 *    gate code and drops the surface, the gates and the planned slice, so relayFindings over today's capability_invoke reply
 *    reads gates-dropped, slice-dropped and surface-dropped (and the curated reply bounds a rejected diagnostic to its first 100
 *    bytes, claude-capability-tools.ts run, so a verbatim relay through capability_invoke also needs that bound widened); a
 *    future publish request reusing that path would not meet (b), and the row reds once the wrapper carries them (then (b) is
 *    re-stated).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the out-of-file roster
 * test/fixtures/rf-publish-emulation-roster.json holds every row's id, label and pins, every pin's witness, the residual names
 * and the vocabularies, so a pin deleted, relabelled, swapped for another passing case or removed from every literal of this
 * file at once still reds against it; the wb-hs2j.6 row of the tracked bead export (.beads/issues.jsonl) states the acceptance
 * clauses rows A, B and C hold their labels to; A1-A5 and B2-B5 read src itself; B1 reads both captures.
 * SCOPE: the quotes and gate rows are producer facts at 6a251bf73af5 and the refusals are the installed 0.1.832's; Pi vendors no
 * rf source, so a producer change is seen only when an rf pin-bump re-captures. Modules are AST-read only when their text spells
 * a publication leaf (an object literal naming one must spell it). The armed half - a Pi publication request that relays the
 * gate refusal verbatim - waits for a committing rf capability (wb-jwc.5, owner-reserved); none is added to src.
 *
 * Display paths added: none. Test-only: the stand-in rf and the seeded rf workspace live in makeScratch scratch; src, docs,
 * the fixtures and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry } from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const BEAD = "wb-hs2j.6";
const ROSTER_PATH = join(HERE, "fixtures", "rf-publish-emulation-roster.json");
const CAPTURE_PATH = join(HERE, "fixtures", "rf-publish-gate-refusals.json");
const LEAVES_PATH = join(HERE, "fixtures", "rf-version-leaves.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PROVIDER = join(SRC, "workbench", "providers", "reactivefiber.ts");
const PREVIEW_ID = "reactivefiber.render.preview";
const ROOT = process.cwd();

/** The two gated publication leaves (gates.py:286-297), their one gate and their planned slice at the pin. */
const PUBLICATION_LEAVES = ["graph.publish", "graph.rollback"];
const GATE_IDS = ["SCG-A3"];
const PLANNED_SLICE = 17;
const GATE_CODE = "RF_USAGE_NOT_IMPLEMENTED";
const UNKNOWN_CODE = "RF_USAGE_UNKNOWN_COMMAND";
/** The proposed C2 verb (README.md:60): rf registers no assembly command group. */
const PROPOSED_GROUP = "assembly";
/** The write-family callees A1 reads (fs and fs/promises names; import aliases resolve to these). */
const WRITE_CALLS = [
  "appendFile", "appendFileSync", "copyFile", "copyFileSync", "cp", "cpSync", "createWriteStream", "link", "linkSync",
  "mkdir", "mkdirSync", "open", "openSync", "rename", "renameSync", "rm", "rmSync", "rmdir", "rmdirSync", "symlink",
  "symlinkSync", "truncate", "truncateSync", "unlink", "unlinkSync", "writeFile", "writeFileSync",
];
/** The real write sites A1 must see (positive controls on src itself), as module:callee. */
const WRITE_FLOOR = [
  "src/index.ts:unlinkSync", "src/output-file.ts:appendFileSync", "src/schedule-store.ts:renameSync", "src/settings.ts:writeFileSync",
  "src/workbench/hosts/local-detached.ts:openSync", "src/workflow/journal.ts:appendFileSync",
];
/** The rf paths A3 must find (the provider, its observer and the modules that carry the rf environment, registration and evidence). */
const RF_PATH_FLOOR = [
  "src/workbench/native-modules.ts", "src/workbench/process-env.ts", "src/workbench/providers/reactivefiber.ts",
  "src/workbench/reactivefiber-observer.ts", "src/workflow/reconcile.ts",
];
/** lineVerdict's closed vocabularies: whole words, any case. */
const SERVED_WORDS = ["available", "established", "live", "released", "runnable", "served", "serves", "serving", "shipped", "ships", "supported", "supports", "works"];
const NOT_SERVED_MARKERS = [
  "absent", "aren't", "can't", "cannot", "doesn't", "don't", "false", "forbidden", "gated", "isn't", "never", "no", "not",
  "pending", "planned", "prohibited", "proposed", "refusal", "refused", "refuses", "refusing", "unavailable", "unserved",
  "unshipped", "unsupported", "won't",
];

/* ---------------------------------------------------------------------------------------------------------------------------
 * The matchers.
 * ------------------------------------------------------------------------------------------------------------------------- */

/** A publication leaf as a literal spells it: graph or assembly, a run of white space, ".", "_" or "-", publish or rollback; whole words, any case. */
const LEAF_SPELLING = /(?<![A-Za-z0-9])(?:graph|assembly)[\s._-]+(?:publish|rollback)(?![A-Za-z0-9])/i;
const RUN_HEAD = /^(?:graph|assembly)$/i;
const RUN_VERB = /^(?:publish|rollback)$/i;
/** A docs or fixture mention: graph or assembly, a joint (white space, ".", "_", "-" or "/"), then a word beginning publish, publication or rollback. */
const PUBLICATION_MENTION = /(?<![A-Za-z0-9])(?:graph|assembly)[\s._/-]+(?:publish|publication|rollback)/i;
/** An rf command line naming a publication leaf: rf, any flags (each with an optional value), then the two words. */
const COMMAND_FORM = /(?<![A-Za-z0-9_-])rf(?:\s+--?[A-Za-z][\w-]*(?:(?:=|\s+)(?!-)[^\s`'"]+)?)*\s+(?:graph|assembly)\s+(?:publish|rollback)(?![A-Za-z0-9])/i;
const wordsPattern = (words: readonly string[]): RegExp => new RegExp(`(?<![A-Za-z0-9'])(?:${words.join("|")})(?![A-Za-z0-9'])`, "i");
const SERVED = wordsPattern(SERVED_WORDS);
const NOT_SERVED = wordsPattern(NOT_SERVED_MARKERS);
/** rf's workspace directory (locator.py:33) or a TOML document (layout.py:81), any case. */
const RF_STORE_PATH = /\.reactive-fiber(?![A-Za-z0-9-])|\.toml(?![A-Za-z0-9])/i;
/** The publish stem A3 and A4 read: publish, publication and every affix form. */
const PUBLISH_STEM = /publish|publication/i;
/** The reactive fiber stem A3 selects the rf paths by. */
const RF_STEM = /reactive[\s_-]?fiber/i;

type LineVerdict = "none" | "named" | "negated" | "served";
/** One line: no mention; a mention with a not-served marker (negated); with a served word or an rf command form (served); else named. */
function lineVerdict(line: string): LineVerdict {
  if (!PUBLICATION_MENTION.test(line)) return "none";
  if (NOT_SERVED.test(line)) return "negated";
  return SERVED.test(line) || COMMAND_FORM.test(line) ? "served" : "named";
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The judged rows; their shape is pinned below and held to the roster.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) no Pi code path writes rf workspace TOML or store files to effect a graph/assembly publication (a grep of Pi rf paths finds no TOML/store write under a publish name)",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) a Pi request against a gated publish leaf surfaces the typed gate refusal (exit 2 RF_USAGE_NOT_IMPLEMENTED / metadata.gates) verbatim, never a simulated success",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(c) no Pi doc or fixture presents publish as served",
    pins: ["C1", "C2"],
  },
  {
    id: "M",
    label: "the matchers rows A, B and C read catch every spelling family they name and leave the near misses clean",
    pins: ["M1", "M2", "M3", "M4", "M5"],
  },
  {
    id: "R",
    label: "the named residuals, each a pinned quiet row that reds when its escape stops being quiet",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"],
  },
];
const RESIDUALS: Readonly<Record<string, string>> = {
  Q1: "R-COMPOSED",
  Q2: "R-INPUT-PATH",
  Q3: "R-SPLIT-LINE",
  Q4: "R-ANY-MARKER",
  Q5: "R-OUTSIDE-VOCABULARY",
  Q6: "R-MODULE-FIXTURE",
  Q7: "R-GATES-UNCARRIED",
};

/* ---------------------------------------------------------------------------------------------------------------------------
 * The out-of-file anchors: the roster, the captures and the bead export.
 * ------------------------------------------------------------------------------------------------------------------------- */

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function stringsOf(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function asJson(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
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
interface Roster {
  readonly publicationLeaves: readonly string[];
  readonly gateIds: readonly string[];
  readonly plannedSlice: number;
  readonly writeCalls: readonly string[];
  readonly servedWords: readonly string[];
  readonly notServedMarkers: readonly string[];
  readonly residuals: Readonly<Record<string, string>>;
  readonly rows: readonly RosterRow[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function parseRoster(text: string): Roster {
  const raw: unknown = JSON.parse(text);
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.residuals) || typeof raw.plannedSlice !== "number") {
    throw new Error("the roster must be an object with rows, residuals and plannedSlice");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: asJson(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const residuals: Record<string, string> = {};
  for (const [pin, name] of Object.entries(raw.residuals)) {
    if (typeof name !== "string") throw new Error(`roster residual ${pin} must name a family`);
    residuals[pin] = name;
  }
  return {
    publicationLeaves: stringsOf(raw.publicationLeaves, "roster publicationLeaves"),
    gateIds: stringsOf(raw.gateIds, "roster gateIds"),
    plannedSlice: raw.plannedSlice,
    writeCalls: stringsOf(raw.writeCalls, "roster writeCalls"),
    servedWords: stringsOf(raw.servedWords, "roster servedWords"),
    notServedMarkers: stringsOf(raw.notServedMarkers, "roster notServedMarkers"),
    residuals,
    rows,
  };
}
let rosterCache: Roster | undefined;
/** Read on first use, so a missing or malformed roster reds every case that needs it rather than the file's collection. */
function roster(): Roster {
  rosterCache ??= parseRoster(readFileSync(ROSTER_PATH, "utf8"));
  return rosterCache;
}
function rosterWitness(pin: string): Json {
  const found = roster().rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The owner filing's acceptance clauses (a), (b) and (c), read from the wb-hs2j.6 row of the tracked bead export. */
function exportClauses(text: string): string[] {
  for (const line of text.split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (!isObject(row) || row.id !== BEAD || typeof row.notes !== "string") continue;
    const match = /Acceptance: \(a\) (.+?); \(b\) (.+?); \(c\) (.+?)\.\nNot P0: /s.exec(row.notes);
    if (match === null) throw new Error(`the ${BEAD} export row carries no (a)/(b)/(c) acceptance sentence`);
    return [`(a) ${match[1]}`, `(b) ${match[2]}`, `(c) ${match[3]}`];
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}

interface Diagnostic {
  readonly code: string;
  readonly severity: string;
  readonly message: string;
  readonly metadata: { readonly [key: string]: unknown };
}
interface Refusal {
  readonly argv: readonly string[];
  readonly exit: number;
  readonly stderrBytes: number;
  readonly stdout: JsonObject;
  readonly diagnostic: Diagnostic;
}
interface Capture {
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly cwdEntriesAfter: number;
  readonly refusals: readonly Refusal[];
}
function readCapture(): Capture {
  const raw: unknown = JSON.parse(readFileSync(CAPTURE_PATH, "utf8"));
  if (!isObject(raw) || raw.source !== "captured" || typeof raw.rfVersion !== "string" || typeof raw.rfCommit !== "string" ||
    typeof raw.cwdEntriesAfter !== "number" || !Array.isArray(raw.refusals)) throw new Error("the capture must be a captured rf refusal set");
  const refusals = raw.refusals.map((entry: unknown, index: number): Refusal => {
    if (!isObject(entry) || typeof entry.exit !== "number" || typeof entry.stderrBytes !== "number" || !isObject(entry.stdout)) {
      throw new Error(`capture refusals[${index}] needs an exit, a stderr size and a stdout object`);
    }
    const diagnostics = entry.stdout.diagnostics;
    const first: unknown = Array.isArray(diagnostics) ? diagnostics[0] : undefined;
    if (!Array.isArray(diagnostics) || diagnostics.length !== 1 || !isObject(first) || typeof first.code !== "string" ||
      typeof first.severity !== "string" || typeof first.message !== "string" || !isObject(first.metadata)) {
      throw new Error(`capture refusals[${index}] must carry exactly one diagnostic`);
    }
    const diagnostic: Diagnostic = { code: first.code, severity: first.severity, message: first.message, metadata: first.metadata };
    return { argv: stringsOf(entry.argv, `capture refusals[${index}].argv`), exit: entry.exit, stderrBytes: entry.stderrBytes, stdout: asJson(entry.stdout) as JsonObject, diagnostic };
  });
  return { rfVersion: raw.rfVersion, rfCommit: raw.rfCommit, cwdEntriesAfter: raw.cwdEntriesAfter, refusals };
}
function refusalFor(capture: Capture, verb: string): Refusal {
  const found = capture.refusals.find(entry => entry.argv.slice(1, 3).join(" ") === verb);
  if (found === undefined) throw new Error(`the capture holds no ${verb} refusal`);
  return found;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Walkers and source readers.
 * ------------------------------------------------------------------------------------------------------------------------- */

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing. */
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
  return files.sort();
}
/** The same set by node's own recursive listing: the control that holds filesBelow to every regular file at every depth. */
function listedBelow(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name))
    .sort();
}
const repoPath = (path: string): string => relative(REPO, path);
const MODULE = /\.(?:[cm]?ts|[cm]?js)$/;

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
/** Every string, template and no-substitution literal text below a node, template parts joined by a space. */
function literalTexts(node: ts.Node): string[] {
  const texts: string[] = [];
  const visit = (at: ts.Node): void => {
    if (ts.isStringLiteralLike(at)) texts.push(at.text);
    else if (ts.isTemplateExpression(at)) texts.push([at.head.text, ...at.templateSpans.map(span => span.literal.text)].join(" "));
    ts.forEachChild(at, visit);
  };
  visit(node);
  return texts;
}
const FS_MODULE = /^(?:node:)?fs(?:\/promises)?$/;
/** The local names one module binds to WRITE_CALLS members from node:fs (named imports and destructured import()/require() bindings). */
function writeAliases(source: ts.SourceFile): Map<string, string> {
  const aliases = new Map<string, string>();
  const bind = (original: string, local: string): void => {
    if (WRITE_CALLS.includes(original)) aliases.set(local, original);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && FS_MODULE.test(node.moduleSpecifier.text)) {
      const bindings = node.importClause?.namedBindings;
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) bind((element.propertyName ?? element.name).text, element.name.text);
      }
    }
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined) {
      const loads = literalTexts(node.initializer).some(text => FS_MODULE.test(text));
      if (loads) {
        for (const element of node.name.elements) {
          const property = element.propertyName ?? element.name;
          if (ts.isIdentifier(property) && ts.isIdentifier(element.name)) bind(property.text, element.name.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return aliases;
}
interface WriteScan {
  readonly sites: string[];
  readonly rfTargets: string[];
}
/** One module's write-family calls (by name or a resolved alias) and those whose arguments spell RF_STORE_PATH. */
function scanWrites(fileName: string, text: string): WriteScan {
  const source = parse(fileName, text);
  const aliases = writeAliases(source);
  const sites: string[] = [];
  const rfTargets: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const writer = name === undefined ? undefined : (aliases.get(name) ?? (WRITE_CALLS.includes(name) ? name : undefined));
      if (writer !== undefined) {
        sites.push(`${fileName}:${writer}`);
        if (node.arguments.some(argument => literalTexts(argument).some(literal => RF_STORE_PATH.test(literal)))) {
          rfTargets.push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}:${writer}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { sites, rfTargets };
}
/** One module's identifiers and string or template literals spelling the publish stem (comments are not read). */
function publishNames(fileName: string, text: string): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && PUBLISH_STEM.test(node.text)) found.push(`${fileName}: ${node.text}`);
    for (const literal of ts.isStringLiteralLike(node) || ts.isTemplateExpression(node) ? literalTexts(node) : []) {
      if (PUBLISH_STEM.test(literal)) found.push(`${fileName}: ${JSON.stringify(literal)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return [...new Set(found)];
}
function holdsRfLiteral(fileName: string, text: string): boolean {
  let holds = false;
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && node.text === "rf") holds = true;
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return holds;
}
interface RequestScan {
  readonly argvRuns: string[];
  readonly literals: string[];
  readonly renderArgv: number;
}
/** One module's publication requests: an argv array holding graph or assembly and, anywhere after it, publish or rollback, or a literal spelling one. */
function scanRequests(fileName: string, text: string): RequestScan {
  const argvRuns: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (elements.some((element, index) => RUN_HEAD.test(element) && elements.slice(index + 1).some(next => RUN_VERB.test(next)))) argvRuns.push(`${fileName}: [${elements.join(", ")}]`);
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node) && LEAF_SPELLING.test(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const joined = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (LEAF_SPELLING.test(joined)) literals.push(`${fileName}: ${joined}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return { argvRuns, literals, renderArgv };
}
const LAUNCH_NAMES = ["exec", "execFile", "execFileSync", "execSync", "fork", "spawn", "spawnSync"];
/** One module's process launches of the literal binary "rf", each named by its enclosing function. */
function rfLaunchSites(fileName: string, text: string): string[] {
  const sites: string[] = [];
  const enclosing = (node: ts.Node): string => {
    for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
      if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    }
    return "<module>";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node);
      const first = node.arguments[0];
      if (name !== undefined && LAUNCH_NAMES.includes(name) && first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") {
        sites.push(`${fileName}:${enclosing(node)}:${name}`);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return sites;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The served-presentation scan (row C2): objects naming a publication leaf whose fields state it served.
 * ------------------------------------------------------------------------------------------------------------------------- */

/** The keys an object names a leaf under (a registry row's path, an envelope's command, a diagnostic's surface, an id or a leaf). */
const NAMING_KEYS = ["command", "id", "leaf", "path", "surface"];
type Fields = Readonly<Record<string, string | boolean | null>>;
/** A publication object's verdict: served when it states served true, ok true, reachable true or availability served_reachable. */
function servedObject(fields: Fields): "served" | "unserved" | undefined {
  const names = NAMING_KEYS.map(key => fields[key]).filter((value): value is string => typeof value === "string");
  if (!names.some(name => LEAF_SPELLING.test(name))) return undefined;
  const served = fields.served === true || fields.ok === true || fields.reachable === true || fields.availability === "served_reachable";
  return served ? "served" : "unserved";
}
interface Presentation {
  readonly served: string[];
  readonly unserved: string[];
}
/** Every object of a parsed JSON document, and every string value through lineVerdict. */
function scanJson(fileName: string, value: unknown, into: Presentation, at = "$"): void {
  if (typeof value === "string") {
    if (lineVerdict(value) === "served") into.served.push(`${fileName}:${at}: ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      scanJson(fileName, item, into, `${at}[${index}]`);
    });
    return;
  }
  if (!isObject(value)) return;
  const fields: Record<string, string | boolean | null> = {};
  for (const [key, field] of Object.entries(value)) {
    if (typeof field === "string" || typeof field === "boolean" || field === null) fields[key] = field;
  }
  const verdict = servedObject(fields);
  const name = NAMING_KEYS.map(key => fields[key]).find(field => typeof field === "string" && LEAF_SPELLING.test(field));
  if (verdict !== undefined) into[verdict].push(`${fileName}:${at}:${String(name)}`);
  for (const [key, field] of Object.entries(value)) scanJson(fileName, field, into, `${at}.${key}`);
}
/** Every object literal of a module whose literal properties name a publication leaf. */
function scanModuleObjects(fileName: string, text: string, into: Presentation): void {
  const source = parse(fileName, text);
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      const fields: Record<string, string | boolean | null> = {};
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
        const init = property.initializer;
        if (key === undefined) continue;
        if (ts.isStringLiteralLike(init)) fields[key] = init.text;
        else if (init.kind === ts.SyntaxKind.TrueKeyword) fields[key] = true;
        else if (init.kind === ts.SyntaxKind.FalseKeyword) fields[key] = false;
      }
      const verdict = servedObject(fields);
      if (verdict !== undefined) into[verdict].push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart()).line + 1}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}
function scanLines(fileName: string, text: string, into: Presentation): void {
  text.split("\n").forEach((line, index) => {
    if (lineVerdict(line) === "served") into.served.push(`${fileName}:${index + 1}: ${line.trim()}`);
  });
}
/** C2's reader for one fixture file: JSON parsed (text lines when it does not parse), modules AST-read when they spell a leaf, the rest as text. */
function scanFixture(path: string, into: Presentation, unparsed: string[]): void {
  const fileName = repoPath(path);
  const text = readFileSync(path, "utf8");
  if (fileName.endsWith(".json")) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      unparsed.push(fileName);
      scanLines(fileName, text, into);
      return;
    }
    scanJson(fileName, parsed, into);
    return;
  }
  if (MODULE.test(fileName)) {
    if (LEAF_SPELLING.test(text)) scanModuleObjects(fileName, text, into);
    return;
  }
  scanLines(fileName, text, into);
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The stand-in rf (rows A5, B3-B5): the ONLY PATH entry, it logs one argv line per spawn, prints a reply and exits.
 * ------------------------------------------------------------------------------------------------------------------------- */

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: Array<() => Promise<void>> = [];
afterEach(async () => {
  for (const close of closers.splice(0)) await close();
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function scratchDir(prefix: string): string {
  const dir = makeScratch(prefix);
  scratches.push(dir);
  return realpathSync(dir);
}
interface Recorder {
  readonly root: string;
  readonly log: string;
}
function recorder(reply: (root: string) => Json, exit: number): Recorder {
  const root = scratchDir("rf-publish-emulation-root-");
  const bin = scratchDir("rf-publish-emulation-bin-");
  const log = join(bin, "spawns.jsonl");
  const script = join(bin, "rf");
  writeFileSync(
    script,
    [
      `#!${process.execPath}`,
      `require("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(reply(root)))});`,
      `process.exitCode = ${exit};`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = bin;
  return { root, log };
}
function spawnsOf(record: Recorder): Json {
  if (!existsSync(record.log)) return [];
  return readFileSync(record.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => stringsOf(JSON.parse(line), "spawn argv").map(token => (token === record.root ? "<root>" : token)));
}
const invokeContext = () => ({ grants: ["reactivefiber:render"], signal: new AbortController().signal });
const LEGACY_INPUT = { model: "model-fixture", task: "task-fixture" };
const VIEW_INPUT = { view: "swarm.worker", taskId: "bead-fixture-000" };
function nativeRegistry(root: string): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, root);
  return registry;
}
async function refusalFrom(call: Promise<unknown>): Promise<{ category: string; message: string }> {
  const caught: unknown = await call.then(
    () => undefined,
    (error: unknown) => error,
  );
  if (!(caught instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(caught)}`);
  return { category: caught.category, message: caught.message };
}
/** The captured stdout with only its command replaced: the gate diagnostic carried on a context.render failure envelope. */
function onRenderEnvelope(refusal: Refusal): Json {
  return { ...refusal.stdout, command: "context.render" };
}

interface ToolReply {
  readonly isError: boolean;
  readonly payload: Json;
}
/** The real curated MCP server behind a real MCP client, exposing only the preview. */
async function curated(registry: CapabilityRegistry, root: string): Promise<(input: Json) => Promise<ToolReply>> {
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, "reactivefiber:render"],
    principal: { id: "census-user", role: "reviewer" },
    workspace: root,
    invocationId: "rf-publish-emulation-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-publish-emulation-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return async input => {
    const result = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: PREVIEW_ID, capabilityVersion: "1.0.0", input } });
    const content: unknown = result.content;
    const first: unknown = Array.isArray(content) ? content[0] : undefined;
    if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
    return { isError: result.isError === true, payload: JSON.parse(first.text) as Json };
  };
}

/**
 * The relay rule a future Pi publish request must meet (acceptance (b)): its reply is a refusal, never a simulated success, and
 * it carries the gate code, the surface, every gate id and the planned slice of the captured refusal. A success reply is judged
 * on that alone.
 */
function relayFindings(refusal: Refusal, reply: ToolReply): string[] {
  const payload = reply.payload;
  if (!reply.isError || !isObject(payload) || payload.kind !== "rejected") return ["simulated-success"];
  const text = JSON.stringify(payload);
  const findings: string[] = [];
  if (!text.includes(refusal.diagnostic.code)) findings.push("code-dropped");
  if (!GATE_IDS.every(gate => text.includes(gate))) findings.push("gates-dropped");
  if (!new RegExp(`planned[_ ]slice\\D{0,4}${PLANNED_SLICE}(?!\\d)`).test(text)) findings.push("slice-dropped");
  const surface = refusal.diagnostic.metadata.surface;
  if (typeof surface !== "string" || !text.includes(surface)) findings.push("surface-dropped");
  return findings;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The served surface (row A4): the native registration and the four injected ones, each with a reader that is never invoked.
 * ------------------------------------------------------------------------------------------------------------------------- */

const neverInvoked = (what: string) => (): never => {
  throw new Error(`census ${what}: never invoked, registration only stores the descriptor`);
};
async function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, ROOT);
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
function injectedDescriptors(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, { gate: { status: neverInvoked("forge reader") } }, "0.0.0-census");
  registerFurnaceRunInspect(registry, { runs: { get: neverInvoked("furnace reader") } }, ROOT);
  registerHyperUnixFind(registry, { find: neverInvoked("hyperunix find"), runtime: neverInvoked("hyperunix runtime"), close: async () => {} }, ROOT);
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("census rf reader: never invoked")), ROOT);
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The seeded rf workspace (row A5) and its byte snapshot.
 * ------------------------------------------------------------------------------------------------------------------------- */

const SEEDED: Readonly<Record<string, string>> = {
  "manifest.json": '{"schema": "reactive-fiber.workspace/v1"}\n',
  "graphs/context.toml": 'schema = "reactive-fiber.graph/v1"\n',
  "lenses/workspace.toml": 'schema = "reactive-fiber.lenses/v1"\n',
  "config.toml": "[workspace]\n",
  "store/journal-000001.jsonl": '{"seq": 1}\n',
};
function seedWorkspace(root: string): void {
  for (const [path, body] of Object.entries(SEEDED)) {
    const target = join(root, ".reactive-fiber", path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, body);
  }
}
function snapshot(root: string): string[] {
  return listedBelow(root).map(path => `${relative(root, path)}:${createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 16)}`);
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The matcher tables (row M) and the residual spellings (row R).
 * ------------------------------------------------------------------------------------------------------------------------- */

const digestOf = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 16);
/** M1: LEAF_SPELLING over literal texts, and the argv run over arrays. */
const LEAF_CASES: ReadonlyArray<readonly [string, boolean]> = [
  ["graph publish", true], ["graph.publish", true], ["graph_publish", true], ["graph-publish", true], ["GRAPH PUBLISH", true],
  ["graph  rollback", true], ["reactivefiber.graph.publish", true], ["rf --json graph publish --candidate c", true],
  ["assembly publish", true], ["assembly.publish", true], ["Assembly-Rollback", true],
  ["graph publisher", false], ["subgraph publish", false], ["graph show", false], ["context render", false], ["publish", false],
  ["graph.publishing", false], ["npm publish", false],
];
const RUN_CASES: ReadonlyArray<readonly [readonly string[], boolean]> = [
  [["graph", "publish"], true], [["--json", "GRAPH", "rollback"], true], [["assembly", "publish", "--candidate", "c"], true],
  [["graph", "--json", "publish"], true],
  [["context", "render", "--no-commit"], false], [["graph", "show"], false], [["publish", "graph"], false],
];
/** M2: lineVerdict over lines, one of each verdict and the command form. */
const LINE_CASES: ReadonlyArray<readonly [string, LineVerdict]> = [
  ["rf graph publish is served in this build", "served"],
  ["Publish with `rf graph publish --candidate c1 --expect-head 3`.", "served"],
  ["Run `rf --workspace /srv/ws graph rollback --to b` to restore.", "served"],
  ["assembly publish ships with 0.1.832", "served"],
  ["Graph.Publish is available to swarm seats", "served"],
  ["graph publish is not available in this build", "negated"],
  ["### C2. assembly publish (P1 gated; DO NOT CLAIM SHIPPED)", "negated"],
  ["graph rollback refuses with RF_USAGE_NOT_IMPLEMENTED", "negated"],
  ["assembly publication must never be simulated by a TOML write", "negated"],
  ["- Leaf graph.publish: mutates (registry.py:893)", "named"],
  ["a second rf capability naming graph.publish", "named"],
  ["the published feature matrix", "none"],
  ["subgraph publishing is served", "none"],
  ["npm publish is available", "none"],
];
/** M3: RF_STORE_PATH over literal texts. */
const STORE_CASES: ReadonlyArray<readonly [string, boolean]> = [
  [".reactive-fiber", true], [".reactive-fiber/graphs/context.toml", true], ["graphs/context.toml", true], ["lenses/workspace.toml", true],
  ["config.local.toml", true], ["VIEWS/WORKER.TOML", true], ["/srv/ws/.reactive-fiber/store/journal-000001.jsonl", true],
  ["reactive-fiber.cli/v1", false], ["context.tomlx", false], ["tomlkit", false], [".reactive-fibers", false], ["TOML-FIRST", false],
];
/** A template substitution as source text (dollar, brace, name, brace), built from parts so no string literal here holds one. */
const sub = (name: string): string => ["$", "{", name, "}"].join("");
/** M4: the write-call scan over planted modules: [module text, rfTargets, write sites] each must yield. */
const WRITE_CASES: ReadonlyArray<readonly [string, number, number]> = [
  ['import { writeFileSync } from "node:fs";\nwriteFileSync(join(root, ".reactive-fiber", "graphs", "context.toml"), text);', 1, 1],
  [`import { promises } from "node:fs";\nawait promises.writeFile(\`${sub("root")}/lenses/workspace.toml\`, text);`, 1, 1],
  ['import { appendFileSync as put } from "node:fs";\nput(join(ws, ".reactive-fiber", "store", "journal.jsonl"), row);', 1, 1],
  ['const { renameSync: move } = await import("node:fs");\nmove(staged, join(ws, ".reactive-fiber", "graphs", "context.toml"));', 1, 1],
  ['import * as fs from "node:fs";\nfs.createWriteStream(join(ws, "config.local.toml"));', 1, 1],
  ['import { cpSync } from "node:fs";\ncpSync(staged, ".reactive-fiber", { recursive: true });', 1, 1],
  ['import { readFileSync } from "node:fs";\nreadFileSync(join(ws, ".reactive-fiber", "graphs", "context.toml"), "utf8");', 0, 0],
  ['import { writeFileSync } from "node:fs";\nwriteFileSync(join(home, "settings.json"), text);', 0, 1],
];
/** M5: servedObject over planted JSON documents and modules: [kind, text, served count, unserved count]. */
const OBJECT_CASES: ReadonlyArray<readonly ["json" | "module", string, number, number]> = [
  ["json", '{"path": "graph.publish", "served": true}', 1, 0],
  ["json", '{"schema": "reactive-fiber.cli/v1", "ok": true, "command": "graph.publish", "result": {}}', 1, 0],
  ["json", '{"leaves": [{"path": "graph.rollback", "served": false, "availability": "served_reachable"}]}', 1, 0],
  ["module", 'const envelope = { command: "assembly.publish", ok: true };', 1, 0],
  ["module", 'const row = { "path": "graph publish", reachable: true };', 1, 0],
  ["json", '{"path": "graph.publish", "served": false, "availability": "refusing_slice"}', 0, 1],
  ["json", '{"ok": false, "command": "graph.rollback", "result": null}', 0, 1],
  ["json", '{"ok": true, "command": "context.render"}', 0, 0],
];
function objectCase(kind: "json" | "module", text: string): Presentation {
  const into: Presentation = { served: [], unserved: [] };
  if (kind === "json") scanJson("case.json", JSON.parse(text), into);
  else scanModuleObjects("case.ts", text, into);
  return into;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Each pin's case: it asserts its own outcome and returns the witness the roster holds for it.
 * ------------------------------------------------------------------------------------------------------------------------- */

const srcFiles = (): string[] => filesBelow(SRC);
const srcModules = (): string[] => srcFiles().filter(file => file.endsWith(".ts"));
const DOC_ROOTS = ["docs", "examples", "new-feedback"];
function docFiles(): string[] {
  const rootMarkdown = readdirSync(REPO, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .map(entry => join(REPO, entry.name));
  return [...DOC_ROOTS.flatMap(root => filesBelow(join(REPO, root))), ...rootMarkdown].sort();
}
const DOC_FLOOR = ["docs/workbench/receipts/wb-a9l2.8.md:9", "docs/workbench/receipts/wb-a9l2.8.md:16", "docs/workbench/receipts/wb-a9l2.8.md:34", "docs/workbench/receipts/wb-a9l2.8.md:36", "docs/workbench/receipts/wb-a9l2.8.md:47"];
const FIXTURE_ROOTS = ["test", "qa"];
const FIXTURE_FLOOR_FILES = ["test/fixtures/rf-publish-gate-refusals.json", "test/fixtures/rf-version-leaves.json"];

const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const scans = srcModules().map(file => scanWrites(repoPath(file), readFileSync(file, "utf8")));
    const sites = new Set(scans.flatMap(scan => scan.sites));
    const rfTargets = scans.flatMap(scan => scan.rfTargets);
    const floorSeen = WRITE_FLOOR.filter(site => sites.has(site));
    expect(floorSeen).toEqual(WRITE_FLOOR);
    expect(rfTargets).toEqual([]);
    return { floorSeen, rfTargets };
  },
  A2: async () => {
    const files = srcFiles();
    const walkComplete = JSON.stringify(files) === JSON.stringify(listedBelow(SRC));
    const hits = files.flatMap(file => readFileSync(file, "utf8").split("\n").flatMap((line, index) => (RF_STORE_PATH.test(line) ? [`${repoPath(file)}:${index + 1}`] : [])));
    const anchor = readFileSync(PROVIDER, "utf8").includes("--no-commit");
    expect(walkComplete).toBe(true);
    expect(files.length).toBeGreaterThanOrEqual(100);
    expect(anchor).toBe(true);
    expect(hits).toEqual([]);
    return { walkComplete, atFloor: files.length >= 100, anchor, hits };
  },
  A3: async () => {
    const paths = srcFiles().filter(file => {
      const text = readFileSync(file, "utf8");
      return RF_STEM.test(text) || holdsRfLiteral(repoPath(file), text);
    });
    const rfPaths = paths.map(repoPath);
    const publishNamed = paths.flatMap(file => publishNames(repoPath(file), readFileSync(file, "utf8")));
    const floorSeen = RF_PATH_FLOOR.filter(path => rfPaths.includes(path));
    expect(floorSeen).toEqual(RF_PATH_FLOOR);
    expect(publishNamed).toEqual([]);
    return { rfPaths, floorSeen, publishNamed };
  },
  A4: async () => {
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const all = [...native, ...injected];
    const publishNamed = all.filter(descriptor => PUBLISH_STEM.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    const storePaths = all.filter(descriptor => RF_STORE_PATH.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    const rfOf = (descriptors: readonly CapabilityDescriptor[]): string[] =>
      descriptors.filter(descriptor => descriptor.id.startsWith("reactivefiber.")).map(descriptor => `${descriptor.id}:${descriptor.effectClass}`);
    const tools = [...CLAUDE_CAPABILITY_TOOL_NAMES];
    const toolsNamed = tools.filter(name => PUBLISH_STEM.test(name) || RF_STORE_PATH.test(name));
    expect(rfOf(native)).toEqual([`${PREVIEW_ID}:read`]);
    expect(rfOf(injected)).toEqual([`${PREVIEW_ID}:read`]);
    expect(publishNamed).toEqual([]);
    expect(storePaths).toEqual([]);
    expect(toolsNamed).toEqual([]);
    return { native: rfOf(native), injected: rfOf(injected), descriptorsRead: all.length >= 5, publishNamed, storePaths, tools, toolsNamed };
  },
  A5: async () => {
    const record = recorder(root => fullShapeRf(root), 0);
    seedWorkspace(record.root);
    const before = snapshot(record.root);
    const registry = nativeRegistry(record.root);
    const contracts: Json[] = [];
    for (const input of [LEGACY_INPUT, VIEW_INPUT]) {
      const value: unknown = await registry.invoke(PREVIEW_ID, input, invokeContext());
      contracts.push(isObject(value) && typeof value.contract === "string" ? value.contract : null);
    }
    const after = snapshot(record.root);
    expect(after).toEqual(before);
    expect(contracts).toEqual(["reactivefiber.render.preview/v1", "reactivefiber.render.preview/v1"]);
    return { entries: before.map(entry => entry.split(":")[0] ?? entry), unchanged: JSON.stringify(after) === JSON.stringify(before), contracts, spawns: spawnsOf(record) };
  },
  B1: async () => {
    const capture = readCapture();
    const leaves: unknown = JSON.parse(readFileSync(LEAVES_PATH, "utf8"));
    if (!isObject(leaves) || !isObject(leaves.envelope) || !isObject(leaves.envelope.result) || !Array.isArray(leaves.envelope.result.leaves)) {
      throw new Error("rf-version-leaves.json must carry envelope.result.leaves");
    }
    const rows = leaves.envelope.result.leaves.filter(isObject);
    const gated = PUBLICATION_LEAVES.map(leaf => {
      const refusal = refusalFor(capture, leaf.replace(".", " "));
      const out = refusal.stdout;
      return {
        leaf, exit: refusal.exit, stderrBytes: refusal.stderrBytes, ok: out.ok ?? null, command: out.command ?? null, result: out.result ?? null,
        workspace: out.workspace ?? null, code: refusal.diagnostic.code, severity: refusal.diagnostic.severity, message: refusal.diagnostic.message,
        metadata: asJson(refusal.diagnostic.metadata),
      };
    });
    const unregistered = refusalFor(capture, `${PROPOSED_GROUP} publish`);
    const choices = stringsOf(unregistered.diagnostic.metadata.choices, "assembly refusal choices");
    const registry = rows
      .filter(row => typeof row.path === "string" && (PUBLICATION_LEAVES.includes(row.path) || row.path.startsWith(`${PROPOSED_GROUP}.`)))
      .map(row => ({ path: String(row.path), served: row.served === true, plannedSlice: typeof row.planned_slice === "number" ? row.planned_slice : null, availability: String(row.availability) }));
    for (const entry of gated) {
      expect(entry.exit).toBe(2);
      expect(entry.ok).toBe(false);
      expect(entry.code).toBe(GATE_CODE);
      expect(entry.metadata).toStrictEqual({ surface: entry.leaf.replace(".", " "), gates: GATE_IDS, planned_slice: PLANNED_SLICE });
    }
    expect(unregistered.diagnostic.code).toBe(UNKNOWN_CODE);
    expect(choices).not.toContain(PROPOSED_GROUP);
    expect(registry.map(row => `${row.path}:${row.served}`)).toEqual(PUBLICATION_LEAVES.map(leaf => `${leaf}:false`));
    expect(capture.rfVersion).toBe(leaves.rfVersion);
    expect(capture.cwdEntriesAfter).toBe(0);
    return {
      rfVersion: capture.rfVersion, sameBuildAsRegistry: capture.rfVersion === leaves.rfVersion && capture.rfCommit === leaves.rfCommit, cwdEntriesAfter: capture.cwdEntriesAfter,
      gated, unregistered: { exit: unregistered.exit, ok: unregistered.stdout.ok ?? null, command: unregistered.stdout.command ?? null, code: unregistered.diagnostic.code, groupListed: choices.includes(PROPOSED_GROUP) },
      registry,
    };
  },
  B2: async () => {
    const modules = srcModules();
    const scans = modules.map(file => scanRequests(repoPath(file), readFileSync(file, "utf8")));
    const launches = modules.flatMap(file => rfLaunchSites(repoPath(file), readFileSync(file, "utf8")));
    const argvRuns = scans.flatMap(scan => scan.argvRuns);
    const literals = scans.flatMap(scan => scan.literals);
    const renderArgv = scans.reduce((sum, scan) => sum + scan.renderArgv, 0);
    expect(argvRuns).toEqual([]);
    expect(literals).toEqual([]);
    expect(launches).toEqual(["src/workbench/providers/reactivefiber.ts:nativeReactiveFiberRender:spawn"]);
    expect(renderArgv).toBe(1);
    return { argvRuns, literals, launches, renderArgv };
  },
  B3: async () => {
    const capture = readCapture();
    const answers: Json[] = [];
    for (const leaf of PUBLICATION_LEAVES) {
      const refusal = refusalFor(capture, leaf.replace(".", " "));
      const record = recorder(() => refusal.stdout, refusal.exit);
      const refused = await refusalFrom(nativeRegistry(record.root).invoke(PREVIEW_ID, LEGACY_INPUT, invokeContext()));
      expect(refused.category).toBe("transport");
      answers.push({ leaf, refused, spawns: spawnsOf(record) });
    }
    return answers;
  },
  B4: async () => {
    const capture = readCapture();
    const answers: Json[] = [];
    for (const leaf of PUBLICATION_LEAVES) {
      const refusal = refusalFor(capture, leaf.replace(".", " "));
      const record = recorder(() => onRenderEnvelope(refusal), refusal.exit);
      const refused = await refusalFrom(nativeRegistry(record.root).invoke(PREVIEW_ID, VIEW_INPUT, invokeContext()));
      expect(refused).toStrictEqual({ category: "unavailable", message: `RF render refused: ${GATE_CODE}` });
      answers.push({ leaf, refused, spawns: spawnsOf(record) });
    }
    return answers;
  },
  B5: async () => {
    const refusal = refusalFor(readCapture(), "graph publish");
    const replies: Json[] = [];
    for (const reply of [() => refusal.stdout, () => onRenderEnvelope(refusal)]) {
      const record = recorder(reply, refusal.exit);
      const call = await curated(nativeRegistry(record.root), record.root);
      const answer = await call(LEGACY_INPUT);
      expect(answer.isError).toBe(true);
      expect(isObject(answer.payload) ? answer.payload.kind : null).toBe("rejected");
      replies.push({ isError: answer.isError, payload: answer.payload, spawns: spawnsOf(record) });
    }
    return replies;
  },
  B6: async () => {
    const refusal = refusalFor(readCapture(), "graph publish");
    const diagnostic = asJson(refusal.stdout.diagnostics);
    const cases: ReadonlyArray<readonly [string, ToolReply]> = [
      ["returned", { isError: false, payload: { kind: "returned", value: { published: true } } }],
      ["code-only", { isError: true, payload: { kind: "rejected", category: "unavailable", diagnostic: `RF render refused: ${GATE_CODE}` } }],
      ["verbatim", { isError: true, payload: { kind: "rejected", category: "unavailable", diagnostic } }],
      ["no-code", { isError: true, payload: { kind: "rejected", category: "transport", diagnostic: "RF preview returned an unrecognized native envelope." } }],
    ];
    const findings = cases.map(([name, reply]) => ({ name, findings: relayFindings(refusal, reply) }));
    expect(findings.map(entry => entry.findings.length)).toEqual([1, 3, 0, 4]);
    return findings;
  },
  C1: async () => {
    const files = docFiles();
    const walkComplete = DOC_ROOTS.every(root => JSON.stringify(filesBelow(join(REPO, root))) === JSON.stringify(listedBelow(join(REPO, root))));
    const verdicts = new Map<string, LineVerdict>();
    for (const file of files) {
      readFileSync(file, "utf8").split("\n").forEach((line, index) => {
        const verdict = lineVerdict(line);
        if (verdict !== "none") verdicts.set(`${repoPath(file)}:${index + 1}`, verdict);
      });
    }
    const served = [...verdicts].filter(([, verdict]) => verdict === "served").map(([at]) => at);
    const floor = DOC_FLOOR.map(at => ({ at, verdict: verdicts.get(at) ?? "none" }));
    expect(walkComplete).toBe(true);
    expect(floor.every(entry => entry.verdict === "named" || entry.verdict === "negated")).toBe(true);
    expect(served).toEqual([]);
    return { walkComplete, rootMarkdown: files.filter(file => dirname(file) === REPO).map(repoPath), floor, served };
  },
  C2: async () => {
    const files = FIXTURE_ROOTS.flatMap(root => filesBelow(join(REPO, root)));
    const walkComplete = FIXTURE_ROOTS.every(root => JSON.stringify(filesBelow(join(REPO, root))) === JSON.stringify(listedBelow(join(REPO, root))));
    const into: Presentation = { served: [], unserved: [] };
    const unparsed: string[] = [];
    for (const file of files) scanFixture(file, into, unparsed);
    const floor = into.unserved.filter(entry => FIXTURE_FLOOR_FILES.some(file => entry.startsWith(`${file}:`)));
    expect(walkComplete).toBe(true);
    expect(floor.length).toBeGreaterThanOrEqual(4);
    expect(unparsed).toEqual([]);
    expect(into.served).toEqual([]);
    return { walkComplete, floor, unparsed, served: into.served };
  },
  M1: async () => {
    const leaf = LEAF_CASES.map(([text, hit]) => ({ digest: digestOf(text), hit: LEAF_SPELLING.test(text), expected: hit }));
    const runs = RUN_CASES.map(([argv, hit]) => {
      const scan = scanRequests("case.ts", `const argv = ${JSON.stringify(argv)};`);
      return { digest: digestOf(argv.join(" ")), hit: scan.argvRuns.length === 1, expected: hit };
    });
    for (const entry of [...leaf, ...runs]) expect(entry.hit).toBe(entry.expected);
    return { leaf: leaf.map(({ digest, hit }) => [digest, hit]), runs: runs.map(({ digest, hit }) => [digest, hit]) };
  },
  M2: async () => {
    const lines = LINE_CASES.map(([text, expected]) => ({ digest: digestOf(text), verdict: lineVerdict(text), expected }));
    for (const entry of lines) expect(entry.verdict).toBe(entry.expected);
    return lines.map(({ digest, verdict }) => [digest, verdict]);
  },
  M3: async () => {
    const paths = STORE_CASES.map(([text, hit]) => ({ digest: digestOf(text), hit: RF_STORE_PATH.test(text), expected: hit }));
    for (const entry of paths) expect(entry.hit).toBe(entry.expected);
    return paths.map(({ digest, hit }) => [digest, hit]);
  },
  M4: async () => {
    const writes = WRITE_CASES.map(([text, targets, sites]) => {
      const scan = scanWrites("case.ts", text);
      return { digest: digestOf(text), targets: scan.rfTargets.length, sites: scan.sites.length, expected: [targets, sites] };
    });
    for (const entry of writes) expect([entry.targets, entry.sites]).toEqual(entry.expected);
    return writes.map(({ digest, targets, sites }) => [digest, targets, sites]);
  },
  M5: async () => {
    const objects = OBJECT_CASES.map(([kind, text, served, unserved]) => {
      const found = objectCase(kind, text);
      return { digest: digestOf(text), served: found.served.length, unserved: found.unserved.length, expected: [served, unserved] };
    });
    for (const entry of objects) expect([entry.served, entry.unserved]).toEqual(entry.expected);
    return objects.map(({ digest, served, unserved }) => [digest, served, unserved]);
  },
  Q1: async () => {
    const composedPath = scanWrites("case.ts", 'import { writeFileSync } from "node:fs";\nconst ext = "." + "to" + "ml";\nwriteFileSync(join(root, "graphs", "context" + ext), text);').rfTargets.length;
    const boundWriter = scanWrites("case.ts", 'import * as fs from "node:fs";\nconst put = fs.writeFileSync;\nput(target, text);').sites.length;
    const composedLeaf = scanRequests("case.ts", 'const argv = ["graph", "pub" + "lish"];').argvRuns.length;
    expect([composedPath, boundWriter, composedLeaf]).toEqual([0, 0, 0]);
    return { composedPath, boundWriter, composedLeaf };
  },
  Q2: async () => {
    const text = 'import { writeFileSync } from "node:fs";\nexport function save(target: string, body: string): void { writeFileSync(target, body); }';
    const scan = scanWrites("case.ts", text);
    const literal = RF_STORE_PATH.test(text);
    expect([scan.sites.length, scan.rfTargets.length, literal]).toEqual([1, 0, false]);
    return { sites: scan.sites.length, rfTargets: scan.rfTargets.length, literal };
  },
  Q3: async () => {
    const verdicts = "the graph publish leaf\nis served in this build".split("\n").map(lineVerdict);
    expect(verdicts).toEqual(["named", "none"]);
    return verdicts;
  },
  Q4: async () => {
    const verdict = lineVerdict("graph publish is served; only the optic leaves are gated");
    expect(verdict).toBe("negated");
    return verdict;
  },
  Q5: async () => {
    const verdicts = ["rf now promotes candidates to the published head, served in this build", "| graph.publish | yes |"].map(lineVerdict);
    expect(verdicts).toEqual(["none", "named"]);
    return verdicts;
  },
  Q6: async () => {
    const found = objectCase("module", 'const row = leaf("graph.publish", true);\nconst envelope = succeeded("graph.publish");\nconst claim = "graph publish is served in this build";');
    expect([found.served.length, found.unserved.length]).toEqual([0, 0]);
    return { served: found.served.length, unserved: found.unserved.length };
  },
  Q7: async () => {
    const refusal = refusalFor(readCapture(), "graph publish");
    const record = recorder(() => onRenderEnvelope(refusal), refusal.exit);
    const call = await curated(nativeRegistry(record.root), record.root);
    const reply = await call(LEGACY_INPUT);
    const findings = relayFindings(refusal, reply);
    expect(findings).toEqual(["gates-dropped", "slice-dropped", "surface-dropped"]);
    return findings;
  },
};

describe("wb-hs2j.6 rf publish emulation census (RF-REACTIVE-CONTEXT-ASSEMBLY-R7, absent-today leg)", () => {
  it("the frozen shape (standing rule 16): every judged row and its pin count", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:6", "C:2", "M:5", "R:7"]);
  });

  it("the owner filing's acceptance clauses (a), (b) and (c) in the tracked bead export are rows A, B and C's labels", () => {
    expect(ROWS.slice(0, 3).map(row => row.label)).toEqual(exportClauses(readFileSync(EXPORT_PATH, "utf8")));
  });

  it("every judged pin has exactly one case", () => {
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });

  it("the out-of-file roster holds every row, label, pin, residual and vocabulary of this file", () => {
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      roster().rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect({ ...RESIDUALS }).toStrictEqual({ ...roster().residuals });
    expect({
      publicationLeaves: PUBLICATION_LEAVES, gateIds: GATE_IDS, plannedSlice: PLANNED_SLICE, writeCalls: WRITE_CALLS, servedWords: SERVED_WORDS, notServedMarkers: NOT_SERVED_MARKERS,
    }).toStrictEqual({
      publicationLeaves: [...roster().publicationLeaves], gateIds: [...roster().gateIds], plannedSlice: roster().plannedSlice, writeCalls: [...roster().writeCalls],
      servedWords: [...roster().servedWords], notServedMarkers: [...roster().notServedMarkers],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }
});
