/**
 * wb-pfxo.10 (RF-COMPOSITIONAL-ASSEMBLY-R11), a gated census with an until-then leg. Statement (bead notes, verbatim to its
 * citation): "When rf ships the standalone context plan basis statement summary.prediction (observed | conservative) (gated
 * rfc-mq7k6.41 / FOC-11-PL-01, open in RFCLI's store and adopted as CASM-P0c; context.plan.json carries no 'prediction' string at
 * the pin), Pi shall echo the word verbatim as the plan's basis and never derive a basis from the row decisions; until then Pi
 * claims no basis for a plan beyond the producer's summary counts and evidence_complete" (docs/programs/
 * compositional-assembly-2026-10-18/BEADS-2026-10-21.md:27@6a251bf73af5). Acceptance (verbatim): "(a) fixture context.plan
 * envelope without summary.prediction (the pin's shape): Pi surfaces no basis word; (b) fixture with summary.prediction
 * "conservative": Pi surfaces exactly 'conservative'; an unknown word is surfaced verbatim as unknown, never mapped to
 * observed/conservative; (c) additive-key admission: Pi's hermetic plan fixture (if one exists) accepts the new key without failing
 * closed-shape pins; (d) no Pi source derives 'observed' or 'conservative' from row decisions or counts."
 *
 * AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read in its checkout): context.plan.json $defs.summary requires exactly rows, reuse,
 * invalidated, non_reusable, refresh_required and evidence_complete (:682-689) and closes the object (additionalProperties false,
 * :690);
 * the file spells no 'prediction' (grep: 0 rows); the installed rf's copy of that schema is byte-identical (sha256 999638317d1a...,
 * held by the roster). R-029 (29-program-triage-2026-10-21.md:302-308@6a251bf73af5) rules that plan_status speculative|snapshot_exact
 * "is not a second vocabulary", so those two words, beside a case variant of a pair word, are the unknown words below.
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-23), in a scratch jsonl workspace of four
 * declarative components (banner impure; plain, notes and moved pure), each fed by one source (task, or a literal), one committed
 * render R1 (THE FIXTURE, test/fixtures/rf-plan-basis-echo-roster.json, keeps each envelope as rf printed it, the scratch root
 * rewritten to /fixture/rf-workspace, and lists the measured commands): planBefore is `rf context plan R1 --json` right after the
 * render (non_reusable 1 - the impure banner, cause completeness_forbids_reuse - and refresh_required 3: every source reaching an
 * instance); planAfter is the same verb after demo.moved's active revision moved (invalidated 1, cause producer_changed on
 * component_revision_id; non_reusable 1; refresh_required 2). Both exit 0 with no diagnostics; reuse is 0 in both (every rendered
 * instance here is source-fed, and the leaf names every source refresh_required). Neither carries a prediction key or a basis word.
 *
 * Pi has no plan reader: its one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts) and its reader
 * adapter (reactivefiber-observer.ts), which admit only context.render envelopes. The census pins what Pi does with a plan envelope:
 *  A, acceptance (a). A1 the measured plans: context.plan, exit 0, every pinned summary key present, no prediction key anywhere,
 *    no basis word among the producer's strings, the decision tally equal to the summary counts; A2 the native reader refuses each
 *    as an unrecognized envelope in one spawn of the render argv; A3 the registered reading (registerReactiveFiberRender, the
 *    injected-reader seam) carries each byte for byte, adds only its contract and workspace root, and surfaces no basis; A4 the
 *    adapter refuses each; A5 those are every rf surface Pi has: the rf roster is the preview alone (native and injected
 *    registrations by id, permission and contract source, RECONCILE_EVIDENCE_READS.reactivefiber) and no registered descriptor
 *    spells a plan verb or field.
 *  B, acceptance (b), over planAfter with result.summary.prediction added (the field rfc-mq7k6.41 names; constructed here, since no
 *    build serves it). B1 each variant differs from the measured plan at that one path, its counts unchanged and the measured
 *    envelope untouched; B2 the registered reading of "conservative" and "observed" surfaces exactly that word; B3 the registered
 *    reading of each unknown word surfaces it verbatim, never a pair word; B4 the native reader and the adapter refuse every variant.
 *  C, acceptance (c). C1 the plan reader this census reads every fixture through is open: it reads the six pinned keys by name and
 *    admits the additive key with counts and decisions unchanged, while a closed-shape control refuses every variant; C2 every
 *    context.plan envelope any test/** JSON fixture holds (this roster's two at least) admits the key the same way and keeps the
 *    eight-key envelope shape every Pi rf reader checks first; the count of such fixtures is not pinned, so a sibling fixture landing
 *    beside this one changes nothing here.
 *  D, acceptance (d). D1 a lexical scan of every src module - string, no-substitution and template literals and every identifier -
 *    finds no rf plan decision or count field spelled (PLAN_TOKENS by word, PLAN_EXACT whole) and so no module joining one with a
 *    basis-word literal, with floors, two precision anchors (attention.ts's constant basis "observed" and the adapter's observation
 *    status "observed", each in a module spelling no plan field) and every src file a parsed .ts module; D2 the detector's controls.
 *    The empty field list is the until-then posture (Pi reads no plan today), so the reader rfc-mq7k6.41 calls for reds it and
 *    re-cuts this census; the join is the standing guard that cut keeps.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label and
 * pins, every pin's witness, the schema facts, the words, the plan fields, the fixtures and the registered tests - is held to the
 * out-of-file roster, whose measured envelopes anchor the counts outside this file; the last case walks this file's vitest task tree
 * against the roster.
 * THE GATE-OPENING SIGNAL: A1 reads the pin's shape, so a re-measure at a build serving summary.prediction reds A1 by its
 * prediction key - the cue to re-cut this census to the shipped word (B2/B3 already pin the echo). No reader here is closed over the
 * summary (C1), so that red is A1's own claim, not a closed-shape failure.
 * RESIDUALS (named, each with a pinned quiet row): R-NO-PLAN-READER no Pi reader reads a context.plan envelope, so the producer's word
 * rides only the injected registered reading, which classifies nothing (quiet rows A2, A4, B4: both readers refuse); R-COMPOSED a
 * plan field composed from parts or read through a computed key is invisible to D1 (D2 R-COMPOSED reads 0 fields, 0 derivations);
 * R-COMPOSED-WORD a basis word composed from parts is invisible to the join (D2 reads 0 derivations, while its plan field still
 * reds D1); R-VOCABULARY a basis word outside the pair is invisible to the join (same reading); R-ROWS-ONLY a derivation from the
 * generic rows count alone spells no pinned field (D2 reads 0 and 0); R-CROSS-MODULE the join is per module, so a plan field read
 * in one module and the word chosen in another is invisible to it (D2 reads 0 and 0 for the choosing module; the reading module's
 * field still reds D1); R-INLINE-FIXTURE C2 reads JSON fixture files, so a plan envelope written inline in a .ts test is invisible to
 * it (C2's inline control reads 0 envelopes).
 * SCOPE: the envelopes are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when a
 * fixture re-measure re-reads them. "Pi source" in (d) is src/, the product modules; qa/ and test/ carry no Pi surface. No reader is
 * added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what A3, B2 and B3 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-plan-basis-echo-roster.json");
const ROOT = process.cwd();
/** The root every roster envelope names: the measured scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RF_VERSION = "0.1.832";
const RF_PIN = "6a251bf73af5";
const RF_SCHEMA = "reactive-fiber.cli/v1";
const PLAN_COMMAND = "context.plan";
const UNRECOGNIZED = "RF preview returned an unrecognized native envelope.";
const NOT_A_RENDER = "ReactiveFiber topology refused: source must be a reactive-fiber.cli/v1 context.render envelope.";
/** The pin's summary contract (context.plan.json $defs.summary required, :682-689@6a251bf73af5): the keys a plan reader reads. */
const SUMMARY_REQUIRED: readonly string[] = ["rows", "reuse", "invalidated", "non_reusable", "refresh_required", "evidence_complete"];
/** The four decisions the summary partitions its rows over (the same $defs.summary's description, :681: "the four sum to rows"). */
const DECISIONS: readonly string[] = ["reuse", "invalidated", "non_reusable", "refresh_required"];
const PREDICTION = "prediction";
const PREDICTION_PATH = "result.summary.prediction";
/** The producer's basis pair, summary.prediction observed | conservative (rfc-mq7k6.41 / FOC-11-PL-01). */
const BASIS_PAIR: readonly string[] = ["observed", "conservative"];
const KNOWN_WORDS: readonly string[] = ["conservative", "observed"];
/** Words outside the pair: speculative and snapshot_exact (the plan_status words R-029 rules are not a second vocabulary) and a pair
 * word in another case. */
