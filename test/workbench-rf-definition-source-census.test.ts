/**
 * wb-973.13 (SWARM-CONTEXT-GRAPH-R13), the until-then leg of the definition-source label. Statement (the bead's description in the
 * tracked store export .beads/issues.jsonl, read below as this census's anchor outside itself): "Once RFCLI exposes
 * definition_source (working_tree | published_head | overlay) on the reactive-fiber.render/v1 CLI render envelope under the B26(a)
 * all-or-none pin-key rule, the RF reader adapter shall carry it so the legacy --no-commit preview reads as a working-tree render,
 * never as the published head; until then Pi claims nothing about the definition source beyond today's 'ephemeral noncommitted
 * preview' note."
 *
 * MEASURED AT THE CUT (2026-10-26, read-only, by the cutting seat): the named artifact is still absent. The installed rf 0.1.845
 * (provenance commit 0eaf3859fab0) holds 0 definition_source hits in schemas/cli/context.render.schema.json, and a fresh
 * `rf context render --no-commit --json` in a disposable `rf init` workspace returned a result with no such key; the key lives on
 * the persisted pin only (schemas/workspace/render-pin.schema.json requires it; schemas/workspace/render.schema.json holds it with
 * the five other optional pin keys under dependentRequired: present together or absent together). R11's fixture record
 * (test/fixtures/rf-result-keys.json, rf 0.1.784, source captured) names it in no key list. So this cut lands the acceptance's
 * until-then half and its trigger; the 'Armed on landing' clauses become the trigger's checks (ARMED), never observer behaviour.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row):
 *  A the until-then docs census. A1 every markdown file under docs/workbench is walked and no sentence says the preview reads the
 *    published head, while every docs path the export's SURFACES line names is walked and carries preview sentences; A2 the
 *    sentence judge on planted sentences: a claim is a sentence naming the preview and the published head with no negation before
 *    the head (claims flagged; negated, preview-free and head-free sentences quiet); A3-A6 the residuals' quiet rows, each beside
 *    its live twin.
 *  B the until-then anchor note. B1 the observer module the export's SURFACES line names spells exactly one string literal that
 *    starts with the statement's quoted anchor phrase (comments never count; its twin, a planted module, counts two literals and
 *    not its comment); B2 a clean full-shape projection states that note first and once (its twin, one note put before it, moves
 *    it to second).
 *  C the statement's until-then clause. C1 a reading whose result states definition_source (each word of the statement's closed
 *    set and one word outside it) projects exactly as the same reading stating none: the reader claims nothing about it yet (its
 *    twin, the armed stand-in, changes the working-tree projection and refuses the other three words).
 *  T the trigger check (freeze-and-flip). T1 R11's fixture record, read through readRfResultRoster, beside the real reader: no
 *    armed clause is missed, because no key list names the key (nothing is due); T2 the record cleared of the key and then given
 *    it in each key list in turn, beside an unarmed stand-in (the real reader over the reading with the key removed, so T2-T4
 *    never depend on what the real record names or on the observer's later arming): the trigger fires and names each armed clause
 *    the reader misses (the working-tree note, the contradiction refusal and the closed-set refusal; the absent-key clause holds);
 *    T3 the same planted records beside an armed stand-in (the unarmed one plus the armed clauses): the trigger clears, and the
 *    armed stand-in unarmed again misses what T2's reader misses; T4 a
 *    residual's quiet row beside its live twin (its base record already names the key in another list, which the clearing
 *    removes); T5 each armed clause is judged on its own: a stand-in armed for every clause but one (the contradiction one refuses
 *    published_head and admits overlay) misses exactly that clause, and one refusing with an untyped error instead of the
 *    category misses both refusal clauses.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal.
 * ANCHORS OUTSIDE THE CENSUS (rule 16 CT5/CT6): each row's clause and each ARMED clause is one whole clause of the tracked export
 * description, and together they are exactly its testable clauses: every clause of every labelled ACCEPTANCE item (the one
 * unlabelled item, the tracking line, is the only one not judged) plus the statement's until-then clause. The key, its closed set,
 * the working-tree note, the contradiction words, the refusal category, the anchor phrase and the walked surfaces are read from
 * the export, never spelled here; the trigger's key lists are held to the record's own array-valued fields.
 * REACHED: each pin's case reads through the seams it declares (the docs walk, the sentence judge, the src read, a reader
 * projection, the record read, the trigger), so a case swapped for an unrelated passing one reds; the last test holds every
 * registered test to run mode and a pass.
 * RESIDUALS (named families, each with a pinned quiet row and its live twin): R-PARAPHRASE (A3) a claim in other words than
 * 'published head' (the store-resident head's manifest) is not judged; R-ANAPHORA (A4) a claim whose preview stands in an earlier
 * sentence ('The preview is noncommitted. It reads the published head.') is not judged; R-NEGATION-SCOPE (A5) a negation before the
 * head that governs another phrase ('The preview, not the committed render, reads the published head.') reads the sentence as
 * negated; R-OUTSIDE-WALK (A6) text outside the docs/workbench markdown (the root README, docs/programs, src comments) is not
 * walked; R-NESTED (T4) the trigger sees only the record's key lists, so the key nested in a result object no list names (a pin
 * container, or provenance beyond its floor keys) stays invisible until a roster cut names the key itself.
 * FLIP (measured on throwaway plants at the cut): a roster naming definition_source reds T1 alone until the observer case exists;
 * the observer case clears T1 and flips C1 (a stated key is then read), so the cut that lands it rewrites C1 in the same commit.
 *
 * Display paths added: none. Test-only: no scratch, no spawn; src, docs, the roster and the store export are only read.
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { describe, expect, it, type TestContext } from "vitest";
import { CapabilityError, type CapabilityErrorCategory, type JsonValue } from "../src/workbench/capability-registry.js";
import type { ObservationScope } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf, type Json, type RfResultRoster, readRfResultRoster } from "./helpers/rf-render-fixture.js";

type JsonObject = { [key: string]: Json };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-973.13";
const DOCS_ROOT = "docs/workbench";
/** Two below the 72 markdown files docs/workbench held at base 20a13c5 (25 pages, 47 receipts): an emptied or misdirected walk
 * reds, an added page does not. */
