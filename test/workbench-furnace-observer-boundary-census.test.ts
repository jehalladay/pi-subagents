/**
 * wb-dqf.1 (FURNACE-CAC-EXECUTION-ASSURANCE-R4, program-triage-2026-10-18), the Furnace observer-boundary census: the
 * until-then leg of a trigger-gated requirement whose record has not shipped.
 * Statement (the bead's tracker-export title, verbatim; the export spells each dash as the six characters backslash, u, 2,
 * 0, 1, 4, read here as DASH): "When Furnace ships FurnaceObserverBoundaryV0 (proposed, not shipped), Pi's Furnace observer
 * shall consume it as an admitted observer strictly within the boundary DASH reading only the attempt state/log fields and
 * resource counters it exposes, under its stated visibility policy for admitted client decisions DASH never widening today's
 * bounded read-only polling; until then zero Pi mentions of the record."
 * Owner filing (the export notes, quoted where this file binds them): "Gating artifact: FurnaceObserverBoundaryV0, a proposed
 * source-owned reference, not shipped"; "Today the external Furnace reader is explicit bounded status/attempt/log-reference
 * polling (docs/09 § Experimental projection ...)"; "Gate: the record appears in a released Furnace surface Pi vendors
 * (@furnace/sdk or Furnace docs graduating it ...)"; and the acceptance on landing (ACCEPTANCE below, verbatim).
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-26, at this census's base 32e0e2d). The vendored release Pi ships is
 * vendor/furnace-sdk-0.1.0.tgz (package.json and package-lock.json resolve @furnace/sdk to it; 128 regular tar entries, all
 * text, all under package/, no pax or link entries; sha256 aaa57dcfb1c205ec...). No entry spells the record or any observer-boundary
 * form (the trigger has not fired). Pi: git lists 987 files outside .beads/ (982 text, 716 scripts, 5 binaries: two media
 * files and the three vendored tarballs) and none spells the record or the observer-boundary stem; at the filing pin
 * b21beb0 (the ledger hop that added the bead to the export: its row is in that commit's export and not in its parent's)
 * the 707 files outside .beads/ spell it nowhere either. src/workbench/furnace-observer.ts declares FurnaceObserverClient with
 * exactly three read paths (runs.get.status, attempts.list, logs.read), calls each once with a timeoutMs call bound (the two
 * list reads also carry a limit), bounds its poll loop by maxPolls and maxElapsedMs, imports @furnace/sdk for types only and
 * labels its ownership 'external'; docs/workbench/09 § Experimental projection states the same three reads and that Pi
 * attachment "does not create, resume or stop a Run". No src, docs or tracker text is edited by this cut.
 *
 * THE JUDGE. A MENTION is the word "observer" (or "observers", "observer's", "observers'"), then any run of characters that
 * are neither letters nor digits (spaces, newlines, underscores, hyphens, dots, quotes, markup, format characters), then
 * "boundary" or "boundaries", in any case - the record's own middle words (recordWords), so every spelling of the record and
 * of its family (any version, with or without the producer prefix) is read. Each file's own path is read ("path"). A file
 * holding a NUL byte is binary and its content is not read. Every other file is read as raw text ("raw"); a script (.ts .tsx
 * .mts .cts .js .jsx .mjs .cjs) also through the TypeScript AST - each string-like literal by its cooked value and each
 * template part by its cooked text, a substitution ending the part ("cooked"), and each chain of "+" whose operands are all
 * string literals by its folded value ("folded"); a .json file also by its parsed keys and string values ("cooked"); a
 * markup file (.md .html .htm .xml .svg) also with its numeric character references and the common named entities decoded
 * ("decoded"). A file's forms are the readings that found a mention. judgeScope reads an entry list in one call, so every leg judges its planted
 * entries after the real ones: the findings must be exactly the plants', so a real mention, a hollowed judge or a result
 * forced empty reds.
 *
 * ROWS. T, the trigger clause, one pin per quoted part: T1 the release package.json resolves @furnace/sdk to is read entry
 * by entry (an entry floor, no skipped entry kind and no binary entry, every type the observer imports from @furnace/sdk
 * declared by the release's .d.ts) and spells no mention, a planted declaration is found by the same call - ARMED: when a
 * re-vendor brings the record, T1 reds naming the acceptance on landing as owed; T2 the record's release forms (declaration,
 * runtime export, schema id, registry key, docs heading, escape-spelled string, escape-spelled JSON) each found; T3 the
 * release's identity (package.json spec, lock resolution, version and
 * integrity, the tarball's own name, version and sha256) and the owner's recorded status, so any re-vendor reds T3 and
 * re-reads T1. W, the baseline the armed half must never widen: W1 the declared read surface (every declaration of
 * FurnaceObserverClient, its heritage, the type of the constructor's client parameter) equals docs/09's three reads one to
 * one, and a widened interface is read as widened; W2 every client read carries a timeoutMs bound, the list reads a
 * limit, and the poll loop both budgets, an unbounded plant read as such; W3 every client use is one of the three read calls
 * (no alias, no other member), the SDK is imported for types only, close() reads nothing, no docs/09 excluded verb is called,
 * the ownership label is 'external', and a control plant is read as one. Z, the until-then duty: Z1 the trigger is unfired
 * today and the same judge over the filing pin's objects reads no mention, the pin being where the row was filed; Z2 every
 * listed Pi file (tracked plus untracked-not-ignored, minus the tracker and the holders) spells no mention, with file, script
 * and binary floors, content-liveness anchors and planted entries of each reading found; Z3 the record's identity: its words
 * from the export title, every spelling form read, and the observer's own identifiers and the sibling record (named in
 * wb-dqf.2's export title) quiet. Q, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and
 * pins, every pin's quote, claims and witness, the constants and every registered test title - is held to the out-of-file
 * roster (test/fixtures/furnace-observer-boundary-roster.json).
 * OUTSIDE ANCHORS (their own registered case): the bead's own export row - its title, read after its requirement-id prefix,
 * is tiled in order by row T's label, the armed clause (ARMED), row W's label and row Z's label with nothing but separators
 * (whitespace, comma, semicolon, colon, period, parentheses, DASH) between them, and each row's pin quotes tile its label the
 * same way, so a row or a pin removed from ROWS, the literal, QUOTES, CLAIMS, IMPL and the roster together still reds; the
 * record is the title's token after "When Furnace ships " and the notes' gating artifact; MENTION is built from its words;
 * the recorded status and ACCEPTANCE are the notes' own text; docs/09's section names the reads W1 pairs and the verbs W3
 * excludes, and the notes cite that section; the filing pin's export holds the row and its parent's does not; the sibling
 * record is wb-dqf.2's title token.
 * CLAIMS: each quoted pin carries claims - terms tiling its quote, each naming the witness facts (top-level keys) that show
 * it; a pin's live witness holds exactly its claimed facts, each fact under one term, and no pin's live witness holds
 * another pin's claimed facts (the claims bound), so a case swap reds at the swapped pin's claims beside its roster witness.
 * RESIDUALS (named, each with its pinned quiet row): R-TRACKER the tracker export (.beads/) is not a Pi scope: the bead's
 * own row spells the record (Q1); R-HOLDER this file and its roster spell it and are excluded by name (Q2); R-BINARY a file
 * holding a NUL byte is not read (Q3); R-PARAPHRASE "observed boundary" and "observation boundary" are not the record's
 * words (Q4); R-WORD-ORDER the words in the other order are not read (Q5); R-INTERIOR a character inside a word (a format
 * character, a confusable letter, markup) or an HTML entity outside a markup file hides it (Q6); R-COMPUTED a template
 * substitution, a runtime
 * join or a computed character between word parts is not read (Q7); R-OTHER-MODULE W reads only the observer module: src/workbench/furnace-control.ts
 * calls docs/09's excluded verbs and is out of W's scope (Q8); R-COMPUTED-ACCESS a client reached through a computed key is
 * not read as a client use (Q9).
 * NOT CLAIMED (edits of this file and the roster together): a pin's case and its roster witness re-authored together, its
 * claims rewritten with them; a plant or control edited in IMPL and the roster together; a floor lowered with the roster; a
 * residual row removed from ROWS, the literal, IMPL, RESIDUALS and the roster (no outside anchor names the residual
 * families); the outside-anchor case or the closing case removed with its roster title.
 * ARMED HALF PENDING: the clause ARMED (consume the record within the boundary: exposed fields only, non-exposed fields as
 * typed absence, the visibility policy honoured, a docs/07 sentence bound by a census) has nothing to read until the record
 * ships; no record is faked here. T1 binds it: the census reds with ACCEPTANCE the moment the vendored release spells it.
 * OVER-READS (disclosed; none today): any "observer ... boundary" prose reads as a mention, a heading or list break between
 * the words included. SCOPE: files git ignores (node_modules/, .forge/ and the rest of .gitignore) and files deleted from
 * the worktree are not listed; Furnace's own repository is never read (the gate is a release Pi vendors).
 * READS (contacts): every listed file (Z2), git objects at the filing pin (Z1), the tracker export rows of wb-dqf.1 and
 * wb-dqf.2, docs/workbench/09, package.json, package-lock.json, vendor/furnace-sdk-0.1.0.tgz, the structure of
 * src/workbench/furnace-observer.ts (W, Z3) and src/workbench/furnace-control.ts's calls (Q8).
 *
 * Display paths added: none (test-only; src/ is read, never edited). Scratch: none - every plant is an in-memory entry judged
 * by the same call as the real files; nothing is written to disk.
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { gunzipSync } from "node:zlib";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const BEAD = "wb-dqf.1";
const SIBLING = "wb-dqf.2";
const EXPORT = ".beads/issues.jsonl";
const TRACKER = ".beads/";
const CENSUS_FILE = "test/workbench-furnace-observer-boundary-census.test.ts";
const ROSTER_FILE = "test/fixtures/furnace-observer-boundary-roster.json";
const HOLDERS: readonly string[] = [CENSUS_FILE, ROSTER_FILE];
/** This file's own path: a copy run from another path excludes itself beside the named holders. */
const SELF = relative(REPO, fileURLToPath(import.meta.url)).split("\\").join("/");
const OBSERVER = "src/workbench/furnace-observer.ts";
const CONTROL = "src/workbench/furnace-control.ts";
const IDENTITY = "src/workbench/identity.ts";
const SCHEMA_LITERAL = "workflow-script/v1";
const DOCS09 = "docs/workbench/09-observation-and-provenance.md";
const DOCS09_SECTION = "## Experimental projection implementation";
const SDK = "@furnace/sdk";
const TARBALL = "vendor/furnace-sdk-0.1.0.tgz";
const LOCK_KEY = "node_modules/@furnace/sdk";
const FILING_PIN = "b21beb0f89ad49500069403c4815d58f2825b414";
const RECORD = "FurnaceObserverBoundaryV0";
const SIBLING_RECORD = "FurnaceAttemptCapabilityV0";
/** The export's dash: the six characters of a JSON escape, kept literally in the title text. */
const DASH = "\\u2014";
const RECORDED_STATUS = "a proposed source-owned reference, not shipped";
const ACCEPTANCE =
  "Acceptance on landing: a hermetic fixture feeds a boundary record through the Furnace observer and asserts only the exposed fields/counters are projected, non-exposed fields are withheld as typed absence (never invented), and client decisions honour the stated visibility policy; a docs-07 Furnace-provider sentence names the boundary and joins the wb-6hb.11-style census.";