const UNKNOWN_WORDS: readonly string[] = ["speculative", "snapshot_exact", "Conservative"];
const WORDS: readonly string[] = [...KNOWN_WORDS, ...UNKNOWN_WORDS];
const MEASURED = ["planBefore", "planAfter"] as const;
type FixtureName = (typeof MEASURED)[number];
/** The rf plan decision and count fields a basis derivation would read, matched as words in a literal or identifier: the summary
 * keys and decisions no other Pi vocabulary spells, the plan's own structure keys and cause kinds, their camelCase forms and the
 * prediction key itself. */
const PLAN_TOKENS: readonly string[] = [
  "non_reusable", "refresh_required", "evidence_complete", "reuse_enabled", "observed_instances", "proof_version",
  "completeness_forbids_reuse", "producer_changed", "graph_changed", "nonReusable", "refreshRequired", "evidenceComplete",
  "reuseEnabled", "observedInstances", "proofVersion", "prediction",
];
/** The two decisions whose words are plain English, matched only as a whole literal or identifier. */
const PLAN_EXACT: readonly string[] = ["reuse", "invalidated"];
const PLAN_TOKEN = new RegExp(`\\b(?:${PLAN_TOKENS.join("|")})\\b`, "i");
const PLAN_VERB = /\bcontext[\s._-]+plan\b/i;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) fixture context.plan envelope without summary.prediction (the pin's shape): Pi surfaces no basis word",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) fixture with summary.prediction \"conservative\": Pi surfaces exactly 'conservative'; an unknown word is surfaced verbatim as unknown, never mapped to observed/conservative",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(c) additive-key admission: Pi's hermetic plan fixture (if one exists) accepts the new key without failing closed-shape pins",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label: "(d) no Pi source derives 'observed' or 'conservative' from row decisions or counts",
    pins: ["D1", "D2"],
  },
];

