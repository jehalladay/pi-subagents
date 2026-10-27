/**
 * wb-tnz5.4 (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R5), the absent-today leg. Statement (bead notes, full form): "If Pi ever
 * replays or relays rf renders over accepted federation receipts (gated FW-CFRR-04c rfc-bak67.12: not shipped; the exit-8 code
 * exists today), it shall present replayed output as history pinned to its receipt, never as a fresh owner read, honour
 * RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8, metadata source_id) as fail-closed with no fresh owner fetch substituted for the
 * replay result, and carry the exported owner identity verbatim."
 * (certified-federated-reactive-refinement-2026-10-18/BEADS-2026-10-21.md:45@6a251bf73af5). Acceptance, quoted: "(a) on
 * RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8) Pi reports replay unavailable with the producer's metadata.source_id echoed and
 * presents no fallback owner read as the replay output; (b) replay output is labelled historical/pinned and names its receipt, no
 * fresh/current label, owner identity fields byte-identical; (c) a hermetic guard pins that no Pi argv names rf context replay
 * today."
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-22; producer rows read from its installed
 * package, read-only): domain/diagnostics.py registers RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (:3316-3318) at exit
 * _EXIT_NOT_REPLAYABLE (:1797, 8) with metadata_keys ("source_id",), its comment reading "exit 8 naming the source_id, nothing
 * substituted". THE FIXTURE (the roster's two envelopes, test/fixtures/rf-replay-history-roster.json) is MEASURED by the cutting
 * seat in one scratch git repository holding an rf jsonl workspace whose graph feeds a git source to a declarative component (the
 * source's git.read granted by a [[trust.rule]]): `replay` is the stdout of `rf context replay RENDER --json` (exit 0) right after
 * the committed render, and `refusal` the stdout of the same command (exit 8) once the render's recorded commit was unreachable and
 * pruned (an orphan branch, the old branch deleted, the reflog expired, gc --prune=now). Only the scratch root was rewritten to
 * /fixture/rf-workspace: in both envelopes' workspace and in the refusal's message.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts). Its one rf launch spawns `rf
 * --workspace <root> context render ... --no-commit --no-input --json` (renderArgv, :111-115) and it admits only context.render
 * envelopes, so today Pi neither replays nor relays an rf replay: the statement's trigger has not fired. The census pins that and
 * every surface the obligation already reaches:
 *  A, acceptance (c). A1 every input arm the SERVED native descriptor admits (registerNativeProviders; the rf descriptors selected
 *    by their reactivefiber:render permission, never by an id prefix; inputSchema oneOf {model, task} and {view, taskId}, the view
 *    arm with and without its optional model) spawns exactly one argv against a stand-in rf, each `context render ... --no-commit`
 *    and none naming replay; A2 the rf launch sites of src: every call or construction whose first argument reads as a literal
 *    naming the rf program, whatever its callee or binding, is exactly the provider's spawn (a src floor). The literal is the
 *    argument itself or a module-local const, let or var read through its initializer (wb-3l7x F1 and its PREP F2: every
 *    declaration of the name at any depth, a cycle reading nothing), through parentheses, type assertions (as, satisfies, angle
 *    brackets) and non-null marks, either operand of ?? or ||, either branch of a conditional, or the leading literal piece of a
 *    concatenation or template (a span folded while it reads whole: a literal, a binding, or a fallback or conditional of them);
 *    it names rf whole (a bare name or a path, an .exe or .cmd suffix included) or as the program word of a shell-command line's
 *    first simple command (wb-bstx F1: `execSync("rf --json status")`), read with its quoting removed (single and double quotes
 *    and their $-prefixed forms, backslashes, a backslash-newline joining the lines) and raw, so a backslash path separator stays
 *    (wb-3l7x U1 M2: `C:\tools\rf.exe`, `.\rf`), after any opener (a subshell or group, !, if, while, until) and command prefix
 *    (NAME=value assignments, a quoted value included, and redirections), every unquoted operator ending a word (wb-3l7x F2) while
 *    a command or arithmetic substitution, a parameter expansion or a backquoted command stays inside the word it sits in (wb-3l7x
 *    U1 M1: `RF_HOME=$(pwd) rf ...`): inside $(...) and ${...} its own nested brackets, quoted strings and backslash escapes never
 *    close it, and a backquoted command ends at its first backquote that no backslash escapes (wb-kls1, the wb-3l7x gate's F4).
 *    Beside that reading A2 keeps the landed one verbatim (landing 372: the literal through a const bound to a literal or a
 *    template's text to its first span that is no literal, and the text's first whitespace word that is no NAME=value), so the
 *    cut only adds kills to the landed census (wb-3l7x U1). Controls: bare, aliased, namespace, method, template, path and const
 *    launchers, the shell line (plain, concatenated, templated, env-prefixed), the fallback, the conditional and the asserted
 *    program, the const-bound shell lines (templated, concatenated, chained) and programs (fallback, asserted), the const and
 *    conditional spans, the const cycle (0), the quoted (env value, program, double-quoted, $-quoted), escaped, subshell, grouped,
 *    negated, conditioned, redirected, glued and commented shell lines, the substituted env values (command, arithmetic,
 *    templated, const-bound, spaced, quoted, escaped, inside double quotes, backquoted, expanded), the backslash program paths
 *    (absolute, relative, raw only), the landed reading's own kills (a later command after a NAME=value word, a template cut at
 *    its first span), the let, var and compound-assigned shell lines, and one kill per claimed reading that the wb-3l7x gate's or
 *    this seat's reader mutants found unpinned (wb-kls1, the gate's F3): every declaration of the name at any depth (a var in a
 *    block, a let in a for-init, a nested second let, a var declared again), a let read through parentheses, satisfies, an
 *    angle-bracket assertion and a non-null mark, either branch of its conditional and either operand of its || or ??, a let
 *    span before the program, a span's leading piece, a construction, a spaced path read whole, a .cmd program, the $"..." quote,
 *    the while and until openers, every redirection prefix (heredoc, tab-stripped heredoc, here-string, input, append,
 *    read-write, both duplications, clobber, &> and &>>), a backslash-newline outside and inside double quotes, a program glued to
 *    ;, &&, >, < or a closing parenthesis, and an escaped backquote inside a backquoted env value (F4); A3 no string or template
 *    literal of any src module
 *    spells an rf replay verb (a template read with its literal and const spans folded in), no array literal or argument list
 *    has "context" before "replay" (a flag between them, a module-local const resolved), and no literal of an rf launch module
 *    (the modules A2 finds) spells the word replay at all, so a push, a concat or a const composing the verb from a literal reds
 *    too.
 *  B, acceptance (a). B1 the measured refusal: command context.replay, ok false, result null, one error diagnostic
 *    RF_REPLAY_RECONSTRUCTION_UNAVAILABLE whose metadata is exactly {source_id}, and the measured exit 8 riding the roster; B2 the
 *    native typed refusal of a render refusing with it is CapabilityError unavailable "RF render refused: <code>", in one spawn of
 *    the render argv, no reading, the counting fake producer port (a fail-closed globalThis.fetch) at 0 and no metadata value,
 *    message or hint in it; B3 the registered reading (registerReactiveFiberRender, the registry's injected-reader seam) of a deep
 *    copy of the refusal equals a FRESH roster read byte for byte, metadata.source_id verbatim, the injected reader called once,
 *    fetch 0; B4 the reader adapter projects the refusal (its measured workspace kept) as one failure snapshot that carries no value
 *    (no output digest, graph revision or bundle), whose source id is the producer's operation id and whose one evidence reference
 *    is the producer's workspace id, both verbatim, and whose
 *    projection is unchanged when the diagnostic's metadata, message and hint are replaced by sentinels; B5 a stand-in rf that
 *    refuses the first spawn and would answer any later spawn with a full-shape live render still yields the refusal, no reading,
 *    exactly one spawn and fetch 0: neither a fresh render nor an owner fetch stands in for the replay result; B6 the static port
 *    census of the reader closure (the reader modules' transitive src imports, its edges the static import and export
 *    declarations, dynamic import() and require() calls and import-equals - a module-local const specifier resolved - while an
 *    import() or require() whose specifier no literal spells is refused, wb-bstx F2; a scratch reader whose lazy import reaches
 *    a fetching module and whose computed import is refused is walked end to end): no network global as an identifier (a
 *    property name included) or an exact string literal, no network module as an exact string literal (a static, dynamic or
 *    required specifier, or a concatenation that keeps the module name whole), and child_process launchers, however bound
 *    (named, aliased, namespace, default, required, dynamically imported or import-equals; a module-local const program
 *    resolved), reach only "rf".
 *  C, acceptance (b). C1 the native reader refuses the measured replay output (context.replay, ok true, outcome reproduced) as an
 *    unrecognized envelope in one spawn, no reading, fetch 0; C2 the reader adapter refuses a reading carrying it, so nothing is
 *    projected; C3 the registered reading of a deep copy of it equals a FRESH roster read byte for byte - its render_id, outcome,
 *    replayability, substituted and live_recomputed and its workspace identity verbatim - with no key added beside the reading's own
 *    contract and workspaceRoot; C4 a live render whose one observation row was replayed (freshness reused) projects partial with
 *    tone unknown and a note naming the reused count, never complete or success, while the same render with the row captured at
 *    render projects complete, and no display string of either (titles, status texts, evidence references, notes) carries a
 *    freshness label (FRESH_LABELS: the fresh and current families, latest, newest, live, up to date or to the minute, real
 *    time, the now phrases and most recent - wb-bstx F3 added newest, as of now and their kin); C5 no string or template
 *    literal of the reader modules spells a freshness label (a template read with its literal and const spans folded in); C6 the quiet
 *    row of R-NODE-FRESHNESS: Pi's real ObservationProjection applies both C4 snapshots and holds each node at the freshness of the
 *    provider connection (observation.ts:718), the same for both, with the reused render's completeness partial.
 * NOT CLAIMED (the armed half, gated): a replay reader that labels replay output historical, names its federation receipt and
 * echoes source_id on its typed refusal waits for rfc-bak67.12 (FW-CFRR-04c); no reader is added or faked here. Pi reads no
 * federation export, so the exported owner identity it would carry is held to the identities it already reads: the workspace id
 * and root, the operation id and the refusal's source_id (B3, B4, C3).
 * RESIDUALS (named, each with a pinned quiet row): R-WITHHELD the native typed refusal and the adapter's projection carry the code
 * and withhold source_id with the producer's message and hint (quiet rows B2 and B4: no value named, sentinel invariance), so the
 * source_id rides only the registered reading (B3); R-COMPOSED a program name, verb, port name or label that no literal of its
 * module spells - built by a call (a join, a wrapper's return value), split across a concatenation (inside a template span too),
 * split by a template's non-literal expression, read from a property, bound by an import from another module (a re-export
 * included), or expanded by the shell from a variable - or whose program position a template's non-literal expression opens
 * (`${prefix} rf ...`, its leading piece read as that expression) or a shell parameter expansion fills, its default value
 * included (`${RF_BIN:-rf} ...`, the word read as the expansion) is invisible to A2, A3, B6 and C5, and each scan pins one quiet
 * control per member, each staying 0 (A2 and A3: `composed` the call, composedConcat, composedTemplate, composedProperty,
 * composedImport, and A2's shell-reading members composedSpan, composedAfterSpan, composedShellVar and composedShellDefault,
 * wb-3l7x; B6 and C5: `composed` the concatenation, composedCall, composedTemplate, composedProperty, composedImport); R-WRAPPED
 * an rf launch whose program is a wrapper (a shell's -c line, env, or a builtin or keyword that runs its arguments: exec,
 * command, time) or a later or nested command of a shell line (`cd /w && rf ...`, inside a subshell too, or a command
 * substitution) is not an A2 site - except a later command whose every earlier word reads as NAME=value, which the kept landed
 * reading takes (`x=1; rf ...`, control landedChained) - so its module is no A3 launch module (A3's verb scan still reads its
 * literals; quiet controls wrappedShell, wrappedEnv, wrappedExec, wrappedCommand, wrappedTime, chained, chainedSubshell and
 * nested stay 0); R-BOUND a literal that reaches an rf launch argument other than as the argument itself or a plain name's const,
 * let or var initializer - through a destructuring pattern (an object or an array), a parameter (its default value included), an
 * assignment after the declaration, a loop binding, a spread argument list or a template tag (String.raw) - is not read by A2, so
 * its call is no A2 site and its module no A3 launch module (wb-3l7x PREP F2; quiet controls boundObject, boundArray,
 * boundParameter, boundAssigned, boundLoop, boundSpread and boundTagged stay 0); R-UNLISTED a
 * port outside the listed network globals, network modules and child_process launchers (a worker, a native addon,
 * process.binding) is not read by B6 (its `unlisted`, `worker` and `addon` controls stay quiet); R-LOADER an edge loaded through
 * a runtime-bound loader (a createRequire result, module.require) is neither followed nor refused by B6 (its edge controls
 * aliasedLoader and moduleRequire stay followed [] and refused 0); R-VOCABULARY a freshness claim worded outside FRESH_LABELS (a synonym the
 * list does not hold, such as "just rendered") is seen by neither C4 nor C5 (C5's `outside` control stays 0);
 * R-NODE-FRESHNESS the workbench projection gives every refreshed node its freshness from the provider connection state, never
 * from rf's row freshness, and the inspector displays it (src/ui/workflow-inspector.ts), so a live render holding a reused row
 * reaches the projection at the same freshness as a clean one, its reuse carried by completeness partial and the adapter's note
 * (quiet row C6; no replay output reaches the projection at all: C1, C2).
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal, and the whole judged set - every row's id, label
 * and pins, every pin's witness, the code, metadata keys, exit and gating artifact, and every registered test title - is held to
 * the out-of-file roster, whose measured envelopes anchor the code and the field set outside this file. The last case walks the
 * vitest task tree: every judged pin registers once, runs in run mode, is not inverted and reaches its witness.
 * SCOPE: the code, the shapes and the exit are producer facts at the installed rf; Pi vendors no rf schema, so a producer-side
 * change is seen only when a fixture re-measure re-reads them. Related and landed: wb-a9l2.4 (the RF_REPLAY_SOURCE_SNAPSHOT_MISSING
 * echo census) and wb-973.9 (the replayed-row demotion); the surfaces they share with this bead are re-measured here against this
 * bead's own fixture, never imported.
 *
 * Display paths added: none. Test-only: the stand-in rf and the B6 walk plant live in makeScratch scratch; src is only read.
 */
