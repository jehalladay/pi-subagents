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
 * wb-vxhz (the R694 follow-up of landing 345, gate cmd_938275116d89) cures B6's launcher scan against that gate's survivors: F1 the
 * five child_process forms planted inside the reader closure (an inline require, an awaited import(), a namespace element access, an
 * import().then callback, a createRequire-made require) are resolved through any child_process-valued expression, and F2 a launcher
 * invoked through .call (or .apply, or an immediately invoked .bind) and code compiled from a string are killed; what stays
 * invisible is named in R-COMPOSED-NAME and R-UNLISTED with its quiet rows.
 * wb-13ws (the R694 follow-up of landing 446, gate cmd_d1c1714c0320) answers that gate's F1 and F2, and the two F3 members, in the
 * enumerate-the-resolvable form: B6's claim lists EXACTLY the binding, loader and value forms its scan resolves (scanPorts' list:
 * F1 an assignment to a name or an object pattern and a parameter's or destructured element's default; F2 a require or
 * getBuiltinModule member, a loader through .call, .apply or .bind, a comma, a conditional or a logical operator, and every binding
 * of a literal name), each with a kill control, and every known form it does not resolve is a named residual member with a pinned
 * quiet row (R-FLOWED, R-CROSS-MODULE, and new members of R-COMPOSED-NAME and R-UNLISTED).
 * wb-13ws cut #2 (refusal #1, U1: a literal-bound let or var name a loop head rewrote read as its literal, so three landed kills
 * survived) reads every write a name can take - a for-of, for-in or for-await-of head, ++ and --, and every declaration that binds
 * no string, beside the declarations, parameters, binding elements, assignments, assignment patterns and catch bindings already
 * read - and keeps the landed readings beside the widened ones (the landed constStrings and literalOf, verbatim, read for every
 * program; a callee spelled as a launcher name is a launcher call whatever binds it); each write form has a kill control whose
 * outer const holds the kept landed reading at "rf". It pins the gate's MU-a..MU-h members (F1), kills a loader's stored .bind
 * (F2) and names the loader flow (R-FLOWED), a loop head's element name (R-COMPOSED-NAME) and the scope-blind read (R-SCOPE-BLIND)
 * as residual members with pinned quiet rows.
 * wb-13ws cut #3 (refusal #2, U1: the launcher-binding map kept one launcher per name, the last binding in any scope winning, so a
 * destructuring elsewhere rebound a launcher-bound name to a non-launcher member and its launches vanished - cut #2's "a landed
 * kill is never a survivor" was measured false there) makes every map B6's reading writes add-only and every reading a union: the
 * launcher-binding map keeps every launcher any binding gives a name (a later binding, in any scope, never replaces an earlier
 * one), stringBindings appends every write's values, the module, loader and createRequire holder sets only grow, and a launcher
 * call's programs are the union over every reading of its callee - direct, through .call or .apply, or through an immediately
 * invoked .bind (seat-found, the same class: the first reading had hidden the landed .call or .apply reading when a widened element
 * name also resolved to a launcher). Every reading the landed census's B6 makes is one this reading makes - each binding of the
 * module, a loader or a createRequire, each launcher it reads a name as (a binding kept, or the name's own launcher spelling: the
 * landed reading binds a rest element or an unread key to the element's own name), each load and each launch with its program -
 * so B6 reads every port the landed reading reads: each network and global name, each dynamic load or compiler, every program of
 * every launch and every relative specifier it walks, a superset on every output. The
 * one landed red a widening can clear is a non-vacuity floor (the real closure's launches ["rf"], its module floor or its
 * anchors) met by a launch or a module only the widened reading reads, which is a reading gained, not a port lost. Each
 * rebinding form (the gate's OV01-OV10, its OV13 order and three seat members), each competing reading and a computed key whose
 * writes give a non-launcher and a launcher have a kill control, the gate's MPN1, MPN3-MPN6 and MUP1 members (F1) have one each,
 * and a write of the global through globalThis is named in R-SCOPE-BLIND with a pinned quiet row.
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
 *    the module name whole), no load of a non-literal specifier (import(), or a call of require, of a name bound to a loader, of a
 *    createRequire call's result or of a require or getBuiltinModule member of any value, made directly, through .call or .apply,
 *    or through an immediately invoked .bind), no code compiled from a string (an eval or Function global as an identifier, a
 *    property name included, or an exact string literal), and every child_process launcher call launches only "rf" - EXACTLY the
 *    launcher, module, loader, binding and value forms scanPorts lists are read, each module on its own: a launcher name (whatever
 *    a destructuring binds the name to: the landed reading kept) or a launcher member (a property or a resolved element name) of a
 *    child_process value (a name bound to the module, a load of a
 *    child_process specifier, or its default), called directly, through .call or .apply, or through an immediately invoked .bind;
 *    a name bound to the module or a loader by an import clause or import-equals, a declaration's initializer, a parameter's or
 *    destructured element's default, an assignment (=, ||=, &&= or ??=) to the name or to an object pattern, or a then-callback's
 *    first parameter, at any depth, read to a fixpoint (a loader's .bind, stored, binds a loader); a name bound to a launcher only
 *    by a named import or a destructuring of a
 *    child_process value (its default, rest, nested default and computed keys read), every launcher any of its bindings names
 *    kept (a later binding, in any scope, never replaces an earlier one); a launch's programs the union over every reading of its
 *    callee (direct, .call, .apply, .bind); every value read through
 *    parentheses, awaits, type assertions, a comma's last operand, either branch of a conditional and either operand of &&, || and
 *    ??; and a program, element name or specifier resolved to every literal any write of the module gives the name - a
 *    declaration, a parameter or binding element, an assignment or assignment pattern, a for-of, for-in or for-await-of head, a
 *    catch binding, ++ or --, and a declaration that binds no string (a function, class, enum, enum member or namespace, a named
 *    function or class expression, an import binding) - every non-literal write composed (a parameter shadowing a literal-bound
 *    name reads composed), and every program also read as the landed census reads it (the literal its node spells or the last
 *    const binding of its bare name gives, composed otherwise); every map the reading writes only grows and every reading the
 *    landed census makes is made, so every port the landed reading reads is read (a superset on every output); B7 the seam B2
 *    and B3 read is
 *    test-reachable only: no src module
 *    but the provider spells registerReactiveFiberRender
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
 * at runtime (a concatenation splitting the word across literals; a launcher read into a variable - const run = cp.spawn, const
 * run = spawn, a stored .bind; a launcher reached through a wrapper - Reflect.apply, a promise chain past its first then, a
 * callback passed by name; an element name a write of the module gives no string literal, a parameter's or a loop head's) is
 * invisible to B6 and B7 (B6's splitName, wrappedLauncher, launcherAlias, storedBind, reflectApply, promiseChain, callbackByName,
 * paramElement and loopElement controls and B7's splitName control stay quiet); R-UNLISTED a port outside the listed network globals, network modules, code
 * compilers and child_process launchers (a worker, a native addon, process.binding, node:vm, a compiler reached through a
 * function's constructor, a data: URL module) is not read by B6 (its unlisted, vmCompile, constructorCompile and dataImport
 * controls stay quiet); R-FLOWED a child_process value or a loader that flows through data or across a call - held in an object or
 * an array (a property, an element, an array destructuring), handed to a function as an argument other than the then-callback
 * parameter B6 reads, or returned from one - is not followed by B6 (its objHolder, argument, returned, arrayHeld, loaderHolder,
 * loaderReturned and loaderArgument controls stay quiet);
 * R-CROSS-MODULE B6 reads each module on its own, so a launcher or the child_process module reaching a module through another
 * module's export - a re-export from child_process included - is not followed (its reexportFrom and reexportImport controls stay
 * quiet; an imported program name reads composed); R-SCOPE-BLIND B6 resolves a name through every write of the module whatever
 * scope reads it, so a name read where no binding of the module encloses it (a global) reads that name's writes elsewhere, a
 * const's "rf" included (its unscopedConst control stays ["rf"]; the kept landed reading reads a let's composed, the
 * unscopedLet kill), and a write of that global made through globalThis - a property write, not a write of the name - is not
 * read (its globalThisWrite control stays ["rf"]); the launcher-binding map is scope-blind too, so a name any binding binds to a
 * launcher is a launcher callee in every scope (an over-reading, never an escape); R-UNMARKED-READER an rf reader registered with
 * none of A2's three markers is
 * invisible to A2 (its unmarked control stays 0).
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
/** node:module, whose createRequire makes a require function (wb-vxhz F1). */
const MODULE_MODULE = /^(?:node:)?module$/;
/** The globals that compile code from a string, a port named inside the string being invisible to a static scan (wb-vxhz F2). */
const CODE_COMPILERS = ["eval", "Function"];
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
  "R-FLOWED": ["B6"],
  "R-CROSS-MODULE": ["B6"],
  "R-SCOPE-BLIND": ["B6"],
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

/** The landed program reading, kept verbatim beside the widened one (wb-13ws class-level guard): a program reads the literal its
 * node spells or the last const binding of its bare name gives, composed otherwise, so every program the landed reading reads is
 * read. */
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
/** The name a declaration that binds no string writes (wb-13ws class-level guard): a function, class, enum or namespace
 * declaration, a named function or class expression, an enum member and every import binding (default, namespace, named or
 * import-equals); undefined for any other node. */
function nonStringBinding(node: ts.Node): string | undefined {
  if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isFunctionExpression(node) || ts.isClassExpression(node) || ts.isImportClause(node)) {
    return node.name?.text;
  }
  if (ts.isEnumDeclaration(node) || ts.isNamespaceImport(node) || ts.isImportSpecifier(node) || ts.isImportEqualsDeclaration(node)) return node.name.text;
  if ((ts.isModuleDeclaration(node) || ts.isEnumMember(node)) && ts.isIdentifier(node.name)) return node.name.text;
  return undefined;
}
/** The assignment operators that bind their left side to the value of their right side (wb-13ws F1). */
const BINDING_ASSIGNMENTS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.AmpersandAmpersandEqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
]);
/** The operators whose value is either operand (wb-13ws F2). */
const EITHER_OPERAND = new Set<ts.SyntaxKind>([ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken]);
/** A value a binding gives a name: a string literal, the name it aliases, or null for any other value. */
type BoundValue = string | { readonly alias: string } | null;
/** One entry a destructuring reads: the names its key resolves to, the target it binds and whether it is the rest. */
interface PatternEntry {
  readonly names: string[];
  readonly target: ts.Node;
  readonly rest: boolean;
}

