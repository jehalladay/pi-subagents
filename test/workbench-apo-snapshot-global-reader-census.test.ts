/**
 * wb-021.8 (MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2; the rule-19 structural-exit child of wb-021.2, rulings R-B134 and R-B166),
 * the APO snapshot GLOBAL binding reader census: the falsifier census over the reader that wb-021.2's eventual re-cut
 * restates its census over (test/helpers/apo-snapshot-global-reader.ts, whose header is the reading of record and names the
 * pins of each reading). Cut #2 answered this bead's refusal #1 (UNMET U1-U7, the record-honesty class R514/R515/R668):
 * each member it names is pinned by its gate witness, and the claim words were narrowed to the pinned forms. Cut #3 answers
 * this bead's refusal #2 (UNMET U1-U3, the same class through collapsed slots) under ruling R-B268 (the class frozen; this
 * cut is in the enumerate-the-resolvable form): each U1-U3 member is pinned by its gate witness, one reading per GLOBAL
 * line; each collapsed GLOBAL line (two readings of one name on one line, falsified together and never alone) is split by
 * a pin that holds each reading on a line of its own; and the collapse guard holds that no other pin has such a line.
 * Statement (the bead's tracker-export title, verbatim): "The APO snapshot census's GLOBAL binding reader resolves
 * cross-block references of merged instantiated namespaces (jiti wraps the IIFE unqualified, so they bind the host global)
 * and reads import.meta.env as Pi's process.env alias; judge mutants GJ1/GJ4/GJ15/GJ16 killed". Ruling R-B166 (the bead's
 * notes) folds wb-021.2 refusal #4's unmet members into it: the instantiation-expression hole (IE1-IE12) joins its
 * reader-coverage scope, and the judge mutants GK1, GK2 and GK3 owe kills.
 *
 * THE PINNED READER SET (this file; each case id is `<row id> <pin id>`, registered in ROWS order, 216 cases): for each pin
 * of rows F (6), R (23), U (53), NS (44), EN (16), M (23), I (43), J (5) and Q (3), the assertion target is judgeGlobals over
 * the pin's planted tree, written to rule-11 scratch, and the observed result is the pin's findings, exactly and in order
 * (the sorted GLOBAL lines `GLOBAL <file>:<line> <name>`; [] for a quiet pin). Each pin's planted files and findings are held
 * by its digest in test/fixtures/apo-snapshot-global-reader-roster.json. Four further cases: the outside anchors, the
 * collapse guard, rule 16's frozen shape and the roster (registered last).
 *
 * ONE READING PER LINE (refusal #2's class; R-B268): a GLOBAL line is this census's observable, so a reading is claimed at a
 * position only where a pin holds it as the one reading of its name on its line. The collapse guard (its own case) counts,
 * for each finding of each pin, the readings of the finding's name on the finding's line - each identifier outside a type
 * node and outside the reader's key slots (a property access's and a qualified name's right side, a binding element's and
 * an import specifier's property name, a label, a meta-property's and an import attribute's name), named by nameOf, and
 * each import.meta - and holds that every finding's line holds a reading of its name and that exactly the eight pins
 * COLLAPSED_SPLITS lists have a line with two or more: W-G14-M10, W-G14-M20, W-G14-I5, W-G14-R34 and W-G14-E7 (the gates'
 * witnesses, kept as written), U-wrapper-forms, U-wrapper-imports and U-EN-self. The count covers every identifier the
 * reader reads and more (names inside an interface, a type alias, an erased import or export or an implements clause, and
 * both names of an export specifier), so a line it counts as one reading holds at most one reading of the reader. Each of
 * the eight is claimed at its collapsed line as a line; the readings on that line are claimed at
 * their positions through its split S-<pin>, a pin of its row whose files are its program token for token with line breaks
 * added, which has no line with two readings of one name and reds the names the collapsed pin reds.
 *
 * CLAIMS (each claims exactly the pinned set it names, and no wider; the falsifier of each is the named pin's own case):
 * - NS, the bead's first item (class U1 of record, refusal #3; refusal #1's U2; refusal #2's U3): a reference from another
 *   block of a merged instantiated namespace reds at the use at the reference positions and declaration kinds row NS's pins
 *   hold - refusal #3's members U-NS1, U-NS1L, U-NS2, U-NS3bL, U-NS4, U-NS5, U-NS6, U-NS7, U-NS8, U-NS10 and U-NS11 (the
 *   bead's nine admitted plants NS1L, NS2, NS4, NS5, NS6, NS7, NS8, NS10 and NS11 among them), the refusal #3 gate's U-NS3 and
 *   U-NS3b, U-NS-nested-cross and U-NS-cross-forms; refusal #4's GK1 witnesses W-GK1-block-statement and W-GK1-class-field;
 *   the refusal #4 gate's extra positions G4-NS-reverse-order, G4-NS-static-block and G4-NS-decorator-free; the cut #1 seat's
 *   NS-positions; refusal #1's U2 witnesses W-G14-R12, W-G14-R24, W-G14-R27, W-G14-R28, W-G14-R29, W-G14-R30, W-G14-R31,
 *   W-G14-R34 (chosen ? chosen : other, claimed at its line), W-G14-R36, W-G14-R37, W-G14-R38, W-G14-R39 and W-G14-R40;
 *   refusal #2's U3 witnesses W-G7-N1 (a conditional's condition) and W-G7-N2 (a conditional's whenTrue branch) and the
 *   split S-W-G14-R34 (W-G14-R34's condition, whenTrue branch and whenFalse branch, one line each); and the cut #2 seat's
 *   NS-positions-2, NS-contexts and NS-import-equals-namespace, each at the positions its message names. Controls: U-NS-C1
 *   and U-NS9 red, U-NS-C2 and U-NS-C3 quiet.
 * - META, the bead's second item (class U2 of record, refusal #3; refusal #1's U1; refusal #2's U1): import.meta reds at the
 *   meta-property at the positions row M's pins hold - U-META1, U-META1L (the src-landable form), U-meta-forms, refusal #4's
 *   GK2 witnesses W-GK2-module-statement and W-GK2-class-field, the cut #1 seat's M-positions, refusal #1's U1 witnesses
 *   W-G14-M4, W-G14-M5, W-G14-M6, W-G14-M9, W-G14-M10 (import.meta === import.meta, claimed at its line), W-G14-M11,
 *   W-G14-M15, W-G14-M16, W-G14-M17 and W-G14-M20 (true ? import.meta : import.meta, claimed at its line), refusal #2's U1
 *   witnesses W-G7-M1 (a binary expression's left operand), W-G7-M2 (a conditional's whenTrue branch) and W-G7-M3 (its
 *   whenFalse branch), the splits S-W-G14-M10 (the left and the right operand of ===) and S-W-G14-M20 (the whenTrue and the
 *   whenFalse branch), one line each, and the cut #2 seat's M-positions-2 and M-contexts, each at the positions its message
 *   names - and at R-not-references' key read, U-IE3's and U-IE12's.
 * - GJ, the bead's third item: refusal #3's judge mutants GJ1, GJ4, GJ15 and GJ16 are killed by their row J witnesses
 *   (U-GJ1 quiet; U-GJ4, U-GJ15 and U-GJ16 red), which these cases hold; each kill is measured by the seat's mutant battery
 *   on these bytes (the delivery note's battery line), not by a case of this file.
 * - IE (R-B166, class U1 of record, refusal #4; refusal #1's U3; refusal #2's U2): an expression with type arguments
 *   outside a heritage clause is read through its expression at the positions row I's pins hold - refusal #4's admitted
 *   plants U-IE1 to U-IE7 and U-IE9 to U-IE12 (U-IE10, U-IE11 and U-IE12 src-landable by the gate's measurement) and U-IE8
 *   (its free name require) red, U-IE1 to U-IE5 each exactly as its control without type arguments reads (U-IE1c 2 lines;
 *   U-IE2c, U-IE3c, U-IE4c and U-IE5c one each) and U-IE5 as the call with type arguments U-IE5d reads; the cut #1 seat's
 *   I-forms and I-positions; refusal #1's U3 witnesses W-G14-I1, W-G14-I2, W-G14-I3, W-G14-I5 (true ? structuredClone<number>
 *   : structuredClone<number>, claimed at its line), W-G14-I7, W-G14-I8, W-G14-I9, W-G14-I10, W-G14-I12, W-G14-I14,
 *   W-G14-I15, W-G14-I16, W-G14-I17 and W-G14-I18; refusal #2's U2 witnesses W-G7-I1 (a conditional's whenTrue branch) and
 *   W-G7-I2 (its whenFalse branch), the split S-W-G14-I5 (the two branches, one line each) and refusal #2's F1 rider
 *   W-G14-I11 (an optional call's callee); and the cut #2 seat's I-positions-2 and I-contexts, each at the positions its
 *   message names; I-cross-block holds rule (6) inside one (cross-block red, same-block quiet); I-type-arguments holds the
 *   erased type arguments (quiet); I-heritage holds the heritage boundary (a class's extends expression reds with type
 *   arguments, an implements clause stays quiet).
 * - GK (R-B166, class U3 of record, refusal #4): GK1's, GK2's and GK3's witnesses are pins of rows NS, M and EN (above and
 *   W-GK3-namespace-enum-forward), each red at exactly one GLOBAL line; each kill is measured by the seat's mutant battery.
 * - EN (refusal #1's U4): the forward, self and later enum reads row EN's pins hold, each at the read its message names -
 *   U-EN-forward, U-EN-forward-merged, U-EN-self (claimed at its line; the split S-U-EN-self holds the member's own name
 *   quiet and the read red, one line each), W-GK3-namespace-enum-forward, G4-EN-forward-nested-arrow, refusal #1's U4
 *   witnesses W-G14-R5, W-G14-R5c, W-G14-R5e and W-G14-R5f and the cut #2 seat's EN-forward-positions, EN-contexts and
 *   EN-second-module red; U-EN1, U-EN2 and G4-EN-string-name-after quiet.
 * - U (refusal #1's U5 and U6, and its F1 riders): the declaration forms row U's pins hold, each as its message names -
 *   W-G14-N10 (a namespace holding an import-equals alias alone, red), W-G14-E7 and W-G14-E15 (a destructured and a const
 *   wrapper name, red; W-G14-E7's declaration line is collapsed and split by S-W-G14-E7: the destructured name red, the
 *   initializer's same-named key quiet, one line each), the cut #2 seat's U-wrapper-imports (its catch variable's line
 *   split by S-U-wrapper-imports) and U-wrapper-statements (red) and U-alias-reads-bound (quiet), wb-021.2's cut #3
 *   seat's U-wrapper-forms (its self-initialized var's line split by S-U-wrapper-forms), and the F1 riders W-G14-MN and
 *   W-G14-N8 (quiet) and W-G14-B3 (process red, pid quiet).
 * - THE NAMES READ (refusal #1's U7): the positions R-names-read-positions names and W-G14-V1's class decorator, each red.
 * - REFUSAL #1 OF RECORD (this bead's, on cut #1): each U1-U7 member its record names is a W-G14 witness pin of its row (U1
 *   row M, U2 row NS, U3 row I, U4 row EN, U5 and U6 row U, U7 row R) with a GLOBAL line, and each F1 rider is a W-G14 pin of
 *   row U holding the count its record states before the arrow; each kill is measured by the seat's mutant battery.
 * - REFUSAL #2 OF RECORD (this bead's, on cut #2): each U1-U3 member its record names is a W-G7 witness pin of its row (U1
 *   row M, U2 row I, U3 row NS) with exactly one GLOBAL line; each W-G14 witness its slugs name collapsed is a key of
 *   COLLAPSED_SPLITS in that row; and its F1 rider G14-I11 is the row I pin W-G14-I11 with exactly one GLOBAL line; each
 *   kill is measured by the seat's mutant battery.
 * - The reader's other readings (rows F, R and U): each reading the helper's header states, for the forms its pins hold.
 * OUTSIDE ANCHORS (their own case): this bead's export row (.beads/issues.jsonl) - its requirement id, the parent it names,
 * the NS plants, META member and GJ mutants its description names and the GK mutants its notes name, each a pin of its
 * row; its refusal #1 record (its notes' first UNMET block of seven items: U1-U7, each slug's member count equal to the
 * members its item names first, each member a W-G14 pin of its row with a GLOBAL line; and its F1 riders, each a row U pin
 * with the count before the arrow); and its refusal #2 record (its notes' first UNMET block of three items: U1-U3, each
 * slug's member count equal to the members its item names, each member a W-G7 pin of its row with one GLOBAL line, each
 * collapsed witness its slug names a COLLAPSED_SPLITS key of that row; and its F1 rider, the row I pin W-G14-I11 with one)
 * - and the parent's records in the same export (wb-021.2's notes, which only append) - refusal #1's members, each cured
 * by the row R pin REFUSAL_1_CURES names (the map holding exactly the record's members), refusal #2's members, each a row
 * U pin red through GLOBAL, refusal #3's CLASSES OF RECORD (its NS members admitted and its red controls, each a row NS pin
 * with a GLOBAL line, its quiet control a row NS pin with none, its META member a row M pin and its GJ mutants row J pins)
 * and refusal #4's CLASSES OF RECORD (its admitted IE members and IE8, each a row I pin with a GLOBAL line, each control a
 * row I pin with exactly the count of GLOBAL lines the record states, and its GK witnesses, each a pin with exactly one).
 * Each span is the first occurrence of its key in the export, so appended notes leave it be.
 * Internal checks: V-admitted-free references exactly ADMITTED_FREE, in order; each U-IE<n> for n of 1-5 reads exactly
 * its control U-IE<n>c; and the residual families equal this header's RESIDUALS line.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and COLLAPSED_SPLITS `${pin}>${split}` as literals; each
 * row's id, label and pin digests, the registered test titles, the residual families and the collapsed lines are held to
 * the out-of-file roster.
 * NOT CLAIMED (scope sentences): a form or a position no pin holds is NOT CLAIMED by this census; a position a collapsed
 * line holds and no split or one-reading pin holds is NOT CLAIMED by this census; member reads are NOT CLAIMED by this
 * census (the reader reads free names and not the members of a value: a reach or a write through a member reads quiet
 * unless a free name on its path reds); a form TypeScript parses only under error recovery (a grammar error) is NOT
 * CLAIMED by this census; the internals of any package are NOT CLAIMED by this census; the view census's other readings -
 * wb-021.2's views, closures, EFFECT, PACKAGE, UNRESOLVED, UNREADABLE, CONSTRUCTOR and seams - are NOT CLAIMED by this
 * census; any code outside a planted tree is NOT CLAIMED by this census.
 * RESIDUALS (named, each with its pinned quiet row in row Q): R-FIELD-MUTATION, R-REFLECTIVE-REACH, R-UNLINKED-IMPORT.
 *
 * Display paths added: none. Test-only: no src change.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import {
  ADMITTED_FREE,
  BEAD,
  COLLAPSED_SPLITS,
  judgeGlobals,
  PARENT,
  type PlantPin,
  pinDigest,
  REFUSAL_1_CURES,
  REQUIREMENT,
  RESIDUAL_FAMILIES,
  ROWS,
  type Row,
  titleOf,
} from "./helpers/apo-snapshot-global-reader.js";
import { nameOf } from "./helpers/apo-ui-publish-census.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROSTER = "test/fixtures/apo-snapshot-global-reader-roster.json";
const EXPORT = ".beads/issues.jsonl";
/** A plant writes its tree to scratch, reads every module and builds one checker program. */
const PLANT_BUDGET_MS = 60_000;

