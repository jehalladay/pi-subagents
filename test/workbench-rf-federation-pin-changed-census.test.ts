/**
 * wb-tnz5.5 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R6), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * drives or relays rf renders and publications over federated receipts (gated FW-CFRR-04b, rfc-bak67.11 and rfc-bak67.14: not
 * shipped at the pin), it shall treat RF_FEDERATION_PIN_CHANGED as an exit-4-class refusal after which no publication is
 * recorded, echo the producer's pin witness (r1) and pinnedReceiptIdentity verbatim, and never re-tag output computed at an older
 * pinned receipt as a newer one (F(old) as F(new)) nor label it fresh." (certified-federated-reactive-refinement-2026-10-18/
 * BEADS-2026-10-21.md:46@6a251bf73af5). Acceptance: "(a) an rf commit returning RF_FEDERATION_PIN_CHANGED is a non-success
 * refusal carrying the code verbatim; no Pi surface records a publication for it and Pi reconciles, never blind-retries
 * (wb-jwc.5); (b) Pi echoes the pin witness (r1) verbatim, never the newer receipt identity; (c) a publication pinned at r1
 * arriving after r2's acceptance renders r1-pinned (or aborts), never r2; no Pi path rewrites pinnedReceiptIdentity or adds a
 * fresh label."
 *
 * THE PRODUCER CONTRACT AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read with read-only git show): BEADS-2026-10-21.md:46
 * (rfc-bak67.14) "begin render at r1; accept r2; commit -> refusal code RF_FEDERATION_PIN_CHANGED (exit 4 class); the manifest
 * count is unchanged"; 02-concrete-contract-and-verification-gates.md:18 "FederatedPublication=(pinnedReceiptIdentity,
 * outputStatus,outputDigestOrValue,publishTransaction,visibleEvidence)", :20 "it must never retag F(old) as F(new)", :29 "on
 * completion publish with *that* receipt identity. If policy forbids older output, abort/retry rather than silently labeling old
 * output fresh", :37 "the publication must name r1 or visibly abort. Never name r2 with output calculated from r1".
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-23; its installed package read
 * read-only): no file spells RF_FEDERATION_PIN_CHANGED, pinnedReceiptIdentity or FederatedPublication (no RF_FEDERATION literal at
 * all), so the code is unshipped there too. rf's exit 4 is its conflict and currentness class; the shipped row nearest this
 * refusal is RF_DEFINITION_CHANGED_DURING_RENDER (domain/diagnostics.py:2283: exit 4, family TXN, hint required, metadata the
 * LXDXDOC-A5 five record_type, record_id, expected_revision, current_revision, refresh_command; diagnostics.py:1386-1387 "no
 * automatic retry ever applies to them"), built by application/render.py:1539 _changed_diagnostic (refresh_command "rf status --json",
 * source "host"). rf's envelope states transaction_id iff a transaction committed (cli/output.py:589), so a commit refusal that
 * changed nothing carries null and a committed render an rft_ id.
 * THE FIXTURE (test/fixtures/rf-federation-pin-changed-roster.json) is CONSTRUCTED, never measured, since no rf emits the code:
 * `pinChanged` is a context.render failure envelope (ok false, result null, transaction_id null) whose one error diagnostic
 * carries the code in that analogue's shape, the pin witness r1 as expected_revision and the newer accepted receipt r2 as
 * current_revision; `publication` is the r1-pinned record with the five fields spelled as 02-concrete:18 states them (the result
 * key it rides under, federated_publication, is this census's choice: rf has no wire spelling at the pin). Two envelopes carry it,
 * both built from the full-shape fixture: a COMMITTED render (transaction_id, render_id and commit_seq stated, ephemeral false),
 * the publication itself, and the noncommitted preview Pi does relay, as the relay probe.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). It spawns only `rf ... context
 * render ... --no-commit --no-input --json`, maps every RF_ failure envelope to the typed refusal unavailable "RF render refused:
 * <code>" and admits only the noncommitted preview shape, so Pi drives and relays no rf publication today: the statement's
 * trigger has not fired. The census pins that absence and every surface the obligation already reaches:
 *  A, the trigger, absent today. A1 an AST scan of every src module: the one rf render argv carries --no-commit, the one rf launch
 *    is the provider's, no literal spells an uncommitted render or a commit-time flag, with five controls; A2 a stand-in rf on PATH
 *    sees --no-commit on both input arms; A3 the rf roster stays the read preview (native and injected registrations, carrier
 *    contractSource, RECONCILE_EVIDENCE_READS.reactivefiber at src/workflow/reconcile.ts:67); A4 no src or qa file spells the
 *    pin-change vocabulary (floors and anchors per root).
 *  B, acceptance (a). B1 the fixture: the code, the analogue's metadata keys, r1 at expected_revision, r2 at current_revision, exit
 *    4 and the unshipped status ride the roster; B2 the native typed refusal at exit 4 names the code verbatim, one spawn, no
 *    reading; B3 it is held to a nonzero exit (exit 0 is a contradiction, exit 7 reads as exit 4); B4 a stand-in that would answer
 *    a second spawn with a live render is never re-spawned; B5 the adapter's projection is a failure carrying no value; B6 the
 *    injected reading relays the envelope byte for byte; B7 a test-only committing stand-in (non-read effect class, its own
 *    permission, Pi's own reader behind it) surfaces uncertain-effect naming the code and the reconcile directive; B8 a workflow
 *    run of it journals a dispatched marker and a settled row with no value, and its resume refuses to re-run it (0 spawns); B9 a
 *    workflow run of the read preview journals a failed read with no value.
 *  C, acceptance (b). C1 the relayed reading carries r1 at expected_revision and r2 only at current_revision, both verbatim; C2 the
 *    native typed refusal and C3 the adapter's surfaced strings name neither receipt.
 *  D, acceptance (c). D1 the native reader aborts the committed r1-pinned publication; D2 the adapter refuses a reading carrying
 *    it; D3 the noncommitted relay probe comes back byte for byte through both seams, pinnedReceiptIdentity r1, r2 nowhere, the
 *    reading keyed exactly contract, source, workspaceRoot; D4 no reader surface these rows reach (both projections, the typed
 *    refusal, both aborts and every part a relayed reading adds outside its source, the host root spelled <root>) carries a
 *    freshness word, and the projection of the relay probe names neither receipt.
 *  M, the vocabulary matcher A4 reads: M1-M8 the spellings it catches, Q1-Q3 the quiet rows of its named residuals.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the code, exit, gating artifacts, conflict keys, publication fields and spellings - is held to the
 * out-of-file roster, whose envelopes, receipts and analogue facts anchor the cases outside this file.
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the typed refusal and the projection carry the code but withhold the
 *   witness, so r1 rides only the relayed reading (quiet rows C2, C3); R-EXIT-UNREAD Pi reads rf's exit as zero or nonzero only, so
 *   an exit-4 and an exit-7 refusal read alike and no surface names the class (quiet row B3); R-RESUME-REREAD a resume re-runs a
 *   failed READ node live (runtime.ts replays only an ok read), one fresh noncommitted read, while the committing stand-in refuses
 *   (quiet row B9; B8); R-RECORD-UNREAD the adapter never reads a stated publication record, so the relay probe projects on the
 *   noncommitted render's own tone and names no pin (quiet row D4); R-INTERRUPTED (Q1, U+200B inside the code), R-HOMOGLYPH (Q2,
 *   U+0435 for one letter) and R-COMPOSED (Q3, the code built from two literals) escape A4's text matcher - B2 and C1 hold the
 *   runtime spelling, so a table built that way that rewrote the code reds them; R-COMPOSED-ARGV a render argv built from
 *   non-literal parts is invisible to A1 (its composed control is caught, the real count stays 0; A2 holds the runtime argv).
 * SCOPE: the code, metadata shape and record fields are producer facts at the pin; Pi vendors no rf schema, so a producer-side
 * change is seen only when the roster is re-read. The armed half (a committing capability with --idempotency-key and rf operation
 * show reconciliation) is owner-reserved under wb-jwc.5: no committing capability, argv or reader is added here, and the committing
 * stand-in is test-only.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and qa are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type InvocationContext, type JsonValue } from "../src/workbench/capability-registry.js";
import { type ClaudeQuery, createClaudeWorkflowHost } from "../src/workbench/claude-host.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  nativeReactiveFiberRender,
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import type { WorkflowJournalEntry } from "../src/workflow/journal.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { runWorkflow, type WorkflowHost } from "../src/workflow/runtime.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federation-pin-changed-roster.json");
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_GRANTS = ["reactivefiber:render"];
const LEGACY_INPUT: JsonObject = { model: "m", task: "t" };
const VIEW_INPUT: JsonObject = { view: "orders.view", taskId: "t1" };

/** The refusal the statement names (rfc-bak67.14) and the exit class it rides in. */
const PIN_CHANGED = "RF_FEDERATION_PIN_CHANGED";
const PIN_EXIT = 4;
/** The statement's gating artifacts (bead wb-tnz5.5 title). */
const GATING_ARTIFACTS = ["FW-CFRR-04b", "rfc-bak67.11", "rfc-bak67.14"];
/** LXDXDOC-A5: the metadata every rf exit-4 conflict or currentness row carries, in the producer's order. */
const CONFLICT_KEYS = ["record_type", "record_id", "expected_revision", "current_revision", "refresh_command"];
/** 02-concrete-contract-and-verification-gates.md:18: the FederatedPublication fields as the contract spells them. */
const PUBLICATION_FIELDS = ["pinnedReceiptIdentity", "outputStatus", "outputDigestOrValue", "publishTransaction", "visibleEvidence"];
/** The result key the constructed record rides under (this census's choice: rf has no wire spelling at the pin). */
const PUBLICATION_KEY = "federated_publication";
/** The constructed committed render's identity (rf's rfr_ render and rft_ transaction prefixes; values made up). */
const COMMITTED_RENDER_ID = "rfr_pinnedpublicationfixture0a";
/** The test-only stand-in for a future committing rf capability (wb-jwc.5: a non-read effect class, a permission of its own). */
const COMMIT_ID = "reactivefiber.render.commit";
const COMMIT_PERMISSION = "reactivefiber:commit";
/** The vocabulary a Pi path that branched on, carried or rewrote the pinned receipt would have to spell. */
const PIN_VOCABULARY = /RF_FEDERATION_PIN_CHANGED|pinned[\s_.-]*receipt[\s_.-]*identit(?:y|ies)|federat(?:ed|ion)[\s_.-]*publications?/i;
/** The freshness words a surface would need to label old output as new (02-concrete:29 "silently labeling old output fresh"). */
const FRESH_LABEL = /\b(?:fresh|current|latest|newest|up[\s_-]*to[\s_-]*date)\b/i;
/** rf's commit-time argv words: a committing render would pass one; the noncommitted preview passes neither. */
const COMMIT_FLAGS = ["--idempotency-key", "--strict"];
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
const SPACED_RENDER = /\bcontext\s+render\b/;
const HEAD = 'export const meta = { name: "federation-pin-changed", description: "wb-tnz5.5 census probe" };\n';

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(trigger, absent today) Pi drives and relays no rf publication: src's one rf render argv and one rf launch are the noncommitted preview, both input arms spawn --no-commit, the rf roster stays the read preview alone, and no src or qa file spells the pin-change vocabulary",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label: "(a) an exit-4 RF_FEDERATION_PIN_CHANGED refusal is a non-success refusal carrying the code verbatim, no Pi surface records a publication for it, and Pi never blind-retries it: one spawn, and a non-read committing stand-in surfaces uncertain-effect whose resume reconciles",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  },
  {
    id: "C",
    label: "(b) Pi echoes the pin witness (r1) verbatim and never the newer receipt identity: the relayed reading carries r1 at expected_revision byte for byte, and the typed refusal and the projection name neither receipt",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(c) a publication pinned at r1 arriving after r2's acceptance is never relayed as r2 or labelled fresh: a committed publication aborts at both readers, the relay probe keeps pinnedReceiptIdentity byte for byte, and no reader surface carries a freshness word",
    pins: ["D1", "D2", "D3", "D4"],
  },
  {
    id: "M",
    label: "the pin-change vocabulary matcher A4 reads: the spellings it catches (M1-M8) and the pinned quiet rows of its named residuals (Q1 R-INTERRUPTED, Q2 R-HOMOGLYPH, Q3 R-COMPOSED)",
    pins: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "Q1", "Q2", "Q3"],
  },
];

