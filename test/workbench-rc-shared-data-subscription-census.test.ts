/**
 * wb-5ltg.2 (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R2, program-triage-2026-10-22), a census with two until-then legs. Statement
 * (the owner filing's full statement, the producer's name written <SDK>): "If Pi ever subscribes to <SDK> shared reactive data
 * (gated RC-IF-02/RC-IF-04; unshipped at 640a3b579a95), Pi subscribes only to authorized materialized values carrying the named
 * typed data-output port, source digest/revision, audience, producer identity, freshness and diagnostics, never to a Python
 * closure, and treats interface-viewing authorization and context-disclosure authorization as separate grants, neither implying
 * the other", pinned to the program README.md:12 at 640a3b579a95 (QUOTE in the roster). The acceptance clauses (a)-(c) of the
 * filing sit verbatim in the labels of rows B, C and A.
 *
 * SIBLING DISCIPLINE. The producer's name, its Python package (the key rf's sdk_versions echoes) and its distribution are never
 * spelled joined in this file or its roster, in any case or separator convention: SDK_WORDS holds the two words, every spelling
 * is assembled at run time, and every witness, title and message masks them (<SDK>, <module>). So the queued wb-5ltg.1 census,
 * which reads git's whole file list for those names, reads these two files quiet (measured with its queued cut overlaid, and
 * the queued wb-5ltg.3 census likewise). There is no exemption: A2 judges these two files like every other file of the walk, and
 * A1 leaves them unjudged only as it leaves the whole test tree (R-TEST-TREE). The program's own nouns are never an identifier, a
 * regular expression literal or a name-like literal here either: NOUNS holds each member's words and its pattern as spaced text.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only git show / ls-tree / grep on the local producer checkout, no fetch; and the
 * installed rf). At the program pin 640a3b579a955f84388d7bacd385d13b232a3116 the README (blob ea960adb38e0) reads line 12 as
 * quoted, line 22 "RC-IF-02: stable producer materialization and source/audience provenance for read-only interface
 * subscribers; independently authorize publication." and line 24 "RC-IF-04: ... only once actual Web/TUI hosts are installed
 * consumers."; the producer's 55 src .py modules spell no materialized value, no interface subscriber, no remote component or
 * stream, no publication authorization, no interface view and no context disclosure (a raw grep, any case, words joined by
 * nothing, a space, "_" or "-"); what they do ship is the typed data ports the program keeps (16 modules), the host's change
 * sink wiring (hosting.py:194 subscribe_changes, hosting.py:756 ComponentHost.subscribe: "Subscribe the host's change sink to
 * a publishing lens environment") and the reverse materializer of stored render output (directive_transport.py:670, exported),
 * exactly the two sites the filing names as internal. Re-probed at the checkout's origin/master 01187eb645a5 (21 commits past
 * the pin, 64 src modules): the same README blob and the same zero counts. The distribution the installed rf 0.1.836 (commit
 * b3494ab13397) carries, version 0.1.1.20261018121500 (its sdk_versions echo, the same in the captured catalog
 * test/fixtures/rf-version-leaves.json at rf 0.1.832): 55 modules, the same zero counts. So RC-IF-02 and RC-IF-04 are unshipped.
 * Pi's one path to the producer is rf: the reactivefiber.render.preview provider spawns rf once per call with `--workspace <root>
 * context render <selector> --no-commit --no-input --json`, reads stdout to the child's close and validates one eight-key
 * envelope; the capability registry grants by exact string (discover:<id> lists, inspect:<id> inspects, a descriptor's
 * permissions invoke), and the preview's one permission is reactivefiber:render under both registrations.
 *
 * ROWS (one test per pin, titled by the pin id under its row):
 *  A, acceptance (c) and the trigger, absent today. A1 the nouns: every regular file below the root (SKIPPED_ROOTS skipped at the
 *    root only) is walked; each module (identifiers and regular expressions always; string and template literals, constant-folded
 *    literals and JSX text when name-like, read path segment by path segment; comments never) and each JSON file (its keys always,
 *    its name-like string values, a file that does not parse token by token) outside the test tree (TEST_TREE) spells no member
 *    of NOUNS - the program's subscription, remote-stream and grant nouns - so no product module, script, example or
 *    configuration names one; the walk meets its floors, its anchors, no symlink and nothing unreadable, and its .ts modules below
 *    src/ and test/ are exactly the files tsconfig.test.json's own project lists (the compiler's file list, an anchor outside this
 *    census); the nearest readers (NEAREST_READERS) are reached and quiet. The test tree is walked and anchored but not judged
 *    for nouns: censuses there need these nouns as their own needles (MEASURED: the queued wb-5ltg.3 remote-stream census spells
 *    the RS member at 12 module sites and 9 roster keys), and a Pi subscriber would be product code, which src/ holds (residual
 *    R-TEST-TREE). A2 the loads, over the whole walk, test tree included: no module names the producer in a load position (an
 *    import or export declaration, an import-equals require, an import type, a dynamic import, require, require.resolve or a
 *    created require), no launcher call (LAUNCHERS) takes a Python launch text (an import or from statement, a -m run, an
 *    installer line) or a -m argv pair naming it as an argument, no Python file imports it and no shell script runs it
 *    (SCRIPT_EXTENSIONS), and no manifest (MANIFEST) names it; the echo rf states is read and stays quiet; A3
 *    the launch: src holds exactly one rf launch (scanRfLaunches), in the provider; the captured leaf catalog lists the render
 *    leaf, which names no subscription verb; under a stand-in rf both input arms of the native preview spawn once, on the context
 *    render group with --no-commit, and the child is gone when the call settles; A4 the registry: of the native registration's
 *    descriptors and the injected one's, the rf ones are the preview alone, read-only, one permission, invoke the only mode (no
 *    observe), and the reconcile evidence reads stay the preview; A5 the residuals' pinned quiet rows.
 *  B, acceptance (a), gated. B1 the producer facts in the roster: the (a) nouns (MV, IS, RS) are 0 at the program pin, the probe and
 *    the distribution, the README blob is the same at both refs, the filing's "Shipped: no" sentence and its two internal sites
 *    are read, and the captured catalog echoes the measured distribution; a re-measure that ships the surface flips B1 red until
 *    (a) lands with it. B2 the until-then posture on Pi's one admitted producer-derived value (nothing here simulates a
 *    subscription): the preview admits the full envelope, refuses typed (transport) an envelope lacking any of its eight keys
 *    and every untyped answer (null, a string, a number, a list, text that is not JSON), and refuses typed (validation), before
 *    any spawn, a callable, a closure inside the input and every value that is not JSON.
 *  C, acceptance (b), gated. C1 the producer facts: the (b) nouns (PA, IV, CD) are 0 at all three, README.md:12's own sentence
 *    (interface viewing is not automatically permission to disclose context material or vice versa) and :22's are recorded,
 *    and the filing's merged pin and authority line are read. C2 the until-then posture on the one seam: Pi's viewing grants
 *    (discover:<preview>, inspect:<preview>, workbench:observe), alone or together, never admit the preview, whose call is
 *    the one place rf-rendered context reaches a caller; no derived spelling (DERIVED_GRANTS) admits it; the exact grant does
 *    (one spawn); and the reverse: the preview's grant lists nothing and inspects nothing, while the viewing grants do (the
 *    preview supports no inspect, so that one reads unavailable); the injected seam reads the same.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the producer facts, the owner block's length and digest, the residual families, the registered test
 * titles and each pin's assertion count are held to the out-of-file roster (test/fixtures/rc-shared-data-subscription-roster.json).
 * OUTSIDE ANCHOR: the owner filing in the tracked bead export (.beads/issues.jsonl, row wb-5ltg.2), read as filed: the row's
 * title and its owner block, the byte-exact prefix of its notes the roster measures by length and sha256 (the first 2437
 * characters, lines 1-9, the whole notes at base fa62b12). bd appends every later note after that block (this bead's delivery
 * note, its gate verdicts, landed notes) and every ledger hop exports them, so no reading of the filing sees one: read whole, the
 * appended delivery note spelled CS and flipped its anchor (refusal #1, U1). A block edited in place or cut short is refused,
 * never read through an appended copy, and the judged set pins the quiet row: a note appended after the block, spelling every
 * noun member (CS included) with its own acceptance, quote, Shipped, merged and authority lines, changes no reading. From the
 * block: each acceptance clause sits verbatim in exactly one row label and the trigger in row A's, every row carries one of them,
 * the quote and citation equal the roster's, every noun member but CS reads a phrase of the filing (CS reads the measured
 * producer signature), B1 reads the filing's "Shipped: no" sentence and C1 its merged pin and authority line, so a row removed
 * from every literal of this file and the roster still reds. The walk is anchored by the compiler's project, the launch by the landed scanRfLaunches, the registry by
 * the native registration itself, the eight envelope keys by the shared full-shape fixture (fullShapeRf).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end with its pinned assertion count; no registered title or describe title
 * spells a noun member.
 * NOT CLAIMED: the B2 and C2 legs are this census's reading of Pi's one seam until the producer ships (the filing names no Pi slot
 * for a port name, an audience, a freshness or a producer identity, and the producer defines no grant names); the tool-surface
 * reverse (workflow_observe under the preview's grant alone) is not exercised here; a member removed from every literal of this
 * file and the roster together is anchored only where the filing names it.
 * RESIDUALS (named families, each with pinned quiet rows in A5): R-COMPOSED a noun or a load assembled at run time from parts (this
 * file's own mechanism); R-PATH-SPLIT a noun split across path segments; R-PROSE comments, prose literals and JSON prose values,
 * walked or parsed, never judged; R-INTERRUPTED an invisible code point inside a word; R-LOOKALIKE a look-alike letter;
 * R-ENCODED an encoding the compiler does not cook (ROT13, base64); R-SYNONYM a subscription named outside the family;
 * R-ALIASED-LOADER a loader called under another name; R-OUTSIDE a file below a skipped root entry (in A1's planted tree);
 * R-ECHO the producer's name as the key and path rf's sdk_versions echoes, quiet by design; R-TEST-TREE a noun spelled below
 * test/ (walked, never judged for nouns); R-INDIRECT-LAUNCH a launch text or argv held outside a launcher call's own arguments.
 * SCOPE: the producer facts are read at their refs and Pi vendors no producer source, so a producer change is seen only when a cut
 * re-measures the roster; the roster reader refuses a producer object whose keys differ from the measured set.
 *
 * Display paths added: none. Test-only: the stand-in rf and the planted trees live in makeScratch scratch; src is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { scanRfLaunches } from "./helpers/rf-workspace-family.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_FILE = "test/fixtures/rc-shared-data-subscription-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-5ltg.2";
/** The citation's pin (README.md:12@<pin>); the roster holds the full ref. */
const PROGRAM_PIN = "640a3b579a95";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANT = "reactivefiber:render";
/** The workspace root handed to the provider at registration; the stand-in rf never reads it. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const LEAF_CATALOG = "test/fixtures/rf-version-leaves.json";
const RENDER_LEAF = "context.render";
const PRINCIPAL = { id: "census-principal" } as const;

/** The producer's two name words (SIBLING DISCIPLINE): every spelling of its name is assembled from them at run time. */
const SDK_WORDS: readonly string[] = ["reactive", "components"];
const capitalized = (word: string): string => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
/** The name as the filing's title spells it, and the Python package (the key rf's sdk_versions echoes). */
const SDK_NAME = SDK_WORDS.map(capitalized).join("");
const SDK_MODULE = SDK_WORDS.join("_");
/** The name in any case, its words joined by nothing, white space, "_", "." or "-". */
const TOLERANT_SOURCE = SDK_WORDS.join("[\\s_.-]*");
const SDK_TOLERANT = new RegExp(TOLERANT_SOURCE, "i");
/** A Python launch text loading the producer: an import or from statement, a -m run, an installer line. */
const PYTHON_LOADS: readonly RegExp[] = [
  new RegExp(`(?:^|[\\s;'"(])(?:import|from)\\s+[\\w.]*${TOLERANT_SOURCE}`, "i"),
  new RegExp(`(?:^|\\s)-m\\s+[\\w.]*${TOLERANT_SOURCE}`, "i"),
  new RegExp(`\\b(?:pip3?|pipx|uv|poetry|conda)\\b[^\\n]*${TOLERANT_SOURCE}`, "i"),
];
/** A text with the producer's two spellings written as placeholders, so no witness, title or message carries either. */
function masked(text: string): string {
  return text.split(SDK_NAME).join("<SDK>").split(SDK_MODULE).join("<module>");
}

