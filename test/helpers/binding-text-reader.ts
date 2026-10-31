/**
 * wb-jwc.10 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17; the rule-19 structural-exit child of wb-jwc.7,
 * orchestrator rulings R-B92 and R-B115): census text readers that resolve an identifier by its BINDING, never by its name.
 *
 * WHY. wb-jwc.7's census (test/workbench-rf-stderr-receipt-capture-census.test.ts on its machine branch, not on trunk) reads an
 * identifier through every same-file const of its name, whatever binding the identifier has. A let or a parameter that shadows a
 * same-named const read as the const's text (its refusal #3 members S1, S2 and S3: an under-report its reader's premise called an
 * over-report). Its command-word reader joins the sides of ?? / || / ?: and writes a space for a part it cannot read, so a launch
 * program with an unresolvable part reads as its resolvable part (refusal #4's E1 and E2), and a registration id whose
 * reactivefiber.* alternative is not its first readable side registers nothing (refusal #4's R-ALT1, R-ALT2 and R-ALT4).
 *
 * WHAT. bindingTextReader(path, text) parses one module, binds it with TypeScript's checker in a program over that module alone,
 * and reads its expressions as BINDING_TEXT_CLAIM states, part by part (BINDING_FORMS, TEXT_FORMS and READING_FORMS), each part
 * claimed over exactly the forms its census row plants; RESIDUAL_FORMS names the families no row plants (NOT CLAIMED, each with a
 * quiet row). The census test/workbench-rf-binding-text-reader-census.test.ts holds the claim byte-for-byte and pins every part
 * with planted modules. wb-jwc.7's census (blocked by this bead, R-B115) can take these readers in place of its own nameResolved,
 * textsOf, commandText and rfRegistrations; MEMBERS names the gate members folded into this bead (ruling R-B115's, refusal #1's
 * and refusal #2's), each bound to the part whose row pins it.
 */
import ts from "typescript";

/** One part of the claim: the id the census rows answer, and its words. */
export interface ClaimPart<T extends string> {
  readonly id: T;
  readonly text: string;
}

export type BindingFormId = "scope" | "const" | "kinds" | "with" | "eval" | "cycle";
export type TextFormId = "literal" | "identifier" | "template" | "plus" | "conditional" | "nullish" | "or" | "and" | "wrapper" | "other" | "opaque-part" | "bounds" | "order";
export type ReadingFormId = "texts" | "words" | "program" | "properties" | "registration";
export type ResidualFormId = "eval-position" | "alias-form" | "path-form" | "expression-form" | "character-form";
export type FormId = BindingFormId | TextFormId | ReadingFormId | ResidualFormId;