interface Spelling {
  readonly pin: string;
  readonly text: string;
  readonly hit: boolean;
}
/** Row M: what the vocabulary matcher catches, and the three named escapes it does not. */
const SPELLINGS: readonly Spelling[] = [
  { pin: "M1", text: PIN_CHANGED, hit: true },
  { pin: "M2", text: PIN_CHANGED.toLowerCase(), hit: true },
  { pin: "M3", text: "pinnedReceiptIdentity", hit: true },
  { pin: "M4", text: "pinned_receipt_identity", hit: true },
  { pin: "M5", text: "the pinned receipt identities", hit: true },
  { pin: "M6", text: "FederatedPublication", hit: true },
  { pin: "M7", text: "federated_publication", hit: true },
  { pin: "M8", text: "a federation publication", hit: true },
  { pin: "Q1", text: `RF_FEDERATION${String.fromCodePoint(0x200b)}_PIN_CHANGED`, hit: false },
  { pin: "Q2", text: `pinn${String.fromCodePoint(0x0435)}dReceiptIdentity`, hit: false },
  { pin: "Q3", text: 'const code = "RF_FEDERATION_" + "PIN_CHANGED";', hit: false },
];

interface RosterPin {
  readonly id: string;
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Analogue {
  readonly code: string;
  readonly exit: number;
  readonly family: string;
  readonly hintRequired: boolean;
  readonly metadataKeys: readonly string[];
  readonly refreshCommand: string;
  readonly source: string;
}
interface Roster {
  readonly rfVersion: string;
  readonly code: string;
  readonly codeShippedAtInstalledRf: boolean;
  readonly pinExit: number;
  readonly gatingArtifacts: readonly string[];
  readonly conflictKeys: readonly string[];
  readonly publicationFields: readonly string[];
  readonly analogue: Analogue;
  readonly receipts: { readonly pinned: string; readonly accepted: string };
  readonly pinChanged: JsonObject;
  readonly publication: JsonObject;
  readonly rows: readonly RosterRow[];
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
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.analogue) || !isObject(raw.receipts)) {
    throw new Error("roster must be an object with rows, analogue and receipts");
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
  const { analogue, receipts } = raw;
  if (typeof raw.pinExit !== "number" || typeof analogue.exit !== "number" || typeof raw.codeShippedAtInstalledRf !== "boolean" || typeof analogue.hintRequired !== "boolean") {
    throw new Error("roster needs a numeric pinExit and analogue exit and boolean shipped and hintRequired flags");
  }
  return {
    rfVersion: text(raw.rfVersion, "rfVersion"),
    code: text(raw.code, "code"),
    codeShippedAtInstalledRf: raw.codeShippedAtInstalledRf,
    pinExit: raw.pinExit,
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    conflictKeys: strings(raw.conflictKeys, "conflictKeys"),
    publicationFields: strings(raw.publicationFields, "publicationFields"),
    analogue: {
      code: text(analogue.code, "analogue.code"), exit: analogue.exit, family: text(analogue.family, "analogue.family"),
      hintRequired: analogue.hintRequired, metadataKeys: strings(analogue.metadataKeys, "analogue.metadataKeys"),
      refreshCommand: text(analogue.refreshCommand, "analogue.refreshCommand"), source: text(analogue.source, "analogue.source"),
    },
    receipts: { pinned: text(receipts.pinned, "receipts.pinned"), accepted: text(receipts.accepted, "receipts.accepted") },
    pinChanged: objectOf(json(raw.pinChanged), "roster pinChanged"),
    publication: objectOf(json(raw.publication), "roster publication"),
    rows,
  };
}

