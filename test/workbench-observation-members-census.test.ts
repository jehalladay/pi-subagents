/**
 * wb-km7q.11 (SDK-REACTIVE-FIBER-R2, program-triage-2026-10-18 child of wb-km7q; the rule-19 structural-exit child of wb-km7q.4,
 * orchestrator rulings R-B111 and R-B140): the falsifier census of the cured member reader, test/helpers/observation-members.ts
 * (observationMembers, the reader of wb-km7q.4's THE MEMBER CHECK). Statement (the bead's export title): "observationMembers reads
 * merged same-module declarations (NativeSnapshot/ObservationTrace class merges, augmentation blocks) or the B1 claims state the
 * top-level-interface scope, narrowed out of wb-km7q.4's fail-closed core (rule-19 structural exit)". This cut takes the first
 * branch: the reader reads those merges, and states in its header exactly what it reads and what it does not.
 *
 * ACCEPTANCE (the description's acceptance line, verbatim in ACCEPTANCE below and held to the tracker export): "each plant reds the
 * unmodified census and greens under the cure; claim text (header, LIMITS, comment, delivery note) and reader coverage agree
 * byte-for-byte with the falsifier roster." Read here as: every gate member wb-km7q.4's refusals #4 and #5 name is a GATE row, laid
 * over the real module text in memory and pinned with the cured reading, which differs from BASE where wb-km7q.4's cut #4 or #5
 * reader read it as BASE (so THE MEMBER CHECK throws on every one of them); the helper's header roster lines equal its exported
 * rosters byte for byte; every roster word has a FORMS row whose reading without the word differs from its reading with it; every
 * node kind TypeScript's parser yields for a type, a type member, a class member, a property name and a modifier has a row pinning
 * what the reader reads of it; and the TypeScript checker reads every row's text no narrower than the reader (AGREEMENT).
 *
 * MEMBER CHECK MODEL: wb-km7q.4's B1 feeds exactly the entries of the real module's reading (its comparisons are equal on the real
 * module, which that census asserts), so a plant reds THE MEMBER CHECK exactly when its reading differs from BASE as a multiset
 * (B1 compares sorted lists). Every pin states that difference for one list: `=` (none), `?` (the root reads `?`), `none` (an empty
 * list) or the entries removed (`-<entry>`, in BASE order) and added (`+<entry>`, in reading order; a run as `<entry>*<n>`).
 *
 * ROWS:
 *  ITEM: the description's items U1 and U2 and its acceptance line, the R-B140 ruling note, and the three refusal lines of
 *   wb-km7q.4's notes the items fold (refusal #4's U1, refusal #5's U1 and U2), each with its label (the line's head before its
 *   first '. ', the whole line when it holds none) and the member names its line holds (O<n>, O<n>b and O<n>bt; GP-<name> and GM-<name>); R-B140's members are the GM
 *   names whose mutant clause its note spells (MUTANT_CLAUSES); U2's are the two sentences it refuses, which the helper header holds
 *   nowhere.
 *  GATE: one row per member the three refusal lines name, in their order; each plant is the gate's text (quoted by the line where it
 *   quotes it, `quotes <n>` counting those quotes, each held to the planted text) and pins its reading. The journey twins O7b, O7bt,
 *   O15b and O15bt are their merge plus a stand-in behaviour edit (an exported function reading the merged or declared member): the
 *   reader reads declarations only, so each reads as its merge does. A GM row names its fail-open witness (`witness <id>`) and lays
 *   the witness's plant: the mutant made cut #5 read that witness as BASE, and this reader keeps no name set for it to lose.
 *  BASE: the real module's two lists, entry by entry.
 *  FORMS: one or more calibration plants per roster word, each with its reading under every word and under every word but its own.
 *  TYPES: one or more rows per node kind ts.isTypeNode accepts, each a NativeSnapshot.subjectBasis type holding that kind, except the
 *   two kinds the parser never yields there (UNREACHABLE: intrinsic reads as a type reference in a member, and an expression with
 *   type arguments stands only in a heritage clause or an expression), each shown by a parse.
 *  MEMBERS: one or more rows per kind ts.isTypeElement accepts (an interface member; NotEmittedTypeElement is synthetic, made only
 *   by the factory), per kind ts.isClassElement accepts (a class merge's element), per kind ts.isPropertyName accepts (a member's
 *   name), and per modifier kind ts.isModifier accepts (and a decorator) on a class property, a class declaration and a property
 *   signature, except the modifiers the parser reads as no modifier there (NOT_MODIFIERS, each shown by a parse).
 *  RESIDUALS: one or more rows per NOT READ word of the helper (one per example its claim names): a quiet plant that reads BASE and
 *   a loud twin that does not; the other-file quiet row also pins the checker reading the sibling augmentation the reader cannot see.
 *
 * ANCHORS OUTSIDE THIS FILE (standing rule 16, CT5 and CT6): the tracker export .beads/issues.jsonl (wb-km7q.11's description lines
 * and its R-B140 note; wb-km7q.4's notes, each the FIRST line opening with its prefix, so a later note quoting one binds nothing):
 * the GATE rows are exactly the members its three refusal lines name, and the quotes are its quotes; the helper's exported rosters
 * (every word a FORMS row, every NOT READ word a RESIDUALS row); TypeScript's ts.isTypeNode, ts.isTypeElement, ts.isClassElement,
 * ts.isPropertyName and ts.isModifier over every SyntaxKind (the TYPES and MEMBERS kinds); the TypeScript checker (BASE, and the
 * AGREEMENT of every row); src/workbench/observation.ts read from disk (BASE).
 * SELF-ANCHORED (held only by this file's literals; a coordinated removal from all of them reads green, and that is NOT claimed): a
 * FORMS row of a word that keeps another FORMS row; a TYPES or MEMBERS row of a kind that keeps another row; a RESIDUALS row of a
 * word that keeps another row; a GATE row's plant beyond the quotes its line gives.
 * FROZEN SHAPE (standing rule 16): one literal pins every row as <table>:<id>:<pin count>.
 *
 * NOT CLAIMED: anything of wb-km7q.4's census beyond the reader (its journeys, its comparisons' fed lists, its other legs); that a
 * plant type-checks (the gate's plants did; the TYPES and MEMBERS rows are syntax and some are not type-correct, which the reader,
 * a parser reading, does not judge); the NOT READ families, each held to a pinned quiet row; the checker's reading where the reader
 * reads `?` (AGREEMENT is one-sided: a reader entry is never wider than the checker's member, and `?` stands for anything).
 *
 * Display paths added: none. Test-only: it spawns nothing and writes nothing; it reads the helper, the tracker export and
 * src/workbench/observation.ts, lays every plant over that text in memory, and runs the TypeScript checker over in-memory files.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  ALL_WORDS,
  HEADER_SECTIONS,
  NOT_READ,
  OBSERVATION_MODULE,
  type ObservationMembers,
  observationMembers,
  ROOTS,
  type Word,
  words,
} from "./helpers/observation-members.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BEAD = "wb-km7q.11";
const PARENT = "wb-km7q.4";
const HELPER = "test/helpers/observation-members.ts";
const EXPORT = ".beads/issues.jsonl";
/** Every case parses sources or runs the checker; the explicit budget keeps a loaded host's slowness from reading as a finding. */
const BUDGET_MS = 300_000;
const MODULE_TEXT = readFileSync(join(ROOT, OBSERVATION_MODULE), "utf8");
const HELPER_TEXT = readFileSync(join(ROOT, HELPER), "utf8");

