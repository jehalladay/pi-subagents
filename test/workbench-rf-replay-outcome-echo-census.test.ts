/**
 * wb-pfxo.5 (RF-COMPOSITIONAL-ASSEMBLY-R6), the replay outcome echo census. Statement (bead notes, full form; <CLAIM-R> and
 * <CLAIM-E> are the guarded claim classes below, written as placeholders): "No Pi surface shall label an rf replay as <CLAIM-R>
 * or <CLAIM-E> from a render ID, input document or digest match alone; Pi echoes rf context replay's outcome (reproduced |
 * reproduced_with_declared_variance | deterministic_mismatch | not_replayable), status (incomplete | partial), effects_denied and
 * final_document_digest verbatim, distinguishing receipt replay (committed bytes) from computation replay (posture; leaf served
 * at the pin)" (docs/programs/compositional-assembly-2026-10-18/README.md:69@6a251bf73af5). Acceptance: "(a) fixture replay
 * result with outcome "reproduced" and non-empty effects_denied: no <CLAIM-E> claim, the denied count named; (b) fixture outcome
 * "deterministic_mismatch" (exit 11): never a success tone, the non-empty diff surfaced, not summarized as equal; (c) any Pi
 * digest-equality statement names final_document_digest verbatim and says canonical committed bytes, never re-execution or
 * external effects; (d) fixture status "incomplete": coverage partial, never success."
 *
 * The guarded claim classes: <CLAIM-R> joins re-execution with equality (either order; the re-execution-first arm admits the
 * same copula fill as the effect arms, wb-hmre); <CLAIM-E> joins effects with reproduced or re-executed (either order), or
 * external(-world) effects with equality (either order). A claim's words, and a word's own hyphen, may be split by any run of
 * the separator class SEPARATORS - whitespace, every ASCII punctuation mark but the comma and the semicolon (markdown emphasis,
 * code spans, quotation marks, brackets and parentheses among them) and the Unicode hyphen, dash and curly quotation-mark forms -
 * and only a letter or a digit ends a claim, never an underscore (wb-w1kd, the wb-hmre gate's F1). This file never spells one:
 * CLAIMS composes each from CLAIM_WORDS at runtime and every comment and label writes the placeholder (Q7 reads this file and the
 * roster for it).
 *
 * MEASURED (read-only, by the cutting seat, 2026-10-23): at the pin, ReactiveFiberCLI 6a251bf73af5, README.md:69 carries the
 * quoted sentences and src/reactive_fiber_cli/schemas/cli/context/replay-result.json (reactive-fiber.replay-result/v1) spells
 * the outcome enum at :30-33, effects_denied at :99, the status enum at :121-122, verdicts_equal at :134 and
 * final_document_digest at :143; the installed rf 0.1.832 (`rf --json --version` result.version) packages that fragment and the
 * context.replay envelope schema byte-identical to the pin. The envelope schema fixes the wire: ok true admits only reproduced
 * and reproduced_with_declared_variance (exit 0), and a denied effect rides result.effects_denied plus an RF_REPLAY_EFFECT_DENIED
 * warning; every failure is result null with its RF_ primary at diagnostics[0]: exit 11 RF_REPLAY_MISMATCH carries outcome
 * deterministic_mismatch, the SemanticDiff and the recorded and replayed digests in its metadata, and exit 5
 * RF_REPLAY_TRUST_DENIED is the denied-trust replay. A status:incomplete fragment therefore never rides a context.replay
 * envelope (the envelope schema refuses it in both branches, measured with ajv 2020-12); its wire form is the exit-5 refusal.
 * THE FIXTURE (test/fixtures/rf-replay-outcome-echo-roster.json): envelopes.measured is MEASURED, the stdout of `rf context
 * replay RENDER --json` (exit 0) from the installed rf over a render committed in a scratch workspace, only the scratch root
 * rewritten to /fixture/rf-workspace; envelopes.deniedEffects, variance, mismatch and trustDenied are the producer's own valid
 * fixtures at the pin (schemas/fixtures/context.replay/valid/ok_reproduced.json, ok_reproduced_with_declared_variance.json,
 * failure_mismatch_exit_11.json and failure_trust_denied_exit_5.json); fragments.incomplete is CONSTRUCTED from those fixtures'
 * values under the fragment's TRUST-SEC-A52 rule (a denied trust outcome, status incomplete, outcome not_replayable, the
 * trust_denied reason and a denied trust decision), since no producer fixture carries a status. Each validates against the
 * installed schemas (ajv 2020-12, 0 errors), and a control without the trust_denied reason is refused.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts): it spawns only `rf ... context
 * render --no-commit`, and its adapter (reactivefiber-observer.ts) admits only context.render envelopes, so today Pi reads no rf
 * replay result and the obligation holds by refusal. The census pins that, every surface the obligation already reaches, and an
 * ARMED half that binds the first replay reader to come:
 *  A, the trigger. A1 every src module and every native descriptor read as tokens for REPLAY_VOCABULARY (snake, camel, constant
 *    and kebab spellings fold to one token, matched inside longer identifiers too), with a floor, an anchor and controls; a module
 *    that spells one must be bound in REPLAY_READERS, and every binding must name such a module (empty both ways today); the
 *    module set is bound to the git index (every tracked src .ts module is read, the anchor module among them). A2 the
 *    native reader against a stand-in rf answering each wire envelope with its exit: the transport refusal of an unrecognized
 *    envelope every time (it recognizes only context.render), never a reading, one spawn of the render argv. A3 the reader
 *    adapter refuses a reading of each wire envelope and of the incomplete fragment.
 *  B, acceptance (a). B1 the fixture oracle; B2 the registered reading (the registry's injected-reader seam) carries each exit-0
 *    envelope byte for byte, effects_denied and its count included; B3 no file of src, docs, qa or the front matter spells a
 *    guarded claim, with the matcher's spellings read on composed controls (the copula form of <CLAIM-R>, every member of the
 *    separator class, the wb-hmre gate's markup and punctuation forms and both edges of a claim among them); every walk B3
 *    and D1 read covers each file the git index tracks under its root, an anchor outside this file and the roster;
 *    B4 the armed check: every bound reader names the denied count and every denied id and spells no guarded claim (synthetic
 *    readers exercise the checker).
 *  C, acceptance (b). C1 the fixture oracle; C2 the registered reading carries the mismatch, its diff verbatim; C3 never a success
 *    tone: the native reader refuses the wire envelope as unrecognized, its render-command form is the typed refusal naming
 *    RF_REPLAY_MISMATCH, and the adapter's projection of that form is a failure; C4 the armed check: no success tone, every diff
 *    member surfaced, the outcome verbatim, no equality summary.
 *  D, acceptance (c). D1 every unit (line, table cell or sentence) of src, docs, qa and the front matter that couples an rf replay
 *    with digest equality must name final_document_digest and canonical committed bytes and spell no guarded claim (no such unit
 *    exists today; controls exercise the judge); D2 the armed check over the measured final_document_digest.
 *  E, acceptance (d). E1 the fixture oracle; E2 the registered reading carries the exit-5 wire form; E3 never success: the native
 *    reader refuses the wire envelope as unrecognized, its render-command form is the typed refusal naming RF_REPLAY_TRUST_DENIED,
 *    and the adapter's projection of that form is a failure, never complete coverage; E4 the armed check: coverage partial, no
 *    success tone, incomplete verbatim.
 *  Q, the residuals' pinned quiet rows (RESIDUALS).
 * The render-command forms C3, E3, Q1 and Q2 read are CONSTRUCTED: the producer's diagnostics on a context.render failure envelope
 * whose workspace keeps the fixture's id under the reading root (the adapter refuses a foreign root before projecting), since the
 * render plane never emits a replay code.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id,
 * label and pins, every pin's witness, the enums, codes, exits, vocabulary, claim words, separator class and residual
 * families, and every registered test title - is held to the out-of-file roster, whose producer fixtures anchor the enums, codes
 * and diff outside this file. The last case reads the vitest task tree (every registered test, in roster order, in run mode, ran
 * before it) and the set of pins that reached their witness; a file-level afterAll holds that last case to its own run: when
 * every pin reached its witness (an unfiltered run) and the last case neither finished nor failed - a plain or conditional skip
 * modifier, a todo, an early return or a deleted case - the file reds (wb-hmre, the pfxo.5 gate's F2). Every describe factory
 * here also ends by reading vitest's own registration record (refuseUnrunRegistrations): vitest fixes a registration's mode when
 * it is registered and applies a name filter only after collection, so a describe or a case registered outside run mode - a
 * plain or conditional skip, todo or only modifier, or a skipping options value - fails the file at collection whatever else is
 * skipped with it, while a filtered run stays green (wb-w1kd, the wb-hmre gate's F2: a skip on the outer describe, and a
 * conditional skip on one pin case beside a plain one on the last case, each left rc 0 because the afterAll needs every pin
 * reached). Not claimed: an edit of this file and the roster together; one edit of this file that disables the last case and
 * defeats every guard that would see it (a skip modifier with the registration read that holds it deleted, and the afterAll
 * too while every pin still runs; or the last case's run record set before an early return, which only
 * --expect.requireAssertions reds); a skip through the test context at run time in the last case and in a pin case together;
 * one that narrows a docs, qa or front-matter walk and its own git pathspec together above the floor (a src narrowing stays
 * caught through A1's module pathspec).
 * RESIDUALS (named, each with its pinned quiet row): R-WITHHELD the native reader names nothing of a wire replay envelope (it is
 * unrecognized), and of the render-command form the native typed refusal and the adapter's projection carry the code but withhold
 * the diff and both digests, so the diff rides only the registered reading (Q1); R-COVERAGE-WORD the adapter's
 * failure projection of the exit-5 refusal's render-command form reads coverage unknown with a failure tone - never complete,
 * never success - but not the word partial, which binds the armed half (Q2); R-VOCABULARY a reader reading only the generic keys (outcome, status,
 * diff) or a key composed at runtime spells no vocabulary token and is invisible to A1 (Q3); R-PARAPHRASE a reworded claim is
 * not caught - a synonym or an inflection outside CLAIM_WORDS, or an auxiliary or linking word outside the fill sets; Q4 pins
 * PARAPHRASES, thirteen members (the eleven non-copula escapes of the pfxo.5 gate's corpus among them), each beside the plain
 * spelling it rewords, word for word (wb-w1kd, the wb-hmre gate's F3), which the matcher catches (Q4); R-INTERRUPTED a claim
 * split by a zero-width code point, spelled with a homoglyph letter, split by a comma or a semicolon (the two ASCII marks the
 * separator class leaves out, for the reasons at SEPARATORS) or by Unicode punctuation outside the class (an ellipsis), or
 * split by markup that carries a letter or a digit (an HTML tag, a markdown link target) is not caught (Q5; the hyphen
 * homoglyphs U+2010 and U+2011 are separators, caught in B3);
 * R-SCOPE test/ and the bead-store export .beads/ lie outside every scanned root, and .beads/ spells the guarded claims (the
 * owner filing quotes the statement) (Q6); R-COMPOSED a claim assembled at runtime, this file's own mechanism, is invisible to
 * any text scan (Q7); R-UNIT a digest-equality unit whose rf context lies outside the unit (a heading, a neighbouring sentence)
 * is not judged by D1 (Q8); R-JOINED claim words joined with no separator, a camelCase identifier, are not caught (Q9).
 * R-PARAPHRASE covers D1 too: a reworded equality (the digests agree) is not a judged statement (Q4).
 * SCOPE: the claim guard does not judge negation: any spelling reds, a sentence stating the prohibition included. The enums,
 * codes and shapes are producer facts at the pin; Pi vendors no rf schema, so a producer change is seen only when the roster is
 * re-measured. No replay reader is added or faked here: a reader's own cut binds itself in REPLAY_READERS and meets B4, C4, D2
 * and E4.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, docs, qa and .beads are only read.
 */
