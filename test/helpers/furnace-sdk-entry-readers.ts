/**
 * wb-lrz.8 (FURNACE-FEEDBACK-RECONCILIATION-R4, program-triage-2026-10-17; the rule-19 structural-exit child of wb-lrz.4,
 * orchestrator rulings R-B104 and R-B127): the full-surface readers of wb-lrz.4's Furnace SDK re-vendor readiness census,
 * shared so that census (blocked by this bead, not on trunk) can take them in place of its own readers:
 *  - entryExposures: D3's WALK, which reads a named re-export AT an entry as well as past it (the chain-length hole closed),
 *    every exported and imported name cooked, a DEEP module identified by its stem (its TypeScript twin included), and a
 *    specifier read the way a URL parser and a file path read it (RESOLUTION);
 *  - entryTextNames: D3's ENTRY TEXT READ;
 *  - pathReading, spellsDeep and holdsDeep: D1's PATH reading (ASCII tab, LF and CR dropped);
 *  - renderedBlocks: U1's reading of vendor/README.md, a hard line break read as the line break marked renders;
 *  - registerMethods: D4's register-method count, a computed literal name read.
 * Each reader's claim is a ClaimPart below, composed from its words and the sub-forms it lists; the census
 * test/workbench-furnace-sdk-entry-readers-census.test.ts holds each claim byte-for-byte in its header and proves every listed
 * sub-form with a planted falsifier. Nothing here reads the file system: callers pass the tarball's entries, the README's
 * text and the scripts' text.
 */
import { posix } from "node:path";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";

export const SDK = "@furnace/sdk";

/** A deep @furnace/sdk/<path> load the consuming census lists (a DEEP row), with the classes it imports. */
export interface DeepRow {
  readonly specifier: string;
  readonly names: readonly string[];
}

/** A tarball's regular-file entries by path (package/...), as text. */
export type Tarball = ReadonlyMap<string, string>;

/** One claim of a reader: its text, composed from its words, and the sub-forms it lists (each a phrase of the text). */
export interface ClaimPart<T extends string = string> {
  readonly id: T;
  readonly text: string;
  readonly subforms: readonly string[];
}
function claimPart<T extends string>(id: T): (words: TemplateStringsArray, ...subforms: string[]) => ClaimPart<T> {
  return (words, ...subforms) => ({ id, text: words.reduce((text, word, index) => text + word + (subforms[index] ?? ""), ""), subforms });
}

// ---- claims ---------------------------------------------------------------------------------------------------------

/** D3's WALK: where it starts, what it follows and what it never reads. */
export const WALK_CLAIM: ClaimPart<"walk"> = claimPart(
  "walk",
)`from each entry its caller names (${"the types entry"} and ${"the main entry"} in both censuses), ${"following an export *"} and ${"following an export * as"} whose specifier resolves (RESOLUTION) to ${"a module that is not DEEP"}, and reading each module's ${"top-level statements"} through the TypeScript AST (${"comments never read"}), the WALK reads these forms in ${"the entry itself"} and in ${"every module it reaches"}`;

/** The forms the WALK reads, each an Exposure's form. */
export const WALK_FORMS: readonly ClaimPart<ExposureForm>[] = [
  claimPart("star")`an ${"export * of a DEEP module"} or an ${"export * as of a DEEP module"} (its target resolved through RESOLUTION)`,
  claimPart(
    "named",
  )`a named re-export of a DEEP class (${"export { X } from"}, ${"aliased as another name"}, ${"type-only by its declaration"} or ${"type-only by its specifier"}), X ${"an identifier"} or ${"a string export name"}, read cooked (${"an identifier escape"} or ${"a string escape"} reads as the name it spells), ${"whatever its specifier resolves to"}`,
  claimPart(
    "local-import",
  )`a local export (${"export { x }"}, or ${"aliased on export"}) of a name an import specifier binds by a DEEP class's own name, that name ${"read cooked"} (${"the import aliased"}, ${"a type-only import declaration"}, ${"a type-only import specifier"}, ${"a string import name"}, ${"from a module that is not DEEP"})`,
  claimPart("local-module")`a local export of a name a ${"default import of a DEEP module"} or a ${"namespace import of a DEEP module"} binds`,
];

