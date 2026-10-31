/**
 * wb-pyel.9 (SDK-EVIDENCE-DIRECTED-COMPUTATION-R3, program-triage-2026-10-18; the rule-19 structural exit of wb-pyel.5 under
 * orchestrator rulings R-B123 and R-B161): the static-reach readers of the render-abort census's A5 at full surface - the
 * specifier reader, the loader reader, the identifier readers, the child_process tracer, the launch-call reader and the
 * resolver they share - which wb-pyel.5's census composes when it re-cuts. Every reader reads one parsed module and nothing
 * else (no file, no process, no network). What each reader reads, clause by clause, is the CLAIMS constant of
 * test/workbench-edc-static-reach-readers-census.test.ts, each clause held to the falsifier forms that census runs.
 */
import ts from "typescript";

/** The calls that launch a process, by the name a call's callee is spelled with (child_process's members and process.execve). */
export const LAUNCH_CALLS: readonly string[] = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork", "execve"];
/** The name every child_process specifier contains (node:child_process, child_process, and any other spelling of it). */
export const CHILD_PROCESS = "child_process";
/** Globals a module can reach the network, the host's stdio or storage, or load code through without an import. */
export const IO_GLOBALS: readonly string[] = ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "BroadcastChannel", "console", "localStorage", "sessionStorage", "require", "module", "eval", "Function"];
/** The global objects: every reference to one is read, so an I/O global reached through one (aliased or computed) reads too. */
export const GLOBAL_OBJECTS: readonly string[] = ["globalThis", "global", "self", "window"];
/** The process members a render module may read; every other reference to process (a member or the object) is a host reach. */
export const PROCESS_READS: readonly string[] = ["env"];
function scriptKind(path: string): ts.ScriptKind {
  if (/\.tsx$/i.test(path)) return ts.ScriptKind.TSX;
  if (/\.jsx$/i.test(path)) return ts.ScriptKind.JSX;
  if (/\.[cm]?js$/i.test(path)) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}
/** One module's syntax tree, parsed as TypeScript with parent links (its script kind read off its extension, in any letter case). */
export function parseSource(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, scriptKind(path));
}
export function visit(node: ts.Node, each: (node: ts.Node) => void): void {
  each(node);
  ts.forEachChild(node, child => visit(child, each));
}
/** An instantiation expression (`spawn<T>`): an ExpressionWithTypeArguments outside a heritage clause - its value is its
 * expression's. */
function isInstantiation(node: ts.Node): node is ts.ExpressionWithTypeArguments {
  return ts.isExpressionWithTypeArguments(node) && !ts.isHeritageClause(node.parent);
}
type Wrapper = ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.TypeAssertion | ts.NonNullExpression | ts.ExpressionWithTypeArguments;
/** The wrappers every reader reads an expression through, by the spelling the claims name: each node's run-time value is its
 * expression's (parentheses, the type wrappers as, satisfies, <T> and !, and an instantiation expression's type arguments). */
export const WRAPPERS: Readonly<Record<string, (node: ts.Node) => node is Wrapper>> = {
  "(...)": ts.isParenthesizedExpression,
  as: ts.isAsExpression,
  satisfies: ts.isSatisfiesExpression,
  "<T>": ts.isTypeAssertionExpression,
  "!": ts.isNonNullExpression,
  "f<T>": isInstantiation,
};
function isWrapper(node: ts.Node): node is Wrapper {
  return Object.values(WRAPPERS).some(test => test(node));
}
/** An expression without its WRAPPERS. */
export function unwrap(expression: ts.Expression): ts.Expression {
  let node = expression;
  while (isWrapper(node)) node = node.expression;
  return node;
}
/** The assignments that hand their right side to their target, by spelling. */
export const BINDING_ASSIGNMENTS: Readonly<Record<string, ts.SyntaxKind>> = {
  "=": ts.SyntaxKind.EqualsToken,
  "||=": ts.SyntaxKind.BarBarEqualsToken,
  "&&=": ts.SyntaxKind.AmpersandAmpersandEqualsToken,
  "??=": ts.SyntaxKind.QuestionQuestionEqualsToken,
};
/** The logical assignments, by spelling: each reads its target, and its value is the target's old value when that is kept (||= a
 * truthy one, &&= a falsy one, ??= one that is neither null nor undefined). */
export const LOGICAL_ASSIGNMENTS: Readonly<Record<string, ts.SyntaxKind>> = {
  "||=": ts.SyntaxKind.BarBarEqualsToken,
  "&&=": ts.SyntaxKind.AmpersandAmpersandEqualsToken,
  "??=": ts.SyntaxKind.QuestionQuestionEqualsToken,
};
/** The operators whose result may be either operand, by spelling. */
export const EITHER_OPERAND: Readonly<Record<string, ts.SyntaxKind>> = {
  "??": ts.SyntaxKind.QuestionQuestionToken,
  "||": ts.SyntaxKind.BarBarToken,
  "&&": ts.SyntaxKind.AmpersandAmpersandToken,
};
function holds(vocabulary: Readonly<Record<string, ts.SyntaxKind>>, kind: ts.SyntaxKind): boolean {
  return Object.values(vocabulary).includes(kind);
}
/** A value binding of a name and the scope it binds the name in; only a const binding carries its initializer (the only kind
 * a command or specifier resolves through). Every other binding - let, var, using, a parameter, a function, a class, an
 * enum, an import-equals, a catch variable, a destructured element, an ambient const (declared with declare: its initializer
 * is not its run-time value, so it is kept as refused, which only trusting resolution reads; a declare namespace's or
 * module's body is a merged scope, where nothing resolves) - carries none. An ES import is not recorded: it binds only at module scope,
 * where valid code binds no other value of its name, so a name it binds reads as no binding (unresolved), and a type-only
 * import binds no value at all. A namespace declaration is not recorded either: valid code declares one only at module
 * scope, where a namespace holding a value leaves its name no other value and one holding only types binds no value (a
 * const of its name resolves), or in a namespace body, where no name resolves (inMergedScope). */
