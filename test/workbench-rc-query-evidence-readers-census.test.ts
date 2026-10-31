/**
 * wb-km7q.10 (SDK-DETERMINISTIC-REPLAY-R1; the rule-19 structural-exit child of wb-km7q.3, orchestrator rulings R-B110 and
 * R-B143): the full-surface readers of wb-km7q.3's query-evidence census. Statement (the bead title, read from the tracked bead
 * export): "R14 notPlain prototype-checks class-instance arrays and canonical numeric keys and the R13/D1-F3 inspector census
 * covers every declared tier including the default, narrowed out of wb-km7q.3's fail-closed core (rule-19 structural exit)".
 *
 * WHAT IS DELIVERED. The readers are test/helpers/rc-query-evidence-readers.ts (notPlain, stringsOf, declaredViews,
 *  sizeMembers, layoutBands, tierDraws), shared so wb-km7q.3's census (blocked by this bead, R-B143; not on trunk) takes them in
 *  place of its own notPlain, stringsOf, declaredViews, sizeMembers and DRAW. This census proves them: src, docs/10 and the
 *  export are only read, and every plant is made on a copy (a value, a module's text in memory, or the drawer the census
 *  passes), never on disk.
 *
 * THE ROWS (ROWS: a row's label is the requirement text it answers, verbatim from the export; one test per pin). U1, U2 and
 *  RIDER are the description's three enumerated items, F-U1, F-U2 and F-U3 the three members R-B143 folded into the bead's note,
 *  ACCEPT the description's Acceptance line. A row's pins are its members by R-MEMBER-RULE (below), each pin's quote that
 *  member verbatim. Each plant pin holds the gate's own plant of refusal #4 (gate-prep-16, g10-gate-s144: G10-OBS-ARRAY-SUBCLASS,
 *  G10-OBS-INDEX-4294967295, G10-INS-UNICODE-PAYLOAD, G10-INS-UNICODE-TIER) or of refusal #5 (gate-prep-13, g10-gate-s154:
 *  G13-SIZE-MERGED, G13-SIZE-QUOTED, G13-SIZE-HERITAGE, G13-VIEW-ALIAS, G13-OBS-KEY-UNKNOWN-ON-ZERO), and reads it both ways:
 *  the cure reads the plant, and cut #5's reader (BEFORE, vendored below) passes it; the gate's twin is read by both and the
 *  unplanted control by neither. The plants on src modules are the gate's anchors replaced once in the module's text; the two
 *  inspector-tier plants are made through the drawer the census passes (it draws the gate's line in the default glyph tier
 *  only), because the census never writes src. The ACCEPT pins read the claims: each reader's claim is composed from its
 *  roster, restated byte-for-byte in this header, and every roster form is one falsifier of ROSTER_FALSIFIERS.
 *
 * R-MEMBER-RULE (this census's own rule; not anchored outside): a description item's members are the plants it measures - in
 *  each of its "; " segments, the phrase before " passes 0" or " reads 0", a leading "Members: " and an "(a) " marker dropped; a
 *  folded member's and the Acceptance's members are the items of its last parenthetical, split at ", ".
 *
 * OUTSIDE ANCHORS. The bead's row in .beads/issues.jsonl: its description's "- " items and Acceptance line, and the folded
 *  members of the note line opening "ORCHESTRATOR RULING R-B143 " (the first such line; later notes are never read). So a row, a
 *  pin or a label removed or shortened in every literal of this file still reds. src/ui/workflow-inspector.ts: the views, the
 *  draw options and the drawer. docs/workbench/10-terminal-inspector.md "## Layout responsiveness": the bands tierDraws opens.
 *
 * THE CLAIMS (test/helpers/rc-query-evidence-readers.ts; each composed from its roster and held here byte-for-byte):
 * R14 CLAIM: notPlain walks every own string-keyed property of every object and array (an array's length skipped), recursing
 *  into their data values at any depth, and fails closed on each of these forms: an object that is no array whose prototype is
 *  neither Object.prototype nor null (a Map, a Set, a class instance); an array whose prototype is not Array.prototype (a
 *  class-instance array, whatever it inherits); a symbol key; on an array, an own key that is no array index: no canonical
 *  numeric string, or one at or above 4294967295 (a name, 01, 4294967295); a property that is not enumerable; an accessor (a
 *  getter or a setter); a value of type undefined, function, symbol or bigint; a number that is not finite (NaN, an infinity).
 *  Null, strings, finite numbers and booleans pass, and so do plain and null-prototype objects and plain arrays whose
 *  properties pass. It reads a value through what reflection reports and only the keys the value lists: a proxy that reports
 *  another prototype, or answers or hides a key, is R-UNLISTED's (a residual of wb-km7q.3's census), and a value nested deeper
 *  than the stack throws, failing a census, never passing it.
 * READINGS CLAIM: stringsOf reads every string a value lists, at any depth: a string itself; each own enumerable element of an
 *  array (its index keys); the value of each own enumerable string-keyed property of an object; the name of each own enumerable
 *  string-keyed property of an object; the name and the value of each own enumerable key of an array that is no array index.
 *  Numbers, booleans, null and every other value read as nothing. Not read: what a value holds other than as an own enumerable
 *  string-keyed property or an array element - what it inherits, a Map's or a Set's entries, a symbol-keyed or non-enumerable
 *  property, what a proxy answers without listing it (R-UNLISTED, a residual) - and notPlain fails closed on a Map, a Set, a
 *  class instance, a class-instance array, a symbol key and a non-enumerable property.
 * VIEWS CLAIM: declaredViews reads every member of the module's InspectorView union: a string-literal member of the union; a
 *  type reference to a type alias the module declares at top level without type parameters, read through its own members; a
 *  member written in parentheses. It fails closed on any other member (a template literal type, a keyword, another kind of
 *  literal, a qualified, generic or undeclared name); an alias that leads back to an alias on its own path (a cycle);
 *  InspectorView declared other than exactly once as a top-level type alias.
 * SIZE CLAIM: sizeMembers reads the drawer module's draw options: every member of every top-level interface InspectorSize
 *  declaration of the module (merged declarations included); a member named by an identifier or by a string, numeric or
 *  no-substitution template literal, written as the name or inside a computed name; every member of every interface an extends
 *  clause names that the module declares at top level, recursively. It fails closed on a member that is no property signature
 *  (a method, an index, call or construct signature); any other member name (a private name, another computed name); an extends
 *  clause naming anything else (a type alias, a type argument, a qualified or undeclared name); an extends clause that leads
 *  back to an interface on its own path (a cycle); InspectorSize declared other than as top-level interfaces (a type alias, a
 *  class) or not at all.
 * TIER CLAIM: tierDraws draws every declared tier of the inspector: the default tier: no draw option given; each optional
 *  boolean draw option sizeMembers reads absent, false and true, in every combination (the ASCII tier and the pane tiers among
 *  them); each combination at a width inside every band of docs/10's Layout responsiveness (the band's lowest stated column
 *  count, or one below the column bound it states); each width at the census's row count and at one below every row bound a
 *  band states. It fails closed on a draw option that is neither an optional boolean nor a required number named width or rows;
 *  a draw option or a band its readers could not read, or no band at all.
 *
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, held to the export's member counts; every pin
 *  ran to its witness (WITNESS), and every roster form ran its falsifier.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { type InspectorModel, type InspectorSize, type InspectorState, type InspectorView, initialInspectorState, layoutInspector, reduceInspectorKey } from "../src/ui/workflow-inspector.js";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { ObservationProjection, type ObservationScope } from "../src/workbench/observation.js";
import { type ReactiveFiberProjectionTopology, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import {
  ARRAY_INDEX_LIMIT,
  declaredViews,
  isArrayIndex,
  layoutBands,
  type ModuleReading,
  NOT_PLAIN_FORMS,
  notPlain,
  R14_CLAIM,
  type ReaderForm,
  SIZE_CLAIM,
  SIZE_FORMS,
  SIZE_UNREAD_FORMS,
  type SizeMember,
  STRINGS_CLAIM,
  STRINGS_FORMS,
  sizeMembers,
  stringsOf,
  TIER_CLAIM,
  TIER_FORMS,
  TIER_UNREAD_FORMS,
  type TierDraw,
  tierDraws,
  VIEWS_CLAIM,
  VIEWS_FORMS,
  VIEWS_UNREAD_FORMS,
} from "./helpers/rc-query-evidence-readers.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-km7q.10";
const INSPECTOR = "src/ui/workflow-inspector.ts";
const DOCS10 = "docs/workbench/10-terminal-inspector.md";
const EXPORT = ".beads/issues.jsonl";
const RULING = "ORCHESTRATOR RULING R-B143 ";
const FOLDED_LEAD = "Folded members from the refused cut (each owes an executable falsifier here): ";
const FOLDED_END = " Each plant is tsc-clean";
/** The census's row count (the parent's DRAW rows, held to its roster). */
const ROWS_DRAWN = 40;

