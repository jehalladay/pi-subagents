/**
 * wb-jwc.8 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17; the rule-19 structural-exit child of
 * wb-jwc.5, orchestrator rulings R-B74 and R-B86): the SEALED reference scan follows a const literal through qualified,
 * import-equals, namespace-import and alias-bound references and through class extends expressions.
 * Statement (the bead's export title, ASCII as exported): "SEALED reference scan covers qualified, import-equals,
 * namespace-import and alias-bound member writes (G-NS1/NS2/NS4/NS6/NS7) narrowed out of wb-jwc.5's fail-closed core
 * (rule-19 structural exit)".
 *
 * WHAT IS DELIVERED. The scan is test/helpers/sealed-reference-scan.ts (sealedScan), shared so a census rides it:
 * wb-jwc.5's census (blocked by this bead, R-B86; not on trunk) can take it in place of its own sealsOf, passing its
 * own value reader (ScanReader) and reading the { rootOf, open } shape its own sealsOf returns. This census measures
 * the scan with planted module trees and with the real src tree; src is only read. ARMED, UNREAD and C1 in the bead's
 * lines are wb-jwc.5's census verdicts; what they rest on is the scan reading this census pins: a gate plant's rewrite
 * reads OPEN through its channel (so a census reading through the const refuses it UNREAD, and its leaf reader reads
 * the rewritten word as a placeholder), a near control reads OPEN through a channel the old scan already followed, and
 * a ctl reads SEALED (so a census reads the committing initializers and arms on them).
 *
 * A READING (each pin's witness, held to WITNESS): per const literal of the pin's tree, in module and source order,
 * `name:sealed`, or `name:open` and the forms that opened it, each `<channel>>...|<use>`, `|heritage` when the
 * reference sits in a class extends expression (channels and uses are SEALED_FORMS and SEALED_USES ids, below);
 * `name+N` when N object or array literals are nested in the const's literal (each sealed or open with it). Each
 * planted pin's witness also carries its page, the digest of its modules (PAGES), so a plant swapped for another case
 * reds its row.
 *
 * THE ROWS (ROWS: one test per planted row and one per pin of HOLLOWINGS, SRC and CLAIM; a row's label is the requirement
 * text it answers, verbatim from the tracker export):
 *  NS1, NS2, NS4, NS6, NS7, NS3: the description's six G-NS lines; each row holds the gate's own plants of refusal #4
 *   (verbatim but for the registry type import's path) and this census's plants of the line's other forms.
 *  IE, HER, LEAF: the three members R-B86 folded into this bead (the bead's R-B86 note), holding refusal #5's gate
 *   plants.
 *  HOLLOWINGS, SRC, CLAIM: the Acceptance's three clauses. HOLLOWINGS: every gate plant, placed in the real src tree,
 *   reads exactly as it does alone (each rewrite OPEN, each control SEALED), and every real src module reads exactly as
 *   it does without them. SRC: the real src tree holds no reference through a namespace, an import-equals alias or a
 *   class extends expression today, its scan is live (modules, roots, both readings, the name and import channels in
 *   use), and every FORMS, USES and VISIT plant, placed in it, reads as it does alone. CLAIM: this header's SEALED
 *   paragraph equals SEALED_CLAIM and its LITERAL_READER paragraph equals READER_CLAIM byte-for-byte, the forms and
 *   uses the planted rows measure are exactly SEALED_FORMS and SEALED_USES (each measured by its designated pin
 *   F-<form>, U-<use>), and SUBFORMS answers the claim's sub-form lists (below).
 *  FORMS, USES, VISIT, READER: the claim's pinned table, sub-form by sub-form. Each claim part (SEALED_ROOT,
 *   SEALED_VISIT, each of SEALED_FORMS and SEALED_USES, READER_CLAIM) is composed from its words and lists the
 *   sub-forms it names (ClaimPart.subforms, each a phrase of the part's text); SUBFORMS names, for every listed
 *   sub-form in claim order, the planted pins that hold it - each pin a plant whose reading is held to WITNESS and
 *   whose page is held to PAGES; a form's or a use's pins each measure that form or use, and its quiet pins hold the
 *   quiet side (a reading that stays SEALED, or no root at all) - and every F-, U-, VISIT- and L- pin is named for some
 *   listed sub-form. VISIT-OUT and VISIT-OUT-NAMES hold root names only where the scan must not visit (each would open
 *   a root if it were visited); VISIT-IN holds one value reference in each of 45 syntactic positions, each opening its
 *   own root. What the table claims is exactly those pinned readings, sub-form by sub-form (THE CRITERION, below); a
 *   part's connective words are not sub-forms of their own.
 *  RESIDUALS: the named families below, each quiet row's reading pinned and its page held live by its modules' digest.
 *  REFUSAL #1 (gate s149, O:1453): its witness and divergence plants are pins of this census, verbatim
 *   (REFUSAL1_PLANTS): W-ANDAND U-written-logical-and, W-QQ U-written-nullish, W-DESTR-SPREAD U-written-rest-element,
 *   W-DESTR-FORHEAD U-written-head-array, W-DESTR-FORHEAD-OBJ U-written-head-object, W-SPREAD-OBJ
 *   U-spread-shares-object, W-SATISFIES F-root-satisfies, W-TYPEASSERT F-root-type-assertion, W-NONNULL
 *   F-root-non-null, W-PAREN F-root-paren, W-AS F-root-as, W-N-ELEMENTS F-root-nested-element, W-N-WRAPPED
 *   F-root-nested-wrapped, W-NS-REEXPORT F-namespace-re-exported, W-NS-STAR F-namespace-star-exported, W-NS-ALIAS
 *   F-namespace-export-aliased, W-NS-MEMBER-IE F-namespace-member-alias, W-WHOLE-NS-IE U-whole-namespace-alias,
 *   W-WHOLE-MOD-EXPORTDECL U-whole-module-re-export, W-V-SHORTHAND U-other-shorthand, W-V-EXPORTDEFAULT
 *   F-export-default, D-EF1 U-export-form-export-import, D-EF3 U-export-form-namespace-scope, D-EF4
 *   U-export-form-alias-exported, D-EF1c U-export-form-renamed, G-EF2 U-export-form-export-require, G-EF2c
 *   U-export-form-require, D-FRZ1 F-root-freeze-callee, D-FRZ2 F-root-freeze-callee-writes. The two require spellings
 *   (and F-namespace-import-require) are TS1202 under the repo's module setting; the scan reads them as written.
 *  REFUSAL #2 (gate s157, O:1528): its fail-open witness plants are pins of this census, verbatim (REFUSAL2_PLANTS and,
 *   for its F2, READER_PLANTS): W3-BO-PARAM F-root-freeze-binds-parameter, W3-BO-BINDING F-root-freeze-binds-binding,
 *   W3-BO-FUNCTION F-root-freeze-binds-function, W3-BO-FUNCEXPR-EXPANDO F-root-freeze-binds-function-expression,
 *   W3-BO-CLASS F-root-freeze-binds-class, W3-BO-CLASSEXPR F-root-freeze-binds-class-expression, W3-BO-MODULE
 *   F-root-freeze-binds-namespace, W3-BO-IMPORT-DEFAULT F-root-freeze-binds-default-import, W3-BO-NAMESPACE-IMPORT
 *   F-root-freeze-binds-namespace-import, W3-BO-IMPORT-SPECIFIER F-root-freeze-binds-named-import, W3-BO-IMPORT-EQUALS
 *   F-root-freeze-binds-import-equals, W3-BO-VAR-SCOPE F-root-freeze-binds-inner-scope, W3-FRZ-NAME
 *   F-root-freeze-other-method, W3-SPREAD-ACCESSOR U-spread-accessor, W3-WHOLE-NAMED-REEXPORT
 *   U-whole-module-named-re-export, W3-RD-FIRST L-one-literal. W3-BO-VAR is F-root-freeze-shadowed's shape (its control
 *   G3-BO-VAR-CTL already reds this census); W3-BO-FUNCEXPR and W3-BO-ENUM are TS2339 under the repo options, so the
 *   expando witness and F-root-freeze-binds-elsewhere's enum (declared in a function, the freeze at module scope) stand
 *   for them.
 *
 * THE CRITERION (cut #3, the enumerate-the-resolvable cut ruling R-B170 binds under rules 14 and 19(c): refusal #2's
 * class, SUBFORMS claiming more than its pins on four listed sub-forms, frozen at its second failure): SUBFORMS claims
 * exactly the PINNED SET - for each listed sub-form, the planted pins it names, each reading held to WITNESS and each
 * page to PAGES - and no spelling of a sub-form beyond them. Refusal #2's four sub-forms are re-cut to it.
 * SEALED_ROOT's freeze clause lists as sub-forms of their own the one-argument rule (its one argument), the global
 * Object's freeze, each binder kind of Object the scan counts (variable, parameter, destructured binding, function and
 * class declarations and expressions, enum, namespace, default, namespace and named imports, import-equals alias) and
 * the scope rule (at any scope), each held by a pin that reds when the scan stops counting it: the gate's twelve binder
 * witnesses, a kind's further spellings (a let and a var, a method's parameter, a renamed, an array and a parameter's
 * destructured binding, a nested class and a nested namespace, a renamed named import), a binder in each further scope
 * (a block, a namespace body, a class static block, a for-of head, a catch clause, an arrow function's parameter, a
 * nested function) and a binder elsewhere than the freeze. 'a call written Object.freeze(...)' and 'its one argument'
 * are each held on both sides: F-root-freeze reads a root, and the gate's other-method witness, an element-access, a
 * parenthesized and a globalThis callee, two arguments and a spread argument read none. SEALED_USES (3)'s 'a member or
 * element that is not a string' is held for a property or element whose value is not a string (a number) and for each
 * other member and element kind: an accessor that runs, a getter returning a string, a setter, a method, a shorthand, a
 * spread member, a hole and a spread element. SEALED_USES (4)'s 'the modules it re-exports' is held for export * and
 * for named re-exports (every literal of the module, not only the names re-exported), and its neighbours 'a namespace'
 * (every block of a merged one), 'bare' (a namespace reached through a member read, then used bare), 'its own const
 * literals at any scope' (a module's exported, unexported and function-scope consts) and 'what it imports' (a default
 * import re-exported). Every known unpinned mode is a NAMED RESIDUAL below with a pinned quiet row (R-PATCHED-GLOBAL is
 * this cut's addition), and a newly found escape is a residual-list addition for the owner, not a claim this census
 * makes, unless it contradicts a pinned claim. The battery of record names, member by member, the hollowings each pin
 * was authored red against.
 *
 * THE CLAIM (test/helpers/sealed-reference-scan.ts SEALED_CLAIM, held here byte-for-byte; its parts' listed sub-forms are
 * SUBFORMS' rows):
 * SEALED: a const's own object literal or array literal, written bare or behind parentheses, as, satisfies, ! or a <T>
 * type assertion, or handed as its one argument to a call written Object.freeze(...) (the global Object's freeze only:
 * in a module where no variable, parameter, destructured binding, function declaration, function expression, class
 * declaration, class expression, enum, namespace, default import, namespace import, named import or import-equals alias
 * is named Object, at any scope; no other callee named freeze), those wrappers and calls nested in one another, and
 * every object or array literal nested in it as a property's value, an array element or a member or element of a
 * literal it spreads, at any depth and behind those same wrappers and calls, is sealed while no reference the scan
 * visits opens it. The scan visits every identifier of every module of the tree that is a value reference: not a part
 * of a type (an implements clause, an interface's extends clause and a class extends clause's type arguments included),
 * a declared name, a property or member name (a shorthand member's name is its value, and is visited), a part of a
 * qualified name, an import, export or import-equals name or entity (export default X visits X), a meta-property's name
 * or a label. From each it follows exactly these forms to a const literal: (1) its name in its own module, at any scope
 * (a name stands for every const literal, every namespace, every import-equals alias and the import of that name the
 * module holds); (2) an import of it, named, aliased or default; (3) a local export alias (export { X }, export { X as
 * Y }, export { X as default }) or export default X; (4) a named re-export (export { X } from, export { X as Y } from),
 * a chain of them included; (5) export * from, for every name but default; (6) a member of a namespace import of its
 * module (import * as M, or import M = require of a relative module), read by name or through an element access whose
 * argument reads; (7) a member of a TypeScript namespace that exports it (merged, nested and dotted namespaces
 * included, and an export import member), read by name or through an element access whose argument reads, the namespace
 * reached by its name, an import, a local export alias, a named re-export, export * from, a namespace import's member
 * or an import-equals alias; (8) an import-equals alias (import A = E at any scope, export import included) whose
 * entity E is followed part by part through these forms, an alias of an alias included; (9) any of these from an
 * identifier inside a class declaration's or a class expression's extends expression (its type arguments aside), which
 * runs when the class is defined and so is a value reference. A reference reaching a literal opens it when (1) its
 * member read chain (a property read or an element access, the chain behind wrappers or through them) is the target of
 * =, of a compound assignment (+=, -=, *=, /=, %=, **=, <<=, >>=, >>>=, &=, |=, ^=, &&=, ||=, ??=), of ++ or --, prefix
 * or postfix or of delete, or is an element, a rest element, a property's value or a rest property of the pattern, at
 * any depth, of a destructuring assignment or of a for-in or for-of head, or is such a head itself; (2) it is used
 * other than as a member read chain that reads as a string where it is used (passed, bound, returned, exported as
 * default, placed in a literal as a value or a shorthand member, called, or read as anything but a string); (3) it is
 * spread and not every value it copies reads as a string (a member or element that is not a string, or an object or
 * array it shares); (4) a namespace or a namespace import it reaches through is used other than through member reads
 * whose names read (bare, or through an element access whose argument does not read), which opens every literal that
 * namespace or module reaches (its own const literals at any scope, its import-equals aliases' targets, the modules it
 * re-exports and what it imports); (5) a namespace import, or an import-equals alias of a module, is re-exported
 * (export { M }, export { M as N }, export import A = M at module scope or namespace scope, export { A } of such an
 * alias, export import M = require(...)), or its module is re-exported by export * as, which opens every literal the
 * module reaches. Any other reference only reads, as the caller's reader decides; a reference the scan does not follow
 * is not judged, and SEALED claims nothing about it.
 *
 * THE READER (LITERAL_READER, the census's reader: READER_CLAIM, held here byte-for-byte):
 * LITERAL_READER: a member read chain reads as a string when it denotes a string literal or a no-substitution template
 * as written: a member of a const literal reached through the scan's own forms, the last member of its key, in a
 * literal whose keys all read and that holds no spread, accessor or method member, an element access choosing the
 * member its string or no-substitution template literal argument names; a spread copies strings when its value is such
 * a string, or a literal every member or element of which is one. Nothing else reads.
 *
 * RESIDUALS (named; the channels the scan does not follow; each quiet row reads SEALED with its rewrite in place):
 *  R-CODE-IN-STRING [rows: R-CODE-IN-STRING]: a write written inside a string that code runs.
 *  R-UNFOLLOWED-MODULE [rows: R-DYNAMIC-IMPORT, R-REQUIRE-CALL, R-ABSOLUTE-SPECIFIER]: a module reached through a
 *   dynamic import, a require call, or a specifier that is not relative.
 *  R-OUTSIDE-TREE [rows: R-NON-TS-MODULE, R-OUTSIDE-SRC]: a module outside the tree (a src file that is not .ts;
 *   anything outside src).
 *  R-DEEP-CHAIN [rows: R-DEEP-RE-EXPORT-BOUND, R-DEEP-RE-EXPORT, R-DEEP-EXPORT-STAR-BOUND, R-DEEP-EXPORT-STAR,
 *   R-DEEP-NAMESPACE-BOUND, R-DEEP-NAMESPACE, R-DEEP-ALIAS-BOUND, R-DEEP-ALIAS, R-DEEP-EXPORT-IMPORT-BOUND,
 *   R-DEEP-EXPORT-IMPORT, R-DEEP-FREEZE-BOUND, R-DEEP-FREEZE]: a channel nested deeper than the scan's resolution bound
 *   (MAX_STEPS = 32 nested resolution steps; a hop costs a different number of steps on each channel, so the bound is
 *   pinned per channel as measured): a chain of 30 named re-exports is followed and 31 is not; 30 export * modules are
 *   followed and 31 are not; a dotted namespace path of 32 namespaces is followed and 33 is not; 10 import-equals
 *   aliases of aliases in one module are followed and 11 are not; export import aliases across 6 modules are followed
 *   and 7 are not; and the same bound caps Object.freeze calls nested in one another, 32 followed (a root) and 33 not
 *   (no root). Each -BOUND row reads the deepest followed chain OPEN; the row after it reads the next one SEALED (or,
 *   for R-DEEP-FREEZE, holds no IDS root).
 *  R-PATCHED-GLOBAL [rows: R-PATCHED-FREEZE, R-PATCHED-ITERATOR]: a built-in the scan reads as written, replaced at run
 *   time: the global Object or its freeze reassigned (the literal handed to Object.freeze(...) still reads as a root)
 *   and the array iterator a spread runs (a spread of strings still only reads).
 * NOT CLAIMED: how wb-jwc.5's census reads once it rides this scan (its file is not on trunk; the cutting seat's
 * differential run over its planted tables is a delivery-note receipt, not a pin); a spelling, binder or member kind of
 * a listed sub-form that no planted pin holds (THE CRITERION); a connective word of a claim part that the part does not
 * list as a sub-form; and edits of this file alone, with no anchor outside it: a planted row that no tracker line
 * names, that is not a designated F-/U- pin and that is not the last pin SUBFORMS names for a sub-form, removed
 * together with its WITNESS, PAGES and SUBFORMS entries and its frozen counts; a residual removed from this paragraph,
 * the roster, WITNESS and PAGES together. The seat battery of record carries their falsifiers.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl): the bead's description lines and Acceptance
 * clauses and its R-B86 note's member lines are the ROWS' labels verbatim, and every gate plant a label names (G-NS*,
 * P18-*, with the near and ctl a label implies) is a pin of that row; the helper's SEALED_CLAIM, READER_CLAIM,
 * SEALED_FORMS, SEALED_USES and every claim part's listed sub-forms; the real src tree.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, SUBFORMS pins each row's pin counts
 * as a literal, WITNESS's and PAGES' keys are exactly the pins, and the RESIDUALS roster is pinned as a
 * `${family}:${rows}` literal equal to the RESIDUALS paragraph above.
 *
 * Display paths added: none. Test-only: every tree is read in memory; nothing is written or run.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type ClaimPart, type ModuleTree, overlayTree, plantedTree, READER_CLAIM, type Reached, SEALED_CLAIM, SEALED_FORMS, SEALED_ROOT, SEALED_USES, SEALED_VISIT, sealedScan, srcTree } from "./helpers/sealed-reference-scan.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-jwc.8";
const EXPORT = ".beads/issues.jsonl";
const SELF = "test/workbench-sealed-reference-scan-census.test.ts";
/** The real src tree, parsed once and shared by every check that reads it (each overlay reads through it). */
const SRC = srcTree(REPO);
/** Reading the real src tree, an overlay or the tracker export takes seconds under load; every test bounds itself well above that. */
const SLOW_MS = 180_000;

