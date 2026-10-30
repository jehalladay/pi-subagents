/**
 * wb-jwc.9 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R6; the rule-19 structural-exit child of wb-jwc.6, orchestrator rulings R-B88
 * and R-B109): the readers and the probe vocabulary of the rf operation-receipt reconcile honesty core, landed so wb-jwc.6's final
 * core re-cut can restate its G registrar and N/H honesty claims over them (R-B109: a mechanical restatement over this bead's
 * landed work). Census of record: test/workbench-rf-operation-receipt-honesty-census.test.ts; falsifier roster:
 * test/fixtures/rf-operation-receipt-honesty-roster.json.
 *
 * Each reader claims exactly what it reads, and READER_PLANTS feeds each one planted inputs so the census pins every sub-form:
 *  - srcTree lists every file under src/ (directories followed, each directory's names sorted). A file whose extension is .ts (a
 *    .d.ts file included) is a module, parsed with TypeScript's ScriptKind.TS; every other file is listed unparsed, never parsed.
 *  - rfRegistrationLiterals reads every spelling of register in the src modules: each identifier register and each whole string
 *    token register (a string literal or a template with no substitution); a template with a substitution spells no name and is
 *    not read. A spelling is JUDGED only as the property-access callee of a call. A judged call is READ only when it holds exactly
 *    one argument, an object literal with no spread or computed key holding exactly one `descriptor` property assignment, whose
 *    value is an object literal with no spread or computed key holding exactly one `id` property assignment written as a whole
 *    string token. A read call whose id is an rf capability id (src's producerOf names reactivefiber and the real
 *    CapabilityRegistry accepts the id) is listed in `rf` with its descriptor's `effectClass` (the whole string token written
 *    there, else the syntax standing there, else why there is no one plain effectClass assignment) and `permissions` (an array
 *    literal's elements, each its whole string token else its syntax, else the syntax, else why), so an effect class or a
 *    permission set computed from a registrar's arguments, the workspace root or the environment is written into the reading
 *    instead of a word: it fails closed. A read call whose id is not an rf capability id is not an rf registration and is not
 *    listed. Every other spelling is listed in `unjudged` by file, owner and syntax (a judged call not read: why).
 *  - srcEnvironmentReads reads the src modules' process.env, the property access env of the identifier process: a property access
 *    of it (process.env.NAME) or an element access of it by a whole string token (process.env["NAME"]) gives a NAME; an element
 *    access by anything else is listed as computed; any other use of it (aliased, destructured, passed, spread) is listed as a
 *    whole use. Every other spelling of env (an identifier or a whole string token: globalThis.process.env, a destructured or
 *    aliased process, process["env"], an imported env) gives no NAME and is listed in `other` by file, owner and syntax.
 *  - runForms and registeredUnder run a registrar with a fresh registry in each stated run form and list what it leaves the
 *    registry holding for rf ids.
 *  - HONESTY_READS is the vocabulary of preview reads a reconcile is fed, by kind (fresh, failed, unprojected) and route
 *    (injectable: src's registerReactiveFiberRender over a seam that returns the envelope or throws the category; native: src's
 *    registerNativeReactiveFiberRender over a stand-in rf, the only PATH entry, a POSIX shell script of shell builtins only that
 *    prints one fixed line and exits with one fixed code, inside one tracked scratch directory removed after the read).
 *  - READER_PLANTS is the vocabulary of planted inputs: each a planted src tree written into one tracked scratch directory (removed
 *    after the read) and read by srcTree, rfRegistrationLiterals or srcEnvironmentReads, or a planted registrar run through
 *    runForms and registeredUnder; each names the refusal #1 unmet members it pins.
 *
 * Display paths added: none. Test-only; reads src and the planted trees, and spawns nothing but the stand-in rf.
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import ts from "typescript";
import { type CapabilityDescriptor, CapabilityError, type CapabilityErrorCategory, type CapabilityProvider, CapabilityRegistry, type JsonValue } from "../../src/workbench/capability-registry.js";
import { REACTIVE_FIBER_CLI_SCHEMA, registerNativeReactiveFiberRender, registerReactiveFiberRender } from "../../src/workbench/providers/reactivefiber.js";
import { decideReconcile, mintEvidenceReceipt, type ReconcileDecision, type ReconcileDeps, type ReconcileRequest } from "../../src/workbench/reconcile-decision.js";
import type { WorkflowJournalEntry } from "../../src/workflow/journal.js";
import { type EvidenceReceipt, producerOf } from "../../src/workflow/reconcile.js";
import { fullShapeRf } from "./rf-render-fixture.js";
import { makeScratch, removeScratch } from "./scratch.js";

/** The workspace root every probe registers and reads under; a string, never created. */
export const HONESTY_WS = "/workspace/rf-operation-receipt-honesty";
export const PREVIEW_ID = "reactivefiber.render.preview";
export const PREVIEW_PERMISSION = "reactivefiber:render";
const PREVIEW_INPUT = { model: "m", task: "t" };
/** The test-only stand-in for the committing rf capability the R5 gate waits for (wb-jwc.5's posture); src registers none. */
export const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
const COMMIT_INPUT = { type: "object", properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } }, required: ["model", "task"], additionalProperties: false };
/** rf ids in the rf grammar (rfo_/rfw_/rft_/rfr_ + 22-32 of [0-9a-z]); obviously synthetic. */
export const JOURNALED = "rfo_journaledcommit000000000";
/** The one fresh id every fresh read carries: a freshly minted invocation id, never the journaled one. */
export const FRESH = "rfo_freshpreview0000000000";
const WORKSPACE_ID = "rfw_honestyworkspace000000";
const TRANSACTION_ID = "rft_honestytransaction0000";
const RENDER_ID = "rfr_honestyrender000000000";
const TASK_ID = "wf_rfhonesty-census";
const SESSION = "s1";
const PRINCIPAL = "local-operator:1:s1";
const NOW = "2026-10-30T06:00:00Z";
const REASON = "census probe: a reconcile fed only rf preview reads";
const GRANTS = ["workbench:observe", PREVIEW_PERMISSION, "reconcile:reactivefiber.acknowledge", "reconcile:reactivefiber.override"];
const RF_PRODUCER = "reactivefiber";