interface Declared {
  readonly scope: ts.Node;
  readonly initializer: ts.Expression | undefined;
  /** An ambient const's initializer: the resolver refuses it, trusting resolution (resolveTexts) reads it. */
  readonly refused: ts.Expression | undefined;
}
/** A block-scoped binding's scope: the nearest block, module, case block, for statement, static block or function. */
function blockScope(node: ts.Node): ts.Node {
  let at = node.parent;
  while (
    !(ts.isBlock(at) || ts.isSourceFile(at) || ts.isModuleBlock(at) || ts.isCaseBlock(at) || ts.isForStatement(at) || ts.isForInStatement(at) || ts.isForOfStatement(at) || ts.isClassStaticBlockDeclaration(at) || ts.isFunctionLike(at))
  ) {
    at = at.parent;
  }
  return at;
}
/** A var's scope: the nearest function, static block, namespace body or module. */
function functionScope(node: ts.Node): ts.Node {
  let at = node.parent;
  while (!(ts.isSourceFile(at) || ts.isModuleBlock(at) || ts.isFunctionLike(at) || ts.isClassStaticBlockDeclaration(at))) at = at.parent;
  return at;
}
const declaredIn = new WeakMap<ts.SourceFile, ReadonlyMap<string, readonly Declared[]>>();
/** Every value binding of one module, by name (computed once per source). */
function declarations(source: ts.SourceFile): ReadonlyMap<string, readonly Declared[]> {
  const cached = declaredIn.get(source);
  if (cached !== undefined) return cached;
  const found = new Map<string, Declared[]>();
  const declare = (name: ts.Node | undefined, scope: ts.Node, initializer?: ts.Expression, refused?: ts.Expression): void => {
    if (name === undefined) return;
    if (ts.isIdentifier(name)) {
      found.set(name.text, [...(found.get(name.text) ?? []), { scope, initializer, refused }]);
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const element of name.elements) if (ts.isBindingElement(element)) declare(element.name, scope);
    }
  };
  visit(source, node => {
    if (ts.isVariableDeclaration(node)) {
      if (ts.isCatchClause(node.parent)) {
        declare(node.name, node.parent);
      } else if (ts.isVariableDeclarationList(node.parent)) {
        const blockScoped = node.parent.flags & ts.NodeFlags.BlockScoped;
        const ambient = (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Ambient) !== 0;
        const constant = blockScoped === ts.NodeFlags.Const && ts.isIdentifier(node.name) ? node.initializer : undefined;
        declare(node.name, blockScoped === 0 ? functionScope(node.parent) : blockScope(node.parent), ambient ? undefined : constant, ambient ? constant : undefined);
      }
    } else if (ts.isParameter(node)) {
      declare(node.name, node.parent);
    } else if (ts.isFunctionDeclaration(node)) {
      // strict code (every module, and every src file under tsconfig's strict): a function declaration binds its name in
      // the block that holds it, never in an enclosing function's scope (no sloppy-script hoisting out of a block)
      declare(node.name, blockScope(node));
    } else if (ts.isFunctionExpression(node) || ts.isClassExpression(node)) {
      declare(node.name, node);
    } else if (ts.isClassDeclaration(node) || ts.isEnumDeclaration(node) || ts.isImportEqualsDeclaration(node)) {
      declare(node.name, blockScope(node));
    }
  });
  declaredIn.set(source, found);
  return found;
}
/** Whether a node sits in a namespace body (a namespace's or an ambient module's block) or in an enum declaration. TypeScript
 * merges the declarations of a namespace (an export of one is in scope in the body of every other) and of an enum (a member
 * of one is in scope in every other), and the resolver models neither merge, so no name resolves there (fail-closed). */
function inMergedScope(node: ts.Node): boolean {
  for (let at: ts.Node | undefined = node.parent; at !== undefined; at = at.parent) if (ts.isModuleBlock(at) || ts.isEnumDeclaration(at)) return true;
  return false;
}
/** The const initializers a referenced name resolves to: the nearest scope enclosing the reference that binds the name
 * decides; undefined when a binding there is not a const with an initializer, when nothing in the module binds the name (a
 * global), or when the reference sits in a merged scope (inMergedScope). Trusting resolution also reads an ambient const's
 * initializer (refused). */
