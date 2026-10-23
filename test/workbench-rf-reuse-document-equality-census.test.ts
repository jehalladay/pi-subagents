/**
 * wb-pfxo.4 (RF-COMPOSITIONAL-ASSEMBLY-R5, program-triage-2026-10-22), a posture census (no gating artifact). Statement (bead
 * notes, full form): "No Pi surface shall infer final-document equality or an unchanged context from a reused component output;
 * document equality is claimed only from rf's canonical digest or diff (replay-result final_document_digest and context.diff
 * changed rows, both present at the pin), since reuse 'does NOT imply final document equality if budget selection or order depends
 * on other changed components' (posture; no gating artifact)" - docs/programs/compositional-assembly-2026-10-18/README.md:56@6a251bf73af5.
 * Acceptance (owner filing, verbatim): "(a) fixture: a plan or render with reuse rows and no digest-equality field yields no
 * 'unchanged document' / 'identical context' claim; (b) any Pi equality claim names a producer digest field (final_document_digest
 * or a context.diff result) verbatim; (c) docs census: no sentence equates component reuse with document equality."
 *
 * MEASURED BY THE CUTTING SEAT (2026-10-23, installed rf 0.1.832 by `rf --json --version` result.version; a scratch workspace outside
 * every repository; only the scratch root is rewritten to /fixture/rf-workspace in the roster): `rf init`; two pure declarative
 * components, demo.alpha fed by a literal source and demo.beta by the task source; renders under model id m with --context-window
 * 100000 --max-output 16000. R1, a committed render, executed both (reused_component_count 0, rendered 2); beta's definition then
 * changed and was activated. REUSE, the --no-commit preview Pi reads, served alpha from the component-output cache
 * (reused_component_count 1, rendered 1) and its result.output.digest DIFFERS from R1's: the corollary's case, reuse with a changed
 * final document. R2 (committed) and FULL (--no-commit, reused 2, rendered 0) followed; FULL's document equals REUSE's although the
 * reuse counts differ. `rf context plan R1` planned alpha refresh_required and beta invalidated (this build's planner observes no
 * source, so a source-fed instance never plans reuse here); `rf context replay R2` answered outcome reproduced with
 * final_document_digest; `rf context diff R1 R2` classified alpha's block unchanged and beta's content_changed. On all four measured
 * renders sha256(result.output.text) differs from result.output.digest, the producer's canonical digest (the render schema's
 * RenderRecord.final_document_digest). Read-only `git rev-parse` at the pin on the local ReactiveFiberCLI checkout: the three schema
 * blobs the roster names (replay-result.json, final_document_digest :143; context.diff.json, block class unchanged :984;
 * context.plan.json, decision reuse :493) equal the installed copies byte for byte, and README.md:56 reads "Corollary: output reuse
 * is semantics-preserving for such components, provided cache keys cover all other inputs and observational metadata. It does NOT
 * imply final document equality if budget selection or order depends on other changed components."
 * CONSTRUCTED here from the measured envelopes, never from memory: PLAN_REUSE (the measured plan with alpha's row decided reuse, the
 * decision the plan schema's closed enum admits, summary moved to match), OBSERVED_REUSE (REUSE carrying two result.observations rows
 * in the pinned row shape, freshness reused and replayed true) and each preview's zero-reuse twin.
 *
 * Pi's rf readers are the reactivefiber.render.preview provider (providers/reactivefiber.ts: it spawns only `rf ... context render
 * --no-commit` and admits only context.render envelopes; its registered reading wraps the envelope verbatim) and the reader adapter
 * (reactivefiber-observer.ts). Neither reads result.work_metrics, result.components or result.output.digest; the adapter references
 * the context text by its own sha256 of output.text (nativePayloadRef rf-output:sha256:<hex>), a plain-text digest that the measured
 * renders show is never the producer's canonical digest. Pi reads no context.plan, context.replay or context.diff envelope today.
 *
 * THE CLAIM READING (one reading for the three legs; its vocabularies are held to the roster):
 * - FOLDED TEXT: n't spelled " not", NFKC, lower case, every run of characters outside [a-z0-9] one space.
 * - EQUALITY CLAIM: an EQUALITY_WORDS word and a DOCUMENT_NOUNS word, both whole folded words, at most WINDOW words apart in either
 *   order; the claim's window is the folded words from one before the first to one after the last.
 * - ADMITTED: the unit names a PRODUCER_FIELDS spelling verbatim (raw text) or carries a DENIALS phrase (folded, whole words).
 *   The reading does not tell an assertion from a negation worded otherwise: such a unit is refused (the conservative direction,
 *   C2 negationOtherWording), and is restated with a DENIALS phrase or a producer field.
 * - (a) every string Pi adds to a reading and every string the adapter surfaces carries no equality claim at all (no admission).
 * - (b) every string literal, no-substitution template and template expression (its literal parts joined by a space) of every .ts,
 *   .mjs and .js file under src/ and qa/: an equality claim that is not admitted is a finding unless the roster exempts its file and
 *   window (each exemption carries its reason; the live scan reports every exemption it applied).
 * - (c) every .md file under docs/, examples/ and new-feedback/ and at the repository root: blocks are maximal runs of non-blank
 *   lines, a block's lines are joined by a space and split after ., ! or ? followed by white space; a sentence carrying a REUSE_TERMS
 *   term and an equality claim that is not admitted is a finding.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}`; the whole judged set (every row's id, label and pins, every pin's
 * witness, the reading's vocabularies, the exemptions and the residuals) is held to the out-of-file roster
 * test/fixtures/rf-reuse-document-equality-roster.json, whose measured envelopes anchor the fixture facts outside this file. The
 * tracked bead export row (.beads/issues.jsonl, wb-pfxo.4) is a second outside anchor: its Acceptance clauses equal the ROWS labels
 * and it carries the citation, the corollary and both producer field names.
 * RESIDUALS (named; each with a pinned quiet row): R-NOUN equality stated over a noun outside DOCUMENT_NOUNS ("the rendered text is
 * identical") is not read (quiet rows B1 noun, C2 noun); R-WINDOW an equality word more than WINDOW words from the noun is not read
 * (C2 window); R-VOCABULARY an equality synonym outside EQUALITY_WORDS ("untouched") is not read (C2 vocabulary); R-LOOKALIKE a
 * look-alike letter or an inserted invisible inside a word splits it under the fold, so the word is not read (C2 lookalike and
 * invisible; fullwidth letters fold to ASCII and are read, C2 fullwidth); R-SPLIT a reuse term and an equality claim in different
 * sentences are never paired (C2 split); R-ADMIT-ANYWHERE a denial or a producer field anywhere in the unit admits it, whatever it
 * qualifies (C2 denialElsewhere and fieldElsewhere); R-COMPOSED a src or qa claim assembled at runtime from non-literal parts is
 * invisible to the literal scan (B1 composed; A3 still reads the composed text the adapter surfaces); R-TREES files outside the
 * scanned trees (test/, .beads/, dist/) and files of other extensions (qa's four .sh and one .json, any .cjs or .tsx) are not judged
 * (C1 and B1 name their roots); R-TEXT-REF the adapter's rf-output reference is a plain-text digest, so two equal references are
 * equal text only, the strictly weaker equality of README.md:51 - no Pi surface compares two references today and the lexical legs
 * would not see a comparison that states no equality word (A4).
 * THE TRIGGER, ABSENT TODAY: Pi reads no component-reuse counter, no plan, no replay and no diff (A3's zero-reuse twins project
 * identically; A5 and B3 refuse the other envelopes; B3 finds neither producer field spelled in src or qa). A cut that starts reading
 * one of them re-judges this census rather than editing a witness. Not claimed: an edit of this file and the roster together.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa, docs and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-reuse-document-equality-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-pfxo.4";
const ROOT = process.cwd();
/** The workspace root every measured envelope names (the scratch root, rewritten). */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];

