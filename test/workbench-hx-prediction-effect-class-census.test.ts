/**
 * wb-gwr.1 (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R1, program-triage-2026-10-18), the standing leg: the HX prediction
 * effect-class census.
 * Statement (bead title): "When a released @hyperunix/sdk ships CPHS prediction records (PredictiveHypothesis/ProposedDelta/
 * AdoptionVerdict, 02-adapter-architecture.md:7-8@694570cd00c2), any Pi reader shall project them only as coverage-'unknown',
 * never-'success' snapshots and 'hypothesis' relations, never refreshing an observed HX query node nor minting absence,
 * evidence, a reconcile receipt or a control decision."
 * Acceptance (owner filing, verbatim; rows A and B each quote one of its two standing clauses, held to the bead's own notes in
 * the tracker export): "Acceptance, standing (default gate): a census asserts no registered capability descriptor whose id or
 * description names predict/CPHS/hypothesis carries a non-read effectClass, and RECONCILE_EVIDENCE_READS
 * (src/workflow/reconcile.ts) stays exactly the four producer reads."
 * NOT DELIVERED HERE: the filing's "Acceptance, on landing" (a pure reader-adapter test over PredictiveHypothesis/ProposedDelta
 * fixtures, the AdoptionVerdict decideControl check, the fixture-without-fields toStrictEqual). It waits for the H2
 * prediction-record contract in a released @hyperunix/sdk, which does not exist; until then Pi consumes no prediction.
 *
 * MEASURED (read-only, by the cutting seat ws-04, run g10-work-s109, 2026-10-26, on trunk f381c52): every capability
 * descriptor Pi registers comes from the four provider modules (src/workbench/providers/{forge,hyperunix,furnace,reactivefiber}.ts),
 * each with one native and one injected-client registration, eight descriptor literals in all, every one effectClass "read",
 * and none names a stem in its id or description. RECONCILE_EVIDENCE_READS is one frozen literal of four producers, one read
 * each, every read a registered read capability of its own producer. Elsewhere src spells the stems only outside descriptors
 * (comments, prompt text in src/index.ts, the hypothesis relation kind with its labels and attention reasons, its topology
 * trace reason and src/workbench/patch-proposal.ts's PatchProposalHypothesisInput and PatchProposalHypothesis interfaces and
 * the proposal's hypothesis field - the last two omitted at the cut, inserted by wb-ypjn F4 after a re-measure on trunk e8e13f8:
 * 51 lines in 15 of 117 src modules spell a stem, each in these classes), never in a descriptor's id or description.
 *
 * THE VOCABULARY: a judged field (a descriptor's id, its description) names a stem when its NFKC fold, lower-cased with every
 * character outside a-z and 0-9 removed, contains the stem. The stems are the clause's three words (predict, CPHS, hypothesis,
 * read as the stems predict, cphs and hypothe) plus the title's two record names the first stem does not already cover
 * (ProposedDelta, AdoptionVerdict); PredictiveHypothesis is covered by predict and hypothe. So camel, snake, kebab, dotted,
 * spaced, upper-case and plural spellings match, and so does a stem split by a character the fold removes (a zero-width
 * space) or written in compatibility forms NFKC folds (full-width letters). OVER-READ (disclosed, the strict direction): the
 * fold can join a stem across two words, "hypothe" also matches hypothetical, and "predict" matches unpredictable.
 *
 * THE JUDGE: a descriptor VIOLATES the clause when it names a stem and its effectClass is anything but "read" (an unreadable
 * effectClass included). A matching READ descriptor satisfies the clause; it is still pinned (see A), because a Pi descriptor
 * that names a prediction is the gating artifact arriving: re-measure, and the on-landing acceptance applies.
 *
 * The census pins two rows and the residuals' quiet rows:
 *  A, the descriptor clause, read three independent ways plus the readers' own controls. A1 every descriptor the native
 *    registration registers (loadWorkbenchNative().registerNativeProviders), A2 every descriptor the four injected-client
 *    registrations register (never-invoked clients), each as id|effectClass|stems, exactly, with no violation. A3 a source scan of
 *    every src/**\/*.ts module (TypeScript AST): every PROVIDER LITERAL (an object literal carrying both a descriptor and an invoke
 *    member, wherever it stands) has its descriptor literal's id, description and effectClass read (a string literal or a
 *    template without substitutions; anything else, an absent field or a spread is an OPAQUE FIELD); a provider literal whose
 *    descriptor is not an object literal is an OPAQUE PROVIDER; a call of a member named register (x.register(...) or
 *    x["register"](...)) whose first argument is not a provider literal is an OPAQUE REGISTER CALL. The literal readings (module|
 *    id|effectClass|stems), the opaque fields, the opaque providers and the opaque register calls are pinned exactly (an opaque
 *    site is FAIL-CLOSED: a new one reds A3 for re-measure), every runtime reading of A1 and A2 is among the literal readings,
 *    and no literal violates. A4 the judge's flagged and passing controls, the scanner's controls and the runtime reader's own
 *    control (a registry holding one registered matching write descriptor reads as one violation) read exactly as pinned.
 *  B, the evidence-read clause. B1 the exported table's entries, in declaration order, frozen at both levels (the frozen check
 *    reads its controls: a frozen table, an unfrozen table, an unfrozen list), as many as the clause's number word says. B2 each
 *    read is registered by the native registration with effectClass "read" and names its own producer as its first id segment
 *    (the reading's controls: another producer's read, an unregistered read). B3 the source declares the table once, in the
 *    module the clause names, exported, as Object.freeze of an object literal whose every entry is Object.freeze of string
 *    literals, and those entries equal B1's; the source reader reads its controls (a frozen table, an unfrozen table, an
 *    unfrozen list, a composed read, a spread, a local declaration) exactly as pinned.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's witness, the constants, the controls, the residual families and every registered test title - is held to
 * the out-of-file roster (test/fixtures/hx-prediction-effect-class-roster.json); the labels of rows A and B are held both ways
 * to the standing clauses of the bead's own notes in the tracker export (.beads/issues.jsonl), the stems to the clause's word
 * list and the title's record names (both ways), the table size to the clause's number word and B3's module to the module the
 * clause names. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran before it)
 * and the pins that reached their witness.
 * NOT CLAIMED (edits of this file and the roster together below row level): a pin removed from ROWS, the literal, IMPL and the
 * roster (the bead text anchors rows, not pins); a control removed from its list and the roster; a pin's case replaced by one
 * that echoes its roster witness.
 * RESIDUALS (named, each with its pinned quiet row): R-VOCABULARY a prediction descriptor described in other words (forecast,
 * speculative, projected, estimated, what-if, simulated, world model, guess) names no stem and is not judged (Q1);
 * R-LOOKALIKE a stem written with a look-alike letter of another script (Cyrillic e, es, o) is not matched, the fold removes the
 * letter (Q2; each probe, repaired, names its stem); R-OTHER-FIELDS the judged fields are the id and the description only: a
 * stem in permissions, contractSource, version or inputSchema is not read (Q3); R-LOCAL-PROVIDER the detached host registers
 * whatever an operator's local provider module (DetachedLaunchRequest.localProvider, loaded at run time from a path outside src)
 * registers, and the census reads no module outside src (Q4; the scanner itself flags such a module's matching write
 * descriptor); R-INDIRECT a provider assembled without a provider literal (a class instance, a factory without one) and
 * registered through a callee that is not a member named register (a bound or destructured alias) leaves no provider literal
 * and no opaque register call (Q5; the same provider through x.register is an opaque register call).
 * SCOPE: the clause judges the DECLARED effectClass of registered descriptors, not what a provider does when invoked; the
 * vendored @hyperunix/sdk is not judged (its mutation protocol spells predictedDelta, a mutation-plan namesake, not a CPHS
 * record); nothing here re-reads the registry's discovery grants or the reconcile decision core, which own their own pins.
 *
 * Display paths added: none. Test-only: no scratch is allocated; src and .beads are only read.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { type ForgeReadClient, registerForgeGateStatus } from "../src/workbench/providers/forge.js";
import { type FurnaceReadClient, registerFurnaceRunInspect } from "../src/workbench/providers/furnace.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "hx-prediction-effect-class-roster.json");
const BEAD = "wb-gwr.1";
/** The stems: the clause's three words, then the title's record names the first stem does not cover. */
const STEMS = ["predict", "cphs", "hypothe", "proposeddelta", "adoptionverdict"] as const;
/** The judged descriptor fields (the clause's "id or description"). */
const JUDGED_FIELDS = ["id", "description"] as const;
/** The reading of an unreadable (opaque) source field. */
const OPAQUE = "<opaque>";
/** The src walk reaches at least this many modules (116 measured at the cut); a floor, not an exact set. */
const SRC_FLOOR = 100;
/** The clause's number words. */
const NUMBER_WORDS: Readonly<Record<string, number>> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
/** The standing acceptance's boundaries in the owner filing. */
const STANDING = "Acceptance, standing (default gate): ";
const ON_LANDING = " Acceptance, on landing:";

