/**
 * wb-fb2z.3 (TSX-COMPONENT-ASSEMBLY-R3, program-triage-2026-10-22). Statement (bead notes, full form): "If Pi ever surfaces TSX
 * host-evaluation documents (rftsx.host-evaluation-result) from a worker (gated TSX-IO-05 rftsx-ilhva typed failed document;
 * tests/unit/embedding/worker-failure.test.ts absent at 76bbbffd9d4a), a worker EOF, crash, timeout or malformed result frame shall
 * be surfaced as the producer's typed failure and Pi shall never present a success block, reuse a stale success, or upgrade coverage
 * or tone for it" (ReactiveFiberTSXSDK docs/programs/component-assembly-2026-10-18/RFCLI-INTEROP.md:29@76bbbffd9d4a). Acceptance
 * (owner filing, verbatim; the labels of rows B, C and D): "(a) Pi's rf reader: an envelope with has_errors / degraded / failed
 * status never renders a success tone (existing wb-973.2 and wb-973.10 pins unchanged); (b) armed on landing: a fixture typed failed
 * rftsx.host-evaluation-result document echoes status failed, renders zero success blocks and reuses no prior success for the same
 * key; (c) timeout/EOF fixtures map to typed unavailable/failed, never to transport or success (wb-ksz.6 child-crash shape)."
 *
 * Pi surfaces no host-evaluation document today. The producer ships the document (status closed at success, pending, recovered and
 * failed) and a typed failed reply on the evaluation deadline (src/embedding/timeout-result.ts, RFTSX_HOST_EVALUATION_TIMEOUT), but
 * not the gating artifact: the typed failed document on a worker EOF, crash or malformed result frame (TSX-IO-05, rftsx-ilhva,
 * tests/unit/embedding/worker-failure.test.ts) is absent at the program pin and at the distribution the installed rf runs. Pi hosts
 * no TSX worker and loads no producer module. The one path a TSX worker's end reaches Pi today is rf: the installed rf hosts the
 * worker itself (integrations/tsx/worker_entry.ts under deno; runtime/tsx_worker.py the host client) and types every end of it
 * before Pi reads anything (CLI-TSX-A32): RF_TSX_PROTOCOL_ERROR for a stdout closed on a clean exit and for a frame off its
 * schema, RF_TSX_WORKER_CRASHED for a worker that died without answering, RF_TSX_WORKER_TIMEOUT for a bound that fired, each exit
 * 7 as a non-recovered primary or kept as an error row on a recovered render (CLI-TSX-D-CRASH (a)). So the statement's trigger has
 * not fired: acceptance (a) and (c) are read where they already apply, at Pi's rf seam, and (b) waits for the artifact. The census:
 *  A, the trigger's inventory, empty today. A1 no judged module (identifiers and regular expressions always; string and template
 *    literals, constant-folded literals and JSX text when NAME-LIKE - no white space once trimmed; comments never) and no judged
 *    JSON file (its keys always, its name-like string values; a file that does not parse is read token by token) names a
 *    host-evaluation document or the producer's worker-host functions (DOC_FAMILY, read over words), and the walk reaches its
 *    floors and anchors and meets no symlink and no unreadable file; A2 no judged module loads the producer's embedding entry
 *    (EMBEDDING_FAMILY: where serveEmbeddedWorker and every host-evaluation function live - the root index carries none of them)
 *    through an import or export declaration, an import-equals require, an import type, or as the first argument of any call or new
 *    expression, nor names the worker engine as a command there (ENGINE_FAMILY: deno, the engine rf's runtime lock pins); A3 the
 *    nearest TSX worker readers Pi has (NEAREST_READERS) are reached by the reader, judged and quiet; A4 each exemption is walked,
 *    not judged and spells DOC_FAMILY, so lifting it reds A1; neither loads the entry or names the engine.
 *  B, acceptance (a), on the reader adapter (src/workbench/reactivefiber-observer.ts reactivefiberTopology) over the full-shape
 *    render fixture (test/helpers/rf-render-fixture.ts) on the rf-cli seam. B1 the positive control: the clean render projects
 *    complete and successful, with a TSX worker spawned and with a TSX engine identity alike (worker evidence rides references and
 *    one note, never coverage or tone); B2, B3 and B4 one pin per status word of the clause, in its order: has_errors (the summary
 *    flag, the flag beside a spawned worker, an error row the summary counts), degraded (a degraded observation row, an unsatisfied
 *    view contract), failed (an rf refusal, an observation row whose status word is failed): each partial or a failure, never
 *    success, and each named in a note or the status text; B5 the existing wb-973.2 and wb-973.10 pins are registered unchanged:
 *    both describes once in test/workbench-reactivefiber-observer.test.ts and every case title measured under them still there.
 *  C, acceptance (c), at the rf seam. C1 the native provider (src/workbench/providers/reactivefiber.ts nativeReactiveFiberRender,
 *    one spawn of a stand-in rf first on PATH each) answers every worker end the statement names - EOF, crash, timeout, malformed
 *    result frame, each in the producer's typed refusal - with the typed unavailable refusal naming the code, never transport and
 *    never a reading, while the same refusal at exit 0 is the provider's contradiction (transport): the category reads the
 *    envelope and the exit, not a constant; C2 the adapter projects each refusal as a failure naming its code, never success; C3
 *    the recovered render (the worker row kept, the summary counting it, one worker spawned) passes the provider unchanged and
 *    projects partial, never success; C4 the wb-ksz.6 child-crash shape is registered: the K1-K3 typed-failure rows of
 *    test/workbench-child-crash-faults.test.ts under their describe; C5 rf's measured default TSX bounds sit under the provider's
 *    own deadline, so with them rf types a worker timeout before Pi's deadline can fire.
 *  D, acceptance (b), gated. D1 the measured artifact is unshipped: at both producer pins the worker-failure suite is absent (the
 *    harness present, the deadline reply already typed failed, the status words closed at four), the distribution pin is rf's
 *    runtime lock, and the bead row states it unshipped and names the program pin's document sites; a re-measure that ships it reds
 *    D1 until (b) lands with a Pi reader; D2 no registered test title in test/ names a claim of (b) (CLAIM_FAMILY), so no Pi row
 *    claims the proof before the artifact ships.
 * THE WALK: every regular file below the repository root, at any depth, in name order; the root entries SKIPPED_ROOTS (git's
 * data, the tracker export - bead rows quote the statement -, installed dependencies, build, coverage and Forge outputs) are
 * skipped at the root only, and the two EXEMPT files are walked but not judged. Modules (MODULE_EXTENSIONS) and JSON files are
 * judged; prose is walked and never judged. The working tree is read, so an untracked plant is read, and a copy of this file or its
 * roster anywhere else in the walk is a finding. The JSON judge reads test/fixtures/rf-result-keys.json, the frozen roster of the
 * keys rf's render result carries, so a re-capture that adds a host-evaluation key reds A1.
 * OVER-READ (disclosed): an identifier or a name-like literal using a DOC_FAMILY phrase in another sense, or deno named as a
 * command for another purpose, is read as a finding; none exists today, and such a finding is re-judged, never silenced. Pi's own
 * workflow interpreter is called "the embedded worker" in prose (src/workbench/process-env.ts), so DOC_FAMILY names the
 * producer's serveEmbeddedWorker, never a bare embedded worker; the queued tsx-unshipped-surface roster names src/host/
 * evaluation.mts paths, so the document nouns are the result, request, attempt, document, mode and limit words, never a bare host
 * evaluation.
 * MEASURED PRODUCER FACTS (roster `producer`; read-only git show, ls-tree and grep on the local ReactiveFiberTSXSDK checkout and
 * the installed rf's package, 2026-10-23): the program pin 76bbbffd9d4a (0.1.668) and the distribution source 5da03a7d49f4
 * (0.1.649, rf 0.1.832's integrations/tsx/runtime-lock.json, engine deno 2.9.7) both carry tests/unit/embedding/worker-harness.ts
 * and no tests/unit/embedding/worker-failure.test.ts, the same src/embedding/worker.ts and timeout-result.ts blobs (the deadline
 * reply a failed document with RFTSX_HOST_EVALUATION_TIMEOUT), and docs/schemas/host-evaluation-result.schema.json with the status
 * words success, pending, recovered and failed; the schema tag is named by four src/ and python/ files at the program pin (the bead
 * row's four) and three at the distribution. The gating row is docs/programs/component-assembly-2026-10-18/BEADS-2026-10-21.md:30
 * at the program pin (rftsx-ilhva, TSX-IO-05). rf 0.1.832 (`rf --json --version` result.version) types the worker's ends at
 * runtime/tsx_worker.py (WORKER_ENDS, each with its site), registers each code at exit 7 with its identity, own and SDK keys
 * (domain/diagnostics.py _tsx_spec), and bounds an attempt at 30 000 ms, a round at 10 000 ms and the worker's CPU at 30 000 ms
 * (application/config.py:1189-1191). The roster reader refuses a producer object whose keys differ from the measured set, so a
 * re-measure under a renamed key is refused, never read as absent.
 * FIXTURES: every envelope is CONSTRUCTED on the full-shape render fixture: the refusals put the producer's code, its registered
 * metadata keys in registry order and obviously fake values on a context.render failure envelope (exit 7); the recovered render
 * keeps the crash row at its registered error severity beside a summary counting it and one worker spawn, as CLI-TSX-D-CRASH (a)
 * describes (constructed, not captured). Every variant leaves the fixture's blocks and necessity records as they are.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness (each carries its pin id), the scan constants, the worker ends, the existing pins, the residual families and the
 * registered test titles are held to the out-of-file roster (test/fixtures/tsx-worker-document-roster.json). OUTSIDE ANCHORS: the
 * owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-fb2z.3): every acceptance clause sits verbatim in
 * exactly one row label and the trigger phrase in row A's, every row carries one of them, the status words of clause (a) are the
 * words of B2, B3 and B4 in order, the worker ends of the statement are WORKER_ENDS in order, its quote and citation equal the
 * roster's and its "Shipped: no" sentence and site list are read by D1; B5 reads the observer test file and C4 the child-crash
 * file, so a pin set removed from every literal of this file and the roster still reds there. Not claimed: A1-A4, B1, B5, C1-C5,
 * D1 or D2 removed from ROWS, the literal, IMPL and the roster together (no outside anchor counts those pins).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); no registered test or suite title spells DOC_FAMILY or
 * CLAIM_FAMILY (describe titles mask them).
 * RESIDUALS (named families, each with pinned quiet rows in the witnesses): R-COMPOSED a document name, a specifier or a command
 * assembled at runtime from a variable, a call or an array join (A1 composed, joined; A2 composedSpecifier, composedCommand);
 * R-RENAMED the worker-host surface reached through a vendored or renamed package and bound under names outside DOC_FAMILY (A2
 * renamedPackage); R-MANIFEST an import map, a manifest or any JSON naming the entry, which A2 never reads as a load (A2 importMap;
 * the landed test/fixtures/rf-tsx-remote-hook-roster.json records rf's import map, which names it); R-LOOKALIKE a non-ASCII look-alike letter or an inserted invisible (A1 lookalike, invisible); R-ENCODED an
 * encoding the compiler does not cook (A1 rot13); R-PROSE comments and literals or JSON values with white space inside (A1
 * comment, proseLiteral, jsonProse); R-OUTSIDE a file below a skipped root entry (A1 planted node_modules/, dist/, .beads/,
 * .forge/, build/, coverage/); R-PASSTHROUGH a host-evaluation document riding an additive key of an otherwise clean render: the
 * reader does not read it, so the projection stays complete and successful (B1 passthrough; rf's own CLI-TSX-A32 keeps a failed
 * evaluation off ok, so the clean render this row constructs is not one rf emits); R-DEADLINE an rf whose bounds or retries reach
 * the provider's own deadline: Pi's deadline answers first, as transport (C5 deadlineCategory).
 * Display paths added: none. Test-only: the stand-in rf and the planted trees live in makeScratch scratch only.
 */