/** RESOLUTION: how the WALK reads a specifier and which tarball entry it names. */
export const RESOLUTION_CLAIM: ClaimPart<"resolution"> = claimPart(
  "resolution",
)`a specifier is read through exactly these steps of a URL parser's and a file path's reading - ${"every ASCII tab dropped"}, ${"every LF dropped"} and ${"every CR dropped"}, ${"a query cut off"} (from its first ?) and ${"a fragment cut off"} (from its first #), then ${"every %XX escape decoded"} and then ${"every backslash read as /"} - and resolves when it is ${"relative"} (./ or ../, ${"joined to the naming module's directory"}) or ${"the package's own name"} (@furnace/sdk/<path>, read under package/), its ${". segments dropped"} and ${".. segments resolved"} (posix.normalize), and the tarball carries the first of its candidates ${"in order"}: from a declaration file (.d.ts, .d.mts or .d.cts), ${"an exact TypeScript path"} as written (${"an exact .ts"}, ${"an exact .tsx"}, ${"an exact .mts"} or ${"an exact .cts"}, ${"a declaration file's own path"} included); for ${"a .js path"}, its .ts, ${"then its .tsx"} and ${"then its .d.ts twin"}; for ${"a .jsx path"}, ${"the same three"}; for ${"a .mjs path"}, its .mts and ${"then its .d.mts twin"}; for ${"a .cjs path"}, its .cts and ${"then its .d.cts twin"}; for ${"an extensionless path"}, its .ts, ${"its .tsx"}, ${"its .d.ts"}, ${"its /index.ts"}, ${"its /index.tsx"} and ${"its /index.d.ts"}; and from any other module, ${"the exact path"}, ${"then its .js"} and ${"then its /index.js"}`;

/** DEEP: which tarball modules are the DEEP rows' modules. */
export const DEEP_CLAIM: ClaimPart<"deep"> = claimPart(
  "deep",
)`a tarball module is DEEP when its path, with ${"its one module extension"} taken off (${"a .d.ts"}, ${"a .d.mts"}, ${"a .d.cts"}, ${"a .ts"}, ${"a .tsx"}, ${"a .mts"}, ${"a .cts"}, ${"a .js"}, ${"a .jsx"}, ${"a .mjs"} or ${"a .cjs"}), is ${"a DEEP row's path"} with its .js taken off, so a DEEP module's JavaScript file, its declaration file and ${"its TypeScript twin"} are each that DEEP module, whose classes are ${"the row's names"}`;

/** D3's ENTRY TEXT READ. */
export const TEXT_CLAIM: ClaimPart<"text"> = claimPart(
  "text",
)`each entry's raw text is read for a DEEP class's name as a whole word (the regex \\b<name>\\b): ${"a name in its code"} and ${"a name in a comment"} alike, ${"escape sequences never decoded"}, and ${"a longer identifier holding the name"} not read`;

/** D1's PATH reading of a literal's cooked text, and what it spells or holds. */
export const PATH_CLAIM: ClaimPart<"path"> = claimPart(
  "path",
)`a literal's cooked text is read through exactly these steps - ${"every ASCII tab dropped"}, ${"every LF dropped"} and ${"every CR dropped"}, then ${"every %XX escape decoded"} and ${"every backslash read as /"}, then posix.normalize (${"empty segments dropped"}, ${". segments dropped"} and ${".. segments resolved"}) - and the text spells a deep @furnace/sdk/<path> when it or that reading ${"begins with @furnace/sdk/"} or holds ${"node_modules/@furnace/sdk/ at its start"} or ${"node_modules/@furnace/sdk/ after a /"}, and holds one when either ${"holds @furnace/sdk/ anywhere"}`;

