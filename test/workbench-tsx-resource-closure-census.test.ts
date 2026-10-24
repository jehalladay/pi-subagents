/**
 * wb-4nut.3 (TSX-HARNESS2-REACTIVE-EVOLUTION-R3, program-triage-2026-10-22), the absent-today leg and its armed guard.
 * Statement (bead notes, full form): "If Pi ever reads TSX-SDK resource records or an H2 versioned artifact (gated TSX-H2-00
 * API pin rftsx-auqdi, API-PIN.md and its audit test ABSENT at the pin; RI/RC/FO/TSX H2 schemas unshipped), Pi shall mirror the
 * producer's schema closure verbatim: RESOURCE_KINDS and RESOURCE_ENTRY_STATUSES are closed producer enums never widened (no
 * synthesized QueryView kind or UNKNOWN status) and an unknown major version is refused as the producer refuses it, never
 * defaulted" (ReactiveFiberTSXSDK docs/programs/harness2-reactive-evolution-2026-10-20/BEADS-2026-10-21.md:28@76bbbffd9d4a).
 * Acceptance (owner filing, verbatim; held in the labels of rows B, C and D): "(a) a Pi reader fed status 'UNKNOWN' or kind
 * 'query'/'QueryView' refuses or reads not-observed, never mapping either to a Pi status word; (b) any Pi enum mirror equals
 * exactly the six kinds and two statuses at the pinned sha; a seventh kind in a fixture is rejected; (c) a major version above
 * Pi's pin yields a typed refusal and no parse of the body; (d) an artifact with no version keeps the version absent in every
 * Pi field (no default)." The filing's own reading: "Not P0: Pi reads no TSX resource records today; gating guard bound when
 * the API pin lands."
 *
 * So the trigger has not fired: no Pi module reads a resource record of the TSX SDK or an H2 artifact, and no Pi module mirrors
 * the producer's enums. This census pins that state and arms the guard the filing binds, measuring each clause where Pi has a
 * reader today:
 *  A, the trigger, absent today. A1 no product module (the judged roots src/, qa/ and examples/; each module parsed by the
 *    TypeScript compiler under its own script kind, each other file read as UTF-8 text) names the producer's resource-record
 *    vocabulary (RESOURCE_VOCABULARY, which covers every resource name src/resources/types.ts exports at the pin, the roster's
 *    producer list) in an identifier, a cooked or constant-folded literal or its text, states a distinctive kind literal
 *    (fiber.node, fiber.input) or loads the TSX SDK (SDK_FAMILY, any import, export, import-equals, import type or first
 *    argument of a call or new expression, folded); A2 none names an H2 work package of the four schema-owning SDKs or of TSX
 *    (H2_FAMILY) or the harness2 program; A3 the gating artifact is measured absent: the roster's producer facts find no
 *    API-PIN.md and no harness2-api-pin test anywhere in the producer tree at the pin, no src file there spells QueryView, and
 *    the bead row's gating sentence says the same ("ABSENT at 76bbbffd9d4a", "Shipped: no.").
 *  B, acceptance (a), on the reader nearest the TSX records: the rf render path (the native provider in
 *    providers/reactivefiber.ts and the observer in reactivefiber-observer.ts), where a TSX render's records would ride.
 *    B1 the fixture records the roster holds (a resource request of kind query, one of kind QueryView, an entry of status
 *    UNKNOWN) riding an open object of a clean render (CARRIERS) are never read: the projection equals the clean render's,
 *    member for member, and no projected string carries a fixture needle; in a closed object (CLOSED_CARRIERS) or bare they
 *    are refused with a typed CapabilityError, at the observer and through a stand-in rf at the native seam, which carries an
 *    open-object record verbatim and unread. B2 that path's one status-word reader (the observation rows of a render) reads
 *    the word UNKNOWN as it reads any other not-observed word: the projection of an UNKNOWN row is the projection of a control
 *    word's row with that word swapped in, and a row stating kind QueryView or query projects as the row without it.
 *  C, acceptance (b). C1 no walked module but this file holds a mirror of either enum - a declaration (variable, type alias or
 *    enum) whose name, lower-cased without separators, ends with a MIRROR_SUFFIXES member, or an array literal or literal union
 *    holding a distinctive kind - and every mirror found must equal the producer's tuple verbatim: the judge's controls admit
 *    the exact tuples (an array, as const, frozen, a union, an enum) and reject a widened one (a seventh kind query or
 *    QueryView, a status UNKNOWN), a narrowed, reordered, duplicated or unreadable one. C2 the producer closure: the census's
 *    tuples equal the roster's measured ones and the bead row's gating sentence, line ranges included, and the closure rejects
 *    every out-of-closure fixture record while admitting the in-closure controls.
 *  D, acceptances (c) and (d), on the versioned reader nearest the TSX records, the rf render envelope
 *    (REACTIVE_FIBER_CLI_SCHEMA, Pi's pin; Pi's other versioned readers belong to other producers). D1 an
 *    envelope stating a major above the pin is a typed refusal before any field of its body is read: the observer refuses
 *    v2 and v10 with the schema refusal even when the body is malformed, and the same malformed body under v1 is refused for
 *    the body instead; at the native seam v2 is the unrecognized-envelope refusal and v1 with that body the contradictory one.
 *    D2 a render stating no producer release, no bundle revision or an engine entry with no version keeps each absent: the
 *    projection drops exactly the references and note the stated value produced and gains no default, and the native provider
 *    carries the unversioned envelope without minting the field.
 * THE WALK: every regular file below the repository root, at any depth, in name order; SKIPPED_ROOTS (git's data, the tracker
 * export, installed dependencies, build, coverage and Forge outputs) are skipped at the root only, a symlink is recorded and
 * never followed. A1 and A2 judge the files below JUDGED_ROOTS; C1 judges every module of the walk but this file (EXEMPT), whose
 * own tuples are a mirror, so lifting the exemption reds C1.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only git show and ls-tree on the local ReactiveFiberTSXSDK checkout,
 * 2026-10-23): at 76bbbffd9d4a419f972d6fefc8b7f9dc524df8df (that checkout's origin/main at its last fetch), src/resources/types.ts
 * (blob 47b41d82af9d) declares RESOURCE_KINDS at lines 40-47 and RESOURCE_ENTRY_STATUSES at line 75; the cited BEADS page (blob
 * 80427fdf9c89) holds the quoted acceptance on line 28; no tree entry is named API-PIN.md or harness2-api-pin; no src file
 * spells QueryView. PRODUCER BYTES (wb-nbp3 F2): the roster vendors that types module verbatim (producer typesBase64, its bytes
 * at the pin, base64 as the landed producer excerpts are, so no Pi text census reads the producer's prose or identifiers as Pi
 * text); their git blob id must be typesBlob and must start with the blob the bead row's PRODUCER FACTS line measured
 * ("types.ts blob 47b41d82af9d"), so the producer's resource exports (every name the module exports at its top level that
 * spells Resource or RESOURCE, read by the TypeScript compiler, in file order) and its RESOURCE_KINDS and
 * RESOURCE_ENTRY_STATUSES declarations (their lines and literals, which the owner's gating sentence states) are read from the
 * producer's own bytes: the roster's export list must equal them and RESOURCE_VOCABULARY must match every one (the judged set
 * and A1). Pi vendors no other producer file; a producer change is seen only when a cut re-measures the roster.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every
 * pin's witness (each carries its pin id), the scan constants, the fixture records, the residual families and the registered
 * test titles are held to the out-of-file roster (test/fixtures/tsx-resource-closure-roster.json). OUTSIDE ANCHOR: the owner
 * filing's row in the tracked bead export (.beads/issues.jsonl, row wb-4nut.3): its acceptance clauses sit verbatim in exactly
 * one row label each and its trigger in row A's, every row carries one of them, its quote and citation equal the roster's, its
 * gating sentence names the API pin A3 reads absent and lists the six kinds and two statuses C2 holds, so a row or a tuple
 * member removed from every literal of this file and the roster still reds. PIN ANCHOR (wb-nbp3 F1): each pin quotes a slice
 * of the owner text its row carries (PINS, held to the roster): the trigger as the title states it with its gate (A1-A3), or
 * an acceptance clause after its "(x) " marker (B1-D2). Every quote sits in exactly one such unit, the unit belongs to the
 * pin's row, and each unit's pins tile it in quote order with separator-only gaps (TILING_GAP), so a pin removed from ROWS,
 * the literals, IMPL, PINS and the roster together leaves its slice of the owner text untiled and reds; the pin-to-unit
 * placement is pinned as a literal.
 * MEASUREMENT GUARD (wb-nbp3 F3): each pin's case runs under a guard that records the live sources it consults (SOURCES: the
 * bead row, the module judge, the native seam, the observer, a planted tree, the vendored producer bytes, the repository
 * walk) and every roster witness it reads; a case must consult exactly the sources PINS declares for it and read no roster
 * witness, so a case that returns a copy of its own roster witness reds although the copy equals the roster's.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run
 * mode, not inverted, ran; every pin's case reached its end (REACHED).
 * RESIDUALS (named families, each with a pinned quiet row, in a pin's controls or in the judged set): R-COMPOSED a vocabulary
 * name, kind or specifier assembled at runtime from a variable, a call or a join (A1 composedJoin, composedSpecifier; C1
 * composedMirror); R-ENCODED an encoding the compiler does not decode, such as ROT13 (A1 rot13); R-GENERIC a mirror spelled
 * with only the four generic kind words under a name outside MIRROR_SUFFIXES (C1 genericMirror); R-DATA a kind list held as
 * JSON or prose data, which no module declares (C1 jsonData); R-OUTSIDE a reader below test/ or a skipped root, outside the
 * judged roots (A1 testRoot, distRoot; A2 testRoot; C1 distRoot); R-UNNAMED an H2 artifact read under a schema id or path the
 * program has not named yet, which H2_FAMILY cannot know (A2 unnamedArtifact); R-RETILED a pin removed from every literal and
 * the roster while a neighbouring pin's quote is widened over its slice keeps every unit tiled (the judged set's retiled
 * reading); R-IDLE-READ a case that consults its declared sources and still returns a copy of its roster witness taken outside
 * its run passes the guard (the judged set's idle-read reading, on A3).
 * Display paths added: none. Test-only: it spawns only the stand-in rf below makeScratch scratch and plants control files there.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberPreview, REACTIVE_FIBER_CLI_SCHEMA, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-tsx-resource-closure-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-resource-closure-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-4nut.3";
/** The producer's closed resource kinds at the pin (src/resources/types.ts:40-47@76bbbffd9d4a), in declaration order. */
const PRODUCER_KINDS: readonly string[] = ["fiber.node", "fiber.input", "provider", "lens", "inference", "capability"];
/** The producer's closed entry statuses at the pin (src/resources/types.ts:75@76bbbffd9d4a). */
const PRODUCER_STATUSES: readonly string[] = ["ready", "failed"];
/** The kinds no other vocabulary spells: a literal equal to one of them names the producer's resource kind. */
const DISTINCTIVE_KINDS: readonly string[] = PRODUCER_KINDS.filter(kind => kind.startsWith("fiber."));
/** The producer's resource-record names (every resource name src/resources/types.ts exports at the pin) and the record field. */
const RESOURCE_VOCABULARY = /RESOURCE_(?:KINDS|ENTRY_STATUSES|ENTRY_SOURCES|COUNTER_NAMES)|Resource(?:Kind|Request|Entry|Dependent|Counters|Snapshot)|[rR]esourceId/;
/** The TSX SDK package, as any specifier names it: bare, a subpath, npm:, jsr: or a URL. */
const SDK_FAMILY = /@reactive-fiber\/tsx(?![\w-])/i;
/** An H2 work package of TSX or of the four schema-owning SDKs, or the program itself. */
const H2_FAMILY = /(?<![A-Za-z0-9])(?:TSX|RI|RC|RL|FO)[-_]?H2(?![A-Za-z0-9])|(?<![A-Za-z0-9])harness[-_]?2(?![0-9])/i;
/** A quoted distinctive kind in a non-module file. */
const QUOTED_KIND = /["'`]fiber\.(?:node|input)["'`]/;
/** A declared name that mirrors an enum: lower-cased without separators, it ends with one of these. */
const MIRROR_SUFFIXES: Readonly<Record<string, readonly string[]>> = {
  kinds: ["resourcekind", "resourcekinds"],
  statuses: ["resourceentrystatus", "resourceentrystatuses", "resourcestatus", "resourcestatuses"],
};
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const JUDGED_ROOTS = ["src", "qa", "examples"];
const EXEMPT = [SELF];
/** Each floor sits below the count measured at base 7718651 (849 tracked files; modules src 115, test 449, qa 62, examples 6). */
const FLOORS = { files: 760, modules: { src: 100, test: 400, qa: 55, examples: 5 } };
/** What each reader must read in the observer: an identifier, a literal (the TSX counter name the vocabulary never matches) and a specifier. */
const ANCHOR_MODULE = "src/workbench/reactivefiber-observer.ts";
const ANCHORS = { identifier: "reactivefiberTopology", literal: "tsx_resource_rounds", specifier: "node:crypto" };
/** The open render objects a record can ride unread, and the closed ones the readers refuse it in. */
const CARRIERS = ["result.resources", "result.provenance.resources", "result.components"];
const CLOSED_CARRIERS = ["result.engine_metrics", "result.work"];
/** The strings of the out-of-closure fixtures no projection may carry. */
const NEEDLES = ["UNKNOWN", "QueryView", "query"];
/** The control status word B2 compares UNKNOWN with: not one of rf's statuses, a bounded token the note lists. */
const CONTROL_WORD = "zz-control";
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ENCODED", "R-GENERIC", "R-DATA", "R-OUTSIDE", "R-UNNAMED", "R-RETILED", "R-IDLE-READ"];
/** A name of the producer's types module that spells a resource: its resource exports, read from its bytes (wb-nbp3 F2). */
const PRODUCER_RESOURCE_NAME = /Resource|RESOURCE/;
/** What may sit before, between or after the quotes that tile a unit of the owner text: separators only (wb-nbp3 F1). */
const TILING_GAP = /^[\s,;:]*$/;
/** The live sources a pin's case can consult; each records itself when a running case consults it (wb-nbp3 F3). */
const SOURCES = ["bead", "module", "native", "observer", "plant", "producer", "tree"];

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
      "(trigger, absent today) If Pi ever reads TSX-SDK resource records or an H2 versioned artifact: no product module names the producer's resource-record vocabulary, a distinctive kind or the TSX SDK as a load, none names an H2 work package or the harness2 program, and the gating API pin is measured absent at the cited sha",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(a) a Pi reader fed status 'UNKNOWN' or kind 'query'/'QueryView' refuses or reads not-observed, never mapping either to a Pi status word: the rf render path leaves such records unread in an open render object and refuses them in a closed one or bare, and its status-word reader reads UNKNOWN as any other not-observed word",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) any Pi enum mirror equals exactly the six kinds and two statuses at the pinned sha; a seventh kind in a fixture is rejected: no walked module holds a mirror, the mirror judge admits only the verbatim tuples, and the producer closure the roster and the bead row measure rejects every out-of-closure fixture record",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(c) a major version above Pi's pin yields a typed refusal and no parse of the body; (d) an artifact with no version keeps the version absent in every Pi field (no default): measured on the versioned reader nearest the TSX records, the rf render envelope (reactive-fiber.cli/v1), at the observer and the native seam",
    pins: ["D1", "D2"],
  },
];

