/**
 * wb-jwc.10 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17; the rule-19 structural-exit child of wb-jwc.7,
 * orchestrator rulings R-B92 and R-B115): the binding text reader census.
 * Statement (the bead's export title, ASCII as exported): "[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7] Census text readers resolve
 * identifiers by BINDING not by name (let/parameter shadows of same-file consts under-report), narrowed out of wb-jwc.7's
 * fail-closed core (rule-19 structural exit)".
 *
 * CUT #3 IS IN THE ENUMERATE-THE-RESOLVABLE FORM the second-stage cap R-B189 binds (rule 19(c), the R739 terminal form): THIS
 * CENSUS CLAIMS EXACTLY ITS PINS. Each part of the claim claims its words over exactly the forms its row's pages plant, the
 * falsifier roster naming them pin by pin, and every known family no row plants is a NAMED RESIDUAL in the claim's NOT CLAIMED
 * section, its row a pinned quiet row that reads one form of the family as the reader reads it today. A form no page plants
 * is not claimed, and no row's silence about a form is a claim about it.
 *
 * WHAT IS DELIVERED. The readers are test/helpers/binding-text-reader.ts (bindingTextReader), shared so a census rides them:
 * wb-jwc.7's census (blocked by this bead, R-B115; not on trunk) can take their resolve, alternatives, exact, words, program,
 * fields and registration in place of its own nameResolved, textsOf, commandText, resolvedProperties and rfRegistrations. This
 * census pins the readers with planted modules, each a string parsed in memory (no file is written), and reads today's src
 * with them (LIVE); src is only read.
 *
 * A READING (each pin's witness): a pin plants one module, its page, at a src-shaped path (the paths probe at each of its paths),
 * and reads it with one probe:
 *  texts, exact or words: for each call probe(x) in the page, in source order, x's alternatives rendered (a text as its JSON
 *  string, an opaque part as <opaque LABEL>, joined by " | "), its texts (JSON, or "unresolved") or its words (joined by
 *  single spaces, or unresolved);
 *  paths: for each of the pin's paths, the path, then each probe(x)'s alternatives rendered as texts reads them, joined by "
 *  ; ";
 *  loads: for each import(x) call and each call of an identifier named load or require, `loader:` and x's alternatives
 *  rendered;
 *  programs: for each call of a launcher identifier (spawn, spawnSync, execFile, execFileSync, exec, execSync, fork),
 *  `launcher:` and its program;
 *  registrations: the module's registration entries; registration: each object literal's registration() entries in source
 *  order, joined by ", ", one line per registration;
 *  kind: bindingKindOf on a synthetic declaration (a type alias, which no module text binds a value to);
 *  claim-header, claim-rows, export-rows, member-pins, kind-pins and falsifier-roster: the ACCEPTANCE checks (THE ROWS).
 * Each pin's witness is held to its expected reading, and each page to its digest twice (PAGES here, and the roster's digest
 * outside this file), so a pin swapped for another case, or a page hollowed together with this file's literals, reds.
 *
 * THE ROWS (ROWS: one test per pin; a row's label is the requirement it answers, held to that requirement's own text outside
 * this file):
 *  S1, S2, S3, PREMISE: the export description's four items, verbatim; each row holds the gate's own plant of its member
 *  (refusal #3 of wb-jwc.7, O:1346) and this census's controls.
 *  ACCEPTANCE: the export's Acceptance line, verbatim: CLAIM-HEADER (this header's claim paragraph equals BINDING_TEXT_CLAIM
 *  byte-for-byte), CLAIM-ROWS (the claim rows are exactly the claim's parts, its NOT CLAIMED residuals included, in order),
 *  EXPORT-ROWS (the export rows are the export's title, items and Acceptance line), MEMBER-PINS (each of the helper's
 *  MEMBERS, the gate members folded into this bead, is a pin of its part's row), KIND-PINS (the kinds row holds exactly one
 *  K- pin per kind the claim names, in the claim's order, then the kinds part's MEMBERS, in their order) and FALSIFIER-ROSTER
 *  (every row's pins, in order, are the ones test/fixtures/binding-text-reader-roster.json lists, each there with its page's
 *  digest and the claim words its page plants).
 *  One row per part of the claim (labelled `SECTION (n) id`, NOT CLAIMED (n) for a residual): its pins, each a planted page
 *  held to the reading the part's words give it, or, in a residual's row, its quiet row. The roster states, per pin, the
 *  claim words its page plants, no wider, and the census claims a pin for no word the roster's entry for that pin does not
 *  name. MEMBERS sit in their parts' rows: R-B115's R-ALT1 to R-ALT4 in registration, E1 to E3 in program and A10 in scope;
 *  refusal #1's G01, G08 and G09 in kinds, G02 in with, G03 in eval, G04 in cycle, G05, G06 and G07 in bounds and G10 in
 *  opaque-part; refusal #2's (below) in theirs; each pinned by the twin page its refusal names (the gate's evidence, byte for
 *  byte), read as the delivered reader reads it.
 *
 * REFUSAL #2 (gate-prep-1, run g10-gate-s161, O:1546), ITS UNMET ITEMS AND HOW EACH IS CURED: U1a's six eval contexts by M61
 * (a with body, at a .js path), M62 (an object literal's method), M63 (a template substitution), M64 (an arrow function's
 * body), M66 (a const's initializer) and M72 (a parameter default), beside seven more planted positions (V-STATIC, V-FIELD,
 * V-GETTER, V-COMPUTED, V-ENUM, V-RETURN, V-ARGUMENT); U1b by M11 and V-NAMES (six other names); U1c by M06 and X-ONCE; U1d by
 * M12, M13 and M14 and XR-PREFIXES; U1e by M15, read through registration() itself (the registration probe); U1f by M19 and
 * M26 and the XF-OVERRIDES matrix; U1g by M55; U1h by M59, M68, M69 and M34 and XW-WHITESPACE, XW-PUNCTUATION and XW-CUTS; U2
 * by P1 (the plant p1.js), C-JS-ALIAS and SC-PATHS, with BINDING (1) to (3) stating the parse by path and the checker's alias
 * bindings; U3 by narrowing the six roster entries it names (V-EVAL, K-catch, XW-WORDS, XF-ORDER, X-ORDER, XR-FORMS) to their
 * pages, with the rows planting the rest; F3 by the helper's claim doc comment (pins, not proves); F4 by P2 and P2-PROGRAM and
 * the words' cut stated as the text after the last / or \; F5 by M21 and M21-TS (one page at a .js and a .ts path). Found by
 * this cut: an opaque member left a field a method, getter or setter had made opaque under that member's label even when a
 * later spread or computed member could set it (the d3 and d5 rows of XF-OVERRIDES); the helper now relabels it, the last such
 * member's label kept.
 *
 * THE CLAIM (test/helpers/binding-text-reader.ts BINDING_TEXT_CLAIM, held here byte-for-byte; its numbered parts are
 * BINDING_FORMS, TEXT_FORMS, READING_FORMS and RESIDUAL_FORMS, each pinned by its row):
 * BINDING: (1) an identifier is read through the declaration TypeScript's checker binds it to by scope, in a program over its
 * own module alone (no lib, no module resolution), and a shorthand property's name through the binding of its value; the
 * module is parsed as JavaScript at a path ending .js, .cjs, .mjs or .jsx, in lower or upper case or as .Js, and as TypeScript
 * at a path ending .ts, .cts, .mts, .tsx, .TS, .json, .d.ts or .js.txt, or with no extension; (2) it resolves only when that
 * binding is exactly one declaration, a const with an initializer that declares the name itself (an element of a destructuring
 * pattern never resolves) and that the checker binds as no alias, outside an ambient (declare) context and not exported from a
 * namespace body, and it then reads as that initializer's alternatives; so a const shadowing a same-named const reads its own
 * initializer inside its scope and the outer one's outside it; (3) any other binding does not resolve and reads as <opaque
 * NAME:KIND>, NAME the identifier and KIND the first of these that names the binding: import (a binding the checker binds as
 * an alias: an import or import-equals, merged or not, and in a JavaScript module a require declaration - a const, let or var
 * declaration, or a top-level element of its object or array pattern, a defaulted one included, initialized directly by
 * require with one string or no-substitution template argument or by a property access of such a call, not exported - while an
 * exported, parenthesized, joined-argument, two-argument, nested-pattern, module.require or JSDoc-typed require declaration is
 * no alias); unbound (no declaration in the module, a type's name in a value position included); merged (more than one
 * declaration); destructuring (an element of a destructuring pattern, whatever declares the pattern: a const, let or var
 * declaration, a parameter or a catch clause); let (a let declaration, declare let and a let exported from a namespace body
 * included); var (a var declaration, declare var and a var exported from a namespace body included); using (a using or await
 * using declaration); catch (a catch clause variable, with a type annotation or without); no-initializer (a const with no
 * initializer); ambient (a const in an ambient context); namespace (a namespace, or a const exported from a namespace body);
 * parameter; function (a function declaration, or a named function expression's own name); class (a class declaration, or a
 * named class expression's own name); enum (an enum or an enum member); other (a declaration of any other kind); (4) an
 * identifier inside a with statement's body, at any depth (nested blocks, functions, classes and with statements included),
 * reads as <opaque NAME:with>, whatever it binds; (5) every identifier of a module that calls eval by name reads as <opaque
 * NAME:eval>, whatever it binds, a with statement's body included: a call, optional or not and with or without arguments,
 * whose callee is the identifier eval itself (evaluate, preval, Eval, EVAL, ev and evalx are other names) inside any
 * parentheses, as, satisfies, non-null !, type assertion or await, as a statement at the top level or in a function, an async
 * function, a class method or a with body, or inside an object literal's method, a template substitution, an arrow function's
 * body, a const's initializer, a parameter default, a class static block, a class field's initializer, a getter's body, a
 * computed property key, an enum member's initializer, a return statement or a call's argument; a new expression, a tagged
 * template and an uncalled decorator are no call; (6) an identifier whose const's initializer reaches that same const (the
 * same declaration, not a same-named one) again reads, at the repeated reach, as <opaque NAME:cycle>, NAME the identifier
 * there, the expression's other alternatives read as usual. TEXT: an expression's alternatives are (1) a string or
 * no-substitution template literal: its text, each escape sequence read as the character it stands for, as TypeScript cooks it
 * (\x, \u, \u{...}, \n, \t, \\, \", \', \0, an octal escape and a line continuation); (2) an identifier: as BINDING reads it;
 * (3) a template with substitutions: every combination of its literal parts' texts (escape sequences read) and its
 * substitutions' alternatives, in order; (4) a + join: every combination of its left side's and its right side's alternatives;
 * (5) a ?: expression: its two branches' alternatives, its condition unread; (6) a ?? expression: both sides' alternatives;
 * (7) a || expression: both sides' alternatives; (8) a && expression: both sides' alternatives; (9) parentheses, as,
 * satisfies, a non-null !, a type assertion and await: the inner expression's alternatives; (10) any other expression (every
 * binary operator but +, ??, || and &&, the plain and compound assignments and the comma included, every prefix and postfix
 * operator, void, typeof and delete, a call, optional or not, a new expression, a property or element access, optional or not,
 * a property access through a non-null !, a number, bigint or regular expression literal, true, false, null, this, a property
 * of super, a tagged template, an arrow function, a function or class expression, a spread, yield, import.meta, new.target, an
 * instantiation expression and an object or array literal): one <opaque TEXT>, TEXT its source text with each run of the
 * characters JavaScript's \s class matches read as one space (U+0085 and U+200B, which it does not match, stay); (11) each
 * combination with an opaque part reads as its first opaque part's alternative, and each combination without one as its joined
 * text, so a join keeps its exact alternatives beside its opaque ones; (12) a template or + join with more than 64
 * combinations (counted before any two are found to read alike), or an expression read more than 16 levels deep (each wrapper,
 * each identifier followed to its initializer, and each side, branch or substitution read counting one level), reads, where
 * the bound is passed, as one <opaque TEXT:bound>, TEXT that expression's source text; (13) the alternatives are listed in
 * source order (a left side's or a true branch's first, a combination's by its parts, the first part varying slowest), each
 * once, a text and an opaque part with the same label being two alternatives. READINGS: (1) an expression's texts: its
 * alternatives' texts, in order, when none is opaque; unresolved otherwise; (2) a command's words: every alternative's text
 * split at each run of whitespace (the characters JavaScript's \s class matches), quotes (" ' and `, at a word's end or inside
 * it) and the shell operators ; & | ( ) < >, and at no other printable ASCII character (U+0085 and U+200B split nothing
 * either), each word then cut to the text after its last / or \ and a trailing .exe or .cmd (either case) dropped, so a word
 * can cut to the empty word; each word once, the empty word included, in order of first appearance; unresolved when any
 * alternative is opaque; (3) a launch program: when every alternative is a text with a first word (READINGS (2)'s first word,
 * the empty word included), those first words, sorted, each once, joined by |; otherwise <opaque TEXT>, TEXT the program
 * expression's source text with each whitespace run read as TEXT (10) reads it; (4) an object literal's fields, member by
 * member in source order, a later member overriding: a property assignment whose key is a name, a string or numeric literal,
 * or a computed key whose expression, inside any of the wrappers TEXT (9) names, is a string or no-substitution template
 * literal sets its field, and so does a shorthand property; a method, getter or setter with such a key makes its own field
 * opaque; a spread whose expression, inside any of those wrappers, is an identifier BINDING resolves to a const whose
 * initializer, inside any of those wrappers, is an object literal whose own fields hold no opaque member (a method, getter or
 * setter included; spreads nested at most 8 deep) sets the fields it holds; any other member (a spread of anything else, or a
 * member with any other key, a computed number included) is opaque and may set every field; (5) a registration: an object
 * literal whose id field has a text alternative starting reactivefiber. (reactivefiber, reactivefiberx.b, ReactiveFiber.d,
 * forge.reactivefiber.c and a text with a leading space start no such text), read as one ID:EFFECT entry per such text and per
 * opaque alternative of that id, the object's entries sorted, each once, ID the text or <opaque LABEL>; EFFECT its effectClass
 * field's alternatives (a text as itself, an opaque one as <opaque LABEL>), sorted, each once, joined by |, or <none> when it
 * has no effectClass field; a field an opaque member may set after its last setting, or in place of one, reads <opaque
 * MEMBER>, MEMBER the label of the last such member (...expression for a spread, its key's source text, or get name, set name
 * or name() for an accessor or method). Each part claims its words over exactly the forms its census row's pages plant, the
 * roster naming them pin by pin. NOT CLAIMED (named residuals, each read today by its quiet row): (1) an eval call at a
 * position no eval row page plants, whose quiet row reads a module calling eval in a switch statement's head; (2) a JavaScript
 * module's require declaration in a form no const or import page plants, whose quiet row reads a require reached through a
 * comma expression; (3) a path in a form no scope page plants, whose quiet row reads the JavaScript page at a path ending
 * .Mjs; (4) an expression kind no other row page plants, whose quiet row reads a JSX element and fragment in a .tsx module;
 * (5) a character no words row page plants, whose quiet row reads a command word holding a letter outside ASCII. No reading
 * claims more than these parts state.
 *
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl, the bead's title, description items and Acceptance
 * line) for S1, S2, S3, PREMISE and ACCEPTANCE; the helper's BINDING_FORMS, TEXT_FORMS, READING_FORMS and RESIDUAL_FORMS for
 * every claim row and its label, its MEMBERS for each folded gate member's pin, and the kinds the claim's kinds part names for
 * the K- pins; the falsifier roster (test/fixtures/binding-text-reader-roster.json) for every row's pins, each with its page's
 * digest and the claim words its page plants; and src, read by LIVE. FROZEN SHAPE (standing rule 16): ROWS pins
 * `${id}:${pins.length}` as a literal and PAGES pins each pin's `${id}:${sha256/16 of its page}`.
 * NOT CLAIMED: how wb-jwc.7's census reads once it rides these readers (its file is not on trunk; the cutting seat's run of
 * its refusal #4 members through these readers is a delivery-note receipt, not a pin); which calls load or launch a module
 * (the loads and programs probes above are this census's own locators, by callee name, and a riding census keeps its own);
 * what a module does at run time beyond its source text (a CommonJS exports object reassigned, a prototype patched, source
 * evaluated), which the readers never see; any form outside the planted ones, the claim's named residuals among them; and the
 * gate members' notes: MEMBERS anchors R-B115's members and refusal #1's and #2's members by naming each one's source (the
 * tracker export carries their notes in the bead's notes field), and this census reads only the export's title and
 * description, never its notes.
 */

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  BINDING_FORMS,
  BINDING_TEXT_CLAIM,
  type BindingTextReader,
  bindingKindOf,
  bindingTextReader,
  type ClaimPart,
  MEMBERS,
  READING_FORMS,
  RESIDUAL_FORMS,
  rendered,
  TEXT_FORMS,
} from "./helpers/binding-text-reader.js";

