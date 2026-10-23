/**
 * wb-tz4r.2 (RI-UNIFIED-DECISION-INFERENCE-R2, program-triage-2026-10-22), the absent-today leg. <ENGINE> stands for the name of
 * the ReactiveInference module that holds the typed decision contracts (src/reactive_inference/<ENGINE>/ at the pin). This file
 * and its roster never spell it joined: ENGINE composes it at runtime from the roster's parts (residual R-COMPOSED names what that
 * costs), so a sibling census whose acceptance walks src/test/qa for that identifier (wb-tz4r.1 (a), wb-tz4r.8 (c)) holds over
 * both files.
 *
 * Statement (the owner filing's title): "If Pi ever consumes a native decision envelope (gated: RI typed decision envelope with its
 * result states, RI-DEC-07 strict result validator; unshipped at 485f3615db1e), Pi shall keep abstain distinct from False and shall
 * never coerce a partial/incomplete/refused/invalid/unsupported/stale result into a choice, echoing the producer's state word
 * verbatim", pinned to the program's 01-contracts.md:7 (the roster's quote and citation). The acceptance is the filing's, verbatim:
 * the labels of rows A-D, <ENGINE> substituted back by the judged set.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only git show and git grep on the local ReactiveInferenceSDK checkout, no fetch):
 * at the pin 485f3615db1e and at origin/master 075ac589d64d (2026-10-23, a descendant of the pin) the engine module exports seven
 * request-side names (three contract classes, three preflight classes, plan_choices) and no result, outcome or state type; between
 * the two commits its three files changed by refactors only (a MIN_CANDIDATES constant, an export reorder, line wraps). The legacy
 * decision.py:125 DecisionKind ("the closed set a consumer branches on") holds eight kinds, abstained among them: the filing's
 * native word is abstain, so the legacy past tense is an unknown word here. Pi reads RI only as the sdk_versions.reactive_inference
 * version echo inside rf provenance. So the trigger has not fired, (d) holds by absence, and (a)-(c) are armed on a test-side
 * reference projection and judge a consumer adopts with the roster's fixtures:
 *  A, acceptance (a). A1 the adoption fixtures: one CONSTRUCTED envelope per listed word in the clause's order (read from the bead
 *    row's braces), each valid under the shipped request contract's rules (a 64-lowercase-hex snapshot digest; a question with a
 *    nonblank id and text and at least two distinct nonblank candidates), one result carrying its word and no choice unless the word
 *    is provisional (partial, incomplete and stale carry the second candidate, the case a coercion would surface), beside a
 *    Boolean-question abstain and a mixed tally; A2 the reference over each listed fixture carries the word verbatim at its echo path
 *    and nothing at its answer slot, the judge finds nothing, and each decided control carries its candidate at that slot (the
 *    positive control); A3 the judge refuses a relabeled word: upper case, Pi's own unknown word, the legacy past tense, the mark.
 *  B, acceptance (b). B1 abstain read as False (the slot set to false, the result made a decided false) is refused on the Boolean
 *    and the choice fixture; B2 the first candidate (at the slot, or the result made a decided first) is refused for every listed
 *    word; B3 every default spelling is refused - the last candidate, the index 0, a note naming the default, the provisional
 *    candidate passed through - and the side-path spellings no decided answer travels are the R-SIDE-PATH quiet rows.
 *  C, acceptance (c). C1 the reference over one fixture per unknown word and over the tally (five undecided results of six) carries
 *    each listable word verbatim, the unlistable one as the mark only, the count, no candidate of an undecided question and no
 *    success word, and the judge finds nothing; C2 the judge refuses unknown words read as success, selected, dropped and uncounted,
 *    normalized to a listed word or echoed raw, beside the R-SUCCESS-SYNONYM and R-COUNT-COINCIDENCE quiet rows; C3 the wb-973.10
 *    pattern: the landed rf observer (reactivefiberTopology over the full-shape render) reads three of these unknown words as
 *    observation statuses that are counted, verbatim, partial and never success, the judge's reading rules find nothing on that
 *    projection and refuse it once its tone reads success, and wb-973.10's row in the tracked bead export states the pattern.
 *  D, the trigger and acceptance (d). D1 no src file spells either family (ENGINE_FAMILY, STATE_FAMILY) in an identifier, a literal,
 *    a folded literal, a regular expression, JSX text, its bytes (comments and prose included; UTF-8, UTF-16LE, UTF-16BE, raw and
 *    with escapes decoded) or its path, with a floor, an anchor and README.md's architecture map as an outside set the walk must
 *    cover; D2 below test, qa and examples the clause's identifiers are judged: no module spells either family in an identifier or a
 *    whole-token literal (a literal, folded literal or regular expression with no whitespace), no JSON or JSON Lines file in a key or
 *    a whole-token string value, and no path, with floors and anchors (prose there is not an identifier: a sibling census quoting
 *    the producer's line "RI-DEC-07: strict result validator, abstention, ..." stays quiet, R-PROSE-LITERAL);
 *    D3 the two exemptions are load-bearing for the state family (both spell it) and exempt nothing for the engine family (neither
 *    spells it joined); D4 the gating envelope is measured unshipped: the roster's producer facts hold no result-state type at either
 *    commit, no engine export names one, and the bead row says "Shipped: no"; a re-measure that finds one flips D4 red until (a)-(c)
 *    are wired to the real projection.
 * THE JUDGE reads a projection by the values it puts at paths, never by key names: an answer slot is a path that carries the
 * decided answer for every answer the question admits (each candidate, or true and false), an echo path one that carries the state
 * word for two probe words outside every vocabulary; both are found by re-projecting the envelope with only that result changed.
 * A projection with no answer slot is refused as unjudgeable (no-slot), so dropping decided answers never passes, and one that does
 * not echo an arbitrary word has no echo path, so its listed words read as relabeled (clause (c) is what makes (a) checkable).
 * Paths are positional: a projection that drops results shifts the later entries, so its slot findings name the shifted questions.
 * FIXTURES: every envelope is CONSTRUCTED (no RI build emits a native decision result at either commit); the decided control word is
 * the legacy DecisionKind's first member. Witnesses hold the reference's readings and the judge's findings by fixture name.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row, every pin's witness, the scan
 * constants, the words, the residual families and the registered test titles are held to the out-of-file roster
 * (test/fixtures/ri-decision-state-echo-roster.json). OUTSIDE ANCHORS: the owner filing's row in the tracked bead export
 * (.beads/issues.jsonl, row wb-tz4r.2): every acceptance clause sits verbatim in exactly one row label and the trigger in row D's,
 * A1 reads the listed words from clause (a)'s braces, D4 reads its "Shipped: no" sentence, its quote and citation equal the
 * roster's; wb-973.10's row and the landed observer (C3); README.md's architecture map (D1). Not claimed: a pin removed from ROWS,
 * the literal, IMPL and the roster together (the bead row anchors rows, clauses and words, not pins).
 * RECORDS: the last case walks this file's registered tests: each roster title once, in order, in run mode, not inverted, ran;
 * every pin's case reached its end; no title spells the engine family, so a report holding these titles stays quiet for the
 * sibling walks.
 * RESIDUALS (named families, each with pinned quiet rows): R-COMPOSED a needle assembled at runtime (D1 composedJoin,
 * composedState); R-PROSE the words spaced apart (D1 prose); R-ENCODED an encoding outside the decoded set (D1 rot13); R-LOOKALIKE
 * a look-alike letter or an inserted invisible (D1 lookalike, invisible); R-COMMENT a needle in a comment of a test, qa or
 * examples module (D2 testComment, beside D1's srcComment hit); R-PROSE-LITERAL a needle inside a literal or JSON value holding
 * whitespace below test, qa or examples (D2 proseLiteral, proseValue, beside D1's srcProse hit); R-OTHER-DATA a data file there
 * that is not JSON or does not parse as JSON (D2 textFile, brokenJson, utf16Json); R-BARE-WORD the bare state words, Pi's own
 * vocabulary (D1 bareWords); R-OUTSIDE a file outside the four roots (D2 docs/ and .beads/ plants); R-SIDE-PATH an undecided
 * result's index, paraphrase or boolean at a path no decided answer travels (B3 sideIndex, sideParaphrase, sideBoolean);
 * R-SUCCESS-SYNONYM a success word outside SUCCESS_WORDS or inside a longer string (C2 synonym, successInProse);
 * R-COUNT-COINCIDENCE a reading that states only its total, which equals the undecided count on a one-result envelope (C2
 * totalOnly: quiet on the singles, refused on the tally).
 * Display paths added: none. Test-only: it spawns nothing; the walk controls plant files in makeScratch scratch only.
 */