// ------------------------------------------------------------------------------------------------------------- the rows
interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}
const ROWS: readonly Row[] = [
  {
    id: "U1",
    label:
      "U1 (R14 'anything else fails closed'): reader notPlain skips the prototype check for arrays and reads every canonical numeric key as an array index. Members: (a) an array that is a class instance (inherited accessor holding a computed FALSE on the TRUE view) passes 0 failed | 54 passed; (b) a property named 4294967295 on the reader adapter's diagnostics passes 0 | 54. Each with liveness red 1 and red twins (2 and 5).",
    pins: [
      { id: "U1-A", quote: "an array that is a class instance (inherited accessor holding a computed FALSE on the TRUE view)" },
      { id: "U1-B", quote: "a property named 4294967295 on the reader adapter's diagnostics" },
    ],
  },
  {
    id: "U2",
    label:
      "U2 (R13 'every declared InspectorView'): the census draws only the inspector's ASCII tier at 120x40 while the inspector's default is the other tier; a default-tier-only payload line reads 0 | 54 (liveness red 1, all-tier twin red 4).",
    pins: [{ id: "U2-PAYLOAD", quote: "a default-tier-only payload line" }],
  },
  {
    id: "RIDER",
    label: "Rider (D1/F3 'every InspectorView'): the same tier gap; a default-tier 'Query verdict: FALSE' reads 0 | 54 (liveness red 1, twin red 2).",
    pins: [{ id: "RIDER-FALSE", quote: "a default-tier 'Query verdict: FALSE'" }],
  },
  {
    id: "F-U1",
    label:
      "U1 - Q25's fail-closed draw-option check claims every draw option src declares is named, but sizeMembers reads only the first InspectorSize declaration's identifier-named members (merged second declaration, quoted member, inherited member each add an unnamed drawn option).",
    pins: [
      { id: "F-U1-MERGED", quote: "merged second declaration" },
      { id: "F-U1-QUOTED", quote: "quoted member" },
      { id: "F-U1-HERITAGE", quote: "inherited member each add an unnamed drawn option" },
    ],
  },
  {
    id: "F-U2",
    label: "U2 - 'every declared InspectorView' (R13/SURFACES/D1/A1) while declaredViews reads only literal union members (alias-declared views are never drawn).",
    pins: [{ id: "F-U2-ALIAS", quote: "alias-declared views are never drawn" }],
  },
  {
    id: "F-U3",
    label:
      "U3 - READINGS' closed unread list and F1/B3's 'any logical-UNKNOWN reading on a surface' while stringsOf reads values only (an UNKNOWN token as an object key on the defer snapshot is read by nothing).",
    pins: [{ id: "F-U3-KEY", quote: "an UNKNOWN token as an object key on the defer snapshot is read by nothing" }],
  },
  {
    id: "ACCEPT",
    label:
      "Acceptance: each plant reds the unmodified census and greens under the cure; the R14/R13/D1-F3 claim text and the readers' coverage agree byte-for-byte with the falsifier roster (prototype-checked arrays, canonical-numeric-key handling, all declared inspector tiers including the default).",
    pins: [
      { id: "ACCEPT-ARRAYS", quote: "prototype-checked arrays" },
      { id: "ACCEPT-NUMERIC-KEYS", quote: "canonical-numeric-key handling" },
      { id: "ACCEPT-TIERS", quote: "all declared inspector tiers including the default" },
    ],
  },
];
/** Standing rule 16's frozen shape, derived from ROWS at the cut's base and held to the export's member counts. */
const FROZEN_SHAPE = ["U1:2", "U2:1", "RIDER:1", "F-U1:3", "F-U2:1", "F-U3:1", "ACCEPT:3"];
/** Each pin's witness: what its plant read under the cure and under cut #5's reader. */
const WITNESS: Readonly<Record<string, string>> = {
  "U1-A": '{"cured":["plant.diagnostics: no plain array"],"before":[]}',
  "U1-B": '{"cured":["plant.diagnostics.4294967295: a named property on an array"],"before":[]}',
  "U2-PAYLOAD": '{"cured":36,"default":true,"before":0}',
  "RIDER-FALSE": '{"cured":36,"default":true,"before":0}',
  "F-U1-MERGED": '{"cured":["ascii","panes","rows","verdictLine","width"],"before":["ascii","panes","rows","width"]}',
  "F-U1-QUOTED": '{"cured":["ascii","panes","rows","verdictLine","width"],"before":["ascii","panes","rows","width"]}',
  "F-U1-HERITAGE": '{"cured":["ascii","panes","rows","verdictLine","width"],"before":["ascii","panes","rows","width"]}',
  "F-U2-ALIAS": '{"cured":["overview","graph","timeline","details","verdicts"],"before":["overview","graph","timeline","details"]}',
  "F-U3-KEY": '{"cured":["UNKNOWN"],"before":[]}',
  "ACCEPT-ARRAYS": '{"form":"an array whose prototype is not Array.prototype (a class-instance array, whatever it inherits)","falsifiers":3}',
  "ACCEPT-NUMERIC-KEYS": '{"indexes":["0","4294967294"],"names":["01","4294967295","4294967296","verdict"]}',
  "ACCEPT-TIERS": '{"draws":54,"tiers":["ascii/1","ascii/2","ascii/3","unicode/1","unicode/2","unicode/3"],"default":"120x40"}',
};
const WITNESSED = new Map<string, string>();
function witnessed(pin: string, witness: unknown): void {
  const text = JSON.stringify(witness);
  expect(text, `${pin}'s witness`).toBe(WITNESS[pin]);
  WITNESSED.set(pin, text);
}
const ROSTER_RAN = new Set<string>();

