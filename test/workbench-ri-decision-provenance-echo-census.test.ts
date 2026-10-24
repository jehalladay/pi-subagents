/**
 * wb-tz4r.3 (RI-UNIFIED-DECISION-INFERENCE-R3, program-triage-2026-10-22), the absent-today leg with the adoption contract armed.
 * Statement (the owner filing's title): "If Pi ever echoes a native decision result (gated: RI native decision envelope carrying
 * endpoint/model revision, sampling policy and native evidence, RI-DEC-06/08; unshipped at 485f3615db1e), Pi shall carry the
 * producer's endpoint/model revision, sampling policy and native evidence verbatim where present and shall synthesize none of them
 * when absent (absent stays absent)", pinned to the program's 01-contracts.md:14 ("Preserve endpoint/model revision, sampling
 * policy and complete native evidence where available."). The acceptance is the filing's, verbatim: the labels of rows B-D; the
 * trigger sentence ("Pi carries no decision envelope today (census 0)") is row A's.
 *
 * SIBLING DISCIPLINE. <NDB> and <GDF> stand for the two backend classes :14 names and <ENGINE> for the ReactiveInference module that
 * holds the typed decision contracts (src/reactive_inference/<ENGINE>/ at the pin). This file and its roster spell none of them, nor
 * RI's generative response type, joined in any case convention, and no state-word identifier, so the sibling censuses that walk
 * src/test/qa for those spellings (wb-tz4r.1 (a), wb-tz4r.2 D2, wb-tz4r.8 (c)) hold over both files.
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, read-only git show and git grep on the local ReactiveInferenceSDK checkout, no fetch):
 * at the pin 485f3615db1e and at origin/master 075ac589d64d (10 commits past the pin, its <ENGINE> files changed by refactors only)
 * no result envelope exists: the only backend identity is the preflight's deployment_id (ChoiceBackendCapabilities :17 and
 * ChoiceExecutionPlan :55 of preflight.py), and model_revision, sampling_policy and native_evidence occur in no src row at either
 * commit (git grep rc 1). RI-derived data reaches Pi only inside rf envelopes (the sdk_versions.reactive_inference version echo and
 * the budget's capability snapshot), carried by the reading and read by neither projection, so the trigger has not fired.
 * MEASURED AT THE INSTALLED rf (0.1.836 by `rf --json --version` result.version): one noncommitted preview in a scratch jsonl
 * workspace (one declarative component, one task source), rendered with the argv Pi's native reader spawns; the roster lists the
 * commands. THE CARRIER (the roster's envelope) keeps rf's printed JSON value, the scratch root rewritten to /fixture/rf-workspace. It
 * carries the producer identities a careless adopter could borrow for an absent field: budget.requested_model_id (the --model echo),
 * budget.resolved_model_id (null), budget.capability_snapshot.model_id and the RI version echo.
 * THE NATIVE RESULT is CONSTRUCTED (no build emits one at either commit): a producer tag, a schema version, a question id and the
 * four fields of :14 under names read off its words - endpoint, model_revision, sampling_policy (structured) and native_evidence
 * (structured, complete) - set at the three PLACEMENTS the queued wb-tz4r.1 cut constructs (an additive result key, a key on the
 * rendering component's row and one on the document block's row). Every field value is distinct and occurs nowhere in the carrier.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts: the native reader validates the
 * preview shape and stays open to additive keys; the injected seam validates nothing). Its two projections are the observer's
 * topology (reactivefiber-observer.ts: a fixed set of evidence refs and notes) and the native-evidence metadata (native-evidence.ts).
 * Neither reads a native result today, so the adoption contract is armed on a test-side REFERENCE ADOPTION (one evidence ref per
 * present field on the topology, one member per present field on the metadata, each verbatim) and THE JUDGE, which reads a
 * candidate projection by values and paths: every present field is carried verbatim by exactly one entry of its own (a member
 * whose value is the field, or a ref `<kind>:<field>`), no entry carries two fields, and once those entries are removed the rest is
 * byte-identical to today's projection of the carrier - so a default for an absent field reads changed whatever literal it holds.
 *  A, the trigger. A1 no package.json dependency and no src file (bytes, comments included) spells the RI module root in any
 *    spelling, and no src file spells a field of the native result as a reader writes it - model revision or sampling policy as
 *    one identifier (joined or with one underscore, dot or dash) or native_evidence (wb-3xmr F3: the wb-tz4r.3 gate's G13, a src
 *    module reading resources[0].model_revision behind a default and spelling no root, stayed green) - with a floor, an anchor
 *    and controls; A2 the rf roster stays the preview alone (native and injected registrations,
 *    RECONCILE_EVIDENCE_READS.reactivefiber), the only path an RI result could arrive by; A3 the gating envelope is measured
 *    unshipped: the roster's producer facts, the bead row's "Shipped: no" sentence and its gating artifacts.
 *  B, acceptance (a). B1 the adoption fixture; B2 both seams carry each placed variant byte for byte (one spawn of the --no-commit
 *    argv, one injected call); B3 the reference adoption over the fixture carries the four fields verbatim, one entry each, on both
 *    surfaces, and the judge finds nothing; B4 today's projections of each variant are byte-identical to today's projection of the
 *    carrier and read exactly the four missing findings - 0 entries until the gate opens, the gate-opening cue; B5 the landed
 *    producer-identity carrier this mirrors (wb-2j3.1): the measured cli_version travels verbatim as the rf-cli ref, one note and
 *    producerRelease.
 *  C, acceptance (b). C1 each absent-field fixture (each field absent alone, all four absent) rides both seams byte for byte, no
 *    key added, and today's projections are byte-identical to the carrier's; C2 the reference adoption over each carries the
 *    present fields only, the all-absent one byte-identical, judge quiet; C3 no carrier default substitutes: the carrier's model
 *    identities, Pi's own invocation model and the RI version echo reach neither surface for the carrier or any variant; C4 the
 *    wb-2j3.2 pattern: the carrier without cli_version projects with exactly the rf-cli ref, its note and producerRelease gone.
 *  D, acceptance (c). D1 the judge refuses the absent model revision defaulted to each probe literal and to every distinct
 *    primitive the carrier states, at the adoption's slot on both surfaces; D2 the absent sampling policy likewise, with every
 *    object the carrier states; D3 a default anywhere else and every verbatim rewrite or merge are refused; D4 the quiet controls
 *    and the residuals' quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (each pin with its quote),
 * every pin's witness, the constants, the carrier, the native result, the placements, the probes, the registered test titles and
 * each pin's assertion count are held to the out-of-file roster (test/fixtures/ri-decision-provenance-echo-roster.json). OUTSIDE
 * ANCHOR: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-tz4r.3): each acceptance clause is
 * exactly one row label, the trigger sits in row A's, and the quote pin, the quote and the gating artifacts are in its notes.
 * PIN ANCHOR (wb-3xmr F1): each row's pin quotes, in pin order, tile its owner text with separator-only gaps (the wb-if7q.2 and
 * wb-z3ft.2 form) - row A's the title's condition (after its tag, up to the parenthesis that closes before ", Pi shall"), rows
 * B-D's their clauses - so a pin removed from ROWS, the frozen literal, IMPL and the roster together leaves its part of the
 * owner's words untiled and the judged set reds (the wb-tz4r.3 gate's G1, D3 removed so, stayed 17/17 on the first cut); the
 * judged set also drops each quote in turn and finds its row untiled.
 * SELF-READ (wb-3xmr F2): the judged set parses this file's source (the TypeScript AST). Outside the describe block, whose cases
 * compare the witnesses: every IMPL case names one of READERS; rosterWitness, MEASURED and REACHED are named only where declared,
 * ROSTER_PATH only in readRoster and readRoster only for ROSTER; a roster pin's witness member is read only in readRoster and
 * rosterWitness; and ROSTER is read only through its subject members (its rows only in rosterWitness). So a case that hands back
 * its own roster witness through any of those names reds, whether directly (the wb-tz4r.3 gate's G3 and G3b, which kept their
 * pinned assertion counts and stayed 18/18), through a helper or after measuring; four planted cases pin each refusal. A case that
 * reaches it without naming them is R-UNMEASURED.
 * RECORDS: the last case walks this file's registered tests: each roster title once, in order, in run mode, not inverted, ran;
 * every pin's witness again, no two pins sharing one (so a case moved under another pin's id, its roster witness rewritten to
 * match, reds); every pin reached its end with its pinned assertion count.
 * NOT CLAIMED: the three placements, the probe lists and the reference adoption's kinds and member names are this fixture's
 * choices (no producer placement, default or slot exists), so a placement or probe removed from the roster and from every
 * witness together is anchored by nothing outside these two files; the four fields are anchored (the quote's words, clause (a)).
 * RESIDUALS (named families, each with a pinned quiet row: D4's for the first five, A1's for R-READ-SITE): R-COINCIDENT a
 * "default" that restates the value today's projection already holds at that path is no change and reads quiet; R-KIND the
 * judge binds a field to its value, never to a ref kind or member name (those are the adopter's to choose), so two fields filed
 * under each other's kinds read quiet; R-ORDER where an adopted entry sits among the refs is not pinned; R-REBIND a pin removed
 * from every literal while a neighbour's quote is widened over its part tiles the owner text again - the anchor reads that every
 * word has a pin, not which pin proves it (D4: D3 dropped and D4's quote widened over D3's part, clause (c) reads tiled);
 * R-UNMEASURED a case that names a reader yet hands back a value it did not measure - a literal standing in for its witness, or a
 * witness reached, in the case or a helper it calls, without naming its member (the roster file parsed afresh and read by
 * position, a member name composed at run time) - is beyond the SELF-READ (D4: a planted constant case naming BASE reads clean); R-READ-SITE a src reader that reaches a
 * native result only through spellings A1 does not read - the endpoint key (src spells the word for graph edges), the fields in
 * spaced prose, Pi's own native-evidence spellings, a computed key - and feeds neither projection is invisible to row A (A1: an
 * endpoint-only reader, prose naming the model revision and Pi's own nativeEvidence import read quiet).
 * SCOPE: the RI facts are read at their pins and Pi vendors no RI source, so a producer change is seen only when a re-probe re-reads
 * them; when RI ships the envelope (RI-DEC-06/08) and rf surfaces it, the adopter's projection replaces the reference adoption and
 * B4 reds by its findings alone, the cue to re-cut this census to the shipped shape. No reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src is only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
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
type Path = readonly (string | number)[];

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "ri-decision-provenance-echo-roster.json");
/** This file's own source text, read for the SELF-READ. */
const SELF_TEXT = readFileSync(fileURLToPath(import.meta.url), "utf8");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-tz4r.3";
const PROGRAM_TAG = "[RI-UNIFIED-DECISION-INFERENCE-R3]";
const TRIGGER = "Pi carries no decision envelope today (census 0)";
const QUOTE_PIN = "docs/programs/unified-decision-inference-2026-10-21/01-contracts.md:14@485f3615db1e";
const QUOTE = "Preserve endpoint/model revision, sampling policy and complete native evidence where available.";
const GATING_ARTIFACTS = ["RI-DEC-06", "RI-DEC-08"];
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
const FIXTURE_ROOT = "/fixture/rf-workspace";
/** Pi's own preview input: a model name no producer field states, so a surface that echoed it as a revision would show it. */
const INVOCATION = { model: "pi-invocation-model-9d2", task: "summarise the notes" };
/** The four fields of 01-contracts.md:14, in the sentence's order. */
const FIELDS = ["endpoint", "model_revision", "sampling_policy", "native_evidence"] as const;
type Field = (typeof FIELDS)[number];
/** The reference adoption's slots: one evidence-ref kind per field on the topology, one member per field on the metadata. */
const REF_KIND: Readonly<Record<Field, string>> = {
  endpoint: "ri-endpoint",
  model_revision: "ri-model-revision",
  sampling_policy: "ri-sampling-policy",
  native_evidence: "ri-native-evidence",
};
const MEMBER: Readonly<Record<Field, string>> = {
  endpoint: "riEndpoint",
  model_revision: "riModelRevision",
  sampling_policy: "riSamplingPolicy",
  native_evidence: "riNativeEvidence",
};
/** The RI module root in any spelling a consumer would write: joined, separated, or spaced. */
const RI_ROOT = /reactive[\s_.-]?inference/i;
/**
 * The native result's fields as a src reader would write them (wb-3xmr F3): model revision and sampling policy as one identifier,
 * joined or with one underscore, dot or dash (prose with a space is not read), and native evidence as native_evidence only (its
 * spaced, dashed and camel forms are Pi's own: native-evidence.ts and nativeEvidence()). endpoint is not read: src spells it for
 * graph edges (R-READ-SITE).
 */