interface Judged {
  readonly id: string;
  readonly description: string;
  readonly effectClass: string;
}
interface NamedControl extends Judged {
  readonly name: string;
}
const ZWSP = String.fromCodePoint(0x200b);
const FULL_WIDTH_PREDICT = String.fromCodePoint(0xff50, 0xff52, 0xff45, 0xff44, 0xff49, 0xff43, 0xff54);
/** The judge must report each of these as a violation. */
const FLAGGED_CONTROLS: readonly NamedControl[] = [
  { name: "id-stem", id: "hyperunix.predict", description: "Read typed HX results", effectClass: "write" },
  { name: "acronym", id: "hyperunix.adopt", description: "Adopt one CPHS record", effectClass: "external" },
  { name: "record-name", id: "hyperunix.delta", description: "Apply a ProposedDelta", effectClass: "write" },
  { name: "snake-record", id: "hyperunix.verdict", description: "adoption_verdict apply", effectClass: "write" },
  { name: "spaced-record", id: "hyperunix.change", description: "Proposed Delta adoption", effectClass: "unknown" },
  { name: "upper-case", id: "hyperunix.slice", description: "PREDICTIVE HYPOTHESIS", effectClass: "write" },
  { name: "plural", id: "hyperunix.replay", description: "re-predicted hypotheses", effectClass: "external" },
  { name: "interrupted", id: "hyperunix.read", description: `pre${ZWSP}dict the next tree`, effectClass: "write" },
  { name: "full-width", id: "hyperunix.read", description: `${FULL_WIDTH_PREDICT} the next tree`, effectClass: "write" },
  { name: "opaque-effect", id: "hyperunix.predict", description: "", effectClass: OPAQUE },
  { name: "over-read", id: "forge.gate.run", description: "unpredictable timing", effectClass: "write" },
];
/** The judge must report none of these as a violation: a matching read, and a non-matching write. */
const PASSING_CONTROLS: readonly NamedControl[] = [
  { name: "read-matched", id: "hyperunix.predict", description: "Read CPHS predictions", effectClass: "read" },
  { name: "unmatched-write", id: "forge.gate.run", description: "Run the Forge gate", effectClass: "write" },
];
/** The descriptor the runtime reader's control registers: it names three stems and declares effectClass write. */
const PLANTED_DESCRIPTOR: CapabilityDescriptor = {
  id: "hyperunix.predict",
  version: "1.0.0",
  description: "Adopt a CPHS ProposedDelta",
  inputSchema: { type: "object", properties: {}, additionalProperties: false },
  effectClass: "write",
  permissions: ["hyperunix:write"],
  supportedModes: ["invoke"],
};
/** Synthetic source texts the scanner must read exactly as pinned (each a module body; none is compiled or run). */
const PROVIDER_BODY = "async invoke() { return null; }";
const SCANNER_CONTROLS: Readonly<Record<string, string>> = {
  literal: `registry.register({ descriptor: { id: "x.predict", description: "d", effectClass: "write" }, ${PROVIDER_BODY} });`,
  "quoted-keys": `registry.register({ "descriptor": { "id": "x.cphs", "description": "d", "effectClass": "external" }, "invoke": run });`,
  template: "registry.register({ descriptor: { id: `x.hypothesis`, description: `d`, effectClass: `write` }, invoke });",
  spread: `registry.register({ descriptor: { ...BASE, id: "x.predict" }, invoke });`,
  shorthand: `const effectClass = "write"; registry.register({ descriptor: { id: "x.predict", description: "d", effectClass }, invoke });`,
  composed: `registry.register({ descriptor: { id: "x.read", description: "pre" + "dict", effectClass: "write" }, invoke });`,
  "const-provider": `const P = { descriptor: { id: "x.predict", description: "d", effectClass: "write" }, invoke }; registry.register(P);`,
  "const-descriptor": "registry.register({ descriptor: D, invoke });",
  "element-access": `registry["register"]({ descriptor: { id: "x.predict", description: "d", effectClass: "write" }, invoke });`,
  "read-literal": `registry.register({ descriptor: { id: "x.read", description: "Read one record", effectClass: "read" }, invoke });`,
  "element-opaque": `registry["register"](P);`,
};
/** Synthetic declarations of the evidence-read table that B3's source reader must read exactly as pinned. */
const TABLE_CONTROLS: Readonly<Record<string, string>> = {
  frozen: `export const RECONCILE_EVIDENCE_READS = Object.freeze({ a: Object.freeze(["a.read"]), "b": Object.freeze(["b.read", "b.list"]) });`,
  unfrozen: `export const RECONCILE_EVIDENCE_READS = { a: Object.freeze(["a.read"]) };`,
  "unfrozen-list": `export const RECONCILE_EVIDENCE_READS = Object.freeze({ a: ["a.read"] });`,
  "composed-read": `export const RECONCILE_EVIDENCE_READS = Object.freeze({ a: Object.freeze([PREFIX + ".read"]) });`,
  spread: `export const RECONCILE_EVIDENCE_READS = Object.freeze({ ...BASE, a: Object.freeze(["a.read"]) });`,
  local: `const RECONCILE_EVIDENCE_READS = Object.freeze({ a: Object.freeze(["a.read"]) });`,
};
/** R-VOCABULARY's members: prediction words outside the stems. */
const VOCABULARY_CONTROLS: readonly string[] = [
  "Forecast the HX change",
  "speculative delta",
  "projected outcome",
  "estimated effect",
  "what-if scenario",
  "simulated adoption",
  "world model slice",
  "guess the next state",
];
/** R-LOOKALIKE's probes: one stem each, one letter replaced by its look-alike from another script, and the Latin letter. */
const LOOKALIKE_PROBES: readonly { readonly text: string; readonly lookalike: string; readonly latin: string }[] = [
  { text: `pr${String.fromCodePoint(0x0435)}dict`, lookalike: String.fromCodePoint(0x0435), latin: "e" },
  { text: `${String.fromCodePoint(0x0441)}phs`, lookalike: String.fromCodePoint(0x0441), latin: "c" },
  { text: `hyp${String.fromCodePoint(0x043e)}thesis`, lookalike: String.fromCodePoint(0x043e), latin: "o" },
];
/** R-OTHER-FIELDS's probes: each descriptor field outside the judged pair, carrying a stem. */
const OTHER_FIELD_PROBES: Readonly<Record<string, string>> = {
  permissions: "hyperunix:predict",
  contractSource: "@hyperunix/sdk@0.2.0:CPHS.adopt",
  version: "1.0.0-hypothesis",
  inputSchema: "proposedDelta",
};
/** R-LOCAL-PROVIDER's probe: an operator's local provider module (outside src) registering a matching write descriptor. */
const LOCAL_PROVIDER = `export function register(registry) {
  registry.register({ descriptor: { id: "local.predict", version: "1.0.0", description: "Adopt a CPHS ProposedDelta", inputSchema: {}, effectClass: "write", permissions: ["local:write"], supportedModes: ["invoke"] }, ${PROVIDER_BODY} });
}`;
/** R-INDIRECT's probes: a class-built provider registered through a bound alias, and the same provider through x.register. */
const INDIRECT_ALIASED = `class PredictProvider { descriptor = PREDICT_DESCRIPTOR; ${PROVIDER_BODY} }
const reg = registry.register.bind(registry);
reg(new PredictProvider());`;
const INDIRECT_DIRECT = `class PredictProvider { descriptor = PREDICT_DESCRIPTOR; ${PROVIDER_BODY} }
registry.register(new PredictProvider());`;
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-VOCABULARY": ["Q1"],
  "R-LOOKALIKE": ["Q2"],
  "R-OTHER-FIELDS": ["Q3"],
  "R-LOCAL-PROVIDER": ["Q4"],
  "R-INDIRECT": ["Q5"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for A and B, to the bead's standing clauses. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "a census asserts no registered capability descriptor whose id or description names predict/CPHS/hypothesis carries a non-read effectClass",
    pins: ["A1", "A2", "A3", "A4"],
  },
  { id: "B", label: "RECONCILE_EVIDENCE_READS (src/workflow/reconcile.ts) stays exactly the four producer reads", pins: ["B1", "B2", "B3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5"] },
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
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return [...value];
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || raw.bead !== BEAD || !isObject(raw.constants) || !Array.isArray(raw.rows)) {
    throw new Error(`roster must be an object for ${BEAD} with constants and rows`);
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      }
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { constants: json(raw.constants) as JsonObject, tests: strings(raw.tests, "roster tests"), rows };
}

