/**
 * wb-o4h0.5 (RF-FEDERATED-WORKSPACES-R7), the absent-today leg. Statement (bead notes, full form): "When rf federation
 * read/history envelopes ship (gated FW-04b-2/FW-10c, open), Pi shall read resolved W/I, resource/definition revision, accepted
 * snapshot revision/digest, status, source owner and local accepted commit id as producer fields, keeping 'produced at B'
 * distinct from 'accepted into A' and synthesizing neither stamp, and shall present any federated replay as pinned-historical,
 * echoing the producer's typed inability-to-replay, never re-reading the source (FW-10/FW-11 open)"
 * (docs/programs/federated-workspaces-2026-10-18/04-cli-api.md:106@6a251bf73af5). Acceptance, held verbatim to the tracked bead
 * export (.beads/issues.jsonl, row wb-o4h0.5): "(a) produced-at-B fields (W/I, resource/definition revision, source
 * revision/digest) and accepted-into-A fields (accepted snapshot revision/digest, local accepted commit id) surface verbatim and
 * separately; (b) a missing acceptance stamp surfaces absent, never filled from the B-side revision; no Pi path computes either
 * stamp; (c) replay-with-missing-blob surfaces the typed producer code verbatim, not-replayable, never current; (d) spy: zero
 * owner/source reads during replay."
 *
 * MEASURED AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): 04-cli-api.md:106 is the quote
 * above ("Success responses include resolved W/I, ... History fields must distinguish "produced at B" from "accepted into A"");
 * 04-cli-api.md:8-18 lists the PROPOSED rf workspace verbs (link, links, inspect, exports, read, subscribe, unlink, invoke), none
 * registered; 03-protocol-and-storage.md:53 reads "I05 A replay path never invokes B."; 08-adaptive-read-and-causal-admission.md:27
 * reads "Replay binds retained source observations and definition revisions; it never refreshes B silently. If bytes or retained
 * source authority are unavailable, surface typed inability to replay, not fabricated currentness."; the gating rows are
 * BEADS-2026-10-21.md:31 (FW-04b-2, rfc-0txnl.20), :34 (FW-10c, rfc-0txnl.24) and :35 (FW-11, rfc-0txnl.25). MEASURED AT THE
 * INSTALLED rf (0.1.832 by `rf --json --version`, 2026-10-22): 79 leaves and no workspace family; context.render, context.history,
 * context.explain, context.show and context.replay are served.
 *
 * THE FIXTURE (test/fixtures/rf-federation-stamps-roster.json). No federation success envelope is fabricated here:
 * RF-FEDERATED-WORKSPACES-R4 (wb-o4h0.3, acceptance (b)) holds that no fixture fabricates one; the one workspace-family envelope,
 * `federationRefusal`, is a CONSTRUCTED refusal (ok false). `stamps` is CONSTRUCTED from the
 * quote - an `origin` group holding the produced-at-B fields, an `acceptance` group holding the accepted-into-A fields, plus status
 * and source_owner - and rides a context.render preview as ONE additive result key, imported_source: the FW-10c record shape ("render
 * and explain records carry the imported source's origin ... and A's acceptance receipt as separate fields", BEADS:34) on the
 * preview plane, which Pi's provider admits (additive keys, the wb-a9l2.2 precedent). Its field names are this census's placeholders
 * for the producer's prose (fieldTerms maps each to the export's clause (a) term), and its values share none with the full-shape
 * render it rides; a producer-side naming is seen only when a re-measure re-reads a shipped record. `unknownCommand` is MEASURED:
 * rf 0.1.832's stdout for `rf --json workspace read knowledge:view:architecture` (exit 2, RF_USAGE_UNKNOWN_COMMAND, its 18 command
 * choices without workspace), captured by the cutting seat in a scratch directory. `missingBlob` is the MEASURED refusal diagnostic
 * of rf 0.1.832, copied from test/fixtures/rf-replay-refusal-echo-roster.json (envelopes.blob, wb-a9l2.4) and held equal to it.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). It spawns only `rf ... context
 * render --no-commit` and admits only context.render previews, so today Pi reads no federation read/history envelope: the
 * statement's trigger has not fired. The census pins that absence and every surface the obligation already reaches:
 *  A, the trigger, absent today. A1 an AST scan of every src module and every native descriptor for an rf workspace verb (an argv
 *    "workspace" followed by a WORKSPACE_VERBS word, or a literal spelling one), a committed-record verb (an argv "context"
 *    followed by a RECORD_VERBS word, or a literal spelling one) or an RF_FED_ code - a spelling joins its two words by any run of
 *    whitespace, ".", "_", "-", ":" or "/", or by none - with a floor, a non-vacuity reading of the real render argv and controls;
 *    A2 the rf roster stays the preview alone, selected by id, rf permission or rf contractSource, in the native and the injected
 *    registration and RECONCILE_EVIDENCE_READS.reactivefiber, and the injected reader seam has 0 src call sites; A3 the native
 *    reader refuses rf's measured answer to `rf workspace read` and a constructed workspace.read refusal (`federationRefusal`, ok
 *    false, RF_FED_RESOURCE_UNAVAILABLE from 04-cli-api.md:104), each in one spawn of the render argv (the same diagnostic on a
 *    context.render failure reads as the render refusal it would be, so the command is what is refused); A4 the reader adapter
 *    refuses a reading carrying either; A5 both readers refuse a committed render record that carries the stamps (FW-10c's record).
 *  B, acceptance (a). B1 the fixture: each group holds exactly its fields, the field terms equal the export's clause (a) lists, and
 *    the two groups share no value; B2 the NATIVE reader (registerNativeReactiveFiberRender against a stand-in rf answering the
 *    preview that carries the stamps) returns a reading that carries the render byte for byte against the same render built from a
 *    fresh roster read - every origin and acceptance leaf, the status and the source owner verbatim - in one spawn with the
 *    counting fake producer port (a fail-closed globalThis.fetch) at 0; B3 separately: each stamp value sits at exactly one path,
 *    in its own group, the reading's result keys are the render's, and the adapter's projection of that render carries none of
 *    their text values (the ids, digests and names; the two numeric revisions are not text-matched).
 *  C, acceptance (b). C1 two pending readings through the native reader (the acceptance group absent; the local accepted commit id
 *    absent) carry the stamp absent, byte for byte, with no key added and each B-side revision at its one producer path; C2 the
 *    adapter's present-day stamps: sourceRevision is the stated graph_revision_id, sourceVersion the stated bundle_revision_id and
 *    absent when it is unstated (never filled from the graph revision), a render carrying the stamps projects the same two, and an
 *    absent or malformed graph revision is refused; C3 no Pi path computes either stamp: no src or qa file spells the stamp
 *    vocabulary, the reader closure's one digest call (createHash, createHmac, hash or WebCrypto subtle) is the output-text
 *    digest, and nativePayloadRef is exactly that digest and nothing else.
 *  D, acceptance (c). D1 the measured missing-blob diagnostic on a render refusal is the native typed refusal `RF render refused:
 *    RF_REPLAY_SOURCE_SNAPSHOT_MISSING` (category unavailable), one spawn, no reading, fetch 0; D2 the adapter projects it under
 *    both seams as a failure of unknown coverage carrying the code verbatim and no revision, version or payload reference; D3
 *    replayed observation rows read pinned-historical: partial, never a complete or successful render, and a row that claims a
 *    replay with captured_at_render freshness (or the reverse) is refused.
 *  E, acceptance (d). E1 the dynamic spy: a stand-in rf that would answer any second spawn with a live render sees exactly one
 *    spawn of the render argv for the missing-blob refusal and for a replayed-rows render, fetch stays 0, and no argv names the
 *    source owner, its locator or the B identities; E2 the static port census of the reader closure: no network or filesystem
 *    module, no composed module specifier (a non-literal import or require, a node:module loader, eval or Function), no network
 *    global (named, through globalThis, by element access or by alias), and every child_process launch (named, aliased or
 *    namespace) a literal "rf".
 * The render-command refusal D1, D2 and E1 read is CONSTRUCTED: the measured diagnostic placed on a context.render failure
 * envelope (with the measured operation and workspace ids), since the render plane never emits a replay code.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the whole judged set - every row's id, label and
 * pins, every pin's witness (compared in its own case and again by the record), every registered test and every pin's assertion
 * count at its end - is held to the out-of-file roster; each acceptance row's label is its clause in the tracked bead export,
 * verbatim, and the four clauses are covered by exactly the four acceptance rows. LIMIT (measured): the export anchors rows, not
 * pins, so a pin removed from this file and from the roster together reds no case; a whole row removed from both still reds.
 * RESIDUALS (named, each with a pinned quiet row): R-COMPOSED-ARGV an argv whose verb word is a non-literal is not read as a hit
 * by A1 (A1's composedArgv control: 0 hits); A1 pins the count of that shape at base (1: src/workbench/observation.ts:615, the
 * ["workspace", scope.workspace] name/value pair), so a new one reds by count while one that replaces the counted site does not;
 * R-CALL-COMPOSED an argv assembled by calls (push, concat) is invisible to A1 (A1's callComposed control: 0 hits); R-UNTAGGED a
 * registration with neither a reactivefiber id, an rf permission nor an rf contractSource is not selected by A2 (A2's untagged
 * control: false); R-HOST-ALIAS a network global reached through a host object other than globalThis (self, window) is invisible
 * to E2 (E2's hostAlias control: 0 findings); R-HAND-ROLLED a stamp computed by hand-written arithmetic rather than a digest API
 * is invisible to C3's digest census (C3's handRolled control: no site), the stamp-vocabulary scan staying its backstop for a
 * named field; R-SUCCESS-UNTESTED a reader that admits a workspace-family command only on a success envelope meets no dynamic row,
 * since this census fabricates no federation success envelope (R4), with A1's src scan its backstop (A3's successes quiet row:
 * none fabricated); R-WITHHELD the adapter reads no imported_source key, so the stamps surface verbatim in the reading only, never
 * in the projection (B3's projectedStamps quiet row: none of their text values).
 * SCOPE: the verbs, codes, fields and the two measured envelopes are producer facts at the pin and at the installed rf; Pi vendors
 * no rf schema. The armed half (a reader that reads a federation envelope or FW-10c record and projects both stamps) waits for
 * rfc-0txnl.20 and rfc-0txnl.24, and the federated replay for rfc-0txnl.25: no reader is added or faked here.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src, qa and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CLI_SCHEMA,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberSeam, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-federation-stamps-roster.json");
/** The measured refusal of rf 0.1.832 (wb-a9l2.4's roster): the anchor the fixture's missing-blob diagnostic is held to. */
const MEASURED_PATH = join(HERE, "fixtures", "rf-replay-refusal-echo-roster.json");
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const BEAD = "wb-o4h0.5";
const ROOT = process.cwd();
const PREVIEW_ID = "reactivefiber.render.preview";
const GRANTS = ["reactivefiber:render"];
/** The trigger phrase of the statement, as the bead export's title states it. */
const TRIGGER = "When rf federation read/history envelopes ship (gated FW-04b-2/FW-10c, open)";
const QUOTE_PIN = "docs/programs/federated-workspaces-2026-10-18/04-cli-api.md:106@6a251bf73af5";
/** FW-04b-2, FW-10c and FW-11 (federated-workspaces BEADS-2026-10-21.md:31, :34, :35). */
const GATING_ARTIFACTS = ["rfc-0txnl.20", "rfc-0txnl.24", "rfc-0txnl.25"];
/** The PROPOSED rf workspace verbs (04-cli-api.md:8-18). */
const WORKSPACE_VERBS = ["link", "links", "inspect", "exports", "read", "subscribe", "unlink", "invoke"];
/** The served rf context leaves that carry committed render and explain records (FW-10c would extend them) and the replay. */
const RECORD_VERBS = ["history", "explain", "show", "replay"];
/** A verb spelling: the two words in any case, joined by any run of whitespace, ".", "_", "-", ":" or "/", or by none (camelCase). */
const WORKSPACE_VERB = new RegExp(`\\bworkspace[\\s._:/-]*(?:${WORKSPACE_VERBS.join("|")})\\b`, "i");
const RECORD_VERB = new RegExp(`\\bcontext[\\s._:/-]*(?:${RECORD_VERBS.join("|")})\\b`, "i");
/** The proposed federation diagnostic family (04-cli-api.md:104). */
const FEDERATION_CODE = /\bRF_FED_[A-Z0-9_]+/;
/** The stamp vocabulary a Pi table or computed field would need: none may appear in src or qa. */
const STAMP_FAMILY = /accepted[\s_.-]*(?:snapshot|commit|into)|local[\s_.-]*accepted|produced[\s_.-]*at[\s_.-]*(?:b|source|origin)\b/i;
/** The additive result key the constructed stamps ride on a render preview, and the two stamp groups with their fields. */
const IMPORTED = "imported_source";
const ORIGIN = "origin";
const ACCEPTANCE = "acceptance";
const PRODUCED_FIELDS = ["workspace_id", "instance_id", "resource_kind", "resource_name", "definition_revision", "source_revision", "source_digest"];
const ACCEPTED_FIELDS = ["accepted_snapshot_revision", "accepted_snapshot_digest", "local_accepted_commit_id"];
/** The B-side revision fields acceptance (b) names: an acceptance stamp is never filled from one of them. */
const B_SIDE_REVISIONS = ["definition_revision", "source_revision", "source_digest"];
/** Each placeholder field and the clause (a) term it stands for. */
const FIELD_TERMS: Readonly<Record<string, string>> = {
  workspace_id: "W/I",
  instance_id: "W/I",
  resource_kind: "resource/definition revision",
  resource_name: "resource/definition revision",
  definition_revision: "resource/definition revision",
  source_revision: "source revision/digest",
  source_digest: "source revision/digest",
  accepted_snapshot_revision: "accepted snapshot revision/digest",
  accepted_snapshot_digest: "accepted snapshot revision/digest",
  local_accepted_commit_id: "local accepted commit id",
};
const SNAPSHOT_MISSING = "RF_REPLAY_SOURCE_SNAPSHOT_MISSING";
/** rf's measured answer to a workspace verb today: the unknown-command usage refusal, exit 2. */
const UNKNOWN_COMMAND = "RF_USAGE_UNKNOWN_COMMAND";
const UNKNOWN_EXIT = 2;
/** The workspace-family command path wb-o4h0.3's fixture walk reads: no object here pairs it with ok true. */
const FAMILY_COMMAND = /^workspace(?:[.\s]|$)/i;
/** The separator the adapter writes between status-text parts (U+00B7), composed so this file stays ASCII. */
const DOT = String.fromCodePoint(0xb7);
/** The producer's _EXIT_NOT_REPLAYABLE (wb-a9l2.4's measured replays). */
const REPLAY_EXIT = 8;
const NETWORK_MODULE = /^(?:node:)?(?:net|http|https|http2|dns|tls|dgram)(?:\/|$)|^(?:undici|ws)(?:\/|$)/;
const FILESYSTEM_MODULE = /^(?:node:)?fs(?:\/|$)/;
const LAUNCH_MODULES = ["node:child_process", "child_process"];
const WORKER_MODULE = /^(?:node:)?(?:worker_threads|cluster)$/;
/** A module loader resolves any specifier at runtime: an import of it is a composed specifier. */
const LOADER_MODULE = /^(?:node:)?module$/;
/** Dynamic code can reach any port: a reference to either is a composed specifier. */
const DYNAMIC_CODE = new Set(["eval", "Function"]);
const NETWORK_GLOBALS = new Set(["globalThis", "fetch", "WebSocket", "EventSource", "XMLHttpRequest"]);
const DIGEST_APIS = new Set(["createHash", "createHmac", "hash"]);
/** The reader modules: the provider and its adapter; E2 and C3 walk their src import closure. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: `(trigger, absent today) ${TRIGGER}: Pi reads none today - no src module or native descriptor spells an rf workspace verb, a committed-record verb or an RF_FED_ code, the rf roster stays reactivefiber.render.preview only, and both readers refuse rf's measured answer to an rf workspace verb and a committed render record`,
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(a) produced-at-B fields (W/I, resource/definition revision, source revision/digest) and accepted-into-A fields (accepted snapshot revision/digest, local accepted commit id) surface verbatim and separately",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(b) a missing acceptance stamp surfaces absent, never filled from the B-side revision; no Pi path computes either stamp",
    pins: ["C1", "C2", "C3"],
  },
  {
    id: "D",
    label: "(c) replay-with-missing-blob surfaces the typed producer code verbatim, not-replayable, never current",
    pins: ["D1", "D2", "D3"],
  },
  {
    id: "E",
    label: "(d) spy: zero owner/source reads during replay",
    pins: ["E1", "E2"],
  },
];
const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the bead export's acceptance clauses and the cases agree";
const RECORD_TITLE = "the record: every registered test is in run mode and ran, and every pin reached its end with its pinned assertion count";

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
  readonly bead: string;
  readonly rfVersion: string;
  readonly quotePin: string;
  readonly stampsSource: string;
  readonly gatingArtifacts: readonly string[];
  readonly workspaceVerbs: readonly string[];
  readonly recordVerbs: readonly string[];
  readonly producedFields: readonly string[];
  readonly acceptedFields: readonly string[];
  readonly fieldTerms: JsonObject;
  readonly replayCode: string;
  readonly replayExit: number;
  readonly stamps: JsonObject;
  readonly unknownCommand: JsonObject;
  readonly federationRefusal: JsonObject;
  readonly unknownExit: number;
  readonly missingBlob: JsonObject;
  readonly refusalIds: { readonly operation_id: string; readonly workspace_id: string };
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  readonly reached: readonly string[];
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
function copyOf<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
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

/** Parses the roster from disk, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.stamps) || !isObject(raw.unknownCommand) || !isObject(raw.federationRefusal) ||
    !isObject(raw.fieldTerms) || !isObject(raw.refusalIds)) {
    throw new Error("roster must be an object with rows, stamps, unknownCommand, federationRefusal, fieldTerms and refusalIds");
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
  const { bead, rfVersion, quotePin, stampsSource, replayCode, replayExit, unknownExit, refusalIds } = raw;
  if (typeof bead !== "string" || typeof rfVersion !== "string" || typeof quotePin !== "string" || typeof stampsSource !== "string") {
    throw new Error("roster needs bead, rfVersion, quotePin and stampsSource strings");
  }
  if (typeof replayCode !== "string" || typeof replayExit !== "number" || typeof unknownExit !== "number") throw new Error("roster needs replayCode, replayExit and unknownExit");
  const unknownCommand = objectOf(json(raw.unknownCommand), "roster unknownCommand");
  const federationRefusal = objectOf(json(raw.federationRefusal), "roster federationRefusal");
  for (const [name, envelope] of [["unknownCommand", unknownCommand], ["federationRefusal", federationRefusal]] as const) {
    if (Object.keys(envelope).join(",") !== "schema,ok,command,operation_id,workspace,transaction_id,result,diagnostics" || envelope.ok !== false) {
      throw new Error(`roster ${name} must be the strict eight-key rf failure envelope`);
    }
  }
  if (typeof refusalIds.operation_id !== "string" || typeof refusalIds.workspace_id !== "string") throw new Error("roster refusalIds needs operation_id and workspace_id");
  return {
    bead, rfVersion, quotePin, stampsSource, replayCode, replayExit, unknownExit, unknownCommand, federationRefusal,
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    workspaceVerbs: strings(raw.workspaceVerbs, "workspaceVerbs"),
    recordVerbs: strings(raw.recordVerbs, "recordVerbs"),
    producedFields: strings(raw.producedFields, "producedFields"),
    acceptedFields: strings(raw.acceptedFields, "acceptedFields"),
    fieldTerms: objectOf(json(raw.fieldTerms), "roster fieldTerms"),
    stamps: objectOf(json(raw.stamps), "roster stamps"),
    missingBlob: objectOf(json(raw.missingBlob), "roster missingBlob"),
    refusalIds: { operation_id: refusalIds.operation_id, workspace_id: refusalIds.workspace_id },
    rows,
    tests: strings(raw.tests, "tests"),
    reached: strings(raw.reached, "reached"),
  };
}

const ROSTER = readRoster();
const STAMPS = ROSTER.stamps;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The wb-o4h0.5 row of the tracked bead export: its title and notes. */
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
/** The parenthesized term list after `head` in a clause, split on ", ". */
function termsAfter(clause: string, head: string): string[] {
  const at = clause.indexOf(`${head} (`);
  if (at < 0) return [];
  const open = at + head.length + 2;
  return clause.slice(open, clause.indexOf(")", open)).split(", ");
}

