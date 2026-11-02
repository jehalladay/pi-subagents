/**
 * wb-km7q.7 (SDK-REACTIVE-FIBER-ADAPTIVE-COMPUTATION-AND-CONTROL-R19), a standing-posture census. Statement (bead title):
 * "Speculative model inference stays disabled in Pi by default: no Pi surface launches a model operation from
 * evidence/query/projection change alone, and any future opt-in to the rf/ReactiveInference speculative-inference seam (design
 * only; gated INF-RQ2) must carry an output contract, generation, model/version/settings, measured success/ROI and a budget; query
 * evidence is never a license." Acceptance (bead notes): "a hermetic census asserting no model-call site is reachable from
 * evidence/query/projection-change paths, plus the opt-in checklist (output contract, generation, exact model/version/settings,
 * measured ROI, budget) bound when the seam ships." Citations (bead notes; the ReactiveFiberCLI program file is cited, never read
 * here): docs/programs/reactive-fiber-adaptive-computation-and-control-2026-10-17.md:19 and :37@52c9271ed485, the charter's
 * 'design only' at :3 and INF-RQ2 'query-view changes alone produce no network calls' at :39.
 *
 * MEASURED AT BASE (19024ab897c3, landing-803 ledger hop; 117 src modules; cut #1 measured the same at f63d38962c). Pi starts a
 * model operation in exactly two package forms and one host form: createAgentSession from @earendil-works/pi-coding-agent
 * (src/agent-runner.ts, src/mention-clone.ts), query from the Claude Agent SDK (src/workbench/claude-host.ts), and three
 * pi.sendMessage completion nudges carrying triggerTurn: true (src/index.ts). 60 src modules know the evidence/query/projection
 * plane; 12 reach a model-call site; the two sets meet in exactly the four model-side modules. In B3's SUBSCRIPTION READING
 * (below) the plane's three cores hold no listener spelling, their callable type nodes are exactly the loader seam's two
 * method signatures (EvidenceLoader.canLoad and .load) and their one heritage clause is EvidenceRefusal extends Error; no src
 * module spells /specul/i in a D1 token.
 *
 * PINNED READER SET: test/workbench-speculative-inference-census.test.ts cases A1, A2, A3, B1, B2, B3, C1, C2, D1.
 * Each case's exact assertion target and observed result is its witness in test/fixtures/speculative-inference-roster.json;
 * at 19024ab897c3 every case matched that witness (11/11 including shape and registration). A3 and C2 claim precisely their
 * named constructed controls, not all syntax members of a category. B2, B3 and D1 claim their readings exactly as the
 * definitions below state them, each token kind, node kind and form of those readings carrying a named control. Reader variants
 * outside those controls and definitions are NOT CLAIMED by this census. The definitions below specify the reader's algorithm,
 * not an exhaustive syntax-coverage claim.
 * FALSIFIERS: a launch binding added to a core or a plane knower reds A2/C1; a knower's import dependency on a launcher or a named
 * launch member of the native seam reds C1; a module directly in src/workbench named in an anchor form that knows no core reds
 * B2; a listener-vocabulary spelling, a callable type node or a heritage clause added to a core reds B3, and so does a listener
 * name defined on a real core class's prototype while its module evaluates; a /specul/i spelling in an identifier, private
 * identifier, string or template literal text, or a site of a warm-start export (prewarm, startup), reds D1. The per-path plant
 * controls below independently apply these findings to the real source reading.
 *
 * DEFINITIONS (each read from src or from the installed packages, never typed in as a module list):
 *  MODEL-CALL SITE (row A), read on the AST of every src module: (i) a value binding of a launch export of a model package
 *    (LAUNCH_EXPORTS: the Claude Agent SDK's query, prewarm and startup; pi-coding-agent's session, session-runtime, session-
 *    services, model-runtime and run-mode exports; pi-ai's model-client, provider, stream and retry helpers), named, aliased,
 *    re-exported (export-from and export *), or read as a member of a namespace, default, import-equals, literal dynamic import()
 *    or literal require / createRequire binding - a member read through a literal key counts, and any other use of such a binding
 *    (a computed key, an argument, a spread, an assignment) is read as opaque, every export at once; (ii) any value binding of a
 *    provider SDK (PROVIDER_PACKAGES: the four provider dependencies the installed pi-ai declares) or of pi-ai's api/ and
 *    providers/ subpaths; (iii) a host turn: any reference to sendUserMessage (pi's ExtensionAPI: "Always triggers a turn.") or a
 *    triggerTurn property, shorthand or assignment whose value is not the literal false; (iv) a model-runtime call (pi-coding-
 *    agent's ModelRuntime methods): completeSimple, streamSimple, streamDeferred and fetchDeferred read as a member in any
 *    position, and complete and stream - common data fields in src (log.stream, result.complete) - read only as a called member,
 *    directly or through .call / .apply / .bind. Type-only forms are never sites. A launch-site module holds at least one site.
 *  THE PLANE (row B): three cores - src/workbench/observation.ts (ObservationProjection, the projection), src/workbench/
 *    observe-query.ts (observeInvocation, the query) and src/workbench/evidence-loader.ts (EvidenceStore, the evidence store) - and
 *    every src module that KNOWS one: its closure over every relative import edge, type-only imports and import types included,
 *    reaches a core. The knowers include every module directly in src/workbench named in an ANCHOR FORM (ANCHOR_FORMS, by file
 *    name: *-observer.ts, *-evidence.ts, evidence-*.ts), the inspector, the dialog (whose load-evidence continuation re-renders on
 *    a settled request) and the menu - the B2 anchors - beside the derived views and control readers (measured, not anchored). B3
 *    reads no change subscription on the cores in the SUBSCRIPTION READING below (R-UNNAMED-SUBSCRIPTION names the feeds that
 *    reading cannot see); that is the premise under which a plane change is met only by code that holds a plane value or a
 *    core's own callers.
 *  SUBSCRIPTION READING (row B3), on the AST of each core, comments unread: (i) LISTENER SPELLINGS: every identifier, private
 *    identifier (read without its #) and string or template literal text (a string, a no-substitution template, a template head,
 *    middle or tail) that is a listener-vocabulary name - on<Name> (LISTENER_PREFIX: on and an upper-case letter, any tail) or one
 *    of LISTENER_NAMES (subscribe, unsubscribe, addListener, removeListener, addEventListener, removeEventListener, listen, watch,
 *    unwatch) - in any position: a class or class-expression member of any modifier, an interface or type-literal member, an
 *    object-literal member, a module-level function or binding, a string or literal computed key, a type or an argument; (ii)
 *    CALLABLE TYPES: every function type, constructor type, method signature, call signature and construct signature node and
 *    every type reference to a FUNCTION_TYPES name (Function, CallableFunction, NewableFunction), labeled by the declaration names
 *    that hold it; (iii) HERITAGE: every extends or implements clause of a class, class expression or interface; (iv) PROTOTYPES:
 *    the own property names of the real ObservationProjection and EvidenceStore prototypes, read after their modules evaluate (this
 *    census imports them), each class above its own floor (PROTOTYPE_FLOORS).
 *  REACH (row C): a module reaches a model-call site when its src value closure holds a launch-site module. The value closure
 *    follows every load edge - a static import or re-export, a side-effect import, an import-equals, a literal dynamic import()
 *    and a literal require / createRequire - with two readings, both read from src: (1) THE SEAM: src/workbench/native-modules.ts
 *    is "the one dynamic-import seam for the native SDKs" (its header); its dynamic imports are followed per member - an importer
 *    of the seam, value or type, reaches the modules behind each seam member it names (SEAM_MEMBERS, read from the seam's
 *    getters and methods over its dynamic-import bindings) and the seam's own static load edges, while the seam itself as a start
 *    reaches everything it loads; (2) LITERAL CONSTANTS: an import whose every value binding names an exported const bound to a
 *    pure literal (strings, numbers, booleans, null, and arrays or objects of them, `as const` allowed) carries no code and is no
 *    edge (workflow-dialog's SPINNER, workflow-menu's VIEWPORT_HEIGHT_PCT, collisions' SUBAGENT_TOOL_NAMES); it holds because no
 *    src module's top-level code calls a launch-site binding or a binding it imports from a reaching module (A2 topLevel).
 *  MODEL SIDE (C1): four knowers reach a model-call site by design and are pinned exactly - src/index.ts (the composition root:
 *    it registers every tool and command, builds the agent manager and holds the three triggerTurn nudges), src/workbench/
 *    claude-host.ts (the Claude Agent SDK adapter, the query site), src/workbench/hosts/local-detached.ts (the detached host, a
 *    static edge to claude-host) and src/workbench/native-modules.ts (the seam, a dynamic edge to claude-host); C1 holds each to
 *    being a launch-site module or a direct value importer of one.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label; every witness is held to the roster):
 *  A1 the vocabulary resolves against the installed packages: every listed launch export is a function export of its package, every
 *    provider package is a dependency the installed pi-ai declares, and the installed declarations carry the host-turn and
 *    model-runtime members. A2 the src sites are an exact multiset over every src module (a floor on the modules walked), and no
 *    top-level code calls a site or a reaching import. A3 the site reader's controls: every named A3 control reads its
 *    sites, and the quiet rows (type-only forms, launch names imported as types included, non-launch exports, data fields, the
 *    literal false) read none.
 *  B1 the three cores are exactly the projection class, the query function and the store class, each a runtime export of its
 *    module. B2 the knowers: a floor, the cores, and every B2 anchor a knower - each anchor form above its own floor
 *    (ANCHOR_FLOORS) and the three plane UI modules; the controls read knowing by a type import, at a distance and by an import
 *    type, an unrelated module as unknowing, and on a constructed graph exactly the unknowing module of each anchor form, a
 *    knowing one and the near-miss names (a plural, a missing dash, two in another directory, a subdirectory) staying unlisted.
 *    B3 the cores' SUBSCRIPTION READING is exactly: no listener spelling, the callable type nodes EvidenceLoader.canLoad and
 *    .load, the heritage clause EvidenceRefusal extends Error, each prototype above its floor and no prototype listener name; the
 *    controls read every vocabulary name, each spelling kind, a binding, a type and an argument, each member form cut #1's
 *    refusal named (FO1-FO6; RB06-RB08, RB11, RB13), each callable kind, each heritage form and a run-time prototype listener,
 *    and the near-miss names, a comment and the R-UNNAMED-SUBSCRIPTION feeds read quiet.
 *  C1 (acceptance) no knower outside the model side reaches a model-call site: violations empty, the knower-reach intersection
 *    exactly the model side, each model-side module justified, the reaching set exact, the seam's member map and every seam
 *    importer's named members exact, and the typed handles exact - every type-only binding a knower outside the model side
 *    imports from a reaching module (data types such as Theme and ClaudeCallIdentity, and the two launch-capable handles: the
 *    AgentManager src/workflow/host.ts runs workflow agent() calls through, and connectDetachedWorkflow in src/workbench/
 *    detached-control.ts), so a knower that gains a typed handle reds C1. C2 the reach reader's controls on constructed module
 *    graphs: the named C2 load-edge controls, the seam member rule, the literal-constant rule and its top-level premise (a launch binding,
 *    a reaching import and a host turn called during evaluation read, the same calls inside function bodies stay quiet), a knower
 *    at distance, typed handles by import and by import type, and each residual's quiet row.
 *  D1 the opt-in checklist waits for the seam: the checklist and the license clause are held to the roster, no src module spells
 *    /specul/i in a D1 token - an identifier, a private identifier (read without its #), a string or a template literal text (a
 *    no-substitution template, a head, a middle or a tail), read by the spelling reader B3 shares - and src holds no site of a
 *    warm-start export (WARM_STARTS: prewarm, startup; an opaque reading of a whole SDK binding is A2's), so the seam's first site
 *    reds this census (A2 and D1) until the checklist is bound; the controls read each token kind and each warm-start export, and a
 *    comment, a seam worded outside the vocabulary and a launch export that is no warm start read quiet.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the judged set - every row's id, label and
 * pins and every pin's witness - is held to the out-of-file roster test/fixtures/speculative-inference-roster.json, with the
 * vocabularies (the launch, provider, subpath, turn and runtime lists, LISTENER_NAMES, FUNCTION_TYPES and WARM_STARTS), the cores,
 * the seam, the model side, the checklist and the test titles; the package vocabularies are also held to the
 * installed packages (A1) and the cores, the seam map and the reach sets to src (B1, C1). The last case walks this file's vitest
 * task tree against the roster's test list. The two acceptance requirements of C/D also equal the filing's Acceptance
 * clauses in the tracked .beads/issues.jsonl export: deleting D everywhere, including its roster, still reds that anchor.
 * NOT CLAIMED: a causal/dynamic proof that model-side or injected calls are never driven by plane changes is NOT CLAIMED
 * by this census. C1 proves the module-closure reading below, not dynamic effect reachability. An arbitrary future seam
 * appearing without either a new model binding or /specul/i vocabulary is NOT CLAIMED. D1 is an until-then tripwire, not
 * an implemented opt-in policy. No opt-in is currently offered by this cut. A module that observes the plane or loads evidence
 * under a file name outside the three anchor forms, or below a subdirectory of src/workbench, is NOT CLAIMED as a B2 anchor by
 * this census (its closure still makes it a knower).
 * RESIDUALS (named, each with a pinned quiet row):
 *  R-MODEL-SIDE a change-triggered launch written inside a model-side module is unread: their own launches are explicit demand (a
 *    tool or command handler, a workflow agent() call, a detached launch, a completion nudge), and a module closure cannot tell a
 *    demand-driven launch from a change-driven one (src/index.ts runWorkflowTask both ingests Claude stream observations and runs
 *    the workflow). Backstops: A2's exact multiset reds on any new site in them; B3 reads no change subscription on the cores
 *    for them to hang a launch on (within the SUBSCRIPTION READING; R-UNNAMED-SUBSCRIPTION). Quiet row: C2 modelSide.
 *  R-INJECTED a launch reached through a value the closure does not follow - a parameter, an option or callback field (the
 *    evidence loaders and deps the composer injects), a host object, a returned value, a global - is unread when its module names
 *    no site;
 *    this is how the Pi backend runs workflow agent() calls (src/workflow/host.ts calls the AgentManager it is handed), which is
 *    explicit workflow demand. Backstops: a handle typed through an import from a reaching module is a pinned typed handle (C1),
 *    and host-turn and model-runtime members are read by name in every module (C2 injectedTurn, injectedRuntime). Quiet rows: C2
 *    injected and injectedGlobal, and the structural typed-handle control.
 *  R-COMPOSED a module specifier or member assembled at run time (import(name), require(path), a computed member on a value that
 *    is not a model-package binding, a seam member spelled through a template) or a module loaded by a path string at run time (a
 *    Worker, a vm script) is unread; a computed member on a model-package binding is opaque, so it is read (A3 namespaceComputed).
 *    Quiet rows: C2 composed, seamComposedMember and workerLoad.
 *  R-ALIASED-RUNTIME a complete or stream method reached through an alias, a destructured binding or Reflect.apply is unread (the
 *    two names are data fields across src); the four distinctive runtime members are read in any position. Quiet row: A3
 *    aliasedRuntime.
 *  R-UNNAMED-PLANE a module that handles plane values through a structural type, unknown or a parameter, with no import edge
 *    to a core, is no knower and is unjudged. Quiet row: C2 unnamedPlane.
 *  R-NON-SDK-LAUNCH a model operation started outside the vocabulary - a spawned model CLI, a raw HTTP request to a model
 *    endpoint, an IPC request to a host process - is no site. Quiet rows: C2 cliLaunch, httpLaunch and ipcLaunch.
 *  R-UNNAMED-SUBSCRIPTION a change feed a core exposes with no listener spelling, no callable type node and no heritage clause
 *    in the core's own text - a callable typed through a type the core imports, through typeof or through a qualified name, an
 *    emitter or other subscribable instance built from a global (new EventTarget()), a promise or async iterator the caller
 *    awaits, or a listener name assembled at run time outside the two real prototypes or set on them only later (in a
 *    constructor or a method) - is unread by B3 (C1 still judges every knower's reach, whatever feed it follows). Quiet rows: B3
 *    importedCallable, typeofCallable, qualifiedCallable, globalEmitter, promiseFeed, iteratorFeed, composedName and
 *    lateDefinition.
 *  R-VOCABULARY a speculative seam worded outside /specul/i, or spelled only in a comment, is not read by D1's vocabulary; its
 *    model call is still a site (A2). Quiet rows: D1 outsideVocabulary and comment.
 * SCOPE: hermetic - this census reads src text, the tracked bead export and the installed packages' exports, manifests and declarations; it runs no
 * binary, opens no network and launches no model. Pi vendors no ReactiveFiberCLI or ReactiveInference source, so the seam's
 * arrival is seen only as src gaining a site (A2) or the vocabulary (D1).
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, posix, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import * as claudeAgentSdk from "@anthropic-ai/claude-agent-sdk";
import * as piAi from "@earendil-works/pi-ai";
import * as piCodingAgent from "@earendil-works/pi-coding-agent";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { EvidenceStore } from "../src/workbench/evidence-loader.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { observeInvocation } from "../src/workbench/observe-query.js";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type Sources = ReadonlyMap<string, string>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "speculative-inference-roster.json");

/** The launch exports of each model package: an export whose call starts a model operation or builds an object whose methods do. */
const LAUNCH_EXPORTS: Readonly<Record<string, readonly string[]>> = {
  "@anthropic-ai/claude-agent-sdk": ["prewarm", "query", "startup"],
  "@earendil-works/pi-ai": ["createModels", "createProvider", "lazyStream", "retryAssistantCall"],
  "@earendil-works/pi-coding-agent": [
    "AgentSession", "AgentSessionRuntime", "InteractiveMode", "ModelRuntime", "createAgentSession", "createAgentSessionFromServices",
    "createAgentSessionRuntime", "createAgentSessionServices", "main", "runPrintMode", "runRpcMode",
  ],
};
/** Provider SDKs: every value binding of one is a site. */
const PROVIDER_PACKAGES: readonly string[] = ["@anthropic-ai/sdk", "@aws-sdk/client-bedrock-runtime", "@google/genai", "openai"];
/** pi-ai subpaths that hold the provider stream implementations: every value binding of one is a site. */
const WHOLE_SUBPATHS: readonly string[] = ["@earendil-works/pi-ai/api/", "@earendil-works/pi-ai/providers/"];
const TURN_MEMBERS: readonly string[] = ["sendUserMessage", "triggerTurn"];
/** ModelRuntime's model-call methods; the first four are read in any position, the last two only when called. */
const RUNTIME_ANY: readonly string[] = ["completeSimple", "fetchDeferred", "streamDeferred", "streamSimple"];
const RUNTIME_CALLED: readonly string[] = ["complete", "stream"];
const WARM_STARTS: readonly string[] = ["prewarm", "startup"];
const SPECULATION = /specul/i;
/** B3's listener vocabulary: on<Name> (LISTENER_PREFIX: on and an upper-case letter, any tail) and these exact names. */
const LISTENER_PREFIX = /^on[A-Z]/;
const LISTENER_NAMES: readonly string[] = [
  "addEventListener", "addListener", "listen", "removeEventListener", "removeListener", "subscribe", "unsubscribe", "unwatch", "watch",
];
/** Type names that are callable by declaration: a type reference to one is a callable type node (B3 (ii)). */
const FUNCTION_TYPES: readonly string[] = ["CallableFunction", "Function", "NewableFunction"];