/** An expression with its parentheses, awaits, type assertions (as, satisfies, a non-null or an angle-bracket assertion) and every
 * comma operand but the last removed. */
function unwrapped(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAwaitExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) ||
    ts.isNonNullExpression(current) || ts.isTypeAssertionExpression(current) || (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.CommaToken)) {
    current = ts.isBinaryExpression(current) ? current.right : current.expression;
  }
  return current;
}
/** The values an expression can take, each unwrapped: either branch of a conditional and either operand of &&, || and ?? (wb-13ws
 * F2). */
function alternativesOf(node: ts.Expression): ts.Expression[] {
  const value = unwrapped(node);
  if (ts.isConditionalExpression(value)) return [...alternativesOf(value.whenTrue), ...alternativesOf(value.whenFalse)];
  if (ts.isBinaryExpression(value) && EITHER_OPERAND.has(value.operatorToken.kind)) return [...alternativesOf(value.left), ...alternativesOf(value.right)];
  return [value];
}
/** A module's string bindings: for every name, each value every write of the module gives it, in source order - a declaration's
 * initializer (const, let or var, a for-in or for-of declaration head and a catch binding included; a declaration without one
 * gives null), a parameter or destructured element (null for the value it is handed, then its default), an assignment (=, ||=, &&=
 * and ??= give the right side's values, any other assignment operator null; an object or array assignment pattern gives each name
 * it writes null), a for-of, for-in or for-await-of head that declares nothing (an identifier or an assignment pattern: each name
 * it writes null, wb-13ws U1), ++ and -- (null), and a declaration that binds no string (nonStringBinding: null). A value is a
 * string literal, the name it aliases, or null. */
