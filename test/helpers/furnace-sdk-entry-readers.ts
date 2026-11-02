/**
 * wb-lrz.9 (FURNACE-FEEDBACK-RECONCILIATION-R4; the rule-19 dependency-inversion child of wb-lrz.8, rulings R-B266 and R-B305):
 * the Furnace SDK entry readers of wb-lrz.8's FINAL cut #4 (machine/flywheel/wb-lrz.8 tip
 * 072fb965db9f4b93f66ecd1ef46187931c59cfe6, test/helpers/furnace-sdk-entry-readers.ts), moved here so that a census can hold
 * their readings (test/workbench-furnace-sdk-entry-reader-members-census.test.ts). Under R-B305 the parent wb-lrz.8 is parked
 * and waits on wb-lrz.9; its later re-cut can import these readers. Every non-blank line below this header is copied byte for
 * byte from that tip, in its order - lines 19-21, 23, 26-29, 32, 98, 100-111, 113-118, 121, 126, 128, 130-134, 137-144, 146,
 * 148-157, 159-166, 169, 171-175, 177-180, 182-237, 240-242, 247-257, 259, 261, 265, 267-269, 271-281, 286, 288-296 and
 * 298-306 - and only this header is added. Left out are the tip's own header, its doc comments, its section rules and its
 * ClaimPart type, builder and claim texts (lines 34-94): they state, or point into, wb-lrz.8's census claims, and that census
 * is not on trunk. What this module is held to is the members census's pinned probes. Nothing here reads the file system:
 * callers pass the tarball's entries, the README's text and a module's parsed source. Test-only: no src, docs or receipt is
 * read or written here.
 */
import { posix } from "node:path";
import { marked, type Token, type Tokens } from "marked";
import ts from "typescript";

export const SDK = "@furnace/sdk";

export interface DeepRow {
  readonly specifier: string;
  readonly names: readonly string[];
}

export type Tarball = ReadonlyMap<string, string>;

const PARSED = new Map<string, Map<string, ts.SourceFile>>();
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

const parens = (node: ts.Expression): ts.Expression => (ts.isParenthesizedExpression(node) ? parens(node.expression) : node);

const MODULE_EXTENSION = /(?:\.d\.ts|\.d\.mts|\.d\.cts|\.ts|\.tsx|\.mts|\.cts|\.js|\.jsx|\.mjs|\.cjs)$/;
const rowStem = (row: DeepRow): string => `package/${row.specifier.slice(SDK.length + 1)}`.replace(/\.js$/, "");
export function deepModuleNames(path: string, deep: readonly DeepRow[]): readonly string[] | undefined {
  const stem = path.replace(MODULE_EXTENSION, "");
  if (stem === path) return undefined;
  return deep.find((row) => rowStem(row) === stem)?.names;
}

export function specifierPath(specifier: string): string {
  const kept = specifier.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "");
  const query = kept.indexOf("?");
  const queryless = query < 0 ? kept : kept.slice(0, query);
  const fragment = queryless.indexOf("#");
  const path = fragment < 0 ? queryless : queryless.slice(0, fragment);
  return path.replace(/%([0-9A-Fa-f]{2})/g, (_, hex: string) => String.fromCharCode(Number.parseInt(hex, 16))).replaceAll("\\", "/");
}

const DECLARATION_FILE = /\.d\.[cm]?ts$/;
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
export function tarballModule(tarball: Tarball, from: string, specifier: string): string | undefined {
  const path = specifierPath(specifier);
  const own = path.startsWith(`${SDK}/`) ? `package/${path.slice(SDK.length + 1)}` : undefined;
  if (own === undefined && !path.startsWith("./") && !path.startsWith("../")) return undefined;
  const target = posix.normalize(own ?? posix.join(posix.dirname(from), path)).replace(/\/+$/, "");
  const candidates = DECLARATION_FILE.test(from) ? declarationCandidates(target) : [target, `${target}.js`, `${target}/index.js`];
  return candidates.find((candidate) => tarball.has(candidate));
}

export type ExposureForm = "star" | "named" | "local-import" | "local-module";
export interface Exposure {
  readonly form: ExposureForm;
  readonly names: readonly string[];
  readonly chain: readonly string[];
}
interface Imported {
  readonly form: "local-import" | "local-module";
  readonly names: readonly string[];
}
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

export function entryTextNames(text: string, deep: readonly DeepRow[]): string[] {
  return deep.flatMap((row) => row.names).filter((name) => new RegExp(`\\b${name}\\b`).test(text));
}

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
export const spellsDeep = (text: string): boolean => spells(text) || spells(pathReading(text));
export const holdsDeep = (text: string): boolean => text.includes(`${SDK}/`) || pathReading(text).includes(`${SDK}/`);

const collapse = (text: string): string => text.replace(/\s+/g, " ").trim();
const UNSHOWN: ReadonlySet<string> = new Set(["html", "def", "image"]);
const isList = (token: Token): token is Tokens.List => token.type === "list";
const isTable = (token: Token): token is Tokens.Table => token.type === "table";
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

export type RegisterName = "identifier" | "string" | "computed-string" | "computed-template";
function registerName(name: ts.PropertyName): RegisterName | undefined {
  if (ts.isIdentifier(name)) return name.text === "register" ? "identifier" : undefined;
  if (ts.isStringLiteral(name)) return name.text === "register" ? "string" : undefined;
  if (!ts.isComputedPropertyName(name)) return undefined;
  const key = parens(name.expression);
  if (ts.isStringLiteral(key)) return key.text === "register" ? "computed-string" : undefined;
  if (ts.isNoSubstitutionTemplateLiteral(key)) return key.text === "register" ? "computed-template" : undefined;
  return undefined;
}
export function registerMethods(source: ts.SourceFile): { readonly method: ts.MethodDeclaration; readonly name: RegisterName }[] {
  const methods: { readonly method: ts.MethodDeclaration; readonly name: RegisterName }[] = [];
  walk(source, (node) => {
    if (!ts.isMethodDeclaration(node)) return;
    const name = registerName(node.name);
    if (name !== undefined) methods.push({ method: node, name });
  });
  return methods;
}