function resolvedInitializers(source: ts.SourceFile, reference: ts.Identifier, trusting = false): ts.Expression[] | undefined {
  if (inMergedScope(reference)) return undefined;
  const declared = declarations(source).get(reference.text) ?? [];
  const read = (entry: Declared): ts.Expression | undefined => entry.initializer ?? (trusting ? entry.refused : undefined);
  for (let at: ts.Node = reference.parent; ; at = at.parent) {
    const here = declared.filter(entry => entry.scope === at);
    if (here.length > 0) return here.every(entry => read(entry) !== undefined) ? here.flatMap(entry => read(entry) ?? []) : undefined;
    if (ts.isSourceFile(at)) return undefined;
  }
}
/** The union of candidate lists (sorted), or undefined when there is none or any list is undefined. */
function union(lists: readonly (readonly string[] | undefined)[]): string[] | undefined {
  if (lists.length === 0 || lists.some(list => list === undefined)) return undefined;
  return [...new Set(lists.flatMap(list => list ?? []))].sort();
}
export const RESOLVE_DEPTH = 8;
/** The literal values an expression can take, read through string literals, the const binding a name resolves to in its
 * scope (resolvedInitializers), literal indexes into const array literals whose name is only read (readOnlyArray) and both
 * arms of a conditional; undefined when any part does not resolve. Trusting resolution also reads what the resolver refuses:
 * an ambient const's initializer and an index into a const array that is not only read (the launch-call reader's refusal
 * test, launchSitesAt; no reader resolves through it). */
export function resolveTexts(source: ts.SourceFile, expression: ts.Expression, depth = 0, trusting = false): string[] | undefined {
  if (depth > RESOLVE_DEPTH) return undefined;
  // every step below it is one step deeper (a conditional's arm, a name's initializer, an indexed array)
  const step = depth + 1;
  const node = unwrap(expression);
  if (ts.isStringLiteralLike(node)) return [node.text];
  if (ts.isConditionalExpression(node)) return union([resolveTexts(source, node.whenTrue, step, trusting), resolveTexts(source, node.whenFalse, step, trusting)]);
  if (ts.isIdentifier(node)) {
    const initializers = resolvedInitializers(source, node, trusting);
    return initializers === undefined ? undefined : union(initializers.map(initializer => resolveTexts(source, initializer, step, trusting)));
  }
  if (ts.isElementAccessExpression(node)) {
    const index = unwrap(node.argumentExpression);
    if (!ts.isNumericLiteral(index)) return undefined;
    const arrays = resolveArrays(source, node.expression, step, trusting);
    return arrays === undefined ? undefined : union(arrays.map(items => items[Number(index.text)]));
  }
  return undefined;
}
const readOnlyOf = new WeakMap<ts.SourceFile, Map<string, boolean>>();
/** Whether a name's const arrays can only be read. An array literal is mutable at run time, so an index into one resolves only
 * when no declaration of the name is exported (an importer may write it) and every reference to the name in the module is an
 * element read (elementRead). Name-keyed: a same-named binding of another scope counts too. */
function readOnlyArray(source: ts.SourceFile, name: string): boolean {
  const known = readOnlyOf.get(source) ?? new Map<string, boolean>();
  readOnlyOf.set(source, known);
  const cached = known.get(name);
  if (cached !== undefined) return cached;
  let only = true;
  visit(source, node => {
    if (!only) return;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name && exportedNode(node.parent.parent)) only = false;
    else if (ts.isExportSpecifier(node) && node.parent.parent.moduleSpecifier === undefined && (node.propertyName ?? node.name).text === name) only = false;
    else if (ts.isIdentifier(node) && node.text === name && !isNameSlot(node) && !inType(node)) only = elementRead(node);
  });
  known.set(name, only);
  return only;
}
/** Whether a reference reads one element (`TOOLS[0]`, through parentheses and type wrappers) and neither writes it (an
 * assignment's target, a logical assignment's included, or a destructuring, for-in/for-of or increment target), deletes it
 * nor calls it (a called element, a tagged template's tag included, runs with the array as its this). */
function elementRead(node: ts.Identifier): boolean {
  const access = node.parent;
  if (!ts.isElementAccessExpression(access) || access.expression !== node) return false;
  let value: ts.Expression = access;
  for (let wrapper = value.parent; isWrapper(wrapper) && wrapper.expression === value; wrapper = value.parent) value = wrapper;
  const parent = value.parent;
  if (isWriteTarget(value) || ts.isDeleteExpression(parent)) return false;
  if (ts.isBinaryExpression(parent) && parent.left === value && holds(LOGICAL_ASSIGNMENTS, parent.operatorToken.kind)) return false;
  if (ts.isCallExpression(parent) && parent.expression === value) return false;
  return !(ts.isTaggedTemplateExpression(parent) && parent.tag === value);
}
/** The candidate element lists of an array-valued expression: array literals without spreads, const bindings whose name is
 * only read (readOnlyArray), both arms of a conditional; undefined otherwise. */
