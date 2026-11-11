/**
 * wb-a9l2.2 (RF-HARNESS2-FEDERATED-PEER-R2), the absent-today leg. Statement (bead notes): "If Pi ever reads a graph/v3
 * [[source]] row of kind <GATED_KIND> or an `rf graph test --candidate C --json` shadow-render of one, it shall surface it only
 * from the stored receipt the envelope names and echo the row's producer fields verbatim; until gating artifacts rfc-lr9nu.2 and
 * fw-b FW-08b rfc-0txnl.19 ship (neither at the pin), Pi pins that <GATED_KIND> is absent from rf's closed source_kinds()
 * vocabulary (task, git, literal, file, lens_key)." (harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:14@6a251bf73af5).
 * wb-sjx2 (the landing-253 follow-up, R694) cures that cut's PREP findings F1-F4; FOLLOW-UP below says where each lands.
 * wb-yf50 (the landing-346 follow-up, R694) cures wb-sjx2's gate findings F1-F3 the same way.
 *
 * <GATED_KIND> is that federated source kind. This file never spells it: GATED_KIND composes it from its two words at runtime and
 * every label writes the placeholder, so row A's whole-tree scan holds over this file and its roster too (residual R-COMPOSED
 * names what that costs).
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): source_kinds() is
 * src/reactive_fiber_cli/definitions/graph_schema.py:609 and tests/unit/test_graph_schema.py:870 asserts it equals ("task",
 * "git", "literal", "file", "lens_key"); a git grep of the kind over the producer's src and tests is empty (rc 1);
 * src/reactive_fiber_cli/schemas/cli holds the sixteen graph.<leaf>.schema.json files of GRAPH_LEAVES; neither
 * context.render.schema.json nor graph.test.schema.json declares a source-row property. Gating artifacts: rfc-lr9nu.2 (H2-05b,
 * harness2 BEADS-2026-10-21.md:14) and rfc-0txnl.19 (FW-08b, federated-workspaces-2026-10-18/BEADS-2026-10-21.md:30).
 * The group-global options (wb-sjx2, read the same way at the same pin): src/reactive_fiber_cli/cli/parser.py:251-260
 * GLOBAL_OPTIONS, "the eight global options, accepted before and after the subcommand with identical semantics" (CLI-A25),
 * and VERBOSE_FLAGS (:277; a run such as -vv, _VERBOSE_RUN :291). _add_globals (:3141-3201) registers them on every group
 * parser (_add_group :3458), so a global standing between "graph" and the leaf still runs the leaf. RF_VALUE_OPTIONS (:286)
 * are the three that take a value, spelled `--opt VALUE` or `--opt=VALUE`. The end-of-options marker (wb-yf50): ARGV_END
 * (:241) is "--", and argparse reads every word after it as a positional, so a group parser takes the leaf after it and
 * refuses a global there - installed rf 0.1.836 dispatched `rf graph -- show` as graph.show (gate-prep-13, wb-sjx2 F2), and
 * an argparse model of the group parser under Python 3.12.15 and 3.15.0 (installed rf 0.1.844's interpreter) reads
 * `graph -- show` and `graph --json -- show` as show and refuses `graph -- --json show`.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1-A4 scan every file of src, test, docs and qa as UTF-8 for GATED_FAMILY (SCAN_ROOTS: a floor on the
 *    files walked, one anchor file whose anchor token must be read, and git's own list of the root - every regular file git
 *    would commit there, tracked or untracked and not ignored, the anchor among them - must all have been walked, so an
 *    emptied, misdirected or partial walk reds); A5 the pinned vocabulary excludes the kind; A6 no registered native
 *    descriptor's JSON spells it (the served half).
 *  B, acceptance (b). Pi's one rf reader is the reactivefiber.render.preview provider. B1: a stand-in rf answers with a render
 *    envelope carrying one such row, and the provider's reading carries that envelope byte for byte - the row's kind, receipt and
 *    producer fields verbatim, nothing added inside it (the reading adds only its own contract and workspaceRoot beside it); B2
 *    the reader adapter projects none of the row (no topology string carries the kind or any row value); B3 the shadow-render
 *    envelope itself (command graph.test) is refused by the provider as an unrecognized envelope, in one spawn of the render argv;
 *    B4 the reader adapter refuses a reading that carries it. Both envelopes are CONSTRUCTED: no shipped rf schema carries a
 *    source row, so the render row rides an additive result key (the provider admits additive keys) and the graph.test row sits
 *    in the schema's required shadow object.
 *  C, acceptance (c). C1 RECONCILE_EVIDENCE_READS.reactivefiber (src/workflow/reconcile.ts:67); C2 the reactivefiber.* ids of
 *    the native and the injected registration; C3 and C4 the spawned argv of both input arms (renderArgv,
 *    providers/reactivefiber.ts:111-115) against a stand-in rf; C5 an AST scan of every src module (each .ts module git lists
 *    under src must be scanned) for an rf graph verb - an argv "graph" followed by a GRAPH_LEAVES word once rf's group-global
 *    options are skipped (a value global with its value, literal or not) or past rf's end-of-options marker, or a string or
 *    template literal spelling one, globals between "graph" and the leaf included - and of every native descriptor; C6 the
 *    receipt rule: a registered reactivefiber.* descriptor beyond the preview needs a docs/workbench/receipts file naming it and
 *    both GATING_ARTIFACTS, each as a whole id (no id character before it or after it and no dot continuation: rfc-lr9nu.20,
 *    rfc-lr9nu.2.1 and xrfc-lr9nu.2 do not name rfc-lr9nu.2). None exists, so the real reading is empty; synthetic
 *    registrations exercise the checker.
 *  M, the matcher row A reads: M1-M10 the spellings GATED_FAMILY must catch (M10 a run of several separators); Q1-Q3 the
 *    pinned quiet rows of the residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, the five vocabularies - is held to the out-of-file roster
 * test/fixtures/rf-federated-source-kind-roster.json. A pin deleted, relabelled, swapped for another passing case, or removed
 * from every literal here at once still reds against the roster, and every pin's witness is measured by its own case.
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED a spelling whose two words are split by a character outside
 * the separator class, a zero-width code point (Q1) or a homoglyph letter (Q2), is not caught; R-COMPOSED a spelling assembled
 * at runtime from parts, this file's own mechanism, is invisible to any text scan (Q3), and A6 is the runtime backstop for
 * served descriptor text only; R-ARGV-COMPOSED an rf graph argv or command built from non-literal parts (an argv element or
 * spread, a template slot holding the leaf, a value global's =VALUE element composed as one template) is invisible to C5
 * (C5's composedArgv, spreadArgv, slotLeaf and composedValueArgv controls stay 0).
 * FOLLOW-UP (wb-sjx2, the landing-253 PREP findings): F1 C5 skips rf's group-global options between "graph" and the leaf in
 * both the argv check and GRAPH_VERB (must-hit controls flagArgv, valueArgv, equalsArgv, flagLiteral, valueLiteral and
 * templateValue); F2 M10 pins the separator-run tolerance (the class repeats, so a matcher allowing one separator misses
 * M10); F3 the A1-A4 and C5 walks are held to git's list of their root, not to a count floor alone; F4 C6 reads each id as a
 * whole id (controls prefixCollided and idCollided stay unreceipted, sentenceEnd is receipted).
 * FOLLOW-UP (wb-yf50, the landing-346 gate findings): F1 C6 holds each boundary clause of namesWhole to a control of its own -
 * wordLed, dotLed and hyphenLed (an id character before the id: the leading boundary), dotContinued and dotContinuedLeaf (the
 * dot continuation) and hyphenTrailed (a hyphen after it) stay unreceipted, and formatted (markdown punctuation around each
 * id) is receipted; F2 C5's argv check reads rf's end-of-options marker - endOfOptionsArgv and globalThenEndArgv must hit,
 * endThenGlobalArgv (a global after the marker, which rf refuses) stays 0, and endOfOptionsLiteral holds the hyphen in
 * GRAPH_VERB's separator run; F3 composedValueArgv pins the R-ARGV-COMPOSED member N09 quiet.
 * SCOPE: the vocabularies are producer facts at 6a251bf73af5; Pi vendors no rf schema, so a producer-side change is seen only
 * when an rf pin-bump re-reads them. The armed half (surface the row from its stored receipt) waits for rfc-lr9nu.2: no reader
 * is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; the four roots are only read.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  nativeReactiveFiberRender,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  type ReactiveFiberRenderSelector,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federated-source-kind-roster.json");

const WORD_A = "workspace";
const WORD_B = "resource";
/** The gated rf source kind, composed at runtime so that no file in the scanned roots spells it (this one included). */
const GATED_KIND = [WORD_A, WORD_B].join("_");
const PLACEHOLDER = "<GATED_KIND>";
/** Row A's matcher: the two words in any case, joined directly or by any run of whitespace, "_", "." or "-". */
const GATED_FAMILY = new RegExp(`${WORD_A}[\\s_.-]*${WORD_B}`, "i");