/** The statement's citation, the corollary it quotes and the producer spellings that admit an equality claim (bead wb-pfxo.4). */
const CITATION = "docs/programs/compositional-assembly-2026-10-18/README.md:56@6a251bf73af5";
const COROLLARY = "It does NOT imply final document equality if budget selection or order depends on other changed components.";
const PRODUCER_FIELDS = ["final_document_digest", "context.diff", "rf context diff"];
/** The reading's vocabularies (folded whole words or phrases). */
const EQUALITY_WORDS = ["unchanged", "unmodified", "unaltered", "identical", "identically", "equal", "equals", "equality", "same", "equivalent", "equivalence", "equivalently"];
const DOCUMENT_NOUNS = ["document", "documents", "context", "contexts"];
const WINDOW = 3;
const REUSE_TERMS = ["reuse", "reused", "reuses", "reusing", "cache hit", "cache hits"];
const DENIALS = [
  "not imply", "not implies", "never imply", "never implies", "not mean", "not means", "never mean", "never means", "not infer", "never infer", "never infers",
  "not prove", "never prove", "never proves", "not establish", "never establish", "never establishes",
];
/** Keys that state equality from a digest or a diff: none may appear in a reuse fixture. */
const EQUALITY_KEYS = ["final_document_digest", "verdicts_equal", "outcome", "changed"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows, one per acceptance clause; their shape is pinned below and held to the roster and the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) fixture: a plan or render with reuse rows and no digest-equality field yields no 'unchanged document' / 'identical context' claim",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) any Pi equality claim names a producer digest field (final_document_digest or a context.diff result) verbatim",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) docs census: no sentence equates component reuse with document equality",
    pins: ["C1", "C2", "C3"],
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
interface MeasuredRender {
  readonly name: string;
  readonly reused: number;
  readonly rendered: number;
  readonly text: string;
  readonly digest: string;
}
interface Exemption {
  readonly file: string;
  readonly window: string;
  readonly reason: string;
}
interface Residual {
  readonly id: string;
  readonly quietPins: readonly string[];
}
interface Reading {
  readonly equality: readonly string[];
  readonly nouns: readonly string[];
  readonly window: number;
  readonly reuse: readonly string[];
  readonly denials: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly rfVersion: string;
  readonly pin: string;
  readonly citation: string;
  readonly corollary: string;
  readonly producerFields: readonly string[];
  readonly reading: Reading;
  readonly exemptions: readonly Exemption[];
  readonly residuals: readonly Residual[];
  readonly measuredRenders: readonly MeasuredRender[];
  readonly envelopes: { readonly reuse: Envelope; readonly full: Envelope; readonly plan: Envelope; readonly replay: Envelope; readonly diff: Envelope };
  readonly rows: readonly RosterRow[];
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
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error(`roster ${field} must be a non-negative integer`);
  return value;
}