import { chmodSync, type Dirent, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import { ObservationProjection } from "../src/workbench/observation.js";
import { REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, registerReactiveFiberRender } from "../src/workbench/providers/reactivefiber.js";
import {
  type ReactiveFiberProjectionTopology,
  type ReactiveFiberTopologyContext,
  reactivefiberTopology,
} from "../src/workbench/reactivefiber-observer.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

installScratchLeakGuard(afterAll);

type JsonObject = { [key: string]: JsonValue };

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-replay-history-roster.json");
const ROOT = process.cwd();
/** The root the roster's measured envelopes name: the measuring seat's scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
/** The permission every rf render descriptor declares; A1 selects the served rf roster by it, never by an id prefix. */
const RENDER_PERMISSION = "reactivefiber:render";
const GRANTS = [RENDER_PERMISSION];

/** The refusal the statement names, the registry row's metadata_keys and its exit (_EXIT_NOT_REPLAYABLE). */
const RECONSTRUCTION_UNAVAILABLE = "RF_REPLAY_RECONSTRUCTION_UNAVAILABLE";
const METADATA_KEYS = ["source_id"];
const REPLAY_EXIT = 8;
/** The gating artifact of the federation-receipt replay arm (the statement's FW-CFRR-04c). */
const GATING_ARTIFACTS = ["rfc-bak67.12"];
const REPLAY_COMMAND = "context.replay";
/** An rf replay verb in one string: "context replay", "context.replay", "context-replay" or "context_replay". */
const REPLAY_VERB = /\bcontext[\s._-]+replay\b/i;
/** The replay word itself: an argv word, or a literal anywhere in an rf launch module (A3). */
const REPLAY_WORD = /\breplay\b/i;
/** The freshness labels no Pi surface may give rf output (acceptance (b): "no fresh/current label"): the fresh and current
 * families, latest and newest, live, up to date or to the minute, real time, the now phrases (as of, right and just now) and most
 * recent. A claim worded outside the list is R-VOCABULARY. */
const FRESH_LABELS =
  /\b(?:fresh(?:er|est|ly)?|current|currently|latest|newest|live|up[\s_-]?to[\s_-]?date|up[\s_-]?to[\s_-]?the[\s_-]?(?:minute|moment|second)|real[\s_-]?time|as[\s_-]+of[\s_-]+now|(?:right|just)[\s_-]+now|most[\s_-]+recent(?:ly)?)\b/i;
/** The program an rf launch names: "rf" itself, or a path ending in it. */
const RF_PROGRAM = /(?:^|[\\/])rf(?:\.exe|\.cmd)?$/;
/** A leading NAME=value environment assignment of a shell-command line; A2 reads the program after any of them. */
const ENV_ASSIGNMENT = /^[A-Za-z_][A-Za-z0-9_]*=/;
/** A shell operator at the start of a text: a control operator or a redirection, its io number included (wb-3l7x F2). */
const SHELL_OPERATOR = /^(?:&&|\|\||;;|&>>|&>|\d*(?:<<-|<<<|<<|<>|<&|>&|>>|>\||<|>)|[()&|;])/;
/** A redirection operator of a command prefix; the token after it is its target, never the program. */
const SHELL_REDIRECTION = /^(?:&>>|&>|\d*(?:<<-|<<<|<<|<>|<&|>&|>>|>\||<|>))$/;
/** What opens a command position before a shell line's first program: a subshell or a group, a negation, and the reserved words
 * whose condition is a command list. A wrapper that runs its arguments (env, exec, command, time) is R-WRAPPED. */
const SHELL_OPENERS: ReadonlySet<string> = new Set(["(", "{", "!", "if", "while", "until"]);
/** The characters that end an unquoted shell word: whitespace and the operator characters. */
const SHELL_BREAK = /[\s()&|;<>]/;
/** The ports a network contact would need; none may appear in the reader closure (B6). */
const NETWORK_GLOBALS = ["fetch", "WebSocket", "EventSource", "XMLHttpRequest"];
const NETWORK_MODULE = /^(?:node:)?(?:net|http|https|http2|dns|tls|dgram)$|^(?:undici|ws)$/;
const CHILD_PROCESS = /^(?:node:)?child_process$/;
const LAUNCHERS = ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"];
/** The reader modules: the provider and its adapter. B6 walks their src import closure; C5 reads their literals. */
const READER_MODULES = ["src/workbench/providers/reactivefiber.ts", "src/workbench/reactivefiber-observer.ts"];
/** Each floor sits below the count measured at base e8850da (src 115 .ts modules, reader closure 7), so an emptied or misdirected
 * walk reds and an additive change does not. */
const SRC_FLOOR = 100;
const CLOSURE_FLOOR = 6;

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(c) a hermetic guard pins that no Pi argv names rf context replay today: every served input arm spawns one context render argv, src holds one rf launch site, and no src literal spells an rf replay verb",
    pins: ["A1", "A2", "A3"],
  },
  {
    id: "B",
    label: "(a) on RF_REPLAY_RECONSTRUCTION_UNAVAILABLE (exit 8) Pi reports replay unavailable, the producer's metadata.source_id rides the registered reading verbatim (withheld from the typed refusal and the projection: R-WITHHELD), and no fallback owner read is presented as the replay output",
    pins: ["B1", "B2", "B3", "B4", "B5", "B6"],
  },
  {
    id: "C",
    label: "(b) Pi presents no rf replay output as a fresh owner read: both readers refuse it, the registered reading carries it and its identities byte for byte, and the rf reader adapter mints no fresh/current label (the projection's connection-derived node freshness is R-NODE-FRESHNESS; labelling replay output historical and naming its receipt wait for rfc-bak67.12)",
    pins: ["C1", "C2", "C3", "C4", "C5", "C6"],
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
  readonly rfVersion: string;
  readonly replayExit: number;
  readonly code: string;
  readonly metadataKeys: readonly string[];
  readonly gatingArtifacts: readonly string[];
  readonly envelopes: { readonly refusal: Envelope; readonly replay: Envelope };
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
/** A deep copy through JSON: nothing in it is shared with the value it was made from. */
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

/** Parses the roster from disk, refusing any field of the wrong shape by name; each call is a fresh read. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(ROSTER_PATH, "utf8"));
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes)) throw new Error("roster must be an object with rows and envelopes");
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
  if (typeof raw.rfVersion !== "string" || typeof raw.replayExit !== "number" || typeof raw.code !== "string") throw new Error("roster needs rfVersion, replayExit and code");
  return {
    rfVersion: raw.rfVersion,
    replayExit: raw.replayExit,
    code: raw.code,
    metadataKeys: strings(raw.metadataKeys, "metadataKeys"),
    gatingArtifacts: strings(raw.gatingArtifacts, "gatingArtifacts"),
    envelopes: { refusal: envelopeOf(raw.envelopes.refusal, "refusal"), replay: envelopeOf(raw.envelopes.replay, "replay") },
    rows,
    tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const { refusal: REFUSAL, replay: REPLAY } = ROSTER.envelopes;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The primary diagnostic of an envelope, its metadata and its code. */
function primaryOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.diagnostics[0], `${envelope.operation_id} diagnostics[0]`);
}
function metadataOf(envelope: Envelope): JsonObject {
  return objectOf(primaryOf(envelope).metadata, `${envelope.operation_id} metadata`);
}
function codeOf(envelope: Envelope): string {
  return String(primaryOf(envelope).code);
}
/** Every string a JSON value holds, keys excluded. */
function stringLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (isObject(value)) return Object.values(value).flatMap(stringLeaves);
  return [];
}
/** What R-WITHHELD keeps off the typed refusal and the projection: every metadata value, the message and the hint. */
function withheldTexts(envelope: Envelope): string[] {
  const primary = primaryOf(envelope);
  return [...stringLeaves(metadataOf(envelope)), String(primary.message), String(primary.hint)];
}
/** The constructed render-command refusal: the measured diagnostics and the measured workspace on a context.render failure
 * envelope (the render plane never emits a replay code, so no measured render refusal carries it). */