// ------------------------------------------------------------------------------------------------------- outside anchors
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
/** The bead's row in the tracked export. */
function exportRow(): { readonly title: string; readonly description: string; readonly notes: string } {
  for (const line of readFileSync(join(REPO, EXPORT), "utf8").split("\n")) {
    if (line.trim() === "") continue;
    const row: unknown = JSON.parse(line);
    if (isRecord(row) && row.id === BEAD) return { title: String(row.title), description: String(row.description), notes: String(row.notes) };
  }
  throw new Error(`the export holds no row ${BEAD}`);
}
/** The export's requirement texts, by row id, in order: the description's items, R-B143's folded members, the Acceptance. */
function requirements(): readonly (readonly [string, string])[] {
  const row = exportRow();
  const lines = row.description.split("\n");
  const items = lines.filter(line => line.startsWith("- ")).map(line => line.slice(2));
  const ruling = row.notes.split("\n").find(line => line.startsWith(RULING)) ?? "";
  const folded = (ruling.split(FOLDED_LEAD)[1] ?? "").split(FOLDED_END)[0] ?? "";
  const acceptance = lines.find(line => line.startsWith("Acceptance: ")) ?? "";
  return [
    ...items.map((text): [string, string] => [(text.split(" ")[0] ?? "").toUpperCase(), text]),
    ...folded.split(/ (?=U\d - )/).map((text): [string, string] => [`F-${text.split(" ")[0] ?? ""}`, text]),
    ["ACCEPT", acceptance],
  ];
}
/** R-MEMBER-RULE: a requirement's members. */
function membersOf(id: string, text: string): string[] {
  if (!id.startsWith("F-") && id !== "ACCEPT")
    return text.split("; ").flatMap(segment => {
      const found = /^(?:.*?Members: )?(?:\([a-z]\) )?(.+?) (?:passes|reads) 0\b/.exec(segment);
      return found?.[1] === undefined ? [] : [found[1]];
    });
  const groups = [...text.matchAll(/\(([^()]*)\)/g)];
  return (groups.at(-1)?.[1] ?? "").split(", ");
}