/** Every primitive leaf of a JSON value as `path=json`, keys in order. */
function leaves(value: JsonValue, path: string): string[] {
  if (value === null || typeof value !== "object") return [`${path}=${JSON.stringify(value)}`];
  if (Array.isArray(value)) return value.flatMap((item, index) => leaves(item, `${path}[${index}]`));
  return Object.entries(value).flatMap(([key, item]) => leaves(item, `${path}.${key}`));
}
/** The paths at which a primitive value occurs. */
function pathsOf(value: JsonValue, target: JsonValue, path: string): string[] {
  if (value === null || typeof value !== "object") return value === target ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => pathsOf(item, target, `${path}[${index}]`));
  return Object.entries(value).flatMap(([key, item]) => pathsOf(item, target, `${path}.${key}`));
}
function groupOf(stamps: JsonObject, group: string): JsonObject {
  return objectOf(stamps[group], `stamps.${group}`);
}
/** The stamps with the acceptance stamp missing: the whole group, or the local accepted commit id. */
function pendingStamps(stamps: JsonObject, drop: "group" | "commit"): JsonObject {
  const copy = copyOf(stamps);
  if (drop === "group") delete copy[ACCEPTANCE];
  else delete objectOf(copy[ACCEPTANCE], "stamps.acceptance").local_accepted_commit_id;
  return copy;
}
/** The full-shape noncommitted preview carrying `stamps` as its one additive result key (FW-10c's record fields, constructed). */
function renderWithStamps(stamps: JsonObject): JsonObject {
  const envelope = copyOf(fullShapeRf(ROOT)) as JsonObject;
  objectOf(envelope.result, "result")[IMPORTED] = copyOf(stamps);
  return envelope;
}

