/**
 * wb-hs2j.3 (RF-REACTIVE-CONTEXT-ASSEMBLY-R3), the absent-today leg. Statement (bead notes, full form): "Pi shall manage rf session
 * lifecycle explicitly: one pinned session passed for repeated committed renders (dashboard-style ticks; the zero-mint guarantee is
 * gated on RFCLI rfc-s24ro.7, open, unshipped, and Pi's preview arm is --no-commit today), no assumed automatic expiry, sessions
 * addressed only by exact session_id (never by name while duplicate-name acceptance is undetermined, rca-C055), and a closed session
 * never treated as resumable" (ReactiveFiberCLI docs/programs/reactive-context-assembly-2026-10-18/
 * 02-swarm-usage-and-command-grammar.md:42@6a251bf73af5, merged README.md:73@6a251bf73af5). Acceptance: "(a) a Pi loop of committed
 * renders supplies one pinned session id and the open-session count stays constant across N ticks; (b) no Pi code or doc assumes rf
 * sessions expire automatically; (c) recovery paths key on session_id, never a free-text name; (d) recovery against a closed
 * session surfaces closed status, never resumes it."
 *
 * Pi commits no rf render today: its one rf launch (providers/reactivefiber.ts nativeReactiveFiberRender) spawns only the
 * `context render ... --no-commit` preview, which passes no --session, and Pi drives no rf session verb. So the committed loop of
 * (a) and the recovery paths of (c) and (d) do not exist yet (the future committing path is wb-jwc.5's), and the census pins that
 * state, the measured producer behaviour each clause depends on, and every surface the obligation already reaches:
 *  A, acceptance (a). A1 the src launch inventory: every child_process launcher call in a src module, through a named, aliased,
 *    namespace or default import, an import-equals, a require or dynamic import binding (destructured or whole, the import
 *    awaited) or a launcher called on a require or a dynamic import of child_process, with its command folded from literals; exactly
 *    one launch names rf (the provider) and the one launch whose command is not a literal is the detached host's process.execPath.
 *    A2 N ticks of the registered native preview (three legacy, three view) against a stand-in rf: N spawns, each argv carrying
 *    --no-commit and no --session or --commit word, N readings admitted, each stating result.session_id null; the measured legacy
 *    argv of A4 is that argv. A3 the rf roster, selected by a reactivefiber: permission or an rf@ contractSource (never by id
 *    prefix), in the native and the injected registration: the one read-class preview whose contractSource is the --no-commit
 *    carrier, and RECONCILE_EVIDENCE_READS.reactivefiber names it alone, so no committing rf capability exists. A4 the measured
 *    producer ticks (roster `producer.ticks`): the --no-commit ticks kept the open-session count constant, each sessionless
 *    committed tick minted its own session (the 95-open mechanism of the quote), the ticks under one pinned --session kept the
 *    count constant and reported that id; the zero-mint journey of rfc-s24ro.7 is absent at the pin and at origin/main, as the
 *    bead row's "Shipped: no." states, so a re-measure that finds it flips A4 red until the committed loop lands with (a).
 *  B, acceptance (b). B1 the whole walked tree read as UTF-8 text, each text judged as written and as rendered (compatibility
 *    forms folded by NFKC, default-ignorable code points such as a zero-width space or a soft hyphen removed, intraword emphasis
 *    asterisks dropped): no judged file holds a sentence in which a session word sits
 *    within WINDOWS.rf words of an rf word and within WINDOWS.expiry words of an expiry term, unless a negator appears in that
 *    sentence before the later of the session word and the expiry term; the walk meets no symlink (refused, never followed) and
 *    no unreadable entry. B2 the rf reader closure (the src import closure of the provider and its adapter) holds no session state: no
 *    identifier or property name carries a session word and no literal (a cooked string or template part, or a folded `+`
 *    concatenation) names a session flag, a session_id field, a dotted session leaf or an rfs_ id. B3 each exemption is load-bearing: this file and its roster
 *    are walked, not judged, and both read as expiry findings, so lifting either reds B1.
 *  C, acceptance (c). C1 no src module and no native descriptor text spells an rf session verb (an argv "session" followed by a
 *    verb, a dotted session.<verb> leaf, an `rf ... session <verb>` command text) or a --session flag, while the render argv is
 *    read (non-vacuity). C2 the measured producer serves session open/show/list/close only (no recover, handoff, resume or attach
 *    leaf: README C6 is proposed), addresses show and close by the session id, keeps --name a field separate from --id and states
 *    an unnamed session's name null; rca-C055 leaves duplicate-name acceptance undetermined, so Pi pins id-only.
 *  D, acceptance (d). D1 a stand-in rf answering the measured RF_SESSION_CLOSED refusal (and a full-shape live render to any later
 *    spawn) yields the typed refusal naming the code and no field value, no reading, one spawn. D2 the injected registration's
 *    reading carries that refusal byte for byte (a deep copy handed to the reader, compared with the pre-invocation serialization).
 *    D3 the adapter projects it as a failure whose status names the code and which carries no output digest or graph revision.
 * MEASURED PRODUCER FACTS (roster `producer`, read-only, 2026-10-23): rf 0.1.832 (`rf --json --version`) in a scratch jsonl
 * workspace; the help lines are `rf <leaf> --help`, whitespace-normalised; the closed refusal is the stdout of a committed render
 * with --session <closed id> (exit 4; the --no-commit form answered the same code), its scratch root rewritten to
 * /fixture/rf-workspace. The pin and origin/main facts are `git cat-file -e` / `git show` in a ReactiveFiberCLI clone. D1 answers
 * Pi's own argv (which carries no --session) with that measured refusal: it reads the reader's handling of the code, not a Pi
 * recovery path, since none exists.
 * LISTING ANCHORS (wb-khhg F1): each walk is held to a listing it does not compute, read from the judge's own record (the file
 * each scan judged, recorded by the scan; each file B1's judge read, recorded after the judgement), never to a count floor
 * alone: B1 judges every file git lists (`git ls-files --cached --others --exclude-standard`) but the bead export (.beads, the
 * one skipped root git lists) and the exempt pair; A1 and C1 scan every file git lists below src/; B2 scans exactly the closure
 * TypeScript resolves (each module's ts.preProcessFile imports resolved by ts.resolveModuleName under tsconfig.json's options);
 * C1 reads exactly the descriptors a second native registration lists. The listing is itself checked sound (it meets the files
 * floor and names every walk anchor and reader module), so no anchor passes on an empty listing; the FLOORS stay beside them.
 * PATH CANARIES (wb-khhg F1): a judge that drops its judgement by path keeps its reach, so each judge also meets a canary in every
 * directory: B1 plants an expiry sentence (DIRECTORY_PLANT) in every directory git lists and reads that tree through the same
 * readTree; A1 and C1 scan an in-memory canary module (CANARY_MODULE: an rf launch, a session verb) in every src directory git
 * lists, and B2 a session-state canary in every directory of the closure. Not claimed: a finding or hit a case drops by path after
 * its judge returned (a filter on the list the case asserts); the anchors and canaries bind the judges' reach and judgement.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; every judged row (id, label, pins), every pin's
 * witness, the scan constants, the residual families and the registered test titles are held to the out-of-file roster
 * (test/fixtures/rf-session-lifecycle-roster.json). OUTSIDE ANCHOR: the owner filing's row in the tracked bead export
 * (.beads/issues.jsonl, row wb-hs2j.3): every acceptance clause it lists opens exactly one row label verbatim (the clause, then
 * the label's colon, so a shortened or reworded filing clause reds) and every row carries one, its quote, citation and merged quote equal the roster's, and its "Gating artifacts:" line is read by A4 and C2, so
 * a row removed from every literal of this file and the roster still reds. Not claimed: a pin removed from ROWS, the frozen literal,
 * IMPL and the roster together (the bead row anchors rows and clauses, not pins).
 * RECORDS: the last case walks this file's registered tests (vitest's task tree): each roster title once, in order, in run mode,
 * not inverted, ran; every pin's case reached its end (REACHED); every registered test and suite title reads quiet to B1's judge.
 * A skipped case cannot see its own skip, so the judged-set case, which runs first, reads the records case's registration: the
 * last registered test, in run mode, not inverted (wb-khhg F4).
 * RESIDUALS (named families, each with a pinned quiet row in a control): R-SPLIT an assumption spread over two sentences or past the
 * word windows (B1 split); R-PARAPHRASE an expiry stated without the vocabulary (B1 paraphrase); R-NEGATED a negator earlier in the
 * sentence quiets a later expiry term (B1 negatedEarlier); R-ENCODED text outside UTF-8 or written with escapes (B1 utf16, escaped;
 * the planted notes/le.txt); R-RENDERED a word split by markup the rendered reading keeps, an inline HTML tag, an HTML entity or a
 * code span (B1 htmlTag, htmlEntity, codeSpan); R-OUTSIDE a file below a skipped root entry (B1 planted node_modules/, .beads/,
 * dist/); R-COMPOSED a session argv or field built from non-literal parts (C1 composedArgv, B2 composedField); R-INDIRECT-LAUNCH a
 * launcher reached through a variable, an element access or the callback of a dynamic import's then (A1 indirect, elementAccess,
 * dynamicThen); R-SESSION-ECHO the preview reader admits a --no-commit envelope stating a session id, taking the producer's
 * "--no-commit persists none" on its word (A2 sessionEcho); R-UNLABELED an rf capability registered under neither a
 * reactivefiber: permission nor an rf@ contractSource is not selected (A3 unlabeled).
 * Display paths added: none. Test-only: the stand-in rf and the planted trees live in makeScratch scratch; src is only read.
 */
