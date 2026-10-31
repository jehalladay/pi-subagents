/**
 * wb-021.8 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2, the rule-19 structural-exit child of wb-021.2; rulings R-B134 and R-B166):
 * THE GLOBAL BINDING READER of the APO snapshot census, in a helper of its own, with its tables and plants. The falsifier
 * census over it is test/workbench-apo-snapshot-global-reader-census.test.ts (its header states the pinned set it claims);
 * its roster is test/fixtures/apo-snapshot-global-reader-roster.json. One module, so the census and its roster are written
 * from the same rows. The reader is wb-021.2 cut #4's (2f053186, test/helpers/apo-snapshot-census.ts :319-510) with one
 * reading added - instantiation expressions, below - and its view-census readings (views, closures, EFFECT, PACKAGE,
 * UNRESOLVED, UNREADABLE, CONSTRUCTOR, the seams) left in wb-021.2's census, which is not on trunk; wb-021.2's eventual
 * re-cut restates its census over this reader (R-B166).
 *
 * WHAT THE READER RETURNS. judgeGlobals reads every file of a tree as one module of one TypeScript program (noLib,
 * noResolve, the checker over exactly those files) and returns one line `GLOBAL <file>:<line> <name>` per free name of each
 * module, sorted and unique. A free name is a closure identifier - a reference or a declaration's own name - that names no
 * RUN-TIME binding of its own module and is outside ADMITTED_FREE; import.meta is read as the free name import.meta (the meta
 * rule). The readings below are each held by the pins named in parentheses (rows F, R, U, NS, EN, M, I, J and Q of ROWS);
 * this header claims each reading for the forms its pins hold, and a form no pin holds is NOT CLAIMED by the census.
 *
 * FREE NAMES (row F). Every ADMITTED_FREE name read once reads quiet (V-admitted-free, which the census holds to
 * ADMITTED_FREE in order); process, fetch, Function, eval, globalThis, global and every module-wrapper name - require,
 * module, exports, __filename, __dirname, jitiImport and jitiESMResolve - each red (Z-global-process, Z-global-fetch,
 * Z-global-code, Z-global-this, Z-global-wrapper).
 * MODULE RULES (row R). A name binds only where the checker resolves it to a symbol one of whose declarations is (1) in the
 * name's own module, the same source file: a script's top-level declarations are read by TypeScript as global, so a name of
 * another module that resolves to one binds nothing (R-script-var, R-script-typed, R-script-function, R-script-require,
 * U-GP16, each red at the reading module), of a module that is (2) an ES module (ts.isExternalModule: one with an import or
 * an export; a script binds nothing, its own names included: the same pins, each red in the script) and (3) not a
 * declaration file (R-dts-module, red in the .d.ts; R-dts-script, red in the .d.ts and at the use). A free name in a second
 * module reds there (R-closure-global). THE NAMES READ: every identifier outside type positions - interfaces and type aliases
 * (R-types-erased) and type-only imports and exports (R-type-only-erased) are erased and never read, and an implements clause
 * holds only type positions (I-heritage); a property name, a qualified name's right side, a binding element's property
 * name, an import specifier's imported name, an export-from specifier, a label, new.target's name and an import
 * attribute's name are not references (R-not-references); a shorthand property reads its value (R-shorthand) and a local
 * export specifier its local name (R-export-local); a class's extends expression is a value, for a class declaration and a
 * class expression alike (R-extends), its type arguments erased (I-heritage); an enum member's initializer is read
 * (R-enum-initializer); and every name is read by nameOf (R-global-escaped). The one binding without a declaration is the
 * function's own arguments object, which the checker resolves only inside a non-arrow function, an arrow inheriting it from
 * the function around it (R-arguments: elsewhere arguments is free). The checker resolves a value use only to a declaration
 * with a value meaning, so an import or import-equals alias whose target is no value and an uninstantiated namespace are
 * passed over and a value use of each reds (R-non-value-alias); a type-only import binds nothing (R-type-only-value); an
 * ambient declaration binds nothing (R-ambient); a function declaration without a body binds nothing, an overload binding
 * through its implementation (R-bodiless); and a const enum binds nothing while a plain enum binds (R-const-enum).
 * THE BINDING ALLOWLIST AND THE WRAPPER NAMES (row U). (4) A declaration binds only when it EMITS A BINDING, by an allowlist
 * (a declaration of any other kind binds nothing): a variable and a binding element of one, a parameter of a function-like
 * with a body and a binding element of one, a function declaration with a body, a function expression's and a class
 * expression's own name, a class, a non-const enum, a namespace that binds, a value import - default, named, namespace and
 * import-equals - and a catch variable, none of them ambient (U-binds-values); member and type-parameter names - a class or
 * object-literal property, method or accessor, an enum member, a type parameter - are read and quiet (U-binds-members). Each
 * non-binding form, with its pin: an ambient declaration under a declare modifier, its own or an enclosing one's (U-GC1,
 * U-GP15, U-GC2), or inside a module declaration named by a string literal (U-string-module); a parameter of a function-like
 * without a body (U-signature-parameters); an export as namespace declaration (U-umd-export). A symbol merges every
 * same-named declaration of one scope, so a companion that emits nothing never binds the name for another: an emitting
 * declaration merged with a companion binds through itself (U-binds-merged), while an ambient or bodiless value merged with
 * an interface or a type alias binds nothing, red at its declaration and at the use - refusal #2's members U-GP1, U-GP1L
 * (the src-landable form), U-GP2, U-GP5, U-GP7 (in a second module), U-GP8, U-GP8b, U-GP10, U-GP11, U-GP12, U-GP13,
 * U-GP14 and U-GP17, the gate's killed U-GP6 (a parameter initializer resolves outside the function body; U-GC3 its control)
 * and the cut #3 seat's U-default-interface, U-ambient-let-type, U-depth-two (a third module), U-ambient-function-interface
 * and U-ambient-namespace-interface. A NAMESPACE binds when it is not ambient and holds a statement that emits a binding - a
 * variable statement, a function declaration with a body, a class, a non-const enum or a namespace that binds - a dotted one
 * only through its innermost body (U-namespace-binds; U-GJ16 in row J); every other namespace binds nothing, its own name red
 * at the declaration as well as at the use (U-namespace-unbound), and so does every merge of one with a value that emits
 * nothing (U-GP3, U-GP3b, U-GP4, U-GP4b, U-GP9, U-const-enum-companion, U-ambient-class-namespace). (5) WRAPPER NAMES: a
 * declaration at the module's top level (no function-like, class static block or namespace body encloses it; a declaration
 * in a top-level block counts) of a name in WRAPPER_NAMES - a CommonJS module wrapper's parameters exports, require, module,
 * __filename, __dirname, jitiImport and jitiESMResolve (jiti 2.7.0's wrapper, Pi's extension loader) and the wrapper's own
 * arguments - binds nothing, since under the wrapper it keeps the wrapper's value (U-wrapper-var, U-wrapper-forms), while
 * one inside a function-like, a namespace body or a class static block is a fresh binding and binds (U-wrapper-forms,
 * U-wrapper-scopes and U-GJ1 in row J).
 * NAMESPACE BLOCKS (row NS; wb-021.8's NS, refusal #3's class U1). (6) A declaration that a namespace body holds - the
 * nearest body around it - binds only a reference inside that body. The checker merges every block of a namespace, so a
 * reference in one block resolves to a member another block exports; jiti 2.7.0, Pi's extension loader, compiles each
 * block to a function of its own holding the member as its own const, and the reference, left unqualified, reads the host
 * global (the gate's readback at refusal #3; tsc's emit qualifies it, and the reader reads Pi's loader). So a reference
 * from another block reds at the use: refusal #3's members U-NS1, U-NS1L (the src-landable form), U-NS2, U-NS3bL (the
 * src-landable form, through an alias), U-NS4, U-NS5 (in a second module), U-NS6 (dotted), U-NS7 (a function member),
 * U-NS8, U-NS10 (a function merged with the namespace) and U-NS11 (the class inside a block); the refusal #3 gate's U-NS3
 * and U-NS3b (a require member, called and read through an alias); a shorthand
 * property reading an exported class and reads of an exported enum, namespace, function and import-equals alias
 * (U-NS-cross-forms); an inner namespace's second block inside one outer block (U-NS-nested-cross: the nearest body
 * counts); the reference in a block's top-level statement and in a class field initializer (W-GK1-block-statement and
 * W-GK1-class-field: refusal #4's GK1 witnesses, outside every function-like); and the gate's extra positions at refusal #4
 * - a block reading a member a LATER block declares (G4-NS-reverse-order), a class static block (G4-NS-static-block) and
 * an arrow initializer (G4-NS-decorator-free); and the seat's NS-positions, an enum member's initializer and a destructuring
 * default of the second block (outside every function-like; the seat's jiti twins read the host's process in both). A
 * reference inside the declaring body (U-NS-C2) or inside a namespace nested
 * in it (U-NS-C3) binds. An unexported member never reaches another block (U-NS-C1) and a namespace merged with an enum
 * never reaches the enum's member by its bare name (U-NS9), each red as a free name.
 * ENUM MEMBERS (row EN). (7) An enum member binds only its own name and a read after its declaration - jiti's enum transform
 * qualifies a bare member name only once it has read that member - so a read in an earlier member's initializer
 * (U-EN-forward), in an earlier declaration of the same enum (U-EN-forward-merged), inside the member's own initializer
 * (U-EN-self), inside an enum a namespace block holds (W-GK3-namespace-enum-forward: refusal #4's GK3 witness) and inside an
 * arrow an earlier initializer calls (G4-EN-forward-nested-arrow) binds nothing and reds, while a read after it binds, in
 * the same declaration (U-EN1), in a later declaration at the same top level (U-EN2) and after a member named by a string
 * literal (G4-EN-string-name-after; the seat's jiti twin reads the member, typeof 'number').
 * THE META RULE (row M; wb-021.8's META, refusal #3's class U2). No meta-property key is parsed, so import.meta itself reds,
 * as the free name import.meta, wherever a value position reads it: a write (U-META1, and U-META1L, the src-landable form
 * through a cast), an alias of the meta object, a key read and a call (U-meta-forms), a module statement and a class field
 * initializer (W-GK2-module-statement and W-GK2-class-field: refusal #4's GK2 witnesses, outside every function-like), an
 * enum member's initializer, a class static block and a parameter default (M-positions), a key read inside a handler
 * (R-not-references) and inside an instantiation expression (U-IE3, U-IE12): under Pi's jiti
 * 2.7.0 loader import.meta.env is the host's process.env (the gate's readback at refusal #3).
 * INSTANTIATION EXPRESSIONS (row I; refusal #4's class U1, folded into this bead by R-B166). An ExpressionWithTypeArguments
 * outside a heritage clause - an instantiation expression, TypeScript 4.7's f<T> - is a run-time value: tsc and Pi's jiti
 * 2.7.0 strip its type arguments and run its expression (the gate's twins at refusal #4; the seat's readbacks: TypeScript
 * 6.0.3's transpileModule emits the expression alone under CommonJS and ESNext, and a jiti 2.7.0 twin read typeof process
 * 'object' through one), so the reader reads its expression and erases its type arguments, where TypeScript 6.0.3's
 * ts.isTypeNode answers true for the node and cut #4 read nothing inside it (of the kinds ts.isTypeNode accepts in 6.0.3 -
 * the type nodes, the keyword types, ExpressionWithTypeArguments and the JSDoc types - it is the one that holds a value). Held per form: a comma expression
 * (U-IE1), a cast (U-IE2, U-IE6, U-IE8, U-IE9 and the src-landable U-IE10 and U-IE11), the meta rule's write through a cast
 * (U-IE3, and the src-landable U-IE12), a variable initializer (U-IE4, U-IE5), a second module (U-IE7), and a property
 * access, a call argument, an export default, a return and an optional chain (I-forms), and a parameter default, a class
 * field, a class static block, a class expression's extends clause, a nested instantiation and a template span
 * (I-positions), each red exactly as its control without type arguments reds (U-IE1c, U-IE2c, U-IE3c, U-IE4c, U-IE5c) and as
 * a call with type arguments reds (U-IE5d); the namespace-block rule (6) holds inside one, a cross-block reference red and a
 * same-block one bound (I-cross-block; the seat's jiti twin reads the member); its type arguments are erased, a typeof type
 * argument quiet (I-type-arguments); a class's extends clause keeps reading its expression with type arguments, and an
 * implements clause stays a type position (I-heritage).
 * JUDGE MUTANTS (row J). Refusal #3's GJ1 (the wrapper rule's scope test seeing only function declarations), GJ4 (member
 * names judged before the ambient test), GJ15 (the ambient walk stopping five nodes up) and GJ16 (a dotted namespace always
 * binding) are each killed by its witness, held byte-for-byte: U-GJ1 (quiet), U-GJ4, U-GJ15 and U-GJ16 (each red), with
 * U-wrapper-scopes (quiet) beside U-GJ1; refusal #4's GK1, GK2 and GK3 by their witnesses in rows NS, EN and M.
 * NOT CLAIMED (scope sentences): a form no pin holds is NOT CLAIMED by this census; member reads are NOT CLAIMED by this
 * census - the reader reads free names and never a member of a value, so a reach or a write through a member (a function
 * value's constructor among them) reads quiet unless a free name on its path reds (the residuals R-FIELD-MUTATION and
 * R-REFLECTIVE-REACH pin two such forms through admitted built-ins); the internals of any package and the
 * view census's other readings (wb-021.2's views, closures, EFFECT, PACKAGE, UNRESOLVED, UNREADABLE, CONSTRUCTOR and seams)
 * are NOT CLAIMED by this census; any code outside a planted tree is NOT CLAIMED by this census.
 * RESIDUALS (named, each with its pinned quiet row in row Q): R-FIELD-MUTATION (a write into an admitted built-in's fields
 * reads quiet: the reader reads the admitted name, never its members), R-REFLECTIVE-REACH (a code constructor reached by
 * reflection over an admitted built-in with a computed key reads quiet), R-UNLINKED-IMPORT (an import's own declaration
 * binds whether or not its relative target exports the name: the reader never checks a target's exports; at run time such
 * an import reads undefined under jiti and tsc's CommonJS emit and fails to link under ESM, never a host global).
 *
 * Display paths added: none. This module is test-only.
 */
