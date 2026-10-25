/**
 * wb-4nut.10 (TSX-HARNESS2-REACTIVE-EVOLUTION-R10, program-triage-2026-10-22), the H2 state-promotion census: a gating guard
 * with an until-then leg. Statement (the bead's full statement, its note, verbatim): "If Pi ever reads H2 publication, render,
 * inference or sink records (gated FO-H2-02/03, TSX-H2-04, RI-H2-04/05, RL-H2-04, unshipped), Pi shall carry each producer's state
 * words verbatim, never promoting a non-terminal state: a queued, unflushed value is never an observable publication, a discarded
 * render attempt is never committed, a timeout never proves cancellation, and sink drops/INCOMPLETE mean trace incompleteness,
 * never execution or inference failure" (FiberOpticsSDK docs/programs/harness2-reactive-evolution-2026-10-20/README.md:44@
 * e803f66c5fb9). Acceptance (the owner filing, verbatim; the labels of rows A to D quote it): "(a) queued value, no flush yields an
 * importer view with no publication (ABSENT/PENDING), never VALUE; PENDING/SUPPRESSED never map to success; (b) a render attempt
 * with committed=false shows no committed output; a missing flag reads unknown; (c) admitted request then client timeout projects
 * 'uncertain'/attempted, never 'cancelled'; (d) sink dropped > 0 yields coverage 'partial' with an INCOMPLETE note,
 * execution/inference status unchanged." Row E's label is the filing's own until-then line ("Not P0: ...").
 *
 * No H2 record reaches Pi today, so each clause is measured at the Pi reader nearest the record it governs, where the same
 * promotion could happen now, and row E pins that no Pi module reads the records themselves:
 *  A, acceptance (a), at the Pi reader where an FO publication would ride: the observation rows of an rf render
 *    (reactivefiber-observer.ts observationRowsDemotion), since rf composes FiberOptics. A1 each of FO L25's five
 *    publication words as a row's status projects partial with an unknown tone, never complete or success, and that projection is
 *    the control word's projection with the word swapped in: the word is carried verbatim and nothing else moves. A2 distinct
 *    words are never collapsed: a render of ABSENT, PENDING twice, SUPPRESSED and FAILED counts every row and lists each word once,
 *    in row order. A3 the judge Pi's readings meet rejects a promoting reader (a non-terminal word read as an observed value), a
 *    VALUE-minting one and a collapsing one.
 *  B, acceptance (b), at the same observer, the reader adapter that projects an rf render. B1 the noncommitted attempt (render_id null,
 *    transaction_id null, ephemeral, 0 storage writes) shows as a noncommitted preview and no surfaced string claims a commit; a
 *    render-report-shaped record stating committed false, true or nothing, riding an open object of the result, leaves the
 *    projection byte-identical; and a bare commit flag (committed false or true, no record around it) planted on every object the
 *    render holds (the envelope, the result and every object below them, array elements included) is carried unread, the
 *    projection byte-identical, or refused as a typed validation error by a strict object, never read. B2 each committed shape (a
 *    render id, a commit sequence, a transaction id, ephemeral false, a storage write) is a typed refusal naming its field, never a
 *    projection. B3 a missing flag is never defaulted: each required one removed is refused, and the judge rejects a reader that
 *    defaults it.
 *  C, acceptance (c), at the capability registry, which admits and bounds every workflow capability call (capability-registry.ts
 *    dispatch). C1 an admitted effectful request (write, external, unknown) whose client deadline fires reads uncertain-effect,
 *    attempted once, never cancelled, though the provider completes after the deadline. C2 the controls: a request still queued at
 *    its deadline was never attempted and reads unavailable; an admitted read reads a transport timeout; a caller's abort of a
 *    request still queued reads 'cancelled while waiting for admission' and was never attempted (the registry's 'cancelled' words
 *    come from the caller's own abort signal, never from a deadline); the claude and detached control tables establish
 *    'cancelled' only from the producer's own terminal; the telemetry outcome keys hold no cancelled outcome. C3 the judge rejects a
 *    cancelling, a refusing and a succeeding reading of the admitted timeout.
 *  D, acceptance (d), at the operations telemetry emitter (telemetry.ts createTelemetryEmitter), the Pi module that delivers events
 *    to a host-injected sink (forge-operation-observer's notification callback is a transport subscription, not a trace sink).
 *    D1 a throwing sink and an oversized event are dropped and counted, the emitter never throws to its caller, the next delivered
 *    event carries the running count, its report (every execution and outcome figure) is the report as built, and the sink's error
 *    text is never echoed. D2 the judge rejects a rethrowing, a silent and an altering emitter.
 *  E, the until-then posture. E1 Pi depends on, installs and names in src no H2 producer package (@reactive-fiber/tsx on npm;
 *    FiberOpticsSDK, vibranium-reactive-inference and vibranium-reactive-lenses on PyPI, their pyproject names at the pins), and
 *    rf's sibling SDK entries (result.provenance.sdk_versions fiber_optics, reactive_lenses, reactive_inference), where every render
 *    Pi reads names those producers, are never read. E2 a lexical scan of every src module (literals and identifiers, camelCase split)
 *    finds no H2 record term and no distinctive state word, with a floor and three anchors (the observer, the registry,
 *    telemetry.ts) scanned and quiet. E1's and E2's walks each equal an independent recursive listing of src (node:fs readdirSync
 *    recursive, not filesBelow), so a walk narrowed by a subtree or a file reds whatever the floor's margin. E3 the detector's
 *    controls: flagged lines (every term and word flags one), quiet lines and the residuals' quiet rows.
 * MEASURED PRODUCER FACTS (roster `producers`, read-only git show on the local checkouts, 2026-10-23): the program README at the four
 * pins the epic wb-4nut names (FiberOpticsSDK e803f66c5fb9, ReactiveFiberTSXSDK 76bbbffd9d4a, ReactiveInferenceSDK 485f3615db1e,
 * ReactiveLensesSDK bfe1f4ac7fa0), its blob and every line the filing cites (FO 25, 27, 35, 36, 44, 47; TSX 37, 48; RI 23, 24, 34,
 * 35, 42; RL 37), verbatim. Pi vendors none of them; a producer change is seen only when a cut re-measures the roster.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set (every row's id, label and pins,
 * every pin's witness, which carries its pin id, the constants and vocabularies and every registered test title) is held to the
 * out-of-file roster (test/fixtures/h2-state-promotion-roster.json). OUTSIDE ANCHOR: the filing's row in the tracked bead export
 * (.beads/issues.jsonl, row wb-4nut.10): the acceptance rows' labels are its Acceptance line's clauses, in order, and row E's is its
 * Not P0 line; FO L25's words are read from its Authority line; its Quote and Authority quotes sit inside the roster's measured
 * lines; every gating id it lists heads the roster line it cites. So a row, a publication word or a gating id removed from every
 * literal of this file and the roster still reds.
 * THE RECORD (wb-vgxn, the landing-312 gate's F1: a case could return early, or the registration case go missing, and the file
 * stayed green): every case records its own end in REACHED as `${id}:${count}`, after its last assertion - the judged set at its
 * end, each pin right after its witness comparison - where count is vitest's own tally of the case's assertions
 * (expect.getState().assertionCalls), so an early return, a dropped assertion or a case that echoes its roster witness before
 * measuring leaves its entry absent or its count short; each pin also keeps its witness in MEASURED. The judged set, which runs
 * first, holds the collected task tree to the roster's tests (every title once, in roster order, set to run and not inverted), so
 * a registration case deleted, renamed, skipped or inverted reds there. The registration case holds REACHED to the roster's
 * reached list and MEASURED to the roster's witnesses a second time, then records its own end, and the file-end judge (afterAll)
 * holds that end, so a registration case that returns early or skips itself at run time reds after it has run. The judge reads
 * which cases were selected to run from the collected tree before the first case runs (beforeEach, once): under a test-name filter
 * that deselects the registration case it holds nothing.
 * Not claimed: a pin removed from ROWS, the literal, IMPL and the roster together (the filing anchors rows, clauses and words, not
 * pins); an assertion removed from this file together with its pinned count in the roster; the file-end judge or the selection it
 * reads removed (no claim rides them alone: the registration case still holds the record); every case of the file skipped at once
 * (no case runs to read the tree, and vitest runs no hook for a file with nothing to run); the native provider seam
 * (providers/reactivefiber.ts isPreviewEnvelope, which refuses the same committed shapes before a reading exists) and the control
 * adapters' executions (claude-control.ts, detached-control.ts: their exported outcome tables are read here, their suites execute
 * them).
 * RESIDUALS (named families, each with a pinned quiet row): R-FOREIGN-VALUE the observer knows rf's two observed words only, so a
 * producer VALUE reads not observed, verbatim (A1's VALUE reading); R-LISTED-FOUR the observations note lists at most four distinct
 * words, a fifth is counted and marked, never renamed (A2's five-word note); R-REFUSED-FLAG a missing flag is refused rather than
 * read unknown, since no Pi field holds a commit state (B3's refusals); R-OPTIONAL-COMMIT-SEQ an absent commit_seq reads as the
 * pinned schema's optional null, the noncommitted reading resting on the four stated flags (B3's commit_seq row); R-READ-TIMEOUT an
 * admitted read's timeout reads transport, not uncertain: there is no effect to be uncertain about, and it is never cancelled (C2's
 * read row); R-COUNT-NOT-WORD Pi states a sink drop as a running count on the next delivered event, never as a 'partial' coverage
 * or an INCOMPLETE note (D1's event keys); R-COMPOSED a term assembled at runtime is invisible to E2 (E3 reads 0); R-GENERIC-WORD
 * the generic state words VALUE, ABSENT, PENDING and FAILED are judged at the reader in row A, not scanned, since Pi spells PENDING
 * and FAILED for its own purposes (E3 reads 0); R-COMMENT a comment naming a record is prose, not a reader (E3 reads 0).
 * THE GATE-OPENING SIGNAL: E1 reds when an H2 producer package is depended on, installed or named in src, and E2 when a src module
 * spells a record term or state word: the reader FO-H2-02/03, TSX-H2-04, RI-H2-04/05 or RL-H2-04 calls for reds this census first,
 * and its cut re-pins (a) to (d) at that reader's own display.
 *
 * Display paths added: none. Test-only: no file is written and no process is spawned; src, package.json, node_modules' directory
 * names and the tracker export are only read.
 */
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { afterAll, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { CLAUDE_CONTROL_RECONCILE, CLAUDE_INTERRUPT_OUTCOMES } from "../src/workbench/claude-control.js";
import { DETACHED_CONTROL_VERBS } from "../src/workbench/detached-control.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import {
  buildOperationsTelemetry,
  createTelemetryEmitter,
  type OperationsTelemetry,
  type SuppliedCounters,
  type TelemetryEvent,
} from "../src/workbench/telemetry.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: JsonValue };