// ------------------------------------------------------------------------------- cut #5's readers (b0edc42d), vendored
/** Cut #5's notPlain (b0edc42d test/workbench-rc-query-evidence-census.test.ts:1030-1046), verbatim: the twin direction. */
function beforeNotPlain(value: unknown, at: string): string[] {
  if (value === null || typeof value === "string" || typeof value === "boolean") return [];
  if (typeof value === "number") return Number.isFinite(value) ? [] : [`${at}: a number that is not finite`];
  if (typeof value !== "object") return [`${at}: a ${typeof value}`];
  const out: string[] = [];
  const prototype: unknown = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) out.push(`${at}: no plain object`);
  if (Object.getOwnPropertySymbols(value).length > 0) out.push(`${at}: a symbol key`);
  for (const key of Object.getOwnPropertyNames(value)) {
    if (Array.isArray(value) && key === "length") continue;
    if (Array.isArray(value) && !/^(?:0|[1-9]\d*)$/.test(key)) out.push(`${at}.${key}: a named property on an array`);
    const property = Object.getOwnPropertyDescriptor(value, key);
    if (property === undefined) continue;
    if (!property.enumerable) out.push(`${at}.${key}: not enumerable`);
    if (property.get !== undefined || property.set !== undefined) out.push(`${at}.${key}: an accessor`);
    else out.push(...beforeNotPlain(property.value, `${at}.${key}`));
  }
  return out;
}
/** Cut #5's stringsOf (:566-571), verbatim. */
function beforeStringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(beforeStringsOf);
  if (isRecord(value)) return Object.values(value).flatMap(beforeStringsOf);
  return [];
}
const parse = (text: string): ts.SourceFile => ts.createSourceFile(INSPECTOR, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
/** Cut #5's declaredViews (:794-800): its head reads the module's text in place of a path; its body is verbatim. */
function beforeDeclaredViews(text: string): string[] {
  const source = parse(text);
  const alias = source.statements.find((statement): statement is ts.TypeAliasDeclaration => ts.isTypeAliasDeclaration(statement) && statement.name.text === "InspectorView");
  const members = alias !== undefined && ts.isUnionTypeNode(alias.type) ? alias.type.types : [];
  return members.flatMap(member => (ts.isLiteralTypeNode(member) && ts.isStringLiteral(member.literal) ? [member.literal.text] : []));
}
/** Cut #5's sizeMembers (:804-809): its head reads the module's text in place of a path; its body is verbatim. */
function beforeSizeMembers(text: string): string[] {
  const source = parse(text);
  const size = source.statements.find((statement): statement is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(statement) && statement.name.text === "InspectorSize");
  return (size?.members ?? []).flatMap(member => (member.name !== undefined && ts.isIdentifier(member.name) ? [member.name.text] : [])).sort();
}
/** Cut #5's DRAW (:812): the one draw it made. */
const BEFORE_DRAW: InspectorSize = { width: 120, rows: 40, ascii: true };

// ------------------------------------------------------------------------------------------------------ the real tree
const INSPECTOR_TEXT = readFileSync(join(REPO, INSPECTOR), "utf8");
const DOCS10_TEXT = readFileSync(join(REPO, DOCS10), "utf8");
/** A module's text with `old` replaced once (the gate's anchor discipline: an anchor that occurs other than once is an error). */
function once(text: string, old: string, replacement: string): string {
  const count = text.split(old).length - 1;
  if (count !== 1) throw new Error(`anchor count ${count} for ${JSON.stringify(old.slice(0, 80))}`);
  return text.replace(old, () => replacement);
}
const names = (reading: ModuleReading<SizeMember>): string[] => reading.members.map(member => member.name);
const SCOPE: ObservationScope = { workspace: REPO, principal: "reader" };
/** The reader adapter's topology over the full-shape render (`zero`: the zero-block render, the defer case's shape). */
function topologyOf(zero = false): ReactiveFiberProjectionTopology {
  const source = fullShapeRf(REPO);
  if (zero && isRecord(source.result)) source.result.blocks = [];
  const reading: JsonValue = { contract: "reactivefiber.render.preview/v1", workspaceRoot: REPO, source };
  return reactivefiberTopology(reading, { scope: SCOPE, seam: "rf-cli", capturedAt: "2026-10-31T00:00:00Z", observedAt: "2026-10-31T00:00:01Z", invocationId: "workflow-1" });
}
/** A copy of a topology with some fields replaced (a plant; the topology itself is frozen). */
const plantedTopology = (topology: ReactiveFiberProjectionTopology, fields: Readonly<Record<string, unknown>>): Record<string, unknown> => ({ ...topology, ...fields });
type Drawer = (model: InspectorModel, state: InspectorState, size: InspectorSize) => string[];
/** The views the cure reads from src (each a member of src's InspectorView union by construction). */
const VIEWS: readonly InspectorView[] = declaredViews(INSPECTOR_TEXT).members.map(view => view as InspectorView);
/** Every view drawn by `drawer` over the topology at `size`: the overview, graph and timeline from the initial state and the
 * details view with the RF node selected (the parent census's inspectorViews). */
function drawnViews(drawer: Drawer, topology: ReactiveFiberProjectionTopology, size: InspectorSize): string[] {
  const projection = new ObservationProjection({ maxEvents: 16, maxNodes: 16, maxEdges: 16, maxQuery: 16 });
  for (const snapshot of topology.snapshots) projection.refresh(snapshot);
  for (const relation of topology.relations) projection.relate(relation);
  const model: InspectorModel = { projection, scope: SCOPE, invocationId: "workflow-1", title: "query evidence readers census", status: "observed" };
  const base = initialInspectorState();
  const selected = reduceInspectorKey("j", base, model)?.state ?? base;
  const details = reduceInspectorKey("e", selected, model)?.state ?? selected;
  return VIEWS.flatMap(view => drawer(model, view === "details" ? details : { ...base, view }, size));
}
/** A drawer drawing `line` in the details view; `defaultOnly`: in the default glyph tier only (ascii unset) - the gate's
 * G10-INS-UNICODE-* plants made through the drawer the census passes. */
const plantedDrawer =
  (line: string, defaultOnly: boolean): Drawer =>
  (model, state, size) => {
    const lines = layoutInspector(model, state, size);
    return state.view === "details" && !(defaultOnly && size.ascii === true) ? [...lines, ` ${line}`] : lines;
  };
/** The cure's draws over today's src and docs/10. */
const CURED_DRAWS = (): ModuleReading<TierDraw> => tierDraws(sizeMembers(INSPECTOR_TEXT, INSPECTOR), layoutBands(DOCS10_TEXT), ROWS_DRAWN);
/** In how many of the cure's draws `drawer` draws `line`, whether the default draw (120 by 40, no option given) is one, and in
 * how many of cut #5's draws (its one DRAW). */
function tierReadings(drawer: Drawer, line: string): { readonly cured: number; readonly default: boolean; readonly before: number } {
  const topology = topologyOf();
  const holds = (size: InspectorSize): boolean => drawnViews(drawer, topology, size).some(text => text.includes(line));
  const held = CURED_DRAWS().members.filter(draw => holds(draw.size));
  return { cured: held.length, default: held.some(draw => draw.id === "120x40"), before: holds(BEFORE_DRAW) ? 1 : 0 };
}

// ------------------------------------------------------------------------------------------------------------ the gate's plants
/** The gate's anchors on src/ui/workflow-inspector.ts (gate-prep-13's gp13probes.py). */
const SIZE_TAIL = "  panes?: boolean;\n}\nexport type InspectorAction";
const SIZE_HEAD = "export interface InspectorSize {\n";
const VIEW_TYPE = "export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';\n";
const SIZE_PLANTS: Readonly<Record<string, string>> = {
  "F-U1-MERGED": once(INSPECTOR_TEXT, SIZE_TAIL, "  panes?: boolean;\n}\n/** gate plant: a draw option in a merged InspectorSize declaration. */\nexport interface InspectorSize {\n  verdictLine?: boolean;\n}\nexport type InspectorAction"),
  "F-U1-QUOTED": once(INSPECTOR_TEXT, SIZE_TAIL, "  panes?: boolean;\n  'verdictLine'?: boolean;\n}\nexport type InspectorAction"),
  "F-U1-HERITAGE": once(INSPECTOR_TEXT, SIZE_HEAD, "interface InspectorVerdictOption {\n  verdictLine?: boolean;\n}\nexport interface InspectorSize extends InspectorVerdictOption {\n"),
};
/** G13-SIZE-INLINE-twin: the same option as an identifier member of the body. */
const SIZE_TWIN = once(INSPECTOR_TEXT, SIZE_TAIL, "  panes?: boolean;\n  verdictLine?: boolean;\n}\nexport type InspectorAction");
/** G13-VIEW-ALIAS and its literal twin. */
const VIEW_ALIAS = once(INSPECTOR_TEXT, VIEW_TYPE, "export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | InspectorVerdictView;\n/** gate plant: a view declared through an alias member. */\nexport type InspectorVerdictView = 'verdicts';\n");
const VIEW_TWIN = once(INSPECTOR_TEXT, VIEW_TYPE, "export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | 'verdicts';\n");
/** G10-OBS-ARRAY-SUBCLASS: the reader adapter's diagnostics as a class-instance array whose prototype computes FALSE on the TRUE
 * view (the output text says passed). */
function gateNotes(notes: readonly string[], outputText: string): string[] {
  class GateNotes extends Array<string> {
    get queryVerdict(): string {
      return outputText.includes(" passed ") ? "FALSE" : "none";
    }
  }
  return GateNotes.from(notes);
}
const TRUE_VIEW_TEXT = "query evidence: 1 passed (TRUE)";

describe("the rows", () => {
  it("U1-A an array that is a class instance (an inherited accessor holding a computed FALSE on the TRUE view) fails closed", () => {
    const topology = topologyOf();
    const notes = gateNotes(topology.diagnostics, TRUE_VIEW_TEXT);
    expect([Reflect.get(notes, "queryVerdict"), Array.isArray(notes), Object.getPrototypeOf(notes) === Array.prototype], "the plant is live: an array whose prototype holds FALSE").toEqual(["FALSE", true, false]);
    const planted = plantedTopology(topology, { diagnostics: notes });
    const cured = notPlain(planted, "plant");
    const before = beforeNotPlain(planted, "plant");
    const twin = plantedTopology(topology, { diagnostics: Object.assign([...topology.diagnostics], { queryVerdict: "FALSE" }) });
    expect([notPlain(twin, "plant"), beforeNotPlain(twin, "plant")], "the twin (an own property) fails closed under both").toEqual([["plant.diagnostics.queryVerdict: a named property on an array"], ["plant.diagnostics.queryVerdict: a named property on an array"]]);
    expect([notPlain(topology, "plant"), beforeNotPlain(topology, "plant")], "the control: today's topology passes both").toEqual([[], []]);
    witnessed("U1-A", { cured, before });
  });
  it("U1-B a property named 4294967295 on the reader adapter's diagnostics fails closed", () => {
    const topology = topologyOf();
    const notes = Object.assign([...topology.diagnostics], { "4294967295": "FALSE" });
    expect([notes.length, Object.hasOwn(notes, "4294967295")], "the plant is live: the key is no array index").toEqual([topology.diagnostics.length, true]);
    const planted = plantedTopology(topology, { diagnostics: notes });
    const twin = plantedTopology(topology, { diagnostics: Object.assign([...topology.diagnostics], { "01": "FALSE" }) });
    expect([notPlain(twin, "plant"), beforeNotPlain(twin, "plant")], "the twin (01) fails closed under both").toEqual([["plant.diagnostics.01: a named property on an array"], ["plant.diagnostics.01: a named property on an array"]]);
    witnessed("U1-B", { cured: notPlain(planted, "plant"), before: beforeNotPlain(planted, "plant") });
  });
  it("U2-PAYLOAD a default-tier-only payload line is drawn by the cure's draws", () => {
    const topology = topologyOf();
    const payload = `Payload: ${topology.snapshots[0]?.nativePayloadRef ?? "none"}`;
    expect(payload, "the payload line carries the snapshot's payload reference").toMatch(/^Payload: rf-output:sha256:[0-9a-f]{64}$/);
    expect(tierReadings(plantedDrawer(payload, false), payload), "the all-tier twin is drawn by both").toEqual({ cured: CURED_DRAWS().members.length, default: true, before: 1 });
    expect(tierReadings(layoutInspector, payload), "the control: the real drawer draws no payload line").toEqual({ cured: 0, default: false, before: 0 });
    witnessed("U2-PAYLOAD", tierReadings(plantedDrawer(payload, true), payload));
  });
  it("RIDER-FALSE a default-tier 'Query verdict: FALSE' is drawn by the cure's draws", () => {
    const line = "Query verdict: FALSE";
    expect(tierReadings(plantedDrawer(line, false), line), "the all-tier twin is drawn by both").toEqual({ cured: CURED_DRAWS().members.length, default: true, before: 1 });
    expect(tierReadings(layoutInspector, line), "the control: the real drawer draws no FALSE line").toEqual({ cured: 0, default: false, before: 0 });
    witnessed("RIDER-FALSE", tierReadings(plantedDrawer(line, true), line));
  });
  for (const pin of ["F-U1-MERGED", "F-U1-QUOTED", "F-U1-HERITAGE"]) {
    it(`${pin} the planted draw option verdictLine is read`, () => {
      const planted = SIZE_PLANTS[pin] ?? "";
      const cured = sizeMembers(planted, INSPECTOR);
      expect(cured.unread, "nothing unread").toEqual([]);
      expect(cured.members.find(member => member.name === "verdictLine"), "the planted option, optional and boolean").toMatchObject({ optional: true, type: "boolean" });
      expect([names(sizeMembers(SIZE_TWIN, INSPECTOR)), beforeSizeMembers(SIZE_TWIN)], "the twin (an identifier member of the body) is read by both").toEqual([
        ["ascii", "panes", "rows", "verdictLine", "width"],
        ["ascii", "panes", "rows", "verdictLine", "width"],
      ]);
      witnessed(pin, { cured: names(cured), before: beforeSizeMembers(planted) });
    });
  }
  it("F-U2-ALIAS a view declared through an alias member is read", () => {
    const cured = declaredViews(VIEW_ALIAS, INSPECTOR);
    expect(cured.unread, "nothing unread").toEqual([]);
    expect([declaredViews(VIEW_TWIN, INSPECTOR).members, beforeDeclaredViews(VIEW_TWIN)], "the literal twin is read by both").toEqual([
      ["overview", "graph", "timeline", "details", "verdicts"],
      ["overview", "graph", "timeline", "details", "verdicts"],
    ]);
    witnessed("F-U2-ALIAS", { cured: cured.members, before: beforeDeclaredViews(VIEW_ALIAS) });
  });
  it("F-U3-KEY an UNKNOWN token carried as an object key on the zero-block snapshot is read", () => {
    const zero = topologyOf(true);
    expect(zero.snapshots.length, "the zero-block render's topology").toBeGreaterThan(0);
    const planted = plantedTopology(zero, { tally: { UNKNOWN: 1 } });
    const reads = (strings: readonly string[]): string[] => strings.filter(text => /(?<![A-Za-z0-9_])UNKNOWN(?![A-Za-z0-9_])/.test(text));
    const twin = plantedTopology(zero, { tally: { verdict: "UNKNOWN" } });
    expect([reads(stringsOf(twin)), reads(beforeStringsOf(twin))], "the twin (a value) is read by both").toEqual([["UNKNOWN"], ["UNKNOWN"]]);
    expect([reads(stringsOf(zero)), reads(beforeStringsOf(zero))], "the control: today's zero-block topology holds no UNKNOWN").toEqual([[], []]);
    expect(stringsOf({ verdicts: { FALSE: 1, passed: 1 } }), "the gate's unit read U13-UNIT-READINGS: every key").toEqual(["verdicts", "FALSE", "passed"]);
    witnessed("F-U3-KEY", { cured: reads(stringsOf(planted)), before: reads(beforeStringsOf(planted)) });
  });
  it("ACCEPT-ARRAYS R14's claim and notPlain agree with the falsifier roster on prototype-checked arrays", () => {
    const form = NOT_PLAIN_FORMS.find(entry => entry.id === "array-prototype");
    expect(R14_CLAIM, "R14's claim lists the form").toContain(form?.text ?? "-");
    const falsifiers = (NOT_PLAIN_FALSIFIERS["array-prototype"] ?? []).filter(([, value]) => notPlain(value, "plant").some(issue => issue.endsWith(": no plain array")));
    witnessed("ACCEPT-ARRAYS", { form: form?.text, falsifiers: falsifiers.length });
  });
  it("ACCEPT-NUMERIC-KEYS an own key of an array is an index only when it is a canonical numeric string below 4294967295", () => {
    const keys = ["0", "01", "4294967294", "4294967295", "4294967296", "verdict"];
    expect(ARRAY_INDEX_LIMIT, "2^32 - 1").toBe(2 ** 32 - 1);
    const sparse = Object.assign([] as string[], { "4294967294": "x" });
    expect([sparse.length, notPlain({ sparse }, "plant")], "the largest array index is an index").toEqual([ARRAY_INDEX_LIMIT, []]);
    expect(NOT_PLAIN_FORMS.find(entry => entry.id === "array-key")?.text, "R14's claim names the handling").toContain("one at or above 4294967295");
    const passes = (key: string): boolean => notPlain({ notes: Object.assign(["query"], { [key]: "FALSE" }) }, "plant").length === 0;
    expect(keys.filter(isArrayIndex), "isArrayIndex agrees with notPlain").toEqual(keys.filter(passes));
    witnessed("ACCEPT-NUMERIC-KEYS", { indexes: keys.filter(passes), names: keys.filter(key => !passes(key)) });
  });
  it("ACCEPT-TIERS the cure draws every declared tier, the default included, and each draw reaches its tier of the real drawer", () => {
    const draws = CURED_DRAWS();
    expect(draws.unread, "nothing unread").toEqual([]);
    const topology = topologyOf();
    const separator = (ascii: boolean): string => (ascii ? " | " : ` ${String.fromCodePoint(0x2502)} `);
    const tierOf = (draw: TierDraw): string => {
      const lines = drawnViews(layoutInspector, topology, draw.size);
      const ascii = lines.every(line => /^[\x20-\x7e]*$/.test(line));
      const panes = Math.max(...lines.map(line => line.split(separator(ascii)).length));
      return `${ascii ? "ascii" : "unicode"}/${panes}`;
    };
    const tierOfDraw = new Map(draws.members.map(draw => [draw.id, tierOf(draw)]));
    const tiers = [...new Set(tierOfDraw.values())].sort();
    const panes = Object.fromEntries(draws.members.filter(draw => draw.id.endsWith("+panes") && !draw.id.includes("ascii")).map(draw => [draw.id, tierOfDraw.get(draw.id)]));
    expect(panes, "every band reached: the pane tiers open at 80 and 120 columns and 20 rows, the single column below").toEqual({
      "79x19+panes": "unicode/1",
      "79x40+panes": "unicode/1",
      "80x19+panes": "unicode/1",
      "80x40+panes": "unicode/2",
      "120x19+panes": "unicode/1",
      "120x40+panes": "unicode/3",
    });
    expect(draws.members.filter(draw => (tierOfDraw.get(draw.id) ?? "").startsWith("ascii") !== draw.id.includes("+ascii")).map(draw => draw.id), "the ASCII tier exactly where ascii is true").toEqual([]);
    const fallback = draws.members.find(draw => Object.keys(draw.size).every(key => key === "width" || key === "rows") && draw.size.width === 120 && draw.size.rows === ROWS_DRAWN);
    witnessed("ACCEPT-TIERS", { draws: draws.members.length, tiers, default: fallback?.id });
  });
});

describe("the anchors", () => {
  it("every row is a requirement of the export, verbatim and in order", () => {
    expect(ROWS.map(row => [row.id, row.label])).toEqual(requirements());
  });
  it("every pin is a member of its row's requirement, verbatim and in order (R-MEMBER-RULE)", () => {
    expect(ROWS.map(row => [row.id, row.pins.map(pin => pin.quote)])).toEqual(requirements().map(([id, text]) => [id, membersOf(id, text)]));
  });
  it("FROZEN SHAPE: ROWS pins its shape, and the shape is the export's", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(FROZEN_SHAPE);
    expect(requirements().map(([id, text]) => `${id}:${membersOf(id, text).length}`), "the export's member counts").toEqual(FROZEN_SHAPE);
  });
  it("the statement is the export's title", () => {
    const header = readFileSync(fileURLToPath(import.meta.url), "utf8").split(" */")[0] ?? "";
    const flat = header.split("\n").map(line => line.replace(/^ \*\s?/, "").trim()).join(" ");
    const title = exportRow().title.replace(/^\[[^\]]*\] /, "");
    expect(flat, "the header quotes the title").toContain(`"${title}"`);
  });
});