/** The title's armed clause: it binds when the record ships, so it has no judged row today (ARMED HALF PENDING). */
const ARMED = `Pi's Furnace observer shall consume it as an admitted observer strictly within the boundary ${DASH} reading only the attempt state/log fields and resource counters it exposes, under its stated visibility policy for admitted client decisions`;
/** A mention of the record: its own middle words, any non-alphanumeric run between them, any case (THE JUDGE). */
const MENTION = /observer(?:s|['\u2019]s|s['\u2019])?[^\p{L}\p{N}]*boundar(?:y|ies)/giu;
const MENTION_ONE = new RegExp(MENTION.source, "iu");
const SCRIPT = /\.(?:[cm]?[jt]sx?)$/;
const JSON_FILE = /\.json$/;
const MARKUP = /\.(?:md|html?|xml|svg)$/;
const FLOORS = { piFiles: 900, piScripts: 650, piBinaries: 3, sdkEntries: 100, pinFiles: 700 } as const;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster and, for T, W and Z, to the bead's export title. */
const ROWS: readonly Row[] = [
  { id: "T", label: "When Furnace ships FurnaceObserverBoundaryV0 (proposed, not shipped)", pins: ["T1", "T2", "T3"] },
  { id: "W", label: "never widening today's bounded read-only polling", pins: ["W1", "W2", "W3"] },
  { id: "Z", label: "until then zero Pi mentions of the record", pins: ["Z1", "Z2", "Z3"] },
  { id: "Q", label: "the residuals: each named family pinned by its quiet row", pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"] },
];
/** Each judged pin's quote: the quotes of a row tile its label (the anchor case). */
const QUOTES: Readonly<Record<string, string>> = {
  T1: "When Furnace ships",
  T2: "FurnaceObserverBoundaryV0",
  T3: "(proposed, not shipped)",
  W1: "never widening",
  W2: "today's bounded",
  W3: "read-only polling",
  Z1: "until then",
  Z2: "zero Pi mentions",
  Z3: "of the record",
};
/** Each quoted pin's claims: terms tiling its quote, each naming the witness facts that show it. */
const CLAIMS: Readonly<Record<string, Readonly<Record<string, readonly string[]>>>> = {
  T1: { When: ["fired", "sdkMentions"], Furnace: ["package", "version", "observerTypesDeclared"], ships: ["entriesAtFloor", "skippedEntries", "binaryEntries", "sdkPlant"] },
  T2: { FurnaceObserverBoundaryV0: ["record", "releaseForms"] },
  T3: {
    proposed: ["recordedStatus"],
    "not shipped": ["spec", "lockResolved", "lockVersion", "lockIntegrityMatches", "tarballName", "tarballVersion", "tarballSha256"],
  },
  W1: { never: ["widenedPlant"], widening: ["interfaceName", "interfaceDeclarations", "interfaceExtends", "clientParameterTypes", "readPaths", "docsReads", "pairs"] },
  W2: { "today's": ["calls"], bounded: ["pollBounds", "unboundedPlant"] },
  W3: {
    "read-only": ["clientChains", "unchainedClientUses", "sdkRuntimeImports", "closeReads", "excludedVerbs", "excludedVerbCalls", "controlPlant"],
    polling: ["ownership"],
  },
  Z1: { "until then": ["triggerFired", "filingPin", "filedAtPin", "absentBeforePin", "pinFilesAtFloor", "pinMentions", "pinPlant"] },
  Z2: { zero: ["piMentions"], Pi: ["scope", "filesAtFloor", "scriptsAtFloor", "binariesAtFloor", "liveness"], mentions: ["piPlants"] },
  Z3: { "of the record": ["recordWords", "spellingForms", "piIdentifiersQuiet", "siblingQuiet"] },
};
/** Each residual family and its quiet row. */
const RESIDUALS: Readonly<Record<string, string>> = {
  "R-TRACKER": "Q1",
  "R-HOLDER": "Q2",
  "R-BINARY": "Q3",
  "R-PARAPHRASE": "Q4",
  "R-WORD-ORDER": "Q5",
  "R-INTERIOR": "Q6",
  "R-COMPUTED": "Q7",
  "R-OTHER-MODULE": "Q8",
  "R-COMPUTED-ACCESS": "Q9",
};

interface RosterPin {
  readonly id: string;
  readonly quote: string | null;
  readonly claims: JsonObject | null;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: JsonObject;
  readonly tests: readonly string[];
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  if (value === null || typeof value === "boolean" || typeof value === "number" || typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(json);
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, member]) => [key, json(member)]));
  throw new Error(`not a JSON value: ${typeof value}`);
}
function objectOf(value: unknown, field: string): JsonObject {
  const parsed = json(value);
  if (!isObject(parsed)) throw new Error(`${field} must be an object`);
  return parsed as JsonObject;
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Array.isArray(raw.rows) || !Array.isArray(raw.tests)) {
    throw new Error("roster must be an object with bead, constants, tests and rows");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      const quote = typeof pin.quote === "string" ? pin.quote : null;
      const claims = isObject(pin.claims) ? objectOf(pin.claims, `roster rows[${index}].pins[${at}].claims`) : null;
      return { id: pin.id, quote, claims, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const tests = raw.tests.map((title: unknown, index: number): string => {
    if (typeof title !== "string") throw new Error(`roster tests[${index}] must be a string`);
    return title;
  });
  return { bead: raw.bead, constants: objectOf(raw.constants, "roster constants"), tests, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function lazy<T>(make: () => T): () => T {
  let held: { readonly value: T } | undefined;
  return () => {
    if (held === undefined) held = { value: make() };
    return held.value;
  };
}
function git(args: readonly string[], input?: string): Buffer {
  return execFileSync("git", ["-C", REPO, ...args], { input, maxBuffer: 1024 * 1024 * 1024 });
}
function textOf(path: string): string {
  return readFileSync(join(REPO, path), "utf8");
}
function sorted(values: Iterable<string>): string[] {
  return [...new Set(values)].sort();
}
function escaped(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface ExportRow {
  readonly title: string;
  readonly notes: string;
}
/** One row of the tracker export (one JSON object per line), found by its id. */
function exportRow(id: string, text: string = textOf(EXPORT)): ExportRow {
  for (const line of text.split("\n")) {
    if (!line.includes(id)) continue;
    const parsed: unknown = JSON.parse(line);
    if (isObject(parsed) && parsed.id === id && typeof parsed.title === "string") return { title: parsed.title, notes: typeof parsed.notes === "string" ? parsed.notes : "" };
  }
  throw new Error(`the tracker export holds no row ${id}`);
}
/** The words of a camel-case record name: Furnace, Observer, Boundary, V0. */
function recordWords(name: string): string[] {
  return name.match(/[A-Z][a-z]+|[A-Z]\d+|[A-Z]+(?![a-z])/g) ?? [];
}
/** MENTION's source, rebuilt from the record's own middle words (the anchor case compares the two). */
function mentionSource(words: readonly string[]): string {
  const first = (words[1] ?? "-").toLowerCase();
  const second = (words[2] ?? "-").toLowerCase();
  return `${first}(?:s|['\\u2019]s|s['\\u2019])?[^\\p{L}\\p{N}]*${second.replace(/y$/, "")}(?:y|ies)`;
}
/** The quotes tile the text in order, with nothing but separators between them (and after the last). */
function tiles(text: string, quotes: readonly string[], separators: RegExp = /^[\s,;:.()]*$/): boolean {
  let at = 0;
  for (const quote of quotes) {
    const found = text.indexOf(quote, at);
    if (quote === "" || found < 0 || !separators.test(text.slice(at, found))) return false;
    at = found + quote.length;
  }
  return separators.test(text.slice(at));
}
const TITLE_SEPARATORS = new RegExp(`^(?:[\\s,;:.()]|${escaped(DASH)})*$`);

type Form = "raw" | "cooked" | "folded" | "decoded" | "path";
interface Entry {
  readonly path: string;
  readonly bytes: Buffer;
}
interface ScopeVerdict {
  readonly files: number;
  readonly scripts: number;
  readonly binaries: readonly string[];
  readonly findings: { readonly [path: string]: readonly Form[] };
}
function entry(path: string, text: string): Entry {
  return { path, bytes: Buffer.from(text, "utf8") };
}
function mentions(text: string): boolean {
  return MENTION_ONE.test(text);
}
/** A script's cooked and folded units: each string-like literal, each template part, each all-literal "+" chain. */
function scriptUnits(path: string, text: string): { readonly form: Form; readonly text: string }[] {
  const kind = /x$/.test(path) ? ts.ScriptKind.TSX : /\.[cm]?js$/.test(path) ? ts.ScriptKind.JS : ts.ScriptKind.TS;
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind);
  const units: { form: Form; text: string }[] = [];
  const isPlus = (node: ts.Node): node is ts.BinaryExpression => ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken;
  const folded = (node: ts.Expression): string | undefined => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isParenthesizedExpression(node)) return folded(node.expression);
    if (isPlus(node)) {
      const left = folded(node.left);
      const right = folded(node.right);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) units.push({ form: "cooked", text: node.text });
    else if (ts.isTemplateExpression(node)) {
      units.push({ form: "cooked", text: node.head.text });
      for (const span of node.templateSpans) units.push({ form: "cooked", text: span.literal.text });
    } else if (isPlus(node) && !isPlus(node.parent)) {
      const value = folded(node);
      if (value !== undefined) units.push({ form: "folded", text: value });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return units;
}
/** A JSON file's keys and string values, each by its parsed (unescaped) text; an unparseable file yields none. */
function jsonUnits(text: string): string[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  const units: string[] = [];
  const walk = (value: unknown): void => {
    if (typeof value === "string") units.push(value);
    else if (Array.isArray(value)) for (const member of value) walk(member);
    else if (isObject(value))
      for (const [key, member] of Object.entries(value)) {
        units.push(key);
        walk(member);
      }
  };
  walk(parsed);
  return units;
}
const NAMED_ENTITIES: Readonly<Record<string, string>> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: String.fromCodePoint(0xa0) };
/** A markup file's text with its numeric character references and the common named entities decoded. */
function decodedMarkup(text: string): string {
  return text.replace(/&(?:#(\d+)|#x([0-9a-f]+)|(\w+));/gi, (whole, decimal: string | undefined, hex: string | undefined, name: string | undefined) => {
    const code = decimal !== undefined ? Number.parseInt(decimal, 10) : hex !== undefined ? Number.parseInt(hex, 16) : undefined;
    if (code !== undefined) return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    return NAMED_ENTITIES[(name ?? "").toLowerCase()] ?? whole;
  });
}
/** One file's verdict: binary (a NUL byte, not read) or the sorted forms in which a mention was read. */
function verdictOf(path: string, bytes: Buffer): { readonly binary: boolean; readonly forms: readonly Form[] } {
  const forms = new Set<Form>();
  if (mentions(path)) forms.add("path");
  if (bytes.includes(0)) return { binary: true, forms: [...forms].sort() };
  const text = bytes.toString("utf8");
  if (mentions(text)) forms.add("raw");
  if (SCRIPT.test(path)) for (const unit of scriptUnits(path, text)) if (mentions(unit.text)) forms.add(unit.form);
  if (JSON_FILE.test(path) && jsonUnits(text).some(mentions)) forms.add("cooked");
  if (MARKUP.test(path) && mentions(decodedMarkup(text))) forms.add("decoded");
  return { binary: false, forms: [...forms].sort() };
}
/** Judges an entry list in one call: the real entries first, then any planted ones. */
function judgeScope(entries: Iterable<Entry>): ScopeVerdict {
  let files = 0;
  let scripts = 0;
  const binaries: string[] = [];
  const findings: { [path: string]: Form[] } = {};
  for (const { path, bytes } of entries) {
    files += 1;
    const verdict = verdictOf(path, bytes);
    if (verdict.forms.length > 0) findings[path] = [...verdict.forms];
    if (verdict.binary) {
      binaries.push(path);
      continue;
    }
    if (SCRIPT.test(path)) scripts += 1;
  }
  return { files, scripts, binaries, findings };
}
function findingsFor(verdict: ScopeVerdict, paths: readonly string[], within: boolean): { [path: string]: Form[] } {
  return Object.fromEntries(Object.entries(verdict.findings).filter(([path]) => paths.includes(path) === within).map(([path, forms]) => [path, [...forms]]));
}

/** The regular-file entries of a gzip tar, plus the kinds it skips (anything but a regular file). */
function tarEntries(gz: Buffer): { readonly entries: Entry[]; readonly skipped: string[] } {
  const tar = gunzipSync(gz);
  const entries: Entry[] = [];
  const skipped: string[] = [];
  for (let at = 0; at + 512 <= tar.length; ) {
    const header = tar.subarray(at, at + 512);
    if (header.every(byte => byte === 0)) break;
    const field = (start: number, end: number): string => {
      const raw = header.subarray(start, end);
      const nul = raw.indexOf(0);
      return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
    };
    const name = field(0, 100);
    const prefix = field(345, 500);
    const size = Number.parseInt(field(124, 136).trim() || "0", 8);
    const type = field(156, 157);
    const path = prefix === "" ? name : `${prefix}/${name}`;
    if (type === "0" || type === "") entries.push({ path, bytes: Buffer.from(tar.subarray(at + 512, at + 512 + size)) });
    else skipped.push(`${type}:${path}`);
    at += 512 + Math.ceil(size / 512) * 512;
  }
  return { entries, skipped };
}
/** The vendored release package.json resolves the SDK to (a file: spec), read by its own path. */
function vendoredPath(): string {
  const pkg: unknown = JSON.parse(textOf("package.json"));
  const spec = isObject(pkg) && isObject(pkg.dependencies) ? pkg.dependencies[SDK] : undefined;
  return typeof spec === "string" && spec.startsWith("file:") ? spec.slice("file:".length) : "-";
}
const tarball = lazy((): Buffer => readFileSync(join(REPO, vendoredPath())));
const sdkRelease = lazy(() => tarEntries(tarball()));

/** The record's release forms, each planted as an entry of the vendored release (T1, T2). */
const SDK_PLANTS: Readonly<Record<string, Entry>> = {
  declaration: entry("package/dist/src/zz-plant-declaration.d.ts", "export interface FurnaceObserverBoundaryV0 {\n  readonly exposedFields: readonly string[];\n}\n"),
  runtimeExport: entry("package/dist/src/zz-plant-runtime.js", "export const OBSERVER_BOUNDARY_V0 = Object.freeze({ version: 0 });\n"),
  schemaId: entry("package/contract/registry/zz-boundary.json", '{ "$id": "furnace.observer-boundary.v0" }\n'),
  registryKey: entry("package/contract/zz-manifest.json", '{ "records": { "observerBoundaryV0": { "shipped": true } } }\n'),
  docsHeading: entry("package/zz-README.md", "## Observer boundary (V0)\n\nThe record an admitted observer reads.\n"),
  escapedString: entry("package/dist/src/zz-escaped.js", 'export const NAME = "\\u004fbserverBoundaryV0";\n'),
  escapedJson: entry("package/contract/zz-escaped.json", '{ "$id": "furnace.\\u006fbserver-boundary.v0" }\n'),
};
const sdkVerdict = lazy((): ScopeVerdict => judgeScope([...sdkRelease().entries, ...Object.values(SDK_PLANTS)]));

/** The listed Pi files: tracked plus untracked-not-ignored, minus the tracker export and the holders. */
interface PiListing {
  readonly paths: readonly string[];
  readonly excluded: readonly string[];
}
const piListing = lazy((): PiListing => {
  const listed = sorted(git(["ls-files", "-z", "--cached", "--others", "--exclude-standard"]).toString("utf8").split("\0").filter(Boolean));
  const holders = new Set([...HOLDERS, SELF]);
  const excluded = listed.filter(path => path.startsWith(TRACKER) || holders.has(path));
  return { paths: listed.filter(path => !excluded.includes(path) && existsSync(join(REPO, path))), excluded };
});
/** One planted entry per reading: cooked (escape-spelled), folded (split literal), raw in markdown, JSON and a comment. */
const PI_PLANTS: Readonly<Record<string, string>> = {
  "src/workbench/zz-boundary-escaped.ts": 'export const RECORD_NAME = "\\u0046urnaceObserver\\u0042oundaryV0";\n',
  "src/workbench/zz-boundary-split.ts": 'export const SPELLED = "Furnace" + "Obs" + "erverBoundaryV0";\n',
  "docs/workbench/zz-boundary.md": "# Plant\n\nThe Furnace observer boundary record is consumed here.\n",
  "test/fixtures/zz-boundary.json": '{ "record": "furnace_observer_boundary_v0" }\n',
  "qa/zz-boundary.mjs": "// reads FurnaceObserverBoundaryV0\nexport {};\n",
  "test/fixtures/zz-boundary-escaped.json": '{ "record": "Furnace\\u004fbserver\\u0042oundaryV0" }\n',
  "docs/workbench/zz-boundary-entity.md": "The Furnace &#79;bserver&#32;Boundary record.\n",
  "docs/workbench/zz-observer-boundary.md": "# Plant\n\nThis page's text names nothing.\n",
};
const piVerdict = lazy((): ScopeVerdict => {
  const { paths } = piListing();
  const real = paths.map(path => ({ path, bytes: readFileSync(join(REPO, path)) }));
  return judgeScope([...real, ...Object.entries(PI_PLANTS).map(([path, text]) => entry(path, text))]);
});

/** The blobs of a commit's paths, read through one git cat-file --batch call. */
function blobsAt(commit: string, paths: readonly string[]): Entry[] {
  const out = git(["cat-file", "--batch"], `${paths.map(path => `${commit}:${path}`).join("\n")}\n`);
  const entries: Entry[] = [];
  let at = 0;
  for (const path of paths) {
    const end = out.indexOf(0x0a, at);
    const header = out.subarray(at, end).toString("utf8");
    const match = /^[0-9a-f]{40,64} blob (\d+)$/.exec(header);
    if (match === null) throw new Error(`git cat-file --batch ${commit}:${path}: ${header}`);
    const size = Number(match[1]);
    entries.push({ path, bytes: Buffer.from(out.subarray(end + 1, end + 1 + size)) });
    at = end + 1 + size + 1;
  }
  return entries;
}
const PIN_PLANT = "docs/workbench/zz-pin-plant.md";
const pinVerdict = lazy((): ScopeVerdict => {
  const paths = git(["ls-tree", "-r", "-z", "--name-only", FILING_PIN]).toString("utf8").split("\0").filter(path => path !== "" && !path.startsWith(TRACKER));
  return judgeScope([...blobsAt(FILING_PIN, paths), entry(PIN_PLANT, "Pi reads the furnace-observer-boundary record.\n")]);
});

function parse(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
function nodes(root: ts.Node): ts.Node[] {
  const all: ts.Node[] = [];
  const visit = (node: ts.Node): void => {
    all.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return all;
}
function memberName(name: ts.PropertyName | undefined): string {
  return name !== undefined && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : "<computed>";
}
/** Every declaration of a named interface in a module (declaration merging adds members). */
function interfaceDeclarations(source: ts.SourceFile, name: string): ts.InterfaceDeclaration[] {
  return nodes(source).filter((node): node is ts.InterfaceDeclaration => ts.isInterfaceDeclaration(node) && node.name.text === name);
}
/** The read paths a client interface declares over all its declarations, each member chain down to a leaf (runs.get.status). */
function declaredReads(source: ts.SourceFile, name: string): string[] | null {
  const declarations = interfaceDeclarations(source, name);
  if (declarations.length === 0) return null;
  const paths: string[] = [];
  const walk = (members: ts.NodeArray<ts.TypeElement>, prefix: readonly string[]): void => {
    for (const member of members) {
      const key = [...prefix, memberName(member.name)];
      const type = ts.isPropertySignature(member) || ts.isMethodSignature(member) ? member.type : undefined;
      if (type !== undefined && ts.isTypeLiteralNode(type)) walk(type.members, key);
      else paths.push(key.join("."));
    }
  };
  for (const declaration of declarations) walk(declaration.members, []);
  return paths.sort();
}
/** The heritage (extends) names of a named interface, over all its declarations. */
function interfaceHeritage(source: ts.SourceFile, name: string): string[] {
  return sorted(interfaceDeclarations(source, name).flatMap(declaration => (declaration.heritageClauses ?? []).flatMap(clause => clause.types.map(type => type.expression.getText()))));
}
/** The type text of each constructor parameter named client, in every class of a module. */
function clientParameterTypes(source: ts.SourceFile): string[] {
  return nodes(source)
    .filter((node): node is ts.ParameterDeclaration => ts.isParameter(node) && ts.isConstructorDeclaration(node.parent) && ts.isIdentifier(node.name) && node.name.text === "client")
    .map(node => node.type?.getText() ?? "<untyped>");
}
function unwrap(node: ts.Expression): ts.Expression {
  let current = node;
  while (ts.isParenthesizedExpression(current) || ts.isNonNullExpression(current) || ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}
/** `this.client` or `this["client"]`, through parentheses and type assertions. */
function isClientRoot(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) return unwrap(node.expression).kind === ts.SyntaxKind.ThisKeyword && node.name.text === "client";
  if (ts.isElementAccessExpression(node)) return unwrap(node.expression).kind === ts.SyntaxKind.ThisKeyword && ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === "client";
  return false;
}
/** The member chain below the client root (calls are transparent): runs.get(id).status(...) -> runs, get, status. */
function chainOf(node: ts.Expression): string[] | undefined {
  if (isClientRoot(node)) return [];
  if (ts.isPropertyAccessExpression(node)) {
    const base = chainOf(node.expression);
    return base === undefined ? undefined : [...base, node.name.text];
  }
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression)) {
    const base = chainOf(node.expression);
    return base === undefined ? undefined : [...base, node.argumentExpression.text];
  }
  if (ts.isCallExpression(node)) return chainOf(node.expression);
  if (unwrap(node) !== node) return chainOf(unwrap(node));
  return undefined;
}
/** The node a chain continues into: a member access, a call or a wrapper whose operand is this node. */
function continues(node: ts.Node): ts.Node | undefined {
  const parent = node.parent;
  if ((ts.isPropertyAccessExpression(parent) || ts.isElementAccessExpression(parent) || ts.isCallExpression(parent)) && parent.expression === node) return parent;
  if ((ts.isParenthesizedExpression(parent) || ts.isNonNullExpression(parent) || ts.isAsExpression(parent) || ts.isSatisfiesExpression(parent)) && parent.expression === node) return parent;
  return undefined;
}
interface ClientRead {
  readonly path: string;
  readonly timeoutMs: string | null;
  readonly limit: string | null;
  readonly inClose: boolean;
}
interface ClientUse {
  readonly reads: readonly ClientRead[];
  readonly unchained: number;
}
function propertyText(call: ts.CallExpression, key: string): string | null {
  for (const argument of call.arguments) {
    if (!ts.isObjectLiteralExpression(argument)) continue;
    for (const property of argument.properties) {
      if (ts.isPropertyAssignment(property) && memberName(property.name) === key) return property.initializer.getText();
      if (ts.isShorthandPropertyAssignment(property) && property.name.text === key) return property.name.text;
    }
  }
  return null;
}
function insideMethod(node: ts.Node, name: string): boolean {
  for (let current: ts.Node | undefined = node.parent; current !== undefined; current = current.parent) if (ts.isMethodDeclaration(current) && memberName(current.name) === name) return true;
  return false;
}
/** Every use of the client: a use that ends in a call of a non-empty chain is a read; any other use is unchained. */
function clientUses(source: ts.SourceFile): ClientUse {
  const reads: ClientRead[] = [];
  let unchained = 0;
  for (const root of nodes(source).filter(isClientRoot)) {
    let top: ts.Node = root;
    for (let next = continues(top); next !== undefined; next = continues(top)) top = next;
    const chain = ts.isCallExpression(top) ? chainOf(top) : undefined;
    if (chain === undefined || chain.length === 0 || !ts.isCallExpression(top)) {
      unchained += 1;
      continue;
    }
    reads.push({ path: chain.join("."), timeoutMs: propertyText(top, "timeoutMs"), limit: propertyText(top, "limit"), inClose: insideMethod(top, "close") });
  }
  return { reads, unchained };
}
/** The `limits.<name>` budgets a method's for-loop condition reads. */
function loopBounds(source: ts.SourceFile, method: string): string[] {
  const body = nodes(source).find((node): node is ts.MethodDeclaration => ts.isMethodDeclaration(node) && memberName(node.name) === method);
  const loop = body === undefined ? undefined : nodes(body).find((node): node is ts.ForStatement => ts.isForStatement(node));
  if (loop?.condition === undefined) return [];
  return sorted(
    nodes(loop.condition)
      .filter((node): node is ts.PropertyAccessExpression => ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "limits")
      .map(node => `limits.${node.name.text}`),
  );
}
/** Names imported from a module at runtime (a value import, a side-effect import, a dynamic import or a require). */
function runtimeImports(source: ts.SourceFile, module: string): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.moduleSpecifier.text === module) {
      const clause = node.importClause;
      if (clause === undefined) names.push("<side-effect>");
      else if (!clause.isTypeOnly) {
        if (clause.name !== undefined) names.push(clause.name.text);
        const bindings = clause.namedBindings;
        if (bindings !== undefined && ts.isNamespaceImport(bindings)) names.push(`* as ${bindings.name.text}`);
        if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) if (!element.isTypeOnly) names.push(element.name.text);
      }
    }
    if (ts.isCallExpression(node) && node.arguments.length > 0) {
      const first = node.arguments[0];
      const dynamic = node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require");
      if (dynamic && first !== undefined && ts.isStringLiteralLike(first) && first.text === module) names.push("<dynamic>");
    }
  }
  return names.sort();
}
/** Names a module imports from a module (types included), in source order. */
function importedNames(source: ts.SourceFile, module: string): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier) || node.moduleSpecifier.text !== module) continue;
    const bindings = node.importClause?.namedBindings;
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) names.push((element.propertyName ?? element.name).text);
  }
  return names;
}
/** Calls whose callee name is one of the verbs (a member call or a bare call). */
function verbCalls(source: ts.SourceFile, verbs: readonly string[]): string[] {
  const calls: string[] = [];
  for (const node of nodes(source)) {
    if (!ts.isCallExpression(node)) continue;
    const callee = unwrap(node.expression);
    const name = ts.isPropertyAccessExpression(callee) ? callee.name.text : ts.isIdentifier(callee) ? callee.text : undefined;
    if (name !== undefined && verbs.includes(name)) calls.push(name);
  }
  return calls.sort();
}
/** Every `ownership` value the module states: property assignments and literal-typed property signatures. */
function ownershipValues(source: ts.SourceFile): string[] {
  const values: string[] = [];
  for (const node of nodes(source)) {
    if (ts.isPropertyAssignment(node) && memberName(node.name) === "ownership" && ts.isStringLiteralLike(node.initializer)) values.push(node.initializer.text);
    if (ts.isPropertySignature(node) && memberName(node.name) === "ownership" && node.type !== undefined && ts.isLiteralTypeNode(node.type) && ts.isStringLiteral(node.type.literal)) values.push(node.type.literal.text);
  }
  return sorted(values);
}
/** The declared names of a module (interfaces, classes, types, functions, variables). */
function declaredNames(source: ts.SourceFile): string[] {
  const names: string[] = [];
  for (const node of nodes(source)) {
    if ((ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node) || ts.isTypeAliasDeclaration(node) || ts.isFunctionDeclaration(node)) && node.name !== undefined) names.push(node.name.text);
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) names.push(node.name.text);
  }
  return sorted(names);
}
/** Replaces one exact span of the real observer text; a span the source no longer holds reds the plant itself. */
function planted(text: string, from: string, to: string): string {
  expect(text.includes(from), `the observer still holds the plant's anchor span ${JSON.stringify(from)}`).toBe(true);
  return text.replace(from, to);
}
/** docs/09's Experimental projection section, from its heading to the next level-2 heading. */
function docs09Section(): string {
  const text = textOf(DOCS09);
  const start = text.indexOf(`\n${DOCS09_SECTION}\n`);
  if (start < 0) return "";
  const next = text.indexOf("\n## ", start + 1);
  return text.slice(start + 1, next < 0 ? text.length : next);
}
/** The reads and the excluded verbs docs/09's Furnace sentence states. */
function docs09Furnace(): { readonly reads: string[]; readonly verbs: string[] } {
  const section = docs09Section();
  const reads = /The external Furnace reader uses explicit bounded (\S+) polling\./.exec(section)?.[1]?.split("/") ?? [];
  const verbs = /Pi attachment is read-only and does not (.+?) a Run\./.exec(section)?.[1]?.split(/, | or /) ?? [];
  return { reads, verbs };
}
/** Pairs each docs read with the declared path naming it (status, attempt(s), log(s)); a read with no or two paths is unpaired. */
function pairReads(reads: readonly string[], paths: readonly string[]): string[][] {
  return reads.map(read => {
    const stem = read.split("-")[0] ?? read;
    const named = paths.filter(path => path.split(".").some(segment => segment === stem || segment === `${stem}s`));
    return named.length === 1 ? [read, named[0] ?? "-"] : [read, `<${named.length} paths>`];
  });
}
const observerText = lazy((): string => textOf(OBSERVER));
const observer = lazy((): ts.SourceFile => parse(OBSERVER, observerText()));

