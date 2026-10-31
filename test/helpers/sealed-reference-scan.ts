/**
 * wb-jwc.8 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5; the rule-19 structural-exit child of wb-jwc.5, orchestrator rulings
 * R-B74 and R-B86): the SEALED reference scan, full surface, shared so a src census rides it instead of carrying a copy.
 *
 * A census that reads a const's object or array literal as written (a descriptor id, a contract, an argv word) owes
 * evidence that no reference rewrites that literal at run time; this scan judges the references it follows and no
 * others. wb-jwc.5's census carried a scan that followed a const's bare name, its imports and namespace-import members
 * only, and failed closed on every const declared in a namespace body (CLOSED CONSTS, cut #5). The gate measured what
 * it did not follow: a namespace's const rewritten through its qualified name (G-NS1), an import-equals alias (G-NS2),
 * an import of the namespace (G-NS4), a const bound to the qualified reference (G-NS6) or a namespace import of the
 * namespace's module (G-NS7) - refusal #4 - and a module-scope const rewritten through an import-equals alias rooted at
 * a namespace import (P18-IE1..3), handed to a rewriting call inside a class extends expression, which the old visit
 * read as a part of a type (P18-HER1b, P18-HER2b), and the leaf reader's analogs (P18-LEAF-IE, P18-LEAF-HER) - refusal
 * #5. This scan follows every one of those channels.
 *
 * THE CLAIM is SEALED_CLAIM, composed from SEALED_ROOT (what a sealed literal is), SEALED_VISIT (which identifiers the
 * scan visits), SEALED_FORMS (the channels a visited reference is followed through) and SEALED_USES (what a use other
 * than a read is). Each part is composed from its words: connective text and the sub-forms it names (ClaimPart.subforms,
 * each a phrase of its text), so the sub-forms a part claims are exactly the ones it lists.
 * test/workbench-sealed-reference-scan-census.test.ts holds SEALED_CLAIM (and READER_CLAIM, LITERAL_READER's words)
 * byte-for-byte in its header and names, for each listed sub-form, the planted pins that hold it: the census claims
 * exactly those pinned readings (its THE CRITERION paragraph), and a channel this scan does not follow is not claimed
 * (the census names the known ones as residuals).
 *
 * wb-jwc.8 refusal #1 (gate s149) cured here: an exported import-equals alias of a module, and an export of such an
 * alias, re-export the module (use 5); only the global Object's freeze is transparent; a default export of a name is
 * followed (form 3); a literal a const's literal spreads is nested in it; the sub-forms are listed and pinned one by one;
 * isSealed (an unpinned export) is dropped - a caller reads { rootOf, open } itself, as wb-jwc.5's census does.
 *
 * wb-jwc.8 refusal #2 (gate s157) answered here, in the enumerate-the-resolvable form R-B170 binds: SEALED_ROOT's freeze
 * clause lists as sub-forms of their own the one-argument rule and each binder kind of Object bindsObject counts (and
 * the scope rule), so each is claimed exactly as far as its census pins hold it; the scan's behaviour is unchanged.
 *
 * READER: whether a visited reference only reads is the caller's question (ScanReader): a census passes its own value
 * reader (wb-jwc.5's raw-view readString), and LITERAL_READER is the default. The scan returns the same { rootOf, open }
 * shape wb-jwc.5's sealsOf returned, plus the reaches and openings it measured (each with the channels it followed), so
 * a census swaps its own sealsOf for sealedScan(tree, reader) mechanically.
 *
 * Test-only: this module reads source text and never runs it.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, posix, relative } from "node:path";
import ts from "typescript";

/** A tree of modules; its .ts modules under src/ are what the scan reads. */
export interface ModuleTree {
  readonly module: (path: string) => ts.SourceFile | undefined;
  /** Every module of the tree: the scope of the scan. */
  readonly paths: () => readonly string[];
}

/** Parse a module the way the scan reads it (TypeScript, parent pointers set). */
export function parseModule(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function inTree(path: string): boolean {
  return path.startsWith("src/") && path.endsWith(".ts");
}

/** A planted tree: its modules by path, of which (as for src on disk) only the .ts modules under src/ are in the tree. */
export function plantedTree(modules: Readonly<Record<string, string>>): ModuleTree {
  const files = new Map(Object.entries(modules).map(([path, text]) => [path, parseModule(path, text)]));
  const paths = [...files.keys()].filter(inTree).sort();
  return { module: (path) => (inTree(path) ? files.get(path) : undefined), paths: () => paths };
}

/** A repository's src tree: every .ts module under <repo>/src, each parsed once. */
export function srcTree(repo: string): ModuleTree {
  const parsed = new Map<string, ts.SourceFile>();
  let paths: readonly string[] | undefined;
  return {
    module: (path) => {
      if (!inTree(path)) return undefined;
      const cached = parsed.get(path);
      if (cached !== undefined) return cached;
      const full = join(repo, path);
      if (!existsSync(full)) return undefined;
      const file = parseModule(path, readFileSync(full, "utf8"));
      parsed.set(path, file);
      return file;
    },
    paths: () => {
      paths ??= readdirSync(join(repo, "src"), { encoding: "utf8", recursive: true })
        .filter((path) => path.endsWith(".ts"))
        .map((path) => relative(repo, join(repo, "src", path)).split("\\").join("/"))
        .sort();
      return paths;
    },
  };
}

/** A tree carrying planted modules beside (or in place of) another tree's modules: a real src tree with a plant in it. */
export function overlayTree(base: ModuleTree, modules: Readonly<Record<string, string>>): ModuleTree {
  const planted = plantedTree(modules);
  const paths = [...new Set([...base.paths(), ...planted.paths()])].sort();
  return { module: (path) => planted.module(path) ?? base.module(path), paths: () => paths };
}

/* ---------------------------------------------------------------- syntax */

function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, (child) => visit(child, each));
}
/** A node that passes its expression through unchanged: parentheses, `as`, `satisfies`, `!` and a type assertion. */
function isWrapper(node: ts.Node | undefined): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion {
  return node !== undefined && (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node));
}
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (isWrapper(current)) current = current.expression;
  return current;
}
/** The outermost wrapper around a node (the node itself when nothing wraps it). */
function wrapped(node: ts.Node): ts.Node {
  let current = node;
  while (isWrapper(current.parent) && current.parent.expression === current) current = current.parent;
  return current;
}
function hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some((modifier) => modifier.kind === kind) ?? false);
}
/** The bound on the scan's nested resolution steps (a chain of aliases, re-exports or members); deeper is R-DEEP-CHAIN. */
export const MAX_STEPS = 32;
/** A const declaration, as wb-jwc.5's scan read one (the const flag set). */
function isConst(flags: ts.NodeFlags): boolean {
  return (flags & ts.NodeFlags.Const) === ts.NodeFlags.Const;
}

