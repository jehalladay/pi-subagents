/**
 * wb-4nut.8 (TSX-HARNESS2-REACTIVE-EVOLUTION-R8, program-triage-2026-10-22), the absent-today leg and the clauses Pi can
 * measure now. Statement (bead notes, full form): "If Pi ever reads Lenses notification events or owner-unreachable states
 * (gated RL-H2-01 adapters + RL-H2-02 resync states, unshipped), Pi shall never mark a result READY on a notification alone
 * (READY only for an accepted owner snapshot in a Fiber transaction) and shall carry STALE / UNAVAILABLE / WITHHELD /
 * RESYNC_REQUIRED verbatim, distinct, never collapsed; a new freshness word on an rf envelope is refused or carried, never
 * mapped to current/success" (ReactiveLensesSDK docs/programs/harness2-reactive-evolution-2026-10-20/README.md:44@bfe1f4ac7fa0).
 * Acceptance (owner filing, verbatim; held in the labels of rows B, C, D and E): "(a) notification then no snapshot data keeps
 * the Pi projection dirty/pending, never READY; READY appears only after the transaction commit receipt; (b) two duplicate
 * notifications produce at most one accepted transition (L51); (c) battery over STALE/UNAVAILABLE/WITHHELD/RESYNC_REQUIRED: each
 * word appears verbatim in its own row and never in another's (wb-4ap.2 shape); (d) a new freshness word on an rf envelope
 * yields a typed refusal or verbatim carry, never 'current'/'success'." The filing's own reading: "Not P0: today's reader
 * refuses unknown freshness words, so no misread is live; gating guard."
 *
 * So the trigger has not fired: no Pi module reads a Lenses notification event or an owner-unreachable state, and Pi's one rf
 * channel reads one noncommitted render per spawn. This census pins that state and measures each clause on the reader Pi has
 * today for it:
 *  A, the trigger, absent today. A1 no product file (every file below the judged roots src/, qa/ and examples/, read as UTF-8)
 *    spells a LENS_VOCABULARY term: the RL-H2-01 adapter names SnapshotObservation and ImportBinding (any case, joined
 *    directly or by '_' or '-', never by '.' or a space: the detached observer's property path snapshot.observation, in
 *    src/workbench/detached-observer.ts and two qa scripts, stays quiet), RL's shipped push-notification route
 *    notify_push_updated in snake or camel case (src/reactive_lenses/bridge.py:523@bfe1f4ac7fa0), the RL-H2-02 resync-required
 *    state in any case and separator, or a load of the Lenses SDK (its distribution vibranium-reactive-lenses, a module path
 *    through reactive-lenses/ or reactive_lenses/ - a scoped package, a vendored copy or the sibling checkout - or a Python
 *    import, from or -m of reactive_lenses). A2 Pi's one rf channel opens no notification stream: the native catalog
 *    registers one reactivefiber descriptor (effectClass read, invoke only), each call of either input arm spawns one
 *    `context render ... --no-commit --no-input --json` and reads one JSON document, so a stand-in rf printing a notification
 *    line before its envelope is refused as malformed JSON. A3 the gating artifact is measured absent: the roster's producer
 *    facts find no src file spelling SnapshotObservation, ImportBinding or a resync-required state at the pin or at the
 *    measured origin/master tip, the cited README lines hold the filing's quoted words, and the bead row's gating sentence
 *    says "Shipped: no."
 *  B, acceptance (a), on ObservationProjection (src/workbench/observation.ts), the projection every Pi reader lands in. Pi's
 *    READY is a node whose freshness reads current (for any other freshness the inspector's tone glyph reads '?' and telemetry
 *    reads the node as last-known) with its completeness complete; the accepted-snapshot analog is refresh, the projection's
 *    one path that restores source truth
 *    ("Only an actual read-current snapshot restores source truth after a gap."). B1 a node seen only through notification
 *    events never reads current or complete, a READY presentation an event states is echoed but never upgrades Pi's own
 *    fields, a data-less notification after the accepted snapshot re-marks the node stale and keeps the snapshot's value, and
 *    only a refresh with a captured snapshot makes it current. B2 the same rule read through the projection's derived view: a
 *    grouping parent's aggregate counts the child stale until the snapshot and again after the next notification.
 *  C, acceptance (b), on the same projection. C1 a re-delivered event id applies as duplicate and a re-delivered stream
 *    position under a fresh id as out-of-order: no revision step, the node unchanged. C2 the duplicate-notification journey of
 *    README.md:51 (two duplicate notifications, then the accepted snapshot) reaches current exactly once and changes the
 *    presented value never through a notification, with distinct ids too; without the snapshot it never reaches current.
 *  D, acceptance (c), on the rf render path's one status-word reader (the observation rows of a render, the place an RL-H2-02
 *    state word would ride through rf). D1 each BATTERY word as a row status reads as a not-observed status: its projection's
 *    note lists it verbatim, the projection carries no other BATTERY word, coverage partial and tone unknown (never complete or
 *    success), and the projection equals a control word's with the word swapped in. D2 the four in one render are listed
 *    distinct and verbatim in row order, a repeated word once, reversed rows reversed, and a fifth word marks the bound.
 *  E, acceptance (d). E1 the reader adapter refuses every row freshness outside the pinned pair captured_at_render | reused
 *    (the four BATTERY words, Pi's own outcome words, a novel word, case variants of the pair and the empty word) with one
 *    typed CapabilityError, so no topology exists to read current or success; the pair itself projects. E2 the native seam
 *    carries a stand-in rf's envelope stating new freshness words verbatim and mints no string of its own; the observer then
 *    refuses that reading; a non-string freshness is refused at the seam.
 * THE WALK: every regular file below each judged root, at any depth, in name order; a symlink is recorded and never followed.
 * Each root has a floor below the count measured at base 282caa0 (src 115, qa 67, examples 7) and one anchor file whose token
 * must be read, so an emptied or misdirected walk reds.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only git show and git grep on the local ReactiveLensesSDK checkout,
 * 2026-10-23): at bfe1f4ac7fa097ef3883d97cda6ab70052849f55, docs/programs/harness2-reactive-evolution-2026-10-20/README.md
 * (blob 314b1e9f3870) holds the quoted lines 25, 34, 44 and 51 (line 35 by its sha256 only), and no file below src/ spells
 * SnapshotObservation, ImportBinding or a resync-required state; the same holds at origin/master 49c05483e1d0 (the checkout's
 * last fetch, 15 commits past the pin). Pi vendors none of these; a producer change is seen only when a cut re-measures the
 * roster.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every
 * pin's witness (each carries its pin id), the scan constants, the residual families with their quiet rows (RESIDUAL_ROWS) and
 * the registered test titles are held to the out-of-file roster (test/fixtures/h2-lens-notification-roster.json). OUTSIDE
 * ANCHOR: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-4nut.8): its acceptance clauses sit
 * verbatim in exactly one row label each and its trigger in row A's, every row carries one of them, its statement lists the
 * BATTERY words and the guarded outcome words, its gating sentence fences the freshness pair E1 holds and names the gating
 * packages A3 reads absent, its quote and citation equal the roster's, and the census's delivered residual statement in the
 * same row (the first notes line beginning "RESIDUALS (named, each with a pinned quiet row in a pin's controls): ", appended at
 * landing 315) names every residual family with its pin and quiet rows, equal to RESIDUAL_ROWS, so a row, a battery word, a
 * pair member, a residual family or a quiet row removed from every literal of this file and the roster still reds. Not
 * claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the bead row anchors rows, clauses and words,
 * not pins).
 * RECORDS (wb-aff9 F1: the records case could not see its own skip): the judged set, which runs first, holds the collected task
 * tree (vitest's) to the roster's titles - each once, in roster order, set to run and not inverted, itself first - so the
 * records case, or any case, deleted, renamed, set to skip or todo by a modifier or an option, or inverted reds before it would
 * have run. The last case, the records case, walks the same tree after the others: each ran, the judged set and every pin's
 * case reached its end (REACHED), and then it records its own end. A file-end judge (afterAll) holds REACHED to the cases
 * selected to run, read once from the collected tree before the first case runs (beforeEach), so a records case that skips
 * itself at run time or returns early reds after it has run; in a run where a case failed, that failure is the red and the
 * judge adds none, and a test-name filter's deselected cases are not held.
 * RESIDUALS (named families; each one's pinned quiet rows are named in RESIDUAL_ROWS, sit in its pin's controls and read quiet
 * there - A1 finds no vocabulary term, B1 reads the step READY): R-COMPOSED a vocabulary term assembled at runtime
 * (A1 composed); R-ENCODED a term spelled through an escape the walk does not decode (A1 escaped); R-GENERIC a reader keyed
 * only on the generic state words or on the plain reactive_lenses key, which Pi prose and rf provenance also spell (A1
 * genericWords, provenanceKey); R-OUTSIDE a reader below test/ or docs/, outside the judged roots (A1 testRoot, docsRoot);
 * R-ORDERED an event stating the next stream position (sequence n+1 or a matching cursor chain) applies as the ordered next
 * state and keeps the refreshed freshness, so a reader forwarding a notification with a position, or a restarted owner whose
 * counter continues, reads current until a gap (B1 orderedSequence, orderedCursor); R-REFRESH the projection trusts refresh
 * as the accepted read, so a snapshot a reader builds from a notification reads current (B1 refreshTrusted).
 * QUIET-ROW PAYLOADS (wb-sbh3 F1: a quiet row's witness kept only its reading, so its payload swapped for one that exercises no
 * mode stayed green): each quiet row records its payload, the reading its family's real reader gives that payload (A1's scan of
 * a source text, A1's walk of a planted file, a fresh ObservationProjection running a B1 journey's calls) and its family's mode
 * reading of it, read from the payload alone - R-COMPOSED the terms its string literals spell once joined, R-ENCODED the terms it
 * spells once its escapes are decoded, R-GENERIC the generic state words and the plain SDK key it spells, R-OUTSIDE the terms the
 * walk flags in its file moved below the first judged root (its own root unjudged), R-ORDERED the next stream position its final
 * notification states after the snapshot before it, R-REFRESH the notifications its final accepted snapshot follows. The judged
 * set re-reads every quiet row the roster holds from its payload: the reading and the mode must be the ones the roster records,
 * the mode non-empty; each mode reading must read its family's neutral payload (SCAN.neutralPayloads: the family's shape,
 * exercising no mode) as [], and each family's real reader must read its loud payload (SCAN.loudPayloads: the family's shape, a
 * term the scan or the walk flags, a journey the projection reads stale or never current) as loud. So a payload swapped for one
 * that exercises no mode, emptied or dropped - in the census, the roster or both - reds, as does a mode reading or a reader
 * forced to a constant.
 * PAYLOAD TABLES (wb-oxug F1: a family's neutral payload removed from both literals, or set to null in both, fed its mode reading
 * undefined or null, which every mode reading's shape guard reads as [], so the neutral end held nothing and a mode reading forced
 * constant on every string stayed green): the judged set holds the keys of SCAN.neutralPayloads and SCAN.loudPayloads to
 * RESIDUAL_FAMILIES, each family once and in order (the bead row's delivered residual statement anchors the families from outside
 * this file and the roster), and each family's real reader must read its neutral payload as one of its own shape - a source text
 * for A1's scan, a planted file for A1's walk, a journey of calls for the projection, never null - and quiet, as its quiet rows
 * read. So a payload of either table removed, set to null or swapped for another shape, a neutral payload its reader reads loud,
 * a loud payload its reader reads quiet, or a key added to either table - in the census, the roster or both - reds.
 * NOT CLAIMED: an owner restart or epoch (README.md:45) - the projection keys order on sequence and cursor only; Pi carries a
 * producer's RESYNC_REQUIRED word (row D) and detects no restart itself. Every case of this file skipped at once (a skip on the
 * outer describe, or on every case): vitest then marks the file skipped and runs none of its cases or hooks, so no judge here
 * exists. The judged set and the records case both skipped or deselected: the pins read no registration (a filtered pin run
 * stays green by design), so such a run is held only to its own selection. A guard removed together with the escape only it
 * sees (the judged set's collected-tree reading, the records case's end, the file-end judge or the selection it reads, a quiet
 * row's reader or its family's mode reading, a payload table's key hold or the neutral-end reading). A neutral payload swapped in
 * both literals for a degenerate one of its family's own shape that reads quiet (an empty source text, for one) together with
 * that family's mode reading rewritten to read [] there alone: the neutral end holds each payload's presence, shape and
 * quietness, not how nearly it exercises its family's mode.
 * Display paths added: none. Test-only: it spawns only the stand-in rf below makeScratch scratch and plants control files there.
 */
