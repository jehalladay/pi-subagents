/**
 * wb-kjg9.1 (HX-GRAPH-POLICY-OPTIMIZATION-R1, program-triage-2026-10-22 child of wb-kjg9, dispatchable under standing rule 21), a
 * gated posture census. Statement (the bead's note, full form): "If Pi ever reads GraphPolicy output in an hx result (estimates,
 * priorities, covered/uncovered labels; gated: HX delivery step 3 opt-in planner consultation, unshipped), Pi shall never let it
 * change an exact answer, raise coverage, license absence, add edges or satisfy a proof obligation: estimates and labels are echoed
 * verbatim as their own facets, an uncovered observation never reads as absent nor the result as complete, and coverage, tone and
 * verdict stay byte-identical to the GP-less result." (HyperUnix-CLI docs/programs/graph-policy-optimization-2026-10-18/README.md:7
 * at 0091719d0288). The acceptance is the owner filing's, verbatim: the labels of rows A, B and C, held to the tracked bead export (F1).
 *
 * THE SOURCE AT THE PIN (HyperUnix-CLI 0091719d02887910fa0c2fb6693a32723e243600, README blob ecb16aa218ad, read with read-only git
 * show by the cutting seat on 2026-10-23): README_LINES holds lines :7 (the invariant the filing quotes), :11 (the bounded GraphDataIR
 * export, the gating artifact), :13 (budgeted investigation "must label covered/uncovered observations") and :23 (delivery step 3,
 * the opt-in planner consultation) byte for byte with their sha-256; the census is hermetic and never re-reads them. GATING ARTIFACT
 * SHIPPED: no. Measured by the cutting seat, not re-read here: HyperUnix-CLI origin/main dc0ebede6a (2026-10-23T17:11:00Z) names
 * GraphDataIR or graphpolicy only under docs/programs/ and new-feedback/ and names no plan_cost_estimate, exploration_priority or
 * gp_receipt; the vendored @hyperunix/sdk 0.1.0 declares none of them (row C4 reads that on every run).
 *
 * WHAT PI READS TODAY. One provider (src/workbench/providers/hyperunix.ts, registerHyperUnixFind) returns the vendored SDK's
 * hyperunix.result/1 document (resultToJson over the SDK's decoded result) inside a hyperunix.find/v1 envelope, and three readers
 * consume that envelope: the reader adapter (hyperunixTopology: coverage and statusTone derive only from the execution kind and the
 * runtime's licenses_absence, :216-219), the live verdict (hxLiveInvariant: absenceLicensed from the same two fields, :129-130) and
 * the native-evidence projection (nativeEvidence for hyperunix.find). Rows A and C plant the filing's GP-shaped keys into the
 * envelope those readers consume and into the SDK document the provider decodes, and read every reader's whole output back.
 *
 * READINGS
 * - (a) GP-SHAPED KEYS: GP_KEYS, the clause's five keys in its order (the two labels split at "/"), each carrying a value that claims
 *   what GP may never decide - a complete, cheap plan with a licensed absence, the top priority, a receipt claiming a complete
 *   verdict, an observation labelled covered and complete, one labelled uncovered and absent (gpKeys()). They are planted, never over
 *   an existing key, at every SITE (every object of the envelope two keys deep, read from the envelope itself) over every BASE (each
 *   kind of the adapter's exported HYPERUNIX_EXECUTION_KINDS, unlicensed and runtime-licensed: 26). BYTE-IDENTICAL means the reader's
 *   whole outcome - its frozen projection, or its typed refusal for the two mutation kinds - serializes to the same JSON as the
 *   key-less base's; coverage and statusTone (the projection) and absenceLicensed (the live verdict) are recorded per base. No reader's
 *   output carries a GP key, a GP_MARK value or the word uncovered (the surfacing reader carries positive controls).
 * - (b) THE CLAUSE'S "0" IS A MEASUREMENT AT d75b68d10a1a, re-measured by the cutting seat with read-only git grep over the needle
 *   families below (any case): 0 files in src, test, docs and qa, and 0 'uncovered' in src, docs/workbench and qa. At base 4435e2e the
 *   same command reads src 0, qa 0, docs 3 files (docs/workbench/03-architecture-and-ownership.md, receipts/wb-1xvp.3.md and
 *   receipts/wb-1xvp.5.md) and test 10 files (the wb-1xvp.2 to wb-1xvp.5 GraphPolicy census family), and 'uncovered' once under
 *   docs/workbench (receipts/wb-1xvp.3.md:43); the five queued wb-gxd7 cuts add 14 more test files, every one a gp- family module,
 *   helper or fixture (measured from state/gate-queue by git diff against their merge bases). Those holders landed after d75b68d: the
 *   docs/03 section is the wb-1xvp.2 census's pinned docs anchor (test/workbench-gp-real-interfaces.test.ts holds its whole rendered
 *   block list) and receipts are append-only (owner ruling R539), so the literal 0 cannot hold over docs or test at this trunk. Read
 *   as the owner ratified the same clause shape for wb-csbt.3 (R719, acceptance reading (a)): the PRODUCT surface (src, qa) holds
 *   zero needle hits and zero 'uncovered' (B1); every docs hit, and every 'uncovered' under docs/workbench, sits in a named holder
 *   region (B2); every test file holding a needle is a named holder class (B3: the R719-ratified census module and census roster
 *   patterns plus the GraphPolicy census family). A needle anywhere else reds.
 * - (c) WHEN SHIPPED, ARMED TODAY: GP fields claiming a complete or cheap plan beside licenses_absence false read 'partial' on every
 *   complete and partial kind (C1); an uncovered label reads 'partial' on those kinds and its word reaches no output, because no facet
 *   exists to echo it (C2); the label-less result's outcome per base is frozen in the roster as the GP-less baseline a landing must
 *   keep byte for byte (C3); and the on-landing tripwire (C4): the vendored SDK's declarations and the three HX modules name no GP
 *   field today, so a successor that names one reds C4, and the cut that lands it owes the verbatim facets the statement asks for
 *   (each estimate and label echoed as its own facet) with C1-C3 re-armed at the shipped surface.
 * - NEEDLES (the clause's "GraphDataIR/graphpolicy/GP identifiers", any case): GraphDataIR (graph, data and ir with an optional -, _,
 *   dot or space between), graphpolicy (graph and policy with the same separators: GraphPolicyCLI, graph-policy-cli,
 *   graphpolicy.rpc.v1), and GP: gp's wire vocabulary as the landed wb-1xvp.3 receipt measured it (the gp.rpc reply schemas, the
 *   GP_CLI_, GP_RPC_ and GP_E_ code families) and clause (a)'s three non-label keys in snake, kebab or camel form. The bare token gp
 *   is not a needle (R1). Hits are read per line, as git grep reads them.
 *
 * JUDGED ROWS (ROWS; one test per pin, titled by the pin id under its row's label):
 *  A, acceptance (a). A1 the reader adapter over 26 bases x 8 sites; A2 the registered provider over the SDK document's sites (the
 *    SDK keeps the keys only in its lossless extensions sidecar, which the provider echoes byte for byte and no reader reads; every
 *    other site drops them), for an unlicensed incomplete and a licensed complete-empty document; A3 the native-evidence projection;
 *    A4 the live verdict, absenceLicensed included; A5 the cited lines hold the derivation the clause cites.
 *  B, acceptance (b). B1 src and qa: zero hits; B2 docs: every hit in a holder region; B3 test: every hit file a holder.
 *  C, acceptance (c). C1 claiming fields read 'partial'; C2 the uncovered label; C3 the GP-less baseline; C4 the landing tripwire.
 *  F, the outside anchors. F1: the owner filing row of wb-kjg9.1 in the tracked bead export (.beads/issues.jsonl) states each
 *    acceptance clause exactly as the label of rows A, B and C (whole clause, so a shortened label reds); clause (a)'s keys are
 *    GP_KEYS and each non-label key is its own GP member, its fields are PROJECTED, its contract is CONTRACT and its cites are CITED;
 *    clause (b)'s sha, needle names, roots, word and word roots are MEASURED_AT, the NEEDLES families, GP_ROOTS, UNCOVERED and
 *    UNCOVERED_ROOTS; clause (c)'s claim words name CLAIMING plants and its reading word is READING; the note's quote and authority
 *    sit inside README_LINES :7, and the statement's GraphPolicy and the gating sentence's GraphDataIR read as their families. F2: the
 *    landed anchors - the wb-1xvp.3 receipt's measured wire vocabulary and its graphpolicy spellings each read as a needle member, the
 *    wb-csbt.3 roster's R719-ratified holder patterns are the first two TEST_HOLDERS, and the landed docs binding (docsSection and
 *    sectionTables of test/helpers/census.ts) binds the docs/03 GraphPolicyCLI section and the GraphPolicyCLI ownership row B2 reads.
 *    So removing a clause, a key, a field, a cite, a needle member, a root, a holder pattern or a claim plant from every literal of
 *    this file and the roster still reds.
 *  M, the instruments rows A-C read, pinned member by member: MN the needle members (spellings and near misses), MU the uncovered
 *    matcher, MH the holder classifiers (test classes, docs/03 regions, receipt titles), MS the planter, the site lists and the
 *    surfacing reader.
 *  R, the residuals' pinned quiet rows.
 * FROZEN SHAPE (standing rule 16): ROWS pins `${id}:${pins.length}` as a literal; the judged set - every row's id, label and pins,
 * every pin's witness and the vocabularies - is held to the out-of-file roster (ROSTER_FILE); the judged set also reads this file's
 * IMPL block and refuses a roster handle inside it, so a case swapped for its own roster witness reds; a last case reads that every
 * pin's case ran to its end. Not claimed: a pin of rows M or R removed from ROWS, the literal, IMPL and the roster together (F1 and
 * F2 anchor clauses and vocabularies, not those pins).
 * RESIDUALS (named; each with a pinned quiet row in row R): R1 R-BARE-GP the bare token gp (the GraphPolicyCLI binary) is not a
 *   needle, because src names a local gp for the general-purpose agent (src/agent-types.ts), so a gp launch is invisible to rows B -
 *   the landed wb-1xvp.2 census judges every src gp call site; R2 R-COMPOSED a needle assembled at runtime from parts escapes rows B,
 *   which read bytes (rows A and C are the behavioural backstop at the three readers); R3 R-SPELLING a needle spelled outside the
 *   families (a Unicode hyphen, an inserted invisible, words split by spaces, a line break inside it) escapes rows B; R4 R-HOLDER-NAME
 *   a test file named as a census module, a census roster or a GP-family module may hold a needle as data whatever it does; R5
 *   R-HOLDER-REGION the docs/03 GraphPolicyCLI section, its ownership row and a GRAPH-POLICY receipt may hold a needle whatever they
 *   say (the section's text is the wb-1xvp.2 census's to judge); R6 R-OUTSIDE-ROOTS a file outside the clause's roots (examples/,
 *   .agents/, .pi/, the root pages, vendor/, node_modules/, .beads/), and 'uncovered' in test/ or in docs outside docs/workbench, is
 *   not judged; R7 R-NEW-READER rows A and C judge the three HX readers, so a new Pi reader of the envelope is judged only lexically
 *   by rows B, and a generic one that names no needle is quiet there; R8 R-LICENCE-WINS an uncovered label beside a runtime-licensed
 *   complete result moves nothing - the result reads complete, because HX's licence is the only absence authority (README.md:7
 *   "HyperUnix owns ... scope/coverage/provenance") and the statement's last clause keeps coverage byte-identical to the GP-less result.
 * SCOPE: the vocabularies are this cut's reading of the filing; the program lines are measured at the pin and not re-read.
 *
 * Display paths added: none. Test-only: spawns nothing and writes nothing; every planted tree and document is in memory; src, docs,
 * qa, test, the vendored SDK declarations, the landed receipt and roster, and the bead export are only read.
 */