interface Envelope {
  schema: string;
  ok: boolean;
  command: string;
  operation_id: string;
  workspace: { id: string; root: string } | null;
  transaction_id: string | null;
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
  readonly bead: string;
  readonly rfVersion: string;
  readonly pin: string;
  readonly schema: { readonly sha256: string; readonly summaryRequired: readonly string[]; readonly summaryAdditionalProperties: boolean; readonly predictionStrings: number };
  readonly words: { readonly known: readonly string[]; readonly unknown: readonly string[] };
  readonly planFields: { readonly tokens: readonly string[]; readonly exactWords: readonly string[] };
  readonly fixtures: readonly string[];
  readonly exits: Readonly<Record<FixtureName, number>>;
  readonly envelopes: Readonly<Record<FixtureName, Envelope>>;
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
function arrayOf(value: JsonValue | undefined, field: string): JsonValue[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be an array`);
  return value;
}

/** One envelope in the strict eight-key rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value) || Object.keys(value).length !== 8) throw new Error(`envelope ${name} must be an eight-key object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (workspace !== null && (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string")) {
    throw new Error(`envelope ${name} needs a workspace or null`);
  }
  if ((transactionId !== null && typeof transactionId !== "string") || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) {
    throw new Error(`envelope ${name} needs a transaction id or null, a result and diagnostics`);
  }
  return {
    schema, ok, command, operation_id: operationId, workspace: workspace === null ? null : { id: String(workspace.id), root: String(workspace.root) },
    transaction_id: transactionId, result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.exits) || !isObject(raw.schema) ||
    !isObject(raw.words) || !isObject(raw.planFields)) {
    throw new Error("roster must be an object with rows, envelopes, exits, schema, words and planFields");
  }
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
  const fixtures = strings(raw.fixtures, "fixtures");
  if (JSON.stringify(fixtures) !== JSON.stringify(MEASURED)) throw new Error(`roster fixtures must be ${MEASURED.join(", ")}`);
  const { envelopes: rawEnvelopes, exits: rawExits, schema, words, planFields } = raw;
  const envelopes = Object.fromEntries(MEASURED.map(name => [name, envelopeOf(rawEnvelopes[name], name)])) as Record<FixtureName, Envelope>;
  const exits = Object.fromEntries(MEASURED.map(name => {
    const exit = rawExits[name];
    if (typeof exit !== "number" || !Number.isSafeInteger(exit)) throw new Error(`roster exits.${name} must be an integer`);
    return [name, exit];
  })) as Record<FixtureName, number>;
  if (typeof raw.bead !== "string" || typeof raw.rfVersion !== "string" || typeof raw.pin !== "string") throw new Error("roster needs bead, rfVersion and pin");
  if (typeof schema.sha256 !== "string" || typeof schema.summaryAdditionalProperties !== "boolean" || typeof schema.predictionStrings !== "number") {
    throw new Error("roster schema needs sha256, summaryAdditionalProperties and predictionStrings");
  }
  return {
    bead: raw.bead, rfVersion: raw.rfVersion, pin: raw.pin,
    schema: { sha256: schema.sha256, summaryRequired: strings(schema.summaryRequired, "schema.summaryRequired"), summaryAdditionalProperties: schema.summaryAdditionalProperties, predictionStrings: schema.predictionStrings },
    words: { known: strings(words.known, "words.known"), unknown: strings(words.unknown, "words.unknown") },
    planFields: { tokens: strings(planFields.tokens, "planFields.tokens"), exactWords: strings(planFields.exactWords, "planFields.exactWords") },
    fixtures, exits, envelopes, rows, tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const ENVELOPES = ROSTER.envelopes;

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
/** The dotted path of every key a JSON value holds whose name matches `name`. */
function keyPaths(value: unknown, name: RegExp, path: readonly string[] = []): string[] {
  if (Array.isArray(value)) return value.flatMap((item: unknown, index: number) => keyPaths(item, name, [...path, String(index)]));
  if (!isObject(value)) return [];
  return Object.entries(value).flatMap(([key, item]) => [...(name.test(key) ? [[...path, key].join(".")] : []), ...keyPaths(item, name, [...path, key])]);
}
/** Every dotted leaf path at which two JSON values differ; a key one side lacks is a path. */
function diffPaths(left: unknown, right: unknown, path: readonly string[] = []): string[] {
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])].sort();
    return keys.flatMap(key => diffPaths(left[key], right[key], [...path, key]));
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return Array.from({ length: Math.max(left.length, right.length) }, (_unused, index) => diffPaths(left[index], right[index], [...path, String(index)])).flat();
  }
  return JSON.stringify(left) === JSON.stringify(right) ? [] : [path.join(".")];
}