/** wb-nbp3: each pin's slice of the owner text its row carries (F1, the pin anchor) and the live sources its case measures (F3,
 * the measurement guard), in row order; held to the roster. */
const PINS: Readonly<Record<string, { readonly quote: string; readonly sources: readonly string[] }>> = {
  A1: { quote: "If Pi ever reads TSX-SDK resource records", sources: ["module", "plant", "producer", "tree"] },
  A2: { quote: "or an H2 versioned artifact", sources: ["module", "plant", "tree"] },
  A3: { quote: "(gated TSX-H2-00 API pin rftsx-auqdi, API-PIN.md and its audit test ABSENT at the pin; RI/RC/FO/TSX H2 schemas unshipped)", sources: ["bead"] },
  B1: { quote: "a Pi reader fed status 'UNKNOWN' or kind 'query'/'QueryView' refuses or reads not-observed", sources: ["native", "observer"] },
  B2: { quote: "never mapping either to a Pi status word", sources: ["observer"] },
  C1: { quote: "any Pi enum mirror equals exactly the six kinds and two statuses at the pinned sha", sources: ["module", "plant", "tree"] },
  C2: { quote: "a seventh kind in a fixture is rejected", sources: ["bead"] },
  D1: { quote: "a major version above Pi's pin yields a typed refusal and no parse of the body", sources: ["native", "observer"] },
  D2: { quote: "an artifact with no version keeps the version absent in every Pi field (no default)", sources: ["native", "observer"] },
};

