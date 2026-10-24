/**
 * wb-tz4r.7 (RI-UNIFIED-DECISION-INFERENCE-R7), a standing-posture census: no artifact is owed and nothing is gated. Statement
 * (bead title): "No Pi surface shall treat a ReactiveInference result as having executed, or as authorization to execute, a UI
 * action or effect; action execution stays with Pi's own effect authority (standing posture, no artifact owed: the generative rf
 * <LEAF> surface is shipped and Pi registers no consumer of it; the decision surface is unshipped at 485f3615db1e); pin
 * docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:20@485f3615db1e". Acceptance, quoted (bead notes): "(a)
 * hermetic census: no Pi effect/action execution path takes an inference result (reactivefiber.render.preview output or any
 * inference output) as its trigger or authorization (mirrors wb-021.5); (b) fixture: re-projecting an inference result issues no
 * capability_invoke, no decideControl permit and no tool call; (c) mutant: an adapter that invokes an action because an inference
 * result names one fails."
 * THE LEAF NAME. <LEAF> writes the dotted name of rf's generative inference leaf (its group word, a dot, its verb): this file and
 * its roster never spell it, nor its spaced or CLI forms, so the queued wb-tz4r.5 census (which reads every test site of those
 * three spellings as a leaf-catalog entry or a violation) reads no site here; CONSUMER composes the spellings at runtime from
 * GROUP and VERB.
 *
 * MEASURED AT THE PINS (read-only git show in the producers' checkouts by the cutting seat, 2026-10-23). ReactiveInferenceSDK at
 * 485f3615db1e, 01-contracts.md:20: "ReactiveAgentsSDK or host authorizes effects and observation sources. An emitted reference
 * is snapshot-bound and must be revalidated before use. Inference never executes UI actions."; the program directory is
 * byte-identical at RI 9454d8ce1504 (11 commits past the pin), so line 20 stands. ReactiveComponentsSDK at 640a3b579a95,
 * docs/programs/native-interface-component-contract-2026-10-21/README.md:26 (RC-IF-06): "decision execution itself remains
 * external." The installed rf (0.1.836 by `rf --json --version`) serves the generative leaf <LEAF> (served, reachable,
 * store_required, attach_required: one of its 79 leaves); Pi spells no consumer of it (A1).
 *
 * MEASURED AT BASE (c6369e0, landing 293). Pi meets an inference result in exactly one shape: the reading the registered
 * reactivefiber.render.preview provider returns ({contract, workspaceRoot, source}, providers/reactivefiber.ts), read by three
 * modules - the provider itself, the reader adapter reactivefiber-observer.ts (one snapshot and at most one grouping edge, the
 * context text referenced by digest only) and native-evidence.ts (producer metadata) - and handed on as data by the tool and
 * workflow surfaces. Pi's effect authority is its own: decideControl (control.ts) is the one permit minter and the control
 * adapters execute only a core-minted permit; the registry admits an invoke on grants alone (capability-registry.ts dispatch);
 * the curated Claude tools invoke under host-pinned grants (claude-capability-tools.ts); decideReconcile mints acknowledgement
 * and override records from a producer's own evidence read (reconcile-decision.ts). The workflow_control executors
 * (src/index.ts controlExecutors) and NATIVE_CONTROL_ACTIONS name the same four producers, never reactivefiber.
 *
 * THE FIXTURE (constructed; no build serves it): ACTION_READING is the full-shape rf preview of test/helpers/rf-render-fixture.ts
 * whose output.text (and its size and digest) is ACTION_TEXT - an inference output that NAMES actions: each curated tool, each
 * stand-in effect capability and its grant, each control verb with its exact grant and an operator confirmation, and an
 * executed claim. PLAIN_READING is the helper's fixture unchanged. SINKS are three test-only effect stand-ins (write, external,
 * unknown) that count their calls; src registers none of them.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A, acceptance (a). A1 the reader closure: the src value-import closure of the three reader modules is an exact module set that
 *    spells and imports no authority entry (AUTHORITY_CALLS by reference, AUTHORITY_MEMBERS in call position), every name of the
 *    vocabulary resolves to a src export, no src/ui module holds an authority entry (a floor on the modules walked; the
 *    projection readers among them, the modules importing workbench/observation.js, are an exact set), and no src file spells
 *    a <LEAF> consumer (a floor on the files walked, an anchor on the preview id); the controls read a direct call,
 *    an alias and a member call, a property name as no reference, the R-COMPOSED quiet row, the consumer matcher on the
 *    served leaf, its CLI spelling and quiet type-inference prose, and the resolver on an export and a local declaration. A2 control is closed to the inference
 *    producer: NATIVE_CONTROL_ACTIONS and the workflow_control executors name the same four producers, never reactivefiber, and
 *    the real decideControl denies every verb on the re-projected preview node unknown-action under its exact grant and a
 *    confirmation. A3 the inference projection never confers ownership: the adapter states one grouping edge only, a furnace
 *    run grouped to the preview is denied no-confirmed-ownership, furnace's own ownership statement permits the same request,
 *    and the permit is the same with or without the re-projected preview. A4 an inference read confers no invoke authority:
 *    both registered previews (injected and native) are read under reactivefiber:render alone, every read grant leaves each
 *    sink refused with 0 calls while its own permission runs it once, and a workflow script handing the reading to a sink
 *    under the read grants fails authorization (the R-EXPLICIT row: the same script runs once its grant is held). A5 an
 *    inference read is never evidence that an effect executed: only reactivefiber lists the preview as an evidence read, the
 *    preview is refused as a furnace evidence read, a receipt minted from the preview cannot confirm a furnace effect
 *    (evidence-producer-mismatch), and furnace's own receipt can.
 *  B, acceptance (b). B1 three re-projections of ACTION_READING through Pi's reader composition (nativeEvidence, the adapter,
 *    refresh and relate on the session projection) beside live sinks, a connected curated tool server and a counting decision
 *    seam: 0 provider calls, 0 tool calls, 0 permits, the control sweep unchanged for the furnace nodes, byte-identical reads.
 *    B2 the tool surface: one capability_invoke of the preview returns the reading verbatim and dispatches nothing further, and
 *    re-projecting the returned value keeps every count. B3 the workflow host: a script reading the preview completes with 0
 *    sink calls although every sink is granted, and a resume replays the journaled read stale with 0 provider calls. B4 the
 *    reading is never read as an executed action: ACTION_READING and PLAIN_READING project identically except the payload
 *    digest (both seams), nativeEvidence is identical and states no domain status, and no surfaced string carries an action mark.
 *  C, acceptance (c). violationsOf, the checker B1 asserts empty, run on adapters that act because the reading names an action:
 *    C1 a sink invoke and a preview re-read through the registry; C2 a permit from the decision seam; C3 a capability_invoke
 *    through the tool server; C4 an executed claim recorded on the furnace run, a surfaced claim note, the claim written into
 *    the preview node's status line and a re-projection stamped with a moving clock (the reads drift); C5 the quiet controls (five passes, the plain reading, a copy, a reading
 *    that is only hashed) and R-DIRECT-DECIDE's quiet row.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, the sinks, the verbs, the tool names, the reader modules, the two authority vocabularies
 * and the digest of ACTION_TEXT - is held to the out-of-file roster test/fixtures/ri-inference-execution-roster.json; the last
 * case walks this file's vitest task tree against the roster's test list.
 * RESIDUALS (named, each with a pinned row): R-COMPOSED an authority member reached through a computed name (`x[name](...)`) or a
 *    spelling assembled at runtime is invisible to A1's scanner (A1 controls: composed reads 0); the B and C rows are its runtime
 *    backstop for the reader composition and the two host surfaces. R-EXPLICIT a workflow script or the model that reads an
 *    inference result and then explicitly calls an effect acts under the host's grants, which an inference result never extends
 *    (A4 scriptGranted: the explicit call runs once only when its own grant is held, and is refused under the read grants).
 *    R-DIRECT-DECIDE a permit minted by calling the pure decideControl directly and dropped leaves nothing the runtime checker
 *    reads (C5 decidesDirectly: 3 permits minted, violations empty); A1's scanner is its backstop for the reader modules and
 *    src/ui (a decideControl reference reds A1), and an executor or tool handed such a permit is counted by B1-C4.
 * SCOPE: Pi vendors no RI, RC or rf source, so a producer change is seen only when a re-probe re-reads the pins. The decision
 *    surface is unshipped, so nothing here reads a decision envelope (wb-tz4r.1 owns that shape); a future inference consumer is
 *    a new reader module, which reds A1's closure and its <LEAF> census by construction.
 *
 * Display paths added: none. Test-only: no src file is edited, no scratch is allocated, and the stand-ins live in this file.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityProvider,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { CLAUDE_CAPABILITY_TOOL_NAMES, createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import {
  type ControlDecision,
  DESTRUCTIVE_CONTROL_ACTIONS,
  decideControl,
  isCoreMintedDecision,
  NATIVE_CONTROL_ACTIONS,
  type NativeControlRequest,
} from "../src/workbench/control.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type NativeRef, ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDeps, type ReconcileRequest } from "../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow } from "../src/workflow/runtime.js";
import { fullShapeRf, type Json } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on (providers/reactivefiber.ts registerReactiveFiberRender). */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const ROSTER_PATH = join(HERE, "fixtures", "ri-inference-execution-roster.json");
const INDEX_SOURCE = join(SRC, "index.ts");

