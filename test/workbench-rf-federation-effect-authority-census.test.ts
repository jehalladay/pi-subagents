/**
 * wb-tnz5.1 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R1), the absent-today leg. Statement (bead notes, full form): "No Pi
 * surface shall derive B-side evaluate or effect authority from a federation read export; any Pi federation effect requires
 * independent B permission, a stable idempotency key, a non-read effectClass and the producer's effect receipt (gated FW-CFRR-08
 * B-owned effects endpoints; the rfc-bak67.6 ADR docs/adr/ADR-RFC-*-federation-effects.md is not written at the pin)."
 * (certified-federated-reactive-refinement-2026-10-18/README.md:34@6a251bf73af5). Acceptance, quoted: "(a) no Pi path issues a
 * B evaluate/effect on read-admission evidence alone; the attempt is refused inside Pi; (b) a future Pi federation-effect
 * capability registers a non-read effectClass, a stable idempotency key and the producer's effect receipt (wb-jwc.5 posture);
 * (c) until the ADR and endpoints ship, a hermetic guard pins no federation effect class in Pi's registry (0 federation hits in
 * Pi src)." The merged duplicate RF-FEDERATED-WORKSPACES-R10 carries three call-site pins: "no `rf workspace invoke` under a
 * read capability, no remote evaluation launched from render or invalidation paths (I07), and replay never silently re-invokes
 * remote effects (09-froe20-26:19)."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): README.md:34 "Remote
 * evaluate/effect operations are independent B-owned endpoints requiring B permission, idempotency key and effect receipt; a
 * read export grants neither evaluate nor effects."; 02-concrete-contract-and-verification-gates.md:31 "Read/import rights at A
 * never elevate authority to execute B operations."; 04-typed-acceptance-slice-and-protected-storage-plan.md:26 "No read
 * acceptance confers B-side remote evaluation or physical effect rights."; BEADS-2026-10-21.md:37 accepts rfc-bak67.6
 * (FW-CFRR-08a) on "ls docs/adr/ADR-RFC-*-federation-effects.md -> exactly 1 file", and none of the 90 files under docs/adr
 * matches at the pin. federated-workspaces-2026-10-18 (same pin): 04-cli-api.md:17-18 plans "Explicit source-side invocation,
 * separately admitted" as `rf workspace invoke knowledge:view:architecture --params params.json --json`;
 * 03-protocol-and-storage.md:53 "I05 A replay path never invokes B." and :55 "I07 Effect invocation is not reachable from pure
 * source invalidation."; 09-froe20-26-certified-live-admission.md:19 "Do not launch commands from render/invalidation. Replays
 * must not silently re-invoke remote effects." The installed rf (0.1.832 by `rf --json --version`, 2026-10-22) serves no
 * workspace leaf among its 79 leaves.
 *
 * MEASURED AT BASE (52bdd9e, landing 260; src identical to a7896f8, where it was first read): no src file spells the federation
 * stem (115 files); every registered descriptor (the native registration and the four injected ones) declares effectClass read,
 * and src carries exactly 8 register descriptor literals, all in providers/*.ts, each effectClass "read"; src's one rf launch is
 * spawn("rf", argv) in nativeReactiveFiberRender (providers/reactivefiber.ts) with argv from renderArgv (context render ...
 * --no-commit); the registry admits an invoke only on `invoke:<id>` (no declared permission) or on every declared permission, and
 * refuses at registration a permission spelled as a discover:, inspect: or observe: grant (capability-registry.ts register); the
 * Claude host binds node grants from its config (claude-host.ts callNode, `grants: config.grants`), never from a reading; a
 * resume refuses a journaled non-read node with uncertain-effect (runtime.ts node admission).
 *
 * RE-MEASURED AT BASE 92e5ae2 (landing 324) for wb-10fd, the R694 follow-up of landing 269 (gate of record cmd_405f66df13b1,
 * findings F1-F7; F1 leads): src is 115 files, every one a .ts module, and no string literal, template part or identifier spells
 * the stem decoded; src's register calls and `.register` references are the 8 inline read literals in providers/*.ts plus the
 * local-detached operator-module bridge (hosts/local-detached.ts registryFor: the typeof check, module.register(registry), the
 * re-bound registry.register and its register(provider) call); src's effectClass string literals are those 8 "read", runtime.ts's
 * read replay row "read" and journal-compat.ts's field description; CapabilityDescriptor declares effectClass
 * "read" | "write" | "external" | "unknown" among its 9 members and InvocationContext has 6; no src module calls import() or
 * require() on a non-literal specifier or references fetch, WebSocket or EventSource at all.
 *
 * RE-MEASURED AT BASE b887fa2 (landing 395) for wb-dghg, the R694 follow-up of landing 360 (gate of record cmd_3a66fe8d8644,
 * findings F1-F6, F1 leads; cut in the R739 TERMINAL enumerate-the-resolvable form, so each finding is bound below or named as a
 * residual with a pinned quiet row): src is 116 files, every one a .ts module; outside hosts/local-detached.ts, whose two
 * createRequire calls resolve the pinned local provider tree's relative imports and load the operator-reviewed provider module
 * (the bridge C3 names), no src module reaches a module through getBuiltinModule, createRequire, a member require, a process
 * native binding or a code-evaluator call, and none calls process.execve; the invalidation and observer closures never read
 * globalThis, global or process; the only src launch call whose command words spell rf is still the spawn in
 * nativeReactiveFiberRender; no src string literal spells register or a network name; and no src interface, class or
 * intersection type extends, intersects or re-declares CapabilityDescriptor or InvocationContext.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A stand-in future rf federation effect (EFFECT_ID, effectClass external; test-only, never in src) sits
 *    beside the injected preview. A1 under READ_ADMISSION (every grant the read surface carries) the effect is refused
 *    authorization with 0 provider calls, and it runs once when its own permission is added; A2 the same for a stand-in that
 *    declares no permission (the invoke:<id> branch); A3 registration refuses each read-admission grant spelling as an
 *    invocation permission; A4 Pi's Claude workflow host under READ_ADMISSION runs a script that reads the preview (its reading
 *    carries grant-shaped text) and hands the reading to the effect: the run fails authorization and the effect never runs;
 *    A5 the A4 twin on the no-permission branch: the same host run of a stand-in that declares no permission (its reading carries
 *    the very invoke:<id> that would admit it) fails authorization with 0 effect calls, and runs the effect once when the host is
 *    granted that invoke:<id> itself.
 *  B, acceptance (b). B1 no registered descriptor (native or injected) is in the federation-effect family (isFederationEffect:
 *    the stem or a workspace invoke/evaluate verb anywhere in its JSON); B2 the admission rule a future registration must meet - a
 *    non-read class, a permission of its own that no read descriptor carries, and a docs/workbench/receipts file naming its id,
 *    both GATING_ARTIFACTS and both ADMISSION_TERMS - holds vacuously on the real registrations (no family member), and eleven
 *    synthetic registrations exercise each clause; the receipt clause reads a receipt's rendered text (HTML comments stripped)
 *    one `## ` section at a time and drops every sentence that carries a negation word (no, not, never, none, neither, nor,
 *    nothing, nobody, nowhere, without, cannot, or an n't contraction), so a receipt that names the id under a negation (a
 *    neither/nor sentence included), splits the terms across sections or hides them in a comment registers nothing, and the
 *    unnegatedAbsence row pins R-UNNEGATED-ABSENCE quiet; B3 the landed never-retry posture a
 *    non-read effect inherits: a started external stand-in that fails surfaces uncertain-effect ("Reconcile with the producer
 *    before retrying") after exactly one provider call, while its read twin surfaces transport; B4 no idempotency key or effect
 *    receipt surface exists today: no src file spells either, no CapabilityDescriptor or InvocationContext member names one, both
 *    member sets are pinned exactly, and no src interface or class extends or implements either, no second declaration of either
 *    name merges or augments it and no intersection type includes either (the built-on inventory, with seven controls), so a key
 *    or receipt member under any other name, on either interface or on a type built on it, reds it; B5 B3's posture for every
 *    non-read class the source declares (the effectClass union, read from capability-registry.ts): each started stand-in that
 *    fails surfaces uncertain-effect after exactly one provider call.
 *  C, acceptance (c). C1 every src file read as UTF-8, and every src module's string literals, template parts and identifiers
 *    read decoded: none spells FEDERATION (a floor on the files walked, an anchor token, every src file a .ts module, and a control
 *    showing the decoded reading catches an escaped spelling the raw text hides); C2 no registered descriptor's JSON spells it
 *    (the served half); C3 every registered descriptor declares effectClass read, held to the source: src's register descriptor
 *    literals are the 8 in providers/*.ts, each "read", providers/*.ts carry no effectClass property outside them, every other src
 *    register call, `.register` reference, destructured register binding, ["register"] access or "register" string literal (a
 *    Reflect.get or Object.getOwnPropertyDescriptor key, a const-bound key) is the local-detached operator-module bridge, and src's
 *    effectClass string literals outside the providers are runtime.ts's read replay row and journal-compat.ts's field description;
 *    controls show the inventory sees each registration shape.
 *  D, the R10 call-site pins. D1 an AST scan of every src module and every registered descriptor for an rf workspace
 *    invoke/evaluate verb (an argv "workspace" followed anywhere later in the same literal by invoke or evaluate, or a string or
 *    template literal spelling one, joined by any run of whitespace, ".", "_" or "-", or by none), with a floor, a non-vacuity
 *    reading of the real render argv and eight controls; D2 src's one rf launch site is inside nativeReactiveFiberRender: a launch
 *    call (process.execve included; the launch function by name, by a literal key or through an import or same-module alias) is
 *    an rf launch when its command words include rf - the words of its first argument (a string literal, a template or a const
 *    bound to one in the same module, read as a shell command line) and of each literal element of an argv array, split on
 *    whitespace, quotes and shell operators, every path reduced to its base name - and the descriptor reaching it is read, and
 *    through the native registration under the preview's own grant a stand-in rf observes one `context render ... --no-commit`
 *    spawn per invoke, for both input arms, naming no workspace, invoke or evaluate word, with fifteen controls; D3 invalidation
 *    launches nothing (I07): the src import closure of observation.ts and graph-view.ts - where a getBuiltinModule, bare or member
 *    require, or createRequire(...)(...) call with a literal specifier is walked as an import - imports no process, network,
 *    loader or code-evaluation module, holds no edge the walk cannot follow (import() or a loader call on a non-literal specifier,
 *    a createRequire result not called at once, a loader read other than as a direct call, a process native binding or addon, a
 *    code evaluator), calls no launch API (process.execve included), references no network global by name, by literal key or as
 *    a string (called, constructed, aliased, keyed or spelled), and reads the global object and the process object only through a
 *    named member or a literal key; the rf reading observer's closure reaches the provider module only through string-constant
 *    bindings, and twenty-seven controls show the scan reports each shape; D4 a journaled run of the external stand-in, resumed
 *    through the Claude host, fails uncertain-effect naming its producer, with 0 provider calls on resume (09-froe20-26:19, I05);
 *    D5 D4 for every non-read class the source declares: each journaled run, resumed through the Claude host, fails
 *    uncertain-effect naming its producer, with 0 provider calls on resume.
 *  M, the matcher rows C1 and C2 read: M1-M8 the spellings FEDERATION must catch; Q1-Q4 the pinned quiet rows of its residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness and the four vocabularies (READ_ADMISSION, READ_GRANT_PREFIXES, GATING_ARTIFACTS,
 * ADMISSION_TERMS) - is held to the out-of-file roster test/fixtures/rf-federation-effect-authority-roster.json. A pin deleted,
 * relabelled, swapped for another passing case, or removed from every literal here at once still reds against the roster, and
 * every pin's witness is measured by its own case; B1, C3 and D2 are also anchored in src itself (the registrations, the
 * register sites and the launch sites), and B5 and D5 in the effectClass union capability-registry.ts declares.
 * RESIDUALS (named, each with a pinned quiet row): R-INTERRUPTED the stem split by a zero-width code point (Q1); R-HOMOGLYPH one
 * letter swapped for a look-alike from another script (Q2); R-COMPOSED a spelling assembled at runtime from parts is invisible
 * to a text scan (Q3), and C2 is the runtime backstop for served descriptor text only; R-UNNAMED an effect surface that never
 * spells the stem (Q4), whose backstop is C3: a non-read descriptor that any src registration ships - native, injected, an inline
 * literal, or a descriptor variable at a new register site - reds it whatever its name, while the operator-reviewed local
 * provider the detached host loads through its pinned bridge (local.* ids only, from a module outside src) is outside C3's claim
 * (A1-A3 still hold for it: the registry checks grants for every registrant); R-COMPUTED-REGISTER a register function reached
 * through a computed key that no literal spells, by element access or by a reflective lookup (Reflect.get,
 * Object.getOwnPropertyDescriptor), is invisible to C3's inventory (C3's computedRegister and reflectComputed controls stay 0);
 * R-COMPOSED-ARGV an invoke argv built from non-literal parts is invisible to D1 (D1's composedArgv control stays 0);
 * R-OPAQUE-BINARY an rf launch whose command words are not literal (an environment value, a parameter, an import, a composed
 * string) is invisible to D2 (D2's opaque control stays 0); R-OPAQUE-LAUNCHER a launch function reached other than by name, by a
 * literal key or through an import or same-module alias (a parameter, call/apply/bind, Reflect.apply, a computed key) is
 * invisible to D2 (D2's opaqueLauncher control stays 0); R-COMPOSED-GLOBAL a network global reached through a key no literal
 * spells, on an object the scan cannot name as the global object (a parameter, an import, a returned value), is invisible to D3
 * (D3's composedGlobal control stays 0); R-UNNEGATED-ABSENCE B2's predicate reads co-mention as registration, so a receipt
 * sentence that states the absence with no negation word (stays unregistered, is deferred, pending) still registers (B2's
 * unnegatedAbsence row stays []); R-MAPPED-SURFACE a key or receipt member added through a mapped or conditional type over either
 * interface, with no heritage clause, intersection or re-declaration, is invisible to B4's built-on inventory (B4's
 * mappedSurface control stays 0).
 * SCOPE: the quotes, the ADR absence and the planned verb are producer facts at 6a251bf73af5; Pi vendors no rf source, so a
 * producer-side change is seen only when an rf pin-bump re-reads them. A1-A3 and A5 hold for every descriptor the registry admits,
 * whoever registers it (the detached host's operator-reviewed local provider registers through the same CapabilityRegistry).
 * The armed half - a federation effect that carries an idempotency key and cites the producer's effect receipt - waits for
 * FW-CFRR-08 and rfc-bak67.6: no effect capability is added to src, and the stand-ins live in this file only.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and docs/workbench/receipts are only
 * read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import {
  type CapabilityDescriptor,
  CapabilityError,
  type CapabilityProvider,
  CapabilityRegistry,
  type InvocationContext,
  type JsonValue,
} from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf, type Json, RF_FIXTURE_OPERATION_ID, RF_FIXTURE_WORKSPACE_ID } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const SRC = join(REPO, "src");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federation-effect-authority-roster.json");
const REGISTRY_SOURCE = join(SRC, "workbench", "capability-registry.ts");
const PROVIDER_SOURCE = join(SRC, "workbench", "providers", "reactivefiber.ts");
const ROOT = process.cwd();

const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_PERMISSION = "reactivefiber:render";
/** The stand-in for a future rf federation effect, the planned `rf workspace invoke` (04-cli-api.md:18). Test-only: row C reads src. */
const EFFECT_ID = "reactivefiber.workspace.invoke";
const EFFECT_PERMISSION = "reactivefiber:workspace-invoke";
const EFFECT_INPUT = { type: "object", properties: { admission: { type: "object" } }, required: ["admission"], additionalProperties: false };
const EFFECT_INPUT_VALUE = { admission: { view: "knowledge:view:architecture" } };
/** The read-admission grant prefixes the registry refuses as an invocation permission (capability-registry.ts register). */
const READ_GRANT_PREFIXES = ["discover", "inspect", "observe"];
/** Every grant the read surface carries: each read-admission grant over both ids, the preview's own permission and its invoke grant. */
const READ_ADMISSION: readonly string[] = [
  ...READ_GRANT_PREFIXES.flatMap(prefix => [`${prefix}:${PREVIEW_ID}`, `${prefix}:${EFFECT_ID}`]),
  PREVIEW_PERMISSION,
  `invoke:${PREVIEW_ID}`,
];
/** FW-CFRR-08 (B-owned evaluate/effect endpoints) and rfc-bak67.6 (FW-CFRR-08a, the federation-effects ADR), both unshipped at the pin. */
const GATING_ARTIFACTS = ["FW-CFRR-08", "rfc-bak67.6"];
/** README.md:34 "requiring B permission, idempotency key and effect receipt": the two terms a registering receipt must carry. */
const ADMISSION_TERMS = ["idempotency key", "effect receipt"];
/** Rows C1, C2 and B1's matcher: the federation stem in any case (federation, federated, federate). */
const FEDERATION = /federat/i;
/** Row D1's matcher: an rf workspace invoke or evaluate verb, joined by any run of whitespace, ".", "_" or "-", or by none (camelCase). */
const INVOKE_VERB = /\bworkspace[\s._-]*(?:invoke|evaluate)\b/i;
const VERB_WORDS = ["invoke", "evaluate"];
const EFFECT_RECEIPT = /effect[\s_-]*receipt/i;
const IDEMPOTENCY_KEY = /idempotency[\s_-]*key/i;
/** A negation word (not inside a flag such as --no-commit) or an n't contraction: a sentence carrying one registers nothing. */
const NEGATION = /(?<![\w-])(?:no|not|never|none|neither|nor|nothing|nobody|nowhere|without|cannot)(?![\w-])|n't\b/i;
/** The one src effectClass string literal that is not a descriptor class: journal-compat.ts's table of field descriptions. */
const FIELD_DESCRIPTION_LITERAL = "src/workflow/journal-compat.ts:a string when present";
/** The local-detached operator-module bridge: the only src register surface outside the inline provider literals (R-UNNAMED). */
const OPERATOR_BRIDGE = "src/workbench/hosts/local-detached.ts:registryFor:";
const HEAD = 'export const meta = { name: "federation-effect-authority", description: "wb-tnz5.1 census probe" };\n';

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) no Pi path issues a B evaluate/effect on read-admission evidence alone; the attempt is refused inside Pi",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) a future Pi federation-effect capability registers a non-read effectClass, a stable idempotency key and the producer's effect receipt (wb-jwc.5 posture)",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) until the ADR and endpoints ship, a hermetic guard pins no federation effect class in Pi's registry (0 federation hits in Pi src)",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "R10 call-site pins: no rf workspace invoke under a read capability, no remote evaluation launched from render or invalidation paths (I07), and replay never silently re-invokes remote effects (09-froe20-26:19)",
    pins: ["D1", "D2", "D3", "D4", "D5"],
  },
  {
    id: "M",
    label: "the FEDERATION matcher rows C1 and C2 read catches every case and affix spelling of the stem, and its named residuals stay pinned quiet",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "Q1", "Q2", "Q3", "Q4"],
  },
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
interface Roster {
  readonly readAdmission: readonly string[];
  readonly readGrantPrefixes: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly admissionTerms: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function objectOf(value: Json | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows)) throw new Error("roster must be an object with a rows list");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: JSON.parse(JSON.stringify(pin.witness)) as Json };
    });
    return { id: row.id, label: row.label, pins };
  });
  return {
    readAdmission: strings(raw.readAdmission, "readAdmission"),
    readGrantPrefixes: strings(raw.readGrantPrefixes, "readGrantPrefixes"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    admissionTerms: strings(raw.admissionTerms, "admissionTerms"),
    rows,
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
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
const repoPath = (path: string): string => relative(REPO, path);
const srcModules = (): string[] => filesBelow(SRC).filter(file => file.endsWith(".ts"));
const SRC_FLOOR = 100;

/* ---------------------------------------------------------------------------------------------------------------------------
 * The registrations Pi ships: the native registration and the four injected ones, each with a reader that is never invoked.
 * ------------------------------------------------------------------------------------------------------------------------- */

const neverInvoked = (what: string) => (): never => {
  throw new Error(`census ${what}: never invoked, registration only stores the descriptor`);
};

let nativeCache: Promise<CapabilityDescriptor[]> | undefined;
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCache ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCache;
}
function injectedDescriptors(): CapabilityDescriptor[] {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, { gate: { status: neverInvoked("forge reader") } }, "0.0.0-census");
  registerFurnaceRunInspect(registry, { runs: { get: neverInvoked("furnace reader") } }, ROOT);
  registerHyperUnixFind(registry, { find: neverInvoked("hyperunix find"), runtime: neverInvoked("hyperunix runtime"), close: async () => {} }, ROOT);
  registerReactiveFiberRender(registry, () => Promise.reject(new Error("census rf reader: never invoked")), ROOT);
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
const idsOf = (descriptors: readonly CapabilityDescriptor[]): string[] => descriptors.map(descriptor => descriptor.id).sort();
const classesOf = (descriptors: readonly CapabilityDescriptor[]): string[] =>
  descriptors.map(descriptor => `${descriptor.id}:${descriptor.effectClass}`).sort();

/** Row B's family: a descriptor whose JSON spells the federation stem or an rf workspace invoke/evaluate verb. */
function isFederationEffect(descriptor: CapabilityDescriptor): boolean {
  const text = JSON.stringify(descriptor);
  return FEDERATION.test(text) || INVOKE_VERB.test(text);
}

/** A receipt's rendered text (HTML comments stripped), cut into its `## ` entry sections (the title section first). */
function receiptSections(text: string): string[] {
  return text.replace(/<!--[\s\S]*?-->/g, " ").split(/^(?=## )/m);
}
/** One section's affirmed text: its sentences (a terminator, a paragraph break or a list item ends one) minus every negated one. */
function affirmedText(section: string): string {
  return section
    .split(/(?<=[.;!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]|\d+\.)\s)/)
    .filter(sentence => !NEGATION.test(sentence))
    .join(" ");
}
/** A registering receipt: one section whose affirmed text names the id, both gating artifacts and both admission terms. */
function registersInReceipt(text: string, id: string): boolean {
  return receiptSections(text).some(section => {
    const affirmed = affirmedText(section);
    return affirmed.includes(id) && GATING_ARTIFACTS.every(artifact => affirmed.includes(artifact)) && ADMISSION_TERMS.every(term => affirmed.toLowerCase().includes(term));
  });
}

/**
 * The admission rule a federation-effect registration must meet (README.md:34; 02-concrete-contract-and-verification-gates.md:31):
 * a non-read effect class, a permission of its own that no read descriptor carries, and a registering receipt naming its id,
 * both gating artifacts and both admission terms. Descriptors outside the family are not judged.
 */
function admissionViolations(descriptors: readonly CapabilityDescriptor[], receipts: readonly string[]): string[] {
  const readPermissions = new Set(descriptors.filter(descriptor => descriptor.effectClass === "read" && !isFederationEffect(descriptor)).flatMap(descriptor => descriptor.permissions));
  return descriptors.filter(isFederationEffect).flatMap(descriptor => {
    const violations: string[] = [];
    if (descriptor.effectClass === "read") violations.push(`${descriptor.id}: declares effectClass read`);
    if (descriptor.permissions.length === 0) violations.push(`${descriptor.id}: declares no permission of its own`);
    for (const permission of descriptor.permissions) {
      if (readPermissions.has(permission)) violations.push(`${descriptor.id}: shares the read permission ${permission}`);
    }
    if (!receipts.some(text => registersInReceipt(text, descriptor.id))) {
      violations.push(`${descriptor.id}: no registering receipt names it with ${GATING_ARTIFACTS.join(" and ")}, an ${ADMISSION_TERMS.join(" and an ")}`);
    }
    return violations;
  });
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * The stand-in effect and the injected preview whose reading carries grant-shaped text.
 * ------------------------------------------------------------------------------------------------------------------------- */

interface Calls {
  read: number;
  effect: number;
}
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
/** The strings a reading carries that look like the effect's grants; a reading never becomes a grant. */
const GRANT_SHAPED = [`invoke:${EFFECT_ID}`, EFFECT_PERMISSION, `discover:${EFFECT_ID}`];
function grantShapedEnvelope(): Envelope {
  const result = objectOf(fullShapeRf(ROOT).result, "fullShapeRf result");
  return {
    schema: "reactive-fiber.cli/v1", ok: true, command: "context.render", operation_id: RF_FIXTURE_OPERATION_ID,
    workspace: { id: RF_FIXTURE_WORKSPACE_ID, root: ROOT }, transaction_id: null,
    result: { ...result, grants: [...GRANT_SHAPED] }, diagnostics: [],
  };
}
function effectProvider(options: {
  readonly effectClass?: CapabilityDescriptor["effectClass"];
  readonly permissions: readonly string[];
  readonly calls: Calls;
  readonly answer?: (input: JsonValue) => JsonValue;
}): CapabilityProvider {
  return {
    descriptor: {
      id: EFFECT_ID, version: "1.0.0", description: "census stand-in for a future rf workspace invoke (test-only)",
      inputSchema: EFFECT_INPUT, effectClass: options.effectClass ?? "external", permissions: options.permissions, supportedModes: ["invoke"],
    },
    async invoke(input) {
      options.calls.effect += 1;
      return options.answer === undefined ? { accepted: true } : options.answer(input);
    },
  };
}
/** One registry: the injected preview (whose reading carries GRANT_SHAPED) beside the stand-in effect. */
function federationRegistry(permissions: readonly string[], answer?: (input: JsonValue) => JsonValue): { registry: CapabilityRegistry; calls: Calls } {
  const calls: Calls = { read: 0, effect: 0 };
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls.read += 1;
    return grantShapedEnvelope();
  }, ROOT);
  registry.register(effectProvider({ permissions, calls, ...(answer === undefined ? {} : { answer }) }));
  return { registry, calls };
}
/** A registry holding only a stand-in of one effect class (rows B5 and D5). */
function classRegistry(effectClass: CapabilityDescriptor["effectClass"], answer?: (input: JsonValue) => JsonValue): { registry: CapabilityRegistry; calls: Calls } {
  const calls: Calls = { read: 0, effect: 0 };
  const registry = new CapabilityRegistry();
  registry.register(effectProvider({ effectClass, permissions: [EFFECT_PERMISSION], calls, ...(answer === undefined ? {} : { answer }) }));
  return { registry, calls };
}
function contextOf(grants: readonly string[]): InvocationContext {
  return { grants: [...grants], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function refusalFrom(call: Promise<JsonValue>): Promise<{ category: string; message: string }> {
  return refusalOf(await call.then(() => undefined, (caught: unknown) => caught));
}
const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census scripts call node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
/** A script that reads the preview and hands the reading to the effect (rows A4 and A5). */
const READ_THEN_EFFECT = `${HEAD}const reading = await node(${JSON.stringify(PREVIEW_ID)}, { model: "m", task: "t" });\nreturn await node(${JSON.stringify(EFFECT_ID)}, { admission: reading });`;
/** A script that invokes the effect once (rows D4 and D5). */
const EFFECT_ONLY = `${HEAD}return await node(${JSON.stringify(EFFECT_ID)}, ${JSON.stringify(EFFECT_INPUT_VALUE)});`;

/* ---------------------------------------------------------------------------------------------------------------------------
 * The stand-in rf (row D2): first on PATH, it logs one JSON argv line per spawn and prints the full-shape render envelope.
 * ------------------------------------------------------------------------------------------------------------------------- */

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});
function standInRf(envelope: Json): string {
  const folder = makeScratch("rf-federation-effect-authority-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    `#!/usr/bin/env node\nrequire("node:fs").appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");\nprocess.stdout.write(JSON.stringify(${JSON.stringify(envelope)}));\nprocess.exit(0);\n`,
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}

/* ---------------------------------------------------------------------------------------------------------------------------
 * Source readers.
 * ------------------------------------------------------------------------------------------------------------------------- */

function parse(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function stringLiteralOf(node: ts.Expression | undefined): string | undefined {
  return node !== undefined && ts.isStringLiteralLike(node) ? node.text : undefined;
}
/** The expression under `as`, `satisfies`, `<T>`, `!` and parentheses. */
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isTypeAssertionExpression(at) || ts.isNonNullExpression(at) || ts.isParenthesizedExpression(at)) at = at.expression;
  return at;
}
function propertyOf(literal: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const property of literal.properties) {
    if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === name) return property.initializer;
  }
  return undefined;
}
function calleeName(call: ts.CallExpression): string | undefined {
  const callee = call.expression;
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  return undefined;
}
/** The name of the function declaration enclosing a node, or <module>. */
function enclosingFunction(node: ts.Node): string {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
  }
  return "<module>";
}

/** One module's spellings as the runtime reads them: every string literal, template part and identifier that spells the stem decoded. */
function decodedStemHits(fileName: string, text: string): string[] {
  const hits: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isStringLiteralLike(node) || ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && FEDERATION.test(node.text)) hits.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (parts.some(part => FEDERATION.test(part)) || FEDERATION.test(parts.join(""))) hits.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return hits;
}

interface RegisterSurface {
  readonly literals: string[];
  readonly effectClassProperties: number;
  readonly opaque: string[];
  readonly effectClassLiterals: string[];
}
/**
 * One module's registration surface: every `<x>.register({ descriptor: { ... } })` descriptor literal; every other register call,
 * `.register` reference, destructured register binding, ["register"] access or "register" string literal (a descriptor variable, a
 * re-bound or aliased register function, a module handed the registry, a reflective lookup or a const-bound key), named by its
 * enclosing function and its own text; the count of effectClass properties anywhere in it; and every effectClass property whose
 * value is a string literal (through `as`, `satisfies`, `!` or parentheses).
 */
function registerSurface(fileName: string, text: string): RegisterSurface {
  const source = parse(fileName, text);
  const literals: string[] = [];
  const opaque: string[] = [];
  const effectClassLiterals: string[] = [];
  let effectClassProperties = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "effectClass") {
      effectClassProperties += 1;
      const value = unwrapped(node.initializer);
      if (ts.isStringLiteralLike(value)) effectClassLiterals.push(`${fileName}:${value.text}`);
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "register") {
      const argument = node.arguments[0];
      const descriptor = argument !== undefined && ts.isObjectLiteralExpression(argument) ? propertyOf(argument, "descriptor") : undefined;
      if (descriptor !== undefined && ts.isObjectLiteralExpression(descriptor)) {
        literals.push(`${fileName}:${stringLiteralOf(propertyOf(descriptor, "id")) ?? "?"}:${stringLiteralOf(propertyOf(descriptor, "effectClass")) ?? "?"}`);
      } else {
        opaque.push(`${fileName}:${enclosingFunction(node)}:${node.expression.getText(source)}(...)`);
      }
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "register") opaque.push(`${fileName}:${enclosingFunction(node)}:register(...)`);
    if (ts.isPropertyAccessExpression(node) && node.name.text === "register" && !(ts.isCallExpression(node.parent) && node.parent.expression === node)) {
      opaque.push(`${fileName}:${enclosingFunction(node)}:${node.getText(source)}`);
    }
    if (ts.isBindingElement(node)) {
      const bound = node.propertyName ?? node.name;
      if ((ts.isIdentifier(bound) || ts.isStringLiteral(bound)) && bound.text === "register") opaque.push(`${fileName}:${enclosingFunction(node)}:{ register }`);
    }
    if (ts.isElementAccessExpression(node) && stringLiteralOf(node.argumentExpression) === "register") opaque.push(`${fileName}:${enclosingFunction(node)}:${node.getText(source)}`);
    // A "register" key anywhere else (Reflect.get, Object.getOwnPropertyDescriptor, a const-bound key) reaches the same function.
    if (ts.isStringLiteralLike(node) && node.text === "register" && !(ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node)) {
      opaque.push(`${fileName}:${enclosingFunction(node)}:${node.parent.getText(source)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { literals, effectClassProperties, opaque, effectClassLiterals };
}

interface VerbScan {
  readonly verbArgv: string[];
  readonly verbLiterals: string[];
  readonly renderArgv: number;
}
/** One module's rf workspace invoke/evaluate verbs: an argv array with "workspace" then, anywhere later, a verb word, or a string or template literal spelling one. */
function scanVerbs(fileName: string, text: string): VerbScan {
  const verbArgv: string[] = [];
  const verbLiterals: string[] = [];
  let renderArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const elements = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (elements.some((element, index) => element === "workspace" && elements.slice(index + 1).some(later => VERB_WORDS.includes(later)))) {
        verbArgv.push(`${fileName}: [${elements.filter(Boolean).join(", ")}]`);
      }
      if (elements.some((element, index) => element === "context" && elements[index + 1] === "render")) renderArgv += 1;
    }
    if (ts.isStringLiteralLike(node) && INVOKE_VERB.test(node.text)) verbLiterals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (INVOKE_VERB.test(parts.join(" "))) verbLiterals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(parse(fileName, text));
  return { verbArgv, verbLiterals, renderArgv };
}

const LAUNCH_NAMES = ["spawn", "spawnSync", "execFile", "execFileSync", "execSync", "fork", "execve"];
/** One module's const bindings to a string literal, by name (any scope: a shadowing binding can only over-report a site). */
function constStrings(source: ts.SourceFile): Map<string, string> {
  const constants = new Map<string, string>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclarationList(node) && (node.flags & ts.NodeFlags.Const) !== 0) {
      for (const declaration of node.declarations) {
        const value = declaration.initializer === undefined ? undefined : stringLiteralOf(unwrapped(declaration.initializer));
        if (ts.isIdentifier(declaration.name) && value !== undefined) constants.set(declaration.name.text, value);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return constants;
}
/** The name a callee or member spells: an identifier, a member name or a string-literal key (through `as`, `!` and parentheses). */
function memberName(node: ts.Expression): string | undefined {
  const at = unwrapped(node);
  if (ts.isIdentifier(at)) return at.text;
  if (ts.isPropertyAccessExpression(at)) return at.name.text;
  if (ts.isElementAccessExpression(at)) return stringLiteralOf(at.argumentExpression);
  return undefined;
}
/** A command line's words: split on whitespace, quotes and shell operators, each path reduced to its base name (.exe or .cmd dropped). */
function commandWords(command: string): string[] {
  return command
    .split(/[\s"'`;&|()<>]+/)
    .filter(Boolean)
    .map(word => (word.split(/[\\/]/).pop() ?? word).replace(/\.(?:exe|cmd)$/i, ""));
}
/** One module's local names for a launch function: an import or a destructuring that renames one, or a const bound to one. */
function launchAliases(source: ts.SourceFile): Map<string, string> {
  const launchers = [...LAUNCH_NAMES, "exec"];
  const aliases = new Map<string, string>();
  const visit = (node: ts.Node): void => {
    if ((ts.isImportSpecifier(node) || ts.isBindingElement(node)) && ts.isIdentifier(node.name)) {
      const imported = node.propertyName ?? node.name;
      if ((ts.isIdentifier(imported) || ts.isStringLiteral(imported)) && launchers.includes(imported.text)) aliases.set(node.name.text, imported.text);
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined) {
      const bound = memberName(node.initializer);
      if (bound !== undefined && launchers.includes(bound)) aliases.set(node.name.text, bound);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return aliases;
}
/**
 * One module's rf launch sites: a launch call (any launch name, exec and process.execve included; the function by name, by a literal
 * key, or through an import or same-module alias) whose command words include rf - the words of its first argument (a string
 * literal, a template, or a const bound to a string in the same module, read as a shell command line) and of each literal element
 * of an argv array second argument - each named by its enclosing function and its launch name.
 */
function rfLaunchSites(fileName: string, text: string): string[] {
  const source = parse(fileName, text);
  const constants = constStrings(source);
  const aliases = launchAliases(source);
  const launchers = [...LAUNCH_NAMES, "exec"];
  const commandText = (node: ts.Expression | undefined): string | undefined => {
    if (node === undefined) return undefined;
    const value = unwrapped(node);
    if (ts.isIdentifier(value)) return constants.get(value.text);
    if (ts.isTemplateExpression(value)) return [value.head.text, ...value.templateSpans.map(span => `${commandText(span.expression) ?? " "}${span.literal.text}`)].join("");
    return stringLiteralOf(value);
  };
  const wordsOf = (call: ts.CallExpression): string[] => {
    const argv = call.arguments[1] === undefined ? undefined : unwrapped(call.arguments[1]);
    const elements = argv !== undefined && ts.isArrayLiteralExpression(argv) ? argv.elements.map(element => commandText(element) ?? "") : [];
    return [commandText(call.arguments[0]) ?? "", ...elements].flatMap(commandWords);
  };
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      const name = ts.isIdentifier(callee) ? (aliases.get(callee.text) ?? callee.text) : memberName(callee);
      if (name !== undefined && launchers.includes(name) && wordsOf(node).includes("rf")) sites.push(`${fileName}:${enclosingFunction(node)}:${name}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}

/** A process, network, loader or code-evaluation module: a launch, a connection or a walk-proof edge needs one (node: optional). */
const LAUNCH_MODULE = /^(?:node:)?(?:child_process|cluster|dgram|http|http2|https|module|net|tls|vm|worker_threads)$/;
const NETWORK_NAMES = ["fetch", "WebSocket", "EventSource"];
/** The loaders a call reaches a module through with no static import: require (bare or a member, module.require) and getBuiltinModule. */
const LOADER_NAMES = ["require", "getBuiltinModule"];
/** The process members that load or launch with no import at all: native bindings, native addons and an in-place exec. */
const PROCESS_EDGES = ["binding", "_linkedBinding", "dlopen", "execve"];
/** Node's two spellings of the global object (window and self are not defined in Node); each is read only through a named member or a literal key. */
const GLOBAL_OBJECTS = ["globalThis", "global"];
/** The code evaluators: the string they run is an edge no walk can follow. */
const CODE_EVALUATORS = ["eval", "Function"];
interface ModuleFacts {
  readonly specifiers: string[];
  readonly networkCalls: string[];
  readonly launchCalls: string[];
  readonly opaqueImports: string[];
  readonly networkRefs: string[];
}
/** True when a network-name identifier is the callee networkCalls already counts: called by name, called as a property, or constructed by name. */
function countedAsNetworkCall(node: ts.Identifier): boolean {
  const parent = node.parent;
  if ((ts.isCallExpression(parent) || ts.isNewExpression(parent)) && parent.expression === node) return true;
  return ts.isPropertyAccessExpression(parent) && parent.name === node && ts.isCallExpression(parent.parent) && parent.parent.expression === parent;
}
/** The receiver of a member access (through `as`, `!` and parentheses), or undefined for anything else. */
function receiverOf(node: ts.Expression): ts.Expression | undefined {
  const at = unwrapped(node);
  return ts.isPropertyAccessExpression(at) || ts.isElementAccessExpression(at) ? unwrapped(at.expression) : undefined;
}
/** The process object: `process`, or a member that spells it (globalThis.process, global["process"]). */
function isProcessObject(node: ts.Expression | undefined): boolean {
  if (node === undefined) return false;
  const at = unwrapped(node);
  return (ts.isIdentifier(at) && at.text === "process") || (receiverOf(at) !== undefined && memberName(at) === "process");
}
/** The node a value occupies once the `as`, `satisfies`, `<T>`, `!` and parentheses around it are climbed. */
function outermost(node: ts.Node): ts.Node {
  let at = node;
  while (ts.isAsExpression(at.parent) || ts.isSatisfiesExpression(at.parent) || ts.isTypeAssertionExpression(at.parent) || ts.isNonNullExpression(at.parent) || ts.isParenthesizedExpression(at.parent)) at = at.parent;
  return at;
}
/** True when the node (climbed through its wrappers) is what a call or a construction invokes. */
function isCallee(node: ts.Node): boolean {
  const at = outermost(node);
  return (ts.isCallExpression(at.parent) || ts.isNewExpression(at.parent)) && at.parent.expression === at;
}
/** True when the node (climbed through its wrappers) is read through a named member or a string-literal key and nothing else. */
function memberRead(node: ts.Node): boolean {
  const at = outermost(node);
  const parent = at.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === at) return true;
  return ts.isElementAccessExpression(parent) && parent.expression === at && stringLiteralOf(parent.argumentExpression) !== undefined;
}
/** True when an identifier is read as a value: not a declaration or member name, an import or export specifier, a label or a type. */
function isValueRead(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isShorthandPropertyAssignment(parent)) return true;
  if (["name", "propertyName", "label"].some(key => Reflect.get(parent, key) === node)) return false;
  if (ts.isQualifiedName(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
  for (let at: ts.Node | undefined = parent; at !== undefined; at = at.parent) if (ts.isTypeNode(at)) return false;
  return true;
}
/**
 * One module's facts for the closure walk: its static and dynamic import specifiers, where getBuiltinModule, a bare or member
 * require and the require a createRequire call returns count as imports (a literal specifier is walked, any other is an opaque
 * edge); every loader the walk cannot follow (a non-literal specifier, a createRequire result that is not called at once, a
 * loader read other than as a direct call - aliased, passed, destructured or keyed -, a process native binding or addon, a code
 * evaluator, the process object read other than through a named member or a literal key); its network calls (fetch, WebSocket,
 * EventSource; called or constructed); every other reference to a network name (aliased, passed, keyed or spelled as a string)
 * and every read of the global object other than through a named member or a literal key (a composed key, an alias, an
 * argument); and its launch calls (LAUNCH_NAMES, process.execve included). `exec` is left out of the launch names because
 * RegExp.prototype.exec shares it; a child_process exec still needs a child_process module, which a specifier or an opaque edge
 * carries.
 */
function moduleFacts(fileName: string, text: string): ModuleFacts {
  const source = parse(fileName, text);
  const specifiers: string[] = [];
  const networkCalls: string[] = [];
  const launchCalls: string[] = [];
  const opaqueImports: string[] = [];
  const networkRefs: string[] = [];
  const opaque = (node: ts.Node): void => {
    opaqueImports.push(`${fileName}: ${node.getText(source)}`);
  };
  const edge = (call: ts.CallExpression): void => {
    const first = stringLiteralOf(call.arguments[0]);
    if (first === undefined) opaque(call);
    else specifiers.push(first);
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      const spelled = memberName(node.expression);
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword || (spelled !== undefined && LOADER_NAMES.includes(spelled))) edge(node);
      else if (ts.isCallExpression(callee) && memberName(callee.expression) === "createRequire") edge(node);
      else if (spelled === "createRequire" && !isCallee(node)) opaque(node);
      else if (spelled !== undefined && spelled !== "execve" && PROCESS_EDGES.includes(spelled) && isProcessObject(receiverOf(node.expression))) opaque(node);
      else if (spelled !== undefined && CODE_EVALUATORS.includes(spelled)) opaque(node);
      const name = calleeName(node);
      if (name !== undefined && NETWORK_NAMES.includes(name)) networkCalls.push(`${fileName}: ${name}()`);
      if (name !== undefined && LAUNCH_NAMES.includes(name)) launchCalls.push(`${fileName}: ${name}()`);
    }
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && NETWORK_NAMES.includes(node.expression.text)) {
      networkCalls.push(`${fileName}: new ${node.expression.text}()`);
    }
    if (ts.isNewExpression(node) && CODE_EVALUATORS.includes(memberName(node.expression) ?? "")) opaque(node);
    if (ts.isIdentifier(node) && NETWORK_NAMES.includes(node.text) && !countedAsNetworkCall(node)) networkRefs.push(`${fileName}: ${node.parent.getText(source)}`);
    if (ts.isElementAccessExpression(node) && NETWORK_NAMES.includes(stringLiteralOf(node.argumentExpression) ?? "")) networkRefs.push(`${fileName}: ${node.getText(source)}`);
    if (ts.isStringLiteralLike(node) && NETWORK_NAMES.includes(node.text) && !(ts.isElementAccessExpression(node.parent) && node.parent.argumentExpression === node)) {
      networkRefs.push(`${fileName}: ${node.parent.getText(source)}`);
    }
    // A loader read other than as a direct call (aliased, passed, destructured off a member, keyed) is an edge the walk cannot follow.
    if (ts.isIdentifier(node) && [...LOADER_NAMES, "createRequire", ...CODE_EVALUATORS].includes(node.text) && isValueRead(node) && !isCallee(node)) opaque(node.parent);
    if ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) && !isCallee(node)) {
      const name = memberName(node);
      const loader = name !== undefined && [...LOADER_NAMES, "createRequire"].includes(name);
      if (loader || (name !== undefined && PROCESS_EDGES.includes(name) && isProcessObject(receiverOf(node)))) opaque(node);
    }
    // The global object and the process object are read only through a named member or a literal key. A local binding of either
    // name is read the same way (fail-closed: a shadowing binding can only over-report).
    if (ts.isIdentifier(node) && GLOBAL_OBJECTS.includes(node.text) && isValueRead(node) && !memberRead(node)) {
      networkRefs.push(`${fileName}: ${outermost(node).parent.getText(source)}`);
    }
    const processRoot = (ts.isIdentifier(node) && node.text === "process" && isValueRead(node)) || (ts.isPropertyAccessExpression(node) && isProcessObject(node));
    if (processRoot && !memberRead(node)) opaque(outermost(node).parent);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { specifiers, networkCalls, launchCalls, opaqueImports, networkRefs };
}
function resolveRelative(from: string, specifier: string): string {
  return join(dirname(from), specifier.replace(/\.js$/, ".ts"));
}
interface Closure {
  readonly modules: string[];
  readonly externals: string[];
  readonly facts: ReadonlyMap<string, ModuleFacts>;
}
/** The transitive src import closure of the entry modules: relative specifiers are followed, the rest are recorded as externals. */
function importClosure(entries: readonly string[]): Closure {
  const facts = new Map<string, ModuleFacts>();
  const externals = new Set<string>();
  const queue = [...entries];
  for (let file = queue.shift(); file !== undefined; file = queue.shift()) {
    if (facts.has(file)) continue;
    const fact = moduleFacts(repoPath(file), readFileSync(file, "utf8"));
    facts.set(file, fact);
    for (const specifier of fact.specifiers) {
      if (specifier.startsWith(".")) queue.push(resolveRelative(file, specifier));
      else externals.add(specifier);
    }
  }
  return { modules: [...facts.keys()].map(repoPath).sort(), externals: [...externals].sort(), facts };
}
/** The names one module imports from the module at `target` (resolved from its relative specifiers). */
function bindingsFrom(file: string, target: string): string[] {
  const names: string[] = [];
  for (const statement of parse(repoPath(file), readFileSync(file, "utf8")).statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const specifier = statement.moduleSpecifier.text;
    if (!specifier.startsWith(".") || resolveRelative(file, specifier) !== target) continue;
    const clause = statement.importClause;
    if (clause?.name !== undefined) names.push("default");
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push("*");
    if (bindings !== undefined && ts.isNamedImports(bindings)) names.push(...bindings.elements.map(element => (element.propertyName ?? element.name).text));
  }
  return names.sort();
}
/** The exported `const NAME = "<string literal>"` declarations of one module. */
function exportedStringConstants(file: string): string[] {
  const names: string[] = [];
  for (const statement of parse(repoPath(file), readFileSync(file, "utf8")).statements) {
    if (!ts.isVariableStatement(statement) || !statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined && ts.isStringLiteralLike(declaration.initializer)) names.push(declaration.name.text);
    }
  }
  return names.sort();
}
/** The member names of the named interfaces in one module. */
function interfaceMembers(fileName: string, text: string, names: readonly string[]): Record<string, string[]> {
  const members: Record<string, string[]> = {};
  for (const statement of parse(fileName, text).statements) {
    if (!ts.isInterfaceDeclaration(statement) || !names.includes(statement.name.text)) continue;
    members[statement.name.text] = statement.members.flatMap(member => (member.name !== undefined && ts.isIdentifier(member.name) ? [member.name.text] : []));
  }
  return members;
}
/** CapabilityDescriptor or InvocationContext, the two surfaces whose member sets row B4 pins. */
const PINNED_SURFACE = /\b(?:CapabilityDescriptor|InvocationContext)\b/;
/**
 * One module's declarations built on a pinned surface, each with the members it declares: an interface or class whose heritage
 * names one (extends or implements), an interface of either name other than its one declaration in capability-registry.ts (a
 * merge or a module augmentation), and an intersection type that includes one.
 */
function builtOnSurfaces(fileName: string, text: string): string[] {
  const source = parse(fileName, text);
  const registryFile = repoPath(REGISTRY_SOURCE);
  const canonical = new Set<string>();
  const found: string[] = [];
  const membersOf = (members: readonly (ts.TypeElement | ts.ClassElement)[]): string =>
    members.flatMap(member => (member.name === undefined ? [] : [member.name.getText(source)])).sort().join(",");
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      const name = node.name?.text ?? "<anonymous>";
      const heritage = (node.heritageClauses ?? []).map(clause => clause.getText(source)).join(" ");
      if (PINNED_SURFACE.test(heritage)) found.push(`${fileName}:${name} ${heritage}: ${membersOf(node.members)}`);
      if (ts.isInterfaceDeclaration(node) && PINNED_SURFACE.test(name)) {
        if (fileName === registryFile && !canonical.has(name)) canonical.add(name);
        else found.push(`${fileName}:${name} declared again: ${membersOf(node.members)}`);
      }
    }
    if (ts.isIntersectionTypeNode(node) && node.types.some(type => PINNED_SURFACE.test(type.getText(source)))) found.push(`${fileName}: ${node.getText(source)}`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
}
/** The effect classes CapabilityDescriptor declares: the string literals of its effectClass union in capability-registry.ts. */
function declaredEffectClasses(): string[] {
  for (const statement of parse("capability-registry.ts", readFileSync(REGISTRY_SOURCE, "utf8")).statements) {
    if (!ts.isInterfaceDeclaration(statement) || statement.name.text !== "CapabilityDescriptor") continue;
    for (const member of statement.members) {
      if (!ts.isPropertySignature(member) || !ts.isIdentifier(member.name) || member.name.text !== "effectClass" || member.type === undefined) continue;
      return ts.isUnionTypeNode(member.type) ? member.type.types.flatMap(type => (ts.isLiteralTypeNode(type) && ts.isStringLiteral(type.literal) ? [type.literal.text] : [])) : [];
    }
  }
  return [];
}
/** A declared class this census can stand in for; a class the source adds later maps to undefined and reds B5 and D5 by name. */
function effectClassOf(name: string): CapabilityDescriptor["effectClass"] | undefined {
  return name === "read" || name === "write" || name === "external" || name === "unknown" ? name : undefined;
}
/** The declared non-read classes, each checked against the stand-in's own classes. */
function nonReadClasses(): { names: string[]; classes: CapabilityDescriptor["effectClass"][] } {
  const names = declaredEffectClasses().filter(name => name !== "read");
  const classes = names.flatMap(name => {
    const effectClass = effectClassOf(name);
    return effectClass === undefined ? [] : [effectClass];
  });
  expect(classes, `declared non-read classes the census stands in for: ${names.join(", ")}`).toHaveLength(names.length);
  return { names, classes };
}

interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** M1-M8 must hit; Q1 is R-INTERRUPTED, Q2 R-HOMOGLYPH, Q3 R-COMPOSED (the source text of a composition), Q4 R-UNNAMED. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: "federation", hit: true },
  { pin: "M2", text: "Federation", hit: true },
  { pin: "M3", text: "FEDERATED", hit: true },
  { pin: "M4", text: "federated-workspaces-2026-10-18", hit: true },
  { pin: "M5", text: "reactive-fiber.federation-link/v1", hit: true },
  { pin: "M6", text: "crossFederationEffect", hit: true },
  { pin: "M7", text: "nonfederated", hit: true },
  { pin: "M8", text: "Federate", hit: true },
  { pin: "Q1", text: `fede${String.fromCodePoint(0x200b)}ration`, hit: false },
  { pin: "Q2", text: `f${String.fromCodePoint(0x0435)}deration`, hit: false },
  { pin: "Q3", text: '["feder", "ation"].join("")', hit: false },
  { pin: "Q4", text: "peer.workspace.call", hit: false },
];

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<Json>>> = {
  A1: async () => {
    const { registry, calls } = federationRegistry([EFFECT_PERMISSION]);
    const refused = await refusalFrom(registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf(READ_ADMISSION)));
    const refusedCalls = calls.effect;
    const admitted = await registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf([...READ_ADMISSION, EFFECT_PERMISSION]));
    expect(refused.category).toBe("authorization");
    expect(refusedCalls).toBe(0);
    expect(calls.effect).toBe(1);
    return { refused, refusedCalls, admitted: { calls: calls.effect, output: admitted } };
  },
  A2: async () => {
    const { registry, calls } = federationRegistry([]);
    const refused = await refusalFrom(registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf(READ_ADMISSION)));
    const refusedCalls = calls.effect;
    await registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf([...READ_ADMISSION, `invoke:${EFFECT_ID}`]));
    expect(refused.category).toBe("authorization");
    expect(refusedCalls).toBe(0);
    expect(calls.effect).toBe(1);
    return { refused, refusedCalls, admittedCalls: calls.effect };
  },
  A3: async () => {
    const refusals = READ_GRANT_PREFIXES.map(prefix => {
      const registry = new CapabilityRegistry();
      let caught: unknown;
      try {
        registry.register(effectProvider({ permissions: [`${prefix}:${EFFECT_ID}`], calls: { read: 0, effect: 0 } }));
      } catch (error) {
        caught = error;
      }
      return { prefix, ...refusalOf(caught), registered: registry.catalogSnapshot().length };
    });
    expect(refusals.map(refusal => refusal.category)).toEqual(READ_GRANT_PREFIXES.map(() => "validation"));
    expect(refusals.map(refusal => refusal.registered)).toEqual(READ_GRANT_PREFIXES.map(() => 0));
    return { refusals };
  },
  A4: async () => {
    const probe = federationRegistry([EFFECT_PERMISSION]);
    const reading = JSON.stringify(await probe.registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, contextOf(READ_ADMISSION)));
    const readingCarriesGrants = GRANT_SHAPED.every(grant => reading.includes(grant));
    expect(readingCarriesGrants).toBe(true);
    const { registry, calls } = federationRegistry([EFFECT_PERMISSION]);
    const result = await runWorkflow({ script: READ_THEN_EFFECT, host: claudeHost(registry, READ_ADMISSION) });
    expect(result.status).toBe("failed");
    expect(result.capabilityError?.category).toBe("authorization");
    expect(calls).toStrictEqual({ read: 1, effect: 0 });
    const diagnostic = result.capabilityError;
    return {
      readingCarriesGrants, status: result.status,
      capabilityError: diagnostic === undefined ? null : { name: diagnostic.name, category: diagnostic.category, message: diagnostic.message },
      calls: { ...calls },
    };
  },
  A5: async () => {
    const probe = federationRegistry([]);
    const reading = JSON.stringify(await probe.registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, contextOf(READ_ADMISSION)));
    const readingCarriesInvokeGrant = reading.includes(`invoke:${EFFECT_ID}`);
    expect(readingCarriesInvokeGrant).toBe(true);
    const refusedRun = federationRegistry([]);
    const refused = await runWorkflow({ script: READ_THEN_EFFECT, host: claudeHost(refusedRun.registry, READ_ADMISSION) });
    expect(refused.status).toBe("failed");
    expect(refused.capabilityError?.category).toBe("authorization");
    expect(refusedRun.calls).toStrictEqual({ read: 1, effect: 0 });
    const admittedRun = federationRegistry([]);
    const admitted = await runWorkflow({ script: READ_THEN_EFFECT, host: claudeHost(admittedRun.registry, [...READ_ADMISSION, `invoke:${EFFECT_ID}`]) });
    expect(admitted.status).toBe("completed");
    expect(admittedRun.calls).toStrictEqual({ read: 1, effect: 1 });
    const diagnostic = refused.capabilityError;
    return {
      readingCarriesInvokeGrant, status: refused.status,
      capabilityError: diagnostic === undefined ? null : { name: diagnostic.name, category: diagnostic.category, message: diagnostic.message },
      calls: { ...refusedRun.calls },
      admitted: { status: admitted.status, calls: { ...admittedRun.calls } },
    };
  },
  B1: async () => {
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const family = [...native, ...injected].filter(isFederationEffect).map(descriptor => descriptor.id);
    expect(native.length, `native descriptors: ${idsOf(native).join(", ")}`).toBeGreaterThanOrEqual(4);
    expect(injected.length, `injected descriptors: ${idsOf(injected).join(", ")}`).toBeGreaterThanOrEqual(4);
    expect(family).toEqual([]);
    return { native: idsOf(native), injected: idsOf(injected), family };
  },
  B2: async () => {
    const receipts = filesBelow(join(REPO, "docs", "workbench", "receipts")).filter(file => file.endsWith(".md")).map(textOf);
    expect(receipts.length).toBeGreaterThanOrEqual(1);
    const real = admissionViolations([...(await nativeDescriptors()), ...injectedDescriptors()], receipts);
    expect(real).toEqual([]);
    const preview = injectedDescriptors().find(descriptor => descriptor.id === PREVIEW_ID);
    expect(preview).toBeDefined();
    const base = effectProvider({ permissions: [EFFECT_PERMISSION], calls: { read: 0, effect: 0 } }).descriptor;
    const judge = (variant: Partial<CapabilityDescriptor>, receipt: string | undefined): string[] =>
      admissionViolations([...(preview === undefined ? [] : [preview]), { ...base, ...variant }], receipt === undefined ? [] : [receipt]);
    const artifacts = GATING_ARTIFACTS.join(" and ");
    const terms = "a stable idempotency key and the producer's effect receipt";
    const full = `# wb-x: registers ${EFFECT_ID} under ${artifacts}, with ${terms}`;
    const synthetic = {
      complete: judge({}, full),
      readClass: judge({ effectClass: "read" }, full),
      noPermission: judge({ permissions: [] }, full),
      sharedPermission: judge({ permissions: [PREVIEW_PERMISSION] }, full),
      noReceipt: judge({}, undefined),
      oneArtifact: judge({}, full.replace(` and ${GATING_ARTIFACTS[1]}`, "")),
      noTerms: judge({}, `# wb-x: registers ${EFFECT_ID} under ${artifacts}`),
      negated: judge({}, `# wb-x: ${EFFECT_ID} is not registered under ${artifacts}: it carries no idempotency key and no effect receipt`),
      neitherNor: judge({}, `# wb-x: neither registers ${EFFECT_ID} under ${artifacts} nor carries ${terms}`),
      splitSections: judge({}, `# wb-x: receipt\n\n## 2026-10-24 registration\n\nRegisters ${EFFECT_ID} under ${artifacts}.\n\n## 2026-10-24 terms\n\nCarries ${terms}.\n`),
      commented: judge({}, `# wb-x: registers ${EFFECT_ID} under ${artifacts} <!-- with ${terms} -->`),
    };
    expect(synthetic.complete).toEqual([]);
    expect(Object.entries(synthetic).filter(([name, found]) => name !== "complete" && found.length !== 1).map(([name]) => name)).toEqual([]);
    // R-UNNEGATED-ABSENCE, pinned quiet: an absence stated with no negation word still registers (co-mention reads as registration).
    const unnegatedAbsence = judge({}, `# wb-x: ${EFFECT_ID} stays unregistered while ${artifacts} are unshipped; ${terms} are owed`);
    expect(unnegatedAbsence).toEqual([]);
    return { receiptsRead: receipts.length >= 1, real, synthetic, unnegatedAbsence };
  },
  B3: async () => {
    const failure = "stand-in producer stream closed after dispatch";
    const fail = (): never => {
      throw new Error(failure);
    };
    const effect = federationRegistry([EFFECT_PERMISSION], fail);
    const effectRefusal = await refusalFrom(effect.registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf([EFFECT_PERMISSION])));
    const twinCalls: Calls = { read: 0, effect: 0 };
    const twin = new CapabilityRegistry();
    twin.register(effectProvider({ effectClass: "read", permissions: [EFFECT_PERMISSION], calls: twinCalls, answer: fail }));
    const readRefusal = await refusalFrom(twin.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf([EFFECT_PERMISSION])));
    expect(effectRefusal.category).toBe("uncertain-effect");
    expect(effectRefusal.message).toContain("Reconcile with the producer before retrying");
    expect(readRefusal.category).toBe("transport");
    expect([effect.calls.effect, twinCalls.effect]).toEqual([1, 1]);
    return { effect: { ...effectRefusal, calls: effect.calls.effect }, read: { ...readRefusal, calls: twinCalls.effect } };
  },
  B4: async () => {
    const files = filesBelow(SRC);
    const receiptHits = files.filter(file => EFFECT_RECEIPT.test(textOf(file))).map(repoPath);
    const keyHits = files.filter(file => IDEMPOTENCY_KEY.test(textOf(file))).map(repoPath);
    const members = interfaceMembers("capability-registry.ts", readFileSync(REGISTRY_SOURCE, "utf8"), ["CapabilityDescriptor", "InvocationContext"]);
    const descriptorMembers = [...(members.CapabilityDescriptor ?? [])].sort();
    const contextMembers = [...(members.InvocationContext ?? [])].sort();
    const membersRead = descriptorMembers.includes("effectClass") && descriptorMembers.includes("permissions") && contextMembers.includes("grants");
    const keyOrReceiptMembers = [...descriptorMembers, ...contextMembers].filter(name => /idempoten|receipt/i.test(name));
    const builtOn = srcModules().flatMap(file => builtOnSurfaces(repoPath(file), textOf(file)));
    expect(files.length, `src files walked: ${files.length}`).toBeGreaterThanOrEqual(SRC_FLOOR);
    expect(membersRead).toBe(true);
    expect({ receiptHits, keyHits, keyOrReceiptMembers, builtOn }).toStrictEqual({ receiptHits: [], keyHits: [], keyOrReceiptMembers: [], builtOn: [] });
    const control = (text: string): number => builtOnSurfaces("control.ts", text).length;
    const controls = {
      extendsDescriptor: control("export interface PeerEffectDescriptor extends CapabilityDescriptor { dedupeToken: string }"),
      extendsContext: control("interface ReplayContext extends InvocationContext { replayToken: string }"),
      intersection: control("type PeerDescriptor = CapabilityDescriptor & { dedupeToken: string };"),
      augmentation: control('declare module "../capability-registry.js" { interface CapabilityDescriptor { dedupeToken?: string } }'),
      classImplements: control('class PeerDescriptor implements CapabilityDescriptor { dedupeToken = ""; }'),
      unrelated: control("interface PeerRow { id: string; dedupeToken: string }"),
      mappedSurface: control('type PeerDescriptor = { [K in keyof CapabilityDescriptor | "dedupeToken"]: unknown };'),
    };
    expect(controls).toStrictEqual({ extendsDescriptor: 1, extendsContext: 1, intersection: 1, augmentation: 1, classImplements: 1, unrelated: 0, mappedSurface: 0 });
    // Both member sets are judged exactly against the roster, and no type is built on either: a key or receipt member under any other name reds this pin.
    return { srcFloorMet: files.length >= SRC_FLOOR, membersRead, receiptHits, keyHits, keyOrReceiptMembers, descriptorMembers, contextMembers, builtOn, controls };
  },
  B5: async () => {
    const declared = declaredEffectClasses();
    const { names, classes } = nonReadClasses();
    expect(declared).toContain("read");
    expect(names.length).toBeGreaterThanOrEqual(1);
    const failure = "stand-in producer stream closed after dispatch";
    const refusals: { effectClass: string; category: string; message: string; calls: number }[] = [];
    for (const effectClass of classes) {
      const { registry, calls } = classRegistry(effectClass, () => {
        throw new Error(failure);
      });
      const refusal = await refusalFrom(registry.invoke(EFFECT_ID, EFFECT_INPUT_VALUE, contextOf([EFFECT_PERMISSION])));
      refusals.push({ effectClass, ...refusal, calls: calls.effect });
    }
    expect(refusals.map(refusal => refusal.category)).toEqual(names.map(() => "uncertain-effect"));
    expect(refusals.filter(refusal => !refusal.message.includes("Reconcile with the producer before retrying")).map(refusal => refusal.effectClass)).toEqual([]);
    expect(refusals.map(refusal => refusal.calls)).toEqual(names.map(() => 1));
    return { declared, refusals };
  },
  C1: async () => {
    const files = filesBelow(SRC);
    const anchorFile = "workbench/capability-registry.ts";
    const anchorToken = "effectClassOf";
    const anchor = join(SRC, anchorFile);
    const floorMet = files.length >= SRC_FLOOR;
    const anchorRead = files.includes(anchor) && textOf(anchor).includes(anchorToken);
    const hits = files.filter(file => FEDERATION.test(textOf(file))).map(repoPath);
    const nonTsFiles = files.filter(file => !file.endsWith(".ts")).map(repoPath);
    const decodedHits = srcModules().flatMap(file => decodedStemHits(repoPath(file), textOf(file)));
    const escaped = 'export const PEER_KIND = "f\\u0065derated";';
    const decodedControl = { raw: FEDERATION.test(escaped), decoded: decodedStemHits("control.ts", escaped).length };
    expect(floorMet, `src: ${files.length} files walked, floor ${SRC_FLOOR}`).toBe(true);
    expect(anchorRead, `src: the anchor ${anchorFile} was not read with ${anchorToken}`).toBe(true);
    expect(hits, "src files spelling the federation stem").toEqual([]);
    expect(nonTsFiles, "src files the decoded reading cannot parse").toEqual([]);
    expect(decodedHits, "src string literals, template parts or identifiers spelling the stem decoded").toEqual([]);
    expect(decodedControl).toStrictEqual({ raw: false, decoded: 1 });
    return { root: "src", floor: SRC_FLOOR, anchorFile, anchorToken, floorMet, anchorRead, hits, nonTsFiles, decodedHits, decodedControl };
  },
  C2: async () => {
    const descriptors = [...(await nativeDescriptors()), ...injectedDescriptors()];
    const hits = descriptors.filter(descriptor => FEDERATION.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    expect(descriptors.length).toBeGreaterThanOrEqual(8);
    expect(hits).toEqual([]);
    return { descriptorsRead: descriptors.length, hits };
  },
  C3: async () => {
    const native = await nativeDescriptors();
    const injected = injectedDescriptors();
    const scans = srcModules().map(file => ({ file, ...registerSurface(repoPath(file), textOf(file)) }));
    const literals = scans.flatMap(scan => scan.literals).sort();
    const providerEffectClassProperties = scans
      .filter(scan => repoPath(scan.file).startsWith("src/workbench/providers/"))
      .reduce((sum, scan) => sum + scan.effectClassProperties, 0);
    const opaque = scans.flatMap(scan => scan.opaque).sort();
    const effectClassLiterals = scans.flatMap(scan => scan.effectClassLiterals).sort();
    const nonRead = [...native, ...injected].filter(descriptor => descriptor.effectClass !== "read").map(descriptor => descriptor.id);
    expect(nonRead, "registered descriptors whose effect class is not read").toEqual([]);
    expect(literals.length).toBeGreaterThanOrEqual(8);
    expect(literals.filter(literal => !literal.startsWith("src/workbench/providers/") || !literal.endsWith(":read"))).toEqual([]);
    // No effectClass property sits outside a register literal in providers/*.ts, so none can escape the literal scan.
    expect(providerEffectClassProperties).toBe(literals.length);
    // Every other src register surface is the operator-module bridge, outside the claim; a descriptor variable anywhere else reds here.
    expect(opaque.length).toBeGreaterThanOrEqual(1);
    expect(opaque.filter(site => !site.startsWith(OPERATOR_BRIDGE))).toEqual([]);
    // Outside the providers, src's effectClass string literals are read or the journal-compat field description.
    expect(effectClassLiterals.filter(literal => !literal.endsWith(":read"))).toEqual([FIELD_DESCRIPTION_LITERAL]);
    const control = (text: string): number => {
      const surface = registerSurface("control.ts", text);
      return surface.opaque.length + surface.effectClassLiterals.filter(literal => !literal.endsWith(":read")).length;
    };
    const controls = {
      variableDescriptor: control('const d = { id: "peer.workspace.call", effectClass: "external" as const }; registry.register({ descriptor: d, async invoke() { return null; } });'),
      boundRegister: control("const add = registry.register.bind(registry); add(provider);"),
      destructured: control("const { register: add } = registry; add(provider);"),
      elementAccess: control('registry["register"](provider);'),
      computedRegister: control('const key = ["regi", "ster"].join(""); registry[key](provider);'),
      inlineRead: control('registry.register({ descriptor: { id: "peer.workspace.read", effectClass: "read" }, async invoke() { return null; } });'),
      reflectGet: control('(Reflect.get(registry, "register") as (p: unknown) => void).call(registry, provider);'),
      ownDescriptor: control('Object.getOwnPropertyDescriptor(Object.getPrototypeOf(registry), "register")?.value.call(registry, provider);'),
      constKey: control('const key = "register"; registry[key](provider);'),
      reflectComputed: control('Reflect.get(registry, ["regi", "ster"].join("")).call(registry, provider);'),
    };
    expect(controls).toStrictEqual({
      variableDescriptor: 2, boundRegister: 1, destructured: 1, elementAccess: 1, computedRegister: 0, inlineRead: 0, reflectGet: 1, ownDescriptor: 1, constKey: 1, reflectComputed: 0,
    });
    return { native: classesOf(native), injected: classesOf(injected), literals, providerEffectClassProperties, opaque, effectClassLiterals, controls };
  },
  D1: async () => {
    const files = srcModules();
    const found = files.map(file => scanVerbs(repoPath(file), textOf(file)));
    const verbArgv = found.flatMap(result => result.verbArgv);
    const verbLiterals = found.flatMap(result => result.verbLiterals);
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const descriptors = [...(await nativeDescriptors()), ...injectedDescriptors()];
    const descriptorVerbs = descriptors.filter(descriptor => INVOKE_VERB.test(JSON.stringify(descriptor))).map(descriptor => descriptor.id);
    const srcFloorMet = files.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ verbArgv, verbLiterals, descriptorVerbs }, "an rf workspace invoke/evaluate verb waits for FW-CFRR-08 and rfc-bak67.6").toStrictEqual({ verbArgv: [], verbLiterals: [], descriptorVerbs: [] });
    const control = (text: string): number => {
      const scan = scanVerbs("control.ts", text);
      return scan.verbArgv.length + scan.verbLiterals.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "workspace", "invoke", "knowledge:view:architecture", "--json"]);'),
      spaced: control('const cmd = "rf workspace invoke knowledge:view:architecture --json";'),
      dotted: control('const id = "workspace.evaluate";'),
      template: control(["const cmd = `rf workspace  invoke $", "{view}`;"].join("")),
      camel: control('const verb = "rf.workspaceInvoke";'),
      interleaved: control('spawn("rf", ["workspace", "--json", "invoke", "knowledge:view:architecture"]);'),
      pastTense: control('const note = "the workspace invoked nothing";'),
      composedArgv: control('const verb = "invoke"; spawn("rf", ["workspace", verb]);'),
    };
    expect(controls).toStrictEqual({ argv: 1, spaced: 1, dotted: 1, template: 1, camel: 1, interleaved: 1, pastTense: 0, composedArgv: 0 });
    return { srcFloorMet, renderArgvSeen, verbArgv, verbLiterals, descriptorVerbs, controls };
  },
  D2: async () => {
    const sites = srcModules().flatMap(file => rfLaunchSites(repoPath(file), textOf(file)));
    const native = await nativeDescriptors();
    const preview = native.find(descriptor => descriptor.id === PREVIEW_ID);
    expect(sites).toEqual(["src/workbench/providers/reactivefiber.ts:nativeReactiveFiberRender:spawn"]);
    expect(preview?.effectClass).toBe("read");
    const control = (text: string): number => rfLaunchSites("control.ts", text).length;
    const controls = {
      literal: control('spawn("rf", ["context", "render"]);'),
      constBound: control('const RF_BIN = "rf"; execFileSync(RF_BIN, ["--json"]);'),
      opaque: control('spawn(process.env.RF_BIN ?? "rf", []);'),
      shellString: control('execSync("rf --version", { encoding: "utf8" });'),
      callbackExec: control('exec("rf --version", () => {});'),
      templateCommand: control(["execSync(`rf $", "{flags}`);"].join("")),
      constCommand: control('const RF_VERSION = "rf --version"; execSync(RF_VERSION);'),
      chainedCommand: control('exec("cd /tmp && rf --version");'),
      pathQualified: control('spawn("/usr/local/bin/rf", ["--version"]);'),
      shellArgv: control('spawn("sh", ["-c", "rf --version"]);'),
      importAlias: control('import { execSync as sh } from "node:child_process"; sh("rf --version");'),
      keyedLauncher: control('cp["execFileSync"]("rf", ["--version"]);'),
      inPlaceExec: control('process.execve("/usr/bin/rf", ["rf", "--version"]);'),
      otherProgram: control('execSync("forge run lint --json");'),
      opaqueLauncher: control('const launch = (run: (command: string) => void): void => run("rf --version");'),
    };
    expect(controls).toStrictEqual({
      literal: 1, constBound: 1, opaque: 0, shellString: 1, callbackExec: 1, templateCommand: 1, constCommand: 1, chainedCommand: 1, pathQualified: 1, shellArgv: 1, importAlias: 1,
      keyedLauncher: 1, inPlaceExec: 1, otherProgram: 0, opaqueLauncher: 0,
    });
    const loaded = await loadWorkbenchNative();
    const arms: string[][] = [];
    for (const input of [{ model: "m", task: "t" }, { view: "v", taskId: "t", model: "m" }]) {
      const registry = new CapabilityRegistry();
      loaded.registerNativeProviders(registry, ROOT);
      const log = standInRf(fullShapeRf(ROOT));
      await registry.invoke(PREVIEW_ID, input, contextOf([PREVIEW_PERMISSION]));
      const spawns = spawnsOf(log);
      expect(spawns).toHaveLength(1);
      arms.push((spawns[0] ?? []).map(item => (item === ROOT ? "<root>" : item)));
    }
    for (const argv of arms) {
      expect(argv.slice(2, 4)).toEqual(["context", "render"]);
      expect(argv).toContain("--no-commit");
      expect(argv.filter(item => item === "workspace" || VERB_WORDS.includes(item))).toEqual([]);
    }
    return { sites, preview: { effectClass: preview?.effectClass ?? null, permissions: [...(preview?.permissions ?? [])] }, argv: arms, controls };
  },
  D3: async () => {
    const invalidation = importClosure([join(SRC, "workbench", "observation.ts"), join(SRC, "workbench", "graph-view.ts")]);
    const facts = [...invalidation.facts.values()];
    const launchImports = facts.flatMap(fact => fact.specifiers.filter(specifier => LAUNCH_MODULE.test(specifier)));
    const networkCalls = facts.flatMap(fact => fact.networkCalls);
    const launchCalls = facts.flatMap(fact => fact.launchCalls);
    const opaqueImports = facts.flatMap(fact => fact.opaqueImports);
    const networkRefs = facts.flatMap(fact => fact.networkRefs);
    expect(invalidation.modules).toContain("src/workbench/capability-registry.ts");
    expect({ launchImports, networkCalls, launchCalls, opaqueImports, networkRefs }).toStrictEqual({ launchImports: [], networkCalls: [], launchCalls: [], opaqueImports: [], networkRefs: [] });
    // The rf reading observer reaches the provider module, whose render spawns rf, only through string constants.
    const observerClosure = importClosure([join(SRC, "workbench", "reactivefiber-observer.ts")]);
    const outsideProvider = [...observerClosure.facts.entries()].filter(([file]) => file !== PROVIDER_SOURCE).map(([, fact]) => fact);
    const viaProvider = [...observerClosure.facts.keys()]
      .filter(file => file !== PROVIDER_SOURCE)
      .map(file => ({ module: repoPath(file), bindings: bindingsFrom(file, PROVIDER_SOURCE) }))
      .filter(entry => entry.bindings.length > 0);
    const constants = exportedStringConstants(PROVIDER_SOURCE);
    const constantsOnly = viaProvider.length > 0 && viaProvider.every(entry => entry.bindings.every(name => constants.includes(name)));
    const observerLaunch = {
      launchImports: outsideProvider.flatMap(fact => fact.specifiers.filter(specifier => LAUNCH_MODULE.test(specifier))),
      networkCalls: outsideProvider.flatMap(fact => fact.networkCalls),
      launchCalls: outsideProvider.flatMap(fact => fact.launchCalls),
      opaqueImports: outsideProvider.flatMap(fact => fact.opaqueImports),
      networkRefs: outsideProvider.flatMap(fact => fact.networkRefs),
    };
    expect(observerClosure.modules).toContain(repoPath(PROVIDER_SOURCE));
    expect(constantsOnly).toBe(true);
    expect(observerLaunch).toStrictEqual({ launchImports: [], networkCalls: [], launchCalls: [], opaqueImports: [], networkRefs: [] });
    const control = (text: string): number => {
      const fact = moduleFacts("control.ts", text);
      return fact.specifiers.filter(specifier => LAUNCH_MODULE.test(specifier)).length + fact.networkCalls.length + fact.launchCalls.length + fact.opaqueImports.length + fact.networkRefs.length;
    };
    const controls = {
      childProcess: control('import { spawn } from "node:child_process";'),
      dynamicImport: control('const cp = await import("child_process");'),
      fetchCall: control('await globalThis.fetch("https://peer.invalid/effects");'),
      socket: control('const socket = new WebSocket("wss://peer.invalid");'),
      regexpExec: control("const match = /x/.exec(text);"),
      nonLiteralImport: control('const LAUNCHER = "node:child_process"; const cp = await import(LAUNCHER);'),
      nonLiteralRequire: control("const cp = require(LAUNCHER_NAME);"),
      aliasedFetch: control('const peerFetch = globalThis.fetch; await peerFetch("https://peer.invalid/effects");'),
      keyedFetch: control('await globalThis["fetch"]("https://peer.invalid/effects");'),
      builtinModule: control('export const peerLauncher = (): unknown => process.getBuiltinModule("node:child_process");'),
      builtinModuleExec: control('export const peerRender = (): unknown => process.getBuiltinModule("node:child_process").exec("rf --version");'),
      keyedBuiltinModule: control('process["getBuiltinModule"]("node:child_process");'),
      aliasedLoader: control('const load = process.getBuiltinModule; load("node:child_process");'),
      destructuredProcess: control('const { getBuiltinModule: load } = process; load("node:child_process");'),
      createRequireCall: control('createRequire(import.meta.url)("node:child_process");'),
      boundCreateRequire: control('const load = createRequire(import.meta.url); load("child_process");'),
      memberRequire: control('module.require("node:child_process");'),
      loaderModule: control('import { createRequire } from "node:module";'),
      nativeBinding: control('process.binding("spawn_sync");'),
      inPlaceExec: control('process.execve("/usr/bin/rf", ["rf", "--version"]);'),
      codeEval: control("eval(\"process.getBuiltinModule('node:child_process')\");"),
      functionConstructor: control('new Function("return process")();'),
      codeModule: control('import { runInThisContext } from "node:vm";'),
      composedGlobalKey: control('export const peerGlobal = (): unknown => (globalThis as Record<string, unknown>)["fe" + "tch"];'),
      reflectGlobal: control("Reflect.get(globalThis, peerKey);"),
      networkNameLiteral: control('const key = "fetch"; await peer[key]("https://peer.invalid/effects");'),
      composedGlobal: control('const peer = (g: Record<string, unknown>): unknown => g["fe" + "tch"];'),
    };
    expect(controls).toStrictEqual({
      childProcess: 1, dynamicImport: 1, fetchCall: 1, socket: 1, regexpExec: 0, nonLiteralImport: 1, nonLiteralRequire: 1, aliasedFetch: 1, keyedFetch: 1, builtinModule: 1,
      builtinModuleExec: 1, keyedBuiltinModule: 1, aliasedLoader: 1, destructuredProcess: 1, createRequireCall: 1, boundCreateRequire: 1, memberRequire: 1, loaderModule: 1,
      nativeBinding: 1, inPlaceExec: 1, codeEval: 1, functionConstructor: 1, codeModule: 1, composedGlobalKey: 1, reflectGlobal: 1, networkNameLiteral: 1, composedGlobal: 0,
    });
    return {
      invalidation: { modules: invalidation.modules, externals: invalidation.externals, launchImports, networkCalls, launchCalls, opaqueImports, networkRefs },
      observer: { modules: observerClosure.modules, viaProvider, constantsOnly, ...observerLaunch },
      controls,
    };
  },
  D4: async () => {
    const first = federationRegistry([EFFECT_PERMISSION]);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({ script: EFFECT_ONLY, host: claudeHost(first.registry, [EFFECT_PERMISSION]), journal: { append: entry => {
      entries.push(entry);
    } } });
    expect(recorded.status).toBe("completed");
    expect(first.calls.effect).toBe(1);
    const second = federationRegistry([EFFECT_PERMISSION]);
    const resumed = await runWorkflow({ script: EFFECT_ONLY, host: claudeHost(second.registry, [EFFECT_PERMISSION]), journal: { entries } });
    const error = resumed.error ?? "";
    expect(resumed.status).toBe("failed");
    expect(resumed.capabilityError?.category).toBe("uncertain-effect");
    expect(second.calls.effect).toBe(0);
    return {
      recorded: { status: recorded.status, effectCalls: first.calls.effect, nodeRows: entries.filter(entry => entry.kind === "node").map(entry => ({ effectClass: entry.effectClass ?? null, dispatched: entry.dispatched === true })) },
      resumed: { status: resumed.status, category: resumed.capabilityError?.category ?? null, namesProducer: error.includes('producer "reactivefiber"'), namesWayOut: error.includes("resumeFromRunId"), effectCalls: second.calls.effect },
    };
  },
  D5: async () => {
    const { names, classes } = nonReadClasses();
    expect(names.length).toBeGreaterThanOrEqual(1);
    const runs: Json[] = [];
    const outcomes: { category: string | null; recordedCalls: number; resumedCalls: number }[] = [];
    for (const effectClass of classes) {
      const first = classRegistry(effectClass);
      const entries: WorkflowJournalEntry[] = [];
      const recorded = await runWorkflow({ script: EFFECT_ONLY, host: claudeHost(first.registry, [EFFECT_PERMISSION]), journal: { append: entry => {
        entries.push(entry);
      } } });
      const second = classRegistry(effectClass);
      const resumed = await runWorkflow({ script: EFFECT_ONLY, host: claudeHost(second.registry, [EFFECT_PERMISSION]), journal: { entries } });
      const error = resumed.error ?? "";
      const category = resumed.capabilityError?.category ?? null;
      outcomes.push({ category, recordedCalls: first.calls.effect, resumedCalls: second.calls.effect });
      runs.push({
        effectClass,
        recorded: { status: recorded.status, effectCalls: first.calls.effect, nodeRows: entries.filter(entry => entry.kind === "node").map(entry => ({ effectClass: entry.effectClass ?? null, dispatched: entry.dispatched === true })) },
        resumed: { status: resumed.status, category, namesProducer: error.includes('producer "reactivefiber"'), namesWayOut: error.includes("resumeFromRunId"), effectCalls: second.calls.effect },
      });
    }
    expect(outcomes.map(outcome => outcome.category)).toEqual(names.map(() => "uncertain-effect"));
    expect(outcomes.map(outcome => [outcome.recordedCalls, outcome.resumedCalls])).toEqual(names.map(() => [1, 0]));
    return { classes: names, runs };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async () => {
        const hit = FEDERATION.test(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { digest: createHash("sha256").update(spelling.text).digest("hex").slice(0, 16), hit };
      },
    ]),
  ),
};

describe("wb-tnz5.1 federation effect authority census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R1, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:5", "C:3", "D:5", "M:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ readAdmission: [...READ_ADMISSION], readGrantPrefixes: READ_GRANT_PREFIXES, gatingArtifacts: GATING_ARTIFACTS, admissionTerms: ADMISSION_TERMS }).toStrictEqual({
      readAdmission: [...ROSTER.readAdmission], readGrantPrefixes: [...ROSTER.readGrantPrefixes], gatingArtifacts: [...ROSTER.gatingArtifacts], admissionTerms: [...ROSTER.admissionTerms],
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