type Literal = ts.ObjectLiteralExpression | ts.ArrayLiteralExpression;

const objectBinders = new WeakMap<ts.SourceFile, boolean>();
/** Whether a module binds the name Object at any scope: a variable, a parameter, a destructured binding, a function or class declaration or expression, an enum, a namespace, a default, namespace or named import, or an import-equals alias of that name (SEALED_ROOT's binder sub-forms). */
function bindsObject(file: ts.SourceFile): boolean {
  const cached = objectBinders.get(file);
  if (cached !== undefined) return cached;
  let found = false;
  visit(file, (node) => {
    if (found || !ts.isIdentifier(node) || node.text !== "Object") return;
    const parent = node.parent;
    found =
      (ts.isVariableDeclaration(parent) ||
        ts.isParameter(parent) ||
        ts.isBindingElement(parent) ||
        ts.isFunctionDeclaration(parent) ||
        ts.isFunctionExpression(parent) ||
        ts.isClassDeclaration(parent) ||
        ts.isClassExpression(parent) ||
        ts.isEnumDeclaration(parent) ||
        ts.isModuleDeclaration(parent) ||
        ts.isImportClause(parent) ||
        ts.isNamespaceImport(parent) ||
        ts.isImportSpecifier(parent) ||
        ts.isImportEqualsDeclaration(parent)) &&
      parent.name === node;
  });
  objectBinders.set(file, found);
  return found;
}
/** Whether a call is the global Object's freeze: the callee written `Object.freeze`, exactly one argument, in a module that binds no Object of its own. */
function isGlobalFreeze(value: ts.Expression): value is ts.CallExpression {
  if (!ts.isCallExpression(value) || value.arguments.length !== 1) return false;
  const callee = value.expression;
  return ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && callee.expression.text === "Object" && callee.name.text === "freeze" && !bindsObject(value.getSourceFile());
}
/** A const initializer's own literal (SEALED_ROOT): an object or array literal, bare, behind wrappers or handed to the global Object.freeze, those nested in one another. */
export function literalOf(node: ts.Expression | undefined): Literal | undefined {
  let value = node === undefined ? undefined : unwrap(node);
  for (let step = 0; value !== undefined && step <= MAX_STEPS; step++) {
    if (ts.isObjectLiteralExpression(value) || ts.isArrayLiteralExpression(value)) return value;
    value = isGlobalFreeze(value) ? unwrap(value.arguments[0]) : undefined;
  }
  return undefined;
}
/** Map a root literal, and every object or array literal nested in it (a property's value, an array element, a member or element of a literal it spreads, at any depth, behind wrappers or Object.freeze), to that root. */
function nest(literal: Literal, root: Literal, rootOf: Map<ts.Node, ts.Node>): void {
  rootOf.set(literal, root);
  const children = ts.isObjectLiteralExpression(literal)
    ? literal.properties.flatMap((member) => (ts.isPropertyAssignment(member) ? [member.initializer] : ts.isSpreadAssignment(member) ? [member.expression] : []))
    : literal.elements.map((element) => (ts.isSpreadElement(element) ? element.expression : element));
  for (const child of children) {
    const inner = literalOf(child);
    if (inner !== undefined && !rootOf.has(inner)) nest(inner, root, rootOf);
  }
}
/** Whether a member read chain (its outermost wrapper) is written: an assignment of any operator, ++/--, delete, or a destructuring or for-in/for-of target. */
function isWritten(use: ts.Node): boolean {
  const parent = use.parent;
  if (ts.isBinaryExpression(parent) && parent.left === use && parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment) return true;
  if ((ts.isPrefixUnaryExpression(parent) || ts.isPostfixUnaryExpression(parent)) && (parent.operator === ts.SyntaxKind.PlusPlusToken || parent.operator === ts.SyntaxKind.MinusMinusToken)) return true;
  if (ts.isDeleteExpression(parent)) return true;
  if ((ts.isForOfStatement(parent) || ts.isForInStatement(parent)) && parent.initializer === use) return true;
  let pattern: ts.Node = use;
  while (
    ts.isArrayLiteralExpression(pattern.parent) ||
    ts.isObjectLiteralExpression(pattern.parent) ||
    ts.isSpreadElement(pattern.parent) ||
    ts.isSpreadAssignment(pattern.parent) ||
    ts.isParenthesizedExpression(pattern.parent) ||
    (ts.isPropertyAssignment(pattern.parent) && pattern.parent.initializer === pattern)
  ) {
    pattern = pattern.parent;
  }
  if (pattern === use) return false;
  const head = pattern.parent;
  return (ts.isBinaryExpression(head) && head.left === pattern && head.operatorToken.kind === ts.SyntaxKind.EqualsToken) || ((ts.isForOfStatement(head) || ts.isForInStatement(head)) && head.initializer === pattern);
}
/** Whether a heritage expression is a class's extends clause (evaluated at run time), not an implements clause or an interface's extends. */
function isClassExtends(node: ts.ExpressionWithTypeArguments): boolean {
  const clause = node.parent;
  return ts.isHeritageClause(clause) && clause.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(clause.parent) || ts.isClassExpression(clause.parent));
}
/** Whether an identifier sits inside a class extends expression (outside its type arguments). */
export function inClassExtends(name: ts.Identifier): boolean {
  for (let node: ts.Node | undefined = name.parent; node !== undefined && !ts.isStatement(node) && !ts.isSourceFile(node); node = node.parent) {
    if (ts.isExpressionWithTypeArguments(node)) return isClassExtends(node);
    if (ts.isTypeNode(node)) return false;
  }
  return false;
}
/**
 * Whether an identifier is a value reference (VISIT): not a part of a type (an implements clause, an interface's extends
 * clause and a class extends clause's type arguments included), a declared name, a property or member name, a part of a
 * qualified name, an import, export or import-equals name or entity, or a label. An identifier inside a class extends
 * expression, outside its type arguments, is one (HERITAGE: that expression runs when the class is defined).
 */