/** U1's rendered reading of vendor/README.md. */
export const RENDER_CLAIM: ClaimPart<"render"> = claimPart(
  "render",
)`vendor/README.md is read through marked's lexer, each top-level block to its text, ${"whitespace collapsed"} (every run one space, trimmed): a hard line break (a br token, ${"a backslash before a line ending"} or ${"two or more spaces before a line ending"}) reads as the line break marked renders, a space; ${"a list"} reads by its items' tokens, ${"a table"} by its ${"header cells' tokens"} and ${"row cells' tokens"}, and a token holding tokens (${"a paragraph"}, ${"a heading"}, ${"a blockquote"}, ${"emphasis"}, ${"strong text"} or ${"a link"}) by those tokens; ${"raw HTML"} (${"an HTML block"} or ${"inline HTML"}), ${"a link-reference definition"} and ${"an image"} read as nothing`;

/** D4's register-method count. */
export const REGISTER_CLAIM: ClaimPart<"register"> = claimPart(
  "register",
)`executor.js's register methods are its method declarations, ${"in a class"} or ${"in an object literal"}, whose name reads register: ${"an identifier name"} or ${"a string-literal name"}, read cooked (${"an identifier escape"} or ${"a string escape"} reads as the name it spells), or ${"a computed name"} whose expression, ${"through parentheses"}, is ${"a computed string literal"} or ${"a computed no-substitution template literal"}`;

/** Every claim part, in the order the census header states them. */
export const CLAIM_PARTS: readonly ClaimPart[] = [WALK_CLAIM, ...WALK_FORMS, RESOLUTION_CLAIM, DEEP_CLAIM, TEXT_CLAIM, PATH_CLAIM, RENDER_CLAIM, REGISTER_CLAIM];

// ---- parsing --------------------------------------------------------------------------------------------------------

const PARSED = new Map<string, Map<string, ts.SourceFile>>();
/** A module parsed once per text, as its own extension says (TypeScript, TSX, JavaScript or JSX). */
export function parsed(path: string, text: string): ts.SourceFile {
  let byText = PARSED.get(path);
  if (byText === undefined) {
    byText = new Map();
    PARSED.set(path, byText);
  }
  const hit = byText.get(text);
  if (hit !== undefined) return hit;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, false);
  byText.set(text, source);
  return source;
}

function walk(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, (child) => {
    walk(child, visit);
  });
}

/** An expression through parentheses only. */
const parens = (node: ts.Expression): ts.Expression => (ts.isParenthesizedExpression(node) ? parens(node.expression) : node);

// ---- D3: DEEP, RESOLUTION and the WALK ------------------------------------------------------------------------------

/** One module extension at the end of a path; the declaration-file flavours are tried before the scripts. */
const MODULE_EXTENSION = /(?:\.d\.ts|\.d\.mts|\.d\.cts|\.ts|\.tsx|\.mts|\.cts|\.js|\.jsx|\.mjs|\.cjs)$/;
/** A DEEP row's module path (package/...) with its .js taken off. */
const rowStem = (row: DeepRow): string => `package/${row.specifier.slice(SDK.length + 1)}`.replace(/\.js$/, "");
/** DEEP: the classes of the DEEP row whose stem a tarball module's path is (its one module extension taken off), if any. */
export function deepModuleNames(path: string, deep: readonly DeepRow[]): readonly string[] | undefined {
  const stem = path.replace(MODULE_EXTENSION, "");
  if (stem === path) return undefined;
  return deep.find((row) => rowStem(row) === stem)?.names;
}

/** RESOLUTION's specifier reading: ASCII tab, LF and CR dropped, a query and a fragment cut off, %XX escapes decoded, backslashes read as /. */
export function specifierPath(specifier: string): string {
  const kept = specifier.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "");
  const query = kept.indexOf("?");
  const queryless = query < 0 ? kept : kept.slice(0, query);
  const fragment = queryless.indexOf("#");
  const path = fragment < 0 ? queryless : queryless.slice(0, fragment);
  return path.replace(/%([0-9A-Fa-f]{2})/g, (_, hex: string) => String.fromCharCode(Number.parseInt(hex, 16))).replaceAll("\\", "/");
}

