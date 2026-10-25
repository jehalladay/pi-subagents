/**
 * wb-gxd7.4 (GPC-FEEDBACK-CONTRACT-AUDIT-R4, program-triage-2026-10-22, epic wb-gxd7): gp kind labels are never silently renamed
 * in Pi, a census with an until-then leg. Statement (the bead note's full statement; its title is trimmed, program status at
 * 0107c72992f3: "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"): "When Pi's GraphDataIR
 * exporter or FunctionIR program for gp carries source kind labels like `ready-work` (gating artifact: the D-NAMES-1 ruling, open
 * at the pin, plus the Pi exporter of wb-0lf.2, none exists), it shall never silently rename or normalize them to satisfy
 * `IDENTIFIER_PATTERN`; any mapping is bijective over the admitted set, refuses collisions and retains the source label, and a
 * `GF_IDENTIFIER_INVALID` from `gp build` is a typed refusal, never a silent fix" - GraphPolicyCLI
 * docs/programs/feedback-contract-audit-2026-10-21/02-contract-audit.md:100 at 0107c72992f3 (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"). Acceptance (the owner filing's; each
 * clause sits verbatim in exactly one row label below): "(a) an exporter fixture with kinds `ready-work` and `ready_work` yields
 * two distinct FunctionIR names or a typed collision refusal, never one merged name, with the source label kept verbatim beside
 * the mapped identifier; (b) a fixture GF_IDENTIFIER_INVALID build refusal is recorded as a typed refusal carrying the producer's
 * path string, not auto-repaired; (c) census: no exporter code path lowercases or replaces '-' in a kind label outside a recorded
 * bijection table". Posture (the filing's "Not P0" fact, verbatim in row C's label): "no Pi exporter exists (0 GraphDataIR hits at
 * d75b68d1)".
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23; read-only `git show` in the local GraphPolicyCLI checkout, no fetch; the installed gp
 * run by absolute path in a scratch directory outside every repository; the roster quotes every line it rests on, verbatim):
 * AT THE PIN 0107c72992f3: 02-contract-audit.md:100 is D-NAMES-1 (open, program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics") and carries the quote;
 * 03-developer-workplan.md:58 and
 * 04-verification-playbook.md:98 carry the two authority sentences; 04:125 is the installed-replay cell "Adapter can represent
 * source names"; 01-finding-inventory.md:19 is F11 (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics") and links its feedback file,
 * whose :37, :41 and :53 record the producer's own
 * `gp build` refusal of a dashed candidate type, the program identity of the underscore spelling and the schema identity of the
 * dashed schema; ts/src/function-ir/catalogue.ts:405-406 are IDENTIFIER_PATTERN and PROGRAM_ID_PATTERN; structure.ts:257 emits
 * GF_IDENTIFIER_INVALID at the entry's JSON pointer with the bare message. AT THE INSTALLED gp (source checkout 3f7d52cd, a clean
 * descendant of the pin; built entry ts/dist/main.js identified by its SHA-256 in the roster, never by `gp --version`):
 * docs/dev/RULINGS.md:778 and :800 rule D-NAMES-1 RULED-OTHER (2026-10-22: both grammars kept, no GP-generated mapping, no silent
 * rename, dashed labels stay valid graphs), :810 lets the GF_IDENTIFIER_INVALID message change without changing code or path, and
 * the two patterns are byte-identical to the pin's (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"). AT gp main b361dac (a
 * descendant): docs/dev/DECISIONS.md:5394 (IMPL-12490)
 * changes every non-program-id message to a template naming the grammar (catalogue.ts:411), codes, paths and collect-all order
 * unchanged. THE RUNS (17, every one with its rc, stdout and stderr in the roster): the host-adapter program.json (blob ef964ee6,
 * byte-identical at the pin and the installed source) with its candidate type renamed to each grammar probe, its entity kind
 * `task` renamed to `ready-bead`, its relation kind `can_execute` renamed to `can-execute`, or its id renamed, under `gp build
 * <file> --backend reference --json`; and schema.json with its candidate type renamed under `gp graph check --schema <file> --graph
 * snapshot.json --json`. Each presented document is re-derived here from the vendored bytes and held to its recorded SHA-256.
 *
 * Pi has no gp exporter (wb-0lf.2, owner-reserved, is unbuilt): no module below src, qa or examples names a FunctionIR or
 * GraphDataIR kind field, so the trigger has not fired and the D-NAMES-1 ruling alone (program status at 0107c72992f3:
 * "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics") does not open the gate.
 * (a)-(c) are armed on
 * a test-side REFERENCE, the rule an adopting exporter must meet, and its JUDGES, beside the walk that keeps the absence true:
 *  exportKindNames(labels, table) carries every source label verbatim beside its identifier, renames a label only through a
 *    recorded bijection table and otherwise passes it through untouched (gp, not Pi, judges the grammar), refuses a table that is
 *    no bijection, and refuses a collision of two sources on one identifier as a typed refusal naming both - Pi chooses neither
 *    alternative of D-NAMES-1 (program status at 0107c72992f3:
 *    "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics") and records no table today.
 *  recordBuild(capture) records a gp build refusal as a typed refusal: the envelope code, the exit and every rejection's code, path
 *    and message verbatim in producer order, keyed by code and path (the message stays opaque), never repaired, never retried.
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the producer facts: the two grammars read from the pin's lines decide every measured build exactly as the
 *    installed gp did, the data layer admits both fixture kinds as distinct schemas, and the measured identities equal the pin's
 *    F11 records (program status at 0107c72992f3:
 *    "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics"); A2 the reference over the
 *    fixture and every table case: two distinct names with the source verbatim, or a typed
 *    collision or table refusal, never one merged name; A3 the mapping mutants are refused, each by exactly its rules.
 *  B, acceptance (b). B1 the measured refusal: exit 2, GP_CLI_PROGRAM_INVALID, no program identity, three GF_IDENTIFIER_INVALID
 *    rejections whose paths resolve in the presented program to the dashed label and equal the pin's F11 record, the same for the
 *    entity and relation kinds, and the head message measured to differ; B2 the reference recorder over every measured build and
 *    its head-message variant, and the recorder mutants refused.
 *  C, acceptance (c) and the posture. C1 the walk: no module below WALK_ROOTS names a kind-label field, a FunctionIR or GraphDataIR
 *    document id or a producer code, no string transform runs over a kind label, and no file below them names GraphDataIR or
 *    FunctionIR, with floors, flagged and quiet controls and each residual's quiet row; C2 the reference renames no label outside
 *    its recorded table, honours the table, and every transform mutant is refused.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the derived vocabulary, the residual families, the registered test titles and every pin's
 * assertion count are held to the out-of-file roster (test/fixtures/gp-kind-label-roster.json). OUTSIDE ANCHOR: the owner filing's
 * row in the tracked bead export (.beads/issues.jsonl, row wb-gxd7.4): each acceptance clause and the posture fact sit verbatim in
 * exactly one row label, every row carries one, the statement, quote, citation, authority sentences and Pi's posture sentence
 * equal the roster's, the quote sits in the producer's 02:100 line and each authority sentence in its line, clause (a)'s kinds are
 * FIXTURE_KINDS, clause (b)'s code is REFUSAL_CODE, the statement's two document words are POSTURE_WORDS, and the filing names
 * every code fact the roster holds.
 * PINS IN THE FILING (wb-hzwr): every pin covers words of its row's obligation text (COVERS: verbatim spans of the filing - row A
 * clause (a), row B clause (b), row C clause (c) with the posture fact, each clause read without its enumeration): a row's pins
 * cover every word of that text (COVER_STOP aside) and each pin covers a word no other pin of its row covers, so a pin removed
 * from ROWS, the literal, IMPL, COVERS and the roster together leaves words of the filing uncovered; and the follow-up filing's
 * row (wb-hzwr) names the pin its coordinated hollow removed, which ROWS must hold.
 * ECHO GUARD (wb-hzwr): the runner, never the case, records each pin's `${pin}:${assertionCalls}` after its witness comparisons,
 * and the judged set records its own count as `judged:<n>` (ASSERTED, held to the roster's assertions), so a case that returns
 * its roster witness reaches its end with fewer assertions and a judge deleted from the judged set moves its count;
 * and C1's witness carries a LIVE leg the roster cannot hold - each root's module count, the transform calls the scan read and a
 * digest of the walked module inventory, values that move with every module a lander adds - held to the runner's own recount
 * made outside the case (node's recursive readdirSync, a second code path beside walkRoot, and a second transform counter), so
 * an echoed C1 carries no live leg; the follow-up filing's row names the pin its echo probe replaced, which LIVE must hold.
 * Not claimed: which pin covers which words (COVERS is this census's reading of the filing); a case that echoes its roster witness
 * while making its pinned number of assertions (padded, or written through expect.setState) - for C1, while also copying the
 * runner's recount into its live leg, or hollowing that recount and its floor check with it; a walk root removed from
 * WALK_ROOTS, FLOORS, TRANSFORM_FLOOR and the roster together (the floors anchor the roots that are listed, not the list); an
 * assertion removed from the records case itself (it holds the other cases' counts, not its own); an edit of the tracked bead
 * export itself.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED) with its pinned assertion count (ASSERTED).
 * RESIDUALS (named families, each with a pinned quiet row in C1's controls): R-UNTYPED-FLOW a kind label reaching a transform
 * through a binding the walk does not follow (a named helper's parameter, a function's return, Array.from's map function, a
 * property assignment, another module; the walk follows declarations, plain assignments, loops, destructuring and the element
 * parameter of an iteration or reduce callback); R-COMPUTED a kind field name composed at run time; R-OTHER-METHOD a rename by other means than a method call on the
 * label (String.prototype.toLowerCase.call, a character map); R-COMMENT a kind field named in a comment (comments are read only
 * for the two document words); R-NAMESAKE a kind label read through a generic field name (`kind`, `of`, `candidate`) that the
 * derived vocabulary excludes as Pi's own words; R-LITERAL a kind label spelled as a bare literal, indistinguishable from Pi's own
 * slugs; R-OUTSIDE a module outside WALK_ROOTS (test helpers and fixtures hold kind labels on purpose).
 * FOLLOW-UP wb-hzwr (the R694 follow-up of landing 325, its F3): the gate's two LEG-2 survivors - L2-01, pin A3 removed from
 * ROWS, the literal, IMPL, the roster rows and the roster titles together, and L2-02, C1's case replaced by one that echoes its
 * roster witness - are killed by the pins in the filing and the echo guard above.
 * Display paths added: none. Test-only: no process is spawned and no file is written; src, qa, examples, the roster and the bead
 * export are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER_FILE = "test/fixtures/gp-kind-label-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-gxd7.4";
/** The follow-up filing whose row names the pins the landing-325 gate's two LEG-2 survivors hollowed (L2-01 and L2-02). */
const FOLLOW_UP = "wb-hzwr";
/** The program pin every producer line is read at (GraphPolicyCLI, abbreviated as the filing cites it). */
const PIN = "0107c72992f3";
/** Clause (a)'s two kinds. */
const FIXTURE_KINDS: readonly string[] = ["ready-work", "ready_work"];
/** Clause (b)'s rejection code and the envelope code gp build wraps it in. */
const REFUSAL_CODE = "GF_IDENTIFIER_INVALID";
const ENVELOPE_CODE = "GP_CLI_PROGRAM_INVALID";
const CLI_SCHEMA = "graphpolicy.cli.v1";
/** The statement's two document words ("Pi's GraphDataIR exporter or FunctionIR program"), read raw, comments included. */
const POSTURE_WORDS: readonly string[] = ["GraphDataIR", "FunctionIR"];
/** The Pi code paths judged: product sources, QA scripts and shipped examples (every file below them, at any depth). */
const WALK_ROOTS: readonly string[] = ["src", "qa", "examples"];
const MODULE_EXTENSIONS: readonly string[] = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Each floor sits below the module count measured at base c4d42bf (src 115, qa 62, examples 6). */
const FLOORS: Readonly<Record<string, number>> = { src: 100, qa: 55, examples: 5 };
/** The string methods that rename a value in place: case folds, Unicode normalization, replacement and splitting. */
const TRANSFORM_METHODS: readonly string[] = ["toLowerCase", "toLocaleLowerCase", "toUpperCase", "toLocaleUpperCase", "normalize", "replace", "replaceAll", "split"];
/** Below the transform calls the walk reads at base c4d42bf: the non-vacuity anchor of the transform rule. */
const TRANSFORM_FLOOR = 150;
/** Array methods whose callback's first parameter receives an element of the receiver (the walk binds it). */
const ITERATION_METHODS: readonly string[] = ["map", "flatMap", "forEach", "filter", "find", "findIndex", "some", "every"];
/** Array methods whose callback's second parameter receives an element of the receiver (the walk binds it). */
const REDUCE_METHODS: readonly string[] = ["reduce", "reduceRight"];
/** The kind families the runs rename, each with the label it renames in the host-adapter program. */
const KIND_FAMILIES: readonly string[] = ["candidate-type", "entity-kind", "relation-kind"];