// ---------------------------------------------------------------------------------------------------------- the tracker export
interface BeadText {
  readonly description: string;
  readonly notes: string;
}
function beadText(id: string): BeadText {
  for (const line of readFileSync(join(ROOT, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (typeof row !== "object" || row === null) continue;
    const record: Readonly<Record<string, unknown>> = row as Readonly<Record<string, unknown>>;
    if (record.id !== id) continue;
    return { description: typeof record.description === "string" ? record.description : "", notes: typeof record.notes === "string" ? record.notes : "" };
  }
  throw new Error(`${EXPORT} holds no row ${id}`);
}
const CHILD = beadText(BEAD);
const PARENT_TEXT = beadText(PARENT);
/** The first line of a text opening with a prefix ("" when none does). */
const firstLine = (text: string, prefix: string): string => text.split("\n").find(line => line.startsWith(prefix)) ?? "";
/** A line's head: its text before its first '. ' (the whole line when it holds none). */
const headOf = (line: string): string => (line.includes(". ") ? line.slice(0, line.indexOf(". ")) : line);
const unique = (names: readonly string[]): string[] => [...new Set(names)];
/** The gate member names a refusal line holds, in order of first appearance. */
const memberNames = (line: string): string[] => unique([...line.matchAll(/\bO\d+(?:bt|b)?\b|\bG[PM]-[A-Za-z]+\b/gu)].map(match => match[0]));
/** The quotes a refusal line gives one member: refusal #4's `O<n> (a )'<text>'`, and every backtick quote between the member's first
 * name and the next member name on a refusal #5 line. */
function quotesOf(line: string, member: string): string[] {
  const single = [...line.matchAll(/\b(O\d+) (?:a )?'([^']+)'/gu)].filter(match => match[1] === member).map(match => match[2] ?? "");
  const names = [...line.matchAll(/\bO\d+(?:bt|b)?\b|\bG[PM]-[A-Za-z]+\b/gu)];
  const at = names.findIndex(match => match[0] === member);
  const start = at < 0 ? -1 : (names[at]?.index ?? 0) + member.length;
  const end = at < 0 ? -1 : (names[at + 1]?.index ?? line.length);
  const segment = start < 0 ? "" : line.slice(start, end);
  const ticks = member.startsWith("G") ? [...segment.matchAll(/`([^`]+)`/gu)].map(match => match[1] ?? "") : [];
  return [...single, ...ticks];
}

// ---------------------------------------------------------------------------------------------------------- plants
/** A plant: the real module's text with an edit spliced in at a position its own syntax tree gives. */
type Plant = (text: string) => string;
function probeInterface(text: string, name: string): ts.InterfaceDeclaration {
  const source = ts.createSourceFile(OBSERVATION_MODULE, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found = source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
  if (found === undefined) throw new Error(`plant: the module text declares no top-level interface ${name}`);
  return found;
}
const splice = (text: string, start: number, end: number, insert: string): string => `${text.slice(0, start)}${insert}${text.slice(end)}`;
const asIs: Plant = text => text;
/** The module text with `lines` appended at its end. */
const appended =
  (...lines: string[]): Plant =>
  text =>
    `${text}\n${lines.join("\n")}\n`;
/** The interface `name` with `member` added before its closing brace. */
const withMember =
  (name: string, member: string): Plant =>
  text => {
    const declaration = probeInterface(text, name);
    return splice(text, declaration.end - 1, declaration.end - 1, `\n  ${member}\n`);
  };
/** The member `member` of the interface `name` with its declared type replaced by `type`. */
const retyped =
  (name: string, member: string, type: string): Plant =>
  text => {
    const found = probeInterface(text, name).members.find(entry => ts.isPropertySignature(entry) && ts.isIdentifier(entry.name) && entry.name.text === member);
    const node = found !== undefined && ts.isPropertySignature(found) ? found.type : undefined;
    if (node === undefined) throw new Error(`plant: the interface ${name} has no typed member ${member}`);
    return splice(text, node.getStart(), node.end, type);
  };
/** The interface `name` with `insert` spliced in right after its name. */
const afterName =
  (name: string, insert: string): Plant =>
  text => {
    const declaration = probeInterface(text, name);
    return splice(text, declaration.name.end, declaration.name.end, insert);
  };
/** The interface `name` declared under the name `to` (every reference to `name` left as it is). */
const renamed =
  (name: string, to: string): Plant =>
  text => {
    const declaration = probeInterface(text, name);
    return splice(text, declaration.name.getStart(), declaration.name.end, to);
  };
const both =
  (...plants: Plant[]): Plant =>
  text =>
    plants.reduce((current, plant) => plant(current), text);
/** NativeSnapshot.subjectBasis retyped (the TYPES rows' member). */
const subject = (type: string): Plant => retyped("NativeSnapshot", "subjectBasis", type);
/** A class merge into NativeSnapshot holding `element`. */
const snapshotClass = (element: string, head = "export declare class"): Plant => appended(`${head} NativeSnapshot { ${element} }`);

// ---------------------------------------------------------------------------------------------------------- readings
const BASE_READING = observationMembers(MODULE_TEXT);
const runs = (sign: string, entries: readonly string[]): string[] => {
  const out: string[] = [];
  for (let at = 0; at < entries.length; ) {
    let end = at;
    while (end < entries.length && entries[end] === entries[at]) end += 1;
    out.push(end - at === 1 ? `${sign}${entries[at]}` : `${sign}${entries[at]}*${end - at}`);
    at = end;
  }
  return out;
};
/** One list's difference from BASE (MEMBER CHECK MODEL). */
function deltaOf(base: readonly string[], list: readonly string[]): string {
  if (list.length === 1 && list[0] === "?") return "?";
  if (list.length === 0) return "none";
  const left = [...base];
  const added: string[] = [];
  for (const entry of list) {
    const at = left.indexOf(entry);
    if (at >= 0) left.splice(at, 1);
    else added.push(entry);
  }
  const parts = [...runs("-", left), ...runs("+", added)];
  return parts.length === 0 ? "=" : parts.join(" ");
}
const readingPins = (reading: ObservationMembers, prefix = ""): string[] => [
  `${prefix}snapshot ${deltaOf(BASE_READING.snapshot, reading.snapshot)}`,
  `${prefix}event ${deltaOf(BASE_READING.event, reading.event)}`,
];
const without = (word: Word): readonly Word[] => ALL_WORDS.filter(entry => entry !== word);
/** The pins of a row that open with one of `prefixes`. */
const pinsWith = (pins: readonly string[], ...prefixes: string[]): string[] => pins.filter(pin => prefixes.some(prefix => pin.startsWith(prefix)));

// ---------------------------------------------------------------------------------------------------------- ITEM
type Home = "child description" | "child notes" | "parent notes";
interface ItemRow {
  readonly id: string;
  readonly home: Home;
  readonly pins: readonly string[];
}
const U1 =
  "- U1 same-module merges: a type-valid declaration merged from inside observation.ts adds a declared member with no journey, no throw, no residual - (a) a class merged into NativeSnapshot, (b) a class merged into ObservationTrace, (c) a same-module augmentation block";
const U2 =
  "- U2 delivery-note guard: the CLASS-LEVEL GUARD (2) sentence 'fails closed against observation.ts's AST' and 'LIMITS names the one shape outside it' must state exactly what the cut proves, no wider (R-B89's clause).";
const RF4_U1 = "- U1-MEDIUM-CONFIRMED-R514-R515-B1-FAIL-CLOSED-MEMBER-READER-MISSES-SAME-MODULE-MERGES: B1's fail-closed member check claims more than its reader reads";
const RF5_U1 =
  "- U1 MEDIUM (R514/R515 claim wider than the reader on the FAIL-CLOSED CORE; contradicts R-B111's 'fail closed outside the pinned set' and 'the delivery note states exactly what the cut proves, no wider')";
const RF5_U2 = "- U2 MEDIUM (R514: claim words with no falsifier; contradicts R-B111's 'no claim word survives without a falsifier'; meets the R-B126 witness standard)";
const RB140 =
  "ORCHESTRATOR RULING R-B140 (M:38720, rule-19 DEPENDENCY INVERSION, 2026-10-30): wb-km7q.4's FINAL fail-closed-core cut #5 (58ba796d) was refused at O:1462, so the R-B111 branch executed: this bead is no longer blocked by wb-km7q.4; wb-km7q.4 is now blocked by THIS bead and parked";
/** R-B140's spelling of each surviving mutant of cut #5's reader, and the name refusal #5's U2 line gives it. */
const MUTANT_CLAUSES: Readonly<Record<string, string>> = {
  "import-equals clause off": "GM-importEquals",
  "default-import name off": "GM-importDefault",
  "typeNames interface clause off": "GM-typeNamesInterface",
  "holds depth limited to 1": "GM-holdsShallow",
};
const ACCEPTANCE =
  "Acceptance: each plant reds the unmodified census and greens under the cure; claim text (header, LIMITS, comment, delivery note) and reader coverage agree byte-for-byte with the falsifier roster.";
const ITEM_ROWS: readonly ItemRow[] = [
  { id: "U1", home: "child description", pins: [`label ${U1}`, "members O7 O15 O8 O7b O15b"] },
  {
    id: "U2",
    home: "child description",
    pins: [`label ${U2}`, "members -", "refused fails closed against observation.ts's AST", "refused LIMITS names the one shape outside it"],
  },
  { id: "ACCEPTANCE", home: "child description", pins: [`line ${ACCEPTANCE}`] },
  { id: "R-B140", home: "child notes", pins: [`label ${RB140}`, "members GM-importEquals GM-importDefault GM-typeNamesInterface GM-holdsShallow"] },
  { id: "RF4-U1", home: "parent notes", pins: [`label ${RF4_U1}`, "members O7 O15 O8 O7b O15b O7bt O15bt"] },
  {
    id: "RF5-U1",
    home: "parent notes",
    pins: [
      `label ${RF5_U1}`,
      "members GP-globalBrandSnapshot GP-globalBrandEvent GP-globalBrandInner GP-globalLeafSnapshot GP-topBrandSnapshot GP-topBrandEvent GP-topBrandInner GP-topLeafSnapshot GP-inlineBrandSnapshot GP-globalAliasSnapshot GP-globalAliasEvent GP-globalAliasInner GP-globalInterfaceUnion GP-topInterfaceUnion GP-thisUnion GP-selfRefUnion",
    ],
  },
  {
    id: "RF5-U2",
    home: "parent notes",
    pins: [`label ${RF5_U2}`, "members GM-importEquals GP-importEqualsBrand GM-importDefault GP-defaultImportFile GM-typeNamesInterface GP-topShapeBrand GM-holdsShallow GP-deepBrand"],
  },
];
const homeText = (home: Home): string => (home === "child description" ? CHILD.description : home === "child notes" ? CHILD.notes : PARENT_TEXT.notes);
/** An item's line in its home: the first line opening with its label (the acceptance line whole). */
function itemLine(row: ItemRow): string {
  const label = pinsWith(row.pins, "label ")[0]?.slice("label ".length);
  if (label !== undefined) return firstLine(homeText(row.home), label);
  const line = pinsWith(row.pins, "line ")[0]?.slice("line ".length) ?? "";
  return homeText(row.home).split("\n").find(entry => entry === line) ?? "";
}
/** The members an item's line names: gate names, or (R-B140) the GM names of the mutant clauses it spells. */
function itemMembers(row: ItemRow, line: string): string[] {
  if (row.id === "R-B140") return Object.entries(MUTANT_CLAUSES).flatMap(([clause, name]) => (line.includes(clause) ? [name] : []));
  return memberNames(line);
}

// ---------------------------------------------------------------------------------------------------------- GATE
interface GateRow {
  readonly id: string;
  readonly plant: Plant;
  readonly pins: readonly string[];
}
const O7 = "export declare class NativeSnapshot { region?: string }";
const O15 = "export declare class ObservationTrace { traceState?: string }";
const O8 = 'declare module "./observation.js" { interface NativeSnapshot { region?: string } }';
const GATE_BRAND = "string & { readonly region?: string }";
const GLOBAL_BRAND = `declare global { type GateBrand = ${GATE_BRAND} }`;
const TOP_BRAND = `export type GateBrand = ${GATE_BRAND};`;
const GLOBAL_ALIAS = "declare global { type GateAlias = string | { region?: string } }";
const SNAPSHOT_SUBJECT = ["snapshot -subjectBasis +subjectBasis.?", "event ="];
const EVENT_SUBJECT = ["snapshot =", "event -subjectBasis +subjectBasis.?"];
const INNER_SPAN = ["snapshot -trace.spanId +trace.?", "event -trace.spanId +trace.?"];
const SNAPSHOT_REGION = ["snapshot +region", "event ="];
const TRACE_STATE = ["snapshot +trace.traceState", "event +trace.traceState"];
const GATE_PLANTS: Readonly<Record<string, Plant>> = {
  O7: appended(O7),
  O15: appended(O15),
  O8: appended(O8),
  O7b: appended(O7, "export const keepsSealOnRegion = (snapshot: NativeSnapshot): boolean => snapshot.region !== undefined;"),
  O15b: appended(O15, "export const upgradesOnTraceState = (event: ObservationEvent): boolean => event.trace?.traceState !== undefined;"),
  O7bt: appended(O7, "export const keepsSealOnCursor = (snapshot: NativeSnapshot): boolean => snapshot.cursor !== undefined;"),
  O15bt: appended(O15, "export const upgradesOnSpanId = (event: ObservationEvent): boolean => event.trace?.spanId !== undefined;"),
  "GP-globalBrandSnapshot": both(subject("GateBrand"), appended(GLOBAL_BRAND)),
  "GP-globalBrandEvent": both(retyped("ObservationEvent", "subjectBasis", "GateBrand"), appended(GLOBAL_BRAND)),
  "GP-globalBrandInner": both(retyped("ObservationTrace", "spanId", "GateBrand"), appended(GLOBAL_BRAND)),
  "GP-globalLeafSnapshot": both(subject("GateLeaf"), appended("declare global { type GateLeaf = string }")),
  "GP-topBrandSnapshot": both(subject("GateBrand"), appended(TOP_BRAND)),
  "GP-topBrandEvent": both(retyped("ObservationEvent", "subjectBasis", "GateBrand"), appended(TOP_BRAND)),
  "GP-topBrandInner": both(retyped("ObservationTrace", "spanId", "GateBrand"), appended(TOP_BRAND)),
  "GP-topLeafSnapshot": both(subject("GateLeaf"), appended("export type GateLeaf = string;")),
  "GP-inlineBrandSnapshot": subject(GATE_BRAND),
  "GP-globalAliasSnapshot": both(subject("GateAlias"), appended(GLOBAL_ALIAS)),
  "GP-globalAliasEvent": both(retyped("ObservationEvent", "subjectBasis", "GateAlias"), appended(GLOBAL_ALIAS)),
  "GP-globalAliasInner": both(retyped("ObservationTrace", "spanId", "GateAlias"), appended(GLOBAL_ALIAS)),
  "GP-globalInterfaceUnion": both(subject("string | GateShape"), appended("declare global { interface GateShape { region?: string } }")),
  "GP-topInterfaceUnion": both(subject("string | GateShape"), appended("export interface GateShape { region?: string }")),
  "GP-thisUnion": subject("string | this"),
  "GP-selfRefUnion": subject("string | NativeSnapshot"),
  "GP-importEqualsBrand": both(subject("GateBrand"), appended(`export namespace gateNs { export type GateBrand = ${GATE_BRAND} }`, "import GateBrand = gateNs.GateBrand;")),
  "GP-defaultImportFile": both(subject("GateDefault"), appended('import type GateDefault from "./zz-gp10-gate-basis.js";')),
  "GP-topShapeBrand": both(subject("string & GateShape"), appended("export interface GateShape { readonly region?: string }")),
  "GP-deepBrand": subject("string & Readonly<{ readonly region?: string }>"),
};
/** The sibling module GP-defaultImportFile's import names (the gate's untracked file; read by no reading, held to its quote). */
const GATE_SIBLINGS: Readonly<Record<string, string>> = {
  "GP-defaultImportFile": `type GateBasis = ${GATE_BRAND};\nexport default GateBasis;\n`,
};
const gateRow = (id: string, pins: readonly string[]): GateRow => {
  const witness = pinsWith(pins, "witness ")[0]?.slice("witness ".length);
  const plant = GATE_PLANTS[witness ?? id];
  if (plant === undefined) throw new Error(`GATE: no plant for ${id}`);
  return { id, plant, pins };
};
const GATE_ROWS: readonly GateRow[] = [
  gateRow("O7", [...SNAPSHOT_REGION, "quotes 1"]),
  gateRow("O15", [...TRACE_STATE, "quotes 1"]),
  gateRow("O8", [...SNAPSHOT_REGION, "quotes 1"]),
  gateRow("O7b", [...SNAPSHOT_REGION, "quotes 0"]),
  gateRow("O15b", [...TRACE_STATE, "quotes 0"]),
  gateRow("O7bt", [...SNAPSHOT_REGION, "quotes 0"]),
  gateRow("O15bt", [...TRACE_STATE, "quotes 0"]),
  gateRow("GP-globalBrandSnapshot", [...SNAPSHOT_SUBJECT, "quotes 2"]),
  gateRow("GP-globalBrandEvent", [...EVENT_SUBJECT, "quotes 0"]),
  gateRow("GP-globalBrandInner", [...INNER_SPAN, "quotes 0"]),
  gateRow("GP-globalLeafSnapshot", [...SNAPSHOT_SUBJECT, "quotes 2"]),
  gateRow("GP-topBrandSnapshot", [...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-topBrandEvent", [...EVENT_SUBJECT, "quotes 0"]),
  gateRow("GP-topBrandInner", [...INNER_SPAN, "quotes 0"]),
  gateRow("GP-topLeafSnapshot", [...SNAPSHOT_SUBJECT, "quotes 1"]),
  gateRow("GP-inlineBrandSnapshot", [...SNAPSHOT_SUBJECT, "quotes 1"]),
  gateRow("GP-globalAliasSnapshot", [...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-globalAliasEvent", [...EVENT_SUBJECT, "quotes 0"]),
  gateRow("GP-globalAliasInner", [...INNER_SPAN, "quotes 1"]),
  gateRow("GP-globalInterfaceUnion", [...SNAPSHOT_SUBJECT, "quotes 2"]),
  gateRow("GP-topInterfaceUnion", [...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-thisUnion", [...SNAPSHOT_SUBJECT, "quotes 1"]),
  gateRow("GP-selfRefUnion", [...SNAPSHOT_SUBJECT, "quotes 2"]),
  gateRow("GM-importEquals", ["witness GP-importEqualsBrand", ...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-importEqualsBrand", [...SNAPSHOT_SUBJECT, "quotes 3"]),
  gateRow("GM-importDefault", ["witness GP-defaultImportFile", ...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-defaultImportFile", [...SNAPSHOT_SUBJECT, "quotes 3"]),
  gateRow("GM-typeNamesInterface", ["witness GP-topShapeBrand", ...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-topShapeBrand", [...SNAPSHOT_SUBJECT, "quotes 2"]),
  gateRow("GM-holdsShallow", ["witness GP-deepBrand", ...SNAPSHOT_SUBJECT, "quotes 0"]),
  gateRow("GP-deepBrand", [...SNAPSHOT_SUBJECT, "quotes 1"]),
];
/** The refusal line that names a gate member. */
const gateLine = (id: string): string =>
  [firstLine(PARENT_TEXT.notes, RF4_U1), firstLine(PARENT_TEXT.notes, RF5_U1), firstLine(PARENT_TEXT.notes, RF5_U2)].find(line => memberNames(line).includes(id)) ?? "";

// ---------------------------------------------------------------------------------------------------------- BASE
const BASE_ROW = {
  id: "observation.ts",
  pins: [
    "snapshot sequence cursor sourceRevision coverage nativePayloadRef kind definitionDigest trace.invocationId trace.parentSpan trace.spanId trace.correlationIds subjectBasis sourceVersion evidenceRefs interval.startedAt interval.endedAt",
    "event sourceSequence sourceCursor previousCursor sourceTimestamp node.presentation node.definitionDigest trace.invocationId trace.parentSpan trace.spanId trace.correlationIds subjectBasis sourceVersion evidenceRefs payloadRef interval.startedAt interval.endedAt",
  ],
} as const;

// ---------------------------------------------------------------------------------------------------------- FORMS
interface FormRow {
  readonly word: Word;
  readonly id: string;
  readonly plant: Plant;
  readonly pins: readonly string[];
}
const form = (word: Word, id: string, plant: Plant, pins: readonly string[]): FormRow => ({ word, id, plant, pins });
const TRACE_REFUSED = "-trace.invocationId -trace.parentSpan -trace.spanId -trace.correlationIds +trace.?";
const INTERVAL_REFUSED = "-interval.startedAt -interval.endedAt +interval.?";
const ALL_SNAPSHOT = BASE_ROW.pins[0].slice("snapshot ".length).split(" ");
const ALL_EVENT = BASE_ROW.pins[1].slice("event ".length).split(" ");
const removedAll = (entries: readonly string[]): string => entries.map(entry => `-${entry}`).join(" ");
const FORM_ROWS: readonly FormRow[] = [
  form("interface", "declaredTwice", appended("export interface ObservationEvent { region?: string }"), ["snapshot =", "event +region", "without snapshot ?", "without event ?"]),
  form("interface", "redeclaredMember", appended("export interface NativeSnapshot { cursor?: string }"), ["snapshot +cursor", "event =", "without snapshot ?", "without event ?"]),
  form("class merge", "O7", appended(O7), ["snapshot +region", "event =", "without snapshot ?", "without event ="]),
  form("class merge", "escapedClassMerge", appended("export declare class Native\\u0053napshot { region?: string }"), [
    "snapshot +region",
    "event =",
    "without snapshot ?",
    "without event =",
  ]),
  form("class merge", "classWithBody", appended("export class NativeSnapshot { region?: string; readonly zone?: string; public site?: string }"), [
    "snapshot +region +zone +site",
    "event =",
    "without snapshot ?",
    "without event =",
  ]),
  form("augmentation", "O8", appended(O8), ["snapshot +region", "event =", "without snapshot ?", "without event ="]),
  form("augmentation", "noExtension", appended('declare module "./observation" { interface NativeSnapshot { region?: string } }'), [
    "snapshot +region",
    "event =",
    "without snapshot ?",
    "without event =",
  ]),
  form("augmentation", "tsExtension", appended('declare module "./observation.ts" { interface NativeSnapshot { region?: string } }'), [
    "snapshot +region",
    "event =",
    "without snapshot ?",
    "without event =",
  ]),
  form("augmentation", "parentPath", appended('declare module "../workbench/observation.js" { export interface ObservationTrace { traceState?: string } }'), [
    "snapshot +trace.traceState",
    "event +trace.traceState",
    `without snapshot ${TRACE_REFUSED}`,
    `without event ${TRACE_REFUSED}`,
  ]),
  form("missing", "renamedSnapshot", renamed("NativeSnapshot", "NativeSnapshotRenamed"), ["snapshot ?", "event =", "without snapshot none", "without event ="]),
  form("elsewhere", "functionOfName", appended("export function ObservationEvent(): void {}"), ["snapshot =", "event ?", "without snapshot =", "without event ="]),
  form("elsewhere", "namespaceOfName", appended('export namespace Interval { export const unit = "ms"; }'), [
    `snapshot ${INTERVAL_REFUSED}`,
    `event ${INTERVAL_REFUSED}`,
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "interfaceInNamespace", appended("export namespace inner { export interface ObservationTrace { traceState?: string } }"), [
    `snapshot ${TRACE_REFUSED}`,
    `event ${TRACE_REFUSED}`,
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "variableOfName", appended('export const Interval = "interval";'), [`snapshot ${INTERVAL_REFUSED}`, `event ${INTERVAL_REFUSED}`, "without snapshot =", "without event ="]),
  form("elsewhere", "enumOfName", appended("export enum ObservationTrace { Span }"), [`snapshot ${TRACE_REFUSED}`, `event ${TRACE_REFUSED}`, "without snapshot =", "without event ="]),
  form("elsewhere", "typeAliasInNamespace", appended("export namespace inner { export type NativeSnapshot = string; }"), ["snapshot ?", "event =", "without snapshot =", "without event ="]),
  form("elsewhere", "importOfName", appended('import type { NativeSnapshot as Snapshot } from "./other.js";'), ["snapshot ?", "event =", "without snapshot =", "without event ="]),
  form("elsewhere", "exportSpecifier", appended("export type { ObservationTrace as TraceAlias };"), [`snapshot ${TRACE_REFUSED}`, `event ${TRACE_REFUSED}`, "without snapshot =", "without event ="]),
  form("elsewhere", "propertyNamed", appended("export const holder = { NativeSnapshot: 1 };"), ["snapshot ?", "event =", "without snapshot =", "without event ="]),
  form("elsewhere", "parameterNamed", appended("export function probe(ObservationEvent: string): string { return ObservationEvent; }"), [
    "snapshot =",
    "event ?",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "typeQueryOfName", appended("export type Probe = typeof NativeSnapshot;"), ["snapshot ?", "event =", "without snapshot =", "without event ="]),
  form("elsewhere", "qualifiedName", appended("export type Probe = globalThis.NativeSnapshot;"), ["snapshot ?", "event =", "without snapshot =", "without event ="]),
  form("elsewhere", "globalBlock", appended("declare global { interface ObservationEvent { region?: string } }"), ["snapshot =", "event ?", "without snapshot =", "without event ="]),
  form("elsewhere", "otherModuleBlock", appended('declare module "./other.js" { interface NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "mjsSpecifier", appended('declare module "./observation.mjs" { interface NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "bareSpecifier", appended('declare module "observation.js" { interface NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "caseSpecifier", appended('declare module "./Observation.js" { interface NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "indexSpecifier", appended('declare module "./observation/index.js" { interface NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "namespaceInAugmentation", appended('declare module "./observation.js" { namespace inner { interface NativeSnapshot { region?: string } } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("elsewhere", "classInAugmentation", appended('declare module "./observation.js" { class NativeSnapshot { region?: string } }'), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("heritage", "extendsClause", both(afterName("NativeSnapshot", " extends Base"), appended("interface Base { region?: string }")), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("heritage", "classExtends", appended("export declare class NativeSnapshot extends Base {}", "declare class Base { region?: string }"), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("heritage", "classImplements", appended("export declare class ObservationTrace implements Base {}", "interface Base { region?: string }"), [
    `snapshot ${TRACE_REFUSED}`,
    `event ${TRACE_REFUSED}`,
    "without snapshot =",
    "without event =",
  ]),
  form("heritage", "augmentationExtends", appended('declare module "./observation.js" { interface NativeSnapshot extends Base {} }', "interface Base { region?: string }"), [
    "snapshot ?",
    "event =",
    "without snapshot =",
    "without event =",
  ]),
  form("type parameters", "interfaceTypeParameters", afterName("ObservationTrace", "<T = string>"), [
    `snapshot ${TRACE_REFUSED}`,
    `event ${TRACE_REFUSED}`,
    "without snapshot =",
    "without event =",
  ]),
  form("type parameters", "classTypeParameters", appended("export declare class Interval<T> {}"), [`snapshot ${INTERVAL_REFUSED}`, `event ${INTERVAL_REFUSED}`, "without snapshot =", "without event ="]),
  form("class modifier", "abstractClass", appended("export declare abstract class NativeSnapshot { region?: string }"), [
    "snapshot ?",
    "event =",
    "without snapshot +region",
    "without event =",
  ]),
  form("class modifier", "defaultClass", appended("export default class NativeSnapshot { region?: string }"), ["snapshot ?", "event =", "without snapshot +region", "without event ="]),
  form("class modifier", "decoratedClass", appended("@sealed export class NativeSnapshot { region?: string }"), ["snapshot ?", "event =", "without snapshot +region", "without event ="]),
  form("property", "asIs", asIs, [
    "snapshot =",
    "event =",
    `without snapshot ${removedAll(ALL_SNAPSHOT)} +?*17`,
    `without event ${removedAll(ALL_EVENT)} +?*16`,
  ]),
  form("other member", "methodMember", withMember("NativeSnapshot", "region?(): string;"), ["snapshot +?", "event =", "without snapshot =", "without event ="]),
  form("type literal", "asIs", asIs, ["snapshot =", "event =", "without snapshot =", "without event -node.presentation -node.definitionDigest +node.?"]),
  form("read interface", "asIs", asIs, [
    "snapshot =",
    "event =",
    "without snapshot -trace.invocationId -trace.parentSpan -trace.spanId -trace.correlationIds -interval.startedAt -interval.endedAt +trace.? +interval.?",
    "without event -trace.invocationId -trace.parentSpan -trace.spanId -trace.correlationIds -interval.startedAt -interval.endedAt +trace.? +interval.?",
  ]),
  form("inner interface", "asIs", asIs, ["snapshot =", "event =", "without snapshot =", "without event -node.presentation +node.?"]),
  form("string", "asIs", asIs, [
    "snapshot =",
    "event =",
    "without snapshot -sequence -cursor -sourceRevision -nativePayloadRef -kind -definitionDigest -trace.invocationId -trace.parentSpan -trace.spanId -trace.correlationIds -subjectBasis -sourceVersion -evidenceRefs -interval.startedAt -interval.endedAt +sequence.? +cursor.? +sourceRevision.? +nativePayloadRef.? +kind.? +definitionDigest.? +trace.?*4 +subjectBasis.? +sourceVersion.? +evidenceRefs.? +interval.?*2",
    "without event -sourceSequence -sourceCursor -previousCursor -sourceTimestamp -node.definitionDigest -trace.invocationId -trace.parentSpan -trace.spanId -trace.correlationIds -subjectBasis -sourceVersion -evidenceRefs -payloadRef -interval.startedAt -interval.endedAt +sourceSequence.? +sourceCursor.? +previousCursor.? +sourceTimestamp.? +node.? +trace.?*4 +subjectBasis.? +sourceVersion.? +evidenceRefs.? +payloadRef.? +interval.?*2",
  ]),
  form("number", "asIs", asIs, ["snapshot =", "event =", "without snapshot -sequence +sequence.?", "without event -sourceSequence +sourceSequence.?"]),
  form("string literal", "asIs", asIs, ["snapshot =", "event =", "without snapshot -coverage +coverage.?", "without event ="]),
  form("union", "asIs", asIs, ["snapshot =", "event =", "without snapshot -sequence -coverage +sequence.? +coverage.?", "without event -sourceSequence +sourceSequence.?"]),
  form("readonly array", "asIs", asIs, ["snapshot =", "event =", "without snapshot -evidenceRefs +evidenceRefs.?", "without event -evidenceRefs +evidenceRefs.?"]),
  form("Readonly", "asIs", asIs, ["snapshot =", "event =", "without snapshot -trace.correlationIds +trace.?", "without event -trace.correlationIds +trace.?"]),
  form("Record", "asIs", asIs, ["snapshot =", "event =", "without snapshot -trace.correlationIds +trace.?", "without event -trace.correlationIds +trace.?"]),
];

// ---------------------------------------------------------------------------------------------------------- TYPES and MEMBERS
type Site = "type" | "interface member" | "class member" | "property name" | "class property modifier" | "class modifier" | "signature modifier";
interface KindRow {
  readonly site: Site;
  readonly id: string;
  readonly plant: Plant;
  readonly pins: readonly string[];
}
const NON_LEAF = ["snapshot -subjectBasis +subjectBasis.?", "event ="];
const LEAF = ["snapshot =", "event ="];
/** A shadowed wrapper name: the member and ObservationTrace.correlationIds (Readonly<Record<string, string>>) both read `.?`. */
const SHADOWED = ["snapshot -trace.correlationIds -subjectBasis +trace.? +subjectBasis.?", "event -trace.correlationIds +trace.?"];
const typeRow = (kind: string, id: string, type: string, pins: readonly string[] = NON_LEAF, plant: Plant = subject(type)): KindRow => ({
  site: "type",
  id,
  plant,
  pins: [`kind ${kind}`, ...pins],
});
const TEMPLATE_TYPE = `\`region-\${string}\``;
const TYPE_ROWS: readonly KindRow[] = [
  typeRow("StringKeyword", "string", "string", LEAF),
  typeRow("NumberKeyword", "number", "number", LEAF),
  typeRow("AnyKeyword", "any", "any"),
  typeRow("UnknownKeyword", "unknown", "unknown"),
  typeRow("NeverKeyword", "never", "never"),
  typeRow("VoidKeyword", "void", "void"),
  typeRow("ObjectKeyword", "object", "object"),
  typeRow("SymbolKeyword", "symbol", "symbol"),
  typeRow("UndefinedKeyword", "undefined", "string | undefined"),
  typeRow("BooleanKeyword", "boolean", "boolean"),
  typeRow("BigIntKeyword", "bigint", "bigint"),
  typeRow("TypePredicate", "typePredicate", "string | ((value: unknown) => value is string)"),
  typeRow("TypeReference", "Readonly", "Readonly<string>", LEAF),
  typeRow("TypeReference", "Record", "Record<string, string>", LEAF),
  typeRow("TypeReference", "libReference", "Date"),
  typeRow("TypeReference", "moduleReference", "Presentation", ["snapshot -subjectBasis +subjectBasis.title +subjectBasis.type +subjectBasis.statusText +subjectBasis.statusTone", "event ="]),
  typeRow("TypeReference", "ReadonlyTwoArguments", "Readonly<string, string>"),
  typeRow("TypeReference", "ReadonlyNoArgument", "Readonly"),
  typeRow("TypeReference", "RecordNumberKey", "Record<number, string>"),
  typeRow("TypeReference", "RecordLiteralKey", 'Record<"region", string>'),
  typeRow("TypeReference", "RecordObjectValue", "Record<string, { region?: string }>"),
  typeRow("TypeReference", "ReadonlyArrayReference", "ReadonlyArray<string>"),
  typeRow("TypeReference", "ReadonlyShadowed", "Readonly<string>", SHADOWED, both(subject("Readonly<string>"), appended("export type Readonly<T> = T & { region?: string };"))),
  typeRow("TypeReference", "RecordShadowed", "Record<string, string>", SHADOWED, both(subject("Record<string, string>"), appended("declare global { interface Record { region?: string } }"))),
  typeRow("FunctionType", "functionType", "string | (() => string)"),
  typeRow("ConstructorType", "constructorType", "string | (new () => object)"),
  typeRow("TypeQuery", "typeQuery", "typeof MAX_DEFAULT"),
  typeRow("TypeLiteral", "typeLiteral", "string | { region?: string }"),
  typeRow("TypeLiteral", "wholeTypeLiteral", "{ region?: string }", ["snapshot -subjectBasis +subjectBasis.region", "event ="]),
  typeRow("ArrayType", "mutableArray", "string[]"),
  typeRow("ArrayType", "readonlyObjectArray", "readonly { region?: string }[]"),
  typeRow("TupleType", "tuple", "[string]"),
  typeRow("OptionalType", "optionalElement", "[string?]"),
  typeRow("RestType", "restElement", "[...string[]]"),
  typeRow("UnionType", "leafUnion", "string | number", LEAF),
  typeRow("UnionType", "objectArm", "string | object"),
  typeRow("IntersectionType", "intersection", 'string & "region"'),
  typeRow("ConditionalType", "conditional", "string extends string ? string : number"),
  typeRow("InferType", "infer", "string extends infer T ? T : never"),
  typeRow("ParenthesizedType", "parenthesized", "(string)"),
  typeRow("ThisType", "this", "string | this"),
  typeRow("TypeOperator", "readonlyArray", "readonly string[]", LEAF),
  typeRow("TypeOperator", "keyof", "keyof string"),
  typeRow("TypeOperator", "keyofArray", "keyof string[]"),
  typeRow("TypeOperator", "unique", "unique symbol"),
  typeRow("TypeOperator", "readonlyTuple", "readonly [string]"),
  typeRow("IndexedAccessType", "indexedAccess", 'string["length"]'),
  typeRow("MappedType", "mapped", '{ [key in "region"]?: string }'),
  typeRow("LiteralType", "stringLiteral", '"region"', LEAF),
  typeRow("LiteralType", "numberLiteral", "1"),
  typeRow("LiteralType", "negativeLiteral", "-1"),
  typeRow("LiteralType", "bigintLiteral", "1n"),
  typeRow("LiteralType", "trueLiteral", "true"),
  typeRow("LiteralType", "falseLiteral", "false"),
  typeRow("LiteralType", "nullLiteral", "string | null"),
  typeRow("LiteralType", "templateLiteralNoSubstitution", "`region`"),
  typeRow("NamedTupleMember", "namedTupleMember", "[region: string]"),
  typeRow("TemplateLiteralType", "templateLiteralType", TEMPLATE_TYPE),
  typeRow("TemplateLiteralTypeSpan", "templateLiteralTypeSpan", TEMPLATE_TYPE),
  typeRow("ImportType", "importType", 'import("./basis.js").Basis'),
  typeRow("JSDocAllType", "jsdocAll", "*"),
  typeRow("JSDocUnknownType", "jsdocUnknown", "Readonly<?>"),
  typeRow("JSDocNullableType", "jsdocNullable", "?string"),
  typeRow("JSDocNonNullableType", "jsdocNonNullable", "string!"),
  typeRow("JSDocOptionalType", "jsdocOptional", "function(string=): string"),
  typeRow("JSDocFunctionType", "jsdocFunction", "function(string): string"),
  typeRow("JSDocVariadicType", "jsdocVariadic", "function(...string): string"),
];
/** The type kinds the parser never yields as or inside a member's type, each with the type text that shows it. */
const UNREACHABLE: Readonly<Record<string, string>> = { IntrinsicKeyword: "intrinsic", ExpressionWithTypeArguments: "typeof MAX_DEFAULT<string>" };
const memberRow = (site: Site, kind: string, id: string, plant: Plant, pins: readonly string[]): KindRow => ({ site, id, plant, pins: [`kind ${kind}`, ...pins] });
const ADDS_UNKNOWN = ["snapshot +?", "event ="];
const ADDS_REGION = ["snapshot +region", "event ="];
const REFUSES_SNAPSHOT = ["snapshot ?", "event ="];
const signature = (member: string): Plant => withMember("NativeSnapshot", member);
const MEMBER_ROWS: readonly KindRow[] = [
  memberRow("interface member", "PropertySignature", "propertySignature", signature("region?: string;"), ADDS_REGION),
  memberRow("interface member", "PropertySignature", "requiredSignature", signature("region: string;"), LEAF),
  memberRow("interface member", "PropertySignature", "untypedSignature", signature("region?;"), ["snapshot +region.?", "event ="]),
  memberRow("interface member", "MethodSignature", "methodSignature", signature("region?(): string;"), ADDS_UNKNOWN),
  memberRow("interface member", "GetAccessor", "getSignature", signature("get region(): string;"), ADDS_UNKNOWN),
  memberRow("interface member", "SetAccessor", "setSignature", signature("set region(value: string);"), ADDS_UNKNOWN),
  memberRow("interface member", "CallSignature", "callSignature", signature("(): string;"), ADDS_UNKNOWN),
  memberRow("interface member", "ConstructSignature", "constructSignature", signature("new (): NativeSnapshot;"), ADDS_UNKNOWN),
  memberRow("interface member", "IndexSignature", "indexSignature", signature("[key: string]: unknown;"), ADDS_UNKNOWN),
  memberRow("interface member", "MethodSignature", "innerMethod", withMember("ObservationTrace", "region?(): string;"), ["snapshot +trace.?", "event +trace.?"]),
  memberRow("class member", "PropertyDeclaration", "propertyDeclaration", snapshotClass("region?: string;"), ADDS_REGION),
  memberRow("class member", "PropertyDeclaration", "requiredDeclaration", snapshotClass("region: string;"), LEAF),
  memberRow("class member", "MethodDeclaration", "methodDeclaration", snapshotClass("region?(): string;"), ADDS_UNKNOWN),
  memberRow("class member", "ClassStaticBlockDeclaration", "staticBlock", snapshotClass("static {}", "export class"), ADDS_UNKNOWN),
  memberRow("class member", "Constructor", "parameterProperty", snapshotClass("constructor(public region?: string) {}", "export class"), ADDS_UNKNOWN),
  memberRow("class member", "GetAccessor", "getAccessor", snapshotClass("get region(): string;"), ADDS_UNKNOWN),
  memberRow("class member", "SetAccessor", "setAccessor", snapshotClass("set region(value: string);"), ADDS_UNKNOWN),
  memberRow("class member", "IndexSignature", "classIndex", snapshotClass("[key: string]: unknown;"), ADDS_UNKNOWN),
  memberRow("class member", "SemicolonClassElement", "semicolon", snapshotClass(";"), ADDS_UNKNOWN),
  memberRow("class member", "MethodDeclaration", "innerClassMethod", appended("export declare class ObservationTrace { region?(): string; }"), ["snapshot +trace.?", "event +trace.?"]),
  memberRow("property name", "Identifier", "identifierName", signature("region?: string;"), ADDS_REGION),
  memberRow("property name", "StringLiteral", "quotedName", signature('"region"?: string;'), ADDS_UNKNOWN),
  memberRow("property name", "NumericLiteral", "numericName", signature("1?: string;"), ADDS_UNKNOWN),
  memberRow("property name", "ComputedPropertyName", "computedName", signature('["region"]?: string;'), ADDS_UNKNOWN),
  memberRow("property name", "PrivateIdentifier", "privateName", snapshotClass("#region?: string;"), ADDS_UNKNOWN),
];
/** The modifier kinds the parser reads as no modifier at a site, each with the member or declaration text that shows it. */
const NOT_MODIFIERS: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  "class property modifier": { DefaultKeyword: "default region?: string;" },
  "class modifier": {
    ConstKeyword: "const class NativeSnapshot { region?: string }",
    DefaultKeyword: "default class NativeSnapshot { region?: string }",
    InKeyword: "in class NativeSnapshot { region?: string }",
    OutKeyword: "out class NativeSnapshot { region?: string }",
    OverrideKeyword: "override class NativeSnapshot { region?: string }",
  },
  "signature modifier": { ConstKeyword: "const region?: string;", DefaultKeyword: "default region?: string;" },
};
const MODIFIER_TEXT: Readonly<Record<string, string>> = {
  AbstractKeyword: "abstract",
  AccessorKeyword: "accessor",
  AsyncKeyword: "async",
  ConstKeyword: "const",
  DeclareKeyword: "declare",
  DefaultKeyword: "default",
  ExportKeyword: "export",
  InKeyword: "in",
  OutKeyword: "out",
  OverrideKeyword: "override",
  PrivateKeyword: "private",
  ProtectedKeyword: "protected",
  PublicKeyword: "public",
  ReadonlyKeyword: "readonly",
  StaticKeyword: "static",
};
/** The modifier rows: each modifier kind on a class property, on a class merge's declaration and on a property signature. */
const modifierRows = (): KindRow[] => {
  const rows: KindRow[] = [];
  for (const [kind, text] of Object.entries(MODIFIER_TEXT)) {
    if (NOT_MODIFIERS["class property modifier"]?.[kind] === undefined) {
      const allowed = kind === "ReadonlyKeyword" || kind === "PublicKeyword";
      rows.push(memberRow("class property modifier", kind, `classProperty-${text}`, snapshotClass(`${text} region?: string;`), allowed ? ADDS_REGION : ADDS_UNKNOWN));
    }
    if (NOT_MODIFIERS["class modifier"]?.[kind] === undefined) {
      const head = kind === "ExportKeyword" ? "export" : kind === "DeclareKeyword" ? "export declare" : kind === "DefaultKeyword" ? "export default" : `export ${text}`;
      const allowed = kind === "ExportKeyword" || kind === "DeclareKeyword";
      rows.push(memberRow("class modifier", kind, `classDeclaration-${text}`, appended(`${head} class NativeSnapshot { region?: string }`), allowed ? ADDS_REGION : REFUSES_SNAPSHOT));
    }
    if (NOT_MODIFIERS["signature modifier"]?.[kind] === undefined) {
      rows.push(memberRow("signature modifier", kind, `signature-${text}`, signature(`${text} region?: string;`), kind === "ReadonlyKeyword" ? ADDS_REGION : ADDS_UNKNOWN));
    }
  }
  rows.push(memberRow("class property modifier", "Decorator", "classProperty-decorator", snapshotClass("@observed region?: string;", "export class"), ADDS_UNKNOWN));
  rows.push(memberRow("class modifier", "Decorator", "classDeclaration-decorator", appended("@sealed export class NativeSnapshot { region?: string }"), REFUSES_SNAPSHOT));
  return rows;
};
const KIND_ROWS: readonly KindRow[] = [...TYPE_ROWS, ...MEMBER_ROWS, ...modifierRows()];

// ---------------------------------------------------------------------------------------------------------- RESIDUALS
interface ResidualRow {
  readonly word: string;
  readonly id: string;
  readonly quiet: Plant;
  readonly twin: Plant;
  /** A sibling module the quiet row's checker reading holds beside the module (the other-file residual). */
  readonly sibling?: string;
  readonly pins: readonly string[];
}
const SIBLING_AUGMENTATION = 'export {};\ndeclare module "./observation.js" { interface NativeSnapshot { region?: string } }\n';
const RESIDUAL_ROWS: readonly ResidualRow[] = [
  {
    word: "other file",
    id: "siblingAugmentation",
    quiet: asIs,
    twin: appended(O8),
    sibling: SIBLING_AUGMENTATION,
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot +region", "twin event =", "checker snapshot +region"],
  },
  {
    word: "inner members",
    id: "presentationMember",
    quiet: withMember("Presentation", "region?: string;"),
    twin: withMember("ObservationTrace", "region?: string;"),
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot +trace.region", "twin event +trace.region"],
  },
  {
    word: "required root member",
    id: "requiredRegion",
    quiet: withMember("NativeSnapshot", "region: string;"),
    twin: withMember("NativeSnapshot", "region?: string;"),
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot +region", "twin event ="],
  },
  {
    word: "required root member",
    id: "requiredKind",
    quiet: retyped("ObservationEvent", "kind", GATE_BRAND),
    twin: retyped("ObservationEvent", "sourceVersion", GATE_BRAND),
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot =", "twin event -sourceVersion +sourceVersion.?"],
  },
  {
    word: "global interface",
    id: "stringInterface",
    quiet: appended("declare global { interface String { region?: string } }"),
    twin: both(subject("string | GateShape"), appended("declare global { interface GateShape { region?: string } }")),
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot -subjectBasis +subjectBasis.?", "twin event ="],
  },
  {
    word: "global interface",
    id: "readonlyArrayInterface",
    quiet: appended("declare global { interface ReadonlyArray<T> { region?: string } }"),
    twin: both(subject("string | GateShape"), appended("declare global { interface GateShape { region?: string } }")),
    pins: ["quiet snapshot =", "quiet event =", "twin snapshot -subjectBasis +subjectBasis.?", "twin event ="],
  },
];

// ---------------------------------------------------------------------------------------------------------- the checker (AGREEMENT)
const VIRTUAL = "/wb-km7q11-virtual";
const ORACLE_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
  types: [],
  lib: ["lib.es2022.d.ts"],
};
const LIB_FILES = new Map<string, ts.SourceFile | undefined>();
function oracleProgram(files: ReadonlyMap<string, string>): ts.Program {
  const host: ts.CompilerHost = {
    getSourceFile: (fileName, languageVersion) => {
      const text = files.get(fileName);
      if (text !== undefined) return ts.createSourceFile(fileName, text, languageVersion, true, ts.ScriptKind.TS);
      if (!LIB_FILES.has(fileName)) {
        const lib = ts.sys.readFile(fileName);
        LIB_FILES.set(fileName, lib === undefined ? undefined : ts.createSourceFile(fileName, lib, languageVersion, true));
      }
      return LIB_FILES.get(fileName);
    },
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    writeFile: () => undefined,
    getCurrentDirectory: () => VIRTUAL,
    getDirectories: () => [],
    fileExists: fileName => files.has(fileName) || (!fileName.startsWith(VIRTUAL) && ts.sys.fileExists(fileName)),
    readFile: fileName => files.get(fileName) ?? (fileName.startsWith(VIRTUAL) ? undefined : ts.sys.readFile(fileName)),
    getCanonicalFileName: fileName => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    directoryExists: directory => directory.startsWith(VIRTUAL) || ts.sys.directoryExists(directory),
  };
  return ts.createProgram({ rootNames: [...files.keys()], options: ORACLE_OPTIONS, host });
}
/** The checker's reading of one optional root property: whether its type holds no members, and its members' readings when it is
 * one object type (each: holds no members, or names an interface the module declares). */
interface OracleMember {
  readonly leaf: boolean;
  readonly inner: ReadonlyMap<string, boolean> | undefined;
}
type OracleRoot = ReadonlyMap<string, OracleMember> | undefined;
interface OracleReading {
  readonly snapshot: OracleRoot;
  readonly event: OracleRoot;
}
const LEAF_FLAGS =
  ts.TypeFlags.String |
  ts.TypeFlags.Number |
  ts.TypeFlags.BigInt |
  ts.TypeFlags.StringLiteral |
  ts.TypeFlags.NumberLiteral |
  ts.TypeFlags.BigIntLiteral |
  ts.TypeFlags.BooleanLiteral |
  ts.TypeFlags.Undefined |
  ts.TypeFlags.Null;
function oracleReading(program: ts.Program, path: string): OracleReading {
  const checker = program.getTypeChecker();
  const file = program.getSourceFile(path);
  const moduleSymbol = file === undefined ? undefined : checker.getSymbolAtLocation(file);
  const exported = moduleSymbol === undefined ? [] : checker.getExportsOfModule(moduleSymbol);
  const present = (type: ts.Type): ts.Type[] => (type.isUnion() ? type.types : [type]).filter(part => (part.flags & ts.TypeFlags.Undefined) === 0);
  const leafType = (type: ts.Type): boolean => {
    if (type.isUnion()) return type.types.every(leafType);
    if ((type.flags & LEAF_FLAGS) !== 0) return true;
    if (checker.isArrayType(type)) return checker.getTypeArguments(type as ts.TypeReference).every(leafType);
    if ((type.flags & ts.TypeFlags.Object) === 0) return false;
    if (checker.getPropertiesOfType(type).length > 0) return false;
    if (checker.getSignaturesOfType(type, ts.SignatureKind.Call).length > 0 || checker.getSignaturesOfType(type, ts.SignatureKind.Construct).length > 0) return false;
    const indexes = checker.getIndexInfosOfType(type);
    return indexes.length > 0 && indexes.every(index => (index.keyType.flags & ts.TypeFlags.String) !== 0 && leafType(index.type));
  };
  const moduleInterface = (type: ts.Type): boolean => {
    const [only, ...rest] = present(type);
    const declarations = only?.getSymbol()?.getDeclarations() ?? [];
    return (
      only !== undefined &&
      rest.length === 0 &&
      ((only.getSymbol()?.getFlags() ?? 0) & ts.SymbolFlags.Interface) !== 0 &&
      declarations.length > 0 &&
      declarations.every(declaration => declaration.getSourceFile().fileName === path)
    );
  };
  const rootOf = (name: string): OracleRoot => {
    const symbol = exported.find(entry => entry.name === name);
    if (symbol === undefined) return undefined;
    const members = new Map<string, OracleMember>();
    for (const property of checker.getPropertiesOfType(checker.getDeclaredTypeOfSymbol(symbol))) {
      if ((property.flags & ts.SymbolFlags.Optional) === 0) continue;
      const type = checker.getTypeOfSymbol(property);
      const [only, ...rest] = present(type);
      const object = only !== undefined && rest.length === 0 && (only.flags & ts.TypeFlags.Object) !== 0 && !checker.isArrayType(only) ? only : undefined;
      const inner =
        object === undefined
          ? undefined
          : new Map(
              checker.getPropertiesOfType(object).map(entry => {
                const entryType = checker.getTypeOfSymbol(entry);
                return [entry.name, leafType(entryType) || moduleInterface(entryType)] as const;
              }),
            );
      members.set(property.name, { leaf: leafType(type), inner });
    }
    return members;
  };
  return { snapshot: rootOf(ROOTS[0]), event: rootOf(ROOTS[1]) };
}
/** Where the reader reads wider than the checker (AGREEMENT): every entry the reader reads that the checker's member does not hold. */
function disagreements(reading: ObservationMembers, oracle: OracleReading): string[] {
  const out: string[] = [];
  for (const [label, list, root] of [
    ["snapshot", reading.snapshot, oracle.snapshot],
    ["event", reading.event, oracle.event],
  ] as const) {
    if (list.length === 1 && list[0] === "?") continue;
    if (root === undefined) {
      out.push(`${label}: the checker reads no ${label === "snapshot" ? ROOTS[0] : ROOTS[1]} export`);
      continue;
    }
    const names = unique(list.filter(entry => entry !== "?").map(entry => entry.split(".")[0] ?? entry));
    const checkerNames = [...root.keys()];
    if (names.some(name => !root.has(name))) out.push(`${label}: reads ${names.filter(name => !root.has(name)).join(",")} the checker does not hold`);
    if (!list.includes("?") && checkerNames.some(name => !names.includes(name))) out.push(`${label}: misses ${checkerNames.filter(name => !names.includes(name)).join(",")}`);
    for (const name of names) {
      const member = root.get(name);
      if (member === undefined) continue;
      const entries = list.filter(entry => entry === name || entry.startsWith(`${name}.`));
      if (entries.includes(`${name}.?`)) continue;
      if (entries.every(entry => entry === name)) {
        if (!member.leaf) out.push(`${label}: reads ${name} as holding no members; the checker's type holds some`);
        continue;
      }
      const inner = entries.filter(entry => entry.startsWith(`${name}.`)).map(entry => entry.slice(name.length + 1));
      if (inner.length !== entries.length || member.inner === undefined) {
        out.push(`${label}: expands ${name}, which the checker does not read as one object type`);
        continue;
      }
      const memberInner = member.inner;
      const innerNames = [...memberInner.keys()];
      if (unique(inner).length !== innerNames.length || inner.some(entry => !memberInner.has(entry))) out.push(`${label}: ${name}'s members ${unique(inner).join(",")} vs the checker's ${innerNames.join(",")}`);
      for (const entry of unique(inner)) if (memberInner.get(entry) === false) out.push(`${label}: reads ${name}.${entry} as holding no members; the checker's type holds some`);
    }
  }
  return out;
}
/** Whether a text holds a declare global block (its own program, so it reaches no other row's text). */
function holdsGlobal(text: string): boolean {
  let found = false;
  const visit = (node: ts.Node): void => {
    if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "global") found = true;
    ts.forEachChild(node, visit);
  };
  visit(ts.createSourceFile(OBSERVATION_MODULE, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS));
  return found;
}
/** The checker's reading of each text (a text holding a declare global block in its own program, the rest in one). */
function oracleReadings(texts: ReadonlyMap<string, string>, siblings: ReadonlyMap<string, string> = new Map()): Map<string, OracleReading> {
  const pathOf = (index: number): string => `${VIRTUAL}/${index}/${OBSERVATION_MODULE}`;
  const entries = [...texts.entries()];
  const shared = new Map<string, string>();
  const lone: [string, string][] = [];
  const readings = new Map<string, OracleReading>();
  entries.forEach(([id, text], index) => {
    if (holdsGlobal(text)) lone.push([id, text]);
    else shared.set(pathOf(index), text);
  });
  const withSiblings = (files: Map<string, string>): Map<string, string> => {
    for (const [path] of [...files]) for (const [name, text] of siblings) files.set(join(dirname(path), name), text);
    return files;
  };
  if (shared.size > 0) {
    const program = oracleProgram(withSiblings(new Map(shared)));
    entries.forEach(([id], index) => {
      if (shared.has(pathOf(index))) readings.set(id, oracleReading(program, pathOf(index)));
    });
  }
  for (const [id, text] of lone) {
    const path = pathOf(entries.findIndex(([entry]) => entry === id));
    readings.set(id, oracleReading(oracleProgram(withSiblings(new Map([[path, text]]))), path));
  }
  return readings;
}