function resolveArrays(source: ts.SourceFile, expression: ts.Expression, depth: number, trusting = false): (string[] | undefined)[][] | undefined {
  if (depth > RESOLVE_DEPTH) return undefined;
  // every step below it is one step deeper (an element, a conditional's arm, a name's initializer)
  const step = depth + 1;
  const node = unwrap(expression);
  let arms: ((string[] | undefined)[][] | undefined)[];
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.some(element => ts.isSpreadElement(element)) ? undefined : [node.elements.map(element => resolveTexts(source, element, step, trusting))];
  } else if (ts.isConditionalExpression(node)) {
    arms = [resolveArrays(source, node.whenTrue, step, trusting), resolveArrays(source, node.whenFalse, step, trusting)];
  } else if (ts.isIdentifier(node)) {
    const initializers = resolvedInitializers(source, node, trusting);
    if (initializers === undefined || (!trusting && !readOnlyArray(source, node.text))) return undefined;
    arms = initializers.map(initializer => resolveArrays(source, initializer, step, trusting));
  } else {
    return undefined;
  }
  return arms.length === 0 || arms.some(arm => arm === undefined) ? undefined : arms.flatMap(arm => arm ?? []);
}
/** The name a call's callee is spelled with: an identifier, a property name or a literal element name; undefined otherwise. */
export function calleeName(call: ts.CallExpression): string | undefined {
  const callee = unwrap(call.expression);
  if (ts.isIdentifier(callee)) return callee.text;
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text;
  if (ts.isElementAccessExpression(callee) && ts.isStringLiteralLike(callee.argumentExpression)) return callee.argumentExpression.text;
  return undefined;
}
/** The calls that load a module or a builtin by specifier besides import(): require (module.require too) and getBuiltinModule
 * by the name the callee is spelled with, and a loader factory's result (createRequire) - called directly, or through a name a
 * declaration binds it to. */
export const LOADER_CALLS: readonly string[] = ["require", "getBuiltinModule"];
export const LOADER_FACTORIES: readonly string[] = ["createRequire"];
const loaderNamesOf = new WeakMap<ts.SourceFile, ReadonlySet<string>>();
/** The names one module binds a loader factory's result to, by a variable declaration with a plain name or a binding
 * assignment (`const load = createRequire(...)`; `load = ...`, `load ||= ...`, `load &&= ...`, `load ??= ...`). */
function loaderNames(source: ts.SourceFile): ReadonlySet<string> {
  const cached = loaderNamesOf.get(source);
  if (cached !== undefined) return cached;
  const names = new Set<string>();
  const factory = (expression: ts.Expression): boolean => {
    const value = unwrap(expression);
    return ts.isCallExpression(value) && LOADER_FACTORIES.includes(calleeName(value) ?? "");
  };
  visit(source, node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && factory(node.initializer)) names.add(node.name.text);
    const assigned = ts.isBinaryExpression(node) && holds(BINDING_ASSIGNMENTS, node.operatorToken.kind) ? unwrap(node.left) : undefined;
    if (ts.isBinaryExpression(node) && assigned !== undefined && ts.isIdentifier(assigned) && factory(node.right)) names.add(assigned.text);
  });
  loaderNamesOf.set(source, names);
  return names;
}
export function isLoaderCall(node: ts.Node, source: ts.SourceFile): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) return false;
  if (node.expression.kind === ts.SyntaxKind.ImportKeyword || LOADER_CALLS.includes(calleeName(node) ?? "")) return true;
  const callee = unwrap(node.expression);
  return (ts.isCallExpression(callee) && LOADER_FACTORIES.includes(calleeName(callee) ?? "")) || (ts.isIdentifier(callee) && loaderNames(source).has(callee.text));
}
/** Every module specifier a source names: static imports and exports, import-equals, and every loader call (import(),
 * require(), getBuiltinModule(), a createRequire result) - its argument read through resolveTexts, <expression> when it does
 * not resolve. */
export function specifiers(source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
      found.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteral(node.moduleReference.expression)) {
      found.push(node.moduleReference.expression.text);
    } else if (isLoaderCall(node, source)) {
      const first = node.arguments[0];
      found.push(...((first === undefined ? undefined : resolveTexts(source, first)) ?? ["<expression>"]));
    }
  });
  return found;
}
/** Whether an identifier sits in a name slot (a declaration's, a property's, an import or export specifier's or a label's
 * name), not a value reference. */
export function isNameSlot(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent)) return parent.name === node;
  if (ts.isQualifiedName(parent)) return parent.right === node;
  if (ts.isBindingElement(parent)) return parent.name === node || parent.propertyName === node;
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isNamespaceExport(parent)) return true;
  if (ts.isLabeledStatement(parent) || ts.isBreakOrContinueStatement(parent)) return true;
  if (
    ts.isImportEqualsDeclaration(parent) ||
    ts.isVariableDeclaration(parent) ||
    ts.isFunctionDeclaration(parent) ||
    ts.isFunctionExpression(parent) ||
    ts.isClassDeclaration(parent) ||
    ts.isClassExpression(parent) ||
    ts.isParameter(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isPropertyAssignment(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isGetAccessorDeclaration(parent) ||
    ts.isSetAccessorDeclaration(parent) ||
    ts.isEnumMember(parent) ||
    ts.isEnumDeclaration(parent) ||
    ts.isTypeAliasDeclaration(parent) ||
    ts.isInterfaceDeclaration(parent) ||
    ts.isModuleDeclaration(parent) ||
    ts.isTypeParameterDeclaration(parent)
  ) {
    return parent.name === node;
  }
  return false;
}
/** Whether an ExpressionWithTypeArguments evaluates its expression at run time: a class's extends clause (a declaration's
 * or an expression's) and an instantiation expression do; an implements clause and an interface's extends clause are types
 * (TypeScript reads every ExpressionWithTypeArguments as a type node). */
function evaluatesExpression(node: ts.ExpressionWithTypeArguments): boolean {
  const clause = node.parent;
  if (!ts.isHeritageClause(clause)) return true;
  return clause.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(clause.parent) || ts.isClassExpression(clause.parent));
}
/** Whether a node sits inside a type (a type reference, a typeof query, a type argument, an implements clause, an
 * interface's extends): it reaches nothing at run time. A class's extends expression and an instantiation expression are
 * values; their type arguments stay types (each is a type node of its own, met first on the way up). */
