/**
 * wb-if7q.2 (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R2), the posture leg. Statement (bead notes, full form): "Pi's rf reader shall
 * keep the context/document envelope with its closed rftsx.* vocabulary (output-nodes.ts at 76bbbffd9d4a) as its only TSX input and
 * never loosen it to admit UI descriptors, HTML strings or mounted-control output (rf is no rendering intermediary); if Pi ever reads
 * the TSX UI descriptor profile (gated TSX-IF-03 registry, unshipped), an unknown descriptor ID or version fails as one typed
 * diagnostic, never silently a generic context block or text" (ReactiveFiberTSXSDK
 * docs/programs/native-interfaces-and-portable-tsx-2026-10-21/README.md:6@76bbbffd9d4a). Acceptance, quoted (Pi reads no UI
 * descriptor today): "(a) Pi's
 * validRf/fullShapeRf fixtures stay unchanged: a block kind outside rftsx.*, a UI-descriptor block or an HTML body is
 * refused/degraded as today; (b) src/workbench/providers/reactivefiber.ts accepts no UI-descriptor or host-output envelope (a mutant
 * adding one fails the census); roster (wb-973.11) and eight-key strictness (wb-2j3.9) unchanged; (c) armed on TSX-IF-03: an
 * unregistered descriptor ID or newer version yields one typed diagnostic, no generic block; unknown stays unknown (wb-973.10)."
 *
 * MEASURED PRODUCER FACTS (roster `producer`, read-only with git show and the installed package, 2026-10-23). At the program pin
 * ReactiveFiberTSXSDK 76bbbffd9d4a (package 0.1.668) and at 5da03a7d49f4 (package 0.1.649, the distribution source of the installed
 * rf 0.1.832's integrations/tsx/runtime-lock.json) the context output converter's closed intrinsic vocabulary is the same eight type
 * ids: src/outputs/output-nodes.ts:149-155 (group, block, context, diagnostic, layout, budget, model-budget) and
 * src/jsx/normalize-children.ts:33 (text); :343-352 converts the three leaves and throws RFTSX_OUTPUT_UNSUPPORTED_NODE for any other
 * intrinsic (:350 names the session-resolved suspense, error-boundary and context-value). At both shas no src file spells the
 * descriptor-profile family and the package exports name no /ui or /host entry: TSX-IF-03 (02-implementation.md:9-10) is absent.
 * The installed rf 0.1.832 maps a worker invalid_output failure (worker_entry.ts:536-541, RFTSX_OUTPUT_UNSUPPORTED_NODE) to its
 * host code RF_TSX_OUTPUT_INVALID (integrations/tsx.py WORKER_FAILURE_CODES; domain/diagnostics.py:3905, exit 7, metadata keys
 * component_id, component_instance_id, definition_path, path, reason, sdk_code, sdk_message).
 *
 * THE READERS. Pi's rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts); the reader adapter
 * (reactivefiber-observer.ts) projects its reading and native-evidence.ts reads the same envelope's identity fields (the registered
 * reading also returns to the capability's caller as tool output); together the three modules are THE CLOSURE (every src module
 * that names the rf envelope schema or command, found by a src walk). The provider admits only the strict eight-key
 * reactive-fiber.cli/v1 context.render envelope whose result.output.text is a string; the adapter references that text by sha256
 * digest and reads no block row's fields. So the readers take rf's document envelope as their only TSX input (no src module names
 * the descriptor profile, C1; Pi loads no TSX SDK module, wb-o4h0.4's census), and the statement's armed trigger (Pi reading the
 * descriptor profile) has not fired. The census pins:
 *  A, acceptance (a), over BOTH fixtures (validRf read off its declaration in test/workbench-provider-envelope-audit.test.ts by a
 *    literal evaluator, fullShapeRf from the shared helper). A1 each fixture keeps its eight envelope keys and its output key set,
 *    carries no UI word, phrase or HTML tag in any key or string, and both readers admit it (the provider returns it verbatim);
 *    A2 a block row carrying a kind outside the vocabulary is admitted verbatim and projects exactly as the same row without it
 *    (paired control), the planted kind and content surfacing nowhere, the in-vocabulary kind rftsx.block projecting the same
 *    (R-PRODUCER-VOCABULARY), and rf's own closed-vocabulary refusal (RF_TSX_OUTPUT_INVALID, sdk_code RFTSX_OUTPUT_UNSUPPORTED_NODE,
 *    exit 7) is refused by both readers; A3 a block row carrying a UI descriptor (constructed: no producer shape exists) projects
 *    as its control, the same descriptor
 *    serialized into the text is held by digest only (as A4's body), while a descriptor tree in place of the text is refused by both
 *    readers; A4 an HTML body as the text is held as context text referenced by its digest only
 *    (the projection equals the fixture's but for that reference, no tag surfaces), while an HTML field in place of the text is
 *    refused by both readers.
 *  B, acceptance (b). B1 every UI-descriptor envelope shape (a UI schema, ok or failed, a UI or descriptor command, a descriptor list
 *    without text) is refused by both readers in one spawn; B2 every host-output shape (a DOM commit batch, TUI cells, a mounted
 *    control beside a null text) is refused by both readers, while an additive host_output result key rides the reading verbatim
 *    and projects as its control (the R-ADDITIVE quiet row); B3 the closure's admission facts are frozen - its modules, each one's
 *    schema/command comparison constants, the fields read off output (text only; a property access, an element access or a
 *    destructuring of output), the envelope key literals, the registered capability ids - and no identifier or literal of it spells
 *    a UI word or phrase, and eight in-memory provider mutants, each adding one acceptance, are each flagged by the check that owns
 *    it, while two weakenings that add nothing stay quiet (R-UNFLAGGED) and a planted reader outside the closure stays quiet
 *    (R-OUTSIDE-CLOSURE); B4 the wb-973.11 result-key roster is unchanged (rf version, source, receipt and its four key lists,
 *    verbatim, so a gated rf-pin re-capture of that roster re-measures B4's witness in the same cut), names no UI key, and
 *    fullShapeRf holds to it; B5 eight-key strictness: a ninth key, a missing key or a renamed key is refused by both
 *    readers, for each fixture.
 *  C, acceptance (c). C1 the arming gate is closed and the trigger has not fired: the measured producer facts state TSX-IF-03 absent
 *    at both pins (the gate half reads the roster's cut-time measurement, its src hit counts and the exports list against the
 *    proposed entries, so only a re-measure can open it; the sibling repositories are never read at test time), no identifier or
 *    literal of any src module spells a descriptor-profile phrase (a src floor), and the one rf argv is the context render argv,
 *    naming no UI word; C2 an unregistered refusal code (none of the 12 RF_TSX_ codes the installed rf registers), a newer envelope
 *    version and an SDK-coded
 *    primary each arrive as exactly one typed refusal (one CapabilityError, one spawn) and one typed adapter outcome; C3 none of
 *    those refusals, nor rf's closed-vocabulary refusal, becomes a generic block or text: no reading, no output reference, the
 *    adapter's failure projection carries only the workspace reference and is unchanged when the diagnostic's message, hint and
 *    metadata (sdk_code, sdk_message, path, reason included) are replaced by sentinels; C4 unknown stays unknown: an observation row
 *    whose status word Pi does not know reads as not observed (partial, listed, or marked when unlistable), never refused, never
 *    complete, and the known-status control reads complete.
 * NOT CLAIMED (the armed half, gated): once Pi reads the descriptor profile (TSX-IF-03), an unregistered descriptor ID or a newer
 * descriptor version must fail as one typed diagnostic in that reader; no such reader is added or faked here. C1's src-wide phrase
 * scan is the tripwire: a src module that names the profile reds C1 until the armed rule ships with it.
 * RESIDUALS (named families, each with a pinned quiet row): R-PRODUCER-VOCABULARY the closed rftsx.* vocabulary is enforced by the
 * producer (the TSX output converter and rf's worker), not by Pi, whose readers are content-blind to block rows (quiet row: A2's
 * in-vocabulary control projects exactly as the outside kinds do); R-ADDITIVE the provider validates the result keys it reads and
 * admits additive ones, so a UI payload under an unread result key rides the registered reading opaque and never reaches the
 * projection (quiet row: B2's additive host_output case); R-UNFLAGGED B3 reads additions, so a weakening that adds no comparison
 * constant, output read, key literal, registration or UI word (a type check relaxed, a disjunct over a field already read) is
 * invisible to it, as is a read through an alias of the output object, and the behavioural rows carry what such a weakening would
 * admit (quiet rows: B3's two quiet mutants, 0 flags); R-OUTSIDE-CLOSURE a src module that reads rf output without naming the
 * envelope's schema or command, and spells no descriptor-profile phrase, is outside B3's closure and C1's phrase scan (quiet row:
 * B3's planted outside reader, not in the closure, 0 phrase hits); R-REAUTHORED a pin's case, claims and roster witness rewritten
 * together, in whole or in part (a fact dropped from all three, or the case cut to facts no other pin's claims accept), is held by no
 * anchor: the terms reach the bead export, the facts each term names are this file's reading of it (quiet row: the claims-bound
 * case's re-authored C3, its case cut to one refusal's reading under one matching claim, shows that claim with every fact under it,
 * and no other pin's claims accept it, while C3's own claims refuse it).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` and CLAIMS each pin's claim and check counts as literals; every
 * row (id, label, pins with their quotes), every pin's claims and witness (each witness carries its pin id), the scan constants, the
 * residual families, the registered test titles and THE RECORD are held to the out-of-file roster (test/fixtures/rf-tsx-closed-
 * vocabulary-roster.json). OUTSIDE ANCHOR: the owner filing's row in the tracked bead export (.beads/issues.jsonl, row wb-if7q.2): each
 * acceptance clause sits verbatim in exactly one row label, and the row's pin quotes, in order, tile that clause with separator-only
 * gaps, so a row or a pin removed from every literal of this file and the roster still reds; its quote and citation equal the
 * roster's, and its Gating line names the vocabulary sites and the gate.
 * CLAIMS (wb-wtfr; the wb-if7q.2 gate's LEG-2 survivor H7, C2's case under id C3 with the roster witness rewritten to match, stayed
 * 15/15 because no pin's witness content was bound to its claim by an outside anchor): each pin's quote is cut into terms that, in
 * order, tile it with the same separator-only gaps, so every term reaches the bead export through its quote; each term is a claim
 * naming the witness facts that show it (a path into the witness, "*" standing for every key of an object, and the exact value, the
 * pattern or the key list it requires). Each pin's live witness must show every one of its claims; every fact of it (each value that
 * is not an object with keys) must sit under a term, and every term must reach a fact of its own (an equals or matches check reaches
 * facts; a key list covers no value); and the claims-bound case holds each pin's claims against every other pin's live witness, none
 * of which they may accept. So a case swapped for another pin's, its roster witness rewritten to match, reds at its own claims and at
 * the claims-bound case; claims carried from one pin to another leave both quotes untiled; a claim removed from every literal leaves
 * its term a gap in the quote; a check removed from every literal leaves its fact outside every term, and one moved to another term
 * leaves its own term idle. B4's (wb-973.11) claim reads the wb-973.11 roster's own file.
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode, not
 * inverted, ran; every pin reached its witness and claims assertions (REACHED).
 * THE RECORD (wb-g8uk; the wb-wtfr gate's F1: the claims-bound case had no assertion-reached leg, so a guarded return after its first
 * assertion (L2-E1), its cross-pin acceptance assertion deleted (L2-E2) or its R-REAUTHORED quiet-row assertion deleted (L2-QR)
 * stayed green, the first two also beside the forged-claims swap H7F that only that acceptance assertion kills, and the judged set
 * carried the same partial hollowing (L2-JS-E1)): every case records its end in ENDS as `${id}:${count}` as its last statement - the
 * judged set, each pin after its claims assertions, the claims-bound case and the records case - where count is vitest's tally of
 * the expect calls the case made (expect.getState().assertionCalls), so a case that returns early leaves its end absent and a case
 * that loses an assertion statement leaves its count short. The judged set, registered first, holds the collected task tree to the
 * roster's tests (every title once, in roster order, set to run and not inverted, the records case last), so a records case deleted
 * (with its roster title or without), renamed, skipped or inverted at collection reds there. The records case holds ENDS to the
 * roster's reached list (the judged set, the pins in row order, the claims-bound case, each at its pinned count), then records its
 * own end; the file-end judge (afterAll) holds that end at the roster's recordsEnd whenever the records case was selected to run
 * (read from the collected tree before the first case runs), so a records case that returns early, loses an assertion statement or
 * skips itself at run time reds after it has run.
 * NOT CLAIMED (the record): an assertion statement removed together with its pinned count in the roster's record; an expect call
 * whose matcher is dropped or weakened (the tally counts calls to expect, not matchers); a case that keeps its assertions but returns
 * its witness as a literal (the wb-wtfr gate's L2-CONST); the file-end judge, or the selection it reads, removed (no claim rides them
 * alone: the records case still holds every other case's end); every case of the file skipped at once (no case runs to read the
 * tree).
 * CONTACT: the queued wb-hs2j.1 cut adds an inclusion leg to the adapter (it reads result.blocks' length and result.necessity's
 * include flags) and gives fullShapeRf one block row and one decision record. No witness here depends on either: block mutants
 * keep the fixture's block count against a paired control, A1 pins shapes rather than bytes and C4 selects its note by prefix.
 *
 * Display paths added: none. Test-only: the stand-in rf (a /bin/sh script) lives in makeScratch scratch; src and the fixtures are
 * only read; the provider mutants are in-memory texts that are parsed, never written or executed.
 */
