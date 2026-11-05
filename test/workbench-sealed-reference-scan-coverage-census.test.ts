/**
 * wb-jwc.11 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17; the follow-up of wb-jwc.8 that the
 * rule-19 structural exit, orchestrator ruling R-B211, filed; ruling R-B283 routes the instantiation-expression gap here):
 * the shared SEALED reference scan pinned on wb-jwc.5's refusal #6 instantiation-expression plants (each rewrite reads OPEN
 * once cure (a) lands), on two caller readers beside LITERAL_READER (each reader question asked at a reference form a
 * READER plant holds answered as the reader handed in decides), and on src's modules that hold a bare const literal (each
 * read).
 * Statement (the bead's export title, ASCII as exported): "Seals.open verdict set, caller ScanReader and srcTree-walk
 * liveness get member witnesses or named-residual status".
 *
 * WB-UN88 (the R694 follow-up of landing 814, gate cmd_24c53350904c PASS-WITH-FINDING; its F1 leads, F2 and F3 ride). The
 * READER words claimed every reference form while the READER pins plant some; READER-cache's words read wider than the one
 * reader pair it scans; and SRC-READ's "every" rested on an enumeration held by its floor alone. wb-un88 adds three rows,
 * READER-FORMS (one pin per form F1 names), READER-PAIRS (the four two-reader sequences READER-cache does not scan, F2's
 * NO_READS-then-ALL_READS among them) and SRC-ENUM (SRC-READ's enumeration held to two readings outside this census), and
 * narrows the READER words, this header's opening, the describe title, and the helper's READER paragraph and ScanReader
 * doc to the forms the READER plants hold. The scan's code is unchanged.
 *
 * WHAT IS DELIVERED. (1) Cure (a) of R-B283 in test/helpers/sealed-reference-scan.ts: isValueReference and inClassExtends
 * read an instantiation expression (an ExpressionWithTypeArguments outside a heritage clause, `f<T>` with no call of its
 * own) as a value expression rather than a part of a type, its type arguments still a part of a type; this census claims
 * of the cure exactly INST's readings. (2) Pins for sealedScan's caller-reader path (refusal #3 U2 of wb-jwc.8, gate s159).
 * (3) A pin for which src modules the scan reads (refusal #3 U3's remainder). No other line of the scan's code changes.
 *
 * A READING (each planted pin's witness): per root of the pin's tree (each literal Seals.rootOf maps to itself, in module
 * and source order), `name:` and the verdict Seals.open gives it, `open` or `sealed`, then the forms Seals.reached records
 * opening it, each `<channel>>...|<use>`, `|heritage` when the reference sits in a class extends expression - the reading
 * wb-jwc.8's census takes. Each planted pin's witness also carries its page, the digest of its modules (PAGES), so a plant
 * swapped for another case reds its row.
 *
 * THE PINNED SET (this census claims exactly the readings of these pins; a row's label is the requirement text it answers,
 * verbatim from its anchor):
 *  INST [pins: P17-INST-HER, P17-INST-HEREXPR, P17-INST1, P17-INST2, P17-INST-HER-near, P17-INST1-near, P17-INST1-ctl,
 *   INST-TYPE-ARGUMENTS]: wb-jwc.5's refusal #6 gate plants (gate-prep-17, table_p17.py, module texts verbatim), each a
 *   module-scope const IDS rewritten by its own function-valued member, and this census's type-arguments plant. A
 *   reference to IDS under an instantiation expression reads OPEN: parenthesized and called inside a class declaration's
 *   (P17-INST-HER) or a class expression's (P17-INST-HEREXPR) extends expression, `import>name|other|heritage`, and
 *   outside one, called through `?.()` (P17-INST1) or parenthesized and called (P17-INST2), `import>name|other`. The near
 *   controls reach IDS with no instantiation expression, OPEN before the cure too: a call with a type argument inside the
 *   extends expression (P17-INST-HER-near) and the same call as P17-INST1's without the type argument (P17-INST1-near);
 *   P17-INST1-ctl holds the committing values with no rewrite, SEALED. INST-TYPE-ARGUMENTS holds the quiet side: a
 *   const named only in an instantiation expression's type arguments (`typeof OTHER`) reads SEALED while IDS beside it
 *   reads OPEN.
 *  READER [pins: READER-readsString, READER-copiesStrings, READER-readsKey, READER-cache]: sealedScan(tree, reader) asks
 *   the reader it is handed, not LITERAL_READER in its place, at the reference forms the READER plants hold (the pins of
 *   READER, READER-FORMS and READER-PAIRS), as measured by two caller readers beside LITERAL_READER:
 *   NO_READS (no member read chain reads as a string, no spread copies strings, no element access's argument reads as a
 *   name) and ALL_READS (every chain reads as a string, every spread copies strings, every argument reads as the name
 *   OTHER). Each of the reader's three questions has a pin whose plant reads differently under each of the three readers:
 *   whether a member read chain reads as a string (READER-readsString: IDS.id and NUM.n, each read), whether a spread
 *   copies strings (READER-copiesStrings: a string array and a number array, each spread), and the name an element
 *   access's argument reads as (READER-readsKey: namespace Rf holding IDS and OTHER, Rf["IDS"].id written). One tree
 *   scanned under LITERAL_READER and then NO_READS, and another scanned under NO_READS and then LITERAL_READER, each read
 *   each reader's own reading (READER-cache: a result the scan keeps for LITERAL_READER is not served to NO_READS, nor one
 *   it keeps for NO_READS to LITERAL_READER).
 *  SRC-READ [pins: src-bare-literal-modules]: every .ts module under src/ that holds, at any scope, a const named by an
 *   identifier whose initializer is an object or array literal as written, no wrapper around it (enumerated by this census
 *   apart from the scan: each file parsed and walked here), holds a root in sealedScan(srcTree(repo)).rootOf, and more
 *   than 50 modules do.
 *  READER-FORMS [pins: READER-element-access-chain, READER-namespace-import-owner, READER-object-spread]: the three
 *   readers' readings at the three reference forms wb-un88's F1 names, one reader question each, each plant read
 *   differently under each of the three readers: whether an element access chain reads as a string
 *   (READER-element-access-chain: IDS["id"] and NUM["n"], each read), the name an element access's argument reads as when
 *   its owner is a namespace import (READER-namespace-import-owner: `import * as M` of a module holding IDS and OTHER,
 *   M["IDS"].id written), and whether an object literal's spread copies strings (READER-object-spread: { ...IDS } of a
 *   literal of strings and { ...NUM } of a literal holding a number, each a function's return value).
 *  READER-PAIRS [pins: READER-cache-pairs]: one tree each scanned under NO_READS and then ALL_READS, ALL_READS and then
 *   NO_READS, LITERAL_READER and then ALL_READS, and ALL_READS and then LITERAL_READER (an imported IDS.id and NUM.n, read
 *   differently under each of the three readers) reads each reader's own reading: with READER-cache's two sequences, in
 *   none of the six two-reader sequences of the three readers is a result the scan keeps for the first served to the
 *   second.
 *  SRC-ENUM [pins: src-enumeration-srcFiles, src-enumeration-holdsBareLiteral]: SRC-READ's enumeration is held to two
 *   readings outside this census: the .ts files its walk (srcFiles) finds under src/ are exactly srcTree(repo).paths()
 *   (src-enumeration-srcFiles), and the modules its filter (holdsBareLiteral) keeps are exactly the modules in which
 *   sealedScan(srcTree(repo)).rootOf holds a const's literal as written, the literal its variable declaration's own
 *   initializer (src-enumeration-holdsBareLiteral).
 *
 * NOT CLAIMED: the Seals.open verdict set (refusal #3 U1, its seven members) and srcTree's walk (refusal #3 U3, its two
 * members; SRC-ENUM takes its paths as an anchor and claims only their equality with this census's walk), which
 * wb-jwc.8's census holds since its fail-closed core (its A READING takes each pinned root's verdict from Seals.open,
 * and SRC src-live holds srcTree's modules equal to its own enumeration of src); an instantiation expression in a
 * spelling or position no INST pin plants; a caller's reader other than NO_READS and ALL_READS; a reference form no
 * READER plant holds (among them a bare name's read with no member access, a call argument's spread, and an element
 * access whose owner is an import-equals alias of a module or a module an export re-exports); a tree scanned under
 * three or more readers in turn; a tree whose modules change after it is scanned (a result is kept per tree object);
 * which src modules the scan reads beyond those holding a bare const literal (no root shows the reading of the rest);
 * how SRC-READ's filter reads a let or var declaration's literal (at this cut every src module that holds one holds a
 * const one too, so the src tree does not show it); and how a census riding the scan reads its moved pages (wb-jwc.5's
 * census holds its own). This census names no residual: within THE PINNED SET no escape is known.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl) - wb-jwc.11's title (the statement), its
 * description's U2 clause (READER's label, verbatim; each method it names and the scan cache are READER pins, in its
 * order) and its R-B283 note (INST's label is the note's cure clause, verbatim; the plants the note names and the type
 * arguments its clause names are INST pins), and wb-jwc.5's refusal #6 record (its U1 UNMET item and its F3 finding,
 * verbatim in that bead's notes), whose P17-INST plants are exactly INST's gate pins; and wb-jwc.8's census header, whose
 * NOT CLAIMED item naming refusal #3 U3's remainder is SRC-READ's label, verbatim; and wb-un88's description (the tracker
 * export), whose findings' cure clauses (F1's after `Cure form: `, F2's and F3's after `Cure: `, each up to `, or narrow`)
 * are READER-FORMS', READER-PAIRS' and SRC-ENUM's labels, verbatim: the forms F1's clause names are READER-FORMS' pins, in
 * its order; the unheld same-tree sequences F2 names are sequences READER-PAIRS scans, and READER-cache's and
 * READER-PAIRS' sequences together are F1's count of two-reader sequences over its count of readers, each once; and the
 * parts F3 names SRC-READ's enumeration by are SRC-ENUM's pins, in its order.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, WITNESS's and PAGES' keys are exactly the
 * planted pins, and THE PINNED SET paragraph cites every pin exactly once.
 *
 * Display paths added: none. Test-only: every tree is read in memory; nothing is written or run.
 */
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { LITERAL_READER, type ModuleTree, plantedTree, type Reached, type ScanReader, sealedScan, srcTree } from "./helpers/sealed-reference-scan.js";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-jwc.11";
const GATE_BEAD = "wb-jwc.5";
/** The R694 follow-up of landing 814 whose findings READER-FORMS, READER-PAIRS and SRC-ENUM answer. */
const FOLLOW_UP = "wb-un88";
const EXPORT = ".beads/issues.jsonl";
const SELF = "test/workbench-sealed-reference-scan-coverage-census.test.ts";
const PARENT_CENSUS = "test/workbench-sealed-reference-scan-census.test.ts";
/** The real src tree, parsed once and shared by the checks that read it. */
const SRC = srcTree(REPO);
/** Reading the real src tree or the tracker export takes seconds under load; every test bounds itself well above that. */
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
/** A tree's reading under a reader (see the header): each root's verdict read from Seals.open, its opening forms from Seals.reached. */
function reading(tree: ModuleTree, reader: ScanReader = LITERAL_READER): string {
  const seals = sealedScan(tree, reader);
  const out: string[] = [];
  for (const [node, root] of seals.rootOf) {
    if (node !== root) continue;
    const forms = [...new Set(seals.reached.filter((reach) => reach.root === root && reach.use !== undefined).map(formOf))].sort();
    const nested = [...seals.rootOf].filter(([literal, owner]) => owner === root && literal !== root).length;
    const verdict = seals.open.has(root) ? "open" : "sealed";
    out.push(`${constName(root)}${nested > 0 ? `+${nested}` : ""}:${verdict}${forms.length === 0 ? "" : ` ${forms.join(",")}`}`);
  }
  return out.join("; ");
}
function pageDigest(modules: Readonly<Record<string, string>>): string {
  const text = Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, module]) => `${path}\n${module}`)
    .join("\0");
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/* ---------------------------------------------------------------- INST: wb-jwc.5's refusal #6 gate plants (table_p17.py, verbatim) */