const CORES: readonly string[] = ["src/workbench/evidence-loader.ts", "src/workbench/observation.ts", "src/workbench/observe-query.ts"];
const SEAM = "src/workbench/native-modules.ts";
const MODEL_SIDE: readonly string[] = [
  "src/index.ts", "src/workbench/claude-host.ts", "src/workbench/hosts/local-detached.ts", "src/workbench/native-modules.ts",
];
/** The plane's UI modules: the inspector, the dialog and the menu. */
const PLANE_UI: readonly string[] = ["src/ui/workflow-dialog.ts", "src/ui/workflow-inspector.ts", "src/ui/workflow-menu.ts"];
const OPT_IN_CHECKLIST: readonly string[] = ["output contract", "generation", "exact model/version/settings", "measured success/ROI", "budget"];
const LICENSE_CLAUSE = "query evidence is never a license";
/** Each floor sits below the count measured at base f63d38962c (117 src modules, 60 knowers), so an emptied or misdirected walk reds
 * and an additive change does not. */
const SRC_FLOOR = 100;
const KNOWER_FLOOR = 50;
/** B2's anchor forms, by file name; each form's floor is its count measured at base 19024ab897c3, so an additive change keeps it. */
const ANCHOR_FORMS: Readonly<Record<string, RegExp>> = {
  evidence: /^src\/workbench\/[^/]*-evidence\.ts$/,
  evidencePrefix: /^src\/workbench\/evidence-[^/]*\.ts$/,
  observer: /^src\/workbench\/[^/]*-observer\.ts$/,
};
const ANCHOR_FLOORS: Readonly<Record<string, number>> = { evidence: 4, evidencePrefix: 3, observer: 8, planeUi: 3 };
/** Each real prototype's floor: about half its own property count at base 19024ab897c3 (9 and 40 names). */
const PROTOTYPE_FLOORS: Readonly<Record<string, number>> = { EvidenceStore: 5, ObservationProjection: 20 };

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
  readonly requirement?: string;
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "a model-call site is a launch export of a model package, a provider SDK binding, a host turn or a model-runtime call: the vocabulary resolves against the installed packages and src holds an exact multiset of sites, with the named A3 static, re-exported, namespace and literal dynamic controls",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "the evidence/query/projection plane is three cores and every src module that knows one through any import edge, type imports included; no identifier, private identifier, string or template text of a core is a listener-vocabulary name, and the cores' callable type nodes and heritage clauses are exactly the loader seam's two members and EvidenceRefusal extends Error",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    requirement: "a hermetic census asserting no model-call site is reachable from evidence/query/projection-change paths",
    label: "(acceptance) no model-call site is reachable from evidence/query/projection-change paths: outside the four model-side modules no knower's src value closure holds a launch-site module",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    requirement: "the opt-in checklist (output contract, generation, exact model/version/settings, measured ROI, budget) bound when the seam ships",
    label: "the opt-in checklist (output contract, generation, exact model/version/settings, measured success/ROI, budget) waits for the seam: no src identifier, private identifier or string or template text spells /specul/i and src holds no site of a warm-start export, so the seam's first site reds this census until the checklist is bound",
    pins: ["D1"],
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
  readonly launchExports: Readonly<Record<string, readonly string[]>>;
  readonly providerPackages: readonly string[];
  readonly wholeSubpaths: readonly string[];
  readonly turnMembers: readonly string[];
  readonly runtimeMembers: readonly string[];
  readonly cores: readonly string[];
  readonly seam: string;
  readonly modelSide: readonly string[];
  readonly optInChecklist: readonly string[];
  readonly licenseClause: string;
  readonly listenerNames: readonly string[];
  readonly functionTypes: readonly string[];
  readonly warmStarts: readonly string[];
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