import { spawnSync } from "node:child_process";
import { chmodSync, type Dirent, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, symlinkSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = process.cwd();
const SELF = "test/workbench-rf-session-lifecycle-census.test.ts";
const ROSTER_FILE = "test/fixtures/rf-session-lifecycle-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-hs2j.3";
const PREVIEW_ID = "reactivefiber.render.preview";
const RF_PERMISSION_PREFIX = "reactivefiber:";
const GRANTS = ["reactivefiber:render"];
/** The root the measured closed-session envelope names after its scratch root was rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const CLOSED_CODE = "RF_SESSION_CLOSED";
/** The ticks A2 drives through one registration: three legacy {model, task} and three served view {view, taskId} inputs. */
const TICK_INPUTS: readonly JsonObject[] = [
  { model: "m", task: "t" },
  { model: "m", task: "t" },
  { model: "m", task: "t" },
  { view: "v", taskId: "t" },
  { view: "v", taskId: "t" },
  { view: "v", taskId: "t" },
];
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
const CHILD_PROCESS = /^(?:node:)?child_process$/;
const SESSION_VERBS = ["open", "show", "list", "close", "recover", "handoff", "resume", "attach"];
/** A dotted rf session leaf, or an rf command text naming a session verb. */
const SESSION_VERB_TEXT = /\bsession\.(?:open|show|list|close|recover|handoff|resume|attach)\b|\brf\b[^\n]{0,80}?\bsession[\s_-]+(?:open|show|list|close|recover|handoff|resume|attach)\b/i;
const SESSION_FLAG_TEXT = /--session\b/;
/** A literal naming rf session state: the flag, the result field, a dotted leaf or a minted rfs_ id. */
const SESSION_FIELD_TEXT = /--session\b|\bsession_id\b|\bsession\.(?:open|show|list|close|recover|handoff|resume|attach)\b|\brfs_[0-9a-z]{4,}/i;
/** B1's vocabulary: a session word, an rf word, an expiry term (a word, an adjacent pair, or an auto word beside an ending verb). */
const SESSION_WORDS = ["session", "sessions"];
const RF_WORDS = ["rf", "rfs", "reactivefiber"];
const EXPIRY_WORDS = [
  "expire",
  "expires",
  "expired",
  "expiring",
  "expiry",
  "expiries",
  "expiration",
  "ttl",
  "ttls",
  "timeout",
  "timeouts",
  "lapse",
  "lapses",
  "lapsed",
  "reap",
  "reaps",
  "reaped",
  "reaper",
  "evict",
  "evicts",
  "evicted",
  "eviction",
  "autoclose",
  "autocloses",
  "autoclosed",
];
const EXPIRY_PAIRS = ["time out", "times out", "timed out", "timing out", "garbage collect", "garbage collected", "garbage collects"];
const AUTO_WORDS = ["auto", "automatic", "automatically"];
const END_WORDS = ["close", "closes", "closed", "closing", "end", "ends", "ended", "drop", "drops", "dropped"];
const NEGATORS = ["no", "never", "not", "without", "cannot", "none", "nor", "t"];
const WINDOWS = { rf: 6, expiry: 8 };
/** A sentence ends at a terminator before whitespace, a statement or block boundary, or a blank line. */
const SENTENCE_BREAK = /[.!?](?=\s)|[;{}]|\n[ \t]*\n/;
const SKIPPED_ROOTS = [".git", ".beads", "node_modules", "dist", "build", "coverage", ".forge"];
const EXEMPT = [SELF, ROSTER_FILE];
/** Each floor sits below the count measured at base 436e6db (808 walked files; 115 src modules; a 7-module reader closure). */
const FLOORS = { files: 700, srcModules: 100, closure: 5 };
/** The listing the walks are held to: git's own file list of the checkout, tracked and untracked but not ignored. */
const GIT_LISTING = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"];
/** The listed roots no walk judges: the bead export, which the judged-set case, A4 and C2 read as the outside anchor. */
const LISTED_UNJUDGED = [".beads"];
/** B1's rendered reading: default-ignorable code points (a zero-width space, a soft hyphen) and intraword emphasis asterisks. */
const DEFAULT_IGNORABLE = /\p{Default_Ignorable_Code_Point}/gu;
const INTRAWORD_EMPHASIS = /(?<=[\p{L}\p{N}])\*+(?=[\p{L}\p{N}])/gu;
/** The path canaries' file names: a planted expiry note in every listed directory (B1), an in-memory module in every src or closure
 * directory (A1, C1, B2). */
const DIRECTORY_PLANT = "zz-census-plant.md";
const CANARY_MODULE = "zz-census-canary.ts";
/** Files the walk must reach, each with a token its bytes carry: a root page, a src module, a qa script, an example and a binary. */
const WALK_ANCHORS: readonly (readonly [string, string])[] = [
  ["README.md", "pi-subagents"],
  ["src/workbench/providers/reactivefiber.ts", "RF render refused"],
  ["qa/workbench/receipts-index.mjs", "docs/workbench/receipts"],
  ["examples/workflows/compose.js", "export"],
  ["media/screenshot.png", "PNG"],
];
/** The reader modules: the provider and its adapter; B2 walks their src import closure. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
const RESIDUAL_FAMILIES = ["R-SPLIT", "R-PARAPHRASE", "R-NEGATED", "R-ENCODED", "R-RENDERED", "R-OUTSIDE", "R-COMPOSED", "R-INDIRECT-LAUNCH", "R-SESSION-ECHO", "R-UNLABELED"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster and the bead row. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label:
      "(a) a Pi loop of committed renders supplies one pinned session id and the open-session count stays constant across N ticks: absent today and gated - Pi's one rf launch spawns only the --no-commit preview, which passes no --session flag, the measured --no-commit ticks keep the open-session count constant, no committing rf capability is registered, and the zero-mint journey of rfc-s24ro.7 is unshipped",
    pins: ["A1", "A2", "A3", "A4"],
  },
  {
    id: "B",
    label:
      "(b) no Pi code or doc assumes rf sessions expire automatically: no walked file states an rf session expiry, the rf reader closure holds no session state, and each exemption is load-bearing",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label:
      "(c) recovery paths key on session_id, never a free-text name: Pi has no recovery path today - no src module or native descriptor spells an rf session verb or flag - and the measured producer serves no recover verb, addresses show and close by the session id and keeps the session name a separate field",
    pins: ["C1", "C2"],
  },
  {
    id: "D",
    label:
      "(d) recovery against a closed session surfaces closed status, never resumes it: the measured RF_SESSION_CLOSED refusal surfaces as itself in one spawn with no reading, the registered reading carries it verbatim, and the adapter projects a failure carrying no value",
    pins: ["D1", "D2", "D3"],
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
interface Ticks {
  readonly argv: readonly string[];
  readonly openBefore: number;
  readonly openAfter: number;
  readonly sessionIds: readonly (string | null)[];
}
interface Producer {
  readonly rfVersion: string;
  readonly model: string;
  readonly task: string;
  readonly leafPaths: readonly string[];
  readonly sessionLeaves: readonly { readonly path: string; readonly served: boolean }[];
  readonly help: { readonly [key: string]: string };
  readonly record: { readonly keys: readonly string[]; readonly unnamedName: JsonValue; readonly openStatus: string; readonly closedStatus: string };
  readonly ticks: { readonly preview: Ticks; readonly sessionless: Ticks; readonly pinned: Ticks & { readonly pinned: string } };
  readonly zeroMint: { readonly bead: string; readonly beadsRow: string; readonly title: string; readonly journey: string; readonly presentAtPin: boolean; readonly presentAtMain: boolean };
  readonly duplicateNames: { readonly id: string; readonly beadsRow: string; readonly proposition: string };
  readonly closedRefusal: { readonly commitExit: number; readonly noCommitExit: number; readonly noCommitCode: string; readonly envelope: Envelope };
  readonly programPin: { readonly repo: string; readonly sha: string };
  readonly mainPin: { readonly repo: string; readonly ref: string; readonly sha: string };
}
interface Roster {
  readonly bead: string;
  readonly quote: string;
  readonly citation: string;
  readonly merged: { readonly id: string; readonly citation: string; readonly quote: string; readonly path: string; readonly heading: string; readonly line: string };
  readonly scan: JsonObject;
  readonly producer: Producer;
  readonly residuals: readonly string[];
  readonly rows: readonly RosterRow[];
  readonly tests: readonly string[];
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function json(value: unknown): JsonValue {
  return JSON.parse(JSON.stringify(value)) as JsonValue;
}
function text(value: unknown, field: string): string {
  if (typeof value !== "string") throw new Error(`roster ${field} must be a string`);
  return value;
}
function strings(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || !value.every(item => typeof item === "string")) throw new Error(`roster ${field} must be a string list`);
  return value;
}
function count(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) throw new Error(`roster ${field} must be a non-negative integer`);
  return value;
}
function flag(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") throw new Error(`roster ${field} must be a boolean`);
  return value;
}
function objectOf(value: unknown, field: string): { [key: string]: unknown } {
  if (!isObject(value)) throw new Error(`${field} must be an object`);
  return value;
}
function ticksOf(value: unknown, field: string): Ticks {
  const raw = objectOf(value, `roster ${field}`);
  const ids: unknown = raw.sessionIds;
  if (!Array.isArray(ids)) throw new Error(`roster ${field}.sessionIds must be a list`);
  const sessionIds = ids.map((id: unknown): string | null => {
    if (id === null || typeof id === "string") return id;
    throw new Error(`roster ${field}.sessionIds must list ids or nulls`);
  });
  return { argv: strings(raw.argv, `${field}.argv`), openBefore: count(raw.openBefore, `${field}.openBefore`), openAfter: count(raw.openAfter, `${field}.openAfter`), sessionIds };
}
/** One roster envelope in the strict rf envelope shape, refused by name when any field is off. */
function envelopeOf(value: unknown, name: string): Envelope {
  const raw = objectOf(value, `roster envelope ${name}`);
  const { schema, ok, command, operation_id: operationId, workspace, transaction_id: transactionId, result, diagnostics } = raw;
  if (typeof schema !== "string" || typeof ok !== "boolean" || typeof command !== "string" || typeof operationId !== "string") {
    throw new Error(`roster envelope ${name} needs a schema, ok, command and operation_id`);
  }
  if (!isObject(workspace) || typeof workspace.id !== "string" || typeof workspace.root !== "string") throw new Error(`roster envelope ${name} needs a workspace`);
  if (transactionId !== null || !Object.hasOwn(raw, "result") || !Array.isArray(diagnostics)) throw new Error(`roster envelope ${name} needs a null transaction, a result and diagnostics`);
  return { schema, ok, command, operation_id: operationId, workspace: { id: workspace.id, root: workspace.root }, transaction_id: null, result: json(result), diagnostics: diagnostics.map(json) };
}

/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw = objectOf(JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8")), "roster");
  if (!Array.isArray(raw.rows)) throw new Error("roster needs rows");
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) throw new Error(`roster rows[${index}] needs an id, a label and pins`);
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: json(pin.witness) };
    });
    return { id: row.id, label: row.label, pins };
  });
  const merged = objectOf(raw.merged, "roster merged");
  const producer = objectOf(raw.producer, "roster producer");
  const help = objectOf(producer.help, "roster producer.help");
  const record = objectOf(producer.record, "roster producer.record");
  const ticks = objectOf(producer.ticks, "roster producer.ticks");
  const pinnedTicks = objectOf(ticks.pinned, "roster producer.ticks.pinned");
  const zeroMint = objectOf(producer.zeroMint, "roster producer.zeroMint");
  const duplicateNames = objectOf(producer.duplicateNames, "roster producer.duplicateNames");
  const closedRefusal = objectOf(producer.closedRefusal, "roster producer.closedRefusal");
  const programPin = objectOf(producer.programPin, "roster producer.programPin");
  const mainPin = objectOf(producer.mainPin, "roster producer.mainPin");
  const leaves: unknown = producer.sessionLeaves;
  if (!Array.isArray(leaves)) throw new Error("roster producer.sessionLeaves must be a list");
  const sessionLeaves = leaves.map((leaf: unknown, index: number) => {
    const row = objectOf(leaf, `roster producer.sessionLeaves[${index}]`);
    return { path: text(row.path, `producer.sessionLeaves[${index}].path`), served: flag(row.served, `producer.sessionLeaves[${index}].served`) };
  });
  if (!Object.hasOwn(record, "unnamedName")) throw new Error("roster producer.record needs unnamedName");
  const scan = json(raw.scan);
  if (!isObject(scan)) throw new Error("roster scan must be an object");
  return {
    bead: text(raw.bead, "bead"),
    quote: text(raw.quote, "quote"),
    citation: text(raw.citation, "citation"),
    merged: {
      id: text(merged.id, "merged.id"),
      citation: text(merged.citation, "merged.citation"),
      quote: text(merged.quote, "merged.quote"),
      path: text(merged.path, "merged.path"),
      heading: text(merged.heading, "merged.heading"),
      line: text(merged.line, "merged.line"),
    },
    scan: scan as JsonObject,
    producer: {
      rfVersion: text(producer.rfVersion, "producer.rfVersion"),
      model: text(producer.model, "producer.model"),
      task: text(producer.task, "producer.task"),
      leafPaths: strings(producer.leafPaths, "producer.leafPaths"),
      sessionLeaves,
      help: Object.fromEntries(Object.entries(help).map(([key, value]) => [key, text(value, `producer.help.${key}`)])),
      record: {
        keys: strings(record.keys, "producer.record.keys"),
        unnamedName: json(record.unnamedName),
        openStatus: text(record.openStatus, "producer.record.openStatus"),
        closedStatus: text(record.closedStatus, "producer.record.closedStatus"),
      },
      ticks: {
        preview: ticksOf(ticks.preview, "producer.ticks.preview"),
        sessionless: ticksOf(ticks.sessionless, "producer.ticks.sessionless"),
        pinned: { ...ticksOf(pinnedTicks, "producer.ticks.pinned"), pinned: text(pinnedTicks.pinned, "producer.ticks.pinned.pinned") },
      },
      zeroMint: {
        bead: text(zeroMint.bead, "producer.zeroMint.bead"),
        beadsRow: text(zeroMint.beadsRow, "producer.zeroMint.beadsRow"),
        title: text(zeroMint.title, "producer.zeroMint.title"),
        journey: text(zeroMint.journey, "producer.zeroMint.journey"),
        presentAtPin: flag(zeroMint.presentAtPin, "producer.zeroMint.presentAtPin"),
        presentAtMain: flag(zeroMint.presentAtMain, "producer.zeroMint.presentAtMain"),
      },
      duplicateNames: {
        id: text(duplicateNames.id, "producer.duplicateNames.id"),
        beadsRow: text(duplicateNames.beadsRow, "producer.duplicateNames.beadsRow"),
        proposition: text(duplicateNames.proposition, "producer.duplicateNames.proposition"),
      },
      closedRefusal: {
        commitExit: count(closedRefusal.commitExit, "producer.closedRefusal.commitExit"),
        noCommitExit: count(closedRefusal.noCommitExit, "producer.closedRefusal.noCommitExit"),
        noCommitCode: text(closedRefusal.noCommitCode, "producer.closedRefusal.noCommitCode"),
        envelope: envelopeOf(closedRefusal.envelope, "closedRefusal"),
      },
      programPin: { repo: text(programPin.repo, "producer.programPin.repo"), sha: text(programPin.sha, "producer.programPin.sha") },
      mainPin: { repo: text(mainPin.repo, "producer.mainPin.repo"), ref: text(mainPin.ref, "producer.mainPin.ref"), sha: text(mainPin.sha, "producer.mainPin.sha") },
    },
    residuals: strings(raw.residuals, "residuals"),
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const CLOSED = ROSTER.producer.closedRefusal.envelope;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

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
/** The first line of the filing's notes that starts with `prefix`, without the prefix. */
function noteLine(notes: string, prefix: string): string {
  const line = notes.split("\n").find(entry => entry.startsWith(prefix));
  if (line === undefined) throw new Error(`${BEAD} notes carry no "${prefix}" line`);
  return line.slice(prefix.length);
}
/** The filing's acceptance clauses: its first "Acceptance: " line, split before each "(x) ". */
function acceptanceClauses(notes: string): string[] {
  return noteLine(notes, "Acceptance: ")
    .replace(/\.$/, "")
    .split(/; (?=\([a-z]\) )/);
}

/** A word list: camelCase and acronym boundaries split, every run of other characters a separator, lower-cased. */
function wordsOf(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 0);
}
const rfAt = (words: readonly string[], at: number): boolean => RF_WORDS.includes(words[at] ?? "") || (words[at] === "reactive" && words[at + 1] === "fiber");
function expiryAt(words: readonly string[], at: number): boolean {
  const word = words[at] ?? "";
  const next = words[at + 1] ?? "";
  return EXPIRY_WORDS.includes(word) || EXPIRY_PAIRS.includes(`${word} ${next}`) || (AUTO_WORDS.includes(word) && END_WORDS.includes(next)) || (END_WORDS.includes(word) && AUTO_WORDS.includes(next));
}
/** One reading's findings: the sentences of `value` in which a session word has an rf word within WINDOWS.rf words and an expiry
 * term within WINDOWS.expiry words, with no negator from the sentence's start through that term. */
