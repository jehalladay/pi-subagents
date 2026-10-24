/**
 * wb-4nut.7 (TSX-HARNESS2-REACTIVE-EVOLUTION-R7, program-triage-2026-10-22), the H2 budget-echo census: a gating guard with an
 * until-then leg. Statement (the bead's full statement, its note, verbatim): "If Pi ever reads H2 budget, ContextProjection,
 * capability/usage receipts (gated RC-H2-02, TSX-H2-04, RI-H2-01/RI-H2-03 schemas: all unshipped), Pi shall echo the producer's
 * accounting verbatim, never recomputing it: duplicate occurrences of one definition are priced separately, never collapsed, and
 * token counts keep the exact-counted / tokenizer-estimate / model-reported / prompt-cache distinction with UNKNOWN never
 * converted to an exact value" (ReactiveComponentsSDK docs/programs/harness2-reactive-evolution-2026-10-20/README.md:26@
 * 640a3b579a95, merged with ReactiveInferenceSDK README.md:21,:41@485f3615db1e, ReactiveFiberTSXSDK README.md:46@76bbbffd9d4a and
 * ReactiveComponentsSDK README.md:45@640a3b579a95). Acceptance (the owner filing, verbatim; the labels of rows A to D quote it):
 * "(a) one definition, two occurrences makes Pi's budget display count both; a de-duplicating implementation fails; (b) Pi
 * carries result.budget / budget receipts verbatim and never recomputes token totals from rendered text; (c) a receipt with count
 * UNKNOWN keeps the Pi field UNKNOWN; defaulting to 0 or an estimate fails; (d) each of the four count kinds appears under its own
 * label and none is summed into another." Row E's label is the filing's own until-then line ("Not P0: ...").
 *
 * MEASURED AT THE INSTALLED rf (0.1.832, commit 2618c211be0d, by `rf --json --version`, 2026-10-23), in two scratch jsonl
 * workspaces (the roster lists every command; each envelope is kept as rf printed it, the scratch root rewritten to
 * /fixture/rf-workspace): ONE definition, demo.card (declarative, its default body: one always text block), rendered with
 * `rf context render --no-commit` at one instance (oneOccurrence) and at two (twoOccurrences: a second [[component]] row, instance
 * card2, of the same component_id), and the same pair beside a second definition whose one block is task_conditional, so rf's
 * host necessity judge withholds it (oneWithheld, twoWithheld). rf prices each occurrence on its own: two blocks of demo.card at
 * distinct candidate keys, 8 estimated tokens each, result.budget.included_tokens 16 against the single occurrence's 8, and its
 * own token_accounting repeating the total; the headroom it states (formula_terms, available_context_tokens 989760 of 1000000) is
 * the same at one and two occurrences, since MODEL-INF-A10's formula takes no block cost. At the pin (ReactiveFiberCLI
 * 6a251bf73af5; the installed copies of all three schemas are byte-identical, sha256 in the roster) a block's token_cost.kind and
 * token_cost_kind are measured | estimated | unknown with tokens null exactly when unknown (ASM-PROV-A3), token_count_method is
 * measured | estimated, token_accounting.kind is measured | estimated | unknown with included_tokens null beside unknown
 * (RENDER-A22), and truncated_tokens is null when any truncated cost is unknown, "never 0 and never the fallback" (ASM-PROV-A10).
 *
 * Pi reads rf's budget in two modules and no H2 receipt anywhere: the reactivefiber.render.preview provider (providers/
 * reactivefiber.ts) admits a preview whose formula_terms are integers and hands the envelope on whole, and its reader adapter
 * (reactivefiber-observer.ts) shows the producer's available_context_tokens and context_window and its necessity_eval_count in one
 * status line and counts result.blocks in its inclusion note; no priced figure, block cost or count kind reaches any surfaced
 * string. The rows:
 *  A, acceptance (a). A1 the producer prices both occurrences (measured; the counts above); A2 both registered readings (the native
 *    provider through a stand-in rf, the injected-reader seam) carry every occurrence and the producer's total byte for byte; A3
 *    the adapter counts both: necessity evals 1 and 2 (3 beside the withheld candidate), the inclusion note's 1 and 2 blocks, and a
 *    budget phrase that is rf's headroom verbatim at one and two occurrences alike; A4 a de-duplicating implementation (one block
 *    per definition, its total and counters re-derived) fails the judge Pi's own reading and display meet.
 *  B, acceptance (b). B1 both readings carry result.budget, and the whole envelope, byte for byte for every measured render, adding
 *    only their contract and workspace root, and the adapter's budget phrase is the stated terms; B2 never from rendered text:
 *    variants replacing result.output.text (alone, and with its size_bytes) leave the adapter's status line and notes byte-identical
 *    while its payload reference moves (the text is hashed, never priced); a recomputing implementation (rf's own utf8-bytes/4
 *    rule applied to the text) fails the same judge.
 *  C, acceptance (c). C1 three UNKNOWN-cost variants built to the pin's own forms (one block unknown; nothing priced; a truncated
 *    block of unknown cost): both readings carry every null and every 'unknown' at its path, never 0 and never an estimate, and the
 *    adapter's display is the base display; C2 an UNKNOWN in a figure the display reads (available_context_tokens or
 *    context_window null, absent, or a word): the native reader and the adapter refuse, so no Pi number stands for it, while the
 *    injected seam carries it verbatim; a defaulting (0) and an estimating implementation fail the judge.
 *  D, acceptance (d). D1 the producer's kinds: every measured render states its kind under each of its own keys (token_count_method,
 *    token_accounting.kind, each block's token_cost.kind and token_cost_kind), all within the pin's vocabularies, and no key of a
 *    render names a model-reported or prompt-cache count (a render calls no model); D2 Pi labels no kind and sums none: across
 *    every projection here its surfaced strings spell no kind word and its one token phrase is the producer's two stated terms; a
 *    summing implementation fails the judge.
 *  E, the until-then posture. E1 Pi depends on, installs and imports no H2 producer package (RC, RI, TSX, FiberOptics or Lenses);
 *    E2 its rf roster is the preview alone and no registered descriptor spells an H2 receipt or rf priced field; E3 a lexical scan
 *    of every src module (string, no-substitution and template literals, every identifier) finds no RECEIPT_TERMS or PRICING_TERMS
 *    word, with floors, three anchors (the observer and the provider, which read rf's formula terms, and src/usage.ts, which spells
 *    pi's own cache fields; each scanned and quiet) and every src file a parsed .ts module; E4 the detector's controls: flagged
 *    lines, one per vocabulary word at least (each word's own reading pinned), quiet lines and the residuals' quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the constants, the vocabularies and every registered test title - is held to the out-of-file
 * roster, whose measured envelopes anchor the counts outside this file; the acceptance rows' labels are held, in order, to the
 * clauses of the bead's own Acceptance line in the tracker export (.beads/issues.jsonl), and row E's to its Not P0 line. The last
 * case walks this file's vitest task tree against the roster. Not claimed: a pin removed from ROWS, the literal, IMPL and the
 * roster together (the filing anchors rows, not pins), or a vocabulary word removed from this file, the roster and E4's witness
 * together.
 * THE GATE-OPENING SIGNAL: E1 reds when an H2 producer package is depended on or imported, and E2/E3 when a descriptor or src module
 * spells a receipt or priced field: the reader RC-H2-02, TSX-H2-04, RI-H2-01 or RI-H2-03 calls for reds this census first, and its
 * cut re-pins (a) to (d) at that reader's own display (A to D already pin the echo the posture keeps).
 * RESIDUALS (named, each with a pinned quiet row): R-NO-PRICED-DISPLAY Pi shows no priced total today, so (a)'s count holds at the
 *   readings, the necessity counter and the inclusion count, while the budget phrase is rf's pre-pricing headroom (A3 holds the
 *   one- and two-occurrence status lines equal but for rf's necessity counter); R-REFUSED-UNKNOWN an UNKNOWN in a displayed figure is
 *   refused, never shown as UNKNOWN: no Pi field reads it at all (C2: both readers refuse, the injected seam carries it unread);
 *   R-NO-KIND-DISPLAY Pi shows no count kind, so (d)'s own-label clause holds at the readings, each kind at its own key (D2 reads no
 *   kind word in any surfaced string); R-PI-USAGE Pi's own spend accounting (src/usage.ts) sums pi's input, output and cacheWrite
 *   into its display total and adds cacheRead to the totalTokens it reports: those are pi's own Usage fields from pi's own message
 *   events, not an H2 receipt, so (d) as filed does not reach them and E3's vocabulary does not cover them (E3's usage anchor and
 *   E4's R-PI-USAGE control read 0); R-COMPOSED a receipt or priced field composed at runtime or read through a computed key is
 *   invisible to E3 (E4 reads 0); R-GENERIC-WALK a reader that walks result.budget generically surfaces priced fields without
 *   spelling one (E4 reads 0).
 * SCOPE: the envelopes are producer facts at the installed rf; Pi vendors no rf schema, so a producer change is seen only when the
 * roster is re-measured. "Pi" in (a) to (d) is src/, the product modules; qa/ and test/ carry no Pi surface. The four kinds of RI
 * L21 are exact counted prompt tokens (rf's measured), tokenizer estimate (rf's estimated), model-reported usage and prompt-cache
 * usage (no render field: RI's usage receipt, RI-H2-01, is unshipped). No reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, package.json, node_modules' directory
 * names and the tracker export are only read.
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
/** The envelope the injected-reader seam hands on; it validates nothing, which is what A2, B1, C1 and C2 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const BEAD = "wb-4nut.7";
const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "h2-budget-echo-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
/** The root every roster envelope names: the measured scratch roots, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const RF_VERSION = "0.1.832";
const RF_PIN = "6a251bf73af5";
const RF_SCHEMA = "reactive-fiber.cli/v1";
/** The one definition the measured renders instantiate once and twice. */
const DEFINITION = "demo.card";
/** The pin's kinds: a block's token_cost.kind and token_cost_kind and token_accounting.kind (COST_KINDS), token_count_method. */
const COST_KINDS: readonly string[] = ["measured", "estimated", "unknown"];
const METHOD_KINDS: readonly string[] = ["measured", "estimated"];
const MEASURED = ["oneOccurrence", "twoOccurrences", "oneWithheld", "twoWithheld"] as const;
type FixtureName = (typeof MEASURED)[number];
const NOT_A_PREVIEW = "RF preview returned an unrecognized or contradictory envelope.";
const FORMULA_REFUSED = "ReactiveFiber topology refused: result.budget.formula_terms needs non-negative integer terms and an integer available_context_tokens.";
/** The H2 receipt names (RC-H2-02 ContextProjection and its budget receipts, TSX-H2-04 the bounded render report, RI-H2-01 the
 * capability snapshot and usage receipt, RI-H2-03 the exact vs estimated count and cache-prefix labels) and RI L21's kinds no render
 * states (model-reported, prompt-cache), as word patterns: a space is any run of space, underscore, hyphen, dot, colon or slash
 * (so a dotted capability id reads too), matched after camelCase is split. */