/** Parses the roster from disk, refusing any field of the wrong shape by name; each call is a fresh read. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.launchExports)) throw new Error("roster must be an object with rows and launchExports");
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
  const launchExports: Record<string, readonly string[]> = {};
  for (const [name, exports] of Object.entries(raw.launchExports)) launchExports[name] = strings(exports, `launchExports.${name}`);
  if (typeof raw.seam !== "string" || typeof raw.licenseClause !== "string") throw new Error("roster needs a seam and a licenseClause");
  return {
    launchExports,
    providerPackages: strings(raw.providerPackages, "providerPackages"),
    wholeSubpaths: strings(raw.wholeSubpaths, "wholeSubpaths"),
    turnMembers: strings(raw.turnMembers, "turnMembers"),
    runtimeMembers: strings(raw.runtimeMembers, "runtimeMembers"),
    cores: strings(raw.cores, "cores"),
    seam: raw.seam,
    modelSide: strings(raw.modelSide, "modelSide"),
    optInChecklist: strings(raw.optInChecklist, "optInChecklist"),
    licenseClause: raw.licenseClause,
    listenerNames: strings(raw.listenerNames, "listenerNames"),
    functionTypes: strings(raw.functionTypes, "functionTypes"),
    warmStarts: strings(raw.warmStarts, "warmStarts"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** Every src .ts module by repo-relative posix path, read in a stable order. */
function srcSources(): Map<string, string> {
  const out = new Map<string, string>();
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".ts")) out.set(relative(REPO, full).split(sep).join("/"), readFileSync(full, "utf8"));
    }
  };
  walk(join(REPO, "src"));
  return out;
}

function sourceOf(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/** A relative specifier resolved to a module of the graph (the .js spelling src uses maps to its .ts source). */
function resolveRelative(from: string, specifier: string, sources: Sources): string | undefined {
  if (!specifier.startsWith(".")) return undefined;
  const joined = posix.normalize(posix.join(posix.dirname(from), specifier));
  const candidates = [joined.replace(/\.(?:js|mjs|cjs)$/, ".ts"), `${joined}.ts`, `${joined}/index.ts`, joined];
  return candidates.find(candidate => sources.has(candidate));
}

interface PackageRule {
  readonly name: string;
  /** "every": each value binding is a site; otherwise only these exports are. */
  readonly launch: readonly string[] | "every";
}

/** The model-package rule a bare specifier falls under, if any (a subpath of a launch-export package keeps its exports). */
function packageRuleOf(specifier: string): PackageRule | undefined {
  for (const prefix of WHOLE_SUBPATHS) if (specifier.startsWith(prefix)) return { name: specifier, launch: "every" };
  for (const name of PROVIDER_PACKAGES) if (specifier === name || specifier.startsWith(`${name}/`)) return { name, launch: "every" };
  for (const [name, exports] of Object.entries(LAUNCH_EXPORTS)) if (specifier === name || specifier.startsWith(`${name}/`)) return { name, launch: exports };
  return undefined;
}
function isLaunchName(rule: PackageRule, name: string): boolean {
  return rule.launch === "every" || rule.launch.includes(name);
}

/** The literal module specifier of a dynamic import(), a require(...) or a createRequire(...)(...) call, if the node is one. */
function loadSpecifierOf(node: ts.Node): string | undefined {
  if (!ts.isCallExpression(node)) return undefined;
  const [first] = node.arguments;
  if (first === undefined || !ts.isStringLiteralLike(first)) return undefined;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword) return first.text;
  if (ts.isIdentifier(node.expression) && node.expression.text === "require") return first.text;
  if (ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "createRequire") return first.text;
  return undefined;
}
function isDynamicImport(node: ts.Node): boolean {
  return ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword;
}

/** The node a loaded value lands in: past awaits and parentheses. */
function useSiteOf(node: ts.Node): ts.Node {
  let current: ts.Node = node;
  while (current.parent !== undefined && (ts.isAwaitExpression(current.parent) || ts.isParenthesizedExpression(current.parent))) current = current.parent;
  return current;
}
function bindingNames(pattern: ts.ObjectBindingPattern): (string | undefined)[] {
  // undefined marks an element the reader cannot name (a rest element or a computed key): read as opaque.
  return pattern.elements.map(element => {
    if (element.dotDotDotToken !== undefined) return undefined;
    const key = element.propertyName ?? element.name;
    if (ts.isIdentifier(key) || ts.isStringLiteral(key)) return key.text;
    return undefined;
  });
}
function memberNameOf(node: ts.PropertyAccessExpression | ts.ElementAccessExpression): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  return ts.isStringLiteralLike(node.argumentExpression) ? node.argumentExpression.text : undefined;
}
function isDeclarationName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isImportClause(parent) && parent.name === node) ||
    ts.isNamespaceImport(parent) ||
    ts.isImportSpecifier(parent) ||
    (ts.isImportEqualsDeclaration(parent) && parent.name === node) ||
    (ts.isVariableDeclaration(parent) && parent.name === node)
  );
}

interface SiteHit {
  readonly label: string;
  /** True when the site runs during module evaluation: outside every function-like body (an import or export form never is). */
  readonly topLevel: boolean;
}
interface SiteReading {
  readonly hits: readonly SiteHit[];
  /** Local names bound to a launch export (or to anything of an every-binding package): a call of one is a launch. */
  readonly launchBindings: ReadonlySet<string>;
}

function isFunctionLike(node: ts.Node): boolean {
  return (
    ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) || ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)
  );
}
/** Whether a node runs during module evaluation: no function-like body and no type position (a type never evaluates) holds it. */
function evaluatesAtTopLevel(node: ts.Node): boolean {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (isFunctionLike(current) || ts.isTypeNode(current) || ts.isInterfaceDeclaration(current) || ts.isTypeAliasDeclaration(current)) return false;
  }
  return true;
}

/** The model-call sites of one module, as `<package> <export>`, `turn <member>` or `runtime <member>` labels (a multiset). */
function readSites(path: string, text: string): SiteReading {
  const source = sourceOf(path, text);
  const hits: SiteHit[] = [];
  const launchBindings = new Set<string>();
  const hit = (label: string, at: ts.Node | undefined): void => {
    hits.push({ label, topLevel: at !== undefined && evaluatesAtTopLevel(at) });
  };
  /** Bindings that hold a whole module of a launch-export package: their members are read below. */
  const namespaces = new Map<string, PackageRule>();
  /** Records each launch name (an unnamed element is opaque: every export); `at` is where a member read evaluates. */
  const recordNames = (rule: PackageRule, names: readonly (string | undefined)[], at: ts.Node | undefined): void => {
    for (const name of names) {
      if (name === undefined) hit(`${rule.name} *`, at);
      else if (isLaunchName(rule, name)) hit(`${rule.name} ${name}`, at);
    }
  };
  const bindLocals = (rule: PackageRule, pattern: ts.ObjectBindingPattern): void => {
    for (const element of pattern.elements) {
      const key = element.propertyName ?? element.name;
      const imported = ts.isIdentifier(key) || ts.isStringLiteral(key) ? key.text : undefined;
      if (ts.isIdentifier(element.name) && (imported === undefined || isLaunchName(rule, imported))) launchBindings.add(element.name.text);
    }
  };
  /** A loaded module value: named by destructuring, read through a member, bound whole, or opaque. */
  const readLoaded = (rule: PackageRule, load: ts.Node): void => {
    const site = useSiteOf(load);
    const parent = site.parent;
    if (parent !== undefined && ts.isVariableDeclaration(parent) && parent.initializer === site) {
      if (ts.isObjectBindingPattern(parent.name)) {
        bindLocals(rule, parent.name);
        recordNames(rule, bindingNames(parent.name), undefined);
        return;
      }
      if (ts.isIdentifier(parent.name)) {
        if (rule.launch === "every") {
          launchBindings.add(parent.name.text);
          hit(`${rule.name} *`, undefined);
        } else namespaces.set(parent.name.text, rule);
        return;
      }
    }
    if (parent !== undefined && (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === site) {
      recordNames(rule, [memberNameOf(parent)], parent);
      return;
    }
    hit(`${rule.name} *`, load);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const rule = packageRuleOf(node.moduleSpecifier.text);
      const clause = node.importClause;
      if (rule !== undefined && clause !== undefined && !clause.isTypeOnly) {
        if (clause.name !== undefined) {
          if (rule.launch === "every") {
            hit(`${rule.name} default`, undefined);
            launchBindings.add(clause.name.text);
          } else namespaces.set(clause.name.text, rule);
        }
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) {
          if (rule.launch === "every") {
            hit(`${rule.name} *`, undefined);
            launchBindings.add(bindings.name.text);
          } else namespaces.set(bindings.name.text, rule);
        } else if (bindings !== undefined) {
          for (const element of bindings.elements) {
            if (element.isTypeOnly) continue;
            const imported = (element.propertyName ?? element.name).text;
            if (!isLaunchName(rule, imported)) continue;
            hit(`${rule.name} ${imported}`, undefined);
            launchBindings.add(element.name.text);
          }
        }
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier) && !node.isTypeOnly) {
      const rule = packageRuleOf(node.moduleSpecifier.text);
      if (rule !== undefined) {
        const clause = node.exportClause;
        if (clause === undefined || ts.isNamespaceExport(clause)) hit(`${rule.name} *`, undefined);
        else recordNames(rule, clause.elements.filter(element => !element.isTypeOnly).map(element => (element.propertyName ?? element.name).text), undefined);
      }
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference)) {
      const expression = node.moduleReference.expression;
      const rule = ts.isStringLiteral(expression) ? packageRuleOf(expression.text) : undefined;
      if (rule !== undefined) {
        if (rule.launch === "every") {
          hit(`${rule.name} *`, undefined);
          launchBindings.add(node.name.text);
        } else namespaces.set(node.name.text, rule);
      }
    } else {
      const specifier = loadSpecifierOf(node);
      const rule = specifier === undefined ? undefined : packageRuleOf(specifier);
      if (rule !== undefined) readLoaded(rule, node);
    }
    // Host turns and model-runtime members, read by name wherever the value came from (an injected pi, context or runtime).
    if (ts.isIdentifier(node) && node.text === "sendUserMessage") hit("turn sendUserMessage", node);
    if (ts.isStringLiteralLike(node) && node.text === "sendUserMessage" && ts.isElementAccessExpression(node.parent)) hit("turn sendUserMessage", node);
    if (ts.isPropertyAssignment(node) && (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) && node.name.text === "triggerTurn") {
      if (node.initializer.kind !== ts.SyntaxKind.FalseKeyword) hit("turn triggerTurn", node);
    }
    if (ts.isShorthandPropertyAssignment(node) && node.name.text === "triggerTurn") hit("turn triggerTurn", node);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && (ts.isPropertyAccessExpression(node.left) || ts.isElementAccessExpression(node.left))) {
      if (memberNameOf(node.left) === "triggerTurn" && node.right.kind !== ts.SyntaxKind.FalseKeyword) hit("turn triggerTurn", node);
    }
    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const name = memberNameOf(node);
      if (name !== undefined && RUNTIME_ANY.includes(name)) hit(`runtime ${name}`, node);
      if (name !== undefined && RUNTIME_CALLED.includes(name)) {
        const parent = node.parent;
        const called = ts.isCallExpression(parent) && parent.expression === node;
        const viaCall = ts.isPropertyAccessExpression(parent) && parent.expression === node && ["call", "apply", "bind"].includes(parent.name.text);
        if (called || viaCall) hit(`runtime ${name}`, node);
      }
    }
    if (ts.isBindingElement(node) && node.dotDotDotToken === undefined) {
      const key = node.propertyName ?? node.name;
      if ((ts.isIdentifier(key) || ts.isStringLiteral(key)) && RUNTIME_ANY.includes(key.text)) hit(`runtime ${key.text}`, node);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  // Members of whole-module bindings: a literal member is read by name; any other use is opaque (every export at once).
  const readNamespaceUse = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && namespaces.has(node.text) && !isDeclarationName(node)) {
      const rule = namespaces.get(node.text);
      const parent = node.parent;
      if (rule !== undefined && !ts.isTypeQueryNode(parent) && !ts.isQualifiedName(parent)) {
        if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === node) recordNames(rule, [memberNameOf(parent)], parent);
        else if (ts.isVariableDeclaration(parent) && parent.initializer === node && ts.isObjectBindingPattern(parent.name)) {
          bindLocals(rule, parent.name);
          recordNames(rule, bindingNames(parent.name), undefined);
        } else recordNames(rule, [undefined], node);
      }
    }
    ts.forEachChild(node, readNamespaceUse);
  };
  readNamespaceUse(source);
  return { hits, launchBindings };
}
function sitesOf(path: string, text: string): string[] {
  return readSites(path, text).hits.map(entry => entry.label);
}