import { createHash } from "node:crypto";
import { type Dirent, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { resultFromJson } from "@hyperunix/sdk";
import { describe, expect, it } from "vitest";
import { CapabilityError, CapabilityRegistry, type JsonValue } from "../src/workbench/capability-registry.js";
import { HYPERUNIX_EXECUTION_KINDS, type HyperUnixTopologyContext, hxLiveInvariant, hyperunixTopology } from "../src/workbench/hyperunix-observer.js";
import { nativeEvidence, nativeRefOf } from "../src/workbench/native-evidence.js";
import { type HyperUnixReader, registerHyperUnixFind } from "../src/workbench/providers/hyperunix.js";
import { docsSection, sectionTables } from "./helpers/census.js";

type Json = { [key: string]: JsonValue };

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const CENSUS = "test/workbench-hx-gp-answer-invariance-census.test.ts";
const ROSTER_FILE = "test/fixtures/hx-gp-answer-invariance-roster.json";
const BEAD_EXPORT = ".beads/issues.jsonl";
const BEAD = "wb-kjg9.1";
const PIN = "0091719d0288";
const PIN_COMMIT = "0091719d02887910fa0c2fb6693a32723e243600";
/** Clause (b)'s measurement sha (the store's trunk at filing time). */
const MEASURED_AT = "d75b68d10a1a";
const OBSERVER = "src/workbench/hyperunix-observer.ts";
const CONTRACT = "hyperunix.find/v1";
/** The gating artifact's state the filing records ("Shipped: no"); row C4 is its tripwire. */
const SHIPPED = false;

interface ProgramLine {
  readonly cite: string;
  readonly line: number;
  readonly text: string;
  readonly sha256: string;
}
/** HyperUnix-CLI docs/programs/graph-policy-optimization-2026-10-18/README.md at PIN_COMMIT, byte for byte (read-only git show). */
const README_LINES: readonly ProgramLine[] = [
  {
    cite: "README.md:7",
    line: 7,
    text: "HyperUnix owns HXG/HXQ/HXSC/HXOP/HXM semantics, providers, authority, law-regulated plan admission, scope/coverage/provenance and source mutation. Neural scores are only optional **physical plan cost estimates** or **budgeted exploration priorities**. They never justify scoped negation, invent edges, satisfy a proof obligation, or change an exact answer.",
    sha256: "11bbe91bf4d0c897ddcd8abf82bb39134b02cc127d39207b8df85c53cc42eef0",
  },
  {
    cite: "README.md:11",
    line: 11,
    text: "The native planner enumerates *semantically legal* alternatives. Export an explicitly bounded GraphDataIR with candidate plan IDs, logical/physical operator dependencies, provider capability constraints, source revision, observed selectivities, cost data provenance, relation incidence roles/polarity/ordinal, multiplicity, coverage and Unknown/NotObserved status. A pinned GP program/checkpoint returns keyed estimated costs, uncertainty and receipt. HXQ validates candidate identity and picks a plan, and later records *actual* execution cost as source-owned training data.",
    sha256: "abfa7fad217662ef3201d2323f2a16c7d295c94abe98acc6bf2b03f9cb353785",
  },
  {
    cite: "README.md:13",
    line: 13,
    text: "Exact query mode: learning changes only order/choice among legal physical operations, never completeness. Budgeted investigation: optional prioritization may be incomplete and must label covered/uncovered observations. Fallback: deterministic native planning on timeout, stale basis, model uncertainty, unsupported features or adversarial tail risk.",
    sha256: "a5df4a19175b5b0445fec1624663693fefbbc708173bebdc6351b7812d094c81",
  },
  {
    cite: "README.md:23",
    line: 23,
    text: "3. Opt-in planner consultation with deterministic fallback, budget/time caps, provenance.",
    sha256: "714baa935b44a02bfc13b390beeeb0db1790cd934ed0d78566ca34d1eb1bbeb1",
  },
];

/** Clause (a)'s GP-shaped keys, in its order; the last two are its covered/uncovered labels. */
const GP_KEYS: readonly string[] = ["plan_cost_estimate", "exploration_priority", "gp_receipt", "covered", "uncovered"];
/** The marker every planted GP value carries, so a value that surfaces is seen whatever key it surfaces under. */
const GP_MARK = "gp-census-";
/** The planted GP-shaped keys: every value claims what GP may never decide (completeness, cheapness, priority, absence). */
function gpKeys(): Json {
  return {
    plan_cost_estimate: { plan: "complete", cost: "cheap", estimate: 0, uncertainty: 0, licenses_absence: true, program: `${GP_MARK}program` },
    exploration_priority: 1,
    gp_receipt: { program: `${GP_MARK}program`, checkpoint: `${GP_MARK}checkpoint`, verdict: "complete", coverage: "complete", licenses_absence: true },
    covered: { label: "covered", observations: [`${GP_MARK}observation-1`], completeness: "complete" },
    uncovered: { label: "uncovered", observations: [`${GP_MARK}observation-2`], absent: true },
  };
}
/** Clause (a)'s projected fields: coverage and statusTone of the projection, absenceLicensed of the live verdict. */
const PROJECTED: readonly string[] = ["coverage", "statusTone", "absenceLicensed"];
interface CitedLine {
  readonly line: number;
  readonly text: string;
}
/** Clause (a)'s cites, hyperunix-observer.ts:129-130 and :216-219, each line's text trimmed. */
const CITED: readonly CitedLine[] = [
  { line: 129, text: "const kind = record(source?.execution_status)?.kind;" },
  { line: 130, text: "const licensed = record(source?.coverage_summary)?.licenses_absence;" },
  { line: 216, text: "// Absence is established only by the runtime's licence on a complete kind; transport success and a 0-row answer establish nothing." },
  { line: 217, text: "const absence = reads === 'complete' && licensed;" },
  { line: 218, text: "const coverage: NonNullable<NativeSnapshot['coverage']> = absence ? 'complete' : reads === 'failure' ? 'unknown' : 'partial';" },
  { line: 219, text: "const statusTone: Presentation['statusTone'] = absence ? 'success' : reads === 'failure' ? 'failure' : 'unknown';" },
];

interface Member {
  readonly id: string;
  readonly source: string;
}
interface Needle {
  readonly id: string;
  readonly members: readonly Member[];
}
/** Clause (b)'s needle families, in its order, each a list of members matched any case (flags "iu"), per line. */
const NEEDLES: readonly Needle[] = [
  { id: "GraphDataIR", members: [{ id: "graphdatair", source: "graph[-_. ]?data[-_. ]?ir" }] },
  { id: "graphpolicy", members: [{ id: "graphpolicy", source: "graph[-_. ]?policy" }] },
  {
    id: "GP",
    members: [
      { id: "gp-rpc-schema", source: "gp\\.rpc\\." },
      { id: "gp-code-family", source: "(?<![\\p{L}\\p{N}])gp_(?:cli|rpc|e)_" },
      { id: "plan_cost_estimate", source: "plan[-_]?cost[-_]?estimate" },
      { id: "exploration_priority", source: "exploration[-_]?priority" },
      { id: "gp_receipt", source: "gp[-_]?receipt" },
    ],
  },
];
/** Clause (b)'s word, matched any case anywhere in a line. */
const UNCOVERED = "uncovered";
const GP_ROOTS: readonly string[] = ["src", "test", "docs", "qa"];
const UNCOVERED_ROOTS: readonly string[] = ["src", "docs/workbench", "qa"];
/** Clause (c)'s reading of a claim or a label beside licenses_absence false on a complete or partial kind. */
const READING = "partial";

interface Anchor {
  readonly file: string;
  readonly token: string;
}
interface WalkRoot {
  readonly root: string;
  readonly floor: number;
  readonly anchor: Anchor;
}
/** The four walked roots (GP_ROOTS), each with a floor of files and an anchor file that must be read with its token. */
const WALKS: readonly WalkRoot[] = [
  { root: "src", floor: 100, anchor: { file: OBSERVER, token: "HyperUnix hyperunix.find reader adapter" } },
  { root: "test", floor: 450, anchor: { file: CENSUS, token: "wb-kjg9.1 (HX-GRAPH-POLICY-OPTIMIZATION-R1" } },
  { root: "docs", floor: 60, anchor: { file: "docs/workbench/03-architecture-and-ownership.md", token: "Pi carries no GraphPolicyCLI (gp) integration today." } },
  { root: "qa", floor: 50, anchor: { file: "qa/workbench/dependency-census.mjs", token: "measured dependency and SDK version census" } },
];
/** The product roots of both needle lists (clause (b)'s roots without test and docs, which carry the landed holders). */
const PRODUCT_ROOTS: readonly string[] = ["src", "qa"];

interface HolderClass {
  readonly id: string;
  readonly pattern: RegExp;
}
/** Test-tree holder classes: a census module, a census roster (the wb-csbt.3 patterns ratified by R719) and the GraphPolicy family. */
const TEST_HOLDERS: readonly HolderClass[] = [
  { id: "census-module", pattern: /^test\/[^/]+(?:-census\.test|\.census)\.ts$/ },
  { id: "census-roster", pattern: /^test\/fixtures\/[^/]+-roster\.json$/ },
  { id: "gp-family", pattern: /^test\/(?:(?:helpers|fixtures)\/)?(?:workbench-)?gp-[^/]+$/ },
];
/** The landed roster whose holder patterns R719 ratified (the first two TEST_HOLDERS). */
const RATIFIED_ROSTER = "test/fixtures/rf-tsx-worker-lifecycle-roster.json";
/** The docs holder regions: the docs/03 GraphPolicyCLI section and ownership row, and a receipt titled with a GRAPH-POLICY tag. */
const DOCS_03 = "docs/workbench/03-architecture-and-ownership.md";
const PAGE_TITLE = "03 — High-level architecture, module ownership and dataflow";
const BOUNDARY_HEADING = "GraphPolicyCLI boundary";
const OWNERSHIP_HEADING = "Ownership boundaries";
const OWNER = "GraphPolicyCLI";
const OWNER_PI_CELL = "nothing today";
const RECEIPTS = "docs/workbench/receipts";
const PROGRAM_TAG = "GRAPH-POLICY";
/** The landed receipt that measured gp's wire vocabulary and the graphpolicy spellings (an outside anchor for NEEDLES). */
const WIRE_RECEIPT = "docs/workbench/receipts/wb-1xvp.3.md";

/** Clause (c)'s claiming plants: [id, the GP-shaped keys planted]; each claims a complete or cheap plan, priority or absence. */
const CLAIMING: readonly (readonly [string, Json])[] = [
  ["complete-plan", { plan_cost_estimate: { plan: "complete", completeness: "complete", licenses_absence: true } }],
  ["cheap-plan", { plan_cost_estimate: { cost: "cheap", estimate: 0, uncertainty: 0 } }],
  ["top-priority", { exploration_priority: 1 }],
  ["receipt-complete", { gp_receipt: { verdict: "complete", coverage: "complete", licenses_absence: true } }],
  ["covered-complete", { covered: { label: "covered", completeness: "complete" } }],
];
/** Clause (c)'s uncovered label in its two shapes: the label key, and the label word as the value of a neutral label key. */
const UNCOVERED_LABELS: readonly (readonly [string, Json])[] = [
  ["label-key", { uncovered: { label: "uncovered", observations: [`${GP_MARK}observation-2`], absent: true } }],
  ["label-value", { label: "uncovered" }],
];
const SDK_DIST = "node_modules/@hyperunix/sdk/dist";
const SDK_DECLARATIONS_FLOOR = 10;
const HX_MODULES: readonly string[] = ["src/workbench/providers/hyperunix.ts", OBSERVER, "src/workbench/native-evidence.ts"];

interface Row {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly string[];
}
/** The judged rows; their shape is pinned below and held to the roster. */
const ROWS: readonly Row[] = [
  {
    id: "A",
    label: "(a) a hyperunix.find/v1 fixture with GP-shaped keys (plan_cost_estimate, exploration_priority, gp_receipt, covered/uncovered labels) projects coverage, statusTone and absenceLicensed byte-identical to the key-less result (hyperunix-observer.ts:129-130, :216-219)",
    pins: ["A1", "A2", "A3", "A4", "A5"],
  },
  {
    id: "B",
    label: "(b) census at d75b68d10a1a: 0 GraphDataIR/graphpolicy/GP identifiers in src, test, docs, qa and 0 'uncovered' in src, docs/workbench, qa (test excluded)",
    pins: ["B1", "B2", "B3"],
  },
  {
    id: "C",
    label: "(c) when shipped: GP fields claiming a complete or cheap plan with licenses_absence false still read 'partial'; an uncovered label projects 'partial' plus the word verbatim as its own facet; a label-less result projects byte-identically.",
    pins: ["C1", "C2", "C3", "C4"],
  },
  {
    id: "F",
    label: "the owner filing row of wb-kjg9.1 in the tracked bead export and the landed receipt, roster and docs binding anchor every clause, key, field, cite, needle member, root, holder pattern and claim plant the census reads",
    pins: ["F1", "F2"],
  },
  {
    id: "M",
    label: "the needle members, the uncovered matcher, the holder classifiers and the planter, site lists and surfacing reader judge their pinned inputs in order",
    pins: ["MN", "MU", "MH", "MS"],
  },
  {
    id: "R",
    label: "the named residuals R1-R8 stay pinned quiet",
    pins: ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
  },
];

function isObject(value: unknown): value is { [key: string]: unknown } {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
interface RosterPin {
  readonly id: string;
  readonly witness: unknown;
}
interface RosterRow {
  readonly id: string;
  readonly label: string;
  readonly pins: readonly RosterPin[];
}
interface Roster {
  readonly bead: string;
  readonly constants: unknown;
  readonly rows: readonly RosterRow[];
}
/** Parses the roster, refusing any field of the wrong shape by name, so no case can read a malformed roster. */
function readRoster(): Roster {
  const raw: unknown = JSON.parse(readFileSync(join(REPO, ROSTER_FILE), "utf8"));
  if (!isObject(raw) || typeof raw.bead !== "string" || !Object.hasOwn(raw, "constants") || !Array.isArray(raw.rows)) {
    throw new Error("roster must be an object with a bead, constants and a rows list");
  }
  const rows = raw.rows.map((row: unknown, index: number): RosterRow => {
    if (!isObject(row) || typeof row.id !== "string" || typeof row.label !== "string" || !Array.isArray(row.pins)) {
      throw new Error(`roster rows[${index}] needs an id, a label and a pins list`);
    }
    const pins = row.pins.map((pin: unknown, at: number): RosterPin => {
      if (!isObject(pin) || typeof pin.id !== "string" || !Object.hasOwn(pin, "witness")) throw new Error(`roster rows[${index}].pins[${at}] needs an id and a witness`);
      return { id: pin.id, witness: pin.witness };
    });
    return { id: row.id, label: row.label, pins };
  });
  return { bead: raw.bead, constants: raw.constants, rows };
}
const ROSTER = readRoster();
function rosterWitness(pin: string): unknown {
  const found = ROSTER.rows.flatMap(row => row.pins).find(entry => entry.id === pin);
  if (found === undefined) throw new Error(`the roster holds no pin ${pin}`);
  return found.witness;
}
/** The constants the roster pins beside the rows. */
function constants(): unknown {
  return {
    bead: BEAD,
    pin: PIN,
    pinCommit: PIN_COMMIT,
    measuredAt: MEASURED_AT,
    contract: CONTRACT,
    shipped: SHIPPED,
    readmeLines: README_LINES.map(({ cite, line, sha256 }) => ({ cite, line, sha256 })),
    gpKeys: GP_KEYS,
    gpMark: GP_MARK,
    gpPayload: gpKeys(),
    projected: PROJECTED,
    cited: CITED,
    needles: NEEDLES,
    uncovered: UNCOVERED,
    gpRoots: GP_ROOTS,
    uncoveredRoots: UNCOVERED_ROOTS,
    reading: READING,
    walks: WALKS,
    productRoots: PRODUCT_ROOTS,
    testHolders: TEST_HOLDERS.map(holder => ({ id: holder.id, source: holder.pattern.source })),
    ratifiedRoster: RATIFIED_ROSTER,
    docs: { page: DOCS_03, title: PAGE_TITLE, boundary: BOUNDARY_HEADING, ownership: OWNERSHIP_HEADING, owner: OWNER, piCell: OWNER_PI_CELL, receipts: RECEIPTS, tag: PROGRAM_TAG, wireReceipt: WIRE_RECEIPT },
    claiming: CLAIMING,
    uncoveredLabels: UNCOVERED_LABELS,
    sdkDist: SDK_DIST,
    sdkDeclarationsFloor: SDK_DECLARATIONS_FLOOR,
    hxModules: HX_MODULES,
  };
}

const posix = (path: string): string => path.split(sep).join("/");
const textOf = (path: string): string => readFileSync(join(REPO, path), "utf8");
const sha256 = (text: string): string => createHash("sha256").update(text).digest("hex");
const cp = (...codes: number[]): string => String.fromCodePoint(...codes);

interface Walk {
  readonly files: string[];
  readonly symlinks: string[];
}
/** Every regular file below the repository path `start`, repository-relative, in name order; symlinks are refused. */
function walk(start: string): Walk {
  const files: string[] = [];
  const symlinks: string[] = [];
  const visit = (directory: string): void => {
    const entries: Dirent[] = readdirSync(directory, { withFileTypes: true });
    entries.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) symlinks.push(posix(relative(REPO, path)));
      else if (entry.isDirectory()) visit(path);
      else if (entry.isFile()) files.push(posix(relative(REPO, path)));
    }
  };
  visit(join(REPO, start));
  return { files, symlinks };
}
type Tree = ReadonlyMap<string, string>;
interface LiveRead {
  readonly walked: { root: string; floorMet: boolean; anchorRead: boolean }[];
  readonly symlinks: string[];
  readonly tree: Tree;
}
let liveCache: LiveRead | undefined;
/** The live tree of clause (b): every regular file of the four roots with its text, read once. */
function liveRead(): LiveRead {
  if (liveCache !== undefined) return liveCache;
  const walked: { root: string; floorMet: boolean; anchorRead: boolean }[] = [];
  const symlinks: string[] = [];
  const entries: (readonly [string, string])[] = [];
  for (const root of WALKS) {
    const found = walk(root.root);
    symlinks.push(...found.symlinks);
    walked.push({ root: root.root, floorMet: found.files.length >= root.floor, anchorRead: found.files.includes(root.anchor.file) && textOf(root.anchor.file).includes(root.anchor.token) });
    for (const file of found.files) entries.push([file, textOf(file)]);
  }
  liveCache = { walked, symlinks, tree: new Map(entries) };
  return liveCache;
}