const FIELD_SPELLINGS: readonly RegExp[] = [/model[_.-]?revision/i, /sampling[_.-]?policy/i, /native_evidence/i];
/** A bare ref kind: what may precede a verbatim field value in an evidence ref. */
const REF_PREFIX = /^[a-z][a-z0-9-]*:$/;
const SEAMS = ["rf-cli", "injected-fixture"] as const;
type Seam = (typeof SEAMS)[number];
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the bead export's acceptance clauses and the cases agree";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, and every pin reached its end with its pinned assertion count";

interface Pin {
  readonly id: string;
  /** The part of its row's owner text this pin proves: row A's the title's condition, rows B-D's their acceptance clauses. */
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

/**
 * The judged rows; their shape is pinned below and held to the roster and to the bead export. Each pin's quote is the part of its
 * row's owner text it proves; in pin order the quotes tile that text with separator-only gaps (the PIN ANCHOR). B5, the landed
 * wb-2j3.1 carrier, owns "when present" (C4 is its absent twin); D3 owns "to any literal", carrying the default to every other
 * slot and form; D4 owns "fails", since a refusal reads as one only beside the quiet twins D4 pins.
 */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: `(trigger, absent today) ${TRIGGER}: no package.json dependency or src file spells the ReactiveInference module root, no src file spells model revision or sampling policy as one identifier (joined or with one underscore, dot or dash) or native_evidence, the rf roster is the preview alone, and its gating envelope (RI-DEC-06/08) is measured unshipped at the pin and at the probe`,
    pins: [
      { id: "A1", quote: "If Pi ever echoes a native decision result" },
      { id: "A2", quote: "(gated: RI native decision envelope" },
      { id: "A3", quote: "carrying endpoint/model revision, sampling policy and native evidence, RI-DEC-06/08; unshipped at 485f3615db1e)" },
    ],
  },
  {
    id: "B",
    label: "(a) adoption fixture: endpoint/model revision, sampling policy and native evidence travel verbatim as distinct evidence refs/metadata when present",
    pins: [
      { id: "B1", quote: "adoption fixture: endpoint/model revision, sampling policy and native evidence" },
      { id: "B2", quote: "travel verbatim" },
      { id: "B3", quote: "as distinct" },
      { id: "B4", quote: "evidence refs/metadata" },
      { id: "B5", quote: "when present" },
    ],
  },
  {
    id: "C",
    label: "(b) absent-field fixture: projection byte-identical to today's, no carrier default substitutes (wb-2j3.2 pattern)",
    pins: [
      { id: "C1", quote: "absent-field fixture" },
      { id: "C2", quote: "projection byte-identical to today's" },
      { id: "C3", quote: "no carrier default substitutes" },
      { id: "C4", quote: "(wb-2j3.2 pattern)" },
    ],
  },
  {
    id: "D",
    label: "(c) mutant: defaulting an absent model revision (or policy) to any literal fails",
    pins: [
      { id: "D1", quote: "mutant: defaulting an absent model revision" },
      { id: "D2", quote: "(or policy)" },
      { id: "D3", quote: "to any literal" },
      { id: "D4", quote: "fails" },
    ],
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
  readonly quote: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Placement {
  readonly id: string;
  readonly path: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly quotePin: string;
  readonly quote: string;
  readonly gatingArtifacts: readonly string[];
  readonly producer: JsonObject;
  readonly rfVersion: string;
  readonly measured: readonly string[];
  readonly fields: readonly string[];
  readonly refKinds: JsonObject;
  readonly members: JsonObject;
  readonly invocation: JsonObject;
  readonly carrier: Envelope;
  readonly native: JsonObject;
  readonly placements: readonly Placement[];
  readonly revisionProbes: readonly JsonValue[];
  readonly policyProbes: readonly JsonValue[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly reached: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}
function arrayOf(value: JsonValue | undefined, field: string): JsonValue[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be a list`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function sha(text: string): string {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}

/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value)) throw new Error(`roster ${name} must be an object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`roster ${name} needs a null transaction, a result and diagnostics`);
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null,
    result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !Array.isArray(raw.placements)) throw new Error("roster must be an object with rows and placements");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || typeof pin.quote !== "string" || !Object.hasOwn(pin, "witness")) {
        throw new Error(`roster rows[${index}].pins[${at}] needs an id, a quote and a witness`);
      }
      return { id: pin.id, quote: pin.quote, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const placements = raw.placements.map((placement: unknown, index: number): Placement => {
    if (!isObject(placement) || typeof placement.id !== "string") throw new Error(`roster placements[${index}] needs an id`);
    return { id: placement.id, path: strings(placement.path, `placements[${index}].path`) };
  });
  const { bead, quotePin, quote, rfVersion, producer, refKinds, members, invocation, native, revisionProbes, policyProbes } = raw;
  if (typeof bead !== "string" || typeof quotePin !== "string" || typeof quote !== "string" || typeof rfVersion !== "string") {
    throw new Error("roster needs bead, quotePin, quote and rfVersion strings");
  }
  if (!isObject(producer) || !isObject(refKinds) || !isObject(members) || !isObject(invocation) || !isObject(native)) {
    throw new Error("roster needs producer, refKinds, members, invocation and native objects");
  }
  if (!Array.isArray(revisionProbes) || !Array.isArray(policyProbes)) throw new Error("roster needs revisionProbes and policyProbes lists");
  return {
    bead, quotePin, quote, rfVersion,
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    producer: objectOf(json(producer), "producer"),
    measured: strings(raw.measured, "measured"),
    fields: strings(raw.fields, "fields"),
    refKinds: objectOf(json(refKinds), "refKinds"),
    members: objectOf(json(members), "members"),
    invocation: objectOf(json(invocation), "invocation"),
    carrier: envelopeOf(raw.carrier, "carrier"),
    native: objectOf(json(native), "native"),
    placements,
    revisionProbes: revisionProbes.map(json),
    policyProbes: policyProbes.map(json),
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();
/** The measured carrier with this run's root in place of the fixture root (its one occurrence: workspace.root). */
const CARRIER: Envelope = { ...envelopeOf(json(ROSTER.carrier), "carrier"), workspace: { id: ROSTER.carrier.workspace.id, root: ROOT } };
const NATIVE: JsonObject = ROSTER.native;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The wb-tz4r.3 row of the tracked bead export: its title and notes. */
function exportRow(): { title: string; notes: string } {
  for (const line of readFileSync(EXPORT_PATH, "utf8").split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`the tracked bead export holds no ${BEAD} row`);
}
/** The export's acceptance clauses, by letter: the text after each "(x) " marker of its Acceptance line, without the separator. */
function acceptanceClauses(notes: string): Record<string, string> {
  const line = notes.split("\n").find(entry => entry.startsWith("Acceptance: "));
  if (line === undefined) throw new Error(`the ${BEAD} export row states no Acceptance line`);
  const body = line.slice("Acceptance: ".length);
  const marks = [...body.matchAll(/\(([a-d])\) /g)];
  const clauses: Record<string, string> = {};
  marks.forEach((mark, index) => {
    const start = (mark.index ?? 0) + mark[0].length;
    const end = index + 1 < marks.length ? (marks[index + 1]?.index ?? body.length) : body.length;
    clauses[mark[1] ?? ""] = body.slice(start, end).trim().replace(/[;.]$/, "");
  });
  return clauses;
}
/** The title's condition: after its program tag, up to the parenthesis that closes before ", Pi shall". */
function conditionOf(title: string): string {
  return /^\[[^\]]+\] (If .+?\)), Pi shall /.exec(title)?.[1] ?? "";
}
/** A row's owner text: an acceptance row's clause (its label's letter), the trigger row's the title's condition. */
function ownerTextOf(row: Row, title: string, clauses: Readonly<Record<string, string>>): string {
  const letter = /^\(([a-d])\) /.exec(row.label)?.[1];
  return letter === undefined ? conditionOf(title) : (clauses[letter] ?? "");
}
/** A gap between two quotes that names nothing: separators and at most one joining or/and (the wb-if7q.2 and wb-z3ft.2 form). */
const SEPARATOR = /^[\s,;:]*(?:(?:or|and)[\s,;:]+)?$/;
/** Whether the quotes, in order, tile the text: each found after the previous one, every gap a separator; the gaps that are not. */
function tiles(body: string, quotes: readonly string[]): { covered: boolean; untiled: string[] } {
  let at = 0;
  const gaps: string[] = [];
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0) return { covered: false, untiled: [...gaps.filter(gap => !SEPARATOR.test(gap)), `<missing ${quote}>`] };
    gaps.push(body.slice(at, found));
    at = found + quote.length;
  }
  gaps.push(body.slice(at));
  const untiled = gaps.filter(gap => !SEPARATOR.test(gap));
  return { covered: untiled.length === 0, untiled };
}