export function inType(node: ts.Node): boolean {
  for (let at: ts.Node | undefined = node.parent; at !== undefined && !ts.isSourceFile(at); at = at.parent) {
    if (ts.isExpressionWithTypeArguments(at) && evaluatesExpression(at)) continue;
    if (ts.isTypeNode(at)) return true;
    if (ts.isStatement(at)) return false;
  }
  return false;
}
/** The member read off an object identifier (".name", "[name]" or "[<computed>]"), or "" when no member is read off it. */
export function memberRead(node: ts.Identifier): string {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.expression === node) return `.${parent.name.text}`;
  if (ts.isElementAccessExpression(parent) && parent.expression === node) {
    return ts.isStringLiteralLike(parent.argumentExpression) ? `[${parent.argumentExpression.text}]` : "[<computed>]";
  }
  return "";
}
/** A relative specifier resolved to the src module it names (.js read as its .ts source); undefined for a package. */
export interface LaunchSite {
  readonly module: string;
  readonly callee: string;
  readonly command: string;
}
/** A launch site and the position it was read at (positions dedupe the two readers; no witness carries them). */
interface Located {
  readonly at: number;
  readonly site: LaunchSite;
}
/** Calls whose callee (an identifier, a property or a literal element name) is spelled as a launch call and whose command
 * resolves (resolveTexts; candidates joined by "|"), and, its command <expression>, every such call in a merged scope
 * (inMergedScope) whose command does not resolve and every such call whose command resolves only by trusting what the
 * resolver refuses (an ambient const's initializer, an index into a const array that is not only read). Elsewhere a call
 * whose command does not resolve is not read here (R-STATIC-FORMS: regex .exec calls share the name); the child_process
 * reader reads those when they go through a binding. */
function launchSitesAt(module: string, source: ts.SourceFile): Located[] {
  const found: Located[] = [];
  visit(source, node => {
    if (!ts.isCallExpression(node)) return;
    const callee = calleeName(node);
    if (callee === undefined || !LAUNCH_CALLS.includes(callee)) return;
    const first = node.arguments[0];
    const commands = first === undefined ? undefined : resolveTexts(source, first);
    if (commands !== undefined) found.push({ at: node.getStart(source), site: { module, callee, command: commands.join("|") } });
    else if (inMergedScope(node) || (first !== undefined && resolveTexts(source, first, 0, true) !== undefined)) found.push({ at: node.getStart(source), site: { module, callee, command: "<expression>" } });
  });
  return found;
}
export function launchSites(module: string, source: ts.SourceFile): LaunchSite[] {
  return launchSitesAt(module, source).map(entry => entry.site);
}
/** A child_process value's member path below the module object: [] is the module itself (a namespace, a default import, a
 * loader's result), ["spawn"] its spawn member. */
type MemberPath = readonly string[];
/** A member path longer than this reads <reference>: a value the tracer does not follow further. */
export const PATH_DEPTH = 3;
/** The tracer's rounds over a module's references (aliases bind new names); a module still binding after them reads
 * <reference> at its start. */
export const TRACE_ROUNDS = 16;
/** A member read off a value at `path` (the default export of a builtin module is the module itself). */
function memberOf(path: MemberPath, member: string): MemberPath {
  return path.length === 0 && member === "default" ? path : [...path, member];
}
function pathLabel(path: MemberPath): string {
  return path.length === 0 ? "<module>" : path.join(".");
}
/** The member an element access names: a key that resolves to one text (resolveTexts), <computed> otherwise. */
function elementKey(source: ts.SourceFile, argument: ts.Expression): string {
  const texts = resolveTexts(source, argument);
  return texts !== undefined && texts.length === 1 ? texts[0] : "<computed>";
}
/** The member a written property name or binding key names. */
function propertyKey(source: ts.SourceFile, name: ts.PropertyName): string {
  if (ts.isComputedPropertyName(name)) return elementKey(source, name.expression);
  return ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name) ? name.text : "<computed>";
}
/** Whether an expression is written, not read: the target of an =, compound or destructuring assignment, an element of a
 * destructuring assignment's target, a for-in/for-of target or an increment's operand, each through its WRAPPERS. A logical
 * assignment's target is read (LOGICAL_ASSIGNMENTS), so it is not a write target. */