export function isValueReference(name: ts.Identifier): boolean {
  for (let node: ts.Node | undefined = name.parent; node !== undefined && !ts.isStatement(node) && !ts.isSourceFile(node); node = node.parent) {
    // HERITAGE (wb-jwc.8): a class's extends expression is a value; a type node below it (its type arguments) was met first.
    if (ts.isExpressionWithTypeArguments(node) && isClassExtends(node)) break;
    if (ts.isTypeNode(node)) return false;
  }
  const parent = name.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.expression === name;
  if (ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isVariableDeclaration(parent) || ts.isParameter(parent) || ts.isBindingElement(parent) || ts.isEnumMember(parent)) return parent.initializer === name;
  return !(
    ts.isQualifiedName(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isTypeParameterDeclaration(parent) ||
    ts.isImportClause(parent) ||
    ts.isNamespaceImport(parent) ||
    ts.isImportSpecifier(parent) ||
    ts.isExportSpecifier(parent) ||
    ts.isImportEqualsDeclaration(parent) ||
    ts.isNamespaceExport(parent) ||
    ts.isLabeledStatement(parent) ||
    ts.isBreakStatement(parent) ||
    ts.isContinueStatement(parent) ||
    ts.isMetaProperty(parent)
  );
}
/** A member read chain grown from an expression: the outermost property or element access whose object it is. */
function chainOf(node: ts.Expression): ts.Expression {
  const outer = wrapped(node);
  const parent = outer.parent;
  return (ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent)) && parent.expression === outer ? chainOf(parent) : node;
}
/** The src module a relative specifier names (`.js` spells the `.ts` source); undefined for packages and missing modules. */
function moduleOf(tree: ModuleTree, from: string, specifier: ts.Expression | undefined): string | undefined {
  if (specifier === undefined || !ts.isStringLiteral(specifier) || !specifier.text.startsWith(".")) return undefined;
  const base = posix.join(posix.dirname(from), specifier.text);
  const stem = base.replace(/\.(?:js|ts)$/, "");
  return [`${stem}.ts`, posix.join(base, "index.ts")].find((candidate) => tree.module(candidate) !== undefined);
}

/* ---------------------------------------------------------------- THE FORMS (what a visited reference is followed through) */

/** A channel the scan follows from a visited reference to a const literal (a form of SEALED_FORMS). */
export type Link = "name" | "import" | "export-alias" | "re-export" | "export-star" | "namespace-import" | "namespace" | "import-equals";
/** A form of the claim: a channel, or HERITAGE (where a visited reference may sit). */
export type FormId = Link | "heritage";
/** What a use other than a read is (a use of SEALED_USES). */
export type UseId = "written" | "other" | "spread" | "whole" | "export-form";

export interface ClaimPart<T extends string> {
  readonly id: T;
  readonly text: string;
  /** The sub-forms the part names, in order: each a phrase of its text (the census names the pins holding each one). */
  readonly subforms: readonly string[];
}

/** Compose a claim part from its words: each `${...}` of the template is a sub-form the part names, the rest connects them. */
function claimPart<T extends string>(id: T): (words: TemplateStringsArray, ...subforms: string[]) => ClaimPart<T> {
  return (words, ...subforms) => ({ id, text: words.reduce((text, word, index) => text + word + (subforms[index] ?? ""), ""), subforms });
}

/** THE ROOT: what a sealed literal is (literalOf and nest). */
export const SEALED_ROOT: ClaimPart<"root"> = claimPart("root")`a ${"const"}'s own ${"object literal"} or ${"array literal"}, written ${"bare"} or behind ${"parentheses"}, ${"as"}, ${"satisfies"}, ${"!"} or ${"a <T> type assertion"}, or handed as ${"its one argument"} to ${"a call written Object.freeze(...)"} (${"the global Object's freeze"} only: in a module where no ${"variable"}, ${"parameter"}, ${"destructured binding"}, ${"function declaration"}, ${"function expression"}, ${"class declaration"}, ${"class expression"}, ${"enum"}, ${"namespace"}, ${"default import"}, ${"namespace import"}, ${"named import"} or ${"import-equals alias"} is named Object, ${"at any scope"}; ${"no other callee named freeze"}), ${"those wrappers and calls nested in one another"}, and every object or array literal nested in it as ${"a property's value"}, ${"an array element"} or ${"a member or element of a literal it spreads"}, ${"at any depth"} and ${"behind those same wrappers and calls"}`;