const DOCS_FLOOR = 70;
const WS = "/workspace/rf-definition-source-census";
const scope: ObservationScope = { workspace: WS, principal: "local-operator:census" };
const HOST: ReactiveFiberTopologyContext = { scope, seam: "rf-cli", capturedAt: "2026-10-26T00:00:00Z", observedAt: "2026-10-26T00:00:01Z" };
/** A word outside the statement's closed set, invented for the probe. */
const OUTSIDE_WORD = "detached_head";
/** A result key the pin fields could ride in, which no key list names as the key itself (R-NESTED). */
const CONTAINER_KEY = "render_pin";
const ARROW = String.fromCodePoint(0x2192);
const STATEMENT = "STATEMENT";
const ARMED_SOURCE = "Armed on landing";
/** The ACCEPTANCE items that state no testable clause: the export's tracking line. */
const NOT_JUDGED = ["Tracked related, never a blocker."];
/** R11's key lists, held to the record's own array-valued fields in the judged set. */
const LISTS = ["resultKeys", "provenanceKeys", "workKeys", "workMetricsKeys"] as const;
type KeyList = (typeof LISTS)[number];
const CATEGORIES: readonly CapabilityErrorCategory[] = ["validation", "authorization", "unavailable", "transport", "uncertain-effect"];
const JUDGED_TITLE = "the judged set: the frozen shape, the cases and the tracked bead export agree";
const RECORD_TITLE = "the record: every registered test is in run mode and passed";

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);
const isJsonObject = (value: Json | undefined): value is JsonObject => typeof value === "object" && value !== null && !Array.isArray(value);
const isCategory = (word: string): word is CapabilityErrorCategory => CATEGORIES.some(category => category === word);

/** The seams a pin's case reads through; each read is recorded against the case that is running. */
type Seam = "docs" | "judge" | "src" | "reader" | "roster" | "trigger";
let running: Seam[] | undefined;
function touch(seam: Seam): void {
  if (running !== undefined && !running.includes(seam)) running.push(seam);
}