/** BINDING: what an identifier reads as. */
export const BINDING_FORMS: readonly ClaimPart<BindingFormId>[] = [
  {
    id: "scope",
    text: "an identifier is read through the declaration TypeScript's checker binds it to by scope, in a program over its own module alone (no lib, no module resolution), and a shorthand property's name through the binding of its value; the module is parsed as JavaScript at a path ending .js, .cjs, .mjs or .jsx, in lower or upper case or as .Js, and as TypeScript at a path ending .ts, .cts, .mts, .tsx, .TS, .json, .d.ts or .js.txt, or with no extension",
  },
  {
    id: "const",
    text: "it resolves only when that binding is exactly one declaration, a const with an initializer that declares the name itself (an element of a destructuring pattern never resolves) and that the checker binds as no alias, outside an ambient (declare) context and not exported from a namespace body, and it then reads as that initializer's alternatives; so a const shadowing a same-named const reads its own initializer inside its scope and the outer one's outside it",
  },
  {
    id: "kinds",
    text: "any other binding does not resolve and reads as <opaque NAME:KIND>, NAME the identifier and KIND the first of these that names the binding: import (a binding the checker binds as an alias: an import or import-equals, merged or not, and in a JavaScript module a require declaration - a const, let or var declaration, or a top-level element of its object or array pattern, a defaulted one included, initialized directly by require with one string or no-substitution template argument or by a property access of such a call, not exported - while an exported, parenthesized, joined-argument, two-argument, nested-pattern, module.require or JSDoc-typed require declaration is no alias); unbound (no declaration in the module, a type's name in a value position included); merged (more than one declaration); destructuring (an element of a destructuring pattern, whatever declares the pattern: a const, let or var declaration, a parameter or a catch clause); let (a let declaration, declare let and a let exported from a namespace body included); var (a var declaration, declare var and a var exported from a namespace body included); using (a using or await using declaration); catch (a catch clause variable, with a type annotation or without); no-initializer (a const with no initializer); ambient (a const in an ambient context); namespace (a namespace, or a const exported from a namespace body); parameter; function (a function declaration, or a named function expression's own name); class (a class declaration, or a named class expression's own name); enum (an enum or an enum member); other (a declaration of any other kind)",
  },
  {
    id: "with",
    text: "an identifier inside a with statement's body, at any depth (nested blocks, functions, classes and with statements included), reads as <opaque NAME:with>, whatever it binds",
  },
  {
    id: "eval",
    text: "every identifier of a module that calls eval by name reads as <opaque NAME:eval>, whatever it binds, a with statement's body included: a call, optional or not and with or without arguments, whose callee is the identifier eval itself (evaluate, preval, Eval, EVAL, ev and evalx are other names) inside any parentheses, as, satisfies, non-null !, type assertion or await, as a statement at the top level or in a function, an async function, a class method or a with body, or inside an object literal's method, a template substitution, an arrow function's body, a const's initializer, a parameter default, a class static block, a class field's initializer, a getter's body, a computed property key, an enum member's initializer, a return statement or a call's argument; a new expression, a tagged template and an uncalled decorator are no call",
  },
  {
    id: "cycle",
    text: "an identifier whose const's initializer reaches that same const (the same declaration, not a same-named one) again reads, at the repeated reach, as <opaque NAME:cycle>, NAME the identifier there, the expression's other alternatives read as usual",
  },
];

/** TEXT: the alternatives an expression spells. */
export const TEXT_FORMS: readonly ClaimPart<TextFormId>[] = [
  {
    id: "literal",
    text: "a string or no-substitution template literal: its text, each escape sequence read as the character it stands for, as TypeScript cooks it (\\x, \\u, \\u{...}, \\n, \\t, \\\\, \\\", \\', \\0, an octal escape and a line continuation)",
  },
  { id: "identifier", text: "an identifier: as BINDING reads it" },
  { id: "template", text: "a template with substitutions: every combination of its literal parts' texts (escape sequences read) and its substitutions' alternatives, in order" },
  { id: "plus", text: "a + join: every combination of its left side's and its right side's alternatives" },
  { id: "conditional", text: "a ?: expression: its two branches' alternatives, its condition unread" },
  { id: "nullish", text: "a ?? expression: both sides' alternatives" },
  { id: "or", text: "a || expression: both sides' alternatives" },
  { id: "and", text: "a && expression: both sides' alternatives" },
  { id: "wrapper", text: "parentheses, as, satisfies, a non-null !, a type assertion and await: the inner expression's alternatives" },
  {
    id: "other",
    text: "any other expression (every binary operator but +, ??, || and &&, the plain and compound assignments and the comma included, every prefix and postfix operator, void, typeof and delete, a call, optional or not, a new expression, a property or element access, optional or not, a property access through a non-null !, a number, bigint or regular expression literal, true, false, null, this, a property of super, a tagged template, an arrow function, a function or class expression, a spread, yield, import.meta, new.target, an instantiation expression and an object or array literal): one <opaque TEXT>, TEXT its source text with each run of the characters JavaScript's \\s class matches read as one space (U+0085 and U+200B, which it does not match, stay)",
  },
  {
    id: "opaque-part",
    text: "each combination with an opaque part reads as its first opaque part's alternative, and each combination without one as its joined text, so a join keeps its exact alternatives beside its opaque ones",
  },
  {
    id: "bounds",
    text: "a template or + join with more than 64 combinations (counted before any two are found to read alike), or an expression read more than 16 levels deep (each wrapper, each identifier followed to its initializer, and each side, branch or substitution read counting one level), reads, where the bound is passed, as one <opaque TEXT:bound>, TEXT that expression's source text",
  },
  {
    id: "order",
    text: "the alternatives are listed in source order (a left side's or a true branch's first, a combination's by its parts, the first part varying slowest), each once, a text and an opaque part with the same label being two alternatives",
  },
];