/** The pins that reached their witness compare, in run order, each with the compare's own result. */
const REACHED: { pin: string; same: boolean }[] = [];
/** Each pin's live witness, for the claims check of the closing case. */
const LIVE = new Map<string, JsonValue>();

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => JsonValue>> = {
  T1: () => {
    const release = sdkRelease();
    const verdict = sdkVerdict();
    const plantPaths = Object.values(SDK_PLANTS).map(plant => plant.path);
    const real = findingsFor(verdict, plantPaths, false);
    expect(real, `ARMED: the vendored ${SDK} (${TARBALL}) now spells ${RECORD}; the until-then duty of ${BEAD} ends and the acceptance on landing is owed - ${ACCEPTANCE}`).toEqual({});
    expect(release.entries.length, "the release entries were read").toBeGreaterThanOrEqual(FLOORS.sdkEntries);
    const manifest = release.entries.find(item => item.path === "package/package.json");
    const pkg: unknown = JSON.parse(manifest?.bytes.toString("utf8") ?? "{}");
    const declarations = release.entries.filter(item => item.path.endsWith(".d.ts")).map(item => item.bytes.toString("utf8"));
    const declared = (name: string): boolean =>
      declarations.some(text => new RegExp(`export (?:declare )?(?:interface|type|class|const|function|enum) ${escaped(name)}\\b|export (?:type )?\\{[^}]*\\b${escaped(name)}\\b[^}]*\\}`).test(text));
    const observerTypes = importedNames(observer(), SDK);
    expect(observerTypes.length, "the observer imports its types from the SDK").toBeGreaterThanOrEqual(1);
    expect(observerTypes.filter(name => !declared(name)), "every type the observer imports is declared by the vendored release").toEqual([]);
    return json({
      fired: Object.keys(real).length > 0,
      sdkMentions: real,
      package: isObject(pkg) && typeof pkg.name === "string" ? pkg.name : null,
      version: isObject(pkg) && typeof pkg.version === "string" ? pkg.version : null,
      observerTypesDeclared: observerTypes.every(declared),
      entriesAtFloor: release.entries.length >= FLOORS.sdkEntries,
      skippedEntries: release.skipped,
      binaryEntries: verdict.binaries.filter(path => !plantPaths.includes(path)),
      sdkPlant: findingsFor(verdict, [SDK_PLANTS.declaration?.path ?? "-"], true),
    });
  },
  T2: () => {
    const verdict = sdkVerdict();
    const forms = Object.fromEntries(Object.entries(SDK_PLANTS).map(([form, plant]) => [form, verdict.findings[plant.path] ?? []]));
    expect(Object.entries(forms).filter(([, found]) => found.length === 0).map(([form]) => form), "every release form of the record is read").toEqual([]);
    return json({ record: RECORD, releaseForms: forms });
  },
  T3: () => {
    const bytes = tarball();
    const pkg: unknown = JSON.parse(textOf("package.json"));
    const lock: unknown = JSON.parse(textOf("package-lock.json"));
    const lockEntry = isObject(lock) && isObject(lock.packages) ? lock.packages[LOCK_KEY] : undefined;
    const deps = isObject(pkg) && isObject(pkg.dependencies) ? pkg.dependencies : {};
    const manifest = sdkRelease().entries.find(item => item.path === "package/package.json");
    const shipped: unknown = JSON.parse(manifest?.bytes.toString("utf8") ?? "{}");
    const integrity = `sha512-${createHash("sha512").update(bytes).digest("base64")}`;
    const notes = exportRow(BEAD).notes;
    expect(notes.includes(`Gating artifact: ${RECORD}, ${RECORDED_STATUS}`), "the owner's recorded status of the record").toBe(true);
    expect(vendoredPath(), "package.json resolves the SDK to the release this census reads").toBe(TARBALL);
    return json({
      recordedStatus: RECORDED_STATUS,
      spec: deps[SDK] ?? null,
      lockResolved: isObject(lockEntry) ? (lockEntry.resolved ?? null) : null,
      lockVersion: isObject(lockEntry) ? (lockEntry.version ?? null) : null,
      lockIntegrityMatches: isObject(lockEntry) && lockEntry.integrity === integrity,
      tarballName: isObject(shipped) ? (shipped.name ?? null) : null,
      tarballVersion: isObject(shipped) ? (shipped.version ?? null) : null,
      tarballSha256: createHash("sha256").update(bytes).digest("hex").slice(0, 16),
    });
  },
  W1: () => {
    const readPaths = declaredReads(observer(), "FurnaceObserverClient");
    const { reads } = docs09Furnace();
    const pairs = pairReads(reads, readPaths ?? []);
    expect(pairs.filter(pair => (pair[1] ?? "").startsWith("<")), "every docs/09 read names exactly one declared path").toEqual([]);
    expect(sorted(pairs.map(pair => pair[1] ?? "")), "every declared path is a docs/09 read, one to one").toEqual(readPaths);
    const widened = parse(
      OBSERVER,
      planted(observerText(), "status(call?:{timeoutMs?:number}):Promise<Response<RunStatusDto>>}", "status(call?:{timeoutMs?:number}):Promise<Response<RunStatusDto>>;events(call?:{timeoutMs?:number}):AsyncIterable<unknown>}"),
    );
    const widenedPlant = (declaredReads(widened, "FurnaceObserverClient") ?? []).filter(path => !(readPaths ?? []).includes(path));
    expect(widenedPlant, "a widened interface reads as widened").toEqual(["runs.get.events"]);
    return json({
      interfaceName: "FurnaceObserverClient",
      interfaceDeclarations: interfaceDeclarations(observer(), "FurnaceObserverClient").length,
      interfaceExtends: interfaceHeritage(observer(), "FurnaceObserverClient"),
      clientParameterTypes: clientParameterTypes(observer()),
      readPaths,
      docsReads: reads,
      pairs,
      widenedPlant,
    });
  },
  W2: () => {
    const { reads } = clientUses(observer());
    const calls = reads.map(read => ({ path: read.path, timeoutMs: read.timeoutMs, limit: read.limit }));
    expect(calls.filter(call => call.timeoutMs === null).map(call => call.path), "every client read carries a timeoutMs bound").toEqual([]);
    const pollBounds = loopBounds(observer(), "observe");
    const unboundedCall = clientUses(parse(OBSERVER, planted(observerText(), ".status({timeoutMs:limits.callTimeoutMs})", ".status()")))
      .reads.filter(read => read.timeoutMs === null)
      .map(read => read.path);
    const unboundedLoop = loopBounds(parse(OBSERVER, planted(observerText(), "poll<limits.maxPolls&&Date.now()-started<limits.maxElapsedMs", "poll<limits.maxPolls")), "observe");
    expect(unboundedCall, "an unbounded read reads as unbounded").toEqual(["runs.get.status"]);
    return json({ calls, pollBounds, unboundedPlant: { calls: unboundedCall, pollBounds: unboundedLoop } });
  },
  W3: () => {
    const source = observer();
    const uses = clientUses(source);
    const { verbs } = docs09Furnace();
    const control = parse(
      OBSERVER,
      planted(observerText(), "close():void {this.shutdown.abort();this.markStale();}", "close():void {this.shutdown.abort();void this.client.runs.get(this.options.runId).stop();this.markStale();}"),
    );
    const controlUses = clientUses(control);
    expect(uses.unchained, "every client use is a read call").toBe(0);
    return json({
      clientChains: sorted(uses.reads.map(read => read.path)),
      unchainedClientUses: uses.unchained,
      sdkRuntimeImports: runtimeImports(source, SDK),
      closeReads: uses.reads.filter(read => read.inClose).map(read => read.path),
      excludedVerbs: verbs,
      excludedVerbCalls: verbCalls(source, verbs),
      controlPlant: {
        clientChains: sorted(controlUses.reads.map(read => read.path)),
        closeReads: controlUses.reads.filter(read => read.inClose).map(read => read.path),
        excludedVerbCalls: verbCalls(control, verbs),
      },
      ownership: ownershipValues(source),
    });
  },
  Z1: () => {
    const sdkReal = findingsFor(
      sdkVerdict(),
      Object.values(SDK_PLANTS).map(plant => plant.path),
      false,
    );
    const atPin = git(["show", `${FILING_PIN}:${EXPORT}`]).toString("utf8");
    const before = git(["show", `${FILING_PIN}^:${EXPORT}`]).toString("utf8");
    const holds = (text: string): boolean => text.split("\n").some(line => line.includes(`"id":"${BEAD}"`));
    const verdict = pinVerdict();
    return json({
      triggerFired: Object.keys(sdkReal).length > 0,
      filingPin: FILING_PIN.slice(0, 12),
      filedAtPin: holds(atPin),
      absentBeforePin: !holds(before),
      pinFilesAtFloor: verdict.files - 1 >= FLOORS.pinFiles,
      pinMentions: findingsFor(verdict, [PIN_PLANT], false),
      pinPlant: findingsFor(verdict, [PIN_PLANT], true),
    });
  },
  Z2: () => {
    const { paths } = piListing();
    const verdict = piVerdict();
    const plantPaths = Object.keys(PI_PLANTS);
    expect(
      plantPaths.filter(path => paths.includes(path)),
      "no plant path is a listed Pi file",
    ).toEqual([]);
    const real = findingsFor(verdict, plantPaths, false);
    expect(real, `zero Pi mentions of ${RECORD} until it ships`).toEqual({});
    const read = (path: string): string => (paths.includes(path) ? textOf(path) : "");
    return json({
      piMentions: real,
      scope: "listed files minus the tracker export and the holders",
      filesAtFloor: paths.length >= FLOORS.piFiles,
      scriptsAtFloor: verdict.scripts - plantPaths.filter(path => SCRIPT.test(path)).length >= FLOORS.piScripts,
      binariesAtFloor: verdict.binaries.length >= FLOORS.piBinaries,
      liveness: {
        identitySchemaLiteral: read(IDENTITY).includes(`"${SCHEMA_LITERAL}"`),
        docs09Polling: read(DOCS09).includes("explicit bounded status/attempt/log-reference polling"),
        observerClient: read(OBSERVER).includes("export interface FurnaceObserverClient"),
      },
      piPlants: findingsFor(verdict, plantPaths, true),
    });
  },
  Z3: () => {
    const title = exportRow(BEAD).title;
    const record = /When Furnace ships (\S+) \(proposed/.exec(title)?.[1] ?? "-";
    const forms: Readonly<Record<string, string>> = {
      camel: "FurnaceObserverBoundaryV0",
      snake: "furnace_observer_boundary_v0",
      kebab: "furnace-observer-boundary-v0",
      dotted: "furnace.observer.boundary.v0",
      spaced: "Furnace Observer Boundary V0",
      upper: "FURNACE_OBSERVER_BOUNDARY_V0",
      family: "FurnaceObserverBoundary",
      laterVersion: "FurnaceObserverBoundaryV1",
      stem: "the observer boundary",
      possessive: "the observer's boundary",
      plural: "observers' boundaries",
      markup: "Observer**Boundary**",
      lineBreak: "observer\nboundary",
      formJoined: `Observer${String.fromCodePoint(0x200b)}Boundary`,
    };
    const spellingForms = Object.fromEntries(Object.entries(forms).map(([form, text]) => [form, mentions(text)]));
    expect(Object.entries(spellingForms).filter(([, read]) => !read).map(([form]) => form), "every spelling form of the record is read").toEqual([]);
    const own = declaredNames(observer()).filter(name => /observ/i.test(name));
    const sibling = (exportRow(SIBLING).title.match(/\bFurnace\w+V0\b/g) ?? []).filter(name => name !== record);
    expect(own.length, "the observer's own observ-names were read").toBeGreaterThanOrEqual(4);
    expect(own.filter(mentions), "the observer's own identifiers are not the record").toEqual([]);
    expect(sibling.filter(mentions), "the sibling record is not this record").toEqual([]);
    return json({ recordWords: recordWords(record), spellingForms, piIdentifiersQuiet: !own.some(mentions), siblingQuiet: sibling });
  },
  Q1: () => {
    const exportHits = (textOf(EXPORT).match(MENTION) ?? []).length;
    expect(exportHits, "the tracker export spells the record (the bead's own row)").toBeGreaterThanOrEqual(1);
    return json({ residual: "R-TRACKER", exportSpellsRecord: exportHits >= 1, exportListed: piListing().paths.includes(EXPORT), trackerExcluded: piListing().excluded.some(path => path.startsWith(TRACKER)) });
  },
  Q2: () => {
    const spells = HOLDERS.map(path => existsSync(join(REPO, path)) && mentions(textOf(path)));
    return json({ residual: "R-HOLDER", holders: [...HOLDERS], holdersSpellRecord: spells, holdersListed: HOLDERS.filter(path => piListing().paths.includes(path)) });
  },
  Q3: () => {
    const plant = Buffer.concat([Buffer.from([0]), Buffer.from(` ${RECORD} `, "utf8")]);
    const verdict = verdictOf("media/zz-plant.bin", plant);
    return json({ residual: "R-BINARY", plantBinary: verdict.binary, plantForms: [...verdict.forms], realBinariesAtFloor: piVerdict().binaries.length >= FLOORS.piBinaries });
  },
  Q4: () => {
    const constructed = ["Origin to the latest observed boundary.", "the observation boundary of a Run"];
    const binaries = piVerdict().binaries;
    const realLines = piListing()
      .paths.filter(path => !binaries.includes(path))
      .flatMap(path => textOf(path).split("\n"))
      .filter(line => /\bobserv(?:ed|ation)\s+boundar/i.test(line));
    return json({ residual: "R-PARAPHRASE", constructedQuiet: constructed.map(text => !mentions(text)), realParaphrasesQuiet: realLines.every(line => !mentions(line)) });
  },
  Q5: () => json({ residual: "R-WORD-ORDER", quiet: ["the boundary of the observer", "BoundaryObserverV0"].map(text => !mentions(text)) }),
  Q6: () => {
    const interior = {
      formCharacter: `Obs${String.fromCodePoint(0x200b)}erver Boundary`,
      confusable: `${String.fromCodePoint(0x043e)}bserver boundary`,
      entityOutsideMarkup: "// &#79;bserver Boundary",
      markup: "Obs*erver* Boundary",
    };
    return json({ residual: "R-INTERIOR", quiet: Object.fromEntries(Object.entries(interior).map(([kind, text]) => [kind, verdictOf(kind === "entityOutsideMarkup" ? "src/zz.ts" : "docs/zz.md", Buffer.from(text, "utf8")).forms.length === 0])) });
  },
  Q7: () => {
    const computed = {
      substitution: "export const n = `Observer$" + "{part}Boundary`;\n",
      runtimeJoin: 'export const n = ["Obs", "erver", "Boundary"].join("");\n',
      charCode: 'export const n = String.fromCharCode(79) + "bserverBoundary";\n',
    };
    return json({ residual: "R-COMPUTED", quiet: Object.fromEntries(Object.entries(computed).map(([kind, text]) => [kind, verdictOf("src/zz.ts", Buffer.from(text, "utf8")).forms.length === 0])) });
  },
  Q8: () => {
    const { verbs } = docs09Furnace();
    const controlCalls = verbCalls(parse(CONTROL, textOf(CONTROL)), verbs);
    return json({ residual: "R-OTHER-MODULE", judgedModule: OBSERVER, otherModuleCallsExcludedVerbs: controlCalls.length > 0 });
  },
  Q9: () => {
    const computedKey = planted(observerText(), "close():void {this.shutdown.abort();this.markStale();}", 'close():void {const key="cli"+"ent";void (this as unknown as Record<string,unknown>)[key];this.shutdown.abort();this.markStale();}');
    const uses = clientUses(parse(OBSERVER, computedKey));
    return json({ residual: "R-COMPUTED-ACCESS", reads: uses.reads.length, unchained: uses.unchained });
  },
};

describe("wb-dqf.1 Furnace observer-boundary census (FURNACE-CAC-EXECUTION-ASSURANCE-R4, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:3", "W:3", "Z:3", "Q:9"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    const quoted = ROWS.filter(row => row.id !== "Q").flatMap(row => row.pins);
    expect(Object.keys(QUOTES).sort(), "every pin of rows T, W and Z carries a quote").toEqual([...quoted].sort());
    expect(Object.keys(CLAIMS).sort(), "every quoted pin carries claims").toEqual([...quoted].sort());
    expect(
      ROSTER.rows.flatMap(row => row.pins).map(pin => ({ id: pin.id, quote: pin.quote, claims: pin.claims })),
      "the roster holds each pin's quote and claims",
    ).toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => ({ id: pin, quote: QUOTES[pin] ?? null, claims: CLAIMS[pin] === undefined ? null : json(CLAIMS[pin]) })));
    expect(Object.values(RESIDUALS).sort(), "every residual family has its own quiet row").toEqual([...(ROWS.find(row => row.id === "Q")?.pins ?? [])].sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(
      json({
        record: RECORD,
        siblingRecord: SIBLING_RECORD,
        mention: { source: MENTION.source, flags: MENTION.flags },
        script: SCRIPT.source,
        dash: DASH,
        recordedStatus: RECORDED_STATUS,
        acceptance: ACCEPTANCE,
        armed: ARMED,
        tracker: TRACKER,
        holders: [...HOLDERS],
        observer: OBSERVER,
        control: CONTROL,
        identity: IDENTITY,
        schemaLiteral: SCHEMA_LITERAL,
        docs09: DOCS09,
        docs09Section: DOCS09_SECTION,
        sdk: SDK,
        tarball: TARBALL,
        lockKey: LOCK_KEY,
        filingPin: FILING_PIN,
        floors: FLOORS,
        sdkPlants: Object.fromEntries(Object.entries(SDK_PLANTS).map(([form, plant]) => [form, { path: plant.path, text: plant.bytes.toString("utf8") }])),
        piPlants: PI_PLANTS,
        pinPlant: PIN_PLANT,
        residuals: RESIDUALS,
      }),
    ).toStrictEqual(ROSTER.constants);
    for (const [pin, impl] of Object.entries(IMPL)) {
      expect(/\bROSTER\b|rosterWitness|readRoster/.test(impl.toString()), `${pin}'s case reads no roster (SELF-READ)`).toBe(false);
    }
  });

  it("the outside anchors: the bead's export row binds the rows, the quotes, the record, the armed clause, the status and the acceptance; docs/09 binds the reads and the verbs; the filing pin and the sibling row bind their readings", { timeout: 60_000 }, () => {
    const { title, notes } = exportRow(BEAD);
    const id = /^\[(FURNACE-CAC-EXECUTION-ASSURANCE-R\d+)\] /.exec(title);
    expect(id?.[1], "the title opens with the bead's requirement id").toBe("FURNACE-CAC-EXECUTION-ASSURANCE-R4");
    const statement = title.slice(id?.[0].length ?? 0);
    const label = (row: string): string => ROWS.find(entry => entry.id === row)?.label ?? "";
    expect(tiles(statement, [label("T"), ARMED, label("W"), label("Z")], TITLE_SEPARATORS), "rows T, W and Z and the armed clause tile the title, in order").toBe(true);
    for (const row of ROWS.filter(entry => entry.id !== "Q")) {
      expect(tiles(row.label, row.pins.map(pin => QUOTES[pin] ?? "")), `row ${row.id}'s pin quotes tile its label`).toBe(true);
    }
    for (const [pin, claims] of Object.entries(CLAIMS)) expect(tiles(QUOTES[pin] ?? "", Object.keys(claims)), `${pin}'s claim terms tile its quote`).toBe(true);
    const record = /When Furnace ships (\S+) \(proposed, not shipped\)/.exec(statement)?.[1];
    expect(record, "the record is the title's token").toBe(RECORD);
    expect(notes.includes(`Gating artifact: ${RECORD}, ${RECORDED_STATUS} (`), "the notes name the same record and its recorded status").toBe(true);
    expect(MENTION.source, "MENTION is built from the record's own middle words").toBe(mentionSource(recordWords(RECORD)));
    expect(MENTION.flags, "read in any case, by code point").toBe("giu");
    expect(notes.includes(ACCEPTANCE), "ACCEPTANCE is the notes' acceptance on landing, verbatim").toBe(true);
    expect(notes.includes("Gate: the record appears in a released Furnace surface Pi vendors (@furnace/sdk"), "the gate is a released surface Pi vendors").toBe(true);
    const cited = /Today the external Furnace reader is explicit bounded (\S+) polling \(docs\/09 § ([^;]+);/.exec(notes);
    expect(DOCS09_SECTION.startsWith(`## ${cited?.[2] ?? "-"}`), "the notes cite docs/09's section").toBe(true);
    const furnace = docs09Furnace();
    expect(furnace.reads, "docs/09 states the notes' reads").toEqual(cited?.[1]?.split("/"));
    expect(furnace.verbs, "docs/09 states the excluded verbs").toEqual(["create", "resume", "stop"]);
    expect(git(["cat-file", "-t", FILING_PIN]).toString("utf8").trim(), "the filing pin is a commit of this repository").toBe("commit");
    const sibling = exportRow(SIBLING).title;
    expect((sibling.match(/\bFurnace\w+V0\b/g) ?? []).sort(), "wb-dqf.2's title names the program's two proposed records").toEqual([SIBLING_RECORD, RECORD].sort());
    expect(textOf("package.json").includes(`"${SDK}": "file:${TARBALL}"`), "package.json resolves the SDK to the vendored release").toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : json(impl());
          LIVE.set(pin, witness);
          const expected = rosterWitness(pin);
          REACHED.push({ pin, same: isDeepStrictEqual(witness, expected) });
          expect(witness).toStrictEqual(expected);
        });
      }
    });
  }

  it("the registered tests, the reached pins and the claims equal the roster, in order and both ways", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(
      titles.filter((name, index) => titles.indexOf(name) !== index),
      "titles registered twice (an alias or a decoy)",
    ).toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(
      walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      "every other test is in run mode, not inverted, and ran before this case",
    ).toEqual([]);
    expect(
      REACHED.map(entry => entry.pin),
      "every pin reached its witness compare, in row order",
    ).toEqual(ROWS.flatMap(row => row.pins));
    expect(
      REACHED.filter(entry => !entry.same).map(entry => entry.pin),
      "every compare matched its roster witness",
    ).toEqual([]);
    const keys = (pin: string): string[] => {
      const witness = LIVE.get(pin);
      return isObject(witness) ? Object.keys(witness).sort() : [];
    };
    const facts = (pin: string): string[] => Object.values(CLAIMS[pin] ?? {}).flat();
    for (const pin of Object.keys(CLAIMS)) {
      expect(keys(pin), `${pin}'s live witness holds exactly its claimed facts`).toEqual([...facts(pin)].sort());
      expect(facts(pin).length, `${pin}'s facts each sit under one term`).toBe(new Set(facts(pin)).size);
    }
    const accepted = Object.keys(CLAIMS).flatMap(claimed =>
      Object.keys(CLAIMS)
        .filter(other => other !== claimed && isDeepStrictEqual(keys(other), [...facts(claimed)].sort()))
        .map(other => `${other} shows ${claimed}'s claims`),
    );
    expect(accepted, "the claims bound: no pin's live witness shows another pin's claims").toEqual([]);
  });
});