import { createHash } from "node:crypto";
import { join } from "node:path";
import ts from "typescript";
import { nameOf } from "./apo-ui-publish-census.js";

export const BEAD = "wb-021.8";
/** The parent whose census this reader serves (R-B166: the parent is blocked by this bead). */
export const PARENT = "wb-021.2";
export const REQUIREMENT = "MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2";

/** The free names a module may reference: built-ins that hold no capability, journal or native route. */
export const ADMITTED_FREE: readonly string[] = [
  "Array",
  "Boolean",
  "Date",
  "Error",
  "Infinity",
  "Int32Array",
  "Intl",
  "JSON",
  "Map",
  "Math",
  "NaN",
  "Number",
  "Object",
  "Promise",
  "RangeError",
  "RegExp",
  "Set",
  "String",
  "Symbol",
  "TypeError",
  "Uint8Array",
  "WeakMap",
  "WeakSet",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "undefined",
];

/** An identifier that names a property, a label or a meta-property rather than a binding: never a free-name reference. */
function isPropertyName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isQualifiedName(parent) && parent.right === node) ||
    (ts.isBindingElement(parent) && parent.propertyName === node) ||
    (ts.isImportSpecifier(parent) && parent.propertyName === node) ||
    (ts.isLabeledStatement(parent) && parent.label === node) ||
    (ts.isBreakOrContinueStatement(parent) && parent.label === node) ||
    (ts.isMetaProperty(parent) && parent.name === node) ||
    (ts.isImportAttribute(parent) && parent.name === node)
  );
}

/** A declaration in an ambient context: under a declare modifier, its own or an enclosing node's, or inside a module declaration named by a string literal (an ambient module, declare or not: TypeScript emits no binding of its own for one). */
function isAmbient(declaration: ts.Node): boolean {
  for (let current: ts.Node | undefined = declaration; current !== undefined; current = current.parent) {
    if (ts.canHaveModifiers(current) && (ts.getModifiers(current) ?? []).some(modifier => modifier.kind === ts.SyntaxKind.DeclareKeyword)) return true;
    if (ts.isModuleDeclaration(current) && ts.isStringLiteral(current.name)) return true;
  }
  return false;
}

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean => ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some(modifier => modifier.kind === kind);

/**
 * The names a CommonJS module wrapper hands its module - jiti 2.7.0's wrapper parameters (exports, require, module,
 * __filename, __dirname, jitiImport, jitiESMResolve; Node's own wrapper hands the first five) - and the wrapper's own
 * arguments object. A module-scope declaration of one binds nothing (see the module header: GLOBAL (5)).
 */
export const WRAPPER_NAMES: readonly string[] = ["exports", "require", "module", "__filename", "__dirname", "jitiImport", "jitiESMResolve", "arguments"];

/** The declaration kinds that emit a run-time binding of their name, when not ambient (see the module header: GLOBAL (4)); a function declaration, an enum, a namespace, a parameter and a binding element are judged by their own rules. */
const VALUE_BINDINGS: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ClassDeclaration,
  ts.SyntaxKind.ClassExpression,
  ts.SyntaxKind.ImportClause,
  ts.SyntaxKind.NamespaceImport,
  ts.SyntaxKind.ImportSpecifier,
  ts.SyntaxKind.ImportEqualsDeclaration,
]);
/** The declaration kinds whose own name is a member key or a type parameter: never a module binding and never a value reference's target, so the own name is read and quiet. */
const MEMBER_NAMES: ReadonlySet<ts.SyntaxKind> = new Set([
  ts.SyntaxKind.PropertyDeclaration,
  ts.SyntaxKind.MethodDeclaration,
  ts.SyntaxKind.GetAccessor,
  ts.SyntaxKind.SetAccessor,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.EnumMember,
  ts.SyntaxKind.TypeParameter,
]);

/** Whether a declaration's scope is its module's top level: no function-like node, class static block or namespace body encloses it (fail-closed: a declaration in a top-level block counts). */
function atModuleScope(declaration: ts.Node): boolean {
  for (let current = declaration.parent; current !== undefined; current = current.parent) {
    if (ts.isFunctionLike(current) || ts.isClassStaticBlockDeclaration(current) || ts.isModuleBlock(current)) return false;
  }
  return true;
}

/** Whether a parameter emits a binding: the function-like it belongs to has a body (an overload, an abstract method, an index or call signature and every other signature without a body is erased; a getter takes no parameter). */
function parameterEmits(parameter: ts.ParameterDeclaration): boolean {
  const owner = parameter.parent;
  if (ts.isArrowFunction(owner) || ts.isFunctionExpression(owner)) return true;
  return (ts.isFunctionDeclaration(owner) || ts.isMethodDeclaration(owner) || ts.isConstructorDeclaration(owner) || ts.isSetAccessorDeclaration(owner)) && owner.body !== undefined;
}

/** The variable declaration or parameter a binding element destructures, through every enclosing binding pattern. */
function bindingRoot(element: ts.BindingElement): ts.Node {
  let current: ts.Node = element;
  while (ts.isBindingElement(current) || ts.isObjectBindingPattern(current) || ts.isArrayBindingPattern(current)) current = current.parent;
  return current;
}

/**
 * Whether a namespace that is not ambient (its callers refuse an ambient one: emitsBinding and the statement check below)
 * emits a run-time binding (see the module header: GLOBAL (4)): its body holds a statement that emits one - a variable
 * statement, a function declaration with a body, a class, a non-const enum or a namespace that binds, none of them
 * ambient; a dotted namespace binds through its inner one. Any other content - none, types, const enums, ambient
 * members, imports, bodiless functions or any other statement - binds nothing (fail-closed).
 */
function namespaceBinds(declaration: ts.ModuleDeclaration): boolean {
  const body = declaration.body;
  if (body !== undefined && ts.isModuleDeclaration(body)) return namespaceBinds(body);
  if (body === undefined || !ts.isModuleBlock(body)) return false;
  return body.statements.some(statement => {
    if (isAmbient(statement)) return false;
    if (ts.isVariableStatement(statement) || ts.isClassDeclaration(statement)) return true;
    if (ts.isFunctionDeclaration(statement)) return statement.body !== undefined;
    if (ts.isEnumDeclaration(statement)) return !hasModifier(statement, ts.SyntaxKind.ConstKeyword);
    return ts.isModuleDeclaration(statement) && namespaceBinds(statement);
  });
}

/**
 * Whether one declaration of a name emits a run-time binding of it (see the module header: GLOBAL (4)-(5)). An allowlist:
 * a declaration of any kind not named here binds nothing - an interface, a type alias, an `export as namespace` and every
 * kind TypeScript may add among them (fail-closed).
 */
function emitsBinding(declaration: ts.Declaration, name: string): boolean {
  if (isAmbient(declaration) || ts.isTypeOnlyImportOrExportDeclaration(declaration)) return false;
  if (MEMBER_NAMES.has(declaration.kind)) return true;
  if (WRAPPER_NAMES.includes(name) && !ts.isFunctionExpression(declaration) && !ts.isClassExpression(declaration) && atModuleScope(declaration)) return false;
  if (ts.isFunctionDeclaration(declaration)) return declaration.body !== undefined;
  if (ts.isEnumDeclaration(declaration)) return !hasModifier(declaration, ts.SyntaxKind.ConstKeyword);
  if (ts.isModuleDeclaration(declaration)) return namespaceBinds(declaration);
  if (ts.isParameter(declaration)) return parameterEmits(declaration);
  if (ts.isBindingElement(declaration)) {
    const root = bindingRoot(declaration);
    return ts.isParameter(root) ? parameterEmits(root) : ts.isVariableDeclaration(root);
  }
  return VALUE_BINDINGS.has(declaration.kind);
}

/**
 * Whether a declaration's binding reaches a reference (see the module header: GLOBAL (6)-(7)). (6) A declaration that a
 * namespace body holds - the nearest body around it - binds only for a reference inside that body. The checker merges every
 * block of a namespace, so a reference in one block resolves to a member another block exports; under jiti 2.7.0, Pi's
 * extension loader, each block compiles to a function of its own that holds the member as its own const, and the
 * reference, left unqualified, reads the host global (the gate's readback at refusal #3). (7) An enum member binds only its
 * own name and a reference after it: jiti's enum transform qualifies a bare member name only once it has read that member,
 * so a read before the member's declaration or inside its own initializer reads the host global (the seat's readback).
 */
function reaches(declaration: ts.Node, reference: ts.Node): boolean {
  if (ts.isEnumMember(declaration) && reference !== declaration.name && reference.pos < declaration.end) return false;
  let block: ts.Node | undefined = declaration.parent;
  while (block !== undefined && !ts.isModuleBlock(block)) block = block.parent;
  if (block === undefined) return true;
  for (let current: ts.Node | undefined = reference; current !== undefined; current = current.parent) if (current === block) return true;
  return false;
}

/**
 * Whether a name of module sf binds at run time where it is read (see the module header: GLOBAL (1)-(6) and the arguments
 * object): the checker resolves it to a symbol one of whose declarations lies in sf itself, emits a binding and reaches the
 * reference, and sf is an ES module and not a declaration file. A symbol merges every same-named declaration of one scope,
 * so a companion that emits nothing (an interface, a type alias, an uninstantiated namespace, an ambient or bodiless
 * declaration) never binds the name for it.
 */
function bindsHere(sf: ts.SourceFile, name: string, symbol: ts.Symbol | undefined, reference: ts.Node): boolean {
  if (symbol === undefined) return false;
  const declarations = symbol.declarations ?? [];
  // The one binding without a declaration: the function's own arguments object, which the checker resolves only inside a non-arrow function.
  if (declarations.length === 0) return name === "arguments" && symbol.name === "arguments";
  return ts.isExternalModule(sf) && !sf.isDeclarationFile && declarations.some(declaration => declaration.getSourceFile() === sf && emitsBinding(declaration, name) && reaches(declaration, reference));
}

/**
 * A type-only import or export, erased at run time and so never read: TypeScript's own test, which holds an import type's
 * clause (named, default or namespace), a type-only import or export specifier (its own type modifier or its
 * declaration's), import type x = require(...) and export type * from.
 */
const isErased = (node: ts.Node): boolean => ts.isTypeOnlyImportOrExportDeclaration(node);

