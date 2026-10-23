/**
 * wb-pfxo.6 (RF-COMPOSITIONAL-ASSEMBLY-R7), the posture that pins today. Statement (bead notes, full form): "No Pi surface shall
 * report an rf context plan row decision (reuse | invalidated | non_reusable | refresh_required) as the executed render's reuse
 * outcome, nor an executed render's reuse as the plan's prediction; the plan is a prediction and executor reuse a separate
 * observation (E1: executor reused twice while the plan predicted refresh_required), each echoed under its own producer name
 * (posture; the producer-side proof rfc-vg54d.3 is RFCLI's, no Pi gating artifact)" (compositional-assembly-2026-10-18/README.md
 * :79@6a251bf73af5: "P0: distinguish predict reuse vs actual reuse; property tests for plan/executor agreement with source
 * captures; measure false-positive reuse separately from conservative false-negative plan."; README.md:15, E1: "render executor
 * reused component twice; context plan predicted refresh_required. This isolates planning contract from execution contract.").
 * Acceptance (bead notes): "(a) fixture context.plan envelope with a row decision "refresh_required": no Pi string claims the
 * render refreshed, reused or recomputed that instance; (b) fixture committed render reporting component reuse: no 'predicted' /
 * 'plan' wording about that reuse, no back-filled plan decision; (c) docs census: no sentence in docs/workbench equates a plan
 * decision with an executed render's reuse; (d) any Pi string carrying a plan decision contains the producer enum word
 * byte-for-byte."
 *
 * MEASURED AT THE INSTALLED rf (0.1.832, commit 2618c211b; its context.plan.schema.json is byte-identical to the pin's, read
 * only): the row decision enum is :491-497 (reuse, invalidated, non_reusable, refresh_required) and the summary's required keys
 * are :681-688 (rows, the four decision counts, evidence_complete). THE FIXTURE (the roster's envelopes,
 * test/fixtures/rf-plan-prediction-roster.json) is E1 re-measured by the recipe of the feedback file README.md:15 cites, in one
 * private scratch workspace: three committing renders of one task, each followed by `rf context plan RENDER --json`, then one
 * `--no-commit` render. Every plan answered refresh_required for the one instance pc1:pc1 (cause refresh_required, key
 * source:task, current null) while render 2, render 3 and the preview each executed with work_metrics.reused_component_count 1
 * and rendered_component_count 0. `plan` is the plan of render 2, `committed` is render 2 and `preview` the noncommitted render
 * after that plan: the prediction and the observation of the same instance disagree, which is what the posture keeps apart.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts) with its adapter
 * (reactivefiber-observer.ts). It spawns only `rf ... context render --no-commit` and admits only context.render previews, so
 * today Pi reads no plan and states no executor component reuse; the census pins that absence and every surface the posture
 * already reaches:
 *  A, the trigger, absent today. A1 an AST scan of every src module and every native descriptor for an rf plan verb, with a
 *    floor, a non-vacuity reading of the real render argv and controls; A2 the rf roster stays the preview alone, selected by id
 *    prefix, by permission and by contractSource (native and injected registrations, RECONCILE_EVIDENCE_READS.reactivefiber); A3
 *    the native reader refuses the measured plan envelope as unrecognized in one spawn of the render argv; A4 the adapter refuses
 *    a reading carrying it.
 *  B, acceptance (a). B1 the fixture: the plan's refresh_required row for pc1:pc1, its summary partition and the E1 pairing with
 *    the committed render; B2 every string Pi surfaces for the plan envelope (both refusals, the reading's own fields) carries
 *    no refreshed / reused / recomputed claim, no decision word and not the instance; B3 the injected reader's registered reading
 *    carries the envelope byte for byte under its own producer name (source.command context.plan), handed a fresh copy and
 *    compared with a separate fresh read of the roster.
 *  C, acceptance (b). C1 the fixtures: the committed render and the preview each reused pc1:pc1 (reused_component_count 1,
 *    rendered 0), the preview is the native reader's own admitted reading; C2 the native reader refuses the committed render on
 *    its commit fields (with them flipped to the preview values it is admitted, with any one kept it is refused); C3 the adapter
 *    refuses it on the same fields; C4 the adapter's projection of the reusing preview carries no plan wording, no decision word
 *    and no reuse claim; C5 the one executor-reuse string the adapter states, the observations note, echoes the producer's
 *    freshness word 'reused' under its own field name and no plan wording, and a decision word can never ride as a freshness;
 *    C6 no string or template literal of the reader modules carries plan wording, a plan verb or a decision in any spelling.
 *  D, acceptance (c). D1 no sentence of docs/workbench, in its raw or normalized view, names an rf plan term (PLAN_TERM) and an
 *    executed reuse (EXECUTED_TERM) together; D2 no sentence names a plan term at all today (the roster's allowlist
 *    docsPlanSentences is empty), the forward guard: the first docs sentence about the plan is added there and D1 judges it.
 *  E, acceptance (d). E1 the decision enum is anchored on the producer (the measured summary's decision keys) and the registered
 *    reading carries every decision value at its producer path byte for byte; E2 no src or qa file respells a distinctive
 *    decision (refresh_required, non_reusable) in raw text or a cooked literal; E3 neither appears byte-exact in src or qa today.
 *  M, the matchers rows A to E read: M1-M6 the spellings each must catch and the ones it must pass; Q1-Q6 the pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, the decision enum, the summary keys, the citations and the registered test titles - is
 * held to the out-of-file roster, whose measured envelopes anchor the enum and the instance outside this file. A pin deleted,
 * relabelled, swapped for another passing case, or removed from every literal here at once still reds against the roster, and
 * the enum removed from every literal here still reds against the measured summary keys. Not claimed: an edit of this file and
 * the roster together.
 * RESIDUALS (named, each with a pinned quiet row): R-HOMOGLYPH a decision spelled with a look-alike letter is not caught (Q1);
 * R-PARAPHRASE an equation reworded without a plan term or an executed term is not caught (Q2); R-SPLIT-SENTENCE an equation
 * split across two sentences escapes D1 and is caught by D2 alone (Q3); R-COMPOSED-ARGV a plan argv built from non-literal parts
 * is invisible to A1 (Q4); R-ENGLISH-DECISIONS 'reuse' and 'invalidated' are ordinary words that src spells today, so E2/E3 read
 * only the two distinctive decisions while C6 keeps the reader modules free of every decision token (Q5); R-SCOPE test/,
 * .beads/, the front matter and docs outside docs/workbench are outside every scanned root, and this census's own roster spells
 * the decisions (Q6); R-INJECTED-UNCHECKED the injected-reader seam admits any envelope verbatim, so a plan envelope rides as a
 * preview reading until the adapter refuses it (quiet rows B3, A4); R-WORK-METRICS-UNREAD no Pi reader reads work_metrics, so
 * the executor's component reuse is echoed by no Pi surface today (quiet row C4).
 * SCOPE: the enum, the keys and the shapes are producer facts at the installed rf; Pi vendors no rf schema, so a producer-side
 * change is seen only when a fixture re-measure re-reads them. No plan reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa and docs are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-plan-prediction-roster.json");
const ROOT = process.cwd();
/** The measured envelopes' workspace root: the scratch root, rewritten (one occurrence per envelope). */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const PLAN_COMMAND = "context.plan";
const RENDER_COMMAND = "context.render";
/** context.plan.schema.json :491-497 at the installed rf (byte-identical to the pin): the row decision enum, producer order. */
const DECISIONS = ["reuse", "invalidated", "non_reusable", "refresh_required"];
/** :681-688: the summary's required keys, the four decision counts between rows and evidence_complete. */
const SUMMARY_KEYS = ["rows", "reuse", "invalidated", "non_reusable", "refresh_required", "evidence_complete"];
/** The two decisions no ordinary English word spells (R-ENGLISH-DECISIONS): E2 and E3 read these. */
const DISTINCTIVE = ["non_reusable", "refresh_required"];
/** The one component instance of the measured workspace: the plan's refresh_required row and the executions' reused component. */
const INSTANCE = "pc1:pc1";
const CITATIONS = [
  "docs/programs/compositional-assembly-2026-10-18/README.md:79@6a251bf73af5",
  "docs/programs/compositional-assembly-2026-10-18/README.md:15@6a251bf73af5",
  "src/reactive_fiber_cli/schemas/cli/context.plan.schema.json:491-497@6a251bf73af5",
  "src/reactive_fiber_cli/schemas/cli/context.plan.schema.json:681-688@6a251bf73af5",
];
/** The reader modules: the provider and its adapter. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
/** The commit-shape fields a committed render carries and a preview negates (providers/reactivefiber.ts isPreviewEnvelope). */
const COMMIT_FIELDS = ["transaction_id", "result.render_id", "result.ephemeral", "result.commit_seq", "result.work.storage_write_count"];

