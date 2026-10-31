/**
 * wb-pyel.7 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R1; the rule-19 structural exit of wb-pyel.1, orchestrator rulings R-B105 and
 * R-B135): the Fiber host-publication census's A1 and A3 readers at full surface, for wb-pyel.1's census to compose. Every claim
 * word here is held to a planted falsifier by test/workbench-fiber-host-publication-readers-census.test.ts, whose CLAIMS constant
 * states the claims and whose roster (test/fixtures/fiber-host-publication-readers-roster.json) holds every reading.
 *
 * A1, THE MANIFEST READERS. manifestForm names the one form that selects a path: manifest-name (its base name is a MANIFEST_NAMES
 * entry, in any ASCII letter case), pip-name (its base name holds a PIP_FAMILY_WORDS word, in any ASCII letter case, whatever its extension
 * or none), pip-directory (a directory segment of its path holds a PIP_FAMILY_WORDS word, in any ASCII letter case: every file below it,
 * at any depth, whatever its extension or none). readManifests reads every listed path outside TEST_ROOT that a form selects, each
 * as raw lines (all but the ROOT_NPM pair, which have their own readers: manifestHits reads package.json whole, lockReading reads
 * package-lock.json's installed paths and names), and reports each STEM hit as `<path>:<line>: <needle>`.
 *
 * A3, THE REGISTRATION READERS. registrationTexts is the static reading of one file: in a script module every judged text (a
 * JUDGED_KINDS node) one of whose word segments is a REGISTRATION_WORDS entry, one entry per segment, and every REGISTER_NAME name
 * that a DECLARATION_KINDS declaration or an import or export specifier's property name spells; in any other file every raw
 * line's REGISTRATION_WORDS segments. familyCriteria names each criterion that puts a descriptor in the Fiber family, one reason per
 * criterion (id, permission, contract: the text folds to hold FAMILY_WORD; rf-contract: the contract starts with RF_CONTRACT);
 * isCarrier reads the contract against the provider's own REACTIVE_FIBER_CONTRACT_SOURCE; registryReading states a registry's
 * needle hits and its Fiber family whole (criteria, carrier and publishing reasons for each member).
 *
 * Display paths added: none. Test-only: nothing here writes, spawns or registers anything; every reader reads what it is handed.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import type { CapabilityDescriptor, CapabilityRegistry, JsonValue } from "../../src/workbench/capability-registry.js";
import { REACTIVE_FIBER_CONTRACT_SOURCE } from "../../src/workbench/providers/reactivefiber.js";

// ---- the vocabulary ----

/** The producer's stem: its distribution word FiberOpticsSDK, folded, the SDK suffix dropped. */
export const STEM = "fiberoptics";
/** The classes a Pi host would construct to host Fiber (the producer package root's exports). */
export const HOSTED_CLASSES = ["FiberRuntime", "FiberGraph", "FiberScheduler"] as const;
/** The host's publication and rerender ingress and their explicit flushes (FiberRuntime's methods). */
export const PUBLICATION_ENTRIES = ["queue_value_publication", "flush_value_publications", "request_rerender", "flush_requested_renders"] as const;
/** Today's rf previews are renders ending in this flag. */
export const NO_COMMIT = "--no-commit";
/** The dependency manifests A1 reads at any depth by base name, in any ASCII letter case: the npm, Python and Rust ecosystems. */
export const MANIFEST_NAMES = [
  "package.json",
  "package-lock.json",
  "npm-shrinkwrap.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pyproject.toml",
  "setup.py",
  "setup.cfg",
  "Pipfile",
  "Pipfile.lock",
  "poetry.lock",
  "uv.lock",
  "pdm.lock",
  "environment.yml",
  "environment.yaml",
  "Cargo.toml",
  "Cargo.lock",
] as const;
/** pip's requirement, constraint and lock family: a base name or a directory segment holding one of these, in any ASCII letter case, is read. */
export const PIP_FAMILY_WORDS = ["requirements", "constraints", "pylock"] as const;
/** The test tree: .npmignore keeps it out of the published package, so a manifest below it declares no dependency of Pi's. */
export const TEST_ROOT = "test/";
/** The root npm pair, each read by its own reader and never as raw lines. */
export const ROOT_NPM = ["package.json", "package-lock.json"] as const;
/** A3's static reading, its words: a judged text one of whose word segments is one of these is read (the registry's method, the native bridge). */
export const REGISTRATION_WORDS = ["register", "registerNativeProviders"] as const;
/** A3's static reading, its names: a declared or imported name matching this is read (register, then no lower-case letter). */
export const REGISTER_NAME = /^register(?![a-z])/;
/** The node kinds whose text the static reading judges: names, string-like literals, template parts, regular expressions, JSX text. */
export const JUDGED_KINDS: readonly ts.SyntaxKind[] = [
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.PrivateIdentifier,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.RegularExpressionLiteral,
  ts.SyntaxKind.JsxText,
];
/** The declarations whose name the static reading reads: TypeScript's named-declaration kinds. */
export const DECLARATION_KINDS: readonly ts.SyntaxKind[] = [
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.Parameter,
  ts.SyntaxKind.BindingElement,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.MethodSignature,
  ts.SyntaxKind.PropertySignature,
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.EnumDeclaration,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.ModuleDeclaration,
  ts.SyntaxKind.ImportClause,
  ts.SyntaxKind.NamespaceImport,
  ts.SyntaxKind.ImportSpecifier,
  ts.SyntaxKind.ExportSpecifier,
  ts.SyntaxKind.NamespaceExport,
  ts.SyntaxKind.ImportEqualsDeclaration,
  ts.SyntaxKind.TypeParameter,
];
/** A descriptor whose id, a permission or its contract folds to hold this word is in the Fiber family. */
export const FAMILY_WORD = "fiber";
/** A descriptor whose contract starts with this prefix (rf's own contract spelling) is in the Fiber family. */
export const RF_CONTRACT = "rf@";
/** The script modules the static reading parses, by extension; any other file is read as raw lines. */
export const SCRIPT_KINDS: Readonly<Record<string, ts.ScriptKind>> = {
  ".ts": ts.ScriptKind.TS,
  ".mts": ts.ScriptKind.TS,
  ".cts": ts.ScriptKind.TS,
  ".tsx": ts.ScriptKind.TSX,
  ".js": ts.ScriptKind.JS,
  ".mjs": ts.ScriptKind.JS,
  ".cjs": ts.ScriptKind.JS,
  ".jsx": ts.ScriptKind.JSX,
};
const JUDGED_KIND_SET: ReadonlySet<ts.SyntaxKind> = new Set(JUDGED_KINDS);
const KIND_NAMES = new Map<number, string>();
for (const [name, value] of Object.entries(ts.SyntaxKind)) if (typeof value === "number" && !KIND_NAMES.has(value)) KIND_NAMES.set(value, name);
/** A syntax kind's own name, its first enum key (ts.SyntaxKind's reverse map names a later alias, FirstTemplateToken for NoSubstitutionTemplateLiteral). */
export function kindName(kind: ts.SyntaxKind): string {
  return KIND_NAMES.get(kind) ?? String(kind);
}
const DECLARATION_KIND_SET: ReadonlySet<ts.SyntaxKind> = new Set(DECLARATION_KINDS);