interface RosterPin {
  readonly id: string;
  readonly quote: string;
  readonly sources: readonly string[];
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Tuple {
  readonly file: string;
  readonly lines: string;
  readonly values: readonly string[];
}
interface Producer {
  readonly repo: string;
  readonly sha: string;
  readonly typesBlob: string;
  readonly typesBase64: string;
  readonly citedBlob: string;
  readonly kinds: Tuple;
  readonly statuses: Tuple;
  readonly resourceExports: readonly string[];
  readonly apiPin: { readonly names: readonly string[]; readonly matchesAtPin: readonly string[] };
  readonly queryViewSrcFiles: readonly string[];
}
interface Fixture {
  readonly id: string;
  readonly record: JsonObject;
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly fixtures: readonly Fixture[];
  readonly residuals: readonly string[];
  readonly quietRows: JsonObject;
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
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
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function tupleOf(value: unknown, field: string): Tuple {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return { file: text(value.file, `${field}.file`), lines: text(value.lines, `${field}.lines`), values: strings(value.values, `${field}.values`) };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan) || !Array.isArray(raw.fixtures)) {
    throw new Error("roster needs rows, producer, scan and fixtures");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, quote: text(pin.quote, `rows[${index}].pins[${at}].quote`), sources: strings(pin.sources, `rows[${index}].pins[${at}].sources`), witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const fixtures = raw.fixtures.map((fixture: unknown, index: number): Fixture => {
    if (!isObject(fixture) || typeof fixture.id !== "string" || !isObject(fixture.record)) throw new Error(`roster fixtures[${index}] needs an id and an object record`);
    return { id: fixture.id, record: json(fixture.record) as JsonObject };
  });
  const producer = raw.producer;
  const apiPin = producer.apiPin;
  if (!isObject(apiPin)) throw new Error("roster producer.apiPin must be an object");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  const quietRows = json(raw.quietRows);
  if (!isObject(quietRows)) throw new Error("roster quietRows must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      repo: text(producer.repo, "producer.repo"),
      sha: text(producer.sha, "producer.sha"),
      typesBlob: text(producer.typesBlob, "producer.typesBlob"),
      typesBase64: text(producer.typesBase64, "producer.typesBase64"),
      citedBlob: text(producer.citedBlob, "producer.citedBlob"),
      kinds: tupleOf(producer.kinds, "producer.kinds"),
      statuses: tupleOf(producer.statuses, "producer.statuses"),
      resourceExports: strings(producer.resourceExports, "producer.resourceExports"),
      apiPin: { names: strings(apiPin.names, "producer.apiPin.names"), matchesAtPin: strings(apiPin.matchesAtPin, "producer.apiPin.matchesAtPin") },
      queryViewSrcFiles: strings(producer.queryViewSrcFiles, "producer.queryViewSrcFiles"),
    },
    fixtures,
    residuals: strings(raw.residuals, "residuals"),
    quietRows: quietRows as JsonObject,
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

/** wb-nbp3 F3, the measurement guard: the pin whose case is running, the live sources each case consulted (SOURCES) and the
 * roster witnesses each case read. */
let running: string | undefined;
const consulted = new Map<string, Set<string>>();
const witnessReads = new Map<string, string[]>();
/** A live source (one of SOURCES) records that the running case consulted it. */
function consult(source: string): void {
  if (!SOURCES.includes(source)) throw new Error(`no live source ${source}`);
  if (running !== undefined) consulted.get(running)?.add(source);
}
interface Guarded {
  readonly witness: JsonValue;
  readonly consulted: readonly string[];
  readonly witnessReads: readonly string[];
}
/** Runs `pin`'s case under the guard: what it returned, the sources it consulted (sorted) and the roster witnesses it read. */
async function guarded(pin: string, run: () => JsonValue | Promise<JsonValue>): Promise<Guarded> {
  running = pin;
  consulted.set(pin, new Set());
  witnessReads.set(pin, []);
  try {
    const witness = await run();
    return { witness, consulted: [...(consulted.get(pin) ?? [])].sort(), witnessReads: [...(witnessReads.get(pin) ?? [])] };
  } finally {
    running = undefined;
  }
}
/** What the guard refuses in one run of `pin`'s case: a declared source it never consulted, a source it consulted undeclared,
 * a roster witness it read. */
function guardMisses(pin: string, run: Guarded): string[] {
  const declared = PINS[pin]?.sources ?? [];
  return [
    ...declared.filter(source => !run.consulted.includes(source)).map(source => `unconsulted: ${source}`),
    ...run.consulted.filter(source => !declared.includes(source)).map(source => `undeclared: ${source}`),
    ...run.witnessReads.map(read => `witness read: ${read}`),
  ];
}

function rosterWitness(pin: string): JsonValue {
  if (running !== undefined) witnessReads.get(running)?.push(pin);
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function fixture(id: string): JsonObject {
  const found = ROSTER.fixtures.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`the roster holds no fixture ${id}`);
  return found.record;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  consult("bead");
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
}
/** One line of the filing's notes, found by its opening words. */
function noteLine(notes: string, opening: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(opening));
  if (line === undefined) throw new Error(`${BEAD} notes carry no "${opening}" line`);
  return line;
}
/** The filing's acceptance clauses: its "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}
/** The gating sentence's tuples: the six kinds after "types.ts:40-47 = " and the statuses after ":75 = ". */
function gatingTuples(notes: string): { kindsLines: string; kinds: string[]; statusesLines: string; statuses: string[] } {
  const line = noteLine(notes, "Gating artifact: ");
  const found = /src\/resources\/types\.ts:(\d+-\d+) = ([^;]+?) and :(\d+) = \[([^\]]*)\];/.exec(line);
  if (found === null) throw new Error(`${BEAD} gating sentence names no kind and status tuples`);
  return {
    kindsLines: found[1] ?? "",
    kinds: (found[2] ?? "").split(", "),
    statusesLines: found[3] ?? "",
    statuses: (found[4] ?? "").split(",").map(value => value.replace(/^'|'$/g, "")),
  };
}

/** The vendored producer types module (wb-nbp3 F2): its git blob id, the names it exports at its top level that spell a
 * resource (in file order), and the line range and literals of each exported array declaration. */
interface ProducerTypes {
  readonly blob: string;
  readonly resourceExports: readonly string[];
  readonly arrays: ReadonlyMap<string, { readonly lines: string; readonly values: readonly string[] | null }>;
}
/** Reads a types module's bytes with the TypeScript compiler; git's blob id is sha1 over "blob <size>", a NUL and the bytes. */
function readProducerTypes(bytes: Buffer): ProducerTypes {
  const text = bytes.toString("utf8");
  const blob = createHash("sha1").update(`blob ${bytes.length}\u0000`).update(bytes).digest("hex");
  const file = ts.createSourceFile(ROSTER.producer.kinds.file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const lineOf = (position: number): number => file.getLineAndCharacterOfPosition(position).line + 1;
  const exported: string[] = [];
  const arrays = new Map<string, { readonly lines: string; readonly values: readonly string[] | null }>();
  for (const statement of file.statements) {
    if (ts.isExportDeclaration(statement) && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
      exported.push(...statement.exportClause.elements.map(element => element.name.text));
      continue;
    }
    if (!ts.canHaveModifiers(statement) || !(ts.getModifiers(statement) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name)) continue;
        exported.push(declaration.name.text);
        const value = declaration.initializer === undefined ? undefined : unwrap(declaration.initializer);
        if (value === undefined || !ts.isArrayLiteralExpression(value)) continue;
        const [start, end] = [lineOf(statement.getStart(file)), lineOf(statement.getEnd())];
        arrays.set(declaration.name.text, { lines: start === end ? `${start}` : `${start}-${end}`, values: arrayValues(value) });
      }
    } else if (
      (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)) &&
      statement.name !== undefined
    ) {
      exported.push(statement.name.text);
    }
  }
  return { blob, resourceExports: exported.filter(name => PRODUCER_RESOURCE_NAME.test(name)), arrays };
}
let producerReading: ProducerTypes | undefined;
/** The roster's vendored producer bytes (typesBase64, decoded), read once; a live source of the cases that read it. */
function producerTypes(): ProducerTypes {
  consult("producer");
  producerReading ??= readProducerTypes(Buffer.from(ROSTER.producer.typesBase64, "base64"));
  return producerReading;
}

/** A unit of the owner text the pins tile (wb-nbp3 F1): `key` sits in exactly one row label, `body` is what its pins tile. */
interface Unit {
  readonly id: string;
  readonly key: string;
  readonly body: string;
}
/** The trigger as the title states it with its gate (its gate-less form is the one row A's label carries) and each acceptance
 * clause after its "(x) " marker (the whole clause is what its row's label carries). */
function ownerUnits(bead: BeadRow): Unit[] {
  const trigger = /^\[[^\]]+\] (If Pi ever .+?) \(gated /.exec(bead.title)?.[1] ?? "";
  const gated = /^\[[^\]]+\] (If Pi ever .+? \(gated [^)]*\))/.exec(bead.title)?.[1] ?? "";
  const clauses = acceptanceClauses(bead.notes).map(clause => ({ id: clause.slice(0, 3), key: clause, body: clause.slice(4) }));
  return [{ id: "trigger", key: trigger, body: gated }, ...clauses];
}
const quoteIn = (unit: Unit, quote: string | undefined): boolean => quote !== undefined && quote.length > 0 && unit.body.includes(quote);
/** Do `quotes`, taken in the order they occur in `body`, cover it with separator-only gaps and no overlap? */
function tiled(body: string, quotes: readonly string[]): boolean {
  const spans = quotes.map(quote => ({ start: body.indexOf(quote), end: body.indexOf(quote) + quote.length })).sort((left, right) => left.start - right.start);
  let at = 0;
  for (const span of spans) {
    if (span.start < at || !TILING_GAP.test(body.slice(at, span.start))) return false;
    at = span.end;
  }
  return spans.length > 0 && TILING_GAP.test(body.slice(at));
}

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
const judgedRoot = (path: string): boolean => JUDGED_ROOTS.some(root => path.startsWith(`${root}/`));

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
/** An expression with its `as`, `satisfies`, `<T>` and parentheses removed, and an Object.freeze(x) read as x. */
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  for (;;) {
    if (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current) || ts.isParenthesizedExpression(current)) {
      current = current.expression;
    } else if (
      ts.isCallExpression(current) &&
      current.arguments.length === 1 &&
      ts.isPropertyAccessExpression(current.expression) &&
      current.expression.name.text === "freeze" &&
      ts.isIdentifier(current.expression.expression) &&
      current.expression.expression.text === "Object"
    ) {
      current = current.arguments[0] ?? current;
    } else {
      return current;
    }
  }
}