const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

// ---- the judge ----

/** A judged field as the stems are read in it: NFKC-folded, lower-cased, every character outside a-z and 0-9 removed. */
function folded(text: string): string {
  return text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}
/** The stems a text names, in STEMS order. */
function stemsIn(text: string): string[] {
  const read = folded(text);
  return STEMS.filter(stem => read.includes(stem));
}
/** The stems a descriptor's judged fields name, each field read on its own, each stem once, in STEMS order. */
function stemsOf(descriptor: Judged): string[] {
  const named = new Set(JUDGED_FIELDS.flatMap(field => stemsIn(descriptor[field])));
  return STEMS.filter(stem => named.has(stem));
}
/** The clause's check: a descriptor naming a stem carries effectClass "read", or it violates. */
function violates(descriptor: Judged): boolean {
  return stemsOf(descriptor).length > 0 && descriptor.effectClass !== "read";
}
function readingOf(descriptor: Judged): string {
  return `${descriptor.id}|${descriptor.effectClass}|${stemsOf(descriptor).join("+")}`;
}
function controlReading(control: NamedControl): string {
  return `${control.name}|${stemsOf(control).join("+")}|${violates(control) ? "violates" : "passes"}`;
}

// ---- the runtime rosters ----

/** Clients and readers that are never invoked: registration only stores the descriptor. */
const NEVER = (): never => {
  throw new Error("census: a registered capability is never invoked");
};
const FORGE_CLIENT: ForgeReadClient = { gate: { status: async () => NEVER() } };
const FURNACE_CLIENT: FurnaceReadClient = { runs: { get: () => ({ inspect: async () => NEVER() }) } };
const HX_READER: HyperUnixReader = { find: async () => NEVER(), runtime: async () => NEVER(), async close() {} };
const RF_INVOKE: Parameters<typeof registerReactiveFiberRender>[1] = async () => NEVER();