function renderRefusal(envelope: Envelope): JsonObject {
  return {
    schema: envelope.schema, ok: false, command: "context.render", operation_id: envelope.operation_id,
    workspace: { id: envelope.workspace.id, root: envelope.workspace.root }, transaction_id: null, result: null,
    diagnostics: envelope.diagnostics.map(json),
  };
}
/** The same refusal with every diagnostic's metadata values, message and hint replaced by sentinels (B4's invariance pair). */
function sentinelRefusal(envelope: Envelope): JsonObject {
  const diagnostics = envelope.diagnostics.map((item, index): JsonValue => {
    const entry = objectOf(item, `diagnostics[${index}]`);
    const metadata = objectOf(entry.metadata, `diagnostics[${index}].metadata`);
    const replaced: JsonObject = {};
    for (const key of Object.keys(metadata)) replaced[key] = `sentinel ${key}`;
    return { ...entry, message: "sentinel message", hint: "sentinel hint", metadata: replaced };
  });
  return { ...renderRefusal(envelope), diagnostics };
}
/** A live full-shape render (fullShapeRf) whose result.observations holds the given rows. */
function renderWithObservations(rows: JsonValue[]): JsonObject {
  const envelope = json(fullShapeRf(ROOT));
  const object = objectOf(envelope, "the full-shape render");
  return { ...object, result: { ...objectOf(object.result, "the full-shape result"), observations: rows } };
}

/** Every regular .ts file below src (symlinks are not followed). */
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
function srcModules(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).sort();
}
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}
function sourceOf(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}
/** A module's const string bindings: every `const NAME = "literal"` declaration, at any depth. */
function constStrings(source: ts.SourceFile): Map<string, string> {
  const bindings = new Map<string, string>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isStringLiteralLike(node.initializer) &&
      ts.isVariableDeclarationList(node.parent) && (node.parent.flags & ts.NodeFlags.Const) !== 0) bindings.set(node.name.text, node.initializer.text);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return bindings;
}
/** The literal an expression spells: a string or no-substitution template literal, or an identifier a const binds to one. */
function literalOf(node: ts.Node | undefined, bindings: ReadonlyMap<string, string>): string | null {
  if (node === undefined) return null;
  if (ts.isStringLiteralLike(node)) return node.text;
  if (ts.isIdentifier(node)) return bindings.get(node.text) ?? null;
  return null;
}
/** A template's text with each literal (or module-local const) span folded in. An unreadable span ends the text when `gap` is null
 * (A2 reads a template's leading text only) and reads as `gap` otherwise (A3 and C5 read on past it). */
function templateText(node: ts.TemplateExpression, bindings: ReadonlyMap<string, string>, gap: string | null): string {
  let text = node.head.text;
  for (const span of node.templateSpans) {
    const piece = literalOf(span.expression, bindings) ?? gap;
    if (piece === null) return text;
    text += piece + span.literal.text;
  }
  return text;
}
/** A module's binding initializers by name: every `const`, `let` or `var NAME = <expression>` declaration, at any depth (A2 reads a
 * launch argument's binding through them: wb-3l7x F1 for a const, its PREP F2 for a let or var; a later assignment is R-BOUND). */
function bindingInitializers(source: ts.SourceFile): Map<string, ts.Expression[]> {
  const initializers = new Map<string, ts.Expression[]>();
  const visit = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer !== undefined && ts.isVariableDeclarationList(node.parent)) {
      initializers.set(node.name.text, [...(initializers.get(node.name.text) ?? []), node.initializer]);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return initializers;
}
/** One reading of an rf launch argument: its text, and whether that text is the argument's whole value or only its leading piece
 * (a concatenation's left operand, or a template cut at a span that does not read whole). */
interface LaunchReading {
  readonly text: string;
  readonly whole: boolean;
}
/** Every reading an rf launch argument can take (A2): the argument itself or a module-local const, let or var read through its
 * initializer (wb-3l7x F1 and its PREP F2: every declaration of the name, a cycle reading nothing), through parentheses, a type
 * assertion or a non-null mark, either operand of ?? and ||, either branch of a conditional, the leftmost literal piece of a
 * concatenation and a template's leading text, each span folded while it reads whole, so a shell line composed after its first
 * word (`"rf context show " + id`) still names its program. */
function launchReadingsOf(node: ts.Expression | undefined, initializers: ReadonlyMap<string, readonly ts.Expression[]>, resolving: ReadonlySet<string> = new Set()): LaunchReading[] {
  if (node === undefined) return [];
  if (ts.isStringLiteralLike(node)) return [{ text: node.text, whole: true }];
  if (ts.isIdentifier(node)) {
    if (resolving.has(node.text)) return [];
    const inner = new Set([...resolving, node.text]);
    return (initializers.get(node.text) ?? []).flatMap(initializer => launchReadingsOf(initializer, initializers, inner));
  }
  const read = (expression: ts.Expression): LaunchReading[] => launchReadingsOf(expression, initializers, resolving);
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) {
    return read(node.expression);
  }
  if (ts.isConditionalExpression(node)) return [...read(node.whenTrue), ...read(node.whenFalse)];
  if (ts.isBinaryExpression(node)) {
    const operator = node.operatorToken.kind;
    if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken) return [...read(node.left), ...read(node.right)];
    if (operator === ts.SyntaxKind.PlusToken) return read(node.left).map(reading => ({ text: reading.text, whole: false }));
  }
  if (ts.isTemplateExpression(node)) {
    let readings: LaunchReading[] = [{ text: node.head.text, whole: true }];
    for (const span of node.templateSpans) {
      const pieces = read(span.expression);
      readings = readings.flatMap((reading): LaunchReading[] => {
        if (!reading.whole) return [reading];
        if (pieces.length === 0) return [{ text: reading.text, whole: false }];
        return pieces.map(piece => (piece.whole ? { text: reading.text + piece.text + span.literal.text, whole: true } : { text: reading.text + piece.text, whole: false }));
      });
    }
    return readings;
  }
  return [];
}
/** The index just past the shell expansion that opens at `at` - a command substitution $(...), an arithmetic expansion $((...)), a
 * parameter expansion ${...} or a backquoted command - or `at` itself when none opens there (wb-3l7x U1: the expansion stays inside
 * the word it sits in, so `RF_HOME=$(pwd) rf ...` assigns before its program). Inside $(...) and ${...} a nested pair of its own
 * brackets, a quoted string (quotedEnd) and a backslash escape never close it; a backquoted command ends at its next backquote that
 * no backslash escapes (wb-kls1, the wb-3l7x gate's F4: an env value holding a backquoted command with an escaped backquote inside,
 * the gate's G22-O08, still prefixes its program); an unclosed expansion runs to the end of the text. */
function expansionEnd(text: string, at: number): number {
  if (text.charAt(at) === "`") {
    let end = at + 1;
    while (end < text.length && text.charAt(end) !== "`") end += text.charAt(end) === "\\" ? 2 : 1;
    return Math.min(end + 1, text.length);
  }
  const open = text.charAt(at + 1);
  if (text.charAt(at) !== "$" || (open !== "(" && open !== "{")) return at;
  const close = open === "(" ? ")" : "}";
  let depth = 1;
  let end = at + 2;
  while (end < text.length && depth > 0) {
    const char = text.charAt(end);
    if (char === "'" || char === '"') {
      end = quotedEnd(text, end);
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) depth -= 1;
    end += char === "\\" ? 2 : 1;
  }
  return Math.min(end, text.length);
}
/** The index just past the quoted string that opens at `at`: a single-quoted string ends at its next single quote, a double-quoted
 * one at its next double quote that no backslash escapes; an unclosed quote runs to the end of the text. */
function quotedEnd(text: string, at: number): number {
  const quote = text.charAt(at);
  let end = at + 1;
  while (end < text.length && text.charAt(end) !== quote) end += quote === '"' && text.charAt(end) === "\\" ? 2 : 1;
  return Math.min(end + 1, text.length);
}
interface ShellToken {
  readonly raw: string;
  readonly value: string;
  readonly operator: boolean;
}
/** A shell line's tokens with its quoting removed (wb-3l7x F2): single quotes, double quotes (inside them a backslash escapes $, `,
 * ", \ and a newline), their $-prefixed forms ($'...' and $"...") and a backslash outside them (a backslash-newline joins the
 * lines); every unquoted operator is a token of its own and ends the word before it, and a # that starts a word comments out the
 * rest of its line. An expansion (expansionEnd), quoted or not, is kept verbatim inside its word (wb-3l7x U1). */