type Modules = Readonly<Record<string, string>>;
const P = "src/workbench/providers/";
const IDS_MODULE = `${P}rf-commit-ids.ts`;
const REGISTRATION = `${P}rf-commit.ts`;
const SETUP = `${P}rf-commit-setup.ts`;
const RF_ID = '"reactivefiber.render.commit"';
const RF_CONTRACT = '"rf@0.1.845:reactive-fiber.cli/v1 context.render"';
const FORGE_ID = '"forge.gate.commit"';
const FORGE_CONTRACT = '"@forge/sdk@0.1.0:GateFacade.commit"';
/** table_p17.py ids_fn: IDS holding a function-valued member (not a method) that rewrites it, so its other members still read. */
function idsWithMember(id: string, contract: string, member: "fix" | "mk", returns: "void" | "ObjectConstructor", tail = ""): string {
  const body = `    this.id = ${RF_ID};\n    this.contract = ${RF_CONTRACT};\n${returns === "void" ? "" : "    return Object;\n"}`;
  return `/** gate probe ids module: a module-scope const object holding a function-valued member (not a method) that rewrites it. */\nexport const IDS = {\n  id: ${id},\n  contract: ${contract},\n  ${member}: function <T>(this: { id: string; contract: string }, _tag?: T): ${returns} {\n${body}  },\n};\n${tail}`;
}
/** table_p17.py reg: the registration through the imported module-scope const IDS. */
function registration(tag: string, setup = true): string {
  return `import type { CapabilityRegistry } from "../capability-registry.js";\n${setup ? 'import "./rf-commit-setup.js";\n' : ""}import { IDS } from "./rf-commit-ids.js";\n\n/** gate probe ${tag}: registers through the imported module-scope const IDS (MEMBERS + VALUES). */\nexport function registerCommit(registry: CapabilityRegistry): void {\n  registry.register({ descriptor: { id: IDS.id, version: "1.0.0", description: "commit", inputSchema: { type: "object" }, effectClass: "read", permissions: ["reactivefiber:render"], supportedModes: ["invoke"], contractSource: IDS.contract }, invoke: async () => null });\n}\n`;
}
const SET = 'import { IDS } from "./rf-commit-ids.js";\n\n';
const FIX = idsWithMember(FORGE_ID, FORGE_CONTRACT, "fix", "void");
const MK = idsWithMember(FORGE_ID, FORGE_CONTRACT, "mk", "ObjectConstructor");