const RECEIPT_TERMS: readonly string[] = [
  "context projections?", "budget receipts?", "usage receipts?", "capability snapshots?", "render reports?", "cache prefix(?:es)?",
  "prompt cache", "model reported", "tokeni[sz]ers?", "token estimates?", "estimated tokens?", "exact (?:token )?counts?",
  "(?:rc|tsx|ri) h2 0[0-9]",
];
/** rf's priced fields and its estimator (the pin's render and budget schemas): a reader of one could re-price or re-sum. */
const PRICING_TERMS: readonly string[] = [
  "token costs?", "token cost kind", "included tokens", "truncated tokens", "unknown cost count", "token accounting",
  "token count method", "estimator id", "utf8 bytes div4", "(?:estimate|count) tokens",
];
const termPattern = (terms: readonly string[]): RegExp => new RegExp(`\\b(?:${terms.map(term => term.replaceAll(" ", "[\\s_.:/-]+")).join("|")})\\b`, "i");
const RECEIPT = termPattern(RECEIPT_TERMS);
const PRICING = termPattern(PRICING_TERMS);
/** An H2 producer package name, as npm or an import specifier spells it. */
const H2_PACKAGE = /reactive[-_./]?(?:components|inference|lenses)|fiber[-_./]?optics|reactive[-_./]?fiber[-_./]?tsx/i;
/** Keys a model-reported or prompt-cache count rides under in the usage shapes a host meets. */
const USAGE_KEYS: readonly string[] = [
  "usage", "input_tokens", "output_tokens", "prompt_tokens", "completion_tokens", "cache_read_input_tokens", "cache_creation_input_tokens",
  "cacheRead", "cacheWrite", "cached_tokens",
];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead's own notes. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) one definition, two occurrences makes Pi's budget display count both; a de-duplicating implementation fails",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(b) Pi carries result.budget / budget receipts verbatim and never recomputes token totals from rendered text",
    pins: ["B1", "B2"],
  },
  {
    id: "C",
    label: "(c) a receipt with count UNKNOWN keeps the Pi field UNKNOWN; defaulting to 0 or an estimate fails",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label: "(d) each of the four count kinds appears under its own label and none is summed into another",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label: "Not P0: rf's result.budget is echoed, not recomputed, and no H2 receipt is readable today; gating guard.",
    pins: ["E1", "E2", "E3", "E4"],
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
interface RosterSchema {
  readonly path: string;
  readonly blob: string;
  readonly sha256: string;
  readonly installedIdentical: boolean;
}
interface Roster {
  readonly bead: string;
  readonly rfVersion: string;
  readonly rfCommit: string;
  readonly pin: string;
  readonly definition: string;
  readonly kinds: { readonly cost: readonly string[]; readonly method: readonly string[] };
  readonly schemas: readonly RosterSchema[];
  readonly vocabulary: { readonly receipt: readonly string[]; readonly pricing: readonly string[]; readonly usageKeys: readonly string[] };
  readonly measured: readonly string[];
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
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.exits) || !isObject(raw.kinds) ||
    !isObject(raw.vocabulary) || !Array.isArray(raw.schemas)) {
    throw new Error("roster must be an object with rows, envelopes, exits, kinds, vocabulary and schemas");
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
  const { envelopes: rawEnvelopes, exits: rawExits, kinds, vocabulary } = raw;
  const envelopes = Object.fromEntries(MEASURED.map(name => [name, envelopeOf(rawEnvelopes[name], name)])) as Record<FixtureName, Envelope>;
  const exits = Object.fromEntries(MEASURED.map(name => {
    const exit = rawExits[name];
    if (typeof exit !== "number" || !Number.isSafeInteger(exit)) throw new Error(`roster exits.${name} must be an integer`);
    return [name, exit];
  })) as Record<FixtureName, number>;
  const schemas = raw.schemas.map((entry: unknown, index: number): RosterSchema => {
    if (!isObject(entry) || typeof entry.path !== "string" || typeof entry.blob !== "string" || typeof entry.sha256 !== "string" || typeof entry.installedIdentical !== "boolean") {
      throw new Error(`roster schemas[${index}] needs a path, a blob, a sha256 and installedIdentical`);
    }
    return { path: entry.path, blob: entry.blob, sha256: entry.sha256, installedIdentical: entry.installedIdentical };
  });
  if (typeof raw.bead !== "string" || typeof raw.rfVersion !== "string" || typeof raw.rfCommit !== "string" || typeof raw.pin !== "string" || typeof raw.definition !== "string") {
    throw new Error("roster needs bead, rfVersion, rfCommit, pin and definition");
  }
  return {
    bead: raw.bead, rfVersion: raw.rfVersion, rfCommit: raw.rfCommit, pin: raw.pin, definition: raw.definition,
    kinds: { cost: strings(kinds.cost, "kinds.cost"), method: strings(kinds.method, "kinds.method") }, schemas,
    vocabulary: { receipt: strings(vocabulary.receipt, "vocabulary.receipt"), pricing: strings(vocabulary.pricing, "vocabulary.pricing"), usageKeys: strings(vocabulary.usageKeys, "vocabulary.usageKeys") },
    measured: strings(raw.measured, "measured"), fixtures, exits, envelopes, rows, tests: strings(raw.tests, "tests"),
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
/** Every key name a JSON value holds, at any depth. */
function keysOf(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (!isObject(value)) return [];
  return Object.entries(value).flatMap(([key, item]) => [key, ...keysOf(item)]);
}
/** The value at a dotted path, or undefined when any step is missing. */
function at(value: unknown, path: string): unknown {
  let current: unknown = value;
  for (const step of path.split(".")) {
    if (Array.isArray(current)) current = current[Number(step)];
    else if (isObject(current)) current = current[step];
    else return undefined;
  }
  return current;
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

function resultOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.result, `${envelope.operation_id} result`);
}
function budgetOf(envelope: Envelope): JsonObject {
  return objectOf(resultOf(envelope).budget, `${envelope.operation_id} result.budget`);
}
function blocksOf(envelope: Envelope): JsonObject[] {
  return arrayOf(resultOf(envelope).blocks, `${envelope.operation_id} result.blocks`).map((block, index) => objectOf(block, `result.blocks[${index}]`));
}
/** A deep copy of an envelope with `edit` applied to its result; the envelope handed in is never touched. */
function variantOf(envelope: Envelope, edit: (result: JsonObject) => void): Envelope {
  const copy = envelopeOf(json(envelope), `${envelope.operation_id} variant`);
  edit(resultOf(copy));
  return copy;
}

/** What one render states about its occurrences: its blocks (definition, occurrence key, cost, kind) and its own counts. */
function occurrencesOf(envelope: Envelope): JsonObject {
  const blocks = blocksOf(envelope);
  const budget = budgetOf(envelope);
  const work = objectOf(resultOf(envelope).work, "result.work");
  const costs = blocks.map(block => objectOf(block.token_cost, "token_cost").tokens ?? null);
  return {
    definitions: [...new Set(blocks.map(block => String(block.component_id)))],
    keys: blocks.map(block => String(block.candidate_key)),
    instances: blocks.map(block => String(block.candidate_key).split("::")[0] ?? ""),
    costs,
    included: budget.included_tokens ?? null,
    accounted: objectOf(budget.token_accounting, "token_accounting").included_tokens ?? null,
    finalIncluded: objectOf(budget.counts, "budget.counts").final_included ?? null,
    judged: arrayOf(resultOf(envelope).necessity, "result.necessity").length,
    necessityEvals: work.necessity_eval_count ?? null,
    renders: work.component_render_count ?? null,
  };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** A stand-in `rf` first on PATH: every spawn appends its JSON argv line to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("h2-budget-echo-");
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

interface NativeRead {
  readonly reading: JsonObject | null;
  readonly refusal: { category: string; message: string } | null;
  readonly spawns: string[][];
}
/** One invocation of the NATIVE preview (registerNativeReactiveFiberRender) answered by a stand-in rf printing `answer`, exit 0. */
async function nativeRead(answer: Envelope): Promise<NativeRead> {
  const log = standInRf(json(answer), 0);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  let reading: JsonObject | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "native reading");
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { reading, refusal, spawns: spawnsOf(log) };
}
/** One invocation of the INJECTED preview whose reader answers a deep copy of `answer`. */
async function injectedRead(answer: Envelope): Promise<{ reading: JsonObject; calls: number }> {
  const handed = json(answer);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return handed as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "injected reading");
  return { reading, calls };
}
/** Both registered readings of `build(fixture)`, asserted byte for byte against the same build over a FRESH roster read serialized
 * before the invocations (so a reading mutated in place cannot pass as verbatim); each reader ran once, the native one spawned the
 * render argv once, and the only strings Pi adds are its contract and workspace root. Returns the witness and the native source. */