import { execFileSync } from "node:child_process";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, afterEach, describe, expect, it, TestRunner, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const THIS_FILE = fileURLToPath(import.meta.url);
const ROSTER_PATH = join(HERE, "fixtures", "rf-replay-outcome-echo-roster.json");
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const REPLAY_COMMAND = "context.replay";

/** The fragment's outcome enum (replay-result.json :30-33) and status enum (:121-122), in the producer's declaration order. */
const OUTCOMES = ["reproduced", "reproduced_with_declared_variance", "deterministic_mismatch", "not_replayable"];
const STATUSES = ["incomplete", "partial"];
/** The four values the statement says Pi echoes verbatim. */
const ECHO_KEYS = ["outcome", "status", "effects_denied", "final_document_digest"];
const CODES = { mismatch: "RF_REPLAY_MISMATCH", trustDenied: "RF_REPLAY_TRUST_DENIED", effectDenied: "RF_REPLAY_EFFECT_DENIED" };
const EXITS = { mismatch: 11, trustDenied: 5 };
/** The replay-result vocabulary: the fragment's distinctive keys, its outcome words and the three replay codes, none spelled by
 * any src module at base ce85c7c. The generic keys (render_id, outcome, diff, versions, substituted, diagnostics, status) are
 * left out - src spells each for the render envelope or elsewhere - and named under R-VOCABULARY. */
const REPLAY_VOCABULARY = [
  "replayability",
  "version_deltas",
  "effect_policy",
  "trust_decisions",
  "live_recomputed",
  "effects_denied",
  "trust_outcomes",
  "verdicts_equal",
  "evidence_record_id",
  "final_document_digest",
  "reproduced_with_declared_variance",
  "deterministic_mismatch",
  "not_replayable",
  "recorded_digest",
  "replayed_digest",
  "RF_REPLAY_MISMATCH",
  "RF_REPLAY_TRUST_DENIED",
  "RF_REPLAY_EFFECT_DENIED",
];
/** The guarded claim words; CLAIMS joins them at runtime, so no source line here joins two of them. */
const CLAIM_WORDS = {
  effect: ["effect", "effects"],
  redo: ["reproduced", "re-executed", "reexecuted"],
  external: ["external", "external-world"],
  equal: ["equal", "equality", "identical"],
  reexecution: ["re-execution", "reexecution"],
  afterEffect: ["were", "are", "was", "is", "been", "all", "also"],
  beforeEffect: ["the", "all", "its", "their", "every"],
  linking: ["of", "to", "the", "as", "a"],
};
/** Each residual family and the quiet row that pins it. */
const RESIDUALS: Readonly<Record<string, readonly string[]>> = {
  "R-WITHHELD": ["Q1"],
  "R-COVERAGE-WORD": ["Q2"],
  "R-VOCABULARY": ["Q3"],
  "R-PARAPHRASE": ["Q4"],
  "R-INTERRUPTED": ["Q5"],
  "R-SCOPE": ["Q6"],
  "R-COMPOSED": ["Q7"],
  "R-UNIT": ["Q8"],
  "R-JOINED": ["Q9"],
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
    label: "(trigger, absent today) Pi reads no rf replay result: no src module or native descriptor spells the replay-result vocabulary unbound, and the native reader and the reader adapter refuse every replay envelope and the incomplete fragment",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(a) a fixture replay result with outcome reproduced and non-empty effects_denied: no <CLAIM-E> claim, the denied count named",
    pins: ["B1", "B2", "B3", "B4"],
  },
  {
    id: "C",
    label: "(b) a fixture outcome deterministic_mismatch (exit 11): never a success tone, the non-empty diff surfaced, not summarized as equal",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "D",
    label: "(c) any Pi digest-equality statement names final_document_digest verbatim and says canonical committed bytes, never re-execution or external effects",
    pins: ["D1", "D2"],
  },
  {
    id: "E",
    label: "(d) a fixture status incomplete: coverage partial, never success",
    pins: ["E1", "E2", "E3", "E4"],
  },
  {
    id: "Q",
    label: "the residuals: each named family pinned by its quiet row",
    pins: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"],
  },
];