/** A field's verbatim token: a string field is itself, a structured one its JSON text as the producer serialized it. */
function tokenOf(value: JsonValue): string {
  return typeof value === "string" ? value : JSON.stringify(value);
}
type Present = Partial<Record<Field, JsonValue>>;
function presentOf(native: JsonObject | undefined): Present {
  const present: Present = {};
  for (const field of FIELDS) {
    const value = native?.[field];
    if (native !== undefined && Object.hasOwn(native, field) && value !== undefined) present[field] = value;
  }
  return present;
}
/** The native result with the named fields removed. */
function nativeWithout(...fields: readonly Field[]): JsonObject {
  return Object.fromEntries(Object.entries(NATIVE).filter(([key]) => !fields.some(field => field === key)));
}
/** A copy of `value` with `inserted` set at `path` (array indices written as digits). */
function placedAt(value: JsonValue, path: readonly string[], inserted: JsonValue): JsonValue {
  const copy = json(value);
  let node: JsonValue = copy;
  path.slice(0, -1).forEach((key, index) => {
    const next: JsonValue | undefined = Array.isArray(node) ? node[Number(key)] : objectOf(node, `path ${path.slice(0, index).join(".")}`)[key];
    if (next === undefined) throw new Error(`no ${key} at ${path.slice(0, index).join(".")}`);
    node = next;
  });
  const last = path[path.length - 1] ?? "";
  if (Array.isArray(node)) node[Number(last)] = json(inserted);
  else objectOf(node, `path ${path.join(".")}`)[last] = json(inserted);
  return copy;
}
/** The value at `path` (array indices written as digits), or undefined when the path does not exist. */
function valueAt(value: JsonValue, path: readonly string[]): JsonValue | undefined {
  let node: JsonValue | undefined = value;
  for (const key of path) {
    if (Array.isArray(node)) node = node[Number(key)];
    else if (isObject(node)) node = node[key];
    else return undefined;
  }
  return node;
}
/** A placement path written the way differences() names paths: `$.a.b[0].c`. */
function pathText(path: readonly string[]): string {
  return `$${path.map(key => (/^\d+$/.test(key) ? `[${key}]` : `.${key}`)).join("")}`;
}
/** The carrier with the native result (or `native`, when given) placed as a one-entry resource list at the placement. */
function variant(placement: Placement, native: JsonObject = NATIVE): Envelope {
  return envelopeOf(placedAt(json(CARRIER), placement.path, [native]), `variant ${placement.id}`);
}
function placementOf(id: string): Placement {
  const found = ROSTER.placements.find(placement => placement.id === id);
  if (found === undefined) throw new Error(`the roster holds no placement ${id}`);
  return found;
}

/** Every path where two JSON values differ: a missing or extra key, a changed leaf, a list of another length, or key order. */
function differences(left: JsonValue | undefined, right: JsonValue | undefined, at = "$"): string[] {
  if (JSON.stringify(left) === JSON.stringify(right)) return [];
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) return [at];
    const found = left.flatMap((item, index) => differences(item, right[index], `${at}[${index}]`));
    return found.length > 0 ? found : [at];
  }
  if (isObject(left) && isObject(right)) {
    const keys = [...new Set([...Object.keys(left), ...Object.keys(right)])];
    const found = keys.flatMap(key => (Object.hasOwn(left, key) && Object.hasOwn(right, key) ? differences(left[key], right[key], `${at}.${key}`) : [`${at}.${key}`]));
    return found.length > 0 ? found : [at];
  }
  return [at];
}

interface Entry {
  readonly path: Path;
  readonly text: string;
  readonly leaf: boolean;
}
/** Every member and element of a JSON value with its token text; a string leaf is marked as one. */
function entriesOf(value: JsonValue): Entry[] {
  const found: Entry[] = [];
  const visit = (node: JsonValue, at: Path): void => {
    const children: [string | number, JsonValue][] = Array.isArray(node) ? node.map((item, index) => [index, item]) : isObject(node) ? Object.entries(node) : [];
    for (const [key, item] of children) {
      found.push({ path: [...at, key], text: tokenOf(item), leaf: typeof item === "string" });
      visit(item, [...at, key]);
    }
  };
  visit(value, []);
  return found;
}
/** An entry carries a token when it is the token, or a string `<kind>:<token>` whose kind is a bare ref kind. */
function carries(entry: Entry, token: string): boolean {
  if (entry.text === token) return true;
  return entry.leaf && entry.text.length > token.length && entry.text.endsWith(token) && REF_PREFIX.test(entry.text.slice(0, entry.text.length - token.length));
}
/** A copy of `value` without the entries at `paths`. */
function without(value: JsonValue, paths: readonly Path[]): JsonValue {
  const marked = new Set(paths.map(path => JSON.stringify(path)));
  const rebuild = (node: JsonValue, at: Path): JsonValue => {
    if (Array.isArray(node)) return node.flatMap((item, index) => (marked.has(JSON.stringify([...at, index])) ? [] : [rebuild(item, [...at, index])]));
    if (isObject(node)) {
      const kept: JsonObject = {};
      for (const [key, item] of Object.entries(node)) if (!marked.has(JSON.stringify([...at, key]))) kept[key] = rebuild(item, [...at, key]);
      return kept;
    }
    return node;
  };
  return rebuild(value, []);
}