/** The separator class between the words of a spelling: whitespace, "_", ".", "-", a backslash escape, emphasis or code marks. */
const SEP = "[\\s_.\\\\*`~-]*";
/** One or more separators: the gap between two whole words. */
const GAP = "[\\s_.\\\\*`~-]+";
/** (a) a claim that an instance was refreshed, reused, recomputed, re-rendered or served from a cache. */
const CLAIM = new RegExp(
  `\\b(?:re${SEP}fresh(?:ed|es|ing)?|re${SEP}us(?:e|ed|es|ing)|re${SEP}comput(?:e|ed|es|ing)|re${SEP}render(?:ed|s|ing)?|cache${SEP}hits?|served${GAP}from${GAP}(?:the${GAP})?cache)\\b`,
  "i",
);
/** (b) plan wording: plan, planned, planner, prediction, predicted, forecast. */
const PLAN_WORDING = /\b(?:plan(?:s|ned|ner|ners|ning)?|predict(?:s|ed|ing|ion|ions|ive)?|forecast(?:s|ed|ing)?)\b/i;
/** A plan decision in the producer's spelling as a token, never inside a longer word (reused, invalidated_component_count). */
const DECISION_TOKEN = /(?<![A-Za-z0-9_])(?:reuse|invalidated|non_reusable|refresh_required)(?![A-Za-z0-9_])/;
/** Every spelling of the two distinctive decisions; a match that is not byte-for-byte the producer word is a respelling. */
const DECISION_FAMILY = `refresh${SEP}required|non${SEP}reusable`;
/** An rf plan verb in an argv-free literal: context plan, context.plan, context-plan. */
const PLAN_VERB = /\bcontext[\s._-]+plan\b/i;
/** (c) an rf plan term in docs: the verb, a plan row or decision, a planner, a prediction of reuse, a distinctive decision. */
const PLAN_TERM = new RegExp(
  [
    `\\bcontext${SEP}plan\\b`,
    `\\brf${GAP}plan\\b`,
    `\\bplan(?:'s|s)?${GAP}(?:rows?|decisions?|predictions?|forecasts?|verdicts?|words?|outcomes?)\\b`,
    `\\bplanners?(?:'s)?\\b`,
    `\\b(?:predict|forecast)\\w*${GAP}(?:\\w+${GAP}){0,2}re${SEP}us\\w*`,
    `\\bre${SEP}us\\w*${GAP}(?:predictions?|forecasts?|plans?)\\b`,
    DECISION_FAMILY,
  ].join("|"),
  "i",
);
/** (c) an executed render's reuse in docs: rf's reuse counters, an execution that reused or recomputed, a reused instance, a
 * cache hit. */
const EXECUTED_TERM = new RegExp(
  [
    `\\b(?:reused|rendered|invalidated)${SEP}component${SEP}count\\b`,
    `\\bcomponent${SEP}render${SEP}count\\b`,
    `\\bobservation${SEP}(?:reused|executed)${SEP}count\\b`,
    `\\b(?:executor|execution|executed|render(?:s|ed|er|ers|ing)?|component|observation|freshness)(?:'s)?${GAP}(?:\\w+${GAP}){0,2}(?:re${SEP}us(?:e|ed|es|ing)|re${SEP}comput\\w*|re${SEP}render\\w*)\\b`,
    `\\bre${SEP}us(?:e|ed|es|ing)${GAP}(?:\\w+${GAP}){0,2}(?:components?|instances?|outputs?|observations?)\\b`,
    `\\bcache${SEP}hits?\\b`,
    `\\bserved${GAP}from${GAP}(?:the${GAP})?cache\\b`,
  ].join("|"),
  "i",
);
/** Sentence units: a sentence end before whitespace, a blank line, or a line opening a list item, heading, table row or quote. */
const SENTENCE_BREAK = /(?<=[.!?])\s+|\n\s*\n|\n(?=\s*(?:[-*+]\s|\d+[.)]\s|#|\||>))/;
/** The named character references the normalized view decodes beside every numeric one. */
const NAMED_REFERENCES: Readonly<Record<string, string>> = {
  lowbar: "_", UnderBar: "_", hyphen: "-", dash: "-", period: ".", colon: ":", nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, absent today) Pi reads no rf context plan: no src module or native descriptor spells an rf plan verb, the rf roster stays reactivefiber.render.preview only, and both readers refuse the measured context.plan envelope",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(a) the measured context.plan envelope whose row decision is refresh_required: no Pi string claims the render refreshed, reused or recomputed that instance",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(b) the measured committed render reporting component reuse: no 'predicted' / 'plan' wording about that reuse and no back-filled plan decision",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6"],
  },
  {
    id: "D",
    label: "(c) docs census: no sentence in docs/workbench equates a plan decision with an executed render's reuse",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label: "(d) any Pi string carrying a plan decision contains the producer enum word byte-for-byte",
    pins: ["E1", "E2", "E3"],
  },
  {
    id: "M",
    label: "the matchers rows A to E read: M1-M6 the spellings each must catch and pass, Q1-Q6 the pinned quiet rows of the named residuals",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
  },
];

