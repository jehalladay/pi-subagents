/**
 * wb-x32 (W10 ReactiveFiber provider/interop): the readers behind row R3 of the docs/07 provider-rules census
 * (test/workbench-docs07-provider-rules.census.ts), the row that binds the ReactiveFiberCLI provider sentence "Do not declare a
 * typed TS context-render client exists without code evidence." WHAT IS CLAIMED about these readers is stated case by case by
 * test/workbench-rf-typed-client-evidence.test.ts and by that census row, never here: the comments in this file describe what the
 * code does, and an input no case plants is not claimed by them.
 *
 * The RF package family: a text whose fold (NFKC, lower case, every character outside a-z and 0-9 removed) contains
 * RF_PACKAGE_FOLD. So a package of the RF npm scope, "reactivefiber" and "Reactive_Fiber" fold into it, and "react", "fiber" or "rf" do not.
 */
import ts from "typescript";

/** The fold every RF package text holds. */
export const RF_PACKAGE_FOLD = "reactivefiber";
/** NFKC, lower case, every character outside a-z and 0-9 removed. */
export const foldName = (text: string): string => text.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]/g, "");
/** True when the text's fold contains RF_PACKAGE_FOLD. */
export const isRfPackageText = (text: string): boolean => foldName(text).includes(RF_PACKAGE_FOLD);

/** The test file that registers row R3's own cases. */
export const RF_TYPED_CLIENT_FILE = "test/workbench-rf-typed-client-evidence.test.ts";
/** The describe of each R3 half whose cases that file registers, in row order; the census's R3 report anchor reads these. */
export const RF_STATED_SURFACE_SUITE = "Pi's three statements of its RF surface name the CLI JSON envelope and no typed TS client (docs/07 row R3, wb-x32)";
export const RF_SRC_LOAD_SUITE = "the specifiers moduleLoads reads in its fifteen load forms from the tracked src script modules name no RF package (docs/07 row R3, wb-x32)";
export const RF_MANIFEST_SUITE = "no key or string value of package.json or of either lockfile is an RF package text (docs/07 row R3, wb-x32)";
export const RF_TYPED_CLIENT_SUITES: readonly { readonly half: string; readonly suite: string }[] = [
  { half: "stated-cli-surface", suite: RF_STATED_SURFACE_SUITE },
  { half: "src-load-forms", suite: RF_SRC_LOAD_SUITE },
  { half: "manifest-texts", suite: RF_MANIFEST_SUITE },
];

/** The src files the module reading takes: the eight script extensions TypeScript parses (.ts .tsx .mts .cts .js .jsx .mjs .cjs). */
export const SRC_SCRIPT_MODULE = /\.(?:[cm]?[jt]s|[jt]sx)$/;

/**
 * The load forms moduleLoads reads, in the order it reads them. A module states a specifier as:
 * import - an import declaration (import type and side-effect imports included); export - an export declaration naming a module;
 * import-equals - import x = require(...); dynamic-import - import(...); require - a call of the identifier require;
 * member-require - a call of a member named require (a property, or an element with a literal key: module.require,
 * globalThis.require, self["require"]); require-resolve - a call of a member named resolve on require or on a member named
 * require; import-meta-resolve - a call of a member named resolve on import.meta; import-type - an import(...) type node;
 * ambient-module - declare module with a string name; reference-types, reference-path and amd-dependency - the three
 * triple-slash directives TypeScript's parser records with a module or path; jsdoc-import-type and jsdoc-import-tag - an
 * import(...) type and an @import tag inside a JSDoc comment the parser attaches to a node (every attached comment, not only the last).
 */
export const LOAD_FORMS = [
  "import",
  "export",
  "import-equals",
  "dynamic-import",
  "require",
  "member-require",
  "require-resolve",
  "import-meta-resolve",
  "import-type",
  "ambient-module",
  "reference-types",
  "reference-path",
  "amd-dependency",
  "jsdoc-import-type",
  "jsdoc-import-tag",
] as const;
/** How a module states a specifier. */
export type LoadForm = (typeof LOAD_FORMS)[number];
/** One package specifier a module states, in source order. */
export interface ModuleLoad {
  readonly module: string;
  readonly form: LoadForm;
  readonly specifier: string;
}