interface Noun {
  readonly id: string;
  /** One spelling of the member, as words; the controls join them, nothing else does. */
  readonly words: readonly string[];
  /** The member's pattern over a text's words (wordsOf), held as spaced text. */
  readonly source: string;
}
/** The program's subscription, remote-stream and grant nouns (README.md:12, :15, :22 at the pin), plus the producer's own names
 * for its change-sink wiring and its reverse materializer: what a Pi subscriber to the producer's shared data would have to name. */
const NOUNS: readonly Noun[] = [
  { id: "MV", words: ["materialized", "value"], source: "\\bmateriali[sz]ed values?\\b" },
  { id: "IS", words: ["interface", "subscriber"], source: "\\binterface subscri(?:bers?|ptions?|bes?|bing)\\b" },
  { id: "DP", words: ["data", "output", "port"], source: "\\b(?:typed data|data output|data|output) ports?\\b" },
  { id: "RS", words: ["remote", "stream"], source: "\\bremote (?:components?|streams?|outputs?)\\b|\\bcomponent streams?\\b" },
  { id: "PA", words: ["publication", "authorization"], source: "\\bpublication authori[sz](?:ations?|e|ed|es|ing)\\b|\\bauthori[sz](?:e|ed|es|ing) publications?\\b" },
  { id: "CS", words: ["change", "sink"], source: "\\bsubscribe changes\\b|\\bchange sinks?\\b|\\blens change publishers?\\b" },
  { id: "RM", words: ["materialize", "directives"], source: "\\bmateriali[sz]e directives\\b" },
  { id: "IV", words: ["interface", "view"], source: "\\binterface view(?:s|ing|ers?)?\\b" },
  { id: "CD", words: ["context", "disclosure"], source: "\\bcontext disclosures?\\b|\\bdisclos(?:e|es|ed|ing) context\\b" },
];
const NOUN_PATTERNS: ReadonlyMap<string, RegExp> = new Map(NOUNS.map(noun => [noun.id, new RegExp(noun.source)]));
/** The members the producer would ship for (a) and for (b); the others it ships today (DP, CS, RM) or names no gate for. */
const UNSHIPPED_A: readonly string[] = ["MV", "IS", "RS"];
const UNSHIPPED_B: readonly string[] = ["PA", "IV", "CD"];
function nounsIn(words: string): string[] {
  return NOUNS.filter(noun => NOUN_PATTERNS.get(noun.id)?.test(words) === true).map(noun => noun.id);
}
function nounNamed(id: string): Noun {
  const found = NOUNS.find(noun => noun.id === id);
  if (found === undefined) throw new Error(`no noun ${id}`);
  return found;
}
const camel = (words: readonly string[]): string => words.map((word, index) => (index === 0 ? word : capitalized(word))).join("");
const pascal = (words: readonly string[]): string => words.map(capitalized).join("");
const constantCase = (words: readonly string[]): string => words.join("_").toUpperCase();
const kebab = (words: readonly string[]): string => words.join("-");
/** A verb a subscription-shaped rf leaf would carry. */
const SUBSCRIBE_VERB = /\b(?:subscribes?|subscriptions?|watch|follow|listen|stream|tail|observe|poll)\b/;

const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JSON_EXTENSIONS = [".json"];
/** Files read as launch text: a Python file's import lines and a shell script's launch lines (A2). */
const SCRIPT_EXTENSIONS = [".py", ".sh", ".bash"];
/** The tree walked and anchored but not judged for nouns (A1; residual R-TEST-TREE). */
const TEST_TREE = "test/";
/** The child_process launchers whose own arguments A2 reads for a Python launch text or a -m argv pair. */
const LAUNCHERS: readonly string[] = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** A Python file's import of the producer: an import or from statement opening a line. */
const PYTHON_IMPORT_LINE = new RegExp(`^\\s*(?:import|from)\\s+[\\w.]*${TOLERANT_SOURCE}`, "im");
const MANIFEST =
  /(?:^|\/)(?:package\.json|[^/]*-lock\.json|npm-shrinkwrap\.json|pyproject\.toml|requirements[^/]*\.txt|uv\.lock|Pipfile(?:\.lock)?|setup\.(?:py|cfg)|poetry\.lock)$/i;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
/** Each floor sits below the count measured at base b1ab992 (src 115, test 459, qa 62 modules; 68 JSON; 574 project files; outside
 * the test tree 196 modules and 4 JSON files judged for nouns). */
const FLOORS = { files: 760, modules: { src: 100, test: 400, qa: 55 }, json: 55, manifests: 3, scripts: 4, project: 500, judged: { modules: 170, json: 3 } };
/** Files the walk must reach, each with a token its bytes carry: a root page, the provider, a qa script, the manifest, the leaf
 * catalog and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  [PROVIDER, "REACTIVE_FIBER_CONTRACT_SOURCE"],
  ["qa/workbench/receipts-index.mjs", "marked"],
  ["package.json", "@tintinweb/pi-subagents"],
  [LEAF_CATALOG, "sdk_versions"],
  ["media/screenshot.png", "PNG"],
];
/** The modules nearest the producer, each with an identifier the reader must read in it: the provider, the observer, the native
 * evidence reader and the full-shape fixture, whose identifier is the producer's sdk_versions echo key. */
