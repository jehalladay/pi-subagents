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
 * Pi has no plan reader: its rf readers are the reactivefiber.render.preview provider (providers/reactivefiber.ts, the native and
 * the injected registration), its reader adapter (reactivefiber-observer.ts) and the native-evidence projection (native-evidence.ts),
 * and each admits only context.render envelopes. The census pins what Pi does with a plan envelope:
 *  A, acceptance (a). A1 the measured plans: context.plan, exit 0, every pinned summary key present, no prediction key anywhere,
 *    no basis word among the producer's strings, the decision tally equal to the summary counts; A2 the native reader refuses each
 *    as an unrecognized envelope in one spawn of the render argv; A3 the registered reading (registerReactiveFiberRender, the
 *    injected-reader seam) carries each byte for byte, adds only its contract and workspace root, and surfaces no basis, and native
 *    evidence projects nothing from that reading; A4 the adapter refuses each; A5 those are every rf surface Pi has, read through
 *    the metadata and blind to it: the rf selectors (id prefix, permission family, contract source) over the native catalog and the
 *    injected registration, and RECONCILE_EVIDENCE_READS.reactivefiber, read the preview alone and no registered descriptor spells
 *    a plan verb or field; everything the two rf registration functions register is the preview alone, so a sibling registered
 *    beside it under a neutral id, permission and contract reds A5; src spells the rf binary name as a whole literal exactly once
 *    (the provider's one spawn); the rf schema (REACTIVE_FIBER_CLI_SCHEMA or its value) is spelled by exactly the three reader
 *    modules; and the provider module's exports are used by exactly the pinned importers, by name (a member read off a provider
 *    namespace by a computed key is no name: R-UNNAMED-RF).
 *  B, acceptance (b), over planAfter with result.summary.prediction added (the field rfc-mq7k6.41 names; constructed here, since no
 *    build serves it). B1 each variant differs from the measured plan at that one path, its counts unchanged and the measured
 *    envelope untouched; B2 the registered reading of "conservative" and "observed" surfaces exactly that word, and native evidence
 *    projects nothing from it; B3 the registered reading of each unknown word surfaces it verbatim, never a pair word, and native
 *    evidence projects nothing; B4 the native reader and the adapter refuse every variant.
 *  C, acceptance (c). C1 the plan reader this census reads every fixture through is open: it reads the six pinned keys by name and
 *    admits the additive key with counts and decisions unchanged, while a closed-shape control refuses every variant; C2 every
 *    context.plan envelope any test/** fixture holds (this roster's two at least) admits the key the same way and keeps the
 *    eight-key envelope shape every Pi rf reader checks first. C2 reads every file below test/ that is not code (.ts, .js and their
 *    kin): a text that parses as JSON whole, else each of its lines, so a .jsonl fixture is read line by line; its walk holds every
 *    such path git lists below test/. The count of plan fixtures is not pinned, so a sibling fixture landing beside this one changes
 *    nothing here.
 *  D, acceptance (d). D1 a lexical scan of every src module - string, no-substitution, template and regular-expression literals and
 *    every identifier - finds no rf plan decision or count field spelled and so no module joining one with a basis-word literal. A
 *    text spells a field when it holds a PLAN_TOKENS word (by word, any case), is a PLAN_EXACT word whole, holds a multi-word plan
 *    token inside one whitespace-free chunk under a separator or camelCase transform (refresh-required, graph.changed,
 *    refreshRequiredCount), or is nothing but plan words under such a transform (REUSE, "reuse invalidated", "refresh required");
 *    prose stays quiet. The walk lists every src entry and follows no link: a regular .ts file is parsed, anything else (a symlink,
 *    a file of another kind, a file that cannot be read) is reported unparsed, and the walk holds every path git lists below src/
 *    (tracked or untracked, never ignored). Floors hold the walk, the listing, the literals, the regular-expression literals, the
 *    identifiers and the basis-word sites, and two precision anchors hold the join (attention.ts's constant basis "observed" and
 *    the adapter's observation status "observed", each in a module spelling no plan field); D2 the detector's controls. The empty
 *    field list is the until-then posture (Pi reads no plan today), so the reader rfc-mq7k6.41 calls for reds it and re-cuts this
 *    census; the join is the standing guard that cut keeps.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label and
 * pins, every pin's witness, the schema facts, the words, the plan fields, the fixtures and the registered tests - is held to the
 * out-of-file roster, whose measured envelopes anchor the counts outside this file; the last case walks this file's vitest task tree
 * against the roster. OUTSIDE ANCHORS beyond the roster (wb-411q, the landing-284 gate's F2): the owner filing's row of wb-pfxo.10 in
 * the tracked bead export (.beads/issues.jsonl) states the acceptance clauses (a)-(d), the row labels are those clauses verbatim and
 * in order, and clause (d) quotes the basis pair; the REACH record holds rows A and B to src: every surface helper records the row
 * that reached it, and the reach case requires that row A reached every rf surface src holds (each descriptor the two rf
 * registration functions register, and each module spelling the rf schema) for each measured plan, that row B reached each for each
 * word, and that every passing roster pin reached its witness comparison; a row with a red pin is red there already, so it is
 * not held.
 * THE GATE-OPENING SIGNAL: A1 reads the pin's shape, so a re-measure at a build serving summary.prediction reds A1 by its
 * prediction key - the cue to re-cut this census to the shipped word (B2/B3 already pin the echo). No reader here is closed over the
 * summary (C1), so that red is A1's own claim, not a closed-shape failure.
 * RESIDUALS (named, each with a pinned quiet row): R-NO-PLAN-READER no Pi reader reads a context.plan envelope, so the producer's word
 * rides only the injected registered reading, which classifies nothing (quiet rows A2, A4, B4: both readers refuse; A3, B2, B3: native
 * evidence projects nothing); R-COMPOSED a plan field composed from parts or read through a computed key is invisible to D1 (D2
 * R-COMPOSED reads 0 fields, 0 derivations); R-COMPOSED-WORD a basis word composed from parts is invisible to the join (D2 reads 0
 * derivations, while its plan field still reds D1); R-VOCABULARY a basis word outside the pair is invisible to the join (same
 * reading); R-ROWS-ONLY a derivation from the generic rows count alone spells no pinned field (D2 reads 0 and 0); R-CROSS-MODULE the
 * join is per module, so a plan field read in one module and the word chosen in another is invisible to it (D2 reads 0 and 0 for the
 * choosing module; the reading module's field still reds D1); R-PROSE a plan field spelled as separate words inside a longer literal
 * is invisible to D1, which keeps prose naming a refresh or a reuse quiet (D2 R-PROSE reads 0 and 0, beside the prose quiet
 * control); R-UNNAMED-RF an rf process reached through a binary name composed at runtime or handed in as data, or through a provider
 * export read by a computed key, outside every registration, schema spelling and pinned import name, is invisible to A5 (A5's
 * R-UNNAMED-RF control reads no binary spelling, no schema spelling and no provider import); R-INLINE-FIXTURE C2 reads non-code
 * fixture files, so a plan envelope written inline in a .ts test, or spread over several lines of a text that does not parse as JSON
 * whole, is invisible to it (C2's inline control reads 0 envelopes).
 * NOT CLAIMED: below-row-level coordinated edits of this file and its roster that move no reach record and no outside anchor - a pin
 * reaching no surface (A1, A5, B1, C1, C2, D1, D2) removed from both; a word, a plan token or a control removed from both; a check
 * removed with its roster title - and a surface helper recording a reach it did not make.
 * SCOPE: the envelopes are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when a
 * fixture re-measure re-reads them. "Pi source" in (d) is src/, the product modules; qa/ and test/ carry no Pi surface. No reader is
 * added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, git's listing and the bead export are only
 * read.
 */
