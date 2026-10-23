/**
 * wb-tnz5.4 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R5), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * replays or relays rf renders over accepted federation receipts (gated FW-CFRR-04c rfc-bak67.12: not shipped; the exit-8 code
 * exists today), it shall present replayed output as history pinned to its receipt, never as a fresh owner read, honour
 * RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8, metadata source_id) as fail-closed with no fresh owner fetch substituted for the
 * replay result, and carry the exported owner identity verbatim."
 * (certified-federated-reactive-refinement-2026-10-18/BEADS-2026-10-21.md:45@6a251bf73af5). Acceptance, quoted: "(a) on
 * RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8) Pi reports replay unavailable with the producer's metadata.source_id echoed and
 * presents no fallback owner read as the replay output; (b) replay output is labelled historical/pinned and names its receipt, no
 * fresh/current label, owner identity fields byte-identical; (c) a hermetic guard pins that no Pi argv names rf context replay
 * today."
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-22; producer rows read from its installed
 * package, read-only): domain/diagnostics.py registers RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (:3316-3318) at exit
 * _EXIT_NOT_REPLAYABLE (:1797, 8) with metadata_keys ("source_id",), its comment reading "exit 8 naming the source_id, nothing
 * substituted". THE FIXTURE (the roster's two envelopes, test/fixtures/rf-replay-history-roster.json) is MEASURED by the cutting
 * seat in one scratch git repository holding an rf jsonl workspace whose graph feeds a git source to a declarative component (the
 * source's git.read granted by a [[trust.rule]]): `replay` is the stdout of `rf context replay RENDER --json` (exit 0) right after
 * the committed render, and `refusal` the stdout of the same command (exit 8) once the render's recorded commit was unreachable and
 * pruned (an orphan branch, the old branch deleted, the reflog expired, gc --prune=now). Only the scratch root was rewritten to
 * /fixture/rf-workspace: in both envelopes' workspace and in the refusal's message.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). Its one rf launch spawns `rf
 * --workspace <root> context render ... --no-commit --no-input --json` (renderArgv, :111-115) and it admits only context.render
 * envelopes, so today Pi neither replays nor relays an rf replay: the statement's trigger has not fired. The census pins that and
 * every surface the obligation already reaches:
 *  A, acceptance (c). A1 every input arm the SERVED native descriptor admits (registerNativeProviders; the rf descriptors selected
 *    by their reactivefiber:render permission, never by an id prefix; inputSchema oneOf {model, task} and {view, taskId}, the view
 *    arm with and without its optional model) spawns exactly one argv against a stand-in rf, each `context render ... --no-commit`
 *    and none naming replay; A2 the rf launch sites of src: every call or construction whose first argument is a literal (or a
 *    module-local const bound to one) naming the rf program, whatever its callee or binding, is exactly the provider's spawn (a src
 *    floor), with controls for bare, aliased, namespace, method, template, path and const launchers; A3 no string or template
 *    literal of any src module spells an rf replay verb, no array literal or argument list has "context" before "replay" (a flag
 *    between them, a module-local const resolved), and no literal of an rf launch module (the modules A2 finds) spells the word
 *    replay at all, so a push, a concat or a const composing the verb from a literal reds too.
 *  B, acceptance (a). B1 the measured refusal: command context.replay, ok false, result null, one error diagnostic
 *    RF_REPLAY_RECONSTRUCTION_UNAVAILABLE whose metadata is exactly {source_id}, and the measured exit 8 riding the roster; B2 the
 *    native typed refusal of a render refusing with it is CapabilityError unavailable "RF render refused: <code>", in one spawn of
 *    the render argv, no reading, the counting fake producer port (a fail-closed globalThis.fetch) at 0 and no metadata value,
 *    message or hint in it; B3 the registered reading (registerReactiveFiberRender, the registry's injected-reader seam) of a deep
 *    copy of the refusal equals a FRESH roster read byte for byte, metadata.source_id verbatim, the injected reader called once,
 *    fetch 0; B4 the reader adapter projects the refusal (its measured workspace kept) as one failure snapshot that carries no value
 *    (no output digest, graph revision or bundle), whose source id is the producer's operation id and whose one evidence reference
 *    is the producer's workspace id, both verbatim, and whose
 *    projection is unchanged when the diagnostic's metadata, message and hint are replaced by sentinels; B5 a stand-in rf that
 *    refuses the first spawn and would answer any later spawn with a full-shape live render still yields the refusal, no reading,
 *    exactly one spawn and fetch 0: neither a fresh render nor an owner fetch stands in for the replay result; B6 the static port
 *    census of the reader closure (the reader modules' transitive src imports): no network global as an identifier (a property name
 *    included) or an exact string literal, no network module as an exact string literal (a static, dynamic or required specifier,
 *    or a concatenation that keeps the module name whole), and child_process launchers, however bound (named, aliased, namespace,
 *    default, required,
 *    dynamically imported or import-equals; a module-local const program resolved), reach only "rf".
 *  C, acceptance (b). C1 the native reader refuses the measured replay output (context.replay, ok true, outcome reproduced) as an
 *    unrecognized envelope in one spawn, no reading, fetch 0; C2 the reader adapter refuses a reading carrying it, so nothing is
 *    projected; C3 the registered reading of a deep copy of it equals a FRESH roster read byte for byte - its render_id, outcome,
 *    replayability, substituted and live_recomputed and its workspace identity verbatim - with no key added beside the reading's own
 *    contract and workspaceRoot; C4 a live render whose one observation row was replayed (freshness reused) projects partial with
 *    tone unknown and a note naming the reused count, never complete or success, while the same render with the row captured at
 *    render projects complete, and no display string of either (titles, status texts, evidence references, notes) carries a
 *    freshness label (FRESH_LABELS); C5 no string or template literal of the reader modules spells a freshness label; C6 the quiet
 *    row of R-NODE-FRESHNESS: Pi's real ObservationProjection applies both C4 snapshots and holds each node at the freshness of the
 *    provider connection (observation.ts:718), the same for both, with the reused render's completeness partial.
 * NOT CLAIMED (the armed half, gated): a replay reader that labels replay output historical, names its federation receipt and
 * echoes source_id on its typed refusal waits for rfc-bak67.12 (FW-CFRR-04c); no reader is added or faked here. Pi reads no
 * federation export, so the exported owner identity it would carry is held to the identities it already reads: the workspace id
 * and root, the operation id and the refusal's source_id (B3, B4, C3).
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the native typed refusal and the adapter's projection carry the code
 * and withhold source_id with the producer's message and hint (quiet rows B2 and B4: no value named, sentinel invariance), so the
 * source_id rides only the registered reading (B3); R-COMPOSED a program name, verb, port name or label assembled at runtime from
 * parts - a call, a concatenation or a template that splits the word across literals, a property read, an import, a re-export or a
 * wrapper - is invisible to A2, A3, B6 and C5 (each one's `composed` control stays 0); R-UNLISTED a port outside the listed network globals, network modules and
 * child_process launchers (a worker, a native addon, process.binding) is not read by B6 (its `unlisted` control stays quiet);
 * R-NODE-FRESHNESS the workbench projection gives every refreshed node its freshness from the provider connection state, never
 * from rf's row freshness, and the inspector displays it (src/ui/workflow-inspector.ts), so a live render holding a reused row
 * reaches the projection at the same freshness as a clean one, its reuse carried by completeness partial and the adapter's note
 * (quiet row C6; no replay output reaches the projection at all: C1, C2).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the code, metadata keys, exit and gating artifact, and every registered test title - is held to
 * the out-of-file roster, whose measured envelopes anchor the code and the field set outside this file. The last case walks the
 * vitest task tree: every judged pin registers once, runs in run mode, is not inverted and reaches its witness.
 * SCOPE: the code, the shapes and the exit are producer facts at the installed rf; Pi vendors no rf schema, so a producer-side
 * change is seen only when a fixture re-measure re-reads them. Related and landed: wb-a9l2.4 (the RF_REPLAY_SOURCE_SNAPSHOT_MISSING
 * echo census) and wb-973.9 (the replayed-row demotion); the surfaces they share with this bead are re-measured here against this
 * bead's own fixture, never imported.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-replay-history-roster.json");
const ROOT = process.cwd();
/** The root the roster's measured envelopes name: the measuring seat's scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
/** The permission every rf render descriptor declares; A1 selects the served rf roster by it, never by an id prefix. */
const RENDER_PERMISSION = "reactivefiber:render";
const GRANTS = [RENDER_PERMISSION];

