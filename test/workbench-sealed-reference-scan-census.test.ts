/**
 * wb-jwc.8 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17; the rule-19 structural-exit child of
 * wb-jwc.5, orchestrator rulings R-B74 and R-B86): the SEALED reference scan follows a const literal through qualified,
 * import-equals, namespace-import and alias-bound references and through class extends expressions.
 * Statement (the bead's export title, ASCII as exported): "SEALED reference scan covers qualified, import-equals,
 * namespace-import and alias-bound member writes (G-NS1/NS2/NS4/NS6/NS7) narrowed out of wb-jwc.5's fail-closed core
 * (rule-19 structural exit)".
 *
 * WHAT IS DELIVERED. The scan is test/helpers/sealed-reference-scan.ts (sealedScan), shared so a census rides it: wb-jwc.5's
 * census (blocked by this bead, R-B86; not on trunk) can take it in place of its own sealsOf, passing its own value reader
 * (ScanReader) and reading the { rootOf, open } shape its own sealsOf returns. This census proves the scan with planted
 * module trees and with the real src tree; src is only read. ARMED, UNREAD and C1 in the bead's lines are wb-jwc.5's census
 * verdicts; what they rest on is the scan reading this census pins: a gate plant's rewrite reads OPEN through its channel
 * (so a census reading through the const refuses it UNREAD, and its leaf reader reads the rewritten word as a
 * placeholder), a near control reads OPEN through a channel the old scan already followed, and a ctl reads SEALED (so a
 * census reads the committing initializers and arms on them).
 *
 * A READING (each pin's witness, held to WITNESS): per const literal of the pin's tree, in module and source order,
 * `name:sealed`, or `name:open` and the forms that opened it, each `<channel>>...|<use>`, `|heritage` when the reference
 * sits in a class extends expression (channels and uses are SEALED_FORMS and SEALED_USES ids, below); `name+N` when N
 * object or array literals are nested in the const's literal (each sealed or open with it). Each planted pin's witness also
 * carries its page, the digest of its modules (PAGES), so a plant swapped for another case reds its row.
 *
 * THE ROWS (ROWS: one test per planted row and one per pin of HOLLOWINGS, SRC and CLAIM; a row's label is the requirement
 * text it answers, verbatim from the tracker export):
 *  NS1, NS2, NS4, NS6, NS7, NS3: the description's six G-NS lines; each row holds the gate's own plants of refusal #4
 *   (verbatim but for the registry type import's path) and this census's plants of the line's other forms.
 *  IE, HER, LEAF: the three members R-B86 folded into this bead (the bead's R-B86 note), holding refusal #5's gate plants.
 *  HOLLOWINGS, SRC, CLAIM: the Acceptance's three clauses. HOLLOWINGS: every gate plant, placed in the real src tree,
 *   reads exactly as it does alone (each rewrite OPEN, each control SEALED), and every real src module reads exactly as
 *   it does without them. SRC: the real src tree holds no reference through a namespace, an import-equals alias or a
 *   class extends expression today, its scan is live (modules, roots, both readings, the name and import channels in
 *   use), and every FORMS and USES plant and VISIT-OUT, placed in it, reads as it does alone. CLAIM: this header's
 *   SEALED paragraph equals SEALED_CLAIM byte-for-byte, and the forms and uses the planted rows measure are exactly
 *   SEALED_FORMS and SEALED_USES, each proven by its designated pin (F-<form>, U-<use>).
 *  FORMS, USES, VISIT: the claim's proof table: a rewrite through each form and each word of it, each use and each word
 *   of it, and VISIT-OUT, one tree holding the root names only where the scan must not visit (each would open a root).
 *  READER: LITERAL_READER, the census's reader (its words in the helper's doc): a member reads as written only as the
 *   last member of its key, in a literal whose keys all read and that holds no spread, accessor or method member; an
 *   element access reads the member its string or no-substitution template literal argument names; a no-substitution
 *   template reads as a string; a spread copies strings when its value is such a literal or a literal of them.
 *  RESIDUALS: the named families below, each row's quiet reading pinned and its page held live by its modules' digest.
 *
 * THE CLAIM (test/helpers/sealed-reference-scan.ts SEALED_CLAIM, held here byte-for-byte; its numbered parts are
 * SEALED_FORMS and SEALED_USES, each proven by its designated pin and the FORMS and USES rows):
 * SEALED: a const's own object or array literal (through wrappers and .freeze(...)), and every object or array literal
 * nested in its members or elements, is sealed while no reference the scan visits opens it. The scan visits every
 * identifier of every module of the tree that is a value reference: not a part of a type (an implements clause, an
 * interface's extends clause and a class extends clause's type arguments included), a declared name, a property or
 * member name, a part of a qualified name, an import, export or import-equals name or entity, or a label. From each it
 * follows exactly these forms to a const literal: (1) its name in its own module, at any scope (a name stands for every
 * const literal, namespace, import-equals alias and import of that name the module holds); (2) an import of it, named,
 * aliased or default; (3) a local export alias (export { X }, export { X as Y }, export { X as default }); (4) a named
 * re-export (export { X } from, export { X as Y } from); (5) export * from, for every name but default; (6) a member of
 * a namespace import of its module (import * as M, or import M = require of a relative module), read by name or through
 * an element access whose argument reads; (7) a member of a TypeScript namespace that exports it (merged, nested and
 * dotted namespaces included), read by name or through an element access whose argument reads, the namespace reached by
 * any form here; (8) an import-equals alias (import A = E at any scope, export import included) whose entity E is
 * followed part by part through these forms, an alias of an alias included; (9) any of these from an identifier inside a
 * class extends expression (its type arguments aside), which runs when the class is defined and so is a value reference.
 * A reference reaching a literal opens it when (1) its member read chain is the target of an assignment of any operator,
 * of ++ or --, of delete, of a destructuring assignment or of a for-in or for-of head; (2) it is used other than as a
 * member read chain that reads as a string where it is used (passed, bound, returned, placed in a literal, called, or
 * read as anything but a string); (3) it is spread and not every value it copies reads as a string; (4) a namespace or a
 * namespace import it reaches through is used other than through member reads whose names read, which opens every
 * literal that namespace or module reaches; (5) a namespace import is re-exported or its module is re-exported by export
 * * as, which opens every literal the module reaches. Any other reference only reads, as the caller's reader decides; a
 * reference the scan does not follow is not judged, and SEALED claims nothing about it.
 *
 * RESIDUALS (named; the channels the scan does not follow; each row reads SEALED with its rewrite in place):
 *  R-CODE-IN-STRING [rows: R-CODE-IN-STRING]: a write written inside a string that code runs.
 *  R-UNFOLLOWED-MODULE [rows: R-DYNAMIC-IMPORT, R-REQUIRE-CALL, R-ABSOLUTE-SPECIFIER]: a module reached through a dynamic
 *   import, a require call, or a specifier that is not relative.
 *  R-OUTSIDE-TREE [rows: R-NON-TS-MODULE, R-OUTSIDE-SRC]: a module outside the tree (a src file that is not .ts; anything
 *   outside src).
 *  R-DEEP-CHAIN [rows: R-DEEP-CHAIN]: a channel nested deeper than the scan's resolution bound (MAX_STEPS = 32 nested
 *   steps): a chain of 40 re-exports is not followed (FORMS' F-re-export-chain, 3 deep, is).
 * NOT CLAIMED: how wb-jwc.5's census reads once it rides this scan (its file is not on trunk; the cutting seat's
 * differential run over its planted tables is a delivery-note receipt, not a pin); and edits of this file alone, with no
 * anchor outside it: a planted row that no tracker line names and that is not a designated F-/U- pin, removed together
 * with its WITNESS entry; a residual removed from this paragraph, the roster and WITNESS together. The seat battery of
 * record carries their falsifiers.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl): the bead's description lines and Acceptance
 * clauses and its R-B86 note's member lines are the ROWS' labels verbatim, and every gate plant a label names (G-NS*,
 * P18-*, with the near and ctl a label implies) is a pin of that row; the helper's SEALED_CLAIM, SEALED_FORMS and
 * SEALED_USES; the real src tree.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, WITNESS's keys are exactly the pins, and
 * the RESIDUALS roster is pinned as a `${family}:${rows}` literal equal to the RESIDUALS paragraph above.
 *
 * Display paths added: none. Test-only: every tree is read in memory; nothing is written or run.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type ModuleTree, overlayTree, plantedTree, type Reached, SEALED_CLAIM, SEALED_FORMS, SEALED_USES, sealedScan, srcTree } from "./helpers/sealed-reference-scan.js";

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

/* ---------------------------------------------------------------- this census's plants: the bead's other forms, the claim's proof table, the residuals */

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
function chain(levels: number): Modules {
  const modules: Record<string, string> = { [`m${levels}.ts`]: IDS };
  for (let level = 0; level < levels; level++) modules[`m${level}.ts`] = `export { IDS } from "./m${level + 1}.js";\n`;
  modules["setup.ts"] = `import { IDS } from "./m0.js";\nIDS.${WRITE}`;
  return under(modules);
}