// ---- the folds ----

/** The joined fold: NFKC, lower case, every character outside a-z and 0-9 removed. */
export function fold(text: string): string {
  return text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
}
/** The segmented fold: the text cut at whitespace and path separators (/ and \), each segment joined-folded, empty ones dropped. */
export function segmentFolds(text: string): string[] {
  return text
    .normalize("NFKC")
    .split(/[\s/\\]+/u)
    .map(fold)
    .filter(segment => segment.length > 0);
}
export const STEM_NEEDLES: readonly string[] = [STEM];
export const HOSTING_NEEDLES: readonly string[] = [STEM, ...HOSTED_CLASSES.map(fold)];
export const ENTRY_NEEDLES: readonly string[] = PUBLICATION_ENTRIES.map(fold);
export const ALL_NEEDLES: readonly string[] = [...HOSTING_NEEDLES, ...ENTRY_NEEDLES];

/** The needles a text holds (one of its segments' joined fold holds the needle), in needle order. */
export function needlesIn(text: string, needles: readonly string[]): string[] {
  const segments = segmentFolds(text);
  return needles.filter(needle => segments.some(segment => segment.includes(needle)));
}
export function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** A JSON copy of a value (undefined fields dropped), the shape every reading is compared in. */
export function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}

// ---- A1: the manifest readers ----