/** Every file under a directory, whatever its name, in sorted path order. */
function treeFiles(dir: string): string[] {
  return readdirSync(dir).sort().flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? treeFiles(path) : [path];
  });
}
/** The one module extension the readers parse and its script kind: src holds .ts modules only, so a src file with any other extension is listed, never parsed. */
const MODULE_KINDS: Readonly<Record<string, ts.ScriptKind>> = { ".ts": ts.ScriptKind.TS };
const scriptKindOf = (file: string): ts.ScriptKind | undefined => (Object.hasOwn(MODULE_KINDS, extname(file)) ? MODULE_KINDS[extname(file)] : undefined);
const parsedFiles = new Map<string, ts.SourceFile>();
function parsed(root: string, file: string): ts.SourceFile {
  const key = join(root, file);
  let source = parsedFiles.get(key);
  if (source === undefined) {
    source = ts.createSourceFile(file, readFileSync(key, "utf8"), ts.ScriptTarget.Latest, true, scriptKindOf(file) ?? ts.ScriptKind.TS);
    parsedFiles.set(key, source);
  }
  return source;
}
/** The src tree, by repo-relative path: the .ts modules every reader parses, and every other file (listed, never parsed). */
export function srcTree(root: string): { readonly modules: readonly string[]; readonly unparsed: readonly string[] } {
  const files = treeFiles(join(root, "src")).map(path => relative(root, path));
  return { modules: files.filter(file => scriptKindOf(file) !== undefined), unparsed: files.filter(file => scriptKindOf(file) === undefined) };
}
function visitAll(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, child => visitAll(child, visit));
}
/** A whole string token: a string literal or a template with no substitution. */
const isWholeToken = (node: ts.Node): node is ts.StringLiteral | ts.NoSubstitutionTemplateLiteral => ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node);
/** Who holds a node: the function, or the Class.method, it sits in, else its class, else the outermost variable it initializes, else <top>. */
function ownerOf(node: ts.Node): string {
  let variable: string | undefined;
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) {
    if (ts.isFunctionDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isMethodDeclaration(at) && at.name !== node && ts.isClassDeclaration(at.parent) && at.parent.name !== undefined) return `${at.parent.name.text}.${at.name.getText()}`;
    if (ts.isClassDeclaration(at) && at.name !== undefined) return at.name.text;
    if (ts.isVariableDeclaration(at) && ts.isIdentifier(at.name)) variable = at.name.text;
  }
  return variable ?? "<top>";
}
/** The key a property is declared under, or undefined for a spread or a computed key. */
function propertyKey(property: ts.ObjectLiteralElementLike): string | undefined {
  const name = property.name;
  return name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) ? name.text : undefined;
}
/** The value of an object literal's one plain `key` assignment, or why the literal cannot be read for it. */
function soleAssignment(object: ts.ObjectLiteralExpression, key: string): ts.Expression | string {
  if (object.properties.some(property => propertyKey(property) === undefined)) return "a spread or computed key";
  const named = object.properties.filter(property => propertyKey(property) === key);
  const [only] = named;
  if (only === undefined || named.length !== 1) return `${named.length} ${key} properties`;
  return ts.isPropertyAssignment(only) ? only.initializer : `${key} ${ts.SyntaxKind[only.kind]}`;
}
/** The word a judged descriptor property spells: its whole string token, else <the syntax standing there>. */
function wordOf(value: ts.Expression | string): string {
  if (typeof value === "string") return `<${value}>`;
  return isWholeToken(value) ? value.text : `<${ts.SyntaxKind[value.kind]}>`;
}
/** The words a judged descriptor's array property spells: [token,...] with <syntax> for any element that is not a whole token, else <the syntax>. */
function wordsOf(value: ts.Expression | string): string {
  if (typeof value === "string") return `<${value}>`;
  if (!ts.isArrayLiteralExpression(value)) return `<${ts.SyntaxKind[value.kind]}>`;
  return `[${value.elements.map(element => (isWholeToken(element) ? element.text : `<${ts.SyntaxKind[element.kind]}>`)).join(",")}]`;
}

/** The registry's verdict on each id asked about, so every id is judged once. */
const registryVerdicts = new Map<string, boolean>();
/** Whether the real CapabilityRegistry accepts `text` as a descriptor id: the registry's own grammar judges, so no copy of it lives here. */
function registryAcceptsId(text: string): boolean {
  let verdict = registryVerdicts.get(text);
  if (verdict === undefined) {
    try {
      new CapabilityRegistry().register({
        descriptor: { id: text, version: "1.0.0", description: "census id-grammar probe", inputSchema: COMMIT_INPUT, effectClass: "read", permissions: [PREVIEW_PERMISSION], supportedModes: ["invoke"] },
        invoke: async () => null,
      });
      verdict = true;
    } catch (error) {
      if (!(error instanceof CapabilityError) || error.category !== "validation") throw error;
      verdict = false;
    }
    registryVerdicts.set(text, verdict);
  }
  return verdict;
}
/** An rf capability id: src's producerOf names reactivefiber, and the registry accepts the text as a descriptor id. */
export const isRfCapabilityId = (text: string): boolean => producerOf(text) === RF_PRODUCER && registryAcceptsId(text);

/** One judged rf register call, as its descriptor literal spells it. */
export interface RegistrationLiteral {
  readonly file: string;
  readonly owner: string;
  readonly id: string;
  /** The whole string token the descriptor's effectClass holds, else <the syntax standing there>. */
  readonly effectClass: string;
  /** [token,...] for an array literal of whole string tokens (<syntax> per other element), else <the syntax standing there>. */
  readonly permissions: string;
}
export interface RegistrationReading {
  /** Every read register call whose id is an rf capability id, in file then source order. */
  readonly rf: readonly RegistrationLiteral[];
  /** Every spelling that is not a read register call, as `file#owner: syntax` or `file#owner: register call, why`, in file then source order. */
  readonly unjudged: readonly string[];
}
/** Every src spelling of `register`: the read rf calls listed with their descriptor literal, every spelling that is not a read call listed unjudged. */
export function rfRegistrationLiterals(root: string): RegistrationReading {
  const rf: RegistrationLiteral[] = [];
  const unjudged: string[] = [];
  for (const file of srcTree(root).modules) {
    visitAll(parsed(root, file), node => {
      if (!(ts.isIdentifier(node) || isWholeToken(node)) || node.text !== "register") return;
      const parent = node.parent;
      const access = (ts.isPropertyAccessExpression(parent) && parent.name === node) || (ts.isElementAccessExpression(parent) && parent.argumentExpression === node) ? parent : node;
      const holder = access.parent;
      const owner = ownerOf(node);
      if (!(ts.isPropertyAccessExpression(access) && ts.isCallExpression(holder) && holder.expression === access)) {
        unjudged.push(`${file}#${owner}: ${ts.SyntaxKind[holder.kind]}`);
        return;
      }
      const [provider] = holder.arguments;
      let why: string | undefined;
      let descriptor: ts.ObjectLiteralExpression | undefined;
      if (provider === undefined || holder.arguments.length !== 1) why = `${holder.arguments.length} arguments`;
      else if (!ts.isObjectLiteralExpression(provider)) why = `provider ${ts.SyntaxKind[provider.kind]}`;
      else {
        const value = soleAssignment(provider, "descriptor");
        if (typeof value === "string") why = `provider: ${value}`;
        else if (!ts.isObjectLiteralExpression(value)) why = `descriptor ${ts.SyntaxKind[value.kind]}`;
        else descriptor = value;
      }
      if (why === undefined && descriptor !== undefined) {
        const id = soleAssignment(descriptor, "id");
        if (typeof id === "string") why = `descriptor: ${id}`;
        else if (!isWholeToken(id)) why = `id ${ts.SyntaxKind[id.kind]}`;
        else {
          if (isRfCapabilityId(id.text)) rf.push({ file, owner, id: id.text, effectClass: wordOf(soleAssignment(descriptor, "effectClass")), permissions: wordsOf(soleAssignment(descriptor, "permissions")) });
          return;
        }
      }
      unjudged.push(`${file}#${owner}: register call, ${why}`);
    });
  }
  return { rf, unjudged };
}

/** What src reads of the process environment through process.env, the property access env of the identifier process. */
export interface EnvironmentReads {
  /** Every name src reads as process.env.NAME or process.env["NAME"], listed once in first-seen order. */
  readonly names: readonly string[];
  /** Every element access of process.env by anything but a whole string token, as `file#owner: syntax`. */
  readonly computed: readonly string[];
  /** Every other use of process.env (aliased, destructured, passed, spread), as `file#owner: syntax`. */
  readonly whole: readonly string[];
  /** Every other src spelling of env (an identifier or a whole string token), as `file#owner: syntax`: none gives a name. */
  readonly other: readonly string[];
}
const isProcessEnv = (node: ts.Node): node is ts.PropertyAccessExpression =>
  ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "process" && node.name.text === "env";
