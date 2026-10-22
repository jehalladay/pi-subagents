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
 *  A, the trigger, absent today. A1 an AST scan of every src module and every native descriptor for an rf replay verb (an argv
 *    "context" followed by "replay", or a string or template literal spelling one), with a floor, a non-vacuity reading of the real
 *    render argv and five controls; A2 the rf roster stays the preview alone (native and injected registrations,
 *    RECONCILE_EVIDENCE_READS.reactivefiber at src/workflow/reconcile.ts:67); A3 the native reader refuses the measured replay
 *    envelope as an unrecognized envelope in one spawn of the render argv; A4 the reader adapter refuses a reading carrying it.
 *  B, acceptance (a). B1 the fixture itself: both envelopes carry the code, the measured exit 8 rides the roster, and their two
 *    metadata shapes together are exactly the five fields, each field in one shape; B2 and B3 the registered reading of each
 *    envelope (registerReactiveFiberRender, the registry's injected-reader seam) carries it byte for byte - the code and every field
 *    verbatim, nothing added inside it - while the counting fake producer port (a fail-closed globalThis.fetch) stays at 0 and the
 *    injected reader is called once; B4 the native typed refusal names the code verbatim and no field value, in one spawn, fetch 0;
 *    B5 the reader adapter's projection names the code and no field value; B6 the static port census: the reader modules'
 *    transitive src import closure imports no network module, calls no fetch, WebSocket or EventSource, and launches only "rf".
 *  C, acceptance (b). C1 the native typed refusal of each code is that code (both producer shapes of one code, and the other code);
 *    C2 the registered reading of the measured reconstruction envelope carries its code and field verbatim; C3 the reader adapter
 *    projects each code as itself; C4 no src or qa file spells either code (the bead's own baseline: 0 files at d75b68d1), so no
 *    Pi table can map one onto the other.
 *  D, acceptance (c). D1 a stand-in rf that refuses the first spawn and would answer any second spawn with a full-shape live render
 *    still yields the refusal, no reading and exactly one spawn; D2 the adapter reads the refusal as a failure carrying no value
 *    (no output digest, no graph revision, no evidence reference).
 * The render-command refusals B4, B5, C1, C3, D1 and D2 read are CONSTRUCTED: the measured diagnostic placed on a context.render
 * failure envelope, since the render plane never emits a replay code.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the codes, fields, exit and gating artifacts - is held to the out-of-file roster, whose measured
 * envelopes anchor the field set and the codes outside this file.
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the native typed refusal and the adapter's projection carry the code
 * but withhold the five fields (the swarm X1 no-path posture; the adapter's "metadata withheld" note), so the fields ride only the
 * registered reading (quiet rows B4, B5); R-RENDER-ONLY no Pi reader reads a context.replay envelope, so the code a replay refuses
 * with is not echoed today - the replay envelope is refused as unrecognized (quiet rows A3, A4); R-COMPOSED-ARGV a replay argv
 * built from non-literal parts is invisible to A1 (A1's composedArgv control stays 0).
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
const NETWORK_GLOBALS = ["fetch", "WebSocket", "EventSource"];
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The reader modules: the provider and its adapter; B6 walks their src import closure. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];

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
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(b) Pi never rewrites one code into the other: RF_REPLAY_SOURCE_SNAPSHOT_MISSING and RF_REPLAY_RECONSTRUCTION_UNAVAILABLE each surface as themselves and no src or qa file spells either",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(c) the missing-blob replay yields the refusal, never a fresh live value: one spawn, no reading, and a failure projection that carries no value",
    pins: ["D1", "D2"],
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
  readonly codes: readonly string[];
  readonly fields: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly envelopes: { readonly blob: Envelope; readonly reconstruction: Envelope; readonly retention: Envelope };
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
  if (typeof raw.rfVersion !== "string" || typeof raw.replayExit !== "number") throw new Error("roster needs rfVersion and replayExit");
  return {
    rfVersion: raw.rfVersion,
    replayExit: raw.replayExit,
    codes: strings(raw.codes, "codes"),
    fields: strings(raw.fields, "fields"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
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
/** The constructed render-command refusal: the measured diagnostics on a context.render failure envelope. */
function renderRefusal(envelope: Envelope): JsonObject {
  return {
    schema: envelope.schema, ok: false, command: "context.render", operation_id: envelope.operation_id, workspace: null,
    transaction_id: null, result: null, diagnostics: envelope.diagnostics,
  };
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

/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`. */
async function injectedReading(envelope: Envelope): Promise<{ reading: JsonValue; calls: number }> {
  countFetches();
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
/** The adapter's projection of a render-command refusal: the snapshot's display fields and the surfaced diagnostics. */
function projectionOf(envelope: Envelope): { topology: ReturnType<typeof reactivefiberTopology>; shown: string[] } {
  const topology = reactivefiberTopology(readingOf(renderRefusal(envelope)), OBSERVER_CONTEXT);
  return { topology, shown: stringLeaves(json(topology)) };
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

interface VerbScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** One module's rf replay verbs: an argv array with "context" followed by "replay", or a string or template literal spelling one. */
function scanReplayVerbs(fileName: string, text: string): VerbScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const argv: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if (word !== "context" || index + 1 >= words.length) return;
        const next = words[index + 1];
        if (next === "replay") argv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
        else if (next === "render") renderArgv += 1;
        else if (next === null) composedArgv += 1;
      });
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
  readonly externals: string[];
  readonly network: string[];
  readonly globals: string[];
  readonly launches: string[];
  readonly local: string[];
}
/** One module's ports: its module specifiers (static, re-export, dynamic import and require), network globals it calls or
 * constructs, and the first argument of every child-process launcher it calls ("<composed>" when not a literal). */
function scanPorts(fileName: string, text: string): PortScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const specifiers: string[] = [];
  const globals: string[] = [];
  const launches: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const first = node.arguments[0];
      const dynamic = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
      if (dynamic && first !== undefined && ts.isStringLiteralLike(first)) specifiers.push(first.text);
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "globalThis" ? callee.name.text : "";
      if (NETWORK_GLOBALS.includes(name)) globals.push(`${fileName}: ${name}`);
      if (ts.isIdentifier(callee) && LAUNCHERS.includes(callee.text)) launches.push(first !== undefined && ts.isStringLiteralLike(first) ? first.text : "<composed>");
    }
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && NETWORK_GLOBALS.includes(node.expression.text)) globals.push(`${fileName}: new ${node.expression.text}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  const local = specifiers.filter(specifier => specifier.startsWith("."));
  const externals = specifiers.filter(specifier => !specifier.startsWith("."));
  return { externals, network: externals.filter(specifier => NETWORK_MODULE.test(specifier)), globals, launches, local };
}

/** The reader modules' transitive src import closure, each module's ports merged. */
function readerClosure(): { modules: string[]; unresolved: string[]; ports: PortScan } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const merged: PortScan = { externals: [], network: [], globals: [], launches: [], local: [] };
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || seen.has(file)) continue;
    seen.add(file);
    const scan = scanPorts(relative(REPO, file), textOf(file));
    merged.externals.push(...scan.externals);
    merged.network.push(...scan.network);
    merged.globals.push(...scan.globals);
    merged.launches.push(...scan.launches);
    for (const specifier of scan.local) {
      const target = join(dirname(file), specifier.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${relative(REPO, file)}: ${specifier}`);
    }
  }
  return { modules: [...seen].map(file => relative(REPO, file)).sort(), unresolved, ports: merged };
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

/** A registered reading of `envelope`: byte for byte, its code and metadata verbatim, the injected reader called once, fetch 0. */
async function verbatimReading(envelope: Envelope): Promise<JsonValue> {
  const { reading, calls } = await injectedReading(envelope);
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
  expect(primary).toStrictEqual(primaryOf(envelope));
  // Byte for byte: the reading's source serializes to exactly the roster envelope's bytes, key order included.
  expect(JSON.stringify(source)).toBe(JSON.stringify(envelope));
  expect(calls).toBe(1);
  expect(fetches).toBe(0);
  return {
    code: String(primary.code), metadata: objectOf(primary.metadata, "reading metadata"),
    readingKeys: Object.keys(objectOf(reading, "reading")).sort(), calls, fetches,
  };
}

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
    const srcFloorMet = files.length >= 100;
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
    };
    return { srcFloorMet, renderArgvSeen, argv, literals, descriptorHits, composedArgv, controls };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = (await nativeDescriptors()).ids.filter(id => id.startsWith("reactivefiber."));
    const injectedIds = injected.catalogSnapshot().map(entry => entry.descriptor.id).filter(id => id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    return { native, injected: injectedIds, reconcile };
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
  B2: async () => verbatimReading(BLOB),
  B3: async () => verbatimReading(RETENTION),
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
    const closureFloorMet = modules.length >= 5;
    const launches = [...new Set(ports.launches)].sort();
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead).toBe(true);
    expect(unresolved).toEqual([]);
    expect({ network: ports.network, globals: ports.globals, launches }).toStrictEqual({ network: [], globals: [], launches: ["rf"] });
    const control = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { network: scan.network.length, globals: scan.globals.length, launches: scan.launches };
    };
    const controls = {
      http: control('import { request } from "node:http";'),
      undici: control('const { fetch: get } = await import("undici");'),
      fetch: control("await fetch(producer);"),
      globalFetch: control("await globalThis.fetch(producer);"),
      socket: control("const socket = new WebSocket(producer);"),
      curl: control('spawn("curl", [producer]);'),
      composed: control("spawn(command, []);"),
    };
    return { closureFloorMet, anchorsRead, unresolved, network: ports.network, globals: ports.globals, launches, controls };
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
  C2: async () => verbatimReading(RECONSTRUCTION),
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
};

describe("wb-a9l2.4 rf replay refusal echo census (RF-HARNESS2-FEDERATED-PEER-R4, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:6", "C:4", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ codes: [SNAPSHOT_MISSING, RECONSTRUCTION_UNAVAILABLE], fields: FIELDS, replayExit: REPLAY_EXIT, gatingArtifacts: GATING_ARTIFACTS }).toStrictEqual({
      codes: [...ROSTER.codes], fields: [...ROSTER.fields], replayExit: ROSTER.replayExit, gatingArtifacts: [...ROSTER.gatingArtifacts],
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
