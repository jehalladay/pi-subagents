/**
 * wb-tz2.16 (HX-ORIGINAL-GOALS-CLOSURE-R11, program-triage-2026-10-17; the rule-19 structural-exit child of wb-tz2.11,
 * orchestrator rulings R-B83 and R-B98): the falsifier census of the binding-aware custody readers,
 * test/helpers/hyperunix-custody-readers.ts. Statement (the bead's export title): "C7 driver const-binding resolution, wrapper
 * flag forms, C2 destructuring tamper and title-vs-needle readers, narrowed out of wb-tz2.11's fail-closed core (rule-19
 * structural exit)".
 *
 * ACCEPTANCE (the bead's description): "each gate-authored plant above reds the unmodified census and greens under the cure; the
 * claim text and reader forms agree byte-for-byte with the falsifier roster." Read here as: every gate-authored member of the
 * description's U1-U4 (refusal #3, gate-prep-13 / g10-gate-s139, M:34363) and of the two groups R-B98 folds in (refusal #4,
 * gate-prep-4 / g10-gate-s144, M:35515) is a GATE row pinning what these readers read in it, a member wb-tz2.11 cut #4's
 * readers read quiet read here (red against cut #4's resolution, green on these readers), and every control read here too; and
 * the helper's header roster lines equal its exported rosters, which equal this census's plant rosters, word for word.
 *
 * ROWS:
 *  GATE: the gate's own members, replayed verbatim from the two PREP archives (anchor edits on the lifecycle file, or a planted
 *   file's content): a lifecycle member pins the tamper findings and module mocks it adds; a planted file pins its prefilter,
 *   driver reasons and shape forms. The base lifecycle file reads no tamper and only its own furnace SDK mock.
 *  ANCHOR (standing rule 16, CT5 / CT6, outside this census): the member ids the tracker export's refusal #3 and #4 verdicts name
 *   on wb-tz2.11 are exactly the GATE rows (refusal #3's C8 docs and C4 vocabulary members aside, OUT_OF_SCOPE); the nine claim
 *   words refusal #4 lists are exactly the RH rows, each naming roster entries with a calibration plant; and every requirement line
 *   this census answers occurs verbatim in the export.
 *  FORMS (R-B98 U2): one calibration plant per word of C2_FORMS, DRIVER_FORMS and SHAPE_FORMS: the full roster reads it, the word
 *   alone reads exactly it, and the roster without the word reads nothing of it - so removing any word's reader reds its row.
 *  BINDINGS, VALUES, CHAINS, ROOTS, FLAGS, PREFILTER: one row per word of BINDING_KINDS, ROOT_FORMS, WRAPPER_FLAG_FORMS and
 *   UNESCAPE_FORMS, each that form's falsifier (a ROOTS row reads its chain through its own form only), and the value and chain
 *   rows reading each name through its own binding.
 *  PRECISION (the description's U1): a const-bound specifier, override key or capability id whose own binding names no HX form
 *   reads quiet although another scope's same-named const does (wb-tz2.11 cut #4 read every same-named const).
 *  RESIDUALS: RESIDUAL_FAMILIES, each with pinned quiet members and the loud control beside each.
 *  CLAIM: the helper header's "- <word>:" lines equal BINDING_KINDS, ROOT_FORMS, C2_FORMS, DRIVER_FORMS (word [reason]),
 *   SHAPE_FORMS, WRAPPER_FLAG_FORMS, UNESCAPE_FORMS and RESIDUAL_FAMILIES (id: family) in order; and every plant roster here
 *   equals its helper roster.
 *  FROZEN SHAPE (standing rule 16): one literal pins every table row as table:id:digest, the digest over the row's own JSON.
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; it reads the lifecycle test, the helper's text and the
 * tracker export, and parses planted text in memory.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  BINDING_KINDS,
  type BindingKind,
  bindingOf,
  C2_FORMS,
  calleeChains,
  commandHeads,
  DRIVER_FORMS,
  DRIVER_NEEDLE,
  type DriverForm,
  descendants,
  failClosedCommandHeads,
  falsifierShapes,
  hxDrivers,
  modelledCommandHeads,
  moduleMockSpecifiers,
  outsideChains,
  parseText,
  passesPrefilter,
  RESIDUAL_FAMILIES,
  ROOT_FORMS,
  type RootForm,
  SHAPE_FORMS,
  type ShapeForm,
  shapeForms,
  stringValues,
  type TamperForm,
  tampersIn,
  UNESCAPE_FORMS,
  WRAPPER_FLAG_FORMS,
} from "./helpers/hyperunix-custody-readers.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HELPER = "test/helpers/hyperunix-custody-readers.ts";
const LIFECYCLE = "test/workbench-provider-lifecycle.test.ts";
const EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-tz2.16";
const PARENT = "wb-tz2.11";
const PLANT = "test/workbench-zz-readers-plant.test.ts";
const SUITE = "wb-tz2.16 binding-aware HyperUnix custody readers census (HX-ORIGINAL-GOALS-CLOSURE-R11)";
const CENSUS_TIMEOUT = 120_000;
/** The lifecycle file's own module mock (the furnace SDK), its callee assembled so this file spells no module-mock call. */
const BASE_MOCK = ["vi", "mock(@furnace/sdk)"].join(".");

const TEXTS = new Map<string, string>();
function read(path: string): string {
  const cached = TEXTS.get(path);
  if (cached !== undefined) return cached;
  const text = readFileSync(join(ROOT, path), "utf8");
  TEXTS.set(path, text);
  return text;
}
const digest = (text: string): string => createHash("sha256").update(text).digest("hex").slice(0, 12);

// ---- the tracker export: the anchor outside this census -------------------------------------------------------------

interface ExportRecord {
  readonly description: string;
  readonly notes: string;
}
const RECORDS = new Map<string, ExportRecord>();
function exportRecord(id: string): ExportRecord {
  const cached = RECORDS.get(id);
  if (cached !== undefined) return cached;
  const needle = `"id":"${id}"`;
  const entry = read(EXPORT)
    .split("\n")
    .filter(line => line.includes(needle))
    .map(line => JSON.parse(line) as Record<string, unknown>)
    .find(candidate => candidate.id === id);
  const field = (key: string): string => {
    const value = entry?.[key];
    return typeof value === "string" ? value : "";
  };
  const record = { description: field("description"), notes: field("notes") };
  RECORDS.set(id, record);
  return record;
}
/** One refusal's gate verdict in the parent's notes: from its heading to the next verdict or ruling. */
function verdictBlock(refusal: number): string {
  const notes = exportRecord(PARENT).notes;
  const start = notes.indexOf(`GATE VERDICT ${PARENT}: REFUSED (RESPIN) - substance refusal #${refusal}`);
  if (start < 0) return "";
  const ends = [notes.indexOf(`GATE VERDICT ${PARENT}`, start + 1), notes.indexOf("ORCHESTRATOR RULING", start + 1)].filter(at => at > start);
  return notes.slice(start, Math.min(notes.length, ...ends));
}
/** The refusal #3 member ids a verdict names: G, two digits and a suffix; a range G10-G13 reads as every id in it. */
function namedRefusal3(block: string): string[] {
  const ids = new Set<string>();
  for (const match of block.matchAll(/(?<![A-Za-z0-9-])G(\d{2})([a-z]*)(?:-G(\d{2}))?(?![A-Za-z0-9])/g)) {
    const [, from = "", suffix = "", to] = match;
    if (to === undefined) ids.add(`G${from}${suffix}`);
    else for (let at = Number(from); at <= Number(to); at += 1) ids.add(`G${String(at).padStart(2, "0")}`);
  }
  return [...ids].sort();
}
const ITEM = String.raw`(\d{2}[a-z]*)(?: \([^)]*\))?`;
/** The refusal #4 member ids a verdict names: a full GP4-C2- or GP4-C7- id, the ids a list after it abbreviates, and the bullets under one. */
function namedRefusal4(block: string): string[] {
  const ids = new Set<string>();
  for (const match of block.matchAll(new RegExp(`(GP4-C[27]-)${ITEM}((?:(?:,| and| or) ${ITEM})*)`, "g"))) {
    const [, prefix = "", first = "", rest = ""] = match;
    ids.add(`${prefix}${first}`);
    for (const more of rest.matchAll(/(?:,| and| or) (\d{2}[a-z]*)/g)) ids.add(`${prefix}${more[1] ?? ""}`);
  }
  let prefix: string | undefined;
  for (const line of block.split("\n")) {
    const bullet = /^\s*- (GP4-C[27]-)?(\d{2}[a-z]*)((?: and \d{2}[a-z]*)*)\b/.exec(line);
    if (bullet === null) continue;
    prefix = bullet[1] ?? prefix;
    if (prefix === undefined) continue;
    ids.add(`${prefix}${bullet[2] ?? ""}`);
    for (const more of (bullet[3] ?? "").matchAll(/ and (\d{2}[a-z]*)/g)) ids.add(`${prefix}${more[1] ?? ""}`);
  }
  return [...ids].sort();
}
/** The claim words refusal #4's reason lists ("The nine words are ..."). */
function claimWords(block: string): string[] {
  const match = /The nine words are (.+?)\.(?:\s|$)/.exec(block);
  return match === null ? [] : (match[1] ?? "").split(/, (?:and )?/);
}

// ---- readings ---------------------------------------------------------------------------------------------------------