/** THE VISIT: which identifiers the scan visits (isValueReference). */
export const SEALED_VISIT: ClaimPart<"visit"> = claimPart("visit")`The scan visits every identifier of every module of the tree that is ${"a value reference"}: not ${"a part of a type"} (${"an implements clause"}, ${"an interface's extends clause"} and ${"a class extends clause's type arguments"} included), ${"a declared name"}, ${"a property or member name"} (${"a shorthand member's name is its value, and is visited"}), ${"a part of a qualified name"}, ${"an import, export or import-equals name or entity"} (${"export default X visits X"}), ${"a meta-property's name"} or ${"a label"}.`;

/** THE FORMS, in claim order. Each is measured by the census's planted rows (its designated pin F-<form>, and SUBFORMS' pins per sub-form). */
export const SEALED_FORMS: readonly ClaimPart<FormId>[] = [
  claimPart("name")`its ${"name"} in its own module, ${"at any scope"} (a name stands for ${"every const literal"}, ${"every namespace"}, ${"every import-equals alias"} and ${"the import"} of that name the module holds)`,
  claimPart("import")`an import of it, ${"named"}, ${"aliased"} or ${"default"}`,
  claimPart("export-alias")`a local export alias (${"export { X }"}, ${"export { X as Y }"}, ${"export { X as default }"}) or ${"export default X"}`,
  claimPart("re-export")`a named re-export (${"export { X } from"}, ${"export { X as Y } from"}), ${"a chain of them"} included`,
  claimPart("export-star")`${"export * from"}, for ${"every name but default"}`,
  claimPart("namespace-import")`a member of a namespace import of its module (${"import * as M"}, or ${"import M = require of a relative module"}), read ${"by name"} or through ${"an element access whose argument reads"}`,
  claimPart("namespace")`a member of a TypeScript namespace that ${"exports it"} (${"merged"}, ${"nested"} and ${"dotted"} namespaces included, and ${"an export import member"}), read ${"by name"} or through ${"an element access whose argument reads"}, the namespace reached by ${"its name"}, ${"an import"}, ${"a local export alias"}, ${"a named re-export"}, ${"export * from"}, ${"a namespace import's member"} or ${"an import-equals alias"}`,
  claimPart("import-equals")`an import-equals alias (${"import A = E"} ${"at any scope"}, ${"export import"} included) whose entity E is followed ${"part by part"} through these forms, ${"an alias of an alias"} included`,
  claimPart("heritage")`any of these from an identifier inside ${"a class declaration's"} or ${"a class expression's"} extends expression (${"its type arguments aside"}), which runs when the class is defined and so is a value reference`,
];

/** THE USES: what opens a literal (and every literal nested in it). A reference that is none of these only reads. */
export const SEALED_USES: readonly ClaimPart<UseId>[] = [
  claimPart("written")`its member read chain (${"a property read"} or ${"an element access"}, the chain ${"behind wrappers"} or ${"through them"}) is the target of ${"="}, of ${"a compound assignment (+=, -=, *=, /=, %=, **=, <<=, >>=, >>>=, &=, |=, ^=, &&=, ||=, ??=)"}, of ${"++ or --, prefix or postfix"} or of ${"delete"}, or is ${"an element"}, ${"a rest element"}, ${"a property's value"} or ${"a rest property"} of the pattern, ${"at any depth"}, of ${"a destructuring assignment"} or of ${"a for-in or for-of head"}, or is ${"such a head itself"}`,
  claimPart("other")`it is used other than as a member read chain that ${"reads as a string"} where it is used (${"passed"}, ${"bound"}, ${"returned"}, ${"exported as default"}, placed in a literal as ${"a value"} or ${"a shorthand member"}, ${"called"}, or ${"read as anything but a string"})`,
  claimPart("spread")`it is ${"spread"} and not every value it copies reads as a string (${"a member or element that is not a string"}, or ${"an object or array it shares"})`,
  claimPart("whole")`${"a namespace"} or ${"a namespace import"} it reaches through is used other than through member reads whose names read (${"bare"}, or through ${"an element access whose argument does not read"}), which opens every literal that namespace or module reaches (${"its own const literals at any scope"}, ${"its import-equals aliases' targets"}, ${"the modules it re-exports"} and ${"what it imports"})`,
  claimPart("export-form")`a namespace import, or an import-equals alias of a module, is re-exported (${"export { M }"}, ${"export { M as N }"}, ${"export import A = M"} at ${"module scope"} or ${"namespace scope"}, ${"export { A } of such an alias"}, ${"export import M = require(...)"}), or its module is re-exported by ${"export * as"}, which opens ${"every literal the module reaches"}`,
];

function joined(parts: readonly ClaimPart<string>[]): string {
  return parts.map((part, index) => `(${index + 1}) ${part.text}`).join("; ");
}

/** THE CLAIM, byte-for-byte: the census's header holds this paragraph, and its planted rows hold each listed sub-form's pinned readings. */
export const SEALED_CLAIM = `SEALED: ${SEALED_ROOT.text}, is sealed while no reference the scan visits opens it. ${SEALED_VISIT.text} From each it follows exactly these forms to a const literal: ${joined(SEALED_FORMS)}. A reference reaching a literal opens it when ${joined(SEALED_USES)}. Any other reference only reads, as the caller's reader decides; a reference the scan does not follow is not judged, and SEALED claims nothing about it.`;

/* ---------------------------------------------------------------- resolution */

/** What a reference denotes as far as the scan follows it: a const literal, a TypeScript namespace, or a module's namespace object. */
export type Entity =
  | { readonly kind: "root"; readonly root: Literal }
  | { readonly kind: "namespace"; readonly decls: readonly ts.ModuleDeclaration[] }
  | { readonly kind: "module"; readonly path: string | undefined };
/** An entity, with the channels followed to it. */
export interface Reach {
  readonly entity: Entity;
  readonly via: readonly Link[];
}