/** The words a detector reads: camelCase split, every run of other characters a separator, lowercased. */
function wordsOf(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
const BASIS = new Set(BASIS_PAIR);
/** The basis-pair words a text spells, in any case. */
function basisWords(text: string): string[] {
  return wordsOf(text).filter(word => BASIS.has(word));
}

/** The plan reader every case reads a fixture through. It is open over the summary: it reads the six pinned keys by name, the
 * prediction key when stated, and tolerates any other key (C1). */
function planOf(envelope: Envelope): { counts: JsonObject; prediction: JsonValue | null; decisions: string[] } {
  const result = objectOf(envelope.result, `${envelope.command} result`);
  const summary = objectOf(result.summary, `${envelope.command} result.summary`);
  const missing = SUMMARY_REQUIRED.filter(key => !Object.hasOwn(summary, key));
  if (missing.length > 0) throw new Error(`${envelope.command} summary lacks ${missing.join(", ")}`);
  const counts: JsonObject = Object.fromEntries(SUMMARY_REQUIRED.map(key => [key, summary[key] ?? null]));
  const rows = arrayOf(objectOf(result.plan, `${envelope.command} result.plan`).rows, `${envelope.command} plan rows`);
  const decisions = rows.map((row, index) => String(objectOf(row, `plan rows[${index}]`).decision));
  return { counts, prediction: Object.hasOwn(summary, PREDICTION) ? (summary[PREDICTION] ?? null) : null, decisions };
}
/** The closed-shape control C1 holds the open reader against: it admits a summary only when its keys are exactly the six. */
function closedSummaryAdmits(envelope: Envelope): boolean {
  const summary = objectOf(objectOf(envelope.result, "plan result").summary, "plan result.summary");
  return JSON.stringify(Object.keys(summary).sort()) === JSON.stringify([...SUMMARY_REQUIRED].sort());
}
/** A plan with exactly one additive key, result.summary.prediction = word, as a deep copy: the plan handed in is never touched. */
function variantOf(envelope: Envelope, word: string): Envelope {
  const copy = envelopeOf(json(envelope), `${envelope.operation_id} variant`);
  objectOf(objectOf(copy.result, "variant result").summary, "variant summary")[PREDICTION] = word;
  return copy;
}

/** Every regular file below a root (symlinks are not followed); a path that vanishes mid-walk holds nothing. */
function filesBelow(directory: string): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...filesBelow(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Every successful context.plan envelope a JSON text holds, at any depth; a text that does not parse as JSON holds none. */
function planEnvelopesInText(text: string, name: string): Envelope[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return [];
  }
  const found: Envelope[] = [];
  const walk = (value: unknown): void => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (isObject(value)) {
      if (value.schema === RF_SCHEMA && value.command === PLAN_COMMAND && value.ok === true) found.push(envelopeOf(value, `${name} plan`));
      Object.values(value).forEach(walk);
    }
  };
  walk(parsed);
  return found;
}
function planEnvelopesIn(file: string): { file: string; envelope: Envelope }[] {
  return planEnvelopesInText(textOf(file), relative(REPO, file)).map(envelope => ({ file, envelope }));
}
/** R-INLINE-FIXTURE's quiet row: a plan envelope written inline in a .ts test is TypeScript, not JSON, so C2 reads none in it. */
const C2_INLINE = 'export const plan = { schema: "reactive-fiber.cli/v1", ok: true, command: "context.plan", operation_id: "rfo_x", workspace: null, transaction_id: null, result: { summary: {} }, diagnostics: [] };';

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: every spawn appends its JSON argv line to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-plan-basis-echo-");
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
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

/** The NATIVE preview's (registerNativeReactiveFiberRender) refusal of a plan answered by a stand-in rf, asserted: unrecognized,
 * no reading, one spawn of the render argv, and no basis word in what it says. */