function shellTokens(text: string): ShellToken[] {
  const tokens: ShellToken[] = [];
  let at = 0;
  while (at < text.length) {
    const char = text.charAt(at);
    if (/\s/.test(char)) {
      at += 1;
      continue;
    }
    if (char === "#") {
      const end = text.indexOf("\n", at);
      at = end < 0 ? text.length : end;
      continue;
    }
    const operator = SHELL_OPERATOR.exec(text.slice(at));
    if (operator !== null) {
      tokens.push({ raw: operator[0], value: operator[0], operator: true });
      at += operator[0].length;
      continue;
    }
    let raw = "";
    let value = "";
    while (at < text.length && !SHELL_BREAK.test(text.charAt(at))) {
      const next = text.charAt(at);
      const expansion = expansionEnd(text, at);
      if (expansion > at) {
        raw += text.slice(at, expansion);
        value += text.slice(at, expansion);
        at = expansion;
      } else if (next === "\\") {
        const escaped = text.charAt(at + 1);
        raw += next + escaped;
        if (escaped !== "\n") value += escaped;
        at += 2;
      } else if (next === "$" && (text.charAt(at + 1) === "'" || text.charAt(at + 1) === '"')) {
        raw += next;
        at += 1;
      } else if (next === "'") {
        const end = text.indexOf("'", at + 1);
        const close = end < 0 ? text.length : end;
        raw += text.slice(at, close + 1);
        value += text.slice(at + 1, close);
        at = close + 1;
      } else if (next === '"') {
        raw += next;
        at += 1;
        while (at < text.length && text.charAt(at) !== '"') {
          const inner = text.charAt(at);
          const escaped = text.charAt(at + 1);
          const nested = expansionEnd(text, at);
          if (nested > at) {
            raw += text.slice(at, nested);
            value += text.slice(at, nested);
            at = nested;
          } else if (inner === "\\" && /[$`"\\\n]/.test(escaped)) {
            raw += inner + escaped;
            if (escaped !== "\n") value += escaped;
            at += 2;
          } else {
            raw += inner;
            value += inner;
            at += 1;
          }
        }
        raw += text.charAt(at);
        at += 1;
      } else {
        raw += next;
        value += next;
        at += 1;
      }
    }
    tokens.push({ raw, value, operator: false });
  }
  return tokens;
}
/** The program word of a shell line's first simple command (wb-3l7x F2): past every opener (SHELL_OPENERS) and command prefix (a
 * NAME=value assignment, its value quoted, substituted or expanded or not, or a redirection and its target), the next word's token
 * (its raw text and its value with the quoting removed); null when an operator ends the command first. */
function shellProgramOf(text: string): ShellToken | null {
  const tokens = shellTokens(text);
  let at = 0;
  while (at < tokens.length) {
    const token = tokens[at];
    if (token === undefined) break;
    at += 1;
    if (SHELL_OPENERS.has(token.raw) || (!token.operator && ENV_ASSIGNMENT.test(token.raw))) continue;
    if (!token.operator) return token;
    if (!SHELL_REDIRECTION.test(token.raw)) return null;
    at += 1;
  }
  return null;
}
/** The programs a launch text can name: the text whole (a bare name or a path) and the program word of its first simple command
 * read as a shell-command line (shellProgramOf), with its quoting removed and raw, so a backslash path separator stays (wb-3l7x U1:
 * `C:\tools\rf.exe`, `.\rf`). */
function programsOf(text: string): string[] {
  const program = shellProgramOf(text);
  return program === null ? [text] : [text, program.value, program.raw];
}
/** The landed A2 reading (landing 372), kept verbatim beside launchReadingsOf so A2 only adds kills to the landed census (wb-3l7x
 * U1): every literal text an rf launch argument reads as - the argument itself or a const bound to a literal, through parentheses,
 * a type assertion or a non-null mark, either operand of ?? and ||, either branch of a conditional, a concatenation's left operand
 * and a template's text up to its first span that is no literal (templateText). */
function launchTextsOf(node: ts.Expression | undefined, bindings: ReadonlyMap<string, string>): string[] {
  if (node === undefined) return [];
  const literal = literalOf(node, bindings);
  if (literal !== null) return [literal];
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node)) {
    return launchTextsOf(node.expression, bindings);
  }
  if (ts.isConditionalExpression(node)) return [...launchTextsOf(node.whenTrue, bindings), ...launchTextsOf(node.whenFalse, bindings)];
  if (ts.isBinaryExpression(node)) {
    const operator = node.operatorToken.kind;
    if (operator === ts.SyntaxKind.QuestionQuestionToken || operator === ts.SyntaxKind.BarBarToken) return [...launchTextsOf(node.left, bindings), ...launchTextsOf(node.right, bindings)];
    if (operator === ts.SyntaxKind.PlusToken) return launchTextsOf(node.left, bindings);
  }
  if (ts.isTemplateExpression(node)) return [templateText(node, bindings, null)];
  return [];
}
/** The landed reading's programs of a launch text (landing 372's programsOf, kept verbatim): the text whole and its first
 * whitespace word that is no NAME=value assignment. */
function firstWordsOf(text: string): string[] {
  const first = text.trim().split(/\s+/).find(word => !ENV_ASSIGNMENT.test(word));
  return first === undefined ? [text] : [text, first];
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
let fetches = 0;
afterEach(() => {
  process.env.PATH = oldPath;
  vi.unstubAllGlobals();
  removeScratch(...scratches.splice(0));
});

/** The counting fake producer port: a fail-closed globalThis.fetch that counts every call and answers none. */
function countFetches(): void {
  fetches = 0;
  vi.stubGlobal("fetch", (): Promise<never> => {
    fetches += 1;
    return Promise.reject(new Error("the fake producer port answers no call"));
  });
}

/**
 * A stand-in `rf` first on PATH. It appends one JSON argv line per spawn to the returned log; its first spawn prints `first` and
 * exits `exit`, and any later spawn prints `later` (when given, else `first`) and exits 0.
 */
function standInRf(first: JsonValue, exit: number, later?: JsonValue): string {
  const folder = makeScratch("rf-replay-history-");
  scratches.push(folder);
  const log = join(folder, "spawns.jsonl");
  const script = join(folder, "rf");
  const answers = JSON.stringify({ first, exit, later: later ?? first });
  writeFileSync(
    script,
    [
      "#!/usr/bin/env node",
      'const fs = require("node:fs");',
      `const log = ${JSON.stringify(log)};`,
      'const seen = fs.existsSync(log) ? fs.readFileSync(log, "utf8").split("\\n").filter(Boolean).length : 0;',
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

/** A registry composed the way production composes it: every native provider, the rf preview among them. */
async function servedRegistry(): Promise<CapabilityRegistry> {
  const native = await loadWorkbenchNative();
  const registry = new CapabilityRegistry();
  native.registerNativeProviders(registry, ROOT);
  return registry;
}

interface NativeOutcome {
  readonly refusal: { category: string; message: string } | null;
  readonly reading: JsonValue | null;
  readonly spawns: string[][];
}
/** One served invocation of the preview's legacy arm against the stand-in rf. */
async function nativeOutcome(first: JsonValue, exit: number, later?: JsonValue): Promise<NativeOutcome> {
  countFetches();
  const log = standInRf(first, exit, later);
  const registry = await servedRegistry();
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
async function injectedReading(envelope: JsonValue): Promise<{ reading: JsonValue; calls: number }> {
  countFetches();
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return envelope as unknown as Envelope;
  }, ROOT);
  const reading = await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext());
  return { reading, calls };
}

/** A registered reading of a deep copy of a roster envelope, held to a FRESH roster read: byte for byte, key order included, the
 * reading adding only its own contract and workspaceRoot; the injected reader called once and fetch 0. */
async function verbatimReading(name: "refusal" | "replay"): Promise<{ source: JsonObject; readingKeys: string[]; calls: number }> {
  const { reading, calls } = await injectedReading(json(ROSTER.envelopes[name]));
  const fresh = readRoster().envelopes[name];
  expect(reading).toStrictEqual({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: ROOT, source: json(fresh) });
  const source = objectOf(objectOf(reading, "reading").source, "reading source");
  expect(JSON.stringify(source)).toBe(JSON.stringify(fresh));
  expect(calls).toBe(1);
  expect(fetches).toBe(0);
  return { source, readingKeys: Object.keys(objectOf(reading, "reading")).sort(), calls };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
const LIVE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: ROOT, principal: "local-operator:tester" }, seam: "rf-cli",
  capturedAt: "2026-10-22T00:00:00Z", observedAt: "2026-10-22T00:00:01Z",
};
function readingAt(workspaceRoot: string, source: JsonValue): JsonValue {
  return { contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot, source };
}
/** The strings a projection displays: every snapshot's title, status text and evidence references, and the notes. */
function displayStrings(topology: ReactiveFiberProjectionTopology): string[] {
  return [
    ...topology.snapshots.flatMap(snapshot => [snapshot.node.title, snapshot.node.statusText, ...(snapshot.evidenceRefs ?? [])]),
    ...topology.diagnostics,
  ];
}
/** The served preview's reading of a live render holding `rows`, projected by the reader adapter at the rf-cli seam. */
async function liveProjection(rows: JsonValue[]): Promise<ReactiveFiberProjectionTopology> {
  const outcome = await nativeOutcome(renderWithObservations(rows), 0);
  expect(outcome.refusal).toBeNull();
  expect(outcome.spawns).toHaveLength(1);
  return reactivefiberTopology(outcome.reading, LIVE_CONTEXT);
}

/** The required keys of each oneOf arm of an input schema, in order. */
function armsOf(schema: unknown): string[][] {
  if (!isObject(schema) || !Array.isArray(schema.oneOf)) return [];
  return schema.oneOf.map((arm: unknown) => (isObject(arm) && Array.isArray(arm.required) ? arm.required.map(String) : []));
}

/** One module's rf launch sites: every call or construction whose first argument reads as a literal (launchReadingsOf) naming the
 * rf program whole or as the program word of a shell-command line's first simple command (programsOf), or as the landed reading
 * reads it (launchTextsOf and firstWordsOf, wb-3l7x U1). */
function rfLaunchSites(fileName: string, text: string): string[] {
  const source = sourceOf(fileName, text);
  const bindings = constStrings(source);
  const initializers = bindingInitializers(source);
  const sites: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) || ts.isNewExpression(node)) {
      const first = node.arguments?.[0];
      const programs = [...launchReadingsOf(first, initializers).flatMap(reading => programsOf(reading.text)), ...launchTextsOf(first, bindings).flatMap(firstWordsOf)];
      if (programs.some(program => RF_PROGRAM.test(program))) sites.push(`${fileName}: ${node.expression.getText(source)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return sites;
}

interface ReplayScan {
  readonly argv: string[];
  readonly literals: string[];
  readonly words: string[];
  readonly renderArgv: number;
}
/** One module's rf replay spellings: an array literal or argument list with "context" before "replay" (any words between, a const
 * resolved), a string or template literal spelling an rf replay verb, and - in an rf launch module - any literal spelling the word
 * replay. */
function scanReplay(fileName: string, text: string, launchModule: boolean): ReplayScan {
  const source = sourceOf(fileName, text);
  const bindings = constStrings(source);
  const argv: string[] = [];
  const literals: string[] = [];
  const words: string[] = [];
  let renderArgv = 0;
  const sequence = (items: readonly ts.Expression[]): void => {
    const texts = items.map(item => literalOf(item, bindings));
    const context = texts.indexOf("context");
    if (context < 0) return;
    const later = texts.slice(context + 1);
    if (later.some(word => word !== null && word.toLowerCase() === "replay")) argv.push(`${fileName}: [${texts.filter(item => item !== null).join(", ")}]`);
    else if (later[0] === "render") renderArgv += 1;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isArrayLiteralExpression(node)) sequence(node.elements);
    if (ts.isCallExpression(node)) sequence(node.arguments);
    if (ts.isStringLiteralLike(node)) {
      if (REPLAY_VERB.test(node.text)) literals.push(`${fileName}: ${node.text}`);
      if (launchModule && REPLAY_WORD.test(node.text)) words.push(`${fileName}: ${node.text}`);
    }
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (REPLAY_VERB.test(parts.join(" ")) || REPLAY_VERB.test(templateText(node, bindings, " "))) literals.push(`${fileName}: ${parts.join("<expr>")}`);
      if (launchModule && parts.some(part => REPLAY_WORD.test(part))) words.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { argv, literals, words, renderArgv };
}

interface PortScan {
  readonly names: string[];
  readonly modules: string[];
  readonly launches: string[];
  readonly local: string[];
  readonly opaque: string[];
}
/** True for a module load spelled as a call: `import(...)` or `require(...)`. */
function isLoader(call: ts.CallExpression): boolean {
  return call.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(call.expression) && call.expression.text === "require");
}
/** True for `require("node:child_process")` and `[await] import("node:child_process")`. */
function loadsChildProcess(node: ts.Expression): boolean {
  const call = ts.isAwaitExpression(node) ? node.expression : node;
  if (!ts.isCallExpression(call)) return false;
  const first = call.arguments[0];
  return isLoader(call) && first !== undefined && ts.isStringLiteralLike(first) && CHILD_PROCESS.test(first.text);
}
/** One module's ports: every identifier (a property name included) or exact string literal naming a network global, every exact
 * string literal naming a network module, the program of every child_process launcher call however the launcher is bound (named,
 * aliased, namespace, default or required; "<composed>" when the program is not a literal), its relative edges (static import
 * and export declarations, import() and require() calls whose specifier is a literal or a module-local const, import-equals) and
 * its opaque loads (an import() or require() whose specifier no literal spells; B6 refuses them). */
function scanPorts(fileName: string, text: string): PortScan {
  const source = sourceOf(fileName, text);
  const names: string[] = [];
  const modules: string[] = [];
  const launches: string[] = [];
  const local: string[] = [];
  const opaque: string[] = [];
  const bound = new Map<string, string>();
  const spaces = new Set<string>();
  const bindings = constStrings(source);
  const bind = (node: ts.Node): void => {
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression) &&
      CHILD_PROCESS.test(node.moduleReference.expression.text)) spaces.add(node.name.text);
    if (ts.isImportDeclaration(node) && ts.isStringLiteralLike(node.moduleSpecifier) && CHILD_PROCESS.test(node.moduleSpecifier.text)) {
      const clause = node.importClause;
      if (clause?.name !== undefined) spaces.add(clause.name.text);
      const named = clause?.namedBindings;
      if (named !== undefined && ts.isNamespaceImport(named)) spaces.add(named.name.text);
      if (named !== undefined && ts.isNamedImports(named)) for (const element of named.elements) bound.set(element.name.text, (element.propertyName ?? element.name).text);
    }
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined && loadsChildProcess(node.initializer)) {
      if (ts.isIdentifier(node.name)) spaces.add(node.name.text);
      if (ts.isObjectBindingPattern(node.name)) {
        for (const element of node.name.elements) {
          if (!ts.isIdentifier(element.name)) continue;
          const property = element.propertyName !== undefined && ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.name.text;
          bound.set(element.name.text, property);
        }
      }
    }
    ts.forEachChild(node, bind);
  };
  bind(source);
  const launcherOf = (callee: ts.Expression): string | undefined => {
    if (ts.isIdentifier(callee)) {
      const name = bound.get(callee.text) ?? callee.text;
      return LAUNCHERS.includes(name) ? name : undefined;
    }
    if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression) && spaces.has(callee.expression.text)) {
      return LAUNCHERS.includes(callee.name.text) ? callee.name.text : undefined;
    }
    return undefined;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && NETWORK_GLOBALS.includes(node.text)) names.push(`${fileName}: ${node.text}`);
    if (ts.isStringLiteralLike(node)) {
      if (NETWORK_GLOBALS.includes(node.text)) names.push(`${fileName}: "${node.text}"`);
      if (NETWORK_MODULE.test(node.text)) modules.push(`${fileName}: ${node.text}`);
      if (node.text.startsWith(".") && (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent))) local.push(node.text);
    }
    if (ts.isCallExpression(node) && launcherOf(node.expression) !== undefined) launches.push(literalOf(node.arguments[0], bindings) ?? "<composed>");
    if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference) && ts.isStringLiteralLike(node.moduleReference.expression) &&
      node.moduleReference.expression.text.startsWith(".")) local.push(node.moduleReference.expression.text);
    if (ts.isCallExpression(node) && isLoader(node)) {
      const specifier = literalOf(node.arguments[0], bindings);
      if (specifier === null) opaque.push(`${fileName}: ${node.getText(source)}`);
      else if (specifier.startsWith(".")) local.push(specifier);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { names, modules, launches, local, opaque };
}

