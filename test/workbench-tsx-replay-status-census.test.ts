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
 * FOLLOW-UP wb-fgjz (R694, from the landing-301 gate verdict, cmd_64e5122a4201): F1 the A1 and B2 walk and application loops read
 * planted controls - B2 records every root it walks and each root's walk reads a planted control after its real files, and each
 * A1 application reads a planted control beside its real inputs, so the gate's single-file hollows P28 (B2 walks only its first
 * root), P29 (B2's label application deleted), P30 (A1's descriptor application emptied) and P31 (A1's roster application
 * emptied) red (that binds the planted half of each application only; that each one judges its REAL inputs is wb-gmx1's, below);
 * F2 A2 pins the reading's source byte for byte at both placements, so P05b (the provider rewrites the provenance placement's
 * status word) reds; F3 the coordinated census+roster probes P25 (a residual hollowed from both files), P26 (a pin re-pointed at
 * another pin's case, its witness copied) and P27 (a vocabulary word dropped from both) red through anchors outside the two files
 * (FROZEN SHAPE below); F4 C1's count of schema-valid fixtures is corrected to six and pinned.
 *
 * TERMINAL FOLLOW-UP wb-gmx1 (R694, from the landing-390 gate verdict, cmd_e24e4268e3e7; hop 3 of the landing-301 chain wb-fb2z.4
 * -> wb-fgjz -> wb-gmx1, so the R739 TERMINAL enumerate-the-resolvable form): the four classes E1-E4 below are the criterion; each
 * is cured here, the one escape left is named as a residual with a pinned quiet row (R-SELECTIVE, Q8), and the claims of A1, B2
 * and the judged set are re-pinned to exactly this set, so a later survivor outside it is record-only unless it contradicts one.
 * RECORDS: every judge application of A1 (the src modules; the native descriptors; rf's result roster read as one text and entry
 * by entry) and of B2 (each surface root's files) takes the text its judges read from judgedText(), which records the input's
 * name and the sha256 of that very text in the application's record as the application judges it. What a record owes is
 * re-derived from the tree, the native registry and the fixture, never from the application's own lists (owedTrigger,
 * owedSurface): the real inputs in walk order, then the planted controls. A1 and B2 hold their records to it in the case, their
 * witnesses carry per application that the record is the owed one and that its anchor input (the root's anchor file with its
 * token, the preview descriptor with its id, rf's provenance result key) was judged with its real text, and the registration
 * case holds every record to a fresh re-derivation once more.
 *  E1 dropped inputs (the gate's N01-N05 and N19, and the paired N01+P06, N02+P08, N03+P13 and N04+P09): an application that
 *    judges fewer inputs than it owes - none, the first, any proper subset - leaves its record short and reds.
 *  E2 substituted inputs: an application that judges as many inputs but not the owed ones (a stand-in, a repeat, another order),
 *    or not their real text (blanked, cut or rewritten), records other names or digests and reds.
 *  E3 skipped applications: an A1 or B2 case that never runs an application (the case returns its witness as a literal, or an
 *    application's verdicts are written down instead of judged) leaves that record empty, and the registration case reds.
 *  E4 the delivered heading (F3): wb-fb2z.4's notes carry exactly one "WHAT IS PINNED. Rows (frozen " heading, so a decoy block
 *    before the delivered entry (H2) or after it (H1) reds the judged set, the decoy alone included.
 * F2 (claim scope) is cured by the same re-pinning: the planted controls bind the planted half of each application, the real half
 * is E1-E3's.
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23; every producer fact rides the roster with its blob id): at the program
 * pin the producer (@reactive-fiber/tsx 0.1.668) closes the replay status words at REPLAY_STATUSES = matched | mismatched |
 * failed (src/replay/report.ts:39), the ReplayReport schema (tests/fixtures/docs/replay-report.schema.json) requires fourteen
 * keys, admits no other and closes status to the same three words, the two schema names are REPLAY_REPORT_SCHEMA =
 * "rftsx.replay-report" (src/replay/report.ts:35) and RENDER_CAPTURE_SCHEMA = "rftsx.render-capture" (src/replay/replay.ts:83;
 * both re-read by the wb-fgjz seat, 2026-10-24, with their blob ids in the roster), and the codes table
 * (src/diagnostics/codes.ts, 199 rows, set-equal to the frozen list tests/golden/diagnostic-codes.json) carries eight REPLAY rows
 * (:1681-1745) and no RFTSX_REPLAY_VERSION_DRIFT; `git grep` of the code and of replayable_exact over src/ and python/ matches no
 * file. The TSX distribution the installed rf runs (rf 0.1.832, integrations/tsx/runtime-lock.json: @reactive-fiber/tsx 0.1.649
 * from ReactiveFiberTSXSDK 5da03a7d49f4, an ancestor of the pin) has the same eight rows and three words and no drift code
 * either, and the installed rf package spells no RFTSX_REPLAY code and no rftsx.replay-report or rftsx.render-capture name
 * anywhere. replayable_exact is rf's replayability classification word (the enum replayable_exact |
 * replayable_with_captured_external_inputs | replayable_with_declared_variance | not_replayable of its cli schemas); rf's
 * context.render schema carries no replayability member, so the one rf envelope Pi reads cannot carry it.
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
 *    (empty both ways today). Each application also reads a PLANTED control beside its real inputs (wb-fgjz): a scratch module
 *    spelling a vocabulary word and the specifier, a descriptor spelling a vocabulary word, one spelling the specifier, a roster
 *    entry spelling a vocabulary word and a binding naming no module; the planted controls are the only hits, the planted module
 *    the only unbound speller and the planted binding the only stale one, the planted roster entry is the only entry that spells
 *    a word (read entry by entry, every real entry in that application's record, so no real hit hides behind the planted word),
 *    and the real module, descriptor and roster entry counts each have a floor of their own; each application's record of what it
 *    judged is the owed one (RECORDS, wb-gmx1). A2 the native reader against a stand-in rf: a bare report on stdout is the transport
 *    refusal of an unrecognized envelope, never a reading; a report riding an otherwise valid render, as a result member
 *    (result.replay) or inside a member the adapter reads (result.provenance.replay), is admitted with the reading's source byte
 *    for byte (pinned at both placements), and the reader adapter's projection is byte-identical to the same render without it
 *    and surfaces none of the report's strings: Pi neither echoes nor labels it on any display path.
 *  B, the guard, (a). B1 the pinned codes table: the drift code is absent from the REPLAY family, from the whole 199-code table and
 *    from the distribution's family, the family is the table's RFTSX_REPLAY_ prefix set, and the status words agree with the
 *    schema enum; B2 no file of src, docs, qa or the front matter spells an RFTSX code, an rftsx schema name or the exact label, and
 *    no unit (line, table cell or sentence) couples a TSX mention with a replay or capture word and an exactness word, with the
 *    judges read on controls; B2 records each root it walks (all four, in order), and each root's walk reads a planted scratch
 *    control after its real files - one line per judge (an RFTSX code, an rftsx schema name, the exact label, a coupled claim) -
 *    so each judge's application is read on each root and the planted controls are the only hits (wb-fgjz); each root's record of
 *    what its judges read is its walked files and its planted control (RECORDS, wb-gmx1).
 *  C, armed on landing, (b). C1 the fixture oracle: each fixture is base plus exactly its delta, and the six valid ones (base,
 *    drift, equal, opaque, mismatched, failed) meet the pin's schema facts (key set, status enum, matched iff status matched, mode
 *    replay, package and protocol versions), a list C1 pins; C2 the armed check (violationsOf) on
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
 * out-of-file roster, whose producer facts (the codes table, the schema, the status words, the guide's report, the two schema
 * names) anchor the constants outside this file, and the labels of rows A to D are held to the bead's own acceptance text in the
 * tracker export (.beads/issues.jsonl). OUTSIDE BOTH FILES (wb-fgjz, the coordinated census+roster class): the delivered entry of
 * the bead's notes in the same export (append-only; its "WHAT IS PINNED" block) states the frozen shape, the pins each row's line
 * names and the residual families with their quiet rows, and the judged set holds this file to it - each delivered row keeps at
 * least its delivered pins, each delivered pin stays judged in its row and each delivered family keeps its quiet row - so a pin,
 * a row or a residual removed from this file and the roster together reds; VOCABULARY equals what the producer facts derive
 * (each schema name's prefix and name, every required report key outside GENERIC_REPORT_KEYS, the drift code's tail and rf's
 * exact classification word), so a word dropped from this file and the roster's constants together reds; and no two pins share a
 * roster witness, so a pin re-pointed at another pin's case with that witness copied reds. The last case reads the vitest task
 * tree (every registered test, in roster order, in run mode, ran before it) and the set of pins that reached their witness. NOT
 * CLAIMED: an edit of this file and the roster that also rewrites the roster's producer facts, or that moves a key between
 * VOCABULARY and GENERIC_REPORT_KEYS in both; a pin's case rewritten together with its roster witness to a new value of its own
 * (the delivered entry names pins, not witnesses); a case other than A1 and B2 rewritten to return its present witness as a
 * literal (the registration case re-derives only A1's and B2's applications); and an application edited together with what its
 * record is held to (owedTrigger, owedSurface or the record comparison).
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY a reader reading only the generic keys (status, matched,
 * diagnostics, code, metadata) spells no vocabulary token and is invisible to A1 (Q1); R-PARAPHRASE a reworded exactness claim
 * (identical, byte for byte) is not caught by B2 or by the armed check's exact judge (Q2); R-COMPOSED a token or label assembled at
 * runtime from parts is invisible to any text scan (Q3); R-SCOPE test/ and the tracker export .beads/ lie outside every scanned
 * root, and .beads/ spells the drift code and the exact label (the owner filing quotes the statement) (Q4); R-INTERRUPTED a token
 * split by a zero-width code point, or a label spelled with a homoglyph letter, is not caught (Q5); R-RAW-READING the native
 * reading hands the rf render's result to its caller unchanged, so a report riding it reaches a workflow script verbatim while
 * the display path ignores it: the echo the statement owes binds the armed half, not today's adapter (Q6); R-UNIT a claim whose TSX
 * mention lies in a neighbouring unit (the previous sentence, a heading) is not judged by B2, which reads one unit at a time (Q7);
 * R-SELECTIVE an application that tells a planted control from a real input and judges only the planted one (or drops a real
 * input's verdict after judging it) while every input still reaches its record is not caught: no real input carries a known
 * positive verdict - Pi spells none of the vocabulary and no surface file meets a B2 judge - so a dropped real verdict reads as a
 * quiet one (Q8, on constructed inputs: beside a quiet input and the planted control, a real input that spells the vocabulary or
 * an RFTSX code is a hit of the honest application and not of the selective one, whose record is the owed one all the same).
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
import { createHash } from "node:crypto";
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
 * code's tail and rf's exact classification word; no src module spells one at base 6653728. The report's generic keys
 * (GENERIC_REPORT_KEYS) and the diagnostic's code and metadata are left out and named under R-VOCABULARY; the judged set derives
 * the list from the roster's producer facts (derivedVocabulary). */
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
/** The required keys of the producer's ReplayReport schema that VOCABULARY leaves out as generic (R-VOCABULARY): every other
 * required key is a vocabulary member, so the split is a partition of the schema's key list (wb-fgjz). */
const GENERIC_REPORT_KEYS = ["schema", "schemaVersion", "status", "matched", "resources", "effects", "commits", "nodeRef", "transactionRef", "mode", "diagnostics"];
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
  "R-SELECTIVE": ["Q8"],
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
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"] },
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
/** The src modules A1 judges: a floor below the 115 measured at trunk f2e138e, so an emptied module filter reds (wb-fgjz). */
const MODULE_FLOOR = 100;
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
/** The prefix of every planted control's name: no repository path starts with it, so a planted hit never reads as a real one. */
const PLANTED = "planted:";
/** The planted control files written so far, by path: the name each judge reports for one. */
const PLANTED_NAMES = new Map<string, string>();
/** The name a judge reports for a walked file: the planted control's name, else the repository path. */
function nameOf(file: string): string {
  return PLANTED_NAMES.get(file) ?? relative(REPO, file);
}
/** Writes one planted control file into fresh makeScratch scratch (removed after the case) and returns its path. */
function plantedFile(name: string, fileName: string, text: string): string {
  const folder = makeScratch("tsx-replay-status-planted-");
  scratches.push(folder);
  const file = join(folder, fileName);
  writeFileSync(file, text);
  PLANTED_NAMES.set(file, `${PLANTED}${name}`);
  return file;
}
/** The producer package spelling, composed at runtime (no source line of this file spells it whole). */
const PLANTED_SPECIFIER = ["@reactive-fiber", "tsx"].join("/");
/** The claim unit every planted surface control carries: a TSX mention, a replay word and an exactness word in one sentence. */
const SURFACE_CLAIM = compose("The", "TSX", "replay", "is", "exact.");
/** The text of B2's planted control (wb-fgjz): one line per judge - an RFTSX code, an rftsx schema name, the exact label and the
 * coupled claim unit. */
const SURFACE_CONTROL_TEXT = `${[["RFTSX", "REPLAY", "VERSION", "DRIFT"].join("_"), ["rftsx", "replay-report"].join("."), ["replayable", "exact"].join("_"), SURFACE_CLAIM].join("\n")}\n`;
/** B2's planted control for one surface root (wb-fgjz), read after the root's real files, so every judge's application is read on
 * every root's walk. */
function plantSurfaceControl(root: string): string {
  return plantedFile(root, "control.md", SURFACE_CONTROL_TEXT);
}
/** A1's planted controls (wb-fgjz), one per application: a module spelling a vocabulary word and the specifier, a descriptor
 * spelling a vocabulary word, a descriptor spelling the specifier, a roster entry spelling a vocabulary word and a binding naming
 * no module. Each rides the real inputs of its application, so the planted controls are the only hits. */
function plantTriggerControls(): { module: string; descriptorIds: string[]; descriptorTexts: string[]; rosterEntry: string; binding: string } {
  const texts = triggerTexts();
  return {
    module: plantedFile("trigger module", "control.ts", texts.module),
    descriptorIds: texts.descriptors.map(entry => entry.id),
    descriptorTexts: texts.descriptors.map(entry => JSON.stringify(entry)),
    rosterEntry: texts.rosterEntry,
    binding: texts.binding,
  };
}
/** The texts of A1's planted controls (wb-fgjz), written by plantTriggerControls and re-derived by owedTrigger. */
function triggerTexts(): { module: string; descriptors: { id: string; description: string }[]; rosterEntry: string; binding: string } {
  return {
    module: `${compose("export const KEYS = [", JSON.stringify(["first", "MismatchPath"].join("")), "]; //", PLANTED_SPECIFIER)}\n`,
    descriptors: [
      { id: `${PLANTED}vocabulary descriptor`, description: compose("reads", ["capture", "Versions"].join("")) },
      { id: `${PLANTED}specifier descriptor`, description: compose("loads", PLANTED_SPECIFIER) },
    ],
    rosterEntry: ["reinitialized", "RuntimeOnlySlots"].join(""),
    binding: `${PLANTED}stale binding`,
  };
}

/** One input as a judge application judged it (wb-gmx1): the name the application reports for it and the sha256 of the very text
 * its judges read. */
interface JudgedInput {
  readonly name: string;
  readonly sha256: string;
}
/** What one application owes: its record, and the anchor input the record must hold judged with its real text and its token. */
interface Owed {
  readonly record: readonly JudgedInput[];
  readonly anchor: { readonly name: string; readonly text: string; readonly token: string };
}
/** A1's four judge applications (wb-gmx1); B2 has one per surface root. */
const TRIGGER_APPLICATIONS = ["A1 modules", "A1 descriptors", "A1 roster text", "A1 roster entries"] as const;
function surfaceApplication(root: string): string {
  return `B2 ${root}`;
}
/** Every A1 and B2 application's record, filled from inside the application as it judges; the registration case reads it last. */
const RECORDS = new Map<string, JudgedInput[]>();
function sha256Of(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
/** Hands an application the text its judges read and records that input, by name and by the sha256 of that very text, in the
 * application's record (wb-gmx1); Q8 passes a record map of its own. */
function judgedText(application: string, name: string, text: string, records: Map<string, JudgedInput[]> = RECORDS): string {
  const record = records.get(application) ?? [];
  record.push({ name, sha256: sha256Of(text) });
  records.set(application, record);
  return text;
}
function owedRecord(inputs: readonly { readonly name: string; readonly text: string }[]): JudgedInput[] {
  return inputs.map(({ name, text }) => ({ name, sha256: sha256Of(text) }));
}
/** One application's outcome: its record is the owed one, and it holds the anchor input judged with its real text and token. */
function judgedOutcome(application: string, owed: Owed): { owed: boolean; anchor: boolean } {
  const record = RECORDS.get(application) ?? [];
  const digest = sha256Of(owed.anchor.text);
  return {
    owed: JSON.stringify(record) === JSON.stringify(owed.record),
    anchor: owed.anchor.text.includes(owed.anchor.token) && record.some(entry => entry.name === owed.anchor.name && entry.sha256 === digest),
  };
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

/** rf's frozen render result roster, whose keys and values A1 reads, and the entry its records must hold: the result member A2's
 * provenance placement rides. */
const RESULT_KEYS_PATH = join(HERE, "fixtures", "rf-result-keys.json");
const RESULT_ANCHOR = "provenance";
/** What A1's four applications owe, re-derived from the src walk, the native registry and the fixture, never from the case's
 * lists (wb-gmx1): the real inputs in order, then the planted controls. */
async function owedTrigger(): Promise<Record<string, Owed>> {
  const scan = SURFACE_ROOTS[0];
  if (scan === undefined) throw new Error("no src root");
  const planted = triggerTexts();
  const modules = walkRoot(scan).files.filter(file => file.endsWith(".ts"));
  const native = await nativeDescriptors();
  const entries = [...keysAndStrings(JSON.parse(textOf(RESULT_KEYS_PATH))), planted.rosterEntry];
  const rosterName = relative(REPO, RESULT_KEYS_PATH);
  return {
    "A1 modules": {
      record: owedRecord([...modules.map(file => ({ name: nameOf(file), text: textOf(file) })), { name: `${PLANTED}trigger module`, text: planted.module }]),
      anchor: { name: scan.anchorFile, text: textOf(join(REPO, scan.anchorFile)), token: scan.anchorToken },
    },
    "A1 descriptors": {
      record: owedRecord([
        ...native.ids.map((id, index) => ({ name: id, text: native.texts[index] ?? "" })),
        ...planted.descriptors.map(entry => ({ name: entry.id, text: JSON.stringify(entry) })),
      ]),
      anchor: { name: PREVIEW_ID, text: native.texts[native.ids.indexOf(PREVIEW_ID)] ?? "", token: PREVIEW_ID },
    },
    "A1 roster text": {
      record: owedRecord([{ name: rosterName, text: entries.join("\n") }]),
      anchor: { name: rosterName, text: entries.join("\n"), token: RESULT_ANCHOR },
    },
    "A1 roster entries": {
      record: owedRecord(entries.map(entry => ({ name: entry, text: entry }))),
      anchor: { name: RESULT_ANCHOR, text: RESULT_ANCHOR, token: RESULT_ANCHOR },
    },
  };
}
/** What B2's application on each surface root owes: the root's walked files, then its planted control (wb-gmx1). */
function owedSurface(): Record<string, Owed> {
  return Object.fromEntries(
    SURFACE_ROOTS.map((scan): [string, Owed] => [
      surfaceApplication(scan.root),
      {
        record: owedRecord([...walkRoot(scan).files.map(file => ({ name: nameOf(file), text: textOf(file) })), { name: `${PLANTED}${scan.root}`, text: SURFACE_CONTROL_TEXT }]),
        anchor: { name: scan.anchorFile, text: textOf(join(REPO, scan.anchorFile)), token: scan.anchorToken },
      },
    ]),
  );
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
/** What the delivered entry of the bead's notes pinned (wb-fb2z.4 DELIVERED, append-only in the tracker export): the frozen shape,
 * the pin ids each row's line names and the residual families with their quiet rows - this file's anchor outside itself and the
 * roster (wb-fgjz). */
const DELIVERED_HEADING = "WHAT IS PINNED. Rows (frozen ";
function deliveredEntry(notes: string): { headings: number; shape: string[]; pins: Record<string, string[]>; residuals: string[] } {
  const headings = notes.split(DELIVERED_HEADING).length - 1;
  const start = notes.indexOf(DELIVERED_HEADING);
  const end = start < 0 ? -1 : notes.indexOf("\n\n", start);
  const block = start < 0 ? "" : notes.slice(start, end < 0 ? undefined : end);
  const shape = (/^WHAT IS PINNED\. Rows \(frozen ((?:[A-Z]:\d+ ?)+);/.exec(block)?.[1] ?? "").trim().split(" ").filter(Boolean);
  const lines = block.split("\n");
  const lineOf = (id: string): string => lines.find(line => line.startsWith(`- ${id} `)) ?? "";
  const pins = Object.fromEntries(shape.map(entry => entry.split(":")[0] ?? "").map(id => [id, [...new Set(lineOf(id).match(new RegExp(`\\b${id}\\d+\\b`, "g")) ?? [])]]));
  const residuals = [...lineOf("Q").matchAll(/\b(R-[A-Z][A-Z-]*[A-Z]) (Q\d+)\b/g)].map(match => `${match[1]} ${match[2]}`);
  return { headings, shape, pins, residuals };
}
/** VOCABULARY as the roster's producer facts derive it, folded and sorted (wb-fgjz): each producer schema name's prefix and name,
 * every required report key outside GENERIC_REPORT_KEYS, the drift code's tail and rf's exact classification word. */
function derivedVocabulary(): string[] {
  const schemaNames = Object.values(producerPart("schemaNames")).map(entry => String(objectOf(entry, "schemaNames entry").name));
  const required = strings(producerPart("schema").required, "schema required");
  const exact = strings(producerPart("rfClassification").words, "rfClassification words").filter(word => /exact/.test(word));
  const words = [...schemaNames.flatMap(name => name.split(".")), ...required.filter(key => !GENERIC_REPORT_KEYS.includes(key)), DRIFT_CODE.replace(/^RFTSX_REPLAY_/, ""), ...exact];
  return [...new Set(words.map(fold))].sort();
}
/** A JSON value's text with every object's keys sorted, so two equal witnesses compare equal whatever their key order. */
function canonical(value: JsonValue): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map(key => `${JSON.stringify(key)}:${canonical(value[key] ?? null)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const scan = SURFACE_ROOTS[0];
    if (scan === undefined) throw new Error("no src root");
    for (const application of TRIGGER_APPLICATIONS) RECORDS.delete(application);
    const { files, floorMet, anchorRead } = walkRoot(scan);
    const planted = plantTriggerControls();
    const realModules = files.filter(file => file.endsWith(".ts"));
    const modules = [...realModules, planted.module];
    const spelling = modules
      .map(file => {
        const text = judgedText("A1 modules", nameOf(file), textOf(file));
        return { module: nameOf(file), words: vocabularyIn(text), specifiers: specifiersIn(text) };
      })
      .filter(entry => entry.words.length > 0 || entry.specifiers.length > 0);
    const nearest = textOf(join(REPO, scan.anchorFile));
    const native = await nativeDescriptors();
    const ids = [...native.ids, ...planted.descriptorIds];
    const texts = [...native.texts, ...planted.descriptorTexts];
    const descriptorHits = ids.filter((id, index) => {
      const text = judgedText("A1 descriptors", id, texts[index] ?? "");
      return vocabularyIn(text).length > 0 || specifiersIn(text).length > 0;
    });
    const realEntries = keysAndStrings(JSON.parse(textOf(RESULT_KEYS_PATH)));
    const rosterEntries = [...realEntries, planted.rosterEntry];
    const resultRoster = judgedText("A1 roster text", relative(REPO, RESULT_KEYS_PATH), rosterEntries.join("\n"));
    const bound = [...Object.keys(TSX_REPLAY_READERS), planted.binding].sort();
    const unbound = spelling.map(entry => entry.module).filter(module => !bound.includes(module));
    const stale = bound.filter(module => !spelling.some(entry => entry.module === module));
    expect(realModules.length, `src modules judged, floor ${MODULE_FLOOR}`).toBeGreaterThanOrEqual(MODULE_FLOOR);
    expect(native.ids.length, "native descriptors registered").toBeGreaterThan(0);
    expect(realEntries.length, "rf's frozen render result roster was read").toBeGreaterThan(0);
    expect(
      { spelling, descriptorHits, resultKeys: vocabularyIn(resultRoster), unbound, stale },
      "a TSX replay reader binds itself in TSX_REPLAY_READERS; the planted controls are the only hits",
    ).toStrictEqual({
      spelling: [{ module: `${PLANTED}trigger module`, words: ["firstmismatchpath"], specifiers: ["reactive-fiber/tsx"] }],
      descriptorHits: [`${PLANTED}vocabulary descriptor`, `${PLANTED}specifier descriptor`],
      resultKeys: ["reinitializedruntimeonlyslots"],
      unbound: [`${PLANTED}trigger module`],
      stale: [`${PLANTED}stale binding`],
    });
    const rosterHits = rosterEntries.filter(entry => vocabularyIn(judgedText("A1 roster entries", entry, entry)).length > 0);
    expect(rosterHits, "the planted entry is the only roster entry that spells the vocabulary (no real hit hides behind its word)").toStrictEqual([
      planted.rosterEntry,
    ]);
    const owed = await owedTrigger();
    const judged: Record<string, { owed: boolean; anchor: boolean }> = {};
    for (const application of TRIGGER_APPLICATIONS) {
      const entry = owed[application];
      if (entry === undefined) throw new Error(`nothing owed for ${application}`);
      expect(RECORDS.get(application) ?? [], `${application} judged exactly the inputs it owes (wb-gmx1)`).toStrictEqual(entry.record);
      judged[application] = judgedOutcome(application, entry);
    }
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
      modulesFloorMet: realModules.length >= MODULE_FLOOR,
      anchorRead,
      nearestQuiet: vocabularyIn(nearest).length === 0 && specifiersIn(nearest).length === 0,
      descriptorsRead: native.ids.length > 0,
      rosterRead: realEntries.length > 0,
      spelling,
      descriptorHits,
      resultKeys: vocabularyIn(resultRoster),
      rosterHits,
      bound,
      unbound,
      stale,
      controls,
      judged,
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
      expect(outcome.sourceVerbatim, `the reading's source is the render byte for byte (${placement})`).toBe(true);
      expect(outcome.projectionUnchanged, `the adapter's projection ignores the report (${placement})`).toBe(true);
      expect(outcome.shown, `no display string carries the report (${placement})`).toStrictEqual([]);
      embeddedWitness[placement] = {
        admitted: outcome.admitted,
        sourceVerbatim: outcome.sourceVerbatim,
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
    const walked: string[] = [];
    for (const scan of SURFACE_ROOTS) RECORDS.delete(surfaceApplication(scan.root));
    for (const scan of SURFACE_ROOTS) {
      const { files } = walkRoot(scan);
      walked.push(scan.root);
      for (const file of [...files, plantSurfaceControl(scan.root)]) {
        const name = nameOf(file);
        const text = judgedText(surfaceApplication(scan.root), name, textOf(file));
        if (CODE_SPELLING.test(text)) found.codes.push(name);
        if (SCHEMA_SPELLING.test(text)) found.schemas.push(name);
        if (LABEL_SPELLING.test(text)) found.labels.push(name);
        for (const unit of claimUnitsIn(text)) found.claims.push(`${name}: ${unit}`);
      }
    }
    const planted = SURFACE_ROOTS.map(scan => `${PLANTED}${scan.root}`);
    expect(walked, "B2 walks every surface root, in order").toStrictEqual(SURFACE_ROOTS.map(scan => scan.root));
    expect(found, "no Pi surface spells a TSX replay code, schema name or exact label: each root's planted control is the only hit").toStrictEqual({
      codes: planted,
      schemas: planted,
      labels: planted,
      claims: planted.map(name => `${name}: ${SURFACE_CLAIM}`),
    });
    const controls = {
      code: CODE_SPELLING.test(`see ${["RFTSX", "REPLAY", "VERSION", "DRIFT"].join("_")}`),
      schema: SCHEMA_SPELLING.test(`a ${["rftsx", "replay-report"].join(".")} document`),
      label: LABEL_SPELLING.test(compose("labelled", ["replayable", "exact"].join("_"))),
      claim: claimUnitsIn(compose("The", "TSX", "replay", "is", "exact.")).length,
    };
    const owed = owedSurface();
    const judged: Record<string, { owed: boolean; anchor: boolean }> = {};
    for (const scan of SURFACE_ROOTS) {
      const application = surfaceApplication(scan.root);
      const entry = owed[application];
      if (entry === undefined) throw new Error(`nothing owed for ${application}`);
      expect(RECORDS.get(application) ?? [], `${application} judged exactly the inputs it owes (wb-gmx1)`).toStrictEqual(entry.record);
      judged[application] = judgedOutcome(application, entry);
    }
    return { ...found, walked, controls, judged };
  },
  C1: async () => {
    const rebuiltEqual = Object.fromEntries(FIXTURE_NAMES.map(name => [name, JSON.stringify(rebuilt(name)) === JSON.stringify(FIXTURES[name])]));
    const facts = Object.fromEntries(FIXTURE_NAMES.map(name => [name, schemaFacts(FIXTURES[name])]));
    const drift = driftsOf(FIXTURES.drift);
    expect(rebuiltEqual, "every fixture is base plus exactly its delta").toStrictEqual(Object.fromEntries(FIXTURE_NAMES.map(name => [name, true])));
    expect(FIXTURES.drift.status, "the drift leaves the status unchanged").toBe(FIXTURES.base.status);
    const schemaValid = FIXTURE_NAMES.filter(name => Object.values(schemaFacts(FIXTURES[name])).every(Boolean));
    expect(schemaValid, "base and the five constructed forms the pin's schema admits meet every schema fact").toStrictEqual(["base", ...VALID_FIXTURES]);
    return {
      baseStatus: FIXTURES.base.status ?? null,
      drift: { status: FIXTURES.drift.status ?? null, code: DRIFT_CODE, pairs: drift },
      rebuilt: rebuiltEqual,
      facts,
      schemaValid,
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
  Q8: async () => {
    // R-SELECTIVE on constructed inputs: a real input that carries a hit, a quiet real input and the planted control, judged by an
    // honest application and by a selective one that hands every input to its record but judges the planted control only.
    const modules = [
      { name: "constructed: a real module that spells the vocabulary", text: compose("const keys = [", JSON.stringify(["capture", "Versions"].join("")), "];"), real: true },
      { name: "constructed: a quiet real module", text: "export const quiet = 1;", real: true },
      { name: `${PLANTED}trigger module`, text: triggerTexts().module, real: false },
    ];
    const pages = [
      { name: "constructed: a real page that spells an RFTSX code", text: compose("see", ["RFTSX", "REPLAY", "MISMATCH"].join("_")), real: true },
      { name: "constructed: a quiet real page", text: "# Workbench", real: true },
      { name: `${PLANTED}docs`, text: SURFACE_CONTROL_TEXT, real: false },
    ];
    const outcome = (inputs: typeof modules, judge: (text: string) => boolean, selective: boolean): { owed: boolean; hits: string[] } => {
      const records = new Map<string, JudgedInput[]>();
      const hits = inputs
        .filter(({ name, text, real }) => {
          const judgedOn = judgedText("Q8", name, text, records);
          return judge(selective && real ? "" : judgedOn);
        })
        .map(entry => entry.name);
      return { owed: JSON.stringify(records.get("Q8") ?? []) === JSON.stringify(owedRecord(inputs)), hits };
    };
    const spells = (text: string): boolean => vocabularyIn(text).length > 0 || specifiersIn(text).length > 0;
    const meets = (text: string): boolean => CODE_SPELLING.test(text) || SCHEMA_SPELLING.test(text) || LABEL_SPELLING.test(text) || claimUnitsIn(text).length > 0;
    return {
      modules: { honest: outcome(modules, spells, false), selective: outcome(modules, spells, true) },
      pages: { honest: outcome(pages, meets, false), selective: outcome(pages, meets, true) },
    };
  },
};

describe("wb-fb2z.4 TSX replay status census (TSX-COMPONENT-ASSEMBLY-R4)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's acceptance text and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:2", "B:2", "C:3", "D:2", "Q:8"]);
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
      genericReportKeys: GENERIC_REPORT_KEYS,
    }).toStrictEqual({ programPin: ROSTER.programPin, ...ROSTER.constants });
    expect(strings(producerPart("statusWords").words, "statusWords"), "the status words are the producer's").toStrictEqual(STATUS_WORDS);
    expect(strings(producerPart("codesTable").replayFamily, "replayFamily"), "the REPLAY codes are the producer's").toStrictEqual(REPLAY_CODES);
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) expect(notes, `row ${row.id} quotes the bead's acceptance`).toContain(quoteOf(row.label));
    const delivered = deliveredEntry(notes);
    expect(delivered.headings, `${BEAD}'s notes carry exactly one "${DELIVERED_HEADING}" heading (wb-gmx1, F3)`).toBe(1);
    expect(delivered.shape.length, `${BEAD}'s delivered entry states the frozen shape`).toBeGreaterThan(0);
    expect(Object.values(delivered.pins).flat().length, "the delivered row lines name every delivered pin").toBe(
      delivered.shape.reduce((sum, entry) => sum + Number(entry.split(":")[1]), 0),
    );
    for (const entry of delivered.shape) {
      const [id = "", count = "0"] = entry.split(":");
      const pins = ROWS.find(row => row.id === id)?.pins ?? [];
      expect(pins.length, `row ${id} keeps at least its ${count} delivered pins`).toBeGreaterThanOrEqual(Number(count));
      for (const pin of delivered.pins[id] ?? []) expect(pins, `the delivered pin ${pin} stays judged in row ${id}`).toContain(pin);
    }
    expect(delivered.residuals.length, "the delivered entry names a family for every delivered quiet row").toBe(delivered.pins.Q?.length ?? -1);
    for (const pair of delivered.residuals) {
      const [family = "", quiet = ""] = pair.split(" ");
      expect(RESIDUALS[family] ?? [], `the delivered residual ${family} keeps its quiet row ${quiet}`).toContain(quiet);
    }
    const required = strings(producerPart("schema").required, "schema required");
    expect(GENERIC_REPORT_KEYS.filter(key => !required.includes(key)), "every generic key is a required report key").toEqual([]);
    expect(derivedVocabulary(), "VOCABULARY is what the producer facts derive").toStrictEqual([...new Set(FOLDED_VOCABULARY)].sort());
    expect(FIXTURES.base.schema, "the guide's report carries the producer's report schema name").toBe(objectOf(producerPart("schemaNames").replayReport, "replayReport").name);
    const witnesses = ROSTER.rows.flatMap(row => row.pins.map(pin => ({ id: pin.id, text: canonical(pin.witness) })));
    expect(
      witnesses.filter((entry, index) => witnesses.findIndex(other => other.text === entry.text) !== index).map(entry => entry.id),
      "no pin shares another pin's roster witness",
    ).toEqual([]);
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

  it("the registered tests and the reached pins equal the roster, in order and both ways", { timeout: 60_000 }, async ({ task }) => {
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
    const owed = { ...(await owedTrigger()), ...owedSurface() };
    expect(
      Object.fromEntries(RECORDS),
      "every A1 and B2 application judged exactly the inputs it owes, re-derived here (wb-gmx1): a case that never ran one reds",
    ).toStrictEqual(Object.fromEntries(Object.entries(owed).map(([application, entry]) => [application, entry.record])));
  });
});
