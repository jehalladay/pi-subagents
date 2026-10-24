/**
 * wb-a9l2.4 (RF-HARNESS2-FEDERATED-PEER-R4), the absent-today leg. Statement (bead notes, full form): "If Pi ever drives or reads
 * an rf replay over a federation receipt and rf refuses with exit 8 RF_REPLAY_SOURCE_SNAPSHOT_MISSING (fields source_id,
 * snapshot_id, render_id, reason, segments), Pi shall echo the refusal code and fields verbatim and never contact the producer or
 * substitute a live value to complete the replay; the federation-receipt replay arm is gated on fw-b FW-11 rfc-0txnl.25 / cfrr
 * FW-CFRR-04c rfc-bak67.12 (unshipped; the code itself ships at diagnostics.py:1021)."
 * (harness2-federated-peer-2026-10-20/BEADS-2026-10-21.md:35@6a251bf73af5). Acceptance: "(a) a fixture exit-8
 * RF_REPLAY_SOURCE_SNAPSHOT_MISSING envelope surfaces the code and its five fields verbatim while a counting fake producer/network
 * port stays at 0 calls; (b) Pi never rewrites one code into the other; (c) the missing-blob replay yields the refusal, never a
 * fresh live value."
 * wb-1s7l (the R694 follow-up of landing 257, gate cmd_9623f3438e45) hardens the instruments below against the gate's survivors:
 * F1 B6's port scan, F2 the verbatim readings, F3 A1's call-composed argv, F4 A2's roster selector, F5 the registration and reached
 * records, F6 the nulled workspace (D3, D4), and the F7 seam disclosure (B7).
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-22; producer rows read from its installed
 * package, read-only): domain/diagnostics.py spells RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (:1023) and
 * RF_REPLAY_SOURCE_SNAPSHOT_MISSING (:1031). The REGISTRY row of RF_REPLAY_SOURCE_SNAPSHOT_MISSING (:3360) is exit 8
 * (_EXIT_NOT_REPLAYABLE, :1797) with metadata_keys (source_id, snapshot_id, render_id, reason, segments), the UNION of two producer
 * shapes: the blob-deletion shape {source_id, snapshot_id} (application/replay.py missing_source_snapshot) and the
 * retention-overlay shape {render_id, reason, segments} (retention_removed). RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (:3316) is exit 8
 * with metadata_keys (source_id). rf's replay is its own command, context.replay (application/replay_service.py REPLAY_COMMAND),
 * whose result is null on every failure.
 * THE FIXTURE (the roster's envelopes, test/fixtures/rf-replay-refusal-echo-roster.json): `blob` and `reconstruction` are
 * MEASURED, each the stdout of `rf context replay RENDER --json` (exit 8) in a scratch workspace after a committed render lost its
 * evidence (a literal source's capture blob deleted; a git source's recorded commit gone from the repository), with only the
 * scratch root rewritten to /fixture/rf-workspace. `retention` is CONSTRUCTED from the producer's retention_removed builder
 * (message, hint and metadata as it writes them, segment names as that workspace's journal names its files) because
 * `rf storage compact --apply`, the one retention deletion, removes nothing in that build.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). It spawns only `rf ... context
 * render --no-commit` and admits only context.render envelopes, so today Pi drives and reads no rf replay: the statement's trigger
 * has not fired. The census pins that absence and every surface the obligation already reaches:
 *  A, the trigger, absent today. A1 an AST scan of every src module and every native descriptor for an rf replay verb: a list with
 *    "context" before "replay" (any words between) - an array literal (an array-literal spread read in place), an argument list (a
 *    push or any call) or a concat chain of literal lists - or a string or template literal spelling one, with a floor, a
 *    non-vacuity reading of the real render argv and controls for argv, spaced, dotted, template, concat, pushed, flag-between and
 *    spread spellings; A2 the rf roster stays the preview alone: every native and injected descriptor carrying an rf marker - the
 *    reactivefiber. id prefix, a reactivefiber: grant or a contract carrier of the rf@ family REACTIVE_FIBER_CONTRACT_SOURCE belongs
 *    to - is the preview, the preview carries all three, RECONCILE_EVIDENCE_READS.reactivefiber (src/workflow/reconcile.ts:67) names
 *    only it, and a control per marker selects a planted descriptor; A3 the native reader refuses the measured replay envelope as an
 *    unrecognized envelope in one spawn of the render argv; A4 the reader adapter refuses a reading carrying it.
 *  B, acceptance (a). B1 the fixture itself: both envelopes carry the code, the measured exit 8 rides the roster, and their two
 *    metadata shapes together are exactly the five fields, each field in one shape; B2 and B3 the registered reading
 *    (registerReactiveFiberRender, the registry's injected-reader seam) of a FRESH copy of each envelope equals a fresh roster read
 *    and the bytes taken before the invocation - the code and every field verbatim, nothing added inside it, nothing edited in place
 *    - while the counting fake producer port (a fail-closed globalThis.fetch) stays at 0, the injected reader is called once and the
 *    module's roster copy is untouched; B4 the native typed refusal names the code verbatim and no field value, in one spawn, fetch
 *    0; B5 the reader adapter's projection names the code and no field value; B6 the static port census of the reader modules'
 *    transitive src import closure: no network global as an identifier (a property name included) or an exact string literal, no
 *    network module as an exact string literal (a static, dynamic or required specifier, or a part of a concatenation that keeps
 *    the module name whole), no import() or require() of a non-literal specifier, and child_process launchers, however bound (named,
 *    aliased, namespace, default, required, import-equals or dynamically imported; a module-local const program resolved), launch
 *    only "rf"; B7 the seam B2 and B3 read is test-reachable only: no src module but the provider spells registerReactiveFiberRender
 *    (as an identifier, a property name included, or a string literal), while the served registration
 *    registerNativeReactiveFiberRender is spelled outside it (native-modules.ts).
 *  C, acceptance (b). C1 the native typed refusal of each code is that code (both producer shapes of one code, and the other code);
 *    C2 the registered reading of a fresh copy of the measured reconstruction envelope carries its code and field verbatim; C3 the
 *    reader adapter projects each code as itself; C4 no src or qa file spells either code (the bead's own baseline: 0 files at
 *    d75b68d1), so no Pi table can map one onto the other.
 *  D, acceptance (c). D1 a stand-in rf that refuses the first spawn and would answer any second spawn with a full-shape live render
 *    still yields the refusal, no reading and exactly one spawn; D2 the adapter reads the constructed refusal (its workspace nulled)
 *    as a failure carrying no value (no output digest, no graph revision, no evidence reference); D3 the measured refusal shape, its
 *    workspace kept verbatim and read at its own root (/fixture/rf-workspace): the native reader still refuses with the code alone
 *    in one spawn (a later spawn would answer a full-shape live render), fetch 0, and the adapter's one failure snapshot carries no
 *    live-value leg (no output digest, graph revision or bundle); D4 the quiet row of that snapshot's one evidence reference: the
 *    producer's workspace id, verbatim, beside the producer's operation id as its source id - identities the refusal carries, not
 *    values.
 * The render-command refusals B4, B5, C1, C3, D1 and D2 read are CONSTRUCTED: the measured diagnostic placed on a context.render
 * failure envelope, since the render plane never emits a replay code. renderRefusal nulls the workspace every measured refusal
 * carries (both readers accept a null workspace on a failure), so D2's "no evidence reference" is a reading of that construction;
 * D3 and D4 keep the measured workspace.
 * SEAM (F7, disclosed): acceptance (a) is met at the test-reachable seam registerReactiveFiberRender, which has 0 production call
 * sites (B7). The owner question rides verbatim: 'should a future replay reader's typed refusal carry the five fields (it would
 * need a CapabilityError detail channel the registry currently drops on rewrap, capability-registry.ts:436)?'
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the codes, fields, exit and gating artifacts, the residual families and every registered test
 * title - is held to the out-of-file roster, whose measured envelopes anchor the field set and the codes outside this file. The
 * last case walks the vitest task tree: every judged pin registers once, runs in run mode, is not inverted and reaches its
 * witness compare. Not claimed: an edit of this file and the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the native typed refusal and the adapter's projection carry the code
 * but withhold the five fields (the swarm X1 no-path posture; the adapter's "metadata withheld" note), so the fields ride only the
 * registered reading (quiet rows B4, B5); R-RENDER-ONLY no Pi reader reads a context.replay envelope, so the code a replay refuses
 * with is not echoed today - the replay envelope is refused as unrecognized (quiet rows A3, A4); R-COMPOSED-ARGV a replay argv
 * whose words come from a non-literal part - a variable, a call, a template substitution, including a push or a concat of one - is
 * invisible to A1 (A1's composedArgv and concatComposed controls stay 0); R-COMPOSED-NAME a port, launcher or seam name assembled
 * at runtime (a concatenation splitting the word across literals, a launcher read into a variable or reached through a wrapper)
 * is invisible to B6 and B7 (their splitName and wrappedLauncher controls stay quiet); R-UNLISTED a port outside the listed
 * network globals, network modules and child_process launchers (a worker, a native addon, process.binding) is not read by B6 (its
 * unlisted control stays quiet); R-UNMARKED-READER an rf reader registered with none of A2's three markers is invisible to A2 (its
 * unmarked control stays 0).
 * SCOPE: the codes, fields and shapes are producer facts at the installed rf; Pi vendors no rf schema, so a producer-side change is
 * seen only when a fixture re-measure re-reads them. The armed half (a replay reader echoing the five fields) waits for
 * rfc-0txnl.25 and rfc-bak67.12: no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and qa are only read.
 */
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-replay-refusal-echo-roster.json");
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];