/** READINGS: what a census reads from those alternatives. */
export const READING_FORMS: readonly ClaimPart<ReadingFormId>[] = [
  { id: "texts", text: "an expression's texts: its alternatives' texts, in order, when none is opaque; unresolved otherwise" },
  {
    id: "words",
    text: "a command's words: every alternative's text split at each run of whitespace (the characters JavaScript's \\s class matches), quotes (\" ' and `, at a word's end or inside it) and the shell operators ; & | ( ) < >, and at no other printable ASCII character (U+0085 and U+200B split nothing either), each word then cut to the text after its last / or \\ and a trailing .exe or .cmd (either case) dropped, so a word can cut to the empty word; each word once, the empty word included, in order of first appearance; unresolved when any alternative is opaque",
  },
  {
    id: "program",
    text: "a launch program: when every alternative is a text with a first word (READINGS (2)'s first word, the empty word included), those first words, sorted, each once, joined by |; otherwise <opaque TEXT>, TEXT the program expression's source text with each whitespace run read as TEXT (10) reads it",
  },
  {
    id: "properties",
    text: "an object literal's fields, member by member in source order, a later member overriding: a property assignment whose key is a name, a string or numeric literal, or a computed key whose expression, inside any of the wrappers TEXT (9) names, is a string or no-substitution template literal sets its field, and so does a shorthand property; a method, getter or setter with such a key makes its own field opaque; a spread whose expression, inside any of those wrappers, is an identifier BINDING resolves to a const whose initializer, inside any of those wrappers, is an object literal whose own fields hold no opaque member (a method, getter or setter included; spreads nested at most 8 deep) sets the fields it holds; any other member (a spread of anything else, or a member with any other key, a computed number included) is opaque and may set every field",
  },
  {
    id: "registration",
    text: "a registration: an object literal whose id field has a text alternative starting reactivefiber. (reactivefiber, reactivefiberx.b, ReactiveFiber.d, forge.reactivefiber.c and a text with a leading space start no such text), read as one ID:EFFECT entry per such text and per opaque alternative of that id, the object's entries sorted, each once, ID the text or <opaque LABEL>; EFFECT its effectClass field's alternatives (a text as itself, an opaque one as <opaque LABEL>), sorted, each once, joined by |, or <none> when it has no effectClass field; a field an opaque member may set after its last setting, or in place of one, reads <opaque MEMBER>, MEMBER the label of the last such member (...expression for a spread, its key's source text, or get name, set name or name() for an accessor or method)",
  },
];

/** NOT CLAIMED: the named residual families, each a family of forms no claim row plants; each part's row is its quiet row. */
export const RESIDUAL_FORMS: readonly ClaimPart<ResidualFormId>[] = [
  { id: "eval-position", text: "an eval call at a position no eval row page plants, whose quiet row reads a module calling eval in a switch statement's head" },
  { id: "alias-form", text: "a JavaScript module's require declaration in a form no const or import page plants, whose quiet row reads a require reached through a comma expression" },
  { id: "path-form", text: "a path in a form no scope page plants, whose quiet row reads the JavaScript page at a path ending .Mjs" },
  { id: "expression-form", text: "an expression kind no other row page plants, whose quiet row reads a JSX element and fragment in a .tsx module" },
  { id: "character-form", text: "a character no words row page plants, whose quiet row reads a command word holding a letter outside ASCII" },
];

function joined(parts: readonly ClaimPart<string>[]): string {
  return parts.map((part, index) => `(${index + 1}) ${part.text}`).join("; ");
}