export function isWriteTarget(node: ts.Node): boolean {
  let at: ts.Node = node;
  let parent: ts.Node | undefined = node.parent;
  while (parent !== undefined) {
    if ((isWrapper(parent) && parent.expression === at) || ts.isArrayLiteralExpression(parent) || ts.isObjectLiteralExpression(parent) || ts.isSpreadAssignment(parent) || ts.isSpreadElement(parent)) {
      // a wrapped target, or the element of a literal that may itself be a destructuring target: keep climbing
    } else if (ts.isPropertyAssignment(parent)) {
      if (parent.initializer !== at) return false;
    } else if (ts.isShorthandPropertyAssignment(parent)) {
      if (parent.name !== at) return false;
    } else if (ts.isBinaryExpression(parent)) {
      const kind = parent.operatorToken.kind;
      return parent.left === at && kind >= ts.SyntaxKind.FirstAssignment && kind <= ts.SyntaxKind.LastAssignment && !holds(LOGICAL_ASSIGNMENTS, kind);
    } else if (ts.isForInStatement(parent) || ts.isForOfStatement(parent)) {
      return parent.initializer === at;
    } else if (ts.isPrefixUnaryExpression(parent) || ts.isPostfixUnaryExpression(parent)) {
      return parent.operator === ts.SyntaxKind.PlusPlusToken || parent.operator === ts.SyntaxKind.MinusMinusToken;
    } else {
      return false;
    }
    at = parent;
    parent = parent.parent;
  }
  return false;
}
function exportedNode(node: ts.Node): boolean {
  return ts.canHaveModifiers(node) && (ts.getModifiers(node)?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false);
}
/** The child_process tracer over one module (fail-closed: it never drops a value it does not follow). Entries: every import,
 * import-equals and re-export whose specifier names child_process, and every loader call (isLoaderCall) whose specifier does
 * (resolveTexts; any text containing CHILD_PROCESS). Each value derived from an entry is followed through parentheses, type
 * wrappers and await; member reads (by name, by a key that resolves, <computed> otherwise; a default read is the module
 * itself); declarations and assignments (=, ||=, &&=, ??=) to a name or to a destructuring pattern at any depth (rest
 * included); a logical assignment's name target, through the assignment's value (the target's old value when it is kept);
 * aliases (a held name assigned or declared again); and the result of ??, ||, && and a conditional's arms. A call of a launch
 * member (LAUNCH_CALLS) reads its command (resolveTexts; <expression> otherwise); a value a statement discards reads nothing;
 * an export of a held value reads <re-export>; every other use - a call of the module or of another member, an argument, a
 * return, a property store (a logical assignment's member target included), a class field, an object or array element, a
 * path deeper than PATH_DEPTH - reads <reference>. A string that names child_process outside a specifier slot (types
 * excepted) reads <untraced>. Name slots, write targets (isWriteTarget: a logical assignment's target is read) and types are
 * not references. */