const BEAD = "wb-tz4r.7";
const RI_PIN = "485f3615db1e";
const RI_PROBE = "9454d8ce1504";
const RC_PIN = "640a3b579a95";
const RF_VERSION = "0.1.836";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_VERSION = "1.0.0";
const PREVIEW_PERMISSION = "reactivefiber:render";
const PREVIEW_INPUT = { model: "census-model", task: "census-task" };
/** The root every reading names; an absolute path no filesystem read ever touches. */
const ROOT = "/fixture/ri-inference-execution";
const AT = "2026-10-23T12:00:00Z";
const LATER = "2026-10-23T12:00:05Z";
const SCOPE: ObservationScope = { workspace: ROOT, principal: "census-operator" };
const PRINCIPAL = { id: SCOPE.principal, role: "census-operator" };
/** A furnace run and its attempt: the session's other producer, observed beside the preview. */
const RUN: NativeRef = { provider: "furnace", type: "run", id: "frn-run-census7", scope: ROOT };
const ATTEMPT: NativeRef = { provider: "furnace", type: "attempt", id: "frn-atm-census7", scope: ROOT };
const OWNERSHIP_REF = "frn-req-census7-attempts";

/** The three src modules that read an inference result's content. */
const READERS: readonly string[] = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts", "src/workbench/native-evidence.ts"];
/** Pi's effect/action authority, by name: every one is a src export (A1 resolves each), and a reader may neither call nor reference one. */
const AUTHORITY_CALLS: readonly string[] = [
  "decideControl", "isCoreMintedDecision", "acknowledge", "settle", "decideExecute", "decideReconcile", "mintEvidenceReceipt",
  "executeClaudeControl", "executeFurnaceControl", "executeForgeControl", "executeDetachedControl", "settleClaudeInterrupt",
  "settleForgeControl", "createCuratedTools", "createWorkflowControlTool", "createWorkflowExecuteTool", "createWorkflowReconcileTool",
  "createRetainedForgeControlExecutor", "createClaudeWorkflowHost", "runWorkflow",
];
/** The two words of rf's generative inference leaf, kept apart so this file never spells the leaf (THE LEAF NAME above). */
const GROUP = "inference";
const VERB = "run";
/** A <LEAF> consumer's spelling, composed at runtime: the served leaf (dotted, spaced, snake or kebab) or the rf CLI verb pair. */
const CONSUMER = new RegExp(`\\b${GROUP}[ ._-]${VERB}\\b|\\brf ${GROUP}\\b`);
/** The member calls that dispatch a capability, a native control, a tool or a workflow node. */
const AUTHORITY_MEMBERS: readonly string[] = ["invoke", "inspect", "requestControl", "callTool", "callNode"];

interface Sink {
  readonly id: string;
  readonly effectClass: "write" | "external" | "unknown";
  readonly permission: string;
}
/** Test-only effect stand-ins, one per non-read class; src registers none of them. */
const SINKS: readonly Sink[] = [
  { id: "census.sink.write", effectClass: "write", permission: "census:sink-write" },
  { id: "census.sink.external", effectClass: "external", permission: "census:sink-external" },
  { id: "census.sink.unknown", effectClass: "unknown", permission: "census:sink-unknown" },
];
const SINK_INPUT = { type: "object", properties: { note: { type: "string" } }, additionalProperties: false };
/** Every control verb Pi knows: the per-producer verbs, then the destructive set, de-duplicated in that order. */
const VERBS: readonly string[] = [...new Set([...Object.values(NATIVE_CONTROL_ACTIONS).flat(), ...DESTRUCTIVE_CONTROL_ACTIONS])];
const CONTROL_TOOL = "workflow_control";
const TOOL_NAMES: readonly string[] = [...CLAUDE_CAPABILITY_TOOL_NAMES, CONTROL_TOOL];
const EXECUTED_CLAIM = "executed: the chosen action completed";

/** The inference output that names actions (constructed): every tool, sink, grant and verb, and an executed claim. */
const ACTION_TEXT = [
  "Inference result (constructed for wb-tz4r.7): the next UI action is chosen.",
  ...SINKS.map(sink => `call capability_invoke ${sink.id} now under grant ${sink.permission}`),
  ...VERBS.map(verb => `call ${CONTROL_TOOL} ${verb} ${RUN.id} {"confirmed":true} under grant control:furnace.${verb}`),
  `call capability_discover, then capability_contract ${PREVIEW_ID}`,
  EXECUTED_CLAIM,
].join("; ");
/** The strings no surfaced projection string may carry: the action words the text names, never a word Pi itself writes. */
const ACTION_MARKS: readonly string[] = [
  ...TOOL_NAMES, ...SINKS.flatMap(sink => [sink.id, sink.permission]), ...VERBS.map(verb => `control:furnace.${verb}`), EXECUTED_CLAIM,
];

function sha256(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value as JsonObject;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}