const MEMBER_PATTERNS: readonly { readonly family: string; readonly member: string; readonly pattern: RegExp }[] = NEEDLES.flatMap(needle =>
  needle.members.map(member => ({ family: needle.id, member: member.id, pattern: new RegExp(member.source, "iu") })),
);
const UNCOVERED_PATTERN = new RegExp(UNCOVERED, "iu");
/** The needle members a text carries, in NEEDLES order. */
const membersIn = (text: string): string[] => MEMBER_PATTERNS.filter(entry => entry.pattern.test(text)).map(entry => entry.member);
/** The needle families a text carries, in NEEDLES order. */
const familiesIn = (text: string): string[] => NEEDLES.filter(needle => MEMBER_PATTERNS.some(entry => entry.family === needle.id && entry.pattern.test(text))).map(needle => needle.id);
const uncoveredIn = (text: string): boolean => UNCOVERED_PATTERN.test(text);
const under = (path: string, root: string): boolean => path.startsWith(`${root}/`);

/** The holder class of a test-tree path, or null. */
function testHolderOf(path: string): string | null {
  return TEST_HOLDERS.find(holder => holder.pattern.test(path))?.id ?? null;
}
const cellsOf = (line: string): string[] => line.split("|").slice(1, -1).map(cell => cell.trim());
/** The 1-based line numbers of a docs page that sit in a holder region, and the regions found. */
function docHolderLines(path: string, text: string): { lines: Set<number>; regions: string[] } {
  const lines = text.split("\n");
  const held = new Set<number>();
  const regions: string[] = [];
  const name = path.slice(`${RECEIPTS}/`.length);
  if (under(path, RECEIPTS) && !name.includes("/") && name.endsWith(".md")) {
    const id = name.slice(0, -".md".length);
    const title = new RegExp(`^# ${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}: \\[[A-Z0-9-]*${PROGRAM_TAG}[A-Z0-9-]*-R\\d+\\] `);
    if (title.test(lines[0] ?? "")) {
      for (let line = 1; line <= lines.length; line++) held.add(line);
      regions.push("gp-receipt");
    }
  }
  if (path === DOCS_03) {
    const headings = lines.flatMap((line, index) => (line === `## ${BOUNDARY_HEADING}` ? [index] : []));
    const start = headings.length === 1 ? headings[0] : undefined;
    if (start !== undefined) {
      let end = lines.length;
      for (let index = start + 1; index < lines.length; index++) {
        if (/^#{1,2} /.test(lines[index] ?? "")) {
          end = index;
          break;
        }
      }
      for (let index = start; index < end; index++) held.add(index + 1);
      regions.push("boundary-section");
    }
    lines.forEach((line, index) => {
      const cells = cellsOf(line);
      if (line.startsWith("|") && cells[1] === OWNER && (cells[2] ?? "").startsWith(OWNER_PI_CELL)) {
        held.add(index + 1);
        regions.push("ownership-row");
      }
    });
  }
  return { lines: held, regions };
}