function sentenceFindings(value: string): string[] {
  const found: string[] = [];
  for (const sentence of value.split(SENTENCE_BREAK)) {
    const words = wordsOf(sentence);
    const asserted = words.some((word, at) => {
      if (!SESSION_WORDS.includes(word)) return false;
      const within = (radius: number, test: (index: number) => boolean): number[] => {
        const hits: number[] = [];
        for (let index = Math.max(0, at - radius); index <= Math.min(words.length - 1, at + radius); index += 1) if (test(index)) hits.push(index);
        return hits;
      };
      if (within(WINDOWS.rf, index => rfAt(words, index)).length === 0) return false;
      return within(WINDOWS.expiry, index => expiryAt(words, index)).some(term => !words.slice(0, Math.max(at, term) + 1).some(word => NEGATORS.includes(word)));
    });
    if (asserted) found.push(sentence.replace(/\s+/g, " ").trim().slice(0, 160));
  }
  return found;
}
/** The text as a reader sees it (wb-khhg F2): compatibility forms folded, default-ignorable code points removed and intraword
 * emphasis asterisks dropped, so ex**pire**, a zero-width split and a soft-hyphen split read as the word they render. */
const rendered = (value: string): string => value.normalize("NFKC").replace(DEFAULT_IGNORABLE, "").replace(INTRAWORD_EMPHASIS, "");
/** B1's judge: the findings of the text as written and as rendered, so neither reading hides an assumption the other shows. */
function expiryFindings(value: string): string[] {
  const shown = rendered(value);
  const found = sentenceFindings(value);
  return shown === value ? found : [...new Set([...found, ...sentenceFindings(shown)])];
}
const asserts = (value: string): boolean => expiryFindings(value).length > 0;

const posix = (path: string): string => path.split(sep).join("/");
interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
  readonly unreadable: string[];
}
/** Every regular file below `root`, in name order, root-relative with "/" separators; SKIPPED_ROOTS are skipped at the root only. */
function walkTree(root: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const unreadable: string[] = [];
  const visit = (directory: string, depth: number): void => {
    let entries: Dirent[];
    try {
      entries = readdirSync(directory, { withFileTypes: true });
    } catch {
      unreadable.push(posix(relative(root, directory)));
      return;
    }
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      if (depth === 0 && SKIPPED_ROOTS.includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(root, path)));
      else if (entry.isDirectory()) visit(path, depth + 1);
      else if (entry.isFile()) files.push(posix(relative(root, path)));
    }
  };
  visit(root, 0);
  return { files, symlinks, unreadable };
}
interface TreeReading {
  readonly walk: Walk;
  readonly judged: string[];
  /** The files B1's judge ran on, each recorded after its judgement: the record the listing anchor reads. */
  readonly read: string[];
  readonly findings: string[];
  readonly anchorsWalked: boolean;
}
/** The walk of `root` and B1's judge over every judged file, read as UTF-8; the exempt files are walked but not judged. */
function readTree(root: string): TreeReading {
  const walk = walkTree(root);
  const judged = walk.files.filter(file => !EXEMPT.includes(file));
  const read: string[] = [];
  const findings: string[] = [];
  const anchors = new Map<string, boolean>();
  for (const file of judged) {
    let buffer: Buffer;
    try {
      buffer = readFileSync(join(root, file));
    } catch (error) {
      // A file gone between the listing and the read holds nothing; any other read failure is a finding.
      if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) walk.unreadable.push(file);
      continue;
    }
    findings.push(...expiryFindings(buffer.toString("utf8")).map(sentence => `${file}: ${sentence}`));
    read.push(file);
    const anchor = WALK_ANCHORS.find(([path]) => path === file);
    if (anchor !== undefined) anchors.set(file, buffer.includes(anchor[1]));
  }
  return { walk, judged, read, findings, anchorsWalked: WALK_ANCHORS.every(([path]) => anchors.get(path) === true) };
}
let live: TreeReading | undefined;
/** The repository's own reading, taken once, after git's listing (so a file the listing names and a concurrent run removes before
 * the walk is absent at the anchor's check, never a false gap). */