import { createHash } from "node:crypto";
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { afterAll, afterEach, beforeEach, describe, expect, it, type RunnerTask } from "vitest";
import { CapabilityError, type JsonValue } from "../src/workbench/capability-registry.js";
import { nativeReactiveFiberRender, REACTIVEFIBER_RENDER_PREVIEW_CONTRACT } from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberProjectionTopology, type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { diffAgainstRoster, fullShapeRf, readRfResultRoster } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
/**
 * The workspace root both fixtures and every seam are told (wb-j5y6): a census identity, never the checkout's path. A1 word-scans
 * every key and string of each fixture, and a checkout's name is a host input like the clock: land-prep checks each try out at
 * mktemp -d /tmp/fw-landprep-<bead>-XXXX, landing 373's try 1 drew the suffix edUi, whose case boundary splits off the reader
 * word ui, and A1 found it at $.workspace.root of validRf and fullShapeRf, while try 2 (suffix vBqv, the same tree) read quiet.
 * It holds no "/", so no checkout's absolute path is a substring of it; the roster holds it (scan.readingRoot).
 */
const ROOT = "rf-tsx-closed-vocabulary-census-workspace";
/** The checkout this file runs in, both spellings (the launch directory and this file's repository): read only to show that no
 * fixture string spells either (A1). */
const CHECKOUTS: readonly string[] = [...new Set([process.cwd(), REPO])];
const ROSTER_FILE = "test/fixtures/rf-tsx-closed-vocabulary-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-if7q.2";
const PROVIDER = "src/workbench/providers/reactivefiber.ts";
/** Where Pi's minimal-shape fixture lives (wb-2j3.9 acceptance (c)): a module-local arrow of the envelope audit, read by evaluation. */
const MINIMAL_FIXTURE = { file: "test/workbench-provider-envelope-audit.test.ts", name: "validRf" } as const;
const ENVELOPE_KEYS = ["schema", "ok", "command", "operation_id", "workspace", "transaction_id", "result", "diagnostics"];
const CLI_SCHEMA = "reactive-fiber.cli/v1";
const RENDER_COMMAND = "context.render";
const PREVIEW_ID = "reactivefiber.render.preview";
/** The legacy input arm; every provider call below spawns exactly this selector's argv. */
const SELECTOR = { model: "model", task: "task" } as const;
/** The closed context intrinsic vocabulary of the TSX output converter at both pins (output-nodes.ts:149-155, normalize-children.ts:33). */
const CONTEXT_VOCABULARY = ["rftsx.group", "rftsx.block", "rftsx.context", "rftsx.diagnostic", "rftsx.layout", "rftsx.budget", "rftsx.model-budget", "rftsx.text"];
/** Block kinds outside it: three descriptors of the program's UI vocabulary (01-runtime-contracts.md:16), one squatting the rftsx namespace. */
const OUTSIDE_KINDS = ["button", "content-stream", "html", "rftsx.button"];
/** The in-vocabulary control kind (R-PRODUCER-VOCABULARY). */
const INSIDE_KIND = "rftsx.block";
/** Words of UI hosts the program names (README.md:6-20, 01-runtime-contracts.md:9-16, 02-implementation.md:13-27) that no rf reader
 * module may spell as an identifier or literal word. */
const READER_WORDS = ["ui", "tui", "html", "dom", "canvas", "webgpu", "mount", "mounted", "unmount", "paint", "painting", "button", "panel"];
/** The descriptor-profile phrases no src module may spell, over an identifier's or literal's lowercase words joined by single
 * spaces (src-wide and closure) */
const UI_PHRASES = [
  "ui descriptor",
  "descriptor (?:profile|registr)",
  "interface (?:host|evaluation)",
  "surface capabilit",
  "host output",
  "mounted control",
  "reactive (?:web|tui) interface",
  "reactive fiber dom",
];
/** An HTML tag opening or closing. */
const HTML_TAG = /<\/?[a-z][a-z0-9-]*(?:[\s/>]|$)/i;
/** The token every planted UI payload carries, so a surfacing anywhere in a projection is found by one needle. */
const MARKER = "zq7-planted";
const HTML_BODY = `<div class="panel"><button type="button">Approve ${MARKER}</button></div>`;
/** rf's host code for a TSX output outside the vocabulary and the SDK code it retains (worker_entry.ts:536-541). */
const HOST_CODE = "RF_TSX_OUTPUT_INVALID";
const SDK_CODE = "RFTSX_OUTPUT_UNSUPPORTED_NODE";
/** A refusal code rf registers nowhere: the stand-in for the diagnostic the gated TSX-IF-03 proposes for an unknown descriptor. */
const UNREGISTERED_CODE = "RF_TSX_DESCRIPTOR_UNREGISTERED";
const NEWER_SCHEMA = "reactive-fiber.cli/v2";
const UI_SCHEMA = "reactive-fiber.ui/v1";
const NINTH_KEYS = ["ui", "descriptors", "html", "host_output", "mount"];
/** The package entry boundaries TSX-IF-01 proposes (02-implementation.md:4); a measured exports list naming one opens C1's gate. */
const PROPOSED_ENTRY = /^\.\/(?:core|ui|host|node|resources)(?:\/|$)/;
/** Each floor sits below the count measured at base dae1788 (src 115 .ts modules), so an emptied walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const CLOSURE = ["src/workbench/native-evidence.ts", "src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
const RESIDUAL_FAMILIES = ["R-PRODUCER-VOCABULARY", "R-ADDITIVE", "R-UNFLAGGED", "R-OUTSIDE-CLOSURE", "R-REAUTHORED"];
/** A planted reader of rf output that names neither the envelope's schema nor its command (the R-OUTSIDE-CLOSURE quiet row). */
const OUTSIDE_READER = "export function readOutput(raw: string): unknown {\n  const value = JSON.parse(raw);\n  return value.result.output.html;\n}\n";
const OPERATION_ID = `rfo_${"a".repeat(22)}`;
const WORKSPACE_ID = `rfw_${"a".repeat(22)}`;

interface Pin {
  readonly id: string;
  readonly quote: string;
}
interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly Pin[];
}

/** The judged rows; their shape is pinned below and held to the roster. Each pin quotes the slice of its clause it proves. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) Pi's validRf/fullShapeRf fixtures stay unchanged: a block kind outside rftsx.*, a UI-descriptor block or an HTML body is refused/degraded as today: each fixture keeps its envelope and output shape and carries no UI content, a planted kind or descriptor in a block row never changes either reader's outcome (R-PRODUCER-VOCABULARY), an HTML body is held as context text by digest only, and the same content in place of the text, or rf's own closed-vocabulary refusal, is refused by both readers",
    pins: [
      { id: "A1", quote: "Pi's validRf/fullShapeRf fixtures stay unchanged" },
      { id: "A2", quote: "a block kind outside rftsx.*" },
      { id: "A3", quote: "a UI-descriptor block" },
      { id: "A4", quote: "an HTML body is refused/degraded as today" },
    ],
  },
  {
    id: "B",
    label:
      "(b) src/workbench/providers/reactivefiber.ts accepts no UI-descriptor or host-output envelope (a mutant adding one fails the census); roster (wb-973.11) and eight-key strictness (wb-2j3.9) unchanged: every UI-descriptor and host-output shape is refused by both readers (an additive result key rides opaque: R-ADDITIVE), the reader closure's admission facts are frozen and spell no UI word, each provider mutant adding an acceptance is flagged (weakenings that add nothing: R-UNFLAGGED), and the result-key roster and the eight-key refusals hold",
    pins: [
      { id: "B1", quote: "src/workbench/providers/reactivefiber.ts accepts no UI-descriptor" },
      { id: "B2", quote: "host-output envelope" },
      { id: "B3", quote: "(a mutant adding one fails the census)" },
      { id: "B4", quote: "roster (wb-973.11)" },
      { id: "B5", quote: "eight-key strictness (wb-2j3.9) unchanged" },
    ],
  },
  {
    id: "C",
    label:
      "(c) armed on TSX-IF-03: an unregistered descriptor ID or newer version yields one typed diagnostic, no generic block; unknown stays unknown (wb-973.10): the gate is closed and no src module names the descriptor profile, an unregistered refusal code, a newer envelope version and an SDK-coded primary each arrive as exactly one typed refusal carrying no value, and an unknown observation status stays not observed",
    pins: [
      { id: "C1", quote: "armed on TSX-IF-03" },
      { id: "C2", quote: "an unregistered descriptor ID or newer version yields one typed diagnostic" },
      { id: "C3", quote: "no generic block" },
      { id: "C4", quote: "unknown stays unknown (wb-973.10)" },
    ],
  },
];

// ------------------------------------------------------------------------------------------------------------------- the roster

/** A witness fact a claim names: every value its path reaches ("*" stands for every key of an object, at least one) equals the value,
 * matches the pattern (a regular expression source), or holds exactly these keys in this order. */
type ClaimCheck =
  | { readonly path: string; readonly equals: JsonValue }
  | { readonly path: string; readonly matches: string }
  | { readonly path: string; readonly keys: readonly string[] };