/** B1's judge: every needle family and every 'uncovered' in a product-root file, as `<path>:<line> <family|uncovered>`. */
function productFindings(tree: Tree): string[] {
  const findings: string[] = [];
  for (const [path, text] of tree) {
    if (!PRODUCT_ROOTS.some(root => under(path, root))) continue;
    text.split("\n").forEach((line, index) => {
      for (const family of familiesIn(line)) findings.push(`${path}:${index + 1} ${family}`);
      if (uncoveredIn(line)) findings.push(`${path}:${index + 1} ${UNCOVERED}`);
    });
  }
  return findings;
}
/** B2's judge: a docs line holding a needle, or 'uncovered' under docs/workbench, outside every holder region. */
function docsFindings(tree: Tree): { findings: string[]; held: string[] } {
  const findings: string[] = [];
  const held: string[] = [];
  for (const [path, text] of tree) {
    if (!under(path, "docs")) continue;
    const holder = docHolderLines(path, text);
    const workbench = UNCOVERED_ROOTS.some(root => root.startsWith("docs") && under(path, root));
    text.split("\n").forEach((line, index) => {
      const words = [...familiesIn(line), ...(workbench && uncoveredIn(line) ? [UNCOVERED] : [])];
      if (words.length === 0) return;
      if (holder.lines.has(index + 1)) held.push(`${path}:${index + 1}`);
      else findings.push(`${path}:${index + 1} ${words.join(",")}: outside-holder`);
    });
  }
  return { findings, held };
}
/** B3's judge: a test-tree file holding a needle family outside every holder class. */
function testFindings(tree: Tree): { findings: string[]; held: string[] } {
  const findings: string[] = [];
  const held: string[] = [];
  for (const [path, text] of tree) {
    if (!under(path, "test")) continue;
    const families = familiesIn(text);
    if (families.length === 0) continue;
    const holder = testHolderOf(path);
    if (holder === null) findings.push(`${path} ${families.join(",")}: outside-holder`);
    else held.push(`${path} ${holder}`);
  }
  return { findings, held };
}
const plantTree = (entries: readonly (readonly [string, string])[]): Tree => new Map(entries);

const WS = "/workspace/hx-gp-answer-invariance-census";
const BINARY = "ab".repeat(32);
const CONTEXT: HyperUnixTopologyContext = {
  scope: { workspace: WS, principal: "local-operator:census" },
  target: { kind: "hx.fs/regular-file", root: "src" },
  capturedAt: "2026-10-23T08:40:00Z",
  observedAt: "2026-10-23T08:40:01Z",
};
const INPUT: JsonValue = { kind: "hx.fs/regular-file", root: "src" };
const GRANTS = ["hyperunix:read"];
const certificate = (batch_id: string): Json => ({
  mode: "opportunistic",
  cause: { cause: "other", detail: "No_change_exclusion" },
  scope: { path: [], scope: "fs-subtree" },
  target: { target: "relation-expansion" },
  provider: "hx.fs/builtin",
  stream: "hx-fs",
  batch_id,
  body: { mode: "opportunistic" },
});
type Path = readonly (string | number)[];
/** The value at `path` below `value`, which must be an object. */
function objectAt(value: JsonValue, path: Path): Json {
  let at: JsonValue = value;
  for (const step of path) {
    const next: JsonValue | undefined = typeof step === "number" ? (Array.isArray(at) ? at[step] : undefined) : isObject(at) ? (at as Json)[step] : undefined;
    if (next === undefined) throw new Error(`no value at ${path.join(".")}`);
    at = next;
  }
  if (!isObject(at)) throw new Error(`the value at ${path.join(".")} is not an object`);
  return at as Json;
}
/** A copy of `value` with `keys` planted in the object at `path`. */
function planted(value: Json, path: Path, keys: Json): Json {
  const copy = structuredClone(value);
  Object.assign(objectAt(copy, path), structuredClone(keys));
  return copy;
}
const siteName = (path: Path): string => (path.length === 0 ? "top" : path.map((step, index) => (typeof step === "number" ? `[${step}]` : index === 0 ? step : `.${step}`)).join(""));
/** Whether the object at `path` below `value` holds every planted key with its planted value: the plant is read back, never assumed. */
const carries = (value: Json, path: Path, keys: Json): boolean => Object.entries(keys).every(([key, planted]) => JSON.stringify(objectAt(value, path)[key]) === JSON.stringify(planted));
/** Whether no planted key already exists at `path` below `value`, so a plant never overwrites a field the reader reads. */
const fresh = (value: Json, path: Path, keys: Json): boolean => Object.keys(keys).every(key => !Object.hasOwn(objectAt(value, path), key));
/** Every object `value` holds down to `depth` keys, read from the value itself: the value, each object-valued key and the first
 * item of each list of objects, so a site list is never typed by hand. */
function objectPaths(value: Json, depth: number): Path[] {
  const paths: Path[] = [[]];
  const visit = (at: Json, path: Path, left: number): void => {
    for (const [key, child] of Object.entries(at)) {
      if (isObject(child)) {
        paths.push([...path, key]);
        if (left > 1) visit(child as Json, [...path, key], left - 1);
      } else if (Array.isArray(child) && isObject(child[0])) paths.push([...path, key, 0]);
    }
  };
  visit(value, [], depth);
  return paths;
}
/** A hyperunix.find/v1 envelope as the registered provider returns it, for one kind and licence. */
function reading(kind: string, licensed: boolean): Json {
  return {
    contract: CONTRACT,
    source: {
      representation: "hyperunix.result/1",
      operation: "find",
      execution_status: { kind },
      coverage_summary: { licenses_absence: licensed },
      rows: [],
      rows_retained: true,
      coverage: [certificate("b1"), certificate("b2")],
      evidence: { support_ids: ["support-1"], derivation_handles: [] },
      extensions: {},
    },
    workspaceRoot: WS,
    runtime: { version: "0.1.0", binarySha256: BINARY },
  };
}
/** Every base reading: each kind of the adapter's exported closed kind set, unlicensed and runtime-licensed. */
const BASES: readonly (readonly [string, boolean, Json])[] = HYPERUNIX_EXECUTION_KINDS.flatMap(kind => [false, true].map(licensed => [kind, licensed, reading(kind, licensed)] as const));
/** Every object of the envelope a reader could read (two keys deep), top level included. */
const SITES: readonly Path[] = objectPaths(reading("incomplete", false), 2);
/** Whether a value's JSON carries a GP key, a GP_MARK value or the word uncovered. */
function surfaced(value: unknown): boolean {
  const text = JSON.stringify(value) ?? "";
  return familiesIn(text).length > 0 || uncoveredIn(text) || text.includes(GP_MARK) || text.includes('"covered"');
}
/** The reader adapter's outcome for a reading: its projection, or its typed refusal (category and message). */
function topologyOf(value: JsonValue): unknown {
  try {
    return { projected: hyperunixTopology(value, CONTEXT) };
  } catch (error) {
    if (error instanceof CapabilityError) return { refused: { category: error.category, message: error.message } };
    throw error;
  }
}
/** The fields clause (a) names, read from one outcome and one live verdict: coverage/statusTone, or the refusal's category. */
function readingOf(outcome: unknown, verdict: { readonly absenceLicensed: boolean }): string {
  if (isObject(outcome) && isObject(outcome.projected)) {
    const snapshots = (outcome.projected as { snapshots?: readonly { coverage?: string; node?: { statusTone?: string } }[] }).snapshots ?? [];
    const snapshot = snapshots[0];
    return `${snapshot?.coverage}/${snapshot?.node?.statusTone}/${verdict.absenceLicensed}`;
  }
  if (isObject(outcome) && isObject(outcome.refused)) return `refused:${String(outcome.refused.category)}/${verdict.absenceLicensed}`;
  return "unread";
}
const json = (value: unknown): string => JSON.stringify(value) ?? "undefined";
/** The vendored SDK's hyperunix.result/1 document for an unlicensed incomplete find. */
function sdkDocument(): Json {
  return {
    representation: "hyperunix.result/1",
    operation: "find",
    rows: [],
    rows_retained: true,
    coverage: [certificate("b1"), certificate("b2")],
    status: { exit_code: 0, signal: null, streams: [{ name: "hx-fs", frames: 2, ended: true, mode: "observation" }], terminal_reached: true, frames_total: 2 },
    execution_status: { kind: "incomplete", diagnostic_code: "HX-COVERAGE-INCOMPLETE" },
    diagnostics: [],
    view: null,
    cost: null,
    transport: { started_at: "2026-10-23T08:39:59.000Z", startup_latency_s: 0.01, process_duration_s: 0.2, stdout_bytes: 1000, stderr_bytes: 0, stderr_bytes_retained: 0, frames: 2 },
    workspace_root: WS,
    terminal: "complete",
    truth: null,
    coverage_summary: { modes: ["opportunistic"], completeness: "incomplete", licenses_absence: false, certificates_license_absence: false, incomplete_regions: [], result_coverage: null, answer_count: 0 },
    evidence: { support_ids: [], evidence_classes: [], derivation_handles: [], providers: [], provider_versions: {} },
    digest: null,
    digest_source: "absent",
    execution_id: null,
    budget_dimension: null,
    extensions: {},
  };
}
/** The SDK documents of row A2: the unlicensed incomplete find and the runtime-licensed complete-empty find (the one success). */
const SDK_DOCUMENTS: readonly (readonly [string, Json])[] = [
  ["incomplete-unlicensed", sdkDocument()],
  [
    "complete-empty-licensed",
    {
      ...sdkDocument(),
      execution_status: { kind: "complete-empty", diagnostic_code: null },
      coverage_summary: { modes: ["complete-within-scope"], completeness: "complete", licenses_absence: true, certificates_license_absence: true, incomplete_regions: [], result_coverage: null, answer_count: 0 },
    },
  ],
];
/** Every object of the SDK document (one key deep) a successor could carry the keys in, top level included. */
const SDK_SITES: readonly Path[] = objectPaths(sdkDocument(), 1);
/** The registered hyperunix.find provider's own output, through CapabilityRegistry.invoke, for an injected SDK document. */
async function providerOutput(document: Json, served: string[]): Promise<JsonValue> {
  const reader: HyperUnixReader = {
    async find() {
      served.push("find");
      return resultFromJson(document);
    },
    async runtime() {
      served.push("runtime");
      return { version: "0.1.0", binarySha256: BINARY };
    },
    async close() {},
  };
  const registry = new CapabilityRegistry();
  registerHyperUnixFind(registry, reader, WS);
  return registry.invoke("hyperunix.find", INPUT, { grants: GRANTS, signal: new AbortController().signal });
}