function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
let native: Promise<CapabilityRegistry> | undefined;
/** The registry the native registration fills (loaded once per file). */
function nativeRegistry(): Promise<CapabilityRegistry> {
  native ??= loadWorkbenchNative().then(modules => {
    const registry = new CapabilityRegistry();
    modules.registerNativeProviders(registry, REPO);
    return registry;
  });
  return native;
}
/** The registry the four injected-client registrations fill. */
function injectedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerForgeGateStatus(registry, FORGE_CLIENT, "0.1.0");
  registerHyperUnixFind(registry, HX_READER, REPO);
  registerFurnaceRunInspect(registry, FURNACE_CLIENT, REPO);
  registerReactiveFiberRender(registry, RF_INVOKE, REPO);
  return registry;
}
/** A registry holding one registered matching write descriptor: the runtime reader's own positive control. */
function plantedRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({ descriptor: PLANTED_DESCRIPTOR, invoke: async () => NEVER() });
  return registry;
}
function rosterReading(descriptors: readonly CapabilityDescriptor[]): JsonValue {
  return json({ readings: descriptors.map(readingOf), violations: descriptors.filter(violates).map(descriptor => descriptor.id) });
}

// ---- the source scan ----

interface LiteralDescriptor {
  readonly module: string;
  readonly judged: Judged;
  readonly opaque: readonly string[];
}
interface Scan {
  readonly literals: readonly LiteralDescriptor[];
  readonly opaqueProviders: readonly string[];
  readonly opaqueRegisterCalls: readonly string[];
}