interface Envelope {
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
  readonly outcomes: readonly string[];
  readonly statuses: readonly string[];
  readonly echoKeys: readonly string[];
  readonly codes: JsonValue;
  readonly exits: JsonValue;
  readonly vocabulary: readonly string[];
  readonly claimWords: JsonValue;
  readonly separators: JsonValue;
  readonly residuals: JsonValue;
  readonly tests: readonly string[];
  readonly envelopes: {
    readonly measured: Envelope;
    readonly deniedEffects: Envelope;
    readonly variance: Envelope;
    readonly mismatch: Envelope;
    readonly trustDenied: Envelope;
  };
  readonly incomplete: JsonObject;
  readonly rows: readonly RosterRow[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`${field} must be a string list`);
  return value;
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value)) throw new Error(`roster envelope ${name} must be an object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster envelope ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`roster envelope ${name} needs a null transaction, a result and diagnostics`);
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null,
    result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.fragments)) {
    throw new Error("roster must be an object with rows, envelopes and fragments");
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
  return {
    outcomes: strings(raw.outcomes, "roster outcomes"),
    statuses: strings(raw.statuses, "roster statuses"),
    echoKeys: strings(raw.echoKeys, "roster echoKeys"),
    codes: json(raw.codes),
    exits: json(raw.exits),
    vocabulary: strings(raw.vocabulary, "roster vocabulary"),
    claimWords: json(raw.claimWords),
    separators: json(raw.separators),
    residuals: json(raw.residuals),
    tests: strings(raw.tests, "roster tests"),
    envelopes: {
      measured: envelopeOf(raw.envelopes.measured, "measured"),
      deniedEffects: envelopeOf(raw.envelopes.deniedEffects, "deniedEffects"),
      variance: envelopeOf(raw.envelopes.variance, "variance"),
      mismatch: envelopeOf(raw.envelopes.mismatch, "mismatch"),
      trustDenied: envelopeOf(raw.envelopes.trustDenied, "trustDenied"),
    },
    incomplete: objectOf(json(raw.fragments.incomplete), "roster fragments.incomplete"),
    rows,
  };
}

const ROSTER = readRoster();
const { measured: MEASURED, deniedEffects: DENIED_EFFECTS, variance: VARIANCE, mismatch: MISMATCH, trustDenied: TRUST_DENIED } = ROSTER.envelopes;
const INCOMPLETE = ROSTER.incomplete;
/** The wire envelopes with the exit each one rides. */
const WIRE: readonly { readonly name: string; readonly envelope: Envelope; readonly exit: number }[] = [
  { name: "measured", envelope: MEASURED, exit: 0 },
  { name: "deniedEffects", envelope: DENIED_EFFECTS, exit: 0 },
  { name: "variance", envelope: VARIANCE, exit: 0 },
  { name: "mismatch", envelope: MISMATCH, exit: EXITS.mismatch },
  { name: "trustDenied", envelope: TRUST_DENIED, exit: EXITS.trustDenied },
];

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

function resultOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.result, `${envelope.operation_id} result`);
}
function primaryOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.diagnostics[0], `${envelope.operation_id} diagnostics[0]`);
}
function metadataOf(envelope: Envelope): JsonObject {
  return objectOf(primaryOf(envelope).metadata, `${envelope.operation_id} metadata`);
}
/** Every member a SemanticDiff names: the added and removed block ids, then each changed block id. */
function diffMembers(diff: JsonObject): string[] {
  const changed = Array.isArray(diff.changed) ? diff.changed.map(entry => String(objectOf(entry, "diff.changed[]").block_id)) : [];
  return [...strings(diff.added, "diff.added"), ...strings(diff.removed, "diff.removed"), ...changed];
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}

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
  return files;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** The repository's front matter: the regular *.md files at the root, then every file below examples/. */
function frontMatter(): string[] {
  let entries: Dirent[];
  try {
    entries = readdirSync(REPO, { withFileTypes: true });
  } catch {
    entries = [];
  }
  const markdown = entries.filter(entry => entry.isFile() && entry.name.endsWith(".md")).map(entry => join(REPO, entry.name));
  return [...markdown, ...filesBelow(join(REPO, "examples"))];
}

/** The files the git index tracks under the pathspecs and the working tree holds (repo-relative, sorted): the anchor outside this
 * file and the roster that every walk must cover (wb-hmre: a walk narrowed above its floor, or a module filter that reads nothing,
 * reds). A tracked file deleted from the working tree and not yet staged holds nothing to read, so it is not owed. */
function trackedFiles(...pathspecs: string[]): string[] {
  return execFileSync("git", ["ls-files", "-z", "--", ...pathspecs], { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
    .split("\0")
    .filter(path => path !== "" && existsSync(join(REPO, path)))
    .sort();
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
  readonly files: () => string[];
  /** The files the git index tracks under the root; the walk must read every one. */
  readonly tracked: () => string[];
}
/** The Pi surfaces B3 and D1 read; each floor sits below the count measured at base ce85c7c (src 115, docs 70, qa 67 files;
 * front matter 5 root *.md files and 7 under examples/), so an emptied or misdirected walk reds and an additive change does not;
 * and each walk must read every file the git index tracks under its root (measured at 27ae04e: src 115, docs 71, qa 67, front
 * matter 12, each walked in full), so a walk narrowed above its floor reds too (wb-hmre, the pfxo.5 gate's X15-X18). */
const SURFACE_ROOTS: readonly ScanRoot[] = [
  {
    root: "src", floor: 100, anchorFile: "src/workbench/providers/reactivefiber.ts", anchorToken: "context.render",
    files: () => filesBelow(join(REPO, "src")), tracked: () => trackedFiles("src"),
  },
  {
    root: "docs", floor: 50, anchorFile: "docs/workbench/13-contracts-and-config.md", anchorToken: PREVIEW_ID,
    files: () => filesBelow(join(REPO, "docs")), tracked: () => trackedFiles("docs"),
  },
  {
    root: "qa", floor: 50, anchorFile: "qa/workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts",
    files: () => filesBelow(join(REPO, "qa")), tracked: () => trackedFiles("qa"),
  },
  {
    root: "front matter (root *.md, examples/)", floor: 10, anchorFile: "README.md", anchorToken: "@tintinweb/pi-subagents",
    files: frontMatter, tracked: () => trackedFiles(":(glob)*.md", "examples"),
  },
];
function walkRoot(scan: ScanRoot): { files: string[]; floorMet: boolean; anchorRead: boolean; anchorTracked: boolean; unwalked: string[] } {
  const files = scan.files();
  const floorMet = files.length >= scan.floor;
  const anchor = join(REPO, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const tracked = scan.tracked();
  const walked = new Set(files.map(file => relative(REPO, file)));
  const anchorTracked = tracked.includes(scan.anchorFile);
  const unwalked = tracked.filter(path => !walked.has(path));
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(anchorTracked, `${scan.root}: the git index lists no ${scan.anchorFile}`).toBe(true);
  expect(unwalked, `${scan.root}: files the git index tracks that the walk did not read`).toEqual([]);
  return { files, floorMet, anchorRead, anchorTracked, unwalked };
}

/** The separator class (wb-w1kd, the wb-hmre gate's F1: markdown emphasis, a code span, parentheses, an em dash, underscore
 * emphasis and double quotation marks each split a claim the class used to miss): whitespace, every ASCII punctuation mark but
 * the comma and the semicolon, and the Unicode hyphen and dash forms U+2010-U+2015 and U+2212 and curly quotation marks U+2018,
 * U+2019, U+201C and U+201D, written as code points so this file stays ASCII. The comma stays out because this file and the
 * roster write a claim's words as list elements (a double quote, a comma, a space and a double quote between two words), which
 * read as claims once the comma joins the double quote in the class (measured at the wb-w1kd cut: 48 hits in this file and 14
 * in the roster); the semicolon stays out because the echo B4 prescribes (the outcome word, a semicolon, then effects_denied)
 * would read as a claim (3 hits here, B3's echoQuiet and B4's good echo among them). Both are R-INTERRUPTED members (Q5). Under
 * this class the real tree reads none (measured at 799eebe: every tracked file of src 116, docs 73, qa 67, front matter 12). */
const SEPARATORS: { readonly ascii: string; readonly unicode: readonly number[] } = {
  ascii: "_.:/-*`\"'()[]{}<>!?~|#$%&+=@\\^",
  unicode: [0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2015, 0x2212, 0x2018, 0x2019, 0x201c, 0x201d],
};
/** Every separator as one character, ASCII first. */
const SEPARATOR_CHARS: readonly string[] = [...SEPARATORS.ascii, ...SEPARATORS.unicode.map(code => String.fromCodePoint(code))];
/** A character's code point, U+ and four or more hex digits, the key B3's per-separator controls are held to. */
function codePoint(char: string): string {
  return `U+${(char.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, "0")}`;
}
/** One run of the separator class; a class-special character (backslash, bracket, caret, hyphen) is escaped. */
const SEP = `[\\s${SEPARATOR_CHARS.map(char => char.replace(/[\\\]^-]/g, "\\$&")).join("")}]+`;
/** A claim's edges (wb-w1kd): a letter or a digit may not touch it; an underscore may, as it may split one (snake case,
 * underscore emphasis), where the word boundary it replaces counted the underscore a letter. */