/** The refusal the statement names and the code acceptance (b) must never be confused with. */
const SNAPSHOT_MISSING = "RF_REPLAY_SOURCE_SNAPSHOT_MISSING";
const RECONSTRUCTION_UNAVAILABLE = "RF_REPLAY_RECONSTRUCTION_UNAVAILABLE";
/** The REGISTRY row's metadata_keys of RF_REPLAY_SOURCE_SNAPSHOT_MISSING, in the producer's order. */
const FIELDS = ["source_id", "snapshot_id", "render_id", "reason", "segments"];
/** The producer's _EXIT_NOT_REPLAYABLE, the exit both measured replays answered with. */
const REPLAY_EXIT = 8;
/** The gating artifacts of the federation-receipt replay arm (bead wb-a9l2.4 statement). */
const GATING_ARTIFACTS = ["rfc-0txnl.25", "rfc-bak67.12"];
const REPLAY_COMMAND = "context.replay";
const REPLAY_VERB = /\bcontext[\s._-]+replay\b/i;
/** The module families a network contact would need: none may appear in the reader closure. */
const NETWORK_MODULE = /^(?:node:)?(?:net|http|https|http2|dns|tls|dgram)(?:\/|$)|^(?:undici|ws)(?:\/|$)/;
const NETWORK_GLOBALS = ["fetch", "WebSocket", "EventSource", "XMLHttpRequest"];
const CHILD_PROCESS = /^(?:node:)?child_process$/;
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The reader modules: the provider and its adapter; B6 walks their src import closure. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
const PROVIDER_MODULE = "src/workbench/providers/reactivefiber.ts";
/** The three rf markers A2 selects a descriptor by: the id prefix, the grant namespace and the contract carrier's family. */
const RF_ID_PREFIX = "reactivefiber.";
const RF_GRANT_PREFIX = "reactivefiber:";
const RF_CARRIER = /^rf@/;
/** B7: the injected-reader seam B2 and B3 read, and the served registration whose spelling outside the provider anchors the walk. */
const SEAM = "registerReactiveFiberRender";
const SERVED = "registerNativeReactiveFiberRender";
const SERVED_ANCHOR = "src/workbench/native-modules.ts";
/** Each floor sits below the count measured at base 893fe06 (src 115 .ts modules, reader closure 7), so an emptied or misdirected
 * walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const CLOSURE_FLOOR = 5;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, absent today) Pi drives and reads no rf replay: no src module or native descriptor spells an rf replay verb, the rf roster stays reactivefiber.render.preview only, and both readers refuse a context.replay envelope",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(a) a fixture exit-8 RF_REPLAY_SOURCE_SNAPSHOT_MISSING envelope surfaces the code and its five fields verbatim while a counting fake producer/network port stays at 0 calls",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7"],
  },
  {
    id: "C",
    label: "(b) Pi never rewrites one code into the other: RF_REPLAY_SOURCE_SNAPSHOT_MISSING and RF_REPLAY_RECONSTRUCTION_UNAVAILABLE each surface as themselves and no src or qa file spells either",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(c) the missing-blob replay yields the refusal, never a fresh live value: one spawn, no reading, and a failure projection that carries no value",
    pins: ["D1", "D2", "D3", "D4"],
  },
];

/** The named residual families and the judged pins carrying each one's quiet row. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-WITHHELD": ["B4", "B5"],
  "R-RENDER-ONLY": ["A3", "A4"],
  "R-COMPOSED-ARGV": ["A1"],
  "R-COMPOSED-NAME": ["B6", "B7"],
  "R-UNLISTED": ["B6"],
  "R-UNMARKED-READER": ["A2"],
};

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
type EnvelopeName = "blob" | "reconstruction" | "retention";
interface Roster {
  readonly rfVersion: string;
  readonly replayExit: number;
  readonly codes: readonly string[];
  readonly fields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly tests: readonly string[];
  readonly envelopes: Readonly<Record<EnvelopeName, Envelope>>;
  readonly rows: readonly RosterRow[];
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

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.residuals)) {
    throw new Error("roster must be an object with rows, envelopes and residuals");
  }
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
  if (typeof raw.rfVersion !== "string" || typeof raw.replayExit !== "number") throw new Error("roster needs rfVersion and replayExit");
  const residuals = Object.fromEntries(Object.entries(raw.residuals).map(([family, members]) => [family, strings(members, `residuals.${family}`)]));
  return {
    rfVersion: raw.rfVersion,
    replayExit: raw.replayExit,
    codes: strings(raw.codes, "codes"),
    fields: strings(raw.fields, "fields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    residuals,
    tests: strings(raw.tests, "tests"),
    envelopes: {
      blob: envelopeOf(raw.envelopes.blob, "blob"),
      reconstruction: envelopeOf(raw.envelopes.reconstruction, "reconstruction"),
      retention: envelopeOf(raw.envelopes.retention, "retention"),
    },
    rows,
  };
}

const ROSTER = readRoster();
const { blob: BLOB, reconstruction: RECONSTRUCTION, retention: RETENTION } = ROSTER.envelopes;
/** The measured workspace root every roster envelope carries (the rewritten scratch root). */
const FIXTURE_ROOT = BLOB.workspace.root;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The primary diagnostic of an envelope and its metadata. */
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
/** The field values a surface must not name: every string leaf of the primary diagnostic's metadata. */
function fieldValues(envelope: Envelope): string[] {
  return stringLeaves(metadataOf(envelope));
}
/** The constructed render-command refusal: the measured diagnostics (a copy) on a context.render failure envelope, workspace
 * nulled. */
