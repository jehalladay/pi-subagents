/**
 * wb-pfxo.7 (RF-COMPOSITIONAL-ASSEMBLY-R8, program-triage-2026-10-22), the absent-today leg. Statement (bead notes, full form): "If Pi
 * ever issues rf graph connect/disconnect FROM TO --candidate C, it shall pin today's put semantics by envelope (held-edge connect
 * ok:true, add_fiber applied, revision advanced) and, once CASM-M1c ships (gated rfc-vg54d.1, unshipped at the pin), echo exit 2
 * RF_GRAPH_OVERLAY_PATCH_INVALID duplicate_edge as 'edge already held' and the one derived edge a disconnect names, never retrying
 * under an alias, synthesizing a replaced edit or deriving multiplicity" (docs/programs/compositional-assembly-2026-10-18/
 * BEADS-2026-10-21.md:13@6a251bf73af5). Authority, as the filing states it: Pi echoes code, reason, exit status and applied
 * operations, never classifying from schema prose. The acceptance is the owner filing's, verbatim: the labels of rows A-C below.
 *
 * PRODUCER FACTS AT THE PIN (ReactiveFiberCLI 6a251bf73af5, read-only git show by the cutting seat): graph.connect.schema.json and
 * graph.disconnect.schema.json close result.applied to {patch_digest, operations}, operations minItems 1 and maxItems 1 ("The one
 * lowered operation", add_fiber or remove_fiber over the derived GRAPH-A19 edge id fiber:<from>-><to>); the connect schema's prose
 * already reads "an edge already declared is RF_GRAPH_OVERLAY_PATCH_INVALID (exit 2, duplicate_edge)" while
 * application/graph_patch.py:1070 still answers "replaced" for a fiber the overlay holds - the operator decision R-064
 * (docs/plans/core-convergence-2026-10-10/29-program-triage-2026-10-21.md:588) keeps duplicate connect as deliberate put semantics and
 * makes refusing it CASM-M1c (rfc-vg54d.1), unshipped. definitions/patch_schema.py:186 spells DUPLICATE_EDGE "duplicate_edge", the
 * reason of the in-document rule that ships today (two add_fiber rows of one (from, to) pair, :1112).
 *
 * MEASURED AT THE INSTALLED rf (0.1.832 by `rf --json --version` result.version, 2026-10-23) in a scratch jsonl workspace built the
 * pin's own way (tests/shell/test_graph_connect.sh: rf init, the declarative component demo.patch, the instance patch and the base edge
 * source:task.value -> component:patch.task, then rf component add and activate). THE FIXTURE (the roster's envelopes,
 * test/fixtures/rf-graph-edge-edit-echo-roster.json), each the stdout of one `rf --actor agent:pi-census ... --json` with only two host
 * prefixes rewritten (the scratch root to /fixture/rf-workspace; the installed package directory one hint names to
 * /fixture/rf-install/site-packages): on one private candidate, connectFirst and connectHeld are `rf graph connect source:task.value
 * component:patch.notes --candidate C` run twice - both exit 0, and the held-edge connect applies the same add_fiber, advances
 * overlay_revision 2 -> 3, journals the add digest a second time in overlay.operations and seeds change "replaced" (the producer's own
 * word); disconnectHeld is one `rf graph disconnect` of that edge (exit 0, one remove_fiber) and disconnectAgain the same disconnect
 * again (exit 2 RF_GRAPH_OVERLAY_DANGLING naming the edge: one disconnect left no edge although two connects applied). On a second
 * candidate, disconnectOnce is the disconnect after a single connect, the overlay state the M1c refusal would leave. patchDuplicate is
 * `rf graph patch --expect-revision 1` of a document holding two add_fiber rows of the edge on a third candidate (exit 2
 * RF_GRAPH_OVERLAY_PATCH_INVALID, metadata.reason duplicate_edge). connectRefused is the one CONSTRUCTED fixture: patchDuplicate with
 * its command set to graph.connect and nothing else changed (A1 pins the one-key difference), since M1c is unshipped and no rf build
 * emits a connect refusal; the census reads only its code, reason, exit and the absence of any result or revision, never its message.
 *
 * Pi's one rf reader is the reactivefiber.render.preview provider (providers/reactivefiber.ts) with its reader adapter
 * (reactivefiber-observer.ts): it spawns only `rf ... context render ... --no-commit`, admits only context.render envelopes and
 * classifies no edge edit, so Pi issues no graph connect or disconnect: the statement's trigger has not fired. The census pins that
 * absence and every surface the obligation already reaches:
 *  T, the trigger, absent today. T1 a TypeScript AST scan of every src module: no argv array spells "graph" before "connect" or
 *    "disconnect", no string, template literal or identifier spells either verb (EDGE_VERB_WORDS: graph then connect or disconnect as
 *    adjacent words, any case and joint, or joined), no literal spells the --candidate or --expect-revision flag, and no argv array
 *    puts a non-literal after "graph", with floors, the live render argv read for non-vacuity, every src file a parsed .ts module and
 *    the controls of T1_CONTROLS; T2 no src literal or identifier, and no native descriptor, spells the edit envelopes' vocabulary
 *    (ENVELOPE_FIELDS: their field names, the two lowering ops, the codes and the reason) or an edge-edit label (an EDGE_WORDS word
 *    within WINDOW words of a CLAIM_WORDS word, or one joined word spelling both), with the controls of T2_CONTROLS; T3 the rf roster
 *    stays the preview alone (native and injected registrations selected by id, permission and contract source, and
 *    RECONCILE_EVIDENCE_READS.reactivefiber at src/workflow/reconcile.ts), both descriptors carrying REACTIVE_FIBER_CONTRACT_SOURCE,
 *    whose verb is context.render --no-commit; T4 every input form the registered descriptor admits (held to its inputSchema) spawns
 *    one rf whose argv is a context render ending --no-commit --no-input --json and holds no edge-edit word (stand-in rf on PATH).
 *  A, acceptance (a). A1 the fixtures: both refusals exit 2 with a null result and transaction, diagnostics[0] the error
 *    RF_GRAPH_OVERLAY_PATCH_INVALID with metadata.reason duplicate_edge, the constructed one differs from the measured one in its
 *    command alone, neither states an overlay_revision, while the last connect read before (connectFirst) states 2 and the pin-era
 *    answer to the same held-edge connect (connectHeld) states 3 - so a kept revision is 2 and the M1c refusal is unshipped at the
 *    installed build; A2 the native reader given either refusal, from a stand-in rf that would answer any second spawn with the pin-era
 *    success, refuses it as an unrecognized envelope in exactly one spawn of the render argv: no retry, no alias verb; A3 the same over
 *    the render plane (the measured duplicate_edge primary on a context.render failure, CONSTRUCTED: patchDuplicate with its command set
 *    to context.render) is the typed refusal naming the code verbatim, the reason withheld, in one spawn although a second spawn would
 *    answer a live preview; A4 the registered reading (registerReactiveFiberRender, the registry's injected-reader seam) carries each
 *    refusal byte for byte - code and reason verbatim - and Pi adds only its contract and workspace root: no label, no forbidden word,
 *    no revision; A5 the adapter refuses each refusal before projecting anything, and projects the render-plane variant as a failure
 *    naming the code, the reason, the message and every revision withheld.
 *  B, acceptance (b). B1 the fixtures: both connects exit 0 ok:true with operations[0] the one add_fiber of the edge (the same
 *    operation and patch digest), overlay_revision 2 then 3, the journal 1 then 2 entries, seeds added then replaced: of the three
 *    words only "replaced" is in the envelope, once, in connectHeld; B2 the registered reading carries each byte for byte and its
 *    forbidden-word counts equal the envelope's own; B3 the agent-visible capability_invoke reply (the real curated MCP server behind
 *    a real MCP client) returns that reading verbatim as {kind: "returned", value}, the same counts; B4 the native reader refuses each
 *    as an unrecognized envelope in one spawn, its message holding none of the three words; B5 the adapter refuses each with one
 *    constant (NOT_A_RENDER), the same bytes for every fixture and for an eight-key control of another rf command: it names its own
 *    refusal of a non-render input, never the connect's outcome (the precision row R-SEAM-WORD below).
 *  C, acceptance (c). C1 the fixtures: disconnectHeld (pin era, after the two connects whose journal holds the add digest twice) and
 *    disconnectOnce (M1c era, after one connect) apply the same one remove_fiber of the edge (operation and patch digest equal) though
 *    their journals differ (3 and 2 entries), and disconnectAgain is exit 2 RF_GRAPH_OVERLAY_DANGLING naming the edge; C2 the registered
 *    reading and the capability_invoke reply carry each disconnect byte for byte, so result.applied.operations[] is exactly the
 *    producer's, one operation in both eras, and Pi adds no number and no string beyond its contract and root; C3 the native reader and
 *    the adapter refuse each disconnect, deriving nothing.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal. OUTSIDE ANCHORS: the owner filing's row of wb-pfxo.7 in
 * the tracked bead export (.beads/issues.jsonl) states the acceptance clauses (a), (b) and (c), and rows A, B and C hold their labels to
 * them verbatim and in order; the out-of-file roster holds every row's id, label and pins, every pin's witness, the pinned
 * vocabularies, the fixtures, their exits and the registered tests; T4's arms are held to the src descriptor's inputSchema. The last
 * case walks this file's vitest task tree against the roster, so a member removed from every literal of this file still reds there.
 * THE RUN PIN: test/workbench-rf-census-run-pins.census.ts judges every title of this file in the census tier from the gate's own
 * report, and its CENSUSES table is anchored HERE (wb-56od): the judged-set case reads that table back as a syntax tree and requires
 * this file there exactly once, so a cut of this census from the tier reds in this file too.
 * RESIDUALS (named, each with a pinned quiet row): R-NO-EDGE-READER no Pi reader reads a graph.connect, graph.disconnect or graph.patch
 * envelope, so their code, reason, applied operations and revision ride only the registered reading and the capability_invoke reply
 * (quiet rows A2, A5, B4, B5, C3: the refusal stands); R-WITHHELD-REASON the native typed refusal and the adapter's failure projection
 * name the code and withhold the reason (quiet rows A3, A5); R-COMPOSED a verb, flag or field spelled from runtime parts - a
 * call-composed argv (concat or push), an aliased noun, a string concatenation or a key joined from parts - is invisible to T1 and T2
 * (their residual controls read no hit; a non-literal after "graph" is caught conservatively, the composedVerb control, since src
 * holds that counter at 0; T4 is the runtime backstop at the one live spawn site); R-VOCABULARY an edge spoken of outside
 * EDGE_WORDS (a connection, a link) or classed outside CLAIM_WORDS (present, existing) is invisible to T2 (quiet control); R-FAR a pair
 * farther apart than WINDOW words is invisible (quiet control); R-COUNT a multiplicity spelled as a count ("edge count", a number
 * beside an edge noun) is invisible to T2, since Pi's own topology slice counts its observed edges (topology-slice.ts edgeCount) and
 * the render's work ledger carries fiber_signal_count, neither an rf edge-edit claim, so no count word joins CLAIM_WORDS (quiet
 * controls; the runtime pins hold every number Pi adds at none); R-JOURNAL the registered reading carries the producer's overlay.operations
 * journal verbatim, the add digest twice after a held-edge connect, so a reader counting it would infer a multiplicity the producer
 * contradicts (disconnectAgain): Pi counts nothing (quiet rows C1, C2). PRECISION (not an escape) R-SEAM-WORD: the adapter's constant
 * spells "refused" about its own input; the clause's word counts are read on the surfaces that carry the envelope (B5 pins the constant
 * envelope-independent, its counts {duplicate 0, refused 1, replaced 0}).
 * SCOPE: the producer facts are measured at the builds named and are not re-read here (the census is hermetic; Pi vendors no rf schema).
 * The armed half - a Pi connect or disconnect surface echoing the M1c refusal as 'edge already held' and keeping its last-read
 * overlay_revision - waits for rfc-vg54d.1 and a Pi edit surface: no surface is added or faked here, and T2 pins that no src spells
 * the label today. T1 and T2 judge src, the product; qa/ and examples/ spell none of their forms at base (git grep, 0 hits), and
 * docs/workbench names graph.connect and graph.disconnect only in the wb-a9l2.8 receipt's leaf listing, which no clause here judges.
 *
 * Display paths added: none. Test-only: the stand-in rf lives in makeScratch scratch; src and the bead export are only read.
 */
