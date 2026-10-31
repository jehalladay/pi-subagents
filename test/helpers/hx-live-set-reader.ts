/**
 * wb-tz2.19 (HX-ORIGINAL-GOALS-CLOSURE-R9, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.9, orchestrator
 * rulings R-B103 and R-B128): the LIVE SET reader of wb-tz2.9's HX licensed-complete census (its W1 reader), cured of THE
 * OUTSIDE-FORM HOLE. wb-tz2.9's cut #4 (ba23328c, not on trunk; blocked by this bead under R-B128) placed every reference by
 * containment - anything inside an import, an M5 import's declaration or ANY M6 declaration or assignment was placed wherever it
 * stood - so an HX entry carried by the value of an M6 assignment and driven in a hook, a describe body, a helper or at the top
 * level read nothing OUTSIDE (its residual Q9). This reader places each reference by the binding it serves, follows an
 * assignment's value, and reads a binding-pattern default as no source, so that census's re-cut can take it in place of its own
 * (R-B128: "wb-tz2.9's eventual re-cut is a MECHANICAL RESTATEMENT over this bead's landed fix"). The falsifier census is
 * test/workbench-hx-live-set-reader-census.test.ts. It holds every "- <word>: <claim>" line of this header equal, in order and byte
 * for byte, to the roster exported for its section, gives every word a calibration plant, and reds when the reader for a word is
 * removed (ReadOptions lists the words a reading uses; every word by default). CLAIMED_SUBFORMS registers the sub-forms the claims
 * name that no calibration plant of a word pins - each a phrase standing verbatim in the READING paragraph, in a section's heading or
 * in a word's claim - and the census gives each one or more falsifier rows of its own (wb-tz2.19 refusal #1: U1-U4).
 *
 * READING (liveReading). Active code only: comments are trivia. An HX LOCAL is a name a BINDING form binds; its entry reads
 * `<form> <name>`, in binding order. A file is LIVE when it binds an HX local or holds an M5 import. An HX CASE is a case
 * (REGISTRATION) whose body holds a reference (REFERENCE) or an M5 import. UNRESOLVED lists what the reader cannot read; OUTSIDE
 * lists every reference no PLACEMENT form places, each as `<line>: <its text, whitespace removed>`. WITNESSING lists the titles of the
 * HX cases whose body ReadOptions.witness reads a claim in, none without it.
 * SPOTS (where a reference stands that no PLACEMENT form reaches, so it reads OUTSIDE): a hook; a describe body; a helper; a named function; a fixture; a table; a value; an unread registration form; the top level.
 * NOT READ (the census's named residual R-LIVE-INDIRECT, each member a pinned quiet row): an hx drive that reaches hx through no HX local and no M5 import.
 *
 * MODULE (isHxModule; the specifiers that name an HX MODULE):
 * - sdk root: the SDK package root, @hyperunix/sdk exactly (a subpath such as @hyperunix/sdk/raw names none)
 * - provider path: a path ending in providers/hyperunix after a slash, as a test file spells the provider module (../src/workbench/providers/hyperunix)
 * - provider path alone: the path providers/hyperunix itself, with nothing before it
 * - no extension: a provider path written with no extension
 * - .js: a provider path written with the .js extension
 * - .ts: a provider path written with the .ts extension
 * - .mjs: a provider path written with the .mjs extension
 * - .cjs: a provider path written with the .cjs extension
 * - .mts: a provider path written with the .mts extension
 * - .cts: a provider path written with the .cts extension
 * ENTRY (HX_ENTRIES; the names an HX ENTRY has):
 * - provider function: a function export of src/workbench/providers/hyperunix.ts, read from the module itself at run time
 * - sdk client: the SDK's client class HyperUnix, by its run-time name
 * UNWRAP (unwrap; what a source, an assignment target, a target name, a member's base, a callee, a specifier, a member key or a title is read through, any number in any order):
 * - parentheses: a parenthesized expression
 * - as: an as expression
 * - satisfies: a satisfies expression
 * - non-null: a non-null assertion
 * - type assertion: a <T> assertion
 * BINDING (the forms that bind an HX LOCAL, form in parentheses; M1-M4 static imports, M5 import() calls, M6 aliases and stores):
 * - named: a static import of an entry under its exported name, from any module (named)
 * - aliased: a static import of an entry under another local name, the exported name an identifier (aliased)
 * - aliased string: a static import of an entry under a local name, the exported name a string literal (aliased)
 * - type-only: a type-only import declaration or import specifier binds as the same import would without the marker
 * - namespace: a static namespace import of an HX module (namespace)
 * - default: a static default import of an HX module (default)
 * - string specifier: an import() call whose first argument is a string literal naming an HX module is an M5 import
 * - template specifier: an import() call whose first argument is a no-substitution template naming an HX module is an M5 import
 * - import await: an M5 import is read through await, as well as through UNWRAP, to the variable declaration that binds it, its M5 declaration
 * - dynamic: an M5 import bound whole to the name its declaration introduces (dynamic)
 * - destructured renamed: an M5 import destructured into an entry under another name, its key written (destructured)
 * - destructured shorthand: an M5 import destructured into an entry under its own name, a shorthand element (destructured)
 * - destructured rest: an M5 import destructured into a rest element, which takes the module (rest)
 * - alias: a variable declared from an HX local, its M6 declaration (alias)
 * - alias member: a declaration or assignment source may be an entry member .name of a module local
 * - alias element: a declaration or assignment source may be an entry member ['name'] of a module local, the name a string value
 * - alias renamed: a variable destructured from a module local into an entry under another name, its key written (alias)
 * - alias shorthand: a variable destructured from a module local into an entry under its own name, a shorthand element (alias)
 * - alias rest: a variable destructured from a module local into a rest element, which takes the module (rest)
 * - namespace module: a namespace local is a module local
 * - default module: a default local is a module local
 * - dynamic module: a dynamic local is a module local
 * - rest module: a rest local is a module local
 * - assigned =: an assignment written with = is an M6 assignment when its right side reads as an HX local or an entry member of a module local
 * - assigned ||=: an assignment written with ||= is an M6 assignment when its right side reads so
 * - assigned &&=: an assignment written with &&= is an M6 assignment when its right side reads so
 * - assigned ??=: an assignment written with ??= is an M6 assignment when its right side reads so
 * - assigned name: an M6 assignment to a name binds that name (alias)
 * - assigned renamed: an M6 assignment to an object literal over a module local binds the name an entry's written key takes (alias)
 * - assigned shorthand: an M6 assignment to an object literal over a module local binds an entry's shorthand property (alias)
 * - store: an M6 assignment to a member .name of a value binds the name the member chain is rooted at (store)
 * - store element: the stored member may be written ['name'], a string value (store)
 * - store deep: the stored member may stand at any depth below the root, root.a.b (store)
 * - assigned value: a declaration or assignment whose source is an M6 assignment reads that assignment's right side as its own source, so the value an assignment carries binds the name it lands on
 * - fixpoint: each round reads every unread declaration, then every unread assignment, in source order, until a round binds nothing, so a form may stand before the form that binds its source
 * REGISTRATION (casesOf; a CASE, its title, body and registration chain):
 * - it: it is a test API
 * - test: test is a test API
 * - vitest import: it or test imported from vitest under any local name is a test API
 * - declared api: a variable declared from a test API is a test API
 * - element member: a case flag or a case method may be written ['name'], a string value, as well as .name
 * - chained: a test API may carry any number of case flags and case-method calls, in any order, before the call
 * - literal title: a call of a test API whose first argument is a string value registers a case of that title
 * - computed title: a call of a test API whose first argument is any other expression registers a case titled <computed: its text>, whitespace removed
 * - arrow body: a case's body may be an arrow function, the first argument after the title that is a body form
 * - function body: a case's body may be a function expression, the first argument after the title that is a body form
 * - beside: a case's registration chain is its callee's text, then every argument beside the title and the body (an options object, a timeout), whitespace removed
 * FLAG (CASE_FLAGS; a member of a test API that is a test API again):
 * - concurrent: the concurrent flag
 * - fails: the fails flag
 * - only: the only flag
 * - sequential: the sequential flag
 * - skip: the skip flag
 * - todo: the todo flag
 * METHOD (CASE_METHODS; a member of a test API whose call is a test API again):
 * - each: the each method
 * - extend: the extend method
 * - for: the for method
 * - override: the override method
 * - runIf: the runIf method
 * - scoped: the scoped method
 * - skipIf: the skipIf method
 * UNRESOLVED (fail closed: what the reader cannot read):
 * - stray specifier: a string literal or no-substitution template naming an HX module that is neither a static import's specifier nor an M5 import's first argument (a require, a vi.importActual, a held specifier, an export-from, an import.meta.resolve)
 * - unread binding: an M5 or M6 declaration whose name is a binding pattern the reader cannot read (an array pattern, a pattern whose source is no module local, an element with a computed key that is no string value, or a nested pattern)
 * - unread assignment: an M6 assignment whose target the reader cannot read: no name, no member chain rooted at a name and no object literal of named entries over a module local (an array target, a member chain rooted at a call, an object literal with a spread, a computed key that is no string value or a value that is no name, or an object literal over a source that is no module local)
 * REFERENCE (what OUTSIDE judges; a binding site is never a reference):
 * - local reference: an identifier spelled as an HX local, by spelling and never by scope (type positions, member names, object-literal keys, method names and type members included), unless it is a binding site
 * - inline import: an M5 import no declaration binds, the call itself
 * - used assignment: an M6 assignment whose value is used, one that does not stand, through parentheses only, as a whole expression statement, the assignment itself
 * - declaration name: a binding site, a variable declaration's own name
 * - parameter name: a binding site, a parameter's own name
 * - binding element: a binding site, a binding element's name or its property key
 * - function name: a binding site, a function declaration's or function expression's own name
 * - class name: a binding site, a class declaration's or class expression's own name
 * PLACEMENT (the references that are placed; every other reference reads OUTSIDE):
 * - case body: a reference inside a case body
 * - import declaration: a reference inside an import declaration
 * - declaration source: a reference inside the initializer of an M5 or M6 declaration, whatever its pattern binds
 * - declaration type: a reference inside the type annotation of an M5 or M6 declaration
 * - assignment binding: a reference inside the target or the right side of an M6 assignment that binds a new local
 * - bound store: an M6 assignment that binds no new local (its target name, its entries or the root of its store already an HX local, or its target unread) places nothing
 * - binding default: a binding pattern's defaults and computed keys, and a shorthand property's default in an assignment target, are placed by no declaration or assignment
 *
 * Display paths added: none. Test-only: it parses sources handed to it and reads the provider module's and the SDK's exports.
 */