interface ExportRow {
  readonly id: string;
  readonly notes: string;
}
/** The tracked bead export's row for `id`. */
function exportRow(id: string): ExportRow {
  for (const line of textOf(BEAD_EXPORT).split("\n")) {
    if (!line.includes(`"id":"${id}"`)) continue;
    const row: unknown = JSON.parse(line);
    if (isObject(row) && row.id === id && typeof row.notes === "string") return { id, notes: row.notes };
  }
  throw new Error(`the bead export holds no row for ${id}`);
}
/** The text between `from` and `to` in `text`, both required. */
function between(text: string, from: string, to: string): string {
  const start = text.indexOf(from);
  const end = start < 0 ? -1 : text.indexOf(to, start + from.length);
  if (start < 0 || end < 0) throw new Error(`the text holds no "${from}" ... "${to}" span`);
  return text.slice(start + from.length, end);
}
/** A planted docs/03 page: the title, an ownership table with the GraphPolicyCLI row and a second GraphPolicyCLI row whose Pi cell
 * does more, the boundary section with a needle, and a later section with a needle. */
const PLANTED_DOCS_03 = [
  `# ${PAGE_TITLE}`,
  "",
  `## ${OWNERSHIP_HEADING}`,
  "",
  "| Concern | Authoritative owner | Workbench may do |",
  "| --- | --- | --- |",
  `| Learned scores | ${OWNER} | ${OWNER_PI_CELL} (no gp seam is registered) |`,
  `| Plan costs | ${OWNER} | reads plan_cost_estimate from hx results |`,
  "",
  `## ${BOUNDARY_HEADING}`,
  "",
  "Pi names GraphDataIR here as posture.",
  "",
  "## Later section",
  "",
  "Pi reads graphpolicy scores.",
].join("\n");

/** MN: each needle member's spellings and near misses, with the members each text carries. */
const NEEDLE_CASES: readonly (readonly [string, readonly string[]])[] = [
  ["GraphDataIR", ["graphdatair"]],
  ["graph_data_ir", ["graphdatair"]],
  ["exportGraphDataIRBounded()", ["graphdatair"]],
  ["graph data ir", ["graphdatair"]],
  ["graph data", []],
  ["GraphPolicyCLI", ["graphpolicy"]],
  ["graph-policy-cli", ["graphpolicy"]],
  ["graphpolicy.rpc.v1", ["graphpolicy"]],
  ["Graph Policy", ["graphpolicy"]],
  ["graph policies", []],
  ["gp.rpc.reply/v1", ["gp-rpc-schema"]],
  ["gp rpc --stdio", []],
  ["GP_CLI_UNKNOWN_COMMAND", ["gp-code-family"]],
  ["GP_RPC_TIMEOUT", ["gp-code-family"]],
  ["GP_E_BUDGET", ["gp-code-family"]],
  ["XGP_CLI_", []],
  ["GP_OTHER_", []],
  ["plan_cost_estimate", ["plan_cost_estimate"]],
  ["planCostEstimate", ["plan_cost_estimate"]],
  ["plan-cost-estimate", ["plan_cost_estimate"]],
  ["plan cost estimate", []],
  ["exploration_priority", ["exploration_priority"]],
  ["explorationPriority", ["exploration_priority"]],
  ["exploration priority", []],
  ["gp_receipt", ["gp_receipt"]],
  ["gpReceipt", ["gp_receipt"]],
  ["gp receipt", []],
  ['const gp = agents.get("general-purpose");', []],
];
/** MU: the uncovered matcher's spellings and near misses. */
const UNCOVERED_CASES: readonly (readonly [string, boolean])[] = [
  ["uncovered", true],
  ["Uncovered observations", true],
  ["UNCOVERED", true],
  ["uncoveredObservations", true],
  ["covered", false],
  ["recovered", false],
  ["discovered", false],
  ["un-covered", false],
];
/** MH: test-tree paths and their holder class. */
const TEST_HOLDER_CASES: readonly (readonly [string, string | null])[] = [
  ["test/workbench-plant-census.test.ts", "census-module"],
  ["test/workbench-plant.census.ts", "census-module"],
  ["test/fixtures/plant-roster.json", "census-roster"],
  ["test/workbench-gp-plant.test.ts", "gp-family"],
  ["test/helpers/gp-plant.ts", "gp-family"],
  ["test/fixtures/gp-plant.json", "gp-family"],
  ["test/workbench-plant.test.ts", null],
  ["test/helpers/plant-census.ts", null],
  ["test/fixtures/plant.json", null],
  ["test/nested/workbench-plant-census.test.ts", null],
  ["test/workbench-gpx.test.ts", null],
  ["src/workbench/gp-plant.ts", null],
];
const receiptTitle = (id: string, tag: string): string => `# ${id}: [${tag}] a planted title\n\nbody`;

