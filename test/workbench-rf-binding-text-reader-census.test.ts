/**
 * wb-jwc.10 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7, program-triage-2026-10-17; the rule-19 structural-exit child of wb-jwc.7,
 * orchestrator rulings R-B92 and R-B115): the binding text reader census.
 * Statement (the bead's export title, ASCII as exported): "[RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R7] Census text readers resolve
 * identifiers by BINDING not by name (let/parameter shadows of same-file consts under-report), narrowed out of wb-jwc.7's
 * fail-closed core (rule-19 structural exit)".
 *
 * WHAT IS DELIVERED. The readers are test/helpers/binding-text-reader.ts (bindingTextReader), shared so a census rides them:
 * wb-jwc.7's census (blocked by this bead, R-B115; not on trunk) can take their resolve, alternatives, exact, words, program,
 * fields and registration in place of its own nameResolved, textsOf, commandText, resolvedProperties and rfRegistrations. This
 * census proves the readers with planted modules, each a string parsed in memory (no file is written), and reads today's src
 * with them (LIVE); src is only read.
 *
 * A READING (each pin's witness): a pin plants one module, its page, at a src-shaped path, and reads it with one probe:
 *  texts, exact or words: for each call probe(x) in the page, in source order, x's alternatives rendered (a text as its JSON
 *   string, an opaque part as <opaque LABEL>, joined by " | "), its texts (JSON, or "unresolved") or its words (joined by single
 *   spaces, or unresolved);
 *  loads: for each import(x) call and each call of an identifier named load or require, `loader:` and x's alternatives rendered;
 *  programs: for each call of a launcher identifier (spawn, spawnSync, execFile, execFileSync, exec, execSync, fork), `launcher:`
 *   and its program;
 *  registrations: the module's registration entries;
 *  kind: bindingKindOf on a synthetic declaration (a type alias, which no module text binds a value to);
 *  claim-header, claim-rows, export-rows, member-pins, kind-pins and falsifier-roster: the ACCEPTANCE checks (THE ROWS).
 * Each pin's witness is held to its expected reading, and each page to its digest (PAGES), so a pin swapped for another case reds.
 *
 * THE ROWS (ROWS: one test per pin; a row's label is the requirement it answers, held to that requirement's own text outside
 * this file):
 *  S1, S2, S3, PREMISE: the export description's four items, verbatim; each row holds the gate's own plant of its member (refusal
 *   #3 of wb-jwc.7, O:1346) and this census's controls.
 *  ACCEPTANCE: the export's Acceptance line, verbatim: CLAIM-HEADER (this header's claim paragraph equals BINDING_TEXT_CLAIM
 *   byte-for-byte), CLAIM-ROWS (the claim rows are exactly the claim's parts, in order), EXPORT-ROWS (the export rows are the
 *   export's title, items and Acceptance line), MEMBER-PINS (each of the helper's MEMBERS, the gate members R-B115 folded into
 *   this bead, is a pin of its part's row), KIND-PINS (the kinds row holds exactly one K- pin per kind the claim names) and
 *   FALSIFIER-ROSTER (every row's pins, in order, are the ones test/fixtures/binding-text-reader-roster.json lists, each there
 *   with the claim words it falsifies).
 *  One row per part of the claim (labelled `SECTION (n) id`): the part's proof, a falsifier per claim word; MEMBERS sit in them
 *   (R-ALT1 to R-ALT4 in registration, E1 to E3 in program, A10 in scope).
 *
 * THE CLAIM (test/helpers/binding-text-reader.ts BINDING_TEXT_CLAIM, held here byte-for-byte; its numbered parts are
 * BINDING_FORMS, TEXT_FORMS and READING_FORMS, each proven by its row):
 * BINDING: (1) an identifier is read through the declaration TypeScript's checker binds it to by scope, in a program over its
 * own module alone (no lib, no module resolution), and a shorthand property's name through the binding of its value; (2) it
 * resolves only when that binding is exactly one declaration, a const with an initializer, outside an ambient (declare) context
 * and not exported from a namespace body, and it then reads as that initializer's alternatives; so a const shadowing a
 * same-named const reads its own initializer inside its scope and the outer one's outside it; (3) any other binding does not
 * resolve and reads as <opaque NAME:KIND>, NAME the identifier and KIND the first of these that names the binding: import (an
 * import or import-equals, merged or not); unbound (no declaration in the module, a type's name in a value position included);
 * merged (more than one declaration); let; var; using (a using or await using declaration); catch (a catch clause variable);
 * no-initializer (a const with no initializer); ambient (a const in an ambient context); namespace (a namespace, or a const
 * exported from a namespace body); parameter; destructuring (a destructuring element); function (a function declaration, or a
 * named function expression's own name); class (a class declaration, or a named class expression's own name); enum (an enum or
 * an enum member); other (a declaration of any other kind); (4) an identifier inside a with statement's body reads as <opaque
 * NAME:with>, whatever it binds; (5) every identifier of a module that calls eval by name (a call whose callee is the
 * identifier eval inside any parentheses, as, satisfies, non-null !, type assertion or await) reads as <opaque NAME:eval>,
 * whatever it binds, a with statement's body included; (6) an identifier whose const's initializer reaches that same const
 * again reads, at the repeated reach, as <opaque NAME:cycle>, NAME the identifier there. TEXT: an expression's alternatives are
 * (1) a string or no-substitution template literal: its text; (2) an identifier: as BINDING reads it; (3) a template with
 * substitutions: every combination of its literal parts and its substitutions' alternatives, in order; (4) a + join: every
 * combination of its left side's and its right side's alternatives; (5) a ?: expression: its two branches' alternatives, its
 * condition unread; (6) a ?? expression: both sides' alternatives; (7) a || expression: both sides' alternatives; (8) a &&
 * expression: both sides' alternatives; (9) parentheses, as, satisfies, a non-null !, a type assertion and await: the inner
 * expression's alternatives; (10) any other expression (a call, a property or element access, a number, a tagged template, an
 * assignment, and so on): one <opaque TEXT>, TEXT its source text with each whitespace run read as one space; (11) a
 * combination with an opaque part reads as its first opaque part's alternative; (12) a template or + join with more than 64
 * combinations, or an expression read more than 16 levels deep (each wrapper, each identifier followed to its initializer, and
 * each side, branch or substitution read counting one level), reads, where the bound is passed, as one <opaque TEXT:bound>,
 * TEXT that expression's source text; (13) the alternatives are listed in source order (a left side's or a true branch's first,
 * a combination's by its parts, the first part varying slowest), each once. READINGS: (1) an expression's texts: its
 * alternatives' texts, in order, when none is opaque; unresolved otherwise; (2) a command's words: every alternative's text
 * split at whitespace, quotes and the shell operators ; & | ( ) < >, each path reduced to its base name with a trailing .exe or
 * .cmd (either case) dropped, each word once, in order of first appearance; unresolved when any alternative is opaque; (3) a
 * launch program: when every alternative is a text with a first word, those first words, sorted, each once, joined by |;
 * otherwise <opaque TEXT>, TEXT the program expression's source text with each whitespace run read as one space; (4) an object
 * literal's fields, member by member in source order, a later member overriding: a property assignment whose key is a name, a
 * string or numeric literal or a computed string literal sets its field, and so does a shorthand property; a method, getter or
 * setter with such a key makes its own field opaque; a spread of an identifier BINDING resolves to a const whose initializer is
 * an object literal whose own fields hold no opaque member (spreads nested at most 8 deep) sets the fields it holds; any other
 * member (a spread of anything else, or a member with any other key) is opaque and may set every field; (5) a registration: an
 * object literal whose id field has a text alternative starting reactivefiber., read as one ID:EFFECT entry per such text and
 * per opaque alternative of that id, sorted, each once, ID the text or <opaque LABEL>; EFFECT its effectClass field's
 * alternatives (a text as itself, an opaque one as <opaque LABEL>), sorted, each once, joined by |, or <none> when it has no
 * effectClass field; a field an opaque member may set after its last setting, or in place of one, reads <opaque MEMBER>, MEMBER
 * that member's label (...expression for a spread, its key's source text, or get name, set name or name() for an accessor or
 * method). No reading claims more than these parts state.
 *
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl, the bead's title, description items and Acceptance
 * line) for S1, S2, S3, PREMISE and ACCEPTANCE; the helper's BINDING_FORMS, TEXT_FORMS and READING_FORMS for every claim row and
 * its label, its MEMBERS for each folded gate member's pin, and the kinds the claim's kinds part names for the K- pins; the
 * falsifier roster (test/fixtures/binding-text-reader-roster.json) for every row's pins; and src, read by LIVE. FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal and PAGES pins each pin's
 * `${id}:${sha256/16 of its page}`.
 * NOT CLAIMED: how wb-jwc.7's census reads once it rides these readers (its file is not on trunk; the cutting seat's run of its
 * refusal #4 members through these readers is a delivery-note receipt, not a pin); which calls load or launch a module (the
 * loads and programs probes above are this census's own locators, by callee name, and a riding census keeps its own); what a
 * module does at run time beyond its source text (a CommonJS exports object reassigned, a prototype patched, source evaluated),
 * which the readers never see; and R-B115's note, which the tracker export at this cut's base does not yet carry, so its members
 * anchor to MEMBERS (each naming its source) and not to the export.
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

type Probe = "texts" | "exact" | "words" | "loads" | "programs" | "registrations" | "kind" | "claim-header" | "claim-rows" | "export-rows" | "member-pins" | "kind-pins" | "falsifier-roster";
interface Pin {
  readonly id: string;
  readonly path: string;
  readonly page: string;
  readonly probe: Probe;
  readonly expect: readonly string[];
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
function spreadDepthPage(): string {
  const bases = Array.from({ length: 9 }, (_, index) => (index === 0 ? 'const B0 = { effectClass: "write" };' : `const B${index} = { ...B${index - 1} };`));
  return page(...bases, 'export const s = { id: "reactivefiber.s", ...B7 };', 'export const t = { id: "reactivefiber.t", ...B8 };');
}

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
        page('var X = "a";', 'var X = "b";', "probe(X);", 'const Y = "y";', "type Y = string;", "probe(Y);", "function F(a: string): void;", "function F(a: unknown): void {}", "probe(F);"),
        ["<opaque X:merged>", "<opaque Y:merged>", "<opaque F:merged>"],
      ),
      pin("K-let", "texts", page('let X = "a";', "probe(X);", "let Y: string;", "probe(Y);"), ["<opaque X:let>", "<opaque Y:let>"]),
      pin("K-var", "texts", page('var X = "a";', "probe(X);", 'function f() { var Y = "y"; probe(Y); }'), ["<opaque X:var>", "<opaque Y:var>"]),
      pin("K-using", "texts", page("{ using X = r; probe(X); }", "async function f() { await using Y = r; probe(Y); }"), ["<opaque X:using>", "<opaque Y:using>"]),
      pin("K-catch", "texts", page("try { f(); } catch (X) { probe(X); }"), ["<opaque X:catch>"]),
      pin(
        "K-no-initializer",
        "texts",
        page("for (const X of list) probe(X);", "for (const K in o) probe(K);", "declare const Y: string;", "probe(Y);"),
        ["<opaque X:no-initializer>", "<opaque K:no-initializer>", "<opaque Y:no-initializer>"],
      ),
      pin("K-ambient", "texts", page("export {};", 'declare const X = "a";', "probe(X);", 'declare global { const G = "g"; }', "probe(G);"), ["<opaque X:ambient>", "<opaque G:ambient>"]),
      pin(
        "K-namespace",
        "texts",
        page('namespace N { export const X = "a"; probe(X); const L = "l"; probe(L); }', "namespace N { probe(X); }", "namespace M { export const m = 1; }", "probe(M);"),
        ["<opaque X:namespace>", '"l"', "<opaque X:namespace>", "<opaque M:namespace>"],
      ),
      pin(
        "K-parameter",
        "texts",
        page("function f(X: string) { probe(X); }", "class C { constructor(public P: string) { probe(P); } }", 'const g = (Q = "q") => probe(Q);'),
        ["<opaque X:parameter>", "<opaque P:parameter>", "<opaque Q:parameter>"],
      ),
      pin(
        "K-destructuring",
        "texts",
        page("function f({ Z }: { Z: string }) { probe(Z); }", "const { X } = o;", 'const [Y = "y"] = a;', "probe(X); probe(Y);"),
        ["<opaque Z:destructuring>", "<opaque X:destructuring>", "<opaque Y:destructuring>"],
      ),
      pin("K-function", "texts", page("function F() {}", "probe(F);", "const g = function G() { probe(G); };"), ["<opaque F:function>", "<opaque G:function>"]),
      pin("K-class", "texts", page("class K {}", "probe(K);", "const c = class D { m() { probe(D); } };"), ["<opaque K:class>", "<opaque D:class>"]),
      pin("K-enum", "texts", page('enum E { A = "a", B = probe(A) }', "probe(E);"), ["<opaque A:enum>", "<opaque E:enum>"]),
      pin("K-other", "kind", page("type TA = string; (a synthetic type alias declaration)"), ["other"]),
    ],
  },
  {
    id: "with",
    from: "claim",
    label: "BINDING (4) with",
    pins: [
      pin("W-SCRIPT", "texts", page('const X = "a";', "with (o) { probe(X); }", "with (probe(X)) {}", "probe(X);"), ["<opaque X:with>", '"a"', '"a"'], "src/workbench/zz-w-script.js"),
      pin("W-MODULE", "texts", page('const X = "a";', "with (o) { probe(X); }", "with (probe(X)) {}", "probe(X);"), ["<opaque X:with>", '"a"', '"a"']),
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
      pin("V-INDIRECT", "texts", page('const X = "a";', "probe(X);", 'globalThis.eval("1");', '(0, eval)("1");', "const e = eval;", 'e("1");'), ['"a"']),
    ],
  },
  {
    id: "cycle",
    from: "claim",
    label: "BINDING (6) cycle",
    pins: [
      pin("Y-PAIR", "texts", page("const A = B;", "const B = A;", "probe(A);"), ["<opaque A:cycle>"]),
      pin("Y-SELF", "texts", page('const C = C + "x";', "probe(C);", `const D = \`${sub("D")}!\`;`, "probe(D);"), ["<opaque C:cycle>", "<opaque D:cycle>"]),
    ],
  },
  { id: "literal", from: "claim", label: "TEXT (1) literal", pins: [pin("X-LITERAL", "texts", page('probe("a");', "probe('b');", "probe(`c`);"), ['"a"', '"b"', '"c"'])] },
  { id: "identifier", from: "claim", label: "TEXT (2) identifier", pins: [pin("X-IDENTIFIER", "texts", page('const A = "a";', 'let B = "b";', "probe(A);", "probe(B);"), ['"a"', "<opaque B:let>"])] },
  {
    id: "template",
    from: "claim",
    label: "TEXT (3) template",
    pins: [pin("X-TEMPLATE", "texts", page('const H = "h";', `probe(\`${sub("H")}-${sub('c ? "x" : "y"')}!\`);`, `probe(\`${sub("H")}${sub("H")}\`);`), ['"h-x!" | "h-y!"', '"hh"'])],
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
    ],
  },
  { id: "bounds", from: "claim", label: "TEXT (12) bounds", pins: [pin("X-BOUNDS", "texts", boundsPage(), boundsReading())] },
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
    ],
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
/** The falsifier roster's rows as `row:pin,pin,...`, in order; each pin there names the claim words it falsifies. */
function rosterRows(): string[] {
  const roster = JSON.parse(readFileSync(join(REPO, ROSTER), "utf8")) as { bead?: unknown; rows?: unknown };
  expect(roster.bead, `${ROSTER} is this bead's roster`).toBe(BEAD);
  const rows = Array.isArray(roster.rows) ? (roster.rows as Array<{ row?: unknown; pins?: unknown }>) : [];
  return rows.map((row) => {
    const pins = Array.isArray(row.pins) ? (row.pins as Array<{ pin?: unknown; falsifies?: unknown }>) : [];
    expect(
      pins.every((held) => typeof held.pin === "string" && typeof held.falsifies === "string" && held.falsifies.length > 0),
      `${ROSTER} row ${String(row.row)}: every pin names what it falsifies`,
    ).toBe(true);
    return `${String(row.row)}:${pins.map((held) => String(held.pin)).join(",")}`;
  });
}
/** The claim's parts as the rows label them: `SECTION (n) id`, in claim order. */
function claimLabels(): string[] {
  const section = (name: string, parts: readonly ClaimPart<string>[]): string[] => parts.map((part, index) => `${name} (${index + 1}) ${part.id}`);
  return [...section("BINDING", BINDING_FORMS), ...section("TEXT", TEXT_FORMS), ...section("READINGS", READING_FORMS)];
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
function reading(row: Row, at: Pin): readonly string[] {
  if (at.probe === "claim-header") return [headerClaim()];
  if (at.probe === "claim-rows") return ROWS.filter((each) => each.from === "claim").map((each) => each.label);
  if (at.probe === "export-rows") return [STATEMENT, ...ROWS.filter((each) => each.from === "export").map((each) => each.label)];
  if (at.probe === "member-pins") return MEMBERS.map((member) => `${member.id}:${ROWS.find((each) => each.pins.some((held) => held.id === member.id))?.id ?? "no row"}`);
  if (at.probe === "kind-pins") return (ROWS.find((each) => each.id === "kinds")?.pins ?? []).map((held) => held.id);
  if (at.probe === "falsifier-roster") return ROWS.map((each) => `${each.id}:${each.pins.map((held) => held.id).join(",")}`);
  if (at.probe === "kind") return [bindingKindOf(ts.factory.createTypeAliasDeclaration(undefined, "TA", undefined, ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)))];
  const reader = bindingTextReader(at.path, at.page);
  if (at.probe === "registrations") return reader.registrations();
  if (at.probe === "programs") return callsIn(reader, (call) => (LAUNCHERS.has(calleeName(call) ?? "") ? calleeName(call) : undefined)).map(({ name, argument }) => `${name}:${reader.program(argument)}`);
  if (at.probe === "loads")
    return callsIn(reader, (call) => (call.expression.kind === ts.SyntaxKind.ImportKeyword ? "import()" : ["load", "require"].includes(calleeName(call) ?? "") ? calleeName(call) : undefined)).map(
      ({ name, argument }) => `${name}:${rendered(reader.alternatives(argument))}`,
    );
  const probes = callsIn(reader, (call) => (calleeName(call) === "probe" ? "probe" : undefined)).map(({ argument }) => argument);
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
  if (at.probe === "kind-pins") return claimKinds().map((kind) => `K-${kind}`);
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
      "S1:4", "S2:3", "S3:3", "PREMISE:3", "ACCEPTANCE:6", "scope:3", "const:1", "kinds:16",
      "with:2", "eval:5", "cycle:2", "literal:1", "identifier:1", "template:1", "plus:1", "conditional:1",
      "nullish:1", "or:1", "and:1", "wrapper:1", "other:1", "opaque-part:1", "bounds:1", "order:1",
      "texts:1", "words:1", "program:4", "properties:7", "registration:5",
    ]);
    expect(ROWS.flatMap((row) => row.pins.map((at) => `${at.id}:${digest(at.page)}`))).toEqual([
      "S1:8afd84e55bb80436", "S1-LITERAL:6dc9075e02c6c569", "S1C:44deb751ea6881c2", "S1-OUTER:a5260da7eaa52c80",
      "S2:26443104183ebf73", "S2C:ff69c95e8744ba15", "S2-OUTER:d23f25db1042d4bf", "S3:d5cd38c84164c1df",
      "S3C:c1bd7fe71f49bb49", "S3-OUTER:f921d5052d539181", "P-CONST-SHADOW:d7af84145ca904b0", "P-LET-SHADOW:8a4bd4ace78e42e2",
      "P-PARAMETER-SHADOW:9c209ba2166739dd", "CLAIM-HEADER:e3b0c44298fc1c14", "CLAIM-ROWS:e3b0c44298fc1c14", "EXPORT-ROWS:e3b0c44298fc1c14",
      "MEMBER-PINS:e3b0c44298fc1c14", "KIND-PINS:e3b0c44298fc1c14", "FALSIFIER-ROSTER:e3b0c44298fc1c14", "SC-SHADOW:1549c1ad35d1b87e", "SC-SHORTHAND:06d879e5de557160",
      "A10:bd4719f6c7ced09c", "C-RESOLVES:e71f3769d6975434", "K-import:ea1106db3623af7b", "K-unbound:898c0f5c16093308",
      "K-merged:4f6d211d9e79196b", "K-let:e8ae42863aa7003b", "K-var:9e9c7c3873028a68", "K-using:e30364b542bb8a82",
      "K-catch:611bd19b2f472b5f", "K-no-initializer:63a8642ac75bb055", "K-ambient:e1b75ade94c13988", "K-namespace:f125b607ca7f49a2",
      "K-parameter:e8dcb9b4f07d06bd", "K-destructuring:c8986f2cd70dc1b0", "K-function:0c94ebb9149ee5f4", "K-class:19516138e46ffe08",
      "K-enum:b92862c557bd45a8", "K-other:736158789dd52378", "W-SCRIPT:2bb4edcbd2c23a76", "W-MODULE:2bb4edcbd2c23a76",
      "V-EVAL:4f56a5ea6d326840", "V-WRAPPED:834efdc279613272", "V-AWAIT:4f9d587dfcb20493", "V-WITH:0d7debb6fe26cb27",
      "V-INDIRECT:ee50094347bb5b48", "Y-PAIR:477a1897de50b251", "Y-SELF:d1877ed980f899d7", "X-LITERAL:eb1d7c7a7bee5345",
      "X-IDENTIFIER:71c26db42648b754", "X-TEMPLATE:59e2a192e79b63e9", "X-PLUS:e359b1d21d75ae31", "X-CONDITIONAL:2797a0461868be0f",
      "X-NULLISH:73b1e8a2957cecb4", "X-OR:e735eae419d85798", "X-AND:b7d5b22cee00ed7d", "X-WRAPPER:d3758bbdd60be81f",
      "X-OTHER:ff8dd88baf0020bc", "X-OPAQUE-PART:45501e3f38f6a872", "X-BOUNDS:7700e8de7c5875ea", "X-ORDER:0127821fa22acf63",
      "XT-TEXTS:17ff55942c562568", "XW-WORDS:8dd3d5171b8ea99e", "E1:989ef4466f3ec475", "E2:56eba4274318e4e6",
      "E3:a8c7ea8b7257b883", "XP-FORMS:1d4c658da1e9505c", "XF-KEYS:c78a66a5d3990908", "XF-SHORTHAND:4ff1157ea60d0a26",
      "XF-SPREAD:6d4d178025a374b2", "XF-SPREAD-OPAQUE:706c61b34faba034", "XF-MEMBERS:87c5a406050e13cb", "XF-ORDER:cb08b99cc78c3319",
      "XF-DEPTH:f41ea21228896054", "R-ALT1:3c1f8d03c348ba37", "R-ALT2:54b2d72f2e0becb0", "R-ALT3:76fc148f3114cbe8",
      "R-ALT4:c5575ebe73a2dfa0", "XR-FORMS:6a8fcdd52b392fdc",
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