interface Clause {
  readonly source: string;
  readonly clause: string;
}
/** The bead's description in the tracked store export: the anchor outside this census (its notes and status are never read). */
function exportDescription(): string {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`) && !line.includes(`"id": "${BEAD}"`)) continue;
    const entry: unknown = JSON.parse(line);
    if (isObject(entry) && entry.id === BEAD && typeof entry.description === "string") return entry.description;
  }
  throw new Error(`the store export has no ${BEAD} row with a description`);
}
/** The description line that starts with the section prefix, the prefix removed. */
function section(description: string, prefix: string): string {
  const line = description.split("\n").find(entry => entry.startsWith(`${prefix}: `));
  if (line === undefined) throw new Error(`the ${BEAD} description has no ${prefix} line`);
  return line.slice(prefix.length + 2);
}
/** The items of a Python-repr list of strings (the export's ACCEPTANCE line): each item single- or double-quoted, backslash
 * escapes resolved. */
function pyStrings(list: string): string[] {
  const items: string[] = [];
  let index = 0;
  while (index < list.length) {
    const quote = list[index];
    index += 1;
    if (quote !== "'" && quote !== '"') continue;
    let item = "";
    while (index < list.length && list[index] !== quote) {
      const char = list[index] ?? "";
      if (char === "\\" && index + 1 < list.length) {
        item += list[index + 1] ?? "";
        index += 2;
      } else {
        item += char;
        index += 1;
      }
    }
    if (index >= list.length) throw new Error(`an unterminated ACCEPTANCE item in the ${BEAD} export`);
    items.push(item);
    index += 1;
  }
  return items;
}
/** A text's clauses: split at each '; ' and at each sentence end before a capital, a closing period removed. */
const clausesOf = (text: string): string[] =>
  text
    .split(/;\s+|\.\s+(?=[A-Z])/)
    .map(part => part.trim().replace(/\.$/, ""))
    .filter(part => part.length > 0);
function matched(pattern: RegExp, text: string, what: string): RegExpExecArray {
  const found = pattern.exec(text);
  if (found === null) throw new Error(`the ${BEAD} export states no ${what}`);
  return found;
}

interface Exported {
  readonly clauses: readonly Clause[];
  readonly unlabeled: readonly string[];
  readonly key: string;
  readonly closedSet: readonly string[];
  readonly anchorPhrase: string;
  readonly workingTree: string;
  readonly note: string;
  readonly contradictions: readonly string[];
  readonly category: CapabilityErrorCategory;
  readonly docsSurfaces: readonly string[];
  readonly srcSurfaces: readonly string[];
}
/** Everything this census takes from the tracked export: the testable clauses, and the words and paths they name. */
function readExported(): Exported {
  const description = exportDescription();
  const statement = clausesOf(section(description, STATEMENT));
  const clauses: Clause[] = statement.filter(clause => clause.startsWith("until then ")).map(clause => ({ source: STATEMENT, clause }));
  const unlabeled: string[] = [];
  for (const item of pyStrings(section(description, "ACCEPTANCE"))) {
    const labeled = /^([A-Z][a-z]+(?: [a-z]+)*): ([\s\S]+)$/.exec(item);
    if (labeled === null) unlabeled.push(item);
    else for (const clause of clausesOf(labeled[2] ?? "")) clauses.push({ source: labeled[1] ?? "", clause });
  }
  const exposes = matched(/\bexposes (\w+) \(([^)]+)\)/, statement[0] ?? "", "exposed key with its closed set");
  const untilThen = clauses.find(clause => clause.source === STATEMENT)?.clause ?? "";
  const armed = clauses.filter(clause => clause.source === ARMED_SOURCE).map(clause => clause.clause);
  const note = matched(/^\w+ '([^']+)' on a legacy preview adds the note '(.+)'$/, armed[0] ?? "", "working-tree note");
  const contradiction = matched(/^'([^']+)'\/'([^']+)' on /, armed[1] ?? "", "contradiction words");
  const category = matched(/'(\w+)' refusal$/, armed[1] ?? "", "refusal category")[1] ?? "";
  if (!isCategory(category)) throw new Error(`the ${BEAD} export names the unknown refusal category ${category}`);
  const surfaces = section(description, "SURFACES")
    .split(", ")
    .map(entry => entry.replace(/:[0-9,-]+@[0-9a-f]+$/, ""));
  return {
    clauses,
    unlabeled,
    key: exposes[1] ?? "",
    closedSet: (exposes[2] ?? "").split(" | "),
    anchorPhrase: matched(/'([^']+)' note$/, untilThen, "anchor phrase")[1] ?? "",
    workingTree: note[1] ?? "",
    note: note[2] ?? "",
    contradictions: [contradiction[1] ?? "", contradiction[2] ?? ""],
    category,
    docsSurfaces: surfaces.filter(path => path.startsWith(`${DOCS_ROOT}/`)),
    srcSurfaces: surfaces.filter(path => path.startsWith("src/")),
  };
}
const EXPORTED = readExported();
const sortedClauses = (clauses: readonly Clause[]): string[] => clauses.map(({ source, clause }) => `${source} | ${clause}`).sort();

interface DocFile {
  readonly path: string;
  readonly text: string;
}
interface DocClaim {
  readonly path: string;
  readonly line: number;
  readonly sentence: string;
}
/** Every file under docs/workbench, read from disk in path order. */
function docsTree(): DocFile[] {
  touch("docs");
  const files: DocFile[] = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(join(REPO, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) files.push({ path, text: readFileSync(join(REPO, path), "utf8") });
    }
  };
  walk(DOCS_ROOT);
  return files.sort((left, right) => (left.path < right.path ? -1 : left.path > right.path ? 1 : 0));
}
const PREVIEW_TERM = /\bpreviews?\b|\bnon-?committed\b|--no-commit\b/i;
const HEAD_TERM = /\bpublished[\s_-]+head\b/i;
/** A negation word; the 'no' of --no-commit is a flag, never a negation. */
const NEGATION = /\b(?:never|not|nor|without|cannot)\b|n't\b|(?<![-\w])no\b(?!-)/i;
/** A sentence says the preview reads the published head when it names the preview and the published head and no negation comes
 * before the head. */
function claimsHead(sentence: string): boolean {
  touch("judge");
  const head = HEAD_TERM.exec(sentence);
  if (head === null || !PREVIEW_TERM.test(sentence)) return false;
  return !NEGATION.test(sentence.slice(0, head.index));
}
const sentencesOf = (line: string): string[] => line.split(/(?<=[.!?;])\s+/).filter(part => part.trim().length > 0);
const inScope = (path: string): boolean => path.startsWith(`${DOCS_ROOT}/`) && path.endsWith(".md");
/** The in-scope files of a set, each sentence judged: the files scanned, every claim, and each scanned file's preview sentence count. */
function scan(files: readonly DocFile[]): { scanned: string[]; claims: DocClaim[]; previews: Record<string, number> } {
  const scanned: string[] = [];
  const claims: DocClaim[] = [];
  const previews: Record<string, number> = {};
  for (const file of files) {
    if (!inScope(file.path)) continue;
    scanned.push(file.path);
    let count = 0;
    file.text.split("\n").forEach((line, index) => {
      for (const sentence of sentencesOf(line)) {
        if (PREVIEW_TERM.test(sentence)) count += 1;
        if (claimsHead(sentence)) claims.push({ path: file.path, line: index + 1, sentence });
      }
    });
    previews[file.path] = count;
  }
  return { scanned, claims, previews };
}
const claimCount = (files: readonly DocFile[]): number => scan(files).claims.length;

/** Every string literal of a src module (read from disk, or the planted text), template parts included; comments are never
 * literals. */
function stringLiterals(path: string, planted?: string): string[] {
  touch("src");
  const source = ts.createSourceFile(path, planted ?? readFileSync(join(REPO, path), "utf8"), ts.ScriptTarget.ES2022, true);
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push(node.head.text, ...node.templateSpans.map(span => span.literal.text));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return literals;
}

type Reader = (reading: JsonValue) => ReactiveFiberProjectionTopology;
const realRead: Reader = reading => reactivefiberTopology(reading, HOST);
const isValueObject = (value: JsonValue | undefined): value is { [key: string]: JsonValue } => typeof value === "object" && value !== null && !Array.isArray(value);
/** A reader the census judges: each projection it makes is a read through the reader seam. */
const tracked =
  (reader: Reader): Reader =>
  reading => {
    touch("reader");
    return reader(reading);
  };
/** The full-shape --no-commit preview reading, its result stating the key as `word`, or not at all. */
function previewReading(word?: string): JsonValue {
  const envelope = fullShapeRf(WS);
  const result = envelope.result;
  if (!isJsonObject(result)) throw new Error("the full-shape fixture needs an object result");
  const stated: JsonObject = { ...result };
  if (word !== undefined) stated[EXPORTED.key] = word;
  const reading: Json = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: WS, source: { ...envelope, result: stated } };
  return reading;
}
/** The reading with the key removed from its result (every other member kept). */
function withoutKey(reading: JsonValue): JsonValue {
  if (!isValueObject(reading) || !isValueObject(reading.source) || !isValueObject(reading.source.result)) return reading;
  const result = Object.fromEntries(Object.entries(reading.source.result).filter(([key]) => key !== EXPORTED.key));
  return { ...reading, source: { ...reading.source, result } };
}
/** The word a reading's result states for the key, if any. */
function statedWord(reading: JsonValue): JsonValue | undefined {
  const source = isObject(reading) ? reading.source : undefined;
  const result = isObject(source) ? source.result : undefined;
  if (!isObject(result) || !Object.hasOwn(result, EXPORTED.key)) return undefined;
  const word = result[EXPORTED.key];
  return typeof word === "string" ? word : null;
}
/** The category a reader refuses a reading with: null when it projects, 'untyped' for any other throw. */
function refusalOf(read: Reader, reading: JsonValue): string | null {
  try {
    read(reading);
    return null;
  } catch (error) {
    return error instanceof CapabilityError ? error.category : "untyped";
  }
}
function projectionOf(read: Reader, reading: JsonValue): ReactiveFiberProjectionTopology | null {
  try {
    return read(reading);
  } catch {
    return null;
  }
}

interface Armed {
  readonly id: string;
  readonly clause: string;
  readonly holds: (read: Reader) => boolean;
}
/** The 'Armed on landing' clauses, each a check the trigger runs once the record names the key. */
const ARMED: readonly Armed[] = [
  {
    id: "note",
    clause: "definition_source 'working_tree' on a legacy preview adds the note 'definition source: working tree (not the published head)'",
    holds: read => projectionOf(read, previewReading(EXPORTED.workingTree))?.diagnostics.includes(EXPORTED.note) === true,
  },
  {
    id: "contradiction",
    clause: `'published_head'/'overlay' on a --no-commit legacy render is a contradiction ${ARROW} 'validation' refusal`,
    holds: read => EXPORTED.contradictions.every(word => refusalOf(read, previewReading(word)) === EXPORTED.category),
  },
  {
    id: "closed-set",
    clause: `a word outside the closed set ${ARROW} 'validation' refusal`,
    holds: read => refusalOf(read, previewReading(OUTSIDE_WORD)) === EXPORTED.category,
  },
  {
    id: "absent",
    clause: `absent key ${ARROW} unchanged output`,
    holds: read => isDeepStrictEqual(projectionOf(read, previewReading()), realRead(previewReading())),
  },
];
/** A reader that never reads the key: the base reader over the reading with the key removed. */
const unarmed =
  (base: Reader): Reader =>
  reading =>
    base(withoutKey(reading));
/** The unarmed stand-in for T2 and T4: today's reader, frozen - the real reader unarmed, so it never reads the key whatever the
 * observer later does. */
const unarmedStandIn: Reader = unarmed(realRead);
/** The armed stand-in for T3: the unarmed one plus the armed clauses, as the observer case would add them. */
const armedStandIn: Reader = reading => {
  const word = statedWord(reading);
  if (word === undefined) return unarmedStandIn(reading);
  if (word !== EXPORTED.workingTree) throw new CapabilityError(EXPORTED.category, `a legacy preview stating ${EXPORTED.key} ${String(word)} is a contradiction`);
  const topology = unarmedStandIn(reading);
  return { ...topology, diagnostics: [...topology.diagnostics, EXPORTED.note] };
};

/** T5's partial stand-ins: the armed stand-in with one clause left unarmed - no note, overlay admitted (published_head still
 * refused), the outside word admitted, or a no-key reading given an extra note - and one whose refusals are untyped errors. */
const PARTIAL: Readonly<Record<string, Reader>> = {
  note: reading => (statedWord(reading) === EXPORTED.workingTree ? unarmedStandIn(reading) : armedStandIn(reading)),
  contradiction: reading => (statedWord(reading) === EXPORTED.contradictions[1] ? unarmedStandIn(reading) : armedStandIn(reading)),
  "closed-set": reading => (statedWord(reading) === OUTSIDE_WORD ? unarmedStandIn(reading) : armedStandIn(reading)),
  absent: reading => {
    const topology = armedStandIn(reading);
    return statedWord(reading) === undefined ? { ...topology, diagnostics: [...topology.diagnostics, "a note on a reading stating no key"] } : topology;
  },
  untyped: reading => {
    const word = statedWord(reading);
    if (word !== undefined && word !== EXPORTED.workingTree) throw new Error("an untyped refusal");
    return armedStandIn(reading);
  },
};
/** R11's fixture record, read through its own reader. */
function roster(): RfResultRoster {
  touch("roster");
  return readRfResultRoster();
}
/** The record with the key removed from every key list: the base T2-T4 plant onto. */
function cleared(record: RfResultRoster): RfResultRoster {
  const copy = { ...record };
  for (const list of LISTS) copy[list] = record[list].filter(key => key !== EXPORTED.key);
  return copy;
}
/** The record with `key` appended to one key list. */
function withKey(record: RfResultRoster, list: KeyList, key: string): RfResultRoster {
  const copy = { ...record };
  copy[list] = [...record[list], key];
  return copy;
}
/** The trigger (freeze-and-flip): nothing is due while no key list of the record names the key; once one does, each armed clause
 * the reader misses is one miss, so the default gate reds until the observer case exists. */
function trigger(record: RfResultRoster, read: Reader): { named: string[]; misses: string[] } {
  touch("trigger");
  const named = LISTS.filter(list => record[list].includes(EXPORTED.key));
  return { named, misses: named.length === 0 ? [] : ARMED.filter(check => !check.holds(read)).map(check => check.id) };
}
const plantedEach = (read: Reader): Json => Object.fromEntries(LISTS.map(list => [list, trigger(withKey(cleared(roster()), list, EXPORTED.key), read).misses]));

interface Pin {
  readonly id: string;
  readonly seams: readonly Seam[];
  readonly witness: Json;
}
interface Row {
  readonly id: string;
  readonly source: string;
  readonly clause: string;
  readonly pins: readonly Pin[];
}
const FIRED = ["note", "contradiction", "closed-set"];
/** The judged rows; their shape is pinned in the judged set and their clauses held to the tracked export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    source: "Until then",
    clause: "a docs census asserts no docs/workbench sentence says the preview reads the published head",
    pins: [
      {
        id: "A1",
        seams: ["docs", "judge"],
        witness: {
          walked: true,
          surfaces: [
            { path: "docs/workbench/07-native-integrations.md", walked: true, previews: true },
            { path: "docs/workbench/19-worked-examples.md", walked: true, previews: true },
          ],
          claims: [],
        },
      },
      { id: "A2", seams: ["judge"], witness: [true, true, true, true, true, true, false, false, false, false] },
      { id: "A3", seams: ["judge"], witness: { quiet: false, twin: true } },
      { id: "A4", seams: ["judge"], witness: { quiet: 0, twin: 1 } },
      { id: "A5", seams: ["judge"], witness: { quiet: false, twin: true } },
      { id: "A6", seams: ["judge"], witness: { quiet: 0, twin: 2 } },
    ],
  },
  {
    id: "B",
    source: "Until then",
    clause: "the anchor note stays reactivefiber-observer.ts:193@9df9a03",
    pins: [
      { id: "B1", seams: ["src"], witness: { file: "src/workbench/reactivefiber-observer.ts", anchorLiterals: 1, twin: 2 } },
      { id: "B2", seams: ["reader"], witness: { anchoredAt: [0], twin: [1] } },
    ],
  },
  {
    id: "C",
    source: STATEMENT,
    clause: "until then Pi claims nothing about the definition source beyond today's 'ephemeral noncommitted preview' note",
    pins: [
      {
        id: "C1",
        seams: ["reader"],
        witness: {
          real: [
            { word: "working_tree", reads: "unchanged" },
            { word: "published_head", reads: "unchanged" },
            { word: "overlay", reads: "unchanged" },
            { word: OUTSIDE_WORD, reads: "unchanged" },
          ],
          twin: [
            { word: "working_tree", reads: "changed" },
            { word: "published_head", reads: "refused" },
            { word: "overlay", reads: "refused" },
            { word: OUTSIDE_WORD, reads: "refused" },
          ],
        },
      },
    ],
  },
  {
    id: "T",
    source: "Trigger check",
    clause:
      "a default-gate test reads R11's fixture record and, when definition_source appears in a captured envelope, fails until the observer case exists (freeze-and-flip, 05-IMPLEMENTATION-PLAN.md:39@8a8b83e4d)",
    pins: [
      { id: "T1", seams: ["roster", "trigger"], witness: { misses: [] } },
      { id: "T2", seams: ["roster", "trigger", "reader"], witness: { resultKeys: FIRED, provenanceKeys: FIRED, workKeys: FIRED, workMetricsKeys: FIRED } },
      {
        id: "T3",
        seams: ["roster", "trigger", "reader"],
        witness: { armed: { resultKeys: [], provenanceKeys: [], workKeys: [], workMetricsKeys: [] }, unarmedArmed: FIRED },
      },
      { id: "T4", seams: ["roster", "trigger", "reader"], witness: { quiet: { named: [], misses: [] }, twin: { named: ["resultKeys"], misses: FIRED } } },
      {
        id: "T5",
        seams: ["roster", "trigger", "reader"],
        witness: { note: ["note"], contradiction: ["contradiction"], "closed-set": ["closed-set"], absent: ["absent"], untyped: ["contradiction", "closed-set"] },
      },
    ],
  },
];

/** A2's planted sentences: six claims (each preview spelling alone carries one), then a negated pair, a preview-free and a
 * head-free sentence. */
const SENTENCES = [
  "The preview reads the published head.",
  "reactivefiber.render.preview renders the published_head definitions.",
  "A --no-commit render reads the PUBLISHED HEAD, not the working tree.",
  "Noncommitted previews resolve definitions from the published-head manifest.",
  "The non-committed render resolves the published head.",
  "Previews read the published head.",
  "The noncommitted preview never reads the published head.",
  "The preview does not read the published head.",
  "rf graph publish promotes a candidate to the published head.",
  "The preview reads the working tree.",
];
const PLANTED_CLAIM = SENTENCES[0] ?? "";

/** Each pin's case: it reads through the seams its pin declares and returns the witness its pin holds. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const files = docsTree();
    const { scanned, claims, previews } = scan(files);
    return {
      walked: scanned.length >= DOCS_FLOOR,
      surfaces: EXPORTED.docsSurfaces.map(path => ({ path, walked: scanned.includes(path), previews: (previews[path] ?? 0) > 0 })),
      claims: claims.map(claim => `${claim.path}:${claim.line} ${claim.sentence}`),
    };
  },
  A2: () => SENTENCES.map(sentence => claimsHead(sentence)),
  // R-PARAPHRASE: the store-resident head's manifest names the head in other words.
  A3: () => ({ quiet: claimsHead("The preview reads the store-resident head's manifest."), twin: claimsHead("The preview reads the published head's manifest.") }),
  // R-ANAPHORA: the preview stands in the sentence before the one that names the head.
  A4: () => ({
    quiet: claimCount([{ path: `${DOCS_ROOT}/planted.md`, text: "The preview is noncommitted. It reads the published head." }]),
    twin: claimCount([{ path: `${DOCS_ROOT}/planted.md`, text: "The preview is noncommitted and reads the published head." }]),
  }),
  // R-NEGATION-SCOPE: the 'not' before the head governs the committed render, not the reading.
  A5: () => ({
    quiet: claimsHead("The preview, not the committed render, reads the published head."),
    twin: claimsHead("The preview, unlike the committed render, reads the published head."),
  }),
  // R-OUTSIDE-WALK: the same claim outside docs/workbench markdown, then inside it.
  A6: () => ({
    quiet: claimCount([
      { path: "README.md", text: PLANTED_CLAIM },
      { path: "docs/programs/planted.md", text: PLANTED_CLAIM },
      { path: `${DOCS_ROOT}/planted.txt`, text: PLANTED_CLAIM },
    ]),
    twin: claimCount([
      { path: `${DOCS_ROOT}/planted.md`, text: PLANTED_CLAIM },
      { path: `${DOCS_ROOT}/receipts/planted.md`, text: PLANTED_CLAIM },
    ]),
  }),
  B1: () => {
    const file = EXPORTED.srcSurfaces[0] ?? "";
    const anchored = (literals: readonly string[]): number => literals.filter(text => text.startsWith(EXPORTED.anchorPhrase)).length;
    const phrase = EXPORTED.anchorPhrase;
    const planted = `// ${phrase}: a comment\nconst a = "${phrase}: one";\nconst b = \`${phrase}: \${a}\`;\nexport const c = [a, b];\n`;
    return { file, anchorLiterals: anchored(stringLiterals(file)), twin: anchored(stringLiterals("planted.ts", planted)) };
  },
  B2: () => {
    const anchoredAt = (notes: readonly string[]): number[] => notes.flatMap((note, index) => (note.startsWith(EXPORTED.anchorPhrase) ? [index] : []));
    const notes = tracked(realRead)(previewReading()).diagnostics;
    return { anchoredAt: anchoredAt(notes), twin: anchoredAt(["a note put before it", ...notes]) };
  },
  C1: () => {
    const readings = (reader: Reader): Json => {
      const read = tracked(reader);
      const absent = read(previewReading());
      return [...EXPORTED.closedSet, OUTSIDE_WORD].map(word => {
        const projected = projectionOf(read, previewReading(word));
        return { word, reads: projected === null ? "refused" : isDeepStrictEqual(projected, absent) ? "unchanged" : "changed" };
      });
    };
    return { real: readings(realRead), twin: readings(armedStandIn) };
  },
  T1: () => ({ misses: trigger(roster(), tracked(realRead)).misses }),
  T2: () => plantedEach(tracked(unarmedStandIn)),
  T3: () => ({
    armed: plantedEach(tracked(armedStandIn)),
    unarmedArmed: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmed(armedStandIn))).misses,
  }),
  // R-NESTED: a container key the pin fields could ride in, then the key itself, each in the result list.
  T4: () => ({
    quiet: trigger(withKey(cleared(withKey(roster(), "provenanceKeys", EXPORTED.key)), "resultKeys", CONTAINER_KEY), tracked(unarmedStandIn)),
    twin: trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(unarmedStandIn)),
  }),
  T5: () => Object.fromEntries(Object.entries(PARTIAL).map(([id, read]) => [id, trigger(withKey(cleared(roster()), "resultKeys", EXPORTED.key), tracked(read)).misses])),
};

