/**
 * wb-fb2z.4 (TSX-COMPONENT-ASSEMBLY-R4, program-triage-2026-10-22), the TSX replay status census. Statement (bead notes, full
 * form): "No Pi surface shall label a TSX capture/replay replayable_exact or exact from blob-checksum availability or opaque
 * non-serializable state; Pi echoes the producer's replay status word and the RFTSX_REPLAY_VERSION_DRIFT {captured,current}
 * diagnostic verbatim (gated TSX-IO-04 rftsx-3ajfy; the code is absent from src/diagnostics/codes.ts and src/python at
 * 76bbbffd9d4a), treats a cross-runtime mismatch as incompatible/unsupported and never synthesizes a replay status word"
 * (ReactiveFiberTSXSDK docs/programs/component-assembly-2026-10-18/RFCLI-INTEROP.md:33@76bbbffd9d4a). Acceptance (owner filing,
 * verbatim; the labels of rows A to D quote it): "(a) absence pin: Pi reads no TSX capture/replay classification today; a guard
 * asserts the code is absent from the pinned codes table and Pi surfaces nothing; (b) armed on landing: a replay fixture with
 * versions.package drift surfaces the producer's unchanged status plus the drift diagnostic verbatim, and a mutant upgrading to
 * exact on checksum match fails; (c) Pi never synthesizes a replay status word; an unknown word stays unknown (wb-973.10, wb-2j3.2
 * never-synthesize rule)."
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23; every producer fact rides the roster with its blob id): at the program pin
 * the producer (@reactive-fiber/tsx 0.1.668) closes the replay status words at REPLAY_STATUSES = matched | mismatched | failed
 * (src/replay/report.ts:39), the ReplayReport schema (tests/fixtures/docs/replay-report.schema.json) requires fourteen keys, admits
 * no other and closes status to the same three words, and the codes table (src/diagnostics/codes.ts, 199 rows, set-equal to the
 * frozen list tests/golden/diagnostic-codes.json) carries eight REPLAY rows (:1681-1745) and no RFTSX_REPLAY_VERSION_DRIFT; `git
 * grep` of the code and of replayable_exact over src/ and python/ matches no file. The TSX distribution the installed rf runs (rf
 * 0.1.832, integrations/tsx/runtime-lock.json: @reactive-fiber/tsx 0.1.649 from ReactiveFiberTSXSDK 5da03a7d49f4, an ancestor of
 * the pin) has the same eight rows and three words and no drift code either, and the installed rf package spells no RFTSX_REPLAY
 * code and no rftsx.replay-report or rftsx.render-capture name anywhere. replayable_exact is rf's replayability classification word
 * (the enum replayable_exact | replayable_with_captured_external_inputs | replayable_with_declared_variance | not_replayable of its
 * cli schemas); rf's context.render schema carries no replayability member, so the one rf envelope Pi reads cannot carry it.
 * THE FIXTURES (the roster's fixtures): base is the producer's own example report, verbatim from docs/guides/replay.md:160 at the
 * pin (the `json rftsx.replay-report` fence). Every other fixture is CONSTRUCTED from base by the delta the roster names: drift
 * follows the gating row's acceptance (BEADS-2026-10-21.md:29: "capture versions.package 0.1.600 replayed at 0.1.649 -> status
 * unchanged + one RFTSX_REPLAY_VERSION_DRIFT {captured,current}"), its diagnostic in the producer's Diagnostic shape
 * (src/diagnostics/diagnostic.ts:88-97; the severity and message are this census's, the producer mints neither yet); equal is the
 * same capture at the current version (no diagnostic); opaque lists one re-initialised runtime-only slot on a matched report (the
 * guide's own runtime-only example is matched with one such slot: the opaque non-serializable state of the statement);
 * mismatched follows the producer's mismatch path (src/replay/replay.ts:652-666: status mismatched, the pointer, one
 * RFTSX_REPLAY_MISMATCH {firstMismatchPath, expected, actual}) over the guide's branch example (docs/guides/replay.md:337-373, branch
 * main recorded and branch dev replayed; the pointer form /output/blocks/0/content of :148); failed follows the renderer-missing
 * path (replay.ts:514-523 and :367-377: status failed, the empty fill, one RFTSX_REPLAY_RENDERER_MISSING {rendererId,
 * componentId}); incompatible and unsupported carry the program's cross-runtime words as status (no producer word at the pin, so
 * a future word); absent drops status. Measured with ajv 2020-12 against the pin's schema: base, drift, equal, opaque, mismatched
 * and failed validate with 0 errors; incompatible and unsupported are refused at the status enum and absent at the required
 * status, so those three exist only as future-producer forms.
 *
 * Pi reads no TSX capture or replay result today: no src module loads the producer, and Pi's one reader that a TSX worker's output
 * reaches is the reactivefiber.render.preview provider, whose rf seam admits only context.render envelopes. The census pins that,
 * the guard the acceptance names, and an ARMED half that binds the first TSX replay reader to come:
 *  A, the trigger, (a). A1 every src module read as tokens for VOCABULARY (snake, camel, constant and kebab spellings fold to one
 *    token, matched inside longer identifiers too) and for the producer's package spelling (SPECIFIER), every native descriptor and
 *    every key and value of rf's frozen render result roster (test/fixtures/rf-result-keys.json) alike, with a floor, the nearest
 *    TSX reader as the anchor (src/workbench/reactivefiber-observer.ts reads only the TSX engine identity and worker counters,
 *    quiet), and controls; a module that spells one must be bound in TSX_REPLAY_READERS and every binding must name such a module
 *    (empty both ways today). A2 the native reader against a stand-in rf: a bare report on stdout is the transport refusal of an
 *    unrecognized envelope, never a reading; a report riding an otherwise valid render, as a result member (result.replay) or
 *    inside a member the adapter reads (result.provenance.replay), is admitted with the reading's source byte for byte, and the
 *    reader adapter's projection is byte-identical to the same render without it and surfaces none of the report's strings: Pi
 *    neither echoes nor labels it on any display path.
 *  B, the guard, (a). B1 the pinned codes table: the drift code is absent from the REPLAY family, from the whole 199-code table and
 *    from the distribution's family, the family is the table's RFTSX_REPLAY_ prefix set, and the status words agree with the
 *    schema enum; B2 no file of src, docs, qa or the front matter spells an RFTSX code, an rftsx schema name or the exact label, and
 *    no unit (line, table cell or sentence) couples a TSX mention with a replay or capture word and an exactness word, with the
 *    judges read on controls.
 *  C, armed on landing, (b). C1 the fixture oracle: each fixture is base plus exactly its delta, and the four valid ones meet the
 *    pin's schema facts (key set, status enum, matched iff status matched, mode replay); C2 the armed check (violationsOf) on
 *    synthetic readers: the honest echo passes every fixture, and the mutant that upgrades to exact on checksum match fails (it is
 *    honest when the checksums are not verified), as do the opaque-state exact label, the dropped, reworded or swapped drift
 *    diagnostic, a drift synthesized for equal versions, a re-labelled status word and a mismatched or failed report read as
 *    matched; C3 every bound reader meets C2 on every
 *    fixture (none bound today; the same loop over synthetic bindings is the non-vacuity control).
 *  D, never synthesize, (c). D1 the check on the future-word and absent forms: the honest reader echoes an unknown word verbatim
 *    with tone unknown and surfaces no word for an absent status; mapping an unknown word to a known one, a success tone for it,
 *    refusing it, a word synthesized for an absent status or an exact label all fail; D2 the never-synthesize pins the acceptance
 *    cites are registered: the wb-2j3.2 and wb-973.10 describes once each in test/workbench-reactivefiber-observer.test.ts, each
 *    with the case the rule rests on.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set - every row's id, label and
 * pins, every pin's witness, the constants, the vocabulary, the residual families and every registered test title - is held to the
 * out-of-file roster, whose producer facts (the codes table, the schema, the status words, the guide's report) anchor the
 * constants outside this file, and the labels of rows A to D are held to the bead's own acceptance text in the tracker export
 * (.beads/issues.jsonl). The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before
 * it) and the set of pins that reached their witness. Not claimed: an edit of this file and the roster together - the bead text
 * anchors only the labels of rows A to D, so a pin removed from both stays green.
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY a reader reading only the generic keys (status, matched,
 * diagnostics, code, metadata) spells no vocabulary token and is invisible to A1 (Q1); R-PARAPHRASE a reworded exactness claim
 * (identical, byte for byte) is not caught by B2 or by the armed check's exact judge (Q2); R-COMPOSED a token or label assembled at
 * runtime from parts is invisible to any text scan (Q3); R-SCOPE test/ and the tracker export .beads/ lie outside every scanned
 * root, and .beads/ spells the drift code and the exact label (the owner filing quotes the statement) (Q4); R-INTERRUPTED a token
 * split by a zero-width code point, or a label spelled with a homoglyph letter, is not caught (Q5); R-RAW-READING the native
 * reading hands the rf render's result to its caller unchanged, so a report riding it reaches a workflow script verbatim while
 * the display path ignores it: the echo the statement owes binds the armed half, not today's adapter (Q6); R-UNIT a claim whose TSX
 * mention lies in a neighbouring unit (the previous sentence, a heading) is not judged by B2, which reads one unit at a time (Q7).
 * SCOPE: the B2 judges and the armed check's exact judge do not read negation: any spelling reds, a sentence stating the
 * prohibition or denying exactness included, and B2's label judge reds an rf-only mention of the label too (OVER-READ, disclosed:
 * no Pi surface spells it today, and a page that must will re-measure this census). Tones of the known
 * words are not judged (the statement fixes none); the check judges the status word, the exact label and the drift diagnostic. The
 * producer facts are measured at the pin; Pi vendors no producer file, so a producer change is seen only when the roster is
 * re-measured. No TSX replay reader is added or faked here: a reader's own cut binds itself in TSX_REPLAY_READERS and meets C2 and
 * D1. NOT CLAIMED: the producer's incompatible/unsupported word for a cross-runtime mismatch is the producer's to mint (absent at
 * the pin); until a reader knows it, D1 holds it to verbatim and unknown.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, docs, qa and .beads are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerNativeReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "tsx-replay-status-roster.json");
const ROOT = process.cwd();
const BEAD = "wb-fb2z.4";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
/** The program pin (ReactiveFiberTSXSDK origin/main at the 2026-10-22 triage). */
const PROGRAM_PIN = "76bbbffd9d4a419f972d6fefc8b7f9dc524df8df";
/** The gating artifact's code (TSX-IO-04, rftsx-3ajfy): absent at the pin and at the distribution rf runs. */
const DRIFT_CODE = "RFTSX_REPLAY_VERSION_DRIFT";
/** REPLAY_STATUSES (src/replay/report.ts:39 at the pin): the closed status words, in the producer's order. */
const STATUS_WORDS = ["matched", "mismatched", "failed"];
/** The REPLAY family of the codes table at the pin (src/diagnostics/codes.ts:1681-1745), in declaration order. */
const REPLAY_CODES = [
  "RFTSX_REPLAY_VERSION_INVALID",
  "RFTSX_REPLAY_REDACTED_CAPTURE",
  "RFTSX_REPLAY_RENDERER_MISSING",
  "RFTSX_REPLAY_RESOURCE_MISSING",
  "RFTSX_REPLAY_MISMATCH",
  "RFTSX_REPLAY_LIVE_PATH_BLOCKED",
  "RFTSX_REPLAY_UNRECORDED_REQUEST",
  "RFTSX_REPLAY_CAPTURE_INCONSISTENT",
];
/** The program's words for a cross-runtime mismatch (RFCLI-INTEROP.md:33); no producer status word at the pin. */
const FUTURE_WORDS = ["incompatible", "unsupported"];
/** The TSX capture/replay vocabulary: the producer's schema-name prefix, its distinctive report and capture names, the drift
 * code's tail and rf's exact classification word; no src module spells one at base 6653728. The generic keys (status, matched,
 * diagnostics, code, metadata, resources, effects, commits, mode) are left out and named under R-VOCABULARY. */