import { execFileSync } from "node:child_process";
import { chmodSync, type Dirent, lstatSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeEvidence } from "../src/workbench/native-evidence.js";
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
/** The tracked bead export: the owner filing's row of BEAD states the acceptance clauses the row labels are held to. */
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-pfxo.10";
const ROOT = process.cwd();
/** The root every roster envelope names: the measured scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
/** The src modules the surface helpers exercise, repo-relative, as the reach record and the rf scans name them. */
const PROVIDER_MODULE = "src/workbench/providers/reactivefiber.ts";
const OBSERVER_MODULE = "src/workbench/reactivefiber-observer.ts";
const EVIDENCE_MODULE = "src/workbench/native-evidence.ts";
/** The rf binary's name as the provider's one spawn spells it, and the src constant naming the rf schema. */
const RF_BINARY = "rf";
const SCHEMA_CONSTANT = "REACTIVE_FIBER_CLI_SCHEMA";
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
/** A text in field form: camelCase split, lowercased, every run of other characters one underscore, none at either end. */
function fieldForm(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
/** Every plan word in field form: the PLAN_TOKENS (their camelCase spellings fold onto the snake ones) and the PLAN_EXACT words. */
const PLAN_WORDS: ReadonlySet<string> = new Set([...PLAN_TOKENS, ...PLAN_EXACT].map(fieldForm));
/** The plan words of more than one word: the ones a separator transform can respell inside a longer chunk. */
const MULTI_WORD_TOKENS: readonly string[] = [...PLAN_WORDS].filter(word => word.includes("_"));
/** Whether a field form is nothing but plan words joined by underscores ("reuse", "reuse_invalidated", "refresh_required"). */
function planWordsOnly(form: string): boolean {
  if (form === "") return false;
  const parts = form.split("_");
  // covered[i]: parts[0..i] split wholly into plan words.
  const covered = parts.map(() => false);
  for (let end = 1; end <= parts.length; end += 1) {
    for (let start = 0; start < end; start += 1) {
      const before = start === 0 || covered[start - 1] === true;
      if (before && PLAN_WORDS.has(parts.slice(start, end).join("_"))) covered[end - 1] = true;
    }
  }
  return covered[parts.length - 1] === true;
}
/** Whether one whitespace-free chunk of a text holds a multi-word plan token under a separator or camelCase transform. */
function chunkSpellsToken(text: string): boolean {
  return text.split(/\s+/).some(chunk => {
    const form = `_${fieldForm(chunk)}_`;
    return MULTI_WORD_TOKENS.some(token => form.includes(`_${token}_`));
  });
}

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
/** The owner filing's acceptance clauses, read from the BEAD row of the tracked bead export: "(a) ...", "(b) ...", "(c) ...", "(d) ...". */
function ownerClauses(): string[] {
  const rows: unknown[] = textOf(EXPORT_PATH).split("\n").filter(entry => entry.includes(`"id":"${BEAD}"`)).map(entry => JSON.parse(entry) as unknown);
  const row = rows.find(entry => isObject(entry) && entry.id === BEAD);
  if (!isObject(row)) throw new Error(`the bead export holds no ${BEAD} row`);
  const notes = typeof row.notes === "string" ? row.notes : "";
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(". Related:", start);
  if (start < 0 || end < 0) throw new Error(`the ${BEAD} export row states no acceptance sentence`);
  return notes.slice(start + "Acceptance: ".length, end).split(/; (?=\([a-z]\) )/);
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

type EntryKind = "file" | "symlink" | "other";
/** Every non-directory entry below a root, sorted, with its kind: a link is listed and never followed, and a path that vanishes
 * mid-walk holds nothing. */
function entriesBelow(directory: string): { path: string; kind: EntryKind }[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch {
    return [];
  }
  const found: { path: string; kind: EntryKind }[] = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...entriesBelow(path));
    else found.push({ path, kind: entry.isFile() ? "file" : entry.isSymbolicLink() ? "symlink" : "other" });
  }
  return found;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** A file's text, or null when it cannot be read. */
function readable(path: string): string | null {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return null;
  }
}
/** Whether a repo-relative path is on disk (a link counts, followed or not). */
function present(path: string): boolean {
  return lstatSync(join(REPO, path), { throwIfNoEntry: false }) !== undefined;
}
/** What git would commit below the pathspecs: tracked or untracked, never ignored, still present, sorted. The walks' outside anchor:
 * a walk must hold every path listed here, so a narrowed walk reds while an additive file does not. */