function renderRefusal(envelope: Envelope): JsonObject {
  return {
    schema: envelope.schema, ok: false, command: "context.render", operation_id: envelope.operation_id, workspace: null,
    transaction_id: null, result: null, diagnostics: envelope.diagnostics.map(json),
  };
}
/** The measured refusal shape on the render plane: the constructed refusal with the measured workspace kept, verbatim. */
function measuredRefusal(envelope: Envelope): JsonObject {
  return { ...renderRefusal(envelope), workspace: { id: envelope.workspace.id, root: envelope.workspace.root } };
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
/** Every src .ts module, repo-relative. */
function srcModules(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => relative(REPO, file));
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

/** The counting fake producer/network port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake producer port answers no call"));
  });
}

/**
 * A stand-in `rf` first on PATH. It appends one JSON argv line per spawn to the returned log; its first spawn prints `first` and
 * exits `exit`, and any later spawn prints `later` (when given) and exits 0.
 */
function standInRf(first: JsonValue, exit: number, later?: JsonValue): string {
  const folder = makeScratch("rf-replay-refusal-echo-");
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
      "const seen = fs.existsSync(log) ? fs.readFileSync(log, \"utf8\").split(\"\\n\").filter(Boolean).length : 0;",
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

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against the stand-in rf. */
async function nativeOutcome(first: JsonValue, exit: number, later?: JsonValue): Promise<NativeOutcome> {
  countFetches();
  const log = standInRf(first, exit, later);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `answer()`. */
async function injectedReading(answer: () => Envelope): Promise<{ reading: JsonValue; calls: number }> {
  countFetches();
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return answer();
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
/** The observer scoped to the measured workspace root, so the adapter reads a refusal that keeps its measured workspace. */
const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = { ...OBSERVER_CONTEXT, scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" } };
function readingAt(workspaceRoot: string, source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot, source };
}
function readingOf(source: JsonValue): JsonValue {
  return readingAt(ROOT, source);
}
/** The adapter's projection of a render-command refusal: the snapshot's display fields and the surfaced diagnostics. */
function projectionOf(envelope: Envelope): { topology: ReturnType<typeof reactivefiberTopology>; shown: string[] } {
  const topology = reactivefiberTopology(readingOf(renderRefusal(envelope)), OBSERVER_CONTEXT);
  return { topology, shown: stringLeaves(json(topology)) };
}

interface MarkedDescriptor {
  readonly id: string;
  readonly permissions: readonly string[];
  readonly contractSource?: string;
}
let nativeIds: Promise<{ ids: string[]; texts: string[]; descriptors: MarkedDescriptor[] }> | undefined;
/** The native registration's descriptors, loaded once: the ids, each descriptor's JSON text and its rf markers. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[]; descriptors: MarkedDescriptor[] }> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)), descriptors };
  });
  return nativeIds;
}
/** The rf roster of a descriptor list: every descriptor carrying any rf marker (the id prefix, an rf grant, an rf@ carrier). */
function rfRoster(descriptors: readonly MarkedDescriptor[]): string[] {
  return descriptors
    .filter(descriptor => descriptor.id.startsWith(RF_ID_PREFIX) || descriptor.permissions.some(grant => grant.startsWith(RF_GRANT_PREFIX)) ||
      RF_CARRIER.test(descriptor.contractSource ?? ""))
    .map(descriptor => descriptor.id);
}

interface VerbScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** The words of a list: each string literal's text, an array-literal spread's words in place, null for any other element. */
function wordsOf(items: readonly ts.Expression[]): (string | null)[] {
  return items.flatMap(item => {
    if (ts.isStringLiteralLike(item)) return [item.text];
    if (ts.isSpreadElement(item) && ts.isArrayLiteralExpression(item.expression)) return wordsOf(item.expression.elements);
    return [null];
  });
}
/** The words a concat chain composes: its receiver (an array literal or an inner concat) and each argument (a list's words, a
 * literal's text, null otherwise), in order; null when the call is not a concat. */
function concatWords(call: ts.CallExpression): (string | null)[] | null {
  const callee = call.expression;
  if (!ts.isPropertyAccessExpression(callee) || callee.name.text !== "concat") return null;
  const receiver = callee.expression;
  const head = ts.isArrayLiteralExpression(receiver) ? wordsOf(receiver.elements) : ts.isCallExpression(receiver) ? (concatWords(receiver) ?? [null]) : [null];
  return [...head, ...call.arguments.flatMap(argument => (ts.isArrayLiteralExpression(argument) ? wordsOf(argument.elements) : wordsOf([argument])))];
}
/** One module's rf replay verbs: a list (an array literal, an argument list or a concat chain) with "context" before "replay", or a
 * string or template literal spelling one. */
function scanReplayVerbs(fileName: string, text: string): VerbScan {
  const source = sourceOf(fileName, text);
  const argv: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const sequence = (words: readonly (string | null)[]): void => {
    let replay = false;
    words.forEach((word, index) => {
      if (word !== "context" || index + 1 >= words.length) return;
      const later = words.slice(index + 1);
      if (later.some(item => item !== null && item.toLowerCase() === "replay")) replay = true;
      else if (later[0] === "render") renderArgv += 1;
      else if (later[0] === null) composedArgv += 1;
    });
    if (replay) argv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) sequence(wordsOf(node.elements));
    if (ts.isCallExpression(node)) {
      sequence(wordsOf(node.arguments));
      const chained = concatWords(node);
      if (chained !== null) sequence(chained);
    }
    if (ts.isStringLiteralLike(node) && REPLAY_VERB.test(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (REPLAY_VERB.test(parts.join(" "))) literals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, renderArgv, composedArgv };
}

interface PortScan {
  readonly network: string[];
  readonly globals: string[];
  readonly dynamic: string[];
  readonly launches: string[];
  readonly local: string[];
}
/** True for an import() or a require() call. */
function isLoader(call: ts.CallExpression): boolean {
  return call.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(call.expression) && call.expression.text === "require");
}
/** True for `require("node:child_process")` and `[await] import("node:child_process")`. */
function loadsChildProcess(node: ts.Expression): boolean {
  const call = ts.isAwaitExpression(node) ? node.expression : node;
  if (!ts.isCallExpression(call) || !isLoader(call)) return false;
  const first = call.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS.test(first.text);
}
/** One module's ports: every identifier (a property name included) or exact string literal naming a network global; every exact
 * string literal naming a network module; every import() or require() of a non-literal specifier; the program of every
 * child_process launcher call however the launcher is bound (named, aliased, namespace, default, required, import-equals or
 * dynamically imported; a module-local const program resolved, "<composed>" otherwise); and its relative module specifiers. */
function scanPorts(fileName: string, text: string): PortScan {
  const source = sourceOf(fileName, text);
  const network: string[] = [];
  const globals: string[] = [];
  const dynamic: string[] = [];
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
    if (ts.isIdentifier(node) && NETWORK_GLOBALS.includes(node.text)) globals.push(`${fileName}: ${node.text}`);
    if (ts.isStringLiteralLike(node)) {
      if (NETWORK_GLOBALS.includes(node.text)) globals.push(`${fileName}: "${node.text}"`);
      if (NETWORK_MODULE.test(node.text)) network.push(`${fileName}: ${node.text}`);
    }
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) &&
      node.moduleSpecifier.text.startsWith(".")) local.push(node.moduleSpecifier.text);
    if (ts.isCallExpression(node)) {
      const first = node.arguments[0];
      if (isLoader(node)) {
        if (first === undefined || !ts.isStringLiteralLike(first)) dynamic.push(`${fileName}: ${node.getText(source)}`);
        else if (first.text.startsWith(".")) local.push(first.text);
      }
      if (launcherOf(node.expression) !== undefined) launches.push(literalOf(first, bindings) ?? "<composed>");
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { network, globals, dynamic, launches, local };
}

/** The reader modules' transitive src import closure, each module's ports merged. */
function readerClosure(): { modules: string[]; unresolved: string[]; ports: PortScan } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const merged: PortScan = { network: [], globals: [], dynamic: [], launches: [], local: [] };
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || seen.has(file)) continue;
    seen.add(file);
    const scan = scanPorts(relative(REPO, file), textOf(file));
    merged.network.push(...scan.network);
    merged.globals.push(...scan.globals);
    merged.dynamic.push(...scan.dynamic);
    merged.launches.push(...scan.launches);
    for (const specifier of scan.local) {
      const target = join(dirname(file), specifier.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${relative(REPO, file)}: ${specifier}`);
    }
  }
  return { modules: [...seen].map(file => relative(REPO, file)).sort(), unresolved, ports: merged };
}

/** One module's spellings of a name: every identifier (a property name included) or exact string literal spelling it. */
function spellingsOf(fileName: string, text: string, name: string): number {
  const source = sourceOf(fileName, text);
  let count = 0;
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isStringLiteralLike(node)) && node.text === name) count += 1;
    ts.forEachChild(node, visit);
  };
  visit(source);
  return count;
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The roots a code-to-code table could live in; each floor sits below the count measured at base 0b2a80f (src 115 .ts modules
 * among its files, qa 67 files), so an emptied walk reds and an additive change does not. */
const CODE_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "workbench/providers/reactivefiber.ts", anchorToken: "RF render refused" },
  { root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
function scanCodes(scan: ScanRoot): JsonValue {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const hits = files.filter(file => [SNAPSHOT_MISSING, RECONSTRUCTION_UNAVAILABLE].some(code => textOf(file).includes(code))).map(file => relative(REPO, file));
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling a replay refusal code under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, floorMet, anchorRead, hits };
}

/** A registered reading of the roster envelope `name` through the injected seam: the reader answers a FRESH copy, and the
 * reading's source must equal a fresh roster read and serialize to the bytes taken before the invocation, so neither an added key
 * nor an in-place edit can pass; the module's roster copy stays untouched; the injected reader is called once, fetch 0. */
async function verbatimReading(name: EnvelopeName): Promise<JsonValue> {
  const envelope = ROSTER.envelopes[name];
  const before = JSON.stringify(envelope);
  const fresh = readRoster().envelopes[name];
  const { reading, calls } = await injectedReading(() => envelopeOf(JSON.parse(before), `the reader's fresh copy of ${name}`));
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: fresh });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
  expect(primary).toStrictEqual(primaryOf(fresh));
  // Byte for byte: the reading's source serializes to exactly a fresh roster read's bytes, key order included.
  expect(JSON.stringify(source)).toBe(JSON.stringify(fresh));
  expect(JSON.stringify(source)).toBe(before);
  expect(JSON.stringify(envelope), "the roster copy is untouched").toBe(before);
  expect(calls).toBe(1);
  expect(fetches).toBe(0);
  return {
    code: String(primary.code), metadata: objectOf(primary.metadata, "reading metadata"),
    readingKeys: Object.keys(objectOf(reading, "reading")).sort(), calls, fetches,
  };
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanReplayVerbs(relative(REPO, file), textOf(file)));
    const argv = found.flatMap(result => result.argv);
    const literals = found.flatMap(result => result.literals);
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const composedArgv = found.reduce((sum, result) => sum + result.composedArgv, 0);
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((id, index) => REPLAY_VERB.test(texts[index] ?? "") || /replay/i.test(id));
    const srcFloorMet = files.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, descriptorHits }, "an rf replay verb needs rfc-0txnl.25 and rfc-bak67.12").toStrictEqual({ argv: [], literals: [], descriptorHits: [] });
    const control = (text: string): number => {
      const scan = scanReplayVerbs("control.ts", text);
      return scan.argv.length + scan.literals.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "context", "replay", render, "--json"]);'),
      spaced: control('const cmd = "rf context replay rfr_x --json";'),
      dotted: control(`const id = "${REPLAY_COMMAND}";`),
      template: control(["const cmd = `rf context  replay $", "{render}`;"].join("")),
      composedArgv: control('const verb = "replay"; spawn("rf", ["context", verb]);'),
      concat: control('spawn("rf", ["--workspace", w, "context"].concat(["replay", render, "--json"]));'),
      pushed: control('const argv = ["--workspace", w]; argv.push("context", "replay", render);'),
      flagBetween: control('spawn("rf", ["--workspace", w, "context", "--quiet", "replay", render]);'),
      spread: control('spawn("rf", [...["--workspace", w, "context"], "replay", render]);'),
      concatComposed: control('spawn("rf", ["--workspace", w, "context"].concat(rest));'),
    };
    return { srcFloorMet, renderArgvSeen, argv, literals, descriptorHits, composedArgv, controls };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const injectedDescriptors = injected.catalogSnapshot().map(entry => entry.descriptor);
    const native = rfRoster((await nativeDescriptors()).descriptors);
    const injectedIds = rfRoster(injectedDescriptors);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    // Non-vacuity: the preview itself carries all three markers, its carrier read from the provider's own export.
    const preview = injectedDescriptors.find(descriptor => descriptor.id === PREVIEW_ID);
    const markers = {
      prefix: preview?.id.startsWith(RF_ID_PREFIX) ?? false,
      grants: (preview?.permissions ?? []).filter(grant => grant.startsWith(RF_GRANT_PREFIX)),
      carrier: preview?.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE && RF_CARRIER.test(REACTIVE_FIBER_CONTRACT_SOURCE),
    };
    expect(markers).toStrictEqual({ prefix: true, grants: GRANTS, carrier: true });
    const control = (descriptor: MarkedDescriptor): number => rfRoster([descriptor]).length;
    const controls = {
      prefix: control({ id: "reactivefiber.replay.preview", permissions: ["planted:read"], contractSource: "planted@1:read" }),
      grant: control({ id: "rf.context.reread", permissions: ["reactivefiber:render"], contractSource: "planted@1:read" }),
      carrier: control({ id: "rf.context.reread", permissions: ["planted:read"], contractSource: REACTIVE_FIBER_CONTRACT_SOURCE }),
      unmarked: control({ id: "rf.context.reread", permissions: ["planted:read"], contractSource: "planted@1:read" }),
    };
    return { native, injected: injectedIds, reconcile, markers, controls };
  },
  A3: async () => {
    const outcome = await nativeOutcome(json(BLOB), REPLAY_EXIT);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  A4: async () => {
    let caught: unknown;
    try {
      reactivefiberTopology(readingOf(json(BLOB)), OBSERVER_CONTEXT);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CapabilityError);
    return refusalOf(caught);
  },
  B1: async () => {
    const shapes = [BLOB, RETENTION].map(envelope => Object.keys(metadataOf(envelope)));
    const codes = [BLOB, RETENTION].map(codeOf);
    const commands = [BLOB, RETENTION].map(envelope => envelope.command);
    const failures = [BLOB, RETENTION].every(envelope => envelope.ok === false && envelope.result === null);
    expect(codes).toStrictEqual([SNAPSHOT_MISSING, SNAPSHOT_MISSING]);
    expect(commands).toStrictEqual([REPLAY_COMMAND, REPLAY_COMMAND]);
    expect(failures).toBe(true);
    expect(ROSTER.replayExit).toBe(REPLAY_EXIT);
    // Each of the five fields in exactly one of the two producer shapes, and nothing else.
    expect(shapes.flat().sort()).toStrictEqual([...FIELDS].sort());
    return { codes, commands, failures, exit: ROSTER.replayExit, shapes, fields: FIELDS.filter(field => shapes.some(shape => shape.includes(field))) };
  },
  B2: async () => verbatimReading("blob"),
  B3: async () => verbatimReading("retention"),
  B4: async () => {
    const outcome = await nativeOutcome(renderRefusal(BLOB), REPLAY_EXIT);
    const message = outcome.refusal?.message ?? "";
    const valuesNamed = fieldValues(BLOB).filter(value => message.includes(value));
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${SNAPSHOT_MISSING}` });
    expect(valuesNamed).toEqual([]);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, valuesNamed, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  B5: async () => {
    const { topology, shown } = projectionOf(BLOB);
    const primary = primaryOf(BLOB);
    const withheld = [...fieldValues(BLOB), String(primary.message), String(primary.hint)];
    const surfaced = shown.filter(text => withheld.some(value => text.includes(value)));
    const snapshot = topology.snapshots[0];
    const statusText = snapshot?.node.statusText ?? "";
    expect(statusText).toContain(SNAPSHOT_MISSING);
    expect(surfaced).toEqual([]);
    return { statusText, diagnostics: [...topology.diagnostics], surfaced };
  },
  B6: async () => {
    const { modules, unresolved, ports } = readerClosure();
    const anchorsRead = READER_MODULES.every(module => modules.includes(module)) && modules.includes("src/workbench/capability-registry.ts");
    const closureFloorMet = modules.length >= CLOSURE_FLOOR;
    const launches = [...new Set(ports.launches)].sort();
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead).toBe(true);
    expect(unresolved).toEqual([]);
    expect({ network: ports.network, globals: ports.globals, dynamic: ports.dynamic, launches }).toStrictEqual({ network: [], globals: [], dynamic: [], launches: ["rf"] });
    const control = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { network: scan.network.length, globals: scan.globals.length, dynamic: scan.dynamic.length, launches: scan.launches };
    };
    const controls = {
      http: control('import { request } from "node:http";'),
      undici: control('const { fetch: get } = await import("undici");'),
      fetch: control("await fetch(producer);"),
      globalFetch: control("await globalThis.fetch(producer);"),
      socket: control("const socket = new WebSocket(producer);"),
      curl: control('spawn("curl", [producer]);'),
      composed: control("spawn(command, []);"),
      namespaceLauncher: control('import * as cp from "node:child_process"; cp.execFile("curl", [producer]);'),
      aliasedLauncher: control('import { spawn as run } from "node:child_process"; run("curl", [producer]);'),
      defaultLauncher: control('import cp from "node:child_process"; cp.spawn("curl", []);'),
      requiredLauncher: control('const { spawn: go } = require("node:child_process"); go("curl", []);'),
      requiredSpace: control('const cp = require("child_process"); cp.fork("curl");'),
      importEquals: control('import cp = require("node:child_process"); cp.spawn("curl", []);'),
      dynamicLauncher: control('const cp = await import("node:child_process"); cp.execFile("curl", []);'),
      constLauncher: control('import { spawn } from "node:child_process"; const tool = "curl"; spawn(tool, []);'),
      fetchElement: control('await globalThis["fetch"](producer);'),
      fetchAlias: control("const get = globalThis.fetch; await get(producer);"),
      composedImport: control('const name = "node:" + "https"; await import(name);'),
      splitName: control('await globalThis["fe" + "tch"](producer);'),
      wrappedLauncher: control('import * as cp from "node:child_process"; const run = cp.spawn; run("curl", []);'),
      unlisted: control('process.binding("tcp_wrap");'),
    };
    return { closureFloorMet, anchorsRead, unresolved, network: ports.network, globals: ports.globals, dynamic: ports.dynamic, launches, controls };
  },
  B7: async () => {
    const files = srcModules();
    const sites = (name: string): string[] => files.filter(file => file !== PROVIDER_MODULE && spellingsOf(file, textOf(join(REPO, file)), name) > 0).sort();
    const seamSites = sites(SEAM);
    const servedSites = sites(SERVED);
    const srcFloorMet = files.length >= SRC_FLOOR;
    const servedAnchorRead = servedSites.includes(SERVED_ANCHOR);
    const definedInProvider = spellingsOf(PROVIDER_MODULE, textOf(join(REPO, PROVIDER_MODULE)), SEAM) >= 1;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(servedAnchorRead, `modules spelling ${SERVED}: ${servedSites.join(", ")}`).toBe(true);
    expect(definedInProvider).toBe(true);
    expect(seamSites, "src modules reaching the injected seam (acceptance (a) is met there, at 0 production call sites)").toEqual([]);
    const control = (text: string): number => spellingsOf("control.ts", text, SEAM);
    const controls = {
      call: control("registerReactiveFiberRender(registry, read, root);"),
      aliased: control('import { registerReactiveFiberRender as wire } from "./providers/reactivefiber.js"; wire(registry, read, root);'),
      element: control('provider["registerReactiveFiberRender"](registry, read, root);'),
      splitName: control('provider["register" + "ReactiveFiberRender"](registry, read, root);'),
    };
    return { srcFloorMet, servedAnchorRead, definedInProvider, seamSites, controls };
  },
  C1: async () => {
    const messages: JsonObject = {};
    const spawns: number[] = [];
    for (const [name, envelope] of [["blob", BLOB], ["retention", RETENTION], ["reconstruction", RECONSTRUCTION]] as const) {
      const outcome = await nativeOutcome(renderRefusal(envelope), REPLAY_EXIT);
      expect(outcome.refusal?.message).toBe(`RF render refused: ${codeOf(envelope)}`);
      messages[name] = outcome.refusal?.message ?? null;
      spawns.push(outcome.spawns.length);
    }
    expect(messages.blob).not.toBe(messages.reconstruction);
    return { messages, spawns };
  },
  C2: async () => verbatimReading("reconstruction"),
  C3: async () => {
    const shown: JsonObject = {};
    for (const [name, envelope] of [["blob", BLOB], ["retention", RETENTION], ["reconstruction", RECONSTRUCTION]] as const) {
      const statusText = projectionOf(envelope).topology.snapshots[0]?.node.statusText ?? "";
      const other = codeOf(envelope) === SNAPSHOT_MISSING ? RECONSTRUCTION_UNAVAILABLE : SNAPSHOT_MISSING;
      expect(statusText).toContain(codeOf(envelope));
      expect(statusText).not.toContain(other);
      shown[name] = statusText;
    }
    return shown;
  },
  C4: async () => ({ roots: CODE_ROOTS.map(scanCodes), codes: [SNAPSHOT_MISSING, RECONSTRUCTION_UNAVAILABLE] }),
  D1: async () => {
    // The stand-in would answer a second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeOutcome(renderRefusal(BLOB), REPLAY_EXIT, fullShapeRf(ROOT));
    expect(outcome.refusal?.category).toBe("unavailable");
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    expect(fetches).toBe(0);
    return { category: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length, fetches };
  },
  D2: async () => {
    const { topology } = projectionOf(BLOB);
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined || (snapshot.evidenceRefs ?? []).length > 0;
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(carriesValue).toBe(false);
    return { snapshots: topology.snapshots.length, coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null, carriesValue };
  },
  D3: async () => {
    const refusal = measuredRefusal(BLOB);
    const outcome = await nativeOutcome(refusal, REPLAY_EXIT, fullShapeRf(ROOT));
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${SNAPSHOT_MISSING}` });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    const topology = reactivefiberTopology(readingAt(FIXTURE_ROOT, refusal), FIXTURE_CONTEXT);
    const snapshot = topology.snapshots[0];
    const liveLegs = { outputDigest: snapshot?.nativePayloadRef ?? null, graphRevision: snapshot?.sourceRevision ?? null, bundle: snapshot?.sourceVersion ?? null };
    expect(refusal.workspace).toStrictEqual(BLOB.workspace);
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(liveLegs).toStrictEqual({ outputDigest: null, graphRevision: null, bundle: null });
    return {
      ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, fetches, workspace: refusal.workspace,
      snapshots: topology.snapshots.length, statusTone: snapshot?.node.statusTone ?? null, liveLegs,
    };
  },
  D4: async () => {
    const topology = reactivefiberTopology(readingAt(FIXTURE_ROOT, measuredRefusal(BLOB)), FIXTURE_CONTEXT);
    const snapshot = topology.snapshots[0];
    const evidenceRefs = [...(snapshot?.evidenceRefs ?? [])];
    const sourceId = snapshot?.source.id ?? null;
    expect(evidenceRefs, "the one reference a workspace-bearing refusal carries is its own workspace").toStrictEqual([`rf-workspace:${BLOB.workspace.id}`]);
    expect(sourceId).toBe(BLOB.operation_id);
    return { evidenceRefs, sourceId };
  },
};

describe("wb-a9l2.4 rf replay refusal echo census (RF-HARNESS2-FEDERATED-PEER-R4, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:7", "C:4", "D:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ codes: [SNAPSHOT_MISSING, RECONSTRUCTION_UNAVAILABLE], fields: FIELDS, replayExit: REPLAY_EXIT, gatingArtifacts: GATING_ARTIFACTS, residuals: RESIDUALS }).toStrictEqual({
      codes: [...ROSTER.codes], fields: [...ROSTER.fields], replayExit: ROSTER.replayExit, gatingArtifacts: [...ROSTER.gatingArtifacts], residuals: ROSTER.residuals,
    });
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
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
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