function isPureLiteral(node: ts.Expression): boolean {
  let expression = node;
  while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression) || ts.isParenthesizedExpression(expression)) expression = expression.expression;
  if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isNumericLiteral(expression)) return true;
  if ([ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword, ts.SyntaxKind.NullKeyword].includes(expression.kind)) return true;
  if (ts.isPrefixUnaryExpression(expression) && ts.isNumericLiteral(expression.operand)) return true;
  if (ts.isArrayLiteralExpression(expression)) return expression.elements.every(isPureLiteral);
  if (ts.isObjectLiteralExpression(expression)) {
    return expression.properties.every(property => ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && isPureLiteral(property.initializer));
  }
  return false;
}

interface ValueEdge {
  readonly target: string;
  /** The value names the edge binds; undefined for a whole-module edge (a side-effect import, a re-export, an opaque load). */
  readonly names: readonly string[] | undefined;
  readonly dynamic: boolean;
}

interface ModuleFacts {
  readonly path: string;
  readonly sites: readonly string[];
  /** Every relative import edge, type-only forms and import types included: the knower reading. */
  readonly anyEdges: readonly string[];
  readonly valueEdges: readonly ValueEdge[];
  /** Every identifier the module spells: the seam member reading. */
  readonly names: ReadonlySet<string>;
  /** Exported consts bound to pure literals. */
  readonly literalConsts: ReadonlySet<string>;
  /** Value-import bindings by local name, with the module each comes from. */
  readonly bindings: ReadonlyMap<string, string>;
  /** Type-only import bindings of relative modules, as [target, imported name]. */
  readonly typeImports: readonly (readonly [string, string])[];
  /** Callees called in top-level code (outside function-like bodies), by root identifier. */
  readonly topLevelCallees: readonly string[];
  readonly hits: readonly SiteHit[];
  readonly launchBindings: ReadonlySet<string>;
}

function rootIdentifier(node: ts.Expression): string | undefined {
  let current = node;
  while (ts.isPropertyAccessExpression(current) || ts.isElementAccessExpression(current) || ts.isNonNullExpression(current) || ts.isParenthesizedExpression(current)) current = current.expression;
  return ts.isIdentifier(current) ? current.text : undefined;
}

function factsOf(path: string, text: string, sources: Sources): ModuleFacts {
  const source = sourceOf(path, text);
  const anyEdges = new Set<string>();
  const valueEdges: ValueEdge[] = [];
  const names = new Set<string>();
  const literalConsts = new Set<string>();
  const bindings = new Map<string, string>();
  const typeImports: [string, string][] = [];
  const addValue = (specifier: string, edgeNames: readonly string[] | undefined, dynamic: boolean): void => {
    const target = resolveRelative(path, specifier, sources);
    if (target === undefined) return;
    anyEdges.add(target);
    valueEdges.push({ target, names: edgeNames, dynamic });
  };
  const addAny = (specifier: string): void => {
    const target = resolveRelative(path, specifier, sources);
    if (target !== undefined) anyEdges.add(target);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node)) names.add(node.text);
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text;
      const clause = node.importClause;
      addAny(specifier);
      const typeTarget = resolveRelative(path, specifier, sources);
      if (clause !== undefined && typeTarget !== undefined) {
        const named = clause.namedBindings;
        if (clause.isTypeOnly && clause.name !== undefined) typeImports.push([typeTarget, "default"]);
        if (clause.isTypeOnly && named !== undefined && ts.isNamespaceImport(named)) typeImports.push([typeTarget, "*"]);
        if (named !== undefined && ts.isNamedImports(named)) {
          for (const element of named.elements) if (clause.isTypeOnly || element.isTypeOnly) typeImports.push([typeTarget, (element.propertyName ?? element.name).text]);
        }
      }
      if (clause === undefined) addValue(specifier, undefined, false);
      else if (!clause.isTypeOnly) {
        const bound: string[] = [];
        const target = resolveRelative(path, specifier, sources);
        if (clause.name !== undefined) {
          bound.push("default");
          if (target !== undefined) bindings.set(clause.name.text, target);
        }
        const named = clause.namedBindings;
        if (named !== undefined && ts.isNamespaceImport(named)) {
          bound.push("*");
          if (target !== undefined) bindings.set(named.name.text, target);
        } else if (named !== undefined) {
          for (const element of named.elements) {
            if (element.isTypeOnly) continue;
            bound.push((element.propertyName ?? element.name).text);
            if (target !== undefined) bindings.set(element.name.text, target);
          }
        }
        if (bound.length > 0) addValue(specifier, bound, false);
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      addAny(node.moduleSpecifier.text);
      if (!node.isTypeOnly) addValue(node.moduleSpecifier.text, undefined, false);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      addAny(node.moduleReference.expression.text);
      if (!node.isTypeOnly) addValue(node.moduleReference.expression.text, undefined, false);
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument) && ts.isStringLiteral(node.argument.literal)) {
      addAny(node.argument.literal.text);
      const typeTarget = resolveRelative(path, node.argument.literal.text, sources);
      if (typeTarget !== undefined) typeImports.push([typeTarget, node.qualifier === undefined ? "import()" : node.qualifier.getText(source)]);
    } else {
      const specifier = loadSpecifierOf(node);
      if (specifier !== undefined) {
        const site = useSiteOf(node);
        const parent = site.parent;
        const destructured = parent !== undefined && ts.isVariableDeclaration(parent) && parent.initializer === site && ts.isObjectBindingPattern(parent.name) ? bindingNames(parent.name) : undefined;
        const named = (name: string | undefined): name is string => name !== undefined;
        const edgeNames = destructured?.every(named) ? destructured.filter(named) : undefined;
        addValue(specifier, edgeNames, isDynamicImport(node));
      }
    }
    if (ts.isVariableStatement(node) && node.parent === source && (node.declarationList.flags & ts.NodeFlags.Const) !== 0 && node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined && isPureLiteral(declaration.initializer)) literalConsts.add(declaration.name.text);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  // Top-level code: every statement outside function-like bodies and type positions.
  const topLevelCallees: string[] = [];
  const topLevel = (node: ts.Node): void => {
    if (isFunctionLike(node) || ts.isTypeNode(node) || ts.isImportDeclaration(node) || ts.isExportDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return;
    if (ts.isCallExpression(node) || ts.isNewExpression(node) || ts.isTaggedTemplateExpression(node)) {
      const callee = ts.isTaggedTemplateExpression(node) ? node.tag : node.expression;
      const root = rootIdentifier(callee);
      if (root !== undefined) topLevelCallees.push(root);
    }
    ts.forEachChild(node, topLevel);
  };
  for (const statement of source.statements) topLevel(statement);
  const reading = readSites(path, text);
  return {
    path, sites: reading.hits.map(entry => entry.label), anyEdges: [...anyEdges].sort(), valueEdges, names, literalConsts, bindings, typeImports, topLevelCallees,
    hits: reading.hits, launchBindings: reading.launchBindings,
  };
}

/** The seam's member map: each getter or method of its object literals, to the modules behind the dynamic-import bindings it reads. */
function seamMembersOf(text: string, sources: Sources, seam: string): Map<string, string[]> {
  const source = sourceOf(seam, text);
  const loaded = new Map<string, string>();
  const collect = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const load = ts.isAwaitExpression(node.initializer) ? node.initializer.expression : node.initializer;
      if (isDynamicImport(load) && ts.isCallExpression(load)) {
        const [first] = load.arguments;
        if (first !== undefined && ts.isStringLiteralLike(first)) loaded.set(node.name.text, resolveRelative(seam, first.text, sources) ?? first.text);
      }
    }
    ts.forEachChild(node, collect);
  };
  collect(source);
  const members = new Map<string, string[]>();
  const read = (node: ts.Node): void => {
    if ((ts.isGetAccessorDeclaration(node) || ts.isMethodDeclaration(node)) && ts.isObjectLiteralExpression(node.parent) && ts.isIdentifier(node.name) && node.body !== undefined) {
      const used = new Set<string>();
      const uses = (inner: ts.Node): void => {
        if (ts.isIdentifier(inner)) {
          const target = loaded.get(inner.text);
          if (target !== undefined) used.add(target);
        }
        ts.forEachChild(inner, uses);
      };
      uses(node.body);
      members.set(node.name.text, [...used].sort());
    }
    ts.forEachChild(node, read);
  };
  read(source);
  return members;
}

interface Census {
  readonly facts: ReadonlyMap<string, ModuleFacts>;
  readonly siteModules: readonly string[];
  readonly knowers: readonly string[];
  readonly reaching: ReadonlyMap<string, readonly string[]>;
  readonly seamMembers: ReadonlyMap<string, readonly string[]>;
  readonly seamImporters: ReadonlyMap<string, readonly string[]>;
  readonly violations: readonly string[];
  /** Type-only bindings a knower outside the model side imports from a reaching module: the typed handles of R-INJECTED. */
  readonly typedHandles: readonly string[];
  readonly topLevel: readonly string[];
}