/** The refusal the statement names, the registry row's metadata_keys and its exit (_EXIT_NOT_REPLAYABLE). */
const RECONSTRUCTION_UNAVAILABLE = "RF_REPLAY_RECONSTRUCTION_UNAVAILABLE";
const METADATA_KEYS = ["source_id"];
const REPLAY_EXIT = 8;
/** The gating artifact of the federation-receipt replay arm (the statement's FW-CFRR-04c). */
const GATING_ARTIFACTS = ["rfc-bak67.12"];
const REPLAY_COMMAND = "context.replay";
/** An rf replay verb in one string: "context replay", "context.replay", "context-replay" or "context_replay". */
const REPLAY_VERB = /\bcontext[\s._-]+replay\b/i;
/** The replay word itself: an argv word, or a literal anywhere in an rf launch module (A3). */
const REPLAY_WORD = /\breplay\b/i;
/** The freshness labels no Pi surface may give rf output (acceptance (b): "no fresh/current label"). */
const FRESH_LABELS = /\b(?:fresh|current|currently|latest|live|up[\s_-]?to[\s_-]?date|real[\s_-]?time)\b/i;
/** The program an rf launch names: "rf" itself, or a path ending in it. */
const RF_PROGRAM = /(?:^|[\\/])rf(?:\.exe|\.cmd)?$/;
/** The ports a network contact would need; none may appear in the reader closure (B6). */
const NETWORK_GLOBALS = ["fetch", "WebSocket", "EventSource", "XMLHttpRequest"];
const NETWORK_MODULE = /^(?:node:)?(?:net|http|https|http2|dns|tls|dgram)$|^(?:undici|ws)$/;
const CHILD_PROCESS = /^(?:node:)?child_process$/;
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The reader modules: the provider and its adapter. B6 walks their src import closure; C5 reads their literals. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
/** Each floor sits below the count measured at base e8850da (src 115 .ts modules, reader closure 7), so an emptied or misdirected
 * walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const CLOSURE_FLOOR = 6;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(c) a hermetic guard pins that no Pi argv names rf context replay today: every served input arm spawns one context render argv, src holds one rf launch site, and no src literal spells an rf replay verb",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(a) on RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8) Pi reports replay unavailable, the producer's metadata.source_id rides the registered reading verbatim (withheld from the typed refusal and the projection: R-WITHHELD), and no fallback owner read is presented as the replay output",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(b) Pi presents no rf replay output as a fresh owner read: both readers refuse it, the registered reading carries it and its identities byte for byte, and the rf reader adapter mints no fresh/current label (the projection's connection-derived node freshness is R-NODE-FRESHNESS; labelling replay output historical and naming its receipt wait for rfc-bak67.12)",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6"],
  },
];

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
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
  readonly rfVersion: string;
  readonly replayExit: number;
  readonly code: string;
  readonly metadataKeys: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly envelopes: { readonly refusal: Envelope; readonly replay: Envelope };
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
/** A deep copy through JSON: nothing in it is shared with the value it was made from. */
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value)) throw new Error(`roster envelope ${name} must be an object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster envelope ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`roster envelope ${name} needs a null transaction, a result and diagnostics`);
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null,
    result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster from disk, refusing any field of the wrong shape by name; each call is a fresh read. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes)) throw new Error("roster must be an object with rows and envelopes");
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
  if (typeof raw.rfVersion !== "string" || typeof raw.replayExit !== "number" || typeof raw.code !== "string") throw new Error("roster needs rfVersion, replayExit and code");
  return {
    rfVersion: raw.rfVersion,
    replayExit: raw.replayExit,
    code: raw.code,
    metadataKeys: strings(raw.metadataKeys, "metadataKeys"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    envelopes: { refusal: envelopeOf(raw.envelopes.refusal, "refusal"), replay: envelopeOf(raw.envelopes.replay, "replay") },
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const { refusal: REFUSAL, replay: REPLAY } = ROSTER.envelopes;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The primary diagnostic of an envelope, its metadata and its code. */
function primaryOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.diagnostics[0], `${envelope.operation_id} diagnostics[0]`);
}
function metadataOf(envelope: Envelope): JsonObject {
  return objectOf(primaryOf(envelope).metadata, `${envelope.operation_id} metadata`);
}
function codeOf(envelope: Envelope): string {
  return String(primaryOf(envelope).code);
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** What R-WITHHELD keeps off the typed refusal and the projection: every metadata value, the message and the hint. */
function withheldTexts(envelope: Envelope): string[] {
  const primary = primaryOf(envelope);
  return [...stringLeaves(metadataOf(envelope)), String(primary.message), String(primary.hint)];
}
/** The constructed render-command refusal: the measured diagnostics and the measured workspace on a context.render failure
 * envelope (the render plane never emits a replay code, so no measured render refusal carries it). */
function renderRefusal(envelope: Envelope): JsonObject {
  return {
    schema: envelope.schema, ok: false, command: "context.render", operation_id: envelope.operation_id,
    workspace: { id: envelope.workspace.id, root: envelope.workspace.root }, transaction_id: null, result: null,
    diagnostics: envelope.diagnostics.map(json),
  };
}
/** The same refusal with every diagnostic's metadata values, message and hint replaced by sentinels (B4's invariance pair). */
function sentinelRefusal(envelope: Envelope): JsonObject {
  const diagnostics = envelope.diagnostics.map((item, index): JsonValue => {
    const entry = objectOf(item, `diagnostics[${index}]`);
    const metadata = objectOf(entry.metadata, `diagnostics[${index}].metadata`);
    const replaced: JsonObject = {};
    for (const key of Object.keys(metadata)) replaced[key] = `sentinel ${key}`;
    return { ...entry, message: "sentinel message", hint: "sentinel hint", metadata: replaced };
  });
  return { ...renderRefusal(envelope), diagnostics };
}
/** A live full-shape render (fullShapeRf) whose result.observations holds the given rows. */
function renderWithObservations(rows: JsonValue[]): JsonObject {
  const envelope = json(fullShapeRf(ROOT));
  const object = objectOf(envelope, "the full-shape render");
  return { ...object, result: { ...objectOf(object.result, "the full-shape result"), observations: rows } };
}

/** Every regular .ts file below src (symlinks are not followed). */
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
function srcModules(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).sort();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function sourceOf(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
/** A module's const string bindings: every `const NAME = "literal"` declaration, at any depth. */
function constStrings(source: ts.SourceFile): Map<string, string> {
  const bindings = new Map<string, string>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isStringLiteralLike(node.initializer) &&
      ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0) bindings.set(node.name.text, node.initializer.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return bindings;
}
/** The literal an expression spells: a string or no-substitution template literal, or an identifier a const binds to one. */
function literalOf(node: ts.Node | undefined, bindings: ReadonlyMap<string, string>): string | null {
  if (node === undefined) return null;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isIdentifier(node)) return bindings.get(node.text) ?? null;
  return null;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
let fetches = 0;
afterEach(() => {
  process.env.PATH = oldPath;
  vi.unstubAllGlobals();
  removeScratch(...scratches.splice(0));
});

/** The counting fake producer port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake producer port answers no call"));
  });
}

/**
 * A stand-in `rf` first on PATH. It appends one JSON argv line per spawn to the returned log; its first spawn prints `first` and
 * exits `exit`, and any later spawn prints `later` (when given, else `first`) and exits 0.
 */
function standInRf(first: JsonValue, exit: number, later?: JsonValue): string {
  const folder = makeScratch("rf-replay-history-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  const answers = JSON.stringify({ first, exit, later: later ?? first });
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      'const seen = fs.existsSync(log) ? fs.readFileSync(log, "utf8").split("\\n").filter(Boolean).length : 0;',
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${answers};`,
      "process.stdout.write(JSON.stringify(seen === 0 ? answers.first : answers.later));",
      "process.exit(seen === 0 ? answers.exit : 0);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
/** The verb a spawn ran: the two argv words after `--workspace <root>`. */
function verbOf(spawns: readonly string[][]): string[] {
  return (spawns[0] ?? []).slice(2, 4);
}

function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

/** A registry composed the way production composes it: every native provider, the rf preview among them. */
async function servedRegistry(): Promise<CapabilityRegistry> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, ROOT);
  return registry;
}

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One served invocation of the preview's legacy arm against the stand-in rf. */
async function nativeOutcome(first: JsonValue, exit: number, later?: JsonValue): Promise<NativeOutcome> {
  countFetches();
  const log = standInRf(first, exit, later);
  const registry = await servedRegistry();
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`. */
async function injectedReading(envelope: JsonValue): Promise<{ reading: JsonValue; calls: number }> {
  countFetches();
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope as unknown as Envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

/** A registered reading of a deep copy of a roster envelope, held to a FRESH roster read: byte for byte, key order included, the
 * reading adding only its own contract and workspaceRoot; the injected reader called once and fetch 0. */
async function verbatimReading(name: "refusal" | "replay"): Promise<{ source: JsonObject; readingKeys: string[]; calls: number }> {
  const { reading, calls } = await injectedReading(json(ROSTER.envelopes[name]));
  const fresh = readRoster().envelopes[name];
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: json(fresh) });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  expect(JSON.stringify(source)).toBe(JSON.stringify(fresh));
  expect(calls).toBe(1);
  expect(fetches).toBe(0);
  return { source, readingKeys: Object.keys(objectOf(reading, "reading")).sort(), calls };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
const LIVE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function readingAt(workspaceRoot: string, source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot, source };
}
/** The strings a projection displays: every snapshot's title, status text and evidence references, and the notes. */
function displayStrings(topology: ReactiveFiberProjectionTopology): string[] {
  return [
    ...topology.snapshots.flatMap(snapshot => [snapshot.node.title, snapshot.node.statusText, ...(snapshot.evidenceRefs ?? [])]),
    ...topology.diagnostics,
  ];
}
/** The served preview's reading of a live render holding `rows`, projected by the reader adapter at the rf-cli seam. */
async function liveProjection(rows: JsonValue[]): Promise<ReactiveFiberProjectionTopology> {
  const outcome = await nativeOutcome(renderWithObservations(rows), 0);
  expect(outcome.refusal).toBeNull();
  expect(outcome.spawns).toHaveLength(1);
  return reactivefiberTopology(outcome.reading, LIVE_CONTEXT);
}

/** The required keys of each oneOf arm of an input schema, in order. */
function armsOf(schema: unknown): string[][] {
  if (!isObject(schema) || !Array.isArray(schema.oneOf)) return [];
  return schema.oneOf.map((arm: unknown) => (isObject(arm) && Array.isArray(arm.required) ? arm.required.map(String) : []));
}

/** One module's rf launch sites: every call or construction whose first argument is a literal, or a const bound to one, naming the
 * rf program. */
function rfLaunchSites(fileName: string, text: string): string[] {
  const source = sourceOf(fileName, text);
  const bindings = constStrings(source);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const program = literalOf(node.arguments?.[0], bindings);
      if (program !== null && RF_PROGRAM.test(program)) sites.push(`${fileName}: ${node.expression.getText(source)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}

interface ReplayScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly words: string[];
  readonly renderArgv: number;
}
/** One module's rf replay spellings: an array literal or argument list with "context" before "replay" (any words between, a const
 * resolved), a string or template literal spelling an rf replay verb, and - in an rf launch module - any literal spelling the word
 * replay. */