import { chmodSync, type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = JsonValue;
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-tsx-worker-document-census.test.ts";
const ROSTER_FILE = "test/fixtures/tsx-worker-document-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-fb2z.3";
/** The producer document's self-identifying tag (docs/schemas/host-evaluation-result.schema.json, properties.schema const). */
const SCHEMA_TAG = "rftsx.host-evaluation-result";
/** A1: the document's nouns and the producer's worker-host functions, read over a text's words (wordsOf). */
const DOC_FAMILY =
  /\b(?:host evaluation (?:results?|requests?|attempts?|documents?|modes?|limits?)|evaluate (?:for host|host requests?)|serve embedded workers?)\b/;
/** A2: the producer's embedding entry, in any specifier form (bare, npm:, jsr:, URL), a version segment after the package included. */
const EMBEDDING = "@reactive-fiber/tsx/embedding";
const EMBEDDING_FAMILY = /@reactive-fiber\/tsx(?:@[\w.+-]+)?\/embedding(?![\w-])/i;
/** A2: the worker engine named as the command of a call's first argument. */
const ENGINE_FAMILY = /^(?:\S*\/)?deno(?:\.exe)?(?:\s|$)/i;
/** D2: what a test title claiming (b) would have to name, read over the title's own text. */
const CLAIM_FAMILY = /success[\s_-]*blocks?|stale[\s_-]*success|prior[\s_-]*success|host[\s_-]*evaluation|typed[\s_-]*failed[\s_-]*documents?/i;
/** Masks for describe titles, so a report holding this file's titles stays quiet. */
const FAMILY_TEXT =
  /host[\s_.-]*evaluation|evaluate[\s_.-]*(?:for[\s_.-]*)?host|serve[\s_.-]*embedded[\s_.-]*workers?|success[\s_.-]*blocks?|stale[\s_.-]*success|prior[\s_.-]*success|typed[\s_.-]*failed[\s_.-]*documents?/gi;
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
const JSON_EXTENSIONS = [".json"];
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const EXEMPT = [SELF, ROSTER_FILE];
/** Each floor sits below the count measured at base f69ce85 (826 files before this cut; src 115, test 443, qa 62 modules; 50 JSON; 402
 * judged test and census modules registering 9251 literal titles). */
const FLOORS = { files: 700, modules: { src: 100, test: 380, qa: 55 }, json: 40, testModules: 330, titles: 8000 };
/** Files the walk must reach, each with a token its bytes carry: a root page, the TSX worker reader, rf's frozen result-key roster,
 * the manifest and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/reactivefiber-observer.ts", "ENGINE_METRIC_KEYS"],
  ["test/fixtures/rf-result-keys.json", "engine_metrics"],
  ["package.json", "@tintinweb/pi-subagents"],
  ["media/screenshot.png", "PNG"],
];
/** The nearest TSX worker readers Pi has, each with what the reader must read in it: an identifier or a load specifier. */
const NEAREST_READERS: readonly (readonly [string, "identifier" | "specifier", string])[] = [
  ["src/workbench/reactivefiber-observer.ts", "identifier", "ENGINE_METRIC_KEYS"],
  ["src/workbench/providers/reactivefiber.ts", "specifier", "node:child_process"],
  ["src/workflow/runtime.ts", "specifier", "node:worker_threads"],
  ["test/workbench-child-crash-faults.test.ts", "identifier", "runWorkflow"],
  ["test/workbench-native-rf-tsx-preview.test.ts", "identifier", "nativeReactiveFiberPreview"],
];
const OBSERVER_TEST = "test/workbench-reactivefiber-observer.test.ts";
const CHILD_CRASH_TEST = "test/workbench-child-crash-faults.test.ts";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
const DEADLINE_MESSAGE = "RF preview exceeded the execution deadline.";
const RESIDUAL_FAMILIES = ["R-COMPOSED", "R-RENAMED", "R-MANIFEST", "R-LOOKALIKE", "R-ENCODED", "R-PROSE", "R-OUTSIDE", "R-PASSTHROUGH", "R-DEADLINE"];
const CYRILLIC_O = String.fromCodePoint(0x043e);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);
/** Every scan constant, as the roster holds it. */
const SCAN = {
  schemaTag: SCHEMA_TAG,
  docFamily: `${DOC_FAMILY.source}/${DOC_FAMILY.flags}`,
  embedding: EMBEDDING,
  embeddingFamily: `${EMBEDDING_FAMILY.source}/${EMBEDDING_FAMILY.flags}`,
  engineFamily: `${ENGINE_FAMILY.source}/${ENGINE_FAMILY.flags}`,
  claimFamily: `${CLAIM_FAMILY.source}/${CLAIM_FAMILY.flags}`,
  moduleExtensions: MODULE_EXTENSIONS,
  jsonExtensions: JSON_EXTENSIONS,
  skippedRoots: SKIPPED_ROOTS,
  exempt: EXEMPT,
  floors: FLOORS,
  walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
  nearestReaders: NEAREST_READERS.map(([path, kind, token]) => `${path}:${kind}:${token}`),
};
const FROZEN_TITLE = "the judged set: the frozen shape, the out-of-file roster and the bead row agree";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells a judged family";

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
      "(trigger, absent today) If Pi ever surfaces TSX host-evaluation documents: no judged module or JSON file names a host-evaluation document or the producer's worker-host functions, no module loads the producer's embedding entry or names the worker engine as a command, the nearest TSX worker readers Pi has are reached and quiet, and each exemption is load-bearing",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(a) Pi's rf reader: an envelope with has_errors / degraded / failed status never renders a success tone (existing wb-973.2 and wb-973.10 pins unchanged): the clean render is the positive control, worker evidence included, and each status word demotes it on its own",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label:
      "(c) timeout/EOF fixtures map to typed unavailable/failed, never to transport or success (wb-ksz.6 child-crash shape): at the rf seam, the one path a TSX worker's end reaches Pi today, every worker end the statement names is the typed unavailable refusal and a failure projection, the recovered render stays partial, and rf types a timeout before Pi's deadline",
    pins: ["C1", "C2", "C3", "C4", "C5"],
  },
  {
    id: "D",
    label:
      "(b) armed on landing: a fixture typed failed rftsx.host-evaluation-result document echoes status failed, renders zero success blocks and reuses no prior success for the same key: gated - the measured typed failed worker document is unshipped at both producer pins and no Pi test claims the proof",
    pins: ["D1", "D2"],
  },
];
/** The status word each of B2, B3 and B4 carries: the words of clause (a), in its order. */
const STATUS_PINS: readonly (readonly [string, string])[] = [
  ["B2", "has_errors"],
  ["B3", "degraded"],
  ["B4", "failed"],
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
interface ProducerPin {
  readonly label: string;
  readonly repo: string;
  readonly sha: string;
  readonly version: string;
  readonly packageJsonBlob: string;
  readonly workerFailureSuite: boolean;
  readonly workerHarness: boolean;
  readonly timeoutReply: boolean;
  readonly statusWords: readonly string[];
  readonly documentSites: readonly string[];
  readonly gatingRow: string | null;
}
interface WorkerEndFact {
  readonly end: string;
  readonly code: string;
  readonly site: string;
}
interface Producer {
  readonly rfVersion: string;
  readonly runtimeLock: { readonly name: string; readonly version: string; readonly source: string; readonly engine: string };
  readonly rfBoundsMs: { readonly attempt: number; readonly round: number; readonly cpu: number };
  readonly rfWorkerEnds: readonly WorkerEndFact[];
  readonly pins: readonly ProducerPin[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly existingPins: { readonly [describe: string]: readonly string[] };
  readonly childCrashShape: { readonly [describe: string]: readonly string[] };
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) throw new Error(`roster ${field} must be a count`);
  return value;
}
function flag(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`roster ${field} must be a boolean`);
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
/** Refuses an object whose keys differ from `keys`, so a re-measure written under a renamed or misspelled key never reads as absent. */
function exactKeys(value: { [key: string]: unknown }, keys: readonly string[], field: string): void {
  const found = Object.keys(value).sort();
  if (JSON.stringify(found) !== JSON.stringify([...keys].sort())) throw new Error(`roster ${field} keys must be exactly ${keys.join(", ")}; found ${found.join(", ")}`);
}
function titleTable(value: unknown, field: string): { [describe: string]: string[] } {
  const table = objectOf(value, field);
  return Object.fromEntries(Object.entries(table).map(([name, titles]) => [name, strings(titles, `${field}[${name}]`)]));
}
function producerPinOf(value: unknown, field: string): ProducerPin {
  const pin = objectOf(value, field);
  exactKeys(pin, ["label", "repo", "sha", "version", "packageJsonBlob", "workerFailureSuite", "workerHarness", "timeoutReply", "statusWords", "documentSites", "gatingRow"], field);
  return {
    label: text(pin.label, `${field}.label`),
    repo: text(pin.repo, `${field}.repo`),
    sha: text(pin.sha, `${field}.sha`),
    version: text(pin.version, `${field}.version`),
    packageJsonBlob: text(pin.packageJsonBlob, `${field}.packageJsonBlob`),
    workerFailureSuite: flag(pin.workerFailureSuite, `${field}.workerFailureSuite`),
    workerHarness: flag(pin.workerHarness, `${field}.workerHarness`),
    timeoutReply: flag(pin.timeoutReply, `${field}.timeoutReply`),
    statusWords: strings(pin.statusWords, `${field}.statusWords`),
    documentSites: strings(pin.documentSites, `${field}.documentSites`),
    gatingRow: pin.gatingRow === null ? null : text(pin.gatingRow, `${field}.gatingRow`),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !isObject(raw.scan)) throw new Error("roster needs rows, producer and scan objects");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const producer = raw.producer;
  exactKeys(producer, ["rfVersion", "runtimeLock", "rfBoundsMs", "rfWorkerEnds", "pins"], "producer");
  const lock = objectOf(producer.runtimeLock, "producer.runtimeLock");
  exactKeys(lock, ["name", "version", "source", "engine"], "producer.runtimeLock");
  const bounds = objectOf(producer.rfBoundsMs, "producer.rfBoundsMs");
  exactKeys(bounds, ["attempt", "round", "cpu"], "producer.rfBoundsMs");
  if (!Array.isArray(producer.rfWorkerEnds) || !Array.isArray(producer.pins)) throw new Error("roster producer.rfWorkerEnds and producer.pins must be lists");
  const ends = producer.rfWorkerEnds.map((entry: unknown, index: number): WorkerEndFact => {
    const end = objectOf(entry, `producer.rfWorkerEnds[${index}]`);
    exactKeys(end, ["end", "code", "site"], `producer.rfWorkerEnds[${index}]`);
    return { end: text(end.end, "end"), code: text(end.code, "code"), site: text(end.site, "site") };
  });
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    scan: scan as JsonObject,
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      runtimeLock: {
        name: text(lock.name, "producer.runtimeLock.name"),
        version: text(lock.version, "producer.runtimeLock.version"),
        source: text(lock.source, "producer.runtimeLock.source"),
        engine: text(lock.engine, "producer.runtimeLock.engine"),
      },
      rfBoundsMs: {
        attempt: count(bounds.attempt, "producer.rfBoundsMs.attempt"),
        round: count(bounds.round, "producer.rfBoundsMs.round"),
        cpu: count(bounds.cpu, "producer.rfBoundsMs.cpu"),
      },
      rfWorkerEnds: ends,
      pins: producer.pins.map((pin: unknown, index: number) => producerPinOf(pin, `producer.pins[${index}]`)),
    },
    existingPins: titleTable(raw.existingPins, "existingPins"),
    childCrashShape: titleTable(raw.childCrashShape, "childCrashShape"),
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
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
/** The status words clause (a) lists: "an envelope with <w> / <w> / <w> status never". */
function statusWordsOf(clause: string): string[] {
  return /an envelope with (.+?) status never/.exec(clause)?.[1]?.split(" / ") ?? [];
}
/** The worker ends the full statement names: "a worker <end>, <end>, <end> or <end> shall be surfaced". */
function workerEndsOf(notes: string): string[] {
  const named = /a worker ([^.;]+?) shall be surfaced as the producer's typed failure/.exec(notes)?.[1];
  return named === undefined ? [] : named.split(/, | or /);
}
/** The filing's quote and citation, from its first "Quote: " line. */
function quoteOf(notes: string): { quote: string | undefined; citation: string | undefined } {
  const match = /^Quote: '(.+)' (\S+)\.$/m.exec(notes);
  return { quote: match?.[1], citation: match?.[2] };
}
/** The document sites the filing's Gating line names: "named in <site>, <site> and <site>)". */
function gatingSitesOf(notes: string): string[] {
  const named = /rftsx\.host-evaluation-result named in ([^)]+)\)/.exec(notes)?.[1];
  return named === undefined ? [] : named.split(/, | and /);
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
/** A name-like text: no white space once trimmed. A consumer names a document kind or a function this way; prose never is. */
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