import { chmodSync, type Dirent, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import ts from "typescript";
import { afterEach, describe, expect, it } from "vitest";
import { type CapabilityDescriptor, CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { createCuratedTools } from "../src/workbench/claude-capability-tools.js";
import { loadWorkbenchNative } from "../src/workbench/native-modules.js";
import {
  REACTIVE_FIBER_CONTRACT_SOURCE,
  REACTIVEFIBER_RENDER_PREVIEW_CONTRACT,
  registerNativeReactiveFiberRender,
  registerReactiveFiberRender,
} from "../src/workbench/providers/reactivefiber.js";
import { type ReactiveFiberTopologyContext, reactivefiberTopology } from "../src/workbench/reactivefiber-observer.js";
import { RECONCILE_EVIDENCE_READS } from "../src/workflow/reconcile.js";
import { RUN_PIN_FILE, runPinnedFiles } from "./helpers/rf-census-run-pins.js";
import { fullShapeRf } from "./helpers/rf-render-fixture.js";
import { installScratchLeakGuard, makeScratch, removeScratch } from "./helpers/scratch.js";

// The guard registers through the helper's own afterAll: the census tier's judge refuses a vitest hook handed to a call (wb-vu3i).
installScratchLeakGuard();

type JsonObject = { [key: string]: JsonValue };
/** The envelope the injected-reader seam hands on; it validates nothing, which is what A4, B2 and C2 read. */
type InjectedEnvelope = Awaited<ReturnType<Parameters<typeof registerReactiveFiberRender>[1]>>;

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "..");
const ROSTER_PATH = join(HERE, "fixtures", "rf-graph-edge-edit-echo-roster.json");
/** This census, repository-relative: the file the census tier's run pin must name (wb-56od). */
const SELF = relative(REPO, fileURLToPath(import.meta.url));
const EXPORT_PATH = join(REPO, ".beads", "issues.jsonl");
const ROOT = process.cwd();
const BEAD = "wb-pfxo.7";
const PIN = "6a251bf73af5";
const RF_VERSION = "0.1.832";
const GATING = "rfc-vg54d.1";
/** The root every roster envelope names: the measured scratch root, rewritten. */
const FIXTURE_ROOT = "/fixture/rf-workspace";
const PREVIEW_ID = "reactivefiber.render.preview";
const PREVIEW_VERSION = "1.0.0";
const GRANTS = ["reactivefiber:render"];
const UNRECOGNIZED = "RF preview returned an unrecognized native envelope.";
const NOT_A_RENDER = "ReactiveFiber topology refused: source must be a reactive-fiber.cli/v1 context.render envelope.";
const PATCH_INVALID = "RF_GRAPH_OVERLAY_PATCH_INVALID";
const DANGLING = "RF_GRAPH_OVERLAY_DANGLING";
const DUPLICATE_EDGE = "duplicate_edge";
/** The one derived edge (GRAPH-A19 fiber:<from>-><to>) every measured connect, disconnect and patch row targets. */
const EDGE = "fiber:source:task.value->component:patch.notes";

/** The fixtures by role: the (b) pin-era connects, the (a) refusals and the (c) disconnects of both eras. */
const CONNECTS = ["connectFirst", "connectHeld"] as const;
const REFUSALS = ["patchDuplicate", "connectRefused"] as const;
const DISCONNECTS = ["disconnectHeld", "disconnectAgain", "disconnectOnce"] as const;
type FixtureName = (typeof CONNECTS)[number] | (typeof REFUSALS)[number] | (typeof DISCONNECTS)[number];
const FIXTURES: readonly FixtureName[] = [...CONNECTS, ...REFUSALS, ...DISCONNECTS];
/** The fixtures no rf build produced: built from a measured one by the edit A1 pins. */
const CONSTRUCTED: readonly FixtureName[] = ["connectRefused"];

/** The edit envelopes' vocabulary a reader of them would spell: their field names, the lowering ops, the codes and the reason. */
const ENVELOPE_FIELDS: readonly string[] = [
  "overlay_revision", "overlay_digest", "overlay_id", "base_bundle_revision", "impact_preliminaries", "patch_digest", "operation_digest",
  "add_fiber", "remove_fiber", DUPLICATE_EDGE, PATCH_INVALID, DANGLING,
];
const ENVELOPE_FIELD = new RegExp(`(?<![A-Za-z0-9_])(?:${ENVELOPE_FIELDS.join("|")})(?![A-Za-z0-9_])`);
/** The candidate flags the edit leaves take and the render never does. */
const CANDIDATE_FLAG = /(?<![A-Za-z0-9-])--(?:candidate|expect-revision)(?![A-Za-z0-9-])/;
/** The words an edge-edit argv carries and the render argv never does. */
const EDGE_ARGV: ReadonlySet<string> = new Set(["graph", "connect", "disconnect", "patch", "--candidate", "--expect-revision"]);
/** The label detector's reach: a pair is two words at most WINDOW words apart, in either order. */
const WINDOW = 5;
/** The edge nouns of rf's edit plane: an edge, and the fiber GRAPH-A19 derives it from. */
const EDGE_WORDS: readonly string[] = ["edge", "edges", "fiber", "fibers"];
/** Every word that, beside an edge noun, classes an edit: held, duplicate, replaced or multiplied, in the inflections a label uses. */
const CLAIM_WORDS: readonly string[] = [
  "held", "hold", "holds", "holding", "already", "duplicate", "duplicates", "duplicated", "duplicating", "duplication", "replace",
  "replaced", "replaces", "replacing", "replacement", "multiplicity", "multiple", "twice", "thrice", "repeated", "repeats", "remounted",
  "mounted",
];
/** Acceptance (b)'s three words, each with the inflections a surfaced string would use. */
const FORBIDDEN: Readonly<Record<string, readonly string[]>> = {
  duplicate: ["duplicate", "duplicates", "duplicated", "duplicating", "duplication"],
  refused: ["refuse", "refused", "refuses", "refusing", "refusal", "refusals"],
  replaced: ["replace", "replaced", "replaces", "replacing", "replacement"],
};

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}