/** The measured diagnostic placed on a context.render failure envelope that keeps the measured operation and workspace ids. */
function renderRefusal(): Envelope {
  return {
    schema: REACTIVE_FIBER_CLI_SCHEMA, ok: false, command: "context.render", operation_id: ROSTER.refusalIds.operation_id,
    workspace: { id: ROSTER.refusalIds.workspace_id, root: ROOT }, transaction_id: null, result: null, diagnostics: [copyOf(ROSTER.missingBlob)],
  };
}
/** The full-shape preview with result.observations rows of the given freshness and replayed flags. */
function renderWithRows(rows: readonly (readonly [string, boolean])[]): JsonObject {
  const envelope = copyOf(fullShapeRf(ROOT)) as JsonObject;
  objectOf(envelope.result, "result").observations = rows.map(([freshness, replayed]) => ({ status: "observed", freshness, replayed }));
  return envelope;
}
/** The FW-10c record shape: a committed render (render id, commit, transaction) carrying both stamp groups. */
function committedRecord(): JsonObject {
  const envelope = copyOf(fullShapeRf(ROOT)) as JsonObject;
  envelope.transaction_id = "rft_qqqqqqqqqqqqqqqqqqqqqqqqqq";
  const result = objectOf(envelope.result, "result");
  result.render_id = "rfr_qqqqqqqqqqqqqqqqqqqqqqqqqq";
  result.ephemeral = false;
  result.commit_seq = 3;
  result[IMPORTED] = copyOf(STAMPS);
  return envelope;
}

/** Every object pairing ok true with a workspace-family command in this census's roster (any depth) and in this file's object
 * literals (the shape wb-o4h0.3's fixture walk refuses): the R-SUCCESS-UNTESTED quiet row reads none. */