// ---------------------------------------------------------------------------------------------------------- frozen shape
const FROZEN_SHAPE: readonly string[] = [
  "ITEM:U1:2", "ITEM:U2:4", "ITEM:ACCEPTANCE:1", "ITEM:R-B140:2", "ITEM:RF4-U1:2", "ITEM:RF5-U1:2", "ITEM:RF5-U2:2", "GATE:O7:3", "GATE:O15:3", "GATE:O8:3",
  "GATE:O7b:3", "GATE:O15b:3", "GATE:O7bt:3", "GATE:O15bt:3", "GATE:GP-globalBrandSnapshot:3", "GATE:GP-globalBrandEvent:3", "GATE:GP-globalBrandInner:3",
  "GATE:GP-globalLeafSnapshot:3", "GATE:GP-topBrandSnapshot:3", "GATE:GP-topBrandEvent:3", "GATE:GP-topBrandInner:3", "GATE:GP-topLeafSnapshot:3",
  "GATE:GP-inlineBrandSnapshot:3", "GATE:GP-globalAliasSnapshot:3", "GATE:GP-globalAliasEvent:3", "GATE:GP-globalAliasInner:3",
  "GATE:GP-globalInterfaceUnion:3", "GATE:GP-topInterfaceUnion:3", "GATE:GP-thisUnion:3", "GATE:GP-selfRefUnion:3", "GATE:GM-importEquals:4",
  "GATE:GP-importEqualsBrand:3", "GATE:GM-importDefault:4", "GATE:GP-defaultImportFile:3", "GATE:GM-typeNamesInterface:4", "GATE:GP-topShapeBrand:3",
  "GATE:GM-holdsShallow:4", "GATE:GP-deepBrand:3", "BASE:observation.ts:2", "FORMS:interface/declaredTwice:4", "FORMS:interface/redeclaredMember:4", "FORMS:class merge/O7:4",
  "FORMS:class merge/escapedClassMerge:4", "FORMS:class merge/classWithBody:4", "FORMS:augmentation/O8:4", "FORMS:augmentation/noExtension:4",
  "FORMS:augmentation/tsExtension:4", "FORMS:augmentation/parentPath:4", "FORMS:missing/renamedSnapshot:4", "FORMS:elsewhere/functionOfName:4",
  "FORMS:elsewhere/namespaceOfName:4", "FORMS:elsewhere/interfaceInNamespace:4", "FORMS:elsewhere/variableOfName:4", "FORMS:elsewhere/enumOfName:4",
  "FORMS:elsewhere/typeAliasInNamespace:4", "FORMS:elsewhere/importOfName:4", "FORMS:elsewhere/exportSpecifier:4", "FORMS:elsewhere/propertyNamed:4",
  "FORMS:elsewhere/parameterNamed:4", "FORMS:elsewhere/typeQueryOfName:4", "FORMS:elsewhere/qualifiedName:4", "FORMS:elsewhere/globalBlock:4",
  "FORMS:elsewhere/otherModuleBlock:4", "FORMS:elsewhere/mjsSpecifier:4", "FORMS:elsewhere/bareSpecifier:4", "FORMS:elsewhere/caseSpecifier:4",
  "FORMS:elsewhere/indexSpecifier:4", "FORMS:elsewhere/namespaceInAugmentation:4", "FORMS:elsewhere/classInAugmentation:4", "FORMS:heritage/extendsClause:4",
  "FORMS:heritage/classExtends:4", "FORMS:heritage/classImplements:4", "FORMS:heritage/augmentationExtends:4",
  "FORMS:type parameters/interfaceTypeParameters:4", "FORMS:type parameters/classTypeParameters:4", "FORMS:class modifier/abstractClass:4",
  "FORMS:class modifier/defaultClass:4", "FORMS:class modifier/decoratedClass:4", "FORMS:property/asIs:4", "FORMS:other member/methodMember:4",
  "FORMS:type literal/asIs:4", "FORMS:read interface/asIs:4", "FORMS:inner interface/asIs:4", "FORMS:string/asIs:4", "FORMS:number/asIs:4",
  "FORMS:string literal/asIs:4", "FORMS:union/asIs:4", "FORMS:readonly array/asIs:4", "FORMS:Readonly/asIs:4", "FORMS:Record/asIs:4", "TYPES:string:3",
  "TYPES:number:3", "TYPES:any:3", "TYPES:unknown:3", "TYPES:never:3", "TYPES:void:3", "TYPES:object:3", "TYPES:symbol:3", "TYPES:undefined:3",
  "TYPES:boolean:3", "TYPES:bigint:3", "TYPES:typePredicate:3", "TYPES:Readonly:3", "TYPES:Record:3", "TYPES:libReference:3", "TYPES:moduleReference:3",
  "TYPES:ReadonlyTwoArguments:3", "TYPES:ReadonlyNoArgument:3", "TYPES:RecordNumberKey:3", "TYPES:RecordLiteralKey:3", "TYPES:RecordObjectValue:3",
  "TYPES:ReadonlyArrayReference:3", "TYPES:ReadonlyShadowed:3", "TYPES:RecordShadowed:3", "TYPES:functionType:3", "TYPES:constructorType:3",
  "TYPES:typeQuery:3", "TYPES:typeLiteral:3", "TYPES:wholeTypeLiteral:3", "TYPES:mutableArray:3", "TYPES:readonlyObjectArray:3", "TYPES:tuple:3",
  "TYPES:optionalElement:3", "TYPES:restElement:3", "TYPES:leafUnion:3", "TYPES:objectArm:3", "TYPES:intersection:3", "TYPES:conditional:3", "TYPES:infer:3",
  "TYPES:parenthesized:3", "TYPES:this:3", "TYPES:readonlyArray:3", "TYPES:keyof:3", "TYPES:keyofArray:3", "TYPES:unique:3", "TYPES:readonlyTuple:3", "TYPES:indexedAccess:3",
  "TYPES:mapped:3", "TYPES:stringLiteral:3", "TYPES:numberLiteral:3", "TYPES:negativeLiteral:3", "TYPES:bigintLiteral:3", "TYPES:trueLiteral:3",
  "TYPES:falseLiteral:3", "TYPES:nullLiteral:3", "TYPES:templateLiteralNoSubstitution:3", "TYPES:namedTupleMember:3", "TYPES:templateLiteralType:3",
  "TYPES:templateLiteralTypeSpan:3", "TYPES:importType:3", "TYPES:jsdocAll:3", "TYPES:jsdocUnknown:3", "TYPES:jsdocNullable:3", "TYPES:jsdocNonNullable:3",
  "TYPES:jsdocOptional:3", "TYPES:jsdocFunction:3", "TYPES:jsdocVariadic:3", "MEMBERS:propertySignature:3", "MEMBERS:requiredSignature:3",
  "MEMBERS:untypedSignature:3", "MEMBERS:methodSignature:3", "MEMBERS:getSignature:3", "MEMBERS:setSignature:3", "MEMBERS:callSignature:3",
  "MEMBERS:constructSignature:3", "MEMBERS:indexSignature:3", "MEMBERS:innerMethod:3", "MEMBERS:propertyDeclaration:3", "MEMBERS:requiredDeclaration:3",
  "MEMBERS:methodDeclaration:3", "MEMBERS:staticBlock:3", "MEMBERS:parameterProperty:3", "MEMBERS:getAccessor:3", "MEMBERS:setAccessor:3",
  "MEMBERS:classIndex:3", "MEMBERS:semicolon:3", "MEMBERS:innerClassMethod:3", "MEMBERS:identifierName:3", "MEMBERS:quotedName:3", "MEMBERS:numericName:3",
  "MEMBERS:computedName:3", "MEMBERS:privateName:3", "MEMBERS:classProperty-abstract:3", "MEMBERS:classDeclaration-abstract:3", "MEMBERS:signature-abstract:3",
  "MEMBERS:classProperty-accessor:3", "MEMBERS:classDeclaration-accessor:3", "MEMBERS:signature-accessor:3", "MEMBERS:classProperty-async:3",
  "MEMBERS:classDeclaration-async:3", "MEMBERS:signature-async:3", "MEMBERS:classProperty-const:3", "MEMBERS:classProperty-declare:3",
  "MEMBERS:classDeclaration-declare:3", "MEMBERS:signature-declare:3", "MEMBERS:classProperty-export:3", "MEMBERS:classDeclaration-export:3",
  "MEMBERS:signature-export:3", "MEMBERS:classProperty-in:3", "MEMBERS:signature-in:3", "MEMBERS:classProperty-out:3", "MEMBERS:signature-out:3",
  "MEMBERS:classProperty-override:3", "MEMBERS:signature-override:3", "MEMBERS:classProperty-private:3", "MEMBERS:classDeclaration-private:3",
  "MEMBERS:signature-private:3", "MEMBERS:classProperty-protected:3", "MEMBERS:classDeclaration-protected:3", "MEMBERS:signature-protected:3",
  "MEMBERS:classProperty-public:3", "MEMBERS:classDeclaration-public:3", "MEMBERS:signature-public:3", "MEMBERS:classProperty-readonly:3",
  "MEMBERS:classDeclaration-readonly:3", "MEMBERS:signature-readonly:3", "MEMBERS:classProperty-static:3", "MEMBERS:classDeclaration-static:3",
  "MEMBERS:signature-static:3", "MEMBERS:classProperty-decorator:3", "MEMBERS:classDeclaration-decorator:3", "RESIDUALS:other file/siblingAugmentation:5", "RESIDUALS:inner members/presentationMember:4", "RESIDUALS:required root member/requiredRegion:4",
  "RESIDUALS:required root member/requiredKind:4", "RESIDUALS:global interface/stringInterface:4", "RESIDUALS:global interface/readonlyArrayInterface:4",
];