interface Mirror {
  readonly site: string;
  readonly family: string;
  readonly values: readonly string[] | null;
}
/** Which enum a declared name mirrors, or none. */
function mirrorFamily(name: string): string | undefined {
  const normal = name.toLowerCase().replace(/[_-]/g, "");
  return Object.keys(MIRROR_SUFFIXES).find(family => (MIRROR_SUFFIXES[family] ?? []).some(suffix => normal.endsWith(suffix)));
}
/** The string values of an array literal, every element folded; any other element (a spread, a call) leaves it unreadable. */
function arrayValues(node: ts.ArrayLiteralExpression): string[] | null {
  const values: string[] = [];
  for (const element of node.elements) {
    const value = fold(element);
    if (value === undefined) return null;
    values.push(value);
  }
  return values;
}
/** The string literal members of a literal union (or a single literal type); any other member leaves it unreadable. */
function unionValues(node: ts.TypeNode): string[] | null {
  const members = ts.isUnionTypeNode(node) ? [...node.types] : [node];
  const values: string[] = [];
  for (const member of members) {
    if (!ts.isLiteralTypeNode(member) || !ts.isStringLiteral(member.literal)) return null;
    values.push(member.literal.text);
  }
  return values;
}
const holdsDistinctive = (values: readonly string[] | null): boolean => (values ?? []).some(value => DISTINCTIVE_KINDS.includes(value));

interface ModuleReading {
  readonly vocabulary: string[];
  readonly kindLiterals: string[];
  readonly sdkLoads: string[];
  readonly h2: string[];
  readonly mirrors: Mirror[];
  readonly identifiers: Set<string>;
  readonly literals: Set<string>;
  readonly specifiers: string[];
}
/** One module, parsed under its own script kind: its vocabulary, kind-literal and H2 spellings in identifiers and cooked or
 * folded literals (A1, A2), its module specifiers and the literal first argument of every call or new expression with the SDK
 * loads among them (A1), and its enum mirrors (C1). Comments are never read: a comment is no reader. */
function readModule(path: string, source: string): ModuleReading {
  consult("module");
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const vocabulary: string[] = [];
  const kindLiterals: string[] = [];
  const h2: string[] = [];
  const mirrors: Mirror[] = [];
  const identifiers = new Set<string>();
  const literals = new Set<string>();
  const specifiers: string[] = [];
  const attributed = new Set<ts.Node>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const spelled = (node: ts.Node, kind: string, value: string): void => {
    if (RESOURCE_VOCABULARY.test(value)) vocabulary.push(`${path}:${line(node)} ${kind}: ${value}`);
    if (H2_FAMILY.test(value)) h2.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const literal = (node: ts.Node, kind: string, value: string): void => {
    literals.add(value);
    spelled(node, kind, value);
    if (DISTINCTIVE_KINDS.includes(value)) kindLiterals.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const load = (node: ts.Node | undefined): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value !== undefined) specifiers.push(value);
  };
  const mirror = (node: ts.Node, family: string, values: readonly string[] | null, value?: ts.Node): void => {
    mirrors.push({ site: `${path}:${line(node)}`, family, values });
    if (value !== undefined) attributed.add(value);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) {
      identifiers.add(node.text);
      spelled(node, "identifier", node.text);
    } else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      literal(node, "literal", node.text);
    }
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) literal(node, "folded", folded);
    }
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal);
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0]);
    // Named mirrors: a declaration whose name mirrors an enum, read from its array initializer, union or enum members.
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const family = mirrorFamily(node.name.text);
      if (family !== undefined) {
        const value = node.initializer === undefined ? undefined : unwrap(node.initializer);
        mirror(node, family, value !== undefined && ts.isArrayLiteralExpression(value) ? arrayValues(value) : null, value);
      }
    }
    if (ts.isTypeAliasDeclaration(node)) {
      const family = mirrorFamily(node.name.text);
      if (family !== undefined) mirror(node, family, unionValues(node.type), node.type);
    }
    if (ts.isEnumDeclaration(node)) {
      const family = mirrorFamily(node.name.text);
      if (family !== undefined) {
        const values = node.members.map(member => (member.initializer !== undefined && ts.isStringLiteralLike(member.initializer) ? member.initializer.text : undefined));
        mirror(node, family, values.every(value => value !== undefined) ? (values as string[]) : null);
      }
    }
    // Anonymous mirrors: an array literal or a literal union holding a distinctive kind, unless a named mirror owns it.
    if (ts.isArrayLiteralExpression(node) && !attributed.has(node)) {
      const values = arrayValues(node);
      if (holdsDistinctive(values)) mirror(node, "kinds", values);
    }
    if (ts.isUnionTypeNode(node) && !attributed.has(node)) {
      const values = unionValues(node);
      if (holdsDistinctive(values)) mirror(node, "kinds", values);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  const sdkLoads = specifiers.filter(specifier => SDK_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`);
  return { vocabulary, kindLiterals, sdkLoads, h2, mirrors, identifiers, literals, specifiers };
}
/** A non-module file under a judged root, read as UTF-8 text: every family it spells, by line. */
function readText(path: string, source: string): { readerHits: string[]; h2: string[] } {
  const readerHits: string[] = [];
  const h2: string[] = [];
  for (const [index, entry] of source.split("\n").entries()) {
    if (RESOURCE_VOCABULARY.test(entry) || QUOTED_KIND.test(entry) || SDK_FAMILY.test(entry)) readerHits.push(`${path}:${index + 1} text`);
    if (H2_FAMILY.test(entry)) h2.push(`${path}:${index + 1} text`);
  }
  return { readerHits, h2 };
}

/** One mirror's verdict against the producer's tuple of its family. */
function verdictOf(mirror: Mirror): string {
  const producer = mirror.family === "kinds" ? PRODUCER_KINDS : PRODUCER_STATUSES;
  const values = mirror.values;
  if (values === null) return "unresolved";
  if (new Set(values).size !== values.length) return "duplicated";
  if (values.some(value => !producer.includes(value))) return "widened";
  if (producer.some(value => !values.includes(value))) return "narrowed";
  return values.every((value, index) => value === producer[index]) ? "equal" : "reordered";
}

interface TreeReading {
  readonly walk: Walk;
  readonly modules: Map<string, ModuleReading>;
  readonly readerFindings: string[];
  readonly h2Findings: string[];
  readonly mirrors: Mirror[];
  readonly selfMirrors: Mirror[];
}
/** The walk of `root` and every judge over it. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const modules = new Map<string, ModuleReading>();
  const readerFindings: string[] = [];
  const h2Findings: string[] = [];
  const mirrors: Mirror[] = [];
  let selfMirrors: Mirror[] = [];
  for (const file of walk.files) {
    let source: string;
    try {
      source = readFileSync(join(root, file), "utf8");
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    if (isModule(file)) {
      const reading = readModule(file, source);
      modules.set(file, reading);
      if (EXEMPT.includes(file)) selfMirrors = reading.mirrors;
      else mirrors.push(...reading.mirrors);
      if (judgedRoot(file)) {
        readerFindings.push(...reading.vocabulary, ...reading.kindLiterals, ...reading.sdkLoads);
        h2Findings.push(...reading.h2);
      }
    } else if (judgedRoot(file)) {
      const reading = readText(file, source);
      readerFindings.push(...reading.readerHits);
      h2Findings.push(...reading.h2);
    }
  }
  return { walk, modules, readerFindings, h2Findings, mirrors, selfMirrors };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  consult("tree");
  live ??= readTree(REPO);
  return live;
}
const modulesBelow = (tree: TreeReading, root: string): number => [...tree.modules.keys()].filter(file => file.startsWith(`${root}/`)).length;

/** Plants `files` in a fresh scratch root and reads that tree. */
function plantedTree(files: Readonly<Record<string, string>>): TreeReading {
  consult("plant");
  const root = makeScratch("tsx-resource-closure-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}
/** A1's judge over one snippet read as `path`: does it spell the vocabulary, a distinctive kind or an SDK load? */
function readsRecords(path: string, source: string): boolean {
  const reading = readModule(path, source);
  return reading.vocabulary.length + reading.kindLiterals.length + reading.sdkLoads.length > 0;
}
/** C1's judge over one snippet: each mirror it holds, as its verdict. */
const verdictsIn = (source: string): string[] => readModule("c.ts", source).mirrors.map(verdictOf);

/** The workspace root of every reading: the observer and the provider compare it with the envelope's. */
const ROOT = process.cwd();
const CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:census" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** The full-shape clean render (test/helpers/rf-render-fixture.ts), a fresh copy. */
const cleanRender = (): JsonObject => json(fullShapeRf(ROOT)) as JsonObject;
function resultOf(envelope: JsonObject): JsonObject {
  const result = envelope.result;
  if (!isObject(result)) throw new Error("the full-shape fixture must carry an object result");
  return result as JsonObject;
}
/** The clean render with `records` riding at `carrier`. */
function carried(carrier: string, records: readonly JsonValue[]): JsonObject {
  const envelope = cleanRender();
  const result = resultOf(envelope);
  const provenance = result.provenance as JsonObject;
  if (carrier === "result.resources") result.resources = [...records];
  else if (carrier === "result.provenance.resources") provenance.resources = [...records];
  else if (carrier === "result.components") result.components = [{ component_id: "census.panel", resources: [...records] }];
  else if (carrier === "result.engine_metrics" || carrier === "result.work") {
    const key = carrier.slice("result.".length);
    result[key] = { ...(result[key] as JsonObject), resources: [...records] };
  } else throw new Error(`no carrier ${carrier}`);
  return envelope;
}
const readingOf = (source: JsonValue): JsonValue => ({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source });
function refusalOf(error: unknown): string {
  return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `other: ${String(error)}`;
}
/** The observer's projection of one reading, as plain JSON, or its typed refusal. */
function projected(reading: JsonValue): { topology?: JsonValue; refusal?: string } {
  consult("observer");
  try {
    return { topology: json(reactivefiberTopology(reading, CONTEXT)) };
  } catch (error) {
    return { refusal: refusalOf(error) };
  }
}
/** Every key and every string value anywhere in a value: what any display of it can show. */
function surfacedStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(surfacedStrings);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...surfacedStrings(item)]);
  return [];
}
const leakedIn = (value: unknown): string[] => surfacedStrings(value).filter(entry => NEEDLES.some(needle => entry.includes(needle)));
/** The coverage, tone and observation notes of a projection. */
function shapeOf(topology: JsonValue | undefined): JsonValue {
  const snapshot = isObject(topology) && Array.isArray(topology.snapshots) && isObject(topology.snapshots[0]) ? topology.snapshots[0] : undefined;
  const node = isObject(snapshot?.node) ? snapshot.node : undefined;
  const notes = isObject(topology) && Array.isArray(topology.diagnostics) ? topology.diagnostics.filter(note => typeof note === "string" && note.startsWith("observations: ")) : [];
  return json({ coverage: snapshot?.coverage ?? null, tone: node?.statusTone ?? null, notes });
}

/** One native render through a stand-in rf: the only PATH entry, a script of this run's node that prints `source` and exits 0,
 * so the provider's own envelope checks decide; the reading it returns, or its typed refusal. */
async function natively(source: JsonValue): Promise<{ reading?: JsonValue; refusal?: string }> {
  consult("native");
  const dir = makeScratch("tsx-resource-closure-rf-");
  const before = process.env.PATH;
  try {
    const binary = join(dir, "rf");
    writeFileSync(binary, `#!${process.execPath}\nprocess.stdout.write(${JSON.stringify(JSON.stringify(source))});\n`);
    chmodSync(binary, 0o700);
    process.env.PATH = dir;
    try {
      return { reading: await nativeReactiveFiberPreview("census-model", "census task", ROOT) };
    } catch (error) {
      return { refusal: refusalOf(error) };
    }
  } finally {
    if (before === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = before;
    removeScratch(dir);
  }
}

/** The clean render with its result replaced field by field (a `undefined` value removes the field). */
function withResult(fields: Readonly<Record<string, JsonValue | undefined>>, provenance: Readonly<Record<string, JsonValue | undefined>> = {}): JsonObject {
  const envelope = cleanRender();
  const result = resultOf(envelope);
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) delete result[key];
    else result[key] = value;
  }
  const stated = result.provenance as JsonObject;
  for (const [key, value] of Object.entries(provenance)) {
    if (value === undefined) delete stated[key];
    else stated[key] = value;
  }
  return envelope;
}
/** An observation row in the shape the observer reads: a status word, fresh, not replayed. */
const observationRow = (status: string, extra: JsonObject = {}): JsonObject => ({ status, freshness: "captured_at_render", replayed: false, ...extra });
/** A projection with `refs` removed from its evidence references and `notes` from its diagnostics. */
function without(topology: JsonValue | undefined, refs: readonly string[], notes: readonly string[]): JsonValue {
  const copy = json(topology);
  if (!isObject(copy) || !Array.isArray(copy.snapshots) || !Array.isArray(copy.diagnostics)) return copy;
  for (const snapshot of copy.snapshots) {
    if (isObject(snapshot) && Array.isArray(snapshot.evidenceRefs)) snapshot.evidenceRefs = snapshot.evidenceRefs.filter(ref => typeof ref !== "string" || !refs.includes(ref));
  }
  copy.diagnostics = copy.diagnostics.filter(note => typeof note !== "string" || !notes.includes(note));
  return copy;
}
const evidenceRefsOf = (topology: JsonValue | undefined): string[] => {
  const snapshot = isObject(topology) && Array.isArray(topology.snapshots) ? topology.snapshots[0] : undefined;
  return isObject(snapshot) && Array.isArray(snapshot.evidenceRefs) ? snapshot.evidenceRefs.filter((ref): ref is string => typeof ref === "string") : [];
};
const diagnosticsOf = (topology: JsonValue | undefined): string[] =>
  isObject(topology) && Array.isArray(topology.diagnostics) ? topology.diagnostics.filter((note): note is string => typeof note === "string") : [];

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): JsonValue {
  REACHED.push(pin);
  return { pin, ...witness };
}