interface ImportLink {
  readonly from: string | undefined;
  readonly name: string;
}
/** A module's bindings, by name, at any scope. */
interface FileIndex {
  readonly consts: ReadonlyMap<string, readonly Literal[]>;
  readonly imports: ReadonlyMap<string, readonly ImportLink[]>;
  readonly spaces: ReadonlyMap<string, readonly (string | undefined)[]>;
  readonly namespaces: ReadonlyMap<string, readonly ts.ModuleDeclaration[]>;
  readonly aliases: ReadonlyMap<string, readonly ts.ImportEqualsDeclaration[]>;
}
function addTo<T>(map: Map<string, T[]>, key: string, value: T): void {
  const list = map.get(key);
  if (list === undefined) map.set(key, [value]);
  else list.push(value);
}

const indexCache = new WeakMap<ModuleTree, WeakMap<ts.SourceFile, FileIndex>>();
function indexOf(tree: ModuleTree, file: ts.SourceFile): FileIndex {
  let byFile = indexCache.get(tree);
  if (byFile === undefined) {
    byFile = new WeakMap();
    indexCache.set(tree, byFile);
  }
  const cached = byFile.get(file);
  if (cached !== undefined) return cached;
  const consts = new Map<string, Literal[]>();
  const imports = new Map<string, ImportLink[]>();
  const spaces = new Map<string, (string | undefined)[]>();
  const namespaces = new Map<string, ts.ModuleDeclaration[]>();
  const aliases = new Map<string, ts.ImportEqualsDeclaration[]>();
  visit(file, (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && isConst(ts.getCombinedNodeFlags(node))) {
      const root = literalOf(node.initializer);
      if (root !== undefined) addTo(consts, node.name.text, root);
    } else if (ts.isImportDeclaration(node) && node.importClause !== undefined && !node.importClause.isTypeOnly) {
      const from = moduleOf(tree, file.fileName, node.moduleSpecifier);
      const clause = node.importClause;
      if (clause.name !== undefined) addTo(imports, clause.name.text, { from, name: "default" });
      const bindings = clause.namedBindings;
      if (bindings !== undefined && ts.isNamespaceImport(bindings)) addTo(spaces, bindings.name.text, from);
      if (bindings !== undefined && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) if (!element.isTypeOnly) addTo(imports, element.name.text, { from, name: (element.propertyName ?? element.name).text });
      }
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly) {
      if (ts.isExternalModuleReference(node.moduleReference)) addTo(spaces, node.name.text, moduleOf(tree, file.fileName, node.moduleReference.expression));
      else addTo(aliases, node.name.text, node);
    } else if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name) && (node.flags & ts.NodeFlags.GlobalAugmentation) === 0) {
      addTo(namespaces, node.name.text, node);
    }
  });
  const index: FileIndex = { consts, imports, spaces, namespaces, aliases };
  byFile.set(file, index);
  return index;
}