import { HyperUnix } from "@hyperunix/sdk";
import ts from "typescript";
import * as hyperunixProvider from "../../src/workbench/providers/hyperunix.js";

/** A roster entry: a word the reader reads and the claim this header states for it. */
export interface Claim<W extends string = string> {
  readonly word: W;
  readonly claim: string;
}
const claims = <const W extends string>(entries: readonly (readonly [W, string])[]): readonly Claim<W>[] => entries.map(([word, claim]) => ({ word, claim }));
/** A roster's words, in order. */
export const words = <W extends string>(roster: readonly Claim<W>[]): W[] => roster.map(entry => entry.word);

export const MODULE_FORMS = claims([
  ["sdk root", "the SDK package root, @hyperunix/sdk exactly (a subpath such as @hyperunix/sdk/raw names none)"],
  ["provider path", "a path ending in providers/hyperunix after a slash, as a test file spells the provider module (../src/workbench/providers/hyperunix)"],
  ["provider path alone", "the path providers/hyperunix itself, with nothing before it"],
  ["no extension", "a provider path written with no extension"],
  [".js", "a provider path written with the .js extension"],
  [".ts", "a provider path written with the .ts extension"],
  [".mjs", "a provider path written with the .mjs extension"],
  [".cjs", "a provider path written with the .cjs extension"],
  [".mts", "a provider path written with the .mts extension"],
  [".cts", "a provider path written with the .cts extension"],
]);
export const ENTRY_FORMS = claims([
  ["provider function", "a function export of src/workbench/providers/hyperunix.ts, read from the module itself at run time"],
  ["sdk client", "the SDK's client class HyperUnix, by its run-time name"],
]);
export const UNWRAP_FORMS = claims([
  ["parentheses", "a parenthesized expression"],
  ["as", "an as expression"],
  ["satisfies", "a satisfies expression"],
  ["non-null", "a non-null assertion"],
  ["type assertion", "a <T> assertion"],
]);
export const BINDING_FORMS = claims([
  ["named", "a static import of an entry under its exported name, from any module (named)"],
  ["aliased", "a static import of an entry under another local name, the exported name an identifier (aliased)"],
  ["aliased string", "a static import of an entry under a local name, the exported name a string literal (aliased)"],
  ["type-only", "a type-only import declaration or import specifier binds as the same import would without the marker"],
  ["namespace", "a static namespace import of an HX module (namespace)"],
  ["default", "a static default import of an HX module (default)"],
  ["string specifier", "an import() call whose first argument is a string literal naming an HX module is an M5 import"],
  ["template specifier", "an import() call whose first argument is a no-substitution template naming an HX module is an M5 import"],
  ["import await", "an M5 import is read through await, as well as through UNWRAP, to the variable declaration that binds it, its M5 declaration"],
  ["dynamic", "an M5 import bound whole to the name its declaration introduces (dynamic)"],
  ["destructured renamed", "an M5 import destructured into an entry under another name, its key written (destructured)"],
  ["destructured shorthand", "an M5 import destructured into an entry under its own name, a shorthand element (destructured)"],
  ["destructured rest", "an M5 import destructured into a rest element, which takes the module (rest)"],
  ["alias", "a variable declared from an HX local, its M6 declaration (alias)"],
  ["alias member", "a declaration or assignment source may be an entry member .name of a module local"],
  ["alias element", "a declaration or assignment source may be an entry member ['name'] of a module local, the name a string value"],
  ["alias renamed", "a variable destructured from a module local into an entry under another name, its key written (alias)"],
  ["alias shorthand", "a variable destructured from a module local into an entry under its own name, a shorthand element (alias)"],
  ["alias rest", "a variable destructured from a module local into a rest element, which takes the module (rest)"],
  ["namespace module", "a namespace local is a module local"],
  ["default module", "a default local is a module local"],
  ["dynamic module", "a dynamic local is a module local"],
  ["rest module", "a rest local is a module local"],
  ["assigned =", "an assignment written with = is an M6 assignment when its right side reads as an HX local or an entry member of a module local"],
  ["assigned ||=", "an assignment written with ||= is an M6 assignment when its right side reads so"],
  ["assigned &&=", "an assignment written with &&= is an M6 assignment when its right side reads so"],
  ["assigned ??=", "an assignment written with ??= is an M6 assignment when its right side reads so"],
  ["assigned name", "an M6 assignment to a name binds that name (alias)"],
  ["assigned renamed", "an M6 assignment to an object literal over a module local binds the name an entry's written key takes (alias)"],
  ["assigned shorthand", "an M6 assignment to an object literal over a module local binds an entry's shorthand property (alias)"],
  ["store", "an M6 assignment to a member .name of a value binds the name the member chain is rooted at (store)"],
  ["store element", "the stored member may be written ['name'], a string value (store)"],
  ["store deep", "the stored member may stand at any depth below the root, root.a.b (store)"],
  [
    "assigned value",
    "a declaration or assignment whose source is an M6 assignment reads that assignment's right side as its own source, so the value an assignment carries binds the name it lands on",
  ],
  ["fixpoint", "each round reads every unread declaration, then every unread assignment, in source order, until a round binds nothing, so a form may stand before the form that binds its source"],
]);
export const REGISTRATION_FORMS = claims([
  ["it", "it is a test API"],
  ["test", "test is a test API"],
  ["vitest import", "it or test imported from vitest under any local name is a test API"],
  ["declared api", "a variable declared from a test API is a test API"],
  ["element member", "a case flag or a case method may be written ['name'], a string value, as well as .name"],
  ["chained", "a test API may carry any number of case flags and case-method calls, in any order, before the call"],
  ["literal title", "a call of a test API whose first argument is a string value registers a case of that title"],
  ["computed title", "a call of a test API whose first argument is any other expression registers a case titled <computed: its text>, whitespace removed"],
  ["arrow body", "a case's body may be an arrow function, the first argument after the title that is a body form"],
  ["function body", "a case's body may be a function expression, the first argument after the title that is a body form"],
  ["beside", "a case's registration chain is its callee's text, then every argument beside the title and the body (an options object, a timeout), whitespace removed"],
]);
export const FLAG_FORMS = claims([
  ["concurrent", "the concurrent flag"],
  ["fails", "the fails flag"],
  ["only", "the only flag"],
  ["sequential", "the sequential flag"],
  ["skip", "the skip flag"],
  ["todo", "the todo flag"],
]);
export const METHOD_FORMS = claims([
  ["each", "the each method"],
  ["extend", "the extend method"],
  ["for", "the for method"],
  ["override", "the override method"],
  ["runIf", "the runIf method"],
  ["scoped", "the scoped method"],
  ["skipIf", "the skipIf method"],
]);
export const UNRESOLVED_FORMS = claims([
  [
    "stray specifier",
    "a string literal or no-substitution template naming an HX module that is neither a static import's specifier nor an M5 import's first argument (a require, a vi.importActual, a held specifier, an export-from, an import.meta.resolve)",
  ],
  [
    "unread binding",
    "an M5 or M6 declaration whose name is a binding pattern the reader cannot read (an array pattern, a pattern whose source is no module local, an element with a computed key that is no string value, or a nested pattern)",
  ],
  ["unread assignment", "an M6 assignment whose target the reader cannot read: no name, no member chain rooted at a name and no object literal of named entries over a module local (an array target, a member chain rooted at a call, an object literal with a spread, a computed key that is no string value or a value that is no name, or an object literal over a source that is no module local)"],
]);
export const REFERENCE_FORMS = claims([
  [
    "local reference",
    "an identifier spelled as an HX local, by spelling and never by scope (type positions, member names, object-literal keys, method names and type members included), unless it is a binding site",
  ],
  ["inline import", "an M5 import no declaration binds, the call itself"],
  ["used assignment", "an M6 assignment whose value is used, one that does not stand, through parentheses only, as a whole expression statement, the assignment itself"],
  ["declaration name", "a binding site, a variable declaration's own name"],
  ["parameter name", "a binding site, a parameter's own name"],
  ["binding element", "a binding site, a binding element's name or its property key"],
  ["function name", "a binding site, a function declaration's or function expression's own name"],
  ["class name", "a binding site, a class declaration's or class expression's own name"],
]);
export const PLACEMENT_FORMS = claims([
  ["case body", "a reference inside a case body"],
  ["import declaration", "a reference inside an import declaration"],
  ["declaration source", "a reference inside the initializer of an M5 or M6 declaration, whatever its pattern binds"],
  ["declaration type", "a reference inside the type annotation of an M5 or M6 declaration"],
  ["assignment binding", "a reference inside the target or the right side of an M6 assignment that binds a new local"],
  ["bound store", "an M6 assignment that binds no new local (its target name, its entries or the root of its store already an HX local, or its target unread) places nothing"],
  ["binding default", "a binding pattern's defaults and computed keys, and a shorthand property's default in an assignment target, are placed by no declaration or assignment"],
]);
export type ModuleForm = (typeof MODULE_FORMS)[number]["word"];
export type EntryForm = (typeof ENTRY_FORMS)[number]["word"];
export type UnwrapForm = (typeof UNWRAP_FORMS)[number]["word"];
export type BindingForm = (typeof BINDING_FORMS)[number]["word"];
export type RegistrationForm = (typeof REGISTRATION_FORMS)[number]["word"];
export type FlagForm = (typeof FLAG_FORMS)[number]["word"];
export type MethodForm = (typeof METHOD_FORMS)[number]["word"];
export type UnresolvedForm = (typeof UNRESOLVED_FORMS)[number]["word"];
export type ReferenceForm = (typeof REFERENCE_FORMS)[number]["word"];
export type PlacementForm = (typeof PLACEMENT_FORMS)[number]["word"];
/** The header's sections, in order: each section's name and the roster its "- <word>: <claim>" lines equal. */
export const HEADER_SECTIONS: readonly { readonly name: string; readonly roster: readonly Claim[] }[] = [
  { name: "MODULE", roster: MODULE_FORMS },
  { name: "ENTRY", roster: ENTRY_FORMS },
  { name: "UNWRAP", roster: UNWRAP_FORMS },
  { name: "BINDING", roster: BINDING_FORMS },
  { name: "REGISTRATION", roster: REGISTRATION_FORMS },
  { name: "FLAG", roster: FLAG_FORMS },
  { name: "METHOD", roster: METHOD_FORMS },
  { name: "UNRESOLVED", roster: UNRESOLVED_FORMS },
  { name: "REFERENCE", roster: REFERENCE_FORMS },
  { name: "PLACEMENT", roster: PLACEMENT_FORMS },
];
/** A sub-form a claim names: its place (READING, a section's heading as <SECTION>, or a word's claim as <SECTION>/<word>) and its phrase. */
export interface Subform {
  readonly place: string;
  readonly phrase: string;
}
/** The sub-forms the header's claims name that no calibration plant of a word pins, each with falsifier rows of its own in the census. */
export const CLAIMED_SUBFORMS: readonly Subform[] = (
  [
    ["READING", "or holds an M5 import"],
    ["READING", "or an M5 import"],
    ["READING", "the titles of the HX cases whose body ReadOptions.witness reads a claim in"],
    ["READING", "none without it"],
    ["READING", "each as `<line>:"],
    ["READING", "<its text, whitespace removed>"],
    ["MODULE/sdk root", "a subpath such as @hyperunix/sdk/raw names none"],
    ["MODULE/provider path", "ending in providers/hyperunix"],
    ["MODULE/provider path", "after a slash"],
    ["MODULE/provider path alone", "with nothing before it"],
    ["UNWRAP", "a source"],
    ["UNWRAP", "an assignment target"],
    ["UNWRAP", "a target name"],
    ["UNWRAP", "a member's base"],
    ["UNWRAP", "a callee"],
    ["UNWRAP", "a specifier"],
    ["UNWRAP", "a member key"],
    ["UNWRAP", "a title"],
    ["UNWRAP", "any number in any order"],
    ["BINDING/named", "a static import of an entry under its exported name"],
    ["BINDING/named", "from any module"],
    ["BINDING/default", "a static default import of an HX module"],
    ["BINDING/destructured renamed", "its key written"],
    ["BINDING/alias member", "an entry member .name"],
    ["BINDING/alias element", "an entry member ['name']"],
    ["BINDING/alias element", "the name a string value"],
    ["BINDING/alias renamed", "its key written"],
    ["BINDING/alias rest", "a rest element, which takes the module"],
    ["BINDING/assigned renamed", "the name an entry's written key takes"],
    ["BINDING/assigned shorthand", "an entry's shorthand property"],
    ["BINDING/store element", "a string value"],
    ["BINDING/fixpoint", "until a round binds nothing"],
    ["REGISTRATION/vitest import", "it or test"],
    ["REGISTRATION/vitest import", "imported from vitest"],
    ["REGISTRATION/declared api", "a variable declared from a test API"],
    ["REGISTRATION/element member", "or a case method"],
    ["REGISTRATION/element member", "a string value"],
    ["REGISTRATION/chained", "case flags"],
    ["REGISTRATION/chained", "case-method calls"],
    ["REGISTRATION/chained", "in any order"],
    ["REGISTRATION/literal title", "a string value"],
    ["REGISTRATION/computed title", "whitespace removed"],
    ["REGISTRATION/arrow body", "the first argument after the title that is a body form"],
    ["REGISTRATION/beside", "whitespace removed"],
    ["UNRESOLVED/stray specifier", "a string literal or no-substitution template"],
    ["UNRESOLVED/unread binding", "a pattern whose source is no module local"],
    ["UNRESOLVED/unread binding", "a nested pattern"],
    ["UNRESOLVED/unread assignment", "an array target"],
    ["UNRESOLVED/unread assignment", "an object literal with a spread"],
    ["UNRESOLVED/unread assignment", "a value that is no name"],
    ["UNRESOLVED/unread assignment", "an object literal over a source that is no module local"],
    ["REFERENCE/local reference", "type positions"],
    ["REFERENCE/local reference", "member names"],
    ["REFERENCE/local reference", "object-literal keys"],
    ["REFERENCE/local reference", "method names"],
    ["REFERENCE/local reference", "type members"],
    ["REFERENCE/used assignment", "through parentheses only"],
    ["PLACEMENT/declaration source", "whatever its pattern binds"],
    ["PLACEMENT/assignment binding", "that binds a new local"],
    ["PLACEMENT/bound store", "its entries"],
    ["PLACEMENT/binding default", "and computed keys"],
    ["PLACEMENT/binding default", "a shorthand property's default in an assignment target"],
  ] as const
).map(([place, phrase]) => ({ place, phrase }));
/** The words a reading uses, per roster; a roster left out uses every word of it. */
export interface ReadOptions {
  readonly modules?: readonly ModuleForm[];
  readonly entries?: readonly EntryForm[];
  readonly unwraps?: readonly UnwrapForm[];
  readonly bindings?: readonly BindingForm[];
  readonly registrations?: readonly RegistrationForm[];
  readonly flags?: readonly FlagForm[];
  readonly methods?: readonly MethodForm[];
  readonly unresolved?: readonly UnresolvedForm[];
  readonly references?: readonly ReferenceForm[];
  readonly placements?: readonly PlacementForm[];
  /** W1's witnessing reading: whether an HX case's body states a claim (wb-tz2.9's READ SET scanner); no case witnesses without it. */
  readonly witness?: (body: ts.Node, sf: ts.SourceFile) => boolean;
}
/** The words one reading uses (the rosters' words are distinct, so one set holds them all). */
interface Words {
  readonly has: (word: string) => boolean;
}
function wordsOf(options: ReadOptions): Words {
  const all = new Set<string>([
    ...(options.modules ?? words(MODULE_FORMS)),
    ...(options.entries ?? words(ENTRY_FORMS)),
    ...(options.unwraps ?? words(UNWRAP_FORMS)),
    ...(options.bindings ?? words(BINDING_FORMS)),
    ...(options.registrations ?? words(REGISTRATION_FORMS)),
    ...(options.flags ?? words(FLAG_FORMS)),
    ...(options.methods ?? words(METHOD_FORMS)),
    ...(options.unresolved ?? words(UNRESOLVED_FORMS)),
    ...(options.references ?? words(REFERENCE_FORMS)),
    ...(options.placements ?? words(PLACEMENT_FORMS)),
  ]);
  return { has: word => all.has(word) };
}

