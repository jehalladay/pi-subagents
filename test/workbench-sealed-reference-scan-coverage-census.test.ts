/**
 * wb-jwc.11 (RFCLI-FEEDBACK-OPERATIONAL-CONVERGENCE-R5, program-triage-2026-10-17; the follow-up of wb-jwc.8 that the
 * rule-19 structural exit, orchestrator ruling R-B211, filed; ruling R-B283 routes the instantiation-expression gap here):
 * the shared SEALED reference scan pinned on wb-jwc.5's refusal #6 instantiation-expression plants (each rewrite reads OPEN
 * once cure (a) lands), on two caller readers beside LITERAL_READER (each reader question answered as the reader handed in
 * decides), and on src's modules that hold a bare const literal (each read).
 * Statement (the bead's export title, ASCII as exported): "Seals.open verdict set, caller ScanReader and srcTree-walk
 * liveness get member witnesses or named-residual status".
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
 *   the reader it is handed, not LITERAL_READER in its place, as measured by two caller readers beside LITERAL_READER:
 *   NO_READS (no member read chain reads as a string, no spread copies strings, no element access's argument reads as a
 *   name) and ALL_READS (every chain reads as a string, every spread copies strings, every argument reads as the name
 *   OTHER). Each of the reader's three questions has a pin whose plant reads differently under each of the three readers:
 *   whether a member read chain reads as a string (READER-readsString: IDS.id and NUM.n, each read), whether a spread
 *   copies strings (READER-copiesStrings: a string array and a number array, each spread), and the name an element
 *   access's argument reads as (READER-readsKey: namespace Rf holding IDS and OTHER, Rf["IDS"].id written). One tree
 *   scanned under LITERAL_READER and then NO_READS, and another scanned under NO_READS and then LITERAL_READER, each read
 *   each reader's own reading (READER-cache: a result the scan keeps for one reader is not served to the other).
 *  SRC-READ [pins: src-bare-literal-modules]: every .ts module under src/ that holds, at any scope, a const named by an
 *   identifier whose initializer is an object or array literal as written, no wrapper around it (enumerated by this census
 *   apart from the scan: each file parsed and walked here), holds a root in sealedScan(srcTree(repo)).rootOf, and more
 *   than 50 modules do.
 *
 * NOT CLAIMED: the Seals.open verdict set (refusal #3 U1, its seven members) and srcTree's walk (refusal #3 U3, its two
 * members), which wb-jwc.8's census holds since its fail-closed core (its A READING takes each pinned root's verdict from
 * Seals.open, and SRC src-live holds srcTree's modules equal to its own enumeration of src); an instantiation expression
 * in a spelling or position no INST pin plants; a caller's reader other than NO_READS and ALL_READS; a tree whose modules
 * change after it is scanned (a result is kept per tree object); which src modules the scan reads beyond those holding a
 * bare const literal (no root shows the reading of the rest); and how a census riding the scan reads its moved pages
 * (wb-jwc.5's census holds its own). This census names no residual: within THE PINNED SET no escape is known.
 * ANCHORS (outside this file): the tracker export (.beads/issues.jsonl) - wb-jwc.11's title (the statement), its
 * description's U2 clause (READER's label, verbatim; each method it names and the scan cache are READER pins, in its
 * order) and its R-B283 note (INST's label is the note's cure clause, verbatim; the plants the note names and the type
 * arguments its clause names are INST pins), and wb-jwc.5's refusal #6 record (its U1 UNMET item and its F3 finding,
 * verbatim in that bead's notes), whose P17-INST plants are exactly INST's gate pins; and wb-jwc.8's census header, whose
 * NOT CLAIMED item naming refusal #3 U3's remainder is SRC-READ's label, verbatim.
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
};
/** A READER pin's readings: each reader's own (a fresh tree each), or, for READER-cache, two trees each scanned under two readers in turn. */
function readerReading(pin: string): string {
  const modules = READER_PLANTS[pin];
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

const CHECKS: Readonly<Record<string, () => void>> = {
  // SRC-READ: every src module holding a bare const literal (this census's enumeration) holds a root of the scan's src reading.
  "src-bare-literal-modules": () => {
    const modules = srcFiles("src").filter(holdsBareLiteral).sort();
    const read = new Set([...sealedScan(SRC).rootOf.values()].map((root) => root.getSourceFile().fileName));
    expect(modules.filter((path) => !read.has(path))).toStrictEqual([]);
    expect(modules.length).toBeGreaterThan(50);
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
];
const PLANTED_ROWS = ["INST", "READER"];
const CHECKED_ROWS = ["SRC-READ"];
function rowOf(id: string): Row {
  const row = ROWS.find((candidate) => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
}

describe("wb-jwc.11: the SEALED scan reads refusal #6's instantiation-expression plants OPEN, answers each reader question as NO_READS, ALL_READS or LITERAL_READER decides, and reads every src module holding a bare const literal", () => {
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

  it("ANCHOR: each row's label is its anchor's requirement text, verbatim, and every plant or member an anchor names is a pin of its row", { timeout: SLOW_MS }, () => {
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

  it("FROZEN SHAPE (standing rule 16): the rows and their pin counts, WITNESS's and PAGES' keys, and THE PINNED SET citing every pin once", { timeout: SLOW_MS }, () => {
    expect(ROWS.map((row) => `${row.id}:${row.pins.length}`)).toStrictEqual(["INST:8", "READER:4", "SRC-READ:1"]);
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