/**
 * THE JUDGE. `base` is today's projection of the carrier, `present` the fields the producer stated, `candidate` a projection of an
 * envelope carrying them. Findings: missing:<field> (no entry carries it verbatim), duplicated:<field> (more than one does),
 * merged:<a>+<b> (one string carries two fields), changed:<path> (after the carrying entries are removed, the candidate differs
 * from base there). An absent field has no token, so any default for it is a change, whatever literal it holds.
 */
function judge(base: JsonValue, present: Present, candidate: JsonValue): string[] {
  const findings: string[] = [];
  const entries = entriesOf(candidate);
  const tokens = FIELDS.flatMap(field => {
    const value = present[field];
    return value === undefined ? [] : [{ field, token: tokenOf(value) }];
  });
  const carrying: Path[] = [];
  for (const { field, token } of tokens) {
    const found = entries.filter(entry => carries(entry, token));
    if (found.length === 0) findings.push(`missing:${field}`);
    if (found.length > 1) findings.push(`duplicated:${field}`);
    carrying.push(...found.map(entry => entry.path));
  }
  for (const entry of entries) {
    if (!entry.leaf) continue;
    const inside = tokens.filter(({ token }) => entry.text.includes(token)).map(({ field }) => field);
    if (inside.length > 1) findings.push(`merged:${inside.join("+")}`);
  }
  findings.push(...differences(base, without(candidate, carrying)).map(path => `changed:${path}`));
  return [...new Set(findings)];
}

/** The reference adoption on the topology: one `<kind>:<token>` evidence ref per present field, in field order. */
function adoptTopology(base: JsonValue, present: Present): JsonValue {
  const copy = json(base);
  const refs = arrayOf(objectOf(arrayOf(objectOf(copy, "topology").snapshots, "snapshots")[0], "snapshot").evidenceRefs, "evidenceRefs");
  for (const field of FIELDS) {
    const value = present[field];
    if (value !== undefined) refs.push(`${REF_KIND[field]}:${tokenOf(value)}`);
  }
  return copy;
}
/** The reference adoption on the metadata: one member per present field holding the producer's value, in field order. */
function adoptMetadata(base: JsonValue, present: Present): JsonValue {
  const copy = objectOf(json(base), "metadata");
  for (const field of FIELDS) {
    const value = present[field];
    if (value !== undefined) copy[MEMBER[field]] = json(value);
  }
  return copy;
}
/** Projection edits the mutants compose: a ref, a member, a note, a status suffix, a sourceVersion, a ref rewrite. */
function snapshotOf(topology: JsonValue): JsonObject {
  return objectOf(arrayOf(objectOf(topology, "topology").snapshots, "snapshots")[0], "snapshot");
}
function withRef(topology: JsonValue, ref: string): JsonValue {
  const copy = json(topology);
  arrayOf(snapshotOf(copy).evidenceRefs, "evidenceRefs").push(ref);
  return copy;
}
function withMember(metadata: JsonValue, key: string, value: JsonValue): JsonValue {
  const copy = objectOf(json(metadata), "metadata");
  copy[key] = json(value);
  return copy;
}
function withNote(topology: JsonValue, note: string): JsonValue {
  const copy = objectOf(json(topology), "topology");
  arrayOf(copy.diagnostics, "diagnostics").push(note);
  return copy;
}
function withSnapshot(topology: JsonValue, key: string, edit: (current: JsonValue | undefined) => JsonValue): JsonValue {
  const copy = json(topology);
  const snapshot = snapshotOf(copy);
  snapshot[key] = edit(snapshot[key]);
  return copy;
}
function withStatus(topology: JsonValue, suffix: string): JsonValue {
  const copy = json(topology);
  const node = objectOf(snapshotOf(copy).node, "node");
  node.statusText = `${String(node.statusText)}${suffix}`;
  return copy;
}
function mapRefs(topology: JsonValue, edit: (refs: string[]) => string[]): JsonValue {
  const copy = json(topology);
  const snapshot = snapshotOf(copy);
  snapshot.evidenceRefs = edit(strings(snapshot.evidenceRefs, "evidenceRefs"));
  return copy;
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log, prints `answer` and exits 0. */
function standInRf(answer: JsonValue): string {
  const folder = makeScratch("ri-provenance-echo-");
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

interface Carried {
  readonly reading: JsonValue;
  readonly spawns: string[][];
  readonly calls: number;
}
/** One registry invocation of the NATIVE preview against a stand-in rf printing `envelope`. */
async function nativeReading(envelope: Envelope): Promise<Carried> {
  const log = standInRf(json(envelope));
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { ...INVOCATION }, invocationContext());
  return { reading, spawns: spawnsOf(log), calls: 0 };
}
/** One registry invocation of the INJECTED preview whose reader answers `envelope`. */
async function injectedReading(envelope: Envelope): Promise<Carried> {
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { ...INVOCATION }, invocationContext());
  return { reading, spawns: [], calls };
}
function readingOf(source: Envelope): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: json(source) };
}
/** A seam's reading of `envelope` must be the envelope byte for byte, after one spawn of the --no-commit argv or one injected call. */
async function carriedVerbatim(seam: Seam, envelope: Envelope): Promise<JsonValue> {
  const carried = seam === "rf-cli" ? await nativeReading(envelope) : await injectedReading(envelope);
  const source = objectOf(objectOf(carried.reading, "reading").source, "reading source");
  expect(carried.reading).toStrictEqual(readingOf(envelope));
  expect(JSON.stringify(source)).toBe(JSON.stringify(envelope));
  if (seam === "rf-cli") {
    expect(carried.spawns).toHaveLength(1);
    expect(carried.spawns[0]).toStrictEqual(["--workspace", ROOT, "context", "render", "--model", INVOCATION.model, "--task", INVOCATION.task, "--no-commit", "--no-input", "--json"]);
  } else {
    expect(carried.calls).toBe(1);
  }
  return carried.reading;
}

const CONTEXTS: Readonly<Record<Seam, ReactiveFiberTopologyContext>> = {
  "rf-cli": { scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" },
  "injected-fixture": { scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "injected-fixture", capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z" },
};
function topologyOf(reading: JsonValue, seam: Seam): JsonValue {
  return json(reactivefiberTopology(reading, CONTEXTS[seam]));
}
function metadataOf(reading: JsonValue): JsonValue {
  return json(nativeEvidence(PREVIEW_ID, reading));
}
/** A projection with this run's root written as <ROOT>, so its digest is the same in every checkout. */
function normal(value: JsonValue): string {
  return JSON.stringify(value).split(JSON.stringify(ROOT).slice(1, -1)).join("<ROOT>");
}
function digestOf(value: JsonValue): string {
  return sha(normal(value));
}
/** Today's projections of an envelope: the topology under each seam and the native-evidence metadata. */
function projections(envelope: Envelope): { "rf-cli": JsonValue; "injected-fixture": JsonValue; metadata: JsonValue } {
  const reading = readingOf(envelope);
  return { "rf-cli": topologyOf(reading, "rf-cli"), "injected-fixture": topologyOf(reading, "injected-fixture"), metadata: metadataOf(reading) };
}
const BASE = projections(CARRIER);
const SURFACES = ["rf-cli", "injected-fixture", "metadata"] as const;
type Surface = (typeof SURFACES)[number];
function adopt(surface: Surface, present: Present): JsonValue {
  return surface === "metadata" ? adoptMetadata(BASE.metadata, present) : adoptTopology(BASE[surface], present);
}

/** The absent-field fixtures: each field absent alone, then all four absent. */
const ABSENT: readonly { readonly name: string; readonly fields: readonly Field[] }[] = [
  ...FIELDS.map(field => ({ name: `${field} absent`, fields: [field] })),
  { name: "all four absent", fields: [...FIELDS] },
];

/** Every distinct primitive the carrier states, keys excluded, in first-seen order. */
function carrierPrimitives(): JsonValue[] {
  const seen = new Map<string, JsonValue>();
  const visit = (node: JsonValue): void => {
    if (Array.isArray(node)) node.forEach(visit);
    else if (isObject(node)) Object.values(node).forEach(visit);
    else if (!seen.has(JSON.stringify(node))) seen.set(JSON.stringify(node), node);
  };
  visit(json(ROSTER.carrier));
  return [...seen.values()];
}
/** Every object the carrier states, in first-seen order. */
function carrierObjects(): JsonObject[] {
  const found: JsonObject[] = [];
  const visit = (node: JsonValue): void => {
    if (Array.isArray(node)) node.forEach(visit);
    else if (isObject(node)) {
      found.push(node);
      Object.values(node).forEach(visit);
    }
  };
  visit(json(ROSTER.carrier));
  return found;
}
/** One default sweep: the absent `field` set to each literal at the adoption's slot, judged on all three surfaces. */
function sweep(field: Field, present: Present, literals: readonly JsonValue[]): { tried: number; refused: Record<Surface, number>; quiet: string[] } {
  const refused: Record<Surface, number> = { "rf-cli": 0, "injected-fixture": 0, metadata: 0 };
  const quiet: string[] = [];
  for (const literal of literals) {
    for (const surface of SURFACES) {
      const adopted = adopt(surface, present);
      const mutant = surface === "metadata" ? withMember(adopted, MEMBER[field], literal) : withRef(adopted, `${REF_KIND[field]}:${tokenOf(literal)}`);
      const base = BASE[surface];
      if (judge(base, present, mutant).length > 0) refused[surface] += 1;
      else quiet.push(`${surface}: ${JSON.stringify(literal)}`);
    }
  }
  return { tried: literals.length, refused, quiet };
}
/** The named probes of one field: each literal's findings per surface (one line each) and the probe/surface pairs read quiet. */
function probeTable(field: Field, present: Present, probes: readonly JsonValue[]): { lines: string[]; quiet: string[] } {
  const quiet: string[] = [];
  const lines = probes.map(literal => {
    const read = SURFACES.map(surface => {
      const adopted = adopt(surface, present);
      const mutant = surface === "metadata" ? withMember(adopted, MEMBER[field], literal) : withRef(adopted, `${REF_KIND[field]}:${tokenOf(literal)}`);
      const findings = judge(BASE[surface], present, mutant);
      if (findings.length === 0) quiet.push(`${surface}: ${JSON.stringify(literal)}`);
      return `${surface} ${findings.join(",")}`;
    });
    return `${JSON.stringify(literal)} -> ${read.join(" | ")}`;
  });
  return { lines, quiet };
}

/** Every regular file below a root (symlinks are not followed). */
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
function dependencyNames(): string[] {
  const manifest: unknown = JSON.parse(readFileSync(join(REPO, "package.json"), "utf8"));
  if (!isObject(manifest)) throw new Error("package.json must be an object");
  return ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"].flatMap(key => {
    const block = manifest[key];
    return isObject(block) ? Object.keys(block) : [];
  });
}
let nativeIds: Promise<string[]> | undefined;
/** The native registration's descriptor ids, loaded once. */
function nativeDescriptorIds(): Promise<string[]> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor.id);
  });
  return nativeIds;
}