/** Every src read of process.env, and every other src spelling of env listed. */
export function srcEnvironmentReads(root: string): EnvironmentReads {
  const names: string[] = [];
  const computed: string[] = [];
  const whole: string[] = [];
  const other: string[] = [];
  for (const file of srcTree(root).modules) {
    visitAll(parsed(root, file), node => {
      if ((ts.isIdentifier(node) || isWholeToken(node)) && node.text === "env" && !(isProcessEnv(node.parent) && node.parent.name === node)) other.push(`${file}#${ownerOf(node)}: ${ts.SyntaxKind[node.parent.kind]}`);
      if (!isProcessEnv(node)) return;
      const parent = node.parent;
      const site = `${file}#${ownerOf(node)}`;
      if (ts.isPropertyAccessExpression(parent) && parent.expression === node) names.push(parent.name.text);
      else if (ts.isElementAccessExpression(parent) && parent.expression === node) {
        if (isWholeToken(parent.argumentExpression)) names.push(parent.argumentExpression.text);
        else computed.push(`${site}: ${ts.SyntaxKind[parent.argumentExpression.kind]}`);
      } else whole.push(`${site}: ${ts.SyntaxKind[parent.kind]}`);
    });
  }
  return { names: [...new Set(names)], computed, whole, other };
}

/** The members of a src string-literal union type alias, or of an interface property's union type, read from the declaration. */
export function srcUnion(root: string, file: string, alias: string, property?: string): string[] {
  const found: string[] = [];
  let declared = 0;
  visitAll(parsed(root, file), node => {
    let type: ts.TypeNode | undefined;
    if (property === undefined && ts.isTypeAliasDeclaration(node) && node.name.text === alias) type = node.type;
    if (property !== undefined && ts.isInterfaceDeclaration(node) && node.name.text === alias) {
      const member = node.members.find(candidate => ts.isPropertySignature(candidate) && candidate.name.getText() === property);
      if (member !== undefined && ts.isPropertySignature(member)) type = member.type;
    }
    if (type === undefined) return;
    declared += 1;
    for (const member of ts.isUnionTypeNode(type) ? type.types : [type]) {
      if (!ts.isLiteralTypeNode(member) || !ts.isStringLiteral(member.literal)) throw new Error(`${alias}${property === undefined ? "" : `.${property}`} holds a member that is not a string literal type (${ts.SyntaxKind[member.kind]}): refused`);
      found.push(member.literal.text);
    }
  });
  if (declared !== 1) throw new Error(`${file} declares ${alias}${property === undefined ? "" : `.${property}`} ${declared} times`);
  return found;
}

/** One run form a registrar is measured in: its workspace root and the environment variables set for the run. */
export interface RunForm {
  readonly name: string;
  readonly workspaceRoot: string;
  readonly environment: Readonly<Record<string, string>>;
}
/**
 * The stated run forms: the census workspace root, process.cwd() as the workspace root (the R1 form), and, for each effect class
 * word but read, the census root with every environment name src reads set to that word (the R2 form).
 */
export function runForms(environmentNames: readonly string[], effectClasses: readonly string[]): RunForm[] {
  return [
    { name: "census-root", workspaceRoot: HONESTY_WS, environment: {} },
    { name: "cwd-root", workspaceRoot: process.cwd(), environment: {} },
    ...effectClasses.filter(word => word !== "read").map(word => ({ name: `env-${word}`, workspaceRoot: HONESTY_WS, environment: Object.fromEntries(environmentNames.map(name => [name, word])) })),
  ];
}
/** What a fresh registry holds for rf ids once `register` returns in run form `form`: `id=effectClass/[permissions]` per rf descriptor. */
export function registeredUnder(form: RunForm, register: (registry: CapabilityRegistry, workspaceRoot: string) => void): string {
  const saved = Object.keys(form.environment).map(name => [name, process.env[name]] as const);
  try {
    for (const [name, value] of Object.entries(form.environment)) process.env[name] = value;
    const registry = new CapabilityRegistry();
    register(registry, form.workspaceRoot);
    const held = registry.catalogSnapshot().filter(entry => isRfCapabilityId(entry.descriptor.id));
    return held.length === 0 ? "<no rf descriptor>" : held.map(entry => `${entry.descriptor.id}=${entry.descriptor.effectClass}/[${entry.descriptor.permissions.join(",")}]`).join(" ");
  } finally {
    for (const [name, value] of saved) {
      if (value === undefined) Reflect.deleteProperty(process.env, name);
      else process.env[name] = value;
    }
  }
}

export type HonestyReadKind = "fresh" | "failed" | "unprojected";
export type HonestyRoute = "injectable" | "native";
/** How a read is served: the injectable seam returns an envelope or throws a category; the native stand-in prints a line and exits. */
export type HonestyServe =
  | { readonly answer: "envelope"; readonly envelope: JsonValue }
  | { readonly answer: "throw"; readonly category: CapabilityErrorCategory }
  | { readonly answer: "print"; readonly stdout: string; readonly exit: number };
export interface HonestyRead {
  /** `${route}:${name}`, the pin key. */
  readonly key: string;
  readonly kind: HonestyReadKind;
  readonly route: HonestyRoute;
  readonly name: string;
  /** The claim text naming exactly this read. */
  readonly label: string;
  readonly serve: HonestyServe;
}
type PreviewEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

/** An rf envelope around `result`, with the schema, command and operation id a form names (an absent id is left out). */
function envelopeOf(result: JsonValue, form: { readonly schema?: string; readonly command?: string; readonly operationId?: string | null } = {}): JsonValue {
  const { schema = REACTIVE_FIBER_CLI_SCHEMA, command = "context.render", operationId = FRESH } = form;
  return {
    schema, ok: true, command, ...(operationId === null ? {} : { operation_id: operationId }), workspace: { id: WORKSPACE_ID, root: HONESTY_WS },
    transaction_id: null, result, diagnostics: [],
  };
}
/** The bare result the census's earlier reads used: output text alone (the native preview refuses it as transport). */
const bareResult = (): JsonValue => ({ output: { text: "census context" } });
/** The smallest result the shipped native preview admits: exactly the keys src's isPreviewEnvelope requires, no optional key. */
function minimalResult(): JsonValue {
  return {
    output: { text: "census context" }, provenance: { graph_revision_id: `sha256:${"9".repeat(64)}` },
    budget: { formula_terms: { context_window: 1000, output_reserve: 100, occupied_tokens: 0, overhead: 0, safety_margin: 10, available_context_tokens: 890 } },
    diagnostics_summary: { errors: 0, warnings: 0, has_errors: false, has_warnings: false },
    work: { source_capture_count: 0, fiber_signal_count: 0, component_render_count: 0, lens_resolution_count: 0, necessity_eval_count: 0, storage_write_count: 0 },
    ephemeral: true, render_id: null,
  };
}
/** The full result rf 0.1.845 states on every --no-commit render (test/helpers/rf-render-fixture.ts, held to test/fixtures/rf-result-keys.json). */
export function fullResult(): JsonValue {
  const result = fullShapeRf(HONESTY_WS).result;
  if (result === null || typeof result !== "object" || Array.isArray(result)) throw new Error("the full-shape rf fixture holds no result object");
  return result;
}
/** The stand-in's line for a refused render: an ok:false envelope with one RF_ error diagnostic and no result (src maps it to unavailable). */
function refusedLine(): string {
  const diagnostic = { code: "RF_CENSUS_REFUSED", severity: "error", message: "census refusal", hint: null, source: null, metadata: {} };
  return JSON.stringify({ schema: REACTIVE_FIBER_CLI_SCHEMA, ok: false, command: "context.render", operation_id: FRESH, workspace: { id: WORKSPACE_ID, root: HONESTY_WS }, transaction_id: null, result: null, diagnostics: [diagnostic] });
}

