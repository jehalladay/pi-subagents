/**
 * wb-jwc.10 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17; the rule-19 structural-exit child of wb-jwc.7,
 * orchestrator rulings R-B92 and R-B115): the claim of the binding text reader census, part by part, and the gate members
 * folded into this bead.
 *
 * WHY. wb-jwc.7's census (test/workbench-rf-stderr-receipt-capture-census.test.ts on its machine branch, not on trunk) reads an
 * identifier through every same-file const of its name, whatever binding the identifier has. A let or a parameter that shadows a
 * same-named const read as the const's text (its refusal #3 members S1, S2 and S3: an under-report its reader's premise called an
 * over-report). Its command-word reader joins the sides of ?? / || / ?: and writes a space for a part it cannot read, so a launch
 * program with an unresolvable part reads as its resolvable part (refusal #4's E1 and E2), and a registration id whose
 * reactivefiber.* alternative is not its first readable side registers nothing (refusal #4's R-ALT1, R-ALT2 and R-ALT4).
 *
 * WHAT. The reader is test/helpers/rf-binding-text-reader.ts (bindingTextReader), which wb-jwc.13 landed (landing 881, merge
 * f729dd40): ruling R-B263 parked this bead behind that child, and the child moved this bead's cut #4 reader there, its code
 * byte for byte. This file holds the claim the census test/workbench-rf-binding-text-reader-census.test.ts makes of that
 * reader: BINDING_TEXT_CLAIM states it part by part (BINDING_FORMS, TEXT_FORMS and READING_FORMS), each part claimed over
 * exactly the forms its census row plants; RESIDUAL_FORMS names the families no row plants (NOT CLAIMED, each with a quiet
 * row). Cut #4 (R-B233, the fail-closed core) narrowed BINDING (3) and (5), TEXT (12) and READINGS (2), (3) and (5) to their
 * planted sub-forms, refusal #3's U1a to U1d and U2 deferred to wb-jwc.13. Cut #5, the post-inversion restatement over the
 * landed reader, claims READINGS (1) only for the expressions its row reads, and READINGS (2) and (3) for two or more
 * alternatives (and READINGS (2) for an opaque one) only as their rows read them, naming the rest NOT CLAIMED in the part
 * itself: refusal #4's U1a to U1d, whose pins wb-jwc.13's landed sub-form census holds, and the same-class forms beside them. Cut
 * #6, the second restatement over the landed reader (the post-ladder disposition R-B470 of refusal #5), claims BINDING (2) and
 * (3) only for the declaration positions its parts name, the positions the census's pages plant, and READINGS (2)'s dropped
 * extensions only in the five spellings its pages plant, and adds refusal #5's members to MEMBERS. The census holds the claim
 * byte-for-byte and pins every part with planted modules. wb-jwc.7's census (blocked by this bead, R-B115) can take the reader
 * in place of its own nameResolved, textsOf, commandText and rfRegistrations; MEMBERS names the gate members folded into this
 * bead (ruling R-B115's, refusal #1's, refusal #2's and refusal #5's), each bound to the part whose row pins it.
 */
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
    text: "it resolves only when that binding is exactly one declaration, a const with an initializer that declares the name itself (an element of a destructuring pattern never resolves) and that the checker binds as no alias, outside an ambient (declare) context and not exported from a namespace body, and it then reads as that initializer's alternatives; so a const shadowing a same-named const reads its own initializer inside its scope and the outer one's outside it; this part is claimed only for a const declared at the top level, plain or exported, in a block at the top level or in a block nested in one, in the body of a plain, an exported or an exported async function declared at the top level, in the body of a plain namespace declared at the top level or in a for statement's head at the top level (plain naming a declaration with no modifier, exported one with the export modifier alone, async one with the async modifier alone and exported async one with those two alone), a const declared at any other position being NOT CLAIMED here",
  },
  {
    id: "kinds",
    text: "any other binding does not resolve and reads as <opaque NAME:KIND>, NAME the identifier and KIND the first of these that names the binding: import (a binding the checker binds as an alias: an import or import-equals at the top level, merged or not, and in a JavaScript module a require declaration at the top level, or a const one in the body of a plain function declared at the top level - a const, let or var declaration, or a top-level element of its object or array pattern, a defaulted one included, initialized directly by require with one string or no-substitution template argument or by a property access of such a call, not exported - while an exported, parenthesized, joined-argument, two-argument, nested-pattern, module.require or JSDoc-typed require declaration is no alias); unbound (no declaration in the module, a type's name in a value position included); merged (more than one declaration, each at the top level); destructuring (an element of a destructuring pattern, whatever declares the pattern: a plain const declaration's object or array pattern at the top level or an object pattern nested in one, a plain let or var declaration's object pattern at the top level, a const's object pattern in a for-of statement's head at the top level, an object pattern parameter of a plain function declared at the top level or an object pattern catch clause variable of a try at the top level); let (a plain let declaration at the top level, with or without an initializer, or a declare one, a let declaration in the body of an exported or an exported async function declared at the top level, one exported from the body of a plain namespace declared at the top level or one in a for-of statement's head at the top level); var (a plain var declaration at the top level or a declare one, a var declaration in the body of a plain function declared at the top level, one exported from the body of a plain namespace declared at the top level or one in a for-of statement's head at the top level); using (a using declaration in a block at the top level, or an await using declaration in the body of an async function declared at the top level); catch (a catch clause variable of a try at the top level with no type annotation, or of a try in the body of an exported function declared at the top level with the annotation unknown, while one with any other annotation is NOT CLAIMED); no-initializer (a const with no initializer: in a for-of or for-in statement's head at the top level, a declare const at the top level, or one exported from the body of a plain or a declare namespace declared at the top level); ambient (a const in an ambient context: a declare const at the top level, a const in a declare global block at the top level, or one exported from the body of a declare namespace declared at the top level or of a plain namespace nested in one); namespace (a plain namespace declared at the top level, or an exported one in the body of an exported namespace declared at the top level, or a const exported from the body of a plain namespace declared at the top level, of an exported namespace nested in an exported one declared at the top level or of an exported dotted namespace, export namespace C.D); parameter (a parameter of a plain, an exported or an exported async function declared at the top level, a rest parameter of a plain one included, a defaulted parameter of an arrow function initializing a plain const at the top level, a public parameter property of a constructor of a plain class declared at the top level, or a parameter of a method or of a set accessor of an exported class declared at the top level); function (a function declaration at the top level, plain, async, generator or declare, one exported from the body of a plain namespace declared at the top level or one in the body of an exported function declared at the top level, or a named function expression's own name, read in its own body, the expression initializing a plain const at the top level); class (a class declaration at the top level, plain or declare, one exported from the body of a plain namespace declared at the top level or one in the body of an exported function declared at the top level, or a named class expression's own name, read in its own method, the expression initializing a plain const at the top level); enum (an enum declaration at the top level, plain, const or declare, one exported from the body of a plain namespace declared at the top level or one in the body of an exported function declared at the top level, or a member of a plain enum declared at the top level, read in that enum); other (a declaration of any other kind, claimed only for a type alias declaration that no module holds) - each kind is claimed only for the declarations its entry names, at the positions it names, each declaration plain where its entry names no modifier of it (plain, exported and async as BINDING (2) reads them), and a declaration at any other position or with any other modifiers is NOT CLAIMED",
  },
  {
    id: "with",
    text: "an identifier inside a with statement's body, at any depth (nested blocks, functions, classes and with statements included), reads as <opaque NAME:with>, whatever it binds",
  },
  {
    id: "eval",
    text: "every identifier of a module that calls eval by name reads as <opaque NAME:eval>, whatever it binds, a with statement's body included: a call, optional or not, with no argument or with one string literal argument, whose callee is the identifier eval itself (evaluate, preval, Eval, EVAL, ev and evalx are other names) inside any parentheses, as, satisfies, non-null !, type assertion or await, as a statement at the top level or in a function, an async function, a class method or a with body, or inside an object literal's method, a template substitution, an arrow function's body, a const's initializer, a parameter default, a class static block, a class field's initializer, a getter's body, a computed property key, an enum member's initializer, a return statement or a call's argument, the call being the whole statement, the whole expression or the whole returned expression there (a call nested inside another expression there, parentheses around the whole call included, is at a position NOT CLAIMED (1) names); an eval call with two or more arguments, or with one argument other than a string literal, is NOT CLAIMED; a new expression, a tagged template and an uncalled decorator are no call",
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
    text: "a template or + join with more than 64 combinations (counted before any two are found to read alike), or an expression read more than 16 levels deep (each wrapper, each identifier followed to its initializer, and each side, branch or substitution read counting one level), reads, where the bound is passed, as one <opaque TEXT:bound>, TEXT that expression's source text with each whitespace run read as TEXT (10) reads it (a bound expression whose source text holds a whitespace run other than one space, a line break among them, is NOT CLAIMED)",
  },
  {
    id: "order",
    text: "the alternatives are listed in source order (a left side's or a true branch's first, a combination's by its parts, the first part varying slowest), each once, a text and an opaque part with the same label being two alternatives",
  },
];