/** Every key and string of a JSON value at any depth, each with its path (a key is read as text too). */
export function textsOf(value: unknown, path: string): { path: string; text: string }[] {
  if (typeof value === "string") return [{ path, text: value }];
  if (Array.isArray(value)) return value.flatMap((item, index) => textsOf(item, `${path}[${index}]`));
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [{ path: `${path}{${key}}`, text: key }, ...textsOf(item, `${path}.${key}`)]);
  return [];
}
/** The needle hits of a JSON value's texts, `<path>: <needle>`. */
export function textHits(value: unknown, path: string, needles: readonly string[]): string[] {
  return textsOf(value, path).flatMap(({ path: at, text }) => needlesIn(text, needles).map(needle => `${at}: ${needle}`));
}
/** A text's raw lines, each with its line number (every line is judged, comments included). */
export function rawLines(text: string): { line: number; text: string }[] {
  return text.split("\n").map((line, index) => ({ line: index + 1, text: line }));
}
/** The needle hits of judged texts, `<file>:<line>: <needle>`. */
export function hitsIn(texts: readonly { line: number; text: string }[], file: string, needles: readonly string[]): string[] {
  return texts.flatMap(({ line, text }) => needlesIn(text, needles).map(needle => `${file}:${line}: ${needle}`));
}
/** A manifest read whole: its parsed keys and strings, and (given) its raw lines, so a shadowed duplicate key is read too. */
export function manifestHits(manifest: unknown, raw: string | undefined, label: string): string[] {
  const parsed = textHits(manifest, label, STEM_NEEDLES);
  const lines = raw === undefined ? [] : hitsIn(rawLines(raw), label, STEM_NEEDLES);
  return [...parsed, ...lines];
}
/** package-lock.json's installed package paths and their name fields (never versions or integrity hashes). */
export function lockReading(lock: unknown): { packages: number; hits: string[] } {
  const packages = isObject(lock) && isObject(lock.packages) ? lock.packages : {};
  const hits = Object.entries(packages).flatMap(([path, entry]) => {
    const name = isObject(entry) && typeof entry.name === "string" ? entry.name : "";
    return [...needlesIn(path, STEM_NEEDLES).map(needle => `${path}: ${needle}`), ...needlesIn(name, STEM_NEEDLES).map(needle => `${path} name: ${needle}`)];
  });
  return { packages: Object.keys(packages).length, hits };
}
/** The three forms that select a path for A1, in the order manifestForm tries them. */
export type ManifestForm = "manifest-name" | "pip-name" | "pip-directory";
/** Whether a path segment holds a PIP_FAMILY_WORDS word, in any ASCII letter case. */
export function holdsPipWord(segment: string): boolean {
  const lower = segment.toLowerCase();
  return PIP_FAMILY_WORDS.some(word => lower.includes(word));
}
/** The form that selects a path, or undefined: its base name (a MANIFEST_NAMES entry, then a pip word), then its directory segments. */
export function manifestForm(path: string): ManifestForm | undefined {
  const segments = path.split("/");
  const name = segments[segments.length - 1] ?? "";
  const lower = name.toLowerCase();
  if (MANIFEST_NAMES.some(entry => entry.toLowerCase() === lower)) return "manifest-name";
  if (holdsPipWord(name)) return "pip-name";
  if (segments.slice(0, -1).some(holdsPipWord)) return "pip-directory";
  return undefined;
}
/** A dependency manifest: a path one of the three forms selects. */
export function isManifest(path: string): boolean {
  return manifestForm(path) !== undefined;
}
export interface ManifestReading {
  /** Every listed path outside TEST_ROOT that a form selects, in listing order. */
  readonly selected: string[];
  /** The form that selected each. */
  readonly forms: { [path: string]: ManifestForm };
  /** The selected paths read as raw lines: all but the ROOT_NPM pair. */
  readonly raw: string[];
  /** Each raw-read path's STEM hits, `<path>:<line>: <needle>`. */
  readonly hits: string[];
}
/** A1's reading of the listed paths below a root: every selected manifest outside the test tree, read as raw lines but the root npm pair. */
export function readManifests(root: string, listed: readonly string[]): ManifestReading {
  const rootNpm: readonly string[] = ROOT_NPM;
  const forms: { [path: string]: ManifestForm } = {};
  const selected: string[] = [];
  for (const path of listed) {
    if (path.startsWith(TEST_ROOT)) continue;
    const form = manifestForm(path);
    if (form === undefined) continue;
    selected.push(path);
    forms[path] = form;
  }
  const raw = selected.filter(path => !rootNpm.includes(path));
  return { selected, forms, raw, hits: raw.flatMap(path => hitsIn(rawLines(readFileSync(join(root, path), "utf8")), path, STEM_NEEDLES)) };
}