/** The fresh shapes, each carrying the fresh rfo_: [name, label part, result]. */
const FRESH_SHAPES: readonly (readonly [string, string, () => JsonValue])[] = [
  ["bare", "the bare result (output text alone)", bareResult],
  ["minimal", "the smallest result the native preview admits (exactly the keys isPreviewEnvelope requires)", minimalResult],
  ["full", "the full rf 0.1.845 result (every key of test/fixtures/rf-result-keys.json)", fullResult],
];
/** The unprojected forms, each returned through the injectable seam: [name, label part, envelope]. */
const UNPROJECTED_FORMS: readonly (readonly [string, string, () => JsonValue])[] = [
  ["show-bare", "a context.show envelope around the bare result", () => envelopeOf(bareResult(), { command: "context.show" })],
  ["show-full", "a context.show envelope around the full rf 0.1.845 result", () => envelopeOf(fullResult(), { command: "context.show" })],
  ["drift-bare", "a context.render envelope under schema reactive-fiber.cli/v2 around the bare result", () => envelopeOf(bareResult(), { schema: "reactive-fiber.cli/v2" })],
  ["drift-full", "a context.render envelope under schema reactive-fiber.cli/v2 around the full rf 0.1.845 result", () => envelopeOf(fullResult(), { schema: "reactive-fiber.cli/v2" })],
  ["no-source", "no envelope at all (the seam answers null)", () => null],
  ["no-identity", "a reactive-fiber.cli/v1 context.render envelope around the full rf 0.1.845 result with no operation_id", () => envelopeOf(fullResult(), { operationId: null })],
];

/**
 * The vocabulary, in pin order: five fresh reads (each shape through the injectable seam; the two the native preview admits through
 * the native registration too), one failed read per member of src's CapabilityErrorCategory through the injectable seam plus the two
 * the native registration mints from a stand-in's output (malformed JSON, an rf refusal), and six unprojected reads.
 */
export function honestyReads(categories: readonly CapabilityErrorCategory[]): HonestyRead[] {
  const read = (kind: HonestyReadKind, route: HonestyRoute, name: string, label: string, serve: HonestyServe): HonestyRead => ({ key: `${route}:${name}`, kind, route, name, label, serve });
  return [
    ...FRESH_SHAPES.map(([name, part, result]) => read("fresh", "injectable", name, `a fresh read through the injectable registration: a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around ${part}`, { answer: "envelope", envelope: envelopeOf(result()) })),
    ...FRESH_SHAPES.filter(([name]) => name !== "bare").map(([name, part, result]) => read("fresh", "native", name, `a fresh read through the native registration: a stand-in rf printing a reactive-fiber.cli/v1 context.render envelope carrying the fresh rfo_ around ${part}, exit 0`, { answer: "print", stdout: JSON.stringify(envelopeOf(result())), exit: 0 })),
    ...categories.map(category => read("failed", "injectable", category, `a read failed with ${category}: the injectable seam throws a CapabilityError of category ${category}`, { answer: "throw", category })),
    read("failed", "native", "malformed", "a read failed through the native registration: a stand-in rf printing a line that is not JSON, exit 0", { answer: "print", stdout: "census: not json", exit: 0 }),
    read("failed", "native", "refused", "a read failed through the native registration: a stand-in rf printing an rf refusal (ok false, one RF_ error diagnostic, result null), exit 1", { answer: "print", stdout: refusedLine(), exit: 1 }),
    ...UNPROJECTED_FORMS.map(([name, part, envelope]) => read("unprojected", "injectable", name, `an unprojected read through the injectable registration: ${part}`, { answer: "envelope", envelope: envelope() })),
  ];
}
/** The echo read R-ECHO pins: the full fresh shape carrying the JOURNALED id instead of the fresh one, through the injectable seam. */
export const ECHO_READ: HonestyRead = {
  key: "injectable:echo", kind: "fresh", route: "injectable", name: "echo",
  label: "an envelope under the preview contract echoing the journaled rfo_ (the full rf 0.1.845 result)",
  serve: { answer: "envelope", envelope: envelopeOf(fullResult(), { operationId: JOURNALED }) },
};

/** The stand-in rf: a POSIX shell script of builtins only that prints the one line stored in `out` and exits with `exit`. */
const standIn = (out: string, exit: number): string => ["#!/bin/sh", `IFS= read -r line < '${out}'`, `printf '%s\\n' "$line"`, `exit ${exit}`, ""].join("\n");
/** Runs `run` with a stand-in rf serving `serve` as the only PATH entry, in one tracked scratch directory removed afterwards. */
async function withStandIn<T>(serve: { readonly stdout: string; readonly exit: number }, run: () => Promise<T>): Promise<T> {
  const dir = makeScratch("wb-jwc9-rf-standin-");
  const path = process.env.PATH;
  try {
    const out = join(dir, "out.line");
    writeFileSync(out, `${serve.stdout}\n`);
    writeFileSync(join(dir, "rf"), standIn(out, serve.exit), { mode: 0o755 });
    process.env.PATH = dir;
    return await run();
  } finally {
    if (path === undefined) Reflect.deleteProperty(process.env, "PATH");
    else process.env.PATH = path;
    removeScratch(dir);
  }
}