const INST_PLANTS: Readonly<Record<string, Modules>> = {
  "P17-INST-HER": {
    [IDS_MODULE]: MK,
    [REGISTRATION]: registration("P17-INST-HER"),
    [SETUP]: `${SET}/** gate probe P17-INST-HER: an instantiation expression inside a class declaration's extends expression, outside its type arguments. */\nexport class CommitBase extends (IDS.mk<object>)() {}\n`,
  },
  "P17-INST-HEREXPR": {
    [IDS_MODULE]: MK,
    [REGISTRATION]: registration("P17-INST-HEREXPR"),
    [SETUP]: `${SET}/** gate probe P17-INST-HEREXPR: an instantiation expression inside a class expression's extends expression. */\nexport const CommitBase = class extends (IDS.mk<object>)() {};\n`,
  },
  "P17-INST1": {
    [IDS_MODULE]: FIX,
    [REGISTRATION]: registration("P17-INST1"),
    [SETUP]: `${SET}/** gate probe P17-INST1: the member called through an instantiation expression (emitted IDS.fix?.(), this = IDS). */\nIDS.fix<string>?.();\n`,
  },
  "P17-INST2": {
    [IDS_MODULE]: FIX,
    [REGISTRATION]: registration("P17-INST2"),
    [SETUP]: `${SET}/** gate probe P17-INST2: the parenthesized instantiation expression, called (emitted (IDS.fix)(), this = IDS). */\n(IDS.fix<string>)();\n`,
  },
  "P17-INST-HER-near": {
    [IDS_MODULE]: MK,
    [REGISTRATION]: registration("P17-INST-HER-near"),
    [SETUP]: `${SET}/** gate probe P17-INST-HER-near (near control): a call with a type argument inside the extends expression (a visited reference, called). */\nexport class CommitBase extends IDS.mk<object>() {}\n`,
  },
  "P17-INST1-near": {
    [IDS_MODULE]: FIX,
    [REGISTRATION]: registration("P17-INST1-near"),
    [SETUP]: `${SET}/** gate probe P17-INST1-near (near control): the same call without the type argument (a visited reference, called). */\nIDS.fix?.();\n`,
  },
  "P17-INST1-ctl": { [IDS_MODULE]: idsWithMember(RF_ID, RF_CONTRACT, "fix", "void"), [REGISTRATION]: registration("P17-INST1-ctl", false) },
  // This census's plant: a const named only in an instantiation expression's type arguments is a part of a type.
  "INST-TYPE-ARGUMENTS": {
    [IDS_MODULE]: idsWithMember(FORGE_ID, FORGE_CONTRACT, "mk", "ObjectConstructor", 'export const OTHER = { id: "forge.gate.other" };\n'),
    [SETUP]: 'import { IDS, OTHER } from "./rf-commit-ids.js";\n\n/** an instantiation expression inside a class extends expression whose type argument names the const OTHER. */\nexport class CommitBase extends (IDS.mk<typeof OTHER>)() {}\n',
  },
};