/**
 * The functions and constants a case reads its subject through: the src tree and package.json, the registrations, the tracked
 * export, a seam, today's projections and the default sweeps over them (SELF-READ: every IMPL case names at least one).
 */
const READERS: readonly string[] = ["filesBelow", "dependencyNames", "registerReactiveFiberRender", "nativeDescriptorIds", "exportRow", "carriedVerbatim", "projections", "BASE", "probeTable", "sweep"];
/** The roster members read outside the describe block: the subject the cases measure. Its rows (pins, quotes, witnesses) only in rosterWitness. */
const SUBJECT_MEMBERS: readonly string[] = ["carrier", "native", "placements", "producer", "rfVersion", "revisionProbes", "policyProbes"];
/** Names that outside the describe block occur only at their declarations, or inside the declarations listed beside them. */
const CONFINED: readonly { readonly name: string; readonly within: readonly string[] }[] = [
  { name: "rosterWitness", within: [] },
  { name: "MEASURED", within: [] },
  { name: "REACHED", within: [] },
  { name: "ROSTER_PATH", within: ["readRoster"] },
  { name: "readRoster", within: ["ROSTER"] },
];
/** The declarations outside the describe block that may read a roster pin's witness member. */
const WITNESS_READERS: readonly string[] = ["readRoster", "rosterWitness"];
const WITNESS_MEMBER = "witness";
/** R-UNMEASURED's quiet row: a case that names a reader and returns a literal standing in for its roster witness. */
const UNMEASURED_CASE = 'const IMPL = {\n  D3: async () => {\n    expect(BASE).toBeDefined();\n    return { pasted: "a literal equal to the roster witness" };\n  },\n};\n';

/** Whether an identifier is the name its own declaration binds (a function, a variable). */
function declares(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (ts.isFunctionDeclaration(parent) || ts.isVariableDeclaration(parent)) && parent.name === node;
}
/** Whether a node reads a witness member: `x.witness`, `x["witness"]` or a `witness` binding. */
function readsWitness(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) return node.name.text === WITNESS_MEMBER;
  if (ts.isElementAccessExpression(node)) return ts.isStringLiteralLike(node.argumentExpression) && node.argumentExpression.text === WITNESS_MEMBER;
  if (ts.isBindingElement(node)) return [node.propertyName, node.name].some(name => name !== undefined && ts.isIdentifier(name) && name.text === WITNESS_MEMBER);
  return false;
}
/** The names a top-level statement declares, joined (its owner in the findings). */
function ownerOf(statement: ts.Statement): string {
  if (ts.isFunctionDeclaration(statement)) return statement.name?.text ?? "<function>";
  if (ts.isVariableStatement(statement)) return statement.declarationList.declarations.map(entry => (ts.isIdentifier(entry.name) ? entry.name.text : "<binding>")).join(",");
  return "<statement>";
}
/** The reads one declaration's subtree makes that the SELF-READ refuses. */
function refusedReads(owner: string, root: ts.Node): string[] {
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && !declares(node)) {
      const confined = CONFINED.find(entry => entry.name === node.text);
      if (confined !== undefined && !confined.within.includes(owner)) found.push(`${owner} names ${node.text}`);
      if (node.text === "ROSTER") {
        const parent = node.parent;
        const member = ts.isPropertyAccessExpression(parent) && parent.expression === node ? parent.name.text : undefined;
        const allowed = member !== undefined && (SUBJECT_MEMBERS.includes(member) || (owner === "rosterWitness" && member === "rows"));
        if (!allowed) found.push(`${owner} reads ROSTER${member === undefined ? "" : `.${member}`}`);
      }
    }
    if (readsWitness(node) && !WITNESS_READERS.includes(owner)) found.push(`${owner} reads a ${WITNESS_MEMBER}`);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}
/**
 * THE SELF-READ (wb-3xmr F2) over a source text, this file's or a planted one. Outside the describe block (whose cases compare the
 * witnesses): every IMPL case names one of READERS; rosterWitness, MEASURED and REACHED are named only where declared, ROSTER_PATH
 * only in readRoster and readRoster only for ROSTER; a witness member is read only in readRoster and rosterWitness; and ROSTER is read
 * only through SUBJECT_MEMBERS (its rows in rosterWitness alone). Returns the refused reads, by declaration (an IMPL case as IMPL.<pin>).
 */