/** The free names of one module of a checked program (see the module header), each with its line; import.meta is read as the free name import.meta (the meta rule). */
export function freeNamesOf(sf: ts.SourceFile, checker: ts.TypeChecker): { readonly line: number; readonly name: string }[] {
  const out: { readonly line: number; readonly name: string }[] = [];
  const lineOf = (node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
  const report = (node: ts.Identifier, symbol: ts.Symbol | undefined): void => {
    const name = nameOf(node);
    if (!bindsHere(sf, name, symbol, node) && !ADMITTED_FREE.includes(name)) out.push({ line: lineOf(node), name });
  };
  const visit = (node: ts.Node): void => {
    if (ts.isExpressionWithTypeArguments(node) && ts.isHeritageClause(node.parent) && node.parent.token === ts.SyntaxKind.ExtendsKeyword && (ts.isClassDeclaration(node.parent.parent) || ts.isClassExpression(node.parent.parent))) {
      visit(node.expression);
      return;
    }
    if (ts.isExpressionWithTypeArguments(node) && !ts.isHeritageClause(node.parent)) {
      // An instantiation expression (f<T>, an ExpressionWithTypeArguments outside a heritage clause) is a run-time value:
      // tsc and Pi's jiti 2.7.0 strip its type arguments and run its expression (the module header: INSTANTIATION
      // EXPRESSIONS), while TypeScript 6.0.3's ts.isTypeNode answers true for it - so its expression is read here, before the
      // type test, and its type arguments are erased (row I).
      visit(node.expression);
      return;
    }
    if (ts.isTypeNode(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || isErased(node)) return;
    if (ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword) {
      // The meta rule: no meta-property key is parsed, so import.meta itself reds (fail-closed) wherever a value position reads it.
      out.push({ line: lineOf(node), name: "import.meta" });
      return;
    }
    if (ts.isExportSpecifier(node)) {
      // A local export reads its local name (the property name when aliased); an export-from names no local binding.
      const local = node.propertyName ?? node.name;
      if (node.parent.parent.moduleSpecifier === undefined && ts.isIdentifier(local)) report(local, checker.getExportSpecifierLocalTargetSymbol(node));
      return;
    }
    if (ts.isIdentifier(node) && !isPropertyName(node)) {
      const parent = node.parent;
      report(node, ts.isShorthandPropertyAssignment(parent) && parent.name === node ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(node));
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}


/** A tree the reader judges: a root directory and its files, relative to root (posix). */
export interface Tree {
  readonly root: string;
  readonly files: readonly string[];
}

/** THE READER over one tree (see the module header): every file is one module of one checked program (noLib, noResolve, the checker over exactly those files), and each module's free names are its GLOBAL lines, `GLOBAL <file>:<line> <name>`, sorted and unique. */
export function judgeGlobals(tree: Tree): string[] {
  const files = [...tree.files].sort();
  const program = ts.createProgram({
    rootNames: files.map(file => join(tree.root, file)),
    options: { noLib: true, noResolve: true, types: [], noEmit: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
  });
  const checker = program.getTypeChecker();
  const findings = new Set<string>();
  for (const file of files) {
    const sf = program.getSourceFile(join(tree.root, file));
    if (sf === undefined) throw new Error(`${file} is not in the checked program`);
    for (const free of freeNamesOf(sf, checker)) findings.add(`GLOBAL ${file}:${free.line} ${free.name}`);
  }
  return [...findings].sort();
}

/** A row's pin as the roster holds it: the SHA-256 of the pin as written (its JSON). */
export const pinDigest = (pin: unknown): string => createHash("sha256").update(JSON.stringify(pin)).digest("hex");

/** A plant pin: a planted tree (written to rule-11 scratch by the census) and its GLOBAL lines, read by judgeGlobals over every planted file. */
export interface PlantPin {
  readonly kind: "plant";
  readonly id: string;
  readonly what: string;
  readonly files: Readonly<Record<string, string>>;
  readonly findings: readonly string[];
}
export interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly PlantPin[];
}

const HOST = 'import type { Host } from "./host.js";';
/** The src-landable plants' host module, byte-for-byte as the gate wrote it (plants/landable/host.ts of its refusal #3 PREP archive; the refusal #4 archive's leg2/landable/host.ts is the same text). */
const LANDABLE_HOST = ["export interface Host {", "  readonly id: string;", "}", ""].join("\n");
/** A planted APO view (wb-021.2's plant shape): its title names the program and the view class, its handler body runs on input. */
const view = (title: string, imports: readonly string[], body: readonly string[], extra: readonly string[] = []): string =>
  [
    ...imports,
    `export const VIEW_TITLE = ${JSON.stringify(title)};`,
    ...extra,
    "export class View {",
    "  private selected = 0;",
    "  constructor(private readonly host: Host) {}",
    "  handleInput(data: string): void {",
    ...body.map(line => `    ${line}`),
    "  }",
    "}",
    "",
  ].join("\n");
const V = "src/apo/view.ts";
/** A planted interface companion: an interface, erased at run time, merged with any same-named declaration of its module. */
const companion = (name: string): string[] => [`interface ${name} {`, "  readonly tag?: never;", "}"];
/** A GLOBAL line of the reader: one free name at one line of one planted module. */
const globalAt = (line: number, name: string, file = V): string => `GLOBAL ${file}:${line} ${name}`;
/** The identity the refusal #4 gate's instantiation plants cast through (its leg2 PICK line, as written). */
const PICK = "const pick = <T,>(value: T): T => value;";

/** The judged rows (see the module header): F the free names, R the module rules and the names read, U the binding allowlist and the wrapper names, NS namespace blocks, EN enum members, M the meta rule, I instantiation expressions, J the judge mutants of record, Q the residuals. */
export const ROWS: readonly Row[] = [
  {
    id: "F",
    label: "the free names: every ADMITTED_FREE name reads quiet and every other free name reds",
    pins: [
      {
        kind: "plant",
        id: "V-admitted-free",
        what: "every ADMITTED_FREE name, referenced once, reads quiet",
        files: {
          [V]: [
            'export const VIEW_TITLE = "APO resource pressure";',
            "export function builtins(): unknown[] {",
            "  return [",
            "    Array, Boolean, Date, Error, Infinity, Int32Array, Intl, JSON, Map, Math, NaN, Number, Object, Promise, RangeError,",
            "    RegExp, Set, String, Symbol, TypeError, Uint8Array, WeakMap, WeakSet, isFinite, isNaN, parseFloat, parseInt,",
            "    undefined,",
            "  ];",
            "}",
            "",
          ].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "Z-global-process",
        what: "a native signal through the free name process reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "Z-global-fetch",
        what: "a network call through the free name fetch reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void fetch("http://127.0.0.1:9/fake");']) },
        findings: [globalAt(7, "fetch")],
      },
      {
        kind: "plant",
        id: "Z-global-code",
        what: "code built at run time through the free names Function and eval reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['new Function("return 1");', 'eval("1");']) },
        findings: [globalAt(7, "Function"), globalAt(8, "eval")],
      },
      {
        kind: "plant",
        id: "Z-global-this",
        what: "the global object through the free name globalThis reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void globalThis.navigator;"]) },
        findings: [globalAt(7, "globalThis")],
      },
      {
        kind: "plant",
        id: "Z-global-wrapper",
        what: "global, the names a CommonJS module wrapper hands in (require, module, exports, __filename, __dirname) and the two jiti's wrapper adds (jitiImport, jitiESMResolve) red as free names (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void [require, module, exports, __filename, __dirname, jitiImport, jitiESMResolve, global];"]) },
        findings: [globalAt(7, "require"), globalAt(7, "module"), globalAt(7, "exports"), globalAt(7, "__filename"), globalAt(7, "__dirname"), globalAt(7, "jitiImport"), globalAt(7, "jitiESMResolve"), globalAt(7, "global")],
      },
    ],
  },
  {
    id: "R",
    label: "the module rules (1)-(3) and the names read: a name binds only through a declaration of its own ES module, never a script's or a declaration file's",
    pins: [
      {
        kind: "plant",
        id: "R-shorthand",
        what: "a shorthand property reads its value: { process } reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void { process };"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "R-export-local",
        what: "a local export specifier reads its local name: export { process } and export { fetch as get } red on process and fetch (GLOBAL)",
        files: { [V]: [HOST, 'export const VIEW_TITLE = "APO resource pressure";', "export { process };", "export { fetch as get };", ""].join("\n") },
        findings: [globalAt(3, "process"), globalAt(4, "fetch")],
      },
      {
        kind: "plant",
        id: "R-ambient",
        what: "a name only an ambient declaration declares is free, under its own declare (declare const) or an enclosing one (declare global): each reds at the declaration and at the use, and the global augmentation itself reds (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["process.kill(1);", "nativeHook.kill(2);"],
            ["declare const process: { kill(pid: number): void };", "declare global {", "  const nativeHook: { kill(pid: number): void };", "}"],
          ),
        },
        findings: [globalAt(3, "process"), globalAt(4, "global"), globalAt(5, "nativeHook"), globalAt(11, "process"), globalAt(12, "nativeHook")],
      },
      {
        kind: "plant",
        id: "R-extends",
        what: "a class's extends expression is a value, for a class declaration and a class expression alike: each extends Function reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["class Code extends Function {}", "void Code;", "const Made = class extends Function {};", "void Made;"]) },
        findings: [globalAt(3, "Function"), globalAt(5, "Function")],
      },
      {
        kind: "plant",
        id: "R-enum-initializer",
        what: "an enum member's initializer is read: process in an initializer reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["enum Level {", "  Top = process.pid,", "}", "void Level;"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "R-closure-global",
        what: "a free name in a closure module (not the view) reds there (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { stop } from "./stop.js";'], ["stop();"]),
          "src/apo/stop.ts": ["export function stop(): void {", "  process.exitCode = 1;", "}", ""].join("\n"),
        },
        findings: [globalAt(2, "process", "src/apo/stop.ts")],
      },
      {
        kind: "plant",
        id: "R-global-escaped",
        what: "a free name is read by nameOf: process in the scanner shape reds as process (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void \\u0070roces\\u{73};"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "R-script-var",
        what: "a script shim's top-level var (TypeScript reads it as a global declaration) binds nothing: process reds in the script and at the view's use (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["process.kill(this.selected);"]),
          "src/apo/shim.ts": ["var process: { kill(pid: number): void };", ""].join("\n"),
        },
        findings: [globalAt(1, "process", "src/apo/shim.ts"), globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "R-script-typed",
        what: "a script shim typed NodeJS.Process (the refusal's src-landable form) binds nothing: process reds at each script line and at the view's use (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["process.kill(this.selected);"]),
          "src/apo/shim.ts": ["var process: NodeJS.Process;", "void process;", ""].join("\n"),
        },
        findings: [globalAt(1, "process", "src/apo/shim.ts"), globalAt(2, "process", "src/apo/shim.ts"), globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "R-script-function",
        what: "a script shim's top-level function binds nothing: fetch reds at its declaration and at the view's call, and the script's parameter url at each line naming it (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ['void fetch("http://127.0.0.1:9/fake");']),
          "src/apo/shim.ts": ["function fetch(url: string): string {", "  return url;", "}", ""].join("\n"),
        },
        findings: [globalAt(1, "fetch", "src/apo/shim.ts"), globalAt(1, "url", "src/apo/shim.ts"), globalAt(2, "url", "src/apo/shim.ts"), globalAt(8, "fetch")],
      },
      {
        kind: "plant",
        id: "R-script-require",
        what: "a script shim's top-level var require binds nothing: require reds in the script and where the view reads it into a local (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["const load = require;", 'void load("node:child_process");']),
          "src/apo/shim.ts": ["var require: (id: string) => unknown;", ""].join("\n"),
        },
        findings: [globalAt(1, "require", "src/apo/shim.ts"), globalAt(8, "require")],
      },
      {
        kind: "plant",
        id: "R-dts-script",
        what: "a declaration file the view imports as ./env.d.js binds nothing: its implicitly ambient nativeHook reds in the .d.ts and at the view's use (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./env.d.js";'], ["nativeHook.kill(2);"]),
          "src/apo/env.d.ts": ["const nativeHook: { kill(pid: number): void };", ""].join("\n"),
        },
        findings: [globalAt(1, "nativeHook", "src/apo/env.d.ts"), globalAt(8, "nativeHook")],
      },
      {
        kind: "plant",
        id: "R-dts-module",
        what: "a declaration file that is an ES module, which the view imports as ./env.d.ts, binds nothing: its exported nativeHook reds in the .d.ts, while the view's import of it is a declaration of the view and binds there (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { nativeHook } from "./env.d.ts";'], ["nativeHook.kill(2);"]),
          "src/apo/env.d.ts": ["export const nativeHook: { kill(pid: number): void };", ""].join("\n"),
        },
        findings: [globalAt(1, "nativeHook", "src/apo/env.d.ts")],
      },
      {
        kind: "plant",
        id: "R-type-only-value",
        what: "a type-only import binds nothing at run time: a value use of a named import type binding, a type-only specifier, a type-only namespace import, a default import type and an import type x = require(...) each reds (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [
              HOST,
              'import type { process } from "../workbench/host.js";',
              'import { type fetch } from "../workbench/host.js";',
              'import type * as natives from "../workbench/host.js";',
              'import type Kill from "../workbench/host.js";',
              'import type Native = require("../workbench/native-modules.js");',
            ],
            ["process.kill(this.selected);", 'void fetch("http://127.0.0.1:9/fake");', "natives.spawn();", "void Kill;", "void Native;"],
          ),
        },
        findings: [globalAt(12, "process"), globalAt(13, "fetch"), globalAt(14, "natives"), globalAt(15, "Kill"), globalAt(16, "Native")],
      },
      {
        kind: "plant",
        id: "R-type-only-erased",
        what: "type-only imports and exports are erased and never read: an import type, an export type and a type-only export specifier naming process stay quiet",
        files: {
          [V]: [HOST, 'import type { process } from "../workbench/host.js";', "export type { process };", "export { type process as signal };", 'export const VIEW_TITLE = "APO resource pressure";', ""].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-non-value-alias",
        what: "a value use resolves only to a declaration with a value meaning: an import alias and an import-equals alias whose resolved target is an interface, an empty namespace and a namespace holding types only are each passed over, so a value use of each reds; the aliases' own declarations and an instantiated namespace bind, while the empty and the types-only namespace bind nothing, so each also reds at its own declaration (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST, 'import { Shape as process } from "./shapes.js";', 'import * as shapes from "./shapes.js";', "import fetch = shapes.Shape;"],
            ["process.kill(this.selected);", "void fetch;", "signal.kill(1);", "void typesOnly;", "void valued;"],
            ["namespace signal {}", "namespace typesOnly {", "  export interface Held {}", "}", "namespace valued {", "  export const level = 1;", "}"],
          ),
          "src/apo/shapes.ts": ["export interface Shape {", "  kill(pid: number): void;", "}", ""].join("\n"),
        },
        findings: [globalAt(6, "signal"), globalAt(7, "typesOnly"), globalAt(17, "process"), globalAt(18, "fetch"), globalAt(19, "signal"), globalAt(20, "typesOnly")],
      },
      {
        kind: "plant",
        id: "R-types-erased",
        what: "interfaces and type aliases are erased and never read: a script shim holding only an interface and a type alias (where a script binds nothing, so any name read would red) and an interface whose computed member key names process stay quiet",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["void this.selected;"], ["interface Keyed {", "  [process.pid]: number;", "}"]),
          "src/apo/shim.ts": ["interface Shape {", "  kill(pid: number): void;", "}", "type Signal = number;", ""].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-arguments",
        what: "arguments binds only inside a non-arrow function (a function declaration, a function expression, a method, and an arrow inside a function inheriting it): at the module's top level and in a top-level arrow it is free and reds (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void arguments;"],
            ["void arguments;", "const early = (): unknown => arguments;", "function late(): unknown {", "  return ((): unknown => arguments)();", "}", "const inner = function (): unknown {", "  return arguments;", "};", "void [early, late, inner];"],
          ),
        },
        findings: [globalAt(3, "arguments"), globalAt(4, "arguments")],
      },
      {
        kind: "plant",
        id: "R-bodiless",
        what: "a function declaration without a body (an overload with no implementation) binds nothing: process reds at its declaration and at the call, while an overloaded pad binds through its implementation; the bodiless overload's own parameter value binds nothing either and reds at its declaration (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["process();"],
            ["function process(): void;", "function pad(value: string): string;", "function pad(value: string, width = 2): string {", "  return value.padStart(width);", "}", "void pad;"],
          ),
        },
        findings: [globalAt(3, "process"), globalAt(4, "value"), globalAt(13, "process")],
      },
      {
        kind: "plant",
        id: "R-const-enum",
        what: "a const enum binds nothing (tsc's default emit erases it): process reds at its declaration and at the use, while a plain enum Level binds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void process.kill;"], ["const enum process {", "  kill,", "}", "enum Level {", "  Top,", "}", "void Level;"]) },
        findings: [globalAt(3, "process"), globalAt(14, "process")],
      },
      {
        kind: "plant",
        id: "R-not-references",
        what: "names that are not binding references stay quiet: an import alias's imported name and an export-from specifier (each naming an export the module lacks, so neither resolves), an import attribute, a qualified name's right side, a binding element's property name, labels, and the meta-property new.target; the meta-property import.meta is the one exception and reds (GLOBAL, the meta rule)",
        files: {
          [V]: [
            HOST,
            'import { absent as title } from "./label-ops.js";',
            'import data from "./label-ops.js" with { type: "json" };',
            'export { absentToo as named } from "./label-ops.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "namespace Space {",
            "  export const level = 0;",
            "}",
            "import Kind = Space.Missing;",
            "export class View {",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(text: string): void {",
            "    const { kill: stop } = this.host;",
            "    outer: for (const step of [stop, title, data, Kind, text]) {",
            "      if (step === undefined) break outer;",
            "      continue outer;",
            "    }",
            "    void import.meta.url;",
            "  }",
            "  static make(): void {",
            "    void new.target;",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/label-ops.ts": ['export const label = "x";', "export default 1;", ""].join("\n"),
        },
        findings: [globalAt(18, "import.meta")],
      },
    ],
  },
  {
    id: "U",
    label: "the binding allowlist (4) and the wrapper names (5): a declaration binds only in a form that emits a run-time binding, alone or merged",
    pins: [
      {
        kind: "plant",
        id: "U-GP1",
        what: "refusal #2 GP1: an ambient const merged with an interface companion binds nothing: process reds at the ambient declaration and at the use, the interface never read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare const process: { kill(pid: number): void };", ...companion("process")]) },
        findings: [globalAt(3, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP1L",
        what: "refusal #2 GP1L, the src-landable form as the gate wrote it (the gate measured tsc -p tsconfig.json rc 0 and biome rc 0 on it): ambient process and fetch, each merged with a type companion, red at their declarations and at the handler's real process.kill and fetch calls (GLOBAL)",
        files: {
          [V]: [
            "declare const process: { kill(pid: number): void };",
            "interface process {",
            "  readonly tag?: never;",
            "}",
            "declare const fetch: (url: string) => Promise<unknown>;",
            "type fetch = unknown;",
            "export type Tagged = process | fetch;",
            'export const VIEW_TITLE = "APO resource pressure";',
            "export class View {",
            "  private selected = 0;",
            "  handleInput(data: string): void {",
            "    process.kill(this.selected);",
            `    void fetch(\`http://127.0.0.1:9/\${data}\`);`,
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        findings: [globalAt(1, "process"), globalAt(5, "fetch"), globalAt(12, "process"), globalAt(13, "fetch")],
      },
      {
        kind: "plant",
        id: "U-GP2",
        what: "refusal #2 GP2: an ambient const merged with a type-alias companion binds nothing: fetch reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void fetch("http://127.0.0.1:9/fake");'], ["declare const fetch: (url: string) => Promise<unknown>;", "type fetch = unknown;"]) },
        findings: [globalAt(3, "fetch"), globalAt(9, "fetch")],
      },
      {
        kind: "plant",
        id: "U-GP3",
        what: "refusal #2 GP3 (a partial member): an ambient namespace merged with an empty namespace binds nothing: process reds at both declarations and at the use, beside the ambient inner names kill and pid (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare namespace process {", "  function kill(pid: number): void;", "}", "namespace process {}"]) },
        findings: [globalAt(3, "process"), globalAt(4, "kill"), globalAt(4, "pid"), globalAt(6, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP3b",
        what: "refusal #2 GP3b: an ambient namespace whose only member is an admitted name, merged with an empty namespace, binds nothing: process reds at both declarations and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.Array.kill(this.selected);"], ["declare namespace process {", "  const Array: { kill(pid: number): void };", "}", "namespace process {}"]) },
        findings: [globalAt(3, "process"), globalAt(6, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP4",
        what: "refusal #2 GP4 (a partial member): an ambient function merged with an empty namespace binds nothing: fetch reds at both declarations and at the use, beside the ambient parameter url (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void fetch("http://127.0.0.1:9/fake");'], ["declare function fetch(url: string): Promise<unknown>;", "namespace fetch {}"]) },
        findings: [globalAt(3, "fetch"), globalAt(3, "url"), globalAt(4, "fetch"), globalAt(9, "fetch")],
      },
      {
        kind: "plant",
        id: "U-GP4b",
        what: "refusal #2 GP4b: an ambient function without parameters merged with an empty namespace binds nothing: fetch reds at both declarations and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void fetch();"], ["declare function fetch(): Promise<unknown>;", "namespace fetch {}"]) },
        findings: [globalAt(3, "fetch"), globalAt(4, "fetch"), globalAt(9, "fetch")],
      },
      {
        kind: "plant",
        id: "U-GP5",
        what: "refusal #2 GP5: a function declaration without a body merged with an interface companion binds nothing: process reds at the declaration and at the call (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process();"], ["function process(): void;", ...companion("process")]) },
        findings: [globalAt(3, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP7",
        what: "refusal #2 GP7: the GP1 merge inside a closure module one static edge from the view reds there, at the declaration and at the call (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { stop } from "./ops.js";'], ["stop(this.selected);"]),
          "src/apo/ops.ts": ["declare const process: { kill(pid: number): void };", ...companion("process"), "export function stop(pid: number): void {", "  process.kill(pid);", "}", ""].join("\n"),
        },
        findings: [globalAt(1, "process", "src/apo/ops.ts"), globalAt(6, "process", "src/apo/ops.ts")],
      },
      {
        kind: "plant",
        id: "U-GP8",
        what: "refusal #2 GP8 (a partial member): an ambient class merged with an interface companion binds nothing: Worker reds at the declaration and at the construction, beside the ambient constructor parameter path (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void new Worker("./x.js");'], ["declare class Worker {", "  constructor(path: string);", "}", ...companion("Worker")]) },
        findings: [globalAt(3, "Worker"), globalAt(4, "path"), globalAt(13, "Worker")],
      },
      {
        kind: "plant",
        id: "U-GP8b",
        what: "refusal #2 GP8b: an empty ambient class merged with an interface companion binds nothing: Worker reds at the declaration and at the construction (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new Worker();"], ["declare class Worker {}", ...companion("Worker")]) },
        findings: [globalAt(3, "Worker"), globalAt(11, "Worker")],
      },
      {
        kind: "plant",
        id: "U-GP9",
        what: "refusal #2 GP9 (a partial member): an ambient namespace merged with a types-only namespace binds nothing: process reds at both declarations and at the use, beside the ambient inner names kill and pid (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare namespace process {", "  function kill(pid: number): void;", "}", "namespace process {", "  export type Signal = number;", "}"]),
        },
        findings: [globalAt(3, "process"), globalAt(4, "kill"), globalAt(4, "pid"), globalAt(6, "process"), globalAt(13, "process")],
      },
      {
        kind: "plant",
        id: "U-GP10",
        what: "refusal #2 GP10: an ambient require merged with an interface companion binds nothing: require reds at the declaration and where the view reads it into a local (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const load = require;", 'void load("node:child_process");'], ["declare const require: (id: string) => unknown;", ...companion("require")]) },
        findings: [globalAt(3, "require"), globalAt(11, "require")],
      },
      {
        kind: "plant",
        id: "U-GP11",
        what: "refusal #2 GP11: an ambient globalThis merged with an interface companion binds nothing: globalThis reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void globalThis.process;"], ["declare const globalThis: { readonly process: unknown };", ...companion("globalThis")]) },
        findings: [globalAt(3, "globalThis"), globalAt(11, "globalThis")],
      },
      {
        kind: "plant",
        id: "U-GP12",
        what: "refusal #2 GP12: an ambient Function merged with an interface companion binds nothing: Function reds at the declaration and at the construction (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['void new Function("return 1")();'], ["declare const Function: new (body: string) => () => unknown;", ...companion("Function")]) },
        findings: [globalAt(3, "Function"), globalAt(11, "Function")],
      },
      {
        kind: "plant",
        id: "U-GP13",
        what: "refusal #2 GP13: an exported ambient const merged with an exported interface companion binds nothing: process reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["export declare const process: { kill(pid: number): void };", "export interface process {", "  readonly tag?: never;", "}"]) },
        findings: [globalAt(3, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP14",
        what: "refusal #2 GP14: the interface companion declared before the ambient const binds nothing either: process reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], [...companion("process"), "declare const process: { kill(pid: number): void };"]) },
        findings: [globalAt(6, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GP17",
        what: "refusal #2 GP17: ambient module, exports, __filename and __dirname, each merged with an interface companion, bind nothing: each reds at its declaration and at the use (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [module, exports, __filename, __dirname];"],
            [
              "declare const module: unknown;",
              ...companion("module"),
              "declare const exports: unknown;",
              ...companion("exports"),
              "declare const __filename: string;",
              ...companion("__filename"),
              "declare const __dirname: string;",
              ...companion("__dirname"),
            ],
          ),
        },
        findings: [globalAt(3, "module"), globalAt(7, "exports"), globalAt(11, "__filename"), globalAt(15, "__dirname"), globalAt(23, "module"), globalAt(23, "exports"), globalAt(23, "__filename"), globalAt(23, "__dirname")],
      },
      {
        kind: "plant",
        id: "U-GP6",
        what: "refusal #2 GP6 (killed at the gate, held here): a parameter initializer resolves outside the function body, so a same-named var in the body does not bind it: process reds in the initializer only (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;", "void stop();"], ["function stop(pid = process.kill(2)): unknown {", "  var process: unknown;", "  return [pid, process];", "}"]) },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "U-GP15",
        what: "refusal #2 GP15 (killed at the gate, held here): a global augmentation's var merged with its interface binds nothing: global, the var's own name and the use red (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare global {", "  var process: { kill(pid: number): void };", "  interface process {", "    readonly tag?: never;", "  }", "}"]),
        },
        findings: [globalAt(3, "global"), globalAt(4, "process"), globalAt(13, "process")],
      },
      {
        kind: "plant",
        id: "U-GP16",
        what: "refusal #2 GP16 (killed at the gate, held here): a script shim's var beside the view's own interface companion binds nothing: process reds in the script and at the view's use (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["process.kill(this.selected);"], companion("process")),
          "src/apo/shim.ts": ["var process: { kill(pid: number): void };", ""].join("\n"),
        },
        findings: [globalAt(1, "process", "src/apo/shim.ts"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-GC1",
        what: "refusal #2 control GC1 (GP1 without its companion): the ambient const alone reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare const process: { kill(pid: number): void };"]) },
        findings: [globalAt(3, "process"), globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-GC2",
        what: "refusal #2 control GC2: a global augmentation's var beside a module-level interface companion binds nothing: global, the var's own name and the use red (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST], ["nativeHook.kill(this.selected);"], ["declare global {", "  var nativeHook: { kill(pid: number): void };", "}", ...companion("nativeHook")]),
        },
        findings: [globalAt(3, "global"), globalAt(4, "nativeHook"), globalAt(13, "nativeHook")],
      },
      {
        kind: "plant",
        id: "U-GC3",
        what: "refusal #2 control GC3 (GP6 without the body var): a parameter initializer's free name reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;", "void stop();"], ["function stop(pid = process.kill(2)): unknown {", "  return pid;", "}"]) },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "U-const-enum-companion",
        what: "found by the cut #3 seat: a const enum merged with an empty namespace binds nothing (tsc's default emit erases both, so the use reaches the host's process): process reds at both declarations and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void process;"], ["const enum process {", "  kill,", "}", "namespace process {}"]) },
        findings: [globalAt(3, "process"), globalAt(6, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-default-interface",
        what: "found by the cut #3 seat: an ambient const merged with an export default interface companion binds nothing: process reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare const process: { kill(pid: number): void };", "export default interface process {", "  readonly tag?: never;", "}"]) },
        findings: [globalAt(3, "process"), globalAt(11, "process")],
      },
      {
        kind: "plant",
        id: "U-ambient-let-type",
        what: "found by the cut #3 seat: an ambient let merged with a type-alias companion binds nothing: process reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["declare let process: { kill(pid: number): void };", "type process = never;"]) },
        findings: [globalAt(3, "process"), globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "U-depth-two",
        what: "found by the cut #3 seat: an ambient var merged with an interface companion two static edges from the view reds there, at the declaration and at the call (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { halt } from "./halt.js";'], ["halt();"]),
          "src/apo/halt.ts": ['import { stop } from "./stop.js";', "export function halt(): void {", "  stop();", "}", ""].join("\n"),
          "src/apo/stop.ts": ["declare var process: { kill(pid: number): void };", ...companion("process"), "export function stop(): void {", "  process.kill(1);", "}", ""].join("\n"),
        },
        findings: [globalAt(1, "process", "src/apo/stop.ts"), globalAt(6, "process", "src/apo/stop.ts")],
      },
      {
        kind: "plant",
        id: "U-ambient-function-interface",
        what: "found by the cut #3 seat: an ambient function merged with an interface companion binds nothing: fetch reds at the declaration and at the call (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void fetch();"], ["declare function fetch(): Promise<unknown>;", ...companion("fetch")]) },
        findings: [globalAt(3, "fetch"), globalAt(11, "fetch")],
      },
      {
        kind: "plant",
        id: "U-ambient-class-namespace",
        what: "found by the cut #3 seat: an ambient class merged with an empty namespace binds nothing: Worker reds at both declarations and at the construction (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new Worker();"], ["declare class Worker {}", "namespace Worker {}"]) },
        findings: [globalAt(3, "Worker"), globalAt(4, "Worker"), globalAt(9, "Worker")],
      },
      {
        kind: "plant",
        id: "U-ambient-namespace-interface",
        what: "found by the cut #3 seat: an ambient namespace holding a value, merged with an interface companion, binds nothing: process reds at the declaration and at the use, beside the ambient inner kill (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(1);"], ["declare namespace process {", "  const kill: (pid: number) => void;", "}", ...companion("process")]) },
        findings: [globalAt(3, "process"), globalAt(4, "kill"), globalAt(13, "process")],
      },
      {
        kind: "plant",
        id: "U-string-module",
        what: "found by the cut #3 seat: a module declaration named by a string literal is an ambient module even without declare (TypeScript emits no binding of its own for it): the var inside binds nothing and process reds at its declaration and at the use inside (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ['module "shim" {', "  var process: { kill(pid: number): void };", "  process.kill(1);", "}"]) },
        findings: [globalAt(4, "process"), globalAt(5, "process")],
      },
      {
        kind: "plant",
        id: "U-umd-export",
        what: "an export as namespace declaration (a declaration-file construct TypeScript emits nothing for) binds nothing: process reds at it and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["export as namespace process;"]) },
        findings: [globalAt(3, "process"), globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-signature-parameters",
        what: "a parameter binds only when its function-like has a body: an abstract method's, a method overload's, a constructor overload's and an index signature's parameter and a binding element of an overload's parameter each red at the declaration, while the implementations' parameters bind (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void this.selected;"],
            [
              "abstract class Base {",
              "  constructor(level: number);",
              "  constructor(level?: number) {",
              "    void level;",
              "  }",
              "  abstract stop(signal: number): void;",
              "  halt(code: number): void;",
              "  halt(code?: number): void {",
              "    void code;",
              "  }",
              "  rest({ depth }: { depth: number }): void;",
              "  rest(options?: { depth: number }): void {",
              "    void options;",
              "  }",
              "  [key: string]: unknown;",
              "}",
              "void Base;",
            ],
          ),
        },
        findings: [globalAt(4, "level"), globalAt(8, "signal"), globalAt(9, "code"), globalAt(13, "depth"), globalAt(17, "key")],
      },
      {
        kind: "plant",
        id: "U-wrapper-var",
        what: "found by the cut #3 seat: a module-scope var without an initializer named after a CommonJS wrapper's parameter (exports, require, module, __filename, __dirname, jitiImport, jitiESMResolve) or its own arguments binds nothing - under the wrapper it re-declares the parameter and keeps the wrapper's value (readback: var jitiImport; loads node:os under jiti 2.7.0, var require; under tsc's CommonJS emit): each reds at its declaration and at its use, the seven parameters in the handler and arguments at the module's top level (inside a method arguments is the method's own object and binds) (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [exports, require, module, __filename, __dirname, jitiImport, jitiESMResolve];"],
            [
              "var exports: unknown;",
              "var require: (id: string) => unknown;",
              "var module: unknown;",
              "var __filename: string;",
              "var __dirname: string;",
              "var jitiImport: (id: string) => Promise<unknown>;",
              "var jitiESMResolve: (id: string) => string;",
              "var arguments: unknown;",
              "void arguments;",
            ],
          ),
        },
        findings: [globalAt(3, "exports"), globalAt(4, "require"), globalAt(5, "module"), globalAt(6, "__filename"), globalAt(7, "__dirname"), globalAt(8, "jitiImport"), globalAt(9, "jitiESMResolve"), globalAt(10, "arguments"), globalAt(11, "arguments"), globalAt(16, "exports"), globalAt(16, "require"), globalAt(16, "module"), globalAt(16, "__filename"), globalAt(16, "__dirname"), globalAt(16, "jitiImport"), globalAt(16, "jitiESMResolve")],
      },
      {
        kind: "plant",
        id: "U-wrapper-forms",
        what: "found by the cut #3 seat: every module-scope declaration of a wrapper name binds nothing (a var with a self initializer, a non-const enum and an instantiated namespace compile to a var of the wrapper's parameter; a function declaration, a let, a class and a var in a top-level block are held the same way, fail-closed): each reds; the same names declared inside a function, a namespace body or a class static block, and a function or a class expression's own name, are fresh bindings and stay quiet (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [require, jitiImport, module, exports, __filename, __dirname, jitiESMResolve, scoped, Inner, fresh, made, Holder];"],
            [
              "var require = require;",
              "enum jitiImport {",
              "  Early,",
              "}",
              "namespace module {",
              "  export const level = 1;",
              "}",
              "function exports(): void {}",
              'let __filename = "";',
              "class __dirname {}",
              "{",
              "  var jitiESMResolve: unknown;",
              "}",
              "function scoped(): unknown {",
              "  var require: unknown;",
              "  return require;",
              "}",
              "namespace Inner {",
              "  var jitiImport: unknown;",
              "  void jitiImport;",
              "}",
              "const fresh = function exports(): unknown {",
              "  return exports;",
              "};",
              "const made = class module {",
              "  static self(): unknown {",
              "    return module;",
              "  }",
              "};",
              "class Holder {",
              "  static {",
              "    var require: unknown;",
              "    void require;",
              "  }",
              "}",
            ],
          ),
        },
        findings: [globalAt(3, "require"), globalAt(4, "jitiImport"), globalAt(7, "module"), globalAt(10, "exports"), globalAt(11, "__filename"), globalAt(12, "__dirname"), globalAt(14, "jitiESMResolve"), globalAt(42, "require"), globalAt(42, "jitiImport"), globalAt(42, "module"), globalAt(42, "exports"), globalAt(42, "__filename"), globalAt(42, "__dirname"), globalAt(42, "jitiESMResolve")],
      },
      {
        kind: "plant",
        id: "U-namespace-unbound",
        what: "a namespace binds nothing unless it holds a statement that emits a binding: an empty one, a types-only one, a const-enum-only one, an ambient-member-only one, a bodiless-function-only one, one holding only a statement the reader does not list (void 0: fail-closed, though TypeScript emits it), one holding only a namespace that binds nothing, and an ambient one each red at the declaration and at the use, beside their non-binding inner names (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [empty, typed, constOnly, ambientOnly, bodiless, statementOnly, nestedUnbound, ambient];"],
            [
              "namespace empty {}",
              "namespace typed {",
              "  export interface Shape {}",
              "  export type Alias = number;",
              "}",
              "namespace constOnly {",
              "  export const enum Flag {",
              "    On,",
              "  }",
              "}",
              "namespace ambientOnly {",
              "  export declare const level: number;",
              "}",
              "namespace bodiless {",
              "  export function made(): void;",
              "}",
              "namespace statementOnly {",
              "  void 0;",
              "}",
              "namespace nestedUnbound {",
              "  export namespace inner {}",
              "}",
              "declare namespace ambient {",
              "  export const level: number;",
              "}",
            ],
          ),
        },
        findings: [globalAt(3, "empty"), globalAt(4, "typed"), globalAt(8, "constOnly"), globalAt(9, "Flag"), globalAt(13, "ambientOnly"), globalAt(14, "level"), globalAt(16, "bodiless"), globalAt(17, "made"), globalAt(19, "statementOnly"), globalAt(22, "nestedUnbound"), globalAt(23, "inner"), globalAt(25, "ambient"), globalAt(26, "level"), globalAt(32, "empty"), globalAt(32, "typed"), globalAt(32, "constOnly"), globalAt(32, "ambientOnly"), globalAt(32, "bodiless"), globalAt(32, "statementOnly"), globalAt(32, "nestedUnbound"), globalAt(32, "ambient")],
      },
      {
        kind: "plant",
        id: "U-namespace-binds",
        what: "a namespace binds when it holds a statement that emits a binding - a variable statement, a function declaration with a body, a class, a non-const enum, a namespace that binds - and a dotted namespace binds through its innermost body: each use stays quiet",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [byVariable, byFunction, byClass, byEnum, byNamespace, by];"],
            [
              "namespace byVariable {",
              "  export const level = 1;",
              "}",
              "namespace byFunction {",
              "  export function made(): void {}",
              "}",
              "namespace byClass {",
              "  export class Made {}",
              "}",
              "namespace byEnum {",
              "  export enum Made {",
              "    Early,",
              "  }",
              "}",
              "namespace byNamespace {",
              "  export namespace inner {",
              "    export const level = 1;",
              "  }",
              "}",
              "namespace by.dotted {",
              "  export const level = 1;",
              "}",
            ],
          ),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-binds-values",
        what: "every value-binding form binds in its own ES module and stays quiet: var, let and const, object and array binding elements, a function declaration with a body, its parameter and its parameter's binding element, an arrow's and a function expression's parameter, a function expression's own name, a class declaration and a class expression's own name, a non-const enum and its member read in an initializer, an instantiated namespace, a catch variable, a default, a named and a namespace value import and an import-equals, and a module-scope var of a name outside the wrapper's (a fresh binding at run time: var process; reads undefined under jiti, tsc's CommonJS emit and ESM)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST, 'import fallback, { level as imported } from "./values.js";', 'import * as values from "./values.js";', "import depthOf = values.level;"],
            ["void [held, kept, fixed, left, renamed, first, made, named, Shape, Built, Level, Space, guarded, process, twice, half, fallback, imported, values, depthOf, data];"],
            [
              "var held = 1;",
              "let kept = 2;",
              "const fixed = 3;",
              "const { left, right: renamed } = { left: 1, right: 2 };",
              "const [first] = [1];",
              "function made(value: number, { depth }: { depth: number } = { depth: 0 }): number {",
              "  return value + depth;",
              "}",
              "const named = function inner(): unknown {",
              "  return inner;",
              "};",
              "class Shape {}",
              "const Built = class Local {",
              "  static self(): unknown {",
              "    return Local;",
              "  }",
              "};",
              "enum Level {",
              "  Low = 1,",
              "  High = Low + 1,",
              "}",
              "namespace Space {",
              "  export const depth = 1;",
              "}",
              "function guarded(): unknown {",
              "  try {",
              "    return held;",
              "  } catch (failure) {",
              "    return failure;",
              "  }",
              "}",
              "var process: { kill(pid: number): void };",
              "const twice = (count: number): number => count * 2;",
              "const half = function (count: number): number {",
              "  return count / 2;",
              "};",
            ],
          ),
          "src/apo/values.ts": ["export const level = 1;", "export default 2;", ""].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-binds-merged",
        what: "an emitting declaration merged with a companion binds through the emitting one and stays quiet: a function and a class each with an interface, an instantiated namespace with an interface, and a function, a class and a non-const enum each with an instantiated namespace",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["process();", "void new Worker();", "void fetch.level;", "signal();", "void Code.level;", "void Phase.level;"],
            [
              "function process(): void {}",
              ...companion("process"),
              "class Worker {}",
              ...companion("Worker"),
              "namespace fetch {",
              "  export const level = 1;",
              "}",
              ...companion("fetch"),
              "function signal(): void {}",
              "namespace signal {",
              "  export const level = 2;",
              "}",
              "class Code {}",
              "namespace Code {",
              "  export const level = 3;",
              "}",
              "enum Phase {",
              "  Early,",
              "}",
              "namespace Phase {",
              "  export const level = 4;",
              "}",
            ],
          ),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-binds-members",
        what: "the own names of members and type parameters - a class property, accessor pair, setter-only accessor and method, an object literal property, method and accessor, an enum member and a type parameter (named process and fetch here; a property module and a member exports, named after wrapper names, stay member names) - name no module binding and are never a value reference's target: each is read and stays quiet",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [Holder, literal, Members, generic];"],
            [
              "class Holder<process> {",
              "  count = 0;",
              "  module = 1;",
              "  get size(): number {",
              "    return this.count;",
              "  }",
              "  set size(value: number) {",
              "    this.count = value;",
              "  }",
              "  set only(value: number) {",
              "    this.count = value;",
              "  }",
              "  method(): void {}",
              "}",
              "const literal = {",
              "  key: 1,",
              "  method(): number {",
              "    return 1;",
              "  },",
              "  get computed(): number {",
              "    return 2;",
              "  },",
              "};",
              "enum Members {",
              "  First,",
              "  exports,",
              "}",
              "function generic<fetch>(input: fetch): fetch {",
              "  return input;",
              "}",
            ],
          ),
        },
        findings: [],
      },
    ],
  },
  {
    id: "NS",
    label: "namespace blocks (6): a member a namespace body declares binds only a reference inside that body",
    pins: [
      {
        kind: "plant",
        id: "U-NS1",
        what: "refusal #3 NS1 (class U1's third failure, the gate's plant as written): a reference in one block of a merged namespace to a member another block exports binds nothing (GLOBAL (6)): process.kill in the second block of namespace Ops reds at the use, the first block's own name stays quiet (GLOBAL)",
        files: {
          [V]: [
            HOST,
            'export const VIEW_TITLE = "APO resource pressure";',
            "namespace Ops {",
            "  export const process = { kill(pid: number): void { void pid; } };",
            "}",
            "namespace Ops {",
            "  export function stop(pid: number): void {",
            "    process.kill(pid);",
            "  }",
            "}",
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    Ops.stop(this.selected);",
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-NS1L",
        what: "refusal #3 NS1L, the src-landable form byte-for-byte as the gate wrote it (the gate measured tsc -p tsconfig.json rc 0 and biome rc 0 on it): the exported namespace Ops merged across two blocks, the handler's call reaching the second block's real process.kill - red at that use (GLOBAL)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "export namespace Ops {",
            "  export const process = { kill(pid: number): void { void pid; } };",
            "}",
            "export namespace Ops {",
            "  export function stop(pid: number): void {",
            "    process.kill(pid);",
            "  }",
            "}",
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    Ops.stop(this.selected);",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-NS2",
        what: "refusal #3 NS2: a cross-block reference to an exported fetch member binds nothing: the second block's real fetch call reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["N.go();"], ["namespace N {", "  export const fetch = (url: string): string => url;", "}", "namespace N {", "  export function go(): void {", '    void fetch("http://127.0.0.1:9/fake");', "  }", "}"]) },
        findings: [globalAt(8, "fetch")],
      },
      {
        kind: "plant",
        id: "U-NS3",
        what: "the gate's NS3 (before wb-021.2 cut #4 its census read only the PACKAGE edge): a cross-block reference to an exported require member binds nothing: the call reds as a free name at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.load();"], ["namespace N {", "  export const require = (id: string): unknown => id;", "}", "namespace N {", "  export function load(): unknown {", '    return require("node:child_process");', "  }", "}"]) },
        findings: [globalAt(8, "require")],
      },
      {
        kind: "plant",
        id: "U-NS3b",
        what: "the gate's NS3b: a cross-block reference to an exported require member read through an alias binds nothing: require reds at the read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.load();"], ["namespace N {", "  export const require = (id: string): unknown => id;", "}", "namespace N {", "  export function load(): unknown {", "    const take = require;", '    return take("node:child_process");', "  }", "}"]) },
        findings: [globalAt(8, "require")],
      },
      {
        kind: "plant",
        id: "U-NS3bL",
        what: "refusal #3 NS3bL, the src-landable form byte-for-byte as the gate wrote it: the exported namespace N merged across two blocks, the second block reading require through an alias - red at the read (GLOBAL)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "export namespace N {",
            "  export const require = (id: string): unknown => id;",
            "}",
            "export namespace N {",
            "  export function load(): unknown {",
            "    const take = require;",
            '    return take("node:child_process");',
            "  }",
            "}",
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    void this.selected;",
            "    void N.load();",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(8, "require")],
      },
      {
        kind: "plant",
        id: "U-NS4",
        what: "refusal #3 NS4: a cross-block reference to an exported globalThis member binds nothing: globalThis reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.reach();"], ["namespace N {", "  export const globalThis = { process: 0 };", "}", "namespace N {", "  export function reach(): unknown {", "    return globalThis.process;", "  }", "}"]) },
        findings: [globalAt(8, "globalThis")],
      },
      {
        kind: "plant",
        id: "U-NS5",
        what: "refusal #3 NS5: an exported namespace merged across two blocks of a closure module: the second block's process.kill reds in that module (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { Ops } from "./ops.js";'], ["Ops.stop(this.selected);"]),
          "src/apo/ops.ts": ["export namespace Ops {", "  export const process = { kill(pid: number): void { void pid; } };", "}", "export namespace Ops {", "  export function stop(pid: number): void {", "    process.kill(pid);", "  }", "}", ""].join("\n"),
        },
        findings: [globalAt(6, "process", "src/apo/ops.ts")],
      },
      {
        kind: "plant",
        id: "U-NS6",
        what: "refusal #3 NS6: a dotted namespace merged across two blocks: the second block's process.kill reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["A.B.stop(this.selected);"], ["namespace A.B {", "  export const process = { kill(pid: number): void { void pid; } };", "}", "namespace A.B {", "  export function stop(pid: number): void {", "    process.kill(pid);", "  }", "}"]) },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-NS7",
        what: "refusal #3 NS7: a cross-block reference to an exported function member binds nothing: process reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.reach();"], ["namespace N {", "  export function process(): number {", "    return 0;", "  }", "}", "namespace N {", "  export function reach(): unknown {", "    return process;", "  }", "}"]) },
        findings: [globalAt(10, "process")],
      },
      {
        kind: "plant",
        id: "U-NS8",
        what: "refusal #3 NS8: a cross-block reference to an exported Function member binds nothing: the call reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.build();"], ["namespace N {", "  export const Function = (body: string): string => body;", "}", "namespace N {", "  export function build(): unknown {", '    return Function("return 1");', "  }", "}"]) },
        findings: [globalAt(8, "Function")],
      },
      {
        kind: "plant",
        id: "U-NS9",
        what: "refusal #3 control NS9 (red under both judges, held as a guard): a namespace merged with an enum never reaches the enum's member by its bare name: process reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["E.stop(this.selected);"], ["enum E {", '  process = Number("7"),', "}", "namespace E {", "  export function stop(pid: number): void {", "    (process as unknown as { kill(pid: number): void }).kill(pid);", "  }", "}"]) },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "U-NS10",
        what: "refusal #3 NS10: a function merged with a namespace of two blocks: the second block's process.kill reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["Ops.stop(this.selected);"], ["function Ops(): void {}", "namespace Ops {", "  export const process = { kill(pid: number): void { void pid; } };", "}", "namespace Ops {", "  export function stop(pid: number): void {", "    process.kill(pid);", "  }", "}"]) },
        findings: [globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "U-NS11",
        what: "refusal #3 NS11: the view's handler itself inside the second block of an exported namespace: its process.kill reds at the use (GLOBAL)",
        files: {
          [V]: [
            HOST,
            'export const VIEW_TITLE = "APO resource pressure";',
            "export namespace Panel {",
            "  export const process = { kill(pid: number): void { void pid; } };",
            "}",
            "export namespace Panel {",
            "  export class View {",
            "    private selected = 0;",
            "    constructor(private readonly host: Host) {}",
            "    handleInput(data: string): void {",
            "      void this.host;",
            "      void data;",
            "      process.kill(this.selected);",
            "    }",
            "  }",
            "}",
            "",
          ].join("\n"),
        },
        findings: [globalAt(13, "process")],
      },
      {
        kind: "plant",
        id: "U-NS-C1",
        what: "refusal #3 control NS-C1 (red under both judges, held as a guard): an unexported member is never in another block's scope: process reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["N.stop(this.selected);"], ["namespace N {", "  const process = { kill(pid: number): void { void pid; } };", "  void process;", "}", "namespace N {", "  export function stop(pid: number): void {", "    process.kill(pid);", "  }", "}"]) },
        findings: [globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "U-NS-C2",
        what: "refusal #3 control NS-C2: a reference inside the block that declares the member binds (the member is a const of that block's own function under jiti and tsc qualifies it): quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["N.stop(this.selected);"], ["namespace N {", "  export const process = { kill(pid: number): void { void pid; } };", "  export function stop(pid: number): void {", "    process.kill(pid);", "  }", "}"]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-NS-C3",
        what: "a reference inside a namespace nested in the block that declares the member binds (the nested block's function runs inside the declaring block's): quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["Outer.Inner.stop(this.selected);"], ["namespace Outer {", "  export const process = { kill(pid: number): void { void pid; } };", "  export namespace Inner {", "    export function stop(pid: number): void {", "      process.kill(pid);", "    }", "  }", "}"]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-NS-nested-cross",
        what: "the block that counts is the nearest one: an inner namespace merged across two blocks inside one outer block - the second inner block's process.kill reds at the use although the outer block encloses both (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["Outer.Inner.stop(this.selected);"], ["namespace Outer {", "  export namespace Inner {", "    export const process = { kill(pid: number): void { void pid; } };", "  }", "  export namespace Inner {", "    export function stop(pid: number): void {", "      process.kill(pid);", "    }", "  }", "}"]) },
        findings: [globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "U-NS-cross-forms",
        what: "every declaration kind a block exports binds nothing in another block: a shorthand property reading an exported class, and reads of an exported enum, namespace, function and import-equals alias each red at the use, while every own name stays quiet in its own block (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void Kit.use();"],
            [
              "namespace Other {",
              "  export const level = 1;",
              "}",
              "namespace Kit {",
              "  export class process {}",
              "  export enum fetch {",
              "    On,",
              "  }",
              "  export namespace Function {",
              "    export const level = 2;",
              "  }",
              "  export function require(): void {}",
              "  export import globalThis = Other.level;",
              "}",
              "namespace Kit {",
              "  export function use(): unknown {",
              "    void { process };",
              "    return [fetch, Function, require, globalThis];",
              "  }",
              "}",
            ],
          ),
        },
        findings: [globalAt(19, "process"), globalAt(20, "fetch"), globalAt(20, "Function"), globalAt(20, "require"), globalAt(20, "globalThis")],
      },
      {
        kind: "plant",
        id: "W-GK1-block-statement",
        what: "refusal #4 GK1's witness as the gate wrote it (GK1 applies GLOBAL (6) only to a reference inside a function-like): a cross-block reference in a block's top-level statement, outside every function-like, reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.done;"], ["namespace N {", "  export const process = { kill(pid: number): number { return pid; } };", "}", "namespace N {", "  export const done = process.kill(1);", "}"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "W-GK1-class-field",
        what: "refusal #4 GK1's second witness as the gate wrote it: a cross-block reference in a class field initializer, outside every function-like, reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new N.Panel();"], ["namespace N {", "  export const process = { kill(pid: number): number { return pid; } };", "}", "namespace N {", "  export class Panel {", "    readonly pid = process.kill(1);", "  }", "}"]) },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "G4-NS-reverse-order",
        what: "the refusal #4 gate's extra position (its plant as written): a block reading a member that a LATER block of the same namespace exports reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["N.go(this.selected);"], ["namespace N {", "  export function go(pid: number): void {", "    process.kill(pid);", "  }", "}", "namespace N {", "  export const process = { kill(pid: number): void { void pid; } };", "}"]) },
        findings: [globalAt(5, "process")],
      },
      {
        kind: "plant",
        id: "G4-NS-static-block",
        what: "the refusal #4 gate's extra position (its plant as written): a cross-block reference inside a class static block of the second block reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.C;"], ["namespace N {", "  export const process = { kill(pid: number): void { void pid; } };", "}", "namespace N {", "  export class C {", "    static {", "      process.kill(1);", "    }", "  }", "}"]) },
        findings: [globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "G4-NS-decorator-free",
        what: "the refusal #4 gate's extra position (its plant as written): a cross-block reference in an exported arrow of the second block reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.go;"], ["namespace N {", "  export const process = { kill(pid: number): void { void pid; } };", "}", "namespace N {", "  export const go = (): void => process.kill(2);", "}"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "NS-positions",
        what: "found by the wb-021.8 seat: a cross-block reference outside every function-like - in an enum member's initializer and in a destructuring default of the second block - reds at each use (GLOBAL; the seat's jiti 2.7.0 twins read the host's process in both)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.E.a;", "void N.pid;"], ["namespace N {", "  export const process = { pid: 1 };", "}", "namespace N {", "  export enum E {", "    a = process.pid,", "  }", "  export const { pid = process.pid } = {} as { pid?: number };", "}"]) },
        findings: [globalAt(8, "process"), globalAt(10, "process")],
      },
    ],
  },
  {
    id: "EN",
    label: "enum members (7): a member binds only its own name and a read after its declaration",
    pins: [
      {
        kind: "plant",
        id: "U-EN1",
        what: "the gate's EN1 (recorded for the claim scope): an enum member read by its bare name in a later member's initializer of the same declaration binds (jiti's enum transform and tsc each qualify it, the gate's readback: the shadow): quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.copy;"], ["enum E {", '  process = Number("7"),', "  copy = process,", "}"]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-EN2",
        what: "the gate's EN2: an enum member read by its bare name in a member's initializer of a second declaration of the same enum, at the same top level, binds (the gate's readback: the shadow on both emit paths): quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.copy;"], ["enum E {", '  process = Number("7"),', "}", "enum E {", "  copy = process,", "}"]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-EN-forward",
        what: "an enum member read by its bare name in an initializer BEFORE its own declaration binds nothing (GLOBAL (7)): jiti's enum transform qualifies only a member it has already read, so the forward read reads the host global (the seat's readback: process.pid a number) - red at the read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.a;"], ["enum E {", "  a = process as unknown as number,", "  process = 1,", "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "U-EN-forward-merged",
        what: "an enum member read by its bare name in an initializer of an earlier declaration of the same enum, before the declaration that holds it, binds nothing: red at the read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.a;"], ["enum E {", "  a = process as unknown as number,", "}", "enum E {", "  process = 1,", "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "U-EN-self",
        what: "an enum member read by its bare name inside its own initializer binds nothing (the transform has not yet read it there): red at the read, the member's own name quiet (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.process;"], ["enum E {", "  process = (process as unknown as { pid: number }).pid,", "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "W-GK3-namespace-enum-forward",
        what: "refusal #4 GK3's witness as the gate wrote it (GK3 applies GLOBAL (7) only to an enum at the module's top level): a forward read inside an enum a namespace block holds binds nothing: red at the read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.E.a;"], ["namespace N {", "  export enum E {", "    a = process as unknown as number,", "    process = 1,", "  }", "}"]) },
        findings: [globalAt(5, "process")],
      },
      {
        kind: "plant",
        id: "G4-EN-forward-nested-arrow",
        what: "the refusal #4 gate's extra position (its plant as written): a forward read inside an arrow that an earlier member's initializer calls binds nothing: red at the read (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.a;"], ["enum E {", "  a = (() => Number(String(process)))(),", '  process = Number("7"),', "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "G4-EN-string-name-after",
        what: "the refusal #4 gate's extra position (its plant as written): a bare read after a member named by a string literal binds (the seat's jiti 2.7.0 twin reads the member: typeof 'number'): quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.copy;"], ["enum E {", '  "process" = Number("7"),', "  copy = process,", "}"]) },
        findings: [],
      },
    ],
  },
  {
    id: "M",
    label: "the meta rule: import.meta reds wherever a value position reads it",
    pins: [
      {
        kind: "plant",
        id: "U-META1",
        what: "refusal #3 META1 (class U2): a write through import.meta reds at the meta-property (GLOBAL, the meta rule: the reader parses no meta-property key, and under Pi's jiti 2.7.0 loader import.meta.env is the host's process.env)",
        files: { [V]: view("APO resource pressure", [HOST], ["import.meta.env.APO_SELECTED = String(this.selected);"]) },
        findings: [globalAt(7, "import.meta")],
      },
      {
        kind: "plant",
        id: "U-META1L",
        what: "refusal #3 META1L, the src-landable form byte-for-byte as the gate wrote it: the write through a cast of import.meta reds at the meta-property (GLOBAL)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    (import.meta as unknown as { env: Record<string, string> }).env.APO_SELECTED = String(this.selected);",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(9, "import.meta")],
      },
      {
        kind: "plant",
        id: "U-meta-forms",
        what: "import.meta reds in every value position, whatever its key: an alias of the meta object, a key read and a call (GLOBAL), the alias's own name quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["const meta = import.meta;", "void meta;", "void import.meta.dirname;", 'void import.meta.resolve("./view.js");']) },
        findings: [globalAt(7, "import.meta"), globalAt(9, "import.meta"), globalAt(10, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-GK2-module-statement",
        what: "refusal #4 GK2's witness as the gate wrote it (GK2 applies the meta rule only inside a function-like): a write through import.meta in a module statement, outside every function-like, reds at the meta-property (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ['import.meta.env.APO_SELECTED = "x";']) },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-GK2-class-field",
        what: "refusal #4 GK2's second witness as the gate wrote it: import.meta read in a class field initializer, outside every function-like, reds at the meta-property (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new Probe();"], ["class Probe {", "  readonly env = import.meta.env;", "}"]) },
        findings: [globalAt(4, "import.meta")],
      },
      {
        kind: "plant",
        id: "M-positions",
        what: "found by the wb-021.8 seat: import.meta reds in an enum member's initializer and in a class static block (each outside every function-like) and in a parameter default (GLOBAL, the meta rule)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void E.a;", "void Probe;", "void reachEnv();"],
            ["enum E {", "  a = (import.meta as unknown as { length: number }).length,", "}", "class Probe {", "  static {", "    void import.meta.url;", "  }", "}", "function reachEnv(env = import.meta.env): unknown {", "  return env;", "}"],
          ),
        },
        findings: [globalAt(4, "import.meta"), globalAt(8, "import.meta"), globalAt(11, "import.meta")],
      },
    ],
  },
  {
    id: "I",
    label: "instantiation expressions: an expression with type arguments outside a heritage clause is a value, read through its expression",
    pins: [
      {
        kind: "plant",
        id: "U-IE1",
        what: "refusal #4 IE1 (class U1 of record, an instantiation expression; the gate's plant as written): a comma expression with type arguments is read through its expression - process and setTimeout red at the use, exactly as its control U-IE1c (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["(process.kill(this.selected), setTimeout)<[]>;"]) },
        findings: [globalAt(7, "process"), globalAt(7, "setTimeout")],
      },
      {
        kind: "plant",
        id: "U-IE1c",
        what: "refusal #4 IE1c, IE1's control without type arguments (the gate's plant as written; its record reads 2): process and setTimeout red at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["(process.kill(this.selected), setTimeout);"]) },
        findings: [globalAt(7, "process"), globalAt(7, "setTimeout")],
      },
      {
        kind: "plant",
        id: "U-IE2",
        what: "refusal #4 IE2 (the gate's plant as written): a cast of a fetch call with type arguments is read through its expression - fetch reds at the call, exactly as its control U-IE2c (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['(fetch("http://127.0.0.1:9/fake") as unknown as typeof pick)<void>;'], [PICK]) },
        findings: [globalAt(8, "fetch")],
      },
      {
        kind: "plant",
        id: "U-IE2c",
        what: "refusal #4 IE2c, IE2's control without type arguments (the gate's plant as written; its record reads 1): fetch reds at the call (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['(fetch("http://127.0.0.1:9/fake") as unknown as typeof pick);'], [PICK]) },
        findings: [globalAt(8, "fetch")],
      },
      {
        kind: "plant",
        id: "U-IE3",
        what: "refusal #4 IE3 (the gate's plant as written): an import.meta.env write inside an instantiation expression is read - import.meta reds at the meta-property, exactly as its control U-IE3c (GLOBAL, the meta rule)",
        files: { [V]: view("APO resource pressure", [HOST], ["((import.meta as unknown as { env: Record<string, string> }).env.APO_SELECTED = String(this.selected), pick)<void>;"], [PICK]) },
        findings: [globalAt(8, "import.meta")],
      },
      {
        kind: "plant",
        id: "U-IE3c",
        what: "refusal #4 IE3c, IE3's control without type arguments (the gate's plant as written; its record reads 1): import.meta reds at the meta-property (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["((import.meta as unknown as { env: Record<string, string> }).env.APO_SELECTED = String(this.selected), pick);"], [PICK]) },
        findings: [globalAt(8, "import.meta")],
      },
      {
        kind: "plant",
        id: "U-IE4",
        what: "refusal #4 IE4 (the gate's plant as written): a variable initialized by globalThis cast and instantiated is read through its expression - globalThis reds, exactly as its control U-IE4c (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const reach = (globalThis as unknown as typeof pick)<void>;", "void reach;"], [PICK]) },
        findings: [globalAt(8, "globalThis")],
      },
      {
        kind: "plant",
        id: "U-IE4c",
        what: "refusal #4 IE4c, IE4's control without type arguments (the gate's plant as written; its record reads 1): globalThis reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const reach = globalThis as unknown as typeof pick;", "void reach;"], [PICK]) },
        findings: [globalAt(8, "globalThis")],
      },
      {
        kind: "plant",
        id: "U-IE5",
        what: "refusal #4 IE5 (the gate's plant as written): a free name instantiated with type arguments is read - structuredClone reds, exactly as its control U-IE5c and the call U-IE5d (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const clone = structuredClone<number>;", "void clone;"]) },
        findings: [globalAt(7, "structuredClone")],
      },
      {
        kind: "plant",
        id: "U-IE5c",
        what: "refusal #4 IE5c, IE5's control without type arguments (the gate's plant as written; its record reads 1): structuredClone reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const clone = structuredClone;", "void clone;"]) },
        findings: [globalAt(7, "structuredClone")],
      },
      {
        kind: "plant",
        id: "U-IE5d",
        what: "refusal #4 IE5d, a call with type arguments (the gate's plant as written; its record reads 1): the callee structuredClone reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void structuredClone<number>(1);"]) },
        findings: [globalAt(7, "structuredClone")],
      },
      {
        kind: "plant",
        id: "U-IE6",
        what: "refusal #4 IE6 (the gate's plant as written): the code constructor Function cast and instantiated is read through its expression - Function reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["const make = (Function as unknown as typeof pick)<string>;", 'void make("return 1");'], [PICK]) },
        findings: [globalAt(8, "Function")],
      },
      {
        kind: "plant",
        id: "U-IE7",
        what: "refusal #4 IE7 (the gate's plant as written): an instantiation expression in a second module the view imports is read there - process reds in src/apo/ops.ts at the call (GLOBAL)",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { stop } from "./ops.js";'], ["stop(this.selected);"]),
          "src/apo/ops.ts": [PICK, "export function stop(pid: number): void {", "  (process.kill(pid) as unknown as typeof pick)<void>;", "}", ""].join("\n"),
        },
        findings: [globalAt(3, "process", "src/apo/ops.ts")],
      },
      {
        kind: "plant",
        id: "U-IE8",
        what: "refusal #4 IE8 (the gate's plant as written; its record reads 'GLOBAL require unread'): a require call cast and instantiated is read through its expression - require reds as a free name (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ['(require("node:child_process") as unknown as typeof pick)<void>;'], [PICK]) },
        findings: [globalAt(8, "require")],
      },
      {
        kind: "plant",
        id: "U-IE9",
        what: "refusal #4 IE9 (the gate's plant as written): eval cast and instantiated is read through its expression - eval reds (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["(eval as unknown as typeof pick)<string>;"], [PICK]) },
        findings: [globalAt(8, "eval")],
      },
      {
        kind: "plant",
        id: "U-IE10",
        what: "refusal #4 IE10, the src-landable form byte-for-byte as the gate wrote it (the gate measured tsc -p tsconfig.json rc 0 and biome rc 0 on it): the handler's real process.kill inside an instantiation expression reds at the call (GLOBAL)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "const pick = <T,>(value: T): T => value;",
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    (process.kill(this.selected) as unknown as typeof pick)<void>;",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(10, "process")],
      },
      {
        kind: "plant",
        id: "U-IE11",
        what: "refusal #4 IE11, the src-landable form byte-for-byte as the gate wrote it: the handler's real fetch inside an instantiation expression reds at the call (GLOBAL)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "const pick = <T,>(value: T): T => value;",
            "export class View {",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            `    (fetch(\`http://127.0.0.1:9/\${data}\`) as unknown as typeof pick)<void>;`,
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(8, "fetch")],
      },
      {
        kind: "plant",
        id: "U-IE12",
        what: "refusal #4 IE12, the src-landable form byte-for-byte as the gate wrote it: an Object.assign into import.meta.env inside an instantiation expression reds at the meta-property (GLOBAL, the meta rule)",
        files: {
          [V]: [
            'import type { Host } from "./host.js";',
            'export const VIEW_TITLE = "APO resource pressure";',
            "const pick = <T,>(value: T): T => value;",
            "export class View {",
            "  private selected = 0;",
            "  constructor(private readonly host: Host) {}",
            "  handleInput(data: string): void {",
            "    void this.host;",
            "    void data;",
            "    (Object.assign((import.meta as unknown as { env: Record<string, string> }).env, { APO_SELECTED: String(this.selected) }) as unknown as typeof pick)<void>;",
            "  }",
            "}",
            "",
          ].join("\n"),
          "src/apo/host.ts": LANDABLE_HOST,
        },
        findings: [globalAt(10, "import.meta")],
      },
      {
        kind: "plant",
        id: "I-forms",
        what: "found by the wb-021.8 seat: an instantiation expression is read through its expression in an export default, a return, a property access's initializer, a call argument and an optional chain - structuredClone, globalThis, process, fetch and process red, each at its line (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["const kill = process.kill<number>;", "void kill;", "void String(fetch<string>);", "void process?.kill<number>;"],
            ["export default structuredClone<number>;", "export function reach(): unknown {", "  return globalThis<number>;", "}"],
          ),
        },
        findings: [globalAt(3, "structuredClone"), globalAt(5, "globalThis"), globalAt(11, "process"), globalAt(13, "fetch"), globalAt(14, "process")],
      },
      {
        kind: "plant",
        id: "I-heritage",
        what: "found by the wb-021.8 seat: in a heritage clause an expression with type arguments keeps its reading - a class's extends expression is a value, its type arguments erased (Worker reds, its typeof fetch type argument stays quiet), and an implements clause is a type position, erased (process, read there only as a type, stays quiet) (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new Panel();", "void Sealed;"], ["class Panel extends Worker<typeof fetch> {}", "class Sealed implements process.Shape<number> {}"]) },
        findings: [globalAt(3, "Worker")],
      },
      {
        kind: "plant",
        id: "I-positions",
        what: "found by the wb-021.8 seat: an instantiation expression is read in a parameter default, a class field, a class static block, a class expression's extends clause, nested inside another one and in a template span - structuredClone, fetch, globalThis, process, fetch and structuredClone red, each at its line (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void positioned(1);", "void new Field();", "void Shell;", "void ((fetch<string>) as unknown as typeof pick)<void>;", `void \`\${structuredClone<number>}\`;`],
            [
              PICK,
              "function positioned(level = structuredClone<number>): unknown {",
              "  return level;",
              "}",
              "class Field {",
              "  readonly reach = fetch<string>;",
              "  static {",
              "    void globalThis<number>;",
              "  }",
              "}",
              "const Shell = class extends (process.kill as unknown as typeof pick)<void> {};",
            ],
          ),
        },
        findings: [globalAt(4, "structuredClone"), globalAt(8, "fetch"), globalAt(10, "globalThis"), globalAt(13, "process"), globalAt(21, "fetch"), globalAt(22, "structuredClone")],
      },
      {
        kind: "plant",
        id: "I-cross-block",
        what: "found by the wb-021.8 seat: inside an instantiation expression the namespace-block rule (6) holds - a cross-block reference reds at the use, a same-block one binds (the seat's jiti 2.7.0 twin reads the member there) (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [N.near, N.go];"],
            [PICK, "namespace N {", "  export const process = { kill(pid: number): number { return pid; } };", "  export const near = (process.kill as unknown as typeof pick)<void>;", "}", "namespace N {", "  export const go = (process.kill as unknown as typeof pick)<void>;", "}"],
          ),
        },
        findings: [globalAt(9, "process")],
      },
      {
        kind: "plant",
        id: "I-type-arguments",
        what: "found by the wb-021.8 seat: type arguments are erased - a typeof type argument of a call and of an instantiation expression names process and fetch only as types: quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["void pick<typeof process>(this.selected as never);", "const typed = pick<typeof fetch>;", "void typed;"], [PICK]) },
        findings: [],
      },
    ],
  },
  {
    id: "J",
    label: "the judge mutants of record, each killed by its witness",
    pins: [
      {
        kind: "plant",
        id: "U-GJ1",
        what: "refusal #3 U3 mutant GJ1's kill, its witness W-GJ1 as the gate wrote it: a wrapper name declared inside an arrow, an object method and a function expression is a fresh binding of that function, not a module-scope one: quiet",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [fresh, method, built];"],
            [
              "const fresh = (): unknown => {",
              "  var require: unknown;",
              "  return require;",
              "};",
              "const method = {",
              "  run(): unknown {",
              "    var module: unknown;",
              "    return module;",
              "  },",
              "};",
              "const built = function (): unknown {",
              "  var exports: unknown;",
              "  return exports;",
              "};",
            ],
          ),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-wrapper-scopes",
        what: "a wrapper name declared inside a constructor, a class method, a getter and a setter is a fresh binding of that function: quiet",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void new Scopes();"],
            [
              "class Scopes {",
              "  constructor() {",
              "    var __filename: unknown;",
              "    void __filename;",
              "  }",
              "  run(): unknown {",
              "    var __dirname: unknown;",
              "    return __dirname;",
              "  }",
              "  get value(): unknown {",
              "    var jitiImport: unknown;",
              "    return jitiImport;",
              "  }",
              "  set value(input: unknown) {",
              "    var jitiESMResolve: unknown = input;",
              "    void jitiESMResolve;",
              "  }",
              "}",
            ],
          ),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-GJ4",
        what: "refusal #3 U3 mutant GJ4's kill, its witness W-GJ4 as the gate wrote it: an ambient declaration binds nothing, its members' own names included (the ambient rule is read before the member rule): the declare class's member process reds at its own name (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["declare class Array {", "  process: number;", "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "U-GJ15",
        what: "refusal #3 U3 mutant GJ15's kill, its witness W-GJ15 as the gate wrote it: an enclosing ambient context counts at any depth: a const three namespaces under a string-named module reds at its own name (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ['declare module "shim" {', "  namespace Array {", "    namespace Math {", "      const process: number;", "    }", "  }", "}"]) },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "U-GJ16",
        what: "refusal #3 U3 mutant GJ16's kill, its witness W-GJ16 as the gate wrote it: a dotted namespace binds only through its innermost body, so one whose innermost body is empty binds nothing: process reds at the declaration and at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["process.kill(this.selected);"], ["namespace process.Array {}"]) },
        findings: [globalAt(3, "process"), globalAt(8, "process")],
      },
    ],
  },
  {
    id: "Q",
    label: "the named residuals",
    pins: [
      {
        kind: "plant",
        id: "R-FIELD-MUTATION",
        what: "a write into a handed-in object's or an admitted built-in's fields or collections stays quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["this.host.revision = 0;", "this.host.nodes.clear();", "delete this.host.cache;", "Array.prototype.push = (): number => 0;"]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-REFLECTIVE-REACH",
        what: "a code constructor reached by reflection over an admitted built-in with a computed key stays quiet",
        files: {
          [V]: view("APO resource pressure", [HOST], ["const proto = Object.getPrototypeOf(() => 0);", "const key = Object.getOwnPropertyNames(proto)[this.selected];", "void proto[key];"]),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-UNLINKED-IMPORT",
        what: "a value import of a name its relative target does not export binds in the importer by its own declaration (the reader never checks the target's exports): its use stays quiet - at run time it reads undefined under jiti and tsc's CommonJS emit and fails to link under ESM, never reaching a host global",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import { process } from "./ops.js";'], ["process.kill(this.selected);"]),
          "src/apo/ops.ts": ["export const level = 0;", ""].join("\n"),
        },
        findings: [],
      },
    ],
  },
];

/** Refusal #1's U1 members of record (wb-021.2's notes), each cured by the row R pin named. */
export const REFUSAL_1_CURES: Readonly<Record<string, string>> = { G01: "R-script-var", G01b: "R-script-require", G01c: "R-script-function", G01d: "R-script-typed", G02: "R-dts-script" };

/** The named residual families: one per row Q pin, each its own pinned quiet row. */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries((ROWS.find(row => row.id === "Q")?.pins ?? []).map(pin => [pin.id, [`Q ${pin.id}`]]));

export const titleOf = (row: Row, pin: PlantPin): string => `${row.id} ${pin.id}`;