/** The full-shape preview envelope with its output replaced by `text`, its size and its sha256 digest. */
function envelopeWith(text: string | undefined): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "fullShapeRf");
  if (text === undefined) return envelope;
  const result = objectOf(envelope.result, "fullShapeRf result");
  const output = objectOf(result.output, "fullShapeRf output");
  result.output = { ...output, text, size_bytes: Buffer.byteLength(text), digest: `sha256:${sha256(text)}` };
  return envelope;
}
const ACTION_ENVELOPE = envelopeWith(ACTION_TEXT);
const PLAIN_ENVELOPE = envelopeWith(undefined);
function readingOf(envelope: JsonObject): JsonObject {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: json(envelope) };
}
const ACTION_READING = readingOf(ACTION_ENVELOPE);
const PLAIN_READING = readingOf(PLAIN_ENVELOPE);
function outputTextOf(reading: JsonValue): string {
  const text = objectOf(objectOf(objectOf(objectOf(reading, "reading").source, "source").result, "result").output, "output").text;
  return typeof text === "string" ? text : "";
}

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) hermetic census: no Pi effect/action execution path takes an inference result (reactivefiber.render.preview output or any inference output) as its trigger or authorization (mirrors wb-021.5)",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) fixture: re-projecting an inference result issues no capability_invoke, no decideControl permit and no tool call",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) mutant: an adapter that invokes an action because an inference result names one fails",
    pins: ["C1", "C2", "C3", "C4", "C5"],
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
interface Roster {
  readonly bead: string;
  readonly riPin: string;
  readonly riProbe: string;
  readonly rcPin: string;
  readonly rfVersion: string;
  readonly actionTextSha256: string;
  readonly readers: readonly string[];
  readonly authorityCalls: readonly string[];
  readonly authorityMembers: readonly string[];
  readonly sinks: readonly Sink[];
  readonly verbs: readonly string[];
  readonly toolNames: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.sinks)) throw new Error("roster must be an object with rows and sinks");
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
  const sinks = raw.sinks.map((sink: unknown, index: number): Sink => {
    if (!isObject(sink) || typeof sink.id !== "string" || typeof sink.permission !== "string" ||
      (sink.effectClass !== "write" && sink.effectClass !== "external" && sink.effectClass !== "unknown")) {
      throw new Error(`roster sinks[${index}] needs an id, a non-read effect class and a permission`);
    }
    return { id: sink.id, effectClass: sink.effectClass, permission: sink.permission };
  });
  for (const field of ["bead", "riPin", "riProbe", "rcPin", "rfVersion", "actionTextSha256"]) {
    if (typeof raw[field] !== "string") throw new Error(`roster ${field} must be a string`);
  }
  return {
    bead: String(raw.bead), riPin: String(raw.riPin), riProbe: String(raw.riProbe), rcPin: String(raw.rcPin), rfVersion: String(raw.rfVersion),
    actionTextSha256: String(raw.actionTextSha256), readers: strings(raw.readers, "readers"), authorityCalls: strings(raw.authorityCalls, "authorityCalls"),
    authorityMembers: strings(raw.authorityMembers, "authorityMembers"), sinks, verbs: strings(raw.verbs, "verbs"), toolNames: strings(raw.toolNames, "toolNames"),
    rows, tests: strings(raw.tests, "tests"),
  };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Row A1's scanner: the TypeScript AST of one module - its value imports, and every authority reference or member call.
 * ------------------------------------------------------------------------------------------------------------------------- */