interface Edit {
  readonly anchor: string;
  readonly replacement: string;
}
function plantedText(text: string, edits: readonly Edit[]): string {
  return edits.reduce((out, edit) => {
    const at = out.indexOf(edit.anchor);
    expect(at >= 0 && out.indexOf(edit.anchor, at + 1) === -1, `the anchor occurs exactly once: ${edit.anchor}`).toBe(true);
    return `${out.slice(0, at)}${edit.replacement}${out.slice(at + edit.anchor.length)}`;
  }, text);
}
const withoutLines = (entries: readonly string[]): string[] => entries.map(entry => entry.replace(/ :\d+$/, ""));
const mocksOf = (source: ts.SourceFile): string[] => moduleMockSpecifiers(source).map(mock => `${mock.mock}(${mock.specifier})`);
/** The entries of after that before does not hold (each entry of before cancels one equal entry of after). */
function added(before: readonly string[], after: readonly string[]): string[] {
  const left = [...before];
  return after.filter(entry => {
    const at = left.indexOf(entry);
    if (at < 0) return true;
    left.splice(at, 1);
    return false;
  });
}
interface LifecycleReading {
  readonly tampers: readonly string[];
  readonly mocks: readonly string[];
}
let BASE: ts.SourceFile | undefined;
function lifecycleReading(edits: readonly Edit[], forms: readonly TamperForm[] = C2_FORMS): LifecycleReading {
  BASE ??= parseText(LIFECYCLE, read(LIFECYCLE));
  const source = parseText(LIFECYCLE, plantedText(read(LIFECYCLE), edits));
  return { tampers: added(withoutLines(tampersIn(BASE, forms)), withoutLines(tampersIn(source, forms))), mocks: added(mocksOf(BASE), mocksOf(source)) };
}
interface PlantReading {
  readonly prefilter: boolean;
  readonly drivers: readonly string[];
  readonly shapes: readonly string[];
}
function plantReading(path: string, content: string, drivers: readonly DriverForm[] = DRIVER_FORMS, shapes: readonly ShapeForm[] = SHAPE_FORMS): PlantReading {
  const source = parseText(path, content);
  return { prefilter: passesPrefilter(content), drivers: hxDrivers(source, drivers), shapes: shapeForms(falsifierShapes(source, shapes)) };
}
function formNamed<T extends { readonly word: string }>(roster: readonly T[], word: string): T {
  const form = roster.find(entry => entry.word === word);
  if (form === undefined) throw new Error(`no roster word ${word}`);
  return form;
}
/** The chains a root plant's last "= forged" target reads through the given root forms. */
function rootReading(text: string, forms: readonly RootForm[] = ROOT_FORMS): readonly string[] {
  const source = parseText(PLANT, text);
  const writes = descendants(source).filter(
    (node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(node.right) && node.right.text === "forged",
  );
  const target = writes[writes.length - 1];
  return target === undefined ? ["<no forged write>"] : outsideChains(target.left, forms);
}
/** Each identifier element of each array literal of a source, keyed by the function or const that holds the array, with its binding kind. */
function arrayElementKinds(text: string): Record<BindingKind, string[]> {
  const out: Record<BindingKind, string[]> = { import: [], global: [], local: [] };
  for (const node of descendants(parseText(PLANT, text))) {
    if (!ts.isIdentifier(node) || !ts.isArrayLiteralExpression(node.parent)) continue;
    let holder: ts.Node = node.parent;
    while (!ts.isFunctionDeclaration(holder) && !ts.isVariableDeclaration(holder) && holder.parent !== undefined) holder = holder.parent;
    const name = (ts.isFunctionDeclaration(holder) || ts.isVariableDeclaration(holder)) && holder.name !== undefined && ts.isIdentifier(holder.name) ? holder.name.text : "?";
    out[bindingOf(node).kind].push(`${name}:${node.text}`);
  }
  return out;
}
/** The values (stringValues) of each identifier element of each array literal of a source, keyed as arrayElementKinds keys them. */
function arrayElementValues(text: string): Record<string, readonly string[]> {
  const out: Record<string, readonly string[]> = {};
  for (const node of descendants(parseText(PLANT, text))) {
    if (!ts.isIdentifier(node) || !ts.isArrayLiteralExpression(node.parent)) continue;
    let holder: ts.Node = node.parent;
    while (!ts.isFunctionDeclaration(holder) && !ts.isVariableDeclaration(holder) && holder.parent !== undefined) holder = holder.parent;
    const name = (ts.isFunctionDeclaration(holder) || ts.isVariableDeclaration(holder)) && holder.name !== undefined && ts.isIdentifier(holder.name) ? holder.name.text : "?";
    out[`${name}:${node.text}`] = stringValues(node);
  }
  return out;
}
/** The callee chains of every call of a source, in source order. */
function callChains(text: string): string[] {
  return descendants(parseText(PLANT, text))
    .filter(ts.isCallExpression)
    .map(call => `${call.expression.getText()} -> ${calleeChains(call.expression).join(" | ")}`);
}
/** The helper header's "- <entry>:" lines after each section marker, up to the first line that is no entry. */
function headerRoster(marker: string): string[] {
  const header = read(HELPER).slice(0, read(HELPER).indexOf("*/"));
  const lines = header.split("\n").map(line => line.replace(/^\s*\*\s?/, ""));
  const start = lines.findIndex(line => line.includes(marker));
  if (start < 0) return [`<no ${marker}>`];
  const out: string[] = [];
  for (const line of lines.slice(start + 1)) {
    if (!line.startsWith("- ")) break;
    out.push(line.slice(2));
  }
  return out;
}
const entryWord = (line: string): string => line.slice(0, line.indexOf(": "));

// ---- tables -----------------------------------------------------------------------------------------------------------

interface LifecycleMember {
  readonly id: string;
  readonly label: string;
  readonly edits: readonly Edit[];
  readonly tampers: readonly string[];
  readonly mocks: readonly string[];
}
interface PlantMember {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly content: string;
  readonly prefilter: boolean;
  readonly drivers: readonly string[];
  readonly shapes: readonly string[];
}
interface ScopeEntry {
  readonly id: string;
  readonly why: string;
}
interface RhRow {
  readonly id: string;
  readonly word: string;
  readonly forms: readonly string[];
}
interface Requirement {
  readonly key: string;
  readonly source: "description" | "notes";
  readonly text: string;
}
interface C2Plant {
  readonly word: string;
  readonly line: string;
  readonly tampers: readonly string[];
}
interface DriverPlant {
  readonly word: string;
  readonly content: string;
}
interface ShapePlant {
  readonly word: string;
  readonly content: string;
  readonly shapes: readonly string[];
}
interface RootPlant {
  readonly word: string;
  readonly text: string;
  readonly chain: string;
}
interface FlagPin {
  readonly text: string;
  readonly heads: readonly string[];
}
interface FlagRow {
  readonly word: string;
  readonly pins: readonly FlagPin[];
}
interface PrecisionRow {
  readonly id: string;
  readonly answers: string;
  readonly content: string;
  readonly control: string;
  readonly controlDrivers: readonly string[];
}
interface PrefilterRow {
  readonly word: string;
  readonly text: string;
}
interface ResidualPin {
  readonly reading: "tampers" | "drivers" | "shapes";
  readonly quiet: string;
  readonly loud: string;
  readonly loudReading: readonly string[];
}
interface ResidualRow {
  readonly id: string;
  readonly pins: readonly ResidualPin[];
}
interface Fixture {
  readonly key: string;
  readonly value: unknown;
}
/** The lifecycle file's K2 client line: every calibration and residual line is planted right after it. */
const K2_CLIENT = "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };";
const BINDING_TEXT = "import { HyperUnix } from \"@hyperunix/sdk\";\nimport hxDefault from \"@hyperunix/sdk\";\nimport * as hxAll from \"@hyperunix/sdk\";\nimport hxEquals = require(\"@hyperunix/sdk\");\ndeclare const ambient: { readonly tag: string };\nconst local = { tag: \"local\" };\nexport function shadows(HyperUnix: unknown): unknown[] {\n  const hxAll = 1;\n  const JSON = { parse: (text: string): string => text };\n  try {\n    return [HyperUnix, hxAll, JSON];\n  } catch (hxDefault) {\n    return [hxDefault];\n  }\n}\nexport const reads = [HyperUnix, hxDefault, hxAll, hxEquals, ambient, local, JSON];\n";
const BINDING_EXPECTED: Record<BindingKind, readonly string[]> = { import: ["reads:HyperUnix", "reads:hxDefault", "reads:hxAll", "reads:hxEquals"], global: ["reads:ambient", "reads:JSON"], local: ["shadows:HyperUnix", "shadows:hxAll", "shadows:JSON", "shadows:hxDefault", "reads:local"] };
const VALUE_TEXT = "const SDK = \"@hyperunix/sdk\";\nconst ALIAS = SDK;\nconst TYPED = \"@hyperunix/sdk\" as const;\nlet MUTABLE = \"@hyperunix/sdk\";\nexport function other(): string[] {\n  const SDK = \"node:path\";\n  return [SDK, ALIAS];\n}\nexport const values = [SDK, ALIAS, TYPED, MUTABLE];\n";
const VALUE_EXPECTED: Record<string, readonly string[]> = { "other:SDK": ["node:path"], "other:ALIAS": ["@hyperunix/sdk"], "values:SDK": ["@hyperunix/sdk"], "values:ALIAS": ["@hyperunix/sdk"], "values:TYPED": ["@hyperunix/sdk"], "values:MUTABLE": [] };
const CHAIN_TEXT = "declare const target: object;\ndeclare const source: object;\nconst O = Object;\nconst KEY = \"assign\";\nO.assign(target, source);\nglobalThis.Object.assign(target, source);\nObject[\"assign\"](target, source);\nObject[KEY](target, source);\nexport function other(): number {\n  const O = Math;\n  return O.max(1, 2);\n}\n";
const CHAIN_EXPECTED: readonly string[] = ["O.assign -> O.assign | Object.assign", "globalThis.Object.assign -> Object.assign", "Object[\"assign\"] -> Object.assign", "Object[KEY] -> Object.assign", "O.max -> O.max | Math.max"];
const PREFILTER_QUIET: readonly string[] = ["export const id = \"hyper-unix.find\";\n", "export const id = \"\\x68yper unix\";\n"];
const FIXTURES: readonly Fixture[] = [
  { key: "K2_CLIENT", value: K2_CLIENT },
  { key: "BINDING_TEXT", value: BINDING_TEXT },
  { key: "BINDING_EXPECTED", value: BINDING_EXPECTED },
  { key: "VALUE_TEXT", value: VALUE_TEXT },
  { key: "VALUE_EXPECTED", value: VALUE_EXPECTED },
  { key: "CHAIN_TEXT", value: CHAIN_TEXT },
  { key: "CHAIN_EXPECTED", value: CHAIN_EXPECTED },
  { key: "PREFILTER_QUIET", value: PREFILTER_QUIET },
];
const REFUSAL_3_LIFECYCLE: readonly LifecycleMember[] = [
  { id: "G10", label: "C2 tamper: JSON.parse forged and restored inside K2 by array-destructuring assignment", edits: [{ anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const realParse = JSON.parse;\n    [JSON.parse] = [(() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse];\n    const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    [JSON.parse] = [realParse];" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
  { id: "G11", label: "C2 tamper: JSON.parse forged and restored inside K2 by object-destructuring assignment", edits: [{ anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const realParse = JSON.parse;\n    ({ parse: JSON.parse } = { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });\n    const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    ({ parse: JSON.parse } = { parse: realParse });" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
  { id: "G12", label: "C2 tamper: JSON.parse forged and restored inside K2 by globalThis.Object.assign", edits: [{ anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const realParse = JSON.parse;\n    globalThis.Object.assign(JSON, { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });\n    const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    globalThis.Object.assign(JSON, { parse: realParse });" }], tampers: ["Object.assign(JSON)", "Object.assign(JSON)"], mocks: [] },
  { id: "G13", label: "C2 tamper: JSON.parse forged and restored inside K2 through a for-of assignment target", edits: [{ anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const realParse = JSON.parse;\n    for (JSON.parse of [(() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse]) break;\n    const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    for (JSON.parse of [realParse]) break;" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
  { id: "G13m", label: "C2 mocks: provider module mock through an extensionless specifier (positive check)", edits: [{ anchor: "function deferred<T>() {", replacement: "vi" + ".mock(\"../src/workbench/providers/hyperunix\", async importOriginal => await importOriginal());\nfunction deferred<T>() {" }], tampers: [], mocks: ["vi" + ".mock(../src/workbench/providers/hyperunix)"] },
  { id: "G12b", label: "C2 tamper: JSON.parse forged and restored inside K2 by Object.assign through a const alias of Object", edits: [{ anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const realParse = JSON.parse;\n    const O = Object;\n    O.assign(JSON, { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });\n    const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    O.assign(JSON, { parse: realParse });" }], tampers: ["Object.assign(JSON)", "Object.assign(JSON)"], mocks: [] },
  { id: "G10x", label: "array-destructuring assignment (forge before the stub line, restore after the provider call; no calibration anchor touched)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realParse = JSON.parse;\n    [JSON.parse] = [(() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse];" }, { anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    [JSON.parse] = [realParse];" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
  { id: "G11x", label: "object-destructuring assignment (forge before the stub line, restore after the provider call; no calibration anchor touched)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realParse = JSON.parse;\n    ({ parse: JSON.parse } = { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });" }, { anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    ({ parse: JSON.parse } = { parse: realParse });" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
  { id: "G12x", label: "globalThis.Object.assign (forge before the stub line, restore after the provider call; no calibration anchor touched)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realParse = JSON.parse;\n    globalThis.Object.assign(JSON, { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });" }, { anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    globalThis.Object.assign(JSON, { parse: realParse });" }], tampers: ["Object.assign(JSON)", "Object.assign(JSON)"], mocks: [] },
  { id: "G12bx", label: "Object.assign through a const alias of Object (forge before the stub line, restore after the provider call; no calibration anchor touched)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realParse = JSON.parse;\n    const O = Object;\n    O.assign(JSON, { parse: (() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse });" }, { anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    O.assign(JSON, { parse: realParse });" }], tampers: ["Object.assign(JSON)", "Object.assign(JSON)"], mocks: [] },
  { id: "G13x", label: "for-of assignment target (forge before the stub line, restore after the provider call; no calibration anchor touched)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realParse = JSON.parse;\n    for (JSON.parse of [(() => ({ source: { status: { exit_code: 3 }, coverage_summary: { licenses_absence: false, completeness: \"incomplete\" } } })) as typeof JSON.parse]) break;" }, { anchor: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");", replacement: "const result = await nativeHyperUnixFind(process.cwd(), \"hx.fs/regular-file\");\n    for (JSON.parse of [realParse]) break;" }], tampers: ["JSON.parse assigned", "JSON.parse assigned"], mocks: [] },
];
const REFUSAL_3_PLANTS: readonly PlantMember[] = [
  { id: "G01", label: "C7 classifier: const-shadowed SDK specifier (dynamic import of a const bound to @hyperunix/sdk; a later same-named const elsewhere)", path: "test/workbench-zz-gp13-plant.test.ts", content: "export async function openSdk(): Promise<unknown> {\n  const SDK = \"@hyperunix/sdk\";\n  return (await import(SDK)).HyperUnix;\n}\nexport function label(): string {\n  const SDK = \"node:path\";\n  return SDK;\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "G01c", label: "control: the same file without the later same-named const", path: "test/workbench-zz-gp13-plant.test.ts", content: "export async function openSdk(): Promise<unknown> {\n  const SDK = \"@hyperunix/sdk\";\n  return (await import(SDK)).HyperUnix;\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "G01r", label: "cause proof: the later same-named const moved before (declaration order)", path: "test/workbench-zz-gp13-plant.test.ts", content: "export function label(): string {\n  const SDK = \"node:path\";\n  return SDK;\n}\nexport async function openSdk(): Promise<unknown> {\n  const SDK = \"@hyperunix/sdk\";\n  return (await import(SDK)).HyperUnix;\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "G02", label: "C7 classifier: const-shadowed HYPERUNIX_HX element key (process.env[KEY] = bin; a later same-named const)", path: "test/workbench-zz-gp13-plant.test.ts", content: "export function useHx(bin: string): void {\n  const KEY = \"HYPERUNIX_HX\";\n  process.env[KEY] = bin;\n}\nexport function home(): string {\n  const KEY = \"HOME\";\n  return process.env[KEY] ?? \"\";\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "G02c", label: "control: without the later same-named const", path: "test/workbench-zz-gp13-plant.test.ts", content: "export function useHx(bin: string): void {\n  const KEY = \"HYPERUNIX_HX\";\n  process.env[KEY] = bin;\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "G03", label: "C7 classifier: const-shadowed hyperunix.find invoke (registry.invoke(ID, ...); a later same-named const)", path: "test/workbench-zz-gp13-plant.test.ts", content: "export async function run(registry: { invoke(id: string, query: unknown, context: unknown): Promise<unknown> }, context: unknown): Promise<unknown> {\n  const ID = \"hyperunix.find\";\n  return registry.invoke(ID, { kind: \"x\" }, context);\n}\nexport function other(): string {\n  const ID = \"rf.read\";\n  return ID;\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["invoke"], shapes: ["F1:member", "F2:member"] },
  { id: "G03c", label: "control: without the later same-named const", path: "test/workbench-zz-gp13-plant.test.ts", content: "export async function run(registry: { invoke(id: string, query: unknown, context: unknown): Promise<unknown> }, context: unknown): Promise<unknown> {\n  const ID = \"hyperunix.find\";\n  return registry.invoke(ID, { kind: \"x\" }, context);\n}\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["invoke"], shapes: ["F1:member", "F2:member"] },
  { id: "G04", label: "C7 classifier: escaped SDK specifier in a value import (\\u0040hyperunix/sdk)", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"\\u0040hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "G05", label: "C7 classifier: relative node_modules path into the SDK package", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"../node_modules/@hyperunix/sdk/dist/index.js\";\nexport const sdk = HyperUnix;\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "G06", label: "C7 F3: su's '-' flag before the user and -c (su - root -c 'ps -p 1')", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"su - root -c 'ps -p 1'\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "G06c", label: "control: su -l root -c 'ps -p 1'", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"su -l root -c 'ps -p 1'\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "G07", label: "C7 F3: env's '-' flag (env - ps -p 1)", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"env - ps -p 1\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "G07c", label: "control: env -i ps -p 1", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"env -i ps -p 1\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "G08", label: "C7 F3: '--' after a shell's command flag (sh -c -- 'ps -p 1')", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"sh -c -- 'ps -p 1'\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "G09", label: "C7 F3 (R-WRAPPER family check): a leading redirection word (>/dev/null ps -p 1)", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\">/dev/null ps -p 1\");\n", prefilter: true, drivers: ["import"], shapes: [] },
  { id: "G09c", label: "control: ps -p 1 >/dev/null", path: "test/workbench-zz-gp13-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"ps -p 1 >/dev/null\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
];
const REFUSAL_4_LIFECYCLE: readonly LifecycleMember[] = [
  { id: "GP4-C2-01", label: "import-binding root shadowed by a same-named local elsewhere (hxSdk.HyperUnix.open written in K2; const hxSdk in a helper)", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport * as hxSdk from \"@hyperunix/sdk\";" }, { anchor: "function deferred<T>() {", replacement: "function hxSdkLabel(): string {\n  const hxSdk = \"label\";\n  return hxSdk;\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realOpen = hxSdk.HyperUnix.open;\n    hxSdk.HyperUnix.open = realOpen;" }], tampers: ["hxSdk.HyperUnix.open assigned"], mocks: [] },
  { id: "GP4-C2-01c", label: "control: the same import-binding write without the shadowing helper", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport * as hxSdk from \"@hyperunix/sdk\";" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realOpen = hxSdk.HyperUnix.open;\n    hxSdk.HyperUnix.open = realOpen;" }], tampers: ["hxSdk.HyperUnix.open assigned"], mocks: [] },
  { id: "GP4-C2-01b", label: "import-binding root (non-BOUND named import nativeReactiveFiberPreview) shadowed by a local parameter elsewhere", edits: [{ anchor: "function deferred<T>() {", replacement: "function rfLabel(nativeReactiveFiberPreview: unknown): unknown {\n  return nativeReactiveFiberPreview;\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (nativeReactiveFiberPreview as unknown as { forged: boolean }).forged = true;" }], tampers: ["nativeReactiveFiberPreview.forged assigned"], mocks: [] },
  { id: "GP4-C2-01bc", label: "control: the same named-import member write without the shadowing parameter", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (nativeReactiveFiberPreview as unknown as { forged: boolean }).forged = true;" }], tampers: ["nativeReactiveFiberPreview.forged assigned"], mocks: [] },
  { id: "GP4-C2-02", label: "let-aliased global root (let json = JSON; json.parse = forged)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    let json = JSON;\n    json.parse = (() => native) as typeof JSON.parse;" }], tampers: ["JSON.parse assigned"], mocks: [] },
  { id: "GP4-C2-03", label: "parameter-aliased global root (patchParse(JSON, forged) writes target.parse)", edits: [{ anchor: "function deferred<T>() {", replacement: "function patchParse(target: { parse: unknown }, value: unknown): void {\n  target.parse = value;\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    patchParse(JSON, (() => native) as typeof JSON.parse);" }], tampers: ["JSON.parse assigned"], mocks: [] },
  { id: "GP4-C2-04", label: "delete of a global member (claim word delete)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    delete (Reflect as unknown as Record<string, unknown>).hxProbe;" }], tampers: ["Reflect.hxProbe deleted"], mocks: [] },
  { id: "GP4-C2-05", label: "update of a global member (claim word update, ++)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (globalThis as unknown as { hxCount: number }).hxCount++;" }], tampers: ["globalThis.hxCount updated"], mocks: [] },
  { id: "GP4-C2-06", label: "logical compound assignment on a global member (JSON.parse &&= forged)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    JSON.parse &&= (() => native) as typeof JSON.parse;" }], tampers: ["JSON.parse assigned"], mocks: [] },
  { id: "GP4-C2-06b", label: "arithmetic compound assignment on a global member ((globalThis as ...).hxCount += 1)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (globalThis as unknown as { hxCount: number }).hxCount += 1;" }], tampers: ["globalThis.hxCount assigned"], mocks: [] },
  { id: "GP4-C2-07", label: "for-in target on a global member (claim word for-in)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    for ((JSON as unknown as { tag: string }).tag in { x: 1 }) break;" }], tampers: ["JSON.tag assigned"], mocks: [] },
  { id: "GP4-C2-08", label: "Reflect.set mutator call on a global (claim word Reflect.set)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Reflect.set(JSON, \"parse\", (() => native) as typeof JSON.parse);" }], tampers: ["Reflect.set(JSON)"], mocks: [] },
  { id: "GP4-C2-09", label: "Object.setPrototypeOf mutator call on a global", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Object.setPrototypeOf(JSON, { parse: () => native });" }], tampers: ["Object.setPrototypeOf(JSON)"], mocks: [] },
  { id: "GP4-C2-09b", label: "Object.defineProperties mutator call on a global", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Object.defineProperties(JSON, { parse: { value: () => native } });" }], tampers: ["Object.defineProperties(JSON)"], mocks: [] },
  { id: "GP4-C2-09c", label: "Reflect.deleteProperty mutator call on a global", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Reflect.deleteProperty(JSON, \"hxProbe\");" }], tampers: ["Reflect.deleteProperty(JSON)"], mocks: [] },
  { id: "GP4-C2-10", label: "WATCHED callee passed as an argument (claim word 'passed as an argument')", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const relay = (f: unknown): unknown => f;\n    relay(Object.assign);" }], tampers: ["Object.assign referenced as a value"], mocks: [] },
  { id: "GP4-C2-11", label: "apply of a WATCHED callee (vi.spyOn.apply)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    vi.spyOn.apply(vi, [JSON, \"parse\"] as never);" }], tampers: ["vi.spyOn referenced as a value"], mocks: [] },
  { id: "GP4-C2-11b", label: "bind of a WATCHED mutator (Object.assign.bind)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Object.assign.bind(null, JSON)({ parse: () => native });" }], tampers: ["Object.assign referenced as a value"], mocks: [] },
  { id: "GP4-C2-12", label: "environment-rooted chain reaching a global prototype (process.env.constructor.prototype.hxForged = true)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (process.env as unknown as { constructor: { prototype: Record<string, unknown> } }).constructor.prototype.hxForged = true;" }], tampers: ["process.env.constructor.prototype.hxForged assigned"], mocks: [] },
  { id: "GP4-C2-12c", label: "control: the same prototype write rooted at Object (Object.prototype.hxForged)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (Object.prototype as unknown as Record<string, unknown>).hxForged = true;" }], tampers: ["Object.prototype.hxForged assigned"], mocks: [] },
  { id: "GP4-C2-13", label: "legacy accessor definer on a global (JSON.__defineGetter__)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (JSON as unknown as { __defineGetter__(name: string, get: () => unknown): void }).__defineGetter__(\"parse\", () => () => native);" }], tampers: ["__defineGetter__(JSON)"], mocks: [] },
  { id: "GP4-C2-14", label: "SDK module mock through a const name declared twice (every value read)", edits: [{ anchor: "function deferred<T>() {", replacement: "function mockSdk(): void {\n  const M = \"@hyperunix/sdk\";\n  vi" + ".mock(M);\n}\nfunction mockLabel(): string {\n  const M = \"label\";\n  return M;\n}\nfunction deferred<T>() {" }], tampers: [], mocks: ["vi" + ".mock(@hyperunix/sdk)"] },
  { id: "GP4-C2-15", label: "SDK module mock through vitest" + ".mock (MODULE_MOCKS on vitest)", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport { vitest } from \"vitest\";" }, { anchor: "function deferred<T>() {", replacement: "vitest" + ".mock(\"@hyperunix/sdk\", async importOriginal => await importOriginal());\nfunction deferred<T>() {" }], tampers: [], mocks: ["vitest" + ".mock(@hyperunix/sdk)"] },
  { id: "GP4-C2-16", label: "vi.stubGlobal call (claim word, no plant)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    vi.stubGlobal(\"hxProbe\", 1);" }], tampers: ["vi.stubGlobal"], mocks: [] },
  { id: "GP4-C2-16b", label: "vi.setSystemTime call (claim word, no plant)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    vi.setSystemTime(0);" }], tampers: ["vi.setSystemTime"], mocks: [] },
  { id: "GP4-C2-17", label: "SDK module mock through vi" + ".doMock with a subpath specifier", edits: [{ anchor: "function deferred<T>() {", replacement: "vi" + ".doMock(\"@hyperunix/sdk/dist/index.js\", async importOriginal => await importOriginal());\nfunction deferred<T>() {" }], tampers: [], mocks: ["vi" + ".doMock(@hyperunix/sdk/dist/index.js)"] },
  { id: "GP4-C2-02b", label: "let-aliased global root, non-colliding name (let jsonAlias = JSON; jsonAlias.parse = forged)", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    let jsonAlias = JSON;\n    jsonAlias.parse = (() => native) as typeof JSON.parse;" }], tampers: ["JSON.parse assigned"], mocks: [] },
  { id: "GP4-C2-01d", label: "SDK namespace import shadowed by a const elsewhere, MUTATORS call on its chain (Object.assign(hxSdk.HyperUnix, ...))", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport * as hxSdk from \"@hyperunix/sdk\";" }, { anchor: "function deferred<T>() {", replacement: "function hxSdkLabel(): string {\n  const hxSdk = \"label\";\n  return hxSdk;\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Object.assign(hxSdk.HyperUnix, { open: hxSdk.HyperUnix.open });" }], tampers: ["Object.assign(hxSdk.HyperUnix)"], mocks: [] },
  { id: "GP4-C2-01dc", label: "control: the same MUTATORS call without the shadowing helper", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport * as hxSdk from \"@hyperunix/sdk\";" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    Object.assign(hxSdk.HyperUnix, { open: hxSdk.HyperUnix.open });" }], tampers: ["Object.assign(hxSdk.HyperUnix)"], mocks: [] },
  { id: "GP4-C2-01e", label: "SDK namespace import shadowed by a catch-clause variable elsewhere (hxSdk.HyperUnix.open written in K2)", edits: [{ anchor: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";", replacement: "import { nativeReactiveFiberPreview } from \"../src/workbench/providers/reactivefiber.js\";\nimport * as hxSdk from \"@hyperunix/sdk\";" }, { anchor: "function deferred<T>() {", replacement: "function hxSdkCatch(): unknown {\n  try {\n    return 1;\n  } catch (hxSdk) {\n    return hxSdk;\n  }\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    const realOpen = hxSdk.HyperUnix.open;\n    hxSdk.HyperUnix.open = realOpen;" }], tampers: ["hxSdk.HyperUnix.open assigned"], mocks: [] },
  { id: "GP4-C2-01f", label: "named import shadowed by a destructured binding elsewhere (registerFurnaceRunInspect member write in K2)", edits: [{ anchor: "function deferred<T>() {", replacement: "function furnaceLabel(): unknown {\n  const { registerFurnaceRunInspect } = { registerFurnaceRunInspect: 1 };\n  return registerFurnaceRunInspect;\n}\nfunction deferred<T>() {" }, { anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (registerFurnaceRunInspect as unknown as { forged: boolean }).forged = true;" }], tampers: ["registerFurnaceRunInspect.forged assigned"], mocks: [] },
  { id: "GP4-C2-01fc", label: "control: the same named-import member write without the shadowing binding", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    (registerFurnaceRunInspect as unknown as { forged: boolean }).forged = true;" }], tampers: ["registerFurnaceRunInspect.forged assigned"], mocks: [] },
  { id: "GP4-C2-03b", label: "parameter-aliased global root via an arrow helper inside K2 ((t => { t.parse = forged })(JSON))", edits: [{ anchor: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };", replacement: "const client = { find: vi.fn().mockResolvedValue(native), runtime: vi.fn().mockResolvedValue({ version: \"0.1.0\", binarySha256: \"abc\" }), dispose: vi.fn(), close: vi.fn().mockResolvedValue(undefined) };\n    ((target: { parse: unknown }) => { target.parse = (() => native) as typeof JSON.parse; })(JSON);" }], tampers: ["JSON.parse assigned"], mocks: [] },
];
const REFUSAL_4_PLANTS: readonly PlantMember[] = [
  { id: "GP4-C7-01", label: "named value re-export of the SDK + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "export { HyperUnix } from \"@hyperunix/sdk\";\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-02", label: "side-effect import of the SDK + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "import \"@hyperunix/sdk\";\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-03", label: "namespace re-export of the SDK + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "export * as sdk from \"@hyperunix/sdk\";\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-04", label: "module.require of the SDK + kill (LOADERS member, no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "declare const module: { require(id: string): unknown };\nexport const sdk = module.require(\"@hyperunix/sdk\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-05", label: "optional-call require of the SDK + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "declare const require: ((id: string) => unknown) | undefined;\nexport const sdk = require?.(\"@hyperunix/sdk\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-06", label: "created require bound to a const (const load = createRequire(...); load(SDK)) + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { createRequire } from \"node:module\";\nconst load = createRequire(import.meta.url);\nexport const sdk = load(\"@hyperunix/sdk\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-06c", label: "control: created require bound to the name require", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { createRequire } from \"node:module\";\nconst require = createRequire(import.meta.url);\nexport const sdk = require(\"@hyperunix/sdk\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-07", label: "Object.hasOwn override + kill (ENV_CALLS member, no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "export const set = Object.hasOwn(process.env, \"HYPERUNIX_HX\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-08", label: "destructuring key override with a default + kill (no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "const { HYPERUNIX_HX: hx = \"\" } = process.env;\nexport const bin = hx;\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-09", label: "destructuring-assignment key override + kill (no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "let hx: string | undefined;\n({ HYPERUNIX_HX: hx } = process.env);\nexport const bin = (): string | undefined => hx;\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-10", label: "ENV_METHODS override (process.env.hasOwnProperty) + kill (no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "export const set = process.env.hasOwnProperty(\"HYPERUNIX_HX\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["override"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-10b", label: "ENV_METHODS override via Object.prototype.hasOwnProperty.call (R-DATA-OVERRIDE/R-INDIRECT reading) + kill", path: "test/workbench-zz-gp4-plant.test.ts", content: "export const set = Object.prototype.hasOwnProperty.call(process.env, \"HYPERUNIX_HX\");\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: [], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-11", label: "F1 kill imported from node:process (claim form 'imported', no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { kill } from \"node:process\";\nexport const probe = (id: number): boolean => kill(id, 0);\n", prefilter: true, drivers: ["import"], shapes: ["F1:bare call", "F1:import"] },
  { id: "GP4-C7-11b", label: "F1 kill imported under an alias (import { kill as signal })", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { kill as signal } from \"node:process\";\nexport const probe = (id: number): boolean => signal(id, 0);\n", prefilter: true, drivers: ["import"], shapes: ["F1:import"] },
  { id: "GP4-C7-12", label: "F2 pid name literal only (claim form the literal pid, no plant)", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const field = (child: Record<string, number>): number | undefined => child[\"p\" + \"id\"] ?? Reflect.get(child, \"pid\");\n", prefilter: true, drivers: ["import"], shapes: ["F2:pid name literal"] },
  { id: "GP4-C7-13", label: "F3 wrapped tool in a template tail after a substitution", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (secs: number): Buffer => execSync(`timeout $" + "{secs} pgrep hx`);\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "GP4-C7-14", label: "F4 ESRCH in a template part", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const gone = (code: string): string => `$" + "{code}: ESRCH`;\n", prefilter: true, drivers: ["import"], shapes: ["F4:literal"] },
  { id: "GP4-C7-15", label: "judged qa .mjs file (SDK import + kill)", path: "qa/workbench/zz-gp4-plant.mjs", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const alive = child => { process.kill(child.pid, 0); return true; };\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-16", label: "judged nested .cts file under test/fixtures (SDK import + kill)", path: "test/fixtures/zz-gp4/plant.cts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const alive = (child: { pid: number }): boolean => {\n  process.kill(child.pid, 0);\n  return true;\n};\n", prefilter: true, drivers: ["import"], shapes: ["F1:member", "F2:member"] },
  { id: "GP4-C7-17", label: "F1 kill member on an HX-observer re-export file (export * from observer + kill)", path: "test/workbench-zz-gp4-plant.test.ts", content: "export * from \"../src/workbench/hyperunix-observer.js\";\nexport const stop = (child: { kill(signal: string): void }): void => child.kill(\"SIGTERM\");\n", prefilter: true, drivers: ["import"], shapes: ["F1:member"] },
  { id: "GP4-C7-18", label: "F3 command inside a shell -lc combined flag", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"bash -lc 'pkill -0 hx'\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
  { id: "GP4-C7-19", label: "F3 nohup + VAR=value before the tool", path: "test/workbench-zz-gp4-plant.test.ts", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"LC_ALL=C nohup pidof hx\");\n", prefilter: true, drivers: ["import"], shapes: ["F3:process-table command"] },
];
const OUT_OF_SCOPE: readonly ScopeEntry[] = [
  { id: "G14", why: "C8 docs view: a bdo element laid out right to left" },
  { id: "G14c", why: "C8 docs view: the control of G14" },
  { id: "G15", why: "C8 docs view: an abbreviation read as a sentence end" },
  { id: "G15c", why: "C8 docs view: the control of G15" },
  { id: "G16", why: "C8 docs view: a raw run of right-to-left controls" },
  { id: "G17", why: "C4 vocabulary: a regular-expression character class splitting a term" },
  { id: "G17c", why: "C4 vocabulary: the control of G17" },
];
const RH: readonly RhRow[] = [
  { id: "RH1", word: "delete", forms: ["C2 delete"] },
  { id: "RH2", word: "update", forms: ["C2 update"] },
  { id: "RH3", word: "compound operator", forms: ["C2 compound operator"] },
  { id: "RH4", word: "for-in", forms: ["C2 for-in target"] },
  { id: "RH5", word: "the literal \"pid\"", forms: ["shape pid name literal"] },
  { id: "RH6", word: "kill imported", forms: ["shape import"] },
  { id: "RH7", word: "ENV_METHODS", forms: ["driver override env method"] },
  { id: "RH8", word: "destructuring or destructuring-assignment override keys", forms: ["driver override destructuring", "driver override destructuring assignment"] },
  { id: "RH9", word: "side-effect import", forms: ["driver side-effect import"] },
];
const REQUIREMENTS: readonly Requirement[] = [
  { key: "U1", source: "description", text: "U1 C7 driver const-binding resolution: constStrings keeps the LAST same-named const file-wide; a const-bound HX specifier, HYPERUNIX_HX key or hyperunix.find id must resolve its OWN binding (falsifier: a later same-named const; controls 1|43 vs 0|44)." },
  { key: "U2", source: "description", text: "U2 C7 F3 wrapper flag forms: su/env lone-dash and the other wrapper flag spellings the driver classifier must read." },
  { key: "U3", source: "description", text: "U3 C2 tamper by destructuring assignment: a destructuring-assignment forging K2 must be read as tamper (claims 0|44, narrow 0|61, run pin 0|5)." },
  { key: "U4", source: "description", text: "U4 C7 title-vs-needle alignment per the refusal's graded list." },
  { key: "ACCEPTANCE", source: "description", text: "Acceptance: each gate-authored plant above reds the unmodified census and greens under the cure; the claim text and reader forms agree byte-for-byte with the falsifier roster." },
  { key: "R-B98 U1", source: "notes", text: "U1 C2 import-binding shadow resolution: a chain rooted at an import binding must resolve to the IMPORT binding even when a same-named local shadows it elsewhere (five gate members over four shadow forms and two write forms; unshadowed controls red 5|40)." },
  { key: "R-B98 U2", source: "notes", text: "U2 nine claim words without reader falsifiers: delete, update, compound operator, for-in, and the remaining five words of refusal #4's list - each claim word gets a reader-hollowing falsifier that reds when its reader branch is removed." },
];
const C2_PLANTS: readonly C2Plant[] = [
  { word: "spy", line: "vi.spyOn(JSON, \"parse\");", tampers: ["vi.spyOn(JSON)"] },
  { word: "global stub", line: "vi.stubGlobal(\"hxForged\", true);", tampers: ["vi.stubGlobal"] },
  { word: "watched reference", line: "const assignAlias = Object.assign;", tampers: ["Object.assign referenced as a value"] },
  { word: "destructured watched", line: "const { assign: assignFrom } = Object;", tampers: ["Object.assign referenced as a value"] },
  { word: "destructuring-assigned watched", line: "let assignTo: unknown; ({ assign: assignTo } = Object);", tampers: ["Object.assign referenced as a value"] },
  { word: "assignment", line: "(JSON as unknown as { hxTag?: string }).hxTag = \"forged\";", tampers: ["JSON.hxTag assigned"] },
  { word: "compound operator", line: "(JSON as unknown as { hxCount: number }).hxCount += 1;", tampers: ["JSON.hxCount assigned"] },
  { word: "for-of target", line: "for ((JSON as unknown as { hxTag?: string }).hxTag of [\"forged\"]) break;", tampers: ["JSON.hxTag assigned"] },
  { word: "for-in target", line: "for ((JSON as unknown as { hxTag?: string }).hxTag in { forged: true }) break;", tampers: ["JSON.hxTag assigned"] },
  { word: "delete", line: "delete (JSON as unknown as { hxTag?: string }).hxTag;", tampers: ["JSON.hxTag deleted"] },
  { word: "update", line: "(JSON as unknown as { hxCount: number }).hxCount++;", tampers: ["JSON.hxCount updated"] },
  { word: "mutator call", line: "Reflect.set(JSON, \"hxTag\", \"forged\");", tampers: ["Reflect.set(JSON)"] },
  { word: "legacy accessor definer", line: "(JSON as unknown as { __defineGetter__(name: string, get: () => unknown): void }).__defineGetter__(\"hxTag\", () => \"forged\");", tampers: ["__defineGetter__(JSON)"] },
];
const DRIVER_PLANTS: readonly DriverPlant[] = [
  { word: "value import", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\n" },
  { word: "side-effect import", content: "import \"@hyperunix/sdk\";\n" },
  { word: "export-from", content: "export { HyperUnix } from \"@hyperunix/sdk\";\nexport * as hx from \"@hyperunix/sdk\";\n" },
  { word: "import-equals", content: "import hx = require(\"@hyperunix/sdk\");\nexport const sdk = hx;\n" },
  { word: "dynamic import", content: "export const load = (): Promise<unknown> => import(\"@hyperunix/sdk\");\n" },
  { word: "loader call", content: "export const sdk: unknown = require(\"@hyperunix/sdk\");\n" },
  { word: "created require", content: "import { createRequire } from \"node:module\";\nconst load = createRequire(import.meta.url);\nexport const sdk: unknown = load(\"@hyperunix/sdk\");\n" },
  { word: "invoke", content: "declare const registry: { invoke(id: string, input: unknown): unknown };\nexport const found = registry.invoke(\"hyperunix.find\", {});\n" },
  { word: "override member", content: "export const bin = process.env.HYPERUNIX_HX;\n" },
  { word: "override destructuring", content: "const { HYPERUNIX_HX: bin } = process.env;\nexport { bin };\n" },
  { word: "override destructuring assignment", content: "let bin: string | undefined;\n({ HYPERUNIX_HX: bin } = process.env);\nexport { bin };\n" },
  { word: "override object key", content: "export const env = { HYPERUNIX_HX: \"/usr/local/bin/hx\" };\n" },
  { word: "override in", content: "export const set = \"HYPERUNIX_HX\" in process.env;\n" },
  { word: "override env call", content: "export const set = Reflect.has(process.env, \"HYPERUNIX_HX\");\n" },
  { word: "override env method", content: "export const set = process.env.hasOwnProperty(\"HYPERUNIX_HX\");\n" },
];
const SHAPE_PLANTS: readonly ShapePlant[] = [
  { word: "member", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const stop = (child: { kill(): void }): void => child.kill();\n", shapes: ["F1:member"] },
  { word: "element key", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const stop = (child: Record<string, () => void>): void => child[\"kill\"]?.();\n", shapes: ["F1:element key"] },
  { word: "type member", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport type Kill = typeof process.kill;\n", shapes: ["F1:type member"] },
  { word: "destructuring", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nconst { kill: stopIt } = process;\nexport { stopIt };\n", shapes: ["F1:destructuring"] },
  { word: "destructuring assignment", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nlet stopIt: unknown;\n({ kill: stopIt } = process);\nexport { stopIt };\n", shapes: ["F1:destructuring assignment"] },
  { word: "import", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { kill as signal } from \"node:process\";\nexport { signal };\n", shapes: ["F1:import"] },
  { word: "bare call", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\ndeclare function kill(pid: number, signal: number): boolean;\nexport const probe = (id: number): boolean => kill(id, 0);\n", shapes: ["F1:bare call"] },
  { word: "identifier", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const ESRCH_CODE = 3;\n", shapes: ["F4:identifier"] },
  { word: "regular expression", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const gone = /esrch/i;\n", shapes: ["F4:regular expression"] },
  { word: "key", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const codes = { \"ESRCH\": 3 };\n", shapes: ["F4:key"] },
  { word: "literal", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const message = \"no such process (ESRCH)\";\n", shapes: ["F4:literal"] },
  { word: "/proc path", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const status = \"/proc/1/status\";\n", shapes: ["F3:/proc path"] },
  { word: "kill name literal", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const verb = \"kill\";\n", shapes: ["F1:kill name literal"] },
  { word: "pid name literal", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const field = \"pid\";\n", shapes: ["F2:pid name literal"] },
  { word: "process-table command", content: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const probe = \"ps -p 1\";\n", shapes: ["F3:process-table command"] },
];
const ROOT_PLANTS: readonly RootPlant[] = [
  { word: "initializer", text: "declare const forged: unknown;\nconst jsonRef = JSON;\njsonRef.parse = forged;\n", chain: "JSON.parse" },
  { word: "reassignment", text: "declare const forged: unknown;\nlet jsonRef: { parse: unknown } | undefined;\njsonRef = JSON;\njsonRef.parse = forged;\n", chain: "JSON.parse" },
  { word: "destructured", text: "import * as hxSdk from \"@hyperunix/sdk\";\ndeclare const forged: unknown;\nconst { HyperUnix: hx } = hxSdk;\nhx.open = forged;\n", chain: "hxSdk.HyperUnix.open" },
  { word: "for-of element", text: "declare const forged: unknown;\nfor (const target of [JSON]) target.parse = forged;\n", chain: "JSON.parse" },
  { word: "parameter default", text: "declare const forged: unknown;\nexport function patch(target = JSON): void {\n  target.parse = forged;\n}\n", chain: "JSON.parse" },
  { word: "call argument", text: "declare const forged: unknown;\nfunction patch(target: { parse: unknown }): void {\n  target.parse = forged;\n}\npatch(JSON);\n", chain: "JSON.parse" },
  { word: "immediately invoked", text: "declare const forged: unknown;\n((target: { parse: unknown }) => {\n  target.parse = forged;\n})(JSON);\n", chain: "JSON.parse" },
  { word: "call() argument", text: "declare const forged: unknown;\nfunction patch(target: { parse: unknown }): void {\n  target.parse = forged;\n}\npatch.call(undefined, JSON);\n", chain: "JSON.parse" },
];
const FLAG_ROWS: readonly FlagRow[] = [
  { word: "lone dash", pins: [{ text: "su - root -c 'ps -p 1'", heads: ["ps"] }, { text: "env - ps -p 1", heads: ["ps"] }] },
  { word: "options end", pins: [{ text: "sudo -- -x", heads: ["-x"] }, { text: "env -- -i", heads: ["-i"] }] },
  { word: "option argument", pins: [{ text: "sudo -u root ps -p 1", heads: ["ps"] }, { text: "timeout -s TERM 5 ps -p 1", heads: ["ps"] }] },
  { word: "attached argument", pins: [{ text: "sudo -uroot ps -p 1", heads: ["ps"] }, { text: "timeout -sTERM 5 ps -p 1", heads: ["ps"] }] },
  { word: "long value", pins: [{ text: "sudo --user=root ps -p 1", heads: ["ps"] }, { text: "timeout --signal=TERM 5 ps -p 1", heads: ["ps"] }] },
  { word: "short cluster", pins: [{ text: "su -lc 'ps -p 1'", heads: ["ps"] }, { text: "su -mlc 'ps -p 1' root", heads: ["ps"] }] },
  { word: "command option", pins: [{ text: "su root -c 'ps -p 1'", heads: ["ps"] }, { text: "env -S 'ps -p 1'", heads: ["ps"] }, { text: "env --split-string='ps -p 1'", heads: ["ps"] }] },
  { word: "shell command flag", pins: [{ text: "bash -lc 'ps -p 1'", heads: ["ps"] }, { text: "fish --command='ps -p 1'", heads: ["ps"] }, { text: "sh -c -e 'ps -p 1'", heads: ["ps"] }, { text: "sh -c 'echo ready' ps", heads: ["echo"] }] },
  { word: "shell options end", pins: [{ text: "sh -c -- '-x'", heads: ["-x"] }, { text: "sh -c - '-x'", heads: ["-x"] }] },
  { word: "shell option argument", pins: [{ text: "bash -o pipefail -c 'ps -p 1'", heads: ["ps"] }, { text: "bash --rcfile /dev/null -c 'ps -p 1'", heads: ["ps"] }] },
];
const PRECISION: readonly PrecisionRow[] = [
  { id: "P-SPECIFIER", answers: "HX specifier", content: "export async function load(): Promise<unknown> {\n  const SDK = \"node:path\";\n  return import(SDK);\n}\nexport function label(): string {\n  const SDK = \"@hyperunix/sdk\";\n  return SDK;\n}\n", control: "export async function load(): Promise<unknown> {\n  const SDK = \"@hyperunix/sdk\";\n  return import(SDK);\n}\nexport function label(): string {\n  const SDK = \"node:path\";\n  return SDK;\n}\n", controlDrivers: ["import"] },
  { id: "P-OVERRIDE", answers: "HYPERUNIX_HX key", content: "export function home(bin: string): void {\n  const KEY = \"HOME\";\n  process.env[KEY] = bin;\n}\nexport function label(): string {\n  const KEY = \"HYPERUNIX_HX\";\n  return KEY;\n}\n", control: "export function home(bin: string): void {\n  const KEY = \"HYPERUNIX_HX\";\n  process.env[KEY] = bin;\n}\nexport function label(): string {\n  const KEY = \"HOME\";\n  return KEY;\n}\n", controlDrivers: ["override"] },
  { id: "P-INVOKE", answers: "hyperunix.find id", content: "declare const registry: { invoke(id: string, input: unknown): unknown };\nexport function read(): unknown {\n  const ID = \"rf.read\";\n  return registry.invoke(ID, {});\n}\nexport function label(): string {\n  const ID = \"hyperunix.find\";\n  return ID;\n}\n", control: "declare const registry: { invoke(id: string, input: unknown): unknown };\nexport function read(): unknown {\n  const ID = \"hyperunix.find\";\n  return registry.invoke(ID, {});\n}\nexport function label(): string {\n  const ID = \"rf.read\";\n  return ID;\n}\n", controlDrivers: ["invoke"] },
];
const PREFILTER: readonly PrefilterRow[] = [
  { word: "hex escape", text: "import \"@\\x68yperunix/sdk\";\n" },
  { word: "unicode escape", text: "import \"@hyper\\u0075nix/sdk\";\n" },
  { word: "braced unicode escape", text: "import \"@hyper\\u{75}nix/sdk\";\n" },
  { word: "legacy octal escape", text: "export const id = \"\\150yperunix.find\";\n" },
  { word: "line continuation", text: "export const id = \"hyper\\\nunix.find\";\n" },
  { word: "escaped character", text: "export const id = \"hyp\\erunix.find\";\n" },
  { word: "percent escape", text: "import \"../src/workbench/providers/%68yperunix.js\";\n" },
];
const RESIDUAL_ROWS: readonly ResidualRow[] = [
  { id: "R-WRAPPER", pins: [{ reading: "shapes", quiet: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\">/dev/null ps -p 1\");\n", loud: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nimport { execSync } from \"node:child_process\";\nexport const probe = (): Buffer => execSync(\"ps -p 1 >/dev/null\");\n", loudReading: ["F3:process-table command"] }, { reading: "shapes", quiet: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const probe = \"perl -e 'kill 0, 1'\";\n", loud: "import { HyperUnix } from \"@hyperunix/sdk\";\nexport const sdk = HyperUnix;\nexport const probe = \"sh -c 'kill -0 1'\";\n", loudReading: ["F3:process-table command"] }] },
  { id: "R-INDIRECT", pins: [{ reading: "drivers", quiet: "export const set = Object.prototype.hasOwnProperty.call(process.env, \"HYPERUNIX_HX\");\n", loud: "export const set = process.env.hasOwnProperty(\"HYPERUNIX_HX\");\n", loudReading: ["override"] }, { reading: "drivers", quiet: "let SDK = \"@hyperunix/sdk\";\nexport const load = (): Promise<unknown> => import(SDK);\n", loud: "const SDK = \"@hyperunix/sdk\";\nexport const load = (): Promise<unknown> => import(SDK);\n", loudReading: ["import"] }] },
  { id: "R-FLOW", pins: [{ reading: "tampers", quiet: "[JSON].forEach((target: { parse: unknown }) => { target.parse = null; });", loud: "((target: { parse: unknown }) => { target.parse = null; })(JSON);", loudReading: ["JSON.parse assigned"] }, { reading: "tampers", quiet: "try { throw JSON; } catch (caught) { (caught as { parse: unknown }).parse = null; }", loud: "const caught = JSON; (caught as { parse: unknown }).parse = null;", loudReading: ["JSON.parse assigned"] }] },
];
/** Every table row as table:id:digest (digest: sha-256 of the row's JSON, 12 hex). */
const FROZEN: readonly string[] = [
  "REFUSAL_3_LIFECYCLE:G10:15823fdd120c",
  "REFUSAL_3_LIFECYCLE:G11:95978e8d97f0",
  "REFUSAL_3_LIFECYCLE:G12:9b0a42e7a385",
  "REFUSAL_3_LIFECYCLE:G13:a49fb8bef979",
  "REFUSAL_3_LIFECYCLE:G13m:0f8e35d27618",
  "REFUSAL_3_LIFECYCLE:G12b:d58a4595c4c1",
  "REFUSAL_3_LIFECYCLE:G10x:42fc8f069a96",
  "REFUSAL_3_LIFECYCLE:G11x:e42c78538b8f",
  "REFUSAL_3_LIFECYCLE:G12x:4ca5a88d99f3",
  "REFUSAL_3_LIFECYCLE:G12bx:c0eb1141967a",
  "REFUSAL_3_LIFECYCLE:G13x:92f85bf05681",
  "REFUSAL_3_PLANTS:G01:6ae1c7902257",
  "REFUSAL_3_PLANTS:G01c:0d2d8db62517",
  "REFUSAL_3_PLANTS:G01r:cea35256b76c",
  "REFUSAL_3_PLANTS:G02:2fa07a722dea",
  "REFUSAL_3_PLANTS:G02c:4f7318aaebd6",
  "REFUSAL_3_PLANTS:G03:fa03bc84b0a7",
  "REFUSAL_3_PLANTS:G03c:12d86aa310b5",
  "REFUSAL_3_PLANTS:G04:998ed868c323",
  "REFUSAL_3_PLANTS:G05:5a5548538f84",
  "REFUSAL_3_PLANTS:G06:43fd7d7056e2",
  "REFUSAL_3_PLANTS:G06c:7cbd9e299b6d",
  "REFUSAL_3_PLANTS:G07:78aaac157443",
  "REFUSAL_3_PLANTS:G07c:49da27e67401",
  "REFUSAL_3_PLANTS:G08:fd1ab4d5938f",
  "REFUSAL_3_PLANTS:G09:642e008e6517",
  "REFUSAL_3_PLANTS:G09c:08799feacc7b",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01:4bca818eedf1",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01c:1e83e6636eb1",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01b:c5808742b413",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01bc:708849ce5053",
  "REFUSAL_4_LIFECYCLE:GP4-C2-02:699be1cd9223",
  "REFUSAL_4_LIFECYCLE:GP4-C2-03:6eb308e339ec",
  "REFUSAL_4_LIFECYCLE:GP4-C2-04:3eb3e5f1925b",
  "REFUSAL_4_LIFECYCLE:GP4-C2-05:632628fcc642",
  "REFUSAL_4_LIFECYCLE:GP4-C2-06:3a47ab6d45ea",
  "REFUSAL_4_LIFECYCLE:GP4-C2-06b:35eb9b0236aa",
  "REFUSAL_4_LIFECYCLE:GP4-C2-07:3e6c935b8eaa",
  "REFUSAL_4_LIFECYCLE:GP4-C2-08:947c624f43b3",
  "REFUSAL_4_LIFECYCLE:GP4-C2-09:7648f2431cfd",
  "REFUSAL_4_LIFECYCLE:GP4-C2-09b:73ef5289d847",
  "REFUSAL_4_LIFECYCLE:GP4-C2-09c:f90c34c279c2",
  "REFUSAL_4_LIFECYCLE:GP4-C2-10:f59ed5698465",
  "REFUSAL_4_LIFECYCLE:GP4-C2-11:392c09f194a6",
  "REFUSAL_4_LIFECYCLE:GP4-C2-11b:817baff1292f",
  "REFUSAL_4_LIFECYCLE:GP4-C2-12:d1b30bcab0d4",
  "REFUSAL_4_LIFECYCLE:GP4-C2-12c:0596f0f51844",
  "REFUSAL_4_LIFECYCLE:GP4-C2-13:7513ba08ce6c",
  "REFUSAL_4_LIFECYCLE:GP4-C2-14:e8fffd73f929",
  "REFUSAL_4_LIFECYCLE:GP4-C2-15:32e00d12c4a9",
  "REFUSAL_4_LIFECYCLE:GP4-C2-16:10dad6392281",
  "REFUSAL_4_LIFECYCLE:GP4-C2-16b:c09579b5f8a6",
  "REFUSAL_4_LIFECYCLE:GP4-C2-17:3e7d84e29793",
  "REFUSAL_4_LIFECYCLE:GP4-C2-02b:1d6ff37fc0ed",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01d:f2c576cd0c0d",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01dc:86c6cc8e2c16",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01e:1ee16b0b45f1",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01f:9f6dcc66749b",
  "REFUSAL_4_LIFECYCLE:GP4-C2-01fc:6b6a938ed269",
  "REFUSAL_4_LIFECYCLE:GP4-C2-03b:7e8372e5c2eb",
  "REFUSAL_4_PLANTS:GP4-C7-01:5a906e61a840",
  "REFUSAL_4_PLANTS:GP4-C7-02:e2acc4a729d9",
  "REFUSAL_4_PLANTS:GP4-C7-03:9a2f7b3fdc49",
  "REFUSAL_4_PLANTS:GP4-C7-04:6d2884ba9b67",
  "REFUSAL_4_PLANTS:GP4-C7-05:d2ff89fdf176",
  "REFUSAL_4_PLANTS:GP4-C7-06:916ec8385b3e",
  "REFUSAL_4_PLANTS:GP4-C7-06c:63bd17e48ca1",
  "REFUSAL_4_PLANTS:GP4-C7-07:daa7fd063dfd",
  "REFUSAL_4_PLANTS:GP4-C7-08:465b46759d93",
  "REFUSAL_4_PLANTS:GP4-C7-09:7d1b891d34f2",
  "REFUSAL_4_PLANTS:GP4-C7-10:25bf15712744",
  "REFUSAL_4_PLANTS:GP4-C7-10b:095b8eb55f30",
  "REFUSAL_4_PLANTS:GP4-C7-11:343581cde9d8",
  "REFUSAL_4_PLANTS:GP4-C7-11b:f8cd48a0abb8",
  "REFUSAL_4_PLANTS:GP4-C7-12:407943279408",
  "REFUSAL_4_PLANTS:GP4-C7-13:13962cd73e03",
  "REFUSAL_4_PLANTS:GP4-C7-14:bcac54aed343",
  "REFUSAL_4_PLANTS:GP4-C7-15:eba6c77a0320",
  "REFUSAL_4_PLANTS:GP4-C7-16:4deedcb26c84",
  "REFUSAL_4_PLANTS:GP4-C7-17:55b151be72e4",
  "REFUSAL_4_PLANTS:GP4-C7-18:24567947caf8",
  "REFUSAL_4_PLANTS:GP4-C7-19:39e73ff67091",
  "OUT_OF_SCOPE:G14:386a7d00e009",
  "OUT_OF_SCOPE:G14c:8e44ded51a76",
  "OUT_OF_SCOPE:G15:538ecf80a247",
  "OUT_OF_SCOPE:G15c:b8f55ca0088c",
  "OUT_OF_SCOPE:G16:285a0f312a61",
  "OUT_OF_SCOPE:G17:0dd336a85f10",
  "OUT_OF_SCOPE:G17c:6c6341a58ef9",
  "RH:RH1:e274bb44fef4",
  "RH:RH2:c72944e4d0dd",
  "RH:RH3:ead6551df499",
  "RH:RH4:248abb7e74fa",
  "RH:RH5:1892d094dc60",
  "RH:RH6:dc27d87433b7",
  "RH:RH7:af385e20f41e",
  "RH:RH8:4ae8acc91017",
  "RH:RH9:f42f4a0f19bc",
  "REQUIREMENTS:U1:3fecb173c0c9",
  "REQUIREMENTS:U2:d8d00599c6ca",
  "REQUIREMENTS:U3:8818ceadf403",
  "REQUIREMENTS:U4:3c8a74061ddf",
  "REQUIREMENTS:ACCEPTANCE:cf8433428c3c",
  "REQUIREMENTS:R-B98 U1:b8f0fd8d7471",
  "REQUIREMENTS:R-B98 U2:47f182acc1bc",
  "C2_PLANTS:spy:00555c78697e",
  "C2_PLANTS:global stub:662c688252d1",
  "C2_PLANTS:watched reference:9cbd79de236c",
  "C2_PLANTS:destructured watched:1c3fc5de36cb",
  "C2_PLANTS:destructuring-assigned watched:950097db5e99",
  "C2_PLANTS:assignment:db20f1e62205",
  "C2_PLANTS:compound operator:e3ad95dfefaa",
  "C2_PLANTS:for-of target:ce231d6e32e7",
  "C2_PLANTS:for-in target:2dc0740a2482",
  "C2_PLANTS:delete:5c0bdd74c31a",
  "C2_PLANTS:update:c9e26a091797",
  "C2_PLANTS:mutator call:158e141eb549",
  "C2_PLANTS:legacy accessor definer:bde47b3b2e0f",
  "DRIVER_PLANTS:value import:c4f1db746f2e",
  "DRIVER_PLANTS:side-effect import:b0ce926efdf3",
  "DRIVER_PLANTS:export-from:5a1fe4e5f959",
  "DRIVER_PLANTS:import-equals:65a45591b582",
  "DRIVER_PLANTS:dynamic import:a8512ee254f2",
  "DRIVER_PLANTS:loader call:d009b5e1bfd8",
  "DRIVER_PLANTS:created require:de7743c0cb7e",
  "DRIVER_PLANTS:invoke:4a8048396a35",
  "DRIVER_PLANTS:override member:06e0ac47b2af",
  "DRIVER_PLANTS:override destructuring:6c2477c4f0a7",
  "DRIVER_PLANTS:override destructuring assignment:6378c8877450",
  "DRIVER_PLANTS:override object key:aca954244483",
  "DRIVER_PLANTS:override in:9b9449f99a75",
  "DRIVER_PLANTS:override env call:13954433b5b5",
  "DRIVER_PLANTS:override env method:6b54a21ebee0",
  "SHAPE_PLANTS:member:a42e792d4792",
  "SHAPE_PLANTS:element key:74d6fd6c9af2",
  "SHAPE_PLANTS:type member:ffaec8640b1f",
  "SHAPE_PLANTS:destructuring:d80230f8a1d5",
  "SHAPE_PLANTS:destructuring assignment:01251e4cba9e",
  "SHAPE_PLANTS:import:3142b1439f12",
  "SHAPE_PLANTS:bare call:a5999c926fb4",
  "SHAPE_PLANTS:identifier:1161bb954253",
  "SHAPE_PLANTS:regular expression:671c85f46d12",
  "SHAPE_PLANTS:key:60051848f29e",
  "SHAPE_PLANTS:literal:0242920789a5",
  "SHAPE_PLANTS:/proc path:2613a91c6559",
  "SHAPE_PLANTS:kill name literal:ce096e48d49c",
  "SHAPE_PLANTS:pid name literal:4c67ba04892f",
  "SHAPE_PLANTS:process-table command:816529109256",
  "ROOT_PLANTS:initializer:c4f3514a4e04",
  "ROOT_PLANTS:reassignment:2cd477d6a162",
  "ROOT_PLANTS:destructured:98dc01956285",
  "ROOT_PLANTS:for-of element:dd88b5bccbcb",
  "ROOT_PLANTS:parameter default:ce0efd9371a4",
  "ROOT_PLANTS:call argument:48a08a3ec76b",
  "ROOT_PLANTS:immediately invoked:036bf67d097a",
  "ROOT_PLANTS:call() argument:0ae14578e186",
  "FLAG_ROWS:lone dash:1b15ef7a2c67",
  "FLAG_ROWS:options end:8b6cadfa90c4",
  "FLAG_ROWS:option argument:63e2c53eb154",
  "FLAG_ROWS:attached argument:e29da13300c0",
  "FLAG_ROWS:long value:da22e6e47f98",
  "FLAG_ROWS:short cluster:43edc6799f31",
  "FLAG_ROWS:command option:f29023385169",
  "FLAG_ROWS:shell command flag:7f9aef12ce99",
  "FLAG_ROWS:shell options end:1ac0cbc54286",
  "FLAG_ROWS:shell option argument:4bc405ba3d16",
  "PRECISION:P-SPECIFIER:79e015f0dca1",
  "PRECISION:P-OVERRIDE:4098d777474d",
  "PRECISION:P-INVOKE:03aeeeef210d",
  "PREFILTER:hex escape:845ceeecbd9a",
  "PREFILTER:unicode escape:571448af9067",
  "PREFILTER:braced unicode escape:251294d7d07f",
  "PREFILTER:legacy octal escape:d635b2c74a38",
  "PREFILTER:line continuation:1614dc7ecfeb",
  "PREFILTER:escaped character:5b7e452d14b2",
  "PREFILTER:percent escape:80538b661648",
  "RESIDUAL_ROWS:R-WRAPPER:b8ee5916a291",
  "RESIDUAL_ROWS:R-INDIRECT:6edf9c46f10b",
  "RESIDUAL_ROWS:R-FLOW:78b820c4dd41",
  "FIXTURES:K2_CLIENT:f9c379c02ae8",
  "FIXTURES:BINDING_TEXT:851cd67c80de",
  "FIXTURES:BINDING_EXPECTED:cddcd9a88426",
  "FIXTURES:VALUE_TEXT:288a6b4d5b58",
  "FIXTURES:VALUE_EXPECTED:23041af8a9cc",
  "FIXTURES:CHAIN_TEXT:d35eab25f7c3",
  "FIXTURES:CHAIN_EXPECTED:b454dbfe418f",
  "FIXTURES:PREFILTER_QUIET:b8d6d4481aca",
];

// ---- rows -------------------------------------------------------------------------------------------------------------

describe(SUITE, () => {
  describe("GATE: refusal #3 (gate-prep-13, g10-gate-s139, M:34363), the members of the description's U1-U4, replayed verbatim", () => {
    it("the base lifecycle file reads no tamper and only its own module mock", () => {
      BASE ??= parseText(LIFECYCLE, read(LIFECYCLE));
      expect({ tampers: tampersIn(BASE), mocks: mocksOf(BASE) }).toStrictEqual({ tampers: [], mocks: [BASE_MOCK] });
    });
    it.each(REFUSAL_3_LIFECYCLE.map(member => [member.id, member] as const))("%s reads as pinned", (_id, member) => {
      expect(lifecycleReading(member.edits)).toStrictEqual({ tampers: member.tampers, mocks: member.mocks });
    });
    it.each(REFUSAL_3_PLANTS.map(member => [member.id, member] as const))("%s reads as pinned", (_id, member) => {
      expect(plantReading(member.path, member.content)).toStrictEqual({ prefilter: member.prefilter, drivers: member.drivers, shapes: member.shapes });
    });
  });
  describe("GATE: refusal #4 (gate-prep-4, g10-gate-s144, M:35515), the members of R-B98's U1 and U2 and the riders F1-F6, replayed verbatim", () => {
    it.each(REFUSAL_4_LIFECYCLE.map(member => [member.id, member] as const))("%s reads as pinned", (_id, member) => {
      expect(lifecycleReading(member.edits)).toStrictEqual({ tampers: member.tampers, mocks: member.mocks });
    });
    it.each(REFUSAL_4_PLANTS.map(member => [member.id, member] as const))("%s reads as pinned", (_id, member) => {
      expect(plantReading(member.path, member.content)).toStrictEqual({ prefilter: member.prefilter, drivers: member.drivers, shapes: member.shapes });
    });
  });

  describe("ANCHOR: the tracker export's own text (outside this census)", () => {
    it(
      "every refusal #3 member the verdict names is a GATE row or OUT_OF_SCOPE, and every such row is named",
      () => {
        const rows = [...REFUSAL_3_LIFECYCLE, ...REFUSAL_3_PLANTS].map(member => member.id);
        expect(namedRefusal3(verdictBlock(3))).toStrictEqual([...rows, ...OUT_OF_SCOPE.map(entry => entry.id)].sort());
      },
      CENSUS_TIMEOUT,
    );
    it("every refusal #4 member the verdict names is a GATE row, and every row is named", () => {
      expect(namedRefusal4(verdictBlock(4))).toStrictEqual([...REFUSAL_4_LIFECYCLE, ...REFUSAL_4_PLANTS].map(member => member.id).sort());
    });
    it("R-B98 U2: the nine claim words refusal #4 lists are the RH rows, in order, and each RH row names roster entries with a calibration plant", () => {
      const block = verdictBlock(4);
      const named = [...new Set([...block.matchAll(/(?<![A-Za-z0-9])RH(\d)(?![0-9])/g)].map(match => `RH${match[1] ?? ""}`))].sort();
      const calibrated = new Set([...C2_PLANTS.map(plant => `C2 ${plant.word}`), ...DRIVER_PLANTS.map(plant => `driver ${plant.word}`), ...SHAPE_PLANTS.map(plant => `shape ${plant.word}`)]);
      expect({ ids: RH.map(row => row.id), words: RH.map(row => row.word), uncalibrated: RH.flatMap(row => row.forms.filter(form => !calibrated.has(form))) }).toStrictEqual({
        ids: named,
        words: claimWords(block),
        uncalibrated: [],
      });
    });
    it("every requirement line this census answers occurs verbatim in the export", () => {
      const sources: Record<string, string> = { description: exportRecord(BEAD).description, notes: exportRecord(BEAD).notes };
      expect(REQUIREMENTS.filter(requirement => !(sources[requirement.source] ?? "").includes(requirement.text)).map(requirement => requirement.key)).toStrictEqual([]);
    });
    it("the PRECISION rows answer exactly the three forms of the description's U1 sentence", () => {
      const u1 = REQUIREMENTS.find(requirement => requirement.key === "U1")?.text ?? "";
      const sentence = /a const-bound (.+) must resolve its OWN binding/.exec(u1)?.[1] ?? "";
      expect(PRECISION.map(row => row.answers)).toStrictEqual(sentence.split(/, | or /));
    });
  });

  describe("FORMS: one calibration plant per roster word, read by that word alone (R-B98 U2)", () => {
    it("the plant rosters are the helper's rosters, in order", () => {
      expect({ c2: C2_PLANTS.map(plant => plant.word), drivers: DRIVER_PLANTS.map(plant => plant.word), shapes: SHAPE_PLANTS.map(plant => plant.word) }).toStrictEqual({
        c2: C2_FORMS.map(form => form.word),
        drivers: DRIVER_FORMS.map(form => form.word),
        shapes: SHAPE_FORMS.map(form => form.word),
      });
    });
    it.each(C2_PLANTS.map(plant => [plant.word, plant] as const))("C2 %s", (word, plant) => {
      const form = formNamed(C2_FORMS, word);
      const edits = [{ anchor: K2_CLIENT, replacement: `${K2_CLIENT}\n    ${plant.line}` }];
      expect({
        full: lifecycleReading(edits).tampers,
        alone: lifecycleReading(edits, [form]).tampers,
        without: lifecycleReading(
          edits,
          C2_FORMS.filter(other => other !== form),
        ).tampers,
      }).toStrictEqual({ full: plant.tampers, alone: plant.tampers, without: [] });
    });
    it.each(DRIVER_PLANTS.map(plant => [plant.word, plant] as const))("driver %s", (word, plant) => {
      const form = formNamed(DRIVER_FORMS, word);
      expect({
        full: plantReading(PLANT, plant.content).drivers,
        alone: plantReading(PLANT, plant.content, [form]).drivers,
        without: plantReading(
          PLANT,
          plant.content,
          DRIVER_FORMS.filter(other => other !== form),
        ).drivers,
      }).toStrictEqual({ full: [form.reason], alone: [form.reason], without: [] });
    });
    it.each(SHAPE_PLANTS.map(plant => [plant.word, plant] as const))("shape %s", (word, plant) => {
      const form = formNamed(SHAPE_FORMS, word);
      expect({
        full: plantReading(PLANT, plant.content).shapes,
        alone: plantReading(PLANT, plant.content, DRIVER_FORMS, [form]).shapes,
        without: plantReading(
          PLANT,
          plant.content,
          DRIVER_FORMS,
          SHAPE_FORMS.filter(other => other !== form),
        ).shapes,
      }).toStrictEqual({ full: plant.shapes, alone: plant.shapes, without: [] });
    });
  });

  describe("BINDINGS, VALUES, CHAINS and ROOTS: every name read through its own binding (description U1, R-B98 U1)", () => {
    it("the binding rows are BINDING_KINDS, in order", () => {
      expect(Object.keys(BINDING_EXPECTED)).toStrictEqual([...BINDING_KINDS]);
    });
    it.each(BINDING_KINDS.map(kind => [kind] as const))("BINDING %s", kind => {
      expect(arrayElementKinds(BINDING_TEXT)[kind]).toStrictEqual(BINDING_EXPECTED[kind]);
    });
    it("VALUES: a const reads its own value through a const chain and its assertions; a let reads none; a same-named const elsewhere answers nothing", () => {
      expect(arrayElementValues(VALUE_TEXT)).toStrictEqual(VALUE_EXPECTED);
    });
    it("CHAINS: a callee reads its spelling and its own const alias, globalThis dropped and an element key read through its value", () => {
      expect(callChains(CHAIN_TEXT)).toStrictEqual(CHAIN_EXPECTED);
    });
    it("the root rows are ROOT_FORMS, in order", () => {
      expect(ROOT_PLANTS.map(plant => plant.word)).toStrictEqual([...ROOT_FORMS]);
    });
    it.each(ROOT_PLANTS.map(plant => [plant.word, plant] as const))("ROOT %s", (word, plant) => {
      const form = ROOT_FORMS.find(entry => entry === word);
      expect(form).toBeDefined();
      expect({
        full: rootReading(plant.text),
        alone: rootReading(plant.text, ROOT_FORMS.filter(entry => entry === word)),
        without: rootReading(
          plant.text,
          ROOT_FORMS.filter(entry => entry !== word),
        ),
      }).toStrictEqual({ full: [plant.chain], alone: [plant.chain], without: [] });
    });
  });

  describe("FLAGS: the modelled command-head reader through each wrapper flag form (description U2)", () => {
    it("the flag rows are WRAPPER_FLAG_FORMS, in order", () => {
      expect(FLAG_ROWS.map(row => row.word)).toStrictEqual([...WRAPPER_FLAG_FORMS]);
    });
    it.each(FLAG_ROWS.map(row => [row.word, row] as const))("FLAG %s", (_word, row) => {
      expect(row.pins.map(pin => ({ text: pin.text, heads: modelledCommandHeads(pin.text) }))).toStrictEqual(row.pins.map(pin => ({ text: pin.text, heads: pin.heads })));
    });
    it("commandHeads keeps the fail-closed read beside the modelled one: every modelled head and every fail-closed head of every flag pin", () => {
      const pins = FLAG_ROWS.flatMap(row => row.pins.map(pin => pin.text));
      expect(pins.filter(text => JSON.stringify(commandHeads(text)) !== JSON.stringify([...modelledCommandHeads(text), ...failClosedCommandHeads(text)]))).toStrictEqual([]);
    });
  });

  describe("PRECISION: a const-bound value whose own binding names no HX form reads quiet (description U1)", () => {
    it.each(PRECISION.map(row => [row.id, row] as const))("%s", (_id, row) => {
      expect({ drivers: plantReading(PLANT, row.content).drivers, control: plantReading(PLANT, row.control).drivers }).toStrictEqual({ drivers: [], control: row.controlDrivers });
    });
  });

  describe("PREFILTER: every escape form unescaped decodes reads the needle (description U4)", () => {
    it("the prefilter rows are UNESCAPE_FORMS, in order", () => {
      expect(PREFILTER.map(row => row.word)).toStrictEqual([...UNESCAPE_FORMS]);
    });
    it.each(PREFILTER.map(row => [row.word, row] as const))("PREFILTER %s", (_word, row) => {
      expect({ raw: DRIVER_NEEDLE.test(row.text), passes: passesPrefilter(row.text) }).toStrictEqual({ raw: false, passes: true });
    });
    it("a text holding no spelling of the needle is not parsed", () => {
      expect(PREFILTER_QUIET.map(text => passesPrefilter(text))).toStrictEqual(PREFILTER_QUIET.map(() => false));
    });
  });

  describe("RESIDUALS: the named families these readers do not read, each quiet member beside a loud control", () => {
    it("the residual rows are RESIDUAL_FAMILIES, in order", () => {
      expect(RESIDUAL_ROWS.map(row => row.id)).toStrictEqual(RESIDUAL_FAMILIES.map(family => family.id));
    });
    it.each(RESIDUAL_ROWS.map(row => [row.id, row] as const))("%s", (_id, row) => {
      const reading = (pin: ResidualPin, text: string): readonly string[] => {
        if (pin.reading === "tampers") return lifecycleReading([{ anchor: K2_CLIENT, replacement: `${K2_CLIENT}\n    ${text}` }]).tampers;
        const plant = plantReading(PLANT, text);
        return pin.reading === "drivers" ? plant.drivers : plant.shapes;
      };
      expect(row.pins.map(pin => ({ quiet: reading(pin, pin.quiet), loud: reading(pin, pin.loud) }))).toStrictEqual(row.pins.map(pin => ({ quiet: [], loud: pin.loudReading })));
    });
  });

  describe("CLAIM: the helper's header roster is its exported roster, byte for byte", () => {
    it("every section's entry words equal the roster the helper exports, in order", () => {
      expect({
        bindings: headerRoster("BINDING_KINDS:").map(entryWord),
        roots: headerRoster("ROOT_FORMS:").map(entryWord),
        c2: headerRoster("(tampersIn, C2_FORMS;").map(entryWord),
        drivers: headerRoster("(hxDrivers, DRIVER_FORMS;").map(entryWord),
        shapes: headerRoster("(falsifierShapes, SHAPE_FORMS;").map(entryWord),
        flags: headerRoster("WRAPPER_FLAG_FORMS:").map(entryWord),
        unescape: headerRoster("UNESCAPE_FORMS:").map(entryWord),
        residuals: headerRoster("(RESIDUAL_FAMILIES;"),
      }).toStrictEqual({
        bindings: [...BINDING_KINDS],
        roots: [...ROOT_FORMS],
        c2: C2_FORMS.map(form => form.word),
        drivers: DRIVER_FORMS.map(form => `${form.word} [${form.reason}]`),
        shapes: SHAPE_FORMS.map(form => form.word),
        flags: [...WRAPPER_FLAG_FORMS],
        unescape: [...UNESCAPE_FORMS],
        residuals: RESIDUAL_FAMILIES.map(family => `${family.id}: ${family.family}`),
      });
    });
  });

  describe("FROZEN SHAPE (standing rule 16)", () => {
    it("every table row is pinned as table:id:digest of its own JSON", () => {
      const rows = (table: string, entries: readonly { readonly id?: string; readonly word?: string; readonly key?: string }[]): string[] =>
        entries.map(entry => `${table}:${entry.id ?? entry.word ?? entry.key ?? "?"}:${digest(JSON.stringify(entry))}`);
      expect([
        ...rows("REFUSAL_3_LIFECYCLE", REFUSAL_3_LIFECYCLE),
        ...rows("REFUSAL_3_PLANTS", REFUSAL_3_PLANTS),
        ...rows("REFUSAL_4_LIFECYCLE", REFUSAL_4_LIFECYCLE),
        ...rows("REFUSAL_4_PLANTS", REFUSAL_4_PLANTS),
        ...rows("OUT_OF_SCOPE", OUT_OF_SCOPE),
        ...rows("RH", RH),
        ...rows("REQUIREMENTS", REQUIREMENTS),
        ...rows("C2_PLANTS", C2_PLANTS),
        ...rows("DRIVER_PLANTS", DRIVER_PLANTS),
        ...rows("SHAPE_PLANTS", SHAPE_PLANTS),
        ...rows("ROOT_PLANTS", ROOT_PLANTS),
        ...rows("FLAG_ROWS", FLAG_ROWS),
        ...rows("PRECISION", PRECISION),
        ...rows("PREFILTER", PREFILTER),
        ...rows("RESIDUAL_ROWS", RESIDUAL_ROWS),
        ...rows("FIXTURES", FIXTURES),
      ]).toStrictEqual(FROZEN);
    });
  });
});