interface PlanEnvelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string };
  transaction_id: null;
  result: JsonValue;
  diagnostics: JsonValue[];
}
interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly rfVersion: string;
  readonly citations: readonly string[];
  readonly decisions: readonly string[];
  readonly summaryKeys: readonly string[];
  readonly docsPlanSentences: readonly string[];
  readonly envelopes: { readonly plan: PlanEnvelope; readonly committed: JsonObject; readonly preview: JsonObject };
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function listOf(value: JsonValue | undefined, field: string): JsonValue[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value;
}
/** A measured envelope in the strict eight-key rf shape, refused by name when any key is missing or extra. */
function envelopeObject(value: unknown, name: string): JsonObject {
  const keys = ["schema", "ok", "command", "operation_id", "workspace", "transaction_id", "result", "diagnostics"];
  if (!isObject(value) || Object.keys(value).length !== keys.length || !keys.every(key => Object.hasOwn(value, key))) {
    throw new Error(`roster envelope ${name} must carry exactly the eight rf envelope keys`);
  }
  return objectOf(json(value), `roster envelope ${name}`);
}
/** The plan envelope in the type the injected-reader seam takes: a read, so its transaction is null. */
function planEnvelopeOf(value: unknown): PlanEnvelope {
  const envelope = envelopeObject(value, "plan");
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = envelope;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error("roster envelope plan needs a schema, ok, command and operation_id");
  }
  const place = objectOf(workspace, "roster envelope plan workspace");
  if (typeof place.id !== "string" || typeof place.root !== "string" || transactionId !== null || result === undefined) {
    throw new Error("roster envelope plan needs a workspace, a null transaction and a result");
  }
  return { schema, ok, command, operation_id: operationId, workspace: { id: place.id, root: place.root }, transaction_id: null, result, diagnostics: listOf(diagnostics, "plan diagnostics") };
}