function gitListed(...pathspecs: string[]): string[] {
  const out = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", ...pathspecs], { cwd: REPO, encoding: "utf8", maxBuffer: 1 << 26 });
  return [...new Set(out.split("\0").filter(path => path !== "" && present(path)))].sort();
}
/** The listed paths a walk does not hold; a path gone from disk since the listing narrows nothing. */
function unwalkedOf(listed: readonly string[], walked: readonly string[]): string[] {
  const held = new Set(walked);
  return listed.filter(path => !held.has(path) && present(path));
}
/** The JSON values a fixture text holds: the whole text when it parses, else every line that parses (a .jsonl fixture). */
function jsonValuesOf(text: string): unknown[] {
  try {
    return [JSON.parse(text) as unknown];
  } catch {
    return text.split("\n").flatMap(line => {
      try {
        return [JSON.parse(line) as unknown];
      } catch {
        return [];
      }
    });
  }
}
/** Every successful context.plan envelope a fixture text holds, at any depth; a text holding no JSON holds none. */
function planEnvelopesInText(text: string, name: string): Envelope[] {
  const found: Envelope[] = [];
  const walk = (value: unknown): void => {
    if (Array.isArray(value)) value.forEach(walk);
    else if (isObject(value)) {
      if (value.schema === RF_SCHEMA && value.command === PLAN_COMMAND && value.ok === true) found.push(envelopeOf(value, `${name} plan`));
      Object.values(value).forEach(walk);
    }
  };
  jsonValuesOf(text).forEach(walk);
  return found;
}
function planEnvelopesIn(file: string): { file: string; envelope: Envelope }[] {
  return planEnvelopesInText(textOf(file), relative(REPO, file)).map(envelope => ({ file, envelope }));
}
/** The files C2 does not read as fixtures: code, where an inline plan envelope is R-INLINE-FIXTURE. */
const CODE_FILE = /\.(?:[cm]?[jt]s|[jt]sx)$/;
/** R-INLINE-FIXTURE's quiet row: a plan envelope written inline in a .ts test is TypeScript, not JSON, so C2 reads none in it. */
const C2_INLINE = 'export const plan = { schema: "reactive-fiber.cli/v1", ok: true, command: "context.plan", operation_id: "rfo_x", workspace: null, transaction_id: null, result: { summary: {} }, diagnostics: [] };';