/** THE CLAIM, byte-for-byte: the census's header holds this paragraph, and its planted rows pin each part. */
export const BINDING_TEXT_CLAIM =
  `BINDING: ${joined(BINDING_FORMS)}. TEXT: an expression's alternatives are ${joined(TEXT_FORMS)}. ` +
  `READINGS: ${joined(READING_FORMS)}. Each part claims its words over exactly the forms its census row's pages plant, the roster ` +
  `naming them pin by pin. NOT CLAIMED (named residuals, each read today by its quiet row): ${joined(RESIDUAL_FORMS)}. ` +
  "No reading claims more than these parts state.";

/**
 * The gate members folded into this bead, each with the part whose row holds its pin (the pin is named by the member's id): ruling
 * R-B115's (its note; outbox row O:1399), refusal #1's (gate-prep-23, run g10-gate-s152, outbox row O:1485: the surviving helper
 * mutants g01 to g10, each pinned by the twin page the refusal names, read as the delivered reader reads it) and refusal #2's
 * (gate-prep-1, run g10-gate-s161, outbox row O:1546: the surviving helper mutants m06 to m72 of its U1a to U1h as M06 to M72, its
 * U2 plant p1.js as P1, its F4 plant p2.ts as P2 and its F5 mutant m21 as M21, each pinned by the twin page the refusal names, byte
 * for byte, read as the delivered reader reads it).
 */
export const MEMBERS: readonly { readonly id: string; readonly form: FormId; readonly source: string }[] = [
  { id: "R-ALT1", form: "registration", source: "R-B115 U1(a)" },
  { id: "R-ALT2", form: "registration", source: "R-B115 U1(a)" },
  { id: "R-ALT3", form: "registration", source: "R-B115 U1(a) control" },
  { id: "R-ALT4", form: "registration", source: "R-B115 U1(a)" },
  { id: "E1", form: "program", source: "R-B115 U1(b)" },
  { id: "E2", form: "program", source: "R-B115 U1(b)" },
  { id: "E3", form: "program", source: "R-B115 U1(b) control" },
  { id: "A10", form: "scope", source: "O:1399 U1(c)" },
  { id: "G01", form: "kinds", source: "refusal #1 U1a (g01, O:1485)" },
  { id: "G02", form: "with", source: "refusal #1 U1b (g02, O:1485)" },
  { id: "G03", form: "eval", source: "refusal #1 U1c (g03, O:1485)" },
  { id: "G04", form: "cycle", source: "refusal #1 U1d (g04, O:1485)" },
  { id: "G05", form: "bounds", source: "refusal #1 U1e (g05, O:1485)" },
  { id: "G06", form: "bounds", source: "refusal #1 U1f (g06, O:1485)" },
  { id: "G07", form: "bounds", source: "refusal #1 U1g (g07, O:1485)" },
  { id: "G08", form: "kinds", source: "refusal #1 U1h (g08, O:1485)" },
  { id: "G09", form: "kinds", source: "refusal #1 U1i (g09, O:1485)" },
  { id: "G10", form: "opaque-part", source: "refusal #1 U1j (g10, O:1485)" },
  { id: "M21", form: "scope", source: "refusal #2 F5 (m21, O:1546)" },
  { id: "M55", form: "kinds", source: "refusal #2 U1g (m55, O:1546)" },
  { id: "P1", form: "kinds", source: "refusal #2 U2 (plant p1.js, O:1546)" },
  { id: "M61", form: "eval", source: "refusal #2 U1a (m61, O:1546)" },
  { id: "M62", form: "eval", source: "refusal #2 U1a (m62, O:1546)" },
  { id: "M63", form: "eval", source: "refusal #2 U1a (m63, O:1546)" },
  { id: "M64", form: "eval", source: "refusal #2 U1a (m64, O:1546)" },
  { id: "M66", form: "eval", source: "refusal #2 U1a (m66, O:1546)" },
  { id: "M72", form: "eval", source: "refusal #2 U1a (m72, O:1546)" },
  { id: "M11", form: "eval", source: "refusal #2 U1b (m11, O:1546)" },
  { id: "M06", form: "order", source: "refusal #2 U1c (m06, O:1546)" },
  { id: "M59", form: "words", source: "refusal #2 U1h (m59, O:1546)" },
  { id: "M68", form: "words", source: "refusal #2 U1h (m68, O:1546)" },
  { id: "M69", form: "words", source: "refusal #2 U1h (m69, O:1546)" },
  { id: "M34", form: "words", source: "refusal #2 U1h (m34, O:1546)" },
  { id: "P2", form: "words", source: "refusal #2 F4 (plant p2.ts, O:1546)" },
  { id: "M19", form: "properties", source: "refusal #2 U1f (m19, O:1546)" },
  { id: "M26", form: "properties", source: "refusal #2 U1f (m26, O:1546)" },
  { id: "M12", form: "registration", source: "refusal #2 U1d (m12, O:1546)" },
  { id: "M13", form: "registration", source: "refusal #2 U1d (m13, O:1546)" },
  { id: "M14", form: "registration", source: "refusal #2 U1d (m14, O:1546)" },
  { id: "M15", form: "registration", source: "refusal #2 U1e (m15, O:1546)" },
];