function liveTree(): TreeReading {
  if (live === undefined) {
    gitListing();
    live = readTree(REPO);
  }
  return live;
}
/** Whether a path exists, a symlink included (never followed). */
function present(path: string): boolean {
  try {
    lstatSync(path);
    return true;
  } catch {
    return false;
  }
}
let listing: readonly string[] | undefined;
/** Git's own file list of the checkout (GIT_LISTING: root-relative, "/"-separated, sorted), taken once: the listing every walk is
 * held to. */
function gitListing(): readonly string[] {
  if (listing === undefined) {
    const run = spawnSync("git", GIT_LISTING, { cwd: REPO, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (run.status !== 0) throw new Error(`git ${GIT_LISTING.join(" ")} failed: ${run.stderr}`);
    listing = [...new Set(run.stdout.split("\0").filter(name => name.length > 0))].sort();
  }
  return listing;
}
const rootOf = (file: string): string => file.split("/")[0] ?? "";
/** The listed files B1's judge owes a reading: present on disk, outside LISTED_UNJUDGED and the exempt pair. */
const listedJudgeable = (): string[] => gitListing().filter(file => !LISTED_UNJUDGED.includes(rootOf(file)) && !EXEMPT.includes(file) && present(join(REPO, file)));
/** The listed src files A1 and C1 owe a scan: every listed file below src/ that is present on disk. */
const listedSrc = (): string[] => gitListing().filter(file => file.startsWith("src/") && present(join(REPO, file)));
/** The listing is no empty or truncated reading: it meets the files floor and names every walk anchor and reader module, so no
 * anchor that reads it passes vacuously. */
const listingSound = (): boolean =>
  gitListing().length >= FLOORS.files && [...WALK_ANCHORS.map(([path]) => path), ...READER_MODULES].every(path => gitListing().includes(path));
/** The distinct directories of some files, "/"-separated and sorted ("." for the root). */
const directoriesOf = (files: readonly string[]): string[] => [...new Set(files.map(file => posix(dirname(file))))].sort();
/** A canary's path in a directory. */
const inDirectory = (directory: string, name: string): string => (directory === "." ? name : `${directory}/${name}`);
/** Plants `files` in a fresh scratch root (a null content is a symlink to the root's first file) and reads that tree. */
function plantedTree(files: Readonly<Record<string, string | Buffer | null>>): TreeReading {
  const root = makeScratch("rf-session-lifecycle-tree-");
  try {
    for (const [path, content] of Object.entries(files)) {
      const target = join(root, path);
      mkdirSync(dirname(target), { recursive: true });
      if (content === null) symlinkSync(join(root, Object.keys(files)[0] ?? ""), target);
      else writeFileSync(target, content);
    }
    return readTree(root);
  } finally {
    removeScratch(root);
  }
}

function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
/** Every regular file below a directory (symlinks are not followed). */
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
const srcModules = (): string[] => filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).sort();

/** A string literal, a parenthesized one, a `+` concatenation of foldable parts or a template whose every span folds. */
function fold(node: ts.Node | undefined): string | undefined {
  if (node === undefined) return undefined;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isParenthesizedExpression(node)) return fold(node.expression);
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = fold(node.left);
    const right = fold(node.right);
    return left === undefined || right === undefined ? undefined : left + right;
  }
  if (ts.isTemplateExpression(node)) {
    let folded = node.head.text;
    for (const span of node.templateSpans) {
      const value = fold(span.expression);
      if (value === undefined) return undefined;
      folded += value + span.literal.text;
    }
    return folded;
  }
  return undefined;
}
const parse = (fileName: string, source: string): ts.SourceFile => ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

interface LaunchScan {
  readonly file: string;
  readonly rf: string[];
  readonly composed: string[];
  readonly unbound: string[];
  readonly commands: string[];
}
/** One module's child_process launches: calls through a named, aliased, namespace or default import of child_process, an
 * import-equals of it, a require or dynamic import binding of it (destructured or whole, the import awaited) or a launcher called on
 * a require or a dynamic import of it directly, each command folded from literals (its basename read for rf); a bare call to a
 * launcher name the module never bound is listed apart. */
function launchesOf(fileName: string, source: string): LaunchScan {
  const file = parse(fileName, source);
  const bound = new Map<string, string>();
  const namespaces = new Set<string>();
  const isChildProcess = (node: ts.Node | undefined): boolean => node !== undefined && ts.isStringLiteralLike(node) && CHILD_PROCESS.test(node.text);
  const requiresChildProcess = (node: ts.Node | undefined): boolean =>
    node !== undefined && ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require" && isChildProcess(node.arguments[0]);
  /** The expression under its parentheses and an await. */
  const bare = (node: ts.Node | undefined): ts.Node | undefined => {
    let current = node;
    while (current !== undefined && (ts.isParenthesizedExpression(current) || ts.isAwaitExpression(current))) current = current.expression;
    return current;
  };
  const importsChildProcess = (node: ts.Node | undefined): boolean => {
    const call = bare(node);
    return call !== undefined && ts.isCallExpression(call) && call.expression.kind === ts.SyntaxKind.ImportKeyword && isChildProcess(call.arguments[0]);
  };
  /** A require or a dynamic import of child_process (wb-khhg F3: the dynamic import was the escaping form G20). */
  const loadsChildProcess = (node: ts.Node | undefined): boolean => requiresChildProcess(bare(node)) || importsChildProcess(node);
  const bind = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && isChildProcess(node.moduleSpecifier) && node.importClause !== undefined) {
      const clause = node.importClause;
      if (clause.name !== undefined) namespaces.add(clause.name.text);
      const named = clause.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) namespaces.add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) {
        for (const element of named.elements) {
          const imported = (element.propertyName ?? element.name).text;
          if (LAUNCHERS.includes(imported)) bound.set(element.name.text, imported);
        }
      }
    }
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && isChildProcess(node.moduleReference.expression)) namespaces.add(node.name.text);
    if (ts.isVariableDeclaration(node) && loadsChildProcess(node.initializer)) {
      if (ts.isIdentifier(node.name)) namespaces.add(node.name.text);
      else if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          if (!ts.isIdentifier(element.name)) continue;
          const property = element.propertyName;
          const imported = property === undefined ? element.name.text : ts.isIdentifier(property) || ts.isStringLiteral(property) ? property.text : "";
          if (LAUNCHERS.includes(imported)) bound.set(element.name.text, imported);
        }
      }
    }
    ts.forEachChild(node, bind);
  };
  bind(file);
  const rf: string[] = [];
  const composed: string[] = [];
  const unbound: string[] = [];
  const commands: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      let launcher: string | undefined;
      if (ts.isIdentifier(callee) && bound.has(callee.text)) launcher = bound.get(callee.text);
      else if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && namespaces.has(callee.expression.text) && LAUNCHERS.includes(callee.name.text)) launcher = callee.name.text;
      else if (ts.isPropertyAccessExpression(callee) && loadsChildProcess(callee.expression) && LAUNCHERS.includes(callee.name.text)) launcher = callee.name.text;
      else if (ts.isIdentifier(callee) && LAUNCHERS.includes(callee.text)) unbound.push(`${fileName}:${callee.text}`);
      if (launcher !== undefined) {
        const first = node.arguments[0];
        const command = fold(first);
        if (command === undefined) composed.push(`${fileName}:${launcher}(${first === undefined ? "" : first.getText(file)})`);
        else {
          commands.push(command);
          if (command.split("/").pop() === "rf") rf.push(`${fileName}:${launcher}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, rf, composed, unbound, commands };
}

interface VerbScan {
  readonly file: string;
  readonly argv: string[];
  readonly flags: string[];
  readonly literals: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** One module's rf session verbs and flags: an argv array with "session" followed by a verb (a non-literal next element counts as
 * composed), an argv word that is --session or starts --session=, or a string or template literal spelling a dotted leaf, an rf
 * session command or the flag. */
function sessionVerbsOf(fileName: string, source: string): VerbScan {
  const file = parse(fileName, source);
  const argv: string[] = [];
  const flags: string[] = [];
  const literals: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        const next = words[index + 1];
        if (word === "context" && next === "render") renderArgv += 1;
        if (word === "session" && index + 1 < words.length) {
          if (next === null) composedArgv += 1;
          else if (next !== undefined && SESSION_VERBS.includes(next)) argv.push(`${fileName}: [${words.map(item => item ?? "<expr>").join(", ")}]`);
        }
        if (word !== null && (word === "--session" || word.startsWith("--session="))) flags.push(`${fileName}: ${word}`);
      });
    }
    if (ts.isStringLiteralLike(node) && (SESSION_VERB_TEXT.test(node.text) || SESSION_FLAG_TEXT.test(node.text))) literals.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" ");
      if (SESSION_VERB_TEXT.test(parts) || SESSION_FLAG_TEXT.test(parts)) literals.push(`${fileName}: ${parts}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, argv, flags, literals, renderArgv, composedArgv };
}

interface StateScan {
  readonly file: string;
  readonly identifiers: string[];
  readonly literals: string[];
}
/** One module's session state: identifiers and property names carrying a session word, and literals (a cooked string or template
 * part, or a folded `+` concatenation) naming a session flag, field, dotted leaf or rfs_ id; regular expression literals are not
 * read. */
function sessionStateOf(fileName: string, source: string): StateScan {
  const file = parse(fileName, source);
  const identifiers: string[] = [];
  const literals: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isIdentifier(node) || ts.isPrivateIdentifier(node)) && wordsOf(node.text).some(word => SESSION_WORDS.includes(word))) identifiers.push(`${fileName}: ${node.text}`);
    if ((ts.isStringLiteralLike(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) && SESSION_FIELD_TEXT.test(node.text)) literals.push(`${fileName}: ${node.text}`);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const folded = fold(node);
      if (folded !== undefined && SESSION_FIELD_TEXT.test(folded)) literals.push(`${fileName}: ${folded}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return { file: fileName, identifiers, literals };
}

/** The reader modules' transitive src import closure (static imports and re-exports of relative specifiers). */
function readerClosure(): { modules: string[]; unresolved: string[] } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || seen.has(path)) continue;
    seen.add(path);
    const file = parse(relative(REPO, path), textOf(path));
    for (const statement of file.statements) {
      if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))) continue;
      const specifier = statement.moduleSpecifier;
      if (specifier === undefined || !ts.isStringLiteralLike(specifier) || !specifier.text.startsWith(".")) continue;
      const target = join(dirname(path), specifier.text.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${posix(relative(REPO, path))}: ${specifier.text}`);
    }
  }
  return { modules: [...seen].map(path => posix(relative(REPO, path))).sort(), unresolved };
}