/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  if (!isObject(value)) throw new Error(`roster envelope ${name} must be an object`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = value;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || workspace.root !== FIXTURE_ROOT) throw new Error(`roster envelope ${name} needs the fixture workspace`);
  if (transactionId !== null || !Object.hasOwn(value, "result") || !Array.isArray(diagnostics)) throw new Error(`roster envelope ${name} needs a null transaction, a result and diagnostics`);
  return {
    schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null,
    result: json(result), diagnostics: diagnostics.map(json),
  };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.reading)) throw new Error("roster must be an object with rows, envelopes and a reading");
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
  const { reading } = raw;
  const exemptions = (Array.isArray(raw.exemptions) ? raw.exemptions : [null]).map((entry: unknown, index: number): Exemption => {
    if (!isObject(entry)) throw new Error(`roster exemptions[${index}] must be an object`);
    return { file: text(entry.file, `exemptions[${index}].file`), window: text(entry.window, `exemptions[${index}].window`), reason: text(entry.reason, `exemptions[${index}].reason`) };
  });
  const residuals = (Array.isArray(raw.residuals) ? raw.residuals : [null]).map((entry: unknown, index: number): Residual => {
    if (!isObject(entry)) throw new Error(`roster residuals[${index}] must be an object`);
    return { id: text(entry.id, `residuals[${index}].id`), quietPins: strings(entry.quietPins, `residuals[${index}].quietPins`) };
  });
  const measuredRenders = (Array.isArray(raw.measuredRenders) ? raw.measuredRenders : [null]).map((entry: unknown, index: number): MeasuredRender => {
    if (!isObject(entry)) throw new Error(`roster measuredRenders[${index}] must be an object`);
    return {
      name: text(entry.name, `measuredRenders[${index}].name`), reused: count(entry.reused, `measuredRenders[${index}].reused`),
      rendered: count(entry.rendered, `measuredRenders[${index}].rendered`), text: text(entry.text, `measuredRenders[${index}].text`),
      digest: text(entry.digest, `measuredRenders[${index}].digest`),
    };
  });
  return {
    bead: text(raw.bead, "bead"), rfVersion: text(raw.rfVersion, "rfVersion"), pin: text(raw.pin, "pin"), citation: text(raw.citation, "citation"),
    corollary: text(raw.corollary, "corollary"), producerFields: strings(raw.producerFields, "producerFields"),
    reading: {
      equality: strings(reading.equality, "reading.equality"), nouns: strings(reading.nouns, "reading.nouns"), window: count(reading.window, "reading.window"),
      reuse: strings(reading.reuse, "reading.reuse"), denials: strings(reading.denials, "reading.denials"),
    },
    exemptions, residuals, measuredRenders,
    envelopes: {
      reuse: envelopeOf(raw.envelopes.reuse, "reuse"), full: envelopeOf(raw.envelopes.full, "full"), plan: envelopeOf(raw.envelopes.plan, "plan"),
      replay: envelopeOf(raw.envelopes.replay, "replay"), diff: envelopeOf(raw.envelopes.diff, "diff"),
    },
    rows,
  };
}

const ROSTER = readRoster();
const { reuse: REUSE, full: FULL, plan: PLAN, replay: REPLAY, diff: DIFF } = ROSTER.envelopes;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
function measured(name: string): MeasuredRender {
  const found = ROSTER.measuredRenders.find(render => render.name === name);
  if (found === undefined) throw new Error(`the roster holds no measured render ${name}`);
  return found;
}
function resultOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.result, `${envelope.command} result`);
}
function workMetricsOf(envelope: Envelope): JsonObject {
  return objectOf(resultOf(envelope).work_metrics, `${envelope.operation_id} work_metrics`);
}
function outputOf(envelope: Envelope): JsonObject {
  return objectOf(resultOf(envelope).output, `${envelope.operation_id} output`);
}
/** A plan envelope's rows, each an object. */
function planRowsOf(envelope: Envelope): JsonObject[] {
  const rows = objectOf(resultOf(envelope).plan, `${envelope.operation_id} plan`).rows;
  return (Array.isArray(rows) ? rows : []).map((row, index) => objectOf(row, `${envelope.operation_id} plan row ${index}`));
}
/** A deep copy of an envelope with `edit` applied to its copied result. */
function variant(envelope: Envelope, edit: (result: JsonObject) => void): Envelope {
  const copy = envelopeOf(json(envelope), `${envelope.operation_id} variant`);
  edit(objectOf(copy.result, "variant result"));
  return copy;
}

