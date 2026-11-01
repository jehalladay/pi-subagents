/**
 * wb-021.8 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2, the rule-19 structural-exit child of wb-021.2; rulings R-B134 and
 * R-B166): THE GLOBAL BINDING READER of the APO snapshot census, in a helper of its own, with its tables and plants.
 * The falsifier census over it is test/workbench-apo-snapshot-global-reader-census.test.ts (its header states the
 * pinned set it claims); its roster is test/fixtures/apo-snapshot-global-reader-roster.json. One module, so the census
 * and its roster are written from the same rows. The reader is wb-021.2 cut #4's (2f053186,
 * test/helpers/apo-snapshot-census.ts :319-510) with one reading added - instantiation expressions, below - and its
 * view-census readings (views, closures, EFFECT, PACKAGE, UNRESOLVED, UNREADABLE, CONSTRUCTOR, the seams) left in
 * wb-021.2's census, which is not on trunk; wb-021.2's eventual re-cut restates its census over this reader (R-B166).
 * This bead's cut #2 answered its refusal #1 (UNMET U1-U7) with pins and narrowed claim words. Cut #3 answers its refusal
 * #2 (UNMET U1-U3, the collapsed-slot members of that class; ruling R-B268: the class frozen, this cut in the
 * enumerate-the-resolvable form) with refusal #2's gate witnesses, a split pin for each collapsed GLOBAL line
 * (COLLAPSED_SPLITS) and the census's collapse guard; the reader's code is cut #1's, byte for byte.
 *
 * WHAT THE READER RETURNS. judgeGlobals reads each file of a tree as one module of one TypeScript program (noLib,
 * noResolve, the checker over exactly those files) and returns one line `GLOBAL <file>:<line> <name>` per free name of
 * each module, sorted and unique. A free name is a closure identifier - a reference or a declaration's own name - that
 * names no RUN-TIME binding of its own module and is outside ADMITTED_FREE; import.meta is read as the free name
 * import.meta (the meta rule).
 * CLAIM SCOPE. Each reading below is claimed for the forms and positions its pins hold, and no wider: the pins named in
 * parentheses, each pin's message naming its own plant (rows F, R, U, NS, EN, M, I, J and Q of ROWS). Where a reading
 * describes a rule of the reader's code, the description is of the code and the census claims the rule at the pinned
 * forms. A form or a position no pin holds is NOT CLAIMED by this census.
 * ONE READING PER LINE (refusal #2's class). A GLOBAL line is the census's observable, so two readings of one name on one
 * line are falsified together and never alone; a reading is claimed at a position where a pin holds it as the one
 * reading of its name on its line. The eight pins COLLAPSED_SPLITS lists hold a line with two (W-G14-M10, W-G14-M20,
 * W-G14-I5, W-G14-R34, W-G14-E7, U-wrapper-forms, U-wrapper-imports and U-EN-self): each is claimed at that line as a
 * line, and its readings are claimed at their positions through its split S-<pin>, the same program token for token
 * with line breaks added, each reading on a line of its own (the census's collapse guard holds the list, the token
 * identity and one reading per line for every other pin).
 *
 * FREE NAMES (row F). Each ADMITTED_FREE name read once reads quiet (V-admitted-free, whose list the census holds to
 * ADMITTED_FREE in order); process, fetch, Function, eval, globalThis, global and the module-wrapper names require,
 * module, exports, __filename, __dirname, jitiImport and jitiESMResolve each red as planted (Z-global-process,
 * Z-global-fetch, Z-global-code, Z-global-this, Z-global-wrapper).
 * MODULE RULES (row R). A name binds where the checker resolves it to a symbol one of whose declarations is (1) in the
 * name's own module, the same source file: a script's top-level declarations are read by TypeScript as global, so the
 * pinned names of another module that resolve to one bind nothing (R-script-var, R-script-typed, R-script-function,
 * R-script-require, U-GP16, each red at the reading module), of a module that is (2) an ES module (ts.isExternalModule:
 * one with an import or an export; the pinned scripts bind nothing, their own names included: the same pins, each red
 * in the script) and (3) not a declaration file (R-dts-module, red in the .d.ts; R-dts-script, red in the .d.ts and at
 * the use). A free name in a second module reds there (R-closure-global).
 * THE NAMES READ (refusal #1's U7). The reader reads an identifier outside type positions at the positions the pins
 * plant one: the 33 statement and expression positions R-names-read-positions names (one line each, an array spread to
 * an array binding pattern's default), a class decorator's expression (W-G14-V1) and the positions each other pin's
 * message names. The pinned interfaces and type aliases (R-types-erased) and type-only imports and exports
 * (R-type-only-erased) are erased and stay quiet, and an implements clause holds type positions alone (I-heritage); a
 * property name, a qualified name's right side, a binding element's property name, an import specifier's imported name,
 * an export-from specifier, a label, new.target's name and an import attribute's name are not references
 * (R-not-references); a shorthand property reads its value (R-shorthand, U-alias-reads-bound) and a local export
 * specifier its local name (R-export-local, and a re-exported named import in U-alias-reads-bound); a class's extends
 * expression is a value, for a class declaration and a class expression alike (R-extends), its type arguments erased
 * (I-heritage); an enum member's initializer is read (R-enum-initializer); and the pinned names are read by nameOf
 * (R-global-escaped). The one binding without a declaration is the function's own arguments object, which the checker
 * resolves inside a non-arrow function, an arrow inheriting it from the function around it (R-arguments: at the
 * module's top level and in a top-level arrow arguments is free). The checker resolves a value use to a declaration
 * with a value meaning, so the pinned import and import-equals aliases whose target is no value and the pinned
 * uninstantiated namespaces are passed over and a value use of each reds (R-non-value-alias); the pinned type-only
 * imports bind nothing (R-type-only-value); the pinned ambient declarations bind nothing (R-ambient); a function
 * declaration without a body binds nothing, an overload binding through its implementation (R-bodiless); and a const
 * enum binds nothing while a plain enum binds (R-const-enum).
 * THE BINDING ALLOWLIST AND THE WRAPPER NAMES (row U). (4) The reader's code binds a declaration through an allowlist
 * of the declaration kinds that EMIT A BINDING (emitsBinding), the kinds outside it binding nothing (fail-closed); the
 * census claims the allowlist at these pinned forms. They bind: a variable and a binding element of one (two patterns
 * deep in W-G14-B3), a parameter of a function-like with a body and a binding element of one, a function declaration
 * with a body, a function expression's and a class expression's own name, a class, a non-const enum, a namespace that
 * binds, a value import - default, named, namespace and import-equals - and a catch variable, none of them ambient
 * (U-binds-values); and the own names of the members and type parameters U-binds-members holds, with an object-literal
 * setter's (W-G14-MN), are read and quiet. They bind nothing: an ambient declaration under a declare modifier, its own
 * or an enclosing one's (U-GC1, U-GP15, U-GC2), or inside a module declaration named by a string literal
 * (U-string-module); a parameter of a function-like without a body (U-signature-parameters); an export as namespace
 * declaration (U-umd-export). A symbol merges same-named declarations of one scope: the pinned emitting declarations
 * merged with a companion bind through themselves (U-binds-merged), while the pinned ambient or bodiless values merged
 * with an interface or a type alias bind nothing, red at their declaration and at the use - refusal #2's members U-GP1,
 * U-GP1L (the src-landable form), U-GP2, U-GP5, U-GP7 (in a second module), U-GP8, U-GP8b, U-GP10, U-GP11, U-GP12,
 * U-GP13, U-GP14 and U-GP17, the gate's killed U-GP6 (a parameter initializer resolves outside the function body; U-GC3
 * its control) and the cut #3 seat's U-default-interface, U-ambient-let-type, U-depth-two (a third module),
 * U-ambient-function-interface and U-ambient-namespace-interface. A NAMESPACE that is not ambient binds when its body
 * holds a statement that emits a binding - the pinned ones: a variable statement, a function declaration with a body, a
 * class, a non-const enum or a namespace that binds, as the first statement or after an interface (W-G14-N8) - a dotted
 * one through its innermost body (U-namespace-binds; U-GJ16 in row J); the pinned contents that emit nothing - an empty
 * body, types, const enums, ambient members, bodiless functions, a void 0 statement, a namespace that binds nothing
 * (U-namespace-unbound) and an import-equals alias (W-G14-N10, refusal #1's U5) - leave the namespace's own name red at
 * the declaration as well as at the use, and so does each pinned merge of one with a value that emits nothing (U-GP3,
 * U-GP3b, U-GP4, U-GP4b, U-GP9, U-const-enum-companion, U-ambient-class-namespace). (5) WRAPPER NAMES (refusal #1's
 * U6): these pinned module-scope declarations (no function-like, class static block or namespace body encloses them;
 * one in a top-level block counts) of a name in WRAPPER_NAMES - a CommonJS module wrapper's parameters exports,
 * require, module, __filename, __dirname, jitiImport and jitiESMResolve (jiti 2.7.0's wrapper, Pi's extension loader)
 * and the wrapper's own arguments - bind nothing: a var (U-wrapper-var); a var with a self initializer, an enum, an
 * instantiated namespace, a function declaration, a let, a class and a var in a top-level block (U-wrapper-forms; the
 * self-initialized var's line split by S-U-wrapper-forms); a const (W-G14-E15) and a destructured const (W-G14-E7; its
 * declaration line, the destructured name red and the initializer's same-named key quiet, split by S-W-G14-E7); a named,
 * a default, a namespace and an import-equals import, a catch variable and an array-destructured const
 * (U-wrapper-imports; the catch variable's line split by S-U-wrapper-imports); a function declaration in a top-level block, a
 * function declaration in a case clause, a class in a default clause and a dotted namespace's inner name
 * (U-wrapper-statements). Under the wrapper the var forms keep the wrapper's value; the other pinned forms are the
 * reader's conservative reading (fresh bindings at run time, held red). The pinned declarations of a wrapper name
 * inside a function-like, a namespace body or a class static block are fresh bindings and bind (U-wrapper-forms,
 * U-wrapper-scopes and U-GJ1 in row J).
 * NAMESPACE BLOCKS (row NS; wb-021.8's NS, refusal #3's class U1, refusal #1's U2). (6) The reader's code binds a
 * declaration that a namespace body holds - the nearest body around it - for a reference inside that body (reaches);
 * the checker merges the blocks of a namespace, so a reference in one block resolves to a member another block exports,
 * while jiti 2.7.0, Pi's extension loader, compiles each block to a function of its own holding the member as its own
 * const, and the reference, left unqualified, reads the host global (the gate's readback at refusal #3; tsc's emit
 * qualifies it, and the reader reads Pi's loader). The census claims the rule at these pinned reference positions and
 * declaration kinds, a reference from another block red at the use: refusal #3's members U-NS1, U-NS1L (the
 * src-landable form), U-NS2, U-NS3bL (the src-landable form, through an alias), U-NS4, U-NS5 (in a second module),
 * U-NS6 (dotted), U-NS7 (a function member), U-NS8, U-NS10 (a function merged with the namespace) and U-NS11 (the class
 * inside a block); the refusal #3 gate's U-NS3 and U-NS3b (a require member, called and read through an alias); a
 * shorthand property reading an exported class and reads of an exported enum, namespace, function and import-equals
 * alias (U-NS-cross-forms); an inner namespace's second block inside one outer block (U-NS-nested-cross: the nearest
 * body counts); a block's top-level statement and a class field initializer (W-GK1-block-statement and
 * W-GK1-class-field: refusal #4's GK1 witnesses, with no function-like around them); the refusal #4 gate's extra
 * positions - a block reading a member a LATER block declares (G4-NS-reverse-order), a class static block
 * (G4-NS-static-block) and an arrow initializer (G4-NS-decorator-free); the cut #1 seat's NS-positions, an enum
 * member's initializer and a destructuring default of the second block; refusal #1's thirteen U2 members, each its gate
 * witness - a destructured member (W-G14-R12), a new callee (W-G14-R24), binary operands (W-G14-R27), an element access
 * (W-G14-R28), a template span (W-G14-R29), a typeof operand (W-G14-R30), a spread (W-G14-R31), a conditional
 * (W-G14-R34, claimed at its line: its condition and its whenTrue branch read one name), a constructor (W-G14-R36), a
 * getter (W-G14-R37), a function expression (W-G14-R38), a parameter default (W-G14-R39) and a decorator (W-G14-R40);
 * refusal #2's two U3 members, each its gate witness - a conditional's condition (W-G7-N1) and its whenTrue branch
 * (W-G7-N2) - and W-G14-R34's split S-W-G14-R34 (its condition, whenTrue branch and whenFalse branch, one line each);
 * and the cut #2 seat's NS-positions-2 (26 positions), NS-contexts (47 parent
 * and ancestor kinds) and NS-import-equals-namespace, each position named in its pin's message. A reference inside the
 * declaring body (U-NS-C2) or inside a namespace nested in it (U-NS-C3) binds. An unexported member of the first block
 * (U-NS-C1) and an enum's member read from a namespace merged with the enum (U-NS9) red as free names. A reference
 * position or a declaration kind no row NS pin holds is NOT CLAIMED by this census.
 * ENUM MEMBERS (row EN; refusal #1's U4). (7) The reader's code binds an enum member for its own name and a reference
 * after the member's declaration, and a reference before it or inside its own initializer binds nothing - jiti's enum
 * transform qualifies a bare member name once it has read that member (the seat's readback). The census claims the rule
 * at these pinned reads: a forward read as an as-cast operand (U-EN-forward), in an earlier declaration of the same
 * enum (U-EN-forward-merged), inside the member's own initializer (U-EN-self, claimed at its line; its split
 * S-U-EN-self holds the member's own name quiet and the read red, one line each), inside an enum a namespace block holds
 * (W-GK3-namespace-enum-forward: refusal #4's GK3 witness), inside an arrow an earlier initializer calls
 * (G4-EN-forward-nested-arrow), refusal #1's four U4 members - a forward read before a member named by a string literal
 * (W-G14-R5), as a property receiver (W-G14-R5c), as a binary operand (W-G14-R5e) and as the whole initializer
 * (W-G14-R5f) - the cut #2 seat's EN-forward-positions (nine operand positions), EN-contexts (56 parent and ancestor
 * kinds, one member each) and EN-second-module (a forward read in a second module), each red; and a read after the
 * member binds, in the same declaration (U-EN1), in a later declaration at the same top level (U-EN2) and after a
 * member named by a string literal (G4-EN-string-name-after; the seat's jiti 2.7.0 twin reads the member, typeof
 * 'number'). A read form no row EN pin holds is NOT CLAIMED by this census.
 * THE META RULE (row M; wb-021.8's META, refusal #3's class U2, refusal #1's U1). The reader parses no meta-property
 * key and reads import.meta itself as the free name import.meta at the meta-property; under Pi's jiti 2.7.0 loader
 * import.meta.env is the host's process.env (the gate's readback at refusal #3). The census claims the rule at these
 * pinned positions: a write (U-META1, and U-META1L, the src-landable form through a cast), an alias of the meta object,
 * a key read and a call (U-meta-forms), a module statement and a class field initializer (W-GK2-module-statement and
 * W-GK2-class-field: refusal #4's GK2 witnesses, with no function-like around them), an enum member's initializer, a
 * class static block and a parameter default (M-positions), a key read inside a handler (R-not-references) and inside
 * an instantiation expression (U-IE3, U-IE12); refusal #1's ten U1 members, each its gate witness - a typeof operand
 * (W-G14-M4), a return operand (W-G14-M5), an arrow's concise body (W-G14-M6), an array element (W-G14-M9), a binary
 * expression's two operands on one line (W-G14-M10, claimed at its line), an arrow's block body (W-G14-M11), a second
 * module (W-G14-M15), a function expression (W-G14-M16), a getter (W-G14-M17) and a conditional's two branches on one
 * line (W-G14-M20, claimed at its line); refusal #2's three U1 members, each its gate witness - a binary expression's
 * left operand (W-G7-M1), a conditional's whenTrue branch (W-G7-M2) and its whenFalse branch (W-G7-M3) - and the splits
 * S-W-G14-M10 (the left and the right operand of ===) and S-W-G14-M20 (the whenTrue and the whenFalse branch), one line
 * each; and the cut #2 seat's M-positions-2 (39
 * positions) and M-contexts (46 parent and ancestor kinds), each position named in its pin's message. A position no row
 * M pin holds is NOT CLAIMED by this census.
 * INSTANTIATION EXPRESSIONS (row I; refusal #4's class U1, folded into this bead by R-B166; refusal #1's U3). An
 * ExpressionWithTypeArguments outside a heritage clause - an instantiation expression, TypeScript 4.7's f<T> - holds a
 * run-time value: tsc and Pi's jiti 2.7.0 strip its type arguments and run its expression (the gate's twins at refusal
 * #4; the seat's readbacks: TypeScript 6.0.3's transpileModule emits the expression alone under CommonJS and ESNext,
 * and a jiti 2.7.0 twin read typeof process 'object' through one), so the reader's code reads its expression and erases
 * its type arguments, where TypeScript 6.0.3's ts.isTypeNode answers true for the node and cut #4 read nothing inside
 * it (of the kinds ts.isTypeNode accepts in 6.0.3 - the type nodes, the keyword types, ExpressionWithTypeArguments and
 * the JSDoc types - it is the one that holds a value). The census claims the reading at these pinned positions, each
 * red exactly as planted: a comma expression (U-IE1), a cast (U-IE2, U-IE6, U-IE8, U-IE9 and the src-landable U-IE10
 * and U-IE11), the meta rule's write through a cast (U-IE3, and the src-landable U-IE12), a variable initializer
 * (U-IE4, U-IE5), a second module (U-IE7), a property access, a call argument, an export default, a return and an
 * optional chain (I-forms), and a parameter default, a class field, a class static block, a class expression's extends
 * clause, a nested instantiation and a template span (I-positions), U-IE1 to U-IE5 each exactly as its control without
 * type arguments reads (U-IE1c, U-IE2c, U-IE3c, U-IE4c, U-IE5c) and U-IE5 as a call with type arguments reads (U-IE5d);
 * refusal #1's fourteen U3 members, each its gate witness - an arrow's concise body (W-G14-I1), an array element
 * (W-G14-I2), a property value (W-G14-I3), a conditional's two branches on one line (W-G14-I5, claimed at its line),
 * an await operand (W-G14-I7), a typeof
 * operand (W-G14-I8), a cast operand (W-G14-I9), a property receiver (W-G14-I10), a new argument (W-G14-I12), an
 * arrow's block body (W-G14-I14), an enum member's initializer (W-G14-I15), a destructuring default (W-G14-I16), a
 * throw operand (W-G14-I17) and a class decorator (W-G14-I18); refusal #2's two U2 members, each its gate witness - a
 * conditional's whenTrue branch (W-G7-I1) and its whenFalse branch (W-G7-I2) - W-G14-I5's split S-W-G14-I5 (its two
 * branches, one line each) and an optional call's callee (W-G14-I11: refusal #1's edit G14-I11, refusal #2's F1 rider;
 * TypeScript 6.0.3 parses structuredClone<string>?.("x") with no diagnostic as an optional call whose callee is the
 * instantiation expression); and the cut #2 seat's I-positions-2 (23 positions) and
 * I-contexts (42 parent and ancestor kinds), each position named in its pin's message. The namespace-block rule (6)
 * holds inside one, a cross-block reference red and a same-block one bound (I-cross-block; the seat's jiti twin reads
 * the member); its type arguments are erased, a typeof type argument quiet (I-type-arguments); a class's extends clause
 * keeps reading its expression with type arguments, and an implements clause stays a type position (I-heritage). A
 * position no row I pin holds is NOT CLAIMED by this census.
 * JUDGE MUTANTS (row J). Refusal #3's GJ1 (the wrapper rule's scope test seeing function declarations alone), GJ4
 * (member names judged before the ambient test), GJ15 (the ambient walk stopping five nodes up) and GJ16 (its mutant
 * reader binding a dotted namespace with an empty innermost body) are each killed by its witness, held byte-for-byte:
 * U-GJ1 (quiet), U-GJ4, U-GJ15 and U-GJ16 (each red), with U-wrapper-scopes (quiet) beside U-GJ1; refusal #4's GK1, GK2
 * and GK3 by their witnesses in rows NS, EN and M; refusal #1's 48 named members of record (the 45 of U1-U7 and the
 * three F1 rides) by the W-G14-* witnesses of rows R, U, NS, EN, M and I; refusal #2's seven named members of record
 * (U1 G7-M1, G7-M2 and G7-M3, U2 G7-I1 and G7-I2, U3 G7-N1 and G7-N2) by the W-G7-* witnesses of rows M, I and NS, with
 * the splits, and its F1 rider G14-I11 by W-G14-I11.
 * NOT CLAIMED (scope sentences): a form or a position no pin holds is NOT CLAIMED by this census; member reads are NOT
 * CLAIMED by this census - the reader reads free names and not the members of a value, so a reach or a write through a
 * member (a function value's constructor among them) reads quiet unless a free name on its path reds (the residuals
 * R-FIELD-MUTATION and R-REFLECTIVE-REACH pin two such forms through admitted built-ins); a form TypeScript parses only
 * under error recovery (a grammar error, such as an expression as an import's or an export's module specifier) is NOT
 * CLAIMED by this census; the internals of any package and the view census's other readings (wb-021.2's views,
 * closures, EFFECT, PACKAGE, UNRESOLVED, UNREADABLE, CONSTRUCTOR and seams) are NOT CLAIMED by this census; any code
 * outside a planted tree is NOT CLAIMED by this census.
 * RESIDUALS (named, each with its pinned quiet row in row Q): R-FIELD-MUTATION (a write into an admitted built-in's
 * fields reads quiet: the reader reads the admitted name and not its members), R-REFLECTIVE-REACH (a code constructor
 * reached by reflection over an admitted built-in with a computed key reads quiet), R-UNLINKED-IMPORT (an import's own
 * declaration binds whether or not its relative target exports the name: the reader does not check a target's exports;
 * at run time such an import reads undefined under jiti and tsc's CommonJS emit and fails to link under ESM, not a host
 * global).
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

/** An identifier that names a property, a label or a meta-property rather than a binding: not a free-name reference. */
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
 * arguments object. The reader's code binds a module-scope declaration of one to nothing; the census claims this for the
 * declaration forms the module header's WRAPPER NAMES (5) names.
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
/** The declaration kinds whose own name is a member key or a type parameter: not a module binding and not a value reference's target, so the own name is read and quiet (the pinned forms: U-binds-members and W-G14-MN). */
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