interface ModuleReading {
  readonly documents: string[];
  readonly specifiers: string[];
  readonly embeddingLoads: string[];
  readonly engineCommands: string[];
  readonly identifiers: Set<string>;
}
/** One module, parsed under its own script kind: its DOC_FAMILY spellings (A1), its module specifiers and the literal first
 * argument of every call or new expression, the embedding loads among them and the engine commands (A2). Comments are never read. */
function readModule(path: string, source: string): ModuleReading {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const documents: string[] = [];
  const specifiers: string[] = [];
  const firstArguments: string[] = [];
  const identifiers = new Set<string>();
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  // An identifier or a regex is always judged, a literal only when it is name-like.
  const judge = (node: ts.Node, kind: string, value: string): void => {
    if (!(kind === "identifier" || kind === "regex" || isNameLike(value))) return;
    if (DOC_FAMILY.test(wordsOf(value))) documents.push(`${path}:${line(node)} ${kind}: ${value}`);
  };
  const load = (node: ts.Node | undefined, into: string[]): void => {
    const value = node === undefined ? undefined : fold(node);
    if (value !== undefined) into.push(value);
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
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) load(node.moduleSpecifier, specifiers);
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) load(node.moduleReference.expression, specifiers);
    if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) load(node.argument.literal, specifiers);
    // Any call or new expression's first argument: a dynamic import, require, require.resolve, a created require, new URL, a spawn.
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) load(node.arguments?.[0], firstArguments);
    ts.forEachChild(node, visit);
  };
  visit(file);
  const loads = [...specifiers, ...firstArguments];
  return {
    documents,
    specifiers: loads,
    embeddingLoads: loads.filter(specifier => EMBEDDING_FAMILY.test(specifier)).map(specifier => `${path}: ${specifier}`),
    engineCommands: firstArguments.filter(argument => ENGINE_FAMILY.test(argument)).map(argument => `${path}: ${argument}`),
    identifiers,
  };
}