async function nativeRefusal(answer: Envelope, exit: number): Promise<JsonValue> {
  const log = standInRf(json(answer), exit);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  const spawns = spawnsOf(log);
  const basis = basisWords(refusal?.message ?? "");
  expect(refusal).toStrictEqual({ category: "transport", message: UNRECOGNIZED });
  expect(reading).toBeNull();
  expect(spawns).toHaveLength(1);
  expect(spawns[0]).toContain("--no-commit");
  expect(basis).toEqual([]);
  return { ...refusal, reading: false, spawns: spawns.length, verb: verbOf(spawns), basis };
}

/** One registry invocation of the INJECTED preview whose reader answers a deep copy of `answer`. */
async function registeredReading(answer: Envelope): Promise<{ reading: JsonObject; calls: number }> {
  const handed = json(answer);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return handed as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  return { reading, calls };
}
/** The registered reading of `build(fixture)`, asserted byte for byte against the same build over a FRESH roster read serialized
 * before the invocation (so a reading mutated in place cannot pass as verbatim); the reader ran once, and the only strings Pi adds
 * are its contract and workspace root, neither a basis word. */
async function verbatimReading(name: FixtureName, build: (envelope: Envelope) => Envelope): Promise<{ witness: JsonObject; source: Envelope }> {
  const before = JSON.stringify(build(readRoster().envelopes[name]));
  const { reading, calls } = await registeredReading(build(ENVELOPES[name]));
  expect(JSON.stringify(reading.source)).toBe(before);
  expect(calls).toBe(1);
  const piStrings = stringLeaves({ ...reading, source: null });
  const piBasis = piStrings.flatMap(basisWords);
  expect(piStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(piBasis).toEqual([]);
  return { witness: { verbatim: true, calls, readingKeys: Object.keys(reading).sort(), piStrings, piBasis }, source: envelopeOf(reading.source, `${name} reading source`) };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
/** The adapter's refusal of a plan it must not project, asserted: a validation refusal naming no basis word. */
function adapterRefusal(envelope: Envelope): JsonValue {
  let caught: unknown;
  try {
    reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(envelope) }, FIXTURE_CONTEXT);
  } catch (error) {
    caught = error;
  }
  const refusal = refusalOf(caught);
  const basis = basisWords(refusal.message);
  expect(refusal).toStrictEqual({ category: "validation", message: NOT_A_RENDER });
  expect(basis).toEqual([]);
  return { ...refusal, basis };
}

let nativeCatalog: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeCatalog ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeCatalog;
}
/** The rf descriptors of a catalog, by any of the three selectors: id prefix, permission family or contract source. */
function rfIds(descriptors: readonly CapabilityDescriptor[]): string[] {
  return descriptors
    .filter(descriptor => descriptor.id.startsWith("reactivefiber.") || descriptor.id.startsWith("rf.") ||
      descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").includes("reactive-fiber.cli"))
    .map(descriptor => descriptor.id);
}

interface Lexicon {
  readonly file: string;
  readonly literals: string[];
  readonly identifiers: string[];
}
/** One module's lexicon: its string, no-substitution and template literals (a template's literal parts joined by a space) and every
 * identifier. */
function lexiconOf(fileName: string, text: string): Lexicon {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const identifiers: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    else if (ts.isIdentifier(node)) identifiers.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file: fileName, literals, identifiers };
}
/** A plan decision or count field spelled: a PLAN_TOKENS word inside the text, or the whole text a PLAN_EXACT word. */
function planField(text: string): boolean {
  return PLAN_TOKEN.test(text) || PLAN_EXACT.includes(text);
}
function planFieldsOf(lexicon: Lexicon): string[] {
  return [...lexicon.literals, ...lexicon.identifiers].filter(planField);
}
function basisLiteralsOf(lexicon: Lexicon): string[] {
  return lexicon.literals.filter(item => basisWords(item).length > 0);
}
/** A derivation: one module spelling a plan field beside a basis-word literal; null for none. */
function derivationOf(lexicon: Lexicon): string | null {
  const fields = planFieldsOf(lexicon);
  const basis = basisLiteralsOf(lexicon);
  return fields.length > 0 && basis.length > 0 ? `${lexicon.file}: ${fields[0] ?? ""} + ${(basis[0] ?? "").slice(0, 80)}` : null;
}
let srcLexica: Lexicon[] | undefined;
/** Every src .ts module's lexicon, parsed once. */
function srcLexicon(): Lexicon[] {
  srcLexica ??= filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => lexiconOf(relative(REPO, file), textOf(file)));
  return srcLexica;
}
/** The src files the lexicon does not parse: every src file is a .ts module at base, so a file of another kind reds D1 until read. */
function unparsedSrc(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => !file.endsWith(".ts")).map(file => relative(REPO, file));
}
/** A precision anchor: the module carries the literal "observed" for its own vocabulary and spells no plan field. */
function anchorOf(lexica: readonly Lexicon[], file: string): boolean {
  const lexicon = lexica.find(entry => entry.file === file);
  if (lexicon === undefined) return false;
  return lexicon.literals.includes("observed") && planFieldsOf(lexicon).length === 0;
}