type Registered = { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean };
/** Every test this file registered (the vitest task tree), in order, with its collected mode and, once it ran, its state. */
function registered(task: TestContext["task"]): Registered[] {
  const walked: Registered[] = [];
  const walk = (tasks: typeof task.file.tasks): void => {
    for (const child of tasks) {
      if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
      else if (child.type === "suite") walk(child.tasks);
    }
  };
  walk(task.file.tasks);
  return walked;
}

describe("wb-973.13 rf definition-source census (SWARM-CONTEXT-GRAPH-R13, the until-then leg and its trigger)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:6", "B:2", "C:1", "T:5"]);
    expect(Object.keys(IMPL).sort(), "a pin without a case, or a case without a pin").toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    const cited: Clause[] = [...ROWS.map(({ source, clause }) => ({ source, clause })), ...ARMED.map(({ clause }) => ({ source: ARMED_SOURCE, clause }))];
    expect(sortedClauses(cited), "the judged clauses against the tracked export's testable clauses").toStrictEqual(sortedClauses(EXPORTED.clauses));
    expect(EXPORTED.unlabeled, "an ACCEPTANCE item with no clause label other than the tracking line").toStrictEqual(NOT_JUDGED);
    expect(EXPORTED.closedSet.includes(OUTSIDE_WORD), "the outside word is in the closed set").toBe(false);
    expect(EXPORTED.contradictions.every(word => EXPORTED.closedSet.includes(word) && word !== EXPORTED.workingTree), "a contradiction word outside the closed set").toBe(true);
    const record = readRfResultRoster();
    expect(
      Object.entries(record)
        .filter(([, value]) => Array.isArray(value))
        .map(([field]) => field),
      "the trigger's key lists against R11's record",
    ).toEqual([...LISTS]);
    expect(EXPORTED.docsSurfaces.length > 0 && EXPORTED.srcSurfaces.length === 1, "the export's SURFACES line names the docs and the one observer module").toBe(true);
    expect(Object.keys(PARTIAL), "T5's partial stand-ins against the armed clauses").toEqual([...ARMED.map(({ id }) => id), "untyped"]);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.clause}`, () => {
      for (const pin of row.pins) {
        it(pin.id, () => {
          const impl = IMPL[pin.id];
          expect(impl, `no case for ${pin.id}`).toBeTypeOf("function");
          running = [];
          const witness = impl === undefined ? null : impl();
          const reads = running;
          running = undefined;
          expect(
            pin.seams.filter(seam => !reads.includes(seam)),
            `${pin.id} did not read through every seam it declares`,
          ).toEqual([]);
          expect(witness).toStrictEqual(pin.witness);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
    const others = registered(task).filter(entry => !entry.self);
    expect(
      others.map(entry => entry.name),
      "the registered tests",
    ).toEqual([JUDGED_TITLE, ...ROWS.flatMap(row => row.pins.map(pin => pin.id))]);
    expect(
      others.filter(entry => entry.mode !== "run" || entry.fails || entry.state !== "pass").map(entry => `${entry.name}: ${entry.mode}${entry.fails ? "+fails" : ""} ${entry.state ?? "unrun"}`),
      "a registered test skipped, inverted or not passed",
    ).toEqual([]);
  });
});