const OUT_OF_CLOSURE = ["request-kind-query", "request-kind-QueryView", "entry-status-UNKNOWN"];
const IN_CLOSURE = ["request-kind-lens", "entry-status-ready"];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const tree = liveTree();
    const anchor = tree.modules.get(ANCHOR_MODULE);
    const floorsMet =
      tree.walk.files.length >= FLOORS.files &&
      modulesBelow(tree, "src") >= FLOORS.modules.src &&
      modulesBelow(tree, "test") >= FLOORS.modules.test &&
      modulesBelow(tree, "qa") >= FLOORS.modules.qa &&
      modulesBelow(tree, "examples") >= FLOORS.modules.examples;
    const anchors = {
      identifier: anchor?.identifiers.has(ANCHORS.identifier) === true,
      literal: anchor?.literals.has(ANCHORS.literal) === true,
      specifier: anchor?.specifiers.includes(ANCHORS.specifier) === true,
    };
    // The vocabulary is the producer's own: every resource name its types module exports matches, the TSX counter name never.
    // wb-nbp3 F2: the export list is the one the vendored producer bytes declare, not a list the roster states.
    const { resourceExports } = producerTypes();
    const vocabularyCovers = resourceExports.length > 0 && resourceExports.every(name => RESOURCE_VOCABULARY.test(name));
    expect(floorsMet, `files ${tree.walk.files.length}; modules src ${modulesBelow(tree, "src")}, test ${modulesBelow(tree, "test")}, qa ${modulesBelow(tree, "qa")}, examples ${modulesBelow(tree, "examples")}`).toBe(true);
    expect(anchors, `the readers read ${ANCHOR_MODULE}'s identifier, literal and specifier`).toStrictEqual({ identifier: true, literal: true, specifier: true });
    expect(vocabularyCovers, "RESOURCE_VOCABULARY matches every resource name the producer exports at the pin").toBe(true);
    expect({ findings: tree.readerFindings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "product files naming a resource record, a distinctive kind or the TSX SDK").toStrictEqual({
      findings: [],
      symlinks: [],
      unreadable: [],
    });
    const sdk = "@reactive-fiber/tsx";
    const planted = plantedTree({
      "src/reader.ts": 'import type { ResourceEntry } from "@reactive-fiber/tsx";\nexport const read = (entry: ResourceEntry) => entry;\n',
      "qa/reader.sh": "jq '.resources[] | .resourceId' render.json\n",
      "examples/notes.md": "kinds: 'fiber.node'\n",
      "test/reader.ts": "export const RESOURCE_KINDS = [];\n",
      "dist/reader.js": "exports.RESOURCE_KINDS = [];\n",
      "src/quiet.ts": "// RESOURCE_KINDS in a comment reads nothing\nexport const rounds = 'tsx_resource_rounds';\n",
    });
    const flagged = (path: string): boolean => planted.readerFindings.some(finding => finding.startsWith(`${path}:`));
    const controls = {
      identifier: readsRecords("c.ts", "const kinds = RESOURCE_KINDS;\n"),
      typeName: readsRecords("c.ts", "let entry: ResourceEntry | undefined;\n"),
      validatorName: readsRecords("c.ts", "assertResourceSnapshotJson(value);\n"),
      fieldName: readsRecords("c.ts", "const id = record.resourceId;\n"),
      elementAccess: readsRecords("c.mjs", 'const id = record["resourceId"];\n'),
      escapedIdentifier: readsRecords("c.ts", "const kinds = \\u0052ESOURCE_KINDS;\n"),
      folded: readsRecords("c.ts", 'const name = "RESOURCE_" + "KINDS";\n'),
      kindLiteral: readsRecords("c.ts", 'if (record.kind === "fiber.node") read(record);\n'),
      escapedKind: readsRecords("c.ts", 'const kind = "fiber\\u002einput";\n'),
      sdkImport: readsRecords("c.ts", `import { RESOURCE_KINDS as kinds } from "${sdk}";\n`),
      sdkDynamic: readsRecords("c.mjs", `const sdk = await import("${sdk}/testing");\n`),
      sdkRequire: readsRecords("c.cjs", `const sdk = require("npm:${sdk}@0.1.668");\n`),
      counterName: readsRecords("c.ts", 'const rounds = metrics["tsx_resource_rounds"];\n'),
      loaderName: readsRecords("c.ts", "const loader = new DefaultResourceLoader({ resourceLoader });\n"),
      commentOnly: readsRecords("c.ts", "// reads RESOURCE_KINDS one day\nexport {};\n"),
      composedJoin: readsRecords("c.ts", 'const name = ["RESOURCE", "KINDS"].join("_");\n'),
      composedSpecifier: readsRecords("c.mjs", `const name = "tsx";\nconst sdk = await import(\`@reactive-fiber/${"$"}{name}\`);\n`),
      rot13: readsRecords("c.ts", 'const name = "ERFBHEPR_XVAQF";\n'),
      plantedSrc: flagged("src/reader.ts"),
      plantedQaText: flagged("qa/reader.sh"),
      plantedExamplesText: flagged("examples/notes.md"),
      testRoot: flagged("test/reader.ts"),
      distRoot: flagged("dist/reader.js"),
      quietSrc: flagged("src/quiet.ts"),
    };
    return done("A1", { floorsMet, anchors, vocabularyCovers, findings: tree.readerFindings, controls });
  },
  A2: () => {
    const tree = liveTree();
    expect(tree.h2Findings, "product files naming an H2 work package or the harness2 program").toEqual([]);
    const h2In = (source: string): boolean => readModule("c.ts", source).h2.length > 0;
    const planted = plantedTree({
      "src/h2.ts": 'export const SCHEMA = "TSX-H2-01";\n',
      "qa/h2.sh": "cat docs/programs/harness2-reactive-evolution-2026-10-20/README.md\n",
      "test/h2.ts": 'export const SCHEMA = "RI-H2-01";\n',
    });
    const controls = {
      tsxPackage: h2In('const wp = "TSX-H2-00";\n'),
      inferencePackage: h2In('const wp = "RI-H2-01";\n'),
      componentsPackage: h2In('const wp = "RC-H2-02";\n'),
      opticsPackage: h2In('const wp = "FO-H2-01";\n'),
      lensesPackage: h2In('const wp = "rl_h2_03";\n'),
      program: h2In('const path = "docs/programs/harness2-reactive-evolution-2026-10-20";\n'),
      identifier: h2In("const tsxH2 = 1;\nconst TSX_H2_PIN = tsxH2;\n"),
      heading: h2In('const level = "h2";\n'),
      harness: h2In('const kind = "test harness";\n'),
      unnamedArtifact: h2In('const schema = "example.unnamed-artifact/v1";\n'),
      plantedSrc: planted.h2Findings.some(finding => finding.startsWith("src/h2.ts:")),
      plantedQaText: planted.h2Findings.some(finding => finding.startsWith("qa/h2.sh:")),
      testRoot: planted.h2Findings.some(finding => finding.startsWith("test/h2.ts:")),
    };
    return done("A2", { findings: tree.h2Findings, controls });
  },
  A3: () => {
    const { producer } = ROSTER;
    const bead = readBeadRow();
    const gating = noteLine(bead.notes, "Gating artifact: ");
    const shortSha = producer.sha.slice(0, 12);
    const namesApiPin = producer.apiPin.names.every(name => gating.includes(name));
    const beadSaysAbsent = gating.includes(`ABSENT at ${shortSha}`) && gating.includes("0 src files mention QueryView") && gating.endsWith("Shipped: no.");
    const pinCited = ROSTER.citation.endsWith(`@${shortSha}`) && bead.title.endsWith(ROSTER.citation);
    const apiPinShipped = producer.apiPin.matchesAtPin.length > 0 || producer.queryViewSrcFiles.length > 0;
    expect({ namesApiPin, beadSaysAbsent, pinCited }, `the bead row ${BEAD} names the API pin and states it absent at the cited sha`).toStrictEqual({ namesApiPin: true, beadSaysAbsent: true, pinCited: true });
    expect(apiPinShipped, "the API pin landed: the (a)-(d) reader tests are owed with the reader (wb-4nut.3)").toBe(false);
    return done("A3", {
      repo: producer.repo,
      sha: producer.sha,
      apiPin: [...producer.apiPin.names],
      matchesAtPin: [...producer.apiPin.matchesAtPin],
      queryViewSrcFiles: [...producer.queryViewSrcFiles],
      namesApiPin,
      beadSaysAbsent,
      pinCited,
      apiPinShipped,
    });
  },
  B1: async () => {
    const clean = projected(readingOf(cleanRender()));
    expect(clean.refusal, "the clean render projects").toBeUndefined();
    const cleanShape = shapeOf(clean.topology);
    const unread: Record<string, Record<string, boolean>> = {};
    const leaked: string[] = [];
    for (const carrier of CARRIERS) {
      unread[carrier] = {};
      for (const id of OUT_OF_CLOSURE) {
        const reading = projected(readingOf(carried(carrier, [fixture(id)])));
        (unread[carrier] as Record<string, boolean>)[id] = reading.refusal === undefined && JSON.stringify(reading.topology) === JSON.stringify(clean.topology);
        leaked.push(...leakedIn(reading.topology));
      }
    }
    const records = OUT_OF_CLOSURE.map(fixture);
    const refused = Object.fromEntries(CLOSED_CARRIERS.map(carrier => [carrier, projected(readingOf(carried(carrier, records))).refusal ?? "projected"]));
    const bare = Object.fromEntries(OUT_OF_CLOSURE.map(id => [id, projected(readingOf(fixture(id))).refusal ?? "projected"]));
    // The native seam: the stand-in rf prints the render with the records riding result.resources, then in a closed object, then bare.
    const sent = carried("result.resources", records);
    const admitted = await natively(sent);
    const source = isObject(admitted.reading) ? admitted.reading.source : undefined;
    const nativeReading = admitted.reading === undefined ? undefined : projected(admitted.reading);
    const native = {
      verbatim: JSON.stringify(source) === JSON.stringify(sent),
      unread: nativeReading?.refusal === undefined && JSON.stringify(nativeReading?.topology) === JSON.stringify(clean.topology),
      closed: (await natively(carried("result.engine_metrics", records))).refusal ?? "admitted",
      bare: (await natively(fixture("entry-status-UNKNOWN"))).refusal ?? "admitted",
    };
    expect(Object.values(unread).every(byRecord => Object.values(byRecord).every(Boolean)), "every open-object carrier leaves every record unread").toBe(true);
    expect(leaked, "projected strings carrying a fixture needle").toEqual([]);
    expect([...Object.values(refused), ...Object.values(bare)].every(refusal => refusal.startsWith("validation: ")), "closed objects and bare records are typed refusals").toBe(true);
    expect({ verbatim: native.verbatim, unread: native.unread }, "the native provider carries the open-object record verbatim and the observer leaves it unread").toStrictEqual({ verbatim: true, unread: true });
    return done("B1", { clean: cleanShape, unread, leaked, refused, bare, native });
  },
  B2: () => {
    const shapeFor = (rows: readonly JsonValue[]): JsonValue => shapeOf(projected(readingOf(withResult({ observations: [...rows] }))).topology);
    const fullFor = (rows: readonly JsonValue[]): string => JSON.stringify(projected(readingOf(withResult({ observations: [...rows] }))));
    const observed = shapeFor([observationRow("observed")]);
    const unknown = shapeFor([observationRow("UNKNOWN")]);
    const control = fullFor([observationRow(CONTROL_WORD)]);
    // UNKNOWN reads as the control word does: the two projections differ only by the word the note lists.
    const generic = fullFor([observationRow("UNKNOWN")]).split("UNKNOWN").join(CONTROL_WORD) === control && !control.includes("UNKNOWN");
    const kindUnread = {
      observedQueryView: fullFor([observationRow("observed", { kind: "QueryView" })]) === fullFor([observationRow("observed")]),
      unknownQuery: fullFor([observationRow("UNKNOWN", { kind: "query" })]) === fullFor([observationRow("UNKNOWN")]),
    };
    expect(generic, "the UNKNOWN row projects as the control word's row with the word swapped in").toBe(true);
    expect(kindUnread, "a row's kind is never read").toStrictEqual({ observedQueryView: true, unknownQuery: true });
    return done("B2", { observed, unknown, generic, kindUnread });
  },
  C1: () => {
    const tree = liveTree();
    const modulesFloorMet = modulesBelow(tree, "src") >= FLOORS.modules.src && modulesBelow(tree, "test") >= FLOORS.modules.test;
    const mirrors = tree.mirrors.map(mirror => `${mirror.site} ${mirror.family}: ${verdictOf(mirror)}`);
    const selfVerdicts = tree.selfMirrors.map(verdictOf);
    expect(modulesFloorMet, "the mirror judge walked the src and test modules").toBe(true);
    expect(tree.mirrors.filter(mirror => verdictOf(mirror) !== "equal").map(mirror => mirror.site), "mirrors that differ from the producer's tuple").toEqual([]);
    expect(mirrors, "enum mirrors outside the exemption (none today)").toEqual([]);
    expect(selfVerdicts.length > 0, "the exemption is load-bearing: this file's own tuples read as a mirror").toBe(true);
    const six = PRODUCER_KINDS.map(kind => `"${kind}"`).join(", ");
    const planted = plantedTree({
      "src/kinds.ts": `export const RESOURCE_KINDS = [${six}, "query"] as const;\n`,
      "test/kinds.ts": `const kinds = [${six}];\n`,
      "dist/kinds.js": `exports.RESOURCE_KINDS = [${six}, "QueryView"];\n`,
      "test/fixtures/kinds.json": `{"kinds": [${six}, "query"]}\n`,
    });
    const controls = {
      exactAsConst: verdictsIn(`export const RESOURCE_KINDS = [${six}] as const;\n`),
      exactFrozen: verdictsIn(`const PI_RESOURCE_KINDS = Object.freeze([${six}]);\n`),
      exactUnion: verdictsIn(`type ResourceKind = ${PRODUCER_KINDS.map(kind => `"${kind}"`).join(" | ")};\n`),
      exactEnum: verdictsIn(`enum ResourceKind { Node = "fiber.node", Input = "fiber.input", Provider = "provider", Lens = "lens", Inference = "inference", Capability = "capability" }\n`),
      exactStatuses: verdictsIn('const RESOURCE_ENTRY_STATUSES = ["ready", "failed"] as const;\n'),
      seventhQuery: verdictsIn(`const RESOURCE_KINDS = [${six}, "query"];\n`),
      seventhQueryView: verdictsIn(`type ResourceKind = ${PRODUCER_KINDS.map(kind => `"${kind}"`).join(" | ")} | "QueryView";\n`),
      anonymousSeventh: verdictsIn(`const kinds = [${six}, "QueryView"];\n`),
      statusUnknown: verdictsIn('const RESOURCE_ENTRY_STATUSES = ["ready", "failed", "UNKNOWN"] as const;\n'),
      statusUnionUnknown: verdictsIn('type ResourceEntryStatus = "ready" | "failed" | "UNKNOWN";\n'),
      narrowed: verdictsIn('const RESOURCE_KINDS = ["fiber.node", "fiber.input", "provider", "lens", "inference"];\n'),
      reordered: verdictsIn('const RESOURCE_KINDS = ["fiber.input", "fiber.node", "provider", "lens", "inference", "capability"];\n'),
      duplicated: verdictsIn(`const RESOURCE_KINDS = [${six}, "lens"];\n`),
      unresolved: verdictsIn("const RESOURCE_KINDS = loadKinds();\n"),
      spreadUnresolved: verdictsIn("const RESOURCE_KINDS = [...upstream];\n"),
      composedMirror: verdictsIn('const kinds = [["fiber", "node"].join("."), "provider"];\n'),
      genericMirror: verdictsIn('const kinds = ["provider", "lens", "inference", "capability"];\n'),
      statusLiteralOnly: verdictsIn('const states = ["ready", "failed"];\n'),
      plantedSrc: planted.mirrors.filter(mirror => mirror.site.startsWith("src/kinds.ts:")).map(verdictOf),
      plantedTest: planted.mirrors.filter(mirror => mirror.site.startsWith("test/kinds.ts:")).map(verdictOf),
      distRoot: planted.mirrors.filter(mirror => mirror.site.startsWith("dist/")).map(verdictOf),
      jsonData: planted.mirrors.filter(mirror => mirror.site.startsWith("test/fixtures/")).map(verdictOf),
    };
    return done("C1", { modulesFloorMet, mirrors, selfVerdicts, controls });
  },
  C2: () => {
    const { producer } = ROSTER;
    const gating = gatingTuples(readBeadRow().notes);
    const tuples = { kinds: [...PRODUCER_KINDS], statuses: [...PRODUCER_STATUSES] };
    const rosterAgrees = JSON.stringify([producer.kinds.values, producer.statuses.values]) === JSON.stringify([tuples.kinds, tuples.statuses]);
    const beadAgrees = JSON.stringify([gating.kinds, gating.statuses]) === JSON.stringify([tuples.kinds, tuples.statuses]);
    const linesAgree = producer.kinds.lines === gating.kindsLines && producer.statuses.lines === gating.statusesLines && producer.kinds.file === "src/resources/types.ts" && producer.statuses.file === producer.kinds.file;
    const closure = (record: JsonObject): string => {
      if (Object.hasOwn(record, "kind")) return typeof record.kind === "string" && PRODUCER_KINDS.includes(record.kind) ? "admitted" : "rejected";
      if (Object.hasOwn(record, "status")) return typeof record.status === "string" && PRODUCER_STATUSES.includes(record.status) ? "admitted" : "rejected";
      return "rejected";
    };
    const fixtures = Object.fromEntries(ROSTER.fixtures.map(entry => [entry.id, closure(entry.record)]));
    expect({ rosterAgrees, beadAgrees, linesAgree }, "the census's tuples are the producer's, as the roster and the bead row measure them").toStrictEqual({ rosterAgrees: true, beadAgrees: true, linesAgree: true });
    expect(
      OUT_OF_CLOSURE.map(id => fixtures[id]),
      "every out-of-closure fixture (a seventh kind, an UNKNOWN status) is rejected",
    ).toEqual(OUT_OF_CLOSURE.map(() => "rejected"));
    expect(
      IN_CLOSURE.map(id => fixtures[id]),
      "the in-closure controls are admitted",
    ).toEqual(IN_CLOSURE.map(() => "admitted"));
    return done("C2", { tuples, kindsLines: gating.kindsLines, statusesLines: gating.statusesLines, rosterAgrees, beadAgrees, linesAgree, fixtures });
  },
  D1: async () => {
    const major = (schema: string, result: JsonValue): JsonObject => ({ ...cleanRender(), schema, result });
    const clean = resultOf(cleanRender());
    const malformed = "body-not-parsed";
    const observer = {
      v2MalformedBody: projected(readingOf(major("reactive-fiber.cli/v2", malformed))).refusal ?? "projected",
      v10MalformedBody: projected(readingOf(major("reactive-fiber.cli/v10", malformed))).refusal ?? "projected",
      v2CleanBody: projected(readingOf(major("reactive-fiber.cli/v2", clean))).refusal ?? "projected",
      v1MalformedBody: projected(readingOf(major(REACTIVE_FIBER_CLI_SCHEMA, malformed))).refusal ?? "projected",
    };
    const native = {
      v2MalformedBody: (await natively(major("reactive-fiber.cli/v2", malformed))).refusal ?? "admitted",
      v1MalformedBody: (await natively(major(REACTIVE_FIBER_CLI_SCHEMA, malformed))).refusal ?? "admitted",
    };
    const schemaRefusal = `validation: ReactiveFiber topology refused: source must be a ${REACTIVE_FIBER_CLI_SCHEMA} context.render envelope.`;
    expect([observer.v2MalformedBody, observer.v10MalformedBody, observer.v2CleanBody], "a major above the pin is the schema refusal, whatever the body holds").toEqual([schemaRefusal, schemaRefusal, schemaRefusal]);
    expect(observer.v1MalformedBody === schemaRefusal || observer.v1MalformedBody === "projected", "under the pin the same body is read and refused for itself").toBe(false);
    expect(native.v2MalformedBody !== native.v1MalformedBody && native.v2MalformedBody.startsWith("transport: "), "the native seam refuses the major before the body").toBe(true);
    return done("D1", { piPin: REACTIVE_FIBER_CLI_SCHEMA, observer, native });
  },
  D2: async () => {
    const stated = projected(readingOf(cleanRender())).topology;
    const release = resultOf(cleanRender()).provenance as JsonObject;
    const cliRef = `rf-cli:${String(release.cli_version)}`;
    const cliNote = `producer release from result.provenance.cli_version: rf@${String(release.cli_version)}`;
    const bundleRef = `rf-bundle:${String(resultOf(cleanRender()).bundle_revision_id)}`;
    const noRelease = projected(readingOf(withResult({}, { cli_version: undefined }))).topology;
    const noBundle = projected(readingOf(withResult({ bundle_revision_id: undefined }))).topology;
    const fingerprint = "unknown";
    const sdkVersions = (entry: JsonObject): JsonObject => ({ ...(release.sdk_versions as JsonObject), tsx_runtime: entry });
    const engineVersioned = projected(readingOf(withResult({}, { sdk_versions: sdkVersions({ distribution_version: "0.1.649", contract_fingerprint: fingerprint }) }))).topology;
    const engineUnversioned = projected(readingOf(withResult({}, { sdk_versions: sdkVersions({ contract_fingerprint: fingerprint }) }))).topology;
    const sourceVersionOf = (topology: JsonValue | undefined): boolean => isObject(topology) && Array.isArray(topology.snapshots) && isObject(topology.snapshots[0]) && Object.hasOwn(topology.snapshots[0], "sourceVersion");
    const cliVersion = {
      dropped: [...evidenceRefsOf(stated).filter(ref => ref === cliRef), ...diagnosticsOf(stated).filter(note => note === cliNote)],
      otherwiseIdentical: JSON.stringify(without(stated, [cliRef], [cliNote])) === JSON.stringify(noRelease),
    };
    // The stated projection without the bundle's reference and its sourceVersion is the bundle-less projection, member for member.
    const bundleless = without(stated, [bundleRef], []);
    if (isObject(bundleless) && Array.isArray(bundleless.snapshots) && isObject(bundleless.snapshots[0])) delete bundleless.snapshots[0].sourceVersion;
    const bundle = {
      sourceVersionStated: sourceVersionOf(stated),
      sourceVersionUnstated: sourceVersionOf(noBundle),
      dropped: evidenceRefsOf(stated).filter(ref => ref === bundleRef),
      unstatedRefs: evidenceRefsOf(noBundle).filter(ref => ref.startsWith("rf-bundle:")),
      otherwiseIdentical: JSON.stringify(bundleless) === JSON.stringify(noBundle),
    };
    const engine = {
      versioned: evidenceRefsOf(engineVersioned).filter(ref => ref.startsWith("rf-engine:")),
      unversioned: evidenceRefsOf(engineUnversioned).filter(ref => ref.startsWith("rf-engine:")),
      unversionedAsClean: JSON.stringify(engineUnversioned) === JSON.stringify(stated),
    };
    // The release-less projection names no release anywhere: no rf-cli reference, no rf@ release, no producer-release note.
    const defaulted = surfacedStrings(noRelease).filter(entry => /rf-cli:|rf@|producer release/.test(entry));
    const carriedUnversioned = await natively(withResult({}, { cli_version: undefined }));
    const nativeSource = isObject(carriedUnversioned.reading) && isObject(carriedUnversioned.reading.source) ? carriedUnversioned.reading.source : undefined;
    const nativeProvenance = isObject(nativeSource?.result) && isObject(nativeSource.result.provenance) ? nativeSource.result.provenance : undefined;
    const native = { admitted: carriedUnversioned.refusal === undefined, cliVersionMinted: nativeProvenance === undefined || Object.hasOwn(nativeProvenance, "cli_version") };
    expect({ release: cliVersion.otherwiseIdentical, bundle: bundle.otherwiseIdentical, engine: engine.unversionedAsClean }, "an unstated version drops exactly what the stated one produced").toStrictEqual({ release: true, bundle: true, engine: true });
    expect({ stated: bundle.sourceVersionStated, unstated: bundle.sourceVersionUnstated, unstatedRefs: bundle.unstatedRefs }, "an unstated bundle leaves sourceVersion and its reference absent").toStrictEqual({ stated: true, unstated: false, unstatedRefs: [] });
    expect(engine.unversioned, "an engine entry stating no version yields no engine reference").toEqual([]);
    expect(defaulted, "a default release in an unversioned projection").toEqual([]);
    expect(native, "the native provider carries the unversioned envelope without minting the field").toStrictEqual({ admitted: true, cliVersionMinted: false });
    return done("D2", { cliVersion, bundle, engine, defaulted, native });
  },
};