const DECLARATION_FILE = /\.d\.[cm]?ts$/;
/** The candidates a declaration file's specifier target is tried as, in order. */
function declarationCandidates(target: string): string[] {
  const script = /\.([cm]?)(jsx?)$/.exec(target);
  if (script !== null) {
    const stem = target.slice(0, -script[0].length);
    const flavour = script[1] ?? "";
    return [`${stem}.${flavour}ts`, ...(flavour === "" ? [`${stem}.tsx`] : []), `${stem}.d.${flavour}ts`];
  }
  if (/\.[cm]?tsx?$/.test(target)) return [target];
  return [".ts", ".tsx", ".d.ts", "/index.ts", "/index.tsx", "/index.d.ts"].map((suffix) => `${target}${suffix}`);
}
/** RESOLUTION: the tarball entry a specifier names from the module `from`, if the specifier resolves inside the tarball. */
export function tarballModule(tarball: Tarball, from: string, specifier: string): string | undefined {
  const path = specifierPath(specifier);
  const own = path.startsWith(`${SDK}/`) ? `package/${path.slice(SDK.length + 1)}` : undefined;
  if (own === undefined && !path.startsWith("./") && !path.startsWith("../")) return undefined;
  const target = posix.normalize(own ?? posix.join(posix.dirname(from), path)).replace(/\/+$/, "");
  const candidates = DECLARATION_FILE.test(from) ? declarationCandidates(target) : [target, `${target}.js`, `${target}/index.js`];
  return candidates.find((candidate) => tarball.has(candidate));
}