function repoPath(path: string): string {
  return relative(REPO, path).split("\\").join("/");
}
function textOf(path: string): string {
  return readFileSync(path, "utf8");
}
/** Every regular .ts file below a root, sorted (symlinks are not followed). */
function tsFilesBelow(directory: string): string[] {
  const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...tsFilesBelow(path));
    else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
  }
  return files;
}
interface ValueImport {
  readonly from: string;
  readonly names: readonly string[];
}
interface ModuleScan {
  readonly valueImports: readonly ValueImport[];
  readonly typeImports: readonly string[];
  /** `name@line` for an authority reference, `.member@line` for an authority member call. */
  readonly authority: readonly string[];
}
function scanModule(name: string, text: string): ModuleScan {
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  const valueImports: ValueImport[] = [];
  const typeImports: string[] = [];
  const authority: string[] = [];
  const line = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const from = node.moduleSpecifier.text;
      const clause = node.importClause;
      if (clause === undefined) valueImports.push({ from, names: [] });
      else if (clause.isTypeOnly) typeImports.push(from);
      else {
        const names: string[] = [];
        if (clause.name !== undefined) names.push(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(`* as ${bindings.name.text}`);
        if (bindings !== undefined && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) if (!element.isTypeOnly) names.push((element.propertyName ?? element.name).text);
        }
        if (names.length > 0) valueImports.push({ from, names: names.sort() });
        else typeImports.push(from);
      }
      return;
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const [specifier] = node.arguments;
      valueImports.push({ from: specifier !== undefined && ts.isStringLiteral(specifier) ? specifier.text : "<computed>", names: ["import()"] });
    }
    if (ts.isIdentifier(node) && AUTHORITY_CALLS.includes(node.text)) {
      const parent = node.parent;
      // A property NAME (x.settle, { settle: ... }) is not a reference to the authority binding; a bare identifier is.
      const isMemberName = (ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isPropertyAssignment(parent) && parent.name === node);
      if (!isMemberName) authority.push(`${node.text}@${line(node)}`);
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && AUTHORITY_MEMBERS.includes(node.expression.name.text)) {
      authority.push(`.${node.expression.name.text}@${line(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { valueImports, typeImports, authority };
}
/** A relative specifier resolved to the src .ts module it names (the emitted `.js` spelling maps to the `.ts` source). */
function resolveSpecifier(fromModule: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return resolve(dirname(fromModule), specifier.replace(/\.js$/, ".ts"));
}
/** The src value-import closure of a module set, followed through relative specifiers only; packages are recorded by name. */
function closureOf(roots: readonly string[]): { modules: string[]; packages: string[]; scans: Map<string, ModuleScan> } {
  const scans = new Map<string, ModuleScan>();
  const packages = new Set<string>();
  const queue = roots.map(root => join(REPO, root));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || scans.has(path)) continue;
    const scanned = scanModule(path, textOf(path));
    scans.set(path, scanned);
    for (const entry of scanned.valueImports) {
      const target = resolveSpecifier(path, entry.from);
      if (target === undefined) packages.add(entry.from);
      else queue.push(target);
    }
  }
  return { modules: [...scans.keys()].map(repoPath).sort(), packages: [...packages].sort(), scans };
}
/** Whether a src module exports a binding of this name (a declaration with the export modifier, or a named export list). */
function exportsName(text: string, name: string): boolean {
  const source = ts.createSourceFile("export-probe.ts", text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  return source.statements.some(statement => {
    const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined;
    const exported = modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
    if (exported && (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement))) return statement.name?.text === name;
    if (exported && ts.isVariableStatement(statement)) return statement.declarationList.declarations.some(d => ts.isIdentifier(d.name) && d.name.text === name);
    if (ts.isExportDeclaration(statement) && statement.exportClause !== undefined && ts.isNamedExports(statement.exportClause)) {
      return statement.exportClause.elements.some(element => element.name.text === name);
    }
    return false;
  });
}
/** The own property names of the object literal initializing `const <name>` anywhere in a module. */
function objectKeysOf(text: string, name: string): string[] {
  const source = ts.createSourceFile("object-probe.ts", text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  const keys: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && node.initializer !== undefined && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        const key = property.name;
        if (key !== undefined && (ts.isIdentifier(key) || ts.isStringLiteral(key))) keys.push(key.text);
        else keys.push("<computed>");
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return keys;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The session: the registry (the injected preview beside the sinks), the curated tool server, the projection, the decision core.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Counts {
  preview: number;
  sinks: { [id: string]: number };
}
function sinkCalls(counts: Counts): number {
  return Object.values(counts.sinks).reduce((sum, calls) => sum + calls, 0);
}
function sinkProvider(sink: Sink, counts: Counts): CapabilityProvider {
  return {
    descriptor: {
      id: sink.id, version: "1.0.0", description: `census stand-in effect (${sink.effectClass}; test-only)`, inputSchema: SINK_INPUT,
      effectClass: sink.effectClass, permissions: [sink.permission], supportedModes: ["invoke"],
    },
    async invoke() {
      counts.sinks[sink.id] = (counts.sinks[sink.id] ?? 0) + 1;
      return { accepted: true };
    },
  };
}
function sessionRegistry(envelope: JsonObject): { registry: CapabilityRegistry; counts: Counts } {
  const counts: Counts = { preview: 0, sinks: Object.fromEntries(SINKS.map(sink => [sink.id, 0])) };
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    counts.preview += 1;
    return json(envelope) as unknown as InjectedEnvelope;
  }, ROOT);
  for (const sink of SINKS) registry.register(sinkProvider(sink, counts));
  return { registry, counts };
}
/** Every grant any surface needs to run the preview and every sink: the host's full authority in this session. */
const HOST_GRANTS: readonly string[] = [
  PREVIEW_PERMISSION, `discover:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`,
  ...SINKS.flatMap(sink => [sink.permission, `discover:${sink.id}`, `invoke:${sink.id}`]),
];
/** Every grant a preview read carries: its permission and each discover/inspect/observe/invoke grant over it. */
const READ_GRANTS: readonly string[] = [PREVIEW_PERMISSION, `discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `observe:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`];
function contextOf(grants: readonly string[]): InvocationContext {
  return { grants: [...grants], signal: new AbortController().signal };
}

interface ToolCall {
  readonly isError: boolean;
  readonly payload: JsonValue;
}
interface Tools {
  readonly dispatched: () => number;
  call(name: string, args: Record<string, unknown>): Promise<ToolCall>;
}
const cleanups: Array<() => Promise<void>> = [];
afterEach(async () => {
  for (const close of cleanups.splice(0)) await close();
});
/** The real curated tool server over the session registry, behind a real MCP client; the host pin hook counts dispatches. */
async function connectTools(registry: CapabilityRegistry, grants: readonly string[]): Promise<Tools> {
  let dispatched = 0;
  const server = createCuratedTools({
    registry, allowedCapabilities: [PREVIEW_ID, ...SINKS.map(sink => sink.id)], grants: [...grants], principal: PRINCIPAL, workspace: ROOT,
    invocationId: "census-tz4r7", signal: new AbortController().signal, beforeDispatch: () => {
      dispatched += 1;
    },
  });
  const client = new Client({ name: "ri-inference-execution-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  cleanups.push(async () => {
    await client.close();
    await server.instance.close();
  });
  return {
    dispatched: () => dispatched,
    async call(name, args) {
      const result = await client.callTool({ name, arguments: args });
      const content = result.content as Array<{ type: string; text: string }>;
      const [first] = content;
      if (first === undefined) throw new Error(`${name} answered no content`);
      return { isError: result.isError === true, payload: JSON.parse(first.text) as JsonValue };
    },
  };
}

function snapshotOf(source: NativeRef): Parameters<ObservationProjection["refresh"]>[0] {
  return {
    source, scope: SCOPE, capturedAt: AT, observedAt: AT, kind: `${source.provider}.${source.type}.snapshot`,
    node: { title: `${source.provider} ${source.type} ${source.id}`, type: "sdk-operation", statusText: "active", statusTone: "active" },
  };
}
/** The session projection: the furnace run and its attempt, and, when `owned`, furnace's own ownership statement between them. */
function sessionProjection(owned: boolean): ObservationProjection {
  const projection = new ObservationProjection();
  for (const source of [RUN, ATTEMPT]) projection.refresh(snapshotOf(source));
  if (owned) projection.relate({ scope: SCOPE, from: RUN, to: ATTEMPT, kind: "ownership", provenance: { source: "furnace", observedAt: AT, nativeConfirmationRef: OWNERSHIP_REF } });
  return projection;
}
function contextFor(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return { scope: SCOPE, seam, capturedAt: AT, observedAt: AT, operationRef: RUN };
}
/** One explicit control request for a target and verb: its exact grant, the operator's confirmation, host-bound scope. */
function controlRequest(target: NativeRef, verb: string): NativeControlRequest {
  return {
    scope: { ...SCOPE }, principal: { ...PRINCIPAL }, grants: [`control:${target.provider}.${verb}`], target: { ...target }, action: verb,
    params: { confirmed: true }, invocationId: "census-control-7", requestedAt: AT,
  };
}
function decided(decision: ControlDecision): string {
  return decision.decision === "permitted" ? "permitted" : decision.policy;
}
/** Every (observed node, verb) request decided by the real core, sorted: what an operator could be permitted in this projection. */
function sweep(projection: ObservationProjection): string[] {
  return projection.query({ scope: SCOPE, limit: 64 }).nodes
    .flatMap(node => VERBS.map(verb => `${node.nativeRef.provider}/${node.nativeRef.type} ${verb}: ${decided(decideControl(controlRequest(node.nativeRef, verb), { projection, now: () => LATER }))}`))
    .sort();
}
function permitted(lines: readonly string[]): number {
  return lines.filter(line => line.endsWith(": permitted")).length;
}

/** Pi's reader composition over one held inference result: the metadata projection, then the adapter applied to the session. */
function reproject(reading: JsonValue, projection: ObservationProjection, seam: ReactiveFiberSeam = "injected-fixture") {
  const evidence = nativeEvidence(PREVIEW_ID, reading);
  const topology = reactivefiberTopology(reading, contextFor(seam));
  const applied = topology.snapshots.map(snapshot => projection.refresh(snapshot));
  for (const relation of topology.relations) projection.relate(relation);
  return { evidence, topology, applied };
}

/** What an adapter may reach in the session: the registry and its counts, the tool server, the counting decision seam. */
interface Env {
  readonly registry: CapabilityRegistry;
  readonly counts: Counts;
  readonly tools: Tools;
  decide(request: NativeControlRequest): ControlDecision;
  readonly permits: () => number;
}
/** An adapter handed one held inference result: it applies what it projects and answers the notes it surfaced. */
type Adapter = (reading: JsonValue, projection: ObservationProjection, env: Env) => Promise<readonly string[]>;
const PI_READER: Adapter = async (reading, projection) => reproject(reading, projection).topology.diagnostics;

interface Observation {
  readonly applied: number;
  readonly providerCalls: { readonly preview: number; readonly sinks: number };
  readonly toolCalls: number;
  readonly permits: number;
  readonly sweepBefore: readonly string[];
  readonly sweepAfter: readonly string[];
  readonly othersChanged: boolean;
  readonly stable: boolean;
  readonly surfaced: readonly string[];
}
/** The projection's read: every node and relation, or, given a provider, only its nodes and the relations among them. */
function readOf(projection: ObservationProjection, provider?: string): string {
  const nodes = projection.query({ scope: SCOPE, limit: 64 }).nodes.filter(node => provider === undefined || node.nativeRef.provider === provider);
  const keys = new Set(nodes.map(node => node.key));
  const relations = projection.relations({ scope: SCOPE, limit: 64 }).filter(relation => provider === undefined || (keys.has(relation.from) && keys.has(relation.to)));
  return JSON.stringify({ nodes, relations });
}
/** The strings the preview node surfaces in the projection, beside the notes the adapter answered. */
function surfacedStrings(projection: ObservationProjection, notes: readonly string[]): string[] {
  const nodes = projection.query({ scope: SCOPE, limit: 64 }).nodes.filter(node => node.nativeRef.provider === "reactivefiber");
  return [...nodes.flatMap(node => [node.presentation.title, node.presentation.statusText, node.kind, ...node.evidenceRefs, node.payloadRef ?? ""]), ...notes];
}
/** Runs an adapter `passes` times over one held reading in a live session, measuring everything it could have set off. */
async function observe(adapter: Adapter, options: { passes?: number; reading?: JsonValue } = {}): Promise<Observation> {
  const passes = options.passes ?? 3;
  const reading = options.reading ?? ACTION_READING;
  const { registry, counts } = sessionRegistry(ACTION_ENVELOPE);
  const tools = await connectTools(registry, HOST_GRANTS);
  const projection = sessionProjection(true);
  let permits = 0;
  const env: Env = {
    registry, counts, tools, permits: () => permits,
    decide(request) {
      const decision = decideControl(request, { projection, now: () => LATER });
      if (isCoreMintedDecision(decision)) permits += 1;
      return decision;
    },
  };
  const sweepBefore = sweep(projection);
  const othersBefore = readOf(projection, "furnace");
  const reads: string[] = [];
  const notes: string[] = [];
  for (let pass = 0; pass < passes; pass += 1) {
    notes.push(...(await adapter(json(reading), projection, env)));
    reads.push(readOf(projection));
  }
  const surfaced = surfacedStrings(projection, notes);
  return {
    applied: passes, providerCalls: { preview: counts.preview, sinks: sinkCalls(counts) }, toolCalls: tools.dispatched(), permits,
    sweepBefore, sweepAfter: sweep(projection), othersChanged: readOf(projection, "furnace") !== othersBefore, stable: new Set(reads).size === 1,
    surfaced: ACTION_MARKS.filter(mark => surfaced.some(text => text.includes(mark))),
  };
}
/** The checker B1 asserts empty: what a re-projection of an inference result set off, by kind. */
function violationsOf(observation: Observation): string[] {
  const violations: string[] = [];
  if (observation.providerCalls.preview + observation.providerCalls.sinks > 0) violations.push("invoke");
  if (observation.toolCalls > 0) violations.push("tool-call");
  if (observation.permits > 0 || permitted(observation.sweepAfter) > permitted(observation.sweepBefore)) violations.push("permit");
  if (observation.othersChanged) violations.push("executed");
  if (observation.surfaced.length > 0) violations.push("surfaced");
  if (!observation.stable) violations.push("unstable");
  return violations;
}

/** The furnace position a resume refuses on: a journaled external effect, with the run it recorded. */
const FURNACE_ROW: WorkflowJournalEntry = {
  index: 0, key: "k0", ok: true, kind: "node", capabilityId: "furnace.run.start", effectClass: "external", basis: "b1",
  nativeRefs: [{ provider: "furnace", type: "run", id: RUN.id }],
};
const TASK_ID = "wf_census7";
function reconcileRequest(action: ReconcileRequest["action"], params: unknown): ReconcileRequest {
  return {
    action, taskId: TASK_ID, position: 0, grants: ["workbench:observe", "reconcile:furnace.acknowledge"], scope: { ...SCOPE }, sessionId: "census-session",
    principal: { ...PRINCIPAL }, params,
  };
}
function reconcileDeps(receipts: ReconcileDeps["receipts"]): ReconcileDeps {
  return {
    task: { status: "failed", observationScope: { sessionId: "census-session", workspace: SCOPE.workspace, principal: SCOPE.principal } },
    entries: [FURNACE_ROW], receipts,
    currentEffectClass: capabilityId => (capabilityId === "furnace.run.inspect" || capabilityId === PREVIEW_ID ? "read" : "external"),
    now: () => LATER,
  };
}
function reconcileVerdict(request: ReconcileRequest, deps: ReconcileDeps): string {
  const decision = decideReconcile(request, deps);
  return decision.decision === "denied" ? decision.policy : decision.decision;
}

const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census scripts call node only: the Claude query is never invoked");
};
const HEAD = 'export const meta = { name: "ri-inference-execution", description: "wb-tz4r.7 census probe" };\n';
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]) {
  return createClaudeWorkflowHost({ cwd: process.cwd(), query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
function categoryOf(error: unknown): string {
  return error instanceof CapabilityError ? error.category : `not a CapabilityError: ${String(error)}`;
}
function descriptorFacts(descriptor: CapabilityDescriptor | undefined): JsonValue {
  if (descriptor === undefined) return null;
  return { effectClass: descriptor.effectClass, permissions: [...descriptor.permissions], supportedModes: [...descriptor.supportedModes] };
}
/** Every dotted leaf path at which two JSON values differ; a key one side lacks is a path. */
function diffPaths(left: unknown, right: unknown, path: readonly string[] = []): string[] {
  if (isObject(left) && isObject(right)) {
    return [...new Set([...Object.keys(left), ...Object.keys(right)])].sort().flatMap(key => diffPaths(left[key], right[key], [...path, key]));
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return Array.from({ length: Math.max(left.length, right.length) }, (_unused, index) => diffPaths(left[index], right[index], [...path, String(index)])).flat();
  }
  return JSON.stringify(left) === JSON.stringify(right) ? [] : [path.join(".")];
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The cases: one function per pin, each answering the witness the roster holds.
 * ------------------------------------------------------------------------------------------------------------------------- */

const IMPL: Record<string, () => Promise<JsonValue>> = {
  A1: async () => {
    const closure = closureOf(READERS);
    const readerHits = READERS.flatMap(reader => closure.scans.get(join(REPO, reader))?.authority.map(hit => `${reader}: ${hit}`) ?? [`${reader}: not scanned`]);
    // Outside the readers the closure reaches the registry module for CapabilityError alone: its own dispatch stays reachable only
    // through a CapabilityRegistry instance, which no closure module imports as a value.
    const elsewhere = Object.fromEntries([...closure.scans].filter(([path, scanned]) => !READERS.includes(repoPath(path)) && scanned.authority.length > 0)
      .map(([path, scanned]) => [repoPath(path), scanned.authority.map(hit => hit.slice(0, hit.indexOf("@")))]));
    const imported = [...new Set([...closure.scans].flatMap(([path, scanned]) => scanned.valueImports.flatMap(entry => {
      const target = resolveSpecifier(path, entry.from);
      return entry.names.map(name => `${target === undefined ? entry.from : repoPath(target)}:${name}`);
    })))].sort();
    const importedAuthority = imported.filter(entry => [...AUTHORITY_CALLS, "CapabilityRegistry"].includes(entry.slice(entry.lastIndexOf(":") + 1)));
    const srcFiles = tsFilesBelow(SRC);
    const texts = new Map(srcFiles.map(path => [path, textOf(path)]));
    // Every authority name is a real src export, so the vocabulary cannot drift from the code it names.
    const unresolved = AUTHORITY_CALLS.filter(name => ![...texts.values()].some(text => exportsName(text, name)));
    // Every src/ui module (the UI surface an operator acts through) holds no authority entry; the projection readers among them
    // (the modules importing workbench/observation.js) are an exact set.
    const uiScans = srcFiles.filter(path => repoPath(path).startsWith("src/ui/")).map(path => ({ path, scanned: scanModule(path, texts.get(path) ?? "") }));
    const ui = uiScans.filter(({ scanned }) => [...scanned.typeImports, ...scanned.valueImports.map(entry => entry.from)].some(from => from.endsWith("workbench/observation.js")))
      .map(({ path }) => path);
    const uiAuthority = uiScans.flatMap(({ path, scanned }) => scanned.authority.map(hit => `${repoPath(path)}: ${hit}`));
    const consumers = srcFiles.filter(path => CONSUMER.test(texts.get(path) ?? "")).map(repoPath);
    const anchored = srcFiles.filter(path => (texts.get(path) ?? "").includes(`"${PREVIEW_ID}"`)).map(repoPath);
    const control = (code: string): number => scanModule("control.ts", code).authority.length;
    const controls = {
      direct: control("await registry.invoke(id, input, context);"),
      alias: control("const run = decideControl;\nrun(request, deps);"),
      member: control("tools.callTool({ name });"),
      composed: control('const verb = "inv" + "oke";\nawait registry[verb](id, input, context);'),
      propertyName: control("const handlers = { settle: 1 };\nhandlers.settle;"),
      // The consumer census flags the served leaf and its CLI spelling; TypeScript's own type-inference prose stays quiet.
      consumerLeaf: Number(CONSUMER.test(`const leaf = "${[GROUP, VERB].join(".")}";`)),
      consumerCli: Number(CONSUMER.test(`spawn("rf", ["${GROUP}", "${VERB}"]); // rf ${GROUP} ${VERB} --json`)),
      consumerProse: Number(CONSUMER.test("which erases TypeBox's literal inference to `unknown`")),
      // The vocabulary resolver reads an export, never a local declaration of the same name.
      exported: Number(exportsName("export function decideControl() {}", "decideControl")),
      local: Number(exportsName("function decideControl() {}", "decideControl")),
    };
    expect(srcFiles.length, "src .ts files walked").toBeGreaterThanOrEqual(100);
    expect(readerHits, "authority entries inside the three reader modules").toEqual([]);
    expect(importedAuthority, "authority bindings (or the registry class) imported as a value by the reader closure").toEqual([]);
    expect(unresolved, "authority names that are no src export").toEqual([]);
    expect(uiScans.length, "src/ui modules walked").toBeGreaterThanOrEqual(10);
    expect(uiAuthority, "authority entries in src/ui").toEqual([]);
    expect(consumers, "src files spelling a <LEAF> consumer").toEqual([]);
    expect(controls).toStrictEqual({ direct: 1, alias: 1, member: 1, composed: 0, propertyName: 0, consumerLeaf: 1, consumerCli: 1, consumerProse: 0, exported: 1, local: 0 });
    return { closure: closure.modules, packages: closure.packages, imported, elsewhere, ui: ui.map(repoPath), consumers, anchored, controls };
  },
  A2: async () => {
    const executors = objectKeysOf(textOf(INDEX_SOURCE), "controlExecutors");
    const producers = Object.keys(NATIVE_CONTROL_ACTIONS);
    const projection = sessionProjection(true);
    const { topology } = reproject(ACTION_READING, projection);
    const [snapshot] = topology.snapshots;
    if (snapshot === undefined) throw new Error("the adapter projected no snapshot");
    const preview = snapshot.source;
    const verdicts = VERBS.map(verb => `${verb}: ${decided(decideControl(controlRequest(preview, verb), { projection, now: () => LATER }))}`);
    expect([...executors].sort()).toEqual([...producers].sort());
    expect(producers.includes(preview.provider)).toBe(false);
    expect(verdicts).toEqual(VERBS.map(verb => `${verb}: unknown-action`));
    return { producers, executors, preview: { provider: preview.provider, type: preview.type }, verdicts };
  },
  A3: async () => {
    const grouped = sessionProjection(false);
    const { topology } = reproject(ACTION_READING, grouped);
    const relationKinds = topology.relations.map(relation => relation.kind);
    // The edge's provenance carries no native confirmation reference: nothing in it can confirm a lifecycle owner.
    const relationProvenance = topology.relations.map(relation => json(relation.provenance));
    const fromRun = topology.relations.every(relation => relation.from.provider === RUN.provider && relation.from.id === RUN.id);
    const stop = controlRequest(RUN, "stop");
    const withoutOwnership = decided(decideControl(stop, { projection: grouped, now: () => LATER }));
    const owned = sessionProjection(true);
    const ownedPermit = decideControl(stop, { projection: owned, now: () => LATER });
    const withPreview = sessionProjection(true);
    reproject(ACTION_READING, withPreview);
    const previewPermit = decideControl(stop, { projection: withPreview, now: () => LATER });
    const sameReceipt = ownedPermit.decision === "permitted" && previewPermit.decision === "permitted" &&
      JSON.stringify(ownedPermit.receipt) === JSON.stringify(previewPermit.receipt);
    expect(relationKinds).toEqual(["grouping"]);
    expect(withoutOwnership).toBe("no-confirmed-ownership");
    expect([decided(ownedPermit), decided(previewPermit), sameReceipt]).toEqual(["permitted", "permitted", true]);
    return { relationKinds, relationProvenance, fromRun, withoutOwnership, withOwnership: decided(ownedPermit), withOwnershipAndPreview: decided(previewPermit), sameReceipt };
  },
  A4: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, async () => json(PLAIN_ENVELOPE) as unknown as InjectedEnvelope, ROOT);
    const native = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(native, ROOT);
    const previewOf = (registry: CapabilityRegistry) => registry.catalogSnapshot().find(entry => entry.descriptor.id === PREVIEW_ID)?.descriptor;
    const descriptors = { injected: descriptorFacts(previewOf(injected)), native: descriptorFacts(previewOf(native)) };
    const refusals: { [id: string]: string[] } = {};
    const granted: { [id: string]: number } = {};
    for (const sink of SINKS) {
      const { registry, counts } = sessionRegistry(ACTION_ENVELOPE);
      await registry.invoke(PREVIEW_ID, PREVIEW_INPUT, contextOf(READ_GRANTS));
      refusals[sink.id] = [];
      for (const grant of READ_GRANTS) {
        refusals[sink.id]?.push(await registry.invoke(sink.id, {}, contextOf([grant])).then(() => "returned", categoryOf));
      }
      refusals[sink.id]?.push(await registry.invoke(sink.id, {}, contextOf(READ_GRANTS)).then(() => "returned", categoryOf));
      const refusedCalls = counts.sinks[sink.id] ?? -1;
      await registry.invoke(sink.id, {}, contextOf([sink.permission]));
      granted[sink.id] = (counts.sinks[sink.id] ?? -1) - refusedCalls;
      expect(refusedCalls, `${sink.id} calls under the read grants`).toBe(0);
    }
    const [sink] = SINKS;
    if (sink === undefined) throw new Error("no sink");
    const script = `${HEAD}const reading = await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(PREVIEW_INPUT)});\n` +
      `return await node(${JSON.stringify(sink.id)}, { note: reading.source.result.output.text });`;
    const readOnly = sessionRegistry(ACTION_ENVELOPE);
    const refusedRun = await runWorkflow({ script, host: claudeHost(readOnly.registry, READ_GRANTS) });
    const grantedSession = sessionRegistry(ACTION_ENVELOPE);
    const grantedRun = await runWorkflow({ script, host: claudeHost(grantedSession.registry, [...READ_GRANTS, sink.permission]) });
    const scriptRefused = { status: refusedRun.status, category: refusedRun.capabilityError?.category ?? null, preview: readOnly.counts.preview, sink: sinkCalls(readOnly.counts) };
    const scriptGranted = { status: grantedRun.status, preview: grantedSession.counts.preview, sink: sinkCalls(grantedSession.counts) };
    expect(scriptRefused).toStrictEqual({ status: "failed", category: "authorization", preview: 1, sink: 0 });
    expect(scriptGranted).toStrictEqual({ status: "completed", preview: 1, sink: 1 });
    return { descriptors, refusals, granted, scriptRefused, scriptGranted };
  },
  A5: async () => {
    const listing = Object.entries(RECONCILE_EVIDENCE_READS).filter(([, reads]) => reads.includes(PREVIEW_ID)).map(([producer]) => producer);
    const previewRead = reconcileVerdict(reconcileRequest("evidence", { evidence: { capabilityId: PREVIEW_ID, input: PREVIEW_INPUT } }), reconcileDeps([]));
    const furnaceRead = reconcileVerdict(reconcileRequest("evidence", { evidence: { capabilityId: "furnace.run.inspect", input: { runId: RUN.id } } }), reconcileDeps([]));
    const recorded = FURNACE_ROW.nativeRefs ?? [];
    const rfReceipt = mintEvidenceReceipt({
      taskId: TASK_ID, position: 0, producer: "reactivefiber", capabilityId: PREVIEW_ID, input: PREVIEW_INPUT, requestedAt: AT, observedAt: AT,
      result: ACTION_READING, recordedNativeRefs: recorded,
    });
    const furnaceReceipt = mintEvidenceReceipt({
      taskId: TASK_ID, position: 0, producer: "furnace", capabilityId: "furnace.run.inspect", input: { runId: RUN.id }, requestedAt: AT, observedAt: AT,
      result: { contract: "furnace.run.inspect/v1", source: { kind: "run_inspect", data: { run_id: RUN.id, state: "active" } } }, recordedNativeRefs: recorded,
    });
    const confirm = (receiptId: string) => reconcileRequest("acknowledge", { reason: "census probe: the effect is said to have executed", determination: "effect-confirmed", receiptIds: [receiptId] });
    const rfConfirms = reconcileVerdict(confirm(rfReceipt.receiptId), reconcileDeps([rfReceipt]));
    const furnaceConfirms = reconcileVerdict(confirm(furnaceReceipt.receiptId), reconcileDeps([furnaceReceipt]));
    expect(listing).toEqual(["reactivefiber"]);
    expect([previewRead, furnaceRead]).toEqual(["malformed-request", "evidence"]);
    expect([rfConfirms, furnaceConfirms]).toEqual(["evidence-producer-mismatch", "acknowledge"]);
    return {
      listing, previewRead, furnaceRead,
      rfReceipt: { producer: rfReceipt.producer, binding: rfReceipt.binding, domainStatus: rfReceipt.domainStatus ?? null, evidenceRefs: [...rfReceipt.evidenceRefs] },
      rfConfirms, furnaceConfirms,
    };
  },
  B1: async () => {
    const observation = await observe(PI_READER);
    const violations = violationsOf(observation);
    expect(violations).toEqual([]);
    expect(observation.sweepAfter.filter(line => line.startsWith("furnace/"))).toEqual(observation.sweepBefore);
    return { ...observation, violations } as unknown as JsonValue;
  },
  B2: async () => {
    const { registry, counts } = sessionRegistry(ACTION_ENVELOPE);
    const tools = await connectTools(registry, HOST_GRANTS);
    const answer = await tools.call("capability_invoke", { capabilityId: PREVIEW_ID, capabilityVersion: PREVIEW_VERSION, input: PREVIEW_INPUT });
    const payload = objectOf(answer.payload, "capability_invoke payload");
    const value = payload.value ?? null;
    const verbatim = JSON.stringify(value) === JSON.stringify(ACTION_READING);
    const afterCall = { dispatched: tools.dispatched(), preview: counts.preview, sinks: sinkCalls(counts) };
    const projection = sessionProjection(true);
    for (let pass = 0; pass < 3; pass += 1) reproject(value, projection);
    const afterReprojection = { dispatched: tools.dispatched(), preview: counts.preview, sinks: sinkCalls(counts) };
    expect([answer.isError, payload.kind, verbatim]).toEqual([false, "returned", true]);
    expect(afterReprojection).toStrictEqual(afterCall);
    return { kind: payload.kind ?? null, verbatim, textCarried: outputTextOf(value) === ACTION_TEXT, afterCall, afterReprojection };
  },
  B3: async () => {
    const script = `${HEAD}const reading = await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(PREVIEW_INPUT)});\nreturn reading.source.result.output.text;`;
    const first = sessionRegistry(ACTION_ENVELOPE);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({ script, host: claudeHost(first.registry, HOST_GRANTS), journal: { append: entry => {
      entries.push(entry);
    } } });
    const second = sessionRegistry(ACTION_ENVELOPE);
    const resumed = await runWorkflow({ script, host: claudeHost(second.registry, HOST_GRANTS), journal: { entries } });
    const nodeRows = entries.filter(entry => entry.kind === "node").map(entry => ({ capabilityId: entry.capabilityId ?? null, effectClass: entry.effectClass ?? null }));
    const freshness = resumed.progress.flatMap(entry => (isObject(entry) && entry.type === "workflow_node" && entry.state === "done" ? [String(entry.freshness)] : []));
    const run = { status: recorded.status, textReturned: recorded.value === ACTION_TEXT, preview: first.counts.preview, sinks: sinkCalls(first.counts) };
    const resume = { status: resumed.status, textReturned: resumed.value === ACTION_TEXT, replayedNodeCount: resumed.replayedNodeCount, preview: second.counts.preview, sinks: sinkCalls(second.counts), freshness };
    expect(run).toStrictEqual({ status: "completed", textReturned: true, preview: 1, sinks: 0 });
    expect(resume).toStrictEqual({ status: "completed", textReturned: true, replayedNodeCount: 1, preview: 0, sinks: 0, freshness: ["stale"] });
    return { run, nodeRows, resume };
  },
  B4: async () => {
    const seams: ReactiveFiberSeam[] = ["rf-cli", "injected-fixture"];
    const bySeam = seams.map(seam => {
      const action = reproject(ACTION_READING, sessionProjection(true), seam);
      const plain = reproject(PLAIN_READING, sessionProjection(true), seam);
      const [snapshot] = action.topology.snapshots;
      const strings = [snapshot?.node.title ?? "", snapshot?.node.statusText ?? "", snapshot?.kind ?? "", ...(snapshot?.evidenceRefs ?? []), ...action.topology.diagnostics];
      return {
        seam, topologyDiff: diffPaths(json(action.topology), json(plain.topology)), evidenceDiff: diffPaths(json(action.evidence), json(plain.evidence)),
        statusTone: snapshot?.node.statusTone ?? null, marks: ACTION_MARKS.filter(mark => strings.some(text => text.includes(mark))),
      };
    });
    const evidence = nativeEvidence(PREVIEW_ID, ACTION_READING);
    for (const entry of bySeam) {
      expect(entry.topologyDiff).toEqual(["snapshots.0.nativePayloadRef"]);
      expect([entry.evidenceDiff, entry.marks]).toEqual([[], []]);
    }
    expect(evidence.domainStatus).toBeUndefined();
    return { bySeam, evidenceKeys: Object.keys(evidence).sort(), domainStatus: evidence.domainStatus ?? null };
  },
  C1: async () => {
    const invokesNamedSink: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      for (const sink of SINKS) if (outputTextOf(reading).includes(sink.id)) await env.registry.invoke(sink.id, {}, contextOf(HOST_GRANTS));
      return notes;
    };
    const rereadsPreview: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      if (outputTextOf(reading).includes(PREVIEW_ID)) await env.registry.invoke(PREVIEW_ID, PREVIEW_INPUT, contextOf(HOST_GRANTS));
      return notes;
    };
    const invoked = await observe(invokesNamedSink);
    const reread = await observe(rereadsPreview);
    const witness = { invokesNamedSink: violationsOf(invoked), sinkCalls: invoked.providerCalls.sinks, rereadsPreview: violationsOf(reread), previewCalls: reread.providerCalls.preview };
    expect(witness).toStrictEqual({ invokesNamedSink: ["invoke"], sinkCalls: 9, rereadsPreview: ["invoke"], previewCalls: 3 });
    return witness;
  },
  C2: async () => {
    const permitsNamedVerb: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      const text = outputTextOf(reading);
      for (const verb of VERBS) if (text.includes(`${CONTROL_TOOL} ${verb} ${RUN.id}`)) env.decide(controlRequest(RUN, verb));
      return notes;
    };
    const observation = await observe(permitsNamedVerb, { passes: 1 });
    const witness = { violations: violationsOf(observation), permits: observation.permits };
    expect(witness).toStrictEqual({ violations: ["permit"], permits: 1 });
    return witness;
  },
  C3: async () => {
    const callsNamedTool: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      const text = outputTextOf(reading);
      const [sink] = SINKS;
      if (sink !== undefined && text.includes(`capability_invoke ${sink.id}`)) {
        await env.tools.call("capability_invoke", { capabilityId: sink.id, capabilityVersion: "1.0.0", input: {} });
      }
      return notes;
    };
    const observation = await observe(callsNamedTool, { passes: 1 });
    const witness = { violations: violationsOf(observation), toolCalls: observation.toolCalls, sinkCalls: observation.providerCalls.sinks };
    expect(witness).toStrictEqual({ violations: ["invoke", "tool-call"], toolCalls: 1, sinkCalls: 1 });
    return witness;
  },
  C4: async () => {
    const recordsExecuted: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      if (outputTextOf(reading).includes(EXECUTED_CLAIM)) {
        projection.refresh({ ...snapshotOf(RUN), capturedAt: LATER, observedAt: LATER, node: { title: `furnace run ${RUN.id}`, type: "sdk-operation", statusText: "stopped", statusTone: "success" } });
      }
      return notes;
    };
    const notesClaim: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      return outputTextOf(reading).includes(EXECUTED_CLAIM) ? [...notes, EXECUTED_CLAIM] : notes;
    };
    // A re-projection stamped with a moving clock: each pass reads as a new observation, so the reads drift.
    let pass = 0;
    const restamps: Adapter = async (reading, projection) => {
      pass += 1;
      const at = `2026-10-23T12:01:0${pass}Z`;
      const topology = reactivefiberTopology(reading, { ...contextFor("injected-fixture"), capturedAt: at, observedAt: at });
      for (const snapshot of topology.snapshots) projection.refresh(snapshot);
      for (const relation of topology.relations) projection.relate(relation);
      return topology.diagnostics;
    };
    // The claim written into the preview node's own status line: the projection surfaces it, so the reads carry it.
    const statusClaim: Adapter = async (reading, projection) => {
      const topology = reactivefiberTopology(reading, contextFor("injected-fixture"));
      for (const snapshot of topology.snapshots) projection.refresh({ ...snapshot, node: { ...snapshot.node, statusText: `${snapshot.node.statusText} · ${EXECUTED_CLAIM}` } });
      for (const relation of topology.relations) projection.relate(relation);
      return topology.diagnostics;
    };
    const witness = {
      recordsExecuted: violationsOf(await observe(recordsExecuted)), notesClaim: violationsOf(await observe(notesClaim)),
      statusClaim: violationsOf(await observe(statusClaim)), restamps: violationsOf(await observe(restamps)),
    };
    expect(witness).toStrictEqual({ recordsExecuted: ["executed"], notesClaim: ["surfaced"], statusClaim: ["surfaced"], restamps: ["unstable"] });
    return witness;
  },
  C5: async () => {
    const copies: Adapter = async (reading, projection, env) => PI_READER(structuredClone(reading), projection, env);
    const readsOnly: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      return sha256(outputTextOf(reading)).length > 0 ? notes : [];
    };
    // R-DIRECT-DECIDE's pinned quiet row: a permit minted by calling the pure core directly, and dropped, changes nothing the
    // runtime checker reads; A1's scanner is the backstop (a reader module referencing decideControl reds A1).
    let direct = 0;
    const decidesDirectly: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      if (outputTextOf(reading).includes(`${CONTROL_TOOL} stop`)) direct += decideControl(controlRequest(RUN, "stop"), { projection, now: () => LATER }).decision === "permitted" ? 1 : 0;
      return notes;
    };
    const witness = {
      fivePasses: violationsOf(await observe(PI_READER, { passes: 5 })),
      plainReading: violationsOf(await observe(PI_READER, { reading: PLAIN_READING })),
      copies: violationsOf(await observe(copies)),
      readsOnly: violationsOf(await observe(readsOnly)),
      decidesDirectly: violationsOf(await observe(decidesDirectly)),
    };
    expect(direct, "the direct core call minted its permit on every pass").toBe(3);
    expect(Object.values(witness)).toEqual(Object.keys(witness).map(() => []));
    return witness;
  },
};