/** Reads one module graph: sites, knowers, the value closure with the seam and literal-constant readings, and the violations. */
function censusOf(sources: Sources, cores: readonly string[], seam: string, modelSide: readonly string[]): Census {
  const facts = new Map<string, ModuleFacts>();
  for (const [path, text] of sources) facts.set(path, factsOf(path, text, sources));
  const siteModules = [...facts.values()].filter(fact => fact.sites.length > 0).map(fact => fact.path).sort();
  const siteSet = new Set(siteModules);
  const seamText = sources.get(seam);
  const seamMembers = seamText === undefined ? new Map<string, string[]>() : seamMembersOf(seamText, sources, seam);
  const seamImporters = new Map<string, string[]>();
  for (const fact of facts.values()) {
    if (fact.path !== seam && fact.anyEdges.includes(seam)) seamImporters.set(fact.path, [...seamMembers.keys()].filter(member => fact.names.has(member)).sort());
  }
  const edgesFrom = (path: string, start: boolean): string[] => {
    const fact = facts.get(path);
    if (fact === undefined) return [];
    const out = new Set<string>();
    for (const edge of fact.valueEdges) {
      if (path === seam && !start && edge.dynamic) continue;
      const target = facts.get(edge.target);
      if (edge.names !== undefined && target !== undefined && edge.names.length > 0 && edge.names.every(name => target.literalConsts.has(name))) continue;
      out.add(edge.target);
    }
    for (const member of seamImporters.get(path) ?? []) for (const target of seamMembers.get(member) ?? []) if (facts.has(target)) out.add(target);
    return [...out].sort();
  };
  /** The first path from a module to a launch-site module over load edges, or undefined. */
  const pathOf = (from: string): string[] | undefined => {
    if (siteSet.has(from)) return [from];
    const seen = new Set<string>([from]);
    const queue: string[][] = [[from]];
    while (queue.length > 0) {
      const trail = queue.shift() ?? [];
      const last = trail.at(-1) ?? from;
      for (const next of edgesFrom(last, last === from)) {
        if (seen.has(next)) continue;
        seen.add(next);
        const extended = [...trail, next];
        if (siteSet.has(next)) return extended;
        queue.push(extended);
      }
    }
    return undefined;
  };
  const reaching = new Map<string, string[]>();
  for (const path of [...facts.keys()].sort()) {
    const found = pathOf(path);
    if (found !== undefined) reaching.set(path, found);
  }
  // Knowers: every module whose closure over every relative import edge reaches a core.
  const coreSet = new Set(cores.filter(core => facts.has(core)));
  const knows = (from: string): boolean => {
    const seen = new Set<string>();
    const stack = [from];
    while (stack.length > 0) {
      const current = stack.pop() ?? from;
      if (coreSet.has(current)) return true;
      if (seen.has(current)) continue;
      seen.add(current);
      stack.push(...(facts.get(current)?.anyEdges ?? []));
    }
    return false;
  };
  const knowers = [...facts.keys()].filter(knows).sort();
  const side = new Set(modelSide);
  const violations = knowers.filter(path => !side.has(path) && reaching.has(path)).map(path => (reaching.get(path) ?? [path]).join(" -> "));
  const typedHandles = knowers
    .filter(path => !side.has(path))
    .flatMap(path => (facts.get(path)?.typeImports ?? []).filter(([target]) => reaching.has(target) || siteSet.has(target)).map(([target, name]) => `${path} <- ${target}: ${name}`))
    .sort();
  // Top-level code must call no launch-site binding and no binding imported from a reaching module (the literal-constant rule's premise).
  const topLevel: string[] = [];
  for (const fact of facts.values()) {
    for (const entry of fact.hits) if (entry.topLevel) topLevel.push(`${fact.path}: ${entry.label}`);
    for (const callee of fact.topLevelCallees) {
      const from = fact.bindings.get(callee);
      if (fact.launchBindings.has(callee)) topLevel.push(`${fact.path}: ${callee} (launch binding)`);
      else if (from !== undefined && (reaching.has(from) || siteSet.has(from))) topLevel.push(`${fact.path}: ${callee} from ${from}`);
    }
  }
  return { facts, siteModules, knowers, reaching, seamMembers, seamImporters, violations, typedHandles, topLevel: topLevel.sort() };
}

let srcCensus: Census | undefined;
function srcCensusOf(): Census {
  srcCensus ??= censusOf(srcSources(), CORES, SEAM, MODEL_SIDE);
  return srcCensus;
}

function sitesList(census: Census): string[] {
  return [...census.facts.values()].flatMap(fact => fact.sites.map(site => `${fact.path}: ${site}`)).sort();
}

/** A constructed graph: a stub of each core, a launch module, a seam and the control's own modules. */
const STUBS: Readonly<Record<string, string>> = {
  "src/workbench/observation.ts": "export class ObservationProjection { refresh(snapshot: unknown): unknown { return snapshot; } }",
  "src/workbench/observe-query.ts": 'import type { ObservationProjection } from "./observation.js";\nexport function observeInvocation(reader: ObservationProjection): unknown { return reader; }',
  "src/workbench/evidence-loader.ts": "export class EvidenceStore { request(): Promise<void> { return Promise.resolve(); } }",
  "src/launch.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport function runL(): unknown { return createAgentSession({}); }\nexport const SPIN = ["a", "b"];',
  "src/quiet.ts": "export function quietly(): number { return 1; }",
  "src/workbench/claude-host.ts": 'import { query } from "@anthropic-ai/claude-agent-sdk";\nexport function createClaudeWorkflowHost(): unknown { return query; }',
  "src/workbench/claude-transcript.ts": "export function readClaudeTranscript(): string { return \"\"; }",
  "src/workbench/native-modules.ts": [
    "async function importAll(): Promise<unknown> {",
    '  const claudeHost = await import("./claude-host.js");',
    '  const claudeTranscript = await import("./claude-transcript.js");',
    "  return { get createClaudeWorkflowHost() { return claudeHost.createClaudeWorkflowHost; }, get readClaudeTranscript() { return claudeTranscript.readClaudeTranscript; } };",
    "}",
    "export function loadWorkbenchNative(): Promise<unknown> { return importAll(); }",
  ].join("\n"),
};
const PLANE_MODULE = "src/workbench/plane.ts";
const KNOWS = 'import type { ObservationProjection } from "./observation.js";\n';

/** The census of a constructed graph whose plane module holds `text`, beside the stubs and `extra` modules. */
function graphCensus(text: string, extra: Readonly<Record<string, string>> = {}, modelSide: readonly string[] = []): Census {
  return censusOf(new Map<string, string>(Object.entries({ ...STUBS, ...extra, [PLANE_MODULE]: text })), CORES, SEAM, modelSide);
}
function graphViolations(text: string, extra: Readonly<Record<string, string>> = {}, modelSide: readonly string[] = []): number {
  return graphCensus(text, extra, modelSide).violations.length;
}
/** The sites one constructed module holds. */
function siteCount(text: string): number {
  return sitesOf("src/control.ts", text).length;
}

/** Every spelled text of one module: each identifier, each private identifier without its #, and each string or template literal
 * text (a string, a no-substitution template, a template head, middle or tail); comments are not read. B3 and D1 share it. */
function spellingsOf(path: string, text: string): string[] {
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isPrivateIdentifier(node)) out.push(node.text.slice(1));
    else if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) out.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(sourceOf(path, text));
  return out;
}
function isListenerName(name: string): boolean {
  return LISTENER_PREFIX.test(name) || LISTENER_NAMES.includes(name);
}
/** B3 (ii): a function, constructor, method, call or construct signature type node, or a type reference to a FUNCTION_TYPES name. */
function isCallableType(node: ts.Node): boolean {
  if (ts.isTypeReferenceNode(node)) return ts.isIdentifier(node.typeName) && FUNCTION_TYPES.includes(node.typeName.text);
  return ts.isFunctionTypeNode(node) || ts.isConstructorTypeNode(node) || ts.isMethodSignature(node) || ts.isCallSignatureDeclaration(node) || ts.isConstructSignatureDeclaration(node);
}
/** The declaration names that hold a node, outermost first, joined by dots (an unnamed holder adds nothing). */
function ownerOf(node: ts.Node): string {
  const names: string[] = [];
  for (let at: ts.Node | undefined = node; at !== undefined && !ts.isSourceFile(at); at = at.parent) {
    const name = ts.getNameOfDeclaration(at as ts.Declaration);
    if (name !== undefined && (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteralLike(name))) names.unshift(name.text);
  }
  return names.join(".");
}

interface SubscriptionReading {
  readonly listeners: readonly string[];
  readonly callables: readonly string[];
  readonly heritage: readonly string[];
}
/** B3's SUBSCRIPTION READING (i)-(iii) of module texts, each entry labeled by its module. */
function subscriptionsOf(texts: Readonly<Record<string, string>>): SubscriptionReading {
  const listeners: string[] = [];
  const callables: string[] = [];
  const heritage: string[] = [];
  for (const [path, text] of Object.entries(texts)) {
    for (const spelled of spellingsOf(path, text)) if (isListenerName(spelled)) listeners.push(`${path}: ${spelled}`);
    const visit = (node: ts.Node): void => {
      if (isCallableType(node)) callables.push(`${path}: ${ownerOf(node)}`);
      if (ts.isHeritageClause(node)) heritage.push(`${path}: ${ownerOf(node)} ${node.getText()}`);
      ts.forEachChild(node, visit);
    };
    visit(sourceOf(path, text));
  }
  return { listeners: listeners.sort(), callables: callables.sort(), heritage: heritage.sort() };
}
/** B3 (iv): every own property name of each prototype that is a listener-vocabulary name, as `<class>.<name>`. */
function prototypeListenersOf(prototypes: Readonly<Record<string, object>>): string[] {
  return Object.entries(prototypes)
    .flatMap(([name, prototype]) => Object.getOwnPropertyNames(prototype).filter(isListenerName).map(member => `${name}.${member}`))
    .sort();
}
/** The real core classes' prototypes B3 (iv) reads. */
const PROTOTYPES: Readonly<Record<string, object>> = { EvidenceStore: EvidenceStore.prototype, ObservationProjection: ObservationProjection.prototype };
/** B3 (iv)'s run-time control: a class whose prototype gains a listener name when this module evaluates. */
class PrototypeProbe {
  refresh(): number {
    return 1;
  }
}
Object.defineProperty(PrototypeProbe.prototype, "onChange", { value: (): number => 0 });

/** B2's anchors of a module graph, by form: the graph's modules each anchor form names, and the plane UI modules. */
function anchorsOf(paths: Iterable<string>): Record<string, string[]> {
  const sorted = [...paths].sort();
  const anchors: Record<string, string[]> = { planeUi: [...PLANE_UI] };
  for (const [form, pattern] of Object.entries(ANCHOR_FORMS)) anchors[form] = sorted.filter(path => pattern.test(path));
  return anchors;
}
/** The anchors of a graph that are no knower of it. */
function unknowingAnchorsOf(census: Census): string[] {
  const knowers = new Set(census.knowers);
  return Object.values(anchorsOf(census.facts.keys())).flat().filter(path => !knowers.has(path)).sort();
}
/** D1's warm-start reading: the sites of a WARM_STARTS export. */
function warmStartsOf(sites: readonly string[]): string[] {
  return sites.filter(site => WARM_STARTS.some(name => site.endsWith(` ${name}`)));
}