/**
 * The text a specifier names a package by: a bare specifier (one not starting ./ or ../) whole; a relative specifier, and every
 * reference path, only past its last node_modules path segment; otherwise none, the specifier naming one of Pi's own files.
 */
export function packageTextOf(specifier: string, form: LoadForm): string | undefined {
  const path = specifier.replaceAll("\\", "/");
  if (form !== "reference-path" && !path.startsWith("./") && !path.startsWith("../")) return specifier;
  const segments = path.split("/");
  const at = segments.lastIndexOf("node_modules");
  return at < 0 ? undefined : segments.slice(at + 1).join("/");
}

/** An expression read through any nesting of parentheses, as and satisfies casts, angle-bracket type assertions and non-null assertions. */
function unwrapped(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current) || ts.isNonNullExpression(current)) current = current.expression;
  return current;
}
/** An argument's literal text: a string literal or a no-substitution template literal, read through unwrapped. */
function literalText(node: ts.Expression | undefined): string | undefined {
  if (node === undefined) return undefined;
  const inner = unwrapped(node);
  return ts.isStringLiteral(inner) || ts.isNoSubstitutionTemplateLiteral(inner) ? inner.text : undefined;
}
/** The name of a member access: a property's name, or an element access's literal key. */
function memberName(node: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(node)) return node.name.text;
  if (ts.isElementAccessExpression(node)) return literalText(node.argumentExpression);
  return undefined;
}
/** The object of a member access. */
const memberObject = (node: ts.PropertyAccessExpression | ts.ElementAccessExpression): ts.Expression => unwrapped(node.expression);
/** require itself, or a member named require. */
function isRequireReference(node: ts.Expression): boolean {
  return (ts.isIdentifier(node) && node.text === "require") || ((ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) && memberName(node) === "require");
}
/** import.meta. */
const isImportMeta = (node: ts.Expression): boolean => ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword && node.name.text === "meta";

/** The load form of a call's callee (read through unwrapped), if the callee is one moduleLoads reads. */
function callForm(callee: ts.Expression): LoadForm | undefined {
  const inner = unwrapped(callee);
  if (inner.kind === ts.SyntaxKind.ImportKeyword) return "dynamic-import";
  if (ts.isIdentifier(inner)) return inner.text === "require" ? "require" : undefined;
  if (!ts.isPropertyAccessExpression(inner) && !ts.isElementAccessExpression(inner)) return undefined;
  const name = memberName(inner);
  if (name === "require") return "member-require";
  if (name !== "resolve") return undefined;
  const object = memberObject(inner);
  if (isRequireReference(object)) return "require-resolve";
  return isImportMeta(object) ? "import-meta-resolve" : undefined;
}

/** The JSDoc comments TypeScript's parser attached to a node: its whole jsDoc list (the public getJSDocCommentsAndTags keeps only the last comment's tags). */
function attachedJsDoc(node: ts.Node): ts.JSDoc[] {
  const docs: unknown = Reflect.get(node, "jsDoc");
  if (!Array.isArray(docs)) return [];
  return (docs as readonly unknown[]).filter((doc): doc is ts.JSDoc => typeof doc === "object" && doc !== null && ts.isJSDoc(doc as ts.Node));
}