const SELF = fileURLToPath(import.meta.url);
const REPO = join(dirname(SELF), "..");
const BEAD = "wb-jwc.10";
const EXPORT = ".beads/issues.jsonl";
const ROSTER = "test/fixtures/binding-text-reader-roster.json";
const STATEMENT =
  "[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7] Census text readers resolve identifiers by BINDING not by name (let/parameter shadows of same-file consts under-report), narrowed out of wb-jwc.7's fail-closed core (rule-19 structural exit)";
const LAUNCHERS: ReadonlySet<string> = new Set(["spawn", "spawnSync", "execFile", "execFileSync", "exec", "execSync", "fork"]);

type Probe =
  | "texts"
  | "exact"
  | "words"
  | "loads"
  | "programs"
  | "registrations"
  | "registration"
  | "paths"
  | "kind"
  | "claim-header"
  | "claim-rows"
  | "export-rows"
  | "member-pins"
  | "kind-pins"
  | "falsifier-roster";
interface Pin {
  readonly id: string;
  readonly path: string;
  readonly page: string;
  readonly probe: Probe;
  readonly expect: readonly string[];
  /** The paths probe only: each path the page is read at, in order. */
  readonly paths?: readonly string[];
}
interface Row {
  readonly id: string;
  readonly from: "export" | "claim";
  readonly label: string;
  readonly pins: readonly Pin[];
}

function page(...text: string[]): string {
  return `${text.join("\n")}\n`;
}
function pin(id: string, probe: Probe, text: string, expected: readonly string[], path = `src/workbench/providers/zz-${id.toLowerCase()}.ts`): Pin {
  return { id, path, page: text, probe, expect: expected };
}
function check(id: string, probe: Probe): Pin {
  return { id, path: "", page: "", probe, expect: [] };
}
/** One page read at each of several paths (the paths probe). */
function atPaths(id: string, text: string, paths: readonly string[], expected: readonly string[]): Pin {
  return { id, path: paths[0] ?? "", page: text, probe: "paths", expect: expected, paths };
}
/** Characters spelled by code point, so this file stays ASCII. */
function chars(...codePoints: number[]): string {
  return String.fromCodePoint(...codePoints);
}
/** A template substitution's source text, `${expression}`, built so that no string in this file spells a placeholder. */
function sub(expression: string): string {
  return `$${"{"}${expression}}`;
}
function digest(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/* ------------------------------------------------------------------ the gate's plants */

const CHILD_PROCESS_CODES = "110, 111, 100, 101, 58, 99, 104, 105, 108, 100, 95, 112, 114, 111, 99, 101, 115, 115";
const COMMITTING_ARGV = '["--workspace", root, "context", "render", "--json"]';
function s1Page(binding: string, name: string, tail: string[] = []): string {
  return page(
    'import { RF_PROGRAM } from "./zz-gp24-bin.js";',
    'const MODULE = "node:fs";',
    "export { MODULE as FS_MODULE };",
    "export async function commitRender(root: string): Promise<void> {",
    `  ${binding} ${name} = ${binding === "let" && name === "MODULE" && tail.includes("literal") ? '"node:child_process"' : `String.fromCharCode(${CHILD_PROCESS_CODES})`};`,
    `  const cp = await import(${name});`,
    `  cp.spawn(RF_PROGRAM, ${COMMITTING_ARGV}, { stdio: "ignore" });`,
    "}",
    ...tail.filter((line) => line !== "literal"),
  );
}
function s2Page(parameter: string, tail: string[] = []): string {
  return page(
    'import { createRequire } from "node:module";',
    'import { RF_PROGRAM } from "./zz-gp24-bin.js";',
    'const SPECIFIER = "node:path";',
    "const load = createRequire(import.meta.url);",
    `export function commitRenderWith(root: string, ${parameter}: string): void {`,
    `  load(${parameter}).spawn(RF_PROGRAM, ${COMMITTING_ARGV}, { stdio: "ignore" });`,
    "}",
    "export function commitRender(root: string): void {",
    `  commitRenderWith(root, String.fromCharCode(${CHILD_PROCESS_CODES}));`,
    "}",
    ...tail,
  );
}
function s3Page(shadowed: boolean, tail: string[] = []): string {
  return page(
    'import type { CapabilityRegistry } from "../registry.js";',
    ...(shadowed ? ['const EFFECT_CLASS = "read";'] : []),
    "export function registerNativeReactiveFiberRender(registry: CapabilityRegistry, workspaceRoot: string): void {",
    '  let EFFECT_CLASS: "read" | "write" = process.env.PI_RF_EFFECT === "1" ? "write" : "read";',
    '  registry.register({descriptor:{id:"reactivefiber.render.preview",version:"1.0.0",inputSchema:{type:"object"},effectClass:EFFECT_CLASS,permissions:["reactivefiber:render"],supportedModes:["invoke"]},invoke:async()=>({workspaceRoot})});',
    "}",
    ...tail,
  );
}
function aliasPage(id: string, head: string[] = []): string {
  return page(
    'import type { CapabilityRegistry } from "../registry.js";',
    ...head,
    "const invoke = async (): Promise<Record<string, never>> => ({});",
    "export function registerCommitAlias(registry: CapabilityRegistry): void {",
    `  registry.register({descriptor:{id:${id}, version:"1.0.0", inputSchema:{type:"object"}, effectClass:"write", permissions:["reactivefiber:render"], supportedModes:["invoke"]}, invoke});`,
    "}",
  );
}
const GIT_ARGV = '["-C", root, "rev-parse", "--verify", "--quiet", spec]';
const HEAD_OPTIONS = '{ timeout: 5_000, maxBuffer: 64 * 1024, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }';
function headPage(program: string, argv: string, extra: string[] = [], inner: string[] = []): string {
  return page(
    'import { execFileSync } from "node:child_process";',
    ...extra,
    "export function observedPackageHead(root: string): { commit: string; tree: string } | undefined {",
    ...inner,
    `  const revision = (spec: string): string => execFileSync(${program}, ${argv}, ${HEAD_OPTIONS}).trim();`,
    "  try {",
    '    return { commit: revision("HEAD"), tree: revision("HEAD^{tree}") };',
    "  } catch {",
    "    return undefined;",
    "  }",
    "}",
  );
}
const E_ARGV = `process.env.PI_VCS === undefined ? ${GIT_ARGV} : ["--workspace", root, "context", "render", "--json"]`;

/* ------------------------------------------------------------------ generated pages */

function nested(open: (inner: string) => string, levels: number, leaf: string): string {
  let text = leaf;
  for (let level = 0; level < levels; level += 1) text = open(text);
  return text;
}
function boundsPage(): string {
  const two = '(c ? "0" : "1")';
  const chain = (count: number): string => Array.from({ length: count }, () => two).join(" + ");
  const template = (count: number): string => `\`${Array.from({ length: count }, () => sub('c ? "0" : "1"')).join("")}\``;
  const identifiers = Array.from({ length: 17 }, (_, index) => (index === 0 ? 'const I0 = "i";' : `const I${index} = I${index - 1};`));
  return page(
    `probe(${chain(6)});`,
    `probe(${chain(7)});`,
    `probe(${template(6)});`,
    `probe(${template(7)});`,
    `probe(${nested((inner) => `(${inner})`, 16, '"a"')});`,
    `probe(${nested((inner) => `(${inner})`, 17, '"a"')});`,
    ...identifiers,
    "probe(I15);",
    "probe(I16);",
    `probe(${Array.from({ length: 16 }, () => '"b"').reduce((left, right) => `${left} ?? ${right}`, '"a"')});`,
    `probe(${Array.from({ length: 17 }, () => '"b"').reduce((left, right) => `${left} ?? ${right}`, '"a"')});`,
    `probe(${nested((inner) => `c ? "x" : ${inner}`, 16, '"a"')});`,
    `probe(${nested((inner) => `c ? "x" : ${inner}`, 17, '"a"')});`,
    `probe(${nested((inner) => `\`\${${inner}}\``, 16, '"a"')});`,
    `probe(${nested((inner) => `\`\${${inner}}\``, 17, '"a"')});`,
  );
}
function boundsReading(): string[] {
  const bits = (count: number): string => Array.from({ length: 2 ** count }, (_, index) => JSON.stringify(index.toString(2).padStart(count, "0"))).join(" | ");
  const chain = (count: number): string => Array.from({ length: count }, () => '(c ? "0" : "1")').join(" + ");
  const template = (count: number): string => `\`${Array.from({ length: count }, () => sub('c ? "0" : "1"')).join("")}\``;
  return [
    bits(6),
    `<opaque ${chain(7)}:bound>`,
    bits(6),
    `<opaque ${template(7)}:bound>`,
    '"a"',
    '<opaque "a":bound>',
    '"i"',
    '<opaque "i":bound>',
    '"a" | "b"',
    '<opaque "a":bound> | <opaque "b":bound> | "b"',
    '"x" | "a"',
    '"x" | <opaque "x":bound> | <opaque "a":bound>',
    '"a"',
    '<opaque "a":bound>',
  ];
}
/**
 * The depth bound at each form that counts a level (TEXT (12)): I0 to I15 chain, so probe(I15) reads "i" exactly 16 levels deep;
 * each form is planted twice, around I14 (one level more: still read) and around I15 (one level more: bound).
 */
function levelsPage(...forms: string[]): string {
  const chain = Array.from({ length: 16 }, (_, index) => (index === 0 ? 'const I0 = "i";' : `const I${index} = I${index - 1};`));
  return page(...chain, "probe(I14);", "probe(I15);", ...forms.flatMap((form) => [form.replace("@", "I14"), form.replace("@", "I15")]));
}
/** The 64 texts of an 8 x 8 join of "0" to "7" and "a" to "h", rendered in combination order (the first part varying slowest). */
function eightByEight(): string {
  return Array.from({ length: 64 }, (_, index) => JSON.stringify(`${Math.floor(index / 8)}${"abcdefgh"[index % 8]}`)).join(" | ");
}
function spreadDepthPage(): string {
  const bases = Array.from({ length: 9 }, (_, index) => (index === 0 ? 'const B0 = { effectClass: "write" };' : `const B${index} = { ...B${index - 1} };`));
  return page(...bases, 'export const s = { id: "reactivefiber.s", ...B7 };', 'export const t = { id: "reactivefiber.t", ...B8 };');
}