/** The committed render the committing stand-in returns: the identity a committing rf effect would carry. */
function committedReading(): JsonValue {
  return {
    contract: `${COMMIT_ID}/v1`, workspaceRoot: HONESTY_WS,
    source: { schema: REACTIVE_FIBER_CLI_SCHEMA, ok: true, command: "context.render", operation_id: JOURNALED, workspace: { id: WORKSPACE_ID, root: HONESTY_WS }, transaction_id: TRANSACTION_ID, result: { render_id: RENDER_ID }, diagnostics: [] },
  };
}
/** The preview through the read's route, beside the test-only committing stand-in. */
function registryFor(read: HonestyRead): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  const serve = read.serve;
  if (read.route === "native") registerNativeReactiveFiberRender(registry, HONESTY_WS);
  else {
    registerReactiveFiberRender(registry, async () => {
      if (serve.answer === "throw") throw new CapabilityError(serve.category, `census: the rf read failed with ${serve.category}`);
      if (serve.answer !== "envelope") throw new Error(`the injectable seam cannot serve a ${serve.answer} answer`);
      return JSON.parse(JSON.stringify(serve.envelope)) as PreviewEnvelope;
    }, HONESTY_WS);
  }
  registry.register({
    descriptor: {
      id: COMMIT_ID, version: "1.0.0", description: "Test-only stand-in for the committing rf render the R5 gate waits for (wb-jwc.5); src registers none",
      inputSchema: COMMIT_INPUT, effectClass: "write", permissions: [COMMIT_PERMISSION], supportedModes: ["invoke"],
    },
    invoke: async () => committedReading(),
  });
  return registry;
}
/** The committed-effect row wb-jwc.6's filing names: a non-read rf node journaled with {reactivefiber, operation, rfo_X}. */
export const COMMIT_ROW: WorkflowJournalEntry = {
  index: 0, key: "k0", ok: true, kind: "node", capabilityId: COMMIT_ID, effectClass: "write",
  nativeRefs: [{ provider: "reactivefiber", type: "operation", id: JOURNALED }],
};
/** The one request context every read is fed in (R-PROBE-CONTEXT's quiet row lists it). */
export const PROBE_CONTEXT = { taskId: TASK_ID, position: 0, principal: PRINCIPAL, session: SESSION, workspace: HONESTY_WS, observedAt: NOW, grants: GRANTS } as const;
function request(action: ReconcileRequest["action"], params: Record<string, JsonValue>): ReconcileRequest {
  return {
    action, taskId: TASK_ID, ...(action === "inspect" ? {} : { position: 0 }), grants: GRANTS, scope: { workspace: HONESTY_WS, principal: PRINCIPAL },
    sessionId: SESSION, principal: { id: PRINCIPAL, role: "local-operator" }, params,
  };
}
function deps(registry: CapabilityRegistry, entries: readonly WorkflowJournalEntry[], receipts: readonly EvidenceReceipt[]): ReconcileDeps {
  return {
    task: { status: "completed", observationScope: { sessionId: SESSION, workspace: HONESTY_WS, principal: PRINCIPAL } },
    entries, receipts, currentEffectClass: id => registry.effectClassOf(id), now: () => NOW,
  };
}
/** A decision as one word: the deny policy, the acknowledgement's evidence class, or the override's duplicate risk. */
export function outcomeOf(decision: ReconcileDecision): string {
  if (decision.decision === "denied") return `deny:${decision.policy}`;
  const record = decision.decision === "acknowledge" || decision.decision === "override" ? decision.entry.reconcile : undefined;
  if (record?.decision === "acknowledge") return `ack:${record.evidenceClass}`;
  if (record?.decision === "override") return `override:${record.duplicateRisk}`;
  return decision.decision;
}
/** One evidence action as workflow_reconcile performs it: the core admits the read, the registry runs it, the core mints the receipt. */
export async function previewReceipt(read: HonestyRead): Promise<EvidenceReceipt> {
  const registry = registryFor(read);
  const decision = decideReconcile(request("evidence", { evidence: { capabilityId: PREVIEW_ID, input: PREVIEW_INPUT } }), deps(registry, [COMMIT_ROW], []));
  if (decision.decision !== "evidence") throw new Error(`the reconcile core refused the preview read: ${outcomeOf(decision)}`);
  const invoke = () => registry.invoke(decision.read.capabilityId, decision.read.input, { grants: GRANTS, signal: new AbortController().signal });
  const serve = read.serve;
  let result: JsonValue | undefined;
  let failure: CapabilityErrorCategory | undefined;
  try {
    result = serve.answer === "print" ? await withStandIn(serve, invoke) : await invoke();
  } catch (error) {
    // reconcile-tool.ts: a CapabilityError keeps its category, anything else is transport.
    failure = error instanceof CapabilityError ? error.category : "transport";
  }
  return mintEvidenceReceipt({
    taskId: TASK_ID, position: decision.read.position, producer: decision.read.producer, capabilityId: decision.read.capabilityId,
    input: decision.read.input, requestedAt: NOW, observedAt: NOW, ...(result !== undefined ? { result } : {}),
    ...(failure !== undefined ? { failure } : {}), recordedNativeRefs: decision.read.recordedNativeRefs,
  });
}
/** The registry a decision reads effect classes from: the injectable preview (never invoked by a decision) beside the committing stand-in. */
const decisionRegistry = (): CapabilityRegistry => registryFor({ ...ECHO_READ, serve: { answer: "throw", category: "unavailable" } });
/** An acknowledgement of the committed-effect row citing `receipts`. */
export function acknowledgeWith(determination: string, receipts: readonly EvidenceReceipt[]): ReconcileDecision {
  const params: Record<string, JsonValue> = { reason: REASON, determination, receiptIds: receipts.map(receipt => receipt.receiptId) };
  return decideReconcile(request("acknowledge", params), deps(decisionRegistry(), [COMMIT_ROW], receipts));
}
/** The override an acknowledgement makes possible: its duplicate risk, without and with the risk accepted. */
export function overrideAfter(acknowledgement: ReconcileDecision): string {
  if (acknowledgement.decision !== "acknowledge") return "no acknowledgement to override";
  const record = acknowledgement.entry.reconcile;
  const params: Record<string, JsonValue> = {
    reason: REASON, acknowledgementId: record?.decision === "acknowledge" ? record.acknowledgementId : "", confirmed: true, confirmPosition: 0, confirmCapabilityId: COMMIT_ID,
  };
  const registry = decisionRegistry();
  const entries = [COMMIT_ROW, acknowledgement.entry];
  const unaccepted = decideReconcile(request("override", params), deps(registry, entries, []));
  const accepted = decideReconcile(request("override", { ...params, acceptDuplicateRisk: true }), deps(registry, entries, []));
  return `override unaccepted=${outcomeOf(unaccepted)} accepted=${outcomeOf(accepted)}`;
}
/** A read's measured honesty: its receipt, every determination's acknowledgement citing it, and the override after its effect-absent one. */
export async function honestyOf(read: HonestyRead, determinations: readonly string[]): Promise<string> {
  const receipt = await previewReceipt(read);
  const acks = determinations.map(determination => [determination, acknowledgeWith(determination, [receipt])] as const);
  const absent = acks.find(([determination]) => determination === "effect-absent")?.[1];
  return [
    `receipt ${receipt.outcome}/${receipt.binding} ref=${receipt.nativeRef?.id ?? "none"}`,
    acks.map(([determination, decision]) => `${determination}=${outcomeOf(decision)}`).join(" "),
    absent === undefined ? "no effect-absent determination" : overrideAfter(absent),
  ].join("; ");
}

/** A registrar the run forms run: it registers into the registry it is handed under the workspace root it is handed. */
type Registrar = (registry: CapabilityRegistry, workspaceRoot: string) => void;
/** One planted input the census feeds a reader. */
export interface ReaderPlant {
  /** `${reader}:${name}`, the pin key. */
  readonly key: string;
  /** The claim the pin states: the reader, the planted input and what the reader reads of it. */
  readonly label: string;
  /** The refusal #1 unmet members (the UNMET block of wb-jwc.9's notes in the bead export) this plant pins. */
  readonly cures: readonly string[];
  /** The reading, measured: what the reader reads of the planted tree, or what each run form leaves the registry holding. */
  readonly read: () => string;
}
/** Writes a planted src tree into one tracked scratch directory, in the order given, runs `read` with it as the root, and removes it. */
function withPlantedTree<T>(files: Readonly<Record<string, string>>, read: (root: string) => T): T {
  const root = makeScratch("wb-jwc9-planted-src-");
  try {
    for (const [path, text] of Object.entries(files)) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), text);
    }
    return read(root);
  } finally {
    removeScratch(root);
  }
}
function treeReading(root: string): string {
  const tree = srcTree(root);
  return `modules=${tree.modules.join(",") || "none"}; unparsed=${tree.unparsed.join(",") || "none"}`;
}
function registrationReading(root: string): string {
  const reading = rfRegistrationLiterals(root);
  const rf = reading.rf.map(literal => `${literal.file}#${literal.owner}: id=${literal.id} effectClass=${literal.effectClass} permissions=${literal.permissions}`);
  return `rf=${rf.join(" | ") || "none"}; unjudged=${reading.unjudged.join(" | ") || "none"}`;
}
function environmentReading(root: string): string {
  const reads = srcEnvironmentReads(root);
  return `names=${reads.names.join(",") || "none"}; computed=${reads.computed.join(" | ") || "none"}; whole=${reads.whole.join(" | ") || "none"}; other=${reads.other.join(" | ") || "none"}`;
}
/** The one planted module a source plant writes. */
const PLANTED_MODULE = "src/plant.ts";