/* ---------------------------------------------------------------- READER: the caller-reader path */

/** A caller's reader that reads nothing: no member read chain reads as a string, no spread copies strings, no argument reads as a name. */
const NO_READS: ScanReader = { readsString: () => false, copiesStrings: () => false, readsKey: () => undefined };
/** A caller's reader that reads everything: every member read chain reads as a string, every spread copies strings, every argument reads as OTHER. */
const ALL_READS: ScanReader = { readsString: () => true, copiesStrings: () => true, readsKey: () => "OTHER" };
const READERS: readonly (readonly [string, ScanReader])[] = [
  ["LITERAL_READER", LITERAL_READER],
  ["NO_READS", NO_READS],
  ["ALL_READS", ALL_READS],
];
const READS_ID = 'export const IDS = { id: "forge.gate.commit" };\nexport const id: string = IDS.id;\n';

const READER_PLANTS: Readonly<Record<string, Modules>> = {
  "READER-readsString": { [`${P}ids.ts`]: `${READS_ID}export const NUM = { n: 0 };\nexport const n: number = NUM.n;\n` },
  "READER-copiesStrings": {
    [`${P}ids.ts`]: 'export const IDS = ["operation", "show"];\nexport function argv(id: string): string[] {\n  return ["--json", ...IDS, id];\n}\nexport const NUMS = [0, 1];\nexport function copy(): number[] {\n  return [...NUMS];\n}\n',
  },
  "READER-readsKey": {
    [`${P}ids.ts`]: 'export namespace Rf {\n  export const IDS = { id: "forge.gate.commit" };\n  export const OTHER = { id: "forge.gate.other" };\n}\nRf["IDS"].id = "reactivefiber.render.commit";\n',
  },
  "READER-cache": { [`${P}ids.ts`]: READS_ID },
  // wb-un88's READER-FORMS: one plant per form its F1 names, each read differently under each of the three readers.
  "READER-element-access-chain": { [`${P}ids.ts`]: 'export const IDS = { id: "forge.gate.commit" };\nexport const id: string = IDS["id"];\nexport const NUM = { n: 0 };\nexport const n: number = NUM["n"];\n' },
  "READER-namespace-import-owner": {
    [`${P}ids.ts`]: 'export const IDS = { id: "forge.gate.commit" };\nexport const OTHER = { id: "forge.gate.other" };\n',
    [`${P}use.ts`]: 'import * as M from "./ids.js";\n\nM["IDS"].id = "reactivefiber.render.commit";\n',
  },
  "READER-object-spread": {
    [`${P}ids.ts`]: 'export const IDS = { id: "forge.gate.commit", contract: "@forge/sdk@0.1.0:GateFacade.commit" };\nexport function copy(): object {\n  return { ...IDS };\n}\nexport const NUM = { n: 0 };\nexport function copyNum(): object {\n  return { ...NUM };\n}\n',
  },
  // wb-un88's READER-PAIRS: an imported IDS.id and NUM.n, read differently under each of the three readers.
  "READER-cache-pairs": {
    [`${P}ids.ts`]: 'export const IDS = { id: "forge.gate.commit" };\nexport const NUM = { n: 0 };\n',
    [`${P}use.ts`]: 'import { IDS, NUM } from "./ids.js";\n\nexport const id: string = IDS.id;\nexport const n: number = NUM.n;\n',
  },
};
/** READER-PAIRS' sequences (wb-un88 F2): the four two-reader sequences READER-cache does not scan, each on a fresh tree. */
const PAIRS: readonly (readonly [string, string])[] = [
  ["NO_READS", "ALL_READS"],
  ["ALL_READS", "NO_READS"],
  ["LITERAL_READER", "ALL_READS"],
  ["ALL_READS", "LITERAL_READER"],
];
function readerNamed(name: string): ScanReader {
  const found = READERS.find(([candidate]) => candidate === name);
  if (found === undefined) throw new Error(`no reader ${name}`);
  return found[1];
}
/** A READER pin's readings: each reader's own (a fresh tree each), or, for READER-cache and READER-cache-pairs, trees each scanned under two readers in turn. */
function readerReading(pin: string): string {
  const modules = READER_PLANTS[pin];
  if (pin === "READER-cache-pairs") {
    return PAIRS.map(([first, second]) => {
      const tree = plantedTree(modules);
      return `${first} then ${second}: ${reading(tree, readerNamed(first))} / ${reading(tree, readerNamed(second))}`;
    }).join(" | ");
  }
  if (pin === "READER-cache") {
    const first = plantedTree(modules);
    const second = plantedTree(modules);
    const defaultFirst = [reading(first, LITERAL_READER), reading(first, NO_READS)];
    const callerFirst = [reading(second, NO_READS), reading(second, LITERAL_READER)];
    return `LITERAL_READER then NO_READS: ${defaultFirst.join(" / ")} | NO_READS then LITERAL_READER: ${callerFirst.join(" / ")}`;
  }
  return READERS.map(([name, reader]) => `${name} ${reading(plantedTree(modules), reader)}`).join(" | ");
}