/** The transitive import closure of `entries` below `root` (by default the reader modules of this repository's src), each module's
 * ports and opaque loads merged. */
function readerClosure(root: string = REPO, entries: readonly string[] = READER_MODULES): { modules: string[]; unresolved: string[]; ports: PortScan } {
  const seen = new Set<string>();
  const unresolved: string[] = [];
  const merged: PortScan = { names: [], modules: [], launches: [], local: [], opaque: [] };
  const queue = entries.map(module => join(root, module));
  while (queue.length > 0) {
    const file = queue.shift();
    if (file === undefined || seen.has(file)) continue;
    seen.add(file);
    const scan = scanPorts(relative(root, file), textOf(file));
    merged.names.push(...scan.names);
    merged.modules.push(...scan.modules);
    merged.launches.push(...scan.launches);
    merged.opaque.push(...scan.opaque);
    for (const specifier of scan.local) {
      const target = join(dirname(file), specifier.replace(/\.js$/, ".ts"));
      if (existsSync(target)) queue.push(target);
      else unresolved.push(`${relative(root, file)}: ${specifier}`);
    }
  }
  return { modules: [...seen].map(file => relative(root, file)).sort(), unresolved, ports: merged };
}

/** One module's freshness labels: a string or template literal spelling one (a template read with its literal and const spans
 * folded in). */