function stringBindings(source: ts.SourceFile): Map<string, BoundValue[]> {
  const bindings = new Map<string, BoundValue[]>();
  const add = (name: string, values: readonly BoundValue[]): void => {
    bindings.set(name, [...(bindings.get(name) ?? []), ...values]);
  };
  const valuesOf = (node: ts.Expression): BoundValue[] =>
    alternativesOf(node).map(leaf => (ts.isStringLiteralLike(leaf) ? leaf.text : ts.isIdentifier(leaf) ? { alias: leaf.text } : null));
  /** Every name an assignment pattern writes gets null (a default inside it is an assignment of its own). */
  const patternNames = (target: ts.Expression): void => {
    const value = unwrapped(target);
    if (ts.isIdentifier(value)) add(value.text, [null]);
    else if (ts.isObjectLiteralExpression(value)) {
      for (const property of value.properties) {
        if (ts.isPropertyAssignment(property)) patternNames(property.initializer);
        else if (ts.isShorthandPropertyAssignment(property)) add(property.name.text, [null]);
        else if (ts.isSpreadAssignment(property)) patternNames(property.expression);
      }
    } else if (ts.isArrayLiteralExpression(value)) {
      for (const element of value.elements) patternNames(ts.isSpreadElement(element) ? element.expression : element);
    } else if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.EqualsToken) patternNames(value.left);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) add(node.name.text, node.initializer === undefined ? [null] : valuesOf(node.initializer));
    if ((ts.isParameter(node) || ts.isBindingElement(node)) && ts.isIdentifier(node.name)) {
      add(node.name.text, [null, ...(node.initializer === undefined ? [] : valuesOf(node.initializer))]);
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && node.operatorToken.kind <= ts.SyntaxKind.LastAssignment) {
      const left = unwrapped(node.left);
      if (ts.isIdentifier(left)) add(left.text, BINDING_ASSIGNMENTS.has(node.operatorToken.kind) ? valuesOf(node.right) : [null]);
      else patternNames(left);
    }
    if (ts.isShorthandPropertyAssignment(node) && node.objectAssignmentInitializer !== undefined) add(node.name.text, valuesOf(node.objectAssignmentInitializer));
    // wb-13ws U1: a for-of, for-in or for-await-of head that declares nothing writes every name it binds (an identifier or an
    // assignment pattern) null.
    if ((ts.isForOfStatement(node) || ts.isForInStatement(node)) && !ts.isVariableDeclarationList(node.initializer)) patternNames(node.initializer);
    // The class-level guard: ++ and -- write a number to the name they update, and a declaration that binds no string writes null.
    if ((ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) && (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken)) {
      const operand = unwrapped(node.operand);
      if (ts.isIdentifier(operand)) add(operand.text, [null]);
    }
    const declared = nonStringBinding(node);
    if (declared !== undefined) add(declared, [null]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return bindings;
}

interface PortScan {
  readonly network: string[];
  readonly globals: string[];
  readonly dynamic: string[];
  readonly launches: string[];
  readonly local: string[];
}
/** One module's ports, the module read on its own (R-CROSS-MODULE): every identifier (a property name included) or exact string
 * literal naming a network global; every exact string literal naming a network module; as dynamic, every load whose specifier is
 * not an exact string literal and every identifier (a property name included) or exact string literal naming a code compiler (eval,
 * Function); the programs of every child_process launcher call; and its relative module specifiers. EXACTLY these forms are read:
 *  - a load is import() or a call of a loader - require, a name bound to a loader, a createRequire call's result, or a require or
 *    getBuiltinModule member of any value - made directly, through .call or .apply, or through an immediately invoked .bind (wb-13ws
 *    F2);
 *  - a launcher call is a call of one of the seven launcher names (whatever a destructuring binds the name to: the landed reading
 *    kept, wb-13ws), of a name bound to a launcher, or of a launcher member (a property
 *    or a resolved element name) of a child_process value, made directly, through .call or .apply, or through an immediately invoked
 *    .bind; its programs are the literals its program argument resolves to, "<composed>" for each alternative resolving to none,
 *    the union over every reading of the callee (direct, .call, .apply, .bind: no reading hides another, wb-13ws cut #3);
 *  - a child_process value is a name bound to the module, a load whose specifier resolves to child_process, or its default;
 *  - a name is bound to the module, a loader or a createRequire by an import clause or import-equals (child_process, or
 *    node:module's createRequire), a declaration's initializer, a parameter's or destructured element's default, an assignment (=,
 *    ||=, &&= or ??=) to the name or to an object pattern, or the first parameter of a then-callback on a child_process value, at any
 *    depth and read to a fixpoint (a binding read above its declaration included) (wb-13ws F1); a loader's .bind, stored, binds a
 *    loader, its call reading its own first argument as the specifier (wb-13ws F2);
 *  - a name is bound to a launcher only by a named import from child_process or by a destructuring of a child_process value, whose
 *    default and rest bind the module (a pattern under default destructures the module again) and whose every other property, a
 *    computed key resolved, binds the launcher it names - every launcher any binding gives a name is kept (a later binding, in any
 *    scope, never replaces an earlier one, wb-13ws cut #3); a destructuring of any value binds a require or getBuiltinModule property
 *    as a loader and a createRequire property as a createRequire; a launcher read into a variable is R-COMPOSED-NAME;
 *  - every expression is read through parentheses, awaits, type assertions (as, satisfies, a non-null or an angle-bracket assertion),
 *    the last operand of a comma, either branch of a conditional and either operand of &&, || and ?? (wb-13ws F2);
 *  - a program, element name, computed key or specifier resolves to each exact string literal it spells and, for a name, to every value
 *    every write of the module gives that name (stringBindings, aliases followed), null (composed) for any other value, so a
 *    parameter shadowing a literal-bound name reads composed (wb-13ws F2); a program is also read as the landed census reads it
 *    (literalOf over constStrings: the literal its node spells or the last const binding of its bare name gives, composed
 *    otherwise) (wb-13ws U1);
 *  - every map this reading writes only grows - stringBindings appends each write's values, the launcher-binding map keeps every
 *    launcher, and the module, loader and createRequire holder sets add - and every reading the landed census makes (a binding of
 *    the module, a loader or a createRequire; a launcher a name is read as, bound or spelled; a load; a launch and its program) is
 *    one this reading makes, so every port the landed reading reads is read (wb-13ws cut #3, the class-level guard).
 * What it does not read is named in R-COMPOSED-NAME, R-UNLISTED, R-FLOWED, R-CROSS-MODULE and R-SCOPE-BLIND, each with its quiet
 * rows. */