/* ---------------------------------------------------------------- readings */

/** The const a root literal belongs to. */
function constName(root: ts.Node): string {
  for (let node: ts.Node | undefined = root.parent; node !== undefined; node = node.parent) if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) return node.name.text;
  return "<anonymous>";
}
function formOf(reach: Reached): string {
  return `${reach.via.join(">")}|${reach.use}${reach.heritage ? "|heritage" : ""}`;
}
/** A tree's reading (see the header), over the roots of the modules a path filter keeps. */
function reading(tree: ModuleTree, keep: string | ((path: string) => boolean) = "src/"): string {
  const kept = typeof keep === "string" ? (path: string) => path.startsWith(keep) : keep;
  const seals = sealedScan(tree);
  const out: string[] = [];
  for (const [node, root] of seals.rootOf) {
    if (node !== root || !kept(root.getSourceFile().fileName)) continue;
    const forms = [...new Set(seals.reached.filter((reach) => reach.root === root && reach.use !== undefined).map(formOf))].sort();
    const nested = [...seals.rootOf].filter(([literal, owner]) => owner === root && literal !== root).length;
    out.push(`${constName(root)}${nested > 0 ? `+${nested}` : ""}:${forms.length === 0 ? "sealed" : `open ${forms.join(",")}`}`);
  }
  return out.join("; ");
}
function digest16(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
function pageDigest(modules: Readonly<Record<string, string>>): string {
  return digest16(
    Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, text]) => `${path}\n${text}`)
      .join("\0"),
  );
}

/* ---------------------------------------------------------------- the gate's plants (refusals #4 and #5, verbatim but for the type import's path) */

type Modules = Readonly<Record<string, string>>;
const P = "src/workbench/providers/";
const REGISTRY_TYPE = 'import type { CapabilityRegistry } from "../capability-registry.js";';
const FORGE = '{ id: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit" }';
const COMMITTING = '{ id: "reactivefiber.render.commit", contract: "rf@0.1.845:reactive-fiber.cli/v1 context.render" }';
const REWRITE_ID = '"reactivefiber.render.commit"';
const REWRITE_CONTRACT = '"rf@0.1.845:reactive-fiber.cli/v1 context.render"';
const REGISTER =
  'registry.register({ descriptor: { id: IDS.id, version: "1.0.0", description: "commit", inputSchema: { type: "object" }, effectClass: "read", permissions: ["reactivefiber:render"], supportedModes: ["invoke"], contractSource: IDS.contract }, invoke: async () => null });';
function under(modules: Readonly<Record<string, string>>): Modules {
  return Object.fromEntries(Object.entries(modules).map(([name, text]) => [`${P}${name}`, text]));
}
/** Refusal #4's rf-commit.ts: IDS a namespace's const object, registered through by its bare name in the namespace body. */
function rfCommit(probe: string, ids: string, after: string): string {
  return `${REGISTRY_TYPE}\n\n/** gate probe ${probe} */\nexport namespace RfCommit {\n  export const IDS = ${ids};\n  export function registerNativeReactiveFiberCommit(registry: CapabilityRegistry): void {\n    ${REGISTER}\n  }\n}\n${after}export const registerCommit = RfCommit.registerNativeReactiveFiberCommit;\n`;
}
const QUALIFIED_WRITES = `RfCommit.IDS.id = ${REWRITE_ID};\nRfCommit.IDS.contract = ${REWRITE_CONTRACT};\n`;
/** Refusal #5's modules: IDS a module-scope const object, registered through by an importer. */
const IDS_MODULE = `/** gate probe ids module: a module-scope const object. */\nexport const IDS = ${FORGE};\n`;
function p18Commit(probe: string, setup: boolean): string {
  return `${REGISTRY_TYPE}\n${setup ? 'import "./rf-commit-setup.js";\n' : ""}import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe ${probe}: registers through the imported module-scope const IDS (MEMBERS + VALUES). */\nexport function registerCommit(registry: CapabilityRegistry): void {\n  ${REGISTER}\n}\n`;
}
const HERITAGE_HELPER = "/** gate probe helper: a base class whose argument is evaluated for its effect, then ignored. */\nfunction heritage(_effect: object): ObjectConstructor {\n  return Object;\n}\n";
const REWRITE_HELPER = `/** gate probe helper: writes the members of the object it is handed. */\nfunction rewrite(ids: { id: string; contract: string }): object {\n  ids.id = ${REWRITE_ID};\n  ids.contract = ${REWRITE_CONTRACT};\n  return ids;\n}\n`;
const ASSIGN_COMMITTING = `Object.assign(IDS, { id: ${REWRITE_ID}, contract: ${REWRITE_CONTRACT} })`;
const WORDS_MODULE = '/** gate probe word module: a module-scope const object. */\nexport const WORDS = { noun: "operation", verb: "list" };\n';
const RECEIPT =
  'import "./rf-receipt-setup.js";\nimport { WORDS } from "./rf-receipt-words.js";\n\n/** gate probe PROBE: an rf receipt argv built from the imported module-scope word object. */\nexport function receiptArgv(id: string): string[] {\n  return ["--json", WORDS.noun, WORDS.verb, id];\n}\n';

const GATE_PLANTS: Readonly<Record<string, Modules>> = {
  "G-NS1": under({ "rf-commit.ts": rfCommit("G-NS1: a namespace's const object, rewritten at module scope through its qualified name.", FORGE, QUALIFIED_WRITES) }),
  "G-NS1-ctl": under({ "rf-commit.ts": rfCommit("G-NS1-ctl (paired control): the committing values as the namespace const's initializers.", COMMITTING, "") }),
  "G-NS-bare": under({
    "rf-commit.ts": rfCommit("G-NS-bare (near control): the same rewrite through the bare name, in a merged namespace block.", FORGE, `export namespace RfCommit {\n  IDS.id = ${REWRITE_ID};\n  IDS.contract = ${REWRITE_CONTRACT};\n}\n`),
  }),
  "G-NS2": under({
    "rf-commit.ts": rfCommit("G-NS2: a namespace's const object, rewritten through an import-equals alias of it.", FORGE, `import CommitIds = RfCommit.IDS;\nCommitIds.id = ${REWRITE_ID};\nCommitIds.contract = ${REWRITE_CONTRACT};\n`),
  }),
  "G-NS3": under({
    "rf-receipt.ts":
      '/** gate probe G-NS3: an argv word of a namespace const object, rewritten through its qualified name. */\nexport namespace RfReceipt {\n  export const WORDS = { noun: "operation", verb: "list" };\n  export function receiptArgv(id: string): string[] {\n    return ["--json", WORDS.noun, WORDS.verb, id];\n  }\n}\nRfReceipt.WORDS.verb = "show";\nexport const receiptArgv = RfReceipt.receiptArgv;\n',
  }),
  "G-NS3-ctl": under({
    "rf-receipt.ts":
      '/** gate probe G-NS3-ctl (paired control): "show" as the initializer. */\nexport namespace RfReceipt {\n  export const WORDS = { noun: "operation", verb: "show" };\n  export function receiptArgv(id: string): string[] {\n    return ["--json", WORDS.noun, WORDS.verb, id];\n  }\n}\nexport const receiptArgv = RfReceipt.receiptArgv;\n',
  }),
  "G-NS4": under({
    "rf-commit.ts": rfCommit("G-NS4: a namespace's const object, rewritten by a setup module (rf-commit-setup.ts).", FORGE, ""),
    "rf-commit-setup.ts": `import { RfCommit } from "./rf-commit.js";\n\n/** gate probe G-NS4: rewrite the namespace const object through its qualified name. */\n${QUALIFIED_WRITES}`,
  }),
  "G-NS5": under({
    "rf-commit.ts": rfCommit("G-NS5: the namespace's const object handed to Object.assign through its qualified name.", FORGE, `Object.assign(RfCommit.IDS, { id: ${REWRITE_ID}, contract: ${REWRITE_CONTRACT} });\n`),
  }),
  "G-NS6": under({
    "rf-commit.ts": rfCommit("G-NS6: the qualified reference bound to a module const and written through it.", FORGE, `const COMMIT_IDS = RfCommit.IDS;\nCOMMIT_IDS.id = ${REWRITE_ID};\nCOMMIT_IDS.contract = ${REWRITE_CONTRACT};\n`),
  }),
  "G-NS7": under({
    "rf-commit.ts": rfCommit("G-NS7: a namespace's const object, rewritten by a setup module through an ES namespace import.", FORGE, ""),
    "rf-commit-setup.ts": `import * as commit from "./rf-commit.js";\n\n/** gate probe G-NS7: rewrite through the module namespace object. */\ncommit.RfCommit.IDS.id = ${REWRITE_ID};\ncommit.RfCommit.IDS.contract = ${REWRITE_CONTRACT};\n`,
  }),
  "P18-IE1": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import * as ids from "./rf-commit-ids.js";\n\n/** gate probe P18-IE1: an import-equals alias of the namespace-import member, written. */\nimport CommitIds = ids.IDS;\nCommitIds.id = ${REWRITE_ID};\nCommitIds.contract = ${REWRITE_CONTRACT};\n`,
    "rf-commit.ts": p18Commit("P18-IE1", true),
  }),
  "P18-IE1-near": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import * as ids from "./rf-commit-ids.js";\n\n/** gate probe P18-IE1-near (near control): the same write through the namespace-import member access itself. */\nids.IDS.id = ${REWRITE_ID};\nids.IDS.contract = ${REWRITE_CONTRACT};\n`,
    "rf-commit.ts": p18Commit("P18-IE1-near", true),
  }),
  "P18-IE1-ctl": under({ "rf-commit-ids.ts": `/** gate probe ids module: a module-scope const object. */\nexport const IDS = ${COMMITTING};\n`, "rf-commit.ts": p18Commit("P18-IE1-ctl", false) }),
  "P18-IE2": under({
    "rf-commit-hub.ts": 'import * as ids from "./rf-commit-ids.js";\n\n/** gate probe P18-IE2: the namespace-import member re-exported as an import-equals alias. */\nexport import CommitIds = ids.IDS;\n',
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { CommitIds } from "./rf-commit-hub.js";\n\n/** gate probe P18-IE2: an importer writes through the exported alias. */\nCommitIds.id = ${REWRITE_ID};\nCommitIds.contract = ${REWRITE_CONTRACT};\n`,
    "rf-commit.ts": p18Commit("P18-IE2", true),
  }),
  "P18-IE3": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import * as ids from "./rf-commit-ids.js";\n\n/** gate probe P18-IE3: the import-equals alias declared and written inside a namespace body. */\nexport namespace CommitSetup {\n  import CommitIds = ids.IDS;\n  CommitIds.id = ${REWRITE_ID};\n  CommitIds.contract = ${REWRITE_CONTRACT};\n}\n`,
    "rf-commit.ts": p18Commit("P18-IE3", true),
  }),
  "P18-HER1": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe P18-HER1: the imported const handed to Object.assign inside a class heritage expression. */\n${HERITAGE_HELPER}export class CommitBase extends heritage(${ASSIGN_COMMITTING}) {}\n`,
    "rf-commit.ts": p18Commit("P18-HER1", true),
  }),
  "P18-HER1-near": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe P18-HER1-near (near control): the same Object.assign as a statement. */\n${ASSIGN_COMMITTING};\n`,
    "rf-commit.ts": p18Commit("P18-HER1-near", true),
  }),
  "P18-HER1b": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe P18-HER1b: the imported const handed to a rewriting helper inside a class heritage expression. */\n${REWRITE_HELPER}${HERITAGE_HELPER}export class CommitBase extends heritage(rewrite(IDS)) {}\n`,
    "rf-commit.ts": p18Commit("P18-HER1b", true),
  }),
  "P18-HER1b-near": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe P18-HER1b-near (near control): the same helper call as a statement. */\n${REWRITE_HELPER}rewrite(IDS);\n`,
    "rf-commit.ts": p18Commit("P18-HER1b-near", true),
  }),
  "P18-HER2": under({
    "rf-commit-ids.ts": `${IDS_MODULE}${HERITAGE_HELPER}/** gate probe P18-HER2: the same module's const handed to Object.assign inside a class expression's heritage. */\nexport const CommitBase = class extends heritage(${ASSIGN_COMMITTING}) {};\n`,
    "rf-commit.ts": p18Commit("P18-HER2", false),
  }),
  "P18-HER2b": under({
    "rf-commit-ids.ts": `${IDS_MODULE}${REWRITE_HELPER}${HERITAGE_HELPER}/** gate probe P18-HER2b: the same module's const handed to the rewriting helper inside a class expression's heritage. */\nexport const CommitBase = class extends heritage(rewrite(IDS)) {};\n`,
    "rf-commit.ts": p18Commit("P18-HER2b", false),
  }),
  "P18-HER3-near": under({
    "rf-commit-ids.ts": IDS_MODULE,
    "rf-commit-setup.ts": `import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe P18-HER3-near (near control): a member assignment inside the heritage expression. */\nexport class CommitBase extends ((IDS.id = ${REWRITE_ID}), (IDS.contract = ${REWRITE_CONTRACT}), Object) {}\n`,
    "rf-commit.ts": p18Commit("P18-HER3-near", true),
  }),
  "P18-LEAF-IE": under({
    "rf-receipt-setup.ts": 'import * as words from "./rf-receipt-words.js";\n\n/** gate probe P18-LEAF-IE: the word object rewritten through an import-equals alias of the namespace-import member. */\nimport ReceiptWords = words.WORDS;\nReceiptWords.verb = "show";\n',
    "rf-receipt-words.ts": WORDS_MODULE,
    "rf-receipt.ts": RECEIPT.replace("PROBE", "P18-LEAF-IE"),
  }),
  "P18-LEAF-HER": under({
    "rf-receipt-setup.ts": `import { WORDS } from "./rf-receipt-words.js";\n\n/** gate probe P18-LEAF-HER: the word object rewritten inside a class heritage expression. */\n${HERITAGE_HELPER}export class ReceiptBase extends heritage(Object.assign(WORDS, { verb: "show" })) {}\n`,
    "rf-receipt-words.ts": WORDS_MODULE,
    "rf-receipt.ts": RECEIPT.replace("PROBE", "P18-LEAF-HER"),
  }),
  "P18-LEAF-ctl": under({
    "rf-receipt-words.ts": '/** gate probe word module: a module-scope const object. */\nexport const WORDS = { noun: "operation", verb: "show" };\n',
    "rf-receipt.ts": RECEIPT.replace('import "./rf-receipt-setup.js";\n', "").replace("PROBE", "P18-LEAF-ctl"),
  }),
};

/* ---------------------------------------------------------------- this census's plants: the bead's other forms, the claim's pinned table, the residuals */

const IDS = 'export const IDS = { id: "forge.gate.commit" };\n';
const WRITE = 'id = "reactivefiber.render.commit";\n';
/** A module holding IDS and a setup module that reaches it through `head` and writes `<head>.id`. */
function written(head: string, setupImports: string, ids = IDS, extra: Readonly<Record<string, string>> = {}): Modules {
  return under({ "ids.ts": ids, ...extra, "setup.ts": `${setupImports}${head}.${WRITE}` });
}
/** One module holding IDS and a statement using it. */
function using(statement: string, ids = IDS): Modules {
  return under({ "ids.ts": `${ids}${statement}` });
}
/** A namespace holding IDS (`Rf`), and a statement using it. */
const RF = 'export namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n}\n';
/** A setup module that writes IDS imported through a chain of `levels` named re-exports. */
function chain(levels: number): Modules {
  const modules: Record<string, string> = { [`m${levels}.ts`]: IDS };
  for (let level = 0; level < levels; level++) modules[`m${level}.ts`] = `export { IDS } from "./m${level + 1}.js";\n`;
  modules["setup.ts"] = `import { IDS } from "./m0.js";\nIDS.${WRITE}`;
  return under(modules);
}
/** The same through a chain of `levels` export * modules. */
function starChain(levels: number): Modules {
  const modules: Record<string, string> = { [`s${levels}.ts`]: IDS };
  for (let level = 0; level < levels; level++) modules[`s${level}.ts`] = `export * from "./s${level + 1}.js";\n`;
  modules["setup.ts"] = `import { IDS } from "./s0.js";\nIDS.${WRITE}`;
  return under(modules);
}
/** A dotted namespace path of `levels` namespaces holding IDS, written through the full path. */
function dottedChain(levels: number): Modules {
  const path = Array.from({ length: levels }, (_, level) => `N${level}`).join(".");
  return under({ "ids.ts": `export namespace ${path} {\n  export const IDS = { id: "forge.gate.commit" };\n}\n${path}.IDS.${WRITE}` });
}
/** A chain of `levels` import-equals aliases in one module, the first of Rf.IDS, written through the last. */
function aliasChain(levels: number): Modules {
  const lines = [RF, "import A0 = Rf.IDS;"];
  for (let level = 1; level < levels; level++) lines.push(`import A${level} = A${level - 1};`);
  return under({ "ids.ts": `${lines.join("\n")}\nA${levels - 1}.${WRITE}` });
}
/** IDS's literal handed to `levels` Object.freeze calls nested in one another (KEEP, a plain root beside it, keeps the reading non-empty). */
function freezeChain(levels: number): Modules {
  return under({ "ids.ts": `export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = ${"Object.freeze(".repeat(levels)}{ id: "forge.gate.commit" }${")".repeat(levels)} as { id: string };\nIDS.${WRITE}` });
}
/** A chain of export import aliases across `levels` modules, the first of Rf.IDS, written by an importer of the last. */
function exportImportChain(levels: number): Modules {
  const modules: Record<string, string> = { "a0.ts": `${RF}export import A0 = Rf.IDS;\n` };
  for (let level = 1; level < levels; level++) modules[`a${level}.ts`] = `import { A${level - 1} } from "./a${level - 1}.js";\nexport import A${level} = A${level - 1};\n`;
  modules["setup.ts"] = `import { A${levels - 1} } from "./a${levels - 1}.js";\nA${levels - 1}.${WRITE}`;
  return under(modules);
}