/** Resolution state: the tree, the module of each namespace declaration, and the step budget. */
interface Resolver {
  readonly tree: ModuleTree;
  readonly fileOf: (node: ts.Node) => ts.SourceFile;
}
function prefixed(link: Link, reaches: readonly Reach[]): Reach[] {
  return reaches.map((reach) => ({ entity: reach.entity, via: [link, ...reach.via] }));
}
/** What a name of a module denotes: its const literals, namespaces and import-equals aliases of that name (any scope), and its imports of it. */
function nameReaches(r: Resolver, file: ts.SourceFile, name: string, steps: number): Reach[] {
  if (steps > MAX_STEPS) return [];
  const index = indexOf(r.tree, file);
  const namespaces = index.namespaces.get(name) ?? [];
  return [
    ...(index.consts.get(name) ?? []).map((root): Reach => ({ entity: { kind: "root", root }, via: ["name"] })),
    ...(namespaces.length > 0 ? [{ entity: { kind: "namespace", decls: namespaces } as const, via: ["name" as const] }] : []),
    ...(index.aliases.get(name) ?? []).flatMap((alias) => prefixed("import-equals", aliasReaches(r, alias, steps + 1))),
    ...(index.imports.get(name) ?? []).flatMap((link) => prefixed("import", exportReaches(r, link.from, link.name, steps + 1))),
    ...(index.spaces.get(name) ?? []).map((path): Reach => ({ entity: { kind: "module", path }, via: ["namespace-import"] })),
  ];
}
/** What an import-equals alias's entity denotes, part by part. */
function aliasReaches(r: Resolver, alias: ts.ImportEqualsDeclaration, steps: number): Reach[] {
  const reference = alias.moduleReference;
  return ts.isExternalModuleReference(reference) ? [] : entityReaches(r, r.fileOf(alias), reference, steps + 1);
}
function entityReaches(r: Resolver, file: ts.SourceFile, entity: ts.EntityName, steps: number): Reach[] {
  if (steps > MAX_STEPS) return [];
  if (ts.isIdentifier(entity)) return nameReaches(r, file, entity.text, steps + 1);
  return memberReaches(r, entityReaches(r, file, entity.left, steps + 1), entity.right.text, steps + 1);
}
/** What a member of a namespace or of a module's namespace object denotes. A const literal has no member entities: a member read of one is a read chain. */
function memberReaches(r: Resolver, owners: readonly Reach[], name: string, steps: number): Reach[] {
  if (steps > MAX_STEPS) return [];
  return owners.flatMap((owner) => {
    const entity = owner.entity;
    if (entity.kind === "module") return exportReaches(r, entity.path, name, steps + 1).map((reach) => ({ entity: reach.entity, via: [...owner.via, ...reach.via] }));
    if (entity.kind === "namespace") return namespaceMember(r, entity.decls, name, steps + 1).map((reach) => ({ entity: reach.entity, via: [...owner.via, "namespace" as const, ...reach.via] }));
    return [];
  });
}
/** A namespace's exported member of a name: a const literal, a nested (or dotted) namespace, or an exported import-equals alias. */
function namespaceMember(r: Resolver, decls: readonly ts.ModuleDeclaration[], name: string, steps: number): Reach[] {
  const out: Reach[] = [];
  const inner: ts.ModuleDeclaration[] = [];
  for (const decl of decls) {
    const body = decl.body;
    if (body !== undefined && ts.isModuleDeclaration(body)) {
      if (ts.isIdentifier(body.name) && body.name.text === name) inner.push(body);
      continue;
    }
    if (body === undefined || !ts.isModuleBlock(body)) continue;
    for (const statement of body.statements) {
      if (!hasModifier(statement, ts.SyntaxKind.ExportKeyword)) continue;
      if (ts.isVariableStatement(statement) && isConst(statement.declarationList.flags)) {
        for (const declaration of statement.declarationList.declarations) {
          const root = ts.isIdentifier(declaration.name) && declaration.name.text === name ? literalOf(declaration.initializer) : undefined;
          if (root !== undefined) out.push({ entity: { kind: "root", root }, via: [] });
        }
      } else if (ts.isModuleDeclaration(statement) && ts.isIdentifier(statement.name) && statement.name.text === name) {
        inner.push(statement);
      } else if (ts.isImportEqualsDeclaration(statement) && statement.name.text === name) {
        out.push(...prefixed("import-equals", aliasReaches(r, statement, steps + 1)));
      }
    }
  }
  if (inner.length > 0) out.push({ entity: { kind: "namespace", decls: inner }, via: [] });
  return out;
}
/** What a module's export of a name denotes: an exported const, namespace or import-equals alias, a local export alias (export default X of a bare name included), a named re-export, export * (never for default), or export * as (the module's namespace object). */
function exportReaches(r: Resolver, path: string | undefined, name: string, steps: number): Reach[] {
  const file = path === undefined || steps > MAX_STEPS ? undefined : r.tree.module(path);
  if (file === undefined) return [];
  const out: Reach[] = [];
  for (const statement of file.statements) {
    if (ts.isVariableStatement(statement) && hasModifier(statement, ts.SyntaxKind.ExportKeyword)) {
      if (statement.declarationList.declarations.some((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === name)) out.push(...nameReaches(r, file, name, steps + 1));
    } else if ((ts.isModuleDeclaration(statement) || ts.isImportEqualsDeclaration(statement)) && hasModifier(statement, ts.SyntaxKind.ExportKeyword) && ts.isIdentifier(statement.name) && statement.name.text === name) {
      out.push(...nameReaches(r, file, name, steps + 1));
    } else if (ts.isExportDeclaration(statement) && !statement.isTypeOnly) {
      const from = statement.moduleSpecifier === undefined ? undefined : moduleOf(r.tree, file.fileName, statement.moduleSpecifier);
      if (statement.exportClause === undefined) {
        if (name !== "default" && statement.moduleSpecifier !== undefined) out.push(...prefixed("export-star", exportReaches(r, from, name, steps + 1)));
      } else if (ts.isNamespaceExport(statement.exportClause)) {
        if (statement.exportClause.name.text === name) out.push({ entity: { kind: "module", path: from }, via: ["namespace-import"] });
      } else {
        for (const element of statement.exportClause.elements) {
          if (element.isTypeOnly || element.name.text !== name) continue;
          const local = (element.propertyName ?? element.name).text;
          out.push(...(statement.moduleSpecifier === undefined ? prefixed("export-alias", nameReaches(r, file, local, steps + 1)) : prefixed("re-export", exportReaches(r, from, local, steps + 1))));
        }
      }
    } else if (ts.isExportAssignment(statement) && !statement.isExportEquals && name === "default" && ts.isIdentifier(statement.expression)) {
      out.push(...prefixed("export-alias", nameReaches(r, file, statement.expression.text, steps + 1)));
    }
  }
  return out;
}
/** Every const literal a namespace or a module's namespace object can reach (a whole use opens them all). */
function everyRoot(r: Resolver, entity: Entity, seen: Set<ts.Node | string>): Literal[] {
  if (entity.kind === "root") return [entity.root];
  if (entity.kind === "namespace") {
    const out: Literal[] = [];
    for (const decl of entity.decls) {
      if (seen.has(decl)) continue;
      seen.add(decl);
      visit(decl, (node) => {
        if (ts.isVariableDeclaration(node) && isConst(ts.getCombinedNodeFlags(node))) {
          const root = literalOf(node.initializer);
          if (root !== undefined) out.push(root);
        } else if (ts.isImportEqualsDeclaration(node)) {
          for (const reach of aliasReaches(r, node, 0)) out.push(...everyRoot(r, reach.entity, seen));
        }
      });
    }
    return out;
  }
  const path = entity.path;
  const file = path === undefined || seen.has(path) ? undefined : r.tree.module(path);
  if (path === undefined || file === undefined) return [];
  seen.add(path);
  const index = indexOf(r.tree, file);
  const out = [...index.consts.values()].flat();
  for (const statement of file.statements) {
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier !== undefined) out.push(...everyRoot(r, { kind: "module", path: moduleOf(r.tree, file.fileName, statement.moduleSpecifier) }, seen));
  }
  for (const links of index.imports.values()) for (const link of links) for (const reach of exportReaches(r, link.from, link.name, 0)) out.push(...everyRoot(r, reach.entity, seen));
  for (const froms of index.spaces.values()) for (const from of froms) out.push(...everyRoot(r, { kind: "module", path: from }, seen));
  for (const aliases of index.aliases.values()) for (const alias of aliases) for (const reach of aliasReaches(r, alias, 0)) out.push(...everyRoot(r, reach.entity, seen));
  return out;
}

/* ---------------------------------------------------------------- the reader */