/** The 25 characters JavaScript's \\s class matches, in code point order, then U+0085 and U+200B, which it does not match. */
const WHITESPACE = chars(0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x20, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff);
const NOT_WHITESPACE = chars(0x85, 0x200b);
/** The same 25 characters as escape sequences inside a string literal of a planted page (the page stays ASCII). */
const WHITESPACE_ESCAPES = [...WHITESPACE].map((character) => `\\u${(character.codePointAt(0) ?? 0).toString(16).padStart(4, "0")}`).join("");
const NON_SEPARATORS = "!#$%*+,-.:=?@[]^_{}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BINARY_OPERATORS = ["*", "/", "%", "**", "-", "<<", ">>", ">>>", "<", ">", "<=", ">=", "instanceof", "in", "==", "!=", "===", "!==", "&", "|", "^", ","];
const ASSIGNMENTS = ["=", "+=", "-=", "*=", "/=", "%=", "**=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", "&&=", "||=", "??="];
/** One planted eval position (BINDING (5)): the module's const X, probed, beside one eval call at that position. */
function evalAt(...position: string[]): string {
  return page('const X = "a";', "probe(X);", ...position);
}
/** The paths the scope row reads the JavaScript page at, JavaScript paths first. */
const SCOPE_PATHS = [".js", ".cjs", ".mjs", ".jsx", ".JS", ".CJS", ".MJS", ".JSX", ".Js", ".ts", ".cts", ".mts", ".tsx", ".TS", ".json", ".d.ts", ".js.txt", ""].map(
  (extension) => `src/workbench/zz-sc-paths${extension}`,
);
const P1_PAGE = page("const X = require(\"node:fs\");", "probe(X);", "const { join } = require(\"node:path\");", "probe(join);", "const Y = \"y\";", "probe(Y);", "function probe(value) { return value; }");
const P2_PAGE = page("declare function probe(value: unknown): void;", "declare function spawn(program: string, args: string[]): void;", "probe(\"rf bin/ C:\\\\tools\\\\\");", "spawn(\"/usr/bin/rf/\", []);", "export {};");
/** The override matrix of READINGS (4) and (5): each object's effectClass set by one member kind, then by another. */
const OVERRIDES = page(
  'const BASE = { effectClass: "write" };',
  'export const a1 = { id: "reactivefiber.a1", effectClass: "read", effectClass: "write" };',
  'export const a2 = { id: "reactivefiber.a2", effectClass: "read", ...BASE };',
  'export const a3 = { id: "reactivefiber.a3", effectClass: "read", ...g() };',
  'export const a4 = { id: "reactivefiber.a4", effectClass: "read", get effectClass() { return "w"; } };',
  'export const a5 = { id: "reactivefiber.a5", effectClass: "read", [k]: "x" };',
  'export const b1 = { id: "reactivefiber.b1", ...g(), effectClass: "read" };',
  'export const b2 = { id: "reactivefiber.b2", ...g(), ...BASE };',
  'export const b3 = { id: "reactivefiber.b3", ...g(), ...h() };',
  'export const b4 = { id: "reactivefiber.b4", ...g(), get effectClass() { return "w"; } };',
  'export const b5 = { id: "reactivefiber.b5", ...g(), [k]: "x" };',
  'export const c1 = { id: "reactivefiber.c1", ...BASE, effectClass: "read" };',
  'export const c2 = { id: "reactivefiber.c2", ...BASE, ...BASE };',
  'export const c3 = { id: "reactivefiber.c3", ...BASE, ...g() };',
  'export const c4 = { id: "reactivefiber.c4", ...BASE, set effectClass(v: string) {} };',
  'export const c5 = { id: "reactivefiber.c5", ...BASE, [k]: "x" };',
  'export const d1 = { id: "reactivefiber.d1", effectClass() { return "w"; }, effectClass: "read" };',
  'export const d2 = { id: "reactivefiber.d2", effectClass() { return "w"; }, ...BASE };',
  'export const d3 = { id: "reactivefiber.d3", effectClass() { return "w"; }, ...g() };',
  'export const d4 = { id: "reactivefiber.d4", effectClass() { return "w"; }, get effectClass() { return "w"; } };',
  'export const d5 = { id: "reactivefiber.d5", effectClass() { return "w"; }, [k]: "x" };',
  'export const e1 = { id: "reactivefiber.e1", [k]: "x", effectClass: "read" };',
  'export const e2 = { id: "reactivefiber.e2", [k]: "x", ...BASE };',
  'export const e3 = { id: "reactivefiber.e3", [k]: "x", ...g() };',
  'export const e4 = { id: "reactivefiber.e4", [k]: "x", get effectClass() { return "w"; } };',
  'export const e5 = { id: "reactivefiber.e5", [k]: "x", [j]: "y" };',
  'export const f1 = { id: "reactivefiber.f1", ...g(), ...h(), effectClass: "read" };',
  'export const f2 = { id: "reactivefiber.f2", get effectClass() { return "w"; }, ...g(), ...h() };',
);
/** Each object's registration in source order: a later member wins, and an opaque member labels every field it may set, the last one's label kept. */
const OVERRIDES_READING = [
  "reactivefiber.a1:write",
  "reactivefiber.a2:write",
  "<opaque ...g()>:<opaque ...g()>",
  "reactivefiber.a4:<opaque get effectClass>",
  "<opaque [k]>:<opaque [k]>",
  "<opaque ...g()>:read",
  "<opaque ...g()>:write",
  "<opaque ...h()>:<opaque ...h()>",
  "<opaque ...g()>:<opaque get effectClass>",
  "<opaque [k]>:<opaque [k]>",
  "reactivefiber.c1:read",
  "reactivefiber.c2:write",
  "<opaque ...g()>:<opaque ...g()>",
  "reactivefiber.c4:<opaque set effectClass>",
  "<opaque [k]>:<opaque [k]>",
  "reactivefiber.d1:read",
  "reactivefiber.d2:write",
  "<opaque ...g()>:<opaque ...g()>",
  "reactivefiber.d4:<opaque get effectClass>",
  "<opaque [k]>:<opaque [k]>",
  "<opaque [k]>:read",
  "<opaque [k]>:write",
  "<opaque ...g()>:<opaque ...g()>",
  "<opaque [k]>:<opaque get effectClass>",
  "<opaque [j]>:<opaque [j]>",
  "<opaque ...h()>:read",
  "<opaque ...h()>:<opaque ...h()>",
];

/* ------------------------------------------------------------------ the rows */