function childProcessLaunchesAt(module: string, source: ts.SourceFile): Located[] {
  const found = new Map<string, Located>();
  const add = (node: ts.Node, callee: string, command: string): void => {
    const at = node.getStart(source);
    // one site per position, callee and command (a key's value is the same whichever round reads it)
    found.set(`${at}:${callee}:${command}`, { at, site: { module, callee, command } });
  };
  const bindings = new Map<string, Map<string, MemberPath>>();
  let grew = false;
  const bind = (name: string, path: MemberPath): void => {
    const paths = bindings.get(name) ?? new Map<string, MemberPath>();
    const key = JSON.stringify(path);
    if (paths.has(key)) return;
    paths.set(key, path);
    bindings.set(name, paths);
    grew = true;
  };
  const bindName = (name: ts.BindingName, path: MemberPath): void => {
    if (ts.isIdentifier(name)) {
      bind(name.text, path);
    } else if (ts.isObjectBindingPattern(name)) {
      for (const element of name.elements) {
        const key = element.propertyName !== undefined ? propertyKey(source, element.propertyName) : ts.isIdentifier(element.name) ? element.name.text : "<computed>";
        bindName(element.name, element.dotDotDotToken !== undefined ? path : memberOf(path, key));
      }
    } else {
      name.elements.forEach((element, index) => {
        if (ts.isBindingElement(element)) bindName(element.name, memberOf(path, element.dotDotDotToken !== undefined ? "[...]" : `[${index}]`));
      });
    }
  };
  const bindTarget = (target: ts.Expression, path: MemberPath): void => {
    const node = unwrap(target);
    if (ts.isIdentifier(node)) {
      bind(node.text, path);
    } else if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) bindTarget(property.initializer, memberOf(path, propertyKey(source, property.name)));
        else if (ts.isShorthandPropertyAssignment(property)) bind(property.name.text, memberOf(path, property.name.text));
        else if (ts.isSpreadAssignment(property)) bindTarget(property.expression, path);
        else add(property, pathLabel(path), "<reference>");
      }
    } else if (ts.isArrayLiteralExpression(node)) {
      node.elements.forEach((element, index) => {
        if (ts.isSpreadElement(element)) bindTarget(element.expression, memberOf(path, "[...]"));
        else if (!ts.isOmittedExpression(element)) bindTarget(element, memberOf(path, `[${index}]`));
      });
    } else if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      bindTarget(node.left, path);
    } else {
      // a property store (this.cp = ..., holder.cp = ...): the tracer does not follow the value there
      add(node, pathLabel(path), "<reference>");
    }
  };
  const consume = (value: ts.Expression, path: MemberPath): void => {
    if (path.length > PATH_DEPTH) {
      add(value, pathLabel(path), "<reference>");
      return;
    }
    // the value through its WRAPPERS and await
    let at: ts.Expression = value;
    for (let wrapper = at.parent; (isWrapper(wrapper) || ts.isAwaitExpression(wrapper)) && wrapper.expression === at; wrapper = at.parent) at = wrapper;
    const parent = at.parent;
    if (ts.isPropertyAccessExpression(parent) && parent.expression === at) {
      consume(parent, memberOf(path, parent.name.text));
    } else if (ts.isElementAccessExpression(parent) && parent.expression === at) {
      consume(parent, memberOf(path, elementKey(source, parent.argumentExpression)));
    } else if (ts.isCallExpression(parent) && parent.expression === at) {
      const member = path.length === 1 ? path[0] : undefined;
      const first = parent.arguments[0];
      if (member !== undefined && LAUNCH_CALLS.includes(member)) add(parent, member, (first === undefined ? undefined : resolveTexts(source, first))?.join("|") ?? "<expression>");
      else add(parent, pathLabel(path), "<reference>");
    } else if (ts.isVariableDeclaration(parent) && parent.initializer === at) {
      bindName(parent.name, path);
      if (exportedNode(parent.parent.parent)) add(parent, pathLabel(path), "<re-export>");
    } else if (ts.isBinaryExpression(parent) && parent.right === at && holds(BINDING_ASSIGNMENTS, parent.operatorToken.kind)) {
      bindTarget(parent.left, path);
      consume(parent, path);
    } else if (ts.isBinaryExpression(parent) && parent.left === at && holds(LOGICAL_ASSIGNMENTS, parent.operatorToken.kind) && ts.isIdentifier(unwrap(at))) {
      // a kept name target: the assignment's value may be the name's old (held) value
      consume(parent, path);
    } else if (ts.isBinaryExpression(parent) && (holds(EITHER_OPERAND, parent.operatorToken.kind) || (parent.operatorToken.kind === ts.SyntaxKind.CommaToken && parent.right === at))) {
      consume(parent, path);
    } else if (ts.isConditionalExpression(parent) && parent.condition !== at) {
      consume(parent, path);
    } else if (ts.isExportAssignment(parent)) {
      add(parent, pathLabel(path), "<re-export>");
    } else if (!(ts.isExpressionStatement(parent) || ts.isVoidExpression(parent) || (ts.isBinaryExpression(parent) && parent.operatorToken.kind === ts.SyntaxKind.CommaToken))) {
      add(at, pathLabel(path), "<reference>");
    }
  };
  const names = (expression: ts.Expression | undefined): boolean => expression !== undefined && (resolveTexts(source, expression) ?? []).some(text => text.includes(CHILD_PROCESS));
  const specifierSlot = (node: ts.Node): boolean => {
    const parent = node.parent;
    return (
      ((ts.isImportDeclaration(parent) || ts.isExportDeclaration(parent)) && parent.moduleSpecifier === node) ||
      (ts.isExternalModuleReference(parent) && parent.expression === node) ||
      (ts.isModuleDeclaration(parent) && parent.name === node) ||
      (ts.isCallExpression(parent) && parent.arguments[0] === node && isLoaderCall(parent, source))
    );
  };
  visit(source, node => {
    if (ts.isImportDeclaration(node) && names(node.moduleSpecifier) && node.importClause !== undefined && !node.importClause.isTypeOnly) {
      const clause = node.importClause;
      if (clause.name !== undefined) bind(clause.name.text, []);
      const imported = clause.namedBindings;
      if (imported !== undefined && ts.isNamespaceImport(imported)) bind(imported.name.text, []);
      if (imported !== undefined && ts.isNamedImports(imported)) {
        for (const element of imported.elements) if (!element.isTypeOnly) bind(element.name.text, memberOf([], (element.propertyName ?? element.name).text));
      }
    } else if (ts.isImportEqualsDeclaration(node) && !node.isTypeOnly && ts.isExternalModuleReference(node.moduleReference) && names(node.moduleReference.expression)) {
      bind(node.name.text, []);
      if (exportedNode(node)) add(node, "<module>", "<re-export>");
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined && names(node.moduleSpecifier)) {
      const clause = node.exportClause;
      const exported = clause !== undefined && ts.isNamedExports(clause) ? clause.elements.map(element => (element.propertyName ?? element.name).text) : ["*"];
      for (const name of exported) add(node, name, "<re-export>");
    } else if (isLoaderCall(node, source) && names(node.arguments[0])) {
      consume(node, []);
    } else if (
      (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) &&
      node.text.includes(CHILD_PROCESS) &&
      !specifierSlot(node) &&
      !inType(node)
    ) {
      add(node, "<string>", "<untraced>");
    }
  });
  for (let round = 0; ; round += 1) {
    if (round === TRACE_ROUNDS) {
      add(source, "<module>", "<reference>");
      break;
    }
    grew = false;
    visit(source, node => {
      if (!ts.isIdentifier(node) || isNameSlot(node) || inType(node) || isWriteTarget(node)) return;
      // A snapshot of the name's paths: a binding this reference adds is read in the next round, so each round deepens a
      // path by at most one step and TRACE_ROUNDS bounds the tracer whatever PATH_DEPTH is.
      for (const path of [...(bindings.get(node.text)?.values() ?? [])]) consume(node, path);
    });
    if (!grew) break;
  }
  visit(source, node => {
    if (!ts.isExportSpecifier(node) || node.parent.parent.moduleSpecifier !== undefined) return;
    const local = node.propertyName ?? node.name;
    if (!ts.isIdentifier(local)) return;
    for (const path of bindings.get(local.text)?.values() ?? []) add(node, pathLabel(path), "<re-export>");
  });
  return [...found.values()].sort((a, b) => a.at - b.at);
}
export function childProcessLaunches(module: string, source: ts.SourceFile): LaunchSite[] {
  return childProcessLaunchesAt(module, source).map(entry => entry.site);
}
/** A loader call as spelled: import(), require(), getBuiltinModule(), a createRequire result called directly or by name. */
function loaderLabel(call: ts.CallExpression): string {
  if (call.expression.kind === ts.SyntaxKind.ImportKeyword) return "import()";
  const callee = unwrap(call.expression);
  return ts.isCallExpression(callee) ? `${calleeName(callee) ?? "<call>"}()()` : `${calleeName(call) ?? "<call>"}()`;
}
/** Every loader call in one module whose specifier does not resolve (any of them could load child_process). */
export function unresolvedLoads(module: string, source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!isLoaderCall(node, source)) return;
    const first = node.arguments[0];
    if (first === undefined || resolveTexts(source, first) === undefined) found.push(`${module}:${loaderLabel(node)}`);
  });
  return found;
}
/** Every launch site both readers read in one module, one per call and callee, in the order the tracer and then the
 * launch-call reader first read it (both readers read one call and callee with the same command). */