/** PLAN_REUSE: the measured plan with alpha's row decided reuse (no cause) and the summary moved to match. */
const PLAN_REUSE = variant(PLAN, result => {
  const rows = objectOf(result.plan, "plan").rows;
  const alpha = objectOf(Array.isArray(rows) ? rows[0] : undefined, "plan row 0");
  alpha.decision = "reuse";
  alpha.causes = [];
  const summary = objectOf(result.summary, "plan summary");
  summary.reuse = 1;
  summary.refresh_required = 0;
});
/** OBSERVED_REUSE: REUSE carrying two observation rows in the pinned row shape, each reused and replayed. */
const OBSERVED_REUSE = variant(REUSE, result => {
  result.observations = [
    { status: "observed", freshness: "reused", replayed: true },
    { status: "observed", freshness: "reused", replayed: true },
  ];
});
/** A preview's zero-reuse twin: every reused component counted as rendered instead. */
function zeroReuse(envelope: Envelope): Envelope {
  return variant(envelope, result => {
    const metrics = objectOf(result.work_metrics, "work_metrics");
    metrics.rendered_component_count = Number(metrics.rendered_component_count) + Number(metrics.reused_component_count);
    metrics.reused_component_count = 0;
  });
}
const PREVIEWS: readonly (readonly [string, Envelope])[] = [["reuse", REUSE], ["full", FULL], ["observedReuse", OBSERVED_REUSE]];
const PLANS: readonly (readonly [string, Envelope])[] = [["plan", PLAN], ["planReuse", PLAN_REUSE]];

/** Folded text: n't spelled " not", NFKC, lower case, every run outside [a-z0-9] one space. */
function fold(value: string): string {
  return value.replace(/n['\u2019]t\b/gi, " not").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function words(value: string): string[] {
  const folded = fold(value);
  return folded === "" ? [] : folded.split(" ");
}
function hasPhrase(folded: string, phrase: string): boolean {
  return ` ${folded} `.includes(` ${phrase} `);
}
/** Every equality claim of a text: the folded window around an equality word with a document noun at most WINDOW words away. */
function equalityClaims(value: string): string[] {
  const list = words(value);
  const claims: string[] = [];
  list.forEach((word, index) => {
    if (!EQUALITY_WORDS.includes(word)) return;
    for (let other = Math.max(0, index - WINDOW); other <= Math.min(list.length - 1, index + WINDOW); other += 1) {
      if (other === index || !DOCUMENT_NOUNS.includes(list[other] ?? "")) continue;
      claims.push(list.slice(Math.max(0, Math.min(index, other) - 1), Math.max(index, other) + 2).join(" "));
      return;
    }
  });
  return claims;
}
function admitted(value: string): boolean {
  const folded = fold(value);
  return PRODUCER_FIELDS.some(field => value.includes(field)) || DENIALS.some(denial => hasPhrase(folded, denial));
}
function reuseTerm(value: string): boolean {
  const folded = fold(value);
  return REUSE_TERMS.some(term => hasPhrase(folded, term));
}

/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Every key a JSON value holds, at any depth. */
function keysOf(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(keysOf);
  if (isObject(value)) return Object.entries(value).flatMap(([key, child]) => [key, ...keysOf(child)]);
  return [];
}
function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

/** Every regular file below a root (symlinks are not followed; dot, node_modules and dist directories are skipped). */
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
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "dist") files.push(...filesBelow(path));
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

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

/** A stand-in `rf` first on PATH: every spawn appends its argv to the returned log, prints `answer` and exits `exit`. */
function standInRf(answer: JsonValue, exit: number): string {
  const folder = makeScratch("rf-reuse-document-equality-");
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

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against a stand-in rf answering `envelope`. */
async function nativeOutcome(envelope: Envelope): Promise<NativeOutcome> {
  const log = standInRf(json(envelope), 0);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, FIXTURE_ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}
/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`. */
async function injectedReading(envelope: Envelope): Promise<{ reading: JsonValue; calls: number }> {
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope;
  }, FIXTURE_ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source };
}
/** What the registered reading adds to `envelope`: it must wrap it byte for byte and add only the contract and the root. */
function addedBy(reading: JsonValue, envelope: Envelope): string[] {
  expect(reading).toStrictEqual(readingOf(json(envelope)));
  const wrapper = objectOf(reading, "reading");
  expect(JSON.stringify(wrapper.source)).toBe(JSON.stringify(envelope));
  return Object.entries(wrapper).filter(([key]) => key !== "source").flatMap(([, value]) => stringLeaves(value));
}

const SEAMS: readonly ReactiveFiberSeam[] = ["rf-cli", "injected-fixture"];
function observerContext(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return {
    scope: { workspace: ROOT, principal: "local-operator:tester" }, seam, authorizedRfRoot: FIXTURE_ROOT,
    capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
  };
}
function projectionOf(envelope: Envelope, seam: ReactiveFiberSeam): ReturnType<typeof reactivefiberTopology> {
  return reactivefiberTopology(readingOf(json(envelope)), observerContext(seam));
}
function adapterRefusal(envelope: Envelope): { category: string; message: string } {
  let caught: unknown;
  try {
    projectionOf(envelope, "rf-cli");
  } catch (error) {
    caught = error;
  }
  return refusalOf(caught);
}

let nativeDescriptorTexts: Promise<{ ids: string[]; texts: string[] }> | undefined;
/** The native registration's descriptors, loaded once: the ids and each descriptor's JSON text. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[] }> {
  nativeDescriptorTexts ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return { ids: descriptors.map(descriptor => descriptor.id), texts: descriptors.map(descriptor => JSON.stringify(descriptor)) };
  });
  return nativeDescriptorTexts;
}

interface LiteralScan {
  readonly literals: number;
  readonly findings: string[];
  readonly exempted: string[];
}
/** One module's literals judged by the claim reading: a claim that is neither admitted nor exempted (file and window) is a finding. */
function scanLiterals(fileName: string, source: string): LiteralScan {
  const kind = extname(fileName) === ".ts" ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const tree = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, kind);
  const findings: string[] = [];
  const exempted: string[] = [];
  let literals = 0;
  const judge = (value: string): void => {
    literals += 1;
    if (admitted(value)) return;
    for (const claim of equalityClaims(value)) {
      if (ROSTER.exemptions.some(exemption => exemption.file === fileName && exemption.window === claim)) exempted.push(`${fileName}: ${claim}`);
      else findings.push(`${fileName}: ${claim}`);
    }
  };
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) judge(node.text);
    else if (ts.isTemplateExpression(node)) judge([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return { literals, findings, exempted };
}

interface CodeRoot {
  readonly root: string;
  readonly fileFloor: number;
  readonly literalFloor: number;
  readonly anchorFile: string;
  readonly anchorLiteral: string;
}
/** The trees whose literals could surface a claim; each floor sits below the count measured at base 2390203 (src 115 code files and
 * 11461 literals, qa 62 and 4429), so an emptied walk reds and an additive change does not. */
const CODE_ROOTS: readonly CodeRoot[] = [
  { root: "src", fileFloor: 100, literalFloor: 10000, anchorFile: "src/workbench/providers/reactivefiber.ts", anchorLiteral: "RF preview returned an unrecognized native envelope." },
  { root: "qa", fileFloor: 50, literalFloor: 4000, anchorFile: "qa/workbench/receipts-index.mjs", anchorLiteral: "docs/workbench/receipts" },
];
function scanCodeRoot(scan: CodeRoot): JsonValue {
  const files = filesBelow(join(REPO, scan.root)).filter(file => /\.(?:ts|mjs|js)$/.test(file));
  const results = files.map(file => {
    const name = relative(REPO, file);
    return { name, ...scanLiterals(name, textOf(file)) };
  });
  const literals = results.reduce((sum, result) => sum + result.literals, 0);
  const anchorRead = results.some(result => result.name === scan.anchorFile) && textOf(join(REPO, scan.anchorFile)).includes(scan.anchorLiteral);
  const findings = results.flatMap(result => result.findings);
  const exempted = results.flatMap(result => result.exempted);
  expect(files.length, `${scan.root}: ${files.length} code files walked, floor ${scan.fileFloor}`).toBeGreaterThanOrEqual(scan.fileFloor);
  expect(literals, `${scan.root}: ${literals} literals read, floor ${scan.literalFloor}`).toBeGreaterThanOrEqual(scan.literalFloor);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with its literal`).toBe(true);
  expect(findings, `${scan.root}: equality claims naming no producer field`).toEqual([]);
  return { root: scan.root, fileFloorMet: true, literalFloorMet: true, anchorRead, findings, exempted };
}