import { type Dirent, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, describe, expect, it } from "vitest";
import type { JsonValue } from "../src/workbench/capability-registry.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type Json = JsonValue;
type JsonObject = { [key: string]: Json };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "test/workbench-ri-decision-state-echo-census.test.ts";
const ROSTER_FILE = "test/fixtures/ri-decision-state-echo-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-tz4r.2";
/** The bead whose landed observer leg clause (c) names as its pattern, and the sentence its row states. */
const PATTERN_BEAD = "wb-973.10";
const PATTERN_SENTENCE = "an unknown status word is treated as non-observed, never as success";

/** The engine module's name in any letter case, joined directly or by one underscore, dot or hyphen. */
const ENGINE_FAMILY = /decision[_.-]?engine/i;
/** The decision result-state identifiers: the abstain family, a decision-qualified kind, state or status (the legacy
 * DecisionKind among them) and the legacy not-a-decision kind. The bare state words stay out (R-BARE-WORD), and so do names of
 * the result itself (a decision result type or resource tag names the envelope, not its state). */
const STATE_FAMILY = /abst(?:ain|ention)|decision[_.-]?(?:kind|state|status)|not[_.-]?a[_.-]?decision/i;
const SCAN_ROOTS = ["src", "test", "qa", "examples"];
/** Below these roots every file is judged in its bytes too, comments and prose included; below the others identifiers only. */
const BYTE_ROOTS = ["src"];
const MODULE_EXTENSIONS = [".ts", ".mts", ".cts", ".tsx", ".js", ".mjs", ".cjs", ".jsx"];
/** Data files judged in identifier mode: their keys and whole-token string values. */
const DATA_EXTENSIONS = [".json", ".jsonl"];
/** A whole token: no whitespace anywhere, so a sentence is never an identifier. */
const WHOLE_TOKEN = /^\S+$/;
/** Walked and judged for the engine family; not judged for the state family, which both spell (D3). */
const EXEMPT = [SELF, ROSTER_FILE];
/** Each floor sits below the count measured at base 282caa0 (src 115, test 532, qa 67, examples 7 files). */
const FLOORS = { src: 105, test: 480, qa: 60, examples: 6 };
/** Files the walk must reach, each with a token its bytes carry: the two Forge result-state readers and the rf provenance fixture
 * stay quiet with it, and an example script. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["src/workbench/forge-observer.ts", "last_result_state"],
  ["test/helpers/rf-render-fixture.ts", "reactive_inference"],
  ["qa/workbench/forge-gate-status-probe.mjs", "lastResultState"],
  ["examples/workflows/compose.js", "export"],
];
/** A state word a reading may show verbatim: a bounded ASCII token (the wb-973.10 STATUS_WORD grammar). */
const LISTABLE = /^[A-Za-z0-9_.-]{1,24}$/;
/** What a reading shows in place of an unlistable word. */
const UNLISTED = String.fromCodePoint(0x2026);
/** Whole string values that read as a success (letter case ignored). */
const SUCCESS_WORDS = ["success", "succeeded", "ok", "pass", "passed", "complete", "completed"];
const RESIDUAL_FAMILIES = [
  "R-COMPOSED",
  "R-PROSE",
  "R-ENCODED",
  "R-LOOKALIKE",
  "R-COMMENT",
  "R-PROSE-LITERAL",
  "R-OTHER-DATA",
  "R-BARE-WORD",
  "R-OUTSIDE",
  "R-SIDE-PATH",
  "R-SUCCESS-SYNONYM",
  "R-COUNT-COINCIDENCE",
];
const CYRILLIC_A = String.fromCodePoint(0x0430);
const ZERO_WIDTH_SPACE = String.fromCodePoint(0x200b);

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) adoption fixture per state word {abstain, partial, incomplete, refused, invalid, unsupported, stale}: projection carries the word verbatim and no chosen candidate id: one CONSTRUCTED envelope per word under the shipped request contract's rules, the reference projection quiet under the judge with each decided control carrying its candidate, and every relabeled word refused",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label:
      "(b) mutant: mapping abstain to False, or any listed state to a default/first candidate, fails: abstain read as False on a Boolean and a choice question, the first candidate for every listed word, and the last candidate, the index, a default note and the provisional candidate passed through all refused",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) an unknown state word projects as non-choice (counted, verbatim), never as a selection or success (wb-973.10 pattern): the reference quiet over each unknown word and a mixed tally, unknown words read as success, selected, dropped, normalized or echoed raw all refused, and the landed wb-973.10 observer reading quiet under the same rules",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label:
      "(trigger, absent today) If Pi ever consumes a native decision envelope: (d) today: <ENGINE>/result-state identifiers in Pi src/test = 0, measured over src, test, qa and examples with load-bearing exemptions, and the gating envelope measured unshipped at both ReactiveInference commits",
    pins: ["D1", "D2", "D3", "D4"],
  },
];