function scanReplay(fileName: string, text: string, launchModule: boolean): ReplayScan {
  const source = sourceOf(fileName, text);
  const bindings = constStrings(source);
  const argv: string[] = [];
  const literals: string[] = [];
  const words: string[] = [];
  let renderArgv = 0;
  const sequence = (items: readonly ts.Expression[]): void => {
    const texts = items.map(item => literalOf(item, bindings));
    const context = texts.indexOf("context");
    if (context < 0) return;
    const later = texts.slice(context + 1);
    if (later.some(word => word !== null && word.toLowerCase() === "replay")) argv.push(`${fileName}: [${texts.filter(item => item !== null).join(", ")}]`);
    else if (later[0] === "render") renderArgv += 1;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) sequence(node.elements);
    if (ts.isCallExpression(node)) sequence(node.arguments);
    if (ts.isStringLiteralLike(node)) {
      if (REPLAY_VERB.test(node.text)) literals.push(`${fileName}: ${node.text}`);
      if (launchModule && REPLAY_WORD.test(node.text)) words.push(`${fileName}: ${node.text}`);
    }
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (REPLAY_VERB.test(parts.join(" "))) literals.push(`${fileName}: ${parts.join("<expr>")}`);
      if (launchModule && parts.some(part => REPLAY_WORD.test(part))) words.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, words, renderArgv };
}