const ROSTER = readRoster();
const R1 = ROSTER.receipts.pinned;
const R2 = ROSTER.receipts.accepted;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The roster's refusal envelope with its workspace at this run's root, the root the native reader and the adapter read under. */
function pinChanged(): JsonObject {
  const envelope = objectOf(json(ROSTER.pinChanged), "pinChanged");
  const workspace = objectOf(envelope.workspace, "pinChanged workspace");
  return { ...envelope, workspace: { id: workspace.id ?? null, root: ROOT } };
}
/** The full-shape noncommitted preview with the r1-pinned record stated in its result: the relay probe. */
function pinnedPreview(): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "full-shape fixture");
  const result = objectOf(envelope.result, "full-shape result");
  return { ...envelope, result: { ...result, [PUBLICATION_KEY]: json(ROSTER.publication) } };
}
/** The committed render that publishes the r1-pinned record: the commit fields a durable render states, then the record. */
function committedPublication(): JsonObject {
  const envelope = objectOf(json(fullShapeRf(ROOT)), "full-shape fixture");
  const result = objectOf(envelope.result, "full-shape result");
  const work = objectOf(result.work, "full-shape work");
  const transaction = ROSTER.publication.publishTransaction ?? null;
  return {
    ...envelope,
    transaction_id: transaction,
    result: {
      ...result, work: { ...work, storage_write_count: 1 }, render_id: COMMITTED_RENDER_ID, ephemeral: false, commit_seq: 1,
      plan: { operations: [], would_commit: true }, [PUBLICATION_KEY]: json(ROSTER.publication),
    },
  };
}