// ---- A3: the static registration reading ----

export function extensionOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1);
  const at = name.lastIndexOf(".");
  return at === -1 ? "" : name.slice(at).toLowerCase();
}
/** Whether a file is a script module the static reading parses (by extension). */
export function isScript(path: string): boolean {
  return Object.hasOwn(SCRIPT_KINDS, extensionOf(path));
}
function scriptKind(module: string): ts.ScriptKind {
  return SCRIPT_KINDS[extensionOf(module)] ?? ts.ScriptKind.TS;
}
/** A script module's AST (parent pointers set), its script kind from its extension. */
export function parse(text: string, module: string): ts.SourceFile {
  return ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKind(module));
}
/** A regular-expression literal's pattern text, its slashes and flags dropped. */
function regexPattern(text: string): string {
  return text.slice(1, text.lastIndexOf("/"));
}
/** The text the static reading judges at a node of a JUDGED_KINDS kind, or undefined. */
export function judgedText(node: ts.Node): string | undefined {
  if (!JUDGED_KIND_SET.has(node.kind)) return undefined;
  if (ts.isRegularExpressionLiteral(node)) return regexPattern(node.text);
  if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node) || ts.isStringLiteralLike(node) || ts.isTemplateLiteralToken(node) || ts.isJsxText(node)) return node.text;
  return undefined;
}
/** A declaration node's simple name (an identifier, a private name or a string), when its kind is a DECLARATION_KINDS kind. */
function declarationName(node: ts.Node): string | undefined {
  if (!DECLARATION_KIND_SET.has(node.kind)) return undefined;
  const name = (node as ts.NamedDeclaration).name;
  return name !== undefined && (ts.isIdentifier(name) || ts.isPrivateIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined;
}
/**
 * The name a node spells when it names a DECLARATION_KINDS declaration (an identifier, a string or template literal, a private
 * name with its # dropped, or a literal inside a computed property name) or is an import or export specifier's property name.
 */
function declaredName(node: ts.Node): string | undefined {
  const text = ts.isPrivateIdentifier(node) ? node.text.slice(1) : ts.isIdentifier(node) || ts.isStringLiteralLike(node) ? node.text : undefined;
  if (text === undefined) return undefined;
  const parent = node.parent;
  if ((ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) && parent.propertyName === node) return text;
  const name = ts.isComputedPropertyName(parent) ? parent : node;
  const declaration = name.parent;
  return DECLARATION_KIND_SET.has(declaration.kind) && (declaration as ts.NamedDeclaration).name === name ? text : undefined;
}
/** The nearest named declaration enclosing a node (the declaration the node names left out), or (module). */
function ownerOf(node: ts.Node): string {
  let at: ts.Node | undefined = node.parent;
  if (at !== undefined && declarationName(at) !== undefined && (at as ts.NamedDeclaration).name === node) at = at.parent;
  for (; at !== undefined; at = at.parent) {
    const name = declarationName(at);
    if (name !== undefined) return name;
  }
  return "(module)";
}
/** A text's REGISTRATION_WORDS segments (cut at every character outside A-Z, a-z, 0-9, _ and $), one per segment, repeats kept. */
export function registrationWordsIn(text: string): string[] {
  const words: readonly string[] = REGISTRATION_WORDS;
  return text.split(/[^A-Za-z0-9_$]+/).filter(segment => words.includes(segment));
}
/**
 * A3's static reading of one file. In a script module every judged text holding a REGISTRATION_WORDS segment, one entry per
 * segment, and every REGISTER_NAME name a declaration or a specifier property spells, each `<module>#<owner>:<text>@<parent kind>`;
 * in any other file every raw line's REGISTRATION_WORDS segments, `<module>:<line>: <word>`.
 */
export function registrationTexts(text: string, module: string): string[] {
  if (!isScript(module)) return rawLines(text).flatMap(({ line, text: read }) => registrationWordsIn(read).map(word => `${module}:${line}: ${word}`));
  const file = parse(text, module);
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    const read = judgedText(node);
    if (read !== undefined) {
      const at = `${module}#${ownerOf(node)}`;
      const kind = kindName(node.parent.kind);
      const words = registrationWordsIn(read);
      const named = declaredName(node);
      if (words.length > 0) out.push(...words.map(word => `${at}:${word}@${kind}`));
      else if (named !== undefined && REGISTER_NAME.test(named)) out.push(`${at}:${named}@${kind}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return out;
}
/** A3's static reading of every listed file below a root, sorted, duplicates kept: a new, moved or removed text changes it. */
export function registrationSites(root: string, listed: readonly string[]): string[] {
  return listed.flatMap(module => registrationTexts(readFileSync(join(root, module), "utf8"), module)).sort();
}

// ---- A3: the Fiber family, the carrier and a registry's reading ----

/** Each criterion that puts a descriptor in the Fiber family, in this order. */
export type FamilyCriterion = "id" | "permission" | "contract" | "rf-contract";
/** The criteria a descriptor meets: its id, a permission, its contract folding to hold FAMILY_WORD; its contract starting with RF_CONTRACT. */
export function familyCriteria(descriptor: CapabilityDescriptor): FamilyCriterion[] {
  const contract = descriptor.contractSource ?? "";
  const criteria: FamilyCriterion[] = [];
  if (fold(descriptor.id).includes(FAMILY_WORD)) criteria.push("id");
  if (descriptor.permissions.some(permission => fold(permission).includes(FAMILY_WORD))) criteria.push("permission");
  if (fold(contract).includes(FAMILY_WORD)) criteria.push("contract");
  if (contract.startsWith(RF_CONTRACT)) criteria.push("rf-contract");
  return criteria;
}
/** A descriptor is in the Fiber family when it meets any criterion. */
export function inFiberFamily(descriptor: CapabilityDescriptor): boolean {
  return familyCriteria(descriptor).length > 0;
}
/** Whether a descriptor's contract is the rf provider's own carrier contract, byte for byte. */
export function isCarrier(descriptor: CapabilityDescriptor): boolean {
  return descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE;
}
/** Why a Fiber-family descriptor is not the read preview: a non-read effect, a mode beyond invoke, a contract without the flag. */
export function publishingReasons(descriptor: CapabilityDescriptor): string[] {
  const reasons: string[] = [];
  if (descriptor.effectClass !== "read") reasons.push(`effectClass ${descriptor.effectClass}`);
  for (const mode of descriptor.supportedModes) if (mode !== "invoke") reasons.push(`mode ${mode}`);
  if (!(descriptor.contractSource ?? "").endsWith(` ${NO_COMMIT}`)) reasons.push(`contract without ${NO_COMMIT}`);
  return reasons;
}
/** One descriptor's reading: its needles (any set, every key and string at any depth) and, in the family, its criteria and why it publishes. */
export function descriptorReading(descriptor: CapabilityDescriptor): { criteria: FamilyCriterion[]; publishing: string[]; needles: string[] } {
  const criteria = familyCriteria(descriptor);
  const needles = [...new Set(textsOf(descriptor, descriptor.id).flatMap(({ text }) => needlesIn(text, ALL_NEEDLES)))];
  return { criteria, publishing: criteria.length > 0 ? publishingReasons(descriptor) : [], needles };
}
/** A registry's descriptors, in registration order. */
export function descriptorsOf(registry: CapabilityRegistry): CapabilityDescriptor[] {
  return registry.catalogSnapshot().map(entry => entry.descriptor);
}
/** A registry's reading: every needle hit, and its Fiber family stated whole (criteria, carrier and publishing reasons per member). */
export function registryReading(registry: CapabilityRegistry): JsonValue {
  const descriptors = descriptorsOf(registry);
  return json({
    hosting: descriptors.flatMap(descriptor => descriptorReading(descriptor).needles.map(needle => `${descriptor.id}: ${needle}`)),
    family: descriptors
      .filter(inFiberFamily)
      .map(descriptor => ({
        id: descriptor.id,
        criteria: familyCriteria(descriptor),
        effectClass: descriptor.effectClass,
        supportedModes: [...descriptor.supportedModes],
        permissions: [...descriptor.permissions],
        carrier: isCarrier(descriptor),
        description: descriptor.description,
        publishing: publishingReasons(descriptor),
      })),
  });
}