const D2_FLAGGED: Readonly<Record<string, string>> = {
  countToWord: 'const basis = summary.refresh_required > 0 ? "conservative" : "observed";',
  decisionToWord: 'const basis = rows.every(row => row.decision === "reuse") ? "observed" : "conservative";',
  camelCount: 'const basis = plan.nonReusable > 0 ? "conservative" : "observed";',
  evidenceFlag: 'const basis = summary.evidence_complete ? "observed" : "conservative";',
  elementAccess: 'const basis = summary["invalidated"] ? "conservative" : "observed";',
  destructured: 'const { refresh_required: pending } = summary; export const basis = pending ? "conservative" : "observed";',
  template: ["const label = `plan basis: $", '{summary.non_reusable ? "conservative" : "observed"}`;'].join(""),
  upperCase: 'const basis = counts.invalidated ? "CONSERVATIVE" : "Observed";',
  instances: 'const basis = current.observed_instances.length > 0 ? "observed" : "conservative";',
  predictionFallback: 'const basis = summary.prediction ?? (summary.reuse === summary.rows ? "observed" : "conservative");',
};
const D2_QUIET: Readonly<Record<string, string>> = {
  attentionConstant: 'export const report = { basis: "observed", counts: { active: 1 } };',
  observerStatus: ["const OBSERVED = new Set([\"observed\", \"null\"]); const note = `$", "{count} not observed`;"].join(""),
  echoVerbatim: 'const basis = typeof summary.prediction === "string" ? summary.prediction : null;',
  countsVerbatim: "const shown = { rows: summary.rows, refresh: summary.refresh_required, complete: summary.evidence_complete };",
};
const D2_RESIDUALS: Readonly<Record<string, string>> = {
  "R-COMPOSED": 'const key = ["refresh", "required"].join("_"); export const basis = summary[key] ? "conservative" : "observed";',
  "R-COMPOSED-WORD": 'export const basis = summary.refresh_required ? "conserv" + "ative" : "obs" + "erved";',
  "R-VOCABULARY": 'export const basis = summary.refresh_required ? "speculative" : "exact";',
  "R-ROWS-ONLY": 'export const basis = summary.rows > 1 ? "conservative" : "observed";',
  "R-CROSS-MODULE": 'import { pending } from "./plan-reader.js"; export const basis = pending ? "conservative" : "observed";',
};
/** A control's D1 reading: whether it joins a plan field with a basis word, and how many plan fields it spells. */
function d2Reading(text: string): JsonObject {
  const lexicon = lexiconOf("control.ts", text);
  return { derivations: derivationOf(lexicon) === null ? 0 : 1, planFields: planFieldsOf(lexicon).length };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const facts: JsonObject = {};
    for (const name of MEASURED) {
      const envelope = ENVELOPES[name];
      const { counts, prediction, decisions } = planOf(envelope);
      const summary = objectOf(objectOf(envelope.result, `${name} result`).summary, `${name} result.summary`);
      const missing = SUMMARY_REQUIRED.filter(key => !Object.hasOwn(summary, key));
      const predictionKeys = keyPaths(envelope, /prediction/i);
      const basis = stringLeaves(envelope).filter(text => basisWords(text).length > 0);
      const tally: JsonObject = Object.fromEntries(DECISIONS.map(decision => [decision, decisions.filter(item => item === decision).length]));
      const tallyAgrees = DECISIONS.every(decision => counts[decision] === tally[decision]) && counts.rows === decisions.length;
      expect([envelope.schema, envelope.command, envelope.ok, ROSTER.exits[name], envelope.diagnostics.length]).toEqual([RF_SCHEMA, PLAN_COMMAND, true, 0, 0]);
      expect(missing).toEqual([]);
      expect(predictionKeys, `${name}: a prediction key at the pin's shape`).toEqual([]);
      expect(prediction).toBeNull();
      expect(basis, `${name}: a basis word among the producer's strings`).toEqual([]);
      expect(tallyAgrees).toBe(true);
      facts[name] = { command: envelope.command, exit: ROSTER.exits[name], counts, decisions, missing, predictionKeys, basis, tallyAgrees };
    }
    return facts;
  },
  A2: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) witness[name] = await nativeRefusal(ENVELOPES[name], ROSTER.exits[name]);
    return witness;
  },
  A3: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const { witness: own, source } = await verbatimReading(name, envelope => envelope);
      const surfaced = planOf(source).prediction;
      expect(surfaced).toBeNull();
      witness[name] = { ...own, surfaced };
    }
    return witness;
  },
  A4: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) witness[name] = adapterRefusal(ENVELOPES[name]);
    return witness;
  },
  A5: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const descriptors = await nativeDescriptors();
    const injectedDescriptors = injected.catalogSnapshot().map(entry => entry.descriptor);
    const native = rfIds(descriptors);
    const injectedIds = rfIds(injectedDescriptors);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const planSpelling = [...descriptors, ...injectedDescriptors]
      .filter(descriptor => PLAN_VERB.test(JSON.stringify(descriptor)) || PLAN_TOKEN.test(JSON.stringify(descriptor)))
      .map(descriptor => descriptor.id);
    // Non-vacuity: the selector read a catalog holding at least one provider that is not rf, and excluded it.
    const catalogRead = native.length > 0 && descriptors.length > native.length;
    expect(catalogRead, `native descriptors ${descriptors.length}, rf ${native.length}`).toBe(true);
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(planSpelling, "a registered descriptor spelling an rf plan verb or field").toEqual([]);
    return { catalogRead, native, injected: injectedIds, reconcile, planSpelling };
  },
  B1: async () => {
    const base = ENVELOPES.planAfter;
    const pristine = JSON.stringify(readRoster().envelopes.planAfter);
    const variants: JsonObject = {};
    for (const word of WORDS) {
      const variant = variantOf(base, word);
      const paths = diffPaths(base, variant);
      const read = planOf(variant);
      expect(paths).toEqual([PREDICTION_PATH]);
      expect(read.counts).toStrictEqual(planOf(base).counts);
      expect(read.prediction).toBe(word);
      variants[word] = { paths, prediction: read.prediction, countsKept: true };
    }
    const baseUntouched = JSON.stringify(base) === pristine;
    expect(baseUntouched).toBe(true);
    return { base: "planAfter", variants, baseUntouched };
  },
  B2: async () => {
    const witness: JsonObject = {};
    for (const word of KNOWN_WORDS) {
      const { witness: own, source } = await verbatimReading("planAfter", envelope => variantOf(envelope, word));
      const surfaced = planOf(source).prediction;
      expect(surfaced).toBe(word);
      witness[word] = { ...own, surfaced };
    }
    return witness;
  },
  B3: async () => {
    const witness: JsonObject = {};
    for (const word of UNKNOWN_WORDS) {
      const { witness: own, source } = await verbatimReading("planAfter", envelope => variantOf(envelope, word));
      const surfaced = planOf(source).prediction;
      const mapped = typeof surfaced === "string" && BASIS_PAIR.includes(surfaced);
      expect(surfaced).toBe(word);
      expect(mapped).toBe(false);
      witness[word] = { ...own, surfaced, mapped };
    }
    return witness;
  },
  B4: async () => {
    const witness: JsonObject = {};
    for (const word of WORDS) {
      const variant = variantOf(ENVELOPES.planAfter, word);
      witness[word] = { native: await nativeRefusal(variant, ROSTER.exits.planAfter), adapter: adapterRefusal(variant) };
    }
    return witness;
  },
  C1: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const measured = planOf(ENVELOPES[name]);
      const closedOnMeasured = closedSummaryAdmits(ENVELOPES[name]);
      const words: JsonObject = {};
      for (const word of WORDS) {
        const variant = variantOf(ENVELOPES[name], word);
        const read = planOf(variant);
        expect(read.counts).toStrictEqual(measured.counts);
        expect(read.decisions).toStrictEqual(measured.decisions);
        expect(read.prediction).toBe(word);
        words[word] = { open: true, closedControl: closedSummaryAdmits(variant) };
      }
      expect(closedOnMeasured).toBe(true);
      expect(Object.values(words).map(entry => objectOf(entry, "C1 entry").closedControl)).toEqual(WORDS.map(() => false));
      witness[name] = { closedOnMeasured, words };
    }
    return witness;
  },
  C2: async () => {
    const found = filesBelow(HERE).filter(file => file.endsWith(".json")).flatMap(planEnvelopesIn);
    const listed = found.map(entry => `${relative(REPO, entry.file)}#${entry.envelope.operation_id}`);
    const ownFound = MEASURED.map(name => found.some(entry => entry.file === ROSTER_PATH && entry.envelope.operation_id === ENVELOPES[name].operation_id));
    const floorMet = found.length >= MEASURED.length;
    const refusedBy = found.flatMap(entry => {
      const variant = variantOf(entry.envelope, "conservative");
      const before = planOf(entry.envelope);
      const after = planOf(variant);
      const admitted = JSON.stringify(after.counts) === JSON.stringify(before.counts) && JSON.stringify(after.decisions) === JSON.stringify(before.decisions) &&
        after.prediction === "conservative" && Object.keys(variant).length === 8;
      return admitted ? [] : [`${relative(REPO, entry.file)}#${entry.envelope.operation_id}`];
    });
    expect(floorMet, `plan envelopes under test/: ${listed.join(", ")}`).toBe(true);
    expect(ownFound).toEqual(MEASURED.map(() => true));
    const residuals = { "R-INLINE-FIXTURE": planEnvelopesInText(C2_INLINE, "inline control").length };
    expect(refusedBy, "a hermetic plan fixture the additive key breaks").toEqual([]);
    expect(residuals).toStrictEqual({ "R-INLINE-FIXTURE": 0 });
    return { floorMet, ownFound, refusedBy, residuals };
  },
  D1: async () => {
    const lexica = srcLexicon();
    const literals = lexica.reduce((sum, lexicon) => sum + lexicon.literals.length, 0);
    const identifiers = lexica.reduce((sum, lexicon) => sum + lexicon.identifiers.length, 0);
    const basisSites = lexica.reduce((sum, lexicon) => sum + basisLiteralsOf(lexicon).length, 0);
    const planFields = lexica.flatMap(lexicon => planFieldsOf(lexicon).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const derivations = lexica.flatMap(lexicon => {
      const found = derivationOf(lexicon);
      return found === null ? [] : [found];
    });
    const floors = { modules: lexica.length >= 100, literals: literals >= 5000, identifiers: identifiers >= 50000, basisSites: basisSites >= 20 };
    const anchors = { attention: anchorOf(lexica, "src/workbench/attention.ts"), observer: anchorOf(lexica, "src/workbench/reactivefiber-observer.ts") };
    const unparsed = unparsedSrc();
    expect(floors, `src modules ${lexica.length}, literals ${literals}, identifiers ${identifiers}, basis-word literals ${basisSites}`).toStrictEqual({ modules: true, literals: true, identifiers: true, basisSites: true });
    expect(anchors).toStrictEqual({ attention: true, observer: true });
    expect(unparsed, "a src file the lexical scan does not parse").toEqual([]);
    expect(planFields, "a src literal or identifier spelling an rf plan decision or count field").toEqual([]);
    expect(derivations, "a src module joining an rf plan field with a basis word").toEqual([]);
    return { floors, anchors, unparsed, planFields, derivations };
  },
  D2: async () => {
    const flagged = Object.fromEntries(Object.entries(D2_FLAGGED).map(([name, text]) => [name, d2Reading(text)]));
    const quiet = Object.fromEntries(Object.entries(D2_QUIET).map(([name, text]) => [name, d2Reading(text)]));
    const residuals = Object.fromEntries(Object.entries(D2_RESIDUALS).map(([name, text]) => [name, d2Reading(text)]));
    expect(Object.values(flagged).map(reading => reading.derivations)).toEqual(Object.keys(D2_FLAGGED).map(() => 1));
    expect(Object.values(quiet).map(reading => reading.derivations)).toEqual(Object.keys(D2_QUIET).map(() => 0));
    expect(Object.values(residuals).map(reading => reading.derivations)).toEqual(Object.keys(D2_RESIDUALS).map(() => 0));
    return { flagged, quiet, residuals };
  },
};