const NEAREST_READERS: readonly (readonly [string, string])[] = [
  [PROVIDER, "REACTIVE_FIBER_CLI_SCHEMA"],
  ["src/workbench/reactivefiber-observer.ts", "ENVELOPE_KEYS"],
  ["src/workbench/native-evidence.ts", "nativeEvidence"],
  ["test/helpers/rf-render-fixture.ts", SDK_MODULE],
];
/** Pi's viewing grants on the one seam: the catalog's discover and inspect grants for the preview, and the projection grant. */
const VIEW_GRANTS: readonly string[] = [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, "workbench:observe"];
/** Spellings a grant could be derived as, from the viewing grants or from the preview's own grant. */
const DERIVED_GRANTS: readonly string[] = [
  `invoke:${PREVIEW_ID}`,
  "reactivefiber:*",
  "reactivefiber",
  "*",
  `${PREVIEW_GRANT}:view`,
  "Reactivefiber:Render",
  ` ${PREVIEW_GRANT}`,
  `${PREVIEW_GRANT} `,
  `discover:${PREVIEW_GRANT}`,
  `inspect:${PREVIEW_GRANT}`,
  PREVIEW_ID,
  "control:reactivefiber.render",
];
const LEGACY: JsonObject = { model: "m", task: "t" };
const VIEW_ARM: JsonObject = { view: "v", taskId: "t-1" };
const RESIDUAL_FAMILIES = [
  "R-COMPOSED",
  "R-PATH-SPLIT",
  "R-PROSE",
  "R-INTERRUPTED",
  "R-LOOKALIKE",
  "R-ENCODED",
  "R-SYNONYM",
  "R-ALIASED-LOADER",
  "R-OUTSIDE",
  "R-TEST-TREE",
  "R-INDIRECT-LAUNCH",
  "R-ECHO",
];
const CYRILLIC_A = String.fromCodePoint(0x0430);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
/** Every scan constant, as the roster holds it. */
const SCAN = {
  nouns: NOUNS.map(noun => ({ id: noun.id, source: noun.source })),
  unshippedA: UNSHIPPED_A,
  unshippedB: UNSHIPPED_B,
  subscribeVerb: `${SUBSCRIBE_VERB.source}/${SUBSCRIBE_VERB.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  jsonExtensions: JSON_EXTENSIONS,
  scriptExtensions: SCRIPT_EXTENSIONS,
  testTree: TEST_TREE,
  launchers: LAUNCHERS,
  pythonImportLine: `${PYTHON_IMPORT_LINE.source}/${PYTHON_IMPORT_LINE.flags}`,
  manifest: `${MANIFEST.source}/${MANIFEST.flags}`,
  skippedRoots: SKIPPED_ROOTS,
  floors: FLOORS,
  walkAnchors: WALK_ANCHORS.map(([path, token]) => masked(`${path}:${token}`)),
  nearestReaders: NEAREST_READERS.map(([path, token]) => masked(`${path}:${token}`)),
  viewGrants: VIEW_GRANTS,
  derivedGrants: DERIVED_GRANTS,
};
const FROZEN_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its end with its pinned assertion count, and no title spells a noun";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(c) today: no Pi subscription to RC materialized values and no RC remote-stream consumer (census 0): the trigger (If Pi ever subscribes to <SDK> shared reactive data) has not fired - no judged module or JSON file names a program noun, nothing loads the producer, Pi's one rf launch is a one-shot context render, and its one registered rf capability is the invoke-only preview",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label:
      "(a) adoption fixture: a subscription admits only values carrying port name, source digest/revision, audience, producer identity, freshness and diagnostics; a value lacking any field, a callable/closure or an untyped value is refused typed: gated - the producer ships no interface-subscriber materialization at the pin, the probe or the distribution rf carries; until then Pi's one admitted producer-derived value, the preview envelope, is refused typed when it lacks a key or is untyped, and a callable input is refused typed before any spawn",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) an interface-view grant does not enable context disclosure for the same audience and vice versa; deriving one grant from the other fails: gated - the producer ships no interface-view or publication grant; until then Pi's viewing grants and the preview's grant are separate exact grants on the one seam, neither admitting the other, and no derived spelling admits the preview",
    pins: ["C1", "C2"],
  },
];
/** Short describe titles (the labels spell the nouns the records case keeps out of every title). */
const ROW_TITLES: Readonly<Record<string, string>> = {
  A: "acceptance (c) and the trigger, absent today",
  B: "acceptance (a), gated, and its until-then leg",
  C: "acceptance (b), gated, and its until-then leg",
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
interface ProducerSite {
  readonly site: string;
  readonly signature: string;
  readonly doc: string;
}
interface ProducerPin {
  readonly label: string;
  readonly ref: string;
  readonly srcModules: number;
  readonly readmeBlob: string | null;
  readonly nouns: Readonly<Record<string, number>>;
}
interface Producer {
  readonly repo: string;
  readonly readme: { readonly path: string; readonly blob: string; readonly line12: string; readonly line22: string; readonly line24: string };
  readonly sites: readonly ProducerSite[];
  readonly pins: readonly ProducerPin[];
  readonly rf: { readonly version: string; readonly commit: string; readonly leaves: number };
}
/** The owner block of the filing's notes as the cutting seat measured it: its length in characters and the sha256 of its UTF-8. */
interface FilingBound {
  readonly length: number;
  readonly sha256: string;
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly filing: FilingBound;
  readonly scan: JsonValue;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly reached: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) throw new Error(`roster ${field} must be a count`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
/** Refuses an object whose keys differ from `keys`, so a re-measure written under a renamed or misspelled key never reads as 0. */
function exactKeys(value: { [key: string]: unknown }, keys: readonly string[], field: string): void {
  const found = Object.keys(value).sort();
  if (JSON.stringify(found) !== JSON.stringify([...keys].sort())) throw new Error(`roster ${field} keys must be exactly ${keys.join(", ")}; found ${found.join(", ")}`);
}
function producerOf(value: unknown): Producer {
  const producer = objectOf(value, "producer");
  exactKeys(producer, ["repo", "readme", "sites", "pins", "rf"], "producer");
  const readme = objectOf(producer.readme, "producer.readme");
  exactKeys(readme, ["path", "blob", "line12", "line22", "line24"], "producer.readme");
  const rf = objectOf(producer.rf, "producer.rf");
  exactKeys(rf, ["version", "commit", "leaves"], "producer.rf");
  if (!Array.isArray(producer.sites) || !Array.isArray(producer.pins)) throw new Error("roster producer.sites and producer.pins must be lists");
  const sites = producer.sites.map((entry: unknown, index: number): ProducerSite => {
    const site = objectOf(entry, `producer.sites[${index}]`);
    exactKeys(site, ["site", "signature", "doc"], `producer.sites[${index}]`);
    return { site: text(site.site, "site"), signature: text(site.signature, "signature"), doc: text(site.doc, "doc") };
  });
  const pins = producer.pins.map((entry: unknown, index: number): ProducerPin => {
    const field = `producer.pins[${index}]`;
    const pin = objectOf(entry, field);
    exactKeys(pin, ["label", "ref", "srcModules", "readmeBlob", "nouns"], field);
    const nouns = objectOf(pin.nouns, `${field}.nouns`);
    exactKeys(nouns, NOUNS.map(noun => noun.id), `${field}.nouns`);
    if (pin.readmeBlob !== null && typeof pin.readmeBlob !== "string") throw new Error(`roster ${field}.readmeBlob must be a blob or null`);
    return {
      label: text(pin.label, `${field}.label`),
      ref: text(pin.ref, `${field}.ref`),
      srcModules: count(pin.srcModules, `${field}.srcModules`),
      readmeBlob: pin.readmeBlob,
      nouns: Object.fromEntries(NOUNS.map(noun => [noun.id, count(nouns[noun.id], `${field}.nouns.${noun.id}`)])),
    };
  });
  return {
    repo: text(producer.repo, "producer.repo"),
    readme: {
      path: text(readme.path, "producer.readme.path"),
      blob: text(readme.blob, "producer.readme.blob"),
      line12: text(readme.line12, "producer.readme.line12"),
      line22: text(readme.line22, "producer.readme.line22"),
      line24: text(readme.line24, "producer.readme.line24"),
    },
    sites,
    pins,
    rf: { version: text(rf.version, "producer.rf.version"), commit: text(rf.commit, "producer.rf.commit"), leaves: count(rf.leaves, "producer.rf.leaves") },
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows)) throw new Error("roster needs rows");
  exactKeys(raw, ["bead", "quote", "citation", "filing", "scan", "producer", "residuals", "rows", "tests", "reached"], "top level");
  const filing = objectOf(raw.filing, "filing");
  exactKeys(filing, ["length", "sha256"], "filing");
  const sha256 = text(filing.sha256, "filing.sha256");
  if (!/^[0-9a-f]{64}$/.test(sha256)) throw new Error("roster filing.sha256 must be a sha256 hex digest");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    filing: { length: count(filing.length, "filing.length"), sha256 },
    scan: json(raw.scan),
    producer: producerOf(raw.producer),
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerPin(label: string): ProducerPin {
  const found = ROSTER.producer.pins.find(pin => pin.label === label);
  if (found === undefined) throw new Error(`the roster holds no producer pin ${label}`);
  return found;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The filing's quote and citation, from its first line opening with a quote and closing on its merged pin. */
function quoteOf(notes: string): { quote: string | undefined; citation: string | undefined } {
  const match = /^'(.+)' (\S+)\. Merged: /m.exec(notes);
  return { quote: match?.[1], citation: match?.[2] };
}
/** The trigger the title states, the producer's name masked. */
function triggerOf(title: string): string {
  return masked(/^\[[^\]]+\] (If Pi ever [^,(]+?) \(/.exec(title)?.[1] ?? "");
}
/** The lines of the filing B1 and C1 read: its Shipped sentence, its merged pin and its authority line. */
const SHIPPED_LINE = `Shipped: no - at ${PROGRAM_PIN} src/${SDK_MODULE} has no interface-subscriber materialization or publication-authorization surface (hosting.py:756 subscribe, directive_transport.py:670 materialize_directives are internal).`;
const MERGED_LINE = `Merged: rc-interface-viewing-not-context-disclosure-permission (README.md:12@${PROGRAM_PIN}).`;
const AUTHORITY_LINE = "independently authorize publication.' (README.md:22)";
/** Each noun member's anchor outside this file: every member but CS reads a phrase of the filing; CS reads the measured producer
 * signature (the filing names no change sink). */
const ANCHORS: Readonly<Record<string, string>> = { MV: "filing", IS: "filing", DP: "filing", RS: "filing", PA: "filing", CS: "producer", RM: "filing", IV: "filing", CD: "filing" };
/** Each noun member's anchor over a title and a text: "filing" when their words spell it, else "producer" when the measured
 * producer signatures do, else "none". */
function anchorsOf(title: string, text: string): Record<string, string> {
  const filing = wordsOf(`${title}\n${text}`);
  const producerText = wordsOf(ROSTER.producer.sites.map(site => site.signature).join("\n"));
  return Object.fromEntries(
    NOUNS.map(noun => [noun.id, NOUN_PATTERNS.get(noun.id)?.test(filing) === true ? "filing" : NOUN_PATTERNS.get(noun.id)?.test(producerText) === true ? "producer" : "none"]),
  );
}
interface Filing {
  readonly title: string;
  /** The owner block: the notes as the owner filed them. */
  readonly block: string;
}
/** The owner filing of a row: its title and the owner block, the byte-exact prefix of its notes the roster measured (its length
 * and sha256). bd appends every later note (a delivery, a gate verdict, a landed note) after that block, so no reading of the
 * filing sees one; a block edited in place or cut short is refused, never read through an appended copy. */
function filingOf(row: BeadRow): Filing {
  const { length, sha256 } = ROSTER.filing;
  const block = row.notes.slice(0, length);
  const digest = createHash("sha256").update(block, "utf8").digest("hex");
  if (block.length !== length || digest !== sha256) {
    throw new Error(`${BEAD}'s owner filing block changed: the first ${length} characters of its notes digest ${digest.slice(0, 16)}, the roster measured ${sha256.slice(0, 16)}`);
  }
  return { title: row.title, block };
}
const liveFiling = (): Filing => filingOf(readBeadRow());
interface FilingReadings {
  readonly clauses: readonly string[];
  readonly trigger: string;
  readonly quote: { readonly quote: string | undefined; readonly citation: string | undefined };
  readonly anchors: Readonly<Record<string, string>>;
  readonly unshipped: boolean;
  readonly merged: boolean;
  readonly authority: boolean;
}
/** Every reading this census takes of the filing, each from the owner block (the title for the trigger). */
function readingsOf(filing: Filing): FilingReadings {
  return {
    clauses: acceptanceClauses(filing.block),
    trigger: triggerOf(filing.title),
    quote: quoteOf(filing.block),
    anchors: anchorsOf(filing.title, filing.block),
    unshipped: filing.block.includes(SHIPPED_LINE),
    merged: filing.block.includes(MERGED_LINE),
    authority: filing.block.includes(AUTHORITY_LINE),
  };
}
/** A note as a ledger hop exports one after the owner block (bd joins an appended note with a newline): it spells every noun
 * member, CS included, and carries its own acceptance, quote, Shipped, merged and authority lines. */