function selfRead(text: string): string[] {
  const file = ts.createSourceFile("self-read.ts", text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const found: string[] = [];
  for (const statement of file.statements) {
    if (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isImportDeclaration(statement)) continue;
    const call = ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression) ? statement.expression : undefined;
    if (call !== undefined && ts.isIdentifier(call.expression) && call.expression.text === "describe") continue;
    const impl = ts.isVariableStatement(statement) ? statement.declarationList.declarations.find(entry => ts.isIdentifier(entry.name) && entry.name.text === "IMPL") : undefined;
    if (impl?.initializer === undefined || !ts.isObjectLiteralExpression(impl.initializer)) {
      found.push(...refusedReads(ownerOf(statement), statement));
      continue;
    }
    for (const property of impl.initializer.properties) {
      const pin = property.name !== undefined && (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ? property.name.text : "<entry>";
      const named = new Set<string>();
      const collect = (node: ts.Node): void => {
        if (ts.isIdentifier(node)) named.add(node.text);
        ts.forEachChild(node, collect);
      };
      collect(property);
      if (!READERS.some(reader => named.has(reader))) found.push(`IMPL.${pin} names no reader`);
      found.push(...refusedReads(`IMPL.${pin}`, property));
    }
  }
  return found;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const dependencies = dependencyNames();
    const files = filesBelow(join(REPO, "src"));
    const tsModules = files.filter(file => file.endsWith(".ts")).length;
    const sites = files.filter(file => RI_ROOT.test(textOf(file))).map(file => relative(REPO, file));
    const anchor = join(REPO, "src", "workbench", "reactivefiber-observer.ts");
    const anchorRead = files.includes(anchor) && textOf(anchor).includes("result.provenance.sdk_versions");
    const floorMet = files.length >= 100 && tsModules === files.length;
    expect(floorMet, `src files walked: ${files.length}, .ts ${tsModules}`).toBe(true);
    expect(anchorRead, "the anchor reactivefiber-observer.ts was not read with result.provenance.sdk_versions").toBe(true);
    const dependencyHits = dependencies.filter(name => RI_ROOT.test(name));
    expect({ dependencyHits, sites }, "a ReactiveInference consumer in Pi needs RI-DEC-06/08").toStrictEqual({ dependencyHits: [], sites: [] });
    // The read site the wb-tz4r.3 gate's G13 planted (resources[0].model_revision behind a default, no RI root, read by neither
    // projection) spells a field of the native result as a reader writes it (wb-3xmr F3).
    const fieldRead = (text: string): boolean => FIELD_SPELLINGS.some(pattern => pattern.test(text));
    const fieldSites = files.filter(file => fieldRead(textOf(file))).map(file => relative(REPO, file));
    expect(fieldSites, "a src read site of a native result field needs RI-DEC-06/08").toStrictEqual([]);
    const fieldControls = {
      snake: fieldRead('return reading.source.result.resources?.[0]?.model_revision ?? "unknown";'),
      camel: fieldRead("const policy = native.samplingPolicy;"),
      evidence: fieldRead("const evidence = native.native_evidence;"),
      quietProse: fieldRead("// carries the model revision verbatim"),
      quietOwnEvidence: fieldRead('import { nativeEvidence } from "./native-evidence.js";'),
      quietEndpoint: fieldRead('const endpoint = reading.source.result.resources?.[0]?.endpoint ?? "unknown";'),
    };
    expect(fieldControls).toStrictEqual({ snake: true, camel: true, evidence: true, quietProse: false, quietOwnEvidence: false, quietEndpoint: false });
    const flagged = (text: string): boolean => RI_ROOT.test(text);
    const controls = {
      joined: flagged('import { plan } from "reactive_inference";'),
      scoped: flagged('import { plan } from "@reactive-inference/sdk";'),
      pascal: flagged("const client = new ReactiveInference();"),
      dotted: flagged("const id = 'reactive.inference';"),
      spaced: flagged("// reads reactive inference results"),
      quiet: flagged("const lens = reactiveLens(inference);"),
    };
    return { floorMet, anchorRead, dependencyCount: dependencies.length, dependencyHits, sites, controls, fieldSites, fieldControls };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = (await nativeDescriptorIds()).filter(id => id.startsWith("reactivefiber."));
    const injectedIds = injected.catalogSnapshot().map(entry => entry.descriptor.id).filter(id => id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const riIds = (await nativeDescriptorIds()).filter(id => RI_ROOT.test(id) || /^ri[.-]/.test(id));
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(riIds).toStrictEqual([]);
    return { native, injected: injectedIds, reconcile, riIds };
  },
  A3: async () => {
    const { title, notes } = exportRow();
    const shippedNo = notes.includes("Shipped: no - at 485f3615db1e only ChoiceBackendCapabilities.deployment_id exists on the preflight side");
    const noEnvelope = notes.includes("no result envelope carries revision, policy or evidence");
    const gatingAbsent = GATING_ARTIFACTS.filter(artifact => !notes.includes(artifact));
    const producer = ROSTER.producer;
    expect(shippedNo && noEnvelope).toBe(true);
    expect(gatingAbsent).toStrictEqual([]);
    expect(producer.resultEnvelopeAtPin).toBe(false);
    expect(producer.resultEnvelopeAtProbe).toBe(false);
    expect(producer.shippedFields).toStrictEqual([]);
    expect(title.includes("RI-DEC-06/08") && title.includes("unshipped at 485f3615db1e")).toBe(true);
    return { shippedNo, noEnvelope, gatingAbsent, producer };
  },
  B1: async () => {
    const present = presentOf(NATIVE);
    const tokens = FIELDS.map(field => tokenOf(present[field] ?? null));
    const distinct = tokens.every((token, index) => tokens.every((other, at) => at === index || !other.includes(token)));
    const carrierText = JSON.stringify(ROSTER.carrier);
    const baseText = SURFACES.map(surface => normal(BASE[surface])).join("\n");
    const mentions = tokens.filter(token => carrierText.includes(token) || baseText.includes(token)).length;
    const structured = FIELDS.filter(field => isObject(present[field]));
    const placed = Object.fromEntries(ROSTER.placements.map(placement => [placement.id, differences(json(CARRIER), json(variant(placement)))]));
    expect(Object.keys(present)).toStrictEqual([...FIELDS]);
    expect(distinct).toBe(true);
    expect(mentions).toBe(0);
    expect(structured).toStrictEqual(["sampling_policy", "native_evidence"]);
    expect(Object.values(placed).every(paths => paths.length === 1)).toBe(true);
    expect(ROSTER.carrier.workspace.root).toBe(FIXTURE_ROOT);
    return { fields: Object.keys(present), distinct, mentions, structured, tag: NATIVE.tag ?? null, schemaVersion: NATIVE.schema_version ?? null, placed, carrierRoot: ROSTER.carrier.workspace.root };
  },
  B2: async () => {
    const carried: JsonObject = {};
    for (const placement of ROSTER.placements) {
      const envelope = variant(placement);
      for (const seam of SEAMS) {
        const reading = await carriedVerbatim(seam, envelope);
        const resources = valueAt(reading, ["source", ...placement.path]);
        expect(resources).toStrictEqual([NATIVE]);
        carried[`${placement.id}/${seam}`] = { verbatim: true, at: pathText(["source", ...placement.path]), keys: Object.keys(objectOf(arrayOf(resources, "resources")[0], "resource")) };
      }
    }
    return carried;
  },
  B3: async () => {
    const present = presentOf(NATIVE);
    const adopted: JsonObject = {};
    for (const surface of SURFACES) {
      const projection = adopt(surface, present);
      const findings = judge(BASE[surface], present, projection);
      expect(findings).toStrictEqual([]);
      adopted[surface] = { added: differences(BASE[surface], projection), findings };
    }
    const refs = strings(snapshotOf(adopt("rf-cli", present)).evidenceRefs, "evidenceRefs").slice(-FIELDS.length);
    const metadata = objectOf(adopt("metadata", present), "metadata");
    const members = FIELDS.map(field => JSON.stringify(metadata[MEMBER[field]]) === JSON.stringify(present[field]));
    expect(refs).toStrictEqual(FIELDS.map(field => `${REF_KIND[field]}:${tokenOf(present[field] ?? null)}`));
    expect(members).toStrictEqual([true, true, true, true]);
    return { adopted, refs, members };
  },
  B4: async () => {
    const present = presentOf(NATIVE);
    const base = Object.fromEntries(SURFACES.map(surface => [surface, digestOf(BASE[surface])]));
    const today: JsonObject = {};
    for (const placement of ROSTER.placements) {
      const projected = projections(variant(placement));
      for (const surface of SURFACES) {
        expect(normal(projected[surface])).toBe(normal(BASE[surface]));
        today[`${placement.id}/${surface}`] = judge(BASE[surface], present, projected[surface]);
      }
    }
    const findings = [...new Set(Object.values(today).map(value => JSON.stringify(value)))];
    expect(findings).toStrictEqual([JSON.stringify(FIELDS.map(field => `missing:${field}`))]);
    return { base, today };
  },
  B5: async () => {
    const provenance = objectOf(objectOf(CARRIER.result, "result").provenance, "provenance");
    const release = String(provenance.cli_version);
    const refs = strings(snapshotOf(BASE["rf-cli"]).evidenceRefs, "evidenceRefs");
    const notes = strings(objectOf(BASE["rf-cli"], "topology").diagnostics, "diagnostics");
    const metadata = objectOf(BASE.metadata, "metadata");
    const ref = refs.filter(entry => entry === `rf-cli:${release}`);
    const note = notes.filter(entry => entry === `producer release from result.provenance.cli_version: rf@${release}`);
    expect(release).toBe(ROSTER.rfVersion);
    expect(ref).toHaveLength(1);
    expect(note).toHaveLength(1);
    expect(metadata.producerRelease).toBe(release);
    return { release, ref, note, producerRelease: metadata.producerRelease ?? null, refs };
  },
  C1: async () => {
    const top = placementOf("top");
    const fixtures: JsonObject = {};
    for (const absent of ABSENT) {
      const native = nativeWithout(...absent.fields);
      const envelope = variant(top, native);
      const keys: JsonObject = {};
      for (const seam of SEAMS) {
        const reading = await carriedVerbatim(seam, envelope);
        const carried = arrayOf(objectOf(objectOf(objectOf(reading, "reading").source, "source").result, "result").resources, "resources");
        keys[seam] = Object.keys(objectOf(carried[0], "resource"));
      }
      const projected = projections(envelope);
      const identical = SURFACES.map(surface => normal(projected[surface]) === normal(BASE[surface]));
      expect(identical).toStrictEqual([true, true, true]);
      expect(keys["rf-cli"]).toStrictEqual(Object.keys(native));
      expect(keys["injected-fixture"]).toStrictEqual(Object.keys(native));
      fixtures[absent.name] = { keys: keys["rf-cli"] ?? null, identical };
    }
    return fixtures;
  },
  C2: async () => {
    const fixtures: JsonObject = {};
    for (const absent of ABSENT) {
      const present = presentOf(nativeWithout(...absent.fields));
      const surfaces: JsonObject = {};
      for (const surface of SURFACES) {
        const adopted = adopt(surface, present);
        const findings = judge(BASE[surface], present, adopted);
        const kinds = surface === "metadata" ? Object.keys(objectOf(adopted, "metadata")).filter(key => key.startsWith("ri")) : strings(snapshotOf(adopted).evidenceRefs, "refs").filter(ref => ref.startsWith("ri-")).map(ref => ref.slice(0, ref.indexOf(":")));
        expect(findings).toStrictEqual([]);
        surfaces[surface] = { kinds, findings };
      }
      fixtures[absent.name] = surfaces;
    }
    const allAbsent = SURFACES.map(surface => normal(adopt(surface, {})) === normal(BASE[surface]));
    expect(allAbsent).toStrictEqual([true, true, true]);
    return { fixtures, allAbsentIdentical: allAbsent };
  },
  C3: async () => {
    const result = objectOf(CARRIER.result, "result");
    const budget = objectOf(result.budget, "budget");
    const capability = objectOf(budget.capability_snapshot, "capability_snapshot");
    const inference = objectOf(objectOf(objectOf(result.provenance, "provenance").sdk_versions, "sdk_versions").reactive_inference, "reactive_inference");
    const values: Record<string, string> = {
      "budget.requested_model_id": String(budget.requested_model_id),
      "budget.capability_snapshot.model_id": String(capability.model_id),
      "invocation.model": INVOCATION.model,
      "sdk_versions.reactive_inference.distribution_version": String(inference.distribution_version),
      "sdk_versions.reactive_inference.contract_fingerprint": String(inference.contract_fingerprint),
    };
    const envelopes = [CARRIER, ...ROSTER.placements.map(placement => variant(placement)), ...ABSENT.map(absent => variant(placementOf("top"), nativeWithout(...absent.fields)))];
    const surfaced = envelopes.flatMap(envelope => SURFACES.map(surface => normal(projections(envelope)[surface]))).join("\n");
    const carrierText = JSON.stringify(ROSTER.carrier);
    const counts = Object.fromEntries(Object.entries(values).map(([name, value]) => [name, { inCarrier: carrierText.split(value).length - 1, onSurfaces: surfaced.split(value).length - 1 }]));
    expect(Object.values(counts).every(count => count.onSurfaces === 0)).toBe(true);
    expect(Object.entries(counts).filter(([name]) => name !== "invocation.model").every(([, count]) => count.inCarrier >= 1)).toBe(true);
    expect(budget.resolved_model_id).toBeNull();
    return { counts, resolvedModelId: { stated: Object.hasOwn(budget, "resolved_model_id"), value: budget.resolved_model_id ?? null }, envelopes: envelopes.length };
  },
  C4: async () => {
    const result = objectOf(json(CARRIER.result), "result");
    delete objectOf(result.provenance, "provenance").cli_version;
    const stripped = projections({ ...CARRIER, result });
    const release = String(objectOf(objectOf(CARRIER.result, "result").provenance, "provenance").cli_version);
    const note = `producer release from result.provenance.cli_version: rf@${release}`;
    const removedRefs = strings(snapshotOf(BASE["rf-cli"]).evidenceRefs, "refs").filter(ref => !strings(snapshotOf(stripped["rf-cli"]).evidenceRefs, "refs").includes(ref));
    const removedNotes = strings(objectOf(BASE["rf-cli"], "topology").diagnostics, "notes").filter(entry => !strings(objectOf(stripped["rf-cli"], "topology").diagnostics, "notes").includes(entry));
    const removedMembers = Object.keys(objectOf(BASE.metadata, "metadata")).filter(key => !Object.hasOwn(objectOf(stripped.metadata, "metadata"), key));
    const changed = Object.fromEntries(SURFACES.map(surface => [surface, differences(BASE[surface], stripped[surface])]));
    // Nothing else moves: the stripped topology is today's with exactly the rf-cli ref and its note taken out, the metadata
    // today's without producerRelease, under both seams.
    const back = SURFACES.map(surface => {
      if (surface === "metadata") return normal(withMember(stripped.metadata, "producerRelease", release)) === normal(BASE.metadata);
      const today = objectOf(json(BASE[surface]), "topology");
      const refs = strings(snapshotOf(today).evidenceRefs, "refs").filter(ref => ref !== `rf-cli:${release}`);
      snapshotOf(today).evidenceRefs = refs;
      today.diagnostics = strings(today.diagnostics, "notes").filter(entry => entry !== note);
      return normal(today) === normal(stripped[surface]);
    });
    expect(removedRefs).toStrictEqual([`rf-cli:${release}`]);
    expect(removedNotes).toStrictEqual([note]);
    expect(removedMembers).toStrictEqual(["producerRelease"]);
    expect(back).toStrictEqual([true, true, true]);
    return { removedRefs, removedNotes, removedMembers, changed, nothingElse: back };
  },
  D1: async () => {
    const present = presentOf(nativeWithout("model_revision"));
    const probes = probeTable("model_revision", present, ROSTER.revisionProbes);
    const literals = carrierPrimitives();
    const swept = sweep("model_revision", present, literals);
    expect(probes.quiet).toStrictEqual([]);
    expect(swept.quiet).toStrictEqual([]);
    expect(swept.refused).toStrictEqual({ "rf-cli": literals.length, "injected-fixture": literals.length, metadata: literals.length });
    return { probes: probes.lines, carrierLiterals: swept.tried, refused: swept.refused, quiet: [...probes.quiet, ...swept.quiet] };
  },
  D2: async () => {
    const present = presentOf(nativeWithout("sampling_policy"));
    const probes = probeTable("sampling_policy", present, ROSTER.policyProbes);
    const objects = carrierObjects();
    const swept = sweep("sampling_policy", present, objects);
    expect(probes.quiet).toStrictEqual([]);
    expect(swept.quiet).toStrictEqual([]);
    expect(swept.refused).toStrictEqual({ "rf-cli": objects.length, "injected-fixture": objects.length, metadata: objects.length });
    return { probes: probes.lines, carrierObjects: swept.tried, refused: swept.refused, quiet: [...probes.quiet, ...swept.quiet] };
  },
  D3: async () => {
    const all = presentOf(NATIVE);
    const noRevision = presentOf(nativeWithout("model_revision"));
    const noPolicy = presentOf(nativeWithout("sampling_policy"));
    const revision = String(all.model_revision);
    const endpoint = String(all.endpoint);
    const policy = objectOf(all.sampling_policy, "sampling_policy");
    const evidence = objectOf(all.native_evidence, "native_evidence");
    const topology = adopt("rf-cli", all);
    const metadata = adopt("metadata", all);
    const replaced = (from: string, to: string) => mapRefs(topology, refs => refs.map(ref => (ref === from ? to : ref)));
    const mutants: Record<string, { readonly surface: Surface; readonly present: Present; readonly candidate: JsonValue }> = {
      "revision absent, note states a default": { surface: "rf-cli", present: noRevision, candidate: withNote(adopt("rf-cli", noRevision), "model revision: unknown") },
      "revision absent, status text states a default": { surface: "rf-cli", present: noRevision, candidate: withStatus(adopt("rf-cli", noRevision), " - model revision unknown") },
      "revision absent, sourceVersion defaulted": { surface: "rf-cli", present: noRevision, candidate: withSnapshot(adopt("rf-cli", noRevision), "sourceVersion", () => "unknown") },
      "revision absent, member under another name": { surface: "metadata", present: noRevision, candidate: withMember(adopt("metadata", noRevision), "modelRevision", "unknown") },
      "revision absent, ref of another kind": { surface: "rf-cli", present: noRevision, candidate: withRef(adopt("rf-cli", noRevision), "ri-revision:unknown") },
      "revision absent, endpoint borrowed": { surface: "rf-cli", present: noRevision, candidate: withRef(adopt("rf-cli", noRevision), `${REF_KIND.model_revision}:${endpoint}`) },
      "policy absent, note states a default": { surface: "rf-cli", present: noPolicy, candidate: withNote(adopt("rf-cli", noPolicy), "sampling policy: default") },
      "policy absent, member under another name": { surface: "metadata", present: noPolicy, candidate: withMember(adopt("metadata", noPolicy), "samplingPolicy", { mode: "greedy" }) },
      "revision upper-cased": { surface: "rf-cli", present: all, candidate: replaced(`${REF_KIND.model_revision}:${revision}`, `${REF_KIND.model_revision}:${revision.toUpperCase()}`) },
      "endpoint truncated": { surface: "rf-cli", present: all, candidate: replaced(`${REF_KIND.endpoint}:${endpoint}`, `${REF_KIND.endpoint}:${endpoint.slice(0, -8)}`) },
      "policy keys re-sorted": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.sampling_policy, Object.fromEntries(Object.entries(policy).sort(([a], [b]) => a.localeCompare(b)))) },
      "policy number as text": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.sampling_policy, { ...policy, temperature: String(policy.temperature) }) },
      "evidence truncated to one score": { surface: "metadata", present: all, candidate: withMember(metadata, MEMBER.native_evidence, { ...evidence, scores: arrayOf(evidence.scores, "scores").slice(0, 1) }) },
      "endpoint and revision merged": { surface: "rf-cli", present: all, candidate: mapRefs(topology, refs => refs.filter(ref => !ref.startsWith(`${REF_KIND.model_revision}:`)).map(ref => (ref.startsWith(`${REF_KIND.endpoint}:`) ? `${ref}@${revision}` : ref))) },
      "evidence dropped": { surface: "rf-cli", present: all, candidate: mapRefs(topology, refs => refs.filter(ref => !ref.startsWith(`${REF_KIND.native_evidence}:`))) },
      "revision stated twice": { surface: "rf-cli", present: all, candidate: withRef(topology, `${REF_KIND.model_revision}:${revision}`) },
    };
    const findings = Object.fromEntries(Object.entries(mutants).map(([name, mutant]) => [name, judge(BASE[mutant.surface], mutant.present, mutant.candidate)]));
    expect(Object.entries(findings).filter(([, found]) => found.length === 0).map(([name]) => name)).toStrictEqual([]);
    return findings;
  },
  D4: async () => {
    const all = presentOf(NATIVE);
    const quiet: JsonObject = {};
    for (const surface of SURFACES) {
      quiet[`base/${surface}`] = judge(BASE[surface], {}, BASE[surface]);
      quiet[`adoption/${surface}`] = judge(BASE[surface], all, adopt(surface, all));
      for (const absent of ABSENT) {
        const present = presentOf(nativeWithout(...absent.fields));
        quiet[`adoption ${absent.name}/${surface}`] = judge(BASE[surface], present, adopt(surface, present));
        quiet[`today ${absent.name}/${surface}`] = judge(BASE[surface], {}, projections(variant(placementOf("top"), nativeWithout(...absent.fields)))[surface]);
      }
    }
    const revision = String(all.model_revision);
    const endpoint = String(all.endpoint);
    // R-REBIND: D3 dropped and D4's quote widened over D3's part tiles clause (c) again (the anchor reads every word has a pin).
    const rowD = ROWS.find(row => row.id === "D")?.pins ?? [];
    const quoteOf = (pin: string): string => rowD.find(entry => entry.id === pin)?.quote ?? "";
    const clause = acceptanceClauses(exportRow().notes).c ?? "";
    const from = clause.indexOf(quoteOf("D3"));
    const widened = clause.slice(from, clause.indexOf(quoteOf("D4"), from) + quoteOf("D4").length);
    const rebind = rowD.filter(pin => pin.id !== "D3").map(pin => (pin.id === "D4" ? widened : pin.quote));
    const residuals = {
      "R-COINCIDENT": judge(BASE["rf-cli"], all, withSnapshot(adopt("rf-cli", all), "sourceVersion", current => current ?? null)),
      "R-KIND": judge(BASE["rf-cli"], all, mapRefs(adopt("rf-cli", all), refs => refs.map(ref => (ref === `${REF_KIND.endpoint}:${endpoint}` ? `${REF_KIND.model_revision}:${endpoint}` : ref === `${REF_KIND.model_revision}:${revision}` ? `${REF_KIND.endpoint}:${revision}` : ref)))),
      "R-ORDER": judge(BASE["rf-cli"], all, mapRefs(adopt("rf-cli", all), refs => [...refs.slice(-FIELDS.length), ...refs.slice(0, -FIELDS.length)])),
      "R-REBIND": tiles(clause, rebind).untiled,
      "R-UNMEASURED": selfRead(UNMEASURED_CASE),
    };
    expect(Object.values(quiet).every(found => JSON.stringify(found) === "[]")).toBe(true);
    expect(residuals).toStrictEqual({ "R-COINCIDENT": [], "R-KIND": [], "R-ORDER": [], "R-REBIND": [], "R-UNMEASURED": [] });
    return { quiet, residuals, rebind };
  },
};