/** Whether a parameter emits a binding: the function-like it belongs to has a body (a signature without a body - an overload, an abstract method, an index or call signature - is erased; a getter takes no parameter). */
function parameterEmits(parameter: ts.ParameterDeclaration): boolean {
  const owner = parameter.parent;
  if (ts.isArrowFunction(owner) || ts.isFunctionExpression(owner)) return true;
  return (ts.isFunctionDeclaration(owner) || ts.isMethodDeclaration(owner) || ts.isConstructorDeclaration(owner) || ts.isSetAccessorDeclaration(owner)) && owner.body !== undefined;
}

/** The variable declaration or parameter a binding element destructures, through the enclosing binding patterns (two deep in W-G14-B3). */
function bindingRoot(element: ts.BindingElement): ts.Node {
  let current: ts.Node = element;
  while (ts.isBindingElement(current) || ts.isObjectBindingPattern(current) || ts.isArrayBindingPattern(current)) current = current.parent;
  return current;
}

/**
 * Whether a namespace that is not ambient (its callers refuse an ambient one: emitsBinding and the statement check below)
 * emits a run-time binding (see the module header: GLOBAL (4)): its body holds a statement that emits one - a variable
 * statement, a function declaration with a body, a class, a non-const enum or a namespace that binds, none of them
 * ambient; a dotted namespace binds through its inner one. Content of another kind binds nothing (fail-closed); the census
 * claims this for the contents the module header's (4) names: an empty body, types, const enums, ambient members,
 * bodiless functions, a void 0 statement, a namespace that binds nothing (U-namespace-unbound) and an import-equals alias
 * (W-G14-N10).
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
 * a declaration of a kind not named here binds nothing (fail-closed), an interface, a type alias and an `export as
 * namespace` among them; the census claims the allowlist at the forms the module header's (4) and (5) name.
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
 * namespace body holds - the nearest body around it - binds for a reference inside that body and not for one outside it. The checker merges
 * the blocks of a namespace, so a reference in one block resolves to a member another block exports; under jiti 2.7.0, Pi's
 * extension loader, each block compiles to a function of its own that holds the member as its own const, and the
 * reference, left unqualified, reads the host global (the gate's readback at refusal #3). (7) An enum member binds for its
 * own name and a reference after it: jiti's enum transform qualifies a bare member name once it has read that member, so a
 * read before the member's declaration or inside its own initializer reads the host global (the seat's readback) and binds
 * nothing. The census claims (6) and (7) at the reference positions and read forms the module header's NAMESPACE BLOCKS
 * and ENUM MEMBERS name.
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
 * reference, and sf is an ES module and not a declaration file. A symbol merges the same-named declarations of one scope;
 * a companion that emits nothing (an interface, a type alias, an uninstantiated namespace, an ambient or bodiless
 * declaration) binds no name, so the pinned merges bind through their emitting declaration (the module header: (4)).
 */
function bindsHere(sf: ts.SourceFile, name: string, symbol: ts.Symbol | undefined, reference: ts.Node): boolean {
  if (symbol === undefined) return false;
  const declarations = symbol.declarations ?? [];
  // The one binding without a declaration: the function's own arguments object, which the checker resolves inside a non-arrow function (R-arguments).
  if (declarations.length === 0) return name === "arguments" && symbol.name === "arguments";
  return ts.isExternalModule(sf) && !sf.isDeclarationFile && declarations.some(declaration => declaration.getSourceFile() === sf && emitsBinding(declaration, name) && reaches(declaration, reference));
}

/**
 * A type-only import or export, erased at run time and so not read: TypeScript's own test, which holds an import type's
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
      // An instantiation expression (f<T>, an ExpressionWithTypeArguments outside a heritage clause) holds a run-time value:
      // tsc and Pi's jiti 2.7.0 strip its type arguments and run its expression (the module header's INSTANTIATION
      // EXPRESSIONS names the positions claimed), while TypeScript 6.0.3's ts.isTypeNode answers true for it - so its
      // expression is read here, before the
      // type test, and its type arguments are erased (row I).
      visit(node.expression);
      return;
    }
    if (ts.isTypeNode(node) || ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) || isErased(node)) return;
    if (ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword) {
      // The meta rule: no meta-property key is parsed, so import.meta itself reds at the meta-property (fail-closed); the census
      // claims it at the positions the module header's THE META RULE names.
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

/** THE READER over one tree (see the module header): each file is one module of one checked program (noLib, noResolve, the checker over exactly those files), and each module's free names are its GLOBAL lines, `GLOBAL <file>:<line> <name>`, sorted and unique. */
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

/** A plant pin: a planted tree (written to rule-11 scratch by the census) and its GLOBAL lines, read by judgeGlobals over each planted file. */
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
/** A planted view module as wb-021.8 refusal #1's LEG 2 witnesses are planted (its PREP archive's tools/witness-check.mjs): the VIEW_TITLE line, then the given lines, newline-terminated. */
const planted = (...lines: readonly string[]): string => ['export const VIEW_TITLE = "APO resource pressure";', ...lines, ""].join("\n");