/** TypeScript's own reading of the reader closure, the listing B2 is held to: each module's imports as ts.preProcessFile lists them
 * (static, type-only and dynamic), resolved by ts.resolveModuleName under tsconfig.json's options; a relative specifier it cannot
 * resolve is listed apart. */
function resolvedClosure(): { modules: string[]; unresolved: string[] } {
  const config = ts.readConfigFile(join(REPO, "tsconfig.json"), ts.sys.readFile);
  if (config.error !== undefined) throw new Error("tsconfig.json does not parse");
  const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, REPO);
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const queue = READER_MODULES.map(module => join(REPO, module));
  while (queue.length > 0) {
    const path = queue.shift();
    if (path === undefined || seen.has(path)) continue;
    seen.add(path);
    for (const { fileName: specifier } of ts.preProcessFile(textOf(path), true, true).importedFiles) {
      const target = ts.resolveModuleName(specifier, path, options, ts.sys).resolvedModule;
      if (target === undefined) {
        if (specifier.startsWith(".")) unresolved.push(`${posix(relative(REPO, path))}: ${specifier}`);
        continue;
      }
      if (target.isExternalLibraryImport !== true && posix(relative(REPO, target.resolvedFileName)).startsWith("src/")) queue.push(target.resolvedFileName);
    }
  }
  return { modules: [...seen].map(path => posix(relative(REPO, path))).sort(), unresolved };
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
afterEach(() => {
  process.env.PATH = oldPath;
  removeScratch(...scratches.splice(0));
});

interface Answer {
  readonly stdout: JsonValue;
  readonly exit: number;
}
/** A stand-in `rf` first on PATH: it appends one JSON argv line per spawn to the returned log and answers spawn n with
 * answers[n] (the last answer repeats). */
function standInRf(answers: readonly Answer[]): string {
  const folder = makeScratch("rf-session-lifecycle-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      'const seen = fs.existsSync(log) ? fs.readFileSync(log, "utf8").split("\\n").filter(Boolean).length : 0;',
      'fs.appendFileSync(log, JSON.stringify(process.argv.slice(2)) + "\\n");',
      `const answers = ${JSON.stringify(answers)};`,
      "const answer = answers[Math.min(seen, answers.length - 1)];",
      "process.stdout.write(JSON.stringify(answer.stdout));",
      "process.exit(answer.exit);",
      "",
    ].join("\n"),
  );
  chmodSync(script, 0o700);
  process.env.PATH = `${folder}:${oldPath ?? ""}`;
  return log;
}
function spawnsOf(log: string): string[][] {
  return textOf(log)
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => JSON.parse(line) as string[]);
}
function invocationContext(): { grants: string[]; signal: AbortSignal } {
  return { grants: [...GRANTS], signal: new AbortController().signal };
}
function refusalOf(error: unknown): { category: string; message: string } {
  if (!(error instanceof CapabilityError)) throw new Error(`expected a CapabilityError, got ${String(error)}`);
  return { category: error.category, message: error.message };
}
interface NativeTicks {
  readonly readings: JsonValue[];
  readonly refusals: { category: string; message: string }[];
  readonly spawns: string[][];
}
/** One NATIVE registration (registerNativeReactiveFiberRender) invoked once per input against a stand-in rf. */
async function nativeTicks(inputs: readonly JsonObject[], answers: readonly Answer[]): Promise<NativeTicks> {
  const log = standInRf(answers);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  const readings: JsonValue[] = [];
  const refusals: { category: string; message: string }[] = [];
  for (const input of inputs) {
    try {
      readings.push(await registry.invoke(PREVIEW_ID, input, invocationContext()));
    } catch (error) {
      refusals.push(refusalOf(error));
    }
  }
  return { readings, refusals, spawns: spawnsOf(log) };
}
/** The result.session_id an admitted reading states, "<absent>" when it states none. */
function readingSession(reading: JsonValue): JsonValue {
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  const result = objectOf(source.result, "reading result");
  return Object.hasOwn(result, "session_id") ? json(result.session_id) : "<absent>";
}
/** An argv with its workspace root, model and task values replaced by placeholders, the measured argv's spelling. */
function argvShape(argv: readonly string[], workspace: string, model: string, task: string): string[] {
  return argv.map(word => (word === workspace ? "<workspace>" : word === model ? "<model>" : word === task ? "<task>" : word));
}

let nativeDescriptors: Promise<CapabilityDescriptor[]> | undefined;
/** The native registration's descriptors, loaded once. */
function nativeCatalog(): Promise<CapabilityDescriptor[]> {
  nativeDescriptors ??= loadWorkbenchNative().then(native => {
    const registry = new CapabilityRegistry();
    native.registerNativeProviders(registry, ROOT);
    return registry.catalogSnapshot().map(entry => entry.descriptor);
  });
  return nativeDescriptors;
}
/** The native registration's descriptor ids read through a second registry, apart from nativeCatalog's cached load: the listing C1's
 * descriptor reading is held to. */
async function nativeIdsAfresh(): Promise<string[]> {
  const registry = new CapabilityRegistry();
  (await loadWorkbenchNative()).registerNativeProviders(registry, ROOT);
  return registry
    .catalogSnapshot()
    .map(entry => entry.descriptor.id)
    .sort();
}
/** The rf roster of a catalog: descriptors holding a reactivefiber: permission or an rf@ contractSource. */
const rfRoster = (descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] =>
  descriptors.filter(descriptor => descriptor.permissions.some(permission => permission.startsWith(RF_PERMISSION_PREFIX)) || descriptor.contractSource?.startsWith("rf@") === true);
const rosterRow = (descriptor: CapabilityDescriptor): JsonObject => ({ id: descriptor.id, effectClass: descriptor.effectClass, contractSource: descriptor.contractSource ?? null });