const IMPL: Record<string, () => JsonValue | Promise<JsonValue>> = {
  A1: () => {
    const installed: Record<string, Record<string, unknown>> = {
      "@anthropic-ai/claude-agent-sdk": claudeAgentSdk,
      "@earendil-works/pi-ai": piAi,
      "@earendil-works/pi-coding-agent": piCodingAgent,
    };
    const launchExports: Record<string, string[]> = {};
    for (const [name, exports] of Object.entries(LAUNCH_EXPORTS)) {
      const namespace = installed[name] ?? {};
      launchExports[name] = exports.filter(entry => typeof namespace[entry] === "function");
    }
    const piAiManifest: unknown = JSON.parse(readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-ai", "package.json"), "utf8"));
    const declared = isObject(piAiManifest) && isObject(piAiManifest.dependencies) ? Object.keys(piAiManifest.dependencies) : [];
    const types = readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-coding-agent", "dist", "core", "extensions", "types.d.ts"), "utf8");
    const runtime = readFileSync(join(REPO, "node_modules", "@earendil-works", "pi-coding-agent", "dist", "core", "model-runtime.d.ts"), "utf8");
    return {
      launchExports,
      providers: PROVIDER_PACKAGES.filter(name => declared.includes(name)),
      wholeSubpaths: [...WHOLE_SUBPATHS],
      turns: {
        sendUserMessage: types.includes("Always triggers a turn.") && types.includes("sendUserMessage("),
        triggerTurn: types.includes("triggerTurn?: boolean;"),
      },
      runtimeMembers: [...RUNTIME_ANY, ...RUNTIME_CALLED].filter(name => new RegExp(`\\b${name}(?:<[^>]*>)?\\(`).test(runtime)).sort(),
    };
  },
  A2: () => {
    const census = srcCensusOf();
    const sources = srcSources();
    const plant = 'import { query as ws05PlantQuery } from "@anthropic-ai/claude-agent-sdk";\n';
    // Each walked file is judged separately; a reader that stops at the first site of one file loses this extra binding.
    const missedPlants = [...sources].filter(([path, text]) => {
      const baseline = sitesOf(path, text);
      const planted = sitesOf(path, `${text}\n${plant}`);
      return planted.length !== baseline.length + 1 || planted.filter(site => site === "@anthropic-ai/claude-agent-sdk query").length !== baseline.filter(site => site === "@anthropic-ai/claude-agent-sdk query").length + 1;
    }).map(([path]) => path);
    return { modulesAboveFloor: census.facts.size >= SRC_FLOOR, sites: sitesList(census), topLevel: [...census.topLevel], missedPlants };
  },
  A3: () => ({
    // Kill controls: each form reads its sites.
    named: siteCount('import { createAgentSession } from "@earendil-works/pi-coding-agent";'),
    aliased: siteCount('import { query as sdkQuery } from "@anthropic-ai/claude-agent-sdk";'),
    subpath: siteCount('import { createAgentSession } from "@earendil-works/pi-coding-agent/dist/index.js";'),
    namespaceMember: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nsdk.query({ prompt: "x" });'),
    namespaceLiteralKey: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nsdk["prewarm"]();'),
    namespaceComputed: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst key = "query";\nsdk[key]({ prompt: "x" });'),
    namespaceArgument: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nhold(sdk);'),
    namespaceDestructured: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { startup } = sdk;'),
    namespaceSpread: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst copy = { ...sdk };'),
    namespaceAlias: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst alias = sdk;'),
    defaultMember: siteCount('import agent from "@earendil-works/pi-coding-agent";\nagent.createAgentSession({});'),
    importEquals: siteCount('import sdk = require("@anthropic-ai/claude-agent-sdk");\nsdk.query({ prompt: "x" });'),
    reexportNamed: siteCount('export { query } from "@anthropic-ai/claude-agent-sdk";'),
    reexportStar: siteCount('export * from "@anthropic-ai/claude-agent-sdk";'),
    reexportNamespace: siteCount('export * as sdk from "@anthropic-ai/claude-agent-sdk";'),
    dynamicDestructured: siteCount('export async function go(): Promise<void> { const { createAgentSession } = await import("@earendil-works/pi-coding-agent"); }'),
    dynamicMember: siteCount('export async function go(): Promise<void> { (await import("@anthropic-ai/claude-agent-sdk")).query({ prompt: "x" }); }'),
    dynamicBound: siteCount('export async function go(): Promise<void> { const sdk = await import("@anthropic-ai/claude-agent-sdk");\nsdk.query({ prompt: "x" }); }'),
    dynamicOpaque: siteCount('hold(import("@anthropic-ai/claude-agent-sdk"));'),
    requireLiteral: siteCount('const { query } = require("@anthropic-ai/claude-agent-sdk");'),
    createRequireLiteral: siteCount('const sdk = createRequire(import.meta.url)("@anthropic-ai/claude-agent-sdk");\nsdk.startup();'),
    providerDefault: siteCount('import Anthropic from "@anthropic-ai/sdk";'),
    providerNamed: siteCount('import { GoogleGenAI } from "@google/genai";'),
    providerSubpath: siteCount('import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime/dist-cjs/index.js";'),
    piAiProvider: siteCount('import { streamAnthropic } from "@earendil-works/pi-ai/providers/anthropic";'),
    piAiApi: siteCount('import { stream } from "@earendil-works/pi-ai/api/openai-completions";'),
    piAiClient: siteCount('import { createModels } from "@earendil-works/pi-ai";'),
    turnUser: siteCount('pi.sendUserMessage("go");'),
    turnUserLiteralKey: siteCount('pi["sendUserMessage"]("go");'),
    turnTrigger: siteCount('pi.sendMessage(message, { deliverAs: "followUp", triggerTurn: true });'),
    turnTriggerComputed: siteCount("pi.sendMessage(message, { triggerTurn: wanted });"),
    turnShorthand: siteCount("const triggerTurn = true;\npi.sendMessage(message, { triggerTurn });"),
    turnAssigned: siteCount("options.triggerTurn = true;"),
    runtimeSimple: siteCount("runtime.completeSimple(model, context);"),
    runtimeDeferredRead: siteCount("const fetch = runtime.fetchDeferred;"),
    runtimeDestructured: siteCount("const { streamSimple } = runtime;"),
    runtimeCalled: siteCount("runtime.complete(model, context);"),
    runtimeOptional: siteCount("runtime?.stream(model, context);"),
    runtimeViaCall: siteCount("runtime.stream.call(runtime, model, context);"),
    runtimeViaApply: siteCount("runtime.stream.apply(runtime, [model, context]);"),
    runtimeViaBind: siteCount("runtime.complete.bind(runtime);"),
    runtimeDestructuredAlias: siteCount('const { "fetchDeferred": fetch } = runtime;'),
    namespaceAliasedDestructured: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { query: launch } = sdk;'),
    dynamicLiteralMember: siteCount('(await import("@anthropic-ai/claude-agent-sdk"))["query"]({});'),
    // Quiet rows: none reads a site.
    typeOnlyImport: siteCount('import type { Options, Query } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlySpecifier: siteCount('import { type SDKMessage, getSessionMessages } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlyReexport: siteCount('export type { Options } from "@anthropic-ai/claude-agent-sdk";'),
    typeOnlyLaunchSpecifier: siteCount('import { type AgentSession, type ModelRuntime, getAgentDir } from "@earendil-works/pi-coding-agent";'),
    typeOnlyLaunchClause: siteCount('import type { AgentSession, createAgentSession } from "@earendil-works/pi-coding-agent";'),
    nonLaunchExports: siteCount('import { createSdkMcpServer, forkSession, getSessionInfo, tool } from "@anthropic-ai/claude-agent-sdk";\nimport { getAgentDir, SessionManager } from "@earendil-works/pi-coding-agent";'),
    namespaceTypeQuery: siteCount('import * as sdk from "@anthropic-ai/claude-agent-sdk";\ntype Q = typeof sdk;'),
    sideEffectImport: siteCount('import "@anthropic-ai/claude-agent-sdk";'),
    localQuery: siteCount('import { query } from "./workbench/local-query.js";\nquery();'),
    triggerTurnFalse: siteCount("pi.sendMessage(message, { deliverAs: \"nextTurn\", triggerTurn: false });"),
    turnInComment: siteCount("// pi.sendUserMessage would trigger a turn here; this module never calls it.\nconst text = \"sendUserMessage\";"),
    dataFields: siteCount("const busy = log.stream === \"stdout\" && result.complete;\nconst { stream, complete } = history;"),
    // R-ALIASED-RUNTIME quiet row: a generic runtime member reached through an alias or Reflect.apply.
    aliasedRuntime: siteCount("const run = runtime.complete;\nrun(model, context);\nReflect.apply(runtime.stream, runtime, [model, context]);"),
  }),
  B1: () => {
    const census = srcCensusOf();
    const sources = srcSources();
    const surfaces: string[] = [];
    for (const core of CORES) {
      const text = sources.get(core) ?? "";
      const source = sourceOf(core, text);
      for (const statement of source.statements) {
        const exported = ts.canHaveModifiers(statement) && ts.getModifiers(statement)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) === true;
        if (!exported) continue;
        if (ts.isClassDeclaration(statement) && statement.name !== undefined && ["EvidenceStore", "ObservationProjection"].includes(statement.name.text)) surfaces.push(`${core}: class ${statement.name.text}`);
        if (ts.isFunctionDeclaration(statement) && statement.name?.text === "observeInvocation") surfaces.push(`${core}: function ${statement.name.text}`);
      }
    }
    return {
      cores: CORES.filter(core => census.facts.has(core)),
      surfaces: surfaces.sort(),
      runtime: [typeof EvidenceStore, typeof ObservationProjection, typeof observeInvocation],
    };
  },
  B2: () => {
    const census = srcCensusOf();
    const knowers = new Set(census.knowers);
    const anchors = anchorsOf(census.facts.keys());
    // A constructed graph: the plane UI modules know a core; one unknowing module of each anchor form, a knowing one, and four
    // near-miss names (a plural, a missing dash, two in another directory, a subdirectory) that no anchor form names.
    const anchorGraph = censusOf(new Map(Object.entries({
      ...STUBS,
      ...Object.fromEntries(PLANE_UI.map(path => [path, 'import type { ObservationProjection } from "../workbench/observation.js";\n'])),
      "src/workbench/Gp-14_plant-observer.ts": "export const plant = 1;",
      "src/workbench/Gp-14_plant-evidence.ts": "export const plant = 2;",
      "src/workbench/evidence-Gp-14_plant.ts": "export const plant = 3;",
      "src/workbench/knowing-observer.ts": KNOWS,
      "src/workbench/plant-observers.ts": "export const plant = 4;",
      "src/workbench/plantevidence.ts": "export const plant = 5;",
      "src/ui/plant-observer.ts": "export const plant = 6;",
      "src/ui/evidence-plant.ts": "export const plant = 8;",
      "src/workbench/sub/plant-evidence.ts": "export const plant = 7;",
    })), CORES, SEAM, []);
    return {
      knowersAboveFloor: census.knowers.length >= KNOWER_FLOOR,
      coresKnown: CORES.every(core => knowers.has(core)),
      anchorFloors: Object.fromEntries(Object.entries(anchors).map(([form, paths]) => [form, paths.length >= (ANCHOR_FLOORS[form] ?? Number.POSITIVE_INFINITY)])),
      missingAnchors: unknowingAnchorsOf(census),
      controls: {
        byTypeImport: censusOf(new Map(Object.entries({ ...STUBS, "src/workbench/a.ts": KNOWS })), CORES, SEAM, []).knowers.includes("src/workbench/a.ts"),
        atDistance: censusOf(new Map(Object.entries({ ...STUBS, "src/workbench/a.ts": KNOWS, "src/b.ts": 'import type { X } from "./workbench/a.js";' })), CORES, SEAM, []).knowers.includes("src/b.ts"),
        byImportType: censusOf(new Map(Object.entries({ ...STUBS, "src/a.ts": 'type P = import("./workbench/observation.js").ObservationProjection;' })), CORES, SEAM, []).knowers.includes("src/a.ts"),
        unrelated: censusOf(new Map(Object.entries({ ...STUBS, "src/a.ts": 'import { quietly } from "./quiet.js";' })), CORES, SEAM, []).knowers.includes("src/a.ts"),
        unknowingAnchors: unknowingAnchorsOf(anchorGraph),
      },
    };
  },
  B3: () => {
    const sources = srcSources();
    const cores = subscriptionsOf(Object.fromEntries(CORES.map(core => [core, sources.get(core) ?? ""])));
    const control = (text: string): { listeners: number; callables: number; heritage: number } => {
      const reading = subscriptionsOf({ "src/workbench/observation.ts": text });
      return { listeners: reading.listeners.length, callables: reading.callables.length, heritage: reading.heritage.length };
    };
    const vocabulary = subscriptionsOf({
      "src/workbench/observation.ts":
        "export class Feed { onChange(): void {} subscribe(): void {} unsubscribe(): void {} addListener(): void {} removeListener(): void {} addEventListener(): void {} removeEventListener(): void {} listen(): void {} watch(): void {} unwatch(): void {} }",
    });
    return {
      listeners: [...cores.listeners],
      callables: [...cores.callables],
      heritage: [...cores.heritage],
      prototypeFloors: Object.fromEntries(Object.entries(PROTOTYPES).map(([name, prototype]) => [name, Object.getOwnPropertyNames(prototype).length >= (PROTOTYPE_FLOORS[name] ?? Number.POSITIVE_INFINITY)])),
      prototypeListeners: prototypeListenersOf(PROTOTYPES),
      prototypeControl: prototypeListenersOf({ PrototypeProbe: PrototypeProbe.prototype }),
      // Every vocabulary name, each read once (a name dropped from the vocabulary drops out of this list).
      vocabulary: vocabulary.listeners.map(label => label.slice(label.indexOf(": ") + 2)),
      controls: {
        // Cut #1's controls (a callback type reads as a callable type).
        onChange: control("export class ObservationProjection { onChange(listener: () => void): void { void listener; } }"),
        subscribe: control("export class EvidenceStore { subscribe(listener: () => void): void { void listener; } }"),
        callbackOption: control("export interface EvidenceStoreOptions { readonly maxEntries: number; readonly onSettled?: () => void }"),
        listenerOption: control("export interface ObservationLimits { readonly addListener?: (event: string) => void }"),
        quietMethod: control("export class ObservationProjection { refresh(snapshot: unknown): unknown { return snapshot; } }"),
        // A private member is read (no modifier exempts a spelling); near-miss names read quiet.
        privateMember: control("export class ObservationProjection { private onInternal(): void {} }"),
        nearMisses: control("export class Feed { on(): void {} once(): void {} online(): void {} onset(): void {} listener(): void {} listening(): void {} subscriber(): void {} watcher(): void {} reasonText(): void {} emit(): void {} }"),
        // Each spelling kind.
        identifierName: control("export function subscribe(target: unknown): void { void target; }"),
        privateName: control("export class Feed { #onChange(): void {} }"),
        stringName: control('export class Feed { "subscribe"(): void {} }'),
        templateName: control("export const feed = { [`watch`]: 1 };"),
        templateSpans: control(`export const names = (a: string, b: string): string[] => [\`listen\${a}\`, \`\${a}listen\${b}\`, \`\${b}listen\`];`),
        // Positions: a module-level binding, a string literal type and a call argument.
        bindingName: control("export const onRefresh = 1;"),
        typePosition: control('export type Mode = "subscribe" | "quiet";'),
        argumentPosition: control('register("watch");'),
        // The member forms refusal #1 named: FO1-FO6, then RB06, RB11, RB13 and RB08 (RB07 is stringName).
        moduleFunction: control("export function subscribe(listener: (projection: ObservationProjection) => void): () => void { void listener; return () => undefined; }"),
        moduleOnChange: control("export function onProjectionChange(listener: (projection: ObservationProjection) => void): void { void listener; }"),
        objectLiteral: control("export const projectionChanges = { subscribe(listener: () => void): void { void listener; } };"),
        emitterSubclass: control('import { EventEmitter } from "node:events";\nexport class ProjectionFeed extends EventEmitter {}'),
        typeAliasOption: control("export type EvidenceStoreHooks = { readonly onSettled?: () => void };"),
        anonymousDefaultClass: control("export default class { onSettled(listener: () => void): void { void listener; } }"),
        classExpression: control("export const Feed = class FeedImpl { onChange(): void {} };"),
        protectedMember: control("export class Feed { protected onChange(): void {} }"),
        staticMember: control("export class Feed { static onChange(): void {} }"),
        interfaceStringName: control('export interface Hooks { readonly "onSettled"?: () => void }'),
        // Each callable kind.
        functionType: control("export function follow(handler: () => void): void { void handler; }"),
        constructorType: control("export type Make = new () => object;"),
        methodSignature: control("export interface Hooks { settled(): void }"),
        callSignature: control("export interface Hook { (): void }"),
        constructSignature: control("export interface Make { new (): object }"),
        functionNames: control("export function follow(a: Function, b: CallableFunction, c: NewableFunction): void { void [a, b, c]; }"),
        // Each heritage form.
        classExtends: control("export class Feed extends EventTarget {}"),
        classImplements: control("export class Feed implements Hooks {}"),
        interfaceExtends: control("export interface Hooks extends EventTarget {}"),
        // Quiet: comments are not read.
        commentOnly: control("// subscribe(listener) would hang a change feed here; this module holds none.\nexport const quiet = 1;"),
        // R-UNNAMED-SUBSCRIPTION quiet rows: feeds with no listener spelling, callable type node or heritage clause.
        importedCallable: control('import type { Handler } from "./handler.js";\nexport function follow(handler: Handler): void { void handler; }'),
        typeofCallable: control("function noop(): void {}\nexport function follow(handler: typeof noop): void { void handler; }"),
        qualifiedCallable: control("export function follow(handler: globalThis.Function): void { void handler; }"),
        globalEmitter: control("export const changes = new EventTarget();"),
        promiseFeed: control("export class Feed { settled(): Promise<void> { return Promise.resolve(); } }"),
        iteratorFeed: control("export async function* changes(): AsyncGenerator<number> { yield 1; }"),
        composedName: control(`export function wire(target: Record<string, unknown>, name: string): void { target[\`on\${name}\`] = true; }`),
        lateDefinition: control('export class Feed { constructor() { Object.defineProperty(Feed.prototype, ["on", "Change"].join(""), { value: (): number => 0 }); } }'),
      },
    };
  },
  C1: () => {
    const census = srcCensusOf();
    const knowers = new Set(census.knowers);
    const siteSet = new Set(census.siteModules);
    const justified = MODEL_SIDE.map(path => {
      if (siteSet.has(path)) return `${path}: site`;
      const direct = census.facts.get(path)?.valueEdges.map(edge => edge.target).find(target => siteSet.has(target));
      return direct === undefined ? `${path}: unjustified` : `${path} -> ${direct}`;
    });
    return {
      violations: [...census.violations],
      typedHandles: [...census.typedHandles],
      knowersReaching: [...census.reaching.keys()].filter(path => knowers.has(path)).sort(),
      justified,
      reaching: [...census.reaching.keys()].sort(),
      siteModules: [...census.siteModules],
      seamMembers: Object.fromEntries([...census.seamMembers].map(([member, targets]) => [member, [...targets]])),
      seamImporters: Object.fromEntries([...census.seamImporters].map(([path, members]) => [path, [...members]])),
      plantedMissing: (() => {
        const outside = census.knowers.filter(path => !MODEL_SIDE.includes(path));
        const sources = srcSources();
        for (const path of outside) sources.set(path, `${sources.get(path) ?? ""}\nimport { query as ws05PlantQuery } from "@anthropic-ai/claude-agent-sdk";\n`);
        const planted = censusOf(sources, CORES, SEAM, MODEL_SIDE);
        return outside.filter(path => !planted.violations.includes(path));
      })(),
    };
  },
  C2: () => ({
    topLevel: {
      // Kill controls: module evaluation that calls a launch binding or a reaching import breaks the literal-constant premise.
      callsLaunchBinding: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport const SESSION = createAgentSession({});' }).topLevel.length,
      callsAliasedDynamic: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'const { query: launch } = await import("@anthropic-ai/claude-agent-sdk");\nlaunch({});' }).topLevel.length,
      callsAliasedNamespace: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import * as sdk from "@anthropic-ai/claude-agent-sdk";\nconst { query: launch } = sdk;\nlaunch({});' }).topLevel.length,
      callsProviderDefault: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import Client from "@anthropic-ai/sdk";\nnew Client();' }).topLevel.length,
      callsProviderDynamic: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'const Client = await import("@anthropic-ai/sdk");\nnew Client();' }).topLevel.length,
      callsReachingImport: graphCensus(`${KNOWS}import { SPIN } from "./frames.js";\nexport const frames = SPIN;`, { "src/workbench/frames.ts": 'import { runL } from "../launch.js";\nexport const SPIN = ["a"];\nrunL();' }).topLevel.length,
      topLevelTurn: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": "declare const pi: { sendUserMessage(text: string): void };\npi.sendUserMessage(\"boot\");" }).topLevel.length,
      // Quiet rows: the same calls inside function bodies never run at evaluation.
      insideFunction: graphCensus(`${KNOWS}export const ready = true;`, { "src/boot.ts": 'import { createAgentSession } from "@earendil-works/pi-coding-agent";\nexport function start(): unknown { return createAgentSession({}); }\nexport const later = (): unknown => createAgentSession({});' }).topLevel.length,
    },
    typedHandles: {
      // Kill controls: a knower's type-only binding from a reaching module is a typed handle.
      typedLauncher: graphCensus(`${KNOWS}import type { runL } from "../launch.js";\nexport function onRefresh(run: typeof runL): unknown { return run(); }`).typedHandles.length,
      typedImportType: graphCensus(`${KNOWS}export function onRefresh(run: typeof import("../launch.js").runL): unknown { return run(); }`).typedHandles.length,
      // Quiet rows: a structural handle (R-INJECTED) and a type from a module that reaches nothing.
      structural: graphCensus(`${KNOWS}export function onRefresh(run: () => unknown): unknown { return run(); }`).typedHandles.length,
      typedQuiet: graphCensus(`${KNOWS}import type { quietly } from "../quiet.js";\nexport type Q = typeof quietly;`).typedHandles.length,
    },
    // Kill controls: each plane module reaches a launch site once.
    direct: graphViolations(`${KNOWS}import { runL } from "../launch.js";\nexport function onRefresh(): unknown { return runL(); }`),
    transitive: graphViolations(`${KNOWS}import { middle } from "./middle.js";\nmiddle();`, { "src/workbench/middle.ts": 'import { runL } from "../launch.js";\nexport function middle(): unknown { return runL(); }' }),
    reexportNamed: graphViolations(`${KNOWS}import { runL } from "./relay.js";\nrunL();`, { "src/workbench/relay.ts": 'export { runL } from "../launch.js";' }),
    reexportStar: graphViolations(`${KNOWS}import { runL } from "./relay.js";\nrunL();`, { "src/workbench/relay.ts": 'export * from "../launch.js";' }),
    sideEffect: graphViolations(`${KNOWS}import "../launch.js";`),
    importEquals: graphViolations(`${KNOWS}import launch = require("../launch.js");\nlaunch.runL();`),
    dynamic: graphViolations(`${KNOWS}export async function onRefresh(): Promise<unknown> { return (await import("../launch.js")).runL(); }`),
    dynamicDestructured: graphViolations(`${KNOWS}export async function onRefresh(): Promise<unknown> { const { runL } = await import("../launch.js"); return runL(); }`),
    requireLiteral: graphViolations(`${KNOWS}const { runL } = createRequire(import.meta.url)("../launch.js");\nexport const go = (): unknown => runL();`),
    selfLaunch: graphViolations(`${KNOWS}import { query } from "@anthropic-ai/claude-agent-sdk";\nexport const go = (): unknown => query({ prompt: "x" });`),
    selfProvider: graphViolations(`${KNOWS}import OpenAI from "openai";\nexport const client = (): unknown => new OpenAI();`),
    injectedTurn: graphViolations(`${KNOWS}export function onRefresh(pi: { sendUserMessage(text: string): void }): void { pi.sendUserMessage("refresh"); }`),
    injectedTrigger: graphViolations(`${KNOWS}export function onRefresh(pi: { sendMessage(m: unknown, o: unknown): void }): void { pi.sendMessage({}, { triggerTurn: true }); }`),
    injectedRuntime: graphViolations(`${KNOWS}export function onRefresh(runtime: { completeSimple(m: unknown, c: unknown): unknown }): unknown { return runtime.completeSimple({}, {}); }`),
    seamLaunchMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function go(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { createClaudeWorkflowHost(): unknown }; return native.createClaudeWorkflowHost(); }`),
    seamTypedMember: graphViolations(`${KNOWS}import type { loadWorkbenchNative } from "./native-modules.js";\nexport function go(native: { createClaudeWorkflowHost(): unknown }, load: typeof loadWorkbenchNative): unknown { void load; return native.createClaudeWorkflowHost(); }`),
    nonLiteralConst: graphViolations(`${KNOWS}import { RUN } from "./holder.js";\nRUN();`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const RUN = (): unknown => runL();' }),
    seamStaticEdge: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function read(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { readClaudeTranscript(): string }; return native.readClaudeTranscript(); }`, {
      "src/workbench/native-modules.ts": `import { runL } from "../launch.js";\n${STUBS["src/workbench/native-modules.ts"] ?? ""}\nexport const warm = (): unknown => runL();`,
    }),
    mixedLiteral: graphViolations(`${KNOWS}import { SPIN, runL } from "../launch.js";\nexport const go = (): unknown => [SPIN, runL()];`),
    atDistance: graphViolations('import { runL } from "../launch.js";\nimport type { Middle } from "./middle.js";\nexport const go = (m: Middle): unknown => [m, runL()];', { "src/workbench/middle.ts": `${KNOWS}export type Middle = ObservationProjection;` }),
    // Quiet rows: none of these reaches a launch site.
    typeOnlyEdge: graphViolations(`${KNOWS}import type { runL } from "../launch.js";\nexport type R = typeof runL;`),
    literalConst: graphViolations(`${KNOWS}import { SPIN } from "../launch.js";\nexport const frames = SPIN;`),
    mixedArray: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = ["quiet", runL];' }),
    mixedObject: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = { quiet: "quiet", launch: runL };' }),
    literalParenthesized: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = ("quiet");' }),
    literalSatisfies: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = "quiet" satisfies string;' }),
    literalTemplate: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = `quiet`;' }),
    literalStringKey: graphViolations(`${KNOWS}import { VALUE } from "./holder.js";`, { "src/workbench/holder.ts": 'import { runL } from "../launch.js";\nexport const VALUE = { "quiet-key": "quiet" };' }),
    literalObject: graphViolations(`${KNOWS}import { NAMES, PCT } from "./names.js";\nexport const both = [NAMES, PCT];`, {
      "src/workbench/names.ts": 'import { runL } from "../launch.js";\nexport const NAMES = { AGENT: "Agent", STEER: "steer", depth: -1, on: true, none: null } as const;\nexport const PCT = 70;\nexport function later(): unknown { return runL(); }',
    }),
    seamReadMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function read(): Promise<unknown> { const native = (await loadWorkbenchNative()) as { readClaudeTranscript(): string }; return native.readClaudeTranscript(); }`),
    reverseDirection: graphViolations(`${KNOWS}export const plain = 1;`, { "src/feeder.ts": 'import { runL } from "./launch.js";\nimport type { ObservationProjection } from "./workbench/observation.js";\nexport function feed(p: ObservationProjection): unknown { return [p, runL()]; }' }, ["src/feeder.ts"]),
    // R-MODEL-SIDE quiet row: a model-side module that knows the plane and launches is exempt by construction.
    modelSide: graphViolations(`${KNOWS}import { runL } from "../launch.js";\nexport function onRefresh(): unknown { return runL(); }`, {}, [PLANE_MODULE]),
    // R-INJECTED quiet rows: a launcher handed in as a parameter, and one left on a global.
    injected: graphViolations(`${KNOWS}export function onRefresh(launch: () => unknown): unknown { return launch(); }`),
    injectedGlobal: graphViolations(`${KNOWS}export function onRefresh(): unknown { return (globalThis as { launch?: () => unknown }).launch?.(); }`),
    // R-COMPOSED quiet rows: a specifier assembled at run time, and a module loaded by a path string.
    composed: graphViolations(`${KNOWS}export async function onRefresh(name: string): Promise<unknown> { const target = "../" + name + ".js"; return import(target); }`),
    workerLoad: graphViolations(`${KNOWS}import { Worker } from "node:worker_threads";\nexport function onRefresh(): unknown { return new Worker(new URL("../launch.js", import.meta.url)); }`),
    // R-UNNAMED-PLANE quiet row: a structural projection with no import edge to a core.
    unnamedPlane: graphViolations('import { runL } from "../launch.js";\nexport function onRefresh(p: { refresh(s: unknown): unknown }, s: unknown): unknown { p.refresh(s); return runL(); }'),
    // R-NON-SDK-LAUNCH quiet row: a spawned model CLI.
    cliLaunch: graphViolations(`${KNOWS}import { spawn } from "node:child_process";\nexport function onRefresh(): unknown { return spawn("claude", ["-p", "summarize the change"]); }`),
    // R-NON-SDK-LAUNCH quiet rows: a raw HTTP request to a model endpoint, and an IPC request to a host process.
    ipcLaunch: graphViolations(`${KNOWS}import { connect } from "node:net";\nexport function onRefresh(path: string): unknown { return connect(path).write(JSON.stringify({ verb: "launch" })); }`),
    httpLaunch: graphViolations(`${KNOWS}export function onRefresh(): Promise<unknown> { return fetch("https://model.invalid/v1/messages", { method: "POST", body: "{}" }); }`),
    // R-COMPOSED quiet row: a seam member assembled at run time.
    seamComposedMember: graphViolations(`${KNOWS}import { loadWorkbenchNative } from "./native-modules.js";\nexport async function go(part: string): Promise<unknown> { const native = (await loadWorkbenchNative()) as Record<string, () => unknown>; return native[\`createClaude\${part}\`]?.(); }`),
  }),
  D1: () => {
    const census = srcCensusOf();
    const vocabulary = (path: string, text: string): string[] => spellingsOf(path, text).filter(spelled => SPECULATION.test(spelled)).map(spelled => `${path}: ${spelled}`);
    const sources = srcSources();
    const control = (text: string): number => vocabulary("src/control.ts", text).length;
    const warmControl = (text: string): number => warmStartsOf(sitesOf("src/control.ts", text)).length;
    return {
      checklist: [...OPT_IN_CHECKLIST],
      licenseClause: LICENSE_CLAUSE,
      vocabulary: [...sources].flatMap(([path, text]) => vocabulary(path, text)).sort(),
      warmStarts: warmStartsOf(sitesList(census)),
      missedPlants: [...sources].filter(([path, text]) => vocabulary(path, `${text}\nexport const ws05SpeculativeInference = true;\n`).length !== vocabulary(path, text).length + 1).map(([path]) => path),
      controls: {
        identifier: control("export const speculativeInference = { enabled: true };"),
        string: control('export const MODE = "speculation";'),
        comment: control("// Speculative inference stays off: this module never warms a model.\nexport const MODE = 1;"),
        // R-VOCABULARY quiet row: a seam worded outside the vocabulary.
        outsideVocabulary: control("export const prewarmedInference = { enabled: true };"),
        // Cut #2: each remaining token kind (a private identifier, read twice here; a no-substitution template; a head, middle and tail).
        privateName: control("export class Holder { #speculativeDepth = 0; depth(): number { return this.#speculativeDepth; } }"),
        noSubstitutionTemplate: control("export const MODE = `speculation`;"),
        templateSpans: control(`export const label = (a: string, b: string): string => \`speculative-\${a}-speculative-\${b}-speculative\`;`),
      },
      warmStartControls: {
        prewarm: warmControl('import { prewarm } from "@anthropic-ai/claude-agent-sdk";'),
        startup: warmControl('import { startup as warm } from "@anthropic-ai/claude-agent-sdk";'),
        // Quiet: a launch export that is no warm start.
        query: warmControl('import { query } from "@anthropic-ai/claude-agent-sdk";'),
      },
    };
  },
};