/** One term of a pin's quote and the witness facts that show it. */
interface Claim {
  readonly term: string;
  readonly checks: readonly ClaimCheck[];
}
interface RosterPin {
  readonly id: string;
  readonly quote: string;
  readonly claims: readonly Claim[];
  readonly witness: JsonValue;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface ProducerRf {
  readonly version: string;
  readonly hostCode: string;
  readonly sdkCode: string;
  readonly sdkMessage: string;
  readonly exit: number;
  readonly metadataKeys: readonly string[];
  readonly tsxCodes: readonly string[];
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly producer: {
    readonly programPin: { readonly sha: string; readonly packageVersion: string };
    readonly runtimePin: { readonly sha: string; readonly packageVersion: string };
    readonly contextVocabulary: readonly string[];
    readonly vocabularySites: readonly string[];
    readonly descriptorProfile: JsonObject;
    readonly rf: ProducerRf;
  };
  readonly scan: JsonValue;
  readonly residuals: readonly { readonly id: string; readonly quietRow: string }[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
  /** THE RECORD: every case's end before the records case's, as `${id}:${count}`, and the records case's own. */
  readonly reached: readonly string[];
  readonly recordsEnd: string;
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function stringList(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value.map(String);
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`roster ${field} must be a non-empty string`);
  return value;
}
/** A deep copy through JSON: nothing in it is shared with the value it was made from. */
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function objectOf(value: JsonValue | undefined, field: string): JsonObject {
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${field} must be an object`);
  return value;
}

const CHECK_TESTS = ["equals", "matches", "keys"];
/** Parses one pin's claims, refusing a claim without checks and a check that states other than one test beside its path. */
function claimsFrom(value: unknown, field: string): Claim[] {
  if (!Array.isArray(value)) throw new Error(`roster ${field} must be a claims list`);
  return value.map((claim: unknown, index: number): Claim => {
    if (!isObject(claim) || !Array.isArray(claim.checks) || claim.checks.length === 0) throw new Error(`roster ${field}[${index}] needs a non-empty checks list`);
    const checks = claim.checks.map((check: unknown, at: number): ClaimCheck => {
      const where = `${field}[${index}].checks[${at}]`;
      if (!isObject(check)) throw new Error(`roster ${where} must be an object`);
      const named = Object.keys(check).filter(key => CHECK_TESTS.includes(key));
      if (named.length !== 1 || Object.keys(check).length !== 2) throw new Error(`roster ${where} must state its path and exactly one of ${CHECK_TESTS.join(", ")}`);
      const path = text(check.path, `${where}.path`);
      if (named[0] === "equals") return { path, equals: json(check.equals) };
      if (named[0] === "matches") return { path, matches: text(check.matches, `${where}.matches`) };
      return { path, keys: stringList(check.keys, `${where}.keys`) };
    });
    return { term: text(claim.term, `${field}[${index}].term`), checks };
  });
}

/** Parses the roster from disk, refusing any field of the wrong shape by name; each call is a fresh read. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.producer) || !Array.isArray(raw.residuals)) throw new Error("roster must be an object with producer, residuals and rows");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs a pins list`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs a witness`);
      return {
        id: text(pin.id, `rows[${index}].pins[${at}].id`),
        quote: text(pin.quote, `rows[${index}].pins[${at}].quote`),
        claims: claimsFrom(pin.claims, `rows[${index}].pins[${at}].claims`),
        witness: json(pin.witness),
      };
    });
    return { id: text(row.id, `rows[${index}].id`), label: text(row.label, `rows[${index}].label`), pins };
  });
  const producer = raw.producer;
  const programPin = producer.programPin;
  const runtimePin = producer.runtimePin;
  const rf = producer.rf;
  if (!isObject(programPin) || !isObject(runtimePin) || !isObject(rf) || !isObject(producer.descriptorProfile)) throw new Error("roster producer needs programPin, runtimePin, descriptorProfile and rf");
  if (typeof rf.exit !== "number") throw new Error("roster producer.rf.exit must be a number");
  const residuals = raw.residuals.map((entry: unknown, index: number) => {
    if (!isObject(entry)) throw new Error(`roster residuals[${index}] must be an object`);
    return { id: text(entry.id, `residuals[${index}].id`), quietRow: text(entry.quietRow, `residuals[${index}].quietRow`) };
  });
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    producer: {
      programPin: { sha: text(programPin.sha, "programPin.sha"), packageVersion: text(programPin.packageVersion, "programPin.packageVersion") },
      runtimePin: { sha: text(runtimePin.sha, "runtimePin.sha"), packageVersion: text(runtimePin.packageVersion, "runtimePin.packageVersion") },
      contextVocabulary: stringList(producer.contextVocabulary, "producer.contextVocabulary"),
      vocabularySites: stringList(producer.vocabularySites, "producer.vocabularySites"),
      descriptorProfile: objectOf(json(producer.descriptorProfile), "producer.descriptorProfile"),
      rf: {
        version: text(rf.version, "rf.version"),
        hostCode: text(rf.hostCode, "rf.hostCode"),
        sdkCode: text(rf.sdkCode, "rf.sdkCode"),
        sdkMessage: text(rf.sdkMessage, "rf.sdkMessage"),
        exit: rf.exit,
        metadataKeys: stringList(rf.metadataKeys, "rf.metadataKeys"),
        tsxCodes: stringList(rf.tsxCodes, "rf.tsxCodes"),
      },
    },
    scan: json(raw.scan),
    residuals,
    rows,
    tests: stringList(raw.tests, "tests"),
    reached: stringList(raw.reached, "reached"),
    recordsEnd: text(raw.recordsEnd, "recordsEnd"),
  };
}

const ROSTER = readRoster();

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The scan constants as one value, held to the roster's `scan`. */
function scanConstants(): JsonValue {
  return json({
    envelopeKeys: ENVELOPE_KEYS,
    cliSchema: CLI_SCHEMA,
    renderCommand: RENDER_COMMAND,
    previewId: PREVIEW_ID,
    selector: SELECTOR,
    contextVocabulary: CONTEXT_VOCABULARY,
    outsideKinds: OUTSIDE_KINDS,
    insideKind: INSIDE_KIND,
    readerWords: READER_WORDS,
    uiPhrases: UI_PHRASES,
    htmlTag: `${HTML_TAG.source}/${HTML_TAG.flags}`,
    marker: MARKER,
    htmlBody: HTML_BODY,
    hostCode: HOST_CODE,
    sdkCode: SDK_CODE,
    unregisteredCode: UNREGISTERED_CODE,
    newerSchema: NEWER_SCHEMA,
    uiSchema: UI_SCHEMA,
    ninthKeys: NINTH_KEYS,
    proposedEntry: `${PROPOSED_ENTRY.source}/${PROPOSED_ENTRY.flags}`,
    srcFloor: SRC_FLOOR,
    closure: CLOSURE,
    outsideReader: OUTSIDE_READER,
    minimalFixture: MINIMAL_FIXTURE,
    readingRoot: ROOT,
  });
}

// ------------------------------------------------------------------------------------------------------- the outside anchor

interface BeadRow {
  readonly title: string;
  readonly notes: string;
}
/** The owner filing's row in the tracked bead export, found by id on a line that parses. */
function readBeadRow(): BeadRow {
  for (const line of readFileSync(join(REPO, BEAD_EXPORT), "utf8").split("\n")) {
    if (!line.includes(BEAD)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === BEAD && typeof row.title === "string" && typeof row.notes === "string") return { title: row.title, notes: row.notes };
  }
  throw new Error(`${BEAD_EXPORT} carries no row ${BEAD}`);
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
/** A gap between two quotes that names nothing: separators and at most one joining or/and. */
const SEPARATOR = /^[\s,;:]*(?:(?:or|and)[\s,;:]+)?$/;
/** Whether the quotes, in order, tile the clause body: each found after the previous one, every gap a separator. */
function tiles(body: string, quotes: readonly string[]): { covered: boolean; gaps: string[] } {
  let at = 0;
  const gaps: string[] = [];
  for (const quote of quotes) {
    const found = body.indexOf(quote, at);
    if (found < 0) return { covered: false, gaps: [...gaps, `<missing ${quote}>`] };
    gaps.push(body.slice(at, found));
    at = found + quote.length;
  }
  gaps.push(body.slice(at));
  return { covered: gaps.every(gap => SEPARATOR.test(gap)), gaps };
}

// ----------------------------------------------------------------------------------------------------------------- the fixtures

/** Evaluates the literal tree of one module-local declaration: object, array, string, template, number, boolean and null literals,
 * module-local const references, `'x'.repeat(n)` and `process.cwd()` (read as ROOT, the census's reading root, never the checkout's
 * path). Anything else throws, naming the node. */
function evaluateDeclaration(file: string, name: string): JsonValue {
  const source = ts.createSourceFile(file, readFileSync(join(REPO, file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declarations = new Map<string, ts.Expression>();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer !== undefined) declarations.set(declaration.name.text, declaration.initializer);
    }
  }
  const evaluate = (node: ts.Node, depth: number): JsonValue => {
    if (depth > 32) throw new Error(`${file}: ${name} nests too deep`);
    if (ts.isParenthesizedExpression(node)) return evaluate(node.expression, depth + 1);
    if (ts.isArrowFunction(node) && node.parameters.length === 0 && !ts.isBlock(node.body)) return evaluate(node.body, depth + 1);
    if (ts.isObjectLiteralExpression(node)) {
      const out: JsonObject = {};
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property) || !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))) throw new Error(`${file}: ${name} holds an unsupported property`);
        out[property.name.text] = evaluate(property.initializer, depth + 1);
      }
      return out;
    }
    if (ts.isArrayLiteralExpression(node)) return node.elements.map(element => evaluate(element, depth + 1));
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isTemplateExpression(node)) return node.templateSpans.reduce((acc, span) => `${acc}${String(evaluate(span.expression, depth + 1))}${span.literal.text}`, node.head.text);
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) return -Number(evaluate(node.operand, depth + 1));
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isIdentifier(node)) {
      const bound = declarations.get(node.text);
      if (bound === undefined) throw new Error(`${file}: ${name} names an unbound identifier ${node.text}`);
      return evaluate(bound, depth + 1);
    }
    if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) && node.arguments.length <= 1) {
      const callee = node.expression;
      if (ts.isIdentifier(callee.expression) && callee.expression.text === "process" && callee.name.text === "cwd" && node.arguments.length === 0) return ROOT;
      const argument = node.arguments[0];
      if (callee.name.text === "repeat" && argument !== undefined) return String(evaluate(callee.expression, depth + 1)).repeat(Number(evaluate(argument, depth + 1)));
    }
    throw new Error(`${file}: ${name} holds an unsupported ${ts.SyntaxKind[node.kind]}`);
  };
  const initializer = declarations.get(name);
  if (initializer === undefined) throw new Error(`${file} declares no ${name}`);
  return evaluate(initializer, 0);
}

interface Fixture {
  readonly name: string;
  readonly envelope: JsonObject;
}
/** Pi's two fixtures, each a fresh value: the minimal shape off its declaration, the full shape from the shared helper. */
function fixtures(): Fixture[] {
  return [
    { name: MINIMAL_FIXTURE.name, envelope: objectOf(evaluateDeclaration(MINIMAL_FIXTURE.file, MINIMAL_FIXTURE.name), MINIMAL_FIXTURE.name) },
    { name: "fullShapeRf", envelope: objectOf(json(fullShapeRf(ROOT)), "fullShapeRf") },
  ];
}
function fullShape(): JsonObject {
  return objectOf(json(fullShapeRf(ROOT)), "fullShapeRf");
}

const sha256 = (value: string): string => createHash("sha256").update(value).digest("hex");
function resultOf(envelope: JsonObject): JsonObject {
  return objectOf(envelope.result, "envelope result");
}
function withResult(envelope: JsonObject, result: JsonObject): JsonObject {
  return { ...envelope, result };
}
/** A neutral rf block row (context.render.schema.json blocks items: final_index, candidate_key, component_id, the priced token_cost). */
const NEUTRAL_BLOCK: JsonObject = {
  final_index: 0,
  candidate_key: "census.component:main::body",
  component_id: "census.component",
  token_cost: { kind: "estimated", tokens: 3 },
  token_cost_kind: "estimated",
};
/** The fixture's block rows, or one neutral row when it states none; a mutant and its control always hold the same count. */
function blockRows(envelope: JsonObject): JsonObject[] {
  const blocks = resultOf(envelope).blocks;
  return Array.isArray(blocks) && blocks.length > 0 ? blocks.map((block, index) => objectOf(block, `blocks[${index}]`)) : [{ ...NEUTRAL_BLOCK }];
}
function withBlocks(envelope: JsonObject, edit: (block: JsonObject) => JsonObject): JsonObject {
  return withResult(envelope, { ...resultOf(envelope), blocks: blockRows(envelope).map(edit) });
}
function withOutput(envelope: JsonObject, output: JsonObject): JsonObject {
  return withResult(envelope, { ...resultOf(envelope), output });
}
/** The fixture with another output text, its size and digest restated when the fixture states them. */
function withText(envelope: JsonObject, body: string): JsonObject {
  const output = objectOf(resultOf(envelope).output, "result.output");
  const next: JsonObject = { ...output, text: body };
  if (Object.hasOwn(output, "size_bytes")) next.size_bytes = Buffer.byteLength(body);
  if (Object.hasOwn(output, "digest")) next.digest = `sha256:${sha256(body)}`;
  return withOutput(envelope, next);
}
/** A UI descriptor as TSX-IF-03 proposes one (stable, versioned id; 01-runtime-contracts.md:16): constructed, no producer shape exists. */
function descriptor(version: string): JsonObject {
  return { id: "button", version, props: { label: `Approve ${MARKER}`, action: "census.approve" } };
}
const REFUSAL_VALUES: Readonly<Record<string, JsonValue>> = {
  component_id: "census.panel",
  component_instance_id: "census.panel:main",
  definition_path: "components/census_panel",
  path: "$.children[0]",
  reason: "unsupported_node",
};
/** rf's closed-vocabulary refusal, shaped from the measured registry row (code, exit, metadata keys; the SDK code and message
 * retained). Constructed: the installed rf cannot render a TSX component here (no Deno engine is provisioned). */
function closedVocabularyRefusal(code: string = ROSTER.producer.rf.hostCode): JsonObject {
  const rf = ROSTER.producer.rf;
  const metadata: JsonObject = {};
  for (const key of rf.metadataKeys) metadata[key] = key === "sdk_code" ? rf.sdkCode : key === "sdk_message" ? rf.sdkMessage : (REFUSAL_VALUES[key] ?? null);
  return {
    schema: CLI_SCHEMA,
    ok: false,
    command: RENDER_COMMAND,
    operation_id: OPERATION_ID,
    workspace: { id: WORKSPACE_ID, root: ROOT },
    transaction_id: null,
    result: null,
    diagnostics: [{ code, severity: "error", message: `${MARKER} TSX output conversion failed at $.children[0]`, hint: `${MARKER} render only the closed context vocabulary`, source: "component", metadata }],
  };
}
/** The same refusal with its message, hint and every metadata value replaced by sentinels. */
function sentinelRefusal(envelope: JsonObject): JsonObject {
  const diagnostics = Array.isArray(envelope.diagnostics) ? envelope.diagnostics : [];
  return {
    ...envelope,
    diagnostics: diagnostics.map((item, index) => {
      const diagnostic = objectOf(item, `diagnostics[${index}]`);
      const metadata = objectOf(diagnostic.metadata, "metadata");
      return { ...diagnostic, message: "SENTINEL-MESSAGE", hint: "SENTINEL-HINT", metadata: Object.fromEntries(Object.keys(metadata).map(key => [key, `SENTINEL-${key}`])) };
    }),
  };
}
/** The values a refusal withholds: its message, hint and every string metadata value. */
function withheldValues(envelope: JsonObject): string[] {
  const diagnostic = objectOf(Array.isArray(envelope.diagnostics) ? envelope.diagnostics[0] : undefined, "diagnostics[0]");
  const metadata = objectOf(diagnostic.metadata, "metadata");
  return [String(diagnostic.message), String(diagnostic.hint), ...Object.values(metadata).filter((value): value is string => typeof value === "string")];
}

// ------------------------------------------------------------------------------------------------------- the readers, hermetic

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface StandIn {
  readonly folder: string;
  readonly log: string;
}
/** A stand-in `rf` first on PATH: each spawn appends its argv (tab-separated) as one log line, prints reply.json and exits with the
 * code in the exit file, both rewritten before every provider call. */
function installStandIn(): StandIn {
  const folder = makeScratch("rf-tsx-closed-vocabulary-");
  scratches.push(folder);
  const log = join(folder, "spawns.log");
  const script = join(folder, "rf");
  writeFileSync(log, "");
  writeFileSync(script, `#!/bin/sh\nprintf '%s\\t' "$@" >> '${log}'\nprintf '\\n' >> '${log}'\ncat '${join(folder, "reply.json")}'\nexit "$(cat '${join(folder, "exit")}')"\n`);
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return { folder, log };
}
function spawnLines(rf: StandIn): string[][] {
  return readFileSync(rf.log, "utf8")
    .split("\n")
    .filter(line => line.length > 0)
    .map(line => line.replace(/\t$/, "").split("\t"));
}
interface Refusal {
  readonly category: string;
  readonly message: string;
}
interface Provided {
  readonly reading: JsonValue | null;
  readonly refusals: readonly Refusal[];
  readonly spawns: number;
}
/** One provider call against the stand-in answering `envelope` with `exit`: the reading or the typed refusals, and the spawns. */
async function provide(rf: StandIn, envelope: JsonValue, exit: number): Promise<Provided> {
  writeFileSync(join(rf.folder, "reply.json"), JSON.stringify(envelope));
  writeFileSync(join(rf.folder, "exit"), String(exit));
  const before = spawnLines(rf).length;
  const refusals: Refusal[] = [];
  let reading: JsonValue | null = null;
  try {
    reading = await nativeReactiveFiberRender(SELECTOR, ROOT);
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    refusals.push({ category: error.category, message: error.message });
  }
  return { reading, refusals, spawns: spawnLines(rf).length - before };
}
const exitFor = (envelope: JsonObject): number => (envelope.ok === false ? ROSTER.producer.rf.exit : 0);

const CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" },
  seam: "rf-cli",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
function readingOf(source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source };
}
interface Observed {
  readonly topology: ReactiveFiberProjectionTopology | null;
  readonly refusal: Refusal | null;
}
function observe(reading: JsonValue): Observed {
  try {
    return { topology: reactivefiberTopology(reading, CONTEXT), refusal: null };
  } catch (error) {
    if (!(error instanceof CapabilityError)) throw error;
    return { topology: null, refusal: { category: error.category, message: error.message } };
  }
}
/** Every string a projection holds, at any depth. */
function stringsOf(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsOf);
  if (isObject(value)) return Object.values(value).flatMap(stringsOf);
  return [];
}
const refusalText = (refusal: Refusal | null | undefined): string => (refusal ? `${refusal.category}: ${refusal.message}` : "none");
/** Whether a provider reading is the provider's contract over exactly `envelope`, byte for byte. */
function verbatim(reading: JsonValue | null, envelope: JsonObject): boolean {
  return reading !== null && isDeepStrictEqual(reading, { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: envelope });
}
/** The projection with its output reference blanked, so two renders differing only in their text compare equal elsewhere. */
function withoutPayload(topology: ReactiveFiberProjectionTopology | null): JsonValue {
  const copy = json(topology);
  if (isObject(copy) && Array.isArray(copy.snapshots)) for (const snapshot of copy.snapshots) if (isObject(snapshot)) delete snapshot.nativePayloadRef;
  return copy;
}