function primaryOf(envelope: JsonObject): JsonObject {
  return objectOf(Array.isArray(envelope.diagnostics) ? envelope.diagnostics[0] : undefined, "diagnostics[0]");
}
function metadataOf(envelope: JsonObject): JsonObject {
  return objectOf(primaryOf(envelope).metadata, "diagnostics[0].metadata");
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** Which of the two receipts, the refusal's record id and its producer message a set of surfaced strings names. */
function namedIn(texts: readonly string[]): { namesPinned: boolean; namesAccepted: boolean; namesRecord: boolean; namesMessage: boolean } {
  const primary = primaryOf(ROSTER.pinChanged);
  const record = String(metadataOf(ROSTER.pinChanged).record_id);
  const message = String(primary.message);
  return {
    namesPinned: texts.some(item => item.includes(R1)), namesAccepted: texts.some(item => item.includes(R2)),
    namesRecord: texts.some(item => item.includes(record)), namesMessage: texts.some(item => item.includes(message)),
  };
}
/** A text with every code point outside printable ASCII spelled <U+XXXX>, so a witness never carries an invisible. */
function printable(value: string): string {
  return [...value].map(char => {
    const point = char.codePointAt(0) ?? 0;
    return point >= 0x20 && point <= 0x7e ? char : `<U+${point.toString(16).toUpperCase().padStart(4, "0")}>`;
  }).join("");
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

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface Answer {
  readonly body: JsonValue;
  readonly exit: number;
}
/**
 * A stand-in `rf` first on PATH. Spawn k prints answers[min(k, last)].body and exits with its exit code; every spawn appends its
 * argv as one JSON line to the returned log.
 */
function standInRf(answers: readonly Answer[]): string {
  const folder = makeScratch("rf-federation-pin-changed-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      "const seen = fs.existsSync(log) ? fs.readFileSync(log, \"utf8\").split(\"\\n\").filter(Boolean).length : 0;",
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${JSON.stringify(answers)};`,
      "const answer = answers[Math.min(seen, answers.length - 1)];",
      "process.stdout.write(JSON.stringify(answer.body));",
      "process.exit(answer.exit);",
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
/** A spawn's argv after `--workspace <root>`, which every Pi rf spawn leads with. */
function argvTail(argv: readonly string[] | undefined): string[] {
  expect(argv?.slice(0, 2)).toStrictEqual(["--workspace", ROOT]);
  return (argv ?? []).slice(2);
}

interface Refusal {
  readonly category: string;
  readonly message: string;
}
function contextOf(grants: readonly string[]): InvocationContext {
  return { grants: [...grants], signal: new AbortController().signal };
}
function refusalOf(error: unknown): Refusal {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
async function refusalFrom(call: Promise<JsonValue>): Promise<Refusal> {
  return refusalOf(await call.then(() => undefined, (caught: unknown) => caught));
}
function refusalOfCall(call: () => unknown): Refusal {
  try {
    call();
  } catch (error) {
    return refusalOf(error);
  }
  throw new Error("expected the call to refuse");
}

interface NativeOutcome {
  readonly refusal: Refusal | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
function previewRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  return registry;
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against a stand-in rf. */
async function nativeOutcome(answers: readonly Answer[], input: JsonValue = LEGACY_INPUT): Promise<NativeOutcome> {
  const log = standInRf(answers);
  let reading: JsonValue | null = null;
  let refusal: Refusal | null = null;
  try {
    reading = await previewRegistry().invoke(PREVIEW_ID, input, contextOf(PREVIEW_GRANTS));
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

/** The envelope type the injected-reader seam (registerReactiveFiberRender) is declared with. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;
/** One envelope rebuilt field by field in the seam's declared shape, refused by name when it cannot ride the seam. */
function injectable(envelope: JsonObject): InjectedEnvelope {
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = envelope;
  const place = isObject(workspace) ? workspace : undefined;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string" ||
    place === undefined || typeof place.id !== "string" || typeof place.root !== "string" || transactionId !== null ||
    result === undefined || !Array.isArray(diagnostics)) {
    throw new Error("the injected seam carries a strict rf envelope with a workspace and a null transaction_id");
  }
  return { schema, ok, command, operation_id: operationId, workspace: { id: place.id, root: place.root }, transaction_id: null, result, diagnostics };
}
/** One registry invocation of the INJECTED preview (registerReactiveFiberRender) whose reader answers `envelope`. */
async function injectedReading(envelope: JsonObject): Promise<{ reading: JsonValue; calls: number }> {
  const answer = injectable(envelope);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return answer;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, LEGACY_INPUT, contextOf(PREVIEW_GRANTS));
  return { reading, calls };
}
function sourceOf(reading: JsonValue | null): JsonObject {
  return objectOf(objectOf(reading ?? undefined, "reading").source, "reading source");
}
/** The parts of a reading Pi itself adds: every key and string outside the relayed source and the host-bound workspace root. */
function piAddedParts(reading: JsonValue | null): string[] {
  return Object.entries(objectOf(reading ?? undefined, "reading"))
    .filter(([key]) => key !== "source" && key !== "workspaceRoot")
    .flatMap(([key, value]) => [key, ...stringLeaves(value)]);
}
/** Texts with this run's workspace root spelled <root>, so a directory name can never read as a label. */
function rootless(texts: readonly string[]): string[] {
  return texts.map(item => item.split(ROOT).join("<root>"));
}

/** The committing stand-in's input: the legacy arm only (test-only, never registered by src). */
const COMMIT_INPUT = { type: "object", properties: { model: { type: "string", minLength: 1 }, task: { type: "string", minLength: 1 } }, required: ["model", "task"], additionalProperties: false };
/**
 * The test-only stand-in for a future committing rf capability (wb-jwc.5's posture: a non-read effect class and a permission of
 * its own); src registers no such capability. Its provider reaches the stand-in rf through Pi's own nativeReactiveFiberRender, so
 * the refusal it surfaces is Pi's real reader mapping and only the effect class is stood in (Pi has no committing argv).
 */
function commitRegistry(): CapabilityRegistry {
  const registry = new CapabilityRegistry();
  registry.register({
    descriptor: {
      id: COMMIT_ID, version: "1.0.0", description: "Test-only stand-in for a future committing rf render (wb-jwc.5); src registers none",
      inputSchema: COMMIT_INPUT, effectClass: "write", permissions: [COMMIT_PERMISSION], supportedModes: ["invoke"],
    },
    invoke: async (input, context) => {
      const fields = objectOf(input, "commit input");
      return nativeReactiveFiberRender({ model: String(fields.model), task: String(fields.task) }, ROOT, context.signal);
    },
  });
  return registry;
}

const NEVER_QUERY: ClaudeQuery = () => {
  throw new Error("the census scripts call node only: the Claude query is never invoked");
};
function claudeHost(registry: CapabilityRegistry, grants: readonly string[]): WorkflowHost {
  return createClaudeWorkflowHost({ cwd: ROOT, query: NEVER_QUERY, capabilities: registry, grants: [...grants] });
}
function nodeRows(entries: readonly WorkflowJournalEntry[]): JsonValue {
  return entries.filter(entry => entry.kind === "node").map(entry => ({
    dispatched: entry.dispatched === true, effectClass: entry.effectClass ?? null, ok: entry.ok, recordsValue: entry.text !== undefined,
  }));
}

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
function previewReading(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
/** The adapter's projection of a reading and every string it surfaces. */
function projectionOf(source: JsonValue): { topology: ReturnType<typeof reactivefiberTopology>; shown: string[] } {
  const topology = reactivefiberTopology(previewReading(source), OBSERVER_CONTEXT);
  return { topology, shown: stringLeaves(json(topology)) };
}

let nativeIds: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeDescriptors(): Promise<CapabilityDescriptor[]> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeIds;
}

interface RfScan {
  readonly renderSites: string[];
  readonly uncommitted: string[];
  readonly uncommittedLiterals: string[];
  readonly commitFlags: string[];
  readonly rfLaunches: string[];
  readonly composedArgv: number;
}
/** One module's rf commit paths: argv arrays with "context" then "render" (and whether each passes --no-commit), string and
 * template literals spelling a spaced `context render` without --no-commit, commit-time flags, and rf launches. */
function scanRf(fileName: string, source: string): RfScan {
  const file = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const scan: RfScan = { renderSites: [], uncommitted: [], uncommittedLiterals: [], commitFlags: [], rfLaunches: [], composedArgv: 0 };
  let composed = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if (word !== "context" || index + 1 >= words.length) return;
        const next = words[index + 1];
        if (next === "render") {
          scan.renderSites.push(fileName);
          if (!words.includes("--no-commit")) scan.uncommitted.push(`${fileName}: [${words.map(item => item ?? "<expr>").join(", ")}]`);
        } else if (next === null) composed += 1;
      });
    }
    if (ts.isStringLiteralLike(node)) {
      if (SPACED_RENDER.test(node.text) && !node.text.includes("--no-commit")) scan.uncommittedLiterals.push(`${fileName}: ${node.text}`);
      if (COMMIT_FLAGS.some(flag => node.text === flag || node.text.startsWith(`${flag}=`))) scan.commitFlags.push(`${fileName}: ${node.text}`);
    }
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (SPACED_RENDER.test(parts) && !parts.includes("--no-commit")) scan.uncommittedLiterals.push(`${fileName}: ${parts}`);
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && LAUNCHERS.includes(node.expression.text)) {
      const first = node.arguments[0];
      if (first !== undefined && ts.isStringLiteralLike(first) && first.text === "rf") scan.rfLaunches.push(fileName);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { ...scan, composedArgv: composed };
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The roots a Pi path carrying the pin vocabulary could live in; each floor sits below the count measured at base 98acfaf (src
 * 115 .ts modules among its files, qa 67 files), so an emptied walk reds and an additive change does not. */
const VOCABULARY_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "workbench/providers/reactivefiber.ts", anchorToken: "RF render refused" },
  { root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
function scanVocabulary(scan: ScanRoot): JsonValue {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const hits = files.filter(file => PIN_VOCABULARY.test(textOf(file))).map(file => relative(REPO, file));
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling the pin-change vocabulary under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, floorMet, anchorRead, hits };
}

function descriptorShape(descriptor: CapabilityDescriptor): JsonValue {
  return {
    id: descriptor.id, effectClass: descriptor.effectClass, permissions: [...descriptor.permissions], modes: [...descriptor.supportedModes],
    carrier: descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE,
    noCommitSource: (descriptor.contractSource ?? "").endsWith("context.render --no-commit"),
  };
}

const PIN_REFUSAL: Refusal = { category: "unavailable", message: `RF render refused: ${PIN_CHANGED}` };

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const scans = files.map(file => scanRf(relative(REPO, file), textOf(file)));
    const found = {
      renderSites: scans.flatMap(scan => scan.renderSites), uncommitted: scans.flatMap(scan => scan.uncommitted),
      uncommittedLiterals: scans.flatMap(scan => scan.uncommittedLiterals), commitFlags: scans.flatMap(scan => scan.commitFlags),
      rfLaunches: scans.flatMap(scan => scan.rfLaunches), composedArgv: scans.reduce((sum, scan) => sum + scan.composedArgv, 0),
    };
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(found, "a committing rf render needs wb-jwc.5's owner-reserved gate").toStrictEqual({
      renderSites: ["src/workbench/providers/reactivefiber.ts"], uncommitted: [], uncommittedLiterals: [], commitFlags: [],
      rfLaunches: ["src/workbench/providers/reactivefiber.ts"], composedArgv: 0,
    });
    const control = (source: string): JsonValue => {
      const scan = scanRf("control.ts", source);
      return { render: scan.renderSites.length, uncommitted: scan.uncommitted.length + scan.uncommittedLiterals.length, flags: scan.commitFlags.length, composed: scan.composedArgv };
    };
    const controls = {
      uncommittedArgv: control('spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--json"]);'),
      noCommitArgv: control('spawn("rf", ["--workspace", w, "context", "render", "--no-commit", "--json"]);'),
      spacedLiteral: control('const cmd = "rf context render --model m --json";'),
      idempotencyFlag: control('spawn("rf", ["context", "render", "--no-commit", "--idempotency-key", key]);'),
      composedArgv: control('const verb = "render"; spawn("rf", ["context", verb]);'),
    };
    expect(controls).toStrictEqual({
      uncommittedArgv: { render: 1, uncommitted: 1, flags: 0, composed: 0 }, noCommitArgv: { render: 1, uncommitted: 0, flags: 0, composed: 0 },
      spacedLiteral: { render: 0, uncommitted: 1, flags: 0, composed: 0 }, idempotencyFlag: { render: 1, uncommitted: 0, flags: 1, composed: 0 },
      composedArgv: { render: 0, uncommitted: 0, flags: 0, composed: 1 },
    });
    return { srcFloorMet, ...found, controls };
  },
  A2: async () => {
    const arms: JsonObject = {};
    for (const [name, input] of [["legacy", LEGACY_INPUT], ["view", VIEW_INPUT]] as const) {
      const outcome = await nativeOutcome([{ body: json(fullShapeRf(ROOT)), exit: 0 }], input);
      expect(outcome.refusal).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      const tail = argvTail(outcome.spawns[0]);
      const result = objectOf(sourceOf(outcome.reading).result, "reading result");
      expect(tail).toContain("--no-commit");
      expect(tail.filter(word => COMMIT_FLAGS.includes(word))).toEqual([]);
      expect({ renderId: result.render_id, ephemeral: result.ephemeral }).toStrictEqual({ renderId: null, ephemeral: true });
      arms[name] = { spawns: outcome.spawns.length, tail, renderId: result.render_id ?? null, ephemeral: result.ephemeral ?? null };
    }
    return arms;
  },
  A3: async () => {
    const native = (await nativeDescriptors()).filter(descriptor => descriptor.id.startsWith("reactivefiber."));
    const injectedRegistry = new CapabilityRegistry();
    registerReactiveFiberRender(injectedRegistry, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const injected = injectedRegistry.catalogSnapshot().map(entry => entry.descriptor).filter(descriptor => descriptor.id.startsWith("reactivefiber."));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const shape = { id: PREVIEW_ID, effectClass: "read", permissions: PREVIEW_GRANTS, modes: ["invoke"], carrier: true, noCommitSource: true };
    expect(native.map(descriptorShape)).toStrictEqual([shape]);
    expect(injected.map(descriptorShape)).toStrictEqual([shape]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    return { native: native.map(descriptorShape), injected: injected.map(descriptorShape), reconcile };
  },
  A4: async () => ({ roots: VOCABULARY_ROOTS.map(scanVocabulary) }),
  B1: async () => {
    const envelope = ROSTER.pinChanged;
    const primary = primaryOf(envelope);
    const metadata = metadataOf(envelope);
    const diagnostics = Array.isArray(envelope.diagnostics) ? envelope.diagnostics.length : -1;
    expect({ command: envelope.command, ok: envelope.ok, result: envelope.result, transaction: envelope.transaction_id, diagnostics }).toStrictEqual({
      command: "context.render", ok: false, result: null, transaction: null, diagnostics: 1,
    });
    expect({ code: primary.code, severity: primary.severity, source: primary.source }).toStrictEqual({ code: PIN_CHANGED, severity: "error", source: ROSTER.analogue.source });
    expect(Object.keys(metadata)).toStrictEqual(CONFLICT_KEYS);
    expect(Object.keys(metadata)).toStrictEqual([...ROSTER.analogue.metadataKeys]);
    expect({ expected: metadata.expected_revision, current: metadata.current_revision, refresh: metadata.refresh_command }).toStrictEqual({
      expected: R1, current: R2, refresh: ROSTER.analogue.refreshCommand,
    });
    expect(R1).not.toBe(R2);
    expect({ pinExit: ROSTER.pinExit, analogueExit: ROSTER.analogue.exit, shipped: ROSTER.codeShippedAtInstalledRf }).toStrictEqual({ pinExit: PIN_EXIT, analogueExit: PIN_EXIT, shipped: false });
    return {
      command: envelope.command ?? null, ok: envelope.ok ?? null, result: envelope.result ?? null, transaction: envelope.transaction_id ?? null, diagnostics,
      code: primary.code ?? null, severity: primary.severity ?? null, source: primary.source ?? null, metadataKeys: Object.keys(metadata),
      witnessIsPin: metadata.expected_revision === R1, newerIsCurrent: metadata.current_revision === R2, distinct: R1 !== R2,
      exit: ROSTER.pinExit, analogue: { code: ROSTER.analogue.code, exit: ROSTER.analogue.exit, family: ROSTER.analogue.family, hintRequired: ROSTER.analogue.hintRequired },
      rfVersion: ROSTER.rfVersion, shipped: ROSTER.codeShippedAtInstalledRf,
    };
  },
  B2: async () => {
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    expect(outcome.refusal).toStrictEqual(PIN_REFUSAL);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    const tail = argvTail(outcome.spawns[0]);
    expect(tail).toContain("--no-commit");
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, tail };
  },
  B3: async () => {
    const at = async (exit: number): Promise<JsonValue> => {
      const outcome = await nativeOutcome([{ body: pinChanged(), exit }]);
      expect(outcome.reading).toBeNull();
      return outcome.refusal === null ? null : { ...outcome.refusal };
    };
    const exit0 = await at(0);
    const exit4 = await at(PIN_EXIT);
    const exit7 = await at(7);
    expect(exit0).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized or contradictory failure envelope." });
    expect(exit4).toStrictEqual(PIN_REFUSAL);
    // R-EXIT-UNREAD: Pi reads the exit as zero or nonzero only, so exit 7 reads exactly as exit 4 and no message names the class.
    expect(exit7).toStrictEqual(exit4);
    const exitNamed = stringLeaves([exit4, exit7]).some(item => /\bexit\b|\b4\b/.test(item));
    expect(exitNamed).toBe(false);
    return { exit0, exit4, exit7, exitNamed };
  },
  B4: async () => {
    // The stand-in would answer a second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    expect(outcome.refusal).toStrictEqual(PIN_REFUSAL);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    return { category: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length };
  },
  B5: async () => {
    const { topology } = projectionOf(pinChanged());
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined ||
      snapshot.sourceVersion !== undefined || (snapshot.evidenceRefs ?? []).some(ref => !ref.startsWith("rf-workspace:"));
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(snapshot?.node.statusText).toContain(PIN_CHANGED);
    expect(carriesValue).toBe(false);
    return {
      snapshots: topology.snapshots.length, coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null,
      statusText: snapshot?.node.statusText ?? null, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], carriesValue, diagnostics: [...topology.diagnostics],
    };
  },
  B6: async () => {
    const envelope = pinChanged();
    const { reading, calls } = await injectedReading(envelope);
    const source = sourceOf(reading);
    const readingKeys = Object.keys(objectOf(reading, "reading")).sort();
    // Byte for byte: the reading's source serializes to exactly the envelope's bytes, key order included.
    const byteIdentical = JSON.stringify(source) === JSON.stringify(envelope);
    expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
    expect(byteIdentical).toBe(true);
    expect(primaryOf(source).code).toBe(PIN_CHANGED);
    expect(calls).toBe(1);
    return { readingKeys, byteIdentical, code: primaryOf(source).code ?? null, ok: source.ok ?? null, calls };
  },
  B7: async () => {
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    const refusal = await refusalFrom(commitRegistry().invoke(COMMIT_ID, LEGACY_INPUT, contextOf([COMMIT_PERMISSION])));
    const spawns = spawnsOf(log).length;
    expect(refusal).toStrictEqual({
      category: "uncertain-effect",
      message: `Capability ${COMMIT_ID} has an uncertain external effect: RF render refused: ${PIN_CHANGED}. Reconcile with the producer before retrying.`,
    });
    expect(spawns).toBe(1);
    return { ...refusal, carriesCode: refusal.message.includes(PIN_CHANGED), reconciles: refusal.message.includes("Reconcile with the producer before retrying."), spawns };
  },
  B8: async () => {
    const script = `${HEAD}return await node(${JSON.stringify(COMMIT_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }, { body: json(fullShapeRf(ROOT)), exit: 0 }]);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({
      script, host: claudeHost(commitRegistry(), [COMMIT_PERMISSION]), journal: { append: entry => {
        entries.push(entry);
      } },
    });
    const recordedSpawns = spawnsOf(log).length;
    const resumed = await runWorkflow({ script, host: claudeHost(commitRegistry(), [COMMIT_PERMISSION]), journal: { entries } });
    const resumeSpawns = spawnsOf(log).length - recordedSpawns;
    const error = resumed.error ?? "";
    expect(recorded.status).toBe("failed");
    expect(recorded.capabilityError?.category).toBe("uncertain-effect");
    expect(recorded.capabilityError?.message).toContain(`RF render refused: ${PIN_CHANGED}`);
    expect(recordedSpawns).toBe(1);
    expect(resumed.status).toBe("failed");
    expect(resumed.capabilityError?.category).toBe("uncertain-effect");
    expect(resumeSpawns).toBe(0);
    return {
      recorded: {
        status: recorded.status, category: recorded.capabilityError?.category ?? null,
        carriesCode: (recorded.capabilityError?.message ?? "").includes(PIN_CHANGED), nodeRows: nodeRows(entries), spawns: recordedSpawns,
      },
      resumed: {
        status: resumed.status, category: resumed.capabilityError?.category ?? null, namesProducer: error.includes('producer "reactivefiber"'),
        namesReconcile: error.includes("workflow_reconcile"), spawns: resumeSpawns, replayedNodeCount: resumed.replayedNodeCount,
      },
    };
  },
  B9: async () => {
    const script = `${HEAD}return await node(${JSON.stringify(PREVIEW_ID)}, ${JSON.stringify(LEGACY_INPUT)});`;
    const log = standInRf([{ body: pinChanged(), exit: PIN_EXIT }]);
    const entries: WorkflowJournalEntry[] = [];
    const recorded = await runWorkflow({
      script, host: claudeHost(previewRegistry(), PREVIEW_GRANTS), journal: { append: entry => {
        entries.push(entry);
      } },
    });
    const recordedSpawns = spawnsOf(log).length;
    const resumed = await runWorkflow({ script, host: claudeHost(previewRegistry(), PREVIEW_GRANTS), journal: { entries } });
    const resumeSpawns = spawnsOf(log).length - recordedSpawns;
    const diagnostic = { name: "CapabilityError", ...PIN_REFUSAL };
    expect(recorded.status).toBe("failed");
    expect(recorded.capabilityError).toStrictEqual(diagnostic);
    expect(recordedSpawns).toBe(1);
    // R-RESUME-REREAD: the failed read is re-run live once on resume (one fresh noncommitted read), never replayed as a value.
    expect(resumed.capabilityError).toStrictEqual(diagnostic);
    expect({ resumeSpawns, replayedNodeCount: resumed.replayedNodeCount }).toStrictEqual({ resumeSpawns: 1, replayedNodeCount: 0 });
    return {
      recorded: { status: recorded.status, capabilityError: recorded.capabilityError === undefined ? null : { ...recorded.capabilityError }, nodeRows: nodeRows(entries), spawns: recordedSpawns },
      resumed: { status: resumed.status, category: resumed.capabilityError?.category ?? null, spawns: resumeSpawns, replayedNodeCount: resumed.replayedNodeCount },
    };
  },
  C1: async () => {
    const envelope = pinChanged();
    const { reading } = await injectedReading(envelope);
    const relayed = metadataOf(sourceOf(reading));
    const primary = primaryOf(sourceOf(reading));
    expect(relayed).toStrictEqual(metadataOf(envelope));
    expect({ expected: relayed.expected_revision, current: relayed.current_revision }).toStrictEqual({ expected: R1, current: R2 });
    expect({ message: primary.message, hint: primary.hint }).toStrictEqual({ message: primaryOf(envelope).message, hint: primaryOf(envelope).hint });
    return {
      expectedRevision: relayed.expected_revision ?? null, currentRevision: relayed.current_revision ?? null,
      witnessIsPin: relayed.expected_revision === R1, swapped: relayed.expected_revision === R2 || relayed.current_revision === R1,
      metadataVerbatim: JSON.stringify(relayed) === JSON.stringify(metadataOf(envelope)), messageVerbatim: primary.message === primaryOf(envelope).message,
    };
  },
  C2: async () => {
    const outcome = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    const named = namedIn([outcome.refusal?.message ?? ""]);
    // R-WITHHELD: the typed refusal carries the code and withholds the witness, so neither receipt is named in it.
    expect(named).toStrictEqual({ namesPinned: false, namesAccepted: false, namesRecord: false, namesMessage: false });
    return { message: outcome.refusal?.message ?? null, ...named };
  },
  C3: async () => {
    const { shown } = projectionOf(pinChanged());
    const named = namedIn(shown);
    // Non-vacuity: the strings judged are the projection's own, the code among them.
    const projectionRead = shown.length >= 10 && shown.some(item => item.includes(PIN_CHANGED));
    expect(projectionRead).toBe(true);
    // R-WITHHELD: the projection carries the code and withholds the witness, so neither receipt is named in it.
    expect(named).toStrictEqual({ namesPinned: false, namesAccepted: false, namesRecord: false, namesMessage: false });
    return { projectionRead, ...named };
  },
  D1: async () => {
    const outcome = await nativeOutcome([{ body: committedPublication(), exit: 0 }]);
    expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized or contradictory envelope." });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    const named = namedIn([outcome.refusal?.message ?? ""]);
    expect({ namesPinned: named.namesPinned, namesAccepted: named.namesAccepted }).toStrictEqual({ namesPinned: false, namesAccepted: false });
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, namesPinned: named.namesPinned, namesAccepted: named.namesAccepted };
  },
  D2: async () => {
    const refusal = refusalOfCall(() => reactivefiberTopology(previewReading(committedPublication()), OBSERVER_CONTEXT));
    expect(refusal.category).toBe("validation");
    return { ...refusal };
  },
  D3: async () => {
    const envelope = pinnedPreview();
    const native = await nativeOutcome([{ body: envelope, exit: 0 }]);
    expect(native.refusal).toBeNull();
    const injected = await injectedReading(envelope);
    const seam = (reading: JsonValue | null): JsonValue => {
      const source = sourceOf(reading);
      const record = objectOf(objectOf(source.result, "reading result")[PUBLICATION_KEY], "relayed record");
      const byteIdentical = JSON.stringify(source) === JSON.stringify(envelope);
      const namesAccepted = stringLeaves(reading).some(item => item.includes(R2));
      const readingKeys = Object.keys(objectOf(reading ?? undefined, "reading")).sort();
      expect(byteIdentical).toBe(true);
      expect(record.pinnedReceiptIdentity).toBe(R1);
      expect(namesAccepted).toBe(false);
      expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
      return { byteIdentical, pinnedReceiptIdentity: record.pinnedReceiptIdentity ?? null, fields: Object.keys(record), namesAccepted, readingKeys };
    };
    return { native: { ...objectOf(seam(native.reading), "native seam"), spawns: native.spawns.length }, injected: { ...objectOf(seam(injected.reading), "injected seam"), calls: injected.calls } };
  },
  D4: async () => {
    const probe = projectionOf(pinnedPreview());
    const refusal = projectionOf(pinChanged());
    const native = await nativeOutcome([{ body: pinChanged(), exit: PIN_EXIT }]);
    const committed = await nativeOutcome([{ body: committedPublication(), exit: 0 }]);
    const adapterAbort = refusalOfCall(() => reactivefiberTopology(previewReading(committedPublication()), OBSERVER_CONTEXT));
    const nativeProbe = await nativeOutcome([{ body: pinnedPreview(), exit: 0 }]);
    const injectedProbe = await injectedReading(pinnedPreview());
    const surfaces: Record<string, readonly string[]> = {
      probeProjection: probe.shown, refusalProjection: refusal.shown, nativeRefusal: [native.refusal?.message ?? ""],
      committedAbort: [committed.refusal?.message ?? ""], adapterAbort: [adapterAbort.message],
      nativeReadingParts: piAddedParts(nativeProbe.reading), injectedReadingParts: piAddedParts(injectedProbe.reading),
    };
    const labelled = Object.entries(surfaces).flatMap(([name, texts]) => rootless(texts).filter(item => FRESH_LABEL.test(item)).map(item => `${name}: ${item}`));
    // Non-vacuity: every surface judged holds at least one non-empty text.
    const everySurfaceRead = Object.values(surfaces).every(texts => texts.some(item => item.length > 0));
    expect(everySurfaceRead).toBe(true);
    const probeNamed = namedIn(probe.shown);
    const snapshot = probe.topology.snapshots[0];
    expect(labelled).toEqual([]);
    // R-RECORD-UNREAD: the adapter never reads the stated record, so the probe projects on the noncommitted render's own tone.
    expect({ namesPinned: probeNamed.namesPinned, namesAccepted: probeNamed.namesAccepted }).toStrictEqual({ namesPinned: false, namesAccepted: false });
    const controls = {
      fresh: FRESH_LABEL.test("fresh output"), current: FRESH_LABEL.test("the current owner read"), latest: FRESH_LABEL.test("latest render"),
      upToDate: FRESH_LABEL.test("up-to-date"), newest: FRESH_LABEL.test("newest receipt"), quiet: FRESH_LABEL.test("noncommitted preview (rf-cli)"),
    };
    expect(controls).toStrictEqual({ fresh: true, current: true, latest: true, upToDate: true, newest: true, quiet: false });
    return {
      surfaces: Object.keys(surfaces), everySurfaceRead, labelled,
      probe: { coverage: snapshot?.coverage ?? null, statusTone: snapshot?.node.statusTone ?? null, namesPinned: probeNamed.namesPinned, namesAccepted: probeNamed.namesAccepted },
      controls,
    };
  },
  ...Object.fromEntries(
    SPELLINGS.map(spelling => [
      spelling.pin,
      async (): Promise<JsonValue> => {
        const hit = PIN_VOCABULARY.test(spelling.text);
        expect(hit).toBe(spelling.hit);
        return { form: printable(spelling.text), hit };
      },
    ]),
  ),
};

describe("wb-tnz5.5 rf federation pin-changed census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R6, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:9", "C:3", "D:4", "M:11"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      code: PIN_CHANGED, pinExit: PIN_EXIT, gatingArtifacts: GATING_ARTIFACTS, conflictKeys: CONFLICT_KEYS, publicationFields: PUBLICATION_FIELDS,
      spellings: SPELLINGS.map(spelling => spelling.pin),
    }).toStrictEqual({
      code: ROSTER.code, pinExit: ROSTER.pinExit, gatingArtifacts: [...ROSTER.gatingArtifacts], conflictKeys: [...ROSTER.conflictKeys],
      publicationFields: [...ROSTER.publicationFields], spellings: ROSTER.rows.find(row => row.id === "M")?.pins.map(pin => pin.id) ?? [],
    });
    expect(Object.keys(ROSTER.publication)).toStrictEqual(PUBLICATION_FIELDS);
    expect(ROSTER.publication.pinnedReceiptIdentity).toBe(R1);
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