describe("wb-tz4r.7 RI inference execution census (RI-UNIFIED-DECISION-INFERENCE-R7, standing posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, riPin: RI_PIN, riProbe: RI_PROBE, rcPin: RC_PIN, rfVersion: RF_VERSION, actionTextSha256: sha256(ACTION_TEXT), readers: [...READERS],
      authorityCalls: [...AUTHORITY_CALLS], authorityMembers: [...AUTHORITY_MEMBERS], sinks: SINKS.map(sink => ({ ...sink })), verbs: [...VERBS], toolNames: [...TOOL_NAMES],
    }).toStrictEqual({
      bead: ROSTER.bead, riPin: ROSTER.riPin, riProbe: ROSTER.riProbe, rcPin: ROSTER.rcPin, rfVersion: ROSTER.rfVersion, actionTextSha256: ROSTER.actionTextSha256,
      readers: [...ROSTER.readers], authorityCalls: [...ROSTER.authorityCalls], authorityMembers: [...ROSTER.authorityMembers], sinks: ROSTER.sinks.map(sink => ({ ...sink })),
      verbs: [...ROSTER.verbs], toolNames: [...ROSTER.toolNames],
    });
    // The fixture names every action word it is judged on, and the plain reading names none of them.
    expect(ACTION_MARKS.filter(mark => !ACTION_TEXT.includes(mark))).toEqual([]);
    expect(ACTION_MARKS.filter(mark => outputTextOf(PLAIN_READING).includes(mark))).toEqual([]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
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
  });
});