const LEAD = "(?<![A-Za-z0-9])";
const TRAIL = "(?![A-Za-z0-9])";
/** One alternation over words; a hyphen or space inside a word matches any separator run. */
function alt(words: readonly string[]): string {
  return `(?:${words.map(word => word.replace(/[-\s]+/g, SEP)).join("|")})`;
}
function fill(words: readonly string[]): string {
  return `(?:${SEP}${alt(words)})*`;
}
/** The guarded claims, composed from CLAIM_WORDS at runtime. */
const CLAIMS: readonly { readonly name: string; readonly pattern: RegExp }[] = (() => {
  const effect = alt(CLAIM_WORDS.effect);
  const redo = alt(CLAIM_WORDS.redo);
  const external = alt(CLAIM_WORDS.external);
  const equal = alt(CLAIM_WORDS.equal);
  const reexecution = alt(CLAIM_WORDS.reexecution);
  return [
    { name: "CLAIM-E effect, then redo", source: `${LEAD}${effect}${fill(CLAIM_WORDS.afterEffect)}${SEP}${redo}${TRAIL}` },
    { name: "CLAIM-E redo, then effect", source: `${LEAD}${redo}${fill(CLAIM_WORDS.beforeEffect)}${SEP}(?:${external}${SEP})?${effect}${TRAIL}` },
    { name: "CLAIM-E equal, then external effect", source: `${LEAD}${equal}${fill(CLAIM_WORDS.linking)}${SEP}${external}${SEP}${effect}${TRAIL}` },
    { name: "CLAIM-E external effect, then equal", source: `${LEAD}${external}${SEP}${effect}${fill(CLAIM_WORDS.afterEffect)}${SEP}(?:${equal}|${redo})${TRAIL}` },
    { name: "CLAIM-R reexecution, then equal", source: `${LEAD}${reexecution}${fill(CLAIM_WORDS.afterEffect)}${SEP}${equal}${TRAIL}` },
    { name: "CLAIM-R equal, then reexecution", source: `${LEAD}${equal}${fill(CLAIM_WORDS.linking)}${SEP}${reexecution}${TRAIL}` },
  ].map(({ name, source }) => ({ name, pattern: new RegExp(source, "gi") }));
})();
/** The guarded claims a text spells: each pattern's name, once per match. */
function claimsIn(text: string): string[] {
  return CLAIMS.flatMap(({ name, pattern }) => [...text.matchAll(pattern)].map(() => name));
}
/** Words joined at runtime, so a composed claim never sits on one source line. */
function compose(...words: string[]): string {
  return words.join(" ");
}

const fold = (word: string): string => word.toLowerCase().replace(/[_-]/g, "");
const FOLDED_VOCABULARY = REPLAY_VOCABULARY.map(fold);
/** The vocabulary words a text spells as tokens (or inside longer identifiers), folded and sorted. */
function vocabularyIn(text: string): string[] {
  const found = new Set<string>();
  for (const token of text.match(/[A-Za-z][A-Za-z0-9_-]*/g) ?? []) {
    const folded = fold(token);
    for (const word of FOLDED_VOCABULARY) if (folded.includes(word)) found.add(word);
  }
  return [...found].sort();
}

const EQUALITY = /\b(?:equal|equals|equality|match|matches|matched|identical|same)\b/i;
const RF_MENTION = /\brf\b|reactive.?fiber|context[\s._-]+replay/i;
/** A text's units: its lines, table cells and sentences. */
function unitsOf(text: string): string[] {
  return text.split(/\n|\||(?<=[.;!?])\s+/).map(unit => unit.trim()).filter(unit => unit.length > 0);
}
/** A unit that couples an rf replay with digest equality. */
function isReplayDigestStatement(unit: string): boolean {
  return /replay/i.test(unit) && /digest/i.test(unit) && EQUALITY.test(unit) && RF_MENTION.test(unit);
}
/** What a replay digest-equality statement owes acceptance (c): the field by name, canonical committed bytes, no guarded claim. */
function statementViolations(unit: string): string[] {
  const violations: string[] = [];
  if (!unit.includes("final_document_digest")) violations.push("name");
  if (!/canonical committed bytes/i.test(unit)) violations.push("bytes");
  if (claimsIn(unit).length > 0) violations.push("claim");
  return violations;
}

/** R-PARAPHRASE's pinned members (Q4): each a reworded spelling of a guarded claim the matcher does not catch, beside the plain
 * spelling it rewords, which the matcher does catch. Words only, joined by compose at runtime, so no source line spells either.
 * The first two are the pfxo.5 cut's own members; the other eleven are the pfxo.5 gate's escaping corpus (F1 (i), less its copula
 * form, which B3 now catches). */
const PARAPHRASES: readonly { readonly member: string; readonly variant: readonly string[]; readonly plain: readonly string[] }[] = [
  { member: "synonym: happened again", variant: ["the", "side", "effects", "happened", "again"], plain: ["effects", "reproduced"] },
  { member: "synonym: ran a second time", variant: ["every", "effect", "ran", "a", "second", "time"], plain: ["every", "effect", "re-executed"] },
  { member: "inflection: equals", variant: ["re-execution", "equals"], plain: ["re-execution", "equal"] },
  { member: "inflection: plural", variant: ["re-executions", "equal"], plain: ["re-execution", "equal"] },
  { member: "linking: under", variant: ["equal", "under", "re-execution"], plain: ["equal", "to", "re-execution"] },
  { member: "linking: on", variant: ["equality", "on", "re-execution"], plain: ["equality", "of", "re-execution"] },
  { member: "auxiliary: have been", variant: ["effects", "have", "been", "reproduced"], plain: ["effects", "been", "reproduced"] },
  { member: "auxiliary: being", variant: ["effects", "being", "reproduced"], plain: ["effects", "are", "reproduced"] },
  { member: "inflection: reproduce", variant: ["effects", "reproduce"], plain: ["effects", "reproduced"] },
  { member: "inflection: reproducing", variant: ["reproducing", "the", "effects"], plain: ["reproduced", "the", "effects"] },
  { member: "synonym: match", variant: ["the", "external", "effects", "match"], plain: ["the", "external", "effects", "equal"] },
  { member: "synonym: stay", variant: ["external", "effects", "stay", "identical"], plain: ["external", "effects", "are", "identical"] },
  { member: "linking: with", variant: ["equality", "with", "external", "effects"], plain: ["equality", "of", "external", "effects"] },
];

interface ReplayReading {
  readonly texts: readonly string[];
  readonly tone: "active" | "success" | "failure" | "waiting" | "unknown";
  readonly coverage: "complete" | "partial" | "unknown";
}
type ReplayReader = (document: JsonValue) => ReplayReading;
/** The armed half: each src module that reads an rf replay result, bound to a call of its reader on one roster document. A
 * reader's own cut adds its row here and meets B4, C4, D2 and E4; the table stays empty while no src module spells the
 * vocabulary (A1 holds both directions). */
const REPLAY_READERS: Readonly<Record<string, ReplayReader>> = {};