// ---- MODULE and ENTRY ----

export const SDK_ROOT = "@hyperunix/sdk";
export const PROVIDER_STEM = "providers/hyperunix";
const EXTENSIONS: readonly string[] = [".js", ".ts", ".mjs", ".cjs", ".mts", ".cts"];
function hxModule(specifier: string, on: Words): boolean {
  if (specifier === SDK_ROOT) return on.has("sdk root");
  const at = specifier.lastIndexOf(PROVIDER_STEM);
  if (at < 0) return false;
  const before = specifier.slice(0, at);
  const after = specifier.slice(at + PROVIDER_STEM.length);
  const path = before === "" ? on.has("provider path alone") : before.endsWith("/") && on.has("provider path");
  const extension = after === "" ? on.has("no extension") : EXTENSIONS.includes(after) && on.has(after);
  return path && extension;
}
/** Whether a module specifier names an HX MODULE (MODULE). */
export const isHxModule = (specifier: string, options: ReadOptions = {}): boolean => hxModule(specifier, wordsOf(options));
const PROVIDER_FUNCTIONS: readonly string[] = Object.entries(hyperunixProvider)
  .filter(([, value]) => typeof value === "function")
  .map(([name]) => name);
function entriesOf(on: Words): string[] {
  return [...(on.has("provider function") ? PROVIDER_FUNCTIONS : []), ...(on.has("sdk client") ? [HyperUnix.name] : [])].sort();
}
/** The HX ENTRY names (ENTRY), sorted. */
export const hxEntries = (options: ReadOptions = {}): string[] => entriesOf(wordsOf(options));
export const HX_ENTRIES: readonly string[] = hxEntries();