/** A degraded case: the mutant through the provider and the adapter, against its control through the adapter. One summary line:
 * provider outcome / verbatim / projection versus control / how many needles surfaced. */
async function degraded(rf: StandIn, mutant: JsonObject, control: JsonObject, needles: readonly string[], payloadOnly = false): Promise<string> {
  const provided = await provide(rf, mutant, 0);
  if (provided.reading === null) return `refused ${refusalText(provided.refusals[0])} spawns ${provided.spawns}`;
  const observed = observe(provided.reading);
  const baseline = observe(readingOf(control));
  if (observed.topology === null || baseline.topology === null) return `admitted/adapter ${refusalText(observed.refusal ?? baseline.refusal)}`;
  const same = payloadOnly ? isDeepStrictEqual(withoutPayload(observed.topology), withoutPayload(baseline.topology)) : isDeepStrictEqual(observed.topology, baseline.topology);
  const strings = stringsOf(observed.topology);
  const surfaced = needles.filter(needle => strings.some(value => value.toLowerCase().includes(needle.toLowerCase())));
  return `admitted/${verbatim(provided.reading, mutant) ? "verbatim" : "rewritten"}/${same ? (payloadOnly ? "same-but-payload" : "same") : "differs"}/surfaced ${surfaced.length}/spawns ${provided.spawns}`;
}
/** A refused case: the provider's outcome (one line) and the adapter's outcome over the same envelope as a reading. */
async function refused(rf: StandIn, envelope: JsonObject): Promise<{ provider: string; adapter: string }> {
  const provided = await provide(rf, envelope, exitFor(envelope));
  const observed = observe(readingOf(envelope));
  const provider = provided.reading === null ? `${provided.refusals.map(refusalText).join(" + ")} (errors ${provided.refusals.length}, spawns ${provided.spawns})` : `admitted (spawns ${provided.spawns})`;
  const snapshot = observed.topology?.snapshots[0];
  const adapter = observed.topology === null ? refusalText(observed.refusal) : `projected ${snapshot?.coverage ?? "none"}/${snapshot?.node.statusTone ?? "none"}: ${snapshot?.node.statusText ?? ""}`;
  return { provider, adapter };
}

// ------------------------------------------------------------------------------------------------------ words, phrases, tokens

/** The lowercase words of one identifier or literal: camelCase and acronym boundaries split, then every non-alphanumeric run. */
function wordsOf(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
const PHRASES = UI_PHRASES.map(phrase => new RegExp(`(?:^| )${phrase}`));
function uiPhraseHits(value: string): string[] {
  const joined = wordsOf(value).join(" ");
  return UI_PHRASES.filter((_, index) => PHRASES[index]?.test(joined) === true);
}
function readerWordHits(value: string): string[] {
  return wordsOf(value).filter(word => READER_WORDS.includes(word));
}
/** Every key and string of a JSON value spelling a reader word, a UI phrase or an HTML tag, by path. */
function uiFindings(value: JsonValue, path = "$"): string[] {
  if (typeof value === "string") return readerWordHits(value).length + uiPhraseHits(value).length > 0 || HTML_TAG.test(value) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => uiFindings(item, `${path}[${index}]`));
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => [...(readerWordHits(key).length + uiPhraseHits(key).length > 0 ? [`${path}.${key}`] : []), ...uiFindings(item, `${path}.${key}`)]);
}

/** Every key and string of a JSON value spelling the checkout's path, by path (wb-j5y6: what no word scan may read). */
function checkoutPathsOf(value: JsonValue, path = "$"): string[] {
  const spells = (text: string): boolean => CHECKOUTS.some(checkout => text.includes(checkout));
  if (typeof value === "string") return spells(value) ? [path] : [];
  if (Array.isArray(value)) return value.flatMap((item, index) => checkoutPathsOf(item, `${path}[${index}]`));
  if (value === null || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([key, item]) => [...(spells(key) ? [`${path}.${key}`] : []), ...checkoutPathsOf(item, `${path}.${key}`)]);
}

/** One module's identifiers and literal texts (string, template parts, regular expressions): what a reader can match or read. */
function tokensOf(fileName: string, source: ts.SourceFile): string[] {
  const out: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) out.push(node.text);
    else if (ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node) || ts.isRegularExpressionLiteral(node)) out.push(node.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (out.length === 0) throw new Error(`${fileName} holds no token`);
  return out;
}
const parse = (fileName: string, body: string): ts.SourceFile => ts.createSourceFile(fileName, body, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const textOf = (file: string): string => readFileSync(join(REPO, file), "utf8");

/** Every .ts module below src, repo-relative, in name order; symlinks are not followed. */
function srcModules(): string[] {
  const out: string[] = [];
  const walk = (dir: string): void => {
    const entries: Dirent[] = readdirSync(dir, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".ts")) out.push(relative(REPO, full).split("\\").join("/"));
    }
  };
  walk(join(REPO, "src"));
  return out;
}