async function verbatimReadings(name: FixtureName, build: (envelope: Envelope) => Envelope): Promise<{ witness: JsonObject; source: Envelope }> {
  const before = JSON.stringify(build(readRoster().envelopes[name]));
  const native = await nativeRead(build(ENVELOPES[name]));
  const injected = await injectedRead(build(ENVELOPES[name]));
  expect(native.refusal).toBeNull();
  expect(native.spawns).toHaveLength(1);
  expect(verbOf(native.spawns)).toEqual(["context", "render"]);
  expect(JSON.stringify(native.reading?.source)).toBe(before);
  expect(JSON.stringify(injected.reading.source)).toBe(before);
  expect(injected.calls).toBe(1);
  const nativeStrings = stringLeaves({ ...native.reading, source: null });
  const injectedStrings = stringLeaves({ ...injected.reading, source: null });
  expect(nativeStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(injectedStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  return {
    witness: { native: { verbatim: true, spawns: native.spawns.length, verb: verbOf(native.spawns), piStrings: nativeStrings }, injected: { verbatim: true, calls: injected.calls, piStrings: injectedStrings } },
    source: envelopeOf(native.reading?.source, `${name} native reading source`),
  };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
interface Shown {
  readonly title: string;
  readonly statusText: string;
  readonly tone: string;
  readonly coverage: string;
  readonly notes: readonly string[];
  readonly evidenceRefs: readonly string[];
  readonly payloadRef: string;
}
/** What the adapter shows of one envelope: every string its one snapshot and its diagnostics surface. */
function shownOf(envelope: Envelope): Shown {
  const topology = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(envelope) }, FIXTURE_CONTEXT);
  expect(topology.snapshots).toHaveLength(1);
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the adapter projected no snapshot");
  return {
    title: snapshot.node.title, statusText: snapshot.node.statusText ?? "", tone: snapshot.node.statusTone ?? "", coverage: snapshot.coverage ?? "",
    notes: [...topology.diagnostics], evidenceRefs: [...(snapshot.evidenceRefs ?? [])], payloadRef: snapshot.nativePayloadRef ?? "",
  };
}
/** Every string the adapter surfaces for one envelope. */
function surfaced(shown: Shown): string[] {
  return [shown.title, shown.statusText, ...shown.notes, ...shown.evidenceRefs, shown.payloadRef];
}
/** The adapter's refusal of an envelope it must not project, or null when it projects one. */
function adapterRefusal(envelope: Envelope): { category: string; message: string } | null {
  try {
    reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(envelope) }, FIXTURE_CONTEXT);
  } catch (error) {
    return refusalOf(error);
  }
  return null;
}
/** The budget phrase of a status line: the producer's two terms as the adapter states them, or null when it states none. */
function budgetShown(statusText: string): { available: number; window: number } | null {
  const found = / · (-?\d+) of (\d+) context tokens available · /.exec(statusText);
  return found === null ? null : { available: Number(found[1]), window: Number(found[2]) };
}
/** Every token phrase of a status line: a number followed by "tokens", or the "N of M context tokens" pair, in order. */
function tokenPhrases(text: string): string[] {
  return [...text.matchAll(/\d+(?: of \d+)? (?:context )?tokens\b[^·]*/g)].map(found => found[0].trim());
}
function necessityShown(statusText: string): number | null {
  const found = / · necessity evals (\d+) · /.exec(statusText);
  return found === null ? null : Number(found[1]);
}
/** The inclusion note's counts, or null when the adapter states no inclusion note. */
function inclusionShown(notes: readonly string[]): { blocks: number; withheld: number; judged: number } | null {
  for (const note of notes) {
    const found = /^inclusion: (\d+) blocks? included, (\d+) of (\d+) judged candidates? withheld at host_necessity: partial$/.exec(note);
    if (found !== null) return { blocks: Number(found[1]), withheld: Number(found[2]), judged: Number(found[3]) };
  }
  return null;
}
function formulaOf(envelope: Envelope): JsonObject {
  return objectOf(budgetOf(envelope).formula_terms, "result.budget.formula_terms");
}