interface PortScan {
  readonly names: string[];
  readonly modules: string[];
  readonly launches: string[];
  readonly local: string[];
}
/** True for `require("node:child_process")` and `[await] import("node:child_process")`. */
function loadsChildProcess(node: ts.Expression): boolean {
  const call = ts.isAwaitExpression(node) ? node.expression : node;
  if (!ts.isCallExpression(call)) return false;
  const first = call.arguments[0];
  const loader = call.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(call.expression) && call.expression.text === "require");
  return loader && first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS.test(first.text);
}
/** One module's ports: every identifier (a property name included) or exact string literal naming a network global, every exact
 * string literal naming a network module, the program of every child_process launcher call however the launcher is bound (named,
 * aliased, namespace, default or required; "<composed>" when the program is not a literal), and its relative import specifiers. */
function scanPorts(fileName: string, text: string): PortScan {
  const source = sourceOf(fileName, text);
  const names: string[] = [];
  const modules: string[] = [];
  const launches: string[] = [];
  const local: string[] = [];
  const bound = new Map<string, string>();
  const spaces = new Set<string>();
  const bindings = constStrings(source);
  const bind = (node: ts.Node): void => {
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression) &&
      CHILD_PROCESS.test(node.moduleReference.expression.text)) spaces.add(node.name.text);
    if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier) && CHILD_PROCESS.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      if (clause?.name !== undefined) spaces.add(clause.name.text);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) spaces.add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) for (const element of named.elements) bound.set(element.name.text, (element.propertyName ?? element.name).text);
    }
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined && loadsChildProcess(node.initializer)) {
      if (ts.isIdentifier(node.name)) spaces.add(node.name.text);
      if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          if (!ts.isIdentifier(element.name)) continue;
          const property = element.propertyName !== undefined && ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.name.text;
          bound.set(element.name.text, property);
        }
      }
    }
    ts.forEachChild(node, bind);
  };
  bind(source);
  const launcherOf = (callee: ts.Expression): string | undefined => {
    if (ts.isIdentifier(callee)) {
      const name = bound.get(callee.text) ?? callee.text;
      return LAUNCHERS.includes(name) ? name : undefined;
    }
    if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && spaces.has(callee.expression.text)) {
      return LAUNCHERS.includes(callee.name.text) ? callee.name.text : undefined;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && NETWORK_GLOBALS.includes(node.text)) names.push(`${fileName}: ${node.text}`);
    if (ts.isStringLiteralLike(node)) {
      if (NETWORK_GLOBALS.includes(node.text)) names.push(`${fileName}: "${node.text}"`);
      if (NETWORK_MODULE.test(node.text)) modules.push(`${fileName}: ${node.text}`);
      if (node.text.startsWith(".") && (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent))) local.push(node.text);
    }
    if (ts.isCallExpression(node) && launcherOf(node.expression) !== undefined) launches.push(literalOf(node.arguments[0], bindings) ?? "<composed>");
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { names, modules, launches, local };
}