/** READINGS: what a census reads from those alternatives. */
export const READING_FORMS: readonly ClaimPart<ReadingFormId>[] = [
  {
    id: "texts",
    text: "an expression's texts - its alternatives' texts, in order, when none is opaque, and unresolved otherwise - claimed only for the three expressions its row's page reads: \"only\" reading [\"only\"], c ? \"a\" : \"b\" reading [\"a\",\"b\"] and p ?? \"b\", p a parameter, reading unresolved; the texts of any other expression are NOT CLAIMED",
  },
  {
    id: "words",
    text: "a command's words: every alternative's text split at each run of whitespace (the characters JavaScript's \\s class matches), quotes (\" ' and `, at a word's end or inside it) and the shell operators ; & | ( ) < >, and at no other printable ASCII character (U+0085 and U+200B split nothing either), each word then cut to the text after its last / or \\, whichever of the two comes last in a word holding both, and a trailing .exe, .EXE, .Exe, .cmd or .CMD dropped (whether a word drops a trailing extension in any other spelling, .eXe, .bat and .com among them, or drops a second one after the first, is NOT CLAIMED), so a word can cut to the empty word; each word once, the empty word included, in order of first appearance (whether two words that differ only in letter case are both kept is NOT CLAIMED); unresolved when any alternative is opaque; a command of two or more alternatives, or with an opaque one, is claimed only for the two its row's pages read, c ? \"rf x\" : \"rf y\" reading rf x y and p ?? \"rf\", p a parameter, reading unresolved (the words of any other such command are NOT CLAIMED, and so are the words of a text command in a block, a function body among them, where no words row page puts one; this census writes unresolved for no words, so a words list holding only the word unresolved reads alike, and which of the two the reader returns is NOT CLAIMED)",
  },
  {
    id: "program",
    text: "a launch program: when every alternative is a text with a first word (READINGS (2)'s first word, the empty word included), those first words, sorted, each once, joined by |; otherwise <opaque TEXT>, TEXT the program expression's source text with each whitespace run read as TEXT (10) reads it (a program expression whose source text holds a whitespace character other than a space, a line break among them, is NOT CLAIMED); a program of two or more alternatives is claimed only for the three its row's pages read, c ? \"rf\" : \"git\" reading git|rf, c ? \"git a\" : \"git b\" reading git and process.env.PI_VCS ?? \"git\" reading <opaque process.env.PI_VCS ?? \"git\"> (any other program of two or more alternatives is NOT CLAIMED)",
  },
  {
    id: "properties",
    text: "an object literal's fields, member by member in source order, a later member overriding: a property assignment whose key is a name, a string or numeric literal, or a computed key whose expression, inside any of the wrappers TEXT (9) names, is a string or no-substitution template literal sets its field, and so does a shorthand property; a method, getter or setter with such a key makes its own field opaque; a spread whose expression, inside any of those wrappers, is an identifier BINDING resolves to a const whose initializer, inside any of those wrappers, is an object literal whose own fields hold no opaque member (a method, getter or setter included; spreads nested at most 8 deep) sets the fields it holds; any other member (a spread of anything else, or a member with any other key, a computed number included) is opaque and may set every field",
  },
  {
    id: "registration",
    text: "a registration: an object literal whose id field has a text alternative starting reactivefiber. (reactivefiber, reactivefiberx.b, ReactiveFiber.d, forge.reactivefiber.c and a text with a leading space start no such text), read as one ID:EFFECT entry per such text and per opaque alternative of that id, the object's entries sorted, each once, ID the text or <opaque LABEL>; EFFECT its effectClass field's alternatives (a text as itself, an opaque one as <opaque LABEL>), sorted, joined by |, or <none> when it has no effectClass field (how EFFECT reads two alternatives that render alike, a text spelling an opaque one's <opaque LABEL>, is NOT CLAIMED); a field an opaque member may set after its last setting, or in place of one, reads <opaque MEMBER>, MEMBER the label of the last such member (...expression for a spread, its key's source text, or get name, set name or name() for an accessor or method; a label whose source text holds a whitespace run other than one space is NOT CLAIMED)",
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
 * for byte, read as the delivered reader reads it) and refusal #5's (gate-prep-6, run g10-gate-s202, outbox row O:1964: the
 * surviving reader mutants of its U1a to U1f as GP6-W1, GP6-W3, GP6-K3, GP6-K1, GP6-K2, GP6-K4, GP6-K8, GP6-K5, GP6-K6, GP6-K12
 * and GP6-K13, each pinned by the twin page the refusal names, byte for byte, read as the reader reads it).
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
  { id: "GP6-W1", form: "words", source: "refusal #5 U1a (GP6-W1, O:1964)" },
  { id: "GP6-W3", form: "words", source: "refusal #5 U1b (GP6-W3, O:1964)" },
  { id: "GP6-K3", form: "kinds", source: "refusal #5 U1c (GP6-K3, O:1964)" },
  { id: "GP6-K1", form: "kinds", source: "refusal #5 U1d (GP6-K1, O:1964)" },
  { id: "GP6-K2", form: "kinds", source: "refusal #5 U1d (GP6-K2, O:1964)" },
  { id: "GP6-K4", form: "kinds", source: "refusal #5 U1d (GP6-K4, O:1964)" },
  { id: "GP6-K8", form: "kinds", source: "refusal #5 U1d (GP6-K8, O:1964)" },
  { id: "GP6-K5", form: "kinds", source: "refusal #5 U1e (GP6-K5, O:1964)" },
  { id: "GP6-K6", form: "kinds", source: "refusal #5 U1e (GP6-K6, O:1964)" },
  { id: "GP6-K12", form: "kinds", source: "refusal #5 U1f (GP6-K12, O:1964)" },
  { id: "GP6-K13", form: "kinds", source: "refusal #5 U1f (GP6-K13, O:1964)" },
];