/** The WALK forms (WALK_FORMS' ids). */
export type ExposureForm = "star" | "named" | "local-import" | "local-module";
/** One exposure the WALK reads: its form, the DEEP classes it exposes and the module chain from the entry. */
export interface Exposure {
  readonly form: ExposureForm;
  readonly names: readonly string[];
  readonly chain: readonly string[];
}
/** A module name an import binds to DEEP classes, and the form a local export of it reads as. */
interface Imported {
  readonly form: "local-import" | "local-module";
  readonly names: readonly string[];
}
/** D3's WALK (WALK_CLAIM, WALK_FORMS) from one entry (a tarball path, package/...). */
export function entryExposures(tarball: Tarball, entry: string, deep: readonly DeepRow[]): Exposure[] {
  const classes = deep.flatMap((row) => row.names);
  const exposures: Exposure[] = [];
  const seen = new Set<string>([entry]);
  const visit = (path: string, chain: readonly string[]): void => {
    const text = tarball.get(path);
    if (text === undefined) return;
    const statements = parsed(path, text).statements;
    const imported = new Map<string, Imported>();
    for (const statement of statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
      const target = tarballModule(tarball, path, statement.moduleSpecifier.text);
      const moduleNames = target === undefined ? undefined : deepModuleNames(target, deep);
      const clause = statement.importClause;
      if (clause?.name !== undefined && moduleNames !== undefined) imported.set(clause.name.text, { form: "local-module", names: moduleNames });
      const bindings = clause?.namedBindings;
      if (bindings === undefined) continue;
      if (ts.isNamespaceImport(bindings)) {
        if (moduleNames !== undefined) imported.set(bindings.name.text, { form: "local-module", names: moduleNames });
        continue;
      }
      for (const element of bindings.elements) {
        const name = (element.propertyName ?? element.name).text;
        if (classes.includes(name)) imported.set(element.name.text, { form: "local-import", names: [name] });
      }
    }
    for (const statement of statements) {
      if (!ts.isExportDeclaration(statement)) continue;
      const clause = statement.exportClause;
      if (statement.moduleSpecifier === undefined) {
        if (clause === undefined || !ts.isNamedExports(clause)) continue;
        for (const element of clause.elements) {
          const local = imported.get((element.propertyName ?? element.name).text);
          if (local !== undefined) exposures.push({ form: local.form, names: local.names, chain });
        }
        continue;
      }
      if (!ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
      if (clause !== undefined && ts.isNamedExports(clause)) {
        const named = clause.elements.map((element) => (element.propertyName ?? element.name).text).filter((name) => classes.includes(name));
        if (named.length > 0) exposures.push({ form: "named", names: named, chain });
        continue;
      }
      const target = tarballModule(tarball, path, statement.moduleSpecifier.text);
      if (target === undefined) continue;
      const names = deepModuleNames(target, deep);
      if (names !== undefined) exposures.push({ form: "star", names, chain: [...chain, target] });
      else if (!seen.has(target)) {
        seen.add(target);
        visit(target, [...chain, target]);
      }
    }
  };
  visit(entry, [entry]);
  return exposures;
}

/** D3's ENTRY TEXT READ (TEXT_CLAIM): the DEEP classes an entry's raw text names as whole words. */
export function entryTextNames(text: string, deep: readonly DeepRow[]): string[] {
  return deep.flatMap((row) => row.names).filter((name) => new RegExp(`\\b${name}\\b`).test(text));
}

// ---- D1: the PATH reading -------------------------------------------------------------------------------------------

/** D1's PATH reading (PATH_CLAIM): ASCII tab, LF and CR dropped, %XX escapes decoded, backslashes read as /, then posix.normalize. */
export function pathReading(text: string): string {
  return posix.normalize(
    text
      .replace(/\t/g, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/%([0-9A-Fa-f]{2})/g, (_, hex: string) => String.fromCharCode(Number.parseInt(hex, 16)))
      .replaceAll("\\", "/"),
  );
}
const spells = (text: string): boolean => text.startsWith(`${SDK}/`) || /(?:^|\/)node_modules\/@furnace\/sdk\//.test(text);
/** D1 (a): whether a specifier's cooked text, or its PATH reading, spells a deep @furnace/sdk/<path>. */
export const spellsDeep = (text: string): boolean => spells(text) || spells(pathReading(text));
/** D1 (e): whether a literal's cooked text, or its PATH reading, holds @furnace/sdk/ anywhere. */
export const holdsDeep = (text: string): boolean => text.includes(`${SDK}/`) || pathReading(text).includes(`${SDK}/`);

// ---- U1: the rendered reading of vendor/README.md -------------------------------------------------------------------

const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();
/** The token kinds marked renders no text for: raw HTML, link-reference definitions and images. */
const UNSHOWN: ReadonlySet<string> = new Set(["html", "def", "image"]);
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
/** U1's rendered reading (RENDER_CLAIM): each top-level block's text, a hard line break read as the line break marked renders. */
export function renderedBlocks(markdown: string): string[] {
  const shown = (token: Token): string => {
    if (token.type === "br") return "\n";
    if (UNSHOWN.has(token.type)) return "";
    if (isList(token)) return token.items.map((item) => ` ${shown(item)} `).join("");
    if (isTable(token)) return [...token.header, ...token.rows.flat()].map((cell) => ` ${cell.tokens.map(shown).join("")} `).join("");
    if ("tokens" in token && token.tokens !== undefined && token.tokens.length > 0) return token.tokens.map(shown).join("");
    return "text" in token && typeof token.text === "string" ? token.text : token.raw;
  };
  return marked.lexer(markdown).map((token) => collapse(shown(token)));
}

// ---- D4: the register-method count ----------------------------------------------------------------------------------

/** How a register method's name is spelled (REGISTER_CLAIM's name forms). */
export type RegisterName = "identifier" | "string" | "computed-string" | "computed-template";
/** The name form of a method name that reads register, if it reads register. */
function registerName(name: ts.PropertyName): RegisterName | undefined {
  if (ts.isIdentifier(name)) return name.text === "register" ? "identifier" : undefined;
  if (ts.isStringLiteral(name)) return name.text === "register" ? "string" : undefined;
  if (!ts.isComputedPropertyName(name)) return undefined;
  const key = parens(name.expression);
  if (ts.isStringLiteral(key)) return key.text === "register" ? "computed-string" : undefined;
  if (ts.isNoSubstitutionTemplateLiteral(key)) return key.text === "register" ? "computed-template" : undefined;
  return undefined;
}
/** D4's register methods (REGISTER_CLAIM): every method declaration of the module whose name reads register, with its name form. */
export function registerMethods(source: ts.SourceFile): { readonly method: ts.MethodDeclaration; readonly name: RegisterName }[] {
  const methods: { readonly method: ts.MethodDeclaration; readonly name: RegisterName }[] = [];
  walk(source, (node) => {
    if (!ts.isMethodDeclaration(node)) return;
    const name = registerName(node.name);
    if (name !== undefined) methods.push({ method: node, name });
  });
  return methods;
}