/** The judged rows (see the module header): F the free names, R the module rules and the names read, U the binding allowlist and the wrapper names, NS namespace blocks, EN enum members, M the meta rule, I instantiation expressions, J the judge mutants of record, Q the residuals. */
export const ROWS: readonly Row[] = [
  {
    id: "F",
    label: "the free names: each ADMITTED_FREE name reads quiet and each other free name its pins plant reds",
    pins: [
      {
        kind: "plant",
        id: "V-admitted-free",
        what: "each ADMITTED_FREE name, referenced once, reads quiet (the outside-anchors case holds this plant's list to ADMITTED_FREE, in order)",
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
    label: "the module rules (1)-(3) and the names read, for the forms its pins hold",
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
        what: "a name whose one declaration is ambient is free, under its own declare (declare const) or an enclosing one (declare global): each reds at the declaration and at the use, and the global augmentation itself reds (GLOBAL)",
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
        what: "a value use of a named import type binding, a type-only specifier, a type-only namespace import, a default import type and an import type x = require(...) each reds: none of the five binds at run time (GLOBAL)",
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
        what: "an import type, an export type and a type-only export specifier naming process are erased: each stays quiet",
        files: {
          [V]: [HOST, 'import type { process } from "../workbench/host.js";', "export type { process };", "export { type process as signal };", 'export const VIEW_TITLE = "APO resource pressure";', ""].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-non-value-alias",
        what: "an import alias and an import-equals alias whose resolved target is an interface, an empty namespace and a namespace holding types alone are each passed over by the checker's value resolution, so a value use of each reds; the aliases' own declarations and an instantiated namespace bind, while the empty and the types-alone namespace bind nothing, so each also reds at its own declaration (GLOBAL)",
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
        what: "a script shim holding an interface and a type alias and no other statement (a script binds nothing, so a name read there would red: R-script-var) and an interface whose computed member key names process are erased: each stays quiet",
        files: {
          [V]: view("APO resource pressure", [HOST, 'import "./shim.js";'], ["void this.selected;"], ["interface Keyed {", "  [process.pid]: number;", "}"]),
          "src/apo/shim.ts": ["interface Shape {", "  kill(pid: number): void;", "}", "type Signal = number;", ""].join("\n"),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "R-arguments",
        what: "arguments binds inside a function declaration, a function expression, a method and an arrow inside a function (which inherits it), and is free and reds at the module's top level and in a top-level arrow (GLOBAL)",
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
        what: "an import alias's imported name and an export-from specifier (each naming an export the module lacks, so neither resolves), an import attribute, a qualified name's right side, a binding element's property name, labels and the meta-property new.target are not binding references and stay quiet; the meta-property import.meta in the same plant reds (GLOBAL, the meta rule)",
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
      {
        kind: "plant",
        id: "W-G14-V1",
        what: "wb-021.8 refusal #1 member G14-V1's witness as the gate wrote it (the mutant leaves decorator expressions unread): @structuredClone on a class reds at structuredClone; the ambient mark and its parameter input red at their declaration (GLOBAL)",
        files: { [V]: planted("declare function mark(input: unknown): unknown;", "@structuredClone", "class Tagged {}") },
        findings: [globalAt(2, "input"), globalAt(2, "mark"), globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "R-names-read-positions",
        what: "found by the wb-021.8 cut #2 seat: the free name process reds, one line each, in an array spread, an object spread, a conditional branch, an await operand, a throw operand, a for-of expression, a for-in expression, a switch expression, an element access receiver, a tagged template's span, a non-null operand, a satisfies operand, a typeof operand, a delete operand, a computed property name, a while condition, a do-while condition, a try block, a yield operand, an angle-bracket assertion's operand, an if condition, a labeled statement, a getter, a setter, a function expression, an import-equals alias's entity name, a catch block, a case clause, a default clause, a for statement's condition, a postfix operand, a class expression's method and an array binding pattern's default (GLOBAL)",
        files: {
          [V]: planted(
            "export const viaArraySpread = [...process.argv];",
            "export const viaObjectSpread = { ...process.env };",
            "export const viaConditional = true ? process : 0;",
            "export async function viaAwait(): Promise<unknown> { return await process; }",
            "export function viaThrow(): never { throw process; }",
            "for (const arg of process.argv) void arg;",
            "for (const key in process.env) void key;",
            "switch (process.platform) { default: }",
            'export const viaIndex = process["pid"];',
            `export const viaTagged = String.raw\`\${process.pid}\`;`,
            "export const viaNonNull = process!;",
            "export const viaSatisfies = process satisfies object;",
            "export const viaTypeof = typeof process;",
            "export const viaDelete = delete process.env.PROBE;",
            "export const viaComputed = { [process.title]: 1 };",
            "while (!process) break;",
            "do { void 0; } while (!process);",
            "try { void process; } catch { void 0; }",
            "export function* viaYield(): Generator<unknown> { yield process; }",
            "export const viaAssertion = <object>process;",
            "if (process) void 0;",
            "outer: for (;;) { void process; break outer; }",
            "export class Getter { get pid(): unknown { return process; } }",
            "export class Setter { set pid(value: unknown) { void value; void process; } }",
            "export const viaFunctionExpression = function (): unknown { return process; };",
            "import kill = process.kill;",
            "try { void 0; } catch (error) { void error; void process; }",
            "switch (0) { case process.pid: break; }",
            "switch (0) { default: void process; }",
            "for (let index = 0; index < process.pid; index++) void index;",
            "export const viaPostfix = process.exitCode++;",
            "export const viaClassExpression = class { read(): unknown { return process; } };",
            "export const [viaArrayDefault = process] = [] as unknown[];",
          ),
        },
        findings: [
          globalAt(2, "process"),
          globalAt(3, "process"),
          globalAt(4, "process"),
          globalAt(5, "process"),
          globalAt(6, "process"),
          globalAt(7, "process"),
          globalAt(8, "process"),
          globalAt(9, "process"),
          globalAt(10, "process"),
          globalAt(11, "process"),
          globalAt(12, "process"),
          globalAt(13, "process"),
          globalAt(14, "process"),
          globalAt(15, "process"),
          globalAt(16, "process"),
          globalAt(17, "process"),
          globalAt(18, "process"),
          globalAt(19, "process"),
          globalAt(20, "process"),
          globalAt(21, "process"),
          globalAt(22, "process"),
          globalAt(23, "process"),
          globalAt(24, "process"),
          globalAt(25, "process"),
          globalAt(26, "process"),
          globalAt(27, "process"),
          globalAt(28, "process"),
          globalAt(29, "process"),
          globalAt(30, "process"),
          globalAt(31, "process"),
          globalAt(32, "process"),
          globalAt(33, "process"),
          globalAt(34, "process"),
        ],
      },
    ],
  },
  {
    id: "U",
    label: "the binding allowlist (4) and the wrapper names (5), for the declaration forms its pins hold",
    pins: [
      {
        kind: "plant",
        id: "U-GP1",
        what: "refusal #2 GP1: an ambient const merged with an interface companion binds nothing: process reds at the ambient declaration and at the use, the interface quiet (GLOBAL)",
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
        what: "refusal #2 GP3b: an ambient namespace whose one member is an admitted name, merged with an empty namespace, binds nothing: process reds at both declarations and at the use (GLOBAL)",
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
        what: "refusal #2 GP6 (killed at the gate, held here): a parameter initializer resolves outside the function body, so a same-named var in the body does not bind it: process reds in the initializer and at no other line of the plant (GLOBAL)",
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
        what: "an abstract method's, a method overload's, a constructor overload's and an index signature's parameter and a binding element of an overload's parameter each red at the declaration (none of their function-likes has a body), while the implementations' parameters bind (GLOBAL)",
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
        what: "found by the cut #3 seat: at the module's top level a var require with a self initializer, an enum jitiImport, an instantiated namespace module (each compiles to a var of the wrapper's parameter), a function exports, a let __filename, a class __dirname and a var jitiESMResolve in a top-level block bind nothing (held fail-closed): each reds at its declaration and at the handler's use; a var require inside a function, a var jitiImport inside a namespace body, a var require inside a class static block, and a function expression's and a class expression's own name are fresh bindings and stay quiet (GLOBAL)",
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
        what: "an empty namespace, a types-alone one, a const-enum-alone one, an ambient-member-alone one, a bodiless-function-alone one, one holding a void 0 statement alone (a statement the reader does not list: held fail-closed, though TypeScript emits it), one holding a namespace that binds nothing and an ambient one each bind nothing: each reds at the declaration and at the use, beside their non-binding inner names (GLOBAL)",
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
        what: "a namespace holding a variable statement, a function declaration with a body, a class, a non-const enum or a namespace that binds, binds, and a dotted namespace binds through its innermost body: each use stays quiet",
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
        what: "var, let and const, object and array binding elements, a function declaration with a body, its parameter and its parameter's binding element, an arrow's and a function expression's parameter, a function expression's own name, a class declaration and a class expression's own name, a non-const enum and its member read in an initializer, an instantiated namespace, a catch variable, a default, a named and a namespace value import and an import-equals, and a module-scope var of a name outside the wrapper's (a fresh binding at run time: var process; reads undefined under jiti, tsc's CommonJS emit and ESM) each bind in their own ES module and stay quiet",
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
        what: "a function and a class each merged with an interface, an instantiated namespace merged with an interface, and a function, a class and a non-const enum each merged with an instantiated namespace bind through the emitting declaration: each stays quiet",
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
        what: "the own names of a class property, accessor pair, setter-only accessor and method, an object literal property, method and accessor, an enum member and a type parameter (named process and fetch here; a property module and a member exports, named after wrapper names, stay member names) name no module binding: each is read and stays quiet",
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
      {
        kind: "plant",
        id: "W-G14-N10",
        what: "wb-021.8 refusal #1 member G14-N10's witness as the gate wrote it (the mutant makes an import-equals statement bind its namespace): a namespace N whose body holds only an export import alias binds nothing: N reds at its declaration and at the use (GLOBAL; the gate's jiti 2.7.0 twin: the namespace is not emitted)",
        files: { [V]: planted("namespace Other {", "  export const level = 1;", "}", "namespace N {", "  export import take = Other.level;", "}", "export const copy = N.take;") },
        findings: [globalAt(5, "N"), globalAt(8, "N")],
      },
      {
        kind: "plant",
        id: "W-G14-E7",
        what: "wb-021.8 refusal #1 member G14-E7's witness as the gate wrote it (exempts a destructured wrapper name): a module-scope export const { require } binds nothing: require reds at the declaration and at the call (GLOBAL; the gate's twin read the planted value, so this red is the reader's conservative reading)",
        files: { [V]: planted("export const { require } = { require: (id: string): unknown => id };", 'export const os = require("node:os");') },
        findings: [globalAt(2, "require"), globalAt(3, "require")],
      },
      {
        kind: "plant",
        id: "W-G14-E15",
        what: "wb-021.8 refusal #1 member G14-E15's witness as the gate wrote it (exempts a const of a wrapper name): a module-scope const require binds nothing: require reds at the declaration and at the call (GLOBAL; the gate's twin read the planted value, so this red is the reader's conservative reading)",
        files: { [V]: planted("const require = (id: string): unknown => id;", 'export const os = require("node:os");') },
        findings: [globalAt(2, "require"), globalAt(3, "require")],
      },
      {
        kind: "plant",
        id: "W-G14-MN",
        what: "wb-021.8 refusal #1 member G14-MN's witness as the gate wrote it (F1: the mutant reads an object-literal setter's own name): an object-literal setter named process: its own name reads quiet",
        files: { [V]: planted("export const lit = {", "  set process(value: number) { void value; },", "};") },
        findings: [],
      },
      {
        kind: "plant",
        id: "W-G14-B3",
        what: "wb-021.8 refusal #1 member G14-B3's witness as the gate wrote it (F1: the mutant reads a binding element only one pattern deep): a binding element pid two patterns deep binds: pid quiet, process red in its default (GLOBAL)",
        files: { [V]: planted("const { left: { pid = process.kill(1) } } = { left: {} };", "void pid;") },
        findings: [globalAt(2, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-N8",
        what: "wb-021.8 refusal #1 member G14-N8's witness as the gate wrote it (F1: the mutant reads only a namespace's first statement): a namespace N whose const follows an interface binds: N quiet",
        files: {
          [V]: planted(
            "namespace N {",
            "  export interface Shape {}",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "export const kill = N.process.kill;",
          ),
        },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-wrapper-imports",
        what: "found by the wb-021.8 cut #2 seat: a module-scope import of a wrapper name binds nothing - a named import require, a default import module, a namespace import exports and an import-equals alias __filename each red at the declaration and at the use, a module-scope catch variable __dirname reds at its line and an array-destructured const jitiImport reds at its declaration (GLOBAL; the reader's conservative reading: jiti 2.7.0 rewrites an import into its own binding and a catch variable is a fresh one)",
        files: {
          [V]: planted(
            'import { require } from "./a.js";',
            'import module from "./b.js";',
            'import * as exports from "./c.js";',
            'namespace Other { export const name = "x"; }',
            "import __filename = Other.name;",
            "try { void 0; } catch (__dirname) { void __dirname; }",
            "export const uses = [require, module, exports, __filename];",
            "export const [jitiImport] = [(): unknown => 0];",
          ),
        },
        findings: [
          globalAt(2, "require"),
          globalAt(3, "module"),
          globalAt(4, "exports"),
          globalAt(6, "__filename"),
          globalAt(7, "__dirname"),
          globalAt(8, "__filename"),
          globalAt(8, "exports"),
          globalAt(8, "module"),
          globalAt(8, "require"),
          globalAt(9, "jitiImport"),
        ],
      },
      {
        kind: "plant",
        id: "U-alias-reads-bound",
        what: "found by the wb-021.8 cut #2 seat: a shorthand property reading a bound const and a re-export of a named import each read the binding: quiet",
        files: { [V]: planted('import { take } from "./ops.js";', "export { take };", "const pid = 1;", "export const box = { pid };") },
        findings: [],
      },
      {
        kind: "plant",
        id: "U-wrapper-statements",
        what: "found by the wb-021.8 cut #2 seat: a module-scope declaration of a wrapper name directly in a top-level block (function require), a case clause (function module), a default clause (class exports) and the inner name of a dotted namespace (__filename) binds nothing: each reds at its declaration (GLOBAL; the reader's conservative reading: each is a fresh binding at run time)",
        files: {
          [V]: planted(
            "{ function require(): void {} }",
            "switch (0) { case 0: function module(): void {} }",
            "switch (0) { default: class exports {} }",
            "export namespace Outer.__filename { export const level = 1; }",
          ),
        },
        findings: [globalAt(2, "require"), globalAt(3, "module"), globalAt(4, "exports"), globalAt(5, "__filename")],
      },
      {
        kind: "plant",
        id: "S-U-wrapper-forms",
        what: "U-wrapper-forms split (the collapse guard): its program token for token with a line break added inside the self-initialized var, so the var's own name require and its initializer require each sit alone on a line and each red; every other reading as in U-wrapper-forms, one line later (GLOBAL)",
        files: {
          [V]: view(
            "APO resource pressure",
            [HOST],
            ["void [require, jitiImport, module, exports, __filename, __dirname, jitiESMResolve, scoped, Inner, fresh, made, Holder];"],
            [
              "var require =",
              "  require;",
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
        findings: [globalAt(3, "require"), globalAt(4, "require"), globalAt(5, "jitiImport"), globalAt(8, "module"), globalAt(11, "exports"), globalAt(12, "__filename"), globalAt(13, "__dirname"), globalAt(15, "jitiESMResolve"), globalAt(43, "require"), globalAt(43, "jitiImport"), globalAt(43, "module"), globalAt(43, "exports"), globalAt(43, "__filename"), globalAt(43, "__dirname"), globalAt(43, "jitiESMResolve")],
      },
      {
        kind: "plant",
        id: "S-W-G14-E7",
        what: "W-G14-E7 split (the collapse guard): its program token for token with a line break added after the initializer's opening brace, so the destructured const require (red at the declaration) and the object literal's same-named key require (a member name, read and quiet) each sit alone on a line; require reds at the declaration and at the call (GLOBAL)",
        files: { [V]: planted("export const { require } = {", "  require: (id: string): unknown => id };", 'export const os = require("node:os");') },
        findings: [globalAt(2, "require"), globalAt(4, "require")],
      },
      {
        kind: "plant",
        id: "S-U-wrapper-imports",
        what: "U-wrapper-imports split (the collapse guard): its program token for token with line breaks added inside the catch clause, so the module-scope catch variable __dirname and its read each sit alone on a line and each red; every other reading as in U-wrapper-imports, two lines later after the catch clause (GLOBAL)",
        files: {
          [V]: planted(
            'import { require } from "./a.js";',
            'import module from "./b.js";',
            'import * as exports from "./c.js";',
            'namespace Other { export const name = "x"; }',
            "import __filename = Other.name;",
            "try { void 0; } catch (__dirname) {",
            "  void __dirname;",
            "}",
            "export const uses = [require, module, exports, __filename];",
            "export const [jitiImport] = [(): unknown => 0];",
          ),
        },
        findings: [
          globalAt(2, "require"),
          globalAt(3, "module"),
          globalAt(4, "exports"),
          globalAt(6, "__filename"),
          globalAt(7, "__dirname"),
          globalAt(8, "__dirname"),
          globalAt(10, "__filename"),
          globalAt(10, "exports"),
          globalAt(10, "module"),
          globalAt(10, "require"),
          globalAt(11, "jitiImport"),
        ],
      },
    ],
  },
  {
    id: "NS",
    label: "namespace blocks (6): a cross-block reference reds at each position its pins hold",
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
        what: "the gate's NS3 (before wb-021.2 cut #4 its census read the PACKAGE edge alone): a cross-block reference to an exported require member binds nothing: the call reds as a free name at the use (GLOBAL)",
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
        what: "refusal #3 control NS9 (red under both judges, held as a guard): a namespace merged with an enum does not reach the enum's member process by its bare name: process reds at the use (GLOBAL)",
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
        what: "refusal #3 control NS-C1 (red under both judges, held as a guard): an unexported member process of the first block is not in the second block's scope: process reds at the use (GLOBAL)",
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
        what: "a shorthand property reading a class the first block exports, and reads of an enum, a namespace, a function and an import-equals alias it exports, each red at the use in the second block, while each own name stays quiet in its own block (GLOBAL)",
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
        what: "refusal #4 GK1's witness as the gate wrote it (GK1's mutant reader applied GLOBAL (6) inside a function-like alone): a cross-block reference in a block's top-level statement, with no function-like around it, reds at the use (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.done;"], ["namespace N {", "  export const process = { kill(pid: number): number { return pid; } };", "}", "namespace N {", "  export const done = process.kill(1);", "}"]) },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "W-GK1-class-field",
        what: "refusal #4 GK1's second witness as the gate wrote it: a cross-block reference in a class field initializer, with no function-like around it, reds at the use (GLOBAL)",
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
        what: "found by the wb-021.8 seat: a cross-block reference with no function-like around it - in an enum member's initializer and in a destructuring default of the second block - reds at each use (GLOBAL; the seat's jiti 2.7.0 twins read the host's process in both)",
        files: { [V]: view("APO resource pressure", [HOST], ["void N.E.a;", "void N.pid;"], ["namespace N {", "  export const process = { pid: 1 };", "}", "namespace N {", "  export enum E {", "    a = process.pid,", "  }", "  export const { pid = process.pid } = {} as { pid?: number };", "}"]) },
        findings: [globalAt(8, "process"), globalAt(10, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R12",
        what: "wb-021.8 refusal #1 member G14-R12's witness as the gate wrote it (the mutant lets a member a binding element declares reach another block): a destructured export const pid of the first block, read by its bare name in the second block, reds at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const { pid = 7 } = { pid: 1 };", "}", "namespace N {", "  export const copy = pid;", "}") },
        findings: [globalAt(6, "pid")],
      },
      {
        kind: "plant",
        id: "W-G14-R24",
        what: "wb-021.8 refusal #1 member G14-R24's witness as the gate wrote it (the mutant lets a cross-block new callee reach): new Worker() in the second block, Worker an exported const of the first, reds at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const Worker = class {};", "}", "namespace N {", "  export const made = new Worker();", "}") },
        findings: [globalAt(6, "Worker")],
      },
      {
        kind: "plant",
        id: "W-G14-R27",
        what: "wb-021.8 refusal #1 member G14-R27's witness as the gate wrote it (lets a cross-block binary operand reach): n + count in the second block, both exported consts of the first, red at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const n = 40;", "  export const count = 2;", "}", "namespace N {", "  export const total = n + count;", "}") },
        findings: [globalAt(7, "count"), globalAt(7, "n")],
      },
      {
        kind: "plant",
        id: "W-G14-R28",
        what: "wb-021.8 refusal #1 member G14-R28's witness as the gate wrote it (lets a cross-block element access reach): process[member](1) in the second block, both exported consts of the first, red at the use (GLOBAL)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            '  export const member = "kill";',
            "}",
            "namespace N {",
            "  export const done = process[member](1);",
            "}",
          ),
        },
        findings: [globalAt(7, "member"), globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R29",
        what: "wb-021.8 refusal #1 member G14-R29's witness as the gate wrote it (lets a cross-block template span reach): a template span reading pid in the second block, pid an exported const of the first, reds at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const pid = 7;", "}", "namespace N {", `  export const note = \`pid \${pid}\`;`, "}") },
        findings: [globalAt(6, "pid")],
      },
      {
        kind: "plant",
        id: "W-G14-R30",
        what: "wb-021.8 refusal #1 member G14-R30's witness as the gate wrote it (lets a cross-block typeof or void operand reach): typeof process in the second block, process an exported const of the first, reds at the use (GLOBAL)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "namespace N {",
            "  export const kind = typeof process;",
            "}",
          ),
        },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R31",
        what: "wb-021.8 refusal #1 member G14-R31's witness as the gate wrote it (lets a cross-block spread reach): [...items] in the second block, items an exported const of the first, reds at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const items = [1, 2];", "}", "namespace N {", "  export const all = [...items];", "}") },
        findings: [globalAt(6, "items")],
      },
      {
        kind: "plant",
        id: "W-G14-R34",
        what: "wb-021.8 refusal #1 member G14-R34's witness as the gate wrote it (lets a cross-block conditional reach): chosen ? chosen : other in the second block, both exported consts of the first, red at the use (GLOBAL)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const chosen = 1;",
            "  export const other = 2;",
            "}",
            "namespace N {",
            "  export const pick = chosen ? chosen : other;",
            "}",
          ),
        },
        findings: [globalAt(7, "chosen"), globalAt(7, "other")],
      },
      {
        kind: "plant",
        id: "W-G14-R36",
        what: "wb-021.8 refusal #1 member G14-R36's witness as the gate wrote it (lets a cross-block reference inside a constructor reach): process.kill(1) in a constructor of a class the second block exports reds at the use (GLOBAL; the gate's jiti 2.7.0 twin read the host's process there)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "namespace N {",
            "  export class C {",
            "    constructor() {",
            "      process.kill(1);",
            "    }",
            "  }",
            "}",
          ),
        },
        findings: [globalAt(8, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R37",
        what: "wb-021.8 refusal #1 member G14-R37's witness as the gate wrote it (lets a cross-block reference inside an accessor reach): process.kill(1) in a getter of a class the second block exports reds at the use (GLOBAL; the gate's twin read the host's process there)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "namespace N {",
            "  export class C {",
            "    get pid(): number { return process.kill(1); }",
            "  }",
            "}",
          ),
        },
        findings: [globalAt(7, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R38",
        what: "wb-021.8 refusal #1 member G14-R38's witness as the gate wrote it (lets a cross-block reference inside a function expression reach): process.kill(1) in a function expression of the second block reds at the use (GLOBAL; the gate's twin read the host's process there)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "namespace N {",
            "  export const go = function (): void { process.kill(1); };",
            "}",
          ),
        },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R39",
        what: "wb-021.8 refusal #1 member G14-R39's witness as the gate wrote it (lets a cross-block reference in a parameter default reach): process.kill(1) as a parameter default of a function of the second block reds at the use (GLOBAL; the gate's twin read the host's process there)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const process = { kill(pid: number): number { return pid; } };",
            "}",
            "namespace N {",
            "  export function go(pid = process.kill(1)): void { void pid; }",
            "}",
          ),
        },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R40",
        what: "wb-021.8 refusal #1 member G14-R40's witness as the gate wrote it (lets a cross-block decorator reach): @tag on a class of the second block, tag an exported const of the first, reds at the decorator; the ambient mark reds at its declaration and at its read in the first block, its parameter input at the declaration (GLOBAL)",
        files: {
          [V]: planted(
            "declare function mark(input: unknown): unknown;",
            "namespace N {",
            "  export const tag = mark;",
            "}",
            "namespace N {",
            "  @tag",
            "  export class C {}",
            "}",
          ),
        },
        findings: [globalAt(2, "input"), globalAt(2, "mark"), globalAt(4, "mark"), globalAt(7, "tag")],
      },
      {
        kind: "plant",
        id: "NS-positions-2",
        what: "found by the wb-021.8 cut #2 seat: a reference in the second block of namespace N to a member the first block exports (pid, take or Worker) reds at the use, one line each, as a call argument, an as-cast operand, a satisfies operand, a non-null operand, a property value, a parenthesized expression, a void operand, a negation's operand, an array element, a comma operand, a call's callee, an optional call's callee, an element access argument, a shorthand property, an arrow's concise body, a function declaration's return, an object-literal method, a class method, a yield operand, an await operand, a tagged template's span, a class expression's extends clause, an if condition, a switch expression, a try block and a labeled block (GLOBAL)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export const pid = 7;",
            "  export function take(value: unknown): unknown { return value; }",
            "  export class Worker {}",
            "}",
            "namespace N {",
            "  export const viaArgument = String(pid);",
            "  export const viaCast = pid as number;",
            "  export const viaSatisfies = pid satisfies number;",
            "  export const viaNonNull = pid!;",
            "  export const viaProperty = { copy: pid };",
            "  export const viaParenthesized = (pid);",
            "  export const viaVoid = void pid;",
            "  export const viaNot = !pid;",
            "  export const viaArray = [pid];",
            "  export const viaComma = (0, pid);",
            "  export const viaCallee = take(0);",
            "  export const viaOptionalCall = take?.(0);",
            "  export const viaIndex = [1][pid];",
            "  export const viaShorthand = { pid };",
            "  export const viaArrow = (): unknown => pid;",
            "  export function viaReturn(): unknown { return pid; }",
            "  export const viaMethod = { read(): unknown { return pid; } };",
            "  export class Reader { read(): unknown { return pid; } }",
            "  export function* viaYield(): Generator<unknown> { yield pid; }",
            "  export async function viaAwait(): Promise<unknown> { return await pid; }",
            `  export const viaTagged = String.raw\`\${pid}\`;`,
            "  export const viaExtends = class extends Worker {};",
            "  if (pid) void 0;",
            "  switch (pid) { default: }",
            "  try { void pid; } catch { void 0; }",
            "  label: { void pid; break label; }",
            "}",
          ),
        },
        findings: [
          globalAt(8, "pid"),
          globalAt(9, "pid"),
          globalAt(10, "pid"),
          globalAt(11, "pid"),
          globalAt(12, "pid"),
          globalAt(13, "pid"),
          globalAt(14, "pid"),
          globalAt(15, "pid"),
          globalAt(16, "pid"),
          globalAt(17, "pid"),
          globalAt(18, "take"),
          globalAt(19, "take"),
          globalAt(20, "pid"),
          globalAt(21, "pid"),
          globalAt(22, "pid"),
          globalAt(23, "pid"),
          globalAt(24, "pid"),
          globalAt(25, "pid"),
          globalAt(26, "pid"),
          globalAt(27, "pid"),
          globalAt(28, "pid"),
          globalAt(29, "Worker"),
          globalAt(30, "pid"),
          globalAt(31, "pid"),
          globalAt(32, "pid"),
          globalAt(33, "pid"),
        ],
      },
      {
        kind: "plant",
        id: "NS-contexts",
        what: "found by the wb-021.8 cut #2 seat (its extended screen of rule (6)'s reference parent and ancestor kinds): a reference in the second block of namespace N to the const pid the first block exports reds at the use, one line each, as a binding element's default, a case clause's expression, a delete operand, a do-while condition, an enum member's whole initializer, an expression statement, a for statement's condition, a for-of expression, a for-in expression, a while condition, a shorthand property's assignment default, an angle-bracket assertion's operand, an element access argument, a computed property name, an object spread, a parameter's whole default, a class field's whole initializer, a throw operand, a decorator, an instantiation expression's expression, a postfix operand, a tagged template's tag, an import-equals alias's entity name, an array binding pattern's default, a case clause's statement, a default clause's statement, a class expression's method, a decorator's argument, a deleted member's receiver, a do-while body, a for statement's body, a for-of body, a for-in body, a while body, a class's extends expression, a postfix operand's receiver, a catch block, a labeled block, an object-literal setter, a computed property name's call, an object spread's cast, a thrown error's argument, an angle-bracket assertion's cast operand, a non-null operand's cast, a shorthand property's default call, an element access receiver's call and a tagged template's span (GLOBAL); the module's declarations of mark, viaShorthandDefault and viaShorthandCall bind",
        files: {
          [V]: planted(
            "function mark(...args: unknown[]): void { void args; }",
            "let viaShorthandDefault: unknown;",
            "let viaShorthandCall: unknown;",
            "namespace N {",
            "  export const pid = 7;",
            "}",
            "namespace N {",
            "  export const { key: viaBindingDefault = pid } = {} as { key?: unknown };",
            "  switch (0) { case pid: break; }",
            "  export const viaDelete = delete pid;",
            "  do { void 0; } while (pid);",
            "  enum Direct { a = pid }",
            "  pid;",
            "  for (; pid; ) break;",
            "  for (const entry of pid) void entry;",
            "  for (const key in pid) void key;",
            "  while (pid) break;",
            "  ({ viaShorthandDefault = pid } = {});",
            "  export const viaAssertion = <object>pid;",
            "  export const viaElementArgument = [1][pid];",
            "  export const viaComputedKey = { [pid]: 1 };",
            "  export const viaSpreadObject = { ...pid };",
            "  export function viaParameter(value = pid): unknown { return value; }",
            "  export class ViaField { readonly value = pid; }",
            "  export function viaThrow(): never { throw pid; }",
            "  @pid export class DecoratedBy {}",
            "  export const viaInstantiation = pid<number>;",
            "  pid++;",
            `  export const viaTag = pid\`x\`;`,
            "  import viaAlias = pid;",
            "  export const [viaArrayDefault = String(pid)] = [] as unknown[];",
            "  switch (0) { case 0: void pid; }",
            "  switch (0) { default: void pid; }",
            "  export const viaClassExpression = class { read(): unknown { return pid; } };",
            "  @mark(pid) export class Marked {}",
            "  export const viaDeleteKey = delete (pid as unknown as { key?: unknown }).key;",
            "  do { void pid; } while (0);",
            "  for (;;) { void pid; break; }",
            "  for (const entry of [0]) { void pid; void entry; }",
            "  for (const key in {}) { void pid; void key; }",
            "  while (true) { void pid; break; }",
            "  export class Extended extends (pid as unknown as typeof Object) {}",
            "  (pid as unknown as { n: number }).n++;",
            "  try { void 0; } catch { void pid; }",
            "  label: { void pid; break label; }",
            "  export const viaSetter = { set value(input: unknown) { void input; void pid; } };",
            "  export const viaComputedCall = { [String(pid)]: 1 };",
            "  export const viaSpreadCast = { ...(pid as object) };",
            "  export function viaThrowNested(): never { throw new Error(String(pid)); }",
            "  export const viaAssertionCast = <object>(pid as object);",
            "  export const viaNonNullCast = (pid as object | undefined)!;",
            "  ({ viaShorthandCall = String(pid) } = {});",
            "  export const viaElementCall = [String(pid)][0];",
            `  export const viaTaggedSpan = String.raw\`\${pid}\`;`,
            "}",
          ),
        },
        findings: [
          globalAt(9, "pid"),
          globalAt(10, "pid"),
          globalAt(11, "pid"),
          globalAt(12, "pid"),
          globalAt(13, "pid"),
          globalAt(14, "pid"),
          globalAt(15, "pid"),
          globalAt(16, "pid"),
          globalAt(17, "pid"),
          globalAt(18, "pid"),
          globalAt(19, "pid"),
          globalAt(20, "pid"),
          globalAt(21, "pid"),
          globalAt(22, "pid"),
          globalAt(23, "pid"),
          globalAt(24, "pid"),
          globalAt(25, "pid"),
          globalAt(26, "pid"),
          globalAt(27, "pid"),
          globalAt(28, "pid"),
          globalAt(29, "pid"),
          globalAt(30, "pid"),
          globalAt(31, "pid"),
          globalAt(32, "pid"),
          globalAt(33, "pid"),
          globalAt(34, "pid"),
          globalAt(35, "pid"),
          globalAt(36, "pid"),
          globalAt(37, "pid"),
          globalAt(38, "pid"),
          globalAt(39, "pid"),
          globalAt(40, "pid"),
          globalAt(41, "pid"),
          globalAt(42, "pid"),
          globalAt(43, "pid"),
          globalAt(44, "pid"),
          globalAt(45, "pid"),
          globalAt(46, "pid"),
          globalAt(47, "pid"),
          globalAt(48, "pid"),
          globalAt(49, "pid"),
          globalAt(50, "pid"),
          globalAt(51, "pid"),
          globalAt(52, "pid"),
          globalAt(53, "pid"),
          globalAt(54, "pid"),
          globalAt(55, "pid"),
        ],
      },
      {
        kind: "plant",
        id: "NS-import-equals-namespace",
        what: "found by the wb-021.8 cut #2 seat: an import-equals alias in the second block of namespace N whose entity name is the namespace Inner the first block exports reds at the use (GLOBAL)",
        files: {
          [V]: planted(
            "namespace N {",
            "  export namespace Inner {",
            "    export const level = 1;",
            "  }",
            "}",
            "namespace N {",
            "  import viaInner = Inner;",
            "  export const copy = viaInner.level;",
            "}",
          ),
        },
        findings: [globalAt(8, "Inner")],
      },
      {
        kind: "plant",
        id: "W-G7-N1",
        what: "wb-021.8 refusal #2 member G7-N1's witness as the gate wrote it (G7-NS-slot-cond-test: rule (6) lets a cross-block reference reach as a conditional's condition): in the second block of an exported namespace N, the first block's exported const process as a conditional's condition, the one reading of process on its line, reds at the use (GLOBAL; under Pi's jiti 2.7.0 the gate's read-only twin read the host process)",
        files: { [V]: planted("export namespace N {", "  export const process = { pid: 0 };", "}", "export namespace N {", "  export const tested = process ? 1 : 0;", "}") },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "W-G7-N2",
        what: "wb-021.8 refusal #2 member G7-N2's witness as the gate wrote it (G7-NS-slot-cond-true: lets a cross-block reference reach as a conditional's whenTrue branch): the first block's exported const process as the whenTrue branch in the second block, the one reading of process on its line, reds at the use (GLOBAL; under Pi's jiti 2.7.0 the gate's read-only twin read the host process)",
        files: { [V]: planted("export namespace N {", "  export const process = { pid: 0 };", "}", "export namespace N {", "  export const branch = Date.now() > 0 ? process : undefined;", "}") },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "S-W-G14-R34",
        what: "W-G14-R34 split (the collapse guard): its program token for token with line breaks added inside the conditional, so the cross-block reads chosen (the condition), chosen (the whenTrue branch) and other (the whenFalse branch) each sit alone on a line and each red at the use (GLOBAL)",
        files: { [V]: planted("namespace N {", "  export const chosen = 1;", "  export const other = 2;", "}", "namespace N {", "  export const pick = chosen", "    ? chosen", "    : other;", "}") },
        findings: [globalAt(7, "chosen"), globalAt(8, "chosen"), globalAt(9, "other")],
      },
    ],
  },
  {
    id: "EN",
    label: "enum members (7): the forward, self and later reads its pins hold",
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
        what: "member process, read by its bare name as an as-cast operand in member a's initializer before its own declaration, binds nothing (GLOBAL (7)): jiti's enum transform qualifies a bare member name once it has read that member, so the forward read reads the host global (the seat's readback: process.pid a number) - red at the read (GLOBAL)",
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
        what: "refusal #4 GK3's witness as the gate wrote it (GK3's mutant reader applied GLOBAL (7) to an enum at the module's top level alone): a forward read inside an enum a namespace block holds binds nothing: red at the read (GLOBAL)",
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
      {
        kind: "plant",
        id: "W-G14-R5",
        what: "wb-021.8 refusal #1 member G14-R5's witness as the gate wrote it (the mutant binds a forward read of a member named by a string literal): process read cast in member a, before the member \"process\" named by a string literal, reds at the read (GLOBAL; the gate's twin read the host's process)",
        files: { [V]: planted("enum E {", "  a = process as unknown as number,", '  "process" = Number("7"),', "}") },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R5c",
        what: "wb-021.8 refusal #1 member G14-R5c's witness as the gate wrote it (binds a forward read as a property receiver): a = process.pid before the member process reds at the read (GLOBAL; the gate's twin read the host's process)",
        files: { [V]: planted("enum E {", "  a = process.pid,", "  process = 1,", "}") },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R5e",
        what: "wb-021.8 refusal #1 member G14-R5e's witness as the gate wrote it (binds a forward read as a binary operand): a = process + 0 before the member process reds at the read (GLOBAL; the gate's twin read the host's process)",
        files: { [V]: planted("enum E {", "  a = process + 0,", "  process = 1,", "}") },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "W-G14-R5f",
        what: "wb-021.8 refusal #1 member G14-R5f's witness as the gate wrote it (binds a forward read that is the whole initializer): a = process before the member process reds at the read (GLOBAL; the gate's twin read the host's process)",
        files: { [V]: planted("enum E {", "  a = process,", "  process = 1,", "}") },
        findings: [globalAt(3, "process")],
      },
      {
        kind: "plant",
        id: "EN-forward-positions",
        what: "found by the wb-021.8 cut #2 seat: a forward read of the later member process, one line each, as a call argument, a parenthesized expression, a negation's operand, an array element, a conditional's condition, a template span, a typeof operand, a non-null operand and a satisfies operand in an earlier member's initializer, reds at the read (GLOBAL)",
        files: {
          [V]: planted(
            "enum E {",
            "  a = String(process).length,",
            "  b = (process),",
            "  c = -process,",
            "  d = [process].length,",
            "  e = process ? 1 : 0,",
            `  f = \`\${process}\`.length,`,
            "  g = (typeof process).length,",
            "  h = process!,",
            "  i = (process satisfies number),",
            "  process = 1,",
            "}",
            "export const copy = E.a;",
          ),
        },
        findings: [
          globalAt(3, "process"),
          globalAt(4, "process"),
          globalAt(5, "process"),
          globalAt(6, "process"),
          globalAt(7, "process"),
          globalAt(8, "process"),
          globalAt(9, "process"),
          globalAt(10, "process"),
          globalAt(11, "process"),
        ],
      },
      {
        kind: "plant",
        id: "EN-contexts",
        what: "found by the wb-021.8 cut #2 seat (its extended screen of rule (7)'s reference parent and ancestor kinds): a forward read of the later member process in an earlier member's initializer reds at the read, one member each, as a binding element's default, a case clause's expression, a delete operand, a do-while condition, an expression statement, a for statement's condition, a for-of expression, a for-in expression, a while condition, a shorthand property, a shorthand property's assignment default, an angle-bracket assertion's operand, an element access argument, a computed property name, an object spread, an array spread, a parameter's default, a class field's initializer, a throw operand, a decorator's argument, an instantiation expression's expression, a postfix operand, a tagged template's tag, a new argument, a property value, a return operand, a variable's initializer, a void operand, a yield operand, an await operand, an if condition, a switch expression, a conditional branch, a comma operand, an arrow's concise body, a function expression, an object-literal method, an object-literal getter, an object-literal setter, a class method, a class static block, a try block, a catch block, a labeled block, a for statement's body, a while body, a do-while body, a case clause's statement, a default clause's statement, a class's extends expression, an array binding pattern's default, an optional chain's receiver, a call's callee, a decorator, a class constructor and a function declaration's body (GLOBAL); the module's function mark binds",
        files: {
          [V]: planted(
            "function mark(...args: unknown[]): void { void args; }",
            "enum E {",
            "  a0 = (() => { const { key = process } = {} as { key?: number }; return key; })(),",
            "  a1 = (() => { switch (0) { case process: break; } return 0; })(),",
            "  a2 = Number(delete process),",
            "  a3 = (() => { do { void 0; } while (process); return 0; })(),",
            "  a4 = (() => { process; return 0; })(),",
            "  a5 = (() => { for (; process; ) break; return 0; })(),",
            "  a6 = (() => { for (const entry of process) void entry; return 0; })(),",
            "  a7 = (() => { for (const key in process) void key; return 0; })(),",
            "  a8 = (() => { while (process) break; return 0; })(),",
            "  a9 = ({ process }).process,",
            "  a10 = (() => { let copy: unknown; ({ copy = process } = {}); return Number(copy); })(),",
            "  a11 = <number>process,",
            "  a12 = [1][process],",
            "  a13 = Object.keys({ [process]: 1 }).length,",
            "  a14 = Object.keys({ ...process }).length,",
            "  a15 = [...process].length,",
            "  a16 = ((value = process) => value)(),",
            "  a17 = new (class { readonly value = process; })().value,",
            "  a18 = (() => { if (0) throw process; return 0; })(),",
            "  a19 = (() => { @mark(process) class Marked {} void Marked; return 0; })(),",
            "  a20 = (process<number>),",
            "  a21 = process++,",
            `  a22 = process\`x\`,`,
            "  a23 = Number(new Number(process)),",
            "  a24 = ({ key: process }).key,",
            "  a25 = (() => { return process; })(),",
            "  a26 = (() => { const copy = process; return copy; })(),",
            "  a27 = (void process, 0),",
            "  a28 = [...(function* () { yield process; })()].length,",
            "  a29 = Number((async () => await process)()),",
            "  a30 = (() => { if (process) return 1; return 0; })(),",
            "  a31 = (() => { switch (process) { default: } return 0; })(),",
            "  a32 = true ? process : 0,",
            "  a33 = (0, process),",
            "  a34 = (() => process)(),",
            "  a35 = (function () { return process; })(),",
            "  a36 = ({ read() { return process; } }).read(),",
            "  a37 = ({ get value() { return process; } }).value,",
            "  a38 = (() => { const box = { set value(input: number) { void input; void process; } }; void box; return 0; })(),",
            "  a39 = new (class { read() { return process; } })().read(),",
            "  a40 = (() => { class Holder { static { void process; } } void Holder; return 0; })(),",
            "  a41 = (() => { try { return process; } catch { return 0; } })(),",
            "  a42 = (() => { try { return 0; } catch { return process; } })(),",
            "  a43 = (() => { label: { void process; break label; } return 0; })(),",
            "  a44 = (() => { for (;;) { void process; break; } return 0; })(),",
            "  a45 = (() => { while (true) { void process; break; } return 0; })(),",
            "  a46 = (() => { do { void process; } while (0); return 0; })(),",
            "  a47 = (() => { switch (0) { case 0: void process; } return 0; })(),",
            "  a48 = (() => { switch (0) { default: void process; } return 0; })(),",
            "  a49 = (() => { class Extended extends (process as unknown as typeof Object) {} void Extended; return 0; })(),",
            "  a50 = (() => { const [first = process] = [] as number[]; return first; })(),",
            "  a51 = Number(process?.toString()),",
            "  a52 = Number(process()),",
            "  a53 = (() => { @process class Decorated {} void Decorated; return 0; })(),",
            "  a54 = new (class { readonly value: number; constructor() { this.value = process; } })().value,",
            "  a55 = (() => { function read(): number { return process; } return read(); })(),",
            "  process = 1,",
            "}",
            "export const copy = E.a0;",
          ),
        },
        findings: [
          globalAt(4, "process"),
          globalAt(5, "process"),
          globalAt(6, "process"),
          globalAt(7, "process"),
          globalAt(8, "process"),
          globalAt(9, "process"),
          globalAt(10, "process"),
          globalAt(11, "process"),
          globalAt(12, "process"),
          globalAt(13, "process"),
          globalAt(14, "process"),
          globalAt(15, "process"),
          globalAt(16, "process"),
          globalAt(17, "process"),
          globalAt(18, "process"),
          globalAt(19, "process"),
          globalAt(20, "process"),
          globalAt(21, "process"),
          globalAt(22, "process"),
          globalAt(23, "process"),
          globalAt(24, "process"),
          globalAt(25, "process"),
          globalAt(26, "process"),
          globalAt(27, "process"),
          globalAt(28, "process"),
          globalAt(29, "process"),
          globalAt(30, "process"),
          globalAt(31, "process"),
          globalAt(32, "process"),
          globalAt(33, "process"),
          globalAt(34, "process"),
          globalAt(35, "process"),
          globalAt(36, "process"),
          globalAt(37, "process"),
          globalAt(38, "process"),
          globalAt(39, "process"),
          globalAt(40, "process"),
          globalAt(41, "process"),
          globalAt(42, "process"),
          globalAt(43, "process"),
          globalAt(44, "process"),
          globalAt(45, "process"),
          globalAt(46, "process"),
          globalAt(47, "process"),
          globalAt(48, "process"),
          globalAt(49, "process"),
          globalAt(50, "process"),
          globalAt(51, "process"),
          globalAt(52, "process"),
          globalAt(53, "process"),
          globalAt(54, "process"),
          globalAt(55, "process"),
          globalAt(56, "process"),
          globalAt(57, "process"),
          globalAt(58, "process"),
          globalAt(59, "process"),
        ],
      },
      {
        kind: "plant",
        id: "EN-second-module",
        what: "found by the wb-021.8 cut #2 seat: a forward read in an enum of a second module the view imports (src/apo/ops.ts) reds there at the read (GLOBAL)",
        files: {
          [V]: planted('import { E } from "./ops.js";', "export const copy = E.a;"),
          "src/apo/ops.ts": ["export enum E {", "  a = process.pid,", "  process = 1,", "}", ""].join("\n"),
        },
        findings: [globalAt(2, "process", "src/apo/ops.ts")],
      },
      {
        kind: "plant",
        id: "S-U-EN-self",
        what: "U-EN-self split (the collapse guard): its program token for token with a line break added after the member's =, so the member's own name process (read and quiet) and the bare read process inside its own initializer (red at the read) each sit alone on a line (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void E.process;"], ["enum E {", "  process =", "    (process as unknown as { pid: number }).pid,", "}"]) },
        findings: [globalAt(5, "process")],
      },
    ],
  },
  {
    id: "M",
    label: "the meta rule: import.meta reds at each position its pins hold",
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
        what: "import.meta reds at the meta-property as an alias of the meta object, in a key read (import.meta.dirname) and in a call (import.meta.resolve) (GLOBAL), the alias's own name quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["const meta = import.meta;", "void meta;", "void import.meta.dirname;", 'void import.meta.resolve("./view.js");']) },
        findings: [globalAt(7, "import.meta"), globalAt(9, "import.meta"), globalAt(10, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-GK2-module-statement",
        what: "refusal #4 GK2's witness as the gate wrote it (GK2's mutant reader applied the meta rule inside a function-like alone): a write through import.meta in a module statement, with no function-like around it, reds at the meta-property (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ['import.meta.env.APO_SELECTED = "x";']) },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-GK2-class-field",
        what: "refusal #4 GK2's second witness as the gate wrote it: import.meta read in a class field initializer, with no function-like around it, reds at the meta-property (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void new Probe();"], ["class Probe {", "  readonly env = import.meta.env;", "}"]) },
        findings: [globalAt(4, "import.meta")],
      },
      {
        kind: "plant",
        id: "M-positions",
        what: "found by the wb-021.8 seat: import.meta reds in an enum member's initializer and in a class static block (each with no function-like around it) and in a parameter default (GLOBAL, the meta rule)",
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
      {
        kind: "plant",
        id: "W-G14-M4",
        what: "wb-021.8 refusal #1 member G14-M4's witness as the gate wrote it (the mutant leaves import.meta unread as a typeof operand): typeof import.meta in a module statement reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const kind = typeof import.meta;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M5",
        what: "wb-021.8 refusal #1 member G14-M5's witness as the gate wrote it (unread as a return operand): import.meta returned by a function declaration reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export function take(): unknown {", "  return import.meta;", "}") },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M6",
        what: "wb-021.8 refusal #1 member G14-M6's witness as the gate wrote it (unread as an arrow's concise body): an arrow whose concise body is import.meta reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const take = (): unknown => import.meta;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M9",
        what: "wb-021.8 refusal #1 member G14-M9's witness as the gate wrote it (unread as an array element): import.meta as an array literal's element reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const metas = [import.meta];") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M10",
        what: "wb-021.8 refusal #1 member G14-M10's witness as the gate wrote it (unread as a binary operand): import.meta === import.meta reds at its line (GLOBAL)",
        files: { [V]: planted("export const same = import.meta === import.meta;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M11",
        what: "wb-021.8 refusal #1 member G14-M11's witness as the gate wrote it (unread inside an arrow): an import.meta.env write through a cast in an arrow's block body reds at the meta-property (GLOBAL; the gate measured the write reaching its twin process's env under jiti 2.7.0)",
        files: { [V]: planted("export const take = (): void => {", '  (import.meta as unknown as { env: Record<string, string> }).env.APO_SELECTED = "x";', "};") },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M15",
        what: "wb-021.8 refusal #1 member G14-M15's witness as the gate wrote it (unread in a module other than src/apo/view.ts): an import.meta.env alias in the second module src/apo/ops.ts, which the view imports, reds there (GLOBAL)",
        files: {
          [V]: planted("export function use(): void { void write; }", 'import { write } from "./ops.js";'),
          "src/apo/ops.ts": ["export const env = (import.meta as unknown as { env: Record<string, string> }).env;", "export function write(): void { void env; }", ""].join("\n"),
        },
        findings: [globalAt(1, "import.meta", "src/apo/ops.ts")],
      },
      {
        kind: "plant",
        id: "W-G14-M16",
        what: "wb-021.8 refusal #1 member G14-M16's witness as the gate wrote it (unread inside a function expression): an import.meta.env write through a cast in a function expression reds at the meta-property (GLOBAL; the gate measured the write reaching its twin process's env under jiti 2.7.0)",
        files: { [V]: planted("export const write = function (): void {", '  (import.meta as unknown as { env: Record<string, string> }).env.APO_SELECTED = "x";', "};") },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M17",
        what: "wb-021.8 refusal #1 member G14-M17's witness as the gate wrote it (unread inside an accessor): import.meta returned by a class getter reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export class Box {", "  get env(): unknown { return import.meta; }", "}") },
        findings: [globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G14-M20",
        what: "wb-021.8 refusal #1 member G14-M20's witness as the gate wrote it (unread as a conditional branch): true ? import.meta : import.meta reds at its line (GLOBAL)",
        files: { [V]: planted("export const meta = true ? import.meta : import.meta;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "M-positions-2",
        what: "found by the wb-021.8 cut #2 seat: import.meta reds at the meta-property, one line each, as an element access receiver, a call argument, an object spread, an array spread, a property value, a binding pattern's initializer, inside a namespace body, a template span, an optional chain's receiver, inside a constructor, a satisfies operand, a non-null operand, a void operand, a comma operand, a parenthesized expression, a yield operand, an await operand, a throw operand, a computed property name, an angle-bracket assertion's operand, a negation's operand, a new argument, an if condition, a switch expression, a for-in expression, a for-of expression, a while condition, an arrow's block body, a function expression, an object-literal method, an object-literal setter, a class static block, a class field initializer, a parameter default, a tagged template's span, a try block, a catch block, a labeled block and an export default (GLOBAL, the meta rule)",
        files: {
          [V]: planted(
            'export const viaIndex = import.meta["url"];',
            "export const viaArgument = String(import.meta);",
            "export const viaObjectSpread = { ...import.meta };",
            "export const viaArraySpread = [...import.meta];",
            "export const viaProperty = { meta: import.meta };",
            "export const { url: viaPattern } = import.meta;",
            "export namespace Holder { export const meta = import.meta; }",
            `export const viaTemplate = \`\${import.meta}\`;`,
            "export const viaOptional = import.meta?.url;",
            "export class Built { constructor() { void import.meta; } }",
            "export const viaSatisfies = import.meta satisfies object;",
            "export const viaNonNull = import.meta!;",
            "export const viaVoid = void import.meta;",
            "export const viaComma = (0, import.meta);",
            "export const viaParenthesized = (import.meta);",
            "export function* viaYield(): Generator<unknown> { yield import.meta; }",
            "export async function viaAwait(): Promise<unknown> { return await import.meta; }",
            "export function viaThrow(): never { throw import.meta; }",
            "export const viaComputed = { [import.meta]: 1 };",
            "export const viaAssertion = <object>import.meta;",
            "export const viaNot = !import.meta;",
            "export const viaNew = new WeakSet(import.meta);",
            "if (import.meta) void 0;",
            "switch (import.meta) { default: }",
            "for (const key in import.meta) void key;",
            "for (const entry of import.meta) void entry;",
            "while (!import.meta) break;",
            "export const viaArrowBlock = (): void => { void import.meta; };",
            "export const viaFunctionExpression = function (): void { void import.meta; };",
            "export const viaMethod = { read(): unknown { return import.meta; } };",
            "export const viaSetter = { set meta(value: unknown) { void value; void import.meta; } };",
            "export class Static { static { void import.meta; } }",
            "export class Field { readonly meta = import.meta; }",
            "export function viaDefault(meta = import.meta): unknown { return meta; }",
            `export const viaTagged = String.raw\`\${import.meta}\`;`,
            "try { void import.meta; } catch { void 0; }",
            "try { void 0; } catch (error) { void error; void import.meta; }",
            "label: { void import.meta; break label; }",
            "export default import.meta;",
          ),
        },
        findings: [
          globalAt(2, "import.meta"),
          globalAt(3, "import.meta"),
          globalAt(4, "import.meta"),
          globalAt(5, "import.meta"),
          globalAt(6, "import.meta"),
          globalAt(7, "import.meta"),
          globalAt(8, "import.meta"),
          globalAt(9, "import.meta"),
          globalAt(10, "import.meta"),
          globalAt(11, "import.meta"),
          globalAt(12, "import.meta"),
          globalAt(13, "import.meta"),
          globalAt(14, "import.meta"),
          globalAt(15, "import.meta"),
          globalAt(16, "import.meta"),
          globalAt(17, "import.meta"),
          globalAt(18, "import.meta"),
          globalAt(19, "import.meta"),
          globalAt(20, "import.meta"),
          globalAt(21, "import.meta"),
          globalAt(22, "import.meta"),
          globalAt(23, "import.meta"),
          globalAt(24, "import.meta"),
          globalAt(25, "import.meta"),
          globalAt(26, "import.meta"),
          globalAt(27, "import.meta"),
          globalAt(28, "import.meta"),
          globalAt(29, "import.meta"),
          globalAt(30, "import.meta"),
          globalAt(31, "import.meta"),
          globalAt(32, "import.meta"),
          globalAt(33, "import.meta"),
          globalAt(34, "import.meta"),
          globalAt(35, "import.meta"),
          globalAt(36, "import.meta"),
          globalAt(37, "import.meta"),
          globalAt(38, "import.meta"),
          globalAt(39, "import.meta"),
          globalAt(40, "import.meta"),
        ],
      },
      {
        kind: "plant",
        id: "M-contexts",
        what: "found by the wb-021.8 cut #2 seat (its extended screen of the meta rule's parent and ancestor kinds): import.meta reds at the meta-property, one line each, as a binding element's default, a case clause's expression, a delete operand, a do-while condition, an enum member's whole initializer, an expression statement, a for statement's condition, a for-of expression, a for-in expression, a while condition, a shorthand property's assignment default, an angle-bracket assertion's operand, an element access argument, a computed property name, an object spread, a parameter's whole default, a class field's whole initializer, a throw operand, a decorator, an instantiation expression's expression, a postfix operand, a tagged template's tag, an array binding pattern's default, a case clause's statement, a default clause's statement, a class expression's method, a decorator's argument, a deleted member's receiver, a do-while body, a for statement's body, a for-of body, a for-in body, a while body, a class's extends expression, a postfix operand's receiver, a catch block, a labeled block, an object-literal setter, a computed property name's call, an object spread's cast, a thrown error's argument, an angle-bracket assertion's cast operand, a non-null operand's cast, a shorthand property's default call, an element access receiver's call and a tagged template's span (GLOBAL, the meta rule); the declarations of mark, viaShorthandDefault and viaShorthandCall bind",
        files: {
          [V]: planted(
            "function mark(...args: unknown[]): void { void args; }",
            "let viaShorthandDefault: unknown;",
            "let viaShorthandCall: unknown;",
            "export const { key: viaBindingDefault = import.meta } = {} as { key?: unknown };",
            "switch (0) { case import.meta: break; }",
            "export const viaDelete = delete import.meta;",
            "do { void 0; } while (import.meta);",
            "enum Direct { a = import.meta }",
            "import.meta;",
            "for (; import.meta; ) break;",
            "for (const entry of import.meta) void entry;",
            "for (const key in import.meta) void key;",
            "while (import.meta) break;",
            "({ viaShorthandDefault = import.meta } = {});",
            "export const viaAssertion = <object>import.meta;",
            "export const viaElementArgument = [1][import.meta];",
            "export const viaComputedKey = { [import.meta]: 1 };",
            "export const viaSpreadObject = { ...import.meta };",
            "export function viaParameter(value = import.meta): unknown { return value; }",
            "export class ViaField { readonly value = import.meta; }",
            "export function viaThrow(): never { throw import.meta; }",
            "@import.meta export class DecoratedBy {}",
            "export const viaInstantiation = import.meta<number>;",
            "import.meta++;",
            `export const viaTag = import.meta\`x\`;`,
            "export const [viaArrayDefault = String(import.meta)] = [] as unknown[];",
            "switch (0) { case 0: void import.meta; }",
            "switch (0) { default: void import.meta; }",
            "export const viaClassExpression = class { read(): unknown { return import.meta; } };",
            "@mark(import.meta) export class Marked {}",
            "export const viaDeleteKey = delete (import.meta as unknown as { key?: unknown }).key;",
            "do { void import.meta; } while (0);",
            "for (;;) { void import.meta; break; }",
            "for (const entry of [0]) { void import.meta; void entry; }",
            "for (const key in {}) { void import.meta; void key; }",
            "while (true) { void import.meta; break; }",
            "export class Extended extends (import.meta as unknown as typeof Object) {}",
            "(import.meta as unknown as { n: number }).n++;",
            "try { void 0; } catch { void import.meta; }",
            "label: { void import.meta; break label; }",
            "export const viaSetter = { set value(input: unknown) { void input; void import.meta; } };",
            "export const viaComputedCall = { [String(import.meta)]: 1 };",
            "export const viaSpreadCast = { ...(import.meta as object) };",
            "export function viaThrowNested(): never { throw new Error(String(import.meta)); }",
            "export const viaAssertionCast = <object>(import.meta as object);",
            "export const viaNonNullCast = (import.meta as object | undefined)!;",
            "({ viaShorthandCall = String(import.meta) } = {});",
            "export const viaElementCall = [String(import.meta)][0];",
            `export const viaTaggedSpan = String.raw\`\${import.meta}\`;`,
          ),
        },
        findings: [
          globalAt(5, "import.meta"),
          globalAt(6, "import.meta"),
          globalAt(7, "import.meta"),
          globalAt(8, "import.meta"),
          globalAt(9, "import.meta"),
          globalAt(10, "import.meta"),
          globalAt(11, "import.meta"),
          globalAt(12, "import.meta"),
          globalAt(13, "import.meta"),
          globalAt(14, "import.meta"),
          globalAt(15, "import.meta"),
          globalAt(16, "import.meta"),
          globalAt(17, "import.meta"),
          globalAt(18, "import.meta"),
          globalAt(19, "import.meta"),
          globalAt(20, "import.meta"),
          globalAt(21, "import.meta"),
          globalAt(22, "import.meta"),
          globalAt(23, "import.meta"),
          globalAt(24, "import.meta"),
          globalAt(25, "import.meta"),
          globalAt(26, "import.meta"),
          globalAt(27, "import.meta"),
          globalAt(28, "import.meta"),
          globalAt(29, "import.meta"),
          globalAt(30, "import.meta"),
          globalAt(31, "import.meta"),
          globalAt(32, "import.meta"),
          globalAt(33, "import.meta"),
          globalAt(34, "import.meta"),
          globalAt(35, "import.meta"),
          globalAt(36, "import.meta"),
          globalAt(37, "import.meta"),
          globalAt(38, "import.meta"),
          globalAt(39, "import.meta"),
          globalAt(40, "import.meta"),
          globalAt(41, "import.meta"),
          globalAt(42, "import.meta"),
          globalAt(43, "import.meta"),
          globalAt(44, "import.meta"),
          globalAt(45, "import.meta"),
          globalAt(46, "import.meta"),
          globalAt(47, "import.meta"),
          globalAt(48, "import.meta"),
          globalAt(49, "import.meta"),
          globalAt(50, "import.meta"),
        ],
      },
      {
        kind: "plant",
        id: "W-G7-M1",
        what: "wb-021.8 refusal #2 member G7-M1's witness as the gate wrote it (G7-M-slot-bin-left: the meta rule leaves import.meta unread as a binary expression's left operand): import.meta as the left operand of !==, the one reading of import.meta on its line, reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const metaFirst = import.meta !== undefined;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G7-M2",
        what: "wb-021.8 refusal #2 member G7-M2's witness as the gate wrote it (G7-M-slot-cond-true: unread as a conditional's whenTrue branch): import.meta as the whenTrue branch, the one reading of import.meta on its line, reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const chosenMeta = Date.now() > 0 ? import.meta : undefined;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "W-G7-M3",
        what: "wb-021.8 refusal #2 member G7-M3's witness as the gate wrote it (G7-M-slot-cond-false: unread as a conditional's whenFalse branch): import.meta as the whenFalse branch, the one reading of import.meta on its line, reds at the meta-property (GLOBAL)",
        files: { [V]: planted("export const otherMeta = Date.now() > 0 ? undefined : import.meta;") },
        findings: [globalAt(2, "import.meta")],
      },
      {
        kind: "plant",
        id: "S-W-G14-M10",
        what: "W-G14-M10 split (the collapse guard): its program token for token with a line break added after ===, so its left operand import.meta (line 2) and its right operand import.meta (line 3) each sit alone on a line and each red at the meta-property (GLOBAL)",
        files: { [V]: planted("export const same = import.meta ===", "  import.meta;") },
        findings: [globalAt(2, "import.meta"), globalAt(3, "import.meta")],
      },
      {
        kind: "plant",
        id: "S-W-G14-M20",
        what: "W-G14-M20 split (the collapse guard): its program token for token with line breaks added inside the conditional, so its whenTrue branch import.meta (line 3) and its whenFalse branch import.meta (line 4) each sit alone on a line and each red at the meta-property (GLOBAL)",
        files: { [V]: planted("export const meta = true", "  ? import.meta", "  : import.meta;") },
        findings: [globalAt(3, "import.meta"), globalAt(4, "import.meta")],
      },
    ],
  },
  {
    id: "I",
    label: "instantiation expressions: read through their expression at each position its pins hold",
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
        what: "found by the wb-021.8 seat: in a heritage clause an expression with type arguments keeps its reading - a class's extends expression is a value, its type arguments erased (Worker reds, its typeof fetch type argument stays quiet), and an implements clause is a type position, erased (process, read there as a type, stays quiet) (GLOBAL)",
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
        what: "found by the wb-021.8 seat: a typeof type argument of a call and of an instantiation expression names process and fetch as types, erased: quiet",
        files: { [V]: view("APO resource pressure", [HOST], ["void pick<typeof process>(this.selected as never);", "const typed = pick<typeof fetch>;", "void typed;"], [PICK]) },
        findings: [],
      },
      {
        kind: "plant",
        id: "W-G14-I1",
        what: "wb-021.8 refusal #1 member G14-I1's witness as the gate wrote it (the mutant leaves an instantiation expression unread as an arrow's concise body): an arrow whose concise body is fetch<string> reds at fetch (GLOBAL)",
        files: { [V]: planted("export const reach = (): unknown => fetch<string>;") },
        findings: [globalAt(2, "fetch")],
      },
      {
        kind: "plant",
        id: "W-G14-I2",
        what: "wb-021.8 refusal #1 member G14-I2's witness as the gate wrote it (unread as an array element): [structuredClone<number>] reds at structuredClone (GLOBAL; the gate's jiti 2.7.0 twin read the host's structuredClone)",
        files: { [V]: planted("export const reaches = [structuredClone<number>];") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I3",
        what: "wb-021.8 refusal #1 member G14-I3's witness as the gate wrote it (unread as a property value): { reach: structuredClone<number> } reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export const box = { reach: structuredClone<number> };") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I5",
        what: "wb-021.8 refusal #1 member G14-I5's witness as the gate wrote it (unread as a conditional branch): true ? structuredClone<number> : structuredClone<number> reds at its line (GLOBAL)",
        files: { [V]: planted("export const reach = true ? structuredClone<number> : structuredClone<number>;") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I7",
        what: "wb-021.8 refusal #1 member G14-I7's witness as the gate wrote it (unread as an await operand): await structuredClone<number> in an async function reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export async function reach(): Promise<unknown> {", "  return await structuredClone<number>;", "}") },
        findings: [globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I8",
        what: "wb-021.8 refusal #1 member G14-I8's witness as the gate wrote it (unread as a typeof operand): typeof structuredClone<number> reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export const kind = typeof structuredClone<number>;") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I9",
        what: "wb-021.8 refusal #1 member G14-I9's witness as the gate wrote it (unread as a cast operand): structuredClone<number> as an as-cast operand reds at structuredClone (GLOBAL)",
        files: { [V]: planted("const pick = <T,>(value: T): T => value;", "export const reach = (structuredClone<number> as unknown as typeof pick);") },
        findings: [globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I10",
        what: "wb-021.8 refusal #1 member G14-I10's witness as the gate wrote it (unread as a property receiver): structuredClone<number>.name reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export const name = structuredClone<number>.name;") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I12",
        what: "wb-021.8 refusal #1 member G14-I12's witness as the gate wrote it (unread as a new argument): new Maker(structuredClone<number>) reds at structuredClone (GLOBAL)",
        files: { [V]: planted("class Maker<T> {", "  constructor(readonly make: () => unknown) {}", "}", "export const maker = new Maker(structuredClone<number>);") },
        findings: [globalAt(5, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I14",
        what: "wb-021.8 refusal #1 member G14-I14's witness as the gate wrote it (unread inside an arrow): structuredClone<number> in an arrow's block body reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export const reach = (): unknown => {", "  const clone = structuredClone<number>;", "  return clone;", "};") },
        findings: [globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I15",
        what: "wb-021.8 refusal #1 member G14-I15's witness as the gate wrote it (unread inside an enum member's initializer): fetch<string> cast in an enum member's initializer reds at fetch (GLOBAL; the gate's twin read the host's fetch)",
        files: { [V]: planted("enum E {", "  a = (fetch<string> as unknown as number),", "}") },
        findings: [globalAt(3, "fetch")],
      },
      {
        kind: "plant",
        id: "W-G14-I16",
        what: "wb-021.8 refusal #1 member G14-I16's witness as the gate wrote it (unread inside a binding element): structuredClone<number> as a destructuring default reds at structuredClone (GLOBAL)",
        files: { [V]: planted("export const { clone = structuredClone<number> } = {} as { clone?: unknown };") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I17",
        what: "wb-021.8 refusal #1 member G14-I17's witness as the gate wrote it (unread as a throw operand): throw structuredClone<number> reds at structuredClone (GLOBAL; the gate's twin read the host's structuredClone)",
        files: { [V]: planted("export function fail(): never {", "  throw structuredClone<number>;", "}") },
        findings: [globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G14-I18",
        what: "wb-021.8 refusal #1 member G14-I18's witness as the gate wrote it (unread inside a decorator): @structuredClone<number> on a class reds at structuredClone; the ambient mark and its parameter input red at their declaration (GLOBAL)",
        files: { [V]: planted("declare function mark(input: unknown): unknown;", "@structuredClone<number>", "class Tagged {}") },
        findings: [globalAt(2, "input"), globalAt(2, "mark"), globalAt(3, "structuredClone")],
      },
      {
        kind: "plant",
        id: "I-positions-2",
        what: "found by the wb-021.8 cut #2 seat: an instantiation expression is read through its expression, one line each, as a binary operand, an array spread, an object spread, over an element access (globalThis red), over a call (fetch red), over a parenthesized name (fetch red), over a property access (globalThis red), as a void operand, a comma operand, a negation's operand, a satisfies operand, a computed property name, a call argument, a yield operand, inside a namespace body, an if condition, a switch expression, a for-in expression, inside a function expression, an object-literal method, a constructor, a getter and a try block (GLOBAL)",
        files: {
          [V]: planted(
            "export const viaBinary = structuredClone<number> === undefined;",
            "export const viaArraySpread = [...structuredClone<number>];",
            "export const viaObjectSpread = { ...structuredClone<number> };",
            'export const viaIndexed = globalThis["structuredClone"]<number>;',
            "export const viaCalled = fetch()<number>;",
            "export const viaParenthesized = (fetch)<number>;",
            "export const viaDotted = globalThis.structuredClone<number>;",
            "export const viaVoid = void structuredClone<number>;",
            "export const viaComma = (0, structuredClone<number>);",
            "export const viaNot = !structuredClone<number>;",
            "export const viaSatisfies = structuredClone<number> satisfies unknown;",
            "export const viaComputed = { [structuredClone<number>]: 1 };",
            "export const viaArgument = String(structuredClone<number>);",
            "export function* viaYield(): Generator<unknown> { yield structuredClone<number>; }",
            "export namespace Holder { export const clone = structuredClone<number>; }",
            "if (structuredClone<number>) void 0;",
            "switch (structuredClone<number>) { default: }",
            "for (const key in structuredClone<number>) void key;",
            "export const viaFunctionExpression = function (): unknown { return structuredClone<number>; };",
            "export const viaMethod = { read(): unknown { return structuredClone<number>; } };",
            "export class Built { constructor() { void structuredClone<number>; } }",
            "export class Getter { get clone(): unknown { return structuredClone<number>; } }",
            "try { void structuredClone<number>; } catch { void 0; }",
          ),
        },
        findings: [
          globalAt(2, "structuredClone"),
          globalAt(3, "structuredClone"),
          globalAt(4, "structuredClone"),
          globalAt(5, "globalThis"),
          globalAt(6, "fetch"),
          globalAt(7, "fetch"),
          globalAt(8, "globalThis"),
          globalAt(9, "structuredClone"),
          globalAt(10, "structuredClone"),
          globalAt(11, "structuredClone"),
          globalAt(12, "structuredClone"),
          globalAt(13, "structuredClone"),
          globalAt(14, "structuredClone"),
          globalAt(15, "structuredClone"),
          globalAt(16, "structuredClone"),
          globalAt(17, "structuredClone"),
          globalAt(18, "structuredClone"),
          globalAt(19, "structuredClone"),
          globalAt(20, "structuredClone"),
          globalAt(21, "structuredClone"),
          globalAt(22, "structuredClone"),
          globalAt(23, "structuredClone"),
          globalAt(24, "structuredClone"),
        ],
      },
      {
        kind: "plant",
        id: "I-contexts",
        what: "found by the wb-021.8 cut #2 seat (its extended screen of the instantiation branch's parent and ancestor kinds): structuredClone<number> is read through its expression, one line each, as a binding element's default, a case clause's expression, a delete operand, a do-while condition, an enum member's whole initializer, an expression statement, a for statement's condition, a for-of expression, a for-in expression, a while condition, a shorthand property's assignment default, an angle-bracket assertion's operand, an element access argument, a computed property name, an object spread, a parameter's whole default, a class field's whole initializer, a throw operand, an array binding pattern's default, a case clause's statement, a default clause's statement, a class expression's method, a decorator's argument, a deleted member's receiver, a do-while body, a for statement's body, a for-of body, a for-in body, a while body, a class's extends expression, a postfix operand's receiver, a catch block, a labeled block, an object-literal setter, a computed property name's call, an object spread's cast, a thrown error's argument, an angle-bracket assertion's cast operand, a non-null operand's cast, a shorthand property's default call, an element access receiver's call and a tagged template's span (GLOBAL); the declarations of mark, viaShorthandDefault and viaShorthandCall bind",
        files: {
          [V]: planted(
            "function mark(...args: unknown[]): void { void args; }",
            "let viaShorthandDefault: unknown;",
            "let viaShorthandCall: unknown;",
            "export const { key: viaBindingDefault = structuredClone<number> } = {} as { key?: unknown };",
            "switch (0) { case structuredClone<number>: break; }",
            "export const viaDelete = delete structuredClone<number>;",
            "do { void 0; } while (structuredClone<number>);",
            "enum Direct { a = structuredClone<number> }",
            "structuredClone<number>;",
            "for (; structuredClone<number>; ) break;",
            "for (const entry of structuredClone<number>) void entry;",
            "for (const key in structuredClone<number>) void key;",
            "while (structuredClone<number>) break;",
            "({ viaShorthandDefault = structuredClone<number> } = {});",
            "export const viaAssertion = <object>structuredClone<number>;",
            "export const viaElementArgument = [1][structuredClone<number>];",
            "export const viaComputedKey = { [structuredClone<number>]: 1 };",
            "export const viaSpreadObject = { ...structuredClone<number> };",
            "export function viaParameter(value = structuredClone<number>): unknown { return value; }",
            "export class ViaField { readonly value = structuredClone<number>; }",
            "export function viaThrow(): never { throw structuredClone<number>; }",
            "export const [viaArrayDefault = String(structuredClone<number>)] = [] as unknown[];",
            "switch (0) { case 0: void structuredClone<number>; }",
            "switch (0) { default: void structuredClone<number>; }",
            "export const viaClassExpression = class { read(): unknown { return structuredClone<number>; } };",
            "@mark(structuredClone<number>) export class Marked {}",
            "export const viaDeleteKey = delete (structuredClone<number> as unknown as { key?: unknown }).key;",
            "do { void structuredClone<number>; } while (0);",
            "for (;;) { void structuredClone<number>; break; }",
            "for (const entry of [0]) { void structuredClone<number>; void entry; }",
            "for (const key in {}) { void structuredClone<number>; void key; }",
            "while (true) { void structuredClone<number>; break; }",
            "export class Extended extends (structuredClone<number> as unknown as typeof Object) {}",
            "(structuredClone<number> as unknown as { n: number }).n++;",
            "try { void 0; } catch { void structuredClone<number>; }",
            "label: { void structuredClone<number>; break label; }",
            "export const viaSetter = { set value(input: unknown) { void input; void structuredClone<number>; } };",
            "export const viaComputedCall = { [String(structuredClone<number>)]: 1 };",
            "export const viaSpreadCast = { ...(structuredClone<number> as object) };",
            "export function viaThrowNested(): never { throw new Error(String(structuredClone<number>)); }",
            "export const viaAssertionCast = <object>(structuredClone<number> as object);",
            "export const viaNonNullCast = (structuredClone<number> as object | undefined)!;",
            "({ viaShorthandCall = String(structuredClone<number>) } = {});",
            "export const viaElementCall = [String(structuredClone<number>)][0];",
            `export const viaTaggedSpan = String.raw\`\${structuredClone<number>}\`;`,
          ),
        },
        findings: [
          globalAt(5, "structuredClone"),
          globalAt(6, "structuredClone"),
          globalAt(7, "structuredClone"),
          globalAt(8, "structuredClone"),
          globalAt(9, "structuredClone"),
          globalAt(10, "structuredClone"),
          globalAt(11, "structuredClone"),
          globalAt(12, "structuredClone"),
          globalAt(13, "structuredClone"),
          globalAt(14, "structuredClone"),
          globalAt(15, "structuredClone"),
          globalAt(16, "structuredClone"),
          globalAt(17, "structuredClone"),
          globalAt(18, "structuredClone"),
          globalAt(19, "structuredClone"),
          globalAt(20, "structuredClone"),
          globalAt(21, "structuredClone"),
          globalAt(22, "structuredClone"),
          globalAt(23, "structuredClone"),
          globalAt(24, "structuredClone"),
          globalAt(25, "structuredClone"),
          globalAt(26, "structuredClone"),
          globalAt(27, "structuredClone"),
          globalAt(28, "structuredClone"),
          globalAt(29, "structuredClone"),
          globalAt(30, "structuredClone"),
          globalAt(31, "structuredClone"),
          globalAt(32, "structuredClone"),
          globalAt(33, "structuredClone"),
          globalAt(34, "structuredClone"),
          globalAt(35, "structuredClone"),
          globalAt(36, "structuredClone"),
          globalAt(37, "structuredClone"),
          globalAt(38, "structuredClone"),
          globalAt(39, "structuredClone"),
          globalAt(40, "structuredClone"),
          globalAt(41, "structuredClone"),
          globalAt(42, "structuredClone"),
          globalAt(43, "structuredClone"),
          globalAt(44, "structuredClone"),
          globalAt(45, "structuredClone"),
          globalAt(46, "structuredClone"),
        ],
      },
      {
        kind: "plant",
        id: "W-G14-I11",
        what: "wb-021.8 refusal #1 edit G14-I11's witness as refusal #2's gate wrote it (its F1 rider; G14-I11 leaves an instantiation expression unread as a call's callee): an optional call whose callee is the instantiation expression structuredClone<string> (TypeScript 6.0.3 parses it with no diagnostic) reads structuredClone through its expression (GLOBAL)",
        files: { [V]: planted('export const cloned = structuredClone<string>?.("x");') },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G7-I1",
        what: "wb-021.8 refusal #2 member G7-I1's witness as the gate wrote it (G7-I-slot-cond-true: the instantiation branch leaves an instantiation expression unread as a conditional's whenTrue branch): structuredClone<number> as the whenTrue branch, the one reading of structuredClone on its line, reads structuredClone through its expression (GLOBAL; under Pi's jiti 2.7.0 the gate's twin reached the host's structuredClone)",
        files: { [V]: planted("export const cloneA = Date.now() > 0 ? structuredClone<number> : undefined;") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "W-G7-I2",
        what: "wb-021.8 refusal #2 member G7-I2's witness as the gate wrote it (G7-I-slot-cond-false: unread as a conditional's whenFalse branch): structuredClone<number> as the whenFalse branch, the one reading of structuredClone on its line, reads structuredClone through its expression (GLOBAL; under Pi's jiti 2.7.0 the gate's twin reached the host's structuredClone)",
        files: { [V]: planted("export const cloneB = Date.now() > 0 ? undefined : structuredClone<number>;") },
        findings: [globalAt(2, "structuredClone")],
      },
      {
        kind: "plant",
        id: "S-W-G14-I5",
        what: "W-G14-I5 split (the collapse guard): its program token for token with line breaks added inside the conditional, so its whenTrue branch structuredClone<number> (line 3) and its whenFalse branch structuredClone<number> (line 4) each sit alone on a line and each read structuredClone through its expression (GLOBAL)",
        files: { [V]: planted("export const reach = true", "  ? structuredClone<number>", "  : structuredClone<number>;") },
        findings: [globalAt(3, "structuredClone"), globalAt(4, "structuredClone")],
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
        what: "refusal #3 U3 mutant GJ4's kill, its witness W-GJ4 as the gate wrote it: a declare class binds nothing, its member process's own name included (the ambient rule is read before the member rule): process reds at its own name (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ["declare class Array {", "  process: number;", "}"]) },
        findings: [globalAt(4, "process")],
      },
      {
        kind: "plant",
        id: "U-GJ15",
        what: "refusal #3 U3 mutant GJ15's kill, its witness W-GJ15 as the gate wrote it: an enclosing ambient context counts three namespaces deep: a const three namespaces under a string-named module reds at its own name (GLOBAL)",
        files: { [V]: view("APO resource pressure", [HOST], ["void this.selected;"], ['declare module "shim" {', "  namespace Array {", "    namespace Math {", "      const process: number;", "    }", "  }", "}"]) },
        findings: [globalAt(6, "process")],
      },
      {
        kind: "plant",
        id: "U-GJ16",
        what: "refusal #3 U3 mutant GJ16's kill, its witness W-GJ16 as the gate wrote it: a dotted namespace whose innermost body is empty binds nothing (a dotted namespace binds through its innermost body): process reds at the declaration and at the use (GLOBAL)",
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
        what: "a value import of a name its relative target does not export binds in the importer by its own declaration (the reader does not check the target's exports): its use stays quiet - at run time it reads undefined under jiti and tsc's CommonJS emit and fails to link under ESM, not a host global",
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

/**
 * The collapsed GLOBAL lines of record (refusal #2's class; the census's collapse guard): each pin, keyed `<row> <pin>`,
 * with a GLOBAL line holding two readings of its name, mapped to the pin of its row that splits it - the same program
 * token for token with line breaks added, each reading on a line of its own.
 */
export const COLLAPSED_SPLITS: Readonly<Record<string, string>> = {
  "U U-wrapper-forms": "S-U-wrapper-forms",
  "U W-G14-E7": "S-W-G14-E7",
  "U U-wrapper-imports": "S-U-wrapper-imports",
  "NS W-G14-R34": "S-W-G14-R34",
  "EN U-EN-self": "S-U-EN-self",
  "M W-G14-M10": "S-W-G14-M10",
  "M W-G14-M20": "S-W-G14-M20",
  "I W-G14-I5": "S-W-G14-I5",
};

/** The named residual families: one per row Q pin, each its own pinned quiet row. */
export const RESIDUAL_FAMILIES: Readonly<Record<string, readonly string[]>> = Object.fromEntries((ROWS.find(row => row.id === "Q")?.pins ?? []).map(pin => [pin.id, [`Q ${pin.id}`]]));

export const titleOf = (row: Row, pin: PlantPin): string => `${row.id} ${pin.id}`;