/** The TypeScript script kind of a module path: TSX for .tsx, JSX for .jsx, JS for .js .mjs .cjs, TS otherwise. */
function scriptKindOf(module: string): ts.ScriptKind {
  if (module.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (module.endsWith(".jsx")) return ts.ScriptKind.JSX;
  return /\.[cm]?js$/.test(module) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
}

/**
 * Every package specifier a module states in one of the LOAD_FORMS, read through its TypeScript AST and the triple-slash
 * directives the parser records: call arguments, callees and member objects read through unwrapped, an argument only when it is a string literal
 * or a no-substitution template literal. A specifier naming one of Pi's own files (packageTextOf none) is skipped.
 */
export function moduleLoads(module: string, text: string): ModuleLoad[] {
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, scriptKindOf(module));
  const loads: ModuleLoad[] = [];
  const add = (form: LoadForm, specifier: string | undefined): void => {
    if (specifier !== undefined && packageTextOf(specifier, form) !== undefined) loads.push({ module, form, specifier });
  };
  for (const directive of source.typeReferenceDirectives) add("reference-types", directive.fileName);
  for (const directive of source.referencedFiles) add("reference-path", directive.fileName);
  for (const dependency of source.amdDependencies) add("amd-dependency", dependency.path);
  const visit = (node: ts.Node, inJsDoc: boolean): void => {
    if (ts.isImportDeclaration(node)) add("import", literalText(node.moduleSpecifier));
    else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) add("export", literalText(node.moduleSpecifier));
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add("import-equals", literalText(node.moduleReference.expression));
    else if (ts.isCallExpression(node)) {
      const form = callForm(node.expression);
      if (form !== undefined) add(form, literalText(node.arguments[0]));
    } else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) add(inJsDoc ? "jsdoc-import-type" : "import-type", literalText(node.argument.literal));
    else if (ts.isModuleDeclaration(node) && ts.isStringLiteral(node.name)) add("ambient-module", node.name.text);
    else if (ts.isJSDocImportTag(node)) add("jsdoc-import-tag", literalText(node.moduleSpecifier));
    for (const doc of attachedJsDoc(node)) visit(doc, true);
    ts.forEachChild(node, child => visit(child, inJsDoc));
  };
  visit(source, false);
  return loads;
}

/** The loads whose package text is an RF package text. */
export const rfLoads = (loads: readonly ModuleLoad[]): ModuleLoad[] => loads.filter(load => isRfPackageText(packageTextOf(load.specifier, load.form) ?? ""));

/** The three manifests the reader reads: the package manifest and the two lockfiles (npm's and the vendored copy). */
export const PACKAGE_MANIFEST = "package.json";
export const LOCKFILES = ["package-lock.json", "vendor/dependency-lock.json"] as const;

/** One text a manifest states, with the place it sits. */
export interface ManifestText {
  readonly where: string;
  readonly text: string;
}

/**
 * Every key and every string value of a JSON document, at any depth, in document order, each with its place: `<path> key` for an
 * object key and `<path> value` for a string value, <path> being the key and index chain from the root (["dependencies"]["@forge/sdk"]).
 * Numbers, booleans and null are skipped.
 */
export function jsonTexts(text: string): ManifestText[] {
  const parsed: unknown = JSON.parse(text);
  const out: ManifestText[] = [];
  const walk = (value: unknown, path: string): void => {
    if (typeof value === "string") out.push({ where: `${path} value`, text: value });
    else if (Array.isArray(value)) {
      const items: readonly unknown[] = value;
      for (let index = 0; index < items.length; index += 1) walk(items[index], `${path}[${index}]`);
    }
    else if (typeof value === "object" && value !== null) {
      for (const [key, item] of Object.entries(value)) {
        const at = `${path}[${JSON.stringify(key)}]`;
        out.push({ where: `${at} key`, text: key });
        walk(item, at);
      }
    }
  };
  walk(parsed, "");
  return out;
}

/** Every string token of a JSON text in source order, decoded: keys and values, a duplicate key JSON.parse drops and its value included. */
export function jsonStringTokens(text: string): string[] {
  JSON.parse(text);
  return (text.match(/"(?:[^"\\]|\\.)*"/g) ?? []).map(token => String(JSON.parse(token)));
}

/**
 * The RF package texts of a manifest, each named by the manifest and its place: every key and string value jsonTexts reads, then
 * every RF string token of the raw text that reading does not hold (a duplicate key JSON.parse drops, or that key's value).
 */
export function rfManifestHits(manifest: string, text: string): string[] {
  const read = jsonTexts(text).filter(entry => isRfPackageText(entry.text));
  const hits = read.map(entry => `${manifest}: ${entry.where}: ${entry.text}`);
  const unmatched = read.map(entry => entry.text);
  for (const token of jsonStringTokens(text)) {
    if (!isRfPackageText(token)) continue;
    const at = unmatched.indexOf(token);
    if (at >= 0) unmatched.splice(at, 1);
    else hits.push(`${manifest}: a string JSON.parse drops (a shadowed duplicate key or its value): ${token}`);
  }
  return hits;
}