const VOCABULARY = [
  "rftsx",
  "replay-report",
  "render-capture",
  "captureVersions",
  "firstMismatchPath",
  "reinitializedRuntimeOnlySlots",
  "replayable_exact",
  "version-drift",
];
/** The producer's package spelling in any separator form (@reactive-fiber/tsx, reactive_fiber_tsx, ReactiveFiberTSX). */
const SPECIFIER = /reactive[\s_.:/@-]*fiber[\s_.:/@-]*tsx/gi;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-PARAPHRASE": ["Q2"],
  "R-COMPOSED": ["Q3"],
  "R-SCOPE": ["Q4"],
  "R-INTERRUPTED": ["Q5"],
  "R-RAW-READING": ["Q6"],
  "R-UNIT": ["Q7"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and, for A to D, to the bead's acceptance text. */
const ROWS: readonly Row[] = [
  { id: "A", label: "(a, the trigger) Pi reads no TSX capture/replay classification today", pins: ["A1", "A2"] },
  {
    id: "B",
    label: "(a, the guard) a guard asserts the code is absent from the pinned codes table and Pi surfaces nothing",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) armed on landing: a replay fixture with versions.package drift surfaces the producer's unchanged status plus the drift diagnostic verbatim, and a mutant upgrading to exact on checksum match fails",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(c) Pi never synthesizes a replay status word; an unknown word stays unknown (wb-973.10, wb-2j3.2 never-synthesize rule)",
    pins: ["D1", "D2"],
  },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"] },
];
/** The fixture names: base, the five other forms the pin's schema admits, then the three future-producer forms. */
const VALID_FIXTURES = ["drift", "equal", "opaque", "mismatched", "failed"] as const;
const FUTURE_FIXTURES = ["incompatible", "unsupported", "absent"] as const;
type FixtureName = "base" | (typeof VALID_FIXTURES)[number] | (typeof FUTURE_FIXTURES)[number];
const FIXTURE_NAMES: readonly FixtureName[] = ["base", ...VALID_FIXTURES, ...FUTURE_FIXTURES];

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
  readonly programPin: string;
  readonly producer: JsonObject;
  readonly constants: JsonObject;
  readonly delta: JsonObject;
  readonly fixtures: Readonly<Record<FixtureName, JsonObject>>;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: unknown, field: string): JsonObject {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return json(value) as JsonObject;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.programPin !== "string" || !Array.isArray(raw.rows) || !isObject(raw.fixtures)) {
    throw new Error("roster must be an object with programPin, fixtures and rows");
  }
  const rawFixtures = raw.fixtures;
  const fixtures = Object.fromEntries(FIXTURE_NAMES.map(name => [name, objectOf(rawFixtures[name], `roster fixtures.${name}`)])) as Record<
    FixtureName,
    JsonObject
  >;
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
  return {
    programPin: raw.programPin,
    producer: objectOf(raw.producer, "roster producer"),
    constants: objectOf(raw.constants, "roster constants"),
    delta: objectOf(raw.delta, "roster delta"),
    fixtures,
    tests: strings(raw.tests, "roster tests"),
    rows,
  };
}