interface SentenceScan {
  readonly sentences: number;
  readonly reuseSentences: number;
  readonly findings: string[];
}
/** One markdown text's sentences judged by (c): a sentence with a reuse term and an unadmitted equality claim is a finding. */
function scanSentences(fileName: string, source: string): SentenceScan {
  const findings: string[] = [];
  let sentences = 0;
  let reuseSentences = 0;
  for (const block of source.split(/\n[ \t]*\n/)) {
    const joined = block.split("\n").map(line => line.trim()).join(" ");
    for (const sentence of joined.split(/(?<=[.!?])\s+/)) {
      if (sentence.trim() === "") continue;
      sentences += 1;
      if (!reuseTerm(sentence)) continue;
      reuseSentences += 1;
      if (admitted(sentence)) continue;
      for (const claim of equalityClaims(sentence)) findings.push(`${fileName}: ${claim}`);
    }
  }
  return { sentences, reuseSentences, findings };
}
/** The markdown the docs census reads: every .md below docs/, examples/ and new-feedback/, and every .md at the repository root.
 * C1's floors sit below the counts measured at base 2390203 (89 files, 7542 sentences, 40 reuse sentences). */
const DOC_ROOTS = ["docs", "examples", "new-feedback"];
function docFiles(): string[] {
  const rootLevel = readdirSync(REPO, { withFileTypes: true }).filter(entry => entry.isFile() && entry.name.endsWith(".md")).map(entry => join(REPO, entry.name));
  return [...DOC_ROOTS.flatMap(root => filesBelow(join(REPO, root))).filter(file => file.endsWith(".md")), ...rootLevel].sort();
}