interface Question {
  readonly id: string;
  readonly question: string;
  readonly candidates?: readonly string[];
  readonly output?: string;
}
interface Result {
  readonly question_id: string;
  readonly state: string;
  readonly choice?: Json;
}
interface Envelope {
  readonly snapshot_digest: string;
  readonly batch_mode: string;
  readonly questions: readonly Question[];
  readonly results: readonly Result[];
}
interface RosterPin {
  readonly id: string;
  readonly witness: Json;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Producer {
  readonly repo: string;
  readonly pin: { readonly sha: string; readonly committed: string };
  readonly head: { readonly ref: string; readonly sha: string; readonly committed: string; readonly containsPin: boolean };
  readonly blobs: JsonObject;
  readonly lines: Readonly<Record<string, string>>;
  readonly engineExports: { readonly pin: readonly string[]; readonly head: readonly string[] };
  readonly engineClasses: { readonly pin: readonly string[]; readonly head: readonly string[] };
  readonly resultStateTypes: { readonly pin: readonly string[]; readonly head: readonly string[] };
  readonly legacyKind: { readonly path: string; readonly line: number; readonly name: string; readonly doc: string; readonly values: readonly string[] };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly trigger: string;
  readonly engine: { readonly parts: readonly string[]; readonly joiner: string };
  readonly words: { readonly listed: readonly string[]; readonly decided: string; readonly unknown: readonly string[]; readonly provisional: readonly string[]; readonly probes: readonly string[] };
  readonly fixtures: { readonly provenance: string; readonly listed: Readonly<Record<string, Envelope>>; readonly booleanAbstain: Envelope; readonly unknownTemplate: Envelope; readonly tally: Envelope };
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isJsonObject(value: Json | undefined): value is JsonObject {
  return value !== null && value !== undefined && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): Json {
  return JSON.parse(JSON.stringify(value)) as Json;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`roster ${field} must be an object`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function pair(value: unknown, field: string): { pin: string[]; head: string[] } {
  const raw = objectOf(value, field);
  return { pin: strings(raw.pin, `${field}.pin`), head: strings(raw.head, `${field}.head`) };
}
function envelopeOf(value: unknown, field: string): Envelope {
  const raw = objectOf(value, field);
  if (!Array.isArray(raw.questions) || !Array.isArray(raw.results)) throw new Error(`roster ${field} needs questions and results lists`);
  const questions = raw.questions.map((entry: unknown, index: number): Question => {
    const question = objectOf(entry, `${field}.questions[${index}]`);
    return {
      id: text(question.id, `${field}.questions[${index}].id`),
      question: text(question.question, `${field}.questions[${index}].question`),
      ...(Object.hasOwn(question, "candidates") ? { candidates: strings(question.candidates, `${field}.questions[${index}].candidates`) } : {}),
      ...(Object.hasOwn(question, "output") ? { output: text(question.output, `${field}.questions[${index}].output`) } : {}),
    };
  });
  const results = raw.results.map((entry: unknown, index: number): Result => {
    const result = objectOf(entry, `${field}.results[${index}]`);
    return {
      question_id: text(result.question_id, `${field}.results[${index}].question_id`),
      state: text(result.state, `${field}.results[${index}].state`),
      ...(Object.hasOwn(result, "choice") ? { choice: json(result.choice) } : {}),
    };
  });
  return { snapshot_digest: text(raw.snapshot_digest, `${field}.snapshot_digest`), batch_mode: text(raw.batch_mode, `${field}.batch_mode`), questions, results };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "root");
  if (!Array.isArray(raw.rows)) throw new Error("roster rows must be a list");
  const rows = raw.rows.map((entry: unknown, index: number): RosterRow => {
    const row = objectOf(entry, `rows[${index}]`);
    if (!Array.isArray(row.pins)) throw new Error(`roster rows[${index}].pins must be a list`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      const value = objectOf(pin, `rows[${index}].pins[${at}]`);
      if (!Object.hasOwn(value, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs a witness`);
      return { id: text(value.id, `rows[${index}].pins[${at}].id`), witness: json(value.witness) };
    });
    return { id: text(row.id, `rows[${index}].id`), label: text(row.label, `rows[${index}].label`), pins };
  });
  const engine = objectOf(raw.engine, "engine");
  const words = objectOf(raw.words, "words");
  const fixtures = objectOf(raw.fixtures, "fixtures");
  const listed = objectOf(fixtures.listed, "fixtures.listed");
  const producer = objectOf(raw.producer, "producer");
  const pin = objectOf(producer.pin, "producer.pin");
  const head = objectOf(producer.head, "producer.head");
  const lines = objectOf(producer.lines, "producer.lines");
  const legacy = objectOf(producer.legacyKind, "producer.legacyKind");
  const blobs = json(producer.blobs);
  const scan = json(raw.scan);
  if (!isJsonObject(blobs) || !isJsonObject(scan)) throw new Error("roster producer.blobs and scan must be objects");
  if (typeof head.containsPin !== "boolean" || typeof legacy.line !== "number") throw new Error("roster producer.head.containsPin and legacyKind.line are typed");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    trigger: text(raw.trigger, "trigger"),
    engine: { parts: strings(engine.parts, "engine.parts"), joiner: text(engine.joiner, "engine.joiner") },
    words: {
      listed: strings(words.listed, "words.listed"),
      decided: text(words.decided, "words.decided"),
      unknown: strings(words.unknown, "words.unknown"),
      provisional: strings(words.provisional, "words.provisional"),
      probes: strings(words.probes, "words.probes"),
    },
    fixtures: {
      provenance: text(fixtures.provenance, "fixtures.provenance"),
      listed: Object.fromEntries(Object.entries(listed).map(([word, value]) => [word, envelopeOf(value, `fixtures.listed.${word}`)])),
      booleanAbstain: envelopeOf(fixtures.booleanAbstain, "fixtures.booleanAbstain"),
      unknownTemplate: envelopeOf(fixtures.unknownTemplate, "fixtures.unknownTemplate"),
      tally: envelopeOf(fixtures.tally, "fixtures.tally"),
    },
    scan,
    producer: {
      repo: text(producer.repo, "producer.repo"),
      pin: { sha: text(pin.sha, "producer.pin.sha"), committed: text(pin.committed, "producer.pin.committed") },
      head: { ref: text(head.ref, "producer.head.ref"), sha: text(head.sha, "producer.head.sha"), committed: text(head.committed, "producer.head.committed"), containsPin: head.containsPin },
      blobs,
      lines: Object.fromEntries(Object.entries(lines).map(([key, value]) => [key, text(value, `producer.lines.${key}`)])),
      engineExports: pair(producer.engineExports, "producer.engineExports"),
      engineClasses: pair(producer.engineClasses, "producer.engineClasses"),
      resultStateTypes: pair(producer.resultStateTypes, "producer.resultStateTypes"),
      legacyKind: { path: text(legacy.path, "producer.legacyKind.path"), line: legacy.line, name: text(legacy.name, "producer.legacyKind.name"), doc: text(legacy.doc, "producer.legacyKind.doc"), values: strings(legacy.values, "producer.legacyKind.values") },
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
/** The engine module's name, composed from the roster's parts: neither file spells it joined. */
const ENGINE = ROSTER.engine.parts.join(ROSTER.engine.joiner);
const DECIDED = ROSTER.words.decided;
/** A row label with the engine placeholder substituted back, as the bead row spells its clause. */
const expanded = (label: string): string => label.split("<ENGINE>").join(ENGINE);

function rosterWitness(pin: string): Json {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** A row of the tracked bead export, found by id on a line that parses. */
function readBeadRow(id: string): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(`"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.title === "string") return { title: row.title, notes: typeof row.notes === "string" ? row.notes : "" };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${id}`);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`${BEAD} notes carry no Acceptance line`);
  return line
    .slice("Acceptance: ".length)
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

// ---------------------------------------------------------------------------------------------------------------------------
// The reference projection and the judge (rows A-C).

type Projection = (envelope: Envelope) => Json;

function questionOf(envelope: Envelope, result: Result): Question {
  const found = envelope.questions.find(question => question.id === result.question_id);
  if (found === undefined) throw new Error(`no question ${result.question_id}`);
  return found;
}
/** The answers a question admits: its candidates, or true and false for a Boolean question. */
function answersOf(question: Question): Json[] {
  return question.output === "boolean" ? [true, false] : [...(question.candidates ?? [])];
}
/** The decided answer a result carries: the decided word and a choice among its question's answers; any other result carries none. */
function decidedAnswer(envelope: Envelope, result: Result): Json | undefined {
  if (result.state !== DECIDED || result.choice === undefined) return undefined;
  return answersOf(questionOf(envelope, result)).includes(result.choice) ? result.choice : undefined;
}
const withResults = (envelope: Envelope, results: readonly Result[]): Envelope => ({ ...envelope, results: [...results] });

/** The reference projection, the posture a consumer adopts: a decided result travels with its answer; every other result carries
 * no answer (null) and its state word verbatim when listable, the mark otherwise; the reading counts the results and the undecided
 * ones and is partial whenever one is undecided. Of a result only its question, state and choice are read. */
function reference(envelope: Envelope): Json {
  const results = envelope.results.map((result): Json => {
    const answer = decidedAnswer(envelope, result);
    if (answer !== undefined) return { question: result.question_id, state: result.state, choice: answer };
    return { question: result.question_id, state: LISTABLE.test(result.state) ? result.state : UNLISTED, choice: null };
  });
  const open = envelope.results.filter(result => decidedAnswer(envelope, result) === undefined).length;
  const total = `${envelope.results.length} ${envelope.results.length === 1 ? "result" : "results"}`;
  return { results, tone: open === 0 ? "success" : "partial", notes: [open === 0 ? `${total}, all decided` : `${total}, ${open} not decided`] };
}

function leavesOf(value: Json, path = "", into = new Map<string, Json>()): Map<string, Json> {
  if (Array.isArray(value)) for (const [index, child] of value.entries()) leavesOf(child, path === "" ? String(index) : `${path}.${index}`, into);
  else if (value !== null && typeof value === "object") for (const [key, child] of Object.entries(value)) leavesOf(child, path === "" ? key : `${path}.${key}`, into);
  else into.set(path, value);
  return into;
}
const stringsOf = (leaves: Map<string, Json>): string[] => [...leaves.values()].filter((value): value is string => typeof value === "string");
/** Does a number leaf equal `count`, or a string leaf carry it as a whole token (never inside an id such as q.t5)? */
function carriesCount(leaves: Map<string, Json>, count: number): boolean {
  const token = new RegExp(`(?<![\\w.])${count}(?![\\w.])`);
  return [...leaves.values()].some(value => value === count || (typeof value === "string" && token.test(value)));
}
const hasToken = (value: string, word: string): boolean => new RegExp(`(?<![A-Za-z0-9_])${word.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&")}(?![A-Za-z0-9_])`).test(value);
const readsSuccess = (values: readonly string[]): boolean => values.some(value => SUCCESS_WORDS.includes(value.toLowerCase()));

interface Inspection {
  readonly findings: string[];
  readonly slots: Readonly<Record<string, string[]>>;
  readonly echoes: Readonly<Record<string, string[]>>;
}
/** The judge over one envelope: sorted findings (empty is a pass) and the answer slots and echo paths it found. For every undecided
 * result: no-slot (no path carries the decided answer for every answer the question admits), slot (an answer slot holds a value),
 * candidate (a string carries one of the question's candidate ids), verbatim (a listable word is not at an echo path, letter case
 * kept) and raw (a string carries an unlistable word); for the reading once a result is undecided: success (a whole string value
 * reads as a success) and counted (no number and no whole decimal token states how many results are undecided). */
function inspect(project: Projection, envelope: Envelope): Inspection {
  const leaves = leavesOf(project(envelope));
  const values = stringsOf(leaves);
  const findings = new Set<string>();
  const slots: Record<string, string[]> = {};
  const echoes: Record<string, string[]> = {};
  const open = envelope.results.filter(result => decidedAnswer(envelope, result) === undefined);
  for (const result of open) {
    const question = questionOf(envelope, result);
    const replaced = (entry: Result): Envelope => withResults(envelope, envelope.results.map(other => (other === result ? entry : other)));
    const answers = answersOf(question);
    const decided = answers.map(answer => leavesOf(project(replaced({ question_id: question.id, state: DECIDED, choice: answer }))));
    const slotPaths = [...(decided[0]?.keys() ?? [])].filter(path => decided.every((reading, index) => reading.get(path) === answers[index]));
    const probed = ROSTER.words.probes.map(probe => leavesOf(project(replaced({ ...result, state: probe }))));
    const echoPaths = [...(probed[0]?.keys() ?? [])].filter(path => probed.every((reading, index) => reading.get(path) === ROSTER.words.probes[index]));
    slots[question.id] = slotPaths;
    echoes[question.id] = echoPaths;
    if (slotPaths.length === 0) findings.add(`no-slot:${question.id}`);
    if (slotPaths.some(path => leaves.get(path) !== undefined && leaves.get(path) !== null)) findings.add(`slot:${question.id}`);
    if ((question.candidates ?? []).some(candidate => values.some(value => value.includes(candidate)))) findings.add(`candidate:${question.id}`);
    if (LISTABLE.test(result.state)) {
      if (!echoPaths.some(path => leaves.get(path) === result.state)) findings.add(`verbatim:${question.id}`);
    } else if (values.some(value => value.includes(result.state))) findings.add(`raw:${question.id}`);
  }
  if (open.length > 0) {
    if (readsSuccess(values)) findings.add("success");
    if (!carriesCount(leaves, open.length)) findings.add("counted");
  }
  return { findings: [...findings].sort(), slots, echoes };
}
const judge = (project: Projection, envelope: Envelope): string[] => inspect(project, envelope).findings;
/** The judge's reading rules alone, for a projection that is not a decision reading: each word at a whole token, no success word,
 * the count stated (C3). */
function readingFindings(reading: Json, words: readonly string[], count: number): string[] {
  const leaves = leavesOf(reading);
  const values = stringsOf(leaves);
  const findings = words.filter(word => !values.some(value => hasToken(value, word))).map(word => `verbatim:${word}`);
  if (readsSuccess(values)) findings.push("success");
  if (!carriesCount(leaves, count)) findings.push("counted");
  return findings;
}

const isListed = (word: string): boolean => ROSTER.words.listed.includes(word);
const isUnknown = (word: string): boolean => !isListed(word) && word !== DECIDED;
const firstCandidate = (question: Question): Json => question.candidates?.[0] ?? null;
const lastCandidate = (question: Question): Json => question.candidates?.[question.candidates.length - 1] ?? null;
/** The reference reading with each result's entry rewritten by `edit`, the reading's other fields kept. */
function editEntries(envelope: Envelope, edit: (entry: JsonObject, result: Result, question: Question) => JsonObject): Json {
  const reading = reference(envelope);
  if (!isJsonObject(reading) || !Array.isArray(reading.results)) throw new Error("the reference reading carries a results list");
  const entries = reading.results;
  return {
    ...reading,
    results: envelope.results.map((result, index) => {
      const entry = entries[index];
      if (!isJsonObject(entry)) throw new Error("a reference entry is an object");
      return edit({ ...entry }, result, questionOf(envelope, result));
    }),
  };
}
/** The reference reading with its top-level fields rewritten by `edit`. */
function editReading(envelope: Envelope, edit: (reading: JsonObject) => JsonObject): Json {
  const reading = reference(envelope);
  if (!isJsonObject(reading)) throw new Error("the reference reading is an object");
  return edit({ ...reading });
}
/** The reference over the envelope with each result rewritten first (undefined drops it). */
function editResults(envelope: Envelope, edit: (result: Result, question: Question) => Result | undefined): Json {
  return reference(
    withResults(
      envelope,
      envelope.results.flatMap(result => {
        const edited = edit(result, questionOf(envelope, result));
        return edited === undefined ? [] : [edited];
      }),
    ),
  );
}
const hasUnknown = (envelope: Envelope): boolean => envelope.results.some(result => isUnknown(result.state));

/** Mutant projections: the reference with one rule broken, each named for what it does. */
const MUTANTS: Readonly<Record<string, Projection>> = {
  relabelUpper: envelope => editResults(envelope, result => (isListed(result.state) ? { ...result, state: result.state.toUpperCase() } : result)),
  relabelPiWord: envelope => editResults(envelope, result => (isListed(result.state) ? { ...result, state: "unknown" } : result)),
  relabelLegacyTense: envelope => editResults(envelope, result => (result.state === "abstain" ? { ...result, state: "abstained" } : result)),
  relabelMark: envelope => editResults(envelope, result => (isListed(result.state) ? { ...result, state: UNLISTED } : result)),
  abstainAsFalse: envelope => editEntries(envelope, (entry, result) => (result.state === "abstain" ? { ...entry, choice: false } : entry)),
  abstainDecidedFalse: envelope => editResults(envelope, result => (result.state === "abstain" ? { question_id: result.question_id, state: DECIDED, choice: false } : result)),
  firstAtSlot: envelope => editEntries(envelope, (entry, result, question) => (isListed(result.state) ? { ...entry, choice: firstCandidate(question) } : entry)),
  firstDecided: envelope =>
    editResults(envelope, (result, question) => (isListed(result.state) ? { question_id: result.question_id, state: DECIDED, choice: firstCandidate(question) } : result)),
  lastAtSlot: envelope => editEntries(envelope, (entry, result, question) => (isListed(result.state) ? { ...entry, choice: lastCandidate(question) } : entry)),
  indexAtSlot: envelope => editEntries(envelope, (entry, result) => (isListed(result.state) ? { ...entry, choice: 0 } : entry)),
  defaultNote: envelope =>
    editReading(envelope, reading => {
      const named = envelope.results.filter(result => isListed(result.state)).map(result => `defaulted to ${String(firstCandidate(questionOf(envelope, result)))}`);
      return { ...reading, notes: [...(Array.isArray(reading.notes) ? reading.notes : []), ...named] };
    }),
  provisionalPassThrough: envelope =>
    editEntries(envelope, (entry, result) => (isListed(result.state) && result.choice !== undefined ? { ...entry, choice: result.choice } : entry)),
  sideIndex: envelope => editEntries(envelope, (entry, result) => (isListed(result.state) ? { ...entry, suggestedIndex: 0 } : entry)),
  sideParaphrase: envelope => editEntries(envelope, (entry, result) => (isListed(result.state) ? { ...entry, hint: "the north route" } : entry)),
  sideBoolean: envelope => editEntries(envelope, (entry, result) => (result.state === "abstain" ? { ...entry, open: false } : entry)),
  unknownSuccess: envelope => editReading(envelope, reading => (hasUnknown(envelope) ? { ...reading, tone: "success" } : reading)),
  unknownFirst: envelope => editEntries(envelope, (entry, result, question) => (isUnknown(result.state) ? { ...entry, choice: firstCandidate(question) } : entry)),
  unknownDropped: envelope => editResults(envelope, result => (isUnknown(result.state) ? undefined : result)),
  unknownNormalized: envelope => editResults(envelope, result => (isUnknown(result.state) ? { ...result, state: result.state.toLowerCase() } : result)),
  unknownRaw: envelope => editEntries(envelope, (entry, result) => (isUnknown(result.state) && !LISTABLE.test(result.state) ? { ...entry, state: result.state } : entry)),
  synonym: envelope => editReading(envelope, reading => (hasUnknown(envelope) ? { ...reading, tone: "green" } : reading)),
  successInProse: envelope => editReading(envelope, reading => (hasUnknown(envelope) ? { ...reading, tone: "success, with undecided results" } : reading)),
  totalOnly: envelope =>
    editReading(envelope, reading => ({ ...reading, notes: [`${envelope.results.length} ${envelope.results.length === 1 ? "result" : "results"}`] })),
};
function mutant(name: string): Projection {
  const found = MUTANTS[name];
  if (found === undefined) throw new Error(`no mutant ${name}`);
  return found;
}

const LISTED_FIXTURES = (): [string, Envelope][] => ROSTER.words.listed.map(word => [word, ROSTER.fixtures.listed[word] ?? envelopeOf(null, `fixtures.listed.${word}`)]);
/** One envelope per unknown word: the template's question with one result carrying the word. */
const UNKNOWN_FIXTURES = (): [string, Envelope][] =>
  ROSTER.words.unknown.map(word => {
    const template = ROSTER.fixtures.unknownTemplate;
    const question = template.questions[0];
    if (question === undefined) throw new Error("the unknown template carries a question");
    return [word, withResults(template, [{ question_id: question.id, state: word }])];
  });
/** The judge's findings for `project` over each named fixture. */
const findingsBy = (project: Projection, fixtures: readonly [string, Envelope][]): JsonObject => Object.fromEntries(fixtures.map(([name, envelope]) => [name, judge(project, envelope)]));
const mutantFindings = (names: readonly string[], fixtures: readonly [string, Envelope][]): JsonObject =>
  Object.fromEntries(names.map(name => [name, findingsBy(mutant(name), fixtures)]));

// ---------------------------------------------------------------------------------------------------------------------------
// The walk (row D).

const posix = (path: string): string => path.split(sep).join("/");
function extensionOf(path: string): string {
  const base = path.slice(path.lastIndexOf("/") + 1);
  const dot = base.lastIndexOf(".");
  return dot <= 0 ? "" : base.slice(dot).toLowerCase();
}
const isModule = (path: string): boolean => MODULE_EXTENSIONS.includes(extensionOf(path));

/** Replaces each JS escape, HTML numeric reference and percent escape by the character it encodes (an out-of-range one by nothing). */
function decodeEscapes(value: string): string {
  const char = (digits: string, radix: number): string => {
    const code = Number.parseInt(digits, radix);
    return code <= 0x10ffff ? String.fromCodePoint(code) : "";
  };
  return value
    .replace(/\\u\{([0-9a-f]{1,6})\}/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\u([0-9a-f]{4})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\x([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16))
    .replace(/\\([0-7]{1,3})/g, (_, octal: string) => char(octal, 8))
    .replace(/&#x([0-9a-f]{1,6});?/gi, (_, hex: string) => char(hex, 16))
    .replace(/&#([0-9]{1,7});?/g, (_, decimal: string) => char(decimal, 10))
    .replace(/%([0-9a-f]{2})/gi, (_, hex: string) => char(hex, 16));
}
/** A buffer read as UTF-8, UTF-16LE and UTF-16BE. */
function decodings(buffer: Buffer): (readonly [string, string])[] {
  const swapped = Buffer.from(buffer.subarray(0, buffer.length - (buffer.length % 2)));
  swapped.swap16();
  return [
    ["utf8", buffer.toString("utf8")],
    ["utf16le", buffer.toString("utf16le")],
    ["utf16be", swapped.toString("utf16le")],
  ];
}

interface Hits {
  readonly engine: string[];
  readonly state: string[];
}
/** A file's bytes and path: each decoding, raw and with escapes decoded, against both families. */
function byteHits(path: string, buffer: Buffer): Hits {
  const engine: string[] = [];
  const state: string[] = [];
  const check = (label: string, value: string): void => {
    if (ENGINE_FAMILY.test(value) || ENGINE_FAMILY.test(decodeEscapes(value))) engine.push(`${path}: ${label}`);
    if (STATE_FAMILY.test(value) || STATE_FAMILY.test(decodeEscapes(value))) state.push(`${path}: ${label}`);
  };
  check("path", path);
  for (const [encoding, value] of decodings(buffer)) check(encoding, value);
  return { engine, state };
}

function scriptKindOf(path: string): ts.ScriptKind {
  const extension = extensionOf(path);
  if (extension === ".tsx") return ts.ScriptKind.TSX;
  if (extension === ".ts" || extension === ".mts" || extension === ".cts") return ts.ScriptKind.TS;
  return ts.ScriptKind.JSX;
}
/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
/** One module's code, parsed under its own script kind: identifiers (escapes decoded by the compiler), string and template
 * literals (cooked), folded literals, regular expressions and JSX text against both families. Comments are not code. Outside
 * strict mode only identifiers and whole-token values are judged. */
function moduleHits(path: string, source: string, strict: boolean): Hits {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKindOf(path));
  const engine: string[] = [];
  const state: string[] = [];
  const line = (node: ts.Node): number => file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1;
  const spell = (node: ts.Node, kind: string, value: string): void => {
    if (!strict && kind !== "identifier" && !WHOLE_TOKEN.test(value)) return;
    if (ENGINE_FAMILY.test(value)) engine.push(`${path}:${line(node)} ${kind}`);
    if (STATE_FAMILY.test(value)) state.push(`${path}:${line(node)} ${kind}`);
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) spell(node, "identifier", node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) spell(node, "literal", node.text);
    else if (ts.isJsxText(node)) spell(node, "jsx-text", node.text);
    else if (ts.isRegularExpressionLiteral(node)) spell(node, "regex", node.text);
    if ((ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) || ts.isTemplateExpression(node)) {
      const folded = fold(node);
      if (folded !== undefined) spell(node, "folded", folded);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { engine, state };
}

/** A path, judged as one token. */
function pathHits(path: string): Hits {
  return { engine: ENGINE_FAMILY.test(path) ? [`${path}: path`] : [], state: STATE_FAMILY.test(path) ? [`${path}: path`] : [] };
}
/** A JSON or JSON Lines file in identifier mode: every key and every whole-token string value (a line or file that does not parse
 * holds nothing judged: R-OTHER-DATA). */
function dataHits(path: string, buffer: Buffer): Hits {
  const engine: string[] = [];
  const state: string[] = [];
  const check = (label: string, value: string): void => {
    if (!WHOLE_TOKEN.test(value)) return;
    if (ENGINE_FAMILY.test(value)) engine.push(`${path}: ${label}`);
    if (STATE_FAMILY.test(value)) state.push(`${path}: ${label}`);
  };
  const visit = (value: unknown, at: string): void => {
    if (typeof value === "string") check(at, value);
    else if (Array.isArray(value)) for (const [index, child] of value.entries()) visit(child, `${at}[${index}]`);
    else if (isObject(value))
      for (const [key, child] of Object.entries(value)) {
        check(`${at}.${key} (key)`, key);
        visit(child, `${at}.${key}`);
      }
  };
  const content = buffer.toString("utf8");
  const documents = extensionOf(path) === ".jsonl" ? content.split("\n").filter(entry => entry.trim() !== "") : [content];
  for (const [index, document] of documents.entries()) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(document);
    } catch {
      continue;
    }
    visit(parsed, `#${index}`);
  }
  return { engine, state };
}

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below each scan root of `root`, in name order, root-relative with "/" separators; a symlink is recorded,
 * never followed. */
function walkRoots(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  for (const name of SCAN_ROOTS) visit(join(root, name));
  return { files, symlinks, unreadable };
}

interface RootReading {
  files: number;
  readonly engine: string[];
  readonly state: string[];
}
interface TreeReading {
  readonly walk: Walk;
  readonly roots: Readonly<Record<string, RootReading>>;
  readonly exemptState: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and the judges over it: below BYTE_ROOTS every file's bytes and every module's code; below the other roots
 * each path, each module's identifiers and whole-token values and each data file's keys and whole-token values. */
function readTree(root: string): TreeReading {
  const walk = walkRoots(root);
  const roots: Record<string, RootReading> = Object.fromEntries(SCAN_ROOTS.map(name => [name, { files: 0, engine: [], state: [] }]));
  const exemptState: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of walk.files) {
    const top = file.slice(0, file.indexOf("/"));
    const reading = roots[top];
    if (reading === undefined) continue;
    reading.files += 1;
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    const strict = BYTE_ROOTS.includes(top);
    const hits: Hits[] = [strict ? byteHits(file, buffer) : pathHits(file)];
    if (isModule(file)) hits.push(moduleHits(file, buffer.toString("utf8"), strict));
    else if (!strict && DATA_EXTENSIONS.includes(extensionOf(file))) hits.push(dataHits(file, buffer));
    reading.engine.push(...hits.flatMap(hit => hit.engine));
    if (EXEMPT.includes(file)) exemptState.push(...hits.flatMap(hit => hit.state));
    else reading.state.push(...hits.flatMap(hit => hit.state));
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  return { walk, roots, exemptState, anchorsWalked: WALK_ANCHORS.every(([path]) => anchors.get(path) === true) };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once. */
function liveTree(): TreeReading {
  live ??= readTree(REPO);
  return live;
}
/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | Buffer | null>>): TreeReading {
  const root = makeScratch("ri-decision-state-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}
/** The src paths README.md's ## Architecture block names (src/ and its subtrees): an outside set the walk must cover. */
function readmeSrcPaths(): string[] {
  const readme = readFileSync(join(REPO, "README.md"), "utf8");
  const block = readme.slice(readme.indexOf("## Architecture")).split("```")[1] ?? "";
  const paths: string[] = [];
  let inSrc = false;
  let subtree = "";
  for (const line of block.split("\n")) {
    const match = /^( *)(\S+)/.exec(line);
    if (match === null) continue;
    const indent = match[1]?.length ?? 0;
    const name = match[2] ?? "";
    if (indent === 0) {
      inSrc = name === "src/";
      subtree = "";
    } else if (inSrc && !name.startsWith("#")) {
      if (indent === 2 && name.endsWith("/")) subtree = name;
      else if (indent === 2) {
        subtree = "";
        if (name.endsWith(".ts")) paths.push(`src/${name}`);
      } else if (indent === 4 && subtree !== "" && name.endsWith(".ts")) paths.push(`src/${subtree}${name}`);
    }
  }
  return paths;
}

const engineIn = (path: string, source: string): boolean => moduleHits(path, source, true).engine.length > 0;
const stateIn = (path: string, source: string): boolean => moduleHits(path, source, true).state.length > 0;
const bytesState = (path: string, value: string | Buffer): boolean => byteHits(path, typeof value === "string" ? Buffer.from(value) : value).state.length > 0;

// ---------------------------------------------------------------------------------------------------------------------------
// The landed wb-973.10 surface (C3).

const RF_ROOT = process.cwd();
const RF_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: RF_ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** One observation row in rf's row shape, fresh and captured at render, carrying `status` (an unknown word gets no code). */
function observationRow(status: string, index: number): JsonObject {
  return {
    observation_id: `rfl_0123456789abcdefghijk${index.toString(36)}`,
    lens_key: `peer.key${index}`,
    value_digest: `sha256:${"c".repeat(64)}`,
    status,
    code: null,
    freshness: "captured_at_render",
    replayed: false,
    required: false,
    degraded: false,
    persisted: false,
  };
}
/** The landed observer's projection of the full-shape render whose observation rows carry `statuses`. */
function observerReading(statuses: readonly string[]): Json {
  const source = json(fullShapeRf(RF_ROOT));
  if (!isJsonObject(source) || !isJsonObject(source.result)) throw new Error("the full-shape render carries a result object");
  const envelope = { ...source, result: { ...source.result, observations: statuses.map(observationRow) } };
  return json(reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: RF_ROOT, source: envelope }, RF_CONTEXT));
}

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): Json {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Json>> = {
  A1: () => {
    const clause = acceptanceClauses(readBeadRow(BEAD).notes)[0] ?? "";
    const braces = (/\{([^}]+)\}/.exec(clause)?.[1] ?? "").split(", ");
    const fixtures = LISTED_FIXTURES();
    const hex64 = /^[0-9a-f]{64}$/;
    const nonblank = (value: string): boolean => value.trim().length > 0;
    const questionValid = (question: Question): boolean =>
      nonblank(question.id) &&
      nonblank(question.question) &&
      (question.output === "boolean" ? question.candidates === undefined : (question.candidates ?? []).length >= 2 && (question.candidates ?? []).every(nonblank) && new Set(question.candidates).size === (question.candidates ?? []).length);
    const contractValid = (envelope: Envelope): boolean =>
      hex64.test(envelope.snapshot_digest) && envelope.questions.length > 0 && envelope.questions.every(questionValid) && new Set(envelope.questions.map(question => question.id)).size === envelope.questions.length;
    const all: [string, Envelope][] = [...fixtures, ["booleanAbstain", ROSTER.fixtures.booleanAbstain], ["unknownTemplate", ROSTER.fixtures.unknownTemplate], ["tally", ROSTER.fixtures.tally]];
    const invalid = all.filter(([, envelope]) => !contractValid(envelope)).map(([name]) => name);
    const shapes = Object.fromEntries(
      fixtures.map(([word, envelope]) => {
        const [result] = envelope.results;
        return [word, { results: envelope.results.length, stateIsWord: result?.state === word, choice: result?.choice === undefined ? null : result.choice }];
      }),
    );
    expect(braces, "clause (a)'s braces name exactly the roster's listed words, in order").toEqual([...ROSTER.words.listed]);
    expect(Object.keys(ROSTER.fixtures.listed), "one adoption fixture per listed word, in the clause's order").toEqual([...ROSTER.words.listed]);
    expect(invalid, "fixtures off the shipped request contract's rules").toEqual([]);
    for (const [word, envelope] of fixtures) {
      const [result] = envelope.results;
      expect(envelope.results.length, `${word}: one result`).toBe(1);
      expect(result?.state, `${word}: the result carries its word`).toBe(word);
      expect(result?.choice !== undefined, `${word}: a choice rides only a provisional word`).toBe(ROSTER.words.provisional.includes(word));
    }
    const [booleanResult] = ROSTER.fixtures.booleanAbstain.results;
    const tally = ROSTER.fixtures.tally;
    const tallyOpen = tally.results.filter(result => decidedAnswer(tally, result) === undefined).map(result => result.state);
    return done("A1", {
      braces,
      shapes,
      invalid,
      provenance: ROSTER.fixtures.provenance,
      booleanAbstain: { output: ROSTER.fixtures.booleanAbstain.questions[0]?.output ?? null, state: booleanResult?.state ?? null, choice: booleanResult?.choice ?? null },
      tally: { results: tally.results.length, open: tallyOpen, decided: tally.results.length - tallyOpen.length },
    });
  },
  A2: () => {
    const fixtures: [string, Envelope][] = [...LISTED_FIXTURES(), ["booleanAbstain", ROSTER.fixtures.booleanAbstain]];
    const readings = Object.fromEntries(fixtures.map(([name, envelope]) => [name, reference(envelope)]));
    const inspections = fixtures.map(([name, envelope]) => [name, inspect(reference, envelope)] as const);
    const findings = Object.fromEntries(inspections.map(([name, inspection]) => [name, inspection.findings]));
    const slots = Object.fromEntries(inspections.map(([name, inspection]) => [name, json(inspection.slots)]));
    const echoes = Object.fromEntries(inspections.map(([name, inspection]) => [name, json(inspection.echoes)]));
    const decidedControls = Object.fromEntries(
      fixtures.map(([name, envelope]) => {
        const [result] = envelope.results;
        const question = result === undefined ? undefined : questionOf(envelope, result);
        const answer = question === undefined ? null : (answersOf(question)[1] ?? null);
        return [name, reference(withResults(envelope, [{ question_id: question?.id ?? "", state: DECIDED, choice: answer }]))];
      }),
    );
    expect(Object.values(findings).every(list => Array.isArray(list) && list.length === 0), "the reference is quiet under the judge").toBe(true);
    return done("A2", { readings, findings, slots, echoes, decidedControls });
  },
  A3: () => {
    const names = ["relabelUpper", "relabelPiWord", "relabelLegacyTense", "relabelMark"];
    const fixtures = LISTED_FIXTURES();
    const findings = mutantFindings(names, fixtures);
    const refused = names.filter(name => fixtures.some(([, envelope]) => judge(mutant(name), envelope).length > 0));
    expect(refused, "every relabel mutant is refused on some listed fixture").toEqual(names);
    return done("A3", { findings });
  },
  B1: () => {
    const fixtures: [string, Envelope][] = [
      ["booleanAbstain", ROSTER.fixtures.booleanAbstain],
      ["abstain", ROSTER.fixtures.listed.abstain ?? ROSTER.fixtures.booleanAbstain],
    ];
    const findings = mutantFindings(["abstainAsFalse", "abstainDecidedFalse"], fixtures);
    const decidedFalse = reference(withResults(ROSTER.fixtures.booleanAbstain, [{ question_id: "q.gate", state: DECIDED, choice: false }]));
    expect(judge(mutant("abstainAsFalse"), ROSTER.fixtures.booleanAbstain), "abstain read as False is refused at the Boolean answer slot").toContain("slot:q.gate");
    return done("B1", { findings, decidedFalse, abstainReading: reference(ROSTER.fixtures.booleanAbstain) });
  },
  B2: () => {
    const fixtures = LISTED_FIXTURES();
    const findings = mutantFindings(["firstAtSlot", "firstDecided"], fixtures);
    const quiet = fixtures.filter(([, envelope]) => judge(mutant("firstAtSlot"), envelope).length === 0).map(([word]) => word);
    expect(quiet, "the first candidate passes for no listed word").toEqual([]);
    return done("B2", { findings });
  },
  B3: () => {
    const fixtures = LISTED_FIXTURES();
    const refusing = ["lastAtSlot", "indexAtSlot", "defaultNote", "provisionalPassThrough"];
    const findings = mutantFindings(refusing, fixtures);
    const sides = mutantFindings(["sideIndex", "sideParaphrase"], fixtures);
    const sideBoolean = judge(mutant("sideBoolean"), ROSTER.fixtures.booleanAbstain);
    const passedThrough = fixtures.filter(([, envelope]) => judge(mutant("provisionalPassThrough"), envelope).length > 0).map(([word]) => word);
    expect(passedThrough, "the provisional candidate is refused exactly where the producer named one").toEqual([...ROSTER.words.provisional]);
    return done("B3", { findings, residual: { sideIndex: sides.sideIndex ?? null, sideParaphrase: sides.sideParaphrase ?? null, sideBoolean } });
  },
  C1: () => {
    const singles = UNKNOWN_FIXTURES();
    const tally = ROSTER.fixtures.tally;
    const readings = Object.fromEntries([...singles, ["tally", tally] as [string, Envelope]].map(([name, envelope]) => [name, reference(envelope)]));
    const findings = findingsBy(reference, [...singles, ["tally", tally]]);
    const open = tally.results.filter(result => decidedAnswer(tally, result) === undefined).length;
    expect(Object.values(findings).every(list => Array.isArray(list) && list.length === 0), "the reference is quiet over every unknown word and the tally").toBe(true);
    expect(carriesCount(leavesOf(reference(tally)), open), `the tally reading states its ${open} undecided results`).toBe(true);
    return done("C1", { readings, findings, open });
  },
  C2: () => {
    const fixtures: [string, Envelope][] = [...UNKNOWN_FIXTURES(), ["tally", ROSTER.fixtures.tally]];
    const refusing = ["unknownSuccess", "unknownFirst", "unknownDropped", "unknownNormalized", "unknownRaw"];
    const findings = mutantFindings(refusing, fixtures);
    const residual = mutantFindings(["synonym", "successInProse", "totalOnly"], fixtures);
    const tallyRefused = refusing.filter(name => judge(mutant(name), ROSTER.fixtures.tally).length > 0);
    expect(tallyRefused, "every unknown-word mutant is refused on the tally").toEqual(refusing);
    return done("C2", { findings, residual });
  },
  C3: () => {
    const words = ROSTER.words.unknown.filter(word => LISTABLE.test(word));
    const statuses = ["observed", ...words];
    const reading = observerReading(statuses);
    const snapshot = isJsonObject(reading) && Array.isArray(reading.snapshots) ? reading.snapshots[0] : undefined;
    const node = isJsonObject(snapshot) ? snapshot.node : undefined;
    const coverage = isJsonObject(snapshot) ? (snapshot.coverage ?? null) : null;
    const tone = isJsonObject(node) ? (node.statusTone ?? null) : null;
    const findings = readingFindings(reading, words, words.length);
    const flipped = isJsonObject(reading) && isJsonObject(snapshot) && isJsonObject(node) ? { ...reading, snapshots: [{ ...snapshot, node: { ...node, statusTone: "success" } }] } : reading;
    const pattern = readBeadRow(PATTERN_BEAD).title.includes(PATTERN_SENTENCE);
    expect(pattern, `${PATTERN_BEAD}'s row states the pattern clause (c) names`).toBe(true);
    expect(findings, "the landed observer reads the unknown words counted, verbatim and never success").toEqual([]);
    return done("C3", { words, coverage, tone, findings, flipped: readingFindings(flipped, words, words.length), pattern });
  },
  D1: () => {
    const tree = liveTree();
    const src = tree.roots.src ?? { files: 0, engine: [], state: [] };
    const named = readmeSrcPaths();
    const readmeMissing = named.filter(path => !tree.walk.files.includes(path));
    expect(src.files >= FLOORS.src, `src files walked: ${src.files}`).toBe(true);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ named: named.length >= 40, readmeMissing }, "README.md's architecture map is covered").toStrictEqual({ named: true, readmeMissing: [] });
    expect({ engine: src.engine, state: src.state, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "src spellings of either family (the trigger's inventory)").toStrictEqual({
      engine: [],
      state: [],
      symlinks: [],
      unreadable: [],
    });
    const camel = [ROSTER.engine.parts[0] ?? "", (ROSTER.engine.parts[1] ?? "").replace(/^./, first => first.toUpperCase())].join("");
    const pascal = camel.replace(/^./, first => first.toUpperCase());
    const controls = {
      engineSpecifier: engineIn("src/c.ts", `import { plan } from "reactive_inference/${ENGINE}";\n`),
      engineSpawnArgument: engineIn("src/c.ts", `spawn("python3", ["-m", "reactive_inference.${ENGINE}.preflight"]);\n`),
      engineCamel: engineIn("src/c.ts", `const ${camel} = load();\n`),
      enginePascal: engineIn("src/c.ts", `type Reading = ${pascal}Reading;\n`),
      engineDotted: engineIn("src/c.ts", `const name = "reactive_inference.${ROSTER.engine.parts.join(".")}";\n`),
      engineFolded: engineIn("src/c.ts", `const name = "${ROSTER.engine.parts[0] ?? ""}" + "_${ROSTER.engine.parts[1] ?? ""}";\n`),
      enginePath: byteHits(`src/${ENGINE}.ts`, Buffer.from("export {};\n")).engine.length > 0,
      stateLiteral: stateIn("src/c.ts", 'if (result.state === "abstain") return null;\n'),
      stateIdentifier: stateIn("src/c.ts", "const abstained = kinds.ABSTAINED;\n"),
      stateKind: stateIn("src/c.ts", "type DecisionKind = string;\n"),
      stateQualified: stateIn("src/c.ts", "const decision_state = reading.state;\n"),
      stateNotADecision: stateIn("src/c.ts", "const isNotADecision = true;\n"),
      stateEscaped: stateIn("src/c.ts", 'const word = "\\u0061bstain";\n'),
      stateFolded: stateIn("src/c.ts", 'const word = "abs" + "tain";\n'),
      stateRegex: stateIn("src/c.ts", "const pattern = /abstention/;\n"),
      srcComment: bytesState("src/c.ts", "// abstain\nexport {};\n"),
      srcUtf16: bytesState("src/c.ts", Buffer.from('const word = "abstain";\n', "utf16le")),
      srcProse: bytesState("src/c.ts", 'const text = "the producer reports an abstention";\n'),
      resultTag: engineIn("src/c.ts", 'const TAG = "ri.decision-result/x";\nconst KIND = "decisionOutcome";\n') || stateIn("src/c.ts", 'const TAG = "ri.decision-result/x";\nconst KIND = "decisionOutcome";\n'),
      forgeResultState: engineIn("src/c.ts", "const state = pkg.last_result_state;\n") || stateIn("src/c.ts", "const state = pkg.last_result_state;\n"),
      bareWords: stateIn("src/c.ts", 'const tone = "partial";\nconst refusal = "refused";\nconst basis = "stale";\nconst read = "incomplete";\n'),
      controlDecision: stateIn("src/c.ts", "const decision: ControlDecision = decideControl();\nconst decisionNote = 1;\n"),
      prose: engineIn("src/c.ts", `const line = "the ${ROSTER.engine.parts.join(" ")} said";\n`) || stateIn("src/c.ts", 'const line = "it was not a decision";\n'),
      composedJoin: engineIn("src/c.ts", `const name = [${ROSTER.engine.parts.map(part => `"${part}"`).join(", ")}].join("${ROSTER.engine.joiner}");\n`),
      composedState: stateIn("src/c.ts", 'const word = ["abs", "tain"].join("");\n'),
      rot13: stateIn("src/c.ts", 'const word = "nofgnva";\n'),
      lookalike: stateIn("src/c.ts", `const word = "${CYRILLIC_A}bstain";\n`),
      invisible: stateIn("src/c.ts", `const word = "abs${ZERO_WIDTH_SPACE}tain";\n`),
    };
    return done("D1", { filesFloorMet: true, anchorsWalked: true, readmeNamed: named.length, readmeMissing, engine: src.engine, state: src.state, controls });
  },
  D2: () => {
    const tree = liveTree();
    const others = ["test", "qa", "examples"] as const;
    const floorsMet = others.every(name => (tree.roots[name]?.files ?? 0) >= FLOORS[name]);
    const hits = Object.fromEntries(others.map(name => [name, { engine: tree.roots[name]?.engine ?? [], state: tree.roots[name]?.state ?? [] }]));
    expect(floorsMet, `files walked: ${others.map(name => `${name} ${tree.roots[name]?.files ?? 0}`).join(", ")}`).toBe(true);
    expect(hits, "test, qa and examples spellings of either family outside the exemptions").toStrictEqual(Object.fromEntries(others.map(name => [name, { engine: [], state: [] }])));
    const planted = plantedTree({
      "src/anchor.ts": "export {};\n",
      "test/fixtures/decision.json": '{"state": "abstain"}\n',
      "test/fixtures/engine.json": `{"module": "reactive_inference.${ENGINE}"}\n`,
      "test/fixtures/escaped.json": '{"state": "\\u0061bstain"}\n',
      "test/fixtures/key.json": '{"decision_state": 1}\n',
      "test/fixtures/lines.jsonl": '{"a": 1}\n{"kind": "not_a_decision"}\n',
      "test/fixtures/prose.json": '{"text": "a strict result validator, abstention, partial batch semantics"}\n',
      "test/fixtures/broken.json": '{"state": "abstain"\n',
      "test/fixtures/utf16.json": Buffer.from('{"state": "abstain"}\n', "utf16le"),
      "test/fixtures/notes.txt": "abstain\n",
      "test/fixtures/decision_state/case.txt": "plain\n",
      "test/literal.test.ts": 'const word = "abstain";\n',
      "test/identifier.test.ts": "export const abstained = 1;\n",
      "test/prose.test.ts": 'const text = "the producer reports an abstention";\n',
      "test/comment.test.ts": "// abstain\nexport {};\n",
      "test/tag.test.ts": 'const TAG = "ri.decision-result/x";\n',
      "qa/probe.mjs": 'const kind = "not_a_decision";\n',
      "examples/flow.js": "export const abstained = 1;\n",
      "docs/notes.md": "abstain\n",
      ".beads/issues.jsonl": '{"title": "abstain"}\n',
      "test/link.json": null,
    });
    const flagged = (path: string): boolean =>
      SCAN_ROOTS.some(name => [...(planted.roots[name]?.engine ?? []), ...(planted.roots[name]?.state ?? [])].some(hit => hit.startsWith(`${path}:`))) || planted.walk.symlinks.includes(path);
    const controls = {
      dataState: flagged("test/fixtures/decision.json"),
      dataEngine: flagged("test/fixtures/engine.json"),
      dataEscaped: flagged("test/fixtures/escaped.json"),
      dataKey: flagged("test/fixtures/key.json"),
      dataLines: flagged("test/fixtures/lines.jsonl"),
      dataPath: flagged("test/fixtures/decision_state/case.txt"),
      proseValue: flagged("test/fixtures/prose.json"),
      brokenJson: flagged("test/fixtures/broken.json"),
      utf16Json: flagged("test/fixtures/utf16.json"),
      textFile: flagged("test/fixtures/notes.txt"),
      moduleLiteral: flagged("test/literal.test.ts"),
      moduleIdentifier: flagged("test/identifier.test.ts"),
      proseLiteral: flagged("test/prose.test.ts"),
      resultTag: flagged("test/tag.test.ts"),
      testComment: flagged("test/comment.test.ts"),
      qaModule: flagged("qa/probe.mjs"),
      examplesModule: flagged("examples/flow.js"),
      docsOutside: flagged("docs/notes.md"),
      beadsOutside: flagged(".beads/issues.jsonl"),
      symlink: flagged("test/link.json"),
      walkedPlants: planted.walk.files.length,
    };
    return done("D2", { floorsMet, hits, controls });
  },
  D3: () => {
    const tree = liveTree();
    const walked = EXEMPT.every(file => tree.walk.files.includes(file));
    const selfModule = moduleHits(SELF, readFileSync(join(REPO, SELF), "utf8"), false);
    const selfBytes = byteHits(SELF, readFileSync(join(REPO, SELF)));
    const rosterData = dataHits(ROSTER_FILE, readFileSync(join(REPO, ROSTER_FILE)));
    const rosterBytes = byteHits(ROSTER_FILE, readFileSync(join(REPO, ROSTER_FILE)));
    const reading = {
      walked,
      selfState: selfModule.state.length > 0,
      rosterState: rosterData.state.length > 0,
      selfEngine: selfModule.engine.length + selfBytes.engine.length > 0,
      rosterEngine: rosterBytes.engine.length > 0,
      exemptStateHits: tree.exemptState.length > 0,
    };
    expect(reading, "the exemptions spell the state family (lifting one reds D2) and neither spells the engine family joined").toStrictEqual({
      walked: true,
      selfState: true,
      rosterState: true,
      selfEngine: false,
      rosterEngine: false,
      exemptStateHits: true,
    });
    return done("D3", { exempt: [...EXEMPT], ...reading });
  },
  D4: () => {
    const { producer } = ROSTER;
    const notes = readBeadRow(BEAD).notes;
    const beadSaysUnshipped = notes.includes(`Shipped: no - at 485f3615db1e ${ENGINE} exposes no result/outcome type (request contracts + preflight plan only)`);
    const resultStateTypes = [...producer.resultStateTypes.pin, ...producer.resultStateTypes.head];
    const namingExports = [...producer.engineExports.pin, ...producer.engineExports.head, ...producer.engineClasses.pin, ...producer.engineClasses.head].filter(name =>
      /result|outcome|state|abstain/i.test(name),
    );
    const quoteAtLine = producer.lines["01-contracts.md:7"]?.endsWith(ROSTER.quote) === true;
    const contractShipped = resultStateTypes.length > 0 || namingExports.length > 0;
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the gating envelope unshipped`).toBe(true);
    expect(quoteAtLine, "the measured program line ends with the filing's quote").toBe(true);
    expect(contractShipped, "a result-state type shipped: (a)-(c) are owed against the real projection with this re-measure (wb-tz4r.2)").toBe(false);
    return done("D4", {
      beadSaysUnshipped,
      quoteAtLine,
      contractShipped,
      resultStateTypes,
      namingExports,
      exports: { pin: producer.engineExports.pin.length, head: producer.engineExports.head.length },
      sameExportSet: [...producer.engineExports.pin].sort().join(",") === [...producer.engineExports.head].sort().join(","),
      legacyKinds: producer.legacyKind.values.length,
      listedOutsideLegacy: ROSTER.words.listed.filter(word => !producer.legacyKind.values.includes(word)),
      headContainsPin: producer.head.containsPin,
    });
  },
};

/** A describe title: the row id and label (the label keeps the engine placeholder). */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("wb-tz4r.2 ReactiveInference decision state echo census (program-triage-2026-10-22 R2, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:3", "C:3", "D:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        engineFamily: `${ENGINE_FAMILY.source}/${ENGINE_FAMILY.flags}`,
        stateFamily: `${STATE_FAMILY.source}/${STATE_FAMILY.flags}`,
        listable: `${LISTABLE.source}/${LISTABLE.flags}`,
        unlisted: UNLISTED.codePointAt(0) ?? 0,
        successWords: SUCCESS_WORDS,
        scanRoots: SCAN_ROOTS,
        byteRoots: BYTE_ROOTS,
        moduleExtensions: MODULE_EXTENSIONS,
        dataExtensions: DATA_EXTENSIONS,
        wholeToken: `${WHOLE_TOKEN.source}/${WHOLE_TOKEN.flags}`,
        exempt: EXEMPT,
        floors: FLOORS,
        walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
        patternBead: PATTERN_BEAD,
        patternSentence: PATTERN_SENTENCE,
        mutants: Object.fromEntries(Object.keys(MUTANTS).map(name => [name, true])),
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    expect(ENGINE_FAMILY.test(ENGINE), "the composed engine name is in its own family").toBe(true);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow(BEAD);
    const clauses = acceptanceClauses(bead.notes);
    const trigger = /^\[[^\]]+\] (If Pi ever [^(]+?) \(gated/.exec(bead.title)?.[1] ?? "";
    const quote = /^'(.+)' (\S+)\.$/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a) to (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    expect(trigger, "the title's trigger is the roster's").toBe(ROSTER.trigger);
    const coverage = [...clauses, trigger].map(clause => ROWS.filter(row => clause.length > 0 && expanded(row.label).includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause and the trigger sit verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"], ["D"], ["D"]]);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.pin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and no title spells the engine family", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].filter(name => ENGINE_FAMILY.test(name)), "registered titles spelling the engine family").toEqual([]);
  });
});