/** The row whose pin runs now, so a surface helper records the row that reached it; null between pins. */
let reachingRow: string | null = null;
/** The reach record, `${row}|${surface}|${subject}`, read by the reach case. */
const REACH = new Set<string>();
/** Every pin whose case reached its witness comparison, in run order. */
const REACHED: string[] = [];
/** A surface helper's record that the running pin's row reached each surface for one subject (a measured plan's name or a word). */
function reach(surfaces: readonly string[], subject: string): void {
  if (reachingRow === null) return;
  for (const surface of surfaces) REACH.add(`${reachingRow}|${surface}|${subject}`);
}

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
async function nativeRefusal(answer: Envelope, exit: number, subject: string): Promise<JsonValue> {
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
  reach([`native ${PREVIEW_ID}`, PROVIDER_MODULE], subject);
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
async function registeredReading(answer: Envelope, subject: string): Promise<{ reading: JsonObject; calls: number }> {
  const handed = json(answer);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return handed as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  reach([`injected ${PREVIEW_ID}`, PROVIDER_MODULE], subject);
  return { reading, calls };
}
/** The registered reading of `build(fixture)`, asserted byte for byte against the same build over a FRESH roster read serialized
 * before the invocation (so a reading mutated in place cannot pass as verbatim); the reader ran once, the only strings Pi adds
 * are its contract and workspace root, neither a basis word, and native evidence - the projection the workflow runtime spreads onto
 * every capability node row it emits - projects nothing from the reading. */
async function verbatimReading(name: FixtureName, build: (envelope: Envelope) => Envelope, subject: string): Promise<{ witness: JsonObject; source: Envelope }> {
  const before = JSON.stringify(build(readRoster().envelopes[name]));
  const { reading, calls } = await registeredReading(build(ENVELOPES[name]), subject);
  expect(JSON.stringify(reading.source)).toBe(before);
  expect(calls).toBe(1);
  const piStrings = stringLeaves({ ...reading, source: null });
  const piBasis = piStrings.flatMap(basisWords);
  expect(piStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(piBasis).toEqual([]);
  const evidence = json(nativeEvidence(PREVIEW_ID, reading));
  reach([EVIDENCE_MODULE], subject);
  expect(evidence, "native evidence projected from a plan reading").toStrictEqual({});
  return { witness: { verbatim: true, calls, readingKeys: Object.keys(reading).sort(), piStrings, piBasis, evidence }, source: envelopeOf(reading.source, `${name} reading source`) };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
/** The adapter's refusal of a plan it must not project, asserted: a validation refusal naming no basis word. */
function adapterRefusal(envelope: Envelope, subject: string): JsonValue {
  let caught: unknown;
  try {
    reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(envelope) }, FIXTURE_CONTEXT);
  } catch (error) {
    caught = error;
  }
  reach([OBSERVER_MODULE], subject);
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
  /** Its regular-expression literals as written (`/^x$/g`): a field spelled only there is still spelled. */
  readonly patterns: string[];
  /** How often it spells the rf binary name as a whole string literal. */
  readonly binarySpellings: number;
  /** How often it spells the rf schema: the src constant's identifier, or a literal holding the schema's value. */
  readonly schemaSpellings: number;
  /** What it uses from the provider module: named imports and re-exports, members read off a namespace or a bound dynamic import of
   * it, and "dynamic-import" for each dynamic import of it. */
  readonly providerNames: string[];
}
/** Whether an import specifier written in module `fileName` names the provider module. */
function namesProvider(fileName: string, specifier: string): boolean {
  if (!specifier.startsWith(".")) return false;
  const resolved = posix.join(posix.dirname(fileName), specifier).replace(/\.js$/, ".ts");
  return resolved === PROVIDER_MODULE || `${resolved}.ts` === PROVIDER_MODULE;
}
/** Whether an expression is a dynamic import of the provider module, awaited or not. */
function providerImportCall(fileName: string, expression: ts.Expression): boolean {
  let inner: ts.Expression = expression;
  while (ts.isAwaitExpression(inner) || ts.isParenthesizedExpression(inner)) inner = inner.expression;
  if (!ts.isCallExpression(inner) || inner.expression.kind !== ts.SyntaxKind.ImportKeyword) return false;
  const first = inner.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) && namesProvider(fileName, first.text);
}
/** The names an import or export declaration of the provider module takes ("default", or "*" for a bare import or a star
 * re-export) and the namespace it binds, if any. */