/** Acceptance (a) for one reader: no guarded claim, the denied count named beside the word denied, every denied id echoed. */
function effectsViolations(read: ReplayReader, envelope: Envelope): string[] {
  const reading = read(json(envelope));
  const denied = strings(resultOf(envelope).effects_denied, "effects_denied");
  const violations: string[] = [];
  if (reading.texts.some(text => claimsIn(text).length > 0)) violations.push("claim");
  if (!reading.texts.some(text => new RegExp(`(?<![0-9])${denied.length}(?![0-9])`).test(text) && /denied/i.test(text))) violations.push("count");
  if (!denied.every(id => reading.texts.some(text => text.includes(id)))) violations.push("ids");
  return violations;
}
const EQUAL_SUMMARY = /\b(?:equal|equality|identical|same|reproduced|matche[sd])\b/i;
/** Acceptance (b) for one reader: never a success tone, every diff member surfaced, the outcome verbatim, no equality summary. */
function mismatchViolations(read: ReplayReader, envelope: Envelope): string[] {
  const reading = read(json(envelope));
  const metadata = metadataOf(envelope);
  const members = diffMembers(objectOf(metadata.diff, "mismatch diff"));
  const violations: string[] = [];
  if (reading.tone === "success") violations.push("tone");
  if (!members.every(member => reading.texts.some(text => text.includes(member)))) violations.push("diff");
  if (!reading.texts.some(text => text.includes(String(metadata.outcome)))) violations.push("outcome");
  if (reading.texts.some(text => EQUAL_SUMMARY.test(text))) violations.push("equal");
  return violations;
}
/** Acceptance (c) for one reader: final_document_digest named with its value, canonical committed bytes, no guarded claim. */
function digestViolations(read: ReplayReader, envelope: Envelope): string[] {
  const reading = read(json(envelope));
  const digest = String(resultOf(envelope).final_document_digest);
  const violations: string[] = [];
  if (!reading.texts.some(text => text.includes("final_document_digest"))) violations.push("name");
  if (!reading.texts.some(text => text.includes(digest))) violations.push("value");
  if (!reading.texts.some(text => /canonical committed bytes/i.test(text))) violations.push("bytes");
  if (reading.texts.some(text => claimsIn(text).length > 0)) violations.push("claim");
  return violations;
}
/** Acceptance (d) for one reader: coverage partial, never a success tone, the status verbatim. */
function incompleteViolations(read: ReplayReader, fragment: JsonObject): string[] {
  const reading = read(json(fragment));
  const violations: string[] = [];
  if (reading.coverage !== "partial") violations.push("coverage");
  if (reading.tone === "success") violations.push("tone");
  if (!reading.texts.some(text => text.includes(String(fragment.status)))) violations.push("status");
  return violations;
}
/** Every bound reader's violations under one checker, keyed by module. */
function boundViolations(check: (read: ReplayReader) => string[]): JsonObject {
  return Object.fromEntries(Object.entries(REPLAY_READERS).map(([module, read]) => [module, check(read)]));
}
function synthetic(texts: readonly string[], tone: ReplayReading["tone"], coverage: ReplayReading["coverage"]): ReplayReader {
  return () => ({ texts, tone, coverage });
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
let fetches = 0;
afterEach(() => {
  process.env.PATH = oldPath;
  vi.unstubAllGlobals();
  removeScratch(...scratches.splice(0));
});

/** The counting fake network port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake network port answers no call"));
  });
}

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-replay-outcome-echo-");
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

function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}

/** One registry invocation of the NATIVE preview against the stand-in rf: its refusal, reading and spawns. */
async function nativeOutcome(answer: JsonValue, exit: number): Promise<JsonValue> {
  countFetches();
  const log = standInRf(answer, exit);
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
  expect(refusal, "the native preview never reads a replay envelope").not.toBeNull();
  expect(reading).toBeNull();
  expect(spawns).toHaveLength(1);
  expect(fetches).toBe(0);
  // The verb a spawn ran: the two argv words after `--workspace <root>`.
  return { ...refusal, reading: reading !== null, spawns: spawns.length, verb: (spawns[0] ?? []).slice(2, 4), fetches };
}

/** A registered reading of `envelope` through the injected seam: the reader answers a fresh copy, and the reading's source must
 * serialize to the bytes taken before the invocation, so neither an added key nor an in-place edit can pass. */
async function verbatimReading(envelope: Envelope): Promise<{ source: JsonObject; calls: number }> {
  const before = JSON.stringify(envelope);
  countFetches();
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelopeOf(JSON.parse(before), "the reader's fresh copy");
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: JSON.parse(before) });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  expect(JSON.stringify(source)).toBe(before);
  expect(JSON.stringify(envelope), "the roster copy is untouched").toBe(before);
  expect(calls).toBe(1);
  expect(fetches).toBe(0);
  return { source, calls };
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
function adapterRefusal(source: JsonValue): { category: string; message: string } {
  let caught: unknown;
  try {
    reactivefiberTopology(readingOf(source), OBSERVER_CONTEXT);
  } catch (error) {
    caught = error;
  }
  expect(caught, "the reader adapter refuses a replay document").toBeInstanceOf(CapabilityError);
  return refusalOf(caught);
}
/** The constructed render-command form of a replay refusal: the producer's diagnostics on a context.render failure envelope,
 * its workspace id kept under the reading root. */
function renderRefusal(envelope: Envelope): JsonObject {
  return {
    schema: envelope.schema, ok: false, command: "context.render", operation_id: envelope.operation_id,
    workspace: { id: envelope.workspace.id, root: ROOT }, transaction_id: null, result: null, diagnostics: envelope.diagnostics,
  };
}
/** The adapter's projection of a render-command refusal: the snapshot's display fields and every string it surfaces. */
function projectionOf(envelope: Envelope): { statusTone: string | null; coverage: string | null; statusText: string; shown: string[] } {
  const topology = reactivefiberTopology(readingOf(renderRefusal(envelope)), OBSERVER_CONTEXT);
  expect(topology.snapshots).toHaveLength(1);
  const snapshot = topology.snapshots[0];
  return {
    statusTone: snapshot?.node.statusTone ?? null, coverage: snapshot?.coverage ?? null, statusText: snapshot?.node.statusText ?? "",
    shown: stringLeaves(json(topology)),
  };
}

let nativeTexts: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** Every registered native descriptor, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeTexts ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeTexts;
}

/** One registration as vitest records it at collection: a describe or a case, its name and its run mode. */
interface Registration {
  readonly name: string;
  readonly mode: string;
}
/** wb-w1kd (the wb-hmre gate's F2): the collector of the describe factory that passes it, read on the spot in that factory's own
 * synchronous code; any registration it holds - the describe itself, a case or a nested describe - outside run mode fails the
 * file at collection. vitest applies a name filter only after collection, so a filtered run reads every registration in run mode.
 * The last case holds this read to its own controls. */
function refuseUnrunRegistrations(collector: Registration & { readonly tasks: readonly Registration[] }): void {
  const unrun = [collector, ...collector.tasks].filter(entry => entry.mode !== "run").map(entry => `${entry.name} (${entry.mode})`);
  if (unrun.length > 0) throw new Error(`registered outside run mode, so the census would not judge it: ${unrun.join(", ")}`);
}