/** rf's closed [[source]] kind vocabulary at the pin, in schema order (graph_schema.py:609; test_graph_schema.py:870). */
const SOURCE_KINDS = ["task", "git", "literal", "file", "lens_key"];
/** The rf graph leaves at the pin, one schemas/cli/graph.<leaf>.schema.json each. */
const GRAPH_LEAVES = [
  "candidate.authorize", "candidate.create", "connect", "diff", "disconnect", "explain", "history", "impact",
  "patch", "preflight", "publish", "rollback", "set-optic", "show", "test", "validate",
];
/** The gating artifacts a registering receipt of a new rf graph leaf must name (bead wb-a9l2.2 acceptance (c)). */
const GATING_ARTIFACTS = ["rfc-lr9nu.2", "rfc-0txnl.19"];
const PREVIEW_ID = "reactivefiber.render.preview";
/** rf's group-global options at the pin, GLOBAL_OPTIONS (parser.py:251-260) then VERBOSE_FLAGS (:277): _add_globals registers
 * them on every group parser, so each may stand between "graph" and the leaf. */
const GROUP_GLOBALS = ["--workspace", "--actor", "--json", "--no-input", "--yes", "--debug", "--color", "--no-retry", "-v", "--verbose"];
/** The group globals that take a value, as `--opt VALUE` or `--opt=VALUE` (RF_VALUE_OPTIONS, parser.py:286). */
const VALUE_GLOBALS = ["--workspace", "--actor", "--color"];
/** The first argv word of every leaf ("candidate" for both candidate leaves). */
const LEAF_WORDS = [...new Set(GRAPH_LEAVES.map(leaf => leaf.split(".")[0] ?? leaf))];
const FLAG_GLOBALS = GROUP_GLOBALS.filter(option => !VALUE_GLOBALS.includes(option));
/** A run of -v is one verbosity step per v (-vv; parser.py:291 _VERBOSE_RUN). */
const VERBOSE_RUN = /^-v+$/;
/** rf's end-of-options marker (ARGV_END, parser.py:241): argparse reads every later word as a positional, so the leaf may
 * stand right after it and a global there is no global (wb-yf50 F2). */