/** A describe title: the row id and its label. */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("wb-4nut.3 TSX resource-record closure census (TSX-HARNESS2-REACTIVE-EVOLUTION-R3, absent-today leg and armed guard)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, async () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(Object.keys(PINS), "every pin, and only a pin, carries a quote and its sources, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(Object.fromEntries(ROSTER.rows.flatMap(row => row.pins).map(pin => [pin.id, { quote: pin.quote, sources: [...pin.sources] }]))).toStrictEqual(
      Object.fromEntries(Object.entries(PINS).map(([pin, entry]) => [pin, { quote: entry.quote, sources: [...entry.sources] }])),
    );
    expect({
      bead: BEAD,
      scan: {
        producerKinds: PRODUCER_KINDS,
        producerStatuses: PRODUCER_STATUSES,
        distinctiveKinds: DISTINCTIVE_KINDS,
        resourceVocabulary: `${RESOURCE_VOCABULARY.source}/${RESOURCE_VOCABULARY.flags}`,
        sdkFamily: `${SDK_FAMILY.source}/${SDK_FAMILY.flags}`,
        h2Family: `${H2_FAMILY.source}/${H2_FAMILY.flags}`,
        quotedKind: `${QUOTED_KIND.source}/${QUOTED_KIND.flags}`,
        mirrorSuffixes: MIRROR_SUFFIXES,
        moduleExtensions: MODULE_EXTENSIONS,
        skippedRoots: SKIPPED_ROOTS,
        judgedRoots: JUDGED_ROOTS,
        exempt: EXEMPT,
        floors: FLOORS,
        anchorModule: ANCHOR_MODULE,
        anchors: ANCHORS,
        carriers: CARRIERS,
        closedCarriers: CLOSED_CARRIERS,
        needles: NEEDLES,
        controlWord: CONTROL_WORD,
        outOfClosure: OUT_OF_CLOSURE,
        inClosure: IN_CLOSURE,
        producerResourceName: `${PRODUCER_RESOURCE_NAME.source}/${PRODUCER_RESOURCE_NAME.flags}`,
        tilingGap: `${TILING_GAP.source}/${TILING_GAP.flags}`,
        sources: SOURCES,
      },
      residuals: RESIDUAL_FAMILIES,
      fixtures: [...OUT_OF_CLOSURE, ...IN_CLOSURE],
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals], fixtures: ROSTER.fixtures.map(entry => entry.id) });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever .+?) \(gated /.exec(bead.title)?.[1] ?? "";
    const quote = /^Quote: '(.+)' (\S+)\. Merged: /m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["D"], ["A"]]);
    expect(clauses[0], "acceptance (a) names the UNKNOWN status and the QueryView kind").toMatch(/'UNKNOWN'.*'QueryView'/);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.sha.slice(0, 12)}`), "the citation pins the producer sha the roster measured").toBe(true);
    // wb-nbp3 F1, the pin anchor: every pin's quote sits in exactly one unit of the owner text, the unit is its row's, and each
    // unit's pins tile it, so a pin removed from every literal of this file and the roster leaves its slice of a unit untiled.
    const units = ownerUnits(bead);
    const pinIds = ROWS.flatMap(row => row.pins);
    const homes = (pin: string): Unit[] => units.filter(unit => quoteIn(unit, PINS[pin]?.quote));
    const ownerOf = (unit: Unit): string | undefined => {
      const owners = ROWS.filter(row => unit.key.length > 0 && row.label.includes(unit.key));
      return owners.length === 1 ? owners[0]?.id : undefined;
    };
    expect(units.map(unit => unit.id), "the owner text's units: the gated trigger and the four acceptance clauses").toEqual(["trigger", "(a)", "(b)", "(c)", "(d)"]);
    expect(
      pinIds.map(pin => `${pin}:${homes(pin).map(unit => unit.id).join("+")}`),
      "each pin's quote sits in exactly one unit of the owner text",
    ).toEqual(["A1:trigger", "A2:trigger", "A3:trigger", "B1:(a)", "B2:(a)", "C1:(b)", "C2:(b)", "D1:(c)", "D2:(d)"]);
    const misplaced = pinIds.filter(pin => homes(pin).some(unit => ownerOf(unit) !== ROWS.find(row => row.pins.includes(pin))?.id));
    const untiled = units.filter(unit => !tiled(unit.body, pinIds.map(pin => PINS[pin]?.quote ?? "").filter(quote => quoteIn(unit, quote)))).map(unit => unit.id);
    expect({ misplaced, untiled }, "every unit is its row's and its pins tile it with separator-only gaps").toStrictEqual({ misplaced: [], untiled: [] });
    // wb-nbp3 F2, the producer anchor: the vendored types module is the blob the bead row's PRODUCER FACTS line measured, it
    // declares the gating sentence's tuples on the lines that sentence names, and its resource exports are the roster's list,
    // each one matched by RESOURCE_VOCABULARY.
    const types = producerTypes();
    const measured = /\btypes\.ts blob ([0-9a-f]{12}) /.exec(noteLine(bead.notes, "PRODUCER FACTS "))?.[1] ?? "";
    const gating = gatingTuples(bead.notes);
    expect(
      {
        blob: types.blob,
        measured: measured.length === 12 && types.blob.startsWith(measured),
        kinds: types.arrays.get("RESOURCE_KINDS") ?? null,
        statuses: types.arrays.get("RESOURCE_ENTRY_STATUSES") ?? null,
        resourceExports: [...types.resourceExports],
        unmatched: types.resourceExports.filter(name => !RESOURCE_VOCABULARY.test(name)),
      },
      "the vendored producer bytes are the measured blob, declare the gating tuples and export the roster's resource names",
    ).toStrictEqual({
      blob: ROSTER.producer.typesBlob,
      measured: true,
      kinds: { lines: gating.kindsLines, values: gating.kinds },
      statuses: { lines: gating.statusesLines, values: gating.statuses },
      resourceExports: [...ROSTER.producer.resourceExports],
      unmatched: [],
    });
    // The quiet rows. R-RETILED: B2 dropped while B1's quote is widened over B2's slice - every unit still tiles.
    const widened = pinIds.filter(pin => pin !== "B2").map(pin => (pin === "B1" ? `${PINS.B1?.quote}, ${PINS.B2?.quote}` : (PINS[pin]?.quote ?? "")));
    const retiled = units.filter(unit => !tiled(unit.body, widened.filter(quote => quoteIn(unit, quote)))).map(unit => unit.id);
    // R-IDLE-READ: a case that consults A3's declared source and returns a copy of A3's roster witness taken before its run.
    const copy = rosterWitness("A3");
    const idle = await guarded("A3", () => {
      readBeadRow();
      return copy;
    });
    expect(
      {
        retiled: { dropped: "B2", widened: "B1", untiled: retiled },
        idleRead: { pin: "A3", misses: guardMisses("A3", idle), copied: JSON.stringify(idle.witness) === JSON.stringify(copy) },
      },
      "the quiet rows of R-RETILED and R-IDLE-READ",
    ).toStrictEqual(ROSTER.quietRows);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const run = impl === undefined ? undefined : await guarded(pin, impl);
          expect(run?.witness ?? null).toStrictEqual(rosterWitness(pin));
          // wb-nbp3 F3: the case measured exactly its declared live sources and read no roster witness.
          expect(run === undefined ? ["no run"] : guardMisses(pin, run), `${pin}'s case measures its declared sources and copies no roster witness`).toEqual([]);
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order and every pin reached its end", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") visit(child.tasks);
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
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