/** Each pin's witness as its case returned it; the record compares the whole set against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** Each pin's assertion count when its case reached its end (its witness comparison included), in run order: `${pin}:${count}`. */
const REACHED: string[] = [];

describe("wb-tz4r.3 RI native result provenance echo census (RI-UNIFIED-DECISION-INFERENCE-R3, absent-today leg)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:5", "C:4", "D:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect({
      bead: BEAD, quotePin: QUOTE_PIN, quote: QUOTE, gatingArtifacts: GATING_ARTIFACTS, fields: FIELDS, refKinds: REF_KIND, members: MEMBER, invocation: INVOCATION,
    }).toStrictEqual({
      bead: ROSTER.bead, quotePin: ROSTER.quotePin, quote: ROSTER.quote, gatingArtifacts: [...ROSTER.gatingArtifacts], fields: [...ROSTER.fields],
      refKinds: ROSTER.refKinds, members: ROSTER.members, invocation: ROSTER.invocation,
    });
    // The anchor outside this file and its roster: the owner filing in the tracked bead export.
    const { title, notes } = exportRow();
    const clauses = acceptanceClauses(notes);
    const acceptanceRows = ROWS.filter(row => /^\([a-d]\) /.test(row.label));
    expect(Object.keys(clauses)).toEqual(["a", "b", "c"]);
    expect(acceptanceRows.map(row => row.label)).toEqual(Object.entries(clauses).map(([letter, clause]) => `(${letter}) ${clause}`));
    expect(title.startsWith(`${PROGRAM_TAG} If Pi ever echoes a native decision result`)).toBe(true);
    expect(notes.includes(TRIGGER)).toBe(true);
    expect(ROWS[0]?.label.includes(TRIGGER)).toBe(true);
    expect(notes.includes(`'${QUOTE}' ${QUOTE_PIN}.`)).toBe(true);
    // The fields are exactly the items clause (a) lists, in its order, and each is the quote's own words, in the quote's order.
    const listed = /^adoption fixture: (.+?) travel verbatim /.exec(clauses.a ?? "")?.[1]?.split(/\/|, | and /) ?? [];
    const words = FIELDS.map(field => field.replace("_", " "));
    expect(listed).toStrictEqual(words);
    const inQuote = words.map(word => QUOTE.indexOf(word));
    expect(inQuote.every((at, index) => at >= 0 && (index === 0 || at > (inQuote[index - 1] ?? -1)))).toBe(true);
    expect(GATING_ARTIFACTS.filter(artifact => !notes.includes(artifact))).toStrictEqual([]);
    // THE PIN ANCHOR (wb-3xmr F1): each row's pin quotes, in pin order, tile its owner text - row A's the title's condition, rows
    // B-D's their clauses - with separator-only gaps, and dropping any one quote leaves its row's owner text untiled.
    const owner = ROWS.map(row => ownerTextOf(row, title, clauses));
    expect(owner.map(entry => entry.length > 0), "every row has its owner text").toEqual(ROWS.map(() => true));
    expect(ROWS.flatMap(row => row.pins).filter(pin => SEPARATOR.test(pin.quote)).map(pin => pin.id), "every quote names something").toEqual([]);
    expect(ROWS.map((row, index) => tiles(owner[index] ?? "", row.pins.map(pin => pin.quote)).untiled), "each row's quotes tile its owner text").toEqual(ROWS.map(() => []));
    const droppable = ROWS.flatMap((row, index) => row.pins.filter(pin => tiles(owner[index] ?? "", row.pins.filter(other => other !== pin).map(other => other.quote)).covered).map(pin => pin.id));
    expect(droppable, "a pin whose quote drops with its row's owner text still tiled").toEqual([]);
    // THE SELF-READ (wb-3xmr F2) over this file, and planted cases that show each refusal.
    expect(selfRead(SELF_TEXT), "this file's SELF-READ").toEqual([]);
    const planted: Record<string, string> = {
      "a trivial expect returning its roster witness (G3, G3b)": 'const IMPL = {\n  D3: async () => {\n    expect(true).toBe(true);\n    return rosterWitness("D3");\n  },\n};\n',
      "the witness through a helper": 'function handed(): unknown {\n  return rosterWitness("D3");\n}\nconst IMPL = {\n  D3: async () => {\n    expect(BASE).toBeDefined();\n    return handed();\n  },\n};\n',
      "the witness read after measuring": 'const IMPL = {\n  D3: async () => {\n    projections(CARRIER);\n    return ROSTER.rows[3]?.pins[2]?.witness;\n  },\n};\n',
      "a constant naming no reader": 'const IMPL = {\n  D3: async () => {\n    return { pasted: true };\n  },\n};\n',
    };
    expect(Object.fromEntries(Object.entries(planted).map(([name, source]) => [name, selfRead(source)]))).toStrictEqual({
      "a trivial expect returning its roster witness (G3, G3b)": ["IMPL.D3 names no reader", "IMPL.D3 names rosterWitness"],
      "the witness through a helper": ["handed names rosterWitness"],
      "the witness read after measuring": ["IMPL.D3 reads a witness", "IMPL.D3 reads ROSTER.rows"],
      "a constant naming no reader": ["IMPL.D3 names no reader"],
    });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const { id: pin } of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          MEASURED[pin] = witness;
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.push(`${pin}:${expect.getState().assertionCalls}`);
        });
      }
    });
  }

  it(RECORD_TITLE, ({ task }) => {
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
    expect(titles, "the judged title, one test per pin in row order, then this record").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins.map(pin => pin.id)), RECORD_TITLE]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    const texts = Object.entries(MEASURED).map(([pin, value]) => [pin, JSON.stringify(value)] as const);
    const shared = texts.filter(([pin, value]) => texts.some(([other, again]) => other !== pin && again === value)).map(([pin]) => pin);
    expect(shared, "no two pins share one witness (a case moved under another pin's id, its witness rewritten to match)").toEqual([]);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