// --------------------------------------------------------------------------------------------- the rosters' falsifiers
/** One falsifier per roster form of notPlain: plants of that form, each failing closed with the form's message. */
const NOT_PLAIN_FALSIFIERS: Readonly<Record<string, readonly (readonly [string, unknown])[]>> = {
  "object-prototype": [
    ["a Map", { reading: new Map([["verdict", "FALSE"]]) }],
    ["a Set", { reading: new Set(["FALSE"]) }],
    ["a class instance", { reading: new (class Plant {
      readonly verdict = "FALSE";
    })() }],
  ],
  "array-prototype": [
    ["the gate's class-instance array", { diagnostics: gateNotes(["query"], TRUE_VIEW_TEXT) }],
    ["a class-instance array with nothing of its own", { diagnostics: new (class QuietNotes extends Array<string> {})() }],
    ["an array without a prototype", { diagnostics: Object.setPrototypeOf(["query"], null) }],
  ],
  "symbol-key": [["a symbol key", { [Symbol("verdict")]: "FALSE" }]],
  "array-key": [
    ["a name", { notes: Object.assign(["query"], { verdict: "FALSE" }) }],
    ["01", { notes: Object.assign(["query"], { "01": "FALSE" }) }],
    ["4294967295", { notes: Object.assign(["query"], { "4294967295": "FALSE" }) }],
  ],
  "not-enumerable": [["a property that is not enumerable", Object.defineProperty({}, "verdict", { value: "FALSE", enumerable: false })]],
  accessor: [
    ["a getter", Object.defineProperty({}, "verdict", { get: () => "FALSE", enumerable: true })],
    ["a setter", Object.defineProperty({}, "verdict", { set: () => undefined, enumerable: true })],
  ],
  type: [
    ["undefined", { verdict: undefined }],
    ["a function", { verdict: () => "FALSE" }],
    ["a symbol", { verdict: Symbol("FALSE") }],
    ["a bigint", { verdict: 1n }],
  ],
  "not-finite": [
    ["NaN", { verdict: Number.NaN }],
    ["an infinity", { verdict: Number.POSITIVE_INFINITY }],
  ],
};
/** A message's form: `a <type>` for the four types. */
const formOf = (issue: string): string => {
  const message = issue.slice(issue.indexOf(": ") + 2);
  return /^a (?:undefined|function|symbol|bigint)$/.test(message) ? "a <type>" : message;
};
/** One falsifier per roster form of stringsOf: a value whose only reading is through that form. */
const STRINGS_FALSIFIERS: Readonly<Record<string, readonly [unknown, readonly string[]]>> = {
  string: ["FALSE", ["FALSE"]],
  element: [[["FALSE"]], ["FALSE"]],
  value: [{ v: "FALSE" }, ["v", "FALSE"]],
  key: [{ FALSE: 1 }, ["FALSE"]],
  "array-key": [Object.assign(["query"], { verdict: "FALSE" }), ["query", "verdict", "FALSE"]],
};
/** A module text: InspectorView or InspectorSize declared as `declaration` (the rest of the module is the real drawer's). */
const viewsModule = (declaration: string): string => once(INSPECTOR_TEXT, VIEW_TYPE, declaration);
const sizeModule = (declaration: string): string => once(INSPECTOR_TEXT, "export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", declaration);
/** One falsifier per roster form of declaredViews: a declaration and the views read, or the unread count. */
const VIEWS_FALSIFIERS: Readonly<Record<string, readonly (readonly [string, readonly string[] | number])[]>> = {
  literal: [["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';\n", ["overview", "graph", "timeline", "details"]]],
  alias: [
    ["export type InspectorView = 'overview' | 'graph' | Later;\ntype Later = 'timeline' | Last;\ntype Last = 'details';\n", ["overview", "graph", "timeline", "details"]],
    ["export type InspectorView = Every;\ntype Every = 'overview' | 'graph' | 'timeline' | 'details';\n", ["overview", "graph", "timeline", "details"]],
  ],
  parenthesized: [["export type InspectorView = ('overview' | 'graph') | ('timeline' | 'details');\n", ["overview", "graph", "timeline", "details"]]],
  "other-member": [
    // a template literal type; the placeholder is split so no string literal of this file holds one
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | `view-$" + "{string}`;\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | string;\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | 1;\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | Views.More;\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | More<'verdicts'>;\ntype More<T> = T;\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | Undeclared;\n", 1],
  ],
  circular: [["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details' | Loop;\ntype Loop = 'verdicts' | InspectorView;\n", 1]],
  declaration: [
    ["export interface InspectorView { readonly name: string; }\n", 1],
    ["export type InspectorView = 'overview' | 'graph' | 'timeline' | 'details';\nexport type InspectorView = 'verdicts';\n", 1],
    ["export type Views = 'overview' | 'graph' | 'timeline' | 'details';\n", 1],
  ],
};
/** One falsifier per roster form of sizeMembers: a declaration replacing the head of InspectorSize, and the members read or
 * the unread count. */