// ------------------------------------------------------------------------------------------------------------- the closure facts

const EQUALITY = new Set([ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken]);
const ADMISSION_FIELDS = ["schema", "command"];

/** The string a module-local or imported const resolves to (a literal, an alias of one, an import of one), else undefined. */
function constValue(file: string, source: ts.SourceFile, name: string, depth = 0): string | undefined {
  if (depth > 6) return undefined;
  for (const statement of source.statements) {
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== name || declaration.initializer === undefined) continue;
        const initializer = declaration.initializer;
        if (ts.isStringLiteralLike(initializer)) return initializer.text;
        if (ts.isIdentifier(initializer)) return constValue(file, source, initializer.text, depth + 1);
        return undefined;
      }
    }
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text.startsWith(".")) {
      const bindings = statement.importClause?.namedBindings;
      if (bindings === undefined || !ts.isNamedImports(bindings)) continue;
      for (const element of bindings.elements) {
        if (element.name.text !== name) continue;
        const target = join(dirname(file), statement.moduleSpecifier.text).replace(/\.js$/, ".ts");
        return constValue(target, parse(target, textOf(target)), (element.propertyName ?? element.name).text, depth + 1);
      }
    }
  }
  return undefined;
}
function admissionField(node: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(node) && ADMISSION_FIELDS.includes(node.name.text)) return node.name.text;
  if (ts.isElementAccessExpression(node) && ts.isStringLiteralLike(node.argumentExpression) && ADMISSION_FIELDS.includes(node.argumentExpression.text)) return node.argumentExpression.text;
  return undefined;
}
const isOutput = (node: ts.Expression): boolean => (ts.isIdentifier(node) && node.text === "output") || (ts.isPropertyAccessExpression(node) && node.name.text === "output");

interface ClosureFacts {
  readonly comparisons: string[];
  readonly outputReads: string[];
  readonly keyLiterals: string[][];
  readonly registrations: string[];
  readonly uiWords: string[];
}
/** What one module admits and reads: its schema/command comparison constants, the fields it reads off an output, the key lists
 * naming the envelope, the capability ids it registers, and every identifier or literal spelling a reader word or a UI phrase. */
function closureFacts(file: string, body: string): ClosureFacts {
  const source = parse(file, body);
  const comparisons = new Set<string>();
  const outputReads = new Set<string>();
  const keyLiterals: string[][] = [];
  const registrations: string[] = [];
  const constantOf = (node: ts.Expression): string => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isIdentifier(node)) return constValue(file, source, node.text) ?? `<unresolved ${node.text}>`;
    return "<unresolved>";
  };
  const visit = (node: ts.Node): void => {
    if (ts.isBinaryExpression(node) && EQUALITY.has(node.operatorToken.kind)) {
      const left = admissionField(node.left);
      const right = admissionField(node.right);
      if (left !== undefined) comparisons.add(`${left}=${constantOf(node.right)}`);
      else if (right !== undefined) comparisons.add(`${right}=${constantOf(node.left)}`);
    }
    if (ts.isPropertyAccessExpression(node) && isOutput(node.expression)) outputReads.add(node.name.text);
    if (ts.isElementAccessExpression(node) && isOutput(node.expression)) outputReads.add(ts.isStringLiteralLike(node.argumentExpression) ? node.argumentExpression.text : "<computed>");
    if (ts.isVariableDeclaration(node) && ts.isObjectBindingPattern(node.name) && node.initializer !== undefined && isOutput(node.initializer)) {
      for (const element of node.name.elements) {
        const key = element.propertyName ?? element.name;
        outputReads.add(ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : "<computed>");
      }
    }
    if (ts.isArrayLiteralExpression(node) && node.elements.length > 0 && node.elements.every(element => ts.isStringLiteralLike(element))) {
      const items = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : ""));
      if (items.includes("schema") && items.includes("transaction_id")) keyLiterals.push(items);
    }
    if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === "descriptor" && ts.isObjectLiteralExpression(node.initializer)) {
      for (const property of node.initializer.properties) {
        if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === "id") registrations.push(constantOf(property.initializer));
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  const uiWords = tokensOf(file, source).flatMap(token => [...readerWordHits(token), ...uiPhraseHits(token)].map(hit => `${hit} <- ${token.slice(0, 60)}`));
  return { comparisons: [...comparisons].sort(), outputReads: [...outputReads].sort(), keyLiterals, registrations, uiWords };
}
/** The src modules that name the rf envelope: its schema constant (identifier or literal) or its command literal. */
function closureModules(): string[] {
  return srcModules().filter(file => {
    const tokens = tokensOf(file, parse(file, textOf(file)));
    return tokens.some(token => token === "REACTIVE_FIBER_CLI_SCHEMA" || token === CLI_SCHEMA || token === RENDER_COMMAND);
  });
}
/** The checks a mutated module text trips against the real module's facts, by check name. */
function flagsOf(file: string, mutated: string, real: ClosureFacts): string[] {
  const facts = closureFacts(file, mutated);
  const flags: string[] = [];
  if (!isDeepStrictEqual(facts.comparisons, real.comparisons)) flags.push("comparisons");
  if (!isDeepStrictEqual(facts.outputReads, real.outputReads)) flags.push("output-reads");
  if (!isDeepStrictEqual(facts.keyLiterals, real.keyLiterals)) flags.push("key-literals");
  if (!isDeepStrictEqual(facts.registrations, real.registrations)) flags.push("registrations");
  if (facts.uiWords.length > 0) flags.push("ui-words");
  return flags;
}
/** Applies one textual mutant: `find` must occur exactly once in `body`, so a provider edit that moves an anchor reds loudly. */
function mutate(body: string, find: string, replace: string): string {
  const first = body.indexOf(find);
  if (first < 0 || body.indexOf(find, first + 1) >= 0) throw new Error(`mutant anchor must occur exactly once: ${find}`);
  return `${body.slice(0, first)}${replace}${body.slice(first + find.length)}`;
}
/** The provider mutants: each adds one acceptance and names the check expected to own it; the two quiet ones add nothing B3 reads. */
const MUTANTS: readonly { readonly id: string; readonly find: string; readonly replace: string }[] = [
  { id: "M1-ui-schema", find: "source.schema===REACTIVE_FIBER_CLI_SCHEMA", replace: `(source.schema===REACTIVE_FIBER_CLI_SCHEMA||source.schema==="${UI_SCHEMA}")` },
  { id: "M2-interface-command", find: 'source.command==="context.render"', replace: '(source.command==="context.render"||source.command==="interface.render")' },
  { id: "M3-output-nodes", find: 'typeof result.output.text!=="string"', replace: '(typeof result.output.text!=="string"&&!Array.isArray(result.output.nodes))' },
  { id: "M4-output-html", find: 'typeof result.output.text!=="string"', replace: 'typeof (result.output.text??result.output.html)!=="string"' },
  { id: "M5-ninth-key", find: '"result","diagnostics"];', replace: '"result","diagnostics","surface"];' },
  { id: "M6-registration", find: 'id:"reactivefiber.render.preview",version:"1.0.0",description:"RF noncommitted', replace: 'id:"reactivefiber.render.surface",version:"1.0.0",description:"RF noncommitted' },
  {
    id: "M7-profile-reader",
    find: "export function registerNativeReactiveFiberRender(",
    replace: "export function readUiDescriptorProfile(value:unknown):unknown{return value;}\nexport function registerNativeReactiveFiberRender(",
  },
  { id: "M8-output-destructure", find: "const work=record(result) ? result.work : null;", replace: "const work=record(result) ? result.work : null;\n  const {nodes}=result.output;" },
  { id: "Q1-text-type-relaxed", find: 'typeof result.output.text!=="string"', replace: 'typeof result.output.text==="number"' },
  { id: "Q2-failure-schema-disjunct", find: "source.schema===REACTIVE_FIBER_CLI_SCHEMA", replace: "(source.schema===REACTIVE_FIBER_CLI_SCHEMA||source.ok===false)" },
];

// --------------------------------------------------------------------------------------------------------------- the claims

/** The provider's summary of a planted block or text it admitted verbatim, projecting as its control with nothing surfaced. */
const DEGRADED = "admitted/verbatim/same/surfaced 0/spawns 1";
/** The same, the projection differing from its control only in the output reference (the text's digest). */
const DEGRADED_BUT_PAYLOAD = "admitted/verbatim/same-but-payload/surfaced 0/spawns 1";
/** The provider's line for exactly one typed refusal in one spawn. */
const ONE_REFUSAL = "^[a-z]+: .+ \\(errors 1, spawns 1\\)$";
/** The adapter's own typed refusal. */
const ADAPTER_REFUSAL = "^validation: ReactiveFiber topology refused: ";
/** The adapter's failure projection, naming the rf code and nothing else. */
const FAILURE_NODE = "^projected unknown/failure: refused \u00b7 RF_[A-Z_]+$";

/** The closure's schema and command comparisons, as B3's facts spell them. */
const ADMISSION_COMPARISONS = [`command=${RENDER_COMMAND}`, `schema=${CLI_SCHEMA}`];
/** The wb-973.11 result-key roster, read from its own file: B4's (wb-973.11) claim names its identity and key lists. */
const RF_RESULT_ROSTER = readRfResultRoster();

/** Each pin's quote cut into terms that tile it, each term a claim with the witness facts that show it (wb-wtfr). The paths read the
 * witness without its pin id. */