/* ---------------------------------------------------------------- the pins */

const WITNESS: Readonly<Record<string, string>> = {
  "P17-INST-HER": "IDS:open import>name|other|heritage",
  "P17-INST-HEREXPR": "IDS:open import>name|other|heritage",
  "P17-INST1": "IDS:open import>name|other",
  "P17-INST2": "IDS:open import>name|other",
  "P17-INST-HER-near": "IDS:open import>name|other|heritage",
  "P17-INST1-near": "IDS:open import>name|other",
  "P17-INST1-ctl": "IDS:sealed",
  "INST-TYPE-ARGUMENTS": "IDS:open import>name|other|heritage; OTHER:sealed",
  "READER-readsString": "LITERAL_READER IDS:sealed; NUM:open name|other | NO_READS IDS:open name|other; NUM:open name|other | ALL_READS IDS:sealed; NUM:sealed",
  "READER-copiesStrings": "LITERAL_READER IDS:sealed; NUMS:open name|spread | NO_READS IDS:open name|spread; NUMS:open name|spread | ALL_READS IDS:sealed; NUMS:sealed",
  "READER-readsKey": "LITERAL_READER IDS:open name>namespace|written; OTHER:sealed | NO_READS IDS:open name|whole; OTHER:open name|whole | ALL_READS IDS:sealed; OTHER:open name>namespace|written",
  "READER-cache": "LITERAL_READER then NO_READS: IDS:sealed / IDS:open name|other | NO_READS then LITERAL_READER: IDS:open name|other / IDS:sealed",
  "READER-element-access-chain": "LITERAL_READER IDS:sealed; NUM:open name|other | NO_READS IDS:open name|other; NUM:open name|other | ALL_READS IDS:sealed; NUM:sealed",
  "READER-namespace-import-owner": "LITERAL_READER IDS:open namespace-import>name|written; OTHER:sealed | NO_READS IDS:open namespace-import|whole; OTHER:open namespace-import|whole | ALL_READS IDS:sealed; OTHER:open namespace-import>name|written",
  "READER-object-spread": "LITERAL_READER IDS:sealed; NUM:open name|spread | NO_READS IDS:open name|spread; NUM:open name|spread | ALL_READS IDS:sealed; NUM:sealed",
  "READER-cache-pairs": "NO_READS then ALL_READS: IDS:open import>name|other; NUM:open import>name|other / IDS:sealed; NUM:sealed | ALL_READS then NO_READS: IDS:sealed; NUM:sealed / IDS:open import>name|other; NUM:open import>name|other | LITERAL_READER then ALL_READS: IDS:sealed; NUM:open import>name|other / IDS:sealed; NUM:sealed | ALL_READS then LITERAL_READER: IDS:sealed; NUM:sealed / IDS:sealed; NUM:open import>name|other",
};
const PAGES: Readonly<Record<string, string>> = {
  "P17-INST-HER": "2964352e1e40bbc6",
  "P17-INST-HEREXPR": "4e46e6f9f2885475",
  "P17-INST1": "0223dd3bbdafc9d5",
  "P17-INST2": "b41b2fd801da9066",
  "P17-INST-HER-near": "8829d545930180f2",
  "P17-INST1-near": "e0522f4470ae5338",
  "P17-INST1-ctl": "197d15332af3dbc8",
  "INST-TYPE-ARGUMENTS": "ffbe7789d18bb061",
  "READER-readsString": "d408407693a88d32",
  "READER-copiesStrings": "32d01b0866be7685",
  "READER-readsKey": "fbad64e07e5e0336",
  "READER-cache": "41bea2389faf9cf9",
  "READER-element-access-chain": "96ec7dec79948cfd",
  "READER-namespace-import-owner": "3bff855d1faef320",
  "READER-object-spread": "a3cfda523ffa3567",
  "READER-cache-pairs": "41a564697989186e",
};
const PLANTS: Readonly<Record<string, Modules>> = { ...INST_PLANTS, ...READER_PLANTS };
/** A planted pin's witness: its reading (or a READER pin's readings) and its page. */
function plantReading(pin: string): string {
  const modules = PLANTS[pin];
  return `${pin.startsWith("READER-") ? readerReading(pin) : reading(plantedTree(modules))} #${pageDigest(modules)}`;
}