/** The tracked bead export's row for this bead, parsed. */
function exportRow(): JsonObject {
  for (const line of textOf(EXPORT_PATH).split("\n")) {
    if (!line.includes(`"${BEAD}"`)) continue;
    const row = JSON.parse(line) as JsonValue;
    if (isObject(row) && row.id === BEAD) return objectOf(row, `${BEAD} export row`);
  }
  throw new Error(`the bead export holds no row ${BEAD}`);
}
/** The owner filing's acceptance clauses, split from its "Acceptance:" sentence up to "Related:". */
function acceptanceClauses(notes: string): string[] {
  const start = notes.indexOf("Acceptance: ");
  const end = notes.indexOf(" Related:", start);
  if (start < 0 || end < 0) throw new Error(`${BEAD} notes carry no Acceptance ... Related: span`);
  return notes.slice(start + "Acceptance: ".length, end).replace(/\.$/, "").split(/; (?=\([a-z]\) )/);
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const r1 = measured("R1");
    const reuse = measured("REUSE");
    const full = measured("FULL");
    const reused = PREVIEWS.map(([name, envelope]) => [name, Number(workMetricsOf(envelope).reused_component_count)] as const);
    const decisions = PLANS.map(([name, envelope]) => [name, planRowsOf(envelope).map(row => String(row.decision))] as const);
    const fixtures = [...PREVIEWS, ...PLANS];
    const equalityKeys = fixtures.flatMap(([name, envelope]) => keysOf(envelope.result).filter(key => EQUALITY_KEYS.includes(key)).map(key => `${name}: ${key}`));
    // The producer's own corollary case: REUSE reused a component and its document differs from R1's; FULL reused more and equals REUSE.
    expect(reuse.reused).toBeGreaterThan(0);
    expect(reuse.digest).not.toBe(r1.digest);
    expect(full.digest).toBe(reuse.digest);
    expect(full.reused).not.toBe(reuse.reused);
    expect(outputOf(REUSE).digest).toBe(reuse.digest);
    expect(outputOf(FULL).digest).toBe(full.digest);
    expect(fixtures.map(([, envelope]) => envelope.command)).toEqual(["context.render", "context.render", "context.render", "context.plan", "context.plan"]);
    expect(equalityKeys).toEqual([]);
    return {
      reused: Object.fromEntries(reused), decisions: Object.fromEntries(decisions), reuseDocumentDiffersFromBase: reuse.digest !== r1.digest,
      fullDocumentEqualsReuse: full.digest === reuse.digest, reuseCounts: [r1.reused, reuse.reused, full.reused], equalityKeys,
    };
  },
  A2: async () => {
    const added: JsonObject = {};
    for (const [name, envelope] of [...PREVIEWS, ...PLANS]) {
      const { reading, calls } = await injectedReading(envelope);
      expect(calls).toBe(1);
      added[name] = addedBy(reading, envelope);
    }
    const native: JsonObject = {};
    for (const [name, envelope] of PREVIEWS) {
      const outcome = await nativeOutcome(envelope);
      expect(outcome.refusal).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      expect(outcome.spawns[0]?.slice(2, 4)).toEqual(["context", "render"]);
      native[name] = outcome.reading === null ? null : addedBy(outcome.reading, envelope);
    }
    const claims = stringLeaves([added, native]).flatMap(equalityClaims);
    expect(claims).toEqual([]);
    return { injected: added, native, claims };
  },
  A3: async () => {
    const surfaced: JsonObject = {};
    const claims: string[] = [];
    const reuseMovesNothing: JsonObject = {};
    for (const [name, envelope] of PREVIEWS) {
      for (const seam of SEAMS) {
        const topology = projectionOf(envelope, seam);
        const snapshot = topology.snapshots[0];
        claims.push(...stringLeaves(json(topology)).flatMap(equalityClaims));
        surfaced[`${name}/${seam}`] = { coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null, diagnostics: [...topology.diagnostics] };
        reuseMovesNothing[`${name}/${seam}`] = JSON.stringify(json(projectionOf(zeroReuse(envelope), seam))) === JSON.stringify(json(topology));
      }
    }
    expect(claims).toEqual([]);
    expect(Object.values(reuseMovesNothing).every(Boolean)).toBe(true);
    return { surfaced, claims, reuseMovesNothing };
  },
  A4: async () => {
    const ref = (envelope: Envelope): string | null => projectionOf(envelope, "rf-cli").snapshots[0]?.nativePayloadRef ?? null;
    const reuse = measured("REUSE");
    const baseText = variant(REUSE, result => {
      objectOf(result.output, "output").text = measured("R1").text;
    });
    const textDigestIsProducerDigest = ROSTER.measuredRenders.map(render => [render.name, sha256(render.text) === render.digest] as const);
    const producerDigests = [REUSE, FULL].map(envelope => String(outputOf(envelope).digest).replace(/^sha256:/, ""));
    const surfaced = PREVIEWS.flatMap(([, envelope]) => stringLeaves(json(projectionOf(envelope, "rf-cli"))));
    const producerDigestNamed = surfaced.some(value => producerDigests.some(digest => value.includes(digest)));
    expect(ref(REUSE)).toBe(`rf-output:${sha256(reuse.text)}`);
    expect(ref(FULL)).toBe(ref(REUSE));
    expect(ref(baseText)).not.toBe(ref(REUSE));
    expect(textDigestIsProducerDigest.every(([, same]) => !same)).toBe(true);
    expect(producerDigestNamed).toBe(false);
    return {
      refFollowsText: ref(REUSE) === `rf-output:${sha256(reuse.text)}`, equalTextEqualRefAcrossReuseCounts: ref(FULL) === ref(REUSE),
      otherTextOtherRef: ref(baseText) !== ref(REUSE), textDigestIsProducerDigest: Object.fromEntries(textDigestIsProducerDigest), producerDigestNamed,
    };
  },
  A5: async () => {
    const outcomes: JsonObject = {};
    const messages: string[] = [];
    for (const [name, envelope] of PLANS) {
      const native = await nativeOutcome(envelope);
      const adapter = adapterRefusal(envelope);
      expect(native.reading).toBeNull();
      expect(native.spawns).toHaveLength(1);
      messages.push(native.refusal?.message ?? "", adapter.message);
      outcomes[name] = { native: native.refusal, spawns: native.spawns.length, adapter };
    }
    const claims = messages.flatMap(equalityClaims);
    expect(claims).toEqual([]);
    return { outcomes, claims };
  },
  B1: async () => {
    const roots = CODE_ROOTS.map(scanCodeRoot);
    const control = (fileName: string, source: string): number => scanLiterals(fileName, source).findings.length;
    const exemption = ROSTER.exemptions[0];
    const exemptLiteral = `const source = "${exemption?.window ?? ""}";`;
    const controls = {
      claim: control("control.ts", 'const note = "reused components: the document is unchanged";'),
      template: control("control.ts", ["const note = `context unchanged after $", "{n} reused components`;"].join("")),
      javascript: control("control.mjs", 'console.log("the same context, every component reused");'),
      field: control("control.ts", 'const note = "final_document_digest matched: the document is unchanged";'),
      diff: control("control.ts", 'const note = "context.diff: every block unchanged, an identical context";'),
      denial: control("control.ts", 'const note = "component reuse does not imply an unchanged document";'),
      exemptOwnFile: control(exemption?.file ?? "", exemptLiteral),
      exemptElsewhere: control("control.ts", exemptLiteral),
      composed: control("control.ts", 'const state = "unchanged"; const note = "the document " + state;'),
      noun: control("control.ts", 'const note = "reuse keeps the rendered text identical";'),
    };
    return { roots, controls };
  },
  B2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), FIXTURE_ROOT);
    const { ids, texts } = await nativeDescriptors();
    const nativeRf = ids.filter(id => id.startsWith("reactivefiber."));
    const injectedEntries = injected.catalogSnapshot().map(entry => entry.descriptor);
    const injectedRf = injectedEntries.map(descriptor => descriptor.id).filter(id => id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const claims = [...texts, ...injectedEntries.map(descriptor => JSON.stringify(descriptor))].flatMap(equalityClaims);
    expect(nativeRf).toStrictEqual([PREVIEW_ID]);
    expect(injectedRf).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(claims).toEqual([]);
    return { native: nativeRf, injected: injectedRf, reconcile, descriptorsRead: texts.length >= 1, claims };
  },
  B3: async () => {
    const replay = resultOf(REPLAY);
    const blocks = Array.isArray(resultOf(DIFF).blocks) ? (resultOf(DIFF).blocks as JsonValue[]) : [];
    const classes = blocks.map(block => String(objectOf(block, "diff block").class));
    const refusals: JsonObject = {};
    for (const [name, envelope] of [["replay", REPLAY], ["diff", DIFF]] as const) {
      const native = await nativeOutcome(envelope);
      expect(native.reading).toBeNull();
      expect(native.spawns).toHaveLength(1);
      refusals[name] = { native: native.refusal, adapter: adapterRefusal(envelope) };
    }
    const spellers = CODE_ROOTS.flatMap(scan => filesBelow(join(REPO, scan.root)).filter(file => /\.(?:ts|mjs|js)$/.test(file)))
      .filter(file => ["final_document_digest", "context.diff"].some(field => textOf(file).includes(field))).map(file => relative(REPO, file));
    expect([REPLAY.command, DIFF.command]).toEqual(["context.replay", "context.diff"]);
    expect(replay.outcome).toBe("reproduced");
    expect(replay.final_document_digest).toBe(measured("R2").digest);
    expect(classes).toContain("unchanged");
    expect(spellers).toEqual([]);
    return {
      commands: [REPLAY.command, DIFF.command], replayOutcome: replay.outcome ?? null, replayDigestIsR2Digest: replay.final_document_digest === measured("R2").digest,
      diffClasses: classes, refusals, srcAndQaSpellers: spellers,
    };
  },
  C1: async () => {
    const files = docFiles();
    const results = files.map(file => ({ name: relative(REPO, file), ...scanSentences(relative(REPO, file), textOf(file)) }));
    const sentences = results.reduce((sum, result) => sum + result.sentences, 0);
    const reuseSentences = results.reduce((sum, result) => sum + result.reuseSentences, 0);
    const anchor = results.find(result => result.name === "docs/workbench/07-native-integrations.md");
    const findings = results.flatMap(result => result.findings);
    expect(files.length, `${files.length} markdown files read`).toBeGreaterThanOrEqual(80);
    expect(sentences, `${sentences} sentences read`).toBeGreaterThanOrEqual(7000);
    expect(reuseSentences, `${reuseSentences} reuse sentences read`).toBeGreaterThanOrEqual(10);
    expect(anchor?.reuseSentences ?? 0, "docs/workbench/07-native-integrations.md carries the reuse/cache evidence sentence").toBeGreaterThanOrEqual(1);
    expect(findings, "sentences equating component reuse with document equality").toEqual([]);
    return { roots: [...DOC_ROOTS, "<repository root>"], fileFloorMet: true, sentenceFloorMet: true, reuseSentenceFloorMet: true, anchorRead: true, findings };
  },
  C2: async () => {
    const control = (source: string): number => scanSentences("control.md", source).findings.length;
    // Built at runtime (standing rule 5): fullwidth letters fold to ASCII under NFKC; an in-word look-alike or invisible splits the word.
    const fullwidth = (word: string): string => String.fromCodePoint(...[...word].map(letter => (letter.codePointAt(0) ?? 0) + 0xfee0));
    const lookalike = `unchang${String.fromCodePoint(0x0435)}d`;
    const invisible = `docu${String.fromCodePoint(0x200b)}ment`;
    return {
      refused: control("Component reuse means the document is unchanged."),
      cacheHit: control("A cache hit leaves the context identical."),
      plural: control("Reused component outputs make the final documents equal."),
      contraction: control("Reuse means the context is unchanged, so the agent doesn't re-read it."),
      negationOtherWording: control("Reuse never yields an unchanged document."),
      denial: control("Component reuse does NOT imply final document equality."),
      contractedDenial: control("Reuse doesn't imply an unchanged document."),
      field: control("Document equality is read from final_document_digest, never from reuse."),
      diff: control("Only context.diff tells an unchanged context from a reused component."),
      split: control("Alpha was reused. The document is unchanged."),
      noun: control("Reuse keeps the rendered text identical."),
      window: control("Reuse leaves the context, after every component ran, the same."),
      vocabulary: control("Reuse leaves the document untouched."),
      denialElsewhere: control("Reuse means the document is unchanged; it does not imply a new render."),
      fieldElsewhere: control("Unlike final_document_digest, reuse proves the context unchanged."),
      fullwidth: control(`Reuse means the document is ${fullwidth("unchanged")}.`),
      lookalike: control(`Reuse means the document is ${lookalike}.`),
      invisible: control(`Reuse means the ${invisible} is unchanged.`),
    };
  },
  C3: async () => {
    const row = exportRow();
    const notes = typeof row.notes === "string" ? row.notes : "";
    const clauses = acceptanceClauses(notes);
    const carried = { citation: notes.includes(CITATION), corollary: notes.includes(COROLLARY), fields: PRODUCER_FIELDS.slice(0, 2).every(field => notes.includes(field)) };
    expect(clauses).toEqual(ROWS.map(entry => entry.label));
    expect(carried).toStrictEqual({ citation: true, corollary: true, fields: true });
    return { clauses: clauses.length, labelsEqual: ROWS.map(entry => entry.id), ...carried };
  },
};