// ---- syntax: every node, lines, containment, text, UNWRAP, string values, keys and members ----

/** Every node of a tree, the root first. */
export function nodesOf(root: ts.Node): ts.Node[] {
  const out: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    out.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return out;
}
export const lineOf = (sf: ts.SourceFile, node: ts.Node): number => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1;
export const within = (node: ts.Node, outer: ts.Node): boolean => outer.pos <= node.pos && node.end <= outer.end;
/** A node's source text with every whitespace character removed. */
export const squeeze = (node: ts.Node, sf: ts.SourceFile): string => node.getText(sf).replace(/\s+/g, "");
function isWrapper(node: ts.Node, on: Words): node is ts.ParenthesizedExpression | ts.AsExpression | ts.SatisfiesExpression | ts.NonNullExpression | ts.TypeAssertion {
  return (
    (ts.isParenthesizedExpression(node) && on.has("parentheses")) ||
    (ts.isAsExpression(node) && on.has("as")) ||
    (ts.isSatisfiesExpression(node) && on.has("satisfies")) ||
    (ts.isNonNullExpression(node) && on.has("non-null")) ||
    (ts.isTypeAssertionExpression(node) && on.has("type assertion"))
  );
}
function unwrapWith(node: ts.Expression, on: Words): ts.Expression {
  let current = node;
  while (isWrapper(current, on)) current = current.expression;
  return current;
}
/** UNWRAP with every wrapper form. */
export const unwrap = (node: ts.Expression): ts.Expression => unwrapWith(node, wordsOf({}));
function stringWith(node: ts.Expression | undefined, on: Words): string | undefined {
  const value = node === undefined ? undefined : unwrapWith(node, on);
  return value !== undefined && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) ? value.text : undefined;
}
/** A string VALUE: a string literal or a no-substitution template, read through UNWRAP. */
export const stringOf = (node: ts.Expression | undefined): string | undefined => stringWith(node, wordsOf({}));
function keyWith(name: ts.PropertyName, on: Words): string | undefined {
  if (ts.isComputedPropertyName(name)) return stringWith(name.expression, on);
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name) ? name.text : undefined;
}
/** A KEY: an identifier, a string or numeric literal, or a computed key whose expression is a string value. */
export const keyOf = (name: ts.PropertyName): string | undefined => keyWith(name, wordsOf({}));
interface Member {
  readonly base: ts.Expression;
  readonly name: string;
  /** Whether the member is written ['name'] rather than .name. */
  readonly element: boolean;
}
function memberWith(node: ts.Expression, on: Words): Member | undefined {
  if (ts.isPropertyAccessExpression(node)) return { base: node.expression, name: node.name.text, element: false };
  if (!ts.isElementAccessExpression(node)) return undefined;
  const name = stringWith(node.argumentExpression, on);
  return name === undefined ? undefined : { base: node.expression, name, element: true };
}
/** A MEMBER: `.name`, or `['name']` with a string value. */
export const memberOf = (node: ts.Expression): { readonly base: ts.Expression; readonly name: string } | undefined => memberWith(node, wordsOf({}));