function familySuccesses(rosterText: string, sourceText: string): string[] {
  const found: string[] = [];
  const walk = (value: unknown, pointer: string): void => {
    if (Array.isArray(value)) {
      const items: readonly unknown[] = value;
      for (const [index, item] of items.entries()) walk(item, `${pointer}/${index}`);
    } else if (isObject(value)) {
      if (value.ok === true && typeof value.command === "string" && FAMILY_COMMAND.test(value.command)) found.push(`roster#${pointer}`);
      for (const [key, child] of Object.entries(value)) walk(child, `${pointer}/${key}`);
    }
  };
  walk(JSON.parse(rosterText) as unknown, "");
  const source = ts.createSourceFile("census.ts", sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const visit = (node: ts.Node): void => {
    if (ts.isObjectLiteralExpression(node)) {
      let ok = false;
      let command: string | undefined;
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) continue;
        if (property.name.text === "ok") ok = property.initializer.kind === ts.SyntaxKind.TrueKeyword;
        if (property.name.text === "command" && ts.isStringLiteralLike(property.initializer)) command = property.initializer.text;
      }
      if (ok && command !== undefined && FAMILY_COMMAND.test(command)) found.push(`source:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return found;
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

const oldPath = process.env.PATH;
const scratches: string[] = [];
let fetches = 0;
afterEach(() => {
  process.env.PATH = oldPath;
  vi.unstubAllGlobals();
  removeScratch(...scratches.splice(0));
});

/** The counting fake producer/network port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake producer port answers no call"));
  });
}

/**
 * A stand-in `rf` first on PATH. It appends one JSON argv line per spawn to the returned log; its first spawn prints `first` and
 * exits `exit`, and any later spawn prints `later` and exits 0.
 */
function standInRf(first: JsonValue, exit: number, later: JsonValue): string {
  const folder = makeScratch("rf-federation-stamps-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  const answers = JSON.stringify({ first, exit, later });
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      "const seen = fs.existsSync(log) ? fs.readFileSync(log, \"utf8\").split(\"\\n\").filter(Boolean).length : 0;",
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${answers};`,
      "process.stdout.write(JSON.stringify(seen === 0 ? answers.first : answers.later));",
      "process.exit(seen === 0 ? answers.exit : 0);",
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

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One registry invocation of the NATIVE preview (registerNativeReactiveFiberRender) against the stand-in rf. */
async function nativeOutcome(first: JsonValue, exit: number): Promise<NativeOutcome> {
  countFetches();
  const log = standInRf(first, exit, json(fullShapeRf(ROOT)));
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}

function observerContext(seam: ReactiveFiberSeam): ReactiveFiberTopologyContext {
  return {
    scope: { workspace: ROOT, principal: "local-operator:tester" }, seam,
    capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
  };
}
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
/** The adapter's one snapshot of `source` under `seam`, or its typed refusal. */
function projected(source: JsonValue, seam: ReactiveFiberSeam): JsonObject {
  try {
    const topology = reactivefiberTopology(readingOf(source), observerContext(seam));
    return objectOf(json({ snapshot: topology.snapshots[0] ?? null, diagnostics: topology.diagnostics }), "projection");
  } catch (error) {
    return { refusal: refusalOf(error) };
  }
}
function snapshotOf(projection: JsonObject): JsonObject {
  return objectOf(projection.snapshot, "projection snapshot");
}
function nodeOf(snapshot: JsonObject): JsonObject {
  return objectOf(snapshot.node, "snapshot node");
}
function refsOf(snapshot: JsonObject): string[] {
  return strings(snapshot.evidenceRefs, "snapshot evidenceRefs");
}

let nativeIds: Promise<{ ids: string[]; texts: string[]; descriptors: DescriptorLike[] }> | undefined;
interface DescriptorLike {
  readonly id: string;
  readonly permissions: readonly string[];
  readonly contractSource?: string;
}
/** The native registration's descriptors, loaded once: the ids, each descriptor's JSON text and the selector fields. */
function nativeDescriptors(): Promise<{ ids: string[]; texts: string[]; descriptors: DescriptorLike[] }> {
  nativeIds ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    const descriptors = registry.catalogSnapshot().map(entry => entry.descriptor);
    return {
      ids: descriptors.map(descriptor => descriptor.id),
      texts: descriptors.map(descriptor => JSON.stringify(descriptor)),
      descriptors: descriptors.map(descriptor => ({
        id: descriptor.id, permissions: [...descriptor.permissions],
        ...(descriptor.contractSource !== undefined ? { contractSource: descriptor.contractSource } : {}),
      })),
    };
  });
  return nativeIds;
}
/** An rf registration: a reactivefiber id, an rf permission or an rf contractSource (any one suffices). */
function rfSelected(descriptor: DescriptorLike): boolean {
  return descriptor.id.startsWith("reactivefiber.") || descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) ||
    (descriptor.contractSource ?? "").startsWith("rf@");
}

/** Every call of the injected reader seam (registerReactiveFiberRender, named or as a member) in one module. */
function seamCallSites(fileName: string, text: string): string[] {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "";
      if (name === "registerReactiveFiberRender") sites.push(`${fileName}:${source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}

interface VerbScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** One module's rf workspace and record verbs: an argv word pair, or a string or template literal spelling one or an RF_FED_ code. */
function scanVerbs(fileName: string, text: string): VerbScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const argv: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const spelled = (value: string): boolean => WORKSPACE_VERB.test(value) || RECORD_VERB.test(value) || FEDERATION_CODE.test(value);
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if ((word !== "workspace" && word !== "context") || index + 1 >= words.length) return;
        const next = words[index + 1];
        const verbs = word === "workspace" ? WORKSPACE_VERBS : RECORD_VERBS;
        if (next !== null && next !== undefined && verbs.includes(next)) argv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
        else if (word === "context" && next === "render") renderArgv += 1;
        else if (next === null) composedArgv += 1;
      });
    }
    if (ts.isStringLiteralLike(node) && spelled(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (spelled(parts.join(" "))) literals.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, renderArgv, composedArgv };
}

interface PortScan {
  readonly externals: string[];
  readonly network: string[];
  readonly filesystem: string[];
  readonly composed: string[];
  readonly globals: string[];
  readonly launches: string[];
  readonly escaped: string[];
  readonly digests: string[];
  readonly local: string[];
}
/** Whether an identifier node is a reference (not a property name, a member name or an import/export specifier name). */
function isReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) return false;
  if ((ts.isPropertyAssignment(parent) || ts.isPropertyDeclaration(parent) || ts.isPropertySignature(parent) || ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) || ts.isEnumMember(parent) || ts.isGetAccessorDeclaration(parent) || ts.isSetAccessorDeclaration(parent)) && parent.name === node) return false;
  if (ts.isBindingElement(parent) && parent.propertyName === node) return false;
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent) || ts.isImportClause(parent) || ts.isNamespaceImport(parent)) return false;
  return true;
}
/** The text of a call's first argument: the literal it spells, or "<composed>". */
function firstArgument(call: ts.CallExpression): string {
  const first = call.arguments[0];
  return first !== undefined && ts.isStringLiteralLike(first) ? first.text : "<composed>";
}
/**
 * One module's ports. Module specifiers (static import, re-export, dynamic import and require; a non-literal specifier is
 * `composed`), network and filesystem modules among them, every reference to a network global (globalThis included, so a member,
 * an element access, an alias or a destructuring of it is a reference), every launch through a child_process binding (named,
 * aliased, default or namespace import; its first argument's literal or "<composed>"; a worker or cluster module is a launch of
 * its own), every reference to a named launcher outside a call (`escaped`), and every digest call (createHash, createHmac, hash)
 * with the argument its `.update` reads.
 */
function scanPorts(fileName: string, text: string): PortScan {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const specifiers: string[] = [];
  const composed: string[] = [];
  const globals: string[] = [];
  const launches: string[] = [];
  const escaped: string[] = [];
  const digests: string[] = [];
  const named = new Set<string>();
  const spaces = new Set<string>();
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteralLike(statement.moduleSpecifier)) continue;
    if (WORKER_MODULE.test(statement.moduleSpecifier.text)) launches.push(`<module ${statement.moduleSpecifier.text}>`);
    if (!LAUNCH_MODULES.includes(statement.moduleSpecifier.text)) continue;
    const clause = statement.importClause;
    if (clause?.name !== undefined) spaces.add(clause.name.text);
    const bindings = clause?.namedBindings;
    if (bindings !== undefined && ts.isNamespaceImport(bindings)) spaces.add(bindings.name.text);
    if (bindings !== undefined && ts.isNamedImports(bindings)) for (const element of bindings.elements) named.add(element.name.text);
  }
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined && ts.isStringLiteralLike(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      const dynamic = callee.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(callee) && callee.text === "require");
      if (dynamic) {
        const first = node.arguments[0];
        if (first !== undefined && ts.isStringLiteralLike(first)) {
          specifiers.push(first.text);
          if (LAUNCH_MODULES.includes(first.text) || WORKER_MODULE.test(first.text)) launches.push(`<module ${first.text}>`);
        } else composed.push(`${fileName}: ${callee.getText(source)}(<composed>)`);
      }
      if (ts.isIdentifier(callee) && named.has(callee.text)) launches.push(firstArgument(node));
      if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && spaces.has(callee.expression.text)) launches.push(firstArgument(node));
      const api = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : "";
      if (DIGEST_APIS.has(api)) {
        const chained = ts.isPropertyAccessExpression(node.parent) && node.parent.name.text === "update" && ts.isCallExpression(node.parent.parent) ? node.parent.parent : undefined;
        const read = chained?.arguments[0]?.getText(source);
        digests.push(`${fileName}: ${api}(${firstArgument(node)})${read !== undefined ? `.update(${read})` : ""}`);
      }
    }
    if (ts.isIdentifier(node) && isReference(node)) {
      if (NETWORK_GLOBALS.has(node.text)) globals.push(`${fileName}: ${node.text}`);
      if (DYNAMIC_CODE.has(node.text)) composed.push(`${fileName}: ${node.text}`);
      const called = ts.isCallExpression(node.parent) && node.parent.expression === node;
      if (named.has(node.text) && !called) escaped.push(`${fileName}: ${node.text}`);
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "subtle") digests.push(`${fileName}: subtle`);
    ts.forEachChild(node, visit);
  };
  visit(source);
  for (const specifier of specifiers) if (LOADER_MODULE.test(specifier)) composed.push(`${fileName}: ${specifier}`);
  const local = specifiers.filter(specifier => specifier.startsWith("."));
  const externals = specifiers.filter(specifier => !specifier.startsWith("."));
  return {
    externals, network: externals.filter(specifier => NETWORK_MODULE.test(specifier)), filesystem: externals.filter(specifier => FILESYSTEM_MODULE.test(specifier)),
    composed, globals, launches, escaped, digests, local,
  };
}

/** The reader modules' transitive src import closure, each module's ports merged. */
function readerClosure(): { modules: string[]; unresolved: string[]; ports: PortScan } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const merged: PortScan = { externals: [], network: [], filesystem: [], composed: [], globals: [], launches: [], escaped: [], digests: [], local: [] };
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || seen.has(file)) continue;
    seen.add(file);
    const scan = scanPorts(relative(REPO, file), textOf(file));
    merged.externals.push(...scan.externals);
    merged.network.push(...scan.network);
    merged.filesystem.push(...scan.filesystem);
    merged.composed.push(...scan.composed);
    merged.globals.push(...scan.globals);
    merged.launches.push(...scan.launches);
    merged.escaped.push(...scan.escaped);
    merged.digests.push(...scan.digests);
    for (const specifier of scan.local) {
      const target = join(dirname(file), specifier.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${relative(REPO, file)}: ${specifier}`);
    }
  }
  return { modules: [...seen].map(file => relative(REPO, file)).sort(), unresolved, ports: merged };
}