/** The .ts files under a directory of the repository, enumerated apart from srcTree's walk: each directory read by entry kind, recursively. */
function srcFiles(dir: string): string[] {
  return readdirSync(join(REPO, dir), { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    return entry.isDirectory() ? srcFiles(path) : entry.isFile() && entry.name.endsWith(".ts") ? [path] : [];
  });
}
/** Whether a module holds a const declared with an object or array literal as written (no wrapper around it), at any scope: this census's own walk. */
function holdsBareLiteral(path: string): boolean {
  const file = ts.createSourceFile(path, readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let found = false;
  const walk = (node: ts.Node): void => {
    if (found) return;
    const list = node.parent;
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && (ts.isObjectLiteralExpression(node.initializer) || ts.isArrayLiteralExpression(node.initializer)) && ts.isVariableDeclarationList(list) && (list.flags & ts.NodeFlags.Const) !== 0) {
      found = true;
      return;
    }
    ts.forEachChild(node, walk);
  };
  walk(file);
  return found;
}

/** SRC-READ's enumeration: the .ts modules under src/ this census's walk finds holding a bare const literal, sorted (SRC-ENUM holds it to two readings outside this census). */
function enumerated(): string[] {
  return srcFiles("src").filter(holdsBareLiteral).sort();
}

const CHECKS: Readonly<Record<string, () => void>> = {
  // SRC-READ: every src module holding a bare const literal (this census's enumeration) holds a root of the scan's src reading.
  "src-bare-literal-modules": () => {
    const modules = enumerated();
    const read = new Set([...sealedScan(SRC).rootOf.values()].map((root) => root.getSourceFile().fileName));
    expect(modules.filter((path) => !read.has(path))).toStrictEqual([]);
    expect(modules.length).toBeGreaterThan(50);
  },
  // SRC-ENUM (wb-un88 F3): the walk SRC-READ enumerates by finds exactly srcTree's paths, a reading outside this census.
  "src-enumeration-srcFiles": () => {
    expect(srcFiles("src").sort()).toStrictEqual([...SRC.paths()]);
  },
  // SRC-ENUM (wb-un88 F3): the modules SRC-READ's filter keeps are exactly those in which the scan's own index roots a const's literal as written.
  "src-enumeration-holdsBareLiteral": () => {
    const rooted = [...sealedScan(SRC).rootOf].filter(([node, root]) => node === root && ts.isVariableDeclaration(root.parent)).map(([, root]) => root.getSourceFile().fileName);
    expect(enumerated()).toStrictEqual([...new Set(rooted)].sort());
  },
};

/* ---------------------------------------------------------------- ANCHORS */