/** One planted tree, written to rule-11 scratch and read by judgeGlobals over every planted file. */
function judgePlant(pin: PlantPin): string[] {
  const root = makeScratch("apo-global-reader-");
  try {
    for (const [file, text] of Object.entries(pin.files)) {
      mkdirSync(dirname(join(root, file)), { recursive: true });
      writeFileSync(join(root, file), text);
    }
    return judgeGlobals({ root, files: Object.keys(pin.files) });
  } finally {
    removeScratch(root);
  }
}

interface ExportRow {
  readonly title: string;
  readonly description: string;
  readonly notes: string;
}
/** One bead's row in the tracker export. */
function exportRow(id: string): ExportRow {
  for (const line of readFileSync(join(ROOT, EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${id}"`)) continue;
    const row = JSON.parse(line) as { id?: unknown; title?: unknown; description?: unknown; notes?: unknown };
    if (row.id === id && typeof row.title === "string") return { title: row.title, description: typeof row.description === "string" ? row.description : "", notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${EXPORT} holds no ${id} row`);
}

const rowOf = (id: string): Row => {
  const row = ROWS.find(candidate => candidate.id === id);
  if (row === undefined) throw new Error(`no row ${id}`);
  return row;
};
const pinOf = (row: string, id: string): PlantPin | undefined => rowOf(row).pins.find(pin => pin.id === id);
const globalCount = (pin: PlantPin | undefined): number => pin?.findings.filter(finding => finding.startsWith("GLOBAL ")).length ?? -1;

/** The text between a record's key and the end marker after it (the first occurrence: the notes only append), or "". */
function span(text: string, key: string, end: string): string {
  const start = text.indexOf(key);
  const stop = start < 0 ? -1 : text.indexOf(end, start + key.length);
  return start < 0 || stop < 0 ? "" : text.slice(start + key.length, stop);
}
const tokens = (text: string, pattern: RegExp): string[] => [...new Set([...text.matchAll(pattern)].map(match => match[0]))];

/** The residual families this file's header names: the R- tokens of its RESIDUALS paragraph. */
function headerResiduals(): string[] {
  const text = readFileSync(fileURLToPath(import.meta.url), "utf8");
  const header = text.slice(0, text.indexOf("*/"));
  const start = header.indexOf(" * RESIDUALS (");
  if (start < 0) return [];
  const paragraph = header.slice(start, header.indexOf("\n *\n", start));
  return [...paragraph.slice(paragraph.indexOf("):") + 2).matchAll(/R-[A-Z]+(?:-[A-Z]+)*/g)].map(match => match[0]);
}

/** An identifier the reader reads as a key and never as a value (the reader's own list): a property access's or a qualified name's right side, a binding element's or an import specifier's property name, a label, a meta-property's or an import attribute's name. */
function inKeySlot(node: ts.Identifier): boolean {
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
/** Whether a node sits inside a type node: the type arguments of an instantiation expression do, its expression does not. */
function inTypeNode(node: ts.Node): boolean {
  for (let current = node.parent; current !== undefined; current = current.parent) {
    if (ts.isExpressionWithTypeArguments(current)) return false;
    if (ts.isTypeNode(current)) return true;
  }
  return false;
}
/** The readings of each name on each line of a pin's planted files, keyed `<file>:<line> <name>`: each identifier outside a type node and a key slot, named by nameOf, and each import.meta. */
function readingCounts(pin: PlantPin): Map<string, number> {
  const counts = new Map<string, number>();
  for (const [file, text] of Object.entries(pin.files)) {
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
    const visit = (node: ts.Node): void => {
      const name = ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword ? "import.meta" : ts.isIdentifier(node) && !inKeySlot(node) && !inTypeNode(node) ? nameOf(node) : undefined;
      if (name !== undefined) {
        const key = `${file}:${sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1} ${name}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      ts.forEachChild(node, visit);
    };
    visit(sf);
  }
  return counts;
}
/** A pin's findings whose line holds a number of readings of the finding's name other than one: two or more is a collapsed line (an edit that drops one reading leaves the line), none a finding the count does not see. */
function linesNotOfOne(pin: PlantPin): string[] {
  const counts = readingCounts(pin);
  return pin.findings.filter(finding => counts.get(finding.slice("GLOBAL ".length)) !== 1).map(finding => `${finding} x${counts.get(finding.slice("GLOBAL ".length)) ?? 0}`);
}
/** A file's tokens, trivia skipped: two files with the same tokens are one program up to whitespace and line breaks. */
function tokensOf(text: string): string[] {
  const scanner = ts.createScanner(ts.ScriptTarget.ESNext, true, ts.LanguageVariant.Standard, text);
  const out: string[] = [];
  for (let kind = scanner.scan(); kind !== ts.SyntaxKind.EndOfFileToken; kind = scanner.scan()) out.push(scanner.getTokenText());
  return out;
}
const findingNames = (pin: PlantPin): string[] => [...new Set(pin.findings.map(finding => finding.slice(finding.lastIndexOf(" ") + 1)))].sort();

interface Roster {
  readonly rows: readonly { readonly id: string; readonly label: string; readonly pins: readonly { readonly id: string; readonly digest: string }[] }[];
  readonly tests: readonly string[];
  readonly residuals: Readonly<Record<string, readonly string[]>>;
  readonly collapsed: Readonly<Record<string, string>>;
}
const readRoster = (): Roster => JSON.parse(readFileSync(join(ROOT, ROSTER), "utf8")) as Roster;

describe("APO snapshot GLOBAL binding reader census (wb-021.8, MW-ADAPTIVE-POLICY-ORGANIZATIONS-R2): judgeGlobals over each pinned plant of rows F, R, U, NS, EN, M, I, J and Q reads exactly its GLOBAL lines", () => {
  for (const row of ROWS) {
    for (const pin of row.pins) it(titleOf(row, pin), { timeout: PLANT_BUDGET_MS }, () => expect(judgePlant(pin), pin.what).toEqual([...pin.findings].sort()));
  }

  it("outside anchors: this bead's export row with its refusal #1 and #2 records and the parent's records of refusals #1 to #4, each member a pin of its row with the polarity its record states", () => {
    const own = exportRow(BEAD);
    expect(/^\[([^\]]+)\] /.exec(own.title)?.[1], "the export row's requirement id").toBe(REQUIREMENT);
    expect(own.description.startsWith(`Rule-19 structural-exit child of ${PARENT} `), "the export row's description names the parent").toBe(true);
    // This bead's own items: the NS plants its description names admitted, its META member, its GJ mutants, its notes' GK mutants.
    const nsAdmitted = tokens(span(own.description, "Nine gate plants are admitted as views [V] with findings []: ", ". Under Pi"), /\bNS\d+[A-Za-z]*/g);
    const meta = tokens(span(own.description, "- META (import.meta route): ", " Cure: "), /\bMETA\d+[A-Za-z]*/g);
    const gj = tokens(span(own.description, "- GJ (leg-2 judge): ", " - each owes"), /\bGJ\d+\b/g);
    const gk = tokens(span(own.notes, "(3) U3 again - judge mutants ", " survive"), /\bGK\d+\b/g);
    expect([nsAdmitted.length, meta.length, gj.length, gk.length], "the export row names nine NS plants, one META member, four GJ mutants and (its notes) three GK mutants").toEqual([9, 1, 4, 3]);
    expect(nsAdmitted.filter(member => globalCount(pinOf("NS", `U-${member}`)) < 1), "every NS plant the bead names admitted is a row NS pin with a GLOBAL line").toEqual([]);
    expect(meta.filter(member => pinOf("M", `U-${member}`)?.findings.some(finding => finding.endsWith(" import.meta")) !== true), "the bead's META member is a row M pin red at import.meta").toEqual([]);
    expect(gj.filter(member => pinOf("J", `U-${member}`) === undefined), "each GJ mutant the bead names has its row J witness").toEqual([]);
    // This bead's refusal #1 (on cut #1): its UNMET U1-U7 members, each a W-G14 witness pin of its row red through GLOBAL, and its F1 riders.
    const unmet = span(own.notes, "UNMET (record.unmet verbatim; 7 items, each led by its ledger slug):\n", "\n\nRESPIN SCOPE");
    const named = new Set<string>();
    const items = [...unmet.matchAll(/^- (U\d): ([^\n]*)/gm)].map(match => {
      const text = match[2] ?? "";
      const members = tokens(text, /\bG14-[A-Z]\d+[a-z]?\b/g).filter(member => !named.has(member));
      for (const member of members) named.add(member);
      return { id: match[1] ?? "", count: Number(/-(\d+)-GATE-MUTANTS?-SURVIVE/.exec(text)?.[1] ?? "-1"), members };
    });
    expect(
      items.map(item => `${item.id}:${item.count}:${item.members.length}`),
      "refusal #1's record names U1-U7, each slug's member count equal to the members its item names first",
    ).toEqual(["U1:10:10", "U2:13:13", "U3:14:14", "U4:4:4", "U5:1:1", "U6:2:2", "U7:1:1"]);
    const CURE_ROW: Readonly<Record<string, string>> = { U1: "M", U2: "NS", U3: "I", U4: "EN", U5: "U", U6: "U", U7: "R" };
    expect(
      items.flatMap(item => item.members.filter(member => globalCount(pinOf(CURE_ROW[item.id] ?? "", `W-${member}`)) < 1).map(member => `${item.id} ${member}`)),
      "each U1-U7 member refusal #1's record names is a W-G14 witness pin of its row with a GLOBAL line",
    ).toEqual([]);
    const riders = [...span(own.notes, "- F1 LOW RIDES: ", "\n- F2 INFO").matchAll(/\b(G14-[A-Z]+\d*)-[a-z-]+: [\s\S]*?(\d+) -> \d+/g)].map(match => [match[1] ?? "", Number(match[2])] as const);
    expect(riders.map(([member]) => member), "refusal #1's F1 names three riders").toEqual(["G14-MN", "G14-B3", "G14-N8"]);
    expect(
      riders.filter(([member, count]) => globalCount(pinOf("U", `W-${member}`)) !== count).map(([member]) => member),
      "each F1 rider is a W-G14 witness pin of row U holding the GLOBAL line count its record states before the arrow",
    ).toEqual([]);
    // This bead's refusal #2 (on cut #2): its UNMET U1-U3 members, each a W-G7 witness pin of its row with one GLOBAL line; the collapsed witnesses its slugs name; its F1 rider.
    const unmet2 = span(own.notes, "UNMET (record.unmet verbatim; 3 items, each led by its ledger slug):\n", "\n\nRED (record.red");
    const items2 = [...unmet2.matchAll(/^- (U\d): ([^\n]*)/gm)].map(match => {
      const text = match[2] ?? "";
      const slug = /^\S+/.exec(text)?.[0] ?? "";
      return { id: match[1] ?? "", count: Number(/-(\d+)-GATE-MUTANTS?-SURVIVE/.exec(slug)?.[1] ?? "-1"), members: tokens(text, /\bG7-[A-Z]\d+\b/g), collapsed: tokens(slug, /W-G14-[A-Z]\d+/g) };
    });
    expect(
      items2.map(item => `${item.id}:${item.count}:${item.members.length}:${item.collapsed.length}`),
      "refusal #2's record names U1-U3, each slug's member count equal to the members its item names, and the collapsed witnesses each slug names",
    ).toEqual(["U1:3:3:2", "U2:2:2:1", "U3:2:2:1"]);
    const CURE_ROW_2: Readonly<Record<string, string>> = { U1: "M", U2: "I", U3: "NS" };
    expect(
      items2.flatMap(item => item.members.filter(member => globalCount(pinOf(CURE_ROW_2[item.id] ?? "", `W-${member}`)) !== 1).map(member => `${item.id} ${member}`)),
      "each U1-U3 member refusal #2's record names is a W-G7 witness pin of its row with exactly one GLOBAL line",
    ).toEqual([]);
    expect(
      items2.flatMap(item => item.collapsed.map(witness => `${CURE_ROW_2[item.id] ?? ""} ${witness}`)).filter(key => COLLAPSED_SPLITS[key] === undefined),
      "each witness refusal #2's slugs name collapsed is a collapsed line of record in its row, split by its named pin",
    ).toEqual([]);
    const rider2 = tokens(span(own.notes, "- F1 MEDIUM RIDES: ", "\n- F2 INFO"), /\bG14-[A-Z]\d+\b/g);
    expect(rider2, "refusal #2's F1 rides one member").toEqual(["G14-I11"]);
    expect(
      rider2.filter(member => globalCount(pinOf("I", `W-${member}`)) !== 1),
      "refusal #2's F1 rider is a W-G14 witness pin of row I with exactly one GLOBAL line",
    ).toEqual([]);
    const parent = exportRow(PARENT);
    // Refusal #4's CLASSES OF RECORD: its admitted IE members and IE8 red, each control red at the count it states, each GK witness red once.
    const record4 = span(parent.notes, "CLASSES OF RECORD (BIND's statement for identity at the inversion ruling or in any child bead", "BIND READINGS");
    const admitted4 = tokens(span(record4, "Admitted with findings []: ", " (IE10"), /\bIE\d+\b/g);
    const unread4 = tokens(span(record4, "src-landable); ", "'s require edge"), /\bIE\d+\b/g);
    const controls4 = span(record4, "Controls without type arguments red: ", ". Claims it contradicts");
    const counted = [...controls4.matchAll(/((?:IE\d+[a-z](?:, | and )?)+)(?: \([^)]*\))? (\d+)/g)].flatMap(match => tokens(match[1], /\bIE\d+[a-z]\b/g).map(member => [member, Number(match[2])] as const));
    const witnesses = tokens(span(record4, "with witnesses ", " (each 1 -> 0"), /\bW-GK\d+-[a-z]+(?:-[a-z]+)*/g);
    expect([admitted4.length, unread4, counted.length, witnesses.length], "refusal #4's record names eleven admitted IE members, IE8, six controls and five GK witnesses").toEqual([11, ["IE8"], 6, 5]);
    expect([...admitted4, ...unread4].filter(member => globalCount(pinOf("I", `U-${member}`)) < 1), "every IE member refusal #4's record names admitted, and IE8, is a row I pin with a GLOBAL line").toEqual([]);
    expect(pinOf("I", "U-IE8")?.findings.some(finding => finding.endsWith(" require")), "U-IE8 reads its free name require").toBe(true);
    expect(counted.filter(([member, count]) => globalCount(pinOf("I", `U-${member}`)) !== count), "each control refusal #4's record names is a row I pin with exactly the count of GLOBAL lines it states").toEqual([]);
    const witnessRows = (id: string): string[] => ROWS.filter(row => row.pins.some(pin => pin.id === id)).map(row => row.id);
    expect(witnesses.filter(id => witnessRows(id).length !== 1 || globalCount(pinOf(witnessRows(id)[0] ?? "", id)) !== 1), "each GK witness refusal #4's record names is a pin of one row with exactly one GLOBAL line").toEqual([]);
    expect(gk.filter(mutant => !witnesses.some(id => id.startsWith(`W-${mutant}-`))), "each GK mutant the bead's notes name has a witness in refusal #4's record").toEqual([]);
    // Refusal #3's CLASSES OF RECORD: its NS members admitted and red controls red, its quiet control quiet, its META member red, its GJ mutants pinned.
    const u1 = span(parent.notes, "third failure. New members: ", " Claims the class contradicts");
    const controlsAt = u1.indexOf(" Controls: ");
    const redEnd = u1.indexOf(" red, ", controlsAt);
    const NAMESPACE_MEMBER = /\bNS(?:-C)?\d+[A-Za-z]*/g;
    const admitted3 = controlsAt < 0 ? [] : tokens(u1.slice(0, controlsAt), NAMESPACE_MEMBER);
    const redControls = controlsAt < 0 || redEnd < 0 ? [] : tokens(u1.slice(controlsAt, redEnd), NAMESPACE_MEMBER);
    const quietControls = redEnd < 0 ? [] : tokens(u1.slice(redEnd), NAMESPACE_MEMBER);
    const metaMembers = tokens(span(parent.notes, "IMPORT-META-ALIAS: a NEW class, first failure", " Claim it contradicts"), /\bMETA\d+[A-Za-z]*/g);
    const judgeSpan = span(parent.notes, "New members: GJ1", " This is that class");
    const judgeMutants = judgeSpan === "" ? [] : tokens(`GJ1${judgeSpan}`, /\bGJ\d+\b/g);
    expect([admitted3.length, redControls, quietControls, metaMembers, judgeMutants], "refusal #3's record names its NS members, its red and quiet controls, its META member and its GJ mutants").toEqual([
      11,
      ["NS-C1", "NS9"],
      ["NS-C2"],
      ["META1"],
      ["GJ1", "GJ4", "GJ15", "GJ16"],
    ]);
    expect([...admitted3, ...redControls].filter(member => globalCount(pinOf("NS", `U-${member}`)) < 1), "every NS member and red control refusal #3's record names is a row NS pin with a GLOBAL line").toEqual([]);
    expect(quietControls.filter(member => pinOf("NS", `U-${member}`)?.findings.length !== 0), "the control refusal #3's record names quiet is a row NS pin with no finding").toEqual([]);
    expect(metaMembers.filter(member => globalCount(pinOf("M", `U-${member}`)) < 1), "refusal #3's META member is a row M pin with a GLOBAL line").toEqual([]);
    expect(judgeMutants.filter(member => pinOf("J", `U-${member}`) === undefined), "each GJ mutant refusal #3's record names has its row J witness").toEqual([]);
    // Refusal #2's members (each a row U pin red through GLOBAL) and refusal #1's (each cured by the row R pin REFUSAL_1_CURES names).
    const members = (key: string, end: string): string[] => {
      const start = parent.notes.indexOf(key);
      const stop = start < 0 ? -1 : parent.notes.indexOf(end, start);
      return start < 0 || stop < 0 ? [] : [...parent.notes.slice(start, stop).matchAll(/\bGP?\d+[A-Za-z]?\b/g)].map(match => match[0]);
    };
    const second = members("Refusal #2 members: ", " Claims the class contradicts");
    expect(second.length, "refusal #2's record names its U1 members").toBe(18);
    expect(second.filter(member => globalCount(pinOf("U", `U-${member}`)) < 1), "every U1 member refusal #2's record names is a row U pin with a GLOBAL line").toEqual([]);
    const first = members("Refusal #1 members: ", ". Refusal #2 members");
    expect(Object.keys(REFUSAL_1_CURES), "the refusal #1 cure map names exactly the record's members, in order").toEqual(first);
    expect(first.filter(member => pinOf("R", REFUSAL_1_CURES[member] ?? "") === undefined), "every U1 member refusal #1's record names is cured by a row R pin").toEqual([]);
    // Internal checks: V-admitted-free holds ADMITTED_FREE in order; each IE member reads exactly its control; the residual families are this header's.
    const listed = /return \[([^\]]*)\]/.exec(Object.values(pinOf("F", "V-admitted-free")?.files ?? {}).join("\n"))?.[1] ?? "";
    expect(
      listed
        .split(",")
        .map(name => name.trim())
        .filter(name => name !== ""),
      "V-admitted-free references exactly ADMITTED_FREE, in order",
    ).toEqual([...ADMITTED_FREE]);
    for (const n of [1, 2, 3, 4, 5]) expect(pinOf("I", `U-IE${n}`)?.findings, `U-IE${n} reads exactly its control U-IE${n}c`).toEqual(pinOf("I", `U-IE${n}c`)?.findings);
    expect(Object.keys(RESIDUAL_FAMILIES), "the residual families equal this header's RESIDUALS line").toEqual(headerResiduals());
  });

  it("collapse guard (refusal #2, R-B268): each GLOBAL line of each pin holds one reading of its name, except the collapsed lines COLLAPSED_SPLITS lists, each split by its named pin into one reading per line", () => {
    const notOfOne = ROWS.flatMap(row => row.pins.map(pin => ({ key: `${row.id} ${pin.id}`, lines: linesNotOfOne(pin) })));
    expect(
      notOfOne.filter(entry => entry.lines.some(line => line.endsWith(" x0"))).map(entry => entry.key),
      "every finding of every pin has a reading of its name on its line",
    ).toEqual([]);
    expect(
      notOfOne.filter(entry => entry.lines.length > 0).map(entry => entry.key),
      "the pins with a collapsed GLOBAL line are exactly the collapsed lines of record, in row order",
    ).toEqual(Object.keys(COLLAPSED_SPLITS));
    for (const [key, splitId] of Object.entries(COLLAPSED_SPLITS)) {
      const [rowId = "", pinId = ""] = key.split(" ");
      const pin = pinOf(rowId, pinId);
      const split = pinOf(rowId, splitId);
      expect(split === undefined ? undefined : linesNotOfOne(split), `${key}'s split ${splitId} is a pin of row ${rowId} with one reading per GLOBAL line`).toEqual([]);
      expect(
        Object.entries(split?.files ?? {}).map(([file, text]) => [file, tokensOf(text)]),
        `${splitId} plants ${pinId}'s files, each its program token for token (line breaks added)`,
      ).toEqual(Object.entries(pin?.files ?? {}).map(([file, text]) => [file, tokensOf(text)]));
      expect(split === undefined ? [] : findingNames(split), `${splitId} reds the names ${pinId} reds`).toEqual(pin === undefined ? ["(no pin)"] : findingNames(pin));
    }
  });

  it("rule 16: every judged row, the residual families and the collapsed lines are frozen at their measured shape", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["F:6", "R:23", "U:53", "NS:44", "EN:16", "M:23", "I:43", "J:5", "Q:3"]);
    expect(Object.entries(RESIDUAL_FAMILIES).map(([family, members]) => `${family}:${members.join(",")}`)).toEqual(["R-FIELD-MUTATION:Q R-FIELD-MUTATION", "R-REFLECTIVE-REACH:Q R-REFLECTIVE-REACH", "R-UNLINKED-IMPORT:Q R-UNLINKED-IMPORT"]);
    expect(Object.entries(COLLAPSED_SPLITS).map(([pin, split]) => `${pin}>${split}`)).toEqual([
      "U U-wrapper-forms>S-U-wrapper-forms",
      "U W-G14-E7>S-W-G14-E7",
      "U U-wrapper-imports>S-U-wrapper-imports",
      "NS W-G14-R34>S-W-G14-R34",
      "EN U-EN-self>S-U-EN-self",
      "M W-G14-M10>S-W-G14-M10",
      "M W-G14-M20>S-W-G14-M20",
      "I W-G14-I5>S-W-G14-I5",
    ]);
  });

  it("roster: the judged rows, the registered tests, the residual families and the collapsed lines equal test/fixtures/apo-snapshot-global-reader-roster.json, in order and both ways", ({ task }) => {
    const roster = readRoster();
    expect(
      ROWS.map(row => ({ id: row.id, label: row.label, pins: row.pins.map(pin => ({ id: pin.id, digest: pinDigest(pin) })) })),
      "the judged rows, read now, equal the roster rows exactly and in order",
    ).toEqual(roster.rows);
    expect(RESIDUAL_FAMILIES, "the named residual families equal the roster's").toEqual(roster.residuals);
    expect(COLLAPSED_SPLITS, "the collapsed lines of record equal the roster's").toEqual(roster.collapsed);
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(roster.tests);
    const pinTitles = ROWS.flatMap(row => row.pins.map(pin => titleOf(row, pin)));
    expect(roster.tests.slice(0, pinTitles.length), "each pin registers its own test, in row order").toEqual(pinTitles);
    for (const member of Object.values(roster.residuals).flat()) expect(pinTitles, `${member} is a judged pin`).toContain(member);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const readEntry = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(readEntry), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