/** What a reader states of one render's occurrences; the producer's view is read off the envelope itself. */
interface OccurrenceView {
  readonly blocks: number;
  readonly included: JsonValue;
  readonly necessityEvals: JsonValue;
  readonly inclusionBlocks: number | null;
}
function producerView(envelope: Envelope, withheld: boolean): OccurrenceView {
  const facts = occurrencesOf(envelope);
  return { blocks: blocksOf(envelope).length, included: facts.included ?? null, necessityEvals: facts.necessityEvals ?? null, inclusionBlocks: withheld ? blocksOf(envelope).length : null };
}
/** The judge of (a): a reader's view of a render counts every occurrence the producer priced, never fewer. */
function occurrenceFailures(view: OccurrenceView, producer: OccurrenceView): string[] {
  const failures: string[] = [];
  if (view.blocks !== producer.blocks) failures.push(`blocks ${view.blocks} of ${producer.blocks}`);
  if (view.included !== producer.included) failures.push(`included ${String(view.included)} of ${String(producer.included)}`);
  if (view.necessityEvals !== producer.necessityEvals) failures.push(`necessity evals ${String(view.necessityEvals)} of ${String(producer.necessityEvals)}`);
  if (view.inclusionBlocks !== producer.inclusionBlocks) failures.push(`inclusion blocks ${String(view.inclusionBlocks)} of ${String(producer.inclusionBlocks)}`);
  return failures;
}
/** The reference DE-DUPLICATING implementation (a): one block per definition, its total re-summed over the kept blocks, its
 * evaluations counted per definition judged and its inclusion count over the kept blocks. */
function dedupView(envelope: Envelope, withheld: boolean): OccurrenceView {
  const kept = new Map<string, JsonObject>();
  for (const block of blocksOf(envelope)) if (!kept.has(String(block.component_id))) kept.set(String(block.component_id), block);
  const included = [...kept.values()].reduce((sum, block) => sum + Number(objectOf(block.token_cost, "token_cost").tokens ?? 0), 0);
  const judged = new Set(arrayOf(resultOf(envelope).necessity, "result.necessity").map(entry => String(objectOf(entry, "necessity entry").candidate_key).split(":")[0]));
  return { blocks: kept.size, included, necessityEvals: judged.size, inclusionBlocks: withheld ? kept.size : null };
}

/** rf's own estimator rule (budget.py estimate_utf8_div4: ceil(UTF-8 bytes / 4)), as a recomputing reader would apply it. */
function utf8Div4(text: string): number {
  return Math.ceil(Buffer.byteLength(text, "utf8") / 4);
}
/** The reference RECOMPUTING implementation (b): the headroom re-derived from the rendered text by rf's own rule. */
function recomputedBudget(envelope: Envelope): { available: number; window: number } {
  const formula = formulaOf(envelope);
  const text = String(objectOf(resultOf(envelope).output, "result.output").text);
  const window = Number(formula.context_window);
  return { available: window - Number(formula.output_reserve) - Number(formula.overhead) - Number(formula.safety_margin) - utf8Div4(text), window };
}
/** The judge of (b) and (c): a display states the producer's stated integer terms, or nothing when a term is not one. */
function budgetFailures(shown: { available: number; window: number } | null, envelope: Envelope): string[] {
  const formula = formulaOf(envelope);
  const stated = [formula.available_context_tokens, formula.context_window];
  const said = stated.map(value => (value === undefined ? "absent" : JSON.stringify(value))).join(" of ");
  const integers = stated.every(value => typeof value === "number" && Number.isSafeInteger(value));
  if (!integers) return shown === null ? [] : [`shown ${shown.available} of ${shown.window} where the producer stated ${said}`];
  if (shown === null) return [`no budget shown where the producer stated ${said}`];
  return shown.available === stated[0] && shown.window === stated[1] ? [] : [`shown ${shown.available} of ${shown.window} where the producer stated ${said}`];
}
/** The reference DEFAULTING (0) and ESTIMATING implementations (c): an absent or non-integer term becomes 0, or the formula's estimate. */
function defaultedBudget(envelope: Envelope): { available: number; window: number } {
  const formula = formulaOf(envelope);
  const integer = (value: JsonValue | undefined): number => (typeof value === "number" && Number.isSafeInteger(value) ? value : 0);
  return { available: integer(formula.available_context_tokens), window: integer(formula.context_window) };
}
function estimatedBudget(envelope: Envelope): { available: number; window: number } {
  const formula = formulaOf(envelope);
  const window = typeof formula.context_window === "number" ? formula.context_window : Number(objectOf(budgetOf(envelope).capability_snapshot, "capability_snapshot").context_window);
  return { available: window - Number(formula.output_reserve) - Number(formula.occupied_tokens) - Number(formula.overhead) - Number(formula.safety_margin), window };
}
/** The judge of (d): no surfaced string names a count kind, and the status line's one token phrase is the producer's two terms. */
const KIND_WORD = new RegExp(`\\b(?:${COST_KINDS.join("|")})\\b`, "i");
function kindFailures(strings: readonly string[], statusText: string, envelope: Envelope): string[] {
  const formula = formulaOf(envelope);
  const failures = strings.flatMap(text => {
    const found = KIND_WORD.exec(text);
    return found === null ? [] : [`kind word "${found[0]}" in a surfaced string`];
  });
  const phrases = tokenPhrases(statusText);
  const expected = [`${String(formula.available_context_tokens)} of ${String(formula.context_window)} context tokens available`];
  if (JSON.stringify(phrases) !== JSON.stringify(expected)) failures.push(`token phrases ${JSON.stringify(phrases)}`);
  return failures;
}
/** The reference SUMMING implementation (d): every block's cost summed into one figure whatever its kind, with the kinds named. */
function summedStatus(base: string, envelope: Envelope): string {
  const blocks = blocksOf(envelope);
  const total = blocks.reduce((sum, block) => sum + Number(objectOf(block.token_cost, "token_cost").tokens ?? 0), 0);
  const kinds = [...new Set(blocks.map(block => String(block.token_cost_kind)))].join(" + ");
  return `${base} · ${total} tokens included (${kinds})`;
}

/** The text variants B2 reads, each over twoOccurrences: the rendered text replaced alone, and with its size_bytes. */
const TEXTS: Readonly<Record<string, string>> = {
  short: "x",
  long: "demo.card has no content yet.\n".repeat(40),
  multibyte: "é".repeat(120),
};
function textVariant(envelope: Envelope, text: string, withSize: boolean): Envelope {
  return variantOf(envelope, result => {
    const output = objectOf(result.output, "result.output");
    output.text = text;
    if (withSize) output.size_bytes = Buffer.byteLength(text, "utf8");
  });
}