// ---------------------------------------------------------------------------------------------------------- the census
const kindName = (kind: ts.SyntaxKind): string => Object.keys(ts.SyntaxKind).find(name => ts.SyntaxKind[name as keyof typeof ts.SyntaxKind] === kind && !/^(First|Last)/u.test(name)) ?? String(kind);
const kindsWhere = (accepts: (kind: ts.SyntaxKind) => boolean): string[] => {
  const out: string[] = [];
  for (let kind = 0; kind < ts.SyntaxKind.Count; kind += 1) if (accepts(kind)) out.push(kindName(kind));
  return out;
};
/** A predicate of TypeScript's that judges a node by its kind alone, asked of a kind. */
const byKind =
  (predicate: (node: ts.Node) => boolean) =>
  (kind: ts.SyntaxKind): boolean =>
    predicate({ kind } as ts.Node);
/** Every kind of node under `node`, itself included. */
function kindsUnder(node: ts.Node): string[] {
  const out: string[] = [];
  const visit = (current: ts.Node): void => {
    out.push(kindName(current.kind));
    ts.forEachChild(current, visit);
  };
  visit(node);
  return out;
}
const BASE_SOURCE = ts.createSourceFile(OBSERVATION_MODULE, MODULE_TEXT, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** The real module's top-level classes (a plant's classes stand after them) and its interfaces' member counts (a plant's members
 * stand after them). */