/** Parses the roster file afresh, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes)) throw new Error("roster must be an object with rows and envelopes");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  if (typeof raw.rfVersion !== "string") throw new Error("roster needs rfVersion");
  return {
    rfVersion: raw.rfVersion,
    citations: strings(raw.citations, "citations"),
    decisions: strings(raw.decisions, "decisions"),
    summaryKeys: strings(raw.summaryKeys, "summaryKeys"),
    docsPlanSentences: strings(raw.docsPlanSentences, "docsPlanSentences"),
    envelopes: {
      plan: planEnvelopeOf(raw.envelopes.plan),
      committed: envelopeObject(raw.envelopes.committed, "committed"),
      preview: envelopeObject(raw.envelopes.preview, "preview"),
    },
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const { plan: PLAN, committed: COMMITTED, preview: PREVIEW } = ROSTER.envelopes;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every decision-bearing place of a JSON value: a string leaf or a key in DECISIONS or in the distinctive family, with its path. */
function decisionPlaces(value: unknown, path = "$"): string[] {
  const family = new RegExp(`^(?:${DECISION_FAMILY})$`, "i");
  const bearing = (text: string): boolean => DECISIONS.includes(text) || family.test(text);
  if (typeof value === "string") return bearing(value) ? [`${path}=${value}`] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => decisionPlaces(item, `${path}[${index}]`));
  if (isObject(value)) {
    return Object.entries(value).flatMap(([key, item]) => [...(bearing(key) ? [`${path}.{${key}}`] : []), ...decisionPlaces(item, `${path}.${key}`)]);
  }
  return [];
}
/** The spellings of the two distinctive decisions in a text, split into the producer's own bytes and respellings. */
function familySpellings(text: string): { producer: string[]; respelled: string[] } {
  const found = [...text.matchAll(new RegExp(DECISION_FAMILY, "gi"))].map(match => match[0]);
  return { producer: found.filter(word => DISTINCTIVE.includes(word)), respelled: found.filter(word => !DISTINCTIVE.includes(word)) };
}
/** Plan wording, a plan verb or a decision in any spelling: what no surfaced string about an executed reuse may carry. */
function planSpelled(text: string): boolean {
  return PLAN_WORDING.test(text) || PLAN_VERB.test(text) || DECISION_TOKEN.test(text) || new RegExp(DECISION_FAMILY, "i").test(text);
}
/** The decoded value of a numeric character reference, or nothing for a code point no string can hold. */
function codePoint(code: number): string {
  return Number.isInteger(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
}
/** The normalized view: HTML comments and tags removed, character references decoded, backslash escapes resolved, format
 * characters (zero-width, bidi) removed and NFKC applied, so markup or an invisible code point inside a word cannot split it. */
function normalized(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/&#(\d+);/g, (_match, code: string) => codePoint(Number(code)))
    .replace(/&#[xX]([0-9A-Fa-f]+);/g, (_match, code: string) => codePoint(Number.parseInt(code, 16)))
    .replace(/&([A-Za-z]+);/g, (match, name: string) => NAMED_REFERENCES[name] ?? match)
    .replace(/\\([!-/:-@[-`{-~])/g, "$1")
    .replace(/\p{Cf}/gu, "")
    .normalize("NFKC");
}
/** The sentence units of a text in both views, each with the view it was read in. */
function sentencesOf(text: string): { view: string; sentence: string }[] {
  const split = (view: string, body: string): { view: string; sentence: string }[] =>
    body.split(SENTENCE_BREAK).map(sentence => sentence.replace(/\s+/g, " ").trim()).filter(sentence => sentence.length > 0).map(sentence => ({ view, sentence }));
  return [...split("raw", text), ...split("normalized", normalized(text))];
}
/** D1's judge: a sentence names a plan term and an executed reuse together. */
const equates = (sentence: string): boolean => PLAN_TERM.test(sentence) && EXECUTED_TERM.test(sentence);

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing tracked. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

interface LiteralScan {
  /** Every string literal's cooked value and every template's literal parts joined by "<expr>". */
  readonly literals: string[];
  /** Every array literal holding "context" followed by "plan" (the argv shape). */
  readonly argv: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
const SCRIPT_KINDS: Readonly<Record<string, ts.ScriptKind>> = { ".ts": ts.ScriptKind.TS, ".mjs": ts.ScriptKind.JS, ".js": ts.ScriptKind.JS, ".cjs": ts.ScriptKind.JS };
/** One module's literals and its argv arrays, read through the TypeScript parser so an escape is read as the value it cooks to. */
function scanLiterals(fileName: string, text: string): LiteralScan {
  const extension = fileName.slice(fileName.lastIndexOf("."));
  const kind = SCRIPT_KINDS[extension];
  if (kind === undefined) return { literals: [], argv: [], renderArgv: 0, composedArgv: 0 };
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, kind);
  const literals: string[] = [];
  const argv: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if (word !== "context" || index + 1 >= words.length) return;
        const next = words[index + 1];
        if (next === "plan") argv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
        else if (next === "render") renderArgv += 1;
        else if (next === null) composedArgv += 1;
      });
    }
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join("<expr>"));
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { literals, argv, renderArgv, composedArgv };
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The roots E2 and E3 read; each floor sits below the count measured at base e877d48 (src 115 .ts modules, qa 67 files), so an
 * emptied or misdirected walk reds and an additive change does not. */
const CODE_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "src/workbench/providers/reactivefiber.ts", anchorToken: "context.render" },
  { root: "qa", floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
/** The docs root D reads: 68 markdown files at base e877d48 (floor 60); its anchor carries an executed-reuse term, so the
 * EXECUTED_TERM half of D1 is live on today's docs (non-vacuity), and the sentence floor sits below the measured 5366 units. */
const DOCS_ROOT = { root: "docs/workbench", floor: 60, sentenceFloor: 4000, anchorFile: "docs/workbench/receipts/wb-c7ku.md", anchorToken: "reused_component_count" };

/** A code root's distinctive-decision spellings: raw text and cooked literals of every file, with its floor and anchor read. */
function codeSpellings(scan: ScanRoot): { files: number; floorMet: boolean; anchorRead: boolean; producer: string[]; respelled: string[] } {
  const files = filesBelow(join(REPO, scan.root));
  const producer: string[] = [];
  const respelled: string[] = [];
  for (const file of files) {
    const text = textOf(file);
    const name = relative(REPO, file);
    const views = [text, ...scanLiterals(name, text).literals];
    const found = views.map(familySpellings);
    if (found.some(entry => entry.producer.length > 0)) producer.push(name);
    const respellings = [...new Set(found.flatMap(entry => entry.respelled))];
    if (respellings.length > 0) respelled.push(`${name}: ${respellings.join(", ")}`);
  }
  const anchor = join(REPO, scan.anchorFile);
  return {
    files: files.length, floorMet: files.length >= scan.floor, anchorRead: files.includes(anchor) && textOf(anchor).includes(scan.anchorToken), producer, respelled,
  };
}

/** Every sentence of docs/workbench in both views, with its file, after the floor and the anchor are read. */
function docsSentences(): { floorMet: boolean; sentenceFloorMet: boolean; anchorRead: boolean; executedSentences: boolean; sentences: { file: string; view: string; sentence: string }[] } {
  const files = filesBelow(join(REPO, DOCS_ROOT.root)).filter(file => file.endsWith(".md"));
  const sentences = files.flatMap(file => sentencesOf(textOf(file)).map(entry => ({ file: relative(REPO, file), ...entry })));
  const anchor = join(REPO, DOCS_ROOT.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(DOCS_ROOT.anchorToken);
  const raw = sentences.filter(entry => entry.view === "raw");
  return {
    floorMet: files.length >= DOCS_ROOT.floor, sentenceFloorMet: raw.length >= DOCS_ROOT.sentenceFloor, anchorRead,
    executedSentences: sentences.some(entry => entry.file === DOCS_ROOT.anchorFile && EXECUTED_TERM.test(entry.sentence)), sentences,
  };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-plan-prediction-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify(process.argv.slice(2)) + "\\n");`,
      `process.stdout.write(${JSON.stringify(JSON.stringify(answer))});`,
      `process.exit(${exit});`,
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log).trim().split("\n").filter(Boolean).map(line => JSON.parse(line) as string[]);
}
/** The verb a spawn ran: the two argv words after `--workspace <root>`. */
function verbOf(spawns: readonly string[][]): string[] {
  return (spawns[0] ?? []).slice(2, 4);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
/** A typed refusal; a type alias (not an interface) so it is a JsonValue a witness can carry. */
type Refusal = { readonly category: string; readonly message: string };
function refusalOf(error: unknown): Refusal {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

interface NativeOutcome {
  readonly refusal: Refusal | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender, rooted at the fixture root) against the
 * stand-in rf answering `answer`. */
async function nativeOutcome(answer: JsonValue, exit = 0): Promise<NativeOutcome> {
  const log = standInRf(answer, exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  let reading: JsonValue | null = null;
  let refusal: Refusal | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`. */
async function injectedReading(envelope: PlanEnvelope): Promise<{ reading: JsonValue; calls: number }> {
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, FIXTURE_ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source };
}
/** The adapter's outcome for a reading of `source`: its refusal, or its projection and every string the projection surfaces. */
function adapterOutcome(source: JsonValue): { refusal: Refusal | null; shown: string[]; topology: ReturnType<typeof reactivefiberTopology> | null } {
  try {
    const topology = reactivefiberTopology(readingOf(source), OBSERVER_CONTEXT);
    return { refusal: null, shown: stringLeaves(json(topology)), topology };
  } catch (error) {
    return { refusal: refusalOf(error), shown: [], topology: null };
  }
}

/** The value at a dotted path of an envelope ("result.work.storage_write_count"). */
function at(envelope: JsonObject, path: string): JsonValue | undefined {
  let value: JsonValue | undefined = envelope;
  for (const key of path.split(".")) value = isObject(value) ? value[key] : undefined;
  return value;
}
/** A copy of `envelope` with each named commit field set to its preview value: no transaction, no render id, ephemeral, no
 * commit sequence and no storage write. */
function asPreview(envelope: JsonObject, fields: readonly string[]): JsonObject {
  const copy = objectOf(json(envelope), "envelope copy");
  const preview: Readonly<Record<string, JsonValue>> = {
    transaction_id: null, "result.render_id": null, "result.ephemeral": true, "result.commit_seq": null, "result.work.storage_write_count": 0,
  };
  for (const field of fields) {
    const keys = field.split(".");
    const last = keys.pop();
    let parent: JsonValue | undefined = copy;
    for (const key of keys) parent = isObject(parent) ? parent[key] : undefined;
    if (last === undefined || !isObject(parent)) throw new Error(`no commit field ${field}`);
    parent[last] = preview[field] ?? null;
  }
  return copy;
}
/** The plan's rows. */
function planRows(): JsonObject[] {
  const plan = objectOf(objectOf(PLAN.result, "plan result").plan, "plan result.plan");
  return listOf(plan.rows, "plan rows").map((row, index) => objectOf(row, `plan rows[${index}]`));
}
/** The executor reuse counters of a render envelope: work_metrics.reused_component_count and rendered_component_count, and
 * work.component_render_count. */
function executorReuse(envelope: JsonObject): JsonObject {
  return {
    reused: at(envelope, "result.work_metrics.reused_component_count") ?? null,
    rendered: at(envelope, "result.work_metrics.rendered_component_count") ?? null,
    componentRenders: at(envelope, "result.work.component_render_count") ?? null,
    instances: listOf(at(envelope, "result.components"), "result.components").map(entry => objectOf(entry, "component").component_instance_id ?? null),
  };
}

let nativeCatalog: Promise<{ ids: string[]; texts: string[]; descriptors: { id: string; permissions: string[]; contractSource: string }[] }> | undefined;
/** The native registration's descriptors, loaded once: ids, JSON texts, permissions and contract sources. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[]; descriptors: { id: string; permissions: string[]; contractSource: string }[] }> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return {
      ids: descriptors.map(descriptor => descriptor.id),
      texts: descriptors.map(descriptor => JSON.stringify(descriptor)),
      descriptors: descriptors.map(descriptor => ({ id: descriptor.id, permissions: [...descriptor.permissions], contractSource: String(descriptor.contractSource ?? "") })),
    };
  });
  return nativeCatalog;
}
/** The rf members of a catalog, selected three ways: an rf id prefix, an rf permission, an rf contractSource. */
function rfMembers(descriptors: readonly { id: string; permissions: readonly string[]; contractSource: string }[]): JsonObject {
  const byId = descriptors.filter(entry => /^(?:reactivefiber|rf)[._-]/i.test(entry.id)).map(entry => entry.id);
  const byPermission = descriptors.filter(entry => entry.permissions.some(permission => /^(?:reactivefiber|rf)[:._-]/i.test(permission))).map(entry => entry.id);
  const byContract = descriptors.filter(entry => /^rf@/.test(entry.contractSource) || /reactive-fiber/i.test(entry.contractSource)).map(entry => entry.id);
  return { byId, byPermission, byContract };
}

interface Spelling {
  readonly text: string;
  readonly hit: boolean;
}
/** A matcher's verdict on each spelling, asserted against the spelling's expected hit. */
function spellingVerdicts(test: (text: string) => boolean, spellings: readonly Spelling[]): JsonValue {
  const verdicts = spellings.map(spelling => ({ text: spelling.text, hit: test(spelling.text) }));
  expect(verdicts).toStrictEqual(spellings.map(spelling => ({ text: spelling.text, hit: spelling.hit })));
  return verdicts;
}
const ZERO_WIDTH = String.fromCodePoint(0x200b);
const CYRILLIC_I = String.fromCodePoint(0x0456);

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanLiterals(relative(REPO, file), textOf(file)));
    const argv = found.flatMap(result => result.argv);
    const literals = found.flatMap(result => result.literals).filter(text => PLAN_VERB.test(text));
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((id, index) => PLAN_VERB.test(texts[index] ?? "") || /(?:^|[._-])plan(?:$|[._-])/i.test(id));
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, descriptorHits }, "an rf plan reader is a new cut: this census binds it").toStrictEqual({ argv: [], literals: [], descriptorHits: [] });
    return { srcFloorMet, renderArgvSeen, argv, literals, descriptorHits };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const injectedDescriptors = injected.catalogSnapshot().map(entry => ({
      id: entry.descriptor.id, permissions: [...entry.descriptor.permissions], contractSource: String(entry.descriptor.contractSource ?? ""),
    }));
    const native = rfMembers((await nativeDescriptors()).descriptors);
    const injectedMembers = rfMembers(injectedDescriptors);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const expected = { byId: [PREVIEW_ID], byPermission: [PREVIEW_ID], byContract: [PREVIEW_ID] };
    expect(native).toStrictEqual(expected);
    expect(injectedMembers).toStrictEqual(expected);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(REACTIVE_FIBER_CONTRACT_SOURCE).toContain(`${RENDER_COMMAND} --no-commit`);
    return { native, injected: injectedMembers, reconcile, contractSourceVerb: `${RENDER_COMMAND} --no-commit` };
  },
  A3: async () => {
    const outcome = await nativeOutcome(json(PLAN));
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(verbOf(outcome.spawns)).toStrictEqual(["context", "render"]);
    expect(outcome.refusal?.category).toBe("transport");
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), noCommit: outcome.spawns[0]?.includes("--no-commit") ?? false };
  },
  A4: async () => {
    const outcome = adapterOutcome(json(PLAN));
    expect(outcome.refusal?.category).toBe("validation");
    expect(outcome.topology).toBeNull();
    return outcome.refusal;
  },
  B1: async () => {
    const result = objectOf(PLAN.result, "plan result");
    const base = objectOf(result.base, "plan base");
    const summary = objectOf(result.summary, "plan summary");
    const rows = planRows();
    const row = rows[0];
    const causes = listOf(row?.causes, "row causes").map(cause => objectOf(cause, "cause"));
    const cause = causes[0];
    const partition = DECISIONS.reduce((sum, decision) => sum + Number(summary[decision] ?? 0), 0);
    const committedRender = at(COMMITTED, "result.render_id");
    expect({ command: PLAN.command, ok: PLAN.ok, transaction: PLAN.transaction_id }).toStrictEqual({ command: PLAN_COMMAND, ok: true, transaction: null });
    expect(rows).toHaveLength(1);
    expect({ instance: row?.component_instance_id, decision: row?.decision }).toStrictEqual({ instance: INSTANCE, decision: "refresh_required" });
    expect({ kind: cause?.kind, key: cause?.key, current: cause?.current }).toStrictEqual({ kind: "refresh_required", key: { kind: "source", id: "task" }, current: null });
    expect(Object.keys(summary)).toStrictEqual(SUMMARY_KEYS);
    expect({ partition, rows: summary.rows, refreshRequired: summary.refresh_required, reuse: summary.reuse }).toStrictEqual({ partition: 1, rows: 1, refreshRequired: 1, reuse: 0 });
    // The E1 pairing: this plan is rf context plan of the committed render, and that render's executor reused the same instance.
    expect({ render: result.render_id, base: base.render_id }).toStrictEqual({ render: committedRender, base: committedRender });
    return {
      command: PLAN.command, transaction: PLAN.transaction_id, instance: row?.component_instance_id ?? null, decision: row?.decision ?? null,
      cause: { kind: cause?.kind ?? null, key: cause?.key ?? null, current: cause?.current ?? null }, summary, planOf: committedRender ?? null,
    };
  },
  B2: async () => {
    const native = await nativeOutcome(json(PLAN));
    const adapter = adapterOutcome(json(PLAN));
    const { reading } = await injectedReading(planEnvelopeOf(json(PLAN)));
    const own = objectOf(reading, "reading");
    const surfaced: JsonObject = {
      nativeRefusal: native.refusal?.message ?? null,
      adapterRefusal: adapter.refusal?.message ?? null,
      readingContract: own.contract ?? null,
      readingWorkspaceRoot: own.workspaceRoot ?? null,
    };
    const texts = stringLeaves(surfaced);
    const claims = texts.filter(text => CLAIM.test(text));
    const decisions = texts.filter(text => DECISION_TOKEN.test(text) || new RegExp(DECISION_FAMILY, "i").test(text));
    const instance = texts.filter(text => text.includes(INSTANCE));
    expect(texts).toHaveLength(4);
    expect({ claims, decisions, instance }).toStrictEqual({ claims: [], decisions: [], instance: [] });
    return { surfaced, claims, decisions, instance };
  },
  B3: async () => {
    const handed = planEnvelopeOf(readRoster().envelopes.plan);
    const before = JSON.stringify(readRoster().envelopes.plan);
    const { reading, calls } = await injectedReading(handed);
    const own = objectOf(reading, "reading");
    const source = objectOf(own.source, "reading source");
    expect(Object.keys(own).sort()).toStrictEqual(["contract", "source", "workspaceRoot"]);
    expect(JSON.stringify(source)).toBe(before);
    expect(source.command).toBe(PLAN_COMMAND);
    expect(calls).toBe(1);
    return { readingKeys: Object.keys(own).sort(), contract: own.contract ?? null, command: source.command ?? null, verbatim: JSON.stringify(source) === before, calls };
  },
  C1: async () => {
    const committed = executorReuse(COMMITTED);
    const preview = executorReuse(PREVIEW);
    const admitted = await nativeOutcome(json(PREVIEW));
    const reading = objectOf(admitted.reading, "admitted preview reading");
    expect({ reused: 1, rendered: 0, componentRenders: 0, instances: [INSTANCE] }).toStrictEqual(committed);
    expect({ reused: 1, rendered: 0, componentRenders: 0, instances: [INSTANCE] }).toStrictEqual(preview);
    expect({ committedRenderId: typeof at(COMMITTED, "result.render_id"), committedTransaction: typeof COMMITTED.transaction_id, previewRenderId: at(PREVIEW, "result.render_id") }).toStrictEqual({
      committedRenderId: "string", committedTransaction: "string", previewRenderId: null,
    });
    expect(admitted.refusal).toBeNull();
    expect(JSON.stringify(reading.source)).toBe(JSON.stringify(PREVIEW));
    return { committed, preview, previewAdmitted: admitted.refusal === null, admittedVerbatim: JSON.stringify(reading.source) === JSON.stringify(PREVIEW) };
  },
  C2: async () => {
    const refused = await nativeOutcome(json(COMMITTED));
    const flipped = await nativeOutcome(asPreview(COMMITTED, COMMIT_FIELDS));
    const kept: JsonObject = {};
    for (const field of COMMIT_FIELDS) {
      const outcome = await nativeOutcome(asPreview(COMMITTED, COMMIT_FIELDS.filter(other => other !== field)));
      kept[field] = outcome.refusal?.message ?? null;
    }
    const message = refused.refusal?.message ?? "";
    expect(refused.reading).toBeNull();
    expect(refused.spawns).toHaveLength(1);
    expect(flipped.refusal, "the committed render with its commit fields set to the preview values is admitted").toBeNull();
    expect(Object.values(kept).every(text => text === message)).toBe(true);
    expect(planSpelled(message)).toBe(false);
    return { refusal: refused.refusal, flippedAdmitted: flipped.refusal === null, kept, planSpelled: planSpelled(message) };
  },
  C3: async () => {
    const refused = adapterOutcome(json(COMMITTED));
    const flipped = adapterOutcome(asPreview(COMMITTED, COMMIT_FIELDS));
    const message = refused.refusal?.message ?? "";
    expect(refused.refusal?.category).toBe("validation");
    expect(flipped.refusal, "the committed render with its commit fields set to the preview values projects").toBeNull();
    expect(planSpelled(message)).toBe(false);
    return { refusal: refused.refusal, flippedProjects: flipped.refusal === null, planSpelled: planSpelled(message) };
  },
  C4: async () => {
    const admitted = await nativeOutcome(json(PREVIEW));
    const reading = objectOf(admitted.reading, "admitted preview reading");
    const topology = reactivefiberTopology(reading, OBSERVER_CONTEXT);
    const shown = stringLeaves(json(topology));
    const snapshot = topology.snapshots[0];
    const planned = shown.filter(planSpelled);
    const claims = shown.filter(text => CLAIM.test(text));
    expect(topology.snapshots).toHaveLength(1);
    expect({ planned, claims }).toStrictEqual({ planned: [], claims: [] });
    return {
      statusText: snapshot?.node.statusText ?? null, coverage: snapshot?.coverage ?? null, notes: [...topology.diagnostics],
      evidenceRefs: (snapshot?.evidenceRefs ?? []).map(ref => ref.slice(0, ref.indexOf(":"))), planned, claims,
    };
  },
  C5: async () => {
    const withRow = (freshness: string, replayed: boolean): JsonObject => {
      const copy = objectOf(json(PREVIEW), "preview copy");
      objectOf(copy.result, "preview result").observations = [{ status: "observed", freshness, replayed }];
      return copy;
    };
    const reused = adapterOutcome(withRow("reused", true));
    const note = reused.shown.find(text => text.startsWith("observations:")) ?? "";
    const decisionsAsFreshness: JsonObject = {};
    for (const decision of DECISIONS) decisionsAsFreshness[decision] = adapterOutcome(withRow(decision, decision === "reuse")).refusal?.message ?? null;
    expect(note).toBe("observations: 1 row, 1 reused: partial");
    expect(planSpelled(note)).toBe(false);
    expect(Object.values(decisionsAsFreshness).every(message => typeof message === "string" && message.includes("freshness captured_at_render or reused"))).toBe(true);
    return { note, planSpelled: planSpelled(note), decisionsAsFreshness };
  },
  C6: async () => {
    const scans = READER_MODULES.map(module => ({ module, scan: scanLiterals(module, textOf(join(REPO, module))) }));
    const literalCounts = scans.map(entry => entry.scan.literals.length);
    const hits = scans.flatMap(entry => entry.scan.literals.filter(planSpelled).map(text => `${entry.module}: ${text}`));
    const reusedLiteral = scans.some(entry => entry.scan.literals.some(text => /\breused\b/.test(text)));
    expect(literalCounts.every(count => count >= 20), `reader module literals: ${literalCounts.join(", ")}`).toBe(true);
    expect(reusedLiteral, "the adapter's observations note still states the producer word reused").toBe(true);
    expect(hits).toEqual([]);
    return { modules: READER_MODULES, floorMet: literalCounts.every(count => count >= 20), reusedLiteral, hits };
  },
  D1: async () => {
    const docs = docsSentences();
    const hits = docs.sentences.filter(entry => equates(entry.sentence)).map(entry => `${entry.file} (${entry.view}): ${entry.sentence.slice(0, 160)}`);
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead && docs.executedSentences).toBe(true);
    expect(hits).toEqual([]);
    return { floorMet: docs.floorMet, sentenceFloorMet: docs.sentenceFloorMet, anchorRead: docs.anchorRead, executedSentences: docs.executedSentences, hits };
  },
  D2: async () => {
    const docs = docsSentences();
    const allowed = new Set(ROSTER.docsPlanSentences);
    const named = docs.sentences.filter(entry => PLAN_TERM.test(entry.sentence));
    const hits = [...new Set(named.filter(entry => !allowed.has(entry.sentence)).map(entry => `${entry.file}: ${entry.sentence.slice(0, 160)}`))];
    expect(docs.floorMet && docs.sentenceFloorMet && docs.anchorRead).toBe(true);
    expect(ROSTER.docsPlanSentences).toEqual([]);
    expect(hits).toEqual([]);
    return { floorMet: docs.floorMet, allowed: [...allowed], hits };
  },
  E1: async () => {
    const summaryDecisions = Object.keys(objectOf(objectOf(PLAN.result, "plan result").summary, "plan summary")).filter(key => key !== "rows" && key !== "evidence_complete");
    const { reading } = await injectedReading(planEnvelopeOf(readRoster().envelopes.plan));
    const fromReading = decisionPlaces(objectOf(reading, "reading").source);
    const fromProducer = decisionPlaces(JSON.parse(readFileSync(ROSTER_PATH, "utf8")).envelopes.plan);
    const values = planRows().map(row => row.decision ?? null);
    expect(summaryDecisions).toStrictEqual(DECISIONS);
    expect(values.every(value => typeof value === "string" && DECISIONS.includes(value))).toBe(true);
    expect(fromReading).toStrictEqual(fromProducer);
    expect(fromReading.filter(place => !DECISIONS.some(decision => place.endsWith(`=${decision}`) || place.endsWith(`{${decision}}`)))).toEqual([]);
    return { summaryDecisions, values, places: fromReading };
  },
  E2: async () => {
    const roots = CODE_ROOTS.map(scan => {
      const found = codeSpellings(scan);
      expect(found.floorMet, `${scan.root}: ${found.files} files walked, floor ${scan.floor}`).toBe(true);
      expect(found.anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
      expect(found.respelled, `respelled plan decisions under ${scan.root}`).toEqual([]);
      return { root: scan.root, floorMet: found.floorMet, anchorRead: found.anchorRead, respelled: found.respelled };
    });
    return { roots };
  },
  E3: async () => {
    const roots = CODE_ROOTS.map(scan => {
      const found = codeSpellings(scan);
      expect(found.floorMet && found.anchorRead).toBe(true);
      expect(found.producer, `files spelling ${DISTINCTIVE.join(" or ")} under ${scan.root}: a plan reader is a new cut this census binds`).toEqual([]);
      return { root: scan.root, producer: found.producer };
    });
    return { distinctive: DISTINCTIVE, roots };
  },
  M1: async () =>
    spellingVerdicts(text => CLAIM.test(text), [
      { text: "the render reused pc1:pc1", hit: true },
      { text: "the instance was re-used", hit: true },
      { text: "rf recomputed the component", hit: true },
      { text: "the block was refreshed", hit: true },
      { text: "the component was re-rendered", hit: true },
      { text: "the output was served from the cache", hit: true },
      { text: "a cache hit", hit: true },
      { text: "RF preview returned an unrecognized native envelope.", hit: false },
      { text: "ReactiveFiber topology refused: source must be a reactive-fiber.cli/v1 context.render envelope.", hit: false },
      { text: "refresh_required", hit: false },
    ]),
  M2: async () =>
    spellingVerdicts(planSpelled, [
      { text: "the plan", hit: true },
      { text: "rf predicted the reuse", hit: true },
      { text: "a reuse prediction", hit: true },
      { text: "the forecast", hit: true },
      { text: "the planner", hit: true },
      { text: "rf context.plan", hit: true },
      { text: "decision reuse", hit: true },
      { text: "Refresh-Required", hit: true },
      { text: "observations: 1 row, 1 reused: partial", hit: false },
      { text: "explain the render", hit: false },
      { text: "invalidated_component_count", hit: false },
    ]),
  M3: async () => {
    const respellings = ["refresh required", "refresh-required", "Refresh_Required", "REFRESH_REQUIRED", "refreshRequired", "non-reusable", "non reusable", "nonreusable", "NON_REUSABLE", "nonReusable"];
    const verdicts = respellings.map(text => ({ text, respelled: familySpellings(text).respelled.length === 1 }));
    const producer = DISTINCTIVE.map(text => ({ text, producer: familySpellings(text).producer.length === 1, respelled: familySpellings(text).respelled.length }));
    const cooked = scanLiterals("control.ts", 'const a = "refresh\\u005frequired"; const b = `non\\x5freusable`;').literals.map(text => familySpellings(text).producer.length);
    expect(verdicts.every(entry => entry.respelled)).toBe(true);
    expect(producer.every(entry => entry.producer && entry.respelled === 0)).toBe(true);
    expect(cooked, "an escape is read as the value it cooks to").toStrictEqual([1, 1]);
    return { verdicts, producer, cooked };
  },
  M4: async () =>
    spellingVerdicts(sentence => sentencesOf(sentence).some(entry => PLAN_TERM.test(entry.sentence)), [
      { text: "Pi runs rf context plan.", hit: true },
      { text: "The context.plan envelope.", hit: true },
      { text: "The Context-Plan leaf.", hit: true },
      { text: "The plan row for pc1.", hit: true },
      { text: "The plan's decisions.", hit: true },
      { text: "The planner answered.", hit: true },
      { text: "rf predicted the reuse.", hit: true },
      { text: "A reuse forecast.", hit: true },
      { text: "The row is refresh_required.", hit: true },
      { text: "The row is non-reusable.", hit: true },
      { text: "The row is refresh\\_required.", hit: true },
      { text: "The row is refresh<!-- x -->_required.", hit: true },
      { text: "The row is refresh&#95;required.", hit: true },
      { text: `The row is refresh${ZERO_WIDTH}_required.`, hit: true },
      { text: "The implementation plan lists the beads.", hit: false },
      { text: "It contradicts its M2.3 prediction.", hit: false },
      { text: "Disposable cache-plane writes may occur.", hit: false },
    ]),
  M5: async () =>
    spellingVerdicts(sentence => sentencesOf(sentence).some(entry => EXECUTED_TERM.test(entry.sentence)), [
      { text: "It states reused_component_count.", hit: true },
      { text: "It states observation_reused_count.", hit: true },
      { text: "The executor reused the component.", hit: true },
      { text: "The render then reused pc1.", hit: true },
      { text: "A row whose freshness is reused.", hit: true },
      { text: "rf reused the component output.", hit: true },
      { text: "The executor recomputed it.", hit: true },
      { text: "A cache hit.", hit: true },
      { text: "Served from the cache.", hit: true },
      { text: "A resume reuses the transcript.", hit: false },
      { text: "Disposable cache-plane writes may occur.", hit: false },
    ]),
  M6: async () =>
    spellingVerdicts(sentence => sentencesOf(sentence).some(entry => equates(entry.sentence)), [
      { text: "The plan's refresh_required row is what the render reused.", hit: true },
      { text: "rf context plan reports the reused_component_count.", hit: true },
      { text: "A non-reusable row means the executor recomputed the component.", hit: true },
      { text: "The context.plan reuse decision is the render's reuse.", hit: true },
      { text: "The plan row said refresh_required.", hit: false },
      { text: "The executor reused the component.", hit: false },
    ]),
  Q1: async () => {
    const homoglyph = `The row is refresh_requ${CYRILLIC_I}red.`;
    const spelled = familySpellings(normalized(homoglyph));
    const verdict = { planTerm: sentencesOf(homoglyph).some(entry => PLAN_TERM.test(entry.sentence)), family: spelled.producer.length + spelled.respelled.length };
    expect(verdict, "R-HOMOGLYPH: a look-alike letter still hides the decision; a matcher that now catches it re-reads this residual").toStrictEqual({ planTerm: false, family: 0 });
    return verdict;
  },
  Q2: async () => {
    const paraphrase = "What rf expected would need a fresh read, the render then took from its own store.";
    const verdict = { d1: sentencesOf(paraphrase).some(entry => equates(entry.sentence)), d2: sentencesOf(paraphrase).some(entry => PLAN_TERM.test(entry.sentence)) };
    expect(verdict, "R-PARAPHRASE: a reworded equation names neither term").toStrictEqual({ d1: false, d2: false });
    return verdict;
  },
  Q3: async () => {
    const split = "The plan row said refresh_required. The render reused it.";
    const verdict = { sentences: sentencesOf(split).filter(entry => entry.view === "raw").length, d1: sentencesOf(split).some(entry => equates(entry.sentence)), d2: sentencesOf(split).some(entry => PLAN_TERM.test(entry.sentence)) };
    expect(verdict, "R-SPLIT-SENTENCE: D1 misses an equation split in two, D2 catches its plan half").toStrictEqual({ sentences: 2, d1: false, d2: true });
    return verdict;
  },
  Q4: async () => {
    const control = (text: string): JsonValue => {
      const scan = scanLiterals("control.ts", text);
      return { argv: scan.argv.length, literals: scan.literals.filter(literal => PLAN_VERB.test(literal)).length, composed: scan.composedArgv };
    };
    const verdicts = {
      argv: control('spawn("rf", ["--workspace", w, "context", "plan", render, "--json"]);'),
      spaced: control('const cmd = "rf context plan rfr_x --json";'),
      dotted: control(`const id = "${PLAN_COMMAND}";`),
      template: control(["const cmd = `rf context  plan $", "{render}`;"].join("")),
      composed: control('const verb = "plan"; spawn("rf", ["context", verb]);'),
    };
    expect(verdicts).toStrictEqual({
      argv: { argv: 1, literals: 0, composed: 0 }, spaced: { argv: 0, literals: 1, composed: 0 }, dotted: { argv: 0, literals: 1, composed: 0 },
      template: { argv: 0, literals: 1, composed: 0 }, composed: { argv: 0, literals: 0, composed: 1 },
    });
    return verdicts;
  },
  Q5: async () => {
    const english = /(?<![A-Za-z0-9_])(?:reuse|invalidated)(?![A-Za-z0-9_])/;
    const srcSpells = filesBelow(join(REPO, "src")).some(file => english.test(textOf(file)));
    const readersSpell = READER_MODULES.some(module => scanLiterals(module, textOf(join(REPO, module))).literals.some(text => english.test(text)));
    const read = familySpellings("reuse invalidated").producer.length + familySpellings("reuse invalidated").respelled.length;
    expect({ srcSpells, readersSpell, read }, "R-ENGLISH-DECISIONS: src spells the ordinary words, E2/E3 do not read them, the reader modules carry neither").toStrictEqual({ srcSpells: true, readersSpell: false, read: 0 });
    return { srcSpells, readersSpell, read };
  },
  Q6: async () => {
    const rosterSpells = familySpellings(textOf(ROSTER_PATH)).producer.length > 0;
    const scanned = [...CODE_ROOTS.map(scan => scan.root), DOCS_ROOT.root];
    const outside = ["test", ".beads", "README.md", "examples", "docs/rpc.md", "docs/workflows.md"].every(path => !scanned.some(root => path === root || path.startsWith(`${root}/`)));
    expect({ rosterSpells, outside }, "R-SCOPE: the roster spells the decisions and no scanned root reads it").toStrictEqual({ rosterSpells: true, outside: true });
    return { rosterSpells, scanned, outside };
  },
};

describe("wb-pfxo.6 rf plan prediction census (RF-COMPOSITIONAL-ASSEMBLY-R7, posture leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:6", "D:2", "E:3", "M:12"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ decisions: DECISIONS, summaryKeys: SUMMARY_KEYS, citations: CITATIONS, rfVersion: "0.1.832" }).toStrictEqual({
      decisions: [...ROSTER.decisions], summaryKeys: [...ROSTER.summaryKeys], citations: [...ROSTER.citations], rfVersion: ROSTER.rfVersion,
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("registration: every test of this file is registered once, in roster order, in run mode, not inverted, and ran", ({ task }) => {
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
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice (an alias or a decoy)").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
  });
});