/** How the scan asks whether a visited reference only reads: the caller's value reader. */
export interface ScanReader {
  /** Whether a member read chain reads as a string where it is used. */
  readonly readsString: (chain: ts.Expression, file: ts.SourceFile, tree: ModuleTree) => boolean;
  /** Whether a spread of a value copies strings only. */
  readonly copiesStrings: (value: ts.Expression, file: ts.SourceFile, tree: ModuleTree) => boolean;
  /** The name an element access's argument reads as, when it chooses a member of a namespace or a namespace import. */
  readonly readsKey: (argument: ts.Expression, file: ts.SourceFile, tree: ModuleTree) => string | undefined;
}

function resolverFor(tree: ModuleTree): Resolver {
  return { tree, fileOf: (node) => node.getSourceFile() };
}
function literalText(node: ts.Expression): string | undefined {
  const value = unwrap(node);
  return ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value) ? value.text : undefined;
}
/** A member of an object literal by key, as written: the last member of the key, when every key reads and no member is a spread, an accessor or a method. */
function literalMember(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  let found: ts.Expression | undefined;
  for (const member of object.properties) {
    if (!ts.isPropertyAssignment(member) && !ts.isShorthandPropertyAssignment(member)) return undefined;
    const key = ts.isIdentifier(member.name) || ts.isStringLiteral(member.name) ? member.name.text : ts.isComputedPropertyName(member.name) ? literalText(member.name.expression) : undefined;
    if (key === undefined) return undefined;
    if (key === name) found = ts.isPropertyAssignment(member) ? member.initializer : member.name;
  }
  return found;
}
/** The node an expression denotes, as written: a literal, or a member of a const literal reached through the scan's forms. */
function denotedValue(r: Resolver, node: ts.Expression, file: ts.SourceFile, steps: number): ts.Expression | undefined {
  if (steps > MAX_STEPS) return undefined;
  const value = unwrap(node);
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value) || ts.isObjectLiteralExpression(value) || ts.isArrayLiteralExpression(value)) return value;
  const reaches = reachesOf(r, value, file, steps + 1);
  if (reaches !== undefined) return reaches.length === 1 && reaches[0].entity.kind === "root" ? reaches[0].entity.root : undefined;
  if (!ts.isPropertyAccessExpression(value) && !ts.isElementAccessExpression(value)) return undefined;
  const name = ts.isPropertyAccessExpression(value) ? value.name.text : literalText(value.argumentExpression);
  const owner = denotedValue(r, value.expression, file, steps + 1);
  const member = name === undefined || owner === undefined || !ts.isObjectLiteralExpression(owner) ? undefined : literalMember(owner, name);
  return member === undefined ? undefined : denotedValue(r, member, file, steps + 1);
}
/** The entities a name or a member chain of namespaces denotes; undefined when the expression is a read into a literal (or no chain at all). */
function reachesOf(r: Resolver, node: ts.Expression, file: ts.SourceFile, steps: number): readonly Reach[] | undefined {
  if (steps > MAX_STEPS) return undefined;
  if (ts.isIdentifier(node)) return nameReaches(r, file, node.text, steps + 1);
  if (!ts.isPropertyAccessExpression(node) && !ts.isElementAccessExpression(node)) return undefined;
  const owners = reachesOf(r, unwrap(node.expression), file, steps + 1);
  if (owners === undefined || !owners.some((owner) => owner.entity.kind !== "root")) return undefined;
  const name = ts.isPropertyAccessExpression(node) ? node.name.text : literalText(node.argumentExpression);
  return name === undefined ? [] : memberReaches(r, owners, name, steps + 1);
}
/** LITERAL_READER's words, byte-for-byte in the census's header; each listed sub-form's readings are held by the census's READER pins. */
export const READER_CLAIM: ClaimPart<"reader"> = claimPart("reader")`a member read chain reads as a string when it denotes ${"a string literal"} or ${"a no-substitution template"} as written: ${"a member of a const literal reached through the scan's own forms"}, ${"the last member of its key"}, in a literal ${"whose keys all read"} and that holds no ${"spread"}, ${"accessor"} or ${"method"} member, ${"an element access"} choosing the member its ${"string"} or ${"no-substitution template"} literal argument names; a spread copies strings when its value is ${"such a string"}, or ${"a literal every member or element of which is one"}. Nothing else reads.`;

/** LITERAL_READER, the default reader (READER_CLAIM). */
export const LITERAL_READER: ScanReader = {
  readsString: (chain, file, tree) => {
    const value = denotedValue(resolverFor(tree), chain, file, 0);
    return value !== undefined && literalText(value) !== undefined;
  },
  copiesStrings: (value, file, tree) => {
    const r = resolverFor(tree);
    const literal = denotedValue(r, value, file, 0);
    if (literal === undefined) return false;
    if (literalText(literal) !== undefined) return true;
    const parts = ts.isObjectLiteralExpression(literal)
      ? literal.properties.map((member) => (ts.isPropertyAssignment(member) ? member.initializer : undefined))
      : ts.isArrayLiteralExpression(literal)
        ? literal.elements.map((element) => (ts.isSpreadElement(element) || ts.isOmittedExpression(element) ? undefined : element))
        : [undefined];
    return parts.every((part) => part !== undefined && literalText(denotedValue(r, part, file, 0) ?? part) !== undefined);
  },
  readsKey: (argument) => literalText(argument),
};

/* ---------------------------------------------------------------- the scan */