export function launchUnion(module: string, source: ts.SourceFile): LaunchSite[] {
  const byCall = new Map<string, LaunchSite>();
  for (const entry of [...childProcessLaunchesAt(module, source), ...launchSitesAt(module, source)]) byCall.set(`${entry.at}:${entry.site.callee}`, entry.site);
  return [...byCall.values()];
}
/** References to an I/O global by name, and every reference to a global object (with the member read off it): name slots
 * and types are not references. */
export function ioGlobalReferences(module: string, source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!ts.isIdentifier(node) || isNameSlot(node) || inType(node)) return;
    if (IO_GLOBALS.includes(node.text)) found.push(`${module}:${node.text}`);
    else if (GLOBAL_OBJECTS.includes(node.text)) found.push(`${module}:${node.text}${memberRead(node)}`);
  });
  return found;
}
/** Every reference to process other than a PROCESS_READS member read: getBuiltinModule, binding, dlopen, kill, a stdio
 * write, the object aliased or passed on. */
export function processReferences(module: string, source: ts.SourceFile): string[] {
  const found: string[] = [];
  visit(source, node => {
    if (!ts.isIdentifier(node) || node.text !== "process" || isNameSlot(node) || inType(node)) return;
    const member = memberRead(node);
    if (!PROCESS_READS.some(read => member === `.${read}` || member === `[${read}]`)) found.push(`${module}:process${member}`);
  });
  return found;
}
/** Every reader's reading of one module, one line per entry in reader order: each specifier the specifier reader reads
 * (`specifier <text>`), each loader call whose specifier does not resolve (`load <label>`), each site of the tracer
 * (`tracer <callee> <command>`), of the launch-call reader (`named <callee> <command>`) and of both, one per call
 * (`union <callee> <command>`, the tracer's reading first), each I/O-global or global-object
 * reference (`io <name>`) and each process reference (`process <member>`). */
export function moduleReading(module: string, source: ts.SourceFile): string[] {
  const local = (entry: string): string => entry.slice(module.length + 1);
  return [
    ...specifiers(source).map(specifier => `specifier ${specifier}`),
    ...unresolvedLoads(module, source).map(load => `load ${local(load)}`),
    ...childProcessLaunches(module, source).map(site => `tracer ${site.callee} ${site.command}`),
    ...launchSites(module, source).map(site => `named ${site.callee} ${site.command}`),
    ...launchUnion(module, source).map(site => `union ${site.callee} ${site.command}`),
    ...ioGlobalReferences(module, source).map(reference => `io ${local(reference)}`),
    ...processReferences(module, source).map(reference => `process ${local(reference)}`),
  ];
}
/** The name a position probe spells HELD with, in the probe of each identifier reader and of the tracer. */
export const HELD_AS: Readonly<Record<"io" | "global" | "process" | "tracer", string>> = { io: "WebSocket", global: "globalThis", process: "process", tracer: "cp" };
/** The line the tracer's position probes start with: HELD, spelled cp, is a held child_process namespace. */
export const HELD_IMPORT = 'import * as cp from "node:child_process";\n';
/** One position probe (a module text naming HELD once) read by the identifier readers and the tracer, each with HELD as its
 * subject (HELD_AS): the I/O-global reader with HELD as WebSocket (`io`) and as globalThis (`global`), the process reader with
 * HELD as process (`process`), and the tracer with HELD as a namespace import of child_process (`tracer`, HELD_IMPORT first). */
export function heldReading(position: string, probe: string): string[] {
  const module = `positions/${position}.ts`;
  const held = (name: string, prefix = ""): ts.SourceFile => parseSource(module, `${prefix}${probe.replaceAll("HELD", name)}`);
  const local = (entry: string): string => entry.slice(module.length + 1);
  return [
    ...ioGlobalReferences(module, held(HELD_AS.io)).map(reference => `io ${local(reference)}`),
    ...ioGlobalReferences(module, held(HELD_AS.global)).map(reference => `global ${local(reference)}`),
    ...processReferences(module, held(HELD_AS.process)).map(reference => `process ${local(reference)}`),
    ...childProcessLaunches(module, held(HELD_AS.tracer, HELD_IMPORT)).map(site => `tracer ${site.callee} ${site.command}`),
  ];
}