const ROWS: readonly Row[] = [
  {
    id: "S1",
    from: "export",
    label: "S1: an import() specifier held by a let that shadows a same-file const must resolve to the LET binding (falsifier reds the unmodified census).",
    pins: [
      pin("S1", "loads", s1Page("let", "MODULE"), ["import():<opaque MODULE:let>"]),
      pin("S1-LITERAL", "loads", s1Page("let", "MODULE", ["literal"]), ["import():<opaque MODULE:let>"]),
      pin("S1C", "loads", s1Page("let", "LOADED"), ["import():<opaque LOADED:let>"]),
      pin("S1-OUTER", "loads", s1Page("let", "MODULE", ["export const preloaded = import(MODULE);"]), ["import():<opaque MODULE:let>", 'import():"node:fs"']),
    ],
  },
  {
    id: "S2",
    from: "export",
    label: "S2: a specifier passed as a parameter that shadows a const, loaded through a same-file helper, must resolve to the parameter.",
    pins: [
      pin("S2", "loads", s2Page("SPECIFIER"), ["load:<opaque SPECIFIER:parameter>"]),
      pin("S2C", "loads", s2Page("REQUESTED"), ["load:<opaque REQUESTED:parameter>"]),
      pin("S2-OUTER", "loads", s2Page("SPECIFIER", ["export const preloaded = load(SPECIFIER);"]), ["load:<opaque SPECIFIER:parameter>", 'load:"node:path"']),
    ],
  },
  {
    id: "S3",
    from: "export",
    label: "S3: the third shadowing form named in refusal #3's graded list (non-const same-name binding under-reporting), with its falsifier.",
    pins: [
      pin("S3", "registrations", s3Page(true), ["reactivefiber.render.preview:<opaque EFFECT_CLASS:let>"]),
      pin("S3C", "registrations", s3Page(false), ["reactivefiber.render.preview:<opaque EFFECT_CLASS:let>"]),
      pin("S3-OUTER", "registrations", s3Page(true, ['export const descriptor = { id: "reactivefiber.render.preview", effectClass: EFFECT_CLASS };']), [
        "reactivefiber.render.preview:<opaque EFFECT_CLASS:let>",
        "reactivefiber.render.preview:read",
      ]),
    ],
  },
  {
    id: "PREMISE",
    from: "export",
    label:
      "The scanOf premise comment at :474 must state the implemented truth (name-level resolution over-reports for const shadows and under-reports for non-const shadows) or the resolver must become binding-aware.",
    pins: [
      pin(
        "P-CONST-SHADOW",
        "loads",
        page('const SPECIFIER = "node:fs";', "export async function commitRender(): Promise<unknown> {", '  const SPECIFIER = "node:child_process";', "  return import(SPECIFIER);", "}", "export const fs = import(SPECIFIER);"),
        ['import():"node:child_process"', 'import():"node:fs"'],
      ),
      pin(
        "P-LET-SHADOW",
        "loads",
        page('const SPECIFIER = "node:fs";', "export async function commitRender(): Promise<unknown> {", '  let SPECIFIER = "node:child_process";', "  return import(SPECIFIER);", "}", "export const fs = import(SPECIFIER);"),
        ["import():<opaque SPECIFIER:let>", 'import():"node:fs"'],
      ),
      pin(
        "P-PARAMETER-SHADOW",
        "loads",
        page('const SPECIFIER = "node:fs";', "export async function commitRender(SPECIFIER: string): Promise<unknown> {", "  return import(SPECIFIER);", "}", "export const fs = import(SPECIFIER);"),
        ["import():<opaque SPECIFIER:parameter>", 'import():"node:fs"'],
      ),
    ],
  },
  {
    id: "ACCEPTANCE",
    from: "export",
    label:
      "Acceptance: each S* plant reds the unmodified census and greens under the cure; the tripwire claim text and the resolver's actual binding behavior agree byte-for-byte with the falsifier roster.",
    pins: [check("CLAIM-HEADER", "claim-header"), check("CLAIM-ROWS", "claim-rows"), check("EXPORT-ROWS", "export-rows"), check("MEMBER-PINS", "member-pins"), check("KIND-PINS", "kind-pins"), check("FALSIFIER-ROSTER", "falsifier-roster")],
  },
  {
    id: "scope",
    from: "claim",
    label: "BINDING (1) scope",
    pins: [
      pin("SC-SHADOW", "texts", page('const X = "a";', '{ const X = "b"; probe(X); }', "probe(X);", 'function f() { probe(X); const X = "c"; }'), ['"b"', '"a"', '"c"']),
      pin(
        "SC-SHORTHAND",
        "registrations",
        page('const id = "reactivefiber.render.commit";', 'export const commit = { id, effectClass: "write" };', 'export function alias(id: string) { return { id, effectClass: "write" }; }'),
        ["reactivefiber.render.commit:write"],
      ),
      pin(
        "A10",
        "loads",
        page('const MODULE = "node:fs";', "export async function commitRender(): Promise<unknown> {", `  const MODULE = String.fromCharCode(${CHILD_PROCESS_CODES});`, "  return import(MODULE);", "}"),
        [`import():<opaque String.fromCharCode(${CHILD_PROCESS_CODES})>`],
      ),
      atPaths("SC-PATHS", P1_PAGE, SCOPE_PATHS, [...SCOPE_PATHS.slice(0, 9).map((path) => `${path}: <opaque X:import> ; <opaque join:import> ; "y"`), ...SCOPE_PATHS.slice(9).map((path) => `${path}: <opaque require("node:fs")> ; <opaque join:destructuring> ; "y"`)]),
      pin("M21", "texts", page("const X = require(\"node:fs\");", "probe(X);", "function probe(value) { return value; }"), ["<opaque X:import>"], "src/workbench/zz-gp1-t21.js"),
      pin("M21-TS", "texts", page("const X = require(\"node:fs\");", "probe(X);", "function probe(value) { return value; }"), ['<opaque require("node:fs")>'], "src/workbench/providers/zz-gp1-t21.ts"),
    ],
  },
  {
    id: "const",
    from: "claim",
    label: "BINDING (2) const",
    pins: [
      pin(
        "C-RESOLVES",
        "texts",
        page('const X = "a";', "probe(X);", 'export const Y = "y";', "probe(Y);", 'for (const Z = "z"; ; ) { probe(Z); break; }', 'const A = "a2";', "const B = A;", "probe(B);"),
        ['"a"', '"y"', '"z"', '"a2"'],
      ),
      pin(
        "C-PATTERN",
        "texts",
        page(
          'const { X = "x" } = o;',
          "probe(X);",
          'const [Y = "y"] = a;',
          "probe(Y);",
          'let { L = "l" } = o;',
          "probe(L);",
        ),
        [
          "<opaque X:destructuring>",
          "<opaque Y:destructuring>",
          "<opaque L:destructuring>",
        ],
      ),
      pin(
        "C-JS-ALIAS",
        "texts",
        page(
          'let L = require("node:fs");',
          "probe(L);",
          'var V = require("node:fs");',
          "probe(V);",
          'const A = require("node:fs").readFileSync;',
          "probe(A);",
          "const T = require(`node:fs`);",
          "probe(T);",
          'function f() { const N = require("node:fs"); probe(N); }',
          'const [E] = require("node:fs");',
          "probe(E);",
          'const { D = "d" } = require("node:fs");',
          "probe(D);",
          'export const X = require("node:fs");',
          "probe(X);",
          'const W = (require("node:fs"));',
          "probe(W);",
          'const Q = require("node:" + "fs");',
          "probe(Q);",
          'const R = require("node:fs", "x");',
          "probe(R);",
          'const { a: { B } } = require("node:fs");',
          "probe(B);",
          'const M = module.require("node:fs");',
          "probe(M);",
          "/** @type {any} */",
          'const J = require("node:fs");',
          "probe(J);",
          "function probe(value) { return value; }",
        ),
        [
          "<opaque L:import>",
          "<opaque V:import>",
          "<opaque A:import>",
          "<opaque T:import>",
          "<opaque N:import>",
          "<opaque E:import>",
          "<opaque D:import>",
          '<opaque require("node:fs")>',
          '<opaque require("node:fs")>',
          '<opaque require("node:" + "fs")>',
          '<opaque require("node:fs", "x")>',
          "<opaque B:destructuring>",
          '<opaque module.require("node:fs")>',
          '<opaque require("node:fs")>',
        ],
        "src/workbench/zz-c-js-alias.js",
      ),
    ],
  },
  {
    id: "kinds",
    from: "claim",
    label: "BINDING (3) kinds",
    pins: [
      pin(
        "K-import",
        "texts",
        page(
          'import { X } from "./a.js";',
          'import { X } from "./b.js";',
          'import Y = require("./c.js");',
          'import * as NS from "./d.js";',
          'import D from "./e.js";',
          'import { Q } from "./f.js";',
          "namespace Q { export const q = 1; }",
          "probe(X); probe(Y); probe(NS); probe(D); probe(Q);",
        ),
        ["<opaque X:import>", "<opaque Y:import>", "<opaque NS:import>", "<opaque D:import>", "<opaque Q:import>"],
      ),
      pin(
        "K-unbound",
        "texts",
        page("type TA = string;", "interface IF {}", "probe(process); probe(MISSING); probe(TA); probe(IF); probe(String); probe(undefined); probe(globalThis);"),
        ["<opaque process:unbound>", "<opaque MISSING:unbound>", "<opaque TA:unbound>", "<opaque IF:unbound>", "<opaque String:unbound>", "<opaque undefined:unbound>", "<opaque globalThis:unbound>"],
      ),
      pin(
        "K-merged",
        "texts",
        page(
          'var X = "a";',
          'var X = "b";',
          "probe(X);",
          'const Y = "y";',
          "type Y = string;",
          "probe(Y);",
          "function F(a: string): void;",
          "function F(a: unknown): void {}",
          "probe(F);",
          "var { MV } = o;",
          "var { MV } = p;",
          "probe(MV);",
          "namespace MN { export const a = 1; }",
          "namespace MN { export const b = 2; }",
          "probe(MN);",
        ),
        [
          "<opaque X:merged>",
          "<opaque Y:merged>",
          "<opaque F:merged>",
          "<opaque MV:merged>",
          "<opaque MN:merged>",
        ],
      ),
      pin(
        "K-destructuring",
        "texts",
        page(
          "function f({ Z }: { Z: string }) { probe(Z); }",
          "const { X } = o;",
          'const [Y = "y"] = a;',
          "probe(X); probe(Y);",
          "let { L } = o;",
          "var { V } = o;",
          "probe(L); probe(V);",
          "try { f(); } catch ({ M }) { probe(M); }",
          "for (const { F } of list) probe(F);",
        ),
        [
          "<opaque Z:destructuring>",
          "<opaque X:destructuring>",
          "<opaque Y:destructuring>",
          "<opaque L:destructuring>",
          "<opaque V:destructuring>",
          "<opaque M:destructuring>",
          "<opaque F:destructuring>",
        ],
      ),
      pin(
        "K-let",
        "texts",
        page(
          'let X = "a";',
          "probe(X);",
          "let Y: string;",
          "probe(Y);",
          "declare let DL: string;",
          "probe(DL);",
          'namespace NL { export let EL = "e"; probe(EL); }',
        ),
        [
          "<opaque X:let>",
          "<opaque Y:let>",
          "<opaque DL:let>",
          "<opaque EL:let>",
        ],
      ),
      pin(
        "K-var",
        "texts",
        page(
          'var X = "a";',
          "probe(X);",
          'function f() { var Y = "y"; probe(Y); }',
          "declare var DV: string;",
          "probe(DV);",
          'namespace NV { export var EV = "e"; probe(EV); }',
        ),
        [
          "<opaque X:var>",
          "<opaque Y:var>",
          "<opaque DV:var>",
          "<opaque EV:var>",
        ],
      ),
      pin("K-using", "texts", page("{ using X = r; probe(X); }", "async function f() { await using Y = r; probe(Y); }"), ["<opaque X:using>", "<opaque Y:using>"]),
      pin("K-catch", "texts", page("try { f(); } catch (X) { probe(X); }"), ["<opaque X:catch>"]),
      pin(
        "K-no-initializer",
        "texts",
        page(
          "for (const X of list) probe(X);",
          "for (const K in o) probe(K);",
          "declare const Y: string;",
          "probe(Y);",
          "namespace NI { export const Z: string; probe(Z); }",
          "declare namespace DI { export const W: string; }",
          "namespace DI { probe(W); }",
        ),
        [
          "<opaque X:no-initializer>",
          "<opaque K:no-initializer>",
          "<opaque Y:no-initializer>",
          "<opaque Z:no-initializer>",
          "<opaque W:no-initializer>",
        ],
      ),
      pin(
        "K-ambient",
        "texts",
        page(
          "export {};",
          'declare const X = "a";',
          "probe(X);",
          'declare global { const G = "g"; }',
          "probe(G);",
          'declare namespace DA { namespace DB { export const Z = "z"; } }',
          "namespace DA.DB { probe(Z); }",
        ),
        ["<opaque X:ambient>", "<opaque G:ambient>", "<opaque Z:ambient>"],
      ),
      pin(
        "K-namespace",
        "texts",
        page('namespace N { export const X = "a"; probe(X); const L = "l"; probe(L); }', "namespace N { probe(X); }", "namespace M { export const m = 1; }", "probe(M);"),
        ["<opaque X:namespace>", '"l"', "<opaque X:namespace>", "<opaque M:namespace>"],
      ),
      pin(
        "K-parameter",
        "texts",
        page(
          "function f(X: string) { probe(X); }",
          "class C { constructor(public P: string) { probe(P); } }",
          'const g = (Q = "q") => probe(Q);',
          "function r(...R: string[]) { probe(R); }",
        ),
        [
          "<opaque X:parameter>",
          "<opaque P:parameter>",
          "<opaque Q:parameter>",
          "<opaque R:parameter>",
        ],
      ),
      pin(
        "K-function",
        "texts",
        page(
          "function F() {}",
          "probe(F);",
          "const g = function G() { probe(G); };",
          "async function AF() {}",
          "function* GF() {}",
          "declare function DF(): void;",
          "probe(AF); probe(GF); probe(DF);",
          "namespace NF { export function EF() {} probe(EF); }",
        ),
        [
          "<opaque F:function>",
          "<opaque G:function>",
          "<opaque AF:function>",
          "<opaque GF:function>",
          "<opaque DF:function>",
          "<opaque EF:function>",
        ],
      ),
      pin(
        "K-class",
        "texts",
        page(
          "class K {}",
          "probe(K);",
          "const c = class D { m() { probe(D); } };",
          "declare class DC {}",
          "probe(DC);",
          "namespace NC { export class EC {} probe(EC); }",
        ),
        [
          "<opaque K:class>",
          "<opaque D:class>",
          "<opaque DC:class>",
          "<opaque EC:class>",
        ],
      ),
      pin(
        "K-enum",
        "texts",
        page(
          'enum E { A = "a", B = probe(A) }',
          "probe(E);",
          "const enum CE { A }",
          "declare enum DE { A }",
          "probe(CE); probe(DE);",
          "namespace NE { export enum EE { A } probe(EE); }",
        ),
        [
          "<opaque A:enum>",
          "<opaque E:enum>",
          "<opaque CE:enum>",
          "<opaque DE:enum>",
          "<opaque EE:enum>",
        ],
      ),
      pin("K-other", "kind", page("type TA = string; (a synthetic type alias declaration)"), ["other"]),
      pin("G01", "texts", page("declare function probe(value: unknown): void;", 'declare namespace N { export const X = "a"; }', "namespace N { probe(X); }", "export {};"), ["<opaque X:ambient>"]),
      pin(
        "G08",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          "declare let X: string;",
          "declare var Y: string;",
          "probe(X);",
          "probe(Y);",
          "export {};",
        ),
        [
          "<opaque X:let>",
          "<opaque Y:var>",
        ],
      ),
      pin(
        "G09",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          'namespace N { export let X = "a"; probe(X); export var Y = "y"; probe(Y); }',
          "export {};",
        ),
        [
          "<opaque X:let>",
          "<opaque Y:var>",
        ],
      ),
      pin("M55", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export function f(): number | undefined {", "  try {", "    return 1;", "  } catch (e: unknown) {", "    probe(e);", "  }", "  return undefined;", "}"), ["<opaque e:catch>"], "src/workbench/providers/zz-gp1-t55.ts"),
      pin("P1", "texts", P1_PAGE, ["<opaque X:import>", "<opaque join:import>", '"y"'], "src/workbench/zz-gp1-p1.js"),
    ],
  },
  {
    id: "with",
    from: "claim",
    label: "BINDING (4) with",
    pins: [
      pin("W-SCRIPT", "texts", page('const X = "a";', "with (o) { probe(X); }", "with (probe(X)) {}", "probe(X);"), ["<opaque X:with>", '"a"', '"a"'], "src/workbench/zz-w-script.js"),
      pin("W-MODULE", "texts", page('const X = "a";', "with (o) { probe(X); }", "with (probe(X)) {}", "probe(X);"), ["<opaque X:with>", '"a"', '"a"']),
      pin("G02", "texts", page('const X = "a";', "with (o) { const read = () => probe(X); read(); }", "probe(X);"), ["<opaque X:with>", '"a"'], "src/workbench/zz-g02.js"),
      pin(
        "W-NESTED",
        "texts",
        page(
          'const X = "a";',
          'let L = "l";',
          "with (o) { function g() { probe(X); } }",
          "with (o) { const h = function () { probe(X); }; }",
          "with (o) { class K { m() { probe(X); } } }",
          "with (o) { const q = { m() { probe(X); } }; }",
          "with (o) probe(X);",
          "with (o) { with (p) { probe(X); } }",
          "with (o) { { { probe(X); } } }",
          "function w() { with (o) { probe(X); } }",
          'with (o) { probe(L); probe(MISSING); const Y = "y"; probe(Y); }',
          "probe(X);",
        ),
        [
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque X:with>",
          "<opaque L:with>",
          "<opaque MISSING:with>",
          "<opaque Y:with>",
          '"a"',
        ],
        "src/workbench/zz-w-nested.js",
      ),
    ],
  },
  {
    id: "eval",
    from: "claim",
    label: "BINDING (5) eval",
    pins: [
      pin("V-EVAL", "texts", page('const X = "a";', "probe(X);", 'export function f() { eval("1"); }'), ["<opaque X:eval>"]),
      pin("V-WRAPPED", "texts", page('const X = "a";', "probe(X);", '((<(code: string) => unknown>(eval satisfies unknown)) as (code: string) => unknown)!("1");'), ["<opaque X:eval>"]),
      pin("V-AWAIT", "texts", page('const X = "a";', "probe(X);", 'async function f() { (await eval)("1"); }'), ["<opaque X:eval>"]),
      pin("V-WITH", "texts", page('const X = "a";', "with (o) { probe(X); }", 'eval("1");'), ["<opaque X:eval>"], "src/workbench/zz-v-with.js"),
      pin("V-INDIRECT", "texts", page('const X = "a";', "probe(X);", 'globalThis.eval("1");', '(0, eval)("1");', "const e = eval;", 'e("1");', 'new eval("1");', "eval`1`;"), ['"a"']),
      pin("G03", "texts", page("declare function probe(value: unknown): void;", 'const X = "a";', "probe(X);", 'eval?.("1");', "export {};"), ["<opaque X:eval>"]),
      pin(
        "V-BARE",
        "texts",
        page(
          'import { I } from "./i.js";',
          'const X = "a";',
          'let L = "l";',
          "function g(p: string) { probe(p); }",
          "probe(X); probe(L); probe(I); probe(MISSING);",
          "class K { m() { eval(); } }",
        ),
        [
          "<opaque p:eval>",
          "<opaque X:eval>",
          "<opaque L:eval>",
          "<opaque I:eval>",
          "<opaque MISSING:eval>",
        ],
      ),
      pin("V-LOCAL", "texts", page('const X = "a";', "probe(X);", 'function f(eval) { eval("1"); }'), ["<opaque X:eval>"], "src/workbench/zz-v-local.js"),
      pin("M61", "texts", page("var o = {};", "const X = \"a\";", "probe(X);", "with (o) {", "  eval(\"1\");", "}", "function probe(value) { return value; }"), ["<opaque X:eval>"], "src/workbench/zz-gp1-t61.js"),
      pin("M62", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const X = \"a\";", "probe(X);", "export const o = { run(): unknown { return eval(\"1\"); } };"), ["<opaque X:eval>"], "src/workbench/providers/zz-gp1-t62.ts"),
      pin("M63", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const X = \"a\";", "probe(X);", "export const t = `" + sub('eval("1")') + "`;"), ["<opaque X:eval>"], "src/workbench/providers/zz-gp1-t63.ts"),
      pin("M64", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const X = \"a\";", "probe(X);", "export const run = (): unknown => eval(\"1\");"), ["<opaque X:eval>"], "src/workbench/providers/zz-gp1-t64.ts"),
      pin("M66", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const X = \"a\";", "probe(X);", "export const y: unknown = eval(\"1\");"), ["<opaque X:eval>"], "src/workbench/providers/zz-gp1-t66.ts"),
      pin("M72", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const X = \"a\";", "probe(X);", "export function f(v: unknown = eval(\"1\")): unknown {", "  return v;", "}"), ["<opaque X:eval>"], "src/workbench/providers/zz-gp1-t72.ts"),
      pin("M11", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "declare function evaluate(code: string): void;", "const X = \"a\";", "probe(X);", "evaluate(\"1\");", "export {};"), ['"a"'], "src/workbench/providers/zz-gp1-t11.ts"),
      pin(
        "V-NAMES",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          "declare function evaluate(code: string): void;",
          "declare function preval(code: string): void;",
          "declare function Eval(code: string): void;",
          "declare function EVAL(code: string): void;",
          "declare function ev(code: string): void;",
          "declare function evalx(code: string): void;",
          'const X = "a";',
          "probe(X);",
          'evaluate("1");',
          'preval("1");',
          'Eval("1");',
          'EVAL("1");',
          'ev("1");',
          'evalx("1");',
          "export {};",
        ),
        ['"a"'],
      ),
      pin("V-STATIC", "texts", evalAt('class K { static { eval("1"); } }'), ["<opaque X:eval>"]),
      pin("V-FIELD", "texts", evalAt('class K { f = eval("1"); }'), ["<opaque X:eval>"]),
      pin("V-GETTER", "texts", evalAt('export const o = { get g() { return eval("1"); } };'), ["<opaque X:eval>"]),
      pin("V-COMPUTED", "texts", evalAt('export const o = { [eval("1")]: 1 };'), ["<opaque X:eval>"]),
      pin("V-ENUM", "texts", evalAt('enum E { A = eval("1") }'), ["<opaque X:eval>"]),
      pin("V-RETURN", "texts", evalAt('function f() { return eval("1"); }'), ["<opaque X:eval>"]),
      pin("V-ARGUMENT", "texts", evalAt('probe(eval("1"));'), ["<opaque X:eval>", '<opaque eval("1")>']),
      pin("V-DECORATOR", "texts", evalAt("@eval class K {}"), ['"a"']),
    ],
  },
  {
    id: "cycle",
    from: "claim",
    label: "BINDING (6) cycle",
    pins: [
      pin("Y-PAIR", "texts", page("const A = B;", "const B = A;", "probe(A);"), ["<opaque A:cycle>"]),
      pin("Y-SELF", "texts", page('const C = C + "x";', "probe(C);", `const D = \`${sub("D")}!\`;`, "probe(D);"), ["<opaque C:cycle>", "<opaque D:cycle>"]),
      pin("G04", "texts", page("declare function probe(value: unknown): void;", "const A = B;", "const B = C;", "const C = B;", "probe(A);", "export {};"), ["<opaque B:cycle>"]),
      pin("Y-SHADOW", "texts", page('const N = "n";', "{ const M = N; { const N = M; probe(N); } }"), ['"n"']),
      pin("Y-BRANCH", "texts", page('const C = c ? C : "z";', "probe(C);"), ['<opaque C:cycle> | "z"']),
      pin(
        "Y-FORMS",
        "texts",
        page(
          'const N1 = N1 ?? "x"; probe(N1);',
          'const N2 = "x" ?? N2; probe(N2);',
          'const O1 = O1 || "x"; probe(O1);',
          'const O2 = "x" || O2; probe(O2);',
          'const A1 = A1 && "x"; probe(A1);',
          'const A2 = "x" && A2; probe(A2);',
          "const W1 = (W1); probe(W1);",
          "const W2 = W2 as string; probe(W2);",
          "const W3 = W3 satisfies string; probe(W3);",
          "const W4 = W4!; probe(W4);",
          "const W5 = <string>W5; probe(W5);",
          "const W6 = await W6; probe(W6);",
          `const T1 = \`${sub('"a"')}${sub("T1")}\`; probe(T1);`,
          'const P2 = "x" + P2; probe(P2);',
          'const B2 = c ? "x" : B2; probe(B2);',
          "export {};",
        ),
        [
          '<opaque N1:cycle> | "x"',
          '"x" | <opaque N2:cycle>',
          '<opaque O1:cycle> | "x"',
          '"x" | <opaque O2:cycle>',
          '<opaque A1:cycle> | "x"',
          '"x" | <opaque A2:cycle>',
          "<opaque W1:cycle>",
          "<opaque W2:cycle>",
          "<opaque W3:cycle>",
          "<opaque W4:cycle>",
          "<opaque W5:cycle>",
          "<opaque W6:cycle>",
          "<opaque T1:cycle>",
          "<opaque P2:cycle>",
          '"x" | <opaque B2:cycle>',
        ],
      ),
    ],
  },
  {
    id: "literal",
    from: "claim",
    label: "TEXT (1) literal",
    pins: [
      pin("X-LITERAL", "texts", page('probe("a");', "probe('b');", "probe(`c`);"), ['"a"', '"b"', '"c"']),
      pin("X-ESCAPES", "texts", page("probe(\"\\x41\");", "probe('\\x42');", "probe(`\\x43`);"), ['"A"', '"B"', '"C"']),
      pin(
        "X-ESCAPE-FORMS",
        "texts",
        page("probe(\"\\x41\\u0042\\u{43}\\n\\t\\\\\\\"\\'\\0\");", "probe(\"\\101\");", "probe(\"a\\", "b\");"),
        [JSON.stringify(`ABC\n\t\\"'${chars(0)}`), '"A"', '"ab"'],
      ),
    ],
  },
  { id: "identifier", from: "claim", label: "TEXT (2) identifier", pins: [pin("X-IDENTIFIER", "texts", page('const A = "a";', 'let B = "b";', "probe(A);", "probe(B);"), ['"a"', "<opaque B:let>"])] },
  {
    id: "template",
    from: "claim",
    label: "TEXT (3) template",
    pins: [
      pin("X-TEMPLATE", "texts", page('const H = "h";', `probe(\`${sub("H")}-${sub('c ? "x" : "y"')}!\`);`, `probe(\`${sub("H")}${sub("H")}\`);`), ['"h-x!" | "h-y!"', '"hh"']),
      pin(
        "X-TEMPLATE-PARTS",
        "texts",
        page(
          'const H = "h";',
          `probe(\`\\x43${sub("H")}\\x44\`);`,
          `probe(\`${sub('c ? "a" : "b"')}${sub('d ? "x" : "y"')}\`);`,
        ),
        [
          '"ChD"',
          '"ax" | "ay" | "bx" | "by"',
        ],
      ),
    ],
  },
  {
    id: "plus",
    from: "claim",
    label: "TEXT (4) plus",
    pins: [pin("X-PLUS", "texts", page('probe((c ? "a" : "b") + (d ? "x" : "y"));', 'const P = "p";', 'probe(P + "/" + P);'), ['"ax" | "ay" | "bx" | "by"', '"p/p"'])],
  },
  { id: "conditional", from: "claim", label: "TEXT (5) conditional", pins: [pin("X-CONDITIONAL", "texts", page('probe("z" ? "a" : "b");', 'probe(f() ? "a" : g());'), ['"a" | "b"', '"a" | <opaque g()>'])] },
  {
    id: "nullish",
    from: "claim",
    label: "TEXT (6) nullish",
    pins: [pin("X-NULLISH", "texts", page('function f(p: string) { probe(p ?? "b"); }', 'probe("a" ?? "b");'), ['<opaque p:parameter> | "b"', '"a" | "b"'])],
  },
  { id: "or", from: "claim", label: "TEXT (7) or", pins: [pin("X-OR", "texts", page('probe(f() || "b");', 'probe("a" || "b");'), ['<opaque f()> | "b"', '"a" | "b"'])] },
  { id: "and", from: "claim", label: "TEXT (8) and", pins: [pin("X-AND", "texts", page('probe(f() && "b");', 'probe("a" && "b");'), ['<opaque f()> | "b"', '"a" | "b"'])] },
  {
    id: "wrapper",
    from: "claim",
    label: "TEXT (9) wrapper",
    pins: [
      pin(
        "X-WRAPPER",
        "texts",
        page('const D = "d";', 'probe(("a"));', 'probe("b" as string);', 'probe("c" satisfies string);', "probe(D!);", 'probe(<string>"e");', 'async function f() { probe(await "f"); }'),
        ['"a"', '"b"', '"c"', '"d"', '"e"', '"f"'],
      ),
    ],
  },
  {
    id: "other",
    from: "claim",
    label: "TEXT (10) other",
    pins: [
      pin(
        "X-OTHER",
        "texts",
        page("probe(f(x));", "probe(o.p);", 'probe(o["p"]);', "probe(1);", "probe(String.raw`a`);", 'probe(X = "a");', "probe(f(", "  x,", "  y", "));"),
        ["<opaque f(x)>", "<opaque o.p>", '<opaque o["p"]>', "<opaque 1>", "<opaque String.raw`a`>", '<opaque X = "a">', "<opaque f( x, y )>"],
      ),
      pin(
        "X-OTHER-FORMS",
        "texts",
        page(
          'probe(("a", "b"));',
          'probe(X += "b");',
          'probe(X ||= "b");',
          'probe(X ??= "b");',
          'probe(X &&= "b");',
          'probe("a" - "b");',
          'probe("a" === "b");',
          'probe(void "a");',
          'probe(typeof "a");',
          'probe(!"a");',
          "probe(X++);",
          "probe(delete o.p);",
          "probe(I<string>);",
          "probe(o?.p);",
          'probe(o?.["p"]);',
          "probe(f?.());",
          "probe(new F());",
          "probe(null);",
          "probe(true);",
          "probe(false);",
          "probe(this);",
          "probe(1n);",
          "probe(/a/);",
          'probe(() => "a");',
          'probe({ a: "a" });',
          'probe(["a"]);',
        ),
        [
          '<opaque "a", "b">',
          '<opaque X += "b">',
          '<opaque X ||= "b">',
          '<opaque X ??= "b">',
          '<opaque X &&= "b">',
          '<opaque "a" - "b">',
          '<opaque "a" === "b">',
          '<opaque void "a">',
          '<opaque typeof "a">',
          '<opaque !"a">',
          "<opaque X++>",
          "<opaque delete o.p>",
          "<opaque I<string>>",
          "<opaque o?.p>",
          '<opaque o?.["p"]>',
          "<opaque f?.()>",
          "<opaque new F()>",
          "<opaque null>",
          "<opaque true>",
          "<opaque false>",
          "<opaque this>",
          "<opaque 1n>",
          "<opaque /a/>",
          '<opaque () => "a">',
          '<opaque { a: "a" }>',
          '<opaque ["a"]>',
        ],
      ),
      pin(
        "X-OPERATORS",
        "texts",
        page(...BINARY_OPERATORS.map((operator) => `probe(("a" ${operator} "b"));`), ...ASSIGNMENTS.map((operator) => `probe((X ${operator} "b"));`)),
        [...BINARY_OPERATORS.map((operator) => `<opaque "a" ${operator} "b">`), ...ASSIGNMENTS.map((operator) => `<opaque X ${operator} "b">`)],
      ),
      pin(
        "X-UNARY",
        "texts",
        page('probe(-"a");', 'probe(+"a");', 'probe(~"a");', 'probe(!"a");', "probe(++X);", "probe(--X);", "probe(X++);", "probe(X--);", 'probe(typeof "a");', 'probe(void "a");', "probe(delete o.p);"),
        ['<opaque -"a">', '<opaque +"a">', '<opaque ~"a">', '<opaque !"a">', "<opaque ++X>", "<opaque --X>", "<opaque X++>", "<opaque X-->", '<opaque typeof "a">', '<opaque void "a">', "<opaque delete o.p>"],
      ),
      pin(
        "X-KINDS",
        "texts",
        page(
          'probe(function () { return "a"; });',
          "probe(class {});",
          "probe(...a);",
          "probe(import.meta);",
          'function* g() { probe(yield "a"); }',
          "function h() { probe(new.target); }",
          "probe(f<string>);",
          "probe(o!.p);",
          "class S extends B { m() { probe(super.x); } }",
        ),
        ['<opaque function () { return "a"; }>', "<opaque class {}>", "<opaque ...a>", "<opaque import.meta>", '<opaque yield "a">', "<opaque new.target>", "<opaque f<string>>", "<opaque o!.p>", "<opaque super.x>"],
      ),
      pin("X-WHITESPACE", "texts", page(`probe(f(x,${WHITESPACE}y));`, `probe(f(x,${NOT_WHITESPACE}y));`), ["<opaque f(x, y)>", `<opaque f(x,${NOT_WHITESPACE}y)>`]),
    ],
  },
  {
    id: "opaque-part",
    from: "claim",
    label: "TEXT (11) opaque-part",
    pins: [
      pin(
        "X-OPAQUE-PART",
        "texts",
        page("function g(p: string) {", `  probe(\`${sub("p")}/bin\`);`, '  probe("a" + f() + p);', "  probe(p + f());", "}"),
        ["<opaque p:parameter>", "<opaque f()>", "<opaque p:parameter>"],
      ),
      pin(
        "G10",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          "export function g(p: string, c: boolean): void {",
          `  probe(\`${sub('c ? p : "x"')}/bin\`);`,
          '  probe((c ? p : "x") + "/bin");',
          "}",
        ),
        [
          '<opaque p:parameter> | "x/bin"',
          '<opaque p:parameter> | "x/bin"',
        ],
      ),
      pin("X-OPAQUE-MIXED", "texts", page("function g(p: string, c: boolean) {", '  probe((c ? "x" : p) + (c ? f() : "y"));', "}"), ['<opaque f()> | "xy" | <opaque p:parameter>']),
    ],
  },
  {
    id: "bounds",
    from: "claim",
    label: "TEXT (12) bounds",
    pins: [
      pin("X-BOUNDS", "texts", boundsPage(), boundsReading()),
      pin(
        "G05",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          'probe("a" + "b" + "c" + "d" + "e" + "f" + "g" + "h" + "i" + "j" + "k" + "l" + "m" + "n" + "o" + "p" + "q" + "r");',
          "export {};",
        ),
        [
          '<opaque "a":bound>',
        ],
      ),
      pin(
        "G06",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          "export function f(p0: string, p1: string, p2: string, p3: string, p4: string, p5: string, p6: string, p7: string, p8: string, p9: string, p10: string, p11: string, p12: string, p13: string, p14: string, p15: string, p16: string, p17: string): void {",
          "  probe(p0 || p1 || p2 || p3 || p4 || p5 || p6 || p7 || p8 || p9 || p10 || p11 || p12 || p13 || p14 || p15 || p16 || p17);",
          "  probe(p0 && p1 && p2 && p3 && p4 && p5 && p6 && p7 && p8 && p9 && p10 && p11 && p12 && p13 && p14 && p15 && p16 && p17);",
          "}",
        ),
        [
          "<opaque p0:bound> | <opaque p1:bound> | <opaque p2:parameter> | <opaque p3:parameter> | <opaque p4:parameter> | <opaque p5:parameter> | <opaque p6:parameter> | <opaque p7:parameter> | <opaque p8:parameter> | <opaque p9:parameter> | <opaque p10:parameter> | <opaque p11:parameter> | <opaque p12:parameter> | <opaque p13:parameter> | <opaque p14:parameter> | <opaque p15:parameter> | <opaque p16:parameter> | <opaque p17:parameter>",
          "<opaque p0:bound> | <opaque p1:bound> | <opaque p2:parameter> | <opaque p3:parameter> | <opaque p4:parameter> | <opaque p5:parameter> | <opaque p6:parameter> | <opaque p7:parameter> | <opaque p8:parameter> | <opaque p9:parameter> | <opaque p10:parameter> | <opaque p11:parameter> | <opaque p12:parameter> | <opaque p13:parameter> | <opaque p14:parameter> | <opaque p15:parameter> | <opaque p16:parameter> | <opaque p17:parameter>",
        ],
      ),
      pin(
        "G07",
        "texts",
        page(
          "declare function probe(value: unknown): void;",
          'probe("a" as string as string as string as string as string as string as string as string as string as string as string as string as string as string as string as string as string);',
          "export {};",
        ),
        [
          '<opaque "a":bound>',
        ],
      ),
      pin(
        "X-BOUNDS-JOINS",
        "texts",
        page(
          'const A5 = c ? "" : c ? "a" : c ? "aa" : c ? "aaa" : "aaaa";',
          'const B13 = c ? "" : c ? "a" : c ? "aa" : c ? "aaa" : c ? "aaaa" : c ? "aaaaa" : c ? "aaaaaa" : c ? "aaaaaaa" : c ? "aaaaaaaa" : c ? "aaaaaaaaa" : c ? "aaaaaaaaaa" : c ? "aaaaaaaaaaa" : "aaaaaaaaaaaa";',
          "probe(A5 + B13);",
          `probe(\`${sub("A5")}${sub("B13")}\`);`,
          'const A8 = c ? "0" : c ? "1" : c ? "2" : c ? "3" : c ? "4" : c ? "5" : c ? "6" : "7";',
          'const B8 = c ? "a" : c ? "b" : c ? "c" : c ? "d" : c ? "e" : c ? "f" : c ? "g" : "h";',
          "probe(A8 + B8);",
          `probe(\`${sub("A8")}${sub("B8")}\`);`,
        ),
        [
          "<opaque A5 + B13:bound>",
          `<opaque \`${sub("A5")}${sub("B13")}\`:bound>`,
          eightByEight(),
          eightByEight(),
        ],
      ),
      pin(
        "X-BOUNDS-WRAPPERS",
        "texts",
        levelsPage("probe((@));", "probe(@ as string);", "probe(@ satisfies string);", "probe(@!);", "probe(<string>@);", "void (async () => probe(await @))();"),
        [
          '"i"',
          '"i"',
          '"i"',
          '<opaque "i":bound>',
          '"i"',
          '<opaque "i":bound>',
          '"i"',
          '<opaque "i":bound>',
          '"i"',
          '<opaque "i":bound>',
          '"i"',
          '<opaque "i":bound>',
          '"i"',
          '<opaque "i":bound>',
        ],
      ),
      pin(
        "X-BOUNDS-SIDES",
        "texts",
        levelsPage('probe(@ + "x");', 'probe("x" + @);', 'probe(@ ?? "x");', 'probe("x" ?? @);', 'probe(@ || "x");', 'probe("x" || @);', 'probe(@ && "x");', 'probe("x" && @);'),
        [
          '"i"',
          '"i"',
          '"ix"',
          '<opaque "i":bound>',
          '"xi"',
          '<opaque "i":bound>',
          '"i" | "x"',
          '<opaque "i":bound> | "x"',
          '"x" | "i"',
          '"x" | <opaque "i":bound>',
          '"i" | "x"',
          '<opaque "i":bound> | "x"',
          '"x" | "i"',
          '"x" | <opaque "i":bound>',
          '"i" | "x"',
          '<opaque "i":bound> | "x"',
          '"x" | "i"',
          '"x" | <opaque "i":bound>',
        ],
      ),
      pin("X-BOUNDS-BRANCHES", "texts", levelsPage('probe(c ? @ : "x");', 'probe(c ? "x" : @);'), ['"i"', '"i"', '"i" | "x"', '<opaque "i":bound> | "x"', '"x" | "i"', '"x" | <opaque "i":bound>']),
      pin(
        "X-BOUNDS-SUBSTITUTIONS",
        "texts",
        levelsPage(`probe(\`<${sub("@")}>\`);`, `probe(\`<${sub('"x"')}-${sub("@")}>\`);`),
        [
          '"i"',
          '"i"',
          '"<i>"',
          '<opaque "i":bound>',
          '"<x-i>"',
          '<opaque "i":bound>',
        ],
      ),
    ],
  },
  {
    id: "order",
    from: "claim",
    label: "TEXT (13) order",
    pins: [
      pin(
        "X-ORDER",
        "texts",
        page('probe(c ? "b" : "a");', 'probe(c ? "a" : "a");', 'probe((c ? "b" : "a") + (d ? "y" : "x"));', 'probe(p() ?? "b" ?? p());'),
        ['"b" | "a"', '"a"', '"by" | "bx" | "ay" | "ax"', '<opaque p()> | "b"'],
      ),
      pin("M06", "texts", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "declare function f(): string;", "probe(c ? \"f()\" : f());", "export {};"), ['"f()" | <opaque f()>'], "src/workbench/providers/zz-gp1-t06.ts"),
      pin(
        "X-ONCE",
        "texts",
        page('probe((c ? "a" : "ab") + (d ? "bc" : "c"));', `probe(\`${sub('c ? "a" : "ab"')}${sub('d ? "bc" : "c"')}\`);`, 'probe(c ? f() : "f()");', 'probe(f() ?? "f()");'),
        ['"abc" | "ac" | "abbc"', '"abc" | "ac" | "abbc"', '<opaque f()> | "f()"', '<opaque f()> | "f()"'],
      ),
    ],
  },
  {
    id: "texts",
    from: "claim",
    label: "READINGS (1) texts",
    pins: [pin("XT-TEXTS", "exact", page('probe(c ? "a" : "b");', 'function g(p: string) { probe(p ?? "b"); }', 'probe("only");'), ['["a","b"]', '"unresolved"', '["only"]'])],
  },
  {
    id: "words",
    from: "claim",
    label: "READINGS (2) words",
    pins: [
      pin(
        "XW-WORDS",
        "words",
        page(
          "probe(\"/usr/bin/rf.EXE context;render|tee(log) > out < in & bg 'q' \\\"d\\\" `b`\");",
          'probe("C:\\\\tools\\\\rf.cmd x");',
          'probe(c ? "rf x" : "rf y");',
          'function g(p: string) { probe(p ?? "rf"); }',
        ),
        ["rf context render tee log out in bg q d b", "rf x", "rf x y", "unresolved"],
      ),
      pin("XW-FORMS", "words", page("probe(\"rf\\tcontext\\nrender\");", "probe(\"bin/rf ./x C:\\\\t\\\\rf.CMD y.Exe z.exe.bak\");"), ["rf context render", "rf x y z.exe.bak"]),
      pin("M59", "words", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "probe(\"rf con'text\");", "export {};"), ["rf con text"], "src/workbench/providers/zz-gp1-t59.ts"),
      pin("M68", "words", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "probe(\"rf --workspace=root\");", "export {};"), ["rf --workspace=root"], "src/workbench/providers/zz-gp1-t68.ts"),
      pin("M69", "words", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "probe(\"rf a,b\");", "export {};"), ["rf a,b"], "src/workbench/providers/zz-gp1-t69.ts"),
      pin("M34", "words", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "probe(\"rf .EXE x\");", "export {};"), ["rf  x"], "src/workbench/providers/zz-gp1-t34.ts"),
      pin("P2", "words", P2_PAGE, ["rf "], "src/workbench/providers/zz-gp1-p2.ts"),
      pin("XW-WHITESPACE", "words", page(`probe("rf${WHITESPACE_ESCAPES}x");`, 'probe("rf\\u0085x\\u200by");'), ["rf x", `rf${chars(0x85)}x${chars(0x200b)}y`]),
      pin("XW-PUNCTUATION", "words", page(`probe("rf ${NON_SEPARATORS}");`), [`rf ${NON_SEPARATORS}`]),
      pin("XW-QUOTES", "words", page("probe(\"rf a\\\"b c`d e'f\");"), ["rf a b c d e f"]),
      pin("XW-CUTS", "words", page('probe("rf a/b c\\\\d e/ f\\\\ .EXE x/.cmd");'), ["rf b d "]),
    ],
  },
  {
    id: "program",
    from: "claim",
    label: "READINGS (3) program",
    pins: [
      pin("E1", "programs", headPage('process.env.PI_VCS ?? "git"', E_ARGV), ['execFileSync:<opaque process.env.PI_VCS ?? "git">'], "src/index.ts"),
      pin("E2", "programs", headPage("VCS_PROGRAM", E_ARGV, ['const VCS_PROGRAM = "git";'], ['  const VCS_PROGRAM = String(process.env.PI_VCS ?? "git");']), ["execFileSync:<opaque VCS_PROGRAM>"], "src/index.ts"),
      pin(
        "E3",
        "programs",
        page(
          headPage('"git"', GIT_ARGV).trimEnd(),
          "export function commitRender(root: string): string {",
          '  return execFileSync(process.env.PI_VCS ?? "git", ["--workspace", root, "context", "render", "--json"], { encoding: "utf8" });',
          "}",
        ),
        ["execFileSync:git", 'execFileSync:<opaque process.env.PI_VCS ?? "git">'],
        "src/index.ts",
      ),
      pin(
        "XP-FORMS",
        "programs",
        page(
          'spawn(c ? "rf" : "git", []);',
          'spawn(c ? "git a" : "git b", []);',
          'execFile("/usr/local/bin/rf", []);',
          'exec("rf context render");',
          'execSync("", []);',
          'spawnSync("   ", []);',
          "fork(f(), []);",
          'const RF = "rf";',
          "spawn(RF, []);",
          "function g(p: string) { execFileSync(p, []); }",
        ),
        ["spawn:git|rf", "spawn:git", "execFile:rf", "exec:rf", 'execSync:<opaque "">', 'spawnSync:<opaque " ">', "fork:<opaque f()>", "spawn:rf", "execFileSync:<opaque p>"],
      ),
      pin("P2-PROGRAM", "programs", P2_PAGE, ["spawn:"], "src/workbench/providers/zz-gp1-p2.ts"),
      pin("XP-CUTS", "programs", page('spawn("a=b,c", []);', 'spawn(".EXE", []);', 'spawn("/usr/bin/rf/", []);', 'spawn("x/.cmd y", []);'), ["spawn:a=b,c", "spawn:", "spawn:", "spawn:"]),
    ],
  },
  {
    id: "properties",
    from: "claim",
    label: "READINGS (4) properties",
    pins: [
      pin(
        "XF-KEYS",
        "registrations",
        page('export const a = { "id": "reactivefiber.a", ["effectClass"]: "read" };', 'export const b = { id: "reactivefiber.b", 1: "x", effectClass: "write" };'),
        ["reactivefiber.a:read", "reactivefiber.b:write"],
      ),
      pin("XF-SHORTHAND", "registrations", page('const id = "reactivefiber.c";', 'const effectClass = "read";', "export const c = { id, effectClass };"), ["reactivefiber.c:read"]),
      pin(
        "XF-SPREAD",
        "registrations",
        page(
          'const BASE = { effectClass: "write" };',
          'export const d = { id: "reactivefiber.d", ...BASE };',
          'const FULL = { id: "reactivefiber.e", effectClass: "read" };',
          'export const e = { ...FULL, effectClass: "write" };',
        ),
        ["reactivefiber.d:write", "reactivefiber.e:read", "reactivefiber.e:write"],
      ),
      pin(
        "XF-SPREAD-OPAQUE",
        "registrations",
        page(
          'let LOOSE = { effectClass: "write" };',
          'export const f = { id: "reactivefiber.f", effectClass: "read", ...LOOSE };',
          'const MIXED = { effectClass: "write", ...g() };',
          'export const h = { id: "reactivefiber.h", ...MIXED };',
          'export const i = { id: "reactivefiber.i", ...(c ? A : B) };',
        ),
        ["<opaque ...(c ? A : B)>:<opaque ...(c ? A : B)>", "<opaque ...LOOSE>:<opaque ...LOOSE>", "<opaque ...MIXED>:<opaque ...MIXED>"],
      ),
      pin(
        "XF-MEMBERS",
        "registrations",
        page(
          'export const j = { id: "reactivefiber.j", effectClass: "read", [k]: "x" };',
          'export const l = { id: "reactivefiber.l", get effectClass() { return "read"; } };',
          'export const m = { id: "reactivefiber.m", effectClass() { return "w"; } };',
          'export const n = { id: "reactivefiber.n", set effectClass(v: string) {} };',
          'export const o = { id: "reactivefiber.o", [k]() {} };',
        ),
        ["<opaque [k]()>:<opaque [k]()>", "<opaque [k]>:<opaque [k]>", "reactivefiber.l:<opaque get effectClass>", "reactivefiber.m:<opaque effectClass()>", "reactivefiber.n:<opaque set effectClass>"],
      ),
      pin(
        "XF-ORDER",
        "registrations",
        page('export const p = { effectClass: "write", id: "reactivefiber.p", ...g(), effectClass: "read" };', 'export const r = { id: "reactivefiber.r", effectClass: "read", effectClass: "write" };'),
        ["<opaque ...g()>:read", "reactivefiber.r:write"],
      ),
      pin("XF-DEPTH", "registrations", spreadDepthPage(), ["<opaque ...B8>:<opaque ...B8>", "reactivefiber.s:write"]),
      pin(
        "XF-WRAPPED",
        "registrations",
        page(
          'export const k1 = { id: "reactivefiber.k1", [("effectClass")]: "read" };',
          'export const k2 = { id: "reactivefiber.k2", ["effectClass" as string]: "read" };',
          'export const k3 = { id: "reactivefiber.k3", ["effectClass" satisfies string]: "read" };',
          'export const k4 = { id: "reactivefiber.k4", ["effectClass"!]: "read" };',
          'export const k5 = { id: "reactivefiber.k5", [<string>"effectClass"]: "read" };',
          'export async function k6() { return { id: "reactivefiber.k6", [await "effectClass"]: "read" }; }',
          'export const k7 = { id: "reactivefiber.k7", [`effectClass`]: "read" };',
          'const BASE = { effectClass: "write" };',
          'export const s1 = { id: "reactivefiber.s1", ...(BASE) };',
          'export const s2 = { id: "reactivefiber.s2", ...(BASE as typeof BASE) };',
          'export const s3 = { id: "reactivefiber.s3", ...(BASE satisfies object) };',
          'export const s4 = { id: "reactivefiber.s4", ...BASE! };',
          'export const s5 = { id: "reactivefiber.s5", ...<typeof BASE>BASE };',
          'export async function s6() { return { id: "reactivefiber.s6", ...(await BASE) }; }',
          'const W1 = ({ effectClass: "write" });',
          'const W2 = { effectClass: "write" } as const;',
          'const W3 = { effectClass: "write" } satisfies object;',
          'const W4 = { effectClass: "write" }!;',
          'const W5 = <object>{ effectClass: "write" };',
          'const W6 = await { effectClass: "write" };',
          'export const i1 = { id: "reactivefiber.i1", ...W1 };',
          'export const i2 = { id: "reactivefiber.i2", ...W2 };',
          'export const i3 = { id: "reactivefiber.i3", ...W3 };',
          'export const i4 = { id: "reactivefiber.i4", ...W4 };',
          'export const i5 = { id: "reactivefiber.i5", ...W5 };',
          'export const i6 = { id: "reactivefiber.i6", ...W6 };',
        ),
        [
          "reactivefiber.i1:write",
          "reactivefiber.i2:write",
          "reactivefiber.i3:write",
          "reactivefiber.i4:write",
          "reactivefiber.i5:write",
          "reactivefiber.i6:write",
          "reactivefiber.k1:read",
          "reactivefiber.k2:read",
          "reactivefiber.k3:read",
          "reactivefiber.k4:read",
          "reactivefiber.k5:read",
          "reactivefiber.k6:read",
          "reactivefiber.k7:read",
          "reactivefiber.s1:write",
          "reactivefiber.s2:write",
          "reactivefiber.s3:write",
          "reactivefiber.s4:write",
          "reactivefiber.s5:write",
          "reactivefiber.s6:write",
        ],
      ),
      pin(
        "XF-OPAQUE-MEMBERS",
        "registrations",
        page(
          'const GET = { get effectClass() { return "w"; } };',
          'export const g = { id: "reactivefiber.g", ...GET };',
          "const SET = { set effectClass(v: string) {} };",
          'export const h = { id: "reactivefiber.h", ...SET };',
          'const METHOD = { effectClass() { return "w"; } };',
          'export const m = { id: "reactivefiber.m", ...METHOD };',
          'export const n = { id: "reactivefiber.n", effectClass: "read", [1]: "x" };',
        ),
        [
          "<opaque ...GET>:<opaque ...GET>",
          "<opaque ...METHOD>:<opaque ...METHOD>",
          "<opaque ...SET>:<opaque ...SET>",
          "<opaque [1]>:<opaque [1]>",
        ],
      ),
      pin(
        "XF-ACCESSOR-KEYS",
        "registrations",
        page(
          'export const p1 = { id: "reactivefiber.p1", "effectClass"() { return "w"; } };',
          'export const p2 = { id: "reactivefiber.p2", get ["effectClass"]() { return "w"; } };',
          'export const p3 = { id: "reactivefiber.p3", set [("effectClass")](v: string) {} };',
          'export const p4 = { id: "reactivefiber.p4", get [`effectClass`]() { return "w"; } };',
        ),
        ["reactivefiber.p1:<opaque effectClass()>", "reactivefiber.p2:<opaque get effectClass>", "reactivefiber.p3:<opaque set effectClass>", "reactivefiber.p4:<opaque get effectClass>"],
      ),
      pin("M19", "registrations", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "const B: { effectClass?: string } = { effectClass: \"read\" };", "export function reg(other: object) {", "  return { effectClass: \"write\", ...other, ...B, id: \"reactivefiber.r\" };", "}"), ["reactivefiber.r:read"], "src/workbench/providers/zz-gp1-t19.ts"),
      pin("M26", "registrations", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export function reg(a: object, b: object) {", "  return { ...a, ...b, id: \"reactivefiber.r\" };", "}"), ["reactivefiber.r:<opaque ...b>"], "src/workbench/providers/zz-gp1-t26.ts"),
      pin("XF-OVERRIDES", "registration", OVERRIDES, OVERRIDES_READING),
    ],
  },
  {
    id: "registration",
    from: "claim",
    label: "READINGS (5) registration",
    pins: [
      pin("R-ALT1", "registrations", aliasPage('process.env.PI_FORGE_ONLY === "1" ? "forge.render.commit" : "reactivefiber.render.commit"'), ["reactivefiber.render.commit:write"], "src/workbench/providers/zz-gp1-alias.ts"),
      pin(
        "R-ALT2",
        "registrations",
        aliasPage('process.env.PI_RF_COMMIT_ID ?? "reactivefiber.render.commit"'),
        ["<opaque process.env.PI_RF_COMMIT_ID>:write", "reactivefiber.render.commit:write"],
        "src/workbench/providers/zz-gp1-alias.ts",
      ),
      pin("R-ALT3", "registrations", aliasPage('process.env.PI_FORGE_ONLY === "1" ? "reactivefiber.render.commit" : "forge.render.commit"'), ["reactivefiber.render.commit:write"], "src/workbench/providers/zz-gp1-alias.ts"),
      pin(
        "R-ALT4",
        "registrations",
        aliasPage("process.env.PI_RF_COMMIT_ID || COMMIT_ID", ['const COMMIT_ID = "reactivefiber.render.commit";']),
        ["<opaque process.env.PI_RF_COMMIT_ID>:write", "reactivefiber.render.commit:write"],
        "src/workbench/providers/zz-gp1-alias.ts",
      ),
      pin(
        "XR-FORMS",
        "registrations",
        page(
          'export const a = { id: "forge.render.commit", effectClass: "write" };',
          'export function b(p: string) { return { id: p, effectClass: "write" }; }',
          'export const c = { reactivefiber: "reactivefiber.render.preview" };',
          'export const d = { id: "reactivefiber.d" };',
          'export const e = { id: "reactivefiber.e", effectClass: c1 ? "write" : "read" };',
          'export function f(p: string) { return { id: "reactivefiber.f", effectClass: p ?? "read" }; }',
          'export const g = { id: c1 ? "reactivefiber.g2" : "reactivefiber.g1", effectClass: "read" };',
          'export const h = { id: "reactivefiber.h", effectClass: c1 ? "read" : "read" };',
        ),
        ["reactivefiber.d:<none>", "reactivefiber.e:read|write", "reactivefiber.f:<opaque p:parameter>|read", "reactivefiber.g1:read", "reactivefiber.g2:read", "reactivefiber.h:read"],
      ),
      pin("M12", "registrations", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export function reg(p: string) {", "  return { id: c ? \"forge.reactivefiber.commit\" : p, effectClass: \"write\" };", "}"), [], "src/workbench/providers/zz-gp1-t12.ts"),
      pin("M13", "registrations", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export const r = { id: c ? \"reactivefiber.a\" : \"reactivefiberx.b\", effectClass: \"read\" };"), ["reactivefiber.a:read"], "src/workbench/providers/zz-gp1-t13.ts"),
      pin("M14", "registrations", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export function reg(p: string) {", "  return { id: c ? \"reactivefiberx.b\" : p, effectClass: \"read\" };", "}"), [], "src/workbench/providers/zz-gp1-t14.ts"),
      pin("M15", "registration", page("declare function probe(value: unknown): void;", "declare const c: boolean;", "export const r = { id: c ? \"reactivefiber.b\" : \"reactivefiber.a\", effectClass: \"read\" };"), ["reactivefiber.a:read, reactivefiber.b:read"], "src/workbench/providers/zz-gp1-t15.ts"),
      pin(
        "XR-PREFIXES",
        "registrations",
        page(
          'export const a = { id: "reactivefiber", effectClass: "read" };',
          'export const b = { id: "reactivefiberx.b", effectClass: "read" };',
          'export const c = { id: "forge.reactivefiber.c", effectClass: "read" };',
          'export const d = { id: "ReactiveFiber.d", effectClass: "read" };',
          'export const e = { id: " reactivefiber.e", effectClass: "read" };',
          'export const f = { id: "reactivefiber.", effectClass: "read" };',
          'export function g(p: string) { return { id: c1 ? "reactivefiberx.g" : p, effectClass: "read" }; }',
          'export function h(p: string) { return { id: c1 ? "forge.reactivefiber.h" : p, effectClass: "read" }; }',
          'export function k(p: string) { return { id: c1 ? "ReactiveFiber.k" : p, effectClass: "read" }; }',
          'export function l(p: string) { return { id: c1 ? " reactivefiber.l" : p, effectClass: "read" }; }',
          'export function n(p: string) { return { id: c1 ? "reactivefiber" : p, effectClass: "read" }; }',
          'export const i = { id: c1 ? "reactivefiber.i" : "reactivefiberx.i", effectClass: "read" };',
          'export const j = { id: c1 ? "reactivefiber.j" : "reactivefiber", effectClass: "read" };',
        ),
        ["reactivefiber.:read", "reactivefiber.i:read", "reactivefiber.j:read"],
      ),
    ],
  },
  {
    id: "eval-position",
    from: "claim",
    label: "NOT CLAIMED (1) eval-position",
    pins: [pin("Q-EVAL-POSITION", "texts", evalAt('switch (eval("1")) { default: }'), ["<opaque X:eval>"])],
  },
  {
    id: "alias-form",
    from: "claim",
    label: "NOT CLAIMED (2) alias-form",
    pins: [pin("Q-ALIAS-FORM", "texts", page('const Y = (0, require)("node:fs");', "probe(Y);", "function probe(value) { return value; }"), ['<opaque (0, require)("node:fs")>'], "src/workbench/zz-q-alias-form.js")],
  },
  {
    id: "path-form",
    from: "claim",
    label: "NOT CLAIMED (3) path-form",
    pins: [pin("Q-PATH-FORM", "texts", P1_PAGE, ["<opaque X:import>", "<opaque join:import>", '"y"'], "src/workbench/zz-q-path-form.Mjs")],
  },
  {
    id: "expression-form",
    from: "claim",
    label: "NOT CLAIMED (4) expression-form",
    pins: [pin("Q-EXPRESSION-FORM", "texts", page("probe(<div />);", "probe(<>a</>);"), ["<opaque <div />>", "<opaque <>a</>>"], "src/workbench/zz-q-expression-form.tsx")],
  },
  {
    id: "character-form",
    from: "claim",
    label: "NOT CLAIMED (5) character-form",
    pins: [pin("Q-CHARACTER-FORM", "words", page('probe("rf caf\\u00e9 x");'), [`rf caf${chars(0xe9)} x`])],
  },
];

/* ------------------------------------------------------------------ readers of this census's own anchors */

/** This file's leading block comment, one entry per line, each without its ` * ` prefix. */
function headerLines(): string[] {
  const text = readFileSync(SELF, "utf8");
  const end = text.indexOf("\n */\n");
  expect(text.startsWith("/**\n") && end > 0, "this file opens with its header").toBe(true);
  return text
    .slice(4, end)
    .split("\n")
    .map((line) => line.replace(/^ \* ?/, "").replace(/^ \*$/, ""));
}
/** The header's claim paragraph, unwrapped: from its `BINDING: ` line to the next empty line, joined by single spaces. */
function headerClaim(): string {
  const lines = headerLines();
  const start = lines.findIndex((line) => line.startsWith("BINDING: "));
  expect(start, "the header holds a claim paragraph").toBeGreaterThan(0);
  const end = lines.indexOf("", start);
  return lines.slice(start, end).join(" ");
}
/** The tracker export's row for this bead. */
function exportRow(): { readonly title: string; readonly description: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown };
    if (row.id === BEAD && typeof row.title === "string" && typeof row.description === "string") return { title: row.title, description: row.description };
  }
  throw new Error(`${EXPORT} holds no ${BEAD} row`);
}
/** The export's requirement lines: its title, each `- ` item of its description and its Acceptance line, in order. */
function exportRequirements(): string[] {
  const row = exportRow();
  const lines = row.description.split("\n");
  return [row.title, ...lines.filter((line) => line.startsWith("- ")).map((line) => line.slice(2)), ...lines.filter((line) => line.startsWith("Acceptance: "))];
}
/** The falsifier roster's rows as `row:pin@digest,...`, in order; each pin there names its page's digest and the claim words it falsifies. */
function rosterRows(): string[] {
  const roster = JSON.parse(readFileSync(join(REPO, ROSTER), "utf8")) as { bead?: unknown; rows?: unknown };
  expect(roster.bead, `${ROSTER} is this bead's roster`).toBe(BEAD);
  const rows = Array.isArray(roster.rows) ? (roster.rows as Array<{ row?: unknown; pins?: unknown }>) : [];
  return rows.map((row) => {
    const pins = Array.isArray(row.pins) ? (row.pins as Array<{ pin?: unknown; page?: unknown; falsifies?: unknown }>) : [];
    expect(
      pins.every((held) => typeof held.pin === "string" && typeof held.falsifies === "string" && held.falsifies.length > 0),
      `${ROSTER} row ${String(row.row)}: every pin names what it falsifies`,
    ).toBe(true);
    expect(
      pins.every((held) => typeof held.page === "string" && /^[0-9a-f]{16}$/.test(held.page)),
      `${ROSTER} row ${String(row.row)}: every pin carries its page's digest`,
    ).toBe(true);
    return `${String(row.row)}:${pins.map((held) => `${String(held.pin)}@${String(held.page)}`).join(",")}`;
  });
}
/** The claim's parts as the rows label them: `SECTION (n) id`, in claim order. */
function claimLabels(): string[] {
  const section = (name: string, parts: readonly ClaimPart<string>[]): string[] => parts.map((part, index) => `${name} (${index + 1}) ${part.id}`);
  return [...section("BINDING", BINDING_FORMS), ...section("TEXT", TEXT_FORMS), ...section("READINGS", READING_FORMS), ...section("NOT CLAIMED", RESIDUAL_FORMS)];
}
/** The kinds the claim's kinds part names, in order: the word each `; `-separated entry after its colon opens with. */
function claimKinds(): string[] {
  const part = BINDING_FORMS.find((form) => form.id === "kinds");
  expect(part, "the claim has a kinds part").toBeDefined();
  const text = part?.text ?? "";
  const list = text.slice(text.indexOf("names the binding: ") + "names the binding: ".length);
  return list.split("; ").map((entry) => entry.split(" ")[0] ?? "");
}