/** The judged rows; their shape is pinned below and held to the roster, and rows A-C to the owner's clauses in the bead export. */
const ROWS: readonly Row[] = [
  {
    id: "T",
    label: "(trigger, absent today) Pi issues no rf graph connect or disconnect: no src argv or literal spells either verb or a candidate flag, no src module or native descriptor spells the edit envelopes' vocabulary or an edge-edit label, the rf roster stays reactivefiber.render.preview alone and every input form spawns a context render with --no-commit",
    pins: ["T1", "T2", "T3", "T4"],
  },
  {
    id: "A",
    label: "(a) post-M1c fixture (exit 2, diagnostics[0].code RF_GRAPH_OVERLAY_PATCH_INVALID reason duplicate_edge): 'edge already held', one rf argv, no alias retry, last-read overlay_revision kept",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) pin-era fixture (ok:true, operations[0].op add_fiber, advanced overlay_revision): surfaced verbatim, no 'duplicate', 'refused' or 'replaced' unless in the envelope",
    pins: ["B1", "B2", "B3", "B4", "B5"],
  },
  {
    id: "C",
    label: "(c) disconnect fixtures (both eras): exactly result.applied.operations[] surfaced, no multiplicity claim from inference",
    pins: ["C1", "C2", "C3"],
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
  readonly pin: string;
  readonly rfVersion: string;
  readonly window: number;
  readonly vocabulary: { readonly edge: readonly string[]; readonly claim: readonly string[]; readonly fields: readonly string[] };
  readonly fixtures: readonly string[];
  readonly constructed: readonly string[];
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

/** One roster envelope in the strict eight-key rf envelope shape, refused by name when any field is off. */
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
  if (!isObject(raw) || !Array.isArray(raw.rows) || !isObject(raw.envelopes) || !isObject(raw.exits) || !isObject(raw.vocabulary)) {
    throw new Error("roster must be an object with rows, envelopes, exits and a vocabulary");
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
  if (JSON.stringify(fixtures) !== JSON.stringify(FIXTURES)) throw new Error(`roster fixtures must be ${FIXTURES.join(", ")}`);
  const { envelopes: rawEnvelopes, exits: rawExits, vocabulary } = raw;
  const envelopes = Object.fromEntries(FIXTURES.map(name => [name, envelopeOf(rawEnvelopes[name], name)])) as Record<FixtureName, Envelope>;
  const exits = Object.fromEntries(FIXTURES.map(name => {
    const exit = rawExits[name];
    if (typeof exit !== "number" || !Number.isSafeInteger(exit)) throw new Error(`roster exits.${name} must be an integer`);
    return [name, exit];
  })) as Record<FixtureName, number>;
  if (typeof raw.bead !== "string" || typeof raw.pin !== "string" || typeof raw.rfVersion !== "string" || typeof raw.window !== "number") {
    throw new Error("roster needs bead, pin, rfVersion and window");
  }
  return {
    bead: raw.bead, pin: raw.pin, rfVersion: raw.rfVersion, window: raw.window,
    vocabulary: { edge: strings(vocabulary.edge, "vocabulary.edge"), claim: strings(vocabulary.claim, "vocabulary.claim"), fields: strings(vocabulary.fields, "vocabulary.fields") },
    fixtures, constructed: strings(raw.constructed, "constructed"), exits, envelopes, rows, tests: strings(raw.tests, "tests"),
  };
}

const ROSTER = readRoster();
const ENVELOPES = ROSTER.envelopes;

function rosterWitness(pin: string): JsonValue {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}

/** The owner filing's acceptance clauses, read from the wb-pfxo.7 row of the tracked bead export: "(a) ...", "(b) ...", "(c) ...". */
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
/** Every string a JSON value holds, keys included: what a word count over a surfaced value reads. */
function wordLeaves(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(wordLeaves);
  if (isObject(value)) return Object.entries(value).flatMap(([key, item]) => [key, ...wordLeaves(item)]);
  return [];
}
/** Every number a JSON value holds. */
function numberLeaves(value: unknown): number[] {
  if (typeof value === "number") return [value];
  if (Array.isArray(value)) return value.flatMap(numberLeaves);
  if (isObject(value)) return Object.values(value).flatMap(numberLeaves);
  return [];
}
/** The keys named overlay_revision anywhere in a JSON value. */
function revisionKeys(value: unknown): number {
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + revisionKeys(item), 0);
  if (!isObject(value)) return 0;
  return Object.entries(value).reduce((sum: number, [key, item]) => sum + (key === "overlay_revision" ? 1 : 0) + revisionKeys(item), 0);
}
/** The top-level keys whose values differ between two envelopes. */
function differingKeys(left: Envelope, right: Envelope): string[] {
  const a = objectOf(json(left), "left envelope");
  const b = objectOf(json(right), "right envelope");
  return [...new Set([...Object.keys(a), ...Object.keys(b)])].filter(key => JSON.stringify(a[key]) !== JSON.stringify(b[key])).sort();
}
function primaryOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.diagnostics[0], `${envelope.command} diagnostics[0]`);
}
function metadataOf(envelope: Envelope): JsonObject {
  return objectOf(primaryOf(envelope).metadata, `${envelope.command} diagnostics[0].metadata`);
}
function resultOf(envelope: Envelope): JsonObject {
  return objectOf(envelope.result, `${envelope.command} result`);
}
function overlayOf(envelope: Envelope): JsonObject {
  return objectOf(resultOf(envelope).overlay, `${envelope.command} result.overlay`);
}
function appliedOf(envelope: Envelope): JsonObject[] {
  const applied = objectOf(resultOf(envelope).applied, `${envelope.command} result.applied`);
  return arrayOf(applied.operations, "result.applied.operations").map((item, index) => objectOf(item, `result.applied.operations[${index}]`));
}
function seedChanges(envelope: Envelope): string[] {
  const preliminaries = objectOf(resultOf(envelope).impact_preliminaries, "result.impact_preliminaries");
  return arrayOf(preliminaries.seeds, "result.impact_preliminaries.seeds").map(seed => String(objectOf(seed, "seed").change));
}
/** A copy of an envelope whose command is `command`, nothing else changed: how the two constructed shapes are built. */
function withCommand(envelope: Envelope, command: string): Envelope {
  return { ...envelopeOf(json(envelope), `${envelope.command} copy`), command };
}