describe("wb-pfxo.10 rf plan basis echo census (RF-COMPOSITIONAL-ASSEMBLY-R11, gated on rfc-mq7k6.41, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: "wb-pfxo.10", rfVersion: RF_VERSION, pin: RF_PIN, summaryRequired: SUMMARY_REQUIRED, words: { known: KNOWN_WORDS, unknown: UNKNOWN_WORDS },
      planFields: { tokens: PLAN_TOKENS, exactWords: PLAN_EXACT }, fixtures: [...MEASURED],
    }).toStrictEqual({
      bead: ROSTER.bead, rfVersion: ROSTER.rfVersion, pin: ROSTER.pin, summaryRequired: [...ROSTER.schema.summaryRequired],
      words: { known: [...ROSTER.words.known], unknown: [...ROSTER.words.unknown] },
      planFields: { tokens: [...ROSTER.planFields.tokens], exactWords: [...ROSTER.planFields.exactWords] }, fixtures: [...ROSTER.fixtures],
    });
    // The pin's schema facts the roster holds: the summary is closed at the producer and spells no prediction; the pair is the pin's.
    expect([ROSTER.schema.summaryAdditionalProperties, ROSTER.schema.predictionStrings, ROSTER.schema.sha256.length]).toEqual([false, 0, 64]);
    expect([...KNOWN_WORDS].sort()).toEqual([...BASIS_PAIR].sort());
    // Every fixture names the rewritten scratch root, and both plan one committed render.
    expect(MEASURED.map(name => ENVELOPES[name].workspace?.root ?? null)).toEqual([FIXTURE_ROOT, FIXTURE_ROOT]);
    expect(new Set(MEASURED.map(name => String(objectOf(ENVELOPES[name].result, name).render_id))).size).toBe(1);
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

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
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