/** A member's static name (an identifier, a string or numeric literal, a literal computed key), or undefined. */
function memberName(member: ts.ObjectLiteralElementLike): string | undefined {
  if (ts.isSpreadAssignment(member)) return undefined;
  const name = member.name;
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name) && ts.isStringLiteralLike(name.expression)) return name.expression.text;
  return undefined;
}
function membersNamed(literal: ts.ObjectLiteralExpression, name: string): ts.ObjectLiteralElementLike[] {
  return literal.properties.filter(member => memberName(member) === name);
}
/** An object literal carrying both a descriptor and an invoke member: the CapabilityProvider shape. */
function isProviderLiteral(node: ts.Node): node is ts.ObjectLiteralExpression {
  return ts.isObjectLiteralExpression(node) && membersNamed(node, "descriptor").length > 0 && membersNamed(node, "invoke").length > 0;
}
/** A judged field's text: a string literal or a template without substitutions; anything else is opaque. */
function fieldText(literal: ts.ObjectLiteralExpression, field: string): string | undefined {
  const members = membersNamed(literal, field);
  const last = members[members.length - 1];
  if (last === undefined || !ts.isPropertyAssignment(last)) return undefined;
  return ts.isStringLiteralLike(last.initializer) ? last.initializer.text : undefined;
}
function isRegisterCallee(callee: ts.Expression): boolean {
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text === "register";
  return ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression) && callee.argumentExpression.text === "register";
}
function siteText(node: ts.Node, source: ts.SourceFile): string {
  return node.getText(source).replace(/\s+/g, " ").slice(0, 120);
}