/** The pins that reached their witness compare, in run order; the last case holds it to every pin. */
const REACHED: string[] = [];
/** The last case's run record (wb-hmre, the pfxo.5 gate's F2): set when it finishes or fails; the file-level afterAll reads it. */
const JUDGE = { failed: false, finished: false };

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const scan = SURFACE_ROOTS[0];
    if (scan === undefined) throw new Error("no src root");
    const { files, floorMet, anchorRead, anchorTracked, unwalked } = walkRoot(scan);
    const modules = files.filter(file => file.endsWith(".ts"));
    // wb-hmre (the pfxo.5 gate's X14): the module set A1 reads is bound to the git index, not only the walk's floor.
    const read = new Set(modules.map(file => relative(REPO, file)));
    const trackedModules = trackedFiles(":(glob)src/**/*.ts");
    const moduleAnchor = read.has(scan.anchorFile);
    const moduleTracked = trackedModules.includes(scan.anchorFile);
    const unreadModules = trackedModules.filter(path => !read.has(path));
    expect({ moduleAnchor, moduleTracked, unreadModules }, "A1 reads every src .ts module the git index tracks").toStrictEqual({ moduleAnchor: true, moduleTracked: true, unreadModules: [] });
    const spelling = modules.map(file => ({ module: relative(REPO, file), words: vocabularyIn(textOf(file)) })).filter(entry => entry.words.length > 0);
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((_, index) => vocabularyIn(texts[index] ?? "").length > 0);
    const bound = Object.keys(REPLAY_READERS).sort();
    const unbound = spelling.map(entry => entry.module).filter(module => !bound.includes(module));
    const stale = bound.filter(module => !spelling.some(entry => entry.module === module));
    expect(ids.length, "native descriptors registered").toBeGreaterThan(0);
    expect({ spelling, descriptorHits, unbound, stale }, "a replay reader binds itself in REPLAY_READERS").toStrictEqual({ spelling: [], descriptorHits: [], unbound: [], stale: [] });
    const controls = {
      snake: vocabularyIn("const denied = result.effects_denied;"),
      camel: vocabularyIn("const { finalDocumentDigest } = replay;"),
      constant: vocabularyIn('if (code === "RF_REPLAY_MISMATCH") return;'),
      kebab: vocabularyIn('const key = "deterministic-mismatch";'),
      element: vocabularyIn('const equal = result["verdicts_equal"];'),
      embedded: vocabularyIn("const effectsDeniedCount = 2;"),
      unrelated: vocabularyIn("const outcome = result.status;"),
    };
    return {
      srcFloorMet: floorMet, anchorRead, srcAnchorTracked: anchorTracked, srcUnwalked: unwalked, moduleAnchor, moduleTracked, unreadModules,
      descriptorsRead: ids.length > 0, spelling, descriptorHits, bound, unbound, stale, controls,
    };
  },
  A2: async () => {
    const outcomes: JsonObject = {};
    for (const { name, envelope, exit } of WIRE) outcomes[name] = await nativeOutcome(json(envelope), exit);
    return outcomes;
  },
  A3: async () => {
    const refusals: JsonObject = {};
    for (const { name, envelope } of WIRE) refusals[name] = adapterRefusal(json(envelope));
    refusals.incomplete = adapterRefusal(json(INCOMPLETE));
    return refusals;
  },
  B1: async () => {
    const denied = resultOf(DENIED_EFFECTS);
    const measured = resultOf(MEASURED);
    const variance = resultOf(VARIANCE);
    const effectsDenied = strings(denied.effects_denied, "deniedEffects effects_denied");
    expect(DENIED_EFFECTS.ok && DENIED_EFFECTS.command === REPLAY_COMMAND).toBe(true);
    expect(denied.outcome).toBe(OUTCOMES[0]);
    expect(effectsDenied.length, "acceptance (a) needs a non-empty effects_denied").toBeGreaterThan(0);
    expect(measured.outcome).toBe(OUTCOMES[0]);
    expect(String(measured.final_document_digest)).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(variance.outcome).toBe(OUTCOMES[1]);
    expect(primaryOf(VARIANCE).code).toBe(CODES.effectDenied);
    return {
      deniedEffects: { outcome: denied.outcome ?? null, effectsDenied, count: effectsDenied.length, effectPolicy: denied.effect_policy ?? null, digestStated: Object.hasOwn(denied, "final_document_digest") },
      measured: { outcome: measured.outcome ?? null, count: strings(measured.effects_denied, "measured effects_denied").length, digestStated: Object.hasOwn(measured, "final_document_digest") },
      variance: { outcome: variance.outcome ?? null, count: strings(variance.effects_denied, "variance effects_denied").length, warning: primaryOf(VARIANCE).code ?? null, severity: primaryOf(VARIANCE).severity ?? null },
    };
  },
  B2: async () => {
    const carried: JsonObject = {};
    for (const { name, envelope } of WIRE.filter(entry => entry.exit === 0)) {
      const { source, calls } = await verbatimReading(envelope);
      const result = objectOf(source.result, `${name} reading result`);
      const echoed = ECHO_KEYS.filter(key => Object.hasOwn(result, key));
      carried[name] = { echoed, outcome: result.outcome ?? null, effectsDenied: result.effects_denied ?? null, finalDocumentDigest: result.final_document_digest ?? null, calls, fetches };
    }
    return carried;
  },
  B3: async () => {
    const roots: JsonValue[] = [];
    for (const scan of SURFACE_ROOTS) {
      const { files, floorMet, anchorRead, anchorTracked, unwalked } = walkRoot(scan);
      const hits = files.flatMap(file => claimsIn(textOf(file)).map(name => `${relative(REPO, file)}: ${name}`));
      expect(hits, `guarded claims spelled under ${scan.root}`).toEqual([]);
      roots.push({ root: scan.root, floor: scan.floor, floorMet, anchorRead, anchorTracked, unwalked, hits });
    }
    const spellings = {
      effectThenRedo: claimsIn(compose("effects", "reproduced")),
      effectWereRedo: claimsIn(compose("effects", "were", "re-executed")),
      redoThenEffect: claimsIn(compose("reproduced", "the", "external-world", "effects")),
      equalThenExternal: claimsIn(compose("equality", "of", "external-world", "effects")),
      externalThenEqual: claimsIn(compose("external", "effects", "are", "identical")),
      reexecutionThenEqual: claimsIn(compose("re-execution", "equality")),
      equalThenReexecution: claimsIn(compose("identical", "re-execution")),
      // wb-hmre (the pfxo.5 gate's G09 and its corpus): the copula form of <CLAIM-R>, caught like the copula fill of the effect arms.
      copulaIsIdentical: claimsIn(compose("re-execution", "is", "identical")),
      copulaIsEqual: claimsIn(compose("re-execution", "is", "equal")),
      copulaWasEqual: claimsIn(compose("re-execution", "was", "equal")),
      copulaSentence: claimsIn(compose("The", "rf", "replay", "proves", "re-execution", "is", "identical.")),
      // wb-w1kd (the wb-hmre gate's F1 GE1, GE2, GE4-GE7 and GE10, markup and punctuation inside a claim; its F7 GE9 and the pfxo.5
      // gate's G15, a hyphen homoglyph inside the re-execution word): each read through the separator class and both edges.
      boldEmphasis: claimsIn(compose("re-execution", "is", "**identical**")),
      codeSpan: claimsIn(compose("`re-execution`", "is", "identical")),
      parenthesized: claimsIn(compose("re-execution", "(identical)")),
      emDash: claimsIn(["re-execution", "identical"].join(String.fromCodePoint(0x2014))),
      underscoreEmphasis: claimsIn(compose("_re-execution_", "is", "_identical_")),
      doubleQuoted: claimsIn(compose("re-execution", "is", '"identical"')),
      starEmphasisEffects: claimsIn(compose("the", "effects", "were", "*reproduced*")),
      hyphenHomoglyphs: [0x2010, 0x2011].map(code => claimsIn(compose(["re", "execution"].join(String.fromCodePoint(code)), "equality"))),
      everySeparator: Object.fromEntries(SEPARATOR_CHARS.map(char => [codePoint(char), claimsIn(["re-execution", "identical"].join(` ${char} `))])),
      letterEdgeQuiet: claimsIn(compose("pre-execution", "is", "identical")),
      snakeJoined: claimsIn(["effects", "reproduced"].join("_")),
      echoQuiet: claimsIn("outcome reproduced; effects_denied 2"),
      workflowQuiet: claimsIn("a replayed effect; re-run the effect after all"),
    };
    return { roots, spellings };
  },
  B4: async () => {
    const ids = strings(resultOf(DENIED_EFFECTS).effects_denied, "effects_denied");
    const echo = `outcome reproduced; effects_denied ${ids.length} denied: ${ids.join(", ")}`;
    return {
      bound: boundViolations(read => effectsViolations(read, DENIED_EFFECTS)),
      synthetic: {
        good: effectsViolations(synthetic([echo], "unknown", "partial"), DENIED_EFFECTS),
        claim: effectsViolations(synthetic([echo, compose("effects", "reproduced")], "unknown", "partial"), DENIED_EFFECTS),
        count: effectsViolations(synthetic([`outcome reproduced; effects_denied: ${ids.join(", ")}`], "unknown", "partial"), DENIED_EFFECTS),
        ids: effectsViolations(synthetic([`outcome reproduced; ${ids.length} effects denied`], "unknown", "partial"), DENIED_EFFECTS),
      },
    };
  },
  C1: async () => {
    const primary = primaryOf(MISMATCH);
    const metadata = metadataOf(MISMATCH);
    const diff = objectOf(metadata.diff, "mismatch diff");
    expect(MISMATCH.ok === false && MISMATCH.result === null && MISMATCH.command === REPLAY_COMMAND).toBe(true);
    expect(primary.code).toBe(CODES.mismatch);
    expect(metadata.outcome).toBe(OUTCOMES[2]);
    expect(diffMembers(diff).length, "a deterministic_mismatch carries a non-empty diff").toBeGreaterThan(0);
    expect(metadata.recorded_digest).not.toBe(metadata.replayed_digest);
    return {
      code: primary.code ?? null, severity: primary.severity ?? null, exit: EXITS.mismatch, result: MISMATCH.result, metadataKeys: Object.keys(metadata),
      outcome: metadata.outcome ?? null, members: diffMembers(diff), digestsDiffer: metadata.recorded_digest !== metadata.replayed_digest,
    };
  },
  C2: async () => {
    const { source, calls } = await verbatimReading(MISMATCH);
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    const metadata = objectOf(primary.metadata, "reading metadata");
    expect(metadata).toStrictEqual(metadataOf(MISMATCH));
    return { code: primary.code ?? null, outcome: metadata.outcome ?? null, diff: metadata.diff ?? null, calls, fetches };
  },
  C3: async () => {
    const wire = await nativeOutcome(json(MISMATCH), EXITS.mismatch);
    const renderForm = await nativeOutcome(renderRefusal(MISMATCH), EXITS.mismatch);
    const projection = projectionOf(MISMATCH);
    expect(isObject(renderForm) ? renderForm.message : null).toBe(`RF render refused: ${CODES.mismatch}`);
    expect(projection.statusTone).toBe("failure");
    expect(projection.statusText).toContain(CODES.mismatch);
    return { wire, renderForm, statusTone: projection.statusTone, coverage: projection.coverage, statusText: projection.statusText };
  },
  C4: async () => {
    const members = diffMembers(objectOf(metadataOf(MISMATCH).diff, "mismatch diff"));
    const echo = `deterministic_mismatch (${CODES.mismatch}): diff ${members.join(", ")}`;
    return {
      bound: boundViolations(read => mismatchViolations(read, MISMATCH)),
      synthetic: {
        good: mismatchViolations(synthetic([echo], "failure", "unknown"), MISMATCH),
        tone: mismatchViolations(synthetic([echo], "success", "unknown"), MISMATCH),
        diff: mismatchViolations(synthetic([`deterministic_mismatch (${CODES.mismatch})`], "failure", "unknown"), MISMATCH),
        outcome: mismatchViolations(synthetic([`mismatch: diff ${members.join(", ")}`], "failure", "unknown"), MISMATCH),
        equal: mismatchViolations(synthetic([echo, "replay equal"], "failure", "unknown"), MISMATCH),
      },
    };
  },
  D1: async () => {
    const roots: JsonValue[] = [];
    for (const scan of SURFACE_ROOTS) {
      const { files, floorMet, anchorRead, anchorTracked, unwalked } = walkRoot(scan);
      const statements = files.flatMap(file => unitsOf(textOf(file)).filter(isReplayDigestStatement).map(unit => ({ file: relative(REPO, file), unit })));
      const violations = statements.map(entry => ({ ...entry, violations: statementViolations(entry.unit) })).filter(entry => entry.violations.length > 0);
      expect(violations, `replay digest-equality statements under ${scan.root} owe acceptance (c)`).toEqual([]);
      roots.push({ root: scan.root, floorMet, anchorRead, anchorTracked, unwalked, statements: statements.length, violations });
    }
    const judge = (unit: string): JsonValue => (isReplayDigestStatement(unit) ? statementViolations(unit) : null);
    const controls = {
      compliant: judge("rf context replay: a final_document_digest match proves equal canonical committed bytes"),
      noName: judge("rf context replay: a digest match proves equal canonical committed bytes"),
      noBytes: judge("rf context replay: the final_document_digest values are equal"),
      reexecution: judge(`rf replay: final_document_digest equality, canonical committed bytes and ${compose("re-execution", "equality")}`),
      effects: judge(`rf replay: final_document_digest equality, canonical committed bytes and ${compose("equality", "of", "external-world", "effects")}`),
      notStatement: judge("the journal replay records a digest"),
    };
    return { roots, controls };
  },
  D2: async () => {
    const digest = String(resultOf(MEASURED).final_document_digest);
    const echo = `final_document_digest ${digest}: equality of canonical committed bytes only`;
    return {
      bound: boundViolations(read => digestViolations(read, MEASURED)),
      digest,
      synthetic: {
        good: digestViolations(synthetic([echo], "unknown", "partial"), MEASURED),
        name: digestViolations(synthetic([`digest ${digest}: canonical committed bytes`], "unknown", "partial"), MEASURED),
        value: digestViolations(synthetic(["final_document_digest: canonical committed bytes"], "unknown", "partial"), MEASURED),
        bytes: digestViolations(synthetic([`final_document_digest ${digest}`], "unknown", "partial"), MEASURED),
        reexecution: digestViolations(synthetic([echo, compose("re-execution", "equality")], "unknown", "partial"), MEASURED),
        effects: digestViolations(synthetic([echo, compose("equality", "of", "external-world", "effects")], "unknown", "partial"), MEASURED),
      },
    };
  },
  E1: async () => {
    const trustOutcomes = Array.isArray(INCOMPLETE.trust_outcomes) ? INCOMPLETE.trust_outcomes.map(entry => objectOf(entry, "trust_outcomes[]")) : [];
    const decisions = Array.isArray(INCOMPLETE.trust_decisions) ? INCOMPLETE.trust_decisions.map(entry => objectOf(entry, "trust_decisions[]")) : [];
    const reasons = strings(objectOf(INCOMPLETE.replayability, "replayability").reasons, "replayability.reasons");
    const rule = {
      deniedOutcome: trustOutcomes.some(entry => entry.outcome === "denied"),
      status: INCOMPLETE.status ?? null,
      outcome: INCOMPLETE.outcome ?? null,
      trustDeniedReason: reasons.includes("trust_denied"),
      deniedDecision: decisions.some(entry => entry.decision === "denied"),
    };
    expect(rule).toStrictEqual({ deniedOutcome: true, status: STATUSES[0], outcome: OUTCOMES[3], trustDeniedReason: true, deniedDecision: true });
    const primary = primaryOf(TRUST_DENIED);
    expect(TRUST_DENIED.ok === false && TRUST_DENIED.result === null && TRUST_DENIED.command === REPLAY_COMMAND).toBe(true);
    expect(primary.code).toBe(CODES.trustDenied);
    return { fragment: rule, wire: { code: primary.code ?? null, exit: EXITS.trustDenied, result: TRUST_DENIED.result, metadataKeys: Object.keys(metadataOf(TRUST_DENIED)) } };
  },
  E2: async () => {
    const { source, calls } = await verbatimReading(TRUST_DENIED);
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    expect(primary).toStrictEqual(primaryOf(TRUST_DENIED));
    return { code: primary.code ?? null, metadata: primary.metadata ?? null, calls, fetches };
  },
  E3: async () => {
    const wire = await nativeOutcome(json(TRUST_DENIED), EXITS.trustDenied);
    const renderForm = await nativeOutcome(renderRefusal(TRUST_DENIED), EXITS.trustDenied);
    const projection = projectionOf(TRUST_DENIED);
    expect(isObject(renderForm) ? renderForm.message : null).toBe(`RF render refused: ${CODES.trustDenied}`);
    expect(projection.statusTone).not.toBe("success");
    expect(projection.coverage).not.toBe("complete");
    return { wire, renderForm, statusTone: projection.statusTone, coverage: projection.coverage, statusText: projection.statusText };
  },
  E4: async () => {
    const echo = `status incomplete; outcome not_replayable`;
    return {
      bound: boundViolations(read => incompleteViolations(read, INCOMPLETE)),
      synthetic: {
        good: incompleteViolations(synthetic([echo], "unknown", "partial"), INCOMPLETE),
        complete: incompleteViolations(synthetic([echo], "unknown", "complete"), INCOMPLETE),
        success: incompleteViolations(synthetic([echo], "success", "partial"), INCOMPLETE),
        status: incompleteViolations(synthetic(["status partial; outcome not_replayable"], "unknown", "partial"), INCOMPLETE),
      },
    };
  },
  Q1: async () => {
    const projection = projectionOf(MISMATCH);
    const metadata = metadataOf(MISMATCH);
    const withheld = [...diffMembers(objectOf(metadata.diff, "mismatch diff")), String(metadata.recorded_digest), String(metadata.replayed_digest)];
    const surfaced = projection.shown.filter(text => withheld.some(value => text.includes(value)));
    const native = await nativeOutcome(renderRefusal(MISMATCH), EXITS.mismatch);
    const nativeMessage = String(isObject(native) ? native.message : "");
    const nativeSurfaced = withheld.filter(value => nativeMessage.includes(value));
    expect({ codeNamed: nativeMessage.includes(CODES.mismatch), surfaced, nativeSurfaced }).toStrictEqual({ codeNamed: true, surfaced: [], nativeSurfaced: [] });
    return { withheld: withheld.length, codeNamed: nativeMessage.includes(CODES.mismatch), surfaced, nativeSurfaced };
  },
  Q2: async () => {
    const projection = projectionOf(TRUST_DENIED);
    expect({ coverage: projection.coverage, statusTone: projection.statusTone }).toStrictEqual({ coverage: "unknown", statusTone: "failure" });
    return { coverage: projection.coverage, statusTone: projection.statusTone };
  },
  Q3: async () => {
    const generic = vocabularyIn("const { outcome, status, diff } = envelope.result;");
    const composed = vocabularyIn('const key = ["effects", "denied"].join("_");');
    expect({ generic, composed }).toStrictEqual({ generic: [], composed: [] });
    return { generic, composed };
  },
  Q4: async () => {
    // wb-w1kd (the wb-hmre gate's F3: a plain swapped for another spelling that meets the same arm stayed green): each plain
    // spelling is pinned word for word beside the arm it meets.
    const members = PARAPHRASES.map(({ member, variant, plain }) => ({ member, variant: compose(...variant), caught: claimsIn(compose(...variant)), plainWords: [...plain], plain: claimsIn(compose(...plain)) }));
    const digestReworded = isReplayDigestStatement("rf context replay: the digests agree, so the document is faithful");
    const caughtMembers = members.filter(entry => entry.caught.length > 0).map(entry => entry.member);
    const plainEscapes = members.filter(entry => entry.plain.length === 0).map(entry => entry.member);
    expect({ caughtMembers, plainEscapes, digestReworded }).toStrictEqual({ caughtMembers: [], plainEscapes: [], digestReworded: false });
    return { members, digestReworded };
  },
  Q5: async () => {
    const zeroWidth = claimsIn(["effects", "reproduced"].join(String.fromCodePoint(0x200b)));
    const homoglyph = claimsIn(compose(`${String.fromCodePoint(0x0435)}ffects`, "reproduced"));
    // wb-w1kd (the wb-hmre gate's F1 GE3, and the marks the separator class leaves out): a comma, a semicolon, Unicode punctuation
    // outside the class (an ellipsis) and markup that carries a letter (an HTML tag, a markdown link target), each splitting a
    // claim whose plain spelling the matcher catches. The pfxo.5 gate's G15 dash homoglyph is a separator now (B3).
    const comma = claimsIn(["re-execution", "identical"].join(", "));
    const semicolon = claimsIn(["re-execution", "identical"].join("; "));
    const ellipsis = claimsIn(["re-execution", "identical"].join(` ${String.fromCodePoint(0x2026)} `));
    const htmlTag = claimsIn(compose("re-execution</em>", "is", "<em>identical"));
    const linkTarget = claimsIn(compose("[re-execution](#replay)", "is", "identical"));
    const plain = claimsIn(compose("effects", "reproduced"));
    const plainDash = claimsIn(compose(["re", "execution"].join("-"), "equality"));
    const judged = { zeroWidth, homoglyph, comma, semicolon, ellipsis, htmlTag, linkTarget, plainCaught: plain.length > 0, plainDashCaught: plainDash.length > 0 };
    expect(judged).toStrictEqual({ zeroWidth: [], homoglyph: [], comma: [], semicolon: [], ellipsis: [], htmlTag: [], linkTarget: [], plainCaught: true, plainDashCaught: true });
    return judged;
  },
  Q6: async () => {
    const beads = filesBelow(join(REPO, ".beads")).filter(file => file.endsWith(".jsonl"));
    const beadsSpells = beads.some(file => claimsIn(textOf(file)).length > 0);
    const rootsRead = SURFACE_ROOTS.map(scan => scan.root);
    const unread = ["test", ".beads"].filter(root => !rootsRead.some(name => name === root));
    expect(beadsSpells, "the bead-store export spells the guarded claims while no scanned root reads it").toBe(true);
    return { beadsSpells, rootsRead, unread };
  },
  Q7: async () => {
    const fileHits = claimsIn(textOf(THIS_FILE));
    const rosterHits = claimsIn(textOf(ROSTER_PATH));
    const composedCaught = claimsIn(compose("effects", "reproduced")).length > 0 && claimsIn(compose("re-execution", "equality")).length > 0;
    expect({ fileHits, rosterHits, composedCaught }).toStrictEqual({ fileHits: [], rosterHits: [], composedCaught: true });
    return { fileHits, rosterHits, composedCaught };
  },
  Q8: async () => {
    const outside = "A replay whose digest matches the recorded one is the same document.";
    const inside = `rf context replay: ${outside}`;
    const judged = { outside: isReplayDigestStatement(outside), inside: isReplayDigestStatement(inside) };
    expect(judged).toStrictEqual({ outside: false, inside: true });
    return judged;
  },
  Q9: async () => {
    const camel = [...claimsIn("const effectsReproduced = true;"), ...claimsIn("reexecutionEquality")];
    const separated = claimsIn(`const ${["effects", "reproduced"].join("_")} = true;`).length > 0;
    expect({ camel, separated }).toStrictEqual({ camel: [], separated: true });
    return { camel, separated };
  },
};