function appendedNote(): string {
  const spelled = NOUNS.map(noun => noun.words.join(" ")).join(", ");
  return [
    "",
    `GATE VERDICT (BIND) ${BEAD}: the delivery note spells ${spelled}.`,
    "Acceptance: (a) an appended clause; (b) an appended clause; (c) an appended clause.",
    `'An appended quote.' docs/appended.md:1@${PROGRAM_PIN}. Merged: an appended pin.`,
    SHIPPED_LINE,
    MERGED_LINE,
    AUTHORITY_LINE,
  ].join("\n");
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const isJson = (path: string): boolean => JSON_EXTENSIONS.includes(extensionOf(path));

/** A text as lowercase words: camelCase and PascalCase humps split, acronym runs kept, every other character a separator. */
function wordsOf(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}
/** A name-like text: no white space once trimmed. A consumer names a port, a value or a grant this way; prose never is. */
const isNameLike = (value: string): boolean => value.trim().length > 0 && !/\s/.test(value.trim());

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
/** A loader call: a dynamic import, require, require.resolve or a created require (createRequire(...)(specifier)). */
function isLoader(callee: ts.Expression): boolean {
  if (callee.kind === ts.SyntaxKind.ImportKeyword) return true;
  if (ts.isIdentifier(callee)) return callee.text === "require";
  if (ts.isPropertyAccessExpression(callee)) return ts.isIdentifier(callee.expression) && callee.expression.text === "require" && callee.name.text === "resolve";
  return ts.isCallExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "createRequire";
}
/** A child_process launcher call: spawn, exec, execFile, fork and their sync forms, bare or as a member (child_process.spawn). */
function isLauncher(callee: ts.Expression): boolean {
  if (ts.isIdentifier(callee)) return LAUNCHERS.includes(callee.text);
  return ts.isPropertyAccessExpression(callee) && LAUNCHERS.includes(callee.name.text);
}

interface ModuleReading {
  readonly nouns: string[];
  readonly loads: string[];
  readonly specifiers: string[];
  readonly identifiers: Set<string>;
}
/** One module, parsed under its own script kind: its noun spellings (A1), the producer in a load position, and a launcher call's
 * own arguments holding a Python launch text or a -m argv pair naming it (A2), every specifier in a load position and every
 * identifier (the anchors). Comments are never read. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const nouns: string[] = [];
  const loads: string[] = [];
  const specifiers: string[] = [];
  const identifiers = new Set<string>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  // An identifier or a regex is judged whole and always; a literal only when it is name-like, path segment by path segment.
  const judge = (node: ts.Node, kind: string, value: string): void => {
    const whole = kind === "identifier" || kind === "regex";
    if (!whole && !isNameLike(value)) return;
    for (const part of whole ? [value] : value.split("/")) for (const id of nounsIn(wordsOf(part))) nouns.push(`${path}:${line(node)} ${id} ${kind}: ${masked(value)}`);
  };
  const python = (node: ts.Node, value: string): void => {
    if (PYTHON_LOADS.some(pattern => pattern.test(value))) loads.push(`${path}:${line(node)} python: ${masked(value)}`);
  };
  // A launcher call's own arguments: a string (cooked or folded) and an inline argv array, read for a launch text and a -m pair.
  const launch = (call: ts.CallExpression): void => {
    for (const argument of call.arguments) {
      const value = fold(argument);
      if (value !== undefined) python(argument, value);
      if (!ts.isArrayLiteralExpression(argument)) continue;
      const items = argument.elements.map(element => fold(element));
      for (const item of items) if (item !== undefined) python(argument, item);
      for (let index = 0; index + 1 < items.length; index += 1) {
        const next = items[index + 1];
        if (items[index] === "-m" && next !== undefined && SDK_TOLERANT.test(next)) loads.push(`${path}:${line(argument)} argv: -m ${masked(next)}`);
      }
    }
  };
  const load = (node: ts.Node | undefined): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value === undefined) return;
    specifiers.push(value);
    if (SDK_TOLERANT.test(value)) loads.push(`${path}:${line(node ?? file)} specifier: ${masked(value)}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      judge(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      judge(node, "literal", node.text);
    } else if (ts.isJsxText(node)) {
      judge(node, "jsx-text", node.text);
    } else if (ts.isRegularExpressionLiteral(node)) {
      judge(node, "regex", node.text);
    }
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) judge(node, "folded", folded);
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    if (ts.isCallExpression(node) && isLoader(node.expression)) load(node.arguments[0]);
    if (ts.isCallExpression(node) && isLauncher(node.expression)) launch(node);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { nouns, loads, specifiers, identifiers };
}

interface JsonReading {
  readonly nouns: string[];
  readonly parsed: boolean;
}
/** One JSON file: every key, and every name-like string value, read path segment by path segment (a file that does not parse is
 * read as text, token by token). */
function readJson(path: string, source: string): JsonReading {
  const nouns: string[] = [];
  const judge = (kind: string, value: string): void => {
    if (kind === "value" && !isNameLike(value)) return;
    for (const part of value.split("/")) for (const id of nounsIn(wordsOf(part))) nouns.push(`${path}: ${id} ${kind}: ${masked(value)}`);
  };
  const visit = (value: unknown): void => {
    if (typeof value === "string") judge("value", value);
    else if (Array.isArray(value)) for (const item of value) visit(item);
    else if (isObject(value))
      for (const [key, item] of Object.entries(value)) {
        judge("key", key);
        visit(item);
      }
  };
  let parsed = true;
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    parsed = false;
  }
  if (parsed) visit(value);
  else for (const token of source.split(/\s+/)) if (token.length > 0) judge("text", token);
  return { nouns, parsed };
}