const CLAIMS: Readonly<Record<string, readonly Claim[]>> = {
  A1: [
    {
      term: "Pi's validRf/fullShapeRf fixtures",
      checks: [
        { path: "validRf.provider", equals: "admitted/verbatim/spawns 1" },
        { path: "fullShapeRf.provider", equals: "admitted/verbatim/spawns 1" },
        { path: "*.adapter", equals: "projected" },
      ],
    },
    {
      term: "stay unchanged",
      checks: [
        { path: "*.envelopeKeys", equals: ENVELOPE_KEYS },
        { path: "validRf.outputKeys", equals: ["text"] },
        { path: "fullShapeRf.outputKeys", equals: ["text", "size_bytes", "digest", "path"] },
        { path: "*.uiFindings", equals: [] },
      ],
    },
  ],
  A2: [
    { term: "a block kind", checks: [{ path: "degraded.*.*", equals: DEGRADED }] },
    {
      term: "outside rftsx.*",
      checks: [
        { path: "outsideKindsInVocabulary", equals: [] },
        { path: "insideKindInVocabulary", equals: true },
        { path: "closedVocabularyRefusal.provider", matches: ONE_REFUSAL },
        { path: "closedVocabularyRefusal.adapter", matches: FAILURE_NODE },
      ],
    },
  ],
  A3: [
    {
      term: "a UI-descriptor",
      checks: [
        { path: "*.serializedAsText", equals: DEGRADED_BUT_PAYLOAD },
        { path: "*.treeAsText.provider", matches: ONE_REFUSAL },
        { path: "*.treeAsText.adapter", matches: ADAPTER_REFUSAL },
      ],
    },
    { term: "block", checks: [{ path: "*.blockRow", equals: DEGRADED }] },
  ],
  A4: [
    {
      term: "an HTML body",
      checks: [
        { path: "htmlBodyDigest", equals: `sha256:${sha256(HTML_BODY)}` },
        { path: "fixtures.*.payloadRef", equals: `rf-output:sha256:${sha256(HTML_BODY)}` },
      ],
    },
    {
      term: "is refused/degraded as today",
      checks: [
        { path: "fixtures.*.body", equals: DEGRADED_BUT_PAYLOAD },
        { path: "fixtures.*.htmlField.provider", matches: ONE_REFUSAL },
        { path: "fixtures.*.htmlField.adapter", matches: ADAPTER_REFUSAL },
      ],
    },
  ],
  B1: [
    { term: "src/workbench/providers/reactivefiber.ts accepts no", checks: [{ path: "*.*.provider", matches: ONE_REFUSAL }] },
    {
      term: "UI-descriptor",
      checks: [
        { path: "*", keys: ["ui-schema", "ui-schema-failure", "ui-command", "descriptor-command", "descriptor-list"] },
        { path: "*.*.adapter", matches: ADAPTER_REFUSAL },
      ],
    },
  ],
  B2: [
    {
      term: "host-output envelope",
      checks: [
        { path: "*", keys: ["dom-commit", "tui-cells", "mounted-control", "additive-host-output-key"] },
        { path: "*.dom-commit.provider", matches: ONE_REFUSAL },
        { path: "*.dom-commit.adapter", matches: ADAPTER_REFUSAL },
        { path: "*.tui-cells.provider", matches: ONE_REFUSAL },
        { path: "*.tui-cells.adapter", matches: ADAPTER_REFUSAL },
        { path: "*.mounted-control.provider", matches: ONE_REFUSAL },
        { path: "*.mounted-control.adapter", matches: ADAPTER_REFUSAL },
        { path: "*.additive-host-output-key", equals: DEGRADED },
      ],
    },
  ],
  B3: [
    {
      term: "(a mutant adding one fails the census)",
      checks: [
        { path: "modules", equals: CLOSURE },
        {
          path: "facts",
          equals: {
            "src/workbench/native-evidence.ts": { comparisons: ADMISSION_COMPARISONS, outputReads: [], keyLiterals: [], registrations: [], uiWords: [] },
            "src/workbench/providers/reactivefiber.ts": { comparisons: ADMISSION_COMPARISONS, outputReads: ["text"], keyLiterals: [ENVELOPE_KEYS], registrations: [PREVIEW_ID, PREVIEW_ID], uiWords: [] },
            "src/workbench/reactivefiber-observer.ts": { comparisons: ADMISSION_COMPARISONS, outputReads: ["text"], keyLiterals: [ENVELOPE_KEYS], registrations: [], uiWords: [] },
          },
        },
        {
          path: "mutants",
          equals: {
            "M1-ui-schema": ["comparisons", "ui-words"],
            "M2-interface-command": ["comparisons"],
            "M3-output-nodes": ["output-reads"],
            "M4-output-html": ["output-reads", "ui-words"],
            "M5-ninth-key": ["key-literals"],
            "M6-registration": ["registrations"],
            "M7-profile-reader": ["ui-words"],
            "M8-output-destructure": ["output-reads"],
            "Q1-text-type-relaxed": [],
            "Q2-failure-schema-disjunct": [],
          },
        },
        { path: "outsideReader", equals: { inClosure: false, phraseHits: 0, outputReads: ["html"] } },
      ],
    },
  ],
  B4: [
    {
      term: "roster",
      checks: [
        { path: "uiKeys", equals: [] },
        { path: "documentKeys", equals: ["output", "blocks", "components"] },
        { path: "fullShapeDiff", equals: { failures: [], extraResultKeys: [] } },
      ],
    },
    {
      term: "(wb-973.11)",
      checks: [
        { path: "rfVersion", equals: RF_RESULT_ROSTER.rfVersion },
        { path: "source", equals: RF_RESULT_ROSTER.source },
        { path: "receipt", equals: RF_RESULT_ROSTER.receipt },
        { path: "resultKeys", equals: RF_RESULT_ROSTER.resultKeys },
        { path: "provenanceKeys", equals: RF_RESULT_ROSTER.provenanceKeys },
        { path: "workKeys", equals: RF_RESULT_ROSTER.workKeys },
        { path: "workMetricsKeys", equals: RF_RESULT_ROSTER.workMetricsKeys },
      ],
    },
  ],
  B5: [
    {
      term: "eight-key strictness (wb-2j3.9) unchanged",
      checks: [
        { path: "*.cases", equals: [...NINTH_KEYS.map(key => `ninth ${key}`), ...ENVELOPE_KEYS.map(key => `missing ${key}`), "renamed transaction_id->ui"] },
        { path: "*.admitted", equals: [] },
        { path: "*.spawns", equals: 14 },
        { path: "*.provider", equals: ["transport: RF preview returned an unrecognized native envelope."] },
        { path: "*.adapter", equals: ["validation: ReactiveFiber topology refused: source must be the strict eight-key rf envelope."] },
      ],
    },
  ],
  C1: [
    {
      term: "armed on",
      checks: [
        { path: "phraseHits", equals: [] },
        { path: "argvWords", equals: [] },
        { path: "srcFloorMet", equals: true },
        { path: "admitted", equals: true },
        { path: "argv", equals: [["--workspace", "<root>", "context", "render", "--model", "model", "--task", "task", "--no-commit", "--no-input", "--json"]] },
      ],
    },
    {
      term: "TSX-IF-03",
      checks: [
        { path: "gate.closed", equals: true },
        { path: "gate.proposedEntries", equals: [] },
        { path: "gate.exportsMeasured", equals: 6 },
      ],
    },
  ],
  C2: [
    { term: "an unregistered descriptor ID", checks: [{ path: "unregistered-code.adapter", matches: FAILURE_NODE }] },
    {
      term: "newer version",
      checks: [
        { path: "newer-envelope-version.adapter", matches: ADAPTER_REFUSAL },
        { path: "newer-version-failure.adapter", matches: ADAPTER_REFUSAL },
      ],
    },
    {
      term: "yields one typed diagnostic",
      checks: [
        { path: "*.provider", matches: ONE_REFUSAL },
        { path: "sdk-coded-primary.adapter", matches: ADAPTER_REFUSAL },
      ],
    },
  ],
  C3: [
    {
      term: "no generic block",
      checks: [
        { path: "cases", keys: ["closed-vocabulary", "unregistered-code"] },
        { path: "cases.*.reading", equals: false },
        { path: "cases.*.snapshots", equals: 1 },
        { path: "cases.*.valueCarried", equals: false },
        { path: "cases.*.evidenceRefs", equals: ["rf-workspace"] },
        { path: "cases.*.sentinelInvariant", equals: true },
        { path: "cases.*.surfaced", equals: [] },
        { path: "sdkWithheld", equals: true },
      ],
    },
  ],
  C4: [
    {
      term: "unknown stays unknown (wb-973.10)",
      checks: [
        { path: "*.provider", equals: "admitted/verbatim" },
        { path: "unknown.coverage", equals: "partial" },
        { path: "unknown.tone", equals: "unknown" },
        { path: "unknown.note", equals: "observations: 2 rows, 2 not observed (unregistered, \u2026): partial" },
        { path: "known.coverage", equals: "complete" },
        { path: "known.tone", equals: "success" },
        { path: "known.note", equals: "observations: 1 row, 0 reused" },
      ],
    },
  ],
};
const claimsOf = (pin: string): readonly Claim[] => CLAIMS[pin] ?? [];

interface Reached {
  readonly path: string;
  readonly value: JsonValue | undefined;
}
/** Every value a check's path reaches, by concrete path; an absent key, a non-object or a "*" over no key reaches undefined. */
function reached(value: JsonValue | undefined, segments: readonly string[], at: string): Reached[] {
  const [head, ...rest] = segments;
  if (head === undefined) return [{ path: at, value }];
  if (value === undefined || value === null || typeof value !== "object" || Array.isArray(value)) return [{ path: `${at}.${head}`, value: undefined }];
  if (head !== "*") return reached(value[head], rest, `${at}.${head}`);
  const keys = Object.keys(value);
  return keys.length === 0 ? [{ path: `${at}.*`, value: undefined }] : keys.flatMap(key => reached(value[key], rest, `${at}.${key}`));
}
function checkMisses(check: ClaimCheck, content: JsonValue): string[] {
  return reached(content, check.path.split("."), "$").flatMap(({ path, value }): string[] => {
    if (value === undefined) return [`${path} absent`];
    if ("equals" in check) return isDeepStrictEqual(value, check.equals) ? [] : [`${path} is not ${JSON.stringify(check.equals)}`];
    if ("matches" in check) return typeof value === "string" && new RegExp(check.matches).test(value) ? [] : [`${path} does not match ${check.matches}`];
    return isObject(value) && isDeepStrictEqual(Object.keys(value), check.keys) ? [] : [`${path} keys are not ${check.keys.join(", ")}`];
  });
}
/** A witness without its pin id, which is no fact. */
function contentOf(witness: JsonValue | null): JsonValue {
  return isObject(witness) ? Object.fromEntries(Object.entries(witness).filter(([key]) => key !== "pin")) : witness;
}
/** What a witness fails to show of the claims: one line per missed fact, naming the term. */
function missesOf(claims: readonly Claim[], witness: JsonValue | null): string[] {
  const content = contentOf(witness);
  return claims.flatMap(claim => claim.checks.flatMap(check => checkMisses(check, content).map(miss => `${claim.term}: ${miss}`)));
}
/** The paths of a value's facts: every value below it that is not an object with keys (an array is one fact). */
function factPaths(value: unknown, at: string): string[] {
  return isObject(value) && Object.keys(value).length > 0 ? Object.entries(value).flatMap(([key, item]) => factPaths(item, `${at}.${key}`)) : [at];
}
/** The paths a claim's equals and matches checks reach in a witness's content (a key list reaches no value). */
function coveredBy(claim: Claim, content: JsonValue): string[] {
  return claim.checks.filter(check => !("keys" in check)).flatMap(check => reached(content, check.path.split("."), "$").flatMap(entry => (entry.value === undefined ? [] : [entry.path])));
}
const under = (fact: string, paths: readonly string[]): boolean => paths.some(path => fact === path || fact.startsWith(`${path}.`));
/** The facts of a witness that no claim covers. */
function unclaimedOf(claims: readonly Claim[], witness: JsonValue | null): string[] {
  const content = contentOf(witness);
  const covered = claims.flatMap(claim => coveredBy(claim, content));
  return factPaths(content, "$").filter(fact => !under(fact, covered));
}
/** The terms that show no fact of their own: every fact they cover, if any, another term of the pin covers too. */
function idleTermsOf(claims: readonly Claim[], witness: JsonValue | null): string[] {
  const content = contentOf(witness);
  const facts = factPaths(content, "$");
  return claims
    .filter((claim, index) => {
      const own = coveredBy(claim, content);
      const others = claims.flatMap((other, at) => (at === index ? [] : coveredBy(other, content)));
      return !facts.some(fact => under(fact, own) && !under(fact, others));
    })
    .map(claim => claim.term);
}
const claimMisses = (pin: string, witness: JsonValue | null): string[] => missesOf(claimsOf(pin), witness);
/** The pins' live witnesses, set as each case returns; the claims-bound case reads them. */
const LIVE = new Map<string, JsonValue>();

// ---------------------------------------------------------------------------------------------------------------- the cases

/** Every judged pin's witness, with its pin id; the judged-set case holds each to the roster. */
const done = (pin: string, witness: JsonObject): JsonValue => json({ pin, ...witness });