describe("wb-pfxo.4 rf reuse is never document equality census (RF-COMPOSITIONAL-ASSEMBLY-R5)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:3", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ bead: BEAD, citation: CITATION, corollary: COROLLARY, producerFields: PRODUCER_FIELDS }).toStrictEqual({
      bead: ROSTER.bead, citation: ROSTER.citation, corollary: ROSTER.corollary, producerFields: [...ROSTER.producerFields],
    });
    expect({ equality: EQUALITY_WORDS, nouns: DOCUMENT_NOUNS, window: WINDOW, reuse: REUSE_TERMS, denials: DENIALS }).toStrictEqual({
      equality: [...ROSTER.reading.equality], nouns: [...ROSTER.reading.nouns], window: ROSTER.reading.window, reuse: [...ROSTER.reading.reuse], denials: [...ROSTER.reading.denials],
    });
    expect(ROSTER.exemptions.map(exemption => `${exemption.file}: ${exemption.window}`)).toEqual(["src/workflow/worker-source.ts: this same vm context which"]);
    const pins = ROWS.flatMap(row => row.pins);
    expect(ROSTER.residuals.map(residual => residual.id)).toEqual(["R-NOUN", "R-WINDOW", "R-VOCABULARY", "R-LOOKALIKE", "R-SPLIT", "R-ADMIT-ANYWHERE", "R-COMPOSED", "R-TREES", "R-TEXT-REF"]);
    expect(ROSTER.residuals.every(residual => residual.quietPins.length > 0 && residual.quietPins.every(pin => pins.includes(pin)))).toBe(true);
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
});