function scanLabels(fileName: string, text: string): string[] {
  const source = sourceOf(fileName, text);
  const bindings = constStrings(source);
  const hits: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node) && FRESH_LABELS.test(node.text)) hits.push(`${fileName}: ${node.text}`);
    if (ts.isTemplateExpression(node)) {
      const parts = [node.head.text, ...node.templateSpans.map(span => span.literal.text)];
      if (parts.some(part => FRESH_LABELS.test(part)) || FRESH_LABELS.test(templateText(node, bindings, " "))) hits.push(`${fileName}: ${parts.join("<expr>")}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return hits;
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  A1: async () => {
    const registry = await servedRegistry();
    const served = registry.catalogSnapshot().map(entry => entry.descriptor).filter(descriptor => descriptor.permissions.includes(RENDER_PERMISSION));
    const arms = armsOf(served[0]?.inputSchema);
    expect(served.map(descriptor => descriptor.id)).toStrictEqual([PREVIEW_ID]);
    expect(arms).toStrictEqual([["model", "task"], ["view", "taskId"]]);
    const inputs: readonly JsonObject[] = [{ model: "m", task: "t" }, { view: "v", taskId: "t" }, { view: "v", taskId: "t", model: "m" }];
    const runs: JsonValue[] = [];
    countFetches();
    for (const input of inputs) {
      const log = standInRf(json(fullShapeRf(ROOT)), 0);
      const reading = await registry.invoke(PREVIEW_ID, input, invocationContext());
      const spawns = spawnsOf(log);
      const replayWords = spawns.flat().filter(word => REPLAY_WORD.test(word)).length;
      expect(objectOf(reading, "reading").contract).toBe(REACTIVEFIBER_RENDER_PREVIEW_CONTRACT);
      expect(spawns).toHaveLength(1);
      expect(verbOf(spawns)).toStrictEqual(["context", "render"]);
      expect(spawns[0]).toContain("--no-commit");
      expect(replayWords).toBe(0);
      expect(spawns.filter(spawned => REPLAY_VERB.test(spawned.join(" ")))).toEqual([]);
      runs.push({ input: Object.keys(input), spawns: spawns.length, verb: verbOf(spawns), noCommit: spawns[0]?.includes("--no-commit") ?? false, replayWords });
    }
    expect(fetches).toBe(0);
    return { served: served.map(descriptor => descriptor.id), arms, runs, fetches };
  },
  A2: async () => {
    const files = srcModules();
    const sites = files.flatMap(file => rfLaunchSites(relative(REPO, file), textOf(file)));
    const srcFloorMet = files.length >= SRC_FLOOR;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(sites, "an rf launch beyond the preview's waits for rfc-bak67.12").toStrictEqual(["src/workbench/providers/reactivefiber.ts: spawn"]);
    const control = (text: string): number => rfLaunchSites("control.ts", text).length;
    const controls = {
      bare: control('spawn("rf", ["context", "replay"]);'),
      aliased: control('import { spawn as run } from "node:child_process"; run("rf", []);'),
      namespace: control('import * as cp from "node:child_process"; cp.execFile("rf", []);'),
      method: control('await pi.exec("rf", ["context", "replay"]);'),
      template: control("spawn(`rf`, []);"),
      path: control('execFileSync("/usr/local/bin/rf", []);'),
      constProgram: control('const program = "rf"; spawn(program, []);'),
      composed: control('const program = ["r", "f"].join(""); spawn(program, []);'),
      // wb-bstx F1: a shell-command line names its program first (after any NAME=value assignments), and the literal-visible
      // readings of an argument (a fallback, a conditional, an asserted literal) name it too.
      shell: control('execSync("rf --json status");'),
      shellConcat: control('exec("rf context show " + id);'),
      shellTemplate: control(["execSync(`rf --workspace $", "{root} --json status`);"].join("")),
      shellEnv: control('execSync("RF_HOME=/w rf --json status");'),
      fallback: control('spawn(process.env.RF_BIN ?? "rf", []);'),
      conditional: control('spawn(windows ? "rf.exe" : "rf", []);'),
      asserted: control('spawn(("rf" as string), []);'),
      // wb-3l7x F1: an argument bound to a module-local const is read through the const's initializer, so a const bound to a
      // template or concatenation shell line (the gate's G6-01 and G6-02 plants), a fallback, an asserted literal or another const
      // names its program as the expression passed directly does; a template span folds while it reads whole; a cycle reads nothing.
      constShellTemplate: control(["const CMD = `rf --workspace $", "{process.cwd()} --json status`; execSync(CMD);"].join("")),
      constShellConcat: control('const CMD = "rf --json status " + String(process.pid); execSync(CMD);'),
      constFallback: control('const program = process.env.RF_BIN ?? "rf"; spawn(program, []);'),
      constAsserted: control('const program = "rf" as const; spawn(program, []);'),
      constChain: control(["const BASE = `rf --workspace $", "{root}`; const CMD = BASE; execSync(CMD);"].join("")),
      constSpan: control(['const BIN = process.env.RF_BIN ?? "rf"; execSync(`$', "{BIN} --json status`);"].join("")),
      conditionalSpan: control(['execSync(`$', '{windows ? "rf.exe" : "rf"} --json status`);'].join("")),
      constCycle: control("const a = b; const b = a; spawn(a, []);"),
      // wb-3l7x F2: the shell line's first simple command is read with shell quoting removed, after any opener and command prefix
      // (the gate's G6-05, G6-06 and G6-11 plants first), and an unquoted operator ends a word.
      shellQuotedEnv: control(`execSync('RF_HOME="/a b" rf --json status');`),
      shellQuotedProgram: control(`execSync("'rf' --json status");`),
      shellSubshell: control('execSync("(rf --json status)");'),
      shellDoubleQuoted: control(`execSync('"rf" --json status');`),
      shellEscaped: control('execSync("r\\\\f --json status");'),
      shellGroup: control('execSync("{ rf --json status; }");'),
      shellNegated: control('execSync("! rf --json status");'),
      shellCondition: control('execSync("if rf --json status; then exit 0; fi");'),
      shellRedirected: control('execSync("2>/dev/null rf --json status");'),
      shellGlued: control('execSync("rf|jq .result");'),
      shellComment: control('execSync("# status\\nrf --json status");'),
      shellAnsiQuoted: control(`execSync("$'rf' --json status");`),
      // wb-3l7x U1 (the cut #1 refusal): a command or arithmetic substitution, a parameter expansion or a backquoted command stays
      // inside the word it sits in, so an env value holding one still prefixes the program (M1: the gate's G2-R1, G2-R3, G2-R10
      // and G2-R11 plants first, then its spaced, quoted, escaped, backquoted and expanded kin), and the program word is read raw
      // as well as unquoted, so a backslash path separator stays (M2: the gate's G2-R2 and G2-R6 plants, then a raw-only path).
      shellSubstituted: control('execSync("RF_HOME=$(pwd) rf --json status");'),
      shellArithmetic: control('execSync("RF_N=$((1+1)) rf --json status");'),
      shellSubstitutedTemplate: control(["execSync(`RF_ROOT=$(pwd) rf --workspace $", "{process.cwd()} --json status`);"].join("")),
      constShellSubstituted: control('const RF_CMD = "RF_HOME=$(pwd) rf --json status"; execSync(RF_CMD);'),
      shellSubstitutedSpaced: control('execSync("RF_HOME=$(pwd -P) rf --json status");'),
      shellArithmeticSpaced: control('execSync("RF_N=$(( 1 + 1 )) rf --json status");'),
      shellSubstitutedQuoted: control(`execSync("RF_HOME=$(echo \\")\\" ')' \\"\\\\\\")\\") rf --json status");`),
      shellSubstitutedEscaped: control('execSync("RF_HOME=$(echo \\\\)) rf --json status");'),
      shellQuotedSubstitution: control(`execSync('RF_HOME="$(echo "a b")" rf --json status');`),
      shellBackquoted: control('execSync("RF_HOME=`pwd -P` rf --json status");'),
      shellExpanded: control(['execSync("RF_HOME=$', '{A:-/a b} rf --json status");'].join("")),
      shellBackslashPath: control('execSync("C:\\\\tools\\\\rf.exe --json status");'),
      shellBackslashRelative: control('execSync(".\\\\rf --json status");'),
      shellRawPath: control('execSync("! .\\\\rf --json status");'),
      // wb-3l7x U1: the landed reading is kept beside the shell reading, so its kills stay: a later command after a NAME=value
      // word (`x=1; rf`, the gate's G2-R8) and a template cut at its first span that is no literal (`rf$` + `{...}`).
      landedChained: control('execSync("x=1; rf --json status");'),
      landedSpanCut: control(["spawn(`rf$", '{windows ? "x" : "y"}`, []);'].join("")),
      // wb-3l7x PREP F2: a let or var is read through its initializer as a const is (the gate's G2-L1, G2-L2 and G2-L8 plants).
      letShellLine: control('let CMD = "rf --json status"; execSync(CMD);'),
      varShellLine: control('var CMD = "rf --json status"; execSync(CMD);'),
      letCompound: control('let cmd = "rf --json"; cmd += " status"; execSync(cmd);'),
      // wb-kls1 (R694 follow-up of the wb-3l7x gate's F3): one kill control per claimed reading that no control pinned, so an
      // edit narrowing that reading reds A2; each is read by the cut #2 reading alone (launchReadingsOf and the shell reading),
      // except the construction and the .cmd program, read through what both readings share (rfLaunchSites, RF_PROGRAM). Every
      // declaration of the name at any depth (the gate's K02, K04, K54 and K55 plants first), a let read through parentheses,
      // satisfies, an angle-bracket assertion and a non-null mark (K56), either branch of a conditional (K57) and either operand
      // of || and ??, a let span before the program (K58), a span whose leading piece reads, a construction, a path read whole
      // and .cmd.
      varInBlock: control('if (ci) { var CMD = "rf --json status"; } execSync(CMD);'),
      letForInit: control('for (let CMD = "rf --json status"; ; ) { execSync(CMD); break; }'),
      letSecondNested: control('let CMD = "echo"; if (ci) { let CMD = "rf --json status"; execSync(CMD); }'),
      varSecond: control('var CMD = "rf --json status"; execSync(CMD); var CMD = "echo";'),
      letParenthesized: control('let CMD = ("rf --json status"); execSync(CMD);'),
      letSatisfies: control('let CMD = "rf --json status" satisfies string; execSync(CMD);'),
      letTypeAsserted: control('let CMD = <string>"rf --json status"; execSync(CMD);'),
      letNonNull: control('let CMD = "rf --json status"; execSync(CMD!);'),
      letConditionalTrue: control('let CMD = ci ? "rf --json status" : "true"; execSync(CMD);'),
      letConditionalFalse: control('let CMD = ci ? "true" : "rf --json status"; execSync(CMD);'),
      letOrRight: control('let P = process.env.RF_BIN || "rf"; spawn(P, []);'),
      letOrLeft: control('let P = "rf" || process.env.RF_BIN; spawn(P, []);'),
      letCoalesceLeft: control('let P = "rf" ?? process.env.RF_BIN; spawn(P, []);'),
      letSpanPrefix: control(['let E = "A=1"; execSync(`$', "{E} rf --json status`);"].join("")),
      spanLeadingPiece: control(["execSync(`$", '{"rf --json " + flag} status`);'].join("")),
      constructed: control('new Launcher("rf", ["--json", "status"]);'),
      letSpacedPath: control('let BIN = "/opt/my tools/rf"; spawn(BIN, []);'),
      cmdProgram: control('spawn("rf.cmd", []);'),
      // wb-kls1, the shell reading: the $"..." quote, the while and until openers (K26, K59), every redirection prefix (the
      // heredoc K23 and its tab-stripping form with a spaced delimiter, the here-string, input, append, read-write, both
      // duplications, clobber, &> K24 and &>>), a backslash-newline joining the program word outside double quotes (K27) and
      // inside them, and each word-ending operator glued to the program (;, &&, >, < and a closing parenthesis).
      shellLocaleQuoted: control(`execSync('$"rf" --json status');`),
      shellWhile: control('execSync("while rf --json status; do sleep 1; done");'),
      shellUntil: control('execSync("until rf --json status; do sleep 1; done");'),
      shellHeredoc: control('execSync("<<EOF rf --json status\\nEOF");'),
      shellHeredocTabbed: control('execSync("<<- EOF rf --json status\\nEOF");'),
      shellHereString: control('execSync("<<<input rf --json status");'),
      shellInput: control('execSync("<input rf --json status");'),
      shellAppended: control('execSync(">>log rf --json status");'),
      shellReadWrite: control('execSync("<>file rf --json status");'),
      shellInputDup: control('execSync("<&0 rf --json status");'),
      shellOutputDup: control('execSync(">&2 rf --json status");'),
      shellClobber: control('execSync(">|out rf --json status");'),
      shellAllRedirected: control('execSync("&>/dev/null rf --json status");'),
      shellAllAppended: control('execSync("&>>log rf --json status");'),
      shellContinued: control('execSync("r\\\\\\nf --json status");'),
      shellQuotedContinued: control(`execSync('"r\\\\\\nf" --json status');`),
      shellGluedSemicolon: control('execSync("rf;echo done");'),
      shellGluedAnd: control('execSync("rf&&echo ok");'),
      shellGluedOutput: control('execSync("rf>out");'),
      shellGluedInput: control('execSync("rf<in");'),
      shellGluedClose: control('execSync("(rf)");'),
      // wb-kls1 (the wb-3l7x gate's F4): a backslash-escaped backquote inside a backquoted env value never closes it (G22-O08).
      shellBackquotedEscaped: control('execSync("A=`echo \\\\`x\\\\`` rf --json status");'),
      // R-WRAPPED quiet rows: rf behind a wrapper program or after another shell command is no A2 site.
      wrappedShell: control('spawn("sh", ["-c", "rf --json status"]);'),
      wrappedEnv: control('spawn("env", ["rf", "--json", "status"]);'),
      chained: control('execSync("cd /w && rf --json status");'),
      // wb-3l7x: R-WRAPPED members named with the shell reading - a builtin or keyword that runs its arguments, a later command
      // inside a subshell, and a nested (substituted) command.
      wrappedExec: control('execSync("exec rf --json status");'),
      wrappedCommand: control('execSync("command rf --json status");'),
      wrappedTime: control('execSync("time rf --json status");'),
      chainedSubshell: control('execSync("(cd /w && rf --json status)");'),
      nested: control('execSync("echo $(rf --json status)");'),
      // R-COMPOSED quiet rows, one per member (`composed` above is the call member).
      composedConcat: control('spawn("r" + "f", []);'),
      composedTemplate: control(["spawn(`r$", "{suffix}`, []);"].join("")),
      composedProperty: control("spawn(BINARIES.rf, []);"),
      composedImport: control('import { RF_BIN } from "./process-env.js"; spawn(RF_BIN, []);'),
      // wb-3l7x: R-COMPOSED members of the shell reading - a concatenation split inside a template span, a program position a
      // template's non-literal expression opens, and a program the shell expands from a variable.
      composedSpan: control(['execSync(`$', '{"r" + suffix}f --json status`);'].join("")),
      composedAfterSpan: control(["execSync(`$", "{prefix} rf --json status`);"].join("")),
      composedShellVar: control('execSync("$RF_BIN --json status");'),
      composedShellDefault: control(['execSync("$', '{RF_BIN:-rf} --json status");'].join("")),
      // R-BOUND quiet rows (wb-3l7x PREP F2): a literal that reaches the launch other than as the argument or a plain name's
      // initializer - a destructuring pattern, a parameter, a later assignment, a loop binding, a spread or a template tag.
      boundObject: control('const { CMD } = { CMD: "rf --json status" }; execSync(CMD);'),
      boundArray: control('const [CMD] = ["rf --json status"]; execSync(CMD);'),
      boundParameter: control('function run(cmd = "rf --json status") { execSync(cmd); }'),
      boundAssigned: control('let cmd; cmd = "rf --json status"; execSync(cmd);'),
      boundLoop: control('for (const cmd of ["rf --json status"]) execSync(cmd);'),
      boundSpread: control('execSync(...["rf --json status"]);'),
      boundTagged: control("execSync(String.raw`rf --json status`);"),
    };
    return { srcFloorMet, sites, controls };
  },
  A3: async () => {
    const files = srcModules();
    const launchModules = [...new Set(files.flatMap(file => rfLaunchSites(relative(REPO, file), textOf(file))).map(site => site.split(": ")[0] ?? ""))].sort();
    const scans = files.map(file => scanReplay(relative(REPO, file), textOf(file), launchModules.includes(relative(REPO, file))));
    const argv = scans.flatMap(scan => scan.argv);
    const literals = scans.flatMap(scan => scan.literals);
    const words = scans.flatMap(scan => scan.words);
    const srcFloorMet = files.length >= SRC_FLOOR;
    const renderArgvSeen = scans.reduce((sum, scan) => sum + scan.renderArgv, 0) >= 1;
    expect(srcFloorMet, `src modules walked: ${files.length}`).toBe(true);
    expect(launchModules).toStrictEqual(["src/workbench/providers/reactivefiber.ts"]);
    expect(renderArgvSeen).toBe(true);
    expect({ argv, literals, words }, "an rf replay verb waits for rfc-bak67.12").toStrictEqual({ argv: [], literals: [], words: [] });
    const control = (text: string, launchModule: boolean): number => {
      const scan = scanReplay("control.ts", text, launchModule);
      return scan.argv.length + scan.literals.length + scan.words.length;
    };
    const controls = {
      argv: control('spawn("rf", ["--workspace", w, "context", "replay", render]);', false),
      pushed: control('argv.push("context", "replay");', false),
      spaced: control('const cmd = "rf context replay rfr_x --json";', false),
      dotted: control(`const id = "${REPLAY_COMMAND}";`, false),
      template: control(["const cmd = `rf context replay $", "{render}`;"].join(""), false),
      constVerb: control('const verb = "replay"; spawn("rf", ["context", verb]);', true),
      concat: control('const argv = ["context"].concat(["replay"]);', true),
      constArgv: control('const VERB = "replay"; export const ARGV = ["context", VERB];', false),
      flagBetween: control('spawn("rf", ["context", "--no-input", "replay", id]);', false),
      composed: control('const verb = ["re", "play"].join(""); spawn("rf", ["context", verb]);', true),
      // A template's literal and const spans are folded in before the verb test.
      literalSpan: control(["const cmd = `rf context $", '{"replay"} rfr_x --json`;'].join(""), false),
      constSpan: control(['const VERB = "replay"; const cmd = `rf context $', "{VERB} --json`;"].join(""), false),
      // R-COMPOSED quiet rows, one per member (`composed` above is the call member), each in an rf launch module.
      composedConcat: control('spawn("rf", ["context", "re" + "play"]);', true),
      composedTemplate: control(["const cmd = `rf context re$", "{gap}play`;"].join(""), true),
      composedProperty: control('spawn("rf", ["context", VERBS.replay]);', true),
      composedImport: control('import { VERB } from "./process-env.js"; spawn("rf", ["context", VERB]);', true),
    };
    return { srcFloorMet, launchModules, renderArgvSeen, argv, literals, words, controls };
  },
  B1: async () => {
    const primary = primaryOf(REFUSAL);
    const metadataKeys = Object.keys(metadataOf(REFUSAL));
    expect(REFUSAL.command).toBe(REPLAY_COMMAND);
    expect(REFUSAL.ok).toBe(false);
    expect(REFUSAL.result).toBeNull();
    expect(REFUSAL.diagnostics).toHaveLength(1);
    expect({ code: primary.code, severity: primary.severity }).toStrictEqual({ code: RECONSTRUCTION_UNAVAILABLE, severity: "error" });
    expect(metadataKeys).toStrictEqual(METADATA_KEYS);
    expect(ROSTER.replayExit).toBe(REPLAY_EXIT);
    return {
      command: REFUSAL.command, ok: REFUSAL.ok, result: REFUSAL.result, diagnostics: REFUSAL.diagnostics.length, code: codeOf(REFUSAL),
      severity: String(primary.severity), metadataKeys, sourceId: metadataOf(REFUSAL).source_id ?? null, exit: ROSTER.replayExit,
    };
  },
  B2: async () => {
    const outcome = await nativeOutcome(renderRefusal(REFUSAL), REPLAY_EXIT);
    const message = outcome.refusal?.message ?? "";
    const named = withheldTexts(REFUSAL).filter(value => message.includes(value));
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${RECONSTRUCTION_UNAVAILABLE}` });
    expect(named).toEqual([]);
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(verbOf(outcome.spawns)).toStrictEqual(["context", "render"]);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, named, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  B3: async () => {
    const { source, readingKeys, calls } = await verbatimReading("refusal");
    const primary = objectOf(Array.isArray(source.diagnostics) ? source.diagnostics[0] : undefined, "reading diagnostics[0]");
    const metadata = objectOf(primary.metadata, "reading metadata");
    expect(metadata).toStrictEqual(json(metadataOf(readRoster().envelopes.refusal)));
    return { code: String(primary.code), metadata, readingKeys, calls, fetches };
  },
  B4: async () => {
    const topology = reactivefiberTopology(readingAt(FIXTURE_ROOT, renderRefusal(REFUSAL)), FIXTURE_CONTEXT);
    const sentinel = reactivefiberTopology(readingAt(FIXTURE_ROOT, sentinelRefusal(REFUSAL)), FIXTURE_CONTEXT);
    const snapshot = topology.snapshots[0];
    const carriesValue = snapshot === undefined || snapshot.nativePayloadRef !== undefined || snapshot.sourceRevision !== undefined || snapshot.sourceVersion !== undefined;
    const surfaced = displayStrings(topology).filter(text => withheldTexts(REFUSAL).some(value => text.includes(value)));
    expect(topology.snapshots).toHaveLength(1);
    expect(snapshot?.node.statusTone).toBe("failure");
    expect(snapshot?.node.statusText).toBe(`refused · ${RECONSTRUCTION_UNAVAILABLE}`);
    expect(carriesValue).toBe(false);
    expect(snapshot?.source.id).toBe(REFUSAL.operation_id);
    expect([...(snapshot?.evidenceRefs ?? [])]).toStrictEqual([`rf-workspace:${REFUSAL.workspace.id}`]);
    expect(sentinel).toStrictEqual(topology);
    expect(surfaced).toEqual([]);
    return {
      snapshots: topology.snapshots.length, statusText: snapshot?.node.statusText ?? null, statusTone: snapshot?.node.statusTone ?? null,
      coverage: snapshot?.coverage ?? null, operationId: snapshot?.source.id ?? null, evidenceRefs: [...(snapshot?.evidenceRefs ?? [])], carriesValue,
      sentinelInvariant: true, surfaced,
    };
  },
  B5: async () => {
    // The stand-in would answer any second spawn with a full-shape live render: the refusal must stand all the same.
    const outcome = await nativeOutcome(renderRefusal(REFUSAL), REPLAY_EXIT, json(fullShapeRf(ROOT)));
    expect(outcome.refusal?.category).toBe("unavailable");
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(outcome.spawns[0]).toContain("--no-commit");
    expect(fetches).toBe(0);
    return { category: outcome.refusal?.category ?? null, reading: outcome.reading !== null, spawns: outcome.spawns.length, fetches };
  },
  B6: async () => {
    const { modules, unresolved, ports } = readerClosure();
    const closureFloorMet = modules.length >= CLOSURE_FLOOR;
    const anchorsRead = READER_MODULES.every(module => modules.includes(module)) && modules.includes("src/workbench/capability-registry.ts");
    const launches = [...new Set(ports.launches)].sort();
    expect(closureFloorMet, `closure modules: ${modules.join(", ")}`).toBe(true);
    expect(anchorsRead).toBe(true);
    expect(unresolved).toEqual([]);
    expect({ names: ports.names, modules: ports.modules, launches, opaque: ports.opaque }).toStrictEqual({ names: [], modules: [], launches: ["rf"], opaque: [] });
    const control = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { names: scan.names.length, modules: scan.modules.length, launches: scan.launches };
    };
    const controls = {
      httpImport: control('import { request } from "node:http";'),
      dynamicImport: control('const port = await import("node:" + "https");'),
      fetchCall: control("await fetch(producer);"),
      fetchAlias: control("const get = globalThis.fetch;"),
      fetchElement: control('await globalThis["fetch"](producer);'),
      socket: control("const socket = new WebSocket(producer);"),
      aliasedLauncher: control('import { execFile as run } from "node:child_process"; run("curl", [producer]);'),
      namespaceLauncher: control('import * as cp from "node:child_process"; cp.spawn("curl", []);'),
      requiredLauncher: control('const { spawn: go } = require("node:child_process"); go("curl", []);'),
      composedLauncher: control('import { spawn } from "node:child_process"; spawn(command, []);'),
      constLauncher: control('import { spawn } from "node:child_process"; const tool = "curl"; spawn(tool, []);'),
      importEquals: control('import cp = require("node:child_process"); cp.spawn("curl", []);'),
      dynamicLauncher: control('const cp = await import("node:child_process"); cp.execFile("curl", []);'),
      composed: control('await globalThis["fe" + "tch"](producer);'),
      unlisted: control('process.binding("tcp_wrap");'),
      // R-COMPOSED quiet rows, one per member (`composed` above is the concatenation member).
      composedCall: control('await globalThis[["fe", "tch"].join("")](producer);'),
      composedTemplate: control(["await globalThis[`fe$", "{suffix}`](producer);"].join("")),
      composedProperty: control("await globalThis[config.port](producer);"),
      composedImport: control('import { PORT } from "./process-env.js"; await globalThis[PORT](producer);'),
      // R-UNLISTED quiet rows: a worker and a native addon.
      worker: control('import { Worker } from "node:worker_threads"; new Worker(source, { eval: true });'),
      addon: control('const addon = require("./native.node");'),
    };
    // wb-bstx F2: the closure's edges. A literal or module-local const specifier is followed, an unreadable one refused; a
    // runtime-bound loader is R-LOADER (aliasedLoader and moduleRequire stay followed [] and refused 0).
    const edge = (text: string): JsonValue => {
      const scan = scanPorts("control.ts", text);
      return { followed: scan.local, refused: scan.opaque.length };
    };
    const edges = {
      staticImport: edge('import { x } from "./static.js";'),
      dynamicImport: edge('const lazy = await import("./lazy.js");'),
      required: edge('const lazy = require("./lazy.js");'),
      importEquals: edge('import lazy = require("./lazy.js");'),
      constSpecifier: edge('const target = "./lazy.js"; const lazy = await import(target);'),
      computed: edge("const lazy = await import(target);"),
      concatenated: edge('const lazy = await import("./la" + "zy.js");'),
      templated: edge(["const lazy = await import(`./$", "{name}.js`);"].join("")),
      aliasedLoader: edge('const load = createRequire(import.meta.url); const lazy = load("./lazy.js");'),
      moduleRequire: edge('const lazy = module.require("./lazy.js");'),
    };
    // F2 end to end: a scratch reader whose lazy import reaches a fetching module is walked and its port read, and its computed
    // import is refused through the walk's merge.
    const plant = makeScratch("rf-replay-history-closure-");
    scratches.push(plant);
    writeFileSync(join(plant, "reader.ts"), 'export const load = () => import("./lazy.js");\nexport const pick = (name: string) => import(name);\n');
    writeFileSync(join(plant, "lazy.ts"), "export const ping = (url: string) => fetch(url);\n");
    const planted = readerClosure(plant, ["reader.ts"]);
    const walk = { modules: planted.modules, unresolved: planted.unresolved, names: planted.ports.names, opaque: planted.ports.opaque };
    expect(walk).toStrictEqual({ modules: ["lazy.ts", "reader.ts"], unresolved: [], names: ["lazy.ts: fetch"], opaque: ["reader.ts: import(name)"] });
    return { closureFloorMet, anchorsRead, unresolved, names: ports.names, modules: ports.modules, launches, controls, opaque: ports.opaque, edges, walk };
  },
  C1: async () => {
    const outcome = await nativeOutcome(json(REPLAY), 0);
    expect(outcome.refusal).toStrictEqual({ category: "transport", message: "RF preview returned an unrecognized native envelope." });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(fetches).toBe(0);
    return { ...outcome.refusal, reading: outcome.reading !== null, spawns: outcome.spawns.length, verb: verbOf(outcome.spawns), fetches };
  },
  C2: async () => {
    let caught: unknown;
    try {
      reactivefiberTopology(readingAt(FIXTURE_ROOT, json(REPLAY)), FIXTURE_CONTEXT);
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(CapabilityError);
    return refusalOf(caught);
  },
  C3: async () => {
    const { source, readingKeys, calls } = await verbatimReading("replay");
    const result = objectOf(source.result, "reading result");
    const replayability = objectOf(result.replayability, "reading replayability");
    expect(source.command).toBe(REPLAY_COMMAND);
    expect(source.workspace).toStrictEqual(json(readRoster().envelopes.replay.workspace));
    expect(readingKeys).toStrictEqual(["contract", "source", "workspaceRoot"]);
    return {
      command: String(source.command), renderId: result.render_id ?? null, outcome: result.outcome ?? null,
      classification: replayability.classification ?? null, substituted: result.substituted ?? null, liveRecomputed: result.live_recomputed ?? null,
      workspace: source.workspace ?? null, readingKeys, calls, fetches,
    };
  },
  C4: async () => {
    const replayed = await liveProjection([{ status: "observed", freshness: "reused", replayed: true }]);
    const clean = await liveProjection([{ status: "observed", freshness: "captured_at_render", replayed: false }]);
    const shown = [...displayStrings(replayed), ...displayStrings(clean)];
    const labelled = shown.filter(text => FRESH_LABELS.test(text));
    const reusedNotes = replayed.diagnostics.filter(note => /\b1 reused\b/.test(note));
    const replayedSnapshot = replayed.snapshots[0];
    const cleanSnapshot = clean.snapshots[0];
    expect(replayedSnapshot?.coverage).toBe("partial");
    expect(replayedSnapshot?.node.statusTone).toBe("unknown");
    expect(reusedNotes).toHaveLength(1);
    expect(cleanSnapshot?.coverage).toBe("complete");
    expect(cleanSnapshot?.node.statusTone).toBe("success");
    expect(shown.length).toBeGreaterThan(0);
    expect(labelled).toEqual([]);
    return {
      replayed: { coverage: replayedSnapshot?.coverage ?? null, statusTone: replayedSnapshot?.node.statusTone ?? null, reusedNotes },
      clean: { coverage: cleanSnapshot?.coverage ?? null, statusTone: cleanSnapshot?.node.statusTone ?? null }, labelled,
    };
  },
  C5: async () => {
    const hits = READER_MODULES.flatMap(module => scanLabels(module, textOf(join(REPO, module))));
    const anchorsRead = READER_MODULES.every(module => textOf(join(REPO, module)).length > 0);
    expect(anchorsRead).toBe(true);
    expect(hits).toEqual([]);
    const control = (text: string): number => scanLabels("control.ts", text).length;
    const controls = {
      literal: control('const label = "fresh owner read";'),
      template: control(["const label = `current at $", "{when}`;"].join("")),
      hyphenated: control('const label = "up-to-date";'),
      cased: control('const label = "Latest";'),
      composed: control('const label = "fre" + "sh";'),
      // wb-bstx F3: the widened vocabulary, and a template's literal span folded in.
      newest: control('const label = "newest";'),
      asOfNow: control('const label = "as of now";'),
      freshly: control('const label = "freshly rendered";'),
      mostRecent: control('const label = "most recent";'),
      rightNow: control('const label = "right now";'),
      toTheMinute: control('const label = "up to the minute";'),
      foldedSpan: control(["const label = `as of $", '{"now"}`;'].join("")),
      // R-VOCABULARY quiet row: a freshness claim worded outside FRESH_LABELS.
      outside: control('const label = "just rendered";'),
      // R-COMPOSED quiet rows, one per member (`composed` above is the concatenation member).
      composedCall: control('const label = ["fre", "sh"].join("");'),
      composedTemplate: control(["const label = `fre$", "{suffix}sh`;"].join("")),
      composedProperty: control("const label = LABELS.current;"),
      composedImport: control('import { LABEL } from "./labels.js"; const label = LABEL;'),
    };
    return { anchorsRead, hits, controls };
  },
  C6: async () => {
    const read = (topology: ReactiveFiberProjectionTopology): JsonObject => {
      const projection = new ObservationProjection();
      const outcomes = topology.snapshots.map(snapshot => projection.refresh(snapshot));
      const nodes = projection.query({ scope: LIVE_CONTEXT.scope, limit: 10, kind: "reactivefiber.render.preview.snapshot" }).nodes;
      expect(outcomes).toStrictEqual(["applied"]);
      expect(nodes).toHaveLength(1);
      const node = nodes[0];
      return { freshness: node?.freshness ?? null, completeness: node?.completeness ?? null, connection: node?.sourceConnectionState ?? null };
    };
    const replayed = read(await liveProjection([{ status: "observed", freshness: "reused", replayed: true }]));
    const clean = read(await liveProjection([{ status: "observed", freshness: "captured_at_render", replayed: false }]));
    // R-NODE-FRESHNESS: the node's freshness follows the provider connection, the same for both renders; the reuse rides completeness.
    expect(replayed.freshness).toBe(clean.freshness);
    expect({ replayed: replayed.completeness, clean: clean.completeness }).toStrictEqual({ replayed: "partial", clean: "complete" });
    return { replayed, clean };
  },
};