// ---- REGISTRATION, FLAG and METHOD ----

export const TEST_ROOTS: readonly string[] = ["it", "test"];
export const CASE_FLAGS: readonly FlagForm[] = words(FLAG_FORMS);
export const CASE_METHODS: readonly MethodForm[] = words(METHOD_FORMS);
/** vitest's test-API members that register no case: the suite switch and the hooks. */
export const NON_CASE_MEMBERS: readonly string[] = ["afterAll", "afterEach", "aroundAll", "aroundEach", "beforeAll", "beforeEach", "describe", "suite"];
function apiWith(node: ts.Expression, apis: ReadonlySet<string>, on: Words): boolean {
  const value = unwrapWith(node, on);
  if (ts.isIdentifier(value)) return apis.has(value.text);
  const linked = (base: ts.Expression): boolean => {
    const inner = unwrapWith(base, on);
    return on.has("chained") ? apiWith(inner, apis, on) : ts.isIdentifier(inner) && apis.has(inner.text);
  };
  const spelled = (member: Member): boolean => !member.element || on.has("element member");
  if (ts.isCallExpression(value)) {
    const method = memberWith(value.expression, on);
    return method !== undefined && (CASE_METHODS as readonly string[]).includes(method.name) && on.has(method.name) && spelled(method) && linked(method.base);
  }
  const flag = memberWith(value, on);
  return flag !== undefined && (CASE_FLAGS as readonly string[]).includes(flag.name) && on.has(flag.name) && spelled(flag) && linked(flag.base);
}
function apisWith(sf: ts.SourceFile, on: Words): Set<string> {
  const roots = TEST_ROOTS.filter(root => on.has(root));
  const apis = new Set<string>(roots);
  if (on.has("vitest import")) {
    for (const statement of sf.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier) || statement.moduleSpecifier.text !== "vitest") continue;
      const bindings = statement.importClause?.namedBindings;
      if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
      for (const element of bindings.elements) if (roots.includes((element.propertyName ?? element.name).text)) apis.add(element.name.text);
    }
  }
  if (!on.has("declared api")) return apis;
  const declarations = nodesOf(sf).filter(ts.isVariableDeclaration);
  for (let grown = true; grown; ) {
    grown = false;
    for (const declaration of declarations) {
      const { name, initializer } = declaration;
      if (!ts.isIdentifier(name) || apis.has(name.text) || initializer === undefined || !apiWith(initializer, apis, on)) continue;
      apis.add(name.text);
      grown = true;
    }
  }
  return apis;
}
/** A source's test API locals (REGISTRATION). */
export const testApis = (sf: ts.SourceFile, options: ReadOptions = {}): Set<string> => apisWith(sf, wordsOf(options));
/** Whether an expression is a test API: a test API local, a case flag of one, or a call of a case method of one. */
export const isTestApi = (node: ts.Expression, apis: ReadonlySet<string>, options: ReadOptions = {}): boolean => apiWith(node, apis, wordsOf(options));
export interface Case {
  readonly title: string;
  readonly registration: string;
  readonly body: ts.Node;
}
function casesWith(sf: ts.SourceFile, on: Words): Case[] {
  const apis = apisWith(sf, on);
  const out: Case[] = [];
  for (const node of nodesOf(sf)) {
    if (!ts.isCallExpression(node) || !apiWith(node.expression, apis, on)) continue;
    const [title, ...rest] = node.arguments;
    if (title === undefined) continue;
    const literal = stringWith(title, on);
    if (literal === undefined ? !on.has("computed title") : !on.has("literal title")) continue;
    const body = rest.find(argument => (ts.isArrowFunction(argument) && on.has("arrow body")) || (ts.isFunctionExpression(argument) && on.has("function body")));
    if (body === undefined) continue;
    const beside = on.has("beside") ? rest.filter(argument => argument !== body).map(argument => squeeze(argument, sf)) : [];
    out.push({ title: literal ?? `<computed: ${squeeze(title, sf)}>`, registration: [squeeze(node.expression, sf), ...beside].join(" "), body });
  }
  return out;
}
/** Every case of a source (REGISTRATION): a test API called with a title and a body; its title, registration chain and body. */
export const casesOf = (sf: ts.SourceFile, options: ReadOptions = {}): Case[] => casesWith(sf, wordsOf(options));