function declarationUses(node: ts.ImportDeclaration | ts.ExportDeclaration): { names: string[]; namespace: string | null } {
  if (ts.isExportDeclaration(node)) {
    const clause = node.exportClause;
    if (clause !== undefined && ts.isNamedExports(clause)) return { names: clause.elements.map(element => (element.propertyName ?? element.name).text), namespace: null };
    return { names: ["*"], namespace: null };
  }
  const clause = node.importClause;
  if (clause === undefined) return { names: ["*"], namespace: null };
  const named = clause.name !== undefined ? ["default"] : [];
  const bindings = clause.namedBindings;
  if (bindings === undefined) return { names: named, namespace: null };
  if (ts.isNamedImports(bindings)) return { names: [...named, ...bindings.elements.map(element => (element.propertyName ?? element.name).text)], namespace: null };
  return { names: named, namespace: bindings.name.text };
}
/** One module's lexicon: its string, no-substitution and template literals (a template's literal parts joined by a space), its
 * regular-expression literals and every identifier, beside its rf binary, rf schema and provider-module uses. */
function lexiconOf(fileName: string, text: string): Lexicon {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const identifiers: string[] = [];
  const patterns: string[] = [];
  const names: string[] = [];
  const namespaces = new Set<string>();
  const members: { readonly owner: string; readonly name: string }[] = [];
  let binarySpellings = 0;
  let schemaSpellings = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) {
      literals.push(node.text);
      if (node.text === RF_BINARY) binarySpellings += 1;
      if (node.text.includes(RF_SCHEMA)) schemaSpellings += 1;
    } else if (ts.isTemplateExpression(node)) {
      const joined = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      literals.push(joined);
      if (joined.includes(RF_SCHEMA)) schemaSpellings += 1;
    } else if (ts.isRegularExpressionLiteral(node)) patterns.push(node.text);
    else if (ts.isIdentifier(node)) {
      identifiers.push(node.text);
      if (node.text === SCHEMA_CONSTANT) schemaSpellings += 1;
    }
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined &&
      ts.isStringLiteralLike(node.moduleSpecifier) && namesProvider(fileName, node.moduleSpecifier.text)) {
      const uses = declarationUses(node);
      names.push(...uses.names);
      if (uses.namespace !== null) namespaces.add(uses.namespace);
    }
    if (ts.isCallExpression(node) && providerImportCall(fileName, node)) names.push("dynamic-import");
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && providerImportCall(fileName, node.initializer)) {
      namespaces.add(node.name.text);
    }
    if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression)) members.push({ owner: node.expression.text, name: node.name.text });
    ts.forEachChild(node, visit);
  };
  visit(source);
  const used = [...names, ...members.filter(member => namespaces.has(member.owner)).map(member => member.name)];
  return { file: fileName, literals, identifiers, patterns, binarySpellings, schemaSpellings, providerNames: [...new Set(used)].sort() };
}
/** A plan decision or count field spelled: a PLAN_TOKENS word inside the text (by word, any case), the whole text a PLAN_EXACT word,
 * a multi-word plan token inside one whitespace-free chunk under a separator or camelCase transform, or the whole text nothing but
 * plan words under such a transform. Prose naming a refresh or a reuse among other words spells none (R-PROSE). */