/** What a binding that does not resolve is (BINDING_FORMS kinds). */
export type BindingKind =
  | "let"
  | "var"
  | "using"
  | "parameter"
  | "catch"
  | "destructuring"
  | "function"
  | "class"
  | "enum"
  | "namespace"
  | "import"
  | "no-initializer"
  | "ambient"
  | "merged"
  | "unbound"
  | "other";

/** What an identifier resolves to: a const and its initializer, or why it does not resolve. */
export type Resolution =
  | { readonly kind: "const"; readonly declaration: ts.VariableDeclaration; readonly initializer: ts.Expression }
  | { readonly kind: BindingKind | "with" | "eval" };

/** One alternative of an expression: an exact text, or an opaque part's label. */
export type Alternative = { readonly text: string } | { readonly opaque: string };

/** An object literal's fields (READING_FORMS properties): each field's last resolved route, and the opaque members that may set one. */
export interface Fields {
  readonly values: ReadonlyMap<string, ts.Expression>;
  /** field name -> the label of an opaque member that may set it after its last resolved route; "*" for a member that may set every field. */
  readonly opaque: ReadonlyMap<string, string>;
}

export interface BindingTextReader {
  readonly path: string;
  readonly source: ts.SourceFile;
  resolve(identifier: ts.Identifier): Resolution;
  alternatives(node: ts.Expression): readonly Alternative[];
  /** Every exact text, or undefined when any alternative is opaque. */
  exact(node: ts.Expression): readonly string[] | undefined;
  words(node: ts.Expression): readonly string[] | undefined;
  program(node: ts.Expression): string;
  fields(object: ts.ObjectLiteralExpression): Fields;
  registration(object: ts.ObjectLiteralExpression): readonly string[] | undefined;
  /** Every registration entry of the module (each object literal's, in turn), sorted. */
  registrations(): readonly string[];
}

const MAX_COMBINATIONS = 64;
const MAX_DEPTH = 16;
const MAX_SPREADS = 8;