interface ScanRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchorFile: string;
  readonly anchorToken: string;
}
/** The roots a stamp table or computed stamp could live in; each floor sits below the count measured at base a7896f8 (src 115 .ts
 * modules among its files, qa 67 files), so an emptied walk reds and an additive change does not. */
const STAMP_ROOTS: readonly ScanRoot[] = [
  { root: "src", floor: 100, anchorFile: "workbench/reactivefiber-observer.ts", anchorToken: "rf-output:sha256:" },
  { root: "qa", floor: 50, anchorFile: "workbench/receipts-index.mjs", anchorToken: "docs/workbench/receipts" },
];
function scanStamps(scan: ScanRoot): JsonValue {
  const base = join(REPO, scan.root);
  const files = filesBelow(base);
  const floorMet = files.length >= scan.floor;
  const anchor = join(base, scan.anchorFile);
  const anchorRead = files.includes(anchor) && textOf(anchor).includes(scan.anchorToken);
  const hits = files.filter(file => STAMP_FAMILY.test(textOf(file))).map(file => relative(REPO, file));
  expect(floorMet, `${scan.root}: ${files.length} files walked, floor ${scan.floor}`).toBe(true);
  expect(anchorRead, `${scan.root}: the anchor ${scan.anchorFile} was not read with ${scan.anchorToken}`).toBe(true);
  expect(hits, `files spelling the stamp vocabulary under ${scan.root}`).toEqual([]);
  return { root: scan.root, floor: scan.floor, floorMet, anchorRead, hits };
}

/** The NATIVE reader's reading of the preview carrying `stamps` (a stand-in rf answers it, exit 0), held byte for byte to the same
 * render built from `fresh` (a fresh roster read): no refusal, one spawn, fetch 0. Returns the reading's source and those facts. */