interface ExportRow {
  readonly title: string;
  readonly description: string;
  readonly notes: string;
}
function exportRow(id: string): ExportRow {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown; notes?: unknown };
    if (row.id === id && typeof row.title === "string" && typeof row.description === "string") return { title: row.title, description: row.description, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${EXPORT} holds no ${id} row`);
}
/** A file's leading doc comment, unwrapped: each line's ` * ` prefix removed, the lines joined by single spaces. */
function headerOf(path: string): string {
  const text = readFileSync(join(REPO, path), "utf8");
  const end = text.indexOf("*/");
  expect(text.startsWith("/**") && end > 0, `${path} opens with its header`).toBe(true);
  return text
    .slice(3, end)
    .split("\n")
    .map((line) => line.replace(/^ \* ?/, "").replace(/^ \*$/, "").trim())
    .filter((line) => line !== "")
    .join(" ");
}
/** The text after `start` and before the first `end` that follows it, each found in `text`. */
function between(text: string, start: string, end: string): string {
  const from = text.indexOf(start);
  expect(from, `the text holds ${start}`).toBeGreaterThanOrEqual(0);
  const to = text.indexOf(end, from + start.length);
  expect(to, `the text holds ${end} after ${start}`).toBeGreaterThan(from);
  return text.slice(from + start.length, to);
}
/** wb-jwc.11's U2 clause: from `U2 = ` to the sentence before `U3 = ` in the description's members line. */
function u2Clause(row: ExportRow): string {
  const line = row.description.split("\n").find((candidate) => candidate.startsWith("Members by claim (from the row): "));
  expect(line, "the description holds its members line").toBeDefined();
  return `U2 = ${between(line ?? "", "U2 = ", ". U3 = ")}`;
}
/** The R-B283 note on wb-jwc.11: its paragraph, and the cure clause after `Cure (a) is this lineage's: `. */
function gapNote(row: ExportRow): { readonly paragraph: string; readonly cure: string } {
  const paragraph = row.notes.split("\n").find((line) => line.startsWith("GAP ROUTED HERE by R-B283"));
  expect(paragraph, "the notes hold the R-B283 gap").toBeDefined();
  const text = paragraph ?? "";
  return { paragraph: text, cure: between(text, "Cure (a) is this lineage's: ", ". ") };
}
/** A finding's line in wb-un88's description: the line opening `- <finding> LOW `. */
function findingLine(row: ExportRow, finding: string): string {
  const line = row.description.split("\n").find((candidate) => candidate.startsWith(`- ${finding} LOW `));
  expect(line, `${FOLLOW_UP}'s description holds its ${finding} line`).toBeDefined();
  return line ?? "";
}
/** A finding's cure clause: after its `Cure form: ` (F1) or `Cure: `, up to the `, or narrow` that offers the other cure. */
function cureClause(row: ExportRow, finding: string): string {
  const line = findingLine(row, finding);
  return between(line, line.includes("Cure form: ") ? "Cure form: " : "Cure: ", ", or narrow");
}
/** The gate plants wb-jwc.5's refusal #6 record names for INST: its U1 UNMET item and its F3 finding, each a notes line read verbatim. */
function gatePlants(row: ExportRow): string[] {
  const lines = row.notes.split("\n");
  const items = ["- U1-MEDIUM-CONFIRMED-CUT6-HERITAGE", "- F3 LOW RIDES: [record tag 'RESIDUAL-LIST ADDITION'"].map((prefix) => lines.find((line) => line.startsWith(prefix)));
  expect(items.every((item) => item !== undefined), "the record holds its U1 item and its F3 finding").toBe(true);
  return [...new Set(items.flatMap((item) => [...(item ?? "").matchAll(/\bP17-INST[0-9]*(?:-[A-Za-z]+)*/g)].map((match) => match[0])))].sort();
}

/* ---------------------------------------------------------------- the rows */

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
const ROWS: readonly Row[] = [
  {
    id: "INST",
    label: "extend isValueReference so an instantiation expression's expression part inside the extends clause is a value reference (its type arguments stay type parts), with the two plants as red-first legs",
    pins: ["P17-INST-HER", "P17-INST-HEREXPR", "P17-INST1", "P17-INST2", "P17-INST-HER-near", "P17-INST1-near", "P17-INST1-ctl", "INST-TYPE-ARGUMENTS"],
  },
  {
    id: "READER",
    label: "U2 = 4 members: the caller's ScanReader is ignored for readsString, copiesStrings and readsKey, and the scan cache ignores the reader (SEALED_CLAIM says 'as the caller's reader decides')",
    pins: ["READER-readsString", "READER-copiesStrings", "READER-readsKey", "READER-cache"],
  },
  { id: "SRC-READ", label: "which of the modules srcTree hands the scan it reads, past SRC src-live's thresholds (refusal #3 U3's remainder: wb-jwc.11)", pins: ["src-bare-literal-modules"] },
  {
    id: "READER-FORMS",
    label: "one READER pin per form (an element-access chain, a namespace-import owner, an object spread)",
    pins: ["READER-element-access-chain", "READER-namespace-import-owner", "READER-object-spread"],
  },
  { id: "READER-PAIRS", label: "a same-tree NO_READS-then-ALL_READS pin", pins: ["READER-cache-pairs"] },
  {
    id: "SRC-ENUM",
    label: "anchor the enumeration outside the census (an exact count or list, or equality with srcTree's paths filtered independently)",
    pins: ["src-enumeration-srcFiles", "src-enumeration-holdsBareLiteral"],
  },
];
const PLANTED_ROWS = ["INST", "READER", "READER-FORMS", "READER-PAIRS"];
const CHECKED_ROWS = ["SRC-READ", "SRC-ENUM"];
function rowOf(id: string): Row {
  const row = ROWS.find((candidate) => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
}

describe("wb-jwc.11 and wb-un88: the SEALED scan reads refusal #6's instantiation-expression plants OPEN, answers each reader question asked at its READER plants as NO_READS, ALL_READS or LITERAL_READER decides, and reads every src module holding a bare const literal, by an enumeration held to srcTree's paths and the scan's own roots", () => {
  for (const id of PLANTED_ROWS) {
    const row = rowOf(id);
    it(`${row.id}: ${row.label}`, { timeout: SLOW_MS }, () => {
      const read = Object.fromEntries(row.pins.map((pin) => [pin, plantReading(pin)]));
      const held = Object.fromEntries(row.pins.map((pin) => [pin, `${WITNESS[pin]} #${PAGES[pin]}`]));
      expect(read).toStrictEqual(held);
    });
  }

  for (const id of CHECKED_ROWS) {
    const row = rowOf(id);
    for (const pin of row.pins) it(`${row.id} ${pin}: ${row.label}`, { timeout: SLOW_MS }, () => CHECKS[pin]());
  }

  it("ANCHOR (wb-jwc.11's rows INST, READER and SRC-READ): each row's label is its anchor's requirement text, verbatim, and every plant or member an anchor names is a pin of its row", { timeout: SLOW_MS }, () => {
    const own = exportRow(BEAD);
    expect(own.title).toContain("Seals.open verdict set, caller ScanReader and srcTree-walk liveness get member witnesses or named-residual status");
    // READER: the U2 clause is the label; each method it names, then the scan cache, is a READER pin, in the clause's order.
    const clause = u2Clause(own);
    expect(rowOf("READER").label).toBe(clause);
    const methods = /ignored for (\w+), (\w+) and (\w+)/.exec(clause);
    const members = [...(methods?.slice(1) ?? []), ...(/the scan (cache) ignores the reader/.exec(clause)?.slice(1) ?? [])];
    expect(members.length).toBe(Number(/^U2 = (\d+) members/.exec(clause)?.[1]));
    expect(rowOf("READER").pins).toStrictEqual(members.map((member) => `READER-${member}`));
    // INST: the R-B283 cure clause is the label; the plants the note names, and its type-arguments clause, are INST pins.
    const gap = gapNote(own);
    expect(rowOf("INST").label).toBe(gap.cure);
    const named = [...new Set([...gap.paragraph.matchAll(/\bP17-INST[0-9]*(?:-[A-Za-z]+)*/g)].map((match) => match[0]))];
    expect(named.length).toBeGreaterThan(0);
    expect(named.filter((pin) => !rowOf("INST").pins.includes(pin))).toStrictEqual([]);
    const quiet = /\(its (type arguments) stay type parts\)/.exec(gap.cure)?.[1] ?? "";
    expect(rowOf("INST").pins).toContain(`INST-${quiet.toUpperCase().split(" ").join("-")}`);
    // INST: wb-jwc.5's refusal #6 record names exactly INST's gate pins.
    expect(gatePlants(exportRow(GATE_BEAD))).toStrictEqual(rowOf("INST").pins.filter((pin) => pin.startsWith("P17-")).sort());
    // SRC-READ: wb-jwc.8's census names U3's remainder as wb-jwc.11's in its NOT CLAIMED items; that item is the label.
    const items = between(headerOf(PARENT_CENSUS), "NOT CLAIMED: ", " ANCHORS (outside this file)").split("; ");
    expect(items.filter((item) => item.includes("U3's remainder: wb-jwc.11"))).toStrictEqual([rowOf("SRC-READ").label]);
  });

  it("ANCHOR (wb-un88's rows READER-FORMS, READER-PAIRS and SRC-ENUM): each row's label is its finding's cure clause, verbatim, and every form, sequence or part a finding names is held by its row", { timeout: SLOW_MS }, () => {
    const followUp = exportRow(FOLLOW_UP);
    // READER-FORMS: F1's cure clause is the label; each form it names is a pin, in the clause's order.
    const forms = cureClause(followUp, "F1");
    expect(rowOf("READER-FORMS").label).toBe(forms);
    const named = (/\(([^)]+)\)/.exec(forms)?.[1] ?? "").split(", ").map((form) => `READER-${form.replace(/^an? /, "").split(" ").join("-")}`);
    expect(named.length).toBeGreaterThan(0);
    expect(rowOf("READER-FORMS").pins).toStrictEqual(named);
    // READER-PAIRS: F2's cure clause is the label; the unheld same-tree sequences F2 names are held, and READER-cache's and
    // READER-PAIRS' sequences are F1's count of two-reader sequences over its count of readers, each once.
    expect(rowOf("READER-PAIRS").label).toBe(cureClause(followUp, "F2"));
    const sequencesOf = (pins: readonly string[]): string[] => pins.flatMap((pin) => [...(WITNESS[pin] ?? "").matchAll(/(\w+) then (\w+):/g)].map((match) => `${match[1]}>${match[2]}`));
    const pairs = sequencesOf(rowOf("READER-PAIRS").pins);
    const held = [...sequencesOf(["READER-cache"]), ...pairs];
    const unheld = /unheld same-tree sequences (\w+>\w+) and (\w+>\w+)/.exec(findingLine(followUp, "F2"))?.slice(1) ?? [];
    expect(unheld.length).toBe(2);
    expect(unheld.filter((sequence) => !pairs.includes(sequence))).toStrictEqual([]);
    const counts = /under the (\d+) readers, all (\d+) two-reader sequences/.exec(findingLine(followUp, "F1"));
    const names = READERS.map(([name]) => name);
    expect(names.length).toBe(Number(counts?.[1]));
    expect(held.length).toBe(Number(counts?.[2]));
    expect(new Set(held).size).toBe(held.length);
    const strays = held.filter((sequence) => {
      const [first, second] = sequence.split(">");
      return first === second || !names.includes(first) || !names.includes(second);
    });
    expect(strays).toStrictEqual([]);
    // SRC-ENUM: F3's cure clause is the label; each part F3 names SRC-READ's enumeration by is a pin, in its order.
    expect(rowOf("SRC-ENUM").label).toBe(cureClause(followUp, "F3"));
    const parts = (/SRC-READ's own enumeration \(([^)]+)\)/.exec(findingLine(followUp, "F3"))?.[1] ?? "").split(" + ");
    expect(parts.length).toBeGreaterThan(0);
    expect(rowOf("SRC-ENUM").pins).toStrictEqual(parts.map((part) => `src-enumeration-${part}`));
  });

  it("FROZEN SHAPE (standing rule 16): the rows and their pin counts, WITNESS's and PAGES' keys, and THE PINNED SET citing every pin once", { timeout: SLOW_MS }, () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["INST:8", "READER:4", "SRC-READ:1", "READER-FORMS:3", "READER-PAIRS:1", "SRC-ENUM:2"]);
    expect([...PLANTED_ROWS, ...CHECKED_ROWS].sort()).toStrictEqual(ROWS.map((row) => row.id).sort());
    const planted = PLANTED_ROWS.flatMap((id) => rowOf(id).pins);
    expect(Object.keys(WITNESS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PAGES).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(PLANTS).sort()).toStrictEqual([...planted].sort());
    expect(Object.keys(CHECKS)).toStrictEqual(CHECKED_ROWS.flatMap((id) => rowOf(id).pins));
    const cited = [...headerOf(SELF).matchAll(/\[pins: ([^\]]+)\]/g)].flatMap((match) => match[1].split(/,\s*/));
    expect(cited).toStrictEqual(ROWS.flatMap((row) => row.pins));
  });
});