/** The judged pins whose case reached its witness assertion; the last case reads it. */
const REACHED = new Set<string>();

describe("wb-tnz5.4 rf replay history census (RF-CERTIFIED-FEDERATED-REACTIVE-REFINEMENT-R5, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:3", "B:6", "C:6"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect({ code: RECONSTRUCTION_UNAVAILABLE, metadataKeys: METADATA_KEYS, replayExit: REPLAY_EXIT, gatingArtifacts: GATING_ARTIFACTS }).toStrictEqual({
      code: ROSTER.code, metadataKeys: [...ROSTER.metadataKeys], replayExit: ROSTER.replayExit, gatingArtifacts: [...ROSTER.gatingArtifacts],
    });
    // The measured refusal anchors the code and its metadata keys outside this file's literals.
    expect({ code: codeOf(REFUSAL), metadataKeys: Object.keys(metadataOf(REFUSAL)) }).toStrictEqual({ code: ROSTER.code, metadataKeys: [...ROSTER.metadataKeys] });
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 60_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("registration: every judged pin registered once, ran in run mode, was not inverted and reached its witness", ({ task }) => {
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string | undefined; readonly self: boolean }[] = [];
    const walk = (tasks: typeof task.file.tasks): void => {
      for (const child of tasks) {
        if (child.type === "test") walked.push({ name: child.name, mode: child.mode, fails: child.fails === true, state: child.result?.state, self: child === task });
        else if (child.type === "suite") walk(child.tasks);
      }
    };
    walk(task.file.tasks);
    const titles = walked.map(entry => entry.name);
    expect(titles, "every registered test of this file, exactly and in roster order").toEqual([...ROSTER.tests]);
    expect(titles.filter((name, index) => titles.indexOf(name) !== index), "titles registered twice").toEqual([]);
    const here = walked.findIndex(entry => entry.self);
    expect(here, "this case finds itself by task identity, registered last").toBe(walked.length - 1);
    const ran = (state: string | undefined): boolean => state === "pass" || state === "fail";
    expect(walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(entry => entry.name), "every other test ran in run mode, not inverted").toEqual([]);
    expect([...REACHED].sort(), "every judged pin reached its witness assertion").toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