const BASE_CLASSES = BASE_SOURCE.statements.filter(statement => ts.isClassDeclaration(statement)).length;
const BASE_INTERFACE_MEMBERS: ReadonlyMap<string, number> = new Map(
  BASE_SOURCE.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement)).map(statement => [statement.name.text, statement.members.length] as const),
);
/** The kinds a planted text holds at a row's site: under the retyped member's type, the added member, its name or its modifiers. */
function siteKinds(row: KindRow, text: string): string[] {
  const source = ts.createSourceFile(OBSERVATION_MODULE, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const snapshot = source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === "NativeSnapshot");
  const classes = source.statements.filter((statement): statement is ts.ClassDeclaration => ts.isClassDeclaration(statement)).slice(BASE_CLASSES);
  const interfaces = source.statements.filter((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement));
  const newMembers = [
    ...interfaces.flatMap(declaration => [...declaration.members].slice(BASE_INTERFACE_MEMBERS.get(declaration.name.text) ?? 0)),
    ...classes.flatMap(declaration => [...declaration.members]),
  ];
  switch (row.site) {
    case "type": {
      const member = snapshot?.members.find(entry => ts.isPropertySignature(entry) && ts.isIdentifier(entry.name) && entry.name.text === "subjectBasis");
      return member !== undefined && ts.isPropertySignature(member) && member.type !== undefined ? kindsUnder(member.type) : [];
    }
    case "interface member":
    case "class member":
      return newMembers.map(member => kindName(member.kind));
    case "property name":
      return newMembers.flatMap(member => {
        const name = ts.getNameOfDeclaration(member as ts.Declaration);
        return name === undefined ? [] : [kindName(name.kind)];
      });
    case "class property modifier":
    case "signature modifier":
      return newMembers.flatMap(member => ((ts.canHaveModifiers(member) ? ts.getModifiers(member) : undefined) ?? []).map(modifier => kindName(modifier.kind)).concat(ts.canHaveDecorators(member) ? (ts.getDecorators(member) ?? []).map(() => "Decorator") : []));
    case "class modifier":
      return classes.flatMap(declaration => (declaration.modifiers ?? []).map(modifier => kindName(modifier.kind)));
  }
}
const SITE_KINDS: Readonly<Record<Site, readonly string[]>> = {
  type: kindsWhere(byKind(ts.isTypeNode)).filter(kind => UNREACHABLE[kind] === undefined),
  "interface member": kindsWhere(byKind(ts.isTypeElement)).filter(kind => kind !== "NotEmittedTypeElement"),
  "class member": kindsWhere(byKind(ts.isClassElement)),
  "property name": kindsWhere(byKind(ts.isPropertyName)),
  "class property modifier": [...kindsWhere(byKind(ts.isModifier)), "Decorator"].filter(kind => NOT_MODIFIERS["class property modifier"]?.[kind] === undefined),
  "class modifier": [...kindsWhere(byKind(ts.isModifier)), "Decorator"].filter(kind => NOT_MODIFIERS["class modifier"]?.[kind] === undefined),
  "signature modifier": [...kindsWhere(byKind(ts.isModifier))].filter(kind => NOT_MODIFIERS["signature modifier"]?.[kind] === undefined),
};
const rowText = (plant: Plant): string => plant(MODULE_TEXT);
const sameList = (a: readonly string[], b: readonly string[]): boolean => a.length === b.length && a.every((entry, index) => entry === b[index]);

