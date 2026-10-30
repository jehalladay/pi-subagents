/**
 * wb-jwc.9 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R6; the rule-19 structural-exit child of wb-jwc.6, orchestrator rulings R-B88
 * and R-B109): the readers and the probe vocabulary of the rf operation-receipt reconcile honesty core, landed so wb-jwc.6's final
 * core re-cut can restate its G registrar and N/H honesty claims over them (R-B109: a mechanical restatement over this bead's
 * landed work). Census of record: test/workbench-rf-operation-receipt-honesty-census.test.ts; falsifier roster:
 * test/fixtures/rf-operation-receipt-honesty-roster.json.
 *
 * Each reader claims exactly what it reads:
 *  - rfRegistrationLiterals reads every src spelling of a member named `register` (each identifier `register` and each whole
 *    string token `register`). A spelling is JUDGED only as the property-access callee of a one-argument call whose provider is
 *    an object literal with no spread or computed key, holding exactly one `descriptor` property assignment whose value is such an
 *    object literal with exactly one `id` property assignment written as a whole string token. A judged call whose id is an rf
 *    capability id (src producerOf names reactivefiber and the real CapabilityRegistry accepts the id) is read for its
 *    descriptor's `effectClass` (the whole string token written there, else the syntax that stands there) and its `permissions`
 *    (an array literal of whole string tokens, else the syntax), so an effect class or a permission set computed from a
 *    registrar's arguments, the workspace root or the environment is written into the reading instead of a word: it fails
 *    closed. Every other spelling is listed unjudged by file, owner and syntax.
 *  - srcEnvironmentReads reads every src read of process.env: a property access (process.env.NAME) or an element access by a whole
 *    string token (process.env["NAME"]) gives a NAME; an element access by anything else is listed as computed; any other use of
 *    process.env (passed whole, aliased, destructured) is listed as a whole use.
 *  - HONESTY_READS is the vocabulary of preview reads a reconcile is fed, by kind (fresh, failed, unprojected) and route
 *    (injectable: src's registerReactiveFiberRender over a seam that returns the envelope or throws the category; native: src's
 *    registerNativeReactiveFiberRender over a stand-in rf, the only PATH entry, a POSIX shell script of shell builtins only that
 *    prints one fixed line and exits with one fixed code, inside one tracked scratch directory removed after the read).
 *
 * Display paths added: none. Test-only; reads src and spawns nothing but the stand-in rf.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative } from "node:path";
import ts from "typescript";
import { CapabilityError, type CapabilityErrorCategory, CapabilityRegistry, type JsonValue } from "../../src/workbench/capability-registry.js";
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
/** The script kind each TypeScript or JavaScript module extension is parsed with; a src file with any other extension is listed, never parsed. */
const MODULE_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS, ".mts": ts.ScriptKind.TS, ".cts": ts.ScriptKind.TS, ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS, ".mjs": ts.ScriptKind.JS, ".cjs": ts.ScriptKind.JS, ".jsx": ts.ScriptKind.JSX,
};
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
/** The src tree, by repo-relative path: the modules every reader parses, and every other file (listed, never parsed). */
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
  /** Every judged register call whose id is an rf capability id, in file then source order. */
  readonly rf: readonly RegistrationLiteral[];
  /** Every spelling that is not a judged register call, as `file#owner: syntax`, in file then source order. */
  readonly unjudged: readonly string[];
}
/** Every src spelling of a member named `register`: the judged rf calls read to their descriptor literal, every unjudged spelling listed. */
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
      const id = descriptor === undefined ? undefined : soleAssignment(descriptor, "id");
      if (descriptor === undefined || id === undefined || typeof id === "string" || !isWholeToken(id)) {
        unjudged.push(`${file}#${owner}: register call, ${why ?? (typeof id === "string" ? `descriptor: ${id}` : `id ${id === undefined ? "absent" : ts.SyntaxKind[id.kind]}`)}`);
        return;
      }
      if (!isRfCapabilityId(id.text)) return;
      rf.push({ file, owner, id: id.text, effectClass: wordOf(soleAssignment(descriptor, "effectClass")), permissions: wordsOf(soleAssignment(descriptor, "permissions")) });
    });
  }
  return { rf, unjudged };
}

/** What src reads of the process environment. */
export interface EnvironmentReads {
  /** Every name src reads as process.env.NAME or process.env["NAME"], first-seen order. */
  readonly names: readonly string[];
  /** Every element access of process.env by anything but a whole string token, as `file#owner: syntax`. */
  readonly computed: readonly string[];
  /** Every other use of process.env (passed whole, aliased, destructured), as `file#owner: syntax`. */
  readonly whole: readonly string[];
}
const isProcessEnv = (node: ts.Node): node is ts.PropertyAccessExpression =>
  ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "process" && node.name.text === "env";
export function srcEnvironmentReads(root: string): EnvironmentReads {
  const names: string[] = [];
  const computed: string[] = [];
  const whole: string[] = [];
  for (const file of srcTree(root).modules) {
    visitAll(parsed(root, file), node => {
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
  return { names: [...new Set(names)], computed, whole };
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