/** Two planted names byte order and UTF-16 code-unit order disagree on: U+FF5E sorts first by bytes, U+10000 by code units. */
const BMP_NAME = `src/${String.fromCodePoint(0xff5e)}.txt`;
const ASTRAL_NAME = `src/${String.fromCodePoint(0x10000)}.txt`;
/** The planted src tree srcTree reads: written out of sorted order, nested two levels deep, one file per extension the split names. */
const PLANTED_TREE: Readonly<Record<string, string>> = {
  "src/c.tsx": "export const plantTsx = 1;\n",
  [BMP_NAME]: "planted text\n",
  "src/README": "planted, no extension\n",
  "src/h.json": '{ "id": "reactivefiber.render.commit" }\n',
  "src/a.ts": "export const plantTs = 1;\n",
  "src/nested/i.txt": "planted text\n",
  [ASTRAL_NAME]: "planted text\n",
  "src/types.d.ts": "export type PlantDeclared = string;\n",
  "src/e.cts": "export const plantCts = 1;\n",
  "src/nested/deep/b.ts": "export const plantNested = 1;\n",
  "src/g.mjs": "export const plantMjs = 1;\n",
  "src/d.mts": "export const plantMts = 1;\n",
  "src/f.js": "export const plantJs = 1;\n",
};
const SPELLINGS_MODULE = `const VERB = "register";
const TEMPLATE_VERB = \`register\`;
const NOT_SPELLED = \`regis\${"ter"}\`;
export function plantElementAccess(registry: Registry): void {
  registry["register"](PROVIDER);
}
export function plantTemplateAccess(registry: Registry): void {
  registry[\`register\`](PROVIDER);
}
export function plantConstAccess(registry: Registry): void {
  registry[VERB](PROVIDER);
}
export function plantDestructured(registry: Registry): void {
  const { register } = registry;
  register(PROVIDER);
}
export function plantCallMember(registry: Registry): void {
  registry.register.call(registry, PROVIDER);
}
export function plantParenthesized(registry: Registry): void {
  (registry.register)(PROVIDER);
}
export function plantPassedMember(registry: Registry): void {
  schedule(registry.register);
}
export function plantMemberOfSpelling(register: Holder): void {
  register.apply(undefined, [PROVIDER]);
}
export function register(): void {}
export const plantKeyed = { register: PROVIDER };
export const plantQuotedKey = { "register": PROVIDER };
`;
const ARGUMENTS_MODULE = `export function plantNoArguments(hooks: Hooks): void {
  hooks.register();
}
export function plantTwoArguments(hooks: Hooks): void {
  hooks.register("./plant-hooks.mjs", "file:///plant/");
}
export function plantProviderBesideExtra(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-extra", effectClass: "write", permissions: ["reactivefiber:commit"] } }, { strict: true });
}
export function plantSpreadArgument(registry: Registry, providers: Provider[]): void {
  registry.register(...providers);
}
export function plantProviderReference(registry: Registry, provider: Provider): void {
  registry.register(provider);
}
export function plantProviderCall(registry: Registry): void {
  registry.register(makeProvider());
}
`;
const PROVIDER_MODULE = `const DESCRIPTOR = { id: "reactivefiber.plant-base", effectClass: "read", permissions: ["reactivefiber:render"] };
export function plantProviderSpread(registry: Registry, base: Provider): void {
  registry.register({ ...base, descriptor: { id: "reactivefiber.plant-spread", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantProviderComputed(registry: Registry): void {
  registry.register({ ["descriptor"]: { id: "reactivefiber.plant-computed", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantProviderNoDescriptor(registry: Registry): void {
  registry.register({ invoke: async () => null });
}
export function plantProviderTwoDescriptors(registry: Registry): void {
  registry.register({ descriptor: DESCRIPTOR, descriptor: { id: "reactivefiber.plant-second", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantProviderShorthand(registry: Registry, descriptor: Descriptor): void {
  registry.register({ descriptor });
}
export function plantProviderMethod(registry: Registry): void {
  registry.register({ descriptor() { return DESCRIPTOR; } });
}
export function plantDescriptorReference(registry: Registry): void {
  registry.register({ descriptor: DESCRIPTOR });
}
export function plantDescriptorCall(registry: Registry): void {
  registry.register({ descriptor: describePlant() });
}
export function plantQuotedKeys(registry: Registry): void {
  registry.register({ 0: "numeric key", "descriptor": { "id": "reactivefiber.plant-quoted", "effectClass": "write", "permissions": ["reactivefiber:commit"] } });
}
`;
const DESCRIPTOR_MODULE = `const PLANT_ID = "reactivefiber.plant-reference";
export function plantDescriptorSpread(registry: Registry, workspaceRoot: string): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-spread", effectClass: "read", permissions: ["reactivefiber:render"], ...(workspaceRoot === "/opt/plant-elsewhere" ? { effectClass: "write" as const } : {}) } });
}
export function plantDescriptorComputed(registry: Registry, key: string): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-computed", [key]: "write", effectClass: "read", permissions: ["reactivefiber:render"] } });
}
export function plantDescriptorNoId(registry: Registry): void {
  registry.register({ descriptor: { effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDescriptorTwoIds(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-first", id: "reactivefiber.plant-second", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDescriptorShorthandId(registry: Registry, id: string): void {
  registry.register({ descriptor: { id, effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDescriptorIdReference(registry: Registry): void {
  registry.register({ descriptor: { id: PLANT_ID, effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDescriptorIdTemplate(registry: Registry, verb: string): void {
  registry.register({ descriptor: { id: \`reactivefiber.\${verb}\`, effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDescriptorIdToken(registry: Registry): void {
  registry.register({ descriptor: { id: \`reactivefiber.plant-template\`, effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
`;
const IDS_MODULE = `export function plantCommitId(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.render.commit", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantDashedId(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber-plant.dashed", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantNeighbourProducer(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefibers.plant", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantRefusedId(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.Plant", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantBareProducer(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
export function plantOtherProducer(registry: Registry): void {
  registry.register({ descriptor: { id: "forge.plant.read", effectClass: "read", permissions: ["forge:read"] } });
}
`;
const EFFECT_CLASS_MODULE = `const PLANT_CLASS = "write";
export function plantConditionalClass(registry: Registry, workspaceRoot: string): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-conditional", effectClass: workspaceRoot === "/opt/plant-elsewhere" ? "write" : "read", permissions: ["reactivefiber:render"] } });
}
export function plantReferenceClass(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-reference", effectClass: PLANT_CLASS, permissions: ["reactivefiber:render"] } });
}
export function plantCallClass(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-call", effectClass: classOfPlant(), permissions: ["reactivefiber:render"] } });
}
export function plantAssertedClass(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-asserted", effectClass: "write" as const, permissions: ["reactivefiber:render"] } });
}
export function plantShorthandClass(registry: Registry, effectClass: EffectClass): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-shorthand", effectClass, permissions: ["reactivefiber:render"] } });
}
export function plantMissingClass(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-missing", permissions: ["reactivefiber:render"] } });
}
export function plantTwoClasses(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-two", effectClass: "read", effectClass: "write", permissions: ["reactivefiber:render"] } });
}
export function plantTemplateClass(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-template", effectClass: \`external\`, permissions: ["reactivefiber:render"] } });
}
`;
const PERMISSIONS_MODULE = `const PLANT_PERMISSION = "reactivefiber:commit";
const PLANT_PERMISSIONS = ["reactivefiber:render"];
export function plantSpreadPermission(registry: Registry, workspaceRoot: string): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-spread", effectClass: "read", permissions: ["reactivefiber:render", ...(workspaceRoot === "/opt/plant-elsewhere" ? ["reactivefiber:commit"] : [])] } });
}
export function plantReferenceElement(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-element", effectClass: "read", permissions: ["reactivefiber:render", PLANT_PERMISSION] } });
}
export function plantTemplateElements(registry: Registry, verb: string): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-template", effectClass: "read", permissions: [\`reactivefiber:render\`, \`reactivefiber:\${verb}\`] } });
}
export function plantEmptyPermissions(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-empty", effectClass: "read", permissions: [] } });
}
export function plantPermissionsReference(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-reference", effectClass: "read", permissions: PLANT_PERMISSIONS } });
}
export function plantShorthandPermissions(registry: Registry, permissions: string[]): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-shorthand", effectClass: "read", permissions } });
}
export function plantMissingPermissions(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-missing", effectClass: "read" } });
}
export function plantTwoPermissions(registry: Registry): void {
  registry.register({ descriptor: { id: "reactivefiber.plant-two", effectClass: "read", permissions: ["reactivefiber:render"], permissions: ["reactivefiber:commit"] } });
}
`;
const OWNERS_MODULE = `export function plantDeclaredOwner(registry: Registry): void {
  registry.register(PLANT_PROVIDER);
}
export function plantOuterDeclared(registry: Registry): void {
  function plantInnerDeclared(): void {
    registry.register(PLANT_PROVIDER);
  }
  plantInnerDeclared();
}
export class PlantHolder {
  hold(registry: Registry): void {
    registry.register(PLANT_PROVIDER);
  }
  register(): void {}
}
export const plantOuterVariable = {
  inner: () => {
    const plantInnerVariable = (registry: Registry): void => registry.register(PLANT_PROVIDER);
    return plantInnerVariable;
  },
};
export const plantExpressionOwner = function plantNamedExpression(registry: Registry): void {
  registry.register(PLANT_PROVIDER);
};
export const plantMethodObject = {
  hold(registry: Registry): void {
    registry.register(PLANT_PROVIDER);
  },
};
export default class {
  hold(registry: Registry): void {
    registry.register(PLANT_PROVIDER);
  }
}
plantRegistry.register(PLANT_PROVIDER);
`;
const SCRIPT_KIND_MODULE = `export function plantAssertedHolder(holder: unknown): void {
  (<Registry>holder).register({ descriptor: { id: "reactivefiber.plant-asserted", effectClass: "write", permissions: ["reactivefiber:commit"] } });
}
`;
const NAMES_MODULE = `export function plantNames(): (string | undefined)[] {
  return [
    process.env.PI_JWC9_NAME_SECOND,
    process.env["PI-JWC9-NAME-FIRST"],
    process.env[\`PI_JWC9_NAME_TEMPLATE\`],
    process.env.PI_JWC9_NAME_SECOND,
    process?.env.PI_JWC9_NAME_OPTIONAL,
    process.env?.PI_JWC9_NAME_CHAINED,
  ];
}
`;
const COMPUTED_MODULE = `const PLANT_NAMES = ["PI_JWC9_LISTED"];
export function plantComputed(key: string, suffix: string): (string | undefined)[] {
  return [process.env[key], process.env[\`PI_JWC9_\${suffix}\`], process.env["PI_JWC9_" + suffix], process.env[PLANT_NAMES[0]]];
}
`;
const WHOLE_MODULE = `export function plantAliased(): string | undefined {
  const vars = process.env;
  return vars.PI_JWC9_ALIASED;
}
export function plantDestructuredNames(): string | undefined {
  const { PI_JWC9_DESTRUCTURED } = process.env;
  return PI_JWC9_DESTRUCTURED;
}
export function plantPassed(spawnLike: (vars: unknown) => void): void {
  spawnLike(process.env);
}
export function plantSpread(): Record<string, string | undefined> {
  return { ...process.env };
}
export function plantCompared(): boolean {
  return process.env !== undefined;
}
export function plantReturned(): unknown {
  return process.env;
}
export function plantNonNull(): string | undefined {
  return process.env!.PI_JWC9_NON_NULL;
}
`;
const OTHER_MODULE = `import { env } from "node:process";
export function plantGlobal(): string | undefined {
  return globalThis.process.env.PI_JWC9_GLOBAL;
}
export function plantRenamed(): string | undefined {
  const { env: vars } = process;
  return vars.PI_JWC9_RENAMED;
}
export function plantShorthand(): string | undefined {
  const { env } = process;
  return env.PI_JWC9_SHORTHAND;
}
export function plantElement(): string | undefined {
  return process["env"].PI_JWC9_ELEMENT;
}
export function plantHost(): string | undefined {
  const host = process;
  return host.env.PI_JWC9_HOST;
}
export function plantParenthesized(): string | undefined {
  return (process).env.PI_JWC9_PARENTHESIZED;
}
export function plantImported(): string | undefined {
  return env.PI_JWC9_IMPORTED;
}
`;