describe(`observation members census (${BEAD}, SDK-REACTIVE-FIBER-R2)`, () => {
  it("CLAIM: every '- <word>: <claim>' line of the helper header equals its section's exported roster, in order and byte for byte", () => {
    const header = HELPER_TEXT.slice(0, HELPER_TEXT.indexOf("*/"));
    const lines = header.split("\n").map(line => line.replace(/^ \* ?/u, ""));
    const failures: string[] = [];
    for (const [section, roster] of HEADER_SECTIONS) {
      const at = lines.findIndex(line => line.startsWith(`${section} (`));
      if (at < 0) {
        failures.push(`${section}: no heading`);
        continue;
      }
      const stated: string[] = [];
      for (let index = at + 1; index < lines.length && (lines[index] ?? "").startsWith("- "); index += 1) stated.push(lines[index] ?? "");
      const exported = roster.map(entry => `- ${entry.word}: ${entry.claim}`);
      if (!sameList(stated, exported)) failures.push(`${section}: header ${JSON.stringify(stated)} vs roster ${JSON.stringify(exported)}`);
    }
    const rostered = lines.filter(line => line.startsWith("- ")).length;
    const total = HEADER_SECTIONS.reduce((sum, [, roster]) => sum + roster.length, 0);
    if (rostered !== total) failures.push(`the header holds ${rostered} roster lines, the rosters ${total}`);
    expect(failures).toEqual([]);
    expect(ALL_WORDS).toEqual(HEADER_SECTIONS.filter(([section]) => section !== "NOT READ").flatMap(([, roster]) => words(roster)));
  });

  it("ITEM: each item's line stands in the tracker export with its label and names exactly its members; U2's refused sentences stand nowhere in the helper", () => {
    const failures: string[] = [];
    for (const row of ITEM_ROWS) {
      const line = itemLine(row);
      if (line === "") {
        failures.push(`${row.id}: no line in ${row.home}`);
        continue;
      }
      for (const pin of row.pins) {
        if (pin.startsWith("label ") && `${headOf(line)}` !== pin.slice("label ".length)) failures.push(`${row.id}: label ${JSON.stringify(headOf(line))}`);
        if (pin.startsWith("line ") && line !== pin.slice("line ".length)) failures.push(`${row.id}: line differs`);
        if (pin.startsWith("members ")) {
          const stated = pin.slice("members ".length);
          const read = itemMembers(row, line);
          if ((read.length === 0 ? "-" : read.join(" ")) !== stated) failures.push(`${row.id}: members ${read.join(" ")}`);
        }
        if (pin.startsWith("refused ")) {
          const phrase = pin.slice("refused ".length);
          if (!line.includes(`'${phrase}'`)) failures.push(`${row.id}: the line quotes no '${phrase}'`);
          if (HELPER_TEXT.includes(phrase)) failures.push(`${row.id}: the helper holds '${phrase}'`);
        }
      }
    }
    const gateNames = ["RF4-U1", "RF5-U1", "RF5-U2"].flatMap(id => {
      const row = ITEM_ROWS.find(entry => entry.id === id);
      return row === undefined ? [] : itemMembers(row, itemLine(row));
    });
    if (!sameList(gateNames, GATE_ROWS.map(row => row.id))) failures.push(`GATE rows ${GATE_ROWS.map(row => row.id).join(" ")} vs the refusal lines' members ${gateNames.join(" ")}`);
    const u1 = ITEM_ROWS.find(row => row.id === "U1");
    const u1Members = u1 === undefined ? [] : itemMembers(u1, itemLine(u1));
    if (u1Members.some(name => !gateNames.includes(name))) failures.push(`U1 names ${u1Members.join(" ")} outside the GATE rows`);
    const rb140 = ITEM_ROWS.find(row => row.id === "R-B140");
    const mutants = rb140 === undefined ? [] : itemMembers(rb140, itemLine(rb140));
    if (!sameList(mutants, gateNames.filter(name => name.startsWith("GM-")))) failures.push(`R-B140's mutants ${mutants.join(" ")} vs refusal #5's ${gateNames.filter(name => name.startsWith("GM-")).join(" ")}`);
    expect(failures).toEqual([]);
  });

  it(
    "GATE: every gate member reads its pinned reading, which differs from BASE (THE MEMBER CHECK throws), over the plant its line quotes",
    () => {
      const failures: string[] = [];
      for (const row of GATE_ROWS) {
        const text = rowText(row.plant);
        const reading = readingPins(observationMembers(text));
        const stated = pinsWith(row.pins, "snapshot ", "event ");
        if (!sameList(reading, stated)) failures.push(`${row.id}: reads ${JSON.stringify(reading)}`);
        if (reading.every(pin => pin.endsWith(" ="))) failures.push(`${row.id}: reads as BASE`);
        const quotes = quotesOf(gateLine(row.id), row.id);
        const sibling = GATE_SIBLINGS[row.id] ?? "";
        if (pinsWith(row.pins, "quotes ")[0] !== `quotes ${quotes.length}`) failures.push(`${row.id}: the line gives ${quotes.length} quotes`);
        for (const quote of quotes) if (!text.includes(quote) && !sibling.includes(quote)) failures.push(`${row.id}: the plant holds no ${JSON.stringify(quote)}`);
        const witness = pinsWith(row.pins, "witness ")[0]?.slice("witness ".length);
        if (row.id.startsWith("GM-") !== (witness !== undefined)) failures.push(`${row.id}: a GM row, and only a GM row, names a witness`);
        if (witness !== undefined) {
          const witnessRow = GATE_ROWS.find(entry => entry.id === witness);
          if (witnessRow === undefined || rowText(witnessRow.plant) !== text) failures.push(`${row.id}: its witness ${witness} is no GATE row with the same plant`);
        }
      }
      expect(failures).toEqual([]);
    },
    BUDGET_MS,
  );

  it(
    "BASE: the real module reads its pinned lists, and the TypeScript checker reads exactly those members",
    () => {
      const stated = { snapshot: BASE_ROW.pins[0].slice("snapshot ".length).split(" "), event: BASE_ROW.pins[1].slice("event ".length).split(" ") };
      expect({ snapshot: [...BASE_READING.snapshot], event: [...BASE_READING.event] }).toEqual(stated);
      const oracle = oracleReadings(new Map([["base", MODULE_TEXT]])).get("base");
      if (oracle === undefined) throw new Error("BASE: no checker reading");
      expect(disagreements(BASE_READING, oracle)).toEqual([]);
      expect([...(oracle.snapshot?.keys() ?? [])]).toEqual(unique(stated.snapshot.map(entry => entry.split(".")[0] ?? entry)));
      expect([...(oracle.event?.keys() ?? [])]).toEqual(unique(stated.event.map(entry => entry.split(".")[0] ?? entry)));
    },
    BUDGET_MS,
  );

  it(
    "FORMS: every roster word has a calibration plant whose reading without the word differs from its reading with it",
    () => {
      const failures: string[] = [];
      for (const word of ALL_WORDS) if (!FORM_ROWS.some(row => row.word === word)) failures.push(`${word}: no FORMS row`);
      for (const row of FORM_ROWS) {
        const text = rowText(row.plant);
        const withWord = readingPins(observationMembers(text));
        const withoutWord = readingPins(observationMembers(text, { words: without(row.word) }), "without ");
        if (!sameList(withWord, pinsWith(row.pins, "snapshot ", "event "))) failures.push(`${row.word}/${row.id}: reads ${JSON.stringify(withWord)}`);
        if (!sameList(withoutWord, pinsWith(row.pins, "without "))) failures.push(`${row.word}/${row.id}: without the word reads ${JSON.stringify(withoutWord)}`);
        if (sameList(withWord, withoutWord.map(pin => pin.slice("without ".length)))) failures.push(`${row.word}/${row.id}: the word changes nothing`);
      }
      expect(failures).toEqual([]);
    },
    BUDGET_MS,
  );

  it(
    "TYPES and MEMBERS: every node kind TypeScript's parser yields at each site has a row holding it, pinned with the reader's reading",
    () => {
      const failures: string[] = [];
      for (const [site, kinds] of Object.entries(SITE_KINDS)) {
        for (const kind of kinds) if (!KIND_ROWS.some(row => row.site === site && row.pins[0] === `kind ${kind}`)) failures.push(`${site}: no row for ${kind}`);
      }
      for (const row of KIND_ROWS) {
        const text = rowText(row.plant);
        const kind = (row.pins[0] ?? "").slice("kind ".length);
        if (!(SITE_KINDS[row.site] ?? []).includes(kind)) failures.push(`${row.id}: ${kind} is no ${row.site} kind TypeScript accepts`);
        if (!siteKinds(row, text).includes(kind)) failures.push(`${row.id}: the plant holds no ${kind} at its ${row.site}`);
        const reading = readingPins(observationMembers(text));
        if (!sameList(reading, pinsWith(row.pins, "snapshot ", "event "))) failures.push(`${row.id}: reads ${JSON.stringify(reading)}`);
      }
      for (const [kind, type] of Object.entries(UNREACHABLE)) {
        const planted = siteKinds({ site: "type", id: kind, plant: subject(type), pins: [] }, subject(type)(MODULE_TEXT));
        if (planted.length === 0 || planted.includes(kind)) failures.push(`UNREACHABLE ${kind}: the parser yields it (or no type) in ${JSON.stringify(type)}`);
      }
      for (const [site, entries] of Object.entries(NOT_MODIFIERS)) {
        for (const [kind, member] of Object.entries(entries)) {
          const plant = site === "class modifier" ? appended(member) : site === "signature modifier" ? signature(member) : snapshotClass(member);
          if (siteKinds({ site: site as Site, id: kind, plant, pins: [] }, plant(MODULE_TEXT)).includes(kind)) failures.push(`NOT_MODIFIERS ${site} ${kind}: the parser reads it as a modifier`);
        }
      }
      expect(failures).toEqual([]);
    },
    BUDGET_MS,
  );

  it(
    "RESIDUALS: every NOT READ word has a quiet plant that reads BASE and a loud twin that does not",
    () => {
      const failures: string[] = [];
      for (const word of words(NOT_READ)) if (!RESIDUAL_ROWS.some(row => row.word === word)) failures.push(`${word}: no RESIDUALS row`);
      for (const row of RESIDUAL_ROWS) {
        const quiet = readingPins(observationMembers(rowText(row.quiet)), "quiet ");
        const twin = readingPins(observationMembers(rowText(row.twin)), "twin ");
        if (!sameList(quiet, pinsWith(row.pins, "quiet "))) failures.push(`${row.word}/${row.id}: quiet reads ${JSON.stringify(quiet)}`);
        if (!sameList(twin, pinsWith(row.pins, "twin "))) failures.push(`${row.word}/${row.id}: twin reads ${JSON.stringify(twin)}`);
        if (!quiet.every(pin => pin.endsWith(" ="))) failures.push(`${row.word}/${row.id}: the quiet plant is loud`);
        if (twin.every(pin => pin.endsWith(" ="))) failures.push(`${row.word}/${row.id}: the twin is quiet`);
        const checkerPin = pinsWith(row.pins, "checker ")[0];
        if ((checkerPin !== undefined) !== (row.sibling !== undefined)) failures.push(`${row.word}: a checker pin stands exactly with a sibling`);
        if (row.sibling !== undefined && checkerPin !== undefined) {
          const oracle = oracleReadings(new Map([[row.word, rowText(row.quiet)]]), new Map([["zz-sibling-augmentation.ts", row.sibling]])).get(row.word);
          const names = [...(oracle?.snapshot?.keys() ?? [])];
          const baseNames = unique(BASE_READING.snapshot.map(entry => entry.split(".")[0] ?? entry));
          const addedNames = names.filter(name => !baseNames.includes(name));
          if (checkerPin !== `checker snapshot ${addedNames.map(name => `+${name}`).join(" ")}`) failures.push(`${row.word}: the checker adds ${addedNames.join(",")}`);
        }
      }
      expect(failures).toEqual([]);
    },
    BUDGET_MS,
  );

  it(
    "AGREEMENT: the TypeScript checker reads every row's text no narrower than the reader (a member read as a leaf holds no members, an expansion has the checker's members)",
    () => {
      const texts = new Map<string, string>([["BASE", MODULE_TEXT]]);
      for (const row of GATE_ROWS) texts.set(`GATE/${row.id}`, rowText(row.plant));
      for (const row of FORM_ROWS) texts.set(`FORMS/${row.word}/${row.id}`, rowText(row.plant));
      for (const row of KIND_ROWS) texts.set(`${row.site}/${row.id}`, rowText(row.plant));
      for (const row of RESIDUAL_ROWS) {
        texts.set(`RESIDUALS/${row.word}/${row.id}/quiet`, rowText(row.quiet));
        texts.set(`RESIDUALS/${row.word}/${row.id}/twin`, rowText(row.twin));
      }
      const oracle = oracleReadings(texts);
      const failures: string[] = [];
      for (const [id, text] of texts) {
        const reading = oracle.get(id);
        if (reading === undefined) failures.push(`${id}: no checker reading`);
        else failures.push(...disagreements(observationMembers(text), reading).map(entry => `${id}: ${entry}`));
      }
      expect(failures).toEqual([]);
    },
    BUDGET_MS,
  );

  it("FROZEN SHAPE: every row of every table, as <table>:<id>:<pin count>", () => {
    const shape = [
      ...ITEM_ROWS.map(row => `ITEM:${row.id}:${row.pins.length}`),
      ...GATE_ROWS.map(row => `GATE:${row.id}:${row.pins.length}`),
      `BASE:${BASE_ROW.id}:${BASE_ROW.pins.length}`,
      ...FORM_ROWS.map(row => `FORMS:${row.word}/${row.id}:${row.pins.length}`),
      ...KIND_ROWS.map(row => `${row.site === "type" ? "TYPES" : "MEMBERS"}:${row.id}:${row.pins.length}`),
      ...RESIDUAL_ROWS.map(row => `RESIDUALS:${row.word}/${row.id}:${row.pins.length}`),
    ];
    expect(shape).toEqual(FROZEN_SHAPE);
  });
});