/** C1's UNKNOWN-cost variants, built over twoOccurrences to the pin's own forms, each with the paths its UNKNOWN rides at. */
const UNKNOWN_COSTS: Readonly<Record<string, { readonly edit: (result: JsonObject) => void; readonly paths: Readonly<Record<string, JsonValue>> }>> = {
  oneUnknown: {
    edit: result => {
      const block = objectOf(arrayOf(result.blocks, "blocks")[1], "blocks[1]");
      block.token_cost = { kind: "unknown", tokens: null };
      block.token_cost_kind = "unknown";
      const budget = objectOf(result.budget, "budget");
      budget.unknown_cost_count = 1;
      objectOf(budget.observability, "observability").token_cost_unknown = 1;
      budget.included_tokens = 8;
      objectOf(budget.token_accounting, "token_accounting").included_tokens = 8;
    },
    paths: { "result.blocks.1.token_cost.kind": "unknown", "result.blocks.1.token_cost.tokens": null, "result.blocks.1.token_cost_kind": "unknown" },
  },
  nothingPriced: {
    edit: result => {
      for (const item of arrayOf(result.blocks, "blocks")) {
        const block = objectOf(item, "block");
        block.token_cost = { kind: "unknown", tokens: null };
        block.token_cost_kind = "unknown";
      }
      const budget = objectOf(result.budget, "budget");
      budget.unknown_cost_count = 2;
      objectOf(budget.observability, "observability").token_cost_unknown = 2;
      budget.included_tokens = 0;
      budget.token_accounting = { kind: "unknown", estimator_id: null, included_tokens: null };
    },
    paths: {
      "result.blocks.0.token_cost.tokens": null, "result.blocks.1.token_cost.tokens": null, "result.blocks.0.token_cost_kind": "unknown",
      "result.blocks.1.token_cost_kind": "unknown", "result.budget.token_accounting.kind": "unknown", "result.budget.token_accounting.estimator_id": null,
      "result.budget.token_accounting.included_tokens": null,
    },
  },
  truncatedUnknown: {
    edit: result => {
      const blocks = arrayOf(result.blocks, "blocks");
      const cut = String(objectOf(blocks[1], "blocks[1]").candidate_key);
      result.blocks = [json(blocks[0])];
      const budget = objectOf(result.budget, "budget");
      budget.truncated_count = 1;
      budget.truncated_tokens = null;
      budget.truncated_keys = [cut];
      const counts = objectOf(budget.counts, "counts");
      counts.final_included = 1;
      counts.withheld_truncated = 1;
      budget.included_tokens = 8;
      objectOf(budget.token_accounting, "token_accounting").included_tokens = 8;
      budget.unknown_cost_count = 1;
      objectOf(budget.observability, "observability").token_cost_unknown = 1;
    },
    paths: { "result.budget.truncated_tokens": null },
  },
};
/** C2's UNKNOWN figures, each in a term the adapter's display reads, over twoOccurrences. */
const UNKNOWN_FIGURES: Readonly<Record<string, (formula: JsonObject) => void>> = {
  availableNull: formula => {
    formula.available_context_tokens = null;
  },
  windowNull: formula => {
    formula.context_window = null;
  },
  availableAbsent: formula => {
    delete formula.available_context_tokens;
  },
  availableWord: formula => {
    formula.available_context_tokens = "UNKNOWN";
  },
};
function figureVariant(envelope: Envelope, edit: (formula: JsonObject) => void): Envelope {
  return variantOf(envelope, result => edit(objectOf(objectOf(result.budget, "budget").formula_terms, "formula_terms")));
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

interface Lexicon {
  readonly file: string;
  readonly literals: string[];
  readonly identifiers: string[];
  readonly specifiers: string[];
}
/** One module's lexicon: its string, no-substitution and template literals (a template's literal parts joined by a space), every
 * identifier, and every module specifier it imports, re-exports, import()s or require()s. */
function lexiconOf(fileName: string, text: string): Lexicon {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const identifiers: string[] = [];
  const specifiers: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first)) specifiers.push(first.text);
    }
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    else if (ts.isIdentifier(node)) identifiers.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file: fileName, literals, identifiers, specifiers };
}
/** The words a detector reads: camelCase split, so contextProjection reads as context Projection. */
function normalized(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}
function termHits(lexicon: Lexicon, pattern: RegExp): string[] {
  return [...lexicon.literals, ...lexicon.identifiers].filter(item => pattern.test(normalized(item)));
}
let srcLexica: Lexicon[] | undefined;
/** Every src .ts module's lexicon, parsed once. */
function srcLexicon(): Lexicon[] {
  srcLexica ??= filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => lexiconOf(relative(REPO, file), textOf(file)));
  return srcLexica;
}
/** The src files the lexicon does not parse: every src file is a .ts module at base, so a file of another kind reds E3 until read. */
function unparsedSrc(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => !file.endsWith(".ts")).map(file => relative(REPO, file));
}
/** An anchor: the module is scanned, spells every one of `spelled` among its identifiers, and the vocabularies read nothing there. */
function anchorOf(lexica: readonly Lexicon[], file: string, spelled: readonly string[]): boolean {
  const lexicon = lexica.find(entry => entry.file === file);
  if (lexicon === undefined) return false;
  return spelled.every(name => lexicon.identifiers.includes(name)) && termHits(lexicon, RECEIPT).length === 0 && termHits(lexicon, PRICING).length === 0;
}
/** A control line's reading: how many receipt and priced-field words it spells. */
function controlReading(text: string): JsonObject {
  const lexicon = lexiconOf("control.ts", text);
  return { receipt: termHits(lexicon, RECEIPT).length, pricing: termHits(lexicon, PRICING).length };
}
const E4_FLAGGED: Readonly<Record<string, string>> = {
  projectionExport: "const projection = await components.exportContextProjection(render);",
  budgetReceipt: 'const receipt = projection["budget_receipts"][0];',
  usageReceipt: "const usage: UsageReceipt = inference.usageReceipt;",
  capabilitySnapshot: "const snapshot = budget.capability_snapshot;",
  renderReport: "const report = await tsx.readRenderReport(run);",
  cachePrefix: "const prefix = receipt.cachePrefix;",
  promptCacheLabel: 'const label = "prompt-cache usage";',
  modelReported: "const reported = receipt.model_reported;",
  tokenizer: "const counter = providers.tokenizer;",
  packetId: 'const gate = "RI-H2-03";',
  dottedCapability: 'registry.register({ descriptor: { id: "reactivefiber.context.projection" } });',
  includedTokens: "const total = result.budget.included_tokens;",
  tokenCostKind: "const kind = block.token_cost_kind;",
  accountingElement: 'const priced = budget["token_accounting"].kind;',
  methodDestructured: "const { token_count_method: method } = budget;",
  estimatorTemplate: ["const label = `priced by $", "{budget.estimatorId} ($", "{block.tokenCost.tokens} tokens)`;"].join(""),
  estimatorRule: 'const rule = "rf.utf8-bytes-div4.v1";',
  countTokens: "const tokens = countTokens(output.text);",
  tokenEstimate: 'const label = "token estimate";',
  estimatedTokens: "const shown = receipt.estimatedTokens;",
  exactCount: "const exact = receipt.exact_token_count;",
  truncatedTokens: "const cut = budget.truncated_tokens;",
  unknownCostCount: "const unpriced = budget.unknown_cost_count;",
  tokenCost: "const cost = block.token_cost.tokens;",
};
const E4_QUIET: Readonly<Record<string, string>> = {
  formulaReader: "const window = Number(formula.context_window); const available = formula.available_context_tokens;",
  budgetPhrase: ["const budget = `$", "{available} of $", "{window} context tokens available`;"].join(""),
  inclusionCount: ["const note = `inclusion: $", "{blocks.length} blocks included`;"].join(""),
  piTokensFormat: "const shown = formatTokens(getLifetimeTotal(record.lifetimeUsage));",
  cachePlane: 'const description = "disposable, reconstructible cache-plane writes may occur";',
};
const E4_RESIDUALS: Readonly<Record<string, string>> = {
  "R-COMPOSED": 'const key = ["included", "tokens"].join("_"); export const total = budget[key];',
  "R-GENERIC-WALK": ["export const shown = Object.entries(result.budget).map(([key, value]) => `$", "{key}=$", "{String(value)}`);"].join(""),
  "R-PI-USAGE": "export const total = usage.input + usage.output + usage.cacheWrite + (usage.cacheRead ?? 0);",
};

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