/** A visited reference that reached a const literal. */
export interface Reached {
  readonly root: ts.Node;
  /** The module holding the reference. */
  readonly file: string;
  /** The 1-based line of the reference. */
  readonly line: number;
  /** The channels the reference followed to the literal, in order. */
  readonly via: readonly Link[];
  /** The reference sits inside a class extends expression. */
  readonly heritage: boolean;
  /** Why it opens the literal; undefined when it only reads. */
  readonly use: UseId | undefined;
}
export interface Seals {
  /** Each const's own literal, and every literal nested in one, mapped to its root (the const's literal). */
  readonly rootOf: Map<ts.Node, ts.Node>;
  /** The roots a reference leaves open. */
  readonly open: Set<ts.Node>;
  /** Every visited reference that reached a root, in module and source order. */
  readonly reached: readonly Reached[];
}

const scanCache = new WeakMap<ModuleTree, WeakMap<ScanReader, Seals>>();
/** The SEALED scan of a tree (SEALED_CLAIM): its const literals, and every reference its modules hold to one, judged. */
export function sealedScan(tree: ModuleTree, reader: ScanReader = LITERAL_READER): Seals {
  let byReader = scanCache.get(tree);
  if (byReader === undefined) {
    byReader = new WeakMap();
    scanCache.set(tree, byReader);
  }
  const cached = byReader.get(reader);
  if (cached !== undefined) return cached;
  const r = resolverFor(tree);
  const seals: Seals = { rootOf: new Map(), open: new Set(), reached: [] };
  byReader.set(reader, seals);
  const reached = seals.reached as Reached[];
  const files = tree.paths().flatMap((path) => {
    const file = tree.module(path);
    return file === undefined ? [] : [file];
  });
  for (const file of files) {
    // Each module's const literals in source order, every literal nested in one mapped to it.
    for (const root of [...indexOf(tree, file).consts.values()].flat().sort((a, b) => a.pos - b.pos)) nest(root, root, seals.rootOf);
  }
  const record = (root: ts.Node, file: ts.SourceFile, at: ts.Node, via: readonly Link[], heritage: boolean, use: UseId | undefined): void => {
    reached.push({ root, file: file.fileName, line: file.getLineAndCharacterOfPosition(at.getStart(file)).line + 1, via, heritage, use });
    if (use !== undefined) seals.open.add(root);
  };
  /** The use a reference reaching a literal makes of it (undefined: it only reads). */
  const useOf = (reference: ts.Expression, file: ts.SourceFile): UseId | undefined => {
    const chain = chainOf(reference);
    const use = wrapped(chain);
    const parent = use.parent;
    if (isWritten(use)) return "written";
    if (ts.isSpreadElement(parent) || ts.isSpreadAssignment(parent)) return reader.copiesStrings(chain, file, tree) ? undefined : "spread";
    return reader.readsString(chain, file, tree) ? undefined : "other";
  };
  const openWhole = (owner: Reach, file: ts.SourceFile, at: ts.Node, heritage: boolean, use: UseId): void => {
    for (const root of everyRoot(r, owner.entity, new Set())) record(root, file, at, owner.via, heritage, use);
  };
  /** The module namespace objects an import-equals alias's entity denotes, with the channels followed to each. */
  const aliasModules = (alias: ts.ImportEqualsDeclaration): Reach[] => prefixed("import-equals", aliasReaches(r, alias, 0)).filter((reach) => reach.entity.kind === "module");
  for (const file of files) {
    const index = indexOf(tree, file);
    visit(file, (node) => {
      // THE EXPORT FORMS (use 5): a namespace import, or an import-equals alias of a module, re-exported, and a module
      // re-exported by export * as, open every literal the module reaches.
      if (ts.isExportDeclaration(node) && node.exportClause !== undefined && ts.isNamespaceExport(node.exportClause)) {
        openWhole({ entity: { kind: "module", path: moduleOf(tree, file.fileName, node.moduleSpecifier) }, via: ["namespace-import"] }, file, node, false, "export-form");
      }
      if (ts.isExportSpecifier(node) && node.parent.parent.moduleSpecifier === undefined) {
        const local = (node.propertyName ?? node.name).text;
        for (const path of index.spaces.get(local) ?? []) openWhole({ entity: { kind: "module", path }, via: ["namespace-import"] }, file, node, false, "export-form");
        for (const alias of index.aliases.get(local) ?? []) for (const reach of aliasModules(alias)) openWhole(reach, file, node, false, "export-form");
      }
      if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && hasModifier(node, ts.SyntaxKind.ExportKeyword)) {
        const reference = node.moduleReference;
        const modules: Reach[] = ts.isExternalModuleReference(reference) ? [{ entity: { kind: "module", path: moduleOf(tree, file.fileName, reference.expression) }, via: ["namespace-import"] }] : aliasModules(node);
        for (const reach of modules) openWhole(reach, file, node, false, "export-form");
      }
      if (!ts.isIdentifier(node) || !isValueReference(node)) return;
      const heritage = inClassExtends(node);
      let reaches: readonly Reach[] = nameReaches(r, file, node.text, 0);
      let current: ts.Expression = node;
      for (let step = 0; reaches.length > 0 && step <= MAX_STEPS; step++) {
        const roots = reaches.filter((reach) => reach.entity.kind === "root");
        if (roots.length > 0) {
          const use = useOf(current, file);
          for (const reach of roots) if (reach.entity.kind === "root") record(reach.entity.root, file, node, reach.via, heritage, use);
        }
        const owners = reaches.filter((reach) => reach.entity.kind !== "root");
        if (owners.length === 0) break;
        const outer = wrapped(current);
        const access = outer.parent;
        const member =
          ts.isPropertyAccessExpression(access) && access.expression === outer
            ? { access, name: access.name.text }
            : ts.isElementAccessExpression(access) && access.expression === outer
              ? { access, name: reader.readsKey(access.argumentExpression, file, tree) }
              : undefined;
        if (member === undefined || member.name === undefined) {
          for (const owner of owners) openWhole(owner, file, node, heritage, "whole");
          break;
        }
        reaches = memberReaches(r, owners, member.name, 0);
        current = member.access;
      }
    });
  }
  return seals;
}