/** A node's source text with each run of the characters \s matches read as one space. */
export function sourceText(node: ts.Node): string {
  return node.getText().replace(/\s+/g, " ");
}
/** An alternative as a census reads it: a text as its JSON string, an opaque part as <opaque LABEL>. */
export function rendered(alternatives: readonly Alternative[]): string {
  return alternatives.map((alternative) => ("text" in alternative ? JSON.stringify(alternative.text) : `<opaque ${alternative.opaque}>`)).join(" | ");
}
/** A command line's words: split at whitespace runs, quotes and shell operators, each cut after its last / or \ (.exe/.cmd dropped). */
export function commandWords(command: string): string[] {
  return command
    .split(/[\s"'`;&|()<>]+/)
    .filter(Boolean)
    .map((word) => (word.split(/[\\/]/).pop() ?? word).replace(/\.(?:exe|cmd)$/i, ""));
}
function unwrapped(node: ts.Expression): ts.Expression {
  let at = node;
  while (ts.isParenthesizedExpression(at) || ts.isAsExpression(at) || ts.isSatisfiesExpression(at) || ts.isNonNullExpression(at) || ts.isTypeAssertionExpression(at) || ts.isAwaitExpression(at))
    at = at.expression;
  return at;
}
function isAmbient(node: ts.Node): boolean {
  for (let at: ts.Node | undefined = node; at !== undefined; at = at.parent)
    if (ts.canHaveModifiers(at) && (ts.getModifiers(at) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.DeclareKeyword)) return true;
  return false;
}
function isExported(statement: ts.Node): boolean {
  return ts.canHaveModifiers(statement) && (ts.getModifiers(statement) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);
}
/** The kind of a single declaration an identifier binds to (BINDING_FORMS const and kinds). */
export function bindingKindOf(declaration: ts.Declaration): BindingKind | "const" {
  if (ts.isVariableDeclaration(declaration)) {
    if (ts.isCatchClause(declaration.parent)) return "catch";
    const list = declaration.parent;
    if (!ts.isVariableDeclarationList(list)) return "other";
    const scoped = list.flags & ts.NodeFlags.BlockScoped;
    if (scoped === ts.NodeFlags.Let) return "let";
    if (scoped === 0) return "var";
    if (scoped !== ts.NodeFlags.Const) return "using";
    if (declaration.initializer === undefined) return "no-initializer";
    if (isAmbient(declaration)) return "ambient";
    if (ts.isVariableStatement(list.parent) && isExported(list.parent) && ts.isModuleBlock(list.parent.parent)) return "namespace";
    return "const";
  }
  if (ts.isParameter(declaration)) return "parameter";
  if (ts.isBindingElement(declaration)) return "destructuring";
  if (ts.isFunctionDeclaration(declaration) || ts.isFunctionExpression(declaration)) return "function";
  if (ts.isClassDeclaration(declaration) || ts.isClassExpression(declaration)) return "class";
  if (ts.isEnumDeclaration(declaration) || ts.isEnumMember(declaration)) return "enum";
  if (ts.isModuleDeclaration(declaration)) return "namespace";
  return "other";
}
function propertyText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) || ts.isPrivateIdentifier(name) || ts.isNoSubstitutionTemplateLiteral(name)) return name.text;
  if (ts.isComputedPropertyName(name)) {
    const key = unwrapped(name.expression);
    return ts.isStringLiteralLike(key) ? key.text : undefined;
  }
  return undefined;
}
function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}

const readers = new Map<string, BindingTextReader>();