/** Reads one module's provider literals, opaque providers and opaque register calls. */
function scanSource(text: string, module: string): Scan {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: LiteralDescriptor[] = [];
  const opaqueProviders: string[] = [];
  const opaqueRegisterCalls: string[] = [];
  const visit = (node: ts.Node): void => {
    if (isProviderLiteral(node)) {
      const members = membersNamed(node, "descriptor");
      const member = members[members.length - 1];
      const descriptor = member !== undefined && ts.isPropertyAssignment(member) ? member.initializer : undefined;
      if (descriptor !== undefined && ts.isObjectLiteralExpression(descriptor)) {
        const read = (field: string): string => fieldText(descriptor, field) ?? OPAQUE;
        const judged: Judged = { id: read("id"), description: read("description"), effectClass: read("effectClass") };
        const opaque = ["id", "description", "effectClass"].filter(field => fieldText(descriptor, field) === undefined);
        if (descriptor.properties.some(property => ts.isSpreadAssignment(property))) opaque.push("spread");
        literals.push({ module, judged, opaque });
      } else {
        opaqueProviders.push(`${module}|${member === undefined ? OPAQUE : siteText(member, source)}`);
      }
    }
    if (ts.isCallExpression(node) && isRegisterCallee(node.expression)) {
      const argument = node.arguments[0];
      if (argument === undefined || !isProviderLiteral(argument)) opaqueRegisterCalls.push(`${module}|${siteText(node, source)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { literals, opaqueProviders, opaqueRegisterCalls };
}
/** The judged field reading of a literal: the opaque reading counts as a field that names nothing. */
function literalJudged(literal: LiteralDescriptor): Judged {
  const text = (value: string): string => (value === OPAQUE ? "" : value);
  return { id: text(literal.judged.id), description: text(literal.judged.description), effectClass: literal.judged.effectClass };
}
function literalReading(literal: LiteralDescriptor): string {
  const judged = literalJudged(literal);
  return `${literal.module}|${literal.judged.id}|${literal.judged.effectClass}|${stemsOf(judged).join("+")}`;
}
function scanReading(scan: Scan): JsonValue {
  return json({
    literals: scan.literals.map(literalReading),
    opaqueFields: scan.literals.flatMap(literal => literal.opaque.map(field => `${literal.module}|${literal.judged.id}|${field}`)),
    opaqueProviders: scan.opaqueProviders,
    opaqueRegisterCalls: scan.opaqueRegisterCalls,
    violations: scan.literals.filter(literal => violates(literalJudged(literal))).map(literal => `${literal.module}|${literal.judged.id}`),
  });
}

function tsBelow(directory: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...tsBelow(path));
    else if (entry.isFile() && entry.name.endsWith(".ts")) found.push(path);
  }
  return found;
}
function srcModules(): string[] {
  return tsBelow(join(REPO, "src"))
    .map(path => relative(REPO, path).split("\\").join("/"))
    .sort();
}
function srcScan(): { modules: string[]; scan: Scan } {
  const modules = srcModules();
  const scans = modules.map(module => scanSource(readFileSync(join(REPO, module), "utf8"), module));
  return {
    modules,
    scan: {
      literals: scans.flatMap(scan => scan.literals),
      opaqueProviders: scans.flatMap(scan => scan.opaqueProviders),
      opaqueRegisterCalls: scans.flatMap(scan => scan.opaqueRegisterCalls),
    },
  };
}

// ---- the evidence-read table's source ----

const TABLE = "RECONCILE_EVIDENCE_READS";
function isFreezeCall(node: ts.Expression): node is ts.CallExpression {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "Object" &&
    node.expression.name.text === "freeze" &&
    node.arguments.length === 1
  );
}
interface TableReading {
  readonly declarations: readonly string[];
  readonly entries: readonly string[];
}
/** Every declaration of the table's name in one module, and each one's entries as the source spells them. */
function tableReading(text: string, module: string): TableReading {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declarations: string[] = [];
  const entries: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === TABLE) {
      const statement = node.parent.parent;
      const exported = ts.isVariableStatement(statement) && (statement.modifiers ?? []).some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
      const initializer = node.initializer;
      const table = initializer !== undefined && isFreezeCall(initializer) ? initializer.arguments[0] : undefined;
      const frozen = table !== undefined && ts.isObjectLiteralExpression(table);
      declarations.push(`${module}|${exported ? "exported" : "local"}|${frozen ? "frozen-literal" : "other"}`);
      if (table !== undefined && ts.isObjectLiteralExpression(table)) {
        for (const member of table.properties) {
          const name = memberName(member) ?? OPAQUE;
          const value = ts.isPropertyAssignment(member) ? member.initializer : undefined;
          const list = value !== undefined && isFreezeCall(value) ? value.arguments[0] : undefined;
          const reads =
            list !== undefined && ts.isArrayLiteralExpression(list) && list.elements.every(element => ts.isStringLiteralLike(element))
              ? list.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : OPAQUE)).join(",")
              : OPAQUE;
          entries.push(`${name}=${reads}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { declarations, entries };
}
/** Every declaration of the table's name in src, in module order. */
function tableDeclarations(modules: readonly string[]): TableReading {
  const readings = modules.map(module => tableReading(readFileSync(join(REPO, module), "utf8"), module));
  return { declarations: readings.flatMap(reading => reading.declarations), entries: readings.flatMap(reading => reading.entries) };
}
function runtimeEntries(): string[] {
  return Object.entries(RECONCILE_EVIDENCE_READS).map(([producer, reads]) => `${producer}=${reads.join(",")}`);
}
/** The table and every read list frozen. */
function deepFrozen(table: Readonly<Record<string, readonly string[]>>): boolean {
  return Object.isFrozen(table) && Object.values(table).every(reads => Object.isFrozen(reads));
}
/** B1's frozen-check controls: a frozen table, an unfrozen table, an unfrozen read list. */
function frozenControls(): Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> {
  return {
    frozen: Object.freeze({ a: Object.freeze(["a.read"]) }),
    "unfrozen-table": { a: Object.freeze(["a.read"]) },
    "unfrozen-list": Object.freeze({ a: ["a.read"] }),
  };
}
/** One evidence read as B2 reads it: the producer, the read, its registered effect class, own or foreign producer. */
function readVerdict(registry: CapabilityRegistry, producer: string, read: string): string {
  return `${producer}|${read}|${registry.effectClassOf(read) ?? "unregistered"}|${read.split(".")[0] === producer ? "own" : "foreign"}`;
}
/** B2's controls: a read of another producer, and a read no registration provides. */
const READ_CONTROLS: readonly (readonly [string, string])[] = [
  ["forge", "hyperunix.find"],
  ["hyperunix", "hyperunix.predict"],
];

// ---- the bead's own text ----

function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(join(REPO, ".beads", "issues.jsonl"), "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  return { title: "", notes: "" };
}
/** The standing acceptance's clauses: the owner filing's first standing sentence, split at its one ", and ". */
function standingClauses(notes: string): string[] {
  const start = notes.indexOf(STANDING);
  const end = start === -1 ? -1 : notes.indexOf(ON_LANDING, start);
  if (end === -1) return [];
  return notes
    .slice(start + STANDING.length, end)
    .replace(/\.$/, "")
    .split(", and ");
}
/** The clause's word list ("names predict/CPHS/hypothesis carries"). */
function clauseWords(clause: string): string[] {
  const match = /names (\S+) carries/.exec(clause);
  return match === null ? [] : (match[1] ?? "").split("/");
}
/** The title's record names ("(PredictiveHypothesis/ProposedDelta/AdoptionVerdict, "). */
function titleRecords(title: string): string[] {
  const match = /\(([A-Za-z]+(?:\/[A-Za-z]+)+), /.exec(title);
  return match === null ? [] : (match[1] ?? "").split("/");
}
function clauseCount(clause: string): number {
  const match = /exactly the (\w+) producer reads/.exec(clause);
  return match === null ? 0 : (NUMBER_WORDS[match[1] ?? ""] ?? 0);
}
function clauseModule(clause: string): string {
  return /\((src\/[^)]+\.ts)\)/.exec(clause)?.[1] ?? "";
}

// ---- the cases ----

const REACHED: string[] = [];

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => rosterReading(descriptorsOf(await nativeRegistry())),
  A2: async () => rosterReading(descriptorsOf(injectedRegistry())),
  A3: async () => {
    const { modules, scan } = srcScan();
    expect(modules.length, "the src walk reached the modules").toBeGreaterThanOrEqual(SRC_FLOOR);
    const literal = new Set(scan.literals.map(entry => readingOf(literalJudged(entry))));
    const runtime = [...descriptorsOf(await nativeRegistry()), ...descriptorsOf(injectedRegistry())].map(readingOf);
    expect(
      runtime.filter(reading => !literal.has(reading)),
      "every runtime reading is a literal reading",
    ).toStrictEqual([]);
    return scanReading(scan);
  },
  A4: async () =>
    json({
      flagged: FLAGGED_CONTROLS.map(controlReading),
      passing: PASSING_CONTROLS.map(controlReading),
      scanner: Object.fromEntries(Object.entries(SCANNER_CONTROLS).map(([name, text]) => [name, scanReading(scanSource(text, name))])),
      registered: rosterReading(descriptorsOf(plantedRegistry())),
    }),
  B1: async () =>
    json({
      entries: runtimeEntries(),
      frozen: deepFrozen(RECONCILE_EVIDENCE_READS),
      reads: Object.values(RECONCILE_EVIDENCE_READS).flat().length,
      controls: Object.fromEntries(Object.entries(frozenControls()).map(([name, table]) => [name, deepFrozen(table)])),
    }),
  B2: async () => {
    const registry = await nativeRegistry();
    return json({
      reads: Object.entries(RECONCILE_EVIDENCE_READS).flatMap(([producer, reads]) => reads.map(read => readVerdict(registry, producer, read))),
      controls: READ_CONTROLS.map(([producer, read]) => readVerdict(registry, producer, read)),
    });
  },
  B3: async () => {
    const { declarations, entries } = tableDeclarations(srcModules());
    expect(entries, "the source entries are the runtime entries").toStrictEqual(runtimeEntries());
    const controls = Object.fromEntries(Object.entries(TABLE_CONTROLS).map(([name, text]) => [name, tableReading(text, name)]));
    return json({ declarations, entries, controls });
  },
  Q1: async () => {
    const controls = VOCABULARY_CONTROLS.map(description => ({ id: "hyperunix.read", description, effectClass: "write" }));
    return json({ controls: controls.length, matched: controls.filter(control => stemsOf(control).length > 0).length, violations: controls.filter(violates).length });
  },
  Q2: async () => {
    const repaired = LOOKALIKE_PROBES.map(probe => stemsIn(probe.text.split(probe.lookalike).join(probe.latin)));
    expect(
      LOOKALIKE_PROBES.filter(probe => !probe.text.includes(probe.lookalike)).map(probe => probe.text),
      "each probe carries its look-alike",
    ).toStrictEqual([]);
    return json({ lookalike: LOOKALIKE_PROBES.map(probe => stemsIn(probe.text).length), repaired });
  },
  Q3: async () => {
    const base = { id: "hyperunix.read", description: "Read typed HX results", effectClass: "write" };
    const descriptor = {
      ...base,
      version: OTHER_FIELD_PROBES.version,
      permissions: [OTHER_FIELD_PROBES.permissions],
      contractSource: OTHER_FIELD_PROBES.contractSource,
      inputSchema: { type: "object", properties: { [OTHER_FIELD_PROBES.inputSchema ?? ""]: { type: "object" } } },
    };
    return json({
      fields: Object.keys(OTHER_FIELD_PROBES),
      matched: stemsOf(descriptor).length,
      asDescription: Object.values(OTHER_FIELD_PROBES).map(text => stemsIn(text)),
    });
  },
  Q4: async () => {
    const { modules, scan } = srcScan();
    return json({
      scanned: scanReading(scanSource(LOCAL_PROVIDER, "local-provider.js")),
      walkedOutsideSrc: modules.filter(module => !module.startsWith("src/")).length,
      sites: scan.opaqueRegisterCalls,
    });
  },
  Q5: async () => json({ aliased: scanReading(scanSource(INDIRECT_ALIASED, "aliased")), direct: scanReading(scanSource(INDIRECT_DIRECT, "direct")) }),
};

describe("wb-gwr.1 HX prediction effect-class census (HX-PREDICTIVE-WORLD-MODEL-ADAPTERS-R1, standing leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the bead's standing clauses and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "Q:5"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(
      json({
        stems: STEMS,
        judgedFields: JUDGED_FIELDS,
        srcFloor: SRC_FLOOR,
        flagged: FLAGGED_CONTROLS,
        passing: PASSING_CONTROLS,
        scanner: SCANNER_CONTROLS,
        table: TABLE_CONTROLS,
        planted: PLANTED_DESCRIPTOR,
        frozenControls: frozenControls(),
        readControls: READ_CONTROLS,
        vocabulary: VOCABULARY_CONTROLS,
        lookalike: LOOKALIKE_PROBES,
        otherFields: OTHER_FIELD_PROBES,
        localProvider: LOCAL_PROVIDER,
        indirect: [INDIRECT_ALIASED, INDIRECT_DIRECT],
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const members of Object.values(RESIDUALS)) {
      for (const member of members) expect(ROWS.find(row => row.id === "Q")?.pins, `${member} is a quiet-row pin`).toContain(member);
    }
    const { title, notes } = exportRow();
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    const clauses = standingClauses(notes);
    expect(clauses, "the owner filing states two standing clauses").toHaveLength(2);
    const judgedRows = ROWS.filter(row => row.id !== "Q");
    for (const row of judgedRows) expect(clauses.filter(clause => clause === row.label), `row ${row.id} quotes exactly one standing clause`).toHaveLength(1);
    for (const clause of clauses) expect(judgedRows.filter(row => row.label === clause), `"${clause}" is quoted by exactly one row`).toHaveLength(1);
    const words = clauseWords(clauses[0] ?? "");
    const records = titleRecords(title);
    expect(words, "the descriptor clause names its words").toStrictEqual(["predict", "CPHS", "hypothesis"]);
    expect(records, "the title names its records").toStrictEqual(["PredictiveHypothesis", "ProposedDelta", "AdoptionVerdict"]);
    expect([...words, ...records].filter(word => stemsIn(word).length === 0), "every clause word and title record names a stem").toStrictEqual([]);
    expect(
      STEMS.filter(stem => ![...words, ...records].some(word => stemsIn(word).includes(stem))),
      "every stem is a clause word's or a title record's",
    ).toStrictEqual([]);
    const tableWitness = rosterWitness("B1");
    const tableEntries = isObject(tableWitness) && Array.isArray(tableWitness.entries) ? tableWitness.entries.length : -1;
    expect(tableEntries, "the table holds as many producer reads as the clause's number word").toBe(clauseCount(clauses[1] ?? ""));
    const declared = rosterWitness("B3");
    const declarations = isObject(declared) && Array.isArray(declared.declarations) ? declared.declarations : [];
    expect(
      declarations.map(entry => String(entry).split("|")[0]),
      "the table is declared once, in the module the clause names",
    ).toStrictEqual([clauseModule(clauses[1] ?? "")]);
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
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string =>
      `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
  });
});