const ARGV_END = "--";
const literally = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** One group global inside a command string, then whitespace: a value global with its value (=VALUE, or the next word, quoted
 * or bare), a flag, or a -v run. No two alternatives match the same text, so a long run of globals cannot backtrack
 * exponentially. */
const GLOBAL_WORD = `(?:(?:${VALUE_GLOBALS.map(literally).join("|")})(?:=\\S*|\\s+(?:"[^"]*"|'[^']*'|[^\\s"']\\S*))|${FLAG_GLOBALS.filter(flag => !VERBOSE_RUN.test(flag)).map(literally).join("|")}|-v+)(?=\\s)`;
/** An rf graph verb in a string: "graph", any run of group globals (F1), then a separator run and a leaf word. */
const GRAPH_VERB = new RegExp(`\\bgraph(?:\\s+${GLOBAL_WORD})*[\\s._-]+(?:${LEAF_WORDS.join("|")})\\b`, "i");
const ROOT = process.cwd();

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hermetic guard asserts 0 <GATED_KIND> occurrences as a served or known source kind in Pi src/test/docs/qa while the pinned source_kinds() excludes it",
    pins: ["A1", "A2", "A3", "A4", "A5", "A6"],
  },
  {
    id: "B",
    label: "(b) a fixture shadow-render envelope with one <GATED_KIND> row is echoed (kind and receipt fields verbatim) with no value the envelope lacks",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) Pi's rf roster stays reactivefiber.render.preview only (reconcile.ts:67, renderArgv :111-115, no rf graph verb); a new rf graph leaf names the gating artifacts in its registering receipt",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6"],
  },
  {
    id: "M",
    label: "row A's matcher catches every separator and case spelling of <GATED_KIND>, and its named residuals stay pinned quiet",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "Q1", "Q2", "Q3"],
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
interface Roster {
  readonly sourceKinds: readonly string[];
  readonly graphLeaves: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly groupGlobals: readonly string[];
  readonly valueGlobals: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function firstOf(value: Json | undefined, field: string): Json {
  const first = Array.isArray(value) ? value[0] : undefined;
  if (first === undefined) throw new Error(`${field} must be a non-empty list`);
  return first;
}

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
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    sourceKinds: strings(raw.sourceKinds, "sourceKinds"),
    graphLeaves: strings(raw.graphLeaves, "graphLeaves"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    groupGlobals: strings(raw.groupGlobals, "groupGlobals"),
    valueGlobals: strings(raw.valueGlobals, "valueGlobals"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
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
/** Whether a repo-relative path is a regular file now (a symlink, a directory or a vanished path is not). */
function regularFile(path: string): boolean {
  try {
    return lstatSync(join(REPO, path)).isFile();
  } catch {
    return false;
  }
}
/** What git would commit below a root, read from git and not from the walk: tracked or untracked and never ignored, regular
 * files only, as the walk follows no symlink. */
function gitFilesBelow(root: string): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", root], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && regularFile(path)))];
}
/** The listed paths the walk did not read; a path gone by the time it is checked is no miss (callers list before walking, so
 * a file added mid-walk is walked, never missed). */
function unwalked(listed: readonly string[], walked: readonly string[]): string[] {
  const seen = new Set(walked.map(file => relative(REPO, file)));
  return listed.filter(path => !seen.has(path) && regularFile(path));
}

interface ScanRoot {
  readonly pin: string;
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}

/** The four roots acceptance (a) names; each floor sits below the count measured at base 0b2a80f (src 115, test 453, docs 66,
 * qa 67 files), so an emptied walk reds and an additive change does not; git's list of the root binds the rest (F3: a walk
 * that skips one directory keeps every floor). */
const SCAN_ROOTS: readonly ScanRoot[] = [
  { pin: "A1", root: "src", floor: 100, anchorFile: "workflow/reconcile.ts", anchorToken: "RECONCILE_EVIDENCE_READS" },
  { pin: "A2", root: "test", floor: 400, anchorFile: "helpers/rf-render-fixture.ts", anchorToken: "RF_FIXTURE_RELEASE" },
  { pin: "A3", root: "docs", floor: 50, anchorFile: "workbench/13-contracts-and-config.md", anchorToken: "reactivefiber.render.preview" },
  { pin: "A4", root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];

function scanRoot(scan: ScanRoot): Json {
  const base = join(REPO, scan.root);
  const listed = gitFilesBelow(scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const hits = files.filter(file => GATED_FAMILY.test(textOf(file))).map(file => relative(REPO, file));
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const anchorListed = listed.includes(relative(REPO, anchor));
  const missed = unwalked(listed, files);
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(anchorListed, `${scan.root}: git does not list the anchor ${scan.anchorFile}`).toBe(true);
  expect(missed, `files git lists under ${scan.root} that the walk did not read`).toEqual([]);
  expect(hits, `files spelling the gated kind under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, anchorFile: scan.anchorFile, anchorToken: scan.anchorToken, floorMet, anchorRead, anchorListed, missed, hits };
}

let nativeIds: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** The native registration's descriptors, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeIds;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `envelope` and exits 0. */
function standInRf(envelope: Json): string {
  const folder = makeScratch("rf-federated-source-kind-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}

/** The constructed source row: its kind, the stored receipt it names and its producer fields, every value distinct. */
const SOURCE_ROW: JsonObject = {
  id: "peer_notes_fixture",
  kind: GATED_KIND,
  receipt: { receipt_id: `rfr_${"r".repeat(22)}`, digest: `sha256:${"9".repeat(64)}`, stored_at: "2026-10-21T00:00:00Z" },
  producer: { workspace_id: `rfw_${"p".repeat(22)}`, resource: "peer.notes.fixture", revision: `sha256:${"8".repeat(64)}` },
};
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
const ROW_VALUES = stringLeaves(SOURCE_ROW);

/** A render envelope of the pinned full shape whose result carries the row on an additive key. */
function renderWithRow(): JsonObject {
  const envelope = fullShapeRf(ROOT);
  return { ...envelope, result: { ...objectOf(envelope.result, "fullShapeRf result"), sources: [SOURCE_ROW] } };
}
/** The shadow-render envelope itself: graph.test's required result keys at the pin, the row inside its shadow object. */
function shadowWithRow(): JsonObject {
  const workspace = objectOf(fullShapeRf(ROOT).workspace, "fullShapeRf workspace");
  return {
    schema: "reactive-fiber.cli/v1", ok: true, command: "graph.test", operation_id: `rfo_${"b".repeat(22)}`,
    workspace, transaction_id: null,
    result: {
      overlay: { overlay_id: `rfg_${"c".repeat(22)}`, revision: 1 }, valid: true, checks: [], shadow: { sources: [SOURCE_ROW] },
      comparisons: [], published_head_unchanged: true, effects_authorized: false, validation_digest: `sha256:${"7".repeat(64)}`,
    },
    diagnostics: [],
  };
}
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function argvOf(selector: ReactiveFiberRenderSelector): Promise<Json> {
  const log = standInRf(fullShapeRf(ROOT));
  await nativeReactiveFiberRender(selector, ROOT);
  const spawns = spawnsOf(log);
  expect(spawns).toHaveLength(1);
  const argv = spawns[0] ?? [];
  expect(argv).not.toContain("graph");
  return { argv: argv.map(item => (item === ROOT ? "<root>" : item)) };
}

interface VerbScan {
  readonly verbArgv: string[];
  readonly verbLiterals: string[];
  readonly renderArgv: number;
}
/** The argv word at or after `from` once rf's group globals are skipped: a flag or a -v run alone, a value global with its
 * value (literal or not) or as --opt=VALUE; past an end-of-options marker, the word right after it, never skipped; "" when
 * the argv ends first or a non-literal element stands there. */
function wordAfterGlobals(words: readonly string[], from: number): string {
  let at = from;
  while (at < words.length) {
    const word = words[at] ?? "";
    if (word === ARGV_END) return words[at + 1] ?? "";
    if (VALUE_GLOBALS.includes(word)) at += 2;
    else if (FLAG_GLOBALS.includes(word) || VERBOSE_RUN.test(word) || VALUE_GLOBALS.some(option => word.startsWith(`${option}=`))) at += 1;
    else return word;
  }
  return "";
}
/** One module's rf graph verbs: an argv array with "graph" followed by a leaf word (group globals skipped), or a string or
 * template literal spelling one. */
function scanVerbs(fileName: string, text: string): VerbScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const verbArgv: string[] = [];
  const verbLiterals: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (elements.some((element, index) => element === "graph" && LEAF_WORDS.includes(wordAfterGlobals(elements, index + 1)))) {
        verbArgv.push(`${fileName}: [${elements.filter(Boolean).join(", ")}]`);
      }
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node) && GRAPH_VERB.test(node.text)) verbLiterals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      // A slot reads either as a separator or as a word of its own (a value global's value).
      if (GRAPH_VERB.test(parts.join(" ")) || GRAPH_VERB.test(parts.join(" <expr> "))) verbLiterals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { verbArgv, verbLiterals, renderArgv };
}

/** Whether a text names an id whole: no id character (a word character, "." or "-") before it, no word character or "-"
 * after it and no "." continued by a word character, a sentence's closing dot aside (F4: rfc-lr9nu.20 and rfc-lr9nu.2.1 do
 * not name rfc-lr9nu.2; wb-yf50 F1 holds each clause to a C6 control of its own). */
function namesWhole(text: string, id: string): boolean {
  return new RegExp(`(?<![\\w.-])${literally(id)}(?![\\w-]|\\.\\w)`).test(text);
}
/** The reactivefiber.* descriptors beyond the preview that no receipt names, whole, together with both gating artifacts. */
function unreceiptedLeaves(ids: readonly string[], receipts: readonly string[]): string[] {
  return ids
    .filter(id => id.startsWith("reactivefiber.") && id !== PREVIEW_ID)
    .filter(id => !receipts.some(text => namesWhole(text, id) && GATING_ARTIFACTS.every(artifact => namesWhole(text, artifact))));
}

const caps = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** M1-M10 must hit (M10 a five-character separator run: a space, "_", "." and "-", then a space); Q1 and Q2 are
 * R-INTERRUPTED, Q3 is R-COMPOSED (the source text of this file's own composition). */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: `${WORD_A}_${WORD_B}`, hit: true },
  { pin: "M2", text: `${WORD_A}-${WORD_B}`, hit: true },
  { pin: "M3", text: `${WORD_A}.${WORD_B}`, hit: true },
  { pin: "M4", text: `a ${WORD_A} ${WORD_B} row`, hit: true },
  { pin: "M5", text: `${WORD_A}\n${WORD_B}`, hit: true },
  { pin: "M6", text: `${WORD_A}${caps(WORD_B)}`, hit: true },
  { pin: "M7", text: `${caps(WORD_A)}${caps(WORD_B)}`, hit: true },
  { pin: "M8", text: `${WORD_A}_${WORD_B}`.toUpperCase(), hit: true },
  { pin: "M9", text: `kind = "${WORD_A}_${WORD_B}s"`, hit: true },
  { pin: "M10", text: `${WORD_A} _.- ${WORD_B}`, hit: true },
  { pin: "Q1", text: `${WORD_A}${String.fromCodePoint(0x200b)}_${WORD_B}`, hit: false },
  { pin: "Q2", text: `${WORD_A}_${WORD_B.replace("e", String.fromCodePoint(0x0435))}`, hit: false },
  { pin: "Q3", text: '[WORD_A, WORD_B].join("_")', hit: false },
];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  ...Object.fromEntries(SCAN_ROOTS.map(scan => [scan.pin, async () => scanRoot(scan)])),
  A5: async () => {
    const gatedExcluded = SOURCE_KINDS.every(kind => !GATED_FAMILY.test(kind)) && !SOURCE_KINDS.includes(GATED_KIND);
    expect(gatedExcluded).toBe(true);
    return { sourceKinds: SOURCE_KINDS, gatedExcluded };
  },
  A6: async () => {
    const { ids, texts } = await nativeDescriptors();
    const hits = ids.filter((_, index) => GATED_FAMILY.test(texts[index] ?? ""));
    const descriptorFloorMet = ids.length >= 4;
    expect(descriptorFloorMet, `native descriptors: ${ids.join(", ")}`).toBe(true);
    expect(hits).toEqual([]);
    return { rfIds: ids.filter(id => id.startsWith("reactivefiber.")), descriptorFloorMet, hits };
  },
  B1: async () => {
    const envelope = renderWithRow();
    const log = standInRf(envelope);
    const reading = await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT);
    // Kind, receipt and producer fields verbatim, and nothing inside the envelope that the stand-in did not print.
    expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
    const read = objectOf(reading, "reading");
    const result = objectOf(objectOf(read.source, "reading source").result, "reading result");
    const row = objectOf(firstOf(result.sources, "reading result.sources"), "row");
    expect(row).toStrictEqual(SOURCE_ROW);
    return {
      contract: String(read.contract), readingKeys: Object.keys(read).sort(), rowKind: row.kind === GATED_KIND ? PLACEHOLDER : String(row.kind),
      receiptFields: Object.keys(objectOf(row.receipt, "row receipt")).sort(), producerFields: Object.keys(objectOf(row.producer, "row producer")).sort(),
      spawns: spawnsOf(log).length,
    };
  },
  B2: async () => {
    const reading: JsonValue = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: renderWithRow() };
    const topology = reactivefiberTopology(reading, OBSERVER_CONTEXT);
    const shown = stringLeaves(topology);
    const stringsRead = shown.length >= 5;
    const surfaced = shown.filter(text => GATED_FAMILY.test(text) || ROW_VALUES.some(value => text.includes(value)));
    expect(stringsRead, `topology strings: ${shown.length}`).toBe(true);
    expect(surfaced).toEqual([]);
    return { snapshots: topology.snapshots.length, stringsRead, surfaced };
  },
  B3: async () => {
    const log = standInRf(shadowWithRow());
    const error = await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT).then(() => undefined, (caught: unknown) => caught);
    const refusal = refusalOf(error);
    const spawns = spawnsOf(log);
    expect(spawns).toHaveLength(1);
    expect(spawns[0]).not.toContain("graph");
    return { ...refusal, spawns: spawns.length, verb: (spawns[0] ?? []).slice(2, 4) };
  },
  B4: async () => {
    const reading: JsonValue = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: shadowWithRow() };
    let caught: unknown;
    try {
      reactivefiberTopology(reading, OBSERVER_CONTEXT);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CapabilityError);
    return refusalOf(caught);
  },
  C1: async () => {
    expect(RECONCILE_EVIDENCE_READS.reactivefiber).toStrictEqual([PREVIEW_ID]);
    return { reactivefiber: [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])] };
  },
  C2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, async () => { throw new Error("the injected reader is never invoked here"); }, ROOT);
    const native = (await nativeDescriptors()).ids.filter(id => id.startsWith("reactivefiber."));
    const injectedIds = injected.catalogSnapshot().map(entry => entry.descriptor.id).filter(id => id.startsWith("reactivefiber."));
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    return { native, injected: injectedIds };
  },
  C3: async () => argvOf({ model: "m", task: "t" }),
  C4: async () => argvOf({ view: "v", taskId: "t", model: "m" }),
  C5: async () => {
    const listedModules = gitFilesBelow("src").filter(path => path.endsWith(".ts"));
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const missedModules = unwalked(listedModules, files);
    expect(missedModules, "src modules git lists that C5 did not scan").toEqual([]);
    const found = files.map(file => scanVerbs(relative(REPO, file), textOf(file)));
    const verbArgv = found.flatMap(result => result.verbArgv);
    const verbLiterals = found.flatMap(result => result.verbLiterals);
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const { ids, texts } = await nativeDescriptors();
    const descriptorVerbs = ids.filter((_, index) => GRAPH_VERB.test(texts[index] ?? ""));
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ verbArgv, verbLiterals, descriptorVerbs }, "an rf graph verb needs rfc-lr9nu.2 and rfc-0txnl.19 in its registering receipt").toStrictEqual({ verbArgv: [], verbLiterals: [], descriptorVerbs: [] });
    const control = (text: string): number => {
      const scan = scanVerbs("control.ts", text);
      return scan.verbArgv.length + scan.verbLiterals.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "graph", "test", "--candidate", c, "--json"]);'),
      spaced: control('const cmd = "rf graph show --json";'),
      dotted: control('const id = "graph.connect";'),
      template: control(["const cmd = `rf graph  rollback $", "{x}`;"].join("")),
      // F1: a group global between "graph" and the leaf, in each spelling rf parses (must hit).
      flagArgv: control('spawn("rf", ["graph", "--json", "test", "--candidate", c]);'),
      valueArgv: control('spawn("rf", ["--workspace", w, "graph", "--workspace", w, "test", "--candidate", c, "--json"]);'),
      equalsArgv: control('spawn("rf", ["graph", "--color=never", "-vv", "--no-retry", "show"]);'),
      flagLiteral: control('const cmd = "rf graph --no-input test --candidate C --json";'),
      valueLiteral: control("const cmd = \"rf graph --actor ops --workspace '/w a' --yes rollback\";"),
      templateValue: control(["const cmd = `rf graph --workspace $", "{root} show`;"].join("")),
      // wb-yf50 F2: rf's end-of-options marker before the leaf (must hit); a global after it is refused by rf (quiet).
      endOfOptionsArgv: control('spawn("rf", ["graph", "--", "show"]);'),
      globalThenEndArgv: control('spawn("rf", ["graph", "--json", "--", "show"]);'),
      endThenGlobalArgv: control('spawn("rf", ["graph", "--", "--json", "show"]);'),
      endOfOptionsLiteral: control('const cmd = "rf graph -- show";'),
      // R-ARGV-COMPOSED: non-literal parts stay unread (quiet).
      composedArgv: control('const leaf = "test"; spawn("rf", ["graph", leaf]);'),
      spreadArgv: control('spawn("rf", ["graph", ...globals, "test"]);'),
      slotLeaf: control(["const cmd = `rf graph --json $", "{leaf}`;"].join("")),
      composedValueArgv: control(['spawn("rf", ["graph", `--workspace=$', '{root}`, "test"]);'].join("")),
    };
    return { srcFloorMet, renderArgvSeen, verbArgv, verbLiterals, descriptorVerbs, missedModules, controls };
  },
  C6: async () => {
    const receiptsDir = join(REPO, "docs", "workbench", "receipts");
    const receipts = filesBelow(receiptsDir).filter(file => file.endsWith(".md")).map(textOf);
    expect(receipts.length).toBeGreaterThanOrEqual(1);
    const real = unreceiptedLeaves((await nativeDescriptors()).ids, receipts);
    expect(real).toEqual([]);
    const leaf = "reactivefiber.graph.test";
    const ids = [PREVIEW_ID, leaf];
    const both = GATING_ARTIFACTS.join(" and ");
    return {
      real,
      noReceipt: unreceiptedLeaves(ids, []),
      oneArtifact: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${GATING_ARTIFACTS[0]}`]),
      bothArtifacts: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${both}`]),
      // F4: an id is named whole - a longer id sharing its prefix names neither the artifact nor the leaf.
      prefixCollided: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${GATING_ARTIFACTS[0]}0 and ${GATING_ARTIFACTS[1]}`]),
      idCollided: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf}s under ${both}`]),
      sentenceEnd: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${both}.`]),
      // wb-yf50 F1: each boundary clause of namesWhole by itself - an id character before the id (the leading boundary), a dot
      // continuation or a trailing hyphen leaves the leaf unreceipted; markdown punctuation around each id does not.
      wordLed: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under x${GATING_ARTIFACTS[0]} and ${GATING_ARTIFACTS[1]}`]),
      dotLed: unreceiptedLeaves(ids, [`# wb-x: registers sub.${leaf} under ${both}`]),
      hyphenLed: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${GATING_ARTIFACTS[0]} and x-${GATING_ARTIFACTS[1]}`]),
      dotContinued: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${GATING_ARTIFACTS[0]}.1 and ${GATING_ARTIFACTS[1]}`]),
      dotContinuedLeaf: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf}.v2 under ${both}`]),
      hyphenTrailed: unreceiptedLeaves(ids, [`# wb-x: registers ${leaf} under ${GATING_ARTIFACTS[0]} and ${GATING_ARTIFACTS[1]}-rc`]),
      formatted: unreceiptedLeaves(ids, [`# wb-x: registers \`${leaf}\` (${GATING_ARTIFACTS[0]}), ${GATING_ARTIFACTS[1]}, landed`]),
    };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = GATED_FAMILY.test(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
};

describe("wb-a9l2.2 federated source kind census (RF-HARNESS2-FEDERATED-PEER-R2, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:4", "C:6", "M:13"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const vocabularies = { sourceKinds: SOURCE_KINDS, graphLeaves: GRAPH_LEAVES, gatingArtifacts: GATING_ARTIFACTS, groupGlobals: GROUP_GLOBALS, valueGlobals: VALUE_GLOBALS };
    expect(vocabularies).toStrictEqual({
      sourceKinds: [...ROSTER.sourceKinds], graphLeaves: [...ROSTER.graphLeaves], gatingArtifacts: [...ROSTER.gatingArtifacts],
      groupGlobals: [...ROSTER.groupGlobals], valueGlobals: [...ROSTER.valueGlobals],
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
        });
      }
    });
  }
});