async function nativeVerbatim(stamps: JsonObject, fresh: JsonObject): Promise<{ source: JsonObject; verbatim: JsonObject }> {
  const outcome = await nativeOutcome(renderWithStamps(stamps), 0);
  const reading = objectOf(outcome.reading ?? null, "native reading");
  const source = objectOf(reading.source, "reading source");
  const expected = JSON.stringify(renderWithStamps(fresh));
  expect(outcome.refusal).toBeNull();
  expect(reading.contract).toBe(REACTIVEFIBER_RENDER_PREVIEW_CONTRACT);
  expect(reading.workspaceRoot).toBe(ROOT);
  // Byte for byte against the render built from the roster as read from disk now, key order included.
  expect(JSON.stringify(source)).toBe(expected);
  expect(outcome.spawns).toHaveLength(1);
  expect(fetches).toBe(0);
  const verbatim = {
    readingKeys: Object.keys(reading).sort(), contract: reading.contract ?? null, workspaceRoot: reading.workspaceRoot === ROOT,
    bytesEqual: JSON.stringify(source) === expected, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches,
  };
  return { source, verbatim };
}
function carriedOf(source: JsonObject): JsonObject {
  return objectOf(objectOf(source.result, "reading result")[IMPORTED] ?? null, `reading result.${IMPORTED}`);
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const files = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts"));
    const found = files.map(file => scanVerbs(relative(REPO, file), textOf(file)));
    const argv = found.flatMap(result => result.argv);
    const literals = found.flatMap(result => result.literals);
    const renderArgvSeen = found.reduce((sum, result) => sum + result.renderArgv, 0) >= 1;
    const composedArgv = found.reduce((sum, result) => sum + result.composedArgv, 0);
    const { ids, texts } = await nativeDescriptors();
    const descriptorHits = ids.filter((_id, index) => {
      const text = texts[index] ?? "";
      return WORKSPACE_VERB.test(text) || RECORD_VERB.test(text) || FEDERATION_CODE.test(text);
    });
    const srcFloorMet = files.length >= 100;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, descriptorHits }, "an rf federation read needs rfc-0txnl.20 and rfc-0txnl.24").toStrictEqual({ argv: [], literals: [], descriptorHits: [] });
    const control = (text: string): JsonValue => {
      const scan = scanVerbs("control.ts", text);
      return { hits: scan.argv.length + scan.literals.length, composed: scan.composedArgv };
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "workspace", "read", ref, "--json"]);'),
      recordArgv: control('spawn("rf", ["--workspace", w, "context", "history", "--json"]);'),
      spaced: control('const cmd = "rf workspace read knowledge:view:architecture --json";'),
      dotted: control('const id = "workspace.inspect";'),
      upper: control('const id = "WORKSPACE.LINKS";'),
      recordDotted: control('const id = "context.explain";'),
      template: control(["const cmd = `rf workspace  exports $", "{alias}`;"].join("")),
      code: control('const code = "RF_FED_STALE";'),
      colon: control('const grant = "workspace:read";'),
      slash: control('const route = "context/history";'),
      camel: control('const verb = "workspaceSubscribe";'),
      composedArgv: control('const verb = "read"; spawn("rf", ["workspace", verb]);'),
      callComposed: control('const argv = ["workspace"]; argv.push("read"); spawn("rf", argv.concat(["--json"]));'),
    };
    return { srcFloorMet, renderArgvSeen, argv, literals, descriptorHits, composedArgv, controls };
  },
  A2: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const native = (await nativeDescriptors()).descriptors.filter(rfSelected).map(descriptor => descriptor.id);
    const injectedIds = injected.catalogSnapshot().map(entry => entry.descriptor).filter(rfSelected).map(descriptor => descriptor.id);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const seamCalls = filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).flatMap(file => seamCallSites(relative(REPO, file), textOf(file)));
    expect(native).toStrictEqual([PREVIEW_ID]);
    expect(seamCalls, "the injected reader seam stays test-reachable only (R-SEAM)").toEqual([]);
    expect(injectedIds).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    const controls = {
      byId: rfSelected({ id: "reactivefiber.workspace.read", permissions: [] }),
      byPermission: rfSelected({ id: "rf.context.reread", permissions: ["reactivefiber:render"] }),
      byContract: rfSelected({ id: "federation.reread", permissions: [], contractSource: "rf@0.1.832:reactive-fiber.cli/v1 workspace.read" }),
      untagged: rfSelected({ id: "federation.reread", permissions: ["federation:read"] }),
    };
    return { native, injected: injectedIds, reconcile, seamCalls, controls };
  },
  A3: async () => {
    const measured = ROSTER.unknownCommand;
    const diagnostic = objectOf(Array.isArray(measured.diagnostics) ? (measured.diagnostics[0] ?? null) : null, "unknownCommand diagnostics[0]");
    const choices = strings(objectOf(diagnostic.metadata ?? null, "unknownCommand metadata").choices, "unknownCommand choices");
    const fetchesSeen: number[] = [];
    // Each refusal, and as its control the same diagnostic on a context.render failure, which reads as the render refusal it would
    // be: the command is what the reader refuses.
    const read = async (envelope: JsonObject): Promise<JsonValue> => {
      const outcome = await nativeOutcome(json(envelope), ROSTER.unknownExit);
      fetchesSeen.push(fetches);
      const renderShaped = copyOf(envelope);
      renderShaped.command = "context.render";
      const control = await nativeOutcome(renderShaped, ROSTER.unknownExit);
      fetchesSeen.push(fetches);
      expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
      expect(outcome.reading).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      expect(control.refusal?.category).toBe("unavailable");
      return { refusal: outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), control: control.refusal };
    };
    const successes = familySuccesses(readFileSync(ROSTER_PATH, "utf8"), readFileSync(fileURLToPath(import.meta.url), "utf8"));
    expect(diagnostic.code).toBe(UNKNOWN_COMMAND);
    expect(ROSTER.unknownExit).toBe(UNKNOWN_EXIT);
    expect(choices.includes("workspace")).toBe(false);
    expect(String(ROSTER.federationRefusal.command)).toMatch(FAMILY_COMMAND);
    const readings = { measured: await read(measured), federation: await read(ROSTER.federationRefusal) };
    expect(fetchesSeen).toEqual([0, 0, 0, 0]);
    expect(successes, "R-SUCCESS-UNTESTED quiet row: no workspace-family success envelope is fabricated here").toEqual([]);
    return { code: diagnostic.code ?? null, exit: ROSTER.unknownExit, choices: choices.length, workspaceChosen: choices.includes("workspace"), readings, fetchesSeen, successes };
  },
  A4: async () => {
    const refused = { category: "validation", message: "ReactiveFiber topology refused: source must be a reactive-fiber.cli/v1 context.render envelope." };
    const measured = projected(json(ROSTER.unknownCommand), "rf-cli");
    const federation = projected(json(ROSTER.federationRefusal), "rf-cli");
    expect(measured.refusal).toStrictEqual(refused);
    expect(federation.refusal).toStrictEqual(refused);
    return { measured, federation };
  },
  A5: async () => {
    const record = committedRecord();
    const outcome = await nativeOutcome(record, 0);
    const projection = projected(record, "rf-cli");
    expect(outcome.refusal?.category).toBe("transport");
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    expect(objectOf(projection.refusal ?? null, "adapter refusal").category).toBe("validation");
    return { native: outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, fetches, adapter: projection.refusal ?? null };
  },
  B1: async () => {
    const origin = groupOf(STAMPS, ORIGIN);
    const acceptance = groupOf(STAMPS, ACCEPTANCE);
    const clause = acceptanceClauses(exportRow().notes).a ?? "";
    const termsOf = (fields: readonly string[]): string[] => [...new Set(fields.map(field => FIELD_TERMS[field] ?? `<unmapped ${field}>`))];
    const valuesOf = (group: JsonObject): string[] => leaves(group, "").map(leaf => leaf.slice(leaf.indexOf("=") + 1));
    const shared = valuesOf(acceptance).filter(value => valuesOf(origin).includes(value));
    // The stamps share no value with the full-shape render they ride, so every placement and no-fill check below is unambiguous.
    const render = renderWithStamps({});
    const collisions = [...valuesOf(origin), ...valuesOf(acceptance)].filter(value => pathsOf(render, JSON.parse(value) as JsonValue, "render").length > 0);
    expect(Object.keys(STAMPS)).toEqual(["status", "source_owner", ORIGIN, ACCEPTANCE]);
    expect(Object.keys(origin)).toEqual(PRODUCED_FIELDS);
    expect(Object.keys(acceptance)).toEqual(ACCEPTED_FIELDS);
    expect(termsOf(PRODUCED_FIELDS)).toEqual(termsAfter(clause, "produced-at-B fields"));
    expect(termsOf(ACCEPTED_FIELDS)).toEqual(termsAfter(clause, "accepted-into-A fields"));
    expect(shared).toEqual([]);
    expect(collisions).toEqual([]);
    expect(ROSTER.stampsSource).toBe("constructed");
    return {
      source: ROSTER.stampsSource, carrier: IMPORTED, stampKeys: Object.keys(STAMPS), originKeys: Object.keys(origin), acceptanceKeys: Object.keys(acceptance),
      producedTerms: termsAfter(clause, "produced-at-B fields"), acceptedTerms: termsAfter(clause, "accepted-into-A fields"),
      mappedProduced: termsOf(PRODUCED_FIELDS), mappedAccepted: termsOf(ACCEPTED_FIELDS), shared, collisions,
    };
  },
  B2: async () => {
    const fresh = readRoster().stamps;
    const { source, verbatim } = await nativeVerbatim(STAMPS, fresh);
    const carried = carriedOf(source);
    const origin = leaves(groupOf(carried, ORIGIN), ORIGIN);
    const acceptance = leaves(groupOf(carried, ACCEPTANCE), ACCEPTANCE);
    expect(origin).toEqual(leaves(groupOf(fresh, ORIGIN), ORIGIN));
    expect(acceptance).toEqual(leaves(groupOf(fresh, ACCEPTANCE), ACCEPTANCE));
    expect(carried.status).toStrictEqual(fresh.status);
    expect(carried.source_owner).toStrictEqual(fresh.source_owner);
    return { verbatim, origin, acceptance, status: carried.status ?? null, sourceOwner: carried.source_owner ?? null };
  },
  B3: async () => {
    const fresh = readRoster().stamps;
    const { source, verbatim } = await nativeVerbatim(STAMPS, fresh);
    const result = objectOf(source.result, "reading result");
    const carried = carriedOf(source);
    const origin = groupOf(carried, ORIGIN);
    const acceptance = groupOf(carried, ACCEPTANCE);
    const crossKeys = Object.keys(origin).filter(key => Object.hasOwn(acceptance, key));
    const placed: JsonObject = {};
    for (const [group, values] of [[ORIGIN, origin], [ACCEPTANCE, acceptance]] as const) {
      for (const [field, value] of Object.entries(values)) placed[`${group}.${field}`] = pathsOf(source, value, "source");
    }
    const misplaced = Object.entries(placed).filter(([field, paths]) => JSON.stringify(paths) !== JSON.stringify([`source.result.${IMPORTED}.${field}`])).map(([field]) => field);
    // R-WITHHELD: the adapter's projection of the same render carries no stamp text value in any snapshot field or diagnostic.
    const shown = JSON.stringify(projected(renderWithStamps(fresh), "rf-cli"));
    const stampTexts = [...leaves(origin, ""), ...leaves(acceptance, "")].map(leaf => JSON.parse(leaf.slice(leaf.indexOf("=") + 1)) as JsonValue).filter(value => typeof value === "string");
    const projectedStamps = stampTexts.filter(value => shown.includes(String(value)));
    expect(Object.keys(result)).toEqual(Object.keys(objectOf(renderWithStamps(fresh).result, "fresh result")));
    expect(crossKeys).toEqual([]);
    expect(misplaced).toEqual([]);
    expect(shown.includes("refusal")).toBe(false);
    expect(projectedStamps).toEqual([]);
    return { verbatim, resultKeys: Object.keys(result), crossKeys, misplaced, placed, projectedStamps };
  },
  C1: async () => {
    const variants: JsonObject = {};
    for (const drop of ["group", "commit"] as const) {
      const fresh = pendingStamps(readRoster().stamps, drop);
      const { source, verbatim } = await nativeVerbatim(pendingStamps(STAMPS, drop), fresh);
      const carried = carriedOf(source);
      const acceptance = Object.hasOwn(carried, ACCEPTANCE) ? Object.keys(groupOf(carried, ACCEPTANCE)) : null;
      const origin = groupOf(carried, ORIGIN);
      const revisions: JsonObject = {};
      for (const field of B_SIDE_REVISIONS) revisions[field] = pathsOf(source, origin[field] ?? null, "source");
      const added = Object.keys(carried).filter(key => !Object.hasOwn(fresh, key));
      for (const field of B_SIDE_REVISIONS) expect(revisions[field]).toStrictEqual([`source.result.${IMPORTED}.${ORIGIN}.${field}`]);
      expect(added).toEqual([]);
      variants[drop] = { verbatim, acceptance, revisions, added };
    }
    expect(objectOf(variants.group ?? null, "group variant").acceptance).toBeNull();
    expect(objectOf(variants.commit ?? null, "commit variant").acceptance).toStrictEqual(ACCEPTED_FIELDS.filter(field => field !== "local_accepted_commit_id"));
    return { variants };
  },
  C2: async () => {
    const base = fullShapeRf(ROOT) as JsonObject;
    const graph = String(objectOf(objectOf(base.result, "result").provenance, "provenance").graph_revision_id);
    const bundle = String(objectOf(base.result, "result").bundle_revision_id);
    const variant = (edit: (result: JsonObject) => void): JsonObject => {
      const copy = copyOf(base);
      edit(objectOf(copy.result, "result"));
      return copy;
    };
    const read = (projection: JsonObject): JsonValue => {
      if (projection.refusal !== undefined) return projection.refusal;
      const snapshot = snapshotOf(projection);
      return {
        sourceRevision: snapshot.sourceRevision ?? null, sourceVersion: Object.hasOwn(snapshot, "sourceVersion") ? (snapshot.sourceVersion ?? null) : "<absent>",
        refs: refsOf(snapshot).filter(ref => ref.startsWith("rf-graph:") || ref.startsWith("rf-bundle:")),
      };
    };
    const changedGraph = `sha256:${"9".repeat(64)}`;
    const readings = {
      stated: read(projected(base, "rf-cli")),
      unstated: read(projected(variant(result => {
        delete result.bundle_revision_id;
      }), "rf-cli")),
      changedGraph: read(projected(variant(result => {
        objectOf(result.provenance, "provenance").graph_revision_id = changedGraph;
      }), "rf-cli")),
      graphAbsent: read(projected(variant(result => {
        delete objectOf(result.provenance, "provenance").graph_revision_id;
      }), "rf-cli")),
      graphMalformed: read(projected(variant(result => {
        objectOf(result.provenance, "provenance").graph_revision_id = "sha256:not-a-digest";
      }), "rf-cli")),
      withStamps: read(projected(renderWithStamps(STAMPS), "rf-cli")),
    };
    expect(readings.stated).toStrictEqual({ sourceRevision: graph, sourceVersion: bundle, refs: [`rf-graph:${graph}`, `rf-bundle:${bundle}`] });
    expect(readings.unstated).toStrictEqual({ sourceRevision: graph, sourceVersion: "<absent>", refs: [`rf-graph:${graph}`] });
    expect(readings.changedGraph).toStrictEqual({ sourceRevision: changedGraph, sourceVersion: bundle, refs: [`rf-graph:${changedGraph}`, `rf-bundle:${bundle}`] });
    expect(objectOf(readings.graphAbsent, "graphAbsent").category).toBe("validation");
    expect(readings.graphMalformed).toStrictEqual(readings.graphAbsent);
    expect(readings.withStamps).toStrictEqual(readings.stated);
    return readings;
  },
  C3: async () => {
    const roots = STAMP_ROOTS.map(scanStamps);
    const { modules, ports } = readerClosure();
    const base = fullShapeRf(ROOT) as JsonObject;
    const result = objectOf(base.result, "result");
    const text = String(objectOf(result.output, "output").text);
    const graph = String(objectOf(result.provenance, "provenance").graph_revision_id);
    const bundle = String(result.bundle_revision_id);
    const snapshot = snapshotOf(projected(base, "rf-cli"));
    const expected = `rf-output:sha256:${createHash("sha256").update(text).digest("hex")}`;
    const carriers = Object.entries(snapshot).filter(([, value]) => JSON.stringify(value).includes(expected.slice("rf-output:".length))).map(([key]) => key);
    expect(modules.length >= 5).toBe(true);
    expect(ports.digests).toEqual(["src/workbench/reactivefiber-observer.ts: createHash(sha256).update(output.text)"]);
    expect(snapshot.nativePayloadRef).toBe(expected);
    expect(carriers).toEqual(["nativePayloadRef"]);
    expect([graph, bundle]).not.toContain(expected.slice("rf-output:".length));
    const stampControl = (spelling: string): boolean => STAMP_FAMILY.test(spelling);
    const digestControl = (source: string): string[] => scanPorts("control.ts", source).digests;
    const controls = {
      snake: stampControl("accepted_snapshot_revision"),
      camel: stampControl("localAcceptedCommitId"),
      prose: stampControl("produced at B"),
      into: stampControl("accepted into A"),
      quietWord: stampControl("accepted"),
      graphDigest: digestControl('import { createHash } from "node:crypto"; createHash("sha256").update(graph).digest("hex");'),
      memberDigest: digestControl('import * as crypto from "node:crypto"; crypto.createHash("sha256").update(bundle);'),
      hmac: digestControl('import { createHmac } from "node:crypto"; createHmac("sha256", key).update(revision);'),
      oneShot: digestControl('import { hash } from "node:crypto"; hash("sha256", revision);'),
      subtle: digestControl('await globalThis.crypto.subtle.digest("SHA-256", bytes);'),
      handRolled: digestControl('let stamp = 0; for (const unit of revision) stamp = (stamp * 31 + unit.charCodeAt(0)) | 0;'),
    };
    return { roots, closureModules: modules.length, digests: ports.digests, nativePayloadRef: snapshot.nativePayloadRef ?? null, carriers, controls };
  },
  D1: async () => {
    const measured: unknown = JSON.parse(readFileSync(MEASURED_PATH, "utf8"));
    const blob = isObject(measured) && isObject(measured.envelopes) ? measured.envelopes.blob : undefined;
    const measuredEnvelope = envelopeOf(blob, "measured blob");
    const outcome = await nativeOutcome(json(renderRefusal()), REPLAY_EXIT);
    expect(ROSTER.missingBlob).toStrictEqual(measuredEnvelope.diagnostics[0]);
    expect(ROSTER.refusalIds).toStrictEqual({ operation_id: measuredEnvelope.operation_id, workspace_id: measuredEnvelope.workspace.id });
    expect(ROSTER.missingBlob.code).toBe(SNAPSHOT_MISSING);
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${SNAPSHOT_MISSING}` });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    const measuredEqual = JSON.stringify(ROSTER.missingBlob) === JSON.stringify(measuredEnvelope.diagnostics[0]);
    const idsEqual = ROSTER.refusalIds.operation_id === measuredEnvelope.operation_id && ROSTER.refusalIds.workspace_id === measuredEnvelope.workspace.id;
    return { measuredEqual, idsEqual, code: ROSTER.missingBlob.code ?? null, refusal: outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  D2: async () => {
    const seams: JsonObject = {};
    for (const seam of ["rf-cli", "injected-fixture"] as const) {
      const projection = projected(json(renderRefusal()), seam);
      const snapshot = snapshotOf(projection);
      const node = nodeOf(snapshot);
      const carried = ["sourceRevision", "sourceVersion", "nativePayloadRef"].filter(key => Object.hasOwn(snapshot, key));
      expect(node.statusTone).toBe("failure");
      expect(snapshot.coverage).toBe("unknown");
      expect(String(node.statusText)).toContain(`refused ${DOT} ${SNAPSHOT_MISSING}`);
      expect(carried).toEqual([]);
      seams[seam] = { statusTone: node.statusTone ?? null, coverage: snapshot.coverage ?? null, statusText: node.statusText ?? null, carried, evidenceRefs: refsOf(snapshot) };
    }
    return seams;
  },
  D3: async () => {
    const read = (rows: readonly (readonly [string, boolean])[]): JsonValue => {
      const projection = projected(renderWithRows(rows), "rf-cli");
      if (projection.refusal !== undefined) return projection.refusal;
      const snapshot = snapshotOf(projection);
      const notes = strings(projection.diagnostics, "projection diagnostics").filter(note => note.startsWith("observations:"));
      return { coverage: snapshot.coverage ?? null, statusTone: nodeOf(snapshot).statusTone ?? null, notes };
    };
    const readings = {
      fresh: read([["captured_at_render", false], ["captured_at_render", false]]),
      replayed: read([["reused", true], ["reused", true]]),
      mixed: read([["captured_at_render", false], ["reused", true]]),
      replayClaimedCurrent: read([["captured_at_render", true]]),
      reusedNotReplayed: read([["reused", false]]),
    };
    expect(readings.fresh).toStrictEqual({ coverage: "complete", statusTone: "success", notes: ["observations: 2 rows, 0 reused"] });
    expect(readings.replayed).toStrictEqual({ coverage: "partial", statusTone: "unknown", notes: ["observations: 2 rows, 2 reused: partial"] });
    expect(readings.mixed).toStrictEqual({ coverage: "partial", statusTone: "unknown", notes: ["observations: 2 rows, 1 reused: partial"] });
    expect(objectOf(readings.replayClaimedCurrent, "replayClaimedCurrent").category).toBe("validation");
    expect(readings.reusedNotReplayed).toStrictEqual(readings.replayClaimedCurrent);
    return readings;
  },
  E1: async () => {
    const owner = objectOf(STAMPS.source_owner ?? null, "source_owner");
    const origin = groupOf(STAMPS, ORIGIN);
    const tokens = [String(owner.alias), String(objectOf(owner.locator ?? null, "locator").path), String(origin.workspace_id), String(origin.instance_id)];
    const spy = async (first: JsonValue, exit: number): Promise<JsonValue> => {
      const outcome = await nativeOutcome(first, exit);
      const argv = outcome.spawns[0] ?? [];
      const namesOwner = tokens.filter(token => argv.some(word => word.includes(token)));
      expect(outcome.spawns).toHaveLength(1);
      expect(argv).toContain("--no-commit");
      expect(namesOwner).toEqual([]);
      const verbSpelled = WORKSPACE_VERB.test(argv.join(" ")) || RECORD_VERB.test(argv.join(" "));
      expect(verbSpelled).toBe(false);
      expect(fetches).toBe(0);
      return {
        refused: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns),
        noCommit: argv.includes("--no-commit"), verbSpelled, namesOwner, fetches,
      };
    };
    return {
      tokens,
      missingBlob: await spy(json(renderRefusal()), REPLAY_EXIT),
      replayedRows: await spy(renderWithRows([["reused", true]]), 0),
    };
  },
  E2: async () => {
    const { modules, unresolved, ports } = readerClosure();
    const anchorsRead = READER_MODULES.every(module => modules.includes(module)) && modules.includes("src/workbench/capability-registry.ts");
    const closureFloorMet = modules.length >= 5;
    const launches = [...new Set(ports.launches)].sort();
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead).toBe(true);
    expect(unresolved).toEqual([]);
    expect({ network: ports.network, filesystem: ports.filesystem, composed: ports.composed, globals: ports.globals, escaped: ports.escaped, launches }).toStrictEqual({
      network: [], filesystem: [], composed: [], globals: [], escaped: [], launches: ["rf"],
    });
    const control = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { network: scan.network.length, filesystem: scan.filesystem.length, composed: scan.composed.length, globals: scan.globals.length, escaped: scan.escaped.length, launches: scan.launches };
    };
    const controls = {
      http: control('import { request } from "node:http";'),
      requireNet: control('const net = require("node:net");'),
      composedImport: control('const mod = await import("node:" + "https");'),
      fs: control('import { readFileSync } from "node:fs";'),
      fsPromises: control('import { readFile } from "node:fs/promises";'),
      fetch: control("await fetch(owner);"),
      globalFetch: control("await globalThis.fetch(owner);"),
      elementFetch: control('await globalThis["fetch"](owner);'),
      aliasFetch: control("const get = globalThis.fetch; await get(owner);"),
      destructured: control("const { fetch: get } = globalThis; await get(owner);"),
      socket: control("const socket = new WebSocket(owner);"),
      namespaceLaunch: control('import * as cp from "node:child_process"; cp.spawn("curl", [owner]);'),
      aliasLaunch: control('import { spawn as run } from "node:child_process"; run("curl", [owner]);'),
      escapedLaunch: control('import { spawn } from "node:child_process"; const run = spawn; run("rf", []);'),
      composedLaunch: control('import { spawn } from "node:child_process"; spawn(command, []);'),
      worker: control('import { Worker } from "node:worker_threads";'),
      loader: control('import { createRequire } from "node:module";'),
      dynamicCode: control('const get = new Function("return fetch");'),
      hostAlias: control("await self.fetch(owner);"),
    };
    return {
      closureFloorMet, anchorsRead, modules, unresolved, externals: [...new Set(ports.externals)].sort(), network: ports.network, filesystem: ports.filesystem,
      composed: ports.composed, globals: ports.globals, escaped: ports.escaped, launches, controls,
    };
  },
};

/** Each pin's witness as its case returned it; the record compares the whole set against the roster a second time. */
const MEASURED: Record<string, JsonValue> = {};
/** Each pin's assertion count when its case reached its end (its witness comparison included), in run order: `${pin}:${count}`. */
const REACHED: string[] = [];

describe("wb-o4h0.5 rf federation stamps census (RF-FEDERATED-WORKSPACES-R7, absent-today leg)", () => {
  it(JUDGED_TITLE, () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:3", "C:3", "D:3", "E:2"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD, quotePin: QUOTE_PIN, gatingArtifacts: GATING_ARTIFACTS, workspaceVerbs: WORKSPACE_VERBS, recordVerbs: RECORD_VERBS,
      producedFields: PRODUCED_FIELDS, acceptedFields: ACCEPTED_FIELDS, fieldTerms: FIELD_TERMS, replayCode: SNAPSHOT_MISSING, replayExit: REPLAY_EXIT,
    }).toStrictEqual({
      bead: ROSTER.bead, quotePin: ROSTER.quotePin, gatingArtifacts: [...ROSTER.gatingArtifacts], workspaceVerbs: [...ROSTER.workspaceVerbs],
      recordVerbs: [...ROSTER.recordVerbs], producedFields: [...ROSTER.producedFields], acceptedFields: [...ROSTER.acceptedFields],
      fieldTerms: ROSTER.fieldTerms, replayCode: ROSTER.replayCode, replayExit: ROSTER.replayExit,
    });
    // The anchor outside this file and its roster: the owner filing in the tracked bead export.
    const { title, notes } = exportRow();
    const clauses = acceptanceClauses(notes);
    const acceptanceRows = ROWS.filter(row => /^\([a-d]\) /.test(row.label));
    expect(Object.keys(clauses)).toEqual(["a", "b", "c", "d"]);
    expect(acceptanceRows.map(row => row.label)).toEqual(Object.entries(clauses).map(([letter, clause]) => `(${letter}) ${clause}`));
    expect(title.startsWith(`[RF-FEDERATED-WORKSPACES-R7] ${TRIGGER}`)).toBe(true);
    expect(ROWS[0]?.label.includes(TRIGGER)).toBe(true);
    expect(GATING_ARTIFACTS.filter(artifact => !notes.includes(artifact))).toEqual([]);
    expect(notes.includes(QUOTE_PIN)).toBe(true);
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
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
    expect(titles, "the judged title, one test per pin in row order, then this record").toEqual([JUDGED_TITLE, ...ROWS.flatMap(entry => entry.pins), RECORD_TITLE]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    const rosterWitnesses = Object.fromEntries(ROSTER.rows.flatMap(entry => entry.pins.map(pin => [pin.id, pin.witness])));
    expect(MEASURED, "every pin's witness, compared against the roster a second time").toStrictEqual(rosterWitnesses);
    expect(REACHED, "every pin reached its end, in row order, with its pinned assertion count").toEqual([...ROSTER.reached]);
  });
});