const SIZE_FALSIFIERS: Readonly<Record<string, readonly (readonly [string, readonly string[] | number])[]>> = {
  merged: [["export interface InspectorSize {\n  width: number;\n  rows: number;\n}\nexport interface InspectorSize {\n  ascii?: boolean;\n", ["ascii", "panes", "rows", "width"]]],
  names: [
    ["export interface InspectorSize {\n  'width': number;\n  rows: number;\n  ascii?: boolean;\n", ["ascii", "panes", "rows", "width"]],
    ["export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n  0?: boolean;\n", ["0", "ascii", "panes", "rows", "width"]],
    ["export interface InspectorSize {\n  width: number;\n  rows: number;\n  ['ascii']?: boolean;\n", ["ascii", "panes", "rows", "width"]],
    ["export interface InspectorSize {\n  width: number;\n  rows: number;\n  [`ascii`]?: boolean;\n", ["ascii", "panes", "rows", "width"]],
  ],
  heritage: [["interface Sized {\n  width: number;\n  rows: number;\n}\ninterface Glyphs extends Sized {\n  ascii?: boolean;\n}\nexport interface InspectorSize extends Glyphs {\n", ["ascii", "panes", "rows", "width"]]],
  "member-kind": [
    ["export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n  verdictLine(): boolean;\n", 1],
    ["export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n  [option: string]: boolean | number | undefined;\n", 1],
  ],
  "member-name": [["export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n  [Symbol.iterator]?: boolean;\n", 1]],
  "heritage-other": [
    ["export interface InspectorSize extends Partial<Record<'verdictLine', boolean>> {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1],
    ["export interface InspectorSize extends Options.Verdict {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1],
    ["export interface InspectorSize extends Undeclared {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1],
    ["type Base = { verdictLine?: boolean };\nexport interface InspectorSize extends Base {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1],
  ],
  circular: [["interface Loop extends InspectorSize {\n  verdictLine?: boolean;\n}\nexport interface InspectorSize extends Loop {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1]],
  declaration: [
    ["export type InspectorSize = {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n", 1],
    ["export class InspectorSize {\n  width = 0;\n  rows = 0;\n  ascii?: boolean;\n", 1],
  ],
};
const SIZE_DECLARED = "export interface InspectorSize {\n  width: number;\n  rows: number;\n  ascii?: boolean;\n";
/** One falsifier per roster form of tierDraws: the draws read, or the unread count, for a module's draw options and docs/10. */
const TIER_FALSIFIERS: Readonly<Record<string, readonly (readonly [string, string, number])[]>> = {
  default: [[SIZE_DECLARED, DOCS10_TEXT, 54]],
  options: [[`${SIZE_DECLARED}  verdictLine?: boolean;\n`, DOCS10_TEXT, 162]],
  widths: [[SIZE_DECLARED, DOCS10_TEXT.replace("- >=120:", "- >=120: three panes;\n- >=160:"), 72]],
  rows: [[SIZE_DECLARED, DOCS10_TEXT.replace("- <80 columns or <20 rows:", "- <80 columns:"), 27]],
  "option-kind": [
    [`${SIZE_DECLARED}  mode?: 'compact' | 'full';\n`, DOCS10_TEXT, -1],
    [`${SIZE_DECLARED}  scale: number;\n`, DOCS10_TEXT, -1],
  ],
  "unread-input": [
    [`${SIZE_DECLARED}  verdictLine(): boolean;\n`, DOCS10_TEXT, -1],
    [SIZE_DECLARED, DOCS10_TEXT.replace(`- 80${String.fromCodePoint(0x2013)}119:`, "- 80 to 119:"), -1],
    [SIZE_DECLARED, DOCS10_TEXT.replace("## Layout responsiveness", "## Layout"), -1],
  ],
};
/** The forms a roster lists, beside the falsifiers held for it: equal, so a form's falsifier cannot be dropped silently. */
const formIds = (forms: readonly ReaderForm[]): string[] => forms.map(form => form.id);
/** The header's claim paragraph labelled `label`, its lines joined. */
function headerClaim(label: string): string {
  const header = readFileSync(fileURLToPath(import.meta.url), "utf8").split(" */")[0] ?? "";
  const lines = header.split("\n");
  const start = lines.findIndex(line => line.startsWith(` * ${label} `));
  if (start < 0) return "";
  const paragraph = [lines[start] ?? ""];
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith(" *  ")) break;
    paragraph.push(line);
  }
  return paragraph
    .map(line => line.replace(/^ \*\s+/, ""))
    .join(" ")
    .slice(label.length + 1);
}

describe("the rosters: every form of every claim holds one falsifier, and every claim is restated here byte-for-byte", () => {
  it("R14 notPlain: each plant fails closed with its form's message, and plain data passes", () => {
    expect(Object.keys(NOT_PLAIN_FALSIFIERS), "a falsifier per form").toEqual(formIds(NOT_PLAIN_FORMS));
    const misread = NOT_PLAIN_FORMS.flatMap(form =>
      (NOT_PLAIN_FALSIFIERS[form.id] ?? []).flatMap(([name, value]) => {
        const issues = notPlain(value, "plant");
        return issues.length > 0 && issues.every(issue => formOf(issue) === form.message) ? [] : [`${form.id} ${name}: ${issues.join("; ")}`];
      }),
    );
    expect(misread, "every plant reads as its form").toEqual([]);
    const nested = (value: unknown, depth: number): unknown => (depth === 0 ? value : depth % 2 === 0 ? { nested: nested(value, depth - 1) } : [nested(value, depth - 1)]);
    expect(notPlain(nested(new Map([["verdict", "FALSE"]]), 64), "plant").length, "a plant 64 levels down").toBe(1);
    let deep: unknown = "x";
    for (let level = 0; level < 200_000; level++) deep = [deep];
    expect(() => notPlain(deep, "plant"), "a value nested deeper than the stack throws").toThrow(RangeError);
    const bare = Object.assign(Object.create(null) as Record<string, string>, { text: "z" });
    expect(notPlain({ text: "x", count: 1, flag: true, none: null, list: [{ nested: ["y"] }], bare, deep: nested("x", 64) }, "plant"), "plain data passes").toEqual([]);
    expect(headerClaim("R14 CLAIM:"), "the header restates R14's claim").toBe(R14_CLAIM);
    ROSTER_RAN.add("R14");
  });
  it("READINGS stringsOf: each form's value reads exactly its strings", () => {
    expect(Object.keys(STRINGS_FALSIFIERS), "a falsifier per form").toEqual(formIds(STRINGS_FORMS));
    expect(Object.fromEntries(Object.entries(STRINGS_FALSIFIERS).map(([id, [value]]) => [id, stringsOf(value)])), "each form's readings").toEqual(Object.fromEntries(Object.entries(STRINGS_FALSIFIERS).map(([id, [, read]]) => [id, read])));
    expect([1, true, null, undefined].map(stringsOf), "what reads as nothing").toEqual([[], [], [], []]);
    expect(headerClaim("READINGS CLAIM:"), "the header restates the claim").toBe(STRINGS_CLAIM);
    ROSTER_RAN.add("READINGS");
  });
  it("VIEWS declaredViews: each form is read, or fails closed", () => {
    expect(Object.keys(VIEWS_FALSIFIERS), "a falsifier per form").toEqual(formIds([...VIEWS_FORMS, ...VIEWS_UNREAD_FORMS]));
    const misread = Object.entries(VIEWS_FALSIFIERS).flatMap(([id, plants]) =>
      plants.flatMap(([declaration, expected]) => {
        const reading = declaredViews(viewsModule(declaration), INSPECTOR);
        const ok = typeof expected === "number" ? reading.unread.length === expected : reading.unread.length === 0 && JSON.stringify(reading.members) === JSON.stringify(expected);
        return ok ? [] : [`${id}: ${JSON.stringify(reading)}`];
      }),
    );
    expect(misread, "every falsifier reads as its form").toEqual([]);
    expect(headerClaim("VIEWS CLAIM:"), "the header restates the claim").toBe(VIEWS_CLAIM);
    ROSTER_RAN.add("VIEWS");
  });
  it("SIZE sizeMembers: each form is read, or fails closed", () => {
    expect(Object.keys(SIZE_FALSIFIERS), "a falsifier per form").toEqual(formIds([...SIZE_FORMS, ...SIZE_UNREAD_FORMS]));
    const misread = Object.entries(SIZE_FALSIFIERS).flatMap(([id, plants]) =>
      plants.flatMap(([declaration, expected]) => {
        const reading = sizeMembers(sizeModule(declaration), INSPECTOR);
        const ok = typeof expected === "number" ? reading.unread.length === expected : reading.unread.length === 0 && JSON.stringify(names(reading)) === JSON.stringify(expected);
        return ok ? [] : [`${id}: ${JSON.stringify(reading)}`];
      }),
    );
    expect(misread, "every falsifier reads as its form").toEqual([]);
    expect(headerClaim("SIZE CLAIM:"), "the header restates the claim").toBe(SIZE_CLAIM);
    ROSTER_RAN.add("SIZE");
  });
  it("TIERS tierDraws: each form is drawn, or fails closed", () => {
    expect(Object.keys(TIER_FALSIFIERS), "a falsifier per form").toEqual(formIds([...TIER_FORMS, ...TIER_UNREAD_FORMS]));
    const misread = Object.entries(TIER_FALSIFIERS).flatMap(([id, plants]) =>
      plants.flatMap(([declaration, doc, expected]) => {
        const reading = tierDraws(sizeMembers(sizeModule(declaration), INSPECTOR), layoutBands(doc), ROWS_DRAWN);
        const ids = reading.members.map(draw => draw.id);
        const ok = expected === -1 ? reading.unread.length > 0 && ids.length === 0 : reading.unread.length === 0 && ids.length === expected && ids.includes("120x40");
        return ok ? [] : [`${id}: ${JSON.stringify({ ids: ids.length, unread: reading.unread })}`];
      }),
    );
    expect(misread, "every falsifier draws as its form").toEqual([]);
    expect(CURED_DRAWS().members.find(draw => draw.id === "120x40")?.size, "the default draw gives no option").toEqual({ width: 120, rows: 40 });
    expect(headerClaim("TIER CLAIM:"), "the header restates the claim").toBe(TIER_CLAIM);
    ROSTER_RAN.add("TIERS");
  });
});

describe("the real tree", () => {
  it("src's drawer module reads clean: its four views, its four draw options, nothing unread", () => {
    expect(declaredViews(INSPECTOR_TEXT, INSPECTOR), "the views").toEqual({ members: ["overview", "graph", "timeline", "details"], unread: [] });
    expect(sizeMembers(INSPECTOR_TEXT, INSPECTOR), "the draw options").toEqual({
      members: [
        { name: "ascii", optional: true, type: "boolean", from: "InspectorSize" },
        { name: "panes", optional: true, type: "boolean", from: "InspectorSize" },
        { name: "rows", optional: false, type: "number", from: "InspectorSize" },
        { name: "width", optional: false, type: "number", from: "InspectorSize" },
      ],
      unread: [],
    });
    expect([VIEWS, beforeDeclaredViews(INSPECTOR_TEXT), names(sizeMembers(INSPECTOR_TEXT, INSPECTOR)), beforeSizeMembers(INSPECTOR_TEXT)], "the cure reads today's tree as cut #5 did").toEqual([
      ["overview", "graph", "timeline", "details"],
      ["overview", "graph", "timeline", "details"],
      ["ascii", "panes", "rows", "width"],
      ["ascii", "panes", "rows", "width"],
    ]);
  });
  it("docs/10's Layout responsiveness states three bands: one below 80 columns or 20 rows, one from 80 and one from 120", () => {
    const bands = layoutBands(DOCS10_TEXT);
    expect([bands.members.map(band => [band.from, band.columnsBelow, band.rowsBelow]), bands.unread], "the bands").toEqual([
      [
        [undefined, 80, 20],
        [80, undefined, undefined],
        [120, undefined, undefined],
      ],
      [],
    ]);
    expect(bands.members.map(band => band.text.slice(2).split(":")[0]), "each band's lead").toEqual(["<80 columns or <20 rows", `80${String.fromCodePoint(0x2013)}119`, ">=120"]);
  });
  it("today's surfaces read clean under the cure: the topology passes notPlain, and its keys are read", () => {
    const topology = topologyOf();
    expect([notPlain(topology, "observer"), notPlain(topologyOf(true), "observer")], "notPlain").toEqual([[], []]);
    expect(stringsOf(topology), "the keys are read beside the values").toEqual(expect.arrayContaining(["snapshots", "relations", "diagnostics"]));
    expect(stringsOf(topology).length, "the cure reads more than cut #5").toBeGreaterThan(beforeStringsOf(topology).length);
  });
});

describe("records", () => {
  it("every pin ran to its witness", () => {
    expect([...WITNESSED.keys()].sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect(Object.fromEntries(WITNESSED)).toEqual(Object.fromEntries(Object.entries(WITNESS).map(([pin, witness]) => [pin, witness])));
  });
  it("every roster ran its falsifiers", () => {
    expect([...ROSTER_RAN].sort()).toEqual(["R14", "READINGS", "SIZE", "TIERS", "VIEWS"]);
  });
});