/** One JSON file's DOC_FAMILY spellings: every key and every name-like string value, read as words (a file that does not parse
 * is read as text, token by token). */
function readJson(path: string, source: string): string[] {
  const documents: string[] = [];
  const judge = (kind: string, value: string): void => {
    if (DOC_FAMILY.test(wordsOf(value))) documents.push(kind === "text" ? `${path}: text` : `${path}: ${kind}: ${value}`);
  };
  const visit = (value: unknown): void => {
    if (typeof value === "string") {
      if (isNameLike(value)) judge("value", value);
    } else if (Array.isArray(value)) {
      for (const item of value) visit(item);
    } else if (isObject(value)) {
      for (const [key, item] of Object.entries(value)) {
        judge("key", key);
        visit(item);
      }
    }
  };
  let value: unknown;
  try {
    value = JSON.parse(source);
  } catch {
    for (const token of source.split(/\s+/)) if (token.length > 0) judge("text", token);
    return documents;
  }
  visit(value);
  return documents;
}

interface TreeReading {
  readonly walk: Walk;
  readonly judged: string[];
  readonly modules: Map<string, ModuleReading>;
  readonly json: Map<string, string[]>;
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and every judge over it; the exempt files are walked but not judged. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const modules = new Map<string, ModuleReading>();
  const jsonFiles = new Map<string, string[]>();
  const anchors = new Map<string, boolean>();
  for (const file of judged) {
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
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  const anchorsWalked = WALK_ANCHORS.every(([path]) => anchors.get(path) === true);
  return { walk, judged, modules, json: jsonFiles, anchorsWalked };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
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

/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | null>>): TreeReading {
  const root = makeScratch("tsx-worker-document-tree-");
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

/** The judges over one snippet read as `path`, or one JSON text. */
const documentsIn = (path: string, source: string): boolean => readModule(path, source).documents.length > 0;
const loadsEmbedding = (path: string, source: string): boolean => readModule(path, source).embeddingLoads.length > 0;
const namesEngine = (path: string, source: string): boolean => readModule(path, source).engineCommands.length > 0;
const jsonDocuments = (source: string): boolean => readJson("c.json", source).length > 0;

interface RegisteredTitle {
  readonly describe: string | undefined;
  readonly title: string;
}
/** A test module's registered titles: every it, test or describe call (or its .each, .skip, .todo, .only, .concurrent form)
 * whose title folds to a literal, each with the innermost describe it sits in. */
function registeredTitles(path: string, source: string): RegisteredTitle[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const found: RegisteredTitle[] = [];
  const kindOf = (callee: ts.Expression): string | undefined => {
    if (ts.isIdentifier(callee)) return callee.text;
    if (ts.isPropertyAccessExpression(callee)) return kindOf(callee.expression);
    if (ts.isCallExpression(callee)) return kindOf(callee.expression);
    return undefined;
  };
  const visit = (node: ts.Node, inside: string | undefined): void => {
    if (ts.isCallExpression(node)) {
      const kind = kindOf(node.expression);
      const first = node.arguments[0];
      const title = first === undefined ? undefined : fold(first);
      if ((kind === "it" || kind === "test" || kind === "describe") && title !== undefined) {
        if (kind === "describe") {
          found.push({ describe: inside, title });
          for (const argument of node.arguments) visit(argument, title);
          return;
        }
        found.push({ describe: inside, title });
      }
    }
    ts.forEachChild(node, child => visit(child, inside));
  };
  visit(file, undefined);
  return found;
}
/** The case titles registered directly under `describe` (cases of a nested describe excluded), and how often it is registered. */
function casesUnder(path: string, describeTitle: string): { registered: number; titles: string[] } {
  const titles = registeredTitles(path, readFileSync(join(REPO, path), "utf8"));
  const describes = new Set(titles.filter(entry => entry.describe !== undefined).map(entry => entry.describe));
  const nested = new Set(titles.filter(entry => entry.describe === describeTitle && describes.has(entry.title)).map(entry => entry.title));
  return {
    registered: titles.filter(entry => entry.title === describeTitle).length,
    titles: titles.filter(entry => entry.describe === describeTitle && !nested.has(entry.title)).map(entry => entry.title),
  };
}

const ROOT = REPO;
const CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
function recordOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
/** The full-shape render with `result` keys replaced, `provenance` keys merged and the envelope's diagnostics replaced; the
 * fixture's blocks and necessity records are never touched. */
function renderWith(result: JsonObject = {}, diagnostics: Json[] = [], provenance: JsonObject = {}): JsonObject {
  const envelope = fullShapeRf(ROOT);
  const base = recordOf(envelope.result, "fullShapeRf result");
  return { ...envelope, diagnostics, result: { ...base, provenance: { ...recordOf(base.provenance, "fullShapeRf provenance"), ...provenance }, ...result } };
}
/** One rf diagnostic in the CLI's six-key shape. */
function rfRow(code: string, metadata: JsonObject): JsonObject {
  return { code, severity: "error", message: `${code} fixture message`, hint: "fixture hint", source: null, metadata };
}
/** A context.render refusal: the primary error row, a null result, the workspace kept. */
function refusalOf(code: string, metadata: JsonObject): JsonObject {
  return { ...fullShapeRf(ROOT), ok: false, result: null, diagnostics: [rfRow(code, metadata)] };
}
function observationRow(status: string, degraded: boolean): JsonObject {
  return {
    observation_id: `rfl_${"5".repeat(22)}`, lens_key: "fixture.lens", binding_ref: "binding:fixture/fixture.lens", value_digest: null, parsed_value_digest: null,
    status, code: null, freshness: "captured_at_render", replayed: false, required: false, degraded, started_at: "2026-10-23T00:00:00.000000Z", elapsed_ms: 3, exit_code: 0,
  };
}
const summary = (errors: number): JsonObject => ({ errors, warnings: 0, has_errors: errors > 0, has_warnings: false });
const spawned: JsonObject = { engine_metrics: { tsx_worker_spawns: 1, tsx_resource_rounds: 0 } };
const tsxIdentity: JsonObject = {
  sdk_versions: {
    ...recordOf(recordOf(recordOf(fullShapeRf(ROOT).result, "result").provenance, "provenance").sdk_versions, "sdk_versions"),
    tsx_runtime: { distribution_version: "2.9.7", contract_fingerprint: "unknown" },
    tsx_sdk: { distribution_version: "0.1.649", contract_fingerprint: `sha256:${"3".repeat(64)}` },
  },
};

interface Projection {
  readonly coverage: string;
  readonly tone: string;
  readonly statusText: string;
  readonly notes: readonly string[];
}
/** The adapter's projection of one envelope read through the provider contract on the rf-cli seam. */
function project(envelope: JsonObject): Projection {
  const topology = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope }, CONTEXT);
  const node = topology.snapshots[0];
  if (node === undefined) throw new Error("the adapter projected no snapshot");
  return { coverage: String(node.coverage), tone: String(node.node.statusTone), statusText: node.node.statusText, notes: [...topology.diagnostics] };
}
/** A projection's classes, and whether a note or the status text names `reason`. */
function classes(projection: Projection, reason: RegExp): JsonObject {
  return { coverage: projection.coverage, tone: projection.tone, named: [projection.statusText, ...projection.notes].some(entry => reason.test(entry)) };
}