/** The planted environment names the environment run plant reads; obviously synthetic, never set outside a run. */
export const PLANTED_NAMES: readonly string[] = ["PI_JWC9_PLANT_FIRST", "PI_JWC9_PLANT_SECOND"];
/** A planted provider: the descriptor the planted registrars hand the registry, with the effect class and permissions given. */
function plantedProvider(id: string, effectClass: CapabilityDescriptor["effectClass"], permissions: readonly string[]): CapabilityProvider {
  return {
    descriptor: { id, version: "1.0.0", description: "census planted registration", inputSchema: COMMIT_INPUT, effectClass, permissions: [...permissions], supportedModes: ["invoke"] },
    invoke: async () => null,
  };
}
/** The second planted name's value for the effect class (the run forms set only effect class words) and the first's as a permission. */
const environmentRegistrar: Registrar = registry => {
  const first = process.env[PLANTED_NAMES[0] ?? ""];
  const word = (process.env[PLANTED_NAMES[1] ?? ""] ?? "read") as CapabilityDescriptor["effectClass"];
  registry.register(plantedProvider(PREVIEW_ID, word, first === undefined ? [PREVIEW_PERMISSION] : [PREVIEW_PERMISSION, `plant-env:${first}`]));
};
/** The workspace root it is handed, by name, as a permission, and external for the effect class when it is process.cwd(). */
const workspaceRootRegistrar: Registrar = (registry, workspaceRoot) => {
  const root = workspaceRoot === process.cwd() ? "cwd" : workspaceRoot === HONESTY_WS ? "census" : "other";
  registry.register(plantedProvider(PREVIEW_ID, root === "cwd" ? "external" : "read", [PREVIEW_PERMISSION, `plant-root:${root}`]));
};
/** A forge id always, and two rf ids unless the workspace root is process.cwd(). */
const heldRegistrar: Registrar = (registry, workspaceRoot) => {
  registry.register(plantedProvider("forge.plant-held", "read", ["forge:plant"]));
  if (workspaceRoot === process.cwd()) return;
  registry.register(plantedProvider(PREVIEW_ID, "read", [PREVIEW_PERMISSION]));
  registry.register(plantedProvider("reactivefiber.plant-held", "write", ["reactivefiber:commit"]));
};
/** What each run form over `names` leaves the registry holding for rf ids, and, when names are planted, their values after the run. */
function runsReading(names: readonly string[], effectClasses: readonly string[], registrar: Registrar): string {
  return runForms(names, effectClasses).map(form => {
    const held = registeredUnder(form, registrar);
    const after = names.map(name => `${name}=${process.env[name] ?? "unset"}`).join(",");
    return `${form.name}: ${held}${names.length > 0 ? ` (after the run: ${after})` : ""}`;
  }).join("; ");
}