const OWN_PLANTS: Readonly<Record<string, Modules>> = {
  // NS2, NS4, NS7: the forms of the bead's lines beyond the gate's plants.
  "NS2-scoped": using(`export namespace Retarget {\n  import Ids = Rf.IDS;\n  Ids.${WRITE}}\n`, RF),
  "NS4-star": under({ "ids.ts": RF, "setup.ts": `import * as ids from "./ids.js";\nids.Rf.IDS.${WRITE}` }),
  "NS4-element": written('ids["IDS"]', 'import * as ids from "./ids.js";\n'),
  "NS7-alias-of-alias": using(`import First = Rf;\nimport Second = First;\nSecond.IDS.${WRITE}`, RF),
  "NS7-exported-alias": under({ "ids.ts": RF, "hub.ts": 'import { Rf } from "./ids.js";\nexport import Ids = Rf.IDS;\n', "setup.ts": `import { Ids } from "./hub.js";\nimport Again = Ids;\nAgain.${WRITE}` }),
  "NS7-module-alias": under({ "ids.ts": RF, "setup.ts": `import * as ids from "./ids.js";\nimport Space = ids.Rf;\nimport Ids = Space.IDS;\nIds.${WRITE}` }),
  // FORMS: a rewrite through each form of SEALED_FORMS and each word of it (F-<form> is the form's designated pin).
  "F-name": using(`export function retarget(): void {\n  IDS.${WRITE}}\n`),
  "F-name-every": using(`export function retarget(): void {\n  const IDS = { id: "forge.gate.local" };\n  IDS.${WRITE}}\n`),
  "F-root-freeze": using(`IDS.${WRITE}`, 'export const IDS = Object.freeze({ id: "forge.gate.commit" }) as { id: string };\n'),
  "F-root-nested": using(`IDS.inner.${WRITE}`, 'export const IDS = { inner: { id: "forge.gate.commit" }, words: ["operation", "list"] };\n'),
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
  "F-namespace-imported": under({ "ids.ts": RF, "setup.ts": `import { Rf } from "./ids.js";\nRf.IDS.${WRITE}` }),
  "F-namespace-unexported": using(`Rf.IDS.${WRITE}`, 'export namespace Rf {\n  const IDS = { id: "forge.gate.commit" };\n  export const id: string = IDS.id;\n}\n'),
  "F-import-equals": using(`import Ids = Rf.IDS;\nIds.${WRITE}`, RF),
  "F-heritage": using("function mixin(_effect: object): ObjectConstructor {\n  return Object;\n}\nexport class Holder extends mixin(IDS) {}\n"),
  // USES: each use of SEALED_USES and each word of it, through the const's name (U-<use> is the use's designated pin).
  "U-written": using(`IDS.${WRITE}`),
  "U-written-compound": using('IDS.id += "-commit";\n'),
  "U-written-logical": using('IDS.id ||= "reactivefiber.render.commit";\n'),
  "U-written-update": using("IDS.count++;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-written-decrement": using("--IDS.count;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-written-delete": using("delete IDS.id;\n"),
  "U-written-destructuring": using('({ id: IDS.id } = { id: "reactivefiber.render.commit" });\n'),
  "U-written-array-destructuring": using('[IDS.id] = ["reactivefiber.render.commit"];\n'),
  "U-written-for-of": using('for (IDS.id of ["reactivefiber.render.commit"]) break;\n'),
  "U-written-for-in": using('for (IDS.id in { "reactivefiber.render.commit": 1 }) break;\n'),
  "U-other": using("function consume(_ids: object): void {}\nconsume(IDS);\n"),
  "U-other-bound": using("export const alias = IDS;\n"),
  "U-other-returned": using("export function ids(): object {\n  return IDS;\n}\n"),
  "U-other-literal": using("export const holder = [IDS];\n"),
  "U-other-called": using("IDS.make();\n", 'export const IDS = { id: "forge.gate.commit", make: (): string => "x" };\n'),
  "U-other-non-string": using("export const count: number = IDS.count;\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-other-read": using("export const id: string = IDS.id;\n"),
  "U-spread": using("export const copy = { ...IDS };\n", 'export const IDS = { id: "forge.gate.commit", count: 0 };\n'),
  "U-spread-array": using("export const copy = [...IDS];\n", 'export const IDS = ["forge.gate.commit", 0];\n'),
  "U-spread-strings": using('export const argv = ["--json", ...IDS];\n', 'export const IDS = ["operation", "show"];\n'),
  "U-whole": using("export const keys = Object.keys(Rf);\n", 'export namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n  export const OTHER = { id: "forge.gate.other" };\n}\n'),
  "U-whole-element": using('const key: string = "IDS";\nexport const picked = Rf[key as "IDS"];\n', RF),
  "U-whole-namespace-import": under({ "ids.ts": IDS, "setup.ts": 'import * as ids from "./ids.js";\nexport const keys = Object.keys(ids);\n' }),
  "U-export-form": under({ "ids.ts": IDS, "hub.ts": 'export * as all from "./ids.js";\n' }),
  "U-export-form-reexported": under({ "ids.ts": IDS, "hub.ts": 'import * as ids from "./ids.js";\nexport { ids };\n' }),
  "U-export-form-reaches": under({ "ids.ts": `import { OTHER } from "./other.js";\n${IDS}export const id: string = OTHER.id;\n`, "other.ts": 'export const OTHER = { id: "forge.gate.other" };\n', "hub.ts": 'export * as all from "./ids.js";\n' }),
  // VISIT: the root names only where the scan must not visit; every one would open a root if it were visited.
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
};

/** READER: LITERAL_READER's words (the census's reader), each read through the const's name; a read that reads keeps the literal SEALED. */
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
  "L-template": using(READ, "export const IDS = { id: `forge.gate.commit` };\n"),
};

/** RESIDUALS: each page holds its rewrite; the scan does not follow it, so the page reads SEALED. */
const RESIDUAL_PLANTS: Readonly<Record<string, Modules>> = {
  "R-CODE-IN-STRING": using(`const SCRIPT = "IDS.id = 'reactivefiber.render.commit'";\nfunction runScript(_script: string): void {}\nrunScript(SCRIPT);\n`),
  "R-DYNAMIC-IMPORT": under({ "ids.ts": IDS, "setup.ts": 'void import("./ids.js").then((module) => {\n  module.IDS.id = "reactivefiber.render.commit";\n});\n' }),
  "R-REQUIRE-CALL": under({ "ids.ts": IDS, "setup.ts": 'import { createRequire } from "node:module";\ncreateRequire(import.meta.url)("./ids.js").IDS.id = "reactivefiber.render.commit";\n' }),
  "R-ABSOLUTE-SPECIFIER": under({ "ids.ts": IDS, "setup.ts": `import { IDS } from "/repo/${P}ids.js";\nIDS.${WRITE}` }),
  "R-NON-TS-MODULE": { [`${P}ids.ts`]: IDS, [`${P}setup.js`]: `import { IDS } from "./ids.js";\nIDS.${WRITE}` },
  "R-OUTSIDE-SRC": { [`${P}ids.ts`]: IDS, "lib/setup.ts": `import { IDS } from "../${P}ids.js";\nIDS.${WRITE}` },
  "R-DEEP-CHAIN": chain(40),
};
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-CODE-IN-STRING": ["R-CODE-IN-STRING"],
  "R-UNFOLLOWED-MODULE": ["R-DYNAMIC-IMPORT", "R-REQUIRE-CALL", "R-ABSOLUTE-SPECIFIER"],
  "R-OUTSIDE-TREE": ["R-NON-TS-MODULE", "R-OUTSIDE-SRC"],
  "R-DEEP-CHAIN": ["R-DEEP-CHAIN"],
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
  { id: "CLAIM", from: "acceptance", label: ACCEPTANCE_CLAUSES[2], pins: ["claim-text", "forms-proven", "uses-proven"] },
  { id: "FORMS", from: "claim", label: "SEALED_FORMS", pins: FORM_PINS },
  { id: "USES", from: "claim", label: "SEALED_USES", pins: USE_PINS },
  { id: "VISIT", from: "claim", label: "SEALED_CLAIM visit", pins: ["VISIT-OUT"] },
  { id: "READER", from: "claim", label: "LITERAL_READER", pins: Object.keys(READER_PLANTS) },
  { id: "RESIDUALS", from: "claim", label: "RESIDUALS", pins: Object.values(RESIDUALS).flat() },
];

/** The gate plants' readings (refusals #4 and #5): each rewrite OPEN through its channel, each control SEALED. */
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
/** This census's own plants' readings (FORMS, USES, VISIT and the bead's other forms), and each residual's quiet reading with its page's digest. */
const OWN_WITNESS: Readonly<Record<string, string>> = {
  "NS2-scoped": "IDS:open import-equals>name>namespace|written",
  "NS4-star": "IDS:open namespace-import>name>namespace|written",
  "NS4-element": "IDS:open namespace-import>name|written",
  "NS7-alias-of-alias": "IDS:open import-equals>import-equals>name>namespace|written",
  "NS7-exported-alias": "IDS:open import-equals>import>import-equals>import>name>namespace|written",
  "NS7-module-alias": "IDS:open import-equals>import-equals>namespace-import>name>namespace|written",
  "F-name": "IDS:open name|written",
  "F-name-every": "IDS:open name|written; IDS:open name|written",
  "F-root-freeze": "IDS:open name|written",
  "F-root-nested": "IDS+2:open name|written",
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
  "F-namespace-imported": "IDS:open import>name>namespace|written",
  "F-namespace-unexported": "IDS:sealed",
  "F-import-equals": "IDS:open import-equals>name>namespace|written",
  "F-heritage": "IDS:open name|other|heritage",
  "U-written": "IDS:open name|written",
  "U-written-compound": "IDS:open name|written",
  "U-written-logical": "IDS:open name|written",
  "U-written-update": "IDS:open name|written",
  "U-written-decrement": "IDS:open name|written",
  "U-written-delete": "IDS:open name|written",
  "U-written-destructuring": "IDS:open name|written",
  "U-written-array-destructuring": "IDS:open name|written",
  "U-written-for-of": "IDS:open name|written",
  "U-written-for-in": "IDS:open name|written",
  "U-other": "IDS:open name|other",
  "U-other-bound": "IDS:open name|other",
  "U-other-returned": "IDS:open name|other",
  "U-other-literal": "IDS:open name|other; holder:sealed",
  "U-other-called": "IDS:open name|other",
  "U-other-non-string": "IDS:open name|other",
  "U-other-read": "IDS:sealed",
  "U-spread": "IDS:open name|spread; copy:sealed",
  "U-spread-array": "IDS:open name|spread; copy:sealed",
  "U-spread-strings": "IDS:sealed; argv:sealed",
  "U-whole": "IDS:open name|whole; OTHER:open name|whole",
  "U-whole-element": "IDS:open name|whole",
  "U-whole-namespace-import": "IDS:open namespace-import|whole",
  "U-export-form": "IDS:open namespace-import|export-form",
  "U-export-form-reexported": "IDS:open namespace-import|export-form",
  "U-export-form-reaches": "IDS:open namespace-import|export-form; OTHER:open namespace-import|export-form",
  "VISIT-OUT": "IDS:sealed; IDS:sealed; Iface:sealed; other:open name|written",
};
const RESIDUAL_WITNESS: Readonly<Record<string, string>> = {
  "R-CODE-IN-STRING": "IDS:sealed",
  "R-DYNAMIC-IMPORT": "IDS:sealed",
  "R-REQUIRE-CALL": "IDS:sealed",
  "R-ABSOLUTE-SPECIFIER": "IDS:sealed",
  "R-NON-TS-MODULE": "IDS:sealed",
  "R-OUTSIDE-SRC": "IDS:sealed",
  "R-DEEP-CHAIN": "IDS:sealed",
};
const PLANTS: Readonly<Record<string, Modules>> = { ...GATE_PLANTS, ...OWN_PLANTS, ...READER_PLANTS, ...RESIDUAL_PLANTS };
/** Every planted pin's page: the digest of its modules (paths and texts), measured at the cut. */
const PAGES: Readonly<Record<string, string>> = {
  "G-NS1": "44011f1bcc6bbf50",
  "G-NS1-ctl": "29a890964630a3e8",
  "G-NS-bare": "e278360889ac53fb",
  "G-NS5": "3c792c5e96df6e4e",
  "G-NS2": "a30305ef1c850b5a",
  "G-NS4": "08a3164bbc1d5e13",
  "G-NS7": "deab0c424a8d31d1",
  "G-NS6": "df7685a582ebc2b9",
  "G-NS3": "ed218d75fd514abd",
  "G-NS3-ctl": "85132d7a21d0ddb3",
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
  "F-root-freeze": "5d51f721a7866cda",
  "F-root-nested": "cfe295a828518bf5",
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
  "F-namespace-imported": "a3b52fb629e74f16",
  "F-namespace-unexported": "96a567a9fdad8e91",
  "F-import-equals": "5fefc2fd6b5395ed",
  "F-heritage": "30fe7511735bea33",
  "U-written": "15d958b493c77c91",
  "U-written-compound": "0f1ff54720b082c1",
  "U-written-logical": "06c35a7a63be50ed",
  "U-written-update": "b48aabc13e34dba7",
  "U-written-decrement": "63391656e69da8b9",
  "U-written-delete": "f488d2b4718846a7",
  "U-written-destructuring": "fb9498b138d10f3d",
  "U-written-array-destructuring": "d81b0c879d5ad4ab",
  "U-written-for-of": "6117aad0bef87b53",
  "U-written-for-in": "8d4ec8cef25479b6",
  "U-other": "d9dc35e17569b6b7",
  "U-other-bound": "35aff5779c2d5f05",
  "U-other-returned": "c918f544e34cf9ed",
  "U-other-literal": "d90cc239dd22172d",
  "U-other-called": "3e49b86b98a6afe6",
  "U-other-non-string": "e70f11b367071c4f",
  "U-other-read": "41bea2389faf9cf9",
  "U-spread": "b99daa021a564e6a",
  "U-spread-array": "d81d8d828194c28e",
  "U-spread-strings": "b9bebea65d51f5dc",
  "U-whole": "8a50b3f91437c645",
  "U-whole-element": "47543a4f45ed0fbc",
  "U-whole-namespace-import": "11246aaba97e20b6",
  "U-export-form": "79d3fe549e4c93c2",
  "U-export-form-reexported": "62aa63798aa55758",
  "U-export-form-reaches": "ab849120d10ddd22",
  "VISIT-OUT": "e7b091f6a4bd5a89",
  "L-last-key": "d6d5ed168f543228",
  "L-unread-key": "649fdb3e3d0c4ce5",
  "L-spread-member": "4b1dc0e12caaa2e2",
  "L-accessor-member": "e34080659ecc326c",
  "L-method-member": "1279c1f9eb7fcfa3",
  "L-element": "d9dad0ef83fc4a38",
  "L-element-template": "83e14bb519c8d2a4",
  "L-spread-string": "c230d505ea85599f",
  "L-template": "1a6929485ba9f839",
  "R-CODE-IN-STRING": "3dec0e7ca09e023e",
  "R-DYNAMIC-IMPORT": "28f96079fad69526",
  "R-REQUIRE-CALL": "1e364e2552cce643",
  "R-ABSOLUTE-SPECIFIER": "fbaf32134da9ddc4",
  "R-NON-TS-MODULE": "8ed3fc4d9e901959",
  "R-OUTSIDE-SRC": "8fa210e1ec39e0ec",
  "R-DEEP-CHAIN": "e2ac17f31fcda84e",
};
const READER_WITNESS: Readonly<Record<string, string>> = {
  "L-last-key": "IDS:open name|other",
  "L-unread-key": "IDS:open name|other",
  "L-spread-member": "BASE:sealed; IDS:open name|other",
  "L-accessor-member": "IDS:open name|other",
  "L-method-member": "IDS:open name|other",
  "L-element": "IDS:sealed",
  "L-element-template": "IDS:sealed",
  "L-spread-string": "IDS:sealed; letters:sealed",
  "L-template": "IDS:sealed",
};
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
/** The header's SEALED paragraph, unwrapped: from its `SEALED: ` line to the next empty line, joined by single spaces. */
function sealedParagraph(): string {
  const lines = headerLines();
  const start = lines.findIndex((line) => line.startsWith("SEALED: "));
  expect(start, "the header holds a SEALED paragraph").toBeGreaterThan(0);
  const end = lines.indexOf("", start);
  return lines.slice(start, end).join(" ");
}
/** The header's RESIDUALS paragraph as `${family}:${rows}` (each `FAMILY [rows: a, b]` entry, in order). */
function residualParagraph(): string[] {
  const lines = headerLines();
  const start = lines.findIndex((line) => line.startsWith("RESIDUALS (named"));
  const end = lines.findIndex((line, index) => index > start && line.startsWith("NOT CLAIMED"));
  const text = lines.slice(start, end).join(" ");
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
    const pins = [...FORM_PINS, ...USE_PINS, "VISIT-OUT"];
    const { tree, dirs } = placed(pins);
    expect(Object.fromEntries(pins.map((pin) => [pin, reading(tree, dirs[pin])]))).toStrictEqual(Object.fromEntries(pins.map((pin) => [pin, OWN_WITNESS[pin]])));
  },
  // CLAIM: the header's SEALED paragraph is the helper's SEALED_CLAIM, byte-for-byte.
  "claim-text": () => {
    expect(sealedParagraph()).toBe(SEALED_CLAIM);
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

  it("FROZEN SHAPE (standing rule 16): the rows, their pins, WITNESS's keys and the RESIDUALS roster", { timeout: SLOW_MS }, () => {
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
      "CLAIM:3",
      "FORMS:25",
      "USES:26",
      "VISIT:1",
      "READER:9",
      "RESIDUALS:7",
    ]);
    expect(Object.keys(PIN_CHECKS)).toStrictEqual(CHECKED_ROWS.flatMap((id) => rowOf(id).pins));
    expect([...PLANTED_ROWS, ...CHECKED_ROWS].sort()).toStrictEqual(ROWS.map((row) => row.id).sort());
    const planted = PLANTED_ROWS.flatMap((id) => rowOf(id).pins);
    expect(Object.keys(ALL_WITNESS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PLANTS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PAGES).sort()).toStrictEqual([...planted].sort());
    const roster = Object.entries(RESIDUALS).map(([family, rows]) => `${family}:${rows.join(",")}`);
    expect(roster).toStrictEqual(["R-CODE-IN-STRING:R-CODE-IN-STRING", "R-UNFOLLOWED-MODULE:R-DYNAMIC-IMPORT,R-REQUIRE-CALL,R-ABSOLUTE-SPECIFIER", "R-OUTSIDE-TREE:R-NON-TS-MODULE,R-OUTSIDE-SRC", "R-DEEP-CHAIN:R-DEEP-CHAIN"]);
    expect(residualParagraph()).toStrictEqual(roster);
  });
});