/** The functions that read the subject: every case must name one, so a case returning a constant witness reds (direct names only). */
const READERS: readonly string[] = [
  "topologyOf",
  "providerOutput",
  "nativeEvidence",
  "hxLiveInvariant",
  "textOf",
  "liveRead",
  "readdirSync",
  "productFindings",
  "docsFindings",
  "testFindings",
  "membersIn",
  "familiesIn",
  "uncoveredIn",
  "testHolderOf",
  "docHolderLines",
  "exportRow",
  "surfaced",
  "planted",
];
const REACHED = new Set<string>();
/** Each pin's case: it asserts its own outcome and returns the witness the roster holds for it. */
const IMPL: Readonly<Record<string, () => Promise<unknown>>> = {
  A1: async () => {
    const keys = gpKeys();
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = topologyOf(base);
      const sites = SITES.map(site => {
        const input = planted(base, site, keys);
        const outcome = topologyOf(input);
        expect(outcome, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        return { fresh: fresh(base, site, keys), carried: carries(input, site, keys), identical: json(outcome) === json(expected), surfaced: surfaced(outcome) };
      });
      return {
        kind,
        licensed,
        reading: readingOf(expected, hxLiveInvariant(base)),
        baseSurfaced: surfaced(expected),
        fresh: sites.filter(site => site.fresh).length,
        carried: sites.filter(site => site.carried).length,
        identical: sites.filter(site => site.identical).length,
        surfaced: sites.filter(site => site.surfaced).length,
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, baseSurfaced: false, fresh: SITES.length, carried: SITES.length, identical: SITES.length, surfaced: 0 });
    const controls = { surfaced: surfaced({ planted: keys }), keys: Object.keys(keys) };
    expect(controls, "the surfacing reader sees the plant, and the plant is clause (a)'s keys").toStrictEqual({ surfaced: true, keys: [...GP_KEYS] });
    return { sites: SITES.map(siteName), rows, controls };
  },
  A2: async () => {
    const keys = gpKeys();
    const documents = [];
    expect(SDK_SITES.map(siteName), "the SDK document's lossless sidecar is among the sites").toContain("extensions");
    for (const [id, document] of SDK_DOCUMENTS) {
      const base = await providerOutput(document, []);
      const baseProjection = topologyOf(base);
      const baseEvidence = nativeEvidence("hyperunix.find", base);
      const baseVerdict = hxLiveInvariant(base);
      const sites = [];
      for (const site of SDK_SITES) {
        const served: string[] = [];
        const input = planted(document, site, keys);
        expect(fresh(document, site, keys) && carries(input, site, keys), `${id}: the SDK document carries the fresh keys at ${siteName(site)}`).toBe(true);
        const output = await providerOutput(input, served);
        const source = isObject(output) && isObject(output.source) ? (output.source as Json) : {};
        const sidecar = json(source.extensions);
        const withoutSidecar = isObject(output) ? { ...(output as Json), source: { ...source, extensions: {} } } : output;
        const projection = topologyOf(output);
        const evidence = nativeEvidence("hyperunix.find", output);
        const verdict = hxLiveInvariant(output);
        expect(projection, `${id}: the reader over the provider output for ${siteName(site)}`).toStrictEqual(baseProjection);
        expect(withoutSidecar, `${id}: the provider output for ${siteName(site)} beside its sidecar`).toStrictEqual(base);
        expect(evidence, `${id}: native evidence for ${siteName(site)}`).toStrictEqual(baseEvidence);
        expect(verdict, `${id}: the live verdict for ${siteName(site)}`).toStrictEqual(baseVerdict);
        sites.push({
          site: siteName(site),
          served,
          sidecar: sidecar === json(keys) ? "echoed" : sidecar === "{}" ? "dropped" : `other ${sidecar}`,
          identical: json(projection) === json(baseProjection),
          surfaced: surfaced(projection) || surfaced(evidence) || surfaced(verdict),
        });
      }
      expect(sites.map(site => [site.site, site.sidecar]), `${id}: the SDK keeps the keys only in its sidecar`).toEqual(SDK_SITES.map(site => [siteName(site), siteName(site) === "extensions" ? "echoed" : "dropped"]));
      for (const site of sites) expect({ served: site.served, identical: site.identical, surfaced: site.surfaced }, `${id} at ${site.site}`).toStrictEqual({ served: ["find", "runtime"], identical: true, surfaced: false });
      documents.push({ id, reading: readingOf(baseProjection, baseVerdict), baseSurfaced: surfaced(base), sites });
    }
    expect(documents.map(entry => [entry.id, entry.reading, entry.baseSurfaced])).toStrictEqual([
      ["incomplete-unlicensed", "partial/unknown/false", false],
      ["complete-empty-licensed", "complete/success/true", false],
    ]);
    return { sites: SDK_SITES.map(siteName), documents };
  },
  A3: async () => {
    const keys = gpKeys();
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = nativeEvidence("hyperunix.find", base);
      const sites = SITES.map(site => {
        const evidence = nativeEvidence("hyperunix.find", planted(base, site, keys));
        expect(evidence, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        expect(nativeRefOf(evidence)).toStrictEqual(nativeRefOf(expected));
        return { identical: json(evidence) === json(expected), surfaced: surfaced(evidence) };
      });
      return {
        kind,
        licensed,
        domainStatus: expected.domainStatus ?? null,
        evidenceRefs: expected.evidenceRefs ?? null,
        identical: sites.filter(site => site.identical).length,
        surfaced: sites.filter(site => site.surfaced).length,
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, domainStatus: row.kind, identical: SITES.length, surfaced: 0 });
    return { rows };
  },
  A4: async () => {
    const keys = gpKeys();
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = hxLiveInvariant(base);
      const sites = SITES.map(site => {
        const verdict = hxLiveInvariant(planted(base, site, keys));
        expect(verdict, `${kind}/${licensed} at ${siteName(site)}`).toStrictEqual(expected);
        return { identical: json(verdict) === json(expected), surfaced: surfaced(verdict) };
      });
      return {
        kind,
        licensed,
        holds: expected.holds,
        violations: [...expected.violations],
        absenceLicensed: expected.absenceLicensed,
        identical: sites.filter(site => site.identical).length,
        surfaced: sites.filter(site => site.surfaced).length,
      };
    });
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, identical: SITES.length, surfaced: 0 });
    expect(rows.filter(row => row.absenceLicensed).map(row => `${row.kind}/${row.licensed}`), "absence is licensed only by the runtime on a complete kind").toEqual(["complete/true", "complete-empty/true"]);
    return { rows };
  },
  A5: async () => {
    const lines = textOf(OBSERVER).split("\n");
    const cited = CITED.map(entry => {
      const actual = (lines[entry.line - 1] ?? "").trim();
      expect(actual, `${OBSERVER}:${entry.line}`).toBe(entry.text);
      return { line: entry.line, holds: actual === entry.text };
    });
    return { cited };
  },
  B1: async () => {
    const live = liveRead();
    const findings = productFindings(live.tree);
    expect(findings, "a needle or 'uncovered' on the product surface (src, qa)").toEqual([]);
    const walked = live.walked.filter(entry => PRODUCT_ROOTS.includes(entry.root));
    expect(walked).toStrictEqual(PRODUCT_ROOTS.map(root => ({ root, floorMet: true, anchorRead: true })));
    const symlinks = live.symlinks.filter(path => PRODUCT_ROOTS.some(root => under(path, root)));
    expect(symlinks).toEqual([]);
    const controls = productFindings(
      plantTree([
        ["src/workbench/plant.ts", "const ir = 'GraphDataIR';\nconst score = source.plan_cost_estimate;"],
        ["qa/workbench/plant.mjs", "// Uncovered observations\nimport 'graph-policy-cli';"],
        ["docs/workbench/plant.md", "GraphDataIR"],
        ["test/workbench-plant.test.ts", "uncovered"],
      ]),
    );
    expect(controls, "B1's judge reads its controls").toEqual(["src/workbench/plant.ts:1 GraphDataIR", "src/workbench/plant.ts:2 GP", "qa/workbench/plant.mjs:1 uncovered", "qa/workbench/plant.mjs:2 graphpolicy"]);
    return { walked, symlinks, findings, controls };
  },
  B2: async () => {
    const live = liveRead();
    const docsTree = new Map([...live.tree].filter(([path]) => under(path, "docs")));
    const judged = docsFindings(docsTree);
    expect(judged.findings, "a docs needle, or an 'uncovered' under docs/workbench, outside every holder region").toEqual([]);
    const walked = live.walked.filter(entry => entry.root === "docs");
    expect(walked).toStrictEqual([{ root: "docs", floorMet: true, anchorRead: true }]);
    const symlinks = live.symlinks.filter(path => under(path, "docs"));
    expect(symlinks).toEqual([]);
    const regions = docHolderLines(DOCS_03, docsTree.get(DOCS_03) ?? "").regions;
    expect(regions, "docs/03 binds its boundary section and its ownership row").toEqual(["boundary-section", "ownership-row"]);
    const receiptHeld = judged.held.some(entry => under(entry, RECEIPTS));
    expect(receiptHeld, "a GRAPH-POLICY receipt holds a needle (the live non-vacuity floor)").toBe(true);
    const controls = docsFindings(
      plantTree([
        [DOCS_03, PLANTED_DOCS_03],
        ["docs/workbench/09-plant.md", "Pi exports a GraphDataIR."],
        ["docs/workbench/label-plant.md", "an uncovered observation"],
        [`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.1", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9").replace("body", "GraphDataIR and uncovered")],
        [`${RECEIPTS}/wb-plant.2.md`, receiptTitle("wb-plant.2", "HX-OTHER-PROGRAM-R1").replace("body", "graphpolicy")],
        [`${RECEIPTS}/wb-plant.3.md`, receiptTitle("wb-plant.9", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9").replace("body", "gp_receipt")],
        ["docs/programs/plant.md", "uncovered, but plan_cost_estimate"],
      ]),
    );
    expect(controls, "B2's judge reads its controls").toStrictEqual({
      findings: [
        `${DOCS_03}:8 graphpolicy,GP: outside-holder`,
        `${DOCS_03}:16 graphpolicy: outside-holder`,
        "docs/workbench/09-plant.md:1 GraphDataIR: outside-holder",
        "docs/workbench/label-plant.md:1 uncovered: outside-holder",
        `${RECEIPTS}/wb-plant.2.md:3 graphpolicy: outside-holder`,
        `${RECEIPTS}/wb-plant.3.md:1 graphpolicy: outside-holder`,
        `${RECEIPTS}/wb-plant.3.md:3 GP: outside-holder`,
        "docs/programs/plant.md:1 GP: outside-holder",
      ],
      held: [`${DOCS_03}:7`, `${DOCS_03}:10`, `${DOCS_03}:12`, `${RECEIPTS}/wb-plant.1.md:1`, `${RECEIPTS}/wb-plant.1.md:3`],
    });
    return { walked, symlinks, findings: judged.findings, regions, receiptHeld, controls };
  },
  B3: async () => {
    const live = liveRead();
    const testTree = new Map([...live.tree].filter(([path]) => under(path, "test")));
    const judged = testFindings(testTree);
    expect(judged.findings, "a test file holding a needle outside every holder class").toEqual([]);
    const walked = live.walked.filter(entry => entry.root === "test");
    expect(walked).toStrictEqual([{ root: "test", floorMet: true, anchorRead: true }]);
    const symlinks = live.symlinks.filter(path => under(path, "test"));
    expect(symlinks).toEqual([]);
    const self = [CENSUS, ROSTER_FILE].map(file => ({ file, walked: testTree.has(file), families: familiesIn(testTree.get(file) ?? ""), holder: testHolderOf(file) }));
    expect(self, "this census and its roster are walked and judged, never exempt").toStrictEqual([
      { file: CENSUS, walked: true, families: NEEDLES.map(needle => needle.id), holder: "census-module" },
      { file: ROSTER_FILE, walked: true, families: NEEDLES.map(needle => needle.id), holder: "census-roster" },
    ]);
    const familyHeld = judged.held.some(entry => entry.endsWith(" gp-family"));
    expect(familyHeld, "a landed GraphPolicy-family module holds a needle (the live non-vacuity floor)").toBe(true);
    const controls = testFindings(
      plantTree([
        ["test/workbench-plant.test.ts", "const key = 'gp_receipt';"],
        ["test/helpers/plant.ts", "GraphDataIR"],
        ["test/fixtures/plant.json", '{"a": "graph-policy"}'],
        ["test/workbench-plant-census.test.ts", "GraphDataIR"],
        ["test/fixtures/plant-roster.json", "plan_cost_estimate"],
        ["test/helpers/gp-plant.ts", "graphpolicy"],
        ["test/workbench-quiet.test.ts", "uncovered"],
      ]),
    );
    expect(controls, "B3's judge reads its controls").toStrictEqual({
      findings: ["test/workbench-plant.test.ts GP: outside-holder", "test/helpers/plant.ts GraphDataIR: outside-holder", "test/fixtures/plant.json graphpolicy: outside-holder"],
      held: ["test/workbench-plant-census.test.ts census-module", "test/fixtures/plant-roster.json census-roster", "test/helpers/gp-plant.ts gp-family"],
    });
    return { walked, symlinks, findings: judged.findings, self, familyHeld, controls };
  },
  C1: async () => {
    const rows = BASES.filter(([, licensed]) => !licensed).map(([kind, , base]) => {
      const expected = topologyOf(base);
      const verdict = hxLiveInvariant(base);
      let plants = 0;
      let identical = 0;
      let surfacedCount = 0;
      for (const [id, claim] of CLAIMING) {
        for (const site of SITES) {
          const input = planted(base, site, claim);
          expect(fresh(base, site, claim) && carries(input, site, claim), `${kind} ${id} planted fresh at ${siteName(site)}`).toBe(true);
          const outcome = topologyOf(input);
          const live = hxLiveInvariant(input);
          expect(outcome, `${kind} ${id} at ${siteName(site)}`).toStrictEqual(expected);
          expect(live, `${kind} ${id} at ${siteName(site)}: the live verdict`).toStrictEqual(verdict);
          plants++;
          if (json(outcome) === json(expected) && json(live) === json(verdict)) identical++;
          if (surfaced(outcome) || surfaced(live)) surfacedCount++;
        }
      }
      return { kind, reading: readingOf(expected, verdict), plants, identical, surfaced: surfacedCount };
    });
    const total = CLAIMING.length * SITES.length;
    for (const row of rows) expect(row, row.kind).toStrictEqual({ ...row, plants: total, identical: total, surfaced: 0 });
    const partial = `${READING}/unknown/false`;
    expect(Object.fromEntries(rows.map(row => [row.kind, row.reading])), "beside licenses_absence false a complete or partial kind reads partial, a failure stays a failure").toStrictEqual({
      complete: partial,
      "complete-empty": partial,
      incomplete: partial,
      "budget-exhausted": partial,
      cancelled: partial,
      "view-invalidated": partial,
      "provider-failed": "unknown/failure/false",
      "schema-failed": "unknown/failure/false",
      "internal-failed": "unknown/failure/false",
      "protocol-failed": "unknown/failure/false",
      "usage-error": "unknown/failure/false",
      "mutation-rejected": "refused:validation/false",
      "mutation-partial": "refused:validation/false",
    });
    return { claims: CLAIMING.map(([id]) => id), rows };
  },
  C2: async () => {
    const rows = BASES.map(([kind, licensed, base]) => {
      const expected = topologyOf(base);
      const verdict = hxLiveInvariant(base);
      const evidence = nativeEvidence("hyperunix.find", base);
      let plants = 0;
      let identical = 0;
      let worded = 0;
      for (const [id, label] of UNCOVERED_LABELS) {
        for (const site of SITES) {
          const input = planted(base, site, label);
          expect(fresh(base, site, label) && carries(input, site, label), `${kind}/${licensed} ${id} planted fresh at ${siteName(site)}`).toBe(true);
          const outcome = topologyOf(input);
          const live = hxLiveInvariant(input);
          const projected = nativeEvidence("hyperunix.find", input);
          expect(outcome, `${kind}/${licensed} ${id} at ${siteName(site)}`).toStrictEqual(expected);
          expect(live).toStrictEqual(verdict);
          expect(projected).toStrictEqual(evidence);
          plants++;
          if (json(outcome) === json(expected) && json(live) === json(verdict) && json(projected) === json(evidence)) identical++;
          if (uncoveredIn(json(outcome)) || uncoveredIn(json(live)) || uncoveredIn(json(projected))) worded++;
        }
      }
      return { kind, licensed, reading: readingOf(expected, verdict), plants, identical, worded };
    });
    const total = UNCOVERED_LABELS.length * SITES.length;
    for (const row of rows) expect(row, `${row.kind}/${row.licensed}`).toStrictEqual({ ...row, plants: total, identical: total, worded: 0 });
    expect(rows.filter(row => !row.licensed && row.reading.startsWith(`${READING}/`)).map(row => row.kind), "an uncovered label beside licenses_absence false reads partial").toEqual(["complete", "complete-empty", "incomplete", "budget-exhausted", "cancelled", "view-invalidated"]);
    const facetToday = rows.every(row => row.worded === 0) ? "absent" : "present";
    return { labels: UNCOVERED_LABELS.map(([id]) => id), rows, facetToday };
  },
  C3: async () => {
    const rows = BASES.map(([kind, licensed, base]) => {
      const outcome = topologyOf(base);
      const again = topologyOf(structuredClone(base));
      expect(json(again), `${kind}/${licensed} reads the same from a fresh copy`).toBe(json(outcome));
      const verdict = hxLiveInvariant(base);
      return {
        kind,
        licensed,
        reading: readingOf(outcome, verdict),
        topology: sha256(json(outcome)).slice(0, 16),
        evidence: sha256(json(nativeEvidence("hyperunix.find", base))).slice(0, 16),
        verdict: sha256(json(verdict)).slice(0, 16),
      };
    });
    expect(rows.filter(row => row.reading === "complete/success/true").map(row => `${row.kind}/${row.licensed}`), "the GP-less result is complete only on a runtime-licensed complete kind").toEqual(["complete/true", "complete-empty/true"]);
    return { rows };
  },
  C4: async () => {
    const declarations = readdirSync(join(REPO, SDK_DIST)).filter(name => name.endsWith(".d.ts")).sort();
    const sdkVersion: unknown = JSON.parse(textOf("node_modules/@hyperunix/sdk/package.json")).version;
    const words = (text: string): string[] => [...familiesIn(text), ...(uncoveredIn(text) ? [UNCOVERED] : [])];
    const hits = [...declarations.map(name => `${SDK_DIST}/${name}`), ...HX_MODULES].flatMap(file => words(textOf(file)).map(word => `${file}: ${word}`));
    const sidecarDeclared = textOf(`${SDK_DIST}/result.d.ts`).includes("readonly extensions: Readonly<Record<string, JsonValue>>;");
    const controls = ["  readonly plan_cost_estimate: number;", "  readonly explorationPriority?: number;", "  gpReceipt: GpReceipt;", "  readonly graphDataIR: string;", "  readonly uncovered: readonly string[];"].map(words);
    const witness = { sdkVersion, declarationsFloorMet: declarations.length >= SDK_DECLARATIONS_FLOOR, sidecarDeclared, shipped: SHIPPED, hits, controls };
    expect(witness, "a GP field named by the vendored SDK or an HX module: the gate has shipped, and the verbatim facets are owed").toStrictEqual({
      sdkVersion: "0.1.0",
      declarationsFloorMet: true,
      sidecarDeclared: true,
      shipped: false,
      hits: [],
      controls: [["GP"], ["GP"], ["GP"], ["GraphDataIR"], [UNCOVERED]],
    });
    return witness;
  },
  F1: async () => {
    const notes = exportRow(BEAD).notes;
    const stated = [`(a) ${between(notes, "Acceptance: (a) ", "; (b) ")}`, `(b) ${between(notes, "; (b) ", "; (c) ")}`, `(c) ${between(notes, "; (c) ", "\nNot P0")}`];
    const [a = "", b = "", c = ""] = stated;
    const clauses = stated.map(clause => ({ clause: clause.slice(0, 3), equalsLabel: ROWS.some(row => row.label === clause) }));
    const keys = between(a, "GP-shaped keys (", ")")
      .split(", ")
      .flatMap(item => (item.endsWith(" labels") ? item.slice(0, -" labels".length).split("/") : [item]));
    const projected = between(a, " projects ", " byte-identical").split(/, | and /);
    const contract = a.split(" ")[2];
    const cited = between(a, "(hyperunix-observer.ts:", ")")
      .split(", ")
      .flatMap(range => {
        const [from = 0, to = from] = range.replace(/^:/, "").split("-").map(Number);
        return Array.from({ length: to - from + 1 }, (_, index) => from + index);
      });
    const measuredAt = between(b, "census at ", ":");
    const needleNames = between(b, ": 0 ", " identifiers in ").split("/");
    const gpRoots = between(b, " identifiers in ", " and 0 ").split(", ");
    const word = between(b, " and 0 '", "' in ");
    const uncoveredRoots = between(b, `'${word}' in `, " (test excluded)").split(", ");
    const reading = between(c, "still read '", "'");
    const labelReading = between(c, "uncovered label projects '", "'");
    const claimWords = between(c, "claiming a ", " plan").split(" or ");
    const quote = between(notes, "Quote: '", "' docs/programs/");
    const authority = between(notes, "Authority: README.md:7 '", "' Pi echoes");
    const statement = between(notes, "): [HX-GRAPH-POLICY-OPTIMIZATION-R1] ", " graph-policy-optimization-2026-10-18/README.md:7@");
    const gating = between(notes, "Gating artifact: ", "\nAcceptance: ");
    const atPin = README_LINES.find(line => line.line === 7)?.text ?? "";
    const witness = {
      clauses,
      keys,
      keyMembers: keys.map(key => [key, membersIn(key)]),
      projected,
      contract,
      cited,
      measuredAt,
      needleNames,
      gpRoots,
      word,
      uncoveredRoots,
      reading,
      labelReading,
      claimPlants: claimWords.map(claimWord => [claimWord, CLAIMING.some(([id]) => id === `${claimWord}-plan`)]),
      quoteAtPin: atPin.includes(quote) && atPin.includes(authority),
      statementFamilies: familiesIn(statement),
      gatingFamilies: familiesIn(gating),
      gatingCites: README_LINES.map(line => [line.cite, line.line === 7 ? notes.includes(`README.md:7@${PIN}`) : gating.includes(`:${line.line})`) || notes.includes(`:${line.line} @${PIN}`) || notes.includes(`README.md:${line.line},`)]),
      shipped: gating.includes("Shipped: no") ? false : null,
      readmeLines: README_LINES.map(line => [line.cite, sha256(line.text) === line.sha256]),
      labelsAtPin: (README_LINES.find(line => line.line === 13)?.text ?? "").includes(`${GP_KEYS[3]}/${GP_KEYS[4]}`),
      pin: PIN_COMMIT.startsWith(PIN),
    };
    expect(witness.clauses).toStrictEqual([
      { clause: "(a)", equalsLabel: true },
      { clause: "(b)", equalsLabel: true },
      { clause: "(c)", equalsLabel: true },
    ]);
    expect(ROWS.filter(row => row.label.startsWith("(")).map(row => row.label), "rows A, B and C carry the clauses, in order").toStrictEqual(stated);
    expect(keys).toStrictEqual([...GP_KEYS]);
    expect(witness.keyMembers.slice(0, 3), "each non-label key is its own GP member").toStrictEqual(GP_KEYS.slice(0, 3).map(key => [key, [key]]));
    expect({ projected, contract, cited }).toStrictEqual({ projected: [...PROJECTED], contract: CONTRACT, cited: CITED.map(entry => entry.line) });
    expect({ measuredAt, needleNames, gpRoots, word, uncoveredRoots }).toStrictEqual({ measuredAt: MEASURED_AT, needleNames: NEEDLES.map(needle => needle.id), gpRoots: [...GP_ROOTS], word: UNCOVERED, uncoveredRoots: [...UNCOVERED_ROOTS] });
    expect({ reading, labelReading, claimPlants: witness.claimPlants }).toStrictEqual({ reading: READING, labelReading: READING, claimPlants: [["complete", true], ["cheap", true]] });
    expect({ quoteAtPin: witness.quoteAtPin, statementFamilies: witness.statementFamilies, gatingFamilies: witness.gatingFamilies }).toStrictEqual({ quoteAtPin: true, statementFamilies: ["graphpolicy"], gatingFamilies: ["GraphDataIR", "graphpolicy"] });
    expect({ gatingCites: witness.gatingCites, shipped: witness.shipped, readmeLines: witness.readmeLines, labelsAtPin: witness.labelsAtPin, pin: witness.pin }).toStrictEqual({
      gatingCites: README_LINES.map(line => [line.cite, true]),
      shipped: SHIPPED,
      readmeLines: README_LINES.map(line => [line.cite, true]),
      labelsAtPin: true,
      pin: true,
    });
    return witness;
  },
  F2: async () => {
    const receipt = textOf(WIRE_RECEIPT);
    const wireSpan = between(receipt, "gp's wire vocabulary as measured from gp 0.1.0 on this host: ", " (GP_E_ is the registry");
    const wire = [...wireSpan.matchAll(/graphpolicy\.[a-z]+\.v\d+|gp\.rpc\.[a-z]+\/v\d+|GP_[A-Z]+_/g)].map(match => match[0]);
    const spellings = between(receipt, "(also spelled ", "; GraphPolicyCLI ships").split(/, | or /);
    const ratified: unknown = JSON.parse(textOf(RATIFIED_ROSTER));
    const ratifiedHolders = isObject(ratified) && Array.isArray(ratified.holders) ? ratified.holders : null;
    const page = textOf(DOCS_03);
    const section = docsSection(page, BOUNDARY_HEADING, 2, [PAGE_TITLE]);
    const tables = sectionTables(page, OWNERSHIP_HEADING, 2, [PAGE_TITLE]);
    const ownerRows = tables.grids.flatMap(grid => grid.filter(row => row[1] === OWNER).map(row => (row[2] ?? "").startsWith(OWNER_PI_CELL)));
    const witness = {
      wire: wire.map(token => [token, membersIn(token)]),
      spellings: spellings.map(spelling => [spelling, familiesIn(spelling)]),
      ratifiedHolders,
      sectionBinds: section.ok,
      tablesBind: tables.ok,
      ownerRows,
    };
    expect(witness.wire.map(([token]) => token), "the receipt's measured wire vocabulary").toStrictEqual(["graphpolicy.cli.v1", "graphpolicy.rpc.v1", "gp.rpc.reply/v1", "gp.rpc.error/v1", "GP_CLI_", "GP_RPC_", "GP_E_"]);
    for (const [token, members] of witness.wire) expect(members, `${token} reads as a needle member`).not.toEqual([]);
    expect(
      [...new Set(witness.wire.flatMap(([, members]) => members))],
      "the wire members the receipt anchors",
    ).toStrictEqual(["graphpolicy", "gp-rpc-schema", "gp-code-family"]);
    expect(witness.spellings, "the receipt's graphpolicy spellings").toStrictEqual(["graph-policy", "graph_policy", "graph.policy", "graph policy"].map(spelling => [spelling, ["graphpolicy"]]));
    expect(ratifiedHolders, "the R719-ratified holder patterns are the first two TEST_HOLDERS").toStrictEqual(TEST_HOLDERS.slice(0, 2).map(holder => holder.pattern.source));
    expect({ sectionBinds: section.ok, why: section.why, tablesBind: tables.ok, ownerRows }).toStrictEqual({ sectionBinds: true, why: "", tablesBind: true, ownerRows: [true] });
    return witness;
  },
  MN: async () => {
    const outcome = NEEDLE_CASES.map(([text]) => membersIn(text));
    expect(outcome).toStrictEqual(NEEDLE_CASES.map(([, members]) => [...members]));
    return { outcome };
  },
  MU: async () => {
    const outcome = UNCOVERED_CASES.map(([text]) => uncoveredIn(text));
    expect(outcome).toStrictEqual(UNCOVERED_CASES.map(([, hit]) => hit));
    return { outcome };
  },
  MH: async () => {
    const classes = TEST_HOLDER_CASES.map(([path]) => testHolderOf(path));
    expect(classes).toStrictEqual(TEST_HOLDER_CASES.map(([, holder]) => holder));
    const regionOf = (path: string, text: string): { lines: number[]; regions: string[] } => {
      const read = docHolderLines(path, text);
      return { lines: [...read.lines].sort((left, right) => left - right), regions: read.regions };
    };
    const docs = {
      page: regionOf(DOCS_03, PLANTED_DOCS_03),
      twoHeadings: regionOf(DOCS_03, `${PLANTED_DOCS_03}\n## ${BOUNDARY_HEADING}\n`),
      otherPage: regionOf("docs/workbench/09-plant.md", PLANTED_DOCS_03),
      receipt: regionOf(`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.1", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9")),
      bareTag: regionOf(`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.1", "GRAPH-POLICY-R1")),
      otherTag: regionOf(`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.1", "HX-OTHER-PROGRAM-R1")),
      otherBead: regionOf(`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.2", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9")),
      nested: regionOf(`${RECEIPTS}/old/wb-plant.1.md`, receiptTitle("wb-plant.1", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9")),
      notReceipts: regionOf("docs/workbench/wb-plant.1.md", receiptTitle("wb-plant.1", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9")),
    };
    expect(docs).toStrictEqual({
      page: { lines: [7, 10, 11, 12, 13], regions: ["boundary-section", "ownership-row"] },
      twoHeadings: { lines: [7], regions: ["ownership-row"] },
      otherPage: { lines: [], regions: [] },
      receipt: { lines: [1, 2, 3], regions: ["gp-receipt"] },
      bareTag: { lines: [1, 2, 3], regions: ["gp-receipt"] },
      otherTag: { lines: [], regions: [] },
      otherBead: { lines: [], regions: [] },
      nested: { lines: [], regions: [] },
      notReceipts: { lines: [], regions: [] },
    });
    return { classes, docs };
  },
  MS: async () => {
    const base = reading("incomplete", false);
    const before = json(base);
    const sites = SITES.map(siteName);
    const sdkSites = SDK_SITES.map(siteName);
    const freshEverywhere = {
      keys: SITES.every(site => fresh(base, site, gpKeys())),
      claims: CLAIMING.every(([, claim]) => SITES.every(site => fresh(base, site, claim))),
      labels: UNCOVERED_LABELS.every(([, label]) => SITES.every(site => fresh(base, site, label))),
      sdk: SDK_DOCUMENTS.every(([, document]) => SDK_SITES.every(site => fresh(document, site, gpKeys()))),
    };
    const plantsRead = carries(planted(base, ["source"], gpKeys()), ["source"], gpKeys());
    const untouched = json(base) === before;
    const controls = [
      { mark: `${GP_MARK}x` },
      { covered: 1 },
      { note: "Uncovered" },
      { plan_cost_estimate: 0 },
      { coverage: "partial", statusText: "complete · rows 0", evidenceRefs: ["hx-coverage:b1"], diagnostics: ["runtime did not license absence"] },
    ].map(value => surfaced(value));
    const witness = { sites, sdkSites, freshEverywhere, plantsRead, untouched, controls };
    expect(witness).toStrictEqual({
      sites: ["top", "source", "source.execution_status", "source.coverage_summary", "source.coverage[0]", "source.evidence", "source.extensions", "runtime"],
      sdkSites: ["top", "coverage[0]", "status", "execution_status", "transport", "coverage_summary", "evidence", "extensions"],
      freshEverywhere: { keys: true, claims: true, labels: true, sdk: true },
      plantsRead: true,
      untouched: true,
      controls: [true, true, true, true, false],
    });
    return witness;
  },
  R1: async () => {
    const outcome = productFindings(plantTree([["src/plant.ts", 'const gp = agents.get("general-purpose");\nspawn("gp", ["rpc", "--stdio"]);']]));
    expect(outcome, "R-BARE-GP: a bare gp token is quiet").toEqual([]);
    return { outcome };
  },
  R2: async () => {
    const outcome = productFindings(plantTree([["src/plant.ts", 'const ir = "Graph" + "DataIR";\nconst key = ["plan", "cost", "estimate"].join("_");']]));
    expect(outcome, "R-COMPOSED: a needle assembled from parts is quiet").toEqual([]);
    return { outcome };
  },
  R3: async () => {
    const texts = [`graph${cp(0x2010)}policy`, `Graph${cp(0x200d)}DataIR`, "plan cost estimate", "gp receipt", "un-covered", "GraphData\nIR"];
    const outcome = productFindings(plantTree(texts.map((text, index) => [`src/plant-${index}.ts`, text] as const)));
    expect(outcome, "R-SPELLING: a needle spelled outside the families is quiet").toEqual([]);
    return { texts: texts.length, outcome };
  },
  R4: async () => {
    const outcome = testFindings(
      plantTree([
        ["test/workbench-plant-census.test.ts", "const score = source.plan_cost_estimate;"],
        ["test/fixtures/plant-roster.json", '{"reads": "GraphDataIR"}'],
        ["test/helpers/gp-plant.ts", "graphpolicy"],
      ]),
    ).findings;
    expect(outcome, "R-HOLDER-NAME: a needle inside a holder-class file is quiet").toEqual([]);
    return { outcome };
  },
  R5: async () => {
    const page = [
      `# ${PAGE_TITLE}`,
      "",
      `## ${OWNERSHIP_HEADING}`,
      "",
      "| Concern | Authoritative owner | Workbench may do |",
      "| --- | --- | --- |",
      `| Learned scores | ${OWNER} | ${OWNER_PI_CELL}, though Pi reads plan_cost_estimate |`,
      "",
      `## ${BOUNDARY_HEADING}`,
      "",
      "Pi reads plan_cost_estimate from hx results and echoes uncovered.",
    ].join("\n");
    const outcome = docsFindings(
      plantTree([
        [DOCS_03, page],
        [`${RECEIPTS}/wb-plant.1.md`, receiptTitle("wb-plant.1", "RF-GRAPH-POLICY-MACHINE-CONTROL-R9").replace("body", "Pi reads GraphDataIR.")],
      ]),
    ).findings;
    expect(outcome, "R-HOLDER-REGION: whatever a holder region says is quiet").toEqual([]);
    return { outcome };
  },
  R6: async () => {
    const tree = plantTree([
      ["examples/plant.ts", "GraphDataIR"],
      [".agents/skills/plant.md", "graphpolicy"],
      [".pi/plant.md", "plan_cost_estimate"],
      ["README.md", "gp_receipt"],
      ["vendor/plant.js", "GP_CLI_X"],
      ["node_modules/plant/index.js", "GraphDataIR"],
      [".beads/issues.jsonl", "GraphDataIR"],
      ["test/workbench-plant.test.ts", "uncovered"],
      ["docs/programs/plant.md", "uncovered"],
    ]);
    const outcome = [...productFindings(tree), ...docsFindings(tree).findings, ...testFindings(tree).findings];
    expect(outcome, "R-OUTSIDE-ROOTS: a file outside the clause's roots is quiet").toEqual([]);
    return { outcome };
  },
  R7: async () => {
    const outcome = productFindings(plantTree([["src/workbench/plant-reader.ts", "for (const [key, value] of Object.entries(source)) facets[key] = value;"]]));
    expect(outcome, "R-NEW-READER: a generic reader naming no needle is quiet").toEqual([]);
    return { outcome };
  },
  R8: async () => {
    const label: Json = UNCOVERED_LABELS[0]?.[1] ?? {};
    const outcome = BASES.filter(([kind, licensed]) => licensed && hxLiveInvariant(reading(kind, true)).absenceLicensed).map(([kind, , base]) => {
      const projected = topologyOf(planted(base, ["source"], label));
      return { kind, reading: readingOf(projected, hxLiveInvariant(planted(base, ["source"], label))), identical: json(projected) === json(topologyOf(base)) };
    });
    expect(outcome, "R-LICENCE-WINS: beside a runtime-licensed complete result the label moves nothing").toStrictEqual([
      { kind: "complete", reading: "complete/success/true", identical: true },
      { kind: "complete-empty", reading: "complete/success/true", identical: true },
    ]);
    return { outcome };
  },
};

describe("wb-kjg9.1 HX GraphPolicy answer-invariance census (HX-GRAPH-POLICY-OPTIMIZATION-R1, gated posture)", () => {
  it("the judged set: the frozen shape, the out-of-file roster, the cases and their own reads agree", () => {
    expect(ROWS.map(row => `${row.id}:${row.pins.length}`)).toEqual(["A:5", "B:3", "C:4", "F:2", "M:4", "R:8"]);
    expect(ROWS.map(({ id, label, pins }) => ({ id, label, pins: [...pins] }))).toStrictEqual(ROSTER.rows.map(({ id, label, pins }) => ({ id, label, pins: pins.map(pin => pin.id) })));
    expect(Object.keys(IMPL).sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
    expect(ROSTER.bead).toBe(BEAD);
    expect(constants()).toStrictEqual(ROSTER.constants);
    const source = textOf(CENSUS);
    const block = between(source, "const IMPL: Readonly<Record<string, () => Promise<unknown>>> = {", "\n};\n");
    expect({ rosterWitness: /\brosterWitness\b/.test(block), roster: /\bROSTER\b/.test(block) }, "no case reads its own roster witness").toStrictEqual({ rosterWitness: false, roster: false });
    const cases = block.split(/\n {2}(?=[A-Z][A-Z0-9]*: async \(\) => \{)/).slice(1);
    const named = cases.map(body => [body.slice(0, body.indexOf(":")), READERS.some(reader => new RegExp(`\\b${reader}\\(`).test(body))]);
    expect(named, "every case names a reader of the subject").toStrictEqual(ROWS.flatMap(row => row.pins).map(pin => [pin, true]));
  });

  for (const row of ROWS) {
    describe(`${row.id} ${row.label}`, () => {
      for (const pin of row.pins) {
        it(pin, { timeout: 120_000 }, async () => {
          const impl = IMPL[pin];
          expect(impl, `no case for ${pin}`).toBeTypeOf("function");
          const witness = impl === undefined ? null : await impl();
          expect(witness).toStrictEqual(rosterWitness(pin));
          REACHED.add(pin);
        });
      }
    });
  }

  it("the record: every pin's case ran to its end", () => {
    expect([...REACHED].sort()).toEqual(ROWS.flatMap(row => row.pins).sort());
  });
});