/** The planted inputs, in pin order: the tree split, the registration reader's sub-forms, the environment reader's, and the run forms'. */
export function readerPlants(effectClasses: readonly string[]): ReaderPlant[] {
  const source = (key: string, cures: readonly string[], label: string, text: string, reading: (root: string) => string): ReaderPlant => ({
    key, cures, label, read: () => withPlantedTree({ [PLANTED_MODULE]: text }, reading),
  });
  return [
    {
      key: "tree:split", cures: ["U1k"], read: () => withPlantedTree(PLANTED_TREE, treeReading),
      label: "srcTree over a planted src tree (refusal #1 U1k): every file under src/ is listed, directories followed and each directory's names sorted by UTF-16 code unit (a name above U+FFFF before a name at U+FF5E, which byte order puts first); a file whose extension is .ts (a .d.ts file included) is a module, and every other file (.tsx, .mts, .cts, .js, .mjs, .json, .txt, no extension) is listed unparsed; the split is listed",
    },
    source("registrations:spellings", ["U1j"], "rfRegistrationLiterals over a planted src module (refusal #1 U1j): each identifier register and each whole string token register (a string literal or a template with no substitution) is a spelling, and every spelling that is not the property-access callee of a call is listed unjudged by file, owner and the syntax holding it (a const initializer, an element-access call, a destructured member and its call, a member of the member, a parenthesized callee, a member passed as an argument, a parameter and its member, a function name, a property key); a template with a substitution spells no name and is not read; the reading is listed", SPELLINGS_MODULE, registrationReading),
    source("registrations:arguments", ["U1i"], "rfRegistrationLiterals over a planted src module (refusal #1 U1i): a property-access register call that holds other than exactly one argument (none, two strings, a provider literal beside a second argument) is listed unjudged as register call, N arguments, and one whose one argument is not an object literal (a spread argument, a reference, a call) as register call, provider <syntax>; the reading is listed", ARGUMENTS_MODULE, registrationReading),
    source("registrations:provider", [], "rfRegistrationLiterals over a planted src module: a register call whose provider literal holds a spread or a computed key, no descriptor, two descriptors, or a descriptor written as a shorthand or a method is listed unjudged as register call, provider: <why>, and one whose descriptor is not an object literal (a reference, a call) as register call, descriptor <syntax>; a provider whose keys are numbers or quoted strings, holding a descriptor whose keys are quoted strings, is read; the reading is listed", PROVIDER_MODULE, registrationReading),
    source("registrations:descriptor", ["U1a"], "rfRegistrationLiterals over a planted src module (refusal #1 U1a): a register call whose descriptor literal holds a spread (a conditional spread of effectClass write included) or a computed key, no id, two ids, or an id written as a shorthand is listed unjudged as register call, descriptor: <why>, and one whose id is not a whole string token (a reference, a template with a substitution) as register call, id <syntax>; an id written as a template with no substitution is read as its text; the reading is listed", DESCRIPTOR_MODULE, registrationReading),
    source("registrations:ids", ["U1d"], "rfRegistrationLiterals over a planted src module (refusal #1 U1d): a read call is listed as an rf literal when its id is an rf capability id, src's producerOf naming reactivefiber and the real CapabilityRegistry accepting the id (reactivefiber.render.commit, and reactivefiber-plant.dashed, whose producer ends at the dash); a read call whose producer is another (reactivefibers.plant, forge.plant.read) or whose id the registry refuses (reactivefiber.Plant, reactivefiber) is not an rf registration and is not listed; the reading is listed", IDS_MODULE, registrationReading),
    source("registrations:effect-class", ["U1b"], "rfRegistrationLiterals over a planted src module (refusal #1 U1b): an rf literal's effectClass is the whole string token written there (a template with no substitution included), else the syntax standing there in angle brackets (a conditional, a reference, a call, an as const assertion), else why there is no one plain effectClass assignment (a shorthand, none, two); the reading is listed", EFFECT_CLASS_MODULE, registrationReading),
    source("registrations:permissions", ["U1c"], "rfRegistrationLiterals over a planted src module (refusal #1 U1c): an rf literal's permissions are [token,...] for an array literal (an empty one included), each element its whole string token else its syntax in angle brackets (a conditional spread, a reference, a template with a substitution), else the syntax standing there (a reference), else why there is no one plain permissions assignment (a shorthand, none, two); the reading is listed", PERMISSIONS_MODULE, registrationReading),
    source("registrations:owners", [], "rfRegistrationLiterals over a planted src module: a spelling's owner is the innermost function declaration it sits in, else Class.method for a named class's method other than the spelling itself, else its named class, else the outermost variable it initializes (through an arrow function, a function expression or an object-literal method), else <top> (an anonymous default class included); the reading is listed", OWNERS_MODULE, registrationReading),
    source("registrations:script-kind", [], "rfRegistrationLiterals over a planted src module: a .ts module is parsed with TypeScript's ScriptKind.TS, so a register call through an angle-bracket type assertion of its holder is read as an rf literal; the reading is listed", SCRIPT_KIND_MODULE, registrationReading),
    source("environment:names", ["U1h"], "srcEnvironmentReads over a planted src module (refusal #1 U1h): a property access of process.env (process?.env and process.env?. included) gives its NAME, an element access of process.env by a whole string token (a string literal or a template with no substitution) gives the token as its NAME, and the names are listed once each in first-seen order; the reading is listed", NAMES_MODULE, environmentReading),
    source("environment:computed", [], "srcEnvironmentReads over a planted src module: an element access of process.env by anything but a whole string token (a reference, a template with a substitution, a concatenation, an element access) is listed as computed by file, owner and syntax and gives no NAME; the reading is listed", COMPUTED_MODULE, environmentReading),
    source("environment:whole", ["U1g"], "srcEnvironmentReads over a planted src module (refusal #1 U1g): every other use of process.env (aliased in a variable, destructured, passed to a call, spread, compared, returned, asserted non-null) is listed as a whole use by file, owner and the syntax holding it and gives no NAME; the reading is listed", WHOLE_MODULE, environmentReading),
    source("environment:other", ["U2"], "srcEnvironmentReads over a planted src module (refusal #1 U2): every spelling of env (an identifier or a whole string token) that is not the env of process.env on the identifier process is listed in other by file, owner and the syntax holding it and gives no NAME (an imported env and its use, globalThis.process.env, a renamed or a shorthand destructured env of process and its use, process['env'], an aliased process, a parenthesized process); the reading is listed", OTHER_MODULE, environmentReading),
    {
      key: "runs:environment", cures: ["U1e"], read: () => runsReading(PLANTED_NAMES, effectClasses, environmentRegistrar),
      label: "registeredUnder in the run forms over two planted environment names (refusal #1 U1e): each env form sets every name to its effect class word for the run and restores the environment after it, so a planted registrar reading the second name for its effect class and the first for a permission registers per form what the form set; what each run leaves the registry holding for rf ids, and both names after the run, are listed",
    },
    {
      key: "runs:workspace-root", cures: ["U1f"], read: () => runsReading([], effectClasses, workspaceRootRegistrar),
      label: "registeredUnder in the run forms (refusal #1 U1f): each run hands the registrar the form's workspace root, process.cwd() in the cwd form and the census root in every other, so a planted registrar keying its effect class and a permission on the root registers per form what the root was; what each run leaves the registry holding for rf ids is listed",
    },
    {
      key: "runs:registry", cures: [], read: () => runsReading([], effectClasses, heldRegistrar),
      label: "registeredUnder in the run forms: each run registers into a fresh registry and lists every rf descriptor it then holds, in registration order and space-joined as id=effectClass/[permissions], leaving out a descriptor whose id is not an rf capability id, and <no rf descriptor> when it holds none (a planted registrar holding a forge id and two rf ids, and in the cwd form the forge id only); what each run leaves the registry holding is listed",
    },
  ];
}