/* ------------------------------------------------------------------ the probes */

function visit(node: ts.Node, visitor: (node: ts.Node) => void): void {
  visitor(node);
  ts.forEachChild(node, (child) => visit(child, visitor));
}
function callsIn(reader: BindingTextReader, matches: (call: ts.CallExpression) => string | undefined): Array<{ readonly name: string; readonly argument: ts.Expression }> {
  const found: Array<{ readonly name: string; readonly argument: ts.Expression }> = [];
  visit(reader.source, (node) => {
    if (!ts.isCallExpression(node)) return;
    const name = matches(node);
    const argument = node.arguments[0];
    if (name !== undefined && argument !== undefined) found.push({ name, argument });
  });
  return found;
}
function calleeName(call: ts.CallExpression): string | undefined {
  return ts.isIdentifier(call.expression) ? call.expression.text : undefined;
}
function probed(reader: BindingTextReader): ts.Expression[] {
  return callsIn(reader, (call) => (calleeName(call) === "probe" ? "probe" : undefined)).map(({ argument }) => argument);
}
function reading(row: Row, at: Pin): readonly string[] {
  if (at.probe === "claim-header") return [headerClaim()];
  if (at.probe === "claim-rows") return ROWS.filter((each) => each.from === "claim").map((each) => each.label);
  if (at.probe === "export-rows") return [STATEMENT, ...ROWS.filter((each) => each.from === "export").map((each) => each.label)];
  if (at.probe === "member-pins") return MEMBERS.map((member) => `${member.id}:${ROWS.find((each) => each.pins.some((held) => held.id === member.id))?.id ?? "no row"}`);
  if (at.probe === "kind-pins") return (ROWS.find((each) => each.id === "kinds")?.pins ?? []).map((held) => held.id);
  if (at.probe === "falsifier-roster") return ROWS.map((each) => `${each.id}:${each.pins.map((held) => `${held.id}@${digest(held.page)}`).join(",")}`);
  if (at.probe === "kind") return [bindingKindOf(ts.factory.createTypeAliasDeclaration(undefined, "TA", undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)))];
  if (at.probe === "paths")
    return (at.paths ?? []).map((path) => {
      const read = bindingTextReader(path, at.page);
      return `${path}: ${probed(read)
        .map((argument) => rendered(read.alternatives(argument)))
        .join(" ; ")}`;
    });
  const reader = bindingTextReader(at.path, at.page);
  if (at.probe === "registrations") return reader.registrations();
  if (at.probe === "registration") {
    const entries: string[] = [];
    visit(reader.source, (node) => {
      const read = ts.isObjectLiteralExpression(node) ? reader.registration(node) : undefined;
      if (read !== undefined) entries.push(read.join(", "));
    });
    return entries;
  }
  if (at.probe === "programs") return callsIn(reader, (call) => (LAUNCHERS.has(calleeName(call) ?? "") ? calleeName(call) : undefined)).map(({ name, argument }) => `${name}:${reader.program(argument)}`);
  if (at.probe === "loads")
    return callsIn(reader, (call) => (call.expression.kind === ts.SyntaxKind.ImportKeyword ? "import()" : ["load", "require"].includes(calleeName(call) ?? "") ? calleeName(call) : undefined)).map(
      ({ name, argument }) => `${name}:${rendered(reader.alternatives(argument))}`,
    );
  const probes = probed(reader);
  if (at.probe === "exact") return probes.map((argument) => JSON.stringify(reader.exact(argument) ?? "unresolved"));
  if (at.probe === "words") return probes.map((argument) => reader.words(argument)?.join(" ") ?? "unresolved");
  expect(at.probe, `row ${row.id} pin ${at.id} has a probe this census reads`).toBe("texts");
  return probes.map((argument) => rendered(reader.alternatives(argument)));
}
function expected(at: Pin): readonly string[] {
  if (at.probe === "claim-header") return [BINDING_TEXT_CLAIM];
  if (at.probe === "claim-rows") return claimLabels();
  if (at.probe === "export-rows") return exportRequirements();
  if (at.probe === "member-pins") return MEMBERS.map((member) => `${member.id}:${member.form}`);
  if (at.probe === "kind-pins") return [...claimKinds().map((kind) => `K-${kind}`), ...MEMBERS.filter((member) => member.form === "kinds").map((member) => member.id)];
  if (at.probe === "falsifier-roster") return rosterRows();
  return at.expect;
}