describe("wb-pfxo.5 rf replay outcome echo census (RF-COMPOSITIONAL-ASSEMBLY-R6)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:4", "C:4", "D:2", "E:4", "Q:9"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      outcomes: OUTCOMES, statuses: STATUSES, echoKeys: ECHO_KEYS, codes: CODES, exits: EXITS, vocabulary: REPLAY_VOCABULARY, claimWords: CLAIM_WORDS,
      separators: SEPARATORS, residuals: RESIDUALS,
    }).toStrictEqual({
      outcomes: [...ROSTER.outcomes], statuses: [...ROSTER.statuses], echoKeys: [...ROSTER.echoKeys], codes: ROSTER.codes, exits: ROSTER.exits,
      vocabulary: [...ROSTER.vocabulary], claimWords: ROSTER.claimWords, separators: ROSTER.separators, residuals: ROSTER.residuals,
    });
    for (const members of Object.values(RESIDUALS)) for (const member of members) expect(ROWS.flatMap(row => row.pins), `${member} is a judged pin`).toContain(member);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(pin);
        });
      }
      refuseUnrunRegistrations(TestRunner.getCurrentSuite());
    });
  }

  it("the registered tests and the reached pins equal the roster, in order and both ways", ({ task, onTestFailed }) => {
    onTestFailed(() => {
      JUDGE.failed = true;
    });
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
    // wb-w1kd: the registration read's own controls - a synthetic describe or case outside run mode is refused by name and mode,
    // and one wholly in run mode is not, so a read emptied or inverted reds here.
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [{ name: "control case", mode: "skip" }] })).toThrow("control case (skip)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "todo", tasks: [] })).toThrow("control describe (todo)");
    expect(() => refuseUnrunRegistrations({ name: "control describe", mode: "run", tasks: [{ name: "control case", mode: "run" }] })).not.toThrow();
    expect(REACHED, "every pin reached its witness compare, in row order").toEqual(ROWS.flatMap(row => row.pins));
    JUDGE.finished = true;
  });
  refuseUnrunRegistrations(TestRunner.getCurrentSuite());
});

// wb-hmre (the pfxo.5 gate's F2: S8, a plain skip modifier, and S11, a conditional one, on the last case left rc 0): a skip
// modifier, a todo, an early return or a deleted last case leaves its run record unfinished; when every pin reached its witness
// (an unfiltered run), that reds the file here, outside the case.
afterAll(() => {
  const reached = ROWS.flatMap(row => row.pins).every(pin => REACHED.includes(pin));
  if (reached && !JUDGE.finished && !JUDGE.failed) {
    throw new Error("the registration judge did not run to its end while every pin reached its witness: it is skipped, emptied or gone");
  }
});