/** The judged pins whose case reached its witness assertion; the last case reads it. */
const REACHED = new Set<string>();

describe("wb-km7q.7 A1-D1 model-binding, plane-closure and opt-in-checklist census", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:2", "D:1"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // An external requirement anchor: coordinated row/roster deletion must not delete the filing's acceptance clause.
    const filing = readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")
      .filter(line => line.includes('"id":"wb-km7q.7"'))
      .map((line): unknown => JSON.parse(line))
      .find(entry => isObject(entry) && entry.id === "wb-km7q.7");
    expect(isObject(filing) && typeof filing.notes === "string").toBe(true);
    const notes = isObject(filing) && typeof filing.notes === "string" ? filing.notes : "";
    const acceptance = /Acceptance: ([^\n]+)\./.exec(notes)?.[1] ?? "";
    expect(acceptance.length).toBeGreaterThan(0);
    expect(ROWS.flatMap(row => row.requirement === undefined ? [] : [row.requirement]))
      .toEqual(acceptance.split(", plus "));

    expect({
      launchExports: LAUNCH_EXPORTS, providerPackages: PROVIDER_PACKAGES, wholeSubpaths: WHOLE_SUBPATHS, turnMembers: TURN_MEMBERS,
      runtimeMembers: [...RUNTIME_ANY, ...RUNTIME_CALLED], cores: CORES, seam: SEAM, modelSide: MODEL_SIDE,
      optInChecklist: OPT_IN_CHECKLIST, licenseClause: LICENSE_CLAUSE,
      listenerNames: LISTENER_NAMES, functionTypes: FUNCTION_TYPES, warmStarts: WARM_STARTS,
    }).toStrictEqual({
      launchExports: ROSTER.launchExports, providerPackages: ROSTER.providerPackages, wholeSubpaths: ROSTER.wholeSubpaths,
      turnMembers: ROSTER.turnMembers, runtimeMembers: ROSTER.runtimeMembers, cores: ROSTER.cores, seam: ROSTER.seam,
      modelSide: ROSTER.modelSide, optInChecklist: ROSTER.optInChecklist, licenseClause: ROSTER.licenseClause,
      listenerNames: ROSTER.listenerNames, functionTypes: ROSTER.functionTypes, warmStarts: ROSTER.warmStarts,
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