/* ------------------------------------------------------------------ the census */

describe("wb-jwc.10 binding text reader census (test/helpers/binding-text-reader.ts)", () => {
  for (const row of ROWS)
    describe(`${row.id}: ${row.label}`, () => {
      for (const at of row.pins)
        it(`${at.id} reads as its claim states`, () => {
          expect(reading(row, at), `${row.id} ${at.id}`).toEqual(expected(at));
        });
    });

  it("FROZEN SHAPE: the rows and their pins, and each pin's page, are the frozen set (standing rule 16)", () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toEqual([
      "S1:4", "S2:3", "S3:3", "PREMISE:3", "ACCEPTANCE:6", "scope:6", "const:3", "kinds:21",
      "with:4", "eval:24", "cycle:6", "literal:3", "identifier:1", "template:2", "plus:1", "conditional:1",
      "nullish:1", "or:1", "and:1", "wrapper:1", "other:6", "opaque-part:3", "bounds:9", "order:3",
      "texts:1", "words:11", "program:6", "properties:13", "registration:10", "eval-position:1", "alias-form:1", "path-form:1",
      "expression-form:1", "character-form:1",
    ]);
    expect(ROWS.flatMap((row) => row.pins.map((at) => `${at.id}:${digest(at.page)}`))).toEqual([
      "S1:8afd84e55bb80436", "S1-LITERAL:6dc9075e02c6c569", "S1C:44deb751ea6881c2", "S1-OUTER:a5260da7eaa52c80",
      "S2:26443104183ebf73", "S2C:ff69c95e8744ba15", "S2-OUTER:d23f25db1042d4bf", "S3:d5cd38c84164c1df",
      "S3C:c1bd7fe71f49bb49", "S3-OUTER:f921d5052d539181", "P-CONST-SHADOW:d7af84145ca904b0", "P-LET-SHADOW:8a4bd4ace78e42e2",
      "P-PARAMETER-SHADOW:9c209ba2166739dd", "CLAIM-HEADER:e3b0c44298fc1c14", "CLAIM-ROWS:e3b0c44298fc1c14", "EXPORT-ROWS:e3b0c44298fc1c14",
      "MEMBER-PINS:e3b0c44298fc1c14", "KIND-PINS:e3b0c44298fc1c14", "FALSIFIER-ROSTER:e3b0c44298fc1c14", "SC-SHADOW:1549c1ad35d1b87e",
      "SC-SHORTHAND:06d879e5de557160", "A10:bd4719f6c7ced09c", "SC-PATHS:3991d4983ea4679e", "M21:d75e035c4e9d50e7",
      "M21-TS:d75e035c4e9d50e7", "C-RESOLVES:e71f3769d6975434", "C-PATTERN:6f0f9df2d7032d98", "C-JS-ALIAS:dd5bf708ed8d9f39",
      "K-import:ea1106db3623af7b", "K-unbound:898c0f5c16093308", "K-merged:3d30bd72f99bdbe2", "K-destructuring:9a68584bb451311b",
      "K-let:af08458a5a933a9a", "K-var:2282675695032160", "K-using:e30364b542bb8a82", "K-catch:611bd19b2f472b5f",
      "K-no-initializer:aa4e8e93b77301e0", "K-ambient:0dd6b9fc15fa96a5", "K-namespace:f125b607ca7f49a2", "K-parameter:4a1bf4f67e7dfa5c",
      "K-function:066c12d5e4e728fb", "K-class:095968e279c082a9", "K-enum:95fc1c94d0f565b6", "K-other:736158789dd52378",
      "G01:3bfce53df3890737", "G08:29c4bc12eb74ec8a", "G09:b7f81187531e8b21", "M55:9279434a239e0430",
      "P1:3991d4983ea4679e", "W-SCRIPT:2bb4edcbd2c23a76", "W-MODULE:2bb4edcbd2c23a76", "G02:a9cb49d86853c407",
      "W-NESTED:a3d74edfb3cb49f9", "V-EVAL:4f56a5ea6d326840", "V-WRAPPED:834efdc279613272", "V-AWAIT:4f9d587dfcb20493",
      "V-WITH:0d7debb6fe26cb27", "V-INDIRECT:d65ac9ce97754577", "G03:1f21c5326c209bf4", "V-BARE:ef2878be4c039a49",
      "V-LOCAL:ec5d949e5bf14e05", "M61:11cf43be319baee9", "M62:8997cb28b63915b9", "M63:cf9e0578e593732e",
      "M64:fc9d6a51bfbdfc13", "M66:8223ee89bf93e72e", "M72:1d1ddd6664294ab7", "M11:1619e1f6855b5544",
      "V-NAMES:037698bf6cbb0b5a", "V-STATIC:e21778172e322b59", "V-FIELD:b3839edc086946b8", "V-GETTER:b6304654391aaccd",
      "V-COMPUTED:f3b7379fc1805593", "V-ENUM:3d41b40886983272", "V-RETURN:f2ccd82977cb9490", "V-ARGUMENT:5cafc55ec44752b1",
      "V-DECORATOR:19554415a339174b", "Y-PAIR:477a1897de50b251", "Y-SELF:d1877ed980f899d7", "G04:f13c0485b8771fc7",
      "Y-SHADOW:e6e24ad042da232e", "Y-BRANCH:2a9acb9ea6aaf58f", "Y-FORMS:c3d8b50c58d4f2d8", "X-LITERAL:eb1d7c7a7bee5345",
      "X-ESCAPES:b13c901dac0144fd", "X-ESCAPE-FORMS:590aa92676ac0565", "X-IDENTIFIER:71c26db42648b754", "X-TEMPLATE:59e2a192e79b63e9",
      "X-TEMPLATE-PARTS:89a22cb8ca9b5c03", "X-PLUS:e359b1d21d75ae31", "X-CONDITIONAL:2797a0461868be0f", "X-NULLISH:73b1e8a2957cecb4",
      "X-OR:e735eae419d85798", "X-AND:b7d5b22cee00ed7d", "X-WRAPPER:d3758bbdd60be81f", "X-OTHER:ff8dd88baf0020bc",
      "X-OTHER-FORMS:ed7941fdfe66b2b6", "X-OPERATORS:6e8d9f832728ebf5", "X-UNARY:2a89b0d07fed36b9", "X-KINDS:9e8cf471905a198d",
      "X-WHITESPACE:7638549f0168ecbd", "X-OPAQUE-PART:45501e3f38f6a872", "G10:9094d871e755e431", "X-OPAQUE-MIXED:16aa541030168a5d",
      "X-BOUNDS:7700e8de7c5875ea", "G05:843ded306e1d3cab", "G06:5b631d3c7268684e", "G07:a1605bb889f6ef87",
      "X-BOUNDS-JOINS:7b2f657a3f7d8d4b", "X-BOUNDS-WRAPPERS:1a56f63228be813c", "X-BOUNDS-SIDES:bc4db5a94bb3a2b9", "X-BOUNDS-BRANCHES:2cd0e4b495e0ee80",
      "X-BOUNDS-SUBSTITUTIONS:625211828c6a3002", "X-ORDER:0127821fa22acf63", "M06:245acc7e88c7af0c", "X-ONCE:29497fd3e40186a8",
      "XT-TEXTS:17ff55942c562568", "XW-WORDS:8dd3d5171b8ea99e", "XW-FORMS:1928d101612b5975", "M59:ae86fcf35be7d259",
      "M68:07241edb496a4a81", "M69:bb6dd59e1d5c83cb", "M34:e3a2567ae8ebc277", "P2:309b407fefbe644c",
      "XW-WHITESPACE:729b77af153ae821", "XW-PUNCTUATION:f1e0bd6f238ed873", "XW-QUOTES:0efc80f079e3fec0", "XW-CUTS:4bf62cabfd695a87",
      "E1:989ef4466f3ec475", "E2:56eba4274318e4e6", "E3:a8c7ea8b7257b883", "XP-FORMS:1d4c658da1e9505c",
      "P2-PROGRAM:309b407fefbe644c", "XP-CUTS:a71f653e19fcf17e", "XF-KEYS:c78a66a5d3990908", "XF-SHORTHAND:4ff1157ea60d0a26",
      "XF-SPREAD:6d4d178025a374b2", "XF-SPREAD-OPAQUE:706c61b34faba034", "XF-MEMBERS:87c5a406050e13cb", "XF-ORDER:cb08b99cc78c3319",
      "XF-DEPTH:f41ea21228896054", "XF-WRAPPED:09724e932abc0752", "XF-OPAQUE-MEMBERS:3b50a416cbb8f7f9", "XF-ACCESSOR-KEYS:e5c45db8c1cce667",
      "M19:215ee1ce1504d191", "M26:3442717aacef4e75", "XF-OVERRIDES:ad039ce3d0c86122", "R-ALT1:3c1f8d03c348ba37",
      "R-ALT2:54b2d72f2e0becb0", "R-ALT3:76fc148f3114cbe8", "R-ALT4:c5575ebe73a2dfa0", "XR-FORMS:6a8fcdd52b392fdc",
      "M12:8db06d76ef52922e", "M13:8cdc88f90daf8a12", "M14:063a81d5e278223e", "M15:6f548c1b9811f1ce",
      "XR-PREFIXES:20f0d6d2c85a0f7b", "Q-EVAL-POSITION:49de5761e7f81b25", "Q-ALIAS-FORM:02af42170aa0e125", "Q-PATH-FORM:3991d4983ea4679e",
      "Q-EXPRESSION-FORM:af06e0f7765d0f4c", "Q-CHARACTER-FORM:d640076fbb9064a1",
    ]);
  });

  it("LIVE: the readers read today's src: its two reactivefiber registrations, its rf launch's program and its other launch programs", () => {
    const read = (path: string): BindingTextReader => bindingTextReader(path, readFileSync(join(REPO, path), "utf8"));
    const programs = (reader: BindingTextReader): string[] =>
      callsIn(reader, (call) => (LAUNCHERS.has(calleeName(call) ?? "") ? calleeName(call) : undefined)).map(({ name, argument }) => `${name}:${reader.program(argument)}`);
    const provider = read("src/workbench/providers/reactivefiber.ts");
    expect(provider.registrations()).toEqual(["reactivefiber.render.preview:read", "reactivefiber.render.preview:read"]);
    expect(programs(provider)).toEqual(["spawn:rf"]);
    expect(programs(read("src/index.ts"))).toEqual(["execFileSync:git", "execFileSync:git", "execFileSync:git"]);
    expect(programs(read("src/workbench/hosts/local-detached.ts"))).toEqual(["spawn:<opaque process.execPath>"]);
  });
});