function planField(text: string): boolean {
  return PLAN_TOKEN.test(text) || PLAN_EXACT.includes(text) || chunkSpellsToken(text) || planWordsOnly(fieldForm(text));
}
function planFieldsOf(lexicon: Lexicon): string[] {
  return [...lexicon.literals, ...lexicon.patterns, ...lexicon.identifiers].filter(planField);
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
interface SrcWalk {
  readonly lexica: Lexicon[];
  /** Every src entry the walk read but could not parse, with what it is ("" for a regular file of another kind). */
  readonly unparsed: { readonly path: string; readonly why: string }[];
}
let srcWalked: SrcWalk | undefined;
/** Every src entry, walked once: each regular .ts file that reads is parsed into its lexicon, and every other entry - a symlink, a
 * file of another kind, a .ts file that cannot be read - is unparsed, named with what it is, so it reds D1 until it is read. */
function srcWalk(): SrcWalk {
  if (srcWalked === undefined) {
    const lexica: Lexicon[] = [];
    const unparsed: { path: string; why: string }[] = [];
    for (const entry of entriesBelow(join(REPO, "src"))) {
      const path = relative(REPO, entry.path);
      const text = entry.kind === "file" && path.endsWith(".ts") ? readable(entry.path) : null;
      if (text !== null) lexica.push(lexiconOf(path, text));
      else unparsed.push({ path, why: entry.kind !== "file" ? entry.kind : path.endsWith(".ts") ? "unreadable" : "" });
    }
    srcWalked = { lexica, unparsed };
  }
  return srcWalked;
}
/** The src paths the walk accounts for: each one parsed or reported unparsed (the git anchor's comparison set). */
function srcAccounted(walk: SrcWalk): string[] {
  return [...walk.lexica.map(lexicon => lexicon.file), ...walk.unparsed.map(entry => entry.path)];
}
/** A precision anchor: the module carries the literal "observed" for its own vocabulary and spells no plan field. */
function anchorOf(lexica: readonly Lexicon[], file: string): boolean {
  const lexicon = lexica.find(entry => entry.file === file);
  if (lexicon === undefined) return false;
  return lexicon.literals.includes("observed") && planFieldsOf(lexicon).length === 0;
}
/** Every descriptor id a registration function registers on a fresh registry, whatever id, permission or contract it carries. */
function registeredIds(register: (registry: CapabilityRegistry) => void): string[] {
  const registry = new CapabilityRegistry();
  register(registry);
  return registry.catalogSnapshot().map(entry => entry.descriptor.id);
}
/** What the two rf registration functions register, blind to metadata. */
function rfRegistrations(): { native: string[]; injected: string[] } {
  return {
    native: registeredIds(registry => registerNativeReactiveFiberRender(registry, ROOT)),
    injected: registeredIds(registry => registerReactiveFiberRender(registry, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT)),
  };
}
/** The rf surfaces src holds, as the reach record names them: each rf registration's descriptors and each module spelling the rf
 * schema. */
function rfSurfaces(): string[] {
  const { native, injected } = rfRegistrations();
  const readers = srcWalk().lexica.filter(lexicon => lexicon.schemaSpellings > 0).map(lexicon => lexicon.file);
  return [...native.map(id => `native ${id}`), ...injected.map(id => `injected ${id}`), ...readers].sort();
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
  regexField: 'export const basis = Object.keys(summary).some(key => /^refresh_required$/.test(key)) ? "conservative" : "observed";',
  wordList: 'const KEPT = new Set("reuse invalidated".split(" ")); export const basis = rows.every(row => KEPT.has(row.decision)) ? "observed" : "conservative";',
  separatorTransform: 'export const basis = rows.map(row => row.decision.replace(/_/g, "-")).includes("refresh-required") ? "conservative" : "observed";',
  spacedWhole: 'export const basis = rows.some(row => row.decision.split("_").join(" ") === "refresh required") ? "conservative" : "observed";',
  camelSuffix: 'const refreshRequiredCount = rows.length; export const basis = refreshRequiredCount > 0 ? "conservative" : "observed";',
  caseVariant: 'export const basis = rows.every(row => row.decision.toUpperCase() === "REUSE") ? "observed" : "conservative";',
};
const D2_QUIET: Readonly<Record<string, string>> = {
  attentionConstant: 'export const report = { basis: "observed", counts: { active: 1 } };',
  observerStatus: ["const OBSERVED = new Set([\"observed\", \"null\"]); const note = `$", "{count} not observed`;"].join(""),
  echoVerbatim: 'const basis = typeof summary.prediction === "string" ? summary.prediction : null;',
  countsVerbatim: "const shown = { rows: summary.rows, refresh: summary.refresh_required, complete: summary.evidence_complete };",
  prose: 'export const hint = "a refresh is required before the render can reuse the graph"; export const status = "observed";',
};
const D2_RESIDUALS: Readonly<Record<string, string>> = {
  "R-COMPOSED": 'const key = ["refresh", "required"].join("_"); export const basis = summary[key] ? "conservative" : "observed";',
  "R-COMPOSED-WORD": 'export const basis = summary.refresh_required ? "conserv" + "ative" : "obs" + "erved";',
  "R-VOCABULARY": 'export const basis = summary.refresh_required ? "speculative" : "exact";',
  "R-ROWS-ONLY": 'export const basis = summary.rows > 1 ? "conservative" : "observed";',
  "R-CROSS-MODULE": 'import { pending } from "./plan-reader.js"; export const basis = pending ? "conservative" : "observed";',
  "R-PROSE": 'const key = "the refresh required count".split(" ").slice(1, 3).join("_"); export const basis = summary[key] ? "conservative" : "observed";',
};
/** R-UNNAMED-RF's quiet row: an rf process reached through a binary name composed at runtime, outside every registration, schema
 * spelling and provider import, spells nothing A5 reads. */
const A5_UNNAMED_RF = 'const binary = ["r", "f"].join(""); export const plan = (run: (file: string, args: string[]) => unknown) => run(binary, ["context", "plan", "--json"]);';
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
    for (const name of MEASURED) witness[name] = await nativeRefusal(ENVELOPES[name], ROSTER.exits[name], name);
    return witness;
  },
  A3: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const { witness: own, source } = await verbatimReading(name, envelope => envelope, name);
      const surfaced = planOf(source).prediction;
      expect(surfaced).toBeNull();
      witness[name] = { ...own, surfaced };
    }
    return witness;
  },
  A4: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) witness[name] = adapterRefusal(ENVELOPES[name], name);
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
      .filter(descriptor => PLAN_VERB.test(JSON.stringify(descriptor)) || PLAN_TOKEN.test(JSON.stringify(descriptor)) || stringLeaves(descriptor).some(planField))
      .map(descriptor => descriptor.id);
    // Non-vacuity: the selector read a catalog holding at least one provider that is not rf, and excluded it.
    const catalogRead = native.length > 0 && descriptors.length > native.length;
    // Blind to metadata (wb-411q): what the rf registration functions register, which src modules spell the rf binary name and the
    // rf schema, and what each src module uses from the provider module.
    const registrations = rfRegistrations();
    const lexica = srcWalk().lexica;
    const binary = Object.fromEntries(lexica.filter(lexicon => lexicon.binarySpellings > 0).map(lexicon => [lexicon.file, lexicon.binarySpellings]));
    const readers = lexica.filter(lexicon => lexicon.schemaSpellings > 0).map(lexicon => lexicon.file).sort();
    const importers = Object.fromEntries(lexica.filter(lexicon => lexicon.providerNames.length > 0).map(lexicon => [lexicon.file, lexicon.providerNames]));
    const control = lexiconOf("control.ts", A5_UNNAMED_RF);
    const residuals = { "R-UNNAMED-RF": { binary: control.binarySpellings, schema: control.schemaSpellings, providerNames: control.providerNames.length } };
    expect(catalogRead, `native descriptors ${descriptors.length}, rf ${native.length}`).toBe(true);
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(planSpelling, "a registered descriptor spelling an rf plan verb or field").toEqual([]);
    expect(registrations, "a descriptor an rf registration function registers beside the preview").toStrictEqual({ native: [PREVIEW_ID], injected: [PREVIEW_ID] });
    expect(binary, "src modules spelling the rf binary name as a whole literal").toStrictEqual({ [PROVIDER_MODULE]: 1 });
    expect(readers, "src modules spelling the rf schema").toStrictEqual([EVIDENCE_MODULE, PROVIDER_MODULE, OBSERVER_MODULE]);
    expect(Object.hasOwn(importers, PROVIDER_MODULE), "the provider module importing itself").toBe(false);
    expect(residuals).toStrictEqual({ "R-UNNAMED-RF": { binary: 0, schema: 0, providerNames: 0 } });
    return { catalogRead, native, injected: injectedIds, reconcile, planSpelling, registrations, binary, readers, importers, residuals };
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
      const { witness: own, source } = await verbatimReading("planAfter", envelope => variantOf(envelope, word), word);
      const surfaced = planOf(source).prediction;
      expect(surfaced).toBe(word);
      witness[word] = { ...own, surfaced };
    }
    return witness;
  },
  B3: async () => {
    const witness: JsonObject = {};
    for (const word of UNKNOWN_WORDS) {
      const { witness: own, source } = await verbatimReading("planAfter", envelope => variantOf(envelope, word), word);
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
      witness[word] = { native: await nativeRefusal(variant, ROSTER.exits.planAfter, word), adapter: adapterRefusal(variant, word) };
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
    // git's listing first, then the walk, so a fixture landing mid-run is walked rather than missed.
    const gitFixtures = gitListed("test").filter(path => !CODE_FILE.test(path));
    const files = entriesBelow(HERE).filter(entry => entry.kind === "file" && !CODE_FILE.test(entry.path)).map(entry => entry.path);
    const walk = { filesFloorMet: files.length >= 100 && gitFixtures.length >= 100, unwalked: unwalkedOf(gitFixtures, files.map(file => relative(REPO, file))) };
    const found = files.flatMap(planEnvelopesIn);
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
    expect(walk, `non-code files below test/ walked ${files.length}, listed by git ${gitFixtures.length}`).toStrictEqual({ filesFloorMet: true, unwalked: [] });
    expect(floorMet, `plan envelopes under test/: ${listed.join(", ")}`).toBe(true);
    expect(ownFound).toEqual(MEASURED.map(() => true));
    const residuals = { "R-INLINE-FIXTURE": planEnvelopesInText(C2_INLINE, "inline control").length };
    expect(refusedBy, "a hermetic plan fixture the additive key breaks").toEqual([]);
    expect(residuals).toStrictEqual({ "R-INLINE-FIXTURE": 0 });
    return { floorMet, ownFound, refusedBy, residuals, walk };
  },
  D1: async () => {
    const gitSrc = gitListed("src");
    const walk = srcWalk();
    const lexica = walk.lexica;
    const unparsed = walk.unparsed.map(entry => (entry.why === "" ? entry.path : `${entry.path} (${entry.why})`));
    const unwalked = unwalkedOf(gitSrc, srcAccounted(walk));
    const literals = lexica.reduce((sum, lexicon) => sum + lexicon.literals.length, 0);
    const identifiers = lexica.reduce((sum, lexicon) => sum + lexicon.identifiers.length, 0);
    const patterns = lexica.reduce((sum, lexicon) => sum + lexicon.patterns.length, 0);
    const basisSites = lexica.reduce((sum, lexicon) => sum + basisLiteralsOf(lexicon).length, 0);
    const planFields = lexica.flatMap(lexicon => planFieldsOf(lexicon).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const derivations = lexica.flatMap(lexicon => {
      const found = derivationOf(lexicon);
      return found === null ? [] : [found];
    });
    const floors = {
      modules: lexica.length >= 100, listed: gitSrc.length >= 100, literals: literals >= 5000, identifiers: identifiers >= 50000, patterns: patterns >= 100,
      basisSites: basisSites >= 20,
    };
    const anchors = { attention: anchorOf(lexica, "src/workbench/attention.ts"), observer: anchorOf(lexica, "src/workbench/reactivefiber-observer.ts") };
    expect(floors, `src modules ${lexica.length}, listed by git ${gitSrc.length}, literals ${literals}, identifiers ${identifiers}, regular-expression literals ${patterns}, basis-word literals ${basisSites}`).toStrictEqual({ modules: true, listed: true, literals: true, identifiers: true, patterns: true, basisSites: true });
    expect(anchors).toStrictEqual({ attention: true, observer: true });
    expect(unparsed, "a src file the lexical scan does not parse").toEqual([]);
    expect(unwalked, "a src path git lists that the walk does not hold").toEqual([]);
    expect(planFields, "a src literal or identifier spelling an rf plan decision or count field").toEqual([]);
    expect(derivations, "a src module joining an rf plan field with a basis word").toEqual([]);
    return { floors, anchors, unparsed, unwalked, planFields, derivations };
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
  it("the judged set: the frozen shape, the out-of-file roster, the owner's acceptance clauses and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:4", "C:2", "D:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // The owner's acceptance clauses in the tracked bead export are exactly the row labels, in order (wb-411q: an anchor outside
    // this file and its roster), and clause (d) quotes the basis pair.
    const clauses = ownerClauses();
    expect(clauses).toEqual(ROWS.map(row => row.label));
    const quoted = [...(clauses.find(clause => clause.startsWith("(d) ")) ?? "").matchAll(/'([^']+)'/g)].map(match => match[1] ?? "");
    expect(quoted.sort()).toEqual([...KNOWN_WORDS].sort());
    expect({
      bead: BEAD, rfVersion: RF_VERSION, pin: RF_PIN, summaryRequired: SUMMARY_REQUIRED, words: { known: KNOWN_WORDS, unknown: UNKNOWN_WORDS },
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
          reachingRow = row.id;
          let witness: JsonValue | null = null;
          try {
            witness = impl === undefined ? null : await impl();
          } finally {
            reachingRow = null;
          }
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
    });
  }

  it("reach: rows A and B reached every rf surface src holds, for every measured plan and every word, and every passing pin reached its witness comparison", ({ task }) => {
    // The surfaces come from src, not from this file: each descriptor the two rf registration functions register, and each module
    // spelling the rf schema. A pin removed from this file and its roster together, or a case that passes without running its
    // helpers, leaves its row short of a surface here. A row with a red pin is red there already and is not held here.
    const states = new Map<string, string | undefined>();
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") states.set(child.name, child.result?.state);
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const passed = (pin: string): boolean => states.get(pin) === "pass";
    const surfaces = rfSurfaces();
    expect(surfaces).toEqual([`injected ${PREVIEW_ID}`, `native ${PREVIEW_ID}`, EVIDENCE_MODULE, PROVIDER_MODULE, OBSERVER_MODULE]);
    const subjects: Readonly<Record<string, readonly string[]>> = { A: MEASURED, B: WORDS };
    const held = ROSTER.rows.filter(row => Object.hasOwn(subjects, row.id) && row.pins.every(pin => passed(pin.id))).map(row => row.id);
    const expected = held.flatMap(id => (subjects[id] ?? []).flatMap(subject => surfaces.map(surface => `${id}|${surface}|${subject}`))).sort();
    const reached = [...REACH].filter(entry => held.some(id => entry.startsWith(`${id}|`))).sort();
    expect(reached, `the reach of the rows held (${held.join(", ")}) against the rf surfaces src holds`).toEqual(expected);
    const unreached = ROSTER.rows.flatMap(row => row.pins.map(pin => pin.id)).filter(pin => passed(pin) && !REACHED.includes(pin));
    expect(unreached, "a passing pin that never reached its witness comparison").toEqual([]);
  });

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