/** Refusal #1 (gate s149, PREP gen_plants1 and gen_plants3): the gate's witness and divergence modules, verbatim, each the page of the pin named for it. */
const MUTATE = 'function mutate(target: { IDS: { id: string } }): void {\n  target.IDS.id = "reactivefiber.render.commit";\n}\n';
const WORDS_IDS = 'export const IDS = { id: "forge.gate.commit", words: ["operation", "list"] };\n';
const REFUSAL1_PLANTS: Readonly<Record<string, Modules>> = {
  // U1a-U1i: one witness per named member, verbatim.
  "U-written-logical-and": using('IDS.id &&= "reactivefiber.render.commit";\n'),
  "U-written-nullish": using('IDS.id ??= "reactivefiber.render.commit";\n'),
  "U-written-rest-element": using('[...IDS.words] = ["show"];\n', WORDS_IDS),
  "U-written-head-array": using('for ([IDS.id] of [["reactivefiber.render.commit"]]) break;\n'),
  "U-written-head-object": using('for ({ id: IDS.id } of [{ id: "reactivefiber.render.commit" }]) break;\n'),
  "U-spread-shares-object": under({ "ids.ts": 'export const IDS = { id: "forge.gate.commit", inner: { id: "forge.gate.inner" } };\nexport const copy = { ...IDS };\ncopy.inner.id = "reactivefiber.render.commit";\n' }),
  "F-root-satisfies": under({ "ids.ts": `export const IDS = { id: "forge.gate.commit" } satisfies { id: string };\nIDS.${WRITE}` }),
  "F-root-type-assertion": under({ "ids.ts": `export const IDS = <{ id: string }>{ id: "forge.gate.commit" };\nIDS.${WRITE}` }),
  "F-root-non-null": under({ "ids.ts": `export const IDS = { id: "forge.gate.commit" }!;\nIDS.${WRITE}` }),
  "F-root-paren": under({ "ids.ts": `export const IDS = ({ id: "forge.gate.commit" });\nIDS.${WRITE}` }),
  "F-root-as": under({ "ids.ts": `export const IDS = { id: "forge.gate.commit" } as { id: string };\nIDS.${WRITE}` }),
  "F-root-nested-element": under({ "ids.ts": `export const IDS = [{ id: "forge.gate.commit" }];\nIDS[0].${WRITE}` }),
  "F-root-nested-wrapped": under({ "ids.ts": `export const IDS = { inner: { id: "forge.gate.commit" } as { id: string } };\nIDS.inner.${WRITE}` }),
  "F-namespace-re-exported": under({ "ids.ts": RF, "hub.ts": 'export { Rf } from "./ids.js";\n', "setup.ts": `import { Rf } from "./hub.js";\nRf.IDS.${WRITE}` }),
  "F-namespace-star-exported": under({ "ids.ts": RF, "hub.ts": 'export * from "./ids.js";\n', "setup.ts": `import { Rf } from "./hub.js";\nRf.IDS.${WRITE}` }),
  "F-namespace-export-aliased": under({ "ids.ts": 'namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n}\nexport { Rf };\n', "setup.ts": `import { Rf } from "./ids.js";\nRf.IDS.${WRITE}` }),
  "F-namespace-member-alias": under({ "ids.ts": `${RF}export namespace Hub {\n  export import Ids = Rf.IDS;\n}\nHub.Ids.${WRITE}` }),
  "U-whole-namespace-alias": under({ "ids.ts": `${RF}export namespace Hub {\n  export import Ids = Rf.IDS;\n}\n${MUTATE.replace("IDS: { id: string }", "Ids: { id: string }").replace("target.IDS.id", "target.Ids.id")}mutate(Hub);\n` }),
  "U-whole-module-re-export": under({ "ids.ts": IDS, "hub.ts": 'export * from "./ids.js";\n', "top.ts": `import * as hub from "./hub.js";\n${MUTATE}mutate(hub);\n` }),
  // F3 (the two visits): a shorthand member and a default export, verbatim.
  "U-other-shorthand": under({ "ids.ts": `${IDS}export const holder = { IDS };\nholder.IDS.${WRITE}` }),
  "F-export-default": under({ "ids.ts": `${IDS}export default IDS;\n`, "setup.ts": `import Ids from "./ids.js";\nIds.${WRITE}` }),
  // U2 (use 5): the three re-export spellings and their control, and the require forms, verbatim.
  "U-export-form-export-import": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nexport import Space = ids;\n' }),
  "U-export-form-namespace-scope": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nexport namespace Hub {\n  export import Space = ids;\n}\n' }),
  "U-export-form-alias-exported": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nimport Space = ids;\nexport { Space };\n' }),
  "U-export-form-renamed": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nexport { ids as Space };\n' }),
  "U-export-form-export-require": under({ "ids.ts": IDS, "hub.ts": 'export import ids = require("./ids.js");\n' }),
  "U-export-form-require": under({ "ids.ts": IDS, "hub.ts": 'import ids = require("./ids.js");\nexport { ids };\n' }),
  // F1 (freeze callees): a freeze that swaps its argument and one that writes it, verbatim.
  "F-root-freeze-callee": under({ "ids.ts": 'const Swap = { freeze: (_o: object): { id: string } => ({ id: "reactivefiber.render.commit" }) };\nexport const IDS = Swap.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-callee-writes": under({
    "ids.ts": 'function writeId(o: { id: string }): { id: string } {\n  o.id = "reactivefiber.render.commit";\n  return o;\n}\nconst Writer = { freeze: writeId };\nexport const IDS = Writer.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
};

/** Refusal #2 (gate s157, PREP tools/leg2_table.py): the gate's fail-open witness modules, verbatim, each the page of the pin
 * named for it, and this cut's own plants of the same sub-forms (the battery of record's S3 members red each one). */
const REFUSAL2_PLANTS: Readonly<Record<string, Modules>> = {
  // U1a (SEALED_ROOT's binder kinds and the scope rule): the gate's witnesses, verbatim.
  "F-root-freeze-binds-parameter": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport function make(Object: { freeze: (value: object) => { id: string } }): string {\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n}\n' }),
  "F-root-freeze-binds-binding": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nconst holder = { Object: { freeze: swap } };\nconst { Object } = holder;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-binds-function": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nfunction Object(): void {}\nObject.freeze = swap;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-binds-function-expression": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport const make = function Object(): string {\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n};\nmake.freeze = swap;\n' }),
  "F-root-freeze-binds-class": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nclass Object {\n  static freeze(_value: object): { id: string } {\n    return { id: "reactivefiber.render.commit" };\n  }\n}\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-binds-class-expression": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const Maker = class Object {\n  static freeze(_value: object): { id: string } {\n    return { id: "reactivefiber.render.commit" };\n  }\n  static make(): string {\n    const IDS = Object.freeze({ id: "forge.gate.commit" });\n    return IDS.id;\n  }\n};\n' }),
  "F-root-freeze-binds-namespace": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nnamespace Object {\n  export function freeze(_value: object): { id: string } {\n    return { id: "reactivefiber.render.commit" };\n  }\n}\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-binds-default-import": under({
    "swap.ts": 'export default { freeze: (_value: object): { id: string } => ({ id: "reactivefiber.render.commit" }) };\n',
    "ids.ts": 'import Object from "./swap.js";\nexport const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-namespace-import": under({
    "swap.ts": 'export function freeze(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\n',
    "ids.ts": 'import * as Object from "./swap.js";\nexport const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-named-import": under({
    "swap.ts": 'export const Object = { freeze: (_value: object): { id: string } => ({ id: "reactivefiber.render.commit" }) };\n',
    "ids.ts": 'import { Object } from "./swap.js";\nexport const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-import-equals": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nnamespace Swaps {\n  export function freeze(_value: object): { id: string } {\n    return { id: "reactivefiber.render.commit" };\n  }\n}\nimport Object = Swaps;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  "F-root-freeze-binds-inner-scope": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport function make(): string {\n  const Object = { freeze: swap };\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n}\n' }),
  // U1b (a call written Object.freeze(...)): the gate's witness, verbatim.
  "F-root-freeze-other-method": under({ "ids.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.getPrototypeOf({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n' }),
  // U1c (SEALED_USES (3), a member or element that is not a string): the gate's witness, verbatim.
  "U-spread-accessor": under({ "ids.ts": 'export const IDS = {\n  id: "forge.gate.commit",\n  get count(): number {\n    this.id = "reactivefiber.render.commit";\n    return 0;\n  },\n};\nexport const copy = { ...IDS };\n' }),
  // U1d (SEALED_USES (4), the modules it re-exports): the gate's witness, verbatim.
  "U-whole-module-named-re-export": under({
    "ids.ts": 'export const IDS = { id: "forge.gate.commit" };\n',
    "hub.ts": 'export { IDS } from "./ids.js";\n',
    "top.ts": 'import * as hub from "./hub.js";\nfunction mutate(target: { IDS: { id: string } }): void {\n  target.IDS.id = "reactivefiber.render.commit";\n}\nmutate(hub);\n',
  }),
  // This cut's own plants of the same sub-forms: the global freeze not written Object.freeze(...), and not with one
  // argument; a binder of Object in each scope (one module each); a binder elsewhere than the freeze (the enum among them);
  // each binder kind's further spellings (one module each).
  "F-root-freeze-other-spellings": under({
    "frz-element.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object["freeze"]({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "frz-paren.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = (Object).freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "frz-global.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = globalThis.Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-arguments": under({
    "frz-two-args.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" }, ...([] as []));\nexport const id: string = IDS.id;\n',
    "frz-spread-arg.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze(...([{ id: "forge.gate.commit" }] as const));\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-scopes": under({
    "scope-block.ts": 'export const BLOCK = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nif (BLOCK.id !== "") {\n  const Object = { freeze: swap };\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  void IDS.id;\n}\n',
    "scope-namespace.ts": 'export const SPACE = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport namespace Scoped {\n  const Object = { freeze: swap };\n  export const IDS = Object.freeze({ id: "forge.gate.commit" });\n}\nexport const id: string = Scoped.IDS.id;\n',
    "scope-static.ts": 'export const STATIC = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport class Holder {\n  static id = "";\n  static {\n    const Object = { freeze: swap };\n    const IDS = Object.freeze({ id: "forge.gate.commit" });\n    Holder.id = IDS.id;\n  }\n}\n',
    "scope-for.ts": 'export const LOOPED = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nfor (const Object of [{ freeze: swap }]) {\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  void IDS.id;\n}\n',
    "scope-arrow.ts": 'export const ARROW = { id: "forge.gate.keep" };\nexport const make = (Object: { freeze: (value: object) => { id: string } }): string => {\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n};\n',
    "scope-nested-function.ts": 'export const NESTED = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport function outer(): string {\n  function Object(): void {}\n  Object.freeze = swap;\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n}\n',
    "scope-catch.ts": 'export const CAUGHT = { id: "forge.gate.keep" };\nclass Swapper {\n  freeze(_value: object): { id: string } {\n    return { id: "reactivefiber.render.commit" };\n  }\n}\nexport function caught(): string {\n  try {\n    throw new Swapper();\n  } catch (Object) {\n    if (Object instanceof Swapper) {\n      const IDS = Object.freeze({ id: "forge.gate.commit" });\n      return IDS.id;\n    }\n    return "";\n  }\n}\n',
  }),
  "F-root-freeze-binds-elsewhere": under({
    "elsewhere-enum.ts": 'export const KEEP = { id: "forge.gate.keep" };\nexport function scoped(): number {\n  enum Object {\n    A,\n  }\n  return Object.A;\n}\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "elsewhere-const.ts": 'export const KEEP = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nexport function scoped(): string {\n  const Object = { freeze: swap };\n  return Object.freeze({ id: "forge.gate.local" }).id;\n}\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-variable-kinds": under({
    "binds-let.ts": 'export const LET = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nlet Object = { freeze: swap };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "binds-var.ts": 'export const VAR = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nvar Object = { freeze: swap };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "F-root-freeze-binds-parameter-kinds": under({ "binds-method-parameter.ts": 'export const METHOD = { id: "forge.gate.keep" };\nexport class Maker {\n  static make(Object: { freeze: (value: object) => { id: string } }): string {\n    const IDS = Object.freeze({ id: "forge.gate.commit" });\n    return IDS.id;\n  }\n}\n' }),
  "F-root-freeze-binds-binding-kinds": under({
    "binds-renamed-binding.ts": 'export const RENAMED = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nconst holder = { swapper: { freeze: swap } };\nconst { swapper: Object } = holder;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "binds-array-binding.ts": 'export const ARRAY = { id: "forge.gate.keep" };\nfunction swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nconst [Object] = [{ freeze: swap }];\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "binds-parameter-binding.ts": 'export const DESTRUCTURED = { id: "forge.gate.keep" };\nexport function make({ Object }: { Object: { freeze: (value: object) => { id: string } } }): string {\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n}\n',
  }),
  "F-root-freeze-binds-nested-declarations": under({
    "binds-nested-class.ts": 'export const NESTED_CLASS = { id: "forge.gate.keep" };\nexport function make(): string {\n  class Object {\n    static freeze(_value: object): { id: string } {\n      return { id: "reactivefiber.render.commit" };\n    }\n  }\n  const IDS = Object.freeze({ id: "forge.gate.commit" });\n  return IDS.id;\n}\n',
    "binds-nested-namespace.ts": 'export const NESTED_SPACE = { id: "forge.gate.keep" };\nexport namespace Outer {\n  namespace Object {\n    export function freeze(_value: object): { id: string } {\n      return { id: "reactivefiber.render.commit" };\n    }\n  }\n  export const IDS = Object.freeze({ id: "forge.gate.commit" });\n}\nexport const id: string = Outer.IDS.id;\n',
  }),
  "F-root-freeze-binds-renamed-import": under({
    "swap-named.ts": 'export const swapper = { freeze: (_value: object): { id: string } => ({ id: "reactivefiber.render.commit" }) };\n',
    "binds-renamed-import.ts": 'import { swapper as Object } from "./swap-named.js";\nexport const RENAMED_IMPORT = { id: "forge.gate.keep" };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  // ... every member and element kind of a spread literal but a string property, one module each.
  "U-spread-member-kinds": under({
    "spread-getter.ts": 'export const IDS = {\n  id: "forge.gate.commit",\n  get label(): string {\n    this.id = "reactivefiber.render.commit";\n    return "label";\n  },\n};\nexport const copy = { ...IDS };\n',
    "spread-setter.ts": 'export const IDS = {\n  id: "forge.gate.commit",\n  set label(value: string) {\n    this.id = value;\n  },\n};\nexport const copy = { ...IDS };\n',
    "spread-method.ts": 'export const IDS = {\n  id: "forge.gate.commit",\n  reset(): void {\n    this.id = "reactivefiber.render.commit";\n  },\n};\nexport const copy = { ...IDS };\n',
    "spread-shorthand.ts": 'const inner = { id: "forge.gate.inner" };\nexport const IDS = { id: "forge.gate.commit", inner };\nexport const copy = { ...IDS };\n',
    "spread-spread-member.ts": 'const BASE = { id: "forge.gate.base" };\nexport const IDS = { ...BASE, label: "forge.gate.commit" };\nexport const copy = { ...IDS };\n',
    "spread-hole.ts": 'export const IDS = ["forge.gate.commit", , "forge.gate.list"];\nexport const copy = [...IDS];\n',
    "spread-element-spread.ts": 'const BASE = ["forge.gate.base"];\nexport const IDS = [...BASE, "forge.gate.commit"];\nexport const copy = [...IDS];\n',
  }),
  // ... a whole use's paths: a default import re-exported, a module's consts at each scope, every literal of a module a
  // named re-export names, every block of a merged namespace, and a namespace reached through a member read, then used bare.
  "U-whole-module-default-import": under({
    "d.ts": 'const D = { id: "forge.gate.commit" };\nexport { D as default };\n',
    "hub.ts": 'import D from "./d.js";\nexport { D };\n',
    "top.ts": 'import * as hub from "./hub.js";\nfunction mutate(target: { D: { id: string } }): void {\n  target.D.id = "reactivefiber.render.commit";\n}\nmutate(hub);\n',
  }),
  "U-whole-module-scopes": under({
    "ids.ts": 'export const IDS = { id: "forge.gate.commit" };\nconst HIDDEN = { id: "forge.gate.hidden" };\nexport const id: string = HIDDEN.id;\nexport function local(): string {\n  const LOCAL = { id: "forge.gate.local" };\n  return LOCAL.id;\n}\n',
    "top.ts": 'import * as ids from "./ids.js";\nfunction consume(_value: object): void {}\nconsume(ids);\n',
  }),
  "U-whole-module-re-export-reaches": under({
    "ids.ts": 'export const IDS = { id: "forge.gate.commit" };\nexport const OTHER = { id: "forge.gate.other" };\nexport const id: string = OTHER.id;\n',
    "hub.ts": 'export { IDS } from "./ids.js";\n',
    "top.ts": 'import * as hub from "./hub.js";\nfunction consume(_value: object): void {}\nconsume(hub);\n',
  }),
  "U-whole-namespace-merged": under({ "ids.ts": 'export namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n}\nexport namespace Rf {\n  export const OTHER = { id: "forge.gate.other" };\n}\nexport const keys = Object.keys(Rf);\n' }),
  "U-whole-member-reached": under({
    "ids.ts": 'export namespace Rf {\n  export namespace Inner {\n    export const IDS = { id: "forge.gate.commit" };\n  }\n}\nfunction mutate(target: { IDS: { id: string } }): void {\n  target.IDS.id = "reactivefiber.render.commit";\n}\nmutate(Rf.Inner);\n',
    "space.ts": 'export namespace Box {\n  export const OTHER = { id: "forge.gate.other" };\n}\n',
    "top.ts": 'import * as space from "./space.js";\nfunction consume(_value: object): void {}\nconsume(space.Box);\n',
  }),
};

const CONSUME = "function consume(_value: object): void {}\n";
/** One module per compound assignment operator's const, each written through that operator. */
const OPERATORS = [
  ["ADD", "+=", "1"],
  ["SUB", "-=", "1"],
  ["MUL", "*=", "2"],
  ["DIV", "/=", "2"],
  ["MOD", "%=", "2"],
  ["POW", "**=", "2"],
  ["SHL", "<<=", "1"],
  ["SHR", ">>=", "1"],
  ["USHR", ">>>=", "1"],
  ["AND", "&=", "1"],
  ["OR", "|=", "1"],
  ["XOR", "^=", "1"],
] as const;
const LOGICAL = [
  ["LAND", "&&="],
  ["LOR", "||="],
  ["NULLISH", "??="],
] as const;
const OPERATORS_MODULE = [...OPERATORS.map(([name, operator, value]) => `export const ${name} = { n: 0 };\n${name}.n ${operator} ${value};\n`), ...LOGICAL.map(([name, operator]) => `export const ${name} = { id: "forge.gate.commit" };\n${name}.id ${operator} "reactivefiber.render.commit";\n`)].join("");
/** VISIT-IN: one const per syntactic position of a value reference, each used there (and only there). */
const VISIT_IN = [
  'export const CALLEE = { make: (): string => "x" };\nexport const made: string = CALLEE.make();',
  'export const ARG = { id: "forge.gate.arg" };\nconsume(ARG);',
  'export const NEW_ARG = { id: "forge.gate.new" };\nexport const ref = new WeakRef(NEW_ARG);',
  'export const RET = { id: "forge.gate.ret" };\nexport function ret(): object {\n  return RET;\n}',
  'export const INIT = { id: "forge.gate.init" };\nexport const init: object = INIT;',
  'export const PROP = { id: "forge.gate.prop" };\nexport const prop = { value: PROP };',
  'export const ELEMENT = { id: "forge.gate.element" };\nexport const element = [ELEMENT];',
  "export const SPREAD_EL = [0];\nexport const spreadEl = [...SPREAD_EL];",
  "export const SPREAD_PROP = { n: 0 };\nexport const spreadProp = { ...SPREAD_PROP };",
  `export const TEMPLATE = { id: "forge.gate.template" };\nexport const template = \`\${TEMPLATE}\`;`,
  'export const BINARY = { id: "forge.gate.binary" };\nexport const same: boolean = BINARY !== null;',
  'export const COND = { id: "forge.gate.cond" };\nexport const cond: object = made === "x" ? COND : {};',
  "export const KEY = { n: 0 };\nexport const keyed: number | undefined = [1][KEY.n];",
  "export const COMPUTED = { n: 0 };\nexport const computed = { [COMPUTED.n]: 1 };",
  'export const PARAM = { id: "forge.gate.param" };\nexport function param(value: object = PARAM): object {\n  return value;\n}',
  'export const FIELD = { id: "forge.gate.field" };\nexport class Field {\n  held = FIELD;\n}',
  'export const BIND = { id: "forge.gate.bind" };\nexport function bind(): object {\n  const { value = BIND } = {} as { value?: object };\n  return value;\n}',
  "export const ENUM_INIT = { n: 1 };\nexport enum Computed {\n  A = ENUM_INIT.n,\n}",
  "export const FOR_OF = [0];\nfor (const n of FOR_OF) void n;",
  'export const THROWN = { id: "forge.gate.thrown" };\nexport function thrown(): never {\n  throw THROWN;\n}',
  'export const AWAITED = { id: "forge.gate.awaited" };\nexport async function awaited(): Promise<object> {\n  return await AWAITED;\n}',
  'export const YIELDED = { id: "forge.gate.yielded" };\nexport function* yielded(): Generator<object> {\n  yield YIELDED;\n}',
  'export const TYPEOF = { id: "forge.gate.typeof" };\nexport const kind: string = typeof TYPEOF;',
  'export const VOIDED = { id: "forge.gate.void" };\nvoid VOIDED;',
  'export const NEGATED = { id: "forge.gate.not" };\nexport const negated: boolean = !NEGATED;',
  'export const ARROW = { id: "forge.gate.arrow" };\nexport const arrow = (): object => ARROW;',
  'export const AS = { id: "forge.gate.as" };\nexport const asObject = AS as object;',
  'export const SATISFIED = { id: "forge.gate.satisfies" };\nexport const satisfied = SATISFIED satisfies object;',
  'export const NON_NULL = { id: "forge.gate.non-null" };\nexport const nonNull = NON_NULL!;',
  'export const ASSERTED = { id: "forge.gate.asserted" };\nexport const asserted = <object>ASSERTED;',
  'export const PAREN = { id: "forge.gate.paren" };\nconsume((PAREN));',
  'export const SWITCHED = { id: "forge.gate.switch" };\nexport const CASED = { id: "forge.gate.case" };\nswitch (SWITCHED) {\n  case CASED:\n    break;\n}',
  'export const IF = { id: "forge.gate.if" };\nif (IF) void 0;',
  'export const WHILE = { id: "forge.gate.while" };\nwhile (WHILE) break;',
  'export const DO = { id: "forge.gate.do" };\ndo void 0;\nwhile (DO);',
  'export const FOR_INIT = { id: "forge.gate.for-init" };\nfor (FOR_INIT; made === "y"; ) break;',
  'export const FOR_COND = { id: "forge.gate.for-cond" };\nfor (; FOR_COND; ) break;',
  'export const FOR_INCR = { id: "forge.gate.for-incr" };\nfor (; made === "y"; FOR_INCR) break;',
  'export const FOR_IN = { id: "forge.gate.for-in" };\nfor (const key in FOR_IN) void key;',
  'export const TAGGED = { tag: (strings: TemplateStringsArray): string => strings.join("") };\nexport const tagged: string = TAGGED.tag`x`;',
  "export const DECORATOR = { make: <T>(target: T, _context: ClassDecoratorContext): T => target };\n@DECORATOR.make\nexport class Decorated {}",
  'export const STATEMENT = { id: "forge.gate.statement" };\nSTATEMENT;',
  'export const IN_RIGHT = { id: "forge.gate.in" };\nexport const has: boolean = "id" in IN_RIGHT;',
  'export const OPTIONAL = { make: (): string => "x" };\nexport const optional: string | undefined = OPTIONAL?.make();',
  "",
].join("\n");
/** VISIT-OUT-NAMES: the declared, member, import and export names and the labels VISIT-OUT does not hold, each spelled as a root's name (each would open that root if it were visited). */
const VISIT_OUT_NAMES = [
  'import Def from "./visit-ids.js";',
  'import * as Space from "./visit-ids.js";',
  'const IDS = { id: "forge.gate.names" };',
  'const meta = { url: "forge.gate.meta" };',
  'const target = { id: "forge.gate.target" };',
  'const HUB = { id: "forge.gate.hub" };',
  'const SPARE = { id: "forge.gate.spare" };',
  "export type IDS = string;",
  "export namespace Box {\n  namespace SPARE {}\n}",
  'export * as HUB from "./visit-empty.js";',
  "export const read: string = IDS.id + meta.url + target.id + HUB.id + Def.id + Space.IDS.id;",
  "export class Methods {\n  IDS(): void {}\n}",
  'export class Accessors {\n  get IDS(): string {\n    return "g";\n  }\n  set IDS(_value: string) {}\n}',
  "export interface Signatures {\n  IDS(): void;\n  meta: string;\n}",
  "export const named = function IDS(): void {};",
  "export const Named = class IDS {};",
  "export function scoped(): void {\n  enum IDS {\n    A,\n  }\n  function meta(): void {}\n  class target {}\n}",
  "export enum Members {\n  IDS = 1,\n}",
  "export type Typed<IDS> = IDS;",
  "export function generic<IDS>(value: IDS): IDS {\n  return value;\n}",
  "export function binds({ a: IDS }: { a: number }): number {\n  return 0;\n}",
  "export function caught(): void {\n  try {\n    void 0;\n  } catch (IDS) {}\n}",
  "export function url(): string {\n  return import.meta.url;\n}",
  "export function Made(this: void): unknown {\n  return new.target;\n}",
  "IDS: for (const n of [1]) {\n  if (n > 0) continue IDS;\n}",
  'export const obj = {\n  IDS(): void {},\n  get meta(): string {\n    return "m";\n  },\n};',
  "",
].join("\n");

const OWN_PLANTS: Readonly<Record<string, Modules>> = {
  // NS2, NS4, NS7: the forms of the bead's lines beyond the gate's plants.
  "NS2-scoped": using(`export namespace Retarget {\n  import Ids = Rf.IDS;\n  Ids.${WRITE}}\n`, RF),
  "NS4-star": under({ "ids.ts": RF, "setup.ts": `import * as ids from "./ids.js";\nids.Rf.IDS.${WRITE}` }),
  "NS4-element": written('ids["IDS"]', 'import * as ids from "./ids.js";\n'),
  "NS7-alias-of-alias": using(`import First = Rf;\nimport Second = First;\nSecond.IDS.${WRITE}`, RF),
  "NS7-exported-alias": under({ "ids.ts": RF, "hub.ts": 'import { Rf } from "./ids.js";\nexport import Ids = Rf.IDS;\n', "setup.ts": `import { Ids } from "./hub.js";\nimport Again = Ids;\nAgain.${WRITE}` }),
  "NS7-module-alias": under({ "ids.ts": RF, "setup.ts": `import * as ids from "./ids.js";\nimport Space = ids.Rf;\nimport Ids = Space.IDS;\nIds.${WRITE}` }),
  // FORMS: SEALED_ROOT's and SEALED_FORMS' sub-forms (F-<form> is the form's designated pin; SUBFORMS names each pin's sub-form).
  "F-name": using(`export function retarget(): void {\n  IDS.${WRITE}}\n`),
  "F-name-every": using(`export function retarget(): void {\n  const IDS = { id: "forge.gate.local" };\n  IDS.${WRITE}}\n`),
  "F-name-every-alias": using(
    `export namespace Other {\n  export const OTHER = { id: "forge.gate.other" };\n}\nexport namespace First {\n  import Ids = Rf.IDS;\n  Ids.${WRITE}}\nexport namespace Second {\n  import Ids = Other.OTHER;\n}\n`,
    RF,
  ),
  "F-root-let": using(`LOOSE.${WRITE}SPARE.${WRITE}`, `${IDS}export let LOOSE = { id: "forge.gate.loose" };\nexport var SPARE = { id: "forge.gate.spare" };\n`),
  "F-root-array": using(`IDS[0] = "reactivefiber.render.commit";\n`, 'export const IDS = ["forge.gate.commit"];\n'),
  "F-root-freeze": using(`IDS.${WRITE}`, 'export const IDS = Object.freeze({ id: "forge.gate.commit" }) as { id: string };\n'),
  "F-root-freeze-shadowed": using(
    "export const id: string = IDS.id;\n",
    'function swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nconst Object = { freeze: swap };\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\n',
  ),
  "F-root-freeze-nested": using(
    `${CONSUME}consume(IDS);\nconsume(ARG);\nconsume(WRAPPED);\n`,
    'export const IDS = Object.freeze(Object.freeze({ id: "forge.gate.commit" }));\nexport const ARG = Object.freeze({ id: "forge.gate.arg" } as { id: string });\nexport const WRAPPED = ({ id: "forge.gate.wrapped" } as { id: string })!;\n',
  ),
  "F-root-nested": using(`IDS.inner.${WRITE}`, 'export const IDS = { inner: { id: "forge.gate.commit" }, words: ["operation", "list"] };\n'),
  "F-root-nested-frozen": using(`IDS.inner.${WRITE}`, 'export const IDS = { inner: Object.freeze({ id: "forge.gate.commit" }) as { id: string } };\n'),
  "F-root-nested-spread": using(`IDS.inner.${WRITE}LIST[0].${WRITE}`, 'export const IDS = { ...{ inner: { id: "forge.gate.commit" } } };\nexport const LIST = [...[{ id: "forge.gate.list" }]];\n'),
  "F-root-nested-deep": using(`IDS.outer.inner.${WRITE}KEYED.inner.${WRITE}`, 'export const IDS = { outer: { inner: { id: "forge.gate.commit" } } };\nexport const KEYED = { ["inner"]: { id: "forge.gate.keyed" } };\n'),
  "F-import": written("IDS", 'import { IDS } from "./ids.js";\n'),
  "F-import-aliased": written("COMMIT_IDS", 'import { IDS as COMMIT_IDS } from "./ids.js";\n'),
  "F-import-default": written("Ids", 'import Ids from "./ids.js";\n', 'const IDS = { id: "forge.gate.commit" };\nexport { IDS as default };\n'),
  "F-export-alias": written("IDS", 'import { IDS } from "./ids.js";\n', 'const IDS = { id: "forge.gate.commit" };\nexport { IDS };\n'),
  "F-export-alias-renamed": written("COMMIT_IDS", 'import { COMMIT_IDS } from "./ids.js";\n', 'const IDS = { id: "forge.gate.commit" };\nexport { IDS as COMMIT_IDS };\n'),
  "F-re-export": written("IDS", 'import { IDS } from "./hub.js";\n', IDS, { "hub.ts": 'export { IDS } from "./ids.js";\n' }),
  "F-re-export-renamed": written("COMMIT_IDS", 'import { COMMIT_IDS } from "./hub.js";\n', IDS, { "hub.ts": 'export { IDS as COMMIT_IDS } from "./ids.js";\n' }),
  "F-re-export-chain": chain(3),
  "F-export-star": written("IDS", 'import { IDS } from "./hub.js";\n', IDS, { "hub.ts": 'export * from "./ids.js";\n' }),
  "F-export-star-default": written("Ids", 'import Ids from "./hub.js";\n', 'const IDS = { id: "forge.gate.commit" };\nexport { IDS as default };\n', { "hub.ts": 'export * from "./ids.js";\n' }),
  "F-namespace-import": written("ids.IDS", 'import * as ids from "./ids.js";\n'),
  "F-namespace-import-require": written("ids.IDS", 'import ids = require("./ids.js");\n'),
  "F-namespace": using(`Rf.IDS.${WRITE}`, RF),
  "F-namespace-element": using(`Rf["IDS"].${WRITE}`, RF),
  "F-namespace-merged": using(`${RF}Rf.IDS.${WRITE}`, 'export namespace Rf {\n  export const OTHER = { id: "forge.gate.other" };\n}\n'),
  "F-namespace-nested": using(`Outer.Rf.IDS.${WRITE}`, 'export namespace Outer {\n  export namespace Rf {\n    export const IDS = { id: "forge.gate.commit" };\n  }\n}\n'),
  "F-namespace-dotted": using(`Outer.Rf.IDS.${WRITE}`, 'export namespace Outer.Rf {\n  export const IDS = { id: "forge.gate.commit" };\n}\n'),
  "F-namespace-scoped": using(`export namespace Outer {\n  namespace Rf {\n    export const IDS = { id: "forge.gate.commit" };\n  }\n  Rf.IDS.${WRITE}}\n`, ""),
  "F-namespace-imported": under({ "ids.ts": RF, "setup.ts": `import { Rf } from "./ids.js";\nRf.IDS.${WRITE}` }),
  "F-namespace-unexported": using(`Rf.IDS.${WRITE}`, 'export namespace Rf {\n  const IDS = { id: "forge.gate.commit" };\n  export const id: string = IDS.id;\n}\n'),
  "F-import-equals": using(`import Ids = Rf.IDS;\nIds.${WRITE}`, RF),
  "F-heritage": using("function mixin(_effect: object): ObjectConstructor {\n  return Object;\n}\nexport class Holder extends mixin(IDS) {}\n"),
  // USES: SEALED_USES' sub-forms, through the const's name (U-<use> is the use's designated pin).
  "U-written": using(`IDS.${WRITE}`),
  "U-written-element": using('IDS["id"] = "reactivefiber.render.commit";\n'),
  "U-written-wrapped": using('(IDS.id as string) = "reactivefiber.render.commit";\n((DOUBLE.id as string)) = "reactivefiber.render.commit";\n', `${IDS}export const DOUBLE = { id: "forge.gate.double" };\n`),
  "U-written-through-wrappers": using('(IDS as { id: string }).id = "reactivefiber.render.commit";\n((DOUBLE as { id: string })).id = "reactivefiber.render.commit";\n', `${IDS}export const DOUBLE = { id: "forge.gate.double" };\n`),
  "U-written-compound": using('IDS.id += "-commit";\n'),
  "U-written-logical": using('IDS.id ||= "reactivefiber.render.commit";\n'),
  "U-written-operators": under({ "ids.ts": OPERATORS_MODULE }),
  "U-written-update": using("IDS.count++;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-written-decrement": using("--IDS.count;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-written-delete": using("delete IDS.id;\n"),
  "U-written-destructuring": using('({ id: IDS.id } = { id: "reactivefiber.render.commit" });\n'),
  "U-written-array-destructuring": using('[IDS.id] = ["reactivefiber.render.commit"];\n'),
  "U-written-rest-property": using('({ ...IDS.inner } = { id: "reactivefiber.render.commit" });\n', 'export const IDS = { id: "forge.gate.commit", inner: { id: "forge.gate.inner" } };\n'),
  "U-written-nested-pattern": using(
    '[[ARR.id]] = [["reactivefiber.render.commit"]];\n({ outer: { id: OBJ.inner.id } } = { outer: { id: "reactivefiber.render.commit" } });\n',
    'export const ARR = { id: "forge.gate.arr" };\nexport const OBJ = { inner: { id: "forge.gate.obj" } };\n',
  ),
  "U-written-for-of": using('for (IDS.id of ["reactivefiber.render.commit"]) break;\n'),
  "U-written-for-in": using('for (IDS.id in { "reactivefiber.render.commit": 1 }) break;\n'),
  "U-other": using("function consume(_ids: object): void {}\nconsume(IDS);\n"),
  "U-other-bound": using("export const alias = IDS;\n"),
  "U-other-returned": using("export function ids(): object {\n  return IDS;\n}\n"),
  "U-other-export-default": using("export default IDS;\n"),
  "U-other-literal": using("export const holder = [IDS];\n"),
  "U-other-called": using("IDS.make();\n", 'export const IDS = { id: "forge.gate.commit", make: (): string => "x" };\n'),
  "U-other-non-string": using("export const count: number = IDS.count;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-other-read": using("export const id: string = IDS.id;\n"),
  "U-spread": using("export const copy = { ...IDS };\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-spread-array": using("export const copy = [...IDS];\n", 'export const IDS = ["forge.gate.commit", 0];\n'),
  "U-spread-shares-array": using('export const copy = { ...IDS };\ncopy.list.push("show");\n', 'export const IDS = { id: "forge.gate.commit", list: ["operation"] };\n'),
  "U-spread-strings": using('export const argv = ["--json", ...IDS];\n', 'export const IDS = ["operation", "show"];\n'),
  "U-whole": using("export const keys = Object.keys(Rf);\n", 'export namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n  export const OTHER = { id: "forge.gate.other" };\n}\n'),
  "U-whole-element": using('const key: string = "IDS";\nexport const picked = Rf[key as "IDS"];\n', RF),
  "U-whole-namespace-import": under({ "ids.ts": IDS, "setup.ts": 'import * as ids from "./ids.js";\nexport const keys = Object.keys(ids);\n' }),
  "U-whole-namespace-reaches": using(
    "export const keys = Object.keys(Rf);\n",
    'export namespace Rf {\n  const HIDDEN = { id: "forge.gate.hidden" };\n  export namespace Inner {\n    export const DEEP = { id: "forge.gate.deep" };\n  }\n  export function local(): string {\n    const LOCAL = { id: "forge.gate.local" };\n    return LOCAL.id + HIDDEN.id;\n  }\n}\n',
  ),
  "U-whole-module-reaches": under({
    "deep.ts": 'export const DEEP = { id: "forge.gate.deep" };\n',
    "named.ts": 'export const NAMED = { id: "forge.gate.named" };\n',
    "hub.ts": 'import * as deep from "./deep.js";\nimport { NAMED } from "./named.js";\nexport const id: string = deep.DEEP.id + NAMED.id;\n',
    "top.ts": `import * as hub from "./hub.js";\n${CONSUME}consume(hub);\n`,
  }),
  "U-export-form": under({ "ids.ts": IDS, "hub.ts": 'export * as all from "./ids.js";\n' }),
  "U-export-form-reexported": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nexport { ids };\n' }),
  "U-export-form-reaches": under({ "ids.ts": `import { OTHER } from "./other.js";\n${IDS}export const id: string = OTHER.id;\n`, "other.ts": 'export const OTHER = { id: "forge.gate.other" };\n', "hub.ts": 'export * as all from "./ids.js";\n' }),
  ...REFUSAL1_PLANTS,
  ...REFUSAL2_PLANTS,
  // VISIT: VISIT-OUT and VISIT-OUT-NAMES hold the root names only where the scan must not visit (each would open a root if
  // it were visited); VISIT-IN holds one value reference per syntactic position, each opening its own root.
  "VISIT-OUT": under({
    "visit-ids.ts": IDS,
    "visit-out.ts": [
      'import { IDS as Imported } from "./visit-ids.js";',
      IDS.trimEnd(),
      "export const id: string = IDS.id + Imported.id;",
      'export namespace Shapes {\n  export const Iface = { id: "forge.gate.shape" };\n  export interface Iface {\n    id: string;\n  }\n}',
      "export class Base<T> {\n  held?: T;\n}",
      'export class Impl implements Shapes.Iface {\n  id = "impl";\n}',
      "export interface Wider extends Shapes.Iface {\n  more: string;\n}",
      "export class Sub extends Base<typeof IDS> {}",
      "export let typed: typeof IDS | undefined;",
      'export function takes(IDS: string): string {\n  return "p";\n}',
      'export const other = { IDS: "o" };\nother.IDS = "p";',
      'export class Keyed {\n  IDS = "k";\n}',
      "export namespace Inner {\n  import Shape = Shapes.Iface;\n}",
      "export { IDS as COMMIT_IDS };",
      "IDS: for (const n of [1]) {\n  if (n > 0) break IDS;\n}",
      "",
    ].join("\n"),
  }),
  "VISIT-OUT-NAMES": under({ "visit-ids.ts": `${IDS}export { IDS as default };\n`, "visit-empty.ts": "export function empty(): void {}\n", "visit-names.ts": VISIT_OUT_NAMES }),
  "VISIT-IN": under({ "visit-in.ts": `${CONSUME}${VISIT_IN}` }),
};

/** READER: LITERAL_READER's words (READER_CLAIM), each read through the const's name; a read that reads keeps the literal SEALED. */
const READ = "export const id: string = IDS.id;\n";
const READER_PLANTS: Readonly<Record<string, Modules>> = {
  "L-last-key": using(READ, 'export const IDS = { id: "forge.gate.commit", id: 0 };\n'),
  "L-unread-key": using(READ, 'export const IDS = { [String("id")]: "x", id: "forge.gate.commit" };\n'),
  "L-spread-member": using(READ, 'const BASE = { id: "forge.gate.base" };\nexport const IDS = { ...BASE, id: "forge.gate.commit" };\n'),
  "L-accessor-member": using(READ, 'export const IDS = {\n  id: "forge.gate.commit",\n  get other(): string {\n    return "x";\n  },\n};\n'),
  "L-method-member": using(READ, 'export const IDS = {\n  id: "forge.gate.commit",\n  reset(): void {},\n};\n'),
  "L-element": using('export const id: string = IDS["id"];\n'),
  "L-element-template": using("export const id: string = IDS[`id`];\n"),
  "L-spread-string": using("export const letters = [...IDS.id];\n"),
  "L-spread-object-strings": using("export const copy = { ...IDS };\n", 'export const IDS = { noun: "operation", verb: "show" };\n'),
  "L-template": using(READ, "export const IDS = { id: `forge.gate.commit` };\n"),
  "L-forms": under({
    "ids.ts": 'export const A = { id: "forge.gate.a" };\nexport namespace Rf {\n  export const B = { id: "forge.gate.b" };\n}\n',
    "read.ts": 'import { A, Rf } from "./ids.js";\nimport * as ids from "./ids.js";\nimport Alias = Rf.B;\nexport const reads: string[] = [A.id, ids.A.id, Rf.B.id, ids.Rf.B.id, Alias.id, Rf["B"].id, ids["A"].id];\n',
  }),
  // Refusal #2's F2 (gate s157), verbatim: a name reaching two const literals reads through neither.
  "L-one-literal": under({ "ids.ts": 'function consume(_value: object): void {}\nexport const IDS = { id: "forge.gate.commit" };\nexport function run(): void {\n  const IDS = { id: { held: "forge.gate.local" } };\n  consume(IDS.id);\n}\n' }),
};

/** RESIDUALS: each quiet row's page holds its rewrite; the scan does not follow it, so the page reads SEALED. */
const RESIDUAL_PLANTS: Readonly<Record<string, Modules>> = {
  "R-CODE-IN-STRING": using(`const SCRIPT = "IDS.id = 'reactivefiber.render.commit'";\nfunction runScript(_script: string): void {}\nrunScript(SCRIPT);\n`),
  "R-DYNAMIC-IMPORT": under({ "ids.ts": IDS, "setup.ts": 'void import("./ids.js").then((module) => {\n  module.IDS.id = "reactivefiber.render.commit";\n});\n' }),
  "R-REQUIRE-CALL": under({ "ids.ts": IDS, "setup.ts": 'import { createRequire } from "node:module";\ncreateRequire(import.meta.url)("./ids.js").IDS.id = "reactivefiber.render.commit";\n' }),
  "R-ABSOLUTE-SPECIFIER": under({ "ids.ts": IDS, "setup.ts": `import { IDS } from "/repo/${P}ids.js";\nIDS.${WRITE}` }),
  "R-NON-TS-MODULE": { [`${P}ids.ts`]: IDS, [`${P}setup.js`]: `import { IDS } from "./ids.js";\nIDS.${WRITE}` },
  "R-OUTSIDE-SRC": { [`${P}ids.ts`]: IDS, "lib/setup.ts": `import { IDS } from "../${P}ids.js";\nIDS.${WRITE}` },
  // R-DEEP-CHAIN, per channel: the deepest chain the scan follows (-BOUND, OPEN) and the next one (SEALED).
  "R-DEEP-RE-EXPORT-BOUND": chain(30),
  "R-DEEP-RE-EXPORT": chain(31),
  "R-DEEP-EXPORT-STAR-BOUND": starChain(30),
  "R-DEEP-EXPORT-STAR": starChain(31),
  "R-DEEP-NAMESPACE-BOUND": dottedChain(32),
  "R-DEEP-NAMESPACE": dottedChain(33),
  "R-DEEP-ALIAS-BOUND": aliasChain(10),
  "R-DEEP-ALIAS": aliasChain(11),
  "R-DEEP-EXPORT-IMPORT-BOUND": exportImportChain(6),
  "R-DEEP-EXPORT-IMPORT": exportImportChain(7),
  "R-DEEP-FREEZE-BOUND": freezeChain(32),
  "R-DEEP-FREEZE": freezeChain(33),
  // R-PATCHED-GLOBAL: a built-in the scan reads as written, replaced at run time.
  "R-PATCHED-FREEZE": under({
    "ids.ts": 'function swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nObject.freeze = swap as never;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
    "global.ts": 'function swap(_value: object): { id: string } {\n  return { id: "reactivefiber.render.commit" };\n}\nObject = { freeze: swap } as never;\nexport const IDS = Object.freeze({ id: "forge.gate.commit" });\nexport const id: string = IDS.id;\n',
  }),
  "R-PATCHED-ITERATOR": under({ "ids.ts": 'Array.prototype[Symbol.iterator] = function* (this: string[]): Generator<string> {\n  this[0] = "reactivefiber.render.commit";\n  yield* this.values();\n} as never;\nexport const IDS = ["operation", "show"];\nexport const argv = ["--json", ...IDS];\n' }),
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-CODE-IN-STRING": ["R-CODE-IN-STRING"],
  "R-UNFOLLOWED-MODULE": ["R-DYNAMIC-IMPORT", "R-REQUIRE-CALL", "R-ABSOLUTE-SPECIFIER"],
  "R-OUTSIDE-TREE": ["R-NON-TS-MODULE", "R-OUTSIDE-SRC"],
  "R-DEEP-CHAIN": [
    "R-DEEP-RE-EXPORT-BOUND",
    "R-DEEP-RE-EXPORT",
    "R-DEEP-EXPORT-STAR-BOUND",
    "R-DEEP-EXPORT-STAR",
    "R-DEEP-NAMESPACE-BOUND",
    "R-DEEP-NAMESPACE",
    "R-DEEP-ALIAS-BOUND",
    "R-DEEP-ALIAS",
    "R-DEEP-EXPORT-IMPORT-BOUND",
    "R-DEEP-EXPORT-IMPORT",
    "R-DEEP-FREEZE-BOUND",
    "R-DEEP-FREEZE",
  ],
  "R-PATCHED-GLOBAL": ["R-PATCHED-FREEZE", "R-PATCHED-ITERATOR"],
};

/* ---------------------------------------------------------------- THE ROWS */

const ACCEPTANCE_CLAUSES = [
  "each G-NS* gate-authored hollowing reds the unmodified census",
  "a real src rewrite through each form drops SEALED",
  "the SEALED claim text and the scan's proven forms agree byte-for-byte",
] as const;
interface Row {
  readonly id: string;
  /** The requirement text the row answers, verbatim: a description line, an Acceptance clause, or an R-B86 member line. */
  readonly label: string;
  readonly from: "description" | "acceptance" | "r-b86" | "claim";
  readonly pins: readonly string[];
}
const FORM_PINS = Object.keys(OWN_PLANTS).filter((pin) => pin.startsWith("F-"));
const USE_PINS = Object.keys(OWN_PLANTS).filter((pin) => pin.startsWith("U-"));
const VISIT_PINS = Object.keys(OWN_PLANTS).filter((pin) => pin.startsWith("VISIT-"));
const ROWS: readonly Row[] = [
  { id: "NS1", from: "description", label: "G-NS1 qualified-name member write (Ns.obj.k = v) must unseal; G-NS1-ctl stays the ARMED red.", pins: ["G-NS1", "G-NS1-ctl", "G-NS-bare", "G-NS5"] },
  { id: "NS2", from: "description", label: "G-NS2 import-equals alias (import A = Ns) member write must unseal.", pins: ["G-NS2", "NS2-scoped"] },
  { id: "NS4", from: "description", label: "G-NS4 ES namespace import (import * as A) member write must unseal.", pins: ["G-NS4", "NS4-star", "NS4-element"] },
  { id: "NS6", from: "description", label: "G-NS6 const bound to the qualified reference (const a = Ns.obj) member write must unseal.", pins: ["G-NS6"] },
  { id: "NS7", from: "description", label: "G-NS7 alias-of-alias chains must unseal.", pins: ["G-NS7", "NS7-alias-of-alias", "NS7-exported-alias", "NS7-module-alias"] },
  { id: "NS3", from: "description", label: "G-NS3 leaf-reader analog stays green (C1; G-NS3-ctl reds C1) - the reader claim is already honest there.", pins: ["G-NS3", "G-NS3-ctl"] },
  {
    id: "IE",
    from: "r-b86",
    label: "An import-equals member write rooted at an ES namespace import (import X = ns.Y) rewriting a module-scope const the SEALED scan never visits (P18-IE1/IE2/IE3 shapes; near reds A1 UNREAD, ctl reds A1 ARMED).",
    pins: ["P18-IE1", "P18-IE1-near", "P18-IE1-ctl", "P18-IE2", "P18-IE3"],
  },
  {
    id: "HER",
    from: "r-b86",
    label: "isReference reads a class-heritage expression as a type part, so 'value references' claims must either cover heritage expressions or exclude them explicitly (P18-HER1b/HER2b shapes).",
    pins: ["P18-HER1", "P18-HER1-near", "P18-HER1b", "P18-HER1b-near", "P18-HER2", "P18-HER2b", "P18-HER3-near"],
  },
  { id: "LEAF", from: "r-b86", label: "The LEAF READER analogs of both gaps (P18-LEAF-IE / P18-LEAF-HER).", pins: ["P18-LEAF-IE", "P18-LEAF-HER", "P18-LEAF-ctl"] },
  { id: "HOLLOWINGS", from: "acceptance", label: ACCEPTANCE_CLAUSES[0], pins: ["src-gate-plants"] },
  { id: "SRC", from: "acceptance", label: ACCEPTANCE_CLAUSES[1], pins: ["src-no-new-channel", "src-live", "src-own-plants"] },
  { id: "CLAIM", from: "acceptance", label: ACCEPTANCE_CLAUSES[2], pins: ["claim-text", "reader-text", "forms-proven", "uses-proven", "subforms-pinned"] },
  { id: "FORMS", from: "claim", label: "SEALED_FORMS", pins: FORM_PINS },
  { id: "USES", from: "claim", label: "SEALED_USES", pins: USE_PINS },
  { id: "VISIT", from: "claim", label: "SEALED_VISIT", pins: VISIT_PINS },
  { id: "READER", from: "claim", label: "READER_CLAIM", pins: Object.keys(READER_PLANTS) },
  { id: "RESIDUALS", from: "claim", label: "RESIDUALS", pins: Object.values(RESIDUALS).flat() },
];

/** The sub-forms each claim part lists (SEALED_ROOT, SEALED_VISIT, SEALED_FORMS, SEALED_USES, READER_CLAIM), in claim order, each with the pins that hold it. */
interface Subform {
  readonly part: string;
  readonly sub: string;
  /** Planted pins that hold the sub-form (the census claims their readings); a form's or a use's pins each measure that form or use. */
  readonly pins: readonly string[];
  /** Planted pins that hold its quiet side (a reading that stays sealed, or no root at all). */
  readonly quiet?: readonly string[];
}
const SUBFORMS: readonly Subform[] = [
  { part: "root", sub: "const", pins: ["F-root-let"] },
  { part: "root", sub: "object literal", pins: ["F-name"] },
  { part: "root", sub: "array literal", pins: ["F-root-array"] },
  { part: "root", sub: "bare", pins: ["F-name"] },
  { part: "root", sub: "parentheses", pins: ["F-root-paren"] },
  { part: "root", sub: "as", pins: ["F-root-as"] },
  { part: "root", sub: "satisfies", pins: ["F-root-satisfies"] },
  { part: "root", sub: "!", pins: ["F-root-non-null"] },
  { part: "root", sub: "a <T> type assertion", pins: ["F-root-type-assertion"] },
  { part: "root", sub: "its one argument", pins: ["F-root-freeze"], quiet: ["F-root-freeze-arguments"] },
  { part: "root", sub: "a call written Object.freeze(...)", pins: ["F-root-freeze"], quiet: ["F-root-freeze-other-method", "F-root-freeze-other-spellings"] },
  { part: "root", sub: "the global Object's freeze", pins: ["F-root-freeze"] },
  { part: "root", sub: "variable", pins: ["F-root-freeze-shadowed", "F-root-freeze-binds-variable-kinds"] },
  { part: "root", sub: "parameter", pins: ["F-root-freeze-binds-parameter", "F-root-freeze-binds-parameter-kinds"] },
  { part: "root", sub: "destructured binding", pins: ["F-root-freeze-binds-binding", "F-root-freeze-binds-binding-kinds"] },
  { part: "root", sub: "function declaration", pins: ["F-root-freeze-binds-function"] },
  { part: "root", sub: "function expression", pins: ["F-root-freeze-binds-function-expression"] },
  { part: "root", sub: "class declaration", pins: ["F-root-freeze-binds-class", "F-root-freeze-binds-nested-declarations"] },
  { part: "root", sub: "class expression", pins: ["F-root-freeze-binds-class-expression"] },
  { part: "root", sub: "enum", pins: ["F-root-freeze-binds-elsewhere"] },
  { part: "root", sub: "namespace", pins: ["F-root-freeze-binds-namespace", "F-root-freeze-binds-nested-declarations"] },
  { part: "root", sub: "default import", pins: ["F-root-freeze-binds-default-import"] },
  { part: "root", sub: "namespace import", pins: ["F-root-freeze-binds-namespace-import"] },
  { part: "root", sub: "named import", pins: ["F-root-freeze-binds-named-import", "F-root-freeze-binds-renamed-import"] },
  { part: "root", sub: "import-equals alias", pins: ["F-root-freeze-binds-import-equals"] },
  { part: "root", sub: "at any scope", pins: ["F-root-freeze-binds-inner-scope", "F-root-freeze-binds-scopes", "F-root-freeze-binds-nested-declarations", "F-root-freeze-binds-elsewhere"] },
  { part: "root", sub: "no other callee named freeze", pins: ["F-root-freeze-callee", "F-root-freeze-callee-writes"] },
  { part: "root", sub: "those wrappers and calls nested in one another", pins: ["F-root-freeze-nested"] },
  { part: "root", sub: "a property's value", pins: ["F-root-nested"] },
  { part: "root", sub: "an array element", pins: ["F-root-nested-element"] },
  { part: "root", sub: "a member or element of a literal it spreads", pins: ["F-root-nested-spread"] },
  { part: "root", sub: "at any depth", pins: ["F-root-nested-deep"] },
  { part: "root", sub: "behind those same wrappers and calls", pins: ["F-root-nested-wrapped", "F-root-nested-frozen"] },
  { part: "visit", sub: "a value reference", pins: ["VISIT-IN"] },
  { part: "visit", sub: "a part of a type", pins: ["VISIT-OUT"] },
  { part: "visit", sub: "an implements clause", pins: ["VISIT-OUT"] },
  { part: "visit", sub: "an interface's extends clause", pins: ["VISIT-OUT"] },
  { part: "visit", sub: "a class extends clause's type arguments", pins: ["VISIT-OUT"] },
  { part: "visit", sub: "a declared name", pins: ["VISIT-OUT", "VISIT-OUT-NAMES"] },
  { part: "visit", sub: "a property or member name", pins: ["VISIT-OUT", "VISIT-OUT-NAMES"] },
  { part: "visit", sub: "a shorthand member's name is its value, and is visited", pins: ["U-other-shorthand"] },
  { part: "visit", sub: "a part of a qualified name", pins: ["VISIT-OUT"] },
  { part: "visit", sub: "an import, export or import-equals name or entity", pins: ["VISIT-OUT", "VISIT-OUT-NAMES"] },
  { part: "visit", sub: "export default X visits X", pins: ["U-other-export-default", "F-export-default"] },
  { part: "visit", sub: "a meta-property's name", pins: ["VISIT-OUT-NAMES"] },
  { part: "visit", sub: "a label", pins: ["VISIT-OUT", "VISIT-OUT-NAMES"] },
  { part: "name", sub: "name", pins: ["F-name"] },
  { part: "name", sub: "at any scope", pins: ["F-name-every", "F-namespace-scoped"] },
  { part: "name", sub: "every const literal", pins: ["F-name-every"] },
  { part: "name", sub: "every namespace", pins: ["F-namespace-merged"] },
  { part: "name", sub: "every import-equals alias", pins: ["F-name-every-alias"] },
  { part: "name", sub: "the import", pins: ["F-import"] },
  { part: "import", sub: "named", pins: ["F-import"] },
  { part: "import", sub: "aliased", pins: ["F-import-aliased"] },
  { part: "import", sub: "default", pins: ["F-import-default"] },
  { part: "export-alias", sub: "export { X }", pins: ["F-export-alias"] },
  { part: "export-alias", sub: "export { X as Y }", pins: ["F-export-alias-renamed"] },
  { part: "export-alias", sub: "export { X as default }", pins: ["F-import-default"] },
  { part: "export-alias", sub: "export default X", pins: ["F-export-default"] },
  { part: "re-export", sub: "export { X } from", pins: ["F-re-export"] },
  { part: "re-export", sub: "export { X as Y } from", pins: ["F-re-export-renamed"] },
  { part: "re-export", sub: "a chain of them", pins: ["F-re-export-chain"] },
  { part: "export-star", sub: "export * from", pins: ["F-export-star"] },
  { part: "export-star", sub: "every name but default", pins: [], quiet: ["F-export-star-default"] },
  { part: "namespace-import", sub: "import * as M", pins: ["F-namespace-import"] },
  { part: "namespace-import", sub: "import M = require of a relative module", pins: ["F-namespace-import-require"] },
  { part: "namespace-import", sub: "by name", pins: ["F-namespace-import"] },
  { part: "namespace-import", sub: "an element access whose argument reads", pins: ["NS4-element"] },
  { part: "namespace", sub: "exports it", pins: ["F-namespace"], quiet: ["F-namespace-unexported"] },
  { part: "namespace", sub: "merged", pins: ["F-namespace-merged"] },
  { part: "namespace", sub: "nested", pins: ["F-namespace-nested"] },
  { part: "namespace", sub: "dotted", pins: ["F-namespace-dotted"] },
  { part: "namespace", sub: "an export import member", pins: ["F-namespace-member-alias"] },
  { part: "namespace", sub: "by name", pins: ["F-namespace"] },
  { part: "namespace", sub: "an element access whose argument reads", pins: ["F-namespace-element"] },
  { part: "namespace", sub: "its name", pins: ["F-namespace"] },
  { part: "namespace", sub: "an import", pins: ["F-namespace-imported"] },
  { part: "namespace", sub: "a local export alias", pins: ["F-namespace-export-aliased"] },
  { part: "namespace", sub: "a named re-export", pins: ["F-namespace-re-exported"] },
  { part: "namespace", sub: "export * from", pins: ["F-namespace-star-exported"] },
  { part: "namespace", sub: "a namespace import's member", pins: ["NS4-star"] },
  { part: "namespace", sub: "an import-equals alias", pins: ["NS7-alias-of-alias"] },
  { part: "import-equals", sub: "import A = E", pins: ["F-import-equals"] },
  { part: "import-equals", sub: "at any scope", pins: ["NS2-scoped"] },
  { part: "import-equals", sub: "export import", pins: ["NS7-exported-alias"] },
  { part: "import-equals", sub: "part by part", pins: ["NS7-module-alias"] },
  { part: "import-equals", sub: "an alias of an alias", pins: ["NS7-alias-of-alias"] },
  { part: "heritage", sub: "a class declaration's", pins: ["F-heritage"] },
  { part: "heritage", sub: "a class expression's", pins: ["P18-HER2"] },
  { part: "heritage", sub: "its type arguments aside", pins: [], quiet: ["VISIT-OUT"] },
  { part: "written", sub: "a property read", pins: ["U-written"] },
  { part: "written", sub: "an element access", pins: ["U-written-element"] },
  { part: "written", sub: "behind wrappers", pins: ["U-written-wrapped"] },
  { part: "written", sub: "through them", pins: ["U-written-through-wrappers"] },
  { part: "written", sub: "=", pins: ["U-written"] },
  { part: "written", sub: "a compound assignment (+=, -=, *=, /=, %=, **=, <<=, >>=, >>>=, &=, |=, ^=, &&=, ||=, ??=)", pins: ["U-written-compound", "U-written-logical", "U-written-logical-and", "U-written-nullish", "U-written-operators"] },
  { part: "written", sub: "++ or --, prefix or postfix", pins: ["U-written-update", "U-written-decrement"] },
  { part: "written", sub: "delete", pins: ["U-written-delete"] },
  { part: "written", sub: "an element", pins: ["U-written-array-destructuring"] },
  { part: "written", sub: "a rest element", pins: ["U-written-rest-element"] },
  { part: "written", sub: "a property's value", pins: ["U-written-destructuring"] },
  { part: "written", sub: "a rest property", pins: ["U-written-rest-property"] },
  { part: "written", sub: "at any depth", pins: ["U-written-nested-pattern"] },
  { part: "written", sub: "a destructuring assignment", pins: ["U-written-destructuring", "U-written-array-destructuring"] },
  { part: "written", sub: "a for-in or for-of head", pins: ["U-written-head-array", "U-written-head-object"] },
  { part: "written", sub: "such a head itself", pins: ["U-written-for-of", "U-written-for-in"] },
  { part: "other", sub: "reads as a string", pins: [], quiet: ["U-other-read"] },
  { part: "other", sub: "passed", pins: ["U-other"] },
  { part: "other", sub: "bound", pins: ["U-other-bound"] },
  { part: "other", sub: "returned", pins: ["U-other-returned"] },
  { part: "other", sub: "exported as default", pins: ["U-other-export-default"] },
  { part: "other", sub: "a value", pins: ["U-other-literal"] },
  { part: "other", sub: "a shorthand member", pins: ["U-other-shorthand"] },
  { part: "other", sub: "called", pins: ["U-other-called"] },
  { part: "other", sub: "read as anything but a string", pins: ["U-other-non-string"] },
  { part: "spread", sub: "spread", pins: ["U-spread"] },
  { part: "spread", sub: "a member or element that is not a string", pins: ["U-spread", "U-spread-array", "U-spread-accessor", "U-spread-member-kinds"] },
  { part: "spread", sub: "an object or array it shares", pins: ["U-spread-shares-object", "U-spread-shares-array"] },
  { part: "whole", sub: "a namespace", pins: ["U-whole", "U-whole-namespace-merged"] },
  { part: "whole", sub: "a namespace import", pins: ["U-whole-namespace-import"] },
  { part: "whole", sub: "bare", pins: ["U-whole", "U-whole-namespace-import", "U-whole-member-reached"] },
  { part: "whole", sub: "an element access whose argument does not read", pins: ["U-whole-element"] },
  { part: "whole", sub: "its own const literals at any scope", pins: ["U-whole-namespace-reaches", "U-whole-module-scopes"] },
  { part: "whole", sub: "its import-equals aliases' targets", pins: ["U-whole-namespace-alias"] },
  { part: "whole", sub: "the modules it re-exports", pins: ["U-whole-module-re-export", "U-whole-module-named-re-export", "U-whole-module-re-export-reaches"] },
  { part: "whole", sub: "what it imports", pins: ["U-whole-module-reaches", "U-whole-module-default-import"] },
  { part: "export-form", sub: "export { M }", pins: ["U-export-form-reexported", "U-export-form-require"] },
  { part: "export-form", sub: "export { M as N }", pins: ["U-export-form-renamed"] },
  { part: "export-form", sub: "export import A = M", pins: ["U-export-form-export-import"] },
  { part: "export-form", sub: "module scope", pins: ["U-export-form-export-import"] },
  { part: "export-form", sub: "namespace scope", pins: ["U-export-form-namespace-scope"] },
  { part: "export-form", sub: "export { A } of such an alias", pins: ["U-export-form-alias-exported"] },
  { part: "export-form", sub: "export import M = require(...)", pins: ["U-export-form-export-require"] },
  { part: "export-form", sub: "export * as", pins: ["U-export-form"] },
  { part: "export-form", sub: "every literal the module reaches", pins: ["U-export-form-reaches"] },
  { part: "reader", sub: "a string literal", pins: ["U-other-read"] },
  { part: "reader", sub: "a no-substitution template", pins: ["L-template"] },
  { part: "reader", sub: "a member of a const literal reached through the scan's own forms", pins: ["L-forms", "L-one-literal"] },
  { part: "reader", sub: "the last member of its key", pins: ["L-last-key"] },
  { part: "reader", sub: "whose keys all read", pins: ["L-unread-key"] },
  { part: "reader", sub: "spread", pins: ["L-spread-member"] },
  { part: "reader", sub: "accessor", pins: ["L-accessor-member"] },
  { part: "reader", sub: "method", pins: ["L-method-member"] },
  { part: "reader", sub: "an element access", pins: ["L-element"] },
  { part: "reader", sub: "string", pins: ["L-element"] },
  { part: "reader", sub: "no-substitution template", pins: ["L-element-template"] },
  { part: "reader", sub: "such a string", pins: ["L-spread-string"] },
  { part: "reader", sub: "a literal every member or element of which is one", pins: ["U-spread-strings", "L-spread-object-strings"] },
];

const WITNESS: Readonly<Record<string, string>> = {
  "G-NS1": "IDS:open name>namespace|written",
  "G-NS1-ctl": "IDS:sealed",
  "G-NS-bare": "IDS:open name|written",
  "G-NS5": "IDS:open name>namespace|other",
  "G-NS2": "IDS:open import-equals>name>namespace|written",
  "G-NS4": "IDS:open import>name>namespace|written",
  "G-NS7": "IDS:open namespace-import>name>namespace|written",
  "G-NS6": "IDS:open name>namespace|other",
  "G-NS3": "WORDS:open name>namespace|written",
  "G-NS3-ctl": "WORDS:sealed",
  "P18-IE1": "IDS:open import-equals>namespace-import>name|written",
  "P18-IE1-near": "IDS:open namespace-import>name|written",
  "P18-IE1-ctl": "IDS:sealed",
  "P18-IE2": "IDS:open import>import-equals>namespace-import>name|written",
  "P18-IE3": "IDS:open import-equals>namespace-import>name|written",
  "P18-HER1": "IDS:open import>name|other|heritage",
  "P18-HER1-near": "IDS:open import>name|other",
  "P18-HER1b": "IDS:open import>name|other|heritage",
  "P18-HER1b-near": "IDS:open import>name|other",
  "P18-HER2": "IDS:open name|other|heritage",
  "P18-HER2b": "IDS:open name|other|heritage",
  "P18-HER3-near": "IDS:open import>name|written|heritage",
  "P18-LEAF-IE": "WORDS:open import-equals>namespace-import>name|written",
  "P18-LEAF-HER": "WORDS:open import>name|other|heritage",
  "P18-LEAF-ctl": "WORDS:sealed",
};





/** This census's own plants' readings (FORMS, USES, VISIT and the bead's other forms). */
const OWN_WITNESS: Readonly<Record<string, string>> = {
  "NS2-scoped": "IDS:open import-equals>name>namespace|written",
  "NS4-star": "IDS:open namespace-import>name>namespace|written",
  "NS4-element": "IDS:open namespace-import>name|written",
  "NS7-alias-of-alias": "IDS:open import-equals>import-equals>name>namespace|written",
  "NS7-exported-alias": "IDS:open import-equals>import>import-equals>import>name>namespace|written",
  "NS7-module-alias": "IDS:open import-equals>import-equals>namespace-import>name>namespace|written",
  "F-name": "IDS:open name|written",
  "F-name-every": "IDS:open name|written; IDS:open name|written",
  "F-name-every-alias": "IDS:open import-equals>name>namespace|written; OTHER:open import-equals>name>namespace|written",
  "F-root-let": "IDS:sealed",
  "F-root-array": "IDS:open name|written",
  "F-root-freeze": "IDS:open name|written",
  "F-root-freeze-shadowed": "Object:open name|other",
  "F-root-freeze-nested": "IDS:open name|other; ARG:open name|other; WRAPPED:open name|other",
  "F-root-nested": "IDS+2:open name|written",
  "F-root-nested-frozen": "IDS+1:open name|written",
  "F-root-nested-spread": "IDS+2:open name|written; LIST+2:open name|written",
  "F-root-nested-deep": "IDS+2:open name|written; KEYED+1:open name|written",
  "F-import": "IDS:open import>name|written",
  "F-import-aliased": "IDS:open import>name|written",
  "F-import-default": "IDS:open import>export-alias>name|written",
  "F-export-alias": "IDS:open import>export-alias>name|written",
  "F-export-alias-renamed": "IDS:open import>export-alias>name|written",
  "F-re-export": "IDS:open import>re-export>name|written",
  "F-re-export-renamed": "IDS:open import>re-export>name|written",
  "F-re-export-chain": "IDS:open import>re-export>re-export>re-export>name|written",
  "F-export-star": "IDS:open import>export-star>name|written",
  "F-export-star-default": "IDS:sealed",
  "F-namespace-import": "IDS:open namespace-import>name|written",
  "F-namespace-import-require": "IDS:open namespace-import>name|written",
  "F-namespace": "IDS:open name>namespace|written",
  "F-namespace-element": "IDS:open name>namespace|written",
  "F-namespace-merged": "OTHER:sealed; IDS:open name>namespace|written",
  "F-namespace-nested": "IDS:open name>namespace>namespace|written",
  "F-namespace-dotted": "IDS:open name>namespace>namespace|written",
  "F-namespace-scoped": "IDS:open name>namespace|written",
  "F-namespace-imported": "IDS:open import>name>namespace|written",
  "F-namespace-unexported": "IDS:sealed",
  "F-import-equals": "IDS:open import-equals>name>namespace|written",
  "F-heritage": "IDS:open name|other|heritage",
  "U-written": "IDS:open name|written",
  "U-written-element": "IDS:open name|written",
  "U-written-wrapped": "IDS:open name|written; DOUBLE:open name|written",
  "U-written-through-wrappers": "IDS:open name|written; DOUBLE:open name|written",
  "U-written-compound": "IDS:open name|written",
  "U-written-logical": "IDS:open name|written",
  "U-written-operators": "ADD:open name|written; SUB:open name|written; MUL:open name|written; DIV:open name|written; MOD:open name|written; POW:open name|written; SHL:open name|written; SHR:open name|written; USHR:open name|written; AND:open name|written; OR:open name|written; XOR:open name|written; LAND:open name|written; LOR:open name|written; NULLISH:open name|written",
  "U-written-update": "IDS:open name|written",
  "U-written-decrement": "IDS:open name|written",
  "U-written-delete": "IDS:open name|written",
  "U-written-destructuring": "IDS:open name|written",
  "U-written-array-destructuring": "IDS:open name|written",
  "U-written-rest-property": "IDS+1:open name|written",
  "U-written-nested-pattern": "ARR:open name|written; OBJ+1:open name|written",
  "U-written-for-of": "IDS:open name|written",
  "U-written-for-in": "IDS:open name|written",
  "U-other": "IDS:open name|other",
  "U-other-bound": "IDS:open name|other",
  "U-other-returned": "IDS:open name|other",
  "U-other-export-default": "IDS:open name|other",
  "U-other-literal": "IDS:open name|other; holder:sealed",
  "U-other-called": "IDS:open name|other",
  "U-other-non-string": "IDS:open name|other",
  "U-other-read": "IDS:sealed",
  "U-spread": "IDS:open name|spread; copy:sealed",
  "U-spread-array": "IDS:open name|spread; copy:sealed",
  "U-spread-shares-array": "IDS+1:open name|spread; copy:open name|other",
  "U-spread-strings": "IDS:sealed; argv:sealed",
  "U-whole": "IDS:open name|whole; OTHER:open name|whole",
  "U-whole-element": "IDS:open name|whole",
  "U-whole-namespace-import": "IDS:open namespace-import|whole",
  "U-whole-namespace-reaches": "HIDDEN:open name|whole; DEEP:open name|whole; LOCAL:open name|whole",
  "U-whole-module-reaches": "DEEP:open namespace-import|whole; NAMED:open namespace-import|whole",
  "U-export-form": "IDS:open namespace-import|export-form",
  "U-export-form-reexported": "IDS:open namespace-import|export-form",
  "U-export-form-reaches": "IDS:open namespace-import|export-form; OTHER:open namespace-import|export-form",
  "U-written-logical-and": "IDS:open name|written",
  "U-written-nullish": "IDS:open name|written",
  "U-written-rest-element": "IDS+1:open name|written",
  "U-written-head-array": "IDS:open name|written",
  "U-written-head-object": "IDS:open name|written",
  "U-spread-shares-object": "IDS+1:open name|spread; copy:open name|written",
  "F-root-satisfies": "IDS:open name|written",
  "F-root-type-assertion": "IDS:open name|written",
  "F-root-non-null": "IDS:open name|written",
  "F-root-paren": "IDS:open name|written",
  "F-root-as": "IDS:open name|written",
  "F-root-nested-element": "IDS+1:open name|written",
  "F-root-nested-wrapped": "IDS+1:open name|written",
  "F-namespace-re-exported": "IDS:open import>re-export>name>namespace|written",
  "F-namespace-star-exported": "IDS:open import>export-star>name>namespace|written",
  "F-namespace-export-aliased": "IDS:open import>export-alias>name>namespace|written",
  "F-namespace-member-alias": "IDS:open name>namespace>import-equals>name>namespace|written",
  "U-whole-namespace-alias": "IDS:open name|whole",
  "U-whole-module-re-export": "IDS:open namespace-import|whole",
  "U-other-shorthand": "IDS:open name|other; holder:open name|written",
  "F-export-default": "IDS:open import>export-alias>name|written,name|other",
  "U-export-form-export-import": "IDS:open import-equals>namespace-import|export-form",
  "U-export-form-namespace-scope": "IDS:open import-equals>namespace-import|export-form",
  "U-export-form-alias-exported": "IDS:open import-equals>namespace-import|export-form",
  "U-export-form-renamed": "IDS:open namespace-import|export-form",
  "U-export-form-export-require": "IDS:open namespace-import|export-form",
  "U-export-form-require": "IDS:open namespace-import|export-form",
  "F-root-freeze-callee": "Swap:open name|other",
  "F-root-freeze-callee-writes": "Writer:open name|other",
  "F-root-freeze-binds-parameter": "KEEP:sealed",
  "F-root-freeze-binds-binding": "KEEP:sealed; holder+1:open name|other",
  "F-root-freeze-binds-function": "KEEP:sealed",
  "F-root-freeze-binds-function-expression": "KEEP:sealed",
  "F-root-freeze-binds-class": "KEEP:sealed",
  "F-root-freeze-binds-class-expression": "KEEP:sealed",
  "F-root-freeze-binds-namespace": "KEEP:sealed",
  "F-root-freeze-binds-default-import": "KEEP:sealed",
  "F-root-freeze-binds-namespace-import": "KEEP:sealed",
  "F-root-freeze-binds-named-import": "KEEP:sealed; Object:open import>name|other",
  "F-root-freeze-binds-import-equals": "KEEP:sealed",
  "F-root-freeze-binds-inner-scope": "KEEP:sealed; Object:open name|other",
  "F-root-freeze-other-method": "KEEP:sealed",
  "U-spread-accessor": "IDS:open name|spread; copy:sealed",
  "U-whole-module-named-re-export": "IDS:open namespace-import|whole",
  "F-root-freeze-other-spellings": "KEEP:sealed; KEEP:sealed; KEEP:sealed",
  "F-root-freeze-arguments": "KEEP:sealed; KEEP:sealed",
  "F-root-freeze-binds-scopes": "ARROW:sealed; BLOCK:sealed; Object:open name|other; CAUGHT:sealed; LOOPED:sealed; SPACE:sealed; Object:open name|other; NESTED:sealed; STATIC:sealed; Object:open name|other",
  "F-root-freeze-binds-elsewhere": "KEEP:sealed; Object:open name|other; KEEP:sealed",
  "F-root-freeze-binds-variable-kinds": "LET:sealed; VAR:sealed",
  "F-root-freeze-binds-parameter-kinds": "METHOD:sealed",
  "F-root-freeze-binds-binding-kinds": "ARRAY:sealed; DESTRUCTURED:sealed; RENAMED:sealed; holder+1:open name|other",
  "F-root-freeze-binds-nested-declarations": "NESTED_CLASS:sealed; NESTED_SPACE:sealed",
  "F-root-freeze-binds-renamed-import": "RENAMED_IMPORT:sealed; swapper:open import>name|other",
  "U-spread-member-kinds": "BASE:sealed; IDS:open name|spread; copy:sealed; IDS:open name|spread; copy:sealed; IDS:open name|spread; copy:sealed; IDS:open name|spread; copy:sealed; IDS:open name|spread; copy:sealed; inner:open name|other; IDS:open name|spread; copy:sealed; BASE:sealed; IDS:open name|spread; copy:sealed",
  "U-whole-module-default-import": "D:open namespace-import|whole",
  "U-whole-module-scopes": "IDS:open namespace-import|whole; HIDDEN:open namespace-import|whole; LOCAL:open namespace-import|whole",
  "U-whole-module-re-export-reaches": "IDS:open namespace-import|whole; OTHER:open namespace-import|whole",
  "U-whole-namespace-merged": "IDS:open name|whole; OTHER:open name|whole",
  "U-whole-member-reached": "IDS:open name>namespace|whole; OTHER:open namespace-import>name|whole",
  "VISIT-OUT": "IDS:sealed; IDS:sealed; Iface:sealed; other:open name|written",
  "VISIT-OUT-NAMES": "IDS:sealed; IDS:sealed; meta:sealed; target:sealed; HUB:sealed; SPARE:sealed; obj:sealed",
  "VISIT-IN": "CALLEE:open name|other; ARG:open name|other; NEW_ARG:open name|other; RET:open name|other; INIT:open name|other; PROP:open name|other; prop:sealed; ELEMENT:open name|other; element:sealed; SPREAD_EL:open name|spread; spreadEl:sealed; SPREAD_PROP:open name|spread; spreadProp:sealed; TEMPLATE:open name|other; BINARY:open name|other; COND:open name|other; KEY:open name|other; COMPUTED:open name|other; computed:sealed; PARAM:open name|other; FIELD:open name|other; BIND:open name|other; ENUM_INIT:open name|other; FOR_OF:open name|other; THROWN:open name|other; AWAITED:open name|other; YIELDED:open name|other; TYPEOF:open name|other; VOIDED:open name|other; NEGATED:open name|other; ARROW:open name|other; AS:open name|other; SATISFIED:open name|other; NON_NULL:open name|other; ASSERTED:open name|other; PAREN:open name|other; SWITCHED:open name|other; CASED:open name|other; IF:open name|other; WHILE:open name|other; DO:open name|other; FOR_INIT:open name|other; FOR_COND:open name|other; FOR_INCR:open name|other; FOR_IN:open name|other; TAGGED:open name|other; DECORATOR:open name|other; STATEMENT:open name|other; IN_RIGHT:open name|other; OPTIONAL:open name|other",
};
/** LITERAL_READER's readings. */
const READER_WITNESS: Readonly<Record<string, string>> = {
  "L-last-key": "IDS:open name|other",
  "L-unread-key": "IDS:open name|other",
  "L-spread-member": "BASE:sealed; IDS:open name|other",
  "L-accessor-member": "IDS:open name|other",
  "L-method-member": "IDS:open name|other",
  "L-element": "IDS:sealed",
  "L-element-template": "IDS:sealed",
  "L-spread-string": "IDS:sealed; letters:sealed",
  "L-spread-object-strings": "IDS:sealed; copy:sealed",
  "L-template": "IDS:sealed",
  "L-forms": "A:sealed; B:sealed; reads:sealed",
  "L-one-literal": "IDS:open name|other; IDS+1:open name|other",
};
/** Each residual's quiet reading (and each R-DEEP-CHAIN bound row's open one). */
const RESIDUAL_WITNESS: Readonly<Record<string, string>> = {
  "R-CODE-IN-STRING": "IDS:sealed",
  "R-DYNAMIC-IMPORT": "IDS:sealed",
  "R-REQUIRE-CALL": "IDS:sealed",
  "R-ABSOLUTE-SPECIFIER": "IDS:sealed",
  "R-NON-TS-MODULE": "IDS:sealed",
  "R-OUTSIDE-SRC": "IDS:sealed",
  "R-DEEP-RE-EXPORT-BOUND": "IDS:open import>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>re-export>name|written",
  "R-DEEP-RE-EXPORT": "IDS:sealed",
  "R-DEEP-EXPORT-STAR-BOUND": "IDS:open import>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>export-star>name|written",
  "R-DEEP-EXPORT-STAR": "IDS:sealed",
  "R-DEEP-NAMESPACE-BOUND": "IDS:open name>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace>namespace|written",
  "R-DEEP-NAMESPACE": "IDS:sealed",
  "R-DEEP-ALIAS-BOUND": "IDS:open import-equals>import-equals>import-equals>import-equals>import-equals>import-equals>import-equals>import-equals>import-equals>import-equals>name>namespace|written",
  "R-DEEP-ALIAS": "IDS:sealed",
  "R-DEEP-EXPORT-IMPORT-BOUND": "IDS:open import>import-equals>import>import-equals>import>import-equals>import>import-equals>import>import-equals>import>import-equals>name>namespace|written",
  "R-DEEP-EXPORT-IMPORT": "IDS:sealed",
  "R-DEEP-FREEZE-BOUND": "KEEP:sealed; IDS:open name|written",
  "R-DEEP-FREEZE": "KEEP:sealed",
  "R-PATCHED-FREEZE": "IDS:sealed; IDS:sealed",
  "R-PATCHED-ITERATOR": "IDS:sealed; argv:sealed",
};
/** Every planted pin's page: the digest of its modules (paths and texts), measured at the cut. */
const PAGES: Readonly<Record<string, string>> = {
  "G-NS1": "44011f1bcc6bbf50",
  "G-NS1-ctl": "29a890964630a3e8",
  "G-NS-bare": "e278360889ac53fb",
  "G-NS2": "a30305ef1c850b5a",
  "G-NS3": "ed218d75fd514abd",
  "G-NS3-ctl": "85132d7a21d0ddb3",
  "G-NS4": "08a3164bbc1d5e13",
  "G-NS5": "3c792c5e96df6e4e",
  "G-NS6": "df7685a582ebc2b9",
  "G-NS7": "deab0c424a8d31d1",
  "P18-IE1": "815bcd6b4badbfa4",
  "P18-IE1-near": "e6d78cd9fc0c2336",
  "P18-IE1-ctl": "79c663ab386fc192",
  "P18-IE2": "14ef52cf04201535",
  "P18-IE3": "984e6effbf16147b",
  "P18-HER1": "a58c93b0966b22df",
  "P18-HER1-near": "38c08d2c80298aed",
  "P18-HER1b": "cd679827927d5011",
  "P18-HER1b-near": "d07019e5141e8cab",
  "P18-HER2": "61f4bacaa8ee07de",
  "P18-HER2b": "1516bcc7f6d88149",
  "P18-HER3-near": "6344dcea1c45650a",
  "P18-LEAF-IE": "1eaa34ccc4f70039",
  "P18-LEAF-HER": "e4d90f7afc051300",
  "P18-LEAF-ctl": "d9b82b76a4f01b3c",
  "NS2-scoped": "434b5d92c777595d",
  "NS4-star": "a0d4d0b62738ad24",
  "NS4-element": "46ff1c18afa63f89",
  "NS7-alias-of-alias": "7499a04778f993bb",
  "NS7-exported-alias": "7e0a29173590eabc",
  "NS7-module-alias": "bf355ff99c8b762d",
  "F-name": "4366cb2227c8344f",
  "F-name-every": "441cb3bd337da412",
  "F-name-every-alias": "e9af1ff1cf13d285",
  "F-root-let": "03fe6d4a6bad571d",
  "F-root-array": "08f19180fc7a2044",
  "F-root-freeze": "5d51f721a7866cda",
  "F-root-freeze-shadowed": "9c0d4ed495aa469b",
  "F-root-freeze-nested": "1da083fc10f5f3e9",
  "F-root-nested": "cfe295a828518bf5",
  "F-root-nested-frozen": "247a95ddf1f7b82a",
  "F-root-nested-spread": "cdce8b5e79532e51",
  "F-root-nested-deep": "f1119e5e56b2b075",
  "F-import": "a95067dfc5225875",
  "F-import-aliased": "8042648a322a0ef2",
  "F-import-default": "be582f37d35c8233",
  "F-export-alias": "53554cca4c0bb94c",
  "F-export-alias-renamed": "a4cc107bc31604ce",
  "F-re-export": "196bd525e0aa213e",
  "F-re-export-renamed": "ae420a637a3785db",
  "F-re-export-chain": "ce637117ce4b4a4c",
  "F-export-star": "8add5c26a253a1fc",
  "F-export-star-default": "0beddb41c3c4257f",
  "F-namespace-import": "8115337aab1dd7da",
  "F-namespace-import-require": "21d926bbeefbe23c",
  "F-namespace": "78f67c15081a46e9",
  "F-namespace-element": "89b939976bf453d1",
  "F-namespace-merged": "0df7ced1a14a0724",
  "F-namespace-nested": "3e82d96704bdb70b",
  "F-namespace-dotted": "addafe5e97577899",
  "F-namespace-scoped": "447a8c2589ef49d3",
  "F-namespace-imported": "a3b52fb629e74f16",
  "F-namespace-unexported": "96a567a9fdad8e91",
  "F-import-equals": "5fefc2fd6b5395ed",
  "F-heritage": "30fe7511735bea33",
  "U-written": "15d958b493c77c91",
  "U-written-element": "c0b68fac6b0b8a7b",
  "U-written-wrapped": "289e189d558eb1b5",
  "U-written-through-wrappers": "7d39a5c81d9c891e",
  "U-written-compound": "0f1ff54720b082c1",
  "U-written-logical": "06c35a7a63be50ed",
  "U-written-operators": "cbc23dcd72b20708",
  "U-written-update": "b48aabc13e34dba7",
  "U-written-decrement": "63391656e69da8b9",
  "U-written-delete": "f488d2b4718846a7",
  "U-written-destructuring": "fb9498b138d10f3d",
  "U-written-array-destructuring": "d81b0c879d5ad4ab",
  "U-written-rest-property": "f416c343c774b5a7",
  "U-written-nested-pattern": "f080200366498455",
  "U-written-for-of": "6117aad0bef87b53",
  "U-written-for-in": "8d4ec8cef25479b6",
  "U-other": "d9dc35e17569b6b7",
  "U-other-bound": "35aff5779c2d5f05",
  "U-other-returned": "c918f544e34cf9ed",
  "U-other-export-default": "53de1eaab584064e",
  "U-other-literal": "d90cc239dd22172d",
  "U-other-called": "3e49b86b98a6afe6",
  "U-other-non-string": "e70f11b367071c4f",
  "U-other-read": "41bea2389faf9cf9",
  "U-spread": "b99daa021a564e6a",
  "U-spread-array": "d81d8d828194c28e",
  "U-spread-shares-array": "7961a9aaf0e62d94",
  "U-spread-strings": "b9bebea65d51f5dc",
  "U-whole": "8a50b3f91437c645",
  "U-whole-element": "47543a4f45ed0fbc",
  "U-whole-namespace-import": "11246aaba97e20b6",
  "U-whole-namespace-reaches": "d7c848fc672b8980",
  "U-whole-module-reaches": "996be490f10dccf1",
  "U-export-form": "79d3fe549e4c93c2",
  "U-export-form-reexported": "62aa63798aa55758",
  "U-export-form-reaches": "ab849120d10ddd22",
  "U-written-logical-and": "714c6c4fcfe07cf6",
  "U-written-nullish": "b790d5ad7c88cc6d",
  "U-written-rest-element": "435157959d1fda46",
  "U-written-head-array": "2a4221878a9ca697",
  "U-written-head-object": "e4aeee984afccfea",
  "U-spread-shares-object": "5d9265f18b03940e",
  "F-root-satisfies": "2da9852868c9a20d",
  "F-root-type-assertion": "d85a636a9afae159",
  "F-root-non-null": "af0c48a669fde77c",
  "F-root-paren": "be5ccf4104c59edf",
  "F-root-as": "a212e87eb08e12e2",
  "F-root-nested-element": "2f176b828734c5c4",
  "F-root-nested-wrapped": "fa1ef646de417863",
  "F-namespace-re-exported": "44e191ecde713c4a",
  "F-namespace-star-exported": "7cd1c6771f9d4009",
  "F-namespace-export-aliased": "e0f5c377844f96dd",
  "F-namespace-member-alias": "00e9456a700baad5",
  "U-whole-namespace-alias": "372abc56cbbbf227",
  "U-whole-module-re-export": "d0bb5cadb9700b9b",
  "U-other-shorthand": "553781de9ac015cf",
  "F-export-default": "4623b6bcec96fc43",
  "U-export-form-export-import": "f0bf5093f9174934",
  "U-export-form-namespace-scope": "89a825c2ac2032eb",
  "U-export-form-alias-exported": "7710d4f125207b0d",
  "U-export-form-renamed": "27fad26c4c30f2f9",
  "U-export-form-export-require": "c96c5a766ce048f6",
  "U-export-form-require": "82fe1c6565faca52",
  "F-root-freeze-callee": "6f851ff206d79cc4",
  "F-root-freeze-callee-writes": "4a978e1b2bd58c7f",
  "VISIT-OUT": "e7b091f6a4bd5a89",
  "VISIT-OUT-NAMES": "5db4195d833f95cc",
  "VISIT-IN": "53e250302249cf1f",
  "L-last-key": "d6d5ed168f543228",
  "L-unread-key": "649fdb3e3d0c4ce5",
  "L-spread-member": "4b1dc0e12caaa2e2",
  "L-accessor-member": "e34080659ecc326c",
  "L-method-member": "1279c1f9eb7fcfa3",
  "L-element": "d9dad0ef83fc4a38",
  "L-element-template": "83e14bb519c8d2a4",
  "L-spread-string": "c230d505ea85599f",
  "L-spread-object-strings": "0dcfc31489a8c5d2",
  "L-template": "1a6929485ba9f839",
  "L-forms": "0f7cb277dfa40472",
  "R-CODE-IN-STRING": "3dec0e7ca09e023e",
  "R-DYNAMIC-IMPORT": "28f96079fad69526",
  "R-REQUIRE-CALL": "1e364e2552cce643",
  "R-ABSOLUTE-SPECIFIER": "fbaf32134da9ddc4",
  "R-NON-TS-MODULE": "8ed3fc4d9e901959",
  "R-OUTSIDE-SRC": "8fa210e1ec39e0ec",
  "R-DEEP-RE-EXPORT-BOUND": "bca427be10781fff",
  "R-DEEP-RE-EXPORT": "843fdf4312be51ca",
  "R-DEEP-EXPORT-STAR-BOUND": "0d8c61f04777721c",
  "R-DEEP-EXPORT-STAR": "a199151f54332b0c",
  "R-DEEP-NAMESPACE-BOUND": "6b2a660522b146dc",
  "R-DEEP-NAMESPACE": "d9adc96dd93f29c3",
  "R-DEEP-ALIAS-BOUND": "bb4d6c9ad187b12c",
  "R-DEEP-ALIAS": "4cc91d9183ea03a2",
  "R-DEEP-EXPORT-IMPORT-BOUND": "60b02693819af7ca",
  "R-DEEP-EXPORT-IMPORT": "58b399b5aa685a73",
  "R-DEEP-FREEZE-BOUND": "7dbe70b2e2b81634",
  "R-DEEP-FREEZE": "4e568751b542f398",
  "F-root-freeze-binds-parameter": "c1238123c96b117b",
  "F-root-freeze-binds-binding": "439e92ab79c27f0a",
  "F-root-freeze-binds-function": "402dd8ba3293c0d0",
  "F-root-freeze-binds-function-expression": "ab296dd134a6c526",
  "F-root-freeze-binds-class": "a7a1e67ffbe4849c",
  "F-root-freeze-binds-class-expression": "b7b51830c69fc75c",
  "F-root-freeze-binds-namespace": "68448bdb9dbc6997",
  "F-root-freeze-binds-default-import": "ae912665feb8f563",
  "F-root-freeze-binds-namespace-import": "b7e3cfc8ee7f54ea",
  "F-root-freeze-binds-named-import": "df55571b6fa82903",
  "F-root-freeze-binds-import-equals": "30db06fd9a266ebc",
  "F-root-freeze-binds-inner-scope": "351b532d248a3b71",
  "F-root-freeze-other-method": "0bee1c7bf423424c",
  "U-spread-accessor": "3e443c54ece602c3",
  "U-whole-module-named-re-export": "e00210d8ed988b48",
  "F-root-freeze-other-spellings": "d4992e9965a0523a",
  "F-root-freeze-arguments": "71e8096bf6f6453b",
  "F-root-freeze-binds-scopes": "8b1512d3d710f20f",
  "F-root-freeze-binds-elsewhere": "dd9851da81b733c3",
  "F-root-freeze-binds-variable-kinds": "d79d2a4670cf6a89",
  "F-root-freeze-binds-parameter-kinds": "b07011748d274867",
  "F-root-freeze-binds-binding-kinds": "213dfcdeb2e1d6c4",
  "F-root-freeze-binds-nested-declarations": "3ec4d053336c8c43",
  "F-root-freeze-binds-renamed-import": "1be4179bbe7b7792",
  "U-spread-member-kinds": "fadc804171e68142",
  "U-whole-module-default-import": "ed83169c14449551",
  "U-whole-module-scopes": "a03ab0db1e5a68d5",
  "U-whole-module-re-export-reaches": "de1e05eceb4afbaa",
  "U-whole-namespace-merged": "2efeada53afaa47f",
  "U-whole-member-reached": "18f9ed04bf4c0743",
  "L-one-literal": "dbcf85a88e9693f3",
  "R-PATCHED-FREEZE": "605e9f823a9fc287",
  "R-PATCHED-ITERATOR": "64485351cb9f1cbb",
};

const PLANTS: Readonly<Record<string, Modules>> = { ...GATE_PLANTS, ...OWN_PLANTS, ...READER_PLANTS, ...RESIDUAL_PLANTS };
const ALL_WITNESS: Readonly<Record<string, string>> = { ...WITNESS, ...OWN_WITNESS, ...READER_WITNESS, ...RESIDUAL_WITNESS };

/** A pin's reading and its page: what its tree reads, and the digest of the modules it reads (a swapped plant reds its row). */
function plantReading(pin: string): string {
  const modules = PLANTS[pin];
  return `${reading(plantedTree(modules))} #${pageDigest(modules)}`;
}
/** Where a placed plant's modules go in the real src tree (one directory per pin). */
const PLACED = "src/workbench/sealed-scan-plants/";
/** Every planted pin's modules, each moved under its own directory of the real src tree (relative imports kept). */
function placed(pins: readonly string[]): { readonly tree: ModuleTree; readonly dirs: Readonly<Record<string, string>> } {
  const modules: Record<string, string> = {};
  const dirs: Record<string, string> = {};
  for (const pin of pins) {
    const dir = `${PLACED}${pin}/`;
    dirs[pin] = dir;
    for (const [path, text] of Object.entries(PLANTS[pin])) {
      expect(path.startsWith(P), `${pin}: every placed module sits under ${P}`).toBe(true);
      modules[`${dir}${path.slice(P.length)}`] = text;
    }
  }
  return { tree: overlayTree(SRC, modules), dirs };
}
/** The forms (channels, and heritage) and the uses a set of pins measures: every reached reference that opens a literal. */
function measured(pins: readonly string[]): { readonly forms: string[]; readonly uses: string[] } {
  const forms = new Set<string>();
  const uses = new Set<string>();
  for (const pin of pins) {
    for (const reach of sealedScan(plantedTree(PLANTS[pin])).reached) {
      if (reach.use === undefined) continue;
      for (const link of reach.via) forms.add(link);
      if (reach.heritage) forms.add("heritage");
      uses.add(reach.use);
    }
  }
  return { forms: [...forms].sort(), uses: [...uses].sort() };
}

/* ---------------------------------------------------------------- ANCHORS */

function exportRow(): { readonly title: string; readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown; notes?: unknown };
    if (row.id === BEAD && typeof row.title === "string" && typeof row.description === "string") return { title: row.title, description: row.description, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${EXPORT} holds no ${BEAD} row`);
}
/** This file's leading doc comment, each line's ` * ` prefix removed. */
function headerLines(): string[] {
  const text = readFileSync(join(REPO, SELF), "utf8");
  const end = text.indexOf("*/");
  expect(text.startsWith("/**") && end > 0, "the census opens with its header").toBe(true);
  return text
    .slice(3, end)
    .split("\n")
    .map((line) => line.replace(/^ \* ?/, "").replace(/^ \*$/, ""));
}
/** A header paragraph, unwrapped: from the line that starts with `opening` to the next empty line, joined by single spaces. */
function headerParagraph(opening: string): string {
  const lines = headerLines();
  const start = lines.findIndex((line) => line.startsWith(opening));
  expect(start, `the header holds a paragraph opening ${opening}`).toBeGreaterThan(0);
  const end = lines.indexOf("", start);
  return lines.slice(start, end).join(" ");
}
/** The header's RESIDUALS paragraph as `${family}:${rows}` (each `FAMILY [rows: a, b]` entry, in order; a wrapped entry's indents read as one space). */
function residualParagraph(): string[] {
  const lines = headerLines();
  const start = lines.findIndex((line) => line.startsWith("RESIDUALS (named"));
  const end = lines.findIndex((line, index) => index > start && line.startsWith("NOT CLAIMED"));
  const text = lines.slice(start, end).join(" ").replace(/ {2,}/g, " ");
  return [...text.matchAll(/(R-[A-Z-]+[A-Z]) \[rows: ([^\]]+)\]/g)].map((match) => `${match[1]}:${match[2].split(", ").join(",")}`);
}
/** The gate plants a requirement label names: G-NS<n>[-ctl], P18 shapes (an `A/B/C` list expands), and the near and ctl it implies. */
function anchoredTokens(label: string): string[] {
  const tokens: string[] = [];
  for (const match of label.matchAll(/\bG-NS\d+(?:-ctl)?\b/g)) tokens.push(match[0]);
  for (const match of label.matchAll(/\bP18-((?:LEAF-)?[A-Z]+\d*[a-z]?)((?:\/[A-Z]+\d*[a-z]?)*)/g)) {
    tokens.push(`P18-${match[1]}`);
    for (const more of match[2].split("/").filter((part) => part !== "")) tokens.push(`P18-${more}`);
  }
  const first = tokens[0];
  if (first !== undefined && /\bnear reds\b/.test(label)) tokens.push(`${first}-near`);
  if (first !== undefined && /\bctl reds\b/.test(label) && !tokens.some((token) => token.endsWith("-ctl"))) tokens.push(`${first}-ctl`);
  return tokens;
}

/* ---------------------------------------------------------------- the census */

/** Every claim part, in claim order: what the SUBFORMS table answers. */
const CLAIM_PARTS: readonly ClaimPart<string>[] = [SEALED_ROOT, SEALED_VISIT, ...SEALED_FORMS, ...SEALED_USES, READER_CLAIM];
/** The Acceptance rows' pins, one check (and one test) each. */
const PIN_CHECKS: Readonly<Record<string, () => void>> = {
  // HOLLOWINGS: every gate plant placed in the real src tree reads as it reads alone, and every real src module reads exactly as it reads without them.
  "src-gate-plants": () => {
    const pins = Object.keys(GATE_PLANTS);
    const { tree, dirs } = placed(pins);
    expect(Object.fromEntries(pins.map((pin) => [pin, reading(tree, dirs[pin])]))).toStrictEqual(Object.fromEntries(pins.map((pin) => [pin, WITNESS[pin]])));
    expect(reading(tree, (path) => !path.startsWith(PLACED))).toBe(reading(SRC));
  },
  // SRC: today no src reference reaches a literal through a namespace, an import-equals alias or a class extends expression.
  "src-no-new-channel": () => {
    const novel = sealedScan(SRC).reached.filter((reach) => reach.via.includes("namespace") || reach.via.includes("import-equals") || reach.heritage);
    expect(novel.map((reach) => `${reach.file}:${reach.line} ${formOf(reach)}`)).toStrictEqual([]);
  },
  // SRC: the scan reads the real tree (modules, roots, both readings, the name and import channels in use).
  "src-live": () => {
    const tree = SRC;
    const seals = sealedScan(tree);
    const roots = [...seals.rootOf].filter(([node, root]) => node === root).map(([, root]) => root);
    expect({
      modules: tree.paths().length > 100,
      roots: roots.length > 100,
      sealed: roots.some((root) => !seals.open.has(root)),
      open: roots.some((root) => seals.open.has(root)),
      name: seals.reached.some((reach) => reach.via[0] === "name"),
      import: seals.reached.some((reach) => reach.via[0] === "import"),
    }).toStrictEqual({ modules: true, roots: true, sealed: true, open: true, name: true, import: true });
  },
  // SRC: every FORMS, USES and VISIT plant placed in the real src tree reads as it reads alone.
  "src-own-plants": () => {
    const pins = [...FORM_PINS, ...USE_PINS, ...VISIT_PINS];
    const { tree, dirs } = placed(pins);
    expect(Object.fromEntries(pins.map((pin) => [pin, reading(tree, dirs[pin])]))).toStrictEqual(Object.fromEntries(pins.map((pin) => [pin, OWN_WITNESS[pin]])));
  },
  // CLAIM: the header's SEALED paragraph is the helper's SEALED_CLAIM, byte-for-byte.
  "claim-text": () => {
    expect(headerParagraph("SEALED: ")).toBe(SEALED_CLAIM);
  },
  // CLAIM: the header's LITERAL_READER paragraph is the helper's READER_CLAIM, byte-for-byte.
  "reader-text": () => {
    expect(headerParagraph("LITERAL_READER: ")).toBe(`LITERAL_READER: ${READER_CLAIM.text}`);
  },
  // CLAIM: the planted rows measure exactly SEALED_FORMS, and each form's designated pin F-<form> measures it.
  "forms-proven": () => {
    expect(measured(Object.keys(GATE_PLANTS).concat(Object.keys(OWN_PLANTS))).forms).toStrictEqual(SEALED_FORMS.map((form) => form.id).sort());
    expect(Object.fromEntries(SEALED_FORMS.map((form) => [form.id, measured([`F-${form.id}`]).forms.includes(form.id)]))).toStrictEqual(Object.fromEntries(SEALED_FORMS.map((form) => [form.id, true])));
  },
  // CLAIM: the planted rows measure exactly SEALED_USES, and each use's designated pin U-<use> measures it.
  "uses-proven": () => {
    expect(measured(Object.keys(GATE_PLANTS).concat(Object.keys(OWN_PLANTS))).uses).toStrictEqual(SEALED_USES.map((use) => use.id).sort());
    expect(Object.fromEntries(SEALED_USES.map((use) => [use.id, measured([`U-${use.id}`]).uses.includes(use.id)]))).toStrictEqual(Object.fromEntries(SEALED_USES.map((use) => [use.id, true])));
  },
  // CLAIM: SUBFORMS names exactly the sub-forms the claim parts list, in claim order, each a phrase of its part and each with
  // planted pins; a form's or a use's pins each measure that form or use; every F-, U-, VISIT- and L- pin is named for a listed sub-form.
  "subforms-pinned": () => {
    expect(SUBFORMS.map((entry) => `${entry.part}: ${entry.sub}`)).toStrictEqual(CLAIM_PARTS.flatMap((part) => part.subforms.map((sub) => `${part.id}: ${sub}`)));
    expect(CLAIM_PARTS.filter((part) => part.subforms.some((sub) => !part.text.includes(sub))).map((part) => part.id)).toStrictEqual([]);
    const pinsOf = (entry: Subform): readonly string[] => [...entry.pins, ...(entry.quiet ?? [])];
    expect(SUBFORMS.filter((entry) => pinsOf(entry).length === 0 || pinsOf(entry).some((pin) => PLANTS[pin] === undefined)).map((entry) => `${entry.part}: ${entry.sub}`)).toStrictEqual([]);
    const forms = new Set<string>(SEALED_FORMS.map((form) => form.id));
    const uses = new Set<string>(SEALED_USES.map((use) => use.id));
    const unmeasured = SUBFORMS.flatMap((entry) =>
      entry.pins.filter((pin) => (forms.has(entry.part) && !measured([pin]).forms.includes(entry.part)) || (uses.has(entry.part) && !measured([pin]).uses.includes(entry.part))).map((pin) => `${entry.part}: ${entry.sub} <- ${pin}`),
    );
    expect(unmeasured).toStrictEqual([]);
    const named = new Set(SUBFORMS.flatMap(pinsOf));
    expect([...FORM_PINS, ...USE_PINS, ...VISIT_PINS, ...Object.keys(READER_PLANTS)].filter((pin) => !named.has(pin))).toStrictEqual([]);
  },
};
const CHECKED_ROWS = ["HOLLOWINGS", "SRC", "CLAIM"];

const PLANTED_ROWS = ["NS1", "NS2", "NS4", "NS6", "NS7", "NS3", "IE", "HER", "LEAF", "FORMS", "USES", "VISIT", "READER", "RESIDUALS"];
function rowOf(id: string): Row {
  const row = ROWS.find((candidate) => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
}

describe("wb-jwc.8: the SEALED reference scan follows qualified, import-equals, namespace-import and alias-bound references and class extends expressions", () => {
  for (const id of PLANTED_ROWS) {
    const row = rowOf(id);
    it(`${row.id}: ${row.label}`, { timeout: SLOW_MS }, () => {
      const read = Object.fromEntries(row.pins.map((pin) => [pin, plantReading(pin)]));
      const held = Object.fromEntries(row.pins.map((pin) => [pin, `${ALL_WITNESS[pin]} #${PAGES[pin]}`]));
      expect(read).toStrictEqual(held);
    });
  }

  for (const id of CHECKED_ROWS) {
    const row = rowOf(id);
    for (const pin of row.pins) it(`${row.id} ${pin}: ${row.label}`, { timeout: SLOW_MS }, () => PIN_CHECKS[pin]());
  }

  it("ANCHOR: the tracker export's lines are the rows' labels, and every gate plant a label names is a pin of its row", { timeout: SLOW_MS }, () => {
    const row = exportRow();
    expect(row.title).toContain("SEALED reference scan covers qualified, import-equals, namespace-import and alias-bound member writes (G-NS1/NS2/NS4/NS6/NS7)");
    const descriptionLines = row.description.split("\n");
    expect(descriptionLines.filter((line) => line.startsWith("- G-NS")).map((line) => line.slice(2))).toStrictEqual(ROWS.filter((candidate) => candidate.from === "description").map((candidate) => candidate.label));
    expect(descriptionLines.filter((line) => line.startsWith("Acceptance: "))).toStrictEqual([`Acceptance: ${ACCEPTANCE_CLAUSES.join("; ")}.`]);
    expect(ROWS.filter((candidate) => candidate.from === "acceptance").map((candidate) => candidate.label)).toStrictEqual([...ACCEPTANCE_CLAUSES]);
    const ruling = row.notes.slice(row.notes.indexOf("ORCHESTRATOR RULING R-B86"));
    expect(ruling.startsWith("ORCHESTRATOR RULING R-B86"), "the export's notes hold R-B86").toBe(true);
    const members = ruling.split("\n").filter((line) => line.startsWith("- ")).slice(0, 3).map((line) => line.slice(2));
    expect(members).toStrictEqual(ROWS.filter((candidate) => candidate.from === "r-b86").map((candidate) => candidate.label));
    const named = ROWS.flatMap((candidate) => anchoredTokens(candidate.label).map((token) => [candidate.id, token] as const));
    expect(named.filter(([id, token]) => !rowOf(id).pins.includes(token))).toStrictEqual([]);
    expect(new Set(named.map(([, token]) => token)).size).toBe(named.length);
    expect(Object.keys(GATE_PLANTS).filter((pin) => !ROWS.some((candidate) => candidate.pins.includes(pin)))).toStrictEqual([]);
    expect(SEALED_FORMS.map((form) => `F-${form.id}`).filter((pin) => !rowOf("FORMS").pins.includes(pin))).toStrictEqual([]);
    expect(SEALED_USES.map((use) => `U-${use.id}`).filter((pin) => !rowOf("USES").pins.includes(pin))).toStrictEqual([]);
  });

  it("FROZEN SHAPE (standing rule 16): the rows, their pins, WITNESS's keys, SUBFORMS and the RESIDUALS roster", { timeout: SLOW_MS }, () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual([
      "NS1:4",
      "NS2:2",
      "NS4:3",
      "NS6:1",
      "NS7:4",
      "NS3:2",
      "IE:5",
      "HER:7",
      "LEAF:3",
      "HOLLOWINGS:1",
      "SRC:3",
      "CLAIM:5",
      "FORMS:70",
      "USES:59",
      "VISIT:3",
      "READER:12",
      "RESIDUALS:20",
    ]);
    expect(SUBFORMS.map((entry) => `${entry.pins.length}+${entry.quiet?.length ?? 0}`).join(" ")).toBe(
      "1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+1 1+2 1+0 2+0 2+0 2+0 1+0 1+0 2+0 1+0 1+0 2+0 1+0 1+0 2+0 1+0 4+0 2+0 1+0 1+0 1+0 1+0 1+0 2+0 1+0 1+0 1+0 1+0 1+0 2+0 2+0 1+0 1+0 2+0 2+0 1+0 2+0 1+0 2+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 0+1 1+0 1+0 1+0 1+0 1+1 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 0+1 1+0 1+0 1+0 1+0 1+0 5+0 2+0 1+0 1+0 1+0 1+0 1+0 1+0 2+0 2+0 2+0 0+1 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 4+0 2+0 2+0 1+0 3+0 1+0 2+0 1+0 3+0 2+0 2+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 2+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 1+0 2+0",
    );
    expect(Object.keys(PIN_CHECKS)).toStrictEqual(CHECKED_ROWS.flatMap((id) => rowOf(id).pins));
    expect([...PLANTED_ROWS, ...CHECKED_ROWS].sort()).toStrictEqual(ROWS.map((row) => row.id).sort());
    const planted = PLANTED_ROWS.flatMap((id) => rowOf(id).pins);
    expect(Object.keys(ALL_WITNESS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PLANTS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PAGES).sort()).toStrictEqual([...planted].sort());
    const roster = Object.entries(RESIDUALS).map(([family, rows]) => `${family}:${rows.join(",")}`);
    expect(roster).toStrictEqual([
      "R-CODE-IN-STRING:R-CODE-IN-STRING",
      "R-UNFOLLOWED-MODULE:R-DYNAMIC-IMPORT,R-REQUIRE-CALL,R-ABSOLUTE-SPECIFIER",
      "R-OUTSIDE-TREE:R-NON-TS-MODULE,R-OUTSIDE-SRC",
      "R-DEEP-CHAIN:R-DEEP-RE-EXPORT-BOUND,R-DEEP-RE-EXPORT,R-DEEP-EXPORT-STAR-BOUND,R-DEEP-EXPORT-STAR,R-DEEP-NAMESPACE-BOUND,R-DEEP-NAMESPACE,R-DEEP-ALIAS-BOUND,R-DEEP-ALIAS,R-DEEP-EXPORT-IMPORT-BOUND,R-DEEP-EXPORT-IMPORT,R-DEEP-FREEZE-BOUND,R-DEEP-FREEZE",
      "R-PATCHED-GLOBAL:R-PATCHED-FREEZE,R-PATCHED-ITERATOR",
    ]);
    expect(residualParagraph()).toStrictEqual(roster);
  });
});