const ROSTER = readRoster();
const FIXTURES = ROSTER.fixtures;
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerPart(name: string): JsonObject {
  return objectOf(ROSTER.producer[name], `roster producer.${name}`);
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every key and every string a JSON value holds. */
function keysAndStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(keysAndStrings);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...keysAndStrings(item)]);
  return [];
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
  for (const entry of entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))) {
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
/** The repository's front matter: the regular *.md files at the root, then every file below examples/. */
function frontMatter(): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    entries = [];
  }
  const markdown = entries.filter(entry => entry.isFile() && entry.name.endsWith(".md")).map(entry => join(REPO, entry.name));
  return [...markdown.sort(), ...filesBelow(join(REPO, "examples"))];
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
  readonly files: () => string[];
}
/** The Pi surfaces A1 and B2 read; each floor sits below the count measured at base 6653728 (src 115, docs 71, qa 67 files;
 * front matter 5 root *.md files and 7 under examples/), so an emptied or misdirected walk reds and an additive change does not. */
const SURFACE_ROOTS: readonly ScanRoot[] = [
  {
    root: "src",
    floor: 100,
    anchorFile: "src/workbench/reactivefiber-observer.ts",
    anchorToken: "tsx_runtime",
    files: () => filesBelow(join(REPO, "src")),
  },
  {
    root: "docs",
    floor: 50,
    anchorFile: "docs/workbench/13-contracts-and-config.md",
    anchorToken: PREVIEW_ID,
    files: () => filesBelow(join(REPO, "docs")),
  },
  { root: "qa", floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts", files: () => filesBelow(join(REPO, "qa")) },
  { root: "front matter (root *.md, examples/)", floor: 10, anchorFile: "README.md", anchorToken: "@tintinweb/pi-subagents", files: frontMatter },
];
function walkRoot(scan: ScanRoot): { files: string[]; floorMet: boolean; anchorRead: boolean } {
  const files = scan.files();
  const floorMet = files.length >= scan.floor;
  const anchor = join(REPO, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  return { files, floorMet, anchorRead };
}

const fold = (word: string): string => word.toLowerCase().replace(/[_-]/g, "");
const FOLDED_VOCABULARY = VOCABULARY.map(fold);
/** The vocabulary words a text spells as tokens (or inside longer identifiers), folded and sorted. */
function vocabularyIn(text: string): string[] {
  const found = new Set<string>();
  for (const token of text.match(/[A-Za-z][A-Za-z0-9_-]*/g) ?? []) {
    const folded = fold(token);
    for (const word of FOLDED_VOCABULARY) if (folded.includes(word)) found.add(word);
  }
  return [...found].sort();
}
/** The producer package spellings a text holds, lowered. */
function specifiersIn(text: string): string[] {
  return [...text.matchAll(SPECIFIER)].map(match => match[0].toLowerCase());
}

/** B2's judges: any RFTSX code, any rftsx schema name, the exact label in any separator form, and the coupled unit. */
const CODE_SPELLING = /RFTSX_[A-Z0-9_]+/;
const SCHEMA_SPELLING = /\brftsx\.[a-z][a-z-]*/;
const EXACT_LABEL = /replayable[\s_.:-]*exact|\bexact(?:ly)?\b/i;
const LABEL_SPELLING = /replayable[\s_.:-]*exact/i;
const TSX_MENTION = /\btsx\b|rftsx|reactive[\s_.:/@-]*fiber[\s_.:/@-]*tsx/i;
const REPLAY_WORD = /replay|captur/i;
/** A text's units: its lines, table cells and sentences. */
function unitsOf(text: string): string[] {
  return text
    .split(/\n|\||(?<=[.;!?])\s+/)
    .map(unit => unit.trim())
    .filter(unit => unit.length > 0);
}
/** The units that label a TSX capture or replay exact: a TSX mention, a replay or capture word and an exactness word together. */
function claimUnitsIn(text: string): string[] {
  return unitsOf(text).filter(unit => TSX_MENTION.test(unit) && REPLAY_WORD.test(unit) && EXACT_LABEL.test(unit));
}
/** Words joined at runtime, so a composed control never sits on one source line. */
function compose(...words: string[]): string {
  return words.join(" ");
}

interface ReplayReading {
  /** The replay status word the reading surfaces, or null when it surfaces none. */
  readonly statusWord: string | null;
  readonly tone: "success" | "failure" | "unknown";
  /** Every display string the reading surfaces. */
  readonly texts: readonly string[];
}
interface ReplayInput {
  readonly report: JsonValue;
  /** What the reader is told about the capture's blobs: every checksum verified, or not. */
  readonly blobsVerified: boolean;
}
type ReplayReader = (input: ReplayInput) => ReplayReading;
/** The armed half: each src module that reads a TSX capture or replay result, bound to a call of its reader on one report. A
 * reader's own cut adds its row here and meets C2 and D1 on every fixture; the table stays empty while no src module spells the
 * vocabulary (A1 holds both directions). */
const TSX_REPLAY_READERS: Readonly<Record<string, ReplayReader>> = {};

/** The checks the armed half runs, in the order a violation list reports them. */
const CHECKS = ["refused", "status", "unknown", "synthesized-status", "exact", "drift", "synthesized-drift"] as const;
type Check = (typeof CHECKS)[number];

function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/** Whether a text spells a word whole (no letter, digit or underscore beside it). */
function spells(text: string, word: string): boolean {
  return new RegExp(`(?<![A-Za-z0-9_])${escaped(word)}(?![A-Za-z0-9_])`).test(text);
}
/** Whether a text carries one {captured,current} member beside its own key. */
function pairIn(text: string, key: string, value: string): boolean {
  return new RegExp(`\\b${key}\\b[^A-Za-z0-9]*${escaped(value)}(?![A-Za-z0-9])`).test(text);
}
function diagnosticsOf(report: JsonObject): JsonObject[] {
  const diagnostics = report.diagnostics;
  return Array.isArray(diagnostics) ? diagnostics.filter(isObject).map(entry => objectOf(entry, "diagnostic")) : [];
}
/** The drift diagnostics a report carries, each with its {captured,current} pair. */
function driftsOf(report: JsonObject): { captured: string; current: string }[] {
  return diagnosticsOf(report)
    .filter(entry => entry.code === DRIFT_CODE)
    .map(entry => {
      const metadata = objectOf(entry.metadata, "drift metadata");
      return { captured: String(metadata.captured), current: String(metadata.current) };
    });
}

/** The armed check: what one reader's reading of one producer report owes the statement, as the ordered list of failed checks.
 * The reader is always told the blobs verified unless the caller says otherwise (the condition a checksum upgrade keys on). A
 * reader that throws surfaces nothing: for a report stating a status word, known or unknown, that is a refusal (the producer's
 * word is owed verbatim; wb-973.10: an unknown word is never refused); for an absent status nothing is synthesized either way. */
function violationsOf(read: ReplayReader, report: JsonObject, blobsVerified = true): Check[] {
  const status = report.status;
  let reading: ReplayReading;
  try {
    reading = read({ report: json(report), blobsVerified });
  } catch {
    return typeof status === "string" ? ["refused"] : [];
  }
  const failed = new Set<Check>();
  if (typeof status === "string") {
    if (reading.statusWord !== status || !reading.texts.some(text => spells(text, status))) failed.add("status");
    if (!STATUS_WORDS.includes(status) && reading.tone !== "unknown") failed.add("unknown");
  } else {
    if (reading.tone !== "unknown") failed.add("unknown");
    if (reading.statusWord !== null || reading.texts.some(text => STATUS_WORDS.some(word => spells(text, word)))) failed.add("synthesized-status");
  }
  const shown = reading.statusWord === null ? [...reading.texts] : [reading.statusWord, ...reading.texts];
  if (shown.some(text => EXACT_LABEL.test(text))) failed.add("exact");
  const drifts = driftsOf(report);
  if (drifts.length > 0) {
    const carried = drifts.every(({ captured, current }) =>
      reading.texts.some(text => text.includes(DRIFT_CODE) && pairIn(text, "captured", captured) && pairIn(text, "current", current)),
    );
    if (!carried) failed.add("drift");
  } else if (reading.texts.some(text => text.includes(DRIFT_CODE))) failed.add("synthesized-drift");
  return CHECKS.filter(check => failed.has(check));
}

/** The honest echo: the producer's word verbatim (tone unknown for any word outside the closed set), nothing for an absent status,
 * and each diagnostic's code with its metadata verbatim. */
function honest({ report }: ReplayInput): ReplayReading {
  const document = isObject(report) ? objectOf(report, "report") : {};
  const status = typeof document.status === "string" ? document.status : null;
  const tone = status === "matched" ? "success" : status === "mismatched" || status === "failed" ? "failure" : "unknown";
  const texts = [status === null ? "TSX replay: the producer states no status word" : `TSX replay status: ${status}`];
  for (const entry of diagnosticsOf(document)) texts.push(`${String(entry.code)} ${JSON.stringify(entry.metadata ?? {})}`);
  return { statusWord: status, tone, texts };
}
function documentOf(input: ReplayInput): JsonObject {
  return isObject(input.report) ? objectOf(input.report, "report") : {};
}
function diagnosticFree(reading: ReplayReading): string[] {
  return reading.texts.filter(text => !text.startsWith("RFTSX_"));
}
/** The synthetic readers that exercise the armed check; each mutant differs from the honest echo in one way. */
const READERS: Readonly<Record<string, ReplayReader>> = {
  honest,
  exactOnChecksum: input => {
    const reading = honest(input);
    return input.blobsVerified
      ? { statusWord: "replayable_exact", tone: "success", texts: [...reading.texts, "TSX replay exact: every blob checksum verified"] }
      : reading;
  },
  exactOnOpaque: input => {
    const reading = honest(input);
    const slots = documentOf(input).reinitializedRuntimeOnlySlots;
    return documentOf(input).status === "matched" && Array.isArray(slots) && slots.length > 0
      ? { ...reading, texts: [...reading.texts, "exact TSX replay: matched with re-initialised runtime-only state"] }
      : reading;
  },
  dropDrift: input => {
    const reading = honest(input);
    return { ...reading, texts: diagnosticFree(reading) };
  },
  rewordDrift: input => {
    const reading = honest(input);
    const reworded = driftsOf(documentOf(input)).map(({ captured, current }) => `TSX package changed since the capture: ${captured} to ${current}`);
    return { ...reading, texts: [...diagnosticFree(reading), ...reworded] };
  },
  swapDrift: input => {
    const reading = honest(input);
    const swapped = driftsOf(documentOf(input)).map(({ captured, current }) => `${DRIFT_CODE} ${JSON.stringify({ captured: current, current: captured })}`);
    return { ...reading, texts: [...diagnosticFree(reading), ...swapped] };
  },
  synthDrift: input => {
    const reading = honest(input);
    const versions = objectOf(documentOf(input).captureVersions, "captureVersions");
    const captured = String(objectOf(versions.package, "captureVersions.package").version);
    return { ...reading, texts: [...reading.texts, `${DRIFT_CODE} ${JSON.stringify({ captured, current: "0.1.649" })}`] };
  },
  relabelStatus: input => {
    const reading = honest(input);
    return { statusWord: "reproduced", tone: reading.tone, texts: ["TSX replay reproduced", ...reading.texts.slice(1)] };
  },
  upgradeMismatch: input => {
    const reading = honest(input);
    const status = documentOf(input).status;
    return status === "mismatched" || status === "failed"
      ? { statusWord: "matched", tone: "success", texts: ["TSX replay status: matched", ...reading.texts.slice(1)] }
      : reading;
  },
  mapUnknown: input => {
    const reading = honest(input);
    const status = documentOf(input).status;
    return typeof status === "string" && !STATUS_WORDS.includes(status)
      ? { statusWord: "failed", tone: "failure", texts: ["TSX replay status: failed", ...reading.texts.slice(1)] }
      : reading;
  },
  successForUnknown: input => {
    const reading = honest(input);
    const status = documentOf(input).status;
    return typeof status === "string" && !STATUS_WORDS.includes(status) ? { ...reading, tone: "success" } : reading;
  },
  refuseUnknown: input => {
    const status = documentOf(input).status;
    if (typeof status !== "string" || !STATUS_WORDS.includes(status)) throw new Error("the reader refuses a status word it does not know");
    return honest(input);
  },
  synthAbsent: input => {
    const reading = honest(input);
    return typeof documentOf(input).status === "string"
      ? reading
      : { statusWord: "failed", tone: "failure", texts: ["TSX replay status: failed", ...reading.texts.slice(1)] };
  },
};
function readerOf(name: string): ReplayReader {
  const read = READERS[name];
  if (read === undefined) throw new Error(`no synthetic reader ${name}`);
  return read;
}
/** One reader's violation lists over the named fixtures. */
function matrixOf(read: ReplayReader, names: readonly FixtureName[], blobsVerified = true): Record<string, Check[]> {
  return Object.fromEntries(names.map(name => [name, violationsOf(read, FIXTURES[name], blobsVerified)]));
}
/** Every bound reader held to the armed check on every fixture but base: the fixtures each one fails, by module. */
function bindingViolations(readers: Readonly<Record<string, ReplayReader>>): Record<string, Record<string, Check[]>> {
  const out: Record<string, Record<string, Check[]>> = {};
  for (const [module, read] of Object.entries(readers)) {
    const failed = Object.fromEntries(
      [...VALID_FIXTURES, ...FUTURE_FIXTURES].map(name => [name, violationsOf(read, FIXTURES[name])] as const).filter(([, list]) => list.length > 0),
    );
    if (Object.keys(failed).length > 0) out[module] = failed;
  }
  return out;
}

/** A fixture rebuilt from base by the roster's delta for it: what C1 holds each stored fixture to. */
function rebuilt(name: FixtureName): JsonObject {
  const base = objectOf(FIXTURES.base, "base");
  const delta = ROSTER.delta;
  const versions = objectOf(base.captureVersions, "base captureVersions");
  const withVersion = (version: JsonValue): JsonObject => ({
    ...base,
    captureVersions: { ...versions, package: { ...objectOf(versions.package, "base package"), version } },
  });
  switch (name) {
    case "base":
      return base;
    case "drift":
      return { ...withVersion(delta.captured), diagnostics: [objectOf(delta.diagnostic, "delta diagnostic")] };
    case "equal":
      return withVersion(delta.current);
    case "opaque":
      return { ...base, reinitializedRuntimeOnlySlots: [String(delta.slot)] };
    case "mismatched": {
      const mismatch = objectOf(delta.mismatch, "delta mismatch");
      return { ...base, status: "mismatched", matched: false, firstMismatchPath: mismatch.path, diagnostics: [objectOf(mismatch.diagnostic, "mismatch diagnostic")] };
    }
    case "failed":
      return { ...base, status: "failed", matched: false, resources: [], diagnostics: [objectOf(objectOf(delta.failure, "delta failure").diagnostic, "failure diagnostic")] };
    case "incompatible":
    case "unsupported":
      return { ...base, status: name, matched: false };
    case "absent": {
      const { status: _dropped, ...rest } = base;
      return { ...rest, matched: false };
    }
  }
}
/** The pin's schema facts a report meets: exactly the required keys, a status word of the enum, matched iff matched, mode replay. */
function schemaFacts(report: JsonObject): { keys: boolean; status: boolean; matched: boolean; mode: boolean; versions: boolean } {
  const schema = producerPart("schema");
  const required = strings(schema.required, "schema required");
  const statusEnum = strings(schema.statusEnum, "schema statusEnum");
  const keys = Object.keys(report);
  const versions = isObject(report.captureVersions) ? report.captureVersions : {};
  const packageFacts = isObject(versions.package) ? versions.package : {};
  return {
    keys: keys.length === required.length && required.every(key => keys.includes(key)),
    status: typeof report.status === "string" && statusEnum.includes(report.status),
    matched: report.matched === (report.status === "matched"),
    mode: report.mode === "replay",
    versions: typeof packageFacts.name === "string" && typeof packageFacts.version === "string" && typeof versions.protocol === "string",
  };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
let fetches = 0;
afterEach(() => {
  process.env.PATH = oldPath;
  vi.unstubAllGlobals();
  removeScratch(...scratches.splice(0));
});

/** The counting fake network port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake network port answers no call"));
  });
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("tsx-replay-status-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      `process.exit(${exit});`,
      "",
    ].join("\n"),
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
    .map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
/** One registry invocation of the NATIVE preview against the stand-in rf: its refusal or reading, and its spawns. */
async function nativeInvoke(answer: JsonValue, exit: number): Promise<{ reading: JsonValue | null; refusal: { category: string; message: string } | null; spawns: string[][] }> {
  countFetches();
  const log = standInRf(answer, exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { reading, refusal, spawns: spawnsOf(log) };
}
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** Where A2 places a report on an otherwise valid render: a result member, or a key inside a member the adapter reads. */
const PLACEMENTS = ["result", "provenance"] as const;
type Placement = (typeof PLACEMENTS)[number];
/** A full-shape render at the reading root, optionally carrying a report as result.replay or result.provenance.replay. */
function renderCarrying(report: JsonObject | null, placement: Placement = "result"): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "full-shape render");
  if (report === null) return envelope;
  const result = objectOf(envelope.result, "render result");
  if (placement === "result") return { ...envelope, result: { ...result, replay: report } };
  return { ...envelope, result: { ...result, provenance: { ...objectOf(result.provenance, "render provenance"), replay: report } } };
}
/** The strings of the drift report no display path may show today. */
function reportStrings(report: JsonObject): string[] {
  const diagnostic = objectOf(ROSTER.delta.diagnostic, "delta diagnostic");
  return [DRIFT_CODE, String(report.schema), String(ROSTER.delta.captured), String(diagnostic.message)];
}

interface EmbeddedOutcome {
  readonly admitted: boolean;
  readonly sourceVerbatim: boolean;
  readonly projectionUnchanged: boolean;
  readonly shown: readonly string[];
  readonly spawns: number;
  readonly verb: readonly string[];
  readonly fetches: number;
}
const embedded = new Map<Placement, Promise<EmbeddedOutcome>>();
/** The drift report riding an otherwise valid render through the native reader and the adapter, run once per placement and
 * shared (A2, Q6). */
function embeddedOutcome(placement: Placement): Promise<EmbeddedOutcome> {
  const known = embedded.get(placement);
  if (known !== undefined) return known;
  const outcome = (async () => {
    const carrying = renderCarrying(FIXTURES.drift, placement);
    const before = JSON.stringify(carrying);
    const { reading, refusal, spawns } = await nativeInvoke(json(carrying), 0);
    expect(refusal, "the native reader admits the render that carries a report").toBeNull();
    const source = isObject(reading) ? reading.source : undefined;
    const projected = reactivefiberTopology(json(reading), OBSERVER_CONTEXT);
    const baseline = reactivefiberTopology(json({ ...objectOf(reading, "reading"), source: renderCarrying(null) }), OBSERVER_CONTEXT);
    const leaves = stringLeaves(json(projected));
    return {
      admitted: reading !== null,
      sourceVerbatim: JSON.stringify(source) === before,
      projectionUnchanged: JSON.stringify(projected) === JSON.stringify(baseline),
      shown: reportStrings(FIXTURES.drift).filter(text => leaves.some(leaf => leaf.includes(text))),
      spawns: spawns.length,
      verb: (spawns[0] ?? []).slice(2, 4),
      fetches,
    };
  })();
  embedded.set(placement, outcome);
  return outcome;
}

let nativeTexts: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** Every registered native descriptor, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeTexts ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeTexts;
}

/** The never-synthesize pins (c) cites: the describe each lives in and the case its rule rests on. */
const NEVER_SYNTHESIZE_FILE = "test/workbench-reactivefiber-observer.test.ts";
const NEVER_SYNTHESIZE = [
  {
    suite: "producer release from result.provenance.cli_version (wb-2j3.1 reader, wb-2j3.2 no-synthesis guard)",
    test: "R3: the R1 no-cli_version fixture synthesizes no producer-release facet, note or metadata field: the projection is byte-identical to today",
  },
  {
    suite: "observation rows from result.observations (wb-973.10 SCG-R10)",
    test: "SCG-R10 (c): an unknown status word reads as not observed: partial and never success, and never a refusal",
  },
];

/** The bead's own notes in the tracker export, the acceptance text rows A to D quote. */
function beadNotes(): string {
  for (const line of textOf(join(REPO, ".beads", "issues.jsonl")).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** A row label's quoted acceptance text: the label without its leading clause tag. */
function quoteOf(label: string): string {
  return label.replace(/^\([^)]*\) /, "");
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const scan = SURFACE_ROOTS[0];
    if (scan === undefined) throw new Error("no src root");
    const { files, floorMet, anchorRead } = walkRoot(scan);
    const modules = files.filter(file => file.endsWith(".ts"));
    const spelling = modules
      .map(file => ({ module: relative(REPO, file), words: vocabularyIn(textOf(file)), specifiers: specifiersIn(textOf(file)) }))
      .filter(entry => entry.words.length > 0 || entry.specifiers.length > 0);
    const nearest = textOf(join(REPO, scan.anchorFile));
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((_, index) => vocabularyIn(texts[index] ?? "").length > 0 || specifiersIn(texts[index] ?? "").length > 0);
    const resultRoster = keysAndStrings(JSON.parse(textOf(join(HERE, "fixtures", "rf-result-keys.json")))).join("\n");
    const bound = Object.keys(TSX_REPLAY_READERS).sort();
    const unbound = spelling.map(entry => entry.module).filter(module => !bound.includes(module));
    const stale = bound.filter(module => !spelling.some(entry => entry.module === module));
    expect(ids.length, "native descriptors registered").toBeGreaterThan(0);
    expect(resultRoster.length, "rf's frozen render result roster was read").toBeGreaterThan(0);
    expect(
      { spelling, descriptorHits, resultKeys: vocabularyIn(resultRoster), unbound, stale },
      "a TSX replay reader binds itself in TSX_REPLAY_READERS",
    ).toStrictEqual({ spelling: [], descriptorHits: [], resultKeys: [], unbound: [], stale: [] });
    const controls = {
      snake: vocabularyIn("const slots = report.reinitialized_runtime_only_slots;"),
      camel: vocabularyIn("const { captureVersions } = report;"),
      constant: vocabularyIn('if (code === "RFTSX_REPLAY_MISMATCH") return;'),
      kebab: vocabularyIn('const schema = "rftsx.replay-report";'),
      label: vocabularyIn('const word = "replayable_exact";'),
      drift: vocabularyIn("const versionDrift = true;"),
      embedded: vocabularyIn("const firstMismatchPathText = null;"),
      // Composed at runtime: a call whose literal argument names the producer package reads as a load to the landed wb-o4h0.4
      // census (test/workbench-rf-tsx-remote-hook-census.test.ts A2), and this file loads nothing.
      specifier: specifiersIn(compose("import { replay } from", ["@reactive-fiber", "tsx"].join("/"))),
      unrelated: [...vocabularyIn("const word = report.status;"), ...specifiersIn("const word = report.status;")],
    };
    return {
      srcFloorMet: floorMet,
      anchorRead,
      nearestQuiet: vocabularyIn(nearest).length === 0 && specifiersIn(nearest).length === 0,
      descriptorsRead: ids.length > 0,
      spelling,
      descriptorHits,
      resultKeys: vocabularyIn(resultRoster),
      bound,
      unbound,
      stale,
      controls,
    };
  },
  A2: async () => {
    const bare = await nativeInvoke(json(FIXTURES.drift), 0);
    const bareFetches = fetches;
    expect(bare.reading, "a bare report is never a reading").toBeNull();
    expect(bare.refusal).not.toBeNull();
    expect(bare.spawns).toHaveLength(1);
    const embeddedWitness: Record<string, JsonValue> = {};
    for (const placement of PLACEMENTS) {
      const outcome = await embeddedOutcome(placement);
      expect(outcome.projectionUnchanged, `the adapter's projection ignores the report (${placement})`).toBe(true);
      expect(outcome.shown, `no display string carries the report (${placement})`).toStrictEqual([]);
      embeddedWitness[placement] = {
        admitted: outcome.admitted,
        projectionUnchanged: outcome.projectionUnchanged,
        shown: [...outcome.shown],
        spawns: outcome.spawns,
        verb: [...outcome.verb],
        fetches: outcome.fetches,
      };
    }
    return {
      bare: { ...bare.refusal, reading: bare.reading !== null, spawns: bare.spawns.length, verb: (bare.spawns[0] ?? []).slice(2, 4), fetches: bareFetches },
      embedded: embeddedWitness,
    };
  },
  B1: async () => {
    const codes = producerPart("codesTable");
    const golden = strings(producerPart("golden").codes, "golden codes");
    const family = strings(codes.replayFamily, "codesTable replayFamily");
    const distribution = producerPart("distribution");
    const distributionFamily = strings(distribution.replayFamily, "distribution replayFamily");
    const statusWords = strings(producerPart("statusWords").words, "statusWords words");
    const statusEnum = strings(producerPart("schema").statusEnum, "schema statusEnum");
    const prefixed = golden.filter(code => code.startsWith("RFTSX_REPLAY_")).sort();
    expect(family, "the census's REPLAY codes are the pinned table's").toStrictEqual(REPLAY_CODES);
    expect(family).not.toContain(DRIFT_CODE);
    expect(golden).not.toContain(DRIFT_CODE);
    expect(distributionFamily).not.toContain(DRIFT_CODE);
    expect(new Set(golden).size, "the frozen list holds each code once").toBe(golden.length);
    return {
      pin: ROSTER.programPin,
      tableRows: codes.rows ?? null,
      goldenCodes: golden.length,
      family: family.length,
      driftInFamily: family.includes(DRIFT_CODE),
      driftInTable: golden.includes(DRIFT_CODE),
      driftAtDistribution: distributionFamily.includes(DRIFT_CODE),
      familyIsTablePrefixSet: JSON.stringify(prefixed) === JSON.stringify([...family].sort()),
      distributionFamilyAgrees: JSON.stringify(distributionFamily) === JSON.stringify(family),
      statusWordsAgreeWithSchema: JSON.stringify(statusWords) === JSON.stringify(statusEnum) && JSON.stringify(statusWords) === JSON.stringify(STATUS_WORDS),
    };
  },
  B2: async () => {
    const found = { codes: [] as string[], schemas: [] as string[], labels: [] as string[], claims: [] as string[] };
    for (const scan of SURFACE_ROOTS) {
      const { files } = walkRoot(scan);
      for (const file of files) {
        const text = textOf(file);
        const name = relative(REPO, file);
        if (CODE_SPELLING.test(text)) found.codes.push(name);
        if (SCHEMA_SPELLING.test(text)) found.schemas.push(name);
        if (LABEL_SPELLING.test(text)) found.labels.push(name);
        for (const unit of claimUnitsIn(text)) found.claims.push(`${name}: ${unit}`);
      }
    }
    expect(found, "no Pi surface spells a TSX replay code, schema name or exact label").toStrictEqual({ codes: [], schemas: [], labels: [], claims: [] });
    const controls = {
      code: CODE_SPELLING.test(`see ${["RFTSX", "REPLAY", "VERSION", "DRIFT"].join("_")}`),
      schema: SCHEMA_SPELLING.test(`a ${["rftsx", "replay-report"].join(".")} document`),
      label: LABEL_SPELLING.test(compose("labelled", ["replayable", "exact"].join("_"))),
      claim: claimUnitsIn(compose("The", "TSX", "replay", "is", "exact.")).length,
    };
    return { ...found, controls };
  },
  C1: async () => {
    const rebuiltEqual = Object.fromEntries(FIXTURE_NAMES.map(name => [name, JSON.stringify(rebuilt(name)) === JSON.stringify(FIXTURES[name])]));
    const facts = Object.fromEntries(FIXTURE_NAMES.map(name => [name, schemaFacts(FIXTURES[name])]));
    const drift = driftsOf(FIXTURES.drift);
    expect(rebuiltEqual, "every fixture is base plus exactly its delta").toStrictEqual(Object.fromEntries(FIXTURE_NAMES.map(name => [name, true])));
    expect(FIXTURES.drift.status, "the drift leaves the status unchanged").toBe(FIXTURES.base.status);
    return {
      baseStatus: FIXTURES.base.status ?? null,
      drift: { status: FIXTURES.drift.status ?? null, code: DRIFT_CODE, pairs: drift },
      rebuilt: rebuiltEqual,
      facts,
    };
  },
  C2: async () => {
    const names = [...VALID_FIXTURES];
    const matrix = Object.fromEntries(Object.keys(READERS).filter(name => !["mapUnknown", "successForUnknown", "refuseUnknown", "synthAbsent"].includes(name)).map(name => [name, matrixOf(readerOf(name), names)]));
    const unverified = matrixOf(readerOf("exactOnChecksum"), names, false);
    const honestMatrix = matrix.honest ?? {};
    expect(Object.values(honestMatrix).flat(), "the honest echo meets every check").toStrictEqual([]);
    for (const [name, rows] of Object.entries(matrix)) {
      if (name !== "honest") expect(Object.values(rows).flat().length, `${name} fails at least one fixture`).toBeGreaterThan(0);
    }
    expect(matrix.exactOnChecksum?.drift, "the checksum upgrade fails on the drift fixture").toContain("exact");
    return { matrix, exactOnChecksumUnverified: unverified };
  },
  C3: async () => {
    const bound = Object.keys(TSX_REPLAY_READERS).sort();
    const violations = bindingViolations(TSX_REPLAY_READERS);
    expect(violations, "every bound reader meets the armed check").toStrictEqual({});
    return {
      bound,
      violations,
      controls: {
        honestOnly: bindingViolations({ "synthetic/honest": honest }),
        withMutant: bindingViolations({ "synthetic/honest": honest, "synthetic/exact-on-checksum": readerOf("exactOnChecksum") }),
      },
    };
  },
  D1: async () => {
    const names = [...FUTURE_FIXTURES];
    const readers = ["honest", "mapUnknown", "successForUnknown", "refuseUnknown", "synthAbsent", "exactOnChecksum"];
    const matrix = Object.fromEntries(readers.map(name => [name, matrixOf(readerOf(name), names)]));
    expect(Object.values(matrix.honest ?? {}).flat(), "the honest echo keeps an unknown word unknown and synthesizes none").toStrictEqual([]);
    const echoed = names.map(name => honest({ report: FIXTURES[name], blobsVerified: true }));
    return {
      futureWords: FUTURE_WORDS.filter(word => !STATUS_WORDS.includes(word)),
      honestEcho: echoed.map(reading => ({ statusWord: reading.statusWord, tone: reading.tone })),
      matrix,
    };
  },
  D2: async () => {
    const text = textOf(join(REPO, NEVER_SYNTHESIZE_FILE));
    expect(text.length, `${NEVER_SYNTHESIZE_FILE} was read`).toBeGreaterThan(0);
    return NEVER_SYNTHESIZE.map(({ suite, test }) => {
      const opener = `describe('${suite}', () => {`;
      const start = text.indexOf(opener);
      const next = start < 0 ? -1 : text.indexOf("\ndescribe(", start + opener.length);
      const body = start < 0 ? "" : text.slice(start, next < 0 ? undefined : next);
      return { suite, describes: text.split(opener).length - 1, test, registered: body.includes(`it('${test}'`) };
    });
  },
  Q1: async () => {
    const generic = "const word = report.status; const codes = report.diagnostics.map(entry => entry.code); const same = report.matched;";
    return { words: vocabularyIn(generic), specifiers: specifiersIn(generic) };
  },
  Q2: async () => {
    const paraphrase = compose("The", "TSX", "capture", "replays", "byte", "for", "byte,", "identical", "after", "the", "upgrade.");
    const reading: ReplayReading = { statusWord: "matched", tone: "success", texts: ["TSX replay status: matched", paraphrase] };
    return { b2Units: claimUnitsIn(paraphrase).length, armedCheck: violationsOf(() => reading, FIXTURES.equal) };
  },
  Q3: async () => {
    const composed = 'const word = ["replayable", "exact"].join("_"); const code = ["RF", "TSX_REPLAY", "VERSION", "DRIFT"].join("_");';
    return { words: vocabularyIn(composed), label: LABEL_SPELLING.test(composed), code: CODE_SPELLING.test(composed) };
  },
  Q4: async () => {
    const export_ = textOf(join(REPO, ".beads", "issues.jsonl"));
    return {
      roots: SURFACE_ROOTS.map(scan => scan.root),
      beadsSpellDrift: export_.includes(DRIFT_CODE),
      beadsSpellLabel: LABEL_SPELLING.test(export_),
    };
  },
  Q5: async () => {
    const zeroWidth = String.fromCodePoint(0x200b);
    const homoglyph = String.fromCodePoint(0x0435);
    const split = `const word = "replayable${zeroWidth}_exact"; const schema = "rf${zeroWidth}tsx.replay";`;
    const lookalike = compose("The", "TSX", "replay", "is", `${homoglyph}xact.`);
    return { words: vocabularyIn(split), label: LABEL_SPELLING.test(split), units: claimUnitsIn(lookalike).length };
  },
  Q6: async () => {
    const outcome = await embeddedOutcome("result");
    return { admitted: outcome.admitted, sourceVerbatim: outcome.sourceVerbatim, projectionUnchanged: outcome.projectionUnchanged };
  },
  Q7: async () => {
    const sentences = compose("A", "TSX", "capture.", "The", "replay", "is", "exact.");
    const heading = ["## TSX capture", compose("The", "replay", "is", "exact.")].join("\n");
    const oneUnit = compose("The", "TSX", "capture", "replay", "is", "exact.");
    return { sentences: claimUnitsIn(sentences).length, heading: claimUnitsIn(heading).length, oneUnit: claimUnitsIn(oneUnit).length };
  },
};

describe("wb-fb2z.4 TSX replay status census (TSX-COMPONENT-ASSEMBLY-R4)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's acceptance text and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:3", "D:2", "Q:7"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      programPin: PROGRAM_PIN,
      driftCode: DRIFT_CODE,
      statusWords: STATUS_WORDS,
      replayCodes: REPLAY_CODES,
      futureWords: FUTURE_WORDS,
      vocabulary: VOCABULARY,
      specifier: SPECIFIER.source,
      residuals: RESIDUALS,
    }).toStrictEqual({ programPin: ROSTER.programPin, ...ROSTER.constants });
    expect(strings(producerPart("statusWords").words, "statusWords"), "the status words are the producer's").toStrictEqual(STATUS_WORDS);
    expect(strings(producerPart("codesTable").replayFamily, "replayFamily"), "the REPLAY codes are the producer's").toStrictEqual(REPLAY_CODES);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) expect(notes, `row ${row.id} quotes the bead's acceptance`).toContain(quoteOf(row.label));
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