interface Authority {
  readonly ref: string;
  readonly quote: string;
}
interface Fixture {
  readonly path: string;
  readonly blob: string;
  readonly sha256: string;
  readonly bytes: string;
}
interface Run {
  readonly id: string;
  readonly verb: string;
  readonly family: string;
  readonly from: string;
  readonly label: string;
  readonly presentedSha256: string;
  readonly rc: number;
  readonly stderr: string;
  readonly stdout: string;
}
interface Installed {
  readonly sourceSha: string;
  readonly entry: string;
  readonly entrySha256: string;
  readonly cleanTree: boolean;
  readonly capturedUtc: readonly string[];
}
interface Producer {
  readonly pin: string;
  readonly installed: Installed;
  readonly head: string;
  readonly lines: Readonly<Record<string, string>>;
  readonly installedLines: Readonly<Record<string, string>>;
  readonly headLines: Readonly<Record<string, string>>;
  readonly program: Fixture;
  readonly schema: Fixture;
  readonly snapshot: { readonly path: string; readonly blob: string; readonly sha256: string };
  readonly runs: readonly Run[];
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
  readonly bead: string;
  readonly statement: string;
  readonly quote: string;
  readonly citation: string;
  readonly authority: readonly Authority[];
  readonly piPosture: string;
  readonly posture: string;
  readonly codeFacts: readonly string[];
  readonly producer: Producer;
  readonly scan: JsonObject;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly assertions: readonly string[];
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
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`roster ${field} must be an integer`);
  return value;
}
function object(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function list(value: unknown, field: string): unknown[] {
  if (!Array.isArray(value)) throw new Error(`roster ${field} must be a list`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  return list(value, field).map((item, index) => text(item, `${field}[${index}]`));
}
function stringMap(value: unknown, field: string): Record<string, string> {
  return Object.fromEntries(Object.entries(object(value, field)).map(([key, entry]) => [key, text(entry, `${field}.${key}`)]));
}
function fixtureOf(value: unknown, field: string): Fixture {
  const entry = object(value, field);
  return { path: text(entry.path, `${field}.path`), blob: text(entry.blob, `${field}.blob`), sha256: text(entry.sha256, `${field}.sha256`), bytes: text(entry.bytes, `${field}.bytes`) };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = object(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  const producer = object(raw.producer, "producer");
  const installed = object(producer.installed, "producer.installed");
  const snapshot = object(producer.snapshot, "producer.snapshot");
  if (typeof installed.cleanTree !== "boolean") throw new Error("roster producer.installed.cleanTree must be a boolean");
  const runs = list(producer.runs, "producer.runs").map((value, index): Run => {
    const entry = object(value, `producer.runs[${index}]`);
    const at = (key: string): string => text(entry[key], `producer.runs[${index}].${key}`);
    return { id: at("id"), verb: at("verb"), family: at("family"), from: at("from"), label: at("label"), presentedSha256: at("presentedSha256"), rc: count(entry.rc, `producer.runs[${index}].rc`), stderr: at("stderr"), stdout: at("stdout") };
  });
  const rows = list(raw.rows, "rows").map((row, index): RosterRow => {
    const entry = object(row, `rows[${index}]`);
    const pins = list(entry.pins, `rows[${index}].pins`).map((pin, at): RosterPin => {
      const value = object(pin, `rows[${index}].pins[${at}]`);
      if (!Object.hasOwn(value, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs a witness`);
      return { id: text(value.id, `rows[${index}].pins[${at}].id`), witness: json(value.witness) };
    });
    return { id: text(entry.id, `rows[${index}].id`), label: text(entry.label, `rows[${index}].label`), pins };
  });
  const authority = list(raw.authority, "authority").map((value, index): Authority => {
    const entry = object(value, `authority[${index}]`);
    return { ref: text(entry.ref, `authority[${index}].ref`), quote: text(entry.quote, `authority[${index}].quote`) };
  });
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    statement: text(raw.statement, "statement"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    authority,
    piPosture: text(raw.piPosture, "piPosture"),
    posture: text(raw.posture, "posture"),
    codeFacts: strings(raw.codeFacts, "codeFacts"),
    producer: {
      pin: text(producer.pin, "producer.pin"),
      installed: {
        sourceSha: text(installed.sourceSha, "producer.installed.sourceSha"),
        entry: text(installed.entry, "producer.installed.entry"),
        entrySha256: text(installed.entrySha256, "producer.installed.entrySha256"),
        cleanTree: installed.cleanTree,
        capturedUtc: strings(installed.capturedUtc, "producer.installed.capturedUtc"),
      },
      head: text(producer.head, "producer.head"),
      lines: stringMap(producer.lines, "producer.lines"),
      installedLines: stringMap(producer.installedLines, "producer.installedLines"),
      headLines: stringMap(producer.headLines, "producer.headLines"),
      program: fixtureOf(producer.program, "producer.program"),
      schema: fixtureOf(producer.schema, "producer.schema"),
      snapshot: { path: text(snapshot.path, "producer.snapshot.path"), blob: text(snapshot.blob, "producer.snapshot.blob"), sha256: text(snapshot.sha256, "producer.snapshot.sha256") },
      runs,
    },
    scan: scan as JsonObject,
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
    assertions: strings(raw.assertions, "assertions"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function run(id: string): Run {
  const found = ROSTER.producer.runs.find(entry => entry.id === id);
  if (found === undefined) throw new Error(`the roster holds no run ${id}`);
  return found;
}
function pinLine(key: string): string {
  const found = ROSTER.producer.lines[key];
  if (found === undefined) throw new Error(`the roster quotes no pin line ${key}`);
  return found;
}
function installedLine(key: string): string {
  const found = ROSTER.producer.installedLines[key];
  if (found === undefined) throw new Error(`the roster quotes no installed line ${key}`);
  return found;
}
function headLine(key: string): string {
  const found = ROSTER.producer.headLines[key];
  if (found === undefined) throw new Error(`the roster quotes no head line ${key}`);
  return found;
}
const sha256 = (bytes: string): string => createHash("sha256").update(bytes, "utf8").digest("hex");
/** git's blob id of a file's bytes (what `git rev-parse <rev>:<path>` printed for the vendored fixture). */
const gitBlob = (bytes: string): string => createHash("sha1").update(`blob ${Buffer.byteLength(bytes, "utf8")}\0`).update(bytes, "utf8").digest("hex");

// ---------------------------------------------------------------------------------------------------------------------------------
// The producer facts, read from the roster's quoted lines and runs.

/** A pattern constant read from its quoted source line (`export const NAME = /source/;`). */
function patternOf(line: string, name: string): RegExp {
  const found = new RegExp(`^export const ${name} = /(.+)/;$`).exec(line);
  if (found?.[1] === undefined) throw new Error(`${name} is not on its quoted line`);
  return new RegExp(found[1]);
}
const IDENTIFIER_PATTERN = patternOf(pinLine("ts/src/function-ir/catalogue.ts:405"), "IDENTIFIER_PATTERN");
const PROGRAM_ID_PATTERN = patternOf(pinLine("ts/src/function-ir/catalogue.ts:406"), "PROGRAM_ID_PATTERN");
/** The F11 feedback file the pin's inventory row links (its quoted lines are keyed by this path). */
function f11Path(): string {
  const found = /\(\.\.\/\.\.\/\.\.\/(new-feedback\/[^)]+\.md)\)/.exec(pinLine("01-finding-inventory.md:19"));
  if (found?.[1] === undefined) throw new Error("the F11 row links no feedback file");
  return found[1];
}
const F11 = f11Path();

interface Rejection {
  readonly code: string;
  readonly path: string;
  readonly message: string;
}
/** One captured stdout as JSON (every run's stdout is one graphpolicy.cli.v1 envelope). */
function envelope(stdout: string): JsonObject {
  const parsed = JSON.parse(stdout) as Json;
  if (!isObject(parsed)) throw new Error("a captured stdout is no JSON object");
  return parsed as JsonObject;
}
/** The rejections array of a parsed refusal, every field a string. */
function rejectionsOf(value: Json | undefined): Rejection[] {
  if (!Array.isArray(value)) throw new Error("no rejections list");
  return value.map(entry => {
    if (!isObject(entry) || typeof entry.code !== "string" || typeof entry.path !== "string" || typeof entry.message !== "string") throw new Error("a malformed rejection");
    return { code: entry.code, path: entry.path, message: entry.message };
  });
}
function refusalRejections(stdout: string): Rejection[] {
  const error = envelope(stdout).error;
  const details = isObject(error) ? error.details : undefined;
  return rejectionsOf(isObject(details) ? details.rejections : undefined);
}
/** F11:37's rejections: the array between `"rejections":` and the envelope's closing braces (the line elides capabilities). */
function f11Rejections(): Rejection[] {
  const line = pinLine(`${F11}:37`);
  const start = line.indexOf('"rejections":');
  const end = line.indexOf("]}}", start);
  if (start < 0 || end < 0) throw new Error("F11:37 carries no rejections");
  return rejectionsOf(JSON.parse(line.slice(start + '"rejections":'.length, end + 1)) as Json);
}

function isJsonObject(value: Json): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** Every object key and every string value equal to `from` renamed to `to` (the seat's derivation of each presented document). */
function renamed(value: Json, from: string, to: string): Json {
  if (Array.isArray(value)) return value.map(entry => renamed(entry, from, to));
  if (isJsonObject(value)) return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key === from ? to : key, renamed(entry, from, to)]));
  return value === from ? to : value;
}
/** The document a run presented, re-derived from the vendored bytes. */
function presented(entry: Run): Json {
  const base = JSON.parse(entry.verb === "graph check" ? ROSTER.producer.schema.bytes : ROSTER.producer.program.bytes) as Json;
  if (entry.family === "program-id") {
    if (!isJsonObject(base)) throw new Error("the program is no object");
    return { ...base, id: entry.label };
  }
  return renamed(base, entry.from, entry.label);
}
const bytesOf = (value: Json): string => `${JSON.stringify(value, null, 2)}\n`;
/** A JSON pointer's target: the parent container, the last segment and the value there. */
function resolvePointer(document: Json, pointer: string): { readonly parent: Json; readonly key: string; readonly value: Json | undefined } {
  const segments = pointer.split("/").slice(1).map(segment => segment.replace(/~1/g, "/").replace(/~0/g, "~"));
  let parent: Json = document;
  let value: Json | undefined = document;
  let key = "";
  for (const segment of segments) {
    parent = value ?? null;
    key = segment;
    if (Array.isArray(parent)) value = parent[Number(segment)];
    else if (isJsonObject(parent)) value = Object.hasOwn(parent, segment) ? parent[segment] : undefined;
    else value = undefined;
  }
  return { parent, key, value };
}
/** Whether a rejection path names the label: the label is its last segment and a key of the parent, or the value it points at. */
function pointsAtLabel(document: Json, pointer: string, label: string): boolean {
  const target = resolvePointer(document, pointer);
  if (target.key === label && isJsonObject(target.parent) && Object.hasOwn(target.parent, label)) return true;
  return target.value === label;
}

interface Vocabulary {
  /** FunctionIR maps whose keys are kind labels (the parent segment of a rejection that ends in the label). */
  readonly maps: readonly string[];
  /** FunctionIR fields whose values are kind labels (the last segment of a rejection that does not end in the label). */
  readonly references: readonly string[];
  /** The program blocks the maps sit in (the first segment of a map rejection). */
  readonly blocks: readonly string[];
  /** GraphDataIR schema keys holding the same label sets as the FunctionIR maps. */
  readonly dataMaps: readonly string[];
  /** GraphDataIR schema keys whose values are those labels. */
  readonly dataReferences: readonly string[];
  /** The names the walk judges: every derived name that is no single lowercase word. */
  readonly words: readonly string[];
  /** The derived names that are single lowercase words, Pi's own vocabulary too (residual R-NAMESAKE). */
  readonly excluded: readonly string[];
}
const GENERIC = /^[a-z]+$/;
/** The walk's vocabulary, derived from the producer's own rejection paths and documents, never typed. */
function vocabulary(): Vocabulary {
  const maps = new Set<string>();
  const references = new Set<string>();
  const blocks = new Set<string>();
  for (const entry of ROSTER.producer.runs.filter(item => item.verb === "build" && item.rc !== 0 && KIND_FAMILIES.includes(item.family))) {
    for (const rejection of refusalRejections(entry.stdout)) {
      const segments = rejection.path.split("/").slice(1);
      const last = segments[segments.length - 1] ?? "";
      if (last === entry.label) {
        maps.add(segments[segments.length - 2] ?? "");
        if (segments.length > 2) blocks.add(segments[0] ?? "");
      } else references.add(last);
    }
  }
  const program = JSON.parse(ROSTER.producer.program.bytes) as Json;
  const schema = JSON.parse(ROSTER.producer.schema.bytes) as Json;
  const dataMaps = new Set<string>();
  const dataReferences = new Set<string>();
  const labels = new Set<string>();
  if (isJsonObject(program) && isJsonObject(schema)) {
    for (const block of blocks) {
      const holder = program[block];
      if (!isJsonObject(holder)) continue;
      for (const map of maps) {
        const declared = holder[map];
        if (!isJsonObject(declared)) continue;
        const keys = Object.keys(declared).sort();
        for (const key of keys) labels.add(key);
        for (const [name, value] of Object.entries(schema)) if (isJsonObject(value) && JSON.stringify(Object.keys(value).sort()) === JSON.stringify(keys)) dataMaps.add(name);
      }
    }
    const visit = (value: Json): void => {
      if (Array.isArray(value)) value.forEach(visit);
      else if (isJsonObject(value)) {
        for (const [name, entry] of Object.entries(value)) {
          const values = Array.isArray(entry) ? entry : [entry];
          if (values.length > 0 && values.every(item => typeof item === "string" && labels.has(item))) dataReferences.add(name);
          visit(entry);
        }
      }
    };
    visit(schema);
  }
  const sorted = (set: Set<string>): string[] => [...set].sort();
  const all = new Set([...maps, ...references, ...blocks, ...dataMaps, ...dataReferences]);
  return {
    maps: sorted(maps),
    references: sorted(references),
    blocks: sorted(blocks),
    dataMaps: sorted(dataMaps),
    dataReferences: sorted(dataReferences),
    words: sorted(new Set([...all].filter(name => !GENERIC.test(name)))),
    excluded: sorted(new Set([...all].filter(name => GENERIC.test(name)))),
  };
}
const VOCABULARY = vocabulary();
/** The document ids of the two vendored documents (the FunctionIR program and the GraphDataIR schema). */
function documentIds(): string[] {
  return [ROSTER.producer.program.bytes, ROSTER.producer.schema.bytes].map(bytes => {
    const parsed = JSON.parse(bytes) as Json;
    return isJsonObject(parsed) && typeof parsed.schema === "string" ? parsed.schema : "";
  });
}
const DOCUMENT_IDS = documentIds();
/** The producer codes a refusal carries (the envelope's and its rejections'). */
const PRODUCER_CODES: readonly string[] = [ENVELOPE_CODE, REFUSAL_CODE];

const RESIDUAL_FAMILIES: readonly string[] = ["R-UNTYPED-FLOW", "R-COMPUTED", "R-OTHER-METHOD", "R-COMMENT", "R-NAMESAKE", "R-LITERAL", "R-OUTSIDE"];

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
      "(a) an exporter fixture with kinds `ready-work` and `ready_work` yields two distinct FunctionIR names or a typed collision refusal, never one merged name, with the source label kept verbatim beside the mapped identifier: the two grammars read from the pin's lines decide every measured gp build as the installed gp did and the data layer admits both kinds as distinct schemas; the reference exporter carries each source label verbatim beside its identifier, passes both kinds through as two distinct names without a table, refuses a recorded table that collapses one onto the other as a typed collision naming both sources, refuses a table that is no bijection, and every merging, source-dropping or untyped mapping of the mutant table is refused by its rules",
    pins: ["A1", "A2", "A3"],
  },
  // Rows A and B cite the pin's F11 record, a GP-FCA-2026-10-21 finding label (program status at 0107c72992f3:
  // "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics")
  {
    id: "B",
    label:
      "(b) a fixture GF_IDENTIFIER_INVALID build refusal is recorded as a typed refusal carrying the producer's path string, not auto-repaired: the installed gp refused the dashed candidate type with exit 2, GP_CLI_PROGRAM_INVALID, no program identity and three GF_IDENTIFIER_INVALID rejections whose JSON pointers name the label in the presented program, as the pin's F11 record shows; the reference records every rejection's code, path and message verbatim in producer order, keyed by code and path so the head's changed message moves nothing else, and every repairing, path-rewriting, rejection-dropping or untyped recorder is refused",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label:
      "(c) census: no exporter code path lowercases or replaces '-' in a kind label outside a recorded bijection table: today no Pi exporter exists (0 GraphDataIR hits at d75b68d1) - no module below src, qa or examples names a FunctionIR or GraphDataIR kind field, document id or producer code, no case fold, normalization, replacement or split runs over a kind label, and no file below them names GraphDataIR or FunctionIR; the reference renames a label only through its recorded table and every transforming exporter is refused",
    pins: ["C1", "C2"],
  },
];
/** The words a coverage reading skips: articles and conjunctions, which carry no obligation of their own. */
const COVER_STOP: readonly string[] = ["a", "an", "and", "as", "from", "or", "the", "this", "to"];
/** Each pin's share of the filing: verbatim spans of its row's obligation text (row A clause (a), row B clause (b), row C clause
 * (c) and the posture fact, each clause without its enumeration). A row's pins together cover every word of that text and each
 * covers a word no other pin of its row covers (coverageOf), so a pin removed from every literal of this file and the roster
 * leaves words of the filing uncovered. Which pin covers which words is this census's reading. */
const COVERS: Readonly<Record<string, readonly string[]>> = {
  A1: ["an exporter fixture with kinds `ready-work` and `ready_work`"],
  A2: ["yields two distinct FunctionIR names or a typed collision refusal", "with the source label kept verbatim beside the mapped identifier"],
  A3: ["never one merged name"],
  B1: ["a fixture GF_IDENTIFIER_INVALID build refusal"],
  B2: ["is recorded as a typed refusal carrying the producer's path string, not auto-repaired"],
  C1: ["census: no exporter code path lowercases or replaces '-' in a kind label", "no Pi exporter exists (0 GraphDataIR hits at d75b68d1)"],
  C2: ["outside a recorded bijection table"],
};
/** The words a coverage reading counts: a text split at white space and at the punctuation that separates its parts. */
function coverWords(text: string): string[] {
  return text.split(/[\s,;():]+/).filter(word => word.length > 0 && !COVER_STOP.includes(word));
}
interface Coverage {
  /** Cover phrases that are no verbatim span of the text, as `<pin>: <phrase>`. */
  readonly outside: readonly string[];
  /** Words of the text no pin covers. */
  readonly uncovered: readonly string[];
  /** Pins covering no word of their own (another pin of the row covers each of their words). */
  readonly withoutOwnWord: readonly string[];
}
/** How a row's pins cover the obligation text the row judges. */
function coverageOf(text: string, pins: readonly string[]): Coverage {
  const wordsBy = new Map(pins.map(pin => [pin, new Set((COVERS[pin] ?? []).flatMap(coverWords))]));
  const covered = new Set([...wordsBy.values()].flatMap(words => [...words]));
  const outside = pins.flatMap(pin => (COVERS[pin] ?? []).filter(phrase => !text.includes(phrase)).map(phrase => `${pin}: ${phrase}`));
  const uncovered = [...new Set(coverWords(text).filter(word => !covered.has(word)))];
  const withoutOwnWord = pins.filter(pin => {
    const others = new Set(pins.filter(other => other !== pin).flatMap(other => [...(wordsBy.get(other) ?? [])]));
    return [...(wordsBy.get(pin) ?? [])].every(word => others.has(word));
  });
  return { outside, uncovered, withoutOwnWord };
}

// ---------------------------------------------------------------------------------------------------------------------------------
// The reference an adopting Pi exporter owes, and its judges (acceptance (a) and (c)).

/** One exported name: the source kind label verbatim beside the FunctionIR identifier it maps to. */
interface NameEntry {
  readonly source: string;
  readonly identifier: string;
}
type ExportOutcome =
  | { readonly names: readonly NameEntry[] }
  | { readonly refused: "collision"; readonly identifier: string; readonly sources: readonly string[] }
  | { readonly refused: "table"; readonly reason: string };
type Exporter = (labels: readonly string[], table: readonly NameEntry[]) => ExportOutcome;

/** The reference: a label maps through the recorded table, else to itself, verbatim; the table must be a bijection; two sources
 * on one identifier are a typed collision refusal naming both, in input order. */
const exportKindNames: Exporter = (labels, table) => {
  const sources = new Set(table.map(entry => entry.source));
  const identifiers = new Set(table.map(entry => entry.identifier));
  if (sources.size !== table.length) return { refused: "table", reason: "source-repeated" };
  if (identifiers.size !== table.length) return { refused: "table", reason: "identifier-repeated" };
  const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
  const names = labels.map(source => ({ source, identifier: mapped.get(source) ?? source }));
  for (const entry of names) {
    const sharing = names.filter(other => other.identifier === entry.identifier).map(other => other.source);
    if (new Set(sharing).size > 1) return { refused: "collision", identifier: entry.identifier, sources: [...new Set(sharing)] };
  }
  return { names };
};

interface TableCase {
  readonly id: string;
  readonly table: readonly NameEntry[];
  readonly expect: ExportOutcome;
}
const [DASHED, UNDERSCORED] = FIXTURE_KINDS as [string, string];
/** The recorded tables the judge presents with the fixture (constructed: Pi records none today). */
const TABLE_CASES: readonly TableCase[] = [
  { id: "T-EMPTY", table: [], expect: { names: [{ source: DASHED, identifier: DASHED }, { source: UNDERSCORED, identifier: UNDERSCORED }] } },
  { id: "T-ESCAPE", table: [{ source: DASHED, identifier: "ready_x2d_work" }], expect: { names: [{ source: DASHED, identifier: "ready_x2d_work" }, { source: UNDERSCORED, identifier: UNDERSCORED }] } },
  {
    id: "T-CHAIN",
    table: [
      { source: DASHED, identifier: UNDERSCORED },
      { source: UNDERSCORED, identifier: "ready_work_u" },
    ],
    expect: { names: [{ source: DASHED, identifier: UNDERSCORED }, { source: UNDERSCORED, identifier: "ready_work_u" }] },
  },
  { id: "T-COLLAPSE", table: [{ source: DASHED, identifier: UNDERSCORED }], expect: { refused: "collision", identifier: UNDERSCORED, sources: [DASHED, UNDERSCORED] } },
  {
    id: "T-NON-INJECTIVE",
    table: [
      { source: DASHED, identifier: "ready" },
      { source: UNDERSCORED, identifier: "ready" },
    ],
    expect: { refused: "table", reason: "identifier-repeated" },
  },
  {
    id: "T-ABSENT-PARTNER",
    table: [
      { source: DASHED, identifier: "ready" },
      { source: "ready-bead", identifier: "ready" },
    ],
    expect: { refused: "table", reason: "identifier-repeated" },
  },
  {
    id: "T-DUPLICATE-SOURCE",
    table: [
      { source: DASHED, identifier: "ready_a" },
      { source: DASHED, identifier: "ready_b" },
    ],
    expect: { refused: "table", reason: "source-repeated" },
  },
];
/** Single labels the judge exports alone (no partner can collide): every measured build label, plus three constructed labels a
 * transform would change (a leading space, a compatibility ligature, a second dashed kind). */
function singleLabels(): string[] {
  const measured = ROSTER.producer.runs.filter(entry => entry.verb === "build" && entry.family !== "program-id").map(entry => entry.label);
  return [...new Set([...measured, ` ${UNDERSCORED}`, `${String.fromCodePoint(0xfb01)}le_kind`, "ready-bead"])];
}
const SINGLES = singleLabels();

/** The rules an exporter breaks over the fixture's table cases and the single labels. */
function judgeExporter(exporter: Exporter): string[] {
  const rules = new Set<string>();
  const outcomeOf = (labels: readonly string[], table: readonly NameEntry[]): ExportOutcome | undefined => {
    try {
      return exporter(labels, table);
    } catch {
      rules.add("J-THROW");
      return undefined;
    }
  };
  const judgeNames = (labels: readonly string[], table: readonly NameEntry[], names: readonly NameEntry[]): void => {
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    if (names.length !== labels.length || names.some((entry, index) => !Buffer.from(entry.source, "utf8").equals(Buffer.from(labels[index] ?? "", "utf8")))) rules.add("J-SOURCE");
    if (new Set(names.map(entry => entry.identifier)).size < new Set(names.map(entry => entry.source)).size) rules.add("J-MERGE");
    for (const entry of names) {
      const recorded = mapped.get(entry.source);
      if (recorded === undefined && entry.identifier !== entry.source) rules.add("J-VERBATIM");
      if (recorded !== undefined && entry.identifier !== recorded) rules.add("J-TABLE");
    }
  };
  for (const entry of TABLE_CASES) {
    const got = outcomeOf(FIXTURE_KINDS, entry.table);
    if (got === undefined) continue;
    const expected = entry.expect;
    if ("names" in expected) {
      if ("names" in got) judgeNames(FIXTURE_KINDS, entry.table, got.names);
      else rules.add("J-REFUSED-VALID");
      continue;
    }
    if (expected.refused === "collision") {
      if ("names" in got) {
        rules.add("J-COLLISION");
        judgeNames(FIXTURE_KINDS, entry.table, got.names);
      } else if (JSON.stringify(got) !== JSON.stringify(expected)) rules.add("J-COLLISION-TYPED");
      continue;
    }
    if ("names" in got) {
      rules.add("J-TABLE-BIJECTION");
      judgeNames(FIXTURE_KINDS, entry.table, got.names);
    } else if (JSON.stringify(got) !== JSON.stringify(expected)) rules.add("J-TABLE-BIJECTION");
  }
  for (const label of SINGLES) {
    const got = outcomeOf([label], []);
    if (got === undefined) continue;
    if ("names" in got) judgeNames([label], [], got.names);
    else rules.add("J-REFUSED-VALID");
  }
  const escapeTable = TABLE_CASES.find(entry => entry.id === "T-ESCAPE")?.table ?? [];
  const honoured = outcomeOf([DASHED], escapeTable);
  if (honoured !== undefined) {
    if ("names" in honoured) judgeNames([DASHED], escapeTable, honoured.names);
    else rules.add("J-REFUSED-VALID");
  }
  return [...rules].sort();
}

/** An exporter that maps through the table, renames every other label by `rename`, and keeps the reference's refusals. */
const transforming =
  (rename: (label: string) => string): Exporter =>
  (labels, table) => {
    const outcome = exportKindNames(labels, table);
    if (!("names" in outcome)) return outcome;
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    const names = labels.map(source => ({ source, identifier: mapped.get(source) ?? rename(source) }));
    for (const entry of names) {
      const sharing = names.filter(other => other.identifier === entry.identifier).map(other => other.source);
      if (new Set(sharing).size > 1) return { refused: "collision", identifier: entry.identifier, sources: [...new Set(sharing)] };
    }
    return { names };
  };
/** Exporters that collapse, drop or mistype what the reference keeps (A3). */
const MAPPING_MUTANTS: Readonly<Record<string, Exporter>> = {
  "M-NORMALIZE-MERGE": labels => ({ names: labels.map(source => ({ source, identifier: source.replace(/-/g, "_") })) }),
  "M-LAST-WINS": (labels, table) => {
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    const byIdentifier = new Map<string, NameEntry>();
    for (const source of labels) {
      const identifier = mapped.get(source) ?? source;
      byIdentifier.set(identifier, { source, identifier });
    }
    return { names: [...byIdentifier.values()] };
  },
  "M-DROP-SOURCE": (labels, table) => {
    const outcome = exportKindNames(labels, table);
    return "names" in outcome ? { names: outcome.names.map(entry => ({ source: entry.identifier, identifier: entry.identifier })) } : outcome;
  },
  "M-THROW-COLLISION": (labels, table) => {
    const outcome = exportKindNames(labels, table);
    if ("refused" in outcome && outcome.refused === "collision") throw new Error(`collision on ${outcome.identifier}`);
    return outcome;
  },
  "M-UNNAMED-COLLISION": (labels, table) => {
    const outcome = exportKindNames(labels, table);
    return "refused" in outcome && outcome.refused === "collision" ? { refused: "collision", identifier: outcome.identifier, sources: [] } : outcome;
  },
  "M-SUFFIX-DEDUPE": (labels, table) => {
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    const taken = new Set<string>();
    const names = labels.map(source => {
      let identifier = mapped.get(source) ?? source;
      while (taken.has(identifier)) identifier = `${identifier}_2`;
      taken.add(identifier);
      return { source, identifier };
    });
    return { names };
  },
  "M-TABLE-IGNORED": labels => exportKindNames(labels, []),
  "M-NO-BIJECTION-CHECK": (labels, table) => {
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    const names = labels.map(source => ({ source, identifier: mapped.get(source) ?? source }));
    for (const entry of names) {
      const sharing = names.filter(other => other.identifier === entry.identifier).map(other => other.source);
      if (new Set(sharing).size > 1) return { refused: "collision", identifier: entry.identifier, sources: [...new Set(sharing)] };
    }
    return { names };
  },
  "M-INPUT-COLLISION": (labels, table) => {
    const sources = new Set(table.map(entry => entry.source));
    const identifiers = new Set(table.map(entry => entry.identifier));
    if (sources.size !== table.length) return { refused: "table", reason: "source-repeated" };
    if (identifiers.size !== table.length) return { refused: "table", reason: "identifier-repeated" };
    const mapped = new Map(table.map(entry => [entry.source, entry.identifier]));
    const clash = labels.find(source => mapped.has(source) && labels.includes(mapped.get(source) ?? ""));
    if (clash !== undefined) return { refused: "collision", identifier: mapped.get(clash) ?? "", sources: [clash, mapped.get(clash) ?? ""] };
    return { names: labels.map(source => ({ source, identifier: mapped.get(source) ?? source })) };
  },
};
/** Exporters that rename a label outside the recorded table, each by one transform (C2). */
const TRANSFORM_MUTANTS: Readonly<Record<string, Exporter>> = {
  "M-LOWER": transforming(label => label.toLowerCase()),
  "M-DASH-UNDERSCORE": transforming(label => label.replace(/-/g, "_")),
  "M-DASH-STRIP": transforming(label => label.replace(/-/g, "")),
  "M-NFKC": transforming(label => label.normalize("NFKC")),
  "M-TRIM": transforming(label => label.trim()),
  "M-TRUNCATE": transforming(label => label.slice(0, 64)),
  "M-LEADING-DIGIT": transforming(label => (/^[0-9]/.test(label) ? `_${label}` : label)),
  "M-GRAMMAR-FORCE": transforming(label => label.replace(/[^A-Za-z0-9_]/g, "_")),
};

// ---------------------------------------------------------------------------------------------------------------------------------
// The reference recorder of a gp build outcome, and its judge (acceptance (b)).

interface Capture {
  readonly rc: number;
  readonly stdout: string;
  readonly stderr: string;
}
type Recorded =
  | { readonly refusal: { readonly exit: number; readonly code: string; readonly rejections: readonly Rejection[] } }
  | { readonly accepted: { readonly exit: number; readonly program: string } }
  | { readonly unreadable: string };
type Recorder = (capture: Capture) => Recorded;

/** The reference: the envelope read as gp wrote it; a refusal keeps its exit, its code and every rejection's code, path and
 * message verbatim and in producer order; an acceptance keeps the program identity; nothing is repaired or retried. */
const recordBuild: Recorder = capture => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(capture.stdout);
  } catch {
    return { unreadable: "stdout" };
  }
  if (!isObject(parsed) || parsed.schema !== CLI_SCHEMA) return { unreadable: "schema" };
  if (parsed.ok === true) {
    const identities = parsed.identities;
    const program = isObject(identities) ? identities.program : undefined;
    return capture.rc === 0 && typeof program === "string" ? { accepted: { exit: capture.rc, program } } : { unreadable: "acceptance" };
  }
  const error = parsed.error;
  const details = isObject(error) ? error.details : undefined;
  const rejections = isObject(details) ? details.rejections : undefined;
  if (!isObject(error) || typeof error.code !== "string" || !Array.isArray(rejections)) return { unreadable: "refusal" };
  const kept: Rejection[] = [];
  for (const entry of rejections) {
    if (!isObject(entry) || typeof entry.code !== "string" || typeof entry.path !== "string" || typeof entry.message !== "string") return { unreadable: "rejection" };
    kept.push({ code: entry.code, path: entry.path, message: entry.message });
  }
  return { refusal: { exit: capture.rc, code: error.code, rejections: kept } };
};

/** A template placeholder as it is spelled in quoted producer source (`$` `{` name `}`). */
const placeholder = (name: string): string => ["$", "{", name, "}"].join("");
/** The head's message template (catalogue.ts:411 at gp main) applied to a name, its grammar the quoted IDENTIFIER_PATTERN. */
function headMessage(name: string): string {
  const found = /return `(.+)`;$/.exec(headLine("ts/src/function-ir/catalogue.ts:411").trim());
  if (found?.[1] === undefined) throw new Error("the head template is not on its line");
  return found[1].replace(placeholder("name"), name).replace(placeholder("IDENTIFIER_GRAMMAR"), IDENTIFIER_PATTERN.source);
}
const BARE_MESSAGE = /^"(.*)" is not a valid identifier$/;
/** A capture as the head would print it: every bare identifier message rewritten to the head template, nothing else. */
function headVariant(capture: Capture): Capture {
  const parsed = envelope(capture.stdout);
  const rewrite = (value: Json): Json => {
    if (Array.isArray(value)) return value.map(rewrite);
    if (!isJsonObject(value)) return value;
    const out: JsonObject = {};
    for (const [key, entry] of Object.entries(value)) {
      const bare = key === "message" && typeof entry === "string" ? BARE_MESSAGE.exec(entry) : null;
      out[key] = bare?.[1] !== undefined ? headMessage(bare[1]) : rewrite(entry);
    }
    return out;
  };
  return { ...capture, stdout: JSON.stringify(rewrite(parsed)) };
}
interface RecorderCase {
  readonly id: string;
  readonly capture: Capture;
}
/** Every measured build run, and each refused one as the head would print it. */
function recorderCases(): RecorderCase[] {
  const builds = ROSTER.producer.runs.filter(entry => entry.verb === "build");
  return [...builds.map(entry => ({ id: entry.id, capture: entry })), ...builds.filter(entry => entry.rc !== 0).map(entry => ({ id: `${entry.id}@head`, capture: headVariant(entry) }))];
}
const RECORDER_CASES = recorderCases();

/** The rules a recorder breaks over the measured builds and their head variants. */
function judgeRecorder(record: Recorder): string[] {
  const rules = new Set<string>();
  const installed = new Map<string, Recorded>();
  for (const entry of RECORDER_CASES) {
    let got: Recorded;
    try {
      got = record(entry.capture);
    } catch {
      rules.add("K-TYPED");
      continue;
    }
    if (!entry.id.endsWith("@head")) installed.set(entry.id, got);
    const parsed = envelope(entry.capture.stdout);
    if (parsed.ok === true) {
      const identities = parsed.identities;
      const program = isJsonObject(identities ?? null) ? (identities as JsonObject).program : undefined;
      if (!("accepted" in got) || got.accepted.program !== program || got.accepted.exit !== entry.capture.rc) rules.add("K-ACCEPTED");
      continue;
    }
    if (!("refusal" in got)) {
      rules.add("accepted" in got ? "K-NO-REPAIR" : "K-TYPED");
      continue;
    }
    if (JSON.stringify(Object.keys(got)) !== JSON.stringify(["refusal"]) || JSON.stringify(Object.keys(got.refusal)) !== JSON.stringify(["exit", "code", "rejections"])) rules.add("K-NO-REPAIR");
    const error = parsed.error;
    const want = refusalRejections(entry.capture.stdout);
    if (!isJsonObject(error ?? null) || got.refusal.code !== (error as JsonObject).code || got.refusal.exit !== entry.capture.rc) rules.add("K-TYPED");
    if (got.refusal.rejections.some(rejection => rejection.code !== REFUSAL_CODE)) rules.add("K-TYPED");
    if (got.refusal.rejections.length !== want.length) rules.add("K-ALL");
    want.forEach((rejection, index) => {
      const kept = got.refusal.rejections[index];
      if (kept === undefined) return;
      if (!Buffer.from(kept.path, "utf8").equals(Buffer.from(rejection.path, "utf8"))) rules.add("K-PATH");
      if (kept.message !== rejection.message) rules.add("K-MESSAGE");
    });
    if (entry.id.endsWith("@head")) {
      const base = installed.get(entry.id.slice(0, -"@head".length));
      const keyed = (outcome: Recorded | undefined): string => (outcome !== undefined && "refusal" in outcome ? JSON.stringify(outcome.refusal.rejections.map(rejection => [rejection.code, rejection.path])) : "none");
      if (keyed(base) !== keyed(got)) rules.add("K-HEAD-STABLE");
    }
  }
  return [...rules].sort();
}
const READY_WORK_PROGRAM = (): string => {
  const identities = envelope(run(UNDERSCORED).stdout).identities;
  const program = isJsonObject(identities ?? null) ? (identities as JsonObject).program : undefined;
  if (typeof program !== "string") throw new Error("the underscore run carries no program identity");
  return program;
};
const mapRefusal = (outcome: Recorded, patch: (rejections: readonly Rejection[]) => Rejection[]): Recorded => ("refusal" in outcome ? { refusal: { ...outcome.refusal, rejections: patch(outcome.refusal.rejections) } } : outcome);
/** Recorders that repair, rewrite, drop or untype what the reference keeps (B2). */
const RECORDER_MUTANTS: Readonly<Record<string, Recorder>> = {
  "M-AUTO-REPAIR": capture => {
    const outcome = recordBuild(capture);
    return "refusal" in outcome && outcome.refusal.rejections.some(rejection => rejection.code === REFUSAL_CODE) ? { accepted: { exit: 0, program: READY_WORK_PROGRAM() } } : outcome;
  },
  "M-REPAIR-NOTE": capture => {
    const outcome = recordBuild(capture);
    return "refusal" in outcome ? ({ refusal: { ...outcome.refusal, repaired: outcome.refusal.rejections.map(rejection => rejection.path.replace(/-/g, "_")) } } as unknown as Recorded) : outcome;
  },
  "M-PATH-NORMALIZE": capture => mapRefusal(recordBuild(capture), rejections => rejections.map(rejection => ({ ...rejection, path: rejection.path.replace(/-/g, "_") }))),
  "M-PATH-DROP": capture => mapRefusal(recordBuild(capture), rejections => rejections.map(rejection => ({ ...rejection, path: "" }))),
  "M-FIRST-ONLY": capture => mapRefusal(recordBuild(capture), rejections => rejections.slice(0, 1)),
  "M-DEDUPE-MESSAGE": capture => mapRefusal(recordBuild(capture), rejections => rejections.filter((rejection, index) => rejections.findIndex(other => other.message === rejection.message) === index)),
  "M-MESSAGE-TYPED": capture => mapRefusal(recordBuild(capture), rejections => rejections.map(rejection => ({ ...rejection, code: BARE_MESSAGE.test(rejection.message) || rejection.path === "/id" ? rejection.code : "UNKNOWN" }))),
  "M-MESSAGE-TRIM": capture => mapRefusal(recordBuild(capture), rejections => rejections.map(rejection => ({ ...rejection, message: rejection.message.split(":")[0] ?? "" }))),
  "M-PATH-FROM-MESSAGE": capture =>
    mapRefusal(recordBuild(capture), rejections =>
      rejections.map(rejection => {
        const name = /^"(.*)" is not a valid identifier/.exec(rejection.message)?.[1];
        return name === undefined ? rejection : { ...rejection, path: `/graph_schema/candidate_types/${name}` };
      }),
    ),
  "M-UNTYPED": capture => {
    const outcome = recordBuild(capture);
    return "refusal" in outcome ? { unreadable: capture.stdout } : outcome;
  },
  "M-OK-COERCE": capture => ({ accepted: { exit: capture.rc, program: "" } }),
};
const judged = <T>(mutants: Readonly<Record<string, T>>, judge: (subject: T) => string[]): Record<string, string[]> => Object.fromEntries(Object.entries(mutants).map(([id, subject]) => [id, judge(subject)]));

// ---------------------------------------------------------------------------------------------------------------------------------
// The walk (acceptance (c) and the posture).

const posix = (path: string): string => path.split("\\").join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));
/** A path the census judges: a file below one of WALK_ROOTS. */
const judgedPath = (path: string): boolean => WALK_ROOTS.some(root => path.startsWith(`${root}/`));

interface Walk {
  readonly modules: string[];
  readonly others: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every file below one root, in name order, repository-relative; symlinks are recorded, never followed; any other entry fails closed. */
function walkRoot(root: string): Walk {
  const walk: Walk = { modules: [], others: [], symlinks: [], unreadable: [] };
  const visit = (relative: string): void => {
    const entries: Dirent[] = readdirSync(join(REPO, relative), { withFileTypes: true });
    for (const entry of [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      const child = posix(`${relative}/${entry.name}`);
      if (entry.isSymbolicLink()) walk.symlinks.push(child);
      else if (entry.isDirectory()) visit(child);
      else if (entry.isFile()) (isModule(child) ? walk.modules : walk.others).push(child);
      else walk.unreadable.push(child);
    }
  };
  visit(root);
  return walk;
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** A code literal naming the exporter surface: a vocabulary word, a document id or a producer code as a whole token. */
const SURFACE_TEXT = new RegExp(`(?<![A-Za-z0-9_])(?:${[...VOCABULARY.words, ...DOCUMENT_IDS, ...PRODUCER_CODES].map(escapeRegExp).join("|")})(?![A-Za-z0-9_])`);
/** Raw text naming one of the statement's two document words (the filing's own measure, comments included). */
const POSTURE_TEXT = new RegExp(POSTURE_WORDS.map(escapeRegExp).join("|"));

interface Findings {
  readonly spellings: string[];
  readonly transforms: string[];
  readonly transformCount: number;
}
function scriptKind(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".jsx") return ts.ScriptKind.JSX;
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
function literalText(node: ts.Node): string | undefined {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return node.text;
  return undefined;
}
function memberName(node: ts.Node): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) return node.argumentExpression.text;
  return undefined;
}
const isPropertyNameIdentifier = (node: ts.Identifier): boolean => ts.isPropertyAccessExpression(node.parent) && node.parent.name === node;
/** Whether an expression holds a kind label: a read of a vocabulary field or an alias of one, not crossing a function. */
function labelIn(node: ts.Node, aliases: ReadonlySet<string>): boolean {
  const name = memberName(node);
  if (name !== undefined && VOCABULARY.words.includes(name)) return true;
  if (ts.isIdentifier(node) && aliases.has(node.text) && !isPropertyNameIdentifier(node)) return true;
  if (ts.isFunctionLike(node)) return false;
  return ts.forEachChild(node, child => (labelIn(child, aliases) ? true : undefined)) === true;
}
/** Every identifier a binding name declares. */
function boundNames(name: ts.BindingName): string[] {
  if (ts.isIdentifier(name)) return [name.text];
  return name.elements.flatMap(element => (ts.isOmittedExpression(element) ? [] : boundNames(element.name)));
}
function bindingKey(node: ts.BindingElement): string {
  const key = node.propertyName ?? node.name;
  return ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : "";
}
/** The names bound to a kind label, to a fixed point: a declaration, assignment or loop over a label-holding expression, a
 * destructured vocabulary key, and the element parameter of an iteration or reduce callback over a label-holding receiver. */
function labelAliases(file: ts.SourceFile): Set<string> {
  const aliases = new Set<string>();
  let grew = true;
  const add = (names: readonly string[]): void => {
    for (const name of names) {
      if (!aliases.has(name)) {
        aliases.add(name);
        grew = true;
      }
    }
  };
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined && labelIn(node.initializer, aliases)) add(boundNames(node.name));
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(node.left) && labelIn(node.right, aliases)) add([node.left.text]);
    if (ts.isBindingElement(node) && VOCABULARY.words.includes(bindingKey(node))) add(boundNames(node.name));
    if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && labelIn(node.expression, aliases) && ts.isVariableDeclarationList(node.initializer)) for (const declaration of node.initializer.declarations) add(boundNames(declaration.name));
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && labelIn(node.expression.expression, aliases)) {
      const method = node.expression.name.text;
      const position = ITERATION_METHODS.includes(method) ? 0 : REDUCE_METHODS.includes(method) ? 1 : -1;
      const callback = node.arguments[0];
      const parameter = position >= 0 && callback !== undefined && (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) ? callback.parameters[position] : undefined;
      if (parameter !== undefined) add(boundNames(parameter.name));
    }
    ts.forEachChild(node, collect);
  };
  while (grew) {
    grew = false;
    collect(file);
  }
  return aliases;
}
/** One module's exporter-surface spellings (identifiers and literals) and its string transforms over a kind label (comments are
 * not read here). */
function scanSource(path: string, source: string): Findings {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKind(path));
  const at = (node: ts.Node): string => `${path}:${file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1}`;
  const aliases = labelAliases(file);
  const findings: Findings = { spellings: [], transforms: [], transformCount: 0 };
  let transformCount = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && VOCABULARY.words.includes(node.text)) findings.spellings.push(`${at(node)} ${node.text}`);
    const literal = literalText(node);
    if (literal !== undefined && SURFACE_TEXT.test(literal)) findings.spellings.push(`${at(node)} ${JSON.stringify(literal)}`);
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && TRANSFORM_METHODS.includes(node.expression.name.text)) {
      transformCount += 1;
      if (labelIn(node.expression.expression, aliases)) findings.transforms.push(`${at(node)} .${node.expression.name.text}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { ...findings, transformCount };
}
/** A file's raw lines naming a document word (comments and prose included). */
function rawHits(path: string, source: string): string[] {
  return source.split("\n").flatMap((line, index) => (POSTURE_TEXT.test(line) ? [`${path}:${index + 1}`] : []));
}
/** A file that is no module: its lines spelling the exporter surface. */
function otherSpellings(path: string, source: string): string[] {
  return source.split("\n").flatMap((line, index) => (SURFACE_TEXT.test(line) ? [`${path}:${index + 1}`] : []));
}

interface Control {
  readonly id: string;
  readonly family: string;
  readonly residual?: string;
  readonly source: string;
  readonly posture: boolean;
  readonly transform: boolean;
  readonly raw: boolean;
}
/** In-memory modules the scanner must flag (F-), keep quiet (Q-), or keep quiet as a named residual's pinned row (R-). */
const CONTROLS: readonly Control[] = [
  { id: "F-ENTRIES-REPLACE", family: "flagged", source: 'export const f = (schema) => { const out = {}; for (const [name] of Object.entries(schema.candidateTypes)) out[name.replace(/-/g, "_")] = name; return out; };', posture: true, transform: true, raw: false },
  { id: "F-DESTRUCTURED-REPLACEALL", family: "flagged", source: 'export const f = ({ candidate_types }) => Object.keys(candidate_types).map((name) => name.replaceAll("-", "_"));', posture: true, transform: true, raw: false },
  { id: "F-KEYS-LOWER", family: "flagged", source: "export const f = (block) => Object.keys(block.entity_kinds).map((kind) => kind.toLowerCase());", posture: true, transform: true, raw: false },
  { id: "F-BLOCK-LOCALE-UPPER", family: "flagged", source: "export const f = (program) => Object.keys(program.graph_schema).map((key) => key.toLocaleUpperCase());", posture: true, transform: true, raw: false },
  { id: "F-ALIAS-SPLIT", family: "flagged", source: 'export const f = (doc) => { const kinds = doc["relation_kinds"]; return Object.keys(kinds).join(",").split("-").join("_"); };', posture: true, transform: true, raw: false },
  { id: "F-RELATIONS-UPPER", family: "flagged", source: "export const f = (schema) => Object.keys(schema.relationKinds).map((name) => name.toUpperCase());", posture: true, transform: true, raw: false },
  { id: "F-ENTITIES-NORMALIZE", family: "flagged", source: 'export const f = (schema) => Object.keys(schema.entityKinds).map((name) => name.normalize("NFKC"));', posture: true, transform: true, raw: false },
  { id: "F-PARTICIPANTS-LOCALE-LOWER", family: "flagged", source: "export const f = (role) => role.participantKinds.map((kind) => kind.toLocaleLowerCase());", posture: true, transform: true, raw: false },
  { id: "F-ASSIGNED-LOWER", family: "flagged", source: 'export const f = (schema) => { let name = ""; name = Object.keys(schema.entityKinds)[0] ?? ""; return name.toLowerCase(); };', posture: true, transform: true, raw: false },
  { id: "F-REDUCE-UPPER", family: "flagged", source: 'export const f = (schema) => Object.keys(schema.relationKinds).reduce((acc, name) => acc + name.toUpperCase(), "");', posture: true, transform: true, raw: false },
  { id: "F-FOR-IN-SPLIT", family: "flagged", source: 'export const f = (schema) => { const out = []; for (const name in schema.candidateTypes) out.push(name.split("-")); return out; };', posture: true, transform: true, raw: false },
  { id: "F-REFERENCE-REPLACE", family: "flagged", source: 'export const f = (candidate) => candidate.relationKind.replace(/_/g, "-");', posture: true, transform: true, raw: false },
  { id: "F-CODE-LITERAL", family: "flagged", source: 'export const f = (rejection) => rejection.code === "GF_IDENTIFIER_INVALID";', posture: true, transform: false, raw: false },
  { id: "F-DOCUMENT-LITERAL", family: "flagged", source: 'export const f = () => ({ schema: "graphpolicy.function.v1" });', posture: true, transform: false, raw: false },
  { id: "F-RAW-COMMENT", family: "flagged", source: "// the GraphDataIR exporter lands here\nexport const f = 1;", posture: false, transform: false, raw: true },
  { id: "Q-OWN-LOWER", family: "quiet", source: "export const f = (text) => text.toLowerCase();", posture: false, transform: false, raw: false },
  { id: "Q-OWN-DASH", family: "quiet", source: 'export const f = (slug) => slug.replace(/-/g, "_");', posture: false, transform: false, raw: false },
  { id: "Q-CLI-SCHEMA", family: "quiet", source: 'export const f = (envelope) => envelope.schema === "graphpolicy.cli.v1";', posture: false, transform: false, raw: false },
  { id: "Q-TABLE", family: "quiet", source: 'const TABLE = new Map([["ready-work", "ready_x2d_work"]]); export const f = (schema) => Object.keys(schema.candidateTypes).map((name) => TABLE.get(name) ?? name);', posture: true, transform: false, raw: false },
  { id: "Q-BYTE-EQUAL", family: "quiet", source: "export const f = (a, b) => Object.keys(a.candidate_types).every((name) => name in b.candidate_types);", posture: true, transform: false, raw: false },
  { id: "R-UNTYPED-FLOW", family: "residual", residual: "R-UNTYPED-FLOW", source: "const toId = (name) => name.toLowerCase(); export const f = (schema) => Object.keys(schema.candidateTypes).map(toId);", posture: true, transform: false, raw: false },
  { id: "R-UNTYPED-FLOW-FROM", family: "residual", residual: "R-UNTYPED-FLOW", source: "export const f = (schema) => Array.from(Object.keys(schema.candidateTypes), (name) => name.toLowerCase());", posture: true, transform: false, raw: false },
  { id: "R-COMPUTED", family: "residual", residual: "R-COMPUTED", source: 'export const f = (s) => Object.keys(s[["candidate", "Types"].join("")]).map((name) => name.toLowerCase());', posture: false, transform: false, raw: false },
  { id: "R-OTHER-METHOD", family: "residual", residual: "R-OTHER-METHOD", source: "export const f = (schema) => Object.keys(schema.candidateTypes).map((name) => String.prototype.toLowerCase.call(name));", posture: true, transform: false, raw: false },
  { id: "R-COMMENT", family: "residual", residual: "R-COMMENT", source: "// Object.keys(schema.candidateTypes).map((name) => name.toLowerCase())\nexport const f = 1;", posture: false, transform: false, raw: false },
  { id: "R-NAMESAKE", family: "residual", residual: "R-NAMESAKE", source: 'export const f = (role, output, node) => role.kind.toLowerCase() + output.of.replace(/-/g, "_") + node.candidate.toUpperCase();', posture: false, transform: false, raw: false },
  { id: "R-LITERAL", family: "residual", residual: "R-LITERAL", source: 'export const f = () => "ready-work".replace(/-/g, "_");', posture: false, transform: false, raw: false },
];
/** R-OUTSIDE's pinned row: the walk's root predicate leaves test helpers and fixtures unjudged. */
const OUTSIDE = { judged: "src/workbench/example.ts", unjudged: "test/helpers/example.ts" };
interface ControlVerdict {
  readonly posture: boolean;
  readonly transform: boolean;
  readonly raw: boolean;
  readonly spellings: readonly string[];
  readonly transforms: readonly string[];
}
/** The vocabulary words one spelling entry names (an identifier, or the words inside a JSON-quoted literal). */
function wordsIn(entry: string): string[] {
  const rest = entry.slice(entry.indexOf(" ") + 1);
  const spelled = rest.startsWith('"') ? String(JSON.parse(rest)) : rest;
  return VOCABULARY.words.filter(word => new RegExp(`(?<![A-Za-z0-9_])${escapeRegExp(word)}(?![A-Za-z0-9_])`).test(spelled));
}
function controlVerdict(control: Control): ControlVerdict {
  const scan = scanSource(`control/${control.id}.ts`, control.source);
  return { posture: scan.spellings.length > 0, transform: scan.transforms.length > 0, raw: rawHits(`control/${control.id}.ts`, control.source).length > 0, spellings: scan.spellings, transforms: scan.transforms };
}

// ---------------------------------------------------------------------------------------------------------------------------------
// The bead row (the outside anchor).

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** A filing's row in the tracked bead export (the owner filing's, or the follow-up's), found by id on a line that parses. */
function readBeadRow(id: string): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(id)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${id}`);
}
/** The pins the follow-up filing's title names: the one the gate's coordinated pin hollow removed (L2-01) and the one whose case
 * its echo probe replaced (L2-02). */
function probedPins(title: string): { readonly hollowed: string; readonly echoed: string } {
  const found = /L2-01 removes pin (\w+) together from ROWS, the frozen-shape literal, IMPL, the roster rows and the roster titles .*? and L2-02 replaces (\w+)'s case with one that echoes its roster witness/.exec(title);
  if (found?.[1] === undefined || found[2] === undefined) throw new Error(`the ${FOLLOW_UP} row names no probed pins`);
  return { hollowed: found[1], echoed: found[2] };
}
/** The filing's acceptance clauses: the text between "Acceptance: " and ". Not P0: ", split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Not P0: ", start);
  if (start < 0 || end < 0) throw new Error(`${BEAD} notes carry no Acceptance sentence`);
  return notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/);
}

const REACHED: string[] = [];
/** The judged set's assertion count at its end (`judged:<n>`), then each pin's when its case reached its end, both witness
 * comparisons included (`${pin}:${n}`), in run order: the runner records a pin's count, never the case (the echo guard). */
const ASSERTED: string[] = [];

/** The runner's own listing of one root's modules: node's recursive readdirSync, a second code path beside walkRoot (which
 * recurses by hand and records a symlink instead of entering it; readdirSync enters a symlinked directory, so a symlink below a
 * root reds both), regular files with a module extension, repository-relative, sorted. */
function listedModules(root: string): string[] {
  return readdirSync(join(REPO, root), { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => posix(relative(REPO, join(entry.parentPath, entry.name))))
    .filter(isModule)
    .sort();
}
/** The runner's second count of the transform calls in those modules: its own visitor over each parsed file, never scanSource. */
function countTransformCalls(paths: readonly string[]): number {
  let total = 0;
  for (const path of paths) {
    const file = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, false, scriptKind(path));
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && TRANSFORM_METHODS.includes(node.expression.name.text)) total += 1;
      ts.forEachChild(node, visit);
    };
    visit(file);
  }
  return total;
}
/** A module inventory's digest: the SHA-256 of its sorted paths, one per line, first 16 hex characters. */
const inventoryDigest = (paths: readonly string[]): string => sha256([...paths].sort().join("\n")).slice(0, 16);
/** C1's live leg as the runner recounts it, outside the case: each root's module count, the transform calls, the inventory digest. */
function recountWalk(): Json {
  const listed = WALK_ROOTS.map(root => ({ root, modules: listedModules(root) }));
  const all = listed.flatMap(entry => entry.modules);
  return json({ modules: Object.fromEntries(listed.map(entry => [entry.root, entry.modules.length])), transformCount: countTransformCalls(all), inventory: inventoryDigest(all) });
}
/** Whether a live leg reads the tree: every root's module count at or above its floor, the transform calls at or above
 * TRANSFORM_FLOOR and a 16-hex inventory digest (a recount gutted to an empty or partial leg fails it). */
function liveFloorsMet(leg: Json | undefined): boolean {
  if (leg === undefined || !isJsonObject(leg)) return false;
  const modules = leg.modules;
  if (modules === undefined || !isJsonObject(modules)) return false;
  const rootsMet = WALK_ROOTS.every(root => {
    const found = modules[root];
    return typeof found === "number" && found >= (FLOORS[root] ?? Number.POSITIVE_INFINITY);
  });
  const { transformCount, inventory } = leg;
  return rootsMet && typeof transformCount === "number" && transformCount >= TRANSFORM_FLOOR && typeof inventory === "string" && /^[0-9a-f]{16}$/.test(inventory);
}
/** The pins whose case returns a LIVE leg - values the run measures and the roster cannot hold - each with the runner's own
 * recount the leg is held to; the follow-up filing's row names the pin (the judged set). */
const LIVE: Readonly<Record<string, () => Json>> = { C1: recountWalk };
/** A pin's witness split into the part the roster holds and its live leg (undefined when the case returns none). */
function liveSplit(witness: Json): { readonly held: Json; readonly live: Json | undefined } {
  if (!isJsonObject(witness) || !Object.hasOwn(witness, "live")) return { held: witness, live: undefined };
  const { live, ...held } = witness;
  return { held, live };
}
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return json({ pin, ...witness });
}
const describeOutcome = (outcome: ExportOutcome): string => ("names" in outcome ? `names ${outcome.names.map(entry => `${entry.source}=>${entry.identifier}`).join(" ")}` : outcome.refused === "collision" ? `collision ${outcome.identifier} <- ${outcome.sources.join(" ")}` : `table ${outcome.reason}`);
const describeRecord = (outcome: Recorded): string => ("refusal" in outcome ? `refusal ${outcome.refusal.code} exit ${outcome.refusal.exit} ${outcome.refusal.rejections.map(rejection => `${rejection.code}@${rejection.path}`).join(" ")}` : "accepted" in outcome ? `accepted exit ${outcome.accepted.exit} ${outcome.accepted.program.slice(0, 32)}` : `unreadable ${outcome.unreadable}`);
const identityOf = (stdout: string, key: string): string | null => {
  const identities = envelope(stdout).identities;
  const value = isJsonObject(identities ?? null) ? (identities as JsonObject)[key] : undefined;
  return typeof value === "string" ? value : null;
};

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const facts = ROSTER.producer;
    for (const key of ["ts/src/function-ir/catalogue.ts:405", "ts/src/function-ir/catalogue.ts:406"]) expect(installedLine(key), `${key} is byte-identical at the installed source`).toBe(pinLine(key));
    expect(headLine("ts/src/function-ir/catalogue.ts:405"), "IDENTIFIER_PATTERN is unchanged at gp main").toBe(pinLine("ts/src/function-ir/catalogue.ts:405"));
    for (const fixture of [facts.program, facts.schema]) {
      expect(sha256(fixture.bytes), `${fixture.path} bytes are the recorded ones`).toBe(fixture.sha256);
      expect(gitBlob(fixture.bytes), `${fixture.path} is the producer's blob`).toBe(fixture.blob);
    }
    expect(facts.runs.filter(entry => sha256(bytesOf(presented(entry))) !== entry.presentedSha256).map(entry => entry.id), "every presented document re-derives from the vendored bytes").toEqual([]);
    expect(facts.runs.filter(entry => entry.stderr !== "").map(entry => entry.id), "every run kept stderr empty").toEqual([]);
    const typeBuilds = facts.runs.filter(entry => entry.verb === "build" && entry.family === "candidate-type");
    const verdicts = typeBuilds.map(entry => {
      const admits = IDENTIFIER_PATTERN.test(entry.label);
      expect(entry.rc === 0, `${entry.id}: the quoted IDENTIFIER_PATTERN decides the measured build`).toBe(admits);
      if (!admits) expect(refusalRejections(entry.stdout).map(rejection => rejection.path), `${entry.id} is refused at its candidate type`).toContain(`/graph_schema/candidate_types/${entry.label}`);
      return `${entry.id} rc ${entry.rc} pattern ${admits ? "admits" : "refuses"}`;
    });
    expect(verdicts.some(line => line.includes("refuses")) && verdicts.some(line => line.includes("admits")), "the probes reach both verdicts").toBe(true);
    const programIds = facts.runs
      .filter(entry => entry.family === "program-id")
      .map(entry => {
        expect(entry.rc === 0, `${entry.id}: the quoted PROGRAM_ID_PATTERN decides the measured build`).toBe(PROGRAM_ID_PATTERN.test(entry.label));
        expect(IDENTIFIER_PATTERN.test(entry.label), `${entry.id}: the identifier grammar takes the opposite rule`).toBe(!PROGRAM_ID_PATTERN.test(entry.label));
        return `${entry.id} rc ${entry.rc}`;
      });
    const checks = facts.runs.filter(entry => entry.verb === "graph check");
    for (const entry of checks) {
      const result = envelope(entry.stdout).result;
      expect([entry.rc, isJsonObject(result ?? null) ? (result as JsonObject).valid : null], `${entry.id}: the data layer admits ${entry.label}`).toEqual([0, true]);
    }
    const schemas = checks.map(entry => identityOf(entry.stdout, "schema"));
    expect(new Set(schemas).size, "each spelling is its own schema").toBe(checks.length);
    expect(new Set(checks.map(entry => identityOf(entry.stdout, "graph"))).size, "over one snapshot").toBe(1);
    const admitted = FIXTURE_KINDS.map(kind => checks.some(entry => entry.label === kind && entry.rc === 0));
    expect(admitted, "the data layer admits both fixture kinds").toEqual([true, true]);
    expect(FIXTURE_KINDS.map(kind => IDENTIFIER_PATTERN.test(kind)), "the program layer admits only the underscore kind").toEqual([false, true]);
    const dashedSchema = identityOf(run(`check-${DASHED}`).stdout, "schema") ?? "";
    const underscoreProgram = identityOf(run(UNDERSCORED).stdout, "program") ?? "";
    expect(pinLine(`${F11}:53`), "the dashed schema identity is the one the pin's F11 recorded").toContain(`"schema":"${dashedSchema}"`);
    expect(pinLine(`${F11}:41`), "the underscore program identity is the one the pin's F11 recorded").toContain(`"program":"${underscoreProgram}"`);
    expect(pinLine("02-contract-audit.md:100"), "02:100 names the pass-check, fail-build gap").toContain("A `ready-work` source candidate type can therefore pass graph check but fail build.");
    // D-NAMES-1 is a GP-FCA-2026-10-21 decision label (program status at 0107c72992f3:
    // "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics")
    expect([installedLine("docs/dev/RULINGS.md:778").includes("RULED-OTHER"), installedLine("docs/dev/RULINGS.md:778").includes("no silent rename"), installedLine("docs/dev/RULINGS.md:800").includes("no GP-generated mapping")], "D-NAMES-1 is ruled at the installed source: both grammars kept, no mapping, no silent rename").toEqual([true, true, true]);
    expect(pinLine("04-verification-playbook.md:125"), "the installed-replay cell is the gate's second condition").toContain("Adapter can represent source names");
    return done("A1", {
      grammar: { identifier: IDENTIFIER_PATTERN.source, programId: PROGRAM_ID_PATTERN.source },
      installed: { sourceSha: facts.installed.sourceSha.slice(0, 12), entrySha256: facts.installed.entrySha256.slice(0, 16), cleanTree: facts.installed.cleanTree },
      verdicts,
      programIds,
      checks: checks.map(entry => `${entry.id} rc ${entry.rc} ${(identityOf(entry.stdout, "schema") ?? "").slice(-8)}`),
      f11: { dashedSchema: dashedSchema.slice(-12), underscoreProgram: underscoreProgram.slice(-12) },
    });
  },
  A2: () => {
    const outcomes = Object.fromEntries(
      TABLE_CASES.map(entry => {
        const got = exportKindNames(FIXTURE_KINDS, entry.table);
        expect(got, `${entry.id}`).toStrictEqual(entry.expect);
        if ("names" in got) {
          expect(new Set(got.names.map(name => name.identifier)).size, `${entry.id}: two distinct names, never one merged name`).toBe(FIXTURE_KINDS.length);
          expect(
            got.names.map(name => name.source),
            `${entry.id}: each source label verbatim`,
          ).toEqual([...FIXTURE_KINDS]);
        }
        return [entry.id, describeOutcome(got)];
      }),
    );
    expect(Object.values(outcomes).filter(line => line.startsWith("names")).length >= 1 && Object.values(outcomes).some(line => line.startsWith("collision")), "the fixture reaches both allowed outcomes").toBe(true);
    expect(judgeExporter(exportKindNames), "the reference breaks no rule").toEqual([]);
    return done("A2", { fixture: [...FIXTURE_KINDS], outcomes, singles: SINGLES.length, reference: judgeExporter(exportKindNames) });
  },
  A3: () => {
    const verdicts = judged(MAPPING_MUTANTS, judgeExporter);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every mapping mutant is refused").toEqual([]);
    return done("A3", { reference: judgeExporter(exportKindNames), mutants: verdicts });
  },
  B1: () => {
    const refused = run(DASHED);
    const parsed = envelope(refused.stdout);
    const error = parsed.error;
    expect([refused.rc, refused.stderr], "exit 2, stderr empty").toEqual([2, ""]);
    expect(Object.keys(parsed), "the envelope's keys").toEqual(["schema", "ok", "error", "identities", "capabilities"]);
    expect([parsed.schema, parsed.ok, isJsonObject(error ?? null) ? (error as JsonObject).code : null], "a typed CLI refusal").toEqual([CLI_SCHEMA, false, ENVELOPE_CODE]);
    expect(parsed.identities, "no program identity is minted").toEqual({});
    const rejections = refusalRejections(refused.stdout);
    expect(rejections.map(rejection => rejection.code), "three GF_IDENTIFIER_INVALID rejections").toEqual([REFUSAL_CODE, REFUSAL_CODE, REFUSAL_CODE]);
    // F11 is a GP-FCA-2026-10-21 finding label (program status at 0107c72992f3:
    // "Proposed audit obligations and candidate resolutions, NOT accepted GraphPolicyCLI semantics")
    expect(rejections, "the installed gp's rejections are the pin's F11 record").toStrictEqual(f11Rejections());
    const families = ROSTER.producer.runs
      .filter(entry => entry.verb === "build" && entry.rc !== 0 && KIND_FAMILIES.includes(entry.family))
      .map(entry => {
        const document = presented(entry);
        const paths = refusalRejections(entry.stdout).map(rejection => rejection.path);
        expect(
          paths.filter(path => !pointsAtLabel(document, path, entry.label)),
          `${entry.id}: every rejection path names the label in the presented document`,
        ).toEqual([]);
        expect(
          refusalRejections(entry.stdout).every(rejection => rejection.code === REFUSAL_CODE),
          `${entry.id}: every rejection is GF_IDENTIFIER_INVALID`,
        ).toBe(true);
        return `${entry.family} ${entry.id}: ${paths.join(" ")}`;
      });
    expect(new Set(ROSTER.producer.runs.filter(entry => entry.verb === "build" && entry.rc !== 0 && KIND_FAMILIES.includes(entry.family) && entry.id !== DASHED).map(entry => entry.family)), "the other kind families were measured").toEqual(new Set(KIND_FAMILIES));
    const installedMessage = rejections[0]?.message ?? "";
    const changed = headMessage(DASHED);
    expect(installedMessage, "the installed message is the bare one").toMatch(BARE_MESSAGE);
    expect(changed === installedMessage, "the head's message differs").toBe(false);
    expect(changed.startsWith(`"${DASHED}" is not a valid identifier: `) && changed.endsWith(IDENTIFIER_PATTERN.source), "the head's message names the grammar").toBe(true);
    expect(installedLine("docs/dev/RULINGS.md:810"), "the ruling lets the message change, never code or path").toContain("FunctionIR's GF_IDENTIFIER_INVALID message may change without changing code/path");
    expect(headLine("docs/dev/DECISIONS.md:5394"), "IMPL-12490 keeps codes, paths and order").toContain("every code, path and the collect-all order are unchanged");
    return done("B1", { exit: refused.rc, envelope: ENVELOPE_CODE, identities: json(parsed.identities), rejections: rejections.map(rejection => `${rejection.code}@${rejection.path}`), families, headMessage: changed });
  },
  B2: () => {
    expect(judgeRecorder(recordBuild), "the reference recorder breaks no rule").toEqual([]);
    const outcomes = Object.fromEntries(RECORDER_CASES.map(entry => [entry.id, describeRecord(recordBuild(entry.capture))]));
    const dashed = recordBuild(run(DASHED));
    expect("refusal" in dashed && dashed.refusal.rejections.map(rejection => rejection.path), "the producer's path strings, verbatim").toEqual(refusalRejections(run(DASHED).stdout).map(rejection => rejection.path));
    expect(Object.keys(dashed), "nothing repaired, nothing retried").toEqual(["refusal"]);
    const verdicts = judged(RECORDER_MUTANTS, judgeRecorder);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.length === 0).map(([id]) => id), "every recorder mutant is refused").toEqual([]);
    return done("B2", { cases: RECORDER_CASES.length, outcomes, reference: judgeRecorder(recordBuild), mutants: verdicts });
  },
  C1: () => {
    const walks = WALK_ROOTS.map(root => ({ root, walk: walkRoot(root) }));
    const modules = Object.fromEntries(walks.map(({ root, walk }) => [root, walk.modules.length]));
    const floorsMet = WALK_ROOTS.every(root => (modules[root] ?? 0) >= (FLOORS[root] ?? Number.POSITIVE_INFINITY));
    expect(floorsMet, `module floors ${JSON.stringify(FLOORS)} over ${JSON.stringify(modules)}`).toBe(true);
    const sources = walks.flatMap(({ walk }) => walk.modules.map(path => ({ path, source: readFileSync(join(REPO, path), "utf8") })));
    const scans = sources.map(({ path, source }) => scanSource(path, source));
    const spellings = scans.flatMap(scan => scan.spellings);
    const transforms = scans.flatMap(scan => scan.transforms);
    const transformCount = scans.reduce((sum, scan) => sum + scan.transformCount, 0);
    const others = walks.flatMap(({ walk }) => walk.others.map(path => ({ path, source: readFileSync(join(REPO, path), "utf8") })));
    const raw = [...sources, ...others].flatMap(({ path, source }) => rawHits(path, source));
    const otherHits = others.flatMap(({ path, source }) => otherSpellings(path, source));
    const symlinks = walks.flatMap(({ walk }) => walk.symlinks);
    const unreadable = walks.flatMap(({ walk }) => walk.unreadable);
    expect(
      { spellings, transforms, raw, otherHits, symlinks, unreadable },
      "no module names a kind field, document id or producer code, no transform runs over a kind label, no file names GraphDataIR or FunctionIR or spells the surface, and every entry below the roots is a file or a directory",
    ).toEqual({ spellings: [], transforms: [], raw: [], otherHits: [], symlinks: [], unreadable: [] });
    expect(transformCount >= TRANSFORM_FLOOR, `the transform rule read ${transformCount} calls (floor ${TRANSFORM_FLOOR})`).toBe(true);
    const verdicts = CONTROLS.map(control => ({ control, verdict: controlVerdict(control) }));
    for (const { control, verdict } of verdicts) expect({ posture: verdict.posture, transform: verdict.transform, raw: verdict.raw }, `control ${control.id}`).toEqual({ posture: control.posture, transform: control.transform, raw: control.raw });
    const flagged = verdicts.filter(({ control }) => control.family === "flagged");
    const soleWords = new Set(
      flagged.flatMap(({ verdict }) => {
        const named = new Set(verdict.spellings.flatMap(wordsIn));
        return named.size === 1 ? [...named] : [];
      }),
    );
    expect([...soleWords].sort(), "every vocabulary word alone trips a flagged control").toEqual([...VOCABULARY.words]);
    const methods = new Set(flagged.flatMap(({ verdict }) => verdict.transforms.map(entry => entry.slice(entry.lastIndexOf(".") + 1))));
    expect([...methods].sort(), "every transform method trips a flagged control").toEqual([...TRANSFORM_METHODS].sort());
    expect([...new Set(CONTROLS.flatMap(control => (control.residual === undefined ? [] : [control.residual])))], "each residual but R-OUTSIDE has its quiet row").toEqual(RESIDUAL_FAMILIES.filter(family => family !== "R-OUTSIDE"));
    const outside = { judged: judgedPath(OUTSIDE.judged), unjudged: judgedPath(OUTSIDE.unjudged) };
    expect(outside, "R-OUTSIDE: test helpers are not judged").toEqual({ judged: true, unjudged: false });
    return done("C1", {
      roots: [...WALK_ROOTS],
      floors: { ...FLOORS },
      floorsMet,
      transformFloor: TRANSFORM_FLOOR,
      transformFloorMet: transformCount >= TRANSFORM_FLOOR,
      spellings,
      transforms,
      raw,
      otherHits,
      symlinks,
      unreadable,
      controls: verdicts.map(({ control, verdict }) => `${control.id} ${control.family} posture=${verdict.posture} transform=${verdict.transform} raw=${verdict.raw}`),
      outside,
      live: { modules, transformCount, inventory: inventoryDigest(walks.flatMap(({ walk }) => walk.modules)) },
    });
  },
  C2: () => {
    const singles = Object.fromEntries(SINGLES.map(label => [label, describeOutcome(exportKindNames([label], []))]));
    expect(Object.entries(singles).filter(([label, line]) => line !== `names ${label}=>${label}`).map(([label]) => label), "no label is renamed outside the table").toEqual([]);
    const escapeTable = TABLE_CASES.find(entry => entry.id === "T-ESCAPE")?.table ?? [];
    const honoured = exportKindNames([DASHED, "ready-bead"], escapeTable);
    expect(honoured, "the recorded table renames its label and nothing else").toStrictEqual({ names: [{ source: DASHED, identifier: "ready_x2d_work" }, { source: "ready-bead", identifier: "ready-bead" }] });
    const verdicts = judged(TRANSFORM_MUTANTS, judgeExporter);
    expect(Object.entries(verdicts).filter(([, rules]) => !rules.includes("J-VERBATIM")).map(([id]) => id), "every transform mutant renames outside the table").toEqual([]);
    expect(Object.entries(verdicts).filter(([, rules]) => rules.includes("J-TABLE")).map(([id]) => id), "and none overrides the table").toEqual([]);
    return done("C2", { singles: Object.keys(singles).length, honoured: describeOutcome(honoured), mutants: verdicts });
  },
};

describe("wb-gxd7.4 gp kind-label census (GPC-FEEDBACK-CONTRACT-AUDIT-R4)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:2", "C:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        pin: PIN,
        fixtureKinds: FIXTURE_KINDS,
        refusalCode: REFUSAL_CODE,
        envelopeCode: ENVELOPE_CODE,
        cliSchema: CLI_SCHEMA,
        postureWords: POSTURE_WORDS,
        walkRoots: WALK_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        floors: FLOORS,
        transformMethods: TRANSFORM_METHODS,
        transformFloor: TRANSFORM_FLOOR,
        iterationMethods: ITERATION_METHODS,
        reduceMethods: REDUCE_METHODS,
        kindFamilies: KIND_FAMILIES,
        vocabulary: VOCABULARY,
        documentIds: DOCUMENT_IDS,
        surfaceText: `${SURFACE_TEXT.source}/${SURFACE_TEXT.flags}`,
        postureText: `${POSTURE_TEXT.source}/${POSTURE_TEXT.flags}`,
        tableCases: TABLE_CASES.map(entry => entry.id),
        singles: SINGLES,
        recorderCases: RECORDER_CASES.map(entry => entry.id),
        controls: CONTROLS.map(control => control.id),
        mappingMutants: Object.keys(MAPPING_MUTANTS),
        transformMutants: Object.keys(TRANSFORM_MUTANTS),
        recorderMutants: Object.keys(RECORDER_MUTANTS),
        covers: COVERS,
        coverStop: COVER_STOP,
        followUp: FOLLOW_UP,
        livePins: Object.keys(LIVE),
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual(json({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] }));
    // The derived vocabulary: three kind maps in one block, their three data-layer twins, and the generic references excluded.
    expect([VOCABULARY.maps.length, VOCABULARY.dataMaps.length, VOCABULARY.blocks.length], "one data map per FunctionIR map, one block").toEqual([3, 3, 1]);
    expect(VOCABULARY.excluded, "the excluded names are exactly the generic references").toEqual(VOCABULARY.references.filter(name => GENERIC.test(name)));
    // The producer lines: the quote, the two authority sentences and the identifier sites.
    expect(ROSTER.producer.pin.startsWith(PIN), "the roster measured the pin the filing cites").toBe(true);
    expect([ROSTER.producer.installed.sourceSha, ROSTER.producer.head, ROSTER.producer.pin].every(sha => /^[0-9a-f]{40}$/.test(sha)), "every producer revision is a full sha").toBe(true);
    expect([/^[0-9a-f]{64}$/.test(ROSTER.producer.installed.entrySha256), ROSTER.producer.installed.entry, ROSTER.producer.installed.cleanTree], "the installed gp is identified by its built entry's SHA-256 over a clean tree").toEqual([true, "ts/dist/main.js", true]);
    expect(pinLine("02-contract-audit.md:100"), "the quote is the producer's 02:100 words").toContain(ROSTER.quote);
    const authorityLines: Readonly<Record<string, string>> = { "03:58": "03-developer-workplan.md:58", "04:98": "04-verification-playbook.md:98" };
    expect(ROSTER.authority.filter(entry => !pinLine(authorityLines[entry.ref] ?? "").includes(entry.quote)).map(entry => entry.ref), "each authority sentence sits in its producer line").toEqual([]);
    expect(ROSTER.authority.map(entry => entry.ref), "the filing's two authority lines").toEqual(Object.keys(authorityLines));
    expect(pinLine("ts/src/function-ir/structure.ts:257"), "the pin's identifier site names its JSON pointer and bare message").toContain(`this.sink.add("GF_IDENTIFIER_INVALID", this.at(key), \`"${placeholder("v")}" is not a valid identifier\`);`);
    expect(headLine("ts/src/function-ir/structure.ts:254"), "the head's site keeps code and path and routes the message").toContain('this.sink.add("GF_IDENTIFIER_INVALID", this.at(key), invalidIdentifierMessage(v));');
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow(BEAD);
    const clauses = acceptanceClauses(bead.notes);
    const posture = /Not P0: (.+?); gated duty, P2\./.exec(bead.notes)?.[1];
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    expect(posture, "the filing's posture fact is the roster's").toBe(ROSTER.posture);
    const coverage = [...clauses, ROSTER.posture].map(clause => ROWS.filter(row => clause.length > 0 && row.label.includes(clause)).map(row => row.id));
    expect(coverage.filter(ids => ids.length !== 1).length, "every clause of the filing and its posture fact sit verbatim in exactly one row label").toBe(0);
    expect(ROWS.filter(row => !coverage.some(ids => ids.includes(row.id))).map(row => row.id), "every row carries a clause of the filing").toEqual([]);
    expect(coverage, "each clause and the posture fact sit verbatim in exactly one row label, every row carrying one").toEqual([["A"], ["B"], ["C"], ["C"]]);
    // The pins in the filing (wb-hzwr, L2-01): each row's obligation text is the clauses and posture fact its label carries, each
    // clause without its enumeration; every pin covers words of it, every word is covered, each pin covers one of its own.
    const sources = [...clauses.map(clause => clause.slice(4)), posture ?? ""];
    const obligations = Object.fromEntries(ROWS.map(row => [row.id, sources.filter((_, index) => coverage[index]?.length === 1 && coverage[index]?.[0] === row.id).join("; ")]));
    expect(Object.keys(COVERS), "every pin holds a share of the filing, in row order").toEqual(ROWS.flatMap(row => row.pins));
    for (const row of ROWS) {
      const text = obligations[row.id] ?? "";
      expect(coverageOf(text, row.pins), `row ${row.id}: its pins cover every word of its obligation text, each pin a word of its own`).toStrictEqual({ outside: [], uncovered: [], withoutOwnWord: [] });
      for (const pin of row.pins) expect(coverageOf(text, row.pins.filter(other => other !== pin)).uncovered.length > 0, `row ${row.id} without ${pin}: words of the filing go uncovered`).toBe(true);
    }
    // The follow-up filing (wb-hzwr): the pin its coordinated hollow removed is still judged, and the pin whose case its echo
    // probe replaced carries the live leg.
    const probed = probedPins(readBeadRow(FOLLOW_UP).title);
    expect(ROWS.flatMap(row => row.pins), "the follow-up's coordinated hollow removed a pin ROWS still holds").toContain(probed.hollowed);
    expect(Object.keys(LIVE), "the pin whose case the follow-up's echo probe replaced carries the live leg").toEqual([probed.echoed]);
    expect(bead.notes, "the filing states the roster's statement").toContain(`Full statement (title trimmed to bd's 500-character limit): ${ROSTER.statement}`);
    expect(bead.notes, "the filing quotes the roster's quote at the roster's citation").toContain(`Quote: '${ROSTER.quote}' ${ROSTER.citation};`);
    expect(bead.notes, "the filing's authority sentences and Pi's posture are the roster's").toContain(`Authority: ${ROSTER.authority.map(entry => `${entry.ref} '${entry.quote}'`).join("; ")}; ${ROSTER.piPosture}`);
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${PIN}`), "the citation pins the program sha").toBe(true);
    expect([...(clauses[0] ?? "").matchAll(/`([^`]+)`/g)].map(match => match[1]), "clause (a)'s kinds are FIXTURE_KINDS").toEqual([...FIXTURE_KINDS]);
    expect(/^\(b\) a fixture (\S+) build refusal/.exec(clauses[1] ?? "")?.[1], "clause (b)'s code is REFUSAL_CODE").toBe(REFUSAL_CODE);
    expect(/^\[[A-Z0-9-]+\] When Pi's (\S+) exporter or (\S+) program/.exec(ROSTER.statement)?.slice(1), "the statement's two document words are POSTURE_WORDS").toEqual([...POSTURE_WORDS]);
    expect(ROSTER.codeFacts.filter(fact => !bead.notes.includes(fact)), "the filing names every code fact the roster holds").toEqual([]);
    expect(ROSTER.codeFacts.filter(fact => fact.startsWith("IDENTIFIER_PATTERN ") || fact.startsWith("PROGRAM_ID_PATTERN ")), "the filing's two pattern facts are the quoted constants").toEqual([`IDENTIFIER_PATTERN /${IDENTIFIER_PATTERN.source}/`, `PROGRAM_ID_PATTERN /${PROGRAM_ID_PATTERN.source}/`]);
    expect(ROSTER.codeFacts.length).toBe(5);
    ASSERTED.push(`judged:${expect.getState().assertionCalls}`);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          const { held, live } = liveSplit(witness);
          expect(held).toStrictEqual(rosterWitness(pin));
          const recount = LIVE[pin];
          const recounted = recount === undefined ? undefined : recount();
          expect(live, `${pin}: the live leg is the runner's own recount, made outside the case`).toStrictEqual(recounted);
          if (recounted !== undefined) expect(liveFloorsMet(recounted), `${pin}: the recount reads the tree above every floor`).toBe(true);
          ASSERTED.push(`${pin}:${expect.getState().assertionCalls}`);
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
    expect(ASSERTED, "the judged set and every pin reached their ends with their pinned assertion counts, each pin's witness comparisons included, in run order").toEqual([...ROSTER.assertions]);
  });
});