const BEAD = "wb-4nut.10";
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "h2-state-promotion-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const PROGRAM_README = "docs/programs/harness2-reactive-evolution-2026-10-20/README.md";
const SCOPE = { workspace: "/fixture/pi-workspace", principal: "fixture-principal" };
const CONTEXT: ReactiveFiberTopologyContext = { scope: SCOPE, seam: "rf-cli", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" };
const NOW = "2026-10-23T00:00:02Z";
/** FO L25's publication states, in the line's order (README.md:25@e803f66c5fb9; the filing's Authority line quotes it). */
const PUBLICATION_WORDS: readonly string[] = ["VALUE", "ABSENT", "PENDING", "SUPPRESSED", "FAILED"];
/** The words of (a) that state no published value. */
const NON_TERMINAL: readonly string[] = ["ABSENT", "PENDING", "SUPPRESSED"];
/** A not-observed status word rf never states, the swap baseline of A1. */
const CONTROL_WORD = "zz-control";
/** The mark the observations note puts for a not-observed word it does not list (reactivefiber-observer.ts UNLISTED). */
const UNLISTED = String.fromCodePoint(0x2026);
/** Two open objects of an rf render result a render-report-shaped record can ride unread. */
const REPORT_CARRIERS: readonly string[] = ["result.render_report", "result.provenance.render_report"];
/** The key of a bare commit flag (no record around it) B1 plants on every object of a render. */
const BARE_FLAG = "committed";
/** The committed shapes, each the one edit that states a commit (the observer's reactivefiberTopology and previewSnapshot fences). */
const COMMITTED_SHAPES: readonly string[] = ["transaction_id", "result.render_id", "result.commit_seq", "result.ephemeral", "result.work.storage_write_count"];
/** The flags that state a render noncommitted and must be stated; commit_seq is the pinned schema's optional one. */
const REQUIRED_FLAGS: readonly string[] = ["transaction_id", "result.render_id", "result.ephemeral", "result.work.storage_write_count"];
const OPTIONAL_FLAG = "result.commit_seq";
const EFFECTFUL: readonly CapabilityDescriptor["effectClass"][] = ["write", "external", "unknown"];
const CAPABILITY_ID = "fixture.effect";
const GRANT = "fixture:effect";
const DEADLINE_MS = 25;
/** The provider-call outcome keys a supplied telemetry count may name (telemetry.ts OUTCOME_KEYS). */
const OUTCOME_KEYS: readonly string[] = ["returned", "validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const SINK_FAILURE = "fixture sink failure zq7";
/** A template placeholder for the detector's control modules, spelled once so no plain string holds one. */
const PLACEHOLDER = `${"$"}{x}`;
/** The H2 producer packages: TSX on npm, the other three on PyPI (their pyproject names at the pins). */
const H2_PACKAGES: readonly string[] = ["@reactive-fiber/tsx", "FiberOpticsSDK", "vibranium-reactive-inference", "vibranium-reactive-lenses"];
/** Any spelling of an H2 producer package: the npm name (bare, a subpath, npm: or a URL) or the three PyPI stems. */
const H2_PACKAGE = /@reactive-fiber\/tsx(?![\w-])|fiber[-_.]?optics|reactive[-_.]?(?:inference|lenses)/i;
/** rf's sibling SDK entries (result.provenance.sdk_versions), where every render Pi reads names the H2 producers. */
const SIBLING_ENTRIES: readonly string[] = ["fiber_optics", "reactive_lenses", "reactive_inference"];
/** H2 record terms; a space is any run of space, underscore, hyphen, dot, colon or slash, matched after camelCase is split, and a
 * term is bounded by any character that is not a letter or digit, so a snake_case or dotted neighbour does not hide it. */
const RECORD_TERMS: readonly string[] = [
  "publication records?", "publication states?", "render reports?", "render attempts?", "committed publications?", "sink diagnostics?",
  "trace sinks?", "usage traces?", "refresh traces?", "owner epochs?", "provider admission", "observation admission",
  "dropped event counts?", "queued versus committed", "(?:fo|tsx|ri|rl) h2 0[0-9]",
];
/** The distinctive producer state words (FO L25, FO L47), matched case-sensitively as whole words. */
const STATE_WORDS: readonly string[] = ["SUPPRESSED", "INCOMPLETE"];
const termPattern = (terms: readonly string[]): RegExp =>
  new RegExp(`(?<![A-Za-z0-9])(?:${terms.map(term => term.replaceAll(" ", "[\\s_.:/-]+")).join("|")})(?![A-Za-z0-9])`, "i");
const RECORD = termPattern(RECORD_TERMS);
const STATE = new RegExp(`(?<![A-Za-z0-9])(?:${STATE_WORDS.join("|")})(?![A-Za-z0-9])`);
/** The modules E2 must scan and find quiet: the readers rows A to D measure. */
const ANCHORS: readonly string[] = ["src/workbench/reactivefiber-observer.ts", "src/workbench/capability-registry.ts", "src/workbench/telemetry.ts"];
/** Sits below the count measured at base 282caa0: 115 src files, every one a .ts module. */
const MODULE_FLOOR = 100;
const RESIDUAL_FAMILIES: readonly string[] = [
  "R-FOREIGN-VALUE", "R-LISTED-FOUR", "R-REFUSED-FLAG", "R-OPTIONAL-COMMIT-SEQ", "R-READ-TIMEOUT", "R-COUNT-NOT-WORD", "R-COMPOSED",
  "R-GENERIC-WORD", "R-COMMENT",
];
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the collected cases and the filing's own notes agree";
const REGISTRATION_TITLE =
  "registration: every case of this file is registered once, in roster order, in run mode, ran before this one and reached its end with its pinned assertion count";
/** The record's ids for the two cases that are not pins. */
const JUDGED_ID = "judged";
const REGISTRATION_ID = "registration";

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the filing's own notes. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) queued value, no flush yields an importer view with no publication (ABSENT/PENDING), never VALUE; PENDING/SUPPRESSED never map to success",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(b) a render attempt with committed=false shows no committed output; a missing flag reads unknown",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) admitted request then client timeout projects 'uncertain'/attempted, never 'cancelled'",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(d) sink dropped > 0 yields coverage 'partial' with an INCOMPLETE note, execution/inference status unchanged",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label: "Not P0: none of these records reach Pi today; gating guard.",
    pins: ["E1", "E2", "E3"],
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
interface RosterProducer {
  readonly repo: string;
  readonly short: string;
  readonly sha: string;
  readonly path: string;
  readonly blob: string;
  readonly lines: Readonly<Record<string, string>>;
}
interface Roster {
  readonly bead: string;
  readonly producers: readonly RosterProducer[];
  readonly constants: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** The ends every case before the registration case records, in run order (`${id}:${count}`). */
  readonly reached: readonly string[];
  /** The registration case's own end, held by the file-end judge. */
  readonly registrationEnd: string;
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.producers) || !isObject(raw.constants)) {
    throw new Error("roster must be an object with bead, producers, constants and rows");
  }
  if (typeof raw.registrationEnd !== "string") throw new Error("roster registrationEnd must be a string");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producers = raw.producers.map((entry: unknown, index: number): RosterProducer => {
    if (!isObject(entry) || typeof entry.repo !== "string" || typeof entry.short !== "string" || typeof entry.sha !== "string" ||
      typeof entry.path !== "string" || typeof entry.blob !== "string" || !isObject(entry.lines) ||
      !Object.values(entry.lines).every(line => typeof line === "string")) {
      throw new Error(`roster producers[${index}] needs a repo, a short name, a sha, a path, a blob and its lines`);
    }
    return { repo: entry.repo, short: entry.short, sha: entry.sha, path: entry.path, blob: entry.blob, lines: entry.lines as Record<string, string> };
  });
  return {
    bead: raw.bead, producers, constants: objectOf(json(raw.constants), "roster constants"), residuals: strings(raw.residuals, "residuals"), rows,
    tests: strings(raw.tests, "tests"), reached: strings(raw.reached, "reached"), registrationEnd: raw.registrationEnd,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function producerLine(short: string, line: number): string {
  const producer = ROSTER.producers.find(entry => entry.short === short);
  return producer?.lines[String(line)] ?? "";
}

/** The filing's own notes in the tracker export: the text rows A to E, FO L25's words and the gating ids are held to. */
function beadNotes(): string {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
function notesLine(notes: string, head: string): string {
  return notes.split("\n").find(entry => entry.startsWith(head)) ?? "";
}
/** The clauses of the notes' first Acceptance line, split at each "; (x) " marker, the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  const line = notesLine(notes, "Acceptance: (a) ");
  if (line === "") return [];
  return line.slice("Acceptance: ".length).replace(/\.$/, "").split(/; (?=\([b-z]\) )/);
}
/** FO L25's words as the filing's Authority line quotes them. */
function authorityWords(notes: string): string[] {
  return /preserve ([A-Z]+(?:\/[A-Z]+)+) and queued-versus-committed/.exec(notesLine(notes, "Authority: "))?.[1]?.split("/") ?? [];
}
/** The single-quoted producer phrases of the Authority line, each with the producer line it cites. */
function authorityQuotes(notes: string): { short: string; line: number; quote: string }[] {
  return [...notesLine(notes, "Authority: ").matchAll(/\b(FO|TSX|RI|RL) L(\d+) '([^']+)'/g)].map(match => ({ short: match[1] ?? "", line: Number(match[2]), quote: match[3] ?? "" }));
}
/** The gating ids the filing lists, each with the producer line it cites. */
function gatingIds(notes: string): { id: string; short: string; line: number }[] {
  const line = notesLine(notes, "Gating artifact: ");
  return [...line.matchAll(/\b((?:FO|TSX|RI|RL)-H2-0\d) [^()]*\((FO|TSX|RI|RL) L(\d+)/g)].map(match => ({ id: match[1] ?? "", short: match[2] ?? "", line: Number(match[3]) }));
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}
function cleanEnvelope(): JsonObject {
  return clone(fullShapeRf(SCOPE.workspace)) as JsonObject;
}
function resultOf(envelope: JsonObject): JsonObject {
  return objectOf(envelope.result, "result");
}
function parentOf(envelope: JsonObject, path: string): { holder: JsonObject; key: string } {
  const steps = path.split(".");
  const key = steps.pop() ?? "";
  let holder = envelope;
  for (const step of steps) holder = objectOf(holder[step], step);
  return { holder, key };
}
/** Every object a JSON value holds (itself included, array elements entered), by dotted path from the value ("" is the value). */
function objectPaths(value: JsonValue, path = ""): string[] {
  if (Array.isArray(value)) return value.flatMap((item, index) => objectPaths(item, path === "" ? String(index) : `${path}.${index}`));
  if (value === null || typeof value !== "object") return [];
  return [path, ...Object.entries(value).flatMap(([key, item]) => objectPaths(item, path === "" ? key : `${path}.${key}`))];
}
/** The object at a dotted path of objectPaths (array indices included). */
function objectAt(root: JsonObject, path: string): JsonObject {
  let holder: JsonValue = root;
  for (const step of path === "" ? [] : path.split(".")) {
    holder = Array.isArray(holder) ? (holder[Number(step)] ?? null) : objectOf(holder, step)[step] ?? null;
  }
  return objectOf(holder, path === "" ? "the envelope" : path);
}
function withRows(statuses: readonly string[]): JsonObject {
  const envelope = cleanEnvelope();
  resultOf(envelope).observations = statuses.map(status => ({ status, freshness: "captured_at_render", replayed: false }));
  return envelope;
}
function project(envelope: JsonObject): ReactiveFiberProjectionTopology {
  return reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: SCOPE.workspace, source: envelope }, CONTEXT);
}
function refusalOf(run: () => unknown): { category: string; message: string } | null {
  try {
    run();
    return null;
  } catch (error) {
    if (error instanceof CapabilityError) return { category: error.category, message: error.message };
    throw error;
  }
}
function snapshotOf(topology: ReactiveFiberProjectionTopology): ReactiveFiberProjectionTopology["snapshots"][number] {
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the projection holds no snapshot");
  return snapshot;
}
/** Every string the projection surfaces: the node's title and status text, the notes and the snapshot's references. */
function surfaced(topology: ReactiveFiberProjectionTopology): string[] {
  const snapshot = snapshotOf(topology);
  return [snapshot.node.title, snapshot.node.statusText, ...topology.diagnostics, ...(snapshot.evidenceRefs ?? []),
    ...[snapshot.nativePayloadRef, snapshot.sourceVersion, snapshot.sourceRevision].filter((text): text is string => typeof text === "string")];
}
function observationsNote(topology: ReactiveFiberProjectionTopology): string | null {
  return topology.diagnostics.find(text => text.startsWith("observations: ")) ?? null;
}
/** The words the observations note lists, in its order. */
function listedWords(note: string | null): string[] {
  return /\(([^()]*)\): partial$/.exec(note ?? "")?.[1]?.split(", ") ?? [];
}

interface WordReading {
  readonly word: string;
  readonly coverage: string;
  readonly tone: string;
  readonly note: string | null;
}
function wordReading(word: string): WordReading {
  const topology = project(withRows([word]));
  const snapshot = snapshotOf(topology);
  return { word, coverage: snapshot.coverage ?? "absent", tone: snapshot.node.statusTone, note: observationsNote(topology) };
}
/** (a)'s judge: a word's reading is never complete or success, carries the word verbatim and never another publication word. */
function promotionFailures(readings: readonly WordReading[]): string[] {
  const failures: string[] = [];
  for (const { word, coverage, tone, note } of readings) {
    if (tone === "success") failures.push(`${word}: success tone`);
    if (coverage === "complete") failures.push(`${word}: complete coverage`);
    if (note === null || !listedWords(note).includes(word)) failures.push(`${word}: not carried verbatim`);
    for (const other of PUBLICATION_WORDS) if (other !== word && note !== null && listedWords(note).includes(other)) failures.push(`${word}: read as ${other}`);
  }
  return failures;
}

type FlagOutcome = { readonly flag: string; readonly kind: "refused"; readonly message: string } | { readonly flag: string; readonly kind: "projected"; readonly clean: boolean };
/** (b)'s judge: a required flag removed is never read (refused), and the optional one removed reads exactly the clean preview. */
function flagFailures(outcomes: readonly FlagOutcome[]): string[] {
  const failures: string[] = [];
  for (const outcome of outcomes) {
    if (REQUIRED_FLAGS.includes(outcome.flag) && outcome.kind !== "refused") failures.push(`${outcome.flag}: a missing flag was read`);
    if (outcome.flag === OPTIONAL_FLAG && (outcome.kind !== "projected" || !outcome.clean)) failures.push(`${outcome.flag}: the optional flag changed the reading`);
  }
  return failures;
}

function descriptorOf(effectClass: CapabilityDescriptor["effectClass"]): CapabilityDescriptor {
  return { id: CAPABILITY_ID, version: "1.0.0", description: "Held fixture capability", inputSchema: { type: "object" }, effectClass, permissions: [GRANT], supportedModes: ["invoke"] };
}
function invocation(signal: AbortSignal = new AbortController().signal): { grants: string[]; signal: AbortSignal } {
  return { grants: [GRANT], signal };
}
async function settledError(call: Promise<JsonValue>): Promise<{ category: string; message: string }> {
  return call.then(
    value => ({ category: "returned", message: JSON.stringify(value) }),
    (error: unknown) => (error instanceof CapabilityError ? { category: error.category, message: error.message } : { category: "thrown", message: String(error) }),
  );
}

interface TimeoutReading {
  readonly effectClass: string;
  readonly category: string;
  readonly message: string;
  readonly attempts: number;
  readonly providerSignalAborted: boolean;
  readonly providerCompletedLate: boolean;
}
/** One admitted request whose client deadline fires: the provider runs, sees the abort and completes 5 ms after it. */
async function admittedTimeout(effectClass: CapabilityDescriptor["effectClass"]): Promise<TimeoutReading> {
  const registry = new CapabilityRegistry({ deadlineMs: DEADLINE_MS, maxInFlight: 1 });
  let attempts = 0;
  let providerSignalAborted = false;
  let providerCompletedLate = false;
  let completed: () => void = () => {};
  const late = new Promise<void>(resolve => {
    completed = resolve;
  });
  registry.register({
    descriptor: descriptorOf(effectClass),
    async invoke(_input, context) {
      attempts += 1;
      return new Promise<JsonValue>(resolve => {
        context.signal.addEventListener("abort", () => {
          providerSignalAborted = true;
          setTimeout(() => {
            providerCompletedLate = true;
            resolve({ completed: true });
            completed();
          }, 5);
        }, { once: true });
      });
    },
  });
  const outcome = await settledError(registry.invoke(CAPABILITY_ID, {}, invocation()));
  await late;
  return { effectClass, ...outcome, attempts, providerSignalAborted, providerCompletedLate };
}
/** (c)'s judge: an admitted request that timed out was attempted once, an effectful one reads uncertain-effect, a read one a
 * transport timeout, each names the deadline and none says cancelled. */
function timeoutFailures(readings: readonly TimeoutReading[]): string[] {
  const failures: string[] = [];
  for (const reading of readings) {
    const expected = reading.effectClass === "read" ? "transport" : "uncertain-effect";
    if (reading.attempts !== 1) failures.push(`${reading.effectClass}: attempted ${reading.attempts} times`);
    if (reading.category !== expected) failures.push(`${reading.effectClass}: ${reading.category}, not ${expected}`);
    if (/cancel/i.test(reading.message)) failures.push(`${reading.effectClass}: reads cancelled`);
    if (!/deadline/.test(reading.message)) failures.push(`${reading.effectClass}: the deadline is not named`);
  }
  return failures;
}

const SUPPLIED = { providerCallOutcomes: { returned: 3, "uncertain-effect": 1 }, uncertainEffects: 1, droppedObservations: 0 };
function reportOf(supplied: SuppliedCounters = SUPPLIED): OperationsTelemetry {
  return buildOperationsTelemetry(new ObservationProjection(), { scope: SCOPE, now: NOW, supplied });
}
interface SinkTrace {
  readonly threw: boolean;
  readonly results: readonly string[];
  readonly dropped: number;
  readonly delivered: readonly TelemetryEvent[];
}
/** One emitter run: a sink that throws on its first event and records the rest, fed the same report twice. */
function sinkTrace(report: OperationsTelemetry): SinkTrace {
  const delivered: TelemetryEvent[] = [];
  let fail = true;
  const emitter = createTelemetryEmitter({
    emit(event) {
      if (fail) {
        fail = false;
        throw new Error(SINK_FAILURE);
      }
      delivered.push(event);
    },
  }, { enabled: true });
  let threw = false;
  const results: string[] = [];
  try {
    results.push(emitter.emit(report), emitter.emit(report));
  } catch {
    threw = true;
  }
  return { threw, results, dropped: emitter.droppedEvents(), delivered };
}
/** (d)'s judge: a drop never reaches the caller, is counted on the next delivered event and changes no figure of its report. */
function sinkFailures(trace: SinkTrace, report: OperationsTelemetry): string[] {
  const failures: string[] = [];
  if (trace.threw) failures.push("the sink failure reached the caller");
  if (trace.results[0] !== "dropped-sink-error") failures.push(`the failed delivery read ${trace.results[0] ?? "nothing"}`);
  const next = trace.delivered[0];
  if (next === undefined) failures.push("no event was delivered after the drop");
  else {
    if (next.droppedEvents !== 1) failures.push(`the next event counts ${next.droppedEvents ?? "no"} drop`);
    if (!isDeepStrictEqual(next.report, report)) failures.push("the delivered report differs from the report as built");
  }
  if (trace.dropped !== 1) failures.push(`the emitter counts ${trace.dropped} drops`);
  return failures;
}

function filesBelow(directory: string): string[] {
  const found: string[] = [];
  const entries: Dirent[] = readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...filesBelow(path));
    else if (entry.isFile()) found.push(path);
  }
  return found;
}
/** A module's literal texts (string, template and regular expression literals) and identifiers, in source order. */
function lexiconOf(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const items: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) items.push(node.text);
    else if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) items.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return items;
}
/** The detector: every record-term hit (camelCase split, case-insensitive) and state-word hit (case-sensitive) in a lexicon. */
function hitsOf(items: readonly string[]): string[] {
  const hits: string[] = [];
  for (const item of items) {
    const split = item.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    const record = RECORD.exec(split)?.[0];
    if (record !== undefined) hits.push(record);
    const state = STATE.exec(item)?.[0];
    if (state !== undefined) hits.push(state);
  }
  return hits;
}
function srcModules(): { file: string; items: string[] }[] {
  return filesBelow(join(REPO, "src")).map(path => ({ file: relative(REPO, path).split("\\").join("/"), items: lexiconOf(path, readFileSync(path, "utf8")) }));
}
/** Every file below src by an independent route (node:fs recursive readdir, not filesBelow), sorted: what E1's and E2's walks equal. */
function listedSrc(): string[] {
  return readdirSync(join(REPO, "src"), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(REPO, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}
function walkedFiles(modules: readonly { readonly file: string }[]): string[] {
  return modules.map(({ file }) => file).sort();
}
/** Whether an edit of the clean render's result.provenance.sdk_versions leaves its projection byte-identical. */
function siblingUnread(clean: string, edit: (versions: JsonObject) => void): boolean {
  const envelope = cleanEnvelope();
  edit(objectOf(objectOf(resultOf(envelope).provenance, "provenance").sdk_versions, "sdk_versions"));
  return JSON.stringify(project(envelope)) === clean;
}
/** The package names package.json declares, across every dependency list. */
function declaredPackages(): string[] {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  const lists = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].map(key => manifest[key]).filter(isObject);
  const bundled = [manifest.bundleDependencies, manifest.bundledDependencies].filter(Array.isArray).flat().filter((name): name is string => typeof name === "string");
  return [...lists.flatMap(list => Object.keys(list)), ...bundled];
}
/** The package directories node_modules holds at its top level, scoped ones as @scope/name. */
function installedPackages(): string[] {
  const root = join(REPO, "node_modules");
  return readdirSync(root, { withFileTypes: true }).flatMap(entry =>
    entry.name.startsWith("@") && entry.isDirectory() ? readdirSync(join(root, entry.name)).map(name => `${entry.name}/${name}`) : [entry.name]);
}

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const clean = snapshotOf(project(cleanEnvelope()));
    expect([clean.coverage, clean.node.statusTone], "the clean render, with no observation row").toEqual(["complete", "success"]);
    const control = JSON.stringify(project(withRows([CONTROL_WORD])));
    for (const word of PUBLICATION_WORDS) {
      // Verbatim: the word's projection is the control word's with the word swapped in, so nothing but the listed word moves.
      expect(JSON.stringify(project(withRows([word]))), `${word} rides as the control word does`).toBe(control.replaceAll(CONTROL_WORD, word));
    }
    const readings = PUBLICATION_WORDS.map(wordReading);
    expect(promotionFailures(readings), "Pi's reading of each publication word").toEqual([]);
    return json({ pin: "A1", clean: [clean.coverage, clean.node.statusTone], readings });
  },
  A2: async () => {
    const duplicated = observationsNote(project(withRows(["ABSENT", "PENDING", "PENDING", "SUPPRESSED", "FAILED"])));
    expect(listedWords(duplicated), "each distinct word listed once, in row order").toEqual(["ABSENT", "PENDING", "SUPPRESSED", "FAILED"]);
    for (const word of ["ABSENT", "PENDING", "SUPPRESSED", "FAILED"]) expect((duplicated ?? "").split(word).length - 1, `${word} occurs once`).toBe(1);
    // R-LISTED-FOUR's quiet row: a fifth distinct word is counted and marked, never renamed to another word.
    const five = observationsNote(project(withRows(PUBLICATION_WORDS)));
    expect(listedWords(five)).toEqual([...PUBLICATION_WORDS.slice(0, 4), UNLISTED]);
    return json({ pin: "A2", notes: [duplicated, five] });
  },
  A3: async () => {
    const pi = PUBLICATION_WORDS.map(wordReading);
    const promoting = pi.map(reading => (NON_TERMINAL.includes(reading.word) ? { ...reading, coverage: "complete", tone: "success", note: null } : reading));
    const minting = pi.map(reading => (NON_TERMINAL.includes(reading.word) ? { ...reading, note: (reading.note ?? "").replace(`(${reading.word})`, "(VALUE)") } : reading));
    const collapsing = pi.map(reading => ({ ...reading, note: (reading.note ?? "").replace(`(${reading.word})`, "(pending)") }));
    const failures = { pi: promotionFailures(pi), promoting: promotionFailures(promoting), minting: promotionFailures(minting), collapsing: promotionFailures(collapsing) };
    expect(failures.pi, "Pi's readings meet the judge").toEqual([]);
    expect([failures.promoting, failures.minting, failures.collapsing].map(list => list.length > 0), "every falsifier fails the judge").toEqual([true, true, true]);
    return json({ pin: "A3", failures });
  },
  B1: async () => {
    const clean = project(cleanEnvelope());
    const snapshot = snapshotOf(clean);
    const claims = surfaced(clean).filter(text => /(?<!non)committed/i.test(text));
    expect(claims, "a surfaced string claiming a commit").toEqual([]);
    const carried: string[] = [];
    for (const carrier of REPORT_CARRIERS) {
      for (const committed of [false, true, null]) {
        const envelope = cleanEnvelope();
        const { holder, key } = parentOf(envelope, carrier);
        holder[key] = { attempt: 1, status: "discarded", ...(committed === null ? {} : { committed }) };
        if (JSON.stringify(project(envelope)) === JSON.stringify(clean)) carried.push(`${carrier}:${committed ?? "absent"}`);
      }
    }
    expect(carried, "every planted render report carried unread").toHaveLength(REPORT_CARRIERS.length * 3);
    // wb-vgxn (the 312 gate's F2, P05): a bare commit flag, false or true, on every object of the render, is carried unread or refused
    // by a strict object as a typed validation error; a projection that moves, or any other refusal, is a read.
    const bare: { unread: string[]; refused: string[]; read: string[] } = { unread: [], refused: [], read: [] };
    for (const path of objectPaths(cleanEnvelope())) {
      for (const committed of [false, true]) {
        const envelope = cleanEnvelope();
        objectAt(envelope, path)[BARE_FLAG] = committed;
        const refusal = refusalOf(() => project(envelope));
        const unread = refusal === null && JSON.stringify(project(envelope)) === JSON.stringify(clean);
        const outcome = refusal === null ? (unread ? "unread" : "read") : refusal.category === "validation" ? "refused" : "read";
        bare[outcome].push(`${path === "" ? "envelope" : path}:${committed}`);
      }
    }
    expect(bare.read, "a bare commit flag read into the projection").toEqual([]);
    expect(bare.unread, "the result and its provenance carry a bare commit flag unread").toEqual(expect.arrayContaining(["result:false", "result:true", "result.provenance:false", "result.provenance:true"]));
    return json({
      pin: "B1", kind: snapshot.kind, statusText: snapshot.node.statusText, preview: clean.diagnostics.find(text => text.startsWith("ephemeral ")) ?? null,
      claims, carried, bare,
    });
  },
  B2: async () => {
    const committed: Readonly<Record<string, JsonValue>> = {
      transaction_id: `rft_${"c".repeat(22)}`, "result.render_id": `rfr_${"b".repeat(22)}`, "result.commit_seq": 1, "result.ephemeral": false,
      "result.work.storage_write_count": 1,
    };
    const refusals = COMMITTED_SHAPES.map(shape => {
      const envelope = cleanEnvelope();
      const { holder, key } = parentOf(envelope, shape);
      holder[key] = committed[shape] ?? null;
      const refusal = refusalOf(() => project(envelope));
      expect(refusal?.category, `${shape} stating a commit`).toBe("validation");
      expect(refusal?.message, `${shape}'s refusal names it`).toContain(key);
      return { shape, refusal };
    });
    return json({ pin: "B2", refusals });
  },
  B3: async () => {
    const clean = JSON.stringify(project(cleanEnvelope()));
    const outcomes: FlagOutcome[] = [...REQUIRED_FLAGS, OPTIONAL_FLAG].map(flag => {
      const envelope = cleanEnvelope();
      const { holder, key } = parentOf(envelope, flag);
      Reflect.deleteProperty(holder, key);
      const refusal = refusalOf(() => project(envelope));
      return refusal === null ? { flag, kind: "projected", clean: JSON.stringify(project(envelope)) === clean } : { flag, kind: "refused", message: refusal.message };
    });
    const defaulting: FlagOutcome[] = outcomes.map(outcome => ({ flag: outcome.flag, kind: "projected", clean: true }));
    const failures = { pi: flagFailures(outcomes), defaulting: flagFailures(defaulting) };
    expect(failures.pi, "Pi never reads a missing flag").toEqual([]);
    expect(failures.defaulting, "a defaulting reader fails the judge").toHaveLength(REQUIRED_FLAGS.length);
    return json({ pin: "B3", outcomes, failures });
  },
  C1: async () => {
    const readings: TimeoutReading[] = [];
    for (const effectClass of EFFECTFUL) readings.push(await admittedTimeout(effectClass));
    expect(timeoutFailures(readings), "Pi's admitted timeouts").toEqual([]);
    expect(readings.map(reading => [reading.providerSignalAborted, reading.providerCompletedLate]), "the provider saw the stop and completed after it").toEqual(EFFECTFUL.map(() => [true, true]));
    return json({ pin: "C1", readings });
  },
  C2: async () => {
    // A request still queued at its deadline: the provider ran only for the request holding the slot.
    const held = new CapabilityRegistry({ deadlineMs: DEADLINE_MS, maxInFlight: 1 });
    let attempts = 0;
    let release: () => void = () => {};
    held.register({
      descriptor: descriptorOf("external"),
      async invoke() {
        attempts += 1;
        return new Promise<JsonValue>(resolve => {
          release = () => resolve({ released: true });
        });
      },
    });
    const holding = settledError(held.invoke(CAPABILITY_ID, {}, invocation()));
    const queued = await settledError(held.invoke(CAPABILITY_ID, {}, invocation()));
    const holder = await holding;
    release();
    const queuedReading = { holder, queued, attempts, admission: { ...held.admission() } };
    expect([holder.category, queued.category, attempts], "the queued request was never attempted").toEqual(["uncertain-effect", "unavailable", 1]);
    // R-READ-TIMEOUT's quiet row: an admitted read's timeout is a transport failure naming the deadline.
    const read = await admittedTimeout("read");
    expect(timeoutFailures([read])).toEqual([]);
    // A caller's abort of a request still queued: the registry says cancelled, and the provider never ran for it.
    const waiting = new CapabilityRegistry({ deadlineMs: 5_000, maxInFlight: 1 });
    let waitingAttempts = 0;
    let free: () => void = () => {};
    waiting.register({
      descriptor: descriptorOf("external"),
      async invoke() {
        waitingAttempts += 1;
        return new Promise<JsonValue>(resolve => {
          free = () => resolve({ released: true });
        });
      },
    });
    const first = settledError(waiting.invoke(CAPABILITY_ID, {}, invocation()));
    const caller = new AbortController();
    const second = settledError(waiting.invoke(CAPABILITY_ID, {}, invocation(caller.signal)));
    caller.abort();
    const aborted = await second;
    free();
    const firstOutcome = await first;
    expect([aborted.category, firstOutcome.category, waitingAttempts], "the aborted request was never attempted").toEqual(["transport", "returned", 1]);
    const cancelledTerminals = Object.entries(CLAUDE_INTERRUPT_OUTCOMES).filter(([, outcome]) => outcome === "cancelled").map(([terminal]) => terminal);
    const supplied = (outcomes: Readonly<Record<string, number>>): JsonValue => json(reportOf({ providerCallOutcomes: outcomes }).providerCallOutcomes);
    return json({
      pin: "C2", queued: queuedReading, read, aborted: { aborted, first: firstOutcome, attempts: waitingAttempts },
      tables: { claudeCancelledTerminals: cancelledTerminals, detachedCancel: { ...DETACHED_CONTROL_VERBS.cancel }, claudeUncertain: CLAUDE_CONTROL_RECONCILE.includes("It remains uncertain") },
      outcomes: { keys: [...OUTCOME_KEYS], cancelled: supplied({ cancelled: 1 }), uncertain: supplied({ "uncertain-effect": 1 }) },
    });
  },
  C3: async () => {
    const pi: TimeoutReading[] = [];
    for (const effectClass of EFFECTFUL) pi.push(await admittedTimeout(effectClass));
    const cancelling = pi.map(reading => ({ ...reading, category: "transport", message: `Capability ${CAPABILITY_ID} was cancelled.` }));
    const refusing = pi.map(reading => ({ ...reading, category: "unavailable", message: `Capability ${CAPABILITY_ID} never ran before its deadline.`, attempts: 0 }));
    const succeeding = pi.map(reading => ({ ...reading, category: "returned", message: "{\"completed\":true}" }));
    const failures = { pi: timeoutFailures(pi), cancelling: timeoutFailures(cancelling), refusing: timeoutFailures(refusing), succeeding: timeoutFailures(succeeding) };
    expect(failures.pi, "Pi's admitted timeouts meet the judge").toEqual([]);
    expect([failures.cancelling, failures.refusing, failures.succeeding].map(list => list.length > 0), "every falsifier fails the judge").toEqual([true, true, true]);
    return json({ pin: "C3", failures });
  },
  D1: async () => {
    const report = reportOf();
    const trace = sinkTrace(report);
    expect(sinkFailures(trace, report), "Pi's emitter over a failing sink").toEqual([]);
    const oversized: TelemetryEvent[] = [];
    const tiny = createTelemetryEmitter({
      emit(event) {
        oversized.push(event);
      },
    }, { enabled: true, maxBytes: 64 });
    const tinyResults = [tiny.emit(report), tiny.emit(report)];
    const echoed = [...trace.results, ...tinyResults, ...trace.delivered.map(event => JSON.stringify(event))].filter(text => text.includes(SINK_FAILURE));
    expect(echoed, "the sink's error text").toEqual([]);
    return json({
      pin: "D1", results: trace.results, dropped: trace.dropped, threw: trace.threw,
      delivered: trace.delivered.map(event => ({ keys: Object.keys(event), droppedEvents: event.droppedEvents ?? null, reportAsBuilt: isDeepStrictEqual(event.report, report) })),
      figures: { providerCallOutcomes: report.providerCallOutcomes, uncertainEffects: report.uncertainEffects, droppedObservations: report.droppedObservations },
      oversized: { results: tinyResults, dropped: tiny.droppedEvents(), delivered: oversized.length },
    });
  },
  D2: async () => {
    const report = reportOf();
    const pi = sinkTrace(report);
    const rethrowing: SinkTrace = { ...pi, threw: true, results: [] };
    const silent: SinkTrace = { ...pi, delivered: pi.delivered.map(({ droppedEvents: _dropped, ...event }) => event), dropped: 0 };
    const altered = { ...report, uncertainEffects: { state: "measured" as const, value: 2, source: "supplied" as const } };
    const altering: SinkTrace = { ...pi, delivered: pi.delivered.map(event => ({ ...event, report: altered })) };
    const failures = { pi: sinkFailures(pi, report), rethrowing: sinkFailures(rethrowing, report), silent: sinkFailures(silent, report), altering: sinkFailures(altering, report) };
    expect(failures.pi, "Pi's emitter meets the judge").toEqual([]);
    expect([failures.rethrowing, failures.silent, failures.altering].map(list => list.length > 0), "every falsifier fails the judge").toEqual([true, true, true]);
    return json({ pin: "D2", failures });
  },
  E1: async () => {
    const declared = declaredPackages().filter(name => H2_PACKAGE.test(name));
    const installed = installedPackages().filter(name => H2_PACKAGE.test(name));
    const modules = srcModules();
    const listed = listedSrc();
    expect(walkedFiles(modules), "E1's walk is every file below src (an independent recursive listing)").toEqual(listed);
    const named = modules.flatMap(({ file, items }) => items.filter(item => H2_PACKAGE.test(item)).map(item => `${file}: ${item}`));
    expect(declared, "an H2 producer package in package.json").toEqual([]);
    expect(installed, "an H2 producer package in node_modules").toEqual([]);
    expect(named, "a src literal or identifier naming an H2 producer package").toEqual([]);
    expect(H2_PACKAGES.map(name => H2_PACKAGE.test(name)), "the pattern reads every producer package name").toEqual(H2_PACKAGES.map(() => true));
    // rf names the producers in its sibling SDK entries; changing or removing them leaves the projection byte-identical.
    const clean = JSON.stringify(project(cleanEnvelope()));
    const unread = SIBLING_ENTRIES.flatMap(entry => [
      siblingUnread(clean, versions => {
        objectOf(versions[entry], entry).distribution_version = "9.9.9";
      }),
      siblingUnread(clean, versions => {
        Reflect.deleteProperty(versions, entry);
      }),
    ]);
    expect(unread, "every sibling entry, changed and removed, is unread").toEqual(SIBLING_ENTRIES.flatMap(() => [true, true]));
    return json({ pin: "E1", declared, installed, named, siblingEntries: SIBLING_ENTRIES.length, unread: unread.every(Boolean), walkComplete: isDeepStrictEqual(walkedFiles(modules), listed) });
  },
  E2: async () => {
    const modules = srcModules();
    const listed = listedSrc();
    expect(walkedFiles(modules), "E2's walk is every file below src (an independent recursive listing)").toEqual(listed);
    const nonModules = modules.filter(({ file }) => !file.endsWith(".ts")).map(({ file }) => file);
    const hits = modules.flatMap(({ file, items }) => hitsOf(items).map(hit => `${file}: ${hit}`));
    expect(nonModules, "a src file that is not a .ts module").toEqual([]);
    expect(modules.length, "src modules scanned").toBeGreaterThanOrEqual(MODULE_FLOOR);
    expect(hits, "a src literal or identifier spelling an H2 record term or state word").toEqual([]);
    const anchors = ANCHORS.map(file => {
      const found = modules.find(entry => entry.file === file);
      return { file, scanned: found !== undefined && found.items.length > 0, hits: found === undefined ? null : hitsOf(found.items).length };
    });
    expect(anchors.map(anchor => anchor.scanned), "every anchor module was scanned").toEqual(ANCHORS.map(() => true));
    return json({ pin: "E2", aboveFloor: modules.length >= MODULE_FLOOR, walkComplete: isDeepStrictEqual(walkedFiles(modules), listed), nonModules, hits, anchors });
  },
  E3: async () => {
    const lexicon = (text: string): string[] => lexiconOf("control.ts", text);
    const flagged: Readonly<Record<string, string>> = {
      "publication records?": "const label = \"publication record\";",
      "publication states?": "const publicationState = 1;",
      "render reports?": "const RENDER_REPORT = 1;",
      "render attempts?": "const renderAttempts = [];",
      "committed publications?": `const note = \`committed publication: ${PLACEHOLDER}\`;`,
      "sink diagnostics?": "const key = \"sink_diagnostics\";",
      "trace sinks?": "const traceSink = 1;",
      "usage traces?": "const kind = \"usage-trace\";",
      "refresh traces?": "const refreshTrace = 1;",
      "owner epochs?": "const field = \"owner_epoch\";",
      "provider admission": "const providerAdmission = 1;",
      "observation admission": "const step = \"observation admission\";",
      "dropped event counts?": "const droppedEventCount = 0;",
      "queued versus committed": "const rule = \"queued-versus-committed\";",
      "(?:fo|tsx|ri|rl) h2 0[0-9]": "const gate = \"FO-H2-02\";",
      SUPPRESSED: "const word = \"SUPPRESSED\";",
      INCOMPLETE: "const DEVTOOLS = /INCOMPLETE/;",
    };
    const flaggedReads = Object.entries(flagged).map(([term, line]) => ({ term, hits: hitsOf(lexicon(line)) }));
    expect(flaggedReads.map(read => read.hits.length > 0), "every term and word flags its control line").toEqual([...RECORD_TERMS, ...STATE_WORDS].map(() => true));
    expect(Object.keys(flagged)).toEqual([...RECORD_TERMS, ...STATE_WORDS]);
    // Pi's own neighbours, quiet: its preview note, its drop counter, its aggregate trace word, its event gap and its abort text.
    const quiet = [
      "notes.push('render reported errors: partial, not a clean render');", "const droppedEvents = 0;", "const trace = 'incomplete';",
      "const completeness = 'partial-gap';", `throw new Error(\`Capability ${PLACEHOLDER} was cancelled while waiting for admission.\`);`,
    ].map(line => hitsOf(lexicon(line)).length);
    // The residuals' quiet rows: R-COMPOSED, R-GENERIC-WORD and R-COMMENT read 0.
    const residualRows = {
      "R-COMPOSED": hitsOf(lexicon("const key = [\"render\", \"report\"].join(\" \");")).length,
      "R-GENERIC-WORD": hitsOf(lexicon("const FAILED = new Set(['PENDING', 'ABSENT', 'VALUE']);")).length,
      "R-COMMENT": hitsOf(lexicon("// a publication record and a render report, in prose\nconst x = 1;")).length,
    };
    return json({ pin: "E3", flagged: flaggedReads, quiet, residualRows });
  },
};