/** A Python file importing the producer, or a shell script launching it (A2). */
function scriptLoads(path: string, source: string): boolean {
  return extensionOf(path) === ".py" ? PYTHON_IMPORT_LINE.test(source) : PYTHON_LOADS.some(pattern => pattern.test(source));
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly json: Map<string, JsonReading>;
  readonly manifests: string[];
  readonly manifestLoads: string[];
  readonly scripts: string[];
  readonly scriptLoads: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it; no file is exempt. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const modules = new Map<string, ModuleReading>();
  const jsonFiles = new Map<string, JsonReading>();
  const manifests: string[] = [];
  const manifestLoads: string[] = [];
  const scripts: string[] = [];
  const scriptHits: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of walk.files) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const utf8 = buffer.toString("utf8");
    if (isModule(file)) modules.set(file, readModule(file, utf8));
    if (isJson(file)) jsonFiles.set(file, readJson(file, utf8));
    if (MANIFEST.test(file)) {
      manifests.push(file);
      if (SDK_TOLERANT.test(utf8)) manifestLoads.push(file);
    }
    if (SCRIPT_EXTENSIONS.includes(extensionOf(file))) {
      scripts.push(file);
      if (scriptLoads(file, utf8)) scriptHits.push(file);
    }
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, modules, json: jsonFiles, manifests, manifestLoads, scripts, scriptLoads: scriptHits, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
/** A1's findings: the noun spellings of every module and JSON file outside the test tree. */
function judgedNouns(tree: TreeReading): { modules: string[]; jsonFiles: string[] } {
  const outside = <T>(entries: Map<string, T>): T[] => [...entries.entries()].filter(([file]) => !file.startsWith(TEST_TREE)).map(([, reading]) => reading);
  return { modules: outside(tree.modules).flatMap(reading => reading.nouns), jsonFiles: outside(tree.json).flatMap(reading => reading.nouns) };
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;
function floorsOf(tree: TreeReading): { files: boolean; src: boolean; test: boolean; qa: boolean; json: boolean } {
  return {
    files: tree.walk.files.length >= FLOORS.files,
    src: modulesBelow(tree, "src") >= FLOORS.modules.src,
    test: modulesBelow(tree, "test") >= FLOORS.modules.test,
    qa: modulesBelow(tree, "qa") >= FLOORS.modules.qa,
    json: tree.json.size >= FLOORS.json,
  };
}
/** The files the compiler's own project lists (tsconfig.test.json: src/**, test/**), root-relative: an anchor outside this census. */
function projectFiles(): string[] {
  const parsed = ts.getParsedCommandLineOfConfigFile(join(REPO, "tsconfig.test.json"), {}, { ...ts.sys, onUnRecoverableConfigFileDiagnostic: () => undefined });
  if (parsed === undefined) throw new Error("tsconfig.test.json did not parse");
  return parsed.fileNames.map(file => posix(relative(REPO, file))).sort();
}

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | null>>): TreeReading {
  const root = makeScratch("rc-shared-data-tree-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}

/** The member ids one snippet (read as `path`) or one JSON text spells, and its load findings. */
const nounIds = (path: string, source: string): string[] => [...new Set(readModule(path, source).nouns.map(hit => hit.split(" ")[1] ?? ""))];
const jsonIds = (source: string): string[] => [...new Set(readJson("c.json", source).nouns.map(hit => hit.split(" ")[1] ?? ""))];
const loadsIn = (path: string, source: string): number => readModule(path, source).loads.length;
const manifestNames = (path: string, source: string): boolean => MANIFEST.test(path) && SDK_TOLERANT.test(source);

/** The rf leaf paths of the captured catalog (`rf --json --version` at rf 0.1.832) and the producer version it echoes. */
function leafCatalog(): { paths: string[]; echoedVersion: string | undefined } {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, LEAF_CATALOG), "utf8"));
  const envelope = isObject(raw) ? raw.envelope : undefined;
  const result = isObject(envelope) ? envelope.result : undefined;
  const leaves = isObject(result) && Array.isArray(result.leaves) ? result.leaves : [];
  const versions = isObject(result) ? result.sdk_versions : undefined;
  const echoed = isObject(versions) ? versions[SDK_MODULE] : undefined;
  return { paths: leaves.flatMap(leaf => (isObject(leaf) && typeof leaf.path === "string" ? [leaf.path] : [])), echoedVersion: typeof echoed === "string" ? echoed : undefined };
}

interface SpawnRecord {
  readonly argv: readonly string[];
  readonly pid: number;
}
const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
/** Installs a stand-in `rf` first on PATH: every spawn appends one JSON line (its argv and its pid) to the returned log, prints
 * `stdout` verbatim and exits 0. */
function standInRf(stdout: string): string {
  const folder = makeScratch("rc-shared-data-rf-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ argv: process.argv.slice(2), pid: process.pid }) + "\\n");`,
      `process.stdout.write(${JSON.stringify(stdout)});`,
      "process.exit(0);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): SpawnRecord[] {
  let content = "";
  try {
    content = readFileSync(log, "utf8");
  } catch {
    return [];
  }
  return content
    .split("\n")
    .filter(Boolean)
    .map((line, index) => {
      const value: unknown = JSON.parse(line);
      if (!isObject(value) || typeof value.pid !== "number") throw new Error(`spawn record ${index} is malformed`);
      return { argv: strings(value.argv, `spawn ${index} argv`), pid: value.pid };
    });
}
function alive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}
function contextFor(grants: readonly string[]): { grants: string[]; signal: AbortSignal; principal: { id: string } } {
  return { grants: [...grants], signal: new AbortController().signal, principal: { ...PRINCIPAL } };
}
/** The outcome of one registry call: "ok" or the CapabilityError category (anything else is rethrown). */
async function outcomeOf(call: Promise<unknown>): Promise<string> {
  try {
    await call;
    return "ok";
  } catch (error) {
    if (error instanceof CapabilityError) return error.category;
    throw error;
  }
}
/** One call through the NATIVE preview registration over a stand-in rf printing `stdout`: the outcome and the spawns it made. */
async function nativeCall(stdout: string, input: unknown, grants: readonly string[] = [PREVIEW_GRANT]): Promise<{ outcome: string; spawns: SpawnRecord[] }> {
  const log = standInRf(stdout);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  const outcome = await outcomeOf(registry.invoke(PREVIEW_ID, input, contextFor(grants)));
  return { outcome, spawns: spawnsOf(log) };
}
const FULL_ENVELOPE = (): string => JSON.stringify(fullShapeRf(FIXTURE_ROOT));

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, REPO);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of three selectors: id prefix, permission family or contract source. */
function rfDescriptors(descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] {
  return descriptors.filter(
    descriptor =>
      descriptor.id.startsWith("reactivefiber.") ||
      descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) ||
      (descriptor.contractSource ?? "").includes("reactive-fiber.cli/"),
  );
}
const shapeOf = (descriptor: CapabilityDescriptor): JsonObject => ({
  id: descriptor.id,
  effectClass: descriptor.effectClass,
  permissions: [...descriptor.permissions],
  supportedModes: [...descriptor.supportedModes],
  carrier: descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
});