import { chmodSync, type Dirent, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { afterAll, afterEach, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type NativeRef, type NativeSnapshot, type ObservationEvent, ObservationProjection, type ObservationScope, type Presentation } from "../src/workbench/observation.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = process.cwd();
const ROSTER_FILE = "test/fixtures/h2-lens-notification-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-4nut.8";
/** The owner-unreachable and restart state words the statement names, in its order. */
const BATTERY: readonly string[] = ["STALE", "UNAVAILABLE", "WITHHELD", "RESYNC_REQUIRED"];
/** A bounded not-observed status word that is no rf status, the comparison D1 swaps each BATTERY word into. */
const CONTROL_WORD = "zz-control";
/** The closed row-freshness pair the rf reader adapter admits (context.render.schema.json freshness enum at the rf pin). */
const PINNED_FRESHNESS: readonly string[] = ["captured_at_render", "reused"];
/** The outcome words (d) forbids a new freshness word to become. */
const GUARDED_OUTCOMES: readonly string[] = ["current", "success"];
/** New row-freshness words E1 feeds the reader: the BATTERY, Pi's own outcome words, a novel word, case variants of the pair and the empty word. */
const NEW_FRESHNESS: readonly string[] = [...BATTERY, ...GUARDED_OUTCOMES, "fresh", "Reused", "CAPTURED_AT_RENDER", ""];
/** The terms a Lenses notification or owner-state reader would spell, one pattern each, so a finding names its term. The adapter
 * and route names admit no '.' or space, so the detached observer's snapshot.observation property path never trips one. */
const LENS_VOCABULARY: readonly { readonly id: string; readonly pattern: RegExp }[] = [
  { id: "snapshot-observation", pattern: /snapshot[_-]?observation/i },
  { id: "import-binding", pattern: /import[_-]?binding/i },
  { id: "push-route", pattern: /notify_?push_?updated/i },
  { id: "resync-state", pattern: /resync[\s_.-]*required/i },
  { id: "sdk-load", pattern: /vibranium-reactive-lenses|reactive[-_]lenses\/|(?:\bimport|\bfrom|-m)["'\s,]+reactive_lenses\b/ },
];
const JUDGED_ROOTS = ["src", "qa", "examples"];
/** Each floor sits below the count measured at base 282caa0 (regular files: src 115, qa 67, examples 7). */
const FLOORS: Readonly<Record<string, number>> = { src: 100, qa: 55, examples: 5 };
/** One file per judged root whose token the walk must read. */
const ANCHORS: Readonly<Record<string, { readonly file: string; readonly token: string }>> = {
  src: { file: "src/workbench/reactivefiber-observer.ts", token: "observationRowsDemotion" },
  qa: { file: "qa/workbench/smoke.sh", token: "node qa/workbench/smoke.mjs" },
  examples: { file: "examples/agent-tool-description.md", token: "{{typeList}}" },
};
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-ENCODED", "R-GENERIC", "R-OUTSIDE", "R-ORDERED", "R-REFRESH"];
interface ResidualRows {
  readonly pin: string;
  readonly controls: readonly string[];
}
/** Each residual family's pinned quiet rows: the pin whose witness controls hold them, and their control keys (wb-aff9 F2). */
const RESIDUAL_ROWS: Readonly<Record<string, ResidualRows>> = {
  "R-COMPOSED": { pin: "A1", controls: ["composed"] },
  "R-ENCODED": { pin: "A1", controls: ["escaped"] },
  "R-GENERIC": { pin: "A1", controls: ["genericWords", "provenanceKey"] },
  "R-OUTSIDE": { pin: "A1", controls: ["testRoot", "docsRoot"] },
  "R-ORDERED": { pin: "B1", controls: ["orderedSequence", "orderedCursor"] },
  "R-REFRESH": { pin: "B1", controls: ["refreshTrusted"] },
};
/** How a quiet row's reading reads on its pin: A1's scan finds no vocabulary term in it, B1's projection reads its step READY. */
const QUIET_READINGS: Readonly<Record<string, (reading: unknown) => boolean>> = {
  A1: reading => Array.isArray(reading) && reading.length === 0,
  B1: reading => isObject(reading) && reading.freshness === "current" && reading.completeness === "complete",
};
/** The Lenses SDK's Python package name as a bare key, which rf provenance also spells (sdk_versions.reactive_lenses): the key
 * R-GENERIC reads beside the generic state words. */
const PLAIN_SDK_KEY = "reactive_lenses";
/** One payload per residual family, in that family's shape, that exercises no residual mode: each family's mode reading reads its
 * own as [], so no mode reading can be a constant (wb-sbh3 F1). */
const NEUTRAL_PAYLOADS: Readonly<Record<string, JsonValue>> = {
  "R-COMPOSED": 'const name = ["Lens", "Result"].join("");\n',
  "R-ENCODED": 'const name = "\\u004censResult";\n',
  "R-GENERIC": 'if (row.status === "observed") read(row);\n',
  "R-OUTSIDE": { path: "test/reader.ts", body: "export const read = (result: LensResult) => result;\n" },
  "R-ORDERED": {
    step: "positioned snapshot",
    calls: [
      { call: "refresh", capturedAt: "2026-10-23T00:00:02Z", sequence: 7, ready: false },
      { call: "refresh", capturedAt: "2026-10-23T00:00:03Z", sequence: 8, ready: true },
    ],
  },
  "R-REFRESH": { step: "snapshot alone", calls: [{ call: "refresh", capturedAt: "2026-10-23T00:00:02Z", ready: true }] },
};
/** One payload per residual family, in that family's shape, that its real reader must read loud (a term the scan or the walk
 * flags, a journey the projection reads stale or never current), so no family's reader can be a constant (wb-sbh3 F1). */
const LOUD_PAYLOADS: Readonly<Record<string, JsonValue>> = {
  "R-COMPOSED": 'const name = "SnapshotObservation";\n',
  "R-ENCODED": 'const name = "ImportBinding";\n',
  "R-GENERIC": 'if (row.status === "RESYNC_REQUIRED") resync(row);\n',
  "R-OUTSIDE": { path: "src/reader.ts", body: "export const read = (observation: SnapshotObservation) => observation;\n" },
  "R-ORDERED": {
    step: "gapped event",
    calls: [
      { call: "refresh", capturedAt: "2026-10-23T00:00:02Z", sequence: 7, ready: false },
      { call: "ingest", id: "s9", sequence: 9, ready: true },
    ],
  },
  "R-REFRESH": { step: "notification alone", calls: [{ call: "ingest", id: "n1", ready: true }] },
};
/** The opening of the census's delivered residual statement in the bead row's notes (appended at landing 315). */
const DELIVERED_RESIDUALS = "RESIDUALS (named, each with a pinned quiet row in a pin's controls): ";
/** The typed refusal of a row freshness outside the pinned pair, as the reader adapter states it. */
const FRESHNESS_REFUSAL = "validation: ReactiveFiber topology refused: every result.observations row must state freshness captured_at_render or reused.";
/** Every scan constant, as the roster holds it. */
const SCAN = {
  battery: BATTERY,
  controlWord: CONTROL_WORD,
  pinnedFreshness: PINNED_FRESHNESS,
  guardedOutcomes: GUARDED_OUTCOMES,
  newFreshness: NEW_FRESHNESS,
  vocabulary: LENS_VOCABULARY.map(term => ({ id: term.id, pattern: `${term.pattern.source}/${term.pattern.flags}` })),
  judgedRoots: JUDGED_ROOTS,
  floors: FLOORS,
  anchors: ANCHORS,
  freshnessRefusal: FRESHNESS_REFUSAL,
  plainSdkKey: PLAIN_SDK_KEY,
  neutralPayloads: NEUTRAL_PAYLOADS,
  loudPayloads: LOUD_PAYLOADS,
};

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
      "(trigger, absent today) If Pi ever reads Lenses notification events or owner-unreachable states: no product file spells an RL-H2-01 adapter name, the resync-required state, RL's push-notification route or a Lenses SDK load, Pi's one rf channel spawns only the noncommitted render and reads one document per spawn, and the gating artifact is measured absent at the pin and the measured tip",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(a) notification then no snapshot data keeps the Pi projection dirty/pending, never READY; READY appears only after the transaction commit receipt: measured on ObservationProjection, where every Pi reader lands - a node seen only through notification events never reads current or complete, a data-less notification re-marks a refreshed node stale, and only a refresh with a captured snapshot (the accepted-snapshot analog) makes it current, in the node and in its parent's aggregate",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(b) two duplicate notifications produce at most one accepted transition (L51): the projection applies a re-delivered event id as duplicate and a re-delivered stream position as out-of-order, with no revision step and the node unchanged, and the duplicate-notification journey reaches current exactly once",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(c) battery over STALE/UNAVAILABLE/WITHHELD/RESYNC_REQUIRED: each word appears verbatim in its own row and never in another's (wb-4ap.2 shape): on the rf render path's status-word reader each word reads as a not-observed status listed verbatim in its own projection's note, partial and never success, equal to a control word's projection with the word swapped, and the four in one render are listed distinct, never collapsed",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label:
      "(d) a new freshness word on an rf envelope yields a typed refusal or verbatim carry, never 'current'/'success': the rf reader adapter refuses every row freshness outside the pinned pair with one typed CapabilityError, the native seam carries the word verbatim inside the stand-in rf's envelope and mints no string, and a non-string freshness is refused at the seam",
    pins: ["E1", "E2"],
  },
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
interface ProducerLine {
  readonly line: number;
  readonly text: string;
}
interface Producer {
  readonly repo: string;
  readonly pin: string;
  readonly tip: { readonly ref: string; readonly sha: string; readonly commitsPastPin: number };
  readonly readme: { readonly path: string; readonly blob: string; readonly lines: readonly ProducerLine[]; readonly line35Sha256: string };
  readonly pushRoute: { readonly file: string; readonly line: number; readonly name: string };
  readonly gatingNames: readonly string[];
  readonly srcFilesAtPin: Readonly<Record<string, readonly string[]>>;
  readonly srcFilesAtTip: Readonly<Record<string, readonly string[]>>;
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly residualRows: Readonly<Record<string, ResidualRows>>;
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
function integer(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function fileLists(value: unknown, field: string): Record<string, string[]> {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return Object.fromEntries(Object.entries(value).map(([name, files]) => [name, strings(files, `${field}.${name}`)]));
}
function residualRowsOf(value: unknown, field: string): Record<string, ResidualRows> {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return Object.fromEntries(
    Object.entries(value).map(([family, rows]) => {
      if (!isObject(rows)) throw new Error(`roster ${field}.${family} must be an object`);
      return [family, { pin: text(rows.pin, `${field}.${family}.pin`), controls: strings(rows.controls, `${field}.${family}.controls`) }];
    }),
  );
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  const { tip, readme, pushRoute } = producer;
  if (!isObject(tip) || !isObject(readme) || !isObject(pushRoute) || !Array.isArray(readme.lines)) throw new Error("roster producer needs tip, readme (with lines) and pushRoute");
  const lines = readme.lines.map((entry: unknown, index: number): ProducerLine => {
    if (!isObject(entry)) throw new Error(`roster producer.readme.lines[${index}] must be an object`);
    return { line: integer(entry.line, `producer.readme.lines[${index}].line`), text: text(entry.text, `producer.readme.lines[${index}].text`) };
  });
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      repo: text(producer.repo, "producer.repo"),
      pin: text(producer.pin, "producer.pin"),
      tip: { ref: text(tip.ref, "producer.tip.ref"), sha: text(tip.sha, "producer.tip.sha"), commitsPastPin: integer(tip.commitsPastPin, "producer.tip.commitsPastPin") },
      readme: { path: text(readme.path, "producer.readme.path"), blob: text(readme.blob, "producer.readme.blob"), lines, line35Sha256: text(readme.line35Sha256, "producer.readme.line35Sha256") },
      pushRoute: { file: text(pushRoute.file, "producer.pushRoute.file"), line: integer(pushRoute.line, "producer.pushRoute.line"), name: text(pushRoute.name, "producer.pushRoute.name") },
      gatingNames: strings(producer.gatingNames, "producer.gatingNames"),
      srcFilesAtPin: fileLists(producer.srcFilesAtPin, "producer.srcFilesAtPin"),
      srcFilesAtTip: fileLists(producer.srcFilesAtTip, "producer.srcFilesAtTip"),
    },
    residuals: strings(raw.residuals, "residuals"),
    residualRows: residualRowsOf(raw.residualRows, "residualRows"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerLine(line: number): string {
  const found = ROSTER.producer.readme.lines.find(entry => entry.line === line);
  if (found === undefined) throw new Error(`the roster holds no README line ${line}`);
  return found.text;
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
/** The statement's carried words ("carry W / X / ... verbatim") and guarded outcomes ("never mapped to X/Y"). */
function statementWords(notes: string): { carried: string[]; outcomes: string[] } {
  const statement = noteLine(notes, "Full statement ");
  const carried = /shall carry (.+?) verbatim, distinct, never collapsed/.exec(statement)?.[1] ?? "";
  const outcomes = /never mapped to ([a-z/]+)/.exec(statement)?.[1] ?? "";
  return { carried: carried.split(" / "), outcomes: outcomes.split("/") };
}
/** The single-quoted fragments of a note line, in order. */
const quotedFragments = (line: string): string[] => [...line.matchAll(/'([^']+)'/g)].map(found => found[1] ?? "");
/** The census's delivered residual statement: each "R-NAME (PIN control, control[: gloss])" entry before its NOT CLAIMED part. */
function deliveredResiduals(notes: string): JsonValue {
  const listed = noteLine(notes, DELIVERED_RESIDUALS).slice(DELIVERED_RESIDUALS.length).split(". NOT CLAIMED: ")[0] ?? "";
  const entries = [...listed.matchAll(/(R-[A-Z-]+) \(([A-Z]\d) ([^):]+)(?::[^)]*)?\)/g)];
  return json(Object.fromEntries(entries.map(found => [found[1] ?? "", { pin: found[2] ?? "", controls: (found[3] ?? "").split(", ") }])));
}

/** The ends this file's cases reached, in run order: the judged set's title, each pin, then the records case's title. */
const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here (as JSON, so the roster can hold it). */
function done(pin: string, witness: { readonly [key: string]: unknown }): JsonValue {
  REACHED.push(pin);
  return json({ pin, ...witness });
}

// ---- The registration (the judged set, the records case and the file-end judge) ----

const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order and every pin reached its end";
interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly inverted: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; `self` marks the case doing the reading. */
function registered(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  const visit = (children: readonly RunnerTask[]): void => {
    for (const child of children) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, inverted: child.fails === true, state: child.result?.state, self: child === self });
      else if (child.type === "suite") visit(child.tasks);
    }
  };
  visit(tasks);
  return walked;
}
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.inverted ? "+fails" : ""}`;
/** The titles selected to run, in registration order, read from the collected tree once, before the first case runs. */
const SELECTED: string[] = [];
/** The tree's tests, kept from that reading for the file-end judge (the same task objects, so their results are live). */
const FILE_TASKS: RunnerTask[] = [];

// ---- The walk (row A) ----

interface Walk {
  readonly files: readonly string[];
  readonly symlinks: readonly string[];
}
const byName = (a: Dirent, b: Dirent): number => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
/** Every regular file below `root` of `base`, at any depth and in name order; a symlink is recorded and never followed. */
function walkRoot(base: string, root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  if (!existsSync(join(base, root))) return { files, symlinks };
  const visit = (dir: string): void => {
    for (const entry of readdirSync(join(base, dir), { withFileTypes: true }).sort(byName)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isSymbolicLink()) symlinks.push(path);
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(path);
    }
  };
  visit(root);
  return { files, symlinks };
}
/** The vocabulary terms a text spells, in LENS_VOCABULARY order. */
const termsIn = (source: string): string[] => LENS_VOCABULARY.filter(term => term.pattern.test(source)).map(term => term.id);
interface Tree {
  readonly walks: Readonly<Record<string, Walk>>;
  readonly findings: readonly string[];
  readonly symlinks: readonly string[];
}
/** The judged roots of `base`, each file read as UTF-8 and judged against the vocabulary. */
function treeOf(base: string): Tree {
  const walks: Record<string, Walk> = {};
  const findings: string[] = [];
  for (const root of JUDGED_ROOTS) {
    const walk = walkRoot(base, root);
    walks[root] = walk;
    for (const file of walk.files) for (const term of termsIn(readFileSync(join(base, file), "utf8"))) findings.push(`${file}:${term}`);
  }
  return { walks, findings, symlinks: JUDGED_ROOTS.flatMap(root => walks[root]?.symlinks ?? []) };
}

const scratches: string[] = [];
const oldPath = process.env.PATH;
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
/** A scratch tree holding `files`, judged as the live tree is. */
function plantedTree(files: Readonly<Record<string, string>>): Tree {
  const base = makeScratch("h2-lens-notification-tree-");
  scratches.push(base);
  for (const [path, body] of Object.entries(files)) {
    mkdirSync(dirname(join(base, path)), { recursive: true });
    writeFileSync(join(base, path), body);
  }
  return treeOf(base);
}

// ---- The rf channel (rows A, D and E) ----

let nativeCatalog: Promise<JsonObject[]> | undefined;
/** The native registration's reactivefiber descriptors, loaded once, as id, effect class, modes and permissions. */
function rfDescriptors(): Promise<JsonObject[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry
      .catalogSnapshot()
      .map(entry => entry.descriptor)
      .filter(descriptor => descriptor.id.startsWith("reactivefiber"))
      .map(descriptor => json({ id: descriptor.id, effectClass: descriptor.effectClass, supportedModes: descriptor.supportedModes, permissions: descriptor.permissions }) as JsonObject);
  });
  return nativeCatalog;
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `stdout` and exits 0. */
function standInRf(stdout: string): string {
  const folder = makeScratch("h2-lens-notification-rf-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(script, `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(${JSON.stringify(stdout)});\nprocess.exit(0);\n`);
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
/** Each spawn's argv, with the workspace root written as a placeholder. */
function spawnsOf(log: string): string[][] {
  if (!existsSync(log)) return [];
  return readFileSync(log, "utf8")
    .split("\n")
    .filter(Boolean)
    .map(line => (JSON.parse(line) as string[]).map(arg => (arg === ROOT ? "<workspace>" : arg)));
}
/** A refusal as category and message, or the word "projected" when the call returned. */
async function outcome(run: () => unknown): Promise<string> {
  try {
    await run();
    return "projected";
  } catch (error) {
    return error instanceof CapabilityError ? `${error.category}: ${error.message}` : `other: ${String(error)}`;
  }
}
function objectOf(value: Json | JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value as JsonObject;
}
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
interface ObservationRow {
  readonly status: string;
  readonly freshness: Json;
  readonly replayed: boolean;
}
const row = (status: string, freshness: Json = "captured_at_render", replayed = false): ObservationRow => ({ status, freshness, replayed });
/** The full-shape clean render with its observation rows replaced by `rows`. */
function renderWithRows(rows: readonly ObservationRow[]): JsonObject {
  const envelope = fullShapeRf(ROOT);
  return { ...envelope, result: { ...objectOf(envelope.result, "fullShapeRf result"), observations: rows.map(entry => ({ ...entry })) } };
}
const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
function topologyOf(source: JsonObject): ReturnType<typeof reactivefiberTopology> {
  const reading: JsonValue = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
  return reactivefiberTopology(reading, OBSERVER_CONTEXT);
}
interface Projected {
  readonly coverage: string;
  readonly tone: string;
  readonly note: string;
  readonly battery: readonly string[];
}
/** What a render's projection states about its observation rows: coverage, tone, the observations note and the BATTERY words its strings carry. */
function projectedRows(rows: readonly ObservationRow[]): Projected {
  const topology = topologyOf(renderWithRows(rows));
  const snapshot = topology.snapshots[0];
  const strings = stringLeaves(json(topology));
  return {
    coverage: snapshot?.coverage ?? "none",
    tone: snapshot?.node.statusTone ?? "none",
    note: topology.diagnostics.find(note => note.startsWith("observations:")) ?? "none",
    battery: BATTERY.filter(word => strings.some(entry => entry.includes(word))),
  };
}

// ---- The projection (rows B and C) ----

const SCOPE: ObservationScope = { workspace: "/fixture/lens-workspace", principal: "local-operator:tester" };
const INVOCATION = "lens-invocation";
const LENS: NativeRef = { provider: "lens-fixture", type: "lens-result", id: "lens-1" };
const READY: Presentation = { title: "lens result", type: "sdk-operation", statusText: "READY", statusTone: "success" };
const ACCEPTED: Presentation = { title: "lens result", type: "sdk-operation", statusText: "accepted owner snapshot", statusTone: "success" };
/** A notification event of `ref`: no snapshot data unless `extra` states a presentation. */
function notice(id: string, extra: Partial<ObservationEvent> = {}, ref: NativeRef = LENS): ObservationEvent {
  return { projectionEventId: id, source: ref, scope: SCOPE, observedAt: "2026-10-23T00:00:01Z", kind: "lens.notification", trace: { invocationId: INVOCATION }, ...extra };
}
/** The accepted owner snapshot of `ref`, captured at `capturedAt`. */
function snapshotAt(capturedAt: string, extra: Partial<NativeSnapshot> = {}, ref: NativeRef = LENS): NativeSnapshot {
  return { source: ref, scope: SCOPE, capturedAt, observedAt: capturedAt, coverage: "complete", node: ACCEPTED, kind: "lens.snapshot", trace: { invocationId: INVOCATION }, ...extra };
}
interface Step {
  readonly step: string;
  readonly result: string;
  readonly freshness: string;
  readonly completeness: string;
  readonly statusText: string;
}
/** The node of `ref` after one call, as the step's record; "absent" when the projection holds no node. */
function stepOf(projection: ObservationProjection, step: string, result: string, ref: NativeRef = LENS): Step {
  const node = projection.query({ scope: SCOPE, limit: 1, ref }).nodes[0];
  return { step, result, freshness: node?.freshness ?? "absent", completeness: node?.completeness ?? "absent", statusText: node?.presentation.statusText ?? "absent" };
}
const revisionOf = (projection: ObservationProjection): number => projection.window({ scope: SCOPE, invocationId: INVOCATION, offset: 0, limit: 10 }).revision;
/** Pi's READY: a node whose freshness reads current with its completeness complete. */
const ready = (step: Step): boolean => step.freshness === "current" && step.completeness === "complete";
/** How many steps move the node into current, and how many change its presented value. */
function transitions(steps: readonly Step[]): { toCurrent: number; valueChanges: number } {
  let toCurrent = 0;
  let valueChanges = 0;
  steps.forEach((step, index) => {
    const before = steps[index - 1];
    if (step.freshness === "current" && before?.freshness !== "current") toCurrent += 1;
    if (before !== undefined && step.statusText !== before.statusText) valueChanges += 1;
  });
  return { toCurrent, valueChanges };
}

// ---- The quiet rows (wb-sbh3 F1): each records its payload, its family's real reading of it and its family's mode reading ----

/** A file planted in a scratch tree: its path and its body. */
interface Plant {
  readonly path: string;
  readonly body: string;
}
/** One call a B1 journey makes on a fresh projection: an accepted snapshot captured at `capturedAt`, or a notification event `id`,
 * each with the stream position it states and whether it presents READY. */
type Call =
  | { readonly call: "refresh"; readonly capturedAt: string; readonly sequence?: number; readonly cursor?: string; readonly ready: boolean }
  | { readonly call: "ingest"; readonly id: string; readonly sequence?: number; readonly cursor?: string; readonly previousCursor?: string; readonly ready: boolean };
/** A B1 quiet row's payload: the step it records and the calls on a fresh projection that lead there. */
interface Journey {
  readonly step: string;
  readonly calls: readonly Call[];
}
const integerOrNone = (value: unknown): number | undefined => (typeof value === "number" && Number.isSafeInteger(value) ? value : undefined);
const textOrNone = (value: unknown): string | undefined => (typeof value === "string" ? value : undefined);
/** A planted file read back from a payload, or undefined when the payload is none. */
function plantOf(value: unknown): Plant | undefined {
  return isObject(value) && typeof value.path === "string" && typeof value.body === "string" ? { path: value.path, body: value.body } : undefined;
}
/** A B1 journey read back from a payload, or undefined when it or any of its calls is malformed. */
function journeyOf(value: unknown): Journey | undefined {
  if (!isObject(value) || typeof value.step !== "string" || !Array.isArray(value.calls)) return undefined;
  const calls: Call[] = [];
  for (const entry of value.calls) {
    if (!isObject(entry) || typeof entry.ready !== "boolean") return undefined;
    const position = { sequence: integerOrNone(entry.sequence), cursor: textOrNone(entry.cursor) };
    if (entry.call === "refresh" && typeof entry.capturedAt === "string") calls.push({ call: "refresh", capturedAt: entry.capturedAt, ...position, ready: entry.ready });
    else if (entry.call === "ingest" && typeof entry.id === "string") calls.push({ call: "ingest", id: entry.id, ...position, previousCursor: textOrNone(entry.previousCursor), ready: entry.ready });
    else return undefined;
  }
  return { step: value.step, calls };
}
/** `fields` without its undefined members, so a call states only the positions its journey gives. */
function stated<T extends Record<string, string | number | undefined>>(fields: T): Partial<T> {
  return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined)) as Partial<T>;
}
/** A B1 journey run on a fresh projection: the node after its final call, as the step's record. */
function runJourney(journey: Journey): Step {
  const projection = new ObservationProjection();
  let result = "no call";
  for (const entry of journey.calls) {
    if (entry.call === "refresh") result = projection.refresh(snapshotAt(entry.capturedAt, { ...stated({ sequence: entry.sequence, cursor: entry.cursor }), ...(entry.ready ? { node: READY } : {}) }));
    else result = projection.ingest(notice(entry.id, { ...stated({ sourceSequence: entry.sequence, sourceCursor: entry.cursor, previousCursor: entry.previousCursor }), ...(entry.ready ? { node: { presentation: READY } } : {}) }));
  }
  return stepOf(projection, journey.step, result);
}
/** The vocabulary terms A1's walk flags in one file planted alone at `path` of a scratch tree. */
function walkedTerms(path: string, body: string): string[] {
  return plantedTree({ [path]: body })
    .findings.filter(finding => finding.startsWith(`${path}:`))
    .map(finding => finding.slice(path.length + 1));
}
/** A source text's reading: A1's scan of it; a payload that is no source text reads null. */
const scanned = (payload: unknown): JsonValue => (typeof payload === "string" ? termsIn(payload) : null);
/** A planted file's reading: A1's walk of a scratch tree holding it alone; a payload that is no plant reads null. */
const walked = (payload: unknown): JsonValue => {
  const plant = plantOf(payload);
  return plant === undefined ? null : walkedTerms(plant.path, plant.body);
};
/** A journey's reading: the node after its calls on a fresh projection; a payload that is no journey reads null. */
const journeyed = (payload: unknown): JsonValue => {
  const journey = journeyOf(payload);
  return journey === undefined ? null : json(runJourney(journey));
};
/** Each residual family's real reader over a quiet row's payload. */
const QUIET_READERS: Readonly<Record<string, (payload: unknown) => JsonValue>> = {
  "R-COMPOSED": scanned,
  "R-ENCODED": scanned,
  "R-GENERIC": scanned,
  "R-OUTSIDE": walked,
  "R-ORDERED": journeyed,
  "R-REFRESH": journeyed,
};
/** The double- or single-quoted string literals of a source text, in order, each body as written. */
const literalsOf = (source: string): string[] => [...source.matchAll(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'/g)].map(found => found[1] ?? found[2] ?? "");
/** A source text with its \u{X...}, \uXXXX and \xXX escapes decoded; an escape naming no code point stays as written. */
const decoded = (source: string): string =>
  source.replace(/\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g, (written: string, braced?: string, four?: string, two?: string) => {
    const point = Number.parseInt(braced ?? four ?? two ?? "", 16);
    return Number.isInteger(point) && point <= 0x10ffff ? String.fromCodePoint(point) : written;
  });
/** The keys R-GENERIC reads: the BATTERY words no vocabulary term reads (the generic state words), then the plain SDK key. */
const genericKeys = (): string[] => [...BATTERY.filter(word => termsIn(word).length === 0), PLAIN_SDK_KEY];
/** Each residual family's mode reading: what in a quiet row's payload exercises the family's residual mode, read from the payload
 * alone; a payload that exercises none reads []. */
const MODE_READINGS: Readonly<Record<string, (payload: unknown) => string[]>> = {
  "R-COMPOSED": payload => (typeof payload === "string" ? termsIn(literalsOf(payload).join("")) : []),
  "R-ENCODED": payload => (typeof payload === "string" ? termsIn(decoded(payload)) : []),
  "R-GENERIC": payload => (typeof payload === "string" ? genericKeys().filter(key => new RegExp(`\\b${key}\\b`).test(payload)) : []),
  "R-OUTSIDE": payload => {
    const plant = plantOf(payload);
    return plant === undefined || JUDGED_ROOTS.includes(plant.path.split("/")[0] ?? "") ? [] : walkedTerms(`${JUDGED_ROOTS[0]}/${plant.path}`, plant.body);
  },
  "R-ORDERED": payload => {
    const calls = journeyOf(payload)?.calls ?? [];
    const snapshot = calls.at(-2);
    const event = calls.at(-1);
    if (snapshot?.call !== "refresh" || event?.call !== "ingest") return [];
    const positions: string[] = [];
    if (snapshot.sequence !== undefined && event.sequence === snapshot.sequence + 1) positions.push(`sequence ${snapshot.sequence} -> ${event.sequence}`);
    if (snapshot.cursor !== undefined && event.previousCursor === snapshot.cursor && event.cursor !== undefined && event.cursor !== snapshot.cursor) positions.push(`cursor ${snapshot.cursor} -> ${event.cursor}`);
    return positions;
  },
  "R-REFRESH": payload => {
    const calls = journeyOf(payload)?.calls ?? [];
    const notices = calls.slice(0, -1).flatMap(entry => (entry.call === "ingest" ? [`notification ${entry.id}`] : []));
    return calls.at(-1)?.call === "refresh" && notices.length > 0 && notices.length === calls.length - 1 ? notices : [];
  },
};
/** The residual family whose quiet rows name `control` (RESIDUAL_ROWS). */
const familyOf = (control: string): string => Object.entries(RESIDUAL_ROWS).find(([, rows]) => rows.controls.includes(control))?.[0] ?? "none";
/** A quiet row as its pin records it: its payload, its family's real reading of that payload (or the reading the pin took from
 * a shared tree) and its family's mode reading of it. */
function quietRow(control: string, payload: unknown, reading?: JsonValue): JsonValue {
  const family = familyOf(control);
  return json({ payload, reading: reading ?? QUIET_READERS[family]?.(payload) ?? null, mode: MODE_READINGS[family]?.(payload) ?? [] });
}
/** A quiet row's recorded reading, or undefined when the row carries none. */
const readingOf = (entry: unknown): unknown => (isObject(entry) ? entry.reading : undefined);

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue | Promise<JsonValue>>> = {
  A1: () => {
    const tree = treeOf(REPO);
    const floorsMet = Object.fromEntries(JUDGED_ROOTS.map(root => [root, (tree.walks[root]?.files.length ?? 0) >= (FLOORS[root] ?? Number.POSITIVE_INFINITY)]));
    const anchorsRead = Object.fromEntries(
      JUDGED_ROOTS.map(root => {
        const anchor = ANCHORS[root];
        return [root, anchor !== undefined && (tree.walks[root]?.files.includes(anchor.file) ?? false) && readFileSync(join(REPO, anchor.file), "utf8").includes(anchor.token)];
      }),
    );
    expect(floorsMet, `files walked: ${JUDGED_ROOTS.map(root => `${root} ${tree.walks[root]?.files.length ?? 0}`).join(", ")}`).toStrictEqual({ src: true, qa: true, examples: true });
    expect(anchorsRead, "each judged root's anchor file was walked and its token read").toStrictEqual({ src: true, qa: true, examples: true });
    expect({ findings: tree.findings, symlinks: tree.symlinks }, "product files spelling a Lenses notification or owner-state term").toStrictEqual({ findings: [], symlinks: [] });
    const plants: Readonly<Record<string, string>> = {
      "src/reader.ts": "export const read = (observation: SnapshotObservation) => observation;\n",
      "qa/reader.sh": "python3 -m reactive_lenses watch --json\n",
      "examples/notes.md": "the owner state reads Resync Required after a restart\n",
      "test/reader.ts": "export const read = (observation: SnapshotObservation) => observation;\n",
      "docs/reader.md": "Pi reads ImportBinding records.\n",
      "src/quiet.ts": "// a snapshot observation of a detached run\nexport const lenses = provenance.sdk_versions.reactive_lenses;\n",
    };
    const planted = plantedTree(plants);
    const flagged = (path: string): string[] => planted.findings.filter(finding => finding.startsWith(`${path}:`)).map(finding => finding.slice(path.length + 1));
    // R-OUTSIDE's quiet rows: the planted file is the payload, read by this tree's walk (wb-sbh3 F1).
    const outside = (control: string, path: string): JsonValue => quietRow(control, { path, body: plants[path] ?? null }, flagged(path));
    const controls = {
      pascalAdapter: termsIn("export type Read = (value: SnapshotObservation) => void;\n"),
      camelAdapter: termsIn("const snapshotObservation = read(lens);\n"),
      upperAdapter: termsIn('const KIND = "SNAPSHOT_OBSERVATION";\n'),
      snakeAdapter: termsIn('const binding = record["import_binding"];\n'),
      pascalBinding: termsIn("let binding: ImportBinding | undefined;\n"),
      camelBinding: termsIn("const importBinding = bindingOf(lens);\n"),
      pushRoute: termsIn("bridge.notify_push_updated(lens);\n"),
      camelRoute: termsIn("bridge.notifyPushUpdated(lens);\n"),
      stateUpper: termsIn('if (state === "RESYNC_REQUIRED") resync();\n'),
      stateKebab: termsIn("the reader shows resync-required\n"),
      stateSpaced: termsIn("Resync Required\n"),
      stateCamel: termsIn("if (state.resyncRequired) resync();\n"),
      distribution: termsIn('"vibranium-reactive-lenses": "0.1.0"\n'),
      scopedPackage: termsIn('import { lens } from "@reactive-lenses/sdk";\n'),
      vendoredPath: termsIn('import { Bridge } from "../vendor/reactive_lenses/bridge.js";\n'),
      siblingCheckout: termsIn('spawn("python3", ["../ReactiveLensesSDK/src/reactive_lenses/bridge.py"]);\n'),
      pythonModule: termsIn('spawn("python3", ["-m", "reactive_lenses"]);\n'),
      pythonFrom: termsIn("from reactive_lenses.bridge import Bridge\n"),
      propertyPath: termsIn("const observed = snapshot.observation;\n"),
      prose: termsIn("a snapshot observation of the detached run\n"),
      composed: quietRow("composed", 'const name = ["Snapshot", "Observation"].join("");\n'),
      escaped: quietRow("escaped", 'const name = "\\u0053napshotObservation";\n'),
      genericWords: quietRow("genericWords", 'if (row.status === "WITHHELD" || row.status === "STALE" || row.status === "UNAVAILABLE") read(row);\n'),
      provenanceKey: quietRow("provenanceKey", "const lenses = provenance.sdk_versions.reactive_lenses;\n"),
      plantedSrc: flagged("src/reader.ts"),
      plantedQa: flagged("qa/reader.sh"),
      plantedExamples: flagged("examples/notes.md"),
      testRoot: outside("testRoot", "test/reader.ts"),
      docsRoot: outside("docsRoot", "docs/reader.md"),
      quietSrc: flagged("src/quiet.ts"),
    };
    return done("A1", { floorsMet, anchorsRead, findings: [...tree.findings], symlinks: [...tree.symlinks], controls });
  },
  A2: async () => {
    const descriptors = await rfDescriptors();
    const clean = JSON.stringify(fullShapeRf(ROOT));
    const legacyLog = standInRf(clean);
    const legacy = await outcome(() => nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT));
    const viewLog = standInRf(clean);
    const view = await outcome(() => nativeReactiveFiberRender({ view: "lens.view", taskId: "task-1" }, ROOT));
    const streamLog = standInRf(`${JSON.stringify({ event: "notification", lens: "lens-1", position: 1 })}\n${clean}\n`);
    const stream = await outcome(() => nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT));
    const spawns = { legacy: spawnsOf(legacyLog), view: spawnsOf(viewLog), stream: spawnsOf(streamLog) };
    expect(descriptors.map(descriptor => descriptor.id), "the native catalog's reactivefiber descriptors").toEqual(["reactivefiber.render.preview"]);
    expect([legacy, view], "each input arm reads the one envelope its spawn prints").toEqual(["projected", "projected"]);
    expect(stream, "a notification line before the envelope is no single document").toBe("transport: RF preview returned malformed JSON.");
    expect([spawns.legacy.length, spawns.view.length, spawns.stream.length], "one spawn per call").toEqual([1, 1, 1]);
    expect(
      Object.values(spawns).every(runs => runs.every(argv => argv.slice(2, 4).join(" ") === "context render" && argv.slice(-3).join(" ") === "--no-commit --no-input --json")),
      "every spawn is the noncommitted context render",
    ).toBe(true);
    return done("A2", { descriptors, legacy, view, stream, spawns });
  },
  A3: () => {
    const bead = readBeadRow();
    const gating = noteLine(bead.notes, "Gating artifact: ");
    const { producer } = ROSTER;
    const absentAtPin = Object.entries(producer.srcFilesAtPin).filter(([, files]) => files.length > 0).map(([name]) => name);
    const absentAtTip = Object.entries(producer.srcFilesAtTip).filter(([, files]) => files.length > 0).map(([name]) => name);
    const gatingSays = {
      adapters: gating.includes("RL-H2-01") && gating.includes("(L34)"),
      states: gating.includes("RL-H2-02") && gating.includes("(L35)"),
      unshipped: gating.includes("Shipped: no."),
      namesSpelled: producer.gatingNames.every(name => gating.includes(name)),
    };
    const searched = {
      atPin: Object.keys(producer.srcFilesAtPin),
      atTip: Object.keys(producer.srcFilesAtTip),
    };
    // The vocabulary reads every name the gating sentence spells, and the README's RL-H2-01 row names both adapters.
    const vocabularyCovers = producer.gatingNames.map(name => ({ name, terms: termsIn(name) }));
    const line34NamesAdapters = ["SnapshotObservation", "ImportBinding"].every(name => producerLine(34).includes(name)) && producerLine(34).includes("RL-H2-01");
    expect(absentAtPin, "RL src files spelling a gating name at the pin").toEqual([]);
    expect(absentAtTip, "RL src files spelling a gating name at the measured tip").toEqual([]);
    expect(gatingSays, "the bead row's gating sentence").toStrictEqual({ adapters: true, states: true, unshipped: true, namesSpelled: true });
    expect(searched.atPin, "every gating name was searched at the pin").toEqual(producer.gatingNames);
    expect(searched.atTip, "every gating name was searched at the tip").toEqual(producer.gatingNames);
    expect(vocabularyCovers.every(entry => entry.terms.length === 1), "each gating name trips exactly one vocabulary term").toBe(true);
    expect(line34NamesAdapters, "README.md:34 is the RL-H2-01 row naming both adapters").toBe(true);
    return done("A3", {
      producerPin: producer.pin,
      tip: producer.tip,
      readmeBlob: producer.readme.blob,
      pushRoute: producer.pushRoute,
      gatingSays,
      searched,
      absentAtPin,
      absentAtTip,
      vocabularyCovers,
      line34NamesAdapters,
    });
  },
  B1: () => {
    const fresh = new ObservationProjection();
    const firstBare = stepOf(fresh, "notification, no snapshot data", fresh.ingest(notice("n1")));
    const second = new ObservationProjection();
    const firstReady = stepOf(second, "notification stating READY", second.ingest(notice("n1", { node: { presentation: READY } })));
    const projection = new ObservationProjection();
    const journey: Step[] = [];
    journey.push(stepOf(projection, "accepted snapshot", projection.refresh(snapshotAt("2026-10-23T00:00:02Z"))));
    journey.push(stepOf(projection, "notification after the snapshot", projection.ingest(notice("n2"))));
    journey.push(stepOf(projection, "notification stating READY after it", projection.ingest(notice("n3", { node: { presentation: READY } }))));
    journey.push(stepOf(projection, "accepted snapshot again", projection.refresh(snapshotAt("2026-10-23T00:00:03Z"))));
    expect([firstBare, firstReady].map(ready), "a node seen only through notifications is never READY").toEqual([false, false]);
    expect([firstBare.freshness, firstReady.freshness, firstBare.completeness, firstReady.completeness], "Pi's own fields never claim the notification").toEqual(["unknown", "unknown", "unknown", "unknown"]);
    expect(journey.map(ready), "READY only after each accepted snapshot").toEqual([true, false, false, true]);
    expect([journey[1]?.freshness, journey[2]?.freshness, journey[2]?.statusText], "a notification after the snapshot marks it stale and keeps its value").toEqual(["stale", "stale", "accepted owner snapshot"]);
    // The quiet rows: each a journey of calls on a fresh projection, recorded with its payload (wb-sbh3 F1).
    // R-ORDERED: an event stating the next position applies as the ordered next state and keeps the refreshed freshness.
    const positioned: Journey = {
      step: "positioned event",
      calls: [
        { call: "refresh", capturedAt: "2026-10-23T00:00:02Z", sequence: 7, ready: false },
        { call: "ingest", id: "s8", sequence: 8, ready: true },
      ],
    };
    const chained: Journey = {
      step: "chained event",
      calls: [
        { call: "refresh", capturedAt: "2026-10-23T00:00:02Z", cursor: "c7", ready: false },
        { call: "ingest", id: "c8", previousCursor: "c7", cursor: "c8", ready: true },
      ],
    };
    // R-REFRESH: the projection trusts refresh as the accepted read, whatever the snapshot was built from.
    const trusting: Journey = {
      step: "snapshot built from a notification",
      calls: [
        { call: "ingest", id: "n1", ready: false },
        { call: "refresh", capturedAt: "2026-10-23T00:00:02Z", ready: true },
      ],
    };
    const controls = { orderedSequence: quietRow("orderedSequence", positioned), orderedCursor: quietRow("orderedCursor", chained), refreshTrusted: quietRow("refreshTrusted", trusting) };
    return done("B1", { firstBare, firstReady, journey, controls });
  },
  B2: () => {
    const projection = new ObservationProjection();
    const parent: NativeRef = { provider: "lens-fixture", type: "lens-group", id: "group-1" };
    projection.refresh(snapshotAt("2026-10-23T00:00:00Z", { node: { title: "lens group", type: "group", statusText: "group", statusTone: "success" } }, parent));
    projection.relate({ scope: SCOPE, from: parent, to: LENS, kind: "grouping", provenance: { source: "lens-fixture" } });
    const parentKey = projection.query({ scope: SCOPE, limit: 1, ref: parent }).nodes[0]?.key ?? "";
    const view = (step: string): JsonObject => {
      const aggregate = projection.aggregate({ scope: SCOPE, key: parentKey });
      return { step, counted: aggregate?.descendants.counted ?? -1, stale: aggregate?.descendants.stale ?? -1, success: aggregate?.descendants.byTone.success ?? -1 };
    };
    const steps: JsonObject[] = [view("child unobserved")];
    projection.ingest(notice("n1", { node: { presentation: READY } }));
    steps.push(view("notification stating READY"));
    projection.refresh(snapshotAt("2026-10-23T00:00:02Z"));
    steps.push(view("accepted snapshot"));
    projection.ingest(notice("n2"));
    steps.push(view("notification after the snapshot"));
    projection.refresh(snapshotAt("2026-10-23T00:00:03Z"));
    steps.push(view("accepted snapshot again"));
    expect(steps.map(step => step.stale), "the parent's aggregate counts the child stale until each accepted snapshot").toEqual([1, 1, 0, 1, 0]);
    expect(steps.map(step => step.counted), "one counted child throughout").toEqual([1, 1, 1, 1, 1]);
    return done("B2", { steps });
  },
  C1: () => {
    const unsequenced = new ObservationProjection();
    const first = unsequenced.ingest(notice("n1"));
    const before = { revision: revisionOf(unsequenced), node: json(unsequenced.query({ scope: SCOPE, limit: 1, ref: LENS }).nodes[0]) };
    const again = unsequenced.ingest(notice("n1"));
    const after = { revision: revisionOf(unsequenced), node: json(unsequenced.query({ scope: SCOPE, limit: 1, ref: LENS }).nodes[0]) };
    const sequenced = new ObservationProjection();
    sequenced.refresh(snapshotAt("2026-10-23T00:00:02Z", { sequence: 7 }));
    const next = sequenced.ingest(notice("s8", { sourceSequence: 8 }));
    const sequencedBefore = { revision: revisionOf(sequenced), node: json(sequenced.query({ scope: SCOPE, limit: 1, ref: LENS }).nodes[0]) };
    const redelivered = sequenced.ingest(notice("s8", { sourceSequence: 8 }));
    const samePosition = sequenced.ingest(notice("s8-again", { sourceSequence: 8 }));
    const sequencedAfter = { revision: revisionOf(sequenced), node: json(sequenced.query({ scope: SCOPE, limit: 1, ref: LENS }).nodes[0]) };
    expect([first, again, next, redelivered, samePosition], "one applied delivery per notification").toEqual(["applied", "duplicate", "applied", "duplicate", "out-of-order"]);
    expect(after, "a re-delivered id changes nothing").toStrictEqual(before);
    expect(sequencedAfter, "a re-delivered id or position changes nothing").toStrictEqual(sequencedBefore);
    return done("C1", {
      unsequenced: { results: [first, again], revisionStep: after.revision - before.revision, unchanged: JSON.stringify(after.node) === JSON.stringify(before.node) },
      sequenced: {
        results: [next, redelivered, samePosition],
        revisionStep: sequencedAfter.revision - sequencedBefore.revision,
        unchanged: JSON.stringify(sequencedAfter.node) === JSON.stringify(sequencedBefore.node),
      },
    });
  },
  C2: () => {
    const journey = (ids: readonly string[], snapshot: boolean): { results: string[]; transitions: { toCurrent: number; valueChanges: number } } => {
      const projection = new ObservationProjection();
      const steps: Step[] = [stepOf(projection, "accepted snapshot, revision 7", projection.refresh(snapshotAt("2026-10-23T00:00:02Z", { sourceRevision: "7" })))];
      for (const id of ids) steps.push(stepOf(projection, `notification ${id}`, projection.ingest(notice(id))));
      if (snapshot) steps.push(stepOf(projection, "accepted snapshot", projection.refresh(snapshotAt("2026-10-23T00:00:03Z", { sourceRevision: "8", node: { ...ACCEPTED, statusText: "accepted owner snapshot 8" } }))));
      return { results: steps.map(step => step.result), transitions: transitions(steps.slice(1)) };
    };
    const duplicateIds = journey(["n1", "n1"], true);
    const distinctIds = journey(["n1", "n2"], true);
    const withoutSnapshot = journey(["n1", "n1"], false);
    expect([duplicateIds.transitions, distinctIds.transitions], "the journey reaches current once, through the snapshot").toStrictEqual([
      { toCurrent: 1, valueChanges: 1 },
      { toCurrent: 1, valueChanges: 1 },
    ]);
    expect(withoutSnapshot.transitions, "notifications alone never reach current nor change the value").toStrictEqual({ toCurrent: 0, valueChanges: 0 });
    return done("C2", { duplicateIds, distinctIds, withoutSnapshot });
  },
  D1: () => {
    const control = projectedRows([row(CONTROL_WORD)]);
    const controlTopology = JSON.stringify(json(topologyOf(renderWithRows([row(CONTROL_WORD)]))));
    const words = BATTERY.map(word => {
      const projected = projectedRows([row(word)]);
      const swapped = JSON.parse(controlTopology.split(CONTROL_WORD).join(word)) as JsonValue;
      return { word, ...projected, swappedEqual: JSON.stringify(json(topologyOf(renderWithRows([row(word)])))) === JSON.stringify(swapped) };
    });
    const clean = projectedRows([row("observed")]);
    expect(
      words.map(entry => entry.battery),
      "each word in its own row's projection and never in another's",
    ).toEqual(BATTERY.map(word => [word]));
    expect(words.map(entry => `${entry.coverage}/${entry.tone}`), "partial, never success").toEqual(BATTERY.map(() => "partial/unknown"));
    expect(words.map(entry => entry.note), "the note lists the word verbatim").toEqual(BATTERY.map(word => `observations: 1 row, 1 not observed (${word}): partial`));
    expect(words.every(entry => entry.swappedEqual), "each word's projection is the control word's with the word swapped").toBe(true);
    expect([control.battery, clean.battery, `${clean.coverage}/${clean.tone}`], "the control and the clean render carry no BATTERY word").toEqual([[], [], "complete/success"]);
    return done("D1", { words, control, clean });
  },
  D2: () => {
    const together = projectedRows(BATTERY.map(word => row(word)));
    const reversed = projectedRows([...BATTERY].reverse().map(word => row(word)));
    const repeated = projectedRows([...BATTERY, ...BATTERY].map(word => row(word)));
    const bounded = projectedRows([...BATTERY, CONTROL_WORD].map(word => row(word)));
    const listed = (note: string): string[] => /\(([^)]*)\): partial$/.exec(note)?.[1]?.split(", ") ?? [];
    expect(listed(together.note), "the four listed distinct, verbatim, in row order").toEqual([...BATTERY]);
    expect(listed(reversed.note), "row order, never a sorted or merged list").toEqual([...BATTERY].reverse());
    expect(listed(repeated.note), "a repeated word listed once").toEqual([...BATTERY]);
    expect(listed(bounded.note).slice(0, BATTERY.length), "a fifth word keeps the four and marks the bound").toEqual([...BATTERY]);
    expect([together, reversed, repeated, bounded].map(entry => `${entry.coverage}/${entry.tone}`), "partial, never success").toEqual(["partial/unknown", "partial/unknown", "partial/unknown", "partial/unknown"]);
    return done("D2", { together, reversed, repeated, bounded });
  },
  E1: async () => {
    const refusals: JsonObject = {};
    for (const word of NEW_FRESHNESS) refusals[word] = await outcome(() => topologyOf(renderWithRows([row("observed", word)])));
    const pair = {
      captured_at_render: projectedRows([row("observed", "captured_at_render", false)]),
      reused: projectedRows([row("observed", "reused", true)]),
    };
    expect(
      Object.values(refusals).every(entry => entry === FRESHNESS_REFUSAL),
      "every new freshness word is the one typed refusal",
    ).toBe(true);
    expect(Object.keys(refusals), "every new word was fed").toEqual([...NEW_FRESHNESS]);
    expect([`${pair.captured_at_render.coverage}/${pair.captured_at_render.tone}`, `${pair.reused.coverage}/${pair.reused.tone}`], "the pinned pair projects").toEqual(["complete/success", "partial/unknown"]);
    return done("E1", { refusals, pair });
  },
  E2: async () => {
    const envelope = renderWithRows([row("observed", "RESYNC_REQUIRED"), row("observed", "current")]);
    standInRf(JSON.stringify(envelope));
    const reading = objectOf((await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT)) as JsonValue, "reading");
    const carried = JSON.stringify(reading) === JSON.stringify({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
    const expected = new Set([...stringLeaves(envelope), REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, ROOT]);
    const minted = stringLeaves(reading).filter(entry => !expected.has(entry));
    const rows = objectOf(objectOf(reading.source, "reading source").result, "reading result").observations;
    const freshness = Array.isArray(rows) ? rows.map(entry => objectOf(entry, "row").freshness ?? null) : [];
    const observer = await outcome(() => reactivefiberTopology(reading, OBSERVER_CONTEXT));
    standInRf(JSON.stringify(renderWithRows([row("observed", null)])));
    const nonString = await outcome(() => nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT));
    expect(carried, "the seam carries the stand-in's envelope verbatim").toBe(true);
    expect(minted, "strings the seam added to the envelope").toEqual([]);
    expect(freshness, "the freshness words, as the producer wrote them").toEqual(["RESYNC_REQUIRED", "current"]);
    expect(observer, "the observer refuses the carried reading").toBe(FRESHNESS_REFUSAL);
    expect(nonString, "a non-string freshness is refused at the seam").toBe("transport: RF preview returned an unrecognized or contradictory envelope.");
    return done("E2", { carried, minted, freshness, observer, nonString });
  },
};

/** A describe title: the row id and its label. */
const titleOf = (entry: Row): string => `${entry.id} ${entry.label}`;

describe("wb-4nut.8 Lenses notification and owner-state census (TSX-HARNESS2-REACTIVE-EVOLUTION-R8, absent-today leg and measured clauses)", () => {
  // The selection, read once from the collected tree before the first case runs: no case has run yet, so every mode is the
  // collected one (vitest sets a case that skips itself at run time to skip afterwards).
  beforeEach(({ task }) => {
    if (FILE_TASKS.length > 0) return;
    FILE_TASKS.push(...task.file.tasks);
    SELECTED.push(...registered(FILE_TASKS).filter(entry => entry.mode === "run").map(entry => entry.name));
  });
  // The file-end judge: every case selected to run reached its end, in run order, the records case last - no case runs after
  // it to see it skip itself or return early. In a run where a case failed, that failure is the red and the judge adds none.
  afterAll(() => {
    if (registered(FILE_TASKS).some(entry => entry.state === "fail")) return;
    expect(REACHED, "every case selected to run reached its end, in run order, the records case last").toEqual(SELECTED);
  });

  it(JUDGED_TITLE, { timeout: 60_000 }, ({ task }) => {
    // The collected tree, read before any other case runs: the records case, which cannot see its own skip (wb-aff9 F1), or any
    // other case deleted, renamed, set to skip or todo by a modifier or an option, or inverted reds here.
    const collected = registered(task.file.tasks, task);
    expect(collected.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.inverted).map(modeLine), "every registered test, the records case included, is set to run and not inverted").toEqual([]);
    expect(ROWS.map(entry => `${entry.id}:${entry.pins.length}`)).toEqual(["A:3", "B:2", "C:2", "D:2", "E:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(entry => entry.pins).sort());
    expect({ bead: BEAD, scan: json(SCAN), residuals: RESIDUAL_FAMILIES, residualRows: json(RESIDUAL_ROWS) }).toStrictEqual({
      bead: ROSTER.bead,
      scan: ROSTER.scan,
      residuals: [...ROSTER.residuals],
      residualRows: json(ROSTER.residualRows),
    });
    // Each residual family's quiet rows sit in its pin's roster witness and read quiet there (wb-aff9 F2: the witness alone held
    // them, so a quiet row removed from the controls and the witness together stayed green).
    expect(Object.keys(RESIDUAL_ROWS), "every residual family names its quiet rows").toEqual([...RESIDUAL_FAMILIES]);
    const quietControls = (pin: string): { [key: string]: unknown } => {
      const witness = rosterWitness(pin);
      return isObject(witness) && isObject(witness.controls) ? witness.controls : {};
    };
    const loud = Object.entries(RESIDUAL_ROWS).flatMap(([family, rows]) => {
      if (rows.controls.length === 0) return [`${family}: no quiet row`];
      const controls = quietControls(rows.pin);
      const quiet = QUIET_READINGS[rows.pin];
      return rows.controls.filter(control => quiet === undefined || !Object.hasOwn(controls, control) || !quiet(readingOf(controls[control]))).map(control => `${family}: ${rows.pin} ${control}`);
    });
    expect(loud, "every residual family's quiet rows sit in its pin's roster witness and read quiet there").toEqual([]);
    // wb-sbh3 F1: only a quiet row's reading was held, so its payload could be swapped for one that exercises no mode. Each quiet
    // row the roster holds is re-read from its payload by its family's real reader and mode reading: both must give what the
    // roster records and the mode must be non-empty; each mode reading must read its family's neutral payload as [], and each
    // family's real reader must read its loud payload as loud.
    const vacant = Object.entries(RESIDUAL_ROWS).flatMap(([family, rows]) =>
      rows.controls.flatMap(control => {
        const held = quietControls(rows.pin)[control];
        const reread = quietRow(control, isObject(held) ? held.payload : undefined);
        const mode = isObject(reread) ? reread.mode : undefined;
        return [
          ...(isDeepStrictEqual(reread, held) ? [] : [`${family}: ${rows.pin} ${control} re-reads ${JSON.stringify(reread)}`]),
          ...(Array.isArray(mode) && mode.length > 0 ? [] : [`${family}: ${rows.pin} ${control} exercises no mode`]),
        ];
      }),
    );
    expect(vacant, "every quiet row the roster holds, re-read from its payload, keeps its reading and its mode, and exercises the mode").toEqual([]);
    // wb-oxug F1: a neutral payload removed from both literals, or set to null in both, fed its mode reading undefined or null,
    // which every mode reading's shape guard reads as [], so the neutral end held nothing. Both payload tables are held to the
    // residual families by key, in order (RESIDUAL_FAMILIES is anchored outside this file by the bead row's delivered residual
    // statement), and each family's real reader must read its neutral payload as one of its own shape (non-null) and quiet.
    expect(Object.keys(NEUTRAL_PAYLOADS), "the neutral payloads name every residual family once, in order").toEqual([...RESIDUAL_FAMILIES]);
    expect(Object.keys(LOUD_PAYLOADS), "the loud payloads name every residual family once, in order").toEqual([...RESIDUAL_FAMILIES]);
    const unshaped = RESIDUAL_FAMILIES.filter(family => {
      const quiet = QUIET_READINGS[RESIDUAL_ROWS[family]?.pin ?? ""];
      const reading = QUIET_READERS[family]?.(NEUTRAL_PAYLOADS[family]) ?? null;
      return quiet === undefined || reading === null || !quiet(reading);
    });
    expect(unshaped, "each family's real reader reads its neutral payload as non-null and quiet").toEqual([]);
    const constant = RESIDUAL_FAMILIES.filter(family => !isDeepStrictEqual(MODE_READINGS[family]?.(NEUTRAL_PAYLOADS[family]), []));
    expect(constant, "each family's mode reading reads its neutral payload as []").toEqual([]);
    const deaf = RESIDUAL_FAMILIES.filter(family => {
      const quiet = QUIET_READINGS[RESIDUAL_ROWS[family]?.pin ?? ""];
      const reading = QUIET_READERS[family]?.(LOUD_PAYLOADS[family]) ?? null;
      return quiet === undefined || reading === null || quiet(reading);
    });
    expect(deaf, "each family's real reader reads its loud payload as loud").toEqual([]);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    expect(deliveredResiduals(bead.notes), "the census's delivered residual statement names every family with its pin and quiet rows").toStrictEqual(json(RESIDUAL_ROWS));
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever .+?) \(gated /.exec(bead.title)?.[1] ?? "";
    const quote = /^Quote: '(.+)' RL (\S+)\. Merged: /m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b), (c) and (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(entry => clause.length > 0 && entry.label.includes(clause)).map(entry => entry.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(entry => coverage.some(ids => ids.includes(entry.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["C"], ["D"], ["E"], ["A"]]);
    const words = statementWords(bead.notes);
    expect(words.carried, "the statement's carried words are the BATTERY").toEqual([...BATTERY]);
    expect(clauses[2], "acceptance (c) lists the BATTERY").toContain(`battery over ${BATTERY.join("/")}:`);
    expect(words.outcomes, "the statement's guarded outcomes").toEqual([...GUARDED_OUTCOMES]);
    expect(clauses[3], "acceptance (d) names the guarded outcomes").toContain(GUARDED_OUTCOMES.map(word => `'${word}'`).join("/"));
    expect(noteLine(bead.notes, "Gating artifact: "), "the gating sentence fences the pinned freshness pair").toContain(`fences freshness to ${PINNED_FRESHNESS.join("|")} and refuses other words`);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.pin.slice(0, 12)}`), "the citation pins the producer sha the roster measured").toBe(true);
    expect(producerLine(44), "README.md:44 holds the quote").toContain(ROSTER.quote);
    const authority = noteLine(bead.notes, "Authority: ");
    const [dirty, unreachable, restart] = quotedFragments(authority);
    expect([dirty, unreachable, restart].map(fragment => fragment !== undefined && fragment.length > 0), "the authority line quotes three fragments").toEqual([true, true, true]);
    expect([producerLine(25).includes(dirty ?? "-"), producerLine(25).includes(unreachable ?? "-"), producerLine(51).includes(restart ?? "-")], "the quoted fragments sit in README.md:25 and :51").toEqual([true, true, true]);
    REACHED.push(JUDGED_TITLE);
  });

  for (const entry of ROWS) {
    describe(titleOf(entry), () => {
      for (const pin of entry.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it(RECORDS_TITLE, { timeout: 60_000 }, ({ task }) => {
    const walked = registered(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: Registered): string => `${modeLine(entry)} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.inverted || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "the judged set and every pin's case reached its end, in run order").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins)]);
    REACHED.push(RECORDS_TITLE);
  });
});