/** The reader modules' transitive src import closure, each module's ports merged. */
function readerClosure(): { modules: string[]; unresolved: string[]; ports: PortScan } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const merged: PortScan = { names: [], modules: [], launches: [], local: [] };
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || seen.has(file)) continue;
    seen.add(file);
    const scan = scanPorts(relative(REPO, file), textOf(file));
    merged.names.push(...scan.names);
    merged.modules.push(...scan.modules);
    merged.launches.push(...scan.launches);
    for (const specifier of scan.local) {
      const target = join(dirname(file), specifier.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${relative(REPO, file)}: ${specifier}`);
    }
  }
  return { modules: [...seen].map(file => relative(REPO, file)).sort(), unresolved, ports: merged };
}

/** One module's freshness labels: a string or template literal spelling one. */
function scanLabels(fileName: string, text: string): string[] {
  const source = sourceOf(fileName, text);
  const hits: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && FRESH_LABELS.test(node.text)) hits.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (parts.some(part => FRESH_LABELS.test(part))) hits.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return hits;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const registry = await servedRegistry();
    const served = registry.catalogSnapshot().map(entry => entry.descriptor).filter(descriptor => descriptor.permissions.includes(RENDER_PERMISSION));
    const arms = armsOf(served[0]?.inputSchema);
    expect(served.map(descriptor => descriptor.id)).toStrictEqual([PREVIEW_ID]);
    expect(arms).toStrictEqual([["model", "task"], ["view", "taskId"]]);
    const inputs: readonly JsonObject[] = [{ model: "m", task: "t" }, { view: "v", taskId: "t" }, { view: "v", taskId: "t", model: "m" }];
    const runs: JsonValue[] = [];
    countFetches();
    for (const input of inputs) {
      const log = standInRf(json(fullShapeRf(ROOT)), 0);
      const reading = await registry.invoke(PREVIEW_ID, input, invocationContext());
      const spawns = spawnsOf(log);
      const replayWords = spawns.flat().filter(word => REPLAY_WORD.test(word)).length;
      expect(objectOf(reading, "reading").contract).toBe(REACTIVEFIBER_RENDER_PREVIEW_CONTRACT);
      expect(spawns).toHaveLength(1);
      expect(verbOf(spawns)).toStrictEqual(["context", "render"]);
      expect(spawns[0]).toContain("--no-commit");
      expect(replayWords).toBe(0);
      expect(spawns.filter(spawned => REPLAY_VERB.test(spawned.join(" ")))).toEqual([]);
      runs.push({ input: Object.keys(input), spawns: spawns.length, verb: verbOf(spawns), noCommit: spawns[0]?.includes("--no-commit") ?? false, replayWords });
    }
    expect(fetches).toBe(0);
    return { served: served.map(descriptor => descriptor.id), arms, runs, fetches };
  },
  A2: async () => {
    const files = srcModules();
    const sites = files.flatMap(file => rfLaunchSites(relative(REPO, file), textOf(file)));
    const srcFloorMet = files.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(sites, "an rf launch beyond the preview's waits for rfc-bak67.12").toStrictEqual(["src/workbench/providers/reactivefiber.ts: spawn"]);
    const control = (text: string): number => rfLaunchSites("control.ts", text).length;
    const controls = {
      bare: control('spawn("rf", ["context", "replay"]);'),
      aliased: control('import { spawn as run } from "node:child_process"; run("rf", []);'),
      namespace: control('import * as cp from "node:child_process"; cp.execFile("rf", []);'),
      method: control('await pi.exec("rf", ["context", "replay"]);'),
      template: control("spawn(`rf`, []);"),
      path: control('execFileSync("/usr/local/bin/rf", []);'),
      constProgram: control('const program = "rf"; spawn(program, []);'),
      composed: control('const program = ["r", "f"].join(""); spawn(program, []);'),
    };
    return { srcFloorMet, sites, controls };
  },
  A3: async () => {
    const files = srcModules();
    const launchModules = [...new Set(files.flatMap(file => rfLaunchSites(relative(REPO, file), textOf(file))).map(site => site.split(": ")[0] ?? ""))].sort();
    const scans = files.map(file => scanReplay(relative(REPO, file), textOf(file), launchModules.includes(relative(REPO, file))));
    const argv = scans.flatMap(scan => scan.argv);
    const literals = scans.flatMap(scan => scan.literals);
    const words = scans.flatMap(scan => scan.words);
    const srcFloorMet = files.length >= SRC_FLOOR;
    const renderArgvSeen = scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(launchModules).toStrictEqual(["src/workbench/providers/reactivefiber.ts"]);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, words }, "an rf replay verb waits for rfc-bak67.12").toStrictEqual({ argv: [], literals: [], words: [] });
    const control = (text: string, launchModule: boolean): number => {
      const scan = scanReplay("control.ts", text, launchModule);
      return scan.argv.length + scan.literals.length + scan.words.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "context", "replay", render]);', false),
      pushed: control('argv.push("context", "replay");', false),
      spaced: control('const cmd = "rf context replay rfr_x --json";', false),
      dotted: control(`const id = "${REPLAY_COMMAND}";`, false),
      template: control(["const cmd = `rf context replay $", "{render}`;"].join(""), false),
      constVerb: control('const verb = "replay"; spawn("rf", ["context", verb]);', true),
      concat: control('const argv = ["context"].concat(["replay"]);', true),
      constArgv: control('const VERB = "replay"; export const ARGV = ["context", VERB];', false),
      flagBetween: control('spawn("rf", ["context", "--no-input", "replay", id]);', false),
      composed: control('const verb = ["re", "play"].join(""); spawn("rf", ["context", verb]);', true),
    };
    return { srcFloorMet, launchModules, renderArgvSeen, argv, literals, words, controls };
  },
  B1: async () => {
    const primary = primaryOf(REFUSAL);
    const metadataKeys = Object.keys(metadataOf(REFUSAL));
    expect(REFUSAL.command).toBe(REPLAY_COMMAND);
    expect(REFUSAL.ok).toBe(false);
    expect(REFUSAL.result).toBeNull();
    expect(REFUSAL.diagnostics).toHaveLength(1);
    expect({ code: primary.code, severity: primary.severity }).toStrictEqual({ code: RECONSTRUCTION_UNAVAILABLE, severity: "error" });
    expect(metadataKeys).toStrictEqual(METADATA_KEYS);
    expect(ROSTER.replayExit).toBe(REPLAY_EXIT);
    return {
      command: REFUSAL.command, ok: REFUSAL.ok, result: REFUSAL.result, diagnostics: REFUSAL.diagnostics.length, code: codeOf(REFUSAL),
      severity: String(primary.severity), metadataKeys, sourceId: metadataOf(REFUSAL).source_id ?? null, exit: ROSTER.replayExit,
    };
  },
  B2: async () => {
    const outcome = await nativeOutcome(renderRefusal(REFUSAL), REPLAY_EXIT);
    const message = outcome.refusal?.message ?? "";
    const named = withheldTexts(REFUSAL).filter(value => message.includes(value));
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${RECONSTRUCTION_UNAVAILABLE}` });
    expect(named).toEqual([]);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(verbOf(outcome.spawns)).toStrictEqual(["context", "render"]);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, named, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  B3: async () => {
    const { source, readingKeys, calls } = await verbatimReading("refusal");
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    const metadata = objectOf(primary.metadata, "reading metadata");
    expect(metadata).toStrictEqual(json(metadataOf(readRoster().envelopes.refusal)));
    return { code: String(primary.code), metadata, readingKeys, calls, fetches };
  },
  B4: async () => {
    const topology = reactivefiberTopology(readingAt(FIXTURE_ROOT, renderRefusal(REFUSAL)), FIXTURE_CONTEXT);
    const sentinel = reactivefiberTopology(readingAt(FIXTURE_ROOT, sentinelRefusal(REFUSAL)), FIXTURE_CONTEXT);
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined || snapshot.sourceVersion !== undefined;
    const surfaced = displayStrings(topology).filter(text => withheldTexts(REFUSAL).some(value => text.includes(value)));
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(snapshot?.node.statusText).toBe(`refused · ${RECONSTRUCTION_UNAVAILABLE}`);
    expect(carriesValue).toBe(false);
    expect(snapshot?.source.id).toBe(REFUSAL.operation_id);
    expect([...(snapshot?.evidenceRefs ?? [])]).toStrictEqual([`rf-workspace:${REFUSAL.workspace.id}`]);
    expect(sentinel).toStrictEqual(topology);
    expect(surfaced).toEqual([]);
    return {
      snapshots: topology.snapshots.length, statusText: snapshot?.node.statusText ?? null, statusTone: snapshot?.node.statusTone ?? null,
      coverage: snapshot?.coverage ?? null, operationId: snapshot?.source.id ?? null, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], carriesValue,
      sentinelInvariant: true, surfaced,
    };
  },
  B5: async () => {
    // The stand-in would answer any second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeOutcome(renderRefusal(REFUSAL), REPLAY_EXIT, json(fullShapeRf(ROOT)));
    expect(outcome.refusal?.category).toBe("unavailable");
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    expect(fetches).toBe(0);
    return { category: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length, fetches };
  },
  B6: async () => {
    const { modules, unresolved, ports } = readerClosure();
    const closureFloorMet = modules.length >= CLOSURE_FLOOR;
    const anchorsRead = READER_MODULES.every(module => modules.includes(module)) && modules.includes("src/workbench/capability-registry.ts");
    const launches = [...new Set(ports.launches)].sort();
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead).toBe(true);
    expect(unresolved).toEqual([]);
    expect({ names: ports.names, modules: ports.modules, launches }).toStrictEqual({ names: [], modules: [], launches: ["rf"] });
    const control = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { names: scan.names.length, modules: scan.modules.length, launches: scan.launches };
    };
    const controls = {
      httpImport: control('import { request } from "node:http";'),
      dynamicImport: control('const port = await import("node:" + "https");'),
      fetchCall: control("await fetch(producer);"),
      fetchAlias: control("const get = globalThis.fetch;"),
      fetchElement: control('await globalThis["fetch"](producer);'),
      socket: control("const socket = new WebSocket(producer);"),
      aliasedLauncher: control('import { execFile as run } from "node:child_process"; run("curl", [producer]);'),
      namespaceLauncher: control('import * as cp from "node:child_process"; cp.spawn("curl", []);'),
      requiredLauncher: control('const { spawn: go } = require("node:child_process"); go("curl", []);'),
      composedLauncher: control('import { spawn } from "node:child_process"; spawn(command, []);'),
      constLauncher: control('import { spawn } from "node:child_process"; const tool = "curl"; spawn(tool, []);'),
      importEquals: control('import cp = require("node:child_process"); cp.spawn("curl", []);'),
      dynamicLauncher: control('const cp = await import("node:child_process"); cp.execFile("curl", []);'),
      composed: control('await globalThis["fe" + "tch"](producer);'),
      unlisted: control('process.binding("tcp_wrap");'),
    };
    return { closureFloorMet, anchorsRead, unresolved, names: ports.names, modules: ports.modules, launches, controls };
  },
  C1: async () => {
    const outcome = await nativeOutcome(json(REPLAY), 0);
    expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  C2: async () => {
    let caught: unknown;
    try {
      reactivefiberTopology(readingAt(FIXTURE_ROOT, json(REPLAY)), FIXTURE_CONTEXT);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CapabilityError);
    return refusalOf(caught);
  },
  C3: async () => {
    const { source, readingKeys, calls } = await verbatimReading("replay");
    const result = objectOf(source.result, "reading result");
    const replayability = objectOf(result.replayability, "reading replayability");
    expect(source.command).toBe(REPLAY_COMMAND);
    expect(source.workspace).toStrictEqual(json(readRoster().envelopes.replay.workspace));
    expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
    return {
      command: String(source.command), renderId: result.render_id ?? null, outcome: result.outcome ?? null,
      classification: replayability.classification ?? null, substituted: result.substituted ?? null, liveRecomputed: result.live_recomputed ?? null,
      workspace: source.workspace ?? null, readingKeys, calls, fetches,
    };
  },
  C4: async () => {
    const replayed = await liveProjection([{ status: "observed", freshness: "reused", replayed: true }]);
    const clean = await liveProjection([{ status: "observed", freshness: "captured_at_render", replayed: false }]);
    const shown = [...displayStrings(replayed), ...displayStrings(clean)];
    const labelled = shown.filter(text => FRESH_LABELS.test(text));
    const reusedNotes = replayed.diagnostics.filter(note => /\b1 reused\b/.test(note));
    const replayedSnapshot = replayed.snapshots[0];
    const cleanSnapshot = clean.snapshots[0];
    expect(replayedSnapshot?.coverage).toBe("partial");
    expect(replayedSnapshot?.node.statusTone).toBe("unknown");
    expect(reusedNotes).toHaveLength(1);
    expect(cleanSnapshot?.coverage).toBe("complete");
    expect(cleanSnapshot?.node.statusTone).toBe("success");
    expect(shown.length).toBeGreaterThan(0);
    expect(labelled).toEqual([]);
    return {
      replayed: { coverage: replayedSnapshot?.coverage ?? null, statusTone: replayedSnapshot?.node.statusTone ?? null, reusedNotes },
      clean: { coverage: cleanSnapshot?.coverage ?? null, statusTone: cleanSnapshot?.node.statusTone ?? null }, labelled,
    };
  },
  C5: async () => {
    const hits = READER_MODULES.flatMap(module => scanLabels(module, textOf(join(REPO, module))));
    const anchorsRead = READER_MODULES.every(module => textOf(join(REPO, module)).length > 0);
    expect(anchorsRead).toBe(true);
    expect(hits).toEqual([]);
    const control = (text: string): number => scanLabels("control.ts", text).length;
    const controls = {
      literal: control('const label = "fresh owner read";'),
      template: control(["const label = `current at $", "{when}`;"].join("")),
      hyphenated: control('const label = "up-to-date";'),
      cased: control('const label = "Latest";'),
      composed: control('const label = "fre" + "sh";'),
    };
    return { anchorsRead, hits, controls };
  },
  C6: async () => {
    const read = (topology: ReactiveFiberProjectionTopology): JsonObject => {
      const projection = new ObservationProjection();
      const outcomes = topology.snapshots.map(snapshot => projection.refresh(snapshot));
      const nodes = projection.query({ scope: LIVE_CONTEXT.scope, limit: 10, kind: "reactivefiber.render.preview.snapshot" }).nodes;
      expect(outcomes).toStrictEqual(["applied"]);
      expect(nodes).toHaveLength(1);
      const node = nodes[0];
      return { freshness: node?.freshness ?? null, completeness: node?.completeness ?? null, connection: node?.sourceConnectionState ?? null };
    };
    const replayed = read(await liveProjection([{ status: "observed", freshness: "reused", replayed: true }]));
    const clean = read(await liveProjection([{ status: "observed", freshness: "captured_at_render", replayed: false }]));
    // R-NODE-FRESHNESS: the node's freshness follows the provider connection, the same for both renders; the reuse rides completeness.
    expect(replayed.freshness).toBe(clean.freshness);
    expect({ replayed: replayed.completeness, clean: clean.completeness }).toStrictEqual({ replayed: "partial", clean: "complete" });
    return { replayed, clean };
  },
};

/** The judged pins whose case reached its witness assertion; the last case reads it. */
const REACHED = new Set<string>();

describe("wb-tnz5.4 rf replay history census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R5, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:6", "C:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ code: RECONSTRUCTION_UNAVAILABLE, metadataKeys: METADATA_KEYS, replayExit: REPLAY_EXIT, gatingArtifacts: GATING_ARTIFACTS }).toStrictEqual({
      code: ROSTER.code, metadataKeys: [...ROSTER.metadataKeys], replayExit: ROSTER.replayExit, gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
    // The measured refusal anchors the code and its metadata keys outside this file's literals.
    expect({ code: codeOf(REFUSAL), metadataKeys: Object.keys(metadataOf(REFUSAL)) }).toStrictEqual({ code: ROSTER.code, metadataKeys: [...ROSTER.metadataKeys] });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("registration: every judged pin registered once, ran in run mode, was not inverted and reached its witness", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test ran in run mode, not inverted").toEqual([]);
    expect([...REACHED].sort(), "every judged pin reached its witness assertion").toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