/** The words a detector reads: camelCase split, every run of other characters a separator, lowercased. */
function wordsOf(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(word => word.length > 0);
}
/** Whether a text spells an rf edge-edit verb: graph then connect or disconnect as adjacent words, or one joined word. */
function edgeVerb(text: string): boolean {
  const words = wordsOf(text);
  return words.some((word, index) => word === "graphconnect" || word === "graphdisconnect" ||
    (word === "graph" && (words[index + 1] === "connect" || words[index + 1] === "disconnect")));
}
const EDGE_SET = new Set(EDGE_WORDS);
const CLAIM_SET = new Set(CLAIM_WORDS);
const JOINED: ReadonlySet<string> = new Set(EDGE_WORDS.flatMap(edge => CLAIM_WORDS.flatMap(claim => [`${edge}${claim}`, `${claim}${edge}`])));
/** The first edge-edit label in a text: an edge noun at most WINDOW words from a claim word, or one joined word; null for none. */
function labelOf(text: string): string | null {
  const words = wordsOf(text);
  for (let index = 0; index < words.length; index++) {
    const word = words[index] ?? "";
    if (JOINED.has(word)) return word;
    if (!EDGE_SET.has(word)) continue;
    for (let other = Math.max(0, index - WINDOW); other <= Math.min(words.length - 1, index + WINDOW); other++) {
      const near = words[other] ?? "";
      if (other !== index && CLAIM_SET.has(near)) return `${word}~${near}`;
    }
  }
  return null;
}
/** Acceptance (b)'s three word families counted over a value's strings and keys. */
function forbiddenCounts(value: unknown): JsonObject {
  const words = wordLeaves(value).flatMap(wordsOf);
  return Object.fromEntries(Object.entries(FORBIDDEN).map(([name, family]) => [name, words.filter(word => family.includes(word)).length]));
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
function textOf(path: string): string {
  try {
    return readFileSync(path, "utf8");
  } catch {
    return "";
  }
}

interface Lexicon {
  readonly file: string;
  readonly literals: string[];
  readonly identifiers: string[];
  readonly verbArgv: string[];
  readonly renderArgv: number;
  readonly composedArgv: number;
}
/** One module's lexicon: its string, no-substitution and template literals (a template's literal parts joined by a space), every
 * identifier, and its argv arrays - "graph" before a literal "connect" or "disconnect" (any case), "graph" before a non-literal
 * element (composed), or the render argv "context" before "render". */
function lexiconOf(fileName: string, text: string): Lexicon {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const literals: string[] = [];
  const identifiers: string[] = [];
  const verbArgv: string[] = [];
  let renderArgv = 0;
  let composedArgv = 0;
  const visit = (node: ts.Node): void => {
    if (ts.isStringLiteralLike(node)) literals.push(node.text);
    else if (ts.isTemplateExpression(node)) literals.push([node.head.text, ...node.templateSpans.map(span => span.literal.text)].join(" "));
    else if (ts.isIdentifier(node)) identifiers.push(node.text);
    if (ts.isArrayLiteralExpression(node)) {
      const words = node.elements.map(element => (ts.isStringLiteralLike(element) ? element.text : null));
      words.forEach((word, index) => {
        if ((word !== "graph" && word !== "context") || index + 1 >= words.length) return;
        const next = words[index + 1];
        if (word === "context") {
          if (next === "render") renderArgv += 1;
          return;
        }
        if (next === null || next === undefined) composedArgv += 1;
        else if (next.toLowerCase() === "connect" || next.toLowerCase() === "disconnect") verbArgv.push(`${fileName}: [${words.filter(item => item !== null).join(", ")}]`);
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file: fileName, literals, identifiers, verbArgv, renderArgv, composedArgv };
}
let srcLexica: Lexicon[] | undefined;
/** Every src .ts module's lexicon, parsed once for T1 and T2. */
function srcLexicon(): Lexicon[] {
  srcLexica ??= filesBelow(join(REPO, "src")).filter(file => file.endsWith(".ts")).map(file => lexiconOf(relative(REPO, file), textOf(file)));
  return srcLexica;
}
/** The src files the lexicon does not parse: every src file is a .ts module at base, so a file of another kind reds T1 until read. */
function unparsedSrc(): string[] {
  return filesBelow(join(REPO, "src")).filter(file => !file.endsWith(".ts")).map(file => relative(REPO, file));
}

const oldPath = process.env.PATH;
const scratches: string[] = [];
const closers: (() => Promise<void>)[] = [];
afterEach(async () => {
  process.env.PATH = oldPath;
  for (const close of closers.splice(0)) await close();
  removeScratch(...scratches.splice(0));
});

/**
 * A stand-in `rf` first on PATH. It appends one JSON argv line per spawn to the returned log; its first spawn prints `first` and
 * exits `exit`, and any later spawn prints `later` (when given, else `first`) and exits 0.
 */
function standInRf(first: JsonValue, exit: number, later?: JsonValue): string {
  const folder = makeScratch("rf-graph-edge-edit-echo-");
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
function verbOf(argv: readonly string[]): string[] {
  return argv.slice(2, 4);
}
function edgeArgvOf(argv: readonly string[]): string[] {
  return argv.filter(word => EDGE_ARGV.has(word));
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
async function nativeOutcome(first: JsonValue, exit: number, later?: JsonValue, input: JsonObject = { model: "m", task: "t" }): Promise<NativeOutcome> {
  const log = standInRf(first, exit, later);
  const registry = new CapabilityRegistry();
  registerNativeReactiveFiberRender(registry, ROOT);
  let reading: JsonValue | null = null;
  let refusal: { category: string; message: string } | null = null;
  try {
    reading = await registry.invoke(PREVIEW_ID, input, invocationContext());
  } catch (error) {
    refusal = refusalOf(error);
  }
  return { refusal, reading, spawns: spawnsOf(log) };
}
/** The native reader's refusal of a fixture it must not read, asserted: unrecognized, no reading, one spawn of the render argv with
 * no edge-edit word, a message carrying no label and none of (b)'s three words. */
async function nativeRefusal(name: FixtureName): Promise<JsonValue> {
  const outcome = await nativeOutcome(json(ENVELOPES[name]), ROSTER.exits[name]);
  const argv = outcome.spawns[0] ?? [];
  const message = outcome.refusal?.message ?? "";
  expect(outcome.refusal).toStrictEqual({ category: "transport", message: UNRECOGNIZED });
  expect(outcome.reading).toBeNull();
  expect(outcome.spawns).toHaveLength(1);
  expect(verbOf(argv)).toEqual(["context", "render"]);
  expect(edgeArgvOf(argv)).toEqual([]);
  expect(labelOf(message)).toBeNull();
  expect(forbiddenCounts(message)).toStrictEqual({ duplicate: 0, refused: 0, replaced: 0 });
  return { ...outcome.refusal, reading: false, spawns: outcome.spawns.length, verb: verbOf(argv), edgeArgv: edgeArgvOf(argv), forbidden: forbiddenCounts(message) };
}

/** One registry invocation of the INJECTED preview whose reader answers a deep copy of the fixture; `before` is a fresh roster read
 * serialized before the invocation, so a reading mutated in place cannot pass as verbatim. */
async function registeredReading(name: FixtureName): Promise<{ reading: JsonObject; calls: number; before: string }> {
  const before = JSON.stringify(readRoster().envelopes[name]);
  const handed = json(ENVELOPES[name]);
  let calls = 0;
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => {
    calls += 1;
    return handed as unknown as InjectedEnvelope;
  }, FIXTURE_ROOT);
  const reading = objectOf(await registry.invoke(PREVIEW_ID, { model: "m", task: "t" }, invocationContext()), "reading");
  return { reading, calls, before };
}
/** The registered reading of a fixture, asserted byte for byte: the source serializes to the fresh roster bytes, the reader ran once,
 * and the only strings Pi adds are its contract and workspace root - no label, no number, none of (b)'s three words. */
async function verbatimReading(name: FixtureName): Promise<{ witness: JsonObject; source: Envelope }> {
  const { reading, calls, before } = await registeredReading(name);
  const piPart = { ...reading, source: null };
  const piStrings = stringLeaves(piPart);
  expect(JSON.stringify(reading.source)).toBe(before);
  expect(calls).toBe(1);
  expect(piStrings).toStrictEqual([REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(piStrings.filter(text => labelOf(text) !== null)).toEqual([]);
  expect(numberLeaves(piPart)).toEqual([]);
  expect(forbiddenCounts(piPart)).toStrictEqual({ duplicate: 0, refused: 0, replaced: 0 });
  return {
    witness: { verbatim: true, calls, readingKeys: Object.keys(reading).sort(), piStrings, piNumbers: numberLeaves(piPart), piForbidden: forbiddenCounts(piPart) },
    source: envelopeOf(reading.source, `${name} reading source`),
  };
}

interface ToolReply {
  readonly isError: boolean;
  readonly payload: JsonObject;
}
/** The agent-visible reply of capability_invoke: the real curated MCP server, behind a real MCP client, exposing only the injected
 * preview whose reader answers a deep copy of the fixture. */
async function toolReply(name: FixtureName): Promise<ToolReply> {
  const handed = json(ENVELOPES[name]);
  const registry = new CapabilityRegistry();
  registerReactiveFiberRender(registry, async () => handed as unknown as InjectedEnvelope, FIXTURE_ROOT);
  const server = createCuratedTools({
    registry,
    allowedCapabilities: [PREVIEW_ID],
    grants: [`discover:${PREVIEW_ID}`, `inspect:${PREVIEW_ID}`, `invoke:${PREVIEW_ID}`, ...GRANTS],
    principal: { id: "census-user", role: "reviewer" },
    workspace: FIXTURE_ROOT,
    invocationId: "rf-graph-edge-edit-echo-1",
    signal: new AbortController().signal,
  });
  const client = new Client({ name: "rf-graph-edge-edit-echo-census", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.instance.connect(serverTransport);
  await client.connect(clientTransport);
  closers.push(async () => {
    await client.close();
    await server.instance.close();
  });
  const result = await client.callTool({ name: "capability_invoke", arguments: { capabilityId: PREVIEW_ID, capabilityVersion: PREVIEW_VERSION, input: { model: "m", task: "t" } } });
  const content: unknown = result.content;
  const first: unknown = Array.isArray(content) ? content[0] : undefined;
  if (!isObject(first) || first.type !== "text" || typeof first.text !== "string") throw new Error("expected one text content block");
  return { isError: result.isError === true, payload: objectOf(json(JSON.parse(first.text)), "capability_invoke reply") };
}
/** The capability_invoke reply of a fixture, asserted verbatim: kind returned, its value the fresh registered reading byte for byte, and
 * Pi's own strings only the reply kind, its contract and its workspace root. */
async function verbatimToolReply(name: FixtureName): Promise<JsonObject> {
  const reply = await toolReply(name);
  const value = objectOf(reply.payload.value, "capability_invoke reply value");
  const expected = JSON.stringify({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: readRoster().envelopes[name] });
  const piPart = { ...reply.payload, value: { ...value, source: null } };
  const piStrings = stringLeaves(piPart);
  expect(reply.isError).toBe(false);
  expect(reply.payload.kind).toBe("returned");
  expect(JSON.stringify(value)).toBe(expected);
  expect(piStrings).toStrictEqual(["returned", REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, FIXTURE_ROOT]);
  expect(numberLeaves(piPart)).toEqual([]);
  expect(forbiddenCounts(piPart)).toStrictEqual({ duplicate: 0, refused: 0, replaced: 0 });
  return { isError: reply.isError, kind: String(reply.payload.kind), verbatim: true, piStrings, forbidden: forbiddenCounts(reply.payload) };
}

const FIXTURE_CONTEXT: ReactiveFiberTopologyContext = {
  scope: { workspace: FIXTURE_ROOT, principal: "local-operator:tester" }, seam: "injected-fixture",
  capturedAt: "2026-10-23T00:00:00Z", observedAt: "2026-10-23T00:00:01Z",
};
/** The adapter's refusal of a source it must not project, asserted: a validation refusal, the constant NOT_A_RENDER. */
function adapterRefusal(source: JsonValue): JsonObject {
  let caught: unknown;
  try {
    reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source }, FIXTURE_CONTEXT);
  } catch (error) {
    caught = error;
  }
  const refusal = refusalOf(caught);
  expect(refusal).toStrictEqual({ category: "validation", message: NOT_A_RENDER });
  return { ...refusal, label: labelOf(refusal.message), forbidden: forbiddenCounts(refusal.message) };
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
function rfDescriptors(descriptors: readonly CapabilityDescriptor[]): CapabilityDescriptor[] {
  return descriptors.filter(descriptor => descriptor.id.startsWith("reactivefiber.") || descriptor.id.startsWith("rf.") ||
    descriptor.permissions.some(permission => permission.startsWith("reactivefiber:")) || (descriptor.contractSource ?? "").includes("reactive-fiber.cli"));
}
/** The input forms a descriptor's inputSchema admits: per oneOf branch, its required keys, and its required keys with each optional. */
function inputForms(schema: Record<string, unknown>): string[][] {
  const branches = Array.isArray(schema.oneOf) ? schema.oneOf : [schema];
  return branches.flatMap((branch: unknown) => {
    if (!isObject(branch) || !isObject(branch.properties)) return [];
    const required = strings(branch.required ?? [], "inputSchema required");
    const optional = Object.keys(branch.properties).filter(key => !required.includes(key));
    return [[...required].sort(), ...optional.map(key => [...required, key].sort())];
  }).map(form => form.join(",")).sort().map(form => form.split(","));
}
/** The input each T4 arm renders: one per form the registered descriptor admits (T4 holds them to it). */
const ARMS: ReadonlyArray<{ readonly arm: string; readonly input: JsonObject }> = [
  { arm: "legacy", input: { model: "model-fixture", task: "task-fixture" } },
  { arm: "view", input: { view: "swarm.worker", taskId: "bead-fixture-000" } },
  { arm: "view-model", input: { view: "swarm.worker", taskId: "bead-fixture-000", model: "model-fixture" } },
];

const T1_CONTROLS: Readonly<Record<string, string>> = {
  argvConnect: 'spawn("rf", ["--workspace", w, "graph", "connect", a, b, "--candidate", c, "--json"]);',
  argvDisconnect: 'spawn("rf", ["graph", "disconnect", a, b]);',
  dotted: 'const leaf = "graph.connect";',
  spaced: 'const command = "rf graph disconnect a b --json";',
  kebab: 'const key = "graph-connect";',
  snake: 'const key = "graph_disconnect";',
  joined: 'const key = "graphconnect";',
  camelIdentifier: "const graphConnect = (): number => 0;",
  upper: 'const key = "GRAPH CONNECT";',
  template: ["const command = `rf graph connect $", "{a} $", "{b}`;"].join(""),
  candidateFlag: 'const flag = "--candidate";',
  expectFlag: 'const flag = "--expect-revision";',
  composedVerb: 'const verb = "connect"; spawn("rf", ["graph", verb]);',
  negativeTransport: "await server.instance.connect(serverTransport);",
  negativeRender: 'spawn("rf", ["--workspace", w, "context", "render", "--no-commit", "--no-input", "--json"]);',
  negativeWords: 'const note = "the graph view connects observed nodes";',
  residualCallComposed: 'spawn("rf", ["graph"].concat(["con" + "nect"]));',
  residualAliased: 'const noun = "graph"; spawn("rf", [noun, "connect"]);',
  residualConcat: 'const command = "rf graph " + "connect";',
};
/** A control's T1 reading: its verb argv, verb literals and identifiers and flag literals, with the composed argv counted apart. */
function t1Control(text: string): JsonObject {
  const lexicon = lexiconOf("control.ts", text);
  const hits = lexicon.verbArgv.length + [...lexicon.literals, ...lexicon.identifiers].filter(edgeVerb).length +
    lexicon.literals.filter(item => CANDIDATE_FLAG.test(item)).length;
  return { hits, composedArgv: lexicon.composedArgv };
}
const T2_CONTROLS: Readonly<Record<string, string>> = {
  fieldLiteral: 'const revision = result["overlay_revision"];',
  fieldIdentifier: "const revision = result.overlay.overlay_revision;",
  code: 'if (code === "RF_GRAPH_OVERLAY_PATCH_INVALID") return;',
  reason: 'const held = metadata.reason === "duplicate_edge";',
  op: 'const op = "remove_fiber";',
  labelHeld: 'const label = "edge already held";',
  labelReplaced: 'const note = "replaced edge";',
  labelDuplicate: 'const note = "duplicate fiber";',
  labelTwice: 'const note = "the edge is held twice";',
  labelCamel: "const view = { edgeAlreadyHeld: true };",
  labelJoined: 'const key = "heldedge";',
  labelUpper: 'const key = "EDGE REPLACED";',
  negativeTopology: 'const note = "unknown dynamic edge (not in view)";',
  negativeRegistry: 'const note = "Capability is already registered (duplicate).";',
  residualVocabulary: 'const note = "connection already present";',
  residualFar: 'const note = "edge one two three four five six held";',
  residualComposed: 'const key = "overlay" + "_revision";',
  residualCount: 'const note = "edge count 2";',
  residualNumber: ["const note = `$", "{n} edges removed`;"].join(""),
};
/** A control's T2 reading: the literals and identifiers spelling an envelope field, and those carrying an edge-edit label. */
function t2Control(text: string): JsonObject {
  const lexicon = lexiconOf("control.ts", text);
  const items = [...lexicon.literals, ...lexicon.identifiers];
  return { fields: items.filter(item => ENVELOPE_FIELD.test(item)).length, labels: items.filter(item => labelOf(item) !== null).length };
}
/** A control set read, asserted: every control named negative or residual reads nothing, every other reads at least one hit (a
 * composed argv counts: src holds that counter at 0). */
function controlsRead(controls: Readonly<Record<string, string>>, read: (text: string) => JsonObject): JsonObject {
  const readings = Object.fromEntries(Object.entries(controls).map(([name, text]) => [name, read(text)]));
  const hitsOf = (reading: JsonValue | undefined): number => Object.values(objectOf(reading, "control reading")).reduce((sum: number, count) => sum + Number(count), 0);
  const quiet = Object.keys(controls).filter(name => name.startsWith("negative") || name.startsWith("residual"));
  expect(quiet.filter(name => hitsOf(readings[name]) !== 0), "a quiet control that reads a hit").toEqual([]);
  expect(Object.keys(controls).filter(name => !quiet.includes(name) && hitsOf(readings[name]) < 1), "a flagged control that reads nothing").toEqual([]);
  return readings;
}

/** One connect's producer facts. */
function connectFacts(name: FixtureName): JsonObject {
  const envelope = ENVELOPES[name];
  const applied = appliedOf(envelope);
  return {
    command: envelope.command, ok: envelope.ok, exit: ROSTER.exits[name], applied: applied.map(item => `${String(item.op)}:${String(item.target)}`),
    revision: overlayOf(envelope).overlay_revision ?? null, journal: arrayOf(overlayOf(envelope).operations, "overlay.operations").length,
    seeds: seedChanges(envelope), forbidden: forbiddenCounts(envelope),
  };
}
/** One disconnect's producer facts; a refused one states its primary instead. */
function disconnectFacts(name: FixtureName): JsonObject {
  const envelope = ENVELOPES[name];
  if (!envelope.ok) {
    const primary = primaryOf(envelope);
    return { command: envelope.command, ok: false, exit: ROSTER.exits[name], result: envelope.result, code: String(primary.code), reference: metadataOf(envelope).reference ?? null };
  }
  const applied = appliedOf(envelope);
  return {
    command: envelope.command, ok: true, exit: ROSTER.exits[name], applied: applied.map(item => `${String(item.op)}:${String(item.target)}`),
    revision: overlayOf(envelope).overlay_revision ?? null, journal: arrayOf(overlayOf(envelope).operations, "overlay.operations").length, seeds: seedChanges(envelope),
  };
}
/** One refusal's producer facts. */
function refusalFacts(name: FixtureName): JsonObject {
  const envelope = ENVELOPES[name];
  const primary = primaryOf(envelope);
  const metadata = metadataOf(envelope);
  return {
    command: envelope.command, ok: envelope.ok, exit: ROSTER.exits[name], result: envelope.result, transaction: envelope.transaction_id,
    code: String(primary.code), severity: String(primary.severity), reason: metadata.reason ?? null, revisionKeys: revisionKeys(envelope),
  };
}
/** The adapter's projection of a render-plane refusal: its tone and status, its notes and everything it surfaces. */
function projectionOf(envelope: Envelope): JsonObject {
  const topology = reactivefiberTopology({ contract: REACTIVEFIBER_RENDER_PREVIEW_CONTRACT, workspaceRoot: FIXTURE_ROOT, source: json(envelope) }, FIXTURE_CONTEXT);
  const snapshot = topology.snapshots[0];
  if (snapshot === undefined) throw new Error("the adapter projected no snapshot");
  const shown = [snapshot.node.title, snapshot.node.statusText, ...topology.diagnostics, ...(snapshot.evidenceRefs ?? [])];
  return {
    tone: snapshot.node.statusTone, statusText: snapshot.node.statusText, notes: [...topology.diagnostics], codeShown: shown.some(text => text.includes(PATCH_INVALID)),
    reasonShown: shown.some(text => text.includes(DUPLICATE_EDGE)), labels: shown.filter(text => labelOf(text) !== null), revisionKeys: revisionKeys(json(topology)),
  };
}

/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<JsonValue>>> = {
  T1: async () => {
    const lexica = srcLexicon();
    const literals = lexica.reduce((sum, lexicon) => sum + lexicon.literals.length, 0);
    const identifiers = lexica.reduce((sum, lexicon) => sum + lexicon.identifiers.length, 0);
    const argv = lexica.flatMap(lexicon => lexicon.verbArgv);
    const verbs = lexica.flatMap(lexicon => [...lexicon.literals, ...lexicon.identifiers].filter(edgeVerb).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const flags = lexica.flatMap(lexicon => lexicon.literals.filter(item => CANDIDATE_FLAG.test(item)).map(item => `${lexicon.file}: ${item.slice(0, 120)}`));
    const composedArgv = lexica.reduce((sum, lexicon) => sum + lexicon.composedArgv, 0);
    const renderArgvSeen = lexica.some(lexicon => lexicon.file === "src/workbench/providers/reactivefiber.ts" && lexicon.renderArgv >= 1);
    const floors = { modules: lexica.length >= 100, literals: literals >= 5000, identifiers: identifiers >= 50000 };
    const unparsed = unparsedSrc();
    expect(floors, `src modules ${lexica.length}, literals ${literals}, identifiers ${identifiers}`).toStrictEqual({ modules: true, literals: true, identifiers: true });
    expect(renderArgvSeen).toBe(true);
    expect(unparsed, "a src file the lexical scan does not parse").toEqual([]);
    expect({ argv, verbs, flags, composedArgv }, "an rf graph connect or disconnect spelled in src").toStrictEqual({ argv: [], verbs: [], flags: [], composedArgv: 0 });
    return { floors, renderArgvSeen, unparsed, argv, verbs, flags, composedArgv, controls: controlsRead(T1_CONTROLS, t1Control) };
  },
  T2: async () => {
    const lexica = srcLexicon();
    const items = lexica.flatMap(lexicon => [...lexicon.literals, ...lexicon.identifiers].map(item => ({ file: lexicon.file, item })));
    const fields = items.filter(({ item }) => ENVELOPE_FIELD.test(item)).map(({ file, item }) => `${file}: ${item.slice(0, 120)}`);
    const labels = items.flatMap(({ file, item }) => {
      const label = labelOf(item);
      return label === null ? [] : [`${file}: ${label} :: ${item.slice(0, 120)}`];
    });
    const anchorRead = lexica.some(lexicon => lexicon.file === "src/workbench/reactivefiber-observer.ts" && lexicon.literals.some(item => item.startsWith("ReactiveFiber topology refused")));
    const descriptors = await nativeDescriptors();
    const descriptorHits = descriptors.filter(descriptor => {
      const text = JSON.stringify(descriptor);
      return ENVELOPE_FIELD.test(text) || edgeVerb(text) || labelOf(text) !== null;
    }).map(descriptor => descriptor.id);
    expect(anchorRead).toBe(true);
    expect(descriptors.length, "the native catalog the descriptor scan reads (4 descriptors at base)").toBeGreaterThanOrEqual(3);
    expect({ fields, labels, descriptorHits }, "the edit envelopes' vocabulary or an edge-edit label in src or a native descriptor").toStrictEqual({ fields: [], labels: [], descriptorHits: [] });
    return { anchorRead, descriptorFloor: descriptors.length >= 3, fields, labels, descriptorHits, controls: controlsRead(T2_CONTROLS, t2Control) };
  },
  T3: async () => {
    const injected = new CapabilityRegistry();
    registerReactiveFiberRender(injected, () => Promise.reject(new Error("the injected reader is never invoked here")), ROOT);
    const nativeRf = rfDescriptors(await nativeDescriptors());
    const injectedRf = rfDescriptors(injected.catalogSnapshot().map(entry => entry.descriptor));
    const reconcile = [...(RECONCILE_EVIDENCE_READS.reactivefiber ?? [])];
    const carriers = [...nativeRf, ...injectedRf].map(descriptor => descriptor.contractSource === REACTIVE_FIBER_CONTRACT_SOURCE);
    const carrierVerb = REACTIVE_FIBER_CONTRACT_SOURCE.endsWith(" context.render --no-commit");
    expect(nativeRf.map(descriptor => descriptor.id)).toStrictEqual([PREVIEW_ID]);
    expect(injectedRf.map(descriptor => descriptor.id)).toStrictEqual([PREVIEW_ID]);
    expect(reconcile).toStrictEqual([PREVIEW_ID]);
    expect(carriers).toEqual([true, true]);
    expect([carrierVerb, edgeVerb(REACTIVE_FIBER_CONTRACT_SOURCE)]).toEqual([true, false]);
    return {
      native: nativeRf.map(descriptor => descriptor.id), injected: injectedRf.map(descriptor => descriptor.id), reconcile,
      effectClasses: [...nativeRf, ...injectedRf].map(descriptor => descriptor.effectClass), carriers, carrierVerb, carrierEdgeVerb: edgeVerb(REACTIVE_FIBER_CONTRACT_SOURCE),
    };
  },
  T4: async () => {
    const schema = rfDescriptors(await nativeDescriptors())[0]?.inputSchema ?? {};
    const forms = inputForms(schema);
    const armForms = ARMS.map(arm => Object.keys(arm.input).sort().join(",")).sort().map(form => form.split(","));
    expect(armForms, "the T4 arms are exactly the input forms the registered descriptor admits").toEqual(forms);
    const arms: JsonValue[] = [];
    for (const { arm, input } of ARMS) {
      const outcome = await nativeOutcome(json(fullShapeRf(ROOT)), 0, undefined, input);
      const argv = outcome.spawns[0] ?? [];
      expect(outcome.refusal).toBeNull();
      expect(outcome.reading).not.toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      expect(verbOf(argv)).toEqual(["context", "render"]);
      expect(argv.slice(-3)).toEqual(["--no-commit", "--no-input", "--json"]);
      expect(edgeArgvOf(argv)).toEqual([]);
      arms.push({ arm, spawns: outcome.spawns.length, verb: verbOf(argv), tail: argv.slice(-3), edgeArgv: edgeArgvOf(argv) });
    }
    return { forms, arms };
  },
  A1: async () => {
    const facts = Object.fromEntries(REFUSALS.map(name => [name, refusalFacts(name)]));
    const constructedDiff = differingKeys(ENVELOPES.patchDuplicate, ENVELOPES.connectRefused);
    const lastRead = overlayOf(ENVELOPES.connectFirst).overlay_revision ?? null;
    const pinEraAnswer = overlayOf(ENVELOPES.connectHeld).overlay_revision ?? null;
    const unshippedAtInstalled = ENVELOPES.connectHeld.ok && seedChanges(ENVELOPES.connectHeld).includes("replaced");
    for (const name of REFUSALS) {
      expect(facts[name]).toMatchObject({ ok: false, exit: 2, result: null, transaction: null, code: PATCH_INVALID, severity: "error", reason: DUPLICATE_EDGE, revisionKeys: 0 });
    }
    expect([ENVELOPES.patchDuplicate.command, ENVELOPES.connectRefused.command]).toEqual(["graph.patch", "graph.connect"]);
    expect(constructedDiff, "the constructed refusal differs from the measured one in its command alone").toEqual(["command"]);
    expect([lastRead, pinEraAnswer]).toEqual([2, 3]);
    expect(unshippedAtInstalled).toBe(true);
    return { facts, constructed: [...CONSTRUCTED], constructedDiff, lastRead, pinEraAnswer, unshippedAtInstalled, gating: GATING };
  },
  A2: async () => {
    const witness: JsonObject = {};
    for (const name of REFUSALS) {
      // The stand-in would answer any second spawn with the pin-era success: the refusal must stand in one spawn all the same.
      const outcome = await nativeOutcome(json(ENVELOPES[name]), ROSTER.exits[name], json(ENVELOPES.connectHeld));
      const argv = outcome.spawns[0] ?? [];
      expect(outcome.refusal).toStrictEqual({ category: "transport", message: UNRECOGNIZED });
      expect(outcome.reading).toBeNull();
      expect(outcome.spawns).toHaveLength(1);
      expect(verbOf(argv)).toEqual(["context", "render"]);
      expect(edgeArgvOf(argv)).toEqual([]);
      witness[name] = { ...outcome.refusal, reading: false, spawns: outcome.spawns.length, verb: verbOf(argv), edgeArgv: edgeArgvOf(argv), label: labelOf(outcome.refusal?.message ?? "") };
    }
    return witness;
  },
  A3: async () => {
    const variant = withCommand(ENVELOPES.patchDuplicate, "context.render");
    const variantDiff = differingKeys(ENVELOPES.patchDuplicate, variant);
    const outcome = await nativeOutcome(json(variant), ROSTER.exits.patchDuplicate, json(fullShapeRf(ROOT)));
    const argv = outcome.spawns[0] ?? [];
    const message = outcome.refusal?.message ?? "";
    expect(variantDiff).toEqual(["command"]);
    expect(outcome.refusal).toStrictEqual({ category: "unavailable", message: `RF render refused: ${PATCH_INVALID}` });
    expect(outcome.reading).toBeNull();
    expect(outcome.spawns).toHaveLength(1);
    expect(verbOf(argv)).toEqual(["context", "render"]);
    expect(edgeArgvOf(argv)).toEqual([]);
    expect([message.includes(DUPLICATE_EDGE), labelOf(message)]).toEqual([false, null]);
    return {
      variantDiff, ...outcome.refusal, reading: false, spawns: outcome.spawns.length, verb: verbOf(argv), edgeArgv: edgeArgvOf(argv),
      reasonShown: message.includes(DUPLICATE_EDGE), label: labelOf(message),
    };
  },
  A4: async () => {
    const witness: JsonObject = {};
    for (const name of REFUSALS) {
      const { witness: shown, source } = await verbatimReading(name);
      expect([String(primaryOf(source).code), metadataOf(source).reason ?? null, revisionKeys(source)]).toEqual([PATCH_INVALID, DUPLICATE_EDGE, 0]);
      witness[name] = { ...shown, code: String(primaryOf(source).code), reason: metadataOf(source).reason ?? null, revisionKeys: revisionKeys(source) };
    }
    return witness;
  },
  A5: async () => {
    const refusals = Object.fromEntries(REFUSALS.map(name => [name, adapterRefusal(json(ENVELOPES[name]))]));
    const variant = projectionOf(withCommand(ENVELOPES.patchDuplicate, "context.render"));
    expect(variant).toMatchObject({ tone: "failure", codeShown: true, reasonShown: false, labels: [], revisionKeys: 0 });
    return { refusals, variant };
  },
  B1: async () => {
    const facts = Object.fromEntries(CONNECTS.map(name => [name, connectFacts(name)]));
    const sameApplied = JSON.stringify(objectOf(resultOf(ENVELOPES.connectFirst).applied, "first applied")) === JSON.stringify(objectOf(resultOf(ENVELOPES.connectHeld).applied, "held applied"));
    for (const name of CONNECTS) expect(facts[name]).toMatchObject({ command: "graph.connect", ok: true, exit: 0, applied: [`add_fiber:${EDGE}`] });
    expect(CONNECTS.map(name => objectOf(facts[name], name).revision)).toEqual([2, 3]);
    expect(CONNECTS.map(name => objectOf(facts[name], name).journal)).toEqual([1, 2]);
    expect(CONNECTS.map(name => objectOf(facts[name], name).seeds)).toEqual([["added"], ["replaced"]]);
    expect(CONNECTS.map(name => objectOf(facts[name], name).forbidden)).toEqual([{ duplicate: 0, refused: 0, replaced: 0 }, { duplicate: 0, refused: 0, replaced: 1 }]);
    expect(sameApplied).toBe(true);
    return { facts, sameApplied };
  },
  B2: async () => {
    const witness: JsonObject = {};
    for (const name of CONNECTS) {
      const { witness: shown, source } = await verbatimReading(name);
      expect(forbiddenCounts(source)).toStrictEqual(forbiddenCounts(readRoster().envelopes[name]));
      witness[name] = { ...shown, forbidden: forbiddenCounts(source), envelopeForbidden: forbiddenCounts(ENVELOPES[name]) };
    }
    return witness;
  },
  B3: async () => {
    const witness: JsonObject = {};
    for (const name of CONNECTS) {
      const reply = await verbatimToolReply(name);
      expect(reply.forbidden).toStrictEqual(forbiddenCounts(readRoster().envelopes[name]));
      witness[name] = reply;
    }
    return witness;
  },
  B4: async () => {
    const witness: JsonObject = {};
    for (const name of CONNECTS) witness[name] = await nativeRefusal(name);
    return witness;
  },
  B5: async () => {
    const refusals = Object.fromEntries(CONNECTS.map(name => [name, adapterRefusal(json(ENVELOPES[name]))]));
    const every = FIXTURES.map(name => adapterRefusal(json(ENVELOPES[name])).message);
    const control = adapterRefusal(json(withCommand(ENVELOPES.connectFirst, "graph.show"))).message;
    const envelopeIndependent = [...every, control].every(message => message === NOT_A_RENDER);
    expect(envelopeIndependent).toBe(true);
    expect(forbiddenCounts(NOT_A_RENDER)).toStrictEqual({ duplicate: 0, refused: 1, replaced: 0 });
    return { refusals, envelopeIndependent, constantForbidden: forbiddenCounts(NOT_A_RENDER) };
  },
  C1: async () => {
    const facts = Object.fromEntries(DISCONNECTS.map(name => [name, disconnectFacts(name)]));
    const sameApplied = JSON.stringify(objectOf(resultOf(ENVELOPES.disconnectHeld).applied, "held applied")) === JSON.stringify(objectOf(resultOf(ENVELOPES.disconnectOnce).applied, "once applied"));
    const journalBefore = arrayOf(overlayOf(ENVELOPES.connectHeld).operations, "connectHeld journal").map(String);
    expect(facts.disconnectHeld).toMatchObject({ ok: true, exit: 0, applied: [`remove_fiber:${EDGE}`], journal: 3 });
    expect(facts.disconnectOnce).toMatchObject({ ok: true, exit: 0, applied: [`remove_fiber:${EDGE}`], journal: 2 });
    expect(facts.disconnectAgain).toStrictEqual({ command: "graph.disconnect", ok: false, exit: 2, result: null, code: DANGLING, reference: EDGE });
    expect([sameApplied, journalBefore.length, new Set(journalBefore).size]).toEqual([true, 2, 1]);
    return { facts, sameApplied, journalBefore: journalBefore.length, journalBeforeDistinct: new Set(journalBefore).size };
  },
  C2: async () => {
    const witness: JsonObject = {};
    for (const name of DISCONNECTS) {
      const { witness: shown, source } = await verbatimReading(name);
      const fresh = readRoster().envelopes[name];
      const surfaced = source.ok ? appliedOf(source) : null;
      expect(JSON.stringify(surfaced)).toBe(JSON.stringify(fresh.ok ? appliedOf(fresh) : null));
      const tool = await verbatimToolReply(name);
      witness[name] = { ...shown, applied: surfaced === null ? null : surfaced.map(item => `${String(item.op)}:${String(item.target)}`), tool };
    }
    expect(objectOf(witness.disconnectHeld, "disconnectHeld").applied).toEqual(objectOf(witness.disconnectOnce, "disconnectOnce").applied);
    return witness;
  },
  C3: async () => {
    const witness: JsonObject = {};
    for (const name of DISCONNECTS) witness[name] = { native: await nativeRefusal(name), adapter: adapterRefusal(json(ENVELOPES[name])) };
    return witness;
  },
};

describe("wb-pfxo.7 rf graph edge-edit echo census (RF-COMPOSITIONAL-ASSEMBLY-R8, absent-today leg)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the owner's acceptance clauses and the cases agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["T:4", "A:5", "B:5", "C:3"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(
      ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })),
    );
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    // The owner's acceptance clauses in the tracked bead export are exactly the labels of rows A, B and C, in order.
    expect(ownerClauses()).toEqual(ROWS.filter(row => row.id !== "T").map(row => row.label));
    expect({
      bead: BEAD, pin: PIN, rfVersion: RF_VERSION, window: WINDOW, vocabulary: { edge: EDGE_WORDS, claim: CLAIM_WORDS, fields: ENVELOPE_FIELDS },
      fixtures: FIXTURES, constructed: CONSTRUCTED,
    }).toStrictEqual({
      bead: ROSTER.bead, pin: ROSTER.pin, rfVersion: ROSTER.rfVersion, window: ROSTER.window,
      vocabulary: { edge: [...ROSTER.vocabulary.edge], claim: [...ROSTER.vocabulary.claim], fields: [...ROSTER.vocabulary.fields] },
      fixtures: [...ROSTER.fixtures], constructed: [...ROSTER.constructed],
    });
    // Every fixture names the rewritten scratch root, and no envelope carries a host path.
    expect(FIXTURES.map(name => ENVELOPES[name].workspace?.root ?? null)).toEqual(FIXTURES.map(() => FIXTURE_ROOT));
    expect(FIXTURES.filter(name => /\/tmp\/|\/home\//.test(JSON.stringify(ENVELOPES[name])))).toEqual([]);
    // The anchor outside the census tier's run pin (wb-56od): its CENSUSES table, read as a syntax tree, names this file exactly once,
    // so a cut of this census from that table reds here, in the test tier, and not only there.
    expect(runPinnedFiles(readFileSync(join(REPO, RUN_PIN_FILE), "utf8")).filter(file => file === SELF), `${RUN_PIN_FILE} names this census once`).toEqual([SELF]);
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

  it("registration: every case of this file is registered once, in roster order, in run mode, and ran before this one", ({ task }) => {
    // wb-vu3i (this census's gate F1, which rides wb-vu3i: the record skipped or hollowed stayed rc 0): the census tier's run pin
    // (test/workbench-rf-census-run-pins.census.ts) judges every title of this file, so the task tree is read INLINE - no task handed to
    // a call or placed in a literal, each read into primitives - at the three levels this file nests (its describe, a row's describe and
    // that row's pins); a suite nested deeper is recorded by its name, so the title read below reds on it rather than miss what it holds.
    const walked: { readonly name: string; readonly mode: string; readonly fails: boolean; readonly state: string; readonly self: boolean }[] = [];
    for (const top of task.file.tasks) {
      if (top.type !== "suite") {
        walked.push({ name: `${top.name}`, mode: `${top.mode}`, fails: top.fails === true, state: `${top.result?.state ?? "no result"}`, self: top.id === task.id });
        continue;
      }
      for (const middle of top.tasks) {
        if (middle.type !== "suite") {
          walked.push({ name: `${middle.name}`, mode: `${middle.mode}`, fails: middle.fails === true, state: `${middle.result?.state ?? "no result"}`, self: middle.id === task.id });
          continue;
        }
        for (const leaf of middle.tasks) {
          walked.push({
            name: leaf.type === "suite" ? `suite ${leaf.name}` : `${leaf.name}`, mode: `${leaf.mode}`, fails: leaf.type === "suite" ? false : leaf.fails === true,
            state: `${leaf.result?.state ?? "no result"}`, self: leaf.id === task.id,
          });
        }
      }
    }
    const titles = walked.map(entry => entry.name);
    const here = walked.findIndex(entry => entry.self);
    const ran = (state: string): boolean => state === "pass" || state === "fail";
    const read = (entry: (typeof walked)[number]): string => `${entry.name} | ${entry.mode}${entry.fails ? "+fails" : ""} | ${ran(entry.state) ? "ran" : entry.state}`;
    // ONE assertion, this case's last statement: an exit anywhere before it leaves the case without an assertion, which
    // --expect.requireAssertions fails in this tier and the census tier's judge reads as no-assertion.
    expect(
      {
        rosterOrder: titles, twice: titles.filter((name, index) => titles.indexOf(name) !== index), here,
        irregular: walked.filter((entry, index) => index !== here && (entry.mode !== "run" || entry.fails || !ran(entry.state))).map(read),
      },
      "the registration record: every registered test of this file (vitest task tree) exactly in roster order, no title registered twice (an alias or a decoy), this case found by task identity and registered last, and every other test in run mode, not inverted and run before this case",
    ).toStrictEqual({ rosterOrder: [...ROSTER.tests], twice: [], here: walked.length - 1, irregular: [] });
  });
});