function scanPorts(fileName: string, text: string): PortScan {
  const source = sourceOf(fileName, text);
  const network: string[] = [];
  const globals: string[] = [];
  const dynamic: string[] = [];
  const launches: string[] = [];
  const local: string[] = [];
  /** Names bound to a launcher (the local name and every launcher any of its bindings names, kept: a later binding, in any scope,
   * never replaces an earlier one, wb-13ws cut #3), and names holding the child_process module. */
  const bound = new Map<string, Set<string>>();
  const bindLauncher = (name: string, launcher: string): void => {
    bound.set(name, new Set([...(bound.get(name) ?? []), launcher]));
  };
  const spaces = new Set<string>();
  /** Names holding node:module's createRequire, and names holding a require function. */
  const makers = new Set<string>(["createRequire"]);
  const requirers = new Set<string>(["require"]);
  const bindings = stringBindings(source);
  /** The landed program reading's bindings (constStrings), kept beside the widened ones. */
  const landedBindings = constStrings(source);
  /** The literals a name resolves to: every value its bindings give it, aliases followed (a name already on the path adds nothing),
   * null for any value that is not a literal; an unbound name is null. */
  const resolved = (name: string, path: ReadonlySet<string>): (string | null)[] => {
    if (path.has(name)) return [];
    const values = bindings.get(name);
    if (values === undefined) return [null];
    const next = new Set([...path, name]);
    return values.flatMap(value => (value === null || typeof value === "string" ? [value] : resolved(value.alias, next)));
  };
  /** The literals an expression spells, for each alternative: a string literal's text, a name's resolved literals, null otherwise. */
  const literalsOf = (node: ts.Expression | undefined): (string | null)[] => {
    if (node === undefined) return [null];
    const values = alternativesOf(node).flatMap(leaf => (ts.isStringLiteralLike(leaf) ? [leaf.text] : ts.isIdentifier(leaf) ? resolved(leaf.text, new Set()) : [null]));
    return values.length > 0 ? values : [null];
  };
  const namesOf = (node: ts.Expression): string[] => literalsOf(node).filter((value): value is string => value !== null);
  /** The names a member access reads: a property name, or the literals an element access's argument resolves to. */
  const memberNames = (node: ts.Expression): string[] => {
    if (ts.isPropertyAccessExpression(node)) return [node.name.text];
    if (ts.isElementAccessExpression(node)) return namesOf(node.argumentExpression);
    return [];
  };
  const receiverOf = (node: ts.Expression): ts.Expression | undefined =>
    ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node) ? node.expression : undefined;
  /** A createRequire: a name holding one, or a createRequire member of any value. */
  const isMaker = (leaf: ts.Expression): boolean =>
    ts.isIdentifier(leaf) ? makers.has(leaf.text) : receiverOf(leaf) !== undefined && memberNames(leaf).includes("createRequire");
  /** True for a call of a createRequire (any alternative of its callee). */
  const makesRequire = (call: ts.CallExpression): boolean => alternativesOf(call.expression).some(isMaker);
  /** A loader: a name holding a require function, a createRequire call's result, or a require or getBuiltinModule member of any
   * value. */
  const isLoader = (leaf: ts.Expression): boolean => {
    if (ts.isIdentifier(leaf)) return requirers.has(leaf.text);
    if (ts.isCallExpression(leaf)) return makesRequire(leaf);
    const names = memberNames(leaf);
    return receiverOf(leaf) !== undefined && (names.includes("require") || names.includes("getBuiltinModule"));
  };
  /** A loader's .bind call: a bind member of a loader, called (wb-13ws F2: stored, it binds a loader). */
  const bindsLoader = (leaf: ts.Expression): leaf is ts.CallExpression => {
    if (!ts.isCallExpression(leaf)) return false;
    const binder = unwrapped(leaf.expression);
    const loader = receiverOf(binder);
    return loader !== undefined && memberNames(binder).includes("bind") && alternativesOf(loader).some(isLoader);
  };
  /** The specifier of a load (undefined for any other call, null for a load with no specifier expression): import(), or a loader
   * called directly, through .call or .apply, or through an immediately invoked .bind. */
  const loadSpecifier = (call: ts.CallExpression): ts.Expression | null | undefined => {
    if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return call.arguments[0] ?? null;
    const leaves = alternativesOf(call.expression);
    if (leaves.some(isLoader)) return call.arguments[0] ?? null;
    for (const leaf of leaves) {
      const target = receiverOf(leaf);
      if (target !== undefined && alternativesOf(target).some(isLoader)) {
        const via = memberNames(leaf);
        if (via.includes("call")) return call.arguments[1] ?? null;
        if (via.includes("apply")) {
          const list = call.arguments[1];
          return list !== undefined && ts.isArrayLiteralExpression(list) ? (list.elements[0] ?? null) : null;
        }
      }
      if (bindsLoader(leaf)) return leaf.arguments[1] ?? call.arguments[0] ?? null;
    }
    return undefined;
  };
  /** A child_process value: a name holding the module, a load whose specifier resolves to child_process, or its default. */
  const isSpace = (leaf: ts.Expression): boolean => {
    if (ts.isIdentifier(leaf)) return spaces.has(leaf.text);
    if (ts.isCallExpression(leaf)) {
      const specifier = loadSpecifier(leaf);
      return specifier !== undefined && specifier !== null && namesOf(specifier).some(name => CHILD_PROCESS.test(name));
    }
    const receiver = receiverOf(leaf);
    return receiver !== undefined && memberNames(leaf).includes("default") && moduleValued(receiver);
  };
  /** True when any alternative of an expression is a child_process value. */
  const moduleValued = (node: ts.Expression): boolean => alternativesOf(node).some(isSpace);
  /** The entries a destructuring reads: a binding pattern's elements or an object assignment pattern's properties. */
  const entriesOf = (pattern: ts.Node): PatternEntry[] => {
    const keyNames = (key: ts.PropertyName): string[] => (ts.isComputedPropertyName(key) ? namesOf(key.expression) : [key.text]);
    if (ts.isObjectBindingPattern(pattern)) {
      return pattern.elements.map((element): PatternEntry => ({
        names: element.propertyName !== undefined ? keyNames(element.propertyName) : ts.isIdentifier(element.name) ? [element.name.text] : [],
        target: element.name,
        rest: element.dotDotDotToken !== undefined,
      }));
    }
    if (!ts.isObjectLiteralExpression(pattern)) return [];
    return pattern.properties.flatMap((property): PatternEntry[] => {
      if (ts.isPropertyAssignment(property)) {
        const value = unwrapped(property.initializer);
        const target = ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.EqualsToken ? unwrapped(value.left) : value;
        return [{ names: keyNames(property.name), target, rest: false }];
      }
      if (ts.isShorthandPropertyAssignment(property)) return [{ names: [property.name.text], target: property.name, rest: false }];
      if (ts.isSpreadAssignment(property)) return [{ names: [], target: unwrapped(property.expression), rest: true }];
      return [];
    });
  };
  /** A destructuring of a value: of a child_process value, its rest and its default hold the module (a pattern under default
   * destructures the module again) and any other property names a launcher; of any value, a require or getBuiltinModule property
   * is a loader and a createRequire property a createRequire. */
  const destructure = (pattern: ts.Node, fromModule: boolean): void => {
    for (const { names, target, rest } of entriesOf(pattern)) {
      if (!ts.isIdentifier(target)) {
        if (fromModule && names.includes("default")) destructure(target, true);
        continue;
      }
      if (fromModule && (rest || names.includes("default"))) spaces.add(target.text);
      else if (fromModule) for (const name of names) bindLauncher(target.text, name);
      if (names.includes("require") || names.includes("getBuiltinModule")) requirers.add(target.text);
      if (names.includes("createRequire")) makers.add(target.text);
    }
  };
  /** Binds a target to a value: a name becomes a holder of the module, a loader or a createRequire when any alternative of the
   * value is one; a pattern destructures the value. */
  const bindTo = (target: ts.Node, value: ts.Expression): void => {
    const leaves = alternativesOf(value);
    if (ts.isIdentifier(target)) {
      if (leaves.some(isSpace)) spaces.add(target.text);
      if (leaves.some(leaf => isLoader(leaf) || bindsLoader(leaf))) requirers.add(target.text);
      if (leaves.some(isMaker)) makers.add(target.text);
    } else destructure(target, leaves.some(isSpace));
  };
  const bind = (node: ts.Node): void => {
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression) &&
      CHILD_PROCESS.test(node.moduleReference.expression.text)) spaces.add(node.name.text);
    if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier)) {
      const clause = node.importClause;
      const named = clause?.namedBindings;
      const elements = named !== undefined && ts.isNamedImports(named) ? named.elements : [];
      if (CHILD_PROCESS.test(node.moduleSpecifier.text)) {
        if (clause?.name !== undefined) spaces.add(clause.name.text);
        if (named !== undefined && ts.isNamespaceImport(named)) spaces.add(named.name.text);
        for (const element of elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (imported === "default") spaces.add(element.name.text);
          else bindLauncher(element.name.text, imported);
        }
      }
      if (MODULE_MODULE.test(node.moduleSpecifier.text)) {
        for (const element of elements) if ((element.propertyName ?? element.name).text === "createRequire") makers.add(element.name.text);
      }
    }
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) bindTo(node.name, node.initializer);
    if ((ts.isParameter(node) || ts.isBindingElement(node)) && node.initializer !== undefined) bindTo(node.name, node.initializer);
    if (ts.isBinaryExpression(node) && BINDING_ASSIGNMENTS.has(node.operatorToken.kind)) bindTo(unwrapped(node.left), node.right);
    if (ts.isShorthandPropertyAssignment(node) && node.objectAssignmentInitializer !== undefined) bindTo(node.name, node.objectAssignmentInitializer);
    if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      const receiver = receiverOf(callee);
      const callback = node.arguments[0];
      if (memberNames(callee).includes("then") && receiver !== undefined && moduleValued(receiver) && callback !== undefined &&
        (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))) {
        const parameter = callback.parameters[0]?.name;
        if (parameter !== undefined && ts.isIdentifier(parameter)) spaces.add(parameter.text);
        if (parameter !== undefined && ts.isObjectBindingPattern(parameter)) destructure(parameter, true);
      }
    }
    ts.forEachChild(node, bind);
  };
  // A binding can be read above its declaration (imports hoist), so the bindings are read to a fixpoint.
  const size = (): number => bound.size + spaces.size + makers.size + requirers.size;
  let before = -1;
  while (before !== size()) {
    before = size();
    bind(source);
  }
  /** The launcher a callee names (its first alternative that does): a name any binding binds to one (or named as one), or a launcher
   * member of a child_process value. */
  const launcherOf = (node: ts.Expression): string | undefined => {
    for (const leaf of alternativesOf(node)) {
      if (ts.isIdentifier(leaf)) {
        const name = [...(bound.get(leaf.text) ?? [])].find(launcher => LAUNCHERS.includes(launcher));
        if (name !== undefined) return name;
        if (LAUNCHERS.includes(leaf.text)) return leaf.text;
        continue;
      }
      const receiver = receiverOf(leaf);
      if (receiver === undefined || !moduleValued(receiver)) continue;
      const name = memberNames(leaf).find(member => LAUNCHERS.includes(member));
      if (name !== undefined) return name;
    }
    return undefined;
  };
  /** The programs a launcher call runs (undefined for any other call): the union over every reading of its callee (wb-13ws cut #3:
   * no reading hides another) - called directly, through .call or .apply, or through an immediately invoked .bind (its bound program
   * first, else the call's first argument). */
  const programOf = (call: ts.CallExpression): string[] | undefined => {
    const program = (node: ts.Expression | undefined): string[] => [...literalsOf(node).map(value => value ?? "<composed>"), literalOf(node, landedBindings) ?? "<composed>"];
    const readings: string[][] = [];
    if (launcherOf(call.expression) !== undefined) readings.push(program(call.arguments[0]));
    for (const leaf of alternativesOf(call.expression)) {
      const target = receiverOf(leaf);
      if (target !== undefined && launcherOf(target) !== undefined) {
        const via = memberNames(leaf);
        if (via.includes("call")) readings.push(program(call.arguments[1]));
        if (via.includes("apply")) {
          const list = call.arguments[1];
          readings.push(list !== undefined && ts.isArrayLiteralExpression(list) ? program(list.elements[0]) : ["<composed>"]);
        }
      }
      if (ts.isCallExpression(leaf)) {
        const binder = unwrapped(leaf.expression);
        const bindTarget = receiverOf(binder);
        if (memberNames(binder).includes("bind") && bindTarget !== undefined && launcherOf(bindTarget) !== undefined) readings.push(program(leaf.arguments[1] ?? call.arguments[0]));
      }
    }
    return readings.length > 0 ? [...new Set(readings.flat())] : undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) {
      if (NETWORK_GLOBALS.includes(node.text)) globals.push(`${fileName}: ${node.text}`);
      if (CODE_COMPILERS.includes(node.text)) dynamic.push(`${fileName}: ${node.text}`);
    }
    if (ts.isStringLiteralLike(node)) {
      if (NETWORK_GLOBALS.includes(node.text)) globals.push(`${fileName}: "${node.text}"`);
      if (NETWORK_MODULE.test(node.text)) network.push(`${fileName}: ${node.text}`);
      if (CODE_COMPILERS.includes(node.text)) dynamic.push(`${fileName}: "${node.text}"`);
    }
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier) &&
      node.moduleSpecifier.text.startsWith(".")) local.push(node.moduleSpecifier.text);
    if (ts.isCallExpression(node)) {
      const specifier = loadSpecifier(node);
      if (specifier !== undefined) {
        if (specifier === null || !ts.isStringLiteralLike(specifier)) dynamic.push(`${fileName}: ${node.getText(source)}`);
        else if (specifier.text.startsWith(".")) local.push(specifier.text);
      }
      launches.push(...(programOf(node) ?? []));
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
      // wb-vxhz F1: launchers reached through a child_process-valued expression (the gate's planted N-B6a..N-B6e, then the
      // resolved neighbours), each a kill.
      inlineRequire: control('require("node:child_process").execFile("curl", [producer]);'),
      awaitedImport: control('(await import("node:child_process")).execFile("curl", [producer]);'),
      elementLauncher: control('import * as cp from "node:child_process"; cp["execFile"]("curl", [producer]);'),
      elementConst: control('import * as cp from "node:child_process"; const verb = "spawn"; cp[verb]("curl", []);'),
      thenLauncher: control('import("node:child_process").then(cp => cp.execFile("curl", [producer]));'),
      thenDestructured: control('import("node:child_process").then(({ spawn: run }) => run("curl", []));'),
      createRequireLauncher: control('import { createRequire as make } from "node:module"; const load = make(import.meta.url); load("node:child_process").spawn("curl", [producer]);'),
      inlineCreateRequire: control('import { createRequire } from "node:module"; createRequire(import.meta.url)("node:child_process").spawn("curl", []);'),
      destructuredSpace: control('import * as cp from "node:child_process"; const { execFile: run } = cp; run("curl", [producer]);'),
      defaultForms: control('import { default as a } from "node:child_process"; const { default: b } = await import("node:child_process"); a.spawn("curl", []); b.spawn("curl", []); (await import("node:child_process")).default.spawn("curl", []);'),
      stringKey: control('import * as cp from "node:child_process"; const { "execFile": run } = cp; run("curl", [producer]);'),
      aliasedSpace: control('import * as cp from "node:child_process"; const alias = cp; alias.spawn("curl", []);'),
      assertedSpace: control('import * as cp from "node:child_process"; (cp as typeof cp).spawn("curl", []); (cp satisfies object).spawn("curl", []); cp!.spawn("curl", []); (<typeof cp>cp).spawn("curl", []);'),
      thenFunction: control('import("node:child_process").then(function (cp) { return cp.spawn("curl", []); });'),
      requireAlias: control('const load = require; load("node:child_process").spawn("curl", []);'),
      memberCreateRequire: control('import * as mod from "node:module"; const load = mod.createRequire(import.meta.url); load("node:child_process").spawn("curl", []);'),
      hoistedBinding: control('function go() { const { spawn: run } = alias; return run("curl", []); } const alias = cp; import * as cp from "node:child_process";'),
      // wb-vxhz F2: a launcher invoked through .call, .apply or an immediately invoked .bind, and code compiled from a string, each a
      // kill.
      callLauncher: control('import { execFile as run } from "node:child_process"; run.call(undefined, "curl", [producer]);'),
      applyLauncher: control('import * as cp from "node:child_process"; cp.spawn.apply(cp, ["curl", [producer]]);'),
      bindLauncher: control('import { spawn } from "node:child_process"; spawn.bind(undefined, "curl")([producer]);'),
      codeString: control('new Function("u", "return fetch(u)")(producer);'),
      evalString: control("eval(code);"),
      compilerElement: control('globalThis["Function"]("u", "return fetch(u)")(producer);'),
      composedRequire: control('import { createRequire } from "node:module"; const load = createRequire(import.meta.url); require(moduleName); load(moduleName);'),
      // wb-vxhz quiet rows: R-COMPOSED-NAME (a launcher member stored, or reached through a wrapper) and R-UNLISTED (a compiler
      // outside the listed names) stay invisible.
      storedBind: control('import { spawn } from "node:child_process"; const run = spawn.bind(undefined); run("curl", []);'),
      reflectApply: control('import * as cp from "node:child_process"; Reflect.apply(cp.spawn, cp, ["curl", []]);'),
      promiseChain: control('import("node:child_process").then(m => m).then(cp => cp.spawn("curl", []));'),
      vmCompile: control('import { runInNewContext } from "node:vm"; runInNewContext(code);'),
      constructorCompile: control('(() => undefined).constructor("u", "return fetch(u)")(producer);'),
      // wb-13ws F1: a child_process value bound by an assignment (=, ||=, &&=, ??=) to a name or an object pattern, or by a
      // parameter's or destructured element's default (the gate's G2-assign, G2-assignNs, G2-destrAssign and G2-paramDefault, then
      // the same mechanisms' neighbours: a rest element, a default destructured again, a computed key), each a kill.
      assign: control('let cp; cp = require("node:child_process"); cp.execFile("curl", [producer]);'),
      assignNs: control('import * as cp from "node:child_process"; let alias; alias = cp; alias.execFile("curl", [producer]);'),
      destrAssign: control('import * as cp from "node:child_process"; let run; ({ execFile: run } = cp); run("curl", [producer]);'),
      paramDefault: control('import * as cp from "node:child_process"; function go({ execFile: run } = cp) { return run("curl", [producer]); }'),
      nameDefault: control('import * as cp from "node:child_process"; function go(m = cp) { return m.spawn("curl", []); }'),
      elementDefault: control('import * as cp from "node:child_process"; const { m = cp } = {}; m.spawn("curl", []);'),
      logicalAssign: control('let cp; cp ??= require("node:child_process"); cp.spawn("curl", []);'),
      assignDefault: control('let m; ({ default: m } = await import("node:child_process")); m.spawn("curl", []);'),
      restSpace: control('import * as cp from "node:child_process"; const { ...rest } = cp; rest.spawn("curl", []);'),
      nestedDefault: control('const { default: { spawn: run } } = await import("node:child_process"); run("curl", []);'),
      computedKey: control('import * as cp from "node:child_process"; const verb = "spawn"; const { [verb]: run } = cp; run("curl", []);'),
      // wb-13ws F2: a loader reached as a require or getBuiltinModule member, through .call, .apply or an immediately invoked .bind,
      // or bound by an alias or a destructuring; a value read through a comma, a conditional or a logical operator; an element name
      // a let, an assignment or an alias gives a literal (the gate's G2-getBuiltin, G2-moduleRequire, G2-requireCall, G2-comma,
      // G2-cond and G2-letName, then neighbours), each a kill; and a parameter shadowing a literal-bound program reads composed.
      getBuiltin: control('process.getBuiltinModule("node:child_process").execFile("curl", [producer]);'),
      moduleRequire: control('module.require("node:child_process").execFile("curl", [producer]);'),
      requireCall: control('require.call(undefined, "node:child_process").execFile("curl", [producer]);'),
      requireApply: control('require.apply(undefined, ["node:child_process"]).spawn("curl", []);'),
      requireBind: control('require.bind(undefined, "node:child_process")().spawn("curl", []);'),
      makerAlias: control('import { createRequire } from "node:module"; const make = createRequire; make(import.meta.url)("node:child_process").spawn("curl", []);'),
      destructuredLoader: control('const { getBuiltinModule: load } = process; load("node:child_process").spawn("curl", []);'),
      comma: control('import * as cp from "node:child_process"; (0, cp.execFile)("curl", [producer]);'),
      cond: control('import * as cp from "node:child_process"; (flag ? cp.execFile : cp.spawn)("curl", [producer]);'),
      logical: control('import * as cp from "node:child_process"; (cp.spawn ?? fallback)("curl", []);'),
      condElement: control('import * as cp from "node:child_process"; cp[flag ? "spawn" : "fork"]("curl", []);'),
      letName: control('import * as cp from "node:child_process"; let verb = "execFile"; cp[verb]("curl", [producer]);'),
      assignedName: control('import * as cp from "node:child_process"; let verb = "toString"; verb = "spawn"; cp[verb]("curl", []);'),
      aliasName: control('import * as cp from "node:child_process"; const verb = "spawn"; const name = verb; cp[name]("curl", []);'),
      shadowedProgram: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(tool) { return spawn(tool, []); }'),
      // wb-13ws quiet rows: R-FLOWED (a child_process value held in data or handed across a call), R-CROSS-MODULE (a binding that
      // crosses a module boundary), R-COMPOSED-NAME (a callback passed by name, an element name no binding gives a literal) and
      // R-UNLISTED (a data: URL module) stay invisible.
      objHolder: control('import * as cp from "node:child_process"; const holder = { cp }; holder.cp.execFile("curl", [producer]);'),
      argument: control('import * as cp from "node:child_process"; function go(m) { return m.execFile("curl", [producer]); } go(cp);'),
      returned: control('function load() { return require("node:child_process"); } load().spawn("curl", []);'),
      arrayHeld: control('const [cp] = [require("node:child_process")]; cp.spawn("curl", []);'),
      reexportFrom: control('export { execFile as plantedExecFile } from "node:child_process";'),
      reexportImport: control('import { plantedExecFile as run } from "./process-env.js"; run("curl", [producer]);'),
      launcherAlias: control('import { spawn } from "node:child_process"; const run = spawn; run("curl", []);'),
      callbackByName: control('function useIt(cp) { return cp.execFile("curl", []); } import("node:child_process").then(useIt);'),
      paramElement: control('import * as cp from "node:child_process"; function go(verb) { return cp[verb]("curl", []); }'),
      dataImport: control('await import("data:text/javascript,export default 1");'),
      // wb-13ws U1 (refusal #1, the gate's C01-C06 and P-C01/P-C02/P-C04): a for-of, for-in or for-await-of head writes the names it
      // binds, so a literal-bound name the head rewrites reads composed - an identifier head and an array or object pattern head, each a
      // kill; the outer const holds the kept landed reading at "rf", so each control reads the head itself.
      forOfHead: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(tools) { let tool = "rf"; for (tool of tools) spawn(tool, []); }'),
      forInHead: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(table) { let tool = "rf"; for (tool in table) spawn(tool, []); }'),
      forAwaitHead: control('import { spawn } from "node:child_process"; const tool = "rf"; async function go(stream) { let tool = "rf"; for await (tool of stream) spawn(tool, []); }'),
      arrayHead: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(pairs) { let tool = "rf"; for ([tool] of pairs) spawn(tool, []); }'),
      objectHead: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(jobs) { let tool = "rf"; for ({ tool } of jobs) spawn(tool, []); }'),
      // wb-13ws class-level guard: every other write form gives the name it writes a value no literal spells, read composed - ++ and
      // --, a function, class, enum or namespace declaration, a named function or class expression, an enum member and every import
      // binding (default, namespace, named, import-equals), each a kill; the const holds the kept landed reading at "rf".
      prefixUpdate: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { let tool = "rf"; ++tool; return spawn(tool, []); }'),
      postfixUpdate: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { let tool = "rf"; tool--; return spawn(tool, []); }'),
      functionName: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { function tool() {} return spawn(tool, []); }'),
      className: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { class tool {} return spawn(tool, []); }'),
      functionExpressionName: control('import { spawn } from "node:child_process"; const tool = "rf"; const go = function tool() { return spawn(tool, []); };'),
      classExpressionName: control('import { spawn } from "node:child_process"; const tool = "rf"; const Go = class tool { run() { return spawn(tool, []); } };'),
      enumName: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { enum tool { a } return spawn(tool, []); }'),
      namespaceName: control('import { spawn } from "node:child_process"; const tool = "rf"; namespace outer { namespace tool { export const a = 1; } spawn(tool, []); }'),
      enumMember: control('import { spawn } from "node:child_process"; const tool = "rf"; enum Plan { tool = 1, run = spawn(tool, []).pid }'),
      importDefaultName: control('import { spawn } from "node:child_process"; import tool from "./tools.js"; function setup() { const tool = "rf"; return tool; } spawn(tool, []);'),
      importNamespaceName: control('import { spawn } from "node:child_process"; import * as tool from "./tools.js"; function setup() { const tool = "rf"; return tool; } spawn(tool, []);'),
      importNamedName: control('import { spawn } from "node:child_process"; import { tool } from "./tools.js"; function setup() { const tool = "rf"; return tool; } spawn(tool, []);'),
      importEqualsName: control('import { spawn } from "node:child_process"; import tool = require("./tools.js"); function setup() { const tool = "rf"; return tool; } spawn(tool, []);'),
      // wb-13ws F1 (refusal #1, the gate's MU-a..MU-h): one kill control per stated member those mutants reached - ||= and &&= bind
      // the module, either operand of || and && reads, an object assignment pattern's shorthand default, rest and property default
      // bind, a declaration without an initializer (a catch binding, a for-of declaration) reads composed, a non-binding assignment
      // operator reads composed, and an object or array assignment pattern writes its names composed.
      orAssign: control('let cp; cp ||= require("node:child_process"); cp.spawn("curl", []);'),
      andAssign: control('let cp = 1; cp &&= require("node:child_process"); cp.spawn("curl", []);'),
      orOperand: control('import * as cp from "node:child_process"; (cp || other).spawn("curl", []);'),
      andOperand: control('import * as cp from "node:child_process"; (ready && cp).spawn("curl", []);'),
      shorthandDefault: control('import * as cp from "node:child_process"; let m; ({ m = cp } = {}); m.spawn("curl", []);'),
      assignRest: control('import * as cp from "node:child_process"; let rest; ({ ...rest } = cp); rest.spawn("curl", []);'),
      assignPropertyDefault: control('import * as cp from "node:child_process"; let run; ({ execFile: run = fallback } = cp); run("curl", []);'),
      catchShadow: control('import { spawn } from "node:child_process"; const tool = "rf"; try { run(); } catch (tool) { spawn(tool, []); }'),
      forOfDeclShadow: control('import { spawn } from "node:child_process"; const tool = "rf"; for (const tool of tools) spawn(tool, []);'),
      compoundShadow: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(suffix) { let tool = "rf"; tool += suffix; return spawn(tool, []); }'),
      objectPatternShadow: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(cfg) { let tool = "rf"; ({ tool } = cfg); return spawn(tool, []); }'),
      arrayPatternShadow: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(list) { let tool = "rf"; [tool] = list; return spawn(tool, []); }'),
      // wb-13ws class-level guard, by construction: the landed readings are kept - a program also reads as the landed census reads it
      // (the literal its node spells or the last const binding of its bare name gives, composed otherwise), and a callee spelled as a
      // launcher name is a launcher call whatever a destructuring binds it to - so those landed readings are never lost: a name a
      // nested let binds read where no binding encloses it, a wrapped literal and a computed key resolving elsewhere, each a kill.
      unscopedLet: control('import { spawn } from "node:child_process"; function setup() { let tool = "rf"; return tool; } spawn(tool, []);'),
      wrappedProgram: control('import { spawn } from "node:child_process"; spawn(("rf"), []);'),
      launcherNamed: control('import * as cp from "node:child_process"; const verb = "toString"; const { [verb]: spawn } = cp; spawn("curl", []);'),
      // wb-13ws F2 (refusal #1, the gate's B11 and B12): a loader's stored .bind binds a loader, each a kill.
      storedBindRequire: control('const load = module.require.bind(module); load("node:child_process").spawn("curl", []);'),
      storedBindGetBuiltin: control('const load = process.getBuiltinModule.bind(process); load("node:child_process").spawn("curl", []);'),
      // wb-13ws quiet rows: R-FLOWED's loader flow (a loader held in an object, returned from a function or handed across a call: the
      // gate's B13, B14 and B15), R-COMPOSED-NAME's composed element name (a loop head's: the gate's C07) and R-SCOPE-BLIND (a name read
      // where no binding of the module encloses it reads that name's bindings, a const's "rf" included) stay quiet.
      loaderHolder: control('const holder = { load: require }; holder.load("node:child_process").spawn("curl", []);'),
      loaderReturned: control('function loader() { return require; } loader()("node:child_process").spawn("curl", []);'),
      loaderArgument: control('function go(load) { return load("node:child_process").spawn("curl", []); } go(require);'),
      loopElement: control('import * as cp from "node:child_process"; let verb = "toString"; for (verb of ["spawn"]) cp[verb]("curl", []);'),
      unscopedConst: control('import { spawn } from "node:child_process"; function setup() { const tool = "rf"; return tool; } spawn(tool, []);'),
      // wb-13ws cut #3 (refusal #2, U1: the launcher-binding map kept one launcher per name, the last binding in any scope winning, so
      // a destructuring elsewhere rebound a launcher-bound name to a non-launcher member and its launches vanished - the gate's
      // OV01-OV10 and P-OV01, P-OV02 and P-OV04): every launcher any binding gives a name is kept, so a launch through the name stays a
      // launch whatever another binding of it gives - an assignment pattern, a parameter's or binding element's default pattern, a
      // nested default pattern, a destructuring of a child_process value only the widened reading reads (a parameter default, a comma,
      // an assigned name), a logical assignment pattern, the declaration and then-callback destructurings, and a launcher bound by a
      // destructuring or a then-callback rebound elsewhere, each a kill.
      rebindAssignPattern: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { let run; ({ toString: run } = cp); return run; }'),
      rebindParamDefault: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later({ toString: run } = cp) { return run; }'),
      rebindNestedDefault: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { const { default: { toString: run } } = cp; return run; }'),
      rebindParamSpace: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later(m = cp) { const { ChildProcess: run } = m; return run; }'),
      rebindCommaSpace: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { const { toString: run } = (0, cp); return run; }'),
      rebindAssignedSpace: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { let m; m = cp; const { toString: run } = m; return run; }'),
      rebindLogicalAssign: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { let run; ({ toString: run } ??= cp); return run; }'),
      rebindElementDefault: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later({ inner: { toString: run } = cp } = {}) { return run; }'),
      rebindDeclaration: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); function later() { const { toString: run } = cp; return run; }'),
      rebindThen: control('import { spawn as run } from "node:child_process"; import * as cp from "node:child_process"; run("curl", []); import("node:child_process").then(({ toString: run }) => run);'),
      rebindDestructured: control('import * as cp from "node:child_process"; const { spawn: run } = cp; run("curl", []); function later() { let run; ({ toString: run } = cp); return run; }'),
      rebindThenBound: control('import * as cp from "node:child_process"; import("node:child_process").then(({ spawn: run }) => run("curl", [])); function later({ toString: run } = cp) { return run; }'),
      // A launcher kept beside an earlier non-launcher binding (the gate's OV13 order), a destructured launcher kept beside a later
      // named import of a non-launcher member, and a computed key whose writes give a non-launcher and a launcher each bind the
      // launcher, each a kill.
      rebindBeforeLauncher: control('import * as cp from "node:child_process"; function later({ toString: run } = cp) { return run; } import { spawn as run } from "node:child_process"; run("curl", []);'),
      rebindImport: control('import * as cp from "node:child_process"; const { spawn: run } = cp; run("curl", []); import { ChildProcess as run } from "node:child_process";'),
      computedKeyNames: control('import * as cp from "node:child_process"; const verb = "toString"; function setup() { let verb = "spawn"; return verb; } const { [verb]: run } = cp; run("curl", []);'),
      // wb-13ws cut #3 (seat-found, U1's class: the first reading of a callee decided its program, so a widened element name that also
      // resolved to a launcher hid the landed .call or .apply reading): a launcher call's programs are the union over every reading of
      // its callee - direct, through .call or .apply, or through an immediately invoked .bind - so a callee whose element name resolves
      // both to call (or apply) and to a launcher, or whose alternatives are a launcher and its immediately invoked .bind, reads every
      // program, each a kill.
      competingCall: control('import * as spawn from "node:child_process"; const verb = "call"; function setup() { let verb = "exec"; return verb; } spawn[verb]("rf", "curl");'),
      competingApply: control('import * as exec from "node:child_process"; const verb = "apply"; function setup() { let verb = "spawn"; return verb; } exec[verb]("rf", ["curl"]);'),
      competingBind: control('import { spawn } from "node:child_process"; (flag ? spawn : spawn.bind(undefined, "curl"))("rf", []);'),
      // wb-13ws cut #3 (refusal #2, F1: the gate's MPN1, MPN3, MPN4, MPN5, MPN6 and MUP1): one kill control per stated member those
      // mutants reached - an assignment pattern's property target, object rest, array spread and defaulted target, a parenthesized
      // loop-head target and a parenthesized ++ or -- operand each write the name composed; the const holds the kept landed reading
      // at "rf".
      patternPropertyTarget: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(cfg) { let tool = "rf"; ({ a: tool } = cfg); return spawn(tool, []); }'),
      patternObjectRest: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(cfg) { let tool = "rf"; ({ ...tool } = cfg); return spawn(tool, []); }'),
      patternArraySpread: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(list) { let tool = "rf"; [...tool] = list; return spawn(tool, []); }'),
      patternDefaultedTarget: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(list) { let tool = "rf"; [tool = "rf"] = list; return spawn(tool, []); }'),
      patternWrappedTarget: control('import { spawn } from "node:child_process"; const tool = "rf"; function go(tools) { let tool = "rf"; for ((tool) of tools) spawn(tool, []); }'),
      updateWrappedOperand: control('import { spawn } from "node:child_process"; const tool = "rf"; function go() { let tool = "rf"; (tool)++; return spawn(tool, []); }'),
      // wb-13ws cut #3 quiet row: R-SCOPE-BLIND's global write (a write of the global an unscoped read names, made through globalThis,
      // is a property write B6 does not read as a write of the name) stays quiet.
      globalThisWrite: control('import { spawn } from "node:child_process"; function setup() { const tool = "rf"; return tool; } globalThis.tool = "curl"; spawn(tool, []);'),
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
