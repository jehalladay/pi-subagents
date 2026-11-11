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
export const RF_SRC_LOAD_SUITE = "no tracked src module states an RF package specifier (docs/07 row R3, wb-x32)";
export const RF_MANIFEST_SUITE = "no manifest text names an RF package (docs/07 row R3, wb-x32)";
export const RF_TYPED_CLIENT_SUITES: readonly { readonly half: string; readonly suite: string }[] = [
  { half: "stated-cli-surface", suite: RF_STATED_SURFACE_SUITE },
  { half: "no-sdk-load", suite: RF_SRC_LOAD_SUITE },
  { half: "no-sdk-manifest", suite: RF_MANIFEST_SUITE },
];

/** How a module states a specifier. */
export type LoadForm = "import" | "export" | "import-equals" | "dynamic-import" | "require" | "import-type";
/** One package specifier a module states, in source order. */
export interface ModuleLoad {
  readonly module: string;
  readonly form: LoadForm;
  readonly specifier: string;
}

/** A string literal or a template literal with no substitution: the two argument forms whose text is fixed in the source. */
function fixedText(node: ts.Node | undefined): string | undefined {
  return node !== undefined && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : undefined;
}
/** A relative specifier names one of Pi's own modules. */
const isRelative = (specifier: string): boolean => specifier.startsWith("./") || specifier.startsWith("../");

/**
 * Every package specifier a module states, read through its TypeScript AST: an import declaration's (import type included), an
 * export declaration's, an import-equals require's, a dynamic import()'s and a require() call's first argument, and an import type
 * node's argument, each only when its text is fixed in the source. Relative specifiers are skipped.
 */
export function moduleLoads(module: string, text: string): ModuleLoad[] {
  const kind = module.endsWith(".tsx") ? ts.ScriptKind.TSX : /\.[cm]?js$/.test(module) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(module, text, ts.ScriptTarget.Latest, true, kind);
  const loads: ModuleLoad[] = [];
  const add = (form: LoadForm, specifier: string | undefined): void => {
    if (specifier !== undefined && !isRelative(specifier)) loads.push({ module, form, specifier });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) add("import", fixedText(node.moduleSpecifier));
    else if (ts.isExportDeclaration(node)) add("export", fixedText(node.moduleSpecifier));
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add("import-equals", fixedText(node.moduleReference.expression));
    else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) add("dynamic-import", fixedText(node.arguments[0]));
    else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require") add("require", fixedText(node.arguments[0]));
    else if (ts.isImportTypeNode(node) && ts.isLiteralTypeNode(node.argument)) add("import-type", fixedText(node.argument.literal));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return loads;
}

/** The loads whose specifier is an RF package text. */
export const rfLoads = (loads: readonly ModuleLoad[]): ModuleLoad[] => loads.filter(load => isRfPackageText(load.specifier));

/** The package.json fields that list dependencies by name: four name-to-spec maps and the two spellings of the bundled list. */
export const DEPENDENCY_MAPS = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"] as const;
export const BUNDLED_LISTS = ["bundledDependencies", "bundleDependencies"] as const;
/** The three manifests the reader reads: the package manifest and the two lockfiles (npm's and the vendored copy). */
export const PACKAGE_MANIFEST = "package.json";
export const LOCKFILES = ["package-lock.json", "vendor/dependency-lock.json"] as const;

/** One text a manifest states about a package, with the place it sits. */
export interface ManifestText {
  readonly where: string;
  readonly text: string;
}
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

/** A dependency-bearing record's texts: each map's names and string specs, then each bundled list's string entries. */
function dependencyTexts(record: Record<string, unknown>, at: string): ManifestText[] {
  const out: ManifestText[] = [];
  for (const field of DEPENDENCY_MAPS) {
    const map = record[field];
    if (!isObject(map)) continue;
    for (const [name, spec] of Object.entries(map)) {
      out.push({ where: `${at}${field} name`, text: name });
      if (typeof spec === "string") out.push({ where: `${at}${field} spec`, text: spec });
    }
  }
  for (const field of BUNDLED_LISTS) {
    const list = record[field];
    if (!Array.isArray(list)) continue;
    for (const entry of list) if (typeof entry === "string") out.push({ where: `${at}${field} entry`, text: entry });
  }
  return out;
}

/** package.json as npm parses it: its dependency fields' texts (DEPENDENCY_MAPS names and specs, BUNDLED_LISTS entries). */
export function packageManifestTexts(text: string): ManifestText[] {
  const parsed: unknown = JSON.parse(text);
  if (!isObject(parsed)) throw new Error(`${PACKAGE_MANIFEST} is not a JSON object`);
  return dependencyTexts(parsed, "");
}

/**
 * A lockfile as npm parses it: for every entry of its packages map, the install path (the key), the entry's name and resolved
 * fields, and the dependency fields' texts of the entry (the root entry, keyed "", included).
 */
export function lockfileTexts(text: string): ManifestText[] {
  const parsed: unknown = JSON.parse(text);
  if (!isObject(parsed) || !isObject(parsed.packages)) throw new Error("the lockfile has no packages map");
  const out: ManifestText[] = [];
  for (const [path, entry] of Object.entries(parsed.packages)) {
    const at = `packages[${JSON.stringify(path)}] `;
    out.push({ where: `${at}install path`, text: path });
    if (!isObject(entry)) continue;
    for (const field of ["name", "resolved"] as const) {
      const value = entry[field];
      if (typeof value === "string") out.push({ where: `${at}${field}`, text: value });
    }
    out.push(...dependencyTexts(entry, at));
  }
  return out;
}

/** The texts of the reading that are RF package texts, each named by its manifest and place. */
export const rfManifestHits = (manifest: string, texts: readonly ManifestText[]): string[] =>
  texts.filter(entry => isRfPackageText(entry.text)).map(entry => `${manifest}: ${entry.where}: ${entry.text}`);