/** The bead's own notes in the tracker export, the text rows A to E are held to. */
function beadNotes(): string {
  for (const line of textOf(EXPORT_PATH).split("\n")) {
    if (!line.includes(`"id":"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.notes === "string") return row.notes;
  }
  return "";
}
/** The clauses of the notes' first Acceptance line, split at each "; (x) " marker, the final period dropped. */
function acceptanceClauses(notes: string): string[] {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: (a) "));
  if (line === undefined) return [];
  return line.slice("Acceptance: ".length).replace(/\.$/, "").split(/; (?=\([b-z]\) )/);
}

/** The package names a package.json declares, across every dependency list. */
function declaredPackages(): { lists: JsonObject; names: string[] } {
  const manifest: unknown = JSON.parse(textOf(join(REPO, "package.json")));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  const lists: JsonObject = {};
  const names: string[] = [];
  for (const list of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
    const entries = manifest[list];
    const keys = isObject(entries) ? Object.keys(entries) : [];
    lists[list] = keys.length;
    names.push(...keys);
  }
  const bundled = manifest.bundledDependencies;
  const bundledNames = Array.isArray(bundled) ? bundled.filter((name): name is string => typeof name === "string") : [];
  lists.bundledDependencies = bundledNames.length;
  names.push(...bundledNames);
  return { lists, names };
}
/** The package directories installed at the top of node_modules, scoped ones as @scope/name. */
function installedPackages(): string[] {
  const top = join(REPO, "node_modules");
  let entries: Dirent[];
  try {
    entries = readdirSync(top, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap(entry => {
    if (!entry.isDirectory() || entry.name.startsWith(".")) return [];
    if (!entry.name.startsWith("@")) return [entry.name];
    try {
      return readdirSync(join(top, entry.name), { withFileTypes: true }).filter(child => child.isDirectory()).map(child => `${entry.name}/${child.name}`);
    } catch {
      return [];
    }
  });
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const one = occurrencesOf(ENVELOPES.oneOccurrence);
    const two = occurrencesOf(ENVELOPES.twoOccurrences);
    const oneCost = Number(arrayOf(one.costs, "costs")[0]);
    for (const name of MEASURED) {
      expect([ENVELOPES[name].schema, ENVELOPES[name].command, ENVELOPES[name].ok, ROSTER.exits[name], ENVELOPES[name].diagnostics.length]).toEqual([RF_SCHEMA, "context.render", true, 0, 0]);
      expect(resultOf(ENVELOPES[name]).ephemeral).toBe(true);
    }
    expect(one.definitions).toEqual([DEFINITION]);
    expect(two.definitions).toEqual([DEFINITION]);
    expect(arrayOf(two.keys, "keys")).toHaveLength(2);
    expect(new Set(arrayOf(two.keys, "keys")).size).toBe(2);
    expect(new Set(arrayOf(two.instances, "instances")).size).toBe(2);
    expect(oneCost).toBeGreaterThan(0);
    expect(two.costs).toEqual([oneCost, oneCost]);
    expect([one.included, two.included]).toEqual([oneCost, 2 * oneCost]);
    expect([one.accounted, two.accounted]).toEqual([one.included, two.included]);
    expect([one.finalIncluded, two.finalIncluded, one.necessityEvals, two.necessityEvals]).toEqual([1, 2, 1, 2]);
    const withheld = { one: occurrencesOf(ENVELOPES.oneWithheld), two: occurrencesOf(ENVELOPES.twoWithheld) };
    expect([withheld.one.included, withheld.two.included, withheld.one.necessityEvals, withheld.two.necessityEvals]).toEqual([oneCost, 2 * oneCost, 2, 3]);
    expect([withheld.one.judged, withheld.two.judged]).toEqual([2, 3]);
    const sameHeadroom = MEASURED.every(name => JSON.stringify(formulaOf(ENVELOPES[name])) === JSON.stringify(formulaOf(ENVELOPES.oneOccurrence)));
    expect(sameHeadroom).toBe(true);
    return { oneOccurrence: one, twoOccurrences: two, oneWithheld: withheld.one, twoWithheld: withheld.two, sameHeadroom, formula: formulaOf(ENVELOPES.oneOccurrence) };
  },
  A2: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const { witness: own, source } = await verbatimReadings(name, envelope => envelope);
      const held = occurrencesOf(source);
      expect(held).toStrictEqual(occurrencesOf(readRoster().envelopes[name]));
      witness[name] = { ...own, blocks: arrayOf(held.keys, "keys").length, included: held.included ?? null };
    }
    return witness;
  },
  A3: async () => {
    const shown = Object.fromEntries(MEASURED.map(name => [name, shownOf(ENVELOPES[name])])) as Record<FixtureName, Shown>;
    const evals = MEASURED.map(name => necessityShown(shown[name].statusText));
    const inclusion = MEASURED.map(name => inclusionShown(shown[name].notes));
    const budgets = MEASURED.map(name => budgetShown(shown[name].statusText));
    expect(evals).toEqual([1, 2, 2, 3]);
    expect(inclusion).toEqual([null, null, { blocks: 1, withheld: 1, judged: 2 }, { blocks: 2, withheld: 1, judged: 3 }]);
    const formula = formulaOf(ENVELOPES.oneOccurrence);
    expect(budgets).toEqual(MEASURED.map(() => ({ available: formula.available_context_tokens, window: formula.context_window })));
    // R-NO-PRICED-DISPLAY's quiet row: one and two occurrences differ in the status line by rf's necessity counter alone.
    const quiet = shown.twoOccurrences.statusText === shown.oneOccurrence.statusText.replace(" · necessity evals 1 · ", " · necessity evals 2 · ");
    expect(quiet).toBe(true);
    return { statusText: { oneOccurrence: shown.oneOccurrence.statusText, twoOccurrences: shown.twoOccurrences.statusText }, evals, inclusion, budgets, quiet };
  },
  A4: async () => {
    const witness: JsonObject = {};
    for (const [name, withheld] of [["twoOccurrences", false], ["twoWithheld", true]] as const) {
      const envelope = ENVELOPES[name];
      const { source } = await verbatimReadings(name, item => item);
      const shown = shownOf(envelope);
      const pi: OccurrenceView = {
        blocks: blocksOf(source).length, included: budgetOf(source).included_tokens ?? null,
        necessityEvals: necessityShown(shown.statusText), inclusionBlocks: inclusionShown(shown.notes)?.blocks ?? null,
      };
      const producer = producerView(envelope, withheld);
      const dedup = dedupView(envelope, withheld);
      const piFailures = occurrenceFailures(pi, producer);
      const dedupFailures = occurrenceFailures(dedup, producer);
      expect(piFailures).toEqual([]);
      expect(dedupFailures.length).toBeGreaterThan(0);
      witness[name] = { pi: { ...pi }, dedup: { ...dedup }, piFailures, dedupFailures };
    }
    return witness;
  },
  B1: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const { witness: own, source } = await verbatimReadings(name, envelope => envelope);
      const budget = JSON.stringify(budgetOf(source)) === JSON.stringify(budgetOf(readRoster().envelopes[name]));
      const shown = budgetShown(shownOf(ENVELOPES[name]).statusText);
      const failures = budgetFailures(shown, ENVELOPES[name]);
      expect(budget).toBe(true);
      expect(failures).toEqual([]);
      witness[name] = { ...own, budgetVerbatim: budget, budgetKeys: Object.keys(budgetOf(source)).length, shown, failures };
    }
    return witness;
  },
  B2: async () => {
    const base = ENVELOPES.twoOccurrences;
    const shownBase = shownOf(base);
    const witness: JsonObject = {};
    for (const [label, text] of Object.entries(TEXTS)) {
      for (const withSize of [false, true]) {
        const variant = textVariant(base, text, withSize);
        const paths = diffPaths(base, variant);
        const shown = shownOf(variant);
        const same = shown.statusText === shownBase.statusText && JSON.stringify(shown.notes) === JSON.stringify(shownBase.notes);
        const piFailures = budgetFailures(budgetShown(shown.statusText), variant);
        const recomputed = recomputedBudget(variant);
        const recomputedFailures = budgetFailures(recomputed, variant);
        expect(paths).toEqual(withSize ? ["result.output.size_bytes", "result.output.text"] : ["result.output.text"]);
        expect(same).toBe(true);
        expect(shown.payloadRef).not.toBe(shownBase.payloadRef);
        expect(piFailures).toEqual([]);
        expect(recomputedFailures.length).toBeGreaterThan(0);
        witness[`${label}${withSize ? "+size" : ""}`] = { paths, same, payloadMoved: true, piFailures, recomputed, recomputedFailures };
      }
    }
    const baseUntouched = JSON.stringify(base) === JSON.stringify(readRoster().envelopes.twoOccurrences);
    expect(baseUntouched).toBe(true);
    return { variants: witness, baseUntouched };
  },
  C1: async () => {
    const shownBase = shownOf(ENVELOPES.twoOccurrences);
    const witness: JsonObject = {};
    for (const [label, form] of Object.entries(UNKNOWN_COSTS)) {
      const { witness: own, source } = await verbatimReadings("twoOccurrences", envelope => variantOf(envelope, form.edit));
      // A null the reading carries stays null; only a missing path reads as ABSENT.
      const carried = Object.fromEntries(Object.keys(form.paths).map(path => {
        const value = at(source, path);
        return [path, value === undefined ? "ABSENT" : json(value)];
      }));
      expect(carried).toStrictEqual(form.paths);
      const shown = shownOf(variantOf(ENVELOPES.twoOccurrences, form.edit));
      const same = shown.statusText === shownBase.statusText && JSON.stringify(shown.notes) === JSON.stringify(shownBase.notes);
      expect(same).toBe(true);
      witness[label] = { ...own, carried, sameDisplay: same };
    }
    return witness;
  },
  C2: async () => {
    const witness: JsonObject = {};
    for (const [label, edit] of Object.entries(UNKNOWN_FIGURES)) {
      const variant = figureVariant(ENVELOPES.twoOccurrences, edit);
      const native = await nativeRead(variant);
      const injected = await injectedRead(variant);
      const adapter = adapterRefusal(variant);
      const carried = JSON.stringify(injected.reading.source) === JSON.stringify(figureVariant(readRoster().envelopes.twoOccurrences, edit));
      const piFailures = budgetFailures(null, variant);
      const defaulted = budgetFailures(defaultedBudget(variant), variant);
      const estimated = budgetFailures(estimatedBudget(variant), variant);
      expect(native.reading).toBeNull();
      expect(native.refusal).toStrictEqual({ category: "transport", message: NOT_A_PREVIEW });
      expect(native.spawns).toHaveLength(1);
      expect(adapter).toStrictEqual({ category: "validation", message: FORMULA_REFUSED });
      expect(carried).toBe(true);
      expect(piFailures).toEqual([]);
      expect(defaulted.length).toBeGreaterThan(0);
      expect(estimated.length).toBeGreaterThan(0);
      witness[label] = { native: { refusal: native.refusal, spawns: native.spawns.length }, adapter, injectedCarried: carried, piFailures, defaulted, estimated };
    }
    return witness;
  },
  D1: async () => {
    const witness: JsonObject = {};
    for (const name of MEASURED) {
      const budget = budgetOf(ENVELOPES[name]);
      const accounting = objectOf(budget.token_accounting, "token_accounting");
      const blocks = blocksOf(ENVELOPES[name]).map(block => ({ kind: objectOf(block.token_cost, "token_cost").kind ?? null, label: block.token_cost_kind ?? null }));
      const capability = objectOf(budget.capability_snapshot, "capability_snapshot");
      const usageKeys = keysOf(ENVELOPES[name]).filter(key => USAGE_KEYS.includes(key));
      expect(METHOD_KINDS).toContain(budget.token_count_method);
      expect(COST_KINDS).toContain(accounting.kind);
      expect(accounting.kind).toBe(budget.token_count_method);
      expect(blocks.every(block => block.kind === block.label && COST_KINDS.includes(String(block.kind)))).toBe(true);
      expect([capability.can_count_tokens, capability.cache_prefix]).toEqual([false, null]);
      expect(usageKeys).toEqual([]);
      witness[name] = { method: budget.token_count_method ?? null, accounting: accounting.kind ?? null, blocks, canCountTokens: capability.can_count_tokens ?? null, cachePrefix: capability.cache_prefix ?? null, usageKeys };
    }
    return witness;
  },
  D2: async () => {
    const cases: [string, Envelope][] = [
      ...MEASURED.map((name): [string, Envelope] => [name, ENVELOPES[name]]),
      ...Object.entries(UNKNOWN_COSTS).map(([label, form]): [string, Envelope] => [label, variantOf(ENVELOPES.twoOccurrences, form.edit)]),
    ];
    const witness: JsonObject = {};
    for (const [label, envelope] of cases) {
      const shown = shownOf(envelope);
      const piFailures = kindFailures(surfaced(shown), shown.statusText, envelope);
      const summed = summedStatus(shown.statusText, envelope);
      const summedFailures = kindFailures([...surfaced(shown), summed], summed, envelope);
      expect(piFailures).toEqual([]);
      expect(summedFailures.length).toBeGreaterThan(0);
      witness[label] = { phrases: tokenPhrases(shown.statusText), piFailures, summedFailures };
    }
    return witness;
  },
  E1: async () => {
    const { lists, names } = declaredPackages();
    const installed = installedPackages();
    const specifiers = srcLexicon().flatMap(lexicon => lexicon.specifiers.map(specifier => `${lexicon.file}: ${specifier}`));
    const floors = { declared: names.length >= 10, installed: installed.length >= 100, specifiers: specifiers.length >= 300 };
    const declaredH2 = names.filter(name => H2_PACKAGE.test(name));
    const installedH2 = installed.filter(name => H2_PACKAGE.test(name));
    const importedH2 = specifiers.filter(entry => H2_PACKAGE.test(entry.slice(entry.indexOf(": ") + 2)));
    // Non-vacuity: the selector reads the SDK packages Pi does bundle, and the pattern names each H2 package spelling.
    const bundledRead = ["@furnace/sdk", "@hyperunix/sdk", "@forge/sdk"].every(name => names.includes(name) && installed.includes(name));
    const patternRead = ["reactive-components", "reactive_inference", "@reactive/inference", "@fiber-optics/sdk", "reactive-fiber-tsx", "reactivelenses"].every(name => H2_PACKAGE.test(name));
    const ownRf = H2_PACKAGE.test("./providers/reactivefiber.js");
    expect(floors, `declared ${names.length} (${JSON.stringify(lists)}), installed ${installed.length}, specifiers ${specifiers.length}`).toStrictEqual({ declared: true, installed: true, specifiers: true });
    expect([bundledRead, patternRead, ownRf]).toEqual([true, true, false]);
    expect(declaredH2, "an H2 producer package in package.json").toEqual([]);
    expect(installedH2, "an H2 producer package in node_modules").toEqual([]);
    expect(importedH2, "a src module importing an H2 producer package").toEqual([]);
    return { floors, bundledRead, patternRead, ownRf, declaredH2, installedH2, importedH2 };
  },
  E2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const descriptors = await nativeDescriptors();
    const injectedDescriptors = injected.catalogSnapshot().map(entry => entry.descriptor);
    const native = rfIds(descriptors);
    const injectedIds = rfIds(injectedDescriptors);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const spelling = [...descriptors, ...injectedDescriptors]
      .filter(descriptor => RECEIPT.test(normalized(JSON.stringify(descriptor))) || PRICING.test(normalized(JSON.stringify(descriptor))))
      .map(descriptor => descriptor.id);
    // Non-vacuity: the selector read a catalog holding at least one provider that is not rf, and excluded it.
    const catalogRead = native.length > 0 && descriptors.length > native.length;
    expect(catalogRead, `native descriptors ${descriptors.length}, rf ${native.length}`).toBe(true);
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(spelling, "a registered descriptor spelling an H2 receipt or rf priced field").toEqual([]);
    return { catalogRead, native, injected: injectedIds, reconcile, spelling };
  },
  E3: async () => {
    const lexica = srcLexicon();
    const literals = lexica.reduce((sum, lexicon) => sum + lexicon.literals.length, 0);
    const identifiers = lexica.reduce((sum, lexicon) => sum + lexicon.identifiers.length, 0);
    const receipt = lexica.flatMap(lexicon => termHits(lexicon, RECEIPT).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const pricing = lexica.flatMap(lexicon => termHits(lexicon, PRICING).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const floors = { modules: lexica.length >= 100, literals: literals >= 5000, identifiers: identifiers >= 50000 };
    const anchors = {
      observer: anchorOf(lexica, "src/workbench/reactivefiber-observer.ts", ["formula_terms", "available_context_tokens", "necessity_eval_count"]),
      provider: anchorOf(lexica, "src/workbench/providers/reactivefiber.ts", ["formula_terms", "available_context_tokens"]),
      usage: anchorOf(lexica, "src/usage.ts", ["cacheRead", "cacheWrite", "getLifetimeTotal"]),
    };
    const unparsed = unparsedSrc();
    expect(floors, `src modules ${lexica.length}, literals ${literals}, identifiers ${identifiers}`).toStrictEqual({ modules: true, literals: true, identifiers: true });
    expect(anchors).toStrictEqual({ observer: true, provider: true, usage: true });
    expect(unparsed, "a src file the lexical scan does not parse").toEqual([]);
    expect(receipt, "a src literal or identifier spelling an H2 receipt or count-kind label").toEqual([]);
    expect(pricing, "a src literal or identifier spelling an rf priced field or estimator").toEqual([]);
    return { floors, anchors, unparsed, receipt, pricing };
  },
  E4: async () => {
    const flagged = Object.fromEntries(Object.entries(E4_FLAGGED).map(([name, text]) => [name, controlReading(text)]));
    const quiet = Object.fromEntries(Object.entries(E4_QUIET).map(([name, text]) => [name, controlReading(text)]));
    const residuals = Object.fromEntries(Object.entries(E4_RESIDUALS).map(([name, text]) => [name, controlReading(text)]));
    const hits = (reading: JsonValue): number => Number(objectOf(reading, "reading").receipt) + Number(objectOf(reading, "reading").pricing);
    // Per term: how many flagged controls each vocabulary word reads on its own, so a word dropped from the detector reds here.
    const perTerm = Object.fromEntries([...RECEIPT_TERMS, ...PRICING_TERMS].map(term => {
      const pattern = termPattern([term]);
      return [term, Object.values(E4_FLAGGED).filter(text => termHits(lexiconOf("control.ts", text), pattern).length > 0).length];
    }));
    expect(Object.values(flagged).map(reading => hits(reading) > 0)).toEqual(Object.keys(E4_FLAGGED).map(() => true));
    expect(Object.values(perTerm).map(count => count > 0), "every vocabulary word reads at least one flagged control").toEqual([...RECEIPT_TERMS, ...PRICING_TERMS].map(() => true));
    expect(Object.values(quiet).map(hits)).toEqual(Object.keys(E4_QUIET).map(() => 0));
    expect(Object.values(residuals).map(hits)).toEqual(Object.keys(E4_RESIDUALS).map(() => 0));
    return { flagged, perTerm, quiet, residuals };
  },
};

describe("wb-4nut.7 H2 budget echo census (TSX-HARNESS2-REACTIVE-EVOLUTION-R7, gated on RC-H2-02, TSX-H2-04, RI-H2-01 and RI-H2-03, until-then leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the cases and the bead's own notes agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:2", "C:2", "D:2", "E:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, rfVersion: RF_VERSION, pin: RF_PIN, definition: DEFINITION, kinds: { cost: COST_KINDS, method: METHOD_KINDS },
      vocabulary: { receipt: RECEIPT_TERMS, pricing: PRICING_TERMS, usageKeys: USAGE_KEYS }, fixtures: [...MEASURED],
    }).toStrictEqual({
      bead: ROSTER.bead, rfVersion: ROSTER.rfVersion, pin: ROSTER.pin, definition: ROSTER.definition, kinds: { cost: [...ROSTER.kinds.cost], method: [...ROSTER.kinds.method] },
      vocabulary: { receipt: [...ROSTER.vocabulary.receipt], pricing: [...ROSTER.vocabulary.pricing], usageKeys: [...ROSTER.vocabulary.usageKeys] }, fixtures: [...ROSTER.fixtures],
    });
    // The pin's schema facts the roster holds: three schemas, each with its blob and sha256, each byte-identical where rf is installed.
    expect(ROSTER.schemas.map(schema => [schema.path, schema.blob.length, schema.sha256.length, schema.installedIdentical])).toEqual([
      ["src/reactive_fiber_cli/schemas/cli/context.render.schema.json", 40, 64, true],
      ["src/reactive_fiber_cli/schemas/workspace/budget.schema.json", 40, 64, true],
      ["src/reactive_fiber_cli/schemas/workspace/candidate-block.schema.json", 40, 64, true],
    ]);
    // The external anchor: the acceptance rows' labels are the clauses of the bead's own Acceptance line, in order, and every other
    // row's label is a whole line of the same notes, so a row hollowed out of every literal of this file and the roster still reds.
    const notes = beadNotes();
    const clauses = acceptanceClauses(notes);
    expect(notes.length, `${BEAD}'s notes were read from the tracker export`).toBeGreaterThan(0);
    expect(clauses, "the bead's acceptance clauses").toHaveLength(4);
    expect(ROWS.filter(row => /^\([a-z]\) /.test(row.label)).map(row => row.label)).toEqual(clauses);
    const lines = notes.split("\n");
    expect(ROWS.filter(row => !/^\([a-z]\) /.test(row.label)).map(row => lines.includes(row.label))).toEqual([true]);
    expect(ROWS.some(row => row.label === lines.find(line => line.startsWith("Not P0: ")))).toBe(true);
    // Every fixture names the rewritten scratch root; each pair shares one workspace, and the four are four renders.
    expect(MEASURED.map(name => ENVELOPES[name].workspace?.root ?? null)).toEqual(MEASURED.map(() => FIXTURE_ROOT));
    expect(new Set(MEASURED.map(name => ENVELOPES[name].workspace?.id)).size).toBe(2);
    expect(new Set(MEASURED.map(name => ENVELOPES[name].operation_id)).size).toBe(4);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
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