const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    const hosted: string[] = [];
    for (const fixture of fixtures()) {
      hosted.push(...checkoutPathsOf(fixture.envelope).map(path => `${fixture.name} ${path}`));
      const output = objectOf(resultOf(fixture.envelope).output, "result.output");
      const provided = await provide(rf, fixture.envelope, 0);
      const observed = observe(provided.reading ?? readingOf(fixture.envelope));
      out[fixture.name] = {
        envelopeKeys: Object.keys(fixture.envelope),
        outputKeys: Object.keys(output),
        uiFindings: uiFindings(fixture.envelope),
        provider: provided.reading === null ? refusalText(provided.refusals[0]) : `admitted/${verbatim(provided.reading, fixture.envelope) ? "verbatim" : "rewritten"}/spawns ${provided.spawns}`,
        adapter: observed.topology === null ? refusalText(observed.refusal) : "projected",
      };
    }
    expect(hosted, "no fixture string spells the checkout's path: both fixtures read the census's own root").toStrictEqual([]);
    return done("A1", out);
  },
  A2: async () => {
    const rf = installStandIn();
    const inVocabulary = OUTSIDE_KINDS.filter(kind => CONTEXT_VOCABULARY.includes(kind));
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const control = withBlocks(fixture.envelope, block => block);
      const kinds: JsonObject = {};
      for (const kind of [...OUTSIDE_KINDS, INSIDE_KIND]) {
        const mutant = withBlocks(fixture.envelope, block => ({ ...block, kind, content: `${MARKER} ${kind}` }));
        kinds[kind] = await degraded(rf, mutant, control, [MARKER, kind]);
      }
      out[fixture.name] = kinds;
    }
    const refusal = await refused(rf, closedVocabularyRefusal());
    return done("A2", { outsideKindsInVocabulary: inVocabulary, insideKindInVocabulary: CONTEXT_VOCABULARY.includes(INSIDE_KIND), degraded: out, closedVocabularyRefusal: refusal });
  },
  A3: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const control = withBlocks(fixture.envelope, block => block);
      const mutant = withBlocks(fixture.envelope, block => ({ ...block, kind: "button", descriptor: descriptor("1.0.0") }));
      const tree = withOutput(fixture.envelope, { ...objectOf(resultOf(fixture.envelope).output, "result.output"), text: [descriptor("1.0.0")] });
      const serialized = withText(fixture.envelope, JSON.stringify([descriptor("1.0.0")]));
      out[fixture.name] = {
        blockRow: await degraded(rf, mutant, control, [MARKER, "census.approve", "button"]),
        serializedAsText: await degraded(rf, serialized, fixture.envelope, [MARKER, "census.approve", "button"], true),
        treeAsText: await refused(rf, tree),
      };
    }
    return done("A3", out);
  },
  A4: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const body = withText(fixture.envelope, HTML_BODY);
      const provided = await provide(rf, body, 0);
      const observed = provided.reading === null ? null : observe(provided.reading);
      const field = withOutput(fixture.envelope, { html: HTML_BODY });
      out[fixture.name] = {
        body: await degraded(rf, body, fixture.envelope, [MARKER, "<div", "<button", "panel"], true),
        payloadRef: observed?.topology?.snapshots[0]?.nativePayloadRef ?? null,
        htmlField: await refused(rf, field),
      };
    }
    return done("A4", { htmlBodyDigest: `sha256:${sha256(HTML_BODY)}`, fixtures: out });
  },
  B1: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const variants: Readonly<Record<string, JsonObject>> = {
        "ui-schema": { ...fixture.envelope, schema: UI_SCHEMA },
        "ui-schema-failure": { ...closedVocabularyRefusal(), schema: UI_SCHEMA },
        "ui-command": { ...fixture.envelope, command: "ui.render" },
        "descriptor-command": { ...fixture.envelope, command: "descriptor.render" },
        "descriptor-list": withOutput(fixture.envelope, { descriptors: [descriptor("1.0.0")] }),
      };
      const cases: JsonObject = {};
      for (const [name, envelope] of Object.entries(variants)) cases[name] = await refused(rf, envelope);
      out[fixture.name] = cases;
    }
    return done("B1", out);
  },
  B2: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const output = objectOf(resultOf(fixture.envelope).output, "result.output");
      const variants: Readonly<Record<string, JsonObject>> = {
        "dom-commit": withOutput(fixture.envelope, { target: "dom", commit: [{ op: "mount", descriptor: descriptor("1.0.0") }] }),
        "tui-cells": withOutput(fixture.envelope, { target: "tui", cells: [{ row: 0, column: 0, glyph: "A" }] }),
        "mounted-control": withOutput(fixture.envelope, { ...output, text: null, mount: { descriptor: descriptor("1.0.0"), generation: 1 } }),
      };
      const cases: JsonObject = {};
      for (const [name, envelope] of Object.entries(variants)) cases[name] = await refused(rf, envelope);
      const additive = withResult(fixture.envelope, { ...resultOf(fixture.envelope), host_output: { target: "dom", commit: [{ op: "mount", descriptor: descriptor("1.0.0") }] } });
      cases["additive-host-output-key"] = await degraded(rf, additive, fixture.envelope, [MARKER, "census.approve", "mount"]);
      out[fixture.name] = cases;
    }
    return done("B2", out);
  },
  B3: async () => {
    const modules = closureModules();
    const facts: JsonObject = {};
    for (const file of modules) facts[file] = json(closureFacts(file, textOf(file)));
    const providerText = textOf(PROVIDER);
    const real = closureFacts(PROVIDER, providerText);
    const mutants: JsonObject = {};
    for (const mutant of MUTANTS) mutants[mutant.id] = flagsOf(PROVIDER, mutate(providerText, mutant.find, mutant.replace), real);
    const outsideTokens = tokensOf("planted/outside-reader.ts", parse("planted/outside-reader.ts", OUTSIDE_READER));
    const outsideReader = {
      inClosure: outsideTokens.some(token => token === "REACTIVE_FIBER_CLI_SCHEMA" || token === CLI_SCHEMA || token === RENDER_COMMAND),
      phraseHits: outsideTokens.flatMap(uiPhraseHits).length,
      outputReads: closureFacts("planted/outside-reader.ts", OUTSIDE_READER).outputReads,
    };
    return done("B3", { modules, facts, mutants, outsideReader });
  },
  B4: async () => {
    const roster = readRfResultRoster();
    const keys = [...roster.resultKeys, ...roster.provenanceKeys, ...roster.workKeys, ...roster.workMetricsKeys];
    const uiKeys = keys.filter(key => readerWordHits(key).length + uiPhraseHits(key).length > 0);
    const diff = diffAgainstRoster(roster, resultOf(fullShape()));
    return done("B4", {
      rfVersion: roster.rfVersion,
      source: roster.source,
      receipt: roster.receipt,
      resultKeys: roster.resultKeys,
      provenanceKeys: roster.provenanceKeys,
      workKeys: roster.workKeys,
      workMetricsKeys: roster.workMetricsKeys,
      uiKeys,
      documentKeys: ["output", "blocks", "components"].filter(key => roster.resultKeys.includes(key)),
      fullShapeDiff: { failures: diff.failures, extraResultKeys: diff.extraResultKeys },
    });
  },
  B5: async () => {
    const rf = installStandIn();
    const out: JsonObject = {};
    for (const fixture of fixtures()) {
      const variants: [string, JsonObject][] = [
        ...NINTH_KEYS.map((key): [string, JsonObject] => [`ninth ${key}`, { ...fixture.envelope, [key]: { descriptor: descriptor("1.0.0") } }]),
        ...ENVELOPE_KEYS.map((key): [string, JsonObject] => [`missing ${key}`, Object.fromEntries(Object.entries(fixture.envelope).filter(([name]) => name !== key))]),
        ["renamed transaction_id->ui", Object.fromEntries(Object.entries(fixture.envelope).map(([name, value]) => [name === "transaction_id" ? "ui" : name, value]))],
      ];
      const provider = new Set<string>();
      const adapter = new Set<string>();
      const admitted: string[] = [];
      let spawns = 0;
      for (const [name, envelope] of variants) {
        const provided = await provide(rf, envelope, 0);
        spawns += provided.spawns;
        const observed = observe(readingOf(envelope));
        if (provided.reading !== null || observed.topology !== null) admitted.push(name);
        provider.add(refusalText(provided.refusals[0]));
        adapter.add(refusalText(observed.refusal));
      }
      out[fixture.name] = { cases: variants.map(([name]) => name), admitted, provider: [...provider].sort(), adapter: [...adapter].sort(), spawns };
    }
    return done("B5", out);
  },
  C1: async () => {
    const rf = installStandIn();
    const modules = srcModules();
    const phraseHits = modules.flatMap(file => tokensOf(file, parse(file, textOf(file))).flatMap(token => uiPhraseHits(token).map(hit => `${file}: ${hit}`)));
    const provided = await provide(rf, fullShape(), 0);
    const argv = spawnLines(rf).map(line => line.map(token => (token === ROOT ? "<root>" : token)));
    const argvWords = argv.flat().filter(token => readerWordHits(token).length + uiPhraseHits(token).length > 0);
    const profile = ROSTER.producer.descriptorProfile;
    const exports = Array.isArray(profile.exports) ? profile.exports.map(String) : [];
    const srcHits = [profile.programPinSrcHits, profile.runtimePinSrcHits];
    return done("C1", {
      gate: {
        closed: srcHits.every(hits => hits === 0) && exports.length > 0 && !exports.some(entry => PROPOSED_ENTRY.test(entry)),
        proposedEntries: exports.filter(entry => PROPOSED_ENTRY.test(entry)),
        exportsMeasured: exports.length,
      },
      srcFloorMet: modules.length >= SRC_FLOOR,
      phraseHits,
      admitted: provided.reading !== null,
      argv,
      argvWords,
    });
  },
  C2: async () => {
    const rf = installStandIn();
    const unregistered = closedVocabularyRefusal(UNREGISTERED_CODE);
    const sdkCoded = closedVocabularyRefusal(SDK_CODE);
    const cases: Readonly<Record<string, JsonObject>> = {
      "unregistered-code": unregistered,
      "newer-envelope-version": { ...fullShape(), schema: NEWER_SCHEMA },
      "newer-version-failure": { ...unregistered, schema: NEWER_SCHEMA },
      "sdk-coded-primary": sdkCoded,
    };
    const out: JsonObject = {};
    for (const [name, envelope] of Object.entries(cases)) out[name] = await refused(rf, envelope);
    return done("C2", out);
  },
  C3: async () => {
    const rf = installStandIn();
    const cases: Readonly<Record<string, JsonObject>> = {
      "closed-vocabulary": closedVocabularyRefusal(),
      "unregistered-code": closedVocabularyRefusal(UNREGISTERED_CODE),
    };
    const out: JsonObject = {};
    for (const [name, envelope] of Object.entries(cases)) {
      const provided = await provide(rf, envelope, exitFor(envelope));
      const topology = observe(readingOf(envelope)).topology;
      const sentinel = observe(readingOf(sentinelRefusal(envelope))).topology;
      const snapshot = topology?.snapshots[0];
      const strings = stringsOf(topology);
      out[name] = {
        reading: provided.reading !== null,
        snapshots: topology?.snapshots.length ?? 0,
        valueCarried: snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined || snapshot.sourceVersion !== undefined,
        evidenceRefs: (snapshot?.evidenceRefs ?? []).map(ref => ref.slice(0, ref.indexOf(":"))),
        sentinelInvariant: topology !== null && isDeepStrictEqual(topology, sentinel),
        surfaced: withheldValues(envelope).filter(value => strings.some(item => item.includes(value))),
      };
    }
    // The withheld SDK code and message are among the values the projection must not carry.
    const withheld = withheldValues(closedVocabularyRefusal());
    return done("C3", { cases: out, sdkWithheld: withheld.includes(SDK_CODE) && withheld.includes(ROSTER.producer.rf.sdkMessage) });
  },
  C4: async () => {
    const rf = installStandIn();
    const rows = (statuses: readonly string[]): JsonObject => {
      const envelope = fullShape();
      return withResult(envelope, { ...resultOf(envelope), observations: statuses.map(status => ({ status, freshness: "captured_at_render", replayed: false })) });
    };
    const read = async (envelope: JsonObject): Promise<JsonObject> => {
      const provided = await provide(rf, envelope, 0);
      const snapshot = provided.reading === null ? undefined : observe(provided.reading).topology?.snapshots[0];
      const topology = provided.reading === null ? null : observe(provided.reading).topology;
      return {
        provider: provided.reading === null ? refusalText(provided.refusals[0]) : `admitted/${verbatim(provided.reading, envelope) ? "verbatim" : "rewritten"}`,
        coverage: snapshot?.coverage ?? null,
        tone: snapshot?.node.statusTone ?? null,
        note: topology?.diagnostics.find(note => note.startsWith("observations:")) ?? null,
      };
    };
    return done("C4", { unknown: await read(rows(["unregistered", "rftsx.button@2"])), known: await read(rows(["observed"])) });
  },
};