/** THE RECORD: each case's end, in run order, as `${id}:${count}` (vitest's tally of the case's assertions), pushed only after the
 * case's last assertion; a pin's right after its witness comparison. */
const REACHED: string[] = [];
/** Each pin's witness as its case measured it; the registration case compares it against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** The titles selected to run, read from the collected task tree before any case runs (a test-name filter deselects the rest). */
const SELECTED: string[] = [];

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a collected task tree holds, in registration order; self marks the case doing the reading. */
function registered(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registered(child.tasks, self));
  }
  return walked;
}
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;

// The selection, read once from the collected tree before the first case runs (no case has run, so every mode is the collected one).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registered(task.file.tasks).filter(entry => entry.mode === "run").map(entry => entry.name));
});
// The file-end judge: a registration case selected to run reached its own end, after every other case's, with its pinned count.
afterAll(() => {
  if (!SELECTED.includes(REGISTRATION_TITLE)) return;
  expect(REACHED, "every case of this file reached its end, the registration case last").toEqual([...ROSTER.reached, ROSTER.registrationEnd]);
});

describe("wb-4nut.10 H2 state-promotion census (TSX-HARNESS2-REACTIVE-EVOLUTION-R10, gated on FO-H2-02/03, TSX-H2-04, RI-H2-04/05 and RL-H2-04, until-then leg)", () => {
  it(JUDGED_TITLE, ({ task }) => {
    // The collected cases, read before any other case runs: a registration case deleted, renamed, skipped or inverted reds here.
    const collected = registered(task.file.tasks, task);
    expect(collected.map(entry => entry.name), "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(modeLine), "every registered test is set to run and not inverted").toEqual([]);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:3", "D:2", "E:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, publicationWords: PUBLICATION_WORDS, nonTerminal: NON_TERMINAL, controlWord: CONTROL_WORD, reportCarriers: REPORT_CARRIERS, bareFlag: BARE_FLAG,
      committedShapes: COMMITTED_SHAPES, requiredFlags: REQUIRED_FLAGS, optionalFlag: OPTIONAL_FLAG, effectful: EFFECTFUL, deadlineMs: DEADLINE_MS,
      outcomeKeys: OUTCOME_KEYS, h2Packages: H2_PACKAGES, siblingEntries: SIBLING_ENTRIES, recordTerms: RECORD_TERMS, stateWords: STATE_WORDS,
      anchors: ANCHORS, moduleFloor: MODULE_FLOOR, residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, ...ROSTER.constants, residuals: [...ROSTER.residuals] });
    // The producer facts: the program README at the four pins, each with its blob and the cited lines.
    expect(ROSTER.producers.map(entry => [entry.short, entry.sha.length, entry.path, entry.blob.length, Object.keys(entry.lines)])).toEqual([
      ["FO", 40, PROGRAM_README, 40, ["25", "27", "35", "36", "44", "47"]],
      ["TSX", 40, PROGRAM_README, 40, ["37", "48"]],
      ["RI", 40, PROGRAM_README, 40, ["23", "24", "34", "35", "42"]],
      ["RL", 40, PROGRAM_README, 40, ["37"]],
    ]);
    // The external anchor: the acceptance rows' labels are the clauses of the filing's Acceptance line, in order, row E's label is
    // its Not P0 line, FO L25's words are its Authority line's, its quotes sit in the measured lines and its gating ids head them.
    const notes = beadNotes();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = acceptanceClauses(notes);
    expect(clauses, "the filing's acceptance clauses").toHaveLength(4);
    expect(ROWS.filter(row => /^\([a-z]\) /.test(row.label)).map(row => row.label)).toEqual(clauses);
    expect(ROWS.filter(row => !/^\([a-z]\) /.test(row.label)).map(row => row.label)).toEqual([notesLine(notes, "Not P0: ")]);
    expect(authorityWords(notes), "FO L25's words as the filing quotes them").toEqual([...PUBLICATION_WORDS]);
    const quotes = authorityQuotes(notes);
    expect(quotes.map(({ short, line }) => `${short} L${line}`)).toEqual(["FO L25", "TSX L48", "RI L23", "FO L47"]);
    expect(quotes.filter(({ short, line, quote }) => !producerLine(short, line).includes(quote)), "an Authority quote missing from its measured line").toEqual([]);
    const quoted = /^Quote: '([^']+)' FO [^:]+:(\d+)@/.exec(notesLine(notes, "Quote: "));
    expect(producerLine("FO", Number(quoted?.[2])).endsWith(quoted?.[1] ?? "-"), "the filing's Quote is FO's measured line").toBe(true);
    const gates = gatingIds(notes);
    expect(gates.map(gate => gate.id)).toEqual(["FO-H2-02", "TSX-H2-04", "RI-H2-04", "FO-H2-03", "RI-H2-05", "RL-H2-04"]);
    expect(gates.filter(({ id, short, line }) => !producerLine(short, line).startsWith(`| ${id} |`)), "a gating id that does not head its measured line").toEqual([]);
    expect(notesLine(notes, "Gating artifact: ").endsWith("Shipped: no.")).toBe(true);
    REACHED.push(`${JUDGED_ID}:${expect.getState().assertionCalls}`);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          MEASURED[pin] = witness;
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(REGISTRATION_TITLE, ({ task }) => {
    const walked = registered(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: Registered): string => `${modeLine(entry)} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    // THE RECORD: every case before this one reached its end - the judged set first, then each pin right after its witness
    // comparison - with its pinned assertion count, and each pin's measured witness equals the roster's a second time.
    const pins = ROWS.flatMap(row => row.pins);
    expect(REACHED, "every case before this one reached its end, in run order, with its pinned assertion count").toEqual([...ROSTER.reached]);
    expect(REACHED.map(entry => entry.split(":")[0]), "the reached ids are the judged set, then the rows' pins").toEqual([JUDGED_ID, ...pins]);
    expect(MEASURED, "every pin's measured witness, compared against the roster a second time").toStrictEqual(Object.fromEntries(pins.map(pin => [pin, rosterWitness(pin)])));
    REACHED.push(`${REGISTRATION_ID}:${expect.getState().assertionCalls}`);
  });
});