const OBSERVER_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" },
  seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z",
  observedAt: "2026-10-23T00:00:01Z",
};
/** The primary diagnostic of the measured closed-session refusal. */
function closedPrimary(): { [key: string]: unknown } {
  return objectOf(CLOSED.diagnostics[0], "closed refusal diagnostics[0]");
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** The field values a surface must not name: every string leaf of the refusal's metadata. */
const closedValues = (): string[] => stringLeaves(closedPrimary().metadata);

const REACHED: string[] = [];
/** A pin's witness, recorded as reached: only a case that ran to its end returns through here. */
function done(pin: string, witness: JsonObject): JsonValue {
  REACHED.push(pin);
  return { pin, ...witness };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const modules = srcModules();
    const scans = modules.map(path => launchesOf(posix(relative(REPO, path)), textOf(path)));
    const rf = scans.flatMap(scan => scan.rf).sort();
    const composed = scans.flatMap(scan => scan.composed).sort();
    const unbound = scans.flatMap(scan => scan.unbound).sort();
    const srcFloorMet = modules.length >= FLOORS.srcModules;
    // The listing anchor (wb-khhg F1): every file git lists below src/ is one these scans judged, read from the scans' own record.
    const scanned = new Set(scans.map(scan => scan.file));
    const unscanned = listedSrc().filter(file => !scanned.has(file));
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(unscanned, `src files git lists that A1 did not scan (${scanned.size} scanned)`).toEqual([]);
    expect({ rf, composed, unbound }, "Pi's rf launches: the provider alone, the detached host's process.execPath the one composed command").toStrictEqual({
      rf: ["src/workbench/providers/reactivefiber.ts:spawn"],
      composed: ["src/workbench/hosts/local-detached.ts:spawn(process.execPath)"],
      unbound: [],
    });
    const control = (source: string): JsonValue => {
      const scan = launchesOf("control.ts", source);
      return { rf: scan.rf.length, composed: scan.composed.length, unbound: scan.unbound.length };
    };
    const controls = {
      named: control('import { spawn } from "node:child_process";\nspawn("rf", argv);'),
      aliased: control('import { spawn as run } from "node:child_process";\nrun("rf", argv);'),
      namespace: control('import * as cp from "node:child_process";\ncp.execFile("rf", argv);'),
      defaultImport: control('import cp from "child_process";\ncp.spawnSync("rf", argv);'),
      requireDestructured: control('const { execFileSync: run } = require("node:child_process");\nrun("rf", argv);'),
      requireWhole: control('const cp = require("child_process");\ncp.fork("rf", argv);'),
      requireCall: control('require("node:child_process").spawn("rf", argv);'),
      folded: control('import { spawn } from "node:child_process";\nspawn("r" + "f", argv);'),
      absolutePath: control('import { spawn } from "node:child_process";\nspawn("/usr/local/bin/rf", argv);'),
      otherBinary: control('import { spawn } from "node:child_process";\nspawn("git", argv);'),
      composedCommand: control('import { spawn } from "node:child_process";\nspawn(binary, argv);'),
      unboundName: control('function spawn(command: string): string { return command; }\nspawn("rf");'),
      indirect: control('import * as cp from "node:child_process";\nconst run = cp.spawn;\nrun("rf", argv);'),
      elementAccess: control('import * as cp from "node:child_process";\ncp["spawn"]("rf", argv);'),
      // wb-khhg F3: the dynamic import (the gate's G20) and the import-equals (G21) forms.
      dynamicImport: control('const cp = await import("node:child_process");\ncp.spawn("rf", argv);'),
      dynamicDestructured: control('const { execFile: run } = await import("child_process");\nrun("rf", argv);'),
      dynamicDirect: control('(await import("node:child_process")).spawnSync("rf", argv);'),
      importEquals: control('import cp = require("node:child_process");\ncp.spawn("rf", argv);'),
      // R-INDIRECT-LAUNCH: the launcher reached through the callback of the dynamic import's then (the quiet row).
      dynamicThen: control('import("node:child_process").then(cp => cp.spawn("rf", argv));'),
    };
    // The path canaries (wb-khhg F1): the scan finds an rf launch in a canary module of every src directory git lists.
    const canariesMissed = directoriesOf(listedSrc()).filter(directory => launchesOf(inDirectory(directory, CANARY_MODULE), 'import { spawn } from "node:child_process";\nspawn("rf", argv);').rf.length !== 1);
    expect(canariesMissed, "src directories whose canary launch A1's scan missed").toEqual([]);
    return done("A1", { srcFloorMet, listingSound: listingSound(), unscanned, rf, composed, unbound, controls, canariesMissed });
  },
  A2: async () => {
    const outcome = await nativeTicks(TICK_INPUTS, [{ stdout: json(fullShapeRf(ROOT)), exit: 0 }]);
    const words = outcome.spawns.flat();
    const noCommit = outcome.spawns.filter(argv => argv.includes("--no-commit")).length;
    const sessionWords = words.filter(word => word.startsWith("--session")).length;
    const commitWords = words.filter(word => word === "--commit").length;
    const sessions = outcome.readings.map(readingSession);
    const { model, task, ticks } = ROSTER.producer;
    const legacy = outcome.spawns[0] ?? [];
    const measuredArgv = argvShape(legacy, ROOT, "m", "t");
    expect(outcome.refusals).toEqual([]);
    expect(outcome.spawns).toHaveLength(TICK_INPUTS.length);
    expect({ noCommit, sessionWords, commitWords }, "every tick spawns the --no-commit preview and no session or commit word").toStrictEqual({ noCommit: TICK_INPUTS.length, sessionWords: 0, commitWords: 0 });
    expect(sessions, "every admitted reading states result.session_id null").toStrictEqual(TICK_INPUTS.map(() => null));
    expect(measuredArgv, `the measured producer ticks (${model}, ${task}) ran Pi's legacy argv`).toStrictEqual([...ticks.preview.argv]);
    // R-SESSION-ECHO: a --no-commit answer stating a session id is admitted all the same (the quiet row of the residual).
    const echoed = json(fullShapeRf(ROOT));
    objectOf(objectOf(echoed, "echo").result, "echo result").session_id = `rfs_${"a".repeat(26)}`;
    const echo = await nativeTicks([{ model: "m", task: "t" }], [{ stdout: echoed, exit: 0 }]);
    const sessionEcho = echo.readings.length === 1 && echo.refusals.length === 0 ? "admitted" : "refused";
    return done("A2", {
      ticks: TICK_INPUTS.length,
      spawns: outcome.spawns.length,
      readings: outcome.readings.length,
      noCommit,
      sessionWords,
      commitWords,
      sessions,
      verbs: outcome.spawns.map(argv => argv.slice(2, 4).join(" ")),
      measuredArgv,
      controls: { sessionEcho },
    });
  },
  A3: async () => {
    const native = rfRoster(await nativeCatalog()).map(rosterRow);
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const injectedRows = rfRoster(injected.catalogSnapshot().map(entry => entry.descriptor)).map(rosterRow);
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const preview = { id: PREVIEW_ID, effectClass: "read", contractSource: REACTIVE_FIBER_CONTRACT_SOURCE };
    const committing = [...native, ...injectedRows].filter(row => row.effectClass !== "read").map(row => String(row.id));
    const carrierNoCommit = REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit");
    expect(native, "the native rf roster: the read-class --no-commit preview alone").toStrictEqual([preview]);
    expect(injectedRows, "the injected rf roster: the read-class --no-commit preview alone").toStrictEqual([preview]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(committing, "a committing rf capability landed: (a) is owed with it - one pinned --session across committed ticks (wb-hs2j.3, wb-jwc.5)").toEqual([]);
    expect(carrierNoCommit).toBe(true);
    // R-UNLABELED: a registration under neither a reactivefiber: permission nor an rf@ contractSource is not selected.
    const stray: CapabilityDescriptor = {
      id: "rf.context.commit",
      version: "1.0.0",
      description: "a committed rf render",
      inputSchema: {},
      effectClass: "write",
      permissions: ["rf:commit"],
      supportedModes: ["invoke"],
      contractSource: "ReactiveFiberCLI context.render",
    };
    const unlabeled = rfRoster([stray]).length;
    return done("A3", { native, injected: injectedRows, reconcile, committing, carrierNoCommit, controls: { unlabeled } });
  },
  A4: async () => {
    const { ticks, help, zeroMint } = ROSTER.producer;
    const reading = (entry: Ticks): JsonObject => ({
      ticks: entry.sessionIds.length,
      openBefore: entry.openBefore,
      openAfter: entry.openAfter,
      minted: entry.openAfter - entry.openBefore,
      distinctSessions: new Set(entry.sessionIds.filter(id => id !== null)).size,
    });
    const preview = reading(ticks.preview);
    const sessionless = reading(ticks.sessionless);
    const pinned = reading(ticks.pinned);
    const previewNoCommit = ticks.preview.argv.includes("--no-commit") && !ticks.preview.argv.some(word => word.startsWith("--session"));
    const sessionlessCommits = !ticks.sessionless.argv.includes("--no-commit") && !ticks.sessionless.argv.some(word => word.startsWith("--session"));
    const pinnedArgv = ticks.pinned.argv.join(" ").includes("--session <session>") && !ticks.pinned.argv.includes("--no-commit");
    const pinnedReported = ticks.pinned.sessionIds.every(id => id === ticks.pinned.pinned);
    const helpStatesMint = (help.renderSession ?? "").includes("omitted, a committed render creates a new session of its own") && (help.renderSession ?? "").includes("--no-commit persists none");
    const gating = noteLine(readBeadRow().notes, "Gating artifacts: ");
    const beadSaysUnshipped = gating.includes(`zero-session-mint under one --session (${zeroMint.bead}, open`) && gating.includes("Shipped: no.");
    const contractShipped = zeroMint.presentAtPin || zeroMint.presentAtMain;
    expect({ previewNoCommit, sessionlessCommits, pinnedArgv }, "the three measured tick forms").toStrictEqual({ previewNoCommit: true, sessionlessCommits: true, pinnedArgv: true });
    expect(preview.minted, "the --no-commit ticks left the open-session count constant").toBe(0);
    expect(preview.distinctSessions, "a --no-commit tick reports no session").toBe(0);
    expect(sessionless.minted, "each sessionless committed tick minted its own session").toBe(sessionless.ticks);
    expect(sessionless.distinctSessions).toBe(sessionless.ticks);
    expect(pinned.minted, "the ticks under one pinned --session left the open-session count constant").toBe(0);
    expect(pinnedReported, "every pinned tick reported the pinned session id").toBe(true);
    expect(helpStatesMint).toBe(true);
    expect(beadSaysUnshipped, `the bead row ${BEAD} states the zero-mint gate open and unshipped`).toBe(true);
    expect(contractShipped, `${zeroMint.journey} exists: the zero-mint guarantee shipped, arm (a) with the committed loop (wb-hs2j.3)`).toBe(false);
    return done("A4", { preview, sessionless, pinned, pinnedReported, helpStatesMint, beadSaysUnshipped, contractShipped, gate: zeroMint.bead });
  },
  B1: async () => {
    const tree = liveTree();
    const filesFloorMet = tree.walk.files.length >= FLOORS.files;
    // The listing anchor (wb-khhg F1): every file git lists is one the judge read, the bead export and the exempt pair aside, and of
    // the skipped roots git lists files only in the bead export.
    const read = new Set(tree.read);
    const unread = listedJudgeable().filter(file => !read.has(file));
    const listedRoots = new Set(gitListing().map(rootOf));
    const listedSkipped = SKIPPED_ROOTS.filter(root => listedRoots.has(root));
    expect(filesFloorMet, `files walked: ${tree.walk.files.length}`).toBe(true);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(unread, `files git lists that B1's judge did not read (${read.size} read)`).toEqual([]);
    expect(listedSkipped, "the skipped roots git lists files in").toStrictEqual(LISTED_UNJUDGED);
    expect(tree.anchorsWalked, "every walk anchor was reached with its token").toBe(true);
    expect({ findings: tree.findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable }, "sentences assuming an rf session expires").toStrictEqual({
      findings: [],
      symlinks: [],
      unreadable: [],
    });
    const expiring = "rf sessions expire after 30 minutes of inactivity.";
    const zeroWidth = String.fromCodePoint(0x200b);
    const softHyphen = String.fromCodePoint(0xad);
    const fullwidth = (word: string): string => String.fromCodePoint(...[...word].map(letter => (letter.codePointAt(0) ?? 0) + 0xfee0));
    const controls = {
      plain: asserts(expiring),
      timesOut: asserts("The rf session times out, so the dashboard re-renders without one."),
      camelIdentifier: asserts("const rfSessionTtlMs = 3_600_000;"),
      acronymIdentifier: asserts("const RFSessionTTL = 60;"),
      autoCloses: asserts("A ReactiveFiber session auto-closes when the tick ends."),
      lapse: asserts("Pi drops the rf session id because sessions lapse overnight."),
      reaped: asserts("reactive-fiber sessions are reaped by the server"),
      closedAutomatically: asserts("An rf session is closed automatically when idle."),
      fieldTtl: asserts("the session_id from rf goes stale after its TTL"),
      never: asserts("rf sessions never expire; Pi closes the session it opened."),
      noExpiry: asserts("No automatic expiry exists for an rf session."),
      claudeSession: asserts("A Claude SDK session times out after the deadline."),
      renderDeadline: asserts("The rf preview exceeded the execution deadline after a timeout."),
      closeVerb: asserts("rf session close rfs_x"),
      separate: asserts("Pi's rf render passes no session; a Claude session may time out."),
      split: asserts("Pi keeps one rf session. It expires after an hour."),
      paraphrase: asserts("The rf session goes away on its own after the dashboard stops."),
      negatedEarlier: asserts("An rf session is not closed by hand, it expires at midnight."),
      utf16: asserts(Buffer.from(expiring, "utf16le").toString("utf8")),
      escaped: asserts("rf sessions \\u0065xpire after an hour"),
      // wb-khhg F2: the rendered reading - intraword emphasis (the gate's G17), a zero-width split (G18), a soft-hyphen split (G18b)
      // and a compatibility form - and the written reading kept beside it (rawJoin: the rendered reading joins rf and sessions).
      emphasis: asserts("Pi relies on rf sessions that ex**pire** after an hour of inactivity."),
      zeroWidth: asserts(`Pi relies on rf sessions that ex${zeroWidth}pire after an hour of inactivity.`),
      softHyphen: asserts(`Pi relies on rf sessions that ex${softHyphen}pire after an hour of inactivity.`),
      compatibility: asserts(`Pi relies on rf sessions that ${fullwidth("expire")} after an hour of inactivity.`),
      rawJoin: asserts(`Pi relies on rf${zeroWidth}sessions that expire after an hour of inactivity.`),
      // R-RENDERED: a split the rendered reading keeps (the quiet rows).
      htmlTag: asserts("Pi relies on rf sessions that ex<b>pire</b> after an hour of inactivity."),
      htmlEntity: asserts("Pi relies on rf sessions that ex&shy;pire after an hour of inactivity."),
      codeSpan: asserts("Pi relies on rf sessions that ex`pire` after an hour of inactivity."),
    };
    const planted = plantedTree({
      "docs/expiry.md": `${expiring}\n`,
      "src/ttl.ts": "export const rfSessionTtlMs = 3_600_000;\n",
      "test/fixtures/expiry-note.md": `${expiring}\n`,
      "docs/rendered.md": "Pi relies on rf sessions that ex**pire** after an hour of inactivity.\n",
      "notes/never.md": "rf sessions never expire.\n",
      "notes/le.txt": Buffer.from(expiring, "utf16le"),
      "notes/link.md": null,
      "node_modules/pkg/notes.md": `${expiring}\n`,
      ".beads/issues.jsonl": `{"title":"${expiring}"}\n`,
      "dist/notes.md": `${expiring}\n`,
    });
    // The path canaries (wb-khhg F1): an expiry note in every directory git lists, read through the same readTree, is flagged.
    const plantPaths = directoriesOf(listedJudgeable()).map(directory => inDirectory(directory, DIRECTORY_PLANT));
    const directoryTree = plantedTree(Object.fromEntries(plantPaths.map(path => [path, `${expiring}\n`])));
    const directoryPlantsMissed = plantPaths.filter(path => !directoryTree.findings.some(finding => finding.startsWith(`${path}: `)));
    expect(directoryPlantsMissed, `directory plants B1's judge did not flag (${plantPaths.length} planted)`).toEqual([]);
    const flagged = (path: string): boolean => planted.findings.some(finding => finding.startsWith(`${path}: `)) || planted.walk.symlinks.includes(path);
    const plants = Object.fromEntries(
      ["docs/expiry.md", "src/ttl.ts", "test/fixtures/expiry-note.md", "docs/rendered.md", "notes/never.md", "notes/le.txt", "notes/link.md", "node_modules/pkg/notes.md", ".beads/issues.jsonl", "dist/notes.md"].map(path => [path, flagged(path)]),
    );
    return done("B1", { filesFloorMet, listingSound: listingSound(), unread, listedSkipped, directoryPlantsMissed, anchorsWalked: tree.anchorsWalked, findings: tree.findings, symlinks: tree.walk.symlinks, unreadable: tree.walk.unreadable, controls, plants });
  },
  B2: async () => {
    const { modules, unresolved } = readerClosure();
    const scans = modules.map(module => sessionStateOf(module, textOf(join(REPO, module))));
    const identifiers = scans.flatMap(scan => scan.identifiers);
    const literals = scans.flatMap(scan => scan.literals);
    const closureFloorMet = modules.length >= FLOORS.closure;
    const anchorsRead = [...READER_MODULES, "src/workbench/capability-registry.ts", "src/workbench/redaction.ts"].every(module => modules.includes(module));
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead, "the closure reaches the provider, the adapter, the registry and the redaction module").toBe(true);
    expect(unresolved).toEqual([]);
    // The listing anchor (wb-khhg F1): the modules these scans judged are exactly the closure TypeScript resolves.
    const resolved = resolvedClosure();
    const judged = scans.map(scan => scan.file).sort();
    const unscanned = resolved.modules.filter(module => !judged.includes(module));
    expect(resolved.unresolved, "relative imports TypeScript cannot resolve in the closure").toEqual([]);
    expect(judged, "B2 scans exactly the closure TypeScript resolves").toStrictEqual(resolved.modules);
    expect({ identifiers, literals }, "rf session state in the reader closure").toStrictEqual({ identifiers: [], literals: [] });
    const control = (source: string): JsonValue => {
      const scan = sessionStateOf("control.ts", source);
      return scan.identifiers.length + scan.literals.length;
    };
    const controls = {
      ttlIdentifier: control("const rfSessionTtlMs = 60_000;"),
      sessionVariable: control("let session: string | undefined;"),
      resultField: control("const id = result.session_id;"),
      flagLiteral: control('const argv = ["--session", id];'),
      templateFlag: control(["const flag = `--session=$", "{id}`;"].join("")),
      fieldLiteral: control('const key = "session_id";'),
      foldedField: control('const key = "sess" + "ion_id";'),
      mintedId: control('const id = "rfs_57bmozjjw5glqyhc4xupfdjpe4";'),
      secretKeyLiteral: control('const keys = "api[_-]?key|aws_session_token";'),
      regexLiteral: control("const field = /aws_session_token|session_id/;"),
      deadline: control("const deadlineMs = 60_000;"),
      composedField: control('const head = "session";\nconst key = head + suffix;'),
    };
    // The path canaries (wb-khhg F1): the scan finds session state in a canary module of every directory of the closure.
    const canariesMissed = directoriesOf(judged).filter(directory => sessionStateOf(inDirectory(directory, CANARY_MODULE), "let session: string | undefined;").identifiers.length !== 1);
    expect(canariesMissed, "closure directories whose canary B2's scan missed").toEqual([]);
    return done("B2", { closureFloorMet, anchorsRead, unresolved, unscanned, identifiers, literals, controls, canariesMissed });
  },
  B3: async () => {
    const tree = liveTree();
    const exemptWalked = EXEMPT.every(file => tree.walk.files.includes(file) && !tree.judged.includes(file));
    const selfFindings = asserts(textOf(join(REPO, SELF)));
    const rosterFindings = asserts(textOf(join(REPO, ROSTER_FILE)));
    expect({ exemptWalked, selfFindings, rosterFindings }, "each exemption carries real findings, so lifting it reds B1").toStrictEqual({ exemptWalked: true, selfFindings: true, rosterFindings: true });
    return done("B3", { exempt: [...EXEMPT], exemptWalked, selfFindings, rosterFindings });
  },
  C1: async () => {
    const modules = srcModules();
    const scans = modules.map(path => sessionVerbsOf(posix(relative(REPO, path)), textOf(path)));
    const argv = scans.flatMap(scan => scan.argv);
    const flags = scans.flatMap(scan => scan.flags);
    const literals = scans.flatMap(scan => scan.literals);
    const renderArgvSeen = scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1;
    const composedArgv = scans.reduce((sum, scan) => sum + scan.composedArgv, 0);
    const descriptors = await nativeCatalog();
    const descriptorFloorMet = descriptors.length >= 4;
    const descriptorsRead: string[] = [];
    const descriptorHits = descriptors
      .filter(descriptor => {
        descriptorsRead.push(descriptor.id);
        return SESSION_VERB_TEXT.test(JSON.stringify(descriptor)) || SESSION_FLAG_TEXT.test(JSON.stringify(descriptor));
      })
      .map(descriptor => descriptor.id);
    const srcFloorMet = modules.length >= FLOORS.srcModules;
    // The listing anchors (wb-khhg F1): every file git lists below src/ is one these scans judged, and every descriptor a second
    // native registration lists is one the descriptor judge read.
    const scanned = new Set(scans.map(scan => scan.file));
    const unscanned = listedSrc().filter(file => !scanned.has(file));
    const freshIds = await nativeIdsAfresh();
    const descriptorsUnread = freshIds.filter(id => !descriptorsRead.includes(id));
    expect(srcFloorMet, `src modules walked: ${modules.length}`).toBe(true);
    expect(unscanned, `src files git lists that C1 did not scan (${scanned.size} scanned)`).toEqual([]);
    expect(descriptorFloorMet, `native descriptors read: ${descriptors.length}`).toBe(true);
    expect(descriptorsUnread, `native descriptors C1 did not read (${descriptorsRead.length} read)`).toEqual([]);
    expect([...descriptorsRead].sort(), "C1 read exactly the descriptors a second native registration lists").toStrictEqual(freshIds);
    expect(listingSound(), "git's listing meets the files floor and names every walk anchor and reader module").toBe(true);
    expect(renderArgvSeen, "the reader reads the provider's context render argv").toBe(true);
    expect({ argv, flags, literals, descriptorHits }, "an rf session recovery path needs (c) and (d) with it (wb-hs2j.3)").toStrictEqual({ argv: [], flags: [], literals: [], descriptorHits: [] });
    const control = (source: string): JsonValue => {
      const scan = sessionVerbsOf("control.ts", source);
      return { hits: scan.argv.length + scan.flags.length + scan.literals.length, composed: scan.composedArgv };
    };
    const controls = {
      argvVerb: control('spawn("rf", ["--workspace", w, "session", "show", id, "--json"]);'),
      renderFlag: control('spawn("rf", ["--workspace", w, "context", "render", "--session", id, "--json"]);'),
      flagEquals: control(["const argv = [`--session=$", "{id}`];"].join("")),
      commandText: control('const cmd = "rf session recover --name dashboard";'),
      dottedLeaf: control('const leaf = "session.close";'),
      nameKeyed: control('spawn("rf", ["session", "open", "--name", name]);'),
      bdProse: control('const help = "run bd prime for the session close protocol";'),
      claudeField: control("const id = message.session_id;"),
      previewArgv: control('spawn("rf", ["--workspace", w, "context", "render", "--model", m, "--task", t, "--no-commit", "--no-input", "--json"]);'),
      composedArgv: control('const verb = "show";\nspawn("rf", ["session", verb]);'),
    };
    // The path canaries (wb-khhg F1): the scan finds a dotted session leaf in a canary module of every src directory git lists.
    const canariesMissed = directoriesOf(listedSrc()).filter(directory => sessionVerbsOf(inDirectory(directory, CANARY_MODULE), 'const leaf = "session.recover";').literals.length !== 1);
    expect(canariesMissed, "src directories whose canary C1's scan missed").toEqual([]);
    return done("C1", { srcFloorMet, listingSound: listingSound(), unscanned, descriptorFloorMet, descriptorsUnread, renderArgvSeen, argv, flags, literals, descriptorHits, composedArgv, controls, canariesMissed });
  },
  C2: async () => {
    const { leafPaths, sessionLeaves, help, record, duplicateNames } = ROSTER.producer;
    const served = sessionLeaves.filter(leaf => leaf.served).map(leaf => leaf.path);
    const sessionPaths = leafPaths.filter(path => path.startsWith("session."));
    const recoverLeaves = leafPaths.filter(path => /recover|handoff|resume|attach/.test(path));
    const addressedById = help.showSession === "SESSION the session id" && help.closeSession === "SESSION the session id";
    const nameSeparate = (help.openId ?? "").startsWith("--id ID ") && (help.openName ?? "").startsWith("--name NAME ") && record.keys.includes("session_id") && record.keys.includes("name");
    const c6Proposed = ROSTER.merged.heading === "### C6. session recover / handoff (P0)" && ROSTER.merged.line.includes(ROSTER.merged.quote);
    const duplicateNamesUndetermined = duplicateNames.proposition.includes("whether duplicate session NAMES are accepted was not determined");
    const gating = noteLine(readBeadRow().notes, "Gating artifacts: ");
    const beadPinsIdOnly = gating.includes(`Duplicate session NAME acceptance UNDETERMINED (${duplicateNames.id}`) && gating.includes("Pi pins ID-only regardless") && gating.includes("README C6 session recover verb, proposed");
    const recoverShipped = recoverLeaves.length > 0;
    expect(sessionPaths, "the served session leaves at the measured rf").toStrictEqual(served);
    expect({ addressedById, nameSeparate, c6Proposed, duplicateNamesUndetermined, beadPinsIdOnly }).toStrictEqual({
      addressedById: true,
      nameSeparate: true,
      c6Proposed: true,
      duplicateNamesUndetermined: true,
      beadPinsIdOnly: true,
    });
    expect(record.unnamedName, "an unnamed session states its name null").toBeNull();
    expect(recoverShipped, "an rf recover verb shipped: (c) and (d) are owed with the Pi path that uses it (wb-hs2j.3)").toBe(false);
    return done("C2", { sessionLeaves: served, recoverLeaves, addressedById, nameSeparate, unnamedName: record.unnamedName, c6Proposed, duplicateNamesUndetermined, beadPinsIdOnly, recoverShipped });
  },
  D1: async () => {
    const { commitExit, noCommitExit, noCommitCode } = ROSTER.producer.closedRefusal;
    // The stand-in would answer a second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeTicks([{ model: "m", task: "t" }], [{ stdout: json(CLOSED), exit: commitExit }, { stdout: json(fullShapeRf(ROOT)), exit: 0 }]);
    const refusal = outcome.refusals[0] ?? null;
    const valuesNamed = closedValues().filter(value => refusal?.message.includes(value) === true);
    expect(closedPrimary().code).toBe(CLOSED_CODE);
    expect({ commitExit, noCommitExit, noCommitCode }, "the measured closed-session refusal, committed and --no-commit").toStrictEqual({ commitExit: 4, noCommitExit: 4, noCommitCode: CLOSED_CODE });
    expect(refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${CLOSED_CODE}` });
    expect(valuesNamed).toEqual([]);
    expect(outcome.readings).toEqual([]);
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    return done("D1", { refusal, valuesNamed, readings: outcome.readings.length, spawns: outcome.spawns.length });
  },
  D2: async () => {
    const before = JSON.stringify(CLOSED);
    const handed = envelopeOf(JSON.parse(before), "handed");
    let calls = 0;
    const registry = new CapabilityRegistry();
    registerReactiveFiberRender(
      registry,
      async () => {
        calls += 1;
        return handed;
      },
      FIXTURE_ROOT,
    );
    const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
    const source = objectOf(objectOf(reading, "reading").source, "reading source");
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    const verbatim = JSON.stringify(source) === before;
    expect(verbatim, "the reading's source serializes to the roster envelope's pre-invocation bytes").toBe(true);
    expect(primary.code).toBe(CLOSED_CODE);
    expect(calls).toBe(1);
    return done("D2", { code: String(primary.code), metadata: json(primary.metadata), readingKeys: Object.keys(objectOf(reading, "reading")).sort(), contract: String(objectOf(reading, "reading").contract), calls, verbatim });
  },
  D3: async () => {
    const reading = { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(CLOSED) };
    const topology = reactivefiberTopology(reading, OBSERVER_CONTEXT);
    const snapshot = topology.snapshots[0];
    const shown = stringLeaves(json(topology));
    const primary = closedPrimary();
    const surfaced = shown.filter(value => [...closedValues(), String(primary.message), String(primary.hint)].some(withheld => value.includes(withheld)));
    const statusShowsCode = snapshot?.node.statusText.includes(CLOSED_CODE) === true;
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined;
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(statusShowsCode, "the projected status names the closed-session code").toBe(true);
    expect(carriesValue, "a closed-session refusal projects no output digest and no graph revision").toBe(false);
    expect(surfaced, "the refusal's message, hint and metadata stay withheld").toEqual([]);
    return done("D3", { snapshots: topology.snapshots.length, statusTone: snapshot?.node.statusTone ?? null, statusShowsCode, carriesValue, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], surfaced });
  },
};

/** A describe title: the row id and its label. */
const titleOf = (row: Row): string => `${row.id} ${row.label}`;

describe("wb-hs2j.3 rf session lifecycle census (RF-REACTIVE-CONTEXT-ASSEMBLY-R3, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the bead row agree", { timeout: 60_000 }, ({ task }) => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:4", "B:3", "C:2", "D:3"]);
    // The records case cannot see its own skip (wb-khhg F4): this case, which runs first, reads its registration.
    const registered: { readonly name: string; readonly mode: string; readonly fails: boolean }[] = [];
    const collect = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") registered.push({ name: child.name, mode: child.mode, fails: child.fails === true });
        else if (child.type === "suite") collect(child.tasks);
      }
    };
    collect(task.file.tasks);
    expect(registered.at(-1), "the records case is registered last, in run mode and not inverted").toStrictEqual({ name: ROSTER.tests.at(-1), mode: "run", fails: false });
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({
      bead: BEAD,
      scan: {
        sessionWords: SESSION_WORDS,
        rfWords: RF_WORDS,
        expiryWords: EXPIRY_WORDS,
        expiryPairs: EXPIRY_PAIRS,
        autoWords: AUTO_WORDS,
        endWords: END_WORDS,
        negators: NEGATORS,
        windows: WINDOWS,
        sentenceBreak: `${SENTENCE_BREAK.source}/${SENTENCE_BREAK.flags}`,
        sessionVerbs: SESSION_VERBS,
        sessionVerbText: `${SESSION_VERB_TEXT.source}/${SESSION_VERB_TEXT.flags}`,
        sessionFlagText: `${SESSION_FLAG_TEXT.source}/${SESSION_FLAG_TEXT.flags}`,
        sessionFieldText: `${SESSION_FIELD_TEXT.source}/${SESSION_FIELD_TEXT.flags}`,
        launchers: LAUNCHERS,
        childProcess: `${CHILD_PROCESS.source}/${CHILD_PROCESS.flags}`,
        skippedRoots: SKIPPED_ROOTS,
        exempt: EXEMPT,
        floors: FLOORS,
        gitListing: GIT_LISTING,
        listedUnjudged: LISTED_UNJUDGED,
        defaultIgnorable: `${DEFAULT_IGNORABLE.source}/${DEFAULT_IGNORABLE.flags}`,
        intrawordEmphasis: `${INTRAWORD_EMPHASIS.source}/${INTRAWORD_EMPHASIS.flags}`,
        directoryPlant: DIRECTORY_PLANT,
        canaryModule: CANARY_MODULE,
        walkAnchors: WALK_ANCHORS.map(([path, token]) => `${path}:${token}`),
        readerModules: READER_MODULES,
        fixtureRoot: FIXTURE_ROOT,
        closedCode: CLOSED_CODE,
      },
      residuals: RESIDUAL_FAMILIES,
    }).toStrictEqual({ bead: ROSTER.bead, scan: ROSTER.scan, residuals: [...ROSTER.residuals] });
    // The outside anchor: the owner filing's row in the tracked bead export.
    const bead = readBeadRow();
    const clauses = acceptanceClauses(bead.notes);
    const source = /^Source: ReactiveFiberCLI (\S+) '(.+?)' Merged \(([^)]+)\) (\S+) '(.+)'$/m.exec(bead.notes);
    expect(clauses.map(clause => clause.slice(0, 4)), "the filing lists acceptance (a) through (d)").toEqual(["(a) ", "(b) ", "(c) ", "(d) "]);
    // A clause opens its row's label, followed by the label's colon, so a filing clause that is shortened or reworded reds too.
    const coverage = clauses.map(clause => ROWS.filter(row => clause.length > 0 && row.label.startsWith(`${clause}:`)).map(row => row.id));
    expect(coverage.every(ids => ids.length === 1), "every acceptance clause opens exactly one row label, followed by its colon").toBe(true);
    expect(ROWS.every(row => coverage.some(ids => ids.includes(row.id))), "every row carries a clause of the filing").toBe(true);
    expect(coverage).toEqual([["A"], ["B"], ["C"], ["D"]]);
    expect({ citation: source?.[1], quote: source?.[2], mergedId: source?.[3], mergedCitation: source?.[4], mergedQuote: source?.[5] }).toStrictEqual({
      citation: ROSTER.citation,
      quote: ROSTER.quote,
      mergedId: ROSTER.merged.id,
      mergedCitation: ROSTER.merged.citation,
      mergedQuote: ROSTER.merged.quote,
    });
    expect(bead.title.endsWith(ROSTER.citation), "the title cites the roster's citation").toBe(true);
    expect(ROSTER.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the citation pins the program sha the roster measured").toBe(true);
    expect(ROSTER.merged.citation.endsWith(`@${ROSTER.producer.programPin.sha.slice(0, 12)}`), "the merged citation pins the same sha").toBe(true);
  });

  for (const row of ROWS) {
    describe(titleOf(row), () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 180_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
        });
      }
    });
  }

  it("records: every registered test ran once in run mode in roster order, every pin reached its end, and every registered title reads quiet to the B1 judge", { timeout: 60_000 }, ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const suites: string[] = [];
    const visit = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") {
          suites.push(child.name);
          visit(child.tasks);
        }
      }
    };
    visit(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file (vitest task tree), exactly and in roster order").toEqual(ROSTER.tests);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : (entry.state ?? "no result")}`;
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read), "every other test is in run mode, not inverted, and ran before this case").toEqual([]);
    expect(REACHED, "every pin's case reached its end, in row order").toEqual(ROWS.flatMap(row => row.pins));
    expect([...suites, ...titles].filter(asserts), "registered titles B1's judge would flag").toEqual([]);
  });
});