/** The identity keys rf's TSX rows carry first and the SDK keys last (domain/diagnostics.py _tsx_spec), obviously fake values. */
const IDENTITY: JsonObject = { component_id: "fixture.component", component_instance_id: "fixture.component:main", definition_path: "components/fixture.tsx" };
const SDK_NONE: JsonObject = { sdk_code: null, sdk_message: null };
interface WorkerEnd extends WorkerEndFact {
  readonly metadata: JsonObject;
}
/** Each worker end the statement names, in its order, in the refusal rf 0.1.832 types it as (the roster's measured sites). */
const WORKER_ENDS: readonly WorkerEnd[] = [
  {
    end: "EOF", code: "RF_TSX_PROTOCOL_ERROR", site: "runtime/tsx_worker.py:1338",
    metadata: { ...IDENTITY, phase: "evaluate", reason: "the worker closed its stdout and exited 0 before answering 'evaluate-1'", ...SDK_NONE },
  },
  {
    end: "crash", code: "RF_TSX_WORKER_CRASHED", site: "runtime/tsx_worker.py:1346",
    metadata: { ...IDENTITY, exit_status: 134, signal: null, stderr_digest: `sha256:${"7".repeat(64)}`, stderr_first_line: null, ...SDK_NONE },
  },
  {
    end: "timeout", code: "RF_TSX_WORKER_TIMEOUT", site: "runtime/tsx_worker.py:1217",
    metadata: { ...IDENTITY, phase: "evaluate", timeout_ms: 30000, ...SDK_NONE },
  },
  {
    end: "malformed result frame", code: "RF_TSX_PROTOCOL_ERROR", site: "runtime/tsx_worker.py:1290",
    metadata: { ...IDENTITY, phase: "evaluate", reason: "frame.kind: expected evaluate_response", ...SDK_NONE },
  },
];
/** The recovered render (CLI-TSX-D-CRASH (a)): the crash row kept at its error severity, the summary counting it, one spawn. */
function recoveredRender(): JsonObject {
  const crash = WORKER_ENDS.find(entry => entry.end === "crash");
  if (crash === undefined) throw new Error("WORKER_ENDS carries no crash end");
  return renderWith({ diagnostics_summary: summary(1), ...spawned }, [rfRow(crash.code, crash.metadata)]);
}

const PATH_BEFORE = process.env.PATH ?? "";
interface NativeOutcome {
  readonly outcome: JsonObject;
  readonly source: Json | undefined;
}
/** One native provider call against a stand-in rf first on PATH that prints `envelope` and exits `exit`: how the provider answered
 * (a reading or a refusal, with its category and message) and how often the stand-in was spawned. */
async function nativeOutcome(envelope: JsonObject, exit: number): Promise<NativeOutcome> {
  const folder = makeScratch("tsx-worker-document-rf-");
  try {
    const log = join(folder, "spawns.log");
    const script = join(folder, "rf");
    writeFileSync(
      script,
      `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, "spawn\\n");\nprocess.stdout.write(${JSON.stringify(JSON.stringify(envelope))});\nprocess.exit(${exit});\n`,
    );
    chmodSync(script, 0o700);
    process.env.PATH = `${folder}:${PATH_BEFORE}`;
    let outcome: JsonObject;
    let source: Json | undefined;
    try {
      const reading = await nativeReactiveFiberRender({ model: "m", task: "t" }, ROOT);
      source = recordOf(reading, "reading").source;
      outcome = { kind: "reading" };
    } catch (error) {
      outcome = error instanceof CapabilityError ? { kind: "refusal", category: error.category, message: error.message } : { kind: "thrown", message: String(error) };
    }
    const spawns = readFileSync(log, "utf8").split("\n").filter(entry => entry.length > 0).length;
    return { outcome: { ...outcome, spawns }, source };
  } finally {
    process.env.PATH = PATH_BEFORE;
    removeScratch(folder);
  }
}

/** The provider's own deadline, read from its source: the delay of the setTimeout that stops the child with "deadline", and the
 * category of the CapabilityError thrown with the deadline message. */
