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
 *  A, acceptance (a). A1 the reader closure: the src value-import, dynamic-import and re-export closure of the three reader
 *    modules is an exact module set (a type-only import or re-export is a type edge, which the closure does not follow), and
 *    spells and imports no authority entry (AUTHORITY_CALLS by reference, by value import - aliased or not - and as a member of a
 *    namespace binding; AUTHORITY_MEMBERS in any position; either vocabulary as an object pattern's key - of a binding or of a
 *    destructuring assignment, under an identifier, a string or a literal computed key - and through a literal key), the
 *    vocabulary is exactly the functions
 *    the AUTHORITY_MODULES export (derived from src both ways) and every name of it resolves to a src export, no src/ui module
 *    holds an authority entry (a floor on the modules walked; the projection readers among them, the modules importing
 *    workbench/observation.js, are an exact set), no src file spells a <LEAF> consumer by text or as an adjacent argv pair on
 *    the AST (a floor on the files walked, an anchor on the preview id), every src module importing a reader module (by a
 *    type-only import or re-export too) is an exact set read backwards, and the preview contract has exactly one importer (a
 *    type-only re-export counts) and one spelling; the controls read a direct call,
 *    an alias and a member call, an object-destructured member or authority name, a destructuring-assignment member or authority
 *    name (shorthand, aliased, nested, in an array, in an array's rest element at the top level or below it - in a property's
 *    value, an array element or a for-of head - in a loop head, with a default), a string and a
 *    template-literal computed pattern key, a value re-export closure and a type-only re-export closure, the type-only re-export
 *    quiet row, the importer
 *    sets on a type-only re-export, a type-only star re-export and a type-only import of a reader and on a type-only re-export of
 *    the contract, a member called through .call, Reflect.apply, .bind, a non-null or an optional call, a literal
 *    key, a namespace and a dynamic-import namespace, an aliased import, a property name, another receiver's member, an object
 *    literal's key, an object literal assigned and one spread inside an array literal assigned as no reference, the R-COMPOSED
 *    quiet rows, the consumer reader on the served leaf, the CLI pair and Pi's argv form with no comment,
 *    two adjacent call arguments, quiet type-inference prose and R-ARGV-SPLIT's reversed and interrupted pairs, and the resolvers
 *    on an export, a local declaration and an exported constant. A2 control is closed to the inference
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
 *    seam: 0 provider calls, 0 tool calls, 0 permits, the control sweep unchanged for the furnace nodes, byte-identical reads -
 *    every count, the sweep and one more read taken after the SETTLE_MS settle. B2 the tool surface: one capability_invoke of the
 *    preview returns the reading verbatim and dispatches nothing further, and re-projecting the returned value keeps every count,
 *    before and after the settle; its deferred control (a preview whose answer holds the sink invokes it names until the call
 *    has answered, then lands them DEFER_MS later) is counted only after the settle. B3 the workflow host: a script reading the
 *    preview completes with 0 sink calls although every sink is granted, and a resume replays the journaled read stale with 0
 *    provider calls, both counted after the settle, with the same deferred control. A4 reads its sinks after a settle too. B4 the
 *    reading is never read as an executed action: ACTION_READING and PLAIN_READING project identically except the payload
 *    digest (both seams), nativeEvidence is identical and states no domain status, and no surfaced string carries an action mark.
 *  C, acceptance (c). violationsOf, the checker B1 asserts empty, run on adapters that act because the reading names an action:
 *    C1 a sink invoke and a preview re-read through the registry, and the same invokes deferred DEFER_MS past the adapter's
 *    return (G10's shape); C2 a permit from the decision seam, at once and deferred; C3 a capability_invoke through the tool
 *    server, at once and deferred; C4 an executed claim recorded on the furnace run, at once and deferred, a surfaced claim note,
 *    the claim written into the preview node's status line and a re-projection stamped with a moving clock (the reads drift);
 *    C5 the quiet controls (five passes, the plain reading, a copy, a reading that is only hashed), R-DIRECT-DECIDE's quiet row
 *    and R-LATE's.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness and own assertion count, the sinks, the verbs, the tool names, the reader modules, the
 * authority modules, the two authority vocabularies, the settle, the gate probes and the digest of ACTION_TEXT - is held to the
 * out-of-file roster test/fixtures/ri-inference-execution-roster.json; the last case walks this file's vitest task tree against
 * the roster's test list. Beyond both files: every row label is held to its acceptance clause and the frozen shape and each row's
 * pins to the landed delivery note, both in wb-tz4r.7's row of the committed bead store export (.beads/issues.jsonl), and the
 * deferred pins to the probes wb-3rx7's row names; the vocabulary is held to the authority modules' exports in src.
 * RESIDUALS (named, each with a pinned row): R-COMPOSED an authority member reached through a computed name (`x[name](...)`) or a
 *    spelling assembled at runtime is invisible to A1's scanner, an object pattern's computed key among them (A1 controls: composed
 *    and composedBinding read 0); the B and C rows are its runtime
 *    backstop for the reader composition and the two host surfaces. R-EXPLICIT a workflow script or the model that reads an
 *    inference result and then explicitly calls an effect acts under the host's grants, which an inference result never extends
 *    (A4 scriptGranted: the explicit call runs once only when its own grant is held, and is refused under the read grants).
 *    R-DIRECT-DECIDE a permit minted by calling the pure decideControl directly and dropped leaves nothing the runtime checker
 *    reads (C5 decidesDirectly: 3 permits minted, violations empty); A1's scanner is its backstop for the reader modules and
 *    src/ui (a decideControl reference reds A1), and an executor or tool handed such a permit is counted by B1-C4.
 *    R-LATE an effect scheduled past the SETTLE_MS settle (a longer timer, or one chained past it) lands after every runtime
 *    row's re-read (C5 rLate: the same invokes, held until the observation is over, read violations empty at it and land later,
 *    3); A1's scanner is its backstop for the reader modules and src/ui, whatever the delay.
 *    R-ARGV-SPLIT a <LEAF> argv whose two words are not adjacent string literals (a flag between them, either word held in a
 *    variable) is invisible to the argv reader (A1 controls: consumerReversed and consumerInterrupted 0); this census claims no
 *    backstop for it.
 * SCOPE: Pi vendors no RI, RC or rf source, so a producer change is seen only when a re-probe re-reads the pins. The decision
 *    surface is unshipped, so nothing here reads a decision envelope (wb-tz4r.1 owns that shape); a future inference consumer is
 *    a new reader module, which reds A1's closure and its <LEAF> census by construction.
 *
 * FOLLOW-UP wb-3rx7 (R694, landing 322's gate verdict on wb-tz4r.7; F1 leads, F2-F6 ride; each cure pinned red-first):
 *  F1 timer-deferred effects escaped every runtime row and the (c) checker: observe and A4, B2 and B3 now re-read every counter
 *    after the bounded real-time SETTLE_MS settle (real timers: a fake clock is a forbidden marker), C1-C4 pin the deferred
 *    mutants (G10's shape) and B2 and B3 a deferred control (G04f's and G04d's shape at the injected seam), and A1 reads
 *    authority members in any position (G04d's .call spelling).
 *  F2 the census anchored only on itself and its same-cut roster: the labels, the frozen shape, the pins and the deferred probes
 *    are held to the bead store export, and the vocabulary to src (above).
 *  F3 the consumer matcher missed Pi's own argv spelling, and the CLI control passed only through its comment: A1 reads adjacent
 *    string-literal argv pairs on the AST, and the CLI and argv controls carry no comment.
 *  F4 the forward-only closure missed a fourth reader reached through the contract constant: A1 reads the importers backwards
 *    (an exact set) and holds the contract constant to one importer and one spelling.
 *  F5 the scanner read members only in call position and hid namespace members: see A1's controls.
 *  F6 a pin could not tell a measurement from a copy of its expected value: each case runs with the roster sealed and its own
 *    assertion count held to the roster. NOT CLAIMED: a case that swaps its assertions for as many trivial ones and returns a
 *    literal copy of its witness keeps its count; a hollow that drops an authority module from AUTHORITY_MODULES together with
 *    its exports from the vocabulary and the roster removes two members, outside rule 16's coordinated (one-member) hollow.
 *
 * FOLLOW-UP wb-7iyv (R694, landing 414's gate verdict on wb-3rx7; F2 leads, F3 rides; each cure pinned red-first; cut #2 cures
 *    refusal #1's U1 and its PREP F2):
 *  F2 the reader closure followed scanModule's value imports only: closureOf follows importEdges' value, dynamic and re-export
 *    edges (A1 controls reexportClosure and reexportAuthority).
 *  F3 an object destructuring pattern was read by nothing: A1 reads either vocabulary as the key of every object pattern, a
 *    binding element or a destructuring-assignment property, under an identifier, a string or a literal computed key (the
 *    destructured and assigned controls, computedKey, templateKey; literalObjectKey, assignedLiteral and composedBinding quiet).
 *  U1 (refusal #1, R754): a type-only re-export is a type edge, never a dropped one. The closure skips it as it skips a type-only
 *    import, and the F4 importer and contract-importer sets read both (typeReexportImporter, typeStarReexportImporter,
 *    typeImportImporter and typeReexportContract; reexportTypeClosure quiet), so no landed kill of those sets is lost.
 *  NOT CLAIMED: an import or re-export whose every specifier is inline-type (`{ type X }`) is followed as a value edge (the closure
 *    can only gain a module, never a false green); a member read through Reflect.get or a property descriptor under a literal
 *    string, and a re-exported registry class, are read by nothing.
 *
 * FOLLOW-UP wb-3ji0 (R694, landing 490's gate verdict on wb-7iyv; F1 leads; pinned red-first):
 *  F1 isAssignmentPattern never read the target of an array-assignment rest element as a pattern position, so
 *    `[...{ invoke }] = list` read A1 green while its binding form `const [...{ invoke }] = list` read red: a spread element whose
 *    parent is an assignment-pattern array literal now holds a pattern (A1 controls assignedRest, and assignedRestArray for an
 *    array pattern in the rest element; spreadLiteral quiet, a spread inside an array literal assigned). With it, wb-7iyv F3's
 *    "the key of every object pattern" holds at the rest-element position too.
 *
 * FOLLOW-UP wb-a6nf (R694, landing 581's gate verdict on wb-3ji0; F1 leads; pinned red-first):
 *  F1 the rest-element clause was pinned only at the top level of an '=' assignment, so the clause narrowed to an array literal
 *    that is directly the left of '=' (the gate's mutant GM3) kept A1 green: three A1 controls read a rest element below the top
 *    level, each 1 here and 0 under GM3 - assignedRestNested in a property's value, assignedRestElement in an array element and
 *    assignedRestLoop in a for-of head. isAssignmentPattern is unchanged.
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
/** The R694 follow-up that hardened this census (landing 322's gate findings F1-F6); both beads' rows live in the store export. */
const FOLLOW_UP = "wb-3rx7";
const ISSUES_PATH = join(REPO, ".beads", "issues.jsonl");
/** The bounded real-time settle every runtime row waits out before it re-reads its counters (F1): an effect a surface schedules on
 * a timer firing inside it is counted; one deferred past it is the named residual R-LATE. Real timers only. */
const SETTLE_MS = 500;
/** How far past their return (or their release) the in-file deferred mutants and controls schedule their effects: inside the settle. */
const DEFER_MS = 50;
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
/** The src modules that hold Pi's effect/action authority (F2): the permit core and its receipts, the execute and reconcile deciders,
 * the four producers' control adapters and the retained forge executor, the curated, control, execute and reconcile tools, the
 * Claude workflow host and the workflow runtime. A1 derives the vocabulary from them: AUTHORITY_CALLS is exactly the functions they
 * export, so an export added to one, or a name dropped from the list below, reds A1 against src. */
const AUTHORITY_MODULES: readonly string[] = [
  "src/workbench/control.ts", "src/workbench/execute.ts", "src/workbench/reconcile-decision.ts", "src/workbench/claude-control.ts",
  "src/workbench/furnace-control.ts", "src/workbench/forge-control.ts", "src/workbench/detached-control.ts", "src/workbench/forge-control-retention.ts",
  "src/workbench/claude-capability-tools.ts", "src/workbench/control-tool.ts", "src/workbench/execute-tool.ts", "src/workbench/reconcile-tool.ts",
  "src/workbench/claude-host.ts", "src/workflow/runtime.ts",
];
/** Pi's effect/action authority, by name: every function the authority modules export (A1 holds the list to their exports, both
 * ways, and resolves each to a src export), and a reader may neither call nor reference one. */
const AUTHORITY_CALLS: readonly string[] = [
  "decideControl", "isCoreMintedDecision", "acknowledge", "settle", "decideExecute", "decideReconcile", "mintEvidenceReceipt",
  "executeClaudeControl", "executeFurnaceControl", "executeForgeControl", "executeDetachedControl", "settleClaudeInterrupt",
  "settleForgeControl", "createCuratedTools", "createWorkflowControlTool", "createWorkflowExecuteTool", "createWorkflowReconcileTool",
  "createRetainedForgeControlExecutor", "createClaudeWorkflowHost", "runWorkflow",
  // The helpers the same modules export (F2: derived from src, the vocabulary holds every one).
  "buildWorkflowExecuteReply", "vetClaudeControlDecision", "vetFurnaceControlDecision", "retainForgeOperation", "lookupForgeOperation",
  "releaseForgeOperation", "recordControlReceipt", "workflowConcurrency", "assertBoundarySafe", "validateScript",
];
/** The two words of rf's generative inference leaf, kept apart so this file never spells the leaf (THE LEAF NAME above). */
const GROUP = "inference";
const VERB = "run";
/** A <LEAF> consumer's spelling, composed at runtime: the served leaf (dotted, spaced, snake or kebab) or the rf CLI verb pair. */
const CONSUMER = new RegExp(`\\b${GROUP}[ ._-]${VERB}\\b|\\brf ${GROUP}\\b`);
/** The members that dispatch a capability, a native control, a tool or a workflow node, read in any position (F1/F5): called,
 * bound, applied, passed or read. */
const AUTHORITY_MEMBERS: readonly string[] = ["invoke", "inspect", "requestControl", "callTool", "callNode"];
/** The three gate probes the follow-up's lead finding names (wb-3rx7's export row, its '[leads] - F1' line), each with the pin member
 * that is its in-file shape: G10's deferred adapter (C1), G04f's and G04d's deferral behind the preview call (B2, B3). */
const GATE_PROBES: Readonly<Record<string, string>> = { G10: "C1 defersSinkInvoke", G04f: "B2 deferredControl", G04d: "B3 deferredControl" };

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
  readonly followUp: string;
  readonly settleMs: number;
  readonly riPin: string;
  readonly riProbe: string;
  readonly rcPin: string;
  readonly rfVersion: string;
  readonly actionTextSha256: string;
  readonly readers: readonly string[];
  readonly authorityModules: readonly string[];
  readonly authorityCalls: readonly string[];
  readonly authorityMembers: readonly string[];
  readonly gateProbes: { readonly [probe: string]: string };
  readonly sinks: readonly Sink[];
  readonly verbs: readonly string[];
  readonly toolNames: readonly string[];
  readonly rows: readonly RosterRow[];
  /** `${pin}:${n}`, n the assertions the pin's own case makes (F6), in row order. */
  readonly counted: readonly string[];
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
  for (const field of ["bead", "followUp", "riPin", "riProbe", "rcPin", "rfVersion", "actionTextSha256"]) {
    if (typeof raw[field] !== "string") throw new Error(`roster ${field} must be a string`);
  }
  if (typeof raw.settleMs !== "number") throw new Error("roster settleMs must be a number");
  const probes = raw.gateProbes;
  if (!isObject(probes) || !Object.values(probes).every(member => typeof member === "string")) throw new Error("roster gateProbes must map each probe to a pin member");
  return {
    bead: String(raw.bead), followUp: String(raw.followUp), settleMs: raw.settleMs, riPin: String(raw.riPin), riProbe: String(raw.riProbe), rcPin: String(raw.rcPin),
    rfVersion: String(raw.rfVersion), actionTextSha256: String(raw.actionTextSha256), readers: strings(raw.readers, "readers"),
    authorityModules: strings(raw.authorityModules, "authorityModules"), authorityCalls: strings(raw.authorityCalls, "authorityCalls"),
    authorityMembers: strings(raw.authorityMembers, "authorityMembers"), gateProbes: Object.fromEntries(Object.entries(probes).map(([probe, member]) => [probe, String(member)])),
    sinks, verbs: strings(raw.verbs, "verbs"), toolNames: strings(raw.toolNames, "toolNames"), rows, counted: strings(raw.counted, "counted"), tests: strings(raw.tests, "tests"),
  };
}
const ROSTER_VALUE = readRoster();
/** Raised while a pin's case runs (F6): a case measures its witness, it never reads (and so never copies) the expected one. */
let rosterSealed = false;
function roster(): Roster {
  if (rosterSealed) throw new Error("a case read the roster while it ran: a pin measures its witness, it never copies the expected one");
  return ROSTER_VALUE;
}
function rosterWitness(pin: string): JsonValue {
  const found = roster().rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function countedEntry(pin: string): string {
  return roster().counted.find(entry => entry.startsWith(`${pin}:`)) ?? `${pin}: not counted in the roster`;
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The anchors outside this file and its roster (F2): the bead store export's rows for this census's bead and its follow-up.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface ExportRow {
  readonly id: string;
  readonly notes: string;
}
/** The committed bead store export's rows, parsed once. */
let exported: readonly unknown[] | undefined;
function exportedRows(): readonly unknown[] {
  exported ??= readFileSync(ISSUES_PATH, "utf8").split("\n").filter(line => line.trim() !== "").map((line): unknown => JSON.parse(line));
  return exported;
}
/** The one row of the committed bead store export with this id; none, or two, refuses. */
function exportRow(id: string): ExportRow {
  const found = exportedRows().filter((row): row is { [key: string]: unknown } => isObject(row) && row.id === id);
  const [row] = found;
  if (found.length !== 1 || row === undefined) throw new Error(`the bead store export holds ${found.length} rows for ${id}`);
  return { id, notes: typeof row.notes === "string" ? row.notes : "" };
}
/** The first note line opening with `prefix`, the prefix dropped; none refuses. */
function noteLine(row: ExportRow, prefix: string): string {
  const line = row.notes.split("\n").find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`${row.id}'s notes carry no line opening ${JSON.stringify(prefix)}`);
  return line.slice(prefix.length);
}
/** The owner filing's acceptance clauses, each from its `(x) ` mark to the next clause's `; `, the closing period dropped. */
function acceptanceClauses(row: ExportRow): string[] {
  return noteLine(row, "Acceptance: ").replace(/\.$/, "").split(/; (?=\([b-z]\) )/);
}
/** The landed delivery note's ROWS paragraph: the frozen shape it states and the pins it names under each row's clause mark. */
function landedRows(row: ExportRow): { shape: string[]; pins: { [id: string]: string[] } } {
  const paragraph = noteLine(row, "ROWS (frozen shape ");
  const shape = /^([A-Z]:\d+(?: [A-Z]:\d+)*),/.exec(paragraph)?.[1]?.split(" ") ?? [];
  const heads = [...paragraph.matchAll(/(?:: |\. )([A-Z]) \([a-z]\) /g)];
  const pins = Object.fromEntries(heads.map((head, at) => {
    const segment = paragraph.slice(head.index, heads[at + 1]?.index ?? paragraph.length);
    return [head[1] ?? "", [...segment.matchAll(/(?:- |; )([A-Z]\d) /g)].map(match => match[1] ?? "")];
  }));
  return { shape, pins };
}
/** The gate probes the follow-up's lead finding names as surviving: `(G10, G04f and G04d survive ...`. */
function leadProbes(row: ExportRow): string[] {
  const named = /\(((?:G\d+[a-z]?(?:, | and ))*G\d+[a-z]?) survive/.exec(noteLine(row, "[leads] - F1 "))?.[1] ?? "";
  return named.split(/, | and /).filter(probe => probe !== "");
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
  /** `name@line` for an authority reference (an imported one included), `ns.name@line` for one reached through a namespace binding,
   * `.member@line` for an authority member in any position, `{member}@line` for an object binding and `[name]@line` for either reached through a literal key. */
  readonly authority: readonly string[];
}
/** Every text this file parses, parsed once (A1 reads each src file through several readers). */
const PARSED = new Map<string, ts.SourceFile>();
function parsed(name: string, text: string): ts.SourceFile {
  const cached = PARSED.get(text);
  if (cached !== undefined) return cached;
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  PARSED.set(text, source);
  return source;
}
/** Whether an expression is a dynamic import(), awaited or not: the binding it initializes is a namespace. */
function isDynamicImport(expression: ts.Expression): boolean {
  const call = ts.isAwaitExpression(expression) ? expression.expression : expression;
  return ts.isCallExpression(call) && call.expression.kind === ts.SyntaxKind.ImportKeyword;
}
/** Whether an object or array literal is a destructuring-assignment target: the left of `=`, the head of a for-of or for-in loop,
 * or nested in one as a property's value, an array element or the target of an array's rest element (`[...{ a }] = list`). */
function isAssignmentPattern(node: ts.Node): boolean {
  if (!ts.isObjectLiteralExpression(node) && !ts.isArrayLiteralExpression(node)) return false;
  const parent = node.parent;
  if (ts.isBinaryExpression(parent)) return parent.operatorToken.kind === ts.SyntaxKind.EqualsToken && parent.left === node;
  if (ts.isForOfStatement(parent) || ts.isForInStatement(parent)) return parent.initializer === node;
  if (ts.isPropertyAssignment(parent)) return parent.initializer === node && isAssignmentPattern(parent.parent);
  // wb-3ji0: a spread element is a rest element only inside an assignment-pattern array literal, and its target is a pattern there.
  if (ts.isSpreadElement(parent)) return ts.isArrayLiteralExpression(parent.parent) && isAssignmentPattern(parent.parent);
  return ts.isArrayLiteralExpression(parent) && isAssignmentPattern(parent);
}
/** The key an object pattern reads (wb-7iyv F3, cut #1's PREP F2): of an object binding element or of a destructuring-assignment
 * property, spelled as an identifier, a string or a literal computed name; undefined for any other node or key. */
function patternKeyOf(node: ts.Node): string | undefined {
  const key = ts.isBindingElement(node) && ts.isObjectBindingPattern(node.parent) ? (node.propertyName ?? node.name)
    : (ts.isShorthandPropertyAssignment(node) || ts.isPropertyAssignment(node)) && isAssignmentPattern(node.parent) ? node.name : undefined;
  if (key === undefined) return undefined;
  if (ts.isIdentifier(key) || ts.isStringLiteralLike(key)) return key.text;
  return ts.isComputedPropertyName(key) && ts.isStringLiteralLike(key.expression) ? key.expression.text : undefined;
}
function scanModule(name: string, text: string): ModuleScan {
  const source = parsed(name, text);
  const valueImports: ValueImport[] = [];
  const typeImports: string[] = [];
  const authority: string[] = [];
  const line = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1;
  // The module's namespace bindings (F5): `import * as ns` and a binding a dynamic import() initializes; a member of one is a reference.
  const namespaces = new Set<string>();
  const collect = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && node.importClause?.namedBindings !== undefined && ts.isNamespaceImport(node.importClause.namedBindings)) {
      namespaces.add(node.importClause.namedBindings.name.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && isDynamicImport(node.initializer)) namespaces.add(node.name.text);
    ts.forEachChild(node, collect);
  };
  collect(source);
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
          for (const element of bindings.elements) {
            if (element.isTypeOnly) continue;
            const imported = (element.propertyName ?? element.name).text;
            names.push(imported);
            // A value import of an authority name is a reference, aliased or not (F5): `import { decideControl as d }`.
            if (AUTHORITY_CALLS.includes(imported)) authority.push(`${imported}@${line(element)}`);
          }
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
    // Either vocabulary as an object pattern's key, in any pattern position: a binding (const, let, a parameter, a loop head) or a
    // destructuring assignment, under an identifier, a string or a literal computed key.
    const patternKey = patternKeyOf(node);
    if (patternKey !== undefined && [...AUTHORITY_MEMBERS, ...AUTHORITY_CALLS].includes(patternKey)) authority.push(`{${patternKey}}@${line(node)}`);
    if (ts.isIdentifier(node) && AUTHORITY_CALLS.includes(node.text)) {
      const parent = node.parent;
      // A property NAME (x.settle, { settle: ... }) is not a reference to the authority binding; a bare identifier is, and so is
      // a member of a namespace binding (ns.decideControl, F5).
      const receiver = ts.isPropertyAccessExpression(parent) && parent.name === node && ts.isIdentifier(parent.expression) ? parent.expression.text : undefined;
      const viaNamespace = receiver !== undefined && namespaces.has(receiver);
      const isMemberName = (ts.isPropertyAccessExpression(parent) && parent.name === node && !viaNamespace) || (ts.isPropertyAssignment(parent) && parent.name === node) || (ts.isBindingElement(parent) && parent.propertyName === node && ts.isObjectBindingPattern(parent.parent));
      if (!isMemberName) authority.push(`${viaNamespace ? `${receiver}.` : ""}${node.text}@${line(node)}`);
    }
    // An authority member in ANY position (F1/F5): called, bound, applied, passed or read - x.invoke(...), x.invoke.call(...),
    // Reflect.apply(x.invoke, ...), x.invoke.bind(x), x?.invoke(...), x.invoke!(...).
    if (ts.isPropertyAccessExpression(node) && AUTHORITY_MEMBERS.includes(node.name.text)) authority.push(`.${node.name.text}@${line(node)}`);
    // Either vocabulary reached through a literal key: x["invoke"], ns["decideControl"] (a computed name stays R-COMPOSED).
    if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) &&
      [...AUTHORITY_MEMBERS, ...AUTHORITY_CALLS].includes(node.argumentExpression.text)) {
      authority.push(`[${node.argumentExpression.text}]@${line(node)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { valueImports, typeImports, authority };
}
/** The line of every [GROUP, VERB] pair of adjacent string literals on the AST (F3): two adjacent elements of an array literal or
 * two adjacent arguments of a call, in any quote style - Pi's own launch argv form, which no text matcher reads. */
function argvSites(name: string, text: string): number[] {
  const source = parsed(name, text);
  const sites: number[] = [];
  const pairs = (items: readonly ts.Expression[]): void => {
    items.forEach((item, at) => {
      const next = items[at + 1];
      if (next !== undefined && ts.isStringLiteralLike(item) && ts.isStringLiteralLike(next) && item.text === GROUP && next.text === VERB) {
        sites.push(source.getLineAndCharacterOfPosition(item.getStart(source)).line + 1);
      }
    });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) pairs(node.elements);
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) pairs(node.arguments ?? []);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}
/** Whether a text spells a <LEAF> consumer: the composed text matcher, or Pi's argv form on the AST. */
function spellsConsumer(name: string, text: string): boolean {
  return CONSUMER.test(text) || argvSites(name, text).length > 0;
}
interface ImportEdge {
  readonly from: string;
  readonly kind: "value" | "type" | "dynamic" | "reexport";
  readonly names: readonly string[];
}
/** Every module edge a src module declares (F4): static value and type imports with their imported names, dynamic import()s and
 * re-exports (a type-only re-export is a type edge). */
function importEdges(name: string, text: string): ImportEdge[] {
  const source = parsed(name, text);
  const edges: ImportEdge[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.importClause;
      const bindings = clause?.namedBindings;
      const named = bindings !== undefined && ts.isNamedImports(bindings) ? bindings.elements.map(element => (element.propertyName ?? element.name).text) : [];
      const names = [...(clause?.name !== undefined ? ["default"] : []), ...(bindings !== undefined && ts.isNamespaceImport(bindings) ? ["*"] : []), ...named].sort();
      edges.push({ from: node.moduleSpecifier.text, kind: clause?.isTypeOnly === true ? "type" : "value", names });
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      const clause = node.exportClause;
      // A type-only re-export is a type edge, as a type-only import is (U1): the closure skips both, the F4 importer sets read both.
      const kind = node.isTypeOnly ? "type" : "reexport";
      edges.push({ from: node.moduleSpecifier.text, kind, names: clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text).sort() : ["*"] });
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const [specifier] = node.arguments;
      edges.push({ from: specifier !== undefined && ts.isStringLiteral(specifier) ? specifier.text : "<computed>", kind: "dynamic", names: ["import()"] });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return edges;
}
/** The functions a module exports: function declarations and function-valued constants carrying the export modifier. */
function exportedFunctionsOf(text: string): string[] {
  const source = parsed("exported-functions.ts", text);
  return source.statements.flatMap(statement => {
    const exported = (ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
    if (!exported) return [];
    if (ts.isFunctionDeclaration(statement)) return statement.name === undefined ? [] : [statement.name.text];
    if (!ts.isVariableStatement(statement)) return [];
    return statement.declarationList.declarations.flatMap(declaration => ts.isIdentifier(declaration.name) && declaration.initializer !== undefined &&
      (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer)) ? [declaration.name.text] : []);
  });
}
/** A relative specifier resolved to the src .ts module it names (the emitted `.js` spelling maps to the `.ts` source). */
function resolveSpecifier(fromModule: string, specifier: string): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  return resolve(dirname(fromModule), specifier.replace(/\.js$/, ".ts"));
}
/** The src value-import, dynamic-import and re-export closure of a module set, followed through relative specifiers only; packages are recorded by name. */
function closureOf(roots: readonly string[], readText: (path: string) => string = textOf): { modules: string[]; packages: string[]; scans: Map<string, ModuleScan> } {
  const scans = new Map<string, ModuleScan>();
  const packages = new Set<string>();
  const queue = roots.map(root => join(REPO, root));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || scans.has(path)) continue;
    const text = readText(path);
    const scanned = scanModule(path, text);
    scans.set(path, scanned);
    for (const edge of importEdges(path, text)) {
      if (edge.kind === "type") continue;
      const target = resolveSpecifier(path, edge.from);
      if (target === undefined) packages.add(edge.from);
      else queue.push(target);
    }
  }
  return { modules: [...scans.keys()].map(repoPath).sort(), packages: [...packages].sort(), scans };
}
/** F4 read backwards over a module set: every edge into a reader module as `<importer> <- <reader> (<kind>): <names>` (sorted),
 * and every module importing the preview contract constant from the provider (in module order). A1 runs it on src and its
 * controls on a virtual module, so both read the same derivation. */
function readerEdgesOf(modules: ReadonlyMap<string, string>): { importers: string[]; contractImporters: string[] } {
  const readerPaths = READERS.map(reader => join(REPO, reader));
  const provider = join(REPO, "src/workbench/providers/reactivefiber.ts");
  const edges = [...modules].flatMap(([path, text]) => importEdges(path, text).map(edge => ({ path, edge, target: resolveSpecifier(path, edge.from) })));
  const importers = edges.filter(({ target }) => target !== undefined && readerPaths.includes(target))
    .map(({ path, edge, target }) => `${repoPath(path)} <- ${repoPath(target ?? "")} (${edge.kind}): ${edge.names.join(", ")}`).sort();
  const contractImporters = edges.filter(({ edge, target }) => target === provider && edge.names.includes("REACTIVEFIBER_RENDER_PREVIEW_CONTRACT")).map(({ path }) => repoPath(path));
  return { importers, contractImporters };
}
/** Whether a src module exports a binding of this name (a declaration with the export modifier, or a named export list). */
function exportsName(text: string, name: string): boolean {
  const source = parsed("export-probe.ts", text);
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
  const source = parsed("object-probe.ts", text);
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
/** The injected-reader seam's envelope type over a JSON envelope (its one cast). */
function injectedEnvelope(envelope: JsonObject): InjectedEnvelope {
  return json(envelope) as unknown as InjectedEnvelope;
}
/** The bounded real-time settle (F1): a row waits it out, then re-reads every counter it judges. */
async function waitSettle(): Promise<void> {
  await new Promise<void>(resolve => {
    setTimeout(resolve, SETTLE_MS);
  });
}
/** Schedules, `delayMs` from now, an invoke of every sink the text names under the host's full grants - the deferred shape (F1). */
function deferSinkInvokes(registry: CapabilityRegistry, text: string, delayMs: number): void {
  for (const sink of SINKS) {
    if (!text.includes(sink.id)) continue;
    setTimeout(() => {
      registry.invoke(sink.id, {}, contextOf(HOST_GRANTS)).catch(() => undefined);
    }, delayMs);
  }
}
interface Session {
  readonly registry: CapabilityRegistry;
  readonly counts: Counts;
  /** Starts what a deferring reader held: each answer's sink invokes, scheduled DEFER_MS from the release. */
  readonly release: () => void;
}
/** The session registry: the injected preview beside the sinks. With `deferring`, the preview's reader is the G04f/G04d shape at the
 * injected seam: every answer holds an invoke of each sink it names, scheduled DEFER_MS after the row releases it - once the
 * surface that read the preview has returned, so the effect lands after it whatever the load. */
function sessionRegistry(envelope: JsonObject, options: { deferring?: boolean } = {}): Session {
  const counts: Counts = { preview: 0, sinks: Object.fromEntries(SINKS.map(sink => [sink.id, 0])) };
  const registry = new CapabilityRegistry();
  const held: string[] = [];
  registerReactiveFiberRender(registry, async () => {
    counts.preview += 1;
    if (options.deferring === true) held.push(JSON.stringify(envelope));
    return injectedEnvelope(envelope);
  }, ROOT);
  for (const sink of SINKS) registry.register(sinkProvider(sink, counts));
  return { registry, counts, release: () => {
    for (const text of held.splice(0)) deferSinkInvokes(registry, text, DEFER_MS);
  } };
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
  readonly settleMs: number;
  /** Every count below is read after the settle (F1); `late` is the part of each that landed after the adapter's last pass. */
  readonly providerCalls: { readonly preview: number; readonly sinks: number };
  readonly toolCalls: number;
  readonly permits: number;
  readonly late: { readonly preview: number; readonly sinks: number; readonly toolCalls: number; readonly permits: number };
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
  const passed = { preview: counts.preview, sinks: sinkCalls(counts), toolCalls: tools.dispatched(), permits };
  // F1: the settle, then every counter is read again - an effect an adapter deferred past its return is counted - and the
  // projection is read once more, so a deferred projection change reads unstable.
  await waitSettle();
  reads.push(readOf(projection));
  const surfaced = surfacedStrings(projection, notes);
  return {
    applied: passes, settleMs: SETTLE_MS, providerCalls: { preview: counts.preview, sinks: sinkCalls(counts) }, toolCalls: tools.dispatched(), permits,
    late: { preview: counts.preview - passed.preview, sinks: sinkCalls(counts) - passed.sinks, toolCalls: tools.dispatched() - passed.toolCalls, permits: permits - passed.permits },
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
    const consumers = srcFiles.filter(path => spellsConsumer(path, texts.get(path) ?? "")).map(repoPath);
    const anchored = srcFiles.filter(path => (texts.get(path) ?? "").includes(`"${PREVIEW_ID}"`)).map(repoPath);
    // F2: the vocabulary is derived from src - exactly the functions the authority modules export, both ways.
    const authorityExports = Object.fromEntries(AUTHORITY_MODULES.map(module => [module, exportedFunctionsOf(textOf(join(REPO, module)))]));
    const derived = Object.values(authorityExports).flat();
    const vocabulary = { missing: derived.filter(name => !AUTHORITY_CALLS.includes(name)), extra: AUTHORITY_CALLS.filter(name => !derived.includes(name)) };
    // F4: who reads the inference result, read backwards - every src module importing a reader module (or re-exporting or loading
    // one) is an exact set, and the contract constant that recognizes the reading has exactly one importer and one spelling.
    const { importers, contractImporters } = readerEdgesOf(texts);
    const contractSpelled = srcFiles.filter(path => (texts.get(path) ?? "").includes(REACTIVEFIBER_RENDER_PREVIEW_CONTRACT)).map(repoPath);
    const control = (code: string): number => scanModule("control.ts", code).authority.length;
    const consumer = (code: string): number => Number(spellsConsumer("control.ts", code));
    const importerOf = (code: string): { importers: string[]; contractImporters: string[] } => readerEdgesOf(new Map([[join(REPO, "src/workbench/virtual-importer.ts"), code]]));
    const controls = {
      direct: control("await registry.invoke(id, input, context);"),
      alias: control("const run = decideControl;\nrun(request, deps);"),
      member: control("tools.callTool({ name });"),
      composed: control('const verb = "inv" + "oke";\nawait registry[verb](id, input, context);'),
      propertyName: control("const handlers = { settle: 1 };\nhandlers.settle;"),
      // F1/F5: a member read in any position, and the namespace, alias and literal-key spellings of either vocabulary.
      callMember: control("registry.invoke.call(registry, id, input, context);"),
      reflectApply: control("Reflect.apply(registry.invoke, registry, [id, input, context]);"),
      boundMember: control("const run = registry.invoke.bind(registry);"),
      nonNullCall: control("await registry.invoke!(id, input, context);"),
      optionalCall: control("await registry?.invoke(id, input, context);"),
      literalKey: control('await registry["invoke"](id, input, context);'),
      namespaceCall: control('import * as core from "./control.js";\ncore.decideControl(request, deps);'),
      dynamicNamespace: control('const core = await import("./control.js");\ncore.decideControl(request, deps);'),
      aliasImport: control('import { decideControl as permitOf } from "./control.js";\npermitOf(request, deps);'),
      otherReceiver: control("const options = { decideControl: 1 };\noptions.decideControl;"),
      reexportValue: importEdges("control.ts", 'export * from "./control.js";').filter(edge => edge.kind === "reexport").length,
      reexportType: importEdges("control.ts", 'export type * from "./control.js";').filter(edge => edge.kind === "reexport").length,
      reexportClosure: closureOf(["src/workbench/virtual-reader.ts"], path => {
        if (path.endsWith("virtual-reader.ts")) return 'export * from "./virtual-authority.js";';
        if (path.endsWith("virtual-authority.ts")) return "export const mint = decideControl;";
        throw new Error(`unexpected re-export target ${path}`);
      }).modules.map(module => module.slice(module.lastIndexOf("/") + 1)),
      reexportAuthority: closureOf(["src/workbench/virtual-reader.ts"], path => {
        if (path.endsWith("virtual-reader.ts")) return 'export * from "./virtual-authority.js";';
        if (path.endsWith("virtual-authority.ts")) return "export const mint = decideControl;";
        throw new Error(`unexpected re-export target ${path}`);
      }).scans.get(join(REPO, "src/workbench/virtual-authority.ts"))?.authority.length ?? 0,
      destructuredMember: control("const {invoke} = registry;\ninvoke.call(registry, id, {}, {});"),
      destructuredAlias: control("const {invoke: run} = registry;\nrun.call(registry, id, {}, {});"),
      destructuredKey: control('const {"invoke": run} = registry;\nrun.call(registry, id, {}, {});'),
      destructuredAuthority: control("const {decideControl: run} = core;\nrun(request, deps);"),
      unrelatedDestructure: control("const {safe} = registry;"),
      // U1 (cut #1's refusal): a type-only re-export or import of a reader module is a type edge the F4 importer sets read, never a
      // dropped one, and the closure still does not follow a type-only re-export.
      typeReexportImporter: importerOf('export type { ReactiveFiberSeam } from "./reactivefiber-observer.js";').importers,
      typeStarReexportImporter: importerOf('export type * from "./reactivefiber-observer.js";').importers,
      typeImportImporter: importerOf('import type { ReactiveFiberSeam } from "./reactivefiber-observer.js";').importers,
      typeReexportContract: importerOf('export type { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "./providers/reactivefiber.js";').contractImporters,
      reexportTypeClosure: closureOf(["src/workbench/virtual-reader.ts"], path => (path.endsWith("virtual-reader.ts") ? 'export type * from "./virtual-authority.js";' : "export const mint = decideControl;"))
        .modules.map(module => module.slice(module.lastIndexOf("/") + 1)),
      // An object pattern key in every pattern position (cut #1's PREP F2): a destructuring-assignment property, nested, in an array,
      // in a for-of head and with a default, and a string or template literal computed key...
      assignedMember: control("let invoke;\n({ invoke } = registry);"),
      assignedAlias: control("let run;\n({ invoke: run } = registry);"),
      assignedAuthority: control("let run;\n({ decideControl: run } = core);"),
      assignedNested: control("let invoke;\n({ inner: { invoke } } = holder);"),
      assignedElement: control("let invoke;\n[{ invoke }] = list;"),
      assignedLoop: control("let invoke;\nfor ({ invoke } of list) {}"),
      assignedDefault: control("let invoke;\n({ invoke = fallback } = registry);"),
      // wb-3ji0 (landing 490's F1): an object pattern, or an array pattern holding one, inside an array-assignment rest element.
      assignedRest: control("let invoke;\n[...{ invoke }] = list;"),
      assignedRestArray: control("let invoke;\n[...[{ invoke }]] = lists;"),
      // wb-a6nf (landing 581's F1): the rest element below the top level of an '=' assignment - in a property's value, in an
      // array element and in a for-of head - so the clause narrowed to the top level (gate mutant GM3) reds.
      assignedRestNested: control("let invoke;\n({ inner: [...{ invoke }] } = holder);"),
      assignedRestElement: control("let invoke;\n[[...{ invoke }]] = lists;"),
      assignedRestLoop: control("let invoke;\nfor ([...{ invoke }] of list) {}"),
      computedKey: control('const { ["invoke"]: run } = registry;'),
      templateKey: control("const { [`invoke`]: run } = registry;"),
      // ...and no pattern: an object literal's key, an object literal assigned (the right of `=`), and a computed key (R-COMPOSED).
      literalObjectKey: control("const handlers = { invoke: 1 };"),
      assignedLiteral: control("let handlers;\nhandlers = { invoke: 1 };"),
      // wb-3ji0: a spread element is a pattern position only inside an assignment pattern, never in an array literal assigned.
      spreadLiteral: control("let handlers;\nhandlers = [...[{ invoke: 1 }]];"),
      composedBinding: control("const { [invoke]: run } = registry;"),
      // The consumer census flags the served leaf, the CLI pair and Pi's own argv form with no comment to carry them (F3); TypeScript's
      // own type-inference prose and a reversed or interrupted pair stay quiet.
      consumerLeaf: consumer(`const leaf = "${[GROUP, VERB].join(".")}";`),
      consumerCli: consumer(`spawn("rf", ["${GROUP}", "${VERB}"]);`),
      consumerArgv: consumer(`function argv(workspaceRoot: string) {\n  return ["--workspace", workspaceRoot, '${GROUP}', \`${VERB}\`, "--no-input", "--json"];\n}`),
      consumerArguments: consumer(`launch("rf", "${GROUP}", "${VERB}");`),
      consumerProse: consumer("which erases TypeBox's literal inference to `unknown`"),
      consumerReversed: consumer(`spawn("rf", ["${VERB}", "${GROUP}"]);`),
      consumerInterrupted: consumer(`spawn("rf", ["${GROUP}", "--json", "${VERB}"]);`),
      // The vocabulary resolver reads an export, never a local declaration of the same name; the export reader likewise.
      exported: Number(exportsName("export function decideControl() {}", "decideControl")),
      local: Number(exportsName("function decideControl() {}", "decideControl")),
      exportReader: exportedFunctionsOf("export function a() {}\nfunction b() {}\nexport const c = () => 1;\nexport const d = 1;\nexport class E {}").length,
    };
    expect(srcFiles.length, "src .ts files walked").toBeGreaterThanOrEqual(100);
    expect(readerHits, "authority entries inside the three reader modules").toEqual([]);
    expect(importedAuthority, "authority bindings (or the registry class) imported as a value by the reader closure").toEqual([]);
    expect(unresolved, "authority names that are no src export").toEqual([]);
    expect(uiScans.length, "src/ui modules walked").toBeGreaterThanOrEqual(10);
    expect(uiAuthority, "authority entries in src/ui").toEqual([]);
    expect(consumers, "src files spelling a <LEAF> consumer").toEqual([]);
    expect(vocabulary, "the vocabulary against the authority modules' exports (F2)").toStrictEqual({ missing: [], extra: [] });
    expect(derived.length, "functions the authority modules export").toBeGreaterThanOrEqual(30);
    expect(contractImporters, "src modules importing the preview contract constant (F4)").toEqual(["src/workbench/reactivefiber-observer.ts"]);
    expect(contractSpelled, "src files spelling the preview contract (F4)").toEqual(["src/workbench/providers/reactivefiber.ts"]);
    expect(controls).toStrictEqual({
      direct: 1, alias: 1, member: 1, composed: 0, propertyName: 0, callMember: 1, reflectApply: 1, boundMember: 1, nonNullCall: 1, optionalCall: 1,
      literalKey: 1, namespaceCall: 1, dynamicNamespace: 1, aliasImport: 1, otherReceiver: 0, reexportValue: 1, reexportType: 0,
      reexportClosure: ["virtual-authority.ts", "virtual-reader.ts"], reexportAuthority: 1,
      destructuredMember: 1, destructuredAlias: 1, destructuredKey: 1, destructuredAuthority: 1, unrelatedDestructure: 0,
      typeReexportImporter: ["src/workbench/virtual-importer.ts <- src/workbench/reactivefiber-observer.ts (type): ReactiveFiberSeam"],
      typeStarReexportImporter: ["src/workbench/virtual-importer.ts <- src/workbench/reactivefiber-observer.ts (type): *"],
      typeImportImporter: ["src/workbench/virtual-importer.ts <- src/workbench/reactivefiber-observer.ts (type): ReactiveFiberSeam"],
      typeReexportContract: ["src/workbench/virtual-importer.ts"], reexportTypeClosure: ["virtual-reader.ts"],
      assignedMember: 1, assignedAlias: 1, assignedAuthority: 1, assignedNested: 1, assignedElement: 1, assignedLoop: 1, assignedDefault: 1,
      assignedRest: 1, assignedRestArray: 1, assignedRestNested: 1, assignedRestElement: 1, assignedRestLoop: 1,
      computedKey: 1, templateKey: 1, literalObjectKey: 0, assignedLiteral: 0, spreadLiteral: 0, composedBinding: 0, consumerLeaf: 1, consumerCli: 1, consumerArgv: 1,
      consumerArguments: 1, consumerProse: 0, consumerReversed: 0, consumerInterrupted: 0, exported: 1, local: 0, exportReader: 2,
    });
    return { closure: closure.modules, packages: closure.packages, imported, elsewhere, ui: ui.map(repoPath), consumers, anchored, authorityExports, importers, contractImporters, contractSpelled, controls };
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
    registerReactiveFiberRender(injected, async () => injectedEnvelope(PLAIN_ENVELOPE), ROOT);
    const native = new CapabilityRegistry();
    (await loadWorkbenchNative()).registerNativeProviders(native, ROOT);
    const previewOf = (registry: CapabilityRegistry) => registry.catalogSnapshot().find(entry => entry.descriptor.id === PREVIEW_ID)?.descriptor;
    const descriptors = { injected: descriptorFacts(previewOf(injected)), native: descriptorFacts(previewOf(native)) };
    const refusals: { [id: string]: string[] } = {};
    const granted: { [id: string]: number } = {};
    const sessions = SINKS.map(sink => ({ sink, ...sessionRegistry(ACTION_ENVELOPE) }));
    for (const { sink, registry } of sessions) {
      await registry.invoke(PREVIEW_ID, PREVIEW_INPUT, contextOf(READ_GRANTS));
      refusals[sink.id] = [];
      for (const grant of READ_GRANTS) {
        refusals[sink.id]?.push(await registry.invoke(sink.id, {}, contextOf([grant])).then(() => "returned", categoryOf));
      }
      refusals[sink.id]?.push(await registry.invoke(sink.id, {}, contextOf(READ_GRANTS)).then(() => "returned", categoryOf));
    }
    // F1: the read-grant calls settle before any sink counter is read, and the granted calls settle before the difference is taken.
    await waitSettle();
    const refused = Object.fromEntries(sessions.map(({ sink, counts }) => [sink.id, counts.sinks[sink.id] ?? -1]));
    for (const { sink, registry } of sessions) await registry.invoke(sink.id, {}, contextOf([sink.permission]));
    await waitSettle();
    for (const { sink, counts } of sessions) {
      const refusedCalls = refused[sink.id] ?? -1;
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
    // F1: both scripts' sessions are counted after the settle - an invoke the preview deferred past the run's end is counted (G04d).
    await waitSettle();
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
    // F1: every count again after the settle - an invoke the call or the re-projection scheduled past its return is counted (G04f).
    await waitSettle();
    const afterSettle = { dispatched: tools.dispatched(), preview: counts.preview, sinks: sinkCalls(counts) };
    // The settle's own control (G04f/G04d's shape at the injected seam): a preview whose answer holds an invoke of every sink it names,
    // landing DEFER_MS after the call has answered; only the re-read after the settle counts the three invokes.
    const deferring = sessionRegistry(ACTION_ENVELOPE, { deferring: true });
    const deferringTools = await connectTools(deferring.registry, HOST_GRANTS);
    await deferringTools.call("capability_invoke", { capabilityId: PREVIEW_ID, capabilityVersion: PREVIEW_VERSION, input: PREVIEW_INPUT });
    const deferredCall = { dispatched: deferringTools.dispatched(), preview: deferring.counts.preview, sinks: sinkCalls(deferring.counts) };
    deferring.release();
    await waitSettle();
    const deferredControl = { afterCall: deferredCall, afterSettle: { dispatched: deferringTools.dispatched(), preview: deferring.counts.preview, sinks: sinkCalls(deferring.counts) } };
    expect([answer.isError, payload.kind, verbatim]).toEqual([false, "returned", true]);
    expect(afterReprojection).toStrictEqual(afterCall);
    expect(afterSettle, "the counts after the settle").toStrictEqual(afterCall);
    expect(deferredControl, "the deferred control: counted only after the settle").toStrictEqual({
      afterCall: { dispatched: 1, preview: 1, sinks: 0 }, afterSettle: { dispatched: 1, preview: 1, sinks: 3 },
    });
    return { kind: payload.kind ?? null, verbatim, textCarried: outputTextOf(value) === ACTION_TEXT, afterCall, afterReprojection, afterSettle, deferredControl };
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
    // F1: both sessions are counted after the settle - an invoke the preview node deferred past its return is counted (G04d).
    await waitSettle();
    const nodeRows = entries.filter(entry => entry.kind === "node").map(entry => ({ capabilityId: entry.capabilityId ?? null, effectClass: entry.effectClass ?? null }));
    const freshness = resumed.progress.flatMap(entry => (isObject(entry) && entry.type === "workflow_node" && entry.state === "done" ? [String(entry.freshness)] : []));
    const run = { status: recorded.status, textReturned: recorded.value === ACTION_TEXT, preview: first.counts.preview, sinks: sinkCalls(first.counts) };
    const resume = { status: resumed.status, textReturned: resumed.value === ACTION_TEXT, replayedNodeCount: resumed.replayedNodeCount, preview: second.counts.preview, sinks: sinkCalls(second.counts), freshness };
    expect(run).toStrictEqual({ status: "completed", textReturned: true, preview: 1, sinks: 0 });
    expect(resume).toStrictEqual({ status: "completed", textReturned: true, replayedNodeCount: 1, preview: 0, sinks: 0, freshness: ["stale"] });
    // The settle's own control: the same script over a deferring preview completes before its three sink invokes land (DEFER_MS after
    // the run returned); only the re-read after the settle counts them.
    const deferring = sessionRegistry(ACTION_ENVELOPE, { deferring: true });
    const deferredRun = await runWorkflow({ script, host: claudeHost(deferring.registry, HOST_GRANTS) });
    const immediate = sinkCalls(deferring.counts);
    deferring.release();
    await waitSettle();
    const deferredControl = { status: deferredRun.status, preview: deferring.counts.preview, sinks: { atReturn: immediate, settled: sinkCalls(deferring.counts) } };
    expect(deferredControl, "the deferred control: counted only after the settle").toStrictEqual({ status: "completed", preview: 1, sinks: { atReturn: 0, settled: 3 } });
    return { run, nodeRows, resume, deferredControl };
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
    // G10's shape (F1): the same invokes scheduled DEFER_MS past the adapter's return - every one lands after the last pass, and the
    // re-read after the settle counts them all.
    const defersSinkInvoke: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      deferSinkInvokes(env.registry, outputTextOf(reading), DEFER_MS);
      return notes;
    };
    const invoked = await observe(invokesNamedSink);
    const reread = await observe(rereadsPreview);
    const deferred = await observe(defersSinkInvoke);
    const witness = {
      invokesNamedSink: violationsOf(invoked), sinkCalls: invoked.providerCalls.sinks, rereadsPreview: violationsOf(reread), previewCalls: reread.providerCalls.preview,
      defersSinkInvoke: violationsOf(deferred), deferredSinkCalls: { late: deferred.late.sinks, total: deferred.providerCalls.sinks },
    };
    expect(witness).toStrictEqual({
      invokesNamedSink: ["invoke"], sinkCalls: 9, rereadsPreview: ["invoke"], previewCalls: 3, defersSinkInvoke: ["invoke"], deferredSinkCalls: { late: 9, total: 9 },
    });
    return witness;
  },
  C2: async () => {
    const permitsNamedVerb: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      const text = outputTextOf(reading);
      for (const verb of VERBS) if (text.includes(`${CONTROL_TOOL} ${verb} ${RUN.id}`)) env.decide(controlRequest(RUN, verb));
      return notes;
    };
    // The same permit scheduled DEFER_MS past the adapter's return (F1): the re-read after the settle counts it.
    const defersPermit: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      const text = outputTextOf(reading);
      for (const verb of VERBS) {
        if (text.includes(`${CONTROL_TOOL} ${verb} ${RUN.id}`)) setTimeout(() => env.decide(controlRequest(RUN, verb)), DEFER_MS);
      }
      return notes;
    };
    const observation = await observe(permitsNamedVerb, { passes: 1 });
    const deferred = await observe(defersPermit, { passes: 1 });
    const witness = { violations: violationsOf(observation), permits: observation.permits, defersPermit: violationsOf(deferred), deferredPermits: { late: deferred.late.permits, total: deferred.permits } };
    expect(witness).toStrictEqual({ violations: ["permit"], permits: 1, defersPermit: ["permit"], deferredPermits: { late: 1, total: 1 } });
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
    // The same tool call scheduled DEFER_MS past the adapter's return (F1): the re-read after the settle counts the call and its invoke.
    const defersToolCall: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      const [sink] = SINKS;
      if (sink !== undefined && outputTextOf(reading).includes(`capability_invoke ${sink.id}`)) {
        setTimeout(() => {
          env.tools.call("capability_invoke", { capabilityId: sink.id, capabilityVersion: "1.0.0", input: {} }).catch(() => undefined);
        }, DEFER_MS);
      }
      return notes;
    };
    const observation = await observe(callsNamedTool, { passes: 1 });
    const deferred = await observe(defersToolCall, { passes: 1 });
    const witness = {
      violations: violationsOf(observation), toolCalls: observation.toolCalls, sinkCalls: observation.providerCalls.sinks,
      defersToolCall: violationsOf(deferred), deferredCalls: { late: [deferred.late.toolCalls, deferred.late.sinks], total: [deferred.toolCalls, deferred.providerCalls.sinks] },
    };
    expect(witness).toStrictEqual({
      violations: ["invoke", "tool-call"], toolCalls: 1, sinkCalls: 1, defersToolCall: ["invoke", "tool-call"], deferredCalls: { late: [1, 1], total: [1, 1] },
    });
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
    // The executed claim scheduled DEFER_MS past the adapter's return (F1): the settled reads see the furnace run change, and the read
    // after the settle differs from every pass's.
    const defersExecuted: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      if (outputTextOf(reading).includes(EXECUTED_CLAIM)) {
        setTimeout(() => {
          projection.refresh({ ...snapshotOf(RUN), capturedAt: LATER, observedAt: LATER, node: { title: `furnace run ${RUN.id}`, type: "sdk-operation", statusText: "stopped", statusTone: "success" } });
        }, DEFER_MS);
      }
      return notes;
    };
    const witness = {
      recordsExecuted: violationsOf(await observe(recordsExecuted)), notesClaim: violationsOf(await observe(notesClaim)),
      statusClaim: violationsOf(await observe(statusClaim)), restamps: violationsOf(await observe(restamps)), defersExecuted: violationsOf(await observe(defersExecuted)),
    };
    expect(witness).toStrictEqual({
      recordsExecuted: ["executed"], notesClaim: ["surfaced"], statusClaim: ["surfaced"], restamps: ["unstable"], defersExecuted: ["executed", "unstable"],
    });
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
    // R-LATE's pinned quiet row: the same invokes, held by the adapter and landing only once the observation is over (after its
    // settle and every re-read, whatever the load), escape the checker - and do land, later.
    let lateCounts: Counts | undefined;
    const heldLate: Array<() => void> = [];
    const defersPastSettle: Adapter = async (reading, projection, env) => {
      const notes = await PI_READER(reading, projection, env);
      lateCounts = env.counts;
      const text = outputTextOf(reading);
      heldLate.push(() => deferSinkInvokes(env.registry, text, DEFER_MS));
      return notes;
    };
    const quiet = {
      fivePasses: violationsOf(await observe(PI_READER, { passes: 5 })),
      plainReading: violationsOf(await observe(PI_READER, { reading: PLAIN_READING })),
      copies: violationsOf(await observe(copies)),
      readsOnly: violationsOf(await observe(readsOnly)),
      decidesDirectly: violationsOf(await observe(decidesDirectly)),
    };
    const pastSettle = violationsOf(await observe(defersPastSettle, { passes: 1 }));
    const atObservation = lateCounts === undefined ? -1 : sinkCalls(lateCounts);
    for (const release of heldLate.splice(0)) release();
    await waitSettle();
    const rLate = { violations: pastSettle, atObservation, landedLater: (lateCounts === undefined ? -1 : sinkCalls(lateCounts)) - atObservation };
    expect(direct, "the direct core call minted its permit on every pass").toBe(3);
    expect(Object.values(quiet)).toEqual(Object.keys(quiet).map(() => []));
    expect(rLate, "R-LATE: deferred past the settle, quiet at the observation, landed later").toStrictEqual({ violations: [], atObservation: 0, landedLater: 3 });
    return { ...quiet, rLate };
  },
};

describe("wb-tz4r.7 RI inference execution census (RI-UNIFIED-DECISION-INFERENCE-R7, standing posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", { timeout: 60_000 }, () => {
    const held = roster();
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      held.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, followUp: FOLLOW_UP, settleMs: SETTLE_MS, riPin: RI_PIN, riProbe: RI_PROBE, rcPin: RC_PIN, rfVersion: RF_VERSION, actionTextSha256: sha256(ACTION_TEXT),
      readers: [...READERS], authorityModules: [...AUTHORITY_MODULES], authorityCalls: [...AUTHORITY_CALLS], authorityMembers: [...AUTHORITY_MEMBERS], gateProbes: { ...GATE_PROBES },
      sinks: SINKS.map(sink => ({ ...sink })), verbs: [...VERBS], toolNames: [...TOOL_NAMES],
    }).toStrictEqual({
      bead: held.bead, followUp: held.followUp, settleMs: held.settleMs, riPin: held.riPin, riProbe: held.riProbe, rcPin: held.rcPin, rfVersion: held.rfVersion,
      actionTextSha256: held.actionTextSha256, readers: [...held.readers], authorityModules: [...held.authorityModules], authorityCalls: [...held.authorityCalls],
      authorityMembers: [...held.authorityMembers], gateProbes: { ...held.gateProbes }, sinks: held.sinks.map(sink => ({ ...sink })), verbs: [...held.verbs], toolNames: [...held.toolNames],
    });
    // F6: every pin's own assertion count is held once, in row order, and none is zero.
    expect(held.counted.map(entry => entry.slice(0, entry.indexOf(":"))), "the counted pins, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect(held.counted.filter(entry => !/^[A-Z]\d:[1-9]\d*$/.test(entry)), "counted entries that are not `<pin>:<n>`, n >= 1").toEqual([]);
    // F2: the rows are held to anchors outside this file and its roster - the bead store export's row for this census's bead. Every
    // label is its acceptance clause, verbatim; the frozen shape and every row's pins are the ones the landed delivery note states.
    const filed = exportRow(BEAD);
    expect(ROWS.map(row => row.label), "each row label against its acceptance clause in the bead's export row").toEqual(acceptanceClauses(filed));
    const landed = landedRows(filed);
    expect(landed.shape, "the frozen shape the landed delivery note states").toEqual(ROWS.map(row => `${row.id}:${row.pins.length}`));
    expect(landed.pins, "the pins the landed delivery note names under each row").toStrictEqual(Object.fromEntries(ROWS.map(row => [row.id, [...row.pins]])));
    // F1: the deferred pins are the probes the follow-up's own export row names as surviving, each mapped to a member of a judged pin.
    expect(leadProbes(exportRow(FOLLOW_UP)), "the probes wb-3rx7's lead finding names").toEqual(Object.keys(GATE_PROBES));
    const unpinned = Object.values(GATE_PROBES).filter(member => {
      const [pin = "", key = ""] = member.split(" ");
      const witness = ROWS.some(row => row.pins.includes(pin)) ? rosterWitness(pin) : null;
      return !(isObject(witness) && Object.hasOwn(witness, key));
    });
    expect(unpinned, "probe members that are no key of a judged pin's witness").toEqual([]);
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
          // F6: the case runs with the roster sealed and its own assertions counted - a copy of the expected witness reads the roster
          // (refused) or asserts nothing (a count the roster does not hold).
          const before = expect.getState().assertionCalls;
          rosterSealed = true;
          let witness: JsonValue = null;
          try {
            witness = impl === undefined ? null : await impl();
          } finally {
            rosterSealed = false;
          }
          const own = expect.getState().assertionCalls - before;
          expect(witness, `witness ${pin}: ${JSON.stringify(witness)}`).toStrictEqual(rosterWitness(pin));
          expect(`${pin}:${own}`, "the case's own assertion count").toBe(countedEntry(pin));
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
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...roster().tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