/** The judged pins whose case reached its witness assertion; the last case reads it. */
const REACHED = new Set<string>();
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

const JUDGED_TITLE = "the judged set: the frozen shape, the out-of-file roster, the outside anchor and the cases agree";
const CLAIMS_TITLE = "claims bound: each pin's claims refuse every other pin's live witness, and a re-authored pin stays quiet (R-REAUTHORED)";
const RECORDS_TITLE = "records: every registered test ran once in run mode in roster order, every pin reached its witness, and every case reached its end at its pinned assertion count";
/** The record's ids of the three cases that are not pins (a pin's is its own id). */
const JUDGED_ID = "judged";
const CLAIMS_ID = "claims";
const RECORDS_ID = "records";

/** THE RECORD (wb-g8uk): each case's end, in run order, as `${id}:${count}`, where count is vitest's tally of the case's expect calls
 * (expect.getState().assertionCalls, reset at each try); a case pushes it as its last statement, so a case that stops early pushes
 * none and a case that lost an assertion statement pushes a short count. */
const ENDS: string[] = [];
/** The titles selected to run, read from the collected task tree before any case runs (a test-name filter deselects the rest). */
const SELECTED: string[] = [];
/** A case's end as the record holds it. */
const endOf = (id: string): string => `${id}:${expect.getState().assertionCalls}`;

interface Registered {
  readonly name: string;
  readonly mode: string;
  readonly fails: boolean;
  readonly state: string | undefined;
  readonly self: boolean;
}
/** Every test a task tree holds, in registration order; self marks the case doing the reading. */
function registered(tasks: readonly RunnerTask[], self?: RunnerTask): Registered[] {
  const walked: Registered[] = [];
  for (const child of tasks) {
    if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === self });
    else if (child.type === "suite") walked.push(...registered(child.tasks, self));
  }
  return walked;
}
/** A registered test's title with its collected mode, "+fails" marking an inverted one. */
const modeLine = (entry: Registered): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""}`;

// The selection, read once from the collected tree before the first case runs (no case has run, so every mode is the collected one).
beforeEach(({ task }) => {
  if (SELECTED.length === 0) SELECTED.push(...registered(task.file.tasks).filter(entry => entry.mode === "run").map(entry => entry.name));
});
// The file-end judge: a records case selected to run reached its own end, after every other case's, at its pinned count.
afterAll(() => {
  if (!SELECTED.includes(RECORDS_TITLE)) return;
  expect(ENDS, "every case of this file reached its end, the records case last").toEqual([...ROSTER.reached, ROSTER.recordsEnd]);
});

describe("wb-if7q.2 rf TSX closed-vocabulary census (TSX-NATIVE-INTERFACES-AND-PORTABLE-TSX-R2, posture leg)", () => {
  it(JUDGED_TITLE, ({ task }) => {
    // The collected cases (vitest's task tree), read before any other case runs: a records case deleted, renamed, skipped or
    // inverted reds here.
    const collected = registered(task.file.tasks, task);
    const names = collected.map(entry => entry.name);
    expect(names, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(names[names.length - 1], "the records case is registered last").toBe(RECORDS_TITLE);
    expect(collected.findIndex(entry => entry.self), "this case finds itself by task identity, registered first").toBe(0);
    expect(collected.filter(entry => entry.mode !== "run" || entry.fails).map(modeLine), "every registered test is set to run and not inverted").toEqual([]);
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:5", "C:4"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => ({ id: pin.id, quote: pin.quote })) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    expect(scanConstants()).toStrictEqual(ROSTER.scan);
    expect(ROSTER.residuals.map(entry => entry.id)).toEqual(RESIDUAL_FAMILIES);
    // The claims (wb-wtfr): every pin's, frozen by claim and check counts, held to the roster, and its terms tiling its quote.
    const pins = ROWS.flatMap(row => row.pins);
    expect(Object.keys(CLAIMS), "claims for exactly the pins, in order").toEqual(pins.map(pin => pin.id));
    expect(pins.map(pin => `${pin.id}:${claimsOf(pin.id).map(claim => claim.checks.length).join("+")}`)).toEqual([
      "A1:3+4",
      "A2:1+4",
      "A3:3+1",
      "A4:2+3",
      "B1:1+2",
      "B2:8",
      "B3:4",
      "B4:3+7",
      "B5:5",
      "C1:5+3",
      "C2:1+2+2",
      "C3:8",
      "C4:7",
    ]);
    expect(json(pins.map(pin => ({ id: pin.id, claims: claimsOf(pin.id) })))).toStrictEqual(json(ROSTER.rows.flatMap(row => row.pins).map(pin => ({ id: pin.id, claims: pin.claims }))));
    const termTilings = pins.map(pin => ({ pin: pin.id, ...tiles(pin.quote, claimsOf(pin.id).map(claim => claim.term)) }));
    expect(termTilings.filter(tiling => !tiling.covered).map(tiling => `${tiling.pin} ${JSON.stringify(tiling.gaps)}`), "each pin's claim terms tile its quote").toEqual([]);
    expect(
      pins.flatMap(pin => claimsOf(pin.id).flatMap(claim => claim.checks.filter(check => check.path.split(".").some(segment => segment.length === 0)).map(check => `${pin.id} ${claim.term}: ${check.path}`))),
      "every check path names its segments",
    ).toEqual([]);
    expect(ROSTER.bead).toBe(BEAD);
    // The measured producer facts anchor the vocabulary and the refusal row this file names.
    expect(ROSTER.producer.contextVocabulary).toEqual(CONTEXT_VOCABULARY);
    expect({ hostCode: ROSTER.producer.rf.hostCode, sdkCode: ROSTER.producer.rf.sdkCode }).toStrictEqual({ hostCode: HOST_CODE, sdkCode: SDK_CODE });
    expect(ROSTER.producer.rf.tsxCodes.includes(HOST_CODE) && !ROSTER.producer.rf.tsxCodes.includes(UNREGISTERED_CODE), "the host code is a measured RF_TSX_ code and the unregistered one is not").toBe(true);
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a), (b) and (c)").toEqual(["(a) ", "(b) ", "(c) "]);
    const coverage = clauses.map(clause => ROWS.filter(row => row.label.includes(clause)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause sits verbatim in exactly one row label").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"]]);
    const tilings = clauses.map(clause => {
      const row = ROWS.find(entry => entry.label.includes(clause));
      return row === undefined ? { covered: false, gaps: ["<no row>"] } : tiles(clause.slice(4), row.pins.map(pin => pin.quote));
    });
    expect(tilings.map(tiling => tiling.covered), `each row's pin quotes tile its clause: ${JSON.stringify(tilings.map(tiling => tiling.gaps))}`).toEqual(clauses.map(() => true));
    const quote = /^Quote: '(.+?)' (\S+@[0-9a-f]{12})\. /m.exec(bead.notes);
    expect({ quote: quote?.[1], citation: quote?.[2] }).toStrictEqual({ quote: ROSTER.quote, citation: ROSTER.citation });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    const gating = bead.notes.split("\n").find(line => line.startsWith("Gating: ")) ?? "";
    expect(gating.includes("output-nodes.ts :149-155") && gating.includes("TSX-IF-03"), "the Gating line names the vocabulary constants and the unshipped gate").toBe(true);
    expect(ROSTER.producer.vocabularySites[0]?.endsWith(":149-155"), "the roster's first vocabulary site is the Gating line's").toBe(true);
    ENDS.push(endOf(JUDGED_ID));
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin.id, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin.id];
          expect(impl, `no case for ${pin.id}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          if (witness !== null) LIVE.set(pin.id, witness);
          expect(witness).toStrictEqual(rosterWitness(pin.id));
          expect(claimMisses(pin.id, witness), `${pin.id}'s witness shows every term of its quote`).toEqual([]);
          expect(unclaimedOf(claimsOf(pin.id), witness), `every fact of ${pin.id}'s witness sits under a term of its quote`).toEqual([]);
          expect(idleTermsOf(claimsOf(pin.id), witness), `every term of ${pin.id}'s quote shows a fact of its own`).toEqual([]);
          REACHED.add(pin.id);
          ENDS.push(endOf(pin.id));
        });
      }
    });
  }

  it(CLAIMS_TITLE, () => {
    const ids = ROWS.flatMap(row => row.pins.map(pin => pin.id));
    expect(ids.filter(id => !LIVE.has(id)), "every pin's case returned a live witness").toEqual([]);
    const accepted = ids.flatMap(claimer => ids.filter(other => other !== claimer && claimMisses(claimer, LIVE.get(other) ?? null).length === 0).map(other => `${claimer} accepts ${other}`));
    expect(accepted, "no pin's claims accept another pin's live witness").toEqual([]);
    // R-REAUTHORED, the quiet row: C3 re-authored (its case cut to one refusal's reading, its claims to that one fact, its roster
    // witness to match) shows those claims with every fact under them, and no other pin's claims accept it; C3's own claims refuse it.
    const reauthored: JsonValue = { pin: "C3", cases: { "closed-vocabulary": { reading: false } } };
    const reauthoredClaims: readonly Claim[] = [{ term: "no generic block", checks: [{ path: "cases.*.reading", equals: false }] }];
    expect({
      shows: missesOf(reauthoredClaims, reauthored),
      unclaimed: unclaimedOf(reauthoredClaims, reauthored),
      idle: idleTermsOf(reauthoredClaims, reauthored),
      acceptedBy: ids.filter(id => id !== "C3" && claimMisses(id, reauthored).length === 0),
      refusedByC3: claimMisses("C3", reauthored).length > 0,
    }).toStrictEqual({ shows: [], unclaimed: [], idle: [], acceptedBy: [], refusedByC3: true });
    ENDS.push(endOf(CLAIMS_ID));
  });

  it(RECORDS_TITLE, ({ task }) => {
    const walked = registered(task.file.tasks, task);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test ran in run mode, not inverted").toEqual([]);
    expect([...REACHED].sort(), "every judged pin reached its witness assertion").toEqual(ROWS.flatMap(row => row.pins.map(pin => pin.id)).sort());
    // THE RECORD: every case before this one reached its end - the judged set first, each pin after its claims assertions in row
    // order, then the claims-bound case - at its pinned assertion count.
    expect(ENDS, "every case before this one reached its end, in run order, at its pinned assertion count").toEqual([...ROSTER.reached]);
    expect(
      ENDS.map(entry => entry.slice(0, entry.lastIndexOf(":"))),
      "the ends recorded are the judged set's, the rows' pins' and the claims-bound case's",
    ).toEqual([JUDGED_ID, ...ROWS.flatMap(row => row.pins.map(pin => pin.id)), CLAIMS_ID]);
    ENDS.push(endOf(RECORDS_ID));
  });
});