function providerDeadline(): { ms: number | undefined; category: string | undefined } {
  const file = ts.createSourceFile(PROVIDER, readFileSync(join(REPO, PROVIDER), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let ms: number | undefined;
  let category: string | undefined;
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "setTimeout") {
      const [callback, delay] = node.arguments;
      if (callback !== undefined && delay !== undefined && ts.isNumericLiteral(delay) && callback.getText(file).includes('stop("deadline")')) ms = Number(delay.text.replace(/_/g, ""));
    }
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "CapabilityError") {
      const [kind, message] = node.arguments ?? [];
      if (kind !== undefined && message !== undefined && fold(message) === DEADLINE_MESSAGE) category = fold(kind);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { ms, category };
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json | Promise<Json>>> = {
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
    const modules = [...tree.modules.values()].flatMap(reading => reading.documents);
    const jsonFiles = [...tree.json.values()].flat();
    expect({ modules, jsonFiles }, "host-evaluation document spellings outside the exemptions (the trigger's inventory)").toStrictEqual({ modules: [], jsonFiles: [] });
    const head = "host-evaluation";
    const controls = {
      schemaTag: documentsIn("c.ts", `const tag = "${SCHEMA_TAG}";\n`),
      typeName: documentsIn("c.ts", "type HostEvaluationResult = { status: string };\n"),
      parseFunction: documentsIn("c.ts", "export function parseHostEvaluationResult(value: unknown) { return value; }\n"),
      constantCase: documentsIn("c.js", "export const HOST_EVALUATION_MODES = [];\n"),
      requestKey: documentsIn("c.ts", "const frame = { host_evaluation_request: {} };\n"),
      attemptLiteral: documentsIn("c.mjs", 'const kind = "host-evaluation-attempt";\n'),
      documentNoun: documentsIn("c.ts", "const hostEvaluationDocuments = [];\n"),
      evaluateForHost: documentsIn("c.ts", "const reply = evaluateForHost(request);\n"),
      evaluateHostRequest: documentsIn("c.ts", "const reply = evaluateHostRequest(request);\n"),
      serveWorker: documentsIn("c.ts", "serveEmbeddedWorker({ module });\n"),
      folded: documentsIn("c.ts", `const tag = "rftsx." + "${head}" + "-result";\n`),
      escaped: documentsIn("c.ts", 'const tag = "rftsx.host-evaluation-\\u0072esult";\n'),
      regex: documentsIn("c.ts", "const tagged = /host-evaluation-result/;\n"),
      jsonKey: jsonDocuments('{"host_evaluation_result":{"status":"failed"}}'),
      jsonValue: jsonDocuments(`{"schema":"${SCHEMA_TAG}"}`),
      jsonUnparsed: jsonDocuments(`{"schema": "${SCHEMA_TAG}",}`),
      comment: documentsIn("c.ts", "// a host-evaluation result\nexport {};\n"),
      proseLiteral: documentsIn("c.ts", 'const note = "no host evaluation result is read here";\n'),
      jsonProse: jsonDocuments('{"note":"Pi reads no host evaluation result today"}'),
      bareHostEvaluation: documentsIn("c.ts", 'const path = "src/host/evaluation.mts";\n'),
      interfaceEvaluation: documentsIn("c.ts", "export class InterfaceEvaluation {}\n"),
      piEmbeddedWorker: documentsIn("c.ts", "const embeddedWorker = new Worker(source);\n"),
      hostEvaluate: documentsIn("c.ts", "const hostEvaluate = 1;\n"),
      composed: documentsIn("c.ts", `const head = "${head}";\nconst tag = head + "-result";\n`),
      joined: documentsIn("c.ts", `const tag = ["${head}", "result"].join("-");\n`),
      lookalike: documentsIn("c.ts", `const tag = "h${CYRILLIC_O}st-evaluation-result";\n`),
      invisible: documentsIn("c.ts", `const tag = "ho${ZERO_WIDTH_SPACE}st-evaluation-result";\n`),
      rot13: documentsIn("c.ts", 'const tag = "ubfg-rinyhngvba-erfhyg";\n'),
    };
    const planted = plantedTree({
      "src/reader.ts": `export const TAG = "${SCHEMA_TAG}";\n`,
      "test/fixtures/worker.json": '{"host_evaluation_result":{}}\n',
      "nested/node_modules/pkg/index.js": "export const hostEvaluationResult = 1;\n",
      "notes/plan.md": "a host evaluation result\n",
      "node_modules/pkg/index.js": "export const hostEvaluationResult = 1;\n",
      "dist/index.js": "export const hostEvaluationResult = 1;\n",
      ".beads/issues.jsonl": `{"title":"${SCHEMA_TAG}"}\n`,
      ".forge/report.json": '{"host_evaluation_result":1}\n',
      "build/reader.ts": "export const hostEvaluationResult = 1;\n",
      "coverage/reader.ts": "export const hostEvaluationResult = 1;\n",
      "src/link.ts": null,
    });
    const flaggedIn = (path: string): boolean =>
      planted.walk.symlinks.includes(path) || (planted.modules.get(path)?.documents.length ?? 0) > 0 || (planted.json.get(path)?.length ?? 0) > 0;
    const walkControls = Object.fromEntries(
      [
        "src/reader.ts",
        "test/fixtures/worker.json",
        "nested/node_modules/pkg/index.js",
        "notes/plan.md",
        "node_modules/pkg/index.js",
        "dist/index.js",
        ".beads/issues.jsonl",
        ".forge/report.json",
        "build/reader.ts",
        "coverage/reader.ts",
        "src/link.ts",
      ].map(path => [path, flaggedIn(path)]),
    );
    return done("A1", { floors, anchorsWalked: tree.anchorsWalked, modules, jsonFiles, controls, walkControls });
  },
  A2: () => {
    const tree = liveTree();
    const embeddingLoads = [...tree.modules.values()].flatMap(reading => reading.embeddingLoads);
    const engineCommands = [...tree.modules.values()].flatMap(reading => reading.engineCommands);
    const specifierAnchor = tree.modules.get(PROVIDER)?.specifiers.includes("node:child_process") === true;
    const commandAnchor = tree.modules.get(PROVIDER)?.specifiers.includes("rf") === true;
    expect({ specifierAnchor, commandAnchor }, "the reader reads the provider's node:child_process import and its spawn command rf").toStrictEqual({ specifierAnchor: true, commandAnchor: true });
    expect({ embeddingLoads, engineCommands }, "embedding loads and engine commands outside the exemptions").toStrictEqual({ embeddingLoads: [], engineCommands: [] });
    const controls = {
      importDeclaration: loadsEmbedding("c.ts", `import { serveEmbeddedWorker } from "${EMBEDDING}";\n`),
      typeOnly: loadsEmbedding("c.ts", `import type { EmbeddedEvaluate } from "${EMBEDDING}";\n`),
      exportFrom: loadsEmbedding("c.ts", `export * from "${EMBEDDING}";\n`),
      dynamicImport: loadsEmbedding("c.mjs", `const host = await import("${EMBEDDING}");\n`),
      require: loadsEmbedding("c.cjs", `const host = require("${EMBEDDING}");\n`),
      importEquals: loadsEmbedding("c.ts", `import host = require("${EMBEDDING}");\n`),
      importType: loadsEmbedding("c.ts", `type Host = typeof import("${EMBEDDING}");\n`),
      npmSpecifier: loadsEmbedding("c.ts", `import { evaluateForHost } from "npm:@reactive-fiber/tsx@0.1.649/embedding";\n`),
      urlSpecifier: loadsEmbedding("c.ts", `import { evaluateForHost } from "https://esm.sh/@reactive-fiber/tsx@0.1.668/embedding";\n`),
      foldedSpecifier: loadsEmbedding("c.mjs", 'const host = await import("@reactive-fiber/tsx/" + "embedding");\n'),
      rootIndex: loadsEmbedding("c.ts", 'import { defineComponent } from "@reactive-fiber/tsx";\n'),
      testingEntry: loadsEmbedding("c.ts", 'import { render } from "@reactive-fiber/tsx/testing";\n'),
      mentionOnly: loadsEmbedding("c.ts", `const label = "${EMBEDDING}";\n`),
      composedSpecifier: loadsEmbedding("c.mjs", `const entry = "embedding";\nconst host = await import(\`@reactive-fiber/tsx/${"$"}{entry}\`);\n`),
      renamedPackage: loadsEmbedding("c.ts", 'import { serve } from "../vendor/tsx-embed/index.js";\n'),
      importMap: loadsEmbedding("import_map.json", `{"imports":{"${EMBEDDING}":"npm:@reactive-fiber/tsx@0.1.649/embedding"}}\n`),
      spawnEngine: namesEngine("c.ts", 'const child = spawn("deno", ["run", "worker.ts"]);\n'),
      engineByPath: namesEngine("c.ts", 'const child = execFile("/usr/local/bin/deno", ["run"]);\n'),
      shellCommand: namesEngine("c.ts", 'execSync("deno run --allow-read worker.ts");\n'),
      manifestName: namesEngine("c.ts", 'const manifest = readFileSync("deno.jsonc", "utf8");\n'),
      rfCommand: namesEngine("c.ts", 'const child = spawn("rf", ["context", "render"]);\n'),
      composedCommand: namesEngine("c.ts", 'const engine = "deno";\nconst child = spawn(engine, ["run"]);\n'),
    };
    return done("A2", { specifierAnchor, commandAnchor, embeddingLoads, engineCommands, controls });
  },
  A3: () => {
    const tree = liveTree();
    const readers = NEAREST_READERS.map(([path, kind, token]) => {
      const reading = tree.modules.get(path);
      const reached = reading !== undefined && (kind === "identifier" ? reading.identifiers.has(token) : reading.specifiers.includes(token));
      const judged = tree.judged.includes(path);
      const quiet = reading !== undefined && reading.documents.length + reading.embeddingLoads.length + reading.engineCommands.length === 0;
      return { path, token, reached, judged, quiet };
    });
    expect(
      readers.filter(reader => !(reader.reached && reader.judged && reader.quiet)),
      "every nearest TSX worker reader is reached, judged and quiet",
    ).toEqual([]);
    return done("A3", { readers });
  },
  A4: () => {
    const tree = liveTree();
    const exemptWalked = EXEMPT.every(file => tree.walk.files.includes(file) && !tree.judged.includes(file));
    const self = readModule(SELF, readFileSync(join(REPO, SELF), "utf8"));
    const roster = readJson(ROSTER_FILE, readFileSync(join(REPO, ROSTER_FILE), "utf8"));
    const reading = {
      exemptWalked,
      selfDocuments: self.documents.length > 0,
      rosterDocuments: roster.length > 0,
      selfLoads: self.embeddingLoads.length + self.engineCommands.length > 0,
    };
    expect(reading, "each exemption carries real DOC_FAMILY spellings (so lifting it reds A1) and the census loads neither the entry nor the engine").toStrictEqual({
      exemptWalked: true,
      selfDocuments: true,
      rosterDocuments: true,
      selfLoads: false,
    });
    return done("A4", { exempt: [...EXEMPT], ...reading });
  },
  B1: () => {
    const clean = project(renderWith());
    const tsxSpawned = project(renderWith({ ...spawned }));
    const tsxEngine = project(renderWith({}, [], tsxIdentity));
    expect([clean, tsxSpawned, tsxEngine].map(projection => [projection.coverage, projection.tone]), "the clean render, with a spawned worker or an engine identity, is complete and successful").toEqual([
      ["complete", "success"],
      ["complete", "success"],
      ["complete", "success"],
    ]);
    const evidence = {
      spawnReference: tsxSpawned.notes.some(note => /TSX worker spawned/.test(note)),
      engineReference: tsxEngine.notes.some(note => /TSX engine identity/.test(note)),
    };
    expect(evidence, "the worker evidence rides one note each").toStrictEqual({ spawnReference: true, engineReference: true });
    const fixtureSeam = reactivefiberTopology(
      { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: renderWith() },
      { ...CONTEXT, seam: "injected-fixture" },
    ).snapshots[0];
    // R-PASSTHROUGH quiet row: a failed document riding an additive result key is not read, so the clean render stays successful.
    const passthrough = project(renderWith({ host_evaluation_result: { schema: SCHEMA_TAG, schema_version: 1, status: "failed", output: null } }));
    return done("B1", {
      clean: { coverage: clean.coverage, tone: clean.tone },
      tsxSpawned: classes(tsxSpawned, /TSX worker spawned/),
      tsxEngine: classes(tsxEngine, /TSX engine identity/),
      fixtureSeam: { coverage: String(fixtureSeam?.coverage), tone: String(fixtureSeam?.node.statusTone) },
      passthrough: classes(passthrough, /host[\s_-]*evaluation/i),
    });
  },
  B2: () => {
    const reason = /render reported errors/;
    const variants = {
      summaryFlag: classes(project(renderWith({ diagnostics_summary: summary(1) })), reason),
      flagBesideWorker: classes(project(renderWith({ diagnostics_summary: summary(1), ...spawned })), reason),
      countedErrorRow: classes(project(renderWith({ diagnostics_summary: summary(1) }, [rfRow("RF_RENDER_FAILED", {})])), reason),
    };
    expect(Object.values(variants).filter(variant => variant.tone === "success" || variant.coverage === "complete" || variant.named !== true), "has_errors never renders a success tone").toEqual([]);
    return done("B2", { word: "has_errors", variants });
  },
  B3: () => {
    const variants = {
      degradedRow: classes(project(renderWith({ observations: [observationRow("timeout", true)] })), /not observed \(timeout\)/),
      degradedContract: classes(
        project(renderWith({ view_id: "fixture.view", view_contract: { view_id: "fixture.view", satisfied: false, degraded: true, failures: [{ check: "fixture" }] } })),
        /view contract: 1 failed check/,
      ),
    };
    expect(Object.values(variants).filter(variant => variant.tone === "success" || variant.coverage === "complete" || variant.named !== true), "degraded never renders a success tone").toEqual([]);
    return done("B3", { word: "degraded", variants });
  },
  B4: () => {
    const variants = {
      refusal: classes(project(refusalOf("RF_RENDER_FAILED", {})), /^refused \u00b7 RF_RENDER_FAILED$/),
      failedRow: classes(project(renderWith({ observations: [observationRow("failed", false)] })), /not observed \(failed\)/),
    };
    expect(Object.values(variants).filter(variant => variant.tone === "success" || variant.coverage === "complete" || variant.named !== true), "failed never renders a success tone").toEqual([]);
    return done("B4", { word: "failed", variants });
  },
  B5: () => {
    const describes = Object.entries(ROSTER.existingPins).map(([title, measured]) => {
      const now = casesUnder(OBSERVER_TEST, title);
      return { describe: title, registered: now.registered, measured: measured.length, missing: measured.filter(entry => !now.titles.includes(entry)) };
    });
    expect(describes.map(entry => entry.describe.match(/wb-973\.\d+/)?.[0]), "the two pin sets the clause names").toEqual(["wb-973.2", "wb-973.10"]);
    expect(describes.filter(entry => entry.registered !== 1 || entry.measured === 0 || entry.missing.length > 0), "both describes registered once, every measured case title still under them").toEqual([]);
    return done("B5", { file: OBSERVER_TEST, describes });
  },
  C1: async () => {
    const ends: JsonObject[] = [];
    for (const { end, code, metadata } of WORKER_ENDS) {
      const { outcome } = await nativeOutcome(refusalOf(code, metadata), 7);
      ends.push({ end, code, ...outcome });
    }
    expect(
      ends.filter(entry => !(entry.kind === "refusal" && entry.category === "unavailable" && entry.message === `RF render refused: ${String(entry.code)}` && entry.spawns === 1)),
      "every worker end is the typed unavailable refusal naming its code, never transport and never a reading, in one spawn",
    ).toEqual([]);
    const eof = WORKER_ENDS[0];
    if (eof === undefined) throw new Error("WORKER_ENDS is empty");
    const contradiction = (await nativeOutcome(refusalOf(eof.code, eof.metadata), 0)).outcome;
    expect(contradiction.category, "the same refusal at exit 0 is the provider's contradiction").toBe("transport");
    return done("C1", { ends, contradictionAtExit0: contradiction });
  },
  C2: () => {
    const ends: JsonObject[] = WORKER_ENDS.map(({ end, code, metadata }) => ({ end, ...classes(project(refusalOf(code, metadata)), new RegExp(`^refused \u00b7 ${code}$`)) }));
    expect(ends.filter(entry => !(entry.tone === "failure" && entry.coverage === "unknown" && entry.named === true)), "every worker end projects a failure naming its code").toEqual([]);
    return done("C2", { ends });
  },
  C3: async () => {
    const envelope = recoveredRender();
    const { outcome, source } = await nativeOutcome(envelope, 0);
    const unchanged = JSON.stringify(source) === JSON.stringify(envelope);
    const projection = project(envelope);
    const recovered = { ...classes(projection, /render reported errors/), spawnNote: projection.notes.some(note => /TSX worker spawned/.test(note)) };
    expect({ outcome, unchanged }, "the recovered render passes the provider unchanged, in one spawn").toStrictEqual({ outcome: { kind: "reading", spawns: 1 }, unchanged: true });
    expect(recovered, "the recovered render projects partial, never success").toStrictEqual({ coverage: "partial", tone: "unknown", named: true, spawnNote: true });
    return done("C3", { outcome, unchanged, recovered });
  },
  C4: () => {
    const describes = Object.entries(ROSTER.childCrashShape).map(([title, measured]) => {
      const now = casesUnder(CHILD_CRASH_TEST, title);
      return { describe: title, registered: now.registered, measured: measured.length, missing: measured.filter(entry => !now.titles.includes(entry)) };
    });
    const shape = Object.values(ROSTER.childCrashShape).flat();
    expect(shape.map(entry => entry.slice(0, 2)), "the shape is the K1-K3 typed-failure rows").toEqual(["K1", "K2", "K3"]);
    expect(shape.every(entry => /typed|settles once/.test(entry)), "each row settles the dead worker as one typed failure").toBe(true);
    expect(describes.filter(entry => entry.registered !== 1 || entry.missing.length > 0), "the describe registered once, every shape row still under it").toEqual([]);
    return done("C4", { file: CHILD_CRASH_TEST, describes });
  },
  C5: () => {
    const deadline = providerDeadline();
    const bounds = ROSTER.producer.rfBoundsMs;
    const boundsUnderDeadline = deadline.ms !== undefined && [bounds.attempt, bounds.round, bounds.cpu].every(bound => bound < (deadline.ms ?? 0));
    expect(deadline.ms, "the provider's deadline is read from its source").toBeTypeOf("number");
    expect(boundsUnderDeadline, "rf's default attempt, round and CPU bounds each sit under the provider's deadline").toBe(true);
    return done("C5", { deadlineMs: deadline.ms ?? null, deadlineCategory: deadline.category ?? null, bounds: { ...bounds }, boundsUnderDeadline });
  },
  D1: () => {
    const { producer } = ROSTER;
    const program = producerPin("program");
    const distribution = producerPin("distribution");
    const bead = readBeadRow();
    const artifactShipped = producer.pins.some(pin => pin.workerFailureSuite);
    const harnessEverywhere = producer.pins.every(pin => pin.workerHarness && pin.timeoutReply);
    const statusClosed = producer.pins.every(pin => JSON.stringify(pin.statusWords) === JSON.stringify(["success", "pending", "recovered", "failed"]));
    const distributionLocked =
      producer.runtimeLock.source === `ReactiveFiberTSXSDK ${distribution.sha}` && producer.runtimeLock.version === distribution.version && producer.runtimeLock.name === "@reactive-fiber/tsx";
    const beadSaysUnshipped = bead.notes.includes(`Shipped: no - tests/unit/embedding/worker-failure.test.ts absent at ${program.sha.slice(0, 12)}`);
    const sitesMatchBead = JSON.stringify([...gatingSitesOf(bead.notes)].sort()) === JSON.stringify([...program.documentSites].sort()) && program.documentSites.length > 0;
    const gatingRow = program.gatingRow === "docs/programs/component-assembly-2026-10-18/BEADS-2026-10-21.md:30" && bead.notes.includes("TSX-IO-05 rftsx-ilhva, BEADS-2026-10-21.md:30");
    expect({ beadSaysUnshipped, sitesMatchBead, gatingRow }, `the bead row ${BEAD} states the artifact unshipped, names the program pin's sites and its gating row`).toStrictEqual({
      beadSaysUnshipped: true,
      sitesMatchBead: true,
      gatingRow: true,
    });
    expect({ distributionLocked, harnessEverywhere, statusClosed }, "the distribution is rf's runtime lock; the harness and the deadline reply ship; the status words close at four").toStrictEqual({
      distributionLocked: true,
      harnessEverywhere: true,
      statusClosed: true,
    });
    expect(artifactShipped, "the typed failed worker document shipped: (b) is owed with this re-measure (wb-fb2z.3)").toBe(false);
    return done("D1", { artifactShipped, beadSaysUnshipped, sitesMatchBead, gatingRow, distributionLocked, harnessEverywhere, statusClosed });
  },
  D2: () => {
    const tree = liveTree();
    const testModules = tree.judged.filter(file => file.startsWith("test/") && /\.(?:test|census)\.ts$/.test(file));
    const titles = testModules.flatMap(file => registeredTitles(file, readFileSync(join(REPO, file), "utf8")).map(entry => `${file}: ${entry.title}`));
    const claims = titles.filter(entry => CLAIM_FAMILY.test(entry.slice(entry.indexOf(": ") + 2)));
    const floorsMet = testModules.length >= FLOORS.testModules && titles.length >= FLOORS.titles;
    expect(floorsMet, `test modules ${testModules.length}, registered titles ${titles.length}`).toBe(true);
    expect(claims, "registered test titles claiming (b) before the artifact ships").toEqual([]);
    const claimIn = (source: string): boolean => registeredTitles("t.test.ts", source).some(entry => CLAIM_FAMILY.test(entry.title));
    const controls = {
      successBlocks: claimIn('it("a failed document renders zero success blocks", () => {});\n'),
      staleSuccess: claimIn('test("no stale success is reused for the key", () => {});\n'),
      priorSuccess: claimIn('it("reuses no prior success", () => {});\n'),
      documentKind: claimIn('describe("host-evaluation result echo", () => {});\n'),
      typedFailedDocument: claimIn('it.each([1])("a typed failed document %s", () => {});\n'),
      eachTitle: claimIn('it.each([1])("zero success blocks %s", () => {});\n'),
      unrelated: claimIn('it("the clean render projects complete and successful", () => {});\n'),
      labelOnly: claimIn('expect(reading, "zero success blocks").toBe(true);\n'),
    };
    return done("D2", { floorsMet, claims, controls });
  },
};

/** A describe title: the label with the judged families masked, so a report holding this file's titles stays quiet. */
const titleOf = (row: Row): string => `${row.id} ${row.label.replace(FAMILY_TEXT, "<judged>")}`;

describe("wb-fb2z.3 TSX worker document census (TSX-COMPONENT-ASSEMBLY-R3, absent-today and rf-seam legs)", () => {
  it(FROZEN_TITLE, { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:5", "C:5", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: SCAN,
      workerEnds: WORKER_ENDS.map(({ end, code, site }) => ({ end, code, site })),
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({
      bead: ROSTER.bead,
      scan: ROSTER.scan,
      workerEnds: ROSTER.producer.rfWorkerEnds.map(({ end, code, site }) => ({ end, code, site })),
      residuals: [...ROSTER.residuals],
    });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^,(]+?) \(/.exec(bead.title)?.[1] ?? "";
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["B"], ["D"], ["C"], ["A"]]);
    const rowB = ROWS.find(row => row.id === "B");
    expect(STATUS_PINS.map(([, word]) => word), "B2, B3 and B4 carry the status words of clause (a), in its order").toEqual(statusWordsOf(clauses[0] ?? ""));
    expect(STATUS_PINS.map(([pin]) => pin), "each status word has its own pin of row B").toEqual(rowB?.pins.filter(pin => STATUS_PINS.some(([id]) => id === pin)));
    expect(WORKER_ENDS.map(entry => entry.end), "C1 and C2 read every worker end the statement names, in its order").toEqual(workerEndsOf(bead.notes));
    expect(quoteOf(bead.notes), "the filing's quote and citation").toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${producerPin("program").sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
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
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(
      [...suites, ...titles].filter(name => DOC_FAMILY.test(wordsOf(name)) || CLAIM_FAMILY.test(name)),
      "registered titles spelling a judged family",
    ).toEqual([]);
  });
});