const REACHED: string[] = [];
/** A pin's witness: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): JsonValue {
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const tree = liveTree();
    const floors = floorsOf(tree);
    expect(floors, `files ${tree.walk.files.length}; modules src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}; JSON ${tree.json.size}`).toStrictEqual({
      files: true,
      src: true,
      test: true,
      qa: true,
      json: true,
    });
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "the walk meets no symlink and no unreadable file").toStrictEqual({ symlinks: [], unreadable: [] });
    // The outside anchor of the walk: the compiler's own project lists exactly the .ts modules the walk judged below src/ and test/.
    const project = projectFiles();
    const judgedTs = [...tree.modules.keys()].filter(file => (file.startsWith("src/") || file.startsWith("test/")) && file.endsWith(".ts")).sort();
    const missing = project.filter(file => !tree.modules.has(file));
    const extra = judgedTs.filter(file => !project.includes(file));
    const projectAgrees = project.length >= FLOORS.project && missing.length === 0 && extra.length === 0;
    expect({ missing, extra }, `tsconfig.test.json lists ${project.length} files; the walk judged ${judgedTs.length}`).toStrictEqual({ missing: [], extra: [] });
    expect(projectAgrees, "the project floor holds").toBe(true);
    const { modules, jsonFiles } = judgedNouns(tree);
    expect({ modules, jsonFiles }, "program nouns outside the test tree (the trigger's inventory)").toStrictEqual({ modules: [], jsonFiles: [] });
    const judgedFloors = {
      modules: [...tree.modules.keys()].filter(file => !file.startsWith(TEST_TREE)).length >= FLOORS.judged.modules,
      json: [...tree.json.keys()].filter(file => !file.startsWith(TEST_TREE)).length >= FLOORS.judged.json,
    };
    expect(judgedFloors, "the judged set outside the test tree meets its floors").toStrictEqual({ modules: true, json: true });
    const readers = NEAREST_READERS.map(([path, token]) => {
      const reading = tree.modules.get(path);
      return { path, reached: reading?.identifiers.has(token) === true, quiet: reading !== undefined && reading.nouns.length + reading.loads.length === 0 };
    });
    expect(readers.filter(reader => !(reader.reached && reader.quiet)), "every nearest reader is reached and quiet").toEqual([]);
    const mv = nounNamed("MV").words;
    const head = mv[0] ?? "";
    const tail = mv[1] ?? "";
    // Every member flagged as an identifier and as a JSON key, each by its own id only.
    const members = Object.fromEntries(NOUNS.map(noun => [noun.id, { identifier: nounIds("c.ts", `export const ${camel(noun.words)} = 1;\n`), jsonKey: jsonIds(`{"${kebab(noun.words)}": 1}`) }]));
    const flagged = {
      camelIdentifier: nounIds("c.ts", `export const ${camel(mv)} = 1;\n`),
      typeName: nounIds("c.ts", `type ${pascal(mv)} = { port: string };\n`),
      objectKey: nounIds("c.ts", `const row = { ${mv.join("_")}: 1 };\n`),
      constant: nounIds("c.js", `export const ${constantCase(mv)} = 1;\n`),
      tokenLiteral: nounIds("c.mjs", `const kind = "${kebab(mv)}";\n`),
      tokenTemplate: nounIds("c.ts", `const kind = \`${kebab(mv)}\`;\n`),
      folded: nounIds("c.ts", `const kind = "${head}" + "${capitalized(tail)}";\n`),
      escaped: nounIds("c.ts", `const kind = "\\u006d${camel(mv).slice(1)}";\n`),
      regexLiteral: nounIds("c.ts", `const pattern = /${mv.join(" ")}/;\n`),
      pathEnd: nounIds("c.ts", `const where = "ports/${kebab(mv)}.json";\n`),
      jsonValue: jsonIds(`{"kind": "${kebab(mv)}"}`),
      jsonUnparsed: jsonIds(`{"${camel(mv)}": 1,}`),
    };
    const quiet = {
      separateLiterals: nounIds("c.ts", `const a = "${head}";\nconst b = "${tail}";\n`),
      materializeVerb: nounIds("c.ts", "export function materializeProbe(): void {}\n"),
      subscribeAlone: nounIds("c.ts", "const unsubscribe = source.subscribe(listener);\n"),
      interfaceKeyword: nounIds("c.ts", "interface ViewerKeys { quit: string }\n"),
      remoteAlone: nounIds("c.ts", 'const origin = "remote";\n'),
      portAlone: nounIds("c.ts", "const port = server.address();\n"),
      disclosureAlone: nounIds("c.ts", 'const policy = "non-disclosure";\n'),
      viewAlone: nounIds("c.ts", "const view = selector.view;\n"),
      outputAlone: nounIds("c.ts", "const text = result.output.text;\n"),
    };
    const planted = plantedTree({
      "src/live.ts": `export const ${camel(mv)} = 1;\n`,
      "qa/fixtures/stream.json": `{"${camel(nounNamed("RS").words)}": true}\n`,
      "qa/view.mjs": `export const ${constantCase(nounNamed("IV").words)} = 1;\n`,
      "nested/node_modules/pkg/index.js": `export const ${camel(nounNamed("CD").words)} = 1;\n`,
      "notes/plan.md": `${mv.join(" ")}\n`,
      "src/link.ts": null,
    });
    const plantedHits = judgedNouns(planted);
    const flaggedIn = (path: string): boolean => planted.walk.symlinks.includes(path) || [...plantedHits.modules, ...plantedHits.jsonFiles].some(hit => hit.startsWith(`${path}:`));
    const walkControls = Object.fromEntries(["src/live.ts", "qa/fixtures/stream.json", "qa/view.mjs", "nested/node_modules/pkg/index.js", "notes/plan.md", "src/link.ts"].map(path => [path, flaggedIn(path)]));
    return done("A1", { floors, judgedFloors, anchorsWalked: tree.anchorsWalked, projectAgrees, modules, jsonFiles, readers, members, flagged, quiet, walkControls });
  },
  A2: () => {
    const tree = liveTree();
    const loads = [...tree.modules.values()].flatMap(reading => reading.loads);
    const specifierAnchor = tree.modules.get(PROVIDER)?.specifiers.includes("node:child_process") === true;
    const echoAnchor = tree.modules.get("test/helpers/rf-render-fixture.ts")?.identifiers.has(SDK_MODULE) === true;
    const manifestFloor = tree.manifests.length >= FLOORS.manifests && tree.manifests.includes("package.json") && tree.manifests.includes("package-lock.json");
    expect(specifierAnchor, "the load reader reads the provider's node:child_process import").toBe(true);
    expect(echoAnchor, "the reader reads the sdk_versions echo key in the full-shape fixture").toBe(true);
    expect(manifestFloor, `manifests read: ${tree.manifests.join(", ")}`).toBe(true);
    expect({ loads, manifestLoads: tree.manifestLoads, scriptLoads: tree.scriptLoads }, "the producer in a load position, a launcher's Python launch, a script or a manifest").toStrictEqual({
      loads: [],
      manifestLoads: [],
      scriptLoads: [],
    });
    const scriptFloor = tree.scripts.length >= FLOORS.scripts && tree.scripts.includes("qa/workbench/smoke.sh");
    expect(scriptFloor, `scripts read: ${tree.scripts.join(", ")}`).toBe(true);
    const pkg = kebab(SDK_WORDS);
    const scoped = `@vibranium/${pkg}`;
    const flagged = {
      bareImport: loadsIn("c.ts", `import { host } from "${pkg}";\n`),
      scopedImport: loadsIn("c.ts", `import { host } from "${scoped}";\n`),
      npmSpecifier: loadsIn("c.ts", `import { host } from "npm:${scoped}@0.1.1";\n`),
      typeOnly: loadsIn("c.ts", `import type { Host } from "${scoped}";\n`),
      exportFrom: loadsIn("c.ts", `export * from "${scoped}";\n`),
      dynamicImport: loadsIn("c.mjs", `const sdk = await import("${scoped}");\n`),
      requireCall: loadsIn("c.cjs", `const sdk = require("${scoped}");\n`),
      requireResolve: loadsIn("c.cjs", `const where = require.resolve("${scoped}");\n`),
      importEquals: loadsIn("c.ts", `import sdk = require("${scoped}");\n`),
      importType: loadsIn("c.ts", `type Sdk = typeof import("${scoped}");\n`),
      createdRequire: loadsIn("c.mjs", `const sdk = createRequire(import.meta.url)("${scoped}");\n`),
      foldedSpecifier: loadsIn("c.mjs", `const sdk = await import("@vibranium/" + "${pkg}");\n`),
      pythonImport: loadsIn("c.ts", `spawn("python3", ["-c", "import ${SDK_MODULE}"]);\n`),
      pythonFrom: loadsIn("c.ts", `spawnSync("python3", ["-c", "from ${SDK_MODULE}.hosting import ComponentHost"]);\n`),
      pythonModuleArgv: loadsIn("c.ts", `spawn("python3", ["-m", "${SDK_MODULE}"]);\n`),
      pythonModuleText: loadsIn("c.ts", `execSync("python3 -m ${SDK_MODULE}.cli");\n`),
      memberLauncher: loadsIn("c.ts", `child_process.execFileSync("python3", ["-m", "${SDK_MODULE}"]);\n`),
      shellArgument: loadsIn("c.ts", `spawn("sh", ["-c", "python3 -m ${SDK_MODULE}"]);\n`),
      installer: loadsIn("c.ts", `execSync("uv pip install vibranium-${pkg}");\n`),
      pythonFile: scriptLoads("qa/bridge.py", `import json\nfrom ${SDK_MODULE}.hosting import ComponentHost\n`),
      shellScript: scriptLoads("qa/run.sh", `#!/bin/sh\npython3 -m ${SDK_MODULE} serve\n`),
      packageJson: manifestNames("package.json", `{"dependencies":{"${scoped}":"0.1.1"}}`),
      pyproject: manifestNames("pyproject.toml", `dependencies = ["vibranium-${pkg}>=0.1"]\n`),
      requirements: manifestNames("requirements.txt", `vibranium_${SDK_MODULE}==0.1.1\n`),
    };
    const quiet = {
      mentionOnly: loadsIn("c.ts", `const label = "${scoped}";\n`),
      otherProducer: loadsIn("c.ts", 'import { optic } from "@vibranium/fiber-optics";\n'),
      proseMention: loadsIn("c.ts", `const note = "the producer distribution rf names ${SDK_MODULE}";\n`),
      notManifest: manifestNames("notes.json", `{"dependencies":{"${scoped}":"0.1.1"}}`),
      otherModuleRun: loadsIn("c.ts", 'spawn("python3", ["-m", "http.server"]);\n'),
      pythonFileOther: scriptLoads("qa/bridge.py", "import json\n"),
    };
    return done("A2", { specifierAnchor, echoAnchor, manifestFloor, scriptFloor, loads, manifestLoads: tree.manifestLoads, scriptLoads: tree.scriptLoads, flagged, quiet });
  },
  A3: async () => {
    const tree = liveTree();
    const srcModules = [...tree.modules.keys()].filter(file => file.startsWith("src/") && file.endsWith(".ts"));
    const launches = srcModules.flatMap(file => scanRfLaunches(file, readFileSync(join(REPO, file), "utf8")).launches);
    const launchModules = [...new Set(launches.map(site => site.slice(0, site.lastIndexOf(":"))))];
    expect({ launches: launches.length, launchModules }, `rf launches: ${launches.join(", ")}`).toStrictEqual({ launches: 1, launchModules: [PROVIDER] });
    const catalog = leafCatalog();
    const renderLeafListed = catalog.paths.length > 0 && catalog.paths.includes(RENDER_LEAF);
    const renderLeafSubscribes = SUBSCRIBE_VERB.test(wordsOf(RENDER_LEAF));
    expect({ renderLeafListed, renderLeafSubscribes }, "the provider's leaf is a catalog leaf naming no subscription verb").toStrictEqual({ renderLeafListed: true, renderLeafSubscribes: false });
    const arm = async (input: JsonObject): Promise<JsonObject> => {
      const call = await nativeCall(FULL_ENVELOPE(), input);
      return {
        outcome: call.outcome,
        spawns: call.spawns.length,
        group: call.spawns.map(spawn => spawn.argv.slice(2, 4).join(" ")),
        noCommit: call.spawns.every(spawn => spawn.argv.includes("--no-commit")),
        childGone: call.spawns.every(spawn => !alive(spawn.pid)),
      };
    };
    const arms = { legacy: await arm(LEGACY), view: await arm(VIEW_ARM) };
    const clean = { outcome: "ok", spawns: 1, group: ["context render"], noCommit: true, childGone: true };
    expect(arms, "each arm: one spawn, the context render group, --no-commit, and the child gone when the call settles").toStrictEqual({ legacy: clean, view: clean });
    const verbs = {
      subscribe: SUBSCRIBE_VERB.test(wordsOf("graph.subscribe")),
      watchLeaf: SUBSCRIBE_VERB.test(wordsOf("context.watch")),
      streamLeaf: SUBSCRIBE_VERB.test(wordsOf("view.stream")),
      renderLeaf: SUBSCRIBE_VERB.test(wordsOf("context.render")),
      showLeaf: SUBSCRIBE_VERB.test(wordsOf("context.show")),
    };
    return done("A3", { launches: launches.length, launchModules, renderLeafListed, renderLeafSubscribes, arms, verbs });
  },
  A4: async () => {
    const native = await nativeDescriptors();
    const injectedRegistry = new CapabilityRegistry();
    registerReactiveFiberRender(injectedRegistry, () => Promise.reject(new Error("the injected reader is never invoked here")), FIXTURE_ROOT);
    const injected = injectedRegistry.catalogSnapshot().map(entry => entry.descriptor);
    const rf = { native: rfDescriptors(native).map(shapeOf), injected: rfDescriptors(injected).map(shapeOf) };
    const preview = { id: PREVIEW_ID, effectClass: "read", permissions: [PREVIEW_GRANT], supportedModes: ["invoke"], carrier: true };
    const observing = [...rfDescriptors(native), ...rfDescriptors(injected)].filter(descriptor => descriptor.supportedModes.includes("observe")).map(descriptor => descriptor.id);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    // Non-vacuity: the selector read a catalog holding providers that are not rf.
    const catalogRead = native.length > rf.native.length && rf.native.length > 0;
    expect(catalogRead, `native descriptors ${native.length}`).toBe(true);
    expect(rf, "the rf descriptors of both registrations are the read-only, invoke-only preview").toStrictEqual({ native: [preview], injected: [preview] });
    expect(observing, "an rf descriptor supporting the observe mode").toEqual([]);
    expect(reconcile, "the reconcile evidence reads of rf").toEqual([PREVIEW_ID]);
    return done("A4", { catalogRead, rf, observing, reconcile });
  },
  A5: () => {
    const mv = nounNamed("MV").words;
    const head = mv[0] ?? "";
    const tail = mv[1] ?? "";
    const pkg = kebab(SDK_WORDS);
    const scoped = `@vibranium/${pkg}`;
    const split = Math.floor(head.length / 2);
    const residuals = {
      "R-COMPOSED": {
        concatenated: nounIds("c.ts", `const first = "${head}";\nconst name = first + "${capitalized(tail)}";\n`),
        joined: nounIds("c.ts", `const name = ["${head}", "${capitalized(tail)}"].join("");\n`),
        composedSpecifier: loadsIn("c.mjs", `const name = "${SDK_WORDS[1] ?? ""}";\nconst sdk = await import(\`@vibranium/${SDK_WORDS[0] ?? ""}-${"$"}{name}\`);\n`),
        composedPython: loadsIn("c.ts", `const mod = "${SDK_MODULE}";\nspawn("python3", ["-c", \`import ${"$"}{mod}\`]);\n`),
      },
      "R-PATH-SPLIT": {
        literal: nounIds("c.ts", `const fixture = "fixtures/${head}/${tail}.json";\n`),
        jsonKey: jsonIds(`{"fixtures/${head}/${tail}.json": 1}`),
      },
      "R-PROSE": {
        comment: nounIds("c.ts", `// a ${mv.join(" ")}\nexport {};\n`),
        proseLiteral: nounIds("c.ts", `const note = "Pi reads no ${mv.join(" ")} today";\n`),
        proseTemplate: nounIds("c.ts", `const note = \`Pi reads no ${mv.join(" ")} today\`;\n`),
        jsonProse: jsonIds(`{"note": "Pi reads no ${mv.join(" ")} today"}`),
        markdown: plantedTree({ "notes/plan.md": `${mv.join(" ")}\n` }).modules.size,
      },
      "R-INTERRUPTED": {
        insideWord: nounIds("c.ts", `const kind = "${head.slice(0, split)}${ZERO_WIDTH_SPACE}${head.slice(split)}${capitalized(tail)}";\n`),
      },
      "R-LOOKALIKE": {
        cyrillic: nounIds("c.ts", `const kind = "${head.replace("a", CYRILLIC_A)}${capitalized(tail)}";\n`),
      },
      "R-ENCODED": {
        rot13: nounIds("c.ts", `const kind = "${rot13(camel(mv))}";\n`),
        base64: nounIds("c.ts", `const kind = "${Buffer.from(camel(mv)).toString("base64")}";\n`),
      },
      "R-SYNONYM": {
        liveValues: nounIds("c.ts", "export function onLiveValues(listener: () => void): void {}\n"),
        watchOutputs: nounIds("c.ts", "const stop = host.watchOutputs(render);\n"),
        viewGrant: nounIds("c.ts", 'const grant = "ui:see";\n'),
      },
      "R-ALIASED-LOADER": {
        aliasedRequire: loadsIn("c.cjs", `const load = require;\nconst sdk = load("${scoped}");\n`),
        wrapper: loadsIn("c.mjs", `const load = (name) => import(name);\nconst sdk = await load("${scoped}");\n`),
      },
      "R-OUTSIDE": Object.fromEntries(
        [
          ["node_modules/pkg/index.js", `export const ${camel(mv)} = 1;\n`],
          ["dist/index.js", `export const ${camel(mv)} = 1;\n`],
          [".beads/issues.json", `{"${camel(mv)}": 1}\n`],
          [".forge/report.json", `{"${camel(mv)}": 1}\n`],
          ["build/x.ts", `export const ${camel(mv)} = 1;\n`],
          ["coverage/x.ts", `export const ${camel(mv)} = 1;\n`],
          [".git/x.ts", `export const ${camel(mv)} = 1;\n`],
        ].map(([path, content]) => {
          const tree = plantedTree({ [path ?? ""]: content ?? "" });
          return [path, tree.walk.files.length];
        }),
      ),
      "R-TEST-TREE": {
        testModule: judgedNouns(plantedTree({ "test/live.ts": `export const ${camel(mv)} = 1;\n` })).modules.length,
        testJson: judgedNouns(plantedTree({ "test/fixtures/live.json": `{"${camel(mv)}": 1}\n` })).jsonFiles.length,
      },
      "R-INDIRECT-LAUNCH": {
        heldText: loadsIn("c.ts", `const code = "from ${SDK_MODULE}.hosting import ComponentHost";\n`),
        heldArgv: loadsIn("c.ts", `const args = ["-m", "${SDK_MODULE}"];\nspawn("python3", args);\n`),
        otherCall: loadsIn("c.ts", `check("python3 -m ${SDK_MODULE}");\n`),
      },
      "R-ECHO": {
        echoKey: nounIds("c.ts", `const versions = { ${SDK_MODULE}: { distribution_version: "0.1.1" } };\n`).length + loadsIn("c.ts", `const versions = { ${SDK_MODULE}: { distribution_version: "0.1.1" } };\n`),
        echoPath: loadsIn("c.ts", `const path = "result.provenance.sdk_versions.${SDK_MODULE}";\n`),
        echoAccess: loadsIn("c.ts", `const version = envelope.result.provenance.sdk_versions.${SDK_MODULE};\n`),
        echoCall: loadsIn("c.ts", `const version = versions.get("${SDK_MODULE}");\n`),
      },
    };
    const quietCount = (value: unknown): number => (Array.isArray(value) ? value.length : typeof value === "number" ? value : 0);
    const loud = Object.entries(residuals).flatMap(([family, rows]) => Object.entries(rows).filter(([, value]) => quietCount(value) !== 0).map(([row]) => `${family}:${row}`));
    expect(Object.keys(residuals), "the residual families, in roster order").toEqual(RESIDUAL_FAMILIES);
    expect(loud, "every residual row reads quiet (the family's escape, pinned)").toEqual([]);
    return done("A5", { residuals: json(residuals) as JsonObject });
  },
  B1: () => {
    const { producer } = ROSTER;
    const program = producerPin("program");
    const probe = producerPin("probe");
    const distribution = producerPin("distribution");
    const spelled = producer.pins.flatMap(pin => UNSHIPPED_A.filter(id => (pin.nouns[id] ?? 0) > 0).map(id => `${pin.label}:${id}`));
    const beadSaysUnshipped = readingsOf(liveFiling()).unshipped;
    const sitesCited = ["hosting.py:756", "directive_transport.py:670"].every(site => producer.sites.some(entry => entry.site === site));
    const readmeSame = program.readmeBlob === producer.readme.blob && probe.readmeBlob === producer.readme.blob && distribution.readmeBlob === null;
    const quoteIsLine12 = producer.readme.line12.startsWith(ROSTER.quote);
    const distributionEchoed = leafCatalog().echoedVersion === distribution.ref;
    const shipped = spelled.length > 0;
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the gating surface unshipped`).toBe(true);
    expect(sitesCited, "the filing's two internal sites are measured").toBe(true);
    expect(readmeSame, "the README blob is the same at the pin and the probe").toBe(true);
    expect(quoteIsLine12, "the quote is README.md:12's opening").toBe(true);
    expect(distributionEchoed, "the captured catalog echoes the measured distribution").toBe(true);
    expect(shipped, `the producer ships an (a) surface: (a) is owed with this re-measure (${BEAD}): ${spelled.join(", ")}`).toBe(false);
    const kept = producer.pins.map(pin => `${pin.label}:DP=${pin.nouns.DP},CS=${pin.nouns.CS},RM=${pin.nouns.RM}`);
    return done("B1", { shipped, spelled, beadSaysUnshipped, sitesCited, readmeSame, quoteIsLine12, distributionEchoed, kept });
  },
  B2: async () => {
    const envelope = fullShapeRf(FIXTURE_ROOT);
    const keys = Object.keys(envelope);
    const admitted = await nativeCall(JSON.stringify(envelope), LEGACY);
    const lacking: JsonObject = {};
    for (const key of keys) {
      const { [key]: _dropped, ...rest } = envelope;
      const call = await nativeCall(JSON.stringify(rest), LEGACY);
      lacking[key] = { outcome: call.outcome, spawns: call.spawns.length };
    }
    const untyped: JsonObject = {};
    for (const [name, stdout] of Object.entries({ nullValue: "null", stringValue: '"context"', numberValue: "7", listValue: "[]", notJson: "not json" })) {
      const call = await nativeCall(stdout, LEGACY);
      untyped[name] = { outcome: call.outcome, spawns: call.spawns.length };
    }
    const callables: JsonObject = {};
    const inputs: Readonly<Record<string, unknown>> = {
      arrowInput: () => LEGACY,
      closureField: { model: "m", task: () => "t" },
      undefinedField: { model: "m", task: undefined },
      bigintField: { model: "m", task: 1n },
      symbolField: { model: "m", task: Symbol("t") },
      dateField: { model: "m", task: new Date(0) },
      mapInput: new Map([["model", "m"]]),
    };
    for (const [name, input] of Object.entries(inputs)) {
      const call = await nativeCall(FULL_ENVELOPE(), input);
      callables[name] = { outcome: call.outcome, spawns: call.spawns.length };
    }
    const refused = (outcome: string): JsonObject => ({ outcome, spawns: 1 });
    expect(keys.length, "the full-shape fixture is the eight-key envelope").toBe(8);
    expect({ outcome: admitted.outcome, spawns: admitted.spawns.length }, "the full envelope is admitted").toStrictEqual({ outcome: "ok", spawns: 1 });
    expect(lacking, "an envelope lacking any key is refused typed").toStrictEqual(Object.fromEntries(keys.map(key => [key, refused("transport")])));
    expect(Object.values(untyped), "every untyped answer is refused typed").toStrictEqual(Object.keys(untyped).map(() => refused("transport")));
    expect(Object.values(callables), "a callable or a value that is not JSON is refused typed before any spawn").toStrictEqual(Object.keys(callables).map(() => ({ outcome: "validation", spawns: 0 })));
    return done("B2", { keys, admitted: { outcome: admitted.outcome, spawns: admitted.spawns.length }, lacking, untyped, callables });
  },
  C1: () => {
    const { producer } = ROSTER;
    const spelled = producer.pins.flatMap(pin => UNSHIPPED_B.filter(id => (pin.nouns[id] ?? 0) > 0).map(id => `${pin.label}:${id}`));
    const { merged, authority } = readingsOf(liveFiling());
    const sentence = producer.readme.line12.includes("interface viewing is not automatically permission to disclose context material or vice versa");
    const line22 = producer.readme.line22.startsWith("RC-IF-02:") && producer.readme.line22.endsWith("independently authorize publication.");
    const shipped = spelled.length > 0;
    expect(merged, "the filing's merged pin is the (b) duty").toBe(true);
    expect(authority, "the filing's authority line is RC-IF-02's").toBe(true);
    expect(sentence, "README.md:12 carries the program's own (b) sentence").toBe(true);
    expect(line22, "README.md:22 is RC-IF-02").toBe(true);
    expect(shipped, `the producer ships a (b) surface: (b) is owed with this re-measure (${BEAD}): ${spelled.join(", ")}`).toBe(false);
    return done("C1", { shipped, spelled, merged, authority, sentence, line22 });
  },
  C2: async () => {
    const log = standInRf(FULL_ENVELOPE());
    const registry = new CapabilityRegistry();
    registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
    const call = async (grants: readonly string[]): Promise<JsonObject> => {
      const before = spawnsOf(log).length;
      const outcome = await outcomeOf(registry.invoke(PREVIEW_ID, LEGACY, contextFor(grants)));
      return { outcome, spawns: spawnsOf(log).length - before };
    };
    const views: JsonObject = {};
    for (const grant of VIEW_GRANTS) views[grant] = await call([grant]);
    const allViews = await call(VIEW_GRANTS);
    const derived: JsonObject = {};
    for (const grant of DERIVED_GRANTS) derived[JSON.stringify(grant)] = await call([grant]);
    const exact = await call([PREVIEW_GRANT]);
    const listed = (grants: readonly string[]): string[] => registry.discover({ grants: [...grants] }).map(descriptor => descriptor.id);
    const discovered = { disclosure: listed([PREVIEW_GRANT]), view: listed([`discover:${PREVIEW_ID}`]) };
    const inspected = {
      disclosure: await outcomeOf(registry.inspect(PREVIEW_ID, {}, contextFor([PREVIEW_GRANT]))),
      view: await outcomeOf(registry.inspect(PREVIEW_ID, {}, contextFor([`inspect:${PREVIEW_ID}`]))),
    };
    let injectedCalls = 0;
    const injectedRegistry = new CapabilityRegistry();
    registerReactiveFiberRender(
      injectedRegistry,
      () => {
        injectedCalls += 1;
        return Promise.resolve(JSON.parse(FULL_ENVELOPE()));
      },
      FIXTURE_ROOT,
    );
    const injectedCall = async (grants: readonly string[]): Promise<JsonObject> => {
      const before = injectedCalls;
      const outcome = await outcomeOf(injectedRegistry.invoke(PREVIEW_ID, LEGACY, contextFor(grants)));
      return { outcome, calls: injectedCalls - before };
    };
    const injected = { views: await injectedCall(VIEW_GRANTS), derived: await injectedCall(DERIVED_GRANTS), exact: await injectedCall([PREVIEW_GRANT]) };
    const denied = { outcome: "authorization", spawns: 0 };
    expect(Object.values(views), "each viewing grant alone").toStrictEqual(VIEW_GRANTS.map(() => denied));
    expect(allViews, "every viewing grant together").toStrictEqual(denied);
    expect(Object.values(derived), "each derived spelling").toStrictEqual(DERIVED_GRANTS.map(() => denied));
    expect(exact, "the preview's exact grant").toStrictEqual({ outcome: "ok", spawns: 1 });
    expect({ discovered, inspected }, "the preview's grant lists and inspects nothing; the viewing grants do").toStrictEqual({
      discovered: { disclosure: [], view: [PREVIEW_ID] },
      inspected: { disclosure: "authorization", view: "unavailable" },
    });
    expect(injected, "the injected seam reads the same").toStrictEqual({
      views: { outcome: "authorization", calls: 0 },
      derived: { outcome: "authorization", calls: 0 },
      exact: { outcome: "ok", calls: 1 },
    });
    return done("C2", { views, allViews, derived, exact, discovered, inspected, injected });
  },
};

/** ROT13 over ASCII letters: an encoding the compiler never cooks (R-ENCODED). */
function rot13(value: string): string {
  return value.replace(/[a-z]/gi, letter => {
    const base = letter <= "Z" ? 65 : 97;
    return String.fromCharCode(((letter.charCodeAt(0) - base + 13) % 26) + base);
  });
}