// ---- the LIVE SET reading ----

const ASSIGNMENT_WORDS: readonly (readonly [ts.SyntaxKind, BindingForm])[] = [
  [ts.SyntaxKind.EqualsToken, "assigned ="],
  [ts.SyntaxKind.BarBarEqualsToken, "assigned ||="],
  [ts.SyntaxKind.AmpersandAmpersandEqualsToken, "assigned &&="],
  [ts.SyntaxKind.QuestionQuestionEqualsToken, "assigned ??="],
];
/** The local forms whose entry members and destructuring read as aliases. */
const MODULE_LOCALS: readonly (readonly [string, BindingForm])[] = [
  ["namespace", "namespace module"],
  ["default", "default module"],
  ["dynamic", "dynamic module"],
  ["rest", "rest module"],
];
function isHxImportWith(node: ts.Node, on: Words): node is ts.CallExpression {
  if (!ts.isCallExpression(node) || node.expression.kind !== ts.SyntaxKind.ImportKeyword) return false;
  const [first] = node.arguments;
  const value = first === undefined ? undefined : unwrapWith(first, on);
  if (value === undefined) return false;
  const literal = (ts.isStringLiteral(value) && on.has("string specifier")) || (ts.isNoSubstitutionTemplateLiteral(value) && on.has("template specifier"));
  return literal && hxModule(value.text, on);
}
/** Whether a node is an M5 import: an import() of an HX module by a literal specifier (BINDING string and template specifier). */
export const isHxImport = (node: ts.Node, options: ReadOptions = {}): node is ts.CallExpression => isHxImportWith(node, wordsOf(options));
/** The variable declaration an M5 import initializes, through await and UNWRAP. */
function declarationOf(node: ts.Node, on: Words): ts.VariableDeclaration | undefined {
  let current = node;
  while ((ts.isAwaitExpression(current.parent) && on.has("import await")) || isWrapper(current.parent, on)) current = current.parent;
  return ts.isVariableDeclaration(current.parent) && current.parent.initializer === current ? current.parent : undefined;
}
/** The binding site test (REFERENCE's binding sites). */
function isBindingSite(node: ts.Identifier, on: Words): boolean {
  const { parent } = node;
  if (ts.isBindingElement(parent)) return on.has("binding element") && (parent.name === node || parent.propertyName === node);
  if (ts.isVariableDeclaration(parent)) return on.has("declaration name") && parent.name === node;
  if (ts.isParameter(parent)) return on.has("parameter name") && parent.name === node;
  if (ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) return on.has("function name") && parent.name === node;
  if (ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) return on.has("class name") && parent.name === node;
  return false;
}
/** Whether an assignment's value is used: it does not stand, through parentheses only, as a whole expression statement. */
function valueUsed(node: ts.Node): boolean {
  let current = node;
  while (ts.isParenthesizedExpression(current.parent)) current = current.parent;
  return !ts.isExpressionStatement(current.parent);
}
export interface LiveReading {
  readonly live: boolean;
  /** Each HX local as `<form> <name>`, in binding order. */
  readonly entries: readonly string[];
  readonly cases: readonly { readonly title: string; readonly registration: string }[];
  /** The titles of the HX cases ReadOptions.witness reads a claim in. */
  readonly witnessing: readonly string[];
  readonly unresolved: readonly string[];
  readonly outside: readonly string[];
}
/** The LIVE SET reading of one source (READING): its HX locals, HX cases, witnessing cases, UNRESOLVED and OUTSIDE lists. */
export function liveReading(sf: ts.SourceFile, options: ReadOptions = {}): LiveReading {
  const on = wordsOf(options);
  const entries = entriesOf(on);
  const locals = new Map<string, string>();
  /** Binds a name not yet bound; whether it did. */
  const bind = (name: string, form: string): boolean => {
    if (locals.has(name)) return false;
    locals.set(name, form);
    return true;
  };
  const unresolved: string[] = [];
  const placing: ts.Node[] = [];
  const unplaced: ts.Node[] = [];
  const specifiers = new Set<ts.Node>();
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    if (on.has("import declaration")) placing.push(statement);
    specifiers.add(statement.moduleSpecifier);
    const clause = statement.importClause;
    if (clause === undefined || (clause.isTypeOnly && !on.has("type-only"))) continue;
    const hx = hxModule(statement.moduleSpecifier.text, on);
    if (hx && clause.name !== undefined && on.has("default")) bind(clause.name.text, "default");
    const bindings = clause.namedBindings;
    if (bindings === undefined) continue;
    if (ts.isNamespaceImport(bindings)) {
      if (hx && on.has("namespace")) bind(bindings.name.text, "namespace");
      continue;
    }
    for (const element of bindings.elements) {
      if (element.isTypeOnly && !on.has("type-only")) continue;
      const exported = element.propertyName ?? element.name;
      if (!entries.includes(exported.text)) continue;
      const form = element.propertyName === undefined ? "named" : ts.isStringLiteral(element.propertyName) ? "aliased string" : "aliased";
      if (on.has(form)) bind(element.name.text, form === "named" ? "named" : "aliased");
    }
  }
  const moduleForms = MODULE_LOCALS.filter(([, word]) => on.has(word)).map(([form]) => form);
  /** The locals a binding pattern takes from a module local, or undefined when one of its elements cannot be named. */
  const destructured = (pattern: ts.BindingName, path: "destructured" | "alias"): (readonly [string, string])[] | undefined => {
    if (!ts.isObjectBindingPattern(pattern)) return undefined;
    const out: (readonly [string, string])[] = [];
    for (const element of pattern.elements) {
      if (!ts.isIdentifier(element.name)) return undefined;
      if (element.dotDotDotToken !== undefined) {
        if (on.has(`${path} rest`)) out.push([element.name.text, "rest"]);
        continue;
      }
      const key = element.propertyName === undefined ? element.name.text : keyWith(element.propertyName, on);
      if (key === undefined) return undefined;
      if (entries.includes(key) && on.has(`${path} ${element.propertyName === undefined ? "shorthand" : "renamed"}`)) out.push([element.name.text, path]);
    }
    return out;
  };
  /** A binding pattern's defaults and computed keys (PLACEMENT binding default). */
  const defaultsOf = (pattern: ts.BindingName): ts.Node[] =>
    nodesOf(pattern).filter(node => ts.isComputedPropertyName(node) || (ts.isBindingElement(node.parent) && node.parent.initializer === node));
  /** What a declaration's placing nodes are (PLACEMENT declaration source, declaration type and binding default). */
  const placeDeclaration = (declaration: ts.VariableDeclaration): void => {
    if (declaration.initializer !== undefined && on.has("declaration source")) placing.push(declaration.initializer);
    if (declaration.type !== undefined && on.has("declaration type")) placing.push(declaration.type);
    if (!on.has("binding default")) placing.push(...defaultsOf(declaration.name));
  };
  const nodes = nodesOf(sf);
  const imports = nodes.filter((node): node is ts.CallExpression => isHxImportWith(node, on));
  const inline = new Set<ts.Node>();
  const m5 = new Set<ts.Node>();
  for (const call of imports) {
    const [first] = call.arguments;
    if (first !== undefined) specifiers.add(unwrapWith(first, on));
    const declaration = declarationOf(call, on);
    if (declaration === undefined) {
      if (on.has("inline import")) inline.add(call);
      continue;
    }
    m5.add(declaration);
    placeDeclaration(declaration);
    if (ts.isIdentifier(declaration.name)) {
      if (on.has("dynamic")) bind(declaration.name.text, "dynamic");
      continue;
    }
    const names = destructured(declaration.name, "destructured");
    if (names === undefined) {
      if (on.has("unread binding")) unresolved.push(`${lineOf(sf, declaration)}: an unread binding: ${squeeze(declaration, sf)}`);
    } else for (const [name, form] of names) bind(name, form);
  }
  const assignmentWord = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && ASSIGNMENT_WORDS.some(([kind, word]) => node.operatorToken.kind === kind && on.has(word));
  /** What a source reads as: a whole HX local's form, "entry" for an entry member of a module local, through an M6 assignment's value. */
  const sourceOf = (expression: ts.Expression): string | undefined => {
    const value = unwrapWith(expression, on);
    if (ts.isIdentifier(value)) return locals.get(value.text);
    if (assignmentWord(value) && on.has("assigned value")) return sourceOf(value.right);
    const member = memberWith(value, on);
    if (member === undefined || !on.has(member.element ? "alias element" : "alias member")) return undefined;
    const base = unwrapWith(member.base, on);
    const from = ts.isIdentifier(base) ? locals.get(base.text) : undefined;
    return from !== undefined && moduleForms.includes(from) && entries.includes(member.name) ? "entry" : undefined;
  };
  /** The root a stored member chain is rooted at, through every member the store words read. */
  const rootOf = (target: ts.Expression): ts.Identifier | undefined => {
    let current = unwrapWith(target, on);
    let depth = 0;
    for (let member = memberWith(current, on); member !== undefined; member = memberWith(current, on)) {
      depth += 1;
      if (!on.has(member.element ? "store element" : "store") || (depth > 1 && !on.has("store deep"))) return undefined;
      current = unwrapWith(member.base, on);
    }
    return depth > 0 && ts.isIdentifier(current) ? current : undefined;
  };
  /** The locals an object-literal assignment target takes from a module local, or undefined when one cannot be named. */
  const assignedFrom = (target: ts.ObjectLiteralExpression): string[] | undefined => {
    const out: string[] = [];
    for (const property of target.properties) {
      if (ts.isShorthandPropertyAssignment(property)) {
        if (entries.includes(property.name.text) && on.has("assigned shorthand")) out.push(property.name.text);
        continue;
      }
      if (!ts.isPropertyAssignment(property)) return undefined;
      const key = keyWith(property.name, on);
      const value = unwrapWith(property.initializer, on);
      if (key === undefined || !ts.isIdentifier(value)) return undefined;
      if (entries.includes(key) && on.has("assigned renamed")) out.push(value.text);
    }
    return out;
  };
  const declarations = nodes.filter((node): node is ts.VariableDeclaration => ts.isVariableDeclaration(node) && !m5.has(node));
  const assignments = nodes.filter(assignmentWord);
  const read = new Set<ts.Node>();
  const used = new Set<ts.Node>();
  for (let grown = true; grown; grown = grown && on.has("fixpoint")) {
    grown = false;
    for (const declaration of declarations) {
      if (read.has(declaration) || declaration.initializer === undefined || !on.has("alias")) continue;
      const whole = sourceOf(declaration.initializer);
      if (whole === undefined) continue;
      read.add(declaration);
      placeDeclaration(declaration);
      if (ts.isIdentifier(declaration.name)) {
        grown = bind(declaration.name.text, "alias") || grown;
        continue;
      }
      const names = moduleForms.includes(whole) ? destructured(declaration.name, "alias") : undefined;
      if (names === undefined) {
        if (on.has("unread binding")) unresolved.push(`${lineOf(sf, declaration)}: an unread binding: ${squeeze(declaration, sf)}`);
      } else for (const [name, form] of names) grown = bind(name, form) || grown;
    }
    for (const assignment of assignments) {
      if (read.has(assignment)) continue;
      const whole = sourceOf(assignment.right);
      if (whole === undefined) continue;
      read.add(assignment);
      if (valueUsed(assignment) && on.has("used assignment")) used.add(assignment);
      const target = unwrapWith(assignment.left, on);
      let bound = false;
      let readable = true;
      if (ts.isIdentifier(target)) bound = on.has("assigned name") && bind(target.text, "alias");
      else if (memberWith(target, on) !== undefined) {
        const root = rootOf(target);
        readable = root !== undefined;
        bound = root !== undefined && bind(root.text, "store");
      } else {
        const names = ts.isObjectLiteralExpression(target) && moduleForms.includes(whole) ? assignedFrom(target) : undefined;
        readable = names !== undefined;
        for (const name of names ?? []) bound = bind(name, "alias") || bound;
      }
      if (!readable && on.has("unread assignment")) unresolved.push(`${lineOf(sf, assignment)}: an unread assignment: ${squeeze(assignment, sf)}`);
      grown = bound || grown;
      if (bound ? !on.has("assignment binding") : on.has("bound store")) continue;
      placing.push(assignment.left, assignment.right);
      if (on.has("binding default") && ts.isObjectLiteralExpression(target)) {
        for (const property of target.properties) if (ts.isShorthandPropertyAssignment(property) && property.objectAssignmentInitializer !== undefined) unplaced.push(property.objectAssignmentInitializer);
      }
    }
  }
  const cases = casesWith(sf, on);
  const isReference = (node: ts.Node): boolean =>
    (ts.isIdentifier(node) && locals.has(node.text) && on.has("local reference") && !isBindingSite(node, on)) || inline.has(node) || used.has(node);
  const importSet = new Set<ts.Node>(imports);
  const holds = (root: ts.Node): boolean => nodesOf(root).some(node => isReference(node) || importSet.has(node));
  const placed = (node: ts.Node): boolean =>
    (on.has("case body") && cases.some(entry => within(node, entry.body))) || (placing.some(outer => within(node, outer)) && !unplaced.some(outer => within(node, outer)));
  const outside = nodes.filter(node => isReference(node) && !placed(node)).map(node => `${lineOf(sf, node)}: ${squeeze(node, sf)}`);
  if (on.has("stray specifier")) {
    for (const node of nodes) {
      if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && hxModule(node.text, on) && !specifiers.has(node)) unresolved.push(`${lineOf(sf, node)}: ${node.getText(sf)}`);
    }
  }
  const hxCases = cases.filter(entry => holds(entry.body));
  const { witness } = options;
  return {
    live: locals.size > 0 || imports.length > 0,
    entries: [...locals].map(([name, form]) => `${form} ${name}`),
    cases: hxCases.map(entry => ({ title: entry.title, registration: entry.registration })),
    witnessing: witness === undefined ? [] : hxCases.filter(entry => witness(entry.body, sf)).map(entry => entry.title),
    unresolved,
    outside,
  };
}