/** A reader over one module (BINDING_TEXT_CLAIM): parsed, and bound by TypeScript's checker in a program over that module alone. */
export function bindingTextReader(path: string, text: string): BindingTextReader {
  const key = `${path}\n${text}`;
  const known = readers.get(key);
  if (known !== undefined) return known;
  const extension = /\.(?:[cm]?[jt]s|[jt]sx)$/i.exec(path)?.[0]?.toLowerCase() ?? ".ts";
  const name = `binding-text-reader-module${extension}`;
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true);
  const options: ts.CompilerOptions = { noLib: true, noResolve: true, allowJs: true, types: [], target: ts.ScriptTarget.Latest };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (file) => (file === name ? source : undefined);
  host.fileExists = (file) => file === name;
  host.readFile = (file) => (file === name ? text : undefined);
  const checker = ts.createProgram({ rootNames: [name], options, host }).getTypeChecker();
  let evaluates = false;
  visit(source, (node) => {
    if (ts.isCallExpression(node)) {
      const callee = unwrapped(node.expression);
      if (ts.isIdentifier(callee) && callee.text === "eval") evaluates = true;
    }
  });

  const resolve = (identifier: ts.Identifier): Resolution => {
    if (evaluates) return { kind: "eval" };
    let child: ts.Node = identifier;
    for (let at: ts.Node | undefined = identifier.parent; at !== undefined; at = at.parent) {
      if (ts.isWithStatement(at) && at.statement === child) return { kind: "with" };
      child = at;
    }
    const parent = identifier.parent;
    const symbol = parent !== undefined && ts.isShorthandPropertyAssignment(parent) && parent.name === identifier ? checker.getShorthandAssignmentValueSymbol(parent) : checker.getSymbolAtLocation(identifier);
    if (symbol === undefined) return { kind: "unbound" };
    if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) return { kind: "import" };
    const declarations = symbol.declarations ?? [];
    if (declarations.length === 0) return { kind: "unbound" };
    if (declarations.length > 1) return { kind: "merged" };
    const declaration = declarations[0];
    const kind = bindingKindOf(declaration);
    if (kind === "const" && ts.isVariableDeclaration(declaration) && declaration.initializer !== undefined) return { kind, declaration, initializer: declaration.initializer };
    return { kind: kind === "const" ? "other" : kind };
  };

  const alternativesAt = (node: ts.Expression, depth: number, active: ReadonlySet<ts.Declaration>): Alternative[] => {
    if (depth > MAX_DEPTH) return [{ opaque: `${sourceText(node)}:bound` }];
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isNonNullExpression(node) || ts.isTypeAssertionExpression(node) || ts.isAwaitExpression(node))
      return alternativesAt(node.expression, depth + 1, active);
    if (ts.isStringLiteralLike(node)) return [{ text: node.text }];
    if (ts.isIdentifier(node)) {
      const resolution = resolve(node);
      if (resolution.kind !== "const") return [{ opaque: `${node.text}:${resolution.kind}` }];
      if (active.has(resolution.declaration)) return [{ opaque: `${node.text}:cycle` }];
      return alternativesAt(resolution.initializer, depth + 1, new Set([...active, resolution.declaration]));
    }
    const combined = (parts: readonly (readonly Alternative[])[]): Alternative[] => {
      let combinations: Alternative[][] = [[]];
      for (const part of parts) {
        combinations = combinations.flatMap((prefix) => part.map((alternative) => [...prefix, alternative]));
        if (combinations.length > MAX_COMBINATIONS) return [{ opaque: `${sourceText(node)}:bound` }];
      }
      return once(combinations.map((combination) => combination.find((alternative) => "opaque" in alternative) ?? { text: combination.map((alternative) => ("text" in alternative ? alternative.text : "")).join("") }));
    };
    if (ts.isTemplateExpression(node))
      return combined([[{ text: node.head.text }], ...node.templateSpans.flatMap((span) => [alternativesAt(span.expression, depth + 1, active), [{ text: span.literal.text }]])]);
    if (ts.isConditionalExpression(node)) return once([...alternativesAt(node.whenTrue, depth + 1, active), ...alternativesAt(node.whenFalse, depth + 1, active)]);
    if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind;
      if (operator === ts.SyntaxKind.PlusToken) return combined([alternativesAt(node.left, depth + 1, active), alternativesAt(node.right, depth + 1, active)]);
      if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken || operator === ts.SyntaxKind.AmpersandAmpersandToken)
        return once([...alternativesAt(node.left, depth + 1, active), ...alternativesAt(node.right, depth + 1, active)]);
    }
    return [{ opaque: sourceText(node) }];
  };
  const alternatives = (node: ts.Expression): readonly Alternative[] => alternativesAt(node, 0, new Set());

  const fieldsAt = (object: ts.ObjectLiteralExpression, depth: number): Fields => {
    const values = new Map<string, ts.Expression>();
    const opaque = new Map<string, string>();
    const set = (name: string, value: ts.Expression): void => {
      values.set(name, value);
      opaque.delete(name);
    };
    const everyField = (label: string): void => {
      for (const name of [...values.keys(), ...opaque.keys()]) if (name !== "*") opaque.set(name, label);
      opaque.set("*", label);
    };
    for (const member of object.properties) {
      if (ts.isSpreadAssignment(member)) {
        const spread = unwrapped(member.expression);
        const resolution = ts.isIdentifier(spread) ? resolve(spread) : undefined;
        const literal = resolution?.kind === "const" ? unwrapped(resolution.initializer) : undefined;
        const inner = literal !== undefined && ts.isObjectLiteralExpression(literal) && depth < MAX_SPREADS ? fieldsAt(literal, depth + 1) : undefined;
        if (inner === undefined || inner.opaque.size > 0) everyField(`...${sourceText(member.expression)}`);
        else for (const [name, value] of inner.values) set(name, value);
      } else if (ts.isShorthandPropertyAssignment(member)) set(member.name.text, member.name);
      else {
        const name = member.name === undefined ? undefined : propertyText(member.name);
        if (ts.isPropertyAssignment(member)) {
          if (name === undefined) everyField(sourceText(member.name));
          else set(name, member.initializer);
        } else {
          const label = `${ts.isGetAccessorDeclaration(member) ? "get " : ts.isSetAccessorDeclaration(member) ? "set " : ""}${name ?? sourceText(member.name)}${ts.isMethodDeclaration(member) ? "()" : ""}`;
          if (name === undefined) everyField(label);
          else opaque.set(name, label);
        }
      }
    }
    return { values, opaque };
  };
  const fields = (object: ts.ObjectLiteralExpression): Fields => fieldsAt(object, 0);

  const registration = (object: ts.ObjectLiteralExpression): readonly string[] | undefined => {
    const read = fields(object);
    const id = read.values.get("id");
    const ids = id === undefined ? [] : alternatives(id);
    if (!ids.some((alternative) => "text" in alternative && alternative.text.startsWith("reactivefiber."))) return undefined;
    const label = (field: string): string | undefined => read.opaque.get(field) ?? (read.values.has(field) ? undefined : read.opaque.get("*"));
    const idLabel = label("id");
    const idEntries =
      idLabel !== undefined
        ? [`<opaque ${idLabel}>`]
        : ids.flatMap((alternative) => ("opaque" in alternative ? [`<opaque ${alternative.opaque}>`] : alternative.text.startsWith("reactivefiber.") ? [alternative.text] : []));
    const effectLabel = label("effectClass");
    const effect = read.values.get("effectClass");
    const effectText =
      effectLabel !== undefined
        ? `<opaque ${effectLabel}>`
        : effect === undefined
          ? "<none>"
          : [...new Set(alternatives(effect).map((alternative) => ("text" in alternative ? alternative.text : `<opaque ${alternative.opaque}>`)))].sort().join("|");
    return [...new Set(idEntries)].sort().map((entry) => `${entry}:${effectText}`);
  };

  const reader: BindingTextReader = {
    path,
    source,
    resolve,
    alternatives,
    exact: (node) => {
      const read = alternatives(node);
      return read.every((alternative) => "text" in alternative) ? read.map((alternative) => ("text" in alternative ? alternative.text : "")) : undefined;
    },
    words: (node) => {
      const read = alternatives(node);
      if (read.some((alternative) => "opaque" in alternative)) return undefined;
      return [...new Set(read.flatMap((alternative) => ("text" in alternative ? commandWords(alternative.text) : [])))];
    },
    program: (node) => {
      const firsts = alternatives(node).map((alternative) => ("text" in alternative ? commandWords(alternative.text)[0] : undefined));
      return firsts.some((first) => first === undefined) ? `<opaque ${sourceText(node)}>` : [...new Set(firsts)].sort().join("|");
    },
    fields,
    registration,
    registrations: () => {
      const entries: string[] = [];
      visit(source, (node) => {
        if (ts.isObjectLiteralExpression(node)) entries.push(...(registration(node) ?? []));
      });
      return entries.sort();
    },
  };
  readers.set(key, reader);
  return reader;
}

/** Alternatives each once, in order: a text by its text, an opaque part by its label. */
function once(alternatives: readonly Alternative[]): Alternative[] {
  const seen = new Set<string>();
  return alternatives.filter((alternative) => {
    const key = "text" in alternative ? `t${alternative.text}` : `o${alternative.opaque}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