describe("wb-5ltg.2 shared reactive data subscription census (RC-NATIVE-INTERFACE-COMPONENT-CONTRACT-R2)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:2", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, scan: json(SCAN), residuals: RESIDUAL_FAMILIES }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing in the tracked bead export, read as filed (the owner block, never an appended note).
    const exported = readBeadRow();
    const filing = filingOf(exported);
    const readings = readingsOf(filing);
    expect(readings.clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    expect(readings.trigger, "the trigger names the producer").toContain("<SDK>");
    const coverage = [...readings.clauses, readings.trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["A"], ["A"]]);
    expect(readings.quote, "the filing's quote and citation").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(filing.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${PROGRAM_PIN}`) && producerPin("program").ref.startsWith(PROGRAM_PIN), "the citation pins the program ref the roster measured").toBe(true);
    expect(readings.anchors, "each noun member's anchor outside this file").toStrictEqual(ANCHORS);
    // The quiet row (U1 of refusal #1): a note appended after the owner block, spelling every noun member (CS included) and
    // carrying its own acceptance, quote, Shipped, merged and authority lines, changes no reading of the filing.
    const appended: BeadRow = { title: exported.title, notes: `${exported.notes}${appendedNote()}` };
    expect(readingsOf(filingOf(appended)), "an appended note changes no reading of the filing").toStrictEqual(readings);
    // Non-vacuity: read past the owner block, the same note would flip every anchor to the filing, CS included.
    const pastBlock = anchorsOf(filing.title, `${filing.block}${appendedNote()}`);
    expect(pastBlock, "the appended note spells every noun member").toStrictEqual(Object.fromEntries(NOUNS.map(noun => [noun.id, "filing"])));
    // An owner block edited in place is refused, never read through the appended note's copy of the edited line.
    const edited: BeadRow = { title: exported.title, notes: `${filing.block.replace(SHIPPED_LINE, "Shipped: yes.")}${appendedNote()}` };
    expect(() => filingOf(edited), "an owner block edited in place").toThrow(/owner filing block changed/);
  });

  for (const row of ROWS) {
    describe(`row ${row.id}: ${ROW_TITLES[row.id] ?? ""}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order, with its pinned assertion count").toEqual(ROSTER.reached);
    expect(REACHED.map(entry => entry.split(":")[0]), "the reached pins are the rows' pins").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].filter(name => nounsIn(wordsOf(name)).length > 0), "registered titles spelling a noun member").toEqual([]);
  });
});
